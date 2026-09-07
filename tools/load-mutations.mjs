// 变异条目表的装载（从 tools/mutation-check.mjs 抽出，issue #256）。
//
// 抽出的理由：条目表现在有第二个消费者。tools/select-tests.mjs 把每条的
// `file:`（靶文件）→ `tests:`（应变红的测试）当作**相关性映射**用——那张
// 映射不是新造的，是变异检查每次全量都在实证的（「改这个文件，这些测试
// 必须红」正是它的判据）。两边必须看到同一份条目，所以装载只能有一处。
//
// 不放进 tools/mutations/ 的理由：那是条目表目录，装载器按 `*.mjs` 全扫，
// 放进去它会装载自己。

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const TOOL_DIR = path.dirname(fileURLToPath(import.meta.url));

/** 条目表分片的默认目录：新增分片文件即入账，无需登记 */
export const DEFAULT_LEDGER_DIR = path.join(TOOL_DIR, 'mutations');

/**
 * 按文件名序装载条目表全部分片，保留分片边界。
 *
 * `declared` 是分片自报的条数（`export const COUNT`），核对在
 * tools/mutation-check.mjs 的 gate_count 里；没声明的分片给 undefined，
 * 由那道门报出，装载器本身不判。
 *
 * @param {string} dir 分片目录
 * @returns {Promise<Array<{name: string, entries: object[], declared: number|undefined}>>}
 */
export async function load_shards(dir) {
  const names = fs
    .readdirSync(dir)
    .filter((n) => n.endsWith('.mjs'))
    .sort();
  if (names.length === 0) {
    throw new Error(`条目表目录 ${dir} 里没有 .mjs 分片`);
  }
  const shards = [];
  for (const name of names) {
    const mod = await import(pathToFileURL(path.join(dir, name)).href);
    if (!Array.isArray(mod.default)) {
      throw new Error(`${name} 必须默认导出数组`);
    }
    shards.push({ name, entries: mod.default, declared: mod.COUNT });
  }
  return shards;
}

/**
 * 装载条目表全部分片并按文件名序汇总。
 *
 * @param {string} dir 分片目录
 * @returns {Promise<Array<{desc: string, file: string, find: string, replace: string, tests: string[], must_mention: string, engine?: boolean}>>}
 */
export async function load_ledger(dir) {
  return (await load_shards(dir)).flatMap((s) => s.entries);
}
