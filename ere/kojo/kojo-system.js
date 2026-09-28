/**
 * @file 口上系统的公共底座：口上总开关、性格编号解析、指令口上的分发。
 *
 * 调用点：source-check（SIF FLAG:7 > 0 / CALL KOJO_MESSAGE_COM，
 * ere/event/source-check.js）。
 *
 * == 总开关与存在标志（事件链机制，#6 的真实用例） ==
 *
 *   - FLAG:7 是玩家可关的口上总开关；EVENTSHOP 事件 #PRI 在其为 0 时置 2
 *     （默认开，且**只补 0**：玩家显式关掉（-1）不会自开）。
 *   - 每个口上文件自带一对事件定义：EVENTTRAIN #PRI 置 FLAG:(100+编号)
 *     = 1（存在标志）并同样补 FLAG:7，EVENTEND #LATER 清 0。文件被删掉
 *     时标志没人置、分发静默跳过——注释里明言这是容错设计。
 *     ere 侧等价：不 require 的口上模块不注册，分发
 *     族空间内缺失合法（TRYCALL 落空语义）。
 *
 * == 分发（决议 #7 的机制） ==
 *
 * TRYCALLFORM KOJO_MESSAGE_COM_{LOCAL - 100} 改走分发族。编号空间 =
 * 分发检查（`LOCAL >= 100 && LOCAL < 140 || LOCAL > 1000`，按
 * 「&& 与 || 同优先级、左结合」读作 `(100..139) || 1000 以上`——`||` 之后没有
 * `&&`，两种读法同值，与 `local > 1000` 并列即为窗口；#517。ere 侧整合成
 * in_kojo_window，只此一处定义）能拼出的
 * 全部函数名：普通口上 0-39（性格素质 160-179 → LOCAL 100-119）、
 * EX 口上 901-1600（EX_TALENT 101-800 → LOCAL 1001-1700）。空间内缺失
 * 合法（未移植的性格不发一言）；重复注册启动即炸（防同名口上互相遮蔽）。
 *
 * == handler 签名（#213 定死的接触面——轴 A 十二张族票与轴 B 二十一张
 *    口上票唯一共用的一张脸，两边都对着它写） ==
 *
 *   async (rand) => 0
 *
 *   - 入参 rand：RAND:N 的随机源（(n) => [0, n) 整数；缺省均匀随机）。
 *     分发点以 args: [rand] 透传；handler 内部自取缺省（K3 先例）；
 *   - 返回值恒 0（TRYCALLFORM 不读返回值；契约测试锁定）；
 *   - 读取面：era_flag 的 target/player/assi/assiplay/selectcom 与
 *     era 表——**只读游戏状态**，跨域写一律走门面（#71）；
 *   - 输出面：台词用 era.printAndWait；除此之外不得有任何输出或等待；
 *   - **七道头部检查先于任何 SELECTCOM 分支**（K3/K5 实测——检查集相同、
 *     顺序按各 handler
 *     自家文件；K1 自信家（#232）顺序不同：TEQUIP:55 →（助手调教不跳过）→ TEQUIP:45
 *     → TFLAG:899 → TALENT:9 → TEQUIP:89 → TEQUIP:90。死斗场/兽奸岔真身，
 *     助手调教出台词。契约测试对跳过类检查逐条置位；助手与专用口上按
 *     各 handler 逐字拆开。
 *   - SELECTCOM 分支：指令族票（轴 A）实现一条 COM<n> 时，同一编号的
 *     台词分支在各口上 handler 内各自扩展（各 handler 随自家文件，
 *     分支序/条件照写）。
 *
 * == EX 口上 ==
 *
 * get_kojo_num 的 LOCAL = get_ex_kojo_num(cid)（扫
 * EX_TALENT 101-800，命中 +900）与 kojo_message_com 存在判定的
 * EX_FLAG:(LOCAL - 900) 分支已接入。EX_TALENT:102 映射为
 * LOCAL 1002，再分发到 K902；EX_FLAG:102 是独立的口上存在标志。
 */

const era = require('#/era-electron');
const { get_ex_kojo_num } = require('#/chara/chara-ex');
const { on, TIER } = require('#/system/event/registry');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { DispatchFamily } = require('#/system/dispatch/dispatch-family');

// EVENTSHOP #PRI：口上总开关默认开。SIF FLAG:7 == 0 只补 0——
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

