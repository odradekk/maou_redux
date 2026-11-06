/**
 * @file ere/system/chara/chara-name-list.js 与 ere/data/chara-name-const.js 的
 * 行为测试（#388 建表；#435 文件名被引擎误判为逐角色数据；#835 移出静态数据
 * 改成常量表）。
 *
 * 三层验证：
 *   - 常量表层：条目数、编号域、抽查值——名字的唯一真身就是这张常量表；
 *   - 行为层（夹具，无需引擎）：命中、缺口、越界的查表结果；
 *   - 文件分类层（需引擎）：拿引擎自己的 staticFormatRegex 逐文件分类，
 *     钉住 yml/ 下只有 Chara<数字>.yml 走逐角色分支。
 *
 * #835 之前这层查表还守着「引擎装载 yml 后经真 setVar 读出名字」与「未注册
 * id 裸三段寻址直接崩溃」两组引擎用例。表搬成常量后这两组的对象都不存在了
 * （没有表可装、没有地址可崩），删掉；神域边界改由 chara-name.test.js 的
 * 声明尺寸用例守。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { load_engine_bundle } = require('./helpers/engine-bundle');

const { LIST_CHARA_NAME } = require('../ere/data/chara-name-const');

const engine = load_engine_bundle();
const engine_test = engine ? test : test.skip;

const REPO_ROOT = path.resolve(__dirname, '..');
const YML_DIR = path.join(REPO_ROOT, 'yml');

// —— 常量表层：表本身的形状 ——

test('固定名常量表：3,264 条，编号唯一且在声明尺寸 5,500 之内', () => {
  const ids = Object.keys(LIST_CHARA_NAME).map(Number);
  assert.equal(ids.length, 3264, '条目数');
  // 重复的编号在对象字面量里会互相覆盖：条数对得上就说明源码里的键没重号
  assert.equal(new Set(ids).size, ids.length, '编号不得重复');
  assert.equal(
    Math.min(...ids),
    0,
    '编号从 0 起（0 号位是开局可抽到的固定名）',
  );
  assert.ok(
    Math.max(...ids) < 5500,
    `最大编号 ${Math.max(...ids)} 必须落在声明尺寸内——越界的条目永不可达`,
  );
});

test('固定名常量表：抽查各名字范围与归一结果', () => {
  // 西洋名、日式名、覆盖译名（そら→空）、同 id 二次赋值取最后一次
  assert.equal(LIST_CHARA_NAME[0], '玛丽');
  assert.equal(LIST_CHARA_NAME[1], '索菲亚');
  assert.equal(LIST_CHARA_NAME[42], '塔巴莎');
  assert.equal(LIST_CHARA_NAME[3003], '飒太');
  assert.equal(LIST_CHARA_NAME[3610], '空');
  assert.equal(LIST_CHARA_NAME[5288], '万庄', '表尾的最后一个编号');
});

// —— 行为层：查表 ——

test('get_fixed_chara_name：表里的编号返回名字', () => {
  const fixture = create_era_fixture();
  const { get_fixed_chara_name } = fixture.load_module(
    'system/chara/chara-name-list',
  );

  assert.equal(get_fixed_chara_name(42), '塔巴莎', '固定名按编号查出');
  assert.equal(get_fixed_chara_name(0), '玛丽', '0 号编号同样是有效条目');
});

test('get_fixed_chara_name：表里没有的编号返回空串（含重名合并丢弃的缺口）', () => {
  const fixture = create_era_fixture();
  const { get_fixed_chara_name } = fixture.load_module(
    'system/chara/chara-name-list',
  );

  // 3030 是被 65 组重名合并丢弃的编号之一，5499/99999 在声明范围内外各取一例
  for (const gap of [3030, 5289, 5499, 99999]) {
    assert.equal(get_fixed_chara_name(gap), '', `编号 ${gap} 必须返回空串`);
  }
});

test('get_fixed_chara_name：名字为空的条目返回空串（不是 undefined）', () => {
  const fixture = create_era_fixture();
  fixture.seed_fixed_name(777, '');
  const { get_fixed_chara_name } = fixture.load_module(
    'system/chara/chara-name-list',
  );

  assert.equal(get_fixed_chara_name(777), '');
});

// —— 文件分类层：引擎按文件名把静态表分成「逐角色」与「普通表」两条路 ——

/** 引擎 eraStart 的分类条件（yml 档）：模块 80 的 staticFormatRegex 按格式取 */
function chara_file_regex() {
  const index = engine.static_format_priority.indexOf('yml');
  return engine.static_format_regex[index];
}

engine_test(
  '引擎实证：逐角色分类只命中 Chara<数字>.yml（#435 的根因面）',
  () => {
    const chara_re = chara_file_regex();
    // 引擎把**小写后的完整路径**过这条正则（eraStart 逐字）。这里用相对路径
    // yml/<文件名>——**不要喂本仓库的绝对路径**：正则的 `.` 未转义、能匹配
    // `/`，目录名里出现「chara…/yml」形状时会在目录段上命中（本仓库的
    // worktree 目录名 t435-charanamelist-misclassify 就是这种形状），那是
    // 路径的产物、不是文件的属性，喂进来会让这条用例恒红而非照出真问题。
    const classified = fs
      .readdirSync(YML_DIR)
      .filter((file) => file.endsWith('.yml'))
      .filter((file) => chara_re.test(`yml/${file}`.toLowerCase()))
      .sort();
    const per_chara = fs
      .readdirSync(YML_DIR)
      .filter((file) => /^chara\d+\.yml$/i.test(file))
      .sort();

    // 正对照：这条正则确实是引擎用来抓逐角色文件的那条（引擎分类的实证）
    assert.equal(
      chara_re.test('yml/chara0.yml'),
      true,
      '引擎正则必须命中 Chara0.yml（否则本用例的判断条件本身失效）',
    );
    // 根因留证：任何以 chara 开头的文件名都会被它划走（#435 的原形）
    assert.equal(
      chara_re.test('yml/charanamelist.yml'),
      true,
      '引擎正则对 chara 开头的文件名一律命中——静态表命名不得以 chara 开头',
    );
    assert.deepEqual(
      classified,
      per_chara,
      '被引擎划进逐角色桶的 yml 必须恰好是 Chara<数字>.yml 那批；多出任何文件都会让它在真实装载里走错分支',
    );
  },
);
