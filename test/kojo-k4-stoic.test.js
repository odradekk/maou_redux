/**
 * ere/kojo/kojo-k4-stoic.js 的行为测试（issue #235：J25 口上·K4 冷徹）。
 *
 * 缝 = test/helpers/era-fixture.js。世界底座：冷徹（id 31，随机生成的
 * 冷徹性格角色——实机复现不了，测试播种素质 164 → GET_KOJO_NUM = 104）。
 * 覆盖（验收清单逐项）：
 *   - @EVENTTRAIN 初調教（CFLAG:201 状态机：初回 → 屈服Lv1/2/3 → 淫乱 →
 *     爱慕 → 助手无 → K4_KOJO2 二回目以降）与 @EVENTEND 的调教终了分档；
 *   - @KOJO_MESSAGE_COM_4 的头部守卫（K4 只有五道活动守卫：TEQUIP:45 /
 *     TFLAG:899 / TEQUIP:89→DOG_KOJO_4 / TEQUIP:90 / TEQUIP:55→COLOSSEUM；
 *     ASSI 守卫在源 :523 整行注释、TALENT:9 只在 SELF_KOJO——非模板七条，
 *     按源文 1:1 测五道）；
 *   - SELECTCOM 0/1/2/3/5/6/7/8/9/10/11/12/13/14/15/16/19/20/21/22/23/
 *     26/27/28/29/30/31/32/33/34/35/36/37/40/41/42/43/44/45/46/55/56/80
 *     各分支的初回判定与 CFLAG:301–400 计数器推进；
 *   - 爱抚 CFLAG:301 状态机：初回（无刻印 / 屈服Lv2）→ 二回目以降
 *     （淫乱 6 / 爱慕 5 / 屈服Lv3 4 / 屈服Lv2 3 / それ以外 2）；
 *   - DOG_KOJO_4（兽奸）与 COLOSSEUM_KOJO_4（死斗场）真身输出；
 *   - KOJO_MESSAGE_PALAMCNG_4（处女丧失 A = UP:11 + UP:12）与
 *     KOJO_MESSAGE_MARKCNG_4（TFLAG:21/22/23/24 刻印取得 CFLAG:300/297/
 *     298/299）；
 *   - SELF_KOJO_K4（TFLAG:13 调教后自慰/レズ/朝フェラ/卖却等事件口上）；
 *   - 非调教口上入口：BENKI / DUNGEON_VICTORY / DUNGEON_ATTACK /
 *     NTR_KOUJO（P 形参） / EXUCUTION / MUSEUM / BANISHMENT /
 *     PUBLIC_EXUCUTION / GROTESQUE / ENTERENEMY / GOHOUBI_REQUEST /
 *     GOHOUBI_AFTER / OSIOKI / GOBI（ARG:0 分档）；
 *   - 阈值闸 FLAG:7 == 1 时阶段耗尽不出声、== 2 时旁路重出声；
 *   - 存根清单核对（docs/stub-registry.md 收录 SELL_MATURO_K0）。
 *
 * K4 与 K3 的区别（按源文 1:1，非缺移植）：COM 头部只有五道守卫；爱抚
 * 二回目以降的「それ以外」档在 FLAG:7 == 2 时**每次**出声（无随机尾，
 * 每次 CFLAG:301 = 2 并 RETURN）；淫乱/爱慕档 CFLAG:301 落到 6/5 后同支
 * 不再重入（除非 FLAG:7 == 2 旁路）。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

// RAND:N 定值序：draws 依次被消费，越界取模
const seq_rand =
  (...draws) =>
  (n) => {
    const value = draws.shift() ?? 0;
    return value % n;
  };

// 世界底座：冷徹（素质 164 → GET_KOJO_NUM = 104 → 分发 key 4）入列调教
async function setup_k4(seed, selectcom = 0) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '冷徹');
  fixture.era.beginTrain(0, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = selectcom;
  fixture.store.set('talent:31:164', 1); // 冷徹 → GET_KOJO_NUM = 104
  fixture.store.set('flag:104', 1); // K4 存在标志
  fixture.store.set('flag:7', 2); // 总开关默认
  if (seed) {
    seed(fixture, era_flag);
  }
  fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k4-stoic');
  return fixture;
}

// 经分发族调用（TRYCALLFORM KOJO_MESSAGE_COM_4 的等价物）
async function speak_k4(fixture, rand) {
  const { kojo_message_com_family } = fixture.load_module('kojo/kojo-system');
  return kojo_message_com_family.call(4, { args: [rand] });
}

// —— @EVENTTRAIN：初調教 CFLAG:201 状态机 ——

test('@EVENTTRAIN #PRI 置存在标志、@EVENTEND #LATER 清 0（K4 一对）', async () => {
  const fixture = await setup_k4((f) => f.store.delete('flag:104'));
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.store.get('flag:104'), 1); // K4 存在标志
  assert.equal(fixture.store.get('flag:7'), 2); // 总开关随之默认开
  await emit('EVENTEND');
  assert.equal(fixture.store.get('flag:104'), 0);
});

test('初調教（CFLAG:201 == 0）：种族分档 + 眼鏡附注 + 推进到 1', async () => {
  const fixture = await setup_k4();
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  // 源 :84-102：吸血鬼（TALENT:314 == 3）/ デュラハン（== 4）/ それ以外
  assert.deepEqual(fixture.text_lines(), [
    '「…原来如此，用这样的牢狱来封住我的力量啊…」',
    '「哼，卑鄙。这都是徒劳的笑话罢了，我绝不屈服。」',
  ]);
  assert.equal(fixture.store.get('cflag:31:201'), 1);
});

test('初調教种族分档：吸血鬼（TALENT:314 == 3）', async () => {
  const fixture = await setup_k4((f) => f.store.set('talent:31:314', 3));
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), [
    '「如果以为我和那些在魔界堕落的同胞一样，就大错特错啦！」',
    '「流淌着的高贵血脉，绝不会被你玷污！……」',
  ]);
});

test('初調教眼鏡附注（CFLAG:42 == 83）与 NTR 再捕获（CFLAG:650 == 1）', async () => {
  // 眼鏡：第三行「这么说着、冷徹推了推眼镜…」
  const glasses = await setup_k4((f) => f.store.set('cflag:31:42', 83));
  const { emit: emit1 } = glasses.load_module('system/event/registry');
  await emit1('EVENTTRAIN');
  assert.equal(glasses.text_lines().length, 3);
  assert.equal(glasses.text_lines()[2], '这么说着、冷徹推了推眼镜…');

  // NTR 再捕获：CFLAG:201 >= 1 && CFLAG:650 == 1（爱慕/淫乱臂）
  const ntr = await setup_k4((f) => {
    f.store.set('cflag:31:201', 2);
    f.store.set('cflag:31:650', 1);
    f.store.set('talent:31:85', 1); // 爱慕
  });
  const { emit: emit2 } = ntr.load_module('system/event/registry');
  await emit2('EVENTTRAIN');
  assert.deepEqual(ntr.text_lines(), [
    '将看了那水晶球的事告诉了冷徹之后，她的脸色苍白了。',
    '「………和别人私通的家伙摆出这样的脸，怎么，准备哭了么是要？」',
    '「我……被狂王抱着，感受到了无上的快乐……那样……可耻……可耻的姿态……哇……呜呜呜……」',
    '冷徹泪流满面。对背叛你感到后悔，或对被狂王弄得高潮感到悔恨，也许两者都有吧………',
  ]);
  assert.equal(ntr.store.get('cflag:31:650'), 0); // NTR スイッチ解除
});

test('初調教屈服刻印分档（各 Lv 一次）：CFLAG:201 2 → 3 → 4 → 5 → 6', async () => {
  // 屈服Lv1
  const lv1 = await setup_k4((f) => {
    f.store.set('mark:31:2', 1);
    f.store.set('cflag:31:201', 1); // 初回已过
  });
  const { emit: emit1 } = lv1.load_module('system/event/registry');
  await emit1('EVENTTRAIN');
  assert.deepEqual(lv1.text_lines(), ['「哼……都是徒劳的，徒劳的！」']);
  assert.equal(lv1.store.get('cflag:31:201'), 2);

  // 屈服Lv2
  const lv2 = await setup_k4((f) => {
    f.store.set('mark:31:2', 2);
    f.store.set('cflag:31:201', 1); // 初回已过
  });
  const { emit: emit2 } = lv2.load_module('system/event/registry');
  await emit2('EVENTTRAIN');
  assert.deepEqual(lv2.text_lines(), [
    '「我，是怎么了？不！我还是我！还是我！不会屈服！」',
  ]);
  assert.equal(lv2.store.get('cflag:31:201'), 3);

  // 屈服Lv3（无爱慕）
  const lv3 = await setup_k4((f) => {
    f.store.set('mark:31:2', 3);
    f.store.set('cflag:31:201', 1); // 初回已过
  });
  const { emit: emit3 } = lv3.load_module('system/event/registry');
  await emit3('EVENTTRAIN');
  assert.deepEqual(lv3.text_lines(), [
    '「再，再也受不了啦……哇！呜呜……是我输了……多么屈辱啊…」',
  ]);
  assert.equal(lv3.store.get('cflag:31:201'), 4);

  // 淫乱（TALENT:76，无爱慕）→ 5
  const whore = await setup_k4((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:201', 4);
  });
  const { emit: emit4 } = whore.load_module('system/event/registry');
  await emit4('EVENTTRAIN');
  assert.deepEqual(whore.text_lines(), [
    '冷徹一贯以来的冷静感完全消失了。',
    '彻底成为了一只被快感所俘虏的牝奴。',
    '四脚爬爬，扭动着腰，用炽热的视线仰视着你。',
    '「我，我不行了……我是肉棒最忠实的奴隶！……唔…喔……请，请给我……肉棒！」',
  ]);
  assert.equal(whore.store.get('cflag:31:201'), 5);

  // 爱慕（TALENT:85）→ 6
  const love = await setup_k4((f) => {
    f.store.set('talent:31:85', 1);
    f.store.set('cflag:31:201', 5);
  });
  const { emit: emit5 } = love.load_module('system/event/registry');
  await emit5('EVENTTRAIN');
  assert.deepEqual(love.text_lines(), [
    '冷徹害羞地向你表白了。',
    '「我其实留意了很久了，魔王大人有着与众不同闪光点……啊～不不～不要说这种多余的话！」',
    '冷徹有点手足无措，看了你一眼，红着脸，说「魔王大人……以后，请让我侍奉左右吧……」',
    '冷徹顺势跪下，亲吻着你的手。',
  ]);
  assert.equal(love.store.get('cflag:31:201'), 6);
});

test('K4_KOJO2 二回目以降（ASSI < 0 → :168-169）：反抗刻印Lv3 支', async () => {
  // CFLAG:201 已到顶（6）且 ASSI < 0 → K4_KOJO2；反抗刻印Lv3 + FLAG:7 == 2
  const fixture = await setup_k4((f) => {
    f.store.set('cflag:31:201', 6);
    f.store.set('mark:31:3', 3);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), [
    '「你这肮脏可悲的生物……」',
    '冷徹',
    '的目光异常冰冷…',
  ]);
});

test('@EVENTEND 调教终了分档（MARK:3 / TALENT:76/85 / BASE:0）', async () => {
  // 反抗刻印Lv3 + 无爱慕（BASE:0 > 0 才出声）
  const def = await setup_k4((f) => {
    f.store.set('mark:31:3', 3);
    f.store.set('base:31:0', 100);
  });
  const { emit: emit1 } = def.load_module('system/event/registry');
  await emit1('EVENTEND');
  assert.deepEqual(def.text_lines(), ['「可恶！」']);

  // 淫乱 + 体力 >= 500（MARK:2 == 3 且 TALENT:85 == 1 绕过刻印臂）
  const whore = await setup_k4((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:85', 1); // 绕过 :477-492 刻印臂
    f.store.set('mark:31:2', 3); // 避开 :477/:482/:487
    f.store.set('base:31:0', 500);
    f.store.set('base:31:1', 100); // 気力 > 0
  });
  const { emit: emit2 } = whore.load_module('system/event/registry');
  await emit2('EVENTEND');
  assert.deepEqual(whore.text_lines(), ['「请……请再用肉棒蹂躏我………可以吗？」']);

  // 爱慕 + 体力 < 500（MARK:2 == 3 绕过刻印臂）
  const love = await setup_k4((f) => {
    f.store.set('talent:31:85', 1);
    f.store.set('mark:31:2', 3); // 避开 :477-492 刻印臂
    f.store.set('base:31:0', 300);
    f.store.set('base:31:1', 100); // 気力 > 0
  });
  const { emit: emit3 } = love.load_module('system/event/registry');
  await emit3('EVENTEND');
  assert.deepEqual(love.text_lines(), [
    '「呆子，就不能对人家再温柔些吗？…坏人～」',
  ]);
});

// —— @KOJO_MESSAGE_COM_4：头部守卫（K4 五道活动守卫） ——

test('口塞（TEQUIP:45 且非指令45）：静默跳过', async () => {
  const fixture = await setup_k4((f) => f.store.set('tequip:31:45', 1));
  await speak_k4(fixture, seq_rand(0));
  assert.deepEqual(fixture.text_lines(), []);
});

test('失神（TFLAG:899）：静默跳过', async () => {
  const fixture = await setup_k4((f) => f.store.set('tflag:899', 1));
  await speak_k4(fixture, seq_rand(0));
  assert.deepEqual(fixture.text_lines(), []);
});

test('兽奸（TEQUIP:89）：岔进本文件真身 DOG_KOJO_4', async () => {
  const fixture = await setup_k4((f) => f.store.set('tequip:31:89', 1));
  await speak_k4(fixture, seq_rand(0));
  // 兽奸爱撫初回（DOG_KOJO_4 :3101 CFLAG:301 == 0 且 MARK:2 < 2）
  assert.deepEqual(fixture.text_lines(), ['「讨，讨厌！别舔啊！」']);
  assert.equal(
    fixture.store.get('cflag:31:301'),
    1,
    '兽奸爱撫初回（DOG_KOJO_4 :3101 CFLAG:301 == 0 且 MARK:2 < 2）',
  );
});

test('触手（TEQUIP:90）：静默跳过', async () => {
  const fixture = await setup_k4((f) => f.store.set('tequip:31:90', 1));
  await speak_k4(fixture, seq_rand(0));
  assert.deepEqual(fixture.text_lines(), []);
});

test('死斗场（TEQUIP:55）：岔进本文件真身 COLOSSEUM_KOJO_4', async () => {
  const fixture = await setup_k4((f) => {
    f.store.set('tequip:31:55', 1);
    f.store.set('base:31:1', 100); // 体力 > 0
  });
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.selectcom = 55;
  await speak_k4(fixture, seq_rand(0));
  assert.deepEqual(fixture.text_lines(), [
    '冷徹在死斗场的热情及对方凌厉的眼神中哆嗦着。',
  ]);
});

test('K4 无 ASSI 守卫：助手调教也出声（源 :523 整行注释）', async () => {
  const fixture = await setup_k4((f, era_flag) => {
    era_flag.assi = 31;
    era_flag.assiplay = 1;
  });
  await speak_k4(fixture, seq_rand(0));
  // 与 K3 不同（K3 有 ASSI 守卫会静默）；K4 的 ASSI 守卫整行注释
  assert.ok(fixture.text_lines().length > 0, 'K4 无 ASSI 守卫，助手调教也出声');
});

// —— SELECTCOM 0：爱抚 CFLAG:301 状态机 ——

test('爱撫初回（CFLAG:301 == 0 且 MARK:2 < 2）：一句拒绝 + 推进到 1', async () => {
  const fixture = await setup_k4();
  await speak_k4(fixture, seq_rand(0));
  assert.deepEqual(fixture.text_lines(), ['「讨厌！这变态！」']);
  assert.equal(fixture.store.get('cflag:31:301'), 1);
});

test('爱撫初回的刻印分档（MARK:2 >= 2）：配合台词', async () => {
  const fixture = await setup_k4((f) => f.store.set('mark:31:2', 2));
  await speak_k4(fixture, seq_rand(0));
  assert.deepEqual(fixture.text_lines(), [
    '「唔～唔……」「哼，这不挺配合的嘛！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:301'), 1);
});

test('爱撫二回目以降的素质/刻印分档推进（:570-590）', async () => {
  // 淫乱 TALENT:76 → CFLAG:301 = 6
  const whore = await setup_k4((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:301', 1);
  });
  await speak_k4(whore, seq_rand(0));
  assert.deepEqual(whore.text_lines(), [
    '「唔…噢～…再弄，再弄我……胸，胸部也好……那里！……还有屁股，再揉啊～～…」',
  ]);
  assert.equal(
    whore.store.get('cflag:31:301'),
    6,
    '淫乱 TALENT:76 → CFLAG:301 = 6',
  );

  // 爱慕 TALENT:85 → CFLAG:301 = 5
  const love = await setup_k4((f) => {
    f.store.set('talent:31:85', 1);
    f.store.set('cflag:31:301', 1);
  });
  await speak_k4(love, seq_rand(0));
  assert.deepEqual(love.text_lines(), [
    '「那么细腻，温柔的手法……人家会……啊！……噢～啊啊！……有，有感觉了～～…」',
  ]);
  assert.equal(
    love.store.get('cflag:31:301'),
    5,
    '爱慕 TALENT:85 → CFLAG:301 = 5',
  );

  // 屈服刻印Lv3 → 4
  const sub3 = await setup_k4((f) => {
    f.store.set('mark:31:2', 3);
    f.store.set('cflag:31:301', 1);
  });
  await speak_k4(sub3, seq_rand(0));
  assert.deepEqual(sub3.text_lines(), ['「啊…好…那里……」']);
  assert.equal(sub3.store.get('cflag:31:301'), 4, '屈服刻印Lv3 → 4');

  // 屈服刻印Lv2 → 3
  const sub2 = await setup_k4((f) => {
    f.store.set('mark:31:2', 2);
    f.store.set('cflag:31:301', 1);
  });
  await speak_k4(sub2, seq_rand(0));
  assert.deepEqual(sub2.text_lines(), ['「快住手啊……再这样摸的话……我会………」']);
  assert.equal(sub2.store.get('cflag:31:301'), 3, '屈服刻印Lv2 → 3');

  // それ以外（MARK:2 <= 1）→ 2
  const other = await setup_k4((f) => f.store.set('cflag:31:301', 1));
  await speak_k4(other, seq_rand(0));
  assert.deepEqual(other.text_lines(), [
    '「变态！！…完全不舒服，不要再摸了！」',
  ]);
  assert.equal(
    other.store.get('cflag:31:301'),
    2,
    'それ以外（MARK:2 <= 1）→ 2',
  );
});

test('爱撫阶段耗尽后（FLAG:7 == 1）静默；FLAG:7 == 2 旁路重出声', async () => {
  // CFLAG:301 = 6（淫乱已落）：FLAG:7 == 1 时 6 > 5 上限 → 静默
  const quiet = await setup_k4((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:301', 6);
    f.store.set('flag:7', 1);
  });
  await speak_k4(quiet, seq_rand(0));
  assert.deepEqual(quiet.text_lines(), []);
  assert.equal(quiet.store.get('cflag:31:301'), 6); // 状态不动

  // 同状态 FLAG:7 == 2（默认）：FLAG:7 == 2 旁路 → 每次出声
  const repeat = await setup_k4((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:301', 6);
  });
  await speak_k4(repeat, seq_rand(0));
  assert.deepEqual(repeat.text_lines(), [
    '「唔…噢～…再弄，再弄我……胸，胸部也好……那里！……还有屁股，再揉啊～～…」',
  ]);
  assert.equal(repeat.store.get('cflag:31:301'), 6); // 已到顶，不再动
});

// —— SELECTCOM 1：舔阴 CFLAG:302 ——

test('舔陰初回（CFLAG:302 == 0）：一句 + 推进到 1', async () => {
  const fixture = await setup_k4(undefined, 1);
  await speak_k4(fixture, seq_rand(0));
  assert.deepEqual(fixture.text_lines(), [
    '「那，那样的地方都舔！这个……大变态！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:302'), 1);
});

// —— SELECTCOM 11/13/14/15/16 需要 TEQUIP ——

test('SELECTCOM == 13（肛门虫）带 TEQUIP 分支：初回 → CFLAG:314', async () => {
  // 源 :1130-1201：SELECTCOM == 13 且 TEQUIP:13（肛门虫），计数器 CFLAG:314
  const kiss = await setup_k4((f) => f.store.set('tequip:31:13', 1), 13);
  await speak_k4(kiss, seq_rand(0));
  assert.deepEqual(kiss.text_lines(), [
    '「什，什么啊这玩意儿……住手！好恶心！！」',
  ]);
  assert.equal(kiss.store.get('cflag:31:314'), 1);
});

test('SELECTCOM == 5（胸爱抚）/7（自己扒开）/11（壶虫）/12（振动杖）初回', async () => {
  // 各指令的 CFLAG 计数器：5 → 306、7 → 308、11 → 312、12 → 313
  const cases = [
    [5, {}, 'cflag:31:306', '「呜！摸我的胸！　你这痴汉！！！」'],
    [7, { 'tequip:31:7': 1 }, 'cflag:31:308', '「这……这么羞耻的事……呜……」'],
    [
      11,
      { 'tequip:31:11': 1 },
      'cflag:31:312',
      '「呃！！这个恶心的生物……不要啊！！不要拿过来！！！！」',
    ],
    [
      12,
      {},
      'cflag:31:313',
      '「什，什么啊……这么大一根！　不要！不要过来！！！」',
    ],
  ];
  for (const [selectcom, extra, cflag, line] of cases) {
    const fixture = await setup_k4((f) => {
      for (const [k, v] of Object.entries(extra)) f.store.set(k, v);
    }, selectcom);
    await speak_k4(fixture, seq_rand(0));
    assert.deepEqual(fixture.text_lines(), [line], `SELECTCOM == ${selectcom}`);
    assert.equal(fixture.store.get(cflag), 1, `${cflag} 推进`);
  }
});

// —— DOG_KOJO_4（兽奸）真身 ——

test('兽奸爱撫二回目以降（DOG_KOJO_4 :3101+）：屈服刻印分档推进', async () => {
  const fixture = await setup_k4((f) => {
    f.store.set('tequip:31:89', 1);
    f.store.set('cflag:31:301', 1); // 二回目以降
    f.store.set('mark:31:2', 2); // 屈服刻印Lv2
  });
  await speak_k4(fixture, seq_rand(0));
  assert.equal(fixture.text_lines().length, 1);
  assert.ok(
    fixture.store.get('cflag:31:301') > 1,
    `二回目以降推进：${fixture.store.get('cflag:31:301')}`,
  );
});

// —— COLOSSEUM_KOJO_4（死斗场）真身 ——

test('死斗场 SELECTCOM == 56（战斗）：気力0 分档两行', async () => {
  // 源 :4921-4937：SELECTCOM == 56 按 BASE:1（気力）分档；気力 <= 0 且
  // 助手未参与 → 两行（第二行 %SAVESTR:TARGET% 在句首）
  const fixture = await setup_k4((f) => {
    f.store.set('tequip:31:55', 1);
    f.store.set('base:31:1', 0); // 気力 <= 0
  }, 56);
  await speak_k4(fixture, seq_rand(0));
  assert.deepEqual(fixture.text_lines(), [
    '「啊…啊…不……不要…才不要被这种怪物侵犯！…不要！不要！……」',
    '筋疲力尽的冷徹连滚带爬地企图逃离死斗场。',
  ]);
});

// —— KOJO_MESSAGE_PALAMCNG_4 ——

test('处女丧失（TFLAG:3 && CFLAG:229 == 0 && TFLAG:20）：素质分档 + CFLAG:229 = 1', async () => {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '冷徹');
  fixture.era.beginTrain(0, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  fixture.store.set('talent:31:164', 1);
  fixture.store.set('flag:104', 1);
  fixture.store.set('flag:7', 2);
  fixture.store.set('tflag:3', 1); // 初セックス
  fixture.store.set('tflag:20', 1); // 処女喪失
  fixture.store.set('delta:31:11', 100); // UP:11（纯爱）
  fixture.store.set('delta:31:12', 100); // UP:12 → A = 200 < 500
  fixture.store.set('talent:31:85', 1); // 爱慕
  fixture.load_module('kojo/kojo-system');
  const mod = fixture.load_module('kojo/kojo-k4-stoic');
  await mod.kojo_message_palamcng_4();
  assert.deepEqual(fixture.text_lines(), [
    '「啊～终于……终于把自己奉献给了魔王大人……好痛……就不能轻一点吗？」',
  ]);
  assert.equal(fixture.store.get('cflag:31:229'), 1);
});

test('处女丧失 A >= 500（UP:11 + UP:12 够高）时走「それ以外」档', async () => {
  // 源 :4089/:4092 的 (A < 500 || TFLAG:150 == 1) 门槛：A == 600 不满足、
  // TFLAG:150 未置 → 落 else（:4095）。UP:12 参与 A 是关键（M1764）：
  // 变异只留 UP:11 = 400 → A = 400 < 500 → 误入爱慕档。
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '冷徹');
  fixture.era.beginTrain(0, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  fixture.store.set('talent:31:164', 1);
  fixture.store.set('flag:104', 1);
  fixture.store.set('flag:7', 2);
  fixture.store.set('tflag:3', 1);
  fixture.store.set('tflag:20', 1);
  fixture.store.set('delta:31:11', 400); // UP:11
  fixture.store.set('delta:31:12', 200); // UP:12 → A = 600 >= 500
  fixture.store.set('talent:31:85', 1); // 爱慕（但 A 门槛拦下）
  fixture.load_module('kojo/kojo-system');
  const mod = fixture.load_module('kojo/kojo-k4-stoic');
  await mod.kojo_message_palamcng_4();
  assert.deepEqual(
    fixture.text_lines(),
    ['「这就是……做为女人的感觉…………」'],
    '处女丧失 A >= 500 落それ以外档（UP:12 参与加算）',
  );
  assert.equal(fixture.store.get('cflag:31:229'), 1);
});

// —— KOJO_MESSAGE_MARKCNG_4 ——

test('刻印取得（TFLAG:21/22/23/24 == 3）：一次性台词 + CFLAG:297-300 = 1', async () => {
  // 苦痛刻印Lv3
  const pain = await setup_k4((f) => f.store.set('tflag:22', 3));
  const mod1 = pain.load_module('kojo/kojo-k4-stoic');
  await mod1.kojo_message_markcng_4();
  assert.deepEqual(pain.text_lines(), [
    '「我……我会听话的……请不要再这么弄我了…………」',
  ]);
  assert.equal(pain.store.get('cflag:31:297'), 1, '苦痛刻印Lv3 CFLAG:297 = 1');

  // 快乐刻印Lv3
  const joy = await setup_k4((f) => f.store.set('tflag:23', 3));
  const mod2 = joy.load_module('kojo/kojo-k4-stoic');
  await mod2.kojo_message_markcng_4();
  assert.deepEqual(joy.text_lines(), [
    '「有……有感觉了…………我……我变得好奇怪啊！！」',
  ]);
  assert.equal(joy.store.get('cflag:31:298'), 1, '快乐刻印Lv3 CFLAG:298 = 1');

  // 屈服刻印Lv3
  const sub = await setup_k4((f) => f.store.set('tflag:24', 3));
  const mod3 = sub.load_module('kojo/kojo-k4-stoic');
  await mod3.kojo_message_markcng_4();
  assert.deepEqual(sub.text_lines(), ['「呜呜呜……我……我听话还不行吗…………」']);
  assert.equal(sub.store.get('cflag:31:299'), 1, '屈服刻印Lv3 CFLAG:299 = 1');

  // 反抗刻印Lv3
  const def = await setup_k4((f) => f.store.set('tflag:21', 3));
  const mod4 = def.load_module('kojo/kojo-k4-stoic');
  await mod4.kojo_message_markcng_4();
  assert.deepEqual(def.text_lines(), [
    '「你这家伙！……从现在开始！……不会再忍让你啦！！」',
  ]);
  assert.equal(def.store.get('cflag:31:300'), 1);
});

test('刻印取得一次性：CFLAG 已置后不再重复输出', async () => {
  const fixture = await setup_k4((f) => {
    f.store.set('tflag:22', 3);
    f.store.set('cflag:31:297', 1); // 已触发过
  });
  const mod = fixture.load_module('kojo/kojo-k4-stoic');
  await mod.kojo_message_markcng_4();
  assert.deepEqual(fixture.text_lines(), []);
});

// —— SELF_KOJO_K4（TFLAG:13 事件口上） ——

test('调教后自慰（TFLAG:13 == 1）：それ以外初回 → CFLAG:261 = 1', async () => {
  const fixture = await setup_k4((f) => f.store.set('tflag:13', 1));
  const mod = fixture.load_module('kojo/kojo-k4-stoic');
  await mod.self_kojo_k4();
  assert.deepEqual(fixture.text_lines(), ['「唔……呃……哦！～………啊啊啊！」']);
  assert.equal(fixture.store.get('cflag:31:261'), 1);
});

test('调教后自慰的淫乱档（TALENT:76）：直接到 4', async () => {
  const fixture = await setup_k4((f) => {
    f.store.set('tflag:13', 1);
    f.store.set('talent:31:76', 1);
  });
  const mod = fixture.load_module('kojo/kojo-k4-stoic');
  await mod.self_kojo_k4();
  assert.deepEqual(fixture.text_lines(), [
    '「啊……我是多么下流的女人啊…这么…这么自慰……根本停不下来……」',
  ]);
  assert.equal(fixture.store.get('cflag:31:261'), 4);
});

test('卖却分支（TFLAG:13 == 6）：存根行（SELL_MATURO_K0 未移植）', async () => {
  const fixture = await setup_k4((f) => f.store.set('tflag:13', 6));
  const mod = fixture.load_module('kojo/kojo-k4-stoic');
  await mod.self_kojo_k4();
  assert.ok(
    fixture.text_lines().some((line) => line.includes('SELL_MATURO_K0')),
    `卖却分支出存根行：${JSON.stringify(fixture.text_lines())}`,
  );
});

// —— NTR_KOUJO_K4（P 形参） ——

test('NTR_KOUJO P == 1（处女丧失）：素质分档 + CFLAG:650/651 推进', async () => {
  const fixture = await setup_k4();
  const mod = fixture.load_module('kojo/kojo-k4-stoic');
  await mod.ntr_koujo_k4(1);
  assert.deepEqual(fixture.text_lines(), [
    '「呜………啊…………我……被你征服啦………………呜……！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:650'), 1);
  assert.equal(fixture.store.get('cflag:31:651'), 1);
});

// —— 非调教口上：GOBI（ARG:0 分档） ——

test('GOBI_KOUJO ARG:0 == 1-5 各支与 0 随机三选一', async () => {
  const a1 = await setup_k4();
  const mod1 = a1.load_module('kojo/kojo-k4-stoic');
  await mod1.gobi_koujo_k4(1);
  assert.deepEqual(a1.text_lines(), ['哦～♪']);

  const a2 = await setup_k4();
  const mod2 = a2.load_module('kojo/kojo-k4-stoic');
  await mod2.gobi_koujo_k4(5);
  assert.deepEqual(a2.text_lines(), ['什么的……。']);

  const a0 = await setup_k4();
  const mod3 = a0.load_module('kojo/kojo-k4-stoic');
  await mod3.gobi_koujo_k4(0, seq_rand(0));
  assert.deepEqual(a0.text_lines(), ['呢。']);
});

// —— 非调教口上：GOHOUBI_REQUEST / OSIOKI 入口守卫 ——

test('GOHOUBI_REQUEST（发情请求）：TFLAG:18 == 1 支出力', async () => {
  const fixture = await setup_k4((f) => f.store.set('tflag:18', 1));
  const mod = fixture.load_module('kojo/kojo-k4-stoic');
  await mod.gohoubi_request_koujo_k4();
  assert.ok(
    fixture.text_lines().length > 0,
    `GOHOUBI_REQUEST TFLAG:18==1 出力：${JSON.stringify(fixture.text_lines())}`,
  );
});

// —— 存根清单核对 ——

test('存根清单可检索：docs/stub-registry.md 收录 SELL_MATURO_K0', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('kojo/kojo-k4-stoic');
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
