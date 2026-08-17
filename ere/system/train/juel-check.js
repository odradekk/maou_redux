/**
 * @file 调教结束时的珠结算：@JUEL_CHECK 的交互循环与 @JUEL_CHECK_MAIN 的
 * 数值结算（issue #47——调教一回合里唯一的数值结算）。
 *
 * 源: target/ERB/調教相關/TRAIN_MAIN.ERB  @JUEL_CHECK（:435-549，一次性
 *     普通 CALL——@EVENTEND:421 调它，不是引擎回调、也不是每回合）
 *     @JUEL_CHECK_MAIN（:552-740，结算本体）
 *     @FIGURE_INDENT（:743-758，8 位右对齐的数字缩进）
 *
 * 画面侧两个子调用在 ere/page/ 下各自模块：@SHOW_INFO_EXP
 * （page-info-exp.js）与 @SHOW_JUEL / @SHOW_ABLUP_SELECT（page-ablup.js）。
 *
 * == 与引擎 endTrain() 的职责划分（#47 定案，依据 app.asar 的 endTrain 源码）==
 *
 * 引擎收尾 era.endTrain()（train-loop.js 的 run_aftertrain 在 @EVENTEND 链
 * **之后**调用，#44 钉死的顺序）做两件事：
 *   1. 对调教列里的每个角色，把 gotjuel 的**每一个键**加进 juel
 *      （`Object.entries(data.gotjuel[e])` 全键遍历）；
 *   2. 删掉调教域表（palam/gotjuel/tflag/ex/source/delta…）。
 * 原作 @JUEL_CHECK_MAIN 手写了同一件加算（:606-613），且其后的相殺与
 * 结算表渲染都要读**加算后**的 juel——这一步只能留在游戏侧（引擎的加算
 * 发生在链后、渲染之后，帮不上忙）。若两边都做，本次增量会翻倍。
 *
 * 定案：游戏侧 1:1 保留原作结算（梯子→加算→TFLAG 记录→相殺→渲染），
 * 渲染完成后把本模块写过的 gotjuel 键**清回 0**——引擎的加算成为精确
 * 无操作，删表职责不受影响。清 0 不会产生未定义键相加：引擎在
 * addCharacter/addCharacterForTrain 时已按 staticData.juel 名字表把
 * juel 与 gotjuel 的每个键预置为 0（app.asar 实证，initCharaTable 含
 * juel）。**gotjuel 的唯一写者是本模块**——后续票不得绕过：erauma 式
 * 的逐回合 gotjuel 累积不适用于本移植，结算模型是原作的一次性
 * PALAM→珠换算。
 *
 * 两处对原作的可证偏离（有意为之，勿「修回去」）：
 *   - :598 GOTJUEL:3 = GET_JUEL（润滑）是**死存储**：写入后全库无读者
 *     （加算循环 :607 跳过 3，显示表不出现润滑），引擎侧却会把非零的
 *     gotjuel:3 加进 juel:3、偏离原作——这笔写不落。
 *   - RAND:3（:627/:640）ere 无对应 API，默认均匀三选一（Math.random）；
 *     随机源以参数注入（juel_check_main / offset_negative_group 的 rng
 *     形参，RAND:3 语义 = 池序号整数），供测试钉死相殺的逐步数值，
 *     生产路径不传参。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { stub_line } = require('#/utils/stub-line');
const { show_info_exp } = require('#/page/page-info-exp');
const { show_ablup_select, show_juel } = require('#/page/page-ablup');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 对账钉死）；名单变动必须同步清单。ABLUPxx 是 @JUEL_CHECK 输入分发的
 * 全部目标（:463-539），升级规则本体超出本段代码（工单「不在范围」）。
 */
const ABLUP_IDS = [
  0, 1, 2, 3, 4, 10, 11, 12, 13, 14, 15, 16, 17, 20, 21, 22, 23, 30, 31, 32, 33,
  37, 39, 40, 99, 100,
];

