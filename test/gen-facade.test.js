/**
 * @file tools/gen-facade.js 的契约测试（issue #71）。
 *
 * 门面按域分组、一维二维形状对称。本票只落两块：一维按域重切 + 二维口上域。
 * 既有 era_flag / era_global 不动。生成区/手写区标记按域文件工作。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { NAMES } = require('../tools/facade-names');
const {
  FACADES,
  REPO_ROOT,
  entries_for,
  extract_generated_section,
  generate,
  list_owned_indexes,
  parse_ownership,
  render_generated_section,
  render_wrapper,
} = require('../tools/gen-facade');

async function with_temp_dir(run) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ere-gen-facade-'));
  try {
    return await run(dir);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

test('所有权解析：区间键展开为逐下标属主', () => {
  const yaml = [
    '"7":',
    '  owner: kojo',
    '  writes: 24',
    '"100-102":',
    '  owner: kojo',
    '  writes: 6',
    '"36":',
    '  owner: stronghold',
    '  writes: 4',
    '',
  ].join('\n');
  const owned = parse_ownership(yaml);
  assert.equal(owned.get(7), 'kojo');
  assert.equal(owned.get(100), 'kojo');
  assert.equal(owned.get(102), 'kojo');
  assert.equal(owned.get(36), 'stronghold');
  assert.equal(owned.has(101), true);
  assert.equal(owned.has(8), false);
});

test('口上域切片：cflag 属主 kojo 的下标恰好是命名表的 110 条', () => {
  const indexes = list_owned_indexes('cflag', 'kojo');
  assert.equal(indexes.length, 110);
  assert.ok(indexes.includes(301));
  assert.ok(indexes.includes(201));
  assert.ok(!indexes.includes(1));
  assert.deepEqual(
    indexes.slice().sort((a, b) => a - b),
    Object.keys(NAMES.cflag)
      .map(Number)
      .sort((a, b) => a - b),
  );
});

test('一维按域重切：flag 下标分属七域，不是整表毯子', () => {
  const by_domain = {};
  for (const domain of [
    'kojo',
    'train',
    'chara',
    'stronghold',
    'dungeon',
    'invasion',
    'event',
    'system',
    'patch',
  ]) {
    const indexes = list_owned_indexes('flag', domain);
    if (indexes.length > 0) {
      by_domain[domain] = indexes.length;
    }
  }
  assert.equal(
    Object.values(by_domain).reduce((a, b) => a + b, 0),
    82,
  );
  assert.ok(Object.keys(by_domain).length >= 7);
  assert.ok(list_owned_indexes('flag', 'kojo').includes(7));
  assert.ok(list_owned_indexes('tflag', 'kojo').includes(32));
});

test('二维模板带角色参数：getter/setter 走 cflag:cid:id，未初始化读 0', () => {
  const section = render_generated_section({
    kind: 'chara',
    domain: 'kojo',
    table: 'cflag',
    entries: [{ index: 301, name: '爱抚', source: 'EVENT_KXX :340' }],
  });
  assert.ok(section.includes('class KojoFacade'));
  assert.ok(section.includes('this.cid'));
  assert.ok(section.includes('return era.get(`cflag:${this.cid}:301`) || 0;'));
  assert.ok(section.includes('era.set(`cflag:${this.cid}:301`, v);'));
  assert.ok(section.includes('爱抚'));
  assert.ok(section.includes('CFLAG:301'));
  assert.ok(section.includes('EVENT_KXX 行340'));
  assert.ok(!section.includes('Proxy'));
});

test('一维模板：game.domain.field 形状，无角色参数', () => {
  const section = render_generated_section({
    kind: 'game',
    domain: 'kojo',
    table: 'flag',
    entries: [{ index: 7, name: '口上开关', source: 'FLAG:7' }],
  });
  assert.ok(section.includes("return era.get('flag:7') || 0;"));
  assert.ok(section.includes("era.set('flag:7', v);"));
  assert.ok(section.includes('口上开关'));
  assert.ok(section.includes('FLAG:7'));
});

test('字段只出现在属主域：跨域读走属主门面，不复制到读者域', () => {
  assert.ok(list_owned_indexes('flag', 'kojo').includes(7));
  assert.ok(!list_owned_indexes('flag', 'kojo').includes(36));
  const section = render_generated_section({
    kind: 'game',
    domain: 'kojo',
    table: 'flag',
    entries: [{ index: 7, name: '口上开关', source: 'FLAG:7' }],
  });
  assert.ok(!section.includes('显示模式'));
  assert.ok(!section.includes('flag:36'));
});

test('新文件骨架可编译、含标记、按角色 ID 缓存单例', () => {
  const first = render_wrapper({
    kind: 'chara',
    domain: 'kojo',
    table: 'cflag',
    entries: [{ index: 301, name: '爱抚', source: 'KXX' }],
  });
  const second = render_wrapper({
    kind: 'chara',
    domain: 'kojo',
    table: 'cflag',
    entries: [{ index: 301, name: '爱抚', source: 'KXX' }],
  });
  assert.equal(first, second);
  assert.ok(!first.includes('\r'));
  assert.ok(first.includes("require('#/era-electron')"));
  assert.ok(first.includes('class KojoFacade'));
  assert.ok(first.includes('module.exports'));
  new vm.Script(first);

  const { render_chara_root } = require('../tools/gen-facade');
  const root = render_chara_root([{ domain: 'kojo', file: 'chara-kojo.js' }]);
  assert.ok(root.includes('function chara(cid)'));
  assert.ok(root.includes('cache'));
  assert.ok(root.includes('this.kojo = new KojoFacade(cid)'));
});

test('产物边界：已存在时默认跳过；--force 只替换生成区', async () => {
  await with_temp_dir((dir) => {
    const out_dir = path.join(dir, 'ere', 'facade');
    const report = generate({
      ownership_dir: path.join(REPO_ROOT, 'ownership'),
      out_dir,
    });
    const target = path.join(out_dir, 'chara-kojo.js');
    assert.ok(fs.existsSync(target));
    assert.ok(report.results.some((r) => r.status === 'written'));

    const with_hand = `${fs.readFileSync(target, 'utf8')}// HAND MARK\n`;
    fs.writeFileSync(target, with_hand, 'utf8');

    const skipped = generate({
      ownership_dir: path.join(REPO_ROOT, 'ownership'),
      out_dir,
    });
    assert.ok(skipped.results.every((r) => r.status === 'skipped'));
    assert.ok(fs.readFileSync(target, 'utf8').includes('HAND MARK'));

    const forced = generate({
      ownership_dir: path.join(REPO_ROOT, 'ownership'),
      out_dir,
      force: true,
    });
    assert.ok(forced.results.some((r) => r.status === 'updated'));
    const text = fs.readFileSync(target, 'utf8');
    assert.ok(text.includes('HAND MARK'));
    assert.ok(text.includes('get 爱抚()'));
  });
});

test('同步守护：仓库产物生成区与现渲染结果一致', () => {
  const {
    render_chara_root,
    render_game_root,
  } = require('../tools/gen-facade');
  for (const spec of FACADES) {
    const product = fs.readFileSync(
      path.join(REPO_ROOT, 'ere', 'facade', spec.file),
      'utf8',
    );
    assert.equal(
      extract_generated_section(product),
      render_generated_section(spec),
      spec.file,
    );
  }
  assert.equal(
    extract_generated_section(
      fs.readFileSync(
        path.join(REPO_ROOT, 'ere', 'facade', 'chara.js'),
        'utf8',
      ),
    ),
    extract_generated_section(
      render_chara_root(FACADES.filter((s) => s.kind === 'chara')),
    ),
  );
  assert.equal(
    extract_generated_section(
      fs.readFileSync(path.join(REPO_ROOT, 'ere', 'facade', 'game.js'), 'utf8'),
    ),
    extract_generated_section(
      render_game_root(FACADES.filter((s) => s.kind === 'game')),
    ),
  );
});

test('命名表缺属主下标时生成器报错，不静默用数字当名字', () => {
  const names = require('../tools/facade-names');
  assert.equal(names.get_name('cflag', 9999), undefined);
  const lookup = (table, index) =>
    table === 'cflag' && index === 301
      ? undefined
      : names.get_name(table, index);
  assert.throws(
    () => entries_for('cflag', 'kojo', undefined, lookup),
    /命名表缺 cflag:301/,
  );
});

test('tequip 不进一维门面：JS 侧是三段寻址，按一维切会写错地址', () => {
  const text = fs.readFileSync(
    path.join(REPO_ROOT, 'ere', 'facade', 'game-train.js'),
    'utf8',
  );
  assert.ok(!text.includes("era.get('tequip:"));
});

test('口上样本里已有门面的读写不再拼 era.get/set 字符串', () => {
  for (const file of ['kojo-k3.js', 'kojo-k5.js']) {
    const text = fs.readFileSync(
      path.join(REPO_ROOT, 'ere', 'kojo', file),
      'utf8',
    );
    assert.ok(text.includes('chara(target).kojo'));
    assert.ok(text.includes('kojo.爱抚'));
    assert.ok(text.includes('game.kojo.口上开关'));
    assert.ok(text.includes('game.train.失神'));
    assert.ok(!/`cflag:\$\{/.test(text), file);
    assert.ok(!/era\.(get|set)\('flag:/.test(text), file);
    assert.ok(!/era\.(get|set)\('tflag:/.test(text), file);
  }
});

test('生成的角色视图按 ID 缓存、只持 ID、读写落到正确寻址', () => {
  const fixture = create_era_fixture();
  const { chara } = fixture.load_module('facade/chara');
  const a = chara(31);
  const b = chara(31);
  const c = chara(17);
  assert.equal(a, b);
  assert.notEqual(a, c);
  assert.equal(a.cid, 31);
  assert.equal(a.kojo.cid, 31);
  assert.equal(a.kojo.爱抚, 0);
  a.kojo.爱抚 = 201;
  assert.equal(a.kojo.爱抚, 201);
  assert.equal(fixture.store.get('cflag:31:301'), 201);
  assert.deepEqual(fixture.var_writes, [{ name: 'cflag:31:301', value: 201 }]);
});

test('一维门面读写落到属主表，不经扁平包装层', () => {
  const fixture = create_era_fixture();
  const { game } = fixture.load_module('facade/game');
  assert.equal(game.kojo.口上开关, 0);
  game.kojo.口上开关 = 2;
  assert.equal(fixture.store.get('flag:7'), 2);
  game.kojo.口上存在_3 = 1;
  assert.equal(fixture.store.get('flag:103'), 1);
  fixture.era.beginTrain();
  assert.equal(game.train.失神, 0);
  game.train.失神 = 1;
  assert.equal(fixture.store.get('tflag:899'), 1);
});

test('无 Proxy：访问器是类原型上的属性描述符', () => {
  const fixture = create_era_fixture();
  const { chara } = fixture.load_module('facade/chara');
  const view = chara(31);
  assert.equal(typeof view, 'object');
  assert.ok(
    Object.getOwnPropertyDescriptor(Object.getPrototypeOf(view.kojo), '爱抚'),
  );
  assert.equal(view.kojo.不存在的字段, undefined);
});
