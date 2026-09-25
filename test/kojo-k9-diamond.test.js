/**
 * ere/kojo/kojo-k9-diamond.js 的行为测试（issue #240：J30 口上·K9 ダイヤ）。
 *
 * 缝 = test/helpers/era-fixture.js。世界底座：黑方片（性格素质 169 →
 * GET_KOJO_NUM = 109 → 分发 key 9）。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_chara_0, join_slave_chara } = require('./helpers/chara');

// 世界底座：黑方片（素质 169 → GET_KOJO_NUM = 109 → 分发 key 9）入列调教
async function setup_k9(seed, selectcom = 0) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 20, '黑方片');
  fixture.era.beginTrain(0, 20);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 20;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = selectcom;
  fixture.store.set('talent:20:169', 1); // 黑方片 → GET_KOJO_NUM = 109
  fixture.store.set('flag:109', 1); // K9 存在标志
  fixture.store.set('flag:7', 2); // 口上总开关默认
  fixture.store.set('talent:0:122', 1); // MASTER 是男性
  if (seed) {
    seed(fixture, era_flag);
  }
  fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k9-diamond');
  return fixture;
}

// —— @EVENTTRAIN：存在标志一对 ——

test('@EVENTTRAIN #PRI 置存在标志、@EVENTEND #LATER 清 0（K9 一对）', async () => {
  const fixture = await setup_k9((f) => f.store.delete('flag:109'));
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.store.get('flag:109'), 1, 'K9 存在标志');
  assert.equal(fixture.store.get('flag:7'), 2); // 总开关随之默认开
  await emit('EVENTEND');
  assert.equal(fixture.store.get('flag:109'), 0);
});

// —— @EVENTTRAIN：初調教 CFLAG:201 状态机 ——

test('初調教（CFLAG:201 == 0）：人間分档，推进到 1', async () => {
  const fixture = await setup_k9();
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.text_lines()[0], '「哦，你就是传说中的魔王」');
  assert.equal(fixture.store.get('cflag:20:201'), 1, 'CFLAG:201 推进到 1');
});

test('初調教（CFLAG:201 == 0）：魔族分档（TALENT:314 == 9），附带魔族化标记', async () => {
  const fixture = await setup_k9((f) => f.store.set('talent:20:314', 9));
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(
    fixture.text_lines()[0],
    '黑方片在调教之前，被进行了魔族化改造。',
  );
  assert.equal(fixture.store.get('cflag:20:370'), 1, '魔族化标记');
  assert.equal(fixture.store.get('cflag:20:201'), 1);
});

test('屈服刻印分档（Lv1）：MARK:2==1 且 CFLAG:201<2，推进到 2', async () => {
  const fixture = await setup_k9((f) => {
    f.store.set('mark:20:2', 1);
    f.store.set('talent:20:9', 0); // 未崩坏
    f.store.set('cflag:20:201', 1);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(
    fixture.text_lines()[0],
    '「哼、这种调教没什么大不了的、我完全就没有什么感觉！」',
  );
  assert.equal(fixture.store.get('cflag:20:201'), 2, 'CFLAG:201 推进到 2');
});

test('崩坏後は K9_KOJO2 二回目以降へ（CFLAG:201 == 9 时直接岔走，不再重复崩坏台词）', async () => {
  const fixture = await setup_k9((f) => {
    f.store.set('talent:20:9', 1);
    f.store.set('cflag:20:201', 9);
    f.store.set('talent:0:122', 0); // 无名助手，让分支落到 K9_KOJO2 内部判定
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.ok(
    !fixture.text_lines().some((l) => l.includes('双眼毫无生气')),
    '崩坏只播一次，CFLAG:201 已是 9 时不重复触发崩坏台词',
  );
});

test('崩坏（TALENT:9==1 && CFLAG:201<9）：推进到 9，只播一次', async () => {
  const fixture = await setup_k9((f) => {
    f.store.set('talent:20:9', 1);
    f.store.set('cflag:20:201', 8);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(
    fixture.text_lines()[0],
    '黑方片双眼毫无生气。',
    '崩坏台词首句（守卫①放行才会执行到这里）',
  );
  assert.equal(fixture.store.get('cflag:20:201'), 9, 'CFLAG:201 推进到 9');
});

test('NTR再捕获（CFLAG:201>=1 && CFLAG:650==1）：爱慕臂清 NTR 开关', async () => {
  const fixture = await setup_k9((f) => {
    f.store.set('cflag:20:201', 2);
    f.store.set('cflag:20:650', 1);
    f.store.set('talent:20:85', 1); // 爱慕
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(
    fixture.store.get('cflag:20:650'),
    0,
    'NTR 开关清 0（守卫②放行才会执行到这里）',
  );
});

test('简易助手（黑方片本人，NO:ASSI==20）首次：默认分支推进 CFLAG:202 到 1', async () => {
  const fixture = await setup_k9((f) => {
    f.store.set('talent:20:9', 0);
    f.store.set('cflag:20:201', 9);
  });
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.assi = 20;
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.store.get('cflag:20:202'), 1, 'CFLAG:202 首次推进到 1');
});

// —— 家族注册接线（issue #240 自检 ④ top-level-wiring）——

test('20 个分发族全部注册了 K9（key 9）', async () => {
  const fixture = await setup_k9();
  const {
    kojo_message_com_family,
    self_kojo_family,
    kojo_message_palamcng_family,
    kojo_message_markcng_family,
    benki_koujo_family,
    enterenemy_koujo_family,
    dungeon_victory_family,
    dungeon_attack_family,
    ntr_koujo_family,
    exucution_koujo_family,
    museum_koujo_family,
    banishment_koujo_family,
    public_exucution_koujo_family,
    grotesque_koujo_family,
    gobi_koujo_family,
  } = fixture.load_module('kojo/kojo-system');
  const {
    gohoubi_after_koujo_family,
    osioski_koujo_family,
    gohoubi_request_koujo_family,
  } = fixture.load_module('kojo/kojo-dungeon-after');
  const { ryouzyoku_kojo_family, ryouzyoku_after_kojo_family } =
    fixture.load_module('kojo/kojo-dungeon-ravish');
  const families = [
    kojo_message_com_family,
    self_kojo_family,
    kojo_message_palamcng_family,
    kojo_message_markcng_family,
    benki_koujo_family,
    enterenemy_koujo_family,
    dungeon_victory_family,
    dungeon_attack_family,
    ntr_koujo_family,
    exucution_koujo_family,
    museum_koujo_family,
    banishment_koujo_family,
    public_exucution_koujo_family,
    grotesque_koujo_family,
    gobi_koujo_family,
    gohoubi_after_koujo_family,
    osioski_koujo_family,
    gohoubi_request_koujo_family,
    ryouzyoku_kojo_family,
    ryouzyoku_after_kojo_family,
  ];
  assert.equal(families.length, 20);
  for (const family of families) {
    assert.equal(family.has(9), true, `${family.name || '(族)'} 缺 K9 注册`);
  }
});

// —— @KOJO_MESSAGE_COM_9：指令口上族 + 头部七道守卫 ——

async function speak_k9(fixture, rand) {
  const { kojo_message_com_family } = fixture.load_module('kojo/kojo-system');
  return kojo_message_com_family.call(9, { args: [rand] });
}

test('SELECTCOM==0（爱抚）初回：CFLAG:301==0 按屈服刻印分档，推进到 1', async () => {
  const fixture = await setup_k9((f) => {
    f.store.set('mark:20:2', 2);
  }, 0);
  await speak_k9(fixture);
  assert.equal(
    fixture.text_lines()[0],
    '「真的…哼，这样的话我只要忍耐就…啊…啊啊啊！那样的地方不要碰啊！」',
  );
  assert.equal(fixture.store.get('cflag:20:301'), 1, 'CFLAG:301 推进到 1');
});

test('SELECTCOM==87（穿环）读 piercing_state.p（跨模块存活态）', async () => {
  const fixture = await setup_k9((f) => {
    f.store.set('talent:20:76', 1);
  }, 87);
  const { piercing_state } = fixture.load_module('system/train/piercing-state');
  piercing_state.p = 1;
  fixture.store.set('cflag:20:7', 1); // CFLAG:7 & P 命中（装着中）
  await speak_k9(fixture);
  assert.ok(
    fixture.text_lines().some((l) => l.includes('跟现在的我特别合适的装饰品')),
    'P==1 乳环文案缺失（piercing_state.p 未正确读取）',
  );
});

test('SELECTCOM==22 爱慕支：CFLAG:16 >= 0（已初吻）才出那句亲吻，未初吻不出', async () => {
  // 原作 :2438 与 :2448 都是 `SIF CFLAG:16 >= 0`——CFLAG:16 属 train 域
  // （chara-train.js 的 初吻对象，未経験は -1 初期化）。#493 复核发现的第 14 处：
  // 修前经 kojo 域切片别名读不存在的「初吻对象」，`undefined >= 0` 恒假、
  // 两句恒不出。RAND:3 与 RAND:2 两支各走一处，两支都断言。
  const seq_rand =
    (...draws) =>
    (n) => {
      const value = draws.shift() ?? 0;
      return value % n;
    };
  const cases = [
    {
      name: 'RAND:3 == 0 支',
      draws: [0],
      base: [
        '「啊嗯~…嗯~…最…最喜欢你了噢~…嗯~…嗯哼嗯~…♡」',
        '黑方片一副呆呆的样子被你抱住、因为从下往上的抽插带来的快感而从嘴边漏出了呻吟。',
      ],
      kiss: '一和黑方片的嘴唇重叠之后黑方片湿润的舌头就立马从缝隙中钻进来、从嘴边漏出了娇喘。',
    },
    {
      name: 'RAND:2 == 0 支',
      draws: [1, 0],
      base: [
        '「嗯~…嗯嗯~…这、这个好棒呢~…啊啊啊啊~…在被摩擦着…啊嗯~…哈啊啊啊~♡」',
        '黑方片的腰紧紧地压下来并且左右晃动着、小豆豆也充分地品味到了刺激。',
        '「啊啊~…嗯~…这个~…好厉害~…啊啊啊~♡」',
      ],
      kiss: '发出了十分淫乱的慷慨的黑方片如同要吃掉一样紧紧地抱住你、贪婪地亲吻着………',
    },
  ];
  for (const item of cases) {
    const kissed = await setup_k9((f) => {
      f.store.set('cflag:20:323', 1); // 对面座位二回目以降
      f.store.set('talent:20:85', 1); // 爱慕
      f.store.set('cflag:20:16', 5); // 已初吻（相手编号+1）
    }, 22);
    await speak_k9(kissed, seq_rand(...item.draws));
    assert.deepEqual(
      kissed.text_lines(),
      [...item.base, item.kiss],
      `${item.name}：已初吻应多出亲吻句`,
    );

    const virgin = await setup_k9((f) => {
      f.store.set('cflag:20:323', 1);
      f.store.set('talent:20:85', 1);
      f.store.set('cflag:20:16', -1); // 未初吻
    }, 22);
    await speak_k9(virgin, seq_rand(...item.draws));
    assert.deepEqual(
      virgin.text_lines(),
      item.base,
      `${item.name}：未初吻不得出亲吻句`,
    );
    assert.equal(kissed.store.get('cflag:20:323'), 5, '对面座位推进到 5');
  }
});

test('头部守卫①-⑦：ASSIPLAY/口塞/失神/兽奸/死斗场/崩坏/触手 各自静默跳过或岔走真身', async () => {
  const assiplay = await setup_k9((f, era_flag) => {
    era_flag.assi = 21;
    era_flag.assiplay = 1;
  }, 0);
  await speak_k9(assiplay);
  assert.deepEqual(assiplay.text_lines(), []);

  const gag = await setup_k9((f) => f.store.set('tequip:20:45', 1), 0);
  await speak_k9(gag);
  assert.deepEqual(gag.text_lines(), []);

  const fainted = await setup_k9((f) => f.store.set('tflag:899', 1), 0);
  await speak_k9(fainted);
  assert.deepEqual(fainted.text_lines(), []);

  const dog = await setup_k9((f) => {
    f.store.set('tequip:20:89', 1);
    f.store.set('mark:20:2', 2);
  }, 0);
  await speak_k9(dog);
  assert.deepEqual(
    dog.text_lines(),
    [''],
    '全篇为未填写模板（1:1），非头部守卫②等落到 SELECTCOM==0 的实际台词',
  );

  const colosseum = await setup_k9((f) => {
    f.store.set('tequip:20:55', 1);
    f.store.set('base:20:1', 0);
  }, 55);
  await speak_k9(colosseum);
  assert.deepEqual(colosseum.text_lines(), ['黑方片连站起来的力气都没有了……']);

  const broken = await setup_k9((f) => f.store.set('talent:20:9', 1), 0);
  await speak_k9(broken);
  assert.deepEqual(broken.text_lines(), []);

  const tentacle = await setup_k9((f) => f.store.set('tequip:20:90', 1), 0);
  await speak_k9(tentacle);
  assert.deepEqual(tentacle.text_lines(), []);
});

test('COLOSSEUM SELECTCOM==31：ITEM:PBAND(=4) 修正为 item:4，非字符串具名寻址', async () => {
  const fixture = await setup_k9((f) => {
    f.store.set('tequip:20:55', 1);
  }, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.assi = 21;
  fixture.store.set('talent:21:121', 0);
  fixture.store.set('talent:21:122', 0);
  fixture.store.set('item:4', 1); // PBAND
  era_flag.assiplay = 1;
  const { colosseum_kojo_9 } = fixture.load_module('kojo/kojo-k9-diamond');
  await colosseum_kojo_9();
  const lines = fixture.text_lines();
  assert.ok(
    lines.some((l) => l.includes('假阴茎')),
    'ITEM:PBAND 具名寻址未解析，假阴茎判定丢失',
  );
});

// —— @KOJO_MESSAGE_PALAMCNG_9 / @KOJO_MESSAGE_MARKCNG_9 ——

test('KOJO_MESSAGE_PALAMCNG_9：P = PALAM:3 + UP:3 首次超过 PALAMLV:2 触发润滑首超', async () => {
  const fixture = await setup_k9();
  fixture.store.set('palam:20:3', 600);
  fixture.store.set('delta:20:3', 0);
  fixture.store.set('talent:20:85', 1);
  const { kojo_message_palamcng_family } =
    fixture.load_module('kojo/kojo-system');
  await kojo_message_palamcng_family.call(9, { args: [] });
  assert.equal(fixture.store.get('cflag:20:221'), 1, 'CFLAG:221 首超推进到 1');
});

test('KOJO_MESSAGE_MARKCNG_9：苦痛刻印变动==3 且 CFLAG:297==0 触发苦痛刻印Lv3首次口上', async () => {
  const fixture = await setup_k9();
  fixture.store.set('tflag:22', 3);
  fixture.store.set('talent:20:85', 1); // 爱慕
  const { kojo_message_markcng_family } =
    fixture.load_module('kojo/kojo-system');
  await kojo_message_markcng_family.call(9, { args: [] });
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊啊~…好痛~…好痛呜呜~！已、已经忍不了了…啊啊~…啊呜啊啊～！」',
    '黑方片因为接近极限的痛苦流下了眼泪。',
    '「这样的…不…啊…啊啊啊啊~！已经…再这样下去的话…不要啊啊~！」',
  ]);
  assert.equal(fixture.store.get('cflag:20:297'), 1);
});

// —— @SELF_KOJO_K9 ——

test('SELF_KOJO_K9 TFLAG:13==1（自慰）崩坏分支：TALENT:9==1 时走崩坏台词', async () => {
  const fixture = await setup_k9((f) => f.store.set('talent:20:9', 1));
  const { game } = fixture.load_module('facade/game');
  game.train.初吻与自我口上 = 1;
  const { self_kojo_family } = fixture.load_module('kojo/kojo-system');
  await self_kojo_family.call(9, { args: [] });
  assert.equal(
    fixture.text_lines()[0],
    '黑方片就像被弄坏的玩具一样不停地自慰………',
  );
});

test('SELF_KOJO_K9 TFLAG:13==4（调教后性交）：s 读 peek_aftertrain_s()（跨模块全局 S）', async () => {
  const fixture = await setup_k9();
  const era_flag = fixture.load_module('era-utils/era-flag');
  const aftertrain = fixture.load_module('event/event-aftertrain');
  era_flag.target = 20;
  fixture.store.set('talent:20:85', 1); // 爱慕（AFTERTRAIN_SEX_CHECK 守卫）
  fixture.store.set('talent:20:0', 0); // 非处女
  fixture.store.set('talent:20:122', 0); // 非男性
  fixture.store.set('exp:20:5', 30);
  fixture.store.set('base:20:0', 500);
  fixture.store.set('talent:0:122', 1); // 主人男性
  fixture.store.set('abl:20:2', 6); // V感觉 → s += 3
  await aftertrain.aftertrain_sex_check(); // 内部 game.train.初吻与自我口上 = 4 后 CALL SELF_KOJO
  const lines = fixture.text_lines();
  assert.ok(
    lines.some((l) => l.includes('被中出了4回后露出满足的表情')),
    'S 阈值判定丢失（s>=3 支未触发）',
  );
});

// —— 迷宫战斗（DUNGEON_VICTORY / DUNGEON_ATTACK / RYOUZYOKU） ——

test('DUNGEON_VICTORY_K9：随机三选一 + 体力低于五成追加台词', async () => {
  const fixture = await setup_k9((f) => {
    f.store.set('base:20:0', 10);
    f.store.set('maxbase:20:0', 100);
    f.store.set('base:20:1', 100);
    f.store.set('maxbase:20:1', 100);
  });
  const { dungeon_victory_family } = fixture.load_module('kojo/kojo-system');
  await dungeon_victory_family.call(9, { args: [() => 0] });
  assert.deepEqual(fixture.text_lines(), [
    '「哼、当然的结果嘛！」',
    '（话说回来…这真是一个难看的胜利呀…）',
    '黑方片受到了很大的伤害，一瘸一拐地………',
  ]);
});

test('DUNGEON_ATTACK_K9：CFLAG:1（状态）区分侵攻/非侵攻文案', async () => {
  const fixture = await setup_k9((f) => f.store.set('cflag:20:1', 2));
  const { dungeon_attack_family } = fixture.load_module('kojo/kojo-system');
  await dungeon_attack_family.call(9, { args: [() => 0] });
  assert.deepEqual(fixture.text_lines(), ['「接招吧！」']);
});

test('DUNGEON_RYOUZYOKU_K9 / AFTER_K9：迷宫败北与凌辱结束口上', async () => {
  const fixture = await setup_k9((f) => {
    f.store.set('talent:20:0', 1); // 处女
  });
  const { ryouzyoku_kojo_family, ryouzyoku_after_kojo_family } =
    fixture.load_module('kojo/kojo-dungeon-ravish');
  await ryouzyoku_kojo_family.call(9, { args: [] });
  assert.deepEqual(fixture.text_lines(), [
    '「不…不要…我是不会将第一次交给你们的！」',
    '「呜呜~…等下绝对会复仇的…啊~…好疼…说了好疼了啊！」',
    '黑方片虽然被怪物们抓住了，但是其眼瞳中还有生气之光在闪烁着………',
  ]);
  const before = fixture.text_lines().length;
  fixture.store.set('exp:20:1', 0);
  fixture.store.set('exp:20:22', 0);
  fixture.store.set('exp:20:20', 0);
  await ryouzyoku_after_kojo_family.call(9, { args: [] });
  assert.deepEqual(fixture.text_lines().slice(before), [
    '「啊啊～…啊…啊啊啊……我，我还…还是…处女来的啊………」',
    '黑方片还是处女的情况下被凌辱了。',
  ]);
});

// —— 战果口上（GOHOUBI / OSIOKI / GOBI / BENKI / ENTERENEMY） ——

test('GOHOUBI_REQUEST_KOUJO_K9：CFLAG:A:504==0 请求金钱', async () => {
  const fixture = await setup_k9();
  const { gohoubi_request_koujo_family } = fixture.load_module(
    'kojo/kojo-dungeon-after',
  );
  await gohoubi_request_koujo_family.call(9, { args: [20, undefined] });
  assert.deepEqual(fixture.text_lines(), [
    '「我想要金钱作为奖励呢。对呢，十万左右应该够了吧~」',
  ]);
});

test('GOHOUBI_AFTER_KOUJO_K9 / OSIOKI_KOUJO_K9：choice 显式形参', async () => {
  const fixture = await setup_k9();
  const { gohoubi_after_koujo_family, osioski_koujo_family } =
    fixture.load_module('kojo/kojo-dungeon-after');
  await gohoubi_after_koujo_family.call(9, { args: [20, 0] });
  assert.deepEqual(fixture.text_lines(), ['「为、为什么啦！」']);
  const before = fixture.text_lines().length;
  await osioski_koujo_family.call(9, { args: [20, 0] });
  assert.deepEqual(fixture.text_lines().slice(before), ['「真、真是失礼了」']);
});

test('GOBI_KOUJO_K9：ARG:0 取语尾编号（返回文字，#570）', async () => {
  const fixture = await setup_k9();
  const { gobi_koujo_family } = fixture.load_module('kojo/kojo-system');
  const text = await gobi_koujo_family.call(9, { args: [3, () => 0] });
  assert.equal(text, '来的……。');
  assert.deepEqual(fixture.text_lines(), [], '语尾真身不得自行打印');
});

test('BENKI_KOUJO_K9：门面 game.train.肉便器行动 判据', async () => {
  const fixture = await setup_k9((f) => {
    f.store.set('talent:20:76', 1);
  });
  const { game } = fixture.load_module('facade/game');
  game.train.肉便器行动 = 0;
  const { benki_koujo_family } = fixture.load_module('kojo/kojo-system');
  await benki_koujo_family.call(9, { args: [] });
  assert.deepEqual(fixture.text_lines(), ['「更加地…更加地…弄脏我吧~…♡」']);
});

test('ENTERENEMY_KOUJO_K9：来袭口上按角色素质分岔', async () => {
  const fixture = await setup_k9((f) => {
    f.store.set('talent:20:76', 1);
  });
  const { enterenemy_koujo_family } = fixture.load_module('kojo/kojo-system');
  await enterenemy_koujo_family.call(9, { args: [] });
  assert.deepEqual(fixture.text_lines(), [
    '「只要去到魔王大人的房间的话、真的能被干了个爽吗~？」',
  ]);
});

// —— NTR / 处刑与展示口上小簇 ——

test('NTR_KOUJO_K9：P 分派编号 1（首次经 CFLAG:650 标记）', async () => {
  const fixture = await setup_k9((f) => {
    f.store.set('talent:20:85', 1);
  });
  const { ntr_koujo_family } = fixture.load_module('kojo/kojo-system');
  await ntr_koujo_family.call(9, { args: [undefined, 1] });
  assert.equal(
    fixture.store.get('cflag:20:650'),
    1,
    'CFLAG:650 首次标记写为 1',
  );
  assert.equal(fixture.store.get('cflag:20:651'), 1);
});

test('EXUCUTION / MUSEUM / BANISHMENT / PUBLIC_EXUCUTION_KOUJO_K9：注册且可调用', async () => {
  const fixture = await setup_k9();
  const {
    exucution_koujo_family,
    museum_koujo_family,
    banishment_koujo_family,
    public_exucution_koujo_family,
    grotesque_koujo_family,
  } = fixture.load_module('kojo/kojo-system');

  fixture.store.set('tflag:16', 4);
  await exucution_koujo_family.call(9, { args: [] });
  assert.deepEqual(fixture.text_lines(), [
    '「不、不要啊…我才不要成为怪物的安慰物还要差的肉便器啊！啊…不要啊啊啊！」',
  ]);

  let before = fixture.text_lines().length;
  fixture.store.set('tflag:500', 0);
  await museum_koujo_family.call(9, { args: [] });
  assert.deepEqual(fixture.text_lines().slice(before), [
    '「脚、脚被…脚慢慢地变冷了起来…我、我是要死了吧…拜托了…至少，至少回到最初的故…乡…里………………」',
  ]);

  before = fixture.text_lines().length;
  fixture.store.set('tflag:510', 0);
  await banishment_koujo_family.call(9, { args: [] });
  assert.deepEqual(fixture.text_lines().slice(before), [
    '「我失去作为战士的力量…已经………」',
  ]);

  before = fixture.text_lines().length;
  fixture.store.set('tflag:520', 0);
  await public_exucution_koujo_family.call(9, { args: [] });
  assert.deepEqual(fixture.text_lines().slice(before), [
    '「快杀了我吧…我的那里已经…裂开了…啊啊啊…已经什么都感觉不到了啊…啊啊…啊啊啊………」',
  ]);

  before = fixture.text_lines().length;
  fixture.store.set('tflag:530', 0);
  await grotesque_koujo_family.call(9, { args: [] });
  assert.deepEqual(
    fixture.text_lines().slice(before),
    [''],
    'GROTESQUE 分支路由错位（源无文本，PRINTFORMW 仍记空行）',
  );
});

// —— #623 拆行合并：原作同一行输出合成一条 era.print（整行断言） ——

/** 含该片段的第一行（合并后整行断言用；找不到返回 undefined） */
function line_with(fixture, fragment) {
  return fixture.text_lines().find((l) => l.includes(fragment));
}

