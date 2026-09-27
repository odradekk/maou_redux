/**
 * @file 调教结束时的珠结算：run_juel_check 的交互循环与 juel_check_main 的
 * 数值结算（issue #47——调教一回合里唯一的数值结算）。
 *
 * 画面侧两个子调用在 ere/page/ 下各自模块：show_info_exp
 * （page-info-exp.js）与 show_juel / show_ablup_select（page-ablup.js）。
 *
 * == 与引擎 endTrain() 的职责划分（#47 定案，依据 app.asar 的 endTrain 源码）==
 *
 * 引擎收尾 era.endTrain()（train-loop.js 的 run_aftertrain 在 EVENTEND 链
 * **之后**调用，#44 固定的顺序）做两件事：
 *   1. 对调教列里的每个角色，把 gotjuel 的**每一个键**加进 juel
 *      （`Object.entries(data.gotjuel[e])` 全键遍历）；
 *   2. 删掉调教域表（palam/gotjuel/tflag/ex/source/delta…）。
 * 相殺与结算表渲染都要读**加算后**的 juel，这一步只能留在游戏侧（引擎的
 * 加算发生在链后、渲染之后，帮不上忙）。若两边都做，本次增量会翻倍。
 *
 * 定案：游戏侧完整承载珠结算（梯子→加算→TFLAG 记录→相殺→渲染），
 * 渲染完成后把本模块写过的 gotjuel 键**清回 0**——引擎的加算成为精确
 * 无操作，删表职责不受影响。清 0 不会产生未定义键相加：引擎在
 * addCharacter/addCharacterForTrain 时已按 staticData.juel 名字表把
 * juel 与 gotjuel 的每个键预置为 0（app.asar 实证，initCharaTable 含
 * juel）。**gotjuel 的唯一写者是本模块**——后续工单不得绕过：erauma 式
 * 的逐回合 gotjuel 累积不适用，结算模型是一次性的 PALAM→珠换算。
 *
 * 两处有意为之的可证偏离（勿「修回去」）：
 *   - GOTJUEL:3 = GET_JUEL（润滑）是**死存储**：写入后全库无读者
 *     （加算循环跳过 3，显示表不出现润滑），引擎侧却会把非零的
 *     gotjuel:3 加进 juel:3、令 juel:3 出现无人读的增量——这笔写不落。
 *   - 相殺的随机三选一无引擎 API，默认均匀三选一（Math.random）；
 *     随机源以参数注入（juel_check_main / offset_negative_group 的 rng
 *     形参，返回值 = 池序号整数），供测试固定住相殺的逐步数值，
 *     生产路径不传参。
 */

const era = require('#/era-electron');
const { check_sellassiable } = require('#/system/stronghold/sale');
const { yokubo_up_check } = require('#/system/train/ability-check');
const {
  ablup0,
  ablup1,
  ablup2,
  ablup3,
  ablup4,
  ablup10,
  ablup11,
  ablup12,
  ablup13,
  ablup14,
  ablup15,
  ablup16,
  ablup17,
  ablup20,
  ablup21,
  ablup22,
  ablup23,
  ablup30,
  ablup31,
  ablup32,
  ablup33,
  ablup37,
  ablup39,
  ablup40,
  ablup99,
  ablup100,
  auto_ablup,
} = require('#/system/train/ablup');
const { check_specialskil } = require('#/event/get-specialtalent'); // #565 起接入
const { show_info_exp } = require('#/page/page-info-exp');
const { show_ablup_select, show_juel } = require('#/page/page-ablup');
const era_flag = require('#/era-utils/era-flag');
const { NBSP, pad_left } = require('#/utils/display-width'); // #577：对齐补位 NBSP 化

/**
 * ABLUPxx 是 run_juel_check 输入分发的全部目标。ABLUP_IDS 是
 * 「引擎认得这个编号」的完整清单，与实现状态无关——测试按它核对
 * ABLUP_HANDLERS 的键一一对应（不缺号、不多号）。
 */
