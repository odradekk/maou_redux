/**
 * @file 侵略画面：invasion() 的四条出兵路线与地上征服后菜单 + kyoten_event()
 *     的据点事件横幅 + invasion_event() 的 RAND:10 分发与三个中途事件 +
 *     invasion_check() 的结局判定（issue #117 魔力出兵；issue #118 结局判定
 *     本体与 ENDING_1 接入；issue #468 地上征服后菜单渲染与派发、campaign_menu
 *     接通；issue #503 怪物出兵 / 勇者掠夺两条路线；issue #504 勇者出兵路线与
 *     FORT / CHALLENGE 两分支；issue #505 地区续接与 start_campaign 的地区泛化）。
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - CLEARLINE 局部重绘不镜像：ere 控制台是滚动视图，画面每次进入
 *     整屏重画（page-select-target 同款先例）；两个输入循环对无效输入
 *     只重问不重画，行为保留；
 *   - [999]/[1000] 旧版同行显示（叙述接等键，不换行）；ere 侧按钮是块级
 *     元素，拆成两个 printButton 各占一行，功能等价；
 *   - BARSTR 文本条 → era 原生进度条格（printMultiColumns 的 progress 格，
 *     page-train 先例）：barWidth 16 保住条后数值列（引擎缺省 24 会被
 *     el-col-0 吞掉，M155 的教训）；进度条标签按 AREA 取自 CAMPAIGN_REGIONS，
 *     为对齐 BAR 而在标签两侧写的全角空格一并丢弃（只留「侵攻度」
 *     「精灵族领域的侵攻度」这样的正文，与 #117 起的写法一致）；本路径无
 *     黄金样本（#108 接受），逐字锁随 #109 决定后补。SEIEI 战斗体的
 *     HP/气力条同款（`print_progress_line`）；
 *   - invasion_event() 的 RAND:10 分发**自 #503 起掷骰真分发**：#117 只
 *     做魔力路线时，三分支对 INV_TYPE == 1 一律「打印首档传闻后 RETURN -1」，
 *     掷不掷骰结果相同，故当时归约成直接调 SEIEI 分支。[0]/[3] 实现后
 *     INV_TYPE 取 0/3：CHALLENGE 的 `!= 0 && != 2 && != 3` 链对两者都放行；
 *     FORT 的 `FLAG:SINDO || INV_TYPE != 0 && ...` 按**同优先级左结合**（见
 *     invasion_event_fort 的注释）读成 `((FLAG:SINDO || INV_TYPE != 0) &&
 *     INV_TYPE != 2) && INV_TYPE != 3`——对 2/3 恒不早退、对 0 才看
 *     FLAG:SINDO，两条路线照样可达（已征服的 [3] 也进）。两分支真的可达，
 *     归约的依据当场失效，因此恢复真分发（#504 起三分支的行为体全部实现）；
 *   - **SINKOU 的按引用改写**：中途事件把 SINKOU 按引用参数传进传出，
 *     FORT/CHALLENGE 的强攻/潜入/绕路按比例削减它。ere 侧把
 *     `{sinkou, yusya_i}` 打包成 state 传进传出，`start_campaign()` 在调用
 *     后写回局部量再进侵攻結果共通；
 *   - **PRINTDATA / PRINTDATAL 的抽取**：等概率随机文本块由注入的 rand
 *     抽取、上界 = 块数（`printdata()`）——ere 侧无全局 RAND 序列（#117
 *     决议）；
 *   - [2] 出兵路线自 #504 起是真身（出兵流程 + 结果段）。结果段与
 *     #503 处理 [0]/[3] 时同一理由：不接就会掉进 [1] 的魔力结果段（打印
 *     「魔力爆发」并给魔王经验），是错误行为而不仅是缺功能；
 *   - **地区泛化（#505）**：`AREA`/`SINDO` 由 `CAMPAIGN_REGIONS` 表给出，
 *     各处按 AREA 分派的位置全部读表：出兵菜单标签、累加、四条结果段的
 *     地区名/已征服分支/进度条、invasion_ryouzyoku() 的地区号、kyoten_event()
 *     的实参。侵攻度一律读写 FLAG 侧（`flag:${AREA}`；EX_FLAG:101 没有写
 *     点，天神宫的累加在 FLAG:101）；[0] 的已征服分支列全五个地区。FLAG:101/102
 *     与 K1/K2 的「口上存在标志」同槽（yml/Flag.yml 保留区外的 1xx 段），
 *     累加会覆盖口上标志、读 FLAG:102 会把口上的存在当成「已征服」——#102
 *     查明、ExFlag.yml 头注登记，写侧的重叠保留、由用例钉住；
 *   - [2] 候选条件的第三条：带队者必须是助手可的角色（CFLAG:0 == 2），
 *     其余一律排除，由 `brute_rejected` 的注释与用例钉住；
 *   - SEIEI 战斗体的两处退场检查都判（领军勇者，精锐部队）——「魔王侧
 *     获得胜利」的判断条件是精锐部队倒下，不是魔王被打残；
 *
 *   - kyoten_event() 的 ARG 2/3/4 三分支只有判定骨架：推进赋值整体被注释，
 *     不输出任何内容、不推进，状态字维持原样。三分支随地区续接（#505）可达：
 *     出兵结算尾的 AREA 可取 86/88/90，侵攻度有写入路径。状态字（FLAG:94/95/96）
 *     没有写点：94 号被挪作「人数上限阶梯」的判断条件，CHALLENGE 用的是
 *     EX_FLAG:95 位域；
 *
 *   - FORT 的 [3] 绕路支（勇者掠夺路线）掷 RAND:10：九成平安无事（体力
 *     ×9/10、直接 RETURN 0）、一成埋伏（RETURN 1），与怪物路线同构；
 *
 *
 *   - FORT/CHALLENGE 的 `LOCAL:3`（领军勇者的种族号）与 `LOCAL:12`（复现
 *     职业）都是局部量数组的元素，不是位运算；CHALLENGE 的职业在选区时
 *     就掷定下（早于位域检查的早退），顺序照此；
 *
 *   - SEIEI 战斗体的先制检查用 `SINKOU/2048+1`、伤害式用 `SINKOU/1024+1`
 *     ——两处除数不同是不对称的既有行为，有意不统一；
 *
 *   - 精锐部队的清退在扁平化（#21）下直接用角色号 18/19——
 *     `getAddedCharacters()` 是按角色号升序的名单、取不回「最后加入的一位」
 *   - RESTART 按「回到当前函数开头重新执行」语义（局部量不重置）处理：
 *     invasion() 的开头是按 FLAG:82 分派的征服后菜单，故用 RESTART 常量把
 *     信号透传给 invasion() 的外层循环，由那里重走「分派 → 菜单」（先例：
 *     page-chara-info-show.js 的返回 true 外层重画）；
 *   - %SAVESTR:MASTER%（魔王存档名）经 callname:0:-1 承载（#5 决议，
 *     utils/callname-utils），新档 =「你」；
 *   - 地上征服后菜单（post_conquest_menu，#468）：[0] 复用 start_campaign()
 *     （结算与返回值完全一致）；[4] ARCANA_FORT 接真身（#470，invasion 域跨域
 *     调用不受限）；[1]/[2]/[3]/[5] 自 #505 起按 CAMPAIGN_REGIONS 取
 *     AREA/SINDO 后汇入同一个 start_campaign()；
 *
 *   - [5] 天神宫的渲染与派发共用同一道 route_33 > 500 检查：按钮只在窗口
 *     内渲染，派发拒收窗口外的值，玩家看不到「可选却进不去」的按钮；
 *
 *   - [1001]（AGENT_MENU）是复制改名事故（#103 判定）、不排期——缺内容的
 *     入口随 #638 一并删除：键入 1001 落到 >=6 的拒收支重问；
 *
 *   - FORT 与 CHALLENGE 的选项按钮化（PR #53 的「子画面选项按钮化」通则）：
 *     引擎白名单先一步挡下未渲染的值，`!INRANGE(RESULT,1,3)` 等三处重问支
 *     在真引擎里不可达——结构保留作防御（page-intercept 的等级门同款
 *     处置）；
 *
 *   - barWidth / 连续空白：`怪物数量减少了10\%` 的 `\%` 是打印语法的转义，
 *     值是字面量 `10%`；叙述 + 等键的两段式输出按既有惯例并入一次 print
 *     （退场检查的三条溃败文案、FORT/CHALLENGE 的多处两段式）。
 *
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { campaign_menu } = require('#/page/page-campaign');
const { life_list_item } = require('#/page/page-life-list');
const {
  ending_1,
  ending_3,
  ending_4,
  ending_5,
} = require('#/event/event-ending');
const { get_enemy, MAX_CHARANUM } = require('#/event/enter-enemy');
const { karma } = require('#/chara/chara-stats');
const { add_chara_ex } = require('#/chara/chara-ex');
const { char_make, name_reset } = require('#/chara/char-make');
const { e_get, monster_data } = require('#/dungeon/monster-data');
const { party_char_del } = require('#/dungeon/dungeon-party');
const { arcana_fort } = require('#/invasion/invasion-arcana-fort');
const { invasion_ryouzyoku } = require('#/invasion/invasion-ravish');
const { chara } = require('#/facade/chara');
const { chara_callname, chara_nickname } = require('#/utils/callname-utils');
const { NBSP, pad_left } = require('#/utils/display-width'); // #577：对齐补位 NBSP 化

/**
 * RESTART 语义的 ere 侧信号（control-flow.md:376-377「回到当前函数开头重新
 * 执行」；`#DIM` 局部量不随 RESTART 重置见 user-defined-variables.md 的
 * 局部变量一节）。invasion() 的开头按 FLAG:82 分派，
 * 所以信号一路透传到 invasion() 的外层循环——那里重走「FLAG:82 分派 →
 * 菜单」，与 RESTART 语义等价（含「征服后菜单的 [0] 出发时回到征服后
 * 菜单」这一写法）。
 */
const RESTART = Symbol('restart');

/** 每页角色数（`#DIM NUM_PAGE = 26`） */
const NUM_PAGE = 26;

/** 出兵菜单的怪物门槛（`MON_NUM < 600`） */
const MONSTER_THRESHOLD = 600;

/** 进度条的条宽（< 24，否则引擎 el-col-0 吞掉条后数值列，见文件头） */
const BAR_WIDTH = 16;

/**
 * 出兵目标的地区表（RESULT → AREA/SINDO 下标对，连同各处按 AREA
 * 分派所需的派生值）。键是地上征服后菜单的输入值 RESULT；
 * [4] 是 ARCANA_FORT 单独一支，不在本表。
 *
 * `area`/`sindo` 沿用同名 `#DIM` 局部量的命名（AREA/SINDO 本就是对应
 * FLAG 下标的名字）；
 * `campaign_label` 是出兵菜单的进度条标签、`result_label` 是结果段的
 * 标签、`name` 是结果段里的地区名、`ravish_area` 是 invasion_ryouzyoku()
 * 的地区号、`kyoten_arg` 是 kyoten_event() 的实参（**没有天神宫分支**，
 * 故为 null）。
 *
 * 侵攻度一律读写 FLAG 侧（`flag:${AREA}`）：EX_FLAG:101 没有写点，天神宫
 * 的累加在 FLAG:101（add_region_progress，出兵结算），region_progress()
 * 与之同表。写侧 FLAG:101/102 与 K1/K2 的「口上存在标志」同槽（yml/
 * Flag.yml 保留区外的 1xx 段）——累加会覆盖口上标志、读 FLAG:102 会把
 * 口上的存在当成「已征服」。这个重叠随 #102 登记保留、不另迁槽位。
 */
const CAMPAIGN_REGIONS = {
  0: {
    area: 81,
    sindo: 82,
    name: '人间界',
    campaign_label: '侵攻度',
    result_label: '侵攻度',
    ravish_area: 1,
    kyoten_arg: 1,
  },
  1: {
    area: 86,
    sindo: 87,
    name: '精灵族的领域',
    campaign_label: '精灵族领域的侵攻度',
    result_label: '精灵族的领域　侵攻度',
    ravish_area: 2,
    kyoten_arg: 2,
  },
  2: {
    area: 88,
    sindo: 89,
    name: '龙之山脉',
    campaign_label: '龙之山脉的侵攻度',
    result_label: '龙之山脉　侵攻度',
    ravish_area: 3,
    kyoten_arg: 3,
  },
  3: {
    area: 90,
    sindo: 91,
    name: '天界',
    campaign_label: '天界的侵攻度',
    result_label: '天界　侵攻度',
    ravish_area: 4,
    kyoten_arg: 4,
  },
  5: {
    area: 101,
    sindo: 102,
    name: '天神宫',
    campaign_label: '天神宫的侵攻度',
    result_label: '天神宫　侵攻度',
    ravish_area: 5,
    kyoten_arg: null,
  },
};

/** 人间界：未征服时 invasion() 直接进的那一支（出兵菜单的 ELSE，AREA=81） */
const HUMAN_WORLD = CAMPAIGN_REGIONS[0];

/**
 * [0] 怪物路线的已征服分支（强制征收 ×10 + 封顶）适用的五个地区；不在列的
 * 地区落 ELSE 战利品分支、不封顶。
 */
const MONSTER_CONQUERED_AREAS = [81, 86, 88, 90, 101];

/**
 * 侵攻度的读点：一律读 FLAG 侧（`flag:${region.area}`），与累加同表（天神宫
 * 写 FLAG:101，add_region_progress）。EX_FLAG:101 没有写点，读那张表进度
 * 恒 0。
 *
 * 地址是模板串：AREA 本来就是按地区取的变量，domain-check 的属主判定对
 * 动态下标不适用（tools/domain-check.mjs 头注的「动态下标静态无法判定
 * 属主，只计数不判定」）。
 *
 * @param {object} region 地区条目
 * @returns {number} 该地区的侵攻度（未声明下标按 0 处理，见 issue #13）
 */
function region_progress(region) {
  return era.get(`flag:${region.area}`) || 0;
}

/**
 * 侵攻度累加 + 封顶。写 FLAG:AREA（AREA=101 时即 FLAG:101——与 K1 口上的
 * 存在标志同槽，这个重叠随 #102 登记保留：天神宫的出兵会覆盖该标志，
 * 读 FLAG:102 会把口上的存在当成「已征服」）。
 *
 * @param {object} region 地区条目
 * @param {number} gained 本次增量（SINKOU，掠夺路线是 SINKOU / 20）
 */
function add_region_progress(region, gained) {
  const next = (era.get(`flag:${region.area}`) || 0) + gained;
  era.set(`flag:${region.area}`, Math.min(next, 10000)); // 封顶
}

/** RAND:N（0..N-1）的缺省随机源（同族模块同款；各函数以 rand 为注入名） */
function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/** GETBIT(X, n)：FLAG:5 用到位 32+，位运算在 JS 里按 32 位截断会溢出，改算术 */
function getbit(value, bit) {
  return Math.floor((value || 0) / 2 ** bit) % 2;
}

/**
 * `TIMES 整数, 小数` 的等价物：乘完截断小数部分。旧引擎的双精度与 JS
 * 同为 IEEE 754，两边逐位同值（sengen_video 的 ×1.20/×1.60、sengen_video_bonus
 * 的 ×1.10/×1.20/×0.80 共十二处）。
 * @param {number} value 整数原值
 * @param {number} factor 小数倍率
 * @returns {number} 截断后的整数
 */
function times(value, factor) {
  return Math.floor(value * factor);
}

/**
 * 数值型 INPUT 的读数（本文件九处：sengen_video 内的六处，
 * post_conquest_menu 与 start_campaign 各一处菜单读数，以及 #503 的
 * pick_hero 一处列表选人）。
 *
 * 引擎 `era.input()` 与旧引擎的 `INPUT` 有两处差异（镜像见
 * test/helpers/era-fixture.js 的 #151/G6，`getNumber(val)` 即 `Number(val)`、
 * 解析失败原样返回）：
 *   - **空输入归一成 0**——`INPUT` 没有默认值时会在引擎层原地重问，
 *     游戏层永远看不到空值；ere 侧区分不出「空」与「显式键入 0」，两者都走
 *     `RESULT == 0` 那一支；
 *   - **非数字串原样回传**（字符串），而 `INPUT` 侧的 `RESULT` 恒为数值——不归一
 *     就会让 `count` 变成 NaN：`count > stock` 恒假、直接被当合法数量收下，
 *     随后 `EX_FLAG:9011 += count` 把 NaN 写进存档变量。
 *
 * @returns {Promise<number>} 输入值；空输入与非数字一律归一到 0
 */
