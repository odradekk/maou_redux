/**
 * ere/kojo/kojo-k3-noble.js 的行为测试（issue #46 的黄金样本切片）。
 *
 * 缝 = test/helpers/era-fixture.js。世界底座：温妮（id 31，随机生成的
 * 高貴性格角色——实机复现不了，测试播种素质 163）。覆盖：
 *   - 首次与二次以后走不同分支（验收项「此行为有测试」）；
 *   - CFLAG:301 状态机的逐阶段推进（2xx/3xx/4xx 三条链 + 各自的随机尾）；
 *   - 3xx 支的附加门槛 MARK:1 == 3（:1021——Lv2 屈服而无快乐刻印时
 *     3xx 与 2xx 两支皆不命中、一句不出；验收变异补）；
 *   - MARK:1/2 刻印分档、TALENT:76/85 素质分支；
 *   - 随机分支可控可重复（rand 定值序注入，RAND:3 → RAND:2 定序）；
 *   - 三种插值（角色名 %SAVESTR% / 自称 %SELF_CALL% / 心形 %UNICODE%）；
 *   - **黄金样本 :1097 逐字比对**——期望值运行时读自 target/emuera.log:26
 *     与 ERB 原文两处（比对能有的最强形式）；
 *   - 七道跳过判定（含 K3 特有：死斗场最先、兽奸岔 DOG_KOJO_3）；
 *   - BENKI_KOUJO 真身（常识改写支）；
 *   - 存根清单核对（docs/stub-registry.md）。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

// 黄金样本的那一行（emuera.log:26——运行时读取，与 #45 结算块同款做法）
const GOLDEN_LOG_LINE = (() => {
  const log = fs.readFileSync(
    path.resolve(__dirname, '..', 'target', 'emuera.log'),
    'utf8',
  );
  return log.split(/\r?\n/)[25];
})();

// ERB 原文 :1097（第二重期望源：%SAVESTR:TARGET% 按样本角色名代换）
const GOLDEN_ERB_LINE = (() => {
  const erb = fs.readFileSync(
    path.resolve(__dirname, '..', 'target', 'ERB', '口上', 'EVENT_K3_高貴.ERB'),
    'utf8',
  );
  const raw = erb.split(/\r?\n/)[1096];
  return raw
    .replace(/^\s*PRINTFORMW\s*/, '')
    .replace(/%SAVESTR:TARGET%/g, '温妮');
})();

// 世界底座：温妮（高貴 163 → GET_KOJO_NUM 103）入列调教
async function setup_k3(seed) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  fixture.era.beginTrain(0, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = 0;
  fixture.store.set('talent:31:163', 1); // 高貴 → GET_KOJO_NUM = 103
  fixture.store.set('flag:103', 1); // K3 存在标志
  fixture.store.set('flag:7', 2); // 总开关默认
  if (seed) {
    seed(fixture);
  }
  fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k3-noble');
  return fixture;
}

// 经分发族调用（TRYCALLFORM KOJO_MESSAGE_COM_3 的等价物）
async function speak_k3(fixture, rand) {
  const { kojo_message_com_family } = fixture.load_module('kojo/kojo-system');
  return kojo_message_com_family.call(3, { args: [rand] });
}

// RAND:N 定值序：draws 依次被消费（RAND:3 先、RAND:2 后），越界取模
const seq_rand =
  (...draws) =>
  (n) => {
    const value = draws.shift() ?? 0;
    return value % n;
  };

test('首次（CFLAG:301 == 0 且 MARK:2 < 2）：一句拒绝 + 推进到 1', async () => {
  const fixture = await setup_k3();
  await speak_k3(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), [
    '「不，不要触摸…呃呜…呜呃呜~~~………」',
  ]);
  assert.equal(fixture.store.get('cflag:31:301'), 1);
});

test('首次的刻印分档（MARK:2 >= 2）：温柔台词', async () => {
  const fixture = await setup_k3((f) => f.store.set('mark:31:2', 2));
  await speak_k3(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), [
    '「嗯呼嗯~…啊~…呃~…请更加温柔…一…点……哈啊嗯~！」',
  ]);
});

