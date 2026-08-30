/**
 * @file T18 输出比对·差异归因规则（issue #48；#161 范围 B、#211 调教段
 * 全序列各自加 scope 规则组）。
 *
 * #9 的定案：忽略规则每条都要注明理由——否则忽略规则会逐渐变成掩盖缺陷
 * 的地毯。规则只认「有名字的差异」：
 *   - version：版本轴重设（ADR-0006）；
 *   - stub：docs/stub-registry.md 已登记的待办（存根占位行、指令族未移植
 *     的输出块与数值差、COM_ABLE 未移植导致的按钮未过滤、SHOW_USERCOM
 *     按钮组）与已登记的已知移植缺陷；
 *   - 其余一律 unexplained——真缺陷候选，当次比对必须归零或开票处置。
 *
 * 规则表是**白名单**形态：命中才豁免，改一个字就失配变红，逼改动者有
 * 意识地同步本表（与 #60 豁免名单同一设计哲学）。
 *
 * 【#213 起编号体系差豁免整组删除】#211 曾以 MENU_LABEL_SHIFT（四标签
 * 精确配对）+ VERSION_SKEW_IDS（裸编号兜底）豁免「ere 侧按钮印 L_I、
 * golden 侧印 L_IDX」的错位——#213 建了 L_IDX↔L_I 映射层（ere/system/
 * train/com-index.js），ere 侧按钮自此印紧凑序号，两侧编号一致，错位差异
 * 整组消失，两条豁免随之拆除（原文见 git 历史 / issue #213 回帖）。
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');

// —— @SHOW_USERCOM 的按钮组标签（docs/stub-registry.md「指令菜单按钮渲染」
//    行：[100]-[990] 组未挂载）。golden 侧出现这些标签 = 已登记待办 ——
const USERCOM_BUTTON_LABELS = new Set([
  '能力表示',
  '污秽表示',
  '交代助手',
  '对换调教',
  '避孕套设定',
  '爱抚系过滤',
  '器具系过滤',
  '私处性交系过滤',
  '肛门性交系过滤',
  'ＳＭ系过滤',
  '调教菜单登录',
  '调教菜单表示',
  '调教菜单实行',
  '调教结束',
]);

// —— 存根占位行的自报形状（ere/utils/stub-line.js 与 page 内联占位）——
// 存根占位行自愿声明「尚未移植」并给出原作函数名/清单出处；本项目所有
// 占位行都含这个词，正文台词不含（output-lang-lock 同款标准）。
const STUB_TEXT_RE = /尚未移植/;

// —— 状态条待办的 golden 侧键名（golden 侧 gauge 的存根归因）——
//   体力：**范围 B 三段（主菜单/存读档/日循环）的调教目标面板**——
//   DRAW_MAINMENU.ERB:100-145 的 @LIFE_BAR 调用点在 ere 侧是注释占位
//   （page-main-menu.js，随角色数据票），golden 的体力条无 ere 对应；
//   调教段（SHOW_STATUS :85）的体力/气力/射精（你）已随 #212 真身匹配、
//   不再吃本规则（首回合窗口 matched 57 为证）。气力/射精（你）当前无
//   golden 侧未匹配实例，留在集合里是给「同一函数的未实现调用点」兜底。
const STUB_GAUGE_KEYS = new Set(['体力', '气力', '射精（你）']);

// 【#228 整组拆除】此处原是服装系统的四条两态豁免（CLOTH_PREFIX 成对
// 两条 + STUB_TEXT_EXACT 两条）：PRINT_CLOTHTYPE/前缀自 #215（J5）起为
// 真身、COM110（穿脱）自 #228（J18）起为真身，两侧同形、豁免全部失效。
// 残余的「ere 侧多余【全裸】」改按重绘屏残余归因（classify_entry 内，
// 只认【全裸】——COM110 回归时当场 unexplained 变红）。

// —— 范围 B（#161）：主菜单/存读档/日循环三段的归因。全部受 scope 守卫
//    （context.scope === 'B'，由 cli 的 --sample 传入）——调教段比对不带
//    scope，一条规则都不触发，既有 122 条差异的归因计数零变化 ——
//
// 与调教段归因的本质差异：这里的多数条目不是「待办存根」，而是**两侧
// 已知的形态偏离**（ere 引擎/架构与 Emuera 的交互模型差异，均有出处）：
//   - 按钮化：ere 的 printButton 独占一行且引擎拼 [N] 前缀（PR #30/#53
//     通则），Emuera 的 PRINTBUTTON/PRINTFORM 按钮可与其他文本同行——
//     menu 条目与 text 残段的切分位置不同；
//   - 编号复用：主菜单与存读档画面共用 100-102/200/300 等编号（返回/调教
//     同为 100），menu 集合比对按 val 配对时跨画面异名条目互相错位，产生
//     成对差异——两侧该编号的实际内容都在事件流里，错位只是配对算法的
//     副产品；
//   - 清行：ere 引擎在屏幕有按钮时拒收非按钮输入（05-interaction.md:144）
//     等处逼出的清行与原作 CLEARLINE 的对应关系见 replay-b.js 的观测面节。
const B_MAINMENU_LABELS = new Set([
  '调教',
  '能力显示',
  '场子',
  '地下城',
  '处刑',
  '迎击',
  '能力值提升',
  '贩卖奴隶',
  '购物',
  '换装',
  '实验室',
  '设施·设备',
  '召唤',
  '休息',
  '保存',
  '读取',
  '设定',
  '通信',
]);
const B_MAINMENU_VALS = new Set([
  100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 120, 199, 200,
  300, 777, 888,
]);
// 存读档画面的操作按钮（与主菜单共用编号 100/101/102/200/300）
const B_SAVELOAD_LABELS = new Set([
  '上一页',
  '下一页',
  '返回',
  '为故事命名',
  '删除存档',
  '确定',
  '取消',
]);
// 全角数字网格行（GEO_OUTPUT_2 的地图输出：全角数字/＠出入口/凹凸标记，
// 逗号分隔—— Ere 侧 GEO_OUTPUT_2 未移植，stub-registry 在案）
const B_MAP_GRID_RE = /^[０-９＠凹凸]+(,[０-９＠凹凸]+)+,$/;
// 版本行（伪Ver93.106立绘版 / 伪Ver0.0.1立绘版——版本轴重设，ADR-0006）
const B_VERSION_LINE_RE = /^伪Ver\d+\.\d+(\.\d+)?立绘版$/;

/**
 * TrainCommand.yml 的全部编号（L_I 侧值域）与「L_IDX 位次 → L_I」的映射
 * （#213 起 ere 侧按钮印紧凑序号 L_IDX，归因前先映射回 L_I 判定在册）。
 * 规则用：ere 侧多出来的按钮只有（位次对应的）编号在册才可归因
 * 「COM_ABLE 未移植」；编号不在册（拼错/凭空）照样 unexplained。
 */
