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

/**
 * 按钮条目的引擎实显文本（「[快捷键] 正文」，showAcc 默认为真；#572）。
 * 断言按钮化必须看这里——只看 text 会漏掉正文里手写的 [N] 前缀
 * （AGENTS.md 硬约束，PR #30 实机撞见）。
 */
function button_rendered(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'button')
    .map((line) => line.rendered);
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
        line.rendered === '[0] - 世界这么大，我想再去看看！',
    ),
    '[0] 按钮由引擎拼快捷键前缀，正文带原作的「- 」（ENDING ver 1.0.1.ERB:29）',
  );
  assert(
    fixture.lines_history.some(
      (line) =>
        line.type === 'button' &&
        line.accelerator === 1 &&
        line.rendered === '[1] - 我……已经……不想做魔王了……',
    ),
    '[1] 按钮由引擎拼快捷键前缀，正文带原作的「- 」（ENDING ver 1.0.1.ERB:30）',
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

// —— @ENDING_2 真身（#173 H4）：魔王城陷落的真 GAMEOVER ——

test('ENDING_2：横幅 + 封印播报（%SAVESTR:TARGET% 取 TARGET 指针的名字）+ GAMEOVER 行 + INPUT 后 quit 抛出', async () => {
  const fixture = create_era_fixture();
  // 两个角色在场：TARGET 指针指向 1——封印播报必须取指针的名字，不是
  // 「最近的」「随便一个」角色（票面 #173：取 TARGET 不是队长 ARG:0，
  // 差异属原作行为，照抄）
  fixture.seed_chara(1, { id: 1, name: '阿尔', callname: '阿尔' });
  fixture.seed_chara(2, { id: 2, name: '贝丝', callname: '贝丝' });
  fixture.era.addCharacter(1);
  fixture.era.addCharacter(2);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 1;
  const { ending_2 } = fixture.load_module('event/event-ending');

  fixture.set_inputs(0); // :55 INPUT（仪式性确认，结果不被消费）
  let caught;
  await ending_2().catch((e) => {
    caught = e;
  });
  // :56 QUIT：throw 型（#148）——异常炸穿本函数，无 RETURN
  assert(
    caught instanceof Error && caught.message === 'quit',
    'QUIT 的异常从 ending_2 炸出（真 GAMEOVER，无 RETURN）',
  );
  assert(
    fixture.calls.some(({ api }) => api === 'quit'),
    'QUIT → era.quit()（关窗 IPC 已记录）',
  );
  // 演出八行逐字（:45-54）
  const texts = history_texts(fixture);
  assert.deepEqual(
    texts,
    [
      '┌─────────────────────────────┐',
      '｜　　　　　　新的女勇者，终于攻陷了魔王的地下城　　　　　　｜',
      '｜　　　　　　魔王将打倒自己的勇者的模样铭记于心　　　　　　｜',
      '｜　　　带着一丝不易察觉的微笑，再次陷入了封印的沉睡之中　　｜',
      '└─────────────────────────────┘',
      '*勇者阿尔封印了魔王，被后人歌颂为传说中的勇者*',
      '  ',
      '-------------------------------GAMEOVER---------------------------------',
    ],
    '横幅 6 行 + 封印播报 + 空行（两个尾随空格）+ GAMEOVER 分隔行（:46-54 逐字）',
  );
  // :52 的名字来自 TARGET 指针（callname:1:-1，不是 2 的「贝丝」）
  // :52 PRINTFORMW 的读键（waitAnyKey，print 置位 allowWait 后真等）在
  // 前、:55 INPUT（确认用）在后——顺序即 :52 → :55 → :56 的执行序
  assert.deepEqual(
    fixture.inputs_consumed.map(({ api, value }) =>
      value === undefined ? api : `${api}:${value}`,
    ),
    ['waitAnyKey', 'input:0'],
    'PRINTFORMW 读键在前、INPUT 恰一次在 QUIT 之前（:52/:55/:56 的顺序）',
  );
});

test('ENDING_2·TARGET 判据：指针指向 2 时封印播报取 2 的名字（非写死、非队长）', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(1, { id: 1, name: '阿尔', callname: '阿尔' });
  fixture.seed_chara(2, { id: 2, name: '贝丝', callname: '贝丝' });
  fixture.era.addCharacter(1);
  fixture.era.addCharacter(2);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 2;
  const { ending_2 } = fixture.load_module('event/event-ending');

  fixture.set_inputs(0);
  await ending_2().catch(() => {});
  assert(
    history_texts(fixture).includes(
      '*勇者贝丝封印了魔王，被后人歌颂为传说中的勇者*',
    ),
    '封印播报随 TARGET 指针取名（%SAVESTR:TARGET% 的 1:1）',
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

// —— #404（N20）：三个领域结局的横幅 + @CHAR_GIFT 真身 ——
// 三个 ARG 档（1/5/6）的文案与角色号用一张表走完；预设角色收下（[0]）是
// 最短路径，自选路线（另外挑选 → 随机角色 → 性格/发色 → 决定）另起用例。

const GIFT_CASES = [
  {
    name: 'ENDING_3',
    invasion: 'elf_invasion',
    arg: 1,
    no_chara: 31,
    flag: 'flag:87',
    banner: '｜　　　　　　　　魔王终于征服了精灵族的领域　　　　　　　　｜',
    gift_line: '精灵族圣女琼被精灵族作为贡品献了上来………',
    ask: '要收下精灵族圣女作为贡品吗？',
  },
  {
    name: 'ENDING_4',
    invasion: 'dragon_invasion',
    arg: 5,
    no_chara: 32,
    flag: 'flag:89',
    banner: '｜　　　　　　　　　魔王终于征服了龙族的山脉　　　　　　　　｜',
    gift_line: '龙族公主菲娅被龙族长老作为贡品献了上来………',
    ask: '要收下龙族公主作为贡品吗？',
  },
  {
    name: 'ENDING_5',
    invasion: 'heaven_invasion',
    arg: 6,
    no_chara: 33,
    flag: 'flag:91',
    banner: '｜　　　　　　　　　　魔王终于征服了天界　　　　　　　　　　｜',
    gift_line: '天使族的下任主神嘉德被天使族作为贡品献了上来………',
    ask: '要收下天使族下任主神作为贡品吗？',
  },
];

test('ENDING_3/4/5：横幅 + CHAR_GIFT(arg) 收下预设角色 → 领域 flag 走 1→2、威望 +10（表驱动三档）', async () => {
  for (const c of GIFT_CASES) {
    const fixture = create_era_fixture();
    make_world(fixture, { [c.invasion]: 10000 });
    // 献上对象的预设名（CHAR_GIFT 的 %CSVNAME(n)% 与 addCharacter 的守卫）
    const names = { 31: '琼', 32: '菲娅', 33: '嘉德' };
    fixture.seed_chara(c.no_chara, {
      name: names[c.no_chara],
      callname: names[c.no_chara],
    });
    await run_check(fixture, 0); // CHAR_GIFT 的 [0] 收下她吧

    assert.equal(
      fixture.store.get(c.flag),
      2,
      `${c.name}：${c.flag} 走完 1→2（:70/:72）`,
    );
    assert.deepEqual(
      fixture.var_writes.filter((w) => w.name === c.flag).map((w) => w.value),
      [1, 2],
      `${c.name}：先置 1（防重复触发态）再置 2`,
    );
    assert.equal(fixture.store.get('exflag:99'), 80, `${c.name}：威望 +10`);
    const texts = history_texts(fixture);
    assert(texts.includes(c.banner), `${c.name}：横幅逐字`);
    assert(
      texts.includes(c.gift_line),
      `${c.name}：LOCALS:10 的 %CSVNAME% 拼串`,
    );
    assert(texts.includes(c.ask), `${c.name}：LOCALS:20 的询问`);
    // #572：:184 的两项已是按钮（正文不带 [N]，引擎按 showAcc 拼）
    for (const option of ['[0] 收下她吧', '[1] 另外挑选']) {
      assert(
        button_rendered(fixture).includes(option),
        `${c.name}：:184 选项 ${option}`,
      );
    }
    assert(
      texts.includes('*****************************************'),
      `${c.name}：:177/:179 的分隔行`,
    );
    assert(
      fixture.chara_no.includes(c.no_chara),
      `${c.name}：收下 = 角色 ${c.no_chara} 在队`,
    );

    // 判据已被置 2 挡住：再查空转、不重复入队
    await run_check(fixture);
    assert.equal(
      fixture.store.get('exflag:99'),
      80,
      `${c.name}：已征服不再触发`,
    );
    assert.equal(
      fixture.chara_no.filter((id) => id === c.no_chara).length,
      1,
      `${c.name}：不重复入队`,
    );
  }
});

test('CHAR_GIFT：ARG 不在 1/5/6 三档 → THROW INVALID ARGUMENT（:162-163）', async () => {
  const fixture = create_era_fixture();
  const { char_gift } = fixture.load_module('event/event-ending');
  await assert.rejects(() => char_gift(2), /INVALID ARGUMENT/);
  await assert.rejects(() => char_gift(0), /INVALID ARGUMENT/);
});

test('CHAR_GIFT 自选路线：另外挑选 → 随机角色 → 性格/发色子菜单 → 决定（:190-296）', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(31, { name: '琼', callname: '琼' });
  fixture.seed_chara(5, { name: '路人五', callname: '路人五' });
  fixture.seed_chara(0, { name: '你', callname: '你' });
  fixture.store.set('talentname:161', '自信家');
  fixture.store.set('callname:5:-1', '路人五');
  const { char_gift } = fixture.load_module('event/event-ending');
  // 输入序列：另外挑选(1) → 性格([0]) → 胆量 1（自信家）→ 决定(100) → 收下(0)
  fixture.set_inputs(1, 0, 1, 100, 0);
  await char_gift(1, seq([4])); // RAND(1, 17) → 4 + 1 = 角色 5

  assert.ok(fixture.chara_no.includes(5), '随机角色 5 入队');
  assert.equal(
    fixture.chara_no.includes(31),
    false,
    '预设角色 31 被退掉（PARTY_CHAR_DEL + DELCHARA）',
  );
  assert.equal(
    fixture.store.get('talent:5:161'),
    1,
    'CHAR_MAKE 按 PERSONAL=161 生成',
  );
  const texts = history_texts(fixture);
  const buttons = button_rendered(fixture);
  assert(texts.includes('请设定偏好的性格和发色。'), ':210');
  // #572：主菜单三项与两个子菜单都改成按钮，实显文本由引擎按 showAcc 拼
  // （正文里的连续空白折成一个空格，故 `性格 ：  自信家` 实显为 `性格 ： 自信家`）
  assert(
    buttons.includes('[0] 性格 ： 自信家'),
    `:211 的 %TALENTNAME:PERSONAL%（实显：${JSON.stringify(buttons)}）`,
  );
  assert(buttons.includes('[1] 发色 ： 金发'), ':212 的 %GET_LOOK_INFO 默认色');
  assert(buttons.includes('[100] 决定'), ':214');
  assert(texts.includes('请选择偏好的性格。'), ':219');
  for (const option of [
    '[0] - 慈爱',
    '[1] - 自信家',
    '[2] - 懦弱',
    '[3] - 高贵',
    '[4] - 冷静',
    '[5] - 恶女',
    '[6] - 智慧',
    '[7] - 庇护者',
  ]) {
    assert(buttons.includes(option), `:220-222 性格菜单 ${option}`);
  }
  // :275 取的是 `%SAVESTR:A%`——角色的称呼，而 A 刚经 CHAR_MAKE 生成
  // （:264-266）。生成链里的命名段（CHARA_MAKE.ERB:18-20 →
  // @CHARA_NAME_RANDOM_DEFINE，**#384 起为真身**）会把 ADDCHARA 从预设拷来的
  // 名字覆盖成随机名：夹具没种名字表（namelistkeys 为空），固定名分支
  // 回落到默认名「佳奈美」。故这里断的是**生成后**的称呼——「路人五」只是
  // ADDCHARA 那一刻的初值，不是这条输出里的值。
  assert(
    texts.includes('精灵族挑选少女佳奈美作为贡品………'),
    ':275（ARG 1 的 LOCALS:40）',
  );
  for (const option of ['[0] 就是她了', '[1] 再换一个', '[2] 去要圣女']) {
    assert(buttons.includes(option), `:280 终局询问 ${option}`);
  }
});

test('CHAR_GIFT 子菜单边界：性格取 0 档（慈爱）、发色取 10 档（暗金发）', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(31, { name: '琼', callname: '琼' });
  fixture.seed_chara(5, { name: '路人五', callname: '路人五' });
  fixture.store.set('talentname:160', '慈爱');
  const { char_gift } = fixture.load_module('event/event-ending');
  // 另外挑选(1) → 性格([0]) → 选 0 → 发色([1]) → 选 10 → 决定(100) → 收下(0)
  fixture.set_inputs(1, 0, 0, 1, 10, 100, 0);
  await char_gift(1, seq([4])); // RAND(1, 17) → 角色 5

  assert.equal(fixture.store.get('talent:5:160'), 1, '性格 0 档 → TALENT:160');
  assert.equal(
    fixture.store.get('talent:5:300'),
    10,
    '发色 10 档 → TALENT:300',
  );
  const buttons = button_rendered(fixture);
  assert(buttons.includes('[0] 性格 ： 慈爱'), '性格标签随 PERSONAL 变');
  assert(buttons.includes('[1] 发色 ： 暗金发'), '发色标签随 TALENT:300 变');
  for (const option of [
    '[1] 金发',
    '[2] 栗发',
    '[3] 黑发',
    '[4] 红发',
    '[5] 银发',
    '[6] 青发',
    '[7] 绿发',
    '[8] 紫发',
    '[9] 白发',
    '[10] 暗金发',
  ]) {
    assert(buttons.includes(option), `:251-252 发色菜单 ${option}`);
  }
});

test('CHAR_GIFT 发色子菜单：未显示的 11 号色仍可键入（#572：保留 useRule: false）', async () => {
  // 原作 :254 的条件是 `RESULT >= 1 && RESULT <= 10 || RESULT == 11`——11 号
  // 发色界面上不显示却仍被受理，收紧白名单会锁死它，故消费点保留
  // `useRule: false`（先例 event-museum.js:83-85）。本用例走真实 input 路径
  // 把这条路径钉住：改回默认白名单即红。
  const fixture = create_era_fixture();
  fixture.seed_chara(31, { name: '琼', callname: '琼' });
  fixture.seed_chara(5, { name: '路人五', callname: '路人五' });
  const { char_gift } = fixture.load_module('event/event-ending');
  // 另外挑选(1) → 发色([1]) → 11 → 决定(100) → 收下(0)
  fixture.set_inputs(1, 1, 11, 100, 0);
  await char_gift(1, seq([4])); // RAND(1, 17) → 角色 5

  assert.equal(fixture.store.get('talent:5:300'), 11, '11 号色落盘');
  assert.equal(fixture.store.get('cflag:5:1'), 0, 'CHAR_MAKE 后清状态位');
});

test('素质互换重置：银黑桃（76 素质 × 30-100）与菲娅（85 素质 × >= 130）各自回起始档', async () => {
  {
    // ENDCHECKSPADE :247-250：淫乱素质且 30-100 段 → 110
    const fixture = setup_route(21, {
      talent: { 85: 0, 76: 1 },
      cflag: { 2: 0, 515: 3 },
    });
    fixture.store.set('exflag:2814', 50);
    const { endcheck_spade } = fixture.load_module('event/event-endcheck');
    await endcheck_spade(seq([0, 0]));
    assert.equal(
      fixture.store.get('exflag:2814'),
      110,
      '银黑桃：76 素质 × 30-100 → 淫乱线起始 11',
    );
    assert.equal(fixture.store.get('cflag:21:515'), 0, '重置清零计数器');
  }
  {
    // ENDCHECKPRINCESS :361-364：恋慕素质且 >= 130 → 30
    const fixture = setup_route(35, {
      talent: { 85: 1, 76: 0 },
      cflag: { 2: 0, 515: 3 },
    });
    fixture.store.set('exflag:2807', 140);
    const { endcheck_princess } = fixture.load_module('event/event-endcheck');
    endcheck_princess();
    assert.equal(
      fixture.store.get('exflag:2807'),
      30,
      '菲娅：85 素质 × >= 130 → 恋慕线起始 3',
    );
    assert.equal(fixture.store.get('cflag:35:515'), 0, '重置清零计数器');
  }
});

test('CHAR_GIFT 子菜单的越界输入：引擎当场拒收（#572：选项已按钮化）', async () => {
  // 旧行为是「性格 >= 8 与 < 0 都落回 160（慈爱）」——按钮化后白名单就是
  // 那八档，越界值在引擎那头被拒收、不回传游戏，该支结构性不可达
  // （1:1 保留，page-ability-up.js 文件头同款登记）。
  for (const picked of [8, -1]) {
    const fixture = create_era_fixture();
    fixture.seed_chara(31, { name: '琼', callname: '琼' });
    fixture.seed_chara(5, { name: '路人五', callname: '路人五' });
    fixture.store.set('talentname:160', '慈爱');
    const { char_gift } = fixture.load_module('event/event-ending');
    fixture.set_inputs(1, 0, picked);
    await assert.rejects(
      () => char_gift(1, seq([4])),
      /输入不合法！请输入以下值之一：0, 1, 2, 3, 4, 5, 6, 7/,
      `性格输入 ${picked} 被引擎拒收`,
    );
  }
});

test('CHAR_GIFT 主菜单的越界输入：引擎当场拒收（#572：选项已按钮化）', async () => {
  // 旧行为是「非 0/1/100 的键回菜单重画（:260-261）」——按钮化后越界值
  // 被引擎拒收，重画支结构性不可达（1:1 保留）。
  const fixture = create_era_fixture();
  fixture.seed_chara(31, { name: '琼', callname: '琼' });
  fixture.seed_chara(5, { name: '路人五', callname: '路人五' });
  const { char_gift } = fixture.load_module('event/event-ending');
  fixture.set_inputs(1, 7);
  await assert.rejects(
    () => char_gift(1, seq([4])),
    /输入不合法！请输入以下值之一：0, 1, 100/,
  );
});

test('CHAR_GIFT 终局 [2]「去要圣女」：退掉随机角色、回到预设角色的 loop 0', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(31, { name: '琼', callname: '琼' });
  fixture.seed_chara(5, { name: '路人五', callname: '路人五' });
  const { char_gift } = fixture.load_module('event/event-ending');
  // 另外挑选(1) → 决定(100) → 终局 [2] 回预设 → [0] 收下预设
  fixture.set_inputs(1, 100, 2, 0);
  const result = await char_gift(1, seq([4]));
  assert.equal(result, undefined, '收下预设角色的 RETURN 无值');
  assert.ok(fixture.chara_no.includes(31), '预设角色 31 再次入队并被收下');
  assert.equal(
    fixture.chara_no.includes(5),
    false,
    '随机角色 5 在 [2] 支里被退掉（PARTY_CHAR_DEL + DELCHARA）',
  );
  assert.equal(
    button_rendered(fixture).filter((t) => t === '[0] 收下她吧').length,
    2,
    '预设询问出现两次（loop 0 回到起点；#572 起是按钮）',
  );
});

