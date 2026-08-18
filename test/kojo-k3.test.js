/**
 * ere/kojo/kojo-k3.js 的行为测试（issue #46 的黄金样本切片）。
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
 *   - **黄金样本 :1097 逐字对拍**——期望值运行时读自 target/emuera.log:26
 *     与 ERB 原文两处（对拍能有的最强形式）；
 *   - 七道跳过判定（含 K3 特有：死斗场最先、兽奸岔 DOG_KOJO_3）；
 *   - 存根清单对账（docs/stub-registry.md）。
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
  fixture.load_module('kojo/kojo-k3');
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

test('黄金样本 :1097 逐字对拍：RAND:3 != 0 且 RAND:2 == 0，双期望源一致', async () => {
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
  // 误入 3xx（验收变异实测的假绿位）：MARK:2 == 2 且 MARK:1 != 3 时，
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

test('死斗场（TEQUIP:55）最先：岔进 COLOSSEUM_KOJO_3 占位行', async () => {
  const fixture = await setup_k3((f) => {
    f.store.set('tequip:31:55', 1);
    f.store.set('tflag:899', 1); // 即使后续守卫也会拦，先到先得
  });
  await speak_k3(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), [
    '（死斗场专用口上尚未移植，此处为占位——原作 @COLOSSEUM_KOJO_3，随死斗场票，见 docs/stub-registry.md。）',
  ]);
});

test('兽奸（TEQUIP:89）：K3 岔进 DOG_KOJO_3 占位行', async () => {
  const fixture = await setup_k3((f) => f.store.set('tequip:31:89', 1));
  await speak_k3(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), [
    '（兽奸专用口上尚未移植，此处为占位——原作 @DOG_KOJO_3，随兽奸票，见 docs/stub-registry.md。）',
  ]);
});

test('助手调教 / 口塞 / 失神 / 崩坏 / 触手：静默跳过', async () => {
  for (const [desc, seed] of [
    [
      '助手调教',
      (f) => {
        const era_flag = f.load_module('era-utils/era-flag');
        era_flag.assi = 31;
        era_flag.assiplay = 1;
      },
    ],
    ['口塞', (f) => f.store.set('tequip:31:45', 1)],
    ['失神', (f) => f.store.set('tflag:899', 1)],
    ['崩坏', (f) => f.store.set('talent:31:9', 1)],
    ['触手', (f) => f.store.set('tequip:31:90', 1)],
  ]) {
    const fixture = await setup_k3(seed);
    await speak_k3(fixture, seq_rand(0, 0));
    assert.deepEqual(fixture.text_lines(), [], `${desc}：跳过`);
  }
});

test('爱抚外指令（SELECTCOM != 0）：落占位行（分支欠账可见）', async () => {
  const fixture = await setup_k3((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 1; // 舔阴
  });
  await speak_k3(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), [
    '（指令 1 的口上尚未移植，此处为占位——原作 @KOJO_MESSAGE_COM_3，随各自指令票，见 docs/stub-registry.md。）',
  ]);
});

// —— 存根清单对账 ——

test('存根清单可检索：docs/stub-registry.md 收录本票全部占位名', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('kojo/kojo-k3');
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
