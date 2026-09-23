/**
 * @file 批量处刑与自动处刑的行为测试（issue #543，阶段 6 S2）。
 *
 * 覆盖 魔改新增/處刑改寫.ERB 三函数的玩家可见契约：
 *   - @批量处刑（:3-417）：复选标签列表、收藏自动剃除、方法 0-7 的分支
 *     与守卫、水晶球开关、口上对处分方式（TFLAG:16）的改写、取消路径
 *     （TFLAG:16 = -1 → 整界面重启）；
 *   - @自動處刑（:419-433）：新人标签 × 顺从 × 收藏的三岔判定；
 *   - @自動處刑1（:435-498）：装备回收、除名、勋章与经验结算；
 *   - 两个入口接线：主菜单 [103]（page-shop.js 的 usershop）与
 *     @EVENTTURNEND 的 FLAG:5 位 3 开关（turnend-settle.js）。
 *
 * 随机源：处刑改写本体不掷随机；方法 0-3 的下游（BANISHMENT 等）要——
 * 一律传 seq([...]) 确定性随机源（#344 的教训）。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function seq(values) {
  let index = 0;
  return (n) => {
    const value = values[Math.min(index, values.length - 1)];
    index += 1;
    return Math.min(value, n - 1);
  };
}

/** 洗脑戒指的存储编号（识别号 15、强度 5；前缀 0 无附魔） */
const BRAINWASH_RING = 5 * 1000 + 15;

function seed_world(...chara_ids) {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  const names = {
    17: '村娘',
    31: '温妮',
    47: '艾达',
    52: '菲丽',
  };
  for (const cid of chara_ids) {
    fixture.seed_chara(cid, {
      id: cid,
      name: names[cid] ?? `角色${cid}`,
      callname: names[cid] ?? `角色${cid}`,
    });
    fixture.era.addCharacter(cid);
    fixture.store.set(`cflag:${cid}:9`, 4); // 等级 CFLAG:9（经验 = (4+1)*50）
    fixture.store.set(`cflag:${cid}:550`, -1);
    fixture.store.set(`cflag:${cid}:551`, -1);
    fixture.store.set(`cflag:${cid}:552`, -1);
  }
  return fixture;
}

