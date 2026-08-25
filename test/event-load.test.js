/**
 * ere/event/event-load.js（@EVENTLOAD 读档钩子，#137）的行为测试。
 *
 * 验收项：钩子本体直驱（emit('EVENTLOAD')）——DATA_FIX 三行的等价落地
 * 逐条判定（判定依据见 event-load.js 文件头）；「读档成功后钩子被调用」
 * 的集成判据在 test/page-save-load.test.js（emit 点与转场一起测）。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/** 建一个带双角色的夹具并直接 emit 钩子链（不经 load_game） */
async function run_hook(fixture) {
  const { emit } = fixture.load_module('system/event/registry');
  fixture.load_module('event/event-load');
  await emit('EVENTLOAD');
}

test('存根清单核对：STUBBED_CALLS 固定且全部收录进 docs/stub-registry.md', () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('event/event-load');
  // 名单本身固定（增删存根必须同步本测试与清单）
  assert.deepEqual(STUBBED_CALLS, ['CHARA_NAME_INIT', 'EX_TALENTNAME_INIT']);
  const registry = fs.readFileSync(
    path.resolve(__dirname, '..', 'docs', 'stub-registry.md'),
    'utf8',
  );
  for (const name of STUBBED_CALLS) {
    assert(registry.includes(name), `存根清单缺少 ${name}`);
  }
  // 登记不占位的两分支（不可达）也必须可检索
  assert(
    registry.includes('LASTLOAD_NO == 999'),
    '999 → MAOUNET 分支的登记必须在场（不可达，登记不占位）',
  );
  assert(registry.includes('INPORT_B'), '1000–1020 → INPORT_B 同上');
});

test('DATA_FIX 等价物 1：EX_TALENT:MASTER:200 = 1，只写 MASTER（恒 0 号魔王）', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(17, { id: 17, name: '琼', callname: '琼' });
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(17);

  await run_hook(fixture);

  assert.equal(
    fixture.store.get('ex_talent:0:200'),
    1,
    'EX_TALENT:MASTER:200 = 1（魔王高贵标识，DATA_FIX 170205 段）',
  );
  assert.equal(
    fixture.store.get('ex_talent:17:200'),
    undefined,
    'SIF A == MASTER——非 0 号角色不写',
  );
});

test('DATA_FIX 等价物 2：MAXBASE 下限钳制（< 600 → 600、< 100 → 100），高值与恰等不动', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(17, { id: 17, name: '琼', callname: '琼' });
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(17);
  // 读入存档可能带着被剧情压低的上限（EVENT_ADDICT.ERB:160-172 的写点）
  fixture.store.set('maxbase:0:0', 550);
  fixture.store.set('maxbase:0:1', 90);
  fixture.store.set('maxbase:17:0', 1200);
  fixture.store.set('maxbase:17:1', 100);

  await run_hook(fixture);

  assert.equal(fixture.store.get('maxbase:0:0'), 600, '体力上限 < 600 → 600');
  assert.equal(fixture.store.get('maxbase:0:1'), 100, '气力上限 < 100 → 100');
  assert.equal(
    fixture.store.get('maxbase:17:0'),
    1200,
    '高于下限不动（SIF 判据，幂等钳制）',
  );
  assert.equal(
    fixture.store.get('maxbase:17:1'),
    100,
    '恰好等于下限不动（SIF 判据是 <）',
  );
});

test('DATA_FIX 等价物 3：未声明序号读值 undefined → || 0 兜底也钳（#13）', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  // 全新夹具：maxbase:* 未播种，读值 undefined
  await run_hook(fixture);
  assert.equal(
    fixture.store.get('maxbase:0:0'),
    600,
    'undefined 兜底 0 → 同样低于下限，钳到 600（与原作 Emuera 零值语义一致）',
  );
  assert.equal(fixture.store.get('maxbase:0:1'), 100);
});

test('钩子是幂等重放：对已钳过的世界再跑一遍不改变结果', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  fixture.store.set('maxbase:0:0', 600);
  fixture.store.set('maxbase:0:1', 100);

  await run_hook(fixture);
  await run_hook(fixture);

  assert.equal(fixture.store.get('maxbase:0:0'), 600, '重放幂等');
  assert.equal(fixture.store.get('maxbase:0:1'), 100);
  assert.equal(fixture.store.get('ex_talent:0:200'), 1);
});
