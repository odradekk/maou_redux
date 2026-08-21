/**
 * @file 写坏型探针的临时仓库副本（#89 二次整改的阻断 2）。
 *
 * 原则（#91 勘误 + #89 两轮整改的结论）：**写坏型探针一律住临时副本，
 * 不写工作树**——node --test 并行跑测试文件，就地改共享树会与并行读者
 * 撞车（16 核 Linux 五跑四红的形态）。同理，**副本按清单最小拷贝，不整
 * 棵拷用不到的目录**：递归拷贝在乎的不是内容是「条目在不在」，并行的
 * 探针在源目录里增删文件，cpSync 枚举之后条目消失就 ENOENT、整棵失败
 * （Windows npm test 7/9 红的回归形态——「写单个文件 vs 递归拷贝整棵
 * 目录」的碰撞面比原来更大）。清单里的条目都是没有并行写者的文件，
 * 碰撞面收到零。
 *
 * 副本在进程内惰性单例（每个测试文件一个进程、文件内用例串行），探针
 * 在副本里改、跑**副本里的**工具、finally 还原——与旧的就地探针同形状，
 * 但落在私有地上，进程怎么死都污染不到仓库。副本的 tools/ 在运行时从
 * 真树拷入，变异到工具本体的条目（mutation-check 的 M94/M161–M166/
 * M172–M177 一类）仍会传进副本，不会因此空转。
 */

'use strict';

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const REPO_ROOT = path.resolve(__dirname, '..', '..');

/** 单条目拷贝：文件走 copyFileSync（fs.cpSync 覆写既有文件在 Windows 上有怪错——实测 ESRCH/「操作成功完成」形态，Node 24），目录走 cpSync */
function copy_entry(from, to) {
  fs.mkdirSync(path.dirname(to), { recursive: true });
  if (fs.statSync(from).isDirectory()) {
    fs.cpSync(from, to, { recursive: true });
  } else {
    fs.copyFileSync(from, to);
  }
}

/**
 * 建临时仓库副本，只携带 entries 列出的文件/目录（相对仓库根，保持相对
 * 路径；目录整棵、文件单个）。返回副本根路径，调用方负责清理。
 * @param {string[]} entries 仓库相对路径清单
 * @returns {string} 副本根
 */
function make_probe_repo(entries) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ere-probe-repo-'));
  for (const rel of entries) {
    const from = path.join(REPO_ROOT, rel);
    if (!fs.existsSync(from)) {
      throw new Error(
        `探针副本的源不存在：${rel}——清单过期失效了，同步本文件的调用方`,
      );
    }
    copy_entry(from, path.join(root, rel));
  }
  return root;
}

/**
 * 把清单重新拷一遍盖回副本（探针还原的统一形态）：单例副本跨用例复用，
 * 每条写坏型用例的 finally 都调它，探针残留不会流进同文件的后续用例。
 * 目录条目是合并不是镜像——副本里多出的探针文件不会被清掉，那类残留
 * 由各用例开头的「上次残骸先清」处理（与就地探针时代的纪律相同）。
 * @param {string} root make_probe_repo 返回的副本根
 * @param {string[]} entries 同一份清单
 */
function refresh_probe_repo(root, entries) {
  for (const rel of entries) {
    copy_entry(path.join(REPO_ROOT, rel), path.join(root, rel));
  }
}

/**
 * 从仓库内某源文件的文本里抽字面路径（探针副本清单推导用——工具引用的
 * target/ 源文件散在它的数据表里，逐个手抄会过期失效，从源码文本机械提取）。
 * @param {string} file_rel 仓库相对的源文件
 * @param {RegExp} re 含一个捕获组的路径正则
 * @returns {string[]} 去重后真实存在的路径
 */
function extract_paths(file_rel, re) {
  const src = fs.readFileSync(path.join(REPO_ROOT, file_rel), 'utf8');
  return [...new Set([...src.matchAll(re)].map((m) => m[1]))].filter((p) =>
    fs.existsSync(path.join(REPO_ROOT, p)),
  );
}

module.exports = {
  REPO_ROOT,
  extract_paths,
  make_probe_repo,
  refresh_probe_repo,
};
