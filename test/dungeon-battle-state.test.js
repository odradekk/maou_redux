/**
 * @file 战斗状态从 E 表搬成普通对象（issue #883）的守护用例。
 *
 * 覆盖面：
 *   - **对象形状**：六列、十二个字段、全 0 初值；列与列互不串写；列号越界
 *     读全 0 列（原 E 表对未声明序号就是读 0，战斗侧有一条带着 -1 列号继续
 *     算的历史路径，不能改成抛错）。
 *   - **偏移寻址与声明撤除**：源码里不再有 `e:` 寻址、`yml/E.yml` 不再存在。
 *     这两条是验收标准第 1 条的机器判据——`e_get`/`e_set` 帮手留着就等于
 *     偏移布局还在。
 *   - **写者与读者**：monster_data / skeleton 写对象不写 E；战场侧的读者
 *     读的是对象；chara-body 不再借 `e:1` 当临时变量（验收标准第 2 条）。
 *   - **旧档**：真引擎 `saveData`/`loadData`。——战斗中不能存档（存档页只在
 *     SHOP 状态，战斗跑在 EVENTTURNEND 里），所以 0.1.0 档里的 `e` 桶是
 *     「战斗之后、回合结算尾部自动存档」写进去的残留，没有任何读者。用例
 *     按 0.1.0 的【版本】（1000）盖戳、带上这份残留，确认引擎照常读入、
 *     战斗状态从 0 起、残留不再被任何寻址触到。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const {
  create_chara_loader,
  create_variable_loader,
  load_engine_bundle,
} = require('./helpers/engine-bundle');
const { attach_variable_tables } = require('./helpers/static-tables');

const REPO_ROOT = path.resolve(__dirname, '..');
const ERE_DIR = path.join(REPO_ROOT, 'ere');
const YML_DIR = path.join(REPO_ROOT, 'yml');

const engine = load_engine_bundle();
const engine_test = engine ? test : test.skip;

/** 一列的十二个字段（= 原 E 表列头 +0/+1/…/+99 的偏移表） */
const COLUMN_FIELDS = [
  'id',
  'level',
  'attack',
  'defense',
  'speed',
  'special',
  'magic',
  'rape_type',
  'boss',
  'status',
  'resistance',
  'count',
];

/** 全 0 的一列 */
function zero_column() {
  return Object.fromEntries(COLUMN_FIELDS.map((field) => [field, 0]));
}

/** 递归列出 ere/ 下的脚本 */
function walk_js(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk_js(full));
    } else if (entry.name.endsWith('.js')) {
      out.push(full);
    }
  }
  return out;
}

/** 定序随机源：每次返回表里的下一个值（口上/战斗测试同款） */
function seq(values) {
  let index = 0;
  return () => {
    const value = values[index % values.length];
    index += 1;
    return value;
  };
}

// —— 对象形状 ——

test('battle_column：六列都是同一形状的全 0 对象，字段恰是原偏移表的十二项', () => {
  const fixture = create_era_fixture();
  const { BATTLE_COLUMN, battle_column } = fixture.load_module(
    'dungeon/battle-state',
  );
  assert.deepEqual(Object.values(BATTLE_COLUMN).sort(), [0, 1, 2, 3, 4, 5]);
  for (const column of Object.values(BATTLE_COLUMN)) {
    assert.deepEqual(
      battle_column(column),
      zero_column(),
      `列 ${column} 的字段集必须与偏移表一一对应`,
    );
  }
  assert.notEqual(
    battle_column(BATTLE_COLUMN.DEFENSE_1),
    battle_column(BATTLE_COLUMN.DEFENSE_2),
    '各列必须是各自的对象，不能共用一个',
  );
});

test('battle_column：写一列不串到别的列（原 E 表的步长隔离由对象身份保证）', () => {
  const fixture = create_era_fixture();
  const { BATTLE_COLUMN, battle_column } = fixture.load_module(
    'dungeon/battle-state',
  );
  battle_column(BATTLE_COLUMN.DEFENSE_2).defense = 42;
  battle_column(BATTLE_COLUMN.DEFENSE_2).count = 7;
  assert.equal(battle_column(BATTLE_COLUMN.DEFENSE_2).defense, 42);
  assert.equal(battle_column(BATTLE_COLUMN.DEFENSE_1).defense, 0);
  assert.equal(battle_column(BATTLE_COLUMN.DEFENSE_3).count, 0);
});