test('二次以后それ以外支逐阶段推进：201 → 202 → 203 → 随机尾（状态不再动）', async () => {
  // CFLAG:301 = 1（首次已推进）：それ以外第一阶段（<= 200 档）
  const first = await setup_k3((f) => f.store.set('cflag:31:301', 1));
  await speak_k3(first, seq_rand(0, 0));
  assert.deepEqual(first.text_lines(), [
    '「感觉真恶心…不要在…这样…触，触碰了…！」',
  ]);
  assert.equal(first.store.get('cflag:31:301'), 201);

  const second = await setup_k3((f) => f.store.set('cflag:31:301', 201));
  await speak_k3(second, seq_rand(0, 0));
  assert.equal(second.store.get('cflag:31:301'), 202);
  assert.equal(second.text_lines().length, 4); // 分档一句 + 三行叙事

  const third = await setup_k3((f) => f.store.set('cflag:31:301', 202));
  await speak_k3(third, seq_rand(0, 0));
  assert.equal(third.store.get('cflag:31:301'), 203);

  // 203 起进随机尾：不再推进（RAND:3 == 0 支）
  const tail = await setup_k3((f) => f.store.set('cflag:31:301', 203));
  await speak_k3(tail, seq_rand(0, 0));
  assert.deepEqual(tail.text_lines(), [
    '「呀…啊、不要啊……请、请快住手，停下来吧…」',
  ]);
  assert.equal(tail.store.get('cflag:31:301'), 203);
});

test('黄金样本 :1097 逐字比对：RAND:3 != 0 且 RAND:2 == 0，双期望源一致', async () => {
  // 样本角色状态（issue #45 反推）：MARK:2 <= 1、MARK:1 != 3、无淫乱/爱慕，
  // CFLAG:301 已过 203（样本是长期调教的尾段）——落在随机尾的中支
  const fixture = await setup_k3((f) => f.store.set('cflag:31:301', 203));
  await speak_k3(fixture, seq_rand(1, 0)); // RAND:3 → 1（≠0）、RAND:2 → 0
  assert.deepEqual(fixture.text_lines(), [GOLDEN_LOG_LINE]);
  assert.equal(fixture.text_lines()[0], GOLDEN_ERB_LINE);
  // 随机尾不推进状态
  assert.equal(fixture.store.get('cflag:31:301'), 203);
});

test('随机尾的第三支（RAND:3 != 0 且 RAND:2 != 0）与可重复性', async () => {
  for (let i = 0; i < 2; i += 1) {
    const fixture = await setup_k3((f) => f.store.set('cflag:31:301', 203));
    await speak_k3(fixture, seq_rand(2, 1));
    assert.deepEqual(fixture.text_lines(), [
      '「嗯~、嗯~嗯~……明明…说了、快住手了……啊嗯~……」',
    ]);
  }
});

test('淫乱分支（TALENT:76）三支随机：插值与 ♡/♡♡♡ 逐字', async () => {
  // RAND:3 == 0 支：自称（未设定 → 我）与心形 ×1/×3
  const a = await setup_k3((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:301', 1);
  });
  await speak_k3(a, seq_rand(0, 0));
  assert.deepEqual(a.text_lines(), [
    '「呜哈嗯啊~…主人~…请更加摩擦那里吧~♡」',
    '温妮张开自己的双腿，诱导着你的手………',
    '「我的身体是…被下流的抚摸了的话…就会热得要燃烧起来了♡♡♡」',
    '温妮淫乱地蠕动着身体、接受着你的爱抚………',
  ]);
  assert.equal(a.store.get('cflag:31:301'), 600);

  // RAND:3 != 0 且 RAND:2 == 0 支：含 PRINTFORML 行（不等待）与 %UNICODE *1% 后的半角空格
  const b = await setup_k3((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:301', 1);
  });
  await speak_k3(b, seq_rand(1, 0));
  assert.deepEqual(b.text_lines(), [
    '「啊、啊啊~……主人~…这里、这里~……请用、主人的手指来、好好地欺负一下~……」',
    '你开始爱抚后、温妮立马将双脚大幅度地张开了、如同为了让股间突出来一样挺起了腰。',
    '慢慢将手靠近蜜穴后、期待让温妮的腰部颤抖了起来、呼吸变得凌乱了。',
    '「啊哈啊嗯~…♡ 好棒……果然,主人的手指，真的好美妙啊~♡♡♡」',
  ]);
});

