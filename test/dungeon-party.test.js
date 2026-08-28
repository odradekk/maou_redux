/**
 * ere/dungeon/dungeon-party.js @PARTY_UNITE / @PARTY_JOIN / @SEARCH_FREE /
 * @PARTY_DEL / @PARTY_CHAR_DEL 的行为测试（issue #172，阶段 3 H3）。
 *
 * 缝 = test/helpers/era-fixture.js。队伍数据全在 CFLAG 530-533：
 * 530 行动完了、531 仲間A、532 仲間B、533 队长记忆。
 *
 * 验收对应（#172 清单）：
 *   - DUNGEON_PARTY.ERB 五函数（工单列四函数 + 同文件的 @SEARCH_FREE）
 *     1:1 移植的行为锁定；
 *   - PARTY_CHAR_DEL 的重排段在 ere 扁平化（#21）下不移植（文件头注释），
 *     本文件钉「除名后残余引用不改号」的现状。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function load(fixture) {
  return fixture.load_module('dungeon/dungeon-party');
}

function text_lines(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

/** 最小世界：魔王 0 + 三名可编组角色 1/2/3 */
function setup_world() {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(1, { id: 1, name: '阿尔', callname: '阿尔' });
  fixture.seed_chara(2, { id: 2, name: '布莱克', callname: '布莱克' });
  fixture.seed_chara(3, { id: 3, name: '赛丽娜', callname: '赛丽娜' });
  for (const cid of [0, 1, 2, 3]) {
    fixture.era.addCharacter(cid);
  }
  return fixture;
}

/** 把角色置为「侵攻中、第 floor 层」的编组候选 */
function seed_hero(fixture, cid, floor) {
  fixture.store.set(`cflag:${cid}:1`, 2);
  fixture.store.set(`cflag:${cid}:501`, floor);
}

// —— @PARTY_UNITE ——

test('PARTY_UNITE：引用正确的同伴置行动完了（530 = 1）', async () => {
  const fixture = setup_world();
  // 阿尔(1) 的仲間A 是布莱克(2)，布莱克的队长记忆指回阿尔
  fixture.store.set('cflag:1:531', 2);
  fixture.store.set('cflag:2:533', 1);
  const { party_unite } = load(fixture);

  party_unite();
  assert.equal(fixture.store.get('cflag:2:530'), 1, '同伴以行动完了追随队长');
  assert.equal(fixture.store.get('cflag:1:530'), 0, '队长保持未行动');
});

test('PARTY_UNITE：越界引用（>= CHARANUM）解除', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:531', 99); // 只有 4 名角色
  const { party_unite } = load(fixture);

  party_unite();
  assert.equal(fixture.store.get('cflag:1:531'), 0, '越界仲間指定被清');
});

test('PARTY_UNITE：指向已行动角色的引用解除', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:531', 2);
  fixture.store.set('cflag:2:530', 1); // 已是别人的同伴（行动完了）
  const { party_unite } = load(fixture);

  party_unite();
  assert.equal(fixture.store.get('cflag:1:531'), 0, '重复同伴引用被清');
});

test('PARTY_UNITE：队长记忆对不上号时整套复位', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:531', 2);
  fixture.store.set('cflag:2:533', 3); // 布莱克记忆的队长是赛丽娜（≠1）
  fixture.store.set('cflag:2:531', 3);
  fixture.store.set('cflag:2:532', 1);
  const { party_unite } = load(fixture);

  party_unite();
  // :44-48 変な指定——双方的队伍数据全套复位
  assert.equal(fixture.store.get('cflag:1:531'), 0, '发起方的仲間A 清');
  assert.equal(fixture.store.get('cflag:2:530'), 0);
  assert.equal(fixture.store.get('cflag:2:531'), 0);
  assert.equal(fixture.store.get('cflag:2:532'), 0);
  assert.equal(fixture.store.get('cflag:2:533'), 0);
});

// —— @SEARCH_FREE ——

test('SEARCH_FREE：候选循环含搜索者自己——自己恒最先命中（一人成军的机制）', async () => {
  const fixture = setup_world();
  seed_hero(fixture, 1, 2);
  seed_hero(fixture, 2, 2);
  const { search_free } = load(fixture);

  // FOR CHARID, 1, CHARANUM 先撞到自己：未行动、同层（恒真）、无同伴、
  // 同状态 → 返回自己（:212-214）。这是原作「自分がリーダーになる」的
  // 实现机制，不是缺陷
  assert.equal(search_free(2, 1), 1, '自己最先被返回');
});

test('SEARCH_FREE：搜索者已有同伴时自己被跳过，按序找他人', async () => {
  const fixture = setup_world();
  seed_hero(fixture, 1, 2);
  fixture.store.set('cflag:1:531', 3); // 赛丽娜已是仲間A（自己被 :204 跳过）
  seed_hero(fixture, 3, 2);
  seed_hero(fixture, 2, 5); // 不同层——被排除
  const { search_free } = load(fixture);

  assert.equal(search_free(2, 1), 3, '不同层的布莱克被跳过，赛丽娜命中');
});

