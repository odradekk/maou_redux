/**
 * ere/kojo/kojo-system.js 的行为测试（issue #46：口上系统的公共底座；
 * #213 增补接触面契约——七道头部守卫）。
 *
 * 缝 = test/helpers/era-fixture.js。覆盖：
 *   - 两道守卫：FLAG:7 关闭时完全不输出（验收项「此行为有测试」）、
 *     存在判定 FLAG:LOCAL == 0 静默返回；
 *   - @GET_KOJO_NUM 的素质扫描（163 高貴 → 103、165 村娘A → 105、
 *     多素质后格覆盖、无素质 → 0、显式角色号）；
 *   - 分发：编号命中唯一实现、空间内缺失（K4 未移植）静默；
 *   - 分发窗口（#403 收口成 in_kojo_window）：99/100、139/140、1000/1001
 *     两侧逐点，并核对声明编号空间恰是窗口的像；
 *   - 事件链挂接：@EVENTSHOP #PRI 总开关默认开（只补 0）、
 *     @EVENTTRAIN #PRI 置存在标志、@EVENTEND #LATER 清 0；
 *   - 实机路径端到端：run_shop（BEGIN SHOP → @EVENTSHOP 链置开关）→
 *     @EVENTTRAIN 链 → COM0 → @SOURCE_CHECK 链 → K5 首次台词；
 *   - **#213 接触面契约**：@KOJO_MESSAGE_COM_<n> handler 的签名
 *     （kojo-system.js 文件头「handler 签名」段）——七道头部守卫对
 *     **已注册的全部 handler** 逐条置位驱动，守卫命中时不得出现台词。
 *     口上票（轴 B）落地新 handler 自动进契约，无需逐票自写守卫用例；
 *     指令族票（轴 A）对着同一签名扩展 SELECTCOM 分支；
 *   - **#585 改名契约**：try_kojo 的旧名不再导出、常设形参只剩两个
 *     （family + 清单锚名），且 ere/ 与 tools/ 全库不残留旧名文本。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');
const { seed_static_names } = require('./helpers/static-names');

// 世界底座：玛奥入列调教，加载口上系统 + K3/K5 两模块
async function setup_kojo(seed) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 17, '玛奥');
  fixture.era.beginTrain(0, 17);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 17;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = 0;
  fixture.store.set('talent:17:165', 1);
  fixture.store.set('flag:105', 1);
  fixture.store.set('flag:7', 2);
  if (seed) {
    seed(fixture);
  }
  fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k3-noble');
  fixture.load_module('kojo/kojo-k5-mao');
  fixture.load_module('kojo/kojo-k2-timid');
  return fixture;
}

test('FLAG:7 关闭（0 / -1）：口上完全不输出，状态不动', async () => {
  for (const off of [0, -1]) {
    const fixture = await setup_kojo((f) => f.store.set('flag:7', off));
    const { kojo_message_com } = fixture.load_module('kojo/kojo-system');
    await kojo_message_com();
    assert.deepEqual(fixture.text_lines(), [], `flag:7 = ${off}：静默`);
    assert.equal(fixture.store.get('cflag:17:301'), undefined);
  }
});

test('FLAG:7 = 1（少量模式）不拦（守卫是 <= 0）', async () => {
  const fixture = await setup_kojo((f) => f.store.set('flag:7', 1));
  const { kojo_message_com } = fixture.load_module('kojo/kojo-system');
  await kojo_message_com();
  assert.equal(fixture.text_lines().length, 2); // K5 首次两句
});

test('存在判定：FLAG:105 == 0 时静默（口上文件「被删掉」的容错）', async () => {
  const fixture = await setup_kojo((f) => f.store.set('flag:105', 0));
  const { kojo_message_com } = fixture.load_module('kojo/kojo-system');
  await kojo_message_com();
  assert.deepEqual(fixture.text_lines(), []);
});

test('GET_KOJO_NUM：素质 160-179 扫描，最后一格命中者胜', async () => {
  const fixture = await setup_kojo();
  const { get_kojo_num } = fixture.load_module('kojo/kojo-system');
  assert.equal(get_kojo_num(), 105); // 165 村娘A（隐式 TARGET）
  assert.equal(get_kojo_num(17), 105); // 显式角色号
  assert.equal(get_kojo_num(-1), 105); // 负参回落 TARGET（:90-91）

  // 163 高貴 → 103；163+168 同置 → 后格覆盖（FOR 无 BREAK，:137-140）
  fixture.store.set('talent:17:163', 1);
  assert.equal(get_kojo_num(17), 105); // 165 仍最后命中
  fixture.store.delete('talent:17:165');
  assert.equal(get_kojo_num(17), 103);
  fixture.store.set('talent:17:168', 1);
  assert.equal(get_kojo_num(17), 108);

  // 无性格素质 → 0（分发守卫不通过，无调用）
  fixture.store.delete('talent:17:163');
  fixture.store.delete('talent:17:168');
  assert.equal(get_kojo_num(17), 0);
});

test('GET_KOJO_NUM：扩展素质 102 映射到 K902，存在判定读取 EX_FLAG:102', async () => {
  const fixture = await setup_kojo((f) => {
    f.store.delete('talent:17:165');
    f.store.set('ex_talent:17:102', 1);
    f.store.set('exflag:102', 1);
  });
  const { get_kojo_num, kojo_message_com, kojo_message_com_family } =
    fixture.load_module('kojo/kojo-system');
  kojo_message_com_family.register(902, async () => {
    await fixture.era.print('K902 扩展口上');
    return 0;
  });

  assert.equal(get_kojo_num(17), 1002, 'EX_TALENT:102 → 口上编号 1002');
  assert.equal(
    get_kojo_num(18),
    1002,
    'GET_EX_KOJO_NUM 的 public static LOCAL 保留上次命中',
  );
  await kojo_message_com();
  assert.deepEqual(fixture.text_lines(), ['K902 扩展口上']);
});

test('EX_FLAG 门面：动态下标读写落到指定的 EX_FLAG', async () => {
  const fixture = await setup_kojo();
  const era_exflag = fixture.load_module('era-utils/era-exflag');

  era_exflag.set(102, 7);
  assert.equal(fixture.store.get('exflag:102'), 7, '动态写入 EX_FLAG:102');
  assert.equal(era_exflag.get(102), 7, '动态读取 EX_FLAG:102');
  assert.equal(fixture.store.has('exflag:103'), false, '不偏移到 EX_FLAG:103');
});

test('分发：性格命中唯一实现；空间内缺失（K4 冷徹未移植）静默', async () => {
  // 高貴 163 + FLAG:103 → K3
  const k3 = await setup_kojo((f) => {
    f.store.delete('talent:17:165');
    f.store.set('talent:17:163', 1);
    f.store.set('flag:103', 1);
  });
  const { kojo_message_com } = k3.load_module('kojo/kojo-system');
  await kojo_message_com();
  assert.deepEqual(k3.text_lines(), ['「不，不要触摸…呃呜…呜呃呜~~~………」']);

  // 冷徹 164：KOJO_MESSAGE_COM_4 未注册（空间内合法缺失 = TRYCALL 落空）
  const k4 = await setup_kojo((f) => {
    f.store.delete('talent:17:165');
    f.store.set('talent:17:164', 1);
    f.store.set('flag:104', 1);
  });
  const { kojo_message_com: speak4 } = k4.load_module('kojo/kojo-system');
  await speak4();
  assert.deepEqual(k4.text_lines(), []);
});

// —— 分发窗口（#403：七处内联守卫收口成 in_kojo_window 的唯一定义） ——

test('分发窗口边界：99/100、139/140、1000/1001 两侧逐点，且恰是声明编号空间的像', () => {
  const fixture = create_era_fixture();
  const { in_kojo_window, kojo_message_com_family } =
    fixture.load_module('kojo/kojo-system');

  // 验收反馈实测的缺口：LOCAL 120-139 没有产出源头（GET_KOJO_NUM 只到
  // 119），边界改动从行为层看不见——所以对着窗口本身逐点钉（两侧都站人）
  for (const [local, expected, label] of [
    [99, false, '下界外侧（键 -1）'],
    [100, true, '下界（慈愛 K0 的 LOCAL）'],
    [139, true, '上界内侧（声明空间最大键 39）'],
    [140, false, '上界外侧（键 40 不在声明空间）'],
    [1000, false, 'EX 下界外侧（键 900 不在声明空间）'],
    [1001, true, 'EX 下界（EX_TALENT:101 → K901）'],
  ]) {
    assert.equal(in_kojo_window(local), expected, `LOCAL ${local}：${label}`);
  }

  // 窗口与声明空间是同一范围的两侧写法：声明的每个键（LOCAL = 键 + 100）
  // 都放行，紧邻两侧（-1 / 40 / 900）都拒绝——上界 140 的来历就是「40 格」
  for (const id of kojo_message_com_family.declared) {
    assert.equal(in_kojo_window(id + 100), true, `声明键 ${id} 必须在窗口内`);
  }
  for (const id of [-1, 40, 900]) {
    assert.equal(
      in_kojo_window(id + 100),
      false,
      `非声明键 ${id} 必须在窗口外`,
    );
  }

  // 声明空间自己的两端逐点：普通臂 0-39、EX 臂 901-1600。上面的循环只保证
  // 「空间内的键都能放行」，空间被改小（39 或 1600 掉出去）它看不出来——
  // 这两个字面量（40 格 / 700 格 / 起点 901）要有自己的钉子
  for (const id of [0, 39, 901, 1600]) {
    assert.equal(
      kojo_message_com_family.declared.has(id),
      true,
      `键 ${id} 必须在声明空间内`,
    );
  }
  for (const id of [-1, 40, 900, 1601]) {
    assert.equal(
      kojo_message_com_family.declared.has(id),
      false,
      `键 ${id} 不能在声明空间内`,
    );
  }
});

// —— 哨兵值与合法值的边界（#403 二轮验收：`arg <= 0` 把合法角色号 0 当成
//    缺省哨兵，静默改读当前 TARGET 的编号——两者不同时就是另一个人的口上）——

test('GET_KOJO_NUM：0 是合法角色号（魔王），不许并进缺省哨兵侧', () => {
  const fixture = create_era_fixture();
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 17;
  fixture.store.set('talent:17:163', 1); // TARGET 17（高貴）→ LOCAL 103
  const { get_kojo_num } = fixture.load_module('kojo/kojo-system');

  assert.equal(get_kojo_num(17), 103, '显式角色号走自己的素质');
  assert.equal(
    get_kojo_num(0),
    0,
    '显式 0（魔王无素质）→ 读它自己（0），不是 TARGET 的 103（源文 :89-91 的哨兵只认负数）',
  );
  assert.equal(get_kojo_num(-1), 103, '负数才是哨兵 → 当前 TARGET');
  assert.equal(get_kojo_num(), 103, '不传参 → 当前 TARGET');
});

test('kojo_handler_id：-1 哨兵与合法 0 各站一侧，空间外一律 -1', () => {
  const fixture = create_era_fixture();
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 17;
  fixture.store.set('talent:17:163', 1); // TARGET → 103 → 键 3
  fixture.store.set('talent:0:160', 1); // 0 号（魔王）→ 100 → 键 0（合法角色号）
  const { kojo_handler_id } = fixture.load_module('kojo/kojo-system');

  assert.equal(kojo_handler_id(0), 0, '显式 0 → 读它自己（键 0 是合法值）');
  assert.equal(kojo_handler_id(17), 3, '显式角色号 → 键 = LOCAL - 100');
  assert.equal(kojo_handler_id(), 3, '缺省 → 当前 TARGET');
  assert.equal(kojo_handler_id(-1), 3, '哨兵 -1 → 当前 TARGET');
  assert.equal(kojo_handler_id(-2), 3, '其它负数也走哨兵侧');
  assert.equal(kojo_handler_id(99), -1, '无素质的合法角色号 → 空间外哨兵 -1');
});

test('try_kojo：arg 缺省 -1 吃当前 TARGET，显式 0 读它自己（#585 起只剩 family 单必填参）', async () => {
  const fixture = create_era_fixture();
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 17;
  fixture.store.set('talent:17:163', 1); // TARGET → 键 3
  fixture.store.set('talent:0:160', 1); // 0 号 → 键 0
  const mod = fixture.load_module('kojo/kojo-system');
  const { try_kojo, benki_koujo_family } = mod;
  assert.equal(
    mod.try_kojo_or_stub,
    undefined,
    '#585 旧名 try_kojo_or_stub 不再导出（or_stub 已名不副实）',
  );
  assert.equal(
    try_kojo.length,
    1,
    '只有 family 是必填形参（arg/extra_args 带缺省；#638 起连静态核对的锚名形参也删了）',
  );
  const seen = [];
  benki_koujo_family.register(0, async () => {
    seen.push('k0');
    return 0;
  });
  benki_koujo_family.register(3, async () => {
    seen.push('k3');
    return 0;
  });

  assert.equal(await try_kojo(benki_koujo_family), 0);
  assert.equal(await try_kojo(benki_koujo_family, -1), 0);
  assert.equal(await try_kojo(benki_koujo_family, 0), 0);
  assert.deepEqual(
    seen,
    ['k3', 'k3', 'k0'],
    '缺省与 -1 都吃 TARGET（键 3）；显式 0 读它自己（键 0）',
  );
});

test('改名完整性：ere/ 与 tools/ 里不残留旧名（#585）', () => {
  // 纯文本核对：ere/ 的调用点不残留旧名，漏一处就是「调用不存在的名字」。
  // 本用例的断言里出现的旧名在 test/ 下，不在扫描范围内。
  const repo = path.resolve(__dirname, '..');
  const found = [];
  let scanned = 0;
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (/\.(?:js|mjs)$/.test(entry.name)) {
        scanned += 1;
        if (fs.readFileSync(full, 'utf8').includes('try_kojo_or_stub')) {
          found.push(path.relative(repo, full).replace(/\\/g, '/'));
        }
      }
    }
  };
  for (const dir of ['ere', 'tools']) {
    walk(path.join(repo, dir));
  }
  // 空集守卫（同 test/event-k-dispatch.test.js 的「扫描器自身不许漂成空集」）：
  // 少了它，目录改名或扩展名过滤失效时 found 恒空、本用例照绿。ere/ 与
  // tools/ 下当前 517 个 .js/.mjs，门槛取 300 留出删并文件的空间
  assert.ok(scanned >= 300, `扫描面塌了：只读到 ${scanned} 个 .js/.mjs`);
  assert.deepEqual(found, [], '旧名残留（#585 改成 try_kojo）');
});

// —— 事件链挂接（#PRI / #LATER 语义） ——

test('@EVENTSHOP #PRI：FLAG:7 == 0 补 2；1 与 -1 不动（关掉不自开）', async () => {
  for (const [before, after] of [
    [0, 2],
    [1, 1],
    [-1, -1],
  ]) {
    const fixture = await setup_kojo((f) => {
      f.store.delete('flag:7');
      if (before !== 0) {
        f.store.set('flag:7', before);
      } // before == 0 用「未写」表达（引擎读值 undefined → || 0）
    });
    const { emit } = fixture.load_module('system/event/registry');
    await emit('EVENTSHOP');
    assert.equal(
      fixture.store.get('flag:7') ?? 0,
      after,
      `flag:7 ${before} → ${after}`,
    );
  }
});

test('@EVENTTRAIN #PRI 置存在标志、@EVENTEND #LATER 清 0（两模块各自一对）', async () => {
  const fixture = await setup_kojo((f) => f.store.delete('flag:7'));
  const { emit } = fixture.load_module('system/event/registry');

  await emit('EVENTTRAIN');
  assert.equal(fixture.store.get('flag:103'), 1); // K3 存在标志
  assert.equal(fixture.store.get('flag:105'), 1); // K5 存在标志
  assert.equal(fixture.store.get('flag:7'), 2); // 总开关随之默认开

  await emit('EVENTEND');
  assert.equal(fixture.store.get('flag:103'), 0);
  assert.equal(fixture.store.get('flag:105'), 0);
});

test('实机路径端到端：主菜单 → 调教 → 爱抚 → 玛奥真的说话', async () => {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 17, '玛奥');
  seed_static_names(fixture);
  fixture.store.set('maxbase:17:0', 2000);
  fixture.store.set('maxbase:17:1', 2000);
  fixture.store.set('base:17:0', 1450);
  fixture.store.set('base:17:1', 410);

  // BEGIN SHOP → @EVENTSHOP 链（kojo-system 的 #PRI + page-shop 的普通档；
  // 挂载顺序同 main-loop：页面先、口上后——档位序保证 #PRI 先跑）
  const { run_shop } = fixture.load_module('page/page-shop');
  fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k3-noble');
  fixture.load_module('kojo/kojo-k5-mao');
  // 走一轮面板切换（500 是已打印按钮，#130：引擎只送达已打印按钮的快捷
  // 键；原用例的 9999 属无效输入，引擎侧根本不会送达）后输入耗尽
  fixture.set_inputs(500);
  await assert.rejects(() => run_shop(), /预置输入已耗尽/);
  assert.equal(
    fixture.store.get('flag:7'),
    2,
    '总开关由 @EVENTSHOP #PRI 默认开',
  );

  // BEGIN TRAIN → @EVENTTRAIN 链（存在标志 + 真实的 #PRI 主体）
  fixture.era.beginTrain(0, 17);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 17;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = 0;
  fixture.store.set('talent:17:165', 1);
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.store.get('flag:105'), 1);

  // 回合：COM0（爱抚）→ @SOURCE_CHECK（:11-12 的 CALL KOJO_MESSAGE_COM）
  fixture.load_module('system/train/com-caress');
  fixture.load_module('event/source-check');
  const { com_family } = fixture.load_module('system/train/com-family');
  await com_family.call(0);
  await emit('SOURCE_CHECK');
  assert.ok(
    fixture.text_lines().includes('「你这个变态…别、别碰我！」'),
    'K5 首次台词经真实调用点出现在输出里（#60 归一为简体）',
  );
  assert.equal(fixture.store.get('cflag:17:301'), 1, '状态机推进');
});

// —— #213 接触面契约：@KOJO_MESSAGE_COM_<n> 的七道头部守卫 ——

// 七道守卫的置位器（EVENT_K3_高貴.ERB:888-912 实测；K5 同款顺序互异——
// 契约锁的是守卫集与语义，顺序按各文件 1:1）。TEQUIP:55/45/89/90 只读
// （TEQUIP 建模归 J5，#215）。
const KOJO_GUARD_STATES = [
  [
    'TEQUIP:55 死斗场 → 专用口上',
    (fixture, era_flag) => {
      fixture.store.set('tequip:17:55', 1);
      fixture.store.set('base:17:1', 100);
      era_flag.selectcom = 55;
    },
  ],

  [
    'ASSI > 0 && ASSIPLAY 助手调教 → 跳过',
    (fixture, era_flag) => {
      era_flag.assi = 17;
      era_flag.assiplay = 1;
    },
  ],
  [
    'TEQUIP:45 口塞（SELECTCOM != 45）→ 跳过',
    (fixture) => fixture.store.set('tequip:17:45', 1),
  ],
  ['TFLAG:899 失神 → 跳过', (fixture) => fixture.store.set('tflag:899', 1)],
  [
    'TEQUIP:89 兽奸 → 专用口上/静默',
    (fixture) => fixture.store.set('tequip:17:89', 1),
  ],
  ['TALENT:9 崩坏 → 跳过', (fixture) => fixture.store.set('talent:17:9', 1)],
  ['TEQUIP:90 触手 → 跳过', (fixture) => fixture.store.set('tequip:17:90', 1)],
];

test('#213 契约：七道头部守卫对已注册的全部 handler 逐条跳过（守卫命中不得出台词；K2/K3/K5 死斗场走真身，K3 兽奸走真身）', async () => {
  // 对 family 里已注册的每个 handler × 每道守卫：置位 → 直调 → 返回 0。
  // 跳过类守卫不得等待、不得出台词；死斗场/兽奸岔去专用口上——K5 死斗场
  // 已随 #236 换真台词、兽奸静默；K2 死斗场已随 #233 换真台词、兽奸仍静默；
  const probe = await setup_kojo();
  const { kojo_message_com_family } = probe.load_module('kojo/kojo-system');
  const handlers = [...kojo_message_com_family.implemented.entries()];
  assert.ok(handlers.length >= 3, '契约至少要覆盖已注册的 K2/K3/K5');
  for (const [num] of handlers) {
    for (const [name, seed_guard] of KOJO_GUARD_STATES) {
      const fixture = await setup_kojo();
      const flag = fixture.load_module('era-utils/era-flag');
      seed_guard(fixture, flag);
      const { kojo_message_com_family } =
        fixture.load_module('kojo/kojo-system');
      const handler = kojo_message_com_family.implemented.get(num);
      const result = await handler();
      assert.equal(result, 0, `KOJO_MESSAGE_COM_${num} 守卫「${name}」返回 0`);
      if (num === 2 && name.startsWith('TEQUIP:55')) {
        assert.ok(
          fixture.text_lines().some((l) => l.includes('死斗场的狂热')),
          `KOJO_MESSAGE_COM_${num} 守卫「${name}」走死斗场真台词`,
        );
        continue;
      }
      if (num === 3 && name.startsWith('TEQUIP:55')) {
        assert.ok(
          fixture.text_lines().some((l) => l.includes('吓得直发抖')),
          `KOJO_MESSAGE_COM_${num} 守卫「${name}」走死斗场真台词`,
        );
        continue;
      }
      if (num === 5 && name.startsWith('TEQUIP:55')) {
        assert.ok(
          fixture.text_lines().some((l) => l.includes('吓得直哆嗦')),
          `KOJO_MESSAGE_COM_${num} 守卫「${name}」走死斗场真台词`,
        );
        continue;
      }
      if (num === 3 && name.startsWith('TEQUIP:89')) {
        assert.ok(
          fixture.text_lines().some((l) => l.includes('才不要做这种事情')),
          `KOJO_MESSAGE_COM_${num} 守卫「${name}」走兽奸真台词`,
        );
        continue;
      }
      assert.equal(
        fixture.calls.filter((c) => c.api === 'waitAnyKey').length,
        0,
        `KOJO_MESSAGE_COM_${num} 守卫「${name}」不得有台词（无等待）`,
      );
      for (const line of fixture.text_lines()) {
        assert.match(
          line,
          /尚未移植，此处为占位/,
          `KOJO_MESSAGE_COM_${num} 守卫「${name}」只允许存根占位行，` +
            `实际输出：${line}`,
        );
      }
    }
  }
});