test('#623 口塞初回：爱慕与それ以外两支的首段并入整行（:4146+:4148 / :4155+:4157）', async () => {
  const cases = [
    {
      label: '爱慕（TALENT:85）',
      seed: (f) => f.store.set('talent:20:85', 1),
      prefix: '黑方片好像在期待着什么',
      merged: '黑方片好像在期待着什么的样子………',
    },
    {
      label: 'それ以外',
      seed: () => {},
      prefix: '黑方片抗议的',
      merged: '黑方片抗议的左右甩起了脑袋………',
    },
  ];
  for (const item of cases) {
    for (const gagged of [true, false]) {
      const fixture = await setup_k9((f) => {
        f.store.set('tequip:20:45', 1);
        if (gagged) f.store.set('tequip:20:43', 1);
        item.seed(f);
      }, 45);
      await speak_k9(fixture);
      const lines = fixture.text_lines();
      const prefix = item.prefix;
      // 两支都拼前缀（#623：前缀提为局部量 line_head，各支拼接）——
      // 所以无论走哪一支，整行都成立、前缀都不再单独占一行
      assert.equal(
        lines.filter((l) => l === prefix).length,
        0,
        `${item.label}：前缀不得单独成行`,
      );
      assert.equal(
        line_with(fixture, prefix),
        gagged ? item.merged : `${prefix}的眼神看着你………`,
        `${item.label}：${gagged ? 'TRUE' : 'ELSE'} 支整行`,
      );
      assert.equal(
        fixture.store.get('cflag:20:346'),
        1,
        `${item.label}：口塞计数推进到 1`,
      );
    }
  }
});

