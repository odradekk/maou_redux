/**
 * `ere/event/event-pregnancy.js` 的行为测试（issue #401：EVENT_PREGNANCY.ERB
 * 31 个函数全量 + 育儿室三函数 + 页面接线）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点，issue #16）。
 *
 * **12 组成对函数是维度型分支，用表驱动一个用例走完整个维度**（工单点名的
 * 返工点）：`IN_VAGINA_<源>_TO_<目标>` 与同名 `CONCEPTION_CHECK_<源>_TO_<目标>`
 * 形状相同、只差「受检主体、妊娠相手码、是否另查 158、孩子父亲码」四个维度。
 * `PAIRS` 表里的期望值直接来自 `target/ERB/EVENT/EVENT_PREGNANCY.ERB` 的
 * 对应行（行号写在每条注释里），不复算实现。
 *
 * 随机源：受检函数带 `rand` 形参，用例一律注入确定性序列（本文件 seq()），
 * 不走 Math.random——工单验收项（#344 的漏网教训：漏给就落到真随机，用例
 * 只在一部分抽样里真的守住行为）。
 *
 * 覆盖：
 *   1. 12 组 IN_VAGINA 侧：主体在场且未妊娠时按精液池掷受胎，命中写
 *      CFLAG:102 = 妊娠相手码并清池；其余角色不被波及；
 *   2. 12 组的存在性守卫：主体指针落到主人位（0）时整组早退，**连精液池
 *      都不碰**（早退发生在 NAKADASHI_CHECK 之外，与它内部的清池早退不同）；
 *   3. 12 组的 158（同族不育）守卫：kin 组跳过且不碰池、非 kin 组照写；
 *   4. 12 组 CONCEPTION 侧：妊娠相手码相符且无预产日时落定产日与父亲；
 *      码不符 / 已有预产日 / 已妊娠三种反例各走一遍；
 *   5. 全角色组（kyouou_to_t / ntrd_to_t / extra）的 REPEAT CHARANUM 语义：
 *      自角色 0 起、逐角色独立掷、妊娠中的角色跳过；
 *   6. 四个非成对函数：CHECK_ABLE_TO_CHILD_CARE（#FUNCTION 四档）、
 *      SHOW_BUTTON_CHILD_CARE（:466 的 SETCOLOR 在 RETURN 0 之后 = 死代码）、
 *      CHILD_CARE_CHARA（三条早退与正常支）、IN_VAGINA_ALL /
 *      CONCEPTION_CHECK_ALL 的九连调顺序与整体守卫。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/**
 * 固定随机序：越界访问即断言失败——比「越界回落成 0」严（#16 惯例的收紧：
 * 生产函数多抽一次而序列恰好够用时，回落的 0 会让用例静默通过）。
 */
function seq(values) {
  let index = 0;
  return (n) => {
    assert.ok(
      index < values.length,
      `随机序列已耗尽（第 ${index + 1} 次抽取，只预置了 ${values.length} 个）`,
    );
    const value = values[index++];
    assert.ok(value >= 0 && value < n, `随机值 ${value} 必须在 [0, ${n}) 内`);
    return value;
  };
}

/** 精液池槽位：CFLAG:101/103-108（kind → 下标，见 EVENT_PREGNANCY.ERB:200-201） */
const POOL = { 1: 101, 2: 103, 3: 104, 4: 105, 5: 106, 6: 107, 7: 108 };

/** 靶场里的三个角色：主人 0（MASTER）与两名奴隶 31/32 */
const MASTER = 0;
const SLAVE = 31;
const ASSI = 32;
const ALL_CIDS = [MASTER, SLAVE, ASSI];

/**
 * 12 组的维度表：期望值全部来自 `target/ERB/EVENT/EVENT_PREGNANCY.ERB`。
 *
 *   name      函数名后缀（IN_VAGINA_<name> / CONCEPTION_CHECK_<name>）
 *   kind      NAKADASHI_CHECK 的 ARG:1，亦即妊娠相手码 CFLAG:102 的目标值
 *   iv        IN_VAGINA 侧的最外层存在性守卫（:85-194）
 *   cc        CONCEPTION_CHECK 侧的存在性守卫（:305-444）——**T_TO_A 两侧
 *             不对称**（:127 只查助手、:357 另查目标），故分两列
 *   kin       IN_VAGINA 侧是否另查 TALENT:158（同族不育）
 *   father     CONCEPTION 落定时的 CFLAG:111。数字码与 NID 码两组：
 *              NID(cid) = 10000 + cid（cid 为 0 或 17-40 时，chara-family.js
 *              的 @NID），故父为角色 31 时孩子父亲码 = 10031 + 1 = 10032
 *   father_name 有值的组同时写 CSTR:<受检者>:2 = SAVESTR(父)
 *   dog        kind 5 的两组要先过 NAKADASHI_CHECK 的兽耳守卫（:224）
 *   world      让两侧都点火的靶场（TARGET / ASSI 指针）
 *   hit        该靶场下真正收到写入的受检者；'each' = 全角色组
 */
