/**
 * ere/kojo/kojo-k11-lily.js 的行为测试（issue #242：J32 口上·K11 リリィ，
 * WIP 1/N：存在标志一对 + @EVENTTRAIN 主体 + @K11_KOJO2 + @EVENTEND）。
 *
 * 缝 = test/helpers/era-fixture.js。世界底座：莉莉（角色 24，性格素质 171 →
 * GET_KOJO_NUM = 111 → 分发 key 11）；姉妹判定另需玛奥（角色 17，
 * test/helpers/chara.js 的 preset_chara_17，K5 マオ 同一角色号先例）。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_chara_0, preset_chara_17 } = require('./helpers/chara');

const LILY = 24; // Chara24.yml「名前」「呼び名」= 莉莉
const MAO = 17; // preset_chara_17（K5 マオ）

// 世界底座：莉莉（素质 171 → GET_KOJO_NUM = 111 → 分发 key 11）入列调教
function setup_lily(seed, selectcom = 0) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  fixture.seed_chara(LILY, { id: LILY, name: '莉莉', callname: '莉莉' });
  fixture.era.addCharacter(LILY);
  fixture.era.beginTrain(0, LILY);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = LILY;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = selectcom;
  fixture.store.set(`talent:${LILY}:171`, 1); // 村娘Ｂ → GET_KOJO_NUM = 111
  fixture.store.set('flag:111', 1); // K11 存在标志
  fixture.store.set('flag:7', 2); // 口上总开关默认（全量模式）
  fixture.store.set('talent:0:122', 1); // MASTER 是男性（简易助手分支的守卫）
  if (seed) {
    seed(fixture, era_flag);
  }
  fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k11-lily');
  return fixture;
}

// 经分发族调用（TRYCALLFORM KOJO_MESSAGE_COM_11 的等价物）
async function speak_com11(fixture, rand) {
  const { kojo_message_com_family } = fixture.load_module('kojo/kojo-system');
  return kojo_message_com_family.call(11, { args: [rand] });
}

// RAND:N 定值序：draws 依次被消费，越界取模（K3 test 同款先例）
const seq_rand =
  (...draws) =>
  (n) => {
    const value = draws.shift() ?? 0;
    return value % n;
  };

// —— 存在标志一对 ——

test('@EVENTTRAIN #PRI 置存在标志、@EVENTEND #LATER 清 0（K11 一对）', async () => {
  const fixture = setup_lily((f) => f.store.delete('flag:111'));
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.store.get('flag:111'), 1);
  assert.equal(fixture.store.get('flag:7'), 2); // 总开关随之默认开
  await emit('EVENTEND');
  assert.equal(fixture.store.get('flag:111'), 0);
});

test('@EVENTTRAIN 守卫：FLAG:7 <= 0（口上总开关关闭）时静默跳过', async () => {
  const fixture = setup_lily((f) => f.store.set('flag:7', -1));
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), []);
  assert.equal(fixture.store.get(`cflag:${LILY}:201`), undefined);
});

test('@EVENTTRAIN 守卫：TALENT:171 != 1（非莉莉专属素质）时静默跳过', async () => {
  const fixture = setup_lily((f) => f.store.set(`talent:${LILY}:171`, 0));
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), []);
  assert.equal(fixture.store.get(`cflag:${LILY}:201`), undefined);
});

// —— @EVENTTRAIN：初調教 CFLAG:201 状态机 ——

test('初调教（CFLAG:201 == 0）：无玛奥助手时走寻妹对峙分档，推进到 1', async () => {
  const fixture = setup_lily();
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(
    fixture.text_lines()[0],
    '「我的妹妹呢！把我的妹妹还给我！」',
    '寻妹对峙分档首句',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:201`), 1, 'CFLAG:201 推进到 1');
});

test('初调教（CFLAG:201 == 0）：助手是玛奥时走姉妹相认分档，互标肉亲关系并置 CFLAG:202', async () => {
  const fixture = setup_lily();
  preset_chara_17(fixture);
  fixture.era.addCharacter(MAO);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.assi = MAO;
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(
    fixture.text_lines()[0],
    '『姐姐？你怎么会在这里？』',
    '姉妹相认分档首句',
  );
  assert.equal(
    fixture.store.get(`cflag:${LILY}:21`),
    317,
    'CFLAG:TARGET:21 姐姐',
  );
  assert.equal(fixture.store.get(`cflag:${MAO}:21`), 224, 'CFLAG:ASSI:21 妹妹');
  assert.equal(
    fixture.store.get(`cflag:${LILY}:202`),
    1,
    '简易助手 CFLAG:202 = 1',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:201`), 1);
});

test('魔族化（１回のみ）：CFLAG:201<5 且未魔族化时改造，CFLAG:400 = 2', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:201`, 2);
    f.store.set(`talent:${LILY}:314`, 9);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.store.get(`cflag:${LILY}:400`), 2);
});

test('NTR再捕获（CFLAG:201>=1 && CFLAG:650==1）：爱慕臂清 NTR 开关', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:201`, 2);
    f.store.set(`cflag:${LILY}:650`, 1);
    f.store.set(`talent:${LILY}:85`, 1); // 爱慕
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.store.get(`cflag:${LILY}:650`), 0);
});

test('屈服刻印分档（各 Lv 一次）：CFLAG:201 1→2、2→3、3→4', async () => {
  const lv1 = setup_lily((f) => {
    f.store.set(`mark:${LILY}:2`, 1);
    f.store.set(`cflag:${LILY}:201`, 1);
  });
  const { emit: emit1 } = lv1.load_module('system/event/registry');
  await emit1('EVENTTRAIN');
  assert.equal(
    lv1.text_lines()[0],
    '「呼…呼…这样的调教，才，才没有什么……」',
    '屈服刻印Lv1首句',
  );
  assert.equal(lv1.store.get(`cflag:${LILY}:201`), 2);

  const lv2 = setup_lily((f) => {
    f.store.set(`mark:${LILY}:2`, 2);
    f.store.set(`cflag:${LILY}:201`, 2);
  });
  const { emit: emit2 } = lv2.load_module('system/event/registry');
  await emit2('EVENTTRAIN');
  assert.equal(
    lv2.text_lines()[0],
    '「都是因为救不了妹妹…我才会受到这样的惩罚」',
    '屈服刻印Lv2首句',
  );
  assert.equal(lv2.store.get(`cflag:${LILY}:201`), 3);

  const lv3 = setup_lily((f) => {
    f.store.set(`mark:${LILY}:2`, 3);
    f.store.set(`cflag:${LILY}:201`, 3);
  });
  const { emit: emit3 } = lv3.load_module('system/event/registry');
  await emit3('EVENTTRAIN');
  assert.equal(lv3.text_lines()[0], '「不，不要啊！不要用你的脏手碰我……啊啊」');
  assert.equal(lv3.store.get(`cflag:${LILY}:201`), 4);
});

test('淫乱：CFLAG:201 = 5，处女附注按 TALENT:0 分档', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:201`, 4);
    f.store.set(`talent:${LILY}:76`, 1); // 淫乱
    f.store.set(`talent:${LILY}:0`, 1); // 处女
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.ok(
    fixture
      .text_lines()
      .includes('「啊啊…要是敢侵犯我的处女身的话，绝对不会原谅你的哦♡」'),
    '处女附注命中处女分档',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:201`), 5);
});

test('淫乱+魔族化：调教前从魔族（CFLAG:400==1）分档，CFLAG:201 = 6', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:201`, 5);
    f.store.set(`talent:${LILY}:314`, 9);
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set(`cflag:${LILY}:400`, 1);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.store.get(`cflag:${LILY}:201`), 6);
});

test('爱慕：CFLAG:201 = 7', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:201`, 6);
    f.store.set(`talent:${LILY}:85`, 1); // 爱慕
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.ok(
    fixture.text_lines().includes('「有…有什么好笑的嘛？」'),
    '爱慕分档特征句',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:201`), 7);
});

test('崩坏（TALENT:9 == 1 && CFLAG:201 < 9）：CFLAG:201 = 9', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`talent:${LILY}:9`, 1);
    f.store.set(`cflag:${LILY}:201`, 8);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), [
    '莉莉的眼睛失去了光彩。',
    '因为过度的调教，看上去精神和身体都崩溃了的样子。',
    '「啊哈…呼呼…啊……哈哈……」',
  ]);
  assert.equal(fixture.store.get(`cflag:${LILY}:201`), 9);
});

test('崩坏后（TALENT:9==1 且 CFLAG:201==9）改走 K11_KOJO2，不再打崩坏台词', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`talent:${LILY}:9`, 1);
    f.store.set(`cflag:${LILY}:201`, 9);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(
    fixture.text_lines()[0],
    '「咕嘿……咕嘿嘿嘿………」',
    '改走 K11_KOJO2 自身的崩坏分档首句',
  );
  assert.ok(
    !fixture.text_lines().includes('「啊哈…呼呼…啊……哈哈……」'),
    '崩坏只播一次，二回目以降改走 K11_KOJO2',
  );
});

// —— @EVENTTRAIN：简易助手口上（助手是玛奥）——

test('无助手（ASSI < 0）时岔去 K11_KOJO2，不进简易助手分支', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:201`, 9); // 越过状态机所有分支
    f.store.set(`mark:${LILY}:2`, 0);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(
    fixture.text_lines()[0],
    '「我不会怕的。」',
    'K11_KOJO2 屈服刻印Lv0首句',
  );
});

test('主人非男性（TALENT:MASTER:122==0）时岔去 K11_KOJO2，不进简易助手分支', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:201`, 9);
    f.store.set(`mark:${LILY}:2`, 0);
    f.store.set('talent:0:122', 0); // MASTER 不是男性
  });
  preset_chara_17(fixture);
  fixture.era.addCharacter(MAO);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.assi = MAO;
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(
    fixture.text_lines()[0],
    '「我不会怕的。」',
    'K11_KOJO2 屈服刻印Lv0首句',
  );
});

test('助手非玛奥时岔去 K11_KOJO2，不进简易助手分支', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:201`, 9);
    f.store.set(`mark:${LILY}:2`, 0);
  });
  fixture.seed_chara(20, { id: 20, name: '别的助手', callname: '别的助手' });
  fixture.era.addCharacter(20);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.assi = 20;
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(
    fixture.text_lines()[0],
    '「我不会怕的。」',
    'K11_KOJO2 屈服刻印Lv0首句',
  );
});

test('助手玛奥初めて：未持爱慕/淫乱时それ以外分档，CFLAG:202 = 1', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:201`, 9);
    f.store.set(`mark:${LILY}:2`, 0);
  });
  preset_chara_17(fixture);
  fixture.era.addCharacter(MAO);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.assi = MAO;
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(
    fixture.text_lines()[0],
    '「玛…玛奥！你没事，真的是太好……为，为什么要用那种眼神看我……而且为什么穿成这个样子？」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:202`), 1);
});

test('助手玛奥初めて：已持爱慕且 CFLAG:201>=5 时陷落事件分档，CFLAG:202 = 2', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:201`, 9); // 越过状态机所有分支
    f.store.set(`talent:${LILY}:85`, 1); // 爱慕
  });
  preset_chara_17(fixture);
  fixture.era.addCharacter(MAO);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.assi = MAO;
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(
    fixture.text_lines()[0],
    '「玛…玛奥！你没事，真的是太好了……但，但为什么你穿成这个样子……」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:202`), 2);
});

test('助手玛奥二回目以降：CFLAG:202==1 且爱慕时进一步陷落，CFLAG:202 = 2', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:201`, 9);
    f.store.set(`cflag:${LILY}:202`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  });
  preset_chara_17(fixture);
  fixture.era.addCharacter(MAO);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.assi = MAO;
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(
    fixture.text_lines()[0],
    '『咦咦，怎么了姐姐？为什么要用那种眼神看着我？』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:202`), 2);
});

test('助手玛奥二回目以降：CFLAG:202>=2 时日常分档，不再改 CFLAG:202', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:201`, 9);
    f.store.set(`cflag:${LILY}:202`, 2);
    f.store.set(`talent:${LILY}:85`, 1);
  });
  preset_chara_17(fixture);
  fixture.era.addCharacter(MAO);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.assi = MAO;
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(
    fixture.text_lines()[0],
    '「啊啊…魔王大人…请给我今日的拥抱………♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:202`), 2);
});

test('助手玛奥それ以外（未持爱慕/淫乱、CFLAG:202==1）：拒绝分档，不改 CFLAG:202', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:201`, 9);
    f.store.set(`cflag:${LILY}:202`, 1);
  });
  preset_chara_17(fixture);
  fixture.era.addCharacter(MAO);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.assi = MAO;
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.text_lines()[0], '『姐姐早点坦率地面对自己的欲望吧……』');
  assert.equal(fixture.store.get(`cflag:${LILY}:202`), 1);
});

// —— @K11_KOJO2：二回目以降通用分档 ——

test('K11_KOJO2：反発刻印Lv3', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:201`, 9);
    f.store.set(`mark:${LILY}:3`, 3);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(
    fixture.text_lines()[0],
    '「尽管来吧，别以为我不知道你想做什么。」',
  );
});

test('K11_KOJO2：屈服刻印Lv3＋爱慕/淫乱無し，按 CFLAG:202 是否见过妹妹分档', async () => {
  const seen = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:201`, 9);
    f.store.set(`mark:${LILY}:2`, 3);
    f.store.set(`cflag:${LILY}:202`, 1);
  });
  const { emit: emit_seen } = seen.load_module('system/event/registry');
  await emit_seen('EVENTTRAIN');
  assert.ok(
    seen
      .text_lines()
      .some(
        (l) =>
          l.includes('把我的妹妹……变成那个样子的吗') ||
          l.includes('那就不需要去打扰她了'),
      ),
    '见过妹妹分档（RAND 二选一）',
  );

  const unseen = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:201`, 9);
    f.store.set(`mark:${LILY}:2`, 3);
  });
  const { emit: emit_unseen } = unseen.load_module('system/event/registry');
  await emit_unseen('EVENTTRAIN');
  assert.ok(
    unseen
      .text_lines()
      .some(
        (l) =>
          l.includes('什么时候，才能让我和妹妹见面') ||
          l.includes('让，让我来当你的对手好了'),
      ),
    '未见过妹妹分档（RAND 二选一）',
  );
});

test('K11_KOJO2：淫乱含魔族化分支', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:201`, 9);
    f.store.set(`mark:${LILY}:2`, -1); // 避开屈服刻印 Lv0-3 各分档（穷举 0-3）
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set(`talent:${LILY}:314`, 9);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.ok(
    fixture
      .text_lines()
      .some(
        (l) =>
          l.includes('终于想起来要来疼爱人家了吗') ||
          l.includes('人家今天感觉很累') ||
          l.includes('向您请安，魔王大人'),
      ),
    '淫乱含魔族化分支自身台词出声（而非落到体力分档等后续分支）',
  );
});

test('K11_KOJO2：爱慕分档（RAND 三选一，落到隐式 RETURN 0 前提早覆盖为 return 1）', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:201`, 9);
    f.store.set(`mark:${LILY}:2`, -1); // 避开屈服刻印 Lv0-3 各分档（穷举 0-3）
    f.store.set(`talent:${LILY}:85`, 1);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.ok(
    fixture
      .text_lines()
      .some(
        (l) =>
          l.includes('很高兴魔王大人今天选择了我') ||
          l.includes('魔王大人最近还') ||
          l.includes('在我被魔王大人调教的时候'),
      ),
    '爱慕含魔族化分支自身台词出声（而非落到体力分档等后续分支）',
  );
});

// —— 存根清单核对（DOG_KOJO_11/COLOSSEUM_KOJO_11，待各自认领点补真身） ——

test('存根清单可检索：docs/stub-registry.md 收录这张票全部占位名', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('kojo/kojo-k11-lily');
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

// —— @EVENTEND ——

test('@EVENTEND 守卫：FLAG:7 <= 0（口上总开关关闭）时静默跳过', async () => {
  const fixture = setup_lily((f) => {
    f.store.set('flag:7', -1);
    f.store.set(`base:${LILY}:0`, 100);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTEND');
  assert.deepEqual(fixture.text_lines(), []);
});

test('@EVENTEND 守卫：TALENT:171 != 1（非莉莉专属素质）时静默跳过', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`talent:${LILY}:171`, 0);
    f.store.set(`base:${LILY}:0`, 100);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTEND');
  assert.deepEqual(fixture.text_lines(), []);
});

test('@EVENTEND：角色死亡（BASE:0<=0）时跳过口上', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`base:${LILY}:0`, 0);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTEND');
  assert.deepEqual(fixture.text_lines(), []);
});

test('@EVENTEND：崩坏分档', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`talent:${LILY}:9`, 1);
    f.store.set(`base:${LILY}:0`, 100);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTEND');
  assert.deepEqual(fixture.text_lines(), [
    '「咕嘿……咕嘿嘿嘿………」',
    '少女眼中理性的光芒已经不复存在………',
  ]);
});

test('@EVENTEND：反発刻印Lv3+爱慕无，按 CFLAG:202 分支', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`mark:${LILY}:3`, 3);
    f.store.set(`base:${LILY}:0`, 100);
    f.store.set(`cflag:${LILY}:202`, 1);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTEND');
  assert.equal(fixture.text_lines()[0], '「我，我是绝对不会认输的……」');
});

test('@EVENTEND：淫乱按体力 500 分档', async () => {
  const above = setup_lily((f) => {
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set(`mark:${LILY}:2`, 4); // 越过前面 CFLAG:202 无关的 Lv1-3+爱慕无分支
    f.store.set(`base:${LILY}:0`, 600);
  });
  const { emit: emit_above } = above.load_module('system/event/registry');
  await emit_above('EVENTEND');
  assert.equal(
    above.text_lines()[0],
    '「哎哎，才到这种程度就结束了吗……这就要回去了？」',
  );

  const below = setup_lily((f) => {
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set(`mark:${LILY}:2`, 4);
    f.store.set(`base:${LILY}:0`, 400);
  });
  const { emit: emit_below } = below.load_module('system/event/registry');
  await emit_below('EVENTEND');
  assert.equal(below.text_lines()[0], '「哈啊……哈啊……一本满足呢♡」');
});

test('@EVENTEND：爱慕按体力 500 分档', async () => {
  const above = setup_lily((f) => {
    f.store.set(`talent:${LILY}:85`, 1);
    f.store.set(`mark:${LILY}:2`, 4);
    f.store.set(`base:${LILY}:0`, 600);
  });
  const { emit: emit_above } = above.load_module('system/event/registry');
  await emit_above('EVENTEND');
  assert.equal(above.text_lines()[0], '「是，是对人家的身体厌倦了吗？」');

  const below = setup_lily((f) => {
    f.store.set(`talent:${LILY}:85`, 1);
    f.store.set(`mark:${LILY}:2`, 4);
    f.store.set(`base:${LILY}:0`, 400);
  });
  const { emit: emit_below } = below.load_module('system/event/registry');
  await emit_below('EVENTEND');
  assert.equal(
    below.text_lines()[0],
    '「哈啊……哈啊……能受到魔王大人的宠幸……太幸福了…♡」',
  );
});

// —— 主启动图接线（main-loop 是否真的 require 了本模块） ——

test('经主启动图 main-loop 加载（而非直接 load_module），K11 EVENTTRAIN 仍会置存在标志', async () => {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  fixture.seed_chara(LILY, { id: LILY, name: '莉莉', callname: '莉莉' });
  fixture.era.addCharacter(LILY);
  fixture.era.beginTrain(0, LILY);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = LILY;
  era_flag.player = 0;
  era_flag.assi = -1;
  fixture.store.set(`talent:${LILY}:171`, 1);
  fixture.store.set('flag:7', 2);
  fixture.load_module('system/flow/main-loop'); // 经主启动图，而非直接 load_module('kojo/kojo-k11-lily')
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(
    fixture.store.get('flag:111'),
    1,
    'K11 存在标志随主启动图接线置位',
  );
});

// —— @KOJO_MESSAGE_COM_11：SELECTCOM 0（爱抚 CFLAG:301）——

test('COM0 初めて：それ以外（非助手玛奥、屈服刻印Lv2未満）推进到 1', async () => {
  const fixture = setup_lily();
  await speak_com11(fixture, seq_rand());
  assert.deepEqual(fixture.text_lines(), [
    '「又，又来了……真是令人讨厌……！」',
    '莉莉充满厌恶地扭动着身体躲避着………',
  ]);
  assert.equal(fixture.store.get(`cflag:${LILY}:301`), 1);
});

test('COM0 初めて：助手玛奥分档', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
  });
  await speak_com11(fixture, seq_rand());
  assert.deepEqual(fixture.text_lines(), [
    '『姐姐的身材，真好，真漂亮…♪』',
    '「不行…不行啊…啊啊！」',
  ]);
  assert.equal(fixture.store.get(`cflag:${LILY}:301`), 1);
});

test('COM0 二回目：助手玛奥 + 淫乱推进到 6', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:301`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  });
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『姐姐终于坦率地面对自己的欲望了呢，我真为你高兴♡』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:301`), 6);
});

test('COM0 二回目：非助手玛奥 + 屈服刻印Lv3 推进到 4', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:301`, 1);
    f.store.set(`mark:${LILY}:2`, 3);
  });
  await speak_com11(fixture, seq_rand());
  assert.deepEqual(fixture.text_lines(), [
    '「嗯啊…哈…为什么会这么舒服的……啊啊」',
    '莉莉腰身扭动着，敏感的身体在你的爱抚下已经有了感觉。',
    '「啊啊，我的…身体……嗯啊啊！」',
  ]);
  assert.equal(fixture.store.get(`cflag:${LILY}:301`), 4);
});

test('COM0 二回目：非助手玛奥 + それ以外（RAND:2 追加句可控）', async () => {
  const on = setup_lily((f) => f.store.set(`cflag:${LILY}:301`, 1));
  await speak_com11(on, seq_rand(1));
  assert.deepEqual(on.text_lines(), [
    '「一，一点舒服的感觉都没有…嗯啊…啊啊！」',
    '「别，别碰我…嗯啊啊！」',
  ]);
  assert.equal(on.store.get(`cflag:${LILY}:301`), 2);

  const off = setup_lily((f) => f.store.set(`cflag:${LILY}:301`, 1));
  await speak_com11(off, seq_rand(0));
  assert.deepEqual(off.text_lines(), [
    '「一，一点舒服的感觉都没有…嗯啊…啊啊！」',
  ]);
});

// —— SELECTCOM 1（舔阴 CFLAG:302）——

test('COM1 初めて：处女 + 非助手玛奥推进到 1', async () => {
  const fixture = setup_lily(undefined, 1);
  fixture.store.set(`talent:${LILY}:0`, 1);
  await speak_com11(fixture, seq_rand());
  assert.deepEqual(fixture.text_lines(), [
    '「住手……停下…快停下啊…那里是小便的地方啊！」',
    '处女的纯洁，甘甜的气味涌入你的鼻子中，一阵发痒。',
    '莉莉羞耻万分，拼命扭动着身体想要躲避。而你秉承着“性奴的蜜穴必须以最严格的方式调教”的使命感、按着莉莉的腰，从阴蒂到阴唇的每一处都仔细地舔舐着………',
  ]);
  assert.equal(fixture.store.get(`cflag:${LILY}:302`), 1);
});

test('COM1 二回目：助手玛奥 + 淫乱，RAND:2 三目分岔可控', async () => {
  const a = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:302`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 1);
  await speak_com11(a, seq_rand(0));
  assert.equal(a.text_lines()[2], '『啊哈，姐姐感觉很舒服吧♪♡』');

  const b = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:302`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 1);
  await speak_com11(b, seq_rand(1));
  assert.equal(b.text_lines()[2], '『舔姐姐的这里，我也觉得很舒服哦♡』');
  assert.equal(b.store.get(`cflag:${LILY}:302`), 5);
});

test('COM1 二回目：非助手玛奥 + それ以外（屈服刻印Lv3未満）推进到 2', async () => {
  const fixture = setup_lily((f) => f.store.set(`cflag:${LILY}:302`, 1), 1);
  await speak_com11(fixture, seq_rand());
  assert.deepEqual(fixture.text_lines(), [
    '「说，说了那里是尿尿的地方啊！肮脏！不洁！不要舔啊啊啊！」',
    '莉莉拼命扭动着身体想要逃避，却被你紧紧按着分开的双腿，借着唾液的润滑，在蜜穴和阴蒂处来回舔舐着………',
  ]);
  assert.equal(fixture.store.get(`cflag:${LILY}:302`), 2);
});

// —— SELECTCOM 2（肛门爱抚 CFLAG:303）——

test('COM2 初めて：非助手玛奥推进到 1', async () => {
  const fixture = setup_lily(undefined, 2);
  await speak_com11(fixture, seq_rand());
  assert.deepEqual(fixture.text_lines(), [
    '「你……你在碰哪里！？不要啊，那种地方不可以的！」',
    '莉莉的肛门别你毫不留情地用手指玩弄着，发出了一阵阵悲鸣………',
  ]);
  assert.equal(fixture.store.get(`cflag:${LILY}:303`), 1);
});

test('COM2 二回目：淫乱 + 润滑Lv2以上推进到 7', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:303`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set(`palam:${LILY}:3`, 500);
  }, 2);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「哈啊！啊啊♡ 好…好舒服，屁股好舒服…♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:303`), 7);
});

test('COM2 二回目：それ以外（爱慕無し、润滑Lv2未満、A感覚Lv3未満）推进到 2', async () => {
  const fixture = setup_lily((f) => f.store.set(`cflag:${LILY}:303`, 1), 2);
  await speak_com11(fixture, seq_rand());
  assert.deepEqual(fixture.text_lines(), [
    '「住手！好痛啊…求求你！」',
    '莉莉泪流满面地忍耐着你对肛门的爱抚调教………',
  ]);
  assert.equal(fixture.store.get(`cflag:${LILY}:303`), 2);
});

// —— 头部守卫（COM_11 专属，与 EVENTTRAIN/EVENTEND 的 FLAG:7/TALENT:171 两道
//    分开——那两道在分发层 kojo-system.js 已核对，这里只测 COM_11 自身
//    的七道） ——

test('COM_11 守卫：助手非玛奥调教时静默跳过', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = 5;
    era_flag.assiplay = 1;
  });
  await speak_com11(fixture, seq_rand());
  assert.deepEqual(fixture.text_lines(), []);
});

test('COM_11 守卫：兽奸中改走存根占位（DOG_KOJO_11）', async () => {
  const fixture = setup_lily((f) => f.store.set(`tequip:${LILY}:89`, 1));
  await speak_com11(fixture, seq_rand());
  assert.ok(fixture.text_lines()[0].includes('DOG_KOJO_11'));
});

test('COM_11 守卫：死斗场中改走存根占位（COLOSSEUM_KOJO_11）', async () => {
  const fixture = setup_lily((f) => f.store.set(`tequip:${LILY}:55`, 1));
  await speak_com11(fixture, seq_rand());
  assert.ok(fixture.text_lines()[0].includes('COLOSSEUM_KOJO_11'));
});

test('COM_11 守卫：口塞中（非口塞指令）静默跳过', async () => {
  const fixture = setup_lily((f) => f.store.set(`tequip:${LILY}:45`, 1));
  await speak_com11(fixture, seq_rand());
  assert.deepEqual(fixture.text_lines(), []);
});

test('COM_11 守卫：失神中静默跳过', async () => {
  const fixture = setup_lily((f) => f.store.set(`tflag:899`, 1));
  await speak_com11(fixture, seq_rand());
  assert.deepEqual(fixture.text_lines(), []);
});

test('COM_11 守卫：崩坏后静默跳过', async () => {
  const fixture = setup_lily((f) => f.store.set(`talent:${LILY}:9`, 1));
  await speak_com11(fixture, seq_rand());
  assert.deepEqual(fixture.text_lines(), []);
});

test('COM_11 守卫：触手调教中静默跳过', async () => {
  const fixture = setup_lily((f) => f.store.set(`tequip:${LILY}:90`, 1));
  await speak_com11(fixture, seq_rand());
  assert.deepEqual(fixture.text_lines(), []);
});

test('COM0 初めて：ASSI 是玛奥但 ASSIPLAY 为 0 时不算助手玛奥分档', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 0;
  });
  await speak_com11(fixture, seq_rand());
  assert.deepEqual(fixture.text_lines(), [
    '「又，又来了……真是令人讨厌……！」',
    '莉莉充满厌恶地扭动着身体躲避着………',
  ]);
});

test('COM0 初めて：屈服刻印恰为 Lv2（非 Lv3）也命中温柔分档', async () => {
  const fixture = setup_lily((f) => f.store.set(`mark:${LILY}:2`, 2));
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「啊啊……再这样摸的话……！」');
});

test('COM0 二回目：助手玛奥+淫乱恰在 CFLAG:301==5 时仍命中（<=5 含边界）', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set('flag:7', 1); // 中和 || 口上开关===2 逃逸支，让 <=5 边界真正生效
    f.store.set(`cflag:${LILY}:301`, 5);
    f.store.set(`talent:${LILY}:76`, 1);
  });
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『姐姐终于坦率地面对自己的欲望了呢，我真为你高兴♡』',
  );
});

test('COM1 二回目：反抗刻印恰为 Lv1（非 Lv2）也命中反抗分档', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:302`, 1);
    f.store.set(`mark:${LILY}:3`, 1);
  }, 1);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「居……居然像狗一样舔着下面……你这个人……一点尊严都不要的吗……嗯啊啊」',
  );
});

test('COM2 二回目：润滑增量（delta:3 / UP:3）与本体（palam:3）合计才达阈值', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:303`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set(`palam:${LILY}:3`, 400);
    f.store.set(`delta:${LILY}:3`, 100);
  }, 2);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「哈啊！啊啊♡ 好…好舒服，屁股好舒服…♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:303`), 7);
});

test('COM2 二回目：淫乱+润滑Lv1（未达Lv2）走低润滑分档，不误入高润滑分档', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:303`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set(`palam:${LILY}:3`, 300); // >= PALAMLV[1]=100，< PALAMLV[2]=500
  }, 2);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「真，真是的！屁股都还没湿透就这么把手指插进来……啊别…别停下呀…嗯啊啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:303`), 6);
});

test('COM2 二回目：それ以外恰在 CFLAG:223==1 时仍命中（<=1 含边界）', async () => {
  const fixture = setup_lily((f) => {
    f.store.set('flag:7', 1); // 中和 || 口上开关===2 逃逸支，让 <=1 边界真正生效
    f.store.set(`cflag:${LILY}:303`, 1);
    f.store.set(`cflag:${LILY}:223`, 1);
  }, 2);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「住手！好痛啊…求求你！」');
});

// —— SELECTCOM 3（自慰 CFLAG:304） ——

test('COM3 初めて：助手玛奥分档', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
  }, 3);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『姐姐自慰要更认真一点啊，还要告诉我你以前在家都是想着谁，怎么摸的。我可是每次都听见了的哦。』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:304`), 1);
});

test('COM3 初めて：非助手玛奥分档', async () => {
  const fixture = setup_lily(null, 3);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「开，开什么玩笑…为什么要我做……这种事情…呜呜呜…」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:304`), 1);
});

test('COM3 二回目：助手玛奥 + 淫乱 + 处女推进到 7', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:304`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set(`talent:${LILY}:0`, 1);
  }, 3);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『啊咧？姐姐的身体都这么色情了，居然还是处女？…』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:304`), 7);
});

test('COM3 二回目：助手玛奥 + 爱慕 + 非处女推进到 5', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:304`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 3);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『哎呀呀，姐姐这么热情地自慰着，是希望一会儿能够得到魔王大人的疼爱吗？』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:304`), 5);
});

test('COM3 二回目：助手玛奥 + それ以外（无淫乱/爱慕，CFLAG:304 不推进）', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:304`, 1);
  }, 3);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『哎呀呀，姐姐自慰的样子真下流，看得人家都兴奋起来了啊…♪』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:304`), 1);
});

test('COM3 二回目：非助手玛奥 + 淫乱+处女推进到 9', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:304`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set(`talent:${LILY}:0`, 1);
  }, 3);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「魔王大人为什么还不肯要了我的处子身呢，嫌弃我吗？…要是太过分的话，我会做什么可就不知道了哦？」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:304`), 9);
});

test('COM3 二回目：非助手玛奥 + 淫乱+自慰中毒Lv3以上，RAND:3 三选一可控', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:304`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set(`abl:${LILY}:31`, 3);
  }, 3);
  await speak_com11(fixture, seq_rand(1)); // RAND:3 落 1 → ELSEIF RAND:2 == 0 支
  assert.equal(
    fixture.text_lines()[0],
    '「哎呀哎呀…要人家这个姿势来自慰…真，真是变态呢♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:304`), 8);
});

test('COM3 二回目：非助手玛奥 + 淫乱+自慰中毒Lv3未満，RAND:2 二选一可控', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:304`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set(`abl:${LILY}:31`, 2);
  }, 3);
  await speak_com11(fixture, seq_rand(1)); // RAND:2 落 1 → ELSE 支
  assert.equal(
    fixture.text_lines()[0],
    '「嗯啊啊……就让我把宝贵的高潮这样浪费在自慰中……魔王大人真是残忍呢…嗯啊啊……哈啊♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:304`), 7);
});

test('COM3 二回目：非助手玛奥 + 爱慕+处女推进到 6', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:304`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
    f.store.set(`talent:${LILY}:0`, 1);
  }, 3);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「哈啊…哈啊…魔王大人……什么时候才，才会要走我的处子身…啊嗯啊啊♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:304`), 6);
});

test('COM3 二回目：非助手玛奥 + 爱慕+自慰中毒Lv3以上，RAND:3 三选一可控', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:304`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
    f.store.set(`abl:${LILY}:31`, 3);
  }, 3);
  await speak_com11(fixture, seq_rand(0)); // RAND:3 落 0
  assert.equal(
    fixture.text_lines()[0],
    '「嗯啊啊♡…哈啊…实在…太害羞了…但是手指…就是停不下来…啊啊啊魔王大人…人家这个姿势可以吗♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:304`), 5);
});

test('COM3 二回目：非助手玛奥 + 爱慕+自慰中毒Lv3未満，RAND:2 二选一可控', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:304`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
    f.store.set(`abl:${LILY}:31`, 2);
  }, 3);
  await speak_com11(fixture, seq_rand(0)); // RAND:2 落 0
  assert.equal(
    fixture.text_lines()[0],
    '「如果是魔王大人的命令的话…！再羞耻的事我也，我也愿意…哈啊…嗯啊啊♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:304`), 4);
});

test('COM3 二回目：非助手玛奥 + 屈服刻印Lv3+自慰中毒Lv1以上推进到 3', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:304`, 1);
    f.store.set(`mark:${LILY}:2`, 3);
    f.store.set(`abl:${LILY}:31`, 1);
  }, 3);
  await speak_com11(fixture, seq_rand(1)); // RAND:2 落 1 → ELSE 支
  assert.equal(
    fixture.text_lines()[0],
    '「哈啊…哈啊…可…可以停下来了吗？…啊啊，我知道了，我会继续的，我会继续的！嗯啊 啊」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:304`), 3);
});

test('COM3 二回目：非助手玛奥 + それ以外推进到 2', async () => {
  const fixture = setup_lily((f) => {
    f.store.set('flag:7', 1); // 中和 || 口上开关===2 逃逸支
    f.store.set(`cflag:${LILY}:304`, 1);
  }, 3);
  await speak_com11(fixture, seq_rand(0)); // RAND:2 落 0
  assert.equal(
    fixture.text_lines()[0],
    '「为什么…要我做这样羞耻的事…嗯啊…哈啊」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:304`), 2);
});

// —— SELECTCOM 5（胸爱抚 CFLAG:306） ——

test('COM5 初めて：助手玛奥分档', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
  }, 5);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『哇，姐姐的胸部比以前在村子里的时候更大了呢？』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:306`), 1);
});

test('COM5 初めて：非助手玛奥分档', async () => {
  const fixture = setup_lily(null, 5);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「啊啊！不要揉得那么用力啊…好痛，好痛！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:306`), 1);
});

test('COM5 二回目：助手玛奥 + 淫乱推进到 5', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:306`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 5);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『姐姐的乳头轻轻摸舔一下就变得这么色情了、啊啊真好，我也想有这样色情的乳头让魔王大人玩弄♡』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:306`), 5);
});

test('COM5 二回目：助手玛奥 + 爱慕推进到 4', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:306`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 5);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『哎呀，姐姐乳房好像经常被魔王大人玩到高潮哟♪　咯咯咯』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:306`), 4);
});

test('COM5 二回目：助手玛奥 + B感覚Lv3以上推进到 3', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:306`, 1);
    f.store.set(`abl:${LILY}:1`, 3);
  }, 5);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『哎呀呀，姐姐的胸部变得好厉害，乳头挺得这么直…』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:306`), 3);
});

test('COM5 二回目：助手玛奥 + 乳房感觉恰为 Lv2（未达 Lv3）不误入 B感覚 分档', async () => {
  const fixture = setup_lily((f, era_flag) => {
    f.store.set('flag:7', 1); // 中和 || 口上开关===2 逃逸支
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:306`, 1);
    f.store.set(`abl:${LILY}:1`, 2);
  }, 5);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『哎呀，姐姐不喜欢被我这样玩弄胸部吗？』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:306`), 2);
});

test('COM5 二回目：助手玛奥 + それ以外推进到 2', async () => {
  const fixture = setup_lily((f, era_flag) => {
    f.store.set('flag:7', 1); // 中和 || 口上开关===2 逃逸支
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:306`, 1);
  }, 5);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『哎呀，姐姐不喜欢被我这样玩弄胸部吗？』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:306`), 2);
});

test('COM5 二回目：非助手玛奥 + 淫乱，RAND:2 三目分岔可控，推进到 5', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:306`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 5);
  await speak_com11(fixture, seq_rand(1)); // rand_n(2) 落 1 → truthy 支
  assert.equal(
    fixture.text_lines()[3],
    `莉莉似乎已经被快感弄得完全无法思考了，只是一味地浪叫着，口水不住地从嘴角流出「继续、继续」………`,
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:306`), 5);
});

test('COM5 二回目：非助手玛奥 + 爱慕推进到 4', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:306`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 5);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「魔王大人…哈啊…这个样子…真是像爱撒娇的孩子一样！嗯啊啊♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:306`), 4);
});

test('COM5 二回目：非助手玛奥 + B感覚Lv3以上推进到 3', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:306`, 1);
    f.store.set(`abl:${LILY}:1`, 3);
  }, 5);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「嗯啊啊…不，不要这么用力的玩我的…胸部…乳头才不是，不是因为舒服才挺起来的、你，你可不要误会了……嗯呜呜」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:306`), 3);
});

test('COM5 二回目：非助手玛奥 + それ以外推进到 2', async () => {
  const fixture = setup_lily((f) => {
    f.store.set('flag:7', 1); // 中和 || 口上开关===2 逃逸支
    f.store.set(`cflag:${LILY}:306`, 1);
  }, 5);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「无论你怎么弄，我，我也不会感觉舒服的…啊呒」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:306`), 2);
});
