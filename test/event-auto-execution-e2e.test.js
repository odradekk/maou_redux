/**
 * 阶段 6 段收尾的端到端验收（issue #549，#540 抵达条件 3）：
 * 「自动处刑」链进 `npm test`——设置页 [3] 开启勇者自动处刑 → 主菜单 [103]
 * 批量处刑处置一名奴隶 → 过天后 @EVENTTURNEND 触发「自動處刑」。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一注入点，#16）。照
 * test/event-daycycle-e2e.test.js 的形状——同样的新档启动序列（标题 → 新游戏
 * → @EVENTFIRST 村娘线，地下城模式选 2D），但驱动的是本阶段新接的这条链：
 *   - 设置页经主菜单 [777] 进入，[3] 的状态行从 OFF 翻到 ON（FLAG:5 位 3）；
 *   - 主菜单 [103] 进批量处刑（#543），给村娘打标签 → [121] 选流放 → 确认；
 *   - [199] 休息过天，@EVENTTURNEND 里洗脑戒指把侵攻中的勇者变成俘虏
 *     （CFLAG:506 新人标签），开关位开着 → 自動處刑处决她。
 * 三段全部经真实输入通道（era.input 的按钮白名单），断言落在可观察契约上
 * （状态行文案、处刑播报、角色从队伍消失、勋章/处刑计数），不断言中间
 * 函数被调了几次。
 *
 * 世界补齐（夹具层，同 event-ending-e2e 预置 base 的先例）：温妮（31）以
 * 「侵攻中 + 洗脑戒指」的勇者身份进场——这对应真实玩法里勇者戴着偷来的
 * 戒指打进迷宫的状态；戒指陷落 → 新人标签 → 自动处刑的中间链路由
 * test/event-execution-batch.test.js 的 EVENTTURNEND 接线用例逐环锁定，
 * 本用例只负责把它串进玩家按得到的完整流程。
 *
 * 随机源：Math.random 换成恒 0.5（同 event-execution-batch.test.js 接线用例
 * 的取法）——本链沿途的随机消费（2D 地图、侵攻度衰减、SENGEN 掷点）只要求
 * 确定，不要求多样；恒值对输入序列错位最不敏感。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_gamebase } = require('./helpers/gamebase');

/** 洗脑戒指的存储编号（识别号 15、强度 5；前缀 0 无附魔）——勇者佩戴态 */
const BRAINWASH_RING = 5 * 1000 + 15;

/** 接住 BeginSignal 并断言目标状态（同 event-ending-e2e 的出口协议） */
async function expect_signal(promise, state, BeginSignal, what) {
  try {
    await promise;
  } catch (e) {
    if (e instanceof BeginSignal && e.state === state) {
      return;
    }
    throw e;
  }
  assert.fail(`${what} 应以 BeginSignal(${state}) 离开，却正常返回了`);
}

