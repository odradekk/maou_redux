/**
 * 项目级 MCP 服务器：让 Claude Code 能直接操作 EraElectron 引擎窗口（issue #406
 * 判定三的补充手段——阶段收口时的「引擎手工验收」，见
 * docs/agents/ticket-sop.md §5.6）。
 *
 * 只包一层薄壳：Electron 自动化本身是 Playwright 官方支持的能力
 * （`_electron` 命名空间，playwright.dev/docs/api/class-electron），官方
 * `@playwright/mcp` 只覆盖浏览器、不含这层，社区第三方 MCP 包又是非官方维护，
 * 所以这里直接调用官方 API 自己写这几个工具，代码在仓库里、审查成本可控。
 *
 * 用的是 playwright-core 而不是 playwright：`_electron` 是
 * playwright-core 自带的能力，playwright 只是在它之上多一个下载三大浏览器的
 * postinstall——本项目测的是 Electron 自带的 Chromium，不需要那几百 MB。
 *
 * 一次只驱动一个引擎实例，不做多会话/多实例：这是给一个人在本机用的工具，
 * 不是长驻服务。
 */

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { McpServer } from '@modelcontextprotocol/server';
import { serveStdio } from '@modelcontextprotocol/server/stdio';
import { _electron } from 'playwright-core';
import * as z from 'zod/v4';

import { engine_launch_options } from './engine-launch.mjs';

// 仓库路径从本文件自己的位置推出（本文件固定放在 <仓库根>/tools/ 下），不依赖
// ${CLAUDE_PROJECT_DIR} 之类的占位符——实测过它在 Claude Code 当前这个版本里
// 不生效（.mcp.json 里用它会报 "Missing environment variables"，MCP 服务器
// 直接连不上），也不依赖子进程 cwd 的隐含约定。
const repo_path = dirname(dirname(fileURLToPath(import.meta.url)));

/** @type {import('playwright-core').ElectronApplication | null} */
let electron_app = null;
/** @type {import('playwright-core').Page | null} */
let win = null;

// 主进程 stdout/stderr 与渲染进程 console 的滚动缓冲——遇到问题时用
// get_logs 读，不用每次都盯着人工起的终端。上限只是防止无限增长，不是精确
// 的日志策略。
const MAX_LOG_LINES = 2000;
/** @type {string[]} */
const engine_logs = [];

function push_log(line) {
  engine_logs.push(line);
  if (engine_logs.length > MAX_LOG_LINES) engine_logs.shift();
}

function fail(text) {
  return { content: [{ type: 'text', text }], isError: true };
}

function ok(text) {
  return { content: [{ type: 'text', text }] };
}

// 渲染进程偶尔会长时间不响应 CDP 调用（实测过：引擎启动校验角色预设表时，
// 每个缺失条目都弹一条不自动消失的错误通知，几百条堆起来能让渲染进程忙到
// 十几秒到几十秒都腾不出手接 evaluate/screenshot）。这种情况下让调用方等一
// 个有限的超时、拿到明确的「超时」错误，好过让整个 MCP 连接看起来卡死。
const PAGE_TIMEOUT_MS = 20000;