const PAIRS = [
  // :85-93 / :305-314 主人 → 奴隶
  {
    name: 'm_to_t',
    kind: 1,
    iv: ['target'],
    cc: ['target'],
    kin: true,
    father: 0,
    world: { target: SLAVE, assi: -1 },
    hit: SLAVE,
  },
  // :95-103 / :317-326 主人 → 助手
  {
    name: 'm_to_a',
    kind: 1,
    iv: ['assi'],
    cc: ['assi'],
    kin: true,
    father: 0,
    world: { target: SLAVE, assi: ASSI },
    hit: ASSI,
  },
  // :105-112 / :329-338 奴隶 → 主人（守卫是 MASTER == 0 的恒真式）
  {
    name: 't_to_m',
    kind: 3,
    iv: [],
    cc: [],
    kin: true,
    father: 10032,
    father_name: '角色31',
    world: { target: SLAVE, assi: -1 },
    hit: MASTER,
  },
  // :114-122 / :341-351 助手 → 奴隶（两侧都要求助手在场）
  {
    name: 'a_to_t',
    kind: 2,
    iv: ['assi', 'target'],
    cc: ['assi', 'target'],
    kin: true,
    father: 10033,
    father_name: '角色32',
    world: { target: SLAVE, assi: ASSI },
    hit: SLAVE,
  },
  // :124-132 / :354-364 奴隶 → 助手（IN_VAGINA 只查助手；CONCEPTION 另查目标）
  {
    name: 't_to_a',
    kind: 3,
    iv: ['assi'],
    cc: ['assi', 'target'],
    kin: true,
    father: 10032,
    father_name: '角色31',
    world: { target: SLAVE, assi: ASSI },
    hit: ASSI,
  },
  // :134-141 / :366-376 野狗 → 奴隶
  {
    name: 'd_to_t',
    kind: 5,
    iv: ['target'],
    cc: ['target'],
    kin: false,
    father: -2,
    dog: true,
    world: { target: SLAVE, assi: -1 },
    hit: SLAVE,
  },
  // :143-150 / :389-399 怪物・触手 → 奴隶
  {
    name: 'syoku_to_t',
    kind: 6,
    iv: ['target'],
    cc: ['target'],
    kin: false,
    father: -3,
    world: { target: SLAVE, assi: -1 },
    hit: SLAVE,
  },
  // :152-159 / :402-411 怪物・触手 → 主人
  {
    name: 'syoku_to_m',
    kind: 6,
    iv: [],
    cc: [],
    kin: false,
    father: -3,
    world: { target: SLAVE, assi: -1 },
    hit: MASTER,
  },
  // :161-168 / :413-422 狂王 → 主人
  {
    name: 'kyouou_to_m',
    kind: 7,
    iv: [],
    cc: [],
    kin: true,
    father: -4,
    world: { target: SLAVE, assi: -1 },
    hit: MASTER,
  },
  // :170-177 / :424-433 狂王 → 奴隶（REPEAT CHARANUM）
  {
    name: 'kyouou_to_t',
    kind: 7,
    iv: [],
    cc: [],
    kin: true,
    father: -4,
    world: { target: SLAVE, assi: -1 },
    hit: 'each',
  },
  // :179-186 / :435-444 兽奸秀 → 奴隶（REPEAT CHARANUM，相手码同野狗的 5）
  {
    name: 'ntrd_to_t',
    kind: 5,
    iv: [],
    cc: [],
    kin: false,
    father: -2,
    dog: true,
    world: { target: SLAVE, assi: -1 },
    hit: 'each',
  },
  // :188-194 / :379-387 卖春 → 奴隶（REPEAT CHARANUM）
  {
    name: 'extra',
    kind: 4,
    iv: [],
    cc: [],
    kin: true,
    father: -1,
    world: { target: SLAVE, assi: -1 },
    hit: 'each',
  },
];

/** 一条维度行在靶场里实际受检的角色号 */
function hit_cid(pair) {
  return pair.hit === 'each' ? SLAVE : pair.hit;
}

/**
 * 靶场：主人 0 与两名奴隶 31/32 已加入，妊娠出产功能开启。
 * @param {{target?: number, assi?: number, pools?: Object<string, number>,
 *   dog?: boolean}} opts
 */
function setup_world({ target = -1, assi = -1, pools = {}, dog = false } = {}) {
  const fixture = create_era_fixture();
  for (const cid of ALL_CIDS) {
    fixture.seed_chara(cid, {
      id: cid,
      name: `角色${cid}`,
      callname: `角色${cid}`,
    });
    fixture.era.addCharacter(cid);
    if (dog) {
      fixture.store.set(`talent:${cid}:124`, 1); // 动物耳朵（:224 的兽奸守卫）
    }
  }
  fixture.store.set('flag:5', 4); // GETBIT(FLAG:5,2)：妊娠出产功能 ON
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = target;
  era_flag.assi = assi;
  for (const [name, value] of Object.entries(pools)) {
    fixture.store.set(name, value);
  }
  const pregnancy = fixture.load_module('event/event-pregnancy');
  return { fixture, era_flag, pregnancy };
}

/** 把一条维度行灌成「受检者的精液池有货」的靶场 */
function pair_world(pair, extra = {}) {
  const cid = hit_cid(pair);
  return setup_world({
    ...pair.world,
    dog: Boolean(pair.dog),
    pools: { [`cflag:${cid}:${POOL[pair.kind]}`]: 1 },
    ...extra,
  });
}

test('IN_VAGINA 十二组：主体在场且未妊娠时按精液池掷受胎，命中写妊娠相手码并清池', () => {
  for (const pair of PAIRS) {
    const { fixture, pregnancy } = pair_world(pair);
    const cid = hit_cid(pair);
    // 池 = 1 → 落分档 [6, 2]（:268-270 的 ELSEIF 支）；HAIRANZAI = 3 - 0*2 = 3、
    // 娇小 0 → 掷骰上界 (6 + 0) * 3 = 18；rand 取 0 <= 2 必命中
    assert.equal(
      pregnancy[`in_vagina_${pair.name}`](seq([0])),
      0,
      `${pair.name}：原作函数一律 RETURN 0`,
    );
    assert.equal(
      fixture.store.get(`cflag:${cid}:102`),
      pair.kind,
      `${pair.name}：妊娠相手码须为本组的 kind`,
    );
    assert.equal(
      fixture.store.get(`cflag:${cid}:${POOL[pair.kind]}`),
      0,
      `${pair.name}：判定过后精液池清零（:274）`,
    );
    // 单主体组只碰自己的受检者；全角色组另行断言
    if (pair.hit !== 'each') {
      for (const other of ALL_CIDS) {
        if (other === cid) continue;
        assert.equal(
          fixture.store.get(`cflag:${other}:102`) ?? 0,
          0,
          `${pair.name}：不得写其它角色的妊娠相手`,
        );
      }
    }
  }
});