const ABLUP_IDS = [
  0, 1, 2, 3, 4, 10, 11, 12, 13, 14, 15, 16, 17, 20, 21, 22, 23, 30, 31, 32, 33,
  37, 39, 40, 99, 100,
];

/**
 * ABLUP_IDS 中已实现真身的编号（issue #464：编号 0～4；issue #465：
 * 编号 10～17；issue #466：编号 20～23、30～33——Abl.yml 对这些编号
 * 都有名字条目，菜单选得中，全部接入）。
 * ablup5～9 的规则本体也已实现（ere/system/train/ablup.js），但 Abl.yml/
 * Abl.csv 没有编号 5～9 的名字条目，没有任何菜单能选中它们，因此不
 * 接入本表——接入即意味着玩家能选中一个引擎认不出名字的能力。
 */
const ABLUP_HANDLERS = {
  0: ablup0,
  1: ablup1,
  2: ablup2,
  3: ablup3,
  4: ablup4,
  10: ablup10,
  11: ablup11,
  12: ablup12,
  13: ablup13,
  14: ablup14,
  15: ablup15,
  16: ablup16,
  17: ablup17,
  20: ablup20,
  21: ablup21,
  22: ablup22,
  23: ablup23,
  30: ablup30,
  31: ablup31,
  32: ablup32,
  33: ablup33,
  37: ablup37,
  39: ablup39,
  40: ablup40,
  99: ablup99,
  100: ablup100,
};

// PALAMLV 各级阈值，与 era-utils/palam-level.js 的 PALAMLV 取值相同
const PALAMLV = [
  0, 100, 500, 3000, 10000, 30000, 60000, 100000, 150000, 250000,
];

// 獲得珠の梯子：PALAM 低于上界时得对应珠。乘数（×3 / ×2）是固定
// 规则（PALAMLV:1*3 = 300 等）；梯子外（≥ PALAMLV:9）保底 12000
const GAIN_LADDER = [
  [PALAMLV[1], 0],
  [PALAMLV[1] * 3, 1],
  [PALAMLV[2], 2],
  [PALAMLV[2] * 3, 10],
  [PALAMLV[3], 20],
  [PALAMLV[3] * 2, 100],
  [PALAMLV[4], 200],
  [PALAMLV[5], 1000],
  [PALAMLV[6], 2000],
  [PALAMLV[7], 3000],
  [PALAMLV[8], 5000],
  [PALAMLV[9], 8000],
];
const GAIN_MAX = 12000;

// 的加算对象（0-10 去 3，另加 14/15/100）——也即文件头定案的
// gotjuel 清零对象：游戏侧结算碰过哪些键，收尾前就把哪些键清回 0
const OWNED_JUEL_KEYS = [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 14, 15, 100];

// 色名 → CSS hex（颜色片段直通渲染层，page-train 的
// #ff1493/#87cefa 先例）：SkyBlue → 三个读数列，LightSalmon → 抵消列
const SKY_BLUE = '#87cefa';
const LIGHT_SALMON = '#ffa07a';

/**
 * figure_indent：数字的 8 位右对齐缩进——按数量级逐档补空格
 * （< 10^7 共 7 档），等价 padStart(8)。
 * @param {number} n
 * @returns {string}
 */
const figure_indent = (n) => pad_left(String(n), 8);

/**
 * 参数值 → 獲得珠的梯子判定。
 * @param {number} value PALAM 当前值
 * @returns {number} GET_JUEL
 */
function palam_to_gain(value) {
  for (const [threshold, gain] of GAIN_LADDER) {
    if (value < threshold) {
      return gain;
    }
  }
  return GAIN_MAX;
}

/**
 * getbit：64 位按位取位。JS 位运算是 32 位、高位会回绕，
 * 改用除法取位（flag 位域是正整数）。
 * @param {number} value
 * @param {number} bit
 * @returns {boolean}
 */
function getbit(value, bit) {
  return Math.floor((value || 0) / 2 ** bit) % 2 === 1;
}

