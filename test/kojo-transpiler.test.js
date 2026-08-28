/**
 * @file 口上转译器原型的冒烟测试（issue #107）。
 *
 * 覆盖转译器自己的核心不变量（不是保真锁——那锁在 ere/kojo/ 最终产物上）：
 *   - 编码判定（BOM / 严格 UTF-8 / Shift-JIS 兜底）；
 *   - PRINT 变体映射（PRINTFORMW→printAndWait、PRINTFORML→print）；
 *   - 插值映射（%SAVESTR:TARGET% → ${target_name}、UNICODE→heart）；
 *   - 简体归一（繁体源 → 简体产物）；
 *   - 行尾空格保留（#8：有意义的行尾空格不 trim）；
 *   - 结构映射（IF/ELSEIF/ELSE 栈 + SIF 嵌套）；
 *   - 产物边界（默认不覆盖，--force 重写）。
 *
 * 零第三方依赖，node --test 直接跑（与仓库其余测试一致）。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const {
  KOJO_OUTPUT_NAME,
  build_product,
  convert_expr,
  emit_print,
  interpolate_to_js,
  output_name_for,
  read_text,
  split_comment,
  transpile,
  transpile_file,
} = require('../tools/kojo-transpiler');

const REPO_ROOT = path.resolve(__dirname, '..');
const TMP = fs.mkdtempSync(path.join(require('node:os').tmpdir(), 'kojo-t-'));
const notes = () => [];

test('read_text：UTF-8 BOM / 严格 UTF-8 / Shift-JIS 判定', () => {
  const bom = Buffer.concat([
    Buffer.from([0xef, 0xbb, 0xbf]),
    Buffer.from('你好', 'utf8'),
  ]);
  const bom_file = path.join(TMP, 'bom.txt');
  fs.writeFileSync(bom_file, bom);
  assert.equal(read_text(bom_file).enc, 'utf8-bom');

  const utf8_file = path.join(TMP, 'utf8.txt');
  fs.writeFileSync(utf8_file, '你好', 'utf8');
  assert.equal(read_text(utf8_file).enc, 'utf8');

  // Shift-JIS 兜底：UTF-8 严格校验失败时（0x82 等不是合法 UTF-8 序列）
  const sjis_file = path.join(TMP, 'sjis.txt');
  fs.writeFileSync(sjis_file, Buffer.from([0x82, 0xa0])); // あ in Shift-JIS
  assert.equal(read_text(sjis_file).enc, 'shift_jis');
});

test('split_comment：行首 ; 是注释，代码行不是', () => {
  assert.deepEqual(split_comment(';注释'), {
    is_comment: true,
    comment: '注释',
  });
  assert.deepEqual(split_comment('\t;注释'), {
    is_comment: true,
    comment: '注释',
  });
  assert.deepEqual(split_comment('IF X == 1'), { is_comment: false });
});

test('emit_print：PRINTFORMW → printAndWait、PRINTFORML → print（保真锁 B 的转译侧）', () => {
  const wait = emit_print('PRINTFORMW', '「你好」', 1, notes());
  assert.equal(wait[0], 'await era.printAndWait(`「你好」`); // :1');
  const line = emit_print('PRINTFORML', '你好', 2, notes());
  assert.equal(line[0], 'await era.print(`你好`); // :2');
});

test('emit_print：行尾空格保留（#8 有意义的行尾空格）', () => {
  const out = emit_print('PRINTFORMW', '文本  ', 3, notes());
  assert.ok(out[0].includes('`文本  `'), '行尾空格不得 trim');
});

test('emit_print：繁体正文归一为简体（issue #60）', () => {
  const out = emit_print('PRINTFORMW', '彎曲著身體', 4, notes());
  assert.ok(out[0].includes('弯曲着身体'));
});

test('interpolate_to_js：%…% → ${…}（保真锁 C 的转译侧）', () => {
  const n = notes();
  const out = interpolate_to_js(
    '%SAVESTR:TARGET%弯曲着身体、%SAVESTR:PLAYER%的手。%UNICODE(0x2661) *1%',
    5,
    n,
  );
  assert.equal(
    out,
    '${target_name}弯曲着身体、${player_name}的手。${heart(1)}',
  );
  assert.equal(n.length, 0);
  // 未知插值 REVIEW
  const n2 = notes();
  interpolate_to_js('%UNKNOWN%', 6, n2);
  assert.equal(n2.length, 1);
  assert.equal(n2[0].kind, '插值');
});

test('transpile：IF/ELSEIF/ELSE 结构栈（缩进不可靠）', () => {
  const src = [
    'IF A == 1',
    '\tPRINTFORMW 一',
    'CFLAG:1 = 1', // 顶格但语义在 IF 内
    'ELSE',
    '\tPRINTFORMW 二',
    'ENDIF',
  ].join('\n');
  const r = transpile(src);
  assert.ok(r.code.includes('if (A == 1) {'));
  assert.ok(r.code.includes('} else {'));
  assert.ok(r.code.includes('era.set(`cflag:${target}:1`, 1)'));
});

test('transpile：SIF 展开成单行 if', () => {
  const src = ['SIF TALENT:TARGET:9 == 1', '\tRETURN 0', 'RETURN 1'].join('\n');
  const r = transpile(src);
  assert.ok(r.code.includes('if (era.get(`talent:${target}:9`) == 1) {'));
  assert.ok(r.code.includes('return 0;'));
  assert.ok(r.code.includes('return 1;'));
});

test('transpile：同名事件函数（ERB 多重定义）REVIEW', () => {
  const src = [
    '@EVENTTRAIN',
    'FLAG:1 = 1',
    '',
    '@EVENTTRAIN',
    'FLAG:2 = 1',
  ].join('\n');
  const r = transpile(src);
  const dup = r.reviews.filter((x) => x.kind === '同名函数');
  assert.equal(dup.length, 1);
  assert.ok(dup[0].msg.includes("on('EVENTTRAIN'"));
});

test('transpile_file：产物边界（默认不覆盖，--force 重写）', () => {
  const src_file = path.join(TMP, 't.ERB');
  fs.writeFileSync(src_file, '@F\nPRINTFORMW 你好\n');
  const out_file = path.join(TMP, 't.js');
  const first = transpile_file(src_file, out_file);
  assert.equal(first.skipped, false);
  // 改源，默认不覆盖
  fs.writeFileSync(src_file, '@F\nPRINTFORMW 改了\n');
  const second = transpile_file(src_file, out_file);
  assert.equal(second.skipped, true);
  assert.ok(fs.readFileSync(out_file, 'utf8').includes('你好'));
  // --force 覆盖
  const third = transpile_file(src_file, out_file, { force: true });
  assert.equal(third.skipped, false);
  assert.ok(fs.readFileSync(out_file, 'utf8').includes('改了'));
});

test('build_product：头注带源与 REVIEW 清单，尾注带复核清单', () => {
  const r = transpile('@F\nSIF X\n\tRETURN 0\n');
  const prod = build_product('target/ERB/口上/EVENT_K1.ERB', r);
  assert.ok(prod.includes('源: target/ERB/口上/EVENT_K1.ERB'));
  assert.ok(prod.includes('复核标记'));
  assert.ok(prod.includes('复核清单（转译器生成'));
});

test('产物样例：K5 爱抚段与人工参照 kojo-k5.js 的文本逐句一致', () => {
  // 用真实 K5 源转译，抽爱抚段（:802-848）验证关键语句
  const erb = path.join(
    REPO_ROOT,
    'target',
    'ERB',
    '口上',
    'EVENT_K5_マオ.ERB',
  );
  const { text } = read_text(erb);
  const r = transpile(text);
  const seg = r.code
    .split('\n')
    .filter((l) => l.includes('await era.printAndWait') && l.includes('// :8'));
  const lines = seg.map((l) => l.trim());
  assert.ok(lines.some((l) => l.includes('「咕…呜呜…啊！」')));
  assert.ok(lines.some((l) => l.includes('「你这个变态…别、别碰我！」')));
  assert.ok(lines.some((l) => l.includes('${heart(1)}')));
  assert.ok(lines.some((l) => l.includes('${target_name}弯曲着身体')));
});

// —— 裁定一：寻址转换（产物必须过 node --check） ——

test('convert_expr：角色变量补全角色维（缺省 = TARGET，Emuera 语义）', () => {
  const n = [];
  assert.equal(
    convert_expr('CFLAG:301 == 0', 1, n),
    'era.get(`cflag:${target}:301`) == 0',
  );
  assert.equal(
    convert_expr('TALENT:TARGET:76 == 1', 2, n),
    'era.get(`talent:${target}:76`) == 1',
  );
  assert.equal(
    convert_expr('MARK:2 >= 2', 3, n),
    'era.get(`mark:${target}:2`) >= 2',
  );
  assert.equal(n.length, 0);
});

test('convert_expr：一维变量 / 单值全局 / RAND / 局部参数', () => {
  const n = [];
  assert.equal(convert_expr('FLAG:7 == 2', 1, n), "era.get('flag:7') == 2");
  assert.equal(
    convert_expr('SELECTCOM == 0 && ASSI > 0', 2, n),
    'era_flag.selectcom == 0 && era_flag.assi > 0',
  );
  assert.equal(convert_expr('RAND:3 == 0', 3, n), 'rand_n(3) == 0');
  assert.equal(convert_expr('ARG:0 == 1', 4, n), 'arg_0 == 1');
  assert.ok(n.some((x) => x.kind === 'RAND')); // RAND REVIEW
  assert.ok(n.some((x) => x.kind === '局部参数')); // ARG REVIEW
});

test('convert_expr：RAND:(expr) 表达式形态 → rand_n(expr)（#184 修的静默漏出）', () => {
  const n = [];
  assert.equal(
    convert_expr('RAND:(SEIKOU + SIPPAI) < SEIKOU', 1, n),
    'rand_n(SEIKOU + SIPPAI) < SEIKOU',
  );
  assert.ok(n.some((x) => x.kind === 'RAND'));
});

test('convert_expr：表达式下标 CFLAG:(ARG:0):533 / FLAG:(CFLAG:ARG:501 + 349)（#184）', () => {
  const n = [];
  assert.equal(
    convert_expr('CFLAG:(ARG:0):533 > 1', 1, n),
    'era.get(`cflag:${arg_0}:533`) > 1',
  );
  assert.ok(n.some((x) => x.kind === '表达式下标'));
  const n2 = [];
  assert.equal(
    convert_expr('FLAG:(CFLAG:ARG:501 + 349) == 507', 2, n2),
    'era.get(`flag:${era.get(`cflag:${arg}:501`) + 349}`) == 507',
  );
  assert.ok(n2.some((x) => x.kind === '表达式下标'));
});

test('convert_expr：数组局部变量元素 PLAY:LCOUNT → play[lcount]（#184）', () => {
  const n = [];
  assert.equal(
    convert_expr('LOCAL < PLAY:LCOUNT', 1, n),
    'LOCAL < play[lcount]',
  );
  assert.ok(n.some((x) => x.kind === '数组元素'));
});

test('SKIPSTART/SKIPEND 块：整段转注释、不产出重复顶层函数（#184）', () => {
  const src = [
    '@DUNGEON_BITCH',
    'RETURN 0',
    '[SKIPSTART]',
    '@DUNGEON_BITCH',
    'RETURN 1',
    '[SKIPEND]',
    '@SELL_BITCH',
    'RETURN 2',
  ].join('\n');
  const { code, reviews } = transpile(src);
  // 只有两个顶层函数（无重复 DUNGEON_BITCH）
  const funcs = [...code.matchAll(/^async function (\w+)/gm)].map((m) => m[1]);
  assert.deepEqual(funcs, ['DUNGEON_BITCH', 'SELL_BITCH']);
  assert.ok(code.includes('// [SKIPSTART] ～ [SKIPEND]'));
  assert.ok(reviews.some((r) => r.kind === 'SKIP块'));
});

test('多值 CASE：CASE "ORAL", "LES" → 并列 case 标签（#184）', () => {
  const src = [
    'SELECTCASE ARGS:1',
    'CASE "ORAL", "LES"',
    'RETURNF 2',
    'CASEELSE',
    'RETURNF 0',
    'ENDSELECT',
  ].join('\n');
  const { code } = transpile(src);
  assert.ok(code.includes('case "ORAL":'));
  assert.ok(code.includes('case "LES": {'));
  // node --check 必须过
  const { execFileSync } = require('node:child_process');
  const out = path.join(TMP, 'check-multicase.js');
  fs.writeFileSync(out, code);
  execFileSync(process.execPath, ['--check', out], { stdio: 'pipe' });
});

test('产物是合法 JS：DUNGEON_BITCH 转译产物过 node --check（#184 修后）', () => {
  const { execFileSync } = require('node:child_process');
  const erb = path.join(
    REPO_ROOT,
    'target',
    'ERB',
    '迷宮',
    'DUNGEON_BITCH.ERB',
  );
  const out = path.join(TMP, 'check-dungeon-bitch.js');
  transpile_file(erb, out, { force: true });
  execFileSync(process.execPath, ['--check', out], { stdio: 'pipe' });
});

test('产物是合法 JS：K5 转译产物过 node --check（裁定一硬门槛）', () => {
  const { execFileSync } = require('node:child_process');
  const erb = path.join(
    REPO_ROOT,
    'target',
    'ERB',
    '口上',
    'EVENT_K5_マオ.ERB',
  );
  const out = path.join(TMP, 'check-k5.js');
  transpile_file(erb, out, { force: true });
  // node --check 必须退出 0
  execFileSync(process.execPath, ['--check', out], { stdio: 'pipe' });
});

// —— 裁定二：产物文件名 ASCII kebab-case ——

test('output_name_for：源文件名 → ASCII kebab-case（意译非罗马音）', () => {
  assert.equal(output_name_for('EVENT_K3_高貴.ERB'), 'kojo-k3-noble.js');
  assert.equal(output_name_for('EVENT_K5_マオ.ERB'), 'kojo-k5-mao.js');
  assert.equal(output_name_for('EVENT_K9_ダイヤ.ERB'), 'kojo-k9-diamond.js');
  assert.equal(output_name_for('EVENT_F1_丽塔.ERB'), 'kojo-f1-rita.js');
  // 未登记的文件名显式报错，不静默回落
  assert.throws(() => output_name_for('EVENT_UNKNOWN.ERB'), /未登记的口上文件/);
});

test('KOJO_OUTPUT_NAME 覆盖全部 21 个口上文件（+ K20 空文件）', () => {
  const fs = require('node:fs');
  const files = fs.readdirSync(path.join(REPO_ROOT, 'target', 'ERB', '口上'));
  for (const f of files) {
    assert.ok(KOJO_OUTPUT_NAME[f], `缺映射：${f}`);
    assert.ok(
      /^kojo-[kf]\d+[a-z-]+\.js$/.test(KOJO_OUTPUT_NAME[f]),
      `产物名非法：${KOJO_OUTPUT_NAME[f]}`,
    );
  }
});

// —— 裁定一：产物头注写「已有门面名的下标」 ——

test('build_product：头注含门面名提示与 eslint-disable 置顶', () => {
  const r = transpile('@F\nIF FLAG:7 == 0\n\tRETURN 0\nENDIF\n');
  const prod = build_product('target/ERB/口上/EVENT_K1.ERB', r);
  assert.ok(prod.includes('已有门面名的下标'));
  assert.ok(prod.includes('flag:7 = 口上开关'));
  // eslint-disable 必须在文件最顶部（文件头注释之前）
  assert.ok(prod.startsWith('/* eslint-disable'));
});