test('IN_VAGINA 十二组：主体指针落到主人位（0）时整组早退，连精液池都不碰', () => {
  for (const pair of PAIRS) {
    if (pair.iv.length === 0) continue; // 无守卫的六组另有用例
    // 守卫是 `TARGET >= 1` / `ASSI >= 1`：指针取 0（主人位）恰好卡在边界上
    // ——把 `>= 1` 写成 `>= 0` 时本用例必红，而指针取 -1 抓不到这一档
    const world = { ...pair.world };
    if (pair.iv.includes('target')) world.target = 0;
    if (pair.iv.includes('assi')) world.assi = 0;

    const { fixture, pregnancy } = setup_world({
      ...world,
      dog: Boolean(pair.dog),
      pools: {
        [`cflag:${hit_cid(pair)}:${POOL[pair.kind]}`]: 1,
        [`cflag:${SLAVE}:${POOL[pair.kind]}`]: 1,
        // 关键：把货也压在「守卫指针所指的那个角色」上（角色 0 主人位）。
        // 守卫若被删或被放宽（`>= 1` 写成 `>= 0`），它就会被当成受检者、
        // 消费掉这份池——那时本断言红。只压受检者的池抓不到这一档
        [`cflag:${MASTER}:${POOL[pair.kind]}`]: 1,
      },
    });

    pregnancy[`in_vagina_${pair.name}`](seq([]));
    assert.equal(
      fixture.store.get(`cflag:${hit_cid(pair)}:${POOL[pair.kind]}`),
      1,
      `${pair.name}：主体不在场时不得消费精液池（早退在 NAKADASHI_CHECK 之外）`,
    );
    assert.equal(
      fixture.store.get(`cflag:${MASTER}:${POOL[pair.kind]}`),
      1,
      `${pair.name}：守卫指针所指的角色不得被当成受检者`,
    );
    assert.equal(
      fixture.store.get(`cflag:${hit_cid(pair)}:102`) ?? 0,
      0,
      `${pair.name}：主体不在场时不得写妊娠相手`,
    );
  }
});

test('IN_VAGINA 十二组：已妊娠的主体整组早退（妊娠中不再受胎）', () => {
  for (const pair of PAIRS) {
    const { fixture, pregnancy } = pair_world(pair);
    const cid = hit_cid(pair);
    fixture.store.set(`talent:${cid}:153`, 1); // 妊娠
    const pool_before = fixture.store.get(`cflag:${cid}:${POOL[pair.kind]}`);

    pregnancy[`in_vagina_${pair.name}`](seq([]));
    assert.equal(
      fixture.store.get(`cflag:${cid}:${POOL[pair.kind]}`),
      pool_before,
      `${pair.name}：妊娠中的主体不得消费精液池（TALENT:153 守卫在调用之外）`,
    );
    assert.equal(
      fixture.store.get(`cflag:${cid}:102`) ?? 0,
      0,
      `${pair.name}：妊娠中的主体不得写妊娠相手`,
    );
  }
});

test('IN_VAGINA 十二组：158（同族不育）只拦 kin 组，非 kin 组照常受胎', () => {
  for (const pair of PAIRS) {
    const { fixture, pregnancy } = pair_world(pair);
    const cid = hit_cid(pair);
    fixture.store.set(`talent:${cid}:158`, 1); // 同族不育

    pregnancy[`in_vagina_${pair.name}`](seq([0]));
    if (pair.kin) {
      assert.equal(
        fixture.store.get(`cflag:${cid}:102`) ?? 0,
        0,
        `${pair.name}：kin 组须被 158 拦住`,
      );
      assert.equal(
        fixture.store.get(`cflag:${cid}:${POOL[pair.kind]}`),
        1,
        `${pair.name}：kin 组被 158 拦住时不碰精液池`,
      );
    } else {
      assert.equal(
        fixture.store.get(`cflag:${cid}:102`),
        pair.kind,
        `${pair.name}：非 kin 组不查 158，照常受胎`,
      );
    }
  }
});

test('IN_VAGINA 全角色组：REPEAT CHARANUM 自角色 0 起，逐角色独立掷、妊娠者跳过', () => {
  for (const pair of PAIRS) {
    if (pair.hit !== 'each') continue;
    const { fixture, pregnancy } = pair_world(pair);
    // 角色 0 也备货：REPEAT CHARANUM 自 0 起（:172/:181/:190）
    fixture.store.set(`cflag:${MASTER}:${POOL[pair.kind]}`, 1);
    // 角色 32 妊娠中 → 必须被跳过，它的池保持不动
    fixture.store.set(`talent:${ASSI}:153`, 1);
    fixture.store.set(`cflag:${ASSI}:${POOL[pair.kind]}`, 1);

    pregnancy[`in_vagina_${pair.name}`](seq([0, 0]));

    assert.equal(
      fixture.store.get(`cflag:${MASTER}:102`),
      pair.kind,
      `${pair.name}：REPEAT CHARANUM 自 0 起，角色 0 也在受检之列`,
    );
    assert.equal(
      fixture.store.get(`cflag:${SLAVE}:102`),
      pair.kind,
      `${pair.name}：角色 31 受检`,
    );
    assert.equal(
      fixture.store.get(`cflag:${ASSI}:102`) ?? 0,
      0,
      `${pair.name}：妊娠中的角色 32 必须被跳过`,
    );
    assert.equal(
      fixture.store.get(`cflag:${ASSI}:${POOL[pair.kind]}`),
      1,
      `${pair.name}：被跳过的角色精液池不动`,
    );
  }
});

