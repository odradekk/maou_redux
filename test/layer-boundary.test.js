/**
 * @file 分层边界锁（issue #889）：函数内 require 的存量清单，以及
 * 「系统层不依赖页面层」的白名单。
 *
 * == 为什么要锁 ==
 *
 * `ere/` 里曾用「函数内 require」绕开循环依赖（36 处为审查报告 2026-10-21
 * 的计数，实测 77 处）。这类写法本身不是错——调用期取依赖在某些环里是唯一
 * 正确解——但它是**隐形的**：`require` 出现在函数体里，读者既看不出模块的
 * 真实依赖面，也看不出装载顺序。所以拆完之后要有一把锁：新增的函数内
 * require 必须显式登记并写明理由，不能悄悄加。
 *
 * 同理，系统层（`ere/system/`）的模块按分层约定不该知道页面层存在：页面
 * 由装配入口（`system/flow/startup.js`、`system/flow/main-loop.js`）拉起，
 * 系统逻辑只买卖数据。违反时的症状不是崩溃，而是「一个算法模块拉起半个
 * 界面树」——加载顺序、初始化开销、可测试性一起变坏。
 *
 * == 允许清单 ==
 *
 * 每条都写了「谁引谁、为什么不能反过来」。清单只许缩不许长：新条目要在
 * PR 里说明为什么不能改成顶层引用或反转。
 *
 * 解析不了的 require（非字符串参数）抛错，不许静默漏过（#274 约定）；
 * 扫描器在 test/helpers/require-scan.js，与 #288 的顶层 require 锁共用。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { scan_requires } = require('./helpers/require-scan');

const REPO = path.resolve(__dirname, '..');

/**
 * 函数内 require 的允许清单：`文件 → 指向` 与理由。
 *
 * 这里逐条记的是「为什么不能把它挪到文件顶部」。挪不了的原因只有两类：
 * 一是顶层引用会成环（A 顶层引 B、B 顶层引 A，谁先装载另一边的解构就是
 * undefined）；二是 #288 的接入锁要求族模块只能由主启动图装载。
 */
const INNER_ALLOWED = new Map([
  [
    'ere/system/train/com-tentacle.js → #/system/train/com-colosseum',
    '触手族取死斗场族的结算函数。两者都是主启动图显式 require 的族模块，' +
      '顶层互引会让「漏 require 也不报错」——#288 的接入锁正是要拦这个。',
  ],
  [
    'ere/system/train/com-toy.js → #/system/train/com-tentacle',
    '道具族取触手族的 syokusyu_milk。同上：跨族引用保持调用期取，否则' +
      '主启动图漏装 com-tentacle 也不会红（#288）。',
  ],
  [
    'ere/page/components/chara-info-title.js → #/system/dungeon/dungeon-quest',
    '角色信息头取受注任务的 quest_select。迷宫任务模块的顶层闭包经房间、' +
      '自动调教、结局演出绕回页面层（ending-screen → page-chara-info-show），' +
      '顶层引用即成环。',
  ],
  [
    'ere/page/page-life-list.js → #/page/page-select-target',
    '角色一览的职业列要 page-select-target 的 get_job_name，而' +
      'page-select-target 顶层经 monster-play 取 monster-data，monster-data 又' +
      '顶层取本文件——两页互引，只能让一边延迟取。',
  ],
  [
    'ere/system/chara/chara-make.js → #/page/page-chara-info-show',
    '随机角色生成中途要弹一屏「贡品信息」确认。该页被 5 个页面复用，搬到' +
      '系统层会让页面反向依赖系统；彻底解法是把这一屏交互交给页面层驱动，' +
      '属独立工单（同 #867 的商店循环）。',
  ],
  [
    'ere/page/page-chara-info-show.js → #/system/chara/char-make',
    '献祭分支要 char-make 的 name_reset，而 char-make 顶层经 chara-make 取' +
      '本页的形象确认屏——两边互引，只能让页面侧延迟取（本方向是页面→' +
      '系统，本来合法，延迟只为破环）。',
  ],
  [
    'ere/event/event-load.js → #/system/cross-save-sharing',
    '共享档模块的读档路径要回调 EVENTLOAD 的处理函数（它的 load_special_save' +
      '读成后重放本链），与本模块的 maounet/inport_b 调用成环；装载期互引会' +
      '拿到半装好的导出。本条早于 #889，保留并登记。',
  ],
]);

