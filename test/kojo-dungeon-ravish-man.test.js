/**
 * ere/kojo/kojo-dungeon-ravish-man.js 的行为测试（issue #183，阶段 3 H14）。
 *
 * 缝 = test/helpers/era-fixture.js。世界底座：被凌辱者 = 角色 31（通用奴隶
 * 编号），由 join_slave_chara 预置并加入。覆盖：
 *   - 11 种怪物的凌辱事件（`*_ryou_man`）各自可调用、输出非空、返回 0；
 *   - 数值副作用（JUEL/EXP 的 era.add 累加）与畏怖阶段（CFLAG:131）分档；
 *   - 随机分支可控可重复（rand 定值序注入，RAND:n 按函数内出现序消费）；
 *   - %SAVESTR:ARG% 插值（arg_name ← callname:31:-1）与 {MON_NUM} 计算插值；
 *   - PRINTDATA 随机数组（pick 按 rand_n 取一条）；
 *   - 初吻对象推进（CFLAG:16 == -1 → 995，SIF 语义）；
 *   - 存根清单核对（GOBI_KOUJO 登记 docs/stub-registry.md）；
 *   - **同名函数断言**：本文件导出 `*_ryou_man`（带 man 后缀），与 H13
 *     （#182）的 `@*_RYOU`（无 man）区分——#12 的首个加载生效遮蔽不触发。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_chara_0, join_slave_chara } = require('./helpers/chara');

// 世界底座：被凌辱者 31 入列（无调教上下文——本文件不依赖 beginTrain）
async function setup_ravish(seed) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '冒险者');
  if (seed) {
    seed(fixture);
  }
  fixture.load_module('kojo/kojo-dungeon-ravish-man');
  return fixture;
}

// RAND:N 定值序：draws 依次被消费，越界取模
const seq_rand =
  (...draws) =>
  (n) => {
    const value = draws.shift() ?? 0;
    return value % n;
  };

// 全部 11 个函数（导出名 → 文件名里的 @ 原名）
const FUNCS = [
  ['orc_ryou_man', 'ORC_RYOU男'],
  ['slime_ryou_man', 'SLIME_RYOU男'],
  ['insect_ryou_man', 'INSECT_RYOU男'],
  ['ivy_ryou_man', 'IVY_RYOU男'],
  ['syokusyu_ryou_man', 'SYOKUSYU_RYOU男'],
  ['faily_ryou_man', 'FAILY_RYOU男'],
  ['giant_ryou_man', 'GIANT_RYOU男'],
  ['man_ryou_man', 'MAN_RYOU男'],
  ['beast_ryou_man', 'BEAST_RYOU男'],
  ['brain_ryou_man', 'BRAIN_RYOU男'],
  ['horse_ryou_man', 'HORSE_RYOU男'],
];

test('11 种怪物分派：各自可调用、输出非空、返回 0', async () => {
  for (const [export_name, erb_name] of FUNCS) {
    const fixture = await setup_ravish();
    const mod = fixture.load_module('kojo/kojo-dungeon-ravish-man');
    assert.equal(typeof mod[export_name], 'function', `${export_name} 未导出`);
    const result = await mod[export_name](31, 5, seq_rand(0));
    assert.equal(result, 0, `${export_name} 应返回 0（RETURN 0）`);
    const lines = fixture.text_lines();
    assert.ok(
      lines.length > 0,
      `${export_name}（原作 @${erb_name}）应输出文本`,
    );
    assert.ok(
      lines.some((l) => l.includes('冒险者')),
      `${export_name} 应含被凌辱者名字（%SAVESTR:ARG%）`,
    );
  }
});

test('兽人凌辱（RAND:5 == 0）：口交三选一 + 恐怖点数 + 初吻', async () => {
  // rand_n(5) == 0 → 口交支；rand_n(5) 用于 PRINTDATA 三选一（0 → 第一条）
  const fixture = await setup_ravish((f) => {
    f.store.set('talent:31:11', 1); // 反抗的 → 恐怖点数
    f.store.set('cflag:31:16', -1); // 初吻未经历
  });
  const mod = fixture.load_module('kojo/kojo-dungeon-ravish-man');
  const result = await mod.orc_ryou_man(31, 5, seq_rand(0, 0));
  assert.equal(result, 0);
  const lines = fixture.text_lines();
  assert.ok(lines.some((l) => l.includes('恐怖点数+50')));
  // #584：原作 :71-72 是 PRINTFORM + PRINTFORML，同一行——整行相等即断言
  assert.ok(
    lines.includes(
      '带着反抗的目光看着它们，其中一只兽人对他怒喝了一声，恐怖点数+50',
    ),
    '反抗的：恐怖点数与前置描写同一行（#584）',
  );
  assert.ok(lines.some((l) => l.includes('口交经验+5')));
  // 数值副作用
  assert.equal(fixture.store.get('juel:31:10'), 50); // 恐怖
  assert.equal(fixture.store.get('exp:31:22'), 5); // 口交
  assert.equal(fixture.store.get('exp:31:20'), 5); // 精液
  // 初吻推进
  assert.equal(fixture.store.get('cflag:31:16'), 995);
});

test('兽人凌辱（RAND:5 != 0 全穴奉仕）：肛门/口交/精液经验', async () => {
  // rand_n(5) == 1 → 全穴奉仕；rand_n(4) 用于 PRINTDATAW 三选一
  const fixture = await setup_ravish();
  const mod = fixture.load_module('kojo/kojo-dungeon-ravish-man');
  await mod.orc_ryou_man(31, 5, seq_rand(1, 0));
  const lines = fixture.text_lines();
  assert.ok(lines.some((l) => l.includes('注满了精液')));
  assert.equal(fixture.store.get('exp:31:1'), 5); // 肛门经验
  assert.equal(fixture.store.get('exp:31:22'), 5); // 口交经验
  assert.equal(fixture.store.get('exp:31:20'), 5); // 精液经验
  assert.equal(fixture.store.get('juel:31:9'), 50); // 苦痛
});

test('史莱姆凌辱（RAND:6 == 0）：黏液侵犯 + 体力回复分支', async () => {
  // rand_n(6) == 0 → 黏液侵犯；体力回复在 RAND:6 != 0 且其余不中的兜底
  const a = await setup_ravish();
  const mod = fixture_module(a);
  await mod.slime_ryou_man(31, 5, seq_rand(0));
  assert.ok(a.text_lines().some((l) => l.includes('黏液侵犯着')));
  assert.equal(a.store.get('juel:31:9'), 50);
  assert.equal(a.store.get('exp:31:1'), 5);

  // 兜底支（rand_n(6)=1, rand_n(5)=1, rand_n(4)=1, rand_n(3)=1, rand_n(2)=1）
  const b = await setup_ravish();
  const mod_b = fixture_module(b);
  await mod_b.slime_ryou_man(31, 5, seq_rand(1, 1, 1, 1, 1));
  assert.ok(b.text_lines().some((l) => l.includes('治愈了')));
  assert.equal(b.store.get('base:31:0'), 100); // BASE:ARG:0 += 100
});

// 辅助：加载模块（避免重复 require 缓存问题）
function fixture_module(fixture) {
  return fixture.load_module('kojo/kojo-dungeon-ravish-man');
}

test('巨人凌辱：单只分支（MON_NUM == 1）提前返回', async () => {
  const fixture = await setup_ravish((f) => f.store.set('cflag:31:16', -1));
  const mod = fixture_module(fixture);
  const result = await mod.giant_ryou_man(31, 1, seq_rand(0));
  assert.equal(result, 0);
  assert.ok(fixture.text_lines().some((l) => l.includes('『喝下去哦』')));
  assert.equal(fixture.store.get('exp:31:22'), 1);
  assert.equal(fixture.store.get('cflag:31:16'), 995); // 初吻
});

test('巨人凌辱：畏怖阶段分档（CFLAG:131 > 5 → 隷属口上）', async () => {
  const fixture = await setup_ravish((f) => f.store.set('cflag:31:131', 6));
  const mod = fixture_module(fixture);
  await mod.giant_ryou_man(31, 5, seq_rand(0));
  assert.ok(fixture.text_lines().some((l) => l.includes('灰机杯')));
});

test('男人凌辱：肉便器分支（RAND:5 != 0 且 RAND:4 == 0）', async () => {
  const fixture = await setup_ravish();
  const mod = fixture_module(fixture);
  // 畏怖口上 pick 先消费 1 个 rand_n(5)；rand_n(5)（口交判定）用 1 不中；
  // rand_n(4) 用 0 → 中肉便器
  await mod.man_ryou_man(31, 5, seq_rand(1, 1, 0));
  const lines = fixture.text_lines();
  assert.ok(lines.some((l) => l.includes('肉便器')));
  // #600：:767..:804（含 :802 PRINTFORM + :804 PRINTFORMW 的收尾）整段一行。
  // #584 只合了 :802+:804 两段，此处按整行断言（详见下一个用例）
  assert.ok(
    lines.includes(
      '冒险者的身上，被写着【最喜欢阴茎】【操我】之类的话。络绎不绝的魔族男人，将嘴巴、肛门等等地方都侵犯了，精液流得到处都是。',
    ),
    '肉便器行必须是整行（#600）',
  );
  assert.equal(fixture.store.get('exp:31:1'), 5);
  assert.equal(fixture.store.get('exp:31:22'), 5);
});

test('#600 男人凌辱·肉便器：:767..:804 的装身写文与收尾同属一行', async () => {
  // 原作 :767「%SAVESTR:ARG%的身上，被写着」+ :768「【最喜欢阴茎】」
  // + IF 追加的落書（:771/:776/:781/:786/:791）+ IF/ELSEIF 三选一（:795/:797/:799）
  // + :802（PRINTFORM）+ :804（PRINTFORMW 收行）都是一行：无后缀 PRINT 不换行。
  // 各 IF 是追加片段（不是互斥分支），整段的判断条件提到语句外当取值
  // 末尾三选一由 rand_n(3) → rand_n(2) 决定（前三个 draw 是畏怖 pick、口交判定、
  // 中肉便器的 RAND:4 == 0），三档各钉一例
  const cases = [
    [{}, [1, 1, 0], '【操我】'],
    [{}, [1, 1, 0, 1, 0], '【肛门免费】'],
    [{}, [1, 1, 0, 1, 1], '【母猪】'],
    [{ 42: 1, 70: 1 }, [1, 1, 0], '【又粘又湿】【愉悦的脸】【操我】'],
    [{ 22: 1, 121: 1 }, [1, 1, 0], '【性冷淡便器】【有鸡鸡的奴隶】【操我】'],
  ];
  for (const [talents, draws, marks] of cases) {
    const fixture = await setup_ravish((f) => {
      for (const [id, value] of Object.entries(talents)) {
        f.store.set(`talent:31:${id}`, value);
      }
    });
    const mod = fixture_module(fixture);
    await mod.man_ryou_man(31, 5, seq_rand(...draws));
    const line =
      `冒险者的身上，被写着【最喜欢阴茎】${marks}` +
      '之类的话。络绎不绝的魔族男人，将嘴巴、肛门等等地方都侵犯了，精液流得到处都是。';
    assert.ok(
      fixture.text_lines().includes(line),
      `TALENT ${JSON.stringify(talents)} / RAND ${draws} → 整行「${line}」`,
    );
  }
});

test('#584 兽人凌辱：素直（TALENT:13）行的耻情点数与前置描写同一行', async () => {
  // 原作 :76（PRINTFORM）+:77（PRINTFORML 耻情点数+{MON_NUM * 10}）是同一行
  const fixture = await setup_ravish((f) => {
    f.store.set('talent:31:13', 1); // 素直（TALENT:11 反抗的未置位）
  });
  const mod = fixture_module(fixture);
  await mod.orc_ryou_man(31, 5, seq_rand(0, 0));
  assert.ok(
    fixture
      .text_lines()
      .includes(
        '迫于兽人的威胁，他衡量了一下得失之后，老实地接受了屈辱的命运……听天由命地流泪，耻情点数+50',
      ),
    '素直：耻情点数与前置描写同一行（#584）',
  );
  assert.equal(fixture.store.get('juel:31:8'), 50); // 耻情
});

test('人狼分支（TALENT:314 == 2）：欲情点数', async () => {
  for (const [fn, line] of [
    ['beast_ryou_man', '不太反感和野兽做爱'],
    ['horse_ryou_man', '不太反感和马做爱'],
  ]) {
    const fixture = await setup_ravish((f) => f.store.set('talent:31:314', 2));
    const mod = fixture_module(fixture);
    await mod[fn](31, 5, seq_rand(0));
    assert.ok(
      fixture.text_lines().some((l) => l.includes(line)),
      `${fn} 应含人狼台词`,
    );
    assert.equal(fixture.store.get('juel:31:5'), 50); // 欲情
    assert.equal(fixture.store.get('exp:31:56'), 5); // 兽奸经验
  }
});

test('食脑魔凌辱（RAND:2 == 0）：支配精神 + 异常经验', async () => {
  const fixture = await setup_ravish();
  const mod = fixture_module(fixture);
  await mod.brain_ryou_man(31, 5, seq_rand(0));
  assert.ok(fixture.text_lines().some((l) => l.includes('支配他的精神')));
  assert.equal(fixture.store.get('exp:31:50'), 1); // 异常经验
  assert.equal(fixture.store.get('exp:31:1'), 50); // 肛门经验 * 10
});

test('GOBI_KOUJO 行内拼接：『猪…』整段一行收语尾（源 :308-:328，#570）', async () => {
  // K3 高貴真身（talent 163 → 族内 3）；era_flag.target 指到被凌辱者——
  // @GOBI_KOUJO 读当前 TARGET。talent 17（プライド低い）→ 语尾档 1（喜び）
  const fixture = await setup_ravish((f) => {
    f.store.set('talent:31:17', 1);
    f.store.set('talent:31:163', 1);
  });
  fixture.load_module('kojo/kojo-k3-noble');
  fixture.load_module('era-utils/era-flag').target = 31;
  const mod = fixture_module(fixture);
  // orc：rand_n(5)=2 不中口交、rand_n(4)=1 不中全穴、rand_n(3)=0 中屈辱
  await mod.orc_ryou_man(31, 5, seq_rand(2, 1, 0));
  assert.ok(
    fixture
      .text_lines()
      .includes('『猪的噢~♪还自称冒险者……简直傻了的噢~♪　噗噗，噗嘻！』'),
    'PRINTFORM → GOBI → PRINTFORM → GOBI → PRINTFORMW 的整段在 ere 是一行',
  );
  assert.ok(
    !fixture.text_lines().some((l) => l === '的噢~♪'),
    '语尾不得单独成行（#570 的原始症状）',
  );

  // 未注册性格 → TRYCALL 落空空串，行照常结束、不多空行
  const miss = await setup_ravish((f) => f.store.set('talent:31:17', 1));
  const mod_miss = fixture_module(miss);
  await mod_miss.orc_ryou_man(31, 5, seq_rand(2, 1, 0));
  assert.ok(
    miss.text_lines().includes('『猪还自称冒险者……简直傻了　噗噗，噗嘻！』'),
    '语尾落空 → 空串，整段行照常输出',
  );
});

test('存根清单可检索：docs/stub-registry.md 收录 GOBI_KOUJO', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('kojo/kojo-dungeon-ravish-man');
  const registry = fs.readFileSync(
    path.resolve(__dirname, '..', 'docs', 'stub-registry.md'),
    'utf8',
  );
  for (const name of STUBBED_CALLS) {
    assert.ok(
      registry.includes(name),
      `docs/stub-registry.md 必须收录 ${name}`,
    );
  }
});

test('同名函数断言：*_ryou_man 与 H13 的 *_ryou 名字区分', async () => {
  // #12 的首个加载生效遮蔽只发生在「同名」函数之间。本文件（H14）的
  // 函数是 `*_RYOU男`（JS 导出 `*_ryou_man`），H13 的 DUNGEON_RYOUZYOKU.ERB
  // 是 `@*_RYOU`（无 man）——两组名字不同，互不遮蔽。这里断言导出名
  // 都带 man 后缀，且与源文件的 @ 原名逐字对应（对照 DUNGEON_RYOUZYOKU.ERB
  // 的分派调用名，防止将来改错名触发遮蔽）。
  const fixture = create_era_fixture();
  const mod = fixture.load_module('kojo/kojo-dungeon-ravish-man');
  const erb = fs.readFileSync(
    path.resolve(
      __dirname,
      '..',
      'target',
      'ERB',
      '迷宮',
      'DUNGEON_RYOUZYOKU_MAN.ERB',
    ),
    'utf8',
  );
  for (const [export_name, erb_name] of FUNCS) {
    assert.equal(typeof mod[export_name], 'function');
    assert.ok(
      erb.includes(`@${erb_name}(ARG)`),
      `源文件应含 @${erb_name}(ARG) 定义`,
    );
  }
  // H13 的分派 CALL 名（TALENT:122 为真）引用的正是本文件的带 man 名
  const h13 = fs.readFileSync(
    path.resolve(
      __dirname,
      '..',
      'target',
      'ERB',
      '迷宮',
      'DUNGEON_RYOUZYOKU.ERB',
    ),
    'utf8',
  );
  for (const [, erb_name] of FUNCS) {
    assert.ok(
      h13.includes(`CALL ${erb_name},ARG`),
      `H13 分派应 CALL ${erb_name},ARG（TALENT:122 为真时）`,
    );
  }
});

// —— #624：兽人凌辱里七处「原作同一行被拆开」合回一条输出 ——
//
// 七处的共同形状：`PRINTFORM`/`PRINT`（无 L/W 后缀）连续不换行，中间夹 IF/
// SELECTCASE 的分档片段，末段才带 W/L 收行。判据提到语句外当取值、片段文本
// 留在输出语句里，锚写成拼接锚 `:a+:b+…`。
// **断言一律钉整行**：旧的 `.some(includes(片段))` 在「拆回多条」时照样绿。
//
// 分派用 rand 定值序（RAND:n 按函数内出现序消费）：
//   口交支    ：rand_n(5) = 0 → pick3 → pick5
//   全穴奉仕支：rand_n(5) ≠ 0、rand_n(4) = 0 → pick3 → pick5
//   屈辱プレイ：rand_n(5) ≠ 0、rand_n(4) ≠ 0、rand_n(3) = 0 → pick3

test('#624 兽人凌辱·口交：:22..:31 的无头骑士前缀、名字与种族分档同属一行', async () => {
  const cases = [
    [
      4,
      '无头骑士的冒险者身体被固定住了，只剩下脑袋来像飞机杯似的侍奉着兽人们的阴茎。',
    ],
    [0, '冒险者全裸地侍奉着兽人们的阴茎。'],
  ];
  for (const [race, line] of cases) {
    const fixture = await setup_ravish((f) => {
      f.store.set('talent:31:种族', race);
    });
    const mod = fixture_module(fixture);
    await mod.orc_ryou_man(31, 5, seq_rand(0, 0, 0));
    assert.ok(
      fixture.text_lines().includes(line),
      `种族 = ${race} → 整行「${line}」`,
    );
  }
});

test('#624 兽人凌辱·口交：:81..:105 与 :112..:127 两条收行路径各自成整行', async () => {
  // TALENT:52（舌使い）命中：:81/:84/:87 的初见分档 + :91 + 随机词条 + :101
  // + :105 的 PRINTW 收行，随后 :106/:107/:127
  const t52 = await setup_ravish((f) => {
    f.store.set('talent:31:14', 1); // 大人しい → 「提心吊胆地」
    f.store.set('talent:31:52', 1); // 舌使い
  });
  const mod_t52 = fixture_module(t52);
  await mod_t52.orc_ryou_man(31, 5, seq_rand(0, 0, 0));
  const lines_t52 = t52.text_lines();
  assert.ok(
    lines_t52.includes(
      '提心吊胆地冒险者把阴茎含了下去，『呃……这家伙，简直就是经验丰富的娼妓嘛～』',
    ),
    'TALENT:52 支：:81..:105 是一整行',
  );
  assert.ok(
    !lines_t52.includes('提心吊胆地'),
    ':81 的初见分档不得再单独成行（#624 审查发现：前缀重复）',
  );
  assert.ok(
    lines_t52.includes('冒险者拼命地用舌头侍奉着，展现出天赋般的好技术。'),
    ':106 自占一行',
  );
  assert.ok(
    lines_t52.includes('兽人抵受不住他那灵活的舌头，射在冒险者的嘴里了。'),
    ':107 自占一行',
  );
  assert.ok(lines_t52.includes('奉仕持续了下去……'), ':127 自占一行');

  // 其余支：:81/:84/:87 的初见分档 + :91 + 随机词条 + :101 是前半段，
  // :112..:124 的分档片段接 :127 的 PRINTL 收行。两条分档链互相独立
  //（前缀看 TALENT:14/17/35，尾段看 TALENT:21/36/50/62/63）
  const cases = [
    [[14], '提心吊胆地', ''],
    [[17], '嘿嘿媚笑着', ''],
    [[35], '不敢直视肉棒而闭上了眼睛', ''],
    [[], '', ''],
    [[21], '', '像工作一样地奉仕着，'],
    [[36], '', '不禁发出了粗俗的声音，'],
    [[50], '', '很快地抓住了奉仕的诀窍，'],
    [[62], '', '忍受着腥臭味，'],
    [[63], '', '拼命地用舌头奉仕着，'],
    [[14, 21], '提心吊胆地', '像工作一样地奉仕着，'],
  ];
  for (const [talents, prefix, tail] of cases) {
    const fixture = await setup_ravish((f) => {
      for (const id of talents) {
        f.store.set(`talent:31:${id}`, 1);
      }
    });
    const mod = fixture_module(fixture);
    await mod.orc_ryou_man(31, 5, seq_rand(0, 0, 0));
    const lines = fixture.text_lines();
    const line = `${prefix}冒险者把阴茎含了下去，${tail}奉仕持续了下去……`;
    assert.ok(
      lines.includes(line),
      `TALENT ${JSON.stringify(talents)} → :81..:101 与 :112..:127 合成一条「${line}」`,
    );
    assert.ok(
      !lines.includes(`${prefix}冒险者把阴茎含了下去，`),
      `TALENT ${JSON.stringify(talents)} → 前半段不得单独成行`,
    );
  }
});

test('#624 兽人凌辱·全穴奉仕：:152..:175 的随机词条与部位分档同属一行', async () => {
  const cases = [
    [{ cflag42: 83 }, '眼镜上飞撒着……'],
    [{ 魅力点: 2 }, '可爱的眼睛上飞撒着……'],
    [{ 魅力点: 3 }, '漂亮的鼻子里喷了出来……'],
    [{ 魅力点: 22 }, '光鲜亮丽的头发上飞撒着……'],
    [{ 魅力点: 1 }, '脸上飞撒着……'],
    [{}, '脸上飞撒着……'],
  ];
  for (const [seed, tail] of cases) {
    const fixture = await setup_ravish((f) => {
      if (seed.cflag42 !== undefined) {
        f.store.set('cflag:31:42', seed.cflag42);
      }
      if (seed.魅力点 !== undefined) {
        f.store.set('talent:31:魅力点', seed.魅力点);
      }
    });
    const mod = fixture_module(fixture);
    await mod.orc_ryou_man(31, 5, seq_rand(1, 0, 0, 0));
    const line =
      '兽人的阴茎插进了冒险者的喉咙深处，射精的同时喷溅出来的精液在冒险者的' +
      tail;
    assert.ok(
      fixture.text_lines().includes(line),
      `${JSON.stringify(seed)} → 整行「${line}」`,
    );
  }
});

test('#624 兽人凌辱·全穴奉仕：:198..:216 的润滑液与部位分档同属一行', async () => {
  const cases = [
    [{ 魅力点: 21 }, '漂亮的'],
    [{ 魅力点: 14 }, '漂亮的屁股的缝隙中的'],
    [{ 魅力点: 23 }, '大的屁股的缝隙中的'],
    [{ 125: 1 }, '无毛额'],
    [{ 248: 1 }, '肌肉明显的两腿间的'],
    [{ 阴毛状态: 201 }, '从阴阜到肛门都被茂密的阴毛所覆盖的'],
    [{ 阴毛状态: 151 }, '长着茂盛的阴毛的'],
    [{}, ''],
  ];
  for (const [seed, part] of cases) {
    const fixture = await setup_ravish((f) => {
      for (const [key, value] of Object.entries(seed)) {
        f.store.set(`talent:31:${key}`, value);
      }
    });
    const mod = fixture_module(fixture);
    await mod.orc_ryou_man(31, 5, seq_rand(1, 0, 0, 0));
    const line = `兽人们把润滑液涂在了冒险者的${part}性器和肛门上`;
    assert.ok(
      fixture.text_lines().includes(line),
      `${JSON.stringify(seed)} → 整行「${line}」`,
    );
  }
});

test('#624 兽人凌辱·全穴奉仕：:217..:242 的体型分档与收行同属一行', async () => {
  const cases = [
    [{ 99: 1 }, '魁梧的身体上'],
    [{ 100: 1 }, '娇小的身体上'],
    [{ 115: 1 }, '松松垮垮的身体上'],
    [{ 248: 1 }, '紧致的身体上'],
    [{ 256: 1 }, '窈窕的身体上'],
    [{ 体型: 100 }, '纤细的身体上'],
    [{ 体型: 0 }, '纤细的身体上'], // 未置位也走 `<= 100`
    [{ 体型: 201 }, '肉感的身体上'],
    [{ 体型: 150 }, '身体上'],
  ];
  for (const [seed, part] of cases) {
    const fixture = await setup_ravish((f) => {
      for (const [key, value] of Object.entries(seed)) {
        f.store.set(`talent:31:${key}`, value);
      }
    });
    const mod = fixture_module(fixture);
    await mod.orc_ryou_man(31, 5, seq_rand(1, 0, 0, 0));
    const line = `在冒险者的${part}像要挤爆他似的激烈地持续侵犯着……`;
    assert.ok(
      fixture.text_lines().includes(line),
      `${JSON.stringify(seed)} → 整行「${line}」`,
    );
  }
});

test('#624 兽人凌辱·屈辱プレイ：:268..:287 的素质分档与猪叫同属一行', async () => {
  const cases = [
    [{ 10: 1 }, '浑身颤抖着、'],
    [{ 14: 1 }, '浑身颤抖着、'],
    [{ 11: 1 }, '怒目圆睁着、'],
    [{ 13: 1 }, '拼命服从着、'],
    [{ 17: 1 }, '拼命献媚着、'],
    [{ 35: 1 }, '羞红了脸、'],
    [{}, ''],
  ];
  for (const [seed, part] of cases) {
    const fixture = await setup_ravish((f) => {
      for (const [key, value] of Object.entries(seed)) {
        f.store.set(`talent:31:${key}`, value);
      }
    });
    const mod = fixture_module(fixture);
    await mod.orc_ryou_man(31, 5, seq_rand(2, 1, 0, 0));
    const line = `冒险者全裸地四肢着地趴在地下、${part}屈辱地模仿猪叫……`;
    assert.ok(
      fixture.text_lines().includes(line),
      `${JSON.stringify(seed)} → 整行「${line}」`,
    );
  }
});