// 声明的编号空间：分发检查能拼出的全部 KOJO_MESSAGE_COM_{N} 名。
// 普通口上 0-39 + EX 口上 901-1600；空间内缺失 = TRYCALL 落空（合法）
const DECLARED_KOJO_COM_IDS = [
  ...Array.from({ length: 40 }, (_, i) => i),
  ...Array.from({ length: 700 }, (_, i) => i + 901),
];

/** KOJO_MESSAGE_COM_{N} 族：指令口上（K3 / K5 / K1） */
const kojo_message_com_family = new DispatchFamily(
  'KOJO_MESSAGE_COM',
  DECLARED_KOJO_COM_IDS,
);

/** SELF_KOJO_K{N} 族：事件口上（随各口上票实现） */
const self_kojo_family = new DispatchFamily('SELF_KOJO', DECLARED_KOJO_COM_IDS);

/** KOJO_MESSAGE_PALAMCNG_{N} 族：参数变动口上（#232 起 K1 真身） */
const kojo_message_palamcng_family = new DispatchFamily(
  'KOJO_MESSAGE_PALAMCNG',
  DECLARED_KOJO_COM_IDS,
);

/** KOJO_MESSAGE_MARKCNG_{N} 族：刻印取得口上（#232 起 K1 真身） */
const kojo_message_markcng_family = new DispatchFamily(
  'KOJO_MESSAGE_MARKCNG',
  DECLARED_KOJO_COM_IDS,
);

const dog_kojo_family = new DispatchFamily('DOG_KOJO', DECLARED_KOJO_COM_IDS);
const colosseum_kojo_family = new DispatchFamily(
  'COLOSSEUM_KOJO',
  DECLARED_KOJO_COM_IDS,
);
const benki_koujo_family = new DispatchFamily(
  'BENKI_KOUJO',
  DECLARED_KOJO_COM_IDS,
);
const dungeon_victory_family = new DispatchFamily(
  'DUNGEON_VICTORY',
  DECLARED_KOJO_COM_IDS,
);
const dungeon_attack_family = new DispatchFamily(
  'DUNGEON_ATTACK',
  DECLARED_KOJO_COM_IDS,
);
const ntr_koujo_family = new DispatchFamily('NTR_KOUJO', DECLARED_KOJO_COM_IDS);
const exucution_koujo_family = new DispatchFamily(
  'EXUCUTION_KOUJO',
  DECLARED_KOJO_COM_IDS,
);
const museum_koujo_family = new DispatchFamily(
  'MUSEUM_KOUJO',
  DECLARED_KOJO_COM_IDS,
);
const banishment_koujo_family = new DispatchFamily(
  'BANISHMENT_KOUJO',
  DECLARED_KOJO_COM_IDS,
);
const public_exucution_koujo_family = new DispatchFamily(
  'PUBLIC_EXUCUTION_KOUJO',
  DECLARED_KOJO_COM_IDS,
);
const grotesque_koujo_family = new DispatchFamily(
  'GROTESQUE_KOUJO',
  DECLARED_KOJO_COM_IDS,
);
const enterenemy_koujo_family = new DispatchFamily(
  'ENTERENEMY_KOUJO',
  DECLARED_KOJO_COM_IDS,
);
const gobi_koujo_family = new DispatchFamily(
  'GOBI_KOUJO',
  DECLARED_KOJO_COM_IDS,
);

