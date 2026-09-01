/**
 * 副作用注册族模块的扫描器（#274 指令族锁与 #282 口上锁共用）。
 *
 * 从一份模块源码里取出 `family.register(...)` 的编号集合。
 * 覆盖三种写法：字面量、`for (const [id, …] of [[n, …], …])`、
 * `for (const [k, …] of Object.entries(CONST))`（CONST 的键是编号）。
 * 解析不了就抛——新写法必须显式纳入，不许静默漏号。
 *
 * @param {string} src
 * @param {string} family 族名（如 'com_family'、'kojo_message_com_family'）
 * @returns {Set<number>}
 */
function extract_register_ids(src, family) {
  const stripped = src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '');
  const ids = new Set();
  const call_re = new RegExp(`${family}\\.register\\(`, 'g');
  for (const m of stripped.matchAll(call_re)) {
    const arg = first_arg(stripped.slice(m.index + m[0].length));
    if (/^\d+$/.test(arg)) {
      ids.add(Number(arg));
      continue;
    }
    const wrapped = arg.match(/^Number\((\w+)\)$/);
    const ident = wrapped ? wrapped[1] : arg;
    if (!/^\w+$/.test(ident)) {
      throw new Error(`${family}.register 的第一参无法静态解析：${arg}`);
    }
    const before = stripped.slice(0, m.index);
    const headers = [
      ...before.matchAll(
        new RegExp(
          `for\\s*\\(\\s*const\\s*(?:\\[\\s*${ident}\\b[^\\]]*\\]|${ident})\\s+of\\s+`,
          'g',
        ),
      ),
    ];
    const header = headers.pop();
    if (!header) {
      throw new Error(`${family}.register(${ident}) 找不到对应 for-of`);
    }
    const rest = before.slice(header.index + header[0].length).trimStart();
    if (rest.startsWith('Object.entries(')) {
      const name_m = rest.match(/^Object\.entries\((\w+)\)/);
      if (!name_m) {
        throw new Error(
          `${family}.register(${ident}) 的 Object.entries 参数无法解析`,
        );
      }
      for (const id of object_entry_keys(stripped, name_m[1])) {
        ids.add(id);
      }
    } else if (rest.startsWith('[')) {
      const arr = take_bracket(rest);
      const pairs = [...arr.matchAll(/\[\s*(\d+)\s*,/g)].map((x) =>
        Number(x[1]),
      );
      if (pairs.length > 0) {
        pairs.forEach((id) => ids.add(id));
      } else {
        [...arr.matchAll(/\d+/g)].forEach((x) => ids.add(Number(x[0])));
      }
    } else {
      throw new Error(
        `${family}.register(${ident}) 的 for-of 右侧无法解析：${rest.slice(0, 80)}`,
      );
    }
  }
  return ids;
}

/** 取 `register(` 之后到顶层逗号或右括号的第一参（含嵌套括号） */
function first_arg(src) {
  let depth = 0;
  for (let i = 0; i < src.length; i += 1) {
    const ch = src[i];
    if (ch === '(') {
      depth += 1;
    } else if (ch === ')') {
      if (depth === 0) {
        return src.slice(0, i).trim();
      }
      depth -= 1;
    } else if (ch === ',' && depth === 0) {
      return src.slice(0, i).trim();
    }
  }
  throw new Error(`register 调用未闭合：${src.slice(0, 40)}`);
}

/** 取匹配的方括号片段（含两端） */
function take_bracket(src) {
  if (src[0] !== '[') {
    throw new Error('期望以 [ 开头');
  }
  let depth = 0;
  for (let i = 0; i < src.length; i += 1) {
    if (src[i] === '[') {
      depth += 1;
    } else if (src[i] === ']') {
      depth -= 1;
      if (depth === 0) {
        return src.slice(0, i + 1);
      }
    }
  }
  throw new Error('方括号未闭合');
}

/** `const NAME = { 202: {…}, … }` 的数字键 */
function object_entry_keys(src, name) {
  const hit = src.match(new RegExp(`const ${name} = \\{`));
  if (!hit) {
    throw new Error(`找不到 const ${name} = {`);
  }
  const body = take_brace(src.slice(hit.index + hit[0].length - 1));
  return [...body.matchAll(/^\s*(\d+)\s*:/gm)].map((m) => Number(m[1]));
}

function take_brace(src) {
  if (src[0] !== '{') {
    throw new Error('期望以 { 开头');
  }
  let depth = 0;
  for (let i = 0; i < src.length; i += 1) {
    if (src[i] === '{') {
      depth += 1;
    } else if (src[i] === '}') {
      depth -= 1;
      if (depth === 0) {
        return src.slice(0, i + 1);
      }
    }
  }
  throw new Error('花括号未闭合');
}

module.exports = { extract_register_ids };
