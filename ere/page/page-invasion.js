/**
 * @file 侵略画面：@INVASION 的四条出兵路线与地上征服后菜单 + @KYOTEN_EVENT
 *     的人间界臂 + @INVASION_EVENT 的 RAND 分发 + @INVASION_CHECK 五组结局判定
 *     （issue #117 魔力出兵；issue #118 结局判定本体与 ENDING_1 接线；
 *     issue #468 地上征服后菜单渲染与派发、CAMPAIGN_MENU 接通；
 *     issue #503 怪物出兵 / 勇者掠夺两条路线）。
 *
 * 源: target/ERB/侵略/INVASION.ERB  @INVASION（:6-997）：地上征服后菜单
 *       :25-138（#468，post_conquest_menu；[9] 转 CAMPAIGN_MENU）/ 出兵菜单
 *       :139-204 与四条路线——[0] 怪物出兵 :210-263、[1] 魔力出兵 :266-296
 *       （#117）、[2] 勇者出兵 :299-441（存根，#504）、[3] 勇者掠夺
 *       :442-563（[0]/[3] 为 #503）——共通补正 :565-603、结果段
 *       :609-618 + :620-692（[0]）/ :694-757（[1]）/ :891-975（[3]）、
 *       结算尾 :976-997 / @MEDAL_BONUS（:1026-1067）/ @SENGEN_VIDEO
 *       （:1070-1233）+ @SENGEN_VIDEO_BONUS（:1236-1266）（三者 #502）/
 *       @INVASION_CHECK（:999-1021，#118 五组条件 1:1；ENDING_x 演出本体在
 *       ere/event/event-ending.js）
 *     target/ERB/侵略/INVASION_EVENT.ERB  @KYOTEN_EVENT（:2-209，仅 ARG:0
 *       == 1 人间界臂）/ @INVASION_EVENT（:212-235，RAND:10 真分发，三臂
 *       JUMP 到 SEIEI / FORT / CHALLENGE）/ @INVASION_EVENT_FORT
 *       （:530-814，存根）/ @INVASION_EVENT_CHALLENGE（:815-1054，存根）
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - CLEARLINE 局部重绘不镜像（:26 等）：ere 控制台是滚动视图，画面每次
 *     进入整屏重画（page-select-target 同款先例）；$INPUT_LOOP/$INPUT_LOOP2
 *     对无效输入只重问不重画（GOTO），1:1 保留；
 *   - [999]/[1000] 原作同行显示（:82-83 的 PRINT 接 PRINTFORML，不换行）；
 *     ere 侧按钮是块级元素，拆成两个 printButton 各占一行，功能等价；
 *   - BARSTR 文本条 → era 原生进度条格（printMultiColumns 的 progress 格，
 *     page-train 先例）：barWidth 16 保住条后数值列（引擎缺省 24 会被
 *     el-col-0 吞掉，M155 的教训）；本路径无黄金样本（#108 接受），逐字
 *     锁随 #109 裁定后补；
 *   - @INVASION_EVENT 的 RAND:10 分发（:224-232）**自 #503 起掷骰真分发**：
 *     #117 只做魔力路线时，三臂对 INV_TYPE == 1 一律「打印守卫后 RETURN -1」
 *     （FORT :539、CHALLENGE :824 的 SIF 守卫、SEIEI :273 的 SIF INV_TYPE
 *     != 2），掷不掷骰结果相同，故当时归约成直接调 SEIEI 臂。[0] 落地后
 *     INV_TYPE 取 0，FORT :539 的 `SIF FLAG:SINDO || INV_TYPE != 0 && ...`
 *     与 CHALLENGE :824 的 `SIF INV_TYPE != 0 && ...` 都不再拦它（[3] 的 3
 *     同理）——两臂真的可达，归约的依据当场失效，因此恢复真分发；两臂的
 *     行为体仍随 [2] 路线票，登记为存根（零结算、返回 -1 继续侵攻）；
 *   - [0]/[3] 两条出兵路线自 #503 起是真身（含 :609-618 的 [3] 除算与
 *     :620-692/:891-975 两条结果段）；[2] 仍整支存根，其存根返回 0
 *     （不消耗回合、零结算）——原作 [2] 走完 RETURN 1，真身落地时一并恢复；
 *   - RESTART（:325/:377 等）按 control-flow.md「回到当前函数开头重新
 *     执行、局部量不重置」处理：@INVASION 的开头是 :6 的 FLAG:82 分派，故
 *     用 RESTART 常量把信号透传给 invasion() 的外层循环，由那里重走
 *     「分派 → 菜单」（先例：page-chara-info-show.js 的返回 true 外层重画）；
 *   - %SAVESTR:MASTER%（魔王存档名）经 callname:0:-1 承载（#5 决议，
 *     utils/callname-utils），新档 =「你」；
 *   - 地上征服后菜单（:25-138，post_conquest_menu，#468）：[0] 复用
 *     start_campaign()（结算与返回值完全一致）；[4] ARCANA_FORT 接真身
 *     （#470，invasion 域跨域调用不受限）；[1]/[2]/[3]/[5] 地区续接仍为
 *     存根——$START1 结算体内硬编码人间界语义（FLAG:81/kyoten_event(1)），
 *     泛化到其他地区留给后续票；
 *   - [5] 天神宫的按钮渲染（:73-79，随 shrine_stage 或 route_33 开窗）与
 *     派发检查（:100，只认 route_33 <= 500）两组条件不对称是原作真实缺陷，
 *     1:1 保留：shrine_stage >= 1 时按钮可点，但 route_33 未开窗仍会被
 *     拒收重问；
 *   - [1001]（AGENT_MENU）的 PRINTL 按钮渲染行（:84）在原作已被注释，但
 *     ELSEIF RESULT == 1001 / CALL AGENT_MENU（:93-95）本身是活代码，排在
 *     :102 的 >=6 拒收之前——Emuera 的 INPUT 接受任意整数，不限于已打印
 *     按钮，手工键入 1001 在原作里仍可达；era.input() 只在本轮打印过按钮
 *     时才按白名单校验（test/helpers/era-fixture.js 镜像引擎
 *     returnFromButton），一旦某次 input() 因合法按钮值被判定为业务层
 *     无效（如 [5] 触发 :100-101 的拒收）而 continue 且不重新 printButton，
 *     白名单即清空，下一次 input() 变回自由输入，1001 在 ere 里同样可达
 *     （实测：flag:82=1、exflag:102=1、exflag:2810=0 时依次输入 5、1001
 *     可触达）。因此接一个显式存根分支，不落 AGENT_MENU 本体——其所在的
 *     侵略/AGENT/ 已被 #103 判定为复制改名事故，全库无调用点，登记为
 *     「只登记、不排期」；
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { campaign_menu } = require('#/page/page-campaign');
const { life_list_item } = require('#/page/page-life-list');
const {
  end10_55,
  ending_1,
  ending_3,
  ending_4,
  ending_5,
} = require('#/event/event-ending');
const { get_enemy } = require('#/event/enter-enemy');
const { karma } = require('#/chara/chara-stats');
const { e_get, monster_data } = require('#/dungeon/monster-data');
const { arcana_fort } = require('#/invasion/invasion-arcana-fort');
const { invasion_ryouzyoku } = require('#/invasion/invasion-ravish');
const { chara } = require('#/facade/chara');
const { stub_line_wait } = require('#/utils/stub-line');
const { chara_callname, chara_nickname } = require('#/utils/callname-utils');

/**
 * 本文件存根化的原作调用名（docs/stub-registry.md 核对固定）。
 *
 * 'INVASION' 是函数内联段的宿主名（先例：DRAW_MAINMENU 指令面板段）：
 * [2] 勇者出兵路线（:299-441，start_campaign）、地上征服后菜单的 [1]/[2]/
 * [3]/[5] 地区续接（:108-138，post_conquest_menu）——[0] 与 [3] 已随 #503
 * 落地，不再在列。
 * 'AGENT_MENU'（:93-95，[1001]，#103 判定的复制改名事故，只登记不排期）与
 * 'INVASION_EVENT_SEIEI'/'INVASION_EVENT_FORT'/'INVASION_EVENT_CHALLENGE'
 * （:212-235 的 RAND:10 三臂，#503 起真分发）是各自独立的存根调用名。
 * 'INVASION_CHECK' 自 #118 起是真身（五组条件 1:1），'ARCANA_FORT'（:126，
 * [4]）自 #470 起是真身（ere/invasion/invasion-arcana-fort.js），
 * 'MEDAL_BONUS'（:593，共通补正）与 'SENGEN_VIDEO'（:91，[1000]）自 #502 起
 * 同样是真身（本文件内），上述都已移出本名单。
 * 'CAMPAIGN_MENU'（:98，[9]）不在此列——调用点本身是真实调用，存根名归属
 * page-campaign.js 自己的 STUBBED_CALLS（#468）。
 */
const STUBBED_CALLS = [
  'INVASION',
  'AGENT_MENU',
  'INVASION_EVENT_SEIEI',
  'INVASION_EVENT_FORT',
  'INVASION_EVENT_CHALLENGE',
];

/**
 * 原作 RESTART 的 ere 侧信号（control-flow.md：回到当前函数开头重新执行，
 * #DIM 局部量不随 RESTART 重置）。@INVASION 的开头是 :6 的 FLAG:82 分派，
 * 所以信号一路透传到 invasion() 的外层循环——那里重走「FLAG:82 分派 →
 * 菜单」，与原作的 RESTART 等价（含「征服后菜单的 [0] 出发时回到征服后
 * 菜单」这一形态）。
 */
const RESTART = Symbol('restart');

/** 每页角色数（:19 `#DIM NUM_PAGE = 26`） */
const NUM_PAGE = 26;

/** 出兵菜单的怪物门槛（:173/:179 `MON_NUM < 600`） */
const MONSTER_THRESHOLD = 600;

/** 进度条的条宽（< 24，否则引擎 el-col-0 吞掉条后数值列，见文件头） */
const BAR_WIDTH = 16;

/** 侵略目标的人间界 FLAG 下标（:110-111，AREA/SINDO 依原作命名） */
const HUMAN_WORLD = { area: 81, sindo: 82 };

/** 原作 RAND:N（0..N-1）的缺省随机源（同族模块同款；各函数以 rand 为注入名） */
function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/** GETBIT(X, n)：FLAG:5 用到位 32+，位运算在 JS 里按 32 位截断会溢出，改算术 */
function getbit(value, bit) {
  return Math.floor((value || 0) / 2 ** bit) % 2;
}

