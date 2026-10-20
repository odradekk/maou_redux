#!/usr/bin/env node
/**
 * ere-game-builder 的命令行入口，代替上游给 DSH 用的 index.js。
 *
 * 上游 index.js 在 apply() 里向 DSH 注册技能与工具；本项目的技能已放到
 * .agents/skills 与 .claude/skills，这里只保留 5 个工具。registerTools() 的
 * 函数体逐行取自上游 apply() 的工具注册部分，没有改动，以后同步上游时整段替换
 * 即可；DSH 的会话工作目录换成 process.cwd()。
 *
 * 用法：node tools/ere-game-builder/cli.mjs <工具名> [--参数 值 …] [--json]
 *
 * @module ere-game-builder/cli
 */

import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import { checkGame } from './lib/check.js';
import { closestName } from './lib/data-path.js';
import { renderFindings } from './lib/findings.js';
import { listFilesUnder } from './lib/js-scan.js';
import { auditKojo } from './lib/kojo.js';
import { resolveAssetRoot, resolveUserPath } from './lib/paths.js';
import { loadApiIndex, renderApiMember, searchReference } from './lib/reference.js';
import { buildTokens, scaffoldGame, slugify } from './lib/scaffold.js';

/** Allowed values for `ere_search_reference`'s `docs` filter. */
const REFERENCE_DOC_IDS = ['wiki', 'api', 'example', 'pitfalls', 'i18n'];

/** The `.kojo` author's test project: it runs a file through the real engine. */
const KOJO_TEST_URL = 'https://gitgud.io/umaera/game/kojo-test';

/**
 * The lines appended to every `ere_check_kojo` report.
 *
 * Static checking only proves the file is *executable*; whether the dialogue
 * reads well (colours, line breaks, button placement) is a rendering question
 * that only the engine answers, so the report always points at the test project.
 * The empty-dictionary caveat is part of it: `kojo-test/ere/main.js` calls each
 * 篇目 with `{}`, so `%CHARA%` and friends stay literal there — an author who
 * does not know that would "fix" a file that was never broken.
 *
 * @returns {string[]} reminder lines.
 */
function kojoTestReminder() {
  return [
    '',
    '【实机看效果】',
    `静态检查只能证明这份口上能跑；排版、颜色、按钮位置好不好看，只有引擎说了算。作者用的测试工程是 kojo-test（${KOJO_TEST_URL}）：`,
    '  1. 把 .kojo 的内容贴进 kojo-test 的 ere/test.kojo（覆盖该文件原有的内容）；',
    '  2. 在引擎里【游戏】-【打开游戏】选 kojo-test 目录（即 ere 的父目录）；',
    '  3. 进入后会按篇目逐个执行、逐行打印，每行按任意键继续。',
    '注意：kojo-test 的 ere/main.js 目前调用篇目时传的是空字典（{}），所以 %CHARA% 这类占位符会原样显示、%COLOR% 也不会生效——那是测试工程自身的现状，不要据此改这份口上。',
  ];
}

/**
 * 收集 5 个工具的定义。函数体逐行取自上游 index.js 的 apply()，只去掉了技能注册；
 * 工具行为在这里保持与上游一致，本地改动只放在本文件其余部分。
 *
 * @param {{ tools: { register(definition: any): void } }} ctx - 只需要 tools.register。
 * @param {{ assetRoot?: string, maxScaffoldFiles?: number, maxSearchResults?: number }} [config] - 同上游插件行配置。
 * @returns {void}
 */