function history_texts(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

function buttons(fixture) {
  return fixture.lines_history.filter((line) => line.type === 'button');
}

/** 载入被测模块（每个用例独立模块图，夹具负责清缓存） */
function load_batch(fixture) {
  return fixture.load_module('event/event-execution-batch');
}

test('批量处刑列表：过滤魔王与示众台，按条件展示标签与提醒行', async () => {
  const fixture = seed_world(31, 47, 52);
  fixture.store.set('cflag:47:1', 8); // 固定示众中 → 不列
  fixture.store.set('cflag:31:0', 1); // 出售资格 → [售]
  fixture.store.set('cflag:31:700', 1); // 收藏 → [☆]
  fixture.store.set('talent:31:254', 1); // 已士兵化 → [兵]
  fixture.store.set('talent:47:165', 1); // 村娘 A → [SP]（状态 8 仍不列出）
  fixture.store.set('cflag:31:777', 1); // 待处刑 → 【处刑认可】
  fixture.set_inputs(1999);
  const { batch_execution } = load_batch(fixture);

  await batch_execution(seq([0]));

  const texts = history_texts(fixture);
  assert(
    texts.some((line) =>
      line.includes('<60天以内再展出20名勇者到博物馆将解锁实绩！>'),
    ),
    'FLAG:84 < 20 且 DAY < 60 且无【造型王】时显示博物馆实绩提醒',
  );
  assert(
    texts.some((line) => line.includes('请选出处刑对象(可复选)')),
    '标题行',
  );
  const row = buttons(fixture).find((b) => b.accelerator === 31);
  assert.ok(row, '31 号列出且快捷键 = 角色 ID');
  assert.match(
    row.text,
    /\[售\].*\[☆\].*\[兵\].*【处刑认可】/,
    '标签顺序（[SP]/【处刑认可】的染色不复刻，见文件头）',
  );
  assert(
    buttons(fixture).some((b) => b.accelerator === 52),
    '状态 0 的 52 号照常列出',
  );
  assert(
    !buttons(fixture).some((b) => b.accelerator === 47),
    '状态 8（示众台）不列出',
  );
});

test('列表显示条件：状态、EX 素质与 EX_FLAG:9000 位 1 的七种组合', async () => {
  // 表驱动覆盖 listable（:33）与 print_roster 的跳过支：每行一个世界，
  // 只断言「31 号是否作为按钮列出」
  const cases = [
    { name: '状态 0', set: {}, listed: true },
    { name: '状态 7（苗床）', set: { 'cflag:31:1': 7 }, listed: true },
    { name: '状态 1（待机）', set: { 'cflag:31:1': 1 }, listed: false },
    { name: '状态 8（示众台）', set: { 'cflag:31:1': 8 }, listed: false },
    {
      name: 'EX_TALENT:1（特殊角色）',
      set: { 'ex_talent:31:1': 1 },
      listed: false,
    },
    {
      name: 'EX_TALENT:1 + 2 且位 1 未置',
      set: { 'ex_talent:31:1': 1, 'ex_talent:31:2': 1 },
      listed: false,
    },
    {
      name: 'EX_TALENT:1 + 2 且位 1 置位（MOD 打工开关位，#14）',
      set: {
        'ex_talent:31:1': 1,
        'ex_talent:31:2': 1,
        'exflag:9000': 2,
      },
      listed: true,
    },
  ];
  for (const item of cases) {
    const fixture = seed_world(31);
    for (const [address, value] of Object.entries(item.set)) {
      fixture.store.set(address, value);
    }
    fixture.set_inputs(1999);
    await load_batch(fixture).batch_execution(seq([0]));
    assert.equal(
      buttons(fixture).some((b) => b.accelerator === 31),
      item.listed,
      `${item.name}：${item.listed ? '应列出' : '不应列出'}`,
    );
  }
});
test('列表标签：[SP] 覆盖性格素质与 EX 素质两侧', async () => {
  const worlds = [
    { set: { 'talent:31:165': 1 }, expected: true },
    { set: { 'talent:31:171': 1 }, expected: true },
    { set: { 'talent:31:166': 1 }, expected: false }, // 恶女不在 @SP 名单
    { set: { 'ex_talent:31:104': 1 }, expected: true },
    { set: { 'ex_talent:31:4': 1 }, expected: true },
    { set: { 'ex_talent:31:105': 1 }, expected: false },
  ];
  for (const item of worlds) {
    const fixture = seed_world(31);
    for (const [address, value] of Object.entries(item.set)) {
      fixture.store.set(address, value);
    }
    fixture.set_inputs(1999);
    await load_batch(fixture).batch_execution(seq([0]));
    const row = buttons(fixture).find((b) => b.accelerator === 31);
    assert.equal(
      row.text.includes('[SP]'),
      item.expected,
      `${JSON.stringify(item.set)} 的 [SP] 判定`,
    );
  }
});

test('提醒行边界：DAY 59/60 与展品 19/20 两侧', async () => {
  const worlds = [
    { day: 0, exhibits: 0, expected: true },
    { day: 59, exhibits: 19, expected: true },
    { day: 60, exhibits: 0, expected: false },
    { day: 0, exhibits: 20, expected: false },
  ];
  for (const item of worlds) {
    const fixture = seed_world(31);
    fixture.load_module('era-utils/era-flag').day_count = item.day;
    fixture.store.set('flag:84', item.exhibits);
    fixture.set_inputs(1999);
    await load_batch(fixture).batch_execution(seq([0]));
    const shown = history_texts(fixture).some((line) =>
      line.includes('将解锁实绩'),
    );
    assert.equal(
      shown,
      item.expected,
      `DAY=${item.day}、展品=${item.exhibits} 的提醒行`,
    );
  }
});

test('批量处刑列表：【造型王】实绩达成后不再显示提醒行', async () => {
  const fixture = seed_world(31);
  fixture.store.set('talent:0:329', 1); // 【造型王】
  fixture.set_inputs(1999);
  const { batch_execution } = load_batch(fixture);

  await batch_execution(seq([0]));

  assert(
    !history_texts(fixture).some((line) => line.includes('将解锁实绩')),
    'TALENT:MASTER:329 置位后提醒行消失（處刑改寫.ERB:18 的第三条件）',
  );
});

test('复选标签：按钮切换 777 位，收藏目标被自动剃除并重启界面', async () => {
  const fixture = seed_world(31, 47, 52);
  fixture.store.set('cflag:47:700', 1); // 收藏
  fixture.store.set('cflag:47:777', 1); // 且被标了处刑标签
  // 52 号在示众台（状态 8）且同样「收藏 + 带标签」：扫描先按状态剃除，
  // 不播报、不清标签（:54-65 的扫描内）
  fixture.store.set('cflag:52:1', 8);
  fixture.store.set('cflag:52:700', 1);
  fixture.store.set('cflag:52:777', 1);
  fixture.set_inputs(31, 1999);
  const { batch_execution } = load_batch(fixture);

  await batch_execution(seq([0]));

  assert.equal(fixture.store.get('cflag:31:777'), 1, '31 号被标记');
  assert.equal(fixture.store.get('cflag:47:777'), 0, '收藏目标的标签被剃除');
  assert.equal(
    fixture.store.get('cflag:52:777'),
    1,
    '示众台角色的标签不动（状态 8 先剃除，扫描不看收藏）',
  );
  const texts = history_texts(fixture);
  assert(
    texts.some((line) =>
      line.includes('有 [☆]收藏 的目标被选中，自动剃除处刑标签'),
    ),
    '剃除前先播报（PRINTFORMW）',
  );
  assert.equal(
    texts.filter((line) => line.includes('请选出处刑对象(可复选)')).length,
    3,
    'JUMP 批量处刑 重启界面（首次 + 剃除重启 + 切换 31 后重绘）',
  );
});

test('[121] 选择处刑方式仅在存在可处刑目标时出现', async () => {
  const plain = seed_world(31);
  plain.set_inputs(1999);
  await load_batch(plain).batch_execution(seq([0]));
  assert(
    !buttons(plain).some((b) => b.accelerator === 121),
    '无标签目标时不出现 [121]',
  );

  const tagged = seed_world(31);
  tagged.store.set('cflag:31:777', 1);
  tagged.set_inputs(1999);
  await load_batch(tagged).batch_execution(seq([0]));
  assert(
    buttons(tagged).some((b) => b.accelerator === 121),
    '有非收藏标签目标时出现 [121]',
  );
});

test('翻页：[2000]/[2001] 的页首/页尾守卫（NUM_PAGE = 25）', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  for (let cid = 1; cid <= 30; cid += 1) {
    fixture.seed_chara(cid, {
      id: cid,
      name: `角色${cid}`,
      callname: `角色${cid}`,
    });
    fixture.era.addCharacter(cid);
  }
  // 第一页已含 1-25；先在页首按 [2000]（不得退到 -1 页），[2001] 进第二页
  // （26-30），页尾再按不再进
  fixture.set_inputs(2000, 2001, 2001, 1999);
  const { batch_execution } = load_batch(fixture);

  await batch_execution(seq([0]));

  // 首轮列表行数 = 页宽（NUM_PAGE = 25，:10）：25↔26 一类页宽改动
  // 单看「谁在第几页」看不出来（两页各画两轮，计数同构），必须钉行数
  const history = fixture.lines_history;
  const first_nav = history.findIndex(
    (line) => line.type === 'button' && line.accelerator === 2000,
  );
  assert.equal(
    history
      .slice(0, first_nav)
      .filter(
        (line) =>
          line.type === 'button' &&
          line.accelerator >= 1 &&
          line.accelerator <= 30,
      ).length,
    25,
    '首轮页宽 25（31 人的世界首轮只列 1-25 号）',
  );
  const page2_rows = buttons(fixture).filter((b) => b.accelerator === 26);
  assert.equal(
    page2_rows.length,
    2,
    '翻到第二页（两次 [2001]：第二次被页尾守卫拦下但仍重绘同一页）',
  );
  assert.equal(
    buttons(fixture).filter((b) => b.accelerator === 1).length,
    2,
    '第一页绘制两轮（首轮 + 页首按 [2000] 后重绘同一页，页号不得变成 -1）',
  );
});

