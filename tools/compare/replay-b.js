/**
 * @file 范围 B 三段回放器（issue #161 阶段二；裁定依据见 #109 问题五）。
 *
 * 与 replay.js（调教段）并列的 ere 侧录制器：驱动真实游戏代码重走
 * 「标题 → 读档 → 据点主菜单（→ 存读档 / 日循环）」的原作路径，把夹具
 * lines 交给 normalize.fixture_stream 归一成事件流，与 golden/*.log 对拍。
 *
 * 回放形态的三个裁定（判断依据都在 #161 票上，此处只留结论）：
 *
 * 1. **不解析 save99.sav，从样本自身播种**（#48 调教段同款裁定的沿用）：
 *    世界状态的全部消费点都在样本里有逐字证据——状态行（第 7 日上午、
 *    800 pts.）、存档备注（第 7日午前 / 正在调教:温妮）、读档画面槽位表
 *    （save00/save99 两行备注）。save99 快照经夹具数据层的 saveData 落
 *    99 号槽，回放的 LOADDATA 走真数据路径（版本闸门 + 整体替换）。
 *
 * 2. **输入全走 `useRule: false` 通道**：Emuera 的 INPUT 是自由输入（无
 *    按钮白名单），ere 引擎 input() 只送达已打印按钮的快捷键（#129/#130
 *    的实机差异）。回放模拟的是 **Emuera 世界**的输入（0/99/200/199/9999
 *    一律可达——199 在 ere 实机因按钮未渲染而不可达，9999 在两侧都只是
 *    链尾重绘），所以绕过夹具白名单；流程错位由事件流比对暴露，比对层
 *    是比白名单更强的校验。
 *
 * 3. **输入标记带 Row 号**（与调教段 replay.js 的差异，那边不带头注）：
 *    Emuera 把输入回显记录为普通行，原作的 CLEARLINE（读档画面就地重
 *    绘、标题清回显）会把回显行清掉、保存的日志里就没有——夹具 lines
 *    的 clear 按 Row 删行，标记带 Row 即与黄金侧同构（该消失的一起消失，
 *    如标题的 0 与翻页的 102/101；该留的留下，如读档的 99）。
 *    非数字输入（故事名 INPUTS）的回显行在黄金侧是普通文本行（归一化器
 *    逐行无法区分回显与叙述），故文本输入标 text、数字输入标 input——
 *    两侧同构。waitAnyKey（PRINTW 读键）无回显行，桩不消费输入队列，
 *    回放计划里不含那些回车。
 *
 * 观测面（与黄金日志语义同构，本文件的关键裁定）：Emuera 保存的日志 =
 * **追加历史 + CLEARLINE 生效**——滚动出屏的行保留（daycycle 三版主菜单
 * 全在样本里），原作 CLEARLINE 清掉的行消失（标题的 0 回显、翻页列表的
 * 中间版本）。ere 侧夹具的 lines 是「全部 clear 生效」的净效果，而主菜单
 * 自 #73 起就地重绘（ADR-0003，原作是追加）——直接拿 lines 比对会把
 * 「ere 自建重绘清掉的旧版主菜单与中间输出」错算成几百条假差异（saveload
 * 段首跑实测 308 条）。正解：比对流 = lines_history（只增不删的全量历史）
 * **剔除「与原作 CLEARLINE 对应」的清行**——即 page-save-load 等处 1:1
 * 镜像原作清行的 era.clear 所删条目；ScreenBlock 重绘（ere 自建、原作
 * 无清行）删掉的条目**保留**（与黄金侧追加语义一致）。两类 clear 以调用
 * 栈区分（screen-block.js 在栈内 = 自建重绘）：本项目无构建步骤、模块
 * 路径稳定，栈判据可靠；未来别的画面组件采用 ScreenBlock 时重审此判定。
 */

'use strict';

const { create_era_fixture } = require('../../test/helpers/era-fixture');

// —— 播种常量（全部带样本证据；行号 = golden/<名>.log）——

// 标题画面的 gamebase（yml/GameBase.yml 的引擎属性名形态；离线工具直读
// 产物有先例——replay.js 读 yml/Palam.yml——此处按英文键手工播种并注明出处）
const GAMEBASE = {
  title: 'ERA魔王 年度版（名字暂定）（PC only）', // 【游戏名称】
  author: '「人人为我，我为人人」', // 【作者】（样本 :7）
  info: '※未经允许，任何人不得引用、修改再打包或进行商业用途※', // 【追加信息】（样本 :31）
  year: '2011 - 2024！', // 【发布时间】（样本 :8）
  versionName: '0.0.1', // 【版本代号】——版本轴 0.0.1（ADR-0006/#138）；
  // 样本是 93.106（伪Ver93.106 立绘版，:6），差异归 rules 的 version 类
};