function registerTools(ctx, config = {}) {
  const assetRoot = resolveAssetRoot(config.assetRoot);
  const maxScaffoldFiles = Number.isSafeInteger(config.maxScaffoldFiles) ? config.maxScaffoldFiles : 200;
  const maxSearchResults = Number.isSafeInteger(config.maxSearchResults) ? config.maxSearchResults : 40;

  const cache = { index: undefined };
  const apiIndex = () => {
    if (cache.index === undefined) cache.index = loadApiIndex(assetRoot);
    return cache.index;
  };

  ctx.tools.register({
    name: 'ere_scaffold_game',
    description:
      '在指定目录创建一个可以直接被 EraElectron(ere) 引擎打开运行的最小 ere 游戏工程（csv/ 静态数据 + ere/ 脚本 + 引擎 SDK + 打包配置）。从零做 ere 游戏的第一步。',
    parameters: {
      type: 'object',
      additionalProperties: false,
      required: ['path'],
      properties: {
        path: {
          type: 'string',
          description: '游戏工程目录。相对路径按会话工作目录解析；不存在会被创建，非空需要 overwrite: true。',
        },
        title: { type: 'string', description: 'GameBase.csv 里的游戏名称。默认「未命名 ere 游戏」。' },
        author: { type: 'string', description: 'GameBase.csv 的作者。默认「你」。' },
        info: { type: 'string', description: 'GameBase.csv 的追加信息。' },
        year: { type: 'string', description: 'GameBase.csv 的发布时间。默认当前年份。' },
        gameCode: {
          type: 'string',
          description: '游戏标识（纯数字，建议 6 位）。改动后旧存档会被拒绝读取。默认 100000。',
        },
        version: { type: 'string', description: '纯数字，如 0001。默认 0001。' },
        minVersion: { type: 'string', description: '低于它的存档会被引擎拒绝。默认同 version。' },
        packageName: { type: 'string', description: 'npm 合法名。默认由 title 生成。' },
        overwrite: {
          type: 'boolean',
          description: '目标目录非空时覆盖同名文件。默认 false（直接报错，不写任何文件）。',
        },
        sdkPath: {
          type: 'string',
          description: '从本地引擎的 sdk/era-electron.js 复制 SDK，而不用内置副本。引擎升级后用它同步。',
        },
      },
    },
    output: { schema: { type: 'object', additionalProperties: true }, render: (_args, value) => [{ type: 'text', text: value.summary }] },
    async execute(args, exec) {
      const cwd = exec.agent?.session?.header?.cwd;
      if (cwd === undefined) throw new Error('ere_scaffold_game 需要一个带工作目录的会话');
      const target = resolveUserPath(args.path, cwd);
      const tokens = buildTokens({
        title: args.title,
        author: args.author,
        info: args.info,
        year: args.year,
        gameCode: args.gameCode,
        version: args.version,
        minVersion: args.minVersion,
        packageName: args.packageName ?? (args.title === undefined ? undefined : slugify(args.title)),
      });
      const report = scaffoldGame({
        assetRoot,
        targetDir: target,
        tokens,
        overwrite: args.overwrite === true,
        sdkPath: args.sdkPath === undefined ? undefined : resolveUserPath(args.sdkPath, cwd),
        maxFiles: maxScaffoldFiles,
      });
      exec.signal.throwIfAborted();
      const summary = [
        `已在 ${report.target} 创建 ere 游戏工程「${tokens.TITLE}」：写入 ${report.written.length} 个文件。`,
        '',
        '目录结构：',
        '- csv/GameBase.csv —— 游戏信息表（引擎唯一必需的表）',
        '- csv/Flag.csv、Base.csv、Abl.csv、Param.csv、Talent.csv、CStr.csv、Item.csv —— 示例变量表',
        '- csv/Chara/Chara0000.csv、Chara0001.csv —— 角色预设数据',
        '- ere/main.js —— 标题界面入口，导出异步函数',
        '- ere/page/homepage.js、page-save-game.js、page-load-game.js —— 主界面与存读档',
        '- ere/era-electron.js —— 引擎 SDK（必需，缺失则游戏无法与引擎通信）',
        '- webpack.config.js、package.json、.ere-min-version —— 打包 / 安卓版用',
        '',
        '下一步：用 write/edit 继续编写 ere/ 下的脚本与 csv/ 下的数据表，然后用 ere_check_game 检查；',
        '在引擎里用【游戏】-【打开游戏】选择该目录即可运行，改完脚本按 Ctrl/Command+R 重载。',
        report.skipped.length > 0 ? `\n已跳过（已存在且未覆盖）：${report.skipped.join('、')}` : '',
      ]
        .filter((line) => line !== '')
        .join('\n');
      return {
        summary,
        target: report.target,
        written: report.written,
        skipped: report.skipped,
        sdkSource: report.sdkSource,
        sdkVersion: report.sdkVersion ?? null,
        tokens,
      };
    },
  });

  ctx.tools.register({
    name: 'ere_check_game',
    description:
      '静态检查 ere 游戏工程能否被引擎加载运行，报出具体到文件与行号的问题：目录与必需文件、静态数据（csv/json/yml）编码与表结构、era.get/set 数据路径、era.* 是否存在、CommonJS 语法、#/ require 能否解析、被禁的 Node 模块、存档版本一致性，以及会**静默失效**的写法（.kojo 结构、网格对象缺 type、开发套件缺失或过期）。写完游戏跑一次并修掉所有 errors。',
    parameters: {
      type: 'object',
      additionalProperties: false,
      required: ['path'],
      properties: {
        path: { type: 'string', description: '游戏工程根目录（含 csv/ 与 ere/）。相对路径按会话工作目录解析。' },
        maxFindings: { type: 'integer', description: '最多收集多少条问题，默认 200。同类规则在输出里合并成一行，不再逐条列出。' },
        includeInfo: { type: 'boolean', description: '是否包含 info 级提示（调教表提醒等）。默认 false。' },
      },
    },
    output: { schema: { type: 'object', additionalProperties: true }, render: (_args, value) => [{ type: 'text', text: value.summary }] },
    async execute(args, exec) {
      const cwd = exec.agent?.session?.header?.cwd;
      if (cwd === undefined) throw new Error('ere_check_game 需要一个带工作目录的会话');
      const gameRoot = resolveUserPath(args.path, cwd);
      const report = checkGame({
        gameRoot,
        apiIndex: apiIndex(),
        maxFindings: Number.isSafeInteger(args.maxFindings) ? args.maxFindings : 200,
      });
      exec.signal.throwIfAborted();
      const includeInfo = args.includeInfo === true;
      const renderRow = (finding) =>
        `- ${finding.file}${finding.line > 0 ? `:${finding.line}` : ''} — ${finding.message}`;
      const info = report.findings.filter((finding) => finding.severity === 'info');
      const summary = [
        report.ok ? '✅ 未发现阻断问题（errors 为空）。' : `❌ 发现 ${report.counts.errors} 个错误，游戏将无法正常加载。`,
        `目录：${report.gameRoot}`,
        `运行模式：${report.mode === 'bundle' ? '打包版（static.json + era.bundle.js + main.bundle.js）' : `源码模式（静态数据格式：${report.staticFormat ?? '未找到'}）`}`,
        ...(report.devkit?.present === true
          ? [
              `开发套件：检测到 ${report.devkit.files} 个生成模块` +
                (report.devkit.tables.length > 0 ? `（覆盖 ${report.devkit.tables.join('、')}）` : '') +
                ' —— 由引擎生成，不要手改；过期时让用户在引擎里重新执行【帮助】-【生成开发套件】',
            ]
          : []),
        `统计：脚本 ${report.scripts.length} 个、静态数据文件 ${report.tables.length} 张表、角色预设 ${report.chara.length} 个、警告 ${report.counts.warnings} 条` +
          (report.overflow ? '（问题过多，已截断）' : ''),
        '',
        ...(report.counts.errors > 0 ? ['【错误】', ...renderFindings(report.errors, { renderRow }), ''] : []),
        ...(report.counts.warnings > 0 ? ['【警告】', ...renderFindings(report.warnings, { renderRow }), ''] : []),
        ...(includeInfo && info.length > 0 ? ['【提示】', ...renderFindings(info, { renderRow }), ''] : []),
        ...(report.tables.length > 0
          ? [
              '【已识别的数据表】',
              ...report.tables.map((table) => `- ${table.table}（${table.file}）：${table.variables.join('、') || '空'}`),
            ]
          : []),
      ]
        .filter((line) => line !== undefined)
        .join('\n');
      return { summary, ...report, sdkFile: report.sdkFile ?? null, staticFormat: report.staticFormat ?? null, info };
    },
  });

  ctx.tools.register({
    name: 'ere_check_kojo',
    description:
      '口上作者专用：不依赖游戏工程，直接检查一个 .kojo 文件或目录（递归查找）。报出会**静默失效**的写法：引擎校验的结构问题（重复 acc、拼错键名、被删的 if 条件、random 缺 lines、顶层篇目重名…）、引擎不查的嵌套数组条目，以及 %KEY% 审计——按篇目列出用到的键，指出永远不会被字典替换的位置（分段文本的 color、分割线内容、按钮收不到的键）。写完口上、贴进游戏前先过一遍。',
    parameters: {
      type: 'object',
      additionalProperties: false,
      required: ['path'],
      properties: {
        path: {
          type: 'string',
          description: '要检查的 .kojo 文件，或含 .kojo 的目录（递归查找，跳过 node_modules 与 .git）。相对路径按会话工作目录解析。',
        },
        maxFindings: {
          type: 'integer',
          description: '最多收集多少条问题，默认 200。同类规则在输出里合并成一行，其余只报数量。',
        },
      },
    },
    output: { schema: { type: 'object', additionalProperties: true }, render: (_args, value) => [{ type: 'text', text: value.summary }] },
    async execute(args, exec) {
      const cwd = exec.agent?.session?.header?.cwd;
      if (cwd === undefined) throw new Error('ere_check_kojo 需要一个带工作目录的会话');
      const target = resolveUserPath(args.path, cwd);
      if (!existsSync(target)) throw new Error(`找不到路径：${target}`);
      const isFile = statSync(target).isFile();
      if (isFile && !target.toLowerCase().endsWith('.kojo')) {
        throw new Error(`${target} 不是 .kojo 文件。要检查整个目录就直接传目录路径。`);
      }
      const files = isFile
        ? [{ absolute: target, label: target }]
        : listFilesUnder(target, (name) => name.toLowerCase().endsWith('.kojo'))
            .filter((name) => !name.split('/').includes('.git'))
            .map((name) => ({ absolute: join(target, name), label: name }));
      if (files.length === 0) throw new Error(`${target} 下没有找到任何 .kojo 文件`);

      const cap = Number.isSafeInteger(args.maxFindings) ? Math.max(1, args.maxFindings) : 200;
      const perFile = [];
      const allFindings = [];
      for (const file of files) {
        const text = readFileSync(file.absolute, 'utf8');
        const { findings, sections } = auditKojo(text, file.label);
        for (const finding of findings) allFindings.push({ ...finding, file: file.label });
        perFile.push({ file: file.label, sections, findings });
      }
      exec.signal.throwIfAborted();

      const errors = allFindings.filter((finding) => finding.severity === 'error');
      const warnings = allFindings.filter((finding) => finding.severity !== 'error');
      const sectionTotal = perFile.reduce((sum, file) => sum + file.sections.length, 0);
      // A finding carries the 篇目 name in its message but no line; the 篇目's own
      // line is the only precise anchor available, so it is offered as such.
      const anchorOf = (file, message) => {
        const hit = file.sections
          .filter((section) => message.startsWith(section.name))
          .sort((a, b) => b.name.length - a.name.length)[0];
        return hit === undefined ? '' : `（篇目「${hit.name}」起于第 ${hit.line} 行）`;
      };
      const renderRow = (file, finding) =>
        `- ${file.file}${finding.line > 0 ? `:${finding.line}` : ''}${anchorOf(file, finding.message)} — ${finding.message}`;
      const show = (list) =>
        renderFindings(list, {
          renderRow: (finding) => renderRow(perFile.find((file) => file.file === finding.file), finding),
        });
      const kindsOf = (file, kind) => {
        const keys = new Set();
        for (const section of file.sections) {
          for (const entry of section.keys) if (entry.kinds.includes(kind)) keys.add(entry.key);
        }
        return [...keys].sort();
      };
      const dictionaryRow = (file) => {
        const parts = [];
        const cap30 = (keys) => (keys.length > 30 ? `${keys.slice(0, 30).join('、')}…（共 ${keys.length} 个）` : keys.join('、'));
        const text = [...new Set([...kindsOf(file, 'text'), ...kindsOf(file, 'button')])].sort();
        if (text.length > 0) parts.push(`正文/按钮 ${cap30(text)}`);
        const colors = kindsOf(file, 'lineColor');
        if (colors.length > 0) parts.push(`整行颜色 ${cap30(colors)}`);
        const inert = kindsOf(file, 'inert');
        if (inert.length > 0) parts.push(`不会被替换 ${cap30(inert)}`);
        const conditions = [...new Set(file.sections.flatMap((section) => section.conditions))].sort();
        if (conditions.length > 0) parts.push(`if 里的 d ${cap30(conditions)}`);
        return `- ${file.file}：${parts.join('；') || '（没有用到字典键）'}`;
      };
      const sectionNames = perFile[0]?.sections ?? [];
      const sectionList =
        sectionNames.length > 12
          ? `${sectionNames.slice(0, 12).map((section) => `${section.name} 第 ${section.line} 行`).join('、')}…（共 ${sectionNames.length} 个）`
          : sectionNames.map((section) => `${section.name} 第 ${section.line} 行`).join('、');

      const summary = [
        errors.length > 0 ? `❌ 发现 ${errors.length} 个错误：这些写法会被引擎静默吞掉，务必改掉。` : '✅ 未发现阻断问题。',
        `路径：${target}`,
        isFile
          ? `篇目：${sectionTotal} 个${sectionTotal > 0 ? `（${sectionList}）` : ''}`
          : `检查：${files.length} 个 .kojo 文件、${sectionTotal} 个篇目`,
        '',
        ...(errors.length > 0 ? ['【错误】', ...show(errors), ''] : []),
        ...(warnings.length > 0 ? ['【警告】', ...show(warnings), ''] : []),
        '【字典键清单】',
        "这些 %KEY% 必须由游戏在调用口上时通过字典给出（`{CHARA: '…'}` 这种）。工具只列出，不判断游戏是否提供。",
        ...perFile.map(dictionaryRow),
        ...kojoTestReminder(),
      ]
        .filter((line) => line !== undefined)
        .join('\n');

      return {
        summary,
        target,
        files: files.map((file) => file.label),
        counts: { files: files.length, sections: sectionTotal, errors: errors.length, warnings: warnings.length },
        findings: allFindings.slice(0, cap),
        sections: isFile ? perFile[0].sections : [],
        dictionary: perFile.map((file) => {
          const merged = new Map();
          for (const section of file.sections) {
            for (const entry of section.keys) {
              if (!merged.has(entry.key)) merged.set(entry.key, new Set());
              for (const kind of entry.kinds) merged.get(entry.key).add(kind);
            }
          }
          return {
            file: file.file,
            sections: file.sections.length,
            keys: [...merged.entries()]
              .map(([key, kinds]) => ({ key, kinds: [...kinds].sort() }))
              .sort((a, b) => a.key.localeCompare(b.key)),
            conditions: [...new Set(file.sections.flatMap((section) => section.conditions))].sort(),
          };
        }),
      };
    },
  });

  ctx.tools.register({
    name: 'ere_search_reference',
    description:
      '在插件内置的 EraElectron 知识库中检索：引擎 API（含签名、参数、返回、config 类型字段）、CSV 静态数据表格式、项目配置、官方例程的结论与坑点、常见陷阱。写 ere 游戏时用它确认 API 名称与数据路径，不要凭记忆猜。',
    parameters: {
      type: 'object',
      additionalProperties: false,
      required: ['query'],
      properties: {
        query: { type: 'string', description: '关键词，可以是 API 名（printMultiColumns）、数据路径（flag:）、概念（存档、进度条、排版）或中文词。' },
        limit: { type: 'integer', description: `最多返回多少条结果，默认 8，上限 ${maxSearchResults}。` },
        docs: {
          type: 'array',
          items: { type: 'string', enum: REFERENCE_DOC_IDS },
          description: '只在这些文档里检索：wiki=引擎与开发指南摘要，api=运行时 API 摘要，example=官方例程参考，pitfalls=陷阱速查，i18n=多语言参考实现。默认全部。',
        },
      },
    },
    output: { schema: { type: 'object', additionalProperties: true }, render: (_args, value) => [{ type: 'text', text: value.summary }] },
    async execute(args, exec) {
      const requested = Number.isSafeInteger(args.limit) ? args.limit : 8;
      const limit = Math.max(1, Math.min(requested, maxSearchResults));
      const hits = searchReference(assetRoot, args.query, { limit, docs: args.docs });
      exec.signal.throwIfAborted();
      const summary =
        hits.length === 0
          ? `没有在知识库中找到与 ${JSON.stringify(args.query)} 相关的内容。可以换个关键词，或直接用 read 工具读取插件的 assets/reference/。`
          : hits.map((hit) => `## [${hit.kind}] ${hit.title}\n\n${hit.detail}`).join('\n\n---\n\n');
      return { summary, query: args.query, count: hits.length, hits };
    },
  });

  ctx.tools.register({
    name: 'ere_api_lookup',
    description:
      '精确查询 EraElectron SDK 中某个 era.* API 的完整签名、参数、返回值与相关 config 类型字段。名称写错时会给出最接近的候选。比凭记忆写 API 更可靠。',
    parameters: {
      type: 'object',
      additionalProperties: false,
      required: ['name'],
      properties: {
        name: {
          type: 'string',
          description: 'API 名，不含 era. 前缀，例如 printButton、saveData、logger.debug。',
        },
      },
    },
    output: { schema: { type: 'object', additionalProperties: true }, render: (_args, value) => [{ type: 'text', text: value.summary }] },
    async execute(args, exec) {
      const index = apiIndex();
      const requested = String(args.name).replace(/^era\./, '').trim();
      const rendered = renderApiMember(requested, index);
      exec.signal.throwIfAborted();
      if (rendered !== '') {
        const origin = index.runtime[requested] !== undefined ? '（运行时注入，SDK 未声明）' : '';
        return { summary: `${rendered}${origin === '' ? '' : `\n\n${origin}`}`, name: requested, found: true };
      }
      const names = [...Object.keys(index.api), ...Object.keys(index.runtime)].filter((entry) => !entry.includes('.'));
      const suggestion = closestName(requested, names);
      const summary = [
        `没有名为 era.${requested} 的 API。`,
        suggestion === undefined ? '' : `最接近的是 era.${suggestion}。`,
        '',
        '可用 API：',
        names.filter((entry) => entry !== 'logger').join('、'),
      ]
        .filter((line) => line !== '')
        .join('\n');
      return { summary, name: requested, found: false, suggestion: suggestion ?? null };
    },
  });
}

