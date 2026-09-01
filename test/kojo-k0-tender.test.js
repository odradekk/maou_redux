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
    era_flag.selectcom = 11; // 壶虫——COM10 落地后改用尚未填的指令
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '（指令 11 的口上尚未移植，此处为占位——原作 @KOJO_MESSAGE_COM_0，随各自指令票，见 docs/stub-registry.md。）',
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
