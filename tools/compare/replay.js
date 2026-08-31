/**
 * @file T18 输出比对·ere 侧回放器（issue #48，验证决议 #9）。
 *
 * 比对起点的裁定（工单留给这张票的第一个设计问题）——**手工播种等价角色**，
 * 不解析 target/Sav/save00.sav。依据（详见 docs/output-diff.md 与 #48 评论）：
 *
 *   1. 首回合的全部初始值**可从日志自身推导**：PALAM 初值 = 算式行的 from
 *      侧；BASE 初值 = 回合后状态条 + 损耗值回推；ABL/素质/刻印 = 源一览
 *      与换算结果的反解（下方种子表逐条注明证据行）。
 *   2. save00.sav 与日志窗口的**时间对齐关系不可知**（日志是环形缓冲尾部
 *      5000 行、存档是同场次的某一时刻），解析它得到的不是「窗口起点」；
 *      二进制格式解析还是独立工作量，解析器自身的 bug 会伪装成比对噪音
 *      （#9 原型的教训）。
 *   3. 播种复用 #16 夹具的既有机制（seed_chara + store 预置），零新增
 *      采集机制；每个种子值带证据注释，本身就是可审计的产物。
 *
 * 回放形态：模拟「中途加入一场进行中的调教」——先 beginTrain 开火车表
 * （三段寻址守卫放行）、播种 mid-session 状态、再驱动真实 run_train。run_train
 * 头部的引擎初始化（PREVCOM = -1 等）由此成为「本场已开的调教」的无操作
 * 重放，不影响窗口：窗口从**第一次输入**起算，而首屏在窗口之外。
 *
 * 随机源：K3 口上的随机三支以定值 Math.random 固定到黄金样本选中的一支
 * （RAND_FIX ∈ [1/3, 1/2)：rand(3)≠0 且 rand(2)==0，即 :1097 台词）。
 * 这是回放层的确定性措施，不触碰游戏代码（rand 参数注入只到测试层，
 * SOURCE_CHECK 的真实调用链不传参）。
 */

'use strict';

const { create_era_fixture } = require('../../test/helpers/era-fixture');
const { parse_name_ids } = require('./assertions');
const { snapshot_from_store } = require('./snapshot');

// K3 随机三支：floor(0.4*3)=1≠0、floor(0.4*2)=0 → 命中 :1097（黄金样本行）
const RAND_FIX = 0.4;

/** 回放要装载的调教路径模块（引擎装载 ere/ 全部文件；夹具按路径装子集）。
 * 末两项（@EVENTEND 与 @JUEL_CHECK）只被全序列回放（#211 第三段）消费：
 * 旧样本首回合以 999 出循环、不进 AFTERTRAIN，装载对它无输出影响。 */
const TRAIN_PATH_MODULES = [
  'event/event-train',
  'event/event-com',
  'event/event-comend',
  'event/event-end',
  'event/source-check',
  'kojo/kojo-k3-noble',
  'page/page-train',
  'page/page-usercom',
  'system/train/com-caress',
  'system/train/com-toy',
  'system/train/com-sex',
  'system/train/com-service',
  'system/train/com-sm',
  'system/train/com-hardcore',
  'system/train/com-special',
  'system/train/com-cloth',
  'system/train/com-colosseum',
  'system/train/com-advanced',
  'system/train/juel-check',
  'system/train/train-message',
];

/**
 * 温妮的世界底座：每个种子值都注明黄金样本证据（行号 = target/emuera.log）。
 * 不写的键 = 维持未写（读值得 0/undefined），未写本身也是证据的一部分
 *（如无快感否定素质 → 日志无抑鬱行）。
 * @param {object} fixture
 */
