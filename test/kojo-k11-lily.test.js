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

// —— SELECTCOM 6（接吻 CFLAG:307） ——

// 首吻（CFLAG:307 == 0 && TFLAG:13 初吻与自我口上）

test('COM6 首吻：淫乱且非助手陪玩', async () => {
  const fixture = setup_lily((f) => {
    f.store.set('tflag:13', 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 6);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「呣呣…呣呒…魔王大人…魔王大人…呣啾啾♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:307`), 1);
});

test('COM6 首吻：爱慕且非助手陪玩', async () => {
  const fixture = setup_lily((f) => {
    f.store.set('tflag:13', 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 6);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「呣呣呣呒…魔王大人？？呣啾啾♡」');
  assert.equal(fixture.store.get(`cflag:${LILY}:307`), 1);
});

test('COM6 首吻：助手玛奥 + 淫乱', async () => {
  const fixture = setup_lily((f, era_flag) => {
    f.store.set('tflag:13', 1);
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`talent:${LILY}:76`, 1);
  }, 6);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[1],
    '「呣呣呣、接吻舒服吧？这可是我的初吻哦…」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:307`), 1);
});

test('COM6 首吻：助手玛奥 + 爱慕', async () => {
  const fixture = setup_lily((f, era_flag) => {
    f.store.set('tflag:13', 1);
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`talent:${LILY}:85`, 1);
  }, 6);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[1],
    '「本来是想把初吻奉献给魔王大人的………（不过你的话也不是不行）」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:307`), 1);
});

test('COM6 首吻：助手玛奥 + それ以外', async () => {
  const fixture = setup_lily((f, era_flag) => {
    f.store.set('tflag:13', 1);
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
  }, 6);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '你刚刚把自己的嘴唇从莉莉的唇上挪开，却猛然发现莉莉正在不住地哭泣着。',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:307`), 1);
});

test('COM6 首吻：非助手玛奥 + それ以外', async () => {
  const fixture = setup_lily((f) => {
    f.store.set('tflag:13', 1);
  }, 6);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「我，我的…初吻…呜呜…呜呜呜…」');
  assert.equal(fixture.store.get(`cflag:${LILY}:307`), 1);
});

// 普通初めて（CFLAG:307 == 0，非首吻）

test('COM6 初めて：助手玛奥 + 淫乱', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`talent:${LILY}:76`, 1);
  }, 6);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '『最喜欢姐姐了♪』');
  assert.equal(fixture.store.get(`cflag:${LILY}:307`), 1);
});

test('COM6 初めて：助手玛奥 + 爱慕', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`talent:${LILY}:85`, 1);
  }, 6);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「不，不要啦，你…这种事…一点都不想做」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:307`), 1);
});

test('COM6 初めて：助手玛奥 + それ以外', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
  }, 6);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「不，不要啊…我们，是姐妹啊…！」');
  assert.equal(fixture.store.get(`cflag:${LILY}:307`), 1);
});

test('COM6 初めて：非助手玛奥 + 淫乱', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`talent:${LILY}:76`, 1);
  }, 6);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「呣呣呣…呣呒…魔王大人嘴里的味道…真好♡呣呣呣…」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:307`), 1);
});

test('COM6 初めて：非助手玛奥 + 爱慕', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`talent:${LILY}:85`, 1);
  }, 6);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「唔？！呣呣呒…魔，魔王大人…呣啾啾♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:307`), 1);
});

test('COM6 初めて：非助手玛奥 + それ以外', async () => {
  const fixture = setup_lily(null, 6);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「不，不要啊！放过我吧，求求你……呣呣呣…呣呒」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:307`), 1);
});

// 二回目以降

test('COM6 二回目：助手玛奥 + 淫乱推进到 5', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:307`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 6);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「呣呣…舌头进来了、呣呣呣…跟姐姐亲亲舒服吗？♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:307`), 5);
});

test('COM6 二回目：助手玛奥 + 爱慕推进到 4', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:307`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 6);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '『姐姐，好喜欢你…最喜欢了♪』');
  assert.equal(fixture.store.get(`cflag:${LILY}:307`), 4);
});

test('COM6 二回目：助手玛奥 + 従順Lv2以上推进到 3', async () => {
  const fixture = setup_lily((f, era_flag) => {
    f.store.set('flag:7', 1); // 中和 || 口上开关===2 逃逸支
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:307`, 1);
    f.store.set(`abl:${LILY}:10`, 2);
  }, 6);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '『来、姐姐，来亲亲♪』');
  assert.equal(fixture.store.get(`cflag:${LILY}:307`), 3);
});

test('COM6 二回目：助手玛奥 + 顺从恰为 Lv1（未达 Lv2）不误入従順分档', async () => {
  const fixture = setup_lily((f, era_flag) => {
    f.store.set('flag:7', 1); // 中和 || 口上开关===2 逃逸支
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:307`, 1);
    f.store.set(`abl:${LILY}:10`, 1);
  }, 6);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '『姐姐、来接吻吧？』');
  assert.equal(fixture.store.get(`cflag:${LILY}:307`), 2);
});

test('COM6 二回目：助手玛奥 + それ以外推进到 2', async () => {
  const fixture = setup_lily((f, era_flag) => {
    f.store.set('flag:7', 1); // 中和 || 口上开关===2 逃逸支
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:307`, 1);
  }, 6);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '『姐姐、来接吻吧？』');
  assert.equal(fixture.store.get(`cflag:${LILY}:307`), 2);
});

test('COM6 二回目：非助手玛奥 + 淫乱推进到 5', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:307`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 6);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「吻我…魔王大人…呣呣…呣呒……再激烈一点…我想品尝魔王大人的，呣呣…呣呒，味道♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:307`), 5);
});

test('COM6 二回目：非助手玛奥 + 爱慕推进到 4', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:307`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 6);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「唔——呣呣呒…魔，魔王大人…呣啾啾♡」');
  assert.equal(fixture.store.get(`cflag:${LILY}:307`), 4);
});

test('COM6 二回目：非助手玛奥 + 従順Lv2以上推进到 3', async () => {
  const fixture = setup_lily((f) => {
    f.store.set('flag:7', 1); // 中和 || 口上开关===2 逃逸支
    f.store.set(`cflag:${LILY}:307`, 1);
    f.store.set(`abl:${LILY}:10`, 2);
  }, 6);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「呣呣…呣嗯…哈啊，终，终于结束了吗…」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:307`), 3);
});

test('COM6 二回目：非助手玛奥 + それ以外推进到 2', async () => {
  const fixture = setup_lily((f) => {
    f.store.set('flag:7', 1); // 中和 || 口上开关===2 逃逸支
    f.store.set(`cflag:${LILY}:307`, 1);
  }, 6);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「这样…就行了吧？可以…放我走了吗？」');
  assert.equal(fixture.store.get(`cflag:${LILY}:307`), 2);
});

// —— SELECTCOM 7（自己扒开 CFLAG:308） ——

// 初めて（CFLAG:308 == 0）

test('COM7 初めて：助手玛奥 + 淫乱', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`talent:${LILY}:76`, 1);
  }, 7);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「啊啊…还是有点害羞呢♡ 为什么老是要这么欺负姐姐呢♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:308`), 1);
});

test('COM7 初めて：助手玛奥 + 爱慕', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`talent:${LILY}:85`, 1);
  }, 7);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「啊啊…这样真是…太羞耻、饶了姐姐吧…」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:308`), 1);
});

test('COM7 初めて：助手玛奥 + それ以外', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
  }, 7);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『哎呀，姐姐，在人家面前摆出这么淫荡的姿势，不觉得害羞吗？』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:308`), 1);
});

test('COM7 初めて：非助手玛奥 + 淫乱 + 处女', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set(`talent:${LILY}:0`, 1);
  }, 7);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[2],
    '「这个处女膜是为魔王大人保留的，但是也别让我等太久了……否则♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:308`), 1);
});

test('COM7 初めて：非助手玛奥 + 爱慕 + 非处女', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`talent:${LILY}:85`, 1);
  }, 7);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[2],
    '「莉莉的这里…是属于魔王大人专用的…啊啊啊…♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:308`), 1);
});

test('COM7 初めて：非助手玛奥 + それ以外', async () => {
  const fixture = setup_lily(null, 7);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「这种，这种事情实在太…羞耻…呜呜呜！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:308`), 1);
});

// 二回目以降

test('COM7 二回目：助手玛奥 + 淫乱 + 处女推进到 5', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:308`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set(`talent:${LILY}:0`, 1);
  }, 7);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「哈啊，能看见吗，你，看见姐姐淫荡的蜜穴了吗？」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:308`), 5);
});

test('COM7 二回目：助手玛奥 + 爱慕 + 非处女 + 露出癖Lv3以上推进到 4', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:308`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
    f.store.set(`abl:${LILY}:17`, 3);
  }, 7);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「太，太羞耻了！这个样子…呜呜呜…」');
  assert.equal(
    fixture.text_lines()[3],
    '『明明很享受被我和魔王大人视奸嘛，看，着淫荡的蜜穴都湿成这个样子了！说谎是不行的哦姐姐♪』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:308`), 4);
});

test('COM7 二回目：助手玛奥 + 爱慕 + 处女 + 露出癖恰为 Lv2（未达 Lv3）不误入爱液满溢分支', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:308`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
    f.store.set(`talent:${LILY}:0`, 1);
    f.store.set(`abl:${LILY}:17`, 2);
  }, 7);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[4],
    '莉莉被你强行分开大腿，捂着脸发出羞愧的声音………',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:308`), 4);
});

test('COM7 二回目：助手玛奥 + 露出癖恰为 Lv2（未达 Lv3）不误入露出癖分档', async () => {
  const fixture = setup_lily((f, era_flag) => {
    f.store.set('flag:7', 1); // 中和 || 口上开关===2 逃逸支
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:308`, 1);
    f.store.set(`abl:${LILY}:17`, 2);
  }, 7);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「这样…这样可以了吗…可以放过我了吧…呜呜」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:308`), 2);
});

test('COM7 二回目：助手玛奥 + 露出癖Lv3以上 + 处女推进到 3', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:308`, 1);
    f.store.set(`abl:${LILY}:17`, 3);
    f.store.set(`talent:${LILY}:0`, 1);
  }, 7);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「啊啊…这个姿势…能全部看清楚了吗？」');
  assert.equal(
    fixture.text_lines()[5],
    '『姐姐的蜜穴好色情，好有诱惑力啊。魔王大人居然还没有侵犯过姐姐这里。如果我是男人的话一定早就………』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:308`), 3);
});

test('COM7 二回目：助手玛奥 + それ以外 + 非处女推进到 2', async () => {
  const fixture = setup_lily((f, era_flag) => {
    f.store.set('flag:7', 1); // 中和 || 口上开关===2 逃逸支
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:308`, 1);
  }, 7);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「这样…这样可以了吗…可以放过我了吧…呜呜」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:308`), 2);
});

test('COM7 二回目：非助手玛奥 + 淫乱 + 非处女推进到 5', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:308`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 7);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「哈啊…这个姿势就能全部看清了吧………♡」',
  );
  assert.equal(
    fixture.text_lines()[2],
    '「莉莉的淫荡蜜穴，现在最想要的…是魔王大人的阴茎和精液哦♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:308`), 5);
});

test('COM7 二回目：非助手玛奥 + 爱慕 + 处女推进到 4', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:308`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
    f.store.set(`talent:${LILY}:0`, 1);
  }, 7);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「魔，魔王大人，请…看个够吧…♡」');
  assert.equal(
    fixture.text_lines()[2],
    '「我的处女膜，魔王大人觉得漂，漂亮吗？啊啊啊，说这种话好羞耻！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:308`), 4);
});

test('COM7 二回目：非助手玛奥 + 露出癖恰为 Lv2（未达 Lv3）不误入露出癖分档', async () => {
  const fixture = setup_lily((f) => {
    f.store.set('flag:7', 1); // 中和 || 口上开关===2 逃逸支
    f.store.set(`cflag:${LILY}:308`, 1);
    f.store.set(`abl:${LILY}:17`, 2);
  }, 7);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「人家的这里…到底有什么好看的…要看那么多遍！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:308`), 2);
});

test('COM7 二回目：非助手玛奥 + 露出癖Lv3以上 + 非处女推进到 3', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:308`, 1);
    f.store.set(`abl:${LILY}:17`, 3);
  }, 7);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「羞，羞死人了…这个姿势…实在太羞耻了！可是…为什么手指…就是挪不开…哈啊」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:308`), 3);
});

test('COM7 二回目：非助手玛奥 + それ以外 + 处女推进到 2', async () => {
  const fixture = setup_lily((f) => {
    f.store.set('flag:7', 1); // 中和 || 口上开关===2 逃逸支
    f.store.set(`cflag:${LILY}:308`, 1);
    f.store.set(`talent:${LILY}:0`, 1);
  }, 7);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「人家的这里…到底有什么好看的…要看那么多遍！」',
  );
  assert.equal(
    fixture.text_lines()[2],
    '「处女膜也看见了吧？…这样好了吧…你还想要怎么样！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:308`), 2);
});

test('COM8 初めて：助手玛奥推进到 1', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
  }, 8);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「不，不要啊…停下…好痛啊啊！」');
  assert.equal(
    fixture.text_lines()[1],
    '『我的手指插进去了哦姐姐！怎么用，感觉舒服吗？』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:309`), 1);
});

test('COM8 初めて：非助手玛奥 + 淫乱推进到 1', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`talent:${LILY}:76`, 1);
  }, 8);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「哈啊♡ 感觉到了，你湿漉漉的手指♡」');
  assert.equal(fixture.store.get(`cflag:${LILY}:309`), 1);
});

test('COM8 初めて：非助手玛奥 + 屈服刻印Lv3+爱慕推进到 1', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`mark:${LILY}:2`, 3);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 8);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「魔王大人的话…想怎么做什么都可以…嗯啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:309`), 1);
});

test('COM8 初めて：非助手玛奥 + それ以外推进到 1', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`mark:${LILY}:2`, 0);
  }, 8);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「啊啊啊！不，不要那么粗暴啊、会痛的！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:309`), 1);
});

test('COM8 二回目：助手玛奥 + 淫乱推进到 5', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:309`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 8);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「哈啊……请尽情地欺负…姐姐淫荡的蜜穴吧…嗯啊 ♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:309`), 5);
});

test('COM8 二回目：助手玛奥 + 爱慕＋屈服刻印Lv3推进到 4', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:309`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
    f.store.set(`mark:${LILY}:2`, 3);
  }, 8);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「再，再稍微，温柔一点…嗯啊啊！」');
  assert.equal(fixture.store.get(`cflag:${LILY}:309`), 4);
});

test('COM8 二回目：助手玛奥 + 屈服刻印Lv3推进到 3', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:309`, 1);
    f.store.set(`mark:${LILY}:2`, 3);
  }, 8);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『姐姐变得老实得多了呢，是感觉到快感了吧？』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:309`), 3);
});

test('COM8 二回目：助手玛奥 + それ以外推进到 2', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:309`, 1);
    f.store.set(`mark:${LILY}:2`, 0);
  }, 8);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「住手，住手啊…啊啊啊！」');
  assert.equal(fixture.store.get(`cflag:${LILY}:309`), 2);
});

test('COM8 二回目：非助手玛奥 + 淫乱推进到 5', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:309`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 8);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「哈啊♡ 蜜穴都湿透了，都是因为你♡嗯啊」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:309`), 5);
});

test('COM8 二回目：非助手玛奥 + 爱慕＋屈服刻印Lv3推进到 4', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:309`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
    f.store.set(`mark:${LILY}:2`, 3);
  }, 8);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「魔，魔王大人的话…想怎么玩莉莉的那里…哈啊…都可以…嗯啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:309`), 4);
});

test('COM8 二回目：非助手玛奥 + 屈服刻印Lv3推进到 3', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:309`, 1);
    f.store.set(`mark:${LILY}:2`, 3);
  }, 8);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「还要再这样弄多久？什么时候…可以结束？嗯啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:309`), 3);
});

test('COM8 二回目：非助手玛奥 + それ以外推进到 2', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:309`, 1);
    f.store.set(`mark:${LILY}:2`, 0);
  }, 8);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「呜啊！这么粗暴的动作…讨厌死了！啊啊啊」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:309`), 2);
});

test('COM9 初めて：助手玛奥推进到 1', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
  }, 9);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『哇，姐姐的肛门粉粉嫩嫩的，真好看，这次换妹妹来侍奉姐姐一下♡』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:310`), 1);
});

test('COM9 初めて：非助手玛奥 + 淫乱推进到 1', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`talent:${LILY}:76`, 1);
  }, 9);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「真是的！连那种地方也要舔，你真是变态！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:310`), 1);
});

test('COM9 初めて：非助手玛奥 + 爱慕推进到 1', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`talent:${LILY}:85`, 1);
  }, 9);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「不，不要舔那里，那里太…肮脏了啊！呜呜…嗯啊啊」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:310`), 1);
});

test('COM9 初めて：非助手玛奥 + それ以外推进到 1', async () => {
  const fixture = setup_lily(() => {}, 9);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「为，为什么要舔这种地方！好脏的！不要那样啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:310`), 1);
});

test('COM9 二回目：助手玛奥 + 淫乱推进到 5', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:310`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 9);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「啊啊啊…继续，继续舔，你、把舌头伸进里面舔♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:310`), 5);
});

test('COM9 二回目：助手玛奥 + 爱慕推进到 4', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:310`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 9);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「啊啊…这样太羞耻了…快停下，你…嗯啊啊」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:310`), 4);
});

test('COM9 二回目：助手玛奥 + 屈服刻印Lv3推进到 3', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:310`, 1);
    f.store.set(`mark:${LILY}:2`, 3);
  }, 9);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「呃啊啊…姐姐一点都不觉得舒服…快，快点结束啦…嗯啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:310`), 3);
});

test('COM9 二回目：助手玛奥 + それ以外推进到 2', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:310`, 1);
  }, 9);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『姐姐的屁股再放松一点啦，妹妹的舌头都进不去，以后怎么接纳魔王大人的……嘻嘻♪』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:310`), 2);
});