/**
 * 原作 `TIMES 整数, 小数` 的等价物：乘完截断小数部分。Emuera 的双精度与 JS
 * 同为 IEEE 754，两边逐位同值（`SENGEN_VIDEO` 的 ×1.20/×1.60、`SENGEN_VIDEO_BONUS`
 * 的 ×1.10/×1.20/×0.80 共十二处）。
 * @param {number} value 整数原值
 * @param {number} factor 小数倍率
 * @returns {number} 截断后的整数
 */
function times(value, factor) {
  return Math.floor(value * factor);
}

/**
 * 数值型 INPUT 的读数（本文件八处：`SENGEN_VIDEO` 内的六处
 * :1093/:1102/:1127/:1148/:1176/:1208，以及 post_conquest_menu 与
 * start_campaign 各一处菜单读数）。
 *
 * 引擎 `era.input()` 与原作 `INPUT` 有两处差异（逐字镜像见
 * test/helpers/era-fixture.js 的 #151/G6，`getNumber(val)` 即 `Number(val)`、
 * 解析失败原样返回）：
 *   - **空输入归一成 0**——原作的 `INPUT` 没有默认值时会在引擎层原地重问，
 *     游戏层永远看不到空值；ere 侧区分不出「空」与「显式键入 0」，两者都走
 *     `RESULT == 0` 那一支；
 *   - **非数字串原样回传**（字符串），而原作的 `RESULT` 恒为数值——不归一
 *     就会让 `count` 变成 NaN：`count > stock` 恒假、直接被当合法数量收下，
 *     随后 `EX_FLAG:9011 += count`（:1109/:1137）把 NaN 写进存档变量。
 *
 * @returns {Promise<number>} 输入值；空输入与非数字一律归一到 0
 */