function seed_winnie_world(fixture) {
  // —— 角色：你（0，魔王/男人）与 温妮（31，调教对象，高貴性格）——
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  fixture.seed_chara(31, { id: 31, name: '温妮', callname: '温妮' });
  fixture.era.addCharacter(31);
  // TALENT:0:122（男人）：黄金样本爱抚回合无「百合经验+5」行（COM0 的
  // 百合分支要求双方皆女），正向证据主人是男人
  fixture.store.set('talent:0:122', 1);

  // —— 火车表先开：播种的是「进行中的调教」，三段寻址（palam 等）要求
  //    表已建且角色入列（夹具镜像引擎守卫）。run_train 内部的 beginTrain
  //    再调是幂等无操作 ——
  fixture.era.beginTrain(0, 31);

  // —— FLAG:5 = 开局值（@EVENTFIRST，event-first.js:110；录制会话新档）。
  //    bit34 = 1 → SHOW_USERCOM 走自定义菜单支（#214 渲染分流；依据见
  //    seed_train_world 的同款播种注）——
  fixture.store.set('flag:5', 17179934119);

  // —— PALAM 初值（算式行 from 侧 + 首屏条形，log:34-44 / log:1-4 / log:52-57）——
  const PALAM_SEED = [
    [0, 5240], // 阴核 5240+300=5540（log:34）
    [1, 0], // 私处：回合后网格 0（log:52）
    [2, 0], // 肛门：同上
    [3, 2854], // 润滑 2854+61=2915（log:37）
    [4, 6], // 恭顺 6+1=7（log:39）
    [5, 2378], // 欲情 2378+47=2425（log:40）
    [6, 100], // 屈服：首屏 [==........] 100（log:1），本回合无算式行
    [7, 204], // 习得 204+34=238（log:41）
    [8, 1654], // 耻情 1654+70=1724（log:42）
    [9, 0], // 苦痛：网格 0
    [10, 0], // 恐怖：同上
    [11, 3379], // 反感 3379+50=3429（log:44）
    [12, 0], // 不快：同上
    [13, 24], // 抑郁：首屏 [--........] 24（log:3），无算式行
    [14, 42], // 乳房 42+7=49（log:35）
    [15, 0], // 局部：网格 0
  ];
  PALAM_SEED.forEach(([id, v]) => fixture.store.set(`palam:31:${id}`, v));

  // —— BASE/MAXBASE（回合后状态条 + 损耗回推：log:48-49 的 (1445/2000)
  //    (360/2000) 加上损耗条 -5/-50（log:32-33）——
  fixture.store.set('maxbase:31:0', 2000);
  fixture.store.set('maxbase:31:1', 2000);
  fixture.store.set('base:31:0', 1450); // 1445 + 5
  fixture.store.set('base:31:1', 410); // 360 + 50

  // —— ABL（源一览 log:31 的反解，见 docs/output-diff.md 推导表）——
  fixture.store.set('abl:31:0', 3); // 阴蒂感觉 LV3：阴核(300) = 1200档/2(初吻)×0.5(技巧0)
  fixture.store.set('abl:31:1', 0); // 乳房感觉 LV0：乳房(7) = 15档×0.5
  fixture.store.set('abl:31:11', 1); // 欲望 LV1：欲情+47 = 300×0.15 + 7×0.15 + 31×0.05
  // 其余 ABL 不写 = 0：习得+34 = 60×0.6×0.95 证 技巧/施虐/嗜虐 0；
  // 恭顺 +1 = 31×0.1×0.95×0.7(刻印) 证 顺从/侍奉 0；露出 0 支证 露出癖 0

  // —— 素质/刻印/CFLAG（文本与换算的反解）——
  fixture.store.set('talent:31:163', 1); // 高貴（K3 口上：台词 log:26 出自 EVENT_K3_高貴.ERB:1097）
  // TALENT:31:76/85 不写：K3 走 2xx 支（无淫乱/爱慕台词）
  // TALENT:31:32/34/71 不写：无抑鬱算式行（快感否定会产出 UP:13）
  // 体型/肤色（135/100/115/244/253/255）不写：B 文无描述段（log:25）
  fixture.store.set('mark:31:3', 1); // 反抗刻印LV1：恭顺 +1 的 0.7 系数（否则 +2）
  fixture.store.set('mark:31:4', 1); // 反抗刻印取次位（MARK_GOT 的升格判据用）
  // MARK:31:2（屈服刻印）不写 = 0：K3 2xx 支门槛 MARK:2 <= 1
  fixture.store.set('cflag:31:16', -1); // 初吻未体験：无「轻舔着」前缀 + 不潔被清零 + 阴核/2
  fixture.store.set('cflag:31:301', 203); // K3 状态机已推进到随机三支（台词 :1097）
  // CFLAG:31:2（好感）不写 = 0：情爱(31) 未吃到 ≥100 档的 ×1.1
  // —— 服装（#215 J5；#219 复核修正）：旧样本首回合的爱抚行带「隔着紧身
  //    衣＆裙甲、」前缀（emuera.log:25）、状态屏【紧身衣＆裙甲的姿态】
  //    （emuera.log:50）为证——外衣在身。但 emuera.log:7-9 的首屏方格
  //    **列着舔阴[1]/自慰[3]/插入手指[8]/舔肛[9]**（着衣时 COM_ABLE 的
  //    内裤位判定会滤掉它们，对照 train-natural:109 同为穿衣态首屏、方格
  //    无舔阴）→ 旧样本世界是「有外衣、无内衣」：CFLAG:40 = 12（上着 4 |
  //    裙 8，内裤 1 / 胸罩 2 / 下装 16 不在）、FLAG:37 = 1、紧身衣＆裙甲
  //    （41 = 5）。#215 初版种 15（含内衣位）是把两份样本的着衣态混同
  fixture.store.set('flag:37', 1);
  fixture.store.set('cflag:31:41', 5);
  fixture.store.set('cflag:31:40', 12);

  // —— 道具持有（#274：com-toy 进回放清单后才有指令读它）——
  //    golden 的指令方格里只出现 振动宝石[10] 与 振动杖[12]，11 / 13-19
  //    一次都没有 → NOITEM 关闭，玩家恰好持有这两件（Item.csv:0 振动宝石、
  //    :2 振动杖）。种多一件都会让方格多出 golden 没有的条目。
  fixture.store.set('item:0', 1);
  fixture.store.set('item:2', 1);

  // —— EX / 世界指针 ——
  fixture.store.set('ex:31:0', 1); // [阴蒂绝顶：1次]（log:51）
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.day_count = 2; // 3日（log:46：DAY+1 = 3）
  era_flag.time = 1; // (午后)（log:46）
  era_flag.target = 31;
  era_flag.assi = -1; // 无「助手:名」段（log:47），调教者 = 主人

  // —— 静态名表：实机由引擎装载 yml/ 时注入，夹具不读 yml/（静态表正确性
  //    另有 chara-yml / variable-yml 比对），回放按同一产物补进 store ——
  //    消费点：print_palam（palamkeys/palamname）、指令按钮与「上次的调教
  //    指令」（traincommandname）、palam_up_check 的算式名（palamname）。
  const palam = parse_name_ids('yml/Palam.yml');
  fixture.store.set(
    'palamkeys',
    [...palam.values()].sort((a, b) => a - b),
  );
  palam.forEach((id, name) => fixture.store.set(`palamname:${id}`, name));
  parse_name_ids('yml/TrainCommand.yml').forEach((id, name) =>
    fixture.store.set(`traincommandname:${id}`, name),
  );
}

