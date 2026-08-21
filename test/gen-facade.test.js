/**
 * @file tools/gen-facade.js 的契约测试（issue #71）。
 *
 * 门面按域分组、一维二维形状对称。这张票只落两块：一维按域重切 + 二维口上域。
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
  SKIPPED,
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
  // #90 起 cflag 在 kojo 之外按补名逐个进门面：NAMES.cflag = kojo 切片 +
  // 已补名的他域下标（当前仅 chara 域的 cflag:2 好感度）
  const manual_keys = Object.keys(NAMES.cflag)
    .map(Number)
    .sort((a, b) => a - b);
  const slice = indexes.slice().sort((a, b) => a - b);
  assert.deepEqual(
    manual_keys.filter((i) => i !== 2),
    slice,
  );
  assert.ok(manual_keys.includes(2));
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

test('口上域切片缺名时生成器报错，不静默用数字当名字', () => {
  const names = require('../tools/facade-names');
  assert.equal(names.get_name('cflag', 9999), undefined);
  const lookup = (table, index) =>
    table === 'cflag' && index === 301
      ? undefined
      : names.get_name(table, index);
  assert.throws(
    () => entries_for('cflag', 'kojo', undefined, lookup),
    /口上域切片缺名：cflag:301/,
  );
});

test('一维未命名属主下标跳过并报告，不进产物', () => {
  assert.ok(SKIPPED.length > 0, 'ownership 里确有未命名下标要跳过');
  assert.ok(
    SKIPPED.some((item) => item.table === 'tflag' && item.index === 33),
    'tflag:33 无语义，应跳过',
  );
  assert.ok(
    !SKIPPED.some((item) => item.table === 'tflag' && item.index === 204),
    'TFLAG:204 有 COM_REGISTER 注释，应收录',
  );
  const event_tflag = path.join(REPO_ROOT, 'ere', 'facade', 'game-event.js');
  const text = fs.readFileSync(event_tflag, 'utf8');
  assert.ok(!text.includes('get tflag_'));
  assert.ok(!text.includes('tflag:33'));
  const { entries, skipped } = entries_for('tflag', 'event');
  assert.ok(skipped.length > 0);
  assert.ok(entries.every((entry) => !/^tflag_\d+$/.test(entry.name)));
});

test('出处路径指向仓库里存在的 target/ 文件', () => {
  const names = require('../tools/facade-names');
  assert.ok(
    fs.existsSync(
      path.join(REPO_ROOT, names.SRC_FLAG.replace(/\//g, path.sep)),
    ),
  );
  assert.ok(
    fs.existsSync(path.join(REPO_ROOT, names.SRC_KXX.replace(/\//g, path.sep))),
  );
  const product = fs.readFileSync(
    path.join(REPO_ROOT, 'ere', 'facade', 'chara-kojo.js'),
    'utf8',
  );
  assert.ok(product.includes('target/資料_非必要無須解壓/'));
  assert.ok(!product.includes('target/资料_非必要無須解壓/'));
  assert.ok(!product.includes('源: 资料_非必要無須解壓/'));
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

// —— #90：二维按属主域推广 + 两源合流 ——

test('两源合流：yml 列名进二维门面，跳过的缺口不进产物', () => {
  const read = (file) =>
    fs.readFileSync(path.join(REPO_ROOT, 'ere', 'facade', file), 'utf8');
  // yml 列名直进（system 域：abl/mark/exp/talent 各表切片同文件分组）
  const system_text = read('chara-system.js');
  assert.ok(system_text.includes('get 顺从()'));
  assert.ok(system_text.includes('era.get(`abl:${this.cid}:10`)'));
  assert.ok(system_text.includes('get 苦痛刻印()'));
  assert.ok(system_text.includes('era.set(`mark:${this.cid}:0`, v);'));
  assert.ok(system_text.includes('源: yml/Mark.yml id 0'));
  assert.ok(system_text.includes('get 妊娠()')); // talent 也在 system 域
  // 手补缺口：mark:4 原作无列名，出处指向 ERB
  assert.ok(system_text.includes('get 反抗刻印履历()'));
  assert.ok(system_text.includes('era.set(`mark:${this.cid}:4`, v);'));
  // dungeon 域：exp 切片（yml 列名）
  const dungeon_text = read('chara-dungeon.js');
  assert.ok(dungeon_text.includes('get 绝顶经验()'));
  assert.ok(dungeon_text.includes('era.get(`exp:${this.cid}:2`) || 0;'));
  assert.ok(dungeon_text.includes('get 施虐快乐经验()'));
  // train 域：source/palam 走 yml 列名，delta/deltabase 走手写名
  const train_text = read('chara-train.js');
  assert.ok(train_text.includes('get 阴核快感()'));
  assert.ok(train_text.includes('era.get(`source:${this.cid}:0`) || 0;'));
  assert.ok(train_text.includes('get 润滑()'));
  assert.ok(train_text.includes('get 阴核增量()'));
  assert.ok(train_text.includes('era.set(`delta:${this.cid}:0`, v);'));
  assert.ok(train_text.includes('get 体力损耗()'));
  // cflag 的 kojo 外切片：按补名逐个进入（当前仅好感度）
  const chara_text = read('chara-chara.js');
  assert.ok(chara_text.includes('get 好感度()'));
  assert.ok(chara_text.includes('era.set(`cflag:${this.cid}:2`, v);'));
  // 跳过并报告：yml 缺名（train/abl:5）、无测量名（event/talent:19）、
  // 列名不可作标识符（talent:281「常识改变【战斗】」属 chara 域）
  assert.ok(
    SKIPPED.some(
      (item) =>
        item.table === 'abl' && item.index === 5 && item.domain === 'train',
    ),
  );
  assert.ok(
    SKIPPED.some(
      (item) =>
        item.table === 'talent' && item.index === 19 && item.domain === 'event',
    ),
  );
  assert.ok(
    SKIPPED.some(
      (item) =>
        item.table === 'talent' &&
        item.index === 281 &&
        item.domain === 'chara',
    ),
    'yml 列名不是合法标识符 → 跳过（#71 裁定三同款）',
  );
  assert.ok(!chara_text.includes('常识改变'));
  assert.ok(!chara_text.includes('村娘'), '全角字母列名同款跳过');
  assert.ok(!train_text.includes('abl:5'), '缺名下标不进产物');
});

test('两源合流：同一下标两源名字不一致即报错；一致时手写出处胜出', () => {
  const gen = require('../tools/gen-facade');
  const names = require('../tools/facade-names');
  // 注入冲突：abl:10 的 yml 列名是「顺从」
  names.NAMES.abl = { 10: { name: '服从', source: '测试注入' } };
  assert.throws(() => gen.merged_name('abl', 10), /两源名字不一致 abl:10/);
  // 名字一致：手写（更精）出处胜出
  names.NAMES.abl = { 10: { name: '顺从', source: '测试注入的更精出处' } };
  const merged = gen.merged_name('abl', 10);
  assert.equal(merged.name, '顺从');
  assert.equal(merged.source, '测试注入的更精出处');
  delete names.NAMES.abl;
  // 纯 yml 来源：默认出处指向 yml 名字表
  const yml_only = gen.merged_name('mark', 0);
  assert.equal(yml_only.name, '苦痛刻印');
  assert.equal(yml_only.source, 'yml/Mark.yml id 0');
});

test('出处路径全部真实存在：扫产物源注释里的路径 token', () => {
  const dir = path.join(REPO_ROOT, 'ere', 'facade');
  const checked = new Set();
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.js'))) {
    const text = fs.readFileSync(path.join(dir, file), 'utf8');
    for (const line of text.split('\n')) {
      if (!line.includes('* 源: ')) {
        continue;
      }
      for (const token of line.matchAll(
        /(?:target|yml|docs|CONTEXT\.md)\/?[^\s（）；;，]+/g,
      )) {
        checked.add(token[0]);
      }
    }
  }
  assert.ok(
    checked.size >= 5,
    `扫描应有产出，实得 ${[...checked].join(' | ')}`,
  );
  const missing = [...checked].filter(
    (rel) => !fs.existsSync(path.join(REPO_ROOT, rel)),
  );
  assert.deepEqual(missing, [], '#71 翻过车的一类：出处指向不存在的文件');
});

test('移植自建表门面：delta/deltabase 归 train，读写落对寻址', () => {
  const fixture = create_era_fixture();
  const { chara } = fixture.load_module('facade/chara');
  fixture.era.beginTrain(31); // 调教域表在 beginTrain 前不可寻址（引擎守卫）
  assert.equal(chara(31).train.阴核增量, 0);
  chara(31).train.阴核增量 = 12;
  assert.equal(fixture.store.get('delta:31:0'), 12);
  assert.equal(chara(31).train.阴核增量, 12);
  chara(31).train.体力损耗 = -20;
  assert.equal(fixture.store.get('deltabase:31:0'), -20);
  // 属主裁定的可观测面：delta 只出现在 train 域切片
  const system_text = fs.readFileSync(
    path.join(REPO_ROOT, 'ere', 'facade', 'chara-system.js'),
    'utf8',
  );
  assert.ok(!system_text.includes('delta:'));
});

test('cflag 跨 kojo 域切片：好感度走 chara(cid).chara', () => {
  const fixture = create_era_fixture();
  const { chara } = fixture.load_module('facade/chara');
  chara(31).chara.好感度 = 3;
  assert.equal(fixture.store.get('cflag:31:2'), 3);
  assert.equal(chara(31).chara.好感度, 3);
});
