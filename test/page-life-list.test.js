/**
 * @file ere/page/page-life-list.js 的行为测试（issue #397 / N13 段 3）。
 *
 * 源: target/ERB/SHOP/LIFE_LIST.ERB 全 8 函数。
 *
 * 接缝 = test/helpers/era-fixture.js：经唯一夹具观察玩家输出行与变量读写，
 * 不断言模块内部辅助函数。一行 = 网格的两个格（编号按钮格 + 正文文本格，
 * 共享同一 row 号）；断言按行取格拼接。
 *
 * 维度型判据一律表驱动走完整维度（覆盖面标准，阶段 5a 的实测差异所在）：
 *   - 三类分页（LIFE_LIST 全量 / ENEMY 的 CFLAG:1==2 / SALAVE 的六种状态）
 *     的判据整表走完，SALAVE 的六放行 + 七拦截逐档验证；
 *   - 行尾标签（爱慕/淫乱/未沦陷 × ☆ × 可被卖 × 可作为助手 × 虫寄生四种
 *     素质 × 妊娠 153/341/342/343 × 派遣）逐维走完；
 *   - 页数算式（MAX_PAGE_*）含整除与余数两侧边界。
 */

'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/** 加一名角色（预设 + addCharacter），与 page-chara-info.test.js 同款 */
function add_chara(fixture, cid, name = `角色${cid}`) {
  fixture.seed_chara(cid, { id: cid, name, callname: name });
  assert.equal(fixture.era.addCharacter(cid), true);
}

/** 建一个三人档：魔王 0 + 奴隶 1、2（等级/状态由各用例自设） */
function three_chara() {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '玛奥');
  add_chara(fixture, 2, '菲娅');
  return fixture;
}

/** 某编号那一行的按钮格 */
function button_of(fixture, accelerator) {
  return fixture.lines.find(
    (l) => l.type === 'button' && l.accelerator === accelerator,
  );
}

/** 某编号那一行的正文文本格（同 row 的非按钮格拼接） */
function row_text(fixture, accelerator) {
  const button = button_of(fixture, accelerator);
  assert.ok(button, `未找到编号 ${accelerator} 的行`);
  return fixture.lines
    .filter((l) => l.row === button.row && l.type !== 'button')
    .map((l) => l.text)
    .join('');
}

/** 某编号那一行的正文片段（保留 {content, color} 结构，供颜色断言） */
function row_fragments(fixture, accelerator) {
  const button = button_of(fixture, accelerator);
  assert.ok(button, `未找到编号 ${accelerator} 的行`);
  return fixture.lines
    .filter((l) => l.row === button.row && l.type !== 'button')
    .flatMap((l) => l.content);
}

/** 全部行的编号（按渲染序） */
function row_ids(fixture) {
  return fixture.lines
    .filter((l) => l.type === 'button')
    .map((l) => l.accelerator);
}

/** 全部纯文本行 */
function text_lines(fixture) {
  return fixture.lines.filter((l) => l.type === 'text').map((l) => l.text);
}

/** 空白折叠（定宽填充的断言看 squeeze 形态，逐字宽度另有专项用例） */
function squeeze(s) {
  return s.replace(/\s+/g, ' ').trim();
}

/** 定宽填充的 F(n 个空格) 写法，读用例时看得出字段宽 */
const SP = (n) => '\u00A0'.repeat(n); // #577：对齐补位 NBSP 化后的期望形态

// —— @LIFE_LIST：表头三档（:23-32）——

