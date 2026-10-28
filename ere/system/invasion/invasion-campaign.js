/**
 * @file 侵略主流程：出兵菜单与四条路线（怪物/魔力/勇者/掠夺）、共通补正、
 * 中途事件、侵攻結果共通、结果段与结算尾。
 *
 * 四条路线的战力来源各异（怪物存量 / 魔王气力 / 领队勇者），之后一律走
 * 共通段：魔王补正 → 知识补正 → 勋章补正 → 中途事件 → 累加侵攻度 → 结果段
 * → 据点横幅 → 结局判定。出兵目标由 CAMPAIGN_REGIONS 给出（AREA/SINDO 与
 * 各处标签），侵攻度一律读写 FLAG 侧。
 *
 * RESTART 是「回到函数开头重新执行」的 ere 侧信号（局部量不重置）：页面入口
 * invasion() 的外层循环承接它，重走入口分派。SINKOU/YUSYA_I 在旧引擎里是
 * 按引用传入传出的局部量，这里打包成 state 对象。
 *
 * 移植取舍（BARSTR → 进度条格、同显示行归并、[999]/[1000] 的按钮化等）与
 * 旧引擎对照登记在侵略域的文件头说明（page-invasion.js）里。
 */

const era = require('#/era-electron');
const { is_state } = require('#/system/flow/game-state');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { karma } = require('#/system/chara/chara-stats');
const { monster_data } = require('#/system/dungeon/monster-data');
const {
  BATTLE_COLUMN,
  battle_column,
} = require('#/system/dungeon/battle-state');
const { invasion_check } = require('#/system/invasion/invasion-check');
const { invasion_event } = require('#/system/invasion/invasion-event');
const { kyoten_event } = require('#/system/invasion/invasion-kyoten');
const { print_progress_line } = require('#/system/invasion/invasion-progress');
const { invasion_ryouzyoku } = require('#/system/invasion/invasion-ravish');
const { change_screen } = require('#/utils/screen-change');
const { life_list_item } = require('#/page/page-life-list');
const { get_enemy } = require('#/event/enter-enemy');
const { chara } = require('#/facade/chara');
const { chara_callname, chara_nickname } = require('#/utils/callname-utils');
const { print_button_grid } = require('#/utils/button-grid');
const { default_rand } = require('#/utils/numeric');

/**
 * RESTART 语义的 ere 侧信号（control-flow.md:376-377「回到当前函数开头重新
 * 执行」；`#DIM` 局部量不随 RESTART 重置见 user-defined-variables.md 的
 * 局部变量一节）。invasion() 的开头按 FLAG:82 分派，
 * 所以信号一路透传到 invasion() 的外层循环——那里重走「FLAG:82 分派 →
 * 菜单」，与 RESTART 语义等价（含「征服后菜单的 [0] 出发时回到征服后
 * 菜单」这一写法）。
 */
const RESTART = Symbol('restart');

/**
 * 本模块两屏的固定键。
 * - 派遣选人屏（pick_hero）页脚：上一页 [1000] / 返回 [999] / 下一页 [1001]；
 * - 出兵方式屏：返回 [999]（0-3 是 inv_type 的方法号，由各结果段消费）。
 */
const HERO_PREV_KEY = 1000;
const HERO_BACK_KEY = 999;
const HERO_NEXT_KEY = 1001;
const DISPATCH_BACK_KEY = 999;

/** 每页角色数（`#DIM NUM_PAGE = 26`） */
const NUM_PAGE = 26;

/** 出兵菜单的怪物门槛（`MON_NUM < 600`） */
const MONSTER_THRESHOLD = 600;

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
 * 地址是模板串：AREA 本来就是按地区取的变量，静态判不出落点。
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

/** GETBIT(X, n)：FLAG:5 用到位 32+，位运算在 JS 里按 32 位截断会溢出，改算术 */
function getbit(value, bit) {
  return Math.floor((value || 0) / 2 ** bit) % 2;
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
    // 每轮绘制前换屏：画面上只有当前这一屏（ADR-0009）
    await change_screen();
    // 标题（CUSTOMDRAWLINE = 的空分割线不镜像，见文件头）
    era.print('派遣谁去侵攻呢？');
    era.drawLine();
    // 列表（窗口外的命中项只跳过、不渲染）
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
    }
    // 末页不满一整页时不补空行：ere 是滚动视图，按钮紧接列表末行即可
    // 三个页脚键同行（引擎 24 列网格；按钮正文不带 [编号] 前缀，引擎自动拼）
    era.drawLine();
    print_button_grid(
      [
        [HERO_PREV_KEY, '- 上一页'], // PRINTLC
        [HERO_BACK_KEY, '- 返 回'], // PRINTLC（两个空格，引擎折叠成一个）
        [HERO_NEXT_KEY, '- 下一页'], // PRINTLC
      ],
      3,
    );

    const result = await era.input(); // INPUT

    if (result === HERO_BACK_KEY) {
      return RESTART;
    }
    if (result === HERO_PREV_KEY) {
      // 上一页（到底不动，GOTO 回循环头重画）
      if (state.no_page > 0) {
        state.no_page -= 1;
      }
      continue;
    }
    if (result === HERO_NEXT_KEY) {
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
 * 5（`CALL KARMA, YUSYA_I, -5`，真身 ere/system/chara/chara-stats.js）。已
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

  // $START1（[3] 的 RESTART 回到这里重画整屏）。每轮绘制前换屏（ADR-0009）
  for (;;) {
    await change_screen();
    // 怪物数量 = ITEM:100..189 之和（[0]/[2] 路线的 600 门槛）
    let mon_num = 0;
    for (let i = 100; i < 190; i += 1) {
      mon_num += era.get(`item:${i}`) || 0;
    }
    // 画面绘制：侵攻度 / 气力 / 怪物数量 / 出兵选项
    era.drawLine();
    // 侵攻度条按 AREA 换标签，读点一律是 FLAG 侧（见 region_progress）
    print_progress_line(region.campaign_label, region_progress(region), 10000);
    // MAXBASE:0:1（气力上限）直读：maxbase 无门面
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
    era.printButton('- 返回', DISPATCH_BACK_KEY);

    // $INPUT_LOOP：无效输入重问不重画（GOTO INPUT_LOOP，见文件头）
    for (;;) {
      const result = await era.input();
      if (result === DISPATCH_BACK_KEY) {
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
        const mon = battle_column(BATTLE_COLUMN.DEFENSE_1);
        let mon_atk = mon.attack + mon.defense + mon.speed;
        if (mon.special !== 0) mon_atk += mon.level; // 特殊
        if (mon.magic !== 0) mon_atk += mon.level; // 魔法
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
        const mon = battle_column(BATTLE_COLUMN.DEFENSE_1);
        let mon_atk = mon.attack + mon.defense + mon.speed;
        if (mon.special !== 0) mon_atk += mon.level; // 特殊
        if (mon.magic !== 0) mon_atk += mon.level; // 魔法
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
  // ENDING_1，演出含 [0] 继续 / [1] 退出的询问——选 0 继续后回落到这里）。
  // 选退出时它是回标题的转场目标（#852），原样上抛
  const over = await invasion_check();
  if (is_state(over)) {
    return over;
  }
  return 1;
}

module.exports = {
  CAMPAIGN_REGIONS,
  HUMAN_WORLD,
  RESTART,
  medal_bonus,
  start_campaign,
};
