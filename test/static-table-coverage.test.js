/**
 * @file 静态表覆盖回归锁：游戏代码里每个 era.get/set/add 地址的表，引擎都
 * 认识；地址里写死的变量名，yml/ 的名字表里都有声明。
 *
 * 引擎读写函数遇到下面几类地址时，要么直接崩溃，要么只记日志、玩家看到的
 * 数值不对：
 *   - 三段寻址在 **`data[表][角色]` 存在、而 `staticData[表]` 缺位** 时直接
 *     抛错（issue #42 实机缺陷）。调教域的表由 `beginTrain` / `addCharacter`
 *     按角色开桶，所以桶一定在，崩就崩在名字表这一侧：调教开始时写
 *     `stain:31:2` 报 `Cannot read properties of undefined (reading '2')`。
 *   - 一段、二段地址的表不存在时，引擎只调 `era.error` 记一条 key error，
 *     写入丢弃、读取得 undefined。`era.add('money', …)` 因此不生效，玩家看到
 *     「获得…G！」钱却没加上。
 *   - 变量名不在名字表里时，引擎把原字符串当下标：`era.set('tflag:32 |', 2)`
 *     写到键 `"32 |"` 上，TFLAG:32 不变。
 *
 * 夹具只记调用、不查静态表，单元测试各自只播种要用的表，都看不见这几类
 * 缺陷。所以本文件**从游戏源码里扫出地址**（单引号、双引号、模板串都扫，
 * 跳过 SDK 与注释），按引擎装载 yml/ 的结果逐个核对。
 *
 * 引擎不在场（无 app.asar）时整文件 skip。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const {
  create_variable_loader,
  load_engine_bundle,
} = require('./helpers/engine-bundle');

const engine = load_engine_bundle();
const engine_test = engine ? test : test.skip;

const REPO_ROOT = path.resolve(__dirname, '..');
const ERE_DIR = path.join(REPO_ROOT, 'ere');
const YML_DIR = path.join(REPO_ROOT, 'yml');

// 角色表产物不进变量装载路径（它们走 chara 分支）
const CHARA_PRODUCT = /^Chara\d+\.yml$/;
// 这些族不经「staticData[表名]」翻译，另有归属（引擎寻址层的显式 case）：
//   palam/param/gotjuel/delta → staticData.juel；nowex → staticData.ex；
//   base/maxbase/deltabase → staticData.base；item* → staticData.item
const ALIASED = new Map([
  // #399：itemprice/itemsales 走引擎的 item* 分支（`a.startsWith("item")`
  // 一支按 `a.substring(4)` 落 data.item.price / sales，SHOP_LABO 的转生
  // 门槛读 price），名字表是 staticData.item.name；itemname 由「去 name
  // 后缀」那条规则命中
  ['itemprice', 'item'],
  ['itemsales', 'item'],
  ['palam', 'juel'],
  ['param', 'juel'],
  ['gotjuel', 'juel'],
  ['gotjewel', 'juel'],
  ['jewel', 'juel'],
  ['delta', 'juel'],
  ['nowex', 'ex'],
  ['maxbase', 'base'],
  ['deltabase', 'base'],
]);
// 游戏代码用到的引擎内置族，不在 staticData 里：callname/relation 是受保护
// 内置；no 是已加入角色的数组；gamebase 是一段地址的显式 case；chara 是
// 内置只读预设对象（era.get(`chara:${id}`) → this.staticData.chara[id]，
// #383 CSVCSTR 等价物的读法）
const ENGINE_BUILTIN = new Set([
  'callname',
  'relation',
  'no',
  'gamebase',
  'chara',
]);

/** 地址里的表名对应 staticData 的哪张表；引擎自带的族返回 undefined */
function static_table_of(table) {
  if (ENGINE_BUILTIN.has(table)) {
    return undefined;
  }
  // `<表>name` / `<表>keys` 是名字与序号的读法，查的是去掉后缀的那张表
  const base = table.replace(/(?:name|keys)$/, '');
  return ALIASED.get(base) ?? base;
}

/** 递归收集 ere/ 下的 .js */
function walk_js(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk_js(full, out);
    } else if (entry.name.endsWith('.js')) {
      out.push(full);
    }
  }
  return out;
}