test('#623 口塞二回目：七档首段并入整行（:4169..:4236）', async () => {
  const cases = [
    {
      label: '淫乱＋受虐狂Lv5',
      talent: 76,
      abl21: 5,
      merged: '黑方片好像在期待着什么的样子………',
      cflag: 9,
    },
    {
      label: '淫乱＋受虐狂Lv3',
      talent: 76,
      abl21: 3,
      merged: '黑方片好像在期待着什么的样子………',
      cflag: 8,
    },
    {
      label: '爱慕＋受虐狂Lv5',
      talent: 85,
      abl21: 5,
      merged: '黑方片好像在期待着什么的样子……………',
      cflag: 6,
    },
    {
      label: '爱慕＋受虐狂Lv3',
      talent: 85,
      abl21: 3,
      merged: '黑方片好像在期待着什么的样子………',
      cflag: 5,
    },
    {
      label: '爱慕',
      talent: 85,
      abl21: 0,
      merged: '黑方片好像在期待着什么的样子………',
      cflag: 4,
    },
    {
      label: '受虐狂Lv3',
      abl21: 3,
      merged: '黑方片好像在期待着什么的样子…………',
      cflag: 3,
    },
    {
      label: 'それ以外',
      abl21: 0,
      merged: '黑方片抗议的左右甩起了脑袋………',
      cflag: 2,
    },
  ];
  for (const item of cases) {
    const fixture = await setup_k9((f) => {
      f.store.set('tequip:20:45', 1);
      f.store.set('tequip:20:43', 1);
      f.store.set('cflag:20:346', 1); // 非 0 → 二回目 arm
      if (item.talent) f.store.set(`talent:20:${item.talent}`, 1);
      f.store.set('abl:20:21', item.abl21);
    }, 45);
    await speak_k9(fixture);
    assert.ok(
      fixture.text_lines().includes(item.merged),
      `${item.label}：首段并入整行`,
    );
    assert.equal(
      fixture.store.get('cflag:20:346'),
      item.cflag,
      `${item.label}：口塞计数`,
    );
  }
});