/** 参数或工具名写错时抛出，退出码 2，与「检查发现问题」的退出码 1 区分。 */
class UsageError extends Error {}

/** @type {Map<string, any>} */
const tools = new Map();
registerTools({ tools: { register: (definition) => tools.set(definition.name, definition) } });

function usage() {
  return [
    '用法：node tools/ere-game-builder/cli.mjs <工具名> [--参数 值 …] [--json]',
    '      node tools/ere-game-builder/cli.mjs <工具名> --help',
    '',
    '必填参数可以直接写成位置参数，例如 `ere_api_lookup printButton`、`ere_check_game .`。',
    '数组参数可以重复写，也可以用逗号分隔。--json 输出完整结果对象，默认只输出摘要。',
    '退出码：0 正常；1 检查发现错误或 API 不存在；2 参数错误或运行失败。',
    '',
    '工具：',
    ...[...tools.values()].map((tool) => `  ${tool.name}\n    ${tool.description}`),
  ].join('\n');
}

function toolHelp(tool) {
  const required = new Set(tool.parameters.required ?? []);
  return [
    `用法：node tools/ere-game-builder/cli.mjs ${tool.name} [--参数 值 …] [--json]`,
    '',
    tool.description,
    '',
    '参数：',
    ...Object.entries(tool.parameters.properties).map(([key, schema]) => {
      const kind = schema.type === 'array' ? `${schema.items.enum?.join('|') ?? 'string'}，可多个` : schema.type;
      return `  --${key} <${kind}>${required.has(key) ? '（必填）' : ''}\n    ${schema.description ?? ''}`;
    }),
  ].join('\n');
}

