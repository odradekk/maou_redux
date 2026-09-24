/**
 * @file #541：存根清单四张表的「状态词」与「未了结行数」。
 *
 * 判定面在 tools/trace-coverage.mjs（`--coverage` 每次都核对）：四张表每行的
 * 末格是状态列，取值只有三类——
 *
 *   已实现（…）／存根（…）／判死终态（判死｜不移植｜不实现｜不可达｜落空）。
 *
 * 分组标题行（首格以「——」开头、其余各格全空）没有状态列，跳过；表头行与
 * 分隔行同样不计。见 docs/stub-registry.md 的「状态含义」与「维护规则」。
 *
 * **规则先由合成样本表证明，真树清单只作一次「现状合规」的对照**：反过来
 * （只读现网清单）会让清单自身的错词跟着一起绿——那是 #541 要根除的形态
 * （第 6 条的检查要求，见工单）。
 */

'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');

const {
  DEAD_MARKERS,
  check_registry_statuses,
  check_stub_names,
  classify_status,
  collect_stub_line_names,
  collect_try_kojo_names,
  is_group_title_row,
  list_ere_js,
  parse_registry_tables,
  parse_stubbed_calls,
  split_row_cells,
} = require('../tools/trace-coverage.mjs');
const { create_era_fixture } = require('./helpers/era-fixture');

const REPO_ROOT = path.resolve(__dirname, '..');
const REGISTRY = path.join(REPO_ROOT, 'docs', 'stub-registry.md');
const TOOL = path.join(REPO_ROOT, 'tools', 'trace-check.mjs');

/** 合成样本的表格行（前导空格照真表写，拆格必须自己 trim） */
function sample_registry(rows_by_table) {
  const out = ['# 合成样本清单', ''];
  for (const [title, rows] of rows_by_table) {
    out.push(`## ${title}`, '', '| 甲 | 乙 | 状态 |', '| --- | --- | --- |');
    for (const row of rows) out.push(`| ${row.join(' | ')} |`);
    out.push('');
  }
  return out.join('\n');
}

test('拆格：正文里的 \\| 是字面竖线，不参与分列（#541）', () => {
  // 真表两处实例：变量表 `24\|17`（Chara24 预设的相性）、@USERSHOP 的
  // `FLAG:83 \| FLAG:84` 守卫。按裸 | 拆会把内容格劈成两半、末格取错。
  assert.deepEqual(
    split_row_cells('| `相性` | :46 | `24\\|17` | 已实现（#139） |'),
    ['`相性`', ':46', '`24\\|17`', '已实现（#139）'],
  );
  assert.deepEqual(
    split_row_cells(
      '| 111 | 守卫 FLAG:83 \\| FLAG:84 | （无） | 存根（#541） |',
    ),
    ['111', '守卫 FLAG:83 \\| FLAG:84', '（无）', '存根（#541）'],
  );
});

test('状态词三类：四个标准前缀各自归类，去向与本票号一律判非法（#541）', () => {
  assert.equal(classify_status('已实现（ere/page/page-shop.js）'), 'settled');
  assert.equal(
    classify_status('存根（运行时占位，ere/page/page-shop.js）'),
    'pending',
  );
  for (const word of DEAD_MARKERS) {
    assert.equal(classify_status(`${word}（#14 登记）`), 'dead', word);
  }
  assert.deepEqual(DEAD_MARKERS, [
    '判死',
    '不移植',
    '不实现',
    '不可达',
    '落空',
  ]);

  // 现状里出现过的「只写去向」形态与空状态格：三类之外一律非法
  for (const bad of [
    '处刑票',
    '迷宫票',
    '调试票',
    '魔改子系统票',
    '设定票',
    '刻印消费者票',
    '调教票（表落地时补）',
    '表现层票（#73）',
    '纸娃娃合成系统票',
    '#44（ere/page/page-shop.js）',
    '已落地（#138）',
    '真身（ere/system/train/benki.js）',
    '',
    '   ',
  ]) {
    assert.equal(classify_status(bad), 'invalid', bad);
  }
});