test('LIFE_LIST：MODE 三档表头整表驱动（0 可强化地下城 / 1 普通 / 2 无表头）', () => {
  // MODE 0 = 表头写「你（可强化地下城）」字面量；1（缺省）= 写魔王名；
  // 2 = 只画列表、不画表头。三档各跑一遍。
  for (const mode of [0, 1, 2]) {
    const fixture = three_chara();
    const { life_list } = fixture.load_module('page/page-life-list');
    life_list(0, mode, 20);
    const header = button_of(fixture, 0);
    if (mode === 2) {
      assert.equal(header, undefined, 'MODE 2 不应有表头行（分支体为空）');
      continue;
    }
    assert.ok(header, `MODE ${mode} 应有表头行（魔王 0 号）`);
    assert.equal(header.rendered, '[0]', '编号格渲染成 [0]（showAcc 假）');
    // 名字字段宽 = MAX_NAME_LEN(4) + 8 = 12；等级右对齐宽 = 1
    assert.equal(
      row_text(fixture, 0),
      // MODE 0 的名字是字面量（显示宽 18 > 字段宽 12，不补空格）；
      // MODE 1 的魔王名『你』补到 12 再空 8 格
      mode === 0 ? '你（可强化地下城）LV0' : `你${SP(10)}${SP(8)} LV0`,
      `MODE ${mode} 表头正文`,
    );
  }
});

test('LIFE_LIST：字段宽随数据变化（名字字段 = 最长名 + 8，等级右对齐取值位宽）', () => {
  // MAX_NAME_LEN 取全体已加入角色名字的显示宽度最大值、MAX_LV_LEN 取等级
  // 字符串长度最大值（原作 :15-21 的 MAX/STRLENS 循环）。
  const fixture = three_chara();
  fixture.store.set('cflag:1:9', 123); // 等级 123 → 宽 3
  const { life_list } = fixture.load_module('page/page-life-list');
  life_list(0, 1, 20);
  // 最长名仍是 4（玛奥/菲娅），等级宽变 3：1 号行等级右对齐到 3 位
  assert.equal(
    squeeze(row_text(fixture, 1)),
    '玛奥 LV123<未沦陷>',
    '等级宽 3 时 123 不补空格',
  );
  assert.equal(
    row_text(fixture, 2),
    `菲娅${SP(8)}  ${SP(7)} LV${SP(2)}0<未沦陷>${SP(5)}`,
    '等级 0 在宽 3 的字段里右对齐补 2 空格',
  );
});

// —— @LIFE_LIST / @LIFE_LIST_ITEM：行尾标签逐维（:46-85 / :99-139）——