/**
 * 否定の珠による相殺。
 *
 * 两组池子（恭顺 4/欲情 5/屈服 6 与 耻情 8/苦痛 9/恐怖 10）各跑同一个
 * 循环：每轮随机挑一池，扣 min(否定余量的一半, 该池现有)——否定
 * 余量取半为 0 且未清零时改扣 1；直到否定清零或该组池子全空。习得
 * （juel:7）与两组之外的项目不参与抵消。
 *
 * **有意偏离：循环体语义上是 do-while（先跑一遍再判条件），此处写成
 * while。** do-while 在「否定已清零」或「该组池子全空」时循环体仍会跑
 * 一遍。跑那一遍在珠值非负时是**数值上的空操作**：扣减量被池值下限夹
 * 到 0，两笔 `-= 0` 不改变任何值——差别只在多出两笔同值写入。唯一不
 * 等价的情形是某个池子的珠值为**负**（负值会当扣减量、反向加回两侧）；
 * 珠的来源只有加算与本函数的有界扣减，负值在正常存档里不可达，故写成
 * while、不复刻这条退化路径。改回 do-while 会多出两笔空写、动到逐步
 * 写序的用例——真要复刻请连同用例一起改。
 *
 * 另：`take === 0 → take = 1` 这条最小扣减量不是排版细节，是**循环的终止
 * 条件**——去掉它，否定余量为 1 时永远扣 0，循环不退出（验收实测：整个
 * 测试文件挂死）。
 *
 * @param {number} cid 调教目标
 * @param {number[]} pools 参与抵消的 juel 序号组（长度 3，随机三选一）
 * @param {() => number} [rng] 池序号的随机源（须返回
 *   [0, pools.length) 的整数；默认均匀三选一，测试注入定值序）
 */
function offset_negative_group(cid, pools, rng) {
  const pick_index = rng ?? (() => Math.floor(Math.random() * pools.length));
  const negative = () => era.get(`juel:${cid}:100`) || 0;
  const pool_value = (id) => era.get(`juel:${cid}:${id}`) || 0;
  // 循环条件：JUEL:100 > 0 && (组内三池之和) > 0
  while (
    negative() > 0 &&
    pools.reduce((sum, id) => sum + pool_value(id), 0) > 0
  ) {
    const pick = pools[pick_index()];
    let take = Math.floor(negative() / 2); // 扣减量 = JUEL:100 / 2
    if (take === 0) {
      take = 1; // 否定未清零时至少扣 1
    }
    if (pool_value(pick) < take) {
      take = pool_value(pick); // 池子里不够就整池扣走
    }
    era.set(`juel:${cid}:${pick}`, pool_value(pick) - take);
    era.set(`juel:${cid}:100`, negative() - take);
  }
}

/**
 * 结算表的行渲染。
 *
 * 基础行（0/1/2/3/7/12）：`XX点数：( 上次值 + 本次增量 )            = 结果`
 * ——阴核/私处/肛门/乳房(14)/习得/癖好(15)，无抵消列。抵消行（4/5/6/8/9/
 * 10/11）：`XX点数：( 上次值 + 本次增量 ) - 抵消量 = 结果`——上次值与
 * 抵消量读相殺前记进 TFLAG 的快照（51-53/55-57/58），结果读相殺后的
 * juel 现值。行尾竖线是每行的固定终止符。
 *
 * @param {number} cid 调教目标
 * @param {number} row 行号 0-12（结算表自上而下的第 N 行）
 */