function with_timeout(promise, label) {
  let timer;
  const timeout = new Promise((_resolve, reject) => {
    timer = setTimeout(
      () =>
        reject(
          new Error(
            `${label} 超过 ${PAGE_TIMEOUT_MS}ms 未响应——渲染进程可能还在忙` +
              '（比如画面上堆了大量错误通知），可以先 get_errors/get_logs 看看',
          ),
        ),
      PAGE_TIMEOUT_MS,
    );
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

async function shutdown() {
  if (!electron_app) return;
  const app = electron_app;
  electron_app = null;
  win = null;
  await app.close().catch(() => {});
}

// 服务器进程被上层（Claude Code 或人工测试脚本）杀掉时，尽量把引擎窗口一并
// 关掉——不然 Electron 子进程会变成孤儿继续跑，之前调试时真的留下过三个。
process.on('SIGINT', () => shutdown().then(() => process.exit(0)));
process.on('SIGTERM', () => shutdown().then(() => process.exit(0)));

function create_server() {
  const server = new McpServer({ name: 'era-electron', version: '0.0.1' });

  server.registerTool(
    'launch_game',
    {
      description:
        '启动本地 EraElectron 引擎，并把本仓库设为游戏目录（自动 stub 掉原生的' +
        '目录选择对话框，直接选中仓库路径，无需手工点击文件选择器）',
      inputSchema: z.object({}),
    },
    async () => {
      if (electron_app) {
        return fail('引擎已经在运行，先调用 close 再重新 launch_game');
      }
      electron_app = await _electron.launch(engine_launch_options());
      // 必须主动排空子进程的 stdout/stderr：引擎启动时会同步刷一长串日志
      // （仅角色预设表校验就有几百行），没人读的话管道缓冲区会被写满，
      // 主进程会阻塞在那次同步 write 上，看起来就像 launch_game 卡死不返回
      // ——实测确认过这条因果关系，不是猜测。顺手接进滚动缓冲，供 get_logs
      // 读，而不是读了就扔。
      const proc = electron_app.process();
      proc.stdout.on('data', (chunk) => push_log(chunk.toString()));
      proc.stderr.on('data', (chunk) => push_log(chunk.toString()));
      win = await electron_app.firstWindow();
      win.on('console', (msg) =>
        push_log(`[渲染进程 console:${msg.type()}] ${msg.text()}`),
      );

      // 「打开游戏」是原生 Electron 菜单（不是网页 DOM），点击后主进程同步调用
      // dialog.showOpenDialogSync({properties:["openDirectory"]})——直接在主
      // 进程里把它 stub 成返回仓库路径，再找到并点击这个菜单项，跳过真实的
      // OS 文件选择器（官方文档给的正是这个 stub 技巧，见 class-electron 里
      // 「Mocking native dialogs」一节）。
      const opened = await electron_app.evaluate(({ dialog, Menu }, path) => {
        dialog.showOpenDialogSync = () => [path];
        const find = (items) => {
          for (const item of items) {
            if (item.label === '打开游戏') return item;
            if (item.submenu) {
              const nested = find(item.submenu.items);
              if (nested) return nested;
            }
          }
          return null;
        };
        const menu = Menu.getApplicationMenu();
        const item = menu && find(menu.items);
        if (!item) return false;
        item.click();
        return true;
      }, repo_path);

      if (!opened) {
        await shutdown();
        return fail('主进程菜单里没找到「打开游戏」这一项，引擎版本可能变了');
      }

      // 点击本身已经成功——不在这里等渲染进程回应，它可能正忙着渲染一堆
      // 启动期通知（见 with_timeout 的说明）。标题只是锦上添花，读不到不算
      // launch_game 失败，调用方接下来该用 get_errors/read_text 自己核对。
      const title = await with_timeout(
        win.evaluate(() => document.title),
        'launch_game 读取窗口标题',
      ).catch((e) => `（未读到：${e.message}）`);
      return ok(`已加载仓库为游戏目录，窗口标题：${title}`);
    },
  );

  server.registerTool(
    'click',
    {
      description: '点击画面上包含指定文字的元素（取第一个匹配）',
      inputSchema: z.object({ text: z.string().describe('要点击的可见文字') }),
    },
    async ({ text }) => {
      if (!win) return fail('还没有窗口——先调用 launch_game');
      await with_timeout(win.getByText(text).first().click(), `click(${text})`);
      return ok(`已点击：${text}`);
    },
  );

  server.registerTool(
    'type',
    {
      description:
        '用键盘输入文字（不依赖找到输入框的选择器），默认输入后按回车提交',
      inputSchema: z.object({
        text: z.string().describe('要输入的文字'),
        submit: z.boolean().default(true).describe('输入后是否按回车提交'),
      }),
    },
    async ({ text, submit }) => {
      if (!win) return fail('还没有窗口——先调用 launch_game');
      await with_timeout(win.keyboard.type(text), 'type');
      if (submit)
        await with_timeout(win.keyboard.press('Enter'), 'type 的回车');
      return ok(`已输入：${text}${submit ? '（已按回车）' : ''}`);
    },
  );

  server.registerTool(
    'read_text',
    {
      description: '读取当前窗口画面上的可见文字，用于核对状态',
      inputSchema: z.object({}),
    },
    async () => {
      if (!win) return fail('还没有窗口——先调用 launch_game');
      return ok(await with_timeout(win.innerText('body'), 'read_text'));
    },
  );

  server.registerTool(
    'screenshot',
    {
      description: '截取当前窗口画面',
      inputSchema: z.object({}),
    },
    async () => {
      if (!win) return fail('还没有窗口——先调用 launch_game');
      const buffer = await with_timeout(win.screenshot(), 'screenshot');
      return {
        content: [
          {
            type: 'image',
            data: buffer.toString('base64'),
            mimeType: 'image/png',
          },
        ],
      };
    },
  );

  server.registerTool(
    'get_errors',
    {
      description:
        '读取画面上当前显示的「脚本错误」提示（引擎用 ElNotification 弹出的' +
        '错误通知，标题固定是「脚本错误」，遇到问题一定要先看这个，而不是' +
        '只看 read_text——通知可能已经滚出可视区域，innerText 不一定能看全）',
      inputSchema: z.object({}),
    },
    async () => {
      if (!win) return fail('还没有窗口——先调用 launch_game');
      const errors = await with_timeout(
        win.evaluate(() =>
          Array.from(document.querySelectorAll('.el-notification')).map(
            (el) => ({
              title:
                el
                  .querySelector('.el-notification__title')
                  ?.textContent?.trim() || '',
              content:
                el
                  .querySelector('.el-notification__content')
                  ?.textContent?.trim() || '',
            }),
          ),
        ),
        'get_errors',
      );
      if (errors.length === 0) return ok('当前画面没有错误提示');
      return ok(
        `共 ${errors.length} 条：\n` +
          errors
            .map((e, i) => `${i + 1}. [${e.title}] ${e.content}`)
            .join('\n'),
      );
    },
  );

  server.registerTool(
    'get_logs',
    {
      description:
        '读取引擎主进程日志与渲染进程 console 输出的最近若干行（问题排查用，' +
        '不是给玩家看的画面内容——画面内容用 read_text/get_errors）',
      inputSchema: z.object({
        tail: z.number().int().positive().default(200).describe('取最近多少行'),
      }),
    },
    async ({ tail }) => {
      if (engine_logs.length === 0) return ok('目前没有捕获到任何日志');
      return ok(engine_logs.slice(-tail).join(''));
    },
  );

  server.registerTool(
    'close',
    {
      description: '关闭引擎窗口，收尾用，避免留下孤儿 Electron 进程',
      inputSchema: z.object({}),
    },
    async () => {
      if (!electron_app) return fail('引擎没有在运行');
      await shutdown();
      return ok('已关闭');
    },
  );

  return server;
}

serveStdio(create_server);