test('CHAR_GIFT 的种族年龄支：FLAG:5 位 12/13 为真时把 race_age_generate 的返回值写进 CFLAG:452', async () => {
  // 种族年龄表（FLAG:26/27）按 #385 的种子；两档都在下面独立算出期望值
  const RACE_TABLE_0 = [11, 115, 431, 325, 15, 232];
  const RACE_TABLE_1 = [1, 1];
  const seed = (fixture, bits) => {
    fixture.seed_chara(31, { name: '琼', callname: '琼' });
    fixture.seed_chara(5, { name: '路人五', callname: '路人五' });
    fixture.store.set('flag:5', bits);
    fixture.store.set('flag:26', [...RACE_TABLE_0]);
    fixture.store.set('flag:27', [...RACE_TABLE_1]);
    fixture.store.set('cflag:5:451', 17); // 人类换算年龄的初值（角色生成会重算它）
  };

  for (const bit of [12, 13]) {
    // #389 勘误：种族不再能靠预置 TALENT:314 指定——@CM_LOOK 接上 LOOK_SET
    // 真身后它会重掷 RAND:200 并覆盖（源 :330），且 @CHAR_GIFT 调用本流程时
    // 把**自己的 ARG 当种族设定传下去**（源 ENDING :264 `CALL CHAR_MAKE,
    // PERSONAL, ARG` → CM_LOOK 的 ARG:2），于是礼物档位决定种族：ARG=1 精灵。
    // 精灵是槽 0 = 011（整数倍档）：返回值 = 年龄 × 10 + RAND:10
    const fixture = create_era_fixture();
    seed(fixture, 1 << bit);
    const { char_gift } = fixture.load_module('event/event-ending');
    fixture.set_inputs(1, 100, 0);
    await char_gift(1, (n) => (n === 16 ? 4 : 0)); // 16 → 4 → 随机角色 5
    assert.equal(fixture.store.get('talent:5:314'), 1, `位 ${bit}：精灵`);
    const human = fixture.store.get('cflag:5:451');
    assert.ok(human > 0, `位 ${bit}：前置——角色生成给出了人类换算年龄`);
    const expected = human * 10; // 精灵档的换算（独立写死算式）
    assert.equal(
      fixture.store.get('cflag:5:452'),
      expected,
      `位 ${bit} 为真：精灵的返回值 ${expected} 落进 CFLAG:452`,
    );
    assert.notEqual(
      fixture.store.get('cflag:5:452'),
      human,
      `位 ${bit} 为真：落的是**返回值**，不是入参 CFLAG:451（${human}）`,
    );
  }

  {
    // 龙族（槽 4 = 015）：整数倍档，返回值 = 年龄 × 50 + RAND:50；
    // 注入的随机源在 [16] 上返回 4（选角色 5）、其余返回 3——档内的 RAND:50
    // 必须是**这个**源（记录到的上界里最后一条就是它）
    const fixture = create_era_fixture();
    seed(fixture, 1 << 12);
    fixture.seed_chara(32, { name: '龙族公主', callname: '龙族公主' });
    const { char_gift } = fixture.load_module('event/event-ending');
    const bounds = [];
    // 换一个礼物档位换种族：ARG=5 龙族公主 → 种族设定 5 → LOOK_SET 的
    // `ELSEIF … || ARG == 5` → 种族 5（槽 4 = 015，整数倍档 ×50）
    const source = (n) => {
      bounds.push(n);
      return n === 16 ? 4 : 3;
    };
    fixture.set_inputs(1, 100, 0);
    await char_gift(5, source);
    const human = fixture.store.get('cflag:5:451');
    assert.equal(
      bounds.at(-1),
      50,
      '龙族档的 RAND:50 走的是注入的随机源（透传 rand，没落到真随机）',
    );
    assert.equal(
      fixture.store.get('cflag:5:452'),
      human * 50 + 3,
      '龙族：年龄 × 50 + RAND:50（注入源恒返回 3）',
    );
  }

  {
    // 两位都为假：整支不走，CFLAG:452 保持 0
    const fixture = create_era_fixture();
    seed(fixture, 0);
    const { char_gift } = fixture.load_module('event/event-ending');
    fixture.set_inputs(1, 100, 0);
    await char_gift(1, (n) => (n === 16 ? 4 : 0));
    assert.equal(
      fixture.store.get('cflag:5:452') || 0,
      0,
      '位 12/13 都为假时不写 CFLAG:452',
    );
  }
});

test('ENDINCONSQSELECT：ARG != 7 时只读一次键、无输出（:1035 的 CASEELSE 空档）', async () => {
  const fixture = create_era_fixture();
  const { inconseq_select } = fixture.load_module('event/event-ending');
  fixture.set_inputs(1);
  await inconseq_select(8);
  assert.equal(history_texts(fixture).length, 0, '非 7 的 ARG 不产出行');
  assert.equal(
    fixture.inputs_consumed.filter(({ api }) => api === 'input').length,
    1,
    'INPUT 仍读一次',
  );
});

