/**
 * @file ere/data/gobi-koujo-const.js 的取值规则（issue #865）。
 *
 * 语尾文字从 18 个 gobi_koujo_k* 真身搬进常量表后，真身只剩「转交」一行；
 * 文字本身仍由 test/kojo-gobi.test.js 逐字钉住（那一条走分发族，与改动前
 * 完全同一条路径——输出不变的证据在那边）。本文件钉的是表与取值函数自己的
 * 几条规则，那些是「搬进数据」才出现、旧真身里各写一份的东西：
 *
 *   1. 表外编号（K11 没有语尾）返回空串——调用方拼行照常结束；
 *   2. 情绪档 1-5 命中固定支，0 与越界值走默认支；
 *   3. 默认支的随机序：先 RAND:3、落空再 RAND:2；只有一支时不掷随机；
 *   4. 文字里的 %SELF_CALL% 按当前 TARGET 的自称求值（K19/K904 怒档）；
 *   5. 语尾只在表里加行：分发表的注册号与表行一一对应，每行五档齐全；
 *   6. 取值不输出任何内容（行内拼接只能由调用方做）。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

const KOJO_DIR = path.resolve(__dirname, '..', 'ere', 'kojo');

/** 装载全部口上模块（注册发生在模块加载期；漏一个族成员就分不到） */
function load_all_kojo(fixture) {
  for (const name of fs.readdirSync(KOJO_DIR)) {
    if (name.endsWith('.js')) {
      fixture.load_module(`kojo/${name.replace(/\.js$/, '')}`);
    }
  }
}

/** 记下每次掷骰的上界的随机源：返回值由 draw(上界) 决定 */
function recording_rand(draw) {
  const bounds = [];
  const rand = (n) => {
    bounds.push(n);
    return draw(n);
  };
  return { bounds, rand };
}

test('表外编号返回空串：K11 没有语尾，窗口外与乱数同样空串', () => {
  const fixture = create_era_fixture();
  const { gobi_text } = fixture.load_module('data/gobi-koujo-const');

  assert.equal(gobi_text(11, 1), '', 'K11 没有语尾函数');
  assert.equal(gobi_text(-1, 1), '', '窗口外（-1）');
  assert.equal(gobi_text(999, 0), '', '表外乱数');
});

test('情绪档 1-5 命中固定支，0 与越界值走默认支', () => {
  const fixture = create_era_fixture();
  const { GOBI_KOUJO, gobi_text } = fixture.load_module(
    'data/gobi-koujo-const',
  );

  for (const id of Object.keys(GOBI_KOUJO)) {
    const row = GOBI_KOUJO[id];
    for (let tier = 1; tier <= 5; tier += 1) {
      assert.ok(
        typeof gobi_text(Number(id), tier) === 'string',
        `K${id} 档 ${tier} 必须给字符串`,
      );
    }
    // 0 与越界档不得落进固定支：取值必须等于默认支的首支（随机源钉首支）
    for (const arg0 of [0, 6, 99, -3]) {
      assert.equal(
        gobi_text(Number(id), arg0, () => 0),
        row.fallback[0],
        `K${id} ARG:0 == ${arg0} 走默认支首支`,
      );
    }
  }
});

test('默认支随机序：先 RAND:3、落空再 RAND:2；只有一支时不掷随机', () => {
  const fixture = create_era_fixture();
  const { gobi_text } = fixture.load_module('data/gobi-koujo-const');

  // 两掷都不中 → 第三支；上界必须依次是 3 与 2
  const both = recording_rand(() => 1);
  assert.equal(gobi_text(0, 0, both.rand), '呢。', 'K0 第三支');
  assert.deepEqual(both.bounds, [3, 2], '先掷 RAND:3 再掷 RAND:2');

  // 首掷命中后不再掷第二次
  const first = recording_rand(() => 0);
  gobi_text(0, 0, first.rand);
  assert.deepEqual(first.bounds, [3], '首掷命中即收手');

  // 第二掷命中 → 第二支
  const second = recording_rand((n) => (n === 2 ? 0 : 1));
  assert.equal(gobi_text(0, 0, second.rand), '哟。', 'K0 第二支');
  assert.deepEqual(second.bounds, [3, 2], '第二掷发生在 RAND:2 上');

  // K15 只有一支：源一次都不掷（旧真身 `void rand`）
  const single = recording_rand(() => 0);
  assert.equal(gobi_text(15, 0, single.rand), '。', 'K15 单支');
  assert.deepEqual(single.bounds, [], 'K15 的随机源不得被掷');

  // 不注入随机源时落进三支之一（缺省均匀随机）
  assert.ok(
    ['。', '哟。', '呢。'].includes(gobi_text(0, 0)),
    '缺省随机源也要能取值',
  );
});