test('COM9 二回目：非助手玛奥 + 淫乱推进到 5', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:310`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 9);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「啊啊…魔王大人真是变态…喜欢…舔人家的肛门♡哈啊」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:310`), 5);
});

test('COM9 二回目：非助手玛奥 + 爱慕推进到 4', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:310`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 9);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「魔，魔王大人，怎么能让你…做…做这种事！真是…嗯啊啊」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:310`), 4);
});

test('COM9 二回目：非助手玛奥 + 屈服刻印Lv3推进到 3', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:310`, 1);
    f.store.set(`mark:${LILY}:2`, 3);
  }, 9);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「啊啊…可以快，快点结束吗…嗯啊啊！」');
  assert.equal(fixture.store.get(`cflag:${LILY}:310`), 3);
});

test('COM9 二回目：非助手玛奥 + それ以外推进到 2', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:310`, 1);
  }, 9);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「都说不要啊啊！那种肮脏的地方！」');
  assert.equal(fixture.store.get(`cflag:${LILY}:310`), 2);
});

test('COM10 初めて：助手玛奥推进到 1', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
  }, 10);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『这种震动玩具，很容易上瘾的哦，姐姐～♪』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:311`), 1);
});

test('COM10 初めて：非助手玛奥 + 淫乱推进到 1', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`talent:${LILY}:76`, 1);
  }, 10);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「啊啊，这样的震动…真让人…欲仙欲死♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:311`), 1);
});

test('COM10 初めて：非助手玛奥 + 屈服刻印Lv3+爱慕推进到 1', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`mark:${LILY}:2`, 3);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 10);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「呜啊！这，这是什么？啊啊啊震得太…太厉害了！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:311`), 1);
});

test('COM10 初めて：非助手玛奥 + それ以外推进到 1', async () => {
  const fixture = setup_lily(() => {}, 10);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「呃？这、这是什么！？快拿开，好难受！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:311`), 1);
});

test('COM10 二回目：助手玛奥 + 淫乱推进到 5', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:311`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 10);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『这么简单的道具就能让姐姐舒服成这个样子，姐姐的身体，已经完全变得淫乱了呢♡』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:311`), 5);
});

test('COM10 二回目：助手玛奥 + 爱慕＋屈服刻印Lv3推进到 4', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:311`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
    f.store.set(`mark:${LILY}:2`, 3);
  }, 10);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「真，真是的！为什么老要对姐姐、做，做恶作剧…嗯啊啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:311`), 4);
});

test('COM10 二回目：助手玛奥 + 屈服刻印Lv3推进到 3', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:311`, 1);
    f.store.set(`mark:${LILY}:2`, 3);
  }, 10);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『姐姐变得老实多了呢，是不是已经有快感了？』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:311`), 3);
});

test('COM10 二回目：助手玛奥 + それ以外推进到 2', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:311`, 1);
  }, 10);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『你看，很舒服吧？姐姐老实点不要乱动啊』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:311`), 2);
});

test('COM10 二回目：非助手玛奥 + 淫乱推进到 5', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:311`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 10);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「呜啊啊！好舒服……小豆豆…好舒服！哈啊…嗯啊啊♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:311`), 5);
});

test('COM10 二回目：非助手玛奥 + 爱慕＋屈服刻印Lv3推进到 4', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:311`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
    f.store.set(`mark:${LILY}:2`, 3);
  }, 10);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「哈…啊…不，不需要那种东西啦…我，我更想要你的手指…嗯啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:311`), 4);
});

test('COM10 二回目：非助手玛奥 + 屈服刻印Lv3推进到 3', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:311`, 1);
    f.store.set(`mark:${LILY}:2`, 3);
  }, 10);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「呜呜！又，又是这个！关掉，关掉啊…呜啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:311`), 3);
});

test('COM10 二回目：非助手玛奥 + それ以外推进到 2', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:311`, 1);
  }, 10);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「住，住手啊…！这种东西…！呜呜呜！」');
  assert.equal(fixture.store.get(`cflag:${LILY}:311`), 2);
});

test('COM11 初めて（TEQUIP:11）：处女 + 助手玛奥 + 淫乱', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:11`, 1);
    f.store.set(`talent:${LILY}:0`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 11);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『哎哎，姐姐真可怜呢，明明更想把处女留给魔王大人对吧♪可惜再也不可能了呢。』',
  );
  assert.equal(
    fixture.text_lines()[3],
    '「哈啊，啊啊啊…虽说是这样…但是…还是…很舒服啊♡哈……」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:312`), 1);
});

test('COM11 初めて：处女 + 助手玛奥 + 爱慕', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:11`, 1);
    f.store.set(`talent:${LILY}:0`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 11);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[3],
    '「你，你明明知道我的心情！为什么还要…还要说这么残酷的话？！把它拔出去，拔出去啊！求求你………」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:312`), 1);
});

test('COM11 初めて：处女 + 助手玛奥 + それ以外', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:11`, 1);
    f.store.set(`talent:${LILY}:0`, 1);
  }, 11);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[3],
    '「啊啊啊…好痛…好痛啊…为什么要对姐姐做这么残忍的事！！你，你原来不是这样的人啊……！呜呜呜…」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:312`), 1);
});

test('COM11 初めて：处女 + 非助手玛奥 + 淫乱', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:11`, 1);
    f.store.set(`talent:${LILY}:0`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 11);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「啊啊啊！钻进，进来了…我的处女…居然给了这么一个东西…♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:312`), 1);
});

test('COM11 初めて：处女 + 非助手玛奥 + 爱慕', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:11`, 1);
    f.store.set(`talent:${LILY}:0`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 11);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「这是…对我的惩罚吗？魔王大人…我甘心受罚啊啊啊！好痛！好痛啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:312`), 1);
});

test('COM11 初めて：处女 + 非助手玛奥 + それ以外', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:11`, 1);
    f.store.set(`talent:${LILY}:0`, 1);
  }, 11);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「不要不要不要啊…拔出去拔出去——啊啊啊好痛，好痛啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:312`), 1);
});

test('COM11 初めて：非处女 + 助手玛奥', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:11`, 1);
  }, 11);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『啊哈哈、姐姐看，虫子从你下面钻进去了♪』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:312`), 1);
});

test('COM11 初めて：非处女 + 非助手玛奥 + 淫乱', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:11`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 11);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「哈啊，钻，钻进去了…呃啊…啊啊！」');
  assert.equal(fixture.store.get(`cflag:${LILY}:312`), 1);
});

test('COM11 初めて：非处女 + 非助手玛奥 + それ以外', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:11`, 1);
  }, 11);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「要，要让这样的东西进去…不，不，不要啊，这样的调教…求求你！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:312`), 1);
});

test('COM11 二回目：助手玛奥 + 淫乱推进到 5', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:11`, 1);
    f.store.set(`cflag:${LILY}:312`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 11);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『姐姐，告诉我，被蠕虫插进去舒服还是被阴茎插进去舒服些？』',
  );
  assert.equal(
    fixture.text_lines()[1],
    '「哎呀呀…这样的问题怎么回答呢…哪种东西在姐姐的蜜穴里，就是哪种更舒服…所以，现在当然是虫子啦♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:312`), 5);
});

test('COM11 二回目：助手玛奥 + 爱慕推进到 4', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:11`, 1);
    f.store.set(`cflag:${LILY}:312`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 11);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[1],
    '「哎，哎…这种问题怎么回答的出口！啊啊啊，不要让它……爬太深进去啊啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:312`), 4);
});

test('COM11 二回目：助手玛奥 + V感覚Lv3以上推进到 3', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:11`, 1);
    f.store.set(`cflag:${LILY}:312`, 1);
    f.store.set(`abl:${LILY}:2`, 3);
  }, 11);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『哎呀，姐姐一副口水都要流出来了的表情呢，真的有那么舒服吗♡虫子已经要全部爬进去了哦哦』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:312`), 3);
});

test('COM11 二回目：助手玛奥 + それ以外推进到 2', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:11`, 1);
    f.store.set(`cflag:${LILY}:312`, 1);
  }, 11);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『姐姐，开始习惯虫子在蜜穴里爬爬的感觉了吗？』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:312`), 2);
});

test('COM11 二回目：非助手玛奥 + 淫乱推进到 5', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:11`, 1);
    f.store.set(`cflag:${LILY}:312`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 11);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「哈啊…啊！蜜穴被虫子…！啊啊…好…好舒服♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:312`), 5);
});

test('COM11 二回目：非助手玛奥 + 爱慕推进到 4', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:11`, 1);
    f.store.set(`cflag:${LILY}:312`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 11);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「哈啊…啊！进，进去了…虫子…蜜穴里…嗯啊啊」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:312`), 4);
});

test('COM11 二回目：非助手玛奥 + V感覚Lv3以上推进到 3', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:11`, 1);
    f.store.set(`cflag:${LILY}:312`, 1);
    f.store.set(`abl:${LILY}:2`, 3);
  }, 11);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「这，这种东西钻进去…不会感觉到舒服的啦啊啊啊…哈啊…嗯啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:312`), 3);
});

test('COM11 二回目：非助手玛奥 + それ以外推进到 2', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:11`, 1);
    f.store.set(`cflag:${LILY}:312`, 1);
  }, 11);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「慢，慢一点…稍微…温柔一些不行吗！不…不要再进来了啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:312`), 2);
});

test('COM11 脱着時（TEQUIP:11 == 0）：淫乱推进到 3', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`talent:${LILY}:76`, 1);
  }, 11);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「哎，哎哎…虫子出去后，莉莉的蜜穴好寂寞哦♡，魔王大人」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:372`), 3);
});

test('COM11 脱着時：爱慕推进到 2', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`talent:${LILY}:85`, 1);
  }, 11);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「哈…呼…呼呼…接，接下来，魔王大人♡？」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:372`), 2);
});

test('COM11 脱着時：それ以外推进到 1', async () => {
  const fixture = setup_lily(() => {}, 11);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「突，突然拔出去…会，会痛的…啊，哈啊，为什么…有一种空虚的感觉……」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:372`), 1);
});

test('COM12 初めて：助手玛奥推进到 1', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
  }, 12);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『这个震动起来很厉害的哦，不知道姐姐能坚持多久呢♪』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:313`), 1);
});

test('COM12 初めて：非助手玛奥 + 淫乱推进到 1', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`talent:${LILY}:76`, 1);
  }, 12);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「啊啊啊…这个震动的频率…太，太快……啊啊啊…好…好舒服啊…♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:313`), 1);
});

test('COM12 初めて：非助手玛奥 + 爱慕推进到 1', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`talent:${LILY}:85`, 1);
  }, 12);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「这，这是？！这种东西不是用来按摩肩膀的——啊啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:313`), 1);
});

test('COM12 初めて：非助手玛奥 + それ以外推进到 1', async () => {
  const fixture = setup_lily(() => {}, 12);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「这，这是什么？！好痒，好痒，哈…啊哈，拿开啊…嗯啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:313`), 1);
});

test('COM12 二回目：助手玛奥 + 淫乱推进到 5', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:313`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 12);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「啊啊啊…姐姐…要上天了…哈啊♡ 实在是……太棒了♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:313`), 5);
});

test('COM12 二回目：助手玛奥 + 爱慕推进到 4', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:313`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 12);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「哈…啊…又是这个！快，快拿开啊，姐姐怕痒啊啊啊…呼…呼…呃啊啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:313`), 4);
});

test('COM12 二回目：助手玛奥 + 屈服刻印Lv3推进到 3', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:313`, 1);
    f.store.set(`mark:${LILY}:2`, 3);
  }, 12);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『姐姐也开始露出舒服和享受的表情了呢，真是可爱～』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:313`), 3);
});

test('COM12 二回目：助手玛奥 + それ以外推进到 2', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:313`, 1);
  }, 12);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『哎呀呀，姐姐，怎么老乱动哦，又想要我惩罚你了吗♪』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:313`), 2);
});

test('COM12 二回目：非助手玛奥 + 淫乱推进到 5', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:313`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 12);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「啊啊啊…这个感觉…好棒呃啊啊…简直太舒服了嗯啊啊啊…♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:313`), 5);
});

test('COM12 二回目：非助手玛奥 + 爱慕推进到 4', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:313`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 12);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「啊啊啊…太…太激烈了…嗯啊啊…哈…哈…呃啊啊啊♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:313`), 4);
});

test('COM12 二回目：非助手玛奥 + 屈服刻印Lv3推进到 3', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:313`, 1);
    f.store.set(`mark:${LILY}:2`, 3);
  }, 12);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「不，不行啊…再继续就…就啊啊…哈啊…哈啊…！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:313`), 3);
});

test('COM12 二回目：非助手玛奥 + それ以外推进到 2', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:313`, 1);
  }, 12);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「呃啊啊啊！停，停下啊！把它拿开啊啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:313`), 2);
});

test('COM13 初めて（TEQUIP:13）：助手玛奥推进到 1', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:13`, 1);
  }, 13);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『接下来这个，姐姐一定会喜欢的，嘿嘿嘿、放松，放松………』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:314`), 1);
});

test('COM13 初めて：非助手玛奥 + 淫乱推进到 1', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:13`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 13);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「哈啊…哈啊………肛门要被这样的东西侵犯了………这个感觉…嗯啊啊♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:314`), 1);
});

test('COM13 初めて：非助手玛奥 + 爱慕推进到 1', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:13`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 13);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「如果…如果是魔王大人希望这样的话…我会…我会…呃呃…呃嗯…」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:314`), 1);
});

test('COM13 初めて：それ以外 + A感覚Lv3以上推进到 1', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:13`, 1);
    f.store.set(`abl:${LILY}:3`, 3);
  }, 13);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「这，这种东西……不行不行不行啊！屁股里不可能容纳得了的啊！啊啊…呃呃啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:314`), 1);
});

test('COM13 初めて：それ以外 + それ以外推进到 1', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:13`, 1);
  }, 13);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「不，不要啊！屁股…怎么能让这种东西进去啊啊！呃啊啊啊…拿掉啊…拿掉啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:314`), 1);
});

test('COM13 二回目：助手玛奥 + 淫乱＋A感覚Lv3以上推进到 6', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:13`, 1);
    f.store.set(`cflag:${LILY}:314`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set(`abl:${LILY}:3`, 3);
  }, 13);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「哈啊…哈啊！虫子…完全进去了♡ 哈啊…呀呀…呀啊啊…姐姐的肛门……舒服得…要说不出话来了！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:314`), 6);
});

test('COM13 二回目：助手玛奥 + 淫乱推进到 6', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:13`, 1);
    f.store.set(`cflag:${LILY}:314`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 13);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「哎…哎哟…稍微，稍微温柔一点啦…哈啊…啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:314`), 6);
});

test('COM13 二回目：助手玛奥 + 爱慕＋A感覚Lv3以上推进到 5', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:13`, 1);
    f.store.set(`cflag:${LILY}:314`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
    f.store.set(`abl:${LILY}:3`, 3);
  }, 13);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「啊……哈啊…稍微…稍微慢一点…这样，这样就已经很舒服了！不，不需要再深入了！啊哈…啊啊…呀啊啊」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:314`), 5);
});

test('COM13 二回目：助手玛奥 + 爱慕推进到 4', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:13`, 1);
    f.store.set(`cflag:${LILY}:314`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 13);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「饶，饶了我吧，不要再欺负姐姐了…这样的东西…真的…不喜啊啊啊…啊哈…啊…！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:314`), 4);
});

test('COM13 二回目：助手玛奥 + A感覚Lv3以上推进到 3', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:13`, 1);
    f.store.set(`cflag:${LILY}:314`, 1);
    f.store.set(`abl:${LILY}:3`, 3);
  }, 13);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「哈…哈啊…进，进来…不，不可以…哈啊…呀呀…呀啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:314`), 3);
});

test('COM13 二回目：助手玛奥 + それ以外推进到 2', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:13`, 1);
    f.store.set(`cflag:${LILY}:314`, 1);
  }, 13);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「好痛…好痛…好难受啊啊啊！快把它拿掉，姐姐求求你了！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:314`), 2);
});

test('COM13 二回目：非助手玛奥 + 淫乱＋A感覚Lv3以上推进到 6', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:13`, 1);
    f.store.set(`cflag:${LILY}:314`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set(`abl:${LILY}:3`, 3);
  }, 13);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「哈…哈啊♡ 全部，全部进到肛门里面了♡ 啊哈…啊啊…舒服得…要说不出话了♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:314`), 6);
});

test('COM13 二回目：非助手玛奥 + 淫乱推进到 6', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:13`, 1);
    f.store.set(`cflag:${LILY}:314`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 13);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「哈啊…再，再稍微温柔一些…还是有点…哈啊，啊啊♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:314`), 6);
});

test('COM13 二回目：非助手玛奥 + 爱慕＋A感覚Lv3以上推进到 5', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:13`, 1);
    f.store.set(`cflag:${LILY}:314`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
    f.store.set(`abl:${LILY}:3`, 3);
  }, 13);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「哈啊，呼呼…整，整只都钻，钻进去了…啊哈…啊啊…舒服得…要说不出话了♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:314`), 5);
});

test('COM13 二回目：非助手玛奥 + 爱慕推进到 4', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:13`, 1);
    f.store.set(`cflag:${LILY}:314`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 13);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「呃…还，还是有点害怕，但如果是魔王大人的要求的话…我会，我会——嗯啊啊啊…啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:314`), 4);
});

test('COM13 二回目：非助手玛奥 + A感覚Lv3以上推进到 3', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:13`, 1);
    f.store.set(`cflag:${LILY}:314`, 1);
    f.store.set(`abl:${LILY}:3`, 3);
  }, 13);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「哈啊，呼呼…整，整只都钻，钻进去了…啊哈…啊啊♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:314`), 3);
});

test('COM13 二回目：非助手玛奥 + それ以外推进到 2', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:13`, 1);
    f.store.set(`cflag:${LILY}:314`, 1);
  }, 13);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「啊啊啊！不要啊！求求你，不要让这东西进来啊！求求你，求求你！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:314`), 2);
});

test('COM13 脱着時（TEQUIP:13 == 0）：淫乱推进到 4', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`talent:${LILY}:76`, 1);
  }, 13);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「哎啊啊！真，真是的，不要拔得那么快………」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:374`), 4);
});