/**
 * 22 条 TRYCALLFORM 分发表（#403 的交付面）。
 *
 * 不进表的 5 个入口：EVENTSHOP（本文件的 on('EVENTSHOP', …)）、
 * GET_KOJO_NUM（本文件的 get_kojo_num）与三个 **未使用**的入口
 * （KOJO_MESSAGE_COM_MASTER / _ASSI / KOJO_MESSAGE_PLAYERCHANGE——
 * 它们的 TRYCALLFORM 本就是注释态，不派发，故不进表）。
 *
 * 字段：
 *   - line     分发行号（遗留字段，现无读取方）
 *   - dispatch TRYCALLFORM 拼出的函数名前缀（编号 = LOCAL - 100）
 *   - entry    ere 侧入口函数名；module 是它所在的模块（load_module 可加载名）
 *   - erb      拼名对应的函数名。**与 entry 不是大小写互转**：dispatch 前缀带 DUNGEON_
 *             的三处（VICTORY_KOUJO / ATTACK_KOUJO / ATTACK_KOUJO_B 的实际函数名
 *             是去掉 DUNGEON_ 的），OSIOKI_KOUJO 在 ere 侧沿史拼作 osioski-
 *             （各口上文件的既有拼写，不改）。
 *   - family   入口分发用的族（DispatchFamily 的导出名）
 *   - flag_guard 该入口有无 FLAG:7 总开关检查（true = 关掉口上时不派发）。
 *   - call     调用入口时的实参名（驱动方按名取值）
 *   - handler  handler 应收到的实参名（逐条对照实现，是实参契约的锁）
 *
 * **缺席语义不进表**：#565 返工起未命中一律静默（try_kojo 的返回 0、族调用的
 * whenMissing，TRYCALLFORM 落空的等价物），各行没有差别。「有对应函数而
 * 没移植」的真缺口由 test/kojo-family-coverage.test.js 静态核对拦住。
 *
 * 实参名 → 驱动方取值：cid = 目标角色号；event_no = 事件编号（K0 旧签名
 * 收它）；choice = 奖赏/惩罚选择序号；arg0 = gobi_koujo 的情绪编号；
 * q = self_kojo 的自慰妄想对象；rand = 注入的确定性随机源。
 *
 * 表内的行为分支（检查、TARGET 语义、缺席静默）在
 * test/event-k-dispatch.test.js 里逐条钉住——本表只管「谁派发到哪个族」
 * 这一件事。
 */
