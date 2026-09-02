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

test('GOBI_KOUJO_K9：ARG:0 取语尾编号', async () => {
  const fixture = await setup_k9();
  const { gobi_koujo_family } = fixture.load_module('kojo/kojo-system');
  await gobi_koujo_family.call(9, { args: [3, () => 0] });
  assert.deepEqual(fixture.text_lines(), ['来的……。']);
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