test('自称插值：CSTR:60 已定时 %SELF_CALL% 与 %SELF_CALL_FIRST% 取首字', async () => {
  const fixture = await setup_k3((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:301', 1);
    f.store.set('cstr:31:60', 'わたくし'); // 高貴的默认自称（K3 头注：一人称＝わたくし）
  });
  await speak_k3(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), [
    '「呜哈嗯啊~…主人~…请更加摩擦那里吧~♡」',
    '温妮张开自己的双腿，诱导着你的手………',
    '「わたくし的身体是…被下流的抚摸了的话…就会热得要燃烧起来了♡♡♡」',
    '温妮淫乱地蠕动着身体、接受着你的爱抚………',
  ]);

  // %SELF_CALL_FIRST%：屈服Lv3 链头（MARK:1 == 3 时 :982 以首字起句）
  const first = await setup_k3((f) => {
    f.store.set('mark:31:2', 3);
    f.store.set('mark:31:1', 3);
    f.store.set('cflag:31:301', 1);
    f.store.set('cstr:31:60', 'わたくし');
  });
  await speak_k3(first, seq_rand(0, 0));
  assert.ok(
    first.text_lines()[0].startsWith('「啊~…わ'),
    `SELF_CALL_FIRST 取首字：${first.text_lines()[0]}`,
  );
});

test('爱慕分支（TALENT:85）：%NAME:MASTER% 插值与推进到 500', async () => {
  const fixture = await setup_k3((f) => {
    f.store.set('talent:31:85', 1);
    f.store.set('cflag:31:301', 1);
  });
  await speak_k3(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), [
    '「啊~…嗯~…你太…太过温柔了…感觉有点害怕呀~………♪」',
    '温妮每当被你触摸后都会发出娇喘………', // %NAME:MASTER%（Chara0 名前「你」）
    '「啊啊…喜欢…喜欢的说…被做了这样的事情…我…已经~…♪」',
    '温妮的娇喘慢慢变成越来越急促的喘息声………',
  ]);
  assert.equal(fixture.store.get('cflag:31:301'), 500);
});

test('屈服Lv3 链（4xx）：快乐刻印 MARK:1 分档与 401/402/403 逐格推进', async () => {
  // 400 档的两支
  const with_mark1 = await setup_k3((f) => {
    f.store.set('mark:31:2', 3);
    f.store.set('mark:31:1', 3);
    f.store.set('cflag:31:301', 1);
  });
  await speak_k3(with_mark1, seq_rand(0, 0));
  assert.equal(with_mark1.text_lines().length, 4);
  assert.equal(with_mark1.store.get('cflag:31:301'), 401);

  const no_mark1 = await setup_k3((f) => {
    f.store.set('mark:31:2', 3);
    f.store.set('cflag:31:301', 1);
  });
  await speak_k3(no_mark1, seq_rand(0, 0));
  assert.deepEqual(no_mark1.text_lines(), [
    '「哈啊…啊~…嗯~…啊呃嗯~…为、为什么…会那么舒服的…呢……啊~♪」',
  ]);
  assert.equal(no_mark1.store.get('cflag:31:301'), 401);

  // 401 / 402 档推进，403 起随机尾
  const s401 = await setup_k3((f) => {
    f.store.set('mark:31:2', 3);
    f.store.set('cflag:31:301', 401);
  });
  await speak_k3(s401, seq_rand(0, 0));
  assert.equal(s401.store.get('cflag:31:301'), 402);

  const s402 = await setup_k3((f) => {
    f.store.set('mark:31:2', 3);
    f.store.set('cflag:31:301', 402);
  });
  await speak_k3(s402, seq_rand(0, 0));
  assert.equal(s402.store.get('cflag:31:301'), 403);
  assert.equal(s402.text_lines().length, 4);

  const s403 = await setup_k3((f) => {
    f.store.set('mark:31:2', 3);
    f.store.set('cflag:31:301', 403);
  });
  await speak_k3(s403, seq_rand(1, 0));
  assert.equal(s403.store.get('cflag:31:301'), 403); // 随机尾不推进
});

test('屈服Lv2＆快乐Lv3 链（3xx）：301/302/303 逐格推进后随机尾', async () => {
  const first = await setup_k3((f) => {
    f.store.set('mark:31:2', 2);
    f.store.set('mark:31:1', 3);
    f.store.set('cflag:31:301', 1);
  });
  await speak_k3(first, seq_rand(0, 0));
  assert.equal(first.store.get('cflag:31:301'), 301);
  assert.equal(first.text_lines().length, 4);

  const second = await setup_k3((f) => {
    f.store.set('mark:31:2', 2);
    f.store.set('mark:31:1', 3);
    f.store.set('cflag:31:301', 301);
  });
  await speak_k3(second, seq_rand(0, 0));
  assert.equal(second.store.get('cflag:31:301'), 302);

  const third = await setup_k3((f) => {
    f.store.set('mark:31:2', 2);
    f.store.set('mark:31:1', 3);
    f.store.set('cflag:31:301', 302);
  });
  await speak_k3(third, seq_rand(0, 0));
  assert.equal(third.store.get('cflag:31:301'), 303);

  const tail = await setup_k3((f) => {
    f.store.set('mark:31:2', 2);
    f.store.set('mark:31:1', 3);
    f.store.set('cflag:31:301', 303);
  });
  await speak_k3(tail, seq_rand(1, 0));
  assert.deepEqual(tail.text_lines(), [
    '「这~、这样~…嗯~、明明被，当成玩具来…呼嗯~、呜啊啊~……！」',
  ]);
  assert.equal(tail.store.get('cflag:31:301'), 303);
});