/**
 * 系统层引用页面层的允许清单（装配入口不在此列——它们的职责就是拉起页面）。
 *
 * 六条都是「系统流程跑到一半需要一屏交互或演出」：反转方向要把整段流程交给
 * 页面层驱动，属于交互层重构，不在拆循环依赖的范围里；先登记，防止无声增加。
 */
const SYSTEM_TO_PAGE_ALLOWED = new Map([
  [
    'ere/system/chara/chara-make.js → #/page/page-chara-info-show',
    '角色生成的贡品信息确认屏（同上，交互层重构待办）。',
  ],
  [
    'ere/system/chara/chara-marriage.js → #/page/page-life-list',
    '婚姻日的奴隶子菜单借角色一览（life_list(page, 2) + 翻页 + 选中校验）。',
  ],
  [
    'ere/system/ending/ending-screen.js → #/page/page-chara-info-show',
    '结局演出里的角色信息屏；演出本身已归 endings 流程，这一屏被 5 个页面共用。',
  ],
  [
    'ere/system/invasion/invasion-campaign.js → #/page/page-life-list',
    '战役派遣的角色行打印（life_list_item）。',
  ],
  [
    'ere/system/train/train-loop.js → #/page/page-train',
    '调教回合循环按 #853 直接调用状态画面的处理器（旧事件总线上只有一个',
    '处理者，链上没有第二个可排）。',
  ],
  [
    'ere/system/train/train-loop.js → #/page/page-usercom',
    '同上：指令菜单与输入检查的两个处理器（#853）。',
  ],
]);

/** 装配入口：它们的职责就是拉起页面层，不算反向依赖 */
const COMPOSITION_ROOT = new Set([
  'ere/system/flow/startup.js',
  'ere/system/flow/main-loop.js',
]);

function list_js_files(dir) {
  const out = [];
  const walk = (rel) => {
    for (const entry of fs.readdirSync(path.join(REPO, rel), {
      withFileTypes: true,
    })) {
      const child = `${rel}/${entry.name}`;
      if (entry.isDirectory()) walk(child);
      else if (entry.name.endsWith('.js')) out.push(child);
    }
  };
  walk(dir);
  return out.sort();
}

/** 收集全树的函数内 require，按「文件 → 指向」去重 */
function collect_inner_requires() {
  const found = new Set();
  for (const rel of list_js_files('ere')) {
    const src = fs.readFileSync(path.join(REPO, rel), 'utf8');
    for (const r of scan_requires(src)) {
      if (!r.top_level) found.add(`${rel} → ${r.target}`);
    }
  }
  return found;
}

/** 收集系统层的页面层引用（装配入口除外） */
function collect_system_to_page() {
  const found = new Set();
  for (const rel of list_js_files('ere/system')) {
    if (COMPOSITION_ROOT.has(rel)) continue;
    const src = fs.readFileSync(path.join(REPO, rel), 'utf8');
    for (const r of scan_requires(src)) {
      if (r.target && r.target.startsWith('#/page/')) {
        found.add(`${rel} → ${r.target}`);
      }
    }
  }
  return found;
}

test('函数内 require：只留允许清单里的那些，增量必须登记', () => {
  const found = collect_inner_requires();
  const unexpected = [...found].filter((k) => !INNER_ALLOWED.has(k)).sort();
  assert.deepEqual(unexpected, [], `未登记的函数内 require：\n${unexpected}`);
  // 反向：清单里的每一条仍必须存在（拆掉后要连条目一起删，防止清单腐烂）
  const stale = [...INNER_ALLOWED.keys()].filter((k) => !found.has(k)).sort();
  assert.deepEqual(stale, [], `清单里已不存在的条目（请删除）：\n${stale}`);
});

test('系统层不引用页面层：装配入口之外只留允许清单里的那些', () => {
  const found = collect_system_to_page();
  const unexpected = [...found]
    .filter((k) => !SYSTEM_TO_PAGE_ALLOWED.has(k))
    .sort();
  assert.deepEqual(
    unexpected,
    [],
    `未登记的 系统层→页面层 引用：\n${unexpected}`,
  );
  const stale = [...SYSTEM_TO_PAGE_ALLOWED.keys()]
    .filter((k) => !found.has(k))
    .sort();
  assert.deepEqual(stale, [], `清单里已不存在的条目（请删除）：\n${stale}`);
});

test('允许清单的每条理由都不为空且写明反转/保留的依据', () => {
  for (const [key, reason] of [...INNER_ALLOWED, ...SYSTEM_TO_PAGE_ALLOWED]) {
    assert.ok(
      typeof reason === 'string' && reason.length >= 20,
      `${key} 的理由过短：${reason}`,
    );
  }
});