const STUBBED_CALLS = [
  ...ABLUP_IDS.map((id) => `ABLUP${id}`),
  'AUTO_ABLUP',
  'YOKUBO_UP_CHECK',
  'CHECK_SELLASSIABLE',
  'CHECK_SPECIALSKIL',
];

// PALAMLV の初期値（Emuera 默认：_replace.csv 的该键被注释未启用——
// target/CSV/_replace.csv:74）。page-train.js 持有同源常量，system 侧
// 不 import page，各自持有
const PALAMLV = [
  0, 100, 500, 3000, 10000, 30000, 60000, 100000, 150000, 250000,
];

// :559-585 獲得珠の梯子：PALAM 低于上界时得对应珠。乘数（×3 / ×2）是
// 原作语义（PALAMLV:1*3 = 300 等）；梯子外（≥ PALAMLV:9）兜底 12000
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

// :606-613 的加算对象（0-10 去 3，另加 14/15/100）——也即文件头定案的
// gotjuel 清零对象：游戏侧结算碰过哪些键，收尾前就把哪些键清回 0
const OWNED_JUEL_KEYS = [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 14, 15, 100];

// SETCOLORBYNAME 的色名 → CSS hex（颜色片段直通渲染层，page-train 的
// #ff1493/#87cefa 先例）：SkyBlue → 三个读数列，LightSalmon → 抵消列
const SKY_BLUE = '#87cefa';
const LIGHT_SALMON = '#ffa07a';

/**
 * @FIGURE_INDENT（:743-758）：数字的 8 位右对齐缩进——原作按数量级逐档
 * 补空格（< 10^7 共 7 档），等价 padStart(8)。
 * @param {number} n
 * @returns {string}
 */
const figure_indent = (n) => String(n).padStart(8);

/**
 * :559-585 参数值 → 獲得珠的梯子判定。
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
 * GETBIT（Emuera 内建）：64 位按位取位。JS 位运算是 32 位、高位会回绕，
 * 改用除法取位（flag 位域是正整数）。
 * @param {number} value
 * @param {number} bit
 * @returns {boolean}
 */
function getbit(value, bit) {
  return Math.floor((value || 0) / 2 ** bit) % 2 === 1;
}

/**
 * $LABEL_1 / $LABEL_2（:626-637 / :639-649）：否定の珠による相殺。
 *
 * 两组池子（恭顺 4/欲情 5/屈服 6 与 耻情 8/苦痛 9/恐怖 10）各跑同一个
 * GOTO 循环：每轮随机挑一池，扣 min(否定余量的一半, 该池存量)——否定
 * 余量取半为 0 且未清零时改扣 1；直到否定清零或该组池子全空。习得
 * （juel:7）与两组之外的项目不参与抵消。
 *
 * **有意偏离：原作是 do-while，此处写成 while。** 原作的 `$LABEL_1` /
 * `$LABEL_2` 先执行循环体、再由 `SIF … GOTO` 判定（:626-637 / :639-649），
 * 所以「否定已清零」或「该组池子全空」时循环体仍会跑一遍。跑那一遍在珠值
 * 非负时是**数值上的空操作**：扣减量被 `SIF JUEL:(池) < LOCAL:1` 夹到 0，
 * 两笔 `-= 0` 不改变任何值——差别只在多出两笔同值写入。唯一不等价的情形
 * 是某个池子的珠值为**负**（原作会把负值当扣减量、反向加回两侧）；珠的
 * 来源只有加算与本函数的有界扣减，负值在正常存档里不可达，故按 while
 * 移植、不复刻这条退化路径。改回 do-while 会多出两笔空写、动到逐步写序
 * 的用例——真要复刻请连同用例一起改。
 *
 * 另：`take === 0 → take = 1` 这条最小扣减量不是排版细节，是**循环的终止
 * 条件**——去掉它，否定余量为 1 时永远扣 0，循环不退出（验收实测：整个
 * 测试文件挂死）。
 *
 * @param {number} cid 调教目标（原作隐式 TARGET）
 * @param {number[]} pools 参与抵消的 juel 序号组（长度 3，RAND:3 三选一）
 * @param {() => number} [rng] 池序号的随机源（RAND:3 的等价物：须返回
 *   [0, pools.length) 的整数；默认均匀三选一，测试注入定值序）
 */
