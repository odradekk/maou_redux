/**
 * ere/dungeon/dungeon-battle.js / dungeon-battle2.js / monster-data.js /
 * data/monster-database.js 的行为测试（issue #175，阶段 3 H6）。
 *
 * 缝 = test/helpers/era-fixture.js。随机源经 rand 参数注入（run_dungeon
 * 先例）；对比测试的「存根态世界」以 Math.random 替换驱动（e2e 的
 * mulberry32 先例——run_dungeon 不带 rand 时战斗与 WALK 同走缺省源）。
 *
 * 验收对应（#175 清单）：
 *   - 「勇者会因战斗掉体力并可能撤退——同一种子下层数与 H3 存根态不同」
 *     的对比测试（核心，此行为必须有测试）；
 *   - @DEATH_CHECK / @DEATH_CHECK2 的战败分支各有测试；
 *   - @DUNGEON_SPY 的 CFLAG:1 == 3 迎击入口（dungeon-main.test.js 已有一
 *     条真身行为用例，此处补 SPY_BATTLE 三分支的数值与背叛臂）；
 *   - monster-database 与 ERB 源逐条比对（SOP §5 判据 7：机械转写的验收
 *     证据是逐条等价，equip-database.test.js 先例）；
 *   - MONSTER_ATTACK 的 off-by-one（原作缺陷形态，#14 登记）有行为钉——
 *     「修好」它的变异必须红（#116 M214/M218 先例）。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

const REPO_ROOT = path.resolve(__dirname, '..');

/** mulberry32：种子化 PRNG（e2e 同款） */
function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function load(fixture, name) {
  return fixture.load_module(name);
}

/** 最小世界：魔王 0 + 勇者 1（阿尔）+ 怪物库存 */
function setup_world() {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(1, { id: 1, name: '阿尔', callname: '阿尔' });
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(1);
  for (const cid of [0, 1]) {
    fixture.store.set(`maxbase:${cid}:0`, 2000);
    fixture.store.set(`maxbase:${cid}:1`, 1000);
    fixture.store.set(`base:${cid}:0`, 2000);
    fixture.store.set(`base:${cid}:1`, 1000);
  }
  // 勇者 1：侵攻中（CFLAG:1 = 2）、第 1 层、有攻防（战斗有杀伤）
  fixture.store.set('cflag:1:1', 2);
  fixture.store.set('cflag:1:11', 50);
  fixture.store.set('cflag:1:12', 30);
  fixture.store.set('cflag:1:501', 1);
  // 怪物名与库存（Item.yml 等价预置；狗头人 5 只在库）
  fixture.store.set('itemname:100', '狗头人');
  fixture.store.set('itemname:190', '骷髅兵');
  fixture.store.set('item:100', 5);
  return fixture;
}

/** 同构的两人世界：奴隶 a（迎击 3）+ 勇者 b（侵攻 2）同层 */
function setup_duel_world() {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(1, { id: 1, name: '贝丝', callname: '贝丝' });
  fixture.seed_chara(2, { id: 2, name: '勇者甲', callname: '勇者甲' });
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(1);
  fixture.era.addCharacter(2);
  for (const cid of [0, 1, 2]) {
    fixture.store.set(`maxbase:${cid}:0`, 2000);
    fixture.store.set(`maxbase:${cid}:1`, 1000);
    fixture.store.set(`base:${cid}:0`, 2000);
    fixture.store.set(`base:${cid}:1`, 1000);
  }
  fixture.store.set('cflag:1:1', 3); // 奴隶 1 迎击中
  fixture.store.set('cflag:1:11', 60);
  fixture.store.set('cflag:1:12', 20);
  fixture.store.set('cflag:1:501', 1);
  fixture.store.set('cflag:1:533', 1);
  fixture.store.set('cflag:2:1', 2); // 勇者 2 侵攻中
  fixture.store.set('cflag:2:11', 10);
  fixture.store.set('cflag:2:12', 5);
  fixture.store.set('cflag:2:501', 1);
  fixture.store.set('itemname:100', '狗头人');
  return fixture;
}

// —— 存根清单核对（enter-enemy.test.js 同款）——