async function number_input() {
  const value = await era.input();
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

/**
 * 原作 FORMAT `{值,N}` 的定宽：位数不足补半角空格（右对齐；数字是半角，
 * 与全角算两格的规则无关）。
 * @param {number} value 数值
 * @param {number} width 显示位数
 * @returns {string}
 */
function pad_number(value, width) {
  return String(value).padStart(width);
}

// @KYOTEN_EVENT 的星号横幅（INVASION_EVENT.ERB:16-22 等十处，逐字抄自原作，
// 含全角空格的手工对齐）
const BANNER_STAR =
  '*******************************************************************************************';
const BANNER_BLANK =
  '*********　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　**********';
const KYOTEN_BANNERS = {
  占领了村庄:
    '*********　　　　　　　　　　　　　　　占领了村庄　　　　　　　　　　　　　　　　**********',
  占领了港口:
    '*********　　　　　　　　　　　　　　　占领了港口　　　　　　　　　　　　　　　　**********',
  攻陷了堡垒:
    '*********　　　　　　　　　　　　　　　攻陷了堡垒　　　　　　　　　　　　　　　　**********',
  占领了街道:
    '*********　　　　　　　　　　　　　　　占领了街道　　　　　　　　　　　　　　　　**********',
  占领了城市:
    '*********　　　　　　　　　　　　　　　占领了城市　　　　　　　　　　　　　　　　**********',
  人间界的军队占领了村庄:
    '*********　　　　　　　　　　　　人间界的军队占领了村庄　　　　　　　　　　　　　**********',
  人间界的军队占领了港口:
    '*********　　　　　　　　　　　　人间界的军队占领了港口　　　　　　　　　　　　　**********',
  人间界的军队攻陷了堡垒:
    '*********　　　　　　　　　　　　人间界的军队攻陷了堡垒　　　　　　　　　　　　　**********',
  人间界的军队占领了街道:
    '*********　　　　　　　　　　　　人间界的军队占领了街道　　　　　　　　　　　　　**********',
  人间界的军队占领了城市:
    '*********　　　　　　　　　　　　人间界的军队占领了城市　　　　　　　　　　　　　**********',
};

/**
 * 一行「标签 + 进度条 + 数值」（BARSTR/BAR 的等价物，偏离说明见文件头）。
 * @param {string} label 行首标签
 * @param {number} value 当前进度
 * @param {number} max 满刻度
 */
function print_progress_line(label, value, max) {
  era.printMultiColumns([
    {
      type: 'progress',
      percentage: max > 0 ? Math.min(100, (100 * value) / max) : 0,
      inContent: label,
      outContent: ` ${value}/${max}`,
      config: { barWidth: BAR_WIDTH },
    },
  ]);
}

/**
 * @KYOTEN_EVENT（INVASION_EVENT.ERB:2-209）：据点事件横幅。
 *
 * ARG:0 == 1（人间界）的完整状态机：侵攻度跨 2000/4000/6000/8000/10000 逐档
 * 推进 FLAG:93，回落到 500/2000/4000/6000/8000 以下时逐档回退。ARG:0 ==
 * 2/3/4（精灵/龙/天界）臂内赋值在汉化版已被注释（:111-:204 的
 * `;FLAG:9x = n` 全注释，只剩横幅打印），且窄路径 AREA 恒 81、征服后分支
 * 未移植，三臂不可达——登记 docs/stub-registry.md，不搬。
 *
 * @param {number} arg 地区编号（1=人间界；2/3/4 当前不可达）
 * @returns {Promise<0>} 原作恒 RETURN 0
 */
async function kyoten_event(arg) {
  if (arg !== 1) {
    // ARG 2/3/4：不可达（见上），空转与原作注释掉赋值后的行为一致
    return 0;
  }
  const progress = era_flag.human_realm_invasion; // FLAG:81
  const stage = era_flag.human_realm_event_stage; // FLAG:93
  // :15-104 的 ELSEIF 链：命中档推进/回退并打七行横幅，未命中空转
  let next = stage;
  if (progress >= 2000 && stage === 0) {
    next = 1;
  } else if (progress >= 4000 && stage === 1) {
    next = 2;
  } else if (progress >= 6000 && stage === 2) {
    next = 3;
  } else if (progress >= 8000 && stage === 3) {
    next = 4;
  } else if (progress >= 10000 && stage === 4) {
    next = 5;
  } else if (progress <= 500 && stage === 1) {
    next = 0;
  } else if (progress <= 2000 && stage === 2) {
    next = 1;
  } else if (progress <= 4000 && stage === 3) {
    next = 2;
  } else if (progress <= 6000 && stage === 4) {
    next = 3;
  } else if (progress <= 8000 && stage === 5) {
    next = 4;
  }
  if (next === stage) {
    return 0;
  }
  const banner =
    KYOTEN_BANNERS[stage < next ? forward_key(next) : recapture_key(stage)];
  era.print(BANNER_STAR);
  era.print(BANNER_STAR);
  era.print(BANNER_BLANK);
  era.print(banner);
  era.print(BANNER_BLANK);
  era.print(BANNER_STAR);
  era.print(BANNER_STAR);
  era_flag.human_realm_event_stage = next;
  return 0;
}

// 推进档（stage → next）与夺回档（stage → next-1）的横幅键
function forward_key(next_stage) {
  return ['占领了村庄', '占领了港口', '攻陷了堡垒', '占领了街道', '占领了城市'][
    next_stage - 1
  ];
}
function recapture_key(stage) {
  return [
    '人间界的军队占领了村庄',
    '人间界的军队占领了港口',
    '人间界的军队攻陷了堡垒',
    '人间界的军队占领了街道',
    '人间界的军队占领了城市',
  ][stage - 1];
}

/**
 * @INVASION_EVENT（INVASION_EVENT.ERB:212-235）：侵略中途事件的 RAND:10 分发。
 *
 * :224 `LOCAL = RAND:10` 后三分（:226-230）：9 → @INVASION_EVENT_FORT、
 * 8 → @INVASION_EVENT_CHALLENGE、其余 0-7 → @INVASION_EVENT_SEIEI。原作三
 * 条都是 JUMP（尾调用），被跳函数的返回值就是本函数的返回值。**#503 起是
 * 真分发**（归约依据失效的经过见文件头）——掷出的值决定落到哪一臂，三臂各自
 * 有自己的守卫与行为体。
 *
 * @param {number} area 侵攻地区 FLAG 下标（81）
 * @param {number} sindo 征服标记 FLAG 下标（82）
 * @param {number} inv_type 出兵类别（0/1/2/3）
 * @param {(n: number) => number} [rand] RAND:N 随机源（RAND:10 的上界）
 * @returns {Promise<number>} -1 = 继续侵攻；>0 = 侵攻中止（调用方透传返回）
 */
async function invasion_event(area, sindo, inv_type, rand = default_rand) {
  const local = rand(10); // :224 LOCAL = RAND:10
  if (local === 9) {
    return await invasion_event_fort(area, sindo, inv_type); // :226-227
  }
  if (local === 8) {
    return await invasion_event_challenge(area, sindo, inv_type); // :228-229
  }
  return await invasion_event_seiei(area, sindo, inv_type); // :232
}

/**
 * @INVASION_EVENT_SEIEI（INVASION_EVENT.ERB:240-459）：精英部队事件。
 *
 * 三臂共用的头部（:250-271）：FLAG:SINDO != 0（已征服）→ RETURN -1；否则按
 * 侵攻度打三档传闻文本——**三档的 INV_TYPE 条件不同**：首档
 * `FLAG:AREA == 0`（:257）无 INV_TYPE 条件，后两档（:261/:266）要求
 * `INV_TYPE != 1`，所以魔力路线只打首档、[0]/[2]/[3] 三路三档都可能打。
 * 打完 `SIF INV_TYPE != 2 → RETURN -1`（:273-274）：只有 [2] 路线进战斗体
 * （:279-459，随 #504）。
 *
 * @param {number} area 侵攻地区 FLAG 下标（81）
 * @param {number} sindo 征服标记 FLAG 下标（82）
 * @param {number} inv_type 出兵类别（0/1/2/3）
 * @returns {Promise<number>} -1 = 继续侵攻
 */
async function invasion_event_seiei(area, sindo, inv_type) {
  // :250-251 SIF FLAG:SINDO != 0 → RETURN -1
  if ((era.get(`flag:${sindo}`) || 0) !== 0) {
    return -1;
  }
  const progress = era.get(`flag:${area}`) || 0; // FLAG:AREA
  // :257-260 FLAG:AREA == 0：狂王组织精锐部队的传闻（PRINTFORMW → 等键）
  if (progress === 0) {
    era.drawLine();
    era.print('根据传闻狂王为了应对魔王军的入侵已开始组织起了精锐部队。');
    await era.waitAnyKey();
    era.drawLine();
  } else if (progress >= 1 && progress < 5000 && inv_type !== 1) {
    // :261-265 侵攻度 1-4999（后两档都带 FLAG:SINDO == 0，已由上面的早退
    // 保证；每条 PRINTFORMW 各自等键）
    era.drawLine();
    era.print('狂王组织的精锐部队似乎已经开始行动了。');
    await era.waitAnyKey();
    era.print('如果不尽快采取行动的话………');
    await era.waitAnyKey();
    era.drawLine();
  } else if (progress >= 1 && progress < 10000 && inv_type !== 1) {
    // :266-270 侵攻度 5000-9999
    era.drawLine();
    era.print(
      '根据斥候打探的消息，狂王的精锐部队似乎已经在前方的城镇中布下了防线。',
    );
    await era.waitAnyKey();
    era.print('而且精锐部队的真正目的就是要捕捉魔王麾下的勇者………');
    await era.waitAnyKey();
    era.drawLine();
  }
  // :273-274 SIF INV_TYPE != 2 → RETURN -1；INV_TYPE == 2 的精锐部队战斗体
  // （:279-459）随 #504
  if (inv_type !== 2) {
    return -1;
  }
  await stub_line_wait('INVASION_EVENT_SEIEI', '精锐部队战斗', '随勇者出兵票');
  return 0;
}

/**
 * @INVASION_EVENT_FORT（INVASION_EVENT.ERB:530-814）：侵略中途事件（要塞）。
 *
 * 守卫（:539 `SIF FLAG:SINDO || INV_TYPE != 0 && INV_TYPE != 2 && INV_TYPE
 * != 3`）对 0/2/3 放行——[0]/[3] 两条路线自 #503 起真的会走到这里（#117
 * 时期「窄路径不可达」的判定当场失效，见文件头）。行为体（:542-808：三个
 * 选项、强攻/潜入/绕路三段结算）随 [2] 路线票，当前是零结算存根，按原作
 * 两处早退的同值返回 -1（继续侵攻、不消耗回合）。
 *
 * @param {number} area 侵攻地区 FLAG 下标（81）
 * @param {number} sindo 征服标记 FLAG 下标（82）
 * @param {number} inv_type 出兵类别（0/1/2/3）
 * @returns {Promise<-1>} 恒 -1（继续侵攻）
 */
async function invasion_event_fort(area, sindo, inv_type) {
  // :539 `||` 两侧：FLAG:SINDO 非 0，或 INV_TYPE 不在 {0,2,3} 里
  if ((era.get(`flag:${sindo}`) || 0) !== 0) {
    return -1;
  }
  if (inv_type !== 0 && inv_type !== 2 && inv_type !== 3) {
    return -1;
  }
  await stub_line_wait('INVASION_EVENT_FORT', '要塞事件', '随勇者出兵票');
  return -1;
}

/**
 * @INVASION_EVENT_CHALLENGE（INVASION_EVENT.ERB:815-1054）：侵略中途事件
 * （被勇者叫阵单挑）。
 *
 * 同 FORT：守卫（:824）对 0/2/3 放行，[0]/[3] 自 #503 起可达；行为体
 * （:828-1162：按地区的称呼表、单挑选项、开挂战斗与抓捕结算）随 [2] 路线票。
 * 零结算存根，按原作早退的同值返回 -1。区内的 `SIF EX_FLAG:95 & (地区位)`
 * 只在开挂取胜支（:1041 `EX_FLAG:95 = LOCAL:20`）之后才有真值，属行为体
 * 的一部分，随 #504 一并接。
 *
 * @param {number} area 侵攻地区 FLAG 下标（81）
 * @param {number} sindo 征服标记 FLAG 下标（82）
 * @param {number} inv_type 出兵类别（0/1/2/3）
 * @returns {Promise<-1>} 恒 -1（继续侵攻）
 */
async function invasion_event_challenge(area, sindo, inv_type) {
  void area;
  void sindo;
  // :824 SIF INV_TYPE != 0 && INV_TYPE != 2 && INV_TYPE != 3 → RETURN -1
  if (inv_type !== 0 && inv_type !== 2 && inv_type !== 3) {
    return -1;
  }
  await stub_line_wait(
    'INVASION_EVENT_CHALLENGE',
    '被勇者叫阵单挑',
    '随勇者出兵票',
  );
  return -1;
}

/** @MEDAL_BONUS 的十一档补正（:1032-1064 的降序 IF 链：命中即返，不再往下判） */
const MEDAL_TIERS = [
  { over: 500, bonus: 160 },
  { over: 250, bonus: 150 },
  { over: 150, bonus: 140 },
  { over: 100, bonus: 130 },
  { over: 60, bonus: 120 },
  { over: 40, bonus: 110 },
  { over: 30, bonus: 105 },
  { over: 20, bonus: 104 },
  { over: 15, bonus: 103 },
  { over: 10, bonus: 102 },
  { over: 5, bonus: 101 },
];

/**
 * @MEDAL_BONUS（INVASION.ERB:1026-1067）：勋章补正（EXP:ARG:81 分档）。
 *
 * 十一档降序判定，命中即打印 `%CALLNAME:ARG%` +「的勋章补正」+ 一个全角
 * 空格 + `x1.xx`（U+3000，照抄原作 :1033 的对齐）并等键（PRINTFORMW），
 * 返回 100-160 的百分比。未达首档（≤5 枚）返回 100 且不打任何输出
 * （:1030 的 LOCAL 初值）。
 *
 * 原作实参 ARG 是角色号：窄路径恒 0（魔王，:593 CALL MEDAL_BONUS,0），
 * [2]/[3] 路线传勇者号（:439/:559 CALL MEDAL_BONUS,YUSYA_I，随后续票接）。
 *
 * @param {number} [cid] 角色 ID（EXP 与 CALLNAME 的下标）
 * @returns {Promise<number>} 补正百分比（100-160）
 */
async function medal_bonus(cid = 0) {
  const medals = chara(cid).event.勋章经验; // EXP:cid:81
  const tier = MEDAL_TIERS.find((t) => medals > t.over);
  if (tier === undefined) {
    return 100; // :1030 LOCAL = 100（无补正档）
  }
  // :1033 等：%CALLNAME:ARG% 取自呼び名（callname:cid:-2）。全角空格不能进
  // 模板串（no-irregular-whitespace），按既有先例拼普通字符串字面量
  era.print(
    chara_nickname(cid) + '的勋章补正　x' + (tier.bonus / 100).toFixed(2),
  );
  await era.waitAnyKey(); // PRINTFORMW 的 WAIT
  return tier.bonus;
}

/**
 * @SENGEN_VIDEO_BONUS（INVASION.ERB:1236-1266）：投放量的随机加成。
 *
 * 原作 RESULT 是**按引用回传**的实参（`TIMES RESULT, …` 直接改写调用方的
 * RESULT），ere 侧改成返回值由调用方接。MODE 0（普通）先跳 `$MODE_0`
 * （:1243-1244），只掷 :1254-1257 两枚；MODE 1（奸商）先掷 :1246-1251 的
 * 三枚加成再落同一段——**判定顺序即 RAND 消费顺序，不可交换**。
 * MODE 1 只会变大（:1260-1261 的 `RESULT <= M → RESULT = M` 保底），
 * MODE 0 可能缩水到 0（×0.80 截断），调用方据此走「投放失败」分支。
 *
 * @param {number} result 投放数（原作 RESULT 的传入值）
 * @param {number} [mode] 0 = 普通，1 = 奸商（原作 MODE 的默认值 0）
 * @param {(n: number) => number} [rand] 随机源（RAND:2/3/4 的上界）
 * @returns {number} 加成后的投放数（原作回写的 RESULT）
 */
function sengen_video_bonus(result, mode = 0, rand = default_rand) {
  const base = result; // :1242 M = RESULT
  let placed = result;
  if (mode !== 0) {
    // :1245-1251 奸商加成段（MODE == 0 时被 :1243-1244 跳过）
    placed = times(placed, 1.1);
    if (rand(2) === 0) placed = times(placed, 1.2);
    if (rand(3) === 0) placed = times(placed, 1.2);
    if (rand(4) === 0) placed = times(placed, 1.2);
  }
  // $MODE_0 :1253-1257 两段共用
  if (rand(2) === 0) placed = times(placed, 1.2);
  if (rand(3) === 0) placed = times(placed, 0.8);
  // :1258-1265 提示与保底（四条 SIF 的先后即输出次序）
  if (placed > base && mode === 1) {
    era.print('奸商们制作更多的版本提升了投放效果。'); // :1258-1259
  }
  if (mode === 1 && placed <= base) {
    placed = base; // :1260-1261
  }
  if (placed > base && mode === 0) {
    era.print('在投放过程中似乎传出了不同的版本，投放效果提升了。'); // :1262-1263
  }
  if (placed < base) {
    era.print('似乎有些水晶球投放不是太成功。'); // :1264-1265
  }
  return placed;
}

/**
 * @SENGEN_VIDEO（INVASION.ERB:1070-1233）：水晶球投放菜单（post_conquest_menu
 * 的 [1000]，:90-92 CALL SENGEN_VIDEO 后 RETURN 0）。
 *
 * 四档操作：投放（:1096-1119）、雇奸商代理投放（:1120-1163，付 5000G/枚 或
 * 1 枚勋章）、花钱增强流行效果（:1164-1198）、花钱延长流行时间
 * （:1199-1229）；[999] 退出（:1230-1233，含落尾的隐式 RETURN 0）。
 *
 * 循环形态沿用文件头的既有取舍：GOTO INPUT_LOOP 重画整屏（ere 追加式）、
 * GOTO $INPUT_LOOP_TMP<n> 只重问不重画；`PRINTL [n] …` 改 printButton
 * （引擎自动拼 `[n] `，正文不得自带前缀，PR #30）；`{值,N}` 走 pad_number。
 *
 * 两处原作行为 1:1 保留并在此登记：
 *   - 犒赏段（:1143-1157）的两条按钮渲染条件（`(M*5000) < MONEY`、
 *     `M < EXP:0:81`）与接受条件同式，但支付发生在**加成之后**、判据用的是
 *     `M`（= 投入数）：`M*5000 == MONEY` 或 `M == 勋章数` 时按钮不渲染，
 *     而 ere 的引擎白名单会拒收未渲染的 [1]/[2]，玩家只能重问——原作靠
 *     `GOTO $INPUT_LOOP_TMP2` 空转；
 *   - :1189-1196 的效果增强与 :1218-1227 的时长延长在随机段之后各有一道
 *     封顶（×2 / +5）与一道保底（时长的 `(9013 - M) < 1 → M + 1`，即最小
 *     也涨 1 天）。
 *
 * 三处由引擎形态带出的说明（都不是行为偏离）：
 *   - 六处数值读数走 number_input()：空输入与非数字归一到 0，见该函数的
 *     JSDoc（原作 RESULT 恒为数值，空输入在引擎层就被重问掉）；
 *   - 菜单每轮至少打印 `[999]`，所以 `STOCK == 0 && RESULT != 999`
 *     （:1094-1095）与落尾的空 ELSE（:1230-1233 的末段）在真引擎里都
 *     不可达——白名单外的手工键入送不到游戏层，两支都按原作 1:1 保留；
 *   - 顶栏的 `\t\t` 与 8/1 个前导空格照抄原作（同 page-chara-shop.js 的
 *     `\t\t` 先例）；引擎输出走 HTML 会折叠连续空白，列对齐在实机上不
 *     成立，这是全项目共有的一条表现层差异（比对工具两侧同款归一化）。
 *
 * @param {(n: number) => number} [rand] 随机源（增强段的 RAND:2/5 与
 *   SENGEN_VIDEO_BONUS 的上界）
 * @returns {Promise<0>} 原作两条出口都 RETURN 0
 */
async function sengen_video(rand = default_rand) {
  // $INPUT_LOOP :1073-1095（画在循环头：GOTO INPUT_LOOP 即重画）
  menu: for (;;) {
    const stock =
      era_exflag.crystal_ball_stock - era_exflag.crystal_ball_deployed; // :1074
    era.drawLine(); // :1075-1076
    // :1076 可用于投放的水晶球{STOCK,3}部\t\t已投放{EX_FLAG:9011,3}部
    era.print(
      `可用于投放的水晶球${pad_number(stock, 3)}部\t\t已投放${pad_number(
        era_exflag.crystal_ball_deployed,
        3,
      )}部`,
    );
    // :1077-1081 两者都非零才显示流行中的数量与剩余天数
    if (era_exflag.crystal_ball_popularity && era_exflag.crystal_ball_expire) {
      era.print(
        `        正流行的有${pad_number(
          era_exflag.crystal_ball_popularity,
          3,
        )}部\t\t${pad_number(era_exflag.crystal_ball_expire, 2)}天后将过时`,
      );
    } else {
      era.print(' 目前没有投放中的水晶球'); // :1080
    }
    era.drawLine(); // :1082-1083
    if (stock > 0) {
      // :1083-1087
      era.printButton('投放水晶球', 1);
      era.printButton('派奸商投放水晶球', 2);
      era.printButton('增强流行效果', 3);
      era.printButton('延长流行时间', 4);
    } else {
      era.print('当前没有可以用于投放的水晶球'); // :1089
    }
    era.drawLine(); // :1091-1092
    era.printButton('离开', 999); // :1092

    const result = await number_input(); // :1093
    if (stock === 0 && result !== 999) {
      continue; // :1094-1095（引擎白名单先一步拒收未渲染的 [1]-[4]）
    }

    if (result === 1) {
      // :1096-1119 投放
      era.drawLine(); // :1096-1097
      era.print('通过投放拍摄的影像，激起反抗魔王的决心。'); // :1098
      era.drawLine(); // :1099-1100
      era.print('请输入要投放的数量'); // :1100
      // $INPUT_LOOP_TMP0 :1101-1107（0 = 回菜单，超量 = 只重问）
      let count;
      for (;;) {
        count = await number_input(); // :1102
        if (count === 0) {
          continue menu; // :1103-1104 GOTO INPUT_LOOP
        }
        if (count > stock) {
          era.print('超出数量，请重新输入'); // :1106
          continue; // :1107 GOTO INPUT_LOOP_TMP0
        }
        break;
      }
      era_exflag.crystal_ball_deployed += count; // :1109 EX_FLAG:9011 += RESULT
      // :1110 CALL SENGEN_VIDEO_BONUS, RESULT（RESULT 按引用回写）
      const placed = sengen_video_bonus(count, 0, rand);
      if (placed >= 1) {
        // :1111-1114
        era.print(`成功投放${placed}部水晶球`); // :1112
        await era.waitAnyKey(); // PRINTFORMW 的 WAIT
        era_exflag.crystal_ball_popularity += placed; // :1113
        era_exflag.crystal_ball_expire += placed; // :1114
      } else {
        era.print('投放，似乎失败了。'); // :1116
        await era.waitAnyKey(); // PRINTFORMW 的 WAIT
      }
      continue; // :1118 GOTO INPUT_LOOP
    }

    if (result === 2) {
      // :1120-1163 奸商代理投放
      era.drawLine(); // :1120-1121
      era.print('通过奸商代理投放拍摄的影像，或许更能激起反抗魔王的决心。'); // :1122
      era.print('但需要收取代理酬劳，每部5000G或是1枚勋章。'); // :1123
      era.drawLine(); // :1124-1125
      era.print('请输入要投放的数量'); // :1125
      // $INPUT_LOOP_TMP1 :1126-1135
      let count;
      for (;;) {
        count = await number_input(); // :1127
        if (count === 0) {
          continue menu; // :1128-1129 GOTO INPUT_LOOP
        }
        if (count > stock) {
          era.print('超出可投放数量，请重新输入'); // :1131
          continue; // :1132 GOTO INPUT_LOOP_TMP1
        }
        // :1133-1135 两种酬劳都付不起：重问
        if (count > chara(0).event.勋章经验 && count * 5000 > era_flag.money) {
          era.print('没有足够的奖赏来打动奸商');
          continue; // :1135 GOTO INPUT_LOOP_TMP1
        }
        break;
      }
      era_exflag.crystal_ball_deployed += count; // :1137 EX_FLAG:9011 += RESULT
      // :1138 CALL SENGEN_VIDEO_BONUS, RESULT, 1；犒赏段（:1143-1157）消费的
      // M 就是调用前的投入数（原作 M 是全局量、:1242 赋值后一直留到调用方）
      const base = count;
      const placed = sengen_video_bonus(count, 1, rand);
      if (placed >= 1) {
        era.print(`成功投放${placed}部水晶球`); // :1140
        await era.waitAnyKey(); // PRINTFORMW 的 WAIT
        era_exflag.crystal_ball_popularity += placed; // :1141
        era_exflag.crystal_ball_expire += placed; // :1142
        if (base * 5000 < era_flag.money) {
          era.printButton('犒赏金币', 1); // :1143-1144
        }
        if (base < chara(0).event.勋章经验) {
          era.printButton('犒赏勋章', 2); // :1145-1146
        }
        // $INPUT_LOOP_TMP2 :1147-1158（无效输入重问，见函数 JSDoc 的缺陷说明）
        for (;;) {
          const pay = await number_input(); // :1148
          if (pay === 1 && base * 5000 < era_flag.money) {
            era.print(`犒赏了奸商${base * 5000}G`); // :1150
            era_flag.money -= base * 5000; // :1151 MONEY -= (M * 5000)
            era_exflag.legit_money -= base * 5000; // :1152 EX_FLAG:4444 -=
            break;
          }
          if (pay === 2 && base < chara(0).event.勋章经验) {
            era.print(`犒赏了奸商${base}枚勋章`); // :1154
            chara(0).event.勋章经验 -= base; // :1155 EXP:0:81 -= M
            break;
          }
          // :1156-1157 ELSE → GOTO INPUT_LOOP_TMP2
        }
      } else {
        era.print('投放，似乎失败了。'); // :1160
        await era.waitAnyKey(); // PRINTFORMW 的 WAIT
      }
      continue; // :1162 GOTO INPUT_LOOP
    }

    if (result === 3) {
      // :1164-1198 增强流行效果
      era.drawLine(); // :1164-1165
      era.print('通过奸商代理投放拍摄的影像，增强投放的效果。'); // :1166
      era.print('将收取50000G或是5枚勋章。'); // :1167
      era.drawLine(); // :1168-1169
      era.print('请选择要支付方式'); // :1169
      if (era_flag.money > 50000) {
        era.printButton('支付金币', 1); // :1170-1171
      }
      if (chara(0).event.勋章经验 > 5) {
        era.printButton('支付勋章', 2); // :1172-1173
      }
      era.printButton('离开', 999); // :1174
      // $INPUT_LOOP_TMP3 :1175-1188
      for (;;) {
        const pay = await number_input(); // :1176
        if (pay === 1 && era_flag.money > 50000) {
          era.print('犒赏了奸商50000G'); // :1178
          era_flag.money -= 50000; // :1179
          era_exflag.legit_money -= 50000; // :1180
          break;
        }
        if (pay === 2 && chara(0).event.勋章经验 > 5) {
          era.print('犒赏了奸商5枚勋章'); // :1182
          chara(0).event.勋章经验 -= 5; // :1183
          break;
        }
        if (pay === 999) {
          continue menu; // :1184-1185 GOTO INPUT_LOOP
        }
        // :1186-1187 ELSE → GOTO INPUT_LOOP_TMP3
      }
      // :1189-1196 ×1.20，1/5 再 ×1.60，1/2 再 ×1.20，封顶 ×2
      const before = era_exflag.crystal_ball_popularity; // :1189 M = EX_FLAG:9012
      let grown = times(before, 1.2); // :1190 TIMES EX_FLAG:9012, 1.20
      if (rand(5) === 0) grown = times(grown, 1.6); // :1191-1192
      if (rand(2) === 0) grown = times(grown, 1.2); // :1193-1194
      if (grown > before * 2) grown = before * 2; // :1195-1196
      era_exflag.crystal_ball_popularity = grown;
      era.print('因为剪辑出了更多的版本，投放效果增强了'); // :1197
      continue; // :1198 GOTO INPUT_LOOP
    }

    if (result === 4) {
      // :1199-1229 延长流行时间
      era.drawLine(); // :1199-1200
      era.print('通过增加投放量延长流行时间。'); // :1201
      era.print('将收取50000G。'); // :1202
      era.drawLine(); // :1203-1204
      if (era_flag.money > 50000) {
        era.printButton('支付', 1); // :1204-1205
      }
      era.printButton('算了', 999); // :1206
      // $INPUT_LOOP_TMP4 :1207-1217
      for (;;) {
        const pay = await number_input(); // :1208
        if (pay === 1 && era_flag.money > 50000) {
          era.print('支付了50000G'); // :1210
          era_flag.money -= 50000; // :1211
          era_exflag.legit_money -= 50000; // :1212
          break;
        }
        if (pay === 999) {
          continue menu; // :1213-1214 GOTO INPUT_LOOP
        }
        // :1215-1216 ELSE → GOTO INPUT_LOOP_TMP4
      }
      // :1218-1227 ×1.20，1/5 再 ×1.60，1/2 再 ×1.20，封顶 +5、保底 +1
      const before = era_exflag.crystal_ball_expire; // :1218 M = EX_FLAG:9013
      let grown = times(before, 1.2); // :1219 TIMES EX_FLAG:9013, 1.20
      if (rand(5) === 0) grown = times(grown, 1.6); // :1220-1221
      if (rand(2) === 0) grown = times(grown, 1.2); // :1222-1223
      if (grown > before + 5) grown = before + 5; // :1224-1225
      if (grown - before < 1) grown = before + 1; // :1226-1227
      era_exflag.crystal_ball_expire = grown;
      era.print('流行时间延长了'); // :1228
      continue; // :1229 GOTO INPUT_LOOP
    }

    if (result === 999) {
      return 0; // :1230-1233（[999] 的 RETURN 0 与紧随其后落尾的空 ELSE 同值）
    }
    // 其余值落在原作的空 ELSE 上：落尾即隐式 RETURN 0，同样退出菜单。
    // 真引擎里同样不可达（菜单每轮都打印 [999]，白名单外的手工键入送不到
    // 游戏层），两支都按原作保留
    return 0;
  }
}

/**
 * @INVASION_CHECK（INVASION.ERB:999-1021）：结局判定（#118 本体）。
 *
 * 五组 ELSEIF（顺序 1:1，命中一组即止）：各领域侵攻度满 10000 且未征服
 * → 对应结局演出 + EX_FLAG:99 += 10 + PRINTL 声望+10。人间界组
 * （:1001-1003）是阶段 1 的贯通终点——ENDING_1 演出后游戏可继续；其余
 * 四组（精灵/龙/天界/天神宫）在窄路径不可达（对应 FLAG/EX_FLAG 无写入
 * 点），演出在 ere/event/event-ending.js 存根。
 *
 * @returns {Promise<void>}
 */
async function invasion_check() {
  // :1001-1003 人间界：FLAG:81 >= 10000 && FLAG:82 == 0 → ENDING_1
  if (
    era_flag.human_realm_invasion >= 10000 &&
    era_flag.human_realm_fallen === 0
  ) {
    // QUIT 是 throw 型（#148，引擎 quit() 抛 Error("quit")）：选 [1] 退出
    // 时异常在 ending_1 内部炸穿，下面两行不可达——原作 QUIT 后 :1003-1004
    // 同样不可达，靠的也是异常炸穿而非哨兵短路（旧写法 ended !== 1 是夹具
    // 降格期发明的机制，#148 拆除；真机上该判断唯一可达的出口只有「正常
    // 返回 0」——见 event-ending.js 的 JSDoc）。调用链上任何一层都不得
    // try/catch 吞掉这个异常，夹具同款 throw 由测试钉住
    await ending_1();
    era_exflag.prestige = era_exflag.prestige + 10; // :1003 EX_FLAG:99 += 10
    era.print('声望+10'); // :1004 PRINTL
    return;
  }
  // :1005-1007 精灵领域：FLAG:86 >= 10000 && FLAG:87 == 0 → ENDING_3
  if (
    era_flag.elf_realm_invasion >= 10000 &&
    era_flag.elf_realm_conquered === 0
  ) {
    await ending_3();
    era_exflag.prestige = era_exflag.prestige + 10; // :1007
    era.print('声望+10'); // :1008 PRINTL
    return;
  }
  // :1009-1011 龙之山脉：FLAG:88 >= 10000 && FLAG:89 == 0 → ENDING_4
  if (
    era_flag.dragon_realm_invasion >= 10000 &&
    era_flag.dragon_realm_conquered === 0
  ) {
    await ending_4();
    era_exflag.prestige = era_exflag.prestige + 10; // :1011
    era.print('声望+10'); // :1012 PRINTL
    return;
  }
  // :1013-1015 天界：FLAG:90 >= 10000 && FLAG:91 == 0 → ENDING_5
  if (era_flag.heaven_invasion >= 10000 && era_flag.heaven_conquered === 0) {
    await ending_5();
    era_exflag.prestige = era_exflag.prestige + 10; // :1015
    era.print('声望+10'); // :1016 PRINTL
    return;
  }
  // :1017-1019 天神宫：EX_FLAG:101 >= 10000 && EX_FLAG:102 == 0 → END10_55
  if (era_exflag.shrine_invasion >= 10000 && era_exflag.shrine_stage === 0) {
    await end10_55();
    era_exflag.prestige = era_exflag.prestige + 10; // :1019
    era.print('声望+10'); // :1020 PRINTL
  }
}

/**
 * 威望修正（INVASION.ERB:270-293，魔力分支内的一份；怪物分支 :236-259
 * 同构）。五档；0-20 档侵攻失败（早退，返回 true 表示已 RETURN）。
 *
 * @param {number} sinkou 档前侵攻点
 * @returns {{sinkou: number, failed: boolean}} 档后侵攻点 / 是否失败早退
 */
function apply_prestige_tier(sinkou) {
  const prestige = era_exflag.prestige; // EX_FLAG:99 威望
  if (prestige <= 20 && prestige >= 0) {
    // :270-274 岌岌可危：SINKOU = 0，PRINTW 侵攻失败，RETURN 1
    era.print('威望值是【岌岌可危】');
    return { sinkou: 0, failed: true };
  }
  if (prestige <= 40 && prestige > 20) {
    // :275-278 动荡不安：÷4
    era.print('威望值是【动荡不安】');
    era.print('侵攻战斗力减少');
    return { sinkou: Math.floor(sinkou / 4), failed: false };
  }
  if (prestige <= 60 && prestige > 40) {
    // :279-284 略受质疑：×(100 + (p-60)*2) / 100（p-60 为负，打折）
    era.print('威望值是【略受质疑】');
    return {
      sinkou: Math.floor((sinkou * (100 + (prestige - 60) * 2)) / 100),
      failed: false,
    };
  }
  if (prestige <= 80 && prestige > 60) {
    // :285-286 相安无事：无修正
    era.print('威望值是【相安无事】');
    return { sinkou, failed: false };
  }
  if (prestige <= 100 && prestige > 80) {
    // :287-292 广受爱戴：×(100 + (p-80)) / 100（加成）
    era.print('威望值是【广受爱戴】');
    return {
      sinkou: Math.floor((sinkou * (100 + (prestige - 80))) / 100),
      failed: false,
    };
  }
  // 威望 < 0 或 > 100：原作无匹配档，无修正（1:1）
  return { sinkou, failed: false };
}

/**
 * @INVASION（INVASION.ERB:6-997）：侵略画面入口，按 FLAG:82 分派。
 *
 * 返回 0 = 取消（不消耗回合，回主菜单）；返回 1 = 回合已耗（调用方
 * page-shop 的 [109] 分支据此 BEGIN TURNEND）。
 *
 * 外层 `for (;;)` 承载原作的 RESTART（:325/:377 等）：菜单与其下各层
 * 把 RESTART 信号原样返回，这里重走 :6 的分派——与「回到函数开头重新执行」
 * 等价（RESTART 常量的说明见上）。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（透传到出兵路线）
 * @returns {Promise<number>} 0 / 1
 */
async function invasion(rand = default_rand) {
  for (;;) {
    const result =
      era_flag.human_realm_fallen !== 0
        ? await post_conquest_menu(rand) // :25 IF FLAG:82：地上征服后菜单（#468）
        : await start_campaign(rand); // :139-142 ELSE：目标区域默认人间界
    if (result !== RESTART) {
      return result;
    }
  }
}

/**
 * @INVASION（INVASION.ERB:25-138）：地上征服后的地区选择菜单（#468）。
 *
 * 五条状态行（人间界固定「已征服」；精灵/龙之山/天界随各自 FLAG:87/89/91
 * 征服标记切换标签；天神宫随 route_33 开窗或 shrine_stage >= 4 切换，两
 * 条件都不满足时不渲染；圣灵骑士堡垒原作没有状态行，仅按钮文案随
 * FLAG:92 == 15 切换）+ 六个可选分支（[0] 复用 start_campaign()；[4] 转
 * ARCANA_FORT 真身，#470；[1]/[2]/[3]/[5] 地区续接仍为存根，泛化 $START1
 * 留给后续票）+ [9] CAMPAIGN_MENU + [999] 退出 + [1000] SENGEN_VIDEO +
 * [1001] AGENT_MENU（原作按钮渲染行已注释，但 ELSEIF/CALL 分支仍可达，接
 * 一个存根，不落本体——见文件头）。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（[0] 转 start_campaign）
 * @returns {Promise<number|typeof RESTART>} 0 / 1；RESTART = 原作出兵路线里
 *   的 RESTART，由 invasion() 的外层循环重走 :6 的分派
 */
async function post_conquest_menu(rand = default_rand) {
  // :25-49 五条状态行（BARSTR 偏离说明见文件头；圣灵骑士堡垒没有状态行，
  // 只有按钮，见下方 [4] 的注释）
  print_progress_line(
    '地上的魔界领土侵攻度',
    era_flag.human_realm_invasion,
    10000,
  );
  print_progress_line(
    era_flag.elf_realm_conquered >= 1
      ? '黑暗精灵的领土侵攻度'
      : '精灵族的领域侵攻度',
    era_flag.elf_realm_invasion,
    10000,
  );
  print_progress_line(
    era_flag.dragon_realm_conquered >= 1
      ? '混沌龙之山侵攻度'
      : '龙之山脉侵攻度',
    era_flag.dragon_realm_invasion,
    10000,
  );
  print_progress_line(
    era_flag.heaven_conquered >= 1 ? '堕天使的淫界侵攻度' : '天界侵攻度',
    era_flag.heaven_invasion,
    10000,
  );
  // :45/:77 route_33 开窗区间抄自原作（含 540 这个原作留下的空档，1:1 保留，
  // 与下方 [5] 派发检查的 route_33 <= 500 不对称——文件头有说明）
  const route_33_open =
    (era_exflag.route_33 >= 501 && era_exflag.route_33 < 540) ||
    (era_exflag.route_33 >= 541 && era_exflag.route_33 < 560);
  if (route_33_open) {
    print_progress_line('天神宫侵攻度', era_exflag.shrine_invasion, 10000);
  } else if (era_exflag.shrine_stage >= 4) {
    print_progress_line(
      '淫乱意志的神宫侵攻度',
      era_exflag.shrine_invasion,
      10000,
    );
  }
  era.drawLine();
  era.print('地面上已被你征服了，你指挥着你的军队准备进攻其他领土………');
  era.printButton('巡视地上的魔界领土（已征服）', 0);
  era.printButton(
    era_flag.elf_realm_conquered >= 1
      ? '巡视黑暗精灵的领土（已征服）'
      : '入侵精灵族的领域',
    1,
  );
  era.printButton(
    era_flag.dragon_realm_conquered >= 1
      ? '巡视混沌龙之山（已征服）'
      : '入侵龙之山脉',
    2,
  );
  era.printButton(
    era_flag.heaven_conquered >= 1 ? '巡视堕天使的淫界（已征服）' : '入侵天界',
    3,
  );
  // FLAG:92（arcana_fort_stage）是位掩码，不是线性阶段数：&1 东 &2 南
  // &4 西 &8 北（ARCANA_FORT.ERB:20/:76，ARCANA_FORT 自身按 |= 逐门置位），
  // 15 = 四门全破；这里只判「是否全部攻陷」，不代表推进到第几关
  era.printButton(
    era_flag.arcana_fort_stage === 15
      ? '巡视圣灵骑士的卖春堡垒（已征服）'
      : '攻略圣灵骑士的堡垒',
    4,
  );
  if (era_exflag.shrine_stage >= 4) {
    era.printButton('巡视淫乱意志的神宫（已征服）', 5);
  } else if (era_exflag.shrine_stage >= 1) {
    era.printButton('天神宫广场', 5);
  } else if (route_33_open) {
    era.printButton('攻略天神宫', 5);
  }
  era.printButton('向着世界之外', 9);
  era.drawLine();
  era.printButton('退出', 999);
  // :83 [1000] 的分子/分母走具名门面（#502 起；此前的「无门面、直读」注释
  // 已过时，era-exflag.js 的 crystal_ball_deployed/stock 早已备好）
  era.printButton(
    `向城里投放水晶球[${era_exflag.crystal_ball_deployed}/${era_exflag.crystal_ball_stock}]`,
    1000,
  );

  // $INPUT_LOOP2 :85-106：无效输入重问不重画（GOTO，见文件头）
  for (;;) {
    const result = await number_input();
    if (result === 999) {
      return 0; // :88-89
    }
    if (result === 1000) {
      // :90-92 CALL SENGEN_VIDEO → RETURN 0（#502 起真身）；注释单占一行，
      // 免得变异条目的 find 串把带 trace ref 的注释当锚点（trace-check 的
      // 「引用不进锁」约定）
      await sengen_video();
      return 0;
    }
    if (result === 1001) {
      // :93-95 CALL AGENT_MENU：按钮渲染行原作已注释，但这条 ELSEIF/CALL
      // 分支本身是活代码，文件头有说明——只接存根，不落 AGENT_MENU 本体
      // （#103：所在的侵略/AGENT/ 是复制改名事故，只登记、不排期）
      await stub_line_wait('AGENT_MENU', '代理人相关菜单', '不排期（#103）');
      return 0;
    }
    if (result === 9) {
      await campaign_menu(); // :97-98
      return 0; // :97-99
    }
    if (result === 5 && era_exflag.route_33 <= 500) {
      // :100-101 原作真实缺陷：按钮可能因 shrine_stage 渲染，这里只认
      // route_33，见文件头
      continue;
    }
    if (result >= 6 || result < 0) {
      continue; // :102-105
    }

    // :108-138 地区选择；[0]/[4] 已实现，其余登记为存根（文件头有说明）
    if (result === 0) {
      // :109-111 复用出兵流程；其内部的 RESTART（原作出兵路线里的 [999]
      // 返回等）原样透传，由 invasion() 的外层循环回到 :6 的分派
      return await start_campaign(rand);
    }
    if (result === 4) {
      // :125-131 CALL ARCANA_FORT：RETURN 1（打了一仗、回合已耗）→ 本函数
      // 同样 RETURN 1，由调用方 BEGIN TURNEND；0（撤退/无候选/已全破）→ 0
      return await arcana_fort();
    }
    if (result === 5 && era_exflag.shrine_stage >= 3) {
      era_exflag.shrine_stage = era_exflag.shrine_stage + 1; // :136-137
    }
    // [1]/[2]/[3]/[5] 共享 $START1，但其结算体（start_campaign()）内硬编码
    // 人间界语义，泛化前不能直接复用——登记为存根，留给后续票
    await stub_line_wait(
      'INVASION',
      '地区选择后的出兵续接',
      '待认领（地区通用化）',
    );
    return 0;
  }
}

/**
 * 掠夺路线的派遣资格判据（:452-456 的五条 filter）。
 *
 * 原作 :444 自注「選択基準は迎撃に準じる」——与迎击设定的派遣判据同源，
 * 但**少两条**（对照 SHOP_2.ERB:284-291 的七条版：这里没有近卫兵与后代
 * 那两条 EX_TALENT 守卫），所以不复用 page-intercept.js 的 reject_reason。
 * 五条依次为：濒死 → 魔王自己 → 非待机 → 未驯服 → 孕妇且未开「孕妇可
 * 出征」位。判据只有这一处真相，列表计数（:450-460）与列表渲染（:491-505）
 * 共用。
 *
 * @param {number} cid 角色 ID
 * @returns {boolean} true = 不可派遣
 */
function raid_rejected(cid) {
  if ((era.get(`base:${cid}:0`) || 0) < 1) return true; // :452 体力为 0
  if (cid === 0) return true; // :453 COUNT == 0（魔王自己）
  if (chara(cid).invasion.状态 !== 0) return true; // :454 CFLAG:1 != 0
  // :455 未驯服：CFLAG:0（出售与助手资格）为 0 且无魔之刻印（TALENT:254）
  if (
    (era.get(`cflag:${cid}:0`) || 0) === 0 &&
    (era.get(`talent:${cid}:254`) || 0) === 0
  ) {
    return true;
  }
  // :456 孕妇（TALENT:153）且未开「怀孕时的迎击・临月调教」位（FLAG:5 位 10，
  // CONFIG.ERB:167 的 [10] 开关）
  if (
    (era.get(`talent:${cid}:153`) || 0) === 1 &&
    getbit(era.get('flag:5'), 10) === 0
  ) {
    return true;
  }
  return false;
}

/**
 * 掠夺路线的勇者选择（:442-563 的选人段）。
 *
 * 原作 `FOR COUNT, LIST_POS, CHARANUM` 在「角色号」上扫，ere 侧改成已加入
 * 角色 ID 的升序表（#21 扁平化的既有做法，见文件头的移植说明），LIST_POS 仍是
 * 「最后渲染的那个 ID」——与 SHOP_2.ERB:282-335 的迎击列表**逐字同源**，
 * 连翻页判据的怪癖一并保留：T_LCOUNT 从 `NUM_PAGE * NO_PAGE + 1` 起算且只在
 * 渲染支内自增，页窗是 `[NO_PAGE*NUM_PAGE+1, (NO_PAGE+1)*NUM_PAGE)`，于是每页
 * 实际渲染 NUM_PAGE - 1 行、且上一页的最后一行会重复（原作现状，1:1 不修）。
 *
 * NO_PAGE/LIST_POS/PREV_PAGE/PREV_LIST_POS 是 @INVASION 的 #DIM 局部量：
 * RESTART 不重置它们（control-flow.md 的实测结论），故由调用方持有、本函数
 * 读写。
 *
 * @param {{no_page: number, list_pos: number, prev_page: number,
 *   prev_list_pos: number}} state 跨 RESTART 保留的翻页游标
 * @returns {Promise<number|typeof RESTART>} 选中的角色 ID；RESTART = [999]
 *   返回或没有候选时的原作 RESTART（:467-470/:519-520）
 */
async function pick_raid_hero(state) {
  // :445-449 LIST_POS/PREV_PAGE/PREV_LIST_POS 清零、LOCAL = 0、YUSYA_I = 0
  state.list_pos = 0;
  state.prev_page = 0;
  state.prev_list_pos = 0;
  const added = era.getAddedCharacters();
  let candidates = 0; // YUSYA_I
  for (const cid of added) {
    if (raid_rejected(cid)) continue; // :452-458
    candidates += 1; // :459
  }
  // :461-466 MAX_PAGE = ⌈YUSYA_I / NUM_PAGE⌉ - 1
  let max_page =
    candidates % NUM_PAGE > 0
      ? Math.trunc(candidates / NUM_PAGE) + 1
      : Math.trunc(candidates / NUM_PAGE);
  max_page -= 1;
  // :467-470 没有候选人：PRINTW + RESTART
  if (candidates === 0) {
    era.print('没有勇者可进行侵攻。');
    await era.waitAnyKey();
    return RESTART;
  }
  // $INPUT_LOOP_TMPO3 :471
  for (;;) {
    // :474-484 缓存、重置列表信息（SWAP 换位）
    if (state.no_page === 0) {
      state.list_pos = 0;
      state.prev_page = 0;
      state.prev_list_pos = 0;
    } else if (state.no_page < state.prev_page) {
      const tmp = state.list_pos;
      state.list_pos = state.prev_list_pos;
      state.prev_list_pos = tmp;
    } else if (state.no_page === state.prev_page) {
      state.list_pos = state.prev_list_pos;
    } else {
      state.prev_list_pos = state.list_pos;
    }
    // :486-488 标题（CUSTOMDRAWLINE = 的空分割线不镜像，见文件头）
    era.print('派遣谁去侵攻呢？');
    era.drawLine();
    // :489-505 列表（窗口外的命中项只跳过、不渲染）
    let rows = 0; // L_LCOUNT：原作按 LINECOUNT 差算，ere 侧按渲染行数代
    let t_lcount = NUM_PAGE * state.no_page + 1; // :490
    for (const cid of added) {
      if (cid < state.list_pos) continue; // :491 FOR COUNT, LIST_POS, CHARANUM
      if (raid_rejected(cid)) continue; // :493-500 的 filter
      if (
        t_lcount >= (state.no_page + 1) * NUM_PAGE ||
        t_lcount < state.no_page * NUM_PAGE + 1
      ) {
        continue; // :498-499 页窗
      }
      life_list_item(cid); // :502
      t_lcount += 1; // :503
      state.list_pos = cid; // :504
      rows += 1;
    }
    // :506-511 不足一整页时补空行
    if (rows < NUM_PAGE + 1) {
      for (let i = 0; i < NUM_PAGE - rows; i += 1) {
        era.print('');
      }
    }
    // :512-515 三个按钮（PRINTLC 居中 → printButton，引擎自动拼 [编号]）
    era.drawLine();
    era.printButton('上一页', 1000);
    era.printButton('返  回', 999);
    era.printButton('下一页', 1001);

    const result = await number_input(); // :517 INPUT

    if (result === 999) {
      return RESTART; // :519-520
    }
    if (result === 1000) {
      // :521-526 上一页（到底不动，GOTO 回循环头重画）
      if (state.no_page > 0) {
        state.no_page -= 1;
      }
      continue;
    }
    if (result === 1001) {
      // :527-532 下一页（到末页不动）
      if (state.no_page < max_page) {
        state.no_page += 1;
      }
      continue;
    }
    // :533-535 越界（CHARANUM 在 ID 世界不能直接换成「已加入数」：编制可以
    // 稀疏，数量会误伤合法的 ID —— 改判「是不是已加入角色」）
    if (result < 0 || !added.includes(result)) {
      continue;
    }
    if (raid_rejected(result)) {
      continue; // :536-545 选中项不合法则重问
    }
    return result; // :547 YUSYA_I = RESULT
  }
}

/**
 * 结果段·怪物路线（:620-692，[0] 专用）。
 *
 * 战利品 = SINKOU × 10：已征服的土地（FLAG:SINDO != 0）是「强制征收」且先
 * 按 100000 封顶，未征服是「战利品」且**不封顶**（原作 :647-651 的 ELSE 臂
 * 没有 MIN，两臂的差别是原作现状，1:1）；两条路径分别由 post_conquest_menu
 * 的 [0]（已征服）与窄路径（未征服）走到。其余 AREA 的已征服臂（86/88/90）
 * 随 #505 的地区泛化接入，当前 AREA 恒 81。
 *
 * :686-692 的 5% 抓捕按原作即「等键 → GET_ENEMY → 返回 0 才有犒赏行」。
 *
 * @param {number} area 侵攻地区 FLAG 下标（81）
 * @param {number} sindo 征服标记 FLAG 下标（82）
 * @param {number} inkou 侵攻点（原作 SINKOU）
 * @param {(n: number) => number} rand RAND:N 随机源
 */
async function monster_result_section(area, sindo, inkou, rand) {
  const conquered = (era.get(`flag:${sindo}`) || 0) !== 0;
  let sinkou = inkou;
  era.drawLine();
  if (area === 81 && conquered) {
    // :624-628 人间界（已征服）：封顶 100000 + 强制征收
    sinkou = Math.min(sinkou, 10000 * 10);
    era.print(`强制征收了${sinkou * 10}点！`); // :626 PRINTFORMW
    await era.waitAnyKey();
    era_flag.money += sinkou * 10;
    era_exflag.legit_money += sinkou * 10;
  } else {
    // :647-651 未征服（含尚未接入的 86/88/90 已征服臂）
    era.print(`得到了${sinkou * 10}点的战利品！`); // :648 PRINTFORMW
    await era.waitAnyKey();
    era_flag.money += sinkou * 10;
    era_exflag.legit_money += sinkou * 10;
  }
  // :653-667 侵攻度条 + DRAWLINE + WAIT
  era.drawLine();
  print_progress_line('侵攻度', era_flag.human_realm_invasion, 10000);
  era.drawLine();
  await era.waitAnyKey(); // :667 WAIT
  if (area === 81) {
    // :669-671 CALL INVASION_RYOUZYOKU, 1, SINKOU（#470 的真身）
    await invasion_ryouzyoku(1, sinkou, rand);
  }
  // :686-692 5% 概率抓到负隅顽抗的勇者（GET_ENEMY 返回 0 = 人数上限早退）
  if (rand(100) < 5) {
    era.print('好像抓到了负隅顽抗的勇者…………'); // :687 PRINTFORMW
    await era.waitAnyKey();
    if ((await get_enemy(rand)) === 0) {
      era.print('犒赏士兵，捕获到的勇者被赏赐给部下了。'); // :691 PRINTFORMW
      await era.waitAnyKey();
    }
  }
}

/**
 * 结果段·掠夺路线（:891-975，[3] 专用）。
 *
 * 掠夺额 = SINKOU（**不是**怪物路线的 ×10），经验是 SINKOU/20；善恶值先减
 * 5（:909 `CALL KARMA, YUSYA_I, -5`，真身 ere/chara/chara-stats.js）。已
 * 征服/未征服的封顶差别与 [0] 同款（:912-957）。原作 :892-908 的三段
 * PRINTFORM/PRINT/PRINTW 在同一显示行，ere 侧并入一次 print + 等键
 * （monster-data.js 的同显示行归并先例）；地区名当前恒「人间界」（AREA 恒 81，
 * 其余地区随 #505）。
 *
 * @param {number} area 侵攻地区 FLAG 下标（81）
 * @param {number} sindo 征服标记 FLAG 下标（82）
 * @param {number} yusya_i 领军勇者（角色 ID，原作 YUSYA_I）
 * @param {number} inkou 侵攻点（原作 SINKOU）
 */
async function raid_result_section(area, sindo, yusya_i, inkou) {
  const conquered = (era.get(`flag:${sindo}`) || 0) !== 0;
  let sinkou = inkou;
  era.print(
    `${chara_callname(yusya_i)}得到了魔王的力量！人间界被掠夺了。（善恶值:-5）`,
  ); // :892-908（PRINTFORM + PRINT 人间界 + PRINTW）
  await era.waitAnyKey();
  karma(yusya_i, -5); // :909 CALL KARMA, YUSYA_I, -5
  if (area === 81 && conquered) {
    // :912-918（已征服）：封顶 100000 + 强行征收到
    sinkou = Math.min(sinkou, 10000 * 10);
    era.print(`强行征收到了${sinkou}点！`); // :914 PRINTFORMW
    await era.waitAnyKey();
  } else {
    // :951-956（未征服）
    era.print(`获得了${sinkou}点的战利品！`); // :952 PRINTFORMW
    await era.waitAnyKey();
  }
  era_flag.money += sinkou; // :915/:953 MONEY += SINKOU
  era_exflag.legit_money += sinkou; // :916/:954 EX_FLAG:4444 +=
  const exp_gain = Math.floor(sinkou / 20); // SINKOU / 20
  chara(yusya_i).dungeon.战斗经验 += exp_gain; // :917/:955 EXP:YUSYA_I:80
  era.print(`${chara_callname(yusya_i)}获得了${exp_gain}点经验值！`); // :918
  await era.waitAnyKey();
  // :959-973 侵攻度条 + DRAWLINE + WAIT
  era.drawLine();
  print_progress_line('侵攻度', era_flag.human_realm_invasion, 10000);
  era.drawLine();
  await era.waitAnyKey(); // :973 WAIT
}

/**
 * @INVASION（INVASION.ERB:139-997）：出兵流程——菜单（:139-204）+ 四条路线
 * （:209-563）+ 共通补正（:565-603）+ 中途事件（:601-603）+ 侵攻結果共通
 * （:609-618）+ 结果段（:620-975）+ 结算尾（:976-997）。
 *
 * 四条路线：[0] 怪物出兵 :210-263（#503）、[1] 魔力出兵 :266-296（#117）、
 * [2] 勇者出兵 :299-441（存根，#504）、[3] 勇者掠夺 :442-563（#503）。三条
 * 真身共走后面的共通段；[2] 的存根就地早退（返回 0，不消耗回合）。
 *
 * 外层 `for (;;)` 是 `$START1` 复刻：[3] 的两个 RESTART（:467-470 没有候选、
 * :519-520 [999] 返回）在这里 `continue` 重画整屏出兵菜单——与原作「回到
 * @INVASION 开头」在窄路径下等价；从征服后菜单的 [0] 进来时，原作的 RESTART
 * 会回到征服后菜单，故把 RESTART 信号返回给 invasion() 承接。
 *
 * 返回 0 = 取消（不消耗回合，回主菜单）；返回 1 = 回合已耗（调用方
 * page-shop 的 [109] 分支据此 BEGIN TURNEND）。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（[0] 的 MONSTER_DATA、
 *   [3] 的 MEDAL_BONUS 经共通段，以及 @INVASION_EVENT 的分发与两臂）
 * @returns {Promise<number|typeof RESTART>} 0 / 1 / RESTART
 */
async function start_campaign(rand = default_rand) {
  // :139-142 ELSE：目标区域默认人间界
  const { area, sindo } = HUMAN_WORLD;
  // :7-21 的 #DIM 局部量里，NO_PAGE（= 0）与三条翻页游标跨 RESTART 保留
  const page_state = {
    no_page: 0,
    list_pos: 0,
    prev_page: 0,
    prev_list_pos: 0,
  };
  let sinkou = 0; // :204 SINKOU = 0
  let inv_type = 0; // :202 INV_TYPE = RESULT
  let yusya_i = 0; // :11 #DIM YUSYA_I（[0]/[1] 路线不赋值，恒 0）

  // $START1 :143（[3] 的 RESTART 回到这里重画整屏）
  for (;;) {
    // :145-151 怪物数量 = ITEM:100..189 之和（[0]/[2] 路线的 600 门槛）
    let mon_num = 0;
    for (let i = 100; i < 190; i += 1) {
      mon_num += era.get(`item:${i}`) || 0;
    }
    // :144-186 画面绘制：侵攻度 / 气力 / 怪物数量 / 出兵选项
    era.drawLine();
    print_progress_line('侵攻度', era_flag.human_realm_invasion, 10000);
    // MAXBASE:0:1（气力上限）直读：跨域读放行（ADR-0002），maxbase 无门面
    print_progress_line(
      '你的气力',
      chara(0).dungeon.气力,
      era.get('maxbase:0:1') || 0,
    );
    era.drawLine();
    era.print(`你的怪物数量 ${mon_num}只`);
    era.drawLine();
    if (mon_num < MONSTER_THRESHOLD) {
      era.print('[-] - 怪物数量不足。至少需要600只');
    } else {
      era.printButton('使用现有怪物的一半去进攻（资金·俘虏）', 0);
    }
    era.printButton('使用魔王的魔力（经验值）', 1);
    if (mon_num < MONSTER_THRESHOLD) {
      era.print('[-] - 怪物数量不足。至少需要600只');
    } else {
      era.printButton('派遣勇者带三分之一的怪物去进攻（资金·经验值·俘虏）', 2);
    }
    era.printButton('派遣勇者前去掠夺资金（资金·经验值）', 3);
    era.drawLine();
    era.printButton('返回', 999);

    // $INPUT_LOOP :188-200：无效输入重问不重画（GOTO INPUT_LOOP，见文件头）
    for (;;) {
      const result = await number_input();
      if (result === 999) {
        return 0; // :190-191
      }
      if (result >= 4 || result < 0) {
        continue; // :192-195
      }
      if ((result === 0 || result === 2) && mon_num < MONSTER_THRESHOLD) {
        continue; // :196-199
      }
      if (result === 2) {
        // :298-441 勇者带三分之一怪物出兵（勇者选择列表 + 精锐部队战斗）
        // ——随 [2] 路线票，存根返回 0（不消耗回合、零结算）
        await stub_line_wait('INVASION', '勇者出兵路线', '随勇者出兵票');
        return 0;
      }
      inv_type = result; // :202 INV_TYPE = RESULT（0/1/3）
      break;
    }

    // :203-207 SINKOU = 0（A/B 是 MONSTER_DATA 的队列坐标，仅怪物路线用）
    sinkou = 0;

    if (inv_type === 0) {
      // ===== [0] 怪物出兵（:210-263）=====
      // :211-232 逐个持有怪物调 MONSTER_DATA 取战斗力，怪物数先减半再累加
      for (let i = 100; i < 190; i += 1) {
        if ((era.get(`item:${i}`) || 0) < 1) continue; // :214-215
        monster_data(i, 0, 0, -1, -1, rand); // :217 CALL MONSTER_DATA, MON_ID, 0, 0
        let mon_atk = e_get(2) + e_get(3) + e_get(4); // :219-221 E:2/E:3/E:4
        if (e_get(5) !== 0) mon_atk += e_get(1); // :223-224 特殊
        if (e_get(6) !== 0) mon_atk += e_get(1); // :226-227 魔法
        const halved = Math.trunc((era.get(`item:${i}`) || 0) / 2); // :229
        era.set(`item:${i}`, halved);
        sinkou += mon_atk * (Math.trunc(halved / 9) + 1); // :231
      }
      sinkou = Math.trunc(sinkou / 20); // :234
      // :236-259 威望修正（与魔力分支 :270-293 同构，共用一套五档）
      const tier = apply_prestige_tier(sinkou);
      sinkou = tier.sinkou;
      if (tier.failed) {
        era.print('侵攻失败'); // :239 PRINTW
        await era.waitAnyKey();
        return 1; // 与魔力分支同款的早退（不结算、不消耗后续流程）
      }
      era.print('怪物的战斗力　' + sinkou + '点'); // :263 PRINTFORMW
      await era.waitAnyKey();
    } else if (inv_type === 3) {
      // ===== [3] 勇者掠夺（:442-563）=====
      const picked = await pick_raid_hero(page_state);
      if (picked === RESTART) {
        continue; // :467-470/:519-520 RESTART → 重画出兵菜单
      }
      yusya_i = picked; // :547 YUSYA_I = RESULT
      // :549-551 掠夺的战力来源是魔王之力（BASE:0:1），与 [0]/[2] 的怪物无关
      sinkou = Math.floor(chara(0).dungeon.气力 / 25);
      chara(0).dungeon.气力 = Math.floor(chara(0).dungeon.气力 / 2);
      era.print('魔王的力量　' + sinkou + '点'); // :551 PRINTFORMW
      await era.waitAnyKey();
      // :553-557 勇者补正（CFLAG:YUSYA_I:9 = 等级）
      const hero_bonus = chara(yusya_i).chara.等级 + 100; // :553 TMP2_I
      era.print(
        '勇者补正　x' +
          Math.floor(hero_bonus / 100) +
          '.' +
          String(hero_bonus % 100).padStart(2, '0'),
      ); // :554 PRINTFORMW
      await era.waitAnyKey();
      sinkou = Math.floor((sinkou * hero_bonus) / 100); // :556-557
      // :559-561 勋章补正（传勇者号——#502 的 medal_bonus 签名接实参）
      sinkou = Math.floor((sinkou * (await medal_bonus(yusya_i))) / 100);
    } else {
      // ===== [1] 魔力出兵（:266-296）=====
      // :267 SINKOU = BASE:0:1 / 25；:268 BASE:0:1 /= 2（失败也照减）。气力是
      // dungeon 域属主（#70 实测），跨域写走门面（#71）
      sinkou = Math.floor(chara(0).dungeon.气力 / 25);
      chara(0).dungeon.气力 = Math.floor(chara(0).dungeon.气力 / 2);
      // :269-293 威望修正（失败档早退：PRINTW 侵攻失败 → RETURN 1）
      const tier = apply_prestige_tier(sinkou);
      sinkou = tier.sinkou;
      if (tier.failed) {
        era.print('侵攻失败');
        await era.waitAnyKey();
        return 1;
      }
      // :296 PRINTFORMW 战斗力（行首对齐的全角空格在字符串字面量里——模板串
      // 会被 no-irregular-whitespace 拦下）
      era.print('战斗力　' + sinkou + '点');
      await era.waitAnyKey();
    }
    break; // 路线走完，进共通段
  }

  // ===== 共通処理（:565-598）=====
  // :568-572 魔王补正：CFLAG:0:9 是百分比加成（+20 → x1.20），新档 0
  const maou_bonus = (era.get('cflag:0:9') || 0) + 100;
  era.print(
    '魔王补正　　　x' +
      Math.floor(maou_bonus / 100) +
      '.' +
      String(maou_bonus % 100).padStart(2, '0'),
  );
  await era.waitAnyKey();
  sinkou = Math.floor((sinkou * maou_bonus) / 100);
  // :574-590 知识补正（魔王的素质，新档均无）
  if ((era.get('talent:0:325') || 0) === 1) {
    era.print('魔界知识补正　x1.50');
    await era.waitAnyKey();
    sinkou = Math.floor((sinkou * 150) / 100);
  }
  if ((era.get('talent:0:327') || 0) === 1) {
    era.print('淫魔知识补正　x1.20');
    await era.waitAnyKey();
    sinkou = Math.floor((sinkou * 120) / 100);
  }
  if ((era.get('talent:0:328') || 0) === 1) {
    era.print('魔虫知识补正　x1.10');
    await era.waitAnyKey();
    sinkou = Math.floor((sinkou * 110) / 100);
  }
  // :593-595 勋章补正（#502 起真身：EXP:0:81 分档，本世界 > 5 枚时真有数值差）
  sinkou = Math.floor((sinkou * (await medal_bonus())) / 100);
  // :598 PRINTFORMW 合计
  era.print('合计　' + sinkou + '点');
  await era.waitAnyKey();

  // :601-603 CALL INVASION_EVENT；SIF RESULT > 0 → RETURN RESULT
  const event_result = await invasion_event(area, sindo, inv_type, rand);
  if (event_result > 0) {
    return event_result;
  }

  // ===== 侵攻結果共通（:609-618）=====
  // :610-611 掠夺路线的侵攻力激减（SINKOU / 20）；:613-614 其余路线全额
  const gained = inv_type === 3 ? Math.trunc(sinkou / 20) : sinkou;
  era_flag.human_realm_invasion = era_flag.human_realm_invasion + gained;
  if (era_flag.human_realm_invasion >= 10000) {
    era_flag.human_realm_invasion = 10000; // :617-618 封顶
  }

  // ===== 结果段：按 INV_TYPE 三臂（:620-975）=====
  if (inv_type === 0) {
    await monster_result_section(area, sindo, sinkou, rand); // :620-692
  } else if (inv_type === 3) {
    await raid_result_section(area, sindo, yusya_i, sinkou); // :891-975
  } else {
    // ===== 魔力结果段（:694-757）=====
    // :696 %SAVESTR:MASTER%的魔力爆发出来了！
    era.print(`${chara_callname(0)}的魔力爆发出来了！`);
    await era.waitAnyKey();
    // :697-709 威力分档的演出文本
    const burst =
      sinkou < 100
        ? `${sinkou}点魔力形成飓风，将大树吹倒了！`
        : sinkou < 300
          ? `${sinkou}点魔力形成火焰，将平原焚烧殆尽！`
          : sinkou < 600
            ? `${sinkou}点魔力形成雷霆，将附近的村庄彻底摧毁！`
            : sinkou < 900
              ? `${sinkou}点魔力形成洪水，将城镇淹没！`
              : sinkou < 1200
                ? `${sinkou}点魔力形成剧毒气体，令骑士团窒息！`
                : `${sinkou}点魔力形成纯粹能量，将城市吞没！`;
    era.print(burst);
    await era.waitAnyKey();
    era.drawLine();
    // :711-738 经验值段（窄路径 FLAG:82 == 0 → :736-738 的 ELSE 臂）。战斗
    // 经验是 dungeon 域属主，跨域写走门面
    const exp_gain = Math.floor(sinkou / 2);
    era.print(`${chara_callname(0)}得到了${exp_gain}点经验值！`);
    await era.waitAnyKey();
    chara(0).dungeon.战斗经验 += exp_gain; // EXP:0:80（魔王的侵略经验）
    era.drawLine();
    // :742-757 侵攻度条
    print_progress_line('侵攻度', era_flag.human_realm_invasion, 10000);
  }

  // ===== 结算尾（:976-997）=====
  era.drawLine(); // :976
  await era.waitAnyKey(); // :977 WAIT
  era_exflag.prestige = era_exflag.prestige + 2; // :978 EX_FLAG:99 += 2
  // :983-994 KYOTEN_EVENT（AREA == 81 → ARG 1）
  await kyoten_event(1);
  // :996 CALL INVASION_CHECK（结局判定，#118 本体：FLAG:81 满时在此触发
  // ENDING_1，演出含 [0] 继续 / [1] 退出的询问——选 0 继续后回落到这里）
  await invasion_check();
  return 1; // :997
}

module.exports = {
  STUBBED_CALLS,
  invasion,
  invasion_check,
  invasion_event,
  invasion_event_challenge,
  invasion_event_fort,
  invasion_event_seiei,
  kyoten_event,
  medal_bonus,
  post_conquest_menu,
  sengen_video,
  sengen_video_bonus,
  start_campaign,
};