test('CONCEPTION_CHECK 十二组：妊娠相手为本组码且无预产日时落定产日与父亲', () => {
  for (const pair of PAIRS) {
    const { fixture, pregnancy } = pair_world(pair);
    const cid = hit_cid(pair);
    fixture.store.set(`cflag:${cid}:102`, pair.kind); // 妊娠相手 = 本组
    fixture.store.set('flag:10000', 7); // DAY:0

    assert.equal(
      pregnancy[`conception_check_${pair.name}`](seq([5])),
      0,
      `${pair.name}：原作函数一律 RETURN 0`,
    );
    assert.equal(
      fixture.store.get(`cflag:${cid}:110`),
      7 + 10 + 5,
      `${pair.name}：预产日 = DAY + 10 + RAND:6`,
    );
    assert.equal(
      fixture.store.get(`cflag:${cid}:111`),
      pair.father,
      `${pair.name}：孩子父亲码`,
    );
    assert.equal(
      fixture.store.get(`cstr:${cid}:2`) ?? '',
      pair.father_name ?? '',
      `${pair.name}：NID 码组同步写父亲名字，数字码组不写`,
    );
  }
});

test('CONCEPTION_CHECK 十二组：妊娠相手码不符时整组不动作', () => {
  for (const pair of PAIRS) {
    const { fixture, pregnancy } = pair_world(pair);
    const cid = hit_cid(pair);
    fixture.store.set(`cflag:${cid}:102`, pair.kind === 1 ? 2 : 1); // 换成别组
    fixture.store.set('flag:10000', 7);

    pregnancy[`conception_check_${pair.name}`](seq([]));
    assert.equal(
      fixture.store.get(`cflag:${cid}:110`) ?? 0,
      0,
      `${pair.name}：妊娠相手码不符时不得落定产日`,
    );
  }
});

test('CONCEPTION_CHECK 十二组：已有预产日或已妊娠时不重复落定', () => {
  for (const pair of PAIRS) {
    const cid = hit_cid(pair);

    // 已有预产日（:110 > 0）
    const a = pair_world(pair);
    a.fixture.store.set(`cflag:${cid}:102`, pair.kind);
    a.fixture.store.set(`cflag:${cid}:110`, 99);
    a.pregnancy[`conception_check_${pair.name}`](seq([]));
    assert.equal(
      a.fixture.store.get(`cflag:${cid}:110`),
      99,
      `${pair.name}：已有预产日时不得改写`,
    );

    // 已妊娠（TALENT:153）
    const b = pair_world(pair);
    b.fixture.store.set(`cflag:${cid}:102`, pair.kind);
    b.fixture.store.set(`talent:${cid}:153`, 1);
    b.pregnancy[`conception_check_${pair.name}`](seq([]));
    assert.equal(
      b.fixture.store.get(`cflag:${cid}:110`) ?? 0,
      0,
      `${pair.name}：妊娠中不得落定产日`,
    );
  }
});

test('CONCEPTION_CHECK 十二组：主体指针落到主人位（0）时整组早退', () => {
  for (const pair of PAIRS) {
    if (pair.cc.length === 0) continue;
    const world = { ...pair.world };
    if (pair.cc.includes('target')) world.target = 0;
    if (pair.cc.includes('assi')) world.assi = 0;

    const { fixture, pregnancy } = setup_world(world);
    const cid = hit_cid(pair);
    fixture.store.set(`cflag:${cid}:102`, pair.kind);
    fixture.store.set('flag:10000', 7);

    pregnancy[`conception_check_${pair.name}`](seq([]));
    assert.equal(
      fixture.store.get(`cflag:${cid}:110`) ?? 0,
      0,
      `${pair.name}：主体不在场时不得落定产日`,
    );
  }
});

test('CONCEPTION_CHECK：T_TO_A 的 CONCEPTION 侧另查目标（:357 比 :127 严）', () => {
  // 不对称守卫的专职用例：助手在场、目标不在场——IN_VAGINA 侧照掷，
  // CONCEPTION 侧整组早退。两侧混为一谈时本用例必红
  const first = pair_world(
    PAIRS.find((p) => p.name === 't_to_a'),
    {
      target: -1,
    },
  );
  first.pregnancy.in_vagina_t_to_a(seq([0]));
  assert.equal(
    first.fixture.store.get(`cflag:${ASSI}:102`),
    3,
    'IN_VAGINA_T_TO_A 只查助手在场（:127），目标不在场也照掷',
  );

  const second = pair_world(
    PAIRS.find((p) => p.name === 't_to_a'),
    {
      target: -1,
    },
  );
  second.fixture.store.set(`cflag:${ASSI}:102`, 3);
  second.fixture.store.set('flag:10000', 7);
  second.pregnancy.conception_check_t_to_a(seq([5]));
  assert.equal(
    second.fixture.store.get(`cflag:${ASSI}:110`) ?? 0,
    0,
    'CONCEPTION_CHECK_T_TO_A 另查目标在场（:357），目标不在场即早退',
  );
});