function load_traincommand_ids(
  repo_root = path.resolve(__dirname, '..', '..'),
) {
  const text = fs.readFileSync(
    path.join(repo_root, 'yml', 'TrainCommand.yml'),
    'utf8',
  );
  return new Set(
    [...text.matchAll(/"(.+)":\r?\n\s+id:\s*(\d+)/g)].map((m) => Number(m[2])),
  );
}

/**
 * L_IDX 位次 → L_I 的映射（离线等价物：全部非空 TRAINNAME 条目升序的
 * 下标，即 @SHOW_COMMENU 的 FOR L_I,0,300 + STRLENS 守卫；与 ere/system/
 * train/com-index.js 同源同法，独立推导作对账通道）。
 */
function load_traincommand_index_map(
  repo_root = path.resolve(__dirname, '..', '..'),
) {
  const ids = [...load_traincommand_ids(repo_root)].sort((a, b) => a - b);
  return new Map(ids.map((id, idx) => [idx, id]));
}

/**
 * 归因单条差异条目。
 *
 * @param {object} entry 差异条目（kind 同 normalize）
 * @param {'golden'|'ere'} side 条目所在侧
 * @param {object} context { traincommand_ids: Set<number>,
 *   traincommand_index_map?: Map<number, number>（L_IDX→L_I，缺省现读 yml）,
 *   counterpart?: 对侧同编号/同键条目（成对差异时给） }
 * @returns {{category: 'version'|'stub', reason: string} | null
 *   null = 无法归因（unexplained，真缺陷候选）}
 */
function classify_entry(entry, side, context) {
  // 范围 B（#161）的规则组先于调教段规则：scope 守卫保证其它比对
  // （无 scope）零触发；范围 B 内编号与调教规则的重叠（110 等）也由
  // 先到先得消解——范围 B 样本里 110 是主菜单的实验室按钮
  if (context.scope === 'B') {
    const hit = classify_scope_b(entry, side, context);
    if (hit) {
      return hit;
    }
  }
  // 调教段全序列（#211 第三段）的规则组：只在 scope === 'train'（cli 的
  // --sample train-* 传入）时生效——旧样本首回合比对（无 scope）与范围 B
  // 的计数零变化。组内未命中的条目落回下方的调教段通用规则（存根行、
  // COM_ABLE 未过滤等两份新样本同样消费）
  if (context.scope === 'train') {
    const hit = classify_scope_train(entry, side, context);
    if (hit) {
      return hit;
    }
  }
  const tc_ids = context.traincommand_ids ?? load_traincommand_ids();
  // #213 起 ere 侧方格按钮印 L_IDX：归因用的在册判定先映射回 L_I
  const idx_map =
    context.traincommand_index_map ?? load_traincommand_index_map();
  // ere 侧按钮编号的 L_I 解释（L_I 侧直接在册或经位次映射在册；golden 侧
  // 的方格编号本就是 L_IDX，同表映射）
  const l_i_of = (val) => (tc_ids.has(val) ? val : idx_map.get(val));

  if (entry.kind === 'menu') {
    // 【#213 拆除】此处原是 MENU_LABEL_SHIFT / VERSION_SKEW_IDS 的编号
    // 体系差豁免——映射层落地后两侧编号一致，整组删除（见文件头）
    if (side === 'golden' && USERCOM_BUTTON_LABELS.has(entry.key)) {
      return {
        category: 'stub',
        reason: `@SHOW_USERCOM 按钮组未挂载（${entry.key}，docs/stub-registry.md）`,
      };
    }
    if (
      side === 'ere' &&
      l_i_of(entry.val) !== undefined &&
      !USERCOM_BUTTON_LABELS.has(entry.key) &&
      // 编号与 golden 侧同一指令撞名（change 对）时必须由对侧规则归因：
      // golden 是按钮组标签 → 存根待办；否则同编号异名 = unexplained
      context.counterpart !== undefined &&
      USERCOM_BUTTON_LABELS.has(context.counterpart.key)
    ) {
      return {
        category: 'stub',
        reason: `触手系指令 ${entry.key} 未被 COM_ABLE 过滤（COM_ABLE 族未移植）`,
      };
    }
    if (
      side === 'ere' &&
      context.counterpart === undefined &&
      l_i_of(entry.val) !== undefined
    ) {
      return {
        category: 'stub',
        reason: `指令 ${entry.key}(${entry.val}) 未被 COM_ABLE 过滤（COM_ABLE 族未移植，随各自指令票）`,
      };
    }
    return null;
  }

  if (
    entry.kind === 'gauge' &&
    side === 'golden' &&
    STUB_GAUGE_KEYS.has(entry.key)
  ) {
    return {
      category: 'stub',
      reason: `${entry.key}条未移植（LIFE_BAR 调用点，docs/stub-registry.md）`,
    };
  }

  if (entry.kind === 'text') {
    if (side === 'ere' && STUB_TEXT_RE.test(entry.text)) {
      return {
        category: 'stub',
        reason:
          '存根占位行（ere/utils/stub-line.js 形状，docs/stub-registry.md）',
      };
    }
    // 服装行的重绘屏残余（#228 收口）：COM110（穿脱）已移植、
    // PRINT_CLOTHTYPE/前缀自 #215 起为真身——两侧同形，#211/#215 期的
    // 四条两态豁免（golden/ere 各两条）随之整组拆除。残余的 ere 侧
    // 多余【全裸】只可能来自 ere 多出的整屏重绘（train-upgrade 实证 1
    // 条：误执行 COM0 的多余回合，输入流错开一发，随 J19 消失）——
    // 其余屏行（状态头/参数条/按钮组）各有重绘归因，服装行在此补齐。
    // **只认【全裸】**：COM110 若回归（ere 不再扒光），ere 侧多出的是
    // 【紧身衣＆裙甲的姿态】、golden 侧多出【全裸】——两者都不在本条
    // 豁免内，当场 unexplained 变红
    if (side === 'ere' && entry.text === '【全裸】') {
      return {
        category: 'stub',
        reason:
          '服装行在 ere 侧多出的重绘屏（COM110 已移植、两侧同形；屏数差来自误执行 COM0 的多余回合，输入流错开一发，随 J19 消失）',
      };
    }
  }

  // —— 范围 B（#161）：主菜单/存读档/日循环的规则组（独立函数，由
  //    classify_entry 在 scope 守卫下优先调用） ——
  return null;
}

