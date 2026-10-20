/**
 * The EraElectron game checker.
 *
 * Answers one question: will this game folder load and run in the ere engine,
 * and if not, exactly where does it break? The checks follow the engine's own
 * load sequence (wiki `#1 基本知识` §"EraElectron运行流程") and its static data
 * grammar (wiki `#9 静态数据文件`).
 *
 * @module dsh-ere-game-builder/lib/check
 */

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { decodeText, foldName, parseCsv, readKeyValueTable } from './csv.js';
import { closestName, validateDataPath } from './data-path.js';
import { blankComments, checkSyntax, extractDataPaths, extractEraMembers, extractRequires, findUntypedGridObjects, lineAt, listFilesUnder, resolveSpecifier } from './js-scan.js';
import { GAMEBASE_CANONICAL_KEYS, GAMEBASE_NAME_MAP, GAMEBASE_REQUIRED_KEYS, canonicalGameBaseKey } from './name-mapping.js';
import { parseStructuredText } from './static-rows.js';
import { DEVKIT_DIRECTORY, readDevkit } from './devkit.js';
import { auditKojo } from './kojo.js';
import { engineTableName, readStaticData, readStaticFile } from './tables.js';

/** Static data directory priority, as `era-start.js` resolves it. */
export const STATIC_FORMAT_PRIORITY = ['yml', 'json', 'csv'];

/**
 * The signature every copy of the engine SDK carries.
 *
 * A game may ship a minified or hand-trimmed SDK — the engine only requires the
 * module to be bound as `era` and to export `version.sdk`, so the marker must not
 * depend on `const era = {` keeping its spaces.
 */
const SDK_MARKERS = [/module\.exports\s*=\s*era\s*;/, /version\s*:\s*\{[^}]*sdk\s*:/];

/**
 * Create a finding collector with a cap on emitted rows.
 *
 * @param {number} cap - maximum findings retained.
 * @returns {{ add: (severity: string, file: string, line: number, message: string) => void, list: object[], overflow: boolean }} collector.
 */
function createFindings(cap) {
  const list = [];
  let overflow = false;
  return {
    list,
    get overflow() {
      return overflow;
    },
    add(severity, file, line, message) {
      if (list.length >= cap) {
        overflow = true;
        return;
      }
      list.push({ severity, file, line, message });
    },
  };
}

/**
 * Check a game folder.
 *
 * @param {{
 *   gameRoot: string,
 *   apiIndex: { api: Record<string, unknown>, console?: Record<string, unknown> },
 *   maxFindings?: number,
 * }} request - check request.
 * @returns {Record<string, unknown>} the report.
 */