function offset_negative_group(cid, pools, rng) {
  const pick_index = rng ?? (() => Math.floor(Math.random() * pools.length));
  const negative = () => era.get(`juel:${cid}:100`) || 0;
  const pool_value = (id) => era.get(`juel:${cid}:${id}`) || 0;
  // :636 / :648 SIF JUEL:100 > 0 && (组内三池之和) > 0
  while (
    negative() > 0 &&
    pools.reduce((sum, id) => sum + pool_value(id), 0) > 0
  ) {
    const pick = pools[pick_index()]; // RAND:3 + 4 / + 8
    let take = Math.floor(negative() / 2); // LOCAL:1 = JUEL:100 / 2
    if (take === 0) {
      take = 1; // :629-630 否定未清零时至少扣 1
    }
    if (pool_value(pick) < take) {
      take = pool_value(pick); // :631-632 池子存量不足就整池扣走
    }
    era.set(`juel:${cid}:${pick}`, pool_value(pick) - take); // :633
    era.set(`juel:${cid}:100`, negative() - take); // :634
  }
}

/**
 * 结算表的行渲染（:658-735）。
 *
 * 基础行（0/1/2/3/7/12）：`XX点数：( 上次值 + 本次增量 )            = 结果`
 * ——阴核/私处/肛门/乳房(14)/习得/癖好(15)，无抵消列。抵消行（4/5/6/8/9/
 * 10/11）：`XX点数：( 上次值 + 本次增量 ) - 抵消量 = 结果`——上次值与
 * 抵消量读相殺前记进 TFLAG 的快照（51-53/55-57/58），结果读相殺后的
 * juel 现值。行尾竖线是原作 `PRINTL |`（:728）的行终止符。
 *
 * @param {number} cid 调教目标
 * @param {number} row 行号 0-12（结算表自上而下的第 N 行）
 */
function render_settlement_row(cid, row) {
  if (row <= 3 || row === 7 || row === 12) {
    // :659-692 基础行。:660-666 行号 → juel 序号（3→乳房 14、12→癖好 15）
    const idx = row === 3 ? 14 : row === 12 ? 15 : row;
    // :667-674 癖好行读 CSTR:7（自定义癖好名，未定制/为空显示「癖好」）
    const fetish = era.get(`cstr:${cid}:7`);
    const label =
      row === 12
        ? `${fetish || '癖好'}点数：(`
        : `${era.get(`palamname:${idx}`)}点数：(`;
    const got = era.get(`gotjuel:${cid}:${idx}`) || 0;
    const now = era.get(`juel:${cid}:${idx}`) || 0;
    era.print([
      { content: label }, // :669/:671/:674
      { content: figure_indent(now - got), color: SKY_BLUE }, // :676-679
      { content: ' + ' }, // :681 PRINT  + （本行为纯文本、不着色）
      { content: figure_indent(got), color: SKY_BLUE }, // :682-685
      { content: ')            = ' }, // :687 PRINT ) + 12 空格 + "= "
      { content: figure_indent(now), color: SKY_BLUE }, // :688-691
      { content: '|' }, // :728 PRINTL |
    ]);
    return;
  }
  // :693-724 抵消行。:694-700 行号 11 → TFLAG:58/否定 juel:100；
  // 其余 4/5/6/8/9/10 → TFLAG:(行号+47)/同名 juel
  const record = row === 11 ? 58 : row + 47;
  const idx = row === 11 ? 100 : row;
  const tflag = era.get(`tflag:${record}`) || 0;
  const got = era.get(`gotjuel:${cid}:${idx}`) || 0;
  const now = era.get(`juel:${cid}:${idx}`) || 0;
  era.print([
    { content: `${era.get(`palamname:${idx}`)}点数：(` }, // :701
    { content: figure_indent(tflag - got), color: SKY_BLUE }, // :702-705
    { content: ' + ' }, // :707
    { content: figure_indent(got), color: SKY_BLUE }, // :708-711
    { content: ') - ' }, // :713 PRINT ) -
    { content: figure_indent(tflag - now), color: LIGHT_SALMON }, // :714-717
    { content: ' = ' }, // :719 PRINT  =
    { content: figure_indent(now), color: SKY_BLUE }, // :720-723
    { content: '|' }, // :728
  ]);
}