test('存根清单可检索：docs/stub-registry.md 收录战斗两文件与 monster-data 的全部存根化调用', () => {
  const fixture = create_era_fixture();
  const registry = fs.readFileSync(
    path.resolve(__dirname, '..', 'docs', 'stub-registry.md'),
    'utf8',
  );
  const names = [
    ...load(fixture, 'dungeon/dungeon-battle').STUBBED_CALLS,
    ...load(fixture, 'dungeon/dungeon-battle2').STUBBED_CALLS,
    ...load(fixture, 'dungeon/monster-data').STUBBED_CALLS,
    ...load(fixture, 'kojo/kojo-dungeon-ravish').STUBBED_CALLS,
  ];
  // #217 起 SELECT_BENKI_MENU/NAME_BENKI_MENU/GET_EXP_BENKI_MENU 换真身
  // （system/train/benki.js），战斗三份名单减 3 条
  // #231 K0 口上：ATTACK_KOUJO/VICTORY_KOUJO/GOBI_KOUJO 换真身（口上票），名单减 3
  assert.ok(names.length >= 11, `四份名单合计 ${names.length} 条（应 ≥ 11）`);
  for (const name of names) {
    assert(registry.includes(name), `存根清单缺少 ${name}`);
  }
});

// —— monster-database 与 ERB 源逐条比对（SOP §5 判据 7）——

/** 从 MONSTER_DATA.ERB / ENEMY_DATA.ERB 解析各怪物函数的 E 赋值 */
function parse_erb_monsters() {
  const files = [
    path.join(REPO_ROOT, 'target/ERB/怪物相關/MONSTER_DATA.ERB'),
    path.join(REPO_ROOT, 'target/ERB/侵略/ENEMY_DATA.ERB'),
  ];
  const FIELD_OF = {
    0: '番号',
    1: '等级',
    2: '攻击力',
    3: '防御力',
    4: '速度',
    5: '特殊',
    6: '魔法',
    7: '凌辱类型',
    10: '耐性',
  };
  const eval_num = (expr) => {
    if (/^-?\d+$/.test(expr)) {
      return Number(expr);
    }
    if (/^\d+(\s*\+\s*\d+)+$/.test(expr)) {
      return expr.split('+').reduce((sum, p) => sum + Number(p), 0);
    }
    return null;
  };
  const out = new Map();
  for (const file of files) {
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
    let cur = null;
    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      const head = line.match(/^@([A-Z_0-9]+), ARG:0(?:, ARG:1)?\s*$/);
      if (head) {
        if (
          cur &&
          cur.ok &&
          cur.no !== null &&
          Object.keys(cur.fields).length === 9
        ) {
          out.set(cur.no, cur.fields);
        }
        cur = { fields: {}, ok: true, no: null };
        continue;
      }
      if (cur) {
        const m = line.match(/^E:\(ARG:0\+?(\d*)\)\s*=\s*(.+?)\s*$/);
        if (m) {
          const idx = m[1] === '' ? 0 : Number(m[1]);
          const v = eval_num(m[2]);
          if (v === null) {
            cur.ok = false; // 非常量（SKELETON 等）——不在比对面
          } else {
            cur.fields[FIELD_OF[idx]] = v;
            if (idx === 0) {
              cur.no = v;
            }
          }
        }
        if (/^RETURN 0/.test(line) || /^@/.test(line)) {
          if (
            cur.ok &&
            cur.no !== null &&
            Object.keys(cur.fields).length === 9
          ) {
            out.set(cur.no, cur.fields);
          }
          cur = null;
        }
      }
    }
  }
  return out;
}

test('monster-database 与 ERB 源逐条等价（58 常量怪物 + 十字军，逐字段比对）', () => {
  const { MONSTER_DATABASE } = require('../ere/data/monster-database');
  const src = parse_erb_monsters();
  assert.ok(
    src.size >= 58,
    `源解析出 ${src.size} 只（应 ≥ 58，解析器失效会在这里暴露）`,
  );
  for (const [no, fields] of src) {
    assert.deepStrictEqual(
      MONSTER_DATABASE[no],
      fields,
      `识别号 ${no} 的九字段与源不一致`,
    );
  }
  // 反向：表里没有源外的私货（1000 十字军除外——@CRUSADER 用 #DIM TOP
  // 局部变量寻址，解析器不认，单列硬断言：识别号 1000-1009 共用一行，
  // 番号由实参决定）
  for (const no of Object.keys(MONSTER_DATABASE)) {
    if (Number(no) === 1000) {
      assert.deepStrictEqual(MONSTER_DATABASE[1000], {
        番号: 1000,
        等级: 15,
        攻击力: 20,
        防御力: 25,
        速度: 0,
        特殊: 0,
        魔法: 0,
        凌辱类型: 0,
        耐性: 0,
      });
      continue;
    }
    assert.ok(src.has(Number(no)), `表内识别号 ${no} 在源里没有对应函数`);
  }
});

