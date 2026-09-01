/**
 * 口上模块接线的通用锁（issue #282）：`ere/kojo/kojo-*.js` 里靠副作用注册
 * 进 `kojo_message_com_family` / `self_kojo_family` 的模块，必须被主启动图
 * （ere/system/flow/main-loop.js）require——注册与否全看有没有人 require 它，
 * 而口上票的单测走 `load_module('kojo/kojo-xxx')` 直接加载模块，绕过主启动图，
 * 漏装不会被任何检查发现（#228 的 com-cloth 就是同形态漏的：游戏里两条指令
 * 根本没注册，玩家脱不了衣服，而所有测试全绿）。
 *
 * == 键空间（#282 工单第一问，逐条查实后写死） ==
 *
 * 注册侧与调用侧是**同一套编号**，不是指令族那种「register(20) = COM20」的
 * 直白对应，查实的映射如下：
 *
 *   - `kojo-k3-noble.js:477`：`kojo_message_com_family.register(3, …)`；
 *     `kojo-k5-mao.js:199`：`register(5, …)`。注册的就是分发键 N。
 *   - 调用侧 `kojo-system.js` 的 `kojo_message_com()`：
 *     `local = get_kojo_num()`（:155 GET_KOJO_NUM()）——:137-140 逐格探测
 *     素质 160-179（慈愛..貴公子 等性格素质），`local = count - 60`
 *     （163 高貴 → 103、165 村娘A/マオ → 105），最后一格命中者胜。
 *     然后 `kojo_message_com_family.call(local - 100, …)`（:161）。
 *     所以 **register(N) 与 call(LOCAL - 100) 的 N 恒等**：K3 高貴素质 163 →
 *     LOCAL 103 → call(3) → 命中 register(3)。
 *   - `DECLARED_KOJO_COM_IDS`（kojo-system.js:91）= 普通 0-39 + EX 901-1600，
 *     是**合法性空间**（DispatchFamily 的 declaredIds；空间内缺失合法，是
 *     TRYCALL 落空的等价物），不是注册清单——锁对的是「每个注册号都必须
 *     经主启动图装上」，不是「空间被填满」。
 *   - `self_kojo_family` 与 `kojo_message_com_family` **同一套键**
 *     （SELF_KOJO_K{LOCAL - 100}，kojo-system.js:100/136-141）。K3 已注册
 *     `SELF_KOJO_K3`（#234）；K5 事件口上仍随各自票落地。锁对两个族都扫——
 *     任何口上文件往里注册时，主启动图漏 require 立即红。
 *
 * == 为什么只锁主启动图一张清单（#282 工单第二问） ==
 *
 * 指令族要两张清单，是因为对拍回放（tools/compare/replay.js）自己维护一份
 * 加载面（TRAIN_PATH_MODULES），与主启动图互相独立、各自决定「哪些族被
 * 注册」。口上没有这回事：
 *
 *   - 对拍样本**会**经过口上分发：旧样本首回合出 K3 :1097 台词（黄金样本
 *     emuera.log:26），train-natural / train-upgrade 的口上形态由 CFLAG:301
 *     播种控制（replay.js 的 seed_train_world）。K3 被显式列进
 *     TRAIN_PATH_MODULES（replay.js:46）正是为这条真实调用链；
 *   - 但 K3 的装载是**行为断言**在守（test/compare-first-turn.test.js:194
 *     「录制不经游戏代码改动：口上台词由真实 kojo-k3-noble 模块产出」锁
 *     死 :1097 台词），不是清单对账——replay 清单里有没有它，台词测试都
 *     会红；
 *   - 口上的调用链经 `event/source-check.js:78` 的
 *     `require('#/kojo/kojo-system')` 顶层副作用成立，而 source-check 已在
 *     TRAIN_PATH_MODULES（replay.js:45）——回放里的 kojo-system 必然装上，
 *     分发族存在；K5 未被对拍样本消费（两份样本都是高貴角色，TRAIN_SEEDS
 *     与 seed_train_world 不置 165 村娘A），列不列进 replay 清单无输出影响，
 *     现有行为断言也证明没列是对的。
 *
 *   结论：**replay 不需要第二张口上清单**。加一张没人消费的清单只会把
 *   「口上文件落地必须同时改两处」的维护成本丢给后面二十张口上票，而锁
 *   本身证明不了任何行为（#274 的教训是清单对账守真漂移，这里没有第二张
 *   清单可漂）。口上装载面的正确性由两条独立防线承担：本文件（主启动图
 *   对账）+ 对拍的行为断言（compare-first-turn / compare-train）。
 *
 * 号集合从源码扫出，不维护手写名单——新口上文件落地即纳入；漏 require
 * 时断言点名模块，不报一串裸编号。扫描器解析不了新写法就抛（与 #274 的
 * 既有约定一致）。
 */
