/**
 * EVENT_K.ERB 口上分发表的行为测试（issue #403，N19 段 4）。
 *
 * 源: target/ERB/EVENT/EVENT_K.ERB（522 行，27 个函数、22 条 TRYCALLFORM）。
 * 表本身在 ere/kojo/kojo-system.js 的 EVENT_K_DISPATCH_TABLE（分片在
 * kojo-dungeon-after.js 与 kojo-dungeon-ravish.js），本文件的用例对着它逐条
 * 驱动；表的**完整性**由 test/event-k-dispatch.test.js 的源对照用例守着
 * （从 target/ 扫 TRYCALLFORM 行与表比对，表长草即红）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一注入点）。覆盖：
 *   - 22 条派发的编号换算（性格素质 160-179 → LOCAL 100-119 → 分发键
 *     LOCAL - 100；EX_TALENT 101-800 → LOCAL 1001-1700 → 键 901-1600）；
 *   - 各入口的守卫集与 TARGET 语义逐条对照原作的 :N（有无 FLAG:7 守卫、
 *     有无存在判定、是否 TARGET = A / B / ARG:0 并还原）；
 *   - 缺席语义两态：静默（TRYCALL 落空）与占位行（存根可见，登记在
 *     docs/stub-registry.md）——两态都是既定设计，逐条钉住；
 *   - :218 的 KOJO_EVENT_COM 恒空转（全库 0 个 @KOJO_EVENT_COM_* 定义，
 *     #14 登记）与 :325 的 ATTACK_KOUJO_B（调用方侵略/ARCANA_BATTLE.ERB
 *     未移植）；
 *   - TARGET 置位守卫的两侧：置成传入对象 / cid 缺省时吃当前 TARGET；
 *   - 分发窗口（in_kojo_window）与键偏移：本地可达格在这里、边界格与窗口
 *     谓词本身在 test/kojo-system.test.js、ravish 站点另有逐点扫描；
 *   - DispatchFamily 族名全库唯一（#403 实测的缺陷形态：同名两实例，
 *     一边注册一边分发，玩家侧静默失声）。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

const REPO = path.resolve(__dirname, '..');
const KOJO_DIR = path.join(REPO, 'ere', 'kojo');
const ERE_DIR = path.join(REPO, 'ere');

/**
 * 世界底座：玛奥（17）入列、口上总开关开、无性格素质（由各用例自行 seed）。
 * 目标角色号固定 17（join_slave_chara 的预置形状），需要时用参数换。
 */
function setup_kojo(cid = 17) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, cid, '玛奥');
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = cid;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = 0;
  fixture.store.set('flag:7', 2);
  return fixture;
}

/** 性格素质 163（高貴）→ LOCAL 103 → 分发键 3；存在标志 FLAG:103。 */
function seed_noble(fixture, cid = 17) {
  fixture.store.set(`talent:${cid}:163`, 1);
  fixture.store.set('flag:103', 1);
}

/** EX 口上 EX_TALENT:102 → LOCAL 1002 → 键 902；存在标志 EX_FLAG:102。 */
function seed_ex(fixture, cid = 17) {
  fixture.store.set(`ex_talent:${cid}:102`, 1);
  fixture.store.set('exflag:102', 1);
}

/** 确定性随机源：恒 0（不读上界——上界另有专测，见各 file 的 RAND 断言）。 */
const always = () => 0;

/** 探针 handler：记录收到的实参，返回 0（TRYCALL 不读返回值）。 */
function probe(sink) {
  return async (...args) => {
    sink.push(args);
    return 0;
  };
}

// —— @KOJO_EVENT_COM（:209-219）——

test('@KOJO_EVENT_COM（:217-218）：有目标时分发到 KOJO_EVENT_COM_{LOCAL-100}', async () => {
  const fixture = setup_kojo();
  seed_noble(fixture);
  const { kojo_event_com, kojo_event_com_family } =
    fixture.load_module('kojo/kojo-system');
  const seen = [];
  kojo_event_com_family.register(3, probe(seen));

  assert.equal(await kojo_event_com(), 0);
  assert.deepEqual(seen, [[]], '键 = LOCAL - 100 = 3（高貴 163 → 103）');
  assert.deepEqual(fixture.text_lines(), [], '分发本身不输出');
});

test('@KOJO_EVENT_COM：无 FLAG:7 守卫（:209-219 没有 SIF FLAG:7）', async () => {
  for (const off of [0, -1]) {
    const fixture = setup_kojo();
    seed_noble(fixture);
    fixture.store.set('flag:7', off);
    const { kojo_event_com, kojo_event_com_family } =
      fixture.load_module('kojo/kojo-system');
    const seen = [];
    kojo_event_com_family.register(3, probe(seen));
    await kojo_event_com();
    assert.deepEqual(seen, [[]], `FLAG:7 = ${off} 也照样分发（原作无守卫）`);
  }
});