/**
 * 按工具自带的参数 schema 解析命令行，得到与 DSH 调用时相同形状的 args。
 *
 * @param {any} tool - registerTools() 收集到的工具定义。
 * @param {string[]} argv - 工具名之后的命令行参数。
 * @returns {{ args: Record<string, unknown>, json: boolean, help: boolean }}
 */
function parseToolArgs(tool, argv) {
  const properties = tool.parameters.properties;
  const options = { json: { type: 'boolean' }, help: { type: 'boolean', short: 'h' } };
  for (const [key, schema] of Object.entries(properties)) {
    options[key] = { type: schema.type === 'boolean' ? 'boolean' : 'string', multiple: schema.type === 'array' };
  }
  let parsed;
  try {
    parsed = parseArgs({ args: argv, options, allowPositionals: true });
  } catch (error) {
    throw new UsageError(error.message);
  }
  const { values, positionals } = parsed;
  const args = {};
  for (const [key, schema] of Object.entries(properties)) {
    const value = values[key];
    if (value === undefined) continue;
    if (schema.type === 'integer') {
      // 上游 execute 对非整数静默改用默认值，命令行上写错应当直接报出来
      if (!/^-?\d+$/.test(value)) throw new UsageError(`--${key} 需要整数，收到 ${value}`);
      args[key] = Number(value);
    } else if (schema.type === 'array') {
      const items = value.flatMap((entry) => entry.split(',')).filter((entry) => entry !== '');
      const allowed = schema.items.enum;
      const unknown = allowed === undefined ? [] : items.filter((entry) => !allowed.includes(entry));
      if (unknown.length > 0) throw new UsageError(`--${key} 只接受 ${allowed.join('、')}，收到 ${unknown.join('、')}`);
      args[key] = items;
    } else {
      args[key] = value;
    }
  }
  const required = tool.parameters.required ?? [];
  if (positionals.length > 0) {
    if (positionals.length > 1 || required.length !== 1 || args[required[0]] !== undefined) {
      throw new UsageError(`多余的位置参数：${positionals.join(' ')}`);
    }
    args[required[0]] = positionals[0];
  }
  if (values.help !== true) {
    const missing = required.filter((key) => args[key] === undefined);
    if (missing.length > 0) throw new UsageError(`缺少必填参数：${missing.map((key) => `--${key}`).join('、')}`);
  }
  return { args, json: values.json === true, help: values.help === true };
}

