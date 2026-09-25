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
 *   - 成熟出售调用（SELL_MATURO_K0，#338 接通）。
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

test('GOBI_KOUJO ARG:0 == 1-5 各支与 0 随机三选一（返回文字，#570）', async () => {
  const a1 = await setup_k6();
  const mod1 = a1.load_module('kojo/kojo-k6-wicked');
  assert.equal(await mod1.gobi_koujo_k6(1), '的哟♪');
  assert.deepEqual(a1.text_lines(), [], '语尾真身不得自行打印');

  const a5 = await setup_k6();
  const mod5 = a5.load_module('kojo/kojo-k6-wicked');
  assert.equal(await mod5.gobi_koujo_k6(5), '呢……。');

  const a0 = await setup_k6();
  const mod0 = a0.load_module('kojo/kojo-k6-wicked');
  assert.equal(await mod0.gobi_koujo_k6(0, seq_rand(0)), '啊。');
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

test('卖却分支（TFLAG:13 == 6）：进入 SELL_MATURO_K0 真身', async () => {
  const fixture = await setup_k6((f) => {
    f.store.set('tflag:13', 6);
    f.set_inputs(999);
  });
  const mod = fixture.load_module('kojo/kojo-k6-wicked');
  await mod.self_kojo_k6();
  assert.ok(fixture.text_lines().includes('要卖到哪个市场？'));
});

test('SELL_MATURO_K0 已从存根清单移除', async () => {
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

// —— COLOSSEUM_KOJO_6：ITEM:PBAND → item:4（#552；源 :7495/:7528/:7552） ——
// PBAND 是 Emuera 内建非角色变量（SYSTEM ver1.0.3.ERB:42 赋 4，4 号 = 假阳具）；
// yml/Item.yml 名字表无 PBAND 条目，era.get('item:PBAND') 恒
// undefined（test/variable-yml.test.js 的引擎用例），地址写回时下列用例必须红。
// K6 的 COM 头部助手跳过在死斗场岔之前，assiplay 下到不了真身——直接驱动
// colosseum_kojo_6（与 test/kojo-k8-spade.test.js 的 COLOSSEUM 段同款）。
test('COLOSSEUM_KOJO_6：SC31/21/27 助手无 121/122 且持假阳具（item:4）→ 整行含「假阳具」', async () => {
  const cases = [
    {
      selectcom: 31,
      line: '玛奥将假阳具塞入悪女的口中。她吞吐着，脸上带有几分愉悦的表情……',
    },
    {
      selectcom: 21,
      line: '玛奥边听着惨叫边用假阳具毫不留情地蹂躏着悪女的阴道……',
    },
    {
      selectcom: 27,
      line: '玛奥边听着惨叫边用假阳具蹂躏着悪女那鲜嫩的肛门……',
    },
    // 助手有阴茎（TALENT:121）时走「阴茎」支——#621 合成后同一行里换词
    {
      selectcom: 31,
      assi_penis: 1,
      line: '玛奥将阴茎塞入悪女的口中。她吞吐着，脸上带有几分愉悦的表情……',
    },
    {
      selectcom: 21,
      assi_penis: 1,
      line: '玛奥边听着惨叫边用阴茎毫不留情地蹂躏着悪女的阴道……',
    },
    {
      selectcom: 27,
      assi_penis: 1,
      line: '玛奥边听着惨叫边用阴茎蹂躏着悪女那鲜嫩的肛门……',
    },
  ];
  for (const { selectcom, assi_penis, line } of cases) {
    const fixture = await setup_k6((f) => {
      join_slave_chara(f, 17, '玛奥');
      f.store.set('item:4', 1); // 原作 ITEM:PBAND（助手持有假阳具）
      if (assi_penis) f.store.set('talent:17:121', 1);
      const era_flag = f.load_module('era-utils/era-flag');
      era_flag.assi = 17;
      era_flag.assiplay = 1;
    }, selectcom);
    const mod = fixture.load_module('kojo/kojo-k6-wicked');
    await mod.colosseum_kojo_6(seq_rand(0));
    // #621：性器名与前后段合成一条输出（原先是三条），断言整行
    const shape = assi_penis ? '助手有 121' : '助手无 121/122 且 item:4 == 1';
    assert.ok(
      fixture.text_lines().includes(line),
      `selectcom ${selectcom} ${shape} → 整行「${line}」：${JSON.stringify(fixture.text_lines())}`,
    );
    if (!assi_penis) {
      assert.ok(
        !fixture.text_lines().includes('假阳具'),
        `selectcom ${selectcom} 拼接后性器名不再自成一行（#621）`,
      );
    }
  }
});

// —— #621：普查二类清单（27 组）合并后的整行断言 ——
// 源里一条输出由「无后缀 PRINTFORM 前缀 + 各互斥支的收行段」拼成，移植早期
// 按段各打一行；本票把同一条输出的各段合成一句 era.print*（拼接锚 // :a+:b）。
// 这里逐组断言整行文本，覆盖该行的各分支组合（判据两档 × 互斥支各一支）。

test('#621 口塞初回三档：前缀与收行段合成一条输出（:3953/:3962/:3971 组）', async () => {
  const cases = [
    {
      label: '淫乱＋眼罩',
      seed: (f) => {
        f.store.set('talent:31:76', 1);
        f.store.set('tequip:31:43', 1);
      },
      line: '配合地戴上口塞的悪女带着期待地晃动着………',
    },
    {
      label: '淫乱＋无眼罩（ELSE 支 :3957）',
      seed: (f) => f.store.set('talent:31:76', 1),
      line: '配合地戴上口塞的悪女带着期待你………',
    },
    {
      label: '爱慕＋眼罩',
      seed: (f) => {
        f.store.set('talent:31:85', 1);
        f.store.set('tequip:31:43', 1);
      },
      line: '配合地戴上口塞的悪女带着温柔的眼神晃动着………',
    },
    {
      label: '爱慕＋无眼罩（ELSE 支 :3966）',
      seed: (f) => f.store.set('talent:31:85', 1),
      line: '配合地戴上口塞的悪女带着温柔的眼神看着你………',
    },
    {
      label: 'それ以外＋眼罩',
      seed: (f) => f.store.set('tequip:31:43', 1),
      line: '戴上口塞的悪女左右摇着头………',
    },
    {
      label: 'それ以外＋无眼罩（ELSE 支 :3975）',
      seed: () => {},
      line: '戴上口塞的悪女瞪着你………',
    },
  ];
  for (const { label, seed, line } of cases) {
    const fixture = await setup_k6((f) => {
      f.store.set('tequip:31:45', 1);
      seed(f);
    }, 45);
    await speak_k6(fixture, seq_rand(0));
    assert.ok(
      fixture.text_lines().includes(line),
      `${label}：整行「${line}」——${JSON.stringify(fixture.text_lines())}`,
    );
  }
});

test('#621 口塞二回目四档：前缀与收行段合成一条输出（:3985/:4000/:4025/:4035 组）', async () => {
  const cases = [
    {
      label: '淫乱＋受虐狂Lv5＋眼罩',
      seed: (f) => {
        f.store.set('talent:31:76', 1);
        f.store.set('abl:31:21', 5);
        f.store.set('cflag:31:346', 9);
        f.store.set('tequip:31:43', 1);
      },
      line: '配合地戴上口塞的悪女粗重急促地喘息着………',
    },
    {
      label: '淫乱＋受虐狂Lv5＋无眼罩（ELSE 支 :3989）',
      seed: (f) => {
        f.store.set('talent:31:76', 1);
        f.store.set('abl:31:21', 5);
        f.store.set('cflag:31:346', 9);
      },
      line: '配合地戴上口塞的悪女粗重急促地喘息着，眼中闪耀着畅快淋漓的神色………',
    },
    {
      label: '淫乱（:4000+:4002）',
      seed: (f) => {
        f.store.set('talent:31:76', 1);
        f.store.set('cflag:31:346', 7);
        f.store.set('tequip:31:43', 1);
      },
      line: '配合地戴上口塞的悪女带着期待地晃动着………',
    },
    {
      label: '受虐狂Lv3＋眼罩（:4025+:4027）',
      seed: (f) => {
        f.store.set('abl:31:21', 3);
        f.store.set('cflag:31:346', 3);
        f.store.set('tequip:31:43', 1);
      },
      line: '悪女习以为常地被口塞塞住嘴眼色朦胧………',
    },
    {
      label: '受虐狂Lv3＋无眼罩（ELSE 支 :4029）',
      seed: (f) => {
        f.store.set('abl:31:21', 3);
        f.store.set('cflag:31:346', 3);
      },
      line: '悪女习以为常地被口塞塞住嘴看着你………',
    },
    {
      label: 'それ以外＋眼罩（:4035+:4037）',
      seed: (f) => {
        f.store.set('cflag:31:346', 1);
        f.store.set('tequip:31:43', 1);
      },
      line: '戴上口塞的悪女左右摇着头………',
    },
    {
      label: 'それ以外＋无眼罩（ELSE 支 :4039）',
      seed: (f) => f.store.set('cflag:31:346', 1),
      line: '戴上口塞的悪女瞪着你………',
    },
  ];
  for (const { label, seed, line } of cases) {
    const fixture = await setup_k6((f) => {
      f.store.set('tequip:31:45', 1);
      seed(f);
    }, 45);
    await speak_k6(fixture, seq_rand(0));
    assert.ok(
      fixture.text_lines().includes(line),
      `${label}：整行「${line}」——${JSON.stringify(fixture.text_lines())}`,
    );
  }
});

test('#621 录像自我介绍（SIF ABL:31）：前缀与收行段合成一条输出（:4311/:4383 组）', async () => {
  const cases = [
    { label: '含自慰妄想（初回 :4311+:4313+:4314）', cflag: 0, dirty: 1 },
    { label: '不含（初回）', cflag: 0, dirty: 0 },
    { label: '含自慰妄想（二回目 :4383+:4385+:4386）', cflag: 1, dirty: 1 },
    { label: '不含（二回目）', cflag: 1, dirty: 0 },
  ];
  for (const { label, cflag, dirty } of cases) {
    const fixture = await setup_k6((f) => {
      f.store.set('tequip:31:53', 1);
      f.store.set('cflag:31:357', cflag);
      f.store.set('abl:31:17', 5); // RAND:3 == 0 支的 TALENT:89 || ABL:17 >= 5
      f.store.set('abl:31:31', dirty ? 3 : 0); // SIF ABL:31 >= 3
    }, 56);
    await speak_k6(fixture, seq_rand(0));
    // 二回目那处（:4383）的名字在句首，与初回（:4311）词序不同（源 1:1）
    const line =
      (cflag === 0
        ? '面带微笑的悪女介绍了自己的本名和性经验'
        : '悪女面带微笑地介绍了自己的本名和性经验') +
      (dirty ? '，甚至还有手淫的时候想到的内容' : '') +
      '……';
    assert.ok(
      fixture.text_lines().includes(line),
      `${label}：整行「${line}」——${JSON.stringify(fixture.text_lines())}`,
    );
  }
});

test('#621 交谈・通常会話七支：前缀与各支收行段合成一条输出（:4342/:4414 两组）', async () => {
  // 两处链各七支（爱意 / 淫猥 / 语调三档 / 想要做爱 / 融洽 / 断断续续 / それ以外）
  const cases = [
    {
      label: '初回（:4342 组）・爱意',
      cflag: 0,
      seed: { 'palam:31:5': 10000, 'talent:31:85': 1, 'tflag:60': 1 },
      line: '在和你会话的过程中，悪女呢喃着充满爱意的话语。',
    },
    {
      label: '初回（:4342 组）・淫猥',
      cflag: 0,
      seed: { 'palam:31:5': 10000, 'talent:31:76': 1, 'tflag:60': 1 },
      line: '在和你会话的过程中，悪女扭动着腰叫嚷着淫猥的话语。',
    },
    {
      label: '初回（:4342 组）・语调・快乐',
      cflag: 0,
      seed: { 'palam:31:5': 10000, 'palam:31:4': 10000, 'tequip:31:11': 1 },
      line: '在和你会话的过程中，悪女带着快乐的语调拼命地回应着。',
    },
    {
      label: '初回（:4342 组）・语调・痛苦',
      cflag: 0,
      seed: { 'palam:31:5': 10000, 'palam:31:4': 10000, 'tequip:31:44': 1 },
      line: '在和你会话的过程中，悪女带着痛苦的语调拼命地回应着。',
    },
    {
      label: '初回（:4342 组）・语调・无档',
      cflag: 0,
      seed: { 'palam:31:5': 10000, 'palam:31:4': 10000 },
      line: '在和你会话的过程中，悪女拼命地回应着。',
    },
    {
      label: '初回（:4342 组）・想要做爱',
      cflag: 0,
      seed: { 'talent:31:76': 1 },
      line: '在和你会话的过程中，悪女一副想要做爱胜过说话的样子。',
    },
    {
      label: '初回（:4342 组）・融洽',
      cflag: 0,
      seed: { 'palam:31:4': 10000 },
      line: '在和你会话的过程中，悪女交谈还算融洽的样子。',
    },
    {
      label: '初回（:4342 组）・断断续续',
      cflag: 0,
      seed: { 'palam:31:4': 600 },
      line: '在和你会话的过程中，悪女时不时会给出一些回应。',
    },
    {
      label: '初回（:4342 组）・それ以外',
      cflag: 0,
      seed: {},
      line: '在和你会话的过程中，悪女一副心不在焉的样子…',
    },
    {
      label: '二回目（:4414 组）・爱意',
      cflag: 1,
      seed: { 'palam:31:5': 10000, 'talent:31:85': 1, 'tflag:60': 1 },
      line: '在和你会话的过程中，悪女呢喃着充满爱意的话语',
    },
    {
      label: '二回目（:4414 组）・淫猥',
      cflag: 1,
      seed: { 'palam:31:5': 10000, 'talent:31:76': 1, 'tflag:60': 1 },
      line: '在和你会话的过程中，悪女扭动着腰叫嚷着淫猥的话语',
    },
    {
      label: '二回目（:4414 组）・语调・快乐',
      cflag: 1,
      seed: { 'palam:31:5': 10000, 'palam:31:4': 10000, 'tequip:31:11': 1 },
      line: '在和你会话的过程中，悪女带着快乐的语调拼命地回应着。',
    },
    {
      label: '二回目（:4414 组）・语调・无档',
      cflag: 1,
      seed: { 'palam:31:5': 10000, 'palam:31:4': 10000 },
      line: '在和你会话的过程中，悪女拼命地回应着。',
    },
    {
      label: '二回目（:4414 组）・想要做爱',
      cflag: 1,
      seed: { 'talent:31:76': 1 },
      line: '在和你会话的过程中，悪女露出一副想要做爱胜过说话的样子。',
    },
    {
      label: '二回目（:4414 组）・融洽',
      cflag: 1,
      seed: { 'palam:31:4': 10000 },
      line: '在和你会话的过程中，与悪女的交谈还算融洽的样子。',
    },
    {
      label: '二回目（:4414 组）・断断续续',
      cflag: 1,
      seed: { 'palam:31:4': 600 },
      line: '在和你会话的过程中，悪女时不时会给出一些回应',
    },
    {
      label: '二回目（:4414 组）・それ以外',
      cflag: 1,
      seed: {},
      line: '在和你会话的过程中，悪女只是认真地听着…',
    },
  ];
  for (const { label, cflag, seed, line } of cases) {
    const fixture = await setup_k6((f) => {
      f.store.set('cflag:31:357', cflag);
      for (const [key, value] of Object.entries(seed)) f.store.set(key, value);
    }, 56);
    await speak_k6(fixture, seq_rand(0));
    assert.ok(
      fixture.text_lines().includes(line),
      `${label}：整行「${line}」——${JSON.stringify(fixture.text_lines())}`,
    );
  }
});

test('#621 口交时自慰八组：前缀与各支收行段合成一条输出（:4594 至 :4699）', async () => {
  // 八条链各四支（两穴 / 私处 / 肛门 / 无装备）：32 支全覆盖，逐支断言整行
  const cases = [
    {
      label: '淫乱・初回・两穴',
      cflag: 0,
      talent: ['talent:31:76'],
      tequip: ['tequip:31:11', 'tequip:31:13'],
      line: '悪女含住你的阴茎显得十分兴奋，用手摆弄着插入私处和肛门的蠕虫，激烈地抽插着……',
    },
    {
      label: '淫乱・初回・私处',
      cflag: 0,
      talent: ['talent:31:76'],
      tequip: ['tequip:31:11'],
      line: '悪女含住你的阴茎显得十分兴奋，用手摆弄着插入私处的蠕虫，激烈地抽插着……',
    },
    {
      label: '淫乱・初回・肛门',
      cflag: 0,
      talent: ['talent:31:76'],
      tequip: ['tequip:31:13'],
      line: '悪女含住你的阴茎显得十分兴奋，用手摆弄着插入肛门的蠕虫，激烈地抽插着……',
    },
    {
      label: '淫乱・初回・无装备',
      cflag: 0,
      talent: ['talent:31:76'],
      tequip: [],
      line: '悪女含住你的阴茎显得十分兴奋，自慰仍在继续着………',
    },
    {
      label: '爱慕・初回・两穴',
      cflag: 0,
      talent: ['talent:31:85'],
      tequip: ['tequip:31:11', 'tequip:31:13'],
      line: '悪女用舌头纠缠着你的阴茎，两穴里的蠕虫蠕动着，自慰激烈地继续………',
    },
    {
      label: '爱慕・初回・私处',
      cflag: 0,
      talent: ['talent:31:85'],
      tequip: ['tequip:31:11'],
      line: '悪女用舌头纠缠着你的阴茎，小穴里的壶虫蠕动着，自慰激烈的继续………',
    },
    {
      label: '爱慕・初回・肛门',
      cflag: 0,
      talent: ['talent:31:85'],
      tequip: ['tequip:31:13'],
      line: '悪女用舌头纠缠着你的阴茎，肛门里的肛门虫蠕动着，自慰激烈地继续………',
    },
    {
      label: '爱慕・初回・无装备',
      cflag: 0,
      talent: ['talent:31:85'],
      tequip: [],
      line: '悪女用舌头纠缠着你的阴茎，自慰仍在继续着………',
    },
    {
      label: '侍奉Lv3・初回・两穴',
      cflag: 0,
      talent: ['abl:31:16'],
      tequip: ['tequip:31:11', 'tequip:31:13'],
      line: '悪女被命令用口服侍你的阴茎，两穴里的蠕虫蠕动着，自慰仍在继续………',
    },
    {
      label: '侍奉Lv3・初回・私处',
      cflag: 0,
      talent: ['abl:31:16'],
      tequip: ['tequip:31:11'],
      line: '悪女被命令用口服侍你的阴茎，小穴里的壶虫蠕动着，自慰仍在继续………',
    },
    {
      label: '侍奉Lv3・初回・肛门',
      cflag: 0,
      talent: ['abl:31:16'],
      tequip: ['tequip:31:13'],
      line: '悪女被命令用口服侍你的阴茎，肛门里的肛门虫蠕动着，自慰仍在继续………',
    },
    {
      label: '侍奉Lv3・初回・无装备',
      cflag: 0,
      talent: ['abl:31:16'],
      tequip: [],
      line: '悪女被命令用口服侍你的阴茎，自慰仍在继续着………',
    },
    {
      label: 'それ以外・初回・两穴',
      cflag: 0,
      talent: [],
      tequip: ['tequip:31:11', 'tequip:31:13'],
      line: '悪女被命令用口服侍你的阴茎，两穴里的蠕虫蠕动着，自慰仍在继续………',
    },
    {
      label: 'それ以外・初回・私处',
      cflag: 0,
      talent: [],
      tequip: ['tequip:31:11'],
      line: '悪女被命令用口服侍你的阴茎，小穴里的壶虫蠕动着，自慰仍在继续………',
    },
    {
      label: 'それ以外・初回・肛门',
      cflag: 0,
      talent: [],
      tequip: ['tequip:31:13'],
      line: '悪女被命令用口服侍你的阴茎，肛门里的肛门虫蠕动着，自慰仍在继续………',
    },
    {
      label: 'それ以外・初回・无装备',
      cflag: 0,
      talent: [],
      tequip: [],
      line: '悪女被命令用口服侍你的阴茎，自慰仍在继续着………',
    },
    {
      label: '淫乱・二回目・两穴',
      cflag: 1,
      talent: ['talent:31:76'],
      tequip: ['tequip:31:11', 'tequip:31:13'],
      line: '悪女含住你的阴茎显得十分兴奋，两穴里的蠕虫蠕动着蠕动着，自慰激烈地继续………',
    },
    {
      label: '淫乱・二回目・私处',
      cflag: 1,
      talent: ['talent:31:76'],
      tequip: ['tequip:31:11'],
      line: '悪女含住你的阴茎显得十分兴奋，小穴里的壶虫蠕动着，自慰激烈的继续………',
    },
    {
      label: '淫乱・二回目・肛门',
      cflag: 1,
      talent: ['talent:31:76'],
      tequip: ['tequip:31:13'],
      line: '悪女含住你的阴茎显得十分兴奋，肛门里的肛门虫蠕动着，自慰激烈地继续………',
    },
    {
      label: '淫乱・二回目・无装备',
      cflag: 1,
      talent: ['talent:31:76'],
      tequip: [],
      line: '悪女含住你的阴茎显得十分兴奋，自慰仍在继续着………',
    },
    {
      label: '爱慕・二回目・两穴',
      cflag: 1,
      talent: ['talent:31:85'],
      tequip: ['tequip:31:11', 'tequip:31:13'],
      line: '悪女用舌头纠缠着你的阴茎，任两穴里的蠕虫蠕动着，摇动着纤腰………',
    },
    {
      label: '爱慕・二回目・私处',
      cflag: 1,
      talent: ['talent:31:85'],
      tequip: ['tequip:31:11'],
      line: '悪女用舌头纠缠着你的阴茎，任私处的蠕虫蠕动，摇动着纤腰………',
    },
    {
      label: '爱慕・二回目・肛门',
      cflag: 1,
      talent: ['talent:31:85'],
      tequip: ['tequip:31:13'],
      line: '悪女用舌头纠缠着你的阴茎，任肛门里的肛门虫蠕动，摇动着纤腰………',
    },
    {
      label: '爱慕・二回目・无装备',
      cflag: 1,
      talent: ['talent:31:85'],
      tequip: [],
      line: '悪女用舌头纠缠着你的阴茎，继续用手指在阴唇上抚摸着。',
    },
    {
      label: '侍奉Lv3・二回目・两穴',
      cflag: 1,
      talent: ['abl:31:16'],
      tequip: ['tequip:31:11', 'tequip:31:13'],
      line: '悪女被命令用口服侍你的阴茎，两穴里的蠕虫蠕动着，自慰激烈地继续………',
    },
    {
      label: '侍奉Lv3・二回目・私处',
      cflag: 1,
      talent: ['abl:31:16'],
      tequip: ['tequip:31:11'],
      line: '悪女被命令用口服侍你的阴茎，小穴里的壶虫蠕动着，自慰激烈的继续………',
    },
    {
      label: '侍奉Lv3・二回目・肛门',
      cflag: 1,
      talent: ['abl:31:16'],
      tequip: ['tequip:31:13'],
      line: '悪女被命令用口服侍你的阴茎，肛门里的肛门虫蠕动着，自慰激烈地继续………',
    },
    {
      label: '侍奉Lv3・二回目・无装备',
      cflag: 1,
      talent: ['abl:31:16'],
      tequip: [],
      line: '悪女被命令用口服侍你的阴茎，自慰仍在继续着………',
    },
    {
      label: 'それ以外・二回目・两穴',
      cflag: 1,
      talent: [],
      tequip: ['tequip:31:11', 'tequip:31:13'],
      line: '悪女被命令用口服侍你的阴茎，两穴里的蠕虫蠕动着，自慰激烈地继续………',
    },
    {
      label: 'それ以外・二回目・私处',
      cflag: 1,
      talent: [],
      tequip: ['tequip:31:11'],
      line: '悪女被命令用口服侍你的阴茎，小穴里的壶虫蠕动着，自慰激烈的继续………',
    },
    {
      label: 'それ以外・二回目・肛门',
      cflag: 1,
      talent: [],
      tequip: ['tequip:31:13'],
      line: '悪女被命令用口服侍你的阴茎，肛门里的肛门虫蠕动着，自慰激烈地继续………',
    },
    {
      label: 'それ以外・二回目・无装备',
      cflag: 1,
      talent: [],
      tequip: [],
      line: '悪女被命令用口服侍你的阴茎，自慰仍在继续着………',
    },
  ];
  for (const { label, cflag, talent, tequip, line } of cases) {
    const fixture = await setup_k6((f) => {
      f.store.set('cflag:31:361', cflag);
      for (const key of talent)
        f.store.set(key, key.startsWith('abl:') ? 3 : 1);
      for (const key of tequip) f.store.set(key, 1);
    }, 125);
    await speak_k6(fixture, seq_rand(0));
    assert.ok(
      fixture.text_lines().includes(line),
      `${label}：整行「${line}」——${JSON.stringify(fixture.text_lines())}`,
    );
  }
});

test('#621 百合PLAY 两处：前缀与「直到黄昏/夜幕渐深」合成一条输出（:6516/:6526 组）', async () => {
  const cases = [
    {
      label: '爱慕＋黄昏（:6516+:6518）',
      seed: (f) => {
        f.store.set('talent:31:85', 1);
        f.store.set('cflag:31:262', 4);
      },
      time: 0,
      line: '玛奥苦笑着和悪女以女人间特有的方式纠缠在一起，直到黄昏………',
    },
    {
      label: '爱慕＋夜幕（ELSE 支 :6520）',
      seed: (f) => {
        f.store.set('talent:31:85', 1);
        f.store.set('cflag:31:262', 4);
      },
      time: 1,
      line: '玛奥苦笑着和悪女以女人间特有的方式纠缠在一起，直到夜幕渐深………',
    },
    {
      label: '百合中毒Lv3＋黄昏（:6526+:6528）',
      seed: (f) => {
        f.store.set('abl:31:33', 3);
        f.store.set('cflag:31:262', 3);
      },
      time: 0,
      line: '尝到百合滋味的悪女嬉笑着和玛奥纠缠着，直到黄昏………',
    },
    {
      label: '百合中毒Lv3＋夜幕（ELSE 支 :6530）',
      seed: (f) => {
        f.store.set('abl:31:33', 3);
        f.store.set('cflag:31:262', 3);
      },
      time: 1,
      line: '尝到百合滋味的悪女嬉笑着和玛奥纠缠着，直到夜幕渐深………',
    },
  ];
  for (const { label, seed, time, line } of cases) {
    const fixture = await setup_k6((f) => {
      join_slave_chara(f, 17, '玛奥');
      // 百合PLAY 段在 @SELF_KOJO_K6 的「初吻与自我口上 == 2」里（TFLAG:13 == 2）
      f.store.set('tflag:13', 2);
      const era_flag = f.load_module('era-utils/era-flag');
      era_flag.assi = 17;
      era_flag.assiplay = 1;
      seed(f);
    });
    const era_flag = fixture.load_module('era-utils/era-flag');
    era_flag.time = time;
    const mod = fixture.load_module('kojo/kojo-k6-wicked');
    await mod.self_kojo_k6(seq_rand(0));
    assert.ok(
      fixture.text_lines().includes(line),
      `${label}：整行「${line}」——${JSON.stringify(fixture.text_lines())}`,
    );
  }
});

test('#621 迎击奖励请求：动物名与收行段合成一条输出（:7806+:7808+:7810+:7812）', async () => {
  // :7804 是 PRINTFORMW（自带换行），本组从 :7806 起——合成后是独立的一行
  const cases = [
    { kind: 1, line: '狗性交啦♪」' },
    { kind: 2, line: '猪性交啦♪」' },
    { kind: 3, line: '马性交啦♪」' },
  ];
  for (const { kind, line } of cases) {
    const fixture = await setup_k6();
    const mod = fixture.load_module('kojo/kojo-k6-wicked');
    fixture.store.set('cflag:31:504', kind);
    await mod.gohoubi_request_koujo_k6(31);
    assert.ok(
      fixture.text_lines().includes(line),
      `档位 ${kind}：整行「${line}」——${JSON.stringify(fixture.text_lines())}`,
    );
    assert.ok(
      fixture.text_lines().includes('「我想和…'),
      `档位 ${kind}：:7804 的 PRINTFORMW 仍自成一行——${JSON.stringify(fixture.text_lines())}`,
    );
  }
});