const EVENT_K_DISPATCH_TABLE = [
  {
    line: 161,
    dispatch: 'KOJO_MESSAGE_COM_',
    entry: 'kojo_message_com',
    erb: 'KOJO_MESSAGE_COM',
    module: 'kojo/kojo-system',
    family: 'kojo_message_com_family',
    flag_guard: true,
    call: ['rand'],
    handler: ['rand'],
  },
  {
    line: 180,
    dispatch: 'KOJO_MESSAGE_PALAMCNG_',
    entry: 'kojo_message_palamcng',
    erb: 'KOJO_MESSAGE_PALAMCNG',
    module: 'kojo/kojo-system',
    family: 'kojo_message_palamcng_family',
    flag_guard: true,
    call: ['rand'],
    handler: ['rand'],
  },
  {
    line: 200,
    dispatch: 'KOJO_MESSAGE_MARKCNG_',
    entry: 'kojo_message_markcng',
    erb: 'KOJO_MESSAGE_MARKCNG',
    module: 'kojo/kojo-system',
    family: 'kojo_message_markcng_family',
    flag_guard: true,
    call: ['rand'],
    handler: ['rand'],
  },
  {
    line: 239,
    dispatch: 'SELF_KOJO_K',
    entry: 'self_kojo',
    erb: 'SELF_KOJO',
    module: 'kojo/kojo-system',
    family: 'self_kojo_family',
    flag_guard: true,
    call: ['rand', 'q'],
    handler: ['rand', 'q'],
  },
  {
    line: 257,
    dispatch: 'DUNGEON_RYOUZYOKU_K',
    entry: 'dungeon_ryouzyoku',
    erb: 'DUNGEON_RYOUZYOKU',
    module: 'kojo/kojo-dungeon-ravish',
    family: 'ryouzyoku_kojo_family',
    flag_guard: false,
    call: [],
    handler: [],
  },
  {
    line: 271,
    dispatch: 'DUNGEON_RYOUZYOKU_AFTER_K',
    entry: 'dungeon_ryouzyoku_after',
    erb: 'DUNGEON_RYOUZYOKU_AFTER',
    module: 'kojo/kojo-dungeon-ravish',
    family: 'ryouzyoku_after_kojo_family',
    flag_guard: false,
    call: [],
    handler: [],
  },
  {
    line: 288,
    dispatch: 'BENKI_KOUJO_K',
    entry: 'benki_koujo',
    erb: 'BENKI_KOUJO',
    module: 'kojo/kojo-system',
    family: 'benki_koujo_family',
    flag_guard: false,
    call: ['rand'],
    handler: ['rand'],
  },
  {
    line: 305,
    dispatch: 'DUNGEON_VICTORY_K',
    entry: 'victory_koujo',
    erb: 'VICTORY_KOUJO',
    module: 'kojo/kojo-system',
    family: 'dungeon_victory_family',
    flag_guard: false,
    call: ['cid', 'rand'],
    handler: ['rand'],
  },
  {
    line: 322,
    dispatch: 'DUNGEON_ATTACK_K',
    entry: 'attack_koujo',
    erb: 'ATTACK_KOUJO',
    module: 'kojo/kojo-system',
    family: 'dungeon_attack_family',
    flag_guard: false,
    call: ['cid', 'rand'],
    handler: ['rand'],
  },
  {
    // ATTACK_KOUJO_B：与 ATTACK_KOUJO 同族同目标，
    // 差别只在 TARGET = B；
    // 调用方在侵略域、尚未移植，本入口先实现
    line: 336,
    dispatch: 'DUNGEON_ATTACK_K',
    entry: 'attack_koujo_b',
    erb: 'ATTACK_KOUJO_B',
    module: 'kojo/kojo-system',
    family: 'dungeon_attack_family',
    flag_guard: false,
    call: ['cid', 'rand'],
    handler: ['rand'],
  },
  {
    line: 351,
    dispatch: 'NTR_KOUJO_K',
    entry: 'ntr_koujo',
    erb: 'NTR_KOUJO',
    module: 'kojo/kojo-system',
    family: 'ntr_koujo_family',
    flag_guard: false,
    call: ['choice', 'rand'],
    handler: ['rand', 'choice'],
  },
  {
    line: 366,
    dispatch: 'EXUCUTION_KOUJO_K',
    entry: 'exucution_koujo',
    erb: 'EXUCUTION_KOUJO',
    module: 'kojo/kojo-system',
    family: 'exucution_koujo_family',
    flag_guard: false,
    call: ['cid', 'event_no', 'rand'],
    handler: ['rand'],
  },
  {
    line: 381,
    dispatch: 'MUSEUM_KOUJO_K',
    entry: 'museum_koujo',
    erb: 'MUSEUM_KOUJO',
    module: 'kojo/kojo-system',
    family: 'museum_koujo_family',
    flag_guard: false,
    call: ['cid', 'event_no', 'rand'],
    handler: ['rand'],
  },
  {
    line: 396,
    dispatch: 'BANISHMENT_KOUJO_K',
    entry: 'banishment_koujo',
    erb: 'BANISHMENT_KOUJO',
    module: 'kojo/kojo-system',
    family: 'banishment_koujo_family',
    flag_guard: false,
    call: ['cid', 'event_no', 'rand'],
    handler: ['rand'],
  },
  {
    line: 411,
    dispatch: 'PUBLIC_EXUCUTION_KOUJO_K',
    entry: 'public_exucution_koujo',
    erb: 'PUBLIC_EXUCUTION_KOUJO',
    module: 'kojo/kojo-system',
    family: 'public_exucution_koujo_family',
    flag_guard: false,
    call: ['cid', 'event_no', 'rand'],
    handler: ['rand'],
  },
  {
    line: 426,
    dispatch: 'GROTESQUE_KOUJO_K',
    entry: 'grotesque_koujo',
    erb: 'GROTESQUE_KOUJO',
    module: 'kojo/kojo-system',
    family: 'grotesque_koujo_family',
    flag_guard: false,
    call: ['cid', 'event_no', 'rand'],
    handler: ['rand'],
  },
  {
    line: 443,
    dispatch: 'ENTERENEMY_KOUJO_K',
    entry: 'enterenemy_koujo',
    erb: 'ENTERENEMY_KOUJO',
    module: 'kojo/kojo-system',
    family: 'enterenemy_koujo_family',
    flag_guard: false,
    call: ['cid', 'rand'],
    handler: ['rand'],
  },
  {
    line: 461,
    dispatch: 'GOHOUBI_REQUEST_KOUJO_K',
    entry: 'gohoubi_request_koujo',
    erb: 'GOHOUBI_REQUEST_KOUJO',
    module: 'kojo/kojo-dungeon-after',
    family: 'gohoubi_request_koujo_family',
    flag_guard: false,
    call: ['cid'],
    handler: ['cid'],
  },
  {
    line: 479,
    dispatch: 'GOHOUBI_AFTER_KOUJO_K',
    entry: 'gohoubi_after_koujo',
    erb: 'GOHOUBI_AFTER_KOUJO',
    module: 'kojo/kojo-dungeon-after',
    family: 'gohoubi_after_koujo_family',
    flag_guard: false,
    call: ['cid', 'choice'],
    handler: ['cid', 'choice'],
  },
  {
    line: 497,
    dispatch: 'OSIOKI_KOUJO_K',
    entry: 'osioski_koujo',
    erb: 'OSIOKI_KOUJO',
    module: 'kojo/kojo-dungeon-after',
    family: 'osioski_koujo_family',
    flag_guard: false,
    call: ['cid', 'choice'],
    handler: ['cid', 'choice'],
  },
  {
    line: 520,
    dispatch: 'GOBI_KOUJO_K',
    entry: 'gobi_koujo',
    erb: 'GOBI_KOUJO',
    module: 'kojo/kojo-system',
    family: 'gobi_koujo_family',
    flag_guard: false,
    call: ['arg0', 'rand'],
    handler: ['arg0', 'rand'],
  },
];

