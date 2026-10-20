/**
 * CSV reading for EraElectron static data files.
 *
 * The engine's CSV dialect, as documented in the wiki (`#9 静态数据文件`):
 *  - encoded UTF-8 or UTF-8 with BOM; every other encoding is a load failure;
 *  - comma separated, one record per line;
 *  - a line whose first character is `;` is a comment and is ignored;
 *  - files are matched case-insensitively, both for the file name and for the
 *    table/variable names inside them.
 *
 * This module only implements the reading half; it never rewrites a game file.
 *
 * @module dsh-ere-game-builder/lib/csv
 */

/** Byte-order marks that identify a text encoding. */
const BOMS = [
  { bytes: [0xef, 0xbb, 0xbf], encoding: 'utf-8-bom', bomLength: 3 },
  { bytes: [0xff, 0xfe, 0x00, 0x00], encoding: 'utf-32le-bom', bomLength: 4 },
  { bytes: [0x00, 0x00, 0xfe, 0xff], encoding: 'utf-32be-bom', bomLength: 4 },
  { bytes: [0xff, 0xfe], encoding: 'utf-16le-bom', bomLength: 2 },
  { bytes: [0xfe, 0xff], encoding: 'utf-16be-bom', bomLength: 2 },
];

/**
 * Decode a static data file and report everything the checker needs to know
 * about its byte-level shape.
 *
 * @param {Uint8Array} bytes - raw file contents.
 * @returns {{
 *   text: string,
 *   encoding: 'utf-8' | 'utf-8-bom' | 'utf-16le-bom' | 'utf-16be-bom' | 'utf-32le-bom' | 'utf-32be-bom' | 'not-utf-8',
 *   hasBom: boolean,
 *   encodingSupported: boolean,
 *   lineEnding: 'lf' | 'crlf' | 'cr' | 'mixed' | 'none',
 *   error?: string,
 * }} decoded file contents and its detected encoding.
 */
export function decodeText(bytes) {
  let encoding = 'utf-8';
  let hasBom = false;
  let body = bytes;
  for (const candidate of BOMS) {
    if (candidate.bytes.every((byte, index) => bytes[index] === byte)) {
      encoding = candidate.encoding;
      hasBom = true;
      body = bytes.subarray(candidate.bomLength);
      break;
    }
  }
  const encodingSupported = encoding === 'utf-8' || encoding === 'utf-8-bom';
  let text = '';
  let error;
  if (encodingSupported) {
    try {
      text = new TextDecoder('utf-8', { fatal: true }).decode(body);
    } catch {
      error = '文件不是合法的 UTF-8（很可能被 Excel 存成了 GBK/ANSI）：请另存为 UTF-8 或 UTF-8-BOM';
      encoding = 'not-utf-8';
    }
  } else {
    error = `文件编码是 ${encoding}，EraElectron 只读取 UTF-8 与 UTF-8-BOM`;
  }
  return {
    text,
    encoding,
    hasBom,
    encodingSupported,
    lineEnding: detectLineEnding(body),
    ...(error === undefined ? {} : { error }),
  };
}

/**
 * Classify the dominant line ending of a byte sequence.
 *
 * @param {Uint8Array} bytes - raw file contents.
 * @returns {'lf' | 'crlf' | 'cr' | 'mixed' | 'none'} the detected ending.
 */
export function detectLineEnding(bytes) {
  let crlf = 0;
  let lf = 0;
  let cr = 0;
  for (let index = 0; index < bytes.length; index += 1) {
    const byte = bytes[index];
    if (byte === 0x0d) {
      if (bytes[index + 1] === 0x0a) {
        crlf += 1;
        index += 1;
      } else {
        cr += 1;
      }
    } else if (byte === 0x0a) {
      lf += 1;
    }
  }
  const kinds = [crlf > 0, lf > 0, cr > 0].filter(Boolean).length;
  if (kinds === 0) return 'none';
  if (kinds > 1) return 'mixed';
  if (crlf > 0) return 'crlf';
  if (lf > 0) return 'lf';
  return 'cr';
}

/**
 * Split one CSV record into fields, honouring double-quoted fields.
 *
 * @param {string} line - a single record, without its line terminator.
 * @returns {{ cells: string[], unterminatedQuote: boolean }} parsed fields.
 */
export function splitRecord(line) {
  const cells = [];
  let cell = '';
  let quoted = false;
  let index = 0;
  while (index < line.length) {
    const char = line[index];
    if (quoted) {
      if (char === '"') {
        if (line[index + 1] === '"') {
          cell += '"';
          index += 2;
          continue;
        }
        quoted = false;
        index += 1;
        continue;
      }
      cell += char;
      index += 1;
      continue;
    }
    if (char === '"' && cell.trim() === '') {
      cell = '';
      quoted = true;
      index += 1;
      continue;
    }
    if (char === ',') {
      cells.push(cell.trim());
      cell = '';
      index += 1;
      continue;
    }
    cell += char;
    index += 1;
  }
  cells.push(cell.trim());
  return { cells, unterminatedQuote: quoted };
}