/**
 * @JUEL_CHECK_MAIN（:552-740）：结算本体——梯子→加算→TFLAG 快照→相殺→
 * 结算表。渲染完成后把 gotjuel 清回 0（文件头的职责划分定案）。
 *
 * @param {number} cid 调教目标（原作隐式 TARGET）
 * @param {() => number} [rng] 相殺的随机源（RAND:3 语义：返回池序号整数；
 *   缺省时均匀三选一，测试注入定值序）
 * @returns {number} 0（:740 RETURN 0，调用方不读）
 */
function juel_check_main(cid, rng) {
  // :558-601 FOR JUEL_COUNT, 0, 16：参数 → 獲得珠の梯子 → GOTJUEL 配分
  for (let count = 0; count <= 15; count += 1) {
    const gain = palam_to_gain(era.get(`palam:${cid}:${count}`) || 0);
    if (count === 0) {
      // :587-588 阴核 + EX:0（阴蒂绝顶）× 1000
      era.set(`gotjuel:${cid}:0`, gain + (era.get(`ex:${cid}:0`) || 0) * 1000);
    } else if (count === 1) {
      // :589-590 私处 + EX:1（私处绝顶）
      era.set(`gotjuel:${cid}:1`, gain + (era.get(`ex:${cid}:1`) || 0) * 1000);
    } else if (count === 2) {
      // :591-592 肛门 + EX:2（肛门绝顶）
      era.set(`gotjuel:${cid}:2`, gain + (era.get(`ex:${cid}:2`) || 0) * 1000);
    } else if (count === 14) {
      // :593-594 乳房 + EX:3（乳房绝顶）
      era.set(`gotjuel:${cid}:14`, gain + (era.get(`ex:${cid}:3`) || 0) * 1000);
    } else if (count === 15) {
      // :595-596 局部 + EX:4（癖好绝顶）。Exp.yml 无 id 4（原作 exp.csv
      // 即缺），ex:4 读得 undefined → 加成 0；癖好绝顶的落点随癖好调教票
      era.set(`gotjuel:${cid}:15`, gain + (era.get(`ex:${cid}:4`) || 0) * 1000);
    } else if (count < 11) {
      // :597-598 3-10 原样落珠（3 润滑是死存储不落，见文件头）
      if (count !== 3) {
        era.set(`gotjuel:${cid}:${count}`, gain);
      }
    } else {
      // :599-600 11 反感 / 12 不快 / 13 抑郁 → 汇入否定（GOTJUEL:100 +=）
      era.add(`gotjuel:${cid}:100`, gain);
    }
  }

  // :604-613 现在保有する珠に今回獲得した珠を加算（3 润滑与 11-13 的
  // 本体不加——11-13 已汇入否定）
  for (const key of OWNED_JUEL_KEYS) {
    era.add(`juel:${cid}:${key}`, era.get(`gotjuel:${cid}:${key}`) || 0);
  }

  // :615-624 相殺前の珠を TFLAG:51-58 に記录（渲染的「上次值/抵消量」
  // 快照；count 3 跳过 → tflag:54 不写，juel:7 习得无抵消）
  for (let count = 0; count <= 6; count += 1) {
    if (count === 3) {
      continue;
    }
    era.set(`tflag:${count + 51}`, era.get(`juel:${cid}:${count + 4}`) || 0);
  }
  era.set('tflag:58', era.get(`juel:${cid}:100`) || 0); // :624

  // :626-637 / :639-649 否定の珠による相殺（两个 GOTO 循环同构，参数化）
  offset_negative_group(cid, [4, 5, 6], rng); // $LABEL_1 恭顺/欲情/屈服
  offset_negative_group(cid, [8, 9, 10], rng); // $LABEL_2 耻情/苦痛/恐怖

  // :648-656 结算表头
  era.drawLine(); // :651 DRAWLINE
  const cancelled_total = era.get('tflag:58') || 0;
  era.print(
    `调教结果：${cancelled_total > 0 ? `否定点数${cancelled_total}个抵消。` : ''}`,
  ); // :652-654（无抵消时只有前缀，:655 PRINTL 空串收行）
  era.println(); // :655
  era.drawLine(); // :656 CUSTOMDRAWLINE ‥

  // :658-735 结算表 13 行
  for (let row = 0; row <= 12; row += 1) {
    render_settlement_row(cid, row);
  }
  era.drawLine(); // :736 CUSTOMDRAWLINE ‥
  era.print('以上的点数变化了。'); // :737

  // —— 文件头定案的 gotjuel 清零：引擎 endTrain 的 gotjuel→juel 加算
  // 由此成为精确无操作（防双重累加），删表职责不受影响 ——
  for (const key of OWNED_JUEL_KEYS) {
    era.set(`gotjuel:${cid}:${key}`, 0);
  }
  return 0; // :740 RETURN 0
}

