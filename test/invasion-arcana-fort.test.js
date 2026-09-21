/**
 * ere/invasion/invasion-arcana-fort.js 的行为测试（issue #470，Q13
 * 侵略残余·3）。
 *
 * 源: target/ERB/侵略/ARCANA_FORT.ERB 的 @ARCANA_FORT（:2-554）。战斗
 * 本体 arcana_battle 已由 test/invasion-arcana-battle.test.js 覆盖，
 * 这里只驱动：入场叙述、门选择、候选列表（含妊娠模式与 GOTO
 * INPUT_LOOP1 的翻转怪癖）、骑士生成（预设/武器/经验/初体验）、胜负
 * 结算（FLAG:92 置位、赏金镜像、体型回写、败北移除）。
 *
 * 缝 = test/helpers/era-fixture.js。随机源按上界注入（knob，同
 * invasion-arcana-battle.test.js 的核算）：rand(100)=99 不失手不连击、
 * rand(6)=1 平局、rand(2)=1 magic 三段未命中、rand(3)=0 怪物技能直退、
 * 其余（含 rand(80) 名字种子与身体生成）恒 0——knob 无状态，同上界
 * 恒同值，身体生成的期望值可离线用同一 knob 复算。
 *
 * 骑士预设取 yml/Chara20-23.yml 的 名前/状態(フラグ1)/等级(9)/攻防(11,12)/
 * 基础(0,1)——ADDCHARA 在引擎里把预设整行灌进新角色，夹具不做这一步
 * （test/helpers/era-fixture.js 的 addCharacter 只承认预设存在并写 callname），
 * 所以本文件自己落这些键。**素質不搬**：金红桃（20）带 308/314，会进入
 * CHAR_SIZE_GENERATE 的腰围/臀围公式，搬了就得让体型回写用例的对照世界
 * 同款搬一遍；素質 的真身由 test/chara-yml.test.js 对引擎代码背书，本文件
 * 只钉「堡垒侧把哪几个值传进生成器、把结果写回哪几个下标」这条管道。
 *
 * 胜利用例的奴隶数值压倒性：对 yml 里最强的金红桃（HP 24500、攻防 2240）
 * 也一回合打成 ≤0；自身防御 20000 > 骑士攻 2240，按伤害式 DEF 取 0，
 * 吃下一击的上限（2240×2×倍率）远在 200000 之下。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/** 按上界取值的确定性随机源（同 invasion-arcana-battle.test.js） */
function knob(overrides = {}) {
  const table = { 2: 1, 3: 0, 6: 1, 100: 99, ...overrides };
  return (n) => {
    const value = table[n] ?? 0;
    assert(value >= 0 && value < n, `随机值 ${value} 不在 RAND:${n} 范围内`);
    return value;
  };
}

/**
 * 四位圣灵骑士的预设（yml/Chara20-23.yml）：状态(フラグ1)/等级/攻防/基础。
 * 等级进赏金（1000×等级），攻防进战斗，基础进 BASE 回满。
 */
const KNIGHT_PRESETS = {
  20: {
    name: '金红桃',
    level: 700,
    atk: 2240,
    def: 2240,
    hp: 24500,
    wp: 18900,
  },
  21: {
    name: '银黑桃',
    level: 550,
    atk: 1450,
    def: 1475,
    hp: 18000,
    wp: 10500,
  },
  22: { name: '黑方片', level: 105, atk: 282, def: 282, hp: 3450, wp: 2050 },
  23: { name: '白梅花', level: 315, atk: 831, def: 831, hp: 7950, wp: 9150 },
};

/** 预置四骑士：预设数据（addCharacter 守卫）+ ADDCHARA 会带进来的那些键 */
function seed_knights(fixture) {
  for (const [id, k] of Object.entries(KNIGHT_PRESETS)) {
    const cid = Number(id);
    fixture.seed_chara(cid, { id: cid, name: k.name, callname: k.name });
    fixture.store.set(`cflag:${cid}:1`, 2); // CFLAG:1 状态 2 = 圣灵骑士在任
    fixture.store.set(`cflag:${cid}:9`, k.level);
    fixture.store.set(`cflag:${cid}:11`, k.atk);
    fixture.store.set(`cflag:${cid}:12`, k.def);
    fixture.store.set(`maxbase:${cid}:0`, k.hp);
    fixture.store.set(`maxbase:${cid}:1`, k.wp);
  }
}