test('battle_column：列号越界读全 0 列而不抛错（同原 E 表未声明序号读 0）', () => {
  const fixture = create_era_fixture();
  const { battle_column } = fixture.load_module('dungeon/battle-state');
  assert.deepEqual(battle_column(-1), zero_column());
  assert.deepEqual(battle_column(99), zero_column());
  // 越界列可以写，但不影响真实列（历史路径会往 -1 列写数量 0）
  battle_column(-1).count = 0;
  assert.equal(battle_column(0).count, 0);
});

test('reset_battle_state：就地清零，调用方手里的列引用仍然有效', () => {
  const fixture = create_era_fixture();
  const { BATTLE_COLUMN, battle_column, reset_battle_state } =
    fixture.load_module('dungeon/battle-state');
  const row = battle_column(BATTLE_COLUMN.MINION_A);
  row.id = 190;
  row.level = 9;
  reset_battle_state();
  assert.equal(
    battle_column(BATTLE_COLUMN.MINION_A),
    row,
    '复位后必须还是同一个对象（换成新数组会让流程里持有的引用脱开）',
  );
  assert.deepEqual(row, zero_column());
});

// —— 偏移寻址与 E 表声明撤除 ——

test('源码里不再有 E 表的偏移寻址（e_get / e_set / era.get(`e:…`) 一条不剩）', () => {
  const offenders = [];
  for (const file of walk_js(ERE_DIR)) {
    const body = fs.readFileSync(file, 'utf8');
    const where = path.relative(REPO_ROOT, file);
    for (const pattern of [
      /\be_[gs]et\s*\(/g,
      /(?:era\.(?:get|set|add)|era0)\(\s*['"`]e:/g,
    ]) {
      for (const match of body.matchAll(pattern)) {
        const line = body.slice(0, match.index).split('\n').length;
        offenders.push(`${where}:${line} ${match[0]}`);
      }
    }
  }
  assert.deepEqual(
    offenders,
    [],
    `E 表偏移寻址残留：\n${offenders.join('\n')}`,
  );
});

test('yml/E.yml 已撤除（战斗状态不再占用引擎变量表，新档不再写 e 桶）', () => {
  const yml_files = fs.readdirSync(YML_DIR);
  assert.ok(
    !yml_files.includes('E.yml'),
    'yml/E.yml 还在——引擎仍会按它声明建 data.e 桶并写进每个新存档',
  );
});

// —— 写者与读者 ——

test('monster_data：整列写进战斗状态对象，E 表一个键都不写', () => {
  const fixture = create_era_fixture();
  fixture.store.set('item:100', 5);
  fixture.store.set('itemname:100', '狗头人');
  const { monster_data } = fixture.load_module('dungeon/monster-data');
  const { BATTLE_COLUMN, battle_column } = require('#/dungeon/battle-state');
  // 随机源恒 0：等级骰不升级、等级缩放骰（local = 基础等级 ×2 次）全 0
  monster_data(100, BATTLE_COLUMN.DEFENSE_1, -1, -1, -1, seq([0]));
  const row = battle_column(BATTLE_COLUMN.DEFENSE_1);
  // 数据表 100 号：等级 1 / 攻击 1 / 防御 2 / 凌辱类型 1
  assert.equal(row.id, 100, '怪物识别号落在 id');
  assert.equal(row.count, 5, '数量落在 count（库存 5 ≤ 10 时取库存）');
  assert.equal(row.level, 5, '等级 = 基础 1 + 固定加成 4');
  assert.equal(row.attack, 2, '攻击 = 基础 1 × 2 + 等级骰 0');
  assert.equal(row.defense, 4, '防御 = 基础 2 × 2 + 等级骰 0');
  assert.equal(row.rape_type, 1, '凌辱类型落在 rape_type');
  assert.equal(row.boss, 0, '数量 > 1 时不 Boss 化');

  // 数量恰好 1 时 Boss 化（Boss 化的判据是「只有一只」，不是「有多少只」）
  fixture.store.set('item:101', 1);
  monster_data(101, BATTLE_COLUMN.DEFENSE_2, -1, -1, -1, seq([0]));
  assert.equal(battle_column(BATTLE_COLUMN.DEFENSE_2).id, 101);
  assert.equal(battle_column(BATTLE_COLUMN.DEFENSE_2).boss, 1, '单体 Boss 化');
  const e_keys = [...fixture.store.keys()].filter((key) => /^e:/.test(key));
  assert.deepEqual(e_keys, [], 'monster_data 不得再写 E 表');
});

test('monster_data：列号 3/4 的勇者配下与列 0 互不干扰（对象列隔离）', () => {
  const fixture = create_era_fixture();
  fixture.store.set('item:100', 4);
  fixture.store.set('cflag:1:570', 100);
  const { monster_data } = fixture.load_module('dungeon/monster-data');
  const { BATTLE_COLUMN, battle_column } = require('#/dungeon/battle-state');
  battle_column(BATTLE_COLUMN.MINION_A).id = 0;
  battle_column(BATTLE_COLUMN.DEFENSE_1).count = 3;
  monster_data(100, BATTLE_COLUMN.MINION_A, 1, -1, -1, seq([0, 1, 1]));
  assert.equal(battle_column(BATTLE_COLUMN.MINION_A).id, 100);
  assert.equal(battle_column(BATTLE_COLUMN.MINION_A).count, 1);
  assert.equal(
    battle_column(BATTLE_COLUMN.DEFENSE_1).count,
    3,
    '写列 3 不得动列 0 的数量',
  );
});

test('skeleton：等级、攻击、防御一起写对象（原列头 +1/+2/+3）', () => {
  const fixture = create_era_fixture();
  fixture.store.set('cflag:2:501', 3); // 持有者阶层 3
  const { skeleton } = fixture.load_module('dungeon/monster-data');
  const {
    BATTLE_COLUMN,
    battle_column,
    reset_battle_state,
  } = require('#/dungeon/battle-state');
  reset_battle_state();
  skeleton(BATTLE_COLUMN.DEFENSE_3, 2, seq([]));
  const row = battle_column(BATTLE_COLUMN.DEFENSE_3);
  assert.equal(row.id, 190);
  assert.equal(row.level, 4);
  assert.equal(row.attack, 4);
  assert.equal(row.defense, 4);
  assert.equal(row.speed, 0);
  assert.deepEqual(
    [...fixture.store.keys()].filter((key) => /^e:/.test(key)),
    [],
    'skeleton 不得再写 E 表',
  );
});

test('chara-body：胸围变化的重量差不再借 e:1 当临时变量（与「第 1 列等级」解耦）', () => {
  const fixture = create_era_fixture();
  fixture.store.set('cflag:6:453', 1600); // 身高
  fixture.store.set('cflag:6:454', 500); // 体重
  fixture.store.set('cflag:6:458', 500); // 原胸围差
  fixture.store.set('cflag:6:459', 1000); // 原下胸围
  const { char_size_generate } = fixture.load_module('chara/chara-body');
  const size = char_size_generate(6, 18, 1, () => 0);
  assert.deepEqual(size, [18, 18, 1600, 437, 801, 0, 0]);
  assert.equal(
    fixture.battle('DEFENSE_1').level,
    0,
    '第 1 列等级槽不该被身体生成写入',
  );
  assert.equal(
    [...fixture.store.keys()].filter((key) => /^e:/.test(key)).length,
    0,
    '成长路径不再写任何 e 键（引擎变量表已撤除，写进去就是死数据）',
  );
});

test('battle_legacy_reader：旧 E 列 100 槽的三段缺省值（0..10 共享具名字段 / 11..98 缺省 0 / 99 = count）', () => {
  const fixture = create_era_fixture();
  const {
    BATTLE_COLUMN,
    battle_column,
    battle_legacy_reader,
    reset_battle_state,
  } = fixture.load_module('dungeon/battle-state');
  reset_battle_state();
  const row = battle_column(BATTLE_COLUMN.DEFENSE_1);
  const { read, write } = battle_legacy_reader(0); // 基准 = 列头 0

  // 0..10：与具名字段共享（精英路径的 +3 防御确实会改这一列的 defense）
  assert.equal(read(0), 0);
  write(3, 40);
  assert.equal(row.defense, 40, 'offset 3 就是具名字段 defense');
  assert.equal(read(3), 40);
  write(0, 100);
  assert.equal(row.id, 100, 'offset 0 就是具名字段 id');

  // 11..98：单独存，缺省 0（不是 undefined），且互不串写
  for (let offset = 11; offset < 99; offset += 1) {
    assert.equal(read(offset), 0, `offset ${offset} 的读缺省值必须是 0`);
  }
  write(31, 7);
  assert.equal(row.count, 0, 'legacy 槽不得串到 count');
  assert.equal(read(31), 7);
  assert.equal(read(32), 0, 'offset 32 读回 0（与 31 互不串写）');
  assert.equal(row.defense, 40, 'legacy 槽不得串到具名字段');

  // 99：数量槽
  write(99, 3);
  assert.equal(read(99), 3);
  assert.equal(row.count, 3, 'offset 99 就是具名字段 count');

  // 复位把 legacy 槽一起清掉，一列回到「十二个具名字段」的形状
  reset_battle_state();
  assert.deepEqual(row, zero_column());
  assert.equal(read(31), 0, 'legacy 槽复位后读回 0（键已删）');

  // 列号越界时同一条规则（读缺省 0，不抛错）
  const far = battle_legacy_reader(999 * 100);
  assert.equal(far.read(3), 0);
});

// —— 【战斗中能否存档】的机器判据 ——

/**
 * 代码行（保留原行号，跳过注释与空行）。
 *
 * 数调用点时不能把注释里的提及算进去，但要报出「多出来的写点在哪一行」，
 * 所以块注释按等长空白抹掉（换行保留）、行尾 `//` 之后截掉，行号不漂。
 * @param {string} source 模块源码
 * @returns {Array<{line: number, text: string}>}
 */
function code_lines(source) {
  const blanked = source.replace(/\/\*[\s\S]*?\*\//g, (block) =>
    block.replace(/[^\n]/g, ' '),
  );
  const out = [];
  blanked.split('\n').forEach((text, index) => {
    const code = text.replace(/\/\/.*$/, '');
    if (code.trim() === '') {
      return;
    }
    out.push({ line: index + 1, text: code });
  });
  return out;
}

/** `ere/` 下全部 .js 的绝对路径（递归） */
function ere_source_files() {
  const out = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.name.endsWith('.js')) {
        out.push(full);
      }
    }
  };
  walk(ERE_DIR);
  return out.sort();
}

