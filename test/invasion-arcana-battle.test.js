/**
 * ere/invasion/invasion-arcana-battle.js 的行为测试（issue #470，Q13
 * 侵略残余·3）。
 *
 * 源: target/ERB/侵略/ARCANA_BATTLE.ERB 的 @ARCANA_BATTLE / @SPEED_PLUS3 /
 * @DEATH_CHECK4。攻击本体 @DUEL_ATTACK 是 dungeon-battle2 已落地的真身
 * （arg3 = 3 奴隶→圣灵 / 2 圣灵→奴隶），本票只驱动、不重写。
 *
 * 缝 = test/helpers/era-fixture.js。随机源按上界注入（knob），duel_attack
 * 链内每个消费点都已核算：
 *   rand(2) → 1：magic(0,·) 的三段（MAGIC_SELECT / SHAMAN_SELECT / 末段）
 *     对 TARGET_TYPE 0 全部未命中，状态零变化；
 *   rand(3) → 0：slave_monster_skill 直接返回 0；
 *   rand(6) → 1：双方同值 → X == Y 平局（:73 的 IF X >= Y → 奴隶先攻）；
 *   rand(100) → 99：不失手、不连击（40 号剑失手率/连击率 0）；
 *   rand(20)/rand(30)：回合损耗 / 超时损耗，按用例覆盖。
 * 攻击数值的期望按 duel_attack → attack_chara_extra_dmg_battle2 →
 * attack_chara_extra_dmg → defence_chara_extra_dmg 四层逐步核算（武器
 * 40 号剑：伤害强化/气力伤害/防御伤害 100，弹药消耗/失手率/连击率/特殊
 * 0——ere/data/equip-database.js:80；等级 9 < 100，技能段不掷 rand）。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/**
 * 最小世界：魔王 0 + 元勇者 1（阿尔，ATKER）+ 圣灵骑士 2（贝丝，DEFER）。
 * 元勇者攻 100 / 防 50，骑士攻 10 / 防 5——一轮交火后骑士进投降档。
 */
function setup_arcana_world() {
  const fixture = create_era_fixture();
  for (const [cid, name] of [
    [0, '魔王'],
    [1, '阿尔'],
    [2, '贝丝'],
  ]) {
    fixture.seed_chara(cid, { id: cid, name, callname: name });
    fixture.era.addCharacter(cid);
    fixture.store.set(`base:${cid}:0`, 1000);
    fixture.store.set(`base:${cid}:1`, 1000);
    fixture.store.set(`maxbase:${cid}:0`, 1000);
    fixture.store.set(`maxbase:${cid}:1`, 1000);
    fixture.store.set(`cflag:${cid}:9`, 9); // 等级 9（< 100，SKILL_EXTRA 不掷）
  }
  fixture.store.set('cflag:1:1', 0); // 元勇者待命
  fixture.store.set('cflag:1:11', 100);
  fixture.store.set('cflag:1:12', 50);
  fixture.store.set('cflag:2:1', 2); // 圣灵骑士在任
  fixture.store.set('cflag:2:11', 10);
  fixture.store.set('cflag:2:12', 5);
  // 骑士 HP 400：先手一刀 224 → 176（≤300 投降档），不致死
  fixture.store.set('base:2:0', 400);
  return fixture;
}

/** 按上界取值的确定性随机源（缺省见文件头核算） */
function knob(overrides = {}) {
  const table = { 2: 1, 3: 0, 6: 1, 100: 99, ...overrides };
  return (n) => {
    const value = table[n] ?? 0;
    assert(value >= 0 && value < n, `随机值 ${value} 不在 RAND:${n} 范围内`);
    return value;
  };
}

// —— @DEATH_CHECK4（:531-584）——

test('DEATH_CHECK4：圣灵侧三档退场 → RETURN 2 且状态 0（PRINTFORML 无等待）', async () => {
  const cases = [
    ['base:2:0', 0, '徒劳地奋战着，力竭了。'],
    ['base:2:0', 200, '感觉到生命垂危，投降求饶了。'],
    ['base:2:1', 0, '失去了战意，丢掉武器投降了。'],
  ];
  for (const [key, value, text] of cases) {
    const fixture = setup_arcana_world();
    fixture.store.set(key, value);
    const mod = fixture.load_module('invasion/invasion-arcana-battle');
    const dc = await mod.death_check4(1, 2);
    assert.equal(dc, 2, `${key}=${value} → RETURN 2`);
    assert.equal(fixture.store.get('cflag:2:1'), 0, '圣灵退场状态 0');
    assert(
      fixture.text_lines().some((l) => l === `贝丝${text}`),
      `叙述「贝丝${text}」`,
    );
  }
});