// —— 调教段全序列（#211 第三段）：train-natural / train-upgrade 的归因 ——
//
// 与范围 B 的本质差异：这里的差异主体是**指令族未移植的连带**。COM 族除
// COM0（爱抚）外全部是分发存根（com_family.call 返回 COM_MISSING → 回合
// 循环丢弃输入就地重绘），golden 侧 16+2 条指令的输出块（指令名回显/
// 实行值判定/情景与口上/源一览/算式/损耗/经验行）、参数累积（gauge）、
// 结算增量（calc 与结算表）与 PREVCOM 推进全部随之缺失。这批差异就是
// #210 阶段 4 的进度计：每张指令族票落地，对应差异自动消失、基线四数
// 变化（有意更新基线锁）——**不许用放宽本组的办法把它做小**。
//
// 两条已核的移植缺陷登记在案（随修正票，修好即从差异中消失）：
//   - SHOW_INFO_EXP 的经验名截断：原作 SUBSTRING 按显示宽度 8（= 4 个
//     全角字）截（golden「调教自慰」/「调教会话」见 train-natural-log:935-936），
//     ere 侧 page-info-exp.js 按字符数 slice(0, 8) 不截——名字长度差 2 字
//     （源 exp.csv 本名「调教自慰经验」/「调教会话经验」）；
//   - train-loop.js:164-168 把玩家输入直接当 SELECTCOM（L_IDX 缺映射层，
//     归 #213）：train-upgrade 的夺处女确认输入 0 被 ere 侧当指令 0 执行、
//     多出一整块爱抚输出。

