/**
 * ere/kojo/kojo-k2-timid.js 的行为测试（issue #233：懦弱性格口上 K2）。
 *
 * 缝 = test/helpers/era-fixture.js。世界底座：通用奴隶（id 31）播种素质
 * 162（懦弱 → GET_KOJO_NUM 102）。覆盖：
 *   - 首次与二次以后走不同分支（CFLAG:301）；
 *   - FLAG:7 == 1 的阈值闸与 == 2 的旁路；
 *   - 七道跳过判定（死斗场最先、兽奸静默、与 K5 同款不调 DOG_KOJO）；
 *   - 凌辱分发按 GET_KOJO_NUM 命中 K2（不再写死 call(0)）；
 *   - 存根清单核对（docs/stub-registry.md）。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

async function setup_k2(seed) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '莉亚');
  fixture.era.beginTrain(0, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = 0;
  fixture.store.set('talent:31:162', 1); // 懦弱 → GET_KOJO_NUM = 102
  fixture.store.set('flag:102', 1); // K2 存在标志
  fixture.store.set('flag:7', 2); // 总开关默认
  if (seed) {
    seed(fixture);
  }
  fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k2-timid');
  return fixture;
}

async function speak_k2(fixture, rand) {
  const { kojo_message_com_family } = fixture.load_module('kojo/kojo-system');
  return kojo_message_com_family.call(2, { args: [rand] });
}

const seq_rand =
  (...draws) =>
  (n) => {
    const value = draws.shift() ?? 0;
    return value % n;
  };

test('首次（CFLAG:301 == 0 且 MARK:2 < 2）：一句拒绝 + 推进到 1', async () => {
  const fixture = await setup_k2();
  await speak_k2(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), [
    '「什么？！请不要这样……快放开我！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:301'), 1);
});

test('首次的刻印分档（MARK:2 >= 2）：屈服台词', async () => {
  const fixture = await setup_k2((f) => f.store.set('mark:31:2', 2));
  await speak_k2(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), ['「真的…这样…不行…然而…无法反抗…」']);
  assert.equal(fixture.store.get('cflag:31:301'), 1);
});

test('二次以后それ以外支：推进到 2', async () => {
  const fixture = await setup_k2((f) => f.store.set('cflag:31:301', 1));
  await speak_k2(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), ['「感觉…啊啊…好奇怪…！」']);
  assert.equal(fixture.store.get('cflag:31:301'), 2);
});

test('淫乱分支（TALENT:76）：两句 + 插值，推进到 6', async () => {
  const fixture = await setup_k2((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:301', 1);
  });
  await speak_k2(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), [
    '「嗯嗯♡…再…再用力些嘛…♡」',
    '莉亚淫乱的肉体本能地接受着你的爱抚……',
  ]);
  assert.equal(fixture.store.get('cflag:31:301'), 6);
});

test('阈值闸：FLAG:7 == 1 时淫乱阶段耗尽不出声、== 2 时旁路重出声', async () => {
  const quiet = await setup_k2((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:301', 6);
    f.store.set('flag:7', 1);
  });
  await speak_k2(quiet, seq_rand(0, 0));
  assert.deepEqual(quiet.text_lines(), []);
  assert.equal(quiet.store.get('cflag:31:301'), 6);

  const repeat = await setup_k2((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:301', 6);
  });
  await speak_k2(repeat, seq_rand(0, 0));
  assert.equal(repeat.text_lines().length, 2);
  assert.equal(repeat.store.get('cflag:31:301'), 6);
});

test('阈值闸：それ以外支 FLAG:7 == 2 旁路（爱抚已过 1、无素质无刻印）', async () => {
  // 隔离 M1542：不置 TALENT:76，只走 MARK:2 <= 1 的それ以外支。
  // FLAG:7 == 1 且 CFLAG:301 == 2（> 1）→ 上限耗尽静默；
  // FLAG:7 == 2 → 旁路重出声、状态停在 2。
  const quiet = await setup_k2((f) => {
    f.store.set('cflag:31:301', 2);
    f.store.set('flag:7', 1);
  });
  await speak_k2(quiet, seq_rand(0, 0));
  assert.deepEqual(quiet.text_lines(), []);
  assert.equal(quiet.store.get('cflag:31:301'), 2);

  const repeat = await setup_k2((f) => f.store.set('cflag:31:301', 2));
  await speak_k2(repeat, seq_rand(0, 0));
  assert.deepEqual(repeat.text_lines(), ['「感觉…啊啊…好奇怪…！」']);
  assert.equal(repeat.store.get('cflag:31:301'), 2);
});

test('爱慕分支（TALENT:85）：推进到 5', async () => {
  const fixture = await setup_k2((f) => {
    f.store.set('talent:31:85', 1);
    f.store.set('cflag:31:301', 1);
    f.store.set('mark:31:2', 3);
  });
  await speak_k2(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), [
    '「呼…呼呼…再…请随意…关照…♡」',
    '莉亚一边接受着爱抚的快感一边向你撒娇……',
  ]);
  assert.equal(fixture.store.get('cflag:31:301'), 5);
});

test('屈服刻印 Lv3 / Lv2 分档：各推进到 4 / 3', async () => {
  const lv3 = await setup_k2((f) => {
    f.store.set('mark:31:2', 3);
    f.store.set('cflag:31:301', 1);
  });
  await speak_k2(lv3, seq_rand(0, 0));
  assert.deepEqual(lv3.text_lines(), ['「请…再…再用力些…啊！」']);
  assert.equal(lv3.store.get('cflag:31:301'), 4);

  const lv2 = await setup_k2((f) => {
    f.store.set('mark:31:2', 2);
    f.store.set('cflag:31:301', 1);
  });
  await speak_k2(lv2, seq_rand(0, 0));
  assert.deepEqual(lv2.text_lines(), ['「不可以…这样…不可以…！」']);
  assert.equal(lv2.store.get('cflag:31:301'), 3);
});

test('舔阴（SELECTCOM == 1）首次：处女反感 + 推进 CFLAG:302', async () => {
  const fixture = await setup_k2((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 1;
    f.store.set('talent:31:0', 1);
  });
  await speak_k2(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), [
    '「哪里！那里…脏！好脏！」',
    '莉亚似乎反感阴部被舔……',
  ]);
  assert.equal(fixture.store.get('cflag:31:302'), 1);
});

test('正常位（SELECTCOM == 20）首次：非处女默认支 + 推进 CFLAG:321', async () => {
  const fixture = await setup_k2((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 20;
  });
  await speak_k2(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), [
    '「讨厌…就这样…被侵犯了…」',
    '莉亚徒劳地左右摇头想要挣脱，但却被你无视了……',
  ]);
  assert.equal(fixture.store.get('cflag:31:321'), 1);
});

test('穿环（SELECTCOM == 87）首次：默认支 + 推进 CFLAG:348', async () => {
  const fixture = await setup_k2((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 87;
  });
  await speak_k2(fixture, seq_rand(0, 0));
  assert.ok(
    fixture.text_lines().some((line) => line.includes('除环后残留的伤口')),
    '穿环首次默认支出声',
  );
  assert.equal(fixture.store.get('cflag:31:348'), 1);
});

test('死斗场（TEQUIP:55）最先：selectcom=0 时 COLOSSEUM_KOJO_2 静默返回', async () => {
  const fixture = await setup_k2((f) => f.store.set('tequip:31:55', 1));
  await speak_k2(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), []);
  assert.equal(fixture.store.get('cflag:31:301'), undefined);
});

test('助手调教（ASSI > 0 && ASSIPLAY）：静默跳过', async () => {
  const fixture = await setup_k2((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.assi = 31;
    era_flag.assiplay = 1;
  });
  await speak_k2(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), []);
});

test('口塞（TEQUIP:45）：SELECTCOM != 45 跳过、== 45 不被此判定拦', async () => {
  const gagged = await setup_k2((f) => f.store.set('tequip:31:45', 1));
  await speak_k2(gagged, seq_rand(0, 0));
  assert.deepEqual(gagged.text_lines(), []);

  const speaking = await setup_k2((f) => {
    f.store.set('tequip:31:45', 1);
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 45;
  });
  await speak_k2(speaking, seq_rand(0, 0));
  assert.ok(speaking.text_lines().length > 0, '口塞中的 45 指令不被头部守卫拦');
});

test('失神（TFLAG:899）：静默跳过', async () => {
  const fixture = await setup_k2((f) => f.store.set('tflag:899', 1));
  await speak_k2(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), []);
});

test('崩坏（TALENT:9）：静默跳过', async () => {
  const fixture = await setup_k2((f) => f.store.set('talent:31:9', 1));
  await speak_k2(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), []);
});

test('兽奸（TEQUIP:89）：K2 是静默跳过（不调 DOG_KOJO_2）', async () => {
  const fixture = await setup_k2((f) => f.store.set('tequip:31:89', 1));
  await speak_k2(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), []);
});

test('触手（TEQUIP:90）：静默跳过', async () => {
  const fixture = await setup_k2((f) => f.store.set('tequip:31:90', 1));
  await speak_k2(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), []);
});

test('@EVENTTRAIN #PRI 置 FLAG:102、@EVENTEND #LATER 清 0', async () => {
  const fixture = await setup_k2((f) => f.store.set('flag:102', 0));
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.store.get('flag:102'), 1);
  await emit('EVENTEND');
  assert.equal(fixture.store.get('flag:102'), 0);
});

test('@EVENTTRAIN 普通档：默认种族初调教台词 + 推进 CFLAG:201', async () => {
  const fixture = await setup_k2();
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.ok(
    fixture.text_lines().some((line) => line.includes('放过我')),
    '默认种族初调教必须出声',
  );
  assert.equal(fixture.store.get('cflag:31:201'), 1);
});

test('@EVENTEND 普通档：屈服低时「为什么要这样对我」', async () => {
  const fixture = await setup_k2((f) => {
    f.store.set('base:31:0', 1000);
    f.store.set('talent:31:85', 0);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTEND');
  assert.ok(
    fixture.text_lines().some((line) => line.includes('为什么要这样对我')),
    'EVENTEND 普通档必须出声',
  );
});
test('凌辱分发按 GET_KOJO_NUM 命中 K2（不再写死 call(0)）', async () => {
  const fixture = await setup_k2((f) => f.store.set('talent:31:0', 1));
  const { ryouzyoku } = fixture.load_module('kojo/kojo-dungeon-ravish');
  fixture.era.input = async () => 0; // 旁观：过选择后才调前置口上
  await ryouzyoku(31, seq_rand(0));
  assert.ok(
    fixture.text_lines().some((line) => line.includes('我的第一次')),
    'K2 凌辱口上必须经 GET_KOJO_NUM 命中（call(0) 会落到未注册的 K0）',
  );
});

test('死斗场专用口上：SELECTCOM == 55 气力尚在时出声', async () => {
  const fixture = await setup_k2((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 55;
    f.store.set('base:31:1', 500);
  });
  const { colosseum_kojo_2 } = fixture.load_module('kojo/kojo-k2-timid');
  await colosseum_kojo_2(seq_rand(0, 0));
  assert.ok(
    fixture.text_lines().some((line) => line.includes('死斗场的狂热')),
    'COLOSSEUM_KOJO_2 在 selectcom=55 必须出声',
  );
});

test('兽奸专用口上：DOG_KOJO_2 爱抚首次出声（COM 头部不调它）', async () => {
  const fixture = await setup_k2();
  const { dog_kojo_2 } = fixture.load_module('kojo/kojo-k2-timid');
  await dog_kojo_2(seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), ['「呓……」']);
  assert.equal(fixture.store.get('cflag:31:301'), 1);
});

test('PALAMCNG：润滑首次超过 LV2', async () => {
  const fixture = await setup_k2((f) => f.store.set('palam:31:3', 501));
  const { kojo_message_palamcng_2 } = fixture.load_module('kojo/kojo-k2-timid');
  await kojo_message_palamcng_2(seq_rand(0, 0));
  assert.ok(
    fixture.text_lines().some((line) => line.includes('润滑第一次超过 LV2')),
    'PALAMCNG 首次润滑必须出声',
  );
  assert.equal(fixture.store.get('cflag:31:221'), 1);
});

test('MARKCNG：苦痛刻印 LV3 取得', async () => {
  const fixture = await setup_k2();
  const { game } = fixture.load_module('facade/game');
  game.system.苦痛刻印变动 = 3;
  const { kojo_message_markcng_2 } = fixture.load_module('kojo/kojo-k2-timid');
  await kojo_message_markcng_2(seq_rand(0, 0));
  assert.ok(
    fixture.text_lines().some((line) => line.includes('痛楚')),
    'MARKCNG 苦痛刻印 LV3 必须出声',
  );
  assert.equal(fixture.store.get('cflag:31:297'), 1);
});

test('SELF_KOJO：leftover_q == 1 助手妄想支', async () => {
  const fixture = await setup_k2((f) => {
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
    fixture.text_lines().some((line) => line.includes('再来一次')),
    'SELF_KOJO 助手妄想支出声',
  );
});

test('NTR 口上：首次入口写 CFLAG:650', async () => {
  const fixture = await setup_k2();
  const { ntr_koujo_k2 } = fixture.load_module('kojo/kojo-k2-timid');
  await ntr_koujo_k2(seq_rand(0, 0));
  assert.equal(fixture.store.get('cflag:31:650'), 1);
});

test('奖赏后口上：choice == 0 出声', async () => {
  const fixture = await setup_k2();
  const { gohoubi_after_koujo_k2 } = fixture.load_module('kojo/kojo-k2-timid');
  await gohoubi_after_koujo_k2(31, 0, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), ['「哇…我知道了…」']);
});

test('惩罚口上：choice == 0 出声', async () => {
  const fixture = await setup_k2();
  const { osioki_koujo_k2 } = fixture.load_module('kojo/kojo-k2-timid');
  await osioki_koujo_k2(31, 0, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), ['「谢谢……」']);
});

test('存根清单可检索：docs/stub-registry.md 收录这张票全部占位名', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('kojo/kojo-k2-timid');
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