function render_settlement_row(cid, row) {
  if (row <= 3 || row === 7 || row === 12) {
    // 基础行。行号 → juel 序号（3→乳房 14、12→癖好 15）
    const idx = row === 3 ? 14 : row === 12 ? 15 : row;
    // 癖好行读 CSTR:7（自定义癖好名，未定制/为空显示「癖好」）
    const fetish = era.get(`cstr:${cid}:7`);
    const label =
      row === 12
        ? `${fetish || '癖好'}点数：(`
        : `${era.get(`palamname:${idx}`)}点数：(`;
    const got = era.get(`gotjuel:${cid}:${idx}`) || 0;
    const now = era.get(`juel:${cid}:${idx}`) || 0;
    era.print([
      { content: label },
      { content: figure_indent(now - got), color: SKY_BLUE },
      { content: ' + ' }, // 纯文本、不着色
      { content: figure_indent(got), color: SKY_BLUE },
      { content: `)${NBSP.repeat(12)}= ` },
      { content: figure_indent(now), color: SKY_BLUE },
      { content: '|' },
    ]);
    return;
  }
  // 抵消行。行号 11 → TFLAG:58/否定 juel:100；
  // 其余 4/5/6/8/9/10 → TFLAG:(行号+47)/同名 juel
  const record = row === 11 ? 58 : row + 47;
  const idx = row === 11 ? 100 : row;
  const tflag = era.get(`tflag:${record}`) || 0;
  const got = era.get(`gotjuel:${cid}:${idx}`) || 0;
  const now = era.get(`juel:${cid}:${idx}`) || 0;
  era.print([
    { content: `${era.get(`palamname:${idx}`)}点数：(` },
    { content: figure_indent(tflag - got), color: SKY_BLUE },
    { content: ' + ' },
    { content: figure_indent(got), color: SKY_BLUE },
    { content: ') - ' },
    { content: figure_indent(tflag - now), color: LIGHT_SALMON },
    { content: ' = ' },
    { content: figure_indent(now), color: SKY_BLUE },
    { content: '|' },
  ]);
}

/**
 * juel_check_main：结算本体——梯子→加算→TFLAG 快照→相殺→
 * 结算表。渲染完成后把 gotjuel 清回 0（文件头的职责划分定案）。
 *
 * @param {number} cid 调教目标
 * @param {() => number} [rng] 相殺的随机源（返回池序号整数；
 *   缺省时均匀三选一，测试注入定值序）
 * @returns {number} 0（调用方不读）
 */
function juel_check_main(cid, rng) {
  // 参数 0-15 逐项过梯子 → GOTJUEL 配分
  for (let count = 0; count <= 15; count += 1) {
    const gain = palam_to_gain(era.get(`palam:${cid}:${count}`) || 0);
    if (count === 0) {
      // 阴核 + EX:0（阴蒂绝顶）× 1000
      era.set(`gotjuel:${cid}:0`, gain + (era.get(`ex:${cid}:0`) || 0) * 1000);
    } else if (count === 1) {
      // 私处 + EX:1（私处绝顶）
      era.set(`gotjuel:${cid}:1`, gain + (era.get(`ex:${cid}:1`) || 0) * 1000);
    } else if (count === 2) {
      // 肛门 + EX:2（肛门绝顶）
      era.set(`gotjuel:${cid}:2`, gain + (era.get(`ex:${cid}:2`) || 0) * 1000);
    } else if (count === 14) {
      // 乳房 + EX:3（乳房绝顶）
      era.set(`gotjuel:${cid}:14`, gain + (era.get(`ex:${cid}:3`) || 0) * 1000);
    } else if (count === 15) {
      // 局部 + EX:4（癖好绝顶）。Exp.yml 无 id 4，ex:4 读得 undefined
      // → 加成 0；癖好绝顶的落点随癖好调教工单
      era.set(`gotjuel:${cid}:15`, gain + (era.get(`ex:${cid}:4`) || 0) * 1000);
    } else if (count < 11) {
      // 3-10 原样落珠（3 润滑是死存储不落，见文件头）
      if (count !== 3) {
        era.set(`gotjuel:${cid}:${count}`, gain);
      }
    } else {
      // 11 反感 / 12 不快 / 13 抑郁 → 汇入否定（GOTJUEL:100 +=）
      era.add(`gotjuel:${cid}:100`, gain);
    }
  }

  // 现在保有する珠に今回獲得した珠を加算（3 润滑与 11-13 的
  // 本体不加——11-13 已汇入否定）
  for (const key of OWNED_JUEL_KEYS) {
    era.add(`juel:${cid}:${key}`, era.get(`gotjuel:${cid}:${key}`) || 0);
  }

  // 相殺前の珠を TFLAG:51-58 に記录（渲染的「上次值/抵消量」
  // 快照；count 3 跳过 → tflag:54 不写，juel:7 习得无抵消）
  for (let count = 0; count <= 6; count += 1) {
    if (count === 3) {
      continue;
    }
    era.set(`tflag:${count + 51}`, era.get(`juel:${cid}:${count + 4}`) || 0);
  }
  era.set('tflag:58', era.get(`juel:${cid}:100`) || 0);

  // 否定の珠による相殺（两个循环同构，参数化）
  offset_negative_group(cid, [4, 5, 6], rng); // 恭顺/欲情/屈服
  offset_negative_group(cid, [8, 9, 10], rng); // 耻情/苦痛/恐怖

  // 结算表头
  era.drawLine();
  const cancelled_total = era.get('tflag:58') || 0;
  era.print(
    `调教结果：${cancelled_total > 0 ? `否定点数${cancelled_total}个抵消。` : ''}`,
  ); // （无抵消时只有前缀）
  // 上一条输出与横线之间没有空行——不补 println（#595）
  era.drawLine();

  // 结算表 13 行
  for (let row = 0; row <= 12; row += 1) {
    render_settlement_row(cid, row);
  }
  era.drawLine();
  era.print('以上的点数变化了。');

  // —— 文件头定案的 gotjuel 清零：引擎 endTrain 的 gotjuel→juel 加算
  // 由此成为精确无操作（防双重累加），删表职责不受影响 ——
  for (const key of OWNED_JUEL_KEYS) {
    era.set(`gotjuel:${cid}:${key}`, 0);
  }
  return 0;
}