// save00 / save99 的存档备注（读档画面列表行逐字，含尾随空格——@SAVEINFO
// 的 pad_display_left(名,14)；mainmenu-natural-log:40 与 mainmenu-natural-log:61）
const SAVE00_REMARK =
  '2024/12/23 12:08:10  第 2日午前 LV   0 正在调教:温妮           ';
const SAVE99_REMARK =
  '2024/12/25 19:55:17  第 7日午前 LV   0 正在调教:温妮           ';

// 最大态置位串（golden/*.meta.json 的 seed_string；录制时 Ctrl+D 逐行执行，
// 发生在读档进场之后、主菜单首次交互之前——回放按同一时序注入）
const MAX_SEEDS = {
  'flag:37': 1,
  'flag:83': 5,
  'flag:84': 3,
  'talent:0:325': 1,
  'cflag:31:0': 1, // CFLAG:(TARGET > 0 ? TARGET # 1):0 —— TARGET 恒 31（温妮）
  item24: 3,
  item25: 2,
};

// 各段的输入计划（黄金样本的输入回显序列；标题 0 与翻页 102/101 在黄金侧
// 被原作 CLEARLINE 清掉，样本里只有 99 起——ere 侧标记带 Row 同构消失）。
// mainmenu 段按 state 展开（max 态尾部多一次 9999 重画触发），见 get_plan。
const PLANS = {
  saveload: [
    '0',
    '99',
    '200', // 保存画面
    '200', // 为故事命名
    '对拍样本', // INPUTS（文本输入 → text 标记）
    '5', // 首存（空槽，无覆盖确认）
    '200', // 二进保存画面
    '5', // 覆盖已有档
    '1', // 确认覆盖
    '300', // 读取画面
    '102', // 下一页（就地重绘，痕迹两侧同构消失）
    '101', // 上一页
    '5', // 读入 → 回主菜单
    undefined,
  ],
  // 199 休息 ×2：ere 侧是 stub_line_wait（BEGIN TURNEND 待办），走输入
  // 通道可达（useRule:false，见文件头裁定 2）
  daycycle: ['0', '99', '199', '199', undefined],
};

/** 输入计划（按段与态展开；max 态在尾部多一次 9999 重画触发） */
function get_plan(segment, state) {
  if (segment === 'mainmenu') {
    return state === 'max'
      ? ['0', '99', '9999', undefined]
      : ['0', '99', undefined];
  }
  const base = PLANS[segment];
  if (!base) {
    throw new Error(`未知段「${segment}」（有效：mainmenu/saveload/daycycle）`);
  }
  return base;
}

/** 终止信号：计划耗尽（undefined 哨兵）——黄金样本停在主菜单等待输入 */
const REPLAY_DONE = '__replay_plan_exhausted__';

/**
 * 播种范围 B 的世界：标题 global 状态 + save99 快照 + save00 备注。
 * @param {object} fixture
 */
async function seed_scope_b(fixture) {
  fixture.store.set('gamebase', { ...GAMEBASE });
  // 标题画面状态：致辞展开（GLOBAL:99==0，样本 :10-31 是完整名单）、联系
  // 方式未显示（GLOBAL:98==0，样本 :32 是「版本推进出问题 >>」）
  fixture.store.set('global:99', 0);
  fixture.store.set('global:98', 0);
  // 标题音乐开关关（避免音乐记录噪音；resource:false 下播不播都无声）
  fixture.store.set('global:0', 0);
  // save00：只有备注、无快照（样本流程不读它——读档画面渲染读备注即够）
  fixture.store.set('global:saves:0', SAVE00_REMARK);

  // —— save99 的世界（第 7 日午前，温妮调教中）——
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' }); // 魔王
  fixture.era.addCharacter(0);
  fixture.seed_chara(31, { id: 31, name: '温妮', callname: '温妮' });
  fixture.era.addCharacter(31);
  // SAVEINFO 的「正在调教:%名%」读 callname:TARGET（#5 决议：SAVESTR 由
  // 内置 callname 承载）
  fixture.store.set('callname:31', '温妮');
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.day_count = 6; // 第 7 日（状态行「（第7日）」= DAY+1，样本 :67）
  era_flag.month = 1; // 「1月7日」
  era_flag.date = 7;
  era_flag.time = 0; // 「上午」（午前）
  era_flag.money = 800; // (所持金：800 pts.)
  era_flag.target = 31; // 调教目标温妮（备注「正在调教:温妮」）
  era_flag.assi = -1; // 无助手（主菜单助手钮灰，样本 :69 同形态归因）
  // @SAVEINFO 的指针改写副作用读 FLAG:1/FLAG:2（前回调教目标/助手，
  // page-save-load.js 的 build_save_info）——保存 5 号槽时消费
  fixture.store.set('flag:1', 31);
  fixture.store.set('flag:2', -1);
  // 魔王等级 LV0（备注「LV   0」＝ cflag:0:9 未声明读 0，不播即证据）

  // 快照落 99 号槽（真数据路径：版本闸门当前 1/1，loadData 放行）
  await fixture.era.saveData(99, SAVE99_REMARK);
}