// 源一览行：`阴核(1000)乳房(25)…` —— 名字(数字) 单元串联、无运算符
// （@SOURCE_CHECK 的「ソース確認」显示；源由各 @COMn 写入，未移植的指令
// 无源可显——ere 侧整行缺席）。判定行（`顺从LV1(4) + …`）带 ` + ` 结构，
// 不落本正则。
const TRAIN_SOURCE_LINE_RE = /^[^\s()+-]+(\(\d+\)[^\s()+-]*)+$/;
// 实行值判定行（两形态：算式尾行 `… = 29 > 实行值15`；跨行折断的首行
// `顺从LV1(4) + 抖M气质LV3(6) + …`——COMF 头部判定段，随族票）
const TRAIN_JUDGE_TAIL_RE = / = \d+ (>|<|=) 实行值\d+$/;
const TRAIN_JUDGE_HEAD_RE = /^(顺从|欲望)LV\d+\(\d+\) \+ /;
// 结算表行（@JUEL_CHECK_MAIN 已移植 #47）：`阴核点数：(    4759 +     1100)            =     5859|`
// 与抵消形态 `恭顺点数：(       0 +        1) -        1 =        0|`
const TRAIN_SETTLE_ROW_RE = /^[^\s()]+点数：\(.*= *\d+\|$/;
// 点数一览行（@SHOW_JUEL 已移植）：`阴核点数：  5859 私处点数：     0 …`
const TRAIN_JUEL_SUM_RE = /^[^\s:：]+点数：\s*\d+(\s+[^\s:：]+点数：\s*\d+)+$/;
// 经验一览行（@SHOW_INFO_EXP 已移植）：行首全角空格 + `绝顶经验:    13` 串联
// （归一化已压空白，匹配半角形态）
const TRAIN_EXP_SUM_RE = /^[^\s:：]{2,10}:\s*\d+(\s+[^\s:：]{2,10}:\s*\d+)*$/;
// 等级行与初吻/初体验括号行（SHOW_INFO_EXP 的尾段）
const TRAIN_LEVEL_RE = /^温妮当前是Lv\d+，战斗经验值总计/;
const TRAIN_KISS_RE = /^\[初(吻|体验)对象：/;
// 状态画面头两行（重绘屏族的锚：ere 侧无效输入回环多出的屏以此为头）
const TRAIN_STATUS_HEAD_RE = /^\d+日\((午前|午后)\)$|^温妮 调教中/;
// 绝顶计数行（SHOW_STATUS 的 EX 方括号段）
const TRAIN_EX_COUNT_RE = /^\[[^\]]*绝顶：\d+次\]$/;
// ABLUP 能力列表条目（ere 按钮化 PR #53 通则；golden 纯文本 `[ 0]阴蒂感觉 - LV 4`）
const TRAIN_ABLUP_ITEM_RE = / - LV \d+( \*)?$/;
// 【#228 拆除】此处原是 TRAIN_CLOTH_MENU_RE（穿脱子菜单条目，golden 侧
// ` [1] - 紧身衣＆裙甲上半身脱掉` 形状）：COM110（穿脱）落地后子菜单条目
// 两侧同形、转匹配，规则与常量随之删除。

// 未移植指令的输出块区间（golden 行号，含端点；样本只读故区间稳定）。
// 块 = 指令名回显起、下一屏状态行止；块内的情景/口上/判定/源一览/算式/
// 损耗/经验/绝顶行统一归「该指令未移植」。两次爱抚（COM0 已移植）的块
// 也在列：ere 侧因 PREVCOM 链断误入「连续执行同一指令」补正分支（×0.5
// 档），算式与源一览数值发散——同为指令族未移植的连带。
const TRAIN_UNIMPLEMENTED_BLOCKS = {
  'train-natural': [
    [90, 95], // @PRITRAIN_MESSAGE 消息体（第 13 次调教开场叙事与口上）
    [173, 173], // COM6 接吻的口上行（#219 起判定/B 文/算式全部匹配，仅台词随轴 B）
    [251, 274], // COM0 爱抚#2：连续补正误触发（PREVCOM 链断）
    [303, 324], // COM12 振动杖
    // COM1 舔阴（353-373）：B 文是 rand 变体口上（golden 实录的随机台词），
    // 重放侧 rand 序列不可对齐——口上票落地时按台词库重录样本再拆。
    [353, 373],
    [402, 422], // COM10 振动宝石
    // COM3 自慰（451-480）：同 COM1——rand 变体口上 + 随 COM_ABLE 过滤的
    // 回合结构差，随口上票重录。
    [451, 480],
    [509, 530], // COM12 振动杖
    [559, 579], // COM10 振动宝石
    [608, 627], // COM30 手淫（判定 + 情景 + 算式）
    [656, 681], // COM12 振动杖（含「阴蒂绝顶」段）
    [711, 724], // COM55 交谈（情景 + 经验行 + 算式）
    [756, 779], // COM0 爱抚#3：同爱抚#2
    [809, 829], // COM10 振动宝石
    [859, 880], // COM12 振动杖
    [912, 912], // K3 调教结束口上（EVENT_K3_高貴.ERB:829）
  ],
  // train-upgrade：COM110 穿脱 + COM8/COM84 升格链两块
  'train-upgrade': [
    [232, 236], // @PRITRAIN_MESSAGE 消息体
    // COM8 插入手指（300-332）：CASE 8 升格（PREVCOM==8 且技巧 3+ →
    // JUMP 84）在 golden 首次执行 COM8 的那回合触发，而 @COM84 未移植
    // → 本回合被丢弃、重新要求输入（输入 0 又成 SELECTCOM=0 爱抚），
    // 此后两侧输入流整体错开一发——golden 的夺处女确认（输入 0）与
    // 【处女丧失】序列因此单边。CONFIRM_LOST_VIRGIN 真身已随 #216+#219
    // 接线（单回合对齐由 com-caress 测试锚定）。块随 J19（COM84）拆除。
    [300, 332],
    [362, 388], // COM84 刺激Ｇ点（升格目标，@GET_ADV_COM 随 #213/J19）
    [420, 420], // K3 调教结束口上（421-423 的 RE_CLOTHED 行已随 #228 匹配）
  ],
};

/** golden 行号是否落在该样本的未移植指令块内 */
function in_unimplemented_block(sample, line) {
  return (TRAIN_UNIMPLEMENTED_BLOCKS[sample] ?? []).some(
    ([lo, hi]) => line >= lo && line <= hi,
  );
}

/**
 * 调教段全序列（#211 第三段）的归因规则组：只在 context.scope === 'train'
 * （cli --sample train-* 传入）时被 classify_entry 调用。规则依据见上方
 * 常量注释；未命中者落回调教段通用规则（菜单豁免桥、存根行等）。
 * @param {object} entry 差异条目
 * @param {'golden'|'ere'} side
 * @param {object} context { sample?: 'train-natural'|'train-upgrade',
 *   counterpart?: 对侧条目, traincommand_names?: Set<string> }
 * @returns {{category: 'version'|'stub', reason: string} | null}
 */
function classify_scope_train(entry, side, context) {
  const sample = context.sample;
  const tc_names = context.traincommand_names ?? load_traincommand_names();

  // 未移植指令块内的输入回显（train-upgrade 的 :304 = 夺处女确认吃进的
  // 那发 0——COM8 块整体错位时它是纯删除，与块内文本行同因；文本行的
  // 块吸收在下方 entry.kind === 'text' 组内）
  if (
    entry.kind === 'input' &&
    side === 'golden' &&
    in_unimplemented_block(sample, entry.line)
  ) {
    return {
      category: 'stub',
      reason: `指令输出块内的输入回显（train ${sample} log:${entry.line}）：交互随各自指令票`,
    };
  }

  // —— 数值路径：参数/结算/算式的 COM 族连带 ——
  if (entry.kind === 'gauge' && context.counterpart?.kind === 'gauge') {
    return {
      category: 'stub',
      reason: `参数条数值差：${entry.key} 的增量来自未移植指令（COM 族存根不结算，参数不累积——#210 阶段 4 逐票消费）`,
    };
  }
  // 误执行 COM0 的整窗插入：ere 侧某回合被丢弃后，重输的下一发输入 0 被
  // 当作 SELECTCOM=0——多出一整个爱抚回合窗口，此后两侧输入流整体错位。
  //
  // 回合被丢弃是**已移植代码的正确行为**：升格目标（COM84 等，随 J19）
  // 未注册时 @COM 落空，train-loop 按「未定义 → 重新要求输入」丢弃本回合
  // （com-family.js 的缺失哨兵，#213 定 / #228 与 #230 定 missing 与
  // cancelled 之分）。golden 侧那些指令都在，不丢弃，于是从此错开一发。
  // **不是 L_IDX↔L_I 映射缺陷**——com-index 的映射有 test/com-dispatch
  // 锁着；随升格目标落地（J19）本条自然消失。
  //
  // 窗口内的指令名/输入回显/A 文/损耗条是纯插入（对侧无同型条目可配对），
  // 与上方「误执行 COM0 的输出」（有对侧）同根同因
  if (side === 'ere' && context.counterpart === undefined) {
    if (
      (entry.kind === 'input' && entry.text === '0') ||
      entry.text === '爱抚' ||
      entry.text === '你轻舔着温妮的唇、仔细爱抚着温妮的身体……' ||
      entry.text === '温妮明确地感受到了快感、轻轻喘息着、发出了媚惑的呻吟。'
    ) {
      return {
        category: 'stub',
        reason:
          '误执行 COM0 的整窗插入：升格目标未移植使本回合被丢弃，重输的 0 成为 SELECTCOM=0（随 J19 落地消失）',
      };
    }
    if (entry.kind === 'lossbar') {
      return {
        category: 'stub',
        reason: '误执行 COM0 整窗的损耗条（同上，升格目标未移植）',
      };
    }
  }
  if (
    entry.kind === 'gauge' &&
    side === 'ere' &&
    context.counterpart === undefined
  ) {
    // ere 侧每条被丢弃的指令输入都就地重绘一屏（引擎「重新要求输入」
    // 语义），屏数多于 golden 的指令屏——多出屏的参数条在此归因
    return {
      category: 'stub',
      reason: `无效输入回环的重绘屏参数条（${entry.key}）：COM 未移植 → 输入被丢弃重绘，ere 侧屏数多于 golden`,
    };
  }
  if (entry.kind === 'calc') {
    return {
      category: 'stub',
      reason:
        '算式行数值差：增量来自未移植指令（COM 族存根不结算，#210 阶段 4 逐票消费）',
    };
  }
  if (entry.kind === 'lossbar' && side === 'golden') {
    return {
      category: 'stub',
      reason: '损耗行：未移植指令的体力/气力损耗（COM 族存根无 LOSEBASE 写入）',
    };
  }
  // 输入流错开一发的连带（train-upgrade）：golden 侧那一发 0 是给未移植
  // 指令的交互吃的（夺处女确认、或升格目标 COM84 落空后重新要求输入），
  // ere 侧没有那次交互 → 同一发 0 被当成 SELECTCOM=0（爱抚）执行。误执行
  // 的爱抚输出块（指令名/A 文/反应行/损耗条）在 ere 侧多出，对侧常是未移植
  // 指令（COM8/COM84）的输出。**不是 L_IDX↔L_I 映射缺陷**——映射有
  // test/com-dispatch 锁着；随 J19（COM84 等升格目标）落地本组消失
  if (
    side === 'ere' &&
    context.counterpart !== undefined &&
    in_unimplemented_block(sample, context.counterpart.line)
  ) {
    return {
      category: 'stub',
      reason:
        '误执行 COM0（爱抚）的输出：未移植指令的交互没吃掉那一发 0，它被当成 SELECTCOM=0（随升格目标 J19 落地消失）',
    };
  }
  if (side === 'ere' && entry.kind === 'lossbar' && context.counterpart) {
    return {
      category: 'stub',
      reason: '误执行 COM0 的损耗条（同上，输入流错开一发）',
    };
  }
  if (entry.kind === 'text') {
    // 「＜上次的调教指令：X＞」的数量与内容错位：ere 侧 PREVCOM 停留在
    // 最后一条真执行过的指令（COM 未移植不推进），两侧同名行数目不配
    if (/^＜上次的调教指令：.+＞$/.test(entry.text)) {
      return {
        category: 'stub',
        reason:
          '上次的调教指令行错位：未移植指令不推进 PREVCOM（ere 侧停留于最后真执行过的指令）',
      };
    }
    // 状态画面头两行出现在差异 = ere 侧多出的重绘屏（无效输入回环）
    if (side === 'ere' && TRAIN_STATUS_HEAD_RE.test(entry.text)) {
      return {
        category: 'stub',
        reason:
          '无效输入回环的重绘屏头行：COM 未移植 → 输入被丢弃重绘（ere 侧屏数多于 golden）',
      };
    }
    // ere 侧爱抚的连续补正标记与反应行档位：PREVCOM 链断的连带（golden
    // 的爱抚#2/#3 之间隔着未移植指令，非连续）
    if (
      side === 'ere' &&
      (entry.text === '＜连续执行同一指令＞' ||
        entry.text === '但温妮的身体却像被轻微电击一样、微微颤动着。')
    ) {
      return {
        category: 'stub',
        reason:
          '连续执行补正误触发：未移植指令不推进 PREVCOM，ere 侧爱抚被判为连续执行（×0.5 档与连续标记行）',
      };
    }
    // 同根的下游形态（#219 收口时暴露）：连续补正的 ×0.5 档让 ere 侧参数
    // 基线偏移，传到后续回合——A 文（TRAIN_MESSAGE_A）的档位文案随 UP:0
    // 漂移、刻印/顺从升降行随反感的偏移跨档。golden 侧无这些行（其基线
    // 未偏移），ere 侧单边多出。根因同上（PREVCOM 链断），随该票修复消失
    if (
      side === 'ere' &&
      (entry.text === '温妮承受着被舔的刺激、确实感觉到快感了。' ||
        /^获得.+刻印LV\d+$/.test(entry.text) ||
        /^(顺从|欲望|技巧|侍奉精神)下?升?降到?LV\d+$/.test(entry.text))
    ) {
      return {
        category: 'stub',
        reason:
          '连续补正数值漂移的下游：ere 侧参数基线偏移使反应行档位/刻印升降跨档（根因同上，PREVCOM 链断）',
      };
    }
    // 绝顶计数行：本场的绝顶由未移植指令（振动杖）触发，ere 侧无
    if (side === 'golden' && TRAIN_EX_COUNT_RE.test(entry.text)) {
      return {
        category: 'stub',
        reason:
          '绝顶计数行：本场绝顶来自未移植指令（参数不累积则不达绝顶阈值）',
      };
    }
    // 结算表/点数一览/经验一览：结算与显示本体已移植（#47），差在增量
    if (TRAIN_SETTLE_ROW_RE.test(entry.text)) {
      return {
        category: 'stub',
        reason:
          '结算表行的增量列差：参数增量来自未移植指令（结算本体已移植 #47，差随指令族票消失）',
      };
    }
    if (side === 'golden' && TRAIN_JUEL_SUM_RE.test(entry.text)) {
      return {
        category: 'stub',
        reason: '点数一览的数值差：同上，增量来自未移植指令',
      };
    }
    if (side === 'ere' && TRAIN_JUEL_SUM_RE.test(entry.text)) {
      return {
        category: 'stub',
        reason:
          '能力提升交互的完整重绘屏（ere 每轮重绘点数一览；golden 反馈屏不重绘）',
      };
    }
    if (TRAIN_EXP_SUM_RE.test(entry.text)) {
      return side === 'golden'
        ? {
            // 名字差（调教自慰 vs 调教自慰经验）与数值差（本场经验增量）
            // 两类混在同形态行里，统一归此类；名字差的具体缺陷见文件头登记
            category: 'stub',
            reason:
              '经验一览行差：本场经验增量来自未移植指令；经验名截断宽度（SUBSTRING 按显示宽度 8）是已登记移植缺陷，随修正票',
          }
        : {
            category: 'stub',
            reason:
              '能力提升交互的完整重绘屏（ere 每轮重绘经验一览；golden 反馈屏不重绘）',
          };
    }
    if (
      side === 'ere' &&
      (TRAIN_LEVEL_RE.test(entry.text) || TRAIN_KISS_RE.test(entry.text))
    ) {
      return {
        category: 'stub',
        reason: '能力提升交互的完整重绘屏（ere 每轮重绘等级行/初吻括号行）',
      };
    }
    if (side === 'golden' && /^调教结果：/.test(entry.text)) {
      return {
        category: 'stub',
        reason: '否定点数抵消量差：否定增量来自未移植指令（反感/不快/抑郁）',
      };
    }
    if (side === 'ere' && /^调教结果：/.test(entry.text)) {
      return {
        category: 'stub',
        reason: '同上：ere 半边（否定量 = ere 侧爱抚的反感/不快/抑郁增量）',
      };
    }
    if (/^使用中\(.+\)$/.test(entry.text)) {
      return {
        category: 'stub',
        reason:
          '装备一览头行（@SHOW_EQUIP_1，CHARA_INFO_SHOW ver1.1.2.ERB:1601）未移植，ere 侧为存根占位行',
      };
    }
    // ABLUP 交互的固定文案（golden 有、ere 是 ABLUP0 存根行）
    if (
      side === 'golden' &&
      (entry.text === '阴蒂的感度提升了。' ||
        entry.text === '未满足条件' ||
        entry.text.startsWith('阴蒂感觉越高') ||
        entry.text.startsWith('阴核点数×'))
    ) {
      return {
        category: 'stub',
        reason:
          '能力提升反馈行（@ABLUP0 升级处理未移植，ere 侧为 ABLUP0 存根）',
      };
    }
    // 源一览行（结构正则，见常量注释）
    if (TRAIN_SOURCE_LINE_RE.test(entry.text)) {
      return {
        category: 'stub',
        reason:
          '源一览行：源由未移植的 @COMn 写入（@SOURCE_CHECK 已移植，无源可显）',
      };
    }
    // 实行值判定行（COMF 头部判定段）。两种形态共用：未移植指令的判定段
    // 整体缺席（golden 侧）；已移植指令（#219 起 COM6/COM3）的折行形态差
    // ——ere 一次 print 一行，Emuera 日志按终端宽把同一行折成两物理段
    // （记名差异，同点线近似；数值逐字已由 #219 的判定行断言锚定）
    if (
      TRAIN_JUDGE_TAIL_RE.test(entry.text) ||
      TRAIN_JUDGE_HEAD_RE.test(entry.text)
    ) {
      return {
        category: 'stub',
        reason:
          '实行值判定行：判定段未移植（随指令族票）；已移植指令（#219 起 COM6/COM3）剩下的是终端折行形态差——ere 一次 print 一行，Emuera 日志按终端宽折成两物理段，数值逐字已由 #219 的判定行断言锚定',
      };
    }
    // 指令名回显：恰为一条 TrainCommand 名（ere 侧未移植指令无回显；
    // 已移植的 COM0「爱抚」两侧同名走 matched，不进差异）
    if (side === 'golden' && tc_names.has(entry.text)) {
      return {
        category: 'stub',
        reason: `指令名回显「${entry.text}」：@COMn 未移植（ere 侧无输出，随指令族票）`,
      };
    }
    // 指令名回显互异（train-upgrade）：ere 侧执行了爱抚、golden 侧是升格
    // 链的插入手指（同为 TrainCommand 名的成对差异）
    if (
      side === 'ere' &&
      tc_names.has(entry.text) &&
      context.counterpart !== undefined &&
      tc_names.has(context.counterpart.text ?? '')
    ) {
      return {
        category: 'stub',
        reason:
          '指令名回显互异：ere 侧执行了爱抚、golden 侧是升格链的插入手指（输入流错开一发的连带）',
      };
    }
    // golden 的初体验括号（本场 COM8 夺处女的记录，ere 侧无 COM8 不产生；
    // ere 侧的初吻行差已由上方 ABLUP 重绘屏规则接走）
    if (side === 'golden' && TRAIN_KISS_RE.test(entry.text)) {
      return {
        category: 'stub',
        reason:
          '初吻/初体验括号行：初体验记录由未移植的 COM8 写入（ere 侧只复现初吻半边）',
      };
    }
    // 未移植指令块内的叙述行/口上行（区间表见常量注释）
    if (side === 'golden' && in_unimplemented_block(sample, entry.line)) {
      return {
        category: 'stub',
        reason: `指令输出块（train ${sample} log:${entry.line}）：情景/口上/结算文案随各自指令票`,
      };
    }
  }
  if (entry.kind === 'menu') {
    // ABLUP 能力列表（ere 按钮化）与方格/子菜单的跨画面编号错位：方格用
    // L_IDX、本画面用 ABL 编号、穿脱子菜单另有编号——集合按 val 配对时
    // 跨画面异名条目互相错位（范围 B 的主菜单/存读档同构）
    if (TRAIN_ABLUP_ITEM_RE.test(entry.key)) {
      return {
        category: 'stub',
        reason:
          '能力值列表条目：与指令方格共用小编号空间的集合配对错位（方格 L_IDX / 本画面 ABL 编号；ere 按钮化 PR #53 通则）' +
          (side === 'ere' ? '——ere 半边' : '——golden 半边'),
      };
    }
    // 错位的 ere 半边：ere 方格/画面按钮（COM_ABLE 未过滤，101 条全渲染）
    // 撞上 golden 侧同编号的 ABLUP 行或穿脱子菜单行
    if (
      side === 'ere' &&
      context.counterpart !== undefined &&
      (TRAIN_ABLUP_ITEM_RE.test(context.counterpart.key) ||
        context.counterpart.key.startsWith('- '))
    ) {
      return {
        category: 'stub',
        reason: `指令方格按钮（${entry.key}[${entry.val}]）与能力值列表/穿脱子菜单的跨画面编号错位（ere 半边：COM_ABLE 未过滤全渲染）`,
      };
    }
    // ere 的 ABLUP 交互循环每次重绘完整列表（golden 的升级反馈屏只出
    // 反馈行与停止键，能力值提高结束行两侧出现次数不同）
    if (side === 'ere' && entry.key === '- 能力值提高结束') {
      return {
        category: 'stub',
        reason:
          '能力提升交互循环的形态差：ere 每次重绘完整列表，golden 的反馈屏只有反馈行（@ABLUPn 未移植的连带）',
      };
    }
    // ere 侧多出的方格屏（无对侧的调教结束按钮）：Emuera 的子菜单/确认
    // 屏（穿脱、夺处女）不重绘方格，ere 侧每输入一律整屏重绘（COM 未
    // 移植 → 子菜单形态缺席，train-upgrade 实证）。**同屏的整组按钮**
    // （[990] 调教菜单登录，#214 起挂载）跟随归因——它们与 999 同在
    // @SHOW_USERCOM 的按钮组里，多出的屏多出整组
    if (
      side === 'ere' &&
      context.counterpart === undefined &&
      entry.val === 999
    ) {
      return {
        category: 'stub',
        reason:
          'ere 侧多出的方格屏重绘：子菜单/确认屏形态未移植（COM 未移植 → 每输入一律整屏重绘）',
      };
    }
    if (
      side === 'ere' &&
      context.counterpart === undefined &&
      USERCOM_BUTTON_LABELS.has(entry.key)
    ) {
      return {
        category: 'stub',
        reason: `ere 侧多出的方格屏重绘带的按钮组条目（${entry.key}，与 [999] 同屏——归因同上一条）`,
      };
    }
    // golden 的 ABLUP 文本菜单行（`- 停止`、`- 阴核点数×…点数不足`）
    if (side === 'golden' && entry.key.startsWith('- ')) {
      return {
        category: 'stub',
        reason: '能力提升画面的文本菜单行（@ABLUPn 反馈与 [100] 停止键未移植）',
      };
    }
    // 升格标签（train-upgrade）：方格 8 号位的名字由 @GET_ADV_COM 升格
    // 决定（TRAIN_NAME 数组），ere 侧渲染静态名表的「插入手指」
    if (side === 'golden' && entry.key === '刺激Ｇ点') {
      return {
        category: 'stub',
        reason:
          '升格指令标签：@GET_ADV_COM 未移植（方格名字取 TRAIN_NAME 升格值，ere 侧为静态名，随 #213/J19）',
      };
    }
    if (
      side === 'ere' &&
      entry.key === '插入手指' &&
      entry.val === 8 &&
      context.counterpart?.key === '刺激Ｇ点'
    ) {
      return {
        category: 'stub',
        reason:
          '同上：升格标签差异的 ere 半边（静态名表 vs TRAIN_NAME 升格名）',
      };
    }
  }
  return null;
}

/** TrainCommand 名字域（指令名回显的判定用）：名字 → 编号的 Map，
 * classify_scope_train 取其键集；测试可经 context.traincommand_names 注入 */
function load_traincommand_names() {
  const text = fs.readFileSync(
    path.join(path.resolve(__dirname, '..', '..'), 'yml', 'TrainCommand.yml'),
    'utf8',
  );
  const map = new Map();
  [...text.matchAll(/"(.+)":\r?\n\s+id:\s*(\d+)/g)].forEach((m) =>
    map.set(m[1], Number(m[2])),
  );
  return map;
}

/**
 * 范围 B（#161）的归因规则组：只在 context.scope === 'B'（cli --sample
 * 传入）时被 classify_entry 调用。规则依据见文件头的 B_* 常量注释。
 * @param {object} entry 差异条目
 * @param {'golden'|'ere'} side
 * @param {object} context { counterpart?: 对侧同 kind 条目,
 *   segment?: 'mainmenu'|'saveload'|'daycycle'（比对段，daycycle 的
 *   兜底规则用——该段 @EVENTTURNEND 整段未移植，ere 侧无任何日循环输出） }
 * @returns {{category: 'version'|'stub', reason: string} | null}
 */
function classify_scope_b(entry, side, context) {
  {
    if (entry.kind === 'text') {
      if (
        side === 'golden' &&
        / (<<|>>)$/.test(entry.text) &&
        context.counterpart?.kind === 'text' &&
        // 成对豁免：对侧是同一行去掉按钮后缀的形态（ere 按钮独占一行）
        context.counterpart.text === entry.text.replace(/ (<<|>>)$/, '')
      ) {
        return {
          category: 'stub',
          reason:
            '折叠按钮与文本同行（Emuera）vs ere 按钮独占一行（PR #53 通则）——golden 侧带按钮后缀',
        };
      }
      if (
        side === 'ere' &&
        context.counterpart?.kind === 'text' &&
        [' <<', ' >>'].some(
          (suffix) => context.counterpart.text === entry.text + suffix,
        )
      ) {
        return {
          category: 'stub',
          reason:
            '同上：按钮同行差异的 ere 半边（按钮本体已按 menu 条目比对，见 val 8/9 规则）',
        };
      }
      if (side === 'golden' && entry.text === '邪恶正在蔓延………') {
        return {
          category: 'stub',
          reason:
            'Emuera 启动横幅（_replace.csv:17 起動時簡略表示），ere 引擎无对应物（引擎差异，非移植缺陷）',
        };
      }
      if (B_VERSION_LINE_RE.test(entry.text)) {
        return {
          category: 'version',
          reason: `版本轴重设（ADR-0006/#135）：样本 ${entry.text} vs 移植版自算版本号`,
        };
      }
      if (side === 'golden' && entry.text === '兼容性修正中……') {
        return {
          category: 'stub',
          reason:
            '@SYSTEM_LOADEND 载入结束函数未移植（#136 曾判死代码——样本实证引擎在 LOADDATA 后自动调用，勘误见 #161；移植随缺陷票）',
        };
      }
      if (side === 'golden' && entry.text === '[---]') {
        return {
          category: 'stub',
          reason:
            '条件入口灰条未渲染（DRAW_MAINMENU 指令面板段 :208-319 未移植，docs/stub-registry.md）',
        };
      }
      if (side === 'golden' && entry.text === '温妮') {
        return {
          category: 'stub',
          reason:
            '主菜单调教目标名按钮未移植（DRAW_MAINMENU.ERB:100-145，随角色数据票）',
        };
      }
      if (
        side === 'golden' &&
        (entry.text === '▌调教目标 ▌助手' ||
          entry.text === '▌物品/技能 ▌持有陷阱 ▌地城概况 ▌地城日常')
      ) {
        return {
          category: 'stub',
          reason:
            '原作纯文本行，ere 侧按钮化（menu_button，#23；Emuera 同行排版 vs ere 按钮独占行，PR #53 通则）',
        };
      }
      if (side === 'golden' && entry.text.startsWith('技巧Lv：')) {
        return {
          category: 'stub',
          reason:
            '物品/技能面板未移植（DRAW_HAVEITEMS，docs/stub-registry.md；ere 侧为占位行）',
        };
      }
      if (
        side === 'golden' &&
        (entry.text.includes('振动宝石') || entry.text.includes('润滑液'))
      ) {
        return {
          category: 'stub',
          reason:
            '物品/技能面板未移植（DRAW_HAVEITEMS 的物品行，docs/stub-registry.md）',
        };
      }
      if (B_MAP_GRID_RE.test(entry.text)) {
        return {
          category: 'stub',
          reason:
            '2D 地图输出未移植（GEO_OUTPUT_2，@EVENTTURNEND 的 FLAG:502 分支，docs/stub-registry.md）',
        };
      }
      // 主菜单状态行：199 休息是存根（BEGIN TURNEND 出口待办），不推进
      // 日期/时段——ere 侧三版主菜单的状态行都停在第 7 日上午，golden 侧
      // 是 午前→午后→次日午前
      if (
        /^第\d+年 \d+月\d+日（第\d+日） (上午|下午) \(所持金：\d+ pts\.\)$/.test(
          entry.text,
        )
      ) {
        return {
          category: 'stub',
          reason:
            '主菜单状态行：199 休息存根不推进日期/时段（BEGIN TURNEND 出口待办，docs/stub-registry.md）——ere 侧停在第 7 日上午',
        };
      }
      if (
        side === 'golden' &&
        entry.text === '你专心于内政，稍作了休息……（税金+5%）'
      ) {
        return {
          category: 'stub',
          reason:
            '休息（199）未移植：BEGIN TURNEND 出口待办（page-shop.js 的 199 分支，docs/stub-registry.md）',
        };
      }
      if (side === 'golden' && entry.text.includes('召唤出')) {
        return {
          category: 'stub',
          reason: '日循环的怪物召唤段未移植（@EVENTTURNEND，随回合结算票）',
        };
      }
      if (
        side === 'golden' &&
        entry.text === '出于对魔王的恐惧，勇者没有出现。'
      ) {
        return {
          category: 'stub',
          reason: '日循环的勇者判定段未移植（@EVENTTURNEND，随回合结算票）',
        };
      }
      if (side === 'golden' && entry.text.includes('売春判定')) {
        return {
          category: 'stub',
          reason: '日循环的売春判定段未移植（@EVENTTURNEND，随回合结算票）',
        };
      }
      if (side === 'ere' && entry.text === '----') {
        return {
          category: 'stub',
          reason:
            '读档界面空槽降为纯文本（page-save-load.js 有意偏离：原作 CHKDATA 拦下 = 不可选，ere 侧不按钮化——存档界面空槽仍是灰色按钮）',
        };
      }
      if (side === 'ere' && entry.text.startsWith('ERA魔王 年度版')) {
        return {
          category: 'stub',
          reason:
            '标题行输出（page-title.js 图片缺席的回退路径，#19；原作标题由图片承载、该行被注释）',
        };
      }
      // daycycle 段兜底（放具体规则之后）：@EVENTTURNEND 整段未移植
      //（199 存根），ere 侧无任何日循环输出——golden 侧无对侧的文本
      //（日事件/素质条件列表/星号分割线等）统一归此类。仅限无对侧条目：
      // ere 侧一旦输出了对侧（移植推进），该行自动脱离本规则
      if (
        side === 'golden' &&
        context.segment === 'daycycle' &&
        context.counterpart === undefined
      ) {
        return {
          category: 'stub',
          reason:
            '日循环（@EVENTTURNEND）未移植：199 存根无输出（docs/stub-registry.md 的 BEGIN TURNEND 行）',
        };
      }
      // 命名流程三行：ere 侧存档画面循环尾统一清行（滚动视图决策，
      // page-save-load.js 文件头「界面形态说明」）把命名行清掉了——原作
      // 命名后不清行（SYSTEM_DATA.ERB:212 被注释）、直接堆叠重画，黄金侧
      // 三行都在。已知形态差，非缺陷
      if (
        side === 'golden' &&
        (entry.text === '请输入一个名称故事：' ||
          entry.text === '对拍样本' ||
          entry.text.startsWith('将故事命名为'))
      ) {
        return {
          category: 'stub',
          reason:
            '故事命名流程行：ere 侧存档画面循环尾统一清行（滚动视图决策）vs 原作命名后堆叠（:212 注释掉 CLEARLINE）——行在 ere 观测面被清',
        };
      }
    }
    if (entry.kind === 'input' && side === 'ere' && entry.text === '0') {
      return {
        category: 'stub',
        reason:
          '标题读档分支的 CLEARLINE 1（清输入回显行）未镜像（#19 时认为 ere 输入无回显行；#68 实证引擎回显计行——补镜像随小票）',
      };
    }
    if (entry.kind === 'image' && side === 'golden') {
      return {
        category: 'stub',
        reason:
          '图片输出无 ere 对应（resource: false 未启用资源 + 主菜单立绘段未移植，docs/stub-registry.md）',
      };
    }
    if (entry.kind === 'menu') {
      if (entry.val === 8 || entry.val === 9) {
        return {
          category: 'stub',
          reason:
            '标题折叠按钮独占一行（PR #53 通则；Emuera 按钮与文本同行，ere 按钮逐行）',
        };
      }
      if ([496, 497, 500, 501, 504, 505].includes(entry.val)) {
        return {
          category: 'stub',
          reason: `主菜单入口按钮化（menu_button，#23；原作 ${entry.key} 为纯文本）`,
        };
      }
      if (B_MAINMENU_LABELS.has(entry.key) && B_MAINMENU_VALS.has(entry.val)) {
        return {
          category: 'stub',
          reason:
            `主菜单指令面板（DRAW_MAINMENU :208-319）：${entry.key}[${entry.val}] 未渲染` +
            (side === 'golden'
              ? '（ere 侧占位行）'
              : '（跨画面编号复用的配对错位半边）'),
        };
      }
      if (B_SAVELOAD_LABELS.has(entry.key)) {
        return {
          category: 'stub',
          reason:
            `存读档画面按钮 ${entry.key}[${entry.val}]：跨画面编号复用（主菜单/存读档共用 100-102/200/300）` +
            '的集合配对错位——两侧实际内容都在流内，次数差即真差异',
        };
      }
      if (side === 'golden' && entry.key === '----') {
        return {
          category: 'stub',
          reason:
            '空槽 [N] ----：读档界面的 ere 半边是纯文本（page-save-load.js 有意偏离：不可选即等价）——读档空槽不进 menu 集合，无 ere 对应条目',
        };
      }
      // 【#228 拆除】此处原是 <TS> 存档备注的错位归因规则：它补偿的是
      // 「按下标配对把两侧同形的备注条目错开」的假差异——diff.js 的 menu
      // 集合比对改为相等 token 先配后无消费者（删前实测：saveload 两样本
      // 四数逐数不变、unexplained 仍 0）。与服装四条两态豁免同一件事：
      // 根因修好，补偿它的规则必须同时拆除，否则留在表里空转
    }
  }

  return null;
}

module.exports = {
  B_MAINMENU_LABELS,
  B_SAVELOAD_LABELS,
  STUB_GAUGE_KEYS,
  STUB_TEXT_RE,
  TRAIN_ABLUP_ITEM_RE,
  TRAIN_JUDGE_HEAD_RE,
  TRAIN_JUDGE_TAIL_RE,
  TRAIN_SETTLE_ROW_RE,
  TRAIN_SOURCE_LINE_RE,
  TRAIN_UNIMPLEMENTED_BLOCKS,
  USERCOM_BUTTON_LABELS,
  classify_entry,
  classify_scope_b,
  classify_scope_train,
  load_traincommand_ids,
  load_traincommand_index_map,
  load_traincommand_names,
};
