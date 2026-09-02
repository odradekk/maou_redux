/**
 * ere/kojo/kojo-k6-wicked.js 的行为测试（issue #237：J27 口上·K6 悪女）。
 *
 * 缝 = test/helpers/era-fixture.js。世界底座：悪女（素质 166 →
 * GET_KOJO_NUM = 106 → 分发 key 6）。覆盖（验收清单逐项）：
 *   - @EVENTTRAIN 初調教（CFLAG:201 状态机）与 @EVENTEND 的调教终了分档；
 *   - @KOJO_MESSAGE_COM_6 的头部守卫（K6 源文六条：ASSIPLAY / TEQUIP:45 /
 *     TFLAG:899 / TALENT:9 / TEQUIP:89→DOG_KOJO_6 / TEQUIP:55→COLOSSEUM；
 *     **无 TEQUIP:90**——按源 1:1，触手不跳过）；
 *   - SELECTCOM 0 爱抚 CFLAG:301 状态机 + 若干指令初回；
 *   - DOG_KOJO_6 / COLOSSEUM_KOJO_6 真身；
 *   - PALAMCNG 处女丧失、MARKCNG 刻印取得、SELF_KOJO、NTR、GOBI、
 *     GOHOUBI_AFTER；
 *   - 阈值闸 FLAG:7 == 1 阶段耗尽不出声、== 2 旁路；
 *   - 存根清单核对（SELL_MATURO_K0）。
 */
'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

const seq_rand =
  (...draws) =>
  (n) => {
    const value = draws.shift() ?? 0;
    return value % n;
  };

async function setup_k6(seed, selectcom = 0) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '悪女');
  fixture.era.beginTrain(0, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = selectcom;
  fixture.store.set('talent:31:166', 1); // 悪女 → GET_KOJO_NUM = 106
  fixture.store.set('flag:106', 1); // K6 存在标志
  fixture.store.set('flag:7', 2); // 总开关默认
  if (seed) {
    seed(fixture, era_flag);
  }
  fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k6-wicked');
  return fixture;
}

async function speak_k6(fixture, rand) {
  const { kojo_message_com_family } = fixture.load_module('kojo/kojo-system');
  return kojo_message_com_family.call(6, { args: [rand] });
}

// —— @EVENTTRAIN / @EVENTEND 存在标志 ——

test('@EVENTTRAIN #PRI 置存在标志、@EVENTEND #LATER 清 0（K6 一对）', async () => {
  const fixture = await setup_k6((f) => f.store.delete('flag:106'));
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.store.get('flag:106'), 1, 'K6 存在标志 FLAG:106 = 1');
  assert.equal(fixture.store.get('flag:7'), 2, '总开关随之默认开');
  await emit('EVENTEND');
  assert.equal(fixture.store.get('flag:106'), 0, 'EVENTEND #LATER 清 FLAG:106');
});

test('初調教（CFLAG:201 == 0，人类）：RAND 非 0 支 + 推进到 1', async () => {
  const fixture = await setup_k6();
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN', seq_rand(1));
  assert.deepEqual(fixture.text_lines(), [
    '「喂！你…你想干什么！为什么我的眼睛…放开我！你这个变态！」',
    '悪女简直不像是一个勇者，征服这样的她应该是很难的吧……',
  ]);
  assert.equal(fixture.store.get('cflag:31:201'), 1, '初調教推进到 1');
});

test('初調教种族分档：精灵（TALENT:314 == 1）', async () => {
  const fixture = await setup_k6((f) => f.store.set('talent:31:314', 1));
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), [
    '「别、别盯着我看啊！你这家伙！」',
    '悪女用比平常的精灵锐利得多的目光直视着你。',
    '这样的对象应该很难快速驯服吧。',
  ]);
  assert.equal(fixture.store.get('cflag:31:201'), 1);
});