test('%SELF_CALL% 按当前 TARGET 的自称求值，其余档不含插值', () => {
  const fixture = create_era_fixture();
  const { gobi_text } = fixture.load_module('data/gobi-koujo-const');
  const era_flag = fixture.load_module('era-utils/era-flag');
  fixture.seed_chara(31, { id: 31, name: '菲娅', callname: '菲娅' });
  fixture.era.addCharacter(31);
  era_flag.target = 31;

  // CSTR:60（自称）没人写时回落「我」——与 %SELF_CALL% 的求值语义一致
  assert.equal(
    gobi_text(19, 2),
    '，呜～～我要咬人了的说～～',
    'K19 怒档：缺省自称',
  );
  fixture.store.set('cstr:31:60', '本宫');
  assert.equal(
    gobi_text(19, 2),
    '，呜～～本宫要咬人了的说～～',
    'K19 怒档：CSTR:60 非空则用它',
  );
  assert.equal(
    gobi_text(904, 2),
    '，呜～～本宫要咬人了的说～～',
    'K904 与 K19 同文，同样取自称',
  );
  assert.equal(gobi_text(19, 1), '，诶嘿嘿～♪', '喜档不含插值');
});

test('语尾只在表里加行：分发表注册号与表行一一对应，每行五档加默认支', () => {
  const fixture = create_era_fixture();
  load_all_kojo(fixture);
  const { gobi_koujo_family } = fixture.load_module('kojo/kojo-system');
  const { GOBI_KOUJO, gobi_text } = fixture.load_module(
    'data/gobi-koujo-const',
  );

  const registered = [...gobi_koujo_family.implemented.keys()].sort(
    (a, b) => a - b,
  );
  assert.deepEqual(
    registered,
    Object.keys(GOBI_KOUJO)
      .map(Number)
      .sort((a, b) => a - b),
    '有语尾真身的编号必须与表行一一对应（漏进表 = 语尾静默变空串）',
  );
  for (const [id, row] of Object.entries(GOBI_KOUJO)) {
    assert.equal(row.tiers.length, 5, `K${id} 必须有五个情绪档`);
    assert.ok(row.fallback.length >= 1, `K${id} 必须至少有默认支`);
  }

  // 取值出口不得漏出占位符：表里的 %SELF_CALL% 由取值函数替换掉
  for (const id of Object.keys(GOBI_KOUJO).map(Number)) {
    for (let arg0 = 0; arg0 <= 5; arg0 += 1) {
      assert.ok(
        !gobi_text(id, arg0, () => 0).includes('%'),
        `K${id} ARG:0 == ${arg0} 漏出未替换的占位符`,
      );
    }
  }
});

test('语尾取值不打印：返回文字之外不得有任何输出', () => {
  const fixture = create_era_fixture();
  const { GOBI_KOUJO, gobi_text } = fixture.load_module(
    'data/gobi-koujo-const',
  );
  for (const id of Object.keys(GOBI_KOUJO)) {
    for (let arg0 = 0; arg0 <= 5; arg0 += 1) {
      gobi_text(Number(id), arg0, () => 0);
    }
  }
  assert.deepEqual(
    fixture.text_lines(),
    [],
    'era.print 一次即一行；取值函数自行打印就会多出一行',
  );
});