test('COM13 脱着時：爱慕推进到 3', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`talent:${LILY}:85`, 1);
  }, 13);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「呼…呼呼…下次…魔王大人…可以再温柔一点吗？」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:374`), 3);
});

test('COM13 脱着時：A感覚Lv3以上推进到 2', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`abl:${LILY}:3`, 3);
  }, 13);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「哈啊…啊啊…屁股感觉，好空虚………」');
  assert.equal(fixture.store.get(`cflag:${LILY}:374`), 2);
});

test('COM13 脱着時：それ以外推进到 1', async () => {
  const fixture = setup_lily(() => {}, 13);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「啊…啊…屁股…会坏掉的……」');
  assert.equal(fixture.store.get(`cflag:${LILY}:374`), 1);
});

test('COM14 初めて：助手玛奥推进到 1', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:14`, 1);
  }, 14);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『嘿嘿，姐姐来戴上这个可爱的饰品吧，保证让姐姐你舒服得上天哦！』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:315`), 1);
});

test('COM14 初めて：非助手玛奥 + 淫乱推进到 1', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:14`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 14);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「啊哈…嗯啊啊啊啊♡ 这个小玩意，怎么这么…呃啊啊♡ 舒服啊啊啊♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:315`), 1);
});

test('COM14 初めて：非助手玛奥 + 爱慕推进到 1', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:14`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 14);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「啊啊？！这…这是什么…额啊啊……太，太激烈了，魔王大人…能不能稍微…呃啊啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:315`), 1);
});

test('COM14 初めて：それ以外推进到 1', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:14`, 1);
  }, 14);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「呃呃？！这…这东西是什么嗯啊啊啊？！太……太激烈…那里承受，承受不了的啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:315`), 1);
});

test('COM14 二回目：助手玛奥 + 淫乱推进到 4', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:14`, 1);
    f.store.set(`cflag:${LILY}:315`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 14);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「哈啊…啊啊、还能不能…开得再强烈…一点点…啊啊…哈啊♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:315`), 4);
});

test('COM14 二回目：助手玛奥 + 爱慕推进到 3', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:14`, 1);
    f.store.set(`cflag:${LILY}:315`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 14);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「哈啊…啊啊，这，这样就行了…不要再…加强了！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:315`), 3);
});

test('COM14 二回目：助手玛奥 + それ以外推进到 2', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:14`, 1);
    f.store.set(`cflag:${LILY}:315`, 1);
  }, 14);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「呃啊啊…拿，拿掉它啊…姐姐求求你了…」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:315`), 2);
});

test('COM14 二回目：非助手玛奥 + 淫乱推进到 4', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:14`, 1);
    f.store.set(`cflag:${LILY}:315`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 14);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「哈…哈啊…又是这个♡ 阴蒂感觉…太棒了啊啊…整个人都要…嗯啊啊啊♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:315`), 4);
});

test('COM14 二回目：非助手玛奥 + 爱慕推进到 3', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:14`, 1);
    f.store.set(`cflag:${LILY}:315`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 14);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「请、请魔王大人随意调教…莉莉的阴蒂…嗯啊啊…啊啊♡…震动…太强了…整个人好像都要…融化了♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:315`), 3);
});

test('COM14 二回目：非助手玛奥 + それ以外推进到 2', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:14`, 1);
    f.store.set(`cflag:${LILY}:315`, 1);
  }, 14);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「呃啊啊！太…太强烈了啊啊…调弱一点…求求你！呜啊啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:315`), 2);
});

test('COM14 脱着時（TEQUIP:14 == 0）：淫乱推进到 3', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`talent:${LILY}:76`, 1);
  }, 14);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「哎，哎，不用急着取下来嘛……」');
  assert.equal(fixture.store.get(`cflag:${LILY}:375`), 3);
});

test('COM14 脱着時：爱慕推进到 2', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`talent:${LILY}:85`, 1);
  }, 14);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「哈…哈…身体还有点…有点…」');
  assert.equal(fixture.store.get(`cflag:${LILY}:375`), 2);
});

test('COM14 脱着時：それ以外推进到 1', async () => {
  const fixture = setup_lily(() => {}, 14);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「终于…结束了吗…」');
  assert.equal(fixture.store.get(`cflag:${LILY}:375`), 1);
});

test('COM15 初めて：助手玛奥推进到 1', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:15`, 1);
  }, 15);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『接下来就让姐姐的乳头和这个新玩具合体吧、魔王大人会喜欢姐姐这个样子的哦♪』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:316`), 1);
});

test('COM15 初めて：非助手玛奥 + 淫乱推进到 1', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:15`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 15);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「哈啊…啊啊♡ 这个是…？夹在乳头上…感觉还挺合适的…♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:316`), 1);
});

test('COM15 初めて：非助手玛奥 + 爱慕推进到 1', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:15`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 15);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「哈，哈啊…这个…还会震动的…不过，好，好舒服…呼，呼，魔王大人…我这样…好看吗♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:316`), 1);
});

test('COM15 初めて：それ以外推进到 1', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:15`, 1);
  }, 15);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「这…这是什么啊啊…乳，乳头会坏掉的！拿下来，拿下来呃啊啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:316`), 1);
});

test('COM15 二回目：助手玛奥 + 淫乱推进到 4', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:15`, 1);
    f.store.set(`cflag:${LILY}:316`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 15);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『很般配哦，姐姐粉红色的乳头，戴上这个夹子后更色情了♪』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:316`), 4);
});

test('COM15 二回目：助手玛奥 + 爱慕推进到 3', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:15`, 1);
    f.store.set(`cflag:${LILY}:316`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 15);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『这可是魔王大人赏赐的饰品哦，姐姐还不高高兴兴地戴上♡』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:316`), 3);
});

test('COM15 二回目：助手玛奥 + それ以外推进到 2', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:15`, 1);
    f.store.set(`cflag:${LILY}:316`, 1);
  }, 15);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『今天也继续用这个来调教，开发姐姐的乳头吧♡』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:316`), 2);
});

test('COM15 二回目：非助手玛奥 + 淫乱推进到 4', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:15`, 1);
    f.store.set(`cflag:${LILY}:316`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 15);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「啊啊…嗯啊啊♡ 我的乳头…要是坏掉了…你可要…负责人…哈啊…啊啊啊♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:316`), 4);
});

test('COM15 二回目：非助手玛奥 + 爱慕推进到 3', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:15`, 1);
    f.store.set(`cflag:${LILY}:316`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 15);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「莉莉更…更希望魔王大人亲自…用嘴…和手指…调教…疼爱莉莉的乳头♡，这，这种道具…根本比不上…啊啊啊…哈啊」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:316`), 3);
});

test('COM15 二回目：非助手玛奥 + それ以外推进到 2', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:15`, 1);
    f.store.set(`cflag:${LILY}:316`, 1);
  }, 15);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「不要，不要啊啊 ！好难受……好难受…乳头…会坏掉的啊啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:316`), 2);
});

test('COM15 脱着時（TEQUIP:15 == 0）：淫乱推进到 3', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`talent:${LILY}:76`, 1);
  }, 15);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「哈…哈啊…乳头…变得越来越敏感了…♡」');
  assert.equal(fixture.store.get(`cflag:${LILY}:376`), 3);
});

test('COM15 脱着時：爱慕推进到 2', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`talent:${LILY}:85`, 1);
  }, 15);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「夹子拿掉后…乳头还是有点…痛…」');
  assert.equal(fixture.store.get(`cflag:${LILY}:376`), 2);
});

test('COM15 脱着時：それ以外推进到 1', async () => {
  const fixture = setup_lily(() => {}, 15);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「啊啊啊…乳头肿起来了……」');
  assert.equal(fixture.store.get(`cflag:${LILY}:376`), 1);
});

test('COM16 初めて：助手玛奥推进到 1', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:16`, 1);
  }, 16);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『啊嘿嘿，姐姐的大胸部，挤出来的奶一定很值钱♪』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:317`), 1);
});

test('COM16 初めて：非助手玛奥 + 淫乱推进到 1', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:16`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 16);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「啊啊啊……分泌出乳汁了……不过感觉……好舒服♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:317`), 1);
});

test('COM16 初めて：非助手玛奥 + 爱慕推进到 1', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:16`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 16);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「啊啊……乳汁，乳汁满满地出来了♡ 感觉……好奇怪……但是好舒服……♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:317`), 1);
});

test('COM16 初めて：それ以外推进到 1', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:16`, 1);
  }, 16);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「拿，拿掉啊啊！这不是……给母牛用的吗……好痛，好痛……呜呜呜！！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:317`), 1);
});

test('COM16 二回目：助手玛奥 + 淫乱 + RAND:2 命中（seq 1）推进到 4', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:16`, 1);
    f.store.set(`cflag:${LILY}:317`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 16);
  await speak_com11(fixture, seq_rand(1));
  assert.equal(
    fixture.text_lines()[1],
    '「请……请吧……姐姐的胸部……想要怎么玩都可以♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:317`), 4);
});

test('COM16 二回目：助手玛奥 + 淫乱 + RAND:2 落空（seq 0）推进到 4', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:16`, 1);
    f.store.set(`cflag:${LILY}:317`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 16);
  await speak_com11(fixture, seq_rand(0));
  assert.equal(
    fixture.text_lines()[1],
    '「呜啊啊♡ 居然，居然会这么舒服啊啊♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:317`), 4);
});

test('COM16 二回目：助手玛奥 + 爱慕推进到 3', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:16`, 1);
    f.store.set(`cflag:${LILY}:317`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 16);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『哎嘿嘿，姐姐的乳汁，一会儿我会全部好好喝光的哦♪』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:317`), 3);
});

test('COM16 二回目：助手玛奥 + それ以外推进到 2', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:16`, 1);
    f.store.set(`cflag:${LILY}:317`, 1);
  }, 16);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『哎嘿嘿，姐姐的胸部好像被乳汁涨得满满的了，让我来给姐姐放松一下』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:317`), 2);
});

test('COM16 二回目：非助手玛奥 + 淫乱推进到 4', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:16`, 1);
    f.store.set(`cflag:${LILY}:317`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 16);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「啊啊……开始习惯这种感觉了呢♡ 其实……还挺舒服的♡ 」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:317`), 4);
});

test('COM16 二回目：非助手玛奥 + 爱慕推进到 3', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:16`, 1);
    f.store.set(`cflag:${LILY}:317`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 16);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「明明是给宝宝喝的东西、不过……如果魔王大人想要品尝的话，我也不介意啦♡！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:317`), 3);
});

test('COM16 二回目：非助手玛奥 + それ以外推进到 2', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:16`, 1);
    f.store.set(`cflag:${LILY}:317`, 1);
  }, 16);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「饶，饶了我吧……再这样挤下去……胸部……真的会坏掉的……呜呜呜！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:317`), 2);
});

test('COM16 脱着時（TEQUIP:16 == 0）：淫乱推进到 3', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`talent:${LILY}:76`, 1);
  }, 16);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「哈啊……哈啊……这些就是我分泌的乳汁……好多啊……」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:377`), 3);
});

test('COM16 脱着時：爱慕推进到 2', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`talent:${LILY}:85`, 1);
  }, 16);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「品尝一下可以……但是一定不能拿去卖啊……」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:377`), 2);
});

test('COM16 脱着時：それ以外推进到 1', async () => {
  const fixture = setup_lily(() => {}, 16);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「呜呜呜……人家明明不是奶牛………」');
  assert.equal(fixture.store.get(`cflag:${LILY}:377`), 1);
});

test('COM19 初めて：助手玛奥推进到 1', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:19`, 1);
  }, 19);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『嘿嘿嘿，待会儿一口气全部拔出来，保证姐姐舒服得上天…』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:320`), 1);
});

test('COM19 初めて：非助手玛奥 + 淫乱推进到 1', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:19`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 19);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「哈啊…哈呼…又，又进来一颗♡一会儿…再一下全部拔出去…♪」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:320`), 1);
});

test('COM19 初めて：非助手玛奥 + 爱慕推进到 1', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:19`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 19);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「这个姿势真是…好害羞…呃啊…稍…稍微温柔一点…魔王大人……嗯啊…啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:320`), 1);
});

test('COM19 初めて：それ以外推进到 1', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:19`, 1);
  }, 19);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「为什么我就偏要遇上这种事！放，放开我！不，不要碰我的屁股啊——！！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:320`), 1);
});

test('COM19 二回目：助手玛奥 + 淫乱＋A感覚Lv3以上推进到 7', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:19`, 1);
    f.store.set(`cflag:${LILY}:320`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set(`abl:${LILY}:3`, 3);
  }, 19);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「啊哈…啊啊♡ 全，全部塞进去了呢！姐姐已经准备好了…一口气全部拔出来…让姐姐上天吧♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:320`), 7);
});

test('COM19 二回目：助手玛奥 + 淫乱推进到 6', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:19`, 1);
    f.store.set(`cflag:${LILY}:320`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 19);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「呃啊啊…居然…全部都塞进来了…呼…呼…」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:320`), 6);
});

test('COM19 二回目：助手玛奥 + 爱慕＋A感覚Lv3以上推进到 5', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:19`, 1);
    f.store.set(`cflag:${LILY}:320`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
    f.store.set(`abl:${LILY}:3`, 3);
  }, 19);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「哈啊…啊啊♡ 全，全部塞进来了」');
  assert.equal(fixture.store.get(`cflag:${LILY}:320`), 5);
});

test('COM19 二回目：助手玛奥 + 爱慕推进到 4', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:19`, 1);
    f.store.set(`cflag:${LILY}:320`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 19);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「呃啊…啊啊啊…不，不行了…不能再放进去了…你，快停下…求求你…」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:320`), 4);
});

test('COM19 二回目：助手玛奥 + A感覚Lv3以上推进到 3', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:19`, 1);
    f.store.set(`cflag:${LILY}:320`, 1);
    f.store.set(`abl:${LILY}:3`, 3);
  }, 19);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『哎呀，姐姐的肛门现在这么厉害了，全部都塞进去了呢♪』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:320`), 3);
});

test('COM19 二回目：助手玛奥 + それ以外推进到 2', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`tequip:${LILY}:19`, 1);
    f.store.set(`cflag:${LILY}:320`, 1);
  }, 19);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『才这么几颗就已经塞不进去了啊、姐姐的肛门还是缺乏调教啊♪』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:320`), 2);
});

test('COM19 二回目：非助手玛奥 + 淫乱＋A感覚Lv3以上推进到 7', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:19`, 1);
    f.store.set(`cflag:${LILY}:320`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set(`abl:${LILY}:3`, 3);
  }, 19);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「哎啊啊♡…又，又进来一颗♡ 肛门好舒服♡ 舒服得要去了♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:320`), 7);
});

test('COM19 二回目：非助手玛奥 + 淫乱推进到 6', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:19`, 1);
    f.store.set(`cflag:${LILY}:320`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 19);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「又，又有一颗更大的，进来了♡ 哈啊，哈啊，感觉…好奇怪♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:320`), 6);
});

test('COM19 二回目：非助手玛奥 + 爱慕＋A感覚Lv3以上推进到 5', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:19`, 1);
    f.store.set(`cflag:${LILY}:320`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
    f.store.set(`abl:${LILY}:3`, 3);
  }, 19);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「哈啊…啊啊…好，好羞耻啊…但如果是魔王大人的要求…再塞多少颗进来…都可以♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:320`), 5);
});

test('COM19 二回目：非助手玛奥 + 爱慕推进到 4', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:19`, 1);
    f.store.set(`cflag:${LILY}:320`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 19);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「啊啊…莉莉的肛门…很敏感的，哈啊，哈啊，请魔王大人…塞珠子的时候…再稍微…温柔一点！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:320`), 4);
});

test('COM19 二回目：非助手玛奥 + A感覚Lv3以上推进到 3', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:19`, 1);
    f.store.set(`cflag:${LILY}:320`, 1);
    f.store.set(`abl:${LILY}:3`, 3);
  }, 19);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「为，为什么会这么舒服的…哈啊…啊啊…明明…完全不想…但是，真的好舒服啊♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:320`), 3);
});

test('COM19 二回目：非助手玛奥 + それ以外推进到 2', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`tequip:${LILY}:19`, 1);
    f.store.set(`cflag:${LILY}:320`, 1);
  }, 19);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「住，住手啊…这样欺负屁股，真的会坏掉的！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:320`), 2);
});

test('COM19 脱着時（TEQUIP:19 == 0）：淫乱推进到 4', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`talent:${LILY}:76`, 1);
  }, 19);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「这，这就要——呃啊啊啊！莉莉的肛门♡ 舒服得要登天了♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:379`), 4);
});

test('COM19 脱着時：爱慕推进到 3', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`talent:${LILY}:85`, 1);
  }, 19);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「哈啊…哈啊…不，不要这样…拔出几颗……就停下来一次…莉莉的肛门…会受不了的…啊啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:379`), 3);
});

test('COM19 脱着時：A感覚Lv3以上推进到 2', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`abl:${LILY}:3`, 3);
  }, 19);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「不……不能这样……一次全部拔出去啊啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:379`), 2);
});

test('COM19 脱着時：それ以外推进到 1', async () => {
  const fixture = setup_lily(() => {}, 19);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「好痛啊啊啊啊！会坏掉的，真的会坏掉的！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:379`), 1);
});

test('COM20 初めて：处女 + 助手玛奥 + 淫乱，weapon 三目电动假阳具支（玩家无 TALENT:121/122）', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`talent:${LILY}:0`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set('talent:0:122', 0); // 覆盖 setup_lily 默认的 MASTER 是男性
  }, 20);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『哎哎，有点激动呢～姐姐的第一次，就由我收下了哦！』',
  );
  assert.equal(
    fixture.text_lines()[1],
    '莉莉被你压在身下，分开的双腿之间，少女最私密的堡垒与最后的防线被电动假阳具一口气突入了。',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:321`), 1);
});