test('LIFE_LIST：行尾标签按判据逐维驱动（沦陷 × ☆ × 可被卖 × 助手 × 虫寄生 × 妊娠 × 派遣）', () => {
  // 行尾 = 沦陷标签 →（无 ☆ 时 5 空格占位）→ 可被卖 → 可作为助手 →
  // 虫寄生 → 妊娠 → 派遣，逐条判据独立开关，故整表按「本条用例期望的
  // 完整行尾」写（含占位空格），不做空白折叠。
  const CASES = [
    // [用例名, 预置, 期望的行尾]
    ['未沦陷', {}, `<未沦陷>${SP(5)}`],
    ['爱慕', { 'talent:1:85': 1 }, `<爱  慕>${SP(5)}`],
    ['淫乱', { 'talent:1:76': 1 }, `<淫  乱>${SP(5)}`],
    [
      '爱慕优先于淫乱',
      { 'talent:1:85': 1, 'talent:1:76': 1 },
      `<爱  慕>${SP(5)}`,
    ],
    ['☆ 顶掉占位空格', { 'cflag:1:700': 1 }, '<未沦陷> [☆]'],
    ['可被卖', { 'cflag:1:0': 1, 'base:1:0': 1 }, `<未沦陷>${SP(5)}[可被卖]`],
    // CFLAG:0 == 0（未驯服）时没有 [可被卖]——判据是 > 0 而非 >= 0
    ['未驯服不出可被卖', { 'cflag:1:0': 0, 'base:1:0': 1 }, `<未沦陷>${SP(5)}`],
    // CFLAG:0 == 2（助手役）同时满足『可被卖』的 CFLAG:0 > 0，两条 SIF
    // 独立判定、tags 叠加（原作 :67-70 是两个 SIF，不是二选一）
    [
      '可作为助手（同时命中可被卖）',
      { 'cflag:1:0': 2, 'base:1:0': 1 },
      `<未沦陷>${SP(5)}[可被卖][可作为助手]`,
    ],
    ['虫寄生190', { 'talent:1:190': 1 }, `<未沦陷>${SP(5)}[虫寄生]`],
    ['虫寄生191', { 'talent:1:191': 1 }, `<未沦陷>${SP(5)}[虫寄生]`],
    ['虫寄生192', { 'talent:1:192': 1 }, `<未沦陷>${SP(5)}[虫寄生]`],
    ['虫寄生193', { 'talent:1:193': 1 }, `<未沦陷>${SP(5)}[虫寄生]`],
    ['妊娠153', { 'talent:1:153': 1 }, `<未沦陷>${SP(5)}[妊娠]`],
    ['妊娠341', { 'talent:1:341': 1 }, `<未沦陷>${SP(5)}[妊娠]`],
    ['妊娠342', { 'talent:1:342': 1 }, `<未沦陷>${SP(5)}[妊娠]`],
    ['肛内妊娠343（列表版无此支）', { 'talent:1:343': 1 }, `<未沦陷>${SP(5)}`],
    ['派遣', { 'cflag:1:1': 12 }, `<未沦陷>${SP(5)}[派遣]`],
    // 多标签叠加：次序 1:1（☆ → 可被卖 → 虫寄生 → 妊娠 → 派遣）。
    // 可被卖要 CFLAG:1 == 0、派遣要 CFLAG:1 == 12，两者互斥，故分两条。
    [
      '全标签叠加（待机态：可被卖 + 助手）',
      {
        'talent:1:85': 1,
        'cflag:1:700': 1,
        'cflag:1:0': 2,
        'base:1:0': 1,
        'talent:1:192': 1,
        'talent:1:342': 1,
      },
      '<爱  慕> [☆][可被卖][可作为助手][虫寄生][妊娠]',
    ],
    [
      '全标签叠加（派遣态）',
      {
        'talent:1:85': 1,
        'cflag:1:700': 1,
        'talent:1:192': 1,
        'talent:1:342': 1,
        'cflag:1:1': 12,
      },
      '<爱  慕> [☆][虫寄生][妊娠][派遣]',
    ],
  ];
  for (const [label, seed, tail] of CASES) {
    const fixture = three_chara();
    for (const [name, value] of Object.entries(seed)) {
      fixture.store.set(name, value);
    }
    const { life_list } = fixture.load_module('page/page-life-list');
    life_list(0, 1, 20);
    // 前段定宽（名字 12 / 职业 8 / 等级右对齐 1）与行尾都逐字比对
    assert.equal(
      row_text(fixture, 1),
      `玛奥${SP(8)}  ${SP(7)} LV0${tail}`,
      label,
    );
  }
});

test('LIFE_LIST：濒死（BASE:0 == 0）不出「可被卖 / 可作为助手」', () => {
  const fixture = three_chara();
  fixture.store.set('cflag:1:0', 2);
  fixture.store.set('base:1:0', 0);
  const { life_list } = fixture.load_module('page/page-life-list');
  life_list(0, 1, 20);
  assert.equal(squeeze(row_text(fixture, 1)), '玛奥 LV0<未沦陷>');
});

test('LIFE_LIST：标签配色（爱慕/淫乱红、未沦陷灰、妊娠绿、派遣绿）', () => {
  const fixture = three_chara();
  fixture.store.set('talent:1:85', 1);
  fixture.store.set('talent:1:153', 1);
  fixture.store.set('cflag:1:1', 12);
  const { life_list } = fixture.load_module('page/page-life-list');
  life_list(0, 1, 20);
  const tags = row_fragments(fixture, 1).filter((f) =>
    f.content.startsWith('<'),
  );
  const pregnant = row_fragments(fixture, 1).find((f) =>
    f.content.includes('[妊娠]'),
  );
  assert.deepEqual(tags[0], { content: '<爱  慕>', color: '#ff6464' });
  assert.equal(pregnant.color, '#64ff64', '[妊娠] 是 SETCOLOR 100,255,100');
  assert.deepEqual(
    row_fragments(fixture, 1).find((f) => f.content.includes('[派遣]')),
    { content: '[派遣]', color: '#64c864' },
    '[派遣] 是 SETCOLOR 100,200,100',
  );

  const cold = three_chara();
  const mod = cold.load_module('page/page-life-list');
  mod.life_list(0, 1, 20);
  assert.deepEqual(
    row_fragments(cold, 1).find((f) => f.content.includes('<未沦陷>')),
    { content: '<未沦陷>', color: '#646464' },
    '[未沦陷] 是 SETCOLOR 100,100,100',
  );
});

