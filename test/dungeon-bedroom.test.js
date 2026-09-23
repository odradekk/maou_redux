/**
 * @BEDROOM_BATTLE_MALE 的行为测试（#548 / S7：男魔王寝室战演出）。
 *
 * 源: target/ERB/EVENT/ENDING ver 1.0.1.ERB  @BEDROOM_BATTLE_MALE
 *     （:1042-1064）
 *     调用点: target/ERB/迷宮/DUNGEON.ERB:210（冒险者挑战臂，ere 侧
 *     ere/dungeon/dungeon.js 的 run_dungeon——本文件末用例经真身接线覆盖）。
 *     侵略/AGENT/AGENT.ERB:211 是 2014 旧快照的死代码（#103 判定），不移植。
 *
 * 缝 = test/helpers/era-fixture.js。
 *
 * MODE 组成（:1048-1053）：TALENT:0:122（魔王男人位）非 0 → +2；
 * ABL:0:11（欲望）> 8 → 再 +1。CASE 1/2/3 文案相同（原作三支同文），
 * CASE 0 独有「从睡梦中醒了过来」。
 *
 * **本函数只返回台词、不打印**（#548 订正）：调用方 :209 的 PRINTFORM 与本体
 * :1056/:1058 的 PRINTFORM 都不换行，两句是同一显示行——调用方合成一次输出。
 *
 * 覆盖：
 *   - 四个 MODE 各自的返回值（表驱动）＋「不打印」；
 *   - %SAVESTR:0% / %SAVESTR:(ARG:0)% 的 callname 承载（#5 决议）；
 *   - run_dungeon 挑战臂的**单行**合成（MODE 1 时前半句与后半句同句）。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function text_lines(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

/** 魔王 0（你）+ 挑战者 7（贝尔）的世界 */
function setup_world() {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(7, { id: 7, name: '贝尔', callname: '贝尔' });
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(7);
  return fixture;
}

// 表驱动：[男人位, 欲望, 期望台词]
const MODE_TABLE = [
  [0, 8, '你从睡梦中醒了过来。', 'MODE 0：女魔王欲望 ≤ 8（睡着）'],
  [0, 9, '你察觉到了贝尔的气息。', 'MODE 1：女魔王欲望 > 8'],
  [1, 3, '你察觉到了贝尔的气息。', 'MODE 2：男魔王欲望 ≤ 8'],
  [1, 9, '你察觉到了贝尔的气息。', 'MODE 3：男魔王欲望 > 8'],
];

for (const [male, desire, expected, label] of MODE_TABLE) {
  test(`${label}（talent:0:122 = ${male}，abl:0:11 = ${desire}）`, async () => {
    const fixture = setup_world();
    fixture.store.set('talent:0:122', male);
    fixture.store.set('abl:0:11', desire);
    const { bedroom_battle_male } = fixture.load_module('dungeon/dungeon');

    assert.equal(await bedroom_battle_male(7), expected, '返回该行的后半句');
    assert.deepEqual(
      text_lines(fixture),
      [],
      '本函数不打印（由调用方合成一行）',
    );
  });
}

test('边界：欲望恰为 8 不加档（> 8 判据）、恰为 0 的男人位走 MODE +2', async () => {
  const fixture = setup_world();
  fixture.store.set('talent:0:122', 1);
  fixture.store.set('abl:0:11', 8);
  const { bedroom_battle_male } = fixture.load_module('dungeon/dungeon');

  assert.equal(
    await bedroom_battle_male(7),
    '你察觉到了贝尔的气息。',
    'MODE 2',
  );
});

test('接线：run_dungeon 挑战臂把两句合成同一行（MODE 1）', async () => {
  const fixture = setup_world();
  // 勇者 7：冒险者（TALENT:122）、侵攻中、第 9 层、侵攻度 50（一轮即达房间）
  fixture.store.set('talent:7:122', 1);
  fixture.store.set('cflag:7:1', 2);
  fixture.store.set('cflag:7:501', 9);
  fixture.store.set('cflag:7:502', 50);
  for (const cid of [0, 7]) {
    fixture.store.set(`maxbase:${cid}:0`, 2000);
    fixture.store.set(`maxbase:${cid}:1`, 1000);
    fixture.store.set(`base:${cid}:0`, 2000);
    fixture.store.set(`base:${cid}:1`, 1000);
  }
  // 魔王欲望条件（:207 的三选一）：女魔王欲望 > 3 即可；再抬到 > 8 走 MODE 1
  fixture.store.set('abl:0:11', 9);
  const { run_dungeon } = fixture.load_module('dungeon/dungeon');
  // 混合随机：WALK 计算要大（19/9 段与 10 段），RAND:4 恒 0 → 挑战臂
  const mixed = (n) => (n === 4 ? 0 : n - 1);

  await run_dungeon(7, mixed);

  const texts = text_lines(fixture);
  assert(
    texts.includes('但贝尔仍是向魔王发起了挑战。'),
    'RAND:4 == 0 → 挑战臂',
  );
  // :209 的 PRINTFORM 与本体 :1058 的 PRINTFORM 都不换行 → 一句一行
  assert.equal(
    texts.filter(
      (line) => line === '你察觉到了贝尔的气息。你察觉到了贝尔的气息。',
    ).length,
    1,
    '两句拼成同一行（#548 订正：原先是两行）',
  );
  assert(!texts.includes('你察觉到了贝尔的气息。'), '不得再有单独的前半句行');
});