test('END10_55：天神宫满 10000 且阶段 0 → 八行演出 + 嘉德线 +5、威望 +10；EX_FLAG:102 不置（口上 K902 的职责，1:1）', async () => {
  const fixture = create_era_fixture();
  make_world(fixture, { shrine_invasion: 10000 });
  await run_check(fixture);

  assert.equal(
    fixture.store.get('exflag:2810'),
    5,
    'EX_FLAG:2810 += 5（:485）',
  );
  assert.equal(fixture.store.get('exflag:99'), 80, 'EX_FLAG:99 += 10');
  assert.equal(
    fixture.store.get('exflag:102'),
    0,
    '判据 102 原作不置（K902 置）',
  );
  const texts = history_texts(fixture);
  assert(
    texts.includes(
      '当你突破层层包围、攻入天界宫广场时、首先看到的却是嘉德被六个人包围在其中的身影',
    ),
    'END10_55 首行（:477）',
  );
  assert(texts.includes('战斗、一触即发。'), 'END10_55 末行（:484）');
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

// —— #404（N20）结局链：四条角色线的推进判定状态机 ——
// 源 ENDINGDATA.ERB:143-207（黑方片）/ :208-352（银黑桃）/ :353-480（菲娅）
// 与 ENDINGDATA_ADDON1.ERB:1-144（嘉德）/ :146-153（嘉德离队后天神宫）。
// 每条线一个表驱动用例走完整个档位维度（工单覆盖面标准），不在表里的
// 分支另起用例。

/** 确定性随机源：#404 的 RAND 点（RAND:5 掷档、RAND:200 乳业收入） */
function seq(values) {
  let i = 0;
  return () => values[i++ % values.length];
}

/** 建一个含指定角色在场的夹具；talent/cflag 由调用点按档位预置 */
function setup_route(cid, { talent = {}, cflag = {} } = {}) {
  const fixture = create_era_fixture();
  fixture.seed_chara(cid, {
    id: cid,
    name: `角色${cid}`,
    callname: `角色${cid}`,
  });
  fixture.era.addCharacter(cid);
  for (const [idx, value] of Object.entries(talent)) {
    fixture.store.set(`talent:${cid}:${idx}`, value);
  }
  for (const [idx, value] of Object.entries(cflag)) {
    fixture.store.set(`cflag:${cid}:${idx}`, value);
  }
  return fixture;
}

test('ENDCHECKSQUARE 恋慕阶梯：档位 × 门槛表驱动走完 10→90 与 300 档', async () => {
  // 表：起始档位 / CFLAG:2 好感 / CFLAG:515 计数器 / ABL 攻+敏 / 期望档位与计数器
  const CASES = [
    // :157-158 起步：好感 >= 2000 且线值 < 10
    {
      stage: 9,
      c2: 2000,
      c515: 0,
      abl: 0,
      want: 10,
      want515: 0,
      why: '起步档',
    },
    {
      stage: 9,
      c2: 1999,
      c515: 0,
      abl: 0,
      want: 9,
      want515: 0,
      why: '好感 1999 不够',
    },
    // :159-161 10→20 门槛 5000
    {
      stage: 10,
      c2: 5000,
      c515: 0,
      abl: 0,
      want: 20,
      want515: 0,
      why: '10→20',
    },
    {
      stage: 10,
      c2: 4999,
      c515: 0,
      abl: 0,
      want: 10,
      want515: 0,
      why: '4999 不够',
    },
    // :162-164 20→30 门槛 10000
    {
      stage: 20,
      c2: 10000,
      c515: 0,
      abl: 0,
      want: 30,
      want515: 0,
      why: '20→30',
    },
    {
      stage: 20,
      c2: 9999,
      c515: 0,
      abl: 0,
      want: 20,
      want515: 0,
      why: '9999 不够',
    },
    // :165-168 30→40 门槛 ABL:10 + ABL:16 >= 14（CFLAG:515 无条件清零）
    { stage: 30, c2: 0, c515: 7, abl: 14, want: 40, want515: 0, why: '30→40' },
    {
      stage: 30,
      c2: 0,
      c515: 7,
      abl: 13,
      want: 30,
      want515: 0,
      why: '13 不够',
    },
    // :169-198 五段计数器阶梯（达标跳档 / 未达标 +1）
    { stage: 40, c2: 0, c515: 10, abl: 0, want: 50, want515: 10, why: '40→50' },
    {
      stage: 40,
      c2: 0,
      c515: 9,
      abl: 0,
      want: 40,
      want515: 10,
      why: '40 差 1',
    },
    { stage: 50, c2: 0, c515: 30, abl: 0, want: 60, want515: 30, why: '50→60' },
    {
      stage: 50,
      c2: 0,
      c515: 29,
      abl: 0,
      want: 50,
      want515: 30,
      why: '50 差 1',
    },
    { stage: 60, c2: 0, c515: 60, abl: 0, want: 70, want515: 60, why: '60→70' },
    {
      stage: 60,
      c2: 0,
      c515: 59,
      abl: 0,
      want: 60,
      want515: 60,
      why: '60 差 1',
    },
    {
      stage: 70,
      c2: 0,
      c515: 100,
      abl: 0,
      want: 80,
      want515: 100,
      why: '70→80',
    },
    {
      stage: 70,
      c2: 0,
      c515: 99,
      abl: 0,
      want: 70,
      want515: 100,
      why: '70 差 1',
    },
    {
      stage: 80,
      c2: 0,
      c515: 150,
      abl: 0,
      want: 90,
      want515: 150,
      why: '80→90',
    },
    {
      stage: 80,
      c2: 0,
      c515: 149,
      abl: 0,
      want: 80,
      want515: 150,
      why: '80 差 1',
    },
    // :199-206 300 档：RAND:5 命中 0 才 +10（无门槛、计数器不动）
    {
      stage: 300,
      c2: 0,
      c515: 0,
      abl: 0,
      rand: [0],
      want: 310,
      want515: 0,
      why: '300 掷中',
    },
    {
      stage: 300,
      c2: 0,
      c515: 0,
      abl: 0,
      rand: [4],
      want: 300,
      want515: 0,
      why: '300 未掷中',
    },
  ];
  for (const c of CASES) {
    const fixture = setup_route(22, {
      talent: { 85: 1 },
      cflag: { 2: c.c2, 515: c.c515 },
    });
    fixture.store.set('exflag:2811', c.stage);
    fixture.store.set('abl:22:10', c.abl);
    fixture.store.set('abl:22:16', 0);
    const { endcheck_square } = fixture.load_module('event/event-endcheck');
    endcheck_square(seq(c.rand ?? []));
    assert.equal(
      fixture.store.get('exflag:2811'),
      c.want,
      `${c.why}：档位 ${c.stage} → ${c.want}`,
    );
    assert.equal(
      fixture.store.get('cflag:22:515'),
      c.want515,
      `${c.why}：计数器 ${c.c515} → ${c.want515}`,
    );
  }
});

test('ENDCHECKSQUARE 无恋慕素质（TALENT:85 != 1）时阶梯整段不动', async () => {
  const fixture = setup_route(22, {
    talent: { 85: 0 },
    cflag: { 2: 99999, 515: 0 },
  });
  fixture.store.set('exflag:2811', 9);
  const { endcheck_square } = fixture.load_module('event/event-endcheck');
  endcheck_square(seq([0]));
  assert.equal(fixture.store.get('exflag:2811'), 9, '素质不在：起步条件不成立');
});

test('ENDCHECKSQUARE 素质互换重置：恋慕 100-200 → 10、淫乱 30-100/300-310 → 110', async () => {
  // reset = 重置块是否命中（命中才断言计数器清零；未命中的档计数器保持原值）
  const CASES = [
    {
      talent: { 85: 1, 76: 0 },
      stage: 100,
      want: 10,
      reset: true,
      why: '恋慕线区间重置到起始 1',
    },
    {
      talent: { 85: 1, 76: 0 },
      stage: 200,
      want: 10,
      reset: true,
      why: '恋慕线区间上界含',
    },
    {
      talent: { 85: 0, 76: 1 },
      stage: 30,
      want: 110,
      reset: true,
      why: '淫乱线 30-100 段',
    },
    {
      talent: { 85: 0, 76: 1 },
      stage: 100,
      want: 110,
      reset: true,
      why: '淫乱线 100 含',
    },
    {
      talent: { 85: 0, 76: 1 },
      stage: 300,
      want: 110,
      reset: true,
      why: '淫乱线 300-310 段',
    },
    {
      talent: { 85: 0, 76: 1 },
      stage: 310,
      want: 110,
      reset: true,
      why: '淫乱线 310 含',
    },
    {
      talent: { 85: 0, 76: 1 },
      stage: 311,
      want: 311,
      reset: false,
      why: '311 不在区间',
    },
    {
      talent: { 85: 1, 76: 0 },
      stage: 99,
      want: 99,
      reset: false,
      why: '99 不在恋慕区间',
    },
  ];
  for (const c of CASES) {
    const fixture = setup_route(22, {
      talent: c.talent,
      cflag: { 2: 0, 515: 5 },
    });
    fixture.store.set('exflag:2811', c.stage);
    const { endcheck_square } = fixture.load_module('event/event-endcheck');
    endcheck_square(seq([1]));
    assert.equal(fixture.store.get('exflag:2811'), c.want, c.why);
    // 重置块命中时计数器清零；未命中时保持预置的 5（阶梯对 30-90 之外的档
    // 无动作）——两种结果都是原作的形态
    assert.equal(
      fixture.store.get('cflag:22:515'),
      c.reset ? 0 : 5,
      `${c.why}：计数器`,
    );
  }
});

test('ENDCHECKSQUARE 不在场时整段空转（GETCHARA(22) < 0）', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  fixture.store.set('exflag:2811', 100);
  fixture.store.set('talent:22:85', 1);
  const { endcheck_square } = fixture.load_module('event/event-endcheck');
  endcheck_square(seq([0]));
  assert.equal(
    fixture.store.get('exflag:2811'),
    100,
    '不在场：读数全 0，不重置',
  );
});

test('ENDCHECKSPADE 恋慕与淫乱双阶梯表驱动', async () => {
  const L = { 85: 1, 76: 0 }; // 恋慕素质
  const X = { 85: 0, 76: 1 }; // 淫乱素质
  const CASES = [
    // :253-301 恋慕线（TALENT:85）
    {
      stage: 9,
      c2: 2000,
      c515: 0,
      want: 10,
      want515: 0,
      t: L,
      why: '恋慕起步',
    },
    {
      stage: 10,
      c2: 5000,
      c515: 0,
      want: 20,
      want515: 0,
      t: L,
      why: '恋慕 10→20',
    },
    {
      stage: 20,
      c2: 10000,
      c515: 0,
      want: 30,
      want515: 0,
      t: L,
      why: '恋慕 20→30',
    },
    {
      stage: 40,
      c2: 0,
      c515: 10,
      want: 50,
      want515: 10,
      t: L,
      why: '恋慕 40→50',
    },
    {
      stage: 40,
      c2: 0,
      c515: 9,
      want: 40,
      want515: 10,
      t: L,
      why: '恋慕 40 差 1',
    },
    {
      stage: 50,
      c2: 0,
      c515: 30,
      want: 60,
      want515: 30,
      t: L,
      why: '恋慕 50→60',
    },
    {
      stage: 60,
      c2: 0,
      c515: 60,
      want: 70,
      want515: 60,
      t: L,
      why: '恋慕 60→70',
    },
    {
      stage: 70,
      c2: 0,
      c515: 100,
      want: 80,
      want515: 100,
      t: L,
      why: '恋慕 70→80',
    },
    {
      stage: 80,
      c2: 0,
      c515: 150,
      want: 90,
      want515: 150,
      t: L,
      why: '恋慕 80→90',
    },
    {
      stage: 300,
      c2: 0,
      c515: 10,
      want: 310,
      want515: 10,
      t: L,
      why: '恋慕 300→310',
    },
    {
      stage: 300,
      c2: 0,
      c515: 9,
      want: 300,
      want515: 10,
      t: L,
      why: '恋慕 300 差 1',
    },
    // :303-351 淫乱线（TALENT:76）
    {
      stage: 9,
      c2: 2000,
      c515: 0,
      want: 110,
      want515: 0,
      t: X,
      why: '淫乱起步',
    },
    {
      stage: 110,
      c2: 5000,
      c515: 0,
      want: 120,
      want515: 0,
      t: X,
      why: '淫乱 110→120',
    },
    {
      stage: 120,
      c2: 0,
      c515: 2,
      want: 130,
      want515: 2,
      t: X,
      why: '淫乱 120→130',
    },
    {
      stage: 120,
      c2: 0,
      c515: 1,
      want: 120,
      want515: 2,
      t: X,
      why: '淫乱 120 差 1',
    },
    {
      stage: 130,
      c2: 10000,
      c515: 0,
      want: 140,
      want515: 0,
      t: X,
      why: '淫乱 130→140',
    },
    {
      stage: 150,
      c2: 0,
      c515: 10,
      want: 160,
      want515: 10,
      t: X,
      why: '淫乱 150→160',
    },
    {
      stage: 150,
      c2: 0,
      c515: 9,
      want: 150,
      want515: 10,
      t: X,
      why: '淫乱 150 差 1',
    },
    {
      stage: 160,
      c2: 0,
      c515: 30,
      want: 170,
      want515: 30,
      t: X,
      why: '淫乱 160→170',
    },
    {
      stage: 170,
      c2: 0,
      c515: 60,
      want: 180,
      want515: 60,
      t: X,
      why: '淫乱 170→180',
    },
    {
      stage: 180,
      c2: 0,
      c515: 100,
      want: 190,
      want515: 100,
      t: X,
      why: '淫乱 180→190',
    },
    {
      stage: 190,
      c2: 0,
      c515: 150,
      want: 200,
      want515: 150,
      t: X,
      why: '淫乱 190→200',
    },
  ];
  for (const c of CASES) {
    const fixture = setup_route(21, {
      talent: c.t,
      cflag: { 2: c.c2, 515: c.c515 },
    });
    fixture.store.set('exflag:2814', c.stage);
    const { endcheck_spade } = fixture.load_module('event/event-endcheck');
    await endcheck_spade(seq([0, 0])); // 151 档以上会走乳业收入分支（异步）
    assert.equal(fixture.store.get('exflag:2814'), c.want, c.why);
    assert.equal(
      fixture.store.get('cflag:21:515'),
      c.want515,
      `${c.why}：计数器`,
    );
  }
});

test('ENDCHECKSPADE 淫乱 140 档：ABL:1/17 + TALENT:78 + TALENT:0 四条件合取', async () => {
  const CASES = [
    { abl1: 10, abl17: 5, t78: 1, t0: 0, want: 150, why: '四条件齐 → 150' },
    { abl1: 9, abl17: 5, t78: 1, t0: 0, want: 140, why: 'ABL:1 差 1' },
    {
      abl1: 11,
      abl17: 5,
      t78: 1,
      t0: 0,
      want: 140,
      why: 'ABL:1 超过 10 也不算（严格等号）',
    },
    { abl1: 10, abl17: 4, t78: 1, t0: 0, want: 140, why: 'ABL:17 差 1' },
    { abl1: 10, abl17: 5, t78: 0, t0: 0, want: 140, why: 'TALENT:78 不满足' },
    { abl1: 10, abl17: 5, t78: 1, t0: 1, want: 140, why: 'TALENT:0 不为 0' },
  ];
  for (const c of CASES) {
    const fixture = setup_route(21, {
      talent: { 85: 0, 76: 1, 78: c.t78, 0: c.t0 },
      cflag: { 2: 0, 515: 0 },
    });
    fixture.store.set('exflag:2814', 140);
    fixture.store.set('abl:21:1', c.abl1);
    fixture.store.set('abl:21:17', c.abl17);
    const { endcheck_spade } = fixture.load_module('event/event-endcheck');
    await endcheck_spade(seq([0, 0]));
    assert.equal(fixture.store.get('exflag:2814'), c.want, c.why);
  }
});

test('ENDCHECKSPADE 151 档乳业收入：MONEY 与 EX_FLAG:4444 同步 +（含档位倍率与向零截断）', async () => {
  // 倍率 = trunc((线值 - 140) / 10)：Emuera 整数除法向零截断（operators.md:44），
  // 151 → 1 倍而不是 1.1 倍
  const CASES = [
    { stage: 150, rand: 0, want_money: 0, why: '150 档不足 151：无收入' },
    {
      stage: 151,
      rand: 0,
      want_money: 1 * 200,
      why: '151 档：trunc(11/10) = 1 倍',
    },
    {
      stage: 160,
      rand: 0,
      want_money: 2 * 200,
      why: '160 档：trunc(20/10) = 2 倍（整十档才进一位）',
    },
    {
      stage: 171,
      rand: 99,
      want_money: 3 * 299,
      why: '171 档：trunc(31/10) = 3 倍',
    },
    {
      stage: 169,
      rand: 1,
      want_money: 2 * 201,
      why: '169 档：trunc(29/10) = 2 倍',
    },
  ];
  for (const c of CASES) {
    const fixture = setup_route(21, {
      talent: { 85: 1, 76: 0 },
      cflag: { 2: 0, 515: 0 },
    });
    fixture.store.set('exflag:2814', c.stage);
    fixture.store.set('flag:10004', 1000); // MONEY
    const { endcheck_spade } = fixture.load_module('event/event-endcheck');
    const bounds = []; // 记录随机源拿到的上界（RAND:200 的绑定）
    await endcheck_spade((n) => {
      bounds.push(n);
      return c.rand;
    });
    const gained = fixture.store.get('flag:10004') - 1000;
    assert.equal(gained, c.want_money, `${c.why}：MONEY 增量`);
    assert.equal(
      fixture.store.get('exflag:4444') || 0,
      c.want_money,
      `${c.why}：EX_FLAG:4444 同步增加`,
    );
    if (c.want_money > 0) {
      assert.deepEqual(bounds, [200], `${c.why}：RAND 的上界必须是 200`);
    }
  }
});

test('ENDCHECKPRINCESS 初会与两阶梯：表驱动走完恋慕 70-120 与淫乱 170-220', async () => {
  const CASES = [
    // :356-357 线值 0 → 10（初次会面）
    {
      stage: 0,
      talent: {},
      c515: 0,
      c2: 0,
      want: 10,
      want515: 0,
      why: '初次会面',
    },
    // :409-412 恋慕阶梯（CFLAG:2 门槛）
    { stage: 30, talent: { 85: 1 }, c2: 2000, c515: 0, want: 40, why: '30→40' },
    { stage: 40, talent: { 85: 1 }, c2: 5000, c515: 0, want: 50, why: '40→50' },
    {
      stage: 50,
      talent: { 85: 1 },
      c2: 10000,
      c515: 0,
      want: 60,
      why: '50→60',
    },
    // :397-408 淫乱阶梯（CFLAG:2 门槛）
    {
      stage: 130,
      talent: { 85: 0, 76: 1 },
      c2: 2000,
      c515: 0,
      want: 140,
      why: '130→140',
    },
    {
      stage: 140,
      talent: { 85: 0, 76: 1 },
      c2: 5000,
      c515: 0,
      want: 150,
      why: '140→150',
    },
    {
      stage: 150,
      talent: { 85: 0, 76: 1 },
      c2: 10000,
      c515: 0,
      want: 160,
      why: '150→160',
    },
    // :414-418 CFLAG:601 == 901 的门槛
    {
      stage: 60,
      talent: { 85: 1 },
      c2: 0,
      c515: 5,
      c601: 901,
      want: 70,
      want515: 0,
      why: '60→70',
    },
    {
      stage: 60,
      talent: { 85: 1 },
      c2: 0,
      c515: 5,
      c601: 900,
      want: 60,
      want515: 5,
      why: '601 不是 901',
    },
    // :420-444 恋慕计数器阶梯（515 累积到阈值才跳档）
    {
      stage: 70,
      talent: { 85: 1 },
      c2: 0,
      c515: 9,
      want: 70,
      want515: 10,
      why: '70 累加',
    },
    {
      stage: 70,
      talent: { 85: 1 },
      c2: 0,
      c515: 10,
      want: 80,
      want515: 10,
      why: '70→80',
    },
    {
      stage: 80,
      talent: { 85: 1 },
      c2: 0,
      c515: 30,
      want: 90,
      want515: 30,
      why: '80→90',
    },
    {
      stage: 90,
      talent: { 85: 1 },
      c2: 0,
      c515: 60,
      want: 100,
      want515: 60,
      why: '90→100',
    },
    {
      stage: 100,
      talent: { 85: 1 },
      c2: 0,
      c515: 100,
      want: 110,
      want515: 100,
      why: '100→110',
    },
    {
      stage: 110,
      talent: { 85: 1 },
      c2: 0,
      c515: 150,
      want: 120,
      want515: 150,
      why: '110→120',
    },
    // :448-478 淫乱计数器阶梯
    {
      stage: 170,
      talent: { 85: 0, 76: 1 },
      c2: 0,
      c515: 10,
      want: 180,
      want515: 10,
      why: '170→180',
    },
    {
      stage: 180,
      talent: { 85: 0, 76: 1 },
      c2: 0,
      c515: 30,
      want: 190,
      want515: 30,
      why: '180→190',
    },
    {
      stage: 190,
      talent: { 85: 0, 76: 1 },
      c2: 0,
      c515: 60,
      want: 200,
      want515: 60,
      why: '190→200',
    },
    {
      stage: 200,
      talent: { 85: 0, 76: 1 },
      c2: 0,
      c515: 100,
      want: 210,
      want515: 100,
      why: '200→210',
    },
    {
      stage: 210,
      talent: { 85: 0, 76: 1 },
      c2: 0,
      c515: 150,
      want: 220,
      want515: 150,
      why: '210→220',
    },
    // :445-447 160-170 档是空分支（判定已移到 aftertrain）
    {
      stage: 160,
      talent: { 85: 0, 76: 1 },
      c2: 0,
      c515: 150,
      want: 160,
      want515: 150,
      why: '160 空分支不动',
    },
  ];
  for (const c of CASES) {
    const fixture = setup_route(35, {
      talent: c.talent,
      cflag: { 2: c.c2, 515: c.c515, 601: c.c601 ?? 0 },
    });
    fixture.store.set('exflag:2807', c.stage);
    const { endcheck_princess } = fixture.load_module('event/event-endcheck');
    endcheck_princess();
    assert.equal(fixture.store.get('exflag:2807'), c.want, c.why);
    assert.equal(
      fixture.store.get('cflag:35:515') || 0,
      c.want515 ?? 0,
      `${c.why}：计数器`,
    );
  }
});

test('ENDCHECKPRINCESS 10-20 档：MARK:1/2 == 3 与 TALENT:0 的组合', async () => {
  const CASES = [
    {
      mark1: 3,
      mark2: 0,
      t0: 1,
      want: 20,
      why: 'MARK:1 == 3 且 TALENT:0 真 → 20',
    },
    {
      mark1: 3,
      mark2: 0,
      t0: 0,
      want: -10,
      why: 'MARK:1 == 3 但 TALENT:0 假 → -10（崩坏态）',
    },
    { mark1: 0, mark2: 3, t0: 0, want: -10, why: 'MARK:2 == 3 同理' },
    { mark1: 0, mark2: 0, t0: 0, want: 10, why: '两个 MARK 都不是 3 → 不动' },
  ];
  for (const c of CASES) {
    const fixture = setup_route(35, {
      talent: { 0: c.t0 },
      cflag: { 2: 0, 515: 0 },
    });
    fixture.store.set('exflag:2807', 10);
    fixture.store.set('mark:35:1', c.mark1);
    fixture.store.set('mark:35:2', c.mark2);
    const { endcheck_princess } = fixture.load_module('event/event-endcheck');
    endcheck_princess();
    assert.equal(fixture.store.get('exflag:2807'), c.want, c.why);
  }
});

test('ENDCHECKPRINCESS 20-30 档：恋慕/淫乱素质直接定线，无素质不动', async () => {
  const CASES = [
    { talent: { 85: 1 }, want: 30, why: '恋慕 → 30' },
    { talent: { 85: 0, 76: 1 }, want: 130, why: '淫乱 → 130' },
    { talent: { 85: 0, 76: 0 }, want: 20, why: '都无 → 不动' },
  ];
  for (const c of CASES) {
    const fixture = setup_route(35, {
      talent: c.talent,
      cflag: { 2: 0, 515: 0 },
    });
    fixture.store.set('exflag:2807', 20);
    const { endcheck_princess } = fixture.load_module('event/event-endcheck');
    endcheck_princess();
    assert.equal(fixture.store.get('exflag:2807'), c.want, c.why);
  }
});

test('ENDCHECKGODNESS 淫乱阶梯：表驱动走完 110-190 与 300 档（DAY:1 与嘉德/葵希罗在场守卫）', async () => {
  const CASES = [
    { stage: 9, c2: 2000, c515: 0, want: 110, want515: 0, why: '淫乱起步' },
    {
      stage: 110,
      c2: 5000,
      c515: 70,
      want: 120,
      want515: 71,
      why: '110→120（门槛 <= 5000 且计数器 >= 70），随后无条件累加',
    },
    {
      stage: 110,
      c2: 5001,
      c515: 70,
      want: 110,
      want515: 71,
      why: '好感 5001 超出 <= 5000',
    },
    {
      stage: 120,
      c2: 8000,
      c515: 0,
      want: 130,
      want515: 1,
      why: '120→130（好感 >= 8000），随后无条件累加',
    },
    {
      stage: 120,
      c2: 7999,
      c515: 0,
      want: 120,
      want515: 1,
      why: '120 好感差 1',
    },
    {
      stage: 130,
      c2: 0,
      c515: 0,
      abl: 14,
      want: 140,
      want515: 1,
      why: '130→140（攻+敏 >= 14），随后无条件累加',
    },
    {
      stage: 130,
      c2: 0,
      c515: 0,
      abl: 13,
      want: 130,
      want515: 1,
      why: '130 攻敏差 1',
    },
    {
      stage: 140,
      c2: 0,
      c515: 150,
      day: 350,
      want: 150,
      want515: 150,
      why: '140→150（计数器 150 且 DAY:1 >= 350）',
    },
    {
      stage: 140,
      c2: 0,
      c515: 150,
      day: 349,
      want: 140,
      want515: 150,
      why: '140 DAY:1 差 1',
    },
    {
      stage: 140,
      c2: 0,
      c515: 149,
      day: 400,
      want: 140,
      want515: 150,
      why: '140 计数器差 1',
    },
    {
      stage: 160,
      c2: 0,
      c515: 200,
      day: 350,
      want: 170,
      want515: 200,
      why: '160→170（嘉德在场）',
    },
    {
      stage: 170,
      c2: 0,
      c515: 220,
      day: 350,
      want: 180,
      want515: 220,
      why: '170→180',
    },
    {
      stage: 180,
      c2: 0,
      c515: 250,
      day: 350,
      want: 190,
      want515: 250,
      why: '180→190',
    },
  ];
  for (const c of CASES) {
    const fixture = setup_route(33, {
      talent: { 85: 0, 76: 1 },
      cflag: { 2: c.c2, 515: c.c515 },
    });
    fixture.store.set('exflag:2810', c.stage);
    fixture.store.set('flag:10001', c.day ?? 0); // DAY:1 = 月
    fixture.store.set('abl:33:10', c.abl ?? 0);
    fixture.store.set('abl:33:16', 0);
    const { endcheck_godness } = fixture.load_module('event/event-endcheck');
    endcheck_godness();
    assert.equal(fixture.store.get('exflag:2810'), c.want, c.why);
    assert.equal(
      fixture.store.get('cflag:33:515'),
      c.want515,
      `${c.why}：计数器`,
    );
  }
});

test('ENDCHECKGODNESS 300 档：被素质互换重置抢先（:31-34），310 跳档不可达（1:1）', async () => {
  // :138 的 `ELSEIF EX_FLAG:2810 == 300` 档要求 `TALENT:76 == 1`，而 :31-34
  // 的重置块恰好也吃 76 素质的 [300,310] 区间——同一日内两者不可能同时成立，
  // 310 只在「线值 300 且 76 素质」这一条路上可达，被重置截胡。照抄不修。
  const fixture = setup_route(33, {
    talent: { 85: 0, 76: 1 },
    cflag: { 2: 0, 515: 5 },
  });
  fixture.store.set('exflag:2810', 300);
  const { endcheck_godness } = fixture.load_module('event/event-endcheck');
  endcheck_godness();
  assert.equal(fixture.store.get('exflag:2810'), 110, '重置压回淫乱起始 11');
  assert.equal(
    fixture.store.get('cflag:33:515'),
    1,
    '重置清零后同日阶梯无条件 +1（:93）',
  );
});

test('ENDCHECKGODNESS 140/160/170/180 档的 GETCHARA 守卫：真值恒真（原作缺陷，1:1）', async () => {
  // :105/:119/:126/:133 写作 `SIF DAY:1 >= 350 && GETCHARA(n)`。GETCHARA
  // 返回列表位置或 -1（skill: character.md:136），**两者都非零**——Emuera
  // 的布尔上下文里恒真，本移植的 get_chara(n)（在场返回 cid、否则 -1）同样
  // 恒真。故「葵希罗/嘉德不在场」挡不住跳档，四个档位照跳。
  const CASES = [
    { stage: 140, c515: 150, want: 150, why: '140→150：葵希罗不在场也跳' },
    { stage: 160, c515: 200, want: 170, why: '160→170：嘉德不在场也跳' },
    { stage: 170, c515: 220, want: 180, why: '170→180：同上' },
    { stage: 180, c515: 250, want: 190, why: '180→190：同上' },
  ];
  for (const c of CASES) {
    // 嘉德在场（守卫读的是 34）：140 档的守卫角色 34 不在队伍里
    const fixture = setup_route(33, {
      talent: { 85: 0, 76: 1 },
      cflag: { 2: 0, 515: c.c515 },
    });
    fixture.store.set('exflag:2810', c.stage);
    fixture.store.set('flag:10001', 400); // DAY:1 满足
    const { endcheck_godness } = fixture.load_module('event/event-endcheck');
    endcheck_godness();
    assert.equal(fixture.store.get('exflag:2810'), c.want, c.why);
  }
});

test('ENDCHECKGODNESS 秀素质互换重置：恋慕 110-200 → 10、淫乱 30-100/300-310 → 110', async () => {
  // want515：重置命中后同日还会走一遍阶梯——压回 110 的那几档落「110-120
  // 无条件 +1」，压回 10 的档不落任何分支（计数器保持重置后的 0）
  const CASES = [
    {
      talent: { 85: 1, 76: 0 },
      stage: 110,
      want: 10,
      want515: 0,
      why: '恋慕线 110-200 段',
    },
    {
      talent: { 85: 1, 76: 0 },
      stage: 200,
      want: 10,
      want515: 0,
      why: '恋慕线上界',
    },
    {
      talent: { 85: 0, 76: 1 },
      stage: 30,
      want: 110,
      want515: 1,
      why: '淫乱线 30-100 段',
    },
    {
      talent: { 85: 0, 76: 1 },
      stage: 310,
      want: 110,
      want515: 1,
      why: '淫乱线 300-310 段',
    },
    {
      talent: { 85: 1, 76: 0 },
      stage: 300,
      want: 300,
      want515: 4,
      why: '恋慕线 300 不在区间（300 档 ELSE 支无条件 +1）',
    },
  ];
  for (const c of CASES) {
    const fixture = setup_route(33, {
      talent: c.talent,
      cflag: { 2: 0, 515: 3 },
    });
    fixture.store.set('exflag:2810', c.stage);
    const { endcheck_godness } = fixture.load_module('event/event-endcheck');
    endcheck_godness();
    assert.equal(fixture.store.get('exflag:2810'), c.want, c.why);
    assert.equal(
      fixture.store.get('cflag:33:515'),
      c.want515,
      `${c.why}：计数器`,
    );
  }
});

// —— #404 返工：四条阶梯的**档位区间边界** ——
// 上一轮的用例钉的是档内的门槛（好感阈值、计数器门槛、月份、线值），档位本身的
// `stage >= X && stage < Y` 与起步门 `stage < 10` 两侧没有用例。四个用例按
// 「每档的下界值 + 上界值 + 上界+1 落下一档」表驱动走完整条阶梯；表里逐行写出
// 期望的档位与计数器，不复用实现里的数字。

test('ENDCHECKSQUARE 档位区间：起步门与九个档位的下界/上界各一行（表驱动）', async () => {
  // [输入档位, 好感, 攻+敏, 计数器, 期望档位, 期望计数器, 站在哪条边界上]
  const CASES = [
    [9, 2000, 0, 0, 10, 0, '起步门 stage < 10 的下界（9 进档）'],
    [10, 5000, 0, 0, 20, 0, '起步门的上界外：10 已属 10-20 档'],
    [19, 5000, 0, 0, 20, 0, '10-20 档上界'],
    [20, 10000, 0, 0, 30, 0, '20-30 档下界'],
    [29, 10000, 0, 0, 30, 0, '20-30 档上界'],
    [30, 0, 14, 7, 40, 0, '30-40 档下界（攻+敏满 14）'],
    [39, 0, 14, 7, 40, 0, '30-40 档上界'],
    [40, 0, 0, 10, 50, 10, '40-50 档下界'],
    [49, 0, 0, 10, 50, 10, '40-50 档上界'],
    [50, 0, 0, 30, 60, 30, '50-60 档下界'],
    [59, 0, 0, 30, 60, 30, '50-60 档上界'],
    [60, 0, 0, 60, 70, 60, '60-70 档下界'],
    [69, 0, 0, 60, 70, 60, '60-70 档上界'],
    [70, 0, 0, 100, 80, 100, '70-80 档下界'],
    [79, 0, 0, 100, 80, 100, '70-80 档上界'],
    [80, 0, 0, 150, 90, 150, '80-90 档下界'],
    [89, 0, 0, 150, 90, 150, '80-90 档上界'],
    [90, 0, 0, 0, 90, 0, '80-90 档的上界外：90 无档，无动作'],
    [299, 0, 0, 0, 299, 0, '300 档的下界外'],
    [300, 0, 0, 0, 310, 0, '300 档（RAND:5 命中 0）'],
  ];
  for (const [stage, c2, abl, c515, want, want515, why] of CASES) {
    const fixture = setup_route(22, {
      talent: { 85: 1 },
      cflag: { 2: c2, 515: c515 },
    });
    fixture.store.set('abl:22:10', abl);
    fixture.store.set('abl:22:16', 0);
    fixture.store.set('exflag:2811', stage);
    const { endcheck_square } = fixture.load_module('event/event-endcheck');
    endcheck_square(seq([0]));
    assert.equal(fixture.store.get('exflag:2811'), want, why);
    assert.equal(fixture.store.get('cflag:22:515'), want515, `${why}：计数器`);
  }
});

test('ENDCHECKSPADE 档位区间：恋慕线九档 + 淫乱线九档的下界/上界各一行（表驱动）', async () => {
  // 恋慕线（TALENT:85）：[输入档位, 好感, 攻+敏, 计数器, 期望档位, 期望计数器, 说明]
  const LOVE = [
    [9, 2000, 0, 0, 10, 0, '恋慕起步门的下界'],
    [10, 5000, 0, 0, 20, 0, '起步门上界外：10 属 10-20 档'],
    [19, 5000, 0, 0, 20, 0, '10-20 档上界'],
    [20, 10000, 0, 0, 30, 0, '20-30 档下界'],
    [29, 10000, 0, 0, 30, 0, '20-30 档上界'],
    [30, 0, 14, 7, 40, 0, '30-40 档下界'],
    [39, 0, 14, 7, 40, 0, '30-40 档上界'],
    [40, 0, 0, 10, 50, 10, '40-50 档下界'],
    [49, 0, 0, 10, 50, 10, '40-50 档上界'],
    [50, 0, 0, 30, 60, 30, '50-60 档下界'],
    [59, 0, 0, 30, 60, 30, '50-60 档上界'],
    [60, 0, 0, 60, 70, 60, '60-70 档下界'],
    [69, 0, 0, 60, 70, 60, '60-70 档上界'],
    [70, 0, 0, 100, 80, 100, '70-80 档下界'],
    [79, 0, 0, 100, 80, 100, '70-80 档上界'],
    [80, 0, 0, 150, 90, 150, '80-90 档下界'],
    [89, 0, 0, 150, 90, 150, '80-90 档上界'],
    [90, 0, 0, 0, 90, 0, '80-90 档的上界外：90 无档'],
    [299, 0, 0, 0, 299, 0, '300 档的下界外'],
    [300, 0, 0, 10, 310, 10, '300 档（计数器 >= 10）'],
  ];
  for (const [stage, c2, abl, c515, want, want515, why] of LOVE) {
    const fixture = setup_route(21, {
      talent: { 85: 1, 76: 0 },
      cflag: { 2: c2, 515: c515 },
    });
    fixture.store.set('abl:21:10', abl);
    fixture.store.set('abl:21:16', 0);
    fixture.store.set('exflag:2814', stage);
    const { endcheck_spade } = fixture.load_module('event/event-endcheck');
    await endcheck_spade(seq([0, 0]));
    assert.equal(fixture.store.get('exflag:2814'), want, `恋慕线：${why}`);
    assert.equal(
      fixture.store.get('cflag:21:515'),
      want515,
      `恋慕线：${why}：计数器`,
    );
  }

  // 淫乱线（TALENT:76）：[输入档位, 好感, 攻+敏, 计数器, 期望档位, 期望计数器, 说明]
  const LUST = [
    [9, 2000, 0, 0, 110, 0, '淫乱起步门的下界'],
    [10, 2000, 0, 0, 10, 0, '起步门的上界外：10 无档，无动作'],
    [109, 0, 0, 0, 109, 0, '110 档的下界外'],
    [110, 5000, 0, 70, 120, 70, '110-120 档下界（只跳档、不动计数器）'],
    [119, 5000, 0, 70, 120, 70, '110-120 档上界'],
    [120, 8000, 0, 2, 130, 2, '120-130 档下界（计数器 >= 2）'],
    [129, 8000, 0, 2, 130, 2, '120-130 档上界'],
    [130, 10000, 0, 0, 140, 0, '130-140 档下界（好感 >= 10000）'],
    [139, 10000, 0, 0, 140, 0, '130-140 档上界'],
    [140, 0, 0, 150, 150, 0, '140-150 档下界（四条件齐，跳档时清零计数器）'],
    [149, 0, 0, 150, 150, 0, '140-150 档上界'],
    [150, 0, 0, 10, 160, 10, '150-160 档下界'],
    [159, 0, 0, 10, 160, 10, '150-160 档上界'],
    [160, 0, 0, 30, 170, 30, '160-170 档下界'],
    [169, 0, 0, 30, 170, 30, '160-170 档上界'],
    [170, 0, 0, 60, 180, 60, '170-180 档下界'],
    [179, 0, 0, 60, 180, 60, '170-180 档上界'],
    [180, 0, 0, 100, 190, 100, '180-190 档下界'],
    [189, 0, 0, 100, 190, 100, '180-190 档上界'],
    [190, 0, 0, 150, 200, 150, '190-200 档下界'],
    [199, 0, 0, 150, 200, 150, '190-200 档上界'],
    [200, 0, 0, 0, 200, 0, '190-200 档的上界外：200 无档'],
  ];
  for (const [stage, c2, abl, c515, want, want515, why] of LUST) {
    const fixture = setup_route(21, {
      talent: { 85: 0, 76: 1, 78: 1, 0: 0 },
      cflag: { 2: c2, 515: c515 },
    });
    fixture.store.set('abl:21:10', abl);
    fixture.store.set('abl:21:16', 0);
    fixture.store.set('abl:21:1', 10);
    fixture.store.set('abl:21:17', 5);
    fixture.store.set('flag:10001', 350); // DAY:1
    fixture.store.set('exflag:2814', stage);
    const { endcheck_spade } = fixture.load_module('event/event-endcheck');
    await endcheck_spade(seq([0, 0]));
    assert.equal(fixture.store.get('exflag:2814'), want, `淫乱线：${why}`);
    assert.equal(
      fixture.store.get('cflag:21:515'),
      want515,
      `淫乱线：${why}：计数器`,
    );
  }
});

test('ENDCHECKPRINCESS 档位区间：十七档 + 三处重置门槛的下界/上界各一行（表驱动）', async () => {
  // [输入档位, 素质, 好感, 计数器, MARK:1, 期望档位, 期望计数器, 说明]
  // 素质用字符串标：'85' 恋慕 / '76' 淫乱 / '' 都无
  // MARK:1 只在 10-20 档有意义（== 3 且处女 → 20；标记不够且非处女 → -10）
  const CASES = [
    [
      0,
      '',
      0,
      0,
      0,
      10,
      0,
      '初会门 route == 0 的下界（当场只置 10，MARK 未触发）',
    ],
    [1, '', 0, 0, 0, 1, 0, '初会门的上界外：非 0 不置 10（1 亦无档）'],
    [9, '', 0, 0, 0, 9, 0, '10-20 档的下界外'],
    [10, '', 0, 0, 3, 20, 0, '10-20 档下界（MARK:1 == 3 且处女）'],
    [19, '', 0, 0, 3, 20, 0, '10-20 档上界'],
    [20, '85', 0, 0, 0, 30, 0, '20-30 档下界（恋慕定线）'],
    [29, '85', 0, 0, 0, 30, 0, '20-30 档上界'],
    [30, '85', 2000, 0, 0, 40, 0, '30-40 档下界'],
    [39, '85', 2000, 0, 0, 40, 0, '30-40 档上界'],
    [40, '85', 5000, 0, 0, 50, 0, '40-50 档下界'],
    [49, '85', 5000, 0, 0, 50, 0, '40-50 档上界'],
    [50, '85', 10000, 0, 0, 60, 0, '50-60 档下界'],
    [59, '85', 10000, 0, 0, 60, 0, '50-60 档上界'],
    [60, '', 0, 0, 0, 70, 0, '60-70 档下界（CFLAG:601 == 901）'],
    [69, '', 0, 0, 0, 70, 0, '60-70 档上界'],
    [70, '', 0, 10, 0, 80, 10, '70-80 档下界'],
    [79, '', 0, 10, 0, 80, 10, '70-80 档上界'],
    [80, '', 0, 30, 0, 90, 30, '80-90 档下界'],
    [89, '', 0, 30, 0, 90, 30, '80-90 档上界'],
    [90, '', 0, 60, 0, 100, 60, '90-100 档下界'],
    [99, '', 0, 60, 0, 100, 60, '90-100 档上界'],
    [100, '', 0, 100, 0, 110, 100, '100-110 档下界'],
    [109, '', 0, 100, 0, 110, 100, '100-110 档上界'],
    [110, '', 0, 150, 0, 120, 150, '110-120 档下界'],
    [119, '', 0, 150, 0, 120, 150, '110-120 档上界'],
    [120, '', 0, 0, 0, 120, 0, '110-120 档的上界外：120 无档（恋慕线完结态）'],
    [130, '', 2000, 0, 0, 140, 0, '130-140 档下界'],
    [139, '', 2000, 0, 0, 140, 0, '130-140 档上界'],
    [140, '', 5000, 0, 0, 150, 0, '140-150 档下界'],
    [149, '', 5000, 0, 0, 150, 0, '140-150 档上界'],
    [150, '', 10000, 0, 0, 160, 0, '150-160 档下界'],
    [159, '', 10000, 0, 0, 160, 0, '150-160 档上界'],
    [160, '', 0, 0, 0, 160, 0, '160-170 空档（判定已移到 aftertrain）'],
    [
      160,
      '',
      10000,
      0,
      0,
      160,
      0,
      '160 档即使门槛满足也不动——150-160 档的跳档是 `route = 160` 的自身赋值，且下一档 160-170 是空分支，故此边界上 `< 160` 与 `< 161` 行为等价（返工单点名的那条探针属等价变异）',
    ],
    [169, '', 0, 0, 0, 169, 0, '160-170 空档的上界'],
    [170, '', 0, 10, 0, 180, 10, '170-180 档下界'],
    [179, '', 0, 10, 0, 180, 10, '170-180 档上界'],
    [180, '', 0, 30, 0, 190, 30, '180-190 档下界'],
    [189, '', 0, 30, 0, 190, 30, '180-190 档上界'],
    [190, '', 0, 60, 0, 200, 60, '190-200 档下界'],
    [199, '', 0, 60, 0, 200, 60, '190-200 档上界'],
    [200, '', 0, 100, 0, 210, 100, '200-210 档下界'],
    [209, '', 0, 100, 0, 210, 100, '200-210 档上界'],
    [210, '', 0, 150, 0, 220, 150, '210-220 档下界'],
    [219, '', 0, 150, 0, 220, 150, '210-220 档上界'],
    [220, '', 0, 0, 0, 220, 0, '210-220 档的上界外'],
    // —— 三处重置门槛的两侧 ——
    [129, '85', 0, 5, 0, 129, 5, '恋慕重置 route >= 130 的下界外（129 无档）'],
    [130, '85', 0, 5, 0, 30, 0, '恋慕重置的下界（130 命中 → 起始 3）'],
    [
      29,
      '76',
      0,
      5,
      0,
      130,
      5,
      '淫乱重置区间 [30,130] 的下界外：重置不触发（29 由 20-30 档的淫乱定线接管，计数器不动——重置一旦误命中会把计数器清零）',
    ],
    [30, '76', 0, 5, 0, 130, 0, '淫乱重置的下界（30 命中 → 起始 13）'],
    [130, '76', 0, 5, 0, 130, 0, '淫乱重置的上界（含 130）'],
    [131, '76', 0, 5, 0, 131, 5, '淫乱重置的上界外（131 无档）'],
  ];
  for (const [stage, talent, c2, c515, mark1, want, want515, why] of CASES) {
    const fixture = setup_route(35, {
      talent: talent === '' ? { 0: 1 } : { [talent]: 1, 0: 1 },
      cflag: { 2: c2, 515: c515, 601: 901 },
    });
    // 10-20 档的 MARK 判定：MARK:1 == 3 且处女（TALENT:0 == 1）→ 20
    fixture.store.set('mark:35:1', mark1);
    fixture.store.set('exflag:2807', stage);
    const { endcheck_princess } = fixture.load_module('event/event-endcheck');
    endcheck_princess();
    assert.equal(fixture.store.get('exflag:2807'), want, why);
    assert.equal(fixture.store.get('cflag:35:515'), want515, `${why}：计数器`);
  }
});

test('ENDCHECKGODNESS 档位区间：九档 + 三处重置门槛的下界/上界各一行（表驱动）', async () => {
  // [输入档位, 好感, 攻+敏, 计数器, 期望档位, 期望计数器, 说明]
  // 全部行都用淫乱素质（TALENT:76），重置行另标素质
  const CASES = [
    [9, 2000, 0, 0, 110, 0, '起步门 stage < 10 的下界'],
    [10, 2000, 0, 0, 10, 0, '起步门的上界外：10 无档，无动作'],
    [109, 0, 0, 0, 109, 0, '110-120 档的下界外'],
    [110, 5000, 0, 70, 120, 71, '110-120 档下界'],
    [119, 5000, 0, 70, 120, 71, '110-120 档上界'],
    [120, 8000, 0, 0, 130, 1, '120-130 档下界（[110,130) 档的有效下界）'],
    [129, 8000, 0, 0, 130, 1, '120-130 档上界'],
    [130, 0, 14, 0, 140, 1, '130-140 档下界'],
    [139, 0, 14, 0, 140, 1, '130-140 档上界'],
    [140, 0, 0, 150, 150, 150, '140-150 档下界'],
    [149, 0, 0, 150, 150, 150, '140-150 档上界'],
    [
      150,
      0,
      0,
      150,
      150,
      151,
      '150 档下界同时是 140-150 档的上界外：门槛 150 满足了也不跳（这一档看的是 180），计数器累加',
    ],
    [150, 0, 0, 180, 150, 180, '150-160 档（560 死守卫：不动）'],
    [159, 0, 0, 180, 159, 180, '150-160 档上界（同上）'],
    [160, 0, 0, 200, 170, 200, '160-170 档下界'],
    [169, 0, 0, 200, 170, 200, '160-170 档上界'],
    [170, 0, 0, 220, 180, 220, '170-180 档下界'],
    [179, 0, 0, 220, 180, 220, '170-180 档上界'],
    [180, 0, 0, 250, 190, 250, '180-190 档下界'],
    [189, 0, 0, 250, 190, 250, '180-190 档上界'],
    [190, 0, 0, 0, 190, 0, '180-190 档的上界外：190 无档'],
  ];
  for (const [stage, c2, abl, c515, want, want515, why] of CASES) {
    const fixture = setup_route(33, {
      talent: { 85: 0, 76: 1 },
      cflag: { 2: c2, 515: c515 },
    });
    fixture.store.set('abl:33:10', abl);
    fixture.store.set('abl:33:16', 0);
    fixture.store.set('flag:10001', 350); // DAY:1 >= 350
    fixture.store.set('exflag:2810', stage);
    const { endcheck_godness } = fixture.load_module('event/event-endcheck');
    endcheck_godness();
    assert.equal(fixture.store.get('exflag:2810'), want, why);
    assert.equal(fixture.store.get('cflag:33:515'), want515, `${why}：计数器`);
  }

  // 重置门槛的两侧：[输入档位, 素质, 期望档位, 期望计数器, 说明]
  const RESET = [
    [109, '85', 109, 5, '恋慕重置 >= 110 的下界外'],
    [110, '85', 10, 0, '恋慕重置的下界（110 命中 → 起始 1）'],
    [200, '85', 10, 0, '恋慕重置的上界（含 200）'],
    [201, '85', 201, 5, '恋慕重置的上界外'],
    [29, '76', 29, 5, '淫乱重置 [30,100] 的下界外'],
    [
      30,
      '76',
      110,
      1,
      '淫乱重置的下界（30 命中 → 起始 11，随后同日落 110-120 档累加）',
    ],
    [100, '76', 110, 1, '淫乱重置的上界（含 100）'],
    [101, '76', 101, 5, '淫乱重置的上界外'],
    [300, '76', 110, 1, '淫乱重置 [300,310] 的下界'],
    [311, '76', 311, 5, '淫乱重置 [300,310] 的上界外'],
  ];
  for (const [stage, talent, want, want515, why] of RESET) {
    const fixture = setup_route(33, {
      talent: { 85: talent === '85' ? 1 : 0, 76: talent === '76' ? 1 : 0 },
      cflag: { 2: 0, 515: 5 },
    });
    fixture.store.set('exflag:2810', stage);
    const { endcheck_godness } = fixture.load_module('event/event-endcheck');
    endcheck_godness();
    assert.equal(fixture.store.get('exflag:2810'), want, why);
    assert.equal(fixture.store.get('cflag:33:515'), want515, `${why}：计数器`);
  }
});

test('ENDCHECKGODNESS_SKY_TEMPLE：500/520/530 三档空转；540 档的 560 转移是死分支（原作缺陷，1:1）', async () => {
  // :151-152 的守卫写作 `GETCHARA(33) == 0`。GETCHARA 返回的是**列表位置**
  // （skill: character.md:136，不存在为 -1），而 0 号魔王恒占位置 0——
  // 该条件在真机上永不成立，560 转移不可达。与「天神宫线整体不可达」
  // （EX_FLAG:101 无写入点，#102 查明）是同一片未完成区，照抄不修。
  const CASES = [
    { stage: 500, flag93: 0, want: 500, why: '500-510 空分支' },
    { stage: 520, flag93: 3, want: 520, why: '520-530 空分支' },
    { stage: 530, flag93: 3, want: 530, why: '530-540 空分支' },
    {
      stage: 540,
      flag93: 3,
      want: 540,
      why: '540-550：FLAG:93 == 3 也不动（守卫死分支）',
    },
    { stage: 540, flag93: 2, want: 540, why: 'FLAG:93 != 3 同样不动' },
    { stage: 549, flag93: 3, want: 549, why: '540-550 上界内' },
    { stage: 550, flag93: 3, want: 550, why: '550 不在任何档' },
  ];
  for (const c of CASES) {
    const fixture = setup_route(33, { cflag: {} });
    fixture.store.set('exflag:2810', c.stage);
    fixture.store.set('flag:93', c.flag93);
    const { endcheck_godness_sky_temple } = fixture.load_module(
      'event/event-endcheck',
    );
    endcheck_godness_sky_temple();
    assert.equal(fixture.store.get('exflag:2810'), c.want, c.why);
  }
  // 守卫两侧都踩一遍：不在场（-1）与在场（33）都不是 0
  const absent = setup_route(0, { cflag: {} });
  absent.store.set('exflag:2810', 540);
  absent.store.set('flag:93', 3);
  const present = setup_route(33, { cflag: {} });
  present.store.set('exflag:2810', 540);
  present.store.set('flag:93', 3);
  for (const [fixture, label] of [
    [absent, '嘉德不在场'],
    [present, '嘉德在场'],
  ]) {
    const { endcheck_godness_sky_temple } = fixture.load_module(
      'event/event-endcheck',
    );
    endcheck_godness_sky_temple();
    assert.equal(
      fixture.store.get('exflag:2810'),
      540,
      `${label}：GETCHARA(33) 都不是 0，560 不可达`,
    );
  }
});

// —— #404（N20）：65 个 @END<n> 的结局文本段数据表 ——
//
// 效果表驱动——每段跑一次、断言线值与副作用（表里逐条写死，不复用数据表
// 的数字）；分岔与具名步——八个 INPUT 段、END10_12 的 after 条件、finish /
// leave / rampage / inconseq 四个具名步各有用例。
test('END 族分派：65 段全部注册进 END_FAMILY，线值个位为 0 时按族号 + 小节命中', async () => {
  const fixture = create_era_fixture();
  const { END_SCRIPTS } = fixture.load_module('data/ending-scripts');
  const { END_FAMILY } = fixture.load_module('event/ending-family');
  for (const family of [7, 10, 11, 14]) {
    assert.ok(END_FAMILY.has(family), `族 ${family} 必须已注册`);
  }
  for (const family of [2, 3, 4, 5, 6, 8, 9, 12, 13, 15]) {
    assert.ok(!END_FAMILY.has(family), `族 ${family} 全库无定义，不得注册`);
  }
  // 小节键 '713' 是原作 @END713 的写法，分派拼出的是 13 → 落空（1:1）
  assert.ok(END_SCRIPTS[7]['713'] !== undefined, '@END713 必须留在表里');
  assert.equal(END_SCRIPTS[7]['13'], undefined, 'END7_13 不存在');
});

test('END 族分派贯通：菲娅线值 10 → run_endcheck 走 END7_1 → 文本 + 线值 +1', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(35, { id: 35, name: '菲娅', callname: '菲娅' });
  fixture.era.addCharacter(35);
  fixture.store.set('exflag:2807', 10);
  const { run_endcheck } = fixture.load_module('event/event-endcheck');
  await run_endcheck();

  assert.equal(fixture.store.get('exflag:2807'), 11, 'END7_1 收尾 += 1');
  assert(
    fixture.lines_history.some(
      (line) =>
        line.type === 'text' &&
        line.text ===
          '菲娅在床上迷糊的看着四周……似乎还没有对自己身上发生的事情有所认知……',
    ),
    'END7_1 的首行文本（经分派循环到达）',
  );
});