test('LIFE_LIST：无 ☆ 时留 5 空格占位、有 ☆ 时占位消失（:62-66）', () => {
  // 占位空格插在沦陷标签之后、其余标签之前（对照两行并存逐字比对）
  const fixture = three_chara();
  fixture.store.set('cflag:2:700', 1);
  const { life_list } = fixture.load_module('page/page-life-list');
  life_list(0, 1, 20);
  assert.equal(
    row_text(fixture, 1),
    `玛奥${SP(8)}  ${SP(7)} LV0<未沦陷>${SP(5)}`,
    '1 号无 ☆：5 空格占位',
  );
  assert.equal(
    row_text(fixture, 2),
    `菲娅${SP(8)}  ${SP(7)} LV0<未沦陷> [☆]`,
    '2 号有 ☆：占位被 [☆] 顶掉',
  );
});

test('LIFE_LIST：窗口只含本页，空位补空行（:34-38）', () => {
  // 四人档（魔王 + 三名奴隶）、每页 2 行：第 0 页两行、第 1 页一行 + 一个
  // 空位（原作 `COUNT >= CHARANUM → PRINTL` 支）
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '玛奥');
  add_chara(fixture, 2, '菲娅');
  add_chara(fixture, 3, '梅蒂');
  const { life_list } = fixture.load_module('page/page-life-list');
  life_list(0, 1, 2);
  assert.deepEqual(row_ids(fixture), [0, 1, 2], '表头 0 + 第 0 页的 1、2');

  const second = create_era_fixture();
  add_chara(second, 0, '你');
  add_chara(second, 1, '玛奥');
  add_chara(second, 2, '菲娅');
  add_chara(second, 3, '梅蒂');
  const mod = second.load_module('page/page-life-list');
  mod.life_list(1, 1, 2);
  assert.deepEqual(row_ids(second), [0, 3], '第 1 页只剩 3 号');
  assert.deepEqual(
    text_lines(second).filter((t) => t === ''),
    [''],
    '空位应补一行空行',
  );
});

// —— @LIFE_LIST_ITEM / @LIFE_LIST_ITEM_E（:95-141 / :214-276）——

test('LIFE_LIST_ITEM：定宽字段逐字比对（编号宽 2 / 名字 12 / 职业 8 / 等级 4）', () => {
  const fixture = three_chara();
  fixture.store.set('cflag:2:0', 1);
  fixture.store.set('base:2:0', 1);
  fixture.store.set('talent:2:76', 1);
  fixture.store.set('cflag:2:700', 1);
  fixture.store.set('cflag:2:9', 8);
  const { life_list_item } = fixture.load_module('page/page-life-list');
  life_list_item(2);
  assert.equal(button_of(fixture, 2).rendered, '[2]', '编号进按钮格');
  assert.equal(
    row_text(fixture, 2),
    `菲娅${SP(8)}  ${SP(7)} LV${SP(3)}8<淫  乱> [☆][可被卖]`,
    '名字补到 12、职业补到 8、等级右对齐 4',
  );
});

test('LIFE_LIST_ITEM：0 号（魔王）不出「可被卖 / 可作为助手」', () => {
  // :121/:123 的 `ARG != 0` 判据——列表版的行永远非 0，这条只在单项版可达
  const fixture = three_chara();
  fixture.store.set('cflag:0:0', 2);
  fixture.store.set('base:0:0', 1);
  const { life_list_item } = fixture.load_module('page/page-life-list');
  life_list_item(0);
  assert.equal(
    row_text(fixture, 0),
    `你${SP(10)}  ${SP(7)} LV${SP(3)}0<未沦陷>${SP(5)}`,
    '魔王不出可卖/助手标签（:121/:123 的 ARG != 0）',
  );
});

