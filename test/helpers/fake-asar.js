/**
 * @file 最小 asar 构造器（issue #91 测试专用）。
 *
 * engine-contract 检查器与 engine-bundle 都按 app.asar 的头结构读文件：
 * 前 16 字节是目录 pickle 的 framing，偏移 12 处的 UInt32LE 是头 JSON 的
 * 字节长度，JSON 从 16 起；文件内容的 offset 相对「头结束处」计。本构造器
 * 按同款结构产出真的能被两边解析的 asar——供测试伪造「换了哈希的渲染包」
 * 「锚点被改的引擎」「模块号漂移的 background.js」，不碰真实引擎。
 *
 * offsets 相对数据段起点，与头长度无关，一遍即可算定，无不动点迭代。
 */

'use strict';

/**
 * @param {Object<string, string>} files 相对路径 → 文件内容（UTF-8）
 * @returns {Buffer} 可被 engine-bundle / engine-contract-check 解析的 asar
 */
function build_asar(files) {
  const names = Object.keys(files);
  const sizes = names.map((name) => Buffer.byteLength(files[name], 'utf8'));
  const offsets = [];
  let cursor = 0;
  names.forEach((_, i) => {
    offsets.push(cursor);
    cursor += sizes[i];
  });

  const root = { files: {} };
  names.forEach((name, i) => {
    const parts = name.split('/');
    let node = root;
    for (let depth = 0; depth < parts.length - 1; depth += 1) {
      node.files[parts[depth]] = node.files[parts[depth]] || { files: {} };
      node = node.files[parts[depth]];
    }
    node.files[parts[parts.length - 1]] = {
      offset: String(offsets[i]),
      size: sizes[i],
    };
  });

  const header = Buffer.from(JSON.stringify(root), 'utf8');
  const prefix = Buffer.alloc(16);
  prefix.writeUInt32LE(header.length, 12);
  const body = Buffer.concat(
    names.map((name) => Buffer.from(files[name], 'utf8')),
  );
  return Buffer.concat([prefix, header, body]);
}

/**
 * 伪造渲染包 source map 的 JSON 文本：sourcesContent 只含给定字面串。
 * @param {string[]} literals 渲染层源码里应出现的字面
 */
function build_renderer_map(literals) {
  return JSON.stringify({
    version: 3,
    sources: ['webpack://era-electron/./src/renderer/app.vue'],
    sourcesContent: [literals.join('\n')],
  });
}

module.exports = { build_asar, build_renderer_map };