/**
 * 攻略世界：魔王 0 + 奴隶 1（阿尔，候选）。win=true 给压倒性数值，
 * false 给被骑士秒杀的数值。
 */
function setup_fort_world({ win = true, talent = 85 } = {}) {
  const fixture = create_era_fixture();
  seed_knights(fixture);
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(1, { id: 1, name: '阿尔', callname: '阿尔' });
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(1);
  // 候选判据：状态 0/7 + 爱(85)或淫乱(76) + CFLAG:0 == 2 + 非魔王
  fixture.store.set('cflag:1:1', 0);
  fixture.store.set(`talent:1:${talent}`, 1);
  fixture.store.set('cflag:1:0', 2);
  fixture.store.set('cflag:1:9', 9); // 等级 9（< 100，技能段不掷）
  if (win) {
    fixture.store.set('cflag:1:11', 20000);
    fixture.store.set('cflag:1:12', 20000);
    fixture.store.set('base:1:0', 200000);
    fixture.store.set('base:1:1', 200000);
    fixture.store.set('maxbase:1:0', 200000);
    fixture.store.set('maxbase:1:1', 200000);
  } else {
    fixture.store.set('cflag:1:11', 10);
    fixture.store.set('cflag:1:12', 5);
    fixture.store.set('base:1:0', 200);
    fixture.store.set('base:1:1', 200);
    fixture.store.set('maxbase:1:0', 200);
    fixture.store.set('maxbase:1:1', 200);
  }
  fixture.store.set('flag:60', 0); // 无追加升级
  fixture.store.set('flag:500', 0); // 狂王 = 男（金红桃的精液经验档）
  return fixture;
}

/** 直达门选择：FLAG:92 = 0 时的入场叙述走完（候选存在），供多数用例复用 */
function stage_zero_world(opts) {
  const fixture = setup_fort_world(opts);
  fixture.set_inputs(4); // 撤退
  return fixture;
}

/**
 * 追加第二位候选贝丝（状态 0 + 淫乱 76 + 妊娠 153）。用在「妊娠出撃可」
 * 的对照：位 10 关时她被 TALENT:153 挡下（索引 1 不打印），位 10 开时
 * 直接入列。
 */
function add_pregnant_bess(fixture) {
  fixture.seed_chara(2, { id: 2, name: '贝丝', callname: '贝丝' });
  fixture.era.addCharacter(2);
  fixture.store.set('cflag:2:1', 0);
  fixture.store.set('talent:2:76', 1); // 淫乱（候选判据二选一）
  fixture.store.set('cflag:2:0', 2);
  fixture.store.set('cflag:2:9', 9);
  fixture.store.set('talent:2:153', 1); // 妊娠
  fixture.store.set('cflag:2:11', 10);
  fixture.store.set('cflag:2:12', 5);
  fixture.store.set('base:2:0', 200);
  fixture.store.set('base:2:1', 200);
  fixture.store.set('maxbase:2:0', 200);
  fixture.store.set('maxbase:2:1', 200);
}

test('初回无候选：俘虏情报叙述后劝退，RETURN 0', async () => {
  const fixture = setup_fort_world();
  fixture.store.set('talent:1:85', 0); // 撤掉爱标记 → 无候选
  const mod = fixture.load_module('invasion/invasion-arcana-fort');
  const r = await mod.arcana_fort(knob());
  assert.equal(r, 0, '无候选 → RETURN 0');
  const texts = fixture.text_lines();
  assert(
    texts.includes(
      '有俘虏说，狂王的亲卫队【圣灵骑士】正在为进攻你的地下城而在东南西北四个堡垒里特训着。',
    ),
  );
  assert(
    texts.includes('要把这样的猛士抓回来调教，看来必须派遣刺客才行……'),
    '劝退句',
  );
  assert(!texts.includes('东方堡垒'), '叙述外无菜单渲染'); // 门菜单未到
});

test('FLAG:92 == 15：四门全破的总结叙述后 RETURN 0', async () => {
  const fixture = setup_fort_world();
  fixture.store.set('flag:92', 15);
  const mod = fixture.load_module('invasion/invasion-arcana-fort');
  const r = await mod.arcana_fort(knob());
  assert.equal(r, 0);
  const texts = fixture.text_lines();
  assert(texts.includes('圣灵骑士全部都被打倒了，四个据点也都被攻陷了。'));
  assert(
    texts.includes(
      '（作为狂王的情妇及亲卫队长，也许在金红桃身上能得到一点情报？）',
    ),
  );
});