test('3xx 支的附加门槛 MARK:1 == 3：Lv2 屈服而无快乐刻印时两支皆不命中', async () => {
  // :1021 ELSEIF MARK:2 == 2 && MARK:1 == 3 —— 删掉 MARK:1 臂会让本状态
  // 误入 3xx（验收变异实测的误报通过位）：MARK:2 == 2 且 MARK:1 != 3 时，
  // 3xx（要 MARK:1 == 3）与 2xx（要 MARK:2 <= 1）都不命中，原作一句不出
  const fixture = await setup_k3((f) => {
    f.store.set('mark:31:2', 2);
    f.store.set('cflag:31:301', 1); // mark:31:1 保持 0（≠ 3）
  });
  await speak_k3(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), []);
  assert.equal(fixture.store.get('cflag:31:301'), 1); // 状态不动
});

test('阈值闸：FLAG:7 == 1 时阶段耗尽不出声、== 2 时旁路重出声', async () => {
  // FLAG:7 == 1：素质未落、各刻印档不匹配、それ以外上限（600 > 1）已过
  // → 全链静默
  const quiet = await setup_k3((f) => {
    f.store.set('cflag:31:301', 600); // 淫乱阶段已耗尽（> 599）
    f.store.set('flag:7', 1);
  });
  await speak_k3(quiet, seq_rand(0, 0));
  assert.deepEqual(quiet.text_lines(), []);

  // 同状态 FLAG:7 == 2（默认）：それ以外上限旁路 → 落进它的随机尾
  const repeat = await setup_k3((f) => f.store.set('cflag:31:301', 600));
  await speak_k3(repeat, seq_rand(1, 0));
  assert.equal(repeat.text_lines().length, 1);
  assert.equal(repeat.store.get('cflag:31:301'), 600); // 随机尾不推进
});

// —— 七道跳过判定（:888-912，K3 顺序：死斗场最先） ——

test('死斗场（TEQUIP:55）最先：岔进 COLOSSEUM_KOJO_3 真台词', async () => {
  const fixture = await setup_k3((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 55;
    f.store.set('tequip:31:55', 1);
    f.store.set('base:31:1', 100);
    f.store.set('tflag:899', 1); // 即使后续守卫也会拦，先到先得
  });
  await speak_k3(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), [
    '温妮被角斗场的热气和被接下来要战斗的对手凝视着而吓得直发抖……',
  ]);
});

test('兽奸（TEQUIP:89）：K3 岔进 DOG_KOJO_3 真台词', async () => {
  const fixture = await setup_k3((f) => f.store.set('tequip:31:89', 1));
  await speak_k3(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), [
    '「不……不要啊！才…才不要做这种事情！！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:301'), 1, '兽奸爱抚首次推进到 1');
});

test('助手调教：静默跳过', async () => {
  const fixture = await setup_k3((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.assi = 31;
    era_flag.assiplay = 1;
  });
  await speak_k3(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), [], '助手调教：跳过');
});

test('口塞：静默跳过', async () => {
  const fixture = await setup_k3((f) => f.store.set('tequip:31:45', 1));
  await speak_k3(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), [], '口塞：跳过');
});

test('失神：静默跳过', async () => {
  const fixture = await setup_k3((f) => f.store.set('tflag:899', 1));
  await speak_k3(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), [], '失神：跳过');
});

test('崩坏：静默跳过', async () => {
  const fixture = await setup_k3((f) => f.store.set('talent:31:9', 1));
  await speak_k3(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), [], '崩坏：跳过');
});

test('触手：静默跳过', async () => {
  const fixture = await setup_k3((f) => f.store.set('tequip:31:90', 1));
  await speak_k3(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), [], '触手：跳过');
});