test('方法 4 肉便器：扶她阴茎四支与魅力点五支各自播报', async () => {
  // 表驱动覆盖 :236-290 的两组分支。扶她支的前置是 TALENT:121 且
  // FLAG:83 >= 2——预置 1 让 +1 后过门
  const cases = [
    { set: { 'talent:31:121': 1, 'talent:31:318': 1 }, fragment: '扶她巨根的' },
    {
      set: { 'talent:31:121': 1, 'talent:31:318': 2 },
      fragment: '扶她短小包茎的',
    },
    { set: { 'talent:31:121': 1, 'talent:31:318': 3 }, fragment: '扶她包茎的' },
    {
      set: { 'talent:31:121': 1, 'talent:31:318': 0 },
      fragment: '积极地侵犯着其它肉便器',
    },
    { set: { 'talent:31:312': 12 }, fragment: '作为魅力点的美乳' },
    { set: { 'talent:31:312': 14 }, fragment: '作为魅力点的臀部曲线' },
    { set: { 'talent:31:312': 21 }, fragment: '作为魅力点的性器' },
    { set: { 'talent:31:312': 22 }, fragment: '作为魅力点的光泽的头发' },
    { set: { 'talent:31:312': 23 }, fragment: '作为魅力点的大屁股' },
  ];
  for (const item of cases) {
    const fixture = seed_world(31);
    fixture.store.set('flag:83', 1); // +1 后过「二人以上」门
    fixture.store.set('cflag:31:777', 1);
    for (const [address, value] of Object.entries(item.set)) {
      fixture.store.set(address, value);
    }
    fixture.set_inputs(121, 4, 1999);
    await load_batch(fixture).batch_execution(seq([0]));
    assert(
      history_texts(fixture).some((line) => line.includes(item.fragment)),
      `分支播报：${item.fragment}`,
    );
  }
});

test('方法 4 肉便器：素质条件句逐条触发，缺素质时一条都不出', async () => {
  const cases = [
    { address: 'talent:31:原种族', value: 1, fragment: '精灵族的' },
    { address: 'abl:31:32', value: 1, fragment: '作为精液便器' },
    { address: 'abl:31:22', value: 3, fragment: '作为女子便器' },
    { address: 'abl:31:21', value: 1, fragment: '腿间开始湿润' },
    { address: 'abl:31:17', value: 1, fragment: '展露痴态' },
    { address: 'abl:31:16', value: 1, fragment: '连自我都失去了' },
    { address: 'abl:31:2', value: 4, fragment: '私处完全扩张' },
    { address: 'abl:31:3', value: 4, fragment: '肛门，被极限扩张' },
    { address: 'talent:31:85', value: 1, fragment: '把所有的阴茎都幻想成' },
    { address: 'talent:31:232', value: 1, fragment: '哀求着打种' },
    { address: 'talent:31:233', value: 1, fragment: '肛门特别有感觉' },
    { address: 'talent:31:230', value: 1, fragment: '阴蒂又大又肿' },
    { address: 'talent:31:231', value: 1, fragment: '乳头被恶魔们改造过' },
    { address: 'talent:31:250', value: 1, fragment: '头部完全被头罩包裹' },
    { address: 'talent:31:242', value: 1, fragment: '被恶魔们强制肛交' },
    { address: 'talent:31:317', value: 11, fragment: '在重复着谁的名字' },
  ];
  for (const item of cases) {
    const fixture = seed_world(31);
    fixture.store.set('cflag:31:777', 1);
    fixture.store.set(item.address, item.value);
    fixture.set_inputs(121, 4, 1999);
    await load_batch(fixture).batch_execution(seq([0]));
    assert(
      history_texts(fixture).some((line) => line.includes(item.fragment)),
      `${item.address} 的播报：${item.fragment}`,
    );
  }
  // C 敏感段的扶她/男人支：TALENT:102 命中时按 121/122 分阴茎文案
  const futanari = seed_world(31);
  futanari.store.set('cflag:31:777', 1);
  futanari.store.set('talent:31:230', 1);
  futanari.store.set('talent:31:121', 1);
  futanari.set_inputs(121, 4, 1999);
  await load_batch(futanari).batch_execution(seq([0]));
  const futanari_texts = history_texts(futanari);
  assert(
    futanari_texts.some((line) => line.includes('阴茎膨胀了起来')),
    '扶她走阴茎文案（:246-252 的 TALENT:121/122 支）',
  );
  assert(
    !futanari_texts.some((line) => line.includes('阴蒂又大又肿')),
    '扶她不走阴蒂文案',
  );

  // 反面：什么都不置时上述条件句一条都不出
  const bare = seed_world(31);
  bare.store.set('cflag:31:777', 1);
  bare.set_inputs(121, 4, 1999);
  await load_batch(bare).batch_execution(seq([0]));
  for (const item of cases) {
    assert(
      !history_texts(bare).some((line) => line.includes(item.fragment)),
      `缺素质时不得出现：${item.fragment}`,
    );
  }
});
test('方法 4 做成肉便器：计数、威望、录像归档、除名与经验', async () => {
  const fixture = seed_world(31);
  fixture.store.set('cflag:31:551', 1002); // 装饰 → 应被回收
  fixture.store.set('exflag:9000', 4); // 水晶球记录 ON（位 2）
  fixture.store.set('cflag:31:777', 1);
  fixture.set_inputs(121, 4, 1999);
  const { batch_execution } = load_batch(fixture);

  await batch_execution(seq([0]));

  assert.equal(fixture.store.get('flag:83'), 1, 'FLAG:83 肉便器数 +1');
  assert.equal(
    fixture.store.get('exflag:99'),
    2,
    '非精英无特殊 EX 素质 → 威望 +2',
  );
  assert.equal(
    fixture.store.get('videoarchive:31'),
    '肉便器温妮',
    'SUISEI_STR:A 归档末路标题（:303）',
  );
  assert.equal(fixture.store.get('tstr:30'), '', 'VIDEO_MATURO 消费 TSTR:30');
  assert.equal(
    fixture.store.get('videoarchive:0'),
    '肉便器温妮',
    '开水晶球时 TSTR:30 的标题真的入架（VIDEO_MATURO 读的是它，:303）',
  );
  assert.equal(
    fixture.store.get('exflag:9010'),
    1,
    '非精英非 EX_TALENT:2 → 水晶球储存数 +1',
  );
  assert.equal(fixture.store.get('item:302'), 1, '装饰回收进道具栏');
  assert.equal(fixture.store.get('cflag:31:551'), -1, '装饰槽清空');
  assert.deepEqual(fixture.era.getAddedCharacters(), [0], '角色被除名');
  assert.equal(fixture.store.get('flag:230'), 1, 'FLAG:(NO+199) 处刑済');
  assert.equal(fixture.store.get('flag:80'), 1, 'FLAG:80 处刑勇者数 +1');
  assert.equal(fixture.store.get('exp:0:80'), 250, '经验 = (LV+1)*50');
  assert.equal(fixture.store.get('exp:0:81') ?? 0, 0, '批量肉便器不给勋章经验');
  assert(
    history_texts(fixture).some((line) =>
      line.includes('《封印吸收了力量，使你获得了250的经验值！》'),
    ),
    '批量路径的经验播报（区别于迷你处刑文案）',
  );
  assert(
    history_texts(fixture).some((line) => line.includes('现在的肉便器数量：1')),
    '肉便器计数播报',
  );
});