test('效果表驱动：每段收尾对线值的写入（表里逐条独立写出，不复用数据表）', async () => {
  // [族, 小节, 期望的线值终值, 可选输入]；族 F 的线值 = EX_FLAG:(2800 + F)，
  // 起点统一预置 100。+1 的段是绝大多数，清零/加倍/加五的段逐条写出
  const CASES = [
    // 族 7（菲娅线，EX_FLAG:2807）
    [7, 1, 101],
    [7, 2, 101, [0]],
    [7, 3, 100],
    [7, 4, 101],
    [7, 5, 101, [0]],
    [7, 6, 101],
    [7, 7, 101],
    [7, 8, 101],
    [7, 9, 101],
    [7, 10, 101],
    [7, 11, 101],
    [7, 12, 101, [1]],
    [7, '713', 100],
    [7, 14, 101],
    [7, 15, 101],
    [7, 16, 101],
    [7, 17, 101],
    [7, 18, 101],
    [7, 19, 101],
    [7, 20, 101],
    [7, 21, 101],
    [7, 22, 101, [1, 1]],
    // 族 10（嘉德线，EX_FLAG:2810）
    [10, 11, 101],
    [10, '12_1', 101],
    [10, '12_2', 102],
    [10, 13, 101],
    [10, 54, 101],
    [10, 55, 105],
    [10, 16, 101],
    [10, 17, 101],
    [10, 18, 101],
    [10, 19, 101],
    // 族 11（黑方片线，EX_FLAG:2811）：31 段是死亡段，把线值清 0
    [11, 1, 101],
    [11, 2, 101],
    [11, 3, 101],
    [11, 5, 101],
    [11, 6, 101],
    [11, 7, 101],
    [11, 8, 101],
    [11, 9, 101, [1]],
    [11, 31, 0],
    // 族 14（银黑桃线，EX_FLAG:2814）
    [14, 1, 101],
    [14, 2, 101],
    [14, 3, 101],
    [14, 5, 101],
    [14, 6, 101],
    [14, 7, 101],
    [14, 8, 101],
    [14, 9, 101, [1]],
    [14, 11, 101],
    [14, 12, 101],
    [14, 13, 101],
    [14, 14, 101],
    [14, 15, 101],
    [14, 16, 101],
    [14, 17, 101],
    [14, 18, 101],
    [14, 19, 101],
    [14, 20, 101, [1]],
    [14, 31, 0],
  ];
  for (const [family, section, want, inputs] of CASES) {
    const fixture = create_era_fixture();
    const { END_FAMILY } = fixture.load_module('event/ending-family');
    fixture.set_inputs(...(inputs ?? []));
    const line_no = 2800 + family;
    fixture.store.set(`exflag:${line_no}`, 100);
    await END_FAMILY.call(family, { args: [section] });
    assert.equal(
      fixture.store.get(`exflag:${line_no}`),
      want,
      `END${family}_${section}：EX_FLAG:${line_no} 应从 100 变到 ${want}`,
    );
  }
});

