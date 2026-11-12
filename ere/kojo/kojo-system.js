/**
 * @file 口上系统的公共底座：口上总开关、性格编号解析、全部口上入口的分发。
 *
 * 调用点：source-check（SIF FLAG:7 > 0 / CALL KOJO_MESSAGE_COM，
 * ere/system/train/source-check.js）。
 *
 * == 总开关（事件链机制，#6 的真实用例） ==
 *
 *   - FLAG:7 是玩家可关的口上总开关；EVENTSHOP 与 EVENTTRAIN 的 #PRI 在其为 0
 *     时置 2（默认开，且**只补 0**：玩家显式关掉（-1）不会自开）。
 *
 * == 分发（决议 #7 的机制） ==
 *
 * TRYCALLFORM KOJO_MESSAGE_COM_{LOCAL - 100} 改走工厂（#854 起）。编号空间 =
 * 分发检查（`LOCAL >= 100 && LOCAL < 140 || LOCAL > 1000`，按
 * 「&& 与 || 同优先级、左结合」读作 `(100..139) || 1000 以上`——`||` 之后没有
 * `&&`，两种读法同值，与 `local > 1000` 并列即为窗口；#517。ere 侧整合成
 * in_kojo_window，只此一处定义）能拼出的**全部**函数名：普通口上 0-39
 * （性格素质 160-179 → LOCAL 100-119）、EX 口上 901-1600
 * （EX_TALENT 101-800 → LOCAL 1001-1700）。空间内缺失合法（未移植的性格不
 * 发一言）：工厂对未注册编号退回基类实例，钩子一律不输出——与 TRYCALL 落空
 * 同款；重复注册启动即炸（防同名口上互相遮蔽）。
 *
 * #859 起不再有分发族（22 个 `DispatchFamily`）与「口上存在标志」
 * （FLAG:100-119 / EX_FLAG:103-104）：模块装没装由工厂的注册表回答，
 * 存在标志因此没有读者，读写一并删除。
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
 * EX_TALENT 101-800，命中 +900）。EX_TALENT:102 映射为
 * LOCAL 1002，再分发到 K902。
 */

const era = require('#/era-electron');
const { game } = require('#/facade/game');
const { get_kojo } = require('#/kojo/kojo-factory');
const { on, TIER } = require('#/system/event/registry');
const era_flag = require('#/era-utils/era-flag');
const { get_ex_kojo_num } = require('#/system/chara/chara-ex');
const { EVENT } = require('#/data/event-name-const');

// 口上总开关默认开。SIF FLAG:7 == 0 只补 0——玩家关掉（-1）不自开，
// 1（少量模式）不改。EVENTSHOP 与 EVENTTRAIN #PRI 两处同款（原版两处各写一遍）
function default_kojo_switch_on() {
  if ((era.get('flag:7') || 0) === 0) {
    // FLAG:7 = 2（口上总开关：2=默认全量、1=每阶段一次、<=0=关）
    era.set('flag:7', 2);
  }
}

const handle_shop_pri = default_kojo_switch_on;
const handle_train_pri = default_kojo_switch_on;

/**
 * 22 条 TRYCALLFORM 分发表（#403 的交付面）。
 *
 * 不进表的 5 个入口：EVENTSHOP（本文件的 on(EVENT.SHOP, …)）、
 * GET_KOJO_NUM（本文件的 get_kojo_num）与三个 **未使用**的入口
 * （KOJO_MESSAGE_COM_MASTER / _ASSI / KOJO_MESSAGE_PLAYERCHANGE——
 * 它们的 TRYCALLFORM 本就是注释态，不派发，故不进表）。
 *
 * 字段：
 *   - dispatch TRYCALLFORM 拼出的函数名前缀（编号 = LOCAL - 100）
 *   - entry    ere 侧入口函数名；module 是它所在的模块（load_module 可加载名）
 *   - erb      拼名对应的函数名。**与 entry 不是大小写互转**：dispatch 前缀带 DUNGEON_
 *             的三处（VICTORY_KOUJO / ATTACK_KOUJO / ATTACK_KOUJO_B 的实际函数名
 *             是去掉 DUNGEON_ 的），OSIOKI_KOUJO 在 ere 侧沿史拼作 osioski-
 *             （各口上文件的既有拼写，不改）。
 *   - flag_guard 该入口有无 FLAG:7 总开关检查（true = 关掉口上时不派发）。
 *   - call     调用入口时的实参名（驱动方按名取值）
 *   - handler  handler 应收到的实参名（逐条对照实现，是实参契约的锁）
 *
 * **缺席语义不进表**：未命中一律静默（工厂退回基类实例的返回 0，TRYCALLFORM
 * 落空的等价物），各行没有差别。「有对应函数而没移植」的真缺口由
 * test/kojo-register-coverage.test.js 静态核对拦住。
 *
 * 实参名 → 驱动方取值：cid = 目标角色号；event_no = 事件编号（处刑方式/展品号/
 * 处分号，五族都只收它）；choice = 奖赏/惩罚选择序号；arg0 = gobi_koujo 的
 * 情绪编号；q = self_kojo 的自慰妄想对象；rand = 注入的确定性随机源。
 *
 * 表内的行为分支（检查、TARGET 语义、缺席静默）在
 * test/event-k-dispatch.test.js 里逐条钉住——本表只管「谁派发到哪个入口」
 * 这一件事。
 */