test('DEATH_CHECK4：元勇者通常线三档 → RETURN 1 且状态 0（HP≤0 档无第二行）', async () => {
  const fixture = setup_arcana_world();
  fixture.store.set('base:1:0', 0);
  const mod = fixture.load_module('invasion/invasion-arcana-battle');
  assert.equal(await mod.death_check4(1, 2), 1);
  assert.equal(fixture.store.get('cflag:1:1'), 0, '通常线状态 0');
  const texts = fixture.text_lines();
  assert(texts.includes('阿尔在圣灵骑士前力竭倒下了。'), 'HP≤0 档仅一行');
  assert(!texts.some((l) => l.includes('怜悯')), 'HP≤0 档无怜悯第二行');

  const fixture2 = setup_arcana_world();
  fixture2.store.set('base:1:0', 300);
  const mod2 = fixture2.load_module('invasion/invasion-arcana-battle');
  assert.equal(await mod2.death_check4(1, 2), 1);
  assert(
    fixture2.text_lines().includes('贝丝怜悯着倒下的她，把她赶到了堡垒外。'),
  );
});

test('DEATH_CHECK4：狂王线（FLAG:5 位 7）状态 9「带回城堡」；无 TALENT:280 气力≤1000 档', async () => {
  const fixture = setup_arcana_world();
  fixture.store.set('flag:5', 128);
  fixture.store.set('base:1:0', 0);
  const mod = fixture.load_module('invasion/invasion-arcana-battle');
  assert.equal(await mod.death_check4(1, 2), 1);
  assert.equal(fixture.store.get('cflag:1:1'), 9, '狂王线状态 9');
  assert(
    fixture.text_lines().includes('贝丝把她抱起来并带回了狂王的城堡。'),
    'HP≤0 档「抱起来」',
  );

  const fixture2 = setup_arcana_world();
  fixture2.store.set('flag:5', 128);
  fixture2.store.set('base:1:1', 0);
  const mod2 = fixture2.load_module('invasion/invasion-arcana-battle');
  assert.equal(await mod2.death_check4(1, 2), 1);
  assert(
    fixture2.text_lines().includes('贝丝把她绑起来并带回了狂王的城堡。'),
    '气力档「绑起来」',
  );

  // DEATH_CHECK2 的 TALENT:280 气力≤1000 提前档在 DEATH_CHECK4 不存在：
  // 狂王线 + 素质 280 + 气力 500 → 仍返回 0（继续战斗）
  const fixture3 = setup_arcana_world();
  fixture3.store.set('flag:5', 128);
  fixture3.store.set('talent:1:280', 1);
  fixture3.store.set('base:1:1', 500);
  const mod3 = fixture3.load_module('invasion/invasion-arcana-battle');
  assert.equal(await mod3.death_check4(1, 2), 0, '无提前丧失战意档');
});

test('DEATH_CHECK4：双方健在 → 0', async () => {
  const fixture = setup_arcana_world();
  const mod = fixture.load_module('invasion/invasion-arcana-battle');
  assert.equal(await mod.death_check4(1, 2), 0);
  assert.equal(fixture.text_lines().length, 0, '健在时不输出');
});

// —— @ARCANA_BATTLE 主循环（:2-121）——

test('ARCANA_BATTLE：一回合击破——四层伤害核算、弹药 15、经验与武器恢复', async () => {
  const fixture = setup_arcana_world();
  const mod = fixture.load_module('invasion/invasion-arcana-battle');
  const result = await mod.arcana_battle(1, 2, knob());
  assert.equal(result, 2, '骑士投降 → RETURN 2');

  // 奴隶先手（arg1=0，先手 +20%）：BATTLE2 层 dmg=(100-5)*2=190、气力
  // -190；先手加成 +38 → 228；防御层扣骑士防 4 → 224（骑士防 5-1 防御
  // 伤害后为 4，再降为 2）
  assert.equal(
    fixture.store.get('base:2:0'),
    400 - 224,
    '骑士 HP 176（≤300 投降）',
  );
  assert.equal(
    fixture.store.get('base:2:1'),
    1000 - 190,
    '骑士气力 -190（MDMG）',
  );
  assert.equal(
    fixture.store.get('base:1:0'),
    1000,
    '元勇者 HP 不变（骑士被挡）',
  );
  assert.equal(
    fixture.store.get('base:1:1'),
    1000 - 14,
    '元勇者气力 -14（骑士 MDMG）',
  );
  assert.equal(fixture.store.get('exp:1:80'), 9, '击中加经验（CFLAG:2:9）');
  assert.equal(fixture.store.get('cflag:2:1'), 0, '骑士状态 0（投降）');

  // 弹药补充 15（:21-22，BATTLE2 是 7——各文件字面量不同）；40 号剑弹药
  // 消耗 0，战后仍是 15
  assert.equal(fixture.store.get('cflag:1:571'), 15, '元勇者弹药 15');
  assert.equal(fixture.store.get('cflag:2:571'), 15, '骑士弹药 15');

  // WEAPON_RESTORE 双方执行：从 CFLAG:13/14（=0）重算攻防 → 归零
  assert.equal(fixture.store.get('cflag:1:11'), 0, '元勇者攻防重算（恢复）');
  assert.equal(fixture.store.get('cflag:2:11'), 0, '骑士攻防重算（恢复）');

  const texts = fixture.text_lines();
  assert(texts.includes('贝丝感觉到生命垂危，投降求饶了。'), '投降叙述');
  assert(
    !texts.some((l) => l.includes('被圣灵骑士击败了')),
    '骑士退场时不打元勇者败北叙述',
  );
});