// GOHOUBI_REQUEST_KOUJO 族不在本文件：#403 起只此一个实例，住在
// kojo-dungeon-after.js（该族的分发入口与另外两族同处，调用方在商店侧）。
// 本文件曾有的第二份同名族是实测缺陷——同一族名两个实例会让其中一边的
// 注册永远分不到，见 kojo-dungeon-after.js 的文件头与 test/event-k-dispatch
// .test.js 的族名唯一锁。

/**
 * 分发窗口：LOCAL 落在 [100, 140) 或 (1000, ∞) 时才拼名分发——各入口
 * 都有的那条检查（kojo_message_com / self_kojo /
 * dungeon_ryouzyoku 的凌辱前与凌辱后两处 / gohoubi_after_koujo /
 * osioski_koujo 各段都有它的复写）。
 * 键 = LOCAL - 100，窗口两端因此正好是声明编号空间的两端：普通口上 0-39
 * （LOCAL 100-139）、EX 口上 901-1600（LOCAL 1001-1700）。LOCAL 120-139
 * 现在没有产出源头（GET_KOJO_NUM 只到 119），但窗口照旧收着它们——
 * 上界 140 是**声明空间 40 格的写法**，不是可达值域。
 *
 * **只此一处定义**：全库曾有七份内联复写（本文件四处、kojo-dungeon-after
 * 两处、kojo-dungeon-ravish 一处），边界值改动没有任何用例能看见（#403
 * 验收反馈实测 `local < 140` → `< 139` 全绿）。现在由
 * test/kojo-system.test.js 在 99/100、139/140、1000/1001 两侧逐点钉住，
 * 并核对声明空间恰是窗口的像。
 *
 * @param {number} local GET_KOJO_NUM() 的口上编号
 * @returns {boolean} true = 进分发（键 = local - 100）
 */
function in_kojo_window(local) {
  return (local >= 100 && local < 140) || local > 1000;
}

/**
 * 分发检查能拼出的性格编号（键）。arg 的哨兵语义由 get_kojo_num 定：缺省/负
 * 取当前 TARGET，**0 是合法角色号**。空间外（含无性格 → 0）返回 -1。
 */
function kojo_handler_id(arg = -1) {
  const local = get_kojo_num(arg);
  if (in_kojo_window(local)) {
    return local - 100;
  }
  return -1;
}
/**
 * get_kojo_num：角色 → 口上编号。
 *
 * 素质 160-179（慈愛..貴公子等性格素质）逐格
 * 探测，**最后一格命中者胜**（无 BREAK，后写覆盖先写）。性格素质 →
 * 编号 = COUNT - 60（163 高貴 → 103、165 村娘A/マオ → 105）。EX 素质
 * 101-800 先映射为 1001-1700，后命中的普通性格素质会覆盖它。
 * @param {number} [arg] 角色 ID；缺省（或负）取当前调教目标。
 *   **哨兵只认负数——0 是合法角色号（魔王），读它自己的素质**（#403 二轮
 *   验收实测：`arg <= 0` 会把 0 号的口上静默换成当前 TARGET 的口上）
 * @returns {number} 口上编号（普通 100-119；EX 1001-1700；无命中时 0）
 */
function get_kojo_num(arg = -1) {
  const cid = arg < 0 ? era_flag.target : arg;
  let local = get_ex_kojo_num(cid); // EX 口上先判，普通素质后写覆盖
  for (let count = 160; count < 180; count += 1) {
    if (era.get(`talent:${cid}:${count}`)) {
      local = count - 60;
    }
  }
  return local;
}

/**
 * kojo_message_com：指令执行时的口上入口。
 *
 * 两道检查（总开关；存在判定：普通口上读
 * FLAG:LOCAL，EX 口上读 EX_FLAG:(LOCAL - 900)）之后按编号分发。
 *
 * @param {(n: number) => number} [rand] RAND:N 的随机源（返回 [0, n) 的
 *   整数；缺省均匀随机）。以参数注入而非测试钩子——随机源本就是引擎外
 *   概念（#47 的 juel-check 先例），测试注入定值序固定随机分支
 * @returns {Promise<number>} 0（各检查处的 RETURN 0；调用方不读）
 */