/**
 * 应用最大态置位（录制期 Ctrl+D 的等价物）：读档进场之后、主菜单首次
 * 交互之前注入——回放器在第 3 次输入（0/99 之后）返回前执行，此时首绘
 * （自然态）已在屏上，下一次重绘即最大态，与录制时序一致。
 * @param {object} fixture
 */
function apply_max_seeds(fixture) {
  fixture.store.set('flag:37', MAX_SEEDS['flag:37']);
  fixture.store.set('flag:83', MAX_SEEDS['flag:83']);
  fixture.store.set('flag:84', MAX_SEEDS['flag:84']);
  fixture.store.set('talent:0:325', MAX_SEEDS['talent:0:325']);
  fixture.store.set('cflag:31:0', MAX_SEEDS['cflag:31:0']);
  fixture.store.set('item:24', MAX_SEEDS.item24);
  fixture.store.set('item:25', MAX_SEEDS.item25);
}

/**
 * 回放一段范围 B 流程，返回比对素材。
 *
 * @param {'mainmenu'|'saveload'|'daycycle'} segment 段名
 * @param {'natural'|'max'} [state='natural'] 自然态 / 置位最大态
 * @returns {Promise<{fixture: object, stream_source: Array<object>}>}
 *   fixture：夹具本体；stream_source：与黄金日志语义同构的比对流
 *   （lines_history 剔除「原作 CLEARLINE 对应」的清行，见文件头观测面节）
 */
async function replay_scope_b(segment, state = 'natural') {
  const fixture = create_era_fixture();
  await seed_scope_b(fixture);

  // —— 观测面：包装 clear，按调用栈区分两类清行（文件头注释）——
  // dropped：与原作 CLEARLINE 对应（非 ScreenBlock 重绘）的 clear 所删
  // 条目（对象引用，与 lines_history 里的同一对象）。比对流剔除它们。
  // 自建清行的栈特征（被清条目**保留**，原作追加）：
  //   - screen-block.js：主菜单就地重绘（ADR-0003，原作追加滚动）；
  //   - set_story_name：故事命名的入场清行——ere 引擎在屏幕有按钮时拒收
  //     非按钮输入（05-interaction.md:144）逼出来的清屏，原作 Emuera 的
  //     INPUTS 无此限制、命名前不清行（SYSTEM_DATA.ERB:212 的清行被注释，
  //     page-save-load.js 文件头「界面形态说明」）。
  const REDRAW_CLEAR_RE = /screen-block\.js|set_story_name/;
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

  const plan = get_plan(segment, state);
  let idx = 0;
  const original_input = fixture.era.input;
  fixture.era.input = async (config) => {
    const value = plan[idx];
    idx += 1;
    if (value === undefined) {
      throw new Error(REPLAY_DONE);
    }
    // 最大态置位：第 3 次输入（0/99 之后）返回前注入（时序见 apply_max_seeds）
    if (state === 'max' && idx === 3) {
      apply_max_seeds(fixture);
    }
    // 数值输入预置 number（era.input 语义）、文本输入预置 string（INPUTS）
    fixture.set_inputs(
      /^\d+$/.test(String(value)) ? Number(value) : String(value),
    );
    // useRule:false 的正当性见文件头裁定 2；计行（回显 +1 Row）由夹具
    // original_input 完成，标记挂到该 Row——原作 CLEARLINE 与夹具 clear
    // 的删行语义由此同构
    const got = await original_input({ ...(config ?? {}), useRule: false });
    const numeric = typeof got === 'number';
    const mark = numeric
      ? { type: 'input', text: String(got) }
      : { type: 'text', text: String(got) };
    mark.row = fixture.era.getLineCount() - 1;
    fixture.lines.push(mark);
    fixture.lines_history.push(mark);
    return got;
  };

  const { STATE } = fixture.load_module('system/flow/begin-signal');
  const { enter_state } = fixture.load_module('system/flow/main-loop');
  let st = STATE.TITLE;
  try {
    // 黄金样本停在主菜单等待输入：计划耗尽 = 回放完成
    for (;;) {
      st = await enter_state(st);
    }
  } catch (err) {
    if (!String(err?.message).includes(REPLAY_DONE)) {
      throw err; // 真 bug / 流程错位：透传给比对层暴露
    }
  } finally {
    fixture.era.input = original_input;
    fixture.era.clear = original_clear;
  }
  // 比对流：全量输出历史 −（原作 CLEARLINE 对应的清行）。条目顺序 =
  // 输出顺序（lines_history 只增不删，天然是追加历史）。
  const stream_source = fixture.lines_history.filter(
    (entry) => !dropped.has(entry),
  );
  return { fixture, stream_source };
}

module.exports = {
  GAMEBASE,
  MAX_SEEDS,
  PLANS,
  REPLAY_DONE,
  SAVE00_REMARK,
  SAVE99_REMARK,
  apply_max_seeds,
  get_plan,
  replay_scope_b,
  seed_scope_b,
};