test('捕获进度的三种叙述：剩一位拼名、两位、一位点名', async () => {
  const cases = [
    // 原作 :29-39 / :44-54 是 PRINT×N 接收尾 PRINTW 的**同一条显示行**，
    // 断言按拼好的整行写（拆成多行会让这里变红）
    // 14 = 1110：东未破 → 黑方片
    [14, ['最后只剩下黑方片一位圣灵骑士，决战时刻临近了……']],
    // 13 = 1101：南未破 → 银黑桃
    [13, ['最后只剩下银黑桃一位圣灵骑士，决战时刻临近了……']],
    // 11 = 1011：西未破 → 白梅花
    [11, ['最后只剩下白梅花一位圣灵骑士，决战时刻临近了……']],
    // 7 = 0111：北未破 → 金红桃
    [7, ['最后只剩下金红桃一位圣灵骑士，决战时刻临近了……']],
    [6, ['现在打倒了两位圣灵骑士，还剩下两个堡垒……']],
    [4, ['你的奴隶，将伟大的圣灵骑士白梅花打倒了，还剩下三位圣灵骑士……']],
  ];
  for (const [stage, expected] of cases) {
    const fixture = stage_zero_world();
    fixture.reset_inputs(4);
    fixture.store.set('flag:92', stage);
    const mod = fixture.load_module('invasion/invasion-arcana-fort');
    const r = await mod.arcana_fort(knob());
    assert.equal(r, 0, `stage=${stage} 撤退 → 0`);
    const texts = fixture.text_lines();
    for (const line of expected) {
      assert(texts.includes(line), `进度：stage=${stage}「${line}」`);
    }
  }
});

test('门选择：已攻占的门渲染为 [*] 文本占位，[0] 被引擎拒收', async () => {
  // 原作 :80-84 已攻占的门走 PRINTL [*]（不是按钮）——引擎的 input() 只
  // 送达本轮已打印按钮的快捷键，键入 0 在渲染层就被弹回；原作 :115-116
  // 的游戏侧重问守卫因此是引擎死路径（page-invasion.test.js:177 同款裁定）。
  const fixture = stage_zero_world();
  fixture.store.set('flag:92', 1); // 东已破
  const mod = fixture.load_module('invasion/invasion-arcana-fort');
  fixture.reset_inputs(0, 4);
  await assert.rejects(
    () => mod.arcana_fort(knob()),
    /输入不合法！请输入以下值之一：1, 2, 3, 4/,
  );
  assert.equal(
    fixture.inputs_consumed.filter((e) => e.api === 'input').length,
    0,
    '0 未被送达',
  );
  const texts = fixture.text_lines();
  assert(texts.includes('[*] - 东方堡垒（已攻占）'), '东门 [*] 行');
  assert(
    fixture.lines.every(
      (line) => !(line.type === 'button' && line.accelerator === 0),
    ),
    '已攻占的门没有按钮（只有 [*] 文本行）',
  );

  // 撤退不受影响
  fixture.reset_inputs(4);
  assert.equal(await mod.arcana_fort(knob()), 0, '[4] 撤退 → RETURN 0');
  assert(texts.includes('要向哪个堡垒派遣刺客呢？必须打倒圣灵骑士才算胜利。'));
});

test('勇者列表为空（stage≠0 且无候选）：*没有可以攻击的勇士* → RETURN 0', async () => {
  const fixture = stage_zero_world();
  fixture.reset_inputs(0);
  fixture.store.set('flag:92', 4); // 西已破（跳过初回叙述）
  fixture.store.set('talent:1:85', 0); // 无候选
  const mod = fixture.load_module('invasion/invasion-arcana-fort');
  const r = await mod.arcana_fort(knob());
  assert.equal(r, 0);
  assert(fixture.text_lines().includes('*没有可以攻击的勇士*'));
});

test('[999] 返回：候选列表退出不打仗，RETURN 0', async () => {
  const fixture = stage_zero_world();
  fixture.reset_inputs(0, 999); // 东门 → 列表 → 返回
  const mod = fixture.load_module('invasion/invasion-arcana-fort');
  const r = await mod.arcana_fort(knob());
  assert.equal(r, 0);
  assert(fixture.text_lines().includes('派遣谁去攻击呢？'));
  assert.equal(fixture.store.get('flag:92'), undefined, 'FLAG:92 未动');
  assert(!fixture.era.getAddedCharacters().includes(22), '未生成骑士');
});

// —— 胜负主流程（四门表驱动） ——