test('舔阴首次（CFLAG:302 == 0 且非处女）：一句拒绝 + 推进到 1', async () => {
  const fixture = await setup_k3((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 1;
  });
  await speak_k3(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…怎么会…舌头…哈呜…啊~…啊呜~~~~！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:302'), 1);
});

test('舔阴首次处女分档（TALENT:0）：脏的台词 + 推进到 1', async () => {
  const fixture = await setup_k3((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 1;
    f.store.set('talent:31:0', 1);
  });
  await speak_k3(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), [
    '「嗯啊啊~！那、那里才不是可以舔的地方…哈呜…很，很脏的…哈呜！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:302'), 1);
});

test('舔阴二次以后：淫乱 / 爱慕 / 屈服Lv3 / それ以外 四支与状态推进', async () => {
  const lewd = await setup_k3((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 1;
    f.store.set('cflag:31:302', 1);
    f.store.set('talent:31:76', 1);
  });
  await speak_k3(lewd, seq_rand(0, 0));
  assert.deepEqual(lewd.text_lines(), [
    '「哈啊啊…更加地…更加地...将小穴弄得更加黏糊糊地吧♡…更加地欺负小穴吧哈呜~~♡♡♡」',
    '温妮将你的头按住晃动着腰。',
    '「请更加地…欺负温妮的小穴吧~…将变态温妮的小穴弄得乱七八糟的吧啊啊~！♡♡♡」',
  ]);
  assert.equal(lewd.store.get('cflag:31:302'), 5);

  const love = await setup_k3((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 1;
    f.store.set('cflag:31:302', 1);
    f.store.set('talent:31:85', 1);
  });
  await speak_k3(love, seq_rand(0, 0));
  assert.deepEqual(love.text_lines(), [
    '「啊啊~…那里明明…那么脏来的啊♪………不行…的啊…那么地…啊嗯~♪」',
    '温妮哪怕耳朵红透了也好，也继续接受着你的爱抚。',
    '「嗯呜啊~…哼啊啊啊！~…腰要…腰要飘起来了~♡」',
  ]);
  assert.equal(love.store.get('cflag:31:302'), 4);

  const yield3 = await setup_k3((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 1;
    f.store.set('cflag:31:302', 1);
    f.store.set('mark:31:2', 3);
  });
  await speak_k3(yield3, seq_rand(0, 0));
  assert.deepEqual(yield3.text_lines(), [
    '「呜啊~…啊~…呜呼啊~…更加地…温柔地爱抚吧…哼唔啊~…啊~啊啊~♪」',
  ]);
  assert.equal(yield3.store.get('cflag:31:302'), 3);

  const other = await setup_k3((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 1;
    f.store.set('cflag:31:302', 1);
  });
  await speak_k3(other, seq_rand(0, 0));
  assert.deepEqual(other.text_lines(), [
    '「不、不要…请停下来吧！哪怕舔这种地方也好…哼呜啊啊啊~！」',
  ]);
  assert.equal(other.store.get('cflag:31:302'), 2);
});

test('肛门爱抚首次（CFLAG:303 == 0）：一句拒绝 + 推进到 1', async () => {
  const fixture = await setup_k3((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 2;
  });
  await speak_k3(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), [
    '「呜，呜哇啊！？那、那里是不行的！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:303'), 1);
});