/**
 * 回放调教首回合（输入 0 爱抚），返回两侧比对所需的全部素材。
 *
 * 输入标记：包装 fixture.era.input，输入返回后向 lines 压一条 {type:
 * 'input'} 标记——与输出行精确交错（归一化器据此切窗口）。行数的计法由
 * 夹具的计数器镜像（#68 整改：input() 回显默认 +1 Row，三段短路逐字
 * 对齐引擎），标记只是条目层的比对注记——不带 row、不推回显条目：条目
 * 层若再记一行回显，会与标记各产生一次 input 事件，把比对窗口的输入
 * 边界翻倍。SET_CLEAR_POINT 的 tflag:999 本就在快照忽略清单。
 *
 * @returns {Promise<{fixture: object, next_state: string,
 *   before: Record<string, any>, after: Record<string, any>}>}
 */
async function replay_first_turn() {
  const fixture = create_era_fixture();
  const original_random = Math.random;
  Math.random = () => RAND_FIX;
  const original_input = fixture.era.input;
  fixture.era.input = async () => {
    const value = await original_input();
    fixture.lines.push({ type: 'input', text: String(value) });
    return value;
  };
  try {
    seed_winnie_world(fixture);
    TRAIN_PATH_MODULES.forEach((name) => fixture.load_module(name));
    const before = snapshot_from_store(fixture.store);
    fixture.set_inputs(0, 999); // 首回合指令 0（爱抚），999 收尾出循环
    const { run_train } = fixture.load_module('system/train/train-loop');
    const next_state = await run_train();
    const after = snapshot_from_store(fixture.store);
    return { fixture, next_state, before, after };
  } finally {
    Math.random = original_random;
    fixture.era.input = original_input;
  }
}