test('SEARCH_FREE：待机候选不入队（CFLAG:1 类型不匹配）', async () => {
  const fixture = setup_world();
  seed_hero(fixture, 1, 2);
  fixture.store.set('cflag:1:531', 3); // 自己跳过
  seed_hero(fixture, 2, 5); // 不同层
  fixture.store.set('cflag:3:1', 0); // 赛丽娜待机
  fixture.store.set('cflag:3:501', 2);
  const { search_free } = load(fixture);

  assert.equal(search_free(2, 1), 0, '全部候选被排除 → 0');
});

test('SEARCH_FREE：迎击中的潜入奴隶（1 == 3 且 500 == 4）额外可入', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:1', 3); // 搜索者是迎击者（TYPE = 3）
  fixture.store.set('cflag:1:501', 1);
  fixture.store.set('cflag:1:531', 3); // 自己已有同伴 → 候选循环跳过自己
  // 候选状态 3（迎击中）+ 500 == 4（潜入工作）——「忍び寄る潜入工作の
  // 魔の手」：别的迎击奴隶被吸收（:215-218）
  fixture.store.set('cflag:2:1', 3);
  fixture.store.set('cflag:2:500', 4);
  fixture.store.set('cflag:2:501', 1);
  const { search_free } = load(fixture);

  assert.equal(search_free(1, 1), 2, '潜入奴隶可被迎击队吸收（:215-218）');
});

// —— @PARTY_JOIN ——

test('PARTY_JOIN：A 枠收自己、B 枠收他人——队长自指与入队演出', async () => {
  const fixture = setup_world();
  seed_hero(fixture, 1, 2);
  seed_hero(fixture, 2, 2);
  const { party_join } = load(fixture);

  await party_join();
  // A 枠：SEARCH_FREE 先返回自己 → 队长演出（:126-127，在清零之前）→
  // 填枠后 :132 的 `CFLAG:NEW:531 = 0` 在 NEW == CHARID 时把 531 清回 0
  // （原作现状，1:1）——「一人成军」的最终态是 531 空、533 自指
  assert.equal(
    fixture.store.get('cflag:1:531') ?? 0,
    0,
    'A 枠被 :132 的 NEW:531 = 0 覆盖（原作现状）',
  );
  assert.equal(fixture.store.get('cflag:1:533'), 1, '队长记忆自指（:134）');
  // B 枠：自己被 531 检查之外的 530 = 1 跳过（行动完了），布莱克命中
  assert.equal(fixture.store.get('cflag:1:532'), 2, 'B 枠 = 布莱克');
  assert.equal(fixture.store.get('cflag:2:530'), 1, '布莱克行动完了（追随）');
  assert.equal(fixture.store.get('cflag:2:533'), 1, '布莱克的队长记忆 = 阿尔');
  const texts = text_lines(fixture);
  assert(texts.includes('阿尔成为队伍的队长了！'), ':127 一人成军的队长演出');
  assert(texts.includes('布莱克加入了阿尔的队伍！'), ':136 B 枠的入队演出');
});

test('PARTY_JOIN：一人成军——自己填进空枠并成为队长', async () => {
  const fixture = setup_world();
  seed_hero(fixture, 1, 2);
  // 无其他自由勇者（2/3 待机）
  const { party_join } = load(fixture);

  await party_join();
  // SEARCH_FREE 返回自己（候选循环含自己）→ :127 队长演出 → :130 填枠
  // → :132 的 NEW:531 = 0 把枠清回（NEW == CHARID，原作现状）
  assert.equal(
    fixture.store.get('cflag:1:531') ?? 0,
    0,
    '枠被 :132 覆盖清零（原作现状）',
  );
  assert.equal(fixture.store.get('cflag:1:533'), 1, '队长记忆自指');
  assert(
    text_lines(fixture).includes('阿尔成为队伍的队长了！'),
    ':127 独行勇者的队长演出',
  );
});

test('PARTY_JOIN：B 枠找不到人时 GOTO FINALIZE（A 枠有同伴、候选全排除）', async () => {
  const fixture = setup_world();
  seed_hero(fixture, 1, 2);
  fixture.store.set('cflag:1:531', 3); // 赛丽娜已是仲間A
  fixture.store.set('cflag:3:533', 1); // 回指齐全（unite 才不清）
  seed_hero(fixture, 2, 5); // 布莱克不同层 → 候选全排除
  const { party_join } = load(fixture);

  await party_join();
  // unite 把赛丽娜置行动完了；B 枠 SEARCH_FREE：自己（531 > 0 跳过）、
  // 布莱克（5 层）、赛丽娜（530 = 1）→ 0 → GOTO FINALIZE
  assert.equal(fixture.store.get('cflag:1:531'), 3, 'A 枠不动');
  assert.equal(
    fixture.store.get('cflag:1:532') ?? 0,
    0,
    'B 枠留空（找不到人）',
  );
});

