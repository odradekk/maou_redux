/**
 * ere/kojo/kojo-k5-mao.js 的行为测试（issue #236：J26 口上·K5 マオ）。
 *
 * 缝 = test/helpers/era-fixture.js。世界底座：玛奥（Chara17，素质 165
 * 村娘A → GET_KOJO_NUM 105）入列调教。覆盖：
 *   - 首次与二次以后走不同分支且状态推进（验收项「此行为有测试」）；
 *   - MARK:2 刻印分档（>= 2 / == 3 / == 2 / <= 1）与 TALENT:76/85 素质分支；
 *   - FLAG:7 == 1 的阈值闸（每阶段一次）与 == 2 的旁路（每次出声）；
 *   - 七道跳过判定（含 K5 特有：兽奸静默无 DOG_KOJO、死斗场真身）；
 *   - SELECTCOM 1/2/5/20/45/87 初回与 CFLAG 推进；
 *   - @EVENTTRAIN 初调教 / PALAMCNG / MARKCNG / SELF_KOJO / NTR / GOBI /
 *     GOHOUBI / OSIOKI / 死斗场 / 迷宫胜利；
 *   - 插值（%SAVESTR:TARGET/PLAYER% 与心形 ♡）；
 *   - 存根清单核对（docs/stub-registry.md）。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

// 世界底座：玛奥入列调教 + K5 触发面（素质 165 / 存在标志 / 总开关默认 2）
async function setup_k5(seed) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 17, '玛奥');
  fixture.era.beginTrain(0, 17);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 17;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = 0;
  fixture.store.set('talent:17:165', 1); // 村娘A → GET_KOJO_NUM = 105
  fixture.store.set('flag:105', 1); // K5 存在标志
  fixture.store.set('flag:7', 2); // 总开关默认（2 = 每次出声）
  if (seed) {
    seed(fixture);
  }
  fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k5-mao');
  return fixture;
}

// 经分发族调用（TRYCALLFORM 的等价物——注册与分发都在路径上）
async function speak_k5(fixture, rand) {
  const { kojo_message_com_family } = fixture.load_module('kojo/kojo-system');
  return kojo_message_com_family.call(5, { args: [rand] });
}

const seq_rand =
  (...draws) =>
  (n) => {
    const value = draws.shift() ?? 0;
    return value % n;
  };

test('首次（CFLAG:301 == 0 且 MARK:2 < 2）：两句拒绝 + 状态推进到 1', async () => {
  const fixture = await setup_k5();
  await speak_k5(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「你这个变态…别、别碰我！」',
    '（现在如果发出奇怪的声音的话…只会让这家伙感到高兴、一定要忍耐…！）',
  ]);
  assert.equal(fixture.store.get('cflag:17:301'), 1);
});

test('二次以后走それ以外支（MARK:2 <= 1）：与首次不同分支，推进到 2', async () => {
  const fixture = await setup_k5((f) => f.store.set('cflag:17:301', 1));
  await speak_k5(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「不要、那、那里…不要…碰那里…啊！」',
    '玛奥不停地扭动着身体进行反抗………',
  ]);
  assert.equal(fixture.store.get('cflag:17:301'), 2);
});

test('首次的刻印分档（MARK:2 >= 2）：只出一句', async () => {
  const fixture = await setup_k5((f) => f.store.set('mark:17:2', 2));
  await speak_k5(fixture);
  assert.deepEqual(fixture.text_lines(), ['「咕…呜呜…啊！」']);
  assert.equal(fixture.store.get('cflag:17:301'), 1);
});

test('淫乱分支（TALENT:76）：三句 + 插值（角色名 / 调教者名 / ♡），推进到 6', async () => {
  const fixture = await setup_k5((f) => {
    f.store.set('talent:17:76', 1);
    f.store.set('cflag:17:301', 1);
  });
  await speak_k5(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯…啊…主人的手指好厉害…♡」',
    '玛奥弯曲着身体、把你的手夹在自己的大腿间。',
    '「请让我的H小穴…变得更加淫乱吧♡」',
  ]);
  assert.equal(fixture.store.get('cflag:17:301'), 6);
});

test('爱慕分支（TALENT:85）优先于刻印档：推进到 5', async () => {
  const fixture = await setup_k5((f) => {
    f.store.set('talent:17:85', 1);
    f.store.set('cflag:17:301', 1);
    f.store.set('mark:17:2', 3); // 刻印档在场，素质分支仍先取
  });
  await speak_k5(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊…啊哈…啊♡不要嗯♡」',
    '故意发出尖叫的玛奥显得十分的可爱。',
    '「主人、再多摸摸我嘛♡ 舒服的我都要叫出来了啦♡」',
  ]);
  assert.equal(fixture.store.get('cflag:17:301'), 5);
});

test('屈服刻印 Lv3 / Lv2 分档：各推进到 4 / 3', async () => {
  const lv3 = await setup_k5((f) => {
    f.store.set('mark:17:2', 3);
    f.store.set('cflag:17:301', 3);
  });
  await speak_k5(lv3);
  assert.deepEqual(lv3.text_lines().slice(0, 1), [
    '「哈…呜…嗯咕♡…啊…啊…嗯♡……」',
  ]);
  assert.equal(lv3.store.get('cflag:17:301'), 4);

  const lv2 = await setup_k5((f) => {
    f.store.set('mark:17:2', 2);
    f.store.set('cflag:17:301', 2);
  });
  await speak_k5(lv2);
  assert.deepEqual(lv2.text_lines(), [
    '「啊…啊咕…呜呜…嗯咕…！」',
    '玛奥感受到了从未体验过的愉悦在沸腾着、忍不住皱起了脸………',
  ]);
  assert.equal(lv2.store.get('cflag:17:301'), 3);
});

test('阈值闸：FLAG:7 == 1 时上限生效（阶段耗尽后不出声），== 2 时旁路', async () => {
  // FLAG:7 == 1：淫乱已到 6（> 5），素质与刻印全不匹配 → 静默
  const quiet = await setup_k5((f) => {
    f.store.set('talent:17:76', 1);
    f.store.set('cflag:17:301', 6);
    f.store.set('flag:7', 1);
  });
  await speak_k5(quiet);
  assert.deepEqual(quiet.text_lines(), []);
  assert.equal(quiet.store.get('cflag:17:301'), 6); // 状态不动

  // 同状态 FLAG:7 == 2（默认）：上限旁路，淫乱支每次出声
  const repeat = await setup_k5((f) => {
    f.store.set('talent:17:76', 1);
    f.store.set('cflag:17:301', 6);
  });
  await speak_k5(repeat);
  assert.equal(repeat.text_lines().length, 3);
  assert.equal(repeat.store.get('cflag:17:301'), 6);
});

// —— 七道跳过判定（:771-793，顺序与判据各文件 1:1） ——

test('助手调教中（ASSI > 0 && ASSIPLAY）：不输出', async () => {
  const fixture = await setup_k5((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.assi = 31;
    era_flag.assiplay = 1;
    f.seed_chara(31, { id: 31, name: '奴隶31' });
    f.era.addCharacter(31);
  });
  await speak_k5(fixture);
  assert.deepEqual(fixture.text_lines(), []);
  assert.equal(fixture.store.get('cflag:17:301'), undefined); // 状态未动
});

test('口塞（TEQUIP:45）：SELECTCOM != 45 跳过、== 45 不被此判定拦', async () => {
  const gagged = await setup_k5((f) => f.store.set('tequip:17:45', 1));
  await speak_k5(gagged);
  assert.deepEqual(gagged.text_lines(), []);

  // SELECTCOM == 45（戴口塞说话的那条指令）：不跳过——走 COM 45 真身初回
  const speaking = await setup_k5((f) => {
    f.store.set('tequip:17:45', 1);
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 45;
  });
  await speak_k5(speaking);
  assert.deepEqual(speaking.text_lines(), [
    '「等、不、不要…嗯…嗯呜唔呜…………」',
    '被戴上口枷后，玛奥就一脸恍惚地表情看着你………',
  ]);
  assert.equal(speaking.store.get('cflag:17:346'), 1, 'cflag:17:346');
});

test('失神（TFLAG:899）/ 触手（TEQUIP:90）/ 崩坏（TALENT:9）：不输出', async () => {
  for (const [desc, seed] of [
    ['失神', (f) => f.store.set('tflag:899', 1)],
    ['触手', (f) => f.store.set('tequip:17:90', 1)],
    ['崩坏', (f) => f.store.set('talent:17:9', 1)],
  ]) {
    const fixture = await setup_k5(seed);
    await speak_k5(fixture);
    assert.deepEqual(fixture.text_lines(), [], `${desc}：跳过`);
  }
});

test('兽奸（TEQUIP:89）：K5 是静默跳过（无 DOG_KOJO 占位行）', async () => {
  const fixture = await setup_k5((f) => f.store.set('tequip:17:89', 1));
  await speak_k5(fixture);
  assert.deepEqual(fixture.text_lines(), []);
});

test('死斗场（TEQUIP:55）：SELECTCOM==0 静默、==55 走真身', async () => {
  const silent = await setup_k5((f) => f.store.set('tequip:17:55', 1));
  await speak_k5(silent);
  assert.deepEqual(silent.text_lines(), []);

  const fixture = await setup_k5((f) => {
    f.store.set('tequip:17:55', 1);
    f.store.set('base:17:1', 0);
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 55;
  });
  await speak_k5(fixture);
  assert.deepEqual(fixture.text_lines(), ['玛奥连站起来的力气都没有了……']);
});

// —— 存根清单核对 ——

test('存根清单可检索：docs/stub-registry.md 收录这张票全部占位名', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('kojo/kojo-k5-mao');
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

test('@EVENTTRAIN #PRI 置 FLAG:105、@EVENTEND #LATER 清 0', async () => {
  const fixture = await setup_k5((f) => f.store.set('flag:105', 0));
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.store.get('flag:105'), 1);
  await emit('EVENTEND');
  assert.equal(fixture.store.get('flag:105'), 0);
});

test('@EVENTTRAIN 普通档：人类初调教台词 + 推进 CFLAG:201', async () => {
  const fixture = await setup_k5();
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.ok(
    fixture.text_lines().some((line) => line.includes('你这家伙是谁啊')),
    '人类初调教必须出声',
  );
  assert.equal(fixture.store.get('cflag:17:201'), 1);
});

test('舔阴初回（SELECTCOM == 1）：处女档三句 + CFLAG:302 = 1', async () => {
  const fixture = await setup_k5((f) => {
    f.store.set('talent:17:0', 1);
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 1;
  });
  await speak_k5(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「不、不要…啊…难道…要舔那里…啊呜！」',
    '不理会玛奥慌乱的反抗、你强硬地把她的双腿掰开。',
    '「那、那里…祇有那里是不可以的…啊！」',
  ]);
  assert.equal(fixture.store.get('cflag:17:302'), 1);
});

test('肛门爱抚初回（SELECTCOM == 2）：ABL:3 < 3 两句 + CFLAG:303 = 1', async () => {
  const fixture = await setup_k5((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 2;
  });
  await speak_k5(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「难、难道是那里…呀啊！？」',
    '玛奥不停地扭动着腰、想要避开你的手指………',
  ]);
  assert.equal(fixture.store.get('cflag:17:303'), 1);
});

test('胸爱抚初回（SELECTCOM == 5）：それ以外两句 + CFLAG:306 = 1', async () => {
  const fixture = await setup_k5((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 5;
  });
  await speak_k5(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「摸的手法…就像个色狼大叔一样…呀啊！？」',
    '「像、像那个样子摸的话…啊啊！」',
  ]);
  assert.equal(fixture.store.get('cflag:17:306'), 1);
});

test('正常位初回（SELECTCOM == 20）非处女それ以外：两句 + CFLAG:321 = 1', async () => {
  const fixture = await setup_k5((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 20;
  });
  await speak_k5(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊~…唔~…进来了…鸡巴…啊~呀啊~…突然这样子~…啊啊~！」',
    '将阴茎强行地塞进了玛奥蜜穴的深处后你毫不留情地蹂蹑起了少女………',
  ]);
  assert.equal(fixture.store.get('cflag:17:321'), 1);
});

test('穿环初回（SELECTCOM == 87）：P=1 乳头环 + CFLAG:348 = 1', async () => {
  const fixture = await setup_k5((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 87;
  });
  const { piercing_state } = fixture.load_module('system/train/piercing-state');
  piercing_state.p = 1;
  await speak_k5(fixture);
  assert.ok(
    fixture.text_lines().some((line) => line.includes('擦拭着取下环后的痕迹')),
    `COM 87 初回 P=1 未命中 cflag:7：${JSON.stringify(fixture.text_lines())}`,
  );
  assert.equal(fixture.store.get('cflag:17:348'), 1);
});

test('处女丧失（PALAMCNG）：素质分档 + CFLAG:229 = 1', async () => {
  const fixture = await setup_k5((f) => {
    f.store.set('tflag:3', 1);
    f.store.set('tflag:20', 1);
    f.store.set('delta:17:11', 100);
    f.store.set('delta:17:12', 100);
    f.store.set('talent:17:85', 1);
  });
  const mod = fixture.load_module('kojo/kojo-k5-mao');
  await mod.kojo_message_palamcng_5();
  assert.ok(
    fixture.text_lines().some((line) => line.includes('主人的…进到小穴里面')),
    'PALAMCNG 爱慕档必须含「主人的…进到小穴里面」',
  );
  assert.equal(fixture.store.get('cflag:17:229'), 1);
});

test('刻印取得（MARKCNG TFLAG:22 == 3）：苦痛刻印 Lv3 + CFLAG:297 = 1', async () => {
  const fixture = await setup_k5((f) => f.store.set('tflag:22', 3));
  const mod = fixture.load_module('kojo/kojo-k5-mao');
  await mod.kojo_message_markcng_5();
  assert.ok(
    fixture.text_lines().some((line) => line.includes('请原谅我啊')),
    `MARKCNG 苦痛刻印：${JSON.stringify(fixture.text_lines())}`,
  );
  assert.equal(fixture.store.get('cflag:17:297'), 1);
});

test('SELF_KOJO 调教后自慰（TFLAG:13 == 1）それ以外：推进 CFLAG:261', async () => {
  const fixture = await setup_k5((f) => f.store.set('tflag:13', 1));
  const mod = fixture.load_module('kojo/kojo-k5-mao');
  await mod.self_kojo_k5();
  assert.ok(fixture.text_lines().length > 0, 'SELF_KOJO 自慰支出声');
  assert.ok(
    (fixture.store.get('cflag:17:261') || 0) >= 1,
    `CFLAG:261 推进：${fixture.store.get('cflag:17:261')}`,
  );
});

test('SELF_KOJO 调教后性交 leftover_s >= 3：中出满足句', async () => {
  const fixture = await setup_k5((f) => {
    f.store.set('tflag:13', 4);
    f.store.set('abl:17:2', 4);
  });
  const after = fixture.load_module('event/event-aftertrain');
  after.remember_aftertrain_s(3);
  const mod = fixture.load_module('kojo/kojo-k5-mao');
  await mod.self_kojo_k5();
  assert.ok(
    fixture
      .text_lines()
      .some((line) => line.includes('被中出之后看上去十分满足')),
    's>=3 中出句必须含「被中出之后看上去十分满足」',
  );
});

test('SELF_KOJO 出售支 leftover_sale >= 1000000：贵族买下', async () => {
  const fixture = await setup_k5((f) => {
    f.store.set('tflag:13', 6);
    f.store.set('talent:17:85', 1);
    f.store.set('talent:17:314', 9);
  });
  const after = fixture.load_module('event/event-aftertrain');
  after.remember_sale_price(1000000);
  const mod = fixture.load_module('kojo/kojo-k5-mao');
  await mod.self_kojo_k5();
  assert.ok(
    fixture.text_lines().some((line) => line.includes('被魔界的某位贵族买下')),
    '出售贵族档必须含「被魔界的某位贵族买下」',
  );
});

test('NTR_KOUJO P == 1：村娘档 + CFLAG:650/651', async () => {
  const fixture = await setup_k5();
  const mod = fixture.load_module('kojo/kojo-k5-mao');
  await mod.ntr_koujo_k5(undefined, 1);
  assert.deepEqual(fixture.text_lines(), [
    '「为什么…我明明只是个村娘…啊咿…哈…啊啊啊哈！」',
  ]);
  assert.equal(fixture.store.get('cflag:17:650'), 1);
  assert.equal(fixture.store.get('cflag:17:651'), 1);
});

test('GOBI ARG:0 == 1 与 0 随机三选一', async () => {
  const a1 = await setup_k5();
  const mod1 = a1.load_module('kojo/kojo-k5-mao');
  await mod1.gobi_koujo_k5(1);
  assert.deepEqual(a1.text_lines(), ['的噢~♪']);

  const a0 = await setup_k5();
  const mod3 = a0.load_module('kojo/kojo-k5-mao');
  await mod3.gobi_koujo_k5(0, seq_rand(0));
  assert.deepEqual(a0.text_lines(), ['来着。']);
});

test('GOHOUBI_REQUEST 钱奖赏 + GOHOUBI_AFTER choice==0 + OSIOKI choice==0', async () => {
  const req = await setup_k5();
  const mod = req.load_module('kojo/kojo-k5-mao');
  await mod.gohoubi_request_koujo_k5(17);
  assert.deepEqual(req.text_lines(), [
    '「那个、想要钱作为奖赏、尽可能多的钱」',
  ]);

  const after = await setup_k5();
  const mod2 = after.load_module('kojo/kojo-k5-mao');
  await mod2.gohoubi_after_koujo_k5(17, 0);
  assert.deepEqual(after.text_lines(), ['「真小气！」']);

  const osi = await setup_k5();
  const mod3 = osi.load_module('kojo/kojo-k5-mao');
  await mod3.osioki_koujo_k5(17, 0);
  assert.deepEqual(osi.text_lines(), ['「十、十分感谢！十分感谢您！」']);
});

test('迷宫胜利淫乱档：决め台词 + 随机第一句', async () => {
  const fixture = await setup_k5((f) => f.store.set('talent:17:76', 1));
  const mod = fixture.load_module('kojo/kojo-k5-mao');
  await mod.dungeon_victory_k5(seq_rand(0));
  assert.ok(
    fixture.text_lines().some((line) => line.includes('快点来侵犯我啊')),
    '迷宫胜利必须含「快点来侵犯我啊」',
  );
});