test('IN_VAGINA_ALL：九连调顺序与逐组痕迹（写入序列逐项钉死）', () => {
  const { fixture, pregnancy } = setup_world({
    target: SLAVE,
    assi: ASSI,
    dog: true, // :53 的 D_TO_T 是 kind 5，先过兽耳守卫（:224）
  });
  // 九组各自的池都备货，让每一组都留下可辨认的痕迹
  for (const kind of [1, 2, 3, 4, 5, 6, 7]) {
    for (const cid of ALL_CIDS) {
      fixture.store.set(`cflag:${cid}:${POOL[kind]}`, 1);
    }
  }
  // 每组的掷都取 0（必命中）；上界最小的一组是池 = 1 的 [6,2] 支 → 18
  assert.equal(pregnancy.in_vagina_all(seq([0, 0, 0, 0, 0, 0, 0, 0, 0])), 0);
  // 九连调的顺序（:48-56）只由「最后写入者胜出」可见——逐项钉死
  assert.deepEqual(
    fixture.var_writes
      .filter((w) => w.name.endsWith(':102'))
      .map((w) => [w.name, w.value]),
    [
      [`cflag:${SLAVE}:102`, 1], // :48 IN_VAGINA_M_TO_T
      [`cflag:${ASSI}:102`, 1], // :49 IN_VAGINA_M_TO_A
      [`cflag:${MASTER}:102`, 3], // :50 IN_VAGINA_T_TO_M
      [`cflag:${SLAVE}:102`, 2], // :51 IN_VAGINA_A_TO_T
      [`cflag:${ASSI}:102`, 3], // :52 IN_VAGINA_T_TO_A
      [`cflag:${SLAVE}:102`, 5], // :53 IN_VAGINA_D_TO_T
      [`cflag:${SLAVE}:102`, 6], // :54 IN_VAGINA_SYOKU_TO_T
      [`cflag:${MASTER}:102`, 6], // :55 IN_VAGINA_SYOKU_TO_M
      [`cflag:${MASTER}:102`, 7], // :56 IN_VAGINA_KYOUOU_TO_M
    ],
    '九连调的调用顺序与各自的妊娠相手码',
  );
});

test('CONCEPTION_CHECK_ALL：九连调按受检者各自落定，写入序列逐项钉死', () => {
  const { fixture, pregnancy } = setup_world({ target: SLAVE, assi: ASSI });
  fixture.store.set('flag:10000', 3); // DAY:0
  // 三个受检者各挂一个不同的来源码，让九连调里的三组各自点火
  fixture.store.set(`cflag:${SLAVE}:102`, 1); // :67 CONCEPTION_CHECK_M_TO_T
  fixture.store.set(`cflag:${ASSI}:102`, 3); // :71 CONCEPTION_CHECK_T_TO_A
  fixture.store.set(`cflag:${MASTER}:102`, 7); // :75 CONCEPTION_CHECK_KYOUOU_TO_M

  assert.equal(pregnancy.conception_check_all(seq([4, 4, 4])), 0);
  assert.deepEqual(
    fixture.var_writes
      .filter((w) => w.name.endsWith(':110'))
      .map((w) => [w.name, w.value]),
    [
      [`cflag:${SLAVE}:110`, 17], // :67 M_TO_T（3 + 10 + 4）
      [`cflag:${ASSI}:110`, 17], // :71 T_TO_A
      [`cflag:${MASTER}:110`, 17], // :75 KYOUOU_TO_M
    ],
    '三处落定的顺序与预产日',
  );
  assert.equal(
    fixture.store.get(`cflag:${SLAVE}:111`),
    0,
    '主人来源的孩子父亲码是 0（:312）',
  );
  assert.equal(
    fixture.store.get(`cflag:${ASSI}:111`),
    10032,
    '奴隶来源的孩子父亲 = NID(TARGET)+1（:361）',
  );
  assert.equal(
    fixture.store.get(`cflag:${MASTER}:111`),
    -4,
    '狂王来源的孩子父亲码是 -4（:420）',
  );
});