test('COM20 初めて：处女 + 非助手玛奥 + それ以外', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`talent:${LILY}:0`, 1);
  }, 20);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「住手，住手啊…放开我，快放开我！不——要——啊啊啊啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:321`), 1);
});

test('COM20 初めて：非处女 + 助手玛奥 + 爱慕', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`talent:${LILY}:85`, 1);
  }, 20);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '『哈啊，你插进姐姐的小穴里了♡』');
  assert.equal(fixture.store.get(`cflag:${LILY}:321`), 1);
});

test('COM20 二回目：weapon 三目条件为 &&——TALENT:121/122 一 0 一 1 时须选阴茎', async () => {
  // setup_lily 默认 talent:0:122 = 1（MASTER 是男性），talent:0:121 未设即 0——
  // 一真一假的组合专门用来拆穿 && 被错改成 || 的变异（两支单独取 0 都测不出来）
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:321`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 20);
  await speak_com11(fixture, seq_rand(1));
  assert.match(fixture.text_lines()[0], /阴茎一口气贯通到底。$/);
});

test('COM20 二回目：weapon 三目——玩家持 TALENT:121 时改用阴茎', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:321`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set('talent:0:121', 1);
  }, 20);
  await speak_com11(fixture, seq_rand(1));
  assert.match(fixture.text_lines()[0], /阴茎一口气贯通到底。$/);
});

test('COM20 二回目：助手玛奥 + 淫乱，RAND:3 三选一 + ABL:2 私处感觉门槛可控', async () => {
  const with_high_abl = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:321`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set(`abl:${LILY}:2`, 3);
  }, 20);
  with_high_abl.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  with_high_abl.era.addCharacter(MAO);
  await speak_com11(with_high_abl, seq_rand(0));
  assert.equal(
    with_high_abl.text_lines().at(-1),
    '「呼呼…哈啊…姐姐也是…舒服得…要说不出话了♡ 蜜穴被你侵犯的感觉…太棒了♡ 啊啊啊♡」',
  );
  assert.equal(with_high_abl.store.get(`cflag:${LILY}:321`), 6);

  const without_high_abl = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:321`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 20);
  without_high_abl.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  without_high_abl.era.addCharacter(MAO);
  await speak_com11(without_high_abl, seq_rand(0));
  assert.notEqual(
    without_high_abl.text_lines().at(-1),
    '「呼呼…哈啊…姐姐也是…舒服得…要说不出话了♡ 蜜穴被你侵犯的感觉…太棒了♡ 啊啊啊♡」',
  );
  assert.equal(without_high_abl.store.get(`cflag:${LILY}:321`), 6);
});

test('COM20 二回目：非助手玛奥 + 屈服刻印Lv3＋V感覚Lv3以上，RAND:3 分岔推进到 4', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:321`, 1);
    f.store.set(`mark:${LILY}:2`, 3);
    f.store.set(`abl:${LILY}:2`, 3);
  }, 20);
  await speak_com11(fixture, seq_rand(1));
  assert.equal(fixture.text_lines()[0], '「再稍…稍等一下啊啊…呜啊啊…哈啊」');
  assert.equal(fixture.store.get(`cflag:${LILY}:321`), 4);
});

test('COM20 二回目：非助手玛奥 + 屈服刻印Lv3，推进到 3', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:321`, 1);
    f.store.set(`mark:${LILY}:2`, 3);
  }, 20);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「呜啊啊…啊啊…插，插进来了……啊啊！」');
  assert.equal(fixture.store.get(`cflag:${LILY}:321`), 3);
});

test('COM20 二回目：それ以外，推进到 2', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:321`, 1);
  }, 20);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「放开我！放开我！住手啊…不要——插进来啊啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:321`), 2);
});

test('COM20 二回目：助手玛奥 + 爱慕，推进到 5', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:321`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 20);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.store.get(`cflag:${LILY}:321`), 5);
});

test('COM20 二回目：助手玛奥 + 屈服刻印Lv3＋V感覚Lv3以上，推进到 4', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:321`, 1);
    f.store.set(`mark:${LILY}:2`, 3);
    f.store.set(`abl:${LILY}:2`, 3);
  }, 20);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.store.get(`cflag:${LILY}:321`), 4);
});

test('COM20 二回目：助手玛奥 + 屈服刻印Lv3，推进到 3', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:321`, 1);
    f.store.set(`mark:${LILY}:2`, 3);
  }, 20);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.store.get(`cflag:${LILY}:321`), 3);
});

test('COM20 二回目：助手玛奥 + それ以外，推进到 2', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:321`, 1);
  }, 20);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.store.get(`cflag:${LILY}:321`), 2);
});

test('COM20 二回目：非助手玛奥 + 淫乱，推进到 6', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:321`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 20);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.store.get(`cflag:${LILY}:321`), 6);
});

test('COM20 二回目：非助手玛奥 + 爱慕，推进到 5', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:321`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 20);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.store.get(`cflag:${LILY}:321`), 5);
});

test('COM20 SELECTCOM 17 死代码：不占用真实指令号，静默无输出', async () => {
  const fixture = setup_lily(() => {}, 17);
  await speak_com11(fixture, seq_rand());
  assert.deepEqual(fixture.text_lines(), []);
});

test('COM21 初めて：处女 + 助手玛奥 + 淫乱，weapon_doggy 三目震动假阳具支', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`talent:${LILY}:0`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set('talent:0:122', 0); // 覆盖 setup_lily 默认的 MASTER 是男性
  }, 21);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『嘿嘿嘿…姐姐的处女身，就要到今天为止了呢♡』',
  );
  assert.equal(
    fixture.text_lines()[1],
    '你扶着趴在床上的莉莉的腰，从身后用震动假阳具在蜜穴口来回摩擦，挑逗着。',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:322`), 1);
});

test('COM21 初めて：处女 + 非助手玛奥 + それ以外', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`talent:${LILY}:0`, 1);
  }, 21);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「不，不要，不要啊！放过我吧…求求你了，求求你了…不行啊啊啊啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:322`), 1);
});

test('COM21 初めて：非处女 + 助手玛奥 + 爱慕', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`talent:${LILY}:85`, 1);
  }, 21);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『哈啊…姐姐的蜜穴最深处，这次要一口气进入了哦…♡』',
  );
  // weapon_doggy 三目条件为 &&：玩家默认 TALENT:121=0/122=1（一真一假）须选阴茎，
  // 拆穿 && 被误改成 || 的变异（此时 121===0 恒真，会误判成震动假阳具）
  assert.equal(
    fixture.text_lines()[1],
    '你扶着趴在床上的莉莉的腰，从身后用阴茎径直插到了底。',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:322`), 1);
});

test('COM21 二回目：助手玛奥 + 淫乱 else 分支（RAND:3≠0 且 RAND:2≠0）', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:322`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 21);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand(1, 1)); // RAND:3=1≠0 且 RAND:2=1≠0，落 else 分支
  assert.equal(
    fixture.text_lines()[0],
    '「啊……嗯啊啊……在魔王大人的注视下被侵犯……更有感觉了啊啊♡」',
  );
});

test('COM21 二回目：助手玛奥 + 淫乱，RAND:3 三选一 + ABL:2 私处感觉分岔可控', async () => {
  const with_high_abl = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:322`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set(`abl:${LILY}:2`, 3);
  }, 21);
  with_high_abl.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  with_high_abl.era.addCharacter(MAO);
  await speak_com11(with_high_abl, seq_rand(0));
  assert.equal(
    with_high_abl.text_lines().at(-1),
    '『当然啦，我接下来还会让姐姐更舒服的哦♡』',
  );
  assert.equal(with_high_abl.store.get(`cflag:${LILY}:322`), 6);

  const without_high_abl = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:322`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 21);
  without_high_abl.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  without_high_abl.era.addCharacter(MAO);
  await speak_com11(without_high_abl, seq_rand(0));
  assert.notEqual(
    without_high_abl.text_lines().at(-1),
    '『当然啦，我接下来还会让姐姐更舒服的哦♡』',
  );
  assert.equal(without_high_abl.store.get(`cflag:${LILY}:322`), 6);
});

test('COM21 二回目：助手玛奥 + 爱慕，推进到 5', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:322`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 21);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.store.get(`cflag:${LILY}:322`), 5);
});

test('COM21 二回目：助手玛奥 + 屈服刻印Lv3＋V感覚Lv3以上，推进到 4', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:322`, 1);
    f.store.set(`mark:${LILY}:2`, 3);
    f.store.set(`abl:${LILY}:2`, 3);
  }, 21);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.store.get(`cflag:${LILY}:322`), 4);
});

test('COM21 二回目：助手玛奥 + 屈服刻印Lv3，推进到 3', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:322`, 1);
    f.store.set(`mark:${LILY}:2`, 3);
  }, 21);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『唔哇哇……被这个姿势侵犯的姐姐……好像母狗一样呢……感觉是不是棒极了！』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:322`), 3);
});

test('COM21 二回目：助手玛奥 + それ以外，推进到 2', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:322`, 1);
  }, 21);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『唔哇哇……被这个姿势侵犯的姐姐……好像母狗一样呢……感觉是不是棒极了！』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:322`), 2);
});

test('COM21 二回目：非助手玛奥 + 淫乱，推进到 6', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:322`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 21);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「呜……呜啊……这种姿势……好像……狗在交配一样♡ 但是……好棒……好舒服♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:322`), 6);
});

test('COM21 二回目：非助手玛奥 + 爱慕，推进到 5', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:322`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 21);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.store.get(`cflag:${LILY}:322`), 5);
});

test('COM21 二回目：非助手玛奥 + 屈服刻印Lv3＋V感覚Lv3以上，推进到 4', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:322`, 1);
    f.store.set(`mark:${LILY}:2`, 3);
    f.store.set(`abl:${LILY}:2`, 3);
  }, 21);
  await speak_com11(fixture, seq_rand(1));
  assert.equal(
    fixture.text_lines()[0],
    '「插，插到最深处了……魔王大人的阴茎……呜……呜啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:322`), 4);
});

test('COM21 二回目：非助手玛奥 + 屈服刻印Lv3，推进到 3', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:322`, 1);
    f.store.set(`mark:${LILY}:2`, 3);
  }, 21);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「呜呜……插……插进来了……！」');
  assert.equal(fixture.store.get(`cflag:${LILY}:322`), 3);
});

test('COM21 二回目：それ以外，推进到 2', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:322`, 1);
  }, 21);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「放，放开我……不，不要啊啊啊！」');
  assert.equal(fixture.store.get(`cflag:${LILY}:322`), 2);
});

test('COM22 初めて：处女支为空模板骨架，无输出但仍推进 CFLAG:323', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`talent:${LILY}:0`, 1);
  }, 22);
  await speak_com11(fixture, seq_rand());
  assert.deepEqual(fixture.text_lines(), ['']); // PRINTFORMW 空行（模板骨架未填写）
  assert.equal(fixture.store.get(`cflag:${LILY}:323`), 1);
});

test('COM22 初めて：非处女 + 助手玛奥 + 淫乱', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`talent:${LILY}:76`, 1);
  }, 22);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「呜……呜啊……♡ 你……请……请再……♡」');
  assert.equal(fixture.store.get(`cflag:${LILY}:323`), 1);
});

test('COM22 初めて：非处女 + 非助手玛奥 + それ以外', async () => {
  const fixture = setup_lily(() => {}, 22);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「好……好难受……这样姿势……呜呜！」');
  assert.equal(fixture.store.get(`cflag:${LILY}:323`), 1);
});

test('COM22 二回目：助手玛奥 + 淫乱，RAND:3 三选一 + ABL:2 私处感觉门槛可控', async () => {
  const with_high_abl = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:323`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set(`abl:${LILY}:2`, 3);
  }, 22);
  with_high_abl.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  with_high_abl.era.addCharacter(MAO);
  await speak_com11(with_high_abl, seq_rand(0));
  assert.equal(
    with_high_abl.text_lines().at(-1),
    '莉莉被你抱在大腿上，吸吮，舔舐着敏感的乳头，蜜穴也被连续的侵犯着，感受着双倍的快感……',
  );
  assert.equal(with_high_abl.store.get(`cflag:${LILY}:323`), 6);

  const without_high_abl = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:323`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 22);
  without_high_abl.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  without_high_abl.era.addCharacter(MAO);
  await speak_com11(without_high_abl, seq_rand(0));
  assert.equal(
    without_high_abl.text_lines().at(-1),
    '莉莉被你抱在腿上，同时侵犯着双乳和蜜穴……',
  );
  assert.equal(without_high_abl.store.get(`cflag:${LILY}:323`), 6);
});

test('COM22 二回目：助手玛奥 + 爱慕，推进到 5', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:323`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 22);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.store.get(`cflag:${LILY}:323`), 5);
});

test('COM22 二回目：助手玛奥 + 屈服刻印Lv3＋V感覚Lv3以上，推进到 4', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:323`, 1);
    f.store.set(`mark:${LILY}:2`, 3);
    f.store.set(`abl:${LILY}:2`, 3);
  }, 22);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「嗯啊……咿啊啊……为，为什么……会这么舒服的！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:323`), 4);
});

test('COM22 二回目：助手玛奥 + 屈服刻印Lv3，推进到 3', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:323`, 1);
    f.store.set(`mark:${LILY}:2`, 3);
  }, 22);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「求，求你了……稍微温柔一点吧……看在我是你的姐姐的份上……」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:323`), 3);
});

test('COM22 二回目：助手玛奥 + それ以外，推进到 2', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:323`, 1);
  }, 22);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『唔哇哇……边侵犯姐姐边把脸埋在姐姐淫乱的大胸部里面……真是太棒了！』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:323`), 2);
});

test('COM22 二回目：非助手玛奥 + 淫乱，两次独立 RAND:3 各自决定开场句与收尾句', async () => {
  // 开场 rand_n(3) 消耗 draw=0 → 命中 RAND:3==0，选中第一支开场句；
  // ABL:2 不消耗随机、默认 0<3 走 else；收尾 rand_n(3) 消耗 draw=1 → 不命中
  // RAND:3==0，落到 rand_n(2)（无draw可消耗，默认取 0）→ 命中 RAND:2==0，
  // 选中第二支收尾句——两次 RAND:3 各自独立判定，互不共享同一次抽样结果。
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:323`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 22);
  await speak_com11(fixture, seq_rand(0, 1));
  assert.equal(
    fixture.text_lines()[0],
    '「呜……呜啊啊……尽情地，侵犯人家的淫穴吧魔王大人……侵犯到人家彻底坏掉吧啊啊啊♡ 」',
  );
  assert.equal(fixture.text_lines()[1], '「呜啊……小穴……实在是太舒服了啊啊啊」');
  assert.equal(
    fixture.text_lines()[2],
    '莉莉紧抱着你，双乳在你的胸膛上摩擦着……',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:323`), 6);
});

test('COM22 二回目：非助手玛奥 + 淫乱，ABL:2 私处感觉>=3 时中段句不同', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:323`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set(`abl:${LILY}:2`, 3);
  }, 22);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[1],
    '「不，不行了……小穴……舒服得……要上天了啊啊啊♡」',
  );
});

test('COM22 二回目：非助手玛奥 + 爱慕，推进到 5', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:323`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 22);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.store.get(`cflag:${LILY}:323`), 5);
});

test('COM22 二回目：非助手玛奥 + 屈服刻印Lv3＋V感覚Lv3以上，推进到 4', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:323`, 1);
    f.store.set(`mark:${LILY}:2`, 3);
    f.store.set(`abl:${LILY}:2`, 3);
  }, 22);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「好舒服……已经舒服得……没有办法思考了啊啊啊♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:323`), 4);
});

test('COM22 二回目：非助手玛奥 + 屈服刻印Lv3，推进到 3', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:323`, 1);
    f.store.set(`mark:${LILY}:2`, 3);
  }, 22);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「饶，饶了我吧……魔王大人……已经不行了……」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:323`), 3);
});

test('COM22 二回目：それ以外，推进到 2', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:323`, 1);
  }, 22);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「呜……呜啊啊，好痛……不，不能再进去了……呜呜！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:323`), 2);
});

test('COM23 初めて：处女支为空模板骨架，无输出但仍推进 CFLAG:324', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`talent:${LILY}:0`, 1);
  }, 23);
  await speak_com11(fixture, seq_rand());
  assert.deepEqual(fixture.text_lines(), ['']); // PRINTFORMW 空行（模板骨架未填写）
  assert.equal(fixture.store.get(`cflag:${LILY}:324`), 1);
});

test('COM23 初めて：非处女 + 助手玛奥 + 淫乱', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`talent:${LILY}:76`, 1);
  }, 23);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「呀啊啊……这样的姿势……真受不了啊♡」');
  assert.equal(fixture.store.get(`cflag:${LILY}:324`), 1);
});

test('COM23 初めて：非处女 + 非助手玛奥 + それ以外', async () => {
  const fixture = setup_lily(() => {}, 23);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「不，不要啊啊……这样的姿势……好羞耻！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:324`), 1);
});

test('COM23 二回目：助手玛奥 + 淫乱，RAND:3 三选一 else 分支 + ABL:2 私处感觉分岔', async () => {
  // draw=2：RAND:3 !=0 且 RAND:2(下一次)!=0 → 落到 ELSE 分支
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:324`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set(`abl:${LILY}:2`, 3);
  }, 23);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand(2, 1));
  assert.equal(
    fixture.text_lines()[0],
    '『嘿嘿嘿，我要开始认真了哦，姐姐！在妹妹的侵犯下高潮吧』',
  );
  assert.equal(
    fixture.text_lines()[1],
    '「好舒服……已经舒服得……没有办法思考了啊啊啊♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:324`), 6);
});