// —— @MONSTER_DATA 分发器 ——

test('MONSTER_DATA：库存怪物照 ITEM 数量生成、等级 +4、攻防 ×2 加等级骰', () => {
  const fixture = setup_world();
  const md = load(fixture, 'dungeon/monster-data');
  const zero = () => 0;
  fixture.store.set('cflag:0:9', 24); // 魔王等级：LV = 24/12 + 2 = 4；24%10=4 > rand(10)=0 → +1 → 5

  md.monster_data(100, 0, 1, -1, -1, zero);
  assert.equal(md.e_get(0), 100, '怪物番号');
  assert.equal(md.e_get(1), 1 + 4, '等级 = 基础 1 + 4');
  assert.equal(md.e_get(99), 5, '数量两骰都读 ITEM:100 = 5');
  assert.equal(md.e_get(8), 0, 'first_count = 5 > 1 → 不 boss 化');
  // 攻防 = 基础 × 2 + LVUP（LVUP = 等级×2 次 rand(5)，zero 全 0 → 0）
  assert.equal(md.e_get(2), 1 * 2, '攻击力 = 基础 1 × 2 + 0');
  assert.equal(md.e_get(3), 2 * 2, '防御力 = 基础 2 × 2 + 0');
});

test('MONSTER_DATA：无库存转骷髅（190）、两骰取小、skeleton 随层走', () => {
  const zero = () => 0;
  const fixture = setup_world();
  const md = load(fixture, 'dungeon/monster-data');
  fixture.store.set('item:100', 0); // 无库存 → 骷髅
  fixture.store.set('cflag:1:501', 3); // 队长的阶层 3（skeleton 用）

  // 掷序（zero 下全 0）：lv 段 rand(10)（0 < 0%10 假，不 +1）→ 第一骰
  // rand(10)+1 = 1 → skeleton rand(9)+1 = 1 → 第二骰 rand(10)+1 = 1 →
  // 等级骰 local×2 次 rand(lv) 全 0
  // arg2 = 1（勇者号 >= 0）→ skeleton 走阶层分支：lv = CFLAG:1:501 = 3
  md.monster_data(100, 0, 1, -1, -1, zero);
  assert.equal(md.e_get(0), 190, '无库存转骷髅');
  assert.equal(md.e_get(99), 1, '两骰各掷 1，取小 1');
  assert.equal(md.e_get(1), 3 + 1 + 4, 'skeleton 等级 = 队长阶层 3 + 1，再 +4');
  assert.equal(md.e_get(8), 0, '骷髅不 boss 化');
  assert.equal(md.e_get(2), (3 + 1) * 2, '攻击 = (阶层+1)×2 + LVUP 0');

  // arg2 = -1 → skeleton 走掷点分支：rand(9)+1（m9 控制 = 9）；两骰各 10 取小
  const fixture2 = setup_world();
  fixture2.store.set('item:100', 0);
  const md2 = load(fixture2, 'dungeon/monster-data');
  const m9 = (n) => (n === 9 ? 8 : n - 1);
  md2.monster_data(100, 0, -1, -1, -1, m9);
  assert.equal(md2.e_get(99), 10, '两骰各掷 10，取小 10');
  assert.equal(
    md2.e_get(1),
    9 + 1 + 4,
    'skeleton 等级 = rand(9)+1 = 9，再 +1 后 +4',
  );
});

test('MONSTER_DATA：LINE 3 的配下怪物（CFLAG:570 < 100 时清列返回）', () => {
  const fixture = setup_world();
  const md = load(fixture, 'dungeon/monster-data');
  const zero = () => 0;

  // 无配下：E:300 清 0 直接返回
  md.monster_data(100, 3, 1, -1, -1, zero);
  assert.equal(md.e_get(300), 0, 'LINE 3 无配下 → E:300 = 0');

  // 有配下：读 CFLAG:570 的怪物号，数量恒 1
  fixture.store.set('cflag:1:570', 152); // 魅魔
  md.monster_data(100, 3, 1, -1, -1, zero);
  assert.equal(md.e_get(300), 152, '配下怪物号 = CFLAG:570');
  assert.equal(md.e_get(399), 1, '配下恒 1 只');
});

