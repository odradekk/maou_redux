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

// —— 存根清单核对（本模块尚无存根，STUBBED_CALLS 恒空） ——

test('STUBBED_CALLS 恒为空数组（本文件尚未落地任何存根调用）', () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('kojo/kojo-k11-lily');
  assert.deepEqual(STUBBED_CALLS, []);
});