test('COM23 二回目：助手玛奥 + 淫乱，RAND:3==0 + ABL:2 达门槛时选中体感句', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:324`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set(`abl:${LILY}:2`, 3);
  }, 23);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand(0));
  assert.equal(
    fixture.text_lines()[1],
    '「不，不行了……小穴……舒服得……要上天了啊啊啊♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:324`), 6);
});

test('COM23 二回目：助手玛奥 + 淫乱，RAND:3==0 命中开场句，ABL:2 未达门槛走 else', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:324`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 23);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand(0));
  assert.equal(
    fixture.text_lines()[1],
    '「好……好的……魔王大人……请，请欣赏莉莉被妹妹侵犯到高潮的样子吧♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:324`), 6);
});

test('COM23 二回目：助手玛奥 + 爱慕，推进到 5', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:324`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 23);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「呜啊……嗯啊啊……为，为什么会……这么舒服啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:324`), 5);
});

test('COM23 二回目：助手玛奥 + 屈服刻印Lv3＋V感覚Lv3以上，RAND:2 二选一可控', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:324`, 1);
    f.store.set(`mark:${LILY}:2`, 3);
    f.store.set(`abl:${LILY}:2`, 3);
  }, 23);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand(0));
  assert.equal(
    fixture.text_lines()[0],
    '「好舒服……已经没有办法思考了啊啊啊♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:324`), 4);
});

test('COM23 二回目：助手玛奥 + 屈服刻印Lv3，推进到 3', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:324`, 1);
    f.store.set(`mark:${LILY}:2`, 3);
  }, 23);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「呜……呜啊……不，不能再往里顶了……会，会坏掉的！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:324`), 3);
});

test('COM23 二回目：助手玛奥 + それ以外，推进到 2', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:324`, 1);
  }, 23);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「放，放开我啊，你！我是，我是你的姐姐啊……呜呜呜……不，不要再折磨我了……」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:324`), 2);
});

test('COM23 二回目：非助手玛奥 + 淫乱，RAND:3==0 开场句 + ABL:2 达门槛', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:324`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set(`abl:${LILY}:2`, 3);
  }, 23);
  await speak_com11(fixture, seq_rand(0));
  assert.equal(
    fixture.text_lines()[0],
    '「呜……呜啊…♡ 顶，顶到最里面了啊啊…♡」',
  );
  assert.equal(fixture.text_lines()[1], '「呜呜……要，要去了，要去了啊啊啊♡」');
  assert.equal(fixture.store.get(`cflag:${LILY}:324`), 6);
});

test('COM23 二回目：非助手玛奥 + 爱慕，推进到 5', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:324`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 23);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「呜啊……魔王大人……不，不可以……同时攻击胸部和小穴……啊啊啊♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:324`), 5);
});

test('COM23 二回目：非助手玛奥 + 屈服刻印Lv3＋V感覚Lv3以上，双独立 RAND:2 结构可控', async () => {
  // draw1=0 命中「不，不行了…」体感句；draw2=1 命中「好…好舒服…」姿势句
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:324`, 1);
    f.store.set(`mark:${LILY}:2`, 3);
    f.store.set(`abl:${LILY}:2`, 3);
  }, 23);
  await speak_com11(fixture, seq_rand(0, 1));
  assert.equal(
    fixture.text_lines()[0],
    '「不，不行了……小穴……舒服得……要上天了啊啊啊♡」',
  );
  assert.equal(fixture.text_lines()[1], '「好……好舒服……这样的姿势……呜啊啊！」');
  assert.equal(fixture.store.get(`cflag:${LILY}:324`), 4);
});

test('COM23 二回目：非助手玛奥 + 屈服刻印Lv3＋V感覚Lv3以上，双独立 RAND:2 第二次抽样独立于第一次', async () => {
  // draw1=1（else）、draw2=0（if）——两次各自独立判定，非共享同一抽样
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:324`, 1);
    f.store.set(`mark:${LILY}:2`, 3);
    f.store.set(`abl:${LILY}:2`, 3);
  }, 23);
  await speak_com11(fixture, seq_rand(1, 0));
  assert.equal(
    fixture.text_lines()[0],
    '「侵犯得……太激烈了……但，但是……真的好舒服啊啊！」',
  );
  assert.equal(
    fixture.text_lines()[1],
    '「呜？！不，不可以同时……攻击胸部啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:324`), 4);
});

test('COM23 二回目：非助手玛奥 + 屈服刻印Lv3，推进到 3', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:324`, 1);
    f.store.set(`mark:${LILY}:2`, 3);
  }, 23);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「饶，饶了我吧……真的要……坏掉了！」');
  assert.equal(fixture.store.get(`cflag:${LILY}:324`), 3);
});

test('COM23 二回目：それ以外，推进到 2', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:324`, 1);
  }, 23);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「住，住手！放开我啊啊！！」');
  assert.equal(fixture.store.get(`cflag:${LILY}:324`), 2);
});

test('COM26 初めて：助手玛奥 + 淫乱', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`talent:${LILY}:76`, 1);
  }, 26);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『姐姐还没体会过肛交吗♡ 保证会让你舒服上天的♡ 嘿嘿嘿！』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:327`), 1);
});

test('COM26 初めて：助手玛奥 + それ以外（爱慕無し）', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
  }, 26);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[2],
    '「不，不要啊啊！快，快住手……我们是……亲姐妹啊啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:327`), 1);
});

test('COM26 初めて：非助手玛奥 + 淫乱，ABL:3 未达门槛走 else', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`talent:${LILY}:76`, 1);
  }, 26);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[2],
    '尚未充分开发的肛门被你的阴茎用力地抽插着。',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:327`), 1);
});

test('COM26 初めて：非助手玛奥 + 淫乱，ABL:3 达门槛走 if', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set(`abl:${LILY}:3`, 3);
  }, 26);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[2],
    '经过充分调教和开发的肛门，好像主动吸住了你的阴茎一般。',
  );
});

test('COM26 初めて：非助手玛奥 + それ以外，ABL:3 二态分岔可控', async () => {
  const with_high = setup_lily((f) => {
    f.store.set(`abl:${LILY}:3`, 3);
  }, 26);
  await speak_com11(with_high, seq_rand());
  assert.equal(
    with_high.text_lines()[0],
    '「不，不行啊啊……那种地方……不，不是用来……呜啊啊！」',
  );

  const without_high = setup_lily(() => {}, 26);
  await speak_com11(without_high, seq_rand());
  assert.equal(
    without_high.text_lines()[0],
    '「住，住手啊……这样插进去……屁股会裂开的啊啊啊！」',
  );
  assert.equal(without_high.store.get(`cflag:${LILY}:327`), 1);
});

test('COM26 二回目：助手玛奥 + 淫乱＋A感覚Lv3以上，RAND:3 三选一可控', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:327`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set(`abl:${LILY}:3`, 3);
  }, 26);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand(2, 1));
  assert.equal(
    fixture.text_lines()[0],
    '『原来姐姐被侵犯肛门时，会发出这么下流的声音呀♡』',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:327`), 7);
});

test('COM26 二回目：助手玛奥 + 淫乱＋A感覚Lv3以上，RAND:3==0 首档', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:327`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set(`abl:${LILY}:3`, 3);
  }, 26);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand(0, 1));
  assert.equal(
    fixture.text_lines()[0],
    '「好舒服……已经舒服得……没有办法思考了啊啊啊♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:327`), 7);
});
test('COM26 二回目：助手玛奥 + 淫乱，推进到 6', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:327`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 26);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[2],
    '「呜……呜啊！肛门……被撑得满满的了……♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:327`), 6);
});

test('COM26 二回目：助手玛奥 + 爱慕＋A感覚Lv3以上，推进到 5', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:327`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
    f.store.set(`abl:${LILY}:3`, 3);
  }, 26);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「不，不行了……肛门……舒服得……要上天了啊啊啊♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:327`), 5);
});

test('COM26 二回目：助手玛奥 + 爱慕，推进到 4', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:327`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 26);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[2], '「呜啊……有……有点痛……啊啊！」');
  assert.equal(fixture.store.get(`cflag:${LILY}:327`), 4);
});

test('COM26 二回目：助手玛奥 + A感覚Lv3以上，推进到 3', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:327`, 1);
    f.store.set(`abl:${LILY}:3`, 3);
  }, 26);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[3], '「哈啊……啊啊……太，太激烈了啊啊！」');
  assert.equal(fixture.store.get(`cflag:${LILY}:327`), 3);
});

test('COM26 二回目：助手玛奥 + それ以外，推进到 2', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:327`, 1);
  }, 26);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[2], '「不可以，不可以啊啊啊！！！」');
  assert.equal(fixture.store.get(`cflag:${LILY}:327`), 2);
});

test('COM26 二回目：非助手玛奥 + 淫乱＋A感覚Lv3以上，推进到 7', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:327`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set(`abl:${LILY}:3`, 3);
  }, 26);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「哈啊……嗯啊啊♡ 淫荡的肛门……得到魔王大人的……疼爱了♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:327`), 7);
});

test('COM26 二回目：非助手玛奥 + 淫乱，推进到 6', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:327`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 26);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「呜，呜啊♡ 魔……魔王大人的阴茎……插进屁股里了♡」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:327`), 6);
});

test('COM26 二回目：非助手玛奥 + 爱慕＋A感覚Lv3以上，推进到 5', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:327`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
    f.store.set(`abl:${LILY}:3`, 3);
  }, 26);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.store.get(`cflag:${LILY}:327`), 5);
});

test('COM26 二回目：非助手玛奥 + 爱慕，推进到 4', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:327`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 26);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '「呜……还……还是有点点痛……不过，不要紧的……请魔王大人……尽情的……！」',
  );
  assert.equal(fixture.store.get(`cflag:${LILY}:327`), 4);
});

test('COM26 二回目：非助手玛奥 + A感覚Lv3以上，推进到 3', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:327`, 1);
    f.store.set(`abl:${LILY}:3`, 3);
  }, 26);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「呜……呜啊啊……插……插进屁股里了……！」');
  assert.equal(fixture.store.get(`cflag:${LILY}:327`), 3);
});

test('COM26 二回目：それ以外，推进到 2', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:327`, 1);
  }, 26);
  await speak_com11(fixture, seq_rand());
  assert.equal(fixture.text_lines()[0], '「呜……呜呜……好痛啊啊！」');
  assert.equal(fixture.store.get(`cflag:${LILY}:327`), 2);
});

// —— SELECTCOM 27（背后位肛交 CFLAG:328）——

test('COM27 初めて：助手玛奥 + 淫乱', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`talent:${LILY}:76`, 1);
  }, 27);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[0],
    '『姐姐的肛门……真是侵犯多少次都不会腻啊♪』',
    'COM27 初次助手玛奥淫乱台词',
  );
  assert.equal(
    fixture.store.get(`cflag:${LILY}:328`),
    1,
    'COM27 初次推进背后位肛交',
  );
});

test('COM27 初めて：助手玛奥 + それ以外的武器三目须同时满足', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set('talent:0:121', 0);
    f.store.set('talent:0:122', 1);
  }, 27);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[2],
    '莉莉被你从后面按住腰，用阴茎径直插入了肛门之中。',
    'COM27 初次助手玛奥使用三目武器名',
  );
});

test('COM27 初めて：非助手玛奥 + 爱慕按肛门感觉分岔', async () => {
  const high = setup_lily((f) => {
    f.store.set(`talent:${LILY}:85`, 1);
    f.store.set(`abl:${LILY}:3`, 3);
  }, 27);
  await speak_com11(high, seq_rand());
  assert.equal(
    high.text_lines()[0],
    '莉莉被充分调教，开发的肛门和直肠紧紧夹着你的阴茎，感受着来自背后的侵犯。',
    'COM27 初次爱慕肛门感觉达标',
  );

  const low = setup_lily((f) => {
    f.store.set(`talent:${LILY}:85`, 1);
  }, 27);
  await speak_com11(low, seq_rand());
  assert.equal(
    low.text_lines()[0],
    '「拜，拜托了……稍微温柔一点……这样突然从后面插进来！」',
    'COM27 初次爱慕肛门感觉未达标',
  );
});

test('COM27 二回目：四处淫乱守卫保留误读 COM26 计数器', async () => {
  const cases = [
    { assi: true, abl: 3, expected: 3 },
    { assi: true, abl: 0, expected: 2 },
    { assi: false, abl: 3, expected: 3 },
    { assi: false, abl: 0, expected: 2 },
  ];
  for (const [index, item] of cases.entries()) {
    const fixture = setup_lily((f, era_flag) => {
      if (item.assi) {
        era_flag.assi = MAO;
        era_flag.assiplay = 1;
      }
      f.store.set(`cflag:${LILY}:328`, 1);
      f.store.set(`cflag:${LILY}:327`, 7);
      f.store.set('flag:7', 1);
      f.store.set(`talent:${LILY}:76`, 1);
      f.store.set(`abl:${LILY}:3`, item.abl);
    }, 27);
    if (item.assi) {
      fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
      fixture.era.addCharacter(MAO);
    }
    await speak_com11(fixture, seq_rand());
    assert.equal(
      fixture.store.get(`cflag:${LILY}:328`),
      item.expected,
      `COM27 原作误读 COM26 计数器第 ${index + 1} 处`,
    );
  }
});

test('COM27 二回目：助手玛奥六档推进', async () => {
  const cases = [
    { talent: 76, abl: 3, normal: 1, expected: 7 },
    { talent: 76, normal: 1, expected: 6 },
    { talent: 85, abl: 3, expected: 5 },
    { talent: 85, expected: 4 },
    { abl: 3, expected: 3 },
    { expected: 2 },
  ];
  for (const [index, item] of cases.entries()) {
    const fixture = setup_lily((f, era_flag) => {
      era_flag.assi = MAO;
      era_flag.assiplay = 1;
      f.store.set(`cflag:${LILY}:328`, 1);
      if (item.normal !== undefined) {
        f.store.set(`cflag:${LILY}:327`, item.normal);
      }
      if (item.talent !== undefined) {
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      }
      if (item.abl !== undefined) {
        f.store.set(`abl:${LILY}:3`, item.abl);
      }
    }, 27);
    fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
    fixture.era.addCharacter(MAO);
    await speak_com11(fixture, seq_rand());
    assert.equal(
      fixture.store.get(`cflag:${LILY}:328`),
      item.expected,
      `COM27 助手玛奥第 ${index + 1} 档推进`,
    );
  }
});

test('COM27 二回目：非助手玛奥六档推进', async () => {
  const cases = [
    { talent: 76, abl: 3, normal: 1, expected: 7 },
    { talent: 76, normal: 1, expected: 6 },
    { talent: 85, abl: 3, expected: 5 },
    { talent: 85, expected: 4 },
    { abl: 3, expected: 3 },
    { expected: 2 },
  ];
  for (const [index, item] of cases.entries()) {
    const fixture = setup_lily((f) => {
      f.store.set(`cflag:${LILY}:328`, 1);
      if (item.normal !== undefined) {
        f.store.set(`cflag:${LILY}:327`, item.normal);
      }
      if (item.talent !== undefined) {
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      }
      if (item.abl !== undefined) {
        f.store.set(`abl:${LILY}:3`, item.abl);
      }
    }, 27);
    await speak_com11(fixture, seq_rand());
    assert.equal(
      fixture.store.get(`cflag:${LILY}:328`),
      item.expected,
      `COM27 非助手玛奥第 ${index + 1} 档推进`,
    );
  }
});

test('COM27 二回目：助手玛奥爱慕 RAND:3 三选一可控', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:328`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 27);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand(1, 0));
  assert.equal(
    fixture.text_lines()[2],
    '「不，不行啊啊……魔王大人……不要看啊啊啊！」',
    'COM27 助手玛奥爱慕 RAND 第二档',
  );
});

test('COM27 二回目：非助手玛奥爱慕 RAND:2 二选一可控', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:328`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 27);
  await speak_com11(fixture, seq_rand(0));
  assert.equal(
    fixture.text_lines()[2],
    '你抓着莉莉光洁的臀部，毫不留情地继续抽插着着。',
    'COM27 非助手玛奥爱慕 RAND 第一档',
  );
});

// —— SELECTCOM 28（对面座位肛交 CFLAG:329）——

test('COM28 初めて：助手玛奥与非助手玛奥各三档', async () => {
  const cases = [
    {
      assi: true,
      talent: 76,
      expected: `「哎嘿嘿……姐姐已经准备好了♡ 快点来侵犯，虐待这个淫乱的肛门吧♡」`,
    },
    {
      assi: true,
      talent: 85,
      expected: '「呜啊啊……不，不要……那样突然停住啊啊！」',
    },
    {
      assi: true,
      expected:
        '『哎哎，姐姐不要遮住脸啊，让我好好看看姐姐的肛门被侵犯时是什么表情的呀！』',
    },
    {
      talent: 76,
      expected:
        '莉莉被你紧紧抱在大腿上侵犯着肛门，强烈的快感让她止不住地娇喘着。',
    },
    {
      talent: 85,
      expected: '莉莉被你抱在怀里，发出了甘甜的喘息声。',
    },
    {
      expected: '莉莉的双手被你反扣在背上，就以这样的姿势被侵犯着肛门。',
    },
  ];
  for (const [index, item] of cases.entries()) {
    const fixture = setup_lily((f, era_flag) => {
      if (item.assi) {
        era_flag.assi = MAO;
        era_flag.assiplay = 1;
      }
      if (item.talent !== undefined) {
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      }
    }, 28);
    if (item.assi) {
      fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
      fixture.era.addCharacter(MAO);
    }
    await speak_com11(fixture, seq_rand());
    assert.equal(
      fixture.text_lines()[0],
      item.expected,
      `COM28 初次第 ${index + 1} 档台词`,
    );
    assert.equal(
      fixture.store.get(`cflag:${LILY}:329`),
      1,
      `COM28 初次第 ${index + 1} 档推进`,
    );
  }
});

test('COM28 二回目：助手玛奥六档推进', async () => {
  const cases = [
    { talent: 76, abl: 3, expected: 7 },
    { talent: 76, expected: 6 },
    { talent: 85, abl: 3, expected: 5 },
    { talent: 85, expected: 4 },
    { abl: 3, expected: 3 },
    { expected: 2 },
  ];
  for (const [index, item] of cases.entries()) {
    const fixture = setup_lily((f, era_flag) => {
      era_flag.assi = MAO;
      era_flag.assiplay = 1;
      f.store.set(`cflag:${LILY}:329`, 1);
      if (item.talent !== undefined) {
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      }
      if (item.abl !== undefined) {
        f.store.set(`abl:${LILY}:3`, item.abl);
      }
    }, 28);
    fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
    fixture.era.addCharacter(MAO);
    await speak_com11(fixture, seq_rand());
    assert.equal(
      fixture.store.get(`cflag:${LILY}:329`),
      item.expected,
      `COM28 助手玛奥第 ${index + 1} 档推进`,
    );
  }
});

test('COM28 二回目：非助手玛奥六档推进', async () => {
  const cases = [
    { talent: 76, abl: 3, expected: 7 },
    { talent: 76, expected: 6 },
    { talent: 85, abl: 3, expected: 5 },
    { talent: 85, expected: 4 },
    { abl: 3, expected: 3 },
    { expected: 2 },
  ];
  for (const [index, item] of cases.entries()) {
    const fixture = setup_lily((f) => {
      f.store.set(`cflag:${LILY}:329`, 1);
      if (item.talent !== undefined) {
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      }
      if (item.abl !== undefined) {
        f.store.set(`abl:${LILY}:3`, item.abl);
      }
    }, 28);
    await speak_com11(fixture, seq_rand());
    assert.equal(
      fixture.store.get(`cflag:${LILY}:329`),
      item.expected,
      `COM28 非助手玛奥第 ${index + 1} 档推进`,
    );
  }
});

test('COM28 二回目：助手玛奥淫乱＋A感覚 RAND 第二档', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:329`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set(`abl:${LILY}:3`, 3);
  }, 28);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand(1, 0));
  assert.equal(
    fixture.text_lines()[0],
    '莉莉主动扭起了腰，如饥似渴地追求着更强烈的肛交快感。',
    'COM28 助手玛奥淫乱＋A感覚 RAND 第二档台词',
  );
});