test('效果表驱动：带额外副作用的段（TALENT/CFLAG/BASE/EXP/EX_FLAG 清零）', async () => {
  const CASES = [
    {
      family: 7,
      section: 17,
      why: 'END7_17 魔女素质 + 攻防补正',
      want: { 'talent:35:1253': 1, 'cflag:35:11': 200, 'cflag:35:12': 200 },
    },
    {
      family: 7,
      section: 7,
      why: 'END7_7 魔界公主素质',
      want: { 'talent:35:1254': 1 },
    },
    {
      family: 11,
      section: 31,
      why: 'END11_31 黑方片死亡 → 线值清零',
      want: { 'exflag:2811': 0 },
    },
    {
      family: 14,
      section: 31,
      why: 'END14_31 银黑桃死亡 → 线值清零',
      want: { 'exflag:2814': 0 },
    },
    {
      family: 14,
      section: 15,
      why: 'END14_15 乳牛化四素质',
      want: {
        'talent:21:82': 0,
        'talent:21:108': 1,
        'talent:21:114': 1,
        'talent:21:89': 1,
      },
    },
  ];
  for (const c of CASES) {
    const fixture = create_era_fixture();
    const { END_FAMILY } = fixture.load_module('event/ending-family');
    for (const key of Object.keys(c.want)) {
      if (key.startsWith('talent:')) {
        fixture.store.set(key, 9); // 预置成非目标值，证明确实被改写
      }
      if (key === 'exflag:2811' || key === 'exflag:2814') {
        fixture.store.set(key, 100);
      }
    }
    await END_FAMILY.call(c.family, { args: [c.section] });
    for (const [key, value] of Object.entries(c.want)) {
      assert.equal(fixture.store.get(key), value, `${c.why}：${key}`);
    }
  }
});