async function kojo_message_com(rand) {
  // 第一道检查：总开关 FLAG:7 <= 0 直接返回（玩家可关）
  if ((era.get('flag:7') || 0) <= 0) {
    return 0;
  }

  // 第二道检查：口上存在判定 FLAG:LOCAL == 0（&& EX_FLAG 分支）
  const local = get_kojo_num(); // GET_KOJO_NUM()（参缺省 → TARGET）
  if (
    (era.get(`flag:${local}`) || 0) === 0 &&
    era_exflag.get(local - 900) === 0
  ) {
    return 0;
  }

  // キャラ別：TRYCALLFORM KOJO_MESSAGE_COM_{LOCAL - 100}
  if (in_kojo_window(local)) {
    await kojo_message_com_family.call(local - 100, {
      whenMissing: 0,
      args: [rand],
    });
  }
  return 0;
}

/**
 * self_kojo：事件口上入口（EVENT_AFTERTRAIN 等处的调用点）。
 * 两道检查：FLAG:7 <= 0 时 TFLAG:15 = 0 并返回 0；LOCAL 判定后 TRYCALLFORM SELF_KOJO_K{LOCAL - 100}。
 *
 * @param {(n: number) => number} [rand] RAND:N 的随机源
 * @param {number} [q] 自慰妄想对象（0 主人 / 1 助手 / 2 野狗）
 * @param {boolean} [outside_train] 调教外事件不写只在调教期存在的 TFLAG:15
 * @returns {Promise<number>} 0
 */
async function self_kojo(rand, q, outside_train = false) {
  // 第一道检查：总开关 FLAG:7 <= 0
  if ((era.get('flag:7') || 0) <= 0) {
    if (!outside_train) {
      const { game } = require('#/facade/game');
      game.train.怪物射精或购入金 = 0;
    }
    return 0;
  }

  // GET_KOJO_NUM()
  const local = get_kojo_num();

  // キャラ別：TRYCALLFORM SELF_KOJO_K{LOCAL - 100}
  if (in_kojo_window(local)) {
    await self_kojo_family.call(local - 100, {
      whenMissing: 0,
      args: [rand, q],
    });
  }
  return 0;
}

/**
 * 已注册则走真身，**未命中静默**（#565 返工第 4 条起，TRYCALLFORM
 * 落空的 RESULT 0 语义——此前打占位行，把「本来就没有」（如 K11 没有语
 * 尾函数）与「ID 在口上窗口外」（如魔王的 -2 确认页）也吵成一条占位）。
 *
 * 「有对应函数而没移植」的真缺口因此不再有运行时提示，改由
 * test/kojo-family-coverage.test.js 的静态核对拦住：缺口即红。
 * kojo-dungeon-after.js 的 gohoubi_request_koujo 也用它（同一条缺席策略只
 * 实现一次）。
 *
 * #585：占位语义取消后，原来的 stub_desc / stub_ticket / wait 三个形参只剩
 * `void` 压着，随改名一并删除（函数名的 or_stub 后缀已名不副实）；#638 删
 * 占位机制时，仅服务静态核对的 stub_name 形参随之删除。
 *
 * @param {import('#/system/dispatch/dispatch-family').DispatchFamily} family
 *   目标分发族
 * @param {number} [arg=-1] 角色号（缺省取当前 TARGET；经 kojo_handler_id 换算）
 * @param {any[]} [extra_args=[]] 透传给 handler 的实参
 * @returns {Promise<any>} handler 的返回值，或未命中的 0
 */
async function try_kojo(family, arg = -1, extra_args = []) {
  const id = kojo_handler_id(arg);
  if (id >= 0 && family.has(id)) {
    return family.call(id, { whenMissing: 0, args: extra_args });
  }
  return 0;
}

async function kojo_message_palamcng(rand) {
  if ((era.get('flag:7') || 0) <= 0) {
    return 0;
  }
  const local = get_kojo_num();
  // 的第二道检查：SIF FLAG:LOCAL == 0 && EX_FLAG:(LOCAL - 900) == 0 → RETURN 0
  // EX 口上（LOCAL > 1000）的存在标志是 EX_FLAG:(LOCAL - 900)，不是 FLAG:LOCAL
  // ——只判 FLAG:LOCAL 会把 EX 性格的 PALAMCNG 口上永久静默（#403 实测补齐）
  if (
    (era.get(`flag:${local}`) || 0) === 0 &&
    era_exflag.get(local - 900) === 0
  ) {
    return 0;
  }
  return try_kojo(kojo_message_palamcng_family, -1, [rand]);
}