test('胜利：四门表驱动——武器编码、经验/初体验、FLAG:92 置位、赏金镜像', async () => {
  const cases = [
    // [门号, 预设号, 武器编码, FLAG:92 位, 骑士名, 等级（1000×等级 = 赏金）,
    //  战后弹药（补弹 15 − 该骑士武器的弹药消耗：手里剑 44 号消耗 1）, 牌名]
    [0, 22, 40 + 9000 + 900000, 1, '黑方片', 105, 15, '方片Ａ'],
    [1, 23, 41 + 9000 + 600000, 4, '白梅花', 315, 15, '梅花Ａ'],
    [2, 21, 44 + 9000 + 300000, 2, '银黑桃', 550, 14, '黑桃Ａ'],
    [3, 20, 50 + 10000 + 400000, 8, '金红桃', 700, 15, '红桃Ａ'],
  ];
  for (const [
    gate,
    preset,
    weapon,
    bit,
    knight_name,
    level,
    ammo,
    card,
  ] of cases) {
    const fixture = stage_zero_world();
    fixture.reset_inputs(gate, 0); // 门 → 列表第 0 号（阿尔）
    const mod = fixture.load_module('invasion/invasion-arcana-fort');
    const r = await mod.arcana_fort(knob());
    assert.equal(r, 1, `门 ${gate} 打了一仗 → RETURN 1`);

    // 骑士生成与俘虏（仍在册）
    assert(
      fixture.era.getAddedCharacters().includes(preset),
      `${knight_name} 被俘虏入册`,
    );
    assert.equal(fixture.store.get(`cflag:${preset}:550`), weapon, '武器编码');
    assert.equal(
      fixture.store.get(`cstr:${preset}:1`),
      knight_name,
      'CSTR:1 = 名前',
    );
    assert.equal(
      fixture.store.get(`cflag:${preset}:571`),
      ammo,
      '战斗补弹 15 起算（arcana_battle :19-22），骑士只在自己那一击消耗',
    );

    // 门特化数值
    if (gate === 1) {
      assert.equal(fixture.store.get(`abl:${preset}:31`), 1, '白梅花 自慰中毒');
      assert.equal(
        fixture.store.get(`exp:${preset}:10`),
        30,
        '白梅花 自慰经验',
      );
    }
    if (gate === 2) {
      assert.equal(
        fixture.store.get(`exp:${preset}:10`),
        10,
        '银黑桃 自慰经验',
      );
    }
    if (gate === 3) {
      assert.equal(fixture.store.get(`exp:${preset}:0`), 20, '金红桃 私处经验');
      assert.equal(
        fixture.store.get(`exp:${preset}:5`),
        20,
        '狂王=男（FLAG:500=0）→ 性交经验 = 私处经验',
      );
      assert.equal(
        fixture.store.get(`cflag:${preset}:15`),
        105,
        '初体验对象=狂王',
      );
    }

    // FLAG:92 置位与赏金（1000×等级；四门等级各不同）
    assert.equal(fixture.store.get('flag:92'), bit, `门 ${gate} 置位 ${bit}`);
    assert.equal(
      fixture.store.get('flag:10004'),
      1000 * level,
      'MONEY += 1000×等级',
    );
    assert.equal(
      fixture.store.get('exflag:4444'),
      1000 * level,
      'EX_FLAG:4444 镜像',
    );

    // 胜利叙述（:493 的 PRINT 而且 与 :496 的 PRINTW 牌是同一条显示行）
    const texts = fixture.text_lines();
    assert(texts.includes(`圣灵骑士${knight_name}战败了…`));
    assert(texts.includes(`获得了${1000 * level}G！`));
    assert(
      texts.includes(`而且获得了${knight_name}持有的【${card}】牌。`),
      '「而且」与牌名必须同一条显示行',
    );
    assert(
      texts.includes(`然后，被俘虏了的${knight_name}被带到你的地下城了………`),
    );
  }
});

test('FLAG:60 的追加强化：逐级 ST_UP（2 级）后再算赏金', async () => {
  const fixture = stage_zero_world();
  fixture.reset_inputs(0, 0); // 东门 → 阿尔
  fixture.store.set('flag:60', 2); // :470-475 REPEAT FLAG:60
  const mod = fixture.load_module('invasion/invasion-arcana-fort');
  await mod.arcana_fort(knob());
  assert.equal(fixture.store.get('cflag:22:9'), 107, '黑方片 105 → 107 级');
  assert.equal(
    fixture.store.get('flag:10004'),
    107000,
    '赏金按升级后的等级算（:490 在 ST_UP 段之后）',
  );
});