test('方法 5 士兵化：战力减半、刻印与称号，不除名；受限目标逐个播报跳过', async () => {
  // NO ∈ [17,40] 的角色不受洗脑（#348 起 cid ≙ NO），17 号受限、47/52 可执行
  const fixture = seed_world(17, 47, 52);
  fixture.store.set('cflag:17:777', 1);
  fixture.store.set('cflag:47:777', 1);
  fixture.store.set('cflag:52:777', 1);
  fixture.store.set('cflag:47:13', 100); // 基础攻击
  fixture.store.set('cflag:47:14', 80); // 基础防御
  fixture.store.set('exflag:9000', 4); // 水晶球记录 ON（位 2）
  fixture.set_inputs(121, 5, 1999);
  const { batch_execution } = load_batch(fixture);

  await batch_execution(seq([0]));

  const name = '艾达';
  assert.equal(fixture.store.get('talent:47:254'), 1, '魔之刻印');
  assert.equal(fixture.store.get('cflag:47:13'), 50, '攻击减半（整数除法）');
  assert.equal(fixture.store.get('cflag:47:14'), 40, '防御减半');
  assert.equal(
    fixture.store.get('cflag:47:777'),
    1,
    '士兵化不清处刑标签（原作如此）',
  );
  assert.equal(fixture.store.get('cstr:47:30'), `魔王傀儡${name}`);
  assert.equal(fixture.store.get('tstr:30'), '', 'VIDEO_MATURO2 消费 TSTR:30');
  assert.equal(fixture.store.get('videoarchive:47'), `魔王傀儡${name}`);
  assert.equal(
    fixture.store.get('videoarchive:0'),
    `魔王傀儡${name}`,
    '开水晶球时 TSTR:30 的称号入架（VIDEO_MATURO2 读的是它）',
  );
  assert.deepEqual(
    fixture.era.getAddedCharacters(),
    [0, 17, 47, 52],
    '士兵化不除名',
  );
  assert.equal(
    fixture.store.get('flag:246') ?? 0,
    0,
    '无 FLAG:(NO+199) 处刑済',
  );
  assert.equal(fixture.store.get('flag:80') ?? 0, 0, '不计处刑勇者数');
  const texts = history_texts(fixture);
  assert(
    texts.some((line) => line.includes('攻击变成50，防御变成40')),
    '战力变化播报带具体数值',
  );
  assert(
    texts.some((line) => line.includes('可以于迎击名单中派遣出场了')),
    '士兵化完成播报',
  );
  // 三轮扫描：17 号每轮都提示不受洗脑；47/52 士兵化后各再提示一次
  assert.equal(
    texts.filter((line) => line.includes('拥有【不受洗脑】')).length,
    3,
    '17 号在每轮扫描都播报（原作每轮重扫都提示）',
  );
  assert.equal(
    texts.filter((line) => line.includes('已经士兵化了')).length,
    3,
    '47 号提示两次（第 2/3 轮）＋52 号提示一次（第 3 轮）',
  );
});

test('方法 6 固定示众：状态切 8、公厕称号，不除名', async () => {
  const fixture = seed_world(31);
  fixture.store.set('talent:31:76', 1); // 淫乱 → 第二支播报
  fixture.store.set('cflag:31:777', 1);
  fixture.store.set('exflag:9000', 4); // 水晶球记录 ON（位 2）
  fixture.set_inputs(121, 6, 1999);
  const { batch_execution } = load_batch(fixture);

  await batch_execution(seq([0]));

  assert.equal(fixture.store.get('cflag:31:1'), 8, 'CFLAG:1 = 8（示众台）');
  assert.equal(fixture.store.get('cstr:31:30'), '魔族公厕温妮');
  assert.equal(fixture.store.get('videoarchive:31'), '魔族公厕温妮');
  assert.equal(
    fixture.store.get('videoarchive:0'),
    '魔族公厕温妮',
    '开水晶球时 TSTR:30 的称号入架（VIDEO_MATURO2 读的是它）',
  );
  assert.deepEqual(fixture.era.getAddedCharacters(), [0, 31], '不除名');
  assert(
    history_texts(fixture).some((line) =>
      line.includes('不如说，正在享受现在的样子'),
    ),
    '淫乱素质的示众播报分支',
  );
});

test('方法 7 释放：没收所持金、复位状态、夹持善恶与好感并清标签', async () => {
  const fixture = seed_world(31, 47);
  fixture.store.set('cflag:31:580', 500); // 所持金
  fixture.store.set('cflag:31:151', -80); // 善恶值（<-50 → 夹回）
  fixture.store.set('cflag:31:2', 50); // 好感度（>20 → 夹回）
  fixture.store.set('cflag:47:580', 0);
  fixture.store.set('cflag:47:151', -30); // 不触发夹持
  fixture.store.set('cflag:47:2', 10);
  fixture.set_inputs(31, 47, 121, 7, 1999);
  const { batch_execution } = load_batch(fixture);

  await batch_execution(seq([0]));

  assert.equal(fixture.store.get('flag:10004'), 500, 'MONEY += 没收金');
  assert.equal(
    fixture.store.get('exflag:4444'),
    500,
    'EX_FLAG:4444 同步（反作弊不变量）',
  );
  assert.equal(fixture.store.get('cflag:31:580'), 0);
  assert.equal(fixture.store.get('cflag:31:1'), 2, 'CFLAG:1 = 2（重新冒险）');
  assert.equal(fixture.store.get('cflag:31:501'), 1, '侵入阶层复位');
  assert.equal(fixture.store.get('cflag:31:502'), 0, '侵攻度复位');
  assert.equal(fixture.store.get('cflag:31:508'), 3, '再起点 = 3');
  assert.equal(fixture.store.get('cflag:31:151'), -50, '善恶值下限 -50');
  assert.equal(fixture.store.get('cflag:31:2'), 20, '好感度上限 20');
  assert.equal(fixture.store.get('cflag:31:777'), 0, '处刑标签清除');
  assert.equal(fixture.store.get('cflag:47:151'), -30, '范围内不动');
  assert.equal(fixture.store.get('cflag:47:2'), 10, '范围内不动');
  assert.deepEqual(fixture.era.getAddedCharacters(), [0, 31, 47], '不除名');
  assert(
    history_texts(fixture).some((line) =>
      line.includes('身上500的金钱掏空之后，并清除所有地下城的记忆丢出去了'),
    ),
    '没收金额在播报里展开',
  );
});