async function number_input() {
  const value = await era.input();
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

/**
 * `FORMAT {值,N}` 的定宽：位数不足补半角空格（右对齐；数字是半角，
 * 与全角算两格的规则无关）。
 * @param {number} value 数值
 * @param {number} width 显示位数
 * @returns {string}
 */
function pad_number(value, width) {
  return pad_left(String(value), width);
}

// kyoten_event 的星号横幅（含全角空格的手工对齐）
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
 * kyoten_event 四个分支共用的状态推进链（人间界分支与另外三个分支的
 * 十档判定结构相同）：命中档给下一档号，未命中返回原档。ELSEIF 链化成一串
 * 提前 return，语义与「命中即止」相同。
 *
 * @param {number} progress 该领域的侵攻度
 * @param {number} stage 该领域的侵略事件状态字
 * @returns {number} 下一档；等于 stage 即未命中任何档
 */
function kyoten_next_stage(progress, stage) {
  if (progress >= 2000 && stage === 0) return 1;
  if (progress >= 4000 && stage === 1) return 2;
  if (progress >= 6000 && stage === 2) return 3;
  if (progress >= 8000 && stage === 3) return 4;
  if (progress >= 10000 && stage === 4) return 5;
  if (progress <= 500 && stage === 1) return 0;
  if (progress <= 2000 && stage === 2) return 1;
  if (progress <= 4000 && stage === 3) return 2;
  if (progress <= 6000 && stage === 4) return 3;
  if (progress <= 8000 && stage === 5) return 4;
  return stage;
}

/**
 * kyoten_event：据点事件横幅。
 *
 * arg == 1（人间界）的完整状态机：侵攻度跨 2000/4000/6000/8000/10000 逐档
 * 推进 FLAG:93，回落到 500/2000/4000/6000/8000 以下时逐档回退，命中的档打
 * 七行横幅并写回状态字。
 *
 * arg == 2/3/4（精灵/龙/天界）三分支只有判定骨架：推进赋值整体被注释、状态字
 * 恒 0，不输出任何内容、也不推进——状态字维持原样，出兵结算的侵攻度照算。
 * 三分支随地区续接（#505）可达：出兵结算尾的 AREA 可取 86/88/90，侵攻度有
 * 写入路径。三分支的状态字（FLAG:94/95/96）没有写点：94 号被挪作「人数上限
 * 阶梯」的判断条件，CHALLENGE 用的是 EX_FLAG:95 位域。
 *
 * @param {number} arg 地区编号：1=人间界、2=精灵、3=龙、4=天界（0 与 5 及以上空转）
 * @returns {Promise<0>} 恒 RETURN 0
 */
async function kyoten_event(arg) {
  if (arg === 1) {
    const progress = era_flag.human_realm_invasion; // FLAG:81
    const stage = era_flag.human_realm_event_stage; // FLAG:93
    const next = kyoten_next_stage(progress, stage);
    if (next === stage) {
      return 0; // 未命中任何档：空转
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

  // 精灵/龙/天界三分支：不输出、不推进（见函数头注释）
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
 * invasion_event：侵略中途事件的 RAND:10 分发。
 *
 * `LOCAL = RAND:10` 后三分：9 → invasion_event_fort、
 * 8 → invasion_event_challenge、其余 0-7 → invasion_event_seiei。三条都
 * 是 JUMP（尾调用），被跳函数的返回值就是本函数的返回值。**#503 起是
 * 真分发**（归约依据失效的经过见文件头）。
 *
 * 五参是 `AREA, SINDO, INV_TYPE, SINKOU(#DIM REF), YUSYA_I`——三分支都会
 * 读 SINKOU，FORT/CHALLENGE 还会改写它（两分支的强攻/潜入/绕路各自按比例削
 * 减）。ere 侧把 SINKOU 与 YUSYA_I 打包成 `state` 传进传出，等价于 `#DIM
 * REF`（返回后由调用方写回局部量）。
 *
 * @param {number} area 侵攻地区 FLAG 下标（81）
 * @param {number} sindo 征服标记 FLAG 下标（82）
 * @param {number} inv_type 出兵类别（0/1/2/3）
 * @param {{sinkou: number, yusya_i: number}} state 以引用语义共享的局部量
 *   （`#DIM REF SINKOU` 与 `#DIM YUSYA_I`）
 * @param {(n: number) => number} [rand] RAND:N 随机源（RAND:10 的上界）
 * @returns {Promise<number>} 0/-1 = 继续侵攻（契约是「0 继续、
 *   1 结束」，三分支照此返回）；>0 = 侵攻中止（调用方透传）
 */
async function invasion_event(
  area,
  sindo,
  inv_type,
  state,
  rand = default_rand,
) {
  const local = rand(10); // LOCAL = RAND:10
  if (local === 9) {
    return await invasion_event_fort(area, sindo, inv_type, state, rand);
  }
  if (local === 8) {
    return await invasion_event_challenge(area, sindo, inv_type, state, rand);
  }
  return await invasion_event_seiei(area, sindo, inv_type, state, rand);
}

/** FLAG:5 位 7（128）：狂王俘虏线的开关（`FLAG:5 & 128`，31 位内位运算直接可用） */
function captive_route() {
  return ((era.get('flag:5') || 0) & 128) !== 0;
}

/**
 * inv_death_check：精锐部队战斗的退场判定。
 *
 * 两段：先判 ARG:1（精锐部队）的三条死线 → RETURN 2（魔王侧获胜）；再判
 * ARG:0（领军勇者）的四条 → RETURN 1（侵攻中止）。玩家的位 7 开关
 * （FLAG:5 & 128）决定退场状态：开 = 被狂王带走（CFLAG:1 = 9），关 = 逃回
 * 本国（CFLAG:1 = 0）。
 *
 * 战斗体内有两处调用点（精锐部队反击前、反击后），都传（领军勇者，精锐
 * 部队）：先判精锐部队的三条死线，「魔王侧获得胜利」的判断条件是精锐部队
 * 退场，不是魔王被打残。
 *
 * @param {number} arg0 领军勇者
 * @param {number} arg1 精锐部队
 * @returns {Promise<number>} 2 = 精锐部队退场；1 = 魔王侧退场；0 = 继续
 */
async function inv_death_check(arg0, arg1) {
  // 勇者死亡判定（判 arg1）
  const elite_hp = era.get(`base:${arg1}:0`) || 0;
  if (elite_hp <= 0) {
    era.print(
      `${chara_nickname(arg1)}被${chara_callname(arg0)}率领的魔王军消灭了………`,
    );
    era.println(); // PRINTL
    return 2;
  }
  if (elite_hp <= 100) {
    era.print(
      `${chara_nickname(arg1)}被${chara_callname(arg0)}率领的魔王军击溃了………`,
    );
    era.println();
    return 2;
  }
  if ((era.get(`base:${arg1}:1`) || 0) <= 0) {
    era.print(`被魔王军包围的${chara_nickname(arg1)}失去战斗的意志投降了………`);
    era.println();
    return 2;
  }

  // 魔王側の生き残りを判定（判 arg0；四条 ELSEIF，顺序照旧）
  const hero_hp = era.get(`base:${arg0}:0`) || 0;
  const hero_mp = era.get(`base:${arg0}:1`) || 0;
  // 被狂王俘虏过（TALENT:280）且气力见底 → 抛下武器投降
  if (
    hero_mp <= 1000 &&
    (era.get(`talent:${arg0}:280`) || 0) !== 0 &&
    captive_route()
  ) {
    era.print(
      `被狂王俘虏过的${chara_callname(arg0)}丧失了战意，抛下武器投降了。`,
    );
    era.print(`${chara_nickname(arg1)}俘获了${chara_callname(arg0)}………`); // PRINTFORMW
    await era.waitAnyKey();
    chara(arg0).invasion.状态 = 9; // （CFLAG(ARG:0) 的第 1 位）= 9
    era.drawLine();
    return 1;
  }
  // 三条「魔王军被打散」的写法，各自的收尾文案按位 7 二分。
  // `PRINTFORM X，` 接 `PRINTFORMW Y` 在同一显示行，ere 侧并入一次
  // print + 等键（同显示行归并先例）。
  const collapse =
    hero_hp <= 0
      ? {
          head: `魔王军被${chara_nickname(arg1)}消灭了，`,
          captured: `${chara_callname(arg0)}也被俘虏了…………`,
          escaped: `${chara_callname(arg0)}孤身逃了回来…………`,
        }
      : hero_hp <= 300
        ? {
            head: `魔王军被${chara_nickname(arg1)}击溃了，`,
            captured: `${chara_callname(arg0)}也被俘虏了…………`,
            escaped: `${chara_callname(arg0)}从乱军中逃了回来…………`,
          }
        : hero_mp <= 0
          ? {
              head: `被${chara_nickname(arg1)}包围的魔王军失去战斗的意志投降了，`,
              captured: `${chara_callname(arg0)}被投降的部下献给了${chara_nickname(arg1)}…………`,
              escaped: `${chara_callname(arg0)}没脸见人地逃了回来…………`,
            }
          : null;
  if (collapse === null) {
    return 0; // 四条都不命中
  }
  const taken = captive_route();
  era.print(collapse.head + (taken ? collapse.captured : collapse.escaped));
  await era.waitAnyKey(); // 等 PRINTFORMW 的 WAIT
  chara(arg0).invasion.状态 = taken ? 9 : 0;
  era.drawLine();
  return 1;
}

/** 精锐部队的两个预设角色号（`ADDCHARA 18` 防御型 / `ADDCHARA 19` 攻击型） */
const SEIEI_DEFENDER = 18;
const SEIEI_ATTACKER = 19;

/** 战斗回合数（`REPEAT 21`）：第 21 次循环由 `TIME_I > 19` 截住 */
const SEIEI_ROUNDS = 21;
/** 战线崩溃的判断条件（`IF TIME_I > 19`） */
const SEIEI_TIMEOUT_AT = 19;

/**
 * 精锐部队战斗体。
 *
 * 回合制：勇者侧先制（防御判定 + 1/5 会心一击）→ inv_death_check →
 * 精锐侧反击（防御判定）→ inv_death_check。`REPEAT 21` 的第 21 次直接走
 * 超时（战线崩溃、给 SINKOU/10 经验、RETURN 1）。
 *
 * @param {number} area 侵攻地区 FLAG 下标（81）
 * @param {{sinkou: number, yusya_i: number}} state 共享局部量
 * @param {(n: number) => number} rand RAND:N 随机源
 * @returns {Promise<number>} 0 = 精锐部队被打倒（战斗体走完）；1 = 侵攻中止
 */
async function seiei_battle(area, state, rand) {
  const yusya = state.yusya_i;
  const sinkou = state.sinkou;
  era.print('………');
  await era.waitAnyKey();
  era.print('……');
  await era.waitAnyKey();
  era.print('…');
  await era.waitAnyKey();
  era.print('精锐部队出现了！');
  await era.waitAnyKey();
  era.print(
    `你的勇者${chara_callname(yusya)}率领着魔王军和精锐部队展开了战斗！`,
  );
  await era.waitAnyKey();
  era.print('（怪物的战斗力将被添加到攻击力和体力和气力上）');
  await era.waitAnyKey();

  let time_i = 0;
  // 两种精锐部队（防御型 18 / 攻击型 19）。扁平化（#21）下
  // GETCHARA(18/19) 就是刚加入的角色号，不用「已加入数 - 1」（#487 的教训）
  let seiei;
  if (rand(2) === 0) {
    era.addCharacter(SEIEI_DEFENDER);
    await add_chara_ex(SEIEI_DEFENDER);
    seiei = SEIEI_DEFENDER; // GETCHARA(18)
  } else {
    era.addCharacter(SEIEI_ATTACKER);
    await add_chara_ex(SEIEI_ATTACKER);
    seiei = SEIEI_ATTACKER; // GETCHARA(19)
  }

  // 勇者基礎レベル補正（FLAG:60 = 勇者基础等级校正）
  const bonus = 10 * (era.get('flag:60') || 0);
  chara(seiei).dungeon.攻击力 += era.get('flag:60') || 0; // CFLAG:SEIEI_I:11
  chara(seiei).dungeon.防御力 += era.get('flag:60') || 0; // CFLAG:SEIEI_I:12
  era.set(`maxbase:${seiei}:0`, (era.get(`maxbase:${seiei}:0`) || 0) + bonus);
  era.set(`maxbase:${seiei}:1`, (era.get(`maxbase:${seiei}:1`) || 0) + bonus);
  chara(seiei).dungeon.体力 += bonus; // BASE:SEIEI_I:0
  chara(seiei).dungeon.气力 += bonus; // BASE:SEIEI_I:1
  // SINKOU 补正（加成到勇者的体力/气力上）
  chara(yusya).dungeon.体力 += sinkou;
  chara(yusya).dungeon.气力 += sinkou;

  for (let round = 0; round < SEIEI_ROUNDS; round += 1) {
    // 超时：战线维持不住，残余怪物不足十只，给 SINKOU/10 经验
    if (time_i > SEIEI_TIMEOUT_AT) {
      era.print('………');
      await era.waitAnyKey();
      era.print('……');
      await era.waitAnyKey();
      era.print('…');
      await era.waitAnyKey();
      era.print('没有时间了，战线已经不可能再维持下去了！'); // PRINTFORML
      era.print(
        `${chara_callname(yusya)}的部队开始了后退，怪物们在后退中溃散着。`, // PRINTFORML
      );
      era.print('最终活着回来的怪物不到十只………'); // PRINTFORML
      era.println(); // PRINTL（空行）
      const gained = Math.trunc(sinkou / 10);
      chara(yusya).dungeon.战斗经验 += gained; // EXP:YUSYA_I:80
      era.print(`${chara_callname(yusya)}获得了${gained}点经验值！`); // PRINTFORMW
      await era.waitAnyKey();
      await seiei_cleanup(seiei);
      return 1;
    }

    // 双方状态（HP/气力条 + 攻防行；BARSTR → progress 格的偏离见文件头）
    era.drawLine();
    era.print(`魔王军 ${chara_callname(yusya)}`);
    print_progress_line(
      'HP',
      chara(yusya).dungeon.体力,
      era.get(`maxbase:${yusya}:0`) || 0,
    );
    print_progress_line(
      '气力',
      chara(yusya).dungeon.气力,
      era.get(`maxbase:${yusya}:1`) || 0,
    );
    // 攻击值按 SINKOU/1024 的档位放大（整数除法）
    era.print(
      `攻击${chara(yusya).dungeon.攻击力 * (Math.trunc(sinkou / 1024) + 1)}` +
        ` 防御${chara(yusya).dungeon.防御力} 怪物的合计战力${sinkou}点`,
    );
    era.print('VS'); // PRINTW
    await era.waitAnyKey();
    era.print(chara_nickname(seiei));
    print_progress_line(
      'HP',
      chara(seiei).dungeon.体力,
      era.get(`maxbase:${seiei}:0`) || 0,
    );
    print_progress_line(
      '气力',
      chara(seiei).dungeon.气力,
      era.get(`maxbase:${seiei}:1`) || 0,
    );
    era.print(
      `攻击${chara(seiei).dungeon.攻击力} 防御${chara(seiei).dungeon.防御力}`,
    );
    await era.waitAnyKey(); // WAIT
    era.drawLine();

    // 魔王軍の先制攻撃（会心一击 1/5，倍率 ×4；否则 ×2）。
    // **两处的档位除数不同**：判定线是 `SINKOU/2048+1`、伤害式
    // 是 `SINKOU/1024+1`——不对称的既有行为，有意不统一。
    const strike =
      chara(yusya).dungeon.攻击力 * (Math.trunc(sinkou / 1024) + 1);
    const guard_line =
      chara(yusya).dungeon.攻击力 * (Math.trunc(sinkou / 2048) + 1);
    if (chara(seiei).dungeon.防御力 < guard_line) {
      const crit = rand(5) === 0; // RAND:5
      const guard = chara(seiei).dungeon.防御力; // TMP2_I
      chara(seiei).dungeon.防御力 = Math.trunc(chara(seiei).dungeon.防御力 / 2);
      const damage = strike - guard;
      if (crit) {
        era.print('迅猛的一击！');
      }
      era.print(
        `${chara_callname(yusya)}率领魔王军的攻击使${chara_nickname(seiei)}受到了${damage * (crit ? 4 : 2)}点伤害！`,
      );
      if ((era.get(`talent:${seiei}:251`) || 0) === 0) {
        // 无「忍术」时攻防也受损（÷100 向零截断）
        chara(seiei).dungeon.攻击力 -= Math.trunc(damage / 100);
      }
      if (chara(seiei).dungeon.攻击力 < 1) {
        chara(seiei).dungeon.攻击力 = 1;
      }
      chara(seiei).dungeon.体力 -= damage * (crit ? 4 : 2);
      chara(seiei).dungeon.气力 -= damage * (crit ? 4 : 2);
      await era.waitAnyKey(); // WAIT
    } else {
      era.print(
        `${chara_nickname(seiei)}承受着${chara_callname(yusya)}的攻击。`,
      );
      chara(seiei).dungeon.防御力 = Math.trunc(chara(seiei).dungeon.防御力 / 2);
    }

    // 精锐部队战斗的退场判定（领军勇者、精锐部队）：先判精锐部队的死线
    const first_check = await inv_death_check(yusya, seiei);
    if (first_check === 2) {
      // 魔王侧获得胜利
      const gained = Math.trunc(sinkou / 5);
      chara(yusya).dungeon.战斗经验 += gained;
      era.print(`${chara_callname(yusya)}获得了${gained}点经验值！`);
      await era.waitAnyKey();
      await seiei_cleanup(seiei);
      break;
    }
    if (first_check === 1) {
      await seiei_cleanup(seiei);
      return 1;
    }

    // 精鋭部隊の攻撃（伤害 ×5，防御侧先折成三分之二）
    if (chara(yusya).dungeon.防御力 < chara(seiei).dungeon.攻击力) {
      const guard = chara(yusya).dungeon.防御力;
      chara(yusya).dungeon.防御力 = Math.trunc(
        Math.trunc(chara(yusya).dungeon.防御力 / 3) * 2,
      );
      const damage = chara(seiei).dungeon.攻击力 - guard;
      era.print(
        `${chara_nickname(seiei)}发起进攻使${chara_callname(yusya)}率领的魔王军受到了${damage * 5}点伤害！`,
      );
      if ((era.get(`talent:${yusya}:251`) || 0) === 0) {
        chara(yusya).dungeon.攻击力 -= Math.trunc(damage / 100);
      }
      if (chara(yusya).dungeon.攻击力 < 1) {
        chara(yusya).dungeon.攻击力 = 1;
      }
      chara(yusya).dungeon.体力 -= damage * 5;
      chara(yusya).dungeon.气力 -= damage * 5;
      await era.waitAnyKey(); // WAIT
    } else {
      era.print(
        `${chara_callname(yusya)}率领的魔王军承受着${chara_nickname(seiei)}的攻击。`,
      );
      chara(yusya).dungeon.防御力 = Math.trunc(
        Math.trunc(chara(yusya).dungeon.防御力 / 3) * 2,
      );
    }

    const second_check = await inv_death_check(yusya, seiei);
    if (second_check === 2) {
      await seiei_cleanup(seiei);
      break;
    }
    if (second_check === 1) {
      await seiei_cleanup(seiei);
      return 1;
    }
    time_i += 1;
  }
  void area;
  return 0;
}

/**
 * 精锐部队退场（三处重复段）：`SEIEI_I =
 * CHARANUM - 1` 后 PARTY_CHAR_DEL → DELCHARA → NAME_RESET。扁平化（#21）
 * 下 `CHARANUM - 1` 不成立，直接用它的角色号（#487 的教训）。
 * @param {number} seiei 精锐部队的角色号（18 或 19）
 */
async function seiei_cleanup(seiei) {
  party_char_del(seiei);
  era.removeCharacter(seiei);
  name_reset();
}

/**
 * invasion_event_seiei：精英部队事件。
 *
 * 三分支共用的头部：FLAG:SINDO != 0（已征服）→ RETURN -1；否则按
 * 侵攻度打三档传闻文本——**三档的 INV_TYPE 条件不同**：首档
 * `FLAG:AREA == 0` 无 INV_TYPE 条件，后两档要求
 * `INV_TYPE != 1`，所以魔力路线只打首档、[0]/[2]/[3] 三路三档都可能打。
 * 打完 `SIF INV_TYPE != 2 → RETURN -1`：只有 [2] 路线进战斗体。
 *
 * @param {number} area 侵攻地区 FLAG 下标（81）
 * @param {number} sindo 征服标记 FLAG 下标（82）
 * @param {number} inv_type 出兵类别（0/1/2/3）
 * @param {{sinkou: number, yusya_i: number}} state 共享局部量
 * @param {(n: number) => number} [rand] RAND:N 随机源（RAND:FLAG:AREA 与
 *   RAND:2/RAND:5 的上界）
 * @returns {Promise<number>} -1 = 继续侵攻（非 [2] 路线恒此值）；0 = 战斗体
 *   走完（含「精锐部队没有出现」）；1 = 侵攻中止
 */
async function invasion_event_seiei(
  area,
  sindo,
  inv_type,
  state,
  rand = default_rand,
) {
  // SIF FLAG:SINDO != 0 → RETURN -1
  if ((era.get(`flag:${sindo}`) || 0) !== 0) {
    return -1;
  }
  const progress = era.get(`flag:${area}`) || 0; // FLAG:AREA
  // FLAG:AREA == 0：狂王组织精锐部队的传闻（PRINTFORMW → 等键）
  if (progress === 0) {
    era.drawLine();
    era.print('根据传闻狂王为了应对魔王军的入侵已开始组织起了精锐部队。');
    await era.waitAnyKey();
    era.drawLine();
  } else if (progress >= 1 && progress < 5000 && inv_type !== 1) {
    // 侵攻度 1-4999（后两档都带 FLAG:SINDO == 0，已由上面的早退
    // 保证；每条 PRINTFORMW 各自等键）
    era.drawLine();
    era.print('狂王组织的精锐部队似乎已经开始行动了。');
    await era.waitAnyKey();
    era.print('如果不尽快采取行动的话………');
    await era.waitAnyKey();
    era.drawLine();
  } else if (progress >= 1 && progress < 10000 && inv_type !== 1) {
    // 侵攻度 5000-9999
    era.drawLine();
    era.print(
      '根据斥候打探的消息，狂王的精锐部队似乎已经在前方的城镇中布下了防线。',
    );
    await era.waitAnyKey();
    era.print('而且精锐部队的真正目的就是要捕捉魔王麾下的勇者………');
    await era.waitAnyKey();
    era.drawLine();
  }
  // SIF INV_TYPE != 2 → RETURN -1
  if (inv_type !== 2) {
    return -1;
  }

  // IF FLAG:AREA >= 5000 && FLAG:SINDO == 0 && INV_TYPE == 2（纯 `&&` 链；
  // FLAG:SINDO == 0 已由上面的早退保证）
  if (progress >= 5000) {
    const roll = rand(progress); // LOCAL = RAND:FLAG:AREA
    if (roll > 2000) {
      return await seiei_battle(area, state, rand);
    }
    // 精锐部队并没有出现
    era.print('………');
    await era.waitAnyKey();
    era.print('……');
    await era.waitAnyKey();
    era.print('…');
    await era.waitAnyKey();
    era.print('传闻中的精锐部队并没有出现…………');
    await era.waitAnyKey();
  } else {
    // INV_TYPE == 2 但侵攻度还没到 5000：同一套「没有出现」
    era.print('………');
    await era.waitAnyKey();
    era.print('……');
    await era.waitAnyKey();
    era.print('…');
    await era.waitAnyKey();
    era.print('传闻中的精锐部队并没有出现…………');
    await era.waitAnyKey();
  }
  return 0;
}

/**
 * FORT 的五个地区表：地点、敌方部队、要塞名，以及
 * `LOCAL:3`（`TALENT:YUSYA_I:种族 == n`——决定潜入支的 100% 成功档）。
 * 未列出的 AREA 三串留空、`LOCAL:3` 保持 0（LOCAL 的初值）。
 */
const FORT_AREAS = {
  81: { place: '人间界', troop: '人类军队', fort: '城堡', race: 0 },
  86: { place: '精灵森林', troop: '精灵族战士', fort: '精灵城寨', race: 1 },
  88: { place: '龙之山脉', troop: '龙族战士', fort: '战争堡垒', race: 5 },
  90: { place: '天界', troop: '天界卫队', fort: '天使要塞', race: 6 },
  93: { place: '天神宫', troop: '十字军', fort: '天使要塞', race: 6 },
};

/**
 * invasion_event_fort：侵略中途事件（要塞）。
 *
 * 入口检查对 INV_TYPE == 2/3 恒放行、对 0 看 FLAG:SINDO、对 1 恒早退
 * （读法与依据见 #503 的 M10789）。行为体按 INV_TYPE 三支：0 固定走强攻、
 * 2 三选项（强攻/潜入/绕路）、3 两选项（偷偷潜入/绕路）。
 *
 * **`SINKOU` 按引用改写**（`#DIM REF SINKOU`）：强攻减员、潜入失败、
 * 绕路减员都直接改 `state.sinkou`，调用方读回后用于侵攻結果共通。
 *
 * @param {number} area 侵攻地区 FLAG 下标（81）
 * @param {number} sindo 征服标记 FLAG 下标（82）
 * @param {number} inv_type 出兵类别（0/2/3）
 * @param {{sinkou: number, yusya_i: number}} state 共享局部量
 * @param {(n: number) => number} [rand] RAND:N 随机源（各处 RAND:10）
 * @returns {Promise<number>} 0 = 继续侵攻；-1 = 检查早退（继续侵攻）；
 *   1 = 侵攻中止
 */
async function invasion_event_fort(
  area,
  sindo,
  inv_type,
  state,
  rand = default_rand,
) {
  // `SIF FLAG:SINDO || INV_TYPE != 0 && INV_TYPE != 2 && INV_TYPE != 3`
  // —— 旧引擎里 `&&` 与 `||` **同优先级、左结合**（operators.md 的优先级表
  // 把两者排在同一行；com-sex.js:1837 / train-message.js:251 同款读法），
  // 因此原式等价于 `((FLAG:SINDO || INV_TYPE != 0) && INV_TYPE != 2)
  // && INV_TYPE != 3`，而不是 C 式「&& 优先」的 `FLAG:SINDO || (...)`：
  // 2/3 两值恒不早退（已征服也进要塞事件），1 恒早退，0 才看 FLAG:SINDO。
  if (
    ((era.get(`flag:${sindo}`) || 0) !== 0 || inv_type !== 0) &&
    inv_type !== 2 &&
    inv_type !== 3
  ) {
    return -1;
  }

  const yusya = state.yusya_i;
  // 未列出的 AREA：`LOCAL:3` 保持初值 0（恒假）→ 这里用 -1 保证
  // `talent:314 === race` 永不成立（TALENT:314 是非负值），不能写 0——
  // 那会让种族 0（人类）在未知地区恒吃 100% 潜成功（#505 地区泛化时会生效）
  const info = FORT_AREAS[area] ?? {
    place: '',
    troop: '',
    fort: '',
    race: -1,
  };
  const native = (era.get(`talent:${yusya}:314`) || 0) === info.race; // LOCAL:3

  // 选项（PRINTFORML 的 `[n]` 改 printButton，引擎自动拼前缀）
  let choice; // L_CHOICE
  if (inv_type === 2) {
    era.print(`魔王军浩浩荡荡地向${info.place}进发着。`);
    era.print(
      `早有准备的${info.troop}在必经之路上建起了一座${info.fort}，集结了大量的${info.troop}。`,
    );
    era.print(
      `${info.fort}看起来防御坚固防备森严，于是${chara_nickname(yusya)}决定……`, // PRINTFORMW
    );
    await era.waitAnyKey();
    era.printButton('全军强攻', 1);
    era.printButton('亲自潜入', 2);
    era.printButton('绕路', 3);
    choice = await fort_choice([1, 2, 3]); // $INPUT_LOOP
  } else if (inv_type === 3) {
    era.print(
      `${chara_nickname(yusya)}向${info.place}进发着，却在必经之路上遇到了${info.troop}建起的一座${info.fort}。`,
    );
    era.print(
      `${info.fort}看起来防御坚固防备森严，于是${chara_nickname(yusya)}决定……`, // PRINTFORMW
    );
    await era.waitAnyKey();
    era.printButton('偷偷潜入', 1);
    era.printButton('绕路', 2);
    // `L_CHOICE = RESULT + 1`——选项号加一后与 [2] 路线共用下面的分支
    choice = (await fort_choice([1, 2])) + 1; // $INPUT_LOOP2
  } else {
    era.print(`魔王军浩浩荡荡地向${info.place}进发着。`);
    era.print(
      `早有准备的${info.troop}在必经之路上建起了一座${info.fort}，集结了大量的${info.troop}。`,
    );
    era.print(
      `${info.fort}看起来防御坚固防备森严，于是魔王军发起了强攻。`, // PRINTFORMW
    );
    await era.waitAnyKey();
    choice = 1;
  }

  era.drawLine();
  // [1] 全军强攻（RAND:10 三档：>= 6 成功 / >= 2 惨胜 / 其余 惨败）
  if (choice === 1) {
    const roll = rand(10);
    if (roll >= 6) {
      era.print(
        `魔王军向着${info.fort}发起了最为猛烈的进攻，在付出较小的代价后攻破了${info.fort}的一角。`,
      );
      era.print(
        `${info.fort}中的${info.troop}仓皇外逃，被${info.fort}外的魔王军尽数剿灭、`,
      );
      era.print(`获胜的魔王军高呼万岁，继续向${info.place}进发。`);
      era.print(''); // PRINTFORML（空行）
      fort_hero_reward(inv_type, state, 5); // EXP:SINKOU/5
      era.print('怪物数量减少了10%'); // （`\%` 是字面量百分号）
      state.sinkou = Math.trunc((state.sinkou * 9) / 10);
      await era.waitAnyKey(); // WAIT
      return 0;
    }
    if (roll >= 2) {
      era.print(`魔王军向着${info.fort}发起了最为猛烈的进攻。`);
      era.print(
        `${info.fort}的防御极其坚固，${info.troop}凭借着掩体不断地攻击，让魔王军损失惨重。`,
      );
      if (inv_type === 2) {
        era.print(
          `${chara_nickname(yusya)}不得不亲自上阵，这才逆转了局面，攻下了${info.fort}。`,
        );
      } else {
        era.print(`在付出巨大的代价后，魔王军才攻下了${info.fort}。`);
      }
      era.print(`侥幸获胜的魔王军继续向${info.place}进发。`);
      era.print('');
      if (inv_type === 2) {
        fort_hero_reward(inv_type, state, 5);
        chara(yusya).dungeon.体力 = Math.trunc(chara(yusya).dungeon.体力 / 2);
        era.print(`${chara_callname(yusya)}的体力减少了一半！`);
        // 注意：这里的 PRINTFORML 后没有 WAIT，等键由后面的 WAIT 承担
      }
      era.print('怪物数量减少了50%');
      state.sinkou = Math.trunc(state.sinkou / 2);
      await era.waitAnyKey(); // WAIT
      return 0;
    }
    era.print(`魔王军向着${info.fort}发起了最为猛烈的进攻。`);
    era.print(`${info.fort}的防御极其坚固，令魔王军久攻不下，陷入僵局。`);
    era.print(`打破僵局的是一支突然出现在魔王军背后的${info.troop}援军。`);
    era.print('腹背受敌的魔王军一触即溃，随即被里应外合的两支军队尽数歼灭。');
    if (inv_type === 2) {
      era.print(`率领魔王军的${chara_nickname(yusya)}孤身一人逃了回来。`);
      era.println(); // PRINTL
      chara(yusya).dungeon.体力 = Math.trunc(
        (chara(yusya).dungeon.体力 * 3) / 10,
      );
      era.print(`${chara_callname(yusya)}的体力减少了70%！`);
    } else {
      era.println();
    }
    era.print('侵攻中止。'); // PRINTFORMW
    await era.waitAnyKey();
    chara(yusya).invasion.状态 = 0; // CFLAG:YUSYA_I:1 = 0
    return 1;
  }

  // [2] 亲自潜入（INV_TYPE 2 与 3 两套结算）
  if (choice === 2 && inv_type === 2) {
    const roll = rand(10);
    // 天使/恶魔翼（TALENT:245）或精灵族（种族 6）/魔族（种族 8）→ 100%
    if (has_wing(yusya)) {
      era.print(
        `${chara_nickname(yusya)}趁着夜色从空中潜入了${info.fort}，在躲过多支巡逻队后终于打开了${info.fort}的大门。`,
      );
      era.print(
        `早已等待多时的魔王军迅速杀入了${info.fort}内，没有遇到顽强的抵抗便控制了整个${info.fort}。`,
      );
      era.print(
        `当天空出现第一缕阳光时，${info.fort}内已经只剩下了魔王军和魔王军的俘虏了。`,
      );
      era.print(`获胜的魔王军高呼万岁，继续向${info.place}进发。`);
      era.print('');
      fort_hero_reward(inv_type, state, 5);
      era_flag.meat_toilet_count += 5; // FLAG:83 += 5
      era.print('人间牧场肉便器数量+5。');
      await era.waitAnyKey(); // WAIT
      return 0;
    }
    if (roll >= 5 || native) {
      // 潜入成功 50%
      era.print(`${chara_nickname(yusya)}乔装打扮成功混进了${info.fort}里。`);
      era.print(
        `当天夜里，${chara_nickname(yusya)}杀死了大门的守卫，将等候多时的魔王军引入${info.fort}内。`,
      );
      era.print(`${info.fort}内的${info.troop}还没有组织起反抗便被消灭殆尽。`);
      era.print(`获胜的魔王军高呼万岁，继续向${info.place}进发。`);
      era.print('');
      fort_hero_reward(inv_type, state, 5);
      era_flag.meat_toilet_count += 5;
      era.print('人间牧场肉便器数量+5。');
      await era.waitAnyKey(); // WAIT
      return 0;
    }
    if (roll >= 2 || !captive_route()) {
      // 失败逃窜 30%
      era.print(
        `${chara_nickname(yusya)}乔装打扮试图混进${info.fort}里，但被大门的守卫识破。`,
      );
      era.print(`${chara_nickname(yusya)}杀出一条血路，勉强逃回了魔王军。`);
      era.print('魔王军不得已只好发动强攻，在鏖战后最终惨胜。');
      era.print(`侥幸获胜的魔王军，继续向${info.place}进发。`);
      era.print('');
      chara(yusya).dungeon.体力 = 1;
      era.print(`${chara_callname(yusya)}的体力归零`);
      state.sinkou = Math.trunc((state.sinkou * 7) / 10);
      era.print('怪物数量减少了30%');
      await era.waitAnyKey(); // WAIT
      return 0;
    }
    // 失败被捕 20%
    era.print(
      `${chara_nickname(yusya)}乔装打扮试图混进${info.fort}里，但却被大门的守卫识破。`,
    );
    era.print(
      `在一番激烈战斗后${chara_nickname(yusya)}还是被${info.troop}生擒。`,
    );
    era.print(`失去指挥官的魔王军随即被出城迎击的${info.troop}击溃。`);
    era.print('');
    era.print(`${chara_nickname(yusya)}被俘虏，侵攻中止。`); // PRINTFORMW
    await era.waitAnyKey();
    chara(yusya).invasion.状态 = 9;
    return 1;
  }
  if (choice === 2 && inv_type === 3) {
    const roll = rand(10);
    if (has_wing(yusya)) {
      era.print(
        `${chara_nickname(yusya)}趁着夜色从空中穿过了${info.fort}。`, // PRINTFORMW
      );
      await era.waitAnyKey();
      return 0;
    }
    if (roll >= 5 || native) {
      era.print(
        `${chara_nickname(yusya)}乔装打扮成功通过了${info.fort}。`, // PRINTFORMW
      );
      await era.waitAnyKey();
      return 0;
    }
    if (roll >= 2 || !captive_route()) {
      era.print(
        `${chara_nickname(yusya)}乔装打扮试图混进${info.fort}里，但被大门的守卫识破。`,
      );
      era.print(`${chara_nickname(yusya)}杀出一条血路，勉强逃了回去。`); // PRINTFORMW
      await era.waitAnyKey();
      // 两段之间是纯空白行（不产生输出），ere 侧不打空行
      chara(yusya).dungeon.体力 = 1;
      chara(yusya).invasion.状态 = 0;
      return 1;
    }
    era.print(
      `${chara_nickname(yusya)}乔装打扮试图混进${info.fort}里，但却被大门的守卫识破。`,
    );
    era.print(
      `在一番激烈战斗后${chara_nickname(yusya)}还是被${info.troop}生擒。`, // PRINTFORMW
    );
    await era.waitAnyKey();
    // 两段之间是纯空白行（不产生输出），ere 侧不打空行
    chara(yusya).invasion.状态 = 9;
    return 1;
  }

  // [3] 绕路（INV_TYPE == 2：RAND:10，九成平安 / 一成埋伏）
  if (choice === 3 && inv_type === 2) {
    const roll = rand(10);
    if (roll > 0) {
      era.print(
        `魔王军绕开${info.fort}向${info.place}进发，因为路途遥远地形复杂损失了一些人马。`,
      );
      era.println();
      state.sinkou = Math.trunc((state.sinkou * 9) / 10);
      era.print('怪物数量减少了10%'); // PRINTFORMW
      await era.waitAnyKey();
      return 0;
    }
    era.print(`魔王军绕开${info.fort}向${info.place}进发，但却遇到了埋伏。`);
    era.print(`在一番血战后，魔王军击退了伏军继续向${info.place}进发。`);
    era.println();
    state.sinkou = Math.trunc((state.sinkou * 5) / 10);
    era.print('怪物数量减少了50%'); // PRINTFORMW
    await era.waitAnyKey();
    return 0;
  }
  // [3] 绕路（INV_TYPE == 3）：RAND:10，九成平安无事（体力 ×9/10，直接
  // RETURN 0）/ 一成埋伏（RETURN 1），与怪物路线（INV_TYPE == 2）同构。
  if (choice === 3 && inv_type === 3) {
    if (rand(10) > 0) {
      era.print(
        `${chara_nickname(yusya)}绕开${info.fort}向${info.place}进发，因为路途遥远地形复杂耗费了一些体力。`,
      );
      chara(yusya).dungeon.体力 = Math.trunc(
        (chara(yusya).dungeon.体力 * 9) / 10,
      );
      return 0;
    }
    era.print(
      `${chara_nickname(yusya)}绕开${info.fort}向${info.place}进发，但却遇到了埋伏。`,
    );
    if (captive_route()) {
      era.print(
        `在一番激烈战斗后${chara_nickname(yusya)}还是被活捉了。`, // PRINTFORMW
      );
      await era.waitAnyKey();
      chara(yusya).invasion.状态 = 9;
    } else {
      era.print(
        `在一番激烈战斗后${chara_nickname(yusya)}终于逃了回来。`, // PRINTFORMW
      );
      await era.waitAnyKey();
      chara(yusya).invasion.状态 = 0;
    }
    return 1;
  }
  return 0;
}

/**
 * FORT [2]/[3] 路线的输入：只认给定选项号，其余重问（整屏重绘，见文件
 * 头）。选项已渲染成按钮，引擎白名单先一步挡下未渲染的值，故重问支在
 * 真引擎里不可达（与 page-intercept 的等级门同款处置，结构保留作防御）。
 * @param {number[]} allowed 合法选项号
 * @returns {Promise<number>} 选中的选项号
 */
async function fort_choice(allowed) {
  for (;;) {
    const result = await number_input();
    if (allowed.includes(result)) {
      return result;
    }
  }
}

/**
 * FORT [2] 路线的经验段（四处的同一形状）。
 * 只有 INV_TYPE == 2 给经验，且用的是**减员前**的 SINKOU。四处都是
 * `EXP:…` 接 `PRINTFORML`（不等键）——等键在各分支末尾的 WAIT，
 * 所以这里不 wait。
 * @param {number} inv_type 出兵类别
 * @param {{sinkou: number, yusya_i: number}} state 共享局部量
 * @param {number} divisor 除数（四处都是 SINKOU/5）
 */
function fort_hero_reward(inv_type, state, divisor) {
  if (inv_type !== 2) {
    return;
  }
  const gained = Math.trunc(state.sinkou / divisor);
  chara(state.yusya_i).dungeon.战斗经验 += gained;
  era.print(`${chara_callname(state.yusya_i)}获得了${gained}点经验值！`);
}

/**
 * 「带队奴隶有天使/恶魔翼」（FORT 与 CHALLENGE 同款的
 * `TALENT:恶魔翅膀 || TALENT:种族 == 6 || TALENT:种族 == 8`）。
 * 恶魔翅膀 = TALENT:245、种族 = TALENT:314（yml/Talent.yml）；种族 6 是**天使**、
 * 8 是魔族（对照 CHALLENGE 地区表的 `race` 列：天界/天神宫两组都是 6）。
 * @param {number} cid 角色 ID
 * @returns {boolean}
 */
function has_wing(cid) {
  const race = era.get(`talent:${cid}:314`) || 0;
  return (era.get(`talent:${cid}:245`) || 0) !== 0 || race === 6 || race === 8;
}

/**
 * CHALLENGE 的五个地区表：称呼、地点与「复现职业」
 * （`LOCAL:12`，开挂取胜时 `ADDCHARA LOCAL:12`）。
 *
 * AREA 81 的职业固定 9；其余四表是 `LOCAL:12 = RAND:2 ? a # b`——
 * **掷骰发生在选区时**（早于 `SIF EX_FLAG:95 & bit → RETURN -1`），所以
 * 职业要在取表时立刻定下：挪到使用处再掷会把 RAND:2 与随后的 DATALIST
 * 抽取对调（job 的 a = 真值支、b = 假值支）。
 */
const CHALLENGE_AREAS = {
  81: {
    place: '人间界',
    spot: '一座河边的桥',
    foe: '女骑士',
    leave: '骑上战马一骑绝尘离开了',
    skill: '剑术非常高超',
    race: -1,
    job: 9,
    bit: 1,
  },
  86: {
    place: '精灵森林',
    spot: '一条密林中的狭道',
    foe: '月之祭司',
    leave: '遁入密林之中消失了',
    skill: '箭术无比精准',
    race: 1,
    job: [12, 16],
    bit: 2,
  },
  88: {
    place: '龙之山脉',
    spot: '一座山谷间的吊桥',
    foe: '龙族巫女',
    leave: '吟唱了传送咒语凭空消失了',
    skill: '龙语魔法无比犀利',
    race: 5,
    job: [10, 14],
    bit: 4,
  },
  90: {
    place: '天界',
    spot: '一座天界的虹桥',
    foe: '女武神',
    leave: '振起洁白的羽翼飞走了',
    skill: '圣力极其雄厚',
    race: 6,
    job: [1, 5],
    bit: 8,
  },
  93: {
    place: '天神宫',
    spot: '一座天界的虹桥',
    foe: '十字军',
    leave: '振起洁白的羽翼飞走了',
    skill: '圣力极其雄厚',
    race: 6,
    job: [1, 5],
    bit: 16,
  },
};

/**
 * 人数上限的快照（CHALLENGE 的七分支，与 enter_enemy / get_enemy
 * 里的两段是同一段判定，三处各自保留一份）。命中任一分支时
 * `LOCAL = 0`——开挂取胜（要求 `LOCAL >= 2`）随之降级成开挂失败。
 * @returns {boolean} true = 人数已满
 */
function hero_cap_reached() {
  const charanum = era.getAddedCharacters().length;
  const f = (n) => era.get(`flag:${n}`) || 0;
  if (f(82) === 0 && charanum > 60) {
    return true;
  }
  if (f(87) === 0 && f(89) === 0 && f(91) === 0 && charanum > 65) {
    return true;
  }
  if (
    f(87) * f(89) === 0 &&
    f(89) * f(91) === 0 &&
    f(91) * f(87) === 0 &&
    charanum > 70
  ) {
    return true; // （原式三对乘积，加括号，无优先级歧义）
  }
  if ((f(87) === 0 || f(89) === 0 || f(91) === 0) && charanum > 75) {
    return true;
  }
  if (f(92) < 15 && charanum > 80) {
    return true;
  }
  if (f(94) === 0 && charanum > 90) {
    return true;
  }
  return charanum >= MAX_CHARANUM;
}

/**
 * invasion_event_challenge：侵略中途事件（被勇者叫阵单挑）。
 *
 * 入口检查是纯 `&&` 链，对 0/2/3 放行、对 1 早退（无优先级歧义）。
 * 地区的位域检查（`SIF EX_FLAG:95 & bit → RETURN -1`）保证每块地盘的
 * 「被叫阵」只发生一次；开挂取胜支把该位置起（`EX_FLAG:95 = LOCAL:20`）。
 *
 * `SINKOU` 按引用改写（`#DIM REF SINKOU`）：只有 `[3] 无视，全军进攻`
 * 的「损失一般」档会改成 ×4/5。
 *
 * @param {number} area 侵攻地区 FLAG 下标（81）
 * @param {number} sindo 征服标记 FLAG 下标（82）
 * @param {number} inv_type 出兵类别（0/2/3）
 * @param {{sinkou: number, yusya_i: number}} state 共享局部量
 * @param {(n: number) => number} [rand] RAND:N 随机源（RAND:2/4/10 的上界）
 * @returns {Promise<number>} 0 = 继续侵攻；-1 = 检查早退（继续侵攻）；
 *   1 = 侵攻中止
 */
async function invasion_event_challenge(
  area,
  sindo,
  inv_type,
  state,
  rand = default_rand,
) {
  // SIF INV_TYPE != 0 && INV_TYPE != 2 && INV_TYPE != 3 → RETURN -1
  if (inv_type !== 0 && inv_type !== 2 && inv_type !== 3) {
    return -1;
  }
  const yusya = state.yusya_i;
  const info = CHALLENGE_AREAS[area] ?? {
    place: '',
    spot: '',
    foe: '',
    leave: '',
    skill: '',
    race: 0,
    job: 0,
    bit: 0,
  };
  // `LOCAL:12 = RAND:2 ? a # b`——掷骰在选区时就发生
  const job = Array.isArray(info.job)
    ? rand(2) !== 0
      ? info.job[0]
      : info.job[1]
    : info.job;
  const kill_bits = (era_exflag.defeated_heroes_bits || 0) | info.bit; // LOCAL:20
  // 等四条 `SIF EX_FLAG:95 & bit → RETURN -1`（每块地盘只来一次）
  if (((era_exflag.defeated_heroes_bits || 0) & info.bit) !== 0) {
    return -1;
  }

  // 三条 INV_TYPE 各自的登场（PRINTDATA/PRINTDATAL 的随机抽取走 rand）
  let choice; // L_CHOICE
  if (inv_type === 2) {
    era.print(
      `魔王军浩浩荡荡地向${info.place}进发着，却在${info.spot}前停下了脚步。`,
    );
    era.print(`原来是一名${info.foe}在大军的前方挡住了道路。`);
    for (const line of printdata(rand, [
      [
        '『哎呀真是好多人啊，人家好紧张呢~』',
        '『快去叫亲爱的魔王大人出来，人家要和他比试比试呢』',
      ],
      ['『今天运气真是不错哦~』', '『叫魔王出来，他的脑袋是我的了！』'],
      [
        '『这就是魔王军啊，与其说是军队倒不如说是哪里冒出来的犯罪团伙呢~』',
        '『快去叫你们的魔王出来，就说有人来取他的性命了』',
      ],
      [
        '『咦？传闻中的魔王军呢』',
        '『听说你们的魔王很厉害，不知道能否有幸过两手呢』',
      ],
    ])) {
      era.print(line);
    }
    era.print(`毫无紧张感的${info.foe}这样说着。`);
    era.print(
      `面对${info.foe}的挑衅，${chara_nickname(yusya)}决定……`, // PRINTFORMW
    );
    await era.waitAnyKey();
    era.printButton('召唤魔王应战', 1);
    era.printButton('亲自上前处理', 2);
    era.printButton('无视，全军进攻', 3);
    choice = await fort_choice([1, 2, 3]); // $INPUT_LOOP
    if (choice === 1) {
      era.print(`魔王回应了${chara_nickname(yusya)}召唤前来迎战${info.foe}。`);
    } else if (choice === 2) {
      era.print(`${chara_nickname(yusya)}决定亲自迎战${info.foe}。`);
    } else {
      era.print(
        `在${chara_nickname(yusya)}一声令下，魔王军缓缓前进，展开了对${info.foe}战斗。`,
      );
    }
  } else if (inv_type === 3) {
    era.print(
      `${chara_nickname(yusya)}向${info.place}进发着，却在${info.spot}前被一名突然出现的${info.foe}拦下了脚步。`,
    );
    for (const line of printdata(rand, [
      [
        '『哎呀~是亲爱魔王大人的手下呢』',
        '『既然魔王大人不肯出来，人家只好和你比试比试了呢』',
      ],
      ['『今天运气真是不错哦~可怜的魔族，你的脑袋是我的了！』'],
      ['『闻到魔物的味道就过来了，看我发现了什么有趣的东西呢……有遗言么？』'],
      [
        '『咦？是魔王手下的那个谁呢』',
        '『既然魔王那么厉害，想必你也不简单吧。来过两手吧』',
      ],
    ])) {
      era.print(line);
    }
    // 这里是纯空白行，ere 侧不打空行
    await era.waitAnyKey(); // WAIT
    choice = 2;
  } else {
    era.print(
      `魔王军浩浩荡荡地向${info.place}进发着，却在${info.spot}前停下了脚步。`,
    );
    era.print(`原来是一名${info.foe}在大军的前方挡住了道路。`);
    for (const line of printdata(rand, [
      ['『哎呀真是好多人啊，人家好紧张呢~』'],
      ['『今天运气真是不错哦~可悲的魔族，你们的脑袋是我的了！』'],
      ['『啊~哪里冒出来的犯罪团伙呢~这就来取你们的性命了』'],
      ['『咦？传闻中的魔王军呢。既然撞上了就怪你们运气不佳好了』'],
    ])) {
      era.print(line);
    }
    era.print(`毫无紧张感的${info.foe}这样说着。`);
    // 两段之间是纯空白行（不产生输出），ere 侧不打空行
    choice = 3;
    era.print(
      `在意识到敌人只有一个人后，魔王军向敢于挑衅的${info.foe}发起了猛烈的进攻。`, // PRINTFORMW
    );
    await era.waitAnyKey();
  }

  // [1] 召唤魔王应战
  if (choice === 1) {
    if (era_flag.money >= 3000) {
      // 道具二选一（钱不够就直接落到堂堂正正）
      era.print('但对方看起来也不是省油的灯、未必能稳操胜券、');
      era.print('好在魔王身上携带了些一次性魔法道具、');
      era.print('虽然价格昂贵但威力巨大、');
      era.print('魔王考虑着是否要在决斗中使用这些道具。。。');
      era.printButton('使用氪金道具', 1);
      era.printButton('堂堂正正一决胜负', 2);
      choice = await fort_choice([1, 2]); // $INPUT_LOOP2
    } else {
      choice = 2;
    }
    const roll = rand(10);
    // 人数上限七分支：命中即 LOCAL = 0 → 开挂取胜不成立
    const local = hero_cap_reached() ? 0 : roll;
    // 开挂取胜
    if (choice === 1 && local >= 2) {
      era.print(`魔王和${info.foe}的战斗开始了。`);
      // 的 PRINTFORM 与 PRINTDATAL 的第一行同显示行（归并见文件头）
      const items = printdata(rand, [
        [
          `魔王趁${info.foe}不备，向${info.foe}扔出了高级泥沼卷轴。`,
          `${info.foe}陷入了泥沼中，动弹不得，被魔王抓住了。`,
        ],
        [
          `魔王趁${info.foe}不备，向${info.foe}扔出了强效麻痹药水。`,
          `药瓶正中的${info.foe}在药水的作用下动弹不得，被魔王抓住了。`,
        ],
        [
          `魔王趁${info.foe}不备，向${info.foe}祭起了邪能封印壶。`,
          `${info.foe}猝不及防被吸进了封印壶内，被魔王抓住了。`,
        ],
      ]);
      era.print(`在试探数合之后，${items[0]}`); // 首行
      for (const line of items.slice(1)) {
        era.print(line); // 同一 DATALIST 的后续行
      }
      era.print(''); // PRINTFORML（空行）
      era.print(`魔王军高呼魔王万岁，继续向${info.place}进发。`); // PRINTFORMW
      await era.waitAnyKey();
      // 生成一名对应种族职业的勇者
      era.addCharacter(job); // ADDCHARA LOCAL:12
      await add_chara_ex(job);
      await char_make(job, 0, info.race, rand); // CHARA_MAKE(…, LOCAL:10)
      chara(job).invasion.状态 = 0; // CFLAG:A:1 = 0
      era.print(`${chara_nickname(job)}被魔王抓住了。金钱-3000`); // PRINTFORMW
      await era.waitAnyKey();
      era_flag.money -= 3000;
      era_exflag.legit_money -= 3000;
      era_exflag.defeated_heroes_bits = kill_bits;
      era_exflag.prestige = era_exflag.prestige + 1;
      return 0;
    }
    // 开挂失败
    if (choice === 1) {
      era.print(`魔王和${info.foe}的战斗开始了。`);
      // 的 PRINTFORM 与 PRINTDATAL 的第一行同显示行（归并见文件头）
      const items = printdata(rand, [
        [`魔王趁${info.foe}不备，向${info.foe}扔出了高级泥沼卷轴。`],
        [`魔王趁${info.foe}不备，向${info.foe}扔出了强效麻痹药水。`],
        [`魔王趁${info.foe}不备，向${info.foe}祭起了邪能封印壶。`],
      ]);
      era.print(`在试探数合之后，${items[0]}`); // （三选一整行）
      era.print(`然而${info.foe}提前察觉了魔王的动作，躲闪掉了。`);
      era.print(`在鄙夷地看了魔王一眼后，${info.foe}${info.leave}。`);
      era.print(
        `虽然被人鄙视了，但腼着脸的魔王命令魔王军继续向${info.place}前进。`,
      );
      era.print('');
      era.print('金钱-3000。'); // PRINTFORMW
      await era.waitAnyKey();
      era_flag.money -= 3000;
      era_exflag.legit_money -= 3000;
      return 0;
    }
    // 不开挂取胜
    if (local < 2) {
      era.print(`魔王和${info.foe}的战斗开始了、`);
      era.print(`尽管${info.foe}的${info.skill}、`);
      era.print('但还是敌不过魔王的邪恶魔法、');
      era.print('很快就成为了一具尸体。');
      era.print(`魔王军高呼魔王万岁、继续向${info.place}进发。`);
      era.print('');
      era.print('魔王魔力减少50%、魔王经验+500'); // PRINTFORMW
      await era.waitAnyKey();
      chara(0).dungeon.气力 = Math.trunc(chara(0).dungeon.气力 / 2); // BASE:MASTER:1
      chara(yusya).dungeon.战斗经验 += 500; // EXP:YUSYA_I:80
      return 0;
    }
    // 不开挂失败
    era.print(`魔王和${info.foe}的战斗开始了、`);
    era.print(`${info.foe}的${info.skill}、`);
    era.print('魔王左支右绌、招架不住、');
    era.print(`被${info.skill}抓住空隙、达成了重伤。`);
    era.print('魔王军士气动摇、救下昏迷的魔王匆匆逃回魔王城。');
    era.print('');
    era.print('魔王体力魔力清空、侵攻中止'); // PRINTFORMW
    await era.waitAnyKey();
    chara(0).dungeon.体力 = 0; // BASE:MASTER:0
    chara(0).dungeon.气力 = 0; // BASE:MASTER:1
    return 1;
  }

  // [2] 亲自上前处理
  if (choice === 2) {
    const roll = rand(10);
    if (roll < 2) {
      // 奴隶取胜 20%
      era.print(`${chara_nickname(yusya)}与${info.foe}开始了战斗。`);
      era.print(
        `虽然${info.foe}${info.skill}，但却被${chara_nickname(yusya)}抓住机会打伤了。`,
      );
      era.print(`${info.foe}心有不甘地${info.leave}。`);
      era.print(
        inv_type === 2
          ? `魔王军高万岁，继续向${info.place}进发。`
          : `${chara_nickname(yusya)}继续向${info.place}进发。`,
      );
      era.print('');
      era.print(`${chara_nickname(yusya)}经验+500，体力-50%`); // PRINTFORMW
      await era.waitAnyKey();
      chara(yusya).dungeon.战斗经验 += 500;
      chara(yusya).dungeon.体力 = Math.trunc(chara(yusya).dungeon.体力 / 2);
      return 0;
    }
    if (roll < 6) {
      // 奴隶不分胜负 40%
      era.print(`${chara_nickname(yusya)}与${info.foe}开始了战斗。`);
      era.print(
        `虽然${info.foe}${info.skill}，但${chara_nickname(yusya)}也不遑多让。`,
      );
      era.print(`在大战几百回合之后，${info.foe}心有不甘地${info.leave}。`);
      // 两段之间是纯空白行（不产生输出），ere 侧不打空行
      era.print(
        inv_type === 2
          ? `魔王军高呼万岁，继续向${info.place}进发。`
          : `${chara_nickname(yusya)}继续向${info.place}进发。`,
      );
      era.print('');
      era.print(`${chara_nickname(yusya)}体力-90%`); // PRINTFORMW
      await era.waitAnyKey();
      chara(yusya).dungeon.体力 = Math.trunc(chara(yusya).dungeon.体力 / 10);
      return 0;
    }
    // 奴隶失败 40%
    era.print(`${chara_nickname(yusya)}与${info.foe}激烈交战起来。`);
    era.print(
      `${info.foe}的${info.skill}，没过多久，${chara_nickname(yusya)}就被${info.foe}打晕了过去。`,
    );
    era.print(`${info.foe}轻蔑的一笑，${info.leave}。`);
    if (inv_type === 2) {
      era.print('失去指挥官的魔王军只好撤退了。');
    } else if (captive_route() && (era.get(`flag:${sindo}`) || 0) === 0) {
      // `(FLAG:5 & 128) && !FLAG:SINDO`——纯 `&&` 链，无优先级歧义
      era.print(`晕过去的${chara_nickname(yusya)}成为了狂王的俘虏。`);
      chara(yusya).invasion.状态 = 9;
    } else {
      era.print(
        `不知道过了多久后才苏醒过来的${chara_nickname(yusya)}原路返回了。`,
      );
      chara(yusya).invasion.状态 = 0;
    }
    return 1;
  }

  // [3] 无视，全军进攻（RAND:2：真值 = 撤退）
  if (rand(2) !== 0) {
    era.print('然而由于地形狭窄魔王军的数量优势无法发挥、');
    era.print(`并且${info.foe}的${info.skill}、`);
    era.print('在损失了大批魔物之后、');
    era.print(`${info.foe}轻蔑的一笑、${info.leave}。`);
    era.print('魔王军元气大伤只好撤退了。');
    era.print('');
    era.print('侵攻中止。'); // PRINTFORMW
    await era.waitAnyKey();
    return 1;
  }
  era.print('然而由于地形狭窄魔王军的数量优势无法发挥、');
  era.print(`并且${info.foe}的${info.skill}、`);
  era.print('导致损失了不少魔物、');
  era.print(`最后${info.foe}体力不支、${info.leave}。`);
  era.print(`付出了不少代价的魔王军、继续向${info.place}进发。`);
  era.print('');
  era.print('魔物数量-20%。'); // PRINTFORMW
  await era.waitAnyKey();
  state.sinkou = Math.trunc((state.sinkou * 4) / 5);
  return 0;
}

/**
 * PRINTDATA / PRINTDATAL 的随机抽取（等概率选中一组，逐行返回）。
 *
 * PRINTDATA 与 PRINTDATAL 各含若干
 * DANTA/DATALIST/DATAFORM 块，引擎「等概率随机选择一个显示」——一次
 * `RAND:块数`。ere 侧无全局 RAND 序列（#117 决议），改用注入的 rand，
 * 上界 = 块数（两种命令同款）。
 *
 * @param {(n: number) => number} rand 随机源
 * @param {string[][]} blocks 候选块（每块若干行）
 * @returns {string[]} 选中块的行
 */
function printdata(rand, blocks) {
  return blocks[rand(blocks.length)];
}

/** medal_bonus 的十一档补正（降序 IF 链：命中即返，不再往下判） */
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
 * medal_bonus：勋章补正（EXP 第 81 位分档）。
 *
 * 十一档降序判定，命中即打印角色呼名 +「的勋章补正」+ 一个全角
 * 空格 + `x1.xx`（U+3000 对齐）并等键，返回 100-160 的百分比。未达首档
 * （≤5 枚）返回 100 且不打任何输出。
 *
 * 实参 cid 是角色 ID：缺省调用传 0（魔王）；[3] 路线传勇者号（#503 接
 * 真），[2] 路线传领军勇者。
 *
 * @param {number} [cid] 角色 ID（EXP 与 CALLNAME 的下标）
 * @returns {Promise<number>} 补正百分比（100-160）
 */
async function medal_bonus(cid = 0) {
  const medals = chara(cid).event.勋章经验; // EXP:cid:81
  const tier = MEDAL_TIERS.find((t) => medals > t.over);
  if (tier === undefined) {
    return 100; // LOCAL = 100（无补正档）
  }
  // 等：%CALLNAME:ARG% 取自呼び名（callname:cid:-2）。全角空格不能进
  // 模板串（no-irregular-whitespace），按既有先例拼普通字符串字面量
  era.print(
    chara_nickname(cid) + '的勋章补正　x' + (tier.bonus / 100).toFixed(2),
  );
  await era.waitAnyKey(); // PRINTFORMW 的 WAIT
  return tier.bonus;
}

/**
 * sengen_video_bonus：投放量的随机加成。
 *
 * RESULT 是**按引用回传**的实参（`TIMES RESULT, …` 直接改写调用方的
 * RESULT），ere 侧改成返回值由调用方接。MODE 0（普通）先跳 `$MODE_0`
 * 段，只掷两枚；MODE 1（奸商）先掷三枚加成再落同一段——
 * **判定顺序即 RAND 消费顺序，不可交换**。
 * MODE 1 只会变大（`RESULT <= M → RESULT = M` 保底），
 * MODE 0 可能缩水到 0（×0.80 截断），调用方据此走「投放失败」分支。
 *
 * @param {number} result 投放数（RESULT 的传入值）
 * @param {number} [mode] 0 = 普通，1 = 奸商（MODE 的默认值 0）
 * @param {(n: number) => number} [rand] 随机源（RAND:2/3/4 的上界）
 * @returns {number} 加成后的投放数（回写的 RESULT）
 */
function sengen_video_bonus(result, mode = 0, rand = default_rand) {
  const base = result; // M = RESULT
  let placed = result;
  if (mode !== 0) {
    // 奸商加成段（MODE == 0 时被跳过）
    placed = times(placed, 1.1);
    if (rand(2) === 0) placed = times(placed, 1.2);
    if (rand(3) === 0) placed = times(placed, 1.2);
    if (rand(4) === 0) placed = times(placed, 1.2);
  }
  // $MODE_0 段，两种 MODE 共用
  if (rand(2) === 0) placed = times(placed, 1.2);
  if (rand(3) === 0) placed = times(placed, 0.8);
  // 提示与保底（四条 SIF 的先后即输出次序）
  if (placed > base && mode === 1) {
    era.print('奸商们制作更多的版本提升了投放效果。');
  }
  if (mode === 1 && placed <= base) {
    placed = base;
  }
  if (placed > base && mode === 0) {
    era.print('在投放过程中似乎传出了不同的版本，投放效果提升了。');
  }
  if (placed < base) {
    era.print('似乎有些水晶球投放不是太成功。');
  }
  return placed;
}

/**
 * sengen_video：水晶球投放菜单（post_conquest_menu 的 [1000]，进入后
 * RETURN 0）。
 *
 * 四档操作：投放、雇奸商代理投放（付 5000G/枚 或 1 枚勋章）、花钱增强
 * 流行效果、花钱延长流行时间；[999] 退出。
 *
 * 循环写法沿用文件头的既有取舍：回主菜单重画整屏、子画面只重问不重画；
 * 选项 `PRINTL [n] …` 改 printButton（引擎自动拼 `[n] `，正文不得自带前缀，
 * PR #30）；`{值,N}` 走 pad_number。
 *
 * 两处行为在此登记：
 *   - 犒赏段的两条按钮渲染条件（`(M*5000) < MONEY`、`M < EXP:0:81`）与
 *     接受条件同式，但支付发生在**加成之后**、判断条件用的是 `M`（= 投入数）：
 *     `M*5000 == MONEY` 或 `M == 勋章数` 时按钮不渲染，而引擎白名单会拒收
 *     未渲染的 [1]/[2]，玩家只能重问；
 *   - 效果增强与时长延长在随机段之后各有一道封顶（×2 / +5）与一道保底
 *     （时长的 `(9013 - M) < 1 → M + 1`，即最小也涨 1 天）。
 *
 * 三处由引擎行为带出的说明（都不是行为偏离）：
 *   - 六处数值读数走 number_input()：空输入与非数字归一到 0，见该函数的
 *     JSDoc（引擎侧空输入会被重问掉，游戏层看不到空值）；
 *   - 菜单每轮至少打印 `[999]`，所以 `STOCK == 0 && RESULT != 999` 与落尾
 *     的空 ELSE 在真引擎里都不可达——白名单外的手工键入送不到游戏层，两
 *     支都按原样保留；
 *   - 顶栏的 `\t\t` 与前导空格是既有的对齐写法（同 page-chara-shop.js 的
 *     `\t\t` 先例）；引擎输出走 HTML 会折叠连续空白，列对齐在实机上不成
 *     立，这是全项目共有的一条表现层差异。
 *
 * @param {(n: number) => number} [rand] 随机源（增强段的 RAND:2/5 与
 *   SENGEN_VIDEO_BONUS 的上界）
 * @returns {Promise<0>} 两条出口都 RETURN 0
 */
async function sengen_video(rand = default_rand) {
  // $INPUT_LOOP（画在循环头：GOTO INPUT_LOOP 即重画）
  menu: for (;;) {
    const stock =
      era_exflag.crystal_ball_stock - era_exflag.crystal_ball_deployed;
    era.drawLine();
    // 可用于投放的水晶球{STOCK,3}部\t\t已投放{EX_FLAG:9011,3}部
    era.print(
      `可用于投放的水晶球${pad_number(stock, 3)}部\t\t已投放${pad_number(
        era_exflag.crystal_ball_deployed,
        3,
      )}部`,
    );
    // 两者都非零才显示流行中的数量与剩余天数
    if (era_exflag.crystal_ball_popularity && era_exflag.crystal_ball_expire) {
      era.print(
        `${NBSP.repeat(8)}正流行的有${pad_number(
          era_exflag.crystal_ball_popularity,
          3,
        )}部\t\t${pad_number(era_exflag.crystal_ball_expire, 2)}天后将过时`,
      );
    } else {
      era.print(' 目前没有投放中的水晶球');
    }
    era.drawLine();
    if (stock > 0) {
      era.printButton('投放水晶球', 1);
      era.printButton('派奸商投放水晶球', 2);
      era.printButton('增强流行效果', 3);
      era.printButton('延长流行时间', 4);
    } else {
      era.print('当前没有可以用于投放的水晶球');
    }
    era.drawLine();
    era.printButton('离开', 999);

    const result = await number_input();
    if (stock === 0 && result !== 999) {
      continue; // （引擎白名单先一步拒收未渲染的 [1]-[4]）
    }

    if (result === 1) {
      // 投放
      era.drawLine();
      era.print('通过投放拍摄的影像，激起反抗魔王的决心。');
      era.drawLine();
      era.print('请输入要投放的数量');
      // $INPUT_LOOP_TMP0（0 = 回菜单，超量 = 只重问）
      let count;
      for (;;) {
        count = await number_input();
        if (count === 0) {
          continue menu; // GOTO INPUT_LOOP
        }
        if (count > stock) {
          era.print('超出数量，请重新输入');
          continue; // GOTO INPUT_LOOP_TMP0
        }
        break;
      }
      era_exflag.crystal_ball_deployed += count; // EX_FLAG:9011 += RESULT
      // sengen_video_bonus 的返回值即回写后的投放数
      const placed = sengen_video_bonus(count, 0, rand);
      if (placed >= 1) {
        era.print(`成功投放${placed}部水晶球`);
        await era.waitAnyKey(); // PRINTFORMW 的 WAIT
        era_exflag.crystal_ball_popularity += placed;
        era_exflag.crystal_ball_expire += placed;
      } else {
        era.print('投放，似乎失败了。');
        await era.waitAnyKey(); // PRINTFORMW 的 WAIT
      }
      continue; // GOTO INPUT_LOOP
    }

    if (result === 2) {
      // 奸商代理投放
      era.drawLine();
      era.print('通过奸商代理投放拍摄的影像，或许更能激起反抗魔王的决心。');
      era.print('但需要收取代理酬劳，每部5000G或是1枚勋章。');
      era.drawLine();
      era.print('请输入要投放的数量');
      // $INPUT_LOOP_TMP1
      let count;
      for (;;) {
        count = await number_input();
        if (count === 0) {
          continue menu; // GOTO INPUT_LOOP
        }
        if (count > stock) {
          era.print('超出可投放数量，请重新输入');
          continue; // GOTO INPUT_LOOP_TMP1
        }
        // 两种酬劳都付不起：重问
        if (count > chara(0).event.勋章经验 && count * 5000 > era_flag.money) {
          era.print('没有足够的奖赏来打动奸商');
          continue; // GOTO INPUT_LOOP_TMP1
        }
        break;
      }
      era_exflag.crystal_ball_deployed += count; // EX_FLAG:9011 += RESULT
      // 奸商模式的 sengen_video_bonus；犒赏段消费的
      // M 就是调用前的投入数（M 是全局量，赋值后一直留到调用方）
      const base = count;
      const placed = sengen_video_bonus(count, 1, rand);
      if (placed >= 1) {
        era.print(`成功投放${placed}部水晶球`);
        await era.waitAnyKey(); // PRINTFORMW 的 WAIT
        era_exflag.crystal_ball_popularity += placed;
        era_exflag.crystal_ball_expire += placed;
        if (base * 5000 < era_flag.money) {
          era.printButton('犒赏金币', 1);
        }
        if (base < chara(0).event.勋章经验) {
          era.printButton('犒赏勋章', 2);
        }
        // $INPUT_LOOP_TMP2（无效输入重问，见函数 JSDoc 的缺陷说明）
        for (;;) {
          const pay = await number_input();
          if (pay === 1 && base * 5000 < era_flag.money) {
            era.print(`犒赏了奸商${base * 5000}G`);
            era_flag.money -= base * 5000; // MONEY -= (M * 5000)
            era_exflag.legit_money -= base * 5000; // EX_FLAG:4444 -=
            break;
          }
          if (pay === 2 && base < chara(0).event.勋章经验) {
            era.print(`犒赏了奸商${base}枚勋章`);
            chara(0).event.勋章经验 -= base; // EXP:0:81 -= M
            break;
          }
          // ELSE → GOTO INPUT_LOOP_TMP2
        }
      } else {
        era.print('投放，似乎失败了。');
        await era.waitAnyKey(); // PRINTFORMW 的 WAIT
      }
      continue; // GOTO INPUT_LOOP
    }

    if (result === 3) {
      // 增强流行效果
      era.drawLine();
      era.print('通过奸商代理投放拍摄的影像，增强投放的效果。');
      era.print('将收取50000G或是5枚勋章。');
      era.drawLine();
      era.print('请选择要支付方式');
      if (era_flag.money > 50000) {
        era.printButton('支付金币', 1);
      }
      if (chara(0).event.勋章经验 > 5) {
        era.printButton('支付勋章', 2);
      }
      era.printButton('离开', 999);
      // $INPUT_LOOP_TMP3
      for (;;) {
        const pay = await number_input();
        if (pay === 1 && era_flag.money > 50000) {
          era.print('犒赏了奸商50000G');
          era_flag.money -= 50000;
          era_exflag.legit_money -= 50000;
          break;
        }
        if (pay === 2 && chara(0).event.勋章经验 > 5) {
          era.print('犒赏了奸商5枚勋章');
          chara(0).event.勋章经验 -= 5;
          break;
        }
        if (pay === 999) {
          continue menu; // GOTO INPUT_LOOP
        }
        // ELSE → GOTO INPUT_LOOP_TMP3
      }
      // ×1.20，1/5 再 ×1.60，1/2 再 ×1.20，封顶 ×2
      const before = era_exflag.crystal_ball_popularity; // M = EX_FLAG:9012
      let grown = times(before, 1.2); // TIMES EX_FLAG:9012, 1.20
      if (rand(5) === 0) grown = times(grown, 1.6);
      if (rand(2) === 0) grown = times(grown, 1.2);
      if (grown > before * 2) grown = before * 2;
      era_exflag.crystal_ball_popularity = grown;
      era.print('因为剪辑出了更多的版本，投放效果增强了');
      continue; // GOTO INPUT_LOOP
    }

    if (result === 4) {
      // 延长流行时间
      era.drawLine();
      era.print('通过增加投放量延长流行时间。');
      era.print('将收取50000G。');
      era.drawLine();
      if (era_flag.money > 50000) {
        era.printButton('支付', 1);
      }
      era.printButton('算了', 999);
      // $INPUT_LOOP_TMP4
      for (;;) {
        const pay = await number_input();
        if (pay === 1 && era_flag.money > 50000) {
          era.print('支付了50000G');
          era_flag.money -= 50000;
          era_exflag.legit_money -= 50000;
          break;
        }
        if (pay === 999) {
          continue menu; // GOTO INPUT_LOOP
        }
        // ELSE → GOTO INPUT_LOOP_TMP4
      }
      // ×1.20，1/5 再 ×1.60，1/2 再 ×1.20，封顶 +5、保底 +1
      const before = era_exflag.crystal_ball_expire; // M = EX_FLAG:9013
      let grown = times(before, 1.2); // TIMES EX_FLAG:9013, 1.20
      if (rand(5) === 0) grown = times(grown, 1.6);
      if (rand(2) === 0) grown = times(grown, 1.2);
      if (grown > before + 5) grown = before + 5;
      if (grown - before < 1) grown = before + 1;
      era_exflag.crystal_ball_expire = grown;
      era.print('流行时间延长了');
      continue; // GOTO INPUT_LOOP
    }

    if (result === 999) {
      return 0; // （[999] 的 RETURN 0 与紧随其后落尾的空 ELSE 同值）
    }
    // 其余值落在空 ELSE 上：落尾即隐式 RETURN 0，同样退出菜单。
    // 真引擎里同样不可达（菜单每轮都打印 [999]，白名单外的手工键入送不到
    // 游戏层），两支都按原结构保留
    return 0;
  }
}

/**
 * @invasion_check：结局判定（#118 本体）。
 *
 * 四组 ELSEIF（顺序照旧，命中一组即止）：各领域侵攻度满 10000 且未征服
 * → 对应结局演出 + EX_FLAG:99 += 10 + PRINTL 声望+10。演出本体全部在
 * ere/event/event-ending.js（`ending_1` / `ending_3` / `ending_4` /
 * `ending_5`，都是真身）。
 *
 * 四组的可达性随 #505 变化：人间界组是阶段 1 的贯通终点；精灵/龙/天界
 * 三组自 #505 起可达——地区续接开出了 FLAG:86/88/90 的写入路径
 * （`add_region_progress`，出兵结算），把某个领域顶到 10000 且对应征服
 * 标记仍为 0 就会触发（三组的标记由各自 ENDING_x 置 1）。#118 时写的
 * 「窄路径不可达（对应无写入点）」对这三组已失效。
 *
 * 天神宫不在检查之列：判断条件读的 EX_FLAG:101 没有写点（侵攻度累加在
 * FLAG:101），那组条件永不成立，是死分支；END10_55 演出本体保留在
 * event-ending.js（直驱测试覆盖），没有分派入口。
 *
 * 「结算尾 → invasion_check → ENDING_x」这条链有三条用例守着：人间界的
 * ENDING_1 由 test/page-invasion.test.js 的既有用例（窄路径跨 10000）覆盖，
 * 精灵组由「[1] 魔力结果段的已征服封顶」用例的第三条世界覆盖（地区续接把
 * FLAG:86 顶到 10000 → ENDING_3 + CHAR_GIFT 收下圣女），演出本体另有
 * test/event-ending.test.js 的表驱动用例。
 *
 * @returns {Promise<void>}
 */
async function invasion_check() {
  // 人间界：FLAG:81 >= 10000 && FLAG:82 == 0 → ENDING_1
  if (
    era_flag.human_realm_invasion >= 10000 &&
    era_flag.human_realm_fallen === 0
  ) {
    // QUIT 是 throw 型（#148，引擎 quit() 抛 Error("quit")）：选 [1] 退出
    // 时异常在 ending_1 内部炸穿，下面两行不可达——QUIT 之后的收尾同样
    // 同样不可达，靠的也是异常炸穿而非哨兵短路（旧写法 ended !== 1 是夹具
    // 降格期发明的机制，#148 拆除；真机上该判断唯一可达的出口只有「正常
    // 返回 0」——见 event-ending.js 的 JSDoc）。调用链上任何一层都不得
    // try/catch 吞掉这个异常，夹具同款 throw 由测试钉住
    await ending_1();
    era_exflag.prestige = era_exflag.prestige + 10; // EX_FLAG:99 += 10
    era.print('声望+10'); // PRINTL
    return;
  }
  // 精灵领域：FLAG:86 >= 10000 && FLAG:87 == 0 → ENDING_3
  if (
    era_flag.elf_realm_invasion >= 10000 &&
    era_flag.elf_realm_conquered === 0
  ) {
    await ending_3();
    era_exflag.prestige = era_exflag.prestige + 10;
    era.print('声望+10'); // PRINTL
    return;
  }
  // 龙之山脉：FLAG:88 >= 10000 && FLAG:89 == 0 → ENDING_4
  if (
    era_flag.dragon_realm_invasion >= 10000 &&
    era_flag.dragon_realm_conquered === 0
  ) {
    await ending_4();
    era_exflag.prestige = era_exflag.prestige + 10;
    era.print('声望+10'); // PRINTL
    return;
  }
  // 天界：FLAG:90 >= 10000 && FLAG:91 == 0 → ENDING_5
  if (era_flag.heaven_invasion >= 10000 && era_flag.heaven_conquered === 0) {
    await ending_5();
    era_exflag.prestige = era_exflag.prestige + 10;
    era.print('声望+10'); // PRINTL
    return;
  }
}

/**
 * 威望修正（魔力分支内的一份；怪物分支同构，两处共用本函数，#503 起
 * [0] 也走这里）。五档；0-20 档侵攻失败
 * （早退，返回 true 表示已 RETURN），21-40 档的提示是 PRINTW
 * （`PRINTW 侵攻战斗力减少`）——**要等键**，其余三档是 PRINTl/PRINTL（不等键）。
 * 等键使本函数变成 async（#503 审查发现：原先两行打印后直接返回，#117 起的
 * 存量偏差，[0] 也走这条档位后一并修正）。
 *
 * @param {number} sinkou 档前侵攻点
 * @returns {Promise<{sinkou: number, failed: boolean}>} 档后侵攻点 / 是否失败早退
 */
async function apply_prestige_tier(sinkou) {
  const prestige = era_exflag.prestige; // EX_FLAG:99 威望
  if (prestige <= 20 && prestige >= 0) {
    // 岌岌可危：SINKOU = 0，PRINTW 侵攻失败，RETURN 1
    era.print('威望值是【岌岌可危】');
    return { sinkou: 0, failed: true };
  }
  if (prestige <= 40 && prestige > 20) {
    // 动荡不安：÷4（PRINTW 的等键落在「侵攻战斗力减少」之后）
    era.print('威望值是【动荡不安】');
    era.print('侵攻战斗力减少');
    await era.waitAnyKey();
    return { sinkou: Math.floor(sinkou / 4), failed: false };
  }
  if (prestige <= 60 && prestige > 40) {
    // 略受质疑：×(100 + (p-60)*2) / 100（p-60 为负，打折）
    era.print('威望值是【略受质疑】');
    return {
      sinkou: Math.floor((sinkou * (100 + (prestige - 60) * 2)) / 100),
      failed: false,
    };
  }
  if (prestige <= 80 && prestige > 60) {
    // 相安无事：无修正
    era.print('威望值是【相安无事】');
    return { sinkou, failed: false };
  }
  if (prestige <= 100 && prestige > 80) {
    // 广受爱戴：×(100 + (p-80)) / 100（加成）
    era.print('威望值是【广受爱戴】');
    return {
      sinkou: Math.floor((sinkou * (100 + (prestige - 80))) / 100),
      failed: false,
    };
  }
  // 威望 < 0 或 > 100：无匹配档，不作修正
  return { sinkou, failed: false };
}

/**
 * invasion：侵略画面入口，按 FLAG:82 分派。
 *
 * 返回 0 = 取消（不消耗回合，回主菜单）；返回 1 = 回合已耗（调用方
 * page-shop 的 [109] 分支据此 BEGIN TURNEND）。
 *
 * 外层 `for (;;)` 承载 RESTART：菜单与其下各层
 * 把 RESTART 信号原样返回，这里重走入口分派——与「回到函数开头重新执行」
 * 等价（RESTART 常量的说明见上）。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（透传到出兵路线）
 * @returns {Promise<number>} 0 / 1
 */
async function invasion(rand = default_rand) {
  for (;;) {
    const result =
      era_flag.human_realm_fallen !== 0
        ? await post_conquest_menu(rand) // IF FLAG:82：地上征服后菜单（#468）
        : await start_campaign(rand); // ELSE：目标区域默认人间界
    if (result !== RESTART) {
      return result;
    }
  }
}

/**
 * post_conquest_menu：地上征服后的地区选择菜单（#468）。
 *
 * 五条状态行（人间界固定「已征服」；精灵/龙之山/天界随各自 FLAG:87/89/91
 * 征服标记切换标签；天神宫随 route_33 开窗或 shrine_stage >= 4 切换，两
 * 条件都不满足时不渲染；圣灵骑士堡垒没有状态行，仅按钮文案随
 * FLAG:92 == 15 切换）+ 六个可选分支（[0] 与 [1]/[2]/[3]/[5] 都转
 * start_campaign()，区别只在地区实参——[1]/[2]/[3]/[5] 自 #505 起是真身；
 * [4] 转 arcana_fort() 真身，#470）+ [9] campaign_menu() + [999] 退出 +
 * [1000] sengen_video() + 已删除的 [1001] 分支（随 #638 去掉，
 * 键入 1001 落到拒收支——见文件头）。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（转 start_campaign）
 * @returns {Promise<number|typeof RESTART>} 0 / 1；RESTART = 出兵路线里
 *   的 RESTART，由 invasion() 的外层循环重走入口分派
 */
async function post_conquest_menu(rand = default_rand) {
  // 五条状态行（BARSTR 偏离说明见文件头；圣灵骑士堡垒没有状态行，
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
  // route_33 的开窗区间（501-539 与 541-559，540 是区间里的空档）。窗口
  // 开着时 [5] 可点；派发对一切 route_33 > 500 放行（含 540 空档与 ≥560），
  const route_33_open =
    (era_exflag.route_33 >= 501 && era_exflag.route_33 < 540) ||
    (era_exflag.route_33 >= 541 && era_exflag.route_33 < 560);
  if (route_33_open) {
    print_progress_line('天神宫侵攻度', era.get('flag:101') || 0, 10000);
  } else if (era_exflag.shrine_stage >= 4) {
    print_progress_line(
      '淫乱意志的神宫侵攻度',
      era.get('flag:101') || 0,
      10000,
    );
  }
  era.drawLine();
  era.print('地面上已被你征服了，你指挥着你的军队准备进攻其他领土………');
  era.printButton('- 巡视地上的魔界领土（已征服）', 0);
  era.printButton(
    era_flag.elf_realm_conquered >= 1
      ? '- 巡视黑暗精灵的领土（已征服）'
      : '- 入侵精灵族的领域',
    1,
  );
  era.printButton(
    era_flag.dragon_realm_conquered >= 1
      ? '- 巡视混沌龙之山（已征服）'
      : '- 入侵龙之山脉',
    2,
  );
  era.printButton(
    era_flag.heaven_conquered >= 1
      ? '- 巡视堕天使的淫界（已征服）'
      : '- 入侵天界',
    3,
  );
  // FLAG:92（arcana_fort_stage）是位掩码，不是线性阶段数：&1 东 &2 南
  // &4 西 &8 北（arcana_fort 自身按 |= 逐门置位），
  // 15 = 四门全破；这里只判「是否全部攻陷」，不代表推进到第几关
  era.printButton(
    era_flag.arcana_fort_stage === 15
      ? '- 巡视圣灵骑士的卖春堡垒（已征服）'
      : '- 攻略圣灵骑士的堡垒',
    4,
  );
  // [5] 的渲染与派发同一道检查（route_33 > 500）：窗口开着才渲染，
  // 标签随剧情阶段切换；派发拒收窗口外的键入（见下方派发检查）。
  if (era_exflag.route_33 > 500) {
    if (era_exflag.shrine_stage >= 4) {
      era.printButton('- 巡视淫乱意志的神宫（已征服）', 5);
    } else if (era_exflag.shrine_stage >= 1) {
      era.printButton('- 天神宫广场', 5);
    } else if (route_33_open) {
      era.printButton('- 攻略天神宫', 5);
    }
  }
  era.printButton('- 向着世界之外', 9); // 旧文本作「向著」，#60 归一为简体
  era.drawLine();
  era.printButton('- 退出', 999);
  // [1000] 的分子/分母走具名门面（#502 起；此前的「无门面、直读」注释
  // 已过时，era-exflag.js 的 crystal_ball_deployed/stock 早已备好）
  era.printButton(
    `向城里投放水晶球[${era_exflag.crystal_ball_deployed}/${era_exflag.crystal_ball_stock}]`,
    1000,
  );

  // $INPUT_LOOP2：无效输入重问不重画（GOTO，见文件头）
  for (;;) {
    const result = await number_input();
    if (result === 999) {
      return 0;
    }
    if (result === 1000) {
      // 调 sengen_video → RETURN 0（#502 起真身）；注释单占一行，
      // 免得变异条目的 find 串把带 trace ref 的注释当定位串（trace-check 的
      // 「引用不进锁」约定）
      await sengen_video();
      return 0;
    }
    // 的 ELSEIF RESULT == 1001 分支随 #638 删除（#103：
    // 复制改名事故、不排期，缺内容的入口去掉），键入 1001 落到
    // 下方的 >=6 拒收支继续重问
    if (result === 9) {
      await campaign_menu();
      return 0;
    }
    if (result === 5 && era_exflag.route_33 <= 500) {
      // [5] 的派发检查与按钮渲染同款（route_33 > 500）：
      // 窗口外键入 5 按无效输入重问
      continue;
    }
    if (result >= 6 || result < 0) {
      continue;
    }

    // 地区选择：RESULT → AREA/SINDO 下标对（CAMPAIGN_REGIONS），
    // 五条分支此后都落到同一个 $START1
    if (result === 0) {
      // 人间界：复用出兵流程；其内部的 RESTART（出兵路线里的
      // [999] 返回等）原样透传，由 invasion() 的外层循环回到入口分派
      return await start_campaign(rand, HUMAN_WORLD);
    }
    if (result === 4) {
      // CALL ARCANA_FORT：RETURN 1（打了一仗、回合已耗）→ 本函数
      // 同样 RETURN 1，由调用方 BEGIN TURNEND；0（撤退/无候选/已全破）→ 0
      return await arcana_fort();
    }
    if (result === 5 && era_exflag.shrine_stage >= 3) {
      era_exflag.shrine_stage = era_exflag.shrine_stage + 1;
    }
    // 精灵/龙/天界/天神宫：取各自的 AREA/SINDO（天神宫的
    // 副作用已在上一步应用），此后都汇入 $START1
    return await start_campaign(rand, CAMPAIGN_REGIONS[result]);
  }
}

/**
 * 掠夺路线的派遣资格条件（五条 filter）。
 *
 * 自注「選択基準は迎撃に準じる」——与迎击设定的派遣条件同源，
 * 但**少两条**（迎击设定的七条版有近卫兵与后代两条 EX_TALENT 检查，
 * 这里没有），所以不复用 page-intercept.js 的 reject_reason。
 * 五条依次为：濒死 → 魔王自己 → 非待机 → 未驯服 → 孕妇且未开「孕妇可
 * 出征」位。条件只有这一处真相，列表计数与列表渲染共用。
 *
 * @param {number} cid 角色 ID
 * @returns {boolean} true = 不可派遣
 */
function raid_rejected(cid) {
  if ((era.get(`base:${cid}:0`) || 0) < 1) return true; // 体力为 0
  if (cid === 0) return true; // COUNT == 0（魔王自己）
  if (chara(cid).invasion.状态 !== 0) return true; // CFLAG:1 != 0
  // 未驯服：CFLAG:0（出售与助手资格）为 0 且无魔之刻印（TALENT:254）
  if (
    (era.get(`cflag:${cid}:0`) || 0) === 0 &&
    (era.get(`talent:${cid}:254`) || 0) === 0
  ) {
    return true;
  }
  // 孕妇（TALENT:153）且未开「怀孕时的迎击・临月调教」位（FLAG:5 位 10，
  // 配置页的 [10] 开关）
  if (
    (era.get(`talent:${cid}:153`) || 0) === 1 &&
    getbit(era.get('flag:5'), 10) === 0
  ) {
    return true;
  }
  return false;
}

/**
 * 勇者出兵（[2]）路线的派遣资格条件（两段共用的六条 filter）。
 * 条件只有这一处真相，列表计数与列表渲染共用。
 *
 * 六条依次为：魔王自己 → 濒死 → 非助手可（CFLAG:0 != 2）→ 非待机非苗床
 * （CFLAG:1 不属于 {0, 7}）→ 不爱慕也不淫乱 → 孕妇且未开「孕妇可出征」位。
 *
 * 带队的必须是助手可的角色（CFLAG:0 == 2 才放行），不满足的一律排除。
 *
 * @param {number} cid 角色 ID
 * @returns {boolean} true = 不可派遣
 */
function brute_rejected(cid) {
  if (cid === 0) return true; // COUNT == 0（魔王自己）
  if ((era.get(`base:${cid}:0`) || 0) < 1) return true; // 体力为 0
  // 只有助手可（CFLAG:0 == 2）能带队
  if ((era.get(`cflag:${cid}:0`) || 0) !== 2) return true;
  const status = era.get(`cflag:${cid}:1`) || 0; // CFLAG:1
  if (status !== 0 && status !== 7) return true; // 待机 / 苗床之外一律淘汰
  // 爱慕（TALENT:85）或淫乱（TALENT:76）二者皆无
  if (
    (era.get(`talent:${cid}:85`) || 0) !== 1 &&
    (era.get(`talent:${cid}:76`) || 0) !== 1
  ) {
    return true;
  }
  // 孕妇（TALENT:153）且未开「怀孕时的迎击・临月调教」位（FLAG:5 位 10）
  if (
    (era.get(`talent:${cid}:153`) || 0) === 1 &&
    getbit(era.get('flag:5'), 10) === 0
  ) {
    return true;
  }
  return false;
}

/**
 * 两条出兵路线的勇者选择（[3] 与 [2] 的选人段）。
 *
 * 两段是**同一段代码的复制**（连翻页条件的怪癖一并保留）：标题、缓存段、页窗、
 * 三个按钮、输入分发全部相同，只有候选条件不同——由 `rejected` 注入，条件本身
 * 各有各的一处真相（raid_rejected / brute_rejected）。
 *
 * `FOR COUNT, LIST_POS, CHARANUM` 在「角色号」上扫，ere 侧改成已加入
 * 角色 ID 的升序表（#21 扁平化的既有做法，见文件头的移植说明），LIST_POS 仍是
 * 「最后渲染的那个 ID」——与迎击列表（page-intercept.js）同一段骨架，
 * 连翻页条件的怪癖一并保留：T_LCOUNT 从 `NUM_PAGE * NO_PAGE + 1` 起算且只在
 * 渲染支内自增，页窗是 `[NO_PAGE*NUM_PAGE+1, (NO_PAGE+1)*NUM_PAGE)`，于是每页
 * 实际渲染 NUM_PAGE - 1 行、且上一页的最后一行会重复（既有现状，不修）。
 *
 * NO_PAGE/LIST_POS/PREV_PAGE/PREV_LIST_POS 是 invasion() 一侧的 #DIM 局部量：
 * RESTART 不重置它们（control-flow.md:376-377 的回函数头重执行 +
 * user-defined-variables.md 的「局部变量在 RESTART 时不重置」），故由调用方
 * 持有、本函数读写。
 *
 * @param {{no_page: number, list_pos: number, prev_page: number,
 *   prev_list_pos: number}} state 跨 RESTART 保留的翻页游标
 * @param {(cid: number) => boolean} rejected 候选条件（true = 不列）
 * @returns {Promise<number|typeof RESTART>} 选中的角色 ID；RESTART = [999]
 *   返回或没有候选
 */
async function pick_hero(state, rejected) {
  // LIST_POS/PREV_PAGE/PREV_LIST_POS 清零、LOCAL = 0、YUSYA_I = 0
  state.list_pos = 0;
  state.prev_page = 0;
  state.prev_list_pos = 0;
  const added = era.getAddedCharacters();
  let candidates = 0; // YUSYA_I
  for (const cid of added) {
    if (rejected(cid)) continue;
    candidates += 1;
  }
  // MAX_PAGE = ⌈YUSYA_I / NUM_PAGE⌉ - 1
  let max_page =
    candidates % NUM_PAGE > 0
      ? Math.trunc(candidates / NUM_PAGE) + 1
      : Math.trunc(candidates / NUM_PAGE);
  max_page -= 1;
  // 没有候选人：PRINTW + RESTART
  if (candidates === 0) {
    era.print('没有勇者可进行侵攻。');
    await era.waitAnyKey();
    return RESTART;
  }
  // $INPUT_LOOP_TMPO3
  for (;;) {
    // 缓存、重置列表信息（SWAP 换位）
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
    // 标题（CUSTOMDRAWLINE = 的空分割线不镜像，见文件头）
    era.print('派遣谁去侵攻呢？');
    era.drawLine();
    // 列表（窗口外的命中项只跳过、不渲染）
    let rows = 0; // L_LCOUNT：旧引擎按 LINECOUNT 差算，ere 侧按渲染行数代
    let t_lcount = NUM_PAGE * state.no_page + 1;
    for (const cid of added) {
      if (cid < state.list_pos) continue; // FOR COUNT, LIST_POS, CHARANUM
      if (rejected(cid)) continue; // 的 filter
      if (
        t_lcount >= (state.no_page + 1) * NUM_PAGE ||
        t_lcount < state.no_page * NUM_PAGE + 1
      ) {
        continue; // 页窗
      }
      life_list_item(cid);
      t_lcount += 1;
      state.list_pos = cid;
      rows += 1;
    }
    // 不足一整页时补空行
    if (rows < NUM_PAGE + 1) {
      for (let i = 0; i < NUM_PAGE - rows; i += 1) {
        era.print('');
      }
    }
    // 三个按钮（PRINTLC 左对齐补位、不换行 → printButton，引擎自动
    // 拼 [编号]；语义见 CONTEXT.md「输出 API 的排版与对齐」）
    era.drawLine();
    era.printButton('- 上一页', 1000); // PRINTLC
    era.printButton('- 返 回', 999); // PRINTLC（两个空格，引擎折叠成一个）
    era.printButton('- 下一页', 1001); // PRINTLC

    const result = await number_input(); // INPUT

    if (result === 999) {
      return RESTART;
    }
    if (result === 1000) {
      // 上一页（到底不动，GOTO 回循环头重画）
      if (state.no_page > 0) {
        state.no_page -= 1;
      }
      continue;
    }
    if (result === 1001) {
      // 下一页（到末页不动）
      if (state.no_page < max_page) {
        state.no_page += 1;
      }
      continue;
    }
    // 越界（CHARANUM 在 ID 世界不能直接换成「已加入数」：编制可以
    // 稀疏，数量会误伤合法的 ID —— 改判「是不是已加入角色」）
    if (result < 0 || !added.includes(result)) {
      continue;
    }
    if (rejected(result)) {
      continue; // 选中项不合法则重问
    }
    return result; // YUSYA_I = RESULT
  }
}

/**
 * 结果段·怪物路线（[0] 专用）。
 *
 * 战利品 = SINKOU × 10：已征服的土地（FLAG:SINDO != 0）是「强制征收」且先
 * 按 100000 封顶，未征服是「战利品」且**不封顶**（ELSE 分支没有 MIN，两分支的
 * 差别是既有行为）。已征服分支的地区见 MONSTER_CONQUERED_AREAS——五个地区
 * 都在列。
 *
 * 5% 抓捕的顺序是「等键 → get_enemy → 返回 0 才有犒赏行」。
 *
 * @param {object} region 出兵目标（CAMPAIGN_REGIONS 的条目）
 * @param {number} inkou 侵攻点（SINKOU）
 * @param {(n: number) => number} rand RAND:N 随机源
 */
async function monster_result_section(region, inkou, rand) {
  const conquered = (era.get(`flag:${region.sindo}`) || 0) !== 0;
  let sinkou = inkou;
  era.drawLine();
  if (MONSTER_CONQUERED_AREAS.includes(region.area) && conquered) {
    // 人间界/精灵/龙/天界（已征服）：封顶 100000 + 强制征收
    sinkou = Math.min(sinkou, 10000 * 10);
    era.print(`强制征收了${sinkou * 10}点！`); // PRINTFORMW
    await era.waitAnyKey();
    era_flag.money += sinkou * 10;
    era_exflag.legit_money += sinkou * 10;
  } else {
    // 未征服（五地区含天神宫都已列入已征服分支，走到这里即未征服）
    era.print(`得到了${sinkou * 10}点的战利品！`); // PRINTFORMW
    await era.waitAnyKey();
    era_flag.money += sinkou * 10;
    era_exflag.legit_money += sinkou * 10;
  }
  // 侵攻度条 + DRAWLINE + WAIT（进度条一律读 FLAG:AREA）
  era.drawLine();
  print_progress_line(region.result_label, region_progress(region), 10000);
  era.drawLine();
  await era.waitAnyKey(); // WAIT
  // CALL INVASION_RYOUZYOKU, <地区号>, SINKOU（#470 的真身）
  await invasion_ryouzyoku(region.ravish_area, sinkou, rand);
  // 5% 概率抓到负隅顽抗的勇者（GET_ENEMY 返回 0 = 人数上限早退）
  if (rand(100) < 5) {
    era.print('好像抓到了负隅顽抗的勇者…………'); // PRINTFORMW
    await era.waitAnyKey();
    if ((await get_enemy(rand)) === 0) {
      era.print('犒赏士兵，捕获到的勇者被赏赐给部下了。'); // PRINTFORMW
      await era.waitAnyKey();
    }
  }
}

/**
 * 结果段·掠夺路线（[3] 专用）。
 *
 * 掠夺额 = SINKOU（**不是**怪物路线的 ×10），经验是 SINKOU/20；善恶值先减
 * 5（`CALL KARMA, YUSYA_I, -5`，真身 ere/chara/chara-stats.js）。已
 * 征服/未征服的封顶差别与 [0] 同款，但这一段的已征服分支列全了
 * 五个地区（含 101），故只判 FLAG:SINDO。三段 PRINTFORM/PRINT/PRINTW
 * 在同一显示行，ere 侧并入一次 print + 等键
 * （monster-data.js 的同显示行归并先例），地区名取 region.name。
 *
 * @param {object} region 出兵目标（CAMPAIGN_REGIONS 的条目）
 * @param {number} yusya_i 领军勇者（角色 ID）
 * @param {number} inkou 侵攻点（SINKOU）
 */
async function raid_result_section(region, yusya_i, inkou) {
  const conquered = (era.get(`flag:${region.sindo}`) || 0) !== 0;
  let sinkou = inkou;
  era.print(
    `${chara_callname(yusya_i)}得到了魔王的力量！${region.name}被掠夺了。（善恶值:-5）`,
  ); // （PRINTFORM + PRINT 地区名 + PRINTW）
  await era.waitAnyKey();
  karma(yusya_i, -5); // CALL KARMA, YUSYA_I, -5
  if (conquered) {
    // （已征服）：封顶 100000 + 强行征收到
    sinkou = Math.min(sinkou, 10000 * 10);
    era.print(`强行征收到了${sinkou}点！`); // PRINTFORMW
    await era.waitAnyKey();
  } else {
    // （未征服）
    era.print(`获得了${sinkou}点的战利品！`); // PRINTFORMW
    await era.waitAnyKey();
  }
  era_flag.money += sinkou; // MONEY += SINKOU
  era_exflag.legit_money += sinkou; // EX_FLAG:4444 +=
  const exp_gain = Math.floor(sinkou / 20); // SINKOU / 20
  chara(yusya_i).dungeon.战斗经验 += exp_gain; // EXP:YUSYA_I:80
  era.print(`${chara_callname(yusya_i)}获得了${exp_gain}点经验值！`);
  await era.waitAnyKey();
  // 侵攻度条 + DRAWLINE + WAIT（进度条一律读 FLAG:AREA）
  era.drawLine();
  print_progress_line(region.result_label, region_progress(region), 10000);
  era.drawLine();
  await era.waitAnyKey(); // WAIT
}

/**
 * 结果段·勇者出兵路线（[2] 专用）。
 *
 * 战利品 = SINKOU × 5（[0] 是 ×10、[3] 是 ×1），经验是 SINKOU/2；善恶值先
 * 减 50（`CALL KARMA, YUSYA_I, -50`，全作最重的一档）。已征服/未征服的
 * 封顶差别与 [0] 同款，这一段也列全了五个地区（含 101），
 * 故只判 FLAG:SINDO。三段 PRINTFORM/PRINT/PRINTW 在同一
 * 显示行，ere 侧并入一次 print + 等键（monster-data.js 的同显示行归并先例），
 * 地区名取 region.name。
 *
 * 七档性格旁白按 `TALENT:YUSYA_I:160-166` 顺序判定，七档都不命中
 * 时打一个空行（PRINTL）。
 *
 * @param {object} region 出兵目标（CAMPAIGN_REGIONS 的条目）
 * @param {number} yusya_i 领军勇者（角色 ID）
 * @param {number} inkou 侵攻点（SINKOU）
 * @param {(n: number) => number} rand RAND:N 随机源（凌辱旁白与 9% 抓捕）
 */
async function brute_result_section(region, yusya_i, inkou, rand) {
  const conquered = (era.get(`flag:${region.sindo}`) || 0) !== 0;
  let sinkou = inkou;
  era.print(
    `${chara_callname(yusya_i)}带着怪物到达了${region.name}，尽可能地施暴着。（善良值:-50）`,
  ); // （PRINTFORM + PRINT 地区名 + PRINTW）
  await era.waitAnyKey();
  karma(yusya_i, -50); // CALL KARMA, YUSYA_I, -50
  // 七档性格旁白（降序 ELSEIF，命中即止）
  const personality = [
    [
      160,
      `${chara_callname(yusya_i)}在侵略的时候依旧全程保持着慈爱的笑容，她终于明白到一切都是为了${chara_callname(0)}而存在的………`,
    ],
    [
      161,
      `${chara_callname(yusya_i)}身先士卒，第一个飞跳入战场里，而且最后毫发无损。`,
    ],
    [162, `${chara_callname(yusya_i)}是优秀的指挥官，带领着怪物们侵略了。`],
    [
      163,
      `${chara_callname(yusya_i)}穿着${chara_callname(0)}赐予的被诅咒的铠甲，高声大笑着率领怪物们突击了………`,
    ],
    [
      164,
      `${chara_callname(yusya_i)}冷哼着耻笑跪求饶命的草民，随手将他们交给饥饿的巨兽了。`,
    ],
    [
      165,
      `${chara_callname(yusya_i)}一边发出异样的笑声，一边用手中的火把将四周都点燃了………`,
    ],
    [
      166,
      `${chara_callname(yusya_i)}把侵略时所抢夺的金银财宝都献给了${chara_callname(0)}………`,
    ],
  ].find(([talent]) => (era.get(`talent:${yusya_i}:${talent}`) || 0) !== 0);
  if (personality === undefined) {
    era.println(); // ELSE → PRINTL
  } else {
    era.print(personality[1]); // PRINTFORMW 的等键
    await era.waitAnyKey();
  }
  if (conquered) {
    // （已征服）：封顶 100000 + 强制征收 ×5 + 经验 /2
    sinkou = Math.min(sinkou, 10000 * 10);
    era.print(`强制征收了${sinkou * 5}点！`); // PRINTFORMW
    await era.waitAnyKey();
    era_flag.money += sinkou * 5;
    era_exflag.legit_money += sinkou * 5;
    const exp_gain = Math.trunc(sinkou / 2);
    chara(yusya_i).dungeon.战斗经验 += exp_gain;
    era.print(`${chara_callname(yusya_i)}获得了${exp_gain}点经验值！`);
    await era.waitAnyKey();
  } else {
    // （未征服）
    era.print(`得到了${sinkou * 5}点的战利品！`); // PRINTFORMW
    await era.waitAnyKey();
    era_flag.money += sinkou * 5;
    era_exflag.legit_money += sinkou * 5;
    const exp_gain = Math.trunc(sinkou / 2);
    chara(yusya_i).dungeon.战斗经验 += exp_gain;
    era.print(`${chara_callname(yusya_i)}获得了${exp_gain}点经验值！`);
    await era.waitAnyKey();
  }
  // 侵攻度条 + DRAWLINE + WAIT（进度条一律读 FLAG:AREA）
  era.drawLine();
  print_progress_line(region.result_label, region_progress(region), 10000);
  era.drawLine();
  await era.waitAnyKey(); // WAIT
  // CALL INVASION_RYOUZYOKU, <地区号>, SINKOU
  await invasion_ryouzyoku(region.ravish_area, sinkou, rand);
  // 9% 概率抓到负隅顽抗的勇者（比 [0] 的 5% 高；GET_ENEMY 之后
  // 无条件 `EX_FLAG:99 += 1`，与 [0] 的「只在该行之下」不同）
  if (rand(100) < 9) {
    era.print('好像抓到了负隅顽抗的勇者…………'); // PRINTFORMW
    await era.waitAnyKey();
    const captured = await get_enemy(rand);
    era_exflag.prestige = era_exflag.prestige + 1; // EX_FLAG:99 += 1
    if (captured === 0) {
      era.print('犒赏士兵，捕获到的勇者被赏赐给部下了。'); // PRINTFORMW
      await era.waitAnyKey();
    }
  }
}

/**
 * start_campaign：出兵流程——菜单 + 四条路线
 * + 共通补正 + 中途事件 + 侵攻結果共通
 * + 结果段 + 结算尾。
 *
 * 四条路线：[0] 怪物出兵（#503）、[1] 魔力出兵（#117）、
 * [2] 勇者出兵（#504）、[3] 勇者掠夺（#503）。四条真身
 * 共走后面的共通段。
 *
 * `region` 是出兵目标（CAMPAIGN_REGIONS 的条目，#505）：窄路径（未征服）由
 * invasion() 传默认的人间界，征服后菜单由 [0]/[1]/[2]/[3]/[5] 各传各的——
 * 与「先设 AREA/SINDO、再落 $START1」同构。
 *
 * 外层 `for (;;)` 是 `$START1` 复刻：[2]/[3] 的 RESTART（没有候选、
 * [999] 返回）在这里 `continue` 重画整屏出兵菜单——与「回到
 * invasion() 开头」在窄路径下等价；从征服后菜单进来时，RESTART 会回到
 * 征服后菜单，故把 RESTART 信号返回给 invasion() 承接。
 *
 * 返回 0 = 取消（不消耗回合，回主菜单）；返回 1 = 回合已耗（调用方
 * page-shop 的 [109] 分支据此 BEGIN TURNEND）。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（[0]/[2] 的 MONSTER_DATA、
 *   [3] 的 medal_bonus 经共通段，以及 invasion_event 的分发与三分支）
 * @param {object} [region] 出兵目标（缺省人间界，见 HUMAN_WORLD）
 * @returns {Promise<number|typeof RESTART>} 0 / 1 / RESTART
 */
async function start_campaign(rand = default_rand, region = HUMAN_WORLD) {
  // 的地区分派已由调用方完成（AREA/SINDO 来自 region）；
  // 的 ELSE 是缺省人间界那一支
  const { area, sindo } = region;
  // 的 #DIM 局部量里，NO_PAGE（= 0）与三条翻页
  // 游标跨 RESTART 保留（局部量不重置，见 user-defined-variables.md）：窄路径
  // 的 RESTART 在本函数的 `$START1` 循环里 `continue`，游标自然保住；已征服
  // 来路那条 RESTART 会绕回 invasion() 重进本函数、游标被重建。**这一差异实测
  // 不可观测**（#505 复审用探针跑过两版：pick_hero 每次进入都清零
  // LIST_POS/PREV_*，页窗又只按计数判，两版画出的列表逐行相同），故不为
  // 此改 RESTART 的承接结构（「不要动路线本身」）
  const page_state = {
    no_page: 0,
    list_pos: 0,
    prev_page: 0,
    prev_list_pos: 0,
  };
  let sinkou = 0; // SINKOU = 0
  let inv_type = 0; // INV_TYPE = RESULT
  let yusya_i = 0; // #DIM YUSYA_I（[0]/[1] 路线不赋值，恒 0）

  // $START1（[3] 的 RESTART 回到这里重画整屏）
  for (;;) {
    // 怪物数量 = ITEM:100..189 之和（[0]/[2] 路线的 600 门槛）
    let mon_num = 0;
    for (let i = 100; i < 190; i += 1) {
      mon_num += era.get(`item:${i}`) || 0;
    }
    // 画面绘制：侵攻度 / 气力 / 怪物数量 / 出兵选项
    era.drawLine();
    // 侵攻度条按 AREA 换标签，读点一律是 FLAG 侧（见 region_progress）
    print_progress_line(region.campaign_label, region_progress(region), 10000);
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
      era.printButton('- 使用现有怪物的一半去进攻（资金·俘虏）', 0);
    }
    era.printButton('- 使用魔王的魔力（经验值）', 1);
    if (mon_num < MONSTER_THRESHOLD) {
      era.print('[-] - 怪物数量不足。至少需要600只');
    } else {
      era.printButton(
        '- 派遣勇者带三分之一的怪物去进攻（资金·经验值·俘虏）',
        2,
      );
    }
    era.printButton('- 派遣勇者前去掠夺资金（资金·经验值）', 3);
    era.drawLine();
    era.printButton('- 返回', 999);

    // $INPUT_LOOP：无效输入重问不重画（GOTO INPUT_LOOP，见文件头）
    for (;;) {
      const result = await number_input();
      if (result === 999) {
        return 0;
      }
      if (result >= 4 || result < 0) {
        continue;
      }
      if ((result === 0 || result === 2) && mon_num < MONSTER_THRESHOLD) {
        continue;
      }
      inv_type = result; // INV_TYPE = RESULT（0/1/2/3）
      break;
    }

    // SINKOU = 0（A/B 是 MONSTER_DATA 的队列坐标，仅怪物路线用）
    sinkou = 0;

    if (inv_type === 0) {
      // ===== [0] 怪物出兵 =====
      // 逐个持有怪物调 MONSTER_DATA 取战斗力，怪物数先减半再累加
      for (let i = 100; i < 190; i += 1) {
        if ((era.get(`item:${i}`) || 0) < 1) continue;
        monster_data(i, 0, 0, -1, -1, rand); // CALL MONSTER_DATA, MON_ID, 0, 0
        let mon_atk = e_get(2) + e_get(3) + e_get(4); // E:2/E:3/E:4
        if (e_get(5) !== 0) mon_atk += e_get(1); // 特殊
        if (e_get(6) !== 0) mon_atk += e_get(1); // 魔法
        const halved = Math.trunc((era.get(`item:${i}`) || 0) / 2);
        era.set(`item:${i}`, halved);
        sinkou += mon_atk * (Math.trunc(halved / 9) + 1);
      }
      sinkou = Math.trunc(sinkou / 20);
      // 威望修正（与魔力分支同构，共用一套五档）
      const tier = await apply_prestige_tier(sinkou);
      sinkou = tier.sinkou;
      if (tier.failed) {
        era.print('侵攻失败'); // PRINTW
        await era.waitAnyKey();
        return 1; // 与魔力分支同款的早退（不结算、不消耗后续流程）
      }
      era.print('怪物的战斗力　' + sinkou + '点'); // PRINTFORMW
      await era.waitAnyKey();
    } else if (inv_type === 2) {
      // ===== [2] 勇者带三分之一的怪物出兵 =====
      const picked = await pick_hero(page_state, brute_rejected);
      if (picked === RESTART) {
        // 没有候选 / [999] 返回（与 [3] 同一段复制，处置同）
        if (era_flag.human_realm_fallen !== 0) {
          return RESTART;
        }
        continue;
      }
      yusya_i = picked; // YUSYA_I = RESULT
      // 逐个持有怪物调 MONSTER_DATA（第三参是 YUSYA_I），
      // 怪物数先 /= 3 参与累加、再 *= 2 留回库存
      for (let i = 100; i < 190; i += 1) {
        if ((era.get(`item:${i}`) || 0) < 1) continue;
        monster_data(i, 0, yusya_i, -1, -1, rand); // CALL MONSTER_DATA, MON_ID, 0, YUSYA_I
        let mon_atk = e_get(2) + e_get(3) + e_get(4);
        if (e_get(5) !== 0) mon_atk += e_get(1); // 特殊
        if (e_get(6) !== 0) mon_atk += e_get(1); // 魔法
        const third = Math.trunc((era.get(`item:${i}`) || 0) / 3);
        sinkou += mon_atk * (Math.trunc(third / 9) + 1);
        era.set(`item:${i}`, third * 2); // ITEM:MON_ID *= 2
      }
      sinkou = Math.trunc(sinkou / 20);
      era.print('怪物的战斗力　' + sinkou + '点'); // PRINTFORMW
      await era.waitAnyKey();
      // 勇者补正（CFLAG:YUSYA_I:9 = 等级；这里是三格全角空格）
      const brute_bonus = chara(yusya_i).chara.等级 + 100; // TMP2_I
      era.print(
        '勇者补正　　　x' +
          Math.floor(brute_bonus / 100) +
          '.' +
          String(brute_bonus % 100).padStart(2, '0'),
      ); // PRINTFORMW
      await era.waitAnyKey();
      sinkou = Math.trunc((sinkou * brute_bonus) / 100);
      // 勋章补正（传勇者号——#502 的 medal_bonus 签名接实参）
      sinkou = Math.trunc((sinkou * (await medal_bonus(yusya_i))) / 100);
    } else if (inv_type === 3) {
      // ===== [3] 勇者掠夺 =====
      const picked = await pick_hero(page_state, raid_rejected);
      if (picked === RESTART) {
        // 没有候选 / [999] 返回：RESTART 回
        // invasion() 开头重走 FLAG:82 分派。未征服时落点是 $START1
        // （就是本函数的循环头，`continue` 连 #DIM 翻页游标一起保住）；
        // 已征服时（从征服后菜单 [0] 进来）落点是征服后菜单，本函数到不了，
        // 把信号透传给 invasion() 的外层循环——那里的三元就是入口分派。
        if (era_flag.human_realm_fallen !== 0) {
          return RESTART;
        }
        continue;
      }
      yusya_i = picked; // YUSYA_I = RESULT
      // 掠夺的战力来源是魔王之力（BASE:0:1），与 [0]/[2] 的怪物无关
      sinkou = Math.floor(chara(0).dungeon.气力 / 25);
      chara(0).dungeon.气力 = Math.floor(chara(0).dungeon.气力 / 2);
      era.print('魔王的力量　' + sinkou + '点'); // PRINTFORMW
      await era.waitAnyKey();
      // 勇者补正（CFLAG:YUSYA_I:9 = 等级）
      const hero_bonus = chara(yusya_i).chara.等级 + 100; // TMP2_I
      era.print(
        '勇者补正　x' +
          Math.floor(hero_bonus / 100) +
          '.' +
          String(hero_bonus % 100).padStart(2, '0'),
      ); // PRINTFORMW
      await era.waitAnyKey();
      sinkou = Math.floor((sinkou * hero_bonus) / 100);
      // 勋章补正（传勇者号——#502 的 medal_bonus 签名接实参）
      sinkou = Math.floor((sinkou * (await medal_bonus(yusya_i))) / 100);
    } else {
      // ===== [1] 魔力出兵 =====
      // SINKOU = BASE:0:1 / 25；随后 BASE:0:1 /= 2（失败也照减）。气力是
      // dungeon 域属主（#70 实测），跨域写走门面（#71）
      sinkou = Math.floor(chara(0).dungeon.气力 / 25);
      chara(0).dungeon.气力 = Math.floor(chara(0).dungeon.气力 / 2);
      // 威望修正（失败档早退：PRINTW 侵攻失败 → RETURN 1）
      const tier = await apply_prestige_tier(sinkou);
      sinkou = tier.sinkou;
      if (tier.failed) {
        era.print('侵攻失败');
        await era.waitAnyKey();
        return 1;
      }
      // PRINTFORMW 战斗力（行首对齐的全角空格在字符串字面量里——模板串
      // 会被 no-irregular-whitespace 拦下）
      era.print('战斗力　' + sinkou + '点');
      await era.waitAnyKey();
    }
    break; // 路线走完，进共通段
  }

  // ===== 共通処理 =====
  // 魔王补正：CFLAG:0:9 是百分比加成（+20 → x1.20），新档 0
  const maou_bonus = (era.get('cflag:0:9') || 0) + 100;
  era.print(
    '魔王补正　　　x' +
      Math.floor(maou_bonus / 100) +
      '.' +
      String(maou_bonus % 100).padStart(2, '0'),
  );
  await era.waitAnyKey();
  sinkou = Math.floor((sinkou * maou_bonus) / 100);
  // 知识补正（魔王的素质，新档均无）
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
  // 勋章补正（#502 起真身：EXP:0:81 分档，本世界 > 5 枚时真有数值差）
  sinkou = Math.floor((sinkou * (await medal_bonus())) / 100);
  // PRINTFORMW 合计
  era.print('合计　' + sinkou + '点');
  await era.waitAnyKey();

  // CALL INVASION_EVENT；SIF RESULT > 0 → RETURN RESULT。
  // SINKOU 按引用传入传出（`#DIM REF SINKOU`）：FORT/CHALLENGE 的
  // 强攻/潜入/绕路会按比例削减它，改动经 state 回到这里。
  const event_state = { sinkou, yusya_i };
  const event_result = await invasion_event(
    area,
    sindo,
    inv_type,
    event_state,
    rand,
  );
  sinkou = event_state.sinkou;
  yusya_i = event_state.yusya_i;
  if (event_result > 0) {
    return event_result;
  }

  // ===== 侵攻結果共通 =====
  // 掠夺路线的侵攻力激减（SINKOU / 20）；其余路线全额。
  // 累加与封顶一律写 FLAG:AREA（天神宫因此写 FLAG:101，见 add_region_progress）
  const gained = inv_type === 3 ? Math.trunc(sinkou / 20) : sinkou;
  add_region_progress(region, gained);

  // ===== 结果段：按 INV_TYPE 四分支 =====
  if (inv_type === 0) {
    await monster_result_section(region, sinkou, rand);
  } else if (inv_type === 2) {
    await brute_result_section(region, yusya_i, sinkou, rand);
  } else if (inv_type === 3) {
    await raid_result_section(region, yusya_i, sinkou);
  } else {
    // ===== 魔力结果段 =====
    // %SAVESTR:MASTER%的魔力爆发出来了！
    era.print(`${chara_callname(0)}的魔力爆发出来了！`);
    await era.waitAnyKey();
    // 威力分档的演出文本
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
    // 经验值段（未征服走 ELSE 分支，已征服走各自分支的
    // 100000 封顶——五个地区的两分支只差封顶，经验同为 SINKOU/2）。战斗
    // 经验是 dungeon 域属主，跨域写走门面
    let exp_sinkou = sinkou;
    if ((era.get(`flag:${region.sindo}`) || 0) !== 0) {
      exp_sinkou = Math.min(exp_sinkou, 10000 * 10);
    }
    const exp_gain = Math.floor(exp_sinkou / 2);
    era.print(`${chara_callname(0)}得到了${exp_gain}点经验值！`);
    await era.waitAnyKey();
    chara(0).dungeon.战斗经验 += exp_gain; // EXP:0:80（魔王的侵略经验）
    era.drawLine();
    // 侵攻度条（读点一律是 FLAG 侧，见 region_progress）
    print_progress_line(region.result_label, region_progress(region), 10000);
  }

  // ===== 结算尾 =====
  era.drawLine();
  await era.waitAnyKey(); // WAIT
  era_exflag.prestige = era_exflag.prestige + 2; // EX_FLAG:99 += 2
  // KYOTEN_EVENT 按 AREA 分派（81/86/88/90 → ARG 1/2/3/4）；
  // 天神宫不在列（kyoten_arg = null）——不调用
  if (region.kyoten_arg !== null) {
    await kyoten_event(region.kyoten_arg);
  }
  // CALL INVASION_CHECK（结局判定，#118 本体：FLAG:81 满时在此触发
  // ENDING_1，演出含 [0] 继续 / [1] 退出的询问——选 0 继续后回落到这里）
  await invasion_check();
  return 1;
}

module.exports = {
  brute_rejected,
  inv_death_check,
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