/** 去掉注释；块注释保留换行，报出的行号仍对得上源码 */
function strip_comments(body) {
  return body
    .replace(/\/\*[\s\S]*?\*\//g, (block) => block.replace(/[^\n]/g, ''))
    .replace(/(^|[^:'"`\\])\/\/.*$/gm, '$1');
}

/**
 * 从一份源码里扫出 era.get/set/add 的字面量地址：三种引号都扫，跳过注释；
 * 表名本身是插值的地址无从核对，跳过。
 * @param {string} source 源码全文
 * @param {string} file_name 报告里用的文件名
 * @returns {{ where: string, address: string, table: string }[]}
 */
function scan_source(source, file_name) {
  const body = strip_comments(source);
  const found = [];
  let line = 1;
  let counted = 0;
  for (const m of body.matchAll(
    /era\.(?:get|set|add)\(\s*(?:'([^'\n]*)'|"([^"\n]*)"|`([^`]*)`)/g,
  )) {
    const address = m[1] ?? m[2] ?? m[3];
    const table = /^([a-z_]+)(?::|$)/i.exec(address)?.[1];
    if (table === undefined) {
      continue;
    }
    line += body.slice(counted, m.index).split('\n').length - 1;
    counted = m.index;
    found.push({
      where: `${file_name}:${line}`,
      address,
      table: table.toLowerCase(),
    });
  }
  return found;
}

/** 扫出 ere/ 下全部游戏代码的字面量地址 */
function collect_addresses() {
  return (
    walk_js(ERE_DIR)
      // era-electron.js 是引擎 SDK，其 JSDoc 里的例子不算游戏代码
      .filter((file) => path.basename(file) !== 'era-electron.js')
      .flatMap((file) =>
        scan_source(
          fs.readFileSync(file, 'utf8'),
          path.relative(REPO_ROOT, file).replace(/\\/g, '/'),
        ),
      )
  );
}

test('参数等级阈值必须读取常量，不能作为引擎变量寻址', () => {
  const invalid = [];
  for (const file of walk_js(ERE_DIR)) {
    const body = fs.readFileSync(file, 'utf8');
    for (const match of body.matchAll(
      /(?:era\.(?:get|set|add)|era0)\(\s*['"`]palamlv:/gi,
    )) {
      const line = body.slice(0, match.index).split('\n').length;
      invalid.push(`${path.relative(REPO_ROOT, file)}:${line}`);
    }
  }
  assert.deepEqual(invalid, [], `非法参数等级地址：\n${invalid.join('\n')}`);
});

/** 按 yml/ 现状走引擎的变量装载路径，得到 staticData */
function load_all_products() {
  const loader = create_variable_loader();
  for (const file of fs.readdirSync(YML_DIR)) {
    if (!file.endsWith('.yml') || CHARA_PRODUCT.test(file)) {
      continue;
    }
    const table = file.replace(/\.yml$/, '').toLowerCase();
    if (table === 'gamebase') {
      continue;
    }
    const text = fs.readFileSync(path.join(YML_DIR, file), 'utf8');
    loader.load_rows(engine.parse_data_file(text, 'yml', table), table);
  }
  return loader;
}

test('地址扫描覆盖三种引号，跳过注释与表名插值', () => {
  const source = [
    "era.get('flag:0');",
    'era.set("money", 1);',
    "era.add(`cflag:${cid}:2`, 1); // era.set('a:0', 1)",
    "/* era.get('ex_flag:1') */",
    'era.get(`${table}:0`);',
  ].join('\n');
  assert.deepEqual(
    scan_source(source, 'x.js').map((e) => `${e.where} ${e.address}`),
    ['x.js:1 flag:0', 'x.js:2 money', 'x.js:3 cflag:${cid}:2'],
  );
  // 扫描本身要有产出——正则失效会让下面的断言退化成空转
  const tables = new Set(collect_addresses().map(({ table }) => table));
  assert.ok(
    tables.size >= 10,
    `从 ere/ 扫出的表只有 ${tables.size} 张，扫描八成失效了`,
  );
});

engine_test(
  '游戏代码地址里的每张表，引擎都认识（缺表时一、二段写入被丢弃，三段直接崩溃）',
  () => {
    const loader = load_all_products();
    const unknown = collect_addresses()
      .filter(({ table }) => {
        const key = static_table_of(table);
        return key !== undefined && !loader.static_data[key];
      })
      .map(({ where, address }) => `${where} ${address}`);
    assert.deepEqual(
      unknown,
      [],
      `这些地址的表在 yml/ 和引擎内置族里都没有：\n  ${unknown.join('\n  ')}`,
    );
  },
);

engine_test(
  '地址里写死的变量名都在 yml/ 名字表里（未声明时引擎把原字符串当下标）',
  () => {
    const loader = load_all_products();
    const undeclared = [];
    for (const { where, address, table } of collect_addresses()) {
      const field = address.split(':').at(-1);
      if (
        !address.includes(':') ||
        /\$\{|\}/.test(field) ||
        /^-?\d+$/.test(field)
      ) {
        continue;
      }
      const key = static_table_of(table);
      const names =
        key === 'item'
          ? loader.static_data.item?.name
          : key && loader.static_data[key];
      if (names && names[field] === undefined) {
        undeclared.push(`${where} ${address}`);
      }
    }
    assert.deepEqual(
      undeclared,
      [],
      `这些地址的变量名没有在 yml/ 声明：\n  ${undeclared.join('\n  ')}`,
    );
  },
);

engine_test(
  '引擎实证：表不存在只记 key error、不写入；变量名未声明时写到原字符串键上',
  () => {
    const loader = load_all_products();
    const errors = [];
    const fake = {
      staticData: { ...loader.static_data },
      fieldNames: loader.field_names,
      data: { flag: {}, tflag: {} },
      global: {},
      extendedTables: {},
      era: { error: (m) => errors.push(String(m)) },
    };
    assert.equal(engine.set_var.call(fake, 'money', 100, true), undefined);
    assert.equal(fake.data.money, undefined);
    assert.deepEqual(errors, ['key error in getter/setter! key (money)']);

    assert.equal(engine.set_var.call(fake, 'tflag:32 |', 2), 2);
    assert.equal(fake.data.tflag[32], undefined, 'TFLAG:32 本身不变');
    assert.equal(fake.data.tflag['32 |'], 2);
  },
);

engine_test('引擎实证：缺名字表时三段寻址直接崩溃（本锁存在的理由）', () => {
  const loader = load_all_products();
  const cid = 31;
  const data = { stain: { [cid]: {} } };
  const fake = {
    staticData: { ...loader.static_data },
    fieldNames: loader.field_names,
    data,
    global: {},
    extendedTables: {},
    era: { error: () => {} },
  };
  // 表在：正常写入
  assert.equal(engine.set_var.call(fake, `stain:${cid}:2`, 2), 2);
  // 抽掉名字表：同一句直接抛错（实机撞见的那一条）
  delete fake.staticData.stain;
  assert.throws(
    () => engine.set_var.call(fake, `stain:${cid}:2`, 2),
    /Cannot read properties of undefined \(reading '2'\)/,
  );
});

engine_test(
  '引擎实证：savestr 族不存在——二段报 key error、三段完全静默（#171 改走 callname 的理由）',
  () => {
    const loader = load_all_products();
    const errors = [];
    const make_fake = () => ({
      staticData: { ...loader.static_data },
      fieldNames: loader.field_names,
      data: { cstr: { 0: {} } },
      global: {},
      extendedTables: {},
      era: { error: (m) => errors.push(String(m)) },
    });

    // 对照：cstr 表引擎认识，三段写得进（CSTR:A:1 可直接写）
    assert.equal(engine.set_var.call(make_fake(), 'cstr:0:1', 'X'), 'X');

    // 二段 savestr：引擎压根没有这张表（app.asar 全文零命中），走 error 分支
    errors.length = 0;
    assert.equal(engine.set_var.call(make_fake(), 'savestr:0', 'X'), undefined);
    assert.deepEqual(errors, ['key error in getter/setter! key (savestr:0)']);

    // 三段 savestr：**连 era.error 都不给**，完全静默丢弃。这一条比二段更
    // 危险——SAVESTR:A 正是三段写法，直接照写不会有任何痕迹，
    // 玩家看到的名字恒空。#171 因此把名字承载改走 callname:${id}:-1（#5）。
    errors.length = 0;
    assert.equal(
      engine.set_var.call(make_fake(), 'savestr:0:1', 'X'),
      undefined,
    );
    assert.deepEqual(errors, []);
  },
);