// —— #211 第三段：train-natural / train-upgrade 的全序列回放 ——
//
// 与 replay_first_turn（旧样本首回合）的三点形态差异，裁定依据都在 #211：
//
// 1. **随机源是序列不是常数**。两份新样本的 K3 口上不消费随机——save99 的
//    FLAG:7 = 1（口上「阶段推进」模式）且 CFLAG:301 已停在 2xx 段末尾，
//    两次爱抚均无台词（train-natural-log:122-126 / 253-257 的实证：只有
//    TRAIN_MESSAGE 的 A 文，无口上行）；随机消费点只剩 @JUEL_CHECK 相殺的
//    RAND:3 六连掷（juel-check.js 的 offset_negative_group）。池序号序列
//    从黄金样本的相殺终态反推（见 TRAIN_RAND_SEQ 各条注释），常数
//    RAND_FIX 产不出这种序列，回放层按序注入（[0,3) 的池序号 → 取
//    (pick + 0.5) / 3，落在目标区间的内部、不贴边）。
// 2. **输入走 useRule:false 通道**（replay-b 裁定 2 的沿用）：结算段的
//    [100] 停止键在 ere 侧 SHOW_ABLUP_SELECT 未渲染（page-ablup.js），夹具
//    白名单会拦下 Emuera 世界合法的输入；流程错位由事件流比对暴露。
// 3. **比对流 = lines_history 全量**（replay-b 观测面的沿用）。调教段的
//    golden 日志是纯追加历史（17 屏状态屏 + 指令块全在，train-natural
//    实证——原作 @SET_CLEAR_POINT/@CLEAR_TO_POINT 的清行不反映进日志）；
//    ere 侧 ScreenBlock 的自建清行条目因此保留，与 golden 同构。
//    仍包装 clear 按「原作 CLEARLINE 对应」剔除（调教段现为空集），未来
//    画面组件镜像原作清行时观测面自动正确。

// 相殺池序号序列（pools [4,5,6] 与 [8,9,10] 共用同一注入序：第二组在
// 否定清零后不进循环，train-natural 实证只有第一组消费）。
// 反推方法：golden 结算行的「(上次值 + 增量) - 抵消 = 结果」给出各池终态，
// 扣减量必为 take = floor(negative/2) 的逐步序列（余量取半、池尽整扣、
// 余 1 兜底扣 1），唯一分解出每轮选中的池。
const TRAIN_RAND_SEQ = {
  // train-natural-log:919-925：否定 23；屈服 697→676（-21 = 11+6+3+1）、
  // 恭顺 1→0（整池扣 1）、欲情 38→37（兜底扣 1）——六掷 [屈服,屈服,屈服,
  // 屈服,恭顺,欲情] = 池序号 [2,2,2,2,0,1]
  'train-natural': [2, 2, 2, 2, 0, 1],
  // train-upgrade-log:427-438：否定 20；屈服 677→661（-16 = 10+5+1）、
  // 欲情 38→34（-4 = 2+1+1）——六掷 [屈服,屈服,欲情,屈服,欲情,欲情] =
  // 池序号 [2,2,1,2,1,1]
  'train-upgrade': [2, 2, 1, 2, 1, 1],
};

// 调教窗口内的输入序列（golden 样本的输入回显，去掉窗口外的标题/读档/
// 主菜单与尾部日程推屏；ere 回放从 run_train 起跑，序列一一对应）。
const TRAIN_INPUT_PLANS = {
  // train-natural.log 的输入：0/6/89/(7 穿脱子菜单)/0/12/1/10/3/12/10/30/
  // 12/55/0/10/12 = 16 条指令，999 调教结束，0/0/100/999 = 升级尝试两次、
  // 停止、能力值提高结束
  'train-natural': [
    0, 6, 89, 7, 0, 12, 1, 10, 3, 12, 10, 30, 12, 55, 0, 10, 12, 999, 0, 0, 100,
    999,
  ],
  // train-upgrade.log：89 穿脱、7 全部扒光、8 插入手指、0 夺处女确认、
  // 8（升格为刺激Ｇ点 COM84）、999 调教结束、999 能力值提高结束
  'train-upgrade': [89, 7, 8, 0, 8, 999, 999],
};

// golden 事件流中调教窗口的起点：第 offset 次输入（0 起）之前的那次输入
// 是「主菜单选 100 进调教」，窗口从它的下一条输出起（首屏在窗口内）。
const TRAIN_GOLDEN_INPUT_OFFSET = {
  'train-natural': 2, // 99（读档）、100（进调教）之后
  'train-upgrade': 7, // 99、9999、101、0、100、999、100（进调教）之后
};

// 置位串（meta.json 的 seed_string；train-natural 自然态为空）
const TRAIN_SEEDS = {
  'train-natural': {},
  'train-upgrade': { 'abl:0:12': 3 },
};

/**
 * 播种 save99 的调教起点世界（第 7 日午前，温妮第 13 次调教）。
 * 每个种子值都注明 golden 侧证据（行号 = golden/train-natural.log；
 * train-upgrade 与其同一存档录制，起点状态一致）。
 *
 * 播种取值原则：**让 ere 侧已实现路径的输出与 golden 逐字一致**。经验/
 * 珠的存量按结算屏的显示值播（golden 显示的是「存量 + 本场增量」，ere 侧
 * 未移植的指令不产生增量，播显示值恰好复现显示行）；档位内不可知的具体
 * 值（好感）取档内代表值——已实现路径只消费档位。
 *
 * @param {object} fixture
 * @param {'train-natural'|'train-upgrade'} sample
 */