test('COM28 二回目：非助手玛奥爱慕 RAND 第三档', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:329`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
  }, 28);
  await speak_com11(fixture, seq_rand(1, 1));
  assert.equal(
    fixture.text_lines()[1],
    '「魔王大人……请尽情地把人家的肛门……当做性器那样侵犯吧♡」',
    'COM28 非助手玛奥爱慕 RAND 第三档台词',
  );
});

// —— SELECTCOM 29（背面座位肛交 CFLAG:330）——

test('COM29 初めて：助手玛奥与非助手玛奥各三档', async () => {
  const cases = [
    {
      assi: true,
      talent: 76,
      expected: '「呜……啊啊♡ 屁股……被塞得满满的……嗯啊啊♡」',
    },
    {
      assi: true,
      talent: 85,
      expected: '「呜……啊啊……不，不要同时……攻击胸部啊！」',
    },
    { assi: true, expected: '「不……不要做这种事啊啊！」' },
    {
      talent: 76,
      expected: '「呜……啊啊…♡ 屁股……被塞得满满的……嗯啊啊…♡」',
    },
    {
      talent: 85,
      expected: '「唔啊……啊啊……魔王大人……不，不可以同时……侵犯屁股和胸部啊啊♡」',
    },
    { expected: '「放，放开我啊啊……这样……好羞耻……呜呜呜！」' },
  ];
  for (const [index, item] of cases.entries()) {
    const fixture = setup_lily((f, era_flag) => {
      if (item.assi) {
        era_flag.assi = MAO;
        era_flag.assiplay = 1;
      }
      if (item.talent !== undefined) {
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      }
    }, 29);
    if (item.assi) {
      fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
      fixture.era.addCharacter(MAO);
    }
    await speak_com11(fixture, seq_rand());
    assert.equal(
      fixture.text_lines()[0],
      item.expected,
      `COM29 初次第 ${index + 1} 档台词`,
    );
    assert.equal(
      fixture.store.get(`cflag:${LILY}:330`),
      1,
      `COM29 初次第 ${index + 1} 档推进`,
    );
  }
});

test('COM29 初めて：武器三目须同时满足', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set('talent:0:121', 0);
    f.store.set('talent:0:122', 1);
  }, 29);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand());
  assert.equal(
    fixture.text_lines()[3],
    '莉莉的肛门在快感下一缩一缩地，紧紧夹着你的阴茎……',
    'COM29 武器三目单侧素质时使用阴茎',
  );
});

test('COM29 二回目：助手玛奥六档推进', async () => {
  const cases = [
    { talent: 76, abl: 3, expected: 7 },
    { talent: 76, expected: 6 },
    { talent: 85, abl: 3, expected: 5 },
    { talent: 85, expected: 4 },
    { abl: 3, expected: 3 },
    { expected: 2 },
  ];
  for (const [index, item] of cases.entries()) {
    const fixture = setup_lily((f, era_flag) => {
      era_flag.assi = MAO;
      era_flag.assiplay = 1;
      f.store.set(`cflag:${LILY}:330`, 1);
      if (item.talent !== undefined) {
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      }
      if (item.abl !== undefined) {
        f.store.set(`abl:${LILY}:3`, item.abl);
      }
    }, 29);
    fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
    fixture.era.addCharacter(MAO);
    await speak_com11(fixture, seq_rand());
    assert.equal(
      fixture.store.get(`cflag:${LILY}:330`),
      item.expected,
      `COM29 助手玛奥第 ${index + 1} 档推进`,
    );
  }
});

test('COM29 二回目：非助手玛奥六档推进', async () => {
  const cases = [
    { talent: 76, abl: 3, expected: 7 },
    { talent: 76, expected: 6 },
    { talent: 85, abl: 3, expected: 5 },
    { talent: 85, expected: 4 },
    { abl: 3, expected: 3 },
    { expected: 2 },
  ];
  for (const [index, item] of cases.entries()) {
    const fixture = setup_lily((f) => {
      f.store.set(`cflag:${LILY}:330`, 1);
      if (item.talent !== undefined) {
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      }
      if (item.abl !== undefined) {
        f.store.set(`abl:${LILY}:3`, item.abl);
      }
    }, 29);
    await speak_com11(fixture, seq_rand());
    assert.equal(
      fixture.store.get(`cflag:${LILY}:330`),
      item.expected,
      `COM29 非助手玛奥第 ${index + 1} 档推进`,
    );
  }
});

test('COM29 二回目：助手玛奥淫乱＋A感覚 RAND 第二档', async () => {
  const fixture = setup_lily((f, era_flag) => {
    era_flag.assi = MAO;
    era_flag.assiplay = 1;
    f.store.set(`cflag:${LILY}:330`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
    f.store.set(`abl:${LILY}:3`, 3);
  }, 29);
  fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(MAO);
  await speak_com11(fixture, seq_rand(1, 0));
  assert.equal(
    fixture.text_lines()[0],
    '「呜啊……嗯啊啊♡ 肛交……好舒服……真的是太棒了啊啊♡」',
    'COM29 助手玛奥淫乱＋A感覚 RAND 第二档台词',
  );
});

test('COM29 二回目：非助手玛奥それ以外 RAND 第二档', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:330`, 1);
  }, 29);
  await speak_com11(fixture, seq_rand(1, 0));
  assert.equal(
    fixture.text_lines()[0],
    '「不，不可以全部……插进来啊……好痛！好痛！！」',
    'COM29 非助手玛奥それ以外 RAND 第二档台词',
  );
});

// —— SELECTCOM 30（手淫 CFLAG:331）——

test('COM30 初めて：助手玛奥与非助手玛奥各四档', async () => {
  const cases = [
    { assi: true, talent: 76, expected: '『姐姐弄得人家的小肉棒好舒服啊啊♡』' },
    {
      assi: true,
      talent: 85,
      expected: '「居然会有给你……做这种事情的一天…」',
    },
    { assi: true, abl: 3, expected: '『姐姐，要好好侍奉人家的小鸡鸡啊♡』' },
    { assi: true, expected: '「为，为什么……你会长出这样的东西来啊啊！」' },
    {
      talent: 76,
      expected: '「啊啊……魔王大人的阴茎……雄伟地树立在人家面前♡」',
    },
    {
      talent: 85,
      expected: '「啊啊……魔王大人的阴茎……在人家的手里变得硬邦邦的了♡」',
    },
    { abl: 3, expected: '「真是的……这种……黏糊糊的感觉……」' },
    { expected: '「完全不想做这，这种事情……呜呜呜！」' },
  ];
  for (const [index, item] of cases.entries()) {
    const fixture = setup_lily((f, era_flag) => {
      if (item.assi) {
        era_flag.assi = MAO;
        era_flag.assiplay = 1;
      }
      if (item.talent !== undefined) {
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      }
      if (item.abl !== undefined) {
        f.store.set(`abl:${LILY}:16`, item.abl);
      }
    }, 30);
    if (item.assi) {
      fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
      fixture.era.addCharacter(MAO);
    }
    await speak_com11(fixture, seq_rand());
    assert.equal(
      fixture.text_lines()[0],
      item.expected,
      `COM30 初次第 ${index + 1} 档台词`,
    );
    assert.equal(
      fixture.store.get(`cflag:${LILY}:331`),
      1,
      `COM30 初次第 ${index + 1} 档推进`,
    );
  }
});

test('COM30 二回目：助手玛奥可达档与原作被遮蔽的 CFLAG=3 档', async () => {
  const cases = [
    { talent: 76, abl: 3, expected: 5 },
    { talent: 85, abl: 3, expected: 4 },
    { abl: 3, expected: 2 },
    { expected: 2 },
  ];
  for (const [index, item] of cases.entries()) {
    const fixture = setup_lily((f, era_flag) => {
      era_flag.assi = MAO;
      era_flag.assiplay = 1;
      f.store.set('flag:7', 1); // 中和 || 口上开关===2 逃逸支，让 CFLAG 上界真正生效
      f.store.set(`cflag:${LILY}:331`, 1);
      if (item.talent !== undefined) {
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      }
      if (item.abl !== undefined) {
        f.store.set(`abl:${LILY}:16`, item.abl);
      }
    }, 30);
    fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
    fixture.era.addCharacter(MAO);
    await speak_com11(fixture, seq_rand());
    assert.equal(
      fixture.store.get(`cflag:${LILY}:331`),
      item.expected,
      `COM30 助手玛奥可达第 ${index + 1} 档推进`,
    );
  }
});

test('COM30 二回目：非助手玛奥可达档与原作被遮蔽的 CFLAG=3 档', async () => {
  const cases = [
    { talent: 76, expected: 5 },
    { talent: 85, abl: 3, expected: 4 },
    { abl: 3, expected: 2 },
    { expected: 2 },
  ];
  for (const [index, item] of cases.entries()) {
    const fixture = setup_lily((f) => {
      f.store.set('flag:7', 1); // 中和 || 口上开关===2 逃逸支，让 CFLAG 上界真正生效
      f.store.set(`cflag:${LILY}:331`, 1);
      if (item.talent !== undefined) {
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      }
      if (item.abl !== undefined) {
        f.store.set(`abl:${LILY}:16`, item.abl);
      }
    }, 30);
    await speak_com11(fixture, seq_rand());
    assert.equal(
      fixture.store.get(`cflag:${LILY}:331`),
      item.expected,
      `COM30 非助手玛奥可达第 ${index + 1} 档推进`,
    );
  }
});

test('COM30 二回目：非助手玛奥淫乱 RAND 第一档', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:331`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 30);
  await speak_com11(fixture, seq_rand(0));
  assert.equal(
    fixture.text_lines()[0],
    '「嘿嘿，莉莉的手交侍奉如何呀…一会儿可要满满地射出来哦♡」',
    'COM30 非助手玛奥淫乱 RAND 第一档台词',
  );
});

test('COM30 二回目：非助手玛奥爱慕 RAND 第二档', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:331`, 1);
    f.store.set(`talent:${LILY}:85`, 1);
    f.store.set(`abl:${LILY}:16`, 3);
  }, 30);
  await speak_com11(fixture, seq_rand(1));
  assert.equal(
    fixture.text_lines()[0],
    '「魔王大人……这样用手侍奉，感觉舒服吗…舒服的话就在莉莉的手上射精吧♡」',
    'COM30 非助手玛奥爱慕 RAND 第二档台词',
  );
});

// —— SELECTCOM 31（口交 CFLAG:332）——

test('COM31 初めて：助手玛奥与非助手玛奥各四档', async () => {
  const cases = [
    { assi: true, talent: 76, expected: '「唔呣……唔呣……阴茎……好喜欢♡」' },
    {
      assi: true,
      talent: 85,
      expected:
        '「要……要姐姐去吸妹妹腿间长出来的…奇怪东西……这种事实在是…唔呣……唔唔」',
    },
    {
      assi: true,
      abl: 3,
      expected: '「唔呣……唔唔……唔呣……这，这样可以吗……还要继续？」',
    },
    {
      assi: true,
      expected: '『哎嘿嘿 ，被姐姐舔着小鸡鸡的感觉，好像在做梦一样♪』',
    },
    { talent: 76, expected: '「哈啊……唔呣……呣呣……阴茎的味道……好棒♡」' },
    { talent: 85, expected: '「莉莉会好好侍奉陛下的阴茎的♡……唔呣……唔呣♡」' },
    {
      abl: 3,
      expected:
        '「嗯哈…嗯啾…咻…哈呣…嗯噗…啊啊，可不要把我当那种看到阴茎就想舔上去的女人啊！这个是…没办法的事，所以……所以…嗯…啾……………」',
    },
    {
      expected:
        '「呜呜……唔呣……如，如果我这么做了……能放过我的妹妹嘛……唔呣……嗯噗」',
    },
  ];
  for (const [index, item] of cases.entries()) {
    const fixture = setup_lily((f, era_flag) => {
      if (item.assi) {
        era_flag.assi = MAO;
        era_flag.assiplay = 1;
      }
      if (item.talent !== undefined)
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      if (item.abl !== undefined) f.store.set(`abl:${LILY}:16`, item.abl);
    }, 31);
    if (item.assi) {
      fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
      fixture.era.addCharacter(MAO);
    }
    await speak_com11(fixture, seq_rand());
    assert.equal(
      fixture.text_lines()[0],
      item.expected,
      `COM31 初次第 ${index + 1} 档台词`,
    );
    assert.equal(
      fixture.store.get(`cflag:${LILY}:332`),
      1,
      `COM31 初次第 ${index + 1} 档推进`,
    );
  }
});

test('COM31 二回目：助手玛奥四档推进', async () => {
  const cases = [
    { talent: 76, expected: 5 },
    { talent: 85, expected: 4 },
    { abl: 3, expected: 3 },
    { expected: 2 },
  ];
  for (const [index, item] of cases.entries()) {
    const fixture = setup_lily((f, era_flag) => {
      era_flag.assi = MAO;
      era_flag.assiplay = 1;
      f.store.set(`cflag:${LILY}:332`, 1);
      if (item.talent !== undefined)
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      if (item.abl !== undefined) f.store.set(`abl:${LILY}:16`, item.abl);
    }, 31);
    fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
    fixture.era.addCharacter(MAO);
    await speak_com11(fixture, seq_rand());
    assert.equal(
      fixture.store.get(`cflag:${LILY}:332`),
      item.expected,
      `COM31 助手玛奥第 ${index + 1} 档推进`,
    );
  }
});

test('COM31 二回目：非助手玛奥四档推进', async () => {
  const cases = [
    { talent: 76, expected: 5 },
    { talent: 85, expected: 4 },
    { abl: 3, expected: 3 },
    { expected: 2 },
  ];
  for (const [index, item] of cases.entries()) {
    const fixture = setup_lily((f) => {
      f.store.set(`cflag:${LILY}:332`, 1);
      if (item.talent !== undefined)
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      if (item.abl !== undefined) f.store.set(`abl:${LILY}:16`, item.abl);
    }, 31);
    await speak_com11(fixture, seq_rand());
    assert.equal(
      fixture.store.get(`cflag:${LILY}:332`),
      item.expected,
      `COM31 非助手玛奥第 ${index + 1} 档推进`,
    );
  }
});