test('LIFE_LIST_ITEM_E：调教回数 / 种族性格 / 性别三列（:216-244）', () => {
  const fixture = three_chara();
  fixture.store.set('talent:1:314', 2); // 种族 = 狼人
  fixture.store.set('cflag:1:10', 5); // 调教回数
  fixture.store.set('cflag:1:9', 3);
  const { life_list_item_e } = fixture.load_module('page/page-life-list');
  life_list_item_e(1);
  assert.equal(button_of(fixture, 1).rendered, '[1]');
  // 职业为『 』（无 200-212 素质）补到 8；调教回数左对齐 3；种族性格左对齐 20
  assert.equal(
    row_text(fixture, 1),
    // 种族性格字段宽 20 按显示宽度填充：`[狼人 - 不明]` 显示宽 13 → 补 7
    // 性别行照原作 PRINT 的两格字面量：男/女 前各两格（:239/:243），扶她无
    `玛奥${SP(8)}  ${SP(7)} LV${SP(3)}3${SP(2)}调教回数:5${SP(2)} [狼人 - 不明]${SP(7)}<未沦陷>${SP(2)}<女>`,
  );
});

test('LIFE_LIST_ITEM_E：性别三态表驱动（男/扶她/女）', () => {
  const CASES = [
    [{ 'talent:1:122': 1 }, '<男>'],
    [{ 'talent:1:121': 1 }, '<扶她>'],
    [{}, '<女>'],
    // 122 与 121 同时为真时取「男」（122 支在前）
    [{ 'talent:1:122': 1, 'talent:1:121': 1 }, '<男>'],
  ];
  for (const [seed, expected] of CASES) {
    const fixture = three_chara();
    for (const [name, value] of Object.entries(seed)) {
      fixture.store.set(name, value);
    }
    const { life_list_item_e } = fixture.load_module('page/page-life-list');
    life_list_item_e(1);
    assert.ok(
      row_text(fixture, 1).endsWith(expected),
      `${JSON.stringify(seed)} 应以 ${expected} 收尾，实得 ${row_text(fixture, 1)}`,
    );
  }
});

test('LIFE_LIST_ITEM_E：妊娠段多一支 343 → [肛内妊娠]（:264-265）', () => {
  // 列表版（@LIFE_LIST / @LIFE_LIST_ITEM）只有 [妊娠] 一支，343 不触发；
  // E 版在其后多一支 343 → [肛内妊娠]，且此时不再打 [妊娠]。
  const CASES = [
    ['153 妊娠', { 'talent:1:153': 1 }, '[妊娠]'],
    ['341 妊娠', { 'talent:1:341': 1 }, '[妊娠]'],
    ['342 妊娠', { 'talent:1:342': 1 }, '[妊娠]'],
    ['343 肛内妊娠', { 'talent:1:343': 1 }, '[肛内妊娠]'],
    [
      '妊娠与 343 并存取 [妊娠]',
      { 'talent:1:153': 1, 'talent:1:343': 1 },
      '[妊娠]',
    ],
    ['无', {}, ''],
  ];
  for (const [label, seed, expected] of CASES) {
    const fixture = three_chara();
    for (const [name, value] of Object.entries(seed)) {
      fixture.store.set(name, value);
    }
    const { life_list_item_e } = fixture.load_module('page/page-life-list');
    life_list_item_e(1);
    const tags = row_fragments(fixture, 1)
      .map((f) => f.content)
      .filter((c) => c.includes('妊娠'));
    assert.deepEqual(tags, expected === '' ? [] : [expected], label);
  }
});

test('LIFE_LIST_ITEM_E：☆ 无前导空格、无 ☆ 时不补占位（:246-249）', () => {
  const fixture = three_chara();
  const { life_list_item_e } = fixture.load_module('page/page-life-list');
  life_list_item_e(1);
  assert.ok(
    row_text(fixture, 1).endsWith(`<未沦陷>${SP(2)}<女>`),
    `E 版无 ☆ 支不打占位空格，实得 ${JSON.stringify(row_text(fixture, 1))}`,
  );
  // 有 ☆：E 版的 PRINT [☆]（:248）没有前导空格，与 :63/:117 的两个旧版不同
  const starred = three_chara();
  starred.store.set('cflag:1:700', 1);
  const mod = starred.load_module('page/page-life-list');
  mod.life_list_item_e(1);
  // 次序照原作：沦陷 → 性别（:237-244）→ ☆（:246-249）
  assert.ok(
    row_text(starred, 1).includes('<女>[☆]'),
    `E 版 ☆ 紧贴且排在性别之后（:248），实得 ${JSON.stringify(row_text(starred, 1))}`,
  );
});

