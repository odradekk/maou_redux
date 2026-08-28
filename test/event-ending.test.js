/**
 * ere/event/event-ending.js @ENDING_1 真身与 @ENDING_3/4/5/@END10_55 接线
 * 的行为测试（issue #118），外加 ere/page/page-invasion.js @INVASION_CHECK
 * 五组条件的触发测试（经模块公开接口 invasion_check 直驱）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点）。
 *
 * 对应 #118 验收清单：
 *   1. FLAG:81 置 10000 后调 INVASION_CHECK：ENDING_1 被调用一次
 *      （横幅演出）、FLAG:82 变 1、角色 35 入队（夹具层）+ 引擎真方法
 *      接受该入队（engine-bundle 桥接用例，简报第 3 条：夹具证明
 *      「调了」，引擎证明「接受了」）；
 *   2. FLAG:82 == 1 之后再次满足 FLAG:81 >= 10000 不重复触发；
 *   3. 变异自证见 tools/mutations/ 的本票条目。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const {
  create_add_character,
  create_chara_loader,
  load_engine_bundle,
} = require('./helpers/engine-bundle');
const {
  attach_variable_tables,
  load_repo_variable_tables,
} = require('./helpers/static-tables');

const REPO_ROOT = path.resolve(__dirname, '..');

// 组一个触发结局的世界：威望 70（开局播种值）+ 各领域侵攻度/征服标记。
// human_invasion 缺省 0（人间界组是五组之首，测其它组时必须显式关掉它）
function make_world(
  fixture,
  {
    prestige = 70,
    human_invasion = 0,
    fallen = 0,
    elf_invasion = 0,
    elf_conquered = 0,
    dragon_invasion = 0,
    dragon_conquered = 0,
    heaven_invasion = 0,
    heaven_conquered = 0,
    shrine_invasion = 0,
    shrine_stage = 0,
  } = {},
) {
  fixture.store.set('exflag:99', prestige); // EX_FLAG:99 威望
  fixture.store.set('flag:81', human_invasion); // FLAG:81 人间界侵攻度
  fixture.store.set('flag:82', fallen); // FLAG:82 人间界陷落
  fixture.store.set('flag:86', elf_invasion); // FLAG:86 精灵领域侵攻度
  fixture.store.set('flag:87', elf_conquered); // FLAG:87 精灵领域征服
  fixture.store.set('flag:88', dragon_invasion); // FLAG:88 龙之山脉侵攻度
  fixture.store.set('flag:89', dragon_conquered); // FLAG:89 龙之山脉征服
  fixture.store.set('flag:90', heaven_invasion); // FLAG:90 天界侵攻度
  fixture.store.set('flag:91', heaven_conquered); // FLAG:91 天界征服
  fixture.store.set('exflag:101', shrine_invasion); // EX_FLAG:101 天神宫侵攻度
  fixture.store.set('exflag:102', shrine_stage); // EX_FLAG:102 天神宫阶段
  // 菲娅预设（Chara35.yml 的最小夹具形状）：addCharacter 守卫放行的前提
  fixture.seed_chara(35, { name: '菲娅', callname: '菲娅' });
}

async function run_check(fixture, ...inputs) {
  fixture.set_inputs(...inputs);
  const { invasion_check } = fixture.load_module('page/page-invasion');
  return invasion_check();
}

function history_texts(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

test('【验收 1】FLAG:81 满 10000：ENDING_1 演出一次、菲娅入队并初始化、FLAG:82 = 1、威望 +10', async () => {
  const fixture = create_era_fixture();
  make_world(fixture, { human_invasion: 10000 });
  await run_check(fixture, 0); // 演出询问选 [0] 继续

  // 演出出现（判据 #112：取「演出已出现」即 FLAG:82 == 1，不是游戏退出）
  assert.equal(fixture.store.get('flag:82'), 1, 'FLAG:82 置 1（:38）');
  assert.equal(fixture.store.get('exflag:99'), 80, 'EX_FLAG:99 = 70 + 10');
  assert(
    fixture.chara_no.includes(35),
    '角色 35（菲娅）入队（ADDCHARA 35，:15）',
  );
  assert.equal(
    fixture.store.get('ex_talent:35:104'),
    1,
    'ADDCHARA_EX 分发 CHARA_EX_35：EX_TALENT:104 = 菲娅（:16）',
  );
  // CHAR_INIT 窄路径的一人称（RANDOM_SELF_CALL 的 <9 直设，SELF_CALL.ERB:38-42）
  assert.equal(fixture.store.get('cstr:35:60'), '我', '一人称 = 我');
  assert.equal(fixture.store.get('cflag:35:450'), 9, '一人称档位 = 9');

  const texts = history_texts(fixture);
  assert(
    texts.includes(
      '｜　　　　　　　　魔王终于再次掌握了世界　　　　　　　　　　｜',
    ),
    '横幅演出（:8）',
  );
  assert(
    texts.includes(
      '人间界已经陷落了，不过世上还有很多其它地方，要继续游戏吗？',
    ),
    '继续询问（:22）',
  );
  assert(texts.includes('声望+10'), 'PRINTL 声望+10（:1003）');
  assert(
    texts.includes('*人类皇族公主菲娅，被你抓获了*'),
    'PRINTW 抓获播报（:39）',
  );
  // 选项是按钮且不带手写编号前缀（PR #30，工单「两个容易做错的点」之二）
  assert(
    fixture.lines_history.some(
      (line) =>
        line.type === 'button' &&
        line.accelerator === 0 &&
        line.rendered === '[0] 世界这么大，我想再去看看！',
    ),
    '[0] 按钮由引擎拼快捷键前缀',
  );
  assert(
    fixture.lines_history.some(
      (line) =>
        line.type === 'button' &&
        line.accelerator === 1 &&
        line.rendered === '[1] 我……已经……不想做魔王了……',
    ),
    '[1] 按钮由引擎拼快捷键前缀',
  );
});

test('【验收 2】FLAG:82 == 1 后再次满足 FLAG:81 >= 10000 不重复触发', async () => {
  const fixture = create_era_fixture();
  make_world(fixture, { human_invasion: 10000 });
  await run_check(fixture, 0); // 首次触发
  await run_check(fixture, 0); // FLAG:82 已 1，条件另半边挡住

  const texts = history_texts(fixture);
  assert.equal(
    texts.filter((line) => line.includes('魔王终于再次掌握了世界')).length,
    1,
    'ENDING_1 横幅只出现一次（&& FLAG:82 == 0 的作用）',
  );
  assert.equal(fixture.store.get('exflag:99'), 80, '威望只加一次');
  assert.equal(fixture.chara_no.length, 1, '菲娅不重复入队');
  assert.equal(fixture.store.get('flag:82'), 1);
});

test('选 [1] 退出：era.quit() 抛 Error("quit") 炸穿 invasion_check（真机 throw 型控制流，#148）', async () => {
  const fixture = create_era_fixture();
  make_world(fixture, { human_invasion: 10000 });

  // 引擎 quit() 是 throw 型（app.asar 模块 183 逐字：先发关窗 IPC，再抛
  // Error("quit")；装载循环按 message 静默放行）——QUIT 之后游戏侧一切
  // 语句不可达。夹具逐字镜像（era-fixture.js），异常从 ending_1 炸穿
  // invasion_check 传到测试。旧断言「ended !== 1 哨兵短路」断的是夹具
  // 降格期的巧合：真机上哨兵不存在，威望 +10 的不发生靠异常炸穿（见
  // event-ending.js 的 JSDoc 与 invasion_check 的行内注释）
  let caught;
  await run_check(fixture, 1).catch((e) => {
    caught = e;
  });
  assert(
    caught instanceof Error && caught.message === 'quit',
    'QUIT 的异常炸穿 invasion_check（引擎 throw 型，非哨兵短路）',
  );

  assert(
    fixture.calls.some(({ api, args }) => api === 'quit' && args.length === 0),
    'QUIT → era.quit()（先记录关窗 IPC 再抛，引擎逗号表达式的同构）',
  );
  assert.equal(
    fixture.store.get('flag:82'),
    0,
    '退出路径不置陷落标记（异常炸穿，:38 不可达）',
  );
  assert.equal(
    fixture.store.get('exflag:99'),
    70,
    '威望 +10 不发生（异常炸穿，:1003 不可达——不是哨兵短路）',
  );
});

test('演出横幅只画一次（:33-36 的无效重问分支引擎侧不可达，#130）', async () => {
  const fixture = create_era_fixture();
  make_world(fixture, { human_invasion: 10000 });
  // 原作用例曾喂 5 验证「无效输入重问不重画」。引擎的 input() 只送达已
  // 打印按钮的快捷键（本画面 [0]/[1]），5 在渲染层就被弹回、到不了游戏
  // ——该分支是引擎死路径，重问本身不会发生；横幅只画一次由单次有效输入
  // 直接钉住。喂 5 当场拒收的锁在夹具契约（test/fixture.test.js，#130）
  await run_check(fixture, 0);

  const texts = history_texts(fixture);
  assert.equal(fixture.store.get('flag:82'), 1, '选 0 正常继续');
  assert.equal(
    texts.filter((line) => line.includes('魔王终于再次掌握了世界')).length,
    1,
    '演出横幅只画一次',
  );
});

test('ELSEIF 优先序：人间界与精灵领域同时满 10000 只触发 ENDING_1（:1001-1006）', async () => {
  const fixture = create_era_fixture();
  make_world(fixture, { human_invasion: 10000, elf_invasion: 10000 });
  await run_check(fixture, 0);

  assert.equal(fixture.store.get('flag:82'), 1, '人间界组先命中');
  assert.equal(fixture.store.get('flag:87'), 0, '精灵组未触发');
  assert.equal(fixture.store.get('exflag:99'), 80, '威望只加一组');
});

test('ENDING_3：精灵领域满且未征服 → 置位 1→2、CHAR_GIFT 存根、威望 +10；再查不触发', async () => {
  const fixture = create_era_fixture();
  make_world(fixture, { elf_invasion: 10000 });
  await run_check(fixture);

  assert.equal(fixture.store.get('flag:87'), 2, 'FLAG:87 走完 1→2（:70/:72）');
  assert.equal(fixture.store.get('exflag:99'), 80, 'EX_FLAG:99 += 10');
  const texts = history_texts(fixture);
  assert(
    texts.some((line) => line.includes('@ENDING_3')),
    '横幅演出存根行可见',
  );
  assert(
    texts.some((line) => line.includes('@CHAR_GIFT')),
    'CHAR_GIFT 存根行可见（:71 的 CALL）',
  );
  assert(texts.includes('声望+10'));

  // 判据 FLAG:87 == 0 已被置 2 挡住：再查空转
  await run_check(fixture);
  assert.equal(fixture.store.get('exflag:99'), 80, '已征服不再触发');
});

test('ENDING_4 / ENDING_5：龙之山脉与天界同构（FLAG:89/91 置 2、威望 +10）', async () => {
  const cases = [
    {
      key: 'dragon',
      invasion: 'dragon_invasion',
      flag: 'flag:89',
      name: 'ENDING_4',
    },
    {
      key: 'heaven',
      invasion: 'heaven_invasion',
      flag: 'flag:91',
      name: 'ENDING_5',
    },
  ];
  for (const { invasion, flag, name } of cases) {
    const fixture = create_era_fixture();
    make_world(fixture, { [invasion]: 10000 });
    await run_check(fixture);
    assert.equal(fixture.store.get(flag), 2, `${name}：${flag} 走完 1→2`);
    assert.equal(fixture.store.get('exflag:99'), 80, `${name}：威望 +10`);
    assert(
      history_texts(fixture).some((line) => line.includes(`@${name}`)),
      `${name} 存根行可见`,
    );
  }
});

test('END10_55：天神宫满 10000 且阶段 0 → 嘉德线 +5、威望 +10；EX_FLAG:102 不置（口上 K902 的职责，1:1）', async () => {
  const fixture = create_era_fixture();
  make_world(fixture, { shrine_invasion: 10000 });
  await run_check(fixture);

  assert.equal(
    fixture.store.get('exflag:2810'),
    5,
    'EX_FLAG:2810 += 5（:486）',
  );
  assert.equal(fixture.store.get('exflag:99'), 80, 'EX_FLAG:99 += 10');
  assert.equal(
    fixture.store.get('exflag:102'),
    0,
    '判据 102 原作不置（K902 置）',
  );
  assert(
    history_texts(fixture).some((line) => line.includes('@END10_55')),
    'END10_55 存根行可见',
  );
});

test('五组全不满足：零输出、威望不动（窄路径的常态）', async () => {
  const fixture = create_era_fixture();
  make_world(fixture, { human_invasion: 9999 });
  await run_check(fixture);

  assert.equal(history_texts(fixture).length, 0, '空转零输出');
  assert.equal(fixture.store.get('exflag:99'), 70);
  assert.equal(fixture.store.get('flag:82'), 0);
});

test('贯通：出兵封顶 10000 → 结算尾触发 ENDING_1 → 选 0 继续后 invasion() 仍返回 1（走 TURNEND）', async () => {
  const fixture = create_era_fixture();
  make_world(fixture, { prestige: 90, human_invasion: 9900 });
  fixture.store.set('base:0:1', 10000);
  fixture.store.set('maxbase:0:1', 10000);
  fixture.store.set('callname:0:-1', '你');
  // [109] 主菜单 → 侵略画面选 [1] 出兵 → ENDING_1 询问选 [0] 继续
  fixture.set_inputs(109, 1, 0);
  const { run_shop } = fixture.load_module('page/page-shop');
  const { BeginSignal } = fixture.load_module('system/flow/begin-signal');

  await assert.rejects(
    () => run_shop(),
    (e) => e instanceof BeginSignal && e.state === 'TURNEND',
    '结局演出后照常走 BEGIN TURNEND（中场结局不是游戏终止）',
  );
  assert.equal(fixture.store.get('flag:81'), 10000, '侵攻度封顶 10000');
  assert.equal(fixture.store.get('flag:82'), 1, '演出已出现');
});

test('存根清单核对：event-ending 与 chara-init 的 STUBBED_CALLS 全部收录进 docs/stub-registry.md', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS: ENDING_STUBS } =
    fixture.load_module('event/event-ending');
  const { STUBBED_CALLS: INIT_STUBS } = fixture.load_module('chara/chara-init');
  assert.deepEqual(ENDING_STUBS, [
    'ENDING_2',
    'ENDING_3',
    'ENDING_4',
    'ENDING_5',
    'END10_55',
    'CHAR_GIFT',
  ]);
  assert.deepEqual(INIT_STUBS, [
    'ST_UP',
    'WEARING_CLOTH_ABLE',
    'SET_SUIT_SELFCALL',
    'SET_NICK_SELFCALL',
    'CHAR_BODY_GENERATE_WAPPED',
    'CSVCSTR',
  ]);
  const registry = fs.readFileSync(
    path.resolve(REPO_ROOT, 'docs', 'stub-registry.md'),
    'utf8',
  );
  for (const name of [...ENDING_STUBS, ...INIT_STUBS]) {
    assert(registry.includes(name), `存根清单缺少 ${name}`);
  }
});

// —— 引擎桥接（简报第 3 条）：夹具证明「调了」，引擎真方法证明「接受了」 ——
// #21/#22 的教训：addCharacter 对无预设角色静默返回 false，夹具的记录层
// 看不见这层短路。这里用引擎自己的装载循环 + addCharacter 方法体验证
// ENDING_1 发出的 addCharacter(35) 在引擎侧也会被接受（Chara35.yml 自 #113
// 入库）。缺引擎（无 app.asar）时整组 skip，跳过数进基线。

const engine = load_engine_bundle();
const engine_test = engine ? test : test.skip;

engine_test(
  '引擎 addCharacter：ENDING_1 的入队调用被引擎接受（装载 Chara35.yml 后 add(35) = true，data.no = [35]）',
  () => {
    const repo_tables = load_repo_variable_tables();
    const loader = create_chara_loader();
    attach_variable_tables(loader, repo_tables);
    const product = fs.readFileSync(
      path.join(REPO_ROOT, 'yml', 'Chara35.yml'),
      'utf8',
    );
    loader.load_rows(engine.parse_data_file(product, 'yml', 'chara'));
    assert.deepEqual(loader.errors, [], 'Chara35.yml 装载零错');

    const adder = create_add_character(loader.static_data);
    assert.equal(adder.add(35), true, '引擎接受角色 35 入队（非短路 false）');
    assert.deepEqual(adder.data.no, [35], '角色 35 进入引擎 data.no');
    // callname 双下标：SAVESTR:35 = %CALLNAME:35% 的承载（#5 决议，引擎写）
    assert.equal(adder.data.callname[35][-2], '菲娅');
  },
);
