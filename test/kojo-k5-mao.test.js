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

test('GOBI ARG:0 == 1 与 0 随机三选一（返回文字，#570）', async () => {
  const a1 = await setup_k5();
  const mod1 = a1.load_module('kojo/kojo-k5-mao');
  assert.equal(await mod1.gobi_koujo_k5(1), '的噢~♪');
  assert.deepEqual(a1.text_lines(), [], '语尾真身不得自行打印');

  const a0 = await setup_k5();
  const mod3 = a0.load_module('kojo/kojo-k5-mao');
  assert.equal(await mod3.gobi_koujo_k5(0, seq_rand(0)), '来着。');
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

// —— SELECTCOM 69 六九式 & COLOSSEUM_KOJO_5：ITEM:PBAND → item:4（#552） ——
// PBAND 是 Emuera 内建非角色变量（SYSTEM ver1.0.3.ERB:42 赋 4，4 号 = 假阳具）；
// yml/Item.yml 名字表无 PBAND 条目，era.get('item:PBAND') 恒
// undefined（test/variable-yml.test.js 的引擎用例），地址写回时下列用例必须红。
// 源：六九式 :5191/:5204/:5236（PLAYER 侧判 121/122/PBAND）、死斗场
// :7278/:7311/:7335（ASSI 侧判 121/122/PBAND）。
test('六九式初回·淫乱（TALENT:76）：调教者无 121/122 且 item:4 → 「大鸡巴」而非「花蕾」', async () => {
  const fixture = await setup_k5((f) => {
    f.store.set('talent:17:76', 1); // 淫乱 → :5189 分支
    f.store.set('talent:0:122', 0); // 调教者（PLAYER = 0）无男性器（unset 读 undefined，=== 0 不成立，须显式 0）
    f.store.set('item:4', 1); // 原作 ITEM:PBAND
  });
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.selectcom = 69;
  await speak_k5(fixture, seq_rand(0));
  assert.ok(
    fixture
      .text_lines()
      .includes(
        '「啊嗯~…更加地…玩弄那里嘛~…那样的话我就会好好地吸主人的大鸡巴的啦~♡」',
      ),
    '六九式初回·淫乱：调教者无 121/122 且持假阳具（item:4）→ 整行拼接「大鸡巴」（#625）',
  );
  assert.equal(fixture.store.get('cflag:17:364'), 1, '六九式初回 → 1');
});

test('六九式初回·爱慕（TALENT:85）：调教者无 121/122 且 item:4、RAND:3 == 0 → 「假阳具」而非「阴唇」', async () => {
  const fixture = await setup_k5((f) => {
    f.store.set('talent:17:85', 1); // 爱慕 → :5199 分支
    f.store.set('talent:0:122', 0);
    f.store.set('item:4', 1);
  });
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.selectcom = 69;
  await speak_k5(fixture, seq_rand(0));
  const merged = fixture.text_lines().find((l) => l.startsWith('玛奥吮吸起'));
  assert.ok(merged, '六九式初回·爱慕：:5201 组必须出声');
  assert.ok(
    merged.includes('的假阳具，而') && merged.endsWith('继续着口腔侍奉。'),
    '六九式初回·爱慕：持假阳具（item:4）且 RAND:3 == 0 → 整行拼接「假阳具」（#625）',
  );
});

test('六九式二回目·爱慕（CFLAG:364 == 1）：同条件复现「假阳具」', async () => {
  const fixture = await setup_k5((f) => {
    f.store.set('talent:17:85', 1);
    f.store.set('talent:0:122', 0);
    f.store.set('item:4', 1);
    f.store.set('cflag:17:364', 1); // 二回目以降
  });
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.selectcom = 69;
  await speak_k5(fixture, seq_rand(0));
  const merged = fixture.text_lines().find((l) => l.startsWith('玛奥吮吸起'));
  assert.ok(merged, '六九式二回目·爱慕：:5233 组必须出声');
  assert.ok(
    merged.includes('的假阳具，而') && merged.endsWith('继续着口腔侍奉。'),
    '六九式二回目·爱慕：持假阳具（item:4）且 RAND:3 == 0 → 整行拼接「假阳具」（#625）',
  );
  assert.equal(fixture.store.get('cflag:17:364'), 4, '二回目爱慕档推进到 4');
});

test('COLOSSEUM_KOJO_5：SC31/21/27 助手无 121/122 且持假阳具（item:4）→ 整行拼接「假阳具」', async () => {
  // K5 的 COM 头部助手跳过在死斗场岔之前（:772-773 先于 :787），assiplay 下
  // 到不了真身——与 K8 同款直接驱动 colosseum_kojo_5（原作死代码路径，1:1 保留）
  const cases = [
    {
      selectcom: 31,
      line: '舔着奴隶5的假阳具玛奥露出心旷神怡的表情……',
    },
    {
      selectcom: 21,
      line: '奴隶5一边听着哀嚎假阳具继续毫不留情地蹂躏着玛奥的阴道……',
    },
    {
      selectcom: 27,
      line: '奴隶5一边听着哀嚎假阳具继续毫不留情地蹂躏着玛奥的肛门……',
    },
  ];
  for (const { selectcom, line } of cases) {
    const fixture = await setup_k5((f) => {
      join_slave_chara(f, 5, '奴隶5');
      f.store.set('item:4', 1); // 原作 ITEM:PBAND
    });
    const era_flag = fixture.load_module('era-utils/era-flag');
    era_flag.selectcom = selectcom;
    era_flag.assi = 5;
    era_flag.assiplay = 1;
    const mod = fixture.load_module('kojo/kojo-k5-mao');
    await mod.colosseum_kojo_5(seq_rand(0));
    assert.ok(
      fixture.text_lines().includes(line),
      `selectcom ${selectcom} 助手无 121/122 且 item:4 == 1 → 武器名与前后文落在同一行（#625）`,
    );
  }
});

// —— #625：原作同一行被拆成多条 era.print 的合并点 ——

test('#625 交谈·自我介绍：名字段与后续同一行（:4795 / :4841 两处 × ABL:31 两档）', async () => {
  // 原作 :4795（PRINTFORM）+ :4797（SIF ABL:31 >= 3 只护这一段）+ :4798
  // （PRINTFORML 收行）是一整行，:4841+ 是二次以后的同型行（#625）
  const cases = [
    [0, 0],
    [0, 3],
    [1, 0],
    [1, 3],
  ];
  for (const [talked, abl31] of cases) {
    const fixture = await setup_k5((f) => {
      f.store.set(`tequip:17:53`, 1); // 摄影中
      f.store.set('abl:17:17', 5); // :4794 的 (TALENT:89 || ABL:17 >= 5)
      f.store.set('abl:17:31', abl31);
      if (talked) {
        f.load_module('facade/chara').chara(17).kojo.交谈 = 1;
      }
    });
    const era_flag = fixture.load_module('era-utils/era-flag');
    era_flag.selectcom = 56;
    await speak_k5(fixture, seq_rand(0));
    assert.ok(
      fixture
        .text_lines()
        .includes(
          `玛奥将自己的本名和接下来要进行的性体验${abl31 >= 3 ? '、甚至是连自慰时妄想的事情' : ''}十分欣喜地全部说了出来……`,
        ),
      `交谈${talked ? '二次' : '首次'}（ABL:31==${abl31}）：名字段与后文落在同一行（#625）`,
    );
  }
});

test('#625 交谈·发出了…的声音：工具档与前后文同一行（:4818 / :4864 两处 × 两档）', async () => {
  const cases = [
    { talked: 0, tequip: 11 },
    { talked: 0, tequip: 44 },
    { talked: 0, tequip: 0 }, // 两档都不满足 → 中间为空串
    { talked: 1, tequip: 11 },
    { talked: 1, tequip: 44 },
    { talked: 1, tequip: 0 },
  ];
  for (const { talked, tequip } of cases) {
    const fixture = await setup_k5((f) => {
      f.store.set('palam:17:5', 10000); // >= PALAMLV[4]
      f.store.set('palam:17:4', 10000);
      if (tequip) {
        f.store.set(`tequip:17:${tequip}`, 1);
      }
      if (talked) {
        f.load_module('facade/chara').chara(17).kojo.交谈 = 1;
      }
    });
    const era_flag = fixture.load_module('era-utils/era-flag');
    era_flag.selectcom = 56;
    await speak_k5(fixture, seq_rand(0));
    const word = tequip === 11 ? '快乐的' : tequip === 44 ? '痛苦的' : '';
    const line = talked
      ? `你向少女搭话后，玛奥发出了${word}的声音、拼命地向着你说了起来`
      : `你向少女搭话后、玛奥发出了${word}的声音、拼命地向着你说了起来`;
    assert.ok(
      fixture.text_lines().includes(line),
      `交谈${talked ? '二次' : '首次'}（${word}档）：前缀与工具档、前后文落在同一行（#625）`,
    );
  }
});

test('#625 交谈·前缀行并入各互斥分支（:4812/:4858 两处的六支）', async () => {
  // :4812/:4858 的 `PRINTFORM %SAVESTR:PLAYER%` 是各自那条链上各互斥分支共同的
  // 前缀行：前缀提到语句外当局部量，各支都拼同一份前缀——玩家在**每一支**上
  // 都只看一行（#625）
  const cases = [
    {
      talked: 0,
      seed: { palam5: 10000, talent85: 1, not_pulled: 1 },
      line: '你向少女搭话后、玛奥晃动着腰部说起了充满爱意的话语',
    },
    {
      talked: 0,
      seed: {},
      line: '你向少女搭话后、玛奥根本没有听进耳朵里的样子…',
    },
    {
      talked: 0,
      seed: { palam4: 500 },
      line: '你向少女搭话后、玛奥一点一点地说起了话',
    },
    {
      talked: 1,
      seed: { palam5: 10000, talent85: 1, not_pulled: 1 },
      line: '你向少女搭话后，玛奥晃动着腰部说起了充满爱意的话语',
    },
    {
      talked: 1,
      seed: {},
      line: '你向少女搭话后，玛奥根本没有听进耳朵里的样子…',
    },
    {
      talked: 1,
      seed: { palam4: 500 },
      line: '你向少女搭话后，玛奥十分胆怯地说起了话',
    },
  ];
  for (const { talked, seed, line } of cases) {
    const fixture = await setup_k5((f) => {
      if (seed.palam5) {
        f.store.set('palam:17:5', seed.palam5);
      }
      if (seed.palam4) {
        f.store.set('palam:17:4', seed.palam4);
      }
      if (seed.talent85) {
        f.store.set('talent:17:85', 1);
      }
      if (seed.not_pulled) {
        f.load_module('facade/game').game.event.插着不拔 = 1;
      }
      if (talked) {
        f.load_module('facade/chara').chara(17).kojo.交谈 = 1;
      }
    });
    const era_flag = fixture.load_module('era-utils/era-flag');
    era_flag.selectcom = 56;
    await speak_k5(fixture, seq_rand(0));
    assert.ok(
      fixture.text_lines().includes(line),
      `交谈${talked ? '二次' : '首次'}：前缀与分支文本落在同一行（#625）`,
    );
  }
});

test('#625 百合 PLAY·前缀行并入两条互斥终点（:6150+:6152 / :6154）', async () => {
  // :6150 的 `PRINTFORM %SAVESTR:ASSI%看着那样的少女、感到很满意` 与 :6152/:6154
  // 两条互斥 PRINTFORMW 终点同属一行（#625）；该链在 SELF_KOJO（:6129 起的
  // 「初吻与自我口上」段），不在 COM 的助手守卫之后
  const cases = [
    [0, '直到天黑一直都在玩弄着少女………'],
    [1, '整个晚上都在玩弄着少女………'],
  ];
  for (const [time, tail] of cases) {
    const fixture = await setup_k5((f) => {
      join_slave_chara(f, 5, '奴隶5');
      f.store.set('talent:17:85', 1); // 爱慕档 → :6137 分支
      f.store.set('cflag:17:262', 3); // 百合 PLAY < 4
      f.load_module('facade/game').game.train.初吻与自我口上 = 2; // :6129 入口
      const era_flag = f.load_module('era-utils/era-flag');
      era_flag.assi = 5;
      era_flag.time = time;
    });
    const mod = fixture.load_module('kojo/kojo-k5-mao');
    await mod.self_kojo_k5(seq_rand(0));
    assert.ok(
      fixture.text_lines().includes(`奴隶5看着那样的少女、感到很满意${tail}`),
      `TIME==${time}：前缀与收行落在同一行（#625）`,
    );
  }
});

test('#625 GOHOUBI_REQUEST_KOUJO_K5：兽名与前后文同一行（CFLAG:504 三档）', async () => {
  const cases = [
    [1, '犬'],
    [2, '豚'],
    [3, '马'],
  ];
  for (const [req, beast] of cases) {
    const fixture = await setup_k5((f) => {
      f.load_module('facade/chara').chara(17).stronghold.要求奖赏 = req;
    });
    const { gohoubi_request_koujo_family } = fixture.load_module(
      'kojo/kojo-dungeon-after',
    );
    await gohoubi_request_koujo_family.call(5, { args: [] });
    assert.ok(
      fixture
        .text_lines()
        .includes(`「如果打倒勇者姐姐的话请给我奖赏、好想和${beast}做爱啊♪」`),
      `CFLAG:504==${req}：兽名与前后文落在同一行（#625）`,
    );
  }
});