async function kojo_message_markcng(rand) {
  if ((era.get('flag:7') || 0) <= 0) {
    return 0;
  }
  return try_kojo(kojo_message_markcng_family, -1, [rand]);
}

async function benki_koujo(rand) {
  return try_kojo(benki_koujo_family, -1, [rand]);
}

async function victory_koujo(cid, rand) {
  const target_pool = era_flag.target;
  if (cid !== undefined && cid >= 0) {
    era_flag.target = cid;
  }
  const result = await try_kojo(dungeon_victory_family, cid ?? -1, [rand]);
  era_flag.target = target_pool;
  return result;
}

async function attack_koujo(cid, rand) {
  const target_pool = era_flag.target;
  if (cid !== undefined && cid >= 0) {
    era_flag.target = cid;
  }
  const result = await try_kojo(dungeon_attack_family, cid ?? -1, [rand]);
  era_flag.target = target_pool;
  return result;
}

/**
 * attack_koujo_b：战斗攻击口上的 B 侧变体。
 *
 * 与 attack_koujo 同族同目标（TRYCALLFORM DUNGEON_ATTACK_K{LOCAL - 100}），
 * 差别只在指针来源：attack_koujo 是 `TARGET = ARG:0` 带参，
 * attack_koujo_b 零参、吃全局 B（`TARGET = B`）。B 是侵略战斗
 * 的「被攻击方」暂存，ere 侧无单字母全局通道，按 #5 决议第六条以形参显式传入。
 *
 * **调用方尚未移植**：`CALL ATTACK_KOUJO_B` 全库唯一一处，在
 * 侵略域的 ARCANA 战斗里（FLAG:5 & 32 的台词检查内），随侵略
 * 票实现真身。本入口照 22 条分发表先实现（表是 #403 的交付面），
 * 接入时调用方传 `B` 的取值即可，不改本签名。
 *
 * 本入口无额外检查；缺席语义取静默——与同族 attack_koujo
 * 一致（#565 返工第 4 条起：try_kojo 未命中不打占位）。TARGET 暂存/还原按
 * 同族既有约定（脚本不还原，ere 侧不留跨调用指针残留）。
 *
 * @param {number} cid B 侧角色号
 * @param {(n: number) => number} [rand] RAND:N 的随机源
 * @returns {Promise<number>} TRYCALL 落空时的 RESULT 0（调用方不读）
 */
async function attack_koujo_b(cid, rand) {
  const target_pool = era_flag.target;
  if (cid !== undefined && cid >= 0) {
    era_flag.target = cid; // TARGET = B
  }
  const result = await try_kojo(
    dungeon_attack_family, // TRYCALLFORM DUNGEON_ATTACK_K{LOCAL - 100}
    cid ?? -1,
    [rand],
  );
  era_flag.target = target_pool;
  return result;
}

/**
 * 处刑首五族（EXUCUTION / MUSEUM / BANISHMENT / PUBLIC_EXUCUTION /
 * GROTESQUE）的共同分发体——五处结构相同：
 * `LOCAL = GET_KOJO_NUM()`（存在判定注释态）→ 检查 → `TRYCALLFORM
 * <族>_K{LOCAL - 100}`。五族都不设 TARGET（调用方自己管
 * TARGET），所以本分发体不碰它。
 *
 * 族内实参一个：键 0（K0 慈愛）是早期实现的旧签名，收事件编号
 * （展品号/处刑号，一族的 K 侧从 TARGET 之外显式收它）；其余键收
 * 随机源——这条分档原先写在五个调用点里（各处同款三元式），#403 整合
 * 到分发体，行为不变。
 *
 * 缺席语义 = 静默（TRYCALL 落空；与 kojo_message_com 同款）。
 *
 * @param {import('#/system/dispatch/dispatch-family').DispatchFamily} family 目标族
 * @param {number} cid 对象角色号（调用方已把 TARGET 置成它）
 * @param {number} event_no 事件编号（K0 旧签名收它）
 * @param {(n: number) => number} [rand] RAND:N 的随机源
 * @returns {Promise<number>} 0（调用方不读）
 */