test('方法 1/2/3 分发：公开处刑 / 博物馆 / 猎奇处刑各自完成处置', async () => {
  // 表驱动覆盖 execute_one 的三个下游分支；每个下游各吃一次自身输入
  const cases = [
    { method: 1, inner: 2, intro: '你把温妮公开处刑了。' },
    { method: 2, inner: 0, intro: '温妮被带到了工作室……' },
    { method: 3, inner: 5, intro: '你决定让温妮品尝真正的痛苦…' },
  ];
  for (const item of cases) {
    const fixture = seed_world(31);
    fixture.store.set('cflag:31:777', 1);
    fixture.set_inputs(121, item.method, item.inner, 1999);
    await load_batch(fixture).batch_execution(seq([0, 0, 0, 0, 0]));
    assert.deepEqual(
      fixture.era.getAddedCharacters(),
      [0],
      `方法 ${item.method} 必须完成处置（角色除名）`,
    );
    assert.equal(
      fixture.store.get('flag:230'),
      1,
      `方法 ${item.method} 走公共结算（FLAG:(NO+199)）`,
    );
    assert(
      history_texts(fixture).some((line) => line.includes(item.intro)),
      `方法 ${item.method} 的开场播报`,
    );
  }
});

test('方法 0 流放：透传随机源，取消输入让整界面重启（TFLAG:16 = -1）', async () => {
  const fixture = seed_world(31);
  fixture.set_inputs(31, 121, 0, 100, 1999);
  const { batch_execution } = load_batch(fixture);

  await batch_execution(seq([0, 0]));

  assert.deepEqual(fixture.era.getAddedCharacters(), [0, 31], '取消流放不除名');
  assert.equal(fixture.store.get('cflag:31:777'), 1, '标签保留');
  assert.equal(
    history_texts(fixture).filter((line) =>
      line.includes('请选出处刑对象(可复选)'),
    ).length,
    3,
    'BANISHMENT 的取消 JUMP 回批量处刑：界面整重启（:43 的等价物）',
  );
});

test('方法 0 流放：确认后角色被处刑除名', async () => {
  const fixture = seed_world(31, 47);
  fixture.store.set('cflag:31:777', 1);
  fixture.store.set('cflag:47:777', 1);
  fixture.set_inputs(121, 0, 0, 0, 1999);
  const { batch_execution } = load_batch(fixture);

  await batch_execution(seq([0, 0, 0, 0, 0, 0, 0, 0]));

  assert.deepEqual(
    fixture.era.getAddedCharacters(),
    [0],
    '两个标签目标在同一次批量处刑里先后处理',
  );
  assert(
    history_texts(fixture).some((line) =>
      line.includes('你把温妮从地下城里永久驱逐了'),
    ),
    '流放开场播报用实际主角名',
  );
});

test('口上可改写处分方式：批量循环按改写值分发', async () => {
  // 47 号（NO 47 在 17-40 段外——31 号走方法 5 会先被「不受洗脑」守卫拦下）
  const fixture = seed_world(47);
  fixture.store.set('talent:47:163', 1); // 高贵性格 → K3 处刑口上
  // 输入 5（士兵化）而口上改写为 7（释放）：两个结果的落点不同，能区分
  // 「按改写值分发」与「按输入值分发」
  fixture.set_inputs(47, 121, 5, 1999);
  const { batch_execution } = load_batch(fixture);
  const { exucution_koujo_family } = fixture.load_module('kojo/kojo-system');
  exucution_koujo_family.register(3, async () => {
    fixture.store.set('tflag:16', 7); // 口上把处分改写为「释放」
    return 0;
  });

  await batch_execution(seq([0]));

  assert.equal(
    fixture.store.get('cflag:47:1'),
    2,
    '按改写后的 7 号（释放）分发（若按输入值 5 走，状态不会被置 2）',
  );
  assert.equal(
    fixture.store.get('talent:47:254') ?? 0,
    0,
    '没有走士兵化（5 号）',
  );
  assert.equal(fixture.store.get('cflag:47:777'), 0, '释放清标签');
});

test('[101] 水晶球记录：开关位翻转并重绘方法界面', async () => {
  const fixture = seed_world(31);
  fixture.store.set('cflag:31:777', 1);
  fixture.set_inputs(121, 101, 100, 1999);
  const { batch_execution } = load_batch(fixture);

  await batch_execution(seq([0]));
  const bits = fixture.store.get('exflag:9000') ?? 0;
  assert.notEqual(
    bits & 4,
    0,
    'EX_FLAG:9000 位 2 翻转（与打工开关共用字，#14）',
  );
  const switch_buttons = buttons(fixture).filter((b) => b.accelerator === 101);
  assert.deepEqual(
    switch_buttons.map((b) => b.text),
    ['水晶球记录：关', '水晶球记录：开'],
    '翻转前「关」、INVERTBIT 后重绘为「开」',
  );
});

test('自動處刑1：装备回收、除名、威望、勋章与经验、称呼重建', async () => {
  const fixture = seed_world(31, 47);
  fixture.store.set('cflag:31:550', 1001);
  fixture.store.set('callname:47:-2', '旧称呼'); // 在场角色的称呼偏差
  const { auto_execution_one } = load_batch(fixture);

  await auto_execution_one(31);

  assert.deepEqual(fixture.era.getAddedCharacters(), [0, 47]);
  assert.equal(fixture.store.get('item:301'), 1, '武装回收');
  assert.equal(fixture.store.get('cflag:31:550'), -1);
  assert.equal(fixture.store.get('flag:230'), 1);
  assert.equal(fixture.store.get('flag:80'), 1);
  assert.equal(fixture.store.get('exp:0:80'), 250);
  assert.equal(fixture.store.get('exp:0:81'), 1, '勋章经验 +1');
  assert.equal(fixture.store.get('exflag:99'), 2);
  assert.equal(
    fixture.store.get('callname:47:-2'),
    '艾达',
    '自動處刑1 调用 NAME_RESET（:477）——在场角色称呼被重建（与 EXECUTION_MINI 的差异）',
  );
  assert(
    history_texts(fixture).some((line) =>
      line.includes('《封印吸收了力量，使你获得了250的经验值！》'),
    ),
    '经验播报文案（:485）',
  );
});
test('自動處刑：新人×顺从×收藏三岔，逐个处刑并重复求饶播报', async () => {
  const fixture = seed_world(31, 47, 52, 60);
  // 31：处刑（新人、顺从 1、无收藏）
  fixture.store.set('cflag:31:506', 1);
  fixture.store.set('abl:31:10', 1);
  // 47：收藏豁免（新人、有收藏 → 求饶播报）
  fixture.store.set('cflag:47:506', 1);
  fixture.store.set('cflag:47:700', 1);
  // 52：顺从 ≥ 2 → 静默保留
  fixture.store.set('cflag:52:506', 1);
  fixture.store.set('abl:52:10', 2);
  // 60：非新人（506 = 0）→ 无论顺从与收藏都不进任何一支
  fixture.store.set('abl:60:10', 0);
  const { auto_execution } = load_batch(fixture);

  await auto_execution();

  assert.deepEqual(
    fixture.era.getAddedCharacters(),
    [0, 47, 52, 60],
    '只有 31 号被处刑',
  );
  assert.equal(fixture.store.get('exp:0:81'), 1, '勋章经验 +1');
  assert.equal(fixture.store.get('flag:80'), 1);
  const texts = history_texts(fixture);
  assert(
    texts.some((line) => line.includes('艾达拼命地求饶，向魔王宣誓效忠')),
    '收藏豁免的求饶播报',
  );
  assert(
    texts.some((line) => line.includes('摇尾乞怜的艾达，暂且被免除处刑了')),
    '豁免结论播报',
  );
  assert.equal(
    texts.filter((line) => line.includes('拼命地求饶')).length,
    1,
    '31 号先被处刑（扫描顺序在前），重扫后 47 号的求饶播报出现一次',
  );
  assert(!texts.some((line) => line.includes('菲丽')), '顺从 ≥ 2 无任何播报');
  assert(
    !texts.some((line) => line.includes('角色60')),
    '非新人（506 = 0）不进任何一支，无播报',
  );
});