test('分组标题行：首格以 —— 开头即认，其余各格必须全空（#541 订正）', () => {
  const title = split_row_cells(
    '| —— #118 结局判定与 ENDING_1 链（条件结构已 1:1 移植） |  |  |  |  |  |',
  );
  assert.ok(is_group_title_row(title));

  // 有状态格的行不是标题行；首格不是 —— 开头的也不是
  assert.equal(
    is_group_title_row(
      split_row_cells('| `GEO_TEST` | 迷宮/LABO.ERB:109 | 已实现（#181） |'),
    ),
    false,
  );
  assert.equal(
    is_group_title_row(split_row_cells('| 100 | 进调教 | 存根（#541） |')),
    false,
  );
  // 以 —— 开头但其余格非空：那是忘写状态的数据行，不能当标题放过
  assert.equal(
    is_group_title_row(split_row_cells('| —— 分组标题 | 说明 |')),
    false,
  );
});

test('四张表逐行统计：三类各计一行，未了结行数按表汇总（合成样本）', () => {
  const text = sample_registry([
    [
      '函数级存根',
      [
        ['`A`', '源A', '已实现（#1）'],
        ['`B`', '源B', '存根（运行时占位）'],
        ['—— 分组标题（无状态）', '', '', '', ''],
        ['`C`', '源C', '判死（#2）'],
      ],
    ],
    [
      '变量级待办项',
      [
        ['`D`', ':10', '不移植（#3）'],
        ['`E`', ':11', '存根（未接入）'],
      ],
    ],
    ['资源级待办项', [['F', '源F', '不可达（无作用点）']]],
    ['@USERSHOP 指令分支待办项', [['1', 'CALL X', '落空（静默）']]],
  ]);

  const { tables, failures } = check_registry_statuses(text);
  assert.deepEqual(failures, []);
  assert.deepEqual(
    tables.map((t) => [t.title, t.settled, t.pending, t.dead]),
    [
      ['函数级存根', 1, 1, 1],
      ['变量级待办项', 0, 1, 1],
      ['资源级待办项', 0, 0, 1],
      ['@USERSHOP 指令分支待办项', 0, 0, 1],
    ],
  );
  assert.equal(
    tables.reduce((sum, t) => sum + t.pending, 0),
    2,
    '未了结合计 = 四张表的存根行之和',
  );
});

test('四张表逐行统计：非标准状态词必须报出表、行号与原文（合成样本）', () => {
  const text = sample_registry([
    [
      '函数级存根',
      [
        ['`A`', '源A', '已实现（#1）'],
        ['`B`', '源B', '处刑票'],
      ],
    ],
    ['变量级待办项', [['`C`', ':11', '']]],
  ]);

  const { tables, failures } = check_registry_statuses(text);
  assert.equal(failures.length, 2, failures.join('\n'));
  // 工具的报错文案固定成这个形状（变异条目的 must_mention 与本断言都靠它）：
  // 「✗ 存根清单状态词不在三类里：docs/stub-registry.md:<行>（<表名>）末格写的是「<原文>」…」
  assert.ok(
    failures[0].includes('存根清单状态词不在三类里'),
    `必须报出「状态词不在三类里」这个判定：${failures[0]}`,
  );
  assert.ok(
    failures[0].includes('函数级存根') && failures[0].includes('处刑票'),
    `必须报出表名与原文：${failures[0]}`,
  );
  assert.match(failures[0], /:8/, `必须报出 markdown 行号：${failures[0]}`);
  assert.ok(
    failures[1].includes('变量级待办项'),
    `空状态格同样非法：${failures[1]}`,
  );
  assert.deepEqual(
    tables.map((t) => t.pending),
    [0, 0],
    '非法行不计入任何一类（否则「未了结」少算一行）',
  );
});

test('四张表的定位：表头与分隔行不算数据行，缺表即少一张（合成样本）', () => {
  const sections = parse_registry_tables(
    sample_registry([
      [
        '函数级存根',
        [
          ['`A`', '源A', '已实现（#1）'],
          ['`B`', '源B', '存根（#541）'],
        ],
      ],
    ]),
  );
  assert.equal(sections.length, 1, '维护规则一类无表格的小节不入账');
  assert.equal(sections[0].title, '函数级存根');
  assert.equal(sections[0].rows.length, 4, '表头 + 分隔 + 两行数据都进 rows');
  assert.deepEqual(sections[0].rows[0].cells, ['甲', '乙', '状态']);
  assert.equal(sections[0].rows[0].frame, true, '表头要打 frame 标');
  assert.equal(sections[0].rows[1].frame, true, '分隔行要打 frame 标');
  assert.equal(sections[0].rows[2].frame, undefined, '数据行不带 frame 标');
});