async function dispatch_execution_koujo(family, cid, event_no, rand) {
  const id = kojo_handler_id(cid); // LOCAL = GET_KOJO_NUM()
  if (id >= 0) {
    const arg = id === 0 ? event_no : rand;
    await family.call(id, { whenMissing: 0, args: [arg] });
  }
  return 0;
}

/** exucution_koujo：处刑口上；调用方 ere/event/event-execution.js */
async function exucution_koujo(cid, event_no, rand) {
  return dispatch_execution_koujo(exucution_koujo_family, cid, event_no, rand);
}

/** museum_koujo：博物馆（雕像）口上；调用方 ere/event/event-museum.js */
async function museum_koujo(cid, event_no, rand) {
  return dispatch_execution_koujo(museum_koujo_family, cid, event_no, rand);
}

/** banishment_koujo：流放处刑口上；调用方 ere/event/event-banishment.js */
async function banishment_koujo(cid, event_no, rand) {
  return dispatch_execution_koujo(banishment_koujo_family, cid, event_no, rand);
}

/** public_exucution_koujo：公开处刑口上；调用方 ere/event/event-public-execution.js */
async function public_exucution_koujo(cid, event_no, rand) {
  return dispatch_execution_koujo(
    public_exucution_koujo_family,
    cid,
    event_no,
    rand,
  );
}

/** grotesque_koujo：猎奇处刑口上；调用方 ere/event/event-grotesque.js */
async function grotesque_koujo(cid, event_no, rand) {
  return dispatch_execution_koujo(grotesque_koujo_family, cid, event_no, rand);
}

/**
 * ntr_koujo：按当前目标的性格编号分发 NTR 口上。
 * 族的统一参数顺序是 [rand, P]；少数旧 handler 的单参数注册在各自模块处
 * 适配，避免把随机源误当成旧引擎的全局 P。
 */
function adapt_legacy_ntr_koujo(handler) {
  return (rand, p) => handler(p ?? rand);
}

async function ntr_koujo(p, rand) {
  const id = kojo_handler_id();
  if (id >= 0) {
    await ntr_koujo_family.call(id, { whenMissing: 0, args: [rand, p] });
  }
  return 0;
}

async function enterenemy_koujo(cid, rand) {
  const target_pool = era_flag.target;
  era_flag.target = cid;
  const result = await try_kojo(enterenemy_koujo_family, cid, [rand]);
  era_flag.target = target_pool;
  return result;
}

/**
 * gobi_koujo：语尾口上。旧引擎各 K 真身用**不换行 PRINT** 把语尾
 * 写进调用方的当前行（PRINTFORM → CALL → PRINT 」同行）；
 * ere 引擎一次 era.print 即一行，「插入后再续写」没有对应写法，#570 起真身
 * 改为返回语尾文字、由调用方拼进行内（look.js / 迷宫凌辱两侧）。
 *
 * @param {number} arg0 情绪档位（0 默认 / 1 喜 / 2 怒 / 3 悲 / 4 恥 / 5 情けない）
 * @param {(n: number) => number} [rand] RAND:N 的随机源（默认支三选一用）
 * @returns {Promise<string>} 语尾文字；未命中（TRYCALLFORM 落空，如 K11
 *   就没有语尾函数）返回空串——调用方的行照常结束
 */
async function gobi_koujo(arg0, rand) {
  const text = await try_kojo(gobi_koujo_family, -1, [arg0, rand]);
  return typeof text === 'string' ? text : '';
}

module.exports = {
  EVENT_K_DISPATCH_TABLE,
  get_kojo_num,
  in_kojo_window,
  kojo_handler_id,
  kojo_message_com,
  kojo_message_com_family,
  kojo_message_palamcng,
  kojo_message_palamcng_family,
  kojo_message_markcng,
  kojo_message_markcng_family,
  self_kojo,
  self_kojo_family,
  dog_kojo_family,
  colosseum_kojo_family,
  benki_koujo,
  benki_koujo_family,
  victory_koujo,
  dungeon_victory_family,
  attack_koujo,
  attack_koujo_b,
  dungeon_attack_family,
  adapt_legacy_ntr_koujo,
  ntr_koujo,
  ntr_koujo_family,
  exucution_koujo,
  exucution_koujo_family,
  museum_koujo,
  museum_koujo_family,
  banishment_koujo,
  banishment_koujo_family,
  public_exucution_koujo,
  public_exucution_koujo_family,
  grotesque_koujo,
  grotesque_koujo_family,
  enterenemy_koujo,
  enterenemy_koujo_family,
  try_kojo,
  gobi_koujo,
  gobi_koujo_family,
};
