'use strict';
/**
 * ere/system/train/ 的 #213（J3 指令分发骨架）行为测试。
 *
 * 缝 = test/helpers/era-fixture.js（分发表与映射是纯数据/纯逻辑，夹具只为
 * require '#/' 别名与可寻址的表）。覆盖四块：
 *   1. 121 段分发表契约：DECLARED_COM_IDS / DECLARED_TRAIN_IDS /
 *      ADVANCED_COM_IDS 对 target/ 源（COMF*.ERB 的 @COM 定义 ∪ Train.csv
 *      有效行）逐号锁定——**缺号当场红**（验收项「分发表完整，缺号显式
 *      报错而非静默回落」的数据面；行为面是空间外 call/register 抛错）；
 *   2. L_IDX ↔ L_I 映射层（com-index.js）：双向、黄金样本实证对（穿脱
 *      衣服 110 ↔ 89）、由 TrainCommand.yml 条目顺序推出的独立通道核对、
 *      **恒等映射必红**（#211 的反向变异要求——工单追加范围原文）；
 *   3. @GET_ADV_COM 升格机制（com-adv.js）：零规则原样返回（RETURN ARG）、
 *      「前两回合序列 → 高级 COM」的机制样例（测试内注册 CASE 8 形状的
 *      规则；族票接上真规则后按新语义调紧，见用例注）、rand 注入、
 *      空间外显式抛错；
 *   4. @V_ABLE（v-able.js）六条判定 + TRAIN_MESSAGE 分发族的缺号语义。
 *
 * 源读取按内容判定编码：target/ 有一个 Shift-JIS 活代码文件
 * （COMF90_ニプルファック.ERB，内含 @COM90——恰好是 121 段之一）。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

const REPO = path.resolve(__dirname, '..');

/** 按内容判定编码读源文件（utf-8 优先，Shift-JIS 回落；AGENTS.md 的规约） */
function read_source_text(file) {
  const raw = fs.readFileSync(file);
  for (const label of ['utf-8', 'shift_jis']) {
    try {
      return new TextDecoder(label, { fatal: true }).decode(raw);
    } catch {
      // 试下一种编码
    }
  }
  throw new Error(`无法解码源文件：${file}`);
}

/** target/ERB/調教相關/COMF*.ERB 的 @COM<n> 定义全集（剥离 CR，防 CRLF） */
function source_com_ids() {
  const ids = new Set();
  const dir = path.join(REPO, 'target', 'ERB', '調教相關');
  for (const file of fs.readdirSync(dir)) {
    if (!file.startsWith('COMF') || !file.endsWith('.ERB')) {
      continue;
    }
    for (const m of read_source_text(path.join(dir, file)).matchAll(
      /^@COM(\d+)\r?$/gm,
    )) {
      ids.add(Number(m[1]));
    }
  }
  return ids;
}

/** target/CSV/Train.csv 的有效指令号（注释行 ;n,... 不算） */
function source_train_csv_ids() {
  const ids = new Set();
  for (const line of read_source_text(
    path.join(REPO, 'target', 'CSV', 'Train.csv'),
  ).split(/\r?\n/)) {
    const first = line.split(',')[0].trim();
    if (/^\d+$/.test(first)) {
      ids.add(Number(first));
    }
  }
  return ids;
}

// —— 1. 121 段分发表契约 ——

test('121 段分发表：DECLARED_COM_IDS = @COM 定义全集 ∪ Train.csv（缺号当场红）', async () => {
  const fixture = create_era_fixture();
  const { DECLARED_COM_IDS, DECLARED_TRAIN_IDS } = fixture.load_module(
    'system/train/com-family',
  );

  const com_ids = source_com_ids();
  const csv_ids = source_train_csv_ids();
  assert.equal(com_ids.size, 121, '源侧 @COM 定义应为 121 个（含 SJIS 的 90）');
  assert.equal(csv_ids.size, 101, '源侧 Train.csv 有效指令应为 101 个');

  // 可直选空间 = Train.csv；分发空间 = 并集 121；两者精确锁定
  assert.deepEqual(
    DECLARED_TRAIN_IDS,
    [...csv_ids].sort((a, b) => a - b),
    'DECLARED_TRAIN_IDS 必须逐号等于 Train.csv 有效行（升序）',
  );
  assert.deepEqual(
    DECLARED_COM_IDS,
    [...new Set([...com_ids, ...csv_ids])].sort((a, b) => a - b),
    'DECLARED_COM_IDS 必须逐号等于 @COM 定义 ∪ Train.csv',
  );
  assert.equal(DECLARED_COM_IDS.length, 121);
});