/** 存档写点的调用行（`file:line 代码`），定义行不算 */
function save_game_write_points() {
  const hits = [];
  for (const file of ere_source_files()) {
    const rel = path.relative(REPO_ROOT, file).split(path.sep).join('/');
    for (const { line, text } of code_lines(fs.readFileSync(file, 'utf8'))) {
      // `async function save_game(slot, comment)` 是定义，不是写点
      if (/function\s+save_game\s*\(/.test(text)) {
        continue;
      }
      if (/\bsave_game\s*\(/.test(text)) {
        hits.push(`${rel}:${line} ${text.trim()}`);
      }
    }
  }
  return hits;
}

test('存档入口：玩家存档只有 SHOP 状态一处写点，战斗所在状态够不到它', () => {
  // 结论（工单的前置问题）：战斗中不能存档。证据是调用图的两个端点——
  //   写点：菜单项表里的 [200] → save_game()（#866 起主菜单分发搬进
  //         page-main-menu.js），而它只经 page-shop.js 的 usershop →
  //         dispatch_menu_item 到达，run_shop 只由 STATE.SHOP /
  //         STATE.SHOP_AFTER_LOAD 进入；
  //   战斗：turnend-settle 的 EVENTTURNEND 处理器里 settle_in_train_window
  //         → run_dungeon，同一处理器唯一的转场是尾部的 begin(STATE.SHOP)。
  // 所以战斗期间既没有存档页，也没有回到 SHOP 的转场。断言把这两端钉住，
  // 谁把战斗挪到 SHOP 可达处、或给战斗加一条回 SHOP 的转场，这里就红。
  //
  // 「只有一处」这一半单独由紧随其后的调用点计数钉住：可达性那两条在别处
  // 多一个写点时照样绿（main-loop 与表里的 [200] 都没变），而多一个写点就
  // 等于多一个存档被破坏的口子——#883 的「战斗状态不进存档」正踩在上面。
  const shop = fs.readFileSync(
    path.join(ERE_DIR, 'page', 'page-shop.js'),
    'utf8',
  );
  assert.match(
    shop,
    /const next = await dispatch_menu_item\(result\);/,
    'SHOP 的 usershop 必须仍经菜单分发，存档入口才在 SHOP 的可达面上',
  );
  const main_menu = fs.readFileSync(
    path.join(ERE_DIR, 'page', 'page-main-menu.js'),
    'utf8',
  );
  assert.match(
    main_menu,
    /id: 200,[\s\S]{0,200}?run: \(\) => save_game\(\),/,
    '玩家存档的唯一写点必须仍是菜单项表的 [200] 项',
  );
  const main_loop = fs.readFileSync(
    path.join(ERE_DIR, 'system', 'flow', 'main-loop.js'),
    'utf8',
  );
  assert.match(
    main_loop,
    /\[STATE\.SHOP\]: run_shop/,
    'SHOP 状态必须就是 run_shop（存档页的唯一入口）',
  );
  const turnend = fs.readFileSync(
    path.join(ERE_DIR, 'system', 'turnend-settle.js'),
    'utf8',
  );
  assert.match(
    turnend,
    /await settle_in_train_window\(target_pool\);[\s\S]*?return begin\(STATE\.SHOP\);/,
    '战斗（settle_in_train_window）与回到 SHOP 之间没有中途转场',
  );
  assert.ok(
    !/begin\(STATE\.SHOP\)[\s\S]*await settle_in_train_window/.test(turnend),
    '回到 SHOP 的转场必须在战斗之后，不能在其之前',
  );
});

test('存档写点全库只有一处：菜单项表的 [200] 项（多一处就多一个破坏存档的口子）', () => {
  // 「战斗中不能存档」的「只有」这一半：可达性由上面两条 assert.match 钉，
  // 但谁也保不住别处再长出一枚「保存」按钮——只有数调用点能红。
  // 读档（load_game）有意有两处入口：菜单表 [300] 与标题画面，见
  // page-title.js；存档只有一处是设计，不是遗漏，别为了对称把存档也补齐。
  const hits = save_game_write_points();
  assert.equal(
    hits.length,
    1,
    `存档写点必须恰好 1 处（菜单项表的 [200]），实际 ${hits.length} 处：\n${hits.join('\n')}`,
  );
  assert.match(
    hits[0],
    /^ere\/page\/page-main-menu\.js:\d+ run: \(\) => save_game\(\),$/,
    `唯一写点必须仍是菜单项表的 [200] 项，实际是：${hits[0]}`,
  );
});

// —— 旧档（真引擎） ——

/** 0.1.0 的 yml/E.yml 声明的 60 个序号（旧档 e 桶的键：五列 × 十一字段 + 数量槽） */
const LEGACY_E_IDS = [];
for (let line = 0; line < 5; line += 1) {
  for (let offset = 0; offset < 11; offset += 1) {
    LEGACY_E_IDS.push(line * 100 + offset);
  }
  LEGACY_E_IDS.push(line * 100 + 99);
}

/** 读 yml/GameBase.yml 的一个字段 */
function gamebase_field(name) {
  const text = fs.readFileSync(path.join(YML_DIR, 'GameBase.yml'), 'utf8');
  return JSON.parse(new RegExp(`^"${name}": (.+)$`, 'm').exec(text)[1]);
}

/**
 * 引擎级用例的静态数据：仓库**全部** yml 名字表（与实机装载同一份清单，
 * 不挑表——挑表会让「yml/E.yml 是否在场」这样的差异在用例里看不见）+
 * 角色装载器给的空 chara 桶，gamebase 按调用方给的版本盖戳。
 * @param {object} gamebase 【版本】【游戏标识】【最低支持版本】等
 * @returns {object} staticData
 */
function engine_static_data(gamebase) {
  const loader = create_chara_loader({});
  const variables = create_variable_loader();
  for (const file of fs.readdirSync(YML_DIR)) {
    if (!file.endsWith('.yml') || /^Chara/i.test(file)) {
      continue;
    }
    const table = file.replace(/\.yml$/, '').toLowerCase();
    if (table === 'gamebase') {
      continue;
    }
    variables.load_rows(
      engine.parse_data_file(
        fs.readFileSync(path.join(YML_DIR, file), 'utf8'),
        'yml',
        table,
      ),
      table,
    );
  }
  attach_variable_tables(loader, variables);
  return {
    ...loader.static_data,
    gamebase,
    chara: {
      0: { id: '0', name: '你', callname: '你' },
      ...loader.static_data.chara,
    },
  };
}

/**
 * 造一份「0.1.0 盖戳 + 带战斗残留」的旧档载荷。
 * @returns {object} 载荷（version 取 0.1.0 = 【最低支持版本】1000）
 */
function build_legacy_payload() {
  const version = gamebase_field('最低支持版本');
  const e = Object.fromEntries(LEGACY_E_IDS.map((id) => [id, 0]));
  // 一列满编的战斗残留：第 1 列 3 只 190 号骷髅兵，Boss 化；第 1 列等级槽
  // （e:1）里还留着 chara-body 曾写进去的胸围差 -25
  Object.assign(e, { 0: 190, 1: 37, 2: 12, 3: 9, 8: 1, 99: 3 });
  return { version, code: gamebase_field('游戏标识'), e };
}

engine_test(
  '旧档（0.1.0 盖戳 + e 桶残留）：引擎真 loadData 照常读入，战斗状态从 0 起、残留不再被寻址',
  async () => {
    const fixture = create_era_fixture();
    const { BATTLE_COLUMN, battle_column } = fixture.load_module(
      'dungeon/battle-state',
    );
    const payload = build_legacy_payload();
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ere-battle-state-'));
    const errors = [];
    try {
      const fake_era = {
        path: tmp,
        config: { system: { saveCompressedData: false } },
        global: { saves: {} },
        staticData: engine_static_data({
          // 按 0.1.0 盖戳：引擎闸门是 r.version >= allowVersion
          version: payload.version,
          gameCode: 931060,
          allowVersion: payload.version,
          defaultChara: 0,
        }),
        data: {},
        fieldNames: {},
        extendedTables: {},
        connect: () => {},
        error: (...args) => errors.push(args.join(' ')),
        log: () => {},
      };
      const api = new engine.era_api(fake_era);

      // 基础存档由引擎自己产出（resetData → 写几个战场侧无关的值 →
      // saveData），再往里注入 0.1.0 的 e 桶并把版本回盖到 0.1.0。
      // 注入的只有这一个键：其余全部是引擎写的，与实机存档同形。
      api.resetData();
      api.set('flag:81', 3);
      api.set('callname:0:-1', '你');
      assert.equal(await api.saveData(1, '旧档基线'), true);
      const save_path = path.join(tmp, 'sav', 'save1.sav');
      const base = JSON.parse(fs.readFileSync(save_path, 'utf8'));
      fs.writeFileSync(
        save_path,
        JSON.stringify({ ...base, ...payload, e: payload.e }),
      );
      fake_era.data = {};
      errors.length = 0;

      assert.equal(
        await api.loadData(1),
        true,
        '0.1.0 的存档必须仍然读得回来（ADR-0006 玩家存档保护）',
      );

      // 战斗状态是纯内存的：读档之后从 0 起，不会从旧档的残留里「恢复」
      assert.equal(battle_column(BATTLE_COLUMN.DEFENSE_1).id, 0);
      assert.equal(battle_column(BATTLE_COLUMN.DEFENSE_1).count, 0);

      // 旧档里的 e 桶成了无人认领的残留：引擎对它照旧「二段地址读 data」
      // （setVar 的 case 2 在 data[表] 存在时直接返回 this.data[表][下标]），
      // 所以 api.get('e:1') 还能读回 37——但全库已经没有这条地址（上一条
      // 用例逐文件扫过），玩家的战斗状态一律来自内存对象。残留既不报错、
      // 也不参与任何判定，这是「不构成破坏性改动」的实测依据。
      assert.equal(
        api.get('e:1'),
        37,
        '旧档的残留仍挂在 data.e 上（引擎照旧读得到），只是没人再读它',
      );
      assert.deepEqual(errors, [], '读档与残留读取都不报错');
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  },
);

engine_test('新档：战斗状态不再占存档空间（载荷里没有 e 桶）', async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ere-battle-state-new-'));
  try {
    const fake_era = {
      path: tmp,
      config: { system: { saveCompressedData: false } },
      global: { saves: {} },
      staticData: engine_static_data({
        version: gamebase_field('版本'),
        gameCode: gamebase_field('游戏标识'),
        allowVersion: gamebase_field('最低支持版本'),
        defaultChara: 0,
      }),
      data: {},
      fieldNames: {},
      extendedTables: {},
      connect: () => {},
      error: () => {},
      log: () => {},
    };
    const api = new engine.era_api(fake_era);
    api.resetData();
    assert.equal(await api.saveData(2, '战斗状态不落盘'), true);
    const saved = JSON.parse(
      fs.readFileSync(path.join(tmp, 'sav', 'save2.sav'), 'utf8'),
    );
    assert.equal(
      Object.prototype.hasOwnProperty.call(saved, 'e'),
      false,
      '新档里不得再有 e 桶（战斗状态是普通对象，不参与序列化）',
    );
    // 没有 e 桶 → 二段地址查不到表，引擎只记一条 key error 并返回 undefined
    assert.equal(api.get('e:1'), undefined, '新档里 e:1 读不出任何东西');
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