test('肛门爱抚二次以后：淫乱润滑分档 / 爱慕润滑 / それ以外', async () => {
  const lewd_wet = await setup_k3((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 2;
    f.store.set('cflag:31:303', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('palam:31:3', 500); // PALAM:3 + UP:3 >= PALAMLV:2
  });
  await speak_k3(lewd_wet, seq_rand(0, 0));
  assert.deepEqual(lewd_wet.text_lines(), [
    '「啊啊~♡…啊~♡…哈呜啊啊啊~♡♡♡」',
    '温妮每当被弯曲的手指来回扣着尻穴内壁时都会漏出欢喜的娇喘。',
    '「尻穴小穴♡ 更加玩弄尻穴吧~~~♡♡♡」',
  ]);
  assert.equal(lewd_wet.store.get('cflag:31:303'), 7);

  const lewd_dry = await setup_k3((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 2;
    f.store.set('cflag:31:303', 1);
    f.store.set('talent:31:76', 1);
  });
  await speak_k3(lewd_dry, seq_rand(0, 0));
  assert.deepEqual(lewd_dry.text_lines(), [
    '「嗯啊~……哈啊嗯~♡　指尖在…嗯~…在挖着…啊~♡这个嗯~~~~♡」',
    '温妮的尻穴虽然还没有完全湿润，不过手指越是抽插越能进入温妮的尻穴的深处。',
    '「恩呜呜~…更加地…♡　进到里面去来回抽插吧♡♡♡」',
  ]);
  assert.equal(lewd_dry.store.get('cflag:31:303'), 6);

  const love_wet = await setup_k3((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 2;
    f.store.set('cflag:31:303', 1);
    f.store.set('talent:31:85', 1);
    f.store.set('palam:31:3', 500);
  });
  await speak_k3(love_wet, seq_rand(0, 0));
  assert.deepEqual(love_wet.text_lines(), [
    '「啊~哈嗯~啊啊~…这、这个部位…才不是用来塞进什么东西的地方来的呀………」',
    '虽然嘴上说着这样的话，但是温妮一点都不讨厌地接受着你的手指。',
    '「哈嗯~♪……啊·~…不是…这个…才不是对你大人的手指感到舒…哼啊啊~…啊啊~…哈啊嗯~♪」',
  ]);
  assert.equal(love_wet.store.get('cflag:31:303'), 5);

  const other = await setup_k3((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 2;
    f.store.set('cflag:31:303', 1);
    f.store.set('cflag:31:223', 2); // 原作读 223，已推进则 FLAG:7==1 时不出声
    f.store.set('flag:7', 1);
  });
  await speak_k3(other, seq_rand(0, 0));
  assert.deepEqual(
    other.text_lines(),
    [],
    '肛门爱抚それ以外读 CFLAG:223：已推进且 FLAG:7==1 时不出声',
  );
  assert.equal(other.store.get('cflag:31:303'), 1);
});

test('自慰首次（CFLAG:304 == 0）：屈辱一句 + 推进到 1', async () => {
  const fixture = await setup_k3((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 3;
  });
  await speak_k3(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), [
    '「居然…不能不做这样的事情…这是……何等的…屈辱啊…」',
  ]);
  assert.equal(fixture.store.get('cflag:31:304'), 1);
});

