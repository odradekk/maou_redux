/**
 * 菲娅 K904 的 EX 注册路径测试（issue #250）。
 *
 * 源: target/ERB/口上/EVENT_K904_菲娅.ERB。正文与 K19 菲娅相同，
 * 本文件只锁 K904 独有的 EX_FLAG:104 / EX_TALENT:104 与族注册键 904。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');
const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

const CID = 35;
const KEY = 904;

async function setup_k904(seed) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, CID, '菲娅');
  fixture.era.beginTrain(0, CID);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = CID;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = 0;
  fixture.store.set(`ex_talent:${CID}:104`, 1);
  for (const talent of [0, 9, 76, 85, 314]) {
    fixture.store.set(`talent:${CID}:${talent}`, 0);
  }
  for (const mark of [0, 1, 2, 3]) {
    fixture.store.set(`mark:${CID}:${mark}`, 0);
  }
  fixture.store.set('exflag:104', 1);
  fixture.store.set('flag:7', 2);
  if (seed) seed(fixture, era_flag);
  fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k904-fia');
  return fixture;
}

async function emit(fixture, event) {
  const registry = fixture.load_module('system/event/registry');
  await registry.emit(event);
}

test('K904 事件钩子：EVENTTRAIN 置 EX_FLAG:104，EVENTEND 清除', async () => {
  const fixture = await setup_k904((f) => {
    f.store.delete('exflag:104');
    f.store.set('flag:7', 0);
    f.store.set(`cflag:${CID}:201`, 9);
  });
  await emit(fixture, 'EVENTTRAIN');
  assert.equal(fixture.store.get('exflag:104'), 1, 'EVENTTRAIN 置 EX_FLAG:104');
  assert.equal(fixture.store.get('flag:7'), 2, '口上总开关从 0 补到 2');
  await emit(fixture, 'EVENTEND');
  assert.equal(fixture.store.get('exflag:104'), 0, 'EVENTEND 清 EX_FLAG:104');
});

test('K904 EVENTTRAIN：EX_TALENT:104 缺席时不推进初调教', async () => {
  const fixture = await setup_k904((f) => {
    f.store.delete(`ex_talent:${CID}:104`);
    f.store.set(`ex_talent:${CID}:105`, 1);
  });
  await emit(fixture, 'EVENTTRAIN');
  assert.equal(fixture.store.get(`cflag:${CID}:201`) || 0, 0);
  assert.deepEqual(fixture.text_lines(), []);
});

test('K904 EVENTEND：EX_TALENT:104 缺席时不输出结束口上', async () => {
  const fixture = await setup_k904((f) => {
    f.store.delete(`ex_talent:${CID}:104`);
    f.store.set(`ex_talent:${CID}:105`, 1);
    f.store.set(`base:${CID}:0`, 100);
  });
  await emit(fixture, 'EVENTEND');
  assert.deepEqual(fixture.text_lines(), []);
});

test('K904 分发：全部口上族注册键都是 904', async () => {
  const fixture = await setup_k904();
  const kojo = fixture.load_module('kojo/kojo-system');
  const ravish = fixture.load_module('kojo/kojo-dungeon-ravish');
  const after = fixture.load_module('kojo/kojo-dungeon-after');
  const families = [
    ravish.ryouzyoku_kojo_family,
    ravish.ryouzyoku_after_kojo_family,
    kojo.benki_koujo_family,
    kojo.dungeon_victory_family,
    kojo.dungeon_attack_family,
    kojo.ntr_koujo_family,
    kojo.exucution_koujo_family,
    kojo.museum_koujo_family,
    kojo.banishment_koujo_family,
    kojo.public_exucution_koujo_family,
    kojo.grotesque_koujo_family,
    kojo.enterenemy_koujo_family,
    // GOHOUBI_REQUEST 族只此一个实例、住在 kojo-dungeon-after（#403 把
    // kojo-system 里的同名第二份删掉：K904 当初注册进的是那一份，分发侧
    // 看不见，本行因此从 kojo. 改读 after.）
    after.gohoubi_request_koujo_family,
    after.gohoubi_after_koujo_family,
    after.osioski_koujo_family,
    kojo.gobi_koujo_family,
    kojo.kojo_message_com_family,
    kojo.kojo_message_palamcng_family,
    kojo.kojo_message_markcng_family,
    kojo.self_kojo_family,
  ];
  for (const family of families) {
    assert.equal(family.has(KEY), true, `${family.name} 注册 904`);
    assert.equal(family.has(19), false, `${family.name} 不误注册 19`);
  }

  await kojo.kojo_message_com_family.call(KEY, { args: [() => 0] });
  assert.equal(fixture.store.get(`cflag:${CID}:301`), 1, '904 主分发可调用');
});

// —— #625：原作同一行被拆成多条 era.print 的合并点（正文与 K19 相同） ——

async function speak_k904(fixture, rand = () => 0) {
  const { kojo_message_com_family } = fixture.load_module('kojo/kojo-system');
  return kojo_message_com_family.call(KEY, { args: [rand] });
}

test('#625 交谈·自我介绍：名字与后续是同一行（:4340 / :4410 两处 × ABL:31 两档）', async () => {
  const cases = [
    [0, 0],
    [0, 3],
    [1, 0],
    [1, 3],
  ];
  for (const [talked, abl31] of cases) {
    const fixture = await setup_k904((f, era_flag) => {
      era_flag.selectcom = 56;
      f.store.set(`tequip:${CID}:53`, 1); // 摄影中
      f.store.set(`abl:${CID}:17`, 5); // :4339 的 (TALENT:89 || ABL:17 >= 5)
      f.store.set(`abl:${CID}:31`, abl31);
      if (talked) {
        f.load_module('facade/chara').chara(CID).kojo.交谈 = 1;
      }
    });
    await speak_k904(fixture);
    const merged = fixture.text_lines().find((l) => l.startsWith('于是'));
    assert.ok(merged, `交谈${talked ? '二次' : '首次'}：自我介绍必须出声`);
    assert.ok(
      merged.endsWith('之类的介绍了出来……') &&
        merged ===
          `于是菲娅将自己的名字、喜欢的H的方式${abl31 >= 3 ? '还有手淫时妄想的内容' : ''}之类的介绍了出来……`,
      `交谈${talked ? '二次' : '首次'}（ABL:31==${abl31}）：名字段与后文落在同一行（#625）`,
    );
  }
});

test('#625 交谈·压抑着呼吸声：工具档与前后文同一行（:4375 / :4446 两处 × 两档）', async () => {
  const cases = [
    { talked: 0, tequip: 11, prefix: '' },
    { talked: 0, tequip: 44, prefix: '' },
    { talked: 1, tequip: 11, prefix: '你' },
    { talked: 1, tequip: 44, prefix: '你' },
  ];
  for (const { talked, tequip, prefix } of cases) {
    const fixture = await setup_k904((f, era_flag) => {
      era_flag.selectcom = 56;
      f.store.set(`palam:${CID}:5`, 10000); // >= PALAMLV[4]
      f.store.set(`palam:${CID}:4`, 10000);
      f.store.set(`tequip:${CID}:${tequip}`, 1);
      if (talked) {
        f.load_module('facade/chara').chara(CID).kojo.交谈 = 1;
      }
    });
    await speak_k904(fixture);
    const word = tequip === 11 ? '快乐的' : '痛苦的';
    assert.deepEqual(
      fixture.text_lines(),
      [`${prefix}菲娅一边压抑着${word}呼吸声，一边努力回应着你……`],
      `交谈${talked ? '二次' : '首次'}（${word}档）：工具档与前后文落在同一行（#625）`,
    );
  }
});

test('#625 交谈·PLAYER 前缀行与各互斥尾段同属一行（:4440 与 :4442/:4444/:4455/:4458/:4461/:4464）', async () => {
  const cases = [
    {
      name: ':4442 爱慕+插着不拔',
      seed: (f) => {
        f.store.set(`palam:${CID}:5`, 10000);
        f.store.set(`talent:${CID}:85`, 1);
        f.load_module('facade/game').game.event.插着不拔 = 1;
      },
      line: '你菲娅一边与你说着话，一边对着你露出了重要的地方。',
    },
    {
      name: ':4444 淫乱+插着不拔',
      seed: (f) => {
        f.store.set(`palam:${CID}:5`, 10000);
        f.store.set(`talent:${CID}:76`, 1);
        f.load_module('facade/game').game.event.插着不拔 = 1;
      },
      line: '你菲娅开心的朝着你撒着娇，对着你说着色色的话语。',
    },
    {
      name: ':4455 淫乱（无插着不拔、欲情低）',
      seed: (f) => f.store.set(`talent:${CID}:76`, 1),
      line: '你菲娅一边这么说着，一边对着你露出了重要的地方。',
    },
    {
      name: ':4458 欲情LV4 但欲情5 未达标',
      seed: (f) => f.store.set(`palam:${CID}:4`, 10000),
      line: '你菲娅开心的朝着你撒着娇，说着色色的话语。',
    },
    {
      name: ':4461 技巧Lv3',
      seed: (f) => f.store.set(`abl:${CID}:10`, 3),
      line: '你菲娅大口大口的喘着气，小小的身体因为快感而像触电一样痉挛个不停。',
    },
    {
      name: ':4464 都不满足',
      seed: () => {},
      line: '你菲娅乖巧的低着头听着。',
    },
  ];
  for (const { name, seed, line } of cases) {
    const fixture = await setup_k904((f, era_flag) => {
      era_flag.selectcom = 56;
      seed(f);
      f.load_module('facade/chara').chara(CID).kojo.交谈 = 1;
    });
    await speak_k904(fixture);
    assert.ok(
      fixture.text_lines().includes(line),
      `${name}：PLAYER 前缀与尾段落在同一行（#625）`,
    );
  }
});

test('#625 COLOSSEUM_KOJO_904：SC31/21/27 武器名与前后文同一行（三种 selectcom × 三档）', async () => {
  // 助手臂在 KOJO_MESSAGE_COM 的 ASSI 守卫之后，运行时不带助手才可达，
  // 直接调真身覆盖（同 K2/K4/K903/K19）
  const cases = [
    {
      selectcom: 31,
      quote: '「啊唔…我、我会好好舔的…不要做很痛的事……嗯咕……」',
      head: '玛奥因为',
      tail: '被菲娅含住而露出了快乐的的表情……',
      weapon_penis: '阴茎',
    },
    {
      selectcom: 21,
      quote: '「不要不要…太过分了…不要了啊…啊啊！」',
      head: '玛奥一边听着悲鸣，一边用',
      tail: '毫不留情的继续蹂躏着菲娅的腔内……',
      weapon_penis: '肉棒',
    },
    {
      selectcom: 27,
      quote: '「不要不要…不是插进哪里啊…不要了啊…啊啊！」',
      head: '玛奥一边听着悲鸣，一边用',
      tail: '毫不留情的继续蹂躏着菲娅的肛门……',
      weapon_penis: '肉棒',
    },
  ];
  for (const { selectcom, quote, head, tail, weapon_penis } of cases) {
    const tiers = [
      { weapon: weapon_penis, seed: (f) => f.store.set('talent:17:121', 1) },
      { weapon: '假阴茎', seed: (f) => f.store.set('item:4', 1) },
      { weapon: '', seed: undefined },
    ];
    for (const { weapon, seed } of tiers) {
      const fixture = await setup_k904((f, era_flag) => {
        join_slave_chara(f, 17, '玛奥');
        era_flag.selectcom = selectcom;
        f.store.set(`tequip:${CID}:55`, 1);
        era_flag.assi = 17;
        era_flag.assiplay = 1;
        if (seed) {
          seed(f);
        }
      });
      const { colosseum_kojo_904 } = fixture.load_module('kojo/kojo-k904-fia');
      await colosseum_kojo_904();
      assert.ok(
        fixture.text_lines().includes(quote),
        `selectcom ${selectcom}：开场白仍在`,
      );
      assert.ok(
        fixture.text_lines().includes(`${head}${weapon}${tail}`),
        `selectcom ${selectcom}（武器档「${weapon}」）：武器名与前后文落在同一行（#625）`,
      );
    }
  }
});

test('#625 GOHOUBI_REQUEST：空首尾夹着的兽名单独成行（CFLAG:504 三档）', async () => {
  const cases = [
    [1, '犬'],
    [2, '豚'],
    [3, '马'],
  ];
  for (const [req, beast] of cases) {
    const fixture = await setup_k904((f) => {
      f.load_module('facade/chara').chara(CID).stronghold.要求奖赏 = req;
    });
    const { gohoubi_request_koujo_family } = fixture.load_module(
      'kojo/kojo-dungeon-after',
    );
    await gohoubi_request_koujo_family.call(KEY, { args: [CID] });
    assert.deepEqual(
      fixture.text_lines(),
      [beast],
      `CFLAG:504==${req}：空首尾不再各占一行（#625）`,
    );
  }
});
