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
 * == handler 签名（#213 定死的接触面——轴 A 十二张族票与轴 B 二十一张
 *    口上票唯一共用的一张脸，两边都对着它写） ==
 *
 *   async (rand) => 0
 *
 *   - 入参 rand：RAND:N 的随机源（(n) => [0, n) 整数；缺省均匀随机）。
 *     分发点以 args: [rand] 透传；handler 内部自兜底（K3 先例）；
 *   - 返回值恒 0（TRYCALLFORM 不读返回值；契约测试锁定）；
 *   - 读取面：era_flag 的 target/player/assi/assiplay/selectcom 与
 *     era 表——**只读游戏状态**，跨域写一律走门面（#71）；
 *   - 输出面：台词用 era.printAndWait；除此之外不得有任何输出或等待；
 *   - **七道头部守卫先于任何 SELECTCOM 分支**（实测 EVENT_K3_高貴.ERB
 *     :888-912，K5 同款但顺序互异——守卫集相同、顺序按各文件 1:1）：
 *       1. TEQUIP:55（死斗场）→ 岔去专用口上（COLOSSEUM_KOJO_<n>）；
 *       2. ASSI > 0 && ASSIPLAY（助手调教）→ 跳过；
 *       3. TEQUIP:45 && SELECTCOM != 45（口塞；口塞指令自己不算）→ 跳过；
 *       4. TFLAG:899（失神）→ 跳过；
 *       5. TEQUIP:89（兽奸）→ 岔去专用口上（DOG_KOJO_<n>；有的性格是
 *          静默跳过，按各文件 1:1）；
 *       6. TALENT:9 == 1（崩坏）→ 跳过；
 *       7. TEQUIP:90（触手）→ 跳过。
 *     守卫读 TEQUIP:55/45/89/90 只读（TEQUIP 建模归 J5，#215）。契约测试
 *     （test/kojo-system.test.js）对**已注册的全部 handler** 逐条置位驱
 *     动：守卫命中时不得出现台词（无等待、无台词输出）——口上票落地即
 *     自动进契约，无需逐票自写守卫用例。
 *   - SELECTCOM 分支：指令族票（轴 A）落地一条 @COM<n> 时，同一编号的
 *     台词分支在各口上 handler 内各自扩展（各文件 1:1，分支序/条件随
 *     ERB 原文）。
 *
 * == EX 口上待办（登记 docs/stub-registry.md，随 EX 口上票） ==
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

/** @KOJO_MESSAGE_COM_{N}：指令口上族（这张票注册 3 与 5，见 kojo-k3-noble / kojo-k5-mao） */
const kojo_message_com_family = new DispatchFamily(
  'KOJO_MESSAGE_COM',
  DECLARED_KOJO_COM_IDS,
);

/** @SELF_KOJO_K{N}：事件口上族（随各口上票落地） */
const self_kojo_family = new DispatchFamily('SELF_KOJO', DECLARED_KOJO_COM_IDS);

/**
 * @GET_KOJO_NUM（:86-144）：角色 → 口上编号。
 *
 * :137-140 FOR COUNT,160,180：素质 160-179（慈愛..貴公子等性格素质）逐格
 * 探测，**最后一格命中者胜**（原作无 BREAK，后写覆盖先写）。性格素质 →
 * 编号 = COUNT - 60（163 高貴 → 103、165 村娘A/マオ → 105）。EX 半边
 * （:135 GET_EX_KOJO_NUM）待办，见文件头。
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
 * 两道守卫（:151-152 总开关；:155-157 存在判定——EX_FLAG 臂待办见文件头，
 * 普通口上化简为 FLAG:LOCAL == 0）之后按编号分发（:160-161）。
 *
 * @param {(n: number) => number} [rand] RAND:N 的随机源（返回 [0, n) 的
 *   整数；缺省均匀随机）。以参数注入而非测试钩子——随机源本就是引擎外
 *   概念（#47 的 juel-check 先例），测试注入定值序固定随机分支
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

/**
 * @SELF_KOJO（:225-241）：事件口上入口（EVENT_AFTERTRAIN 等处的 CALL SELF_KOJO）。
 *
 * 两道守卫：FLAG:7 <= 0 时 TFLAG:15 = 0 并返回 0；LOCAL 判定后 TRYCALLFORM SELF_KOJO_K{LOCAL - 100}。
 * @param {(n: number) => number} [rand] RAND:N 的随机源
 * @param {number} [q] 调教后自慰对象（EVENT_AFTERTRAIN 的 Q：1=助手 /
 *   2=野狗 / 0=主人；其余 TFLAG:13 段不读它，默认 0）
 * @returns {Promise<number>} 0
 */