test('#623 交谈录像：自我介绍整行合并（:4424+:4426+:4427 / :4475+:4477+:4478）', async () => {
  for (const replay of [false, true]) {
    const cases = [
      {
        abl31: 3,
        merged:
          '黑方片将自己的本名、接下来要进行的性体验还有手淫时妄想的内容十分兴奋地说了出来……',
      },
      {
        abl31: 0,
        merged: '黑方片将自己的本名、接下来要进行的性体验十分兴奋地说了出来……',
      },
    ];
    for (const item of cases) {
      const fixture = await setup_k9((f) => {
        if (replay) f.store.set('cflag:20:357', 9);
        f.store.set('tequip:20:53', 1);
        f.store.set('talent:20:89', 1);
        f.store.set(`abl:20:31`, item.abl31);
      }, 56);
      await speak_k9(fixture, () => 0);
      assert.ok(
        fixture.text_lines().includes(item.merged),
        `${replay ? '二回目' : '初回'} 自慰中毒 ${item.abl31}：整行`,
      );
    }
  }
});

test('#623 交谈：六支各自并入前缀整行（:4440+:4442 / :4446.. / :4491+:4493 / :4497..）', async () => {
  for (const replay of [false, true]) {
    const phase = replay ? '二回目' : '初回';
    // PALAMLV[4] 是内建常量 10000、PALAMLV[2] = 500（era-utils/palam-level）；
    // :4440 / :4491 的无后缀 PRINTFORM 前缀提到语句外，六支都拼它（#623）
    const merge_cases = [
      {
        // 首支：PALAM:5 >= PALAMLV:4 && (TALENT:85 || ABL:10 >= 5) && TFLAG:60
        label: '首支',
        seed: (f) => {
          f.store.set('palam:20:5', 10000);
          f.store.set('tflag:60', 1);
          f.store.set('talent:20:85', 1);
        },
        expected: '你向她搭话后、黑方片晃动着腰部继续说着充满爱意的话语',
      },
      {
        // 第二支：PALAM:5 >= PALAMLV:4 && (TALENT:76 || ABL:11 >= 5) && TFLAG:60
        label: '第二支',
        seed: (f) => {
          f.store.set('palam:20:5', 10000);
          f.store.set('tflag:60', 1);
          f.store.set('talent:20:76', 1);
        },
        expected: '你向她搭话后、黑方片晃动着腰继续说着卑劣的话语',
      },
      {
        // 第四支：PALAM:4 >= PALAMLV:4 || TALENT:85 || ABL:10 >= 5
        label: '第四支',
        seed: (f) => f.store.set('palam:20:4', 10000),
        expected: '你向她搭话后、黑方片如同打发无聊地一样喋喋不休地回起话来了',
      },
      {
        // 第五支：PALAM:4 >= PALAMLV:2 || ABL:10 >= 3
        label: '第五支',
        seed: (f) => f.store.set('palam:20:4', 500),
        expected: '你向她搭话后、黑方片一点一点地说起话来了，',
      },
      {
        // 第六支（ELSE）：其余条件全不成立
        label: '第六支',
        seed: () => {},
        expected: '你向她搭话后、然而黑方片完全没有听进去的样子…',
      },
    ];
    for (const item of merge_cases) {
      const fixture = await setup_k9((f) => {
        if (replay) f.store.set('cflag:20:357', 9);
        item.seed(f);
      }, 56);
      await speak_k9(fixture, () => 0);
      assert.ok(
        fixture.text_lines().includes(item.expected),
        `${phase} ${item.label}：并入 :4440/:4491 前缀的整行`,
      );
      assert.equal(
        fixture.text_lines().filter((l) => l === '你向她').length,
        0,
        `${phase} ${item.label}：前缀不得再单独成行`,
      );
    }

    // 第三支：PALAM:4 >= PALAMLV:4 && PALAM:5 >= PALAMLV:4，两互斥插入段三档
    const cases = [
      { tequip: 11, word: '快乐的' },
      { tequip: 44, word: '苦痛的' },
      { tequip: undefined, word: '' },
    ];
    for (const item of cases) {
      const fixture = await setup_k9((f) => {
        if (replay) f.store.set('cflag:20:357', 9);
        f.store.set('palam:20:4', 10000);
        f.store.set('palam:20:5', 10000);
        f.store.set('tflag:60', 0);
        if (item.tequip !== undefined)
          f.store.set(`tequip:20:${item.tequip}`, 1);
      }, 56);
      await speak_k9(fixture, () => 0);
      assert.ok(
        fixture
          .text_lines()
          .includes(
            `你向她搭话后、黑方片就发出了${item.word}娇喘声，拼命地回起话来了。`,
          ),
        `${phase} tequip=${item.tequip}：第三支并入整行`,
      );
      assert.equal(
        fixture.text_lines().filter((l) => l === '你向她').length,
        0,
        `${phase} tequip=${item.tequip}：前缀不得再单独成行`,
      );
    }
  }
});

