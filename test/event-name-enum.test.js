/**
 * @file ere/data/event-name-const.js 与「调用点只用枚举」的守护（issue #849）。
 *
 * 三件事各一个用例组：
 *   - 枚举本身的形状（13 个名字、冻结、取值就是运行里认得的那串字符）；
 *   - 注册表认得表里的每一个名字，表外的名字不管从哪一侧进来都当场抛错
 *     （抛错的行为细节在 event-registry.test.js）；
 *   - 源码扫描：ere/ 里凡是注册或触发事件的地方都写 `EVENT.X`，不再出现裸
 *     字符串。写错名字之所以曾经无人发现，就是因为名字本身没有出处；把
 *     「只此一份」交给机器查，比下次再审一遍四十多个文件便宜。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { EVENT, EVENT_NAMES } = require('../ere/data/event-name-const');

const ERE_DIR = path.join(__dirname, '..', 'ere');
// 枚举自己就是那份字面量清单，扫描时跳过它
const ENUM_FILE = path.join(ERE_DIR, 'data', 'event-name-const.js');

/**
 * ere/ 下全部 .js 的源码行，注释行整行清空（行号保留，报错能指到行）。
 *
 * 注释里出现事件名（「EVENTTRAIN 的 #PRI 档」）是正常的，这份扫描管的是代码
 * 里还认不认枚举。
 */
function ere_source_files() {
  const files = [];
  for (const rel of fs.readdirSync(ERE_DIR, { recursive: true })) {
    if (!rel.endsWith('.js')) continue;
    const file = path.join(ERE_DIR, rel);
    if (file === ENUM_FILE) continue;
    const lines = fs
      .readFileSync(file, 'utf8')
      .split('\n')
      .map((line) => (/^\s*(\/\/|\*|\/\*)/.test(line) ? '' : line));
    files.push({ rel, lines, text: lines.join('\n') });
  }
  return files;
}

test('事件名枚举有 13 个名字，取值就是运行里认的那串字符', () => {
  // 这些字符串不只内部认：触发侧的写法与日志、存档外的排查都按它们认事件，
  // 改名等于把「事件名」换掉，必须是显式决定，不能顺手调整拼法
  assert.deepEqual(EVENT_NAMES, [
    'EVENTFIRST',
    'EVENTLOAD',
    'EVENTSHOP',
    'EVENTTURNEND',
    'EVENTCOM',
    'SOURCE_CHECK',
    'SOURCE_CHECK_AUTO',
    'EVENTCOMEND',
    'EVENTTRAIN',
    'SHOW_STATUS',
    'SHOW_USERCOM',
    'USERCOM',
    'EVENTEND',
  ]);
  assert.equal(new Set(EVENT_NAMES).size, 13);
  assert.deepEqual(
    Object.keys(EVENT).map((key) => EVENT[key]),
    EVENT_NAMES,
  );
});

test('枚举与名单都冻结：运行时改不动、加不进', () => {
  assert.ok(Object.isFrozen(EVENT));
  assert.ok(Object.isFrozen(EVENT_NAMES));
  // 用 Reflect 探针：非严格模式下普通赋值静默失败，看不出冻没冻
  assert.equal(Reflect.set(EVENT, 'TRAIN', 'EVENTTRAIN_TYPO'), false);
  assert.equal(Reflect.set(EVENT_NAMES, 13, 'EVENT_ROGUE'), false);
  assert.equal(EVENT.TRAIN, 'EVENTTRAIN');
  assert.equal(EVENT_NAMES.length, 13);
});

test('注册表认得枚举里的每一个名字：注册后触发，处理器跑一次', async () => {
  const fixture = create_era_fixture();
  const registry = fixture.load_module('system/event/registry');

  for (const name of EVENT_NAMES) {
    let ran = 0;
    registry.on(name, async () => {
      ran += 1;
    });
    await registry.emit(name);
    assert.equal(ran, 1, `${name} 的处理器没有跑`);
  }
});

test('源码里不再有裸字符串事件名：注册与触发都从枚举取值', () => {
  const offences = [];
  for (const { rel, lines } of ere_source_files()) {
    for (const [index, line] of lines.entries()) {
      for (const name of EVENT_NAMES) {
        if (line.includes(`'${name}'`) || line.includes(`"${name}"`)) {
          offences.push(`${rel}:${index + 1}: ${line.trim()}`);
        }
      }
    }
  }
  assert.deepEqual(
    offences,
    [],
    `这些地方还在写裸字符串事件名：\n${offences.join('\n')}`,
  );
});

test('枚举里的每个名字都有人注册：不留「合法但没人响应」的死名字', () => {
  const files = ere_source_files();
  const unregistered = Object.entries(EVENT).filter(
    ([key]) =>
      !files.some(({ text }) =>
        new RegExp(`\\bon\\(\\s*EVENT\\.${key}\\b`).test(text),
      ),
  );
  assert.deepEqual(
    unregistered.map(([key, value]) => `${key} = ${value}`),
    [],
  );
});