test('真树清单：四张表齐全、无非标准状态词，未了结行数打印（现状对照）', () => {
  const text = fs.readFileSync(REGISTRY, 'utf8');
  const { tables, failures } = check_registry_statuses(text);
  assert.deepEqual(failures, [], failures.join('\n'));
  assert.deepEqual(
    tables.map((t) => t.title),
    [
      '函数级存根',
      '变量级待办项（初始化赋值无处落地或刻意缓议）',
      '资源级待办项（美术与音频，#69 起登记）',
      '@USERSHOP 指令分支待办项（#24 整组登记；100 分支已随 #44 实现）',
    ],
    '四张表一张都不能少——少了表，未了结行数会静默变小',
  );
  for (const t of tables) {
    assert.ok(
      t.settled + t.pending + t.dead > 0,
      `${t.title} 一行都没统计到（表名或行形态失效）`,
    );
  }
  // 这里不断言「函数表还有存根」：#540 的终点就是四张表清零，把现状当契约
  // 会在清空那天误报。计数本身会不会恒 0，由合成样本用例（三类各计一行）
  // 与上面的「每张表至少统到一行」两条正面锁住。
});

test('真树清单：--coverage 打印的四张表计数与统计值逐项一致（现状对照）', () => {
  const { tables } = check_registry_statuses(fs.readFileSync(REGISTRY, 'utf8'));
  const r = spawnSync(process.execPath, [TOOL, '--coverage', '--list'], {
    cwd: REPO_ROOT,
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
    timeout: 120_000,
  });
  const output = `${r.stdout || ''}${r.stderr || ''}`;
  assert.equal(r.status, 0, `真树 --coverage 应全绿：\n${output}`);
  for (const t of tables) {
    assert.ok(
      output.includes(
        `${t.title} 已实现 ${t.settled}／存根 ${t.pending}／终态 ${t.dead}`,
      ),
      `打印的「${t.title}」计数与统计值不一致：\n${output}`,
    );
  }
  const pending = tables.reduce((sum, t) => sum + t.pending, 0);
  assert.ok(
    output.includes(`存根清单存根行合计 ${pending} 行`),
    `打印的存根行合计数与四张表的存根行数不一致（#540 终点判据读的就是这个数）：\n${output}`,
  );
  // #541 第 2 条的两个源订正：BEDROOM_BATTLE_MALE 的源落回 ENDING ver 1.0.1.ERB
  // 之后，DUNGEON_BATLLE2.ERB 不再被它拖住——这条一直成立，退回去就是红
  assert.ok(
    output.includes('已移植 target/ERB/迷宮/DUNGEON_BATLLE2.ERB') &&
      !output.includes('部分移植 target/ERB/迷宮/DUNGEON_BATLLE2.ERB'),
    `DUNGEON_BATLLE2.ERB 必须判已移植（BEDROOM_BATTLE_MALE 的源在 EVENT/ENDING ver 1.0.1.ERB:1042，不在它身上）：\n${output}`,
  );
});