test('@EVENTEND 调教终了：反抗刻印Lv3 + 屈服无 + 爱无', async () => {
  const fixture = await setup_k6((f) => {
    f.store.set('mark:31:3', 3);
    f.store.set('mark:31:2', 0);
    f.store.set('base:31:0', 600);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTEND');
  assert.ok(
    fixture.text_lines().includes('「去死吧！」'),
    `反抗刻印Lv3 终了出声：${JSON.stringify(fixture.text_lines())}`,
  );
});

// —— @KOJO_MESSAGE_COM_6：头部守卫 ——

test('助手调教（ASSI > 0 && ASSIPLAY）：静默跳过', async () => {
  const fixture = await setup_k6((f, era_flag) => {
    era_flag.assi = 17;
    era_flag.assiplay = 1;
  });
  await speak_k6(fixture, seq_rand(0));
  assert.deepEqual(
    fixture.text_lines(),
    [],
    '助手调教（ASSI > 0 && ASSIPLAY）：静默跳过',
  );
});

test('口塞（TEQUIP:45 且非指令45）：静默跳过', async () => {
  const fixture = await setup_k6((f) => f.store.set('tequip:31:45', 1));
  await speak_k6(fixture, seq_rand(0));
  assert.deepEqual(
    fixture.text_lines(),
    [],
    '口塞（TEQUIP:45 且非指令45）：静默跳过',
  );
});

test('失神（TFLAG:899）：静默跳过', async () => {
  const fixture = await setup_k6((f) => f.store.set('tflag:899', 1));
  await speak_k6(fixture, seq_rand(0));
  assert.deepEqual(fixture.text_lines(), [], '失神（TFLAG:899）：静默跳过');
});

test('崩坏（TALENT:9）：静默跳过', async () => {
  const fixture = await setup_k6((f) => f.store.set('talent:31:9', 1));
  await speak_k6(fixture, seq_rand(0));
  assert.deepEqual(fixture.text_lines(), [], '崩坏（TALENT:9）：静默跳过');
});

test('兽奸（TEQUIP:89）：岔进本文件真身 DOG_KOJO_6', async () => {
  const fixture = await setup_k6((f) => f.store.set('tequip:31:89', 1));
  await speak_k6(fixture, seq_rand(0));
  assert.deepEqual(fixture.text_lines(), ['「滚开！　你这蠢狗！」']);
  assert.equal(
    fixture.store.get('cflag:31:301'),
    1,
    '兽奸爱撫初回（DOG_KOJO_6 CFLAG:301 == 0 且 MARK:2 < 2）',
  );
});

test('死斗场（TEQUIP:55）：岔进本文件真身 COLOSSEUM_KOJO_6', async () => {
  const fixture = await setup_k6((f) => {
    f.store.set('tequip:31:55', 1);
    f.store.set('base:31:1', 100);
  }, 55);
  await speak_k6(fixture, seq_rand(0));
  assert.deepEqual(fixture.text_lines(), [
    '悪女高昂的战意看得她的对手心惊胆战……',
  ]);
});

test('K6 无触手守卫：TEQUIP:90 仍出爱抚声（源 COM 头部无 TEQUIP:90）', async () => {
  const fixture = await setup_k6((f) => f.store.set('tequip:31:90', 1));
  await speak_k6(fixture, seq_rand(0));
  assert.ok(
    fixture.text_lines().length > 0,
    'K6 无 TEQUIP:90 守卫，触手中也出声',
  );
});

// —— SELECTCOM 0：爱抚 CFLAG:301 ——

test('爱撫初回（CFLAG:301 == 0 且 MARK:2 < 2）：两句拒绝 + 推进到 1', async () => {
  const fixture = await setup_k6();
  await speak_k6(fixture, seq_rand(0));
  assert.deepEqual(fixture.text_lines(), [
    '「嘁、摸吧！你这渣滓！」',
    '悪女厌恶地扭动着身体………',
  ]);
  assert.equal(fixture.store.get('cflag:31:301'), 1, '爱撫初回 CFLAG:301 = 1');
});

test('爱撫初回的刻印分档（MARK:2 >= 2）：配合台词', async () => {
  const fixture = await setup_k6((f) => f.store.set('mark:31:2', 2));
  await speak_k6(fixture, seq_rand(0));
  assert.deepEqual(fixture.text_lines(), [
    '「哈啊…该死……别这样摸我啊…呜！…啊嗯！」',
    '悪女的身体被爱抚着………',
  ]);
  assert.equal(fixture.store.get('cflag:31:301'), 1);
});

test('爱撫二回目以降的素质/刻印分档推进', async () => {
  const whore = await setup_k6((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:301', 1);
  });
  await speak_k6(whore, seq_rand(0));
  assert.deepEqual(whore.text_lines(), [
    '「只是触摸可不够哦～♪」',
    '悪女抓住你的手引导着伸向敏感带………',
  ]);
  assert.equal(
    whore.store.get('cflag:31:301'),
    6,
    '淫乱 TALENT:76 → CFLAG:301 = 6',
  );

  const love = await setup_k6((f) => {
    f.store.set('talent:31:85', 1);
    f.store.set('cflag:31:301', 1);
  });
  await speak_k6(love, seq_rand(0));
  assert.deepEqual(love.text_lines(), [
    '「主人的手的触感…好温暖…」',
    '悪女丝毫不抵抗地享受着爱抚，发出舒服的呻吟………',
  ]);
  assert.equal(
    love.store.get('cflag:31:301'),
    5,
    '爱慕 TALENT:85 → CFLAG:301 = 5',
  );

  const sub3 = await setup_k6((f) => {
    f.store.set('mark:31:2', 3);
    f.store.set('cflag:31:301', 1);
  });
  await speak_k6(sub3, seq_rand(0));
  assert.equal(
    sub3.store.get('cflag:31:301'),
    4,
    '屈服刻印 Lv3 → CFLAG:301 = 4',
  );

  const sub2 = await setup_k6((f) => {
    f.store.set('mark:31:2', 2);
    f.store.set('cflag:31:301', 1);
  });
  await speak_k6(sub2, seq_rand(0));
  assert.equal(
    sub2.store.get('cflag:31:301'),
    3,
    '屈服刻印 Lv2 → CFLAG:301 = 3',
  );

  const other = await setup_k6((f) => f.store.set('cflag:31:301', 1));
  await speak_k6(other, seq_rand(0));
  assert.deepEqual(other.text_lines(), [
    '「别碰我！你这垃圾！」',
    '悪女在爱抚过程中厌恶地扭动着身体………',
  ]);
  assert.equal(other.store.get('cflag:31:301'), 2, 'それ以外 → CFLAG:301 = 2');
});

test('爱撫阶段耗尽后（FLAG:7 == 1）静默；FLAG:7 == 2 旁路重出声', async () => {
  const quiet = await setup_k6((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:301', 6);
    f.store.set('flag:7', 1);
  });
  await speak_k6(quiet, seq_rand(0));
  assert.deepEqual(quiet.text_lines(), [], 'FLAG:7 == 1 阶段耗尽后不出声');
  assert.equal(quiet.store.get('cflag:31:301'), 6);

  const repeat = await setup_k6((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:301', 6);
  });
  await speak_k6(repeat, seq_rand(0));
  assert.equal(repeat.text_lines().length, 2, 'FLAG:7 == 2 旁路重出声');
  assert.equal(repeat.store.get('cflag:31:301'), 6);
});

// —— 其它 SELECTCOM 初回 ——

test('舔陰初回（SELECTCOM == 1，非处女）：推进 CFLAG:302', async () => {
  const fixture = await setup_k6(undefined, 1);
  await speak_k6(fixture, seq_rand(0));
  assert.deepEqual(fixture.text_lines(), [
    '「你是认真的吗！别开玩笑了！」',
    '你抱住悪女的两条大腿，把阴唇含在了嘴里………',
  ]);
  assert.equal(fixture.store.get('cflag:31:302'), 1, '舔陰初回 CFLAG:302 = 1');
});

test('SELECTCOM == 5（胸爱抚）/7（自己扒开）初回', async () => {
  const chest = await setup_k6(undefined, 5);
  await speak_k6(chest, seq_rand(0));
  assert.equal(chest.store.get('cflag:31:306'), 1, '胸爱抚初回 CFLAG:306 = 1');
  assert.ok(chest.text_lines().length > 0, '胸爱抚初回出声');

  const open = await setup_k6(undefined, 7);
  await speak_k6(open, seq_rand(0));
  assert.equal(open.store.get('cflag:31:308'), 1, '自己扒开初回 CFLAG:308 = 1');
  assert.ok(open.text_lines().length > 0, '自己扒开初回出声');
});

// —— PALAMCNG / MARKCNG / SELF / NTR / GOBI ——

test('处女丧失（TFLAG:3 && CFLAG:229 == 0 && TFLAG:20）：素质分档 + CFLAG:229 = 1', async () => {
  const fixture = await setup_k6((f) => {
    f.store.set('tflag:3', 1);
    f.store.set('tflag:20', 1);
    f.store.set('delta:31:11', 100);
    f.store.set('delta:31:12', 100);
    f.store.set('talent:31:85', 1);
  });
  const mod = fixture.load_module('kojo/kojo-k6-wicked');
  await mod.kojo_message_palamcng_6();
  assert.ok(
    fixture.text_lines().some((line) => line.includes('第一次')),
    `处女丧失爱慕档：${JSON.stringify(fixture.text_lines())}`,
  );
  assert.equal(fixture.store.get('cflag:31:229'), 1, '处女丧失 CFLAG:229 = 1');
});

test('处女丧失 A >= 500 时走それ以外档（UP:12 参与加算）', async () => {
  const fixture = await setup_k6((f) => {
    f.store.set('tflag:3', 1);
    f.store.set('tflag:20', 1);
    f.store.set('delta:31:11', 400);
    f.store.set('delta:31:12', 200);
    f.store.set('talent:31:85', 1);
  });
  const mod = fixture.load_module('kojo/kojo-k6-wicked');
  await mod.kojo_message_palamcng_6();
  assert.ok(
    fixture.text_lines().some((line) => line.includes('痛')),
    '处女丧失 A >= 500 落それ以外档（UP:12 参与加算）',
  );
  assert.equal(fixture.store.get('cflag:31:229'), 1);
});

test('刻印取得（TFLAG:21/22/23/24 == 3）：一次性台词 + CFLAG:297-300 = 1', async () => {
  const pain = await setup_k6((f) => f.store.set('tflag:22', 3));
  const mod1 = pain.load_module('kojo/kojo-k6-wicked');
  await mod1.kojo_message_markcng_6();
  assert.ok(pain.text_lines().length > 0, 'MARKCNG 苦痛刻印 LV3');
  assert.equal(pain.store.get('cflag:31:297'), 1, '苦痛刻印Lv3 CFLAG:297 = 1');

  const joy = await setup_k6((f) => f.store.set('tflag:23', 3));
  const mod2 = joy.load_module('kojo/kojo-k6-wicked');
  await mod2.kojo_message_markcng_6();
  assert.equal(joy.store.get('cflag:31:298'), 1, '快乐刻印Lv3 CFLAG:298 = 1');

  const sub = await setup_k6((f) => f.store.set('tflag:24', 3));
  const mod3 = sub.load_module('kojo/kojo-k6-wicked');
  await mod3.kojo_message_markcng_6();
  assert.equal(sub.store.get('cflag:31:299'), 1, '屈服刻印Lv3 CFLAG:299 = 1');

  const def = await setup_k6((f) => f.store.set('tflag:21', 3));
  const mod4 = def.load_module('kojo/kojo-k6-wicked');
  await mod4.kojo_message_markcng_6();
  assert.equal(def.store.get('cflag:31:300'), 1, '反抗刻印Lv3 CFLAG:300 = 1');
});

test('调教后自慰（TFLAG:13 == 1）：それ以外初回 → CFLAG:261 = 1', async () => {
  const fixture = await setup_k6((f) => f.store.set('tflag:13', 1));
  const mod = fixture.load_module('kojo/kojo-k6-wicked');
  await mod.self_kojo_k6();
  assert.ok(fixture.text_lines().length > 0, 'SELF_KOJO 调教后自慰出声');
  assert.equal(fixture.store.get('cflag:31:261'), 1, 'CFLAG:261 = 1');
});

test('SELF_KOJO leftover_q 助手支出声', async () => {
  const fixture = await setup_k6((f) => {
    join_slave_chara(f, 1, '助手');
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.assi = 1;
  });
  const after = fixture.load_module('event/event-aftertrain');
  fixture.store.set('abl:31:0', 3);
  fixture.store.set('abl:31:11', 2);
  fixture.store.set('abl:31:31', 2);
  fixture.store.set('abl:31:22', 4);
  fixture.store.set('base:31:0', 1000);
  await after.aftertrain_masturbation_check(0, 1, () => 2);
  assert.equal(after.peek_aftertrain_q(), 1);
  assert.ok(
    fixture.text_lines().some((line) => line.includes('百合性交')),
    'SELF_KOJO 助手妄想支出声',
  );
});

test('SELF_KOJO leftover_s 回数插值', async () => {
  const fixture = await setup_k6((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('exp:31:5', 35);
    f.store.set('talent:0:122', 1);
    f.store.set('base:31:0', 1000);
    f.store.set('abl:31:2', 5);
  });
  const after = fixture.load_module('event/event-aftertrain');
  await after.aftertrain_sex_check();
  assert.equal(after.peek_aftertrain_s(), 3);
  assert.ok(
    fixture.text_lines().some((line) => line.includes('在3回中出后满足了')),
    `SELF_KOJO leftover_s 插值：${JSON.stringify(fixture.text_lines())}`,
  );
});
test('NTR_KOUJO P == 1（处女丧失）：素质分档 + CFLAG:650/651 推进', async () => {
  const fixture = await setup_k6();
  const mod = fixture.load_module('kojo/kojo-k6-wicked');
  await mod.ntr_koujo_k6(undefined, 1);
  assert.ok(
    fixture.text_lines().some((line) => line.includes('不要')),
    `NTR P==1：${JSON.stringify(fixture.text_lines())}`,
  );
  assert.equal(fixture.store.get('cflag:31:650'), 1, 'CFLAG:650');
  assert.equal(fixture.store.get('cflag:31:651'), 1, 'CFLAG:651');
});

test('GOBI_KOUJO ARG:0 == 1-5 各支与 0 随机三选一', async () => {
  const a1 = await setup_k6();
  const mod1 = a1.load_module('kojo/kojo-k6-wicked');
  await mod1.gobi_koujo_k6(1);
  assert.deepEqual(a1.text_lines(), ['的哟♪']);

  const a5 = await setup_k6();
  const mod5 = a5.load_module('kojo/kojo-k6-wicked');
  await mod5.gobi_koujo_k6(5);
  assert.deepEqual(a5.text_lines(), ['呢……。']);

  const a0 = await setup_k6();
  const mod0 = a0.load_module('kojo/kojo-k6-wicked');
  await mod0.gobi_koujo_k6(0, seq_rand(0));
  assert.deepEqual(a0.text_lines(), ['啊。']);
});

test('GOHOUBI_AFTER choice == 0 支出力', async () => {
  const fixture = await setup_k6();
  const mod = fixture.load_module('kojo/kojo-k6-wicked');
  await mod.gohoubi_after_koujo_k6(31, 0);
  assert.deepEqual(fixture.text_lines(), ['「这样的事情可不能长久」']);
});

test('惩罚口上 choice == 0 支出力', async () => {
  const fixture = await setup_k6();
  const mod = fixture.load_module('kojo/kojo-k6-wicked');
  await mod.osioki_koujo_k6(31, 0);
  assert.ok(
    fixture.text_lines().some((line) => line.includes('回房间')),
    `惩罚口上：${JSON.stringify(fixture.text_lines())}`,
  );
});

test('卖却分支（TFLAG:13 == 6）：存根行（SELL_MATURO_K0 未移植）', async () => {
  const fixture = await setup_k6((f) => f.store.set('tflag:13', 6));
  const mod = fixture.load_module('kojo/kojo-k6-wicked');
  await mod.self_kojo_k6();
  assert.ok(
    fixture.text_lines().some((line) => line.includes('SELL_MATURO_K0')),
    `卖却分支出存根行：${JSON.stringify(fixture.text_lines())}`,
  );
});

test('存根清单可检索：docs/stub-registry.md 收录 SELL_MATURO_K0', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('kojo/kojo-k6-wicked');
  const registry = fs.readFileSync(
    path.resolve(__dirname, '..', 'docs', 'stub-registry.md'),
    'utf8',
  );
  for (const name of STUBBED_CALLS) {
    assert.ok(
      registry.includes(name),
      `docs/stub-registry.md 必须收录 ${name}`,
    );
  }
});