// —— E 表（yml/E.yml 的引擎通道）——

test('E 表：夹具与引擎同名通道（era.set 写 e:N 读回；yml/E.yml 声明在库）', () => {
  const fixture = setup_world();
  fixture.era.set('e:99', 7);
  assert.equal(fixture.era.get('e:99'), 7, '写读一致');
  const e_yml = fs.readFileSync(path.join(REPO_ROOT, 'yml/E.yml'), 'utf8');
  assert.match(e_yml, /"第1列怪物数":\n {2}id: 99/, 'yml/E.yml 的布局声明在库');
});

// —— @DEATH_CHECK 战败分支（验收「此行为必须有测试」）——

test('DEATH_CHECK：HP <= 300 投降（CFLAG:1 = 0，RETURN 2）；气力尽同型', async () => {
  const fixture = setup_world();
  const b = load(fixture, 'dungeon/dungeon-battle');
  fixture.store.set('base:1:0', 200); // HP 200 <= 300
  const r = await b.death_check(1);
  assert.equal(r, 2, '生命垂危 → RETURN 2');
  assert.equal(fixture.store.get('cflag:1:1'), 0, '投降（CFLAG:1 = 0）');

  const fixture2 = setup_world();
  const b2 = load(fixture2, 'dungeon/dungeon-battle');
  fixture2.store.set('base:1:1', 0); // 气力 0
  const r2 = await b2.death_check(1);
  assert.equal(r2, 2, '失去战意 → RETURN 2');
  assert.equal(fixture2.store.get('cflag:1:1'), 0, '丢武器投降');
});

test('DEATH_CHECK：怪物全灭 → RETURN 1（胜利）；健在 → 0（继续）', async () => {
  const fixture = setup_world();
  const b = load(fixture, 'dungeon/dungeon-battle');
  const md = load(fixture, 'dungeon/monster-data');
  const zero = () => 0;
  // 全灭：数量槽全 0
  assert.equal(await b.death_check(1), 1, 'E:99/199/299 全 0 → 勇者胜');

  // 健在：放一只
  md.monster_data(100, 0, 1, -1, -1, zero);
  assert.equal(await b.death_check(1), 0, '有存活怪物 → 继续');
});

// —— @DEATH_CHECK2 战败分支 ——

test('DEATH_CHECK2：勇者 HP <= 0 用尽 → RETURN 2 且 CFLAG:1 = 0', () => {
  const fixture = setup_duel_world();
  const b2 = load(fixture, 'dungeon/dungeon-battle2');
  fixture.store.set('base:2:0', 0);
  assert.equal(b2.death_check2(1, 2), 2, '勇者侧退场');
  assert.equal(fixture.store.get('cflag:2:1'), 0, '勇者 CFLAG:1 = 0');
});

test('DEATH_CHECK2：奴隶侧退场 → RETURN 1；狂王线（FLAG:5 位 7）状态 9', () => {
  const fixture = setup_duel_world();
  const b2 = load(fixture, 'dungeon/dungeon-battle2');
  fixture.store.set('base:1:0', 100); // 奴隶 HP <= 300
  assert.equal(b2.death_check2(1, 2), 1, '魔王侧退场 → RETURN 1');
  assert.equal(fixture.store.get('cflag:1:1'), 0, '通常线状态 0');

  const fixture2 = setup_duel_world();
  const b2v2 = load(fixture2, 'dungeon/dungeon-battle2');
  fixture2.store.set('flag:5', 128); // 狂王线
  fixture2.store.set('base:1:0', 100);
  assert.equal(b2v2.death_check2(1, 2), 1, '狂王线同样 RETURN 1');
  assert.equal(
    fixture2.store.get('cflag:1:1'),
    9,
    '狂王线状态 9（成为狂王的东西）',
  );
});

// —— @DUNGEON_SPY / @SPY_BATTLE ——