test('IN_VAGINA_ALL / CONCEPTION_CHECK_ALL 的整体守卫：指针越界时九组一个都不跑', () => {
  const stocked = (fixture) => {
    for (const kind of [1, 2, 3, 4, 5, 6, 7]) {
      for (const cid of ALL_CIDS) {
        fixture.store.set(`cflag:${cid}:${POOL[kind]}`, 1);
      }
    }
  };

  // 序列给足九组（守卫删掉时九组都会掷），断言落在「一笔都没写」上——
  // 比 seq([]) 的「不该有抽取」多钉一层：那次红是抽取超界的红，看不出
  // 写入面被打开了
  const full_seq = () => seq([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  // TARGET 指向不存在的位置（:44 TARGET < 0 || TARGET >= CHARANUM）
  const bad_target = setup_world({ target: 99, assi: ASSI, dog: true });
  stocked(bad_target.fixture);
  bad_target.pregnancy.in_vagina_all(full_seq());
  assert.deepEqual(
    bad_target.fixture.var_writes.filter((w) => w.name.endsWith(':102')),
    [],
    'TARGET 越界时 IN_VAGINA_ALL 整组早退',
  );

  // ASSI 指向不存在的位置（:46 ASSI >= CHARANUM）
  const bad_assi = setup_world({ target: SLAVE, assi: 99, dog: true });
  stocked(bad_assi.fixture);
  bad_assi.pregnancy.in_vagina_all(full_seq());
  assert.deepEqual(
    bad_assi.fixture.var_writes.filter((w) => w.name.endsWith(':102')),
    [],
    'ASSI 越界时 IN_VAGINA_ALL 整组早退（连 TARGET 组也不跑）',
  );

  // ASSI = -1 是「没有助手」，不是「越界」：守卫放行，助手相关的五组
  // 各自被自己那一层的 `ASSI >= 1` 拦下，其余四组照跑
  const no_assi = setup_world({ target: SLAVE, assi: -1, dog: true });
  stocked(no_assi.fixture);
  assert.equal(no_assi.pregnancy.in_vagina_all(seq([0, 0, 0, 0, 0, 0])), 0);
  assert.deepEqual(
    no_assi.fixture.var_writes
      .filter((w) => w.name.endsWith(':102'))
      .map((w) => [w.name, w.value]),
    [
      [`cflag:${SLAVE}:102`, 1], // :48 M_TO_T
      [`cflag:${MASTER}:102`, 3], // :50 T_TO_M
      [`cflag:${SLAVE}:102`, 5], // :53 D_TO_T
      [`cflag:${SLAVE}:102`, 6], // :54 SYOKU_TO_T
      [`cflag:${MASTER}:102`, 6], // :55 SYOKU_TO_M
      [`cflag:${MASTER}:102`, 7], // :56 KYOUOU_TO_M
    ],
    'ASSI = -1 放行：非助手组照跑，:49/:51/:52 三组被各自的 `ASSI >= 1` 拦下',
  );

  // CONCEPTION_CHECK_ALL 同款守卫（同样给足序列，断言落在零写入上）：
  // ASSI 越界时连 TARGET 组也不跑
  const cc_bad = setup_world({ target: SLAVE, assi: 99 });
  cc_bad.fixture.store.set(`cflag:${SLAVE}:102`, 1);
  cc_bad.fixture.store.set('flag:10000', 3);
  cc_bad.pregnancy.conception_check_all(full_seq());
  assert.deepEqual(
    cc_bad.fixture.var_writes.filter((w) => w.name.endsWith(':110')),
    [],
    'ASSI 越界时 CONCEPTION_CHECK_ALL 整组早退',
  );

  const cc_bad_target = setup_world({ target: 99, assi: ASSI });
  cc_bad_target.fixture.store.set('cflag:99:102', 1);
  cc_bad_target.fixture.store.set('flag:10000', 3);
  cc_bad_target.pregnancy.conception_check_all(full_seq());
  assert.deepEqual(
    cc_bad_target.fixture.var_writes.filter((w) => w.name.endsWith(':110')),
    [],
    'TARGET 越界时 CONCEPTION_CHECK_ALL 整组早退（指针所指的角色也不落定）',
  );
});

// —— 育儿室三函数（:452-514）与页面接线（#401） ——

/** 只要「一个可用的角色表」的靶场（育儿室三函数不碰精液池） */
function setup_care() {
  const { fixture, era_flag, pregnancy } = setup_world({ target: SLAVE });
  return { fixture, era_flag, pregnancy };
}

test('CHECK_ABLE_TO_CHILD_CARE：四档返回值各走一次，且档序照原作先判 ARG == 0', () => {
  const { fixture, pregnancy } = setup_care();
  const able = pregnancy.check_able_to_child_care;

  // :485-487 状态位既不是 2 也不是 10 → 3（该角色不在育儿室）
  assert.equal(able(SLAVE), 3);
  // :482-484 侵攻中的勇者 → 2
  fixture.store.set(`cflag:${SLAVE}:1`, 2);
  assert.equal(able(SLAVE), 2);
  // :489 育儿室（CFLAG:1 == 10）→ 0
  fixture.store.set(`cflag:${ASSI}:1`, 10);
  assert.equal(able(ASSI), 0);
  // :479-481 ARG == 0 是第一档：状态位写着 2 也仍然回 1（档序写反必红）
  fixture.store.set('cflag:0:1', 2);
  assert.equal(able(0), 1);
  fixture.store.set('cflag:0:1', 10);
  assert.equal(able(0), 1, '角色 0 恒走第一档——「你不在育儿室」优先于状态位');
});

test('SHOW_BUTTON_CHILD_CARE：只有判定为 0 才渲染按钮（:466 的 SETCOLOR 在 RETURN 0 之后，是死代码）', () => {
  const { fixture, pregnancy } = setup_care();
  const buttons = () => fixture.lines.filter((line) => line.type === 'button');

  assert.equal(pregnancy.show_button_child_care(5, SLAVE), 0);
  assert.deepEqual(
    buttons(),
    [],
    '不在育儿室的角色不渲染按钮（:464 的 ELSEIF LOCAL != 0 → RETURN 0）',
  );

  fixture.store.set(`cflag:${ASSI}:1`, 10);
  assert.equal(pregnancy.show_button_child_care(5, ASSI), 0);
  assert.deepEqual(
    buttons().map((b) => b.rendered),
    ['[5] 前往育儿室'],
    '可访问时渲染按钮；正文不带手写 [编号] 前缀（引擎自己拼，见 AGENTS.md）',
  );

  // 侵攻中的勇者同样不渲染（:459-461 的第一档）
  fixture.store.set(`cflag:${SLAVE}:1`, 2);
  fixture.lines.length = 0;
  pregnancy.show_button_child_care(5, SLAVE);
  assert.deepEqual(buttons(), [], '侵攻中的勇者不渲染按钮');
});

test('CHILD_CARE_CHARA：三条早退分支——不在育儿室 / 侵攻中的勇者 / 角色不在育儿室', async () => {
  const { fixture, pregnancy } = setup_care();

  // 角色 0：你不在育儿室（:498-499）
  assert.equal(await pregnancy.child_care_chara(0), 0);
  assert(
    fixture.lines_history.some((line) => line.text === '你不在育儿室。'),
    ':499 的播报',
  );

  // 侵攻中的勇者：返回 2 是原作的防御支（:500-502），且不打印任何话术
  fixture.store.set(`cflag:${SLAVE}:1`, 2);
  const before = fixture.lines_history.length;
  assert.equal(await pregnancy.child_care_chara(SLAVE), 2);
  assert.equal(
    fixture.lines_history.length,
    before,
    '侵攻中的勇者支不打印任何东西（按钮本不该显示）',
  );

  // 角色不在育儿室（:503-504）
  assert.equal(await pregnancy.child_care_chara(ASSI), 0);
  assert(
    fixture.lines_history.some((line) => line.text === '该角色不在育儿室。'),
    ':504 的播报',
  );
});

test('CHILD_CARE_CHARA：可访问时进入育儿室，TARGET 指向该角色并带事件码 13 调 SELF_KOJO', async () => {
  const { fixture, era_flag, pregnancy } = setup_care();
  fixture.store.set(`cflag:${SLAVE}:1`, 10); // 在育儿室
  // 先把 TARGET 挪到别的角色：不挪的话「:511 TARGET = ARG 没落地」也看不出来
  fixture.store.set('flag:10005', ASSI);

  // 口上探针：口上族按 GET_KOJO_NUM() - 100 分发，素质 160 档 → 编号 100 → 族内 0
  const { self_kojo_family } = fixture.load_module('kojo/kojo-system');
  const { game } = fixture.load_module('facade/game');
  let seen_event = null;
  self_kojo_family.register(0, async () => {
    seen_event = game.train.初吻与自我口上;
    return 0;
  });
  fixture.store.set('flag:7', 1); // 口上总开关
  fixture.store.set(`talent:${SLAVE}:160`, 1);

  assert.equal(await pregnancy.child_care_chara(SLAVE), 0);
  assert(
    fixture.lines_history.some(
      (line) => line.text === '你去了角色31的育儿室。',
    ),
    ':509 的到访播报（SAVESTR 读 callname）',
  );
  assert.equal(era_flag.target, SLAVE, ':511 TARGET = ARG');
  assert.equal(
    seen_event,
    13,
    ':512 TFLAG:13 = 13 的事件码经调教外通道传进口上',
  );
  assert.equal(
    fixture.store.get('tflag:13'),
    undefined,
    'tflag 桶只存在于调教期，事件码不得落到 tflag（引擎侧会崩）',
  );
  assert.equal(
    fixture.store.get('tflag:15'),
    undefined,
    '调教外调 self_kojo 不得写 TFLAG:15（FLAG:7 <= 0 时的那条回落）',
  );

  // 上面那支走的是 FLAG:7 > 0 的正路；关掉总开关才走得到 TFLAG:15 的回落支
  const off = setup_care();
  off.fixture.store.set(`cflag:${SLAVE}:1`, 10);
  off.fixture.store.set('flag:7', 0); // 口上总开关关
  assert.equal(await off.pregnancy.child_care_chara(SLAVE), 0);
  assert.equal(
    off.fixture.store.get('tflag:15'),
    undefined,
    '调教外关闭口上开关时同样不得写 TFLAG:15（self_kojo 的第三参为真）',
  );
  assert.equal(
    off.fixture.store.get('tflag:13'),
    undefined,
    '事件码也不落 tflag',
  );
});

test('IN_VAGINA：男性或未熟的主体在 NAKADASHI_CHECK 里早退，且不清池', () => {
  for (const [label, talent] of [
    ['男人（TALENT:122）', 122],
    ['未熟（TALENT:135）', 135],
  ]) {
    const { fixture, pregnancy } = pair_world(PAIRS[0]); // m_to_t
    fixture.store.set(`talent:${SLAVE}:${talent}`, 1);

    pregnancy.in_vagina_m_to_t(seq([]));
    assert.equal(
      fixture.store.get(`cflag:${SLAVE}:102`) ?? 0,
      0,
      `${label} 不得受胎`,
    );
    assert.equal(
      fixture.store.get(`cflag:${SLAVE}:101`),
      1,
      `${label} 的早退不清池（:220 是 RETURN 0，没有清池那一笔）`,
    );
  }
});

test('IN_VAGINA：兽奸（kind 5）在非兽耳主体上早退且不清池', () => {
  // 对照组：带兽耳则照常受胎（上方维度用例已覆盖），此处只钉否定侧
  const dog_pair = PAIRS.find((pair) => pair.name === 'd_to_t');
  const { fixture, pregnancy } = pair_world(dog_pair, { dog: false });
  assert.equal(fixture.store.get(`talent:${SLAVE}:124`) ?? 0, 0, '无兽耳');

  pregnancy.in_vagina_d_to_t(seq([]));
  assert.equal(
    fixture.store.get(`cflag:${SLAVE}:102`) ?? 0,
    0,
    '非兽耳（TALENT:124 == 0）时兽奸不受胎（:224）',
  );
  assert.equal(fixture.store.get(`cflag:${SLAVE}:106`), 1, '该早退同样不清池');
});

test('IN_VAGINA：中出量六档、排卵诱发剂、娇小与满月各自决定掷骰上界与成功阈值', () => {
  // 上界只以 rand 的实参形式暴露：捕获 n 即 `(系数 + 娇小*2) * HAIRANZAI`
  const probe = (setup, pool) => {
    const { fixture, pregnancy } = pair_world(PAIRS[0]);
    fixture.store.set(`cflag:${SLAVE}:101`, pool);
    setup(fixture);
    let upper = null;
    const rand = (n) => {
      upper = n;
      return n; // 越界都不取：只要上界，不要命中
    };
    pregnancy.in_vagina_m_to_t(rand);
    assert.ok(upper !== null, '必须掷过一次');
    return upper;
  };
  // 命中侧的读数：rand 返回指定值，读回 CFLAG:102（妊娠相手）
  const hit_probe = (pool, roll) => {
    const { fixture, pregnancy } = pair_world(PAIRS[0]);
    fixture.store.set(`cflag:${SLAVE}:101`, pool);
    pregnancy.in_vagina_m_to_t(() => roll);
    return fixture.store.get(`cflag:${SLAVE}:102`) ?? 0;
  };
  const none = () => {};

  // :253-271 六档：系数 6/5/4/3/2/1（池 1/5/10/15/20/25），HAIRANZAI = 3；
  // 第三列是成功阈值（:256 的 `rand(upper) <= success`）
  const LADDER = [
    [1, 18, 2],
    [4, 18, 2], // 池 < 5 仍在最低档（边界另一侧）
    [5, 15, 2],
    [9, 15, 2],
    [10, 12, 2],
    [14, 12, 2],
    [15, 9, 2],
    [19, 9, 2],
    [20, 6, 2],
    [24, 6, 2],
    [25, 3, 3],
    [40, 3, 3],
  ];
  for (const [pool, upper] of LADDER) {
    assert.equal(
      probe(none, pool),
      upper,
      `池 ${pool} → 上界 ${upper}（六档分界 5/10/15/20/25）`,
    );
  }

  // 同一张 LADDER 再走一遍量成功阈值那一列。上面那一趟的 rand 恒回实参 n，
  // `n <= success` 在 n <= 1 的档位恒真、在 n >= 3 的档位恒假——比较从不
  // 依赖 success 的取值，六档的阈值改一个都不红（#401 验收探针：:295 的
  // `[3, 2]` 改成 `[3, 3]` 全绿）。这里取值恰等于阈值 / 阈值 + 1 各一次：
  // 命中侧把 success 钉在 `>= 取值`、未命中侧钉在 `< 取值 + 1`，两合起来
  // success 只等于表里那个数。
  for (const [pool, , success] of LADDER) {
    assert.equal(
      hit_probe(pool, success),
      1,
      `池 ${pool}：取值 = 成功阈值 ${success} 时必须受胎（:256 的 <=）`,
    );
    assert.equal(
      hit_probe(pool, success + 1),
      0,
      `池 ${pool}：取值 = 阈值 + 1（${success + 1}）时不得受胎`,
    );
  }

  // :244 排卵剤：HAIRANZAI = 3 - CFLAG:109 * 2 —— 吃药的档位才算得出差别
  assert.equal(
    probe((f) => f.store.set(`cflag:${SLAVE}:109`, 1), 25),
    1,
    '排卵诱发剂 = 1 → HAIRANZAI = 1',
  );
  assert.equal(probe(none, 25), 3, '无排卵诱发剂 → HAIRANZAI = 3');

  // :254 娇小（TALENT:100）每级 +2 —— 池 25 的系数是 1，加一级 → (1+2)*3
  assert.equal(
    probe((f) => f.store.set(`talent:${SLAVE}:100`, 1), 25),
    9,
    '娇小 1 级 → 系数 +2',
  );

  // :247-251 人狼（TALENT:314 == 2）在 DAY:2 14-16 日：无排卵剂 → 2，有 → 1；
  // 窗口两侧的日子（13 / 17）走常规 3
  const wolf = (f, date) => {
    f.store.set(`talent:${SLAVE}:314`, 2);
    f.store.set('flag:10002', date);
  };
  assert.equal(
    probe((f) => wolf(f, 14), 25),
    2,
    '满月首日 14 在内',
  );
  assert.equal(
    probe((f) => wolf(f, 15), 25),
    2,
    '满月中日 15 在内',
  );
  assert.equal(
    probe((f) => wolf(f, 16), 25),
    2,
    '满月末日 16 在内',
  );
  assert.equal(
    probe((f) => wolf(f, 13), 25),
    3,
    '13 日不在窗口内',
  );
  assert.equal(
    probe((f) => wolf(f, 17), 25),
    3,
    '17 日不在窗口内',
  );
  assert.equal(
    probe((f) => {
      wolf(f, 15);
      f.store.set(`cflag:${SLAVE}:109`, 1);
    }, 25),
    1,
    '满月 + 排卵诱发剂 → 1',
  );
});

test('IN_VAGINA：命中判据是「上界内取值 ≤ 成功阈值」（阈值那一侧）', () => {
  // 池 20 → 系数 2、成功阈值 2、上界 6：rand 取 2 时 `<= 2` 命中、`< 2` 不命中。
  // 取到上界 6 的档位（最高档上界 3、阈值 3）永远命中，分不出这个边界
  const hit = pair_world(PAIRS[0]);
  hit.fixture.store.set(`cflag:${SLAVE}:101`, 20);
  hit.pregnancy.in_vagina_m_to_t(() => 2);
  assert.equal(
    hit.fixture.store.get(`cflag:${SLAVE}:102`),
    1,
    '取值恰等于成功阈值时命中',
  );

  const miss = pair_world(PAIRS[0]);
  miss.fixture.store.set(`cflag:${SLAVE}:101`, 20);
  miss.pregnancy.in_vagina_m_to_t(() => 3);
  assert.equal(
    miss.fixture.store.get(`cflag:${SLAVE}:102`) ?? 0,
    0,
    '取值大于阈值时不命中',
  );
});

test('NAKADASHI_CHECK：已有预产日 / 妊娠中 / 育儿中三者任一都清池且不受胎', () => {
  // 三个条件是同一支 OR（:232/:238）：三侧各走一次——只测一侧时，
  // 另外两侧的判据被删也看不出来
  for (const [label, setup] of [
    [
      '已有预产日（CFLAG:110 > 0）',
      (f) => f.store.set(`cflag:${SLAVE}:110`, 9),
    ],
    ['妊娠中（TALENT:153）', (f) => f.store.set(`talent:${SLAVE}:153`, 1)],
    ['育儿中（TALENT:154）', (f) => f.store.set(`talent:${SLAVE}:154`, 1)],
  ]) {
    const { fixture, pregnancy } = pair_world(PAIRS[0]);
    setup(fixture);

    pregnancy.nakadashi_check(SLAVE, 1, seq([]));
    assert.equal(
      fixture.store.get(`cflag:${SLAVE}:101`),
      0,
      `${label}：清池（:208/:239 的「妊娠不可でも膣射のリセット」）`,
    );
    assert.equal(
      fixture.store.get(`cflag:${SLAVE}:102`) ?? 0,
      0,
      `${label}：不得受胎`,
    );
  }
});
