'use strict';

/**
 * @file 标题循环的两道边界扫描（issue #852）。
 *
 * 主流程改成标题循环之后，两个方向的漂移都必须当场红，靠逐处配变异条目
 * 只能守住已列名的位置：
 *
 *   1. **退出进程只允许从标题画面的退出按钮发出。** 游戏内的结局一律
 *      `return begin(STATE.TITLE)` 回到标题；任何一处残留的 `era.quit()`
 *      都会让玩家卡在「回到标题却已退出」——quit 是 throw 型控制流
 *      （引擎发关窗 IPC 后抛 Error("quit")），到了就回不来。
 *   2. **回标题只允许从游戏结束点发出。** 标题画面上不能出现绕过存档校验
 *      的入口，玩家也不能在战斗中或存档写入过程中回到标题（ADR-0006
 *      「玩家存档保护」）：白名单外的 `begin(STATE.TITLE)` 会在这里红。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const ERE_DIR = path.resolve(__dirname, '..', 'ere');

/** 允许退出进程的文件：相对 ere/ 的 POSIX 路径 → 理由 */
const QUIT_WHITELIST = new Map([
  ['page/page-title.js', '标题画面的退出按钮：标题循环里唯一的主动退出入口'],
]);

/**
 * 允许发起「回标题」转场的文件：相对 ere/ 的 POSIX 路径 → 理由。
 * 只收游戏结束点——结局演出与两处 GAMEOVER。
 */
const RETURN_TO_TITLE_WHITELIST = new Map([
  [
    'system/ending/ending-screen.js',
    '结局演出：ending_1 选退出、ending_2 真 GAMEOVER、ending_n 选结束游戏',
  ],
  ['event/event-turnend.js', '魔王暴走的大冲击 GAMEOVER'],
  ['event/event-aftertrain.js', '魔王倒下且无继任者的 GAMEOVER'],
]);

const QUIT_CALL = /era\.quit\(/;
const RETURN_TO_TITLE = /begin\(STATE\.TITLE\)/;

function* iter_js_files(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* iter_js_files(full);
    else if (entry.name.endsWith('.js')) yield full;
  }
}

/**
 * 只留代码：注释里提到 `begin(STATE.TITLE)` / `era.quit()` 是在解释这些
 * 入口本身（判定点、状态机文件头），不是调用
 */
function code_only(content) {
  return content
    .replace(/\/\*[\s\S]*?\*\//g, '') // 块注释
    .replace(/^\s*\/\/.*$/gm, ''); // 整行注释
}

function scan(pattern) {
  const hits = [];
  for (const file of iter_js_files(ERE_DIR)) {
    const rel = path.relative(ERE_DIR, file).split(path.sep).join('/');
    if (pattern.test(code_only(fs.readFileSync(file, 'utf8')))) hits.push(rel);
  }
  return hits.sort();
}

test('自证：两个指纹都能认出合成样本，不误伤相似的写法与注释', () => {
  assert.equal(QUIT_CALL.test(code_only('      era.quit(); // 退出')), true);
  assert.equal(code_only('  quit() {}'), '  quit() {}', 'SDK 的存根不是调用');
  assert.equal(QUIT_CALL.test(code_only('  quit() {}')), false);
  assert.equal(
    RETURN_TO_TITLE.test(code_only('  return begin(STATE.TITLE);')),
    true,
  );
  assert.equal(
    RETURN_TO_TITLE.test(code_only('  [STATE.TITLE]: run_title_page,')),
    false,
  );
  assert.equal(RETURN_TO_TITLE.test(code_only("  TITLE: 'TITLE',")), false);
  // 注释里的写法不算调用：判定点的说明会成段提到它
  assert.equal(
    RETURN_TO_TITLE.test(code_only('// 写 return begin(STATE.TITLE) 即可')),
    false,
  );
  assert.equal(
    QUIT_CALL.test(code_only('/* 退出只由 era.quit() 发出 */')),
    false,
  );
});

test('退出进程只在标题画面的退出按钮处调用 era.quit()', () => {
  const offenders = scan(QUIT_CALL).filter((rel) => !QUIT_WHITELIST.has(rel));
  assert.deepEqual(
    offenders,
    [],
    '白名单外出现 era.quit()——游戏内的结局要 `return begin(STATE.TITLE)` ' +
      '回标题；退出进程只由标题画面的退出按钮发出',
  );
  // 白名单条目不许长草：标题页真的还调着 quit
  for (const [rel, reason] of QUIT_WHITELIST) {
    assert.equal(
      QUIT_CALL.test(
        code_only(
          fs.readFileSync(path.join(ERE_DIR, ...rel.split('/')), 'utf8'),
        ),
      ),
      true,
      `${rel} 在白名单里但没有 era.quit()——条目过期，删除它`,
    );
    assert.notEqual(reason.trim(), '', `${rel} 缺登记理由`);
  }
});

test('回标题的转场只在游戏结束点发起（战斗与存档写入不得回到标题）', () => {
  const offenders = scan(RETURN_TO_TITLE).filter(
    (rel) => !RETURN_TO_TITLE_WHITELIST.has(rel),
  );
  assert.deepEqual(
    offenders,
    [],
    '白名单外出现 begin(STATE.TITLE)——回标题只属于游戏结束点；' +
      '战斗中或存档写入过程中回标题会撞上 ADR-0006 的存档保护边界',
  );
  for (const [rel, reason] of RETURN_TO_TITLE_WHITELIST) {
    assert.equal(
      RETURN_TO_TITLE.test(
        code_only(
          fs.readFileSync(path.join(ERE_DIR, ...rel.split('/')), 'utf8'),
        ),
      ),
      true,
      `${rel} 在白名单里但没有 begin(STATE.TITLE)——条目过期，删除它`,
    );
    assert.notEqual(reason.trim(), '', `${rel} 缺登记理由`);
  }
});