test('高级 COM 20 个的精确清单：有实现、不可直选（Train.csv 注释段）', async () => {
  const fixture = create_era_fixture();
  const { ADVANCED_COM_IDS, DECLARED_COM_IDS, DECLARED_TRAIN_IDS } =
    fixture.load_module('system/train/com-family');

  assert.deepEqual(
    ADVANCED_COM_IDS,
    [
      67, 69, 70, 84, 111, 120, 121, 123, 124, 125, 126, 127, 128, 129, 130,
      131, 132, 133, 134, 208,
    ],
    '高级 COM = 分发空间 − 可直选空间（#213 勘定：67/84 无 COM_ABLE 段、' +
      '86 是死段不进空间）',
  );
  assert.ok(
    ADVANCED_COM_IDS.every((id) => !DECLARED_TRAIN_IDS.includes(id)),
    '高级 COM 一律不在可直选空间',
  );
  assert.ok(
    ADVANCED_COM_IDS.every((id) => DECLARED_COM_IDS.includes(id)),
    '高级 COM 一律在分发空间（JUMPFORM 升格目标可分发）',
  );
  assert.ok(!DECLARED_COM_IDS.includes(86), 'COM_ABLE86 死段不进空间（饮尿）');
});

test('缺号显式报错而非静默回落：空间外 register/call 一律抛错', async () => {
  const fixture = create_era_fixture();
  const { com_able_family, com_family } = fixture.load_module(
    'system/train/com-family',
  );

  assert.throws(
    () => com_family.register(999, async () => 1),
    /不在声明的编号空间内/,
  );
  assert.throws(
    () => com_able_family.register(86, async () => 0),
    /不在声明的编号空间内/,
    '86 是 COM_ABLE 的死段（无 @COM86、TRAINNAME 恒空）——空间外',
  );
  await assert.rejects(
    () => com_family.call(999, { whenMissing: 0 }),
    /不在声明的编号空间内/,
  );
  await assert.rejects(
    () => com_able_family.call(39, { whenMissing: 1 }),
    /不在声明的编号空间内/,
    'L_I 39 是 Train.csv 空号——空间外（打屁股是 40）',
  );
});

// —— 2. L_IDX ↔ L_I 映射层 ——

test('映射双向：恒等段 0-38、黄金实证对（打屁股 40↔39 / 交谈 56↔55 / 穿脱衣服 110↔89）', async () => {
  const fixture = create_era_fixture();
  const { com_id, com_index } = fixture.load_module('system/train/com-index');

  // 0-38：Train.csv 第一个空号（39）之前两套重合
  assert.equal(com_index(0), 0);
  assert.equal(com_index(38), 38);
  // 39 起 L_IDX = L_I − 累计空号数（#211 三条实证的算术）
  assert.equal(com_index(40), 39, '打屁股——恒等映射在此必红（40≠39）');
  assert.equal(com_index(56), 55, '交谈——同上');
  assert.equal(com_index(110), 89, '穿脱衣服——golden 按键 89 跑出 COM110');
  // 反向
  assert.equal(com_id(0), 0);
  assert.equal(com_id(38), 38);
  assert.equal(com_id(39), 40);
  assert.equal(com_id(55), 56);
  assert.equal(com_id(89), 110);
});

