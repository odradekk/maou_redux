/**
 * ere/kojo/kojo-k0-tender.js 的行为测试（issue #231——K0 慈爱口上）。
 *
 * 缝 = test/helpers/era-fixture.js。世界底座：琼（Chara31，素质 160
 * 慈爱 → GET_KOJO_NUM 100）入列调教。覆盖：
 *   - 首次与二次以后走不同分支且状态推进（验收项「此行为有测试」）；
 *   - MARK:2 刻印分档（>= 2 / == 3 / == 2 / <= 1）与 TALENT:76/85 素质分支；
 *   - FLAG:7 == 1 的阈值闸（每阶段一次）与 == 2 的旁路（每次出声）；
 *   - 七道跳过判定（K0 顺序：死斗场最先、崩坏在兽奸前；死斗场/兽奸岔专用口上）；
 *   - 爱抚外指令落占位行；
 *   - 舔阴 / 肛门爱抚 / 自慰状态机（自慰含拍摄拼接与 RAND:3/RAND:2）；
 *   - @EVENTTRAIN #PRI / @EVENTEND #LATER 的存在标志；
 *   - @EVENTTRAIN / @EVENTEND NORMAL 与二次口上 k0_kojo2（CFLAG:201 / 370 / 650 / 202）；
 *   - 存根清单核对（docs/stub-registry.md）。

 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

// 世界底座：琼入列调教 + K0 触发面（素质 160 / 存在标志 / 总开关默认 2）
async function setup_k0(seed) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '琼');
  fixture.era.beginTrain(0, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = 0;
  fixture.store.set('talent:31:160', 1); // 慈爱 → GET_KOJO_NUM = 100
  fixture.store.set('flag:100', 1); // K0 存在标志
  fixture.store.set('flag:7', 2); // 总开关默认（2 = 每次出声）
  if (seed) {
    seed(fixture);
  }
  fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k0-tender');
  return fixture;
}

// 经分发族调用（TRYCALLFORM KOJO_MESSAGE_COM_0 的等价物）
async function speak_k0(fixture, rand) {
  const { kojo_message_com_family } = fixture.load_module('kojo/kojo-system');
  return kojo_message_com_family.call(0, { args: [rand] });
}

// RAND:N 定值序：draws 依次被消费（RAND:3 先、RAND:2 后），越界取模
const seq_rand =
  (...draws) =>
  (n) => {
    const value = draws.shift() ?? 0;
    return value % n;
  };

test('首次（CFLAG:301 == 0 且 MARK:2 < 2）：虚假的爱 + 状态推进到 1', async () => {
  const fixture = await setup_k0();
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「你的爱是虚假的」',
    '琼紧锁眉头、蜷缩着身体………',
  ]);
  assert.equal(fixture.store.get('cflag:31:301'), 1, '状态推进到 1');
});

test('首次的刻印分档（MARK:2 >= 2）：老实支两句，推进到 1', async () => {
  const fixture = await setup_k0((f) => f.store.set('mark:31:2', 2));
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…我会、老实的…所以…啊～啊啊～！」',
    '琼乖乖的被你爱抚着身体………',
  ]);
  assert.equal(fixture.store.get('cflag:31:301'), 1);
});

test('二次以后走それ以外支（MARK:2 <= 1）：与首次不同分支，推进到 2', async () => {
  const fixture = await setup_k0((f) => f.store.set('cflag:31:301', 1));
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), ['「…好恶心」', '琼叹了口气………']);
  assert.equal(fixture.store.get('cflag:31:301'), 2);
});

test('淫乱分支（TALENT:76）：两句 + ♡ 插值，推进到 6', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:301', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊～…额呵呵…那个地方…再多摸摸…♡」',
    '只是稍微摸了摸琼她就把持不住了………',
  ]);
  assert.equal(fixture.store.get('cflag:31:301'), 6);
});

test('爱慕分支（TALENT:85）优先于刻印档：推进到 5', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('talent:31:85', 1);
    f.store.set('cflag:31:301', 1);
    f.store.set('mark:31:2', 3); // 刻印档在场，素质分支仍先取
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「再来…请把我揉得乱七八糟吧……！」',
    '琼像引诱你的手似的扭着身体………',
  ]);
  assert.equal(fixture.store.get('cflag:31:301'), 5);
});

test('屈服刻印 Lv3 / Lv2 分档：各推进到 4 / 3', async () => {
  const lv3 = await setup_k0((f) => {
    f.store.set('mark:31:2', 3);
    f.store.set('cflag:31:301', 3);
  });
  await speak_k0(lv3);
  assert.deepEqual(lv3.text_lines(), [
    '「哈啊…哈啊…啊啊啊～」',
    '琼的嘴里呼着热气………',
  ]);
  assert.equal(lv3.store.get('cflag:31:301'), 4);

  const lv2 = await setup_k0((f) => {
    f.store.set('mark:31:2', 2);
    f.store.set('cflag:31:301', 2);
  });
  await speak_k0(lv2);
  assert.deepEqual(lv2.text_lines(), [
    '「才不会…觉得舒服呢！　绝对不会！」',
    '琼扭动着身体忍耐着的样子………',
  ]);
  assert.equal(lv2.store.get('cflag:31:301'), 3);
});

test('阈值闸：FLAG:7 == 1 时上限生效（阶段耗尽后不出声），== 2 时旁路', async () => {
  // FLAG:7 == 1：淫乱已到 6（> 5），素质与刻印全不匹配 → 静默
  const quiet = await setup_k0((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:301', 6);
    f.store.set('flag:7', 1);
  });
  await speak_k0(quiet);
  assert.deepEqual(quiet.text_lines(), []);
  assert.equal(quiet.store.get('cflag:31:301'), 6); // 状态不动

  // 同状态 FLAG:7 == 2（默认）：上限旁路，淫乱支每次出声
  const repeat = await setup_k0((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:301', 6);
  });
  await speak_k0(repeat);
  assert.equal(repeat.text_lines().length, 2);
  assert.equal(repeat.store.get('cflag:31:301'), 6);
});

// —— 七道跳过判定（:676-699，K0 顺序：死斗场最先、崩坏在兽奸前） ——

test('死斗场（TEQUIP:55）最先：岔进 COLOSSEUM_KOJO_0 占位行', async () => {
  const fixture = await setup_k0((f) => f.store.set('tequip:31:55', 1));
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '（死斗场专用口上尚未移植，此处为占位——原作 @COLOSSEUM_KOJO_0，随死斗场票，见 docs/stub-registry.md。）',
  ]);
  assert.equal(fixture.store.get('cflag:31:301'), undefined);
});

test('助手调教中（ASSI > 0 && ASSIPLAY）：不输出', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.assi = 17;
    era_flag.assiplay = 1;
    f.seed_chara(17, { id: 17, name: '玛奥' });
    f.era.addCharacter(17);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), []);
  assert.equal(fixture.store.get('cflag:31:301'), undefined); // 状态未动
});

test('口塞（TEQUIP:45）：SELECTCOM != 45 跳过、== 45 不被此判定拦', async () => {
  const gagged = await setup_k0((f) => f.store.set('tequip:31:45', 1));
  await speak_k0(gagged);
  assert.deepEqual(gagged.text_lines(), []);

  // SELECTCOM == 45：不跳过——走口塞开始真身
  const speaking = await setup_k0((f) => {
    f.store.set('tequip:31:45', 1);
    f.store.set('talent:31:85', 1);
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 45;
  });
  await speak_k0(speaking);
  assert.deepEqual(speaking.text_lines(), ['「哈咕～…嗯～♡」']);
  assert.equal(speaking.store.get('cflag:31:346'), 1);
});

test('失神（TFLAG:899）：不输出', async () => {
  const fixture = await setup_k0((f) => f.store.set('tflag:899', 1));
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), []);
});

test('崩坏（TALENT:9）在兽奸前：不输出', async () => {
  const fixture = await setup_k0((f) => f.store.set('talent:31:9', 1));
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), []);
});

test('兽奸（TEQUIP:89）：K0 岔进 DOG_KOJO_0 占位行', async () => {
  const fixture = await setup_k0((f) => f.store.set('tequip:31:89', 1));
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '（兽奸专用口上尚未移植，此处为占位——原作 @DOG_KOJO_0，随兽奸票，见 docs/stub-registry.md。）',
  ]);
});

test('触手（TEQUIP:90）：不输出', async () => {
  const fixture = await setup_k0((f) => f.store.set('tequip:31:90', 1));
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), []);
});

test('爱抚外指令（SELECTCOM 仍为占位）：落占位行（分支待办可见）', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 4; // COM4 原作无口上；COM87 穿环落地后改用未填指令
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '（指令 4 的口上尚未移植，此处为占位——原作 @KOJO_MESSAGE_COM_0，随各自指令票，见 docs/stub-registry.md。）',
  ]);
});

test('舔阴首次处女（TALENT:0）：两句 + 状态推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 1;
    f.store.set('talent:31:0', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「你、你在舔哪里啊～」',
    '琼的私处处有着处女的味道………',
  ]);
  assert.equal(fixture.store.get('cflag:31:302'), 1, '舔阴首次推进到 1');
});

test('舔阴首次非处女：一句拒绝，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 1;
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), ['「请住手吧…不要舔那个地方！」']);
  assert.equal(fixture.store.get('cflag:31:302'), 1);
});

test('舔阴二次淫乱（TALENT:76）：♡ 插值，推进到 5', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 1;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:302', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「再来～…再舔我那里吧…喝下去也行…啊啊～～♡」',
    '蜜汁从琼的私处处不断涌了出来………',
  ]);
  assert.equal(fixture.store.get('cflag:31:302'), 5);
});

test('舔阴二次爱慕 / 屈服 Lv3 / それ以外：各推进到 4 / 3 / 2', async () => {
  const love = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 1;
    f.store.set('talent:31:85', 1);
    f.store.set('cflag:31:302', 1);
    f.store.set('mark:31:2', 3);
  });
  await speak_k0(love);
  assert.deepEqual(love.text_lines(), [
    '「哈哈～…好吃吗？　这个…♪」',
    '琼腼腆的笑着发出快乐的声音………',
  ]);
  assert.equal(love.store.get('cflag:31:302'), 4);

  const lv3 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 1;
    f.store.set('mark:31:2', 3);
    f.store.set('cflag:31:302', 2);
  });
  await speak_k0(lv3);
  assert.deepEqual(lv3.text_lines(), [
    '「呜唔呜唔…呜呜～！　不要～」',
    '琼嘴上说着不要但还是老实地让你舔着………',
  ]);
  assert.equal(lv3.store.get('cflag:31:302'), 3);

  const other = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 1;
    f.store.set('cflag:31:302', 1);
  });
  await speak_k0(other);
  assert.deepEqual(other.text_lines(), ['「这么脏的地方也…」']);
  assert.equal(other.store.get('cflag:31:302'), 2);
});

test('舔阴阈值闸：FLAG:7 == 1 时上限生效，== 2 时旁路', async () => {
  const quiet = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 1;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:302', 5);
    f.store.set('flag:7', 1);
  });
  await speak_k0(quiet);
  assert.deepEqual(quiet.text_lines(), []);

  // FLAG:7 == 1 且 CFLAG:302 == 4：<= 4 命中淫乱支（变异把门槛改成 <= 3 会静默）
  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 1;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:302', 4);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.deepEqual(at_cap.text_lines(), [
    '「再来～…再舔我那里吧…喝下去也行…啊啊～～♡」',
    '蜜汁从琼的私处处不断涌了出来………',
  ]);

  const bypass = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 1;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:302', 5);
  });
  await speak_k0(bypass);
  assert.deepEqual(bypass.text_lines(), [
    '「再来～…再舔我那里吧…喝下去也行…啊啊～～♡」',
    '蜜汁从琼的私处处不断涌了出来………',
  ]);
});

test('肛门爱抚首次：一句拒绝，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 2;
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), ['「讨厌！　难、难以置信！」']);
  assert.equal(fixture.store.get('cflag:31:303'), 1, '肛门爱抚首次推进到 1');
});

test('肛门爱抚二次淫乱+润滑 Lv2：娇喘支，推进到 7', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 2;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:303', 1);
    f.store.set('palam:31:3', 500); // PALAMLV[2]
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊呜～…好棒～！再来…往深处挖！往深处抠！」',
    '琼每当被抠弄肛门就会发出娇喘………',
  ]);
  assert.equal(fixture.store.get('cflag:31:303'), 7);
});

test('肛门爱抚二次淫乱+润滑不足：♡ 插值，推进到 6', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 2;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:303', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊～～…明明还不够湿…不过这样也好棒♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:303'), 6);
});

test('肛门爱抚二次爱慕分润滑：湿润疼爱 / 不足惊吓', async () => {
  const wet = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 2;
    f.store.set('talent:31:85', 1);
    f.store.set('cflag:31:303', 1);
    f.store.set('palam:31:3', 500);
  });
  await speak_k0(wet);
  assert.deepEqual(wet.text_lines(), [
    '「再、再多疼爱一下屁股眼吧！」',
    '琼每当被抠弄肛门就会发出不成体统的呻吟………',
  ]);
  assert.equal(wet.store.get('cflag:31:303'), 5);

  const dry = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 2;
    f.store.set('talent:31:85', 1);
    f.store.set('cflag:31:303', 1);
  });
  await speak_k0(dry);
  assert.deepEqual(dry.text_lines(), ['「突、突然做什么呢！？」']);
  assert.equal(dry.store.get('cflag:31:303'), 4);
});

test('肛门爱抚二次润滑+A感觉 Lv3：自称插值，推进到 3', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 2;
    f.store.set('cflag:31:303', 1);
    f.store.set('palam:31:3', 500);
    f.store.set('abl:31:3', 3);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「难以置信…我…的屁股…啊～…啊啊～！」',
    '琼因为肛门的快感而神情迷醉………',
  ]);
  assert.equal(fixture.store.get('cflag:31:303'), 3);
});

test('肛门爱抚二次それ以外：拒绝，推进到 2', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 2;
    f.store.set('cflag:31:303', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), ['「不要啊…够了、快住手～！」']);
  assert.equal(fixture.store.get('cflag:31:303'), 2);
});

test('肛门爱抚 A钝感附加句：湿润开发 / 不足开发 / 末支红肿', async () => {
  const wet = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 2;
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:105', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('cflag:31:303', 1);
    f.store.set('palam:31:3', 500);
  });
  await speak_k0(wet);
  assert.deepEqual(wet.text_lines(), [
    '「啊呜～…好棒～！再来…往深处挖！往深处抠！」',
    '琼钝感的肛门已经被完全开发好了、张得大大的。',
    '琼每当被抠弄肛门就会发出娇喘………',
  ]);

  const dry = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 2;
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:105', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('cflag:31:303', 1);
  });
  await speak_k0(dry);
  assert.deepEqual(dry.text_lines(), [
    '「啊～～…明明还不够湿…不过这样也好棒♡」',
    '琼钝感的肛门已经被完全开发好了、虽然还不够润滑但也能享受起你的爱抚………',
  ]);

  const other = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 2;
    f.store.set('talent:31:105', 1);
    f.store.set('cflag:31:303', 1);
  });
  await speak_k0(other);
  assert.deepEqual(other.text_lines(), [
    '「不要啊…够了、快住手～！」',
    '琼钝感的肛门被刺激得红肿了起来………',
  ]);
});

test('肛门爱抚润滑合计含 UP:3：delta 把不足抬过 Lv2', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 2;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:303', 1);
    f.store.set('palam:31:3', 400);
    f.store.set('delta:31:3', 100);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊呜～…好棒～！再来…往深处挖！往深处抠！」',
    '琼每当被抠弄肛门就会发出娇喘………',
  ]);
});

test('肛门爱抚末支门槛是 CFLAG:223（原文 :847），不是 303', async () => {
  const quiet = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 2;
    f.store.set('cflag:31:303', 1);
    f.store.set('cflag:31:223', 2);
    f.store.set('flag:7', 1);
  });
  await speak_k0(quiet);
  assert.deepEqual(quiet.text_lines(), []);
});

test('自慰首次爱慕或淫乱：一句邀请，推进到 1', async () => {
  const love = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 3;
    f.store.set('talent:31:85', 1);
  });
  await speak_k0(love);
  assert.deepEqual(love.text_lines(), ['「啊啊…请多多的…欣赏吧…♪」']);
  assert.equal(love.store.get('cflag:31:304'), 1, '自慰首次推进到 1');

  const lewd = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 3;
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(lewd);
  assert.deepEqual(lewd.text_lines(), ['「啊啊…请多多的…欣赏吧…♪」']);
});

test('自慰首次非爱慕非淫乱：两句，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 3;
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「你是…恶魔」',
    '琼一副要哭出来的样子继续自慰着………',
  ]);
  assert.equal(fixture.store.get('cflag:31:304'), 1);
});

test('自慰二次淫乱+处女：自称插值三句，推进到 9', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 3;
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:0', 1);
    f.store.set('cflag:31:304', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「咿～～…呀呜呜～～…主人～…快点把我的淫乱处女膜夺走吧！夺走吧～～～～！！」',
    '「不管是用狗～！还是用怪物～！什么都好～！把我的小穴捣进去吧～～～！」',
    '琼的脸上已经再也找不到一丝被称作圣女时候的清纯痕迹了………',
  ]);
  assert.equal(fixture.store.get('cflag:31:304'), 9);
});

test('自慰二次淫乱+自慰中毒 Lv3：拍摄拼接 / 三支随机', async () => {
  const film = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 3;
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:122', 1);
    f.store.set('abl:31:31', 3);
    f.store.set('tequip:31:53', 1);
    f.store.set('cflag:31:304', 1);
  });
  await speak_k0(film);
  assert.deepEqual(film.text_lines(), [
    '「看吧～♡　噗咻噗咻勃起的',
    '鸡鸡～',
    '♡」',
    '「我今天也是情绪高涨！请大家一起看我做舒服的事吧～♡」',
  ]);
  assert.equal(film.store.get('cflag:31:304'), 8);

  const dildo = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 3;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:31', 3);
    f.store.set('tequip:31:53', 1);
    f.store.set('cflag:31:304', 1);
  });
  await speak_k0(dildo);
  assert.deepEqual(dildo.text_lines(), [
    '「看吧～♡　噗咻噗咻勃起的',
    '假鸡鸡～',
    '♡」',
    '「我今天也是情绪高涨！请大家一起看我做舒服的事吧～♡」',
  ]);

  const r0 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 3;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:31', 3);
    f.store.set('cflag:31:304', 1);
  });
  await speak_k0(r0, seq_rand(0));
  assert.deepEqual(r0.text_lines(), [
    '「小穴…好爽…啊啊～…飞起来了～飞起来了～♡」',
  ]);

  const r1 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 3;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:31', 3);
    f.store.set('cflag:31:304', 1);
  });
  await speak_k0(r1, seq_rand(1, 0));
  assert.deepEqual(r1.text_lines(), [
    '「平时一个人是怎么做的…就让你好好看看吧…」',
  ]);

  const r2 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 3;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:31', 3);
    f.store.set('cflag:31:304', 1);
  });
  await speak_k0(r2, seq_rand(1, 1));
  assert.deepEqual(r2.text_lines(), [
    '「啊～啊～…搅着搅着小穴里的淫水就止不住了啊啊啊～♡」',
  ]);
});

test('自慰二次淫乱+自慰中毒不足 / 爱慕处女 / 屈服 Lv3 / それ以外', async () => {
  const low = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 3;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:304', 1);
  });
  await speak_k0(low, seq_rand(0));
  assert.deepEqual(low.text_lines(), [
    '「啊啊～～…明明在主人的眼前～…卖力自慰后请赏我大肉棒吧～～～♡」',
  ]);
  assert.equal(low.store.get('cflag:31:304'), 7);

  const love_v = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 3;
    f.store.set('talent:31:85', 1);
    f.store.set('talent:31:0', 1);
    f.store.set('cflag:31:304', 1);
  });
  await speak_k0(love_v);
  assert.deepEqual(love_v.text_lines(), [
    '「啊…啊啊～、快看…我在玩弄主人专用的专属小穴…！」',
    '「哦～…哦哦～…感觉处女膜也在一颤一颤的呢…♡」',
  ]);
  assert.equal(love_v.store.get('cflag:31:304'), 6);

  const yield_lv3 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 3;
    f.store.set('mark:31:2', 3);
    f.store.set('abl:31:31', 1);
    f.store.set('cflag:31:304', 1);
  });
  await speak_k0(yield_lv3, seq_rand(0));
  assert.deepEqual(yield_lv3.text_lines(), ['「如果这是你希望的话…」']);
  assert.equal(yield_lv3.store.get('cflag:31:304'), 3);

  const other = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 3;
    f.store.set('cflag:31:304', 1);
  });
  await speak_k0(other, seq_rand(1));
  assert.deepEqual(other.text_lines(), ['「真讨厌…」']);
  assert.equal(other.store.get('cflag:31:304'), 2);
});

test('自慰二次爱慕+自慰中毒 Lv3：拍摄拼接与随机支', async () => {
  const film = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 3;
    f.store.set('talent:31:85', 1);
    f.store.set('abl:31:31', 3);
    f.store.set('tequip:31:53', 1);
    f.store.set('cflag:31:304', 1);
  });
  await speak_k0(film);
  assert.deepEqual(film.text_lines(), [
    '「看见了吗？～♪　噗咻噗咻勃起的',
    '假鸡鸡',
    '♪」',
    '「我呐，只有有爱的话，在大家面前也不觉得尴尬了……♪」',
  ]);
  assert.equal(film.store.get('cflag:31:304'), 5);

  const r0 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 3;
    f.store.set('talent:31:85', 1);
    f.store.set('abl:31:31', 3);
    f.store.set('cflag:31:304', 1);
  });
  await speak_k0(r0, seq_rand(0));
  assert.deepEqual(r0.text_lines(), ['「好、爽～！　啊哈哈…哈哈…好爽～！」']);
});

test('自慰阈值闸：FLAG:7 == 1 时上限生效，== 2 时旁路', async () => {
  const quiet = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 3;
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:0', 1);
    f.store.set('cflag:31:304', 9);
    f.store.set('flag:7', 1);
  });
  await speak_k0(quiet);
  assert.deepEqual(quiet.text_lines(), []);

  // FLAG:7 == 1 且 CFLAG:304 == 8：<= 8 命中淫乱+处女（变异把门槛改成 <= 7 会静默）
  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 3;
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:0', 1);
    f.store.set('cflag:31:304', 8);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.deepEqual(at_cap.text_lines(), [
    '「咿～～…呀呜呜～～…主人～…快点把我的淫乱处女膜夺走吧！夺走吧～～～～！！」',
    '「不管是用狗～！还是用怪物～！什么都好～！把我的小穴捣进去吧～～～！」',
    '琼的脸上已经再也找不到一丝被称作圣女时候的清纯痕迹了………',
  ]);
  assert.equal(at_cap.store.get('cflag:31:304'), 9, '自慰阈值闸');

  const bypass = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 3;
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:0', 1);
    f.store.set('cflag:31:304', 9);
  });
  await speak_k0(bypass);
  assert.deepEqual(bypass.text_lines(), [
    '「咿～～…呀呜呜～～…主人～…快点把我的淫乱处女膜夺走吧！夺走吧～～～～！！」',
    '「不管是用狗～！还是用怪物～！什么都好～！把我的小穴捣进去吧～～～！」',
    '琼的脸上已经再也找不到一丝被称作圣女时候的清纯痕迹了………',
  ]);
});

test('胸爱抚首次母乳+爱慕/淫乱：吮吸邀请，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 5;
    f.store.set('talent:31:130', 1);
    f.store.set('palam:31:5', 3001);
    f.store.set('talent:31:85', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「吸吧～！我的乳房～…请你吮吸并品尝母乳吧～…♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:306'), 1, '胸爱抚首次推进到 1');
});

test('胸爱抚首次母乳+非爱慕：拒绝 + B钝感附加句', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 5;
    f.store.set('talent:31:130', 1);
    f.store.set('palam:31:5', 3001);
    f.store.set('talent:31:107', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊啊～…乳房被吸了…不要啊～…呜啊…啊啊～！」',
    '琼钝感的乳头被吸吮着、被刺激的红肿起来………',
  ]);
});

test('胸爱抚首次非母乳：爱慕邀请 / 非爱慕拒绝', async () => {
  const love = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 5;
    f.store.set('talent:31:85', 1);
  });
  await speak_k0(love);
  assert.deepEqual(love.text_lines(), ['「请你随心所欲的揉吧…♪」']);

  const other = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 5;
  });
  await speak_k0(other);
  assert.deepEqual(other.text_lines(), ['「讨厌、变态！」']);
});

test('胸爱抚二次母乳淫乱 / 爱慕 / B感觉 / それ以外', async () => {
  const lewd = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 5;
    f.store.set('talent:31:130', 1);
    f.store.set('palam:31:5', 3001);
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:306', 1);
  });
  await speak_k0(lewd);
  assert.deepEqual(lewd.text_lines(), [
    '「主人～…再吸吧～…乳房一被吸…就好像要去了似的呢～♡」',
    '琼一颤一颤的痉挛着往你的嘴里喷出母乳、沉浸在快乐之中………',
  ]);
  assert.equal(lewd.store.get('cflag:31:306'), 5);

  const love = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 5;
    f.store.set('talent:31:130', 1);
    f.store.set('palam:31:5', 3001);
    f.store.set('talent:31:85', 1);
    f.store.set('cflag:31:306', 1);
  });
  await speak_k0(love);
  assert.deepEqual(love.text_lines(), [
    '「主人～…再吸吧～…吸我的奶来恢复精神吧♡」',
    '琼像慈母般微笑着看着吮吸着乳头的你、摸着你的头………',
  ]);
  assert.equal(love.store.get('cflag:31:306'), 4);

  const sense = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 5;
    f.store.set('talent:31:130', 1);
    f.store.set('palam:31:5', 3001);
    f.store.set('abl:31:1', 3);
    f.store.set('cflag:31:306', 1);
  });
  await speak_k0(sense);
  assert.deepEqual(sense.text_lines(), [
    '「啊啊～…这、这样吸下去的话…噫～…这可是小宝宝吸的…东西啊…啊啊～♪」',
    '琼每当乳头溢出母乳就会沉浸在愉悦之中………',
  ]);
  assert.equal(sense.store.get('cflag:31:306'), 3);

  const other = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 5;
    f.store.set('talent:31:130', 1);
    f.store.set('palam:31:5', 3001);
    f.store.set('cflag:31:306', 1);
  });
  await speak_k0(other);
  assert.deepEqual(other.text_lines(), [
    '「啊啊～…饶了我吧～！乳房…不要吸乳房啊～…啊～啊啊～！」',
    '琼的乳头溢出了母乳、渐渐沉溺于母乳流出所带来的炽热快感中………',
  ]);
  assert.equal(other.store.get('cflag:31:306'), 2);
});

test('胸爱抚二次母乳阈值闸：FLAG:7 == 1 时上限生效', async () => {
  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 5;
    f.store.set('talent:31:130', 1);
    f.store.set('palam:31:5', 3001);
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:306', 4);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.deepEqual(at_cap.text_lines(), [
    '「主人～…再吸吧～…乳房一被吸…就好像要去了似的呢～♡」',
    '琼一颤一颤的痉挛着往你的嘴里喷出母乳、沉浸在快乐之中………',
  ]);
  assert.equal(at_cap.store.get('cflag:31:306'), 5, '胸爱抚母乳阈值闸');
});

test('胸爱抚二次非母乳：淫乱 + B钝感附加句 / 阈值闸', async () => {
  const lewd = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 5;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:1', 3);
    f.store.set('talent:31:107', 1);
    f.store.set('cflag:31:306', 1);
  });
  await speak_k0(lewd);
  assert.deepEqual(lewd.text_lines(), [
    '「再来～…虽然很痛但也被弄得好舒服呢…啊啊♡」',
    '琼钝感的乳头已被完全开发、被含进嘴里舔得完全勃起了………',
  ]);
  assert.equal(lewd.store.get('cflag:31:306'), 5);

  const quiet = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 5;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:306', 5);
    f.store.set('flag:7', 1);
  });
  await speak_k0(quiet);
  assert.deepEqual(quiet.text_lines(), []);

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 5;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:306', 4);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.deepEqual(at_cap.text_lines(), [
    '「再来～…虽然很痛但也被弄得好舒服呢…啊啊♡」',
  ]);
  assert.equal(at_cap.store.get('cflag:31:306'), 5, '胸爱抚阈值闸');
});

test('接吻初吻+淫乱主人：三句 + 故乡恋人附加句，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 6;
    f.store.set('tflag:13', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:317', 4);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊～～…嗯啾…啾～…嘞咯～…嘞噗～啾～啾～～♡」',
    '琼在初吻时就用难以想象的热情与你激吻中………',
    '「哈啊啊～…再来…早该这样了…呐、再多和我…亲吻一会儿吧♡」',
    '痴痴笑着的琼脑子里已经没有故乡恋人的存在了吧………',
  ]);
  assert.equal(fixture.store.get('cflag:31:307'), 1, '接吻首次推进到 1');
});

test('接吻调教首次非初吻：爱慕一句，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 6;
    f.store.set('talent:31:85', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯…啾…哈啊啊…感觉到爱了…那个、可以再来一次吗？」',
  ]);
  assert.equal(fixture.store.get('cflag:31:307'), 1);
});

test('接吻二次淫乱 / 爱慕 / 顺从 / それ以外', async () => {
  const lewd = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 6;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:307', 1);
  });
  await speak_k0(lewd);
  assert.deepEqual(lewd.text_lines(), [
    '「嗯嘞咯～♪…啾～…啾噗…啾～…嗯～…请再多吻我吧…♡」',
  ]);
  assert.equal(lewd.store.get('cflag:31:307'), 5);

  const love = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 6;
    f.store.set('talent:31:85', 1);
    f.store.set('cflag:31:307', 1);
  });
  await speak_k0(love);
  assert.deepEqual(love.text_lines(), [
    '「哈啊啊…喜欢…好喜欢…不、我只是说喜欢接吻罢了…啊～～♪」',
    '你如琼所愿、不断地接吻着………',
  ]);
  assert.equal(love.store.get('cflag:31:307'), 4);

  const obedient = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 6;
    f.store.set('abl:31:10', 2);
    f.store.set('cflag:31:307', 1);
  });
  await speak_k0(obedient);
  assert.deepEqual(obedient.text_lines(), [
    '「嗯～…哈啊啊…这、这样就可以了吧？…啊～、不要～…嗯嗯呜～！」',
  ]);
  assert.equal(obedient.store.get('cflag:31:307'), 3);

  const other = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 6;
    f.store.set('cflag:31:307', 1);
  });
  await speak_k0(other);
  assert.deepEqual(other.text_lines(), [
    '「嗯～…咕～…」',
    '琼把唇移开、不好意思的躲闪着视线………',
  ]);
  assert.equal(other.store.get('cflag:31:307'), 2);
});

test('接吻二次阈值闸：FLAG:7 == 1 时上限生效', async () => {
  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 6;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:307', 4);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.deepEqual(at_cap.text_lines(), [
    '「嗯嘞咯～♪…啾～…啾噗…啾～…嗯～…请再多吻我吧…♡」',
  ]);
  assert.equal(at_cap.store.get('cflag:31:307'), 5, '接吻二次阈值闸');
});

test('自己扒开首次淫乱 / 爱慕 / それ以外，推进到 1', async () => {
  const lewd = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 7;
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(lewd);
  assert.deepEqual(lewd.text_lines(), [
    '「好的～…张开啦～♡…怎么样呢…我的淫乱小穴…因为想要主人的大肉棒、大大的张开了哦～♡」',
  ]);
  assert.equal(lewd.store.get('cflag:31:308'), 1, '自己扒开首次推进到 1');

  const love = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 7;
    f.store.set('talent:31:85', 1);
  });
  await speak_k0(love);
  assert.deepEqual(love.text_lines(), [
    '「虽、虽然很害羞…如果是主人的命令的话…啊～～…讨厌…爱液流出来了～～………嗯」',
  ]);

  const other = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 7;
  });
  await speak_k0(other);
  assert.deepEqual(other.text_lines(), ['「咕呜…这、这样…是不对的…」']);
});

test('自己扒开二次：原文把推进写进 CFLAG:306（胸爱抚），不是 308', async () => {
  const lewd = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 7;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:308', 1);
  });
  await speak_k0(lewd);
  assert.deepEqual(lewd.text_lines(), [
    '「啊哈～…主人～…请再多多的…往里面看吧～…这里已经迫不及待地想被小鸡鸡插来插去了呢♡」',
  ]);
  assert.equal(lewd.store.get('cflag:31:306'), 5, '自己扒开二次写 CFLAG:306');
  assert.equal(lewd.store.get('cflag:31:308'), 1, 'CFLAG:308 保持首次后的 1');
});

test('插入手指首次：淫乱 / 屈服Lv3+爱慕 / それ以外+V钝感，推进到 1', async () => {
  const lewd = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 8;
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(lewd);
  assert.deepEqual(lewd.text_lines(), [
    '「啊～…嗯咕～…再继续…往里面插…尽情蹂躏我的阴道吧…♡」',
  ]);
  assert.equal(lewd.store.get('cflag:31:309'), 1, '插入手指首次推进到 1');

  const love = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 8;
    f.store.set('mark:31:2', 3);
    f.store.set('talent:31:85', 1);
  });
  await speak_k0(love);
  assert.deepEqual(love.text_lines(), [
    '「好、好的…我会忍耐的…请再往里面插…」',
    '「呀～～…啊啊…是的、没问题…啊啊～♪」',
  ]);

  const other = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 8;
    f.store.set('talent:31:103', 1);
  });
  await speak_k0(other);
  assert.deepEqual(other.text_lines(), [
    '「哈呜～…咕～…呜唔…啊…住手…住手啊…啊～…！」',
    '因为琼的私处不太容易有感觉、琼好像很痛苦的呻吟着………',
  ]);
});

test('插入手指二次：淫乱 + V钝感附加句 / 阈值闸', async () => {
  const lewd = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 8;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:2', 3);
    f.store.set('talent:31:103', 1);
    f.store.set('cflag:31:309', 1);
  });
  await speak_k0(lewd);
  assert.deepEqual(lewd.text_lines(), [
    '「啊啊～再往里面插吧！把小穴弄得湿漉漉的吧！」',
    '琼钝感的私处已经被完全开发了、贪婪的吞下了你所有的爱抚………',
  ]);
  assert.equal(lewd.store.get('cflag:31:309'), 5);

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 8;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:309', 4);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.deepEqual(at_cap.text_lines(), [
    '「啊啊～再往里面插吧！把小穴弄得湿漉漉的吧！」',
  ]);
  assert.equal(at_cap.store.get('cflag:31:309'), 5, '插入手指二次阈值闸');
});

test('舔肛首次：淫乱 / 爱慕 / それ以外+A钝感，推进到 1', async () => {
  const lewd = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 9;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('talent:31:105', 1);
  });
  await speak_k0(lewd);
  assert.deepEqual(lewd.text_lines(), [
    '「咿呀～～…那、那种地方被舐了的话…呜啊～…啊啊～…还要…再舐舐吧…」',
    '琼钝感的肛门被开发了、被你的舌头弄得发出了非常带感的声音………',
  ]);
  assert.equal(lewd.store.get('cflag:31:310'), 1, '舔肛首次推进到 1');

  const love = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 9;
    f.store.set('talent:31:85', 1);
  });
  await speak_k0(love);
  assert.deepEqual(love.text_lines(), [
    '「那、那里很脏啊…太羞人了…请、请住手吧…咕呜呜～～」',
  ]);

  const other = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 9;
    f.store.set('talent:31:105', 1);
  });
  await speak_k0(other);
  assert.deepEqual(other.text_lines(), [
    '「噫～！那、那种地方被舐了的话…不、不要啊～」',
    '琼不知是不是真的因为肛门被舔而感到难过发出了高亢的悲鸣声………',
  ]);
});

test('舔肛二次：淫乱 + A钝感附加句 / 阈值闸', async () => {
  const lewd = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 9;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('talent:31:105', 1);
    f.store.set('cflag:31:310', 1);
  });
  await speak_k0(lewd);
  assert.deepEqual(lewd.text_lines(), [
    '「咿呀呜～…啊啊…主人～…再…再用舌头舔我吧～♡」',
    '琼钝感的肛门被开发了、被你的舌头弄得发出了非常带感的声音………',
  ]);
  assert.equal(lewd.store.get('cflag:31:310'), 5);

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 9;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:310', 4);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.deepEqual(at_cap.text_lines(), [
    '「咿呀呜～…啊啊…主人～…再…再用舌头舔我吧～♡」',
  ]);
  assert.equal(at_cap.store.get('cflag:31:310'), 5, '舔肛二次阈值闸');
});

test('振动宝石首次：淫乱 / 屈服Lv3+爱慕 / それ以外，推进到 1', async () => {
  const lewd = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 10;
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(lewd);
  assert.deepEqual(lewd.text_lines(), [
    '「咕呼呜～…这样的震动太美妙了…再来…再继续按在那里～♡」',
  ]);
  assert.equal(lewd.store.get('cflag:31:311'), 1, '振动宝石首次推进到 1');

  const love = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 10;
    f.store.set('mark:31:2', 3);
    f.store.set('talent:31:85', 1);
  });
  await speak_k0(love);
  assert.deepEqual(love.text_lines(), [
    '「啊～…嗯～…没、没事的、再来…请尽情使用吧…♪」',
  ]);

  const other = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 10;
  });
  await speak_k0(other);
  assert.deepEqual(other.text_lines(), [
    '「咿呀～…这、这到底是什么东西…咿呀啊～！？」',
  ]);
});

test('振动宝石二次：淫乱 / 爱慕+屈服 / 阈值闸', async () => {
  const lewd = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 10;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:311', 1);
  });
  await speak_k0(lewd);
  assert.deepEqual(lewd.text_lines(), [
    '「啊～～…嗯～…呜呼…啊啊啊～！我还要更多、更多～！」',
    '琼扭着腰身因为愉悦而颤抖不已………',
  ]);
  assert.equal(lewd.store.get('cflag:31:311'), 5);

  const love = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 10;
    f.store.set('talent:31:85', 1);
    f.store.set('mark:31:2', 3);
    f.store.set('cflag:31:311', 1);
  });
  await speak_k0(love);
  assert.deepEqual(love.text_lines(), [
    '「咿～…呜～…啊…哈啊～…请再…继续吧…这东西…真厉害啊…嗯～」',
    '琼像为了忍耐阴核的震动似的蜷曲着身体………',
  ]);
  assert.equal(love.store.get('cflag:31:311'), 4);

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 10;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:311', 4);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.deepEqual(at_cap.text_lines(), [
    '「啊～～…嗯～…呜呼…啊啊啊～！我还要更多、更多～！」',
    '琼扭着腰身因为愉悦而颤抖不已………',
  ]);
  assert.equal(at_cap.store.get('cflag:31:311'), 5, '振动宝石二次阈值闸');
});

test('壶虫开始首次处女：淫乱三句，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 11;
    f.store.set('tequip:31:11', 1);
    f.store.set('talent:31:0', 1);
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「咕呜…啊啊～…渐渐地钻进…小穴里面去了………」',
    '「主人的小鸡鸡…明明一直在等待着…明明一直在等待着…结果就这样…」',
    '琼有点悲伤地忍耐着破瓜的疼痛………',
  ]);
  assert.equal(fixture.store.get('cflag:31:312'), 1, '壶虫首次推进到 1');
});

test('壶虫开始二次：淫乱 + V钝感附加句 / 阈值闸', async () => {
  const lewd = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 11;
    f.store.set('tequip:31:11', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:2', 3);
    f.store.set('talent:31:103', 1);
    f.store.set('cflag:31:312', 1);
  });
  await speak_k0(lewd);
  assert.deepEqual(lewd.text_lines(), [
    '「啊～…！不要…讨厌…明明是虫子而已…竟然会这么爽…要、要死了…咕呜呜～♡」',
    '琼钝感的私处已经被完全开发了、把壶虫贪婪的连根吞了进去………',
  ]);
  assert.equal(lewd.store.get('cflag:31:312'), 5);

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 11;
    f.store.set('tequip:31:11', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:312', 4);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.deepEqual(at_cap.text_lines(), [
    '「啊～…！不要…讨厌…明明是虫子而已…竟然会这么爽…要、要死了…咕呜呜～♡」',
  ]);
  assert.equal(at_cap.store.get('cflag:31:312'), 5, '壶虫开始二次阈值闸');
});

test('壶虫脱着：淫乱写 CFLAG:372 = 3，门槛是 < 不是 <=', async () => {
  const lewd = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 11;
    f.store.set('tequip:31:11', 0);
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(lewd);
  assert.deepEqual(lewd.text_lines(), ['「哈啊啊…下次…要把什么插进来呢…？」']);
  assert.equal(lewd.store.get('cflag:31:372'), 3, '壶虫着脱推进到 3');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 11;
    f.store.set('tequip:31:11', 0);
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:372', 3);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.deepEqual(at_cap.text_lines(), []);
  assert.equal(at_cap.store.get('cflag:31:372'), 3, '壶虫着脱阈值闸用 < 3');
});

test('振动杖首次：淫乱六句 / 爱慕两句 / それ以外自称，推进到 1', async () => {
  const lewd = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 12;
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(lewd);
  assert.deepEqual(lewd.text_lines(), [
    '「咿呀～…呀～…啊哈～！讨、讨厌！那里好痒啊～」',
    '每当振动杖按在琼的两腿之间就会带来极度刺激的快感。',
    '………',
    '……',
    '…30分后',
    '「哈啊啊呼…嗯……咕呜～…好…好了…嗯…求…求、求求你…不…不…不要…再…继…继续、下…去……去…了啊啊啊啊！」',
  ]);
  assert.equal(lewd.store.get('cflag:31:313'), 1, '振动杖首次推进到 1');

  const love = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 12;
    f.store.set('talent:31:85', 1);
  });
  await speak_k0(love);
  assert.deepEqual(love.text_lines(), [
    '「魔、魔族的道具里还有这样的奇怪玩意儿吗…啊呜～！？」',
    '「诶、诶、什、什么啊这是…好厉害的震动…呀呜～！？咿～！」',
  ]);
  assert.equal(love.store.get('cflag:31:313'), 1);

  const other = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 12;
  });
  await speak_k0(other);
  assert.deepEqual(other.text_lines(), [
    '「无、无论你对我做什么…呀～！…只、只不过是有点痒罢了…咿呀呜～！？」',
  ]);
  assert.equal(other.store.get('cflag:31:313'), 1);
});

test('振动杖二次：淫乱 / 爱慕 / 阈值闸', async () => {
  const lewd = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 12;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:313', 1);
  });
  await speak_k0(lewd);
  assert.deepEqual(lewd.text_lines(), [
    '「好的～…可以哦…请用这个色情的杖来欺负我吧…♡」',
    '「咕呜嗯～…啊～啊哈～…啊啊～！麻麻的好厉害啊～！」',
  ]);
  assert.equal(lewd.store.get('cflag:31:313'), 5);

  const love = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 12;
    f.store.set('talent:31:85', 1);
    f.store.set('cflag:31:313', 1);
  });
  await speak_k0(love);
  assert.deepEqual(love.text_lines(), [
    '「嗯咕～…啊～啊哈～…请…请继续…主人～…♪」',
    '「啊啊啊～啊…啊～好…好舒服…好…舒…服…啊…啊呜呜…呜…♡」',
  ]);
  assert.equal(love.store.get('cflag:31:313'), 4);

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 12;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:313', 4);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.deepEqual(at_cap.text_lines(), [
    '「好的～…可以哦…请用这个色情的杖来欺负我吧…♡」',
    '「咕呜嗯～…啊～啊哈～…啊啊～！麻麻的好厉害啊～！」',
  ]);
  assert.equal(at_cap.store.get('cflag:31:313'), 5, '振动杖二次阈值闸');

  const yield3 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 12;
    f.store.set('mark:31:2', 3);
    f.store.set('cflag:31:313', 1);
  });
  await speak_k0(yield3);
  assert.deepEqual(yield3.text_lines(), [
    '「啊～啊啊～…明明被用这种东西玩弄…但是好舒服…啊啊～！啊～～！」',
  ]);
  assert.equal(yield3.store.get('cflag:31:313'), 3);
});

test('肛门虫开始首次：淫乱 + A钝感附加句，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 13;
    f.store.set('tequip:31:13', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('talent:31:105', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊～…连尻穴里都被虫子钻进去了…好棒…额呵呵…」',
    '曾被称作圣女的琼脑袋里已经被淫欲所污染了………',
    '于是琼钝感的肛门被快乐所开发、由于肛门虫的刺激而发出了很带感的呻吟声………',
  ]);
  assert.equal(fixture.store.get('cflag:31:314'), 1, '肛门虫首次推进到 1');
});

test('肛门虫开始二次：淫乱+A感觉拍摄 / 无A感觉写 6 / 阈值闸', async () => {
  const film = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 13;
    f.store.set('tequip:31:13', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('talent:31:105', 1);
    f.store.set('tequip:31:53', 1);
    f.store.set('cflag:31:314', 1);
  });
  await speak_k0(film);
  assert.deepEqual(film.text_lines(), [
    '「请看吧♡　这么粗的蠕虫要插进我屁股眼里去了哦～♡」',
    '琼妖艳的那期蠕虫、舔了舔嘴唇。',
    '琼钝感的肛门被调教出了快感、由于肛门虫的刺激而发出了很带感的呻吟声………',
  ]);
  assert.equal(film.store.get('cflag:31:314'), 6);

  const no_a = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 13;
    f.store.set('tequip:31:13', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:314', 1);
  });
  await speak_k0(no_a);
  assert.deepEqual(no_a.text_lines(), [
    '「虫子…在…里面……～！动着…要变的…变的…奇怪了啊啊～～♡」',
  ]);
  assert.equal(
    no_a.store.get('cflag:31:314'),
    6,
    '肛门虫二次淫乱无A感觉也写 6',
  );

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 13;
    f.store.set('tequip:31:13', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('cflag:31:314', 6);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.deepEqual(at_cap.text_lines(), [
    '「啊咿～…啊～啊～啊啊啊啊！屁股眼～！屁股眼好舒服～！再往里钻吧～～！」',
  ]);
  assert.equal(
    at_cap.store.get('cflag:31:314'),
    6,
    '肛门虫二次阈值闸 <=6 写回 6',
  );
});

test('肛门虫脱着：淫乱写 CFLAG:374 = 4，门槛是 < 不是 <=', async () => {
  const lewd = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 13;
    f.store.set('tequip:31:13', 0);
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(lewd);
  assert.deepEqual(lewd.text_lines(), [
    '「啊啊～…要是能一整天都能被抽插着就好了…♡」',
  ]);
  assert.equal(lewd.store.get('cflag:31:374'), 4, '肛门虫着脱推进到 4');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 13;
    f.store.set('tequip:31:13', 0);
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:374', 4);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.deepEqual(at_cap.text_lines(), []);
  assert.equal(at_cap.store.get('cflag:31:374'), 4, '肛门虫着脱阈值闸用 < 4');
});

test('阴蒂夹开始首次：淫乱 / 爱慕 / それ以外自称，推进到 1', async () => {
  const lewd = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 14;
    f.store.set('tequip:31:14', 1);
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(lewd);
  assert.deepEqual(lewd.text_lines(), [
    '「啊～～…厉、厉害…请再夹紧一点…咿～！震起来了！？震起来了～～～～～～～！」',
  ]);
  assert.equal(lewd.store.get('cflag:31:315'), 1, '阴蒂夹首次推进到 1');

  const love = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 14;
    f.store.set('tequip:31:14', 1);
    f.store.set('talent:31:85', 1);
  });
  await speak_k0(love);
  assert.deepEqual(love.text_lines(), [
    '「没、没事的…请再夹紧一点…咿～！震起来了～～！」',
  ]);
  assert.equal(love.store.get('cflag:31:315'), 1);

  const other = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 14;
    f.store.set('tequip:31:14', 1);
  });
  await speak_k0(other);
  assert.deepEqual(other.text_lines(), [
    '「不、不管用这种东西怎么折腾我都是没用的…咿啊啊啊～！震起来了不要啊啊啊！」',
  ]);
  assert.equal(other.store.get('cflag:31:315'), 1);
});

test('阴蒂夹开始二次：淫乱 / 阈值闸', async () => {
  const lewd = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 14;
    f.store.set('tequip:31:14', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:315', 1);
  });
  await speak_k0(lewd);
  assert.deepEqual(lewd.text_lines(), [
    '「啊～啊啊～啊啊啊～！请再强烈些、再强烈些！把阴蒂玩到坏掉为止吧～♡」',
  ]);
  assert.equal(lewd.store.get('cflag:31:315'), 4);

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 14;
    f.store.set('tequip:31:14', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:315', 3);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.deepEqual(at_cap.text_lines(), [
    '「啊～啊啊～啊啊啊～！请再强烈些、再强烈些！把阴蒂玩到坏掉为止吧～♡」',
  ]);
  assert.equal(at_cap.store.get('cflag:31:315'), 4, '阴蒂夹二次阈值闸');
});

test('阴蒂夹脱着：淫乱写 CFLAG:375 = 3，门槛是 < 不是 <=', async () => {
  const lewd = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 14;
    f.store.set('tequip:31:14', 0);
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(lewd);
  assert.deepEqual(lewd.text_lines(), ['「哈啊～哈啊～…还在麻麻的呢…♡」']);
  assert.equal(lewd.store.get('cflag:31:375'), 3, '阴蒂夹着脱推进到 3');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 14;
    f.store.set('tequip:31:14', 0);
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:375', 3);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.deepEqual(at_cap.text_lines(), []);
  assert.equal(at_cap.store.get('cflag:31:375'), 3, '阴蒂夹着脱阈值闸用 < 3');
});

test('乳头夹开始首次：淫乱 + B钝感附加句，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 15;
    f.store.set('tequip:31:15', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:1', 3);
    f.store.set('talent:31:107', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「额呵呵…还有这样的色情道具呢…好吧…请用乳房～♡」',
    '琼神情陶醉的看着器具夹到了乳头上………',
    '琼钝感的乳头已被完全开发、器具毫不间断的持续为乳头带来快乐………',
  ]);
  assert.equal(fixture.store.get('cflag:31:316'), 1, '乳头夹首次推进到 1');
});

test('乳头夹开始二次：淫乱 + B钝感附加句 / 阈值闸', async () => {
  const lewd = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 15;
    f.store.set('tequip:31:15', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:1', 3);
    f.store.set('talent:31:107', 1);
    f.store.set('cflag:31:316', 1);
  });
  await speak_k0(lewd);
  assert.deepEqual(lewd.text_lines(), [
    '「啊啊～…好爽…感觉全身心都变得淫荡起来了～♡」',
    '从琼不像话的表情上完全看不出圣女时期的清纯了………',
    '琼钝感的乳头已被完全开发、器具毫不间断的持续为乳头带来快乐………',
  ]);
  assert.equal(lewd.store.get('cflag:31:316'), 4);

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 15;
    f.store.set('tequip:31:15', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:316', 3);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.deepEqual(at_cap.text_lines(), [
    '「啊啊～…好爽…感觉全身心都变得淫荡起来了～♡」',
    '从琼不像话的表情上完全看不出圣女时期的清纯了………',
  ]);
  assert.equal(at_cap.store.get('cflag:31:316'), 4, '乳头夹二次阈值闸');
});

test('乳头夹脱着：淫乱写 CFLAG:376 = 3，门槛是 < 不是 <=', async () => {
  const lewd = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 15;
    f.store.set('tequip:31:15', 0);
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(lewd);
  assert.deepEqual(lewd.text_lines(), ['「啊～～…明明还想再用一会儿的…♡」']);
  assert.equal(lewd.store.get('cflag:31:376'), 3, '乳头夹着脱推进到 3');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 15;
    f.store.set('tequip:31:15', 0);
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:376', 3);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.deepEqual(at_cap.text_lines(), []);
  assert.equal(at_cap.store.get('cflag:31:376'), 3, '乳头夹着脱阈值闸用 < 3');
});

test('榨乳器开始首次：淫乱 + B钝感附加句，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 16;
    f.store.set('tequip:31:16', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:1', 3);
    f.store.set('talent:31:107', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊～…奶水…就这样出来了～…好美妙～♡」',
    '榨乳器每次振动琼的乳头就会喷出新鲜的奶汁………',
    '琼钝感的乳头被完全开发了、榨乳带来的快乐持续的令琼心动神驰………',
  ]);
  assert.equal(fixture.store.get('cflag:31:317'), 1, '榨乳器首次推进到 1');
});

test('榨乳器开始二次：淫乱 + B钝感附加句 / 阈值闸', async () => {
  const lewd = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 16;
    f.store.set('tequip:31:16', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:1', 3);
    f.store.set('talent:31:107', 1);
    f.store.set('cflag:31:317', 1);
  });
  await speak_k0(lewd);
  assert.deepEqual(lewd.text_lines(), [
    '「啊咿咿咿～♪…乳、乳头好像要融化了…奶汁一直在喷出来～♡」',
    '榨乳器每次振动琼的乳头就会喷出新鲜的奶汁………',
    '琼钝感的乳头被完全开发了、榨乳带来的快乐持续的令琼心动神驰………',
  ]);
  assert.equal(lewd.store.get('cflag:31:317'), 4);

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 16;
    f.store.set('tequip:31:16', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:317', 3);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.deepEqual(at_cap.text_lines(), [
    '「啊咿咿咿～♪…乳、乳头好像要融化了…奶汁一直在喷出来～♡」',
    '榨乳器每次振动琼的乳头就会喷出新鲜的奶汁………',
  ]);
  assert.equal(at_cap.store.get('cflag:31:317'), 4, '榨乳器二次阈值闸');
});

test('榨乳器脱着：淫乱写 CFLAG:377 = 3，门槛是 < 不是 <=', async () => {
  const lewd = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 16;
    f.store.set('tequip:31:16', 0);
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(lewd);
  assert.deepEqual(lewd.text_lines(), [
    '「欸～～…明明还想再榨一些奶汁出来呢…♪」',
    '奶汁从琼的乳头上滴答滴答地垂落下来………',
  ]);
  assert.equal(lewd.store.get('cflag:31:377'), 3, '榨乳器着脱推进到 3');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 16;
    f.store.set('tequip:31:16', 0);
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:377', 3);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.deepEqual(at_cap.text_lines(), []);
  assert.equal(at_cap.store.get('cflag:31:377'), 3, '榨乳器着脱阈值闸用 < 3');
});

test('肛珠开始首次：淫乱 + A钝感附加句，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 19;
    f.store.set('tequip:31:19', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('talent:31:105', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊哈啊啊～…屁股眼里…咕呜～…被塞得满满的了…♡」',
    '琼钝感的肛门被开发而觉醒了快感、由于肛珠的压迫感琼很有感觉地唤出声来………',
  ]);
  assert.equal(fixture.store.get('cflag:31:320'), 1, '肛珠首次推进到 1');
});

test('肛珠开始二次：淫乱+A感觉写 7 / 阈值闸', async () => {
  const lewd = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 19;
    f.store.set('tequip:31:19', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('cflag:31:320', 1);
  });
  await speak_k0(lewd);
  assert.deepEqual(lewd.text_lines(), [
    '「啊～～…啊哈～…！屁股眼好爽～…请再欺负我吧～♡」',
    '琼由于肛门的快乐整个脑子都爽的要融化了似的………',
  ]);
  assert.equal(lewd.store.get('cflag:31:320'), 7, '肛珠二次淫乱+A感觉写 7');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 19;
    f.store.set('tequip:31:19', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('cflag:31:320', 6);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.deepEqual(at_cap.text_lines(), [
    '「啊～～…啊哈～…！屁股眼好爽～…请再欺负我吧～♡」',
    '琼由于肛门的快乐整个脑子都爽的要融化了似的………',
  ]);
  assert.equal(
    at_cap.store.get('cflag:31:320'),
    7,
    '肛珠二次阈值闸 <=6 写回 7',
  );
});

test('肛珠脱着：淫乱写 CFLAG:379 = 4，门槛是 < 不是 <=', async () => {
  const lewd = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 19;
    f.store.set('tequip:31:19', 0);
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(lewd);
  assert.deepEqual(lewd.text_lines(), [
    '「噫呀呜呜呜呜～～～…可以再用力一点拔出来呢♡」',
  ]);
  assert.equal(lewd.store.get('cflag:31:379'), 4, '肛珠着脱推进到 4');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 19;
    f.store.set('tequip:31:19', 0);
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:379', 4);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.deepEqual(at_cap.text_lines(), []);
  assert.equal(at_cap.store.get('cflag:31:379'), 4, '肛珠着脱阈值闸用 < 4');
});

test('正常位首次处女淫乱 + 故乡恋人附加句，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 20;
    f.store.set('talent:31:0', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:317', 4);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…主人～…真的好开心…能为淫乱的琼亲自破开处女膜～♡」',
    '琼自己把两腿张开让你的大鸡鸡插了进来。',
    '「啊…呜…啊啊啊～～！进来啦～！主人的肉棒进来啦～！」',
    '「虽然有点痛…不过完全可以忍受…因为主人火热的大鸡鸡～…插进里面实在是太舒服了啊～♡」',
    '琼用两腿紧紧的挟住你的腰发出了快活的呻吟。',
    '琼与故乡的恋人相比选择了大鸡鸡的样子。',
    '「好爽～好爽～好爽！ 被大鸡鸡弄得好爽啊～！已经…离不开它了～♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:321'), 1, '正常位首次推进到 1');
});

test('正常位首次非处女：淫乱 + V钝感附加句', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 20;
    f.store.set('talent:31:0', 0);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:2', 3);
    f.store.set('talent:31:103', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「主人～♡…紧紧地抱住我吧…让我们一起变的非常非常的快活吧♡」',
    '琼钝感的私处被调教出了快感、很愉快的吞下了你的大鸡鸡………',
  ]);
  assert.equal(fixture.store.get('cflag:31:321'), 1);
});

test('正常位二次淫乱+性爱狂：RAND 三支 / 写 9', async () => {
  const r0 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 20;
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:75', 1);
    f.store.set('cflag:31:321', 1);
  });
  await speak_k0(r0, seq_rand(0));
  assert.deepEqual(r0.text_lines(), [
    '「肉棒好棒～♡…好棒哦～♡…好想被插一整天啊～♡」',
    '琼下流淫猥的声音在耳边回响着、如果是认识她的人听到的话一定会怀疑自己的耳朵是不是出问题了。',
    '「啊啊～…好棒～好棒～♡…再来～…疯狂地～…把精液滚滚地射进来吧～♡」',
    '琼用手脚缠住你反复的接吻并被持续被侵犯着………',
  ]);
  assert.equal(r0.store.get('cflag:31:321'), 9, '正常位二次淫乱+性爱狂写 9');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 20;
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:75', 1);
    f.store.set('cflag:31:321', 8);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap, seq_rand(0));
  assert.ok(
    at_cap.text_lines().length > 0,
    'cflag=8 且 FLAG:7==1 仍出声（门槛是 <=8）',
  );
  assert.equal(at_cap.store.get('cflag:31:321'), 9);
});

test('正常位二次爱慕 + V钝感：小写 printformw 也出声 / 阈值闸', async () => {
  const dull = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 20;
    f.store.set('talent:31:85', 1);
    f.store.set('talent:31:103', 1);
    f.store.set('cflag:31:321', 1);
  });
  await speak_k0(dull, seq_rand(0));
  assert.deepEqual(dull.text_lines(), [
    '「啊啊…请更多的疼爱我…啊～…嗯～…这样…真舒服～♡」',
    '「啊啊…呜、好深…好深啊………♡」',
    '琼的私处还不太容易有感觉、而由于被插入的异物感而皱起了眉头。',
    '但是比起这个琼更为被你所抱住的这一事实而心动不已………',
  ]);
  assert.equal(dull.store.get('cflag:31:321'), 5);

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 20;
    f.store.set('talent:31:85', 1);
    f.store.set('cflag:31:321', 4);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap, seq_rand(0));
  assert.ok(
    at_cap.text_lines().length > 0,
    'cflag=4 且 FLAG:7==1 仍出声（门槛是 <=4）',
  );
  assert.equal(at_cap.store.get('cflag:31:321'), 5);

  const exhausted = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 20;
    f.store.set('talent:31:85', 1);
    f.store.set('cflag:31:321', 5);
    f.store.set('flag:7', 1);
  });
  await speak_k0(exhausted, seq_rand(0));
  assert.deepEqual(exhausted.text_lines(), []);
  assert.equal(exhausted.store.get('cflag:31:321'), 5, '爱慕门槛耗尽后不出声');
});

test('正常位二次屈服Lv3+V感觉：自称首字插值，推进到 4', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 20;
    f.store.set('mark:31:2', 3);
    f.store.set('abl:31:2', 3);
    f.store.set('cflag:31:321', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「咕呜～…呜呜～！啊～啊啊啊啊！再、再这样下去的话…我、我…就要…」',
    '「真的…不行了…要不行了啊…明明是被侵犯…竟然会这么的…啊啊～！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:321'), 4);
});

test('背后位首次处女淫乱 + 故乡恋人附加句，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 21;
    f.store.set('talent:31:0', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:317', 4);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '琼用跪坐的姿势并把头贴在地上、将屁股高高抬起。',
    '「能被您夺走我的第一次……我从心底表示感谢～♡」',
    '你抓住她的腰毫不犹豫的把肉棒插进了阴道深处。',
    '途中感到穿破了处女膜。肉棒一进入深处就被温热的阴道壁紧紧包住。',
    '「呀啊呜唔～…淫乱的处女膜被弄破了～…啊啊～…好开心～好开心啊～！」',
    '琼比起故乡的恋人而选择了能为自己带来无限快乐的鸡鸡的样子。',
    '「嗯～♪…我的恋人是…世界上所有的大鸡鸡～…不过最喜欢的是现在插进来的大鸡鸡哦…♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:322'), 1, '背后位首次推进到 1');
});

test('背后位二次淫乱+性爱狂：门槛读 CFLAG:321 不是 322', async () => {
  const r0 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 21;
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:75', 1);
    f.store.set('cflag:31:322', 1);
    f.store.set('cflag:31:321', 8);
  });
  await speak_k0(r0, seq_rand(0));
  assert.deepEqual(r0.text_lines(), [
    '「嗯哈啊～啊～啊啊～咿啊啊啊～！♡ 再用力插我～♡」',
    '「还想再要大肉棒～♡ 想要更多…更多的大肉棒啊～♡」',
  ]);
  assert.equal(r0.store.get('cflag:31:322'), 9, '背后位二次淫乱+性爱狂写 9');
  assert.equal(r0.store.get('cflag:31:321'), 8, '门槛读 321，不改写正常位');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 21;
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:75', 1);
    f.store.set('cflag:31:322', 1);
    f.store.set('cflag:31:321', 8);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap, seq_rand(0));
  assert.ok(
    at_cap.text_lines().length > 0,
    'CFLAG:321=8 且 FLAG:7==1 仍出声（门槛是 321 <=8）',
  );

  const exhausted = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 21;
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:75', 1);
    f.store.set('cflag:31:322', 1);
    f.store.set('cflag:31:321', 9);
    f.store.set('flag:7', 1);
  });
  await speak_k0(exhausted, seq_rand(0));
  // 321 耗尽只跳过性爱狂档，落到淫乱档（门槛改回 322 则会仍走性爱狂）
  assert.deepEqual(exhausted.text_lines(), [
    '「呀呜～！哈啊…啊啊～…咿呀～～！好爽啊～…随心所欲的叫床！要变成动物了～！」',
    '「咿呀～啊啊～…啊啊～…好喜欢！像动物一样的做爱好喜欢啊！」',
  ]);
  assert.equal(exhausted.store.get('cflag:31:322'), 6, '落到淫乱档写 6');
});

test('背后位二次爱慕 + V钝感附加句 / 阈值闸', async () => {
  const dull = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 21;
    f.store.set('talent:31:85', 1);
    f.store.set('talent:31:103', 1);
    f.store.set('cflag:31:322', 1);
  });
  await speak_k0(dull, seq_rand(0));
  assert.deepEqual(dull.text_lines(), [
    '「啊啊～…啊～…好舒服～！请继续…侵犯我吧…！」',
    '「被你这样做是最…最舒服的事情了…咿呀～～…啊啊～…好开心…♪」',
    '因为琼的私处不太容易有感觉、由于被从后面插入的异物感而皱起了眉头。',
    '但是比起这个琼更为被你所抱住的这一事实而心动不已………',
  ]);
  assert.equal(dull.store.get('cflag:31:322'), 5);

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 21;
    f.store.set('talent:31:85', 1);
    f.store.set('cflag:31:322', 4);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap, seq_rand(0));
  assert.ok(
    at_cap.text_lines().length > 0,
    'cflag=4 且 FLAG:7==1 仍出声（门槛是 <=4）',
  );
  assert.equal(at_cap.store.get('cflag:31:322'), 5);

  const exhausted = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 21;
    f.store.set('talent:31:85', 1);
    f.store.set('cflag:31:322', 5);
    f.store.set('flag:7', 1);
  });
  await speak_k0(exhausted, seq_rand(0));
  assert.deepEqual(exhausted.text_lines(), []);
});

test('K0 @EVENTTRAIN #PRI 置 FLAG:100、@EVENTEND #LATER 清 FLAG:100', async () => {
  const fixture = await setup_k0((f) => {
    f.store.delete('flag:100');
    f.store.delete('flag:7');
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.store.get('flag:100'), 1, 'K0 EVENTTRAIN 置 FLAG:100');
  assert.equal(fixture.store.get('flag:7'), 2, 'K0 EVENTTRAIN 总开关补 0→2');
  await emit('EVENTEND');
  assert.equal(fixture.store.get('flag:100'), 0, 'K0 EVENTEND 清 FLAG:100');
});

async function emit_k0(fixture, event, rand) {
  const { emit } = fixture.load_module('system/event/registry');
  return emit(event, rand);
}

test('K0 EVENTTRAIN NORMAL：FLAG:7 <= 0 静默', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('flag:7', -1); // PRI 只补 0→2，负数总开关继续关
    f.store.set('talent:31:314', 1);
  });
  await emit_k0(fixture, 'EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), []);
  assert.equal(fixture.store.get('cflag:31:201'), undefined);
});

test('K0 EVENTTRAIN NORMAL：非慈爱素质静默', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('talent:31:160', 0);
    f.store.set('talent:31:314', 1);
  });
  await emit_k0(fixture, 'EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), []);
  assert.equal(fixture.store.get('cflag:31:201'), undefined);
});

test('K0 EVENTTRAIN NORMAL：首次精灵写 CFLAG:201 = 1', async () => {
  const fixture = await setup_k0((f) => f.store.set('talent:31:314', 1));
  await emit_k0(fixture, 'EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), [
    '「请、请不要再做出那样的野蛮暴行了！」',
    '琼直到现在还摆出高高在上的嘴脸说教着。',
    '只是想想如何去玷污这个女精灵你就猛地硬了起来………',
  ]);
  assert.equal(fixture.store.get('cflag:31:201'), 1, '首次精灵推进到 1');
});

test('K0 EVENTTRAIN NORMAL：首次魔族写 CFLAG:201 = 1 且 CFLAG:370 = 1', async () => {
  const fixture = await setup_k0((f) => f.store.set('talent:31:314', 9));
  await emit_k0(fixture, 'EVENTTRAIN');
  assert.ok(
    fixture.text_lines().some((line) => line.includes('即便被变成了魔族')),
  );
  assert.equal(fixture.store.get('cflag:31:201'), 1, '首次魔族推进到 1');
  assert.equal(
    fixture.store.get('cflag:31:370'),
    1,
    '首次魔族同时写 CFLAG:370 = 1',
  );
});

test('K0 EVENTTRAIN NORMAL：魔族化二次写 CFLAG:370 = 2', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('talent:31:314', 9);
    f.store.set('cflag:31:201', 1);
  });
  await emit_k0(fixture, 'EVENTTRAIN');
  assert.ok(
    fixture
      .text_lines()
      .some((line) => line.includes('被多次改造已经完全变成了魔族')),
  );
  assert.equal(fixture.store.get('cflag:31:370'), 2, '魔族化二次写 2');
  assert.equal(
    fixture.store.get('cflag:31:201'),
    1,
    '魔族化二次不改 CFLAG:201',
  );
});

test('K0 EVENTTRAIN NORMAL：NTR 再捕获爱慕清 CFLAG:650', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('cflag:31:201', 1);
    f.store.set('cflag:31:650', 1);
    f.store.set('talent:31:85', 1);
  });
  await emit_k0(fixture, 'EVENTTRAIN');
  assert.ok(
    fixture.text_lines().some((line) => line.includes('已经看过那些水晶球')),
  );
  assert.equal(fixture.store.get('cflag:31:650'), 0, 'NTR 再捕获爱慕清 650');
});

test('K0 EVENTTRAIN NORMAL：NTR 再捕获未陷落清 CFLAG:650', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('cflag:31:201', 1);
    f.store.set('cflag:31:650', 1);
  });
  await emit_k0(fixture, 'EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), [
    '「又被你抓住了」',
    '「既被狂王玷污、又被你玷污………看来我的命运也就到此为止了…………」',
    '看起来琼已经接受了自己的命运………',
  ]);
  assert.equal(fixture.store.get('cflag:31:650'), 0, 'NTR 再捕获未陷落清 650');
});

test('K0 EVENTTRAIN NORMAL：屈服刻印 Lv1 写 CFLAG:201 = 2', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('cflag:31:201', 1);
    f.store.set('mark:31:2', 1);
  });
  await emit_k0(fixture, 'EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), [
    '「能不能不要…再让我做这些事了…你觉得怎样呢………」',
    '（不行…明明知道这样很奇怪…）',
  ]);
  assert.equal(fixture.store.get('cflag:31:201'), 2, '屈服 Lv1 写 2');
});

test('K0 EVENTTRAIN NORMAL：淫乱写 CFLAG:201 = 5', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('cflag:31:201', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:314', 1);
  });
  await emit_k0(fixture, 'EVENTTRAIN');
  assert.ok(fixture.text_lines().some((line) => line.includes('色情宠物')));
  assert.equal(fixture.store.get('cflag:31:201'), 5, '淫乱写 5');
});

test('K0 EVENTTRAIN NORMAL：淫乱+调教前魔族写 CFLAG:201 = 6', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('cflag:31:201', 1);
    f.store.set('cflag:31:370', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:314', 9);
  });
  await emit_k0(fixture, 'EVENTTRAIN');
  assert.ok(fixture.text_lines().some((line) => line.includes('啊…魔王大人')));
  assert.equal(fixture.store.get('cflag:31:201'), 6, '淫乱+调教前魔族写 6');
});

test('K0 EVENTTRAIN NORMAL：爱慕写 CFLAG:201 = 7', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('cflag:31:201', 1);
    f.store.set('talent:31:85', 1);
    f.store.set('talent:31:314', 1);
  });
  await emit_k0(fixture, 'EVENTTRAIN');
  assert.ok(fixture.text_lines().some((line) => line.includes('是你的所有物')));
  assert.equal(fixture.store.get('cflag:31:201'), 7, '爱慕写 7');
});

test('K0 EVENTTRAIN NORMAL：崩坏写 CFLAG:201 = 9', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('cflag:31:201', 1);
    f.store.set('talent:31:9', 1);
  });
  await emit_k0(fixture, 'EVENTTRAIN');
  assert.ok(
    fixture
      .text_lines()
      .some((line) => line.includes('面向屋子的角落向神祈祷')),
  );
  assert.equal(fixture.store.get('cflag:31:201'), 9, '崩坏写 9');
});

test('K0 EVENTTRAIN NORMAL：无助手落入二次口上（崩坏祈祷）', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('cflag:31:201', 9);
    f.store.set('talent:31:9', 1);
  });
  await emit_k0(fixture, 'EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), [
    '「嘻嘻～…嘻～…请不要打扰我的祈祷…嘻～…嘻～」',
    '已经无法期待精神崩坏的琼做出什么正常的反应了吧……',
  ]);
});

test('K0 EVENTTRAIN NORMAL：村娘助手首次写 CFLAG:202 = 1', async () => {
  const fixture = await setup_k0((f) => {
    join_slave_chara(f, 17, '玛奥');
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.assi = 17;
    f.store.set('cflag:31:201', 9);
    f.store.set('talent:17:165', 1);
  });
  await emit_k0(fixture, 'EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), [
    '一看到你所带来的玛奥，琼的脸就僵住了。',
    '「啊啊…那个孩子是邻村的…你…对这样的小孩子都下手………！」',
    '玛奥一边看着害怕着的琼一边笑了笑。',
    '『勇者大人啊…和我一起玩一会儿吧…？』',
  ]);
  assert.equal(fixture.store.get('cflag:31:202'), 1, '村娘助手首次写 202 = 1');
  const colors = fixture.calls.filter((c) => c.api === 'setColor');
  assert.deepEqual(
    colors.map((c) => c.args[0]),
    ['#ffccff', ''],
    '村娘助手それ以外无条件着色',
  );
});

test('K0 EVENTTRAIN NORMAL：村娘助手二次 FLAG:7==1 静默', async () => {
  const fixture = await setup_k0((f) => {
    join_slave_chara(f, 17, '玛奥');
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.assi = 17;
    f.store.set('cflag:31:201', 9);
    f.store.set('cflag:31:202', 1);
    f.store.set('talent:17:165', 1);
    f.store.set('flag:7', 1);
  });
  await emit_k0(fixture, 'EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), []);
  assert.equal(fixture.store.get('cflag:31:202'), 1);
});

test('K0 EVENTTRAIN NORMAL：非村娘助手落入二次口上', async () => {
  const fixture = await setup_k0((f) => {
    join_slave_chara(f, 32, '助手桑');
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.assi = 32;
    f.store.set('cflag:31:201', 9);
    f.store.set('talent:31:9', 1);
  });
  await emit_k0(fixture, 'EVENTTRAIN');
  assert.ok(
    fixture.text_lines().some((line) => line.includes('请不要打扰我的祈祷')),
  );
});

test('K0 二次口上：屈服 Lv0 故乡恋人', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('cflag:31:201', 9);
    f.store.set('mark:31:2', 0);
    f.store.set('talent:31:317', 4);
  });
  await emit_k0(fixture, 'EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), [
    '「没用的…我不会认输的…」',
    '（啊啊…无论发生什么…我都会与你同在……）',
    '琼像是在向故乡的恋人祈祷的样子………',
  ]);
});

test('K0 二次口上：淫乱 RAND:3==0 精液中毒', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('cflag:31:201', 9);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:32', 3);
  });
  await emit_k0(fixture, 'EVENTTRAIN', seq_rand(0));
  assert.deepEqual(fixture.text_lines(), [
    '「啊～…主人…请让我好好侍奉您那出色的大肉棒吧…♡」',
    '「所以呢…请赐我精液～…我想要精液～…满满地淋过来吧…♡」',
  ]);
});

test('K0 二次口上：FLAG:7==1 静默', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('cflag:31:201', 9);
    f.store.set('talent:31:76', 1);
    f.store.set('flag:7', 1);
  });
  await emit_k0(fixture, 'EVENTTRAIN', seq_rand(0));
  assert.deepEqual(fixture.text_lines(), []);
});

test('K0 EVENTEND NORMAL：角色死亡 BASE:0 <= 0 静默', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('base:31:0', 0);
    f.store.set('talent:31:85', 1);
  });
  await emit_k0(fixture, 'EVENTEND');
  assert.deepEqual(fixture.text_lines(), []);
});

test('K0 EVENTEND NORMAL：非慈爱素质静默', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('talent:31:160', 0);
    f.store.set('base:31:0', 1800);
    f.store.set('talent:31:85', 1);
  });
  await emit_k0(fixture, 'EVENTEND');
  assert.deepEqual(fixture.text_lines(), []);
});

test('K0 EVENTEND NORMAL：崩坏 FLAG:7==2 出声', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('base:31:0', 1800);
    f.store.set('talent:31:9', 1);
  });
  await emit_k0(fixture, 'EVENTEND');
  assert.ok(
    fixture.text_lines().some((line) => line.includes('没法再祈祷下去了')),
  );
});

test('K0 EVENTEND NORMAL：崩坏 FLAG:7==1 不走崩坏支、落入屈服 Lv1 以下', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('base:31:0', 1800);
    f.store.set('talent:31:9', 1);
    f.store.set('flag:7', 1);
  });
  await emit_k0(fixture, 'EVENTEND');
  assert.deepEqual(fixture.text_lines(), ['「你真是、无可药救了…」']);
});

test('K0 EVENTEND NORMAL：淫乱体力 500 走 >= 不是 <', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('base:31:0', 500);
    f.store.set('talent:31:76', 1);
  });
  await emit_k0(fixture, 'EVENTEND');
  assert.deepEqual(fixture.text_lines(), [
    '「再…再继续做嘛…请把小穴操到要发疯吧～…♡」',
  ]);
});

test('K0 EVENTEND NORMAL：爱慕体力不足两句', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('base:31:0', 499);
    f.store.set('talent:31:85', 1);
  });
  await emit_k0(fixture, 'EVENTEND');
  assert.deepEqual(fixture.text_lines(), [
    '「爱…好沉重呢」',
    '琼红着脸神情陶醉的躺在床上………',
  ]);
});

test('对面座位首次处女：空 PRINTFORMW 仍等待，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 22;
    f.store.set('talent:31:0', 1);
    f.store.set('talent:31:85', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), ['']);
  assert.equal(fixture.store.get('cflag:31:323'), 1, '对面座位首次推进到 1');
});

test('对面座位首次非处女：淫乱 + V钝感附加句', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 22;
    f.store.set('talent:31:0', 0);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:2', 3);
    f.store.set('talent:31:103', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯啾…啾～…嗯啾唔唔…啊啊啊～♡」',
    '「一边和主人接吻…一边被操着小穴真是太棒了～♡」',
    '琼钝感的私处被调教出了快感、很愉快的吞下了你插进来的大鸡鸡………',
  ]);
  assert.equal(fixture.store.get('cflag:31:323'), 1);
});

test('对面座位二次淫乱：黑心插值 / 门槛读 CFLAG:321', async () => {
  const r1 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 22;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:323', 1);
    f.store.set('cflag:31:321', 1);
  });
  await speak_k0(r1, seq_rand(1, 0));
  assert.deepEqual(r1.text_lines(), [
    '「呀呜唔～…啊～啊啊～…请再用力插我～♡」',
    '「呀～啊啊啊～…咕～…好紧～♥♥♥」',
    '「再…再贴紧一点～…好想被干到心醉神驰啊～…♡」',
    '琼的私处像想要紧紧缠住你的鸡鸡似的蠢动着………',
  ]);
  assert.equal(r1.store.get('cflag:31:323'), 6);

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 22;
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:75', 1);
    f.store.set('cflag:31:323', 9);
    f.store.set('cflag:31:321', 8);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap, seq_rand(0));
  assert.ok(
    at_cap.text_lines().length > 0,
    'CFLAG:321=8 且 CFLAG:323=9 且 FLAG:7==1 仍出声（门槛是 321 <=8）',
  );
  assert.equal(
    at_cap.store.get('cflag:31:323'),
    9,
    '对面座位二次淫乱+性爱狂写 9',
  );
});

test('背面座位首次处女：空 PRINTFORMW 仍等待，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 23;
    f.store.set('talent:31:0', 1);
    f.store.set('talent:31:85', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), ['']);
  assert.equal(fixture.store.get('cflag:31:324'), 1, '背面座位首次推进到 1');
});

test('背面座位首次非处女：淫乱 + 黑心插值', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 23;
    f.store.set('talent:31:0', 0);
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「呀啊～…啊～…啊啊～…主人…请更多的…更多的欺负我吧…♥♥♥」',
  ]);
  assert.equal(fixture.store.get('cflag:31:324'), 1);
});

test('背面座位二次淫乱：黑心插值 / 门槛读 CFLAG:321', async () => {
  const r0 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 23;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:324', 1);
    f.store.set('cflag:31:321', 1);
  });
  await speak_k0(r0, seq_rand(0));
  assert.ok(
    r0.text_lines().some((t) => t.includes('♥')),
    '淫乱二次 RAND:3==0 支含黑心',
  );
  assert.equal(r0.store.get('cflag:31:324'), 6);

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 23;
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:75', 1);
    f.store.set('cflag:31:324', 9);
    f.store.set('cflag:31:321', 8);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap, seq_rand(0));
  assert.ok(
    at_cap.text_lines().length > 0,
    'CFLAG:321=8 且 CFLAG:324=9 且 FLAG:7==1 仍出声（门槛是 321 <=8）',
  );
  assert.equal(
    at_cap.store.get('cflag:31:324'),
    9,
    '背面座位二次淫乱+性爱狂写 9',
  );
});

test('正常位肛交首次：淫乱 + A钝感附加句，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 26;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('talent:31:105', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊～…啊啊～…咕呜嗯～…啊啊～明明是不能插进去的地方…」',
    '「肉棒…把屁股眼撑大了…咿啊啊～啊啊～♡」',
    '琼钝感的肛门被调教出了快感、将鸡鸡连根吞下、琼发出了淫乱的呻吟声………',
  ]);
  assert.equal(fixture.store.get('cflag:31:327'), 1, '正常位肛交首次推进到 1');
});

test('正常位肛交二次：淫乱+A感觉写 7 / 阈值闸', async () => {
  const r0 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 26;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('cflag:31:327', 1);
  });
  await speak_k0(r0, seq_rand(0));
  assert.deepEqual(r0.text_lines(), [
    '「啊～啊啊～…屁股眼好爽啊～♡」',
    '「更多的侵犯我吧～！啊～咿～啊啊～啊啊啊～♡」',
  ]);
  assert.equal(r0.store.get('cflag:31:327'), 7, '正常位肛交二次淫乱+A感觉写 7');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 26;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('cflag:31:327', 6);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap, seq_rand(0));
  assert.ok(
    at_cap.text_lines().length > 0,
    'cflag=6 且 FLAG:7==1 仍出声（门槛是 <=6）',
  );
  assert.equal(at_cap.store.get('cflag:31:327'), 7);

  const exhausted = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 26;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('cflag:31:327', 7);
    f.store.set('flag:7', 1);
  });
  await speak_k0(exhausted, seq_rand(0));
  assert.deepEqual(exhausted.text_lines(), []);
});

test('背后位肛门首次：淫乱 + A钝感附加句，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 27;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('talent:31:105', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊～…这样子…做着禽兽也不会做的事情…好美妙～…♡」',
    '琼的肛门由于对被侵犯的期待感而下流的敞开了、吞下了你的大鸡鸡………',
    '琼开发过的肛门、将从后面插进来的鸡鸡全部吞下、带给了鸡鸡迷醉不已的快感………',
  ]);
  assert.equal(fixture.store.get('cflag:31:328'), 1, '背后位肛门首次推进到 1');
});

test('背后位肛门二次：淫乱+A感觉写 7 / 阈值闸', async () => {
  const r0 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 27;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('cflag:31:328', 1);
  });
  await speak_k0(r0, seq_rand(0));
  assert.deepEqual(r0.text_lines(), [
    '「哈啊～～…啊啊～啊啊～哈啊啊♡」',
    '「更多的…侵犯屁股眼吧…疯狂的侵犯我吧～♡」',
  ]);
  assert.equal(r0.store.get('cflag:31:328'), 7, '背后位肛门二次淫乱+A感觉写 7');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 27;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('cflag:31:328', 6);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap, seq_rand(0));
  assert.ok(
    at_cap.text_lines().length > 0,
    'cflag=6 且 FLAG:7==1 仍出声（门槛是 <=6）',
  );
  assert.equal(at_cap.store.get('cflag:31:328'), 7);

  const exhausted = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 27;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('cflag:31:328', 7);
    f.store.set('flag:7', 1);
  });
  await speak_k0(exhausted, seq_rand(0));
  assert.deepEqual(exhausted.text_lines(), []);
});

test('对面座位肛交首次：淫乱 + A钝感附加句，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 28;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('talent:31:105', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊～…屁眼变的好舒服啊…额呵呵、我也很舒服哦♡」',
    '琼钝感的肛门被调教出了快感、将鸡鸡连根吞下、琼发出了淫乱的呻吟声………',
  ]);
  assert.equal(
    fixture.store.get('cflag:31:329'),
    1,
    '对面座位肛交首次推进到 1',
  );
});

test('对面座位肛交二次：淫乱+A感觉写 7 / 阈值闸', async () => {
  const r0 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 28;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('cflag:31:329', 1);
  });
  await speak_k0(r0, seq_rand(0));
  assert.deepEqual(r0.text_lines(), [
    '「啊啊～…啊～啊～～！用力插啊～～～！♡」',
    '「咿啊啊～啊～…呀～啊啊啊～～！屁股眼被撑开了～…变的奇怪了～♡」',
    '琼每次被从下方抽插肛门就会用力抱住你在耳边发出娇喘………',
  ]);
  assert.equal(
    r0.store.get('cflag:31:329'),
    7,
    '对面座位肛交二次淫乱+A感觉写 7',
  );

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 28;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('cflag:31:329', 6);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap, seq_rand(0));
  assert.ok(
    at_cap.text_lines().length > 0,
    'cflag=6 且 FLAG:7==1 仍出声（门槛是 <=6）',
  );
  assert.equal(at_cap.store.get('cflag:31:329'), 7);

  const exhausted = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 28;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('cflag:31:329', 7);
    f.store.set('flag:7', 1);
  });
  await speak_k0(exhausted, seq_rand(0));
  assert.deepEqual(exhausted.text_lines(), []);
});

test('背面座位肛交首次：淫乱 + A钝感附加句，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 29;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('talent:31:105', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊呜唔呜～！…屁股眼被侵犯了好爽好爽啊～～～～！」',
    '「再用力点…抱我…请尽情侵犯我的屁眼吧～♡」',
    '琼钝感的肛门被调教出了快感、将鸡鸡连根吞下、琼发出了淫乱的呻吟声………',
  ]);
  assert.equal(
    fixture.store.get('cflag:31:330'),
    1,
    '背面座位肛交首次推进到 1',
  );
});

test('背面座位肛交二次：淫乱+A感觉写 7 / 阈值闸', async () => {
  const r0 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 29;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('cflag:31:330', 1);
  });
  await speak_k0(r0, seq_rand(0));
  assert.deepEqual(r0.text_lines(), [
    '「咿呀啊啊～…屁股眼好舒服～好舒服啊～…啊啊啊啊啊…♡」',
    '「屁股眼～…不行了…已、已经…爽得什么事都不想去想了～…咿呜～啊啊～啊啊啊啊啊♡」',
    '琼嘴边流着口水沉浸在肛门的快感之中………',
  ]);
  assert.equal(
    r0.store.get('cflag:31:330'),
    7,
    '背面座位肛交二次淫乱+A感觉写 7',
  );

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 29;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('cflag:31:330', 6);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap, seq_rand(0));
  assert.ok(
    at_cap.text_lines().length > 0,
    'cflag=6 且 FLAG:7==1 仍出声（门槛是 <=6）',
  );
  assert.equal(at_cap.store.get('cflag:31:330'), 7);

  const exhausted = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 29;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('cflag:31:330', 7);
    f.store.set('flag:7', 1);
  });
  await speak_k0(exhausted, seq_rand(0));
  assert.deepEqual(exhausted.text_lines(), []);
});

test('手淫首次：淫乱，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 30;
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「额呵呵…这样一上一下地…玩弄大肉棒真不错呢♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:331'), 1, '手淫首次推进到 1');
});

test('手淫二次：淫乱+侍奉写 6 / 阴茎形状读 PLAYER / 阈值闸', async () => {
  const r0 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 30;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:16', 3);
    f.store.set('cflag:31:331', 1);
    f.store.set('talent:0:318', 1); // TALENT:PLAYER:318 == 1 巨根
    f.store.set('talent:31:318', 4); // 若误读 TARGET 会落到马肉棒档
  });
  await speak_k0(r0, seq_rand(0));
  assert.deepEqual(r0.text_lines(), [
    '「好雄伟的肉棒…两只手都抓不住♡」',
    '「啊啊～…单是摸到大肉棒就已经按捺不住了～………♡」',
    '「当、当然让我奉仕大肉棒一整天也是能做到的、不过…啊啊～不要让大肉棒这么兴奋嘛♡」',
  ]);
  assert.equal(r0.store.get('cflag:31:331'), 6, '手淫二次淫乱+侍奉写 6');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 30;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:16', 3);
    f.store.set('cflag:31:331', 5);
    f.store.set('flag:7', 1);
    f.store.set('talent:0:318', 1);
    f.store.set('talent:31:318', 4);
  });
  await speak_k0(at_cap, seq_rand(0));
  assert.ok(
    at_cap.text_lines().length > 0,
    'cflag=5 且 FLAG:7==1 仍出声（门槛是 <=5）',
  );
  assert.equal(at_cap.store.get('cflag:31:331'), 6);

  const exhausted = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 30;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:16', 3);
    f.store.set('cflag:31:331', 6);
    f.store.set('flag:7', 1);
    f.store.set('talent:0:318', 1);
  });
  await speak_k0(exhausted, seq_rand(0));
  assert.deepEqual(exhausted.text_lines(), []);
});

test('口交首次：淫乱，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 31;
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊～…能奉仕大肉棒～…好开心啊…嗯啾～啾～嘞噗～…嘞咯～…噗呼呜♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:332'), 1, '口交首次推进到 1');
});

test('口交二次：淫乱+侍奉写 6 / 阴茎形状读 PLAYER / 阈值闸', async () => {
  const r0 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 31;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:16', 5);
    f.store.set('cflag:31:332', 1);
    f.store.set('talent:0:318', 1); // TALENT:PLAYER:318 == 1 巨根
    f.store.set('talent:31:318', 4); // 若误读 TARGET 会落到马肉棒档
  });
  await speak_k0(r0);
  assert.deepEqual(r0.text_lines(), [
    '「啊，雄伟的肉棒……我开动了♡」',
    '「嗯姆啾呜…哈啊…哈啊…大肉棒…美味…好美味啊…啊～～…呗咯～…啾～啾呜唔呜唔♡」',
    '「嘴巴要融化了～…嗯噗～…啾啪啊～…嘞噗～啾～啾呜呜～啾呜唔♡」',
    '琼把精液吞进喉咙深处、享受着口交奉仕………',
  ]);
  assert.equal(r0.store.get('cflag:31:332'), 6, '口交二次淫乱+侍奉写 6');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 31;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:16', 5);
    f.store.set('cflag:31:332', 3);
    f.store.set('flag:7', 1);
    f.store.set('talent:0:318', 1);
    f.store.set('talent:31:318', 4);
  });
  await speak_k0(at_cap);
  assert.ok(
    at_cap.text_lines().length > 0,
    'cflag=3 且 FLAG:7==1 仍出声（门槛是 <=3）',
  );
  assert.equal(at_cap.store.get('cflag:31:332'), 6);

  const exhausted = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 31;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:16', 5);
    f.store.set('cflag:31:332', 6);
    f.store.set('flag:7', 1);
    f.store.set('talent:0:318', 1);
  });
  await speak_k0(exhausted);
  assert.deepEqual(exhausted.text_lines(), []);
});

test('乳交首次：淫乱，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 32;
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「额呵呵～…用乳房做舒服吗♡　请尽情的射精吧♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:333'), 1, '乳交首次推进到 1');
});

test('乳交二次：淫乱+侍奉写 6 / 门槛读 CFLAG:332 / 阈值闸', async () => {
  const r0 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 32;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:16', 5);
    f.store.set('cflag:31:333', 1);
    f.store.set('cflag:31:332', 1);
  });
  await speak_k0(r0, seq_rand(0));
  assert.deepEqual(r0.text_lines(), [
    '「嗯～…啊～…哈啊～～…再继续侵犯我的乳房吧…♡」',
    '「啊呜唔…要射精的话…请满满的射在乳房上吧～♡」',
    '琼一边露出淫猥的笑容一边倾斜着乳房奉仕着鸡鸡………',
  ]);
  assert.equal(r0.store.get('cflag:31:333'), 6, '乳交二次淫乱+侍奉写 6');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 32;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:16', 5);
    f.store.set('cflag:31:333', 9); // 本档耗尽；若门槛改回 333 则静默
    f.store.set('cflag:31:332', 5); // 口交档仍 <=5，正确读 332 才出声
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap, seq_rand(0));
  assert.ok(
    at_cap.text_lines().length > 0,
    'cflag:332=5 且 FLAG:7==1 仍出声（门槛读口交 CFLAG:332 <=5）',
  );
  assert.equal(at_cap.store.get('cflag:31:333'), 6);

  const exhausted = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 32;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:16', 5);
    f.store.set('cflag:31:333', 9);
    f.store.set('cflag:31:332', 6);
    f.store.set('flag:7', 1);
  });
  await speak_k0(exhausted, seq_rand(0));
  assert.deepEqual(exhausted.text_lines(), []);
});

test('股间性交首次：淫乱，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 33;
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「额呵呵～…这就是所谓的”素股”吧…啊啊…大鸡鸡好烫啊…」',
  ]);
  assert.equal(fixture.store.get('cflag:31:334'), 1, '股间性交首次推进到 1');
});

test('股间性交二次：淫乱+处女写 6 / 阈值闸', async () => {
  const r0 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 33;
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:0', 1); // TALENT:0 处女；夹具不从 Chara31.yml 装载
    f.store.set('flag:7', 1); // 关掉每次出声，处女条件必须成立才写 6
    f.store.set('cflag:31:334', 1);
  });
  await speak_k0(r0);
  assert.deepEqual(r0.text_lines(), [
    '「啊啊～啊～哈啊啊啊…嗯呼呜…呐、主人～…要是肉棒…就这样…插进我的小穴里去了该怎么办呢？」',
    '「…额呵呵～…没关系哦…我的贞洁该怎么处置…就全交由主人判断啦…呵呵…额呵呵♥」',
  ]);
  assert.equal(r0.store.get('cflag:31:334'), 6, '股间性交二次淫乱+处女写 6');

  const no_virgin = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 33;
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:0', 0);
    f.store.set('flag:7', 1);
    f.store.set('cflag:31:334', 1);
  });
  await speak_k0(no_virgin);
  assert.deepEqual(no_virgin.text_lines(), [
    '「啊啊～～…不要挑逗人家嘛…求你了～…♥」',
    '「明明好想要…大肉棒啊…啊啊～…啊～…啊～～…把人家弄得不上不下的…要疯了～♥♥♥」',
  ]);
  assert.equal(no_virgin.store.get('cflag:31:334'), 5, '非处女走淫乱档写 5');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 33;
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:0', 1);
    f.store.set('cflag:31:334', 5);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.ok(
    at_cap.text_lines().length > 0,
    'cflag=5 且 FLAG:7==1 仍出声（门槛是 <=5）',
  );
  assert.equal(at_cap.store.get('cflag:31:334'), 6);

  const exhausted = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 33;
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:0', 1);
    f.store.set('cflag:31:334', 6);
    f.store.set('flag:7', 1);
  });
  await speak_k0(exhausted);
  assert.deepEqual(exhausted.text_lines(), []);
});

test('骑乘位首次处女：淫乱，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 34;
    f.store.set('talent:31:0', 1);
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊啊…主人～…我的处女…请收下吧♡……额呵呵、总觉得心跳不已呢…」',
    '「哈呜～…咕…啊啊…就这样插进去…啊啊～啊～、啊啊啊啊啊啊啊～～！！！」',
    '琼自己沉下腰把处女献了出来。',
    '「哈啊…哈啊…啊啊啊…主人的大肉棒…进到里面去了～…啊～啊啊～啊啊啊～♡」',
    '琼开心的笑了并为了战胜破瓜的疼痛开始慢慢地动起了腰。…',
  ]);
  assert.equal(fixture.store.get('cflag:31:335'), 1, '骑乘位首次推进到 1');
});

test('骑乘位二次：淫乱+性爱狂写 9 / 门槛读 CFLAG:321 / 阈值闸', async () => {
  const r0 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 34;
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:75', 1);
    f.store.set('cflag:31:335', 1);
    f.store.set('cflag:31:321', 1);
  });
  await speak_k0(r0, seq_rand(0));
  assert.ok(r0.text_lines().length > 0);
  assert.equal(r0.store.get('cflag:31:335'), 9, '骑乘位二次淫乱+性爱狂写 9');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 34;
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:75', 1);
    f.store.set('cflag:31:335', 9); // 本档耗尽；若门槛改回 335 则静默
    f.store.set('cflag:31:321', 8); // 正常位仍 <=8，正确读 321 才出声
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap, seq_rand(0));
  assert.ok(
    at_cap.text_lines().length > 0,
    'cflag:321=8 且 FLAG:7==1 仍出声（门槛读正常位 CFLAG:321 <=8）',
  );
  assert.equal(at_cap.store.get('cflag:31:335'), 9);

  const exhausted = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 34;
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:75', 1);
    f.store.set('cflag:31:335', 1);
    f.store.set('cflag:31:321', 9);
    f.store.set('flag:7', 1);
  });
  await speak_k0(exhausted, seq_rand(0));
  assert.equal(
    exhausted.store.get('cflag:31:335'),
    6,
    'CFLAG:321=9 跳过性爱狂档、落到淫乱档写 6',
  );
});

test('全身擦洗首次：侍奉 >= 3，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 35;
    f.store.set('abl:31:16', 3);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「额呵呵～…还有这样的洗法啊…我会努力奉仕的哦…♪」',
  ]);
  assert.equal(fixture.store.get('cflag:31:336'), 1, '全身擦洗首次推进到 1');
});

test('全身擦洗二次：淫乱+侍奉写 5 / 阈值闸', async () => {
  const r0 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 35;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:16', 5);
    f.store.set('cflag:31:336', 1);
  });
  await speak_k0(r0);
  assert.deepEqual(r0.text_lines(), [
    '「啊啊啊…感觉如何呢…我的身体～…额呵呵、这样擦洗身体…总觉得…嗯…啊…哈啊～～♪」',
    '琼故意发出了喘息声………',
  ]);
  assert.equal(r0.store.get('cflag:31:336'), 5, '全身擦洗二次淫乱+侍奉写 5');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 35;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:16', 5);
    f.store.set('cflag:31:336', 4);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.ok(
    at_cap.text_lines().length > 0,
    'cflag=4 且 FLAG:7==1 仍出声（门槛是 <=4）',
  );
  assert.equal(at_cap.store.get('cflag:31:336'), 5);

  const exhausted = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 35;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:16', 5);
    f.store.set('cflag:31:336', 5);
    f.store.set('flag:7', 1);
  });
  await speak_k0(exhausted);
  assert.deepEqual(exhausted.text_lines(), []);
});

test('骑乘位肛交首次：淫乱 + A钝感附加句，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 36;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('talent:31:105', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊～…快看…大肉棒被我的…屁股眼…啊～哈啊啊啊…全部吞进去了～咕呜～♡」',
    '琼钝感的肛门被调教出了快感、将鸡鸡连根吞下、琼发出了淫乱的呻吟声………',
  ]);
  assert.equal(fixture.store.get('cflag:31:337'), 1, '骑乘位肛交首次推进到 1');
});

test('骑乘位肛交二次：淫乱+A感觉写 7 / 阈值闸', async () => {
  const r0 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 36;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('cflag:31:337', 1);
  });
  await speak_k0(r0, seq_rand(0));
  assert.ok(r0.text_lines().length > 0);
  assert.equal(r0.store.get('cflag:31:337'), 7, '骑乘位肛交二次淫乱+A感觉写 7');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 36;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('cflag:31:337', 6);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap, seq_rand(0));
  assert.ok(
    at_cap.text_lines().length > 0,
    'cflag=6 且 FLAG:7==1 仍出声（门槛是 <=6）',
  );
  assert.equal(at_cap.store.get('cflag:31:337'), 7);

  const exhausted = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 36;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('cflag:31:337', 7);
    f.store.set('flag:7', 1);
  });
  await speak_k0(exhausted, seq_rand(0));
  assert.deepEqual(exhausted.text_lines(), []);
});

test('肛门侍奉首次：侍奉 >= 3，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 37;
    f.store.set('abl:31:16', 3);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯…咕…啾…呗咯…呗咯～…嘞咯…哈啊啊…好苦………」',
    '琼下定决心用舌头舔起了你的肛门………',
  ]);
  assert.equal(fixture.store.get('cflag:31:338'), 1, '肛门侍奉首次推进到 1');
});

test('肛门侍奉二次：淫乱+侍奉写 5 / 阈值闸', async () => {
  const r0 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 37;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:16', 5);
    f.store.set('cflag:31:338', 1);
  });
  await speak_k0(r0);
  assert.deepEqual(r0.text_lines(), [
    '「哈啊啊…嗯～…嗯啾呜…嘞咯～…呗咯～…呗咯…啊啊～好美味啊♡」',
    '琼神情陶醉的将舌头深入你的肛门之中持续地奉仕着………',
  ]);
  assert.equal(r0.store.get('cflag:31:338'), 5, '肛门侍奉二次淫乱+侍奉写 5');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 37;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:16', 5);
    f.store.set('cflag:31:338', 4);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.ok(
    at_cap.text_lines().length > 0,
    'cflag=4 且 FLAG:7==1 仍出声（门槛是 <=4）',
  );
  assert.equal(at_cap.store.get('cflag:31:338'), 5);

  const exhausted = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 37;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:16', 5);
    f.store.set('cflag:31:338', 5);
    f.store.set('flag:7', 1);
  });
  await speak_k0(exhausted);
  assert.deepEqual(exhausted.text_lines(), []);
});

test('打屁股首次：推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 40;
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「呀啊啊～！…啊啊～…为、为什么要打我啊～…咿～！不要打～！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:341'), 1, '打屁股首次推进到 1');
});

test('打屁股二次：淫乱+抖M写 5 / 末支须 FLAG:7==2 / 阈值闸', async () => {
  const r0 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 40;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:21', 3);
    f.store.set('cflag:31:341', 1);
  });
  await speak_k0(r0);
  assert.deepEqual(r0.text_lines(), [
    '「啊～…咿呀～～…啊～～！嗯呼呜…啊～…哈啊啊啊啊～～♡」',
    '琼像引诱你似的左右摇着屁股、每次被打就会发出娇艳的呻吟声、爱液从大腿上垂落下来………',
  ]);
  assert.equal(r0.store.get('cflag:31:341'), 5, '打屁股二次淫乱+抖M写 5');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 40;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:21', 3);
    f.store.set('cflag:31:341', 4);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.ok(
    at_cap.text_lines().length > 0,
    'cflag=4 且 FLAG:7==1 仍出声（门槛是 <=4）',
  );
  assert.equal(at_cap.store.get('cflag:31:341'), 5);

  const exhausted = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 40;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:21', 3);
    f.store.set('cflag:31:341', 5);
    f.store.set('flag:7', 1);
  });
  await speak_k0(exhausted);
  assert.deepEqual(exhausted.text_lines(), []);

  // 末支是 AND FLAG:7==2，不是 OR：cflag=1 且 FLAG:7==1 时沉默
  const last_and = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 40;
    f.store.set('cflag:31:341', 1);
    f.store.set('flag:7', 1);
  });
  await speak_k0(last_and);
  assert.deepEqual(last_and.text_lines(), []);

  const last_on = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 40;
    f.store.set('cflag:31:341', 1);
    f.store.set('flag:7', 2);
  });
  await speak_k0(last_on);
  assert.ok(
    last_on.text_lines().length > 0,
    '末支 cflag=1 且 FLAG:7==2 才出声',
  );
  assert.equal(last_on.store.get('cflag:31:341'), 2);
});

test('鞭首次：淫乱，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 41;
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), ['「啊啊…虽然被抽也不是不可以…♡」']);
  assert.equal(fixture.store.get('cflag:31:342'), 1, '鞭首次推进到 1');
});

test('鞭二次：淫乱+抖M写 9 / 末支读 CFLAG:335 / 阈值闸', async () => {
  const r0 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 41;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:21', 5);
    f.store.set('cflag:31:342', 1);
  });
  await speak_k0(r0);
  assert.ok(r0.text_lines().length > 0);
  assert.equal(r0.store.get('cflag:31:342'), 9, '鞭二次淫乱+抖M写 9');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 41;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:21', 5);
    f.store.set('cflag:31:342', 8);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.ok(
    at_cap.text_lines().length > 0,
    'cflag=8 且 FLAG:7==1 仍出声（门槛是 <=8）',
  );
  assert.equal(at_cap.store.get('cflag:31:342'), 9);

  const exhausted = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 41;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:21', 5);
    f.store.set('cflag:31:342', 9);
    f.store.set('cflag:31:335', 2);
    f.store.set('flag:7', 1);
  });
  await speak_k0(exhausted);
  assert.deepEqual(exhausted.text_lines(), []);

  // 末支读 CFLAG:335（骑乘位）不是自己的 342：own=9 + 335=1 仍出声并写 2
  const last_foreign = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 41;
    f.store.set('cflag:31:342', 9);
    f.store.set('cflag:31:335', 1);
    f.store.set('flag:7', 1);
  });
  await speak_k0(last_foreign);
  assert.ok(
    last_foreign.text_lines().length > 0,
    'own=9 且 骑乘位=1 仍出声（末支读 CFLAG:335）',
  );
  assert.equal(last_foreign.store.get('cflag:31:342'), 2);

  const last_exhausted = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 41;
    f.store.set('cflag:31:342', 9);
    f.store.set('cflag:31:335', 2);
    f.store.set('flag:7', 1);
  });
  await speak_k0(last_exhausted);
  assert.deepEqual(last_exhausted.text_lines(), []);
});

test('针首次：淫乱，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 42;
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊啊…这次要这样开发我吗～…是～…我会好好忍耐的…」',
  ]);
  assert.equal(fixture.store.get('cflag:31:343'), 1, '针首次推进到 1');
});

test('针二次：淫乱+抖M写 9 / 阈值闸', async () => {
  const r0 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 42;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:21', 5);
    f.store.set('cflag:31:343', 1);
  });
  await speak_k0(r0);
  assert.deepEqual(r0.text_lines(), [
    '「啊～…哈呜～…嗯～…那里～…还要…还想被刺啊～～～～！」',
    '琼发出了快乐的呻吟声、血从柔嫩的肌肤上滴落下来………',
  ]);
  assert.equal(r0.store.get('cflag:31:343'), 9, '针二次淫乱+抖M写 9');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 42;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:21', 5);
    f.store.set('cflag:31:343', 8);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.ok(
    at_cap.text_lines().length > 0,
    'cflag=8 且 FLAG:7==1 仍出声（门槛是 <=8）',
  );
  assert.equal(at_cap.store.get('cflag:31:343'), 9);

  const exhausted = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 42;
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:21', 5);
    f.store.set('cflag:31:343', 9);
    f.store.set('flag:7', 1);
  });
  await speak_k0(exhausted);
  assert.deepEqual(exhausted.text_lines(), []);
});

test('眼罩开始首次：空 PRINTFORMW 仍等待，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 43;
    f.store.set('tequip:31:43', 1);
    f.store.set('talent:31:85', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), ['']);
  assert.equal(fixture.store.get('cflag:31:344'), 1, '眼罩首次推进到 1');
});

test('眼罩开始二次：爱慕+抖M写 6 / 阈值闸', async () => {
  const r0 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 43;
    f.store.set('tequip:31:43', 1);
    f.store.set('talent:31:85', 1);
    f.store.set('abl:31:21', 5);
    f.store.set('cflag:31:344', 1);
  });
  await speak_k0(r0);
  assert.deepEqual(r0.text_lines(), ['']);
  assert.equal(r0.store.get('cflag:31:344'), 6, '眼罩开始二次爱慕+抖M写 6');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 43;
    f.store.set('tequip:31:43', 1);
    f.store.set('talent:31:85', 1);
    f.store.set('abl:31:21', 5);
    f.store.set('cflag:31:344', 5);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.ok(
    at_cap.text_lines().length > 0,
    'cflag=5 且 FLAG:7==1 仍出声（门槛是 <=5）',
  );
  assert.equal(at_cap.store.get('cflag:31:344'), 6);

  const exhausted = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 43;
    f.store.set('tequip:31:43', 1);
    f.store.set('talent:31:85', 1);
    f.store.set('abl:31:21', 5);
    f.store.set('cflag:31:344', 6);
    f.store.set('flag:7', 1);
  });
  await speak_k0(exhausted);
  assert.deepEqual(exhausted.text_lines(), []);
});

test('眼罩脱着：爱慕写 CFLAG:380 = 2，门槛是 < 不是 <=', async () => {
  const love = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 43;
    f.store.set('tequip:31:43', 0);
    f.store.set('talent:31:85', 1);
  });
  await speak_k0(love);
  assert.deepEqual(love.text_lines(), ['']);
  assert.equal(love.store.get('cflag:31:380'), 2, '眼罩着脱推进到 2');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 43;
    f.store.set('tequip:31:43', 0);
    f.store.set('talent:31:85', 1);
    f.store.set('cflag:31:380', 2);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.deepEqual(at_cap.text_lines(), []);
  assert.equal(at_cap.store.get('cflag:31:380'), 2, '眼罩着脱阈值闸用 < 2');
});

test('绳子开始首次：淫乱，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 44;
    f.store.set('tequip:31:44', 1);
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊啊…请再绑紧一点～…♡」',
    '琼的柔嫩肌肤被粗绳子相当紧的五花大绑起来了的样子………',
  ]);
  assert.equal(fixture.store.get('cflag:31:345'), 1, '绳子首次推进到 1');
});

test('绳子开始二次：淫乱+抖M写 9 / 阈值闸', async () => {
  const r0 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 44;
    f.store.set('tequip:31:44', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:21', 5);
    f.store.set('cflag:31:345', 1);
  });
  await speak_k0(r0);
  assert.deepEqual(r0.text_lines(), [
    '「啊啊啊～…被绳子绑的紧紧的～♡」',
    '「啊啊～…明明被绳子绑着应该感到又痛又怕的…啊～啊啊啊啊啊♡」',
    '琼被绳子绑着、爱液不停地滴落下来………',
  ]);
  assert.equal(r0.store.get('cflag:31:345'), 9, '绳子开始二次淫乱+抖M写 9');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 44;
    f.store.set('tequip:31:44', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:21', 5);
    f.store.set('cflag:31:345', 8);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.ok(
    at_cap.text_lines().length > 0,
    'cflag=8 且 FLAG:7==1 仍出声（门槛是 <=8）',
  );
  assert.equal(at_cap.store.get('cflag:31:345'), 9);

  const exhausted = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 44;
    f.store.set('tequip:31:44', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:21', 5);
    f.store.set('cflag:31:345', 9);
    f.store.set('flag:7', 1);
  });
  await speak_k0(exhausted);
  assert.deepEqual(exhausted.text_lines(), []);
});

test('绳子脱着：淫乱写 CFLAG:385 = 2，门槛是 < 不是 <=', async () => {
  const lewd = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 44;
    f.store.set('tequip:31:44', 0);
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(lewd);
  assert.deepEqual(lewd.text_lines(), [
    '「哈啊…哈啊…啊啊…明明可以再绑一会儿的…♡」',
  ]);
  assert.equal(lewd.store.get('cflag:31:385'), 2, '绳子着脱推进到 2');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 44;
    f.store.set('tequip:31:44', 0);
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:385', 2);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.deepEqual(at_cap.text_lines(), []);
  assert.equal(at_cap.store.get('cflag:31:385'), 2, '绳子着脱阈值闸用 < 2');
});

test('口塞开始首次：爱慕，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 45;
    f.store.set('tequip:31:45', 1);
    f.store.set('talent:31:85', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), ['「哈咕～…嗯～♡」']);
  assert.equal(fixture.store.get('cflag:31:346'), 1, '口塞首次推进到 1');
});

test('口塞开始二次：爱慕+抖M写 6 / 阈值闸', async () => {
  const r0 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 45;
    f.store.set('tequip:31:45', 1);
    f.store.set('talent:31:85', 1);
    f.store.set('abl:31:21', 5);
    f.store.set('cflag:31:346', 1);
  });
  await speak_k0(r0);
  assert.deepEqual(r0.text_lines(), ['「哈咕～…嗯～♡」']);
  assert.equal(r0.store.get('cflag:31:346'), 6, '口塞开始二次爱慕+抖M写 6');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 45;
    f.store.set('tequip:31:45', 1);
    f.store.set('talent:31:85', 1);
    f.store.set('abl:31:21', 5);
    f.store.set('cflag:31:346', 5);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.ok(
    at_cap.text_lines().length > 0,
    'cflag=5 且 FLAG:7==1 仍出声（门槛是 <=5）',
  );
  assert.equal(at_cap.store.get('cflag:31:346'), 6);

  const exhausted = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 45;
    f.store.set('tequip:31:45', 1);
    f.store.set('talent:31:85', 1);
    f.store.set('abl:31:21', 5);
    f.store.set('cflag:31:346', 6);
    f.store.set('flag:7', 1);
  });
  await speak_k0(exhausted);
  assert.deepEqual(exhausted.text_lines(), []);
});

test('口塞脱着：爱慕或淫乱写 CFLAG:386 = 2，门槛是 < 不是 <=', async () => {
  const lewd = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 45;
    f.store.set('tequip:31:45', 0);
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(lewd);
  assert.deepEqual(lewd.text_lines(), ['「嗯咕～…噗啊…哈啊…哈啊…哈啊…♡」']);
  assert.equal(lewd.store.get('cflag:31:386'), 2, '口塞着脱推进到 2');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 45;
    f.store.set('tequip:31:45', 0);
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:386', 2);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.deepEqual(at_cap.text_lines(), []);
  assert.equal(at_cap.store.get('cflag:31:386'), 2, '口塞着脱阈值闸用 < 2');
});

test('灌肠+肛塞开始首次：淫乱，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 46;
    f.store.set('tequip:31:46', 1);
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「呼啊啊～…肚子鼓起来了…啊啊～…这是…什么…肚子…啊啊～…啊～」',
  ]);
  assert.equal(fixture.store.get('cflag:31:347'), 1, '灌肠肛塞首次推进到 1');
});

test('灌肠+肛塞开始二次：淫乱+A感觉+抖M写 7 / 阈值闸', async () => {
  const r0 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 46;
    f.store.set('tequip:31:46', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('abl:31:21', 3);
    f.store.set('cflag:31:347', 1);
  });
  await speak_k0(r0);
  assert.deepEqual(r0.text_lines(), [
    '「啊～…啊啊～…再灌啊…灌到极限为止～…把肚子灌成水桶似的吧…！」',
    '「嗯～…哈啊…哈啊…我的肚子…已经变成主人的玩具了～…♪」',
    '「接下来…肚子里的东西全部喷出来的不堪入目的样子…请好好欣赏吧～♡」',
  ]);
  assert.equal(
    r0.store.get('cflag:31:347'),
    7,
    '灌肠肛塞开始二次淫乱+A感觉+抖M写 7',
  );

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 46;
    f.store.set('tequip:31:46', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('abl:31:21', 3);
    f.store.set('cflag:31:347', 6);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.ok(
    at_cap.text_lines().length > 0,
    'cflag=6 且 FLAG:7==1 仍出声（门槛是 <=6）',
  );
  assert.equal(at_cap.store.get('cflag:31:347'), 7);

  const exhausted = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 46;
    f.store.set('tequip:31:46', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('abl:31:21', 3);
    f.store.set('cflag:31:347', 7);
    f.store.set('flag:7', 1);
  });
  await speak_k0(exhausted);
  assert.deepEqual(exhausted.text_lines(), []);
});

test('灌肠+肛塞脱着：淫乱+A感觉拼句 / 壶虫 / 空 PRINTFORMW 仍等待', async () => {
  const splice = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 46;
    f.store.set('tequip:31:46', 0);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('abl:31:21', 3);
  });
  await speak_k0(splice, seq_rand(0, 0, 0, 0, 0, 0));
  assert.deepEqual(splice.text_lines(), [
    '「呀…嗯啊、啊、啊啊！',
    '出来了、',
    '全部',
    '要排出来了啊♡♡♡」',
    '琼露出欢愉又夹杂着苦痛的表情、因为排泄的快感而扭动着身体。',
  ]);

  const worm = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 46;
    f.store.set('tequip:31:46', 0);
    f.store.set('tequip:31:11', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('abl:31:21', 3);
  });
  await speak_k0(worm, seq_rand(0, 0, 1, 0, 0, 0));
  assert.ok(
    worm.text_lines().some((line) => line.includes('极粗的蠕虫正在蠢动着、')),
    'TEQUIP:11 壶虫支要说出蠕虫',
  );

  const empty = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 46;
    f.store.set('tequip:31:46', 0);
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(empty);
  assert.deepEqual(empty.text_lines(), [''], '空 PRINTFORMW 仍等待');
});

test('放置PLAY首次：淫乱，推进到 1 / 壶虫 SIF', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 55;
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯…那、那个…请…再调教我吧………♪」',
    '琼好像还很欲求不满的样子………',
    '',
  ]);
  assert.equal(fixture.store.get('cflag:31:356'), 1, '放置PLAY首次推进到 1');

  const worm = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 55;
    f.store.set('talent:31:76', 1);
    f.store.set('tequip:31:11', 1);
  });
  await speak_k0(worm);
  assert.ok(
    worm.text_lines().some((line) => line.includes('壶虫在琼的私处里蠢动着')),
    '首次装备 SIF：壶虫',
  );
});

test('放置PLAY二次：淫乱+欲情写 6 / 阈值闸 / 耗尽仍 PRINTL', async () => {
  const r0 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 55;
    f.store.set('talent:31:76', 1);
    f.store.set('palam:31:5', 3000);
    f.store.set('cflag:31:356', 1);
  });
  await speak_k0(r0);
  assert.deepEqual(r0.text_lines(), [
    '「啊啊～…主人…求、求你了…请不要不理我…嗯！」',
    '琼露出发情般的表情向你撒娇…………',
    '',
  ]);
  assert.equal(r0.store.get('cflag:31:356'), 6, '放置PLAY二次淫乱+欲情写 6');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 55;
    f.store.set('talent:31:76', 1);
    f.store.set('palam:31:5', 3000);
    f.store.set('cflag:31:356', 5);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.ok(
    at_cap.text_lines().some((line) => line.includes('请不要不理我')),
    'cflag=5 且 FLAG:7==1 仍出声（门槛是 <=5）',
  );
  assert.equal(at_cap.store.get('cflag:31:356'), 6);

  const exhausted = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 55;
    f.store.set('talent:31:76', 1);
    f.store.set('palam:31:5', 3000);
    f.store.set('cflag:31:356', 6);
    f.store.set('flag:7', 1);
  });
  await speak_k0(exhausted);
  assert.deepEqual(exhausted.text_lines(), [''], '耗尽档仍 PRINTL，不是全静音');
  assert.equal(exhausted.store.get('cflag:31:356'), 6);

  const low_palam = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 55;
    f.store.set('talent:31:76', 1);
    f.store.set('palam:31:5', 2999);
    f.store.set('cflag:31:356', 1);
    f.store.set('flag:7', 1);
  });
  await speak_k0(low_palam);
  assert.equal(
    low_palam.store.get('cflag:31:356'),
    5,
    '欲情不足 PALAMLV[3] 落到淫乱档写 5',
  );
});

test('交谈首次：淫乱推进到 1 / 录像自白写 TFLAG:32 |= 2', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 56;
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '琼用比起会话更想做爱的态度与你说着话。',
    '「明明谈话什么的怎样都好………」',
  ]);
  assert.equal(fixture.store.get('cflag:31:357'), 1, '交谈首次推进到 1');

  const video = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 56;
    f.store.set('tequip:31:53', 1);
    f.store.set('talent:31:89', 1);
    f.store.set('abl:31:31', 3);
    f.store.set('tflag:32', 1);
  });
  await speak_k0(video, seq_rand(0));
  assert.deepEqual(video.text_lines(), [
    '你让琼做个自我介绍。',
    '于是琼就将自己的本名、至今为止的性体验',
    '以及自慰时妄想的内容',
    '开始愉快的说了起来……',
    '单是想到这个水晶球会流传到故乡认识的人手里，琼两腿之间就变的湿润起来了……',
  ]);
  assert.equal(
    video.store.get('tflag:32'),
    3,
    '录像自白 TFLAG:32 |= 2（1|2=3）',
  );
  assert.equal(video.store.get('cflag:31:357'), 1);
});

test('交谈二次：不写 CFLAG / 插着不拔情话 / 沉默', async () => {
  const talk = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 56;
    f.store.set('cflag:31:357', 1);
    f.store.set('talent:31:85', 1);
    f.store.set('palam:31:5', 10000);
    f.store.set('tflag:60', 1);
  });
  await speak_k0(talk);
  assert.deepEqual(talk.text_lines(), ['琼一边扭动着腰一边与你说着情话。']);
  assert.equal(talk.store.get('cflag:31:357'), 1, '交谈二次不写 CFLAG');

  const silent = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 56;
    f.store.set('cflag:31:357', 1);
    f.store.set('tequip:31:53', 1);
  });
  await speak_k0(silent, seq_rand(1));
  assert.deepEqual(silent.text_lines(), [
    '你让琼作个自我介绍。',
    '但琼把头转向一边什么话也不说。',
  ]);
  assert.equal(silent.store.get('tflag:32'), undefined, '沉默支不写 TFLAG:32');
  assert.equal(silent.store.get('cflag:31:357'), 1, '交谈二次沉默也不写 CFLAG');
});

test('乳夹口交首次：淫乱，推进到 1 / 巨乳 SIF', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 123;
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '琼用双乳夹住了你的阴茎并把前端含进嘴里开始细致的舔舐起来。',
    '「好烫啊～…大肉棒～♡ 大肉棒～♡ 啊啊啊…嗯～嗯咕呜～嗯咻～咻噜呜～♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:360'), 1, '乳夹口交首次推进到 1');

  const bust = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 123;
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:110', 1);
  });
  await speak_k0(bust);
  assert.ok(
    bust.text_lines().some((line) => line.includes('淫乱大乳房')),
    '巨乳 SIF：TALENT:110',
  );
});

test('乳夹口交二次：淫乱写 5 / 阈值闸', async () => {
  const r0 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 123;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:360', 1);
  });
  await speak_k0(r0);
  assert.equal(r0.store.get('cflag:31:360'), 5, '乳夹口交二次淫乱写 5');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 123;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:360', 4);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.ok(
    at_cap.text_lines().length > 0,
    'cflag=4 且 FLAG:7==1 仍出声（门槛是 <=4）',
  );
  assert.equal(at_cap.store.get('cflag:31:360'), 5);

  const exhausted = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 123;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:360', 5);
    f.store.set('flag:7', 1);
  });
  await speak_k0(exhausted);
  assert.deepEqual(exhausted.text_lines(), []);
});

test('口交时自慰首次：淫乱，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 125;
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(fixture);
  assert.ok(
    fixture
      .text_lines()
      .some((line) => line.includes('含住了阴茎开始自慰起来')),
  );
  assert.equal(fixture.store.get('cflag:31:361'), 1, '口交时自慰首次推进到 1');
});

test('口交时自慰二次：淫乱写 5 / 阈值闸', async () => {
  const r0 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 125;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:361', 1);
  });
  await speak_k0(r0);
  assert.equal(r0.store.get('cflag:31:361'), 5, '口交时自慰二次淫乱写 5');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 125;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:361', 4);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.ok(
    at_cap.text_lines().length > 0,
    'cflag=4 且 FLAG:7==1 仍出声（门槛是 <=4）',
  );
  assert.equal(at_cap.store.get('cflag:31:361'), 5);

  const exhausted = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 125;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:361', 5);
    f.store.set('flag:7', 1);
  });
  await speak_k0(exhausted);
  assert.deepEqual(exhausted.text_lines(), []);
});

test('手搓口交首次：淫乱，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 126;
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(fixture);
  assert.ok(fixture.text_lines().some((line) => line.includes('握住阴茎')));
  assert.equal(fixture.store.get('cflag:31:362'), 1, '手搓口交首次推进到 1');
});

test('手搓口交二次：淫乱写 5 / 阈值闸', async () => {
  const r0 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 126;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:362', 1);
  });
  await speak_k0(r0);
  assert.equal(r0.store.get('cflag:31:362'), 5, '手搓口交二次淫乱写 5');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 126;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:362', 4);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.ok(
    at_cap.text_lines().length > 0,
    'cflag=4 且 FLAG:7==1 仍出声（门槛是 <=4）',
  );
  assert.equal(at_cap.store.get('cflag:31:362'), 5);

  const exhausted = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 126;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:362', 5);
    f.store.set('flag:7', 1);
  });
  await speak_k0(exhausted);
  assert.deepEqual(exhausted.text_lines(), []);
});

test('真空口交首次：淫乱，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 127;
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(fixture);
  assert.ok(
    fixture.text_lines().some((line) => line.includes('把阴茎吞入喉咙深处')),
  );
  assert.equal(fixture.store.get('cflag:31:363'), 1, '真空口交首次推进到 1');
});

test('真空口交二次：淫乱写 5 / 阈值闸', async () => {
  const r0 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 127;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:363', 1);
  });
  await speak_k0(r0);
  assert.equal(r0.store.get('cflag:31:363'), 5, '真空口交二次淫乱写 5');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 127;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:363', 4);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.ok(
    at_cap.text_lines().length > 0,
    'cflag=4 且 FLAG:7==1 仍出声（门槛是 <=4）',
  );
  assert.equal(at_cap.store.get('cflag:31:363'), 5);

  const exhausted = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 127;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:363', 5);
    f.store.set('flag:7', 1);
  });
  await speak_k0(exhausted);
  assert.deepEqual(exhausted.text_lines(), []);
});

test('六九式首次：淫乱，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 69;
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(fixture);
  assert.ok(
    fixture
      .text_lines()
      .some((line) => line.includes('互相贪婪的亲吻着两腿之间')),
  );
  assert.equal(fixture.store.get('cflag:31:364'), 1, '六九式首次推进到 1');
});

test('六九式二次：淫乱写 5 / 阈值闸', async () => {
  const r0 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 69;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:364', 1);
  });
  await speak_k0(r0);
  assert.equal(r0.store.get('cflag:31:364'), 5, '六九式二次淫乱写 5');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 69;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:364', 4);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.ok(
    at_cap.text_lines().length > 0,
    'cflag=4 且 FLAG:7==1 仍出声（门槛是 <=4）',
  );
  assert.equal(at_cap.store.get('cflag:31:364'), 5);

  const exhausted = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 69;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:364', 5);
    f.store.set('flag:7', 1);
  });
  await speak_k0(exhausted);
  assert.deepEqual(exhausted.text_lines(), []);
});

test('深喉二次：读 CFLAG:363 写 CFLAG:365 / 阈值闸', async () => {
  const r0 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 124;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:365', 1);
  });
  await speak_k0(r0);
  assert.equal(r0.store.get('cflag:31:365'), 5, '深喉二次淫乱写 5');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 124;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:365', 9);
    f.store.set('cflag:31:363', 4);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.ok(
    at_cap.text_lines().length > 0,
    'own=9 且 CFLAG:363=4 且 FLAG:7==1 仍出声（门槛读 363）',
  );
  assert.equal(at_cap.store.get('cflag:31:365'), 5);

  const exhausted = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 124;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:365', 9);
    f.store.set('cflag:31:363', 5);
    f.store.set('flag:7', 1);
  });
  await speak_k0(exhausted);
  assert.deepEqual(exhausted.text_lines(), []);
});

test('深喉首次：淫乱，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 124;
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(fixture);
  assert.ok(
    fixture.text_lines().some((line) => line.includes('用嘴唇紧紧含着根部')),
  );
  assert.equal(fixture.store.get('cflag:31:365'), 1, '深喉首次推进到 1');
});

test('强制口交首次：淫乱，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 80;
    f.store.set('talent:31:76', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯噗呜呜～嗯咕～！？嗯～嗯呼呜呜～…嗯呼呜呜呜呜♡」',
    '琼一边翻着白眼一边被鸡鸡插进了喉咙深处………',
  ]);
  assert.equal(fixture.store.get('cflag:31:381'), 1, '强制口交首次推进到 1');
});

test('强制口交二次：淫乱写 5 / 黑心 / 阈值闸', async () => {
  const r0 = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 80;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:381', 1);
  });
  await speak_k0(r0);
  assert.ok(r0.text_lines().some((line) => line.includes('♥')));
  assert.equal(r0.store.get('cflag:31:381'), 5, '强制口交二次淫乱写 5');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 80;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:381', 4);
    f.store.set('flag:7', 1);
  });
  await speak_k0(at_cap);
  assert.ok(
    at_cap.text_lines().length > 0,
    'cflag=4 且 FLAG:7==1 仍出声（门槛是 <=4）',
  );
  assert.equal(at_cap.store.get('cflag:31:381'), 5);

  const exhausted = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 80;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:381', 5);
    f.store.set('flag:7', 1);
  });
  await speak_k0(exhausted);
  assert.deepEqual(exhausted.text_lines(), []);
});

test('穿环首次：淫乱 + 乳头位（P=1）装上，推进到 1', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 87;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:7', 1); // CFLAG:7 & P，P=1 乳头
    const { piercing_state } = f.load_module('system/train/com-hardcore');
    piercing_state.p = 1;
  });
  await speak_k0(fixture);
  assert.ok(
    fixture.text_lines().some((line) => line.includes('乳头就可以拉伸了')),
  );
  assert.equal(fixture.store.get('cflag:31:348'), 1, '穿环首次推进到 1');
});

test('穿环首次：淫乱 + 阴核位（P=8）走 阴核(TARGET) 插值', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 87;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:7', 8); // CFLAG:7 & P，P=8 阴核
    const { piercing_state } = f.load_module('system/train/com-hardcore');
    piercing_state.p = 8;
  });
  await speak_k0(fixture);
  assert.ok(
    fixture
      .text_lines()
      .some((line) => line.includes('像为了展示阴核上的环似的左右摇晃着腰身')),
  );
  assert.equal(fixture.store.get('cflag:31:348'), 1);
});

test('穿环首次：淫乱取下（CFLAG:7 无对应位）', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 87;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:7', 0);
    const { piercing_state } = f.load_module('system/train/com-hardcore');
    piercing_state.p = 1;
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), ['琼抚摸着取掉环后留下的伤痕………']);
  assert.equal(fixture.store.get('cflag:31:348'), 1);
});

test('穿环二次：淫乱写 4 / 阈值闸', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 87;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:348', 1);
    f.store.set('cflag:31:7', 1);
    const { piercing_state } = f.load_module('system/train/com-hardcore');
    piercing_state.p = 1;
  });
  await speak_k0(fixture);
  assert.ok(
    fixture.text_lines().some((line) => line.includes('乳头就可以拉伸了')),
  );
  assert.equal(fixture.store.get('cflag:31:348'), 4, '穿环二次淫乱写 4');

  const at_cap = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 87;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:348', 3);
    f.store.set('cflag:31:7', 1);
    f.store.set('flag:7', 1);
    const { piercing_state } = f.load_module('system/train/com-hardcore');
    piercing_state.p = 1;
  });
  await speak_k0(at_cap);
  assert.ok(
    at_cap.text_lines().length > 0,
    'cflag=3 且 FLAG:7==1 仍出声（门槛是 <=3）',
  );
  assert.equal(at_cap.store.get('cflag:31:348'), 4);

  const exhausted = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 87;
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:348', 4);
    f.store.set('cflag:31:7', 1);
    f.store.set('flag:7', 1);
    const { piercing_state } = f.load_module('system/train/com-hardcore');
    piercing_state.p = 1;
  });
  await speak_k0(exhausted);
  assert.deepEqual(exhausted.text_lines(), []);
});

test('穿环二次：爱慕写 3 / 阴茎位走鸡鸡支', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 87;
    f.store.set('talent:31:85', 1);
    f.store.set('talent:31:122', 1); // 男人 → 阴茎支
    f.store.set('cflag:31:348', 1);
    f.store.set('cflag:31:7', 8);
    const { piercing_state } = f.load_module('system/train/com-hardcore');
    piercing_state.p = 8;
  });
  await speak_k0(fixture);
  assert.ok(fixture.text_lines().some((line) => line.includes('鸡鸡')));
  assert.equal(fixture.store.get('cflag:31:348'), 3, '穿环二次爱慕写 3');
});

test('穿环二次：それ以外写 2', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 87;
    f.store.set('cflag:31:348', 1);
    f.store.set('cflag:31:7', 1);
    const { piercing_state } = f.load_module('system/train/com-hardcore');
    piercing_state.p = 1;
  });
  await speak_k0(fixture);
  assert.ok(
    fixture.text_lines().some((line) => line.includes('竟然被这样的侮辱了')),
  );
  assert.equal(fixture.store.get('cflag:31:348'), 2, '穿环二次それ以外写 2');
});

// —— SELF_KOJO_K0（调教后事件口上，TFLAG:13 分段） ——

// 经 @SELF_KOJO 真身分发（TRYCALLFORM SELF_KOJO_K0 的等价物）
async function self_kojo_k0(fixture, q, rand) {
  const { self_kojo } = fixture.load_module('kojo/kojo-system');
  return self_kojo(rand, q);
}

test('SELF_KOJO：TFLAG:13==1 自慰 Q==0 主人档（淫乱推进 CFLAG:261）', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('tflag:13', 1);
  });
  await self_kojo_k0(fixture, 0);
  assert.ok(
    fixture.text_lines().some((line) => line.includes('身体好痒')),
    '淫乱档自慰台词',
  );
  assert.equal(fixture.store.get('cflag:31:261'), 4, '淫乱档写 4');
});

test('SELF_KOJO：TFLAG:13==1 自慰 Q==1 助手支', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('tflag:13', 1);
  });
  await self_kojo_k0(fixture, 1);
  assert.ok(
    fixture.text_lines().some((line) => line.includes('那孩子')),
    '助手支台词',
  );
});

test('SELF_KOJO：TFLAG:13==1 自慰 Q==2 野狗支', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('tflag:13', 1);
  });
  await self_kojo_k0(fixture, 2);
  assert.ok(
    fixture.text_lines().some((line) => line.includes('狗狗大人')),
    '野狗支台词',
  );
});

test('SELF_KOJO：TFLAG:13==2 百合（淫乱推进 CFLAG:262）', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('tflag:13', 2);
  });
  await self_kojo_k0(fixture, 0);
  assert.ok(
    fixture.text_lines().some((line) => line.includes('别人的小穴')),
    '百合淫乱档台词',
  );
  assert.equal(fixture.store.get('cflag:31:262'), 5, '百合淫乱档写 5');
});

test('SELF_KOJO：TFLAG:13==3 口交（淫乱推进 CFLAG:263）', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('tflag:13', 3);
  });
  await self_kojo_k0(fixture, 0);
  assert.ok(
    fixture.text_lines().some((line) => line.includes('口腔奉仕')),
    '口交淫乱档台词',
  );
  assert.equal(fixture.store.get('cflag:31:263'), 3, '口交淫乱档写 3');
});

test('SELF_KOJO：TFLAG:13==4 性交（ABL:2>=4 推进 CFLAG:264）', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('abl:31:2', 4);
    f.store.set('tflag:13', 4);
  });
  await self_kojo_k0(fixture, 0);
  assert.ok(
    fixture.text_lines().some((line) => line.includes('小穴的躁动')),
    '性交档台词',
  );
  assert.equal(fixture.store.get('cflag:31:264'), 2, '性交档写 2');
});

test('SELF_KOJO：TFLAG:13==5 夜间（推进 CFLAG:265）', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('tflag:13', 5);
  });
  await self_kojo_k0(fixture, 0);
  assert.ok(
    fixture.text_lines().some((line) => line.includes('晚上好')),
    '夜间档台词',
  );
  assert.equal(fixture.store.get('cflag:31:265'), 1, '夜间档写 1');
});

test('SELF_KOJO：TFLAG:13==6 卖出（爱慕支 + 结尾清理 TFLAG:13=0）', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('talent:31:85', 1);
    f.store.set('tflag:13', 6);
  });
  await self_kojo_k0(fixture, 0);
  assert.ok(
    fixture.text_lines().some((line) => line.includes('明明以为你了解了')),
    '卖出爱慕支台词',
  );
  assert.equal(fixture.store.get('tflag:13'), 0, '结尾清 TFLAG:13');
});

test('SELF_KOJO：总开关 FLAG:7 <= 0 静默并清 TFLAG:15', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('flag:7', 0);
    f.store.set('tflag:13', 1);
    f.store.set('tflag:15', 7);
  });
  await self_kojo_k0(fixture, 0);
  assert.deepEqual(fixture.text_lines(), []);
  assert.equal(fixture.store.get('tflag:15'), 0, 'FLAG:7 关闭时 TFLAG:15 清 0');
});

// —— 存根清单核对 ——

test('存根清单可检索：docs/stub-registry.md 收录这张票全部占位名', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('kojo/kojo-k0-tender');
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

// —— PALAMCNG / MARKCNG 参数变动与刻印取得口上 ——

// 经分发族调用（TRYCALLFORM KOJO_MESSAGE_PALAMCNG_0 的等价物）
async function palamcng_k0(fixture) {
  const { kojo_message_palamcng } = fixture.load_module('kojo/kojo-system');
  return kojo_message_palamcng();
}

// 经分发族调用（TRYCALLFORM KOJO_MESSAGE_MARKCNG_0 的等价物）
async function markcng_k0(fixture) {
  const { kojo_message_markcng } = fixture.load_module('kojo/kojo-system');
  return kojo_message_markcng();
}

test('PALAMCNG：润滑度首次超过 LV2 触发首次口上并写 CFLAG:221', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('palam:31:3', 5);
    f.store.set('delta:31:3', 5); // P = 10 > PALAMLV:2 = 5
    f.store.set('palamlv:2', 5);
  });
  await palamcng_k0(fixture);
  assert.match(fixture.text_lines()[0], /湿掉了/);
  assert.equal(fixture.store.get('cflag:31:221'), 1, '记录首次润滑');
});

test('PALAMCNG：CFLAG:221 已置位时不重复出声', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('palam:31:3', 5);
    f.store.set('delta:31:3', 5);
    f.store.set('palamlv:2', 5);
    f.store.set('cflag:31:221', 1);
  });
  await palamcng_k0(fixture);
  assert.deepEqual(fixture.text_lines(), []);
});

test('PALAMCNG：总开关 FLAG:7 <= 0 静默', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('flag:7', 0);
    f.store.set('palam:31:3', 5);
    f.store.set('delta:31:3', 5);
    f.store.set('palamlv:2', 5);
  });
  await palamcng_k0(fixture);
  assert.deepEqual(fixture.text_lines(), []);
});

test('PALAMCNG：助手调教跳过', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('palam:31:3', 5);
    f.store.set('delta:31:3', 5);
    f.store.set('palamlv:2', 5);
  });
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.assi = 1;
  era_flag.assiplay = 1;
  await palamcng_k0(fixture);
  assert.deepEqual(fixture.text_lines(), []);
});

test('MARKCNG：苦痛刻印 Lv3 取得（TFLAG:22 == 3）触发并写 CFLAG:297', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('tflag:22', 3);
  });
  await markcng_k0(fixture);
  assert.match(fixture.text_lines()[0], /痛/);
  assert.equal(fixture.store.get('cflag:31:297'), 1, '记录苦痛刻印');
});

test('MARKCNG：CFLAG:297 已置位时不重复出声', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('tflag:22', 3);
    f.store.set('cflag:31:297', 1);
  });
  await markcng_k0(fixture);
  assert.deepEqual(fixture.text_lines(), []);
});

test('MARKCNG：快乐刻印取得（TFLAG:23）触发并写 CFLAG:298', async () => {
  const fixture = await setup_k0((f) => f.store.set('tflag:23', 3));
  await markcng_k0(fixture);
  assert.match(fixture.text_lines()[0], /好爽/);
  assert.equal(fixture.store.get('cflag:31:298'), 1);
});

test('MARKCNG：屈服刻印取得（TFLAG:24）触发并写 CFLAG:299', async () => {
  const fixture = await setup_k0((f) => f.store.set('tflag:24', 3));
  await markcng_k0(fixture);
  assert.match(fixture.text_lines()[0], /反抗/);
  assert.equal(fixture.store.get('cflag:31:299'), 1);
});

test('MARKCNG：反抗刻印取得（TFLAG:21）触发并写 CFLAG:300', async () => {
  const fixture = await setup_k0((f) => f.store.set('tflag:21', 3));
  await markcng_k0(fixture);
  assert.match(fixture.text_lines()[0], /为什么/);
  assert.equal(fixture.store.get('cflag:31:300'), 1);
});

test('MARKCNG：总开关 FLAG:7 <= 0 静默', async () => {
  const fixture = await setup_k0((f) => f.store.set('flag:7', 0));
  fixture.store.set('tflag:22', 3);
  await markcng_k0(fixture);
  assert.deepEqual(fixture.text_lines(), []);
});

test('MARKCNG：助手调教跳过', async () => {
  const fixture = await setup_k0((f) => f.store.set('tflag:22', 3));
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.assi = 1;
  era_flag.assiplay = 1;
  await markcng_k0(fixture);
  assert.deepEqual(fixture.text_lines(), []);
});

// —— DUNGEON_RYOUZYOKU_K0 / AFTER：迷宫凌辱前后口上 ——

test('DUNGEON_RYOUZYOKU：处女（TALENT:0）按素质分档出声', async () => {
  const fixture = await setup_k0((f) => f.store.set('talent:31:0', 1));
  const { ryouzyoku_kojo_family } = fixture.load_module(
    'kojo/kojo-dungeon-ravish',
  );
  await ryouzyoku_kojo_family.call(0, { args: [] });
  assert.match(fixture.text_lines()[0], /第一次/);
});

test('DUNGEON_RYOUZYOKU：非处女 + 淫乱（TALENT:76）分档出声', async () => {
  const fixture = await setup_k0((f) => f.store.set('talent:31:76', 1));
  const { ryouzyoku_kojo_family } = fixture.load_module(
    'kojo/kojo-dungeon-ravish',
  );
  await ryouzyoku_kojo_family.call(0, { args: [] });
  assert.match(fixture.text_lines()[0], /你打算怎么办/);
});

test('DUNGEON_RYOUZYOKU_AFTER：处女 + EXP:0 高 → 追加台词', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('talent:31:0', 1);
    f.store.set('exp:31:0', 30);
  });
  const { ryouzyoku_after_kojo_family } = fixture.load_module(
    'kojo/kojo-dungeon-ravish',
  );
  await ryouzyoku_after_kojo_family.call(0, { args: [] });
  assert.match(fixture.text_lines()[0], /太好了/);
});

test('DUNGEON_RYOUZYOKU_AFTER：非处女 + EXP:1 > 20 → 肛门崩坏', async () => {
  const fixture = await setup_k0((f) => f.store.set('exp:31:1', 30));
  const { ryouzyoku_after_kojo_family } = fixture.load_module(
    'kojo/kojo-dungeon-ravish',
  );
  await ryouzyoku_after_kojo_family.call(0, { args: [] });
  assert.match(fixture.text_lines()[0], /对不起/);
  assert.ok(
    fixture.text_lines().some((l) => l.includes('肛门崩坏')),
    '应含肛门崩坏台词',
  );
});

// —— GOHOUBI_REQUEST / AFTER / OSIOKI：奖赏与惩罚口上 ——

test('GOHOUBI_REQUEST：CFLAG:504==0 奖金请求', async () => {
  const fixture = await setup_k0();
  const { gohoubi_request_koujo } = fixture.load_module(
    'kojo/kojo-dungeon-after',
  );
  await gohoubi_request_koujo(31);
  assert.match(fixture.text_lines()[0], /奖金/);
});

test('GOHOUBI_REQUEST：CFLAG:504==1 与犬做爱请求', async () => {
  const fixture = await setup_k0((f) => f.store.set('cflag:31:504', 1));
  const { gohoubi_request_koujo } = fixture.load_module(
    'kojo/kojo-dungeon-after',
  );
  await gohoubi_request_koujo(31);
  assert.ok(
    fixture.text_lines().some((l) => /犬/.test(l)),
    '应含与犬做爱请求',
  );
});

test('GOHOUBI_AFTER：choice==0 无特别', async () => {
  const fixture = await setup_k0();
  const { gohoubi_after_koujo } = fixture.load_module(
    'kojo/kojo-dungeon-after',
  );
  await gohoubi_after_koujo(31, 0);
  assert.match(fixture.text_lines()[0], /没什么/);
});

test('GOHOUBI_AFTER：choice==2 && CFLAG:504==0 买药台词', async () => {
  const fixture = await setup_k0();
  const { gohoubi_after_koujo } = fixture.load_module(
    'kojo/kojo-dungeon-after',
  );
  await gohoubi_after_koujo(31, 2);
  assert.match(fixture.text_lines()[0], /治疗薬/);
});

test('OSIOKI：choice==0 宽大处理', async () => {
  const fixture = await setup_k0();
  const { osioski_koujo } = fixture.load_module('kojo/kojo-dungeon-after');
  await osioski_koujo(31, 0);
  assert.match(fixture.text_lines()[0], /宽大处理/);
});

test('OSIOKI：choice==1 && ABL:21 >= 3 快感台词', async () => {
  const fixture = await setup_k0((f) => f.store.set('abl:31:21', 3));
  const { osioski_koujo } = fixture.load_module('kojo/kojo-dungeon-after');
  await osioski_koujo(31, 1);
  assert.match(fixture.text_lines()[0], /哔哩哔哩/);
});

test('DUNGEON_RYOUZYOKU：处女 + 献身（TALENT:21）→ 好吧、尽管来吧', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('talent:31:0', 1);
    f.store.set('talent:31:21', 1);
  });
  const { ryouzyoku_kojo_family } = fixture.load_module(
    'kojo/kojo-dungeon-ravish',
  );
  await ryouzyoku_kojo_family.call(0, { args: [] });
  assert.ok(
    fixture.text_lines().some((l) => /好吧、尽管来吧/.test(l)),
    '处女 + 献身应输出投降台词',
  );
});

// —— BENKI / VICTORY / ATTACK / GOBI / ENTERENEMY 口上 ——

test('BENKI_KOUJO：FLAG:62=0 + FLAG:63=1 → 施舍工作台词', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('flag:62', 0);
    f.store.set('flag:63', 1);
  });
  const { benki_koujo } = fixture.load_module('kojo/kojo-system');
  await benki_koujo(31);
  assert.ok(
    fixture.text_lines().some((l) => /施舍/.test(l)),
    '应含施舍台词',
  );
});

test('VICTORY：素质分档 + 体力比判定', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('base:31:0', 200);
    f.store.set('maxbase:31:0', 500); // 40% < 50%
  });
  const { dungeon_victory_koujo } = fixture.load_module('kojo/kojo-system');
  await dungeon_victory_koujo(31);
  assert.match(fixture.text_lines()[0], /爱能拯救世界/);
});

test('ATTACK：CFLAG:1==2 + 强气素质 → 爱的火焰', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('cflag:31:1', 2);
    f.store.set('talent:31:11', 1);
    f.store.set('talent:31:275', 1);
  });
  const { dungeon_attack_koujo } = fixture.load_module('kojo/kojo-system');
  await dungeon_attack_koujo(31);
  assert.ok(
    fixture.text_lines().some((l) => /爱的火焰/.test(l)),
    '强气+275 应输出爱的火焰',
  );
});

test('GOBI：arg_0=1 → ♪ 语尾', async () => {
  const fixture = await setup_k0();
  const { gobi_koujo } = fixture.load_module('kojo/kojo-system');
  await gobi_koujo(1);
  assert.ok(fixture.text_lines().some((l) => l.includes('♪')));
});

test('ENTERENEMY：献身（TALENT:21）→ 我是不会输的', async () => {
  const fixture = await setup_k0((f) => f.store.set('talent:31:21', 1));
  const { enterenemy_koujo } = fixture.load_module('kojo/kojo-system');
  await enterenemy_koujo(31);
  assert.match(fixture.text_lines()[0], /不会输/);
});