test('自慰二次以后：淫乱处女 / 淫乱自慰中毒Lv3 / 爱慕处女 / それ以外', async () => {
  const lewd_virgin = await setup_k3((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 3;
    f.store.set('cflag:31:304', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:0', 1);
  });
  await speak_k3(lewd_virgin, seq_rand(0, 0));
  assert.deepEqual(lewd_virgin.text_lines(), [
    '「啊啊♡　您真是的…真的是恶魔来的呀…♡」',
    '「我的身心…明明....都变得…如此地淫乱了…啊啊~♡也不拿走我重要的东西什么的~♡」',
    '温妮将腰抬高，向你诱惑而用手将蜜穴给张开。',
    '「啊啊~…明明…在这里有处女膜来的~♡」',
    '「拜托了♡请将我的…淫乱小穴…用你大人的大鸡巴来贯穿了吧~~~♡♡♡♡♡」',
    '温妮一边将腰部左右地晃动着一边在你的面前自慰着………',
  ]);
  assert.equal(lewd_virgin.store.get('cflag:31:304'), 9, '淫乱处女推进到 9');

  const lewd_addict = await setup_k3((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 3;
    f.store.set('cflag:31:304', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:31', 3);
  });
  await speak_k3(lewd_addict, seq_rand(0, 0));
  assert.deepEqual(
    lewd_addict.text_lines(),
    [
      '「啊啊…主人…请看一下吧~~~…♡」',
      '「小穴的里面♡要伸手指进去了哦~~~……♡」',
      '「嗯哈啊啊~…不行了~…小穴自慰停不下来了♡♡♡」',
    ],
    '淫乱自慰中毒Lv3推进到 8',
  );
  assert.equal(
    lewd_addict.store.get('cflag:31:304'),
    8,
    '淫乱自慰中毒Lv3推进到 8',
  );

  const love_virgin = await setup_k3((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 3;
    f.store.set('cflag:31:304', 1);
    f.store.set('talent:31:85', 1);
    f.store.set('talent:31:0', 1);
  });
  await speak_k3(love_virgin, seq_rand(0, 0));
  assert.deepEqual(love_virgin.text_lines(), [
    '「啊啊~…呜哈~…啊…♡」',
    '温妮每次轻轻地抚摸自己的蜜穴后就会大声地呻吟一下。',
    '「如果大人您再不做的话~…温妮就要自己弄破了噢~…♡」',
    '温妮说完扑哧一笑、将手指塞向了深处。',
    '「哈嗯~♡…唔哼哼~、只是开玩笑的噢~………啊嗯~~~♡」',
  ]);
  assert.equal(love_virgin.store.get('cflag:31:304'), 6, '爱慕处女推进到 6');

  const other = await setup_k3((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 3;
    f.store.set('cflag:31:304', 1);
  });
  await speak_k3(other, seq_rand(0, 0));
  assert.deepEqual(other.text_lines(), [
    '「呃呜…呜~…啊~…这样的一点也…哼呜~…啊~…哈呜~！」',
  ]);
  assert.equal(other.store.get('cflag:31:304'), 2, 'それ以外推进到 2');
});

test('胸爱抚首次（CFLAG:306 == 0）：疼的一句 + 推进到 1', async () => {
  const fixture = await setup_k3((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 5;
  });
  await speak_k3(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), ['「嗯呜…不要…弄得那么疼………」']);
  assert.equal(fixture.store.get('cflag:31:306'), 1);
});

test('胸爱抚二次以后：淫乱 / 爱慕 / B感覚Lv3 / それ以外', async () => {
  const lewd = await setup_k3((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 5;
    f.store.set('cflag:31:306', 1);
    f.store.set('talent:31:76', 1);
  });
  await speak_k3(lewd, seq_rand(0, 0));
  assert.deepEqual(lewd.text_lines(), [
    '「啊哈啊啊~…要融化掉了~♡」',
    '「主人，请更加地…随心所欲地做吧~…啊~…啊啊~♡」',
  ]);
  assert.equal(lewd.store.get('cflag:31:306'), 5, '胸爱抚淫乱推进到 5');

  const love = await setup_k3((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 5;
    f.store.set('cflag:31:306', 1);
    f.store.set('talent:31:85', 1);
  });
  await speak_k3(love, seq_rand(0, 0));
  assert.deepEqual(love.text_lines(), [
    '「啊嗯~…可以的哦…更加用力地揉…也没有关系的噢…啊~哈啊嗯啊啊啊~♪」',
    '「嗯呜~♪这样的真的可以哦~…啊~…是的噢…更加…用力地可以的噢♡」',
  ]);
  assert.equal(love.store.get('cflag:31:306'), 4, '胸爱抚爱慕推进到 4');

  const b3 = await setup_k3((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 5;
    f.store.set('cflag:31:306', 1);
    f.store.set('abl:31:1', 3);
  });
  await speak_k3(b3, seq_rand(0, 0));
  assert.deepEqual(
    b3.text_lines(),
    [
      '「啊啊~…胸部…胸部居然会那么有感觉什么的…」',
      '「哈嗯~…请，请不要欺负胸部…啊~啊啊~！」',
    ],
    '胸爱抚B感覚Lv3推进到 3',
  );
  assert.equal(b3.store.get('cflag:31:306'), 3, '胸爱抚B感覚Lv3推进到 3');

  const other = await setup_k3((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 5;
    f.store.set('cflag:31:306', 1);
  });
  await speak_k3(other, seq_rand(0, 0));
  assert.deepEqual(other.text_lines(), [
    '「不…不要…唔…不要再…欺负胸部…啊~…啊啊~！」',
  ]);
  assert.equal(other.store.get('cflag:31:306'), 2, '胸爱抚それ以外推进到 2');
});

test('接吻调教首次（CFLAG:307 == 0 且非 TFLAG:13）：才不算什么 + 推进到 1', async () => {
  const fixture = await setup_k3((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 6;
  });
  await speak_k3(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), [
    '「嗯呜~…这，这样的…才不算什么呢！…！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:307'), 1);
});