// —— @MAX_PAGE_ENEMY / @LIFE_LIST_ENEMY（:144-176）——

test('MAX_PAGE_ENEMY：页数算式在整除与余数两侧（含空表）', () => {
  const CASES = [
    // [敌人数, NUM_PAGE, 期望页数]
    [0, 20, 0],
    [1, 20, 1],
    [20, 20, 1],
    [21, 20, 2],
    [40, 20, 2],
    [41, 20, 3],
  ];
  for (const [count, num_page, expected] of CASES) {
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    for (let i = 1; i <= count; i += 1) {
      add_chara(fixture, i, `敌${i}`);
      fixture.store.set(`cflag:${i}:1`, 2);
      fixture.store.set(`base:${i}:0`, 1);
    }
    // 非敌两类都不计数：待机（CFLAG:1 == 0）与魔王自己（=0，即便状态是 2）
    add_chara(fixture, 900, '平民');
    fixture.store.set('base:900:0', 1);
    fixture.store.set('cflag:0:1', 2);
    fixture.store.set('base:0:0', 1);
    const { max_page_enemy } = fixture.load_module('page/page-life-list');
    assert.equal(
      max_page_enemy(num_page),
      expected,
      `${count} 人 / 每页 ${num_page}`,
    );
  }
});

test('LIFE_LIST_ENEMY：CFLAG:1 状态维度整表驱动（只放行 == 2）', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  const STATES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12];
  for (const state of STATES) {
    const cid = 100 + state;
    add_chara(fixture, cid, `状态${state}`);
    fixture.store.set(`cflag:${cid}:1`, state);
    fixture.store.set(`base:${cid}:0`, 1);
  }
  fixture.store.set('cflag:0:1', 2); // 魔王自己「侵攻中」也不放行
  fixture.store.set('base:0:0', 1);
  const { life_list_enemy } = fixture.load_module('page/page-life-list');
  life_list_enemy(0, 20, 0);
  assert.deepEqual(row_ids(fixture), [102], '只有 CFLAG:1 == 2 的一人');
});

test('LIFE_LIST_ENEMY：BASE:0 == 0（濒死）不显示', () => {
  const fixture = three_chara();
  for (const cid of [1, 2]) {
    fixture.store.set(`cflag:${cid}:1`, 2);
    fixture.store.set(`base:${cid}:0`, 1);
  }
  fixture.store.set('base:1:0', 0); // 1 号濒死
  const { life_list_enemy } = fixture.load_module('page/page-life-list');
  life_list_enemy(0, 20);
  assert.deepEqual(row_ids(fixture), [2]);
});

test('LIFE_LIST_ENEMY：每页上限由第 2 参决定，超出不再渲染；不补空行', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  for (const cid of [1, 2, 3]) {
    add_chara(fixture, cid, `敌${cid}`);
    fixture.store.set(`cflag:${cid}:1`, 2);
    fixture.store.set(`base:${cid}:0`, 1);
  }
  const { life_list_enemy } = fixture.load_module('page/page-life-list');
  life_list_enemy(0, 2);
  assert.deepEqual(row_ids(fixture), [1, 2], 'NUM_PAGE=2 只画两行');
  assert.deepEqual(
    text_lines(fixture).filter((t) => t === ''),
    [],
    '补齐交给调用方（1:1，本函数不补）',
  );
});

test('LIFE_LIST_ENEMY：按命中序号开窗，翻页真正翻页（第 7 条修正）', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  for (const cid of [1, 2, 3, 4, 5]) {
    add_chara(fixture, cid, `敌${cid}`);
    fixture.store.set(`cflag:${cid}:1`, 2);
    fixture.store.set(`base:${cid}:0`, 1);
  }
  const { life_list_enemy } = fixture.load_module('page/page-life-list');
  life_list_enemy(1, 2);
  assert.deepEqual(row_ids(fixture), [3, 4], '第 2 页 = 第 3、4 个命中项');
  const last = create_era_fixture();
  add_chara(last, 0, '你');
  for (const cid of [1, 2, 3, 4, 5]) {
    add_chara(last, cid, `敌${cid}`);
    last.store.set(`cflag:${cid}:1`, 2);
    last.store.set(`base:${cid}:0`, 1);
  }
  const mod = last.load_module('page/page-life-list');
  mod.life_list_enemy(2, 2);
  assert.deepEqual(row_ids(last), [5], '第 3 页只剩 1 行（不补空行）');
});