'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { extract_register_ids } = require('./helpers/register-scan');

const REPO = path.resolve(__dirname, '..');
const KOJO_DIR = path.join(REPO, 'ere', 'kojo');

// 两个分发族：kojo_message_com_family（指令口上 KOJO_MESSAGE_COM_{N}）与
// self_kojo_family（事件口上 SELF_KOJO_K{N}）。见文件头键空间一节。
const FAMILIES = ['kojo_message_com_family', 'self_kojo_family'];

const KOJO_FILES = fs
  .readdirSync(KOJO_DIR)
  .filter((name) => /^kojo-.*\.js$/.test(name))
  .filter((name) => name !== 'kojo-system.js') // 底座：定义分发族，自身不注册
  .sort();

/**
 * 每个口上文件扫出的两个分发族注册号。没有 register 调用的文件
 * （kojo-text.js 等纯文本/工具模块）不进表——它们不是靠副作用注册的口上。
 * @returns {Map<string, {kojo_message_com_family: Set<number>, self_kojo_family: Set<number>}>}
 */
function scan_kojo_modules() {
  const out = new Map();
  for (const name of KOJO_FILES) {
    const src = fs.readFileSync(path.join(KOJO_DIR, name), 'utf8');
    const regs = {};
    for (const family of FAMILIES) {
      regs[family] = extract_register_ids(src, family);
    }
    if (FAMILIES.every((family) => regs[family].size === 0)) {
      continue;
    }
    out.set(name.replace(/\.js$/, ''), regs);
  }
  return out;
}

function registered_ids(family, declared) {
  return new Set(declared.filter((id) => family.has(id)));
}

function format_missing(label, missing) {
  return (
    `${label}漏装：` +
    missing
      .map(({ mod, lost }) => `${mod}（KOJO ${lost.join(', ')}）`)
      .join('；')
  );
}

function missing_modules(expected_by_module, field, actual) {
  const missing = [];
  for (const [mod, sets] of expected_by_module) {
    const lost = [...sets[field]]
      .filter((id) => !actual.has(id))
      .sort((a, b) => a - b);
    if (lost.length > 0) {
      missing.push({ mod, lost });
    }
  }
  return missing;
}

test('源码扫描能拿到每个口上模块的分发族注册号', () => {
  const by_module = scan_kojo_modules();
  // 抽查字面量写法（当前唯一形态），防止扫描器自己漂成空集还全绿
  assert.deepEqual(
    [...by_module.get('kojo-k3-noble').kojo_message_com_family].sort(
      (a, b) => a - b,
    ),
    [3],
  );
  assert.deepEqual(
    [...by_module.get('kojo-k5-mao').kojo_message_com_family].sort(
      (a, b) => a - b,
    ),
    [5],
  );
  // K3 已落地 SELF_KOJO_K3（#234）；K5 事件口上仍随各自票
  assert.equal(by_module.get('kojo-k3-noble').self_kojo_family.size, 1);
  assert.equal(by_module.get('kojo-k5-mao').self_kojo_family.size, 0);
  // 底座与纯工具模块不进表
  assert.ok(!by_module.has('kojo-system'));
  assert.ok(!by_module.has('kojo-text'));
});

test('主启动图加载 main-loop 后，口上分发族注册号等于口上模块并集', () => {
  // 漏装时报「主启动图漏装：kojo-k3-noble」——M1520/M1521 的 must_mention 锚
  const expected_by_module = scan_kojo_modules();
  const fixture = create_era_fixture();
  fixture.load_module('system/flow/main-loop');
  const { kojo_message_com_family, self_kojo_family } =
    fixture.load_module('kojo/kojo-system');

  for (const family of ['kojo_message_com_family', 'self_kojo_family']) {
    const dispatch =
      family === 'kojo_message_com_family'
        ? kojo_message_com_family
        : self_kojo_family;
    const actual = registered_ids(dispatch, [...dispatch.declared]);
    const missing = missing_modules(expected_by_module, family, actual);
    assert.equal(missing.length, 0, format_missing('主启动图', missing));
    // 多出未扫到的注册号 = 扫描器漏读（比漏 require 更危险，必须红）
    const expected_ids = new Set();
    for (const sets of expected_by_module.values()) {
      sets[family].forEach((id) => expected_ids.add(id));
    }
    const extra = [...actual].filter((id) => !expected_ids.has(id));
    assert.deepEqual(extra, [], `主启动图多出未扫到的 ${family} 号`);
  }
});