test('映射是双射且由 TrainCommand.yml 条目顺序推出（独立通道核对，不硬编码）', async () => {
  const fixture = create_era_fixture();
  const { com_id, com_index } = fixture.load_module('system/train/com-index');

  // 独立通道：直接读 yml 文本推出位次（@SHOW_COMMENU 的 FOR L_I,0,300 +
  // STRLENS(TRAINNAME) 守卫的离线等价物），与运行时映射逐号对账
  const yml = fs.readFileSync(
    path.join(REPO, 'yml', 'TrainCommand.yml'),
    'utf8',
  );
  const yml_ids = [...yml.matchAll(/"(.+)":\r?\n\s+id:\s*(\d+)/g)].map((m) =>
    Number(m[2]),
  );
  assert.equal(yml_ids.length, 101);
  const ordered = [...yml_ids].sort((a, b) => a - b);
  ordered.forEach((id, idx) => {
    assert.equal(com_index(id), idx, `com_index(${id}) 应为 yml 位次 ${idx}`);
    assert.equal(com_id(idx), id, `com_id(${idx}) 应为 ${id}`);
  });

  // 高级 COM 无位次（不可直选，方格上没有它们）
  for (const adv of [67, 84, 120, 208]) {
    assert.equal(com_index(adv), undefined);
  }
  // 越界输入：不是指令编号（999 出口 / 子菜单号 / 乱数都经 undefined 落
  // @USERCOM；100 是合法位次——末位指令 207 媚药史莱姆，与能力表示[100]
  // 的撞号由 COM_ABLE 过滤消解，同原作）
  for (const bad of [-1, 101, 999, 1.5]) {
    assert.equal(com_id(bad), undefined, `com_id(${bad}) 必须 undefined`);
  }
  assert.equal(com_index(999), undefined);
  assert.equal(com_index(-1), undefined);
});

// —— 3. @GET_ADV_COM 升格机制 ——