test('自動處刑：多个目标一次过天全部处刑（稳定 ID 重扫）', async () => {
  const fixture = seed_world(31, 47);
  for (const cid of [31, 47]) {
    fixture.store.set(`cflag:${cid}:506`, 1);
    fixture.store.set(`abl:${cid}:10`, 1);
  }
  const { auto_execution } = load_batch(fixture);

  await auto_execution();

  assert.deepEqual(fixture.era.getAddedCharacters(), [0]);
  assert.equal(fixture.store.get('exp:0:81'), 2);
  assert.equal(fixture.store.get('flag:80'), 2);
});

test('方法 6 固定示众：三支示众文案按素质选择', async () => {
  // :323-329 的 IF/ELSEIF/ELSE 三支：TALENT:9（崩坏）→ TALENT:76（淫乱）→
  // 缺省。三分支分别造世界，缺省支什么都不置（只置处刑标签）
  const cases = [
    { set: { 'talent:31:9': 1 }, fragment: '被玩坏了的奴隶' },
    { set: { 'talent:31:76': 1 }, fragment: '淫乱的奴隶，不如说' },
    { set: {}, fragment: '悲哀的奴隶，对今后将发生的制裁害怕极了。' },
  ];
  for (const item of cases) {
    const fixture = seed_world(31);
    fixture.store.set('cflag:31:777', 1);
    for (const [address, value] of Object.entries(item.set)) {
      fixture.store.set(address, value);
    }
    fixture.set_inputs(121, 6, 1999);
    await load_batch(fixture).batch_execution(seq([0]));
    assert(
      history_texts(fixture).some((line) => line.includes(item.fragment)),
      `示众文案分支：${item.fragment}`,
    );
  }
});

test('方法界面：[0]-[7] 八个处刑方式与 [100] 的按钮文案', async () => {
  const fixture = seed_world(31);
  fixture.store.set('cflag:31:777', 1);
  fixture.set_inputs(121, 100, 1999);
  const { batch_execution } = load_batch(fixture);

  await batch_execution(seq([0]));

  const methods = buttons(fixture).filter((b) => b.accelerator <= 8);
  assert.deepEqual(
    methods.map((b) => [b.accelerator, b.text]),
    [
      [0, '流放出地下城'],
      [1, '公开处刑'],
      [2, '博物馆展品'],
      [3, '施行猎奇向处刑'],
      [4, '做成肉便器'],
      [5, '士兵化：让不可迎击的奴隶变成可迎击'],
      [6, '固定示众：将奴隶绑在示众台上，任怪物凌辱'],
      [7, '消除记忆后释放：此项可没收此奴隶身上所有的现金'],
    ],
    '八个处刑方式按钮的编号（原作 CASE 0 TO 7）与文案逐条对齐',
  );
  const stop = buttons(fixture).find((b) => b.accelerator === 100);
  assert.equal(stop.text, '停止', '[100] 停止（原作 :108）');
  for (const [acc, text] of [
    [2000, '上一页'],
    [1999, '结束处刑'],
    [2001, '下一页'],
  ]) {
    assert.equal(
      buttons(fixture).find((b) => b.accelerator === acc).text,
      text,
      `[${acc}] 的按钮文案（原作 :70-72）`,
    );
  }
  assert(
    history_texts(fixture).some((line) =>
      line.includes('开启水晶球的话，则可记录0～6项的处刑影像'),
    ),
    '方法界面说明行（:97）',
  );
});

test('下一页守卫：页宽整数倍（50 人）时把窗口推到空页', async () => {
  // 原作 :82 的判据是 (NO_PAGE+1)*NUM_PAGE <= CHARANUM（含等号）：50 人的
  // 世界在第 2 页再按 [2001] 会翻到没有行的第 3 页（`<` 会停在第 2 页）
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  for (let cid = 1; cid <= 49; cid += 1) {
    fixture.seed_chara(cid, {
      id: cid,
      name: `角色${cid}`,
      callname: `角色${cid}`,
    });
    fixture.era.addCharacter(cid);
  }
  fixture.set_inputs(2001, 2001, 1999);
  const { batch_execution } = load_batch(fixture);

  await batch_execution(seq([0]));

  assert.equal(
    buttons(fixture).filter((b) => b.accelerator === 26).length,
    1,
    '页宽整数倍（50 人）时 [2001] 翻到空页（原作 :82 的 <= 判据）',
  );
});

test('方法 4 肉便器：有家族对手时把末路标题写进 CSTR:<家族>:5', async () => {
  // TALENT:165（村娘 A）与 TALENT:171（村娘 B）不走压缩家族照，search_family
  // 直接互找；31 号（温妮，165）与 47 号（艾达，171）构成一对
  const pair = seed_world(31, 47);
  pair.store.set('talent:31:165', 1);
  pair.store.set('talent:47:171', 1);
  pair.store.set('cflag:31:777', 1);
  pair.set_inputs(121, 4, 1999);
  await load_batch(pair).batch_execution(seq([0]));
  assert.equal(
    pair.store.get('cstr:47:5'),
    '肉便器温妮',
    '家族档归档（:300-301：CSTR:(FAMILY:2):5）',
  );

  // 反照：没有家族对手时 family_id = -1，家族槽不动
  const lone = seed_world(31);
  lone.store.set('cflag:31:777', 1);
  lone.set_inputs(121, 4, 1999);
  await load_batch(lone).batch_execution(seq([0]));
  assert.equal(
    lone.store.get('cstr:31:5') ?? '',
    '',
    '无家族对手时不写 CSTR（:300 的 SIF FAMILY:2 >= 0）',
  );
});