test('金红桃：FLAG:500 决定精液经验档——男/扶她写、女不写', async () => {
  const cases = [
    [0, 20, '狂王 = 男'],
    [2, 20, '狂王 = 扶她'],
    [1, undefined, '狂王 = 女'],
  ];
  for (const [king, expected, label] of cases) {
    const fixture = stage_zero_world();
    fixture.reset_inputs(3, 0); // 北门 → 阿尔
    fixture.store.set('flag:500', king);
    const mod = fixture.load_module('invasion/invasion-arcana-fort');
    await mod.arcana_fort(knob());
    assert.equal(fixture.store.get('exp:20:0'), 20, `${label}：私处经验恒写`);
    assert.equal(
      fixture.store.get(`exp:20:5`),
      expected,
      `${label}：性交经验（EXP:5 = EXP:0 的档）`,
    );
  }
});

// —— 胜利叙述分支 ——

test('胜利叙述分支：曾经的同伴（TALENT:167）与全裸（CFLAG:40 == 0）', async () => {
  // 同伴分支 + 全裸行
  const fixture = stage_zero_world();
  fixture.reset_inputs(0, 0);
  fixture.store.set('talent:1:167', 1);
  const mod = fixture.load_module('invasion/invasion-arcana-fort');
  await mod.arcana_fort(knob());
  const texts = fixture.text_lines();
  assert(
    texts.includes('黑方片看着曾经是同伴的阿尔，皱起了眉头。'),
    '同伴分支',
  );
  assert(
    texts.includes('「竟然派你全裸来战斗……魔王这混蛋，绝对不可原谅！！」'),
    '全裸行（CFLAG:40 缺省 0）',
  );

  // 普通分支 + 有衣着（CFLAG:40 = 1）→ 无全裸行
  const fixture2 = stage_zero_world();
  fixture2.reset_inputs(0, 0);
  fixture2.store.set('cflag:1:40', 1);
  const mod2 = fixture2.load_module('invasion/invasion-arcana-fort');
  await mod2.arcana_fort(knob());
  const texts2 = fixture2.text_lines();
  assert(
    texts2.includes(
      '「等着我来解放你。唉……可悲的人啊，放弃了勇者光明的未来去做魔王的爪牙，真是何苦！」',
    ),
    '普通分支',
  );
  assert(!texts2.some((l) => l.includes('全裸')), 'CFLAG:40 = 1 → 无全裸行');
});

test('体型回写（GETBIT(FLAG:5,12)）：451-457 = CHAR_SIZE_GENERATE 返回值', async () => {
  const fixture = stage_zero_world();
  fixture.reset_inputs(3, 0); // 北门（年龄 18）
  fixture.store.set('flag:5', 4096); // 位 12
  const mod = fixture.load_module('invasion/invasion-arcana-fort');
  await mod.arcana_fort(knob());

  // knob 无状态：同一 knob 离线复算金红桃 18 岁的体型
  const expect_fixture = create_era_fixture();
  expect_fixture.seed_chara(9, { id: 9, name: '样', callname: '样' });
  expect_fixture.era.addCharacter(9);
  const body = expect_fixture.load_module('chara/chara-body');
  const size = body.char_size_generate(9, 18, 0, knob());
  assert.equal(fixture.store.get('cflag:20:451'), size[0], '年龄');
  assert.equal(fixture.store.get('cflag:20:452'), size[1], '种族年龄');
  assert.equal(fixture.store.get('cflag:20:453'), size[2], '身高');
  assert.equal(fixture.store.get('cflag:20:454'), size[3], '体重');
  assert.equal(fixture.store.get('cflag:20:455'), size[4], '胸围');
  assert.equal(fixture.store.get('cflag:20:456'), size[5], '腰围');
  assert.equal(fixture.store.get('cflag:20:457'), size[6], '臀围');

  // 对照世界：位 12/15 都不开 → CHAR_BODY_GENERATE_WAPPED 整体早退
  // （chara-body.js:18-19 的闸门），战后回写也不进（:523）——451-457
  // 七个下标一个都不落
  const fixture2 = stage_zero_world();
  fixture2.reset_inputs(3, 0);
  const mod2 = fixture2.load_module('invasion/invasion-arcana-fort');
  assert.equal(await mod2.arcana_fort(knob()), 1);
  for (const flag of [451, 452, 453, 454, 455, 456, 457]) {
    assert.equal(
      fixture2.store.get(`cflag:20:${flag}`),
      undefined,
      `位 12/15 都不开 → CFLAG:${flag} 不写`,
    );
  }
});