test('ARCANA_BATTLE：显示开（FLAG:5 位 5）——开场、参数、VS 与攻击顺序（平局奴隶先攻）', async () => {
  const fixture = setup_arcana_world();
  fixture.store.set('flag:5', 32);
  const mod = fixture.load_module('invasion/invasion-arcana-battle');
  const result = await mod.arcana_battle(1, 2, knob());

  const texts = fixture.text_lines();
  assert.equal(texts[0], '* 一对一单挑！*', '开场单挑演出');
  assert.equal(result, 2, '结果不受显示开关影响');
  // 参数显示段（BARL 无通道跳过，见实现注释）
  for (const expected of [
    '阿尔',
    'HP',
    '气力',
    '攻击100 防御50',
    'VS',
    '贝丝',
    '攻击10 防御5',
  ]) {
    assert(texts.includes(expected), `参数段「${expected}」`);
  }
  // X == Y 平局 → 奴隶先攻：奴隶的攻击行在骑士之前
  const slave_atk = texts.indexOf('奴隶阿尔使用剑攻击！！');
  const knight_atk = texts.indexOf('圣灵骑士·贝丝使用剑攻击！！');
  assert(
    slave_atk > 0 && knight_atk > slave_atk,
    '平局归奴隶先攻（:73 X >= Y）',
  );
  assert(texts.includes('奴隶阿尔的攻击令贝丝受到224点伤害！'), '先手伤害 224');
  assert(
    texts.includes('阿尔拼命忍受着圣灵骑士·贝丝的攻击………'),
    '骑士攻击被防住（dmg ≤ 0）',
  );
});

test('ARCANA_BATTLE：X < Y 圣灵先攻——后手无 +20%，伤害 186 ≠ 224', async () => {
  const fixture = setup_arcana_world();
  fixture.store.set('flag:5', 32);
  // 首个 rand(6) 给 X → 0，其后给 Y → 3：圣灵先攻；后续回合双方同 3 平局
  let six_calls = 0;
  const base = knob();
  const rand = (n) => {
    if (n === 6) {
      six_calls += 1;
      return six_calls === 1 ? 0 : 3;
    }
    return base(n);
  };
  const mod = fixture.load_module('invasion/invasion-arcana-battle');
  const result = await mod.arcana_battle(1, 2, rand);

  const texts = fixture.text_lines();
  const slave_atk = texts.indexOf('奴隶阿尔使用剑攻击！！');
  const knight_atk = texts.indexOf('圣灵骑士·贝丝使用剑攻击！！');
  assert(knight_atk > 0 && slave_atk > knight_atk, 'X < Y 圣灵先攻');
  assert.equal(result, 2, '仍在一回合内分胜负');
  // 元勇者作为后手（arg1=1）无 +20%：dmg 190 → 防御层扣 4 → 186
  assert.equal(fixture.store.get('base:2:0'), 400 - 186, '后手伤害 186');
  assert.equal(fixture.store.get('base:1:0'), 1000, '元勇者 HP 不变');
});

test('ARCANA_BATTLE：超时（TURN > 15）撤退——败北叙述、回合损耗与超时损耗', async () => {
  const fixture = setup_arcana_world();
  // 双方攻 0：伤害恒 0（(0-防)*2 与 MDMG 0），只能打到超时
  fixture.store.set('cflag:1:11', 0);
  fixture.store.set('cflag:2:11', 0);
  const mod = fixture.load_module('invasion/invasion-arcana-battle');
  const result = await mod.arcana_battle(1, 2, knob({ 20: 3, 30: 7 }));

  assert.equal(result, 0, '超时未分胜负 → RETURN 0');
  assert.equal(fixture.store.get('cflag:1:1'), 0, '元勇者状态不变');
  assert.equal(fixture.store.get('cflag:2:1'), 2, '骑士仍在任');
  // 回合 0-15 各损耗 rand(20)=3；回合 16 超时元勇者另损 rand(30)=7
  assert.equal(fixture.store.get('base:1:1'), 1000 - 16 * 3 - 7, '元勇者气力');
  assert.equal(
    fixture.store.get('base:2:1'),
    1000 - 16 * 3,
    '骑士气力（无超时损耗）',
  );
  assert.equal(fixture.store.get('base:1:0'), 1000, 'HP 无损');
  assert.equal(fixture.store.get('base:2:0'), 400, 'HP 无损');
  assert(
    fixture.text_lines().includes('阿尔被圣灵骑士击败了………'),
    '骑士在任时的败北叙述（无显示开关守卫）',
  );
});