test('COM31 二回目：非助手玛奥淫乱 RAND 第二档', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:332`, 1);
    f.store.set(`talent:${LILY}:76`, 1);
  }, 31);
  await speak_com11(fixture, seq_rand(1, 0));
  assert.equal(
    fixture.text_lines()[0],
    '「唔呣……呣呣……魔王大人的……阴茎在莉莉的嘴里……涨得好大♡ 哈啊……唔呣……呣呣……♡」',
    'COM31 非助手玛奥淫乱 RAND 第二档台词',
  );
});

test('COM31 二回目：非助手玛奥奉仕精神 RAND 第二档', async () => {
  const fixture = setup_lily((f) => {
    f.store.set(`cflag:${LILY}:332`, 1);
    f.store.set(`abl:${LILY}:16`, 3);
  }, 31);
  await speak_com11(fixture, seq_rand(1));
  assert.equal(
    fixture.text_lines()[0],
    '「唔呣……呣呣……魔王大人的阴茎……在嘴巴里勃起了……唔呣……唔呣……呣呣」',
    'COM31 非助手玛奥奉仕精神 RAND 第二档台词',
  );
});

// —— SELECTCOM 32（乳交 CFLAG:333）——

test('COM32 初めて：助手玛奥与非助手玛奥各四档', async () => {
  const cases = [
    {
      assi: true,
      expected: '『被姐姐的巨乳这么侍奉着小鸡鸡…啊啊我也想要这么大的胸部啊♡』',
    },
    {
      talent: 76,
      expected:
        '「听说男人都很喜欢被这样进行乳交侍奉呢、啊啊……乳房这样摩擦着，感觉也兴奋起来了♡」',
    },
    { talent: 85, expected: '「啊啊……魔王大人喜欢莉莉的乳交侍奉吗…好高兴♡」' },
    { abl: 3, expected: '「呜啊啊…用，用胸部这样做……感觉舒服吗？」' },
    { expected: '「呜呜……胸部…明明不是用来做这种事情的……」' },
  ];
  for (const [index, item] of cases.entries()) {
    const fixture = setup_lily((f, era_flag) => {
      if (item.assi) {
        era_flag.assi = MAO;
        era_flag.assiplay = 1;
      }
      if (item.talent !== undefined)
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      if (item.abl !== undefined) f.store.set(`abl:${LILY}:16`, item.abl);
    }, 32);
    if (item.assi) {
      fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
      fixture.era.addCharacter(MAO);
    }
    await speak_com11(fixture, seq_rand());
    assert.equal(
      fixture.text_lines()[0],
      item.expected,
      `COM32 初次第 ${index + 1} 档台词`,
    );
    assert.equal(
      fixture.store.get(`cflag:${LILY}:333`),
      1,
      `COM32 初次第 ${index + 1} 档推进`,
    );
  }
});

test('COM32 二回目：助手玛奥四档推进', async () => {
  const cases = [
    { talent: 76, expected: 5 },
    { talent: 85, expected: 4 },
    { abl: 3, expected: 3 },
    { expected: 2 },
  ];
  for (const [index, item] of cases.entries()) {
    const fixture = setup_lily((f, era_flag) => {
      era_flag.assi = MAO;
      era_flag.assiplay = 1;
      f.store.set('flag:7', 1);
      f.store.set(`cflag:${LILY}:332`, 1);
      f.store.set(`cflag:${LILY}:333`, 1);
      if (item.talent !== undefined)
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      if (item.abl !== undefined) f.store.set(`abl:${LILY}:16`, item.abl);
    }, 32);
    fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
    fixture.era.addCharacter(MAO);
    await speak_com11(fixture, seq_rand());
    assert.equal(
      fixture.store.get(`cflag:${LILY}:333`),
      item.expected,
      `COM32 助手玛奥第 ${index + 1} 档推进`,
    );
  }
});

test('COM32 二回目：非助手玛奥四档推进', async () => {
  const cases = [
    { talent: 76, expected: 5 },
    { talent: 85, expected: 4 },
    { abl: 3, expected: 3 },
    { expected: 2 },
  ];
  for (const [index, item] of cases.entries()) {
    const fixture = setup_lily((f) => {
      f.store.set('flag:7', 1);
      f.store.set(`cflag:${LILY}:332`, 1);
      f.store.set(`cflag:${LILY}:333`, 1);
      if (item.talent !== undefined)
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      if (item.abl !== undefined) f.store.set(`abl:${LILY}:16`, item.abl);
    }, 32);
    await speak_com11(fixture, seq_rand());
    assert.equal(
      fixture.store.get(`cflag:${LILY}:333`),
      item.expected,
      `COM32 非助手玛奥第 ${index + 1} 档推进`,
    );
  }
});

test('COM32 二回目：两处淫乱守卫 1:1 误读前一支 CFLAG:332', async () => {
  for (const assi of [false, true]) {
    const fixture = setup_lily((f, era_flag) => {
      if (assi) {
        era_flag.assi = MAO;
        era_flag.assiplay = 1;
      }
      f.store.set('flag:7', 1);
      f.store.set(`talent:${LILY}:76`, 1);
      f.store.set(`cflag:${LILY}:332`, 4);
      f.store.set(`cflag:${LILY}:333`, 5);
    }, 32);
    if (assi) {
      fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
      fixture.era.addCharacter(MAO);
    }
    await speak_com11(fixture, seq_rand());
    assert.equal(
      fixture.store.get(`cflag:${LILY}:333`),
      5,
      `COM32 ${assi ? '助手' : '非助手'}淫乱守卫误读 CFLAG:332`,
    );
    assert.notEqual(
      fixture.text_lines().length,
      0,
      `COM32 ${assi ? '助手' : '非助手'}误读仍可输出`,
    );
  }
});

// —— SELECTCOM 33（素股 CFLAG:334）——

test('COM33 初めて：助手玛奥与非助手玛奥三档', async () => {
  const cases = [
    {
      assi: true,
      expected: '『姐姐那里都湿透了呢，哈哈，用那里摩擦着小鸡鸡很舒服吧♪』',
    },
    {
      talent: 76,
      expected:
        '「虽，虽然只在外面摩擦……但是……碰到的都是敏感点……魔王大人的阴茎好厉害啊啊♡」',
    },
    {
      talent: 85,
      expected:
        '「哈啊……啊啊！魔，魔王大人的阴茎……好热……光是摩擦着……人家的蜜穴就像要融化了一样♡」',
    },
    {
      expected:
        '「呜呜！可，可以停下了吗……做这种奇怪的事情……真的会感觉舒服吗……」',
    },
  ];
  for (const [index, item] of cases.entries()) {
    const fixture = setup_lily((f, era_flag) => {
      if (item.assi) {
        era_flag.assi = MAO;
        era_flag.assiplay = 1;
      }
      if (item.talent !== undefined)
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
    }, 33);
    if (item.assi) {
      fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
      fixture.era.addCharacter(MAO);
    }
    await speak_com11(fixture, seq_rand());
    assert.equal(
      fixture.text_lines()[0],
      item.expected,
      `COM33 初次第 ${index + 1} 档台词`,
    );
    assert.equal(
      fixture.store.get(`cflag:${LILY}:334`),
      1,
      `COM33 初次第 ${index + 1} 档推进`,
    );
  }
});

test('COM33 二回目：助手玛奥五档推进', async () => {
  const cases = [
    { talent: 76, virgin: true, expected: 6 },
    { talent: 76, expected: 5 },
    { talent: 85, virgin: true, expected: 4 },
    { talent: 85, expected: 3 },
    { expected: 2 },
  ];
  for (const [index, item] of cases.entries()) {
    const fixture = setup_lily((f, era_flag) => {
      era_flag.assi = MAO;
      era_flag.assiplay = 1;
      f.store.set('flag:7', 1);
      f.store.set(`cflag:${LILY}:334`, 1);
      if (item.talent !== undefined)
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      if (item.virgin) f.store.set(`talent:${LILY}:0`, 1);
    }, 33);
    fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
    fixture.era.addCharacter(MAO);
    await speak_com11(fixture, seq_rand());
    assert.equal(
      fixture.store.get(`cflag:${LILY}:334`),
      item.expected,
      `COM33 助手玛奥第 ${index + 1} 档推进`,
    );
  }
});

test('COM33 二回目：非助手玛奥五档推进', async () => {
  const cases = [
    { talent: 76, virgin: true, expected: 6 },
    { talent: 76, expected: 5 },
    { talent: 85, virgin: true, expected: 4 },
    { talent: 85, expected: 3 },
    { expected: 2 },
  ];
  for (const [index, item] of cases.entries()) {
    const fixture = setup_lily((f) => {
      f.store.set('flag:7', 1);
      f.store.set(`cflag:${LILY}:334`, 1);
      if (item.talent !== undefined)
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      if (item.virgin) f.store.set(`talent:${LILY}:0`, 1);
    }, 33);
    await speak_com11(fixture, seq_rand());
    assert.equal(
      fixture.store.get(`cflag:${LILY}:334`),
      item.expected,
      `COM33 非助手玛奥第 ${index + 1} 档推进`,
    );
  }
});

// —— SELECTCOM 34（骑乘位 CFLAG:335）——

test('COM34 初めて：处女与非处女、助手玛奥分档', async () => {
  const cases = [
    {
      assi: true,
      virgin: true,
      talent: 76,
      expected: '「呜……我的处女……居然要献给妹妹了啊啊啊♡」',
    },
    {
      virgin: true,
      talent: 85,
      expected:
        '「哈啊……哈啊……感受到……魔王大人的阴茎了……请，请收下莉莉的处女吧♡」',
    },
    {
      assi: true,
      virgin: true,
      dildo: true,
      expected: '「呜……呜呜……求你了……放过姐姐吧，姐姐还是处女啊……」',
      includes: '电动假阳具不由分说地贯穿了处女蜜穴',
    },
    {
      assi: true,
      talent: 76,
      expected: '「呜啊……啊啊……顶，顶到最里面了……好舒服♡」',
    },
    {
      talent: 85,
      expected:
        '莉莉带着一脸的幸福，有些笨拙地扭动着腰，让你的阴茎在自己爱液泛滥的蜜穴里进出着。',
    },
    {
      expected: '莉莉屈辱而痛苦的咬着嘴唇，在你的命令下上下扭动着腰。',
    },
  ];
  for (const [index, item] of cases.entries()) {
    const fixture = setup_lily((f, era_flag) => {
      if (item.assi) {
        era_flag.assi = MAO;
        era_flag.assiplay = 1;
      }
      if (item.virgin) f.store.set(`talent:${LILY}:0`, 1);
      if (item.dildo) f.store.set('talent:0:122', 0);
      if (item.talent !== undefined)
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
    }, 34);
    if (item.assi) {
      fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
      fixture.era.addCharacter(MAO);
    }
    await speak_com11(fixture, seq_rand());
    assert.equal(
      fixture.text_lines()[0],
      item.expected,
      `COM34 初次第 ${index + 1} 档台词`,
    );
    if (item.includes !== undefined) {
      assert.ok(
        fixture.text_lines().some((line) => line.includes(item.includes)),
        `COM34 初次第 ${index + 1} 档条件性器文本`,
      );
    }
    assert.equal(
      fixture.store.get(`cflag:${LILY}:335`),
      1,
      `COM34 初次第 ${index + 1} 档推进`,
    );
  }
});

test('COM34 二回目：助手玛奥五档推进', async () => {
  const cases = [
    { talent: 76, expected: 6 },
    { talent: 85, expected: 5 },
    { mark: 3, abl: 3, expected: 4 },
    { mark: 3, expected: 3 },
    { expected: 2 },
  ];
  for (const [index, item] of cases.entries()) {
    const fixture = setup_lily((f, era_flag) => {
      era_flag.assi = MAO;
      era_flag.assiplay = 1;
      f.store.set('flag:7', 1);
      f.store.set(`cflag:${LILY}:335`, 1);
      if (item.talent !== undefined)
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      if (item.mark !== undefined) f.store.set(`mark:${LILY}:2`, item.mark);
      if (item.abl !== undefined) f.store.set(`abl:${LILY}:2`, item.abl);
    }, 34);
    fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
    fixture.era.addCharacter(MAO);
    await speak_com11(fixture, seq_rand());
    assert.equal(
      fixture.store.get(`cflag:${LILY}:335`),
      item.expected,
      `COM34 助手玛奥第 ${index + 1} 档推进`,
    );
  }
});

test('COM34 二回目：非助手玛奥五档推进', async () => {
  const cases = [
    { talent: 76, expected: 6 },
    { talent: 85, expected: 5 },
    { mark: 3, abl: 3, expected: 4 },
    { mark: 3, expected: 3 },
    { expected: 2 },
  ];
  for (const [index, item] of cases.entries()) {
    const fixture = setup_lily((f) => {
      f.store.set('flag:7', 1);
      f.store.set(`cflag:${LILY}:335`, 1);
      if (item.talent !== undefined)
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      if (item.mark !== undefined) f.store.set(`mark:${LILY}:2`, item.mark);
      if (item.abl !== undefined) f.store.set(`abl:${LILY}:2`, item.abl);
    }, 34);
    await speak_com11(fixture, seq_rand());
    assert.equal(
      fixture.store.get(`cflag:${LILY}:335`),
      item.expected,
      `COM34 非助手玛奥第 ${index + 1} 档推进`,
    );
  }
});

// —— SELECTCOM 35（泡踊り／全身擦洗 CFLAG:336）——

test('COM35 初めて：助手玛奥与非助手玛奥奉仕精神分档', async () => {
  const cases = [
    {
      assi: true,
      expected:
        '『嘻嘻，和姐姐一起洗澡真高兴，想起了以前的日子呢。不过一个人在这里的时候我也有好好洗澡呢，像这样♪』',
    },
    {
      abl: 3,
      expected: '「啊啊，魔王大人的身体……好有魅力……！」',
    },
    {
      expected: '「是，是要人家帮你……擦拭身体嘛……我，我会照做的……！」',
    },
  ];
  for (const [index, item] of cases.entries()) {
    const fixture = setup_lily((f, era_flag) => {
      if (item.assi) {
        era_flag.assi = MAO;
        era_flag.assiplay = 1;
      }
      if (item.abl !== undefined) f.store.set(`abl:${LILY}:16`, item.abl);
    }, 35);
    if (item.assi) {
      fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
      fixture.era.addCharacter(MAO);
    }
    await speak_com11(fixture, seq_rand());
    assert.equal(
      fixture.text_lines()[0],
      item.expected,
      `COM35 初次第 ${index + 1} 档台词`,
    );
    assert.equal(
      fixture.store.get(`cflag:${LILY}:336`),
      1,
      `COM35 初次第 ${index + 1} 档推进`,
    );
  }
});

test('COM35 二回目：助手玛奥四档推进', async () => {
  const cases = [
    { talent: 76, abl: 5, expected: 5 },
    { talent: 85, abl: 5, expected: 4 },
    { abl: 3, expected: 3 },
    { expected: 2 },
  ];
  for (const [index, item] of cases.entries()) {
    const fixture = setup_lily((f, era_flag) => {
      era_flag.assi = MAO;
      era_flag.assiplay = 1;
      f.store.set('flag:7', 1);
      f.store.set(`cflag:${LILY}:336`, 1);
      if (item.talent !== undefined)
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      if (item.abl !== undefined) f.store.set(`abl:${LILY}:16`, item.abl);
    }, 35);
    fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
    fixture.era.addCharacter(MAO);
    await speak_com11(fixture, seq_rand());
    assert.equal(
      fixture.store.get(`cflag:${LILY}:336`),
      item.expected,
      `COM35 助手玛奥第 ${index + 1} 档推进`,
    );
  }
});

test('COM35 二回目：非助手玛奥四档推进', async () => {
  const cases = [
    { talent: 76, abl: 5, expected: 5 },
    { talent: 85, abl: 5, expected: 4 },
    { abl: 3, expected: 3 },
    { expected: 2 },
  ];
  for (const [index, item] of cases.entries()) {
    const fixture = setup_lily((f) => {
      f.store.set('flag:7', 1);
      f.store.set(`cflag:${LILY}:336`, 1);
      if (item.talent !== undefined)
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      if (item.abl !== undefined) f.store.set(`abl:${LILY}:16`, item.abl);
    }, 35);
    await speak_com11(fixture, seq_rand(1));
    assert.equal(
      fixture.store.get(`cflag:${LILY}:336`),
      item.expected,
      `COM35 非助手玛奥第 ${index + 1} 档推进`,
    );
  }
});

// —— SELECTCOM 36（骑乘位肛交 CFLAG:337）——

test('COM36 初めて：助手玛奥与非助手玛奥三档', async () => {
  const cases = [
    { assi: true, talent: 76, expected: '「呜啊……啊啊……好，好舒服……♡」' },
    {
      assi: true,
      talent: 85,
      expected: '「呜……呜啊……玛奥为什么会……长出这种奇怪的东西……！」',
    },
    { assi: true, expected: '「不，不可能……插进来啊啊…！」' },
    {
      talent: 76,
      expected: '莉莉的肛门被你从下方径直插入到了深处。',
    },
    {
      talent: 85,
      expected: '莉莉的肛门被你从下方径直插入到了深处',
    },
    {
      expected: '莉莉的肛门被你从下方径直插入到了深处',
    },
  ];
  for (const [index, item] of cases.entries()) {
    const fixture = setup_lily((f, era_flag) => {
      if (item.assi) {
        era_flag.assi = MAO;
        era_flag.assiplay = 1;
        era_flag.player = MAO;
      }
      if (item.talent !== undefined)
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
    }, 36);
    if (item.assi) {
      fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
      fixture.era.addCharacter(MAO);
    }
    await speak_com11(fixture, seq_rand());
    assert.equal(
      fixture.text_lines()[0],
      item.expected,
      `COM36 初次第 ${index + 1} 档台词`,
    );
    assert.equal(
      fixture.store.get(`cflag:${LILY}:337`),
      1,
      `COM36 初次第 ${index + 1} 档推进`,
    );
  }
});

test('COM36 二回目：助手玛奥六档推进', async () => {
  const cases = [
    { talent: 76, abl: 3, expected: 7 },
    { talent: 76, expected: 6 },
    { talent: 85, abl: 3, expected: 5 },
    { talent: 85, expected: 4 },
    { abl: 3, expected: 3 },
    { expected: 2 },
  ];
  for (const [index, item] of cases.entries()) {
    const fixture = setup_lily((f, era_flag) => {
      era_flag.assi = MAO;
      era_flag.assiplay = 1;
      era_flag.player = MAO;
      f.store.set('flag:7', 1);
      f.store.set(`cflag:${LILY}:337`, 1);
      if (item.talent !== undefined)
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      if (item.abl !== undefined) f.store.set(`abl:${LILY}:3`, item.abl);
    }, 36);
    fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
    fixture.era.addCharacter(MAO);
    await speak_com11(fixture, seq_rand());
    assert.equal(
      fixture.store.get(`cflag:${LILY}:337`),
      item.expected,
      `COM36 助手玛奥第 ${index + 1} 档推进`,
    );
  }
});

test('COM36 二回目：非助手玛奥六档推进', async () => {
  const cases = [
    { talent: 76, abl: 3, expected: 7 },
    { talent: 76, expected: 6 },
    { talent: 85, abl: 3, expected: 5 },
    { talent: 85, expected: 4 },
    { abl: 3, expected: 3 },
    { expected: 2 },
  ];
  for (const [index, item] of cases.entries()) {
    const fixture = setup_lily((f) => {
      f.store.set('flag:7', 1);
      f.store.set(`cflag:${LILY}:337`, 1);
      if (item.talent !== undefined)
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      if (item.abl !== undefined) f.store.set(`abl:${LILY}:3`, item.abl);
    }, 36);
    await speak_com11(fixture, seq_rand());
    assert.equal(
      fixture.store.get(`cflag:${LILY}:337`),
      item.expected,
      `COM36 非助手玛奥第 ${index + 1} 档推进`,
    );
  }
});

// —— SELECTCOM 37（肛门侍奉 CFLAG:338）——

test('COM37 初めて：助手玛奥与非助手玛奥奉仕精神分档', async () => {
  const cases = [
    {
      assi: true,
      expected:
        '『哎啊啊…姐姐居然在舔我的肛门！这感觉真是太棒了，整个人都兴奋起来了呢！』',
    },
    {
      abl: 3,
      expected:
        '「唔呣呣……呣呣……这都是，都是为了……救出妹妹才这么做的……所以，所以……呣呣呣」',
    },
    {
      expected:
        '「唔呣呣……好脏……但是，但是……这都是，都是为了……救出妹妹才这么做的……！」',
    },
  ];
  for (const [index, item] of cases.entries()) {
    const fixture = setup_lily((f, era_flag) => {
      if (item.assi) {
        era_flag.assi = MAO;
        era_flag.assiplay = 1;
        era_flag.player = MAO;
      }
      if (item.abl !== undefined) f.store.set(`abl:${LILY}:16`, item.abl);
    }, 37);
    if (item.assi) {
      fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
      fixture.era.addCharacter(MAO);
    }
    await speak_com11(fixture, seq_rand());
    assert.equal(
      fixture.text_lines()[0],
      item.expected,
      `COM37 初次第 ${index + 1} 档台词`,
    );
    assert.equal(
      fixture.store.get(`cflag:${LILY}:338`),
      1,
      `COM37 初次第 ${index + 1} 档推进`,
    );
  }
});

test('COM37 二回目：助手玛奥四档推进', async () => {
  const cases = [
    { talent: 76, abl: 5, expected: 5 },
    { talent: 85, abl: 5, expected: 4 },
    { abl: 3, expected: 3 },
    { expected: 2 },
  ];
  for (const item of cases) {
    const fixture = setup_lily((f, era_flag) => {
      era_flag.assi = MAO;
      era_flag.assiplay = 1;
      era_flag.player = MAO;
      f.store.set('flag:7', 1);
      f.store.set(`cflag:${LILY}:338`, 1);
      if (item.talent !== undefined)
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      if (item.abl !== undefined) f.store.set(`abl:${LILY}:16`, item.abl);
    }, 37);
    fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
    fixture.era.addCharacter(MAO);
    await speak_com11(fixture, seq_rand());
    assert.equal(
      fixture.store.get(`cflag:${LILY}:338`),
      item.expected,
      'COM37 助手玛奥状态推进',
    );
  }
});

test('COM37 二回目：非助手玛奥四档推进', async () => {
  const cases = [
    { talent: 76, abl: 5, expected: 5 },
    { talent: 85, abl: 5, expected: 4 },
    { abl: 3, expected: 3 },
    { expected: 2 },
  ];
  for (const item of cases) {
    const fixture = setup_lily((f) => {
      f.store.set('flag:7', 1);
      f.store.set(`cflag:${LILY}:338`, 1);
      if (item.talent !== undefined)
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      if (item.abl !== undefined) f.store.set(`abl:${LILY}:16`, item.abl);
    }, 37);
    await speak_com11(fixture, seq_rand());
    assert.equal(
      fixture.store.get(`cflag:${LILY}:338`),
      item.expected,
      'COM37 非助手玛奥状态推进',
    );
  }
});

// —— SELECTCOM 40（スパンキング／打屁股 CFLAG:341）——

test('COM40 初めて：助手玛奥与非助手玛奥分档', async () => {
  const cases = [
    {
      assi: true,
      expected: '『姐姐以前还打过我的屁股，现在轮到妹妹十倍奉还了哈哈哈哈！』',
    },
    { expected: '「住，住手啊！好痛……屁股好痛啊啊！」' },
  ];
  for (const item of cases) {
    const fixture = setup_lily((f, era_flag) => {
      if (item.assi) {
        era_flag.assi = MAO;
        era_flag.assiplay = 1;
      }
    }, 40);
    if (item.assi) {
      fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
      fixture.era.addCharacter(MAO);
    }
    await speak_com11(fixture, seq_rand());
    assert.equal(fixture.text_lines()[0], item.expected);
    assert.equal(fixture.store.get(`cflag:${LILY}:341`), 1);
  }
});

test('COM40 二回目：助手玛奥四档推进', async () => {
  const cases = [
    { talent: 76, abl: 3, expected: 5 },
    { talent: 85, abl: 3, expected: 4 },
    { marks: true, expected: 3 },
    { expected: 2 },
  ];
  for (const item of cases) {
    const fixture = setup_lily((f, era_flag) => {
      era_flag.assi = MAO;
      era_flag.assiplay = 1;
      f.store.set('flag:7', 2);
      f.store.set(`cflag:${LILY}:341`, 1);
      if (item.talent !== undefined)
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      if (item.abl !== undefined) f.store.set(`abl:${LILY}:21`, item.abl);
      if (item.marks) {
        f.store.set(`mark:${LILY}:0`, 3);
        f.store.set(`mark:${LILY}:2`, 3);
      }
    }, 40);
    fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
    fixture.era.addCharacter(MAO);
    await speak_com11(fixture, seq_rand());
    assert.equal(fixture.store.get(`cflag:${LILY}:341`), item.expected);
  }
});

test('COM40 二回目：非助手玛奥四档推进', async () => {
  const cases = [
    { talent: 76, abl: 3, expected: 5 },
    { talent: 85, abl: 3, expected: 4 },
    { marks: true, expected: 3 },
    { expected: 2 },
  ];
  for (const item of cases) {
    const fixture = setup_lily((f) => {
      f.store.set('flag:7', 2);
      f.store.set(`cflag:${LILY}:341`, 1);
      if (item.talent !== undefined)
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      if (item.abl !== undefined) f.store.set(`abl:${LILY}:21`, item.abl);
      if (item.marks) {
        f.store.set(`mark:${LILY}:0`, 3);
        f.store.set(`mark:${LILY}:2`, 3);
      }
    }, 40);
    await speak_com11(fixture, seq_rand());
    assert.equal(fixture.store.get(`cflag:${LILY}:341`), item.expected);
  }
});

// —— SELECTCOM 41（鞭 CFLAG:342）——

test('COM41 初めて：助手玛奥与非助手玛奥三档', async () => {
  const cases = [
    {
      assi: true,
      expected: '『哈哈哈哈，以后姐姐不听话，就要用这个鞭子狠狠抽打！』',
    },
    { talent: 76, expected: '「呜……呜啊啊……好痛啊啊……！」' },
    { talent: 85, expected: '「我，我做错了什么吗——啊啊啊！！！」' },
    { expected: '「呜啊啊……住，住手啊啊啊！」' },
  ];
  for (const item of cases) {
    const fixture = setup_lily((f, era_flag) => {
      if (item.assi) {
        era_flag.assi = MAO;
        era_flag.assiplay = 1;
      }
      if (item.talent !== undefined)
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
    }, 41);
    if (item.assi) {
      fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
      fixture.era.addCharacter(MAO);
    }
    await speak_com11(fixture, seq_rand());
    assert.equal(fixture.text_lines()[0], item.expected);
    assert.equal(fixture.store.get(`cflag:${LILY}:342`), 1);
  }
});

test('COM41 二回目：助手玛奥八档推进', async () => {
  const cases = [
    { talent: 76, abl: 5, expected: 9 },
    { talent: 76, abl: 3, expected: 8 },
    { talent: 76, expected: 7 },
    { talent: 85, abl: 5, expected: 6 },
    { talent: 85, abl: 3, expected: 5 },
    { talent: 85, expected: 4 },
    { abl: 3, expected: 3 },
    { expected: 2 },
  ];
  for (const item of cases) {
    const fixture = setup_lily((f, era_flag) => {
      era_flag.assi = MAO;
      era_flag.assiplay = 1;
      f.store.set('flag:7', 2);
      f.store.set(`cflag:${LILY}:342`, 1);
      if (item.talent !== undefined)
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      if (item.abl !== undefined) f.store.set(`abl:${LILY}:21`, item.abl);
    }, 41);
    fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
    fixture.era.addCharacter(MAO);
    await speak_com11(fixture, seq_rand());
    assert.equal(fixture.store.get(`cflag:${LILY}:342`), item.expected);
  }
});

test('COM41 二回目：非助手玛奥八档推进', async () => {
  const cases = [
    { talent: 76, abl: 5, expected: 9 },
    { talent: 76, abl: 3, expected: 8 },
    { talent: 76, expected: 7 },
    { talent: 85, abl: 5, expected: 6 },
    { talent: 85, abl: 3, expected: 5 },
    { talent: 85, expected: 4 },
    { abl: 3, expected: 3 },
    { expected: 2 },
  ];
  for (const item of cases) {
    const fixture = setup_lily((f) => {
      f.store.set('flag:7', 2);
      f.store.set(`cflag:${LILY}:342`, 1);
      if (item.talent !== undefined)
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      if (item.abl !== undefined) f.store.set(`abl:${LILY}:21`, item.abl);
    }, 41);
    await speak_com11(fixture, seq_rand());
    assert.equal(fixture.store.get(`cflag:${LILY}:342`), item.expected);
  }
});

// —— SELECTCOM 42（针 CFLAG:343）——

test('COM42 初めて：助手玛奥与非助手玛奥三档', async () => {
  const cases = [
    {
      assi: true,
      expected:
        '『嘿嘿嘿，接下来就是惩罚时间了、不过已经事先消毒过了，所以姐姐可以放心♪』',
    },
    {
      talent: 76,
      expected: '「呜……呜啊……不，不要啊……人家一点都不喜欢……这种玩法啊啊！」',
    },
    { talent: 85, expected: '「不，不要啊……这种调教……也太可怕了呜啊啊！」' },
    { expected: '「骗……骗人……这么多根针……扎进去……会死的……啊啊啊！」' },
  ];
  for (const item of cases) {
    const fixture = setup_lily((f, era_flag) => {
      if (item.assi) {
        era_flag.assi = MAO;
        era_flag.assiplay = 1;
      }
      if (item.talent !== undefined)
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
    }, 42);
    if (item.assi) {
      fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
      fixture.era.addCharacter(MAO);
    }
    await speak_com11(fixture, seq_rand());
    assert.equal(fixture.text_lines()[0], item.expected);
    assert.equal(fixture.store.get(`cflag:${LILY}:343`), 1);
  }
});

test('COM42 二回目：助手玛奥八档推进', async () => {
  const cases = [
    { talent: 76, abl: 5, expected: 9 },
    { talent: 76, abl: 3, expected: 8 },
    { talent: 76, expected: 7 },
    { talent: 85, abl: 5, expected: 6 },
    { talent: 85, abl: 3, expected: 5 },
    { talent: 85, expected: 4 },
    { abl: 3, expected: 3 },
    { expected: 2 },
  ];
  for (const item of cases) {
    const fixture = setup_lily((f, era_flag) => {
      era_flag.assi = MAO;
      era_flag.assiplay = 1;
      f.store.set('flag:7', 2);
      f.store.set(`cflag:${LILY}:343`, 1);
      if (item.talent !== undefined)
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      if (item.abl !== undefined) f.store.set(`abl:${LILY}:21`, item.abl);
    }, 42);
    fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
    fixture.era.addCharacter(MAO);
    await speak_com11(fixture, seq_rand());
    assert.equal(fixture.store.get(`cflag:${LILY}:343`), item.expected);
  }
});

test('COM42 二回目：非助手玛奥八档推进', async () => {
  const cases = [
    { talent: 76, abl: 5, expected: 9 },
    { talent: 76, abl: 3, expected: 8 },
    { talent: 76, expected: 7 },
    { talent: 85, abl: 5, expected: 6 },
    { talent: 85, abl: 3, expected: 5 },
    { talent: 85, expected: 4 },
    { abl: 3, expected: 3 },
    { expected: 2 },
  ];
  for (const item of cases) {
    const fixture = setup_lily((f) => {
      f.store.set('flag:7', 2);
      f.store.set(`cflag:${LILY}:343`, 1);
      if (item.talent !== undefined)
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      if (item.abl !== undefined) f.store.set(`abl:${LILY}:21`, item.abl);
    }, 42);
    await speak_com11(fixture, seq_rand());
    assert.equal(fixture.store.get(`cflag:${LILY}:343`), item.expected);
  }
});

// —— SELECTCOM 43（眼罩 CFLAG:344 / CFLAG:380）——

test('COM43 装上初めて：淫乱、爱慕与其余三档', async () => {
  const cases = [
    { talent: 76, expected: '「啊啊……什么都看不见……身体反而更兴奋了♡」' },
    { talent: 85, expected: '「不，不要这样欺负人家啦………」' },
    { expected: '「这，这是要做什么？！」' },
  ];
  for (const item of cases) {
    const fixture = setup_lily((f) => {
      f.store.set(`tequip:${LILY}:43`, 1);
      if (item.talent !== undefined)
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
    }, 43);
    await speak_com11(fixture, seq_rand());
    assert.equal(fixture.text_lines()[0], item.expected);
    assert.equal(fixture.store.get(`cflag:${LILY}:344`), 1);
  }
});

test('COM43 装上二回目：八档推进', async () => {
  const cases = [
    { talent: 76, abl: 5, expected: 9 },
    { talent: 76, abl: 3, expected: 8 },
    { talent: 76, expected: 7 },
    { talent: 85, abl: 5, expected: 6 },
    { talent: 85, abl: 3, expected: 5 },
    { talent: 85, expected: 4 },
    { abl: 3, expected: 3 },
    { expected: 2 },
  ];
  for (const item of cases) {
    const fixture = setup_lily((f) => {
      f.store.set('flag:7', 2);
      f.store.set(`tequip:${LILY}:43`, 1);
      f.store.set(`cflag:${LILY}:344`, 1);
      if (item.talent !== undefined)
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
      if (item.abl !== undefined) f.store.set(`abl:${LILY}:21`, item.abl);
    }, 43);
    await speak_com11(fixture, seq_rand());
    assert.equal(fixture.store.get(`cflag:${LILY}:344`), item.expected);
  }
});

test('COM43 取下：淫乱、爱慕与其余三档推进', async () => {
  const cases = [
    { talent: 76, expected: 3 },
    { talent: 85, expected: 2 },
    { expected: 1 },
  ];
  for (const item of cases) {
    const fixture = setup_lily((f) => {
      f.store.set('flag:7', 2);
      if (item.talent !== undefined)
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
    }, 43);
    await speak_com11(fixture, seq_rand());
    assert.equal(fixture.store.get(`cflag:${LILY}:380`), item.expected);
  }
});

// —— SELECTCOM 44（绳 CFLAG:345 / CFLAG:385）——

test('COM44 装上初めて：助手玛奥与非助手玛奥三档', async () => {
  const cases = [
    {
      assi: true,
      expected:
        '『姐姐这样的身材绑起来才好看，这淫乱的胸部，被绳子一勒看上去更大了呢♪』',
    },
    { talent: 76, expected: '「把人家捆绑起来，是想做什么呢魔王大人♡」' },
    {
      talent: 85,
      expected:
        '「魔，魔王大人……请不要绑得那么紧……可以吗，人家……会好好配合的！」',
    },
    { expected: '「绑，绑成这个样子……有什么意义！好，好痛啊！」' },
  ];
  for (const item of cases) {
    const fixture = setup_lily((f, era_flag) => {
      f.store.set(`tequip:${LILY}:44`, 1);
      if (item.assi) {
        era_flag.assi = MAO;
        era_flag.assiplay = 1;
      }
      if (item.talent !== undefined)
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
    }, 44);
    if (item.assi) {
      fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
      fixture.era.addCharacter(MAO);
    }
    await speak_com11(fixture, seq_rand());
    assert.equal(fixture.text_lines()[0], item.expected);
    assert.equal(fixture.store.get(`cflag:${LILY}:345`), 1);
  }
});

for (const [label, assistant] of [
  ['助手玛奥', true],
  ['非助手玛奥', false],
]) {
  test(`COM44 装上二回目：${label}八档推进`, async () => {
    const cases = [
      { talent: 76, abl: 5, expected: 9 },
      { talent: 76, abl: 3, expected: 8 },
      { talent: 76, expected: 7 },
      { talent: 85, abl: 5, expected: 6 },
      { talent: 85, abl: 3, expected: 5 },
      { talent: 85, expected: 4 },
      { abl: 3, expected: 3 },
      { expected: 2 },
    ];
    for (const item of cases) {
      const fixture = setup_lily((f, era_flag) => {
        f.store.set('flag:7', 2);
        f.store.set(`tequip:${LILY}:44`, 1);
        f.store.set(`cflag:${LILY}:345`, 1);
        if (assistant) {
          era_flag.assi = MAO;
          era_flag.assiplay = 1;
        }
        if (item.talent !== undefined)
          f.store.set(`talent:${LILY}:${item.talent}`, 1);
        if (item.abl !== undefined) f.store.set(`abl:${LILY}:21`, item.abl);
      }, 44);
      if (assistant) {
        fixture.seed_chara(MAO, { id: MAO, name: '玛奥', callname: '玛奥' });
        fixture.era.addCharacter(MAO);
      }
      await speak_com11(fixture, seq_rand());
      assert.equal(fixture.store.get(`cflag:${LILY}:345`), item.expected);
    }
  });
}

test('COM44 取下：淫乱、爱慕与其余三档推进', async () => {
  const cases = [
    { talent: 76, expected: 2 },
    { talent: 85, expected: 2 },
    { expected: 1 },
  ];
  for (const item of cases) {
    const fixture = setup_lily((f) => {
      f.store.set('flag:7', 2);
      if (item.talent !== undefined)
        f.store.set(`talent:${LILY}:${item.talent}`, 1);
    }, 44);
    await speak_com11(fixture, seq_rand());
    assert.equal(fixture.store.get(`cflag:${LILY}:385`), item.expected);
  }
});