test('@KOJO_EVENT_COM：无存在判定（:212-214 的存在判定在原作是注释态）', async () => {
  const fixture = setup_kojo();
  fixture.store.set('talent:17:163', 1); // FLAG:103 不置
  const { kojo_event_com, kojo_event_com_family } =
    fixture.load_module('kojo/kojo-system');
  const seen = [];
  kojo_event_com_family.register(3, probe(seen));
  await kojo_event_com();
  assert.deepEqual(seen, [[]], 'FLAG:103 == 0 不拦');
});

test('@KOJO_EVENT_COM：没有性格素质（LOCAL 0）→ 分发守卫不通过，静默', async () => {
  const fixture = setup_kojo();
  const { kojo_event_com, kojo_event_com_family } =
    fixture.load_module('kojo/kojo-system');
  const seen = [];
  kojo_event_com_family.register(3, probe(seen));
  assert.equal(await kojo_event_com(), 0);
  assert.deepEqual(seen, []);
  assert.deepEqual(fixture.text_lines(), [], '无目标 = TRYCALL 落空，静默');
});

test('@KOJO_EVENT_COM：全库 0 个 @KOJO_EVENT_COM_* 定义（#14 恒空转，照原样移植）', () => {
  const dir = path.join(REPO, 'target', 'ERB', '口上');
  const defs = [];
  for (const name of fs.readdirSync(dir)) {
    if (!name.endsWith('.ERB') && !name.endsWith('.ERH')) {
      continue;
    }
    const src = fs.readFileSync(path.join(dir, name), 'utf8');
    for (const m of src.matchAll(/^@KOJO_EVENT_COM_\d+/gm)) {
      defs.push(`${name}${m[0]}`);
    }
  }
  assert.deepEqual(defs, [], '原作缺陷 #14：目标全库 0 个定义，这条恒空转');
});

// —— @ATTACK_KOUJO_B（:325-337）——

test('@ATTACK_KOUJO_B（:327/:335-336）：TARGET 置为 B 侧对象、分发 DUNGEON_ATTACK_K{LOCAL-100} 后还原', async () => {
  const fixture = setup_kojo();
  seed_noble(fixture); // 高貴 163 → LOCAL 103 → 键 3
  const era_flag = fixture.load_module('era-utils/era-flag');
  const { attack_koujo_b, dungeon_attack_family } =
    fixture.load_module('kojo/kojo-system');
  const seen = [];
  let target_during = null;
  dungeon_attack_family.register(3, async (...args) => {
    seen.push(args);
    target_during = era_flag.target; // :327 TARGET = B
    return 0;
  });
  const rand = always;

  era_flag.target = 5; // 调用前的 TARGET（另一角色，验「暂存/还原」）
  assert.equal(await attack_koujo_b(17, rand), 0);
  assert.deepEqual(seen, [[rand]], '随机源透传（:322/:336 同族）');
  assert.equal(target_during, 17, '分发期间 TARGET = 传入的 B 侧角色号');
  assert.equal(
    era_flag.target,
    5,
    '返回后 TARGET 还原（同族 attack_koujo 约定）',
  );
});

test('@ATTACK_KOUJO_B：缺席目标静默（原作 TRYCALLFORM 落空，#565 返工）', async () => {
  const fixture = setup_kojo();
  seed_noble(fixture); // 高貴 163 → 键 3，不注册 handler
  const { attack_koujo_b } = fixture.load_module('kojo/kojo-system');
  await attack_koujo_b(17, always);
  assert.deepEqual(
    fixture.text_lines(),
    [],
    '未命中静默（原作 TRYCALLFORM 落空；真缺口由 kojo-family-coverage 的集合比对拦）',
  );
});

// —— @KOJO_MESSAGE_PALAMCNG（:169-181）——

test('@KOJO_MESSAGE_PALAMCNG（:175-176）：存在判定的 EX_FLAG 臂——EX 口上不被普通 FLAG 拦掉', async () => {
  const fixture = setup_kojo();
  seed_ex(fixture); // LOCAL 1002；存在标志是 EX_FLAG:102，FLAG:1002 不在册
  const { kojo_message_palamcng, kojo_message_palamcng_family } =
    fixture.load_module('kojo/kojo-system');
  const seen = [];
  kojo_message_palamcng_family.register(902, probe(seen));
  const rand = always;

  assert.equal(await kojo_message_palamcng(rand), 0);
  assert.deepEqual(
    seen,
    [[rand]],
    'FLAG:1002 == 0 但 EX_FLAG:102 == 1 → 照常分发',
  );
});

test('@KOJO_MESSAGE_PALAMCNG：两道存在标志都为 0 时静默早退（EX 臂另一侧）', async () => {
  const fixture = setup_kojo();
  seed_ex(fixture);
  fixture.store.set('exflag:102', 0);
  const { kojo_message_palamcng, kojo_message_palamcng_family } =
    fixture.load_module('kojo/kojo-system');
  const seen = [];
  kojo_message_palamcng_family.register(902, probe(seen));
  await kojo_message_palamcng(always);
  assert.deepEqual(seen, [], 'FLAG:LOCAL == 0 && EX_FLAG == 0 → 早期返回');
  assert.deepEqual(fixture.text_lines(), [], '早退连占位行也不打');
});

