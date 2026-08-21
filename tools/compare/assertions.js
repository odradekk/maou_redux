/**
 * @file T18 输出比对·变量层断言（issue #48，验证决议 #9）。
 *
 * 两层的桥梁（#9 第 4 问）：日志的算式行把每步数值变化摊开写了——
 * `阴核  5240+   300       =  5540` 直接转成 `palam:{tid}:0 应从 5240
 * 变为 5540`。指标名 → 序号经 yml/Palam.yml（#9 已核对 16 名与序号 0-15
 * 一一对应）。
 *
 * #9 定下的规则——**抽取器必须自校验**：算式自带 a+b=c，能验算就必须
 * 验算（原型的静默截断缺陷教训：工具 bug 会把真回归伪装成噪音）；
 * 「无法解释的断言链断裂」必须归零才认为工具可信。
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');

/**
 * 读「"名": / id: N」两列名表（yml/Palam.yml、TrainCommand.yml 的形状）。
 * 手写极简解析（零依赖约束；产物键名一律双引号是 #17 转换器约定）。
 * @param {string} yml_file 相对仓库根或绝对路径
 * @returns {Map<string, number>} 名 → 序号
 */
function parse_name_ids(yml_file) {
  const file = path.isAbsolute(yml_file)
    ? yml_file
    : path.resolve(__dirname, '..', '..', yml_file);
  const text = fs.readFileSync(file, 'utf8');
  return new Map(
    [...text.matchAll(/"(.+)":\r?\n\s+id:\s*(\d+)/g)].map((m) => [
      m[1],
      Number(m[2]),
    ]),
  );
}

/**
 * 从事件流抽取参数断言（含自校验与链一致性）。
 *
 * @param {Array<object>} stream 事件流（golden_stream 的产物，含 calc 条目）
 * @param {Map<string, number>} name_ids 名 → 序号（Palam.yml）
 * @param {number} tid 调教对象角色 ID（断言路径用）
 * @returns {{assertions: Array<{path, key, from, add, sub, to, line}>,
 *   self_check: {total: number, two_term: number, three_term: number,
 *     self_validate_failures: Array, unknown_names: Array,
 *     chain: {chained: number, reset: number, unexplained: Array}}}}
 */
function extract_calc_assertions(stream, name_ids, tid) {
  const assertions = [];
  const self_check = {
    total: 0,
    two_term: 0,
    three_term: 0,
    self_validate_failures: [],
    unknown_names: [],
    chain: { chained: 0, reset: 0, unexplained: [] },
  };
  const last_to = new Map(); // palam 序号 → 上一条的 to（链一致性）
  for (const entry of stream) {
    if (entry.kind !== 'calc') {
      continue;
    }
    self_check.total += 1;
    if (entry.sub === 0) {
      self_check.two_term += 1;
    } else {
      self_check.three_term += 1;
    }
    // 自校验：from + add - sub === to（算式自带验算，失败即样本/解析器有假。
    // 坏行不产断言——把腐败值带进 check_assertions 只会二次污染）
    if (entry.from + entry.add - entry.sub !== entry.to) {
      self_check.self_validate_failures.push({
        line: entry.line,
        text: `${entry.key} ${entry.from}+${entry.add}-${entry.sub}=${entry.to}`,
      });
      continue;
    }
    const id = name_ids.get(entry.key);
    if (id === undefined) {
      self_check.unknown_names.push({ line: entry.line, key: entry.key });
      continue;
    }
    // 链一致性：from 应等于同指标上一条的 to；不等时 from === 0 视为
    // PALAM 清零（BEGIN TRAIN 的引擎行为，#9 实测的「归零」类），其余即
    // 无法解释的断裂
    const prev = last_to.get(id);
    if (prev !== undefined && prev !== entry.from) {
      if (entry.from === 0) {
        self_check.chain.reset += 1;
      } else {
        self_check.chain.unexplained.push({
          line: entry.line,
          key: entry.key,
          prev_to: prev,
          from: entry.from,
        });
      }
    } else if (prev !== undefined) {
      self_check.chain.chained += 1;
    }
    last_to.set(id, entry.to);
    assertions.push({
      path: `palam:${tid}:${id}`,
      key: entry.key,
      from: entry.from,
      add: entry.add,
      sub: entry.sub,
      to: entry.to,
      line: entry.line,
    });
  }
  return { assertions, self_check };
}

/**
 * 核断言：窗口前的值应等于 from、窗口后的值应等于 to。
 *
 * @param {Array<object>} assertions extract_calc_assertions 的产物
 * @param {(path: string) => number} get_before 窗口前的读值器
 * @param {(path: string) => number} get_after 窗口后的读值器
 * @returns {Array<{assertion, stage: 'before'|'after', actual}>} 失败清单
 */
function check_assertions(assertions, get_before, get_after) {
  const failures = [];
  for (const a of assertions) {
    const before = get_before(a.path);
    const after = get_after(a.path);
    if (before !== a.from) {
      failures.push({
        assertion: a,
        stage: 'before',
        actual: before,
        expect: a.from,
      });
    }
    if (after !== a.to) {
      failures.push({
        assertion: a,
        stage: 'after',
        actual: after,
        expect: a.to,
      });
    }
  }
  return failures;
}

module.exports = { check_assertions, extract_calc_assertions, parse_name_ids };