/** 全史文本行（clear 清掉的也在：lines_history 被动全量记录） */
function history_texts(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

test('端到端：自动处刑——设置页 [3] 开启 → 主菜单 [103] 批量处刑 → 过天 EVENTTURNEND 自動處刑', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  // 角色预设：0 魔王（标题新游戏加入）、17 玛奥（村娘线，批量处刑的处置
  // 对象）、31 温妮（世界补齐的侵攻中勇者，自动处刑的目标）
  fixture.seed_chara(0, { name: '你', callname: '你' });
  fixture.seed_chara(17, { name: '玛奥', callname: '玛奥' });
  fixture.seed_chara(31, { name: '温妮', callname: '温妮' });
  // 引擎静态表里 Chara0 的装载形状（CSVCALLNAME 的读数源，test/chara-
  // name.test.js 同款预置）：@EVENTFIRST 会用 CHARA_NAME_DEFINE 把魔王称呼
  // 重写为预设值，不补这格时夹具世界里它是空串
  fixture.store.set('chara:0', { name: '你', callname: '你' });
  // 引擎从 Chara0.yml 的「基礎」抄开局满状态（村娘线结算的回复段读上限）
  for (const idx of [0, 1, 2]) {
    fixture.store.set(`base:0:${idx}`, 10000);
    fixture.store.set(`maxbase:0:${idx}`, 10000);
  }
  for (const idx of [0, 1]) {
    fixture.store.set(`base:17:${idx}`, 1500);
    fixture.store.set(`maxbase:17:${idx}`, 1500);
  }

  fixture.load_module('system/flow/main-loop'); // 顶层 require 注册全部事件处理器
  const run_title_page = fixture.load_module('page/page-title');
  const { run_shop } = fixture.load_module('page/page-shop');
  const { emit } = fixture.load_module('system/event/registry');
  const { BeginSignal } = fixture.load_module('system/flow/begin-signal');

  // 本链不涉及勇者来袭的生成线（温妮是补齐的世界状态），关掉与
  // event-daycycle-e2e 同样的理由：避免无关随机消费打乱输入序列
  fixture.disable_enter_enemy();
  fixture.override_math_random(() => 0.5);

  try {
    // —— 新档：标题画面选「新的猎物」[1] → 新游戏四件套 → BEGIN FIRST ——
    // 地下城模式选 2D [1]：侵攻中的温妮走确定性的撤退路径
    fixture.set_inputs(1);
    await expect_signal(
      run_title_page(),
      'FIRST',
      BeginSignal,
      '标题画面新游戏',
    );
    fixture.set_inputs(1, 2, 1, 1, 1);
    const first_exit = await emit('EVENTFIRST');
    assert.equal(first_exit, 'SHOP', '初始化的出口必是 BEGIN SHOP');

    // —— 世界补齐：温妮以侵攻中勇者的身份到场（见文件头）——
    fixture.era.addCharacter(31);
    fixture.store.set('cflag:31:1', 2); // 侵攻中（洗脑戒指的陷落对象）
    fixture.store.set('cflag:31:551', BRAINWASH_RING);
    // HP 剩一成 → 2D 地图上必撤退且保持侵攻中（接线用例同款取值）
    fixture.store.set('base:31:0', 100);
    fixture.store.set('maxbase:31:0', 1000);
    fixture.store.set('base:31:1', 1000);
    fixture.store.set('maxbase:31:1', 1000);

    // —— 一轮主菜单连走三段（输入按消费顺序排好）——
    // [777] 设定 → [3] 开启勇者自动处刑 → [100] 返回；
    // [103] 处刑 → 17 给玛奥打标签 → [121] 选处刑方式 → [0] 流放 →
    //   流放菜单 [0] 就这样流放掉 → [1999] 结束处刑；
    // [199] 休息 → BEGIN TURNEND（run_shop 以信号离开）
    fixture.set_inputs(
      777,
      3,
      100, // 设置页：开启自动处刑并返回
      103,
      17,
      121,
      0,
      0,
      1999, // 主菜单：批量处刑流放玛奥
      199, // 休息过天
    );
    await expect_signal(
      run_shop(),
      'TURNEND',
      BeginSignal,
      '主菜单（设置 → 批量处刑 → 休息）',
    );

    // —— 段 1：设置页 [3] 的状态行 OFF → ON（翻页重绘后可见）——
    const texts = history_texts(fixture);
    const config_buttons = fixture.lines_history.filter(
      (line) =>
        line.type === 'button' && line.text.includes('勇者自动处刑机能'),
    );
    // 首末两条分别是「进入时的 OFF」与「切换后重绘的 ON」——不断言中间重绘
    // 几次（重绘次数是实现细节）
    assert.ok(
      config_buttons.length >= 2,
      '设置页至少渲染过两次 [3] 状态行（进入一次、切换后重绘一次）',
    );
    assert.match(
      config_buttons[0].text,
      /现在：OFF$/,
      '开启前 [3] 状态行是 OFF',
    );
    assert.match(
      config_buttons[config_buttons.length - 1].text,
      /现在：ON$/,
      '开启后重绘为 ON',
    );

    // —— 段 2：主菜单 [103] 批量处刑处置一名奴隶 ——
    assert(
      texts.some((line) => line.includes('请选出处刑对象(可复选)')),
      '进入批量处刑界面',
    );
    assert(
      texts.some((line) => line.includes('你把玛奥从地下城里永久驱逐了')),
      '流放的开场播报用实际主角名',
    );
    assert(
      texts.some((line) => line.includes('要来点有意思的放逐吗？')),
      '流放菜单出现（批量处刑 → 方法 0 的下游）',
    );
    assert(
      texts.some((line) => line.includes('得到了象征勇者之力的勋章')),
      '流放结算发勋章（BANISHMENT 非 4 号支）',
    );
    assert(
      !fixture.era.getAddedCharacters().includes(17),
      '玛奥经批量处刑从队伍消失',
    );

    // —— 段 3：过天 → @EVENTTURNEND 触发「自動處刑」 ——
    const pending = await emit('EVENTTURNEND');
    assert.equal(pending, 'SHOP', '回合结算的出口必是 BEGIN SHOP');
    const turnend_texts = history_texts(fixture);
    const captured = turnend_texts.findIndex((line) =>
      line.includes('温妮成了魔王的俘虏'),
    );
    const branded = turnend_texts.findIndex((line) =>
      line.includes('给温妮刻下了封印所有力量的烙印'),
    );
    assert(captured >= 0, '洗脑戒指在回合结算里把温妮变成俘虏（新人标签）');
    assert(branded >= 0, '自動處刑1 的烙印播报出现在回合结算输出里');
    assert(
      captured < branded,
      '俘虏播报在前、处决在后（同一次回合结算内完成）',
    );
    assert(
      turnend_texts.some((line) => line === '继续处刑'),
      '自動處刑1 的继续播报（与烙印句同源）',
    );
    assert(
      turnend_texts.some((line) => line.includes('得到了用勇者力量形成的勋章')),
      '自動處刑1 结算发勋章（dispose 的 medal 支）',
    );
    assert.deepEqual(
      fixture.era.getAddedCharacters(),
      [0],
      '过天后奴隶与陷落勇者都不在队伍里（各自被处置）',
    );
    // 两段各计一次：批量流放 + 自动处刑
    assert.equal(
      fixture.store.get('flag:80'),
      2,
      'FLAG:80 处刑勇者数 = 2（流放玛奥 + 自动处刑温妮）',
    );
    assert.equal(
      fixture.store.get('exp:0:81'),
      2,
      '勋章经验 +2（流放的象征勋章 + 自动处刑的勇者勋章）',
    );
  } finally {
    // Math.random 是进程级替换，必须恢复（同文件后续用例不被污染）
    fixture.restore_math_random();
  }
});