test('ask 段分岔：八个 INPUT 段的两侧都走一遍（表驱动）', async () => {
  // [族, 小节, 输入, 期望线值终值, 期望出现的分支文本]；线值起点 100
  // （族 F 的线值 = EX_FLAG:(2800 + F)）
  const CASES = [
    // END7_12 / END7_22：1 → 加档 + 结局收尾；2 → 加档；其余 → 只有提示
    [7, 12, [1], 101, '～菲娅 魔界公主Ending～'],
    [7, 12, [2], 101, '好吧，菲娅尊重您的选择哦~'],
    [7, 12, [3], 100, '可以哦~明天会继续问您的~'],
    [7, 22, [1, 5], 101, '～菲娅 魔女Ending～'],
    [7, 22, [2], 101, '好吧，菲娅尊重您的选择哦~'],
    [7, 22, [3], 100, '可以哦~明天会继续问您的~'],
    // END11_9 / END14_9 / END14_20：同型三兄弟
    [11, 9, [1], 101, '～黑方片 傲娇的商贾后裔 Ending～'],
    [11, 9, [2], 101, '好吧，黑方片尊重您的选择哦~'],
    [11, 9, [3], 100, '可以哦~明天会继续问您的~'],
    [14, 9, [1], 101, '～银黑桃 忍者组织头领 Ending～'],
    [14, 9, [2], 101, '好吧，银黑桃尊重您的选择哦~'],
    [14, 9, [3], 100, '可以哦~明天会继续问您的~'],
    [14, 20, [1], 101, '～银黑桃 魔王专属乳牛 Ending～'],
    [14, 20, [2], 101, '好吧，银黑桃尊重您的选择哦~'],
    [14, 20, [3], 100, '可以哦~明天会继续问您的~'],
    // END11_4 / END14_4：[1] 走放走/死亡段（线值 = 300 / 310 段起点）
    [11, 4, [1], 300, '「感谢您的信任……」'],
    [11, 4, [2], 51, '「要坏掉了……」'],
    [14, 4, [1], 300, '「是，我会提着狂王的头回来的」'],
    [
      14,
      4,
      [2],
      51,
      '「我很高兴您会担心我的安全，但是只要能……不管我怎么说，您都不会改变主意吧」',
    ],
  ];
  for (const [family, section, inputs, want, text] of CASES) {
    const fixture = create_era_fixture();
    const { END_FAMILY } = fixture.load_module('event/ending-family');
    fixture.seed_chara(family === 11 ? 22 : 21, {
      id: family === 11 ? 22 : 21,
      name: '角色',
      callname: '角色',
    });
    fixture.era.addCharacter(family === 11 ? 22 : 21);
    fixture.store.set('base:22:0', 5000);
    fixture.store.set('base:22:1', 5000);
    fixture.store.set('base:21:0', 5000);
    fixture.store.set('base:21:1', 5000);
    fixture.set_inputs(...inputs);
    fixture.store.set(`exflag:${2800 + family}`, 100);
    await END_FAMILY.call(family, { args: [section] });
    assert.equal(
      fixture.store.get(`exflag:${2800 + family}`),
      want,
      `END${family}_${section} 走 RESULT=${inputs[0]}`,
    );
    assert(
      history_texts(fixture).includes(text),
      `END${family}_${section} 走 RESULT=${inputs[0]}：分支文本应出现`,
    );
  }
});