test('败北：骑士被移除（PARTY_CHAR_DEL + DELCHARA + NAME_RESET），FLAG:92 不动', async () => {
  const fixture = stage_zero_world({ win: false });
  fixture.reset_inputs(0, 0);
  const mod = fixture.load_module('invasion/invasion-arcana-fort');
  const r = await mod.arcana_fort(knob());
  assert.equal(r, 1, '败北同样耗回合 → RETURN 1');
  assert.equal(fixture.store.get('flag:92') ?? 0, 0, '未置位');
  assert(!fixture.era.getAddedCharacters().includes(22), '黑方片被移除');
  // 行表键（主段＝被删者）在夹具平表下残留可读，引擎侧随 DELCHARA 整行
  // 消失；游戏代码只沿 getAddedCharacters 迭代，读不到它们——判定看名册
  // （test/helpers/era-fixture.js 的 removeCharacter 段）。
  assert.equal(fixture.store.get('cflag:1:1'), 0, '阿尔战败状态 0');
});

test('败北狂王线（FLAG:5 位 7）：状态 9，上一次调教对象/助手清槽', async () => {
  const fixture = stage_zero_world({ win: false });
  fixture.reset_inputs(0, 0);
  fixture.store.set('flag:5', 128);
  const game_facade = fixture.load_module('facade/game');
  game_facade.game.event.上次调教对象 = 1; // 正是阿尔
  game_facade.game.event.上次助手 = 0; // 魔王，不应被动
  const mod = fixture.load_module('invasion/invasion-arcana-fort');
  await mod.arcana_fort(knob());
  assert.equal(fixture.store.get('cflag:1:1'), 9, '狂王线败北 → 状态 9');
  assert.equal(game_facade.game.event.上次调教对象, -1, 'FLAG:1 清槽');
  assert.equal(game_facade.game.event.上次助手, 0, 'FLAG:2 不是本人则不动');
});

test('候选过滤：非妊娠模式（FLAG:5 位 10 关）把妊娠者挡在列表外', async () => {
  // 原作 :234（非妊娠版判据）比妊娠版多一条 TALENT:153 == 0。两位候选
  // 里贝丝带妊娠 → 本轮只打出一个按钮（阿尔 0 号），索引 1 根本不在引擎
  // 的白名单里。
  //
  // 原作 :308-309 的越界 GOTO INPUT_LOOP1（「翻到妊娠允许再重画」的复制
  // 粘贴事故）因此是引擎死路径：引擎渲染层先拒收，游戏代码拿不到 1，
  // 翻转分支不可达。按 page-invasion.test.js:177 的裁定，1:1 保留原作
  // 形态、测试钉「被拦」的引擎等价物（拒收且画面不重绘）。
  const fixture = setup_fort_world();
  add_pregnant_bess(fixture);
  fixture.reset_inputs(0, 1);
  const mod = fixture.load_module('invasion/invasion-arcana-fort');
  await assert.rejects(
    () => mod.arcana_fort(knob()),
    /输入不合法！请输入以下值之一：0, 1000, 999, 1001/,
  );
  assert.deepEqual(
    fixture.inputs_consumed
      .filter((e) => e.api === 'input')
      .map((e) => e.value),
    [0],
    '只有门选择被送达',
  );
  assert.equal(fixture.store.get('flag:92') ?? 0, 0, '没打起来');
  assert(
    !fixture.era.getAddedCharacters().includes(22),
    '没生成骑士（画面停在列表，未重绘也未翻转）',
  );
});

test('妊娠出撃可（FLAG:5 位 10）：妊娠者直接可选，无需翻转', async () => {
  const fixture = setup_fort_world({ win: false });
  add_pregnant_bess(fixture);
  fixture.store.set('flag:5', 1024); // 位 10
  fixture.reset_inputs(0, 1); // 直接选 1 = 贝丝
  const mod = fixture.load_module('invasion/invasion-arcana-fort');
  const r = await mod.arcana_fort(knob());
  assert.equal(r, 1);
  assert.equal(fixture.store.get('cflag:2:1'), 0, '贝丝出战战败（状态 0）');
  assert.equal(fixture.store.get('cflag:1:1'), 0, '阿尔未出战');
});