test('@KOJO_MESSAGE_MARKCNG：无存在判定（原件的存在判定行是注释态）→ FLAG:LOCAL == 0 也派发', async () => {
  const fixture = setup_kojo();
  fixture.store.set('talent:17:163', 1); // FLAG:103 特意不置
  const { kojo_message_markcng, kojo_message_markcng_family } =
    fixture.load_module('kojo/kojo-system');
  const seen = [];
  kojo_message_markcng_family.register(3, probe(seen));
  const rand = always;
  await kojo_message_markcng(rand);
  assert.deepEqual(seen, [[rand]], '没有存在判定这道闸（原作 :195 是注释态）');
});

// —— @GOHOUBI_REQUEST_KOUJO（:450-463）——

test('@GOHOUBI_REQUEST_KOUJO（:451-463）：签名 (cid) 由 #397 冻结，函数体真分发（#403 换体）', async () => {
  const fixture = setup_kojo();
  seed_noble(fixture);
  const era_flag = fixture.load_module('era-utils/era-flag');
  const { gohoubi_request_koujo, gohoubi_request_koujo_family } =
    fixture.load_module('kojo/kojo-dungeon-after');
  assert.equal(
    gohoubi_request_koujo.length,
    1,
    '签名仍是 #397 冻结的单参 cid（#403 只换函数体）',
  );

  const seen = [];
  let target_during = null;
  gohoubi_request_koujo_family.register(3, async (...args) => {
    seen.push(args);
    target_during = era_flag.target;
    return 0;
  });
  era_flag.target = 5; // 调用前的 TARGET（验 SWAP 的暂存/还原）
  assert.equal(await gohoubi_request_koujo(17), 0);
  assert.deepEqual(seen, [[17]], 'K 侧收 cid（K7 直接用它读 CFLAG:504）');
  assert.equal(target_during, 17, '分发期间 TARGET = A（:452）');
  assert.equal(era_flag.target, 5, '返回后 TARGET 还原（:463 SWAP）');
});

test('@GOHOUBI_REQUEST_KOUJO：缺席目标静默（原作 TRYCALLFORM 落空，#565 返工）', async () => {
  const fixture = setup_kojo(); // 无性格素质 → 键 -1
  const { gohoubi_request_koujo } = fixture.load_module(
    'kojo/kojo-dungeon-after',
  );
  assert.equal(await gohoubi_request_koujo(17), 0);
  assert.deepEqual(
    fixture.text_lines(),
    [],
    '未命中静默（「原 dispatch 恒空转不许静默吞掉」的旧占位语义随 #565 返工取消；真缺口由 kojo-family-coverage 拦）',
  );
});