function seed_train_world(fixture, sample) {
  // —— 角色与身份 ——
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  fixture.seed_chara(31, { id: 31, name: '温妮', callname: '温妮' });
  fixture.era.addCharacter(31);
  // TALENT:0:122（男人）：判定行与结算无百合/断背向经验（train-natural-log:935-936）
  fixture.store.set('talent:0:122', 1);
  // 温妮非男人（TALENT:31:122 不写）：阴核参数名（train-natural-log:101）
  fixture.store.set('talent:31:163', 1); // 高貴（K3 口上挂载的前提）
  // TALENT:31:110（巨乳）：COM_ABLE32 在技巧 LV1 仍放行乳交
  // （train-natural-log:241 起、脱衣后每屏都有「乳交[32]」）。源
  // COMABLE.ERB:1530 在非爆乳/巨乳/超乳时要求技巧 3+，种子技巧是 LV1
  // （train-natural-log:946），故必须有这三档之一。胸围档日志无明文，
  // 取中间档巨乳——#274 补装奉仕系后 COM_ABLE32 真身才消费到这条。
  fixture.store.set('talent:31:110', 1);
  // —— 调教域表先开（三段寻址守卫；run_train 内的 beginTrain 幂等）——
  fixture.era.beginTrain(0, 31);

  // —— FLAG:5（游戏设置位组）：开局值整组播种（@EVENTFIRST 置
  //    17179934119，event-first.js:110；录制会话是新档，CONFIG 未动）。
  //    bit34 = 1（自定义 COM 菜单）——golden 两份样本的方格形态（升格名，
  //    train-upgrade-log:348「刺激Ｇ点[8]」）为该态实证，ere 侧
  //    SHOW_USERCOM 的渲染分流（#214）钉到同一支（#209 裁定 12 同款：
  //    观察 golden 走的哪一支，把 ere 侧钉过去）——不播则 GETBIT = 0、
  //    方格退回内建静态名，基线全面漂移 ——
  fixture.store.set('flag:5', 17179934119);

  // —— BASE/MAXBASE（首屏 train-natural-log:98-99：1198/2000、2000/2000）——
  fixture.store.set('maxbase:31:0', 2000);
  fixture.store.set('maxbase:31:1', 2000);
  fixture.store.set('base:31:0', 1198);
  fixture.store.set('base:31:1', 2000);

  // —— ABL（结算能力一览 train-natural-log:945-951 + 实行值判定行 train-natural-log:169-170 与 train-natural-log:453-454
  //    的反解；「阴核点数×5859/20000 ……点数不足」（train-natural-log:959）证阴蒂感觉
  //    LV4 是存量、非本场所升——）——
  fixture.store.set('abl:31:0', 4); // 阴蒂感觉 LV4
  fixture.store.set('abl:31:1', 1); // 乳房感觉 LV1
  fixture.store.set('abl:31:10', 1); // 顺从 LV1（判定行 顺从LV1(4)）
  fixture.store.set('abl:31:11', 1); // 欲望 LV1（判定行；首回合 palam 欲情 0）
  fixture.store.set('abl:31:12', 1); // 技巧 LV1（train-natural-log:946）
  fixture.store.set('abl:31:13', 1); // 侍奉技术 LV1（train-natural-log:946）
  fixture.store.set('abl:31:17', 1); // 露出癖 LV1（自慰判定行 train-natural-log:453）
  fixture.store.set('abl:31:21', 3); // 抖M气质 LV3（判定行 train-natural-log:169）

  // —— 刻印（实行值判定行的反解：快乐/苦痛/屈服/反抗全在账）。下标按
  //    yml/Mark.yml（0=苦痛 1=快乐 2=屈服 3=反抗）——#219 勘定：此处原把
  //    苦痛/快乐两行对调着种（0←2、1←1），COM6 判定行落地时数值对不上
  //    golden :169（苦痛刻印LV1(5) + 快乐刻印LV2(4)）才翻出，随本票更正 ——
  fixture.store.set('mark:31:0', 1); // 苦痛刻印 LV1（train-natural-log:169）
  fixture.store.set('mark:31:1', 2); // 快乐刻印 LV2（train-natural-log:169 快乐刻印LV2(4)）
  fixture.store.set('mark:31:2', 2); // 屈服刻印 LV2（train-natural-log:169）
  fixture.store.set('mark:31:3', 1); // 反抗刻印 LV1（train-natural-log:169 与 train-natural-log:951）

  // —— CFLAG/CSTR ——
  // CFLAG:2（好感）∈ [100,300) 档：首回合源一览 不洁(27)=30×0.9、情爱
  // (181)=165×1.1（master_skill_check 的档位乘算，train-natural-log:127 的实证；档内
  // 具体值不可知、已实现路径只消费档位，取代表值 200）
  fixture.store.set('cflag:31:2', 200);
  // —— 道具持有（#274：com-toy 进回放清单后才有指令读它）——
  //    golden 的指令方格里只出现 振动宝石[10] 与 振动杖[12]，11 / 13-19
  //    一次都没有 → NOITEM 关闭，玩家恰好持有这两件（Item.csv:0 振动宝石、
  //    :2 振动杖）。种多一件都会让方格多出 golden 没有的条目。
  fixture.store.set('item:0', 1);
  fixture.store.set('item:2', 1);
  // —— 服装（#215 J5 起 TRAIN_MESSAGE_B 服装前缀与 SHOW_STATUS 的
  //    【PRINT_CLOTHTYPE】为真身，两侧对得上要求播种着衣态）——
  // FLAG:37 = 1（着衣系统开）：状态屏【紧身衣＆裙甲的姿态】在场为证
  // （train-natural-log:100；PRINT_CLOTHTYPE 的 :37 守卫读它）
  fixture.store.set('flag:37', 1);
  // CFLAG:41 = 5（紧身衣＆裙甲，两截裙装型）+ CFLAG:40 = 15（内裤|胸罩|
  // 上装|裙，WEARING_CLOTH_ALL 对 1-100 型的装位）：爱抚情景行带
  // 「隔着紧身衣＆裙甲、」前缀（train-natural-log:122）与
  // 「紧身衣＆裙甲的姿态的温妮被带来了。」（train-natural-log:91）
  // 为证。ere 侧 COM110（穿脱）未移植，89/7 扒光后 ere 不脱——两态错位
  // 差异经 rules.js 记名 COM110 待办
  fixture.store.set('cflag:31:41', 5);
  fixture.store.set('cflag:31:40', 15);
  // CFLAG:16（初吻对象）>0 且 <100：结算「[初吻对象：你的唇]」（train-natural-log:938）
  // 的值域 + COM0 走「已有接吻经验」支（源不洁不为 0）；CSTR:4 = 名
  fixture.store.set('cflag:31:16', 1);
  fixture.store.set('cstr:31:4', '你');
  // CFLAG:301（K3 状态机）停在 2xx 段末尾。两次爱抚均无口上行的机制
  // （train-natural-log:122-126 与 train-natural-log:253-257 的实证）：「それ以外（2xx）」支的门槛是
  // MARK:2（屈服刻印）<= 1，而 save99 的温妮是 LV2（判定行 train-natural-log:169）→
  // 2xx 支不可达；屈服Lv2＆快乐Lv3 支又要 MARK:1 === 3（快乐刻印，实为
  // LV2）→ 同样不进——全支无输出。FLAG:7（口上开关）因此不必播种：
  // 读 0 → @EVENTTRAIN #PRI 补 2（>0 即调用，各支不进）。旧样本
  // （emuera.log）首回合出 :1097 台词，靠的是 mid-session 播种
  // mark:31:2 不写（=0 ≤ 1）——两份样本的口上形态由刻印差分道
  fixture.store.set('cflag:31:301', 203);
  // CFLAG:9（等级）LV1（train-natural-log:937「温妮当前是Lv1」；EXP:80 战斗经验 0 不播）
  fixture.store.set('cflag:31:9', 1);
  // CFLAG:15（初体验）不写 = 0：train-natural 无初体验括号（train-natural-log:938）；
  // train-upgrade 的「[初体验对象：你]」（train-upgrade-log:446）是本场 COM8 夺处女的
  // 结果，ere 侧无 COM8 不产生——该差异归 COM8 未移植（rules.js）

  // —— 经验存量（SHOW_INFO_EXP 的显示值，train-natural-log:935-936；ere 侧未移植指令
  //    不产生增量，播显示值即复现显示行）——
  fixture.store.set('exp:31:2', 13); // 绝顶经验（= 存量 12 + 本场振动杖 1）
  fixture.store.set('exp:31:10', 4); // 自慰经验（存量 3 + 本场自慰 1）
  fixture.store.set('exp:31:11', 4); // 调教自慰经验（同上）
  fixture.store.set('exp:31:22', 16); // 口交经验（存量）
  fixture.store.set('exp:31:73', 1); // 调教会话经验（本场交谈 +1）

  // —— 珠存量（结算表「上次值」列，train-natural-log:919-931；juel-check 的加算后显示
  //    = 存量 + ere 侧增量，ere 增量与 golden 不同属 COM 未移植差异）——
  fixture.store.set('juel:31:0', 4759); // 阴核
  fixture.store.set('juel:31:1', 0); // 私处
  fixture.store.set('juel:31:2', 0); // 肛门
  fixture.store.set('juel:31:4', 0); // 恭顺
  fixture.store.set('juel:31:5', 18); // 欲情
  fixture.store.set('juel:31:6', 677); // 屈服
  fixture.store.set('juel:31:7', 30); // 习得
  fixture.store.set('juel:31:8', 120); // 耻情
  fixture.store.set('juel:31:9', 12); // 苦痛
  fixture.store.set('juel:31:10', 11); // 恐怖
  fixture.store.set('juel:31:14', 1); // 乳房
  fixture.store.set('juel:31:15', 0); // 癖好
  fixture.store.set('juel:31:100', 0); // 否定（train-natural-log:930 抵消后为 0）

  // —— 世界指针 ——
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.day_count = 6; // 第 7 日（train-natural-log:96「7日(午前)」= DAY+1）
  era_flag.time = 0; // (午前)
  era_flag.target = 31;
  era_flag.assi = -1; // 无「助手:名」段（train-natural-log:97）

  // —— 置位串（train-upgrade：主菜单重画「技巧Lv： Lv3」的自检在窗口外，
  //    置位在此直接落库——ABL:0:12 是 MASTER 的技巧）——
  for (const [key, value] of Object.entries(TRAIN_SEEDS[sample])) {
    fixture.store.set(key, value);
  }

  // —— 静态名表（实机由引擎装载 yml/ 注入；消费点：print_palam、指令
  //    按钮/上次指令名、SHOW_INFO_EXP 的经验名、SHOW_JUEL/结算表的参数名）——
  const palam = parse_name_ids('yml/Palam.yml');
  fixture.store.set(
    'palamkeys',
    [...palam.values()].sort((a, b) => a - b),
  );
  palam.forEach((id, name) => fixture.store.set(`palamname:${id}`, name));
  parse_name_ids('yml/TrainCommand.yml').forEach((id, name) =>
    fixture.store.set(`traincommandname:${id}`, name),
  );
  const exp = parse_name_ids('yml/Exp.yml');
  fixture.store.set(
    'expkeys',
    [...exp.values()].sort((a, b) => a - b),
  );
  exp.forEach((id, name) => fixture.store.set(`expname:${id}`, name));
  const abl = parse_name_ids('yml/Abl.yml');
  fixture.store.set(
    'ablkeys',
    [...abl.values()].sort((a, b) => a - b),
  );
  abl.forEach((id, name) => fixture.store.set(`ablname:${id}`, name));
  // 刻印名表全量（#219 起 COM_ORDER/判定行读 markname:0-2；此前只有
  // SHOW_ABLUP_SELECT 的 [99] 行用到 :3）
  const mark = parse_name_ids('yml/Mark.yml');
  mark.forEach((id, name) => fixture.store.set(`markname:${id}`, name));
  fixture.store.set('markname:3', '反抗刻印'); // SHOW_ABLUP_SELECT 的 [99] 行
}

