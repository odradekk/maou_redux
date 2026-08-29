'use strict';
/**
 * @file 黄金样本登记表（issue #156 阶段一）：样本名 → 样本文件的唯一真相源。
 *
 * 两个消费方共用本表，不得各持一份（两边映射漂移 = 静默错判）：
 *   - tools/compare/cli.js 的 `--sample <名>`（多样本比对入口）；
 *   - tools/trace-check.mjs 的 `<样本名>-log:行号` 引用前缀解析（校核器拿
 *     前缀查本表，把引用锚到对应样本文件——沿用裸 log:N 会让新样本的行号
 *     被拿去核旧样本，#109 裁定明言这是静默错判，必须先改这里）。
 *
 * 键约定：
 *   - `''`（空串）= 缺省样本 = 旧样本 target/emuera.log（调教段，#9/#48 的
 *     比对基准，录自比 target/ 更早的构建，见 docs/output-diff.md 勘误二）。
 *     裸 `log:N` 与 legacy `emuera.log:N` 引用形态恒等价于它，存量一行不改。
 *   - 其余六项 = 范围 B 三段（#109 裁定）× 两态（save99 自然态 / 置位最大
 *     点亮态），文件由人录制回收后入库（#156 阶段二）。头注（构建标识、
 *     起录存档、置位串、宏键）以同名 `.meta.json` sidecar 随样本落库——
 *     日志本体是引擎产物不能掺注释行，头注走 sidecar；缺头注的样本按
 *     「不可重录」拒绝（cli 侧强制）。格式契约见 golden/README.md。
 */

const path = require('node:path');

const REPO = path.resolve(__dirname, '..', '..');

// 样本名 → 仓库相对路径。空串键是缺省（见文件头注）。
// train-* 两份（#211）：调教段全序列（17 屏自然态 / 升格加录），段名
// 第一段 'train' 是 cli 的分流键（走 replay.js 的调教回放，非 replay-b）。
const SAMPLES = {
  '': 'target/emuera.log',
  'mainmenu-natural': 'golden/mainmenu-natural.log',
  'mainmenu-max': 'golden/mainmenu-max.log',
  'saveload-natural': 'golden/saveload-natural.log',
  'saveload-max': 'golden/saveload-max.log',
  'daycycle-natural': 'golden/daycycle-natural.log',
  'daycycle-max': 'golden/daycycle-max.log',
  'train-natural': 'golden/train-natural.log',
  'train-upgrade': 'golden/train-upgrade.log',
};

/**
 * 样本名 → { name, rel, abs }。未登记的名字必须抛错（列出有效名单），
 * 绝不静默回落缺省样本——回落 = 拿旧样本冒充新样本，比对结论整个作废。
 * @param {string} name 样本名；缺省样本用空串
 * @returns {{name: string, rel: string, abs: string}}
 */
function resolve_sample(name) {
  if (typeof name !== 'string' || !Object.hasOwn(SAMPLES, name)) {
    const known = Object.keys(SAMPLES)
      .map((k) =>
        k === '' ? '（空 = 缺省，等价旧样本 target/emuera.log）' : k,
      )
      .join('、');
    throw new Error(`未知样本名「${name}」。有效样本名：${known}`);
  }
  const rel = SAMPLES[name];
  return { name, rel, abs: path.join(REPO, rel) };
}

/**
 * 样本头注 sidecar 的仓库相对路径（<样本>.log → <样本>.meta.json）。
 * 旧样本（target/emuera.log，只读输入）没有也不要求头注。
 * @param {string} rel 样本文件的仓库相对路径
 * @returns {string}
 */
function meta_rel(rel) {
  return rel.replace(/\.log$/, '.meta.json');
}

module.exports.SAMPLES = SAMPLES;
module.exports.resolve_sample = resolve_sample;
module.exports.meta_rel = meta_rel;