test('探针：清单里写一个非标准状态词，--coverage 必须红并报出（副本）', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ere-registry-probe-'));
  try {
    // 判定面最小集：工具本体（tools/ 含 trace-refs 锚表）、清单、一个
    // target 源（list_erb_files 要 target/ERB 存在）、空 ere/（注释块扫描
    // 要目录存在）。--only 限定范围跳过分母与基线核对——那两道与本用例无关。
    for (const rel of [
      'tools',
      'docs/stub-registry.md',
      'target/ERB/TITLE.ERB',
    ]) {
      const from = path.join(REPO_ROOT, rel);
      const to = path.join(root, rel);
      fs.mkdirSync(path.dirname(to), { recursive: true });
      if (fs.statSync(from).isDirectory())
        fs.cpSync(from, to, { recursive: true });
      else fs.copyFileSync(from, to);
    }
    fs.mkdirSync(path.join(root, 'ere'), { recursive: true });
    const registry_path = path.join(root, 'docs', 'stub-registry.md');
    const probe_row = '| `ZZ_PROBE` | 迷宮/LABO.ERB:109 | 迷宫票 |\n';
    fs.writeFileSync(
      registry_path,
      fs
        .readFileSync(registry_path, 'utf8')
        .replace('\n## 变量级待办项', `\n${probe_row}\n## 变量级待办项`),
      'utf8',
    );
    const r = spawnSync(
      process.execPath,
      [
        path.join(root, 'tools', 'trace-check.mjs'),
        '--coverage',
        '--only',
        'ZZ_PROBE',
      ],
      {
        cwd: root,
        encoding: 'utf8',
        maxBuffer: 16 * 1024 * 1024,
        timeout: 120_000,
      },
    );
    const output = `${r.stdout || ''}${r.stderr || ''}`;
    assert.notEqual(
      r.status,
      0,
      `非标准状态词必须让 --coverage 红：\n${output}`,
    );
    assert.ok(
      output.includes('状态词') && output.includes('迷宫票'),
      `必须报出状态词与原文：\n${output}`,
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

// —— #542：本票判死的八行棘轮 ——

test('真树清单：#542 判死的八行状态格以判死词开头（退回存根/待认领即红）', () => {
  const lines = fs.readFileSync(REGISTRY, 'utf8').split(/\r?\n/);
  /** 取某行按未转义 | 拆出的第 n 格（负数从末尾数；正文里的 \| 是字面竖线） */
  const cell_of = (row, n) =>
    row
      .split(/(?<!\\)\|/)
      .slice(1, -1)
      .at(n)
      .trim();

  // [行首定位子串（全表唯一）, 状态格必须以该判死词开头]
  const ruled = [
    ['| `MODLIST`/`CONFIG_MODLIST`', '不移植'],
    ['| `PTJ_BUTTON`', '不移植'],
    ['| `更换立绘`', '不移植'],
    ['| `大书库.mp3` 播放/停止点', '不移植'],
    ['| SETBGMVOLUME（逐曲音量）', '不移植'],
    ['| MOD_SWITCH 音声设置界面', '不移植'],
    ['| 背景音乐音量声明默认值 66', '落空'],
    ['| 999 ', '不移植'],
  ];
  for (const [key, prefix] of ruled) {
    const hits = lines.filter((line) => line.startsWith(key));
    assert.equal(hits.length, 1, `定位子串必须唯一命中一行：${key}`);
    const status = cell_of(hits[0], -1);
    assert.ok(
      DEAD_MARKERS.some((m) => status.startsWith(m)) &&
        status.startsWith(prefix),
      `#542：${key} 的状态格必须以「${prefix}」开头的判死终态，实际：${status.slice(0, 40)}`,
    );
  }
});

// —— #565：代码里的存根名 ↔ 清单状态 ——

test('收集器：stub_line 名字容忍多行调用，jsdoc 里引用的字样不计（#565）', () => {
  const source = [
    `
    /**
     * 调用点说明：train/juel-check.js 内已有的 stub_line('CHECK_SPECIALSKIL', …)
     */
    "use strict";
    stub_line(
      'TRAIN_MESSAGE_B',
      '指令 12 的情景描写',
    );
    await stub_line_wait('ST_UP', '按等级的基础数值初始化');
  `,
  ].join('\n');
  assert.deepEqual(collect_stub_line_names(source).sort(), [
    'ST_UP',
    'TRAIN_MESSAGE_B',
  ]);
});

test('收集器：STUBBED_CALLS 的字面项与 spread 标识符分开解析（#565）', () => {
  const source = [
    `
    const STUBBED_CALLS = [...STUBBED_ABLUP_NAMES, 'CHECK_SPECIALSKIL'];
  `,
  ].join('\n');
  assert.deepEqual(parse_stubbed_calls(source), {
    literals: ['CHECK_SPECIALSKIL'],
    spreads: ['STUBBED_ABLUP_NAMES'],
    errors: [],
  });
  assert.equal(parse_stubbed_calls('const X = [];'), null);
});

test('收集器：元素前的注释剥掉再认，解析不了的元素必须进 errors（#565 审查）', () => {
  // 反例来源：审查实测——元素前加一行注释，旧版把 'CHECK_SPECIALSKIL'
  // 连注释一起塞进 spread（静默消失），已实现名就这样漏出守卫
  const commented = [
    'const STUBBED_CALLS = [',
    '  // 待接入调用',
    "  'CHECK_SPECIALSKIL',",
    '  ...REST, // 行尾注释也不影响',
    '];',
  ].join('\n');
  assert.deepEqual(parse_stubbed_calls(commented), {
    literals: ['CHECK_SPECIALSKIL'],
    spreads: ['REST'],
    errors: [],
  });
  // 坏形（双引号名 / 裸标识符）不得静默：进 errors 由调用方判红
  const broken = [
    'const STUBBED_CALLS = [',
    '  "DOUBLE_QUOTED",',
    '  bareWord,',
    '];',
  ].join('\n');
  assert.deepEqual(parse_stubbed_calls(broken), {
    literals: [],
    spreads: [],
    errors: ['"DOUBLE_QUOTED"', 'bareWord'],
  });
});

test('收集器：无插值模板串的 stub_line 名也要收（#565 审查）', () => {
  const source = [
    "const { stub_line } = require('#/utils/stub-line');",
    'stub_line(`CHECK_SPECIALSKIL`, `占位`);',
  ].join('\n');
  assert.deepEqual(collect_stub_line_names(source), ['CHECK_SPECIALSKIL']);
});

test('收集器：try_kojo_or_stub 的第二实参名也收（多行调用形态，#565 返工）', () => {
  const source = [
    'const x = await try_kojo_or_stub(',
    '  dungeon_attack_family,',
    "  'ATTACK_KOUJO_B',",
    "  '攻击口上（B 侧）',",
    '  cid,',
    ');',
    "// jsdoc 里的 try_kojo_or_stub(fam, 'GOBI_KOUJO' 字样不计",
  ].join('\n');
  assert.deepEqual(collect_try_kojo_names(source), ['ATTACK_KOUJO_B']);
});

test('收集器：family 实参后的行尾注释不挡锚名（attack_koujo_b 形态，#549）', () => {
  // 真树里 attack_koujo_b 的调用把 TRYCALLFORM 拼名式写在 family 实参后
  // （ere/kojo/kojo-system.js），#565 落地时收集器没覆盖这种形态、该锚名
  // 一直没进核对——#549 全量变异的 M8946 红暴露失明
  const source = [
    'const x = await try_kojo_or_stub(',
    '  dungeon_attack_family, // TRYCALLFORM DUNGEON_ATTACK_K{LOCAL - 100}',
    "  'ATTACK_KOUJO_B',",
    "  '攻击口上（B 侧）',",
    '  cid,',
    ');',
  ].join('\n');
  assert.deepEqual(
    collect_try_kojo_names(source),
    ['ATTACK_KOUJO_B'],
    'family 实参带行尾注释的调用点，锚名也要收进核对',
  );
});

test('核对分流：try_kojo 名字找到清单行即放行（「已实现」不红），缺行红（#565 返工）', () => {
  const text = sample_registry([
    [
      '函数级存根',
      [
        ['`ATTACK_KOUJO`', '源A', '已实现（ere/kojo/kojo-system.js 的族分发）'],
        ['`GOBI_KOUJO`', '源B', '已实现（ere/chara/look.js 的语尾段）'],
      ],
    ],
  ]);
  const entries = [
    { file: 'ere/kojo/kojo-system.js', name: 'ATTACK_KOUJO', via: 'try_kojo' },
    { file: 'ere/kojo/kojo-system.js', name: 'GOBI_KOUJO', via: 'try_kojo' },
  ];
  assert.deepEqual(
    check_stub_names(entries, text),
    [],
    'try_kojo 通道不打占位，「已实现」行是正常状态，不得按 stub_line 规则红',
  );
  assert.ok(
    check_stub_names(
      [
        {
          file: 'ere/kojo/kojo-system.js',
          name: 'GHOST_KOUJO',
          via: 'try_kojo',
        },
      ],
      text,
    ).some((m) => m.includes('口上核对锚失联') && m.includes('GHOST_KOUJO')),
    'try_kojo 名字缺清单行必须红（失联后该通道没有任何机械核对）',
  );
  // 同名在 stub_line 通道仍是原规则（已实现 → 红）
  assert.ok(
    check_stub_names(
      [{ file: 'ere/kojo/kojo-system.js', name: 'ATTACK_KOUJO' }],
      text,
    ).some((m) => m.includes('已实现函数仍在打占位')),
    'stub_line 通道规则不变（回归护栏）',
  );
});

test('核对：名字必须对应「存根/终态」行——已实现行、缺行都红（合成样本，#565）', () => {
  const text = sample_registry([
    [
      '函数级存根',
      [
        ['`WIRED_ONE`', '源A', '已实现（ere/x.js 的 wired_one）'],
        ['`PENDING_ONE`', '源B', '存根（运行时占位，随下一票）'],
        ['`DEAD_ONE`', '源C', '不可达（#1 主菜单无此按钮）'],
        // 同名双行：实现行 + 调用点存根行（RANDOM_SELF_CALL 形态）
        ['`DUAL`', '源D1', '已实现（ere/d.js）'],
        ['`DUAL`', '源D2', '存根（ere/page/p.js 的调用点，随 S5）'],
        // 一行多名（COM64 / COM120 形态）
        ['`COM64` / `COM120`（升格跳转目标）', '源E', '存根（随下一票）'],
      ],
    ],
    [
      '@USERSHOP 指令分支待办项',
      [
        // 按编号登记的行：名字藏在「原作行为」列的 CALL 里（400 → LABO 形态）
        ['400', 'CALL LABO（:148；面板无此按钮）', '不可达（#181）'],
        ['103', 'CALL 批量处刑（:110）', '已实现（#543）'],
      ],
    ],
  ]);

  // 故意写错的用例（工单第 4 条）：WIRED_ONE 的行是「已实现」——函数已落
  // 真身时调用点必须接线，检查必须红并点名
  const failures = check_stub_names(
    [
      { file: 'ere/system/train/wired.js', name: 'WIRED_ONE' },
      { file: 'ere/page/page-x.js', name: 'GHOST_ONE' },
      { file: 'ere/dungeon/dungeon-y.js', name: 'PENDING_ONE' },
      { file: 'ere/dungeon/dungeon-z.js', name: 'DEAD_ONE' },
      { file: 'ere/chara/chara-d.js', name: 'DUAL' },
      { file: 'ere/system/train/com-x.js', name: 'COM120' },
      { file: 'ere/page/page-shop.js', name: 'LABO' },
    ],
    text,
  );
  assert.equal(failures.length, 2, failures.join('\n'));
  assert.match(
    failures[0],
    /已实现函数仍在打占位：ere\/system\/train\/wired\.js 的「WIRED_ONE」/,
    '已实现行的名字必须点名报错',
  );
  assert.match(
    failures[1],
    /存根名无清单行：ere\/page\/page-x\.js 的「GHOST_ONE」/,
    '没登记的名字必须报缺行',
  );
  // 中文名（批量处刑）不进索引也不误匹配——代码侧不会出现非 ASCII 的
  // stub_line 名（模板与字面都是 ASCII），无需为它造条目
});

test('真树：ere/ 全部 stub_line 名与 STUBBED_CALLS 字面名都对应存根/终态行；try_kojo 名都有清单行（现状对照，#565）', () => {
  const registry_text = fs.readFileSync(REGISTRY, 'utf8');
  const entries = [];
  for (const rel of list_ere_js(REPO_ROOT)) {
    const text = fs.readFileSync(path.join(REPO_ROOT, rel), 'utf8');
    for (const name of collect_stub_line_names(text)) {
      entries.push({ file: rel, name });
    }
    for (const name of collect_try_kojo_names(text)) {
      entries.push({ file: rel, name, via: 'try_kojo' });
    }
    const stubbed = parse_stubbed_calls(text);
    const bad_items = stubbed?.errors ?? [];
    assert.deepEqual(
      bad_items,
      [],
      `${rel} 的 STUBBED_CALLS 名单有解析不了的元素（只认单引号字面名与 ...spread）`,
    );
    if (stubbed !== null) {
      for (const name of stubbed.literals) {
        entries.push({ file: rel, name });
      }
    }
  }
  // 下限随 #540 清零进程逐票下调（#547 合并后真树剩 7 名、清单存根行 0；
  // #548 后 8 名、#565 起草时 17 名）。剩的是对应终态行的占位名，全清后
  // 本断言随终态清点一并退役
  assert.ok(
    entries.length >= 5,
    '收集面塌了（终态占位名尚未清零，收集器失效即红）',
  );
  assert.deepEqual(
    check_stub_names(entries, registry_text),
    [],
    '已实现函数的调用点不得再打占位（#565 接线票的机械守卫）',
  );
});

test('真树：STUBBED_CALLS 的 spread 名单经夹具取运行时值核对（juel-check / page-ability-up，#565）', async () => {
  // `[...STUBBED_ABLUP_NAMES]` 是 ABLUP_IDS 与 ABLUP_HANDLERS 的差集，
  // 静态求不了值——真身以模块导出为准（当前为空数组：全部 ABLUP 编号
  // 已有处理器）。将来往 ABLUP_IDS 加号而补不上处理器时，这里会抓到
  // `ABLUP<n>` 名字，清单必须为它登记「存根」行。
  const fixture = create_era_fixture();
  const registry_text = fs.readFileSync(REGISTRY, 'utf8');
  const entries = [];
  for (const mod of ['system/train/juel-check', 'page/page-ability-up']) {
    const { STUBBED_CALLS } = fixture.load_module(mod);
    for (const name of STUBBED_CALLS ?? []) {
      entries.push({ file: `ere/${mod}.js`, name });
    }
  }
  assert.deepEqual(check_stub_names(entries, registry_text), []);
});
