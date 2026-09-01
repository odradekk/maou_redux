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

  // SELECTCOM == 45：不跳过——爱抚外分支落占位行
  const speaking = await setup_k0((f) => {
    f.store.set('tequip:31:45', 1);
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 45;
  });
  await speak_k0(speaking);
  assert.ok(
    speaking.text_lines().some((line) => line.includes('@KOJO_MESSAGE_COM_0')),
    '口塞中的 45 指令走到爱抚外分支的占位行',
  );
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
    era_flag.selectcom = 36; // 骑乘位肛交——COM35 落地后改用尚未填的指令
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '（指令 36 的口上尚未移植，此处为占位——原作 @KOJO_MESSAGE_COM_0，随各自指令票，见 docs/stub-registry.md。）',
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