/**
 * 回放一份调教样本的全序列：run_train（全部指令 + 999）→ run_aftertrain
 * （@EVENTEND → @JUEL_CHECK 的升级交互 → 返回 TURNEND 停）。
 *
 * @param {'train-natural'|'train-upgrade'} sample 样本名
 * @returns {Promise<{fixture: object, stream_source: Array<object>}>}
 *   fixture：夹具本体；stream_source：与 golden 日志语义同构的比对流
 *   （lines_history 剔除「原作 CLEARLINE 对应」的清行，见文件头观测面节）
 */
async function replay_train_sample(sample) {
  const plan = TRAIN_INPUT_PLANS[sample];
  if (!plan) {
    throw new Error(
      `未知调教样本「${sample}」（有效：${Object.keys(TRAIN_INPUT_PLANS).join('、')}）`,
    );
  }
  const fixture = create_era_fixture();

  // 随机源：序列注入（TRAIN_RAND_SEQ 的注释里有每份样本的反推依据）；
  // 耗尽后回落 RAND_FIX 常数——未来消费点超出已反推序列时输出仍确定，
  // 差异当场暴露而不是随机漂移
  const rand_seq = TRAIN_RAND_SEQ[sample];
  let rand_idx = 0;
  const original_random = Math.random;
  Math.random = () =>
    rand_idx < rand_seq.length
      ? (rand_seq[rand_idx++] + 0.5) / rand_seq.length
      : RAND_FIX;

  // 观测面（replay-b 同款）：clear 按调用栈区分两类清行。调教段的 ere
  // 清行全部来自 ScreenBlock（自建重绘——原作 @SHOW_STATUS 是追加滚动，
  // 样本 17 屏全在为证），比对流保留；非 ScreenBlock 的 clear（若未来
  // 画面组件镜像原作 CLEARLINE）剔除。
  const REDRAW_CLEAR_RE = /screen-block\.js/;
  const dropped = new Set();
  const original_clear = fixture.era.clear;
  fixture.era.clear = async (line_count) => {
    const from_redraw = REDRAW_CLEAR_RE.test(new Error().stack ?? '');
    const before = [...fixture.lines];
    const result = await original_clear(line_count);
    if (!from_redraw) {
      before
        .filter((entry) => !fixture.lines.includes(entry))
        .forEach((entry) => dropped.add(entry));
    }
    return result;
  };

  // 输入通道：useRule:false（Emuera 自由输入语义，见文件头裁定 2）；
  // 标记带 Row（replay-b 形态）同时进 lines 与 lines_history
  let input_idx = 0;
  const original_input = fixture.era.input;
  fixture.era.input = async (config) => {
    if (input_idx >= plan.length) {
      // 计划耗尽 = 回放完成（golden 停在能力值提高结束，ere 侧不该再要输入）
      throw new Error(
        `回放输入计划已耗尽（${sample}：${plan.length} 键）——ere 侧流程比 golden 多要了一次输入`,
      );
    }
    fixture.set_inputs(plan[input_idx]);
    input_idx += 1;
    const value = await original_input({
      ...(config ?? {}),
      useRule: false,
    });
    const mark = { type: 'input', text: String(value) };
    mark.row = fixture.era.getLineCount() - 1;
    fixture.lines.push(mark);
    fixture.lines_history.push(mark);
    return value;
  };

  try {
    seed_train_world(fixture, sample);
    TRAIN_PATH_MODULES.forEach((name) => fixture.load_module(name));
    const { run_train, run_aftertrain } = fixture.load_module(
      'system/train/train-loop',
    );
    const next_state = await run_train();
    if (next_state !== 'AFTERTRAIN') {
      throw new Error(
        `run_train 的出口状态是 ${next_state}（预期 AFTERTRAIN）——流程错位`,
      );
    }
    const tail_state = await run_aftertrain();
    if (tail_state !== 'TURNEND') {
      throw new Error(
        `run_aftertrain 的出口状态是 ${tail_state}（预期 TURNEND）——流程错位`,
      );
    }
  } finally {
    Math.random = original_random;
    fixture.era.input = original_input;
    fixture.era.clear = original_clear;
  }
  const stream_source = fixture.lines_history.filter(
    (entry) => !dropped.has(entry),
  );
  return { fixture, stream_source };
}

