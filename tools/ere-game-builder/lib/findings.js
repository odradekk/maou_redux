/**
 * Rendering helpers shared by the two static checkers.
 *
 * A checker can report the same rule hundreds of times in one file. Every finding
 * carries the 篇目 name and the offending value, so the messages all differ even when
 * the rule does not — matching them exactly would never group anything. What the model
 * reads is the rendered summary, so that list is what has to stay bounded; the
 * structured `findings` array is left exactly as the checker produced it.
 *
 * @module dsh-ere-game-builder/lib/findings
 */

/** A rule reported at least this often is collapsed into a single entry. */
const REPEAT_THRESHOLD = 4;
/** Rows one severity may render before the rest is summarised. */
const ROW_BUDGET = 30;

/**
 * The identity of the rule behind a message, with the parts that change per occurrence
 * (quoted values, numbers) masked out.
 *
 * @param {string} message - finding message.
 * @returns {string} grouping key.
 */
export function ruleOf(message) {
  return String(message)
    .replace(/「[^」]*」/g, '「…」')
    .replace(/\d+/g, 'N');
}

/**
 * Group findings by rule, keeping first-seen order.
 *
 * @param {Array<{ message: string }>} list - findings.
 * @returns {Array<Array<object>>} one array of findings per rule.
 */
export function groupByRule(list) {
  const groups = new Map();
  for (const finding of list) {
    const key = ruleOf(finding.message);
    const group = groups.get(key);
    if (group === undefined) groups.set(key, [finding]);
    else group.push(finding);
  }
  return [...groups.values()];
}

/**
 * The `file:line` a finding points at, with the line omitted when the finding has none.
 *
 * @param {{ file: string, line: number }} finding - finding.
 * @returns {string} position label.
 */
function positionOf(finding) {
  return `${finding.file}${finding.line > 0 ? `:${finding.line}` : ''}`;
}

/**
 * Render a finding list for the model.
 *
 * A rule that repeats is one problem to fix, not fifty lines to read, so it is listed
 * once with its count and a few positions; a list longer than the row budget ends with
 * the number of entries that were not rendered.
 *
 * @param {Array<{ file: string, line: number, message: string }>} list - findings.
 * @param {{ renderRow: (finding: object) => string, limit?: number }} options - row renderer and row budget.
 * @returns {string[]} summary rows.
 */
export function renderFindings(list, { renderRow, limit = ROW_BUDGET }) {
  const rows = [];
  let listed = 0;
  for (const group of groupByRule(list)) {
    if (rows.length >= limit) break;
    if (group.length < REPEAT_THRESHOLD) {
      for (const finding of group) {
        rows.push(renderRow(finding));
        listed += 1;
      }
      continue;
    }
    rows.push(renderRow(group[0]));
    // Positions that repeat (a finding anchored to its 篇目 rather than a line, for
    // instance) say nothing, so only distinct ones are quoted.
    const first = positionOf(group[0]);
    const positions = [...new Set(group.map(positionOf))]
      .filter((position) => position !== first)
      .slice(0, 3);
    rows.push(
      `  ↳ 同一规则命中 ${group.length} 处` +
        (positions.length > 0 ? `，例如 ${positions.join('、')}` : ''),
    );
    listed += group.length;
  }
  const rest = list.length - listed;
  if (rest > 0) rows.push(`- …还有 ${rest} 条未列出（共 ${list.length} 条）`);
  return rows;
}
