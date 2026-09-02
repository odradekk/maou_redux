/**
 * ere/kojo/kojo-k10-club.js 的行为测试（issue #241：J31 口上·K10 クラブ）。
 *
 * 缝 = test/helpers/era-fixture.js。世界底座：白梅花（性格素质 170 →
 * GET_KOJO_NUM = 110 → 分发 key 10）。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_chara_0, join_slave_chara } = require('./helpers/chara');

// 世界底座：白梅花（素质 170 → GET_KOJO_NUM = 110 → 分发 key 10）入列调教
async function setup_k10(seed, selectcom = 0) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 20, '白梅花');
  fixture.era.beginTrain(0, 20);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 20;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = selectcom;
  fixture.store.set('talent:20:170', 1); // 白梅花 → GET_KOJO_NUM = 110
  fixture.store.set('talent:20:121', 1); // K10 EVENTTRAIN 自身第二道守卫（:83）
  fixture.store.set('flag:110', 1); // K10 存在标志
  fixture.store.set('flag:7', 2); // 口上总开关默认
  if (seed) {
    seed(fixture, era_flag);
  }
  fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k10-club');
  return fixture;
}

// —— @EVENTTRAIN：存在标志一对 ——

test('@EVENTTRAIN #PRI 置存在标志、@EVENTEND #LATER 清 0（K10 一对）', async () => {
  const fixture = await setup_k10((f) => {
    f.store.delete('flag:110');
    f.store.set('cflag:20:201', 9); // 越过 EVENTTRAIN 前段状态机（避开 era.input() 分支）
  });

  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.store.get('flag:110'), 1); // K10 存在标志
  assert.equal(fixture.store.get('flag:7'), 2); // 总开关随之默认开
  await emit('EVENTEND');
  assert.equal(fixture.store.get('flag:110'), 0);
});

test('@EVENTTRAIN #PRI 口上开关补 0（FLAG:7 从 0 补到 2）', async () => {
  const fixture = await setup_k10((f) => {
    f.store.set('flag:7', 0);
    f.store.set('cflag:20:201', 9); // 越过状态机（避开 era.input() 分支）
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.store.get('flag:7'), 2);
});

test('EVENTTRAIN 自身守卫①口上开关<0（玩家显式关掉）静默跳过', async () => {
  const fixture = await setup_k10((f) => {
    f.store.set('flag:7', -1);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), []);
  assert.equal(fixture.store.get('cflag:20:201'), undefined);
});

test('KOJO_MESSAGE_PALAMCNG_10 头部守卫①ASSI&&ASSIPLAY 静默跳过', async () => {
  const fixture = await setup_k10((f, era_flag) => {
    era_flag.assi = 21;
    era_flag.assiplay = 1;
    f.store.set('palam:20:3', 600);
  });
  const { kojo_message_palamcng_family } =
    fixture.load_module('kojo/kojo-system');
  await kojo_message_palamcng_family.call(10, { args: [] });
  assert.equal(fixture.store.get('cflag:20:221'), undefined);
});

test('KOJO_MESSAGE_MARKCNG_10 头部守卫①ASSI&&ASSIPLAY 静默跳过', async () => {
  const fixture = await setup_k10((f, era_flag) => {
    era_flag.assi = 21;
    era_flag.assiplay = 1;
  });
  const { game } = fixture.load_module('facade/game');
  game.system.苦痛刻印变动 = 3;
  const { kojo_message_markcng_family } =
    fixture.load_module('kojo/kojo-system');
  await kojo_message_markcng_family.call(10, { args: [] });
  assert.deepEqual(fixture.text_lines(), []);
});

// —— @EVENTTRAIN：初調教 CFLAG:201 状态机 ——

test('EVENTTRAIN 自身双守卫：TALENT:170!=1 或 TALENT:121!=1 静默跳过', async () => {
  const fixture = await setup_k10((f) => f.store.set('talent:20:121', 0));
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), []);
  assert.equal(fixture.store.get('cflag:20:201'), undefined);
});

test('初調教（CFLAG:201==0）魔族分档（TALENT:314==9），选 1（就是这样才好）：CFLAG:370=1', async () => {
  const fixture = await setup_k10((f) => f.store.set('talent:20:314', 9));
  fixture.set_inputs(1);

  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(
    fixture.text_lines()[0],
    '「呼，这就是魔族的身体呢」',
    '初调教魔族分档首句',
  );
  assert.equal(fixture.store.get('cflag:20:201'), 1);
  assert.equal(fixture.store.get('cflag:20:370'), 1);
});

test('屈服刻印 Lv1（CFLAG:201<2 && MARK:2==1）：推进到 2', async () => {
  const fixture = await setup_k10((f) => {
    f.store.set('cflag:20:201', 1); // 越过 ==0 的输入分支，仍满足 <2
    f.store.set('mark:20:2', 1);
  });

  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), [
    '「唔呼呼、这种感觉..渐渐明白了呢」',
    '白梅花的股间盛大的勃起了、直到你坏笑着指了指她充血的肉棒，白梅花才惊觉这一事实，害羞地用手紧紧按住了它。',
    '「讨厌…不要那样子看…很让人害羞的啊………♪」',
  ]);
  assert.equal(fixture.store.get('cflag:20:201'), 2);
});

// —— @K10_KOJO2：二回目以降 ——

test('K10_KOJO2 崩坏（TALENT:9==1）：无值得期待的反应', async () => {
  const fixture = await setup_k10((f) => {
    f.store.set('cflag:20:201', 9); // 越过 EVENTTRAIN 前段状态机
    f.store.set('talent:20:9', 1);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), [
    '「啊……啊啊…啊………」',
    '白梅花没有什么令人值得期待的反应………',
  ]);
});

test('K10_KOJO2 MARK:3==3 分档：glasses_word 按 CFLAG:41 展开', async () => {
  const fixture = await setup_k10((f) => {
    f.store.set('cflag:20:201', 9);
    f.store.set('mark:20:2', 3);
    f.store.set('mark:20:3', 3);
    f.store.set('cflag:20:41', 83); // 上衣类型 == 83 → 扶了扶眼镜

    f.store.set('talent:20:85', 0); // 显式声明，避免 undefined == 0 的夹具伪影
    f.store.set('talent:20:76', 0);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.ok(
    fixture.text_lines().some((l) => l.includes('揉着眼角扶了扶眼镜。')),
    fixture.text_lines().join('\n'),
  );
});

// —— 家族注册接线（issue #241 自检 ④ top-level-wiring）——

test('20 个分发族全部注册了 K10（key 10）', async () => {
  const fixture = await setup_k10();
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
    assert.equal(family.has(10), true, `${family.name || '(族)'} 缺 K10 注册`);
  }
});

// —— @KOJO_MESSAGE_COM_10：指令口上族 ——

async function speak_k10(fixture, rand) {
  const { kojo_message_com_family } = fixture.load_module('kojo/kojo-system');
  return kojo_message_com_family.call(10, { args: [rand] });
}

test('SELECTCOM==0（爱抚）初回：MARK:2>=2 分档，推进到 1', async () => {
  const fixture = await setup_k10((f) => {
    f.store.set('mark:20:2', 2);
  }, 0);
  await speak_k10(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊～…嗯~…更、嗯更多的揉那里也可以哟…啊…就是这样」',
  ]);
  assert.equal(fixture.store.get('cflag:20:301'), 1);
});

test('SELECTCOM==87（穿环）读 piercing_state.p（跨模块存活态）', async () => {
  const fixture = await setup_k10((f) => {
    f.store.set('talent:20:76', 1);
  }, 87);
  const { piercing_state } = fixture.load_module('system/train/piercing-state');
  piercing_state.p = 1;
  fixture.store.set('cflag:20:7', 1); // 穿环状态 & p 命中（装着中）
  await speak_k10(fixture);
  assert.ok(
    fixture.text_lines().some((l) => l.includes('这样敏感度上升的话')),
    fixture.text_lines().join('\n'),
  );
});

test('TEQUIP:89（兽奸PLAY）：头部守卫岔去 DOG_KOJO_10 真身', async () => {
  const fixture = await setup_k10((f) => {
    f.store.set('tequip:20:89', 1);
  }, 0);
  await speak_k10(fixture);
  assert.deepEqual(fixture.text_lines(), ['']); // DOG_KOJO_10 平行状态机，源无文本，仍记空行
  assert.equal(
    fixture.store.get('cflag:20:301'),
    1,
    '状态机随 DOG_KOJO_10 独立推进',
  );
});

test('TEQUIP:55（死斗场）：头部守卫岔去 COLOSSEUM_KOJO_10 真身', async () => {
  const fixture = await setup_k10((f) => {
    f.store.set('tequip:20:55', 1);
    f.store.set('base:20:1', 0);
  }, 55);
  await speak_k10(fixture);
  assert.deepEqual(fixture.text_lines(), ['白梅花连站立的力气都没有了……']);
});

// —— 头部七道守卫的余下五道 ——

test('ASSI>0 && ASSIPLAY：头部第 1 道守卫静默跳过', async () => {
  const fixture = await setup_k10((f, era_flag) => {
    era_flag.assi = 21;
    era_flag.assiplay = 1;
  }, 0);
  await speak_k10(fixture);
  assert.deepEqual(fixture.text_lines(), []);
  assert.equal(fixture.store.get('cflag:20:301'), undefined);
});

test('TEQUIP:45（口塞）且 SELECTCOM!=45：头部第 2 道守卫静默跳过', async () => {
  const fixture = await setup_k10((f) => {
    f.store.set('tequip:20:45', 1);
  }, 0);
  await speak_k10(fixture);
  assert.deepEqual(fixture.text_lines(), []);
});

test('TFLAG:899（失神）：头部第 3 道守卫静默跳过', async () => {
  const fixture = await setup_k10((f) => {
    f.store.set('tflag:899', 1);
  }, 0);
  await speak_k10(fixture);
  assert.deepEqual(fixture.text_lines(), []);
});

test('TALENT:9==1（崩坏）：头部第 6 道守卫静默跳过', async () => {
  const fixture = await setup_k10((f) => {
    f.store.set('talent:20:9', 1);
  }, 0);
  await speak_k10(fixture);
  assert.deepEqual(fixture.text_lines(), []);
});

test('TEQUIP:90（触手调教中）：头部第 7 道守卫静默跳过', async () => {
  const fixture = await setup_k10((f) => {
    f.store.set('tequip:20:90', 1);
  }, 0);
  await speak_k10(fixture);
  assert.deepEqual(fixture.text_lines(), []);
});

// —— @KOJO_MESSAGE_PALAMCNG_10 / @KOJO_MESSAGE_MARKCNG_10 ——

test('KOJO_MESSAGE_PALAMCNG_10：P1 = PALAM:3 + DELTA:3 首次超过 PALAMLV:2 触发润滑首超', async () => {
  const fixture = await setup_k10();
  fixture.store.set('palam:20:3', 600);
  fixture.store.set('talent:20:85', 1);
  const { kojo_message_palamcng_family } =
    fixture.load_module('kojo/kojo-system');
  await kojo_message_palamcng_family.call(10, { args: [] });
  assert.equal(fixture.store.get('cflag:20:221'), 1);
});

test('KOJO_MESSAGE_MARKCNG_10：苦痛刻印变动==3 且 CFLAG:297==0 触发苦痛刻印Lv3首次口上', async () => {
  const fixture = await setup_k10();
  const { game } = fixture.load_module('facade/game');
  game.system.苦痛刻印变动 = 3;
  const { kojo_message_markcng_family } =
    fixture.load_module('kojo/kojo-system');
  await kojo_message_markcng_family.call(10, { args: [] });
  assert.deepEqual(fixture.text_lines(), [
    '「不、不要啊～！快停下～不要～！好痛啊啊～！」',
    '白梅花因为剧烈的痛苦发出了悲鸣、这份疼痛将会再也忘不掉了吧………',
  ]);
  assert.equal(fixture.store.get('cflag:20:297'), 1);
});

// —— @SELF_KOJO_K10 ——

test('SELF_KOJO_K10 TFLAG:13==13（自我口上·孕育）：CSTR:2 插值', async () => {
  const fixture = await setup_k10();
  const { game } = fixture.load_module('facade/game');
  game.train.初吻与自我口上 = 13;
  fixture.store.set('talent:20:85', 1);
  fixture.store.set('talent:20:153', 1);
  fixture.store.set('cstr:20:2', '主人');
  const { self_kojo_family } = fixture.load_module('kojo/kojo-system');
  await self_kojo_family.call(10, { args: [] });
  assert.ok(
    fixture.text_lines().some((l) => l.includes('很快就要生出来了')),
    fixture.text_lines().join('\n'),
  );
  assert.equal(fixture.store.get('cflag:20:273'), 1);
});

// —— 迷宫战斗（DUNGEON_VICTORY / DUNGEON_ATTACK / RYOUZYOKU） ——

test('DUNGEON_VICTORY_K10：随机三选一 + 体力低于五成追加台词', async () => {
  const fixture = await setup_k10((f) => {
    f.store.set('base:20:0', 10);
    f.store.set('maxbase:20:0', 100);
    f.store.set('base:20:1', 100);
    f.store.set('maxbase:20:1', 100);
  });
  const { dungeon_victory_family } = fixture.load_module('kojo/kojo-system');
  await dungeon_victory_family.call(10, { args: [() => 0] });
  assert.deepEqual(fixture.text_lines(), [
    '「唔呼呼、今天的魔力格外顺畅呢♪」',
    '「………哈啊哈啊…真是、好累人啊」',
  ]);
});

test('DUNGEON_VICTORY_K10：体力过半（60%）时不追加低体力台词', async () => {
  const fixture = await setup_k10((f) => {
    f.store.set('base:20:0', 60);
    f.store.set('maxbase:20:0', 100);
    f.store.set('base:20:1', 100);
    f.store.set('maxbase:20:1', 100);
  });
  const { dungeon_victory_family } = fixture.load_module('kojo/kojo-system');
  await dungeon_victory_family.call(10, { args: [() => 0] });
  assert.deepEqual(fixture.text_lines(), [
    '「唔呼呼、今天的魔力格外顺畅呢♪」',
    '「接下来、今天也向更深处进发吧」',
  ]);
});

test('DUNGEON_ATTACK_K10：侵略状态==2 与其余分档文案不同', async () => {
  const fixture = await setup_k10();
  const { chara } = fixture.load_module('facade/chara');
  chara(20).invasion.状态 = 2;
  const { dungeon_attack_family } = fixture.load_module('kojo/kojo-system');
  await dungeon_attack_family.call(10, { args: [() => 0] });
  assert.deepEqual(fixture.text_lines(), ['「燃烧吧！」']);
});

test('DUNGEON_RYOUZYOKU_K10 / AFTER_K10：迷宫败北与凌辱结束口上（处女分档）', async () => {
  const fixture = await setup_k10((f) => {
    f.store.set('talent:20:0', 1); // 处女
  });
  const { ryouzyoku_kojo_family, ryouzyoku_after_kojo_family } =
    fixture.load_module('kojo/kojo-dungeon-ravish');
  await ryouzyoku_kojo_family.call(10, { args: [] });
  assert.deepEqual(fixture.text_lines(), [
    '「请！请住手…哈啊～…求、求你们…人家还是处女…所以说…只有那里请…哈啊～！」',
    '「咕…呜啊啊…啊～…不要啊啊啊啊！」',
    '战败的白梅花发出了绝望的悲鸣、魔物们一边嘲笑着圣灵骑士的失态模样一边开始了凌辱………',
  ]);
  const before = fixture.text_lines().length;
  await ryouzyoku_after_kojo_family.call(10, { args: [] });
  assert.deepEqual(fixture.text_lines().slice(before), [
    '「骗人…我竟然还是处女吗………」',
    '白梅花对自己被蹂躏的满身狼藉却奇迹般地还是处女感到了惊叹。',
    '这究竟是幸运还是不幸，现在还未可知………',
  ]);
});

// —— 战果口上（GOHOUBI / OSIOKI / GOBI / BENKI / ENTERENEMY） ——

test('GOHOUBI_REQUEST_KOUJO_K10：CFLAG:A:504==0 请求金钱', async () => {
  const fixture = await setup_k10();
  const { gohoubi_request_koujo_family } = fixture.load_module(
    'kojo/kojo-dungeon-after',
  );
  await gohoubi_request_koujo_family.call(10, { args: [20, undefined] });
  assert.deepEqual(fixture.text_lines(), ['「好麻烦，唔，那给我一些钱好了」']);
});

test('GOHOUBI_AFTER_KOUJO_K10 / OSIOKI_KOUJO_K10：TFLAG:18 改经 choice 参数传递', async () => {
  const fixture = await setup_k10();
  const { gohoubi_after_koujo_family, osioski_koujo_family } =
    fixture.load_module('kojo/kojo-dungeon-after');
  await gohoubi_after_koujo_family.call(10, { args: [20, 0] });
  assert.deepEqual(fixture.text_lines(), ['「就这样不许动？哈？」']);
  const before = fixture.text_lines().length;
  await osioski_koujo_family.call(10, { args: [20, 6] });
  assert.deepEqual(fixture.text_lines().slice(before), ['「真是难以接受」']);
});

test('GOBI_KOUJO_K10：ARG:0 取语尾编号', async () => {
  const fixture = await setup_k10();
  const { gobi_koujo_family } = fixture.load_module('kojo/kojo-system');
  await gobi_koujo_family.call(10, { args: [1, () => 0] });
  assert.deepEqual(fixture.text_lines(), ['所以呢♪']);
});

test('BENKI_KOUJO_K10：门面 game.train.肉便器行动 五档', async () => {
  const fixture = await setup_k10((f) => {
    f.store.set('talent:20:76', 1);
  });
  const { game } = fixture.load_module('facade/game');
  game.train.肉便器行动 = 0;
  const { benki_koujo_family } = fixture.load_module('kojo/kojo-system');
  await benki_koujo_family.call(10, { args: [] });
  assert.deepEqual(fixture.text_lines(), ['「哈啊～…更多更多…用力干人家吧♡」']);
});

test('ENTERENEMY_KOUJO_K10：来袭口上按角色素质分岔', async () => {
  const fixture = await setup_k10((f) => {
    f.store.set('talent:20:85', 1);
  });
  const { enterenemy_koujo_family } = fixture.load_module('kojo/kojo-system');
  await enterenemy_koujo_family.call(10, { args: [] });
  assert.deepEqual(fixture.text_lines(), ['「不要逃跑哟、魔王大人♡」']);
});

// —— NTR / 处刑与展示口上小簇 ——

test('NTR_KOUJO_K10：P 分派编号 1（首次经 CFLAG:650 标记）', async () => {
  const fixture = await setup_k10((f) => {
    f.store.set('talent:20:85', 1);
  });
  const { ntr_koujo_family } = fixture.load_module('kojo/kojo-system');
  await ntr_koujo_family.call(10, { args: [() => 0, 1] });

  assert.equal(fixture.store.get('cflag:20:650'), 1);
  assert.equal(fixture.store.get('cflag:20:651'), 1);
  assert.equal(fixture.store.get('cflag:20:657'), 1); // RAND:3+1 → 注入 rand=undefined 时用默认随机源，仅断言已写入
});

test('EXUCUTION / BANISHMENT / PUBLIC_EXUCUTION / GROTESQUE_KOUJO_K10：注册且可调用', async () => {
  const fixture = await setup_k10();
  const { game } = fixture.load_module('facade/game');
  const {
    exucution_koujo_family,
    banishment_koujo_family,
    public_exucution_koujo_family,
    grotesque_koujo_family,
  } = fixture.load_module('kojo/kojo-system');

  game.event.犬射精或处刑口上 = 4;
  await exucution_koujo_family.call(10, { args: [] });
  assert.deepEqual(fixture.text_lines(), [
    '「求、求你么…杀了我…请杀了我吧…肉便器什么的…不要、不要啊………」',
  ]);

  let before = fixture.text_lines().length;
  game.event.流放口上 = 0;
  await banishment_koujo_family.call(10, { args: [] });
  assert.deepEqual(fixture.text_lines().slice(before), [
    '「我的魔法连让小石头动一下都不行了…啊啊………」',
  ]);

  before = fixture.text_lines().length;
  game.event.公开处刑口上 = 0;
  await public_exucution_koujo_family.call(10, { args: [] });
  assert.deepEqual(fixture.text_lines().slice(before), [
    '「呐..开玩笑的吧？那样的…我可不觉得好笑…啊～…啊啊～！」',
  ]);

  before = fixture.text_lines().length;
  game.event.猎奇处刑口上 = 0;
  await grotesque_koujo_family.call(10, { args: [] });
  assert.deepEqual(fixture.text_lines().slice(before), ['']); // 源无文本，PRINTFORMW 仍记空行
});

test('MUSEUM_KOUJO_K10：TFLAG:500 八档，第一档有台词', async () => {
  const fixture = await setup_k10();
  const { game } = fixture.load_module('facade/game');
  const { museum_koujo_family } = fixture.load_module('kojo/kojo-system');
  game.event.博物馆口上 = 0;
  await museum_koujo_family.call(10, { args: [] });
  assert.deepEqual(fixture.text_lines(), [
    '「唔呼呼、这种程度的石化魔法，之前的我只要一瞬间就能反制…啊啊……啊………」',
  ]);
});