/**
 * golden 事件流的调教窗口：从「主菜单选 100 进调教」那次输入之后的第一条
 * 输出起（首屏在窗口内），到最后一次输入（能力值提高结束 999）的回显止
 * （含）——尾部的日程推屏与回场主菜单不进窗口（日循环由范围 B 的
 * daycycle 样本覆盖，调教样本的比对面是调教与结算交互本身）。
 *
 * @param {Array<object>} stream golden_stream 的产物（含 discard）
 * @param {'train-natural'|'train-upgrade'} sample
 * @returns {Array<object>} 窗口内条目（discard/group 已滤除）
 */
function train_window(stream, sample) {
  const offset = TRAIN_GOLDEN_INPUT_OFFSET[sample];
  const positions = [];
  stream.forEach((entry, i) => {
    if (entry.kind === 'input') {
      positions.push(i);
    }
  });
  const start = positions[offset - 1]; // 进调教那次输入（99/100 序列的末条）
  const end = positions[positions.length - 1]; // 能力值提高结束 999
  if (start === undefined || end === undefined || end < start) {
    throw new Error(
      `golden 输入定位失败：offset ${offset}（实得 ${positions.length} 次输入）`,
    );
  }
  return stream
    .slice(start + 1, end + 1)
    .filter((entry) => entry.kind !== 'discard' && entry.kind !== 'group');
}

module.exports = {
  RAND_FIX,
  TRAIN_GOLDEN_INPUT_OFFSET,
  TRAIN_INPUT_PLANS,
  TRAIN_PATH_MODULES,
  TRAIN_RAND_SEQ,
  TRAIN_SEEDS,
  replay_first_turn,
  replay_train_sample,
  seed_train_world,
  seed_winnie_world,
  train_window,
};