const EVENT_K_DISPATCH_TABLE = [
  {
    dispatch: 'KOJO_MESSAGE_COM_',
    entry: 'kojo_message_com',
    erb: 'KOJO_MESSAGE_COM',
    module: 'kojo/kojo-system',
    flag_guard: true,
    call: ['rand'],
    handler: ['rand'],
  },
  {
    dispatch: 'KOJO_MESSAGE_PALAMCNG_',
    entry: 'kojo_message_palamcng',
    erb: 'KOJO_MESSAGE_PALAMCNG',
    module: 'kojo/kojo-system',
    flag_guard: true,
    call: ['rand'],
    handler: ['rand'],
  },
  {
    dispatch: 'KOJO_MESSAGE_MARKCNG_',
    entry: 'kojo_message_markcng',
    erb: 'KOJO_MESSAGE_MARKCNG',
    module: 'kojo/kojo-system',
    flag_guard: true,
    call: ['rand'],
    handler: ['rand'],
  },
  {
    dispatch: 'SELF_KOJO_K',
    entry: 'self_kojo',
    erb: 'SELF_KOJO',
    module: 'kojo/kojo-system',
    flag_guard: true,
    call: ['rand', 'q'],
    handler: ['rand', 'q'],
  },
  {
    dispatch: 'DUNGEON_RYOUZYOKU_K',
    entry: 'dungeon_ryouzyoku',
    erb: 'DUNGEON_RYOUZYOKU',
    module: 'kojo/kojo-dungeon-ravish',
    flag_guard: false,
    call: [],
    handler: [],
  },
  {
    dispatch: 'DUNGEON_RYOUZYOKU_AFTER_K',
    entry: 'dungeon_ryouzyoku_after',
    erb: 'DUNGEON_RYOUZYOKU_AFTER',
    module: 'kojo/kojo-dungeon-ravish',
    flag_guard: false,
    call: [],
    handler: [],
  },
  {
    dispatch: 'BENKI_KOUJO_K',
    entry: 'benki_koujo',
    erb: 'BENKI_KOUJO',
    module: 'kojo/kojo-system',
    flag_guard: false,
    call: ['rand'],
    handler: ['rand'],
  },
  {
    dispatch: 'DUNGEON_VICTORY_K',
    entry: 'victory_koujo',
    erb: 'VICTORY_KOUJO',
    module: 'kojo/kojo-system',
    flag_guard: false,
    call: ['cid', 'rand'],
    handler: ['rand'],
  },
  {
    dispatch: 'DUNGEON_ATTACK_K',
    entry: 'attack_koujo',
    erb: 'ATTACK_KOUJO',
    module: 'kojo/kojo-system',
    flag_guard: false,
    call: ['cid', 'rand'],
    handler: ['rand'],
  },
  {
    // ATTACK_KOUJO_B：与 ATTACK_KOUJO 同族同目标，
    // 差别只在 TARGET = B；
    // 调用方在侵略域、尚未移植，本入口先实现
    dispatch: 'DUNGEON_ATTACK_K',
    entry: 'attack_koujo_b',
    erb: 'ATTACK_KOUJO_B',
    module: 'kojo/kojo-system',
    flag_guard: false,
    call: ['cid', 'rand'],
    handler: ['rand'],
  },
  {
    dispatch: 'NTR_KOUJO_K',
    entry: 'ntr_koujo',
    erb: 'NTR_KOUJO',
    module: 'kojo/kojo-system',
    flag_guard: false,
    call: ['choice', 'rand'],
    handler: ['rand', 'choice'],
  },
  {
    dispatch: 'EXUCUTION_KOUJO_K',
    entry: 'exucution_koujo',
    erb: 'EXUCUTION_KOUJO',
    module: 'kojo/kojo-system',
    flag_guard: false,
    call: ['cid', 'event_no'],
    handler: ['event_no'],
  },
  {
    dispatch: 'MUSEUM_KOUJO_K',
    entry: 'museum_koujo',
    erb: 'MUSEUM_KOUJO',
    module: 'kojo/kojo-system',
    flag_guard: false,
    call: ['cid', 'event_no'],
    handler: ['event_no'],
  },
  {
    dispatch: 'BANISHMENT_KOUJO_K',
    entry: 'banishment_koujo',
    erb: 'BANISHMENT_KOUJO',
    module: 'kojo/kojo-system',
    flag_guard: false,
    call: ['cid', 'event_no'],
    handler: ['event_no'],
  },
  {
    dispatch: 'PUBLIC_EXUCUTION_KOUJO_K',
    entry: 'public_exucution_koujo',
    erb: 'PUBLIC_EXUCUTION_KOUJO',
    module: 'kojo/kojo-system',
    flag_guard: false,
    call: ['cid', 'event_no'],
    handler: ['event_no'],
  },
  {
    dispatch: 'GROTESQUE_KOUJO_K',
    entry: 'grotesque_koujo',
    erb: 'GROTESQUE_KOUJO',
    module: 'kojo/kojo-system',
    flag_guard: false,
    call: ['cid', 'event_no'],
    handler: ['event_no'],
  },
  {
    dispatch: 'ENTERENEMY_KOUJO_K',
    entry: 'enterenemy_koujo',
    erb: 'ENTERENEMY_KOUJO',
    module: 'kojo/kojo-system',
    flag_guard: false,
    call: ['cid', 'rand'],
    handler: ['rand'],
  },
  {
    dispatch: 'GOHOUBI_REQUEST_KOUJO_K',
    entry: 'gohoubi_request_koujo',
    erb: 'GOHOUBI_REQUEST_KOUJO',
    module: 'kojo/kojo-dungeon-after',
    flag_guard: false,
    call: ['cid'],
    handler: ['cid'],
  },
  {
    dispatch: 'GOHOUBI_AFTER_KOUJO_K',
    entry: 'gohoubi_after_koujo',
    erb: 'GOHOUBI_AFTER_KOUJO',
    module: 'kojo/kojo-dungeon-after',
    flag_guard: false,
    call: ['cid', 'choice'],
    handler: ['cid', 'choice'],
  },
  {
    dispatch: 'OSIOKI_KOUJO_K',
    entry: 'osioski_koujo',
    erb: 'OSIOKI_KOUJO',
    module: 'kojo/kojo-dungeon-after',
    flag_guard: false,
    call: ['cid', 'choice'],
    handler: ['cid', 'choice'],
  },
  {
    dispatch: 'GOBI_KOUJO_K',
    entry: 'gobi_koujo',
    erb: 'GOBI_KOUJO',
    module: 'kojo/kojo-system',
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
 * 两道检查（总开关；编号窗口）+ 分发都交给 run_kojo；口上本体在
 * `kojo_message_com` 钩子里（K4 的头部检查与指令分支见 kojo-k4-stoic.js）。
 *
 * @param {(n: number) => number} [rand] RAND:N 的随机源（返回 [0, n) 的
 *   整数；缺省均匀随机）。以参数注入而非测试钩子——随机源本就是引擎外
 *   概念（#47 的 juel-check 先例），测试注入定值序固定随机分支
 * @returns {Promise<number>} 0（各检查处的 RETURN 0；调用方不读）
 */
async function kojo_message_com(rand) {
  await run_kojo('kojo_message_com', { args: [rand], flag_guard: true });
  return 0;
}

/**
 * self_kojo：事件口上入口（EVENT_AFTERTRAIN 等处的调用点）。
 * 总开关关掉时清 TFLAG:15（怪物射精或购入金）；其余检查与分发在 run_kojo。
 *
 * @param {(n: number) => number} [rand] RAND:N 的随机源
 * @param {number} [q] 自慰妄想对象（0 主人 / 1 助手 / 2 野狗）
 * @param {boolean} [outside_train] 调教外事件不写只在调教期存在的 TFLAG:15
 * @returns {Promise<number>} 0
 */
async function self_kojo(rand, q, outside_train = false) {
  await run_kojo('self_kojo', {
    args: [rand, q],
    flag_guard: true,
    when_disabled: () => {
      if (!outside_train) {
        game.train.怪物射精或购入金 = 0;
      }
    },
  });
  return 0;
}

/**
 * 口上唯一入口：总开关 → 编号窗口 → 选口上对象 → 钩子。
 *
 * 21 条分发入口（`DOG_KOJO` / `COLOSSEUM_KOJO` 两个时机没有分发入口，由各
 * 口上文件内部直调）都走这里。性格由 `get_kojo_num` 定，对象由工厂给
 * （`ere/kojo/kojo-base.js` 的钩子；未注册的编号是基类实例，钩子不输出）。
 *
 * 钩子名由入口显式给出，不用入口名推：两处的名字带 `_K` 后缀
 * （`DUNGEON_RYOUZYOKU_K`），与钩子名不同源；写错时第一次调用即抛错，
 * 不落回静默。
 *
 * 缺席语义 = 静默（TRYCALLFORM 落空的 RESULT 0）：编号在窗口外（无性格素质）
 * 与工厂退回基类实例，两条路都返回 0。
 *
 * @param {string} hook 钩子名（KojoBase 的方法名）
 * @param {object} [options]
 * @param {number} [options.cid=-1] 角色号（缺省/负数取当前 TARGET；0 是合法角色号）
 * @param {any[]|((id: number) => any[])} [options.args=[]] 钩子实参（= #213 的
 *   handler 契约，见 kojo-base.js 的钩子名单）；给函数时按分发键算
 * @param {boolean} [options.flag_guard=false] 是否先过 FLAG:7 总开关
 * @param {Function} [options.when_disabled] 总开关关掉时的副作用（SELF_KOJO 要清 TFLAG:15）
 * @returns {Promise<any>} 钩子的返回值；未命中时 0
 */
async function run_kojo(hook, options = {}) {
  const { cid = -1, args = [], flag_guard = false, when_disabled } = options;

  // 总开关：FLAG:7 <= 0 是玩家关掉了口上（默认 2 = 全量，1 = 每阶段一次）
  if (flag_guard && (era.get('flag:7') || 0) <= 0) {
    if (when_disabled !== undefined) {
      await when_disabled();
    }
    return 0;
  }

  const local = get_kojo_num(cid); // GET_KOJO_NUM()
  const id = in_kojo_window(local) ? local - 100 : -1;
  if (id < 0) {
    return 0;
  }
  // 实参可以依赖键（处刑首五族的「键 0 收事件编号、其余收随机源」）
  const hook_args = typeof args === 'function' ? args(id) : args;
  const kojo = get_kojo(id);
  if (typeof kojo[hook] !== 'function') {
    throw new Error(`口上钩子 ${hook} 不存在（编号 ${id}）`);
  }
  return kojo[hook](...hook_args);
}

async function kojo_message_palamcng(rand) {
  return run_kojo('kojo_message_palamcng', { args: [rand], flag_guard: true });
}

async function kojo_message_markcng(rand) {
  return run_kojo('kojo_message_markcng', { args: [rand], flag_guard: true });
}

async function benki_koujo(rand) {
  return run_kojo('benki_koujo', { args: [rand] });
}

async function victory_koujo(cid, rand) {
  const target_pool = era_flag.target;
  if (cid !== undefined && cid >= 0) {
    era_flag.target = cid;
  }
  const result = await run_kojo('dungeon_victory', {
    cid: cid ?? -1,
    args: [rand],
  });
  era_flag.target = target_pool;
  return result;
}

async function attack_koujo(cid, rand) {
  const target_pool = era_flag.target;
  if (cid !== undefined && cid >= 0) {
    era_flag.target = cid;
  }
  const result = await run_kojo('dungeon_attack', {
    cid: cid ?? -1,
    args: [rand],
  });
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
 * 本入口无额外检查；缺席语义取静默——与同一个钩子 attack_koujo
 * 一致。TARGET 暂存/还原按同款约定（脚本不还原，ere 侧不留跨调用指针残留）。
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
  const result = await run_kojo('dungeon_attack', {
    cid: cid ?? -1,
    args: [rand],
  });
  era_flag.target = target_pool;
  return result;
}

/**
 * 处刑五处（EXUCUTION / MUSEUM / BANISHMENT / PUBLIC_EXUCUTION /
 * GROTESQUE）的共同分发体——五处结构相同：`LOCAL = GET_KOJO_NUM()` →
 * `TRYCALLFORM <钩子>_K{LOCAL - 100}`。五处都不设 TARGET（调用方自己管
 * TARGET），所以本分发体不碰它。
 *
 * 钩子实参一个：事件编号（处刑方式号 / 展品号 / 处分号）。旧引擎把这几个
 * 值写在 TFLAG:16/500/510/520/530 里，口上按性格直接读或在门面上读；
 * 批量处刑为让这几个槽可寻址曾整段打开调教窗口。现在由调用点作为参数
 * 传进来，五处的实参一致，K0 不再需要单独的旧签名分档。
 *
 * 缺席语义 = 静默（TRYCALL 落空；与 kojo_message_com 同款）。
 *
 * @param {string} hook 钩子名（= 入口名）
 * @param {number} cid 对象角色号（调用方已把 TARGET 置成它）
 * @param {number} event_no 事件编号（处分方式/展品号）
 * @returns {Promise<number>} 0（调用方不读）
 */
async function dispatch_execution_koujo(hook, cid, event_no) {
  await run_kojo(hook, { cid, args: [event_no] });
  return 0;
}

/** exucution_koujo：处刑口上；调用方 ere/event/event-execution.js */
async function exucution_koujo(cid, event_no) {
  return dispatch_execution_koujo('exucution_koujo', cid, event_no);
}

/** museum_koujo：博物馆（雕像）口上；调用方 ere/event/event-museum.js */
async function museum_koujo(cid, event_no) {
  return dispatch_execution_koujo('museum_koujo', cid, event_no);
}

/** banishment_koujo：流放处刑口上；调用方 ere/event/event-banishment.js */
async function banishment_koujo(cid, event_no) {
  return dispatch_execution_koujo('banishment_koujo', cid, event_no);
}

/** public_exucution_koujo：公开处刑口上；调用方 ere/event/event-public-execution.js */
async function public_exucution_koujo(cid, event_no) {
  return dispatch_execution_koujo('public_exucution_koujo', cid, event_no);
}

/** grotesque_koujo：猎奇处刑口上；调用方 ere/event/event-grotesque.js */
async function grotesque_koujo(cid, event_no) {
  return dispatch_execution_koujo('grotesque_koujo', cid, event_no);
}

/**
 * ntr_koujo：按当前目标的性格编号分发 NTR 口上。
 * 钩子的统一参数顺序是 [rand, P]；收旧引擎全局 P 的本体在各自的类里换算
 * （`ntr_koujo(rand, p) { return ntr_koujo_kN(p ?? rand); }`）。
 */
async function ntr_koujo(p, rand) {
  await run_kojo('ntr_koujo', { args: [rand, p] });
  return 0;
}

async function enterenemy_koujo(cid, rand) {
  const target_pool = era_flag.target;
  era_flag.target = cid;
  const result = await run_kojo('enterenemy_koujo', { cid, args: [rand] });
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
  const text = await run_kojo('gobi_koujo', { args: [arg0, rand] });
  return typeof text === 'string' ? text : '';
}

/**
 * EVENTTRAIN NORMAL 档：调教开始时的口上。
 *
 * 迁移前这是 19 份口上文件各注册一份的处理器，各自查「目标身上有我的素质
 * 吗」；现在只注册一次，性格由 `get_kojo_num` 定、本体由工厂给（#859）。
 *
 * @param {(n: number) => number} [rand] RAND:N 的随机源（EVENTTRAIN 的实参）
 * @returns {Promise<number>} 0（调用方不读）
 */
async function handle_train(rand) {
  return run_kojo('event_train', { args: [rand] });
}

/** EVENTEND NORMAL 档：调教结束时的口上（分发同 handle_train） */
async function handle_end(rand) {
  return run_kojo('event_end', { args: [rand] });
}

/**
 * 本模块的事件处理器：由 system/flow/startup.js 的装配表按顺序调用 register()
 * 注册（模块装载本身不注册，装配顺序见该文件）。
 *
 * 四处接线：总开关补 0（EVENTSHOP 与 EVENTTRAIN #PRI 各一次，原版同）、
 * 调教开始 / 结束各一次口上分发。原版的 EVENTEND #LATER 档只清口上存在标志，
 * 标志删除后这一档没有别的事可做，不再注册。
 */
function register() {
  on(EVENT.SHOP, handle_shop_pri, TIER.PRI);
  on(EVENT.TRAIN, handle_train_pri, TIER.PRI);
  on(EVENT.TRAIN, handle_train, TIER.NORMAL);
  on(EVENT.END, handle_end, TIER.NORMAL);
}

module.exports = {
  register,
  EVENT_K_DISPATCH_TABLE,
  get_kojo_num,
  in_kojo_window,
  kojo_message_com,
  kojo_message_palamcng,
  kojo_message_markcng,
  self_kojo,
  benki_koujo,
  victory_koujo,
  attack_koujo,
  attack_koujo_b,
  ntr_koujo,
  exucution_koujo,
  museum_koujo,
  banishment_koujo,
  public_exucution_koujo,
  grotesque_koujo,
  enterenemy_koujo,
  run_kojo,
  gobi_koujo,
};
