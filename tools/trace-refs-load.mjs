// 锚表分片装载（issue #290）：从 tools/trace-check.mjs 抽出 FILES / LOG_REFS /
// SAMPLE_LOG_REFS，按「一个 js 文件一份锚表」落在 tools/trace-refs/。
//
// 抽出的理由：单文件两张大数组是跨票冲突面（#232 并 master 166 处；数组块
// 被切断三次）。按域拆不够——二十张口上票全落 kojo.mjs 仍互撞。加载器按
// 目录扫描、新增分片即入账，不靠 index 的 import 清单（那份清单会变成
// 下一处跨票冲突面）。形状照 tools/load-mutations.mjs。

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const TOOL_DIR = path.dirname(fileURLToPath(import.meta.url));

/** 锚表分片的默认目录：新增分片文件即入账，无需登记 */
export const DEFAULT_TRACE_REFS_DIR = path.join(TOOL_DIR, 'trace-refs');

/**
 * 装载锚表全部分片并汇总。
 *
 * @param {string} dir 分片目录
 * @returns {Promise<{ FILES: object[], LOG_REFS: object[], SAMPLE_LOG_REFS: Record<string, object[]> }>}
 */
export async function load_trace_refs(dir) {
  const names = fs
    .readdirSync(dir)
    .filter((n) => n.endsWith('.mjs'))
    .sort();
  if (names.length === 0) {
    throw new Error(`锚表目录 ${dir} 里没有 .mjs 分片`);
  }
  const FILES = [];
  const LOG_REFS = [];
  const SAMPLE_LOG_REFS = {};
  for (const name of names) {
    const mod = await import(pathToFileURL(path.join(dir, name)).href);
    if (!Array.isArray(mod.FILES)) {
      throw new Error(`${name} 必须导出 FILES 数组`);
    }
    if (!Array.isArray(mod.LOG_REFS)) {
      throw new Error(`${name} 必须导出 LOG_REFS 数组`);
    }
    if (
      mod.SAMPLE_LOG_REFS === undefined ||
      typeof mod.SAMPLE_LOG_REFS !== 'object' ||
      Array.isArray(mod.SAMPLE_LOG_REFS)
    ) {
      throw new Error(`${name} 必须导出 SAMPLE_LOG_REFS 对象`);
    }
    FILES.push(...mod.FILES);
    LOG_REFS.push(...mod.LOG_REFS);
    for (const [sample, groups] of Object.entries(mod.SAMPLE_LOG_REFS)) {
      if (!Array.isArray(groups)) {
        throw new Error(`${name} 的 SAMPLE_LOG_REFS['${sample}'] 必须是数组`);
      }
      const bucket = SAMPLE_LOG_REFS[sample] ?? [];
      bucket.push(...groups);
      SAMPLE_LOG_REFS[sample] = bucket;
    }
  }
  return { FILES, LOG_REFS, SAMPLE_LOG_REFS };
}
