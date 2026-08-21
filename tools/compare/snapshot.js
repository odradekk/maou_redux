/**
 * @file T18 输出比对·变量层快照（issue #48，验证决议 #9）。
 *
 * == era.raw() 的裁决（#9 的风险记录，这张票实测确认） ==
 *
 * raw() 在引擎侧真实存在（app.asar 的 EraApi：`raw(){return{data:
 * this.data,global:this.global}}`，开发套件生成器在用），但 **SDK
 * （ere/era-electron.js）没有声明它**——SDK 尾部的 _s 包装循环只包已声明
 * 的函数，于是引擎将来删掉 raw() 时，游戏代码得到的是 `era.raw is not a
 * function` 崩溃、而不是 SDK 那句友好的 unsupported api 提示。这条风险
 * 已记录在 #9 的结论评论里。
 *
 * 本工具链**离线运行**，快照直接取自 #16 夹具的变量存储（内容等价于
 * raw().data 展平）；实机取快照若 raw() 失效，退路是 snapshot_via_get——
 * 用 era.get 遍历已写入键（实现与测试都在，夹具世界可用；实机同样成立，
 * SDK 的 get 是声明过的）。
 */

'use strict';

/**
 * 夹具存储 → 「路径 → 值」快照（键排序，deep-equal 友好）。
 * @param {Map<string, any>} store 夹具的 store
 * @returns {Record<string, any>}
 */
function snapshot_from_store(store) {
  const out = {};
  [...store.keys()].sort().forEach((key) => {
    out[key] = store.get(key);
  });
  return out;
}

/**
 * 退路实现：经 era.get 遍历键清单重建快照（raw() 失效时的替代采集法）。
 * @param {object} era 夹具或 SDK 的 era 对象
 * @param {Iterable<string>} keys 键清单（如快照前已知的全部键）
 * @returns {Record<string, any>}
 */
function snapshot_via_get(era, keys) {
  const out = {};
  [...keys].sort().forEach((key) => {
    const value = era.get(key);
    if (value !== undefined) {
      out[key] = value;
    }
  });
  return out;
}

/**
 * 两份快照比对（#9 变量层的三类差异：数值算错 / 整项消失 / 凭空出现）。
 *
 * @param {Record<string, any>} before
 * @param {Record<string, any>} after
 * @param {Array<{re: RegExp, reason: string}>} [ignore] 忽略规则（每条注明
 *   理由，#9 第 5 问的约定；命中即不进差异清单）
 * @returns {{changed: Array<{path, from, to}>, added: Array<{path, value}>,
 *   removed: Array<{path, value}>, ignored: Array<{path, reason}>}}
 */
function diff_snapshots(before, after, ignore = []) {
  const changed = [];
  const added = [];
  const removed = [];
  const ignored = [];
  const why = (p) => ignore.find((r) => r.re.test(p))?.reason;
  for (const path of new Set([...Object.keys(before), ...Object.keys(after)])) {
    const reason = why(path);
    if (reason !== undefined) {
      ignored.push({ path, reason });
      continue;
    }
    const b = before[path];
    const a = after[path];
    if (b === undefined && a !== undefined) {
      added.push({ path, value: a });
    } else if (b !== undefined && a === undefined) {
      removed.push({ path, value: b });
    } else if (b !== a) {
      changed.push({ path, from: b, to: a });
    }
  }
  return { changed, added, removed, ignored };
}

module.exports = { diff_snapshots, snapshot_from_store, snapshot_via_get };