test('PARTY_JOIN：行动完了与待机者不发起劝诱', async () => {
  const fixture = setup_world();
  seed_hero(fixture, 1, 2);
  fixture.store.set('cflag:1:530', 1); // 已行动
  seed_hero(fixture, 2, 2);
  fixture.store.set('cflag:3:1', 0); // 待机
  fixture.store.set('cflag:3:501', 2);
  const { party_join } = load(fixture);

  await party_join();
  assert.equal(
    fixture.store.get('cflag:1:531'),
    0,
    '行动完了者跳过（:102-103）',
  );
  assert.equal(
    fixture.store.get('cflag:3:531') ?? 0,
    0,
    '待机者不劝诱（:106-107，未写过）',
  );
});

// —— @PARTY_DEL ——

test('PARTY_DEL：队长离队 = 解散（双方队伍数据全套复位）', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:531', 2);
  fixture.store.set('cflag:1:532', 3);
  fixture.store.set('cflag:1:533', 1);
  fixture.store.set('cflag:2:530', 1);
  fixture.store.set('cflag:2:533', 1);
  fixture.store.set('cflag:3:530', 1);
  fixture.store.set('cflag:3:533', 1);
  const { party_del } = load(fixture);

  party_del(1);
  for (const key of ['530', '531', '532', '533']) {
    assert.equal(fixture.store.get(`cflag:1:${key}`), 0, `队长 1:${key} 清零`);
  }
  assert.equal(fixture.store.get('cflag:2:530'), 0, '同伴A 行动完了复位');
  assert.equal(fixture.store.get('cflag:2:533'), 0, '同伴A 队长记忆复位');
  assert.equal(fixture.store.get('cflag:3:533'), 0, '同伴B 队长记忆复位');
});

test('PARTY_DEL：同伴A 离队 = 只动该枠', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:531', 2);
  fixture.store.set('cflag:1:532', 3);
  fixture.store.set('cflag:1:533', 1);
  fixture.store.set('cflag:2:533', 1);
  fixture.store.set('cflag:3:533', 1);
  const { party_del } = load(fixture);

  party_del(2);
  assert.equal(fixture.store.get('cflag:1:531'), 0, '队长的仲間A 枠清');
  assert.equal(fixture.store.get('cflag:1:532'), 3, '仲間B 枠不动');
  assert.equal(fixture.store.get('cflag:2:533'), 0, '离队者的队长记忆清');
  assert.equal(fixture.store.get('cflag:3:533'), 1, '同伴B 记忆不动');
});

test('PARTY_DEL：对不上号按解散处理（バグ対策）', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:533', 2); // 队长记忆指向布莱克
  fixture.store.set('cflag:2:531', 3); // 布莱克的仲間A 是赛丽娜（不是 1）
  fixture.store.set('cflag:2:532', 0);
  fixture.store.set('cflag:3:533', 2);
  const { party_del } = load(fixture);

  party_del(1); // 1 既不是队长（布莱克才是）也不是布莱克的同伴
  assert.equal(fixture.store.get('cflag:2:531'), 0, '按解散复位');
  assert.equal(fixture.store.get('cflag:3:533'), 0);
});

test('PARTY_DEL：结婚对象尾数 9 走 SEARCH_FAMILY 存根（不可达清零）', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:533', 1); // 自为队长（无同伴）
  fixture.store.set('cflag:1:601', 119); // 尾数 9
  const { party_del } = load(fixture);

  party_del(1);
  // SEARCH_FAMILY 存根恒 0 → :293 的清零不达，登记在案即可
  assert.equal(fixture.store.get('cflag:1:601'), 119, '存根下不动结婚对象');
});

// —— @PARTY_CHAR_DEL ——

test('PARTY_CHAR_DEL：走 PARTY_DEL 且不改残余引用号（#21 扁平化）', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:531', 2);
  fixture.store.set('cflag:1:533', 1);
  fixture.store.set('cflag:2:533', 1);
  fixture.store.set('cflag:3:533', 2); // 高于被删号的引用（原作会 -1）
  const { party_char_del } = load(fixture);

  party_char_del(1);
  assert.equal(fixture.store.get('cflag:1:531'), 0, 'PARTY_DEL 解散了队伍');
  // 原作 :312-324 会把 3:533 从 2 改 1（注册号前移）；ere 角色号 = 预设号
  // 不重排，引用原样保留（文件头：不移植重排段）
  assert.equal(
    fixture.store.get('cflag:3:533'),
    2,
    'ere 扁平化：除名不引起引用改号（#21）',
  );
});