test('ARCANA_BATTLE：先制（元勇者 TALENT:252）×2 先制打击——力竭而非投降', async () => {
  const fixture = setup_arcana_world();
  fixture.store.set('talent:1:252', 1);
  const mod = fixture.load_module('invasion/invasion-arcana-battle');
  const result = await mod.arcana_battle(1, 2, knob());

  assert.equal(result, 2, '仍胜');
  // 先制（arg1=2）：190 ×2 = 380 → 防御层扣 4 → 376；骑士 HP 400-376=24
  // 回合 0 再补一刀 233 → -209（力竭档，非投降档）
  assert.equal(fixture.store.get('base:2:0'), 400 - 376 - 233, '两次打击累计');
  assert.equal(fixture.store.get('base:1:0'), 1000, '元勇者 HP 不变');
  assert.equal(fixture.store.get('base:1:1'), 1000 - 6, '骑士反击 MDMG');
  assert.equal(fixture.store.get('exp:1:80'), 18, '两次击中各 +9');
  assert(
    fixture.text_lines().includes('贝丝徒劳地奋战着，力竭了。'),
    'HP≤0 档（先制 ×2 才够得到）',
  );
});

test('ARCANA_BATTLE：先制圣灵（骑士 TALENT:252）arg3=2 落账', async () => {
  const fixture = setup_arcana_world();
  fixture.store.set('talent:2:252', 1);
  const mod = fixture.load_module('invasion/invasion-arcana-battle');
  const result = await mod.arcana_battle(1, 2, knob());

  assert.equal(result, 2, '元勇者仍胜');
  // 骑士先制：20 ×2 = 40 → 防御层扣 34 → 6；元勇者 HP 1000-6（此伤害
  // 只能来自先制段——回合内骑士打不穿元勇者防御）
  assert.equal(
    fixture.store.get('base:1:0'),
    1000 - 6,
    '元勇者 HP -6（先制圣灵）',
  );
  assert.equal(
    fixture.store.get('base:2:0'),
    400 - 221,
    '骑士 HP 179（投降档）',
  );
  assert.equal(fixture.store.get('exp:2:80'), 9, '骑士击中加经验');
});

test('ARCANA_BATTLE：999 的 BREAK 嵌在显示守卫内——显示关时不中断，打满 16 回合', async () => {
  const fixture = setup_arcana_world();
  const mod = fixture.load_module('invasion/invasion-arcana-battle');
  const battle2 = fixture.load_module('dungeon/dungeon-battle2');
  const calls = [];
  battle2.duel_attack = async (...args) => {
    calls.push(args.slice(0, 4));
    return 999;
  };

  const result = await mod.arcana_battle(1, 2, knob());

  // 回合 0-15 各一次（999 → 后手不打、不中断），回合 16 超时退出
  assert.equal(calls.length, 16, '显示关时 999 不退出循环');
  assert.deepEqual(
    calls[0],
    [1, 0, 2, 3],
    '平局奴隶先攻且 arg3 = 3（奴隶→圣灵）',
  );
  assert.equal(result, 0, '无人退场 → RETURN 0');
  assert.equal(fixture.store.get('base:1:1'), 1000, '攻击全被替换，气力无损');
  const texts = fixture.text_lines();
  assert(!texts.includes('战斗中断了'), '显示关不打中断行');
  assert(texts.includes('阿尔被圣灵骑士击败了………'), '超时败北叙述仍打印');
});

test('ARCANA_BATTLE：999 + 显示开 → 打印「战斗中断了」并退出', async () => {
  const fixture = setup_arcana_world();
  fixture.store.set('flag:5', 32);
  const mod = fixture.load_module('invasion/invasion-arcana-battle');
  const battle2 = fixture.load_module('dungeon/dungeon-battle2');
  const calls = [];
  battle2.duel_attack = async (...args) => {
    calls.push(args.slice(0, 4));
    return 999;
  };

  const result = await mod.arcana_battle(1, 2, knob());

  assert.equal(calls.length, 1, '回合 0 即中断');
  assert.equal(result, 0, 'RETURN 0');
  const texts = fixture.text_lines();
  assert(texts.includes('战斗中断了'), '中断行（守卫内 PRINTL）');
  assert(texts.includes('阿尔被圣灵骑士击败了………'), '骑士在任 → 败北叙述');
});