async function self_kojo(rand, q = 0) {
  // 第一道守卫：总开关 FLAG:7 <= 0
  if ((era.get('flag:7') || 0) <= 0) {
    const { game } = require('#/facade/game');
    game.train.怪物射精或购入金 = 0;
    return 0;
  }

  // GET_KOJO_NUM()
  const local = get_kojo_num();

  // キャラ別：TRYCALLFORM SELF_KOJO_K{LOCAL - 100}
  if ((local >= 100 && local < 140) || local > 1000) {
    await self_kojo_family.call(local - 100, {
      whenMissing: 0,
      args: [rand, q],
    });
  }
  return 0;
}

/** @KOJO_MESSAGE_PALAMCNG_K{N} 族：参数变动口上（:169-182 的分派目标） */
const palamcng_family = new DispatchFamily(
  'KOJO_MESSAGE_PALAMCNG',
  DECLARED_KOJO_COM_IDS,
);

/** @KOJO_MESSAGE_MARKCNG_K{N} 族：刻印取得口上（:188-201 的分派目标） */
const markcng_family = new DispatchFamily(
  'KOJO_MESSAGE_MARKCNG',
  DECLARED_KOJO_COM_IDS,
);

/**
 * @KOJO_MESSAGE_PALAMCNG（:169-182）：参数变动后触发口上。
 *
 * 三道守卫：FLAG:7 <= 0 直接返回（:170-171）；存在判定 FLAG:LOCAL == 0
 * 返回（:174-176，EX_FLAG 臂待办见文件头）；编号空间外不拼函数名。
 *
 * @param {(n: number) => number} [rand] RAND:N 的随机源
 * @returns {Promise<number>} 0
 */
async function kojo_message_palamcng(rand) {
  // :170-171 总开关
  if ((era.get('flag:7') || 0) <= 0) {
    return 0;
  }

  // :174-176 存在判定
  const local = get_kojo_num();
  if ((era.get(`flag:${local}`) || 0) === 0) {
    return 0;
  }

  // :180-181 TRYCALLFORM KOJO_MESSAGE_PALAMCNG_{LOCAL - 100}
  if ((local >= 100 && local < 140) || local > 1000) {
    await palamcng_family.call(local - 100, {
      whenMissing: 0,
      args: [rand],
    });
  }
  return 0;
}

/**
 * @KOJO_MESSAGE_MARKCNG（:188-201）：刻印取得后触发口上。
 *
 * 两道守卫：FLAG:7 <= 0 直接返回（:189-190）；存在判定被原作注释
 * （:195-197，不判）。编号空间外不拼函数名。
 *
 * @param {(n: number) => number} [rand] RAND:N 的随机源
 * @returns {Promise<number>} 0
 */
async function kojo_message_markcng(rand) {
  // :189-190 总开关
  if ((era.get('flag:7') || 0) <= 0) {
    return 0;
  }

  // :199-200 TRYCALLFORM KOJO_MESSAGE_MARKCNG_{LOCAL - 100}
  const local = get_kojo_num();
  if ((local >= 100 && local < 140) || local > 1000) {
    await markcng_family.call(local - 100, {
      whenMissing: 0,
      args: [rand],
    });
  }
  return 0;
}

/** @BENKI_KOUJO_K{N} 族：肉便器口上（EVENT_K.ERB:277-289 的分派目标） */
const benki_koujo_family = new DispatchFamily(
  'BENKI_KOUJO',
  DECLARED_KOJO_COM_IDS,
);

/**
 * @BENKI_KOUJO（EVENT_K.ERB:277-289）：肉便器配信时的口上入口。
 *
 * 与原作同构：TARGET = A → GET_KOJO_NUM → 分发。存在判定被原作注释
 * （:283-285），不判。
 *
 * @param {number} cid 角色 ID（原作全局 A）
 * @returns {Promise<number>} TRYCALL 落空时的 RESULT 0（调用方不读）
 */
async function benki_koujo(cid) {
  const target_pool = era_flag.target; // 调用点已置 TARGET = ARG
  era_flag.target = cid; // TARGET = A
  const local = get_kojo_num(cid);
  if ((local >= 100 && local < 140) || local > 1000) {
    await benki_koujo_family.call(local - 100, {
      whenMissing: 0,
      args: [cid],
    });
  }
  era_flag.target = target_pool;
  return 0;
}

/** @DUNGEON_VICTORY_K{N} 族：战斗胜利口上（EVENT_K.ERB:294-303 的分派目标） */
const dungeon_victory_family = new DispatchFamily(
  'DUNGEON_VICTORY',
  DECLARED_KOJO_COM_IDS,
);