function exitCodeOf(toolName, result) {
  if (toolName === 'ere_check_game') return result.ok ? 0 : 1;
  if (toolName === 'ere_check_kojo') return result.counts.errors > 0 ? 1 : 0;
  if (toolName === 'ere_api_lookup') return result.found ? 0 : 1;
  return 0;
}

async function main(argv) {
  const [toolName, ...rest] = argv;
  if (toolName === undefined || toolName === '--help' || toolName === '-h') {
    console.log(usage());
    return 0;
  }
  const tool = tools.get(toolName);
  if (tool === undefined) throw new UsageError(`未知工具：${toolName}\n\n${usage()}`);
  const { args, json, help } = parseToolArgs(tool, rest);
  if (help) {
    console.log(toolHelp(tool));
    return 0;
  }
  const exec = { agent: { session: { header: { cwd: process.cwd() } } }, signal: new AbortController().signal };
  const result = await tool.execute(args, exec);
  console.log(json ? JSON.stringify(result, null, 2) : result.summary);
  return exitCodeOf(toolName, result);
}

main(process.argv.slice(2)).then(
  (code) => {
    process.exitCode = code;
  },
  (error) => {
    console.error(error instanceof UsageError ? error.message : (error.stack ?? String(error)));
    process.exitCode = 2;
  },
);