// —— @LIFE_LIST_SALAVE / @MAX_PAGE_SALAVE（:178-212）——

test('LIFE_LIST_SALAVE：六种状态整表驱动（0/3/5/6/7/10 放行，其余不放行）', () => {
  const ALLOWED = [0, 3, 5, 6, 7, 10];
  const BLOCKED = [1, 2, 4, 8, 9, 11, 12];
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  for (const state of [...ALLOWED, ...BLOCKED]) {
    const cid = 200 + state;
    add_chara(fixture, cid, `状态${state}`);
    fixture.store.set(`cflag:${cid}:1`, state);
    fixture.store.set(`base:${cid}:0`, 1);
  }
  fixture.store.set('cflag:0:1', 0); // 魔王是待机（放行态）也不放行
  fixture.store.set('base:0:0', 1);
  const { life_list_salave } = fixture.load_module('page/page-life-list');
  life_list_salave(0, 20, 0);
  assert.deepEqual(
    row_ids(fixture),
    ALLOWED.map((state) => 200 + state),
    '放行的恰是六种状态',
  );
});

test('LIFE_LIST_SALAVE：濒死不列；按命中序号开窗（第 7 条修正）', () => {
  const fixture = three_chara();
  fixture.store.set('cflag:1:1', 0);
  fixture.store.set('cflag:2:1', 0);
  fixture.store.set('base:1:0', 0); // 1 号濒死
  fixture.store.set('base:2:0', 1);
  const { life_list_salave } = fixture.load_module('page/page-life-list');
  life_list_salave(0, 20);
  assert.deepEqual(row_ids(fixture), [2]);

  const second = create_era_fixture();
  add_chara(second, 0, '你');
  for (const cid of [1, 2, 3]) {
    add_chara(second, cid, `奴${cid}`);
    second.store.set(`cflag:${cid}:1`, 0);
    second.store.set(`base:${cid}:0`, 1);
  }
  const mod = second.load_module('page/page-life-list');
  mod.life_list_salave(1, 1);
  assert.deepEqual(row_ids(second), [2], '第 2 页 = 第 2 个命中项');
});

test('MAX_PAGE_SALAVE：页数算式与 ENEMY 同构，判据换六状态', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  for (let i = 1; i <= 7; i += 1) {
    add_chara(fixture, i, `奴${i}`);
    // 交替放行态（0）与不放行态（1）
    fixture.store.set(`cflag:${i}:1`, i % 2 === 0 ? 1 : 0);
    fixture.store.set(`base:${i}:0`, 1);
  }
  const { max_page_salave } = fixture.load_module('page/page-life-list');
  assert.equal(max_page_salave(2), 2, '4 人放行 / 每页 2 → 2 页');
  assert.equal(max_page_salave(4), 1, '整除 → 1 页');
  assert.equal(max_page_salave(3), 2, '余数 → 上取整');
  assert.equal(max_page_salave(20), 1, '不足一页 → 1 页');
});

// —— @SELECT_YES_NO（:278-292，既有行为随本票回归）——

test('SELECT_YES_NO：只接受 0/1，其余输入重问', async () => {
  const fixture = create_era_fixture();
  fixture.set_inputs(7, 2, 0);
  const { select_yes_no } = fixture.load_module('page/page-life-list');
  assert.equal(await select_yes_no(), 0);
  assert.equal(fixture.inputs_consumed.length, 3, '7 与 2 都被重问、0 才回传');

  const second = create_era_fixture();
  second.set_inputs(1);
  const mod = second.load_module('page/page-life-list');
  assert.equal(await mod.select_yes_no(), 1);
});