test('接吻二次以后：淫乱 / 爱慕 / 顺从Lv2 / それ以外', async () => {
  const lewd = await setup_k3((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 6;
    f.store.set('cflag:31:307', 1);
    f.store.set('talent:31:76', 1);
  });
  await speak_k3(lewd, seq_rand(0, 0));
  assert.deepEqual(lewd.text_lines(), [
    '「嗯唔…嗯啾~…嗯噗…呼啊…啊啊~…非常的舒服啊~………♡」',
    '温妮脸红得发烫，沉醉在和你的亲吻之中。',
    '「我的嘴唇…全部都是主人的东西来的…请更加的…渴求我的嘴唇吧~~♡」',
  ]);
  assert.equal(lewd.store.get('cflag:31:307'), 5, '接吻淫乱推进到 5');

  const love = await setup_k3((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 6;
    f.store.set('cflag:31:307', 1);
    f.store.set('talent:31:85', 1);
  });
  await speak_k3(love, seq_rand(0, 0));
  assert.deepEqual(love.text_lines(), [
    '「嗯~…嗯啾~…啾~…哈啊啊~…感觉脑袋里变得一片空白了呢~…♪」',
    '「啊啊啊…只是亲吻就变得那么舒服什么的………♡」',
    '温妮如同说梦话地一样喃喃自语着，可见多么地沉浸在亲吻之中………',
  ]);
  assert.equal(love.store.get('cflag:31:307'), 4, '接吻爱慕推进到 4');

  const obey = await setup_k3((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 6;
    f.store.set('cflag:31:307', 1);
    f.store.set('abl:31:10', 2);
  });
  await speak_k3(obey, seq_rand(0, 0));
  assert.deepEqual(
    obey.text_lines(),
    [
      '「好、的…亲吻…对吧…嗯~…哈啊啊…还、还要更多吗？」',
      '「真、真是没有办法呢…嗯啾…啾…啾…♪」',
    ],
    '接吻顺从Lv2推进到 3',
  );
  assert.equal(obey.store.get('cflag:31:307'), 3, '接吻顺从Lv2推进到 3');

  const other = await setup_k3((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 6;
    f.store.set('cflag:31:307', 1);
  });
  await speak_k3(other, seq_rand(0, 0));
  assert.deepEqual(other.text_lines(), ['「哈啊…哈啊…这样…这样的………」']);
  assert.equal(other.store.get('cflag:31:307'), 2, '接吻それ以外推进到 2');
});

test('自己扒开首次（SELECTCOM 7 / CFLAG:308 == 0）：非素质支 + 推进到 1', async () => {
  const fixture = await setup_k3((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 7;
  });
  await speak_k3(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), [
    '「不，不行了啊…已经不能再张开了…哈呜！…我明、明白了…会张得…更大的………」',
  ]);
  assert.equal(fixture.store.get('cflag:31:308'), 1, '自己扒开首次推进到 1');
});

test('EVENTTRAIN NORMAL：初调教 CFLAG:201 默认支 + 推进到 1', async () => {
  const fixture = await setup_k3();
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.ok(
    fixture.text_lines().some((l) => l.includes('这种事情…不可能')),
    'EVENTTRAIN 默认初调教台词',
  );
  assert.equal(fixture.store.get('cflag:31:201'), 1, '初调教推进到 1');
});

test('EVENTEND NORMAL：CFLAG:301 >= 1 钳回 1 + 调教结束台词', async () => {
  const fixture = await setup_k3((f) => {
    f.store.set('cflag:31:301', 203);
    f.store.set('mark:31:2', 0);
    f.store.set('talent:31:85', 0);
    f.store.set('talent:31:76', 0);
    f.store.set('base:31:0', 1000);
  });

  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTEND');
  assert.equal(fixture.store.get('cflag:31:301'), 1, '爱抚计数钳回 1');
  assert.ok(
    fixture.text_lines().some((l) => l.includes('终于结束了啊')),
    'EVENTEND 屈服低档结束台词',
  );
});

test('PALAMCNG：首次润滑 Lv2 非爱慕支写 CFLAG:221', async () => {
  const fixture = await setup_k3((f) => f.store.set('palam:31:3', 501));
  const { kojo_message_palamcng_family } =
    fixture.load_module('kojo/kojo-system');
  await kojo_message_palamcng_family.call(3);
  assert.deepEqual(fixture.text_lines(), [
    '「啊~…这，这个难道是…漏，漏了…啊啊…」',
    '―――第一次超过了润滑lv2了。',
  ]);
  assert.equal(fixture.store.get('cflag:31:221'), 1, '首次润滑Lv2');
});

test('BENKI_KOUJO：肉便器行动 0 常识改写真身', async () => {
  const fixture = await setup_k3((f) => {
    f.store.set('flag:62', 0);
    f.store.set('flag:63', 1);
  });
  const { benki_koujo } = fixture.load_module('kojo/kojo-system');
  await benki_koujo();
  assert.deepEqual(fixture.text_lines(), [
    '「呵呵…别那么吃惊嘛这没什么的哦♪」',
    '「『就算对象是污秽的贱民也会做最高级的侍奉』…在我家里可是『当然』的啊」',
    '「来、向我掏出那丑陋脏污的鸡巴吧♪好啦、快点嘛♡」',
  ]);
  assert.equal(
    fixture.text_lines().filter((l) => l.includes('@BENKI_KOUJO')).length,
    0,
    'K3 真身不打占位行',
  );
});

// —— 存根清单核对 ——

test('存根清单可检索：docs/stub-registry.md 收录这张票全部占位名', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('kojo/kojo-k3-noble');
  assert.deepEqual(STUBBED_CALLS, ['SELL_MATURO_K0']);
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
