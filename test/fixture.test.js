/**
 * @file 测试夹具自身的契约测试。
 *
 * 夹具是全项目唯一的一处注入点（见 issue #16）：
 * 加载真实 SDK 文件，替换 require('#/era-electron') 返回的对象，
 * 让游戏代码在不启动 Electron GUI 的情况下可测。
 *
 * #149/#150/#151/#152/#163 起含多条引擎门控用例（removeCharacter / 三个角色列表
 * get / getNumber 归一边界，文件尾部）：缺引擎（无 app.asar）时这些用例
 * skip，跳过数进
 * test/engine-skip-baseline.txt 基线；其余用例不依赖引擎照常跑。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const {
  create_add_character,
  create_next_turn_in_train,
  create_chara_loader,
  load_engine_bundle,
} = require('./helpers/engine-bundle');

test('加载的是真实 SDK：注入守卫已绕过', () => {
  const fixture = create_era_fixture();
  const { era } = fixture;

  // era-electron.js 尾部守卫：version.engine 为 undefined 时拒绝执行一切 API
  assert.notEqual(era.version.engine, undefined);
  // 来自真实 SDK 文件的标识，而非夹具自造的替身对象
  assert.equal(era.isEra, true);
  assert.equal(typeof era.version.sdk, 'string');

  // 记录层已接管输出
  era.print('探针');
  assert.equal(fixture.lines.length, 1);
});

test('每个用例拿到干净状态，互不污染', () => {
  const first = create_era_fixture();
  first.era.set('global:3', 'zh-CN');
  first.set_inputs(9);
  first.era.print('污染源');

  const second = create_era_fixture();
  assert.deepEqual(second.var_writes, []);
  assert.deepEqual(second.var_reads, []);
  assert.deepEqual(second.lines, []);
  assert.deepEqual(second.inputs_consumed, []);
  assert.equal(second.era.get('global:3'), undefined);
});

test('两次夹具拿到的是不同 SDK 实例（ere/ 模块缓存已清）', () => {
  const first = create_era_fixture();
  const second = create_era_fixture();
  assert.notEqual(first.era, second.era);
});

test('无专门实现的 API 走兜底记录，不抛错', () => {
  const fixture = create_era_fixture();
  fixture.era.setAlign('center');
  fixture.era.setTitle('ERA魔王');

  assert.deepEqual(fixture.calls, [
    { api: 'setAlign', args: ['center'] },
    { api: 'setTitle', args: ['ERA魔王'] },
  ]);
});

test('quit 镜像引擎 throw 型（#148）：先记录关窗 IPC 再抛 Error("quit")，调用方后续不可达', () => {
  const fixture = create_era_fixture();

  // 引擎（app.asar 模块 183 逐字）：quit(){throw this.era.quit(),new Error("quit")}
  // ——夹具同构：calls 里的记录＝关窗 IPC 的观测面，throw＝炸穿调用链的
  // 控制流本体（装载循环按 message === "quit" 静默放行）
  assert.throws(
    () => fixture.era.quit(),
    (e) => e instanceof Error && e.message === 'quit',
    'quit 必须 throw Error("quit")（引擎 throw 型控制流的镜像）',
  );
  assert.deepEqual(fixture.calls, [{ api: 'quit', args: [] }]);
});

// —— global 系存档 API（#147）：saveGlobal / loadGlobal / resetGlobal 与
// listSaveFiles 槽位对账的契约。引擎逐字实现与镜像偏差登记见
// test/helpers/era-fixture.js 的「global 系存档 API」段注释 ——
// 两处版本闸门的判空写法差异（loadData truthy / loadGlobal undefined）是
// 验收清单点名的核查项：下面两条用例各自取到能区分两种写法的值，
// 不共用断言（写法被互换即红）。

test('saveGlobal 盖戳落盘（#147）：loadGlobal 读回同一份，多出的键随整份替换消失', async () => {
  const fixture = create_era_fixture();
  const { era, store } = fixture;

  store.set('global:0', 7);
  store.set('global:98', 2);
  assert.equal(await era.saveGlobal(), true);

  // 落盘后改内存：读回必须是落盘时的快照（整份替换，非合并）
  store.set('global:0', 9);
  store.delete('global:98');
  store.set('global:99', 5); // 不在文件里的键
  await era.loadGlobal();

  assert.equal(
    store.get('global:0'),
    7,
    '读回的是落盘时的值（盖戳写盘被拆即红）',
  );
  assert.equal(store.get('global:98'), 2, '文件里的键一并灌回');
  assert.equal(
    store.get('global:99'),
    undefined,
    '不在文件中的键随整份替换消失（引擎 this.era.global = n）',
  );
  assert.deepEqual(fixture.logs, [], '版本与游戏标识都对，无报错');
  // loadGlobal 成功路径尾部逐字：listSaveFiles（不在 SDK 面、无记录）+ saveGlobal
  assert.deepEqual(
    fixture.calls.map((c) => c.api),
    ['saveGlobal', 'loadGlobal', 'saveGlobal'],
  );
});

test('loadGlobal 镜像 gameCode 不匹配的 throw 型（#147）：先报错再裸抛（引擎启动拒绝的机制本体）', async () => {
  const fixture = create_era_fixture();
  const { era } = fixture;

  await era.saveGlobal(); // 以当前 game_code 落盘
  fixture.save_gate.game_code = 931061; // GameBase 的【游戏标识】变了

  await assert.rejects(
    () => era.loadGlobal(),
    // 引擎逐字 if(r)throw new Error——裸抛无 message，断言只认 Error 本体
    (e) => e instanceof Error,
    '不匹配必须裸抛 Error 而非返回 false（返回 false 是无害桩降格）',
  );
  assert(
    fixture.logs.some(
      (l) => l.level === 'error' && String(l.msg).includes('所属游戏ID'),
    ),
    'throw 前经 logger.error 留下引擎同款报错文案',
  );
  assert.deepEqual(
    fixture.calls.map((c) => c.api),
    ['saveGlobal', 'loadGlobal'],
    'throw 炸穿后不再有后续调用',
  );
});

test('loadGlobal 版本闸门用 undefined 判空（#147）：version 0 低于下限即重建，truthy 写法会漏放', async () => {
  const fixture = create_era_fixture();
  const { era, store } = fixture;

  fixture.save_gate.current_version = 0; // 落一盘 version 0 的 global.sav
  store.set('global:0', 7);
  await era.saveGlobal();
  // allow_version 默认 1：undefined 判空下 0 < 1 命中比较 → 版本过低。
  // 若照抄 loadData 的 truthy 写法，0 会被短路漏放、直接走读入分支
  await era.loadGlobal();

  assert(
    fixture.logs.some(
      (l) => l.level === 'error' && String(l.msg).includes('版本过低'),
    ),
    'version 0 低于下限也必须拦（undefined 判空不吃 truthy 短路）',
  );
  assert.equal(store.get('global:0'), 0, '过低即重建：旧值清 0');
  assert.deepEqual(
    fixture.calls.map((c) => c.api),
    ['saveGlobal', 'loadGlobal', 'resetGlobal', 'saveGlobal'],
    '重建路径逐字：loadGlobal → resetGlobal → saveGlobal',
  );
});

test('loadData 版本闸门用 truthy 判空（#137 落地、#147 钉写法）：version 0 即便不低于下限也拒读', async () => {
  const fixture = create_era_fixture();
  const { era, store } = fixture;

  fixture.save_gate.current_version = 0;
  store.set('flag:1', 11);
  await era.saveData(3, '零版本档');
  fixture.save_gate.allow_version = 0; // 0 不低于下限 0……
  store.set('flag:1', 22); // 存档后再改，验「拒读不动数据」

  assert.equal(
    await era.loadData(3),
    false,
    'truthy 判空：version 0 短路拒读（换成 undefined 写法会放行，本用例即红）',
  );
  assert.equal(store.get('flag:1'), 22, '拒读不动数据');
});

test('两处闸门写法的差异对照（#147）：version 0 且下限 0——loadData 拒、loadGlobal 收', async () => {
  const fixture = create_era_fixture();
  const { era, store } = fixture;

  fixture.save_gate.current_version = 0;
  fixture.save_gate.allow_version = 0;
  store.set('global:0', 7);
  await era.saveGlobal();
  store.set('global:0', 9);
  await era.loadGlobal();

  assert.equal(
    store.get('global:0'),
    7,
    '同一取值 loadGlobal 收：0 是合法版本号，undefined 判空放它进比较',
  );
});

test('loadGlobal 文件缺失走重建（#147）：global 键清 0，二次 load 即成功路径', async () => {
  const fixture = create_era_fixture();
  const { era, store } = fixture;

  store.set('global:0', 7);
  await era.loadGlobal(); // 尚未落过盘 → 文件缺失分支

  assert.deepEqual(fixture.logs, [], '文件缺失不是错误（引擎静默重建）');
  assert.equal(store.get('global:0'), 0, '重建后旧 global 值清 0');
  assert.deepEqual(
    fixture.calls.map((c) => c.api),
    ['loadGlobal', 'resetGlobal', 'saveGlobal'],
  );

  // 重建尾部已把 global.sav 写出：再 load 即成功路径（不再 resetGlobal）
  store.set('global:0', 9);
  await era.loadGlobal();
  assert.equal(store.get('global:0'), 0, '二次 load 读回重建时落盘的值');
  assert.deepEqual(fixture.calls.map((c) => c.api).slice(3), [
    'loadGlobal',
    'saveGlobal',
  ]);
});

test('listSaveFiles 槽位对账（#147）：文件丢加 (FILE LOST) 前缀、文件在剥误标前缀', async () => {
  const fixture = create_era_fixture();
  const { era, store } = fixture;

  // 槽 5：备注在而文件丢（引擎侧 = sav/save5.sav 被删/盘损，备注随
  // global.sav 存活）——备注先进 global 再落盘，槽文件从不曾存在
  store.set('global:saves:5', '五号备注');
  // 槽 6：文件在而备注带误标前缀（引擎侧 = 文件失而复得，如备份恢复）
  await era.saveData(6, '六号备注');
  store.set('global:saves:6', '(FILE LOST) 六号备注');
  await era.saveGlobal(); // 带着两处状态落盘

  await era.loadGlobal(); // 成功路径尾部对账（引擎逐字 listSaveFiles + saveGlobal）

  assert.equal(
    store.get('global:saves:5'),
    '(FILE LOST) 五号备注',
    '备注在而文件丢必须加 (FILE LOST) 前缀（has_valid_save 消费的约定）',
  );
  assert.equal(
    store.get('global:saves:6'),
    '六号备注',
    '文件在：误标的丢失前缀被剥掉（引擎 substring(12)）',
  );
});

test('resetGlobal 整份重建（#147）：旧值清 0、备注丢失的槽按文件补 UNNAMED SAVE FILE', async () => {
  const fixture = create_era_fixture();
  const { era, store } = fixture;

  await era.saveData(3, '三号档');
  store.set('global:0', 7);
  assert.equal(await era.resetGlobal(), true, '返回尾部 saveGlobal 的结果');

  assert.equal(store.get('global:0'), 0, '声明键清 0（夹具近似：一律清 0）');
  assert.equal(
    store.get('global:saves:3'),
    'UNNAMED SAVE FILE',
    '文件在而备注缺必须补 UNNAMED SAVE FILE（重建丢备注后的对账）',
  );
  assert.deepEqual(
    fixture.calls.map((c) => c.api),
    ['saveData', 'resetGlobal', 'saveGlobal'],
    'saveData 的自动持久化不另记 calls（只属于显式调用）',
  );
});

test('addCharacter 镜像引擎守卫：无预设返回 false 且不加，有预设才加（issue #35）', () => {
  const fixture = create_era_fixture();

  // #21/#22 漏过的场景：调了 addCharacter，但（当时的）yml/ 没有角色表，
  // 引擎第一步就短路——空壳夹具记下调用后断言全绿，实机一个角色都没加
  assert.equal(fixture.era.addCharacter(0), false);
  assert.deepEqual(fixture.chara_no, []);
  // 调用仍被记录（接入层面的断言不受影响）
  assert.deepEqual(fixture.calls, [{ api: 'addCharacter', args: [0] }]);

  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  assert.equal(fixture.era.addCharacter(0), true);
  assert.deepEqual(fixture.chara_no, [0]);

  // 重复加入：引擎先滤同号再入列，列表不重复
  assert.equal(fixture.era.addCharacter(0), true);
  assert.deepEqual(fixture.chara_no, [0]);

  // 双参数形态 [目标号, 源数据号]：以 1 号预设重建 0 号，仍是 0 号
  fixture.seed_chara(1, { id: 1, name: '壹' });
  assert.equal(fixture.era.addCharacter([0, 1]), true);
  assert.deepEqual(fixture.chara_no, [0]);
});

test('角色列表的顺序语义（#150）：三个 get 按数值升序，容器保持插入序', () => {
  const fixture = create_era_fixture();
  // 非升序喂法：seed/加入/入列全部先大号后小号——现有其余用例恰好都是
  // 升序加入，改不改实现都绿，这条是唯一的非升序判据（G4 的潜伏缺口本体）
  fixture.seed_chara(31, { id: 31, name: '琼' });
  fixture.seed_chara(0, { id: 0, name: '你' });
  fixture.seed_chara(5, { id: 5, name: '五号' }); // 只 seed 不加入
  fixture.era.addCharacter(31);
  fixture.era.addCharacter(0);

  // 容器侧（引擎 data.no 的对应物）：插入序不动——removeCharacter 的
  // 过滤与重加入的「先滤同号再入列」都依赖它，别顺手把它也排序
  assert.deepEqual(fixture.chara_no, [31, 0], '容器 chara_no 保持插入序');

  // 引擎 getAddedCharacters = Object.keys(data.base).map(Number)：
  // 整数键恒数值升序，与加入先后无关
  assert.deepEqual(
    fixture.era.getAddedCharacters(),
    [0, 31],
    '已加入列表按数值升序，与加入序无关',
  );

  fixture.era.beginTrain(31, 0);
  // getCharactersInTrain = Object.keys(data.tequip || {}).map(Number)：
  // beginTrain 的参数序同样不影响返回序
  assert.deepEqual(
    fixture.era.getCharactersInTrain(),
    [0, 31],
    '调教列表按数值升序，与入列序无关',
  );

  // getAllCharacters = Object.keys(staticData.chara).map(Number)：读静态
  // 预设表的键，与是否已加入无关（5 从未 addCharacter 也在列）
  assert.deepEqual(
    fixture.era.getAllCharacters(),
    [0, 5, 31],
    '预设表键按数值升序，且含未加入者',
  );
});

test('addCharacter 落 callname 键（引擎数据层行为，#44）：姓名 -1 / 称呼 -2', () => {
  const fixture = create_era_fixture();
  // 名前 ≠ 呼び名 的角色：两个键重合的世界里，写反了也断言不出来
  fixture.seed_chara(31, { id: 31, name: '温妮', callname: '小温' });
  fixture.era.addCharacter(31);

  // 引擎 addCharacter 方法体（app.asar）：
  //   callname[id][-1] = staticData.chara[id].name
  //   callname[id][-2] = staticData.chara[id].callname ?? name
  assert.equal(fixture.store.get('callname:31:-1'), '温妮');
  assert.equal(fixture.store.get('callname:31:-2'), '小温');
  // 数据层初始化不走记录层（游戏代码的调用意图由 var_writes 断言）
  assert.deepEqual(fixture.var_writes, []);
});

test('removeCharacter 镜像引擎：过滤删除且恒返回 undefined（DELCHARA 等价物，#44/#149）', () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(31, { id: 31, name: '温妮', callname: '温妮' });
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(31);

  // 引擎方法体没有 return 语句，恒 undefined（#149/G3：旧夹具单参返回
  // 「!includes(id)」的布尔值是发明，被本用例的前身钉成过断言）
  assert.equal(
    fixture.era.removeCharacter(31),
    undefined,
    '引擎方法体没有 return 语句，恒返回 undefined',
  );
  // 过滤删除（data.no.filter 的镜像）：被删者出列、幸存者保序
  assert.deepEqual(fixture.chara_no, [0]);
  assert.deepEqual(fixture.calls, [
    { api: 'addCharacter', args: [0] },
    { api: 'addCharacter', args: [31] },
    { api: 'removeCharacter', args: [31] },
  ]);

  // 二次删除同一 ID（已不在列表）：引擎同样静默 undefined——布尔返回值
  // 复辟的形态下这里会拿到 true（「不在列表」而非「删掉了」），语义错乱
  assert.equal(fixture.era.removeCharacter(31), undefined);
  assert.deepEqual(fixture.chara_no, [0]);
});

test('removeCharacter 幸存者三段键清理（#149）：指向被删者的 relation/callname 删除，指向他人保留', () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(5, { id: 5, name: '五号', callname: '五号' });
  fixture.seed_chara(31, { id: 31, name: '温妮', callname: '温妮' });
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(5);
  fixture.era.addCharacter(31);
  fixture.era.set('relation:0:31', 800);
  fixture.era.set('callname:0:31', '温妮');
  fixture.era.set('relation:0:5', 300); // 幸存者之间的条目
  fixture.era.set('relation:0:99', 100); // 99 从未入列，但将出现在本次参数里

  fixture.era.removeCharacter(31, 99);

  // 引擎 filter 幸存者分支（delete relation[r][t] / callname[r][t]）：
  // 三段键的主段是幸存者、不随除名失效，不删则残留可读而引擎下是 undefined
  assert.equal(
    fixture.era.get('relation:0:31'),
    undefined,
    '删完之后幸存者读被删者是 undefined',
  );
  assert.equal(fixture.era.get('callname:0:31'), undefined);
  // 幸存者之间的条目不在清理范围（引擎只删指向每个参数的条目）
  assert.equal(fixture.era.get('relation:0:5'), 300);
  // 99 不在 chara_no（从未入列）但出现在参数里：引擎按**参数**删三段键、
  // 不按「实际移出列表者」删——若镜像写成按 removed 集合删，此键漏删
  assert.equal(
    fixture.era.get('relation:0:99'),
    undefined,
    '三段键按参数删（参数里出现即删，无论是否真被移出列表）',
  );
});

// —— 引擎桥接（#149 验收项）：夹具证明「调了」，引擎真方法证明「引擎这么干」——
// 引擎侧逐字见票身与夹具注释；这里驱动 app.asar 里的真 removeCharacter
// （经 test/helpers/engine-bundle.js，与 addCharacter 共用同一数据层），
// 给上面两条夹具镜像的行为提供引擎侧证据。缺引擎（无 app.asar）时
// skip，跳过数进 test/engine-skip-baseline.txt 基线。

const engine = load_engine_bundle();
const engine_test = engine ? test : test.skip;

engine_test(
  '引擎 removeCharacter：无 return 语句，幸存者三段键与被删者整行都被清掉',
  () => {
    const loader = create_chara_loader();
    // 最小预设：两个角色足以分开「幸存者 × 被删者」与「被删者自身行表」。
    // 装载循环一次 load_rows 装一个角色（preset 是单角色累积器，与引擎
    // 「每文件一角色」同构），两个角色分两袋
    loader.load_rows([
      ['番号', '0'],
      ['名前', '你'],
    ]);
    loader.load_rows([
      ['番号', '31'],
      ['名前', '温妮'],
    ]);
    const adder = create_add_character(loader.static_data);
    assert.equal(adder.add(0), true);
    assert.equal(adder.add(31), true);

    // 种入关系数据：直接写引擎内部数据层（初始状态，非被测行为）
    adder.data.relation[0][31] = 800;
    adder.data.callname[0][31] = '温妮';
    adder.data.relation[0][5] = 300; // 幸存者指向第三者（未入列）

    // 引擎真方法（方法体无 return 语句）
    assert.equal(adder.remove(31), undefined, '引擎无 return，恒 undefined');
    assert.deepEqual(adder.data.no, [0]);

    // 票面验收点：幸存者指向被删者的条目被引擎真删（读回 undefined）
    assert.equal(
      adder.data.relation[0][31],
      undefined,
      '引擎删幸存者指向被删者的 relation 三段键',
    );
    assert.equal(
      adder.data.callname[0][31],
      undefined,
      '引擎删幸存者指向被删者的 callname 三段键',
    );
    assert.equal(adder.data.relation[0][5], 300, '指向第三者的条目不动');
    // 删除循环：被删者自己的整行表
    assert.equal(
      adder.data.relation[31],
      undefined,
      '被删者 relation 整行删除',
    );
    assert.equal(
      adder.data.callname[31],
      undefined,
      '被删者 callname 整行删除',
    );
    assert.equal(adder.data.base[31], undefined, '被删者 base 整行删除');
  },
);

engine_test(
  '引擎三个角色列表 get：Object.keys 整数键升序，与加入序无关（#150）',
  () => {
    const loader = create_chara_loader();
    // 预设按 31 → 0 → 5 的顺序装载（staticData.chara 的键插入序非升序）
    loader.load_rows([
      ['番号', '31'],
      ['名前', '琼'],
    ]);
    loader.load_rows([
      ['番号', '0'],
      ['名前', '你'],
    ]);
    loader.load_rows([
      ['番号', '5'],
      ['名前', '五号'],
    ]);
    const adder = create_add_character(loader.static_data);

    // 非升序加入：31 先、0 后——data.no 是插入序（数组 push）
    assert.equal(adder.add(31), true);
    assert.equal(adder.add(0), true);
    assert.deepEqual(adder.data.no, [31, 0]);

    // 真方法逐字读表键：Object.keys(data.base) 对整数键恒数值升序
    assert.deepEqual(adder.get_added(), [0, 31]);
    // staticData.chara 的键升序，含未加入的 5
    assert.deepEqual(adder.get_all(), [0, 5, 31]);
    // data.tequip 缺失：引擎 `|| {}` 兜底空表
    assert.deepEqual(adder.get_in_train(), []);

    // 按 beginTrain(31, 0) 的参数序建 tequip 桶（addCharacterForTrain
    // 逐参数 `data.tequip[id] = {}` 的时序），键序仍交给 Object.keys
    adder.data.tequip = {};
    adder.data.tequip[31] = {};
    adder.data.tequip[0] = {};
    assert.deepEqual(adder.get_in_train(), [0, 31]);
  },
);

engine_test('引擎 getNumber（模块 65）：input 回传归一的边界值（#151）', () => {
  const { getNumber } = engine.engine_utils;
  // 上面夹具正主用例的同一组取值——期望值由引擎真函数背书，不是凭
  // Number() 的直觉抄写。空串与 null 的 0 是 Number 语义里最反直觉的
  // 两条；undefined 走 NaN 分支原样返回（Number(undefined) === NaN）
  assert.ok(getNumber('3') === 3);
  assert.ok(getNumber('') === 0);
  assert.ok(getNumber('abc') === 'abc');
  assert.ok(getNumber('  3 ') === 3);
  assert.ok(getNumber('0') === 0);
  assert.ok(getNumber('-5') === -5);
  assert.ok(getNumber('3abc') === '3abc');
  assert.ok(getNumber(null) === 0);
  assert.ok(getNumber(3) === 3);
  assert.ok(getNumber(undefined) === undefined);
  // Number 特有形态的文档性快照：整串解析吃十六进制与科学计数法、
  // 纯空白等同空串——parseInt/parseFloat 在这些取值上全部偏离
  assert.ok(getNumber('0x10') === 16);
  assert.ok(getNumber('1e2') === 100);
  assert.ok(getNumber('  ') === 0);
});
engine_test(
  '引擎比对：beginTrain 重建清 tflag 静态条目、表已在则不清；endTrain 删 11 张表（#152）',
  () => {
    const { era_api } = engine;
    // 原型链载体：beginTrain 尾部 this.addCharacterForTrain(...) 走 this 的
    // 原型链找方法，普通对象字面量挂不上（juel-check 驱动 endTrain 无此
    // 依赖）。基类原型另有 get data()/get staticData() 访问器（读 this.era），
    // 普通赋值遮蔽不了，须 defineProperty 定义 own 属性
    const make_train_this = () => {
      const t = Object.create(era_api.prototype);
      // staticData.tflag 只被 Object.values 消费（值成为 data.tflag 的键），
      // 给两个声明条目即可，与名字表的方向性无关。base 空表：addCharacterForTrain
      // 建桶时对 staticData.base 无守卫地 Object.values（空表 → 不建键）
      Object.defineProperty(t, 'staticData', {
        value: { base: {}, tflag: { a: '第一条', b: '第二条' } },
        writable: true,
      });
      Object.defineProperty(t, 'data', {
        value: { juel: { 31: { 0: 10 } } },
        writable: true,
      });
      return t;
    };

    // 第一次 beginTrain：tequip 不存在 → 重建 11 张表 + tflag 静态条目清 0
    const t = make_train_this();
    era_api.prototype.beginTrain.call(t, 31);
    assert.deepEqual(
      Object.keys(t.data).sort(),
      [
        'delta',
        'deltabase',
        'ex',
        'gotjuel',
        'juel', // 用例预置的常驻表（endTrain 结算的目标），非 beginTrain 所建
        'nowex',
        'palam',
        'source',
        'stain',
        'tcvar',
        'tequip',
        'tflag',
      ].sort(),
      'beginTrain 重建 11 张表（juel 是预置的常驻表）',
    );
    assert(
      Object.values(t.data.tflag).every((v) => v === 0),
      'tflag 静态条目在重建那一刻清 0',
    );
    // addCharacterForTrain 已被 beginTrain 尾调：tequip 建角色桶（裸键是字符串）
    assert.deepEqual(Object.keys(t.data.tequip), ['31']);

    // 重复 beginTrain（tequip 已存在）：守卫跳过重建，已写值保留
    t.data.tflag['第一条'] = 7;
    era_api.prototype.beginTrain.call(t, 31);
    assert.equal(
      t.data.tflag['第一条'],
      7,
      '表已存在时重复 beginTrain 不清 tflag（守卫逐字）',
    );

    // endTrain：结算 gotjuel→juel 后删 11 张表
    t.data.gotjuel[31][0] = 5;
    era_api.prototype.endTrain.call(t);
    assert.equal(t.data.juel[31][0], 15, 'endTrain 把 gotjuel 加进 juel');
    for (const table of [
      'delta',
      'deltabase',
      'ex',
      'gotjuel',
      'nowex',
      'palam',
      'source',
      'stain',
      'tcvar',
      'tequip',
      'tflag',
    ]) {
      assert.equal(t.data[table], undefined, `endTrain 删整表 ${table}`);
    }
    // 删表后的下一次 beginTrain 重新走重建分支（跨场不残留的引擎本体）
    era_api.prototype.beginTrain.call(t, 31);
    assert(
      Object.values(t.data.tflag).every((v) => v === 0),
      '删表后的 beginTrain 重建：上一场的 7 不残留',
    );
  },
);

test('调教域表守卫（#44）：beginTrain 前后与角色入列的寻址边界', () => {
  const fixture = create_era_fixture();

  // 引擎寻址层（app.asar 模块 648）的镜像：二段 tflag 在 data.tflag 不存在
  // 时落到兜底分支报 key error；三段 palam 在角色子表缺失时静默丢弃。
  // 引擎侧证据由 test/train-loop.test.js 的引擎比对用例锁定
  assert.throws(() => fixture.era.set('tflag:0', 1), /key error/);
  assert.equal(fixture.era.set('palam:31:3', 1), undefined);

  fixture.era.beginTrain(0, 31);
  assert.equal(fixture.era.set('tflag:0', 1), 1);
  // 角色未入列（31 之外）仍静默丢弃
  assert.equal(fixture.era.set('palam:99:3', 5), undefined);
  assert.deepEqual(
    fixture.var_writes.filter((w) => w.name === 'palam:99:3'),
    [],
  );
  fixture.era.addCharacterForTrain(99);
  assert.equal(fixture.era.set('palam:99:3', 5), 5);

  // 常驻表（flag/base 等）不受调教开闭影响
  assert.equal(fixture.era.set('flag:36', 1), 1);

  // getCharactersInTrain / endTrain
  assert.deepEqual(fixture.era.getCharactersInTrain(), [0, 31, 99]);
  fixture.era.endTrain();
  assert.deepEqual(fixture.era.getCharactersInTrain(), []);
  assert.throws(() => fixture.era.set('tflag:0', 2), /key error/);
});

test('跨调教场不残留（#152）：endTrain 删表、下一场 beginTrain 整表重建', () => {
  const fixture = create_era_fixture();

  // 场 1：写入各类调教域键（tflag 二段；palam/ex/stain/source 三段）
  fixture.era.beginTrain(0, 31);
  fixture.era.set('tflag:860', 1);
  fixture.era.set('palam:31:3', 3000);
  fixture.era.set('ex:31:0', 1);
  fixture.era.set('stain:31:2', 2);
  fixture.era.set('source:31:0', 5);
  fixture.era.endTrain();

  // 场 2：整表重建后读不到上一场的值。夹具残留可读 = 掩盖「忘清
  // tflag/palam」类真缺陷（夹具读旧值、引擎读 0——#152 的逃逸形态，
  // 消费点如 event-end.js 的 tflag:860 / palam:3·5 结算读）
  fixture.era.beginTrain(0, 31);
  assert.equal(
    fixture.era.get('tflag:860'),
    undefined,
    '下一场调教读不到上一场的 tflag（endTrain 删表 + beginTrain 整表重建）',
  );
  assert.equal(
    fixture.era.get('palam:31:3'),
    undefined,
    '下一场调教读不到上一场的 palam——删表范围是 11 张整表，不止 tflag',
  );
  assert.equal(
    fixture.era.get('ex:31:0'),
    undefined,
    '下一场调教读不到上一场的 ex',
  );
  assert.equal(
    fixture.era.get('stain:31:2'),
    undefined,
    '下一场调教读不到上一场的 stain',
  );
  assert.equal(
    fixture.era.get('source:31:0'),
    undefined,
    '下一场调教读不到上一场的 source（endTrain 删除列表含 source）',
  );
});

test('同场重复 beginTrain 不重建（#152）：tequip 守卫逐字，已写值保留', () => {
  const fixture = create_era_fixture();
  fixture.era.beginTrain(0, 31);
  fixture.era.set('tflag:860', 1);
  // 引擎守卫：this.data.tequip ||（表已存在）→ 跳过重建，tflag 不清。
  // 无条件清会错杀 train-loop 的同场幂等 beginTrain（补入角色不重置状态）
  fixture.era.beginTrain(0, 31);
  assert.equal(
    fixture.era.get('tflag:860'),
    1,
    '表已存在时重复 beginTrain 不重建（引擎 tequip 守卫逐字）',
  );
});

test('resetData 清调教态（#152，D4 登记的分歧闭合）：列表清空、表键随 data 重建消失', () => {
  const fixture = create_era_fixture();
  fixture.era.beginTrain(0, 31);
  fixture.era.set('tflag:860', 1);
  assert.deepEqual(fixture.era.getCharactersInTrain(), [0, 31]);

  // 引擎 resetData 整份重建 data：tequip 消失 → getCharactersInTrain 恒 []
  // （D4 #150 登记给本票的分歧：夹具此前只清 chara_no 不清 chars_in_train）
  fixture.era.resetData();
  assert.deepEqual(
    fixture.era.getCharactersInTrain(),
    [],
    'resetData 把调教列表一并清空（引擎整份重建 data）',
  );
  assert.throws(() => fixture.era.set('tflag:0', 1), /key error/);
  fixture.era.beginTrain(0, 31);
  assert.equal(
    fixture.era.get('tflag:860'),
    undefined,
    'resetData 后新开调教读不到残留（表随 data 整份重建消失）',
  );
});

test('logger 被记录且不自递归', () => {
  const fixture = create_era_fixture();
  // 若只置 version.engine 而不整体替换 logger，
  // SDK 自带的 logger 会无限自调用（era-electron.js:291-295）
  fixture.era.logger.error('boom');
  fixture.era.logger.info('hello');

  assert.deepEqual(fixture.logs, [
    { level: 'error', msg: 'boom', stack: undefined },
    { level: 'info', msg: 'hello' },
  ]);
});

test('era.input 在预置输入耗尽时立刻报错', async () => {
  const fixture = create_era_fixture();
  await assert.rejects(() => fixture.era.input(), /预置输入已耗尽/);
});

test('printAndWait 输出计入 lines', async () => {
  const fixture = create_era_fixture();
  await fixture.era.printAndWait('按任意键继续');
  assert.deepEqual(fixture.text_lines(), ['按任意键继续']);
});

test('printAndWait 不进 waits（注入点对等待的观测统一走显式 waitAnyKey）', async () => {
  // 引擎 printAndWait = print + waitAnyKey 两步组合（app.asar 逐字）。夹具
  // 有意不镜像内部等待：inputs_consumed / waits 只记录显式 waitAnyKey，
  // 否则 kojo 全链的消费序列会把「打印+等」翻倍。这条钉住「故意不镜像」
  // （#68 验收通则：已查实暂不镜像的判断本身要当成待测行为）。
  const fixture = create_era_fixture();
  await fixture.era.printAndWait('按任意键继续');
  assert.deepEqual(fixture.waits, []);
  assert.deepEqual(fixture.inputs_consumed, []);
});

test('waitAnyKey：无输出跳过；有输出才等键并清零', async () => {
  const fixture = create_era_fixture();
  // 引擎：(this.allowWait||e)&&(this.allowWait=!1, await this.input({any:!0}))
  // 空屏 / 无输出 → 跳过。旧桩「立即返回并记录」会把跳过记成等了，本用例
  // 钉住「等了和没等」的区分（#73 发回：夹具必须镜像 allowWait）。
  await fixture.era.waitAnyKey();
  assert.deepEqual(fixture.waits, [
    { waited: false, rows_at_wait: 0, forced: false },
  ]);
  assert.deepEqual(fixture.inputs_consumed, []);

  fixture.era.print('有输出');
  await fixture.era.waitAnyKey();
  assert.equal(fixture.waits[1].waited, true);
  assert.equal(fixture.waits[1].rows_at_wait, 1);
  assert.deepEqual(fixture.inputs_consumed, [{ api: 'waitAnyKey' }]);

  // 等待消费清零：第二次裸调跳过
  await fixture.era.waitAnyKey();
  assert.equal(fixture.waits[2].waited, false);
});

test('waitAnyKey：input 回显同样置位 allowWait', async () => {
  const fixture = create_era_fixture();
  fixture.set_inputs(42);
  await fixture.era.input(); // 回显经 print → addTotalLines 置位
  await fixture.era.waitAnyKey();
  assert.equal(fixture.waits[0].waited, true);
  assert.equal(fixture.waits[0].rows_at_wait, 1); // 回显 +1 Row
});

test('clear 在 isContinue 时强制等键（非 0 实参）；clear(0) 不等', async () => {
  const fixture = create_era_fixture();
  fixture.era.print('行');
  await fixture.era.waitAnyKey(); // 消费掉输出置位
  fixture.is_continue = true;

  await fixture.era.clear(0); // 0!==e 不成立，不等
  assert.equal(fixture.waits.length, 1);

  await fixture.era.clear(1); // 强制 waitAnyKey(true)，再清行并再置位
  const forced = fixture.waits.find((w) => w.forced);
  assert.ok(forced, 'isContinue 下非 0 的 clear 必须强制等键');
  assert.equal(forced.waited, true);
});

test('文本片段数组被压平为纯文本', () => {
  const fixture = create_era_fixture();
  fixture.era.print([
    { content: ' HP ', color: 'red' },
    '100',
    { isBlank: 1 },
    { isBr: 1 },
    '继续',
  ]);
  // isBlank 无文本；isBr 保留为换行
  assert.deepEqual(fixture.text_lines(), [' HP 100\n继续']);
});

test('clear 清空输出', async () => {
  const fixture = create_era_fixture();
  fixture.era.print('a');
  fixture.era.print('b');

  assert.equal(await fixture.era.clear(), 0);
  assert.deepEqual(fixture.text_lines(), []);
});

test('已加入角色列表：addCharacter 追加、resetData 清空（CHARANUM 等价物）', () => {
  const fixture = create_era_fixture();
  // 严格夹具：先预置才加得进（#35 的引擎守卫）
  fixture.seed_chara(0, { id: 0, name: '你' });
  fixture.seed_chara(31, { id: 31, name: '琼' });
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(31);

  assert.deepEqual(fixture.chara_no, [0, 31]);
  assert.deepEqual(fixture.era.getAddedCharacters(), [0, 31]);
  // 返回副本：外部篡改不影响列表本体
  fixture.era.getAddedCharacters().pop();
  assert.deepEqual(fixture.chara_no, [0, 31]);

  fixture.era.resetData();
  assert.deepEqual(fixture.chara_no, []);
  // 两者虽有专门实现，仍显式记录：用例要能断言「先清档再加人」的顺序
  assert.deepEqual(fixture.calls, [
    { api: 'addCharacter', args: [0] },
    { api: 'addCharacter', args: [31] },
    { api: 'resetData', args: [] },
  ]);
});

test('printButton 记录 config.color（按钮明暗断言的落点）', () => {
  const fixture = create_era_fixture();
  fixture.era.printButton('▌调教目标', 496, { color: '#bbbbbb' });
  fixture.era.printButton('▌助手', 497);

  const [dim, normal] = fixture.lines;
  assert.equal(dim.type, 'button');
  assert.equal(dim.color, '#bbbbbb');
  assert.equal(normal.color, undefined);
});

test('drawLine 记录线型（isSolid → solid，默认 dashed）', () => {
  const fixture = create_era_fixture();
  fixture.era.drawLine({ isSolid: true });
  fixture.era.drawLine();

  assert.deepEqual(
    fixture.lines.map((line) => line.border),
    ['solid', 'dashed'],
  );
});

test('文本行保留原始片段（样式断言的落点，text 是压平结果）', () => {
  const fixture = create_era_fixture();
  const fragments = [
    { content: '《满月》', color: 'yellow', fontWeight: 'bold' },
  ];
  fixture.era.print(fragments);

  const record = fixture.lines[0];
  assert.equal(record.type, 'text');
  assert.equal(record.text, '《满月》');
  assert.equal(record.content, fragments);
});

// —— 多列输出族的录制（#48 比对录制器：print 系全部输出 API 有专门记录，
//    不落兜底 calls——「文本层录制器覆盖 print 系全部输出 API」的落点） ——

test('printMultiColumns：GridObject 逐格压平成既有条目类型', () => {
  const fixture = create_era_fixture();
  fixture.era.printMultiColumns([
    { type: 'button', content: '爱抚', accelerator: 0 },
    { type: 'text', content: '一行说明' },
    { type: 'divider', config: { isSolid: true } },
    { type: 'image', names: 'res-a' },
  ]);

  assert.deepEqual(
    fixture.lines.map((l) => l.type),
    ['button', 'text', 'divider', 'image'],
  );
  // 按钮条目与 printButton 同款：rendered 是引擎前缀公式（app.asar）
  assert.equal(fixture.lines[0].text, '爱抚');
  assert.equal(fixture.lines[0].accelerator, 0);
  assert.equal(fixture.lines[0].rendered, '[0] 爱抚');
  assert.equal(fixture.lines[2].border, 'solid');
  assert.deepEqual(fixture.lines[3].names, 'res-a');
  // 已实现集：不落兜底 calls
  assert.deepEqual(fixture.calls, []);
});

test('printInColRows：ColumnObject 与裸 GridObject 数组两种实参都记录', () => {
  const fixture = create_era_fixture();
  fixture.era.printInColRows(
    { columns: [{ type: 'text', content: '列组形态' }] },
    [{ type: 'button', content: '裸数组形态', accelerator: 7 }],
  );

  // 两个 ColumnObject 的全部格子共享同一个 Row 号（引擎渲染层把整次调用
  // 装进一个 inColRows 行对象，#68 实证）
  assert.deepEqual(fixture.lines, [
    { type: 'text', text: '列组形态', content: '列组形态', row: 0 },
    {
      type: 'button',
      text: '裸数组形态',
      accelerator: 7,
      rendered: '[7] 裸数组形态',
      color: undefined,
      row: 0,
    },
  ]);
});

test('printImage：记 image 条目（无文本，比对只记录）', () => {
  const fixture = create_era_fixture();
  fixture.era.printImage('res-x', 'res-y');

  // 空 resolved 不挂（#69 与 #68 的合并标准）：条目保持裸形状
  assert.deepEqual(fixture.lines, [
    { type: 'image', names: ['res-x', 'res-y'], row: 0 },
  ]);
  assert.deepEqual(fixture.calls, []);
});

// —— 媒体缝（issue #69）：注册表查名与解析语义镜像 app.asar 实测行为 ——

test('媒体注册表：查名统一小写（引擎装载与查名两侧都小写）', () => {
  const fixture = create_era_fixture();
  fixture.seed_res('TITLE');
  fixture.seed_res('TFM-003A_17.mp3', 'audio');

  // 注册名带大写，查询任意大小写都命中（引擎 eraStart 落表即小写）
  assert.equal(fixture.era.checkImage('TITLE'), true);
  assert.equal(fixture.era.checkImage('title'), true);
  assert.deepEqual(fixture.era.checkImage('Tfm-003A_17.MP3', 'TITLE'), [
    false,
    true,
  ]);
});

test('checkImage 只认 image 类型（音频经 playMusic 命中，引擎代码为准）', () => {
  const fixture = create_era_fixture();
  fixture.seed_res('据点2.mp3', 'audio');

  // dev-guides/16 宣称 checkImage 可查音乐，但 app.asar 的 checkImage 只放行
  // image 类型——夹具按代码镜像，不按手册
  assert.equal(fixture.era.checkImage('据点2.mp3'), false);
  // 零参返回 false（引擎原文 `if(0===e.length)return!1`）
  assert.equal(fixture.era.checkImage(), false);
});

test('playMusic：config 非对象重置为 {loop:false}、取第一个注册音频、落空返回 false', () => {
  const fixture = create_era_fixture();
  fixture.seed_res('TITLE'); // 图片：即使排在前面也不命中（引擎只认 audio 类型）
  fixture.seed_res('据点2.mp3', 'audio');

  // 已注册的图片名在前、已注册的音频在后 → 播后者（引擎逐名找第一个音频）
  assert.equal(
    fixture.era.playMusic(['TITLE', '据点2.mp3'], { loop: true }),
    true,
  );
  assert.deepEqual(fixture.music, [
    {
      api: 'play',
      names: ['title', '据点2.mp3'],
      config: { loop: true },
      played: '据点2.mp3',
    },
  ]);

  // config 缺省 → 引擎重置为 {loop: false}（Emuera PLAYBGM 默认循环，ere 相反）
  fixture.era.playMusic('据点2.mp3');
  assert.deepEqual(fixture.music[1].config, { loop: false });

  // 全部落空：返回 false、不抛错（resource: false 时的静默回退）
  assert.equal(fixture.era.playMusic('不存在.mp3'), false);
  assert.equal(fixture.music[2].played, null);
});

test('stopMusic / resumeMusic 记录（音乐事件记录面）', () => {
  const fixture = create_era_fixture();
  fixture.era.stopMusic();
  fixture.era.resumeMusic();

  assert.deepEqual(fixture.music, [{ api: 'stop' }, { api: 'resume' }]);
  // 已实现集：不落兜底 calls
  assert.deepEqual(fixture.calls, []);
});

test('printWholeImage：\\t 容错链与空层丢弃都记进 resolved', () => {
  const fixture = create_era_fixture();
  fixture.seed_res('heart');
  fixture.seed_res('heart_r');

  // 一层容错（第一个未注册、第二个命中）+ 一层全落空（该层被引擎丢弃）
  fixture.era.printWholeImage(['HEART_X\tHEART_R\tHEART', '幽灵层\t鬼影层']);
  const entry = fixture.lines[0];
  assert.equal(entry.type, 'image.whole');
  // 每层只解析出一个名字：首层取容错链第二个 heart_r，次层整体丢弃
  assert.deepEqual(entry.resolved, ['heart_r']);
  // falsy config 被引擎重置为 {}
  assert.deepEqual(entry.config, {});
});

test('音乐 API 不占 Row（引擎只 connect、不调 addTotalLines）；printImage 占 1 Row', () => {
  const fixture = create_era_fixture();
  const { era } = fixture;
  fixture.seed_res('据点2.mp3', 'audio');
  fixture.seed_res('TITLE');
  era.print('基准行');
  const before = era.getLineCount();

  // 反侧：三个音乐 API 都不改变行数（app.asar 实测：playMusic/stopMusic/
  // resumeMusic 只 connect，无 addTotalLines）。music[] 里的三条事件证明
  // 「行数没变」不是因为调用没发生——否则这条用例只是在测「什么都没发生」。
  era.playMusic('据点2.mp3', { loop: true });
  era.stopMusic();
  era.resumeMusic();
  assert.equal(era.getLineCount(), before);
  assert.equal(fixture.music.length, 3);

  // 正侧：同一场景下 printImage 计 1 Row（引擎结尾恰好一次 addTotalLines）
  era.printImage('TITLE');
  assert.equal(era.getLineCount(), before + 1);
  // 音乐误算成行是活风险：#73 画面组件的重绘算术全靠 Row 计数，多计一行
  // = 实机上多清一行。此用例即守住该判断的回归锁（#68 验收通则）。
});

// —— Row 记账（#68）：一次输出调用 = 一个 Row，与引擎标准一致 ——
// 引擎证据（app.asar）：主进程 EraApi 每次输出调用恰好一次 addTotalLines()；
// 渲染层把 printMultiCols / printInColRows 整次调用各装进一个行对象。

test('一次多列输出算一个 Row：getLineCount 增量为 1，clear(1) 只删本行', async () => {
  const fixture = create_era_fixture();
  const { era } = fixture;
  era.print('上一行');
  const before = era.getLineCount();

  era.printMultiColumns([
    { type: 'button', content: '调教', accelerator: 1 },
    { type: 'button', content: '外出', accelerator: 2 },
    { type: 'text', content: '状态' },
    { type: 'text', content: '更多' },
  ]);

  // ADR 0003 的缺陷场景：若按条目计数，增量是 4、组件 clear(4) 会连带
  // 抹掉上面三行无关内容——Row 的计法下增量必须是 1
  assert.equal(era.getLineCount() - before, 1);
  // 全部格子共享同一 Row 号
  const rows = new Set(fixture.lines.slice(1).map((l) => l.row));
  assert.equal(rows.size, 1);

  assert.equal(await era.clear(1), 1);
  assert.deepEqual(fixture.text_lines(), ['上一行']);
  assert.equal(era.getLineCount(), 1);
});

test('printInColRows 整次调用一个 Row（多 ColumnObject 不拆行）', async () => {
  const fixture = create_era_fixture();
  const { era } = fixture;
  era.printInColRows(
    { columns: [{ type: 'text', content: '左' }] },
    { columns: [{ type: 'text', content: '右' }] },
  );

  assert.equal(era.getLineCount(), 1);
  assert.deepEqual(
    fixture.lines.map((l) => l.row),
    [0, 0],
  );
  await era.clear(1);
  assert.deepEqual(fixture.lines, []);
});

test('逐行输出 API 各占一个 Row：print/println/printButton/drawLine/printImage', () => {
  const fixture = create_era_fixture();
  const { era } = fixture;
  era.print('a');
  era.println();
  era.printButton('按钮', 0);
  era.drawLine();
  era.printImage('res');

  assert.deepEqual(
    fixture.lines.map((l) => l.row),
    [0, 1, 2, 3, 4],
  );
  assert.equal(era.getLineCount(), 5);
});

test("print 的 '\\n' 与 {isBr} 是显示级换行：编程上仍一个 Row", () => {
  const fixture = create_era_fixture();
  const { era } = fixture;
  era.print('第一行\n第二行');
  era.print([{ content: '前' }, { isBr: 1 }, '后']);

  assert.equal(era.getLineCount(), 2);
  assert.deepEqual(
    fixture.lines.map((l) => l.row),
    [0, 1],
  );
});

test('clear 越界按整屏清空（渲染层公式），clear(0) 无操作', async () => {
  const fixture = create_era_fixture();
  const { era } = fixture;
  era.print('a');
  era.printMultiColumns([
    { type: 'text', content: 'x' },
    { type: 'text', content: 'y' },
  ]);
  era.print('b');

  assert.equal(await era.clear(0), 3); // 0 行 → 无操作，返回当前行数
  assert.equal(era.getLineCount(), 3);
  assert.equal(await era.clear(99), 0); // 越界 → 整屏清空
  assert.deepEqual(fixture.lines, []);
});

test('replaceText 换掉最后一个 Row 的全部条目，行数不增', () => {
  const fixture = create_era_fixture();
  const { era } = fixture;
  era.print('标题');
  era.printMultiColumns([
    { type: 'button', content: '甲', accelerator: 1 },
    { type: 'button', content: '乙', accelerator: 2 },
  ]);

  assert.equal(era.replaceText('改写'), 2); // 引擎返回 totalLines 原值
  assert.equal(era.getLineCount(), 2);
  // 多列 Row 的两个格子一起消失，新文本占据同一 Row 号
  assert.deepEqual(
    fixture.lines.map((l) => [l.type, l.row]),
    [
      ['text', 0],
      ['text', 1],
    ],
  );
  assert.deepEqual(fixture.text_lines(), ['标题', '改写']);
});

test('replaceInColRows 与 replaceText 同一标准：整行换、不增行', () => {
  const fixture = create_era_fixture();
  const { era } = fixture;
  era.printMultiColumns([
    { type: 'button', content: '甲', accelerator: 1 },
    { type: 'text', content: '乙' },
  ]);
  era.print('下一行');

  const ret = era.replaceInColRows(
    { columns: [{ type: 'text', content: '左' }] },
    [{ type: 'text', content: '右' }],
  );

  assert.equal(ret, 2);
  assert.equal(era.getLineCount(), 2);
  // 替换的是最后一个 Row（'下一行'）：row 0 的多列格子原样保留，
  // 替换条目全部落在 row 1
  assert.deepEqual(
    fixture.lines.map((l) => [l.type, l.row]),
    [
      ['button', 0],
      ['text', 0],
      ['text', 1],
      ['text', 1],
    ],
  );
});

test('printProgress 记 progress 条目并占一个 Row（顶层形态）', () => {
  const fixture = create_era_fixture();
  fixture.era.printProgress(50, '内部文本', '外部文本');

  // 不传 config → 引擎缺省 barWidth 24 物化进记录，且条后文字**不渲染**
  //（el-col-0 = display:none）——危险的默认值，夹具按 app.vue 渲染层逐字
  // 镜像（#74 发回整改）
  assert.deepEqual(fixture.lines, [
    {
      type: 'progress',
      percentage: 50,
      text: '内部文本',
      out: '外部文本',
      bar_width: 24,
      out_visible: false,
      row: 0,
    },
  ]);
  assert.equal(fixture.era.getLineCount(), 1);
  assert.deepEqual(fixture.calls, []);
});

// —— barWidth 镜像（#74 发回整改）：app.vue 渲染层公式 ——

test('progress 的 barWidth 镜像：顶层与多列格两条路径、空 out 的 v-if', () => {
  const fixture = create_era_fixture();
  const { era } = fixture;

  // 路径 1（顶层 printProgress 的第四参数）：barWidth<24 → 条后文字渲染
  era.printProgress(50, '阴核', ' 5540', { barWidth: 16 });
  // 路径 2（printMultiColumns 的 progress 格，config 随 GridObject 走）：
  // 不给 config → 缺省 24 物化，条后文字整列不渲染
  era.printMultiColumns([
    {
      type: 'progress',
      percentage: 50,
      inContent: '阴核',
      outContent: ' 5540',
    },
    {
      type: 'progress',
      percentage: 50,
      inContent: '阴核',
      outContent: ' 5540',
      config: { barWidth: 8 },
    },
  ]);

  assert.deepEqual(
    fixture.lines.map((l) => [l.bar_width, l.out_visible]),
    [
      [16, true], // 顶层 + config.barWidth=16
      [24, false], // 多列格无 config：缺省即危险值
      [8, true], // 多列格 + config.barWidth=8
    ],
  );

  // 引擎渲染层 v-if="line.outContent"：out 为空串时即使 span>0 也不渲染
  era.printProgress(100, '满档', '', { barWidth: 16 });
  const last = fixture.lines.at(-1);
  assert.equal(last.bar_width, 16);
  assert.equal(last.out, '');
  assert.equal(last.out_visible, false);
});

test('空 printMultiColumns 仍占一个 Row（引擎无条件 addTotalLines）', async () => {
  const fixture = create_era_fixture();
  const { era } = fixture;
  era.print('a');
  era.printMultiColumns([]);

  assert.equal(era.getLineCount(), 2); // 没有条目，但 Row 存在
  assert.equal(await era.clear(1), 1);
  assert.deepEqual(fixture.text_lines(), ['a']);
});

// —— input 回显计行（#68 整改）——
// 引擎主进程 input()（app.asar）：
//   v(this.config,"system.hideUserInput") || e.hideInput || e.any
//     || this.print(i)
// 普通 input() 的回显 print → addTotalLines → +1 Row；三段短路任一命中则
// 不 print。夹具只调计数器、不推条目（条目层的回显由比对标记承载）。

test('input 回显计一行：画 3 行 → input → clear(3) → 组件首行残留（重绘主路径）', async () => {
  const fixture = create_era_fixture();
  const { era } = fixture;
  era.print('第一行');
  era.print('第二行');
  era.print('第三行');
  fixture.set_inputs(0);
  await era.input();

  // 引擎：回显 print 计 +1 Row → 总 4 行；条目层不新增（回显不推条目）
  assert.equal(era.getLineCount(), 4);
  assert.equal(fixture.lines.length, 3);

  // ADR-0003 的重绘纪律「重绘只发生在玩家交互之后」——交互就是 input。
  // 组件按绘制时量得的 3 行 clear(3)，引擎实机清掉的是「回显 + 组件后两
  // 行」，组件首行残留。行数的计法若与引擎不一致（回显不计），组件在夹具
  // 里被完整清掉、实机上却留一行——这张票要消灭的正是这类缺陷
  assert.equal(await era.clear(3), 1);
  assert.deepEqual(fixture.text_lines(), ['第一行']);
});

test('input 回显三段短路：hideInput / any / system.hideUserInput 任一命中即不计行', async () => {
  const fixture = create_era_fixture();
  const { era } = fixture;
  era.print('a');
  fixture.set_inputs(1, 2, 3);
  await era.input({ hideInput: true });
  await era.input({ any: true });
  fixture.system_config.hideUserInput = true;
  await era.input();

  assert.equal(era.getLineCount(), 1); // 三次输入都未触发回显计行

  // 短路解除（默认配置）→ 回显计行恢复
  fixture.system_config.hideUserInput = false;
  fixture.set_inputs(4);
  await era.input();
  assert.equal(era.getLineCount(), 2);
});

// —— input 按钮白名单（#130）：引擎只把已打印按钮的快捷键回传给游戏 ——
//
// 引擎机制（app.vue 两处逐字，非手册推断）：按钮行构造把 accelerator 去重
// 累积进 inputParam.rule；回传时 useRule 默认开、数组非空才设限，判据
// Number(值) ∈ rule，未命中弹「输入不合法！请输入以下值之一：…」且不
// 回传；任何一次成功回传清空 rule。此前夹具的 set_inputs 照单全收，#129
// （[109] 按钮缺失）与 PR #53（[100]）两次都靠人开引擎才发现——这组用例
// 是防复发锁，锁对后来者不失明。

test('input 白名单（#130 自证）：喂未打印按钮的值必须抛错，并列出合法值', async () => {
  const fixture = create_era_fixture();
  const { era } = fixture;
  era.printButton('爱抚', 0);
  era.printButton('结束', 999);

  fixture.set_inputs(5);
  await assert.rejects(
    era.input(),
    (err) =>
      err.message.includes('输入不合法！请输入以下值之一：0, 999') &&
      err.message.includes('era.input()'),
    '白名单必须拒收未打印按钮的值（#130）',
  );

  // 命中即放行；引擎判据是 Number(值) ∈ rule——字符串 '0' 同样命中。
  // 放行的证据用送达记录（拒收＝0 条），回传值的归一形态由 #151 的正主
  // 用例专测——白名单语义与归一语义不共用断言
  fixture.set_inputs('0');
  await era.input();
  assert.equal(
    fixture.inputs_consumed.length,
    1,
    '字符串 "0" 命中白名单被放行（引擎判据 Number(值) ∈ rule）',
  );
});

test('input 白名单：本轮没打印按钮＝自由输入不设限（引擎对取名等场景的原生出口）', async () => {
  const fixture = create_era_fixture();
  const { era } = fixture;
  era.print('为奴隶起名：'); // 纯文本，无按钮
  fixture.set_inputs('苍井·橡');
  assert.equal(await era.input(), '苍井·橡');
});

test('input 白名单：任何一次成功回传都清空集合——旧按钮不再约束下一次 input', async () => {
  const fixture = create_era_fixture();
  const { era } = fixture;

  // input 回传后清空：第二个 1 落进自由窗口（引擎 rule=[] → 不设限）
  era.printButton('继续', 1);
  fixture.set_inputs(1, 1);
  assert.equal(await era.input(), 1);
  assert.equal(await era.input(), 1);

  // waitAnyKey 等键＝input({any:true}) 真回传一次，同样清空
  era.printButton('再看一眼', 2);
  await era.waitAnyKey(); // printButton 已置位 allowWait → 真等了
  fixture.set_inputs(3);
  assert.equal(await era.input(), 3);

  // printAndWait＝print + waitAnyKey（必等键），同样清空
  era.printButton('演出选项', 4);
  await era.printAndWait('演出文本');
  fixture.set_inputs(5);
  assert.equal(await era.input(), 5);

  // 对照：没有中间回传时，未命中仍然拦
  era.printButton('新选项', 6);
  fixture.set_inputs(7);
  await assert.rejects(era.input(), /请输入以下值之一：6/);
});

test('input 白名单：disabled 按钮不入集合；多列输出的按钮格同样入集合', async () => {
  const fixture = create_era_fixture();
  const { era } = fixture;

  // 引擎按钮行构造：e.config.disabled 整体短路，快捷键不进 rule
  era.printButton('不可用', 7, { disabled: true });
  era.printMultiColumns([
    { type: 'button', content: '迷宫', accelerator: 3 },
    { type: 'text', content: '｜' },
  ]);

  fixture.set_inputs(7); // disabled 的 7 不在集合里 → 抛错只列 3
  await assert.rejects(era.input(), /请输入以下值之一：3（/);

  fixture.set_inputs(3); // 多列按钮格的快捷键合法
  assert.equal(await era.input(), 3);
});

test('input 白名单：useRule:false 跳过校验；config.rule 走正则分支（文案同引擎）', async () => {
  const fixture = create_era_fixture();
  const { era } = fixture;

  era.printButton('按钮', 1);
  fixture.set_inputs(99);
  // 引擎 waitAnyKey 内部正是 input({any:true, useRule:false})——不设限
  assert.equal(await era.input({ useRule: false }), 99);

  // config.rule（字符串）把合法集合换成 RegExp（引擎 showInput），判据
  // 用原始字符串而非 Number
  fixture.set_inputs('abc');
  assert.equal(await era.input({ rule: '[a-z]+' }), 'abc');
  fixture.set_inputs(9);
  await assert.rejects(
    era.input({ rule: '[a-z]+' }),
    (err) =>
      err.message.includes('输入不合法！输入规范：[a-z]+') &&
      err.message.includes('era.input()'),
  );
});

// —— input 回传值的数值归一（#151/G6）：引擎把回包 val 过一遍 getNumber ——
//
// 引擎（app.asar 模块 183 的回传路径）逐字：`const i=y(n.val)`——归一发生
// 在 resolve 之前，引擎还会把归一后的值 print 出去（三段短路见上；golden
// 样本里光秃秃的 199/99 行就是回显）。getNumber（模块 65）：
//   getNumber(e){const t=Number(e);return isNaN(t)?e:t}
// 渲染层回包的 val 恒字符串，普通 input() 回给游戏的几乎总是数值——夹具
// 此前预置什么回什么，字符串预置与真机当场分岔（G6「未来一踩一个准」）。
// 归一在白名单校验之后：引擎渲染层校验的就是原始 val（#130 段）。下述
// 取值全部由文件尾的引擎门控用例（驱动真 getNumber）背书。
test('input 回传值过引擎 getNumber 归一（#151）：字符串预置回传数值，非数字串原样', async () => {
  const fixture = create_era_fixture();
  const { era } = fixture;

  // 正主：set_inputs('3') 后 result === 3 必须成立
  fixture.set_inputs('3');
  assert.equal(await era.input(), 3, '字符串预置的输入必须归一成数值');

  // Number('') === 0——最反直觉的一条，不是原样返回
  fixture.set_inputs('');
  assert.equal(await era.input(), 0, '空串的归宿是数值 0');
  // 非数字串走 NaN 分支原样返回，不得变成 NaN/undefined
  fixture.set_inputs('abc');
  assert.equal(await era.input(), 'abc', '非数字串原样返回');
  // 前后空白照样解析（Number('  3 ') === 3）
  fixture.set_inputs('  3 ');
  assert.equal(await era.input(), 3, '前后带空白的数字串照样解析');
  fixture.set_inputs('0');
  assert.equal(await era.input(), 0, '数字串 0 归一成数值 0');
  fixture.set_inputs('-5');
  assert.equal(await era.input(), -5, '负数串归一成负数');
  // 整串解析：部分数字的串不截断（parseInt('3abc') 是 3，分岔点）
  fixture.set_inputs('3abc');
  assert.equal(await era.input(), '3abc', '部分数字的串原样返回（整串解析）');
  // Number(null) === 0——引擎只看 Number() 的结果，不看输入类型
  fixture.set_inputs(null);
  assert.equal(await era.input(), 0, 'null 也过同一条归一');
  // 数字预置直通（既有用例形态不受扰）
  fixture.set_inputs(3);
  assert.equal(await era.input(), 3, '数字预置原样回传');
});

engine_test(
  '引擎 nextTurnInTrain：deltabase→base 带 maxbase 钳制、delta→palam、nowex→ex，逐键置 0 不删表（#163）',
  () => {
    const harness = create_next_turn_in_train();
    const { data } = harness;
    // 31 在训（tequip 建桶＝beginTrain 的入列时序）；0 有 delta 但不在训
    data.tequip = { 31: {} };
    // deltabase→base：maxbase>0 的键被钳到 [0, maxbase]，maxbase 缺失的键不钳
    data.base = { 31: { 0: 500, 1: 5, 2: 3 } };
    data.maxbase = { 31: { 0: 1000, 2: 100 } }; // 键 1 无上限
    data.deltabase = { 31: { 0: 700, 1: -10, 2: -50 } };
    data.source = { 31: { 7: 12 } };
    // delta→palam（手册曾误写 param——一字之差就是写错寻址族）
    data.palam = { 31: { 3: 100 } };
    data.delta = { 31: { 3: 40 }, 0: { 3: 999 } };
    // nowex→ex
    data.ex = { 31: { 2: 10 } };
    data.nowex = { 31: { 2: 5 } };

    assert.equal(harness.run(), undefined, '引擎无 return，恒 undefined');

    // deltabase→base：上界钳制、无上限不钳、下界钳到 0
    assert.equal(data.base[31][0], 1000, '500+700=1200 被 maxbase=1000 钳住');
    assert.equal(data.base[31][1], -5, 'maxbase 缺失（不 >0）不钳：5-10=-5');
    assert.equal(data.base[31][2], 0, '3-50=-47 被下界 0 钳住');
    // 不是清空表：键还在、值归 0（手册曾写「清空」）
    assert.deepEqual(data.deltabase[31], { 0: 0, 1: 0, 2: 0 });
    assert.equal(data.source[31][7], 0, 'source 逐键置 0');
    assert.ok('7' in data.source[31], '逐键置 0，表与键保留（非删表）');
    // delta→palam、nowex→ex
    assert.equal(data.palam[31][3], 140, 'delta 结算进 palam（非 param）');
    assert.equal(data.delta[31][3], 0);
    assert.equal(data.ex[31][2], 15);
    assert.equal(data.nowex[31][2], 0);
    // 只结算在训角色：0 不在 tequip，delta 原样保留
    assert.equal(data.delta[0][3], 999, '不在训的角色不被结算');
    assert.equal(data.palam[0], undefined);
  },
);