test('#623 死斗场：助手器具名并入整行（:7085.. / :7119.. / :7144..）', async () => {
  const groups = [
    {
      selectcom: 31,
      head: '看着黑方片舔着',
      tail: '露出了十分愉悦的表情……',
    },
    {
      selectcom: 21,
      head: '听着黑方片的悲鸣继续用',
      tail: '来毫不留情地蹂蹑的黑方片的小穴。',
    },
    {
      selectcom: 27,
      head: '一边听着黑方片的悲鸣一边用',
      tail: '毫不留情地继续蹂蹑黑方片的屁眼。',
    },
  ];
  const cases = [
    { label: '性器', penis: 1, band: 0, word: '阴茎' },
    { label: '假阴茎', penis: 0, band: 1, word: '假阴茎' },
    { label: '两者皆无', penis: 0, band: 0, word: '' },
  ];
  for (const group of groups) {
    for (const item of cases) {
      const fixture = await setup_k9((f) => {
        f.store.set('tequip:20:55', 1);
        f.store.set('talent:21:121', item.penis);
        f.store.set('talent:21:122', 0);
        f.store.set('item:4', item.band); // PBAND
      }, group.selectcom);
      fixture.seed_chara(21, { id: 21, name: '玛奥', callname: '玛奥' });
      fixture.era.addCharacter(21);
      const era_flag = fixture.load_module('era-utils/era-flag');
      era_flag.assi = 21;
      era_flag.assiplay = 1;
      const { colosseum_kojo_9 } = fixture.load_module('kojo/kojo-k9-diamond');
      await colosseum_kojo_9();
      assert.ok(
        fixture
          .text_lines()
          .includes(`玛奥${group.head}${item.word}${group.tail}`),
        `SELECTCOM==${group.selectcom} ${item.label}：并入整行`,
      );
    }
  }
});

test('#623 奖赏请求：野兽名并入整行（:7414+:7416+:7418+:7420+:7422）', async () => {
  const cases = [
    { 要求: 1, beast: '狗' },
    { 要求: 2, beast: '猪' },
    { 要求: 3, beast: '马' },
  ];
  for (const item of cases) {
    const fixture = await setup_k9((f) => {
      f.store.set('cflag:20:504', item.要求);
    });
    const { gohoubi_request_koujo_family } = fixture.load_module(
      'kojo/kojo-dungeon-after',
    );
    await gohoubi_request_koujo_family.call(9, { args: [20, undefined] });
    assert.ok(
      fixture
        .text_lines()
        .includes(
          `「呐~魔王大人、我想和${item.beast}交尾试一试呢~、能不能事先帮我准备好呢~？」`,
        ),
      `要求奖赏=${item.要求}：野兽名并入整行`,
    );
  }
});