export function checkGame(request) {
  const gameRoot = resolve(request.gameRoot);
  const findings = createFindings(request.maxFindings ?? 300);
  const error = (file, line, message) => findings.add('error', file, line, message);
  const warn = (file, line, message) => findings.add('warning', file, line, message);
  const info = (file, line, message) => findings.add('info', file, line, message);

  if (!existsSync(gameRoot) || !statSync(gameRoot).isDirectory()) {
    const finding = { severity: 'error', file: '.', line: 0, message: `目录不存在或不是目录：${gameRoot}` };
    return {
      ok: false,
      gameRoot,
      mode: 'raw',
      staticFormat: undefined,
      gameBase: undefined,
      scripts: [],
      sdkFile: undefined,
      chara: [],
      tables: [],
      errors: [finding],
      warnings: [],
      findings: [finding],
      overflow: false,
      counts: { errors: 1, warnings: 0, files: 0 },
    };
  }

  const entries = readdirSync(gameRoot);
  const lowerEntries = new Map(entries.map((name) => [foldName(name), name]));

  // --- runtime mode -------------------------------------------------------
  const bundleFiles = ['static.json', 'era.bundle.js', 'main.bundle.js'];
  const bundlePresent = bundleFiles.filter((name) => lowerEntries.has(foldName(name)));
  const bundleMode = bundlePresent.length === 3;
  if (bundlePresent.length > 0 && !bundleMode) {
    warn('.', 0, `只找到打包文件 ${bundlePresent.join('、')}，缺少 ${bundleFiles.filter((name) => !bundlePresent.includes(name)).join('、')}；引擎只有在这三个文件都存在时才走打包模式`);
  }

  // --- static data directory ---------------------------------------------
  const existingFormats = STATIC_FORMAT_PRIORITY.filter((format) => lowerEntries.has(format));
  let staticFormat = existingFormats[0];
  let declaredFormat;
  const configPath = entries.find((name) => foldName(name) === 'ere.config.json');
  if (configPath !== undefined) {
    try {
      const config = JSON.parse(readFileSync(join(gameRoot, configPath), 'utf8'));
      declaredFormat = config?.system?.static;
    } catch (parseError) {
      warn(configPath, 0, `ere.config.json 不是合法 JSON（引擎会忽略它）：${parseError.message}`);
    }
  }
  if (typeof declaredFormat === 'string' && declaredFormat.length > 0) {
    staticFormat = declaredFormat;
    if (!existsSync(join(gameRoot, staticFormat))) {
      error('ere.config.json', 0, `system.static 指定了 "${staticFormat}"，但游戏目录下没有这个文件夹`);
    }
  }
  if (!bundleMode && existingFormats.length === 0) {
    error('.', 0, `没有静态数据文件夹：需要 yml/、json/ 或 csv/ 之一（引擎报错「静态数据文件夹 (yml / json / csv) 不存在! 游戏数据载入失败!」）`);
  }
  if (existingFormats.length > 1) {
    warn(
      '.',
      0,
      `同时存在 ${existingFormats.join('、')} 多个静态数据文件夹，引擎按 ${STATIC_FORMAT_PRIORITY.join(' > ')} 的优先级只会读取 ${existingFormats[0]}/`,
    );
  }

  // --- GameBase -----------------------------------------------------------
  // The engine reads GameBase through the same per-format parser as every other
  // table, so all three formats are checked here; only bundle mode differs.
  const staticDirectory = staticFormat === undefined ? undefined : join(gameRoot, staticFormat);
  const staticExtension = staticFormat === undefined ? undefined : `.${staticFormat}`;
  let gameBase = null;
  if (!bundleMode && staticFormat !== undefined && staticExtension !== undefined && staticDirectory !== undefined) {
    const gameBaseFile = existsSync(staticDirectory)
      ? readdirSync(staticDirectory).find(
          (name) =>
            extname(name).toLowerCase() === staticExtension &&
            foldName(name.slice(0, -extname(name).length)) === 'gamebase',
        )
      : undefined;
    if (gameBaseFile === undefined) {
      error(
        `${staticFormat}/`,
        0,
        `缺少 GameBase${staticExtension}：没有它引擎会报「GameBase.${staticFormat} 不存在! 游戏数据载入失败!」并终止加载`,
      );
    } else {
      const label = `${staticFormat}/${gameBaseFile}`;
      const decoded = readStaticFile(join(staticDirectory, gameBaseFile), label);
      const parsed =
        staticFormat === 'csv'
          ? parseCsv(decoded.text)
          : parseStructuredText(decoded.text, staticFormat, engineTableName(gameBaseFile));
      const { pairs, issues } = readKeyValueTable(parsed);
      for (const issue of issues) error(label, issue.line, issue.message);
      gameBase = {};
      const seen = new Map();
      for (const pair of pairs) {
        const canonical = canonicalGameBaseKey(pair.key, foldName);
        if (canonical === undefined) {
          // Never suggest the key itself: the folded candidate list used to contain
          // `gameCode`, so an unknown `gameCode` was answered with "did you mean gameCode".
          const suggestion = closestName(
            pair.key,
            [...Object.keys(GAMEBASE_NAME_MAP), ...GAMEBASE_CANONICAL_KEYS].filter(
              (candidate) => foldName(candidate) !== foldName(pair.key),
            ),
          );
          warn(
            label,
            pair.line,
            `GameBase 里的「${pair.key}」不是引擎认识的字段${suggestion === undefined ? '' : `，是否想写「${suggestion}」`}`,
          );
          continue;
        }
        if (seen.has(canonical)) {
          const previous = seen.get(canonical);
          warn(
            label,
            pair.line,
            previous > 0
              ? `「${canonical}」重复定义（第 ${previous} 行已经用过）`
              : `「${canonical}」重复定义`,
          );
        }
        seen.set(canonical, pair.line);
        gameBase[canonical] = pair.value;
        if (['gameCode', 'version', 'allowVersion'].includes(canonical) && !/^-?\d+$/.test(pair.value.trim())) {
          error(label, pair.line, `「${pair.key}」应为纯数字，当前是 ${JSON.stringify(pair.value)}`);
        }
      }
      for (const required of parsed.failed === true ? [] : GAMEBASE_REQUIRED_KEYS) {
        if (gameBase[required] === undefined) {
          const alias = Object.entries(GAMEBASE_NAME_MAP).find(([, canonical]) => canonical === required)?.[0];
          error(label, 0, `GameBase 缺少必填项「${alias ?? required}」（${required}）`);
        }
      }
    }
  } else if (bundleMode) {
    const staticJson = join(gameRoot, lowerEntries.get('static.json'));
    try {
      const parsedStatic = JSON.parse(readFileSync(staticJson, 'utf8'));
      if (parsedStatic?.static?.gamebase === undefined) {
        error('static.json', 0, 'static.json 里没有 static.gamebase，引擎无法取得游戏基础数据');
      }
      gameBase = Object.fromEntries(
        Object.entries(parsedStatic?.static?.gamebase ?? {}).map(([key, value]) => [key, String(value)]),
      );
    } catch (parseError) {
      error('static.json', 0, `static.json 不是合法 JSON：${parseError.message}`);
    }
  }

  // --- scripts ------------------------------------------------------------
  const ereEntry = entries.find((name) => foldName(name) === 'ere');
  const ereDirectory = ereEntry === undefined ? join(gameRoot, 'ere') : join(gameRoot, ereEntry);
  // The engine's generated development kit, when the project has one.
  const devkit = readDevkit(ereDirectory, ereEntry ?? 'ere');
  const devkitFiles = new Set(devkit.files);
  let devkitStaleFromGenerated = false;
  if (ereEntry === undefined) {
    error('.', 0, '缺少 ere/ 文件夹：游戏脚本集必须放在游戏目录下的 ere/ 里');
  } else if (!statSync(ereDirectory).isDirectory()) {
    error(ereEntry, 0, 'ere 不是文件夹');
  }

  let mainExists = false;
  let sdkFile;
  const jsFiles = [];
  if (existsSync(ereDirectory) && statSync(ereDirectory).isDirectory()) {
    const scripts = listFilesUnder(ereDirectory, (name) => name.toLowerCase().endsWith('.js'));
    for (const relativePath of scripts) {
      const absolute = join(ereDirectory, relativePath);
      const source = readFileSync(absolute, 'utf8');
      const relativeToRoot = `${ereEntry ?? 'ere'}/${relativePath}`;
      jsFiles.push(relativeToRoot);
      if (relativePath.toLowerCase() === 'main.js') mainExists = true;
      if (SDK_MARKERS.every((marker) => marker.test(source))) sdkFile = relativeToRoot;
      const syntax = checkSyntax(source, absolute);
      if (syntax !== undefined) {
        error(relativeToRoot, syntax.line, `语法错误：${syntax.message}`);
        continue;
      }
      scanScript({ source, relativeToRoot, ereDirectory, absolute, apiIndex: request.apiIndex, model: undefined, error, warn, info, gameRoot });
      for (const gridObject of findUntypedGridObjects(blankComments(source))) {
        // Deterministic: the engine drops it and says nothing, so it blocks.
        error(relativeToRoot, gridObject.line, gridObject.message);
      }
    }
    if (!mainExists) {
      error(`${ereEntry ?? 'ere'}/`, 0, '缺少 main.js：引擎以 ere/main.js 作为脚本入口');
    }
    if (sdkFile === undefined) {
      error(
        `${ereEntry ?? 'ere'}/`,
        0,
        '找不到引擎 SDK：ere/ 下必须有一个类似 era-electron.js 的文件（从引擎的 sdk/era-electron.js 复制），否则游戏无法与引擎通信',
      );
    }
  }

  // --- static data model --------------------------------------------------
  let model = { exists: false, files: [], variables: {}, chara: [], issues: [] };
  if (!bundleMode && staticFormat !== undefined && staticDirectory !== undefined && existsSync(staticDirectory)) {
    model = readStaticData(staticDirectory, { gameRoot, format: staticFormat });
    for (const issue of model.issues) {
      const severity = /编码|UTF-8|GBK|重复|已经由|不是引擎认识|解析失败|不可用/.test(issue.message)
        ? 'error'
        : 'warning';
      findings.add(severity, `${staticFormat}/${issue.file}`, issue.line, issue.message);
    }
  } else if (!bundleMode) {
    info('.', 0, `静态数据使用 ${staticFormat ?? '未知'} 格式`);
  }

  // --- data paths in scripts (needs the model) ----------------------------
  if (existsSync(ereDirectory) && statSync(ereDirectory).isDirectory() && model.exists) {
    for (const relativePath of listFilesUnder(ereDirectory, (name) => name.toLowerCase().endsWith('.js'))) {
      const absolute = join(ereDirectory, relativePath);
      const source = readFileSync(absolute, 'utf8');
      const cleaned = blankComments(source.charCodeAt(0) === 0xfeff ? source.slice(1) : source);
      const relativeToRoot = `${ereEntry ?? 'ere'}/${relativePath}`;
      const trainOnlyNoted = new Set();
      // Generated files are owned by the engine, so a bad path in one means the
      // kit is out of date — not that the author mistyped something. Collect one
      // signal and report it once, instead of inviting a hand edit.
      const generated = devkitFiles.has(relativeToRoot);
      for (const usage of extractDataPaths(cleaned)) {
        const line = lineAt(source, usage.offset);
        if (generated) {
          // Only a real error means the kit is stale. The train-only advisory is
          // expected here — a generated accessor reads `delta:` / `deltabase:` by
          // design — and reporting it would send the author to edit engine code.
          if (validateDataPath(usage.text, model, usage.kind).some((finding) => finding.severity === 'error')) {
            devkitStaleFromGenerated = true;
          }
          continue;
        }
        // A table whose file failed to parse has no variable list, so every use
        // would look unknown; the parse error itself is already reported.
        if (model.variables[foldName(usage.text.split(':')[0])]?.parseFailed === true) continue;
        for (const finding of validateDataPath(usage.text, model, usage.kind)) {
          // The train-only note is per table per file; anything louder is kept.
          if (finding.severity === 'info') {
            const table = usage.text.split(':')[0].toLowerCase();
            if (trainOnlyNoted.has(table)) continue;
            trainOnlyNoted.add(table);
          }
          findings.add(finding.severity, relativeToRoot, line, `era.${usage.api}(${JSON.stringify(usage.text)})：${finding.message}`);
        }
      }
      for (const usage of extractEraMembers(cleaned)) {
        if (
          (usage.member === 'addCharacter' || usage.member === 'resetCharacter') &&
          model.chara.some((entry) => entry.parseFailed !== true)
        ) {
          const after = cleaned.slice(usage.offset);
          const call = /^era\s*\.\s*(?:addCharacter|resetCharacter)\s*\(([^)]*)\)/.exec(after);
          if (call !== null) {
            const declared = new Set(
              model.chara.filter((entry) => entry.parseFailed !== true).map((entry) => entry.id),
            );
            for (const token of call[1].split(',')) {
              const id = Number(token.trim());
              if (Number.isInteger(id) && !declared.has(id)) {
                warn(
                  relativeToRoot,
                  lineAt(source, usage.offset),
                  `era.${usage.member}(${id})：没有任何 Chara*.csv 声明角色 ${id}，该角色不会有预设数据（声明了：${[...declared].join('、') || '无'}）`,
                );
              }
            }
          }
        }
      }
    }
  }

  // --- kojo dialogue files ------------------------------------------------
  // `.kojo` is YAML with a fixed schema; almost every mistake in it is silent,
  // so it is validated with the same parser the engine uses — and with the same
  // audit `ere_check_kojo` exposes on its own, so a project check finds the
  // dictionary mistakes too (a `%KEY%` in a position the engine never replaces,
  // or a config key the button branch drops). There is one implementation:
  // `lib/kojo.js`; neither tool reimplements the other.
  if (existsSync(ereDirectory) && statSync(ereDirectory).isDirectory()) {
    for (const relativePath of listFilesUnder(ereDirectory, (name) => name.toLowerCase().endsWith('.kojo'))) {
      const absolute = join(ereDirectory, relativePath);
      const relativeToRoot = `${ereEntry ?? 'ere'}/${relativePath}`;
      const decoded = decodeText(new Uint8Array(readFileSync(absolute)));
      if (decoded.error !== undefined) error(relativeToRoot, 0, decoded.error);
      for (const finding of auditKojo(decoded.text, relativeToRoot).findings) {
        if (finding.severity === 'error') error(relativeToRoot, finding.line, finding.message);
        else warn(relativeToRoot, finding.line, finding.message);
      }
    }
  }

  // --- generated development kit ------------------------------------------
  if (devkit.present) {
    for (const file of devkit.missingMarkers) {
      warn(
        file,
        0,
        '生成文件缺少「// GENERATED START」「// GENERATED END」标记；引擎重新生成时会整份覆盖，写在这些文件里的手写代码会丢失',
      );
    }
    if (devkitStaleFromGenerated) {
      warn(
        `${ereEntry ?? 'ere'}/${DEVKIT_DIRECTORY}/`,
        0,
        '开发套件与当前静态数据不一致（生成文件里引用了已不存在的表或变量）。套件由引擎生成、不要手改：请在引擎中重新执行【帮助】-【生成开发套件】',
      );
    }
  }

  // --- project metadata ---------------------------------------------------
  const minVersionFile = entries.find((name) => name === '.ere-min-version');
  if (minVersionFile === undefined) {
    info('.ere-min-version', 0, '缺少 .ere-min-version（仅 CI 打包与安卓版最小更新使用，不影响引擎加载）');
  } else {
    const text = readFileSync(join(gameRoot, minVersionFile), 'utf8').trim();
    if (!/^\d+$/.test(text)) warn('.ere-min-version', 0, `内容 ${JSON.stringify(text)} 不是纯数字版本号`);
    // `.ere-min-version` is the lower bound for the *incremental* update, so the CI
    // compares it against GameBase's `version` — it is normally the previous
    // release, and need not equal `allowVersion` (the save-compatibility bound).
    if (gameBase?.version !== undefined && /^\d+$/.test(text) && Number(text) > Number(gameBase.version)) {
      warn(
        '.ere-min-version',
        0,
        `.ere-min-version(${text}) 高于 GameBase 的「版本」(${gameBase.version})：增量更新的下限比当前版本还新，玩家只能整包下载`,
      );
    }
  }
  if (gameBase?.version !== undefined && gameBase?.allowVersion !== undefined) {
    if (Number(gameBase.allowVersion) > Number(gameBase.version)) {
      error(`${staticFormat ?? ''}/GameBase`, 0, `「最低支持版本」(${gameBase.allowVersion}) 高于「版本」(${gameBase.version})，任何存档都会被拒绝读取`);
    }
  }

  // The template ships it inside `ere/`, but a project may keep it at the game root
  // (it still covers `ere/`, and that is what the official example game does).
  const jsconfig =
    (existsSync(ereDirectory) ? readdirSync(ereDirectory).find((name) => foldName(name) === 'jsconfig.json') : undefined) ??
    entries.find((name) => foldName(name) === 'jsconfig.json');
  const webpackConfig = entries.find((name) => foldName(name) === 'webpack.config.js');
  if (webpackConfig !== undefined && jsconfig === undefined) {
    warn('ere/', 0, '有 webpack.config.js 但缺少 ere/jsconfig.json：编辑器与打包器对 "#/" 别名的配置应当保持一致');
  }
  if (webpackConfig !== undefined) {
    const text = readFileSync(join(gameRoot, webpackConfig), 'utf8');
    if (!/alias/.test(text) || !/#/.test(text)) {
      warn(webpackConfig, 0, 'webpack.config.js 里没有看到 "#" 别名；打包版会无法解析 require("#/…")');
    }
  }

  // --- summary ------------------------------------------------------------
  const errors = findings.list.filter((finding) => finding.severity === 'error');
  const warnings = findings.list.filter((finding) => finding.severity === 'warning');
  const relative = (path) => path.split('/').join('/');
  const tableSummary = Object.entries(model.variables).map(([table, declared]) => ({
    table,
    file: relative(declared.file),
    variables: declared.entries.map((entry) => entry.name).filter((name) => name !== ''),
  }));

  return {
    ok: errors.length === 0,
    gameRoot,
    mode: bundleMode ? 'bundle' : 'raw',
    staticFormat,
    gameBase,
    scripts: jsFiles,
    sdkFile,
    chara: model.chara.map((entry) => ({ file: entry.file, id: entry.id, name: entry.name, callname: entry.callname })),
    tables: tableSummary,
    devkit: {
      present: devkit.present,
      tables: devkit.tables,
      files: devkit.files.length,
      missingMarkers: devkit.missingMarkers,
    },
    errors,
    warnings,
    findings: findings.list,
    overflow: findings.overflow,
    counts: { errors: errors.length, warnings: warnings.length, files: jsFiles.length + model.files.length },
  };
}

