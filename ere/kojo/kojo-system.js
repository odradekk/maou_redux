/**
 * @file 口上系统的公共底座：口上总开关、性格编号解析、指令口上的分发。
 *
 * 源: target/ERB/EVENT/EVENT_K.ERB  @EVENTSHOP（:12-15，#PRI——总开关默认开）
 *     @GET_KOJO_NUM（:86-144；活代码是 :89-91 的参缺省与 :134-144 的
 *     EX 扫描 + 素质扫描，:92-131 的 ELSEIF 长链在原作就是注释）
 *     @KOJO_MESSAGE_COM（:150-162——两道守卫 + TRYCALLFORM 分发）
 *
 * 调用点：@SOURCE_CHECK:11-12（SIF FLAG:7 > 0 / CALL KOJO_MESSAGE_COM，
 * ere/event/source-check.js）。
 *
 * == 总开关与存在标志（事件链机制，#6 的真实用例） ==
 *
 *   - FLAG:7 是玩家可关的口上总开关；@EVENTSHOP #PRI 在其为 0 时置 2
 *     （默认开，且**只补 0**：玩家显式关掉（-1）不会自开）。
 *   - 每个口上文件自带一对事件定义：@EVENTTRAIN #PRI 置 FLAG:(100+编号)
 *     = 1（存在标志）并同样补 FLAG:7，@EVENTEND #LATER 清 0。文件被删掉
 *     时标志没人置、分发静默跳过——原作注释明言这是容错设计
 *     （EVENT_K.ERB:3-9）。ere 侧等价：不 require 的口上模块不注册，分发
 *     族空间内缺失合法（TRYCALL 落空语义）。
 *
 * == 分发（决议 #7 的机制） ==
 *
 * TRYCALLFORM KOJO_MESSAGE_COM_{LOCAL - 100} 改走分发族。编号空间 =
 * 分发守卫（:160 LOCAL >= 100 && LOCAL < 140 || LOCAL > 1000）能拼出的
 * 全部函数名：普通口上 0-39（性格素质 160-179 → LOCAL 100-119）、
 * EX 口上 901-1600（EX_TALENT 101-800 → LOCAL 1001-1700）。空间内缺失
 * 合法（未移植的性格不发一言）；重复注册启动即炸（#14：原作 23 个口上
 * 函数被同名遮蔽的真实事故）。
 *
 * == EX 口上欠账（登记 docs/stub-registry.md，随 EX 口上票） ==
 *
 * @GET_KOJO_NUM 的 LOCAL = GET_EX_KOJO_NUM(ARG)（EXCOM.ERB:31-38，扫
 * EX_TALENT 101-800，命中 +900）与 @KOJO_MESSAGE_COM 存在判定的
 * EX_FLAG:(LOCAL - 900) 臂（:156）都依赖 EX_TALENT / EX_FLAG 表——两张
 * 表未落 yml/（EX_TALENTNAME_INIT 登记在案），且 EX_TALENT 的唯一写入者
 * @ADDCHARA_EX 未移植，EX 口上编号当前不可达。省略后行为等价：普通口上
 * LOCAL < 140，原作在该臂读负下标恒 0。EX 口上落地时补这两处与
 * K902-K904 模块。
 */

const era = require('#/era-electron');
const { on, TIER } = require('#/system/event/registry');
const era_flag = require('#/era-utils/era-flag');
const { DispatchFamily } = require('#/system/dispatch/dispatch-family');

// @EVENTSHOP #PRI（:12-15）：口上总开关默认开。SIF FLAG:7 == 0 只补 0——
// 玩家关掉（-1）不自开，1（少量模式）不改
on(
  'EVENTSHOP',
  () => {
    if ((era.get('flag:7') || 0) === 0) {
      // FLAG:7 = 2（口上总开关：2=默认全量、1=每阶段一次、<=0=关）
      era.set('flag:7', 2);
    }
  },
  TIER.PRI,
);

// 声明的编号空间：分发守卫（:160）能拼出的全部 KOJO_MESSAGE_COM_{N} 名。
// 普通口上 0-39 + EX 口上 901-1600；空间内缺失 = TRYCALL 落空（合法）
const DECLARED_KOJO_COM_IDS = [
  ...Array.from({ length: 40 }, (_, i) => i),
  ...Array.from({ length: 700 }, (_, i) => i + 901),
];

/** @KOJO_MESSAGE_COM_{N}：指令口上族（本票注册 3 与 5，见 kojo-k3/k5） */
const kojo_message_com_family = new DispatchFamily(
  'KOJO_MESSAGE_COM',
  DECLARED_KOJO_COM_IDS,
);

/**
 * @GET_KOJO_NUM（:86-144）：角色 → 口上编号。
 *
 * :137-140 FOR COUNT,160,180：素质 160-179（慈愛..貴公子等性格素质）逐格
 * 探测，**最后一格命中者胜**（原作无 BREAK，后写覆盖先写）。性格素质 →
 * 编号 = COUNT - 60（163 高貴 → 103、165 村娘A/マオ → 105）。EX 半边
 * （:135 GET_EX_KOJO_NUM）欠账，见文件头。
 *
 * @param {number} [arg] 角色 ID；缺省（或负）取当前调教目标（:90-91）
 * @returns {number} 口上编号（100-119；无性格素质时 0）
 */
function get_kojo_num(arg = -1) {
  const cid = arg < 0 ? era_flag.target : arg; // :89-91
  let local = 0;
  for (let count = 160; count < 180; count += 1) {
    if (era.get(`talent:${cid}:${count}`)) {
      local = count - 60; // :139
    }
  }
  return local;
}

/**
 * @KOJO_MESSAGE_COM（:150-162）：指令执行时的口上入口。
 *
 * 两道守卫（:151-152 总开关；:155-157 存在判定——EX_FLAG 臂欠账见文件头，
 * 普通口上化简为 FLAG:LOCAL == 0）之后按编号分发（:160-161）。
 *
 * @param {(n: number) => number} [rand] RAND:N 的随机源（返回 [0, n) 的
 *   整数；缺省均匀随机）。以参数注入而非测试钩子——随机源本就是引擎外
 *   概念（#47 的 juel-check 先例），测试注入定值序钉死随机分支
 * @returns {Promise<number>} 0（:152/:157/:161 的 RETURN 0；调用方不读）
 */
async function kojo_message_com(rand) {
  // :151-152 第一道守卫：总开关 FLAG:7 <= 0 直接返回（玩家可关）
  if ((era.get('flag:7') || 0) <= 0) {
    return 0;
  }

  // :155-157 第二道守卫：口上存在判定 FLAG:LOCAL == 0（&& EX_FLAG 臂）
  const local = get_kojo_num(); // :155 GET_KOJO_NUM()（参缺省 → TARGET）
  if ((era.get(`flag:${local}`) || 0) === 0) {
    return 0;
  }

  // :160-161 キャラ別：TRYCALLFORM KOJO_MESSAGE_COM_{LOCAL - 100}
  if ((local >= 100 && local < 140) || local > 1000) {
    await kojo_message_com_family.call(local - 100, {
      whenMissing: 0,
      args: [rand],
    });
  }
  return 0;
}

module.exports = { get_kojo_num, kojo_message_com, kojo_message_com_family };