test('机制样例（前两回合序列 → 高级 COM）：CASE 8 形状的规则 + 零规则原样返回', async () => {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  fixture.era.beginTrain(0, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.player = 0;
  const { era } = fixture;
  const { adv_com_family, get_adv_com } = fixture.load_module(
    'system/train/com-adv',
  );

  // 零规则（#213 骨架态）：全部可直选号原样返回（RETURN ARG 的等价物）
  for (const id of [0, 8, 40, 110, 135, 207]) {
    assert.equal(await get_adv_com(id), id, `无规则时 ${id} 原样返回`);
  }

  // 机制样例：测试内注册 CASE 8（COMF_JUMP.ERB:140-141）形状的规则——
  // PREVCOM == 8 && ABL:PLAYER:12 >= 3 → 84（不调 COM_ABLE、无随机）。
  // J9（#219）把真规则注册进 adv_com_family 后，本断言按新语义调紧
  // （零规则原样返回的六连断言届时删除）
  let rand_seen;
  adv_com_family.register(8, async (rand) => {
    if (typeof rand !== 'function') {
      throw new Error('rand 必须以函数形态注入规则（get_adv_com 的签名契约）');
    }
    rand_seen = rand(11);
    if (era_flag.prevcom === 8 && (era.get('abl:0:12') || 0) >= 3) {
      return 84; // 刺激Ｇ点（golden/train-upgrade 的升格链实测）
    }
    if (era_flag.prevcom === 84) {
      return 84;
    }
    return 8;
  });

  era_flag.prevcom = 8;
  fixture.store.set('abl:0:12', 3);
  assert.equal(await get_adv_com(8), 84, '前两回合序列命中 → 高级 COM');

  fixture.store.set('abl:0:12', 2);
  assert.equal(await get_adv_com(8), 8, '技巧不足 → 原样返回');

  era_flag.prevcom = 0;
  fixture.store.set('abl:0:12', 3);
  assert.equal(await get_adv_com(8), 8, '上回合不是插入手指 → 原样返回');

  // rand 注入到达规则（缺省均匀随机也注入——签名契约）
  era_flag.prevcom = 8;
  const seen = [];
  await get_adv_com(8, (n) => {
    seen.push(n);
    return 0;
  });
  assert.deepEqual(seen, [11], 'rand 必须以 RAND:11 的形态注入规则');
  assert.ok(Number.isInteger(rand_seen) && rand_seen >= 0 && rand_seen < 11);
});

test('GET_ADV_COM 的挂点空间：可直选 101；高级号/空号显式抛错', async () => {
  const fixture = create_era_fixture();
  const { get_adv_com } = fixture.load_module('system/train/com-adv');

  // 规则挂在可直选空间（SHOW_COMMENU 与 COMF 头部传入的都是玩家所选 L_I）
  await assert.rejects(
    () => get_adv_com(84),
    /不在声明的编号空间内/,
    '高级 COM 不是升格挂点（84 只能是升格结果）',
  );
  await assert.rejects(() => get_adv_com(39), /不在声明的编号空间内/);
  await assert.rejects(() => get_adv_com(999), /不在声明的编号空间内/);
});

// —— 4. @V_ABLE 公共头 ——

test('@V_ABLE：六条判定逐条（男 / 未成熟 / 处女 / 贞操带三条件 / 贞操封印 / 可）', async () => {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  const { v_able } = fixture.load_module('system/train/v-able');

  const set = (k, v) => fixture.store.set(k, v);
  const del = (k) => fixture.store.delete(k);

  // 通过态：无任何阻碍素质
  assert.equal(v_able(31), 1);

  set('talent:31:122', 1); // 男人
  assert.equal(v_able(31), 0, '男人不可');
  del('talent:31:122');

  set('talent:31:135', 1); // 未成熟（源注释的「萨德豁免」不在函数体）
  assert.equal(v_able(31), 0, '未成熟不可');
  del('talent:31:135');

  set('talent:31:0', 1); // 处女
  assert.equal(v_able(31), 0, '处女不可');
  del('talent:31:0');

  set('talent:31:273', 1); // 贞操封印
  assert.equal(v_able(31), 0, '贞操封印不可');
  del('talent:31:273');

  // 贞操带：CFLAG:42 == 79 && (CFLAG:40 & 64) && FLAG:37 三条件缺一不可
  set('cflag:31:42', 79);
  set('cflag:31:40', 64);
  set('flag:37', 1);
  assert.equal(v_able(31), 0, '贞操带三条件齐 → 不可');
  set('flag:37', 0);
  assert.equal(v_able(31), 1, 'FLAG:37（服装描写开关）关 → 判定不生效');
  set('flag:37', 1);
  set('cflag:31:40', 0);
  assert.equal(v_able(31), 1, '下着位未着装 → 判定不生效');
  del('cflag:31:42');
  del('cflag:31:40');
  del('flag:37');
});

// —— 5. TRAIN_MESSAGE 分发族的缺号语义 ——

test('TRAIN_MESSAGE 分发族：声明空间 121；缺失落占位行；空间外显式抛错', async () => {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  fixture.era.beginTrain(0, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.player = 0;
  fixture.load_module('system/train/com-caress'); // 爱抚 0-9 分支的注册在族模块
  const {
    train_message_a,
    train_message_a_family,
    train_message_b,
    train_message_b_family,
  } = fixture.load_module('system/train/train-message');
  const { DECLARED_COM_IDS } = fixture.load_module('system/train/com-family');

  // 声明空间 = 121 段（含高级 COM——SELECTCOM 经升格可取高级号）
  assert.equal(train_message_a_family.declared.size, DECLARED_COM_IDS.length);
  assert.equal(train_message_b_family.declared.size, DECLARED_COM_IDS.length);
  // COM0（爱抚）分支已在表中（#45）；高级号分支缺失是合法缺失
  assert.ok(train_message_b_family.has(0));
  assert.ok(!train_message_b_family.has(84));

  // 缺失（族票未落地）→ 存根占位行（default 落占位，不静默）
  era_flag.selectcom = 84; // 升格可达的高级号：J19 落地前是缺失分支
  await train_message_b();
  assert(
    fixture.text_lines().some((l) => l.includes('@TRAIN_MESSAGE_B')),
    '缺失分支必须落可检索的占位行',
  );

  // 空间外 → 显式抛错（SELECTCOM 只会是 121 之一，越界即引擎对接 bug）
  era_flag.selectcom = 999;
  await assert.rejects(() => train_message_b(), /不在声明的编号空间内/);
  await assert.rejects(() => train_message_a(), /不在声明的编号空间内/);
});