test('END10_12 分岔：INPUT 1/2 + after 的两个 CFLAG 区间子调用（含无效输入重问）', async () => {
  // [输入序列, CFLAG:33:2, 期望线值终值, 期望子段]；线值起点 100，
  // 子段 12_1 = +1、12_2 = +2，主段自身无写入
  const CASES = [
    [[1], 3000, 102, '12_2', 'result 1 且 3000 <= c2 < 5000 → 12_2'],
    [[1], 2500, 101, '12_1', 'result 1 且 2500 <= c2 < 4000 → 12_1'],
    [[1], 2999, 101, '12_1', '3000 以下走第二条'],
    [[1], 2499, 100, null, '2499 两个区间都不进'],
    [[1], 5000, 100, null, '5000 碰不到任何一个左闭右开区间'],
    [[2], 0, 101, '12_1', 'result 2 → 12_1（无 CFLAG 条件）'],
    [[3, 1], 3000, 102, '12_2', '无效输入先重问（again），第二次命中'],
  ];
  for (const [inputs, c2, want, sub, why] of CASES) {
    const fixture = create_era_fixture();
    const { END_FAMILY } = fixture.load_module('event/ending-family');
    fixture.era.addCharacter(33);
    fixture.seed_chara(33, { id: 33, name: '嘉德', callname: '嘉德' });
    fixture.store.set('cflag:33:2', c2);
    fixture.store.set('exflag:2810', 100);
    fixture.set_inputs(...inputs);
    await END_FAMILY.call(10, { args: [12] });
    assert.equal(fixture.store.get('exflag:2810'), want, why);
    if (sub !== null) {
      // 子段的文本（12_1 的收尾句 / 12_2 的收尾句）来自 END10_12_1/:12_2
      const expected =
        sub === '12_1'
          ? '「或许该偶尔满足下嘉德？」'
          : '当大家离开派对的时候、只剩下被玩到失神的嘉德留在原地、身上和地上。都满是爱液。';
      assert(
        history_texts(fixture).includes(expected),
        `${why}：应调用子段 ${sub}`,
      );
    }
  }
});

test('end10_12 的无效输入重问不重画：同一段 prompt 出现两次、子段只在最后一次命中', async () => {
  const fixture = create_era_fixture();
  const { END_FAMILY } = fixture.load_module('event/ending-family');
  fixture.store.set('exflag:2810', 100);
  fixture.store.set('cflag:33:2', 2500);
  fixture.set_inputs(9, 9, 2);
  await END_FAMILY.call(10, { args: [12] });
  assert.equal(
    fixture.store.get('exflag:2810'),
    101,
    '重问两次后 result 2 命中 12_1（+1）',
  );
  assert.equal(
    fixture.inputs_consumed.filter(({ api }) => api === 'input').length,
    3,
    '三次 INPUT：两次无效 + 一次命中',
  );
});

test('finish 步：2801 < 99 先抬到 90 再 ++；>= 99 不动；95 只 ++', async () => {
  const CASES = [
    [0, 91, '0 → 90 → 91'],
    [89, 91, '89 → 90 → 91'],
    [90, 91, '90 → 90 → 91'],
    [95, 96, '95 不抬（已 > 90）只 ++'],
    [99, 99, '99 整段跳过'],
  ];
  for (const [before, after, why] of CASES) {
    const fixture = create_era_fixture();
    const { END_FAMILY } = fixture.load_module('event/ending-family');
    fixture.store.set('exflag:2801', before);
    fixture.set_inputs(1); // END7_12 的 [1] 支
    await END_FAMILY.call(7, { args: [12] });
    assert.equal(
      fixture.store.get('exflag:2801'),
      after,
      `EX_FLAG:2801 ${why}`,
    );
  }
});

test('leave 步：调教对象指针归空、TARGET/ASSI 从 FLAG:1/2 回填、除名与归档', async () => {
  const fixture = create_era_fixture();
  const { END_FAMILY } = fixture.load_module('event/ending-family');
  fixture.seed_chara(22, { id: 22, name: '黑方片', callname: '黑方片' });
  fixture.seed_chara(5, { id: 5, name: '路人', callname: '路人' });
  fixture.era.addCharacter(22);
  fixture.era.addCharacter(5);
  fixture.store.set('flag:1', 22); // 上次调教对象 = 黑方片
  fixture.store.set('flag:2', 5); // 上次助手 = 路人
  fixture.store.set('exflag:2803', 5); // 失控奴隶号（原作 PARTY_CHAR_DEL 的实参）
  // 让两条实参路径可区分：5 号自己是队长（cflag:533 == 5），PARTY_CHAR_DEL(5)
  // 会清 5 号的队伍槽位；若误传 cid（22）则清的是 0 号那组
  fixture.store.set('cflag:5:533', 5);
  fixture.store.set('cflag:5:530', 1);
  fixture.store.set('cflag:5:531', 1);
  fixture.set_inputs(1); // END11_4 的 [1] 放出支
  await END_FAMILY.call(11, { args: [4] });

  assert.equal(
    fixture.store.get('flag:1'),
    -1,
    'FLAG:1 归空（SIF FLAG:1 == cid）',
  );
  assert.equal(
    fixture.store.get('flag:2'),
    5,
    'FLAG:2 不动——原作那行写的是未声明的 G:2（笔误），1:1 不落表',
  );
  const era_flag = fixture.load_module('era-utils/era-flag');
  assert.equal(era_flag.target, -1, 'TARGET = FLAG:1');
  assert.equal(era_flag.assi, 5, 'ASSI = FLAG:2');
  assert.equal(
    fixture.chara_no.includes(22),
    false,
    'DELCHARA GETCHARA(22) → 除名',
  );
  assert.equal(
    fixture.store.get('cflag:5:530'),
    0,
    'PARTY_CHAR_DEL 的实参是 EX_FLAG:2803（5）而非 cid（22）：5 号的队伍槽位被清',
  );
  assert.equal(fixture.store.get('cflag:5:531'), 0, '同上（仲間A）');
  assert.equal(fixture.store.get('exflag:2811'), 300, '线值落在 300 段');
});

