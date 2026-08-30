/**
 * tools/compare/diff.js 的行为测试（issue #48）——含 #9 原型三项自检在
 * 本实现上的重跑。
 *
 * 三项自检的植入位置**另选**，不照抄 #9 原型的三处（原型：文本加尾句、
 * gauge 体力值、menu 爱抚编号）：
 *   检验1 自比对零差异；
 *   检验2 排版差异容忍（菜单改单列、条形换字符、算式空格重排、分割线换线型）；
 *   检验3 植入 3 个缺陷全抓：口上文本错字（log:26）、算式加数漂移
 *   （润滑 +61→+610，自洽改成 2854+610=3464，躲过自校验）、输入回显错值
 *   （0→2，log:22）。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const {
  golden_stream,
  window_between_inputs,
  classify_line,
} = require('../tools/compare/normalize');
const { diff_streams } = require('../tools/compare/diff');

const REPO = path.resolve(__dirname, '..');
const LOG = fs.readFileSync(path.join(REPO, 'target', 'emuera.log'), 'utf8');

const golden_window = window_between_inputs(golden_stream(LOG), 0);

// 检验1：自比对零差异（工具链对同一输入必须完全对称）
test('检验1 自比对零差异：golden 窗口 vs 自身', () => {
  const report = diff_streams(golden_window, golden_window);
  assert.equal(report.diffs.length, 0);
  assert.equal(report.summary.unexplained, 0);
  assert.equal(report.summary.matched, golden_window.length);
});

// 检验2：排版差异容忍——把 golden 窗口的条目按「ere 的排版自由」重渲染：
// 菜单单列、状态条换宽度与填充字符、算式空格重排、任意插空行，归一化后零差异
test('检验2 排版差异容忍：单列菜单、条形换宽换字符、算式重排后零差异', () => {
  const relines = [];
  golden_window.forEach((entry) => {
    switch (entry.kind) {
      case 'menu':
        relines.push(`${entry.key}[${entry.val}]`);
        break;
      case 'gauge':
        // 条宽 10 → 6、填充字符换成另一档（条形外观是排版，值才是语义）
        relines.push(
          `  ${entry.key}[${'>'.repeat(6)}]${entry.max !== undefined ? `(${entry.val}/${entry.max})` : `  ${entry.val}`}`,
        );
        break;
      case 'lossbar':
        relines.push(` ${entry.key}[${'-'.repeat(32)}] -${entry.val}`);
        break;
      case 'calc':
        relines.push(
          `${entry.key} ${entry.from}+ ${entry.add}${entry.sub ? `- ${entry.sub}` : ''} = ${entry.to}${entry.phrase ? `（${entry.phrase}）` : ''}`,
        );
        break;
      default:
        relines.push(entry.text ?? '');
    }
    relines.push(''); // 任意多的空行（归一化丢弃）
  });
  const rebuilt = relines.map((l, i) => classify_line(l, i + 1));
  const rebuilt_stream = [];
  rebuilt.forEach((e) => {
    if (e.kind === 'group') {
      e.items.forEach((item) => rebuilt_stream.push(item));
    } else if (e.kind !== 'discard') {
      rebuilt_stream.push(e);
    }
  });
  assert.notEqual(rebuilt_stream.length, 0);
  const report = diff_streams(golden_window, rebuilt_stream);
  assert.deepEqual(
    report.diffs.filter((d) => d.category !== undefined || true),
    [],
    `实得差异：\n${report.diffs.map((d) => `${d.side}:${JSON.stringify(d.entry)}`).join('\n')}`,
  );
});

// 检验3：植入 3 个缺陷全抓（位置另选，见文件头）。成对差异两侧各报一条
//（golden 原句 + 植入句），都不可归因 → unexplained 各 2
test('检验3a 文本缺陷：口上台词错字被抓（unexplained，不进任何豁免类）', () => {
  const corrupted = golden_window.map((e) =>
    e.kind === 'text' && e.text.includes('「哈呜、温妮')
      ? { ...e, text: e.text.replace('温妮', '温娚') }
      : e,
  );
  const report = diff_streams(golden_window, corrupted);
  assert.equal(report.summary.unexplained, 2); // -golden 原句 + 植入句
  assert.ok(
    report.diffs.some(
      (d) =>
        d.entry.text?.includes('温娚') || d.counterpart?.text?.includes('温娚'),
    ),
    '错字句必须出现在差异清单里',
  );
});

test('检验3b 算式缺陷：加数漂移且算术自洽（躲过自校验）仍被抓', () => {
  const corrupted = golden_window.map((e) =>
    e.kind === 'calc' && e.key === '润滑'
      ? { ...e, add: 610, to: 3464 } // 2854+610=3464：验算自洽，值错
      : e,
  );
  const report = diff_streams(golden_window, corrupted);
  assert.equal(report.summary.unexplained, 2);
  const hit = report.diffs.filter((d) => d.entry.kind === 'calc');
  assert.equal(hit.length, 2); // -golden 润滑 + 漂移后的 润滑
  assert.ok(hit.every((d) => d.entry.key === '润滑'));
});

test('检验3c 输入缺陷：回显错值（0→2）被抓', () => {
  const corrupted = golden_window.map((e) =>
    e.kind === 'input' ? { ...e, text: '2' } : e,
  );
  const report = diff_streams(golden_window, corrupted);
  assert.equal(report.summary.unexplained, 2);
  assert.ok(
    report.diffs.some(
      (d) => d.entry.kind === 'input' || d.counterpart?.kind === 'input',
    ),
  );
});

// —— 归因规则的行为锁定（白名单形态：改一个字就红） ——

test('归因：golden 体力条 → stub（LIFE_BAR 登记）；ere 占位行 → stub', () => {
  const report = diff_streams(
    [classify_line('体力[..............](1445/2000)')],
    [
      classify_line(
        '（生命条尚未移植，此处为占位——原作 @LIFE_BAR，随状态画面票，见 docs/stub-registry.md。）',
      ),
    ],
  );
  assert.equal(report.summary.stub, 2);
  assert.equal(report.summary.unexplained, 0);
});

test('归因：菜单同编号异名（爱抚[0] vs 爱抚X[0]）不可豁免——真缺陷出口', () => {
  const report = diff_streams(
    [{ kind: 'menu', key: '爱抚', val: 0 }],
    [{ kind: 'menu', key: '爱抚X', val: 0 }],
  );
  assert.equal(report.summary.unexplained, 2);
});

test('归因：打屁股 39↔40 标签移位 → unexplained（#213 映射层落地后是真缺陷出口）', () => {
  // #211 时代此差异经 MENU_LABEL_SHIFT 豁免成 version（编号体系差）；
  // #213 建 L_IDX↔L_I 映射层后两侧编号应当一致——豁免整组拆除，同名
  // 异号回到「真缺陷候选」（与上方同编号异名用例同构）
  const report = diff_streams(
    [{ kind: 'menu', key: '打屁股', val: 39 }],
    [{ kind: 'menu', key: '打屁股', val: 40 }],
  );
  // 异号条目不构成 change 对（val 不同 → 各自落单侧差异）：golden 的
  // [39] 无对位 → unexplained（缺陷候选）；ere 的 [40] 记名进存根桶
  //（「COM_ABLE 未过滤」的保守归因——计数不静默，真缺陷仍会在
  // unexplained 与基线四数上冒头）
  assert.equal(report.summary.version, 0);
  assert.equal(report.summary.unexplained, 1);
  assert.equal(report.summary.stub, 1);
});

test('归因：不在册的指令编号（9999）不进 COM_ABLE 豁免——拼错必红', () => {
  const report = diff_streams([], [{ kind: 'menu', key: '乱写', val: 9999 }]);
  assert.equal(report.summary.unexplained, 1);
});

test('归因：服装前缀成对豁免，裸配不成对（单边出现即红）', () => {
  const golden_cloth = classify_line(
    '隔着紧身衣＆裙甲、你仔细爱抚着温妮的身体……',
  );
  const bare = classify_line('你仔细爱抚着温妮的身体……');
  const paired = diff_streams([golden_cloth], [bare]);
  assert.equal(paired.summary.stub, 2);
  // 前缀句对上无关句（不成对）→ 两侧都 unexplained
  const odd = diff_streams([golden_cloth], [classify_line('完全无关的句子')]);
  assert.equal(odd.summary.unexplained, 2);
});