test('SPY_BATTLE：三分支扣勇者 HP/气力并写 JUEL（谜药分支的欲情珠）', async () => {
  const fixture = setup_duel_world();
  const b2 = load(fixture, 'dungeon/dungeon-battle2');
  fixture.store.set('abl:1:12', 2); // 技巧 2

  // rand(3) === 0 → 谜药：MDMG += 20、JUEL:5 += 10+16
  await b2.spy_battle(1, 2, (n) => (n === 3 ? 0 : 0));
  assert.equal(fixture.store.get('base:2:0'), 2000 - 10, 'HP -10');
  assert.equal(
    fixture.store.get('base:2:1'),
    1000 - 30,
    '气力 -(10 + 技巧×10)',
  );
  assert.equal(fixture.store.get('juel:2:5'), 26, '欲情珠 +10+技巧×8');
});

test('SPY_BATTLE：施虐狂 1.2 倍；KARMA 存根不动善恶值', async () => {
  const fixture = setup_duel_world();
  const b2 = load(fixture, 'dungeon/dungeon-battle2');
  fixture.store.set('talent:1:83', 1); // 施虐狂
  fixture.store.set('abl:1:12', 0);
  fixture.store.set('cflag:2:151', 50);

  await b2.spy_battle(1, 2, () => 2); // rand(3)=2、rand(2)=2 → 下剤分支
  // 下剤：HDMG = 10+0、MDMG = 10+0、KDMG = 2；施虐狂 ×1.2 → 12/12
  assert.equal(fixture.store.get('base:2:0'), 2000 - 12, 'HP -12（1.2 倍）');
  assert.equal(fixture.store.get('base:2:1'), 1000 - 12, '气力 -12');
  assert.equal(fixture.store.get('cflag:2:151'), 50, 'KARMA 存根不动善恶值');
});

test('DUNGEON_SPY：背叛成立时勇者陷落（CFLAG:1 = 0、party_del、赏金）', async () => {
  const fixture = setup_duel_world();
  const b2 = load(fixture, 'dungeon/dungeon-battle2');
  fixture.store.set('flag:10004', 0); // MONEY
  fixture.store.set('exflag:4444', 0);
  // 潜入奴隶 1 在勇者 2 队里（队长记忆与仲間位）
  fixture.store.set('cflag:2:531', 1); // 勇者 2 的仲間A = 奴隶 1
  fixture.store.set('cflag:2:533', 2); // 勇者 2 自己是队长（party_del 的读点）
  fixture.store.set('cflag:1:533', 2); // 奴隶的队长记忆
  fixture.store.set('cflag:1:500', 4); // 潜入工作中
  fixture.store.set('cflag:2:9', 3); // 勇者等级 3 → 赏金 300
  // 背叛率拉满：勇者 HP/气力打到极低（体力项与气力项各趋 100）
  fixture.store.set('base:2:0', 10);
  fixture.store.set('base:2:1', 1);
  fixture.set_inputs(1); // 「要让XX回来吗？」→ [1] 不要

  await b2.dungeon_spy(1, () => 2); // rand(100) = 2 < BETRAY；rand(3) = 2 ≠ 0 不踌躇
  assert.equal(fixture.store.get('cflag:2:1'), 0, '勇者陷落（CFLAG:1 = 0）');
  assert.equal(fixture.store.get('flag:10004'), 300, 'MONEY += 100 × 等级 3');
  assert.equal(fixture.store.get('exflag:4444'), 300, 'EX_FLAG:4444 镜像');
  assert.equal(fixture.store.get('cflag:1:505'), 1, '奴隶讨伐数 +1');
  // party_del(leader) 队长离队 = 解散：队长 2 的队伍数据全套复位
  // （530/531/532/533 清 0），奴隶 1 的 533（队长记忆）同遭复位
  assert.equal(fixture.store.get('cflag:2:530') ?? 0, 0, '队长行动完了复位');
  assert.equal(fixture.store.get('cflag:2:533') ?? 0, 0, '队长记忆复位');
  assert.equal(fixture.store.get('cflag:1:533') ?? 0, 0, '奴隶的队长记忆复位');
});

// —— MONSTER_ATTACK 的 off-by-one 缺陷钉（#14；#116 先例）——