test('rampage 步（END10_15）：嘉德线 540、威望 −50、库存与全角色 BASE 扣减、金库 −20%', async () => {
  const fixture = create_era_fixture();
  const { END_FAMILY } = fixture.load_module('event/ending-family');
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(33, { id: 33, name: '嘉德', callname: '嘉德' });
  fixture.seed_chara(5, { id: 5, name: '奴隶', callname: '奴隶' });
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(33);
  fixture.era.addCharacter(5);
  fixture.store.set('exflag:2810', 170);
  fixture.store.set('exflag:99', 200); // 威望
  fixture.store.set('item:100', 1000); // 库存减半
  fixture.store.set('item:106', 62); // 减半到 31：恰在下限门槛外（<= 30 不成立）
  fixture.store.set('item:189', 40); // 减半到 20 → 兜底 30（189 < 190）
  fixture.store.set('item:190', 40); // 减半到 20 → 不兜底（190 < 190 不成立）
  fixture.store.set('item:105', 40); // 减半到 20 → 兜底 30
  fixture.store.set('base:0:0', 5000); // 魔王不在 FOR 域内（从 1 起）
  fixture.store.set('base:5:0', 5000);
  fixture.store.set('base:5:1', 5000);
  fixture.store.set('base:33:0', 5000);
  fixture.store.set('base:33:1', 5000);
  fixture.store.set('flag:10004', 1234); // MONEY
  fixture.store.set('exflag:4444', 9999); // 非作弊资金追踪器
  await END_FAMILY.call(10, { args: [15] });

  assert.equal(fixture.store.get('exflag:2810'), 540, '线值落到天神宫 540');
  assert.equal(fixture.store.get('exflag:99'), 150, '威望 −50');
  assert.equal(fixture.store.get('item:100'), 500, '库存 /2（向零截断）');
  assert.equal(
    fixture.store.get('item:105'),
    30,
    '减半后 <= 30 且 105 < 190 → 兜底 30',
  );
  assert.equal(fixture.store.get('item:106'), 31, '减半到 31：> 30，不兜底');
  assert.equal(fixture.store.get('item:189'), 30, '189 < 190 → 兜底');
  assert.equal(
    fixture.store.get('item:190'),
    20,
    '190 号不兜底（< 190 不成立）',
  );
  assert.equal(
    fixture.store.get('base:0:0'),
    5000,
    'FOR CHARA, 1, …：魔王不在域内',
  );
  assert.equal(fixture.store.get('base:5:0'), 4200, 'BASE:0 −800');
  assert.equal(fixture.store.get('base:5:1'), 4000, 'BASE:1 −1000');
  assert.equal(fixture.store.get('base:33:0'), 4200, '同上（嘉德）');
  assert.equal(fixture.store.get('flag:10004'), 987, 'MONEY × 0.8 后向零截断');
  assert.equal(
    fixture.store.get('exflag:4444'),
    9999 - (1234 - 987),
    '损失额同时从非作弊资金追踪器扣掉',
  );
  assert.equal(
    fixture.chara_no.includes(33),
    false,
    'CALL EVENT_CHARA_LEAVE 删嘉德',
  );
  assert(
    history_texts(fixture).includes(
      '魔物损失近半、金库也在混乱中被毁去了一角、奴隶们或多或少都收了些伤。',
    ),
    '收尾行在 rampage 之后',
  );
});

test('inconseq 步：END7_2/END7_5/END7_22 调 ENDINCONSQSELECT,7，按结果印不同文本', async () => {
  const CASES = [
    [7, 2, 1, '「哇～魔王大人最好了～那，菲娅先去房间里了哦～♪」'], // 无声段，单输入
    [7, 2, 2, '「啊唔唔……魔王大人今天很忙吗……这样啊……」'],
    [7, 5, 3, '「……啊～那样的话太好了」'],
    [7, 5, 4, '「这，这样啊……虽然努力的练习过了……果然还是不行吗……」'],
    // END7_22 的 INPUT 有两次：先「要不要进入魔女线」（[1]），再因果选择
    [7, 22, 5, '药水并不多，只一小口就全部喝干净了，', [1, 5]],
    [7, 22, 6, '「不，不要喝吗……？」', [1, 6]],
    [7, 22, 7, '打开瓶子以后，趁着菲娅不注意，统统的都让她喝了下去。', [1, 7]],
  ];
  for (const [family, section, result, text, extra] of CASES) {
    const fixture = create_era_fixture();
    const { END_FAMILY } = fixture.load_module('event/ending-family');
    fixture.store.set('callname:0:-1', '小魔王');
    fixture.set_inputs(...(extra ?? [result]));
    await END_FAMILY.call(family, { args: [section] });
    assert(
      history_texts(fixture).includes(text),
      `END${family}_${section} 的因果选择 RESULT=${result}`,
    );
  }
});

test('inconseq 步的插值：%SAVESTR:MASTER% 换成角色 0 的姓名', async () => {
  const fixture = create_era_fixture();
  const { END_FAMILY } = fixture.load_module('event/ending-family');
  fixture.store.set('callname:0:-1', '小魔王');
  fixture.set_inputs(1, 5); // 先走 END7_22 的分岔，再是因果选择
  await END_FAMILY.call(7, { args: [22] });
  assert(
    history_texts(fixture).includes(
      '小魔王就这样顺势的，把菲娅按倒在床上，扯开了衣服，露出了幼小的身体……',
    ),
    '插值点（ENDINCONSQSELECT 的 5 号文本）',
  );
});

test('数据段的插值：END7_1 的 %SAVESTR:MASTER% 换成角色 0 的姓名', async () => {
  const fixture = create_era_fixture();
  const { END_FAMILY } = fixture.load_module('event/ending-family');
  fixture.store.set('callname:0:-1', '小魔王');
  await END_FAMILY.call(7, { args: [1] });
  assert(
    history_texts(fixture).includes(
      '已经将幼女的人生完全掌握的小魔王，在水晶球中俯视着影像。',
    ),
    '插值点（ENDINGDATA.ERB:488）',
  );
});

test('end10_54 的 ALIGNMENT：先 CENTER 后 LEFT（era.setAlign 各一次）', async () => {
  const fixture = create_era_fixture();
  const { END_FAMILY } = fixture.load_module('event/ending-family');
  await END_FAMILY.call(10, { args: [54] });
  assert.deepEqual(
    fixture.calls
      .filter(({ api }) => api === 'setAlign')
      .map(({ args }) => args[0]),
    ['center', 'left'],
    'END10_54 的两处 ALIGNMENT（REDRAW 不镜像）',
  );
  assert(history_texts(fixture).includes('天神宫可以侵略了。'), '收尾行');
});

test('ENDINGINPUT CASE 1：输入的 [2] 继续 / [1] QUIT（throw 型）/ 无效输入重问', async () => {
  {
    const fixture = create_era_fixture();
    const { ending_input } = fixture.load_module('event/event-ending');
    fixture.set_inputs(2);
    await ending_input(1099); // EX_FLAG:2801(99) + 1000 → LOCAL 1
    assert(
      history_texts(fixture).includes('魔王的传说，还将继续......'),
      '[2] 继续分支的文本',
    );
  }
  {
    const fixture = create_era_fixture();
    const { ending_input } = fixture.load_module('event/event-ending');
    fixture.set_inputs(1);
    let caught;
    await ending_input(1099).catch((e) => {
      caught = e;
    });
    assert(
      caught instanceof Error && caught.message === 'quit',
      '[1] 结束游戏 → era.quit() 抛 Error("quit")（#148 throw 型）',
    );
  }
  {
    const fixture = create_era_fixture();
    const { ending_input } = fixture.load_module('event/event-ending');
    fixture.set_inputs(7, 5, 2); // 两次无效值后命中 [2]
    await ending_input(1099);
    assert.equal(
      fixture.inputs_consumed.filter(({ api }) => api === 'input').length,
      3,
      '无效输入只重问（GOTO ENDDINGSELECT），共三次 INPUT',
    );
  }
});

test('ENDINGINPUT CASE 7（菲娅线）：[1] 两条起线提示 + 线值与主线推进、[2]/[3]/重问', async () => {
  // [初始 2807, 输入, 期望 2807, 期望 2801, 期望文本]
  const CASES = [
    [3, 1, 103, 2, '菲娅公主线start~'],
    [13, 1, 113, 2, '菲娅魔女线start~'],
    [20, 1, 120, 2, null],
    [20, 2, 120, 0, '嘛...那祝你其他线好运咯'],
    [20, 3, 20, 0, '嗯，那就给你先存个档，明天再问吧'],
  ];
  for (const [before, input, want, want_main, text] of CASES) {
    const fixture = create_era_fixture();
    const { ending_input } = fixture.load_module('event/event-ending');
    fixture.store.set('exflag:2807', before);
    fixture.set_inputs(input);
    await ending_input(7000); // local = 7
    assert.equal(
      fixture.store.get('exflag:2807'),
      want,
      `CASE 7 输入 ${input}`,
    );
    assert.equal(
      fixture.store.get('exflag:2801') || 0,
      want_main,
      `CASE 7 输入 ${input}：主线推进 EX_FLAG:2801`,
    );
    if (text !== null) {
      assert(
        history_texts(fixture).includes(text),
        `CASE 7 输入 ${input}：文本`,
      );
    }
  }
});

test('ENDINGINPUT CASE 16（双飞）与 CASEELSE（各角色线）：写的是 FLAG 侧与 2805 线', async () => {
  {
    // CASE 16：两个选项都只抬 2805（原作未完成），[3] 不动
    for (const [input, want] of [
      [1, 100],
      [2, 100],
      [3, 0],
    ]) {
      const fixture = create_era_fixture();
      const { ending_input } = fixture.load_module('event/event-ending');
      fixture.set_inputs(input);
      await ending_input(16000); // local = 16
      assert.equal(
        fixture.store.get('exflag:2805') || 0,
        want,
        `CASE 16 输入 ${input}`,
      );
    }
  }
  {
    // CASEELSE：LOCAL = 5（玛奥线）——[1] 写 FLAG:(2800+5) 侧（原作错位）+ 2801 += 2；
    // `SIF LOCAL == (5 || 6)` 在 Emuera 里求值为 LOCAL == 1，恒假（见函数头）
    const fixture = create_era_fixture();
    const { ending_input } = fixture.load_module('event/event-ending');
    fixture.set_inputs(1);
    await ending_input(5000 + 0); // local = 5
    assert.equal(fixture.store.get('flag:2805'), 100, 'FLAG:2805 += 100');
    assert.equal(fixture.store.get('exflag:2805') || 0, 0, 'EX_FLAG 侧不动');
    assert.equal(
      fixture.store.get('exflag:2801'),
      2,
      '主线 += 2（SIF 未命中，不再 +1）',
    );
  }
  {
    const fixture = create_era_fixture();
    const { ending_input } = fixture.load_module('event/event-ending');
    fixture.set_inputs(2);
    await ending_input(5999); // local = 5
    assert.equal(
      fixture.store.get('flag:2805'),
      100,
      '[2] 跳过：同样写 FLAG 侧',
    );
    assert.equal(fixture.store.get('exflag:2801') || 0, 0, '[2] 不抬主线');
  }
  {
    const fixture = create_era_fixture();
    const { ending_input } = fixture.load_module('event/event-ending');
    fixture.set_inputs(3);
    await ending_input(5000);
    assert.equal(
      fixture.store.get('flag:2805') || 0,
      0,
      '[3] 明天再见：什么都不写',
    );
  }
});

test('存根清单核对：event-ending 与 chara-init 的 STUBBED_CALLS 全部收录进 docs/stub-registry.md', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS: ENDING_STUBS } =
    fixture.load_module('event/event-ending');
  const { STUBBED_CALLS: INIT_STUBS } = fixture.load_module('chara/chara-init');
  // #404（N20）起 ENDING_3/4/5、CHAR_GIFT、END10_55、ENDING_N 全接真身；
  // RACE_AGE_GENERATE 随 #385 合并接上真身（rebase 后清出名单）；
  // SHOW_CHARA_INFO 随 #390 接上真身（本文件的两处贡品详情页），名单清空
  assert.deepEqual(ENDING_STUBS, []);
  // ST_UP 自 #179（H10）起为真身（ere/dungeon/dungeon-lvup.js）、
  // SET_SUIT_SELFCALL/SET_NICK_SELFCALL/CSVCSTR 自 #383 起为真身
  // （ere/chara/chara-self-call.js）、CHAR_BODY_GENERATE_WAPPED 自 #385 起
  // 为真身（ere/chara/chara-body.js），均移出
  assert.deepEqual(INIT_STUBS, []);
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