/**
 * run_juel_check：结算 + 能力值提高的交互循环。
 *
 * 输入循环以 for(;;) + 输入分发表达（先例 page-select-target）。
 * 循环内目标恒为进调教的那位（循环中无切换路径）。
 *
 * @returns {Promise<void>}（返回值无人读，不镜像）
 */
async function run_juel_check() {
  const target = era_flag.target;

  juel_check_main(target);
  await era.waitAnyKey();

  for (;;) {
    era.drawLine();
    show_info_exp(target);
    show_juel(target);
    // 自动升级点数（FLAG:5 位 35 置位时）：不进交互，直接收尾；
    // 三次 auto_ablup（目标 / 助手 assi>0 / 魔王）自 #467 起调真身
    // （ere/system/train/ablup.js 的 auto_ablup）
    if (getbit(era.get('flag:5'), 35)) {
      // auto_ablup 三连：目标 → 助手（仅 assi > 0）→ 魔王
      await auto_ablup();
      if ((era_flag.assi || 0) > 0) {
        await auto_ablup(era_flag.assi);
      }
      await auto_ablup(0); // 魔王恒为角色 0
      break;
    }
    await show_ablup_select(target); // `*` 标记要看 decide_ablup 的结果，故 await

    const result = await era.input(); // INPUT
    if (result === 999) {
      break; // 能力值提高结束
    }
    if (result in ABLUP_HANDLERS) {
      await ABLUP_HANDLERS[result](target); // 各能力分支（issue #464）
    }
    // 其余输入无分支命中 → 重绘再来
  }

  // 收尾三查，全数真身（check_specialskil 自 #565 接入）
  yokubo_up_check(target);
  await check_sellassiable(target);
  // check_specialskil(target, 1)（#565 起真身 ere/event/get-specialtalent.js；
  // 实参 1 = SEIIN——强制精饮绝顶次数超阈值时的档位判定用）
  await check_specialskil(target, 1);
}

module.exports = {
  ABLUP_IDS,
  ABLUP_HANDLERS,
  juel_check_main,
  offset_negative_group,
  palam_to_gain,
  run_juel_check,
};