test('翻页位置是函数静态变量：重启与再次进入处刑都保留当前页', async () => {
  // 原作 #DIM NO_PAGE = 0（:8）是静态变量；JUMP 批量处刑 只重执行 :11-14，
  // 其中只显式重置 处刑中/可处刑/TFLAG:16（技能指南「静态变量」：函数退出
  // 之后值不会被重置，需要重置的要在函数开头显式初始化）
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  for (let cid = 1; cid <= 30; cid += 1) {
    fixture.seed_chara(cid, {
      id: cid,
      name: `角色${cid}`,
      callname: `角色${cid}`,
    });
    fixture.era.addCharacter(cid);
  }
  const { batch_execution } = load_batch(fixture);

  // 第 2 页（26-30）上标记 30 号 → [121] 走方法 0 → BANISHMENT 里取消
  // （TFLAG:16 = -1）→ 整界面重启（原作 JUMP 批量处刑）
  fixture.set_inputs(2001, 30, 121, 0, 100, 1999);
  await batch_execution(seq([0, 0]));
  // 名册行按「角色<ID> + 空格」认：方法界面的 [0]-[7] 也有 1 号快捷键
  const rows = (id) =>
    buttons(fixture).filter(
      (b) => b.accelerator === id && b.text.startsWith(`角色${id} `),
    );
  assert.equal(
    rows(30).length,
    3,
    '重启（取消流放）后仍在第 2 页：26-30 号画三次（翻页、标记后、重启后）',
  );
  assert.equal(rows(1).length, 1, '第 1 页只在开场画过一次');

  // 再次进入处刑：首屏仍是第 2 页（静态变量跨调用保留，原作无重置点）
  fixture.set_inputs(1999);
  await batch_execution(seq([0]));
  assert.equal(
    rows(30).length,
    4,
    '再次进入处刑保留上次的页（静态变量，原作 :8）',
  );
  assert.equal(rows(1).length, 1, '再次进入不会退回第 1 页');
});

test('[121] 的可见性是函数静态变量：清标签后仍保留到整界面重启', async () => {
  // 原作 #DIM 可处刑（:7）是静态变量：只在进入函数（:13）与 JUMP 批量处刑
  // （重执行 :11-14）时清零；GOTO 处刑介面（翻页、标签切换、[101] 重绘）
  // 不清零——本次调用中一旦有角色带过标签，[121] 就一直在
  const fixture = seed_world(31);
  fixture.set_inputs(31, 31, 1999); // 打标签 → 取消标签 → 结束
  const { batch_execution } = load_batch(fixture);

  await batch_execution(seq([0]));

  assert.equal(
    buttons(fixture).filter((b) => b.accelerator === 121).length,
    2,
    '[121] 出现两次（标记后一次、取消标记后重绘仍显示一次——静态变量不清零）',
  );
});

test('[121] 后的空行数与原作一致（PRINTLC 不换行：:68 收行、:69 空行）', async () => {
  // 显示 [121] 时：printButton 自成一行（等价 :67+:68），按钮后只有 :69 的
  // 一个空行；不显示 [121] 时 :68/:69 两个 PRINTL 都落成空行
  const shown = seed_world(31);
  shown.store.set('cflag:31:777', 1);
  shown.set_inputs(1999);
  await load_batch(shown).batch_execution(seq([0]));
  const shown_rows = shown.lines_history;
  const shown_index = shown_rows.findIndex(
    (line) => line.type === 'button' && line.accelerator === 121,
  );
  assert(shown_index >= 0, '[121] 已打印');
  assert.deepEqual(
    [shown_rows[shown_index + 1].type, shown_rows[shown_index + 2].accelerator],
    ['br', 2000],
    '[121] 之后只有 :69 一个空行，再下一条是 [2000] 上一页',
  );

  const hidden = seed_world(31);
  hidden.set_inputs(1999);
  await load_batch(hidden).batch_execution(seq([0]));
  const hidden_rows = hidden.lines_history;
  const hidden_index = hidden_rows.findIndex(
    (line) => line.type === 'button' && line.accelerator === 2000,
  );
  assert(hidden_index >= 2, '[2000] 已打印');
  assert.deepEqual(
    [hidden_rows[hidden_index - 2].type, hidden_rows[hidden_index - 1].type],
    ['br', 'br'],
    '没有 [121] 时是 :68/:69 两个空行',
  );
});

test('可处刑每次进入函数复位：清标签结束、再进入时 [121] 不显示', async () => {
  const fixture = seed_world(31);
  fixture.set_inputs(31, 31, 1999); // 打标签 → 取消标签 → 结束
  const { batch_execution } = load_batch(fixture);
  const count_121 = () =>
    buttons(fixture).filter((b) => b.accelerator === 121).length;

  await batch_execution(seq([0]));
  const first_round = count_121();
  assert(first_round > 0, '第一次调用里标记过目标，[121] 出现过');

  fixture.set_inputs(1999); // 再次进入处刑：此时没有任何标签
  await batch_execution(seq([0]));
  assert.equal(
    count_121(),
    first_round,
    '再次进入时 可处刑 已复位（:13），不再显示 [121]',
  );
});

test('分隔线：顶部不画 CUSTOMDRAWLINE 线，普通 DRAWLINE 用默认线型', async () => {
  // 原作 :11 的 `CUSTOMDRAWLINE =` 只画一条线，随即被 :16 的
  // `CLEARLINE LINECOUNT` 清掉；:21/:24/:53 是普通 DRAWLINE（默认线型）
  const fixture = seed_world(31);
  fixture.set_inputs(1999);
  const { batch_execution } = load_batch(fixture);

  await batch_execution(seq([0]));

  const dividers = fixture.lines_history.filter(
    (line) => line.type === 'divider',
  );
  assert.notEqual(
    fixture.lines_history[0]?.type,
    'divider',
    '顶部不再多画 :11 的 CUSTOMDRAWLINE 线',
  );
  assert.equal(dividers.length, 3, '名单屏三条普通分隔线（:21/:24/:53）');
  assert(
    dividers.every((line) => line.border === 'dashed'),
    '普通 DRAWLINE 用默认线型（isSolid 只对 CUSTOMDRAWLINE = 那一类，本屏不镜像）',
  );
});

test('列表行的等级带冒号（原作 :34 的 LV:{CFLAG:COUNT:9}）', async () => {
  const fixture = seed_world(31);
  fixture.set_inputs(1999);
  const { batch_execution } = load_batch(fixture);

  await batch_execution(seq([0]));

  const row = buttons(fixture).find((b) => b.accelerator === 31);
  assert.match(
    row.text,
    /LV:4$/,
    '等级前缀是「LV:」——page-select-target 没有冒号是它自己原文如此，不是先例',
  );
});

