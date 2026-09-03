/**
 * ere/kojo/kojo-k14-nobleman.js 的行为测试（issue #245：J35 口上·K14 貴公子）。
 *
 * 缝 = test/helpers/era-fixture.js。世界底座：貴公子（性格素质 174 →
 * GET_KOJO_NUM = 114 → 分发 key 14）。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_chara_0, join_slave_chara } = require('./helpers/chara');

// 世界底座：貴公子（素质 174 → GET_KOJO_NUM = 114 → 分发 key 14）入列调教
async function setup_k14(seed) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 20, '貴公子');
  fixture.era.beginTrain(0, 20);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 20;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  fixture.store.set('talent:20:174', 1); // 貴公子 → GET_KOJO_NUM = 114
  fixture.store.set('flag:114', 1); // K14 存在标志
  fixture.store.set('flag:7', 2); // 口上总开关默认
  if (seed) {
    seed(fixture, era_flag);
  }
  fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k14-nobleman');
  return fixture;
}

// —— @EVENTTRAIN / @EVENTEND：存在标志一对 ——

test('@EVENTTRAIN #PRI 置存在标志、@EVENTEND #LATER 清 0（K14 一对）', async () => {
  const fixture = await setup_k14((f) => {
    f.store.delete('flag:114');
    f.store.set('cflag:20:201', 9); // 越过 EVENTTRAIN 前段状态机（避免打印）
  });

  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.store.get('flag:114'), 1); // K14 存在标志
  assert.equal(fixture.store.get('flag:7'), 2); // 总开关随之默认开
  await emit('EVENTEND');
  assert.equal(fixture.store.get('flag:114'), 0);
});

test('@EVENTTRAIN #PRI 口上开关补 0（FLAG:7 从 0 补到 2）', async () => {
  const fixture = await setup_k14((f) => {
    f.store.set('flag:7', 0);
    f.store.set('cflag:20:201', 9); // 越过状态机
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.store.get('flag:7'), 2);
});

// —— @EVENTTRAIN：自身守卫 ——

test('EVENTTRAIN 守卫①口上开关<0（玩家显式关掉）静默跳过', async () => {
  const fixture = await setup_k14((f) => {
    f.store.set('flag:7', -1);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), []);
  assert.equal(fixture.store.get('cflag:20:201'), undefined);
});

test('EVENTTRAIN 守卫②TALENT:174!=1 静默跳过', async () => {
  const fixture = await setup_k14((f) => {
    f.store.set('talent:20:174', 0);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), []);
  assert.equal(fixture.store.get('cflag:20:201'), undefined);
});

// —— @EVENTTRAIN：初调教 CFLAG:201 状态机 ——

test('初调教（CFLAG:201==0）通常男（TALENT:122）：置 201=1，无 RETURN 1', async () => {
  const fixture = await setup_k14((f) => {
    f.store.set('talent:20:122', 1); // 男
    f.store.set('talent:20:314', 0);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), [
    '「可…可恶啊！！！你这个肮脏的魔王！！我郑重告诉你！我是绝对不会屈服于你的…！！」',
    '怒目圆睁的眼睛中，隐约可以窥见他内心的恐惧……',
  ]);
  assert.equal(fixture.store.get('cflag:20:201'), 1);
  assert.equal(fixture.store.get('cflag:20:370'), undefined); // 男魔族分支才置 370
});

test('初调教 男魔族（TALENT:122 && 314==9）：置 201=1 且 370=1', async () => {
  const fixture = await setup_k14((f) => {
    f.store.set('talent:20:122', 1);
    f.store.set('talent:20:314', 9); // 魔族
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.store.get('cflag:20:201'), 1);
  assert.equal(fixture.store.get('cflag:20:370'), 1); // 魔族スイッチ１
});

test('初调教 已性转（CFLAG:70=1 && !TALENT:122）：RETURN 1（完整过场）', async () => {
  const fixture = await setup_k14((f) => {
    f.store.set('talent:20:122', 0);
    f.store.set('cflag:20:70', 1); // 性転換済
    f.store.set('talent:20:0', 1); // 处女（可选分档）
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.store.get('cflag:20:201'), 1);
  assert.ok(
    fixture.text_lines().some((l) => l.includes('被改造成了女性的肉体')),
    fixture.text_lines().join('\n'),
  );
  // 已性转档有 RETURN 1（与前面几档不同）
});

test('魔族化仅一次（201<5 && 370==0 && 魔族 && 无爱无淫乱）：置 370=2', async () => {
  const fixture = await setup_k14((f) => {
    f.store.set('cflag:20:201', 1);
    f.store.set('cflag:20:370', 0);
    f.store.set('talent:20:314', 9);
    f.store.set('talent:20:85', 0);
    f.store.set('talent:20:76', 0);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.store.get('cflag:20:370'), 2);
  assert.equal(fixture.store.get('cflag:20:201'), 1);
});

test('NTR 再捕获（201>=1 && CFLAG:650==1）愛/淫乱档：清 650=0', async () => {
  const fixture = await setup_k14((f) => {
    f.store.set('cflag:20:201', 1);
    f.store.set('cflag:20:650', 1);
    f.store.set('talent:20:85', 1);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.store.get('cflag:20:650'), 0);
  assert.equal(fixture.store.get('cflag:20:201'), 1);
});

test('屈服刻印 Lv1（201<2 && MARK:2==1）：推进到 2', async () => {
  const fixture = await setup_k14((f) => {
    f.store.set('cflag:20:201', 1);
    f.store.set('mark:20:2', 1);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.store.get('cflag:20:201'), 2);
});

test('屈服刻印 Lv2（201<3 && MARK:2==2）男档：推进到 3', async () => {
  const fixture = await setup_k14((f) => {
    f.store.set('cflag:20:201', 2);
    f.store.set('mark:20:2', 2);
    f.store.set('talent:20:122', 1);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), [
    '「呃…，今天也要继续做那种事情啊…！？」',
  ]);
  assert.equal(fixture.store.get('cflag:20:201'), 3);
});

test('爱（201<6 && 85）：男档台词 + 推进到 6', async () => {
  const fixture = await setup_k14((f) => {
    f.store.set('cflag:20:201', 5);
    f.store.set('talent:20:85', 1);
    f.store.set('talent:20:122', 1);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.store.get('cflag:20:201'), 6);
  assert.ok(
    fixture.text_lines().some((l) => l.includes('已经绝对不会再反抗您了')),
    fixture.text_lines().join('\n'),
  );
});

// —— @K14_KOJO2：二回目以降（经 EVENTTRAIN 尾档进入） ——

test('无助手时 EVENTTRAIN 尾档 CALL K14_KOJO2：反抗刻印Lv3 分档台词', async () => {
  const fixture = await setup_k14((f) => {
    f.store.set('cflag:20:201', 9); // 越过前段全部状态机分档
    f.store.set('mark:20:3', 3); // 反抗刻印Lv3
    f.store.set('talent:20:85', 0);
    f.store.set('talent:20:76', 0);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), [
    '「去死一死吧！！你这个又脏又可恶的魔王！！」',
  ]);
});

test('K14_KOJO2 淫乱档：RAND 三选一（rand=0 时首句）', async () => {
  const fixture = await setup_k14((f) => {
    f.store.set('cflag:20:201', 9);
    f.store.set('talent:20:76', 1);
    f.store.set('talent:20:85', 0);
    f.store.set('talent:20:122', 1);
  });
  const { k14_kojo2 } = fixture.load_module('kojo/kojo-k14-nobleman');
  await k14_kojo2(() => 0); // rand 恒 0 → 首句
  assert.equal(
    fixture.text_lines()[0],
    '「啊~，魔王大人~，我啊…，一直都在这里等待着您的到来呢~」',
  );
});

// —— @EVENTEND：调教结束 ——

test('EVENTEND 守卫①口上开关<0 静默跳过', async () => {
  const fixture = await setup_k14((f) => {
    f.store.set('flag:7', -1);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTEND');
  assert.deepEqual(fixture.text_lines(), []);
});

test('EVENTEND 反発刻印Lv3+愛なし：去死台词', async () => {
  const fixture = await setup_k14((f) => {
    f.store.set('mark:20:3', 3);
    f.store.set('mark:20:2', 3);
    f.store.set('talent:20:85', 0);
    f.store.set('talent:20:122', 1);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTEND');
  assert.deepEqual(fixture.text_lines(), ['「嘁…！给我去死啊…！！！」']);
});

test('EVENTEND 爱（85）体力 500 未満：感谢台词（非魔族档）', async () => {
  const fixture = await setup_k14((f) => {
    f.store.set('talent:20:85', 1);
    f.store.set('base:20:0', 300);
    f.store.set('talent:20:314', 0);
    f.store.set('talent:20:122', 1);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTEND');
  assert.deepEqual(fixture.text_lines(), [
    '「啊…，今天真的是辛苦您了…，还真的是非常感谢呢~」',
  ]);
});

// —— @KOJO_MESSAGE_COM_14：空模板骨架的状态机（S2） ——
//
// K14 指令口上是未填写模板：PRINTFORMW 全空，行为契约 = 计数器推进 + 守卫
// 分派。本节断言计数器写入与守卫，不断言文本（空模板 1:1 保留，见模块头）。

test('COM 守卫①口塞（TEQUIP:45 && SELECTCOM!=45）return 0', async () => {
  const fixture = await setup_k14((f, era_flag) => {
    era_flag.selectcom = 45;
    f.store.set('tequip:20:45', 1);
  });
  const { kojo_message_com_14 } = fixture.load_module('kojo/kojo-k14-nobleman');
  await kojo_message_com_14(() => 0);
  assert.equal(fixture.store.get('cflag:20:301'), undefined);
});

test('COM 守卫②失神（TFLAG:899）return 0', async () => {
  const fixture = await setup_k14((f, era_flag) => {
    era_flag.selectcom = 0;
    f.store.set('tflag:899', 1);
  });
  const { kojo_message_com_14 } = fixture.load_module('kojo/kojo-k14-nobleman');
  await kojo_message_com_14(() => 0);
  assert.equal(fixture.store.get('cflag:20:301'), undefined);
});

test('COM 爱抚初回：置 CFLAG:301 = 1 并出空行', async () => {
  const fixture = await setup_k14((f, era_flag) => {
    era_flag.selectcom = 0;
    f.store.set('mark:20:2', 2); // 屈服刻印Lv2 档
  });
  const { kojo_message_com_14 } = fixture.load_module('kojo/kojo-k14-nobleman');
  await kojo_message_com_14(() => 0);
  assert.equal(fixture.store.get('cflag:20:301'), 1);
  assert.equal(fixture.text_lines().length, 1); // 空模板仅一个空 PRINTFORMW
});

test('COM 爱抚二回目 淫乱（76）FLAG:7=2 上限旁路：置 301=6', async () => {
  const fixture = await setup_k14((f, era_flag) => {
    era_flag.selectcom = 0;
    f.store.set('cflag:20:301', 4);
    f.store.set('talent:20:76', 1);
  });
  const { kojo_message_com_14 } = fixture.load_module('kojo/kojo-k14-nobleman');
  await kojo_message_com_14(() => 0);
  assert.equal(fixture.store.get('cflag:20:301'), 6);
});

test('COM 肛门爱抚二回目 润滑 Lv2 未満（P<500）：置 303=2（それ以外档）', async () => {
  const fixture = await setup_k14((f, era_flag) => {
    era_flag.selectcom = 2;
    f.store.set('cflag:20:303', 1);
    f.store.set('palam:20:3', 100);
    f.store.set('delta:20:3', 0);
  });
  const { kojo_message_com_14 } = fixture.load_module('kojo/kojo-k14-nobleman');
  await kojo_message_com_14(() => 0);
  // 无淫乱/爱/屈服Lv3 → 「それ以外」档（CFLAG:223 <= 1 || FLAG:7==2 成立）
  assert.equal(fixture.store.get('cflag:20:303'), 2);
});

test('COM 穿环初回 淫乱＋未装（CFLAG:7 & P==0）：进入装着分档、不置 CFLAG:348', async () => {
  const fixture = await setup_k14((f, era_flag) => {
    era_flag.selectcom = 87;
    f.store.set('talent:20:76', 1);
  });
  // piercing_state.p 由 com87 写入（本测试直接注入）
  const { kojo_message_com_14 } = fixture.load_module('kojo/kojo-k14-nobleman');
  const ps = fixture.load_module('system/train/piercing-state');
  ps.piercing_state.p = 1; // 両乳首
  await kojo_message_com_14(() => 0);
  assert.ok(fixture.text_lines().length >= 1); // 空模板分档至少 1 行
});

// —— S3：DOG / PALAMCNG / MARKCNG / SELF / 迷宫 / 肉便器 / 胜利 / 攻击 / 死斗场 ——

test('COM 兽奸守卫（TEQUIP:89）CALL DOG：走兽奸计数器（爱抚初回→301=1）', async () => {
  const fixture = await setup_k14((f, era_flag) => {
    era_flag.selectcom = 0;
    f.store.set('tequip:20:89', 1);
    f.store.set('mark:20:2', 1); // 屈服刻印Lv1（兽奸爱抚初回·それ以外）
  });
  const { kojo_message_com_14 } = fixture.load_module('kojo/kojo-k14-nobleman');
  await kojo_message_com_14(() => 0);
  assert.equal(fixture.store.get('cflag:20:301'), 1);
});

test('COM 死斗场守卫（TEQUIP:55）CALL COLOSSEUM：55 号指令空行返回', async () => {
  const fixture = await setup_k14((f, era_flag) => {
    era_flag.selectcom = 55;
    f.store.set('tequip:20:55', 1);
  });
  const { kojo_message_com_14 } = fixture.load_module('kojo/kojo-k14-nobleman');
  await kojo_message_com_14(() => 0);
  assert.ok(fixture.text_lines().length >= 1);
});

test('PALAMCNG 首次润滑超Lv2（P1>500 && CFLAG:221==0）：置 221=1', async () => {
  const fixture = await setup_k14((f) => {
    f.store.set('palam:20:3', 600);
    f.store.set('delta:20:3', 0);
    f.store.set('talent:20:85', 1);
  });
  const { kojo_message_palamcng_14 } = fixture.load_module(
    'kojo/kojo-k14-nobleman',
  );
  await kojo_message_palamcng_14(() => 0);
  assert.equal(fixture.store.get('cflag:20:221'), 1);
});

test('MARKCNG 苦痛刻印 Lv3 初回（TFLAG:22==3 && CFLAG:297==0）：置 297=1', async () => {
  const fixture = await setup_k14((f) => {
    f.store.set('tflag:22', 3);
  });
  const { kojo_message_markcng_14 } = fixture.load_module(
    'kojo/kojo-k14-nobleman',
  );
  await kojo_message_markcng_14(() => 0);
  assert.equal(fixture.store.get('cflag:20:297'), 1);
});

test('SELF 调教后性交（TFLAG:13==4）空模板：置 CFLAG:264=1', async () => {
  const fixture = await setup_k14((f) => {
    f.store.set('tflag:13', 4);
  });
  const { self_kojo_k14 } = fixture.load_module('kojo/kojo-k14-nobleman');
  await self_kojo_k14(() => 0, 0);
  assert.equal(fixture.store.get('cflag:20:264'), 1);
});

test('DUNGEON_VICTORY 臆病（TALENT:10）：弱气台词（整句日文已归一）', async () => {
  const fixture = await setup_k14((f) => {
    f.store.set('talent:20:10', 1);
  });
  const { dungeon_victory_k14 } = fixture.load_module('kojo/kojo-k14-nobleman');
  await dungeon_victory_k14(() => 0);
  assert.ok(
    fixture
      .text_lines()
      .some((l) => l.includes('魔的力量、居然强大到了这种地步')),
    fixture.text_lines().join('\n'),
  );
});

test('DUNGEON_ATTACK 侵攻中（CFLAG:1==2）反抗的（TALENT:11）：威势台词', async () => {
  const fixture = await setup_k14((f) => {
    f.store.set('cflag:20:1', 2);
    f.store.set('talent:20:11', 1);
  });
  const { dungeon_attack_k14 } = fixture.load_module('kojo/kojo-k14-nobleman');
  await dungeon_attack_k14(() => 0);
  assert.ok(fixture.text_lines().length >= 1);
  assert.ok(
    fixture.text_lines().some((l) => l.includes('怪物') || l.includes('不净')),
    fixture.text_lines().join('\n'),
  );
});

test('BENKI FLAG:62==9 野外露出配信（常识改写）：填了的台词 + %SELF_CALL(A)% 渲染', async () => {
  const fixture = await setup_k14((f) => {
    f.store.set('flag:62', 9);
    f.store.set('flag:63', 1);
    f.store.set('talent:20:122', 0);
  });
  const { benki_koujo_k14 } = fixture.load_module('kojo/kojo-k14-nobleman');
  await benki_koujo_k14(() => 0);
  const lines = fixture.text_lines();
  assert.ok(
    lines.some((l) => l.includes('元冒险者的')),
    lines.join('\n'),
  );
  assert.ok(!lines.some((l) => l.includes('%SELF_CALL')), lines.join('\n'));
});