test('GOHOUBI_REQUEST 族单实例：K 模块声明的注册号全部落进 dungeon-after 的那一族', async () => {
  // 期望集从源码扫出（不手写名单）：任何 kojo-k*.js 里
  // gohoubi_request_koujo_family.register(N 都是声明
  const expected = new Set();
  for (const name of fs.readdirSync(KOJO_DIR)) {
    if (!/^kojo-k.*\.js$/.test(name)) {
      continue;
    }
    const src = fs.readFileSync(path.join(KOJO_DIR, name), 'utf8');
    for (const m of src.matchAll(
      /gohoubi_request_koujo_family\.register\((\d+)/g,
    )) {
      expected.add(Number(m[1]));
    }
  }
  assert.ok(expected.size >= 10, '扫描器自身不许漂成空集');

  const fixture = create_era_fixture();
  fixture.load_module('system/flow/main-loop');
  const { gohoubi_request_koujo_family } = fixture.load_module(
    'kojo/kojo-dungeon-after',
  );
  const missing = [...expected].filter(
    (id) => !gohoubi_request_koujo_family.has(id),
  );
  assert.deepEqual(
    missing,
    [],
    '注册进了另一个同名实例（分发侧永远看不到）——#403 实测的缺陷形态',
  );
});

// —— 处刑首五族（:357-:427）与迷宫凌辱两族（:249-:272）——

// 入口 → 族 → 原作行号。五族同构：LOCAL = GET_KOJO_NUM() → 守卫 →
// TRYCALLFORM <族>_K{LOCAL - 100}（:366/:381/:396/:411/:426）。
// 入口在 kojo-system.js（#403 从五个事件模块的内联块收口，行为不变）。
const EXECUTION_DISPATCH = [
  ['@EXUCUTION_KOUJO（:357-367）', 'exucution_koujo'],
  ['@MUSEUM_KOUJO（:372-382）', 'museum_koujo'],
  ['@BANISHMENT_KOUJO（:387-397）', 'banishment_koujo'],
  ['@PUBLIC_EXUCUTION_KOUJO（:402-412）', 'public_exucution_koujo'],
  ['@GROTESQUE_KOUJO（:417-427）', 'grotesque_koujo'],
];

test('处刑首五族：分发到 <族>_K{LOCAL-100}、随机源透传、不改写 TARGET（原作这五处不设 TARGET）', async () => {
  for (const [label, entry] of EXECUTION_DISPATCH) {
    const fixture = setup_kojo();
    seed_noble(fixture); // 高貴 163 → LOCAL 103 → 键 3
    const era_flag = fixture.load_module('era-utils/era-flag');
    const kojo = fixture.load_module('kojo/kojo-system');
    const seen = [];
    const rand = always;
    kojo[`${entry}_family`].register(3, async (...args) => {
      seen.push(args);
      return 0;
    });

    era_flag.target = 5;
    assert.equal(await kojo[entry](17, 42, rand), 0, label);
    assert.deepEqual(seen, [[rand]], `${label}：handler 收随机源`);
    assert.equal(era_flag.target, 5, `${label}：TARGET 不动（原作不设）`);
  }
});

test('处刑首五族：K0（键 0）收事件编号而不是随机源——K0 旧签名的既有约定', async () => {
  for (const [label, entry] of EXECUTION_DISPATCH) {
    const fixture = setup_kojo();
    fixture.store.set('talent:17:160', 1); // 慈愛 → LOCAL 100 → 键 0
    const kojo = fixture.load_module('kojo/kojo-system');
    const rand = always;
    const seen = [];
    kojo[`${entry}_family`].register(0, async (...args) => {
      seen.push(args);
      return 0;
    });

    await kojo[entry](17, 42, rand);
    assert.deepEqual(seen, [[42]], `${label}：K0 收展品/处刑编号`);
  }
});

test('处刑首五族：无性格编号（键 -1）→ 静默（TRYCALL 落空，不打占位行）', async () => {
  for (const [label, entry] of EXECUTION_DISPATCH) {
    const fixture = setup_kojo();
    const kojo = fixture.load_module('kojo/kojo-system');
    const seen = [];
    kojo[`${entry}_family`].register(3, probe(seen));
    await kojo[entry](17, 42, always);
    assert.deepEqual(seen, [], label);
    assert.deepEqual(fixture.text_lines(), [], `${label}：静默`);
  }
});

test('@DUNGEON_RYOUZYOKU（:249-258）/:DUNGEON_RYOUZYOKU_AFTER（:263-272）：读当前 TARGET 分发、无参、不改写 TARGET', async () => {
  const fixture = setup_kojo();
  seed_noble(fixture);
  const era_flag = fixture.load_module('era-utils/era-flag');
  const ravish = fixture.load_module('kojo/kojo-dungeon-ravish');
  const seen_before = [];
  const seen_after = [];
  ravish.ryouzyoku_kojo_family.register(3, probe(seen_before));
  ravish.ryouzyoku_after_kojo_family.register(3, probe(seen_after));

  era_flag.target = 17;
  assert.equal(await ravish.dungeon_ryouzyoku(), 0);
  assert.equal(await ravish.dungeon_ryouzyoku_after(), 0);
  assert.deepEqual(seen_before, [[]], 'GET_KOJO_NUM() 走当前 TARGET');
  assert.deepEqual(seen_after, [[]]);
  assert.equal(era_flag.target, 17, 'TARGET 由调用方（:57 TARGET = ARG）管');
});

test('迷宫凌辱两族：无性格编号时静默（TRYCALL 落空）', async () => {
  const fixture = setup_kojo();
  const ravish = fixture.load_module('kojo/kojo-dungeon-ravish');
  const seen = [];
  ravish.ryouzyoku_kojo_family.register(3, probe(seen));
  await ravish.dungeon_ryouzyoku();
  assert.deepEqual(seen, []);
  assert.deepEqual(fixture.text_lines(), []);
});

// —— 22 条分发表（EVENT_K_DISPATCH_TABLE）——

const SOURCE = fs.readFileSync(
  path.join(REPO, 'target', 'ERB', 'EVENT', 'EVENT_K.ERB'),
  'utf8',
);

/**
 * 从原件扫出全部 TRYCALLFORM 行（含注释态）。
 * @returns {{line: number, commented: boolean, dispatch: string}[]}
 */
function scan_source_trycallform() {
  const out = [];
  SOURCE.split('\n').forEach((raw, i) => {
    const m = raw.match(/^(\s*)(;?)\s*TRYCALLFORM\s+(\S+)/);
    if (!m) {
      return;
    }
    const dispatch = m[3].split('{')[0]; // 去掉 {LOCAL - 100} 与「, ARG:0」
    out.push({
      line: i + 1,
      commented: m[2] === ';',
      dispatch,
    });
  });
  return out;
}

test('源对照：表的 22 行与 EVENT_K.ERB 的 22 处活 TRYCALLFORM 逐行对上', () => {
  const fixture = create_era_fixture();
  const { EVENT_K_DISPATCH_TABLE: table } =
    fixture.load_module('kojo/kojo-system');
  const scanned = scan_source_trycallform();
  const active = scanned.filter((r) => !r.commented);
  const commented = scanned.filter((r) => r.commented);

  assert.equal(active.length, 22, '原件活的分发点恰 22 处');
  assert.equal(table.length, 22, '表的行数对上');
  assert.deepEqual(
    table.map((r) => [r.line, r.dispatch]),
    active.map((r) => [r.line, r.dispatch]),
    '行号 + 拼名前缀逐条一致（源改动 / 表长草都红）',
  );
  // 注释态的三条是 eraWiz 未使用的入口，不进表（见 kojo-system.js 的表注）
  assert.equal(commented.length, 3, '注释态分发恰 3 处');
  assert.deepEqual(
    commented.map((r) => r.dispatch),
    [
      'MESSAGE_COM_ASSI_',
      'KOJO_MESSAGE_COM_ASSI_',
      'KOJO_MESSAGE_PLAYERCHANGE_',
    ],
    '三条注释态分发的名字（对照 @KOJO_MESSAGE_COM_MASTER/_ASSI/PLAYERCHANGE）',
  );
});

/** 读分发表（独立夹具加载一次；表是纯数据，后续夹具重建不影响它）。 */
function table_rows() {
  return create_era_fixture().load_module('kojo/kojo-system')
    .EVENT_K_DISPATCH_TABLE;
}

/** 实参名 → 取值（驱动方上下文）。 */
function arg_value(name, ctx) {
  switch (name) {
    case 'cid':
      return ctx.cid;
    case 'event_no':
      return 42;
    case 'choice':
      return 9;
    case 'arg0':
      return 2;
    case 'q':
      return 1;
    case 'rand':
      return ctx.rand;
    default:
      throw new Error(`表里出现未登记的实参名：${name}`);
  }
}

/**
 * 表驱动的单行驱动：一份新夹具 + 探针注册 + 调用入口。
 *
 * 每行一份新夹具：DUNGEON_ATTACK_K 一族被两行共用（@ATTACK_KOUJO 与
 * @ATTACK_KOUJO_B），同族重复注册会被 DispatchFamily 当场拦下（#14 的守卫）。
 *
 * @param {object} row 表行
 * @param {object} [options]
 * @param {number} [options.key=3] 探针注册的族键（3 = 普通口上、902 = EX 口上）
 * @param {(fixture: object, cid: number) => void} [options.seed] 追加种子
 * @returns {Promise<object>} 观测（fixture / era_flag / seen / target_during …）
 */
async function drive_row(row, { key = 3, seed = () => {} } = {}) {
  const cid = 17;
  const rand = always;
  const fixture = create_era_fixture();
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = cid;
  fixture.store.set('flag:7', 2);
  seed(fixture, cid);
  // @SELF_KOJO 的 FLAG:7 守卫会写 TFLAG:15（调教期才存在的表），照真实调用
  // 场景把调教开起来——kojo-system.test.js 的 setup_kojo 同款
  fixture.era.beginTrain(0, cid);
  const mod = fixture.load_module(row.module);
  const entry = mod[row.entry];
  assert.equal(typeof entry, 'function', `${row.entry} 在 ${row.module} 导出`);
  const seen = [];
  let target_during = null;
  mod[row.family].register(key, async (...args) => {
    seen.push(args);
    target_during = era_flag.target;
    return 0;
  });
  fixture.set_inputs(...Array(4).fill(0)); // 占位行的等键（wait 族）备料
  const ctx = { cid, rand };
  const result = await entry(...row.call.map((name) => arg_value(name, ctx)));
  return { fixture, era_flag, mod, seen, target_during, rand, cid, result };
}

test('22 行逐条驱动：注册 handler 后按 LOCAL-100 命中，实参形状与实现一致', async () => {
  for (const row of table_rows()) {
    const { seen, era_flag, fixture, cid, rand, result } = await drive_row(
      row,
      {
        seed: seed_noble, // LOCAL 103 → 键 3
      },
    );
    assert.deepEqual(
      seen,
      [row.handler.map((name) => arg_value(name, { cid, rand }))],
      `${row.entry}：handler 实参逐条对上`,
    );
    assert.equal(era_flag.target, cid, `${row.entry}：分发后不留 target 残留`);
    assert.deepEqual(
      fixture.text_lines(),
      [],
      `${row.entry}：命中 handler 时不打占位行`,
    );
    assert.equal(
      result,
      row.entry === 'gobi_koujo' ? '' : 0,
      // #570：gobi_koujo 转交真身返回值并归一为字符串（mock 返回 0 → 空串）；
      // 其余入口契约仍是 0（TRYCALLFORM 不读）
      `${row.entry}：返回值`,
    );
  }
});

test('存在判定与源一致：原件同段有 `SIF FLAG:LOCAL == 0` 的入口在两道标志都关时静默', async () => {
  const lines = SOURCE.split('\n').map((l) => l.replace(/\r$/, ''));
  for (const row of table_rows()) {
    const header = `@${row.erb}`;
    const start = lines.findIndex(
      (line) => line === header || line.startsWith(`${header},`),
    );
    const slice = lines.slice(start, row.line).join('\n');
    // 只认没被注释掉的那行（MARKCNG 的存在判定在原作是 `;SIF` 注释态）
    const has_check = /^SIF FLAG:LOCAL == 0/m.test(slice);

    const { seen, result } = await drive_row(row, {
      seed: (fixture0, cid) => {
        fixture0.store.set(`talent:${cid}:163`, 1); // 性格在、存在标志不置
      },
    });
    if (has_check) {
      assert.deepEqual(
        seen,
        [],
        `${row.entry}：FLAG:LOCAL == 0 && EX_FLAG == 0 → 存在判定早退`,
      );
    } else {
      assert.equal(
        seen.length,
        1,
        `${row.entry}：原件同段没有存在判定 → 照常派发`,
      );
    }
    assert.equal(
      result,
      row.entry === 'gobi_koujo' ? '' : 0, // #570：语尾未命中返回空串
      `${row.entry}：返回值`,
    );
  }
});

test('GET_KOJO_NUM 素质扫描全范围：160-179 逐格 → LOCAL 100-119', async () => {
  for (let talent = 160; talent <= 179; talent += 1) {
    const fixture = create_era_fixture();
    const era_flag = fixture.load_module('era-utils/era-flag');
    era_flag.target = 17;
    fixture.store.set(`talent:17:${talent}`, 1);
    const { get_kojo_num } = fixture.load_module('kojo/kojo-system');
    assert.equal(
      get_kojo_num(17),
      talent - 60,
      `素质 ${talent} → LOCAL ${talent - 60}（含末格 179：上界是 < 180）`,
    );
  }
});

test('22 行逐条驱动（EX 臂）：EX_TALENT:102 → LOCAL 1002 → 键 902 同样命中', async () => {
  for (const row of table_rows()) {
    const { seen, cid, rand } = await drive_row(row, {
      key: 902,
      seed: seed_ex, // LOCAL 1002 → 键 902
    });
    assert.deepEqual(
      seen,
      [row.handler.map((name) => arg_value(name, { cid, rand }))],
      `${row.entry}：守卫的 LOCAL > 1000 臂可达`,
    );
  }
});

test('族 call 的落空值契约：22 行都在 options 里声明 whenMissing = 0，实参同表', async () => {
  // whenMissing 是**契约注记**：这些入口一律 return 0（TRYCALLFORM 的 RESULT
  // 不读），所以 0 从返回值上与合法值分不开——只能在分发缝上钉住它（#403
  // 二轮验收点名「whenMissing 的 0」与「家族 call 的键」这一类哨兵值）。
  // 包一层族对象的 call 记录 options：命中 handler 的那些行照样走 call。
  for (const row of table_rows()) {
    const cid = 17;
    const rand = always;
    const fixture = create_era_fixture();
    const era_flag = fixture.load_module('era-utils/era-flag');
    era_flag.target = cid;
    fixture.store.set('flag:7', 2);
    seed_noble(fixture, cid); // LOCAL 103 → 键 3
    fixture.era.beginTrain(0, cid); // @SELF_KOJO 的守卫会写 TFLAG:15
    const mod = fixture.load_module(row.module);
    const family = mod[row.family];
    const recorded = [];
    const real_call = family.call.bind(family);
    family.call = async (id, options) => {
      recorded.push([id, options]);
      return real_call(id, options);
    };
    family.register(3, async () => 0);

    fixture.set_inputs(...Array(4).fill(0)); // 占位行的等键备料
    const ctx = { cid, rand };
    await mod[row.entry](...row.call.map((name) => arg_value(name, ctx)));

    assert.equal(recorded.length, 1, `${row.entry}：命中 handler 时经族 call`);
    assert.equal(recorded[0][0], 3, `${row.entry}：键 = LOCAL - 100`);
    assert.equal(
      recorded[0][1].whenMissing,
      0,
      `${row.entry}：落空值声明 0（TRYCALL 落空的 RESULT）`,
    );
    assert.deepEqual(
      recorded[0][1].args,
      row.handler.map((name) => arg_value(name, ctx)),
      `${row.entry}：实参透传与表一致`,
    );
  }
});

test('FLAG:7 = 0（口上总开关关）：flag_guard 行不派发，其余行照常派发', async () => {
  for (const row of table_rows()) {
    const { seen, fixture } = await drive_row(row, {
      seed: (fixture0, cid) => {
        seed_noble(fixture0, cid);
        fixture0.store.set('flag:7', 0);
      },
    });
    if (row.flag_guard) {
      assert.deepEqual(seen, [], `${row.entry}：有 FLAG:7 守卫 → 关掉时不派发`);
      assert.deepEqual(
        fixture.text_lines(),
        [],
        `${row.entry}：守卫命中连占位行也不打`,
      );
    } else {
      assert.equal(
        seen.length,
        1,
        `${row.entry}：原件同段没有 FLAG:7 守卫 → 关掉也照常派发`,
      );
    }
  }
});

test('守卫集与源一致：表的 flag_guard 与原件各入口函数体段里的 FLAG:7 逐条对上', () => {
  const lines = SOURCE.split('\n').map((l) => l.replace(/\r$/, ''));
  for (const row of table_rows()) {
    const header = `@${row.erb}`;
    const start = lines.findIndex(
      (line) => line === header || line.startsWith(`${header},`),
    );
    assert.ok(start >= 0, `原件有 @${row.erb} 定义（entry=${row.entry}）`);
    const slice = lines.slice(start, row.line).join('\n');
    assert.equal(
      /FLAG:7/.test(slice),
      row.flag_guard,
      `${row.entry}：表说 flag_guard=${row.flag_guard}，原件同段${
        /FLAG:7/.test(slice) ? '有' : '没有'
      } FLAG:7`,
    );
  }
});

test('缺席语义：未命中一律静默（原作 TRYCALLFORM 落空，#565 返工统一）', async () => {
  for (const row of table_rows()) {
    const fixture = create_era_fixture();
    const era_flag = fixture.load_module('era-utils/era-flag');
    era_flag.target = 17;
    fixture.store.set('flag:7', 2);
    seed_noble(fixture); // 有性格编号、但族里没注册 handler

    const mod = fixture.load_module(row.module);
    const result = await mod[row.entry](
      ...row.call.map((name) => arg_value(name, { cid: 17, rand: always })),
    );
    const lines = fixture.text_lines();

    // #570 起 GOBI_KOUJO 的未命中值是空串（调用方拿它拼行，0 会被拼进
    // 台词）；其余入口仍是 TRYCALL 落空的 RESULT 0
    const missing_value = row.entry === 'gobi_koujo' ? '' : 0;
    assert.equal(
      result,
      missing_value,
      `${row.entry}：缺 handler 时返回 ${JSON.stringify(missing_value)}（TRYCALL 落空）`,
    );
    // 表里的 missing/stub_wait 字段自 #565 返工起只作历史文档（未命中统一
    // 静默），行为面不再区分两态
    assert.deepEqual(
      lines,
      [],
      `${row.entry}：未命中静默（原作 TRYCALLFORM 落空）`,
    );
  }
});

// —— TARGET 暂存/还原（SWAP LOCAL:2, TARGET 的等价改写） ——

// 七处会改 TARGET 的入口：@ENTERENEMY_KOUJO（:433/:445）、@GOHOUBI_REQUEST_KOUJO
// （:451/:463）、@GOHOUBI_AFTER_KOUJO（:469/:481）、@OSIOKI_KOUJO（:487/:499）
// 是 SWAP 成对。@VICTORY_KOUJO（:296）、@ATTACK_KOUJO（:313）、
// @ATTACK_KOUJO_B（:327）原件只置不还原，ere 侧按同族既有约定（attack_koujo
// 先例）暂存/还原，不留跨调用的指针残留。其余分发点不碰 TARGET（读当前值，
// 由调用方置）——两侧都在这儿钉住。
const TARGET_SET_ENTRIES = [
  [
    'kojo/kojo-system',
    'victory_koujo',
    'dungeon_victory_family',
    ['cid', 'rand'],
  ],
  [
    'kojo/kojo-system',
    'attack_koujo',
    'dungeon_attack_family',
    ['cid', 'rand'],
  ],
  [
    'kojo/kojo-system',
    'attack_koujo_b',
    'dungeon_attack_family',
    ['cid', 'rand'],
  ],
  [
    'kojo/kojo-system',
    'enterenemy_koujo',
    'enterenemy_koujo_family',
    ['cid', 'rand'],
  ],
  [
    'kojo/kojo-dungeon-after',
    'gohoubi_request_koujo',
    'gohoubi_request_koujo_family',
    ['cid'],
  ],
  [
    'kojo/kojo-dungeon-after',
    'gohoubi_after_koujo',
    'gohoubi_after_koujo_family',
    ['cid', 'choice'],
  ],
  [
    'kojo/kojo-dungeon-after',
    'osioski_koujo',
    'osioski_koujo_family',
    ['cid', 'choice'],
  ],
];

test('TARGET 暂存/还原：七处置/还原成对（分发期间 = 传入对象，返回后 = 调用前的值）', async () => {
  for (const [
    module_name,
    entry_name,
    family_name,
    call,
  ] of TARGET_SET_ENTRIES) {
    const cid = 17;
    const rand = always;
    const fixture = create_era_fixture();
    const era_flag = fixture.load_module('era-utils/era-flag');
    fixture.store.set('flag:7', 2);
    seed_noble(fixture, cid); // 高貴 163 → LOCAL 103 → 键 3
    const mod = fixture.load_module(module_name);
    const seen = [];
    let target_during = null;
    mod[family_name].register(3, async (...args) => {
      seen.push(args);
      target_during = era_flag.target;
      return 0;
    });

    era_flag.target = 5; // 调用前的 TARGET（另一角色）
    await mod[entry_name](
      ...call.map((name) => arg_value(name, { cid, rand, choice: 9 })),
    );
    assert.equal(seen.length, 1, `${entry_name}：handler 被调用`);
    assert.equal(
      target_during,
      cid,
      `${entry_name}：分发期间 TARGET = 传入对象`,
    );
    assert.equal(
      era_flag.target,
      5,
      `${entry_name}：返回后 TARGET 还原（不留跨调用残留）`,
    );
  }
});

test('TARGET 置位守卫的两侧：cid 缺省（undefined / 负数）吃当前 TARGET，合法 0 按它自己', async () => {
  // 三个入口的 `if (cid !== undefined && cid >= 0)` 是哨兵与合法值的边界：
  // 缺省侧吃当前 TARGET（GET_KOJO_NUM 的参缺省语义），0 侧是合法角色号，
  // 指针都不留残留
  for (const [entry_name, family_name] of [
    ['victory_koujo', 'dungeon_victory_family'],
    ['attack_koujo', 'dungeon_attack_family'],
    ['attack_koujo_b', 'dungeon_attack_family'],
  ]) {
    for (const cid_arg of [undefined, -1]) {
      const fixture = setup_kojo();
      seed_noble(fixture); // 当前 TARGET 17 的性格 → 键 3
      const era_flag = fixture.load_module('era-utils/era-flag');
      const kojo = fixture.load_module('kojo/kojo-system');
      const seen = [];
      let target_during = null;
      kojo[family_name].register(3, async (...args) => {
        seen.push(args);
        target_during = era_flag.target;
        return 0;
      });
      era_flag.target = 17;
      const rand = always;

      await kojo[entry_name](cid_arg, rand);

      assert.deepEqual(
        seen,
        [[rand]],
        `${entry_name}(cid=${cid_arg})：按当前 TARGET 分发、随机源透传`,
      );
      assert.equal(
        target_during,
        17,
        `${entry_name}(cid=${cid_arg})：分发期间 TARGET 未被覆盖`,
      );
      assert.equal(
        era_flag.target,
        17,
        `${entry_name}(cid=${cid_arg})：返回后 TARGET 仍是它`,
      );
    }
  }

  // 合法侧的另一端：cid = 0（魔王）是合法角色号，必须按它自己的编号分发
  // ——`cid >= 0` 收成 `cid > 0` 就会把它当缺省、静默换成 TARGET 的口上
  for (const [entry_name, family_name] of [
    ['victory_koujo', 'dungeon_victory_family'],
    ['attack_koujo', 'dungeon_attack_family'],
    ['attack_koujo_b', 'dungeon_attack_family'],
  ]) {
    const fixture = setup_kojo();
    seed_noble(fixture); // TARGET 17 的性格 → 键 3
    fixture.store.set('talent:0:160', 1); // 0 号自己的性格（慈愛）→ 键 0
    const era_flag = fixture.load_module('era-utils/era-flag');
    const kojo = fixture.load_module('kojo/kojo-system');
    const seen = [];
    let target_during = null;
    kojo[family_name].register(0, async (...args) => {
      seen.push(args);
      target_during = era_flag.target;
      return 0;
    });
    era_flag.target = 17; // 调用前的 TARGET（验置/还原成 0）
    const rand = always;

    await kojo[entry_name](0, rand);

    assert.deepEqual(
      seen,
      [[rand]],
      `${entry_name}(cid=0)：按 0 号自己的编号分发`,
    );
    assert.equal(target_during, 0, `${entry_name}(cid=0)：分发期间 TARGET = 0`);
    assert.equal(
      era_flag.target,
      17,
      `${entry_name}(cid=0)：返回后 TARGET 还原成调用前的 17`,
    );
  }
});

// —— 族名唯一（#403 实测缺陷的形态锁） ——

test('DispatchFamily 族名全库唯一：同名两实例会让一边的注册永远分不到', () => {
  const names = new Map(); // 族名 → [文件…]
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (!entry.name.endsWith('.js') || entry.name === 'era-electron.js') {
        continue;
      }
      const src = fs
        .readFileSync(full, 'utf8')
        // 注释里的示例（dispatch-family.js 头注的用法样例）不算声明
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/^\s*\/\/.*$/gm, '');
      for (const m of src.matchAll(/new DispatchFamily\(\s*'([^']+)'/g)) {
        const list = names.get(m[1]) ?? [];
        list.push(path.relative(REPO, full));
        names.set(m[1], list);
      }
    }
  };
  walk(ERE_DIR);

  assert.ok(names.size >= 20, '扫描器自身不许漂成空集');
  const dup = [...names.entries()].filter(([, files]) => files.length > 1);
  assert.deepEqual(
    dup,
    [],
    '同一个族名出现两份 new DispatchFamily（#403 实测：GOHOUBI_REQUEST_KOUJO ' +
      '曾在 kojo-system 与 kojo-dungeon-after 各有一份，六个 K 模块的注册落在' +
      '分发侧看不到的那一份上）',
  );
});