/**
 * Scan one script for require, `era.*`, and data-path problems.
 *
 * @param {Record<string, any>} context - scan context.
 * @returns {void}
 */
function scanScript(context) {
  const source = context.source.charCodeAt(0) === 0xfeff ? context.source.slice(1) : context.source;
  const cleaned = blankComments(source);
  const { error, warn, info, relativeToRoot } = context;

  for (const usage of extractRequires(cleaned)) {
    const line = lineAt(source, usage.offset);
    const specifier = usage.specifier;
    if (specifier.startsWith('#/')) {
      if (resolveSpecifier(specifier, context.ereDirectory, context.absolute) === undefined) {
        error(relativeToRoot, line, `require('${specifier}') 解析不到文件：${specifier} 指向 ere/${specifier.slice(2)}（引擎会尝试 .js、.json、/index.js）`);
      }
      continue;
    }
    if (specifier.startsWith('./') || specifier.startsWith('../')) {
      if (resolveSpecifier(specifier, context.ereDirectory, context.absolute) === undefined) {
        error(relativeToRoot, line, `require('${specifier}') 解析不到文件`);
      }
      continue;
    }
    if (specifier === 'crypto' || specifier === 'node:crypto') continue;
    const bare = specifier.replace(/^node:/, '').split('/')[0];
    const builtin = /^node:/.test(specifier) || BUILTIN_NAMES.has(bare);
    if (builtin) {
      error(
        relativeToRoot,
        line,
        `require('${specifier}')：引擎禁止在游戏脚本里引入 Node.js 内置模块（唯一的例外是 crypto）`,
      );
    } else {
      warn(relativeToRoot, line, `require('${specifier}')：游戏脚本不能使用第三方模块，请改为游戏内的相对路径或 "#/…" 路径`);
    }
  }

  const api = context.apiIndex?.api ?? {};
  const runtimeApi = context.apiIndex?.runtime ?? {};
  for (const usage of extractEraMembers(cleaned)) {
    if (usage.assigned) continue;
    if (api[usage.member] !== undefined || runtimeApi[usage.member] !== undefined) continue;
    if (context.apiIndex?.console?.[usage.member] !== undefined) {
      warn(
        relativeToRoot,
        lineAt(source, usage.offset),
        `era.${usage.member} 只存在于引擎控制台，游戏脚本里不可用`,
      );
      continue;
    }
    const suggestion = closestName(usage.member, [...Object.keys(api), ...Object.keys(runtimeApi)]);
    error(
      relativeToRoot,
      lineAt(source, usage.offset),
      `era.${usage.member} 不是 SDK 提供的 API${suggestion === undefined ? '' : `，是否想写 era.${suggestion}`}`,
    );
  }
  void info;
}

/** Bare built-in names, used to classify a require specifier. */
const BUILTIN_NAMES = new Set(
  [
    'assert',
    'async_hooks',
    'buffer',
    'child_process',
    'cluster',
    'console',
    'constants',
    'crypto',
    'dgram',
    'diagnostics_channel',
    'dns',
    'domain',
    'events',
    'fs',
    'http',
    'http2',
    'https',
    'inspector',
    'module',
    'net',
    'os',
    'path',
    'perf_hooks',
    'process',
    'punycode',
    'querystring',
    'readline',
    'repl',
    'stream',
    'string_decoder',
    'sys',
    'timers',
    'tls',
    'trace_events',
    'tty',
    'url',
    'util',
    'v8',
    'vm',
    'wasi',
    'worker_threads',
    'zlib',
  ],
);