/**
 * @VICTORY_KOUJO（EVENT_K.ERB:294-303）：战斗胜利时的口上入口。
 *
 * 与原作同构：TARGET = A → 分发。存在判定被原作注释（:299-301），不判。
 *
 * @param {number} cid 胜利者角色 ID（原作全局 A）
 * @returns {Promise<number>} TRYCALL 落空时的 RESULT 0（调用方不读）
 */
async function dungeon_victory_koujo(cid, rand) {
  const target_pool = era_flag.target;
  era_flag.target = cid; // TARGET = A
  const local = get_kojo_num(cid);
  if ((local >= 100 && local < 140) || local > 1000) {
    await dungeon_victory_family.call(local - 100, {
      whenMissing: 0,
      args: [cid, rand],
    });
  }
  era_flag.target = target_pool;
  return 0;
}

/** @DUNGEON_ATTACK_K{N} 族：攻击口上（EVENT_K.ERB:311-317 的分派目标） */
const dungeon_attack_family = new DispatchFamily(
  'DUNGEON_ATTACK',
  DECLARED_KOJO_COM_IDS,
);

/**
 * @ATTACK_KOUJO（EVENT_K.ERB:311-317）：攻击时的口上入口。
 *
 * 与原作同构：TARGET = ARG:0 → 分发。存在判定被原作注释（:315-316），不判。
 *
 * @param {number} cid 攻击者角色 ID（原作 ARG:0）
 * @returns {Promise<number>} TRYCALL 落空时的 RESULT 0（调用方不读）
 */
async function dungeon_attack_koujo(cid, rand) {
  const target_pool = era_flag.target;
  era_flag.target = cid; // TARGET = ARG:0
  const local = get_kojo_num(cid);
  if ((local >= 100 && local < 140) || local > 1000) {
    await dungeon_attack_family.call(local - 100, {
      whenMissing: 0,
      args: [cid, rand],
    });
  }
  era_flag.target = target_pool;
  return 0;
}

/** @ENTERENEMY_KOUJO_K{N} 族：来袭口上（EVENT_K.ERB:432-440 的分派目标） */
const enterenemy_koujo_family = new DispatchFamily(
  'ENTERENEMY_KOUJO',
  DECLARED_KOJO_COM_IDS,
);

/**
 * @ENTERENEMY_KOUJO（EVENT_K.ERB:432-440）：迷宫攻略开始时的来袭口上。
 *
 * 与原作同构：SWAP 暂存 TARGET → TARGET = A → 分发 → SWAP 还原。存在判定
 * 被原作注释（:436-438），不判。
 *
 * @param {number} cid 角色 ID（原作全局 A）
 * @returns {Promise<number>} TRYCALL 落空时的 RESULT 0（调用方不读）
 */
async function enterenemy_koujo(cid) {
  const target_pool = era_flag.target; // SWAP LOCAL:2, TARGET
  era_flag.target = cid; // TARGET = A
  const local = get_kojo_num(cid);
  if ((local >= 100 && local < 140) || local > 1000) {
    await enterenemy_koujo_family.call(local - 100, {
      whenMissing: 0,
      args: [cid],
    });
  }
  era_flag.target = target_pool; // SWAP 还原
  return 0;
}

/** @GOBI_KOUJO_K{N} 族：语尾口上（EVENT_K.ERB:504-522 的分派目标） */
const gobi_koujo_family = new DispatchFamily(
  'GOBI_KOUJO',
  DECLARED_KOJO_COM_IDS,
);

/**
 * @GOBI_KOUJO（EVENT_K.ERB:504-522）：语尾口上入口。
 *
 * 与原作同构：GET_KOJO_NUM → TRYCALLFORM GOBI_KOUJO_K{LOCAL-100}, ARG:0。
 * 存在判定被原作注释（:513-515），不判。
 *
 * @param {number} arg_0 语尾类型（0 默认 / 1 喜 / 2 怒 / 3 悲 / 4 羞 / 5 情け）
 * @returns {Promise<number>} TRYCALL 落空时的 RESULT 0（调用方不读）
 */
async function gobi_koujo(arg_0 = 0) {
  const local = get_kojo_num();
  if ((local >= 100 && local < 140) || local > 1000) {
    await gobi_koujo_family.call(local - 100, {
      whenMissing: 0,
      args: [arg_0],
    });
  }
  return 0;
}

module.exports = {
  get_kojo_num,
  kojo_message_com,
  kojo_message_com_family,
  self_kojo,
  self_kojo_family,
  kojo_message_palamcng,
  palamcng_family,
  kojo_message_markcng,
  markcng_family,
  benki_koujo,
  benki_koujo_family,
  dungeon_victory_koujo,
  dungeon_victory_family,
  dungeon_attack_koujo,
  dungeon_attack_family,
  enterenemy_koujo,
  enterenemy_koujo_family,
  gobi_koujo,
  gobi_koujo_family,
};
