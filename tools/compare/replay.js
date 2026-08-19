/**
 * @file T18 输出对拍·ere 侧回放器（issue #48，验证决议 #9）。
 *
 * 对拍起点的裁定（工单留给本票的第一个设计问题）——**手工播种等价角色**，
 * 不解析 target/Sav/save00.sav。依据（详见 docs/output-diff.md 与 #48 评论）：
 *
 *   1. 首回合的全部初始值**可从日志自身推导**：PALAM 初值 = 算式行的 from
 *      侧；BASE 初值 = 回合后状态条 + 损耗值回推；ABL/素质/刻印 = 源一览
 *      与换算结果的反解（下方种子表逐条注明证据行）。
 *   2. save00.sav 与日志窗口的**时间对齐关系不可知**（日志是环形缓冲尾部
 *      5000 行、存档是同场次的某一时刻），解析它得到的不是「窗口起点」；
 *      二进制格式解析还是独立工作量，解析器自身的 bug 会伪装成对拍噪音
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

/** 回放要装载的调教路径模块（引擎装载 ere/ 全部文件；夹具按路径装子集） */
const TRAIN_PATH_MODULES = [
  'event/event-train',
  'event/event-com',
  'event/event-comend',
  'event/source-check',
  'kojo/kojo-k3',
  'page/page-train',
  'page/page-usercom',
  'system/train/com0-caress',
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

  // —— EX / 世界指针 ——
  fixture.store.set('ex:31:0', 1); // [阴蒂绝顶：1次]（log:51）
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.day_count = 2; // 3日（log:46：DAY+1 = 3）
  era_flag.time = 1; // (午后)（log:46）
  era_flag.target = 31;
  era_flag.assi = -1; // 无「助手:名」段（log:47），调教者 = 主人

  // —— 静态名表：实机由引擎装载 yml/ 时注入，夹具不读 yml/（静态表正确性
  //    另有 chara-yml / variable-yml 对拍），回放按同一产物补进 store ——
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
 * 回放调教首回合（输入 0 爱抚），返回两侧对拍所需的全部素材。
 *
 * 输入标记：包装 fixture.era.input，输入返回后向 lines 压一条 {type:
 * 'input'} 标记——与输出行精确交错（归一化器据此切窗口）。行数口径由
 * 夹具的计数器镜像（#68 整改：input() 回显默认 +1 Row，三段短路逐字
 * 对齐引擎），标记只是条目层的对拍注记——不带 row、不推回显条目：条目
 * 层若再记一行回显，会与标记各产生一次 input 事件，把对拍窗口的输入
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

module.exports = {
  RAND_FIX,
  TRAIN_PATH_MODULES,
  replay_first_turn,
  seed_winnie_world,
};