/**
 * Cut a record at the first `;` that is not inside a double-quoted field.
 *
 * The engine treats `;` as the start of a comment anywhere in a line, not only
 * at the beginning: `csv/Talent.csv` in the official example writes
 * `1,C感觉  ; -1 - 钝感，1 - 敏感`.
 *
 * @param {string} line - one raw record.
 * @param {string} comment - the comment introducer.
 * @returns {{ body: string, hasComment: boolean, wholeLine: boolean }} the record body.
 */
export function stripInlineComment(line, comment = ';') {
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (quoted) {
      if (char === '"') {
        if (line[index + 1] === '"') {
          index += 1;
          continue;
        }
        quoted = false;
      }
      continue;
    }
    if (char === '"') {
      quoted = true;
      continue;
    }
    if (char === comment) {
      const body = line.slice(0, index);
      return { body, hasComment: true, wholeLine: body.trim().length === 0 };
    }
  }
  return { body: line, hasComment: false, wholeLine: false };
}

/**
 * Parse CSV text into records, dropping comments and blank lines but keeping
 * every original line number so diagnostics point at the real file.
 *
 * @param {string} text - decoded file contents.
 * @param {{ comment?: string }} [options] - dialect overrides.
 * @returns {{
 *   rows: Array<{ line: number, cells: string[], raw: string }>,
 *   comments: number,
 *   blankLines: number,
 *   issues: Array<{ line: number, message: string }>,
 * }} parsed records and structural problems.
 */
export function parseCsv(text, options = {}) {
  const comment = options.comment ?? ';';
  const rows = [];
  const issues = [];
  let comments = 0;
  let blankLines = 0;
  const lines = text.split(/\r\n|\n|\r/);
  for (let index = 0; index < lines.length; index += 1) {
    const raw = lines[index];
    const lineNumber = index + 1;
    if (raw.trim().length === 0) {
      blankLines += 1;
      continue;
    }
    const stripped = stripInlineComment(raw, comment);
    if (stripped.hasComment && stripped.wholeLine) {
      comments += 1;
      continue;
    }
    const { cells, unterminatedQuote } = splitRecord(stripped.body);
    if (unterminatedQuote) {
      issues.push({ line: lineNumber, message: 'unterminated double quote in this record' });
    }
    if (!stripped.hasComment && cells.every((cell) => cell === '')) {
      blankLines += 1;
      continue;
    }
    if (stripped.hasComment) comments += 1;
    rows.push({ line: lineNumber, cells, raw });
  }
  return { rows, comments, blankLines, issues };
}

/**
 * Read a one-dimensional variable table (`序号,变量名[,附加列...]`).
 *
 * @param {ReturnType<typeof parseCsv>} parsed - parsed CSV.
 * @returns {{
 *   entries: Array<{ line: number, id: number | undefined, name: string, extra: string[] }>,
 *   issues: Array<{ line: number, message: string }>,
 * }} table entries plus per-row problems.
 */
export function readVariableTable(parsed) {
  const entries = [];
  const issues = [...parsed.issues];
  for (const row of parsed.rows) {
    const [first = '', second = '', ...extra] = row.cells;
    if (row.cells.length === 1 && first === '') continue;
    const id = /^-?\d+$/.test(first) ? Number(first) : undefined;
    if (id === undefined) {
      issues.push({
        line: row.line,
        message: `first column must be an integer variable index, got ${JSON.stringify(first)}`,
      });
    }
    if (second === '') {
      issues.push({ line: row.line, message: 'variable name (second column) is empty' });
    }
    entries.push({ line: row.line, id, name: second, extra });
  }
  return { entries, issues };
}

/**
 * Read a two-column key/value table (`GameBase.csv`, `_Replace.csv`).
 *
 * @param {ReturnType<typeof parseCsv>} parsed - parsed CSV.
 * @returns {{
 *   pairs: Array<{ line: number, key: string, value: string }>,
 *   issues: Array<{ line: number, message: string }>,
 * }} key/value pairs plus per-row problems.
 */
export function readKeyValueTable(parsed) {
  const pairs = [];
  const issues = [...parsed.issues];
  for (const row of parsed.rows) {
    const [key = '', ...rest] = row.cells;
    if (key === '') {
      issues.push({ line: row.line, message: 'key (first column) is empty' });
      continue;
    }
    pairs.push({ line: row.line, key, value: rest.join(',').trim() });
  }
  return { pairs, issues };
}

/**
 * Read a character definition file (`Chara/CharaXXXX.csv`).
 *
 * The dialect is a sequence of `键,值[,值...]` records; repeated keys append
 * (`基础属性,体力,2000`).
 *
 * @param {ReturnType<typeof parseCsv>} parsed - parsed CSV.
 * @returns {{
 *   records: Array<{ line: number, key: string, values: string[] }>,
 *   issues: Array<{ line: number, message: string }>,
 * }} records plus per-row problems.
 */
export function readCharaTable(parsed) {
  const records = [];
  const issues = [...parsed.issues];
  for (const row of parsed.rows) {
    const [key = '', ...values] = row.cells;
    if (key === '') {
      issues.push({ line: row.line, message: 'key (first column) is empty' });
      continue;
    }
    records.push({ line: row.line, key, values });
  }
  return { records, issues };
}

/**
 * Compare a table name the way the engine does: case-insensitively.
 *
 * @param {string} value - a file, table, or variable name.
 * @returns {string} the folded key.
 */
export function foldName(value) {
  return String(value).trim().toLowerCase();
}