test('方法 4 正文的等待后缀与原作一致（W 才等；夹具观测不到，按源文锁）', async () => {
  // 夹具的 printAndWait 内部等待不入 waits（test/fixture.test.js 的既定裁定），
  // W/L 之别在行为层不可观测——同 test/kojo-text-fidelity.test.js 的 B 锁取法，
  // 按「ERB 行后缀 ↔ JS 调用」逐条核对
  const batch_src = fs.readFileSync(
    path.resolve(__dirname, '..', 'ere', 'event', 'event-execution-batch.js'),
    'utf8',
  );
  const erb = fs
    .readFileSync(
      path.resolve(
        __dirname,
        '..',
        'target',
        'ERB',
        '魔改新增',
        '處刑改寫.ERB',
      ),
      'utf8',
    )
    .split(/\r?\n/);
  // 原作：:206 PRINTFORM / :207-208 PRINTFORML / :209 PRINTL 都不等待，
  // :210 PRINTW 等待；:299 PRINTFORMW 等待
  assert.match(
    erb[205],
    /^\s*PRINTFORM 深爱着你的/,
    ':206 是 PRINTFORM（不等待）',
  );
  assert.match(
    erb[209],
    /^\s*PRINTW 今后别说重新当勇者/,
    ':210 是 PRINTW（等待）',
  );
  assert.match(
    erb[298],
    /^\s*PRINTFORMW 现在的肉便器数量/,
    ':299 是 PRINTFORMW（等待）',
  );
  for (const re of [
    /era\.print\(\s*`\$\{prelude\}但\$\{chara_callname\(0\)\}依然给/, // :206-207
    /era\.print\(\s*`被吸收了全部力量的\$\{she\(cid\)\}，身体变成淫靡的肉块了。`/, // :208
    /era\.print\('作为地下城里怪物的慰问品被使用着，'\)/, // :209
  ]) {
    assert.match(batch_src, re, `不等待的原作行必须用裸 era.print：${re}`);
  }
  assert.match(
    batch_src,
    /await era\.printAndWait\('今后别说重新当勇者，就连看一眼阳光也不可能了吧。'\)/,
    ':210 PRINTW 必须用 printAndWait',
  );
  assert.match(
    batch_src,
    /await era\.printAndWait\(`现在的肉便器数量：\$\{game\.invasion\.肉便器数\}`\)/,
    ':299 PRINTFORMW 必须用 printAndWait',
  );
});

test('主菜单 [103]：usershop 接通批量处刑真身', async () => {
  const fixture = seed_world(31);
  // 商店轮入口状态（BOUGHT = -1；bought 缺省 0 会吞掉全部输入，见
  // page-shop.test.js 的 create_shop_fixture 说明）
  fixture.load_module('era-utils/era-flag').bought = -1;
  const { usershop } = fixture.load_module('page/page-shop');
  fixture.set_inputs(1999);

  await usershop(103);

  const texts = history_texts(fixture);
  assert(
    texts.some((line) => line.includes('请选出处刑对象(可复选)')),
    '103 分支进入批量处刑界面',
  );
  assert(!texts.some((line) => line.includes('@批量处刑')), '不再打存根占位');
});

test('EVENTTURNEND 接线：FLAG:5 位 3 开启时洗脑陷落的勇者被自动处刑', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  fixture.seed_chara(31, { id: 31, name: '温妮', callname: '温妮' });
  fixture.era.addCharacter(31);
  fixture.store.set('cflag:31:1', 2); // 侵攻中 → 洗脑戒指可陷落
  fixture.store.set('cflag:31:551', BRAINWASH_RING);
  fixture.store.set('flag:502', 1); // 2D 模式：撤退路径确定
  fixture.store.set('base:31:0', 100);
  fixture.store.set('maxbase:31:0', 1000); // HP 10% → 必撤退且保持侵攻中
  fixture.store.set('base:31:1', 1000);
  fixture.store.set('maxbase:31:1', 1000);
  fixture.store.set('flag:5', 8); // 勇者自动处刑 ON
  // 金钱不变量（@DEBUG_CHECK 的判据，见 event-turnend.test.js 的 setup 说明）
  fixture.store.set('flag:10004', 10000);
  fixture.store.set('exflag:4444', 1234);
  fixture.load_module('event/event-turnend');
  fixture.load_module('system/turnend-settle');
  fixture.load_module('event/event-turnend-later');
  const { emit } = fixture.load_module('system/event/registry');
  fixture.disable_enter_enemy();
  fixture.override_math_random(() => 0.5);
  try {
    await emit('EVENTTURNEND');
  } finally {
    fixture.restore_math_random();
  }

  assert.deepEqual(
    fixture.era.getAddedCharacters(),
    [0],
    '洗脑陷落的温妮在同一次回合结算里被自动处刑',
  );
  assert.equal(fixture.store.get('exp:0:81'), 1);
  const texts = history_texts(fixture);
  assert(
    texts.some((line) => line.includes('给温妮刻下了封印所有力量的烙印')),
    '自動處刑1 的开场播报出现在回合结算输出里',
  );
});

test('EVENTTURNEND 接线：开关关闭时不处刑', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  fixture.seed_chara(31, { id: 31, name: '温妮', callname: '温妮' });
  fixture.era.addCharacter(31);
  fixture.store.set('cflag:31:1', 2);
  fixture.store.set('cflag:31:551', BRAINWASH_RING);
  fixture.store.set('flag:502', 1);
  fixture.store.set('base:31:0', 100);
  fixture.store.set('maxbase:31:0', 1000);
  fixture.store.set('base:31:1', 1000);
  fixture.store.set('maxbase:31:1', 1000);
  fixture.store.set('flag:10004', 10000);
  fixture.store.set('exflag:4444', 1234);
  fixture.load_module('event/event-turnend');
  fixture.load_module('system/turnend-settle');
  fixture.load_module('event/event-turnend-later');
  const { emit } = fixture.load_module('system/event/registry');
  fixture.disable_enter_enemy();
  fixture.override_math_random(() => 0.5);
  try {
    await emit('EVENTTURNEND');
  } finally {
    fixture.restore_math_random();
  }

  assert.deepEqual(
    fixture.era.getAddedCharacters(),
    [0, 31],
    'FLAG:5 位 3 为 0：陷落者保留（标签留在 CFLAG:506 上）',
  );
  assert.equal(fixture.store.get('cflag:31:506'), 1);
  assert.equal(fixture.store.get('flag:80') ?? 0, 0);
});