test('MONSTER_ATTACK：数量槽错位读取（原作缺陷形态）——DMG 恒 0、勇者不掉血', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:12', 0); // 防御归零：怪物若真打（-99 形态）必透防
  const b = load(fixture, 'dungeon/dungeon-battle');
  const md = load(fixture, 'dungeon/monster-data');
  const zero = () => 0;
  md.monster_data(100, 0, 1, -1, -1, zero); // 第一列狗头人 ×5

  // 选列循环 BREAK 在数量槽 99，:1052 的换算是 -100（同构三处都 -99）——
  // 错位后 MONNUM 读 E:98（无写者恒 0）。这是原作缺陷（登记 #14），
  // 1:1 保留：怪物侧攻击对勇者恒 0 伤害。「修好」成 -99 的变异必须在此红
  const r = await b.monster_attack(1, 0, zero);
  assert.equal(r, 0, 'RETURN 0（通常）');
  assert.equal(
    fixture.store.get('base:1:0'),
    2000,
    'HP 不动（DMG = 0×等级 = 0）',
  );
  assert.equal(fixture.store.get('base:1:1'), 1000, '气力不动');
});

// —— BATTLE2 主流程的 result/loser 出口 ——

test('DUNGEON_BATTLE2_PARTY：勇者被打退 → result 2 + loser 败者号（B 的显式传参）', async () => {
  const fixture = setup_duel_world();
  const b2 = load(fixture, 'dungeon/dungeon-battle2');
  const one = (n) => (n === 3 ? 1 : 1); // 对象选择 rand(3)=1 不跳过
  const r = await b2.dungeon_battle2_party(1, one);
  assert.equal(r.result, 2, '勇者气力被打空 → 退场');
  assert.equal(r.loser, 2, '败者号 = 勇者 2（原作全局 B 的出口）');
  assert.equal(fixture.store.get('cflag:2:1'), 0, '勇者 CFLAG:1 = 0');
});

test('DUNGEON_BATTLE2_PARTY：找不到对手 → result 0 且无演出推进', async () => {
  const fixture = setup_duel_world();
  const b2 = load(fixture, 'dungeon/dungeon-battle2');
  fixture.store.set('cflag:2:501', 5); // 勇者不同层
  const r = await b2.dungeon_battle2_party(1, () => 2);
  assert.deepEqual(r, { result: 0, loser: 0 }, '对象选择失败');
});

// —— 核心验收：对比测试（同种子下真身态与存根态的层数轨迹不同）——

test('对比：同一种子下，接入战斗后勇者到达的层数与 H3 存根态不同（核心验收）', async () => {
  const SEED = 20250601;
  const ROUNDS = 14; // e2e 实测 28 个半天轮的一半足够分层

  /** 跑一个世界，返回每轮后的层数轨迹与终态气力 */
  async function run_world(stub_battle) {
    const fixture = setup_world();
    const { run_dungeon } = load(fixture, 'dungeon/dungeon');
    if (stub_battle) {
      // H3 存根行为：占位 + return 0（不改任何状态）——替换模块导出即短路
      // （disable_enter_enemy 的先例：调用点经模块对象属性查找）
      const battle = load(fixture, 'dungeon/dungeon-battle');
      battle.dungeon_party_battle = async () => 0;
    }
    fixture.override_math_random(mulberry32(SEED));
    try {
      const floors = [];
      for (let i = 0; i < ROUNDS; i += 1) {
        await run_dungeon(1);
        floors.push(fixture.store.get('cflag:1:501') || 0);
      }
      return {
        floors,
        hp: fixture.store.get('base:1:0') ?? 2000,
        wp: fixture.store.get('base:1:1') ?? 1000,
      };
    } finally {
      fixture.restore_math_random();
    }
  }

  const stub_world = await run_world(true);
  const real_world = await run_world(false);

  // 战斗确实让勇者损耗了（存根态满状态推进）
  assert(
    real_world.wp < stub_world.wp,
    `真身态气力 ${real_world.wp} < 存根态 ${stub_world.wp}（战斗的逃跑段扣气力）`,
  );
  // 同一种子下层数轨迹出现分歧（PRNG 消费序列被战斗掷点推移——WALK 与
  // 战斗共用 Math.random，序列一旦错位，后续踏破/滞留轮次重排）
  const diff_at = stub_world.floors.findIndex(
    (f, i) => f !== real_world.floors[i],
  );
  assert(
    diff_at >= 0,
    `层数轨迹应有分歧（存根 ${stub_world.floors.join(',')} vs 真身 ${real_world.floors.join(',')}）`,
  );
  // 两态都真实推进（不是死循环或原地不动——轨迹非全 1）
  assert(
    stub_world.floors.some((f) => f > 1) ||
      real_world.floors.some((f) => f > 1),
    '至少一态推进过层数（世界构造有效）',
  );
});