/**
 * @JUEL_CHECK（:435-549）：结算 + 能力值提高的交互循环。
 *
 * $INPUT_LOOP_1 的 GOTO 循环以 for(;;) + 输入分发表达（先例
 * page-select-target）。循环内目标恒为进调教的那位（原作隐式 TARGET，
 * 循环中无切换路径）。
 *
 * @returns {Promise<void>}（:546 RETURN 1 的 RESULT 无人读，不镜像）
 */
async function run_juel_check() {
  const target = era_flag.target;

  juel_check_main(target); // :437 CALL JUEL_CHECK_MAIN
  await era.waitAnyKey(); // :440 WAIT

  // $INPUT_LOOP_1 :443-549
  for (;;) {
    era.drawLine(); // :444 CUSTOMDRAWLINE ‥
    show_info_exp(target); // :445 CALL SHOW_INFO_EXP
    show_juel(target); // :446 CALL SHOW_JUEL
    // :449-458 自动升级点数（:450 IF GETBIT(FLAG:5,35)）：不进交互，直接
    // 收尾。:452-455 的三次 AUTO_ABLUP（TARGET / ASSI>0 / MASTER）共享一行占位
    if (getbit(era.get('flag:5'), 35)) {
      stub_line('AUTO_ABLUP', '自动能力提升（目标/助手/魔王三连）');
      break; // :457 GOTO LABEL_EXIT
    }
    show_ablup_select(target); // :459 CALL SHOW_ABLUP_SELECT

    const result = await era.input(); // :461 INPUT
    if (result === 999) {
      break; // :540-541 → $LABEL_EXIT（能力值提高结束）
    }
    if (ABLUP_IDS.includes(result)) {
      // :463-539 各能力分支（升级规则本体欠账，随能力提升票）
      stub_line(`ABLUP${result}`, '能力提升处理');
    }
    // 其余输入无分支命中 → :549 GOTO INPUT_LOOP_1（重绘再来）
  }

  // $LABEL_EXIT :541-546：收尾三查（各占位一行）
  stub_line('YOKUBO_UP_CHECK', '欲情变化检查'); // :542
  stub_line('CHECK_SELLASSIABLE', '可售判定'); // :543
  stub_line('CHECK_SPECIALSKIL', '特殊技能获得检查'); // :544
  // :545 LOCAL = TARGET —— CALL 方传 RESULT 的暂存，无人读，不镜像
}

module.exports = {
  ABLUP_IDS,
  STUBBED_CALLS,
  juel_check_main,
  offset_negative_group,
  palam_to_gain,
  run_juel_check,
};
