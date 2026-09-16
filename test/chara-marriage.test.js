/**
 * @file ere/chara/chara-marriage.js 的行为测试（issue #393，N9）。
 *
 * 源: target/ERB/キャラ関数/CHARA_MARRIAGE.ERB 全二十函数（:14-902）——
 *     @SHOW_BUTTON_MARRIAGE / @CHECK_ABLE_TO_MARRIAGE（式中函数）/
 *     @MARRIAGE（主流程）/ 十三支种族典礼 / @MARRIAGE_DOG/ YOU/ LOVERS/
 *     @SLAVE_MARRIAGE / @DIVORCE。
 *
 * 缝 = test/helpers/era-fixture.js。婚姻状况读写 CFLAG:601/602/606/609，
 * 家族构成读 TALENT:320（`chara_marriage_before` 的既有测试在
 * test/page-chara-info.test.js，本文件不重复）。
 */

'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function add_chara(fixture, cid, name = `角色${cid}`) {
  fixture.seed_chara(cid, { id: cid, name, callname: name });
  assert.equal(fixture.era.addCharacter(cid), true);
}

function load(fixture) {
  return fixture.load_module('chara/chara-marriage');
}

function texts(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

function buttons(fixture) {
  return fixture.lines_history.filter((line) => line.type === 'button');
}

/** 婚礼主角底稿：状态 0（可结婚）、可选结婚对象 */
function seed(arg = 1, preset = {}) {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, arg, `角色${arg}`);
  fixture.store.set('maxbase:0:1', 10000);
  fixture.store.set('base:0:1', 10000);
  for (const [key, value] of Object.entries(preset)) {
    fixture.store.set(key, value);
  }
  return fixture;
}

// —— @CHECK_ABLE_TO_MARRIAGE（:35-49，式中函数）——

test('CHECK_ABLE_TO_MARRIAGE：侵攻中单独一档，其余「可结婚状态」三档放行——表驱动', () => {
  // [标签, 状态, 期望]
  const table = [
    ['侵攻中的勇者（状态 2）', 2, 2],
    ['状态 1：不可结婚', 1, 1],
    ['状态 4：不可结婚', 4, 1],
    ['状态 8（拘束台）：不可结婚', 8, 1],
    ['状态 9（NTR 中）：不可结婚', 9, 1],
    ['状态 0：可', 0, 0],
    ['状态 3（迎击中）：可', 3, 0],
    ['状态 7（苗床）：可', 7, 0],
  ];
  for (const [label, state, expected] of table) {
    const fixture = seed();
    fixture.store.set('cflag:1:1', state);
    assert.equal(load(fixture).check_able_to_marriage(1), expected, label);
  }
});

// —— @SHOW_BUTTON_MARRIAGE（:14-32）——

test('SHOW_BUTTON_MARRIAGE：不可结婚不渲染；可结婚渲染「结婚」；侵攻中渲染「恋人设定」', () => {
  // [标签, 状态, 期望的按钮正文（undefined = 不渲染）]
  const table = [
    ['不可结婚：连按钮都没有', 1, undefined],
    ['可结婚：[4] 结婚', 0, '结婚 '],
    ['侵攻中的勇者：[4] 恋人设定', 2, '恋人设定 '],
  ];
  for (const [label, state, expected] of table) {
    const fixture = seed();
    fixture.store.set('cflag:1:1', state);
    load(fixture).show_button_marriage(4, 1);
    const rendered = buttons(fixture).map((b) => b.rendered);
    if (expected === undefined) {
      assert.deepEqual(rendered, [], label);
    } else {
      assert.deepEqual(rendered, [`[4] ${expected}`], label);
    }
  }
});

// —— 十三支种族典礼（:508-867）＋ 四支特殊典礼（:455-505/:870-878）——

/**
 * 走「淫乱（TALENT:76）/ 爱慕（TALENT:85）/ 其他」三档的十支典礼：
 * [函数名, 怪物显示名, {76: 行, 85: 行, 0: 行}]。行里的 X 代指角色名。
 */
const RACE_TABLE = [
  [
    'orc_marriage',
    '哥布林',
    {
      76: 'X和哥布林像野兽一样地疯狂拥吻着……',
      85: 'X静静地处理着结婚事宜。',
      0: 'X眼泛泪光，在屈辱和绝望中颤抖着。',
    },
  ],
  [
    'slime_marriage',
    '史莱姆',
    {
      76: 'X用手指沾起礼服上的粘液，高兴地舔舐着。',
      85: 'X静静地处理着结婚事宜。',
      0: 'X眼泛泪光，在屈辱和绝望中颤抖着。',
    },
  ],
  [
    'insect_marriage',
    '巨虫',
    {
      76: 'X爱怜地抚摸着巨虫的输精管。',
      85: 'X静静地处理着结婚事宜。',
      0: 'X眼泛泪光，在屈辱和绝望中颤抖着。',
    },
  ],
  [
    'ivy_marriage',
    '藤蔓',
    {
      76: 'X吸入了带有催淫物质的花粉，细细地品味着。',
      85: 'X静静地处理着结婚事宜。',
      0: 'X眼泛泪光，在屈辱和绝望中颤抖着。',
    },
  ],
  [
    'syokusyu_marriage',
    '触手生物',
    {
      76: 'X神色陶醉，和触手生物不断地交换着嘴里的粘液。',
      85: 'X静静地处理着结婚事宜。',
      0: 'X眼泛泪光，在屈辱和绝望中颤抖着。',
    },
  ],
  [
    'faily_marriage',
    '妖精',
    {
      76: 'X神色陶醉，和妖精不断地交换着嘴里的唾液。',
      85: 'X静静地处理着结婚事宜。',
      0: 'X醉倒了，什么事都不记得。',
    },
  ],
  [
    'giant_marriage',
    '巨人',
    {
      76: 'X怀着期待，昂首挺胸。',
      85: 'X静静地处理着结婚事宜。',
      0: 'X彻底绝望了。',
    },
  ],
  [
    'man_marriage',
    '成年男子',
    {
      76: 'X因为对婚后生活的期待，心怦怦直跳。',
      85: 'X静静地处理着结婚事宜。',
      0: 'X绝望了。',
    },
  ],
  [
    'girl_marriage',
    '成年女子',
    {
      76: 'X因为对婚后生活的期待，心怦怦直跳。',
      85: 'X静静地处理着结婚事宜。',
      0: 'X绝望了。',
    },
  ],
  [
    'brain_marriage',
    '脑魔',
    {
      76: 'X因为对婚后生活的期待，心怦怦直跳。',
      85: 'X静静地处理着结婚事宜。',
      0: 'X彻底绝望了。',
    },
  ],
];

test('十支种族典礼：首行与三档反应行——表驱动走完十族（76 淫乱 / 85 爱慕 / 其他）', async () => {
  for (const [func, monster, reactions] of RACE_TABLE) {
    for (const [talent, template] of Object.entries(reactions)) {
      const fixture = seed();
      fixture.store.set('itemname:500', monster);
      if (talent !== '0') fixture.store.set(`talent:1:${talent}`, 1);
      await load(fixture)[func](1, 500);
      if (func !== 'syokusyu_marriage') {
        // 触手婚的首行是字面「触手」（：629），单独一支用例钉它
        assert.ok(
          texts(fixture).includes(`角色1和${monster}结婚了。`),
          `${func}：首行`,
        );
      }
      assert.ok(
        texts(fixture).includes(template.replaceAll('X', '角色1')),
        `${func} talent ${talent}：反应行`,
      );
      assert.equal(
        fixture.waits.length,
        1,
        `${func}：一支 WAIT（BEAST/HORSE 之外的典礼都等一次键）`,
      );
    }
  }
});

test('兽系三支典礼：反应走「牝犬（TALENT:136）/ 兽奸中毒（ABL:39）/ 其他」这组分支', async () => {
  // [函数名, 对象名, {136: 行, 39: 行, 0: 行}]；dog 的对象名是字面「野狗」
  const table = [
    [
      'marriage_dog',
      '野狗',
      {
        136: 'X气息慌乱，舌尖滴着口水。完全作为一只母狗正在发情着。',
        39: 'X一副自豪的样子，对着狗汪汪地叫。',
        0: 'X眼泛泪光，在屈辱和绝望中颤抖着。',
      },
    ],
    [
      'beast_marriage',
      '野兽',
      {
        136: 'X气息慌乱，舌尖滴着口水。完全作为一只母兽正在发情着。',
        39: 'X自豪地用脸蹭擦着野兽，发出了野兽一样的吼叫。',
        0: 'X眼泛泪光，在屈辱和绝望中颤抖着。',
      },
    ],
    [
      'horse_marriage',
      '马',
      {
        136: 'X气息慌乱，舌尖滴着口水。完全作为一匹母马正在发情着。',
        39: 'X得意洋洋地用脸蹭擦着马的阴茎。',
        0: 'X眼泛泪光，在屈辱和绝望中颤抖着。',
      },
    ],
  ];
  for (const [func, monster, reactions] of table) {
    for (const [mark, template] of Object.entries(reactions)) {
      const fixture = seed();
      fixture.store.set('itemname:500', monster);
      if (mark === '136') fixture.store.set('talent:1:136', 1);
      if (mark === '39') fixture.store.set('abl:1:39', 1);
      const fn = load(fixture)[func];
      if (func === 'marriage_dog') {
        await fn(1);
      } else {
        await fn(1, 500);
      }
      assert.ok(
        texts(fixture).includes(template.replaceAll('X', '角色1')),
        `${func} 档 ${mark}：反应行`,
      );
    }
  }
  // 兽系典礼里只有野狗那支没有 WAIT（原作 :480 直接 RETURN）
  const dog = seed();
  dog.store.set('itemname:500', '野狗');
  await load(dog).marriage_dog(1);
  assert.equal(dog.waits.length, 0, 'marriage_dog 不等键');
});

test('男人与女人两支典礼：对象名前按素质加「中年/少年」「熟女/幼女」前缀', async () => {
  // [函数名, 素质, 前缀]
  const table = [
    ['man_marriage', 141, '中年'],
    ['man_marriage', 143, '少年'],
    ['girl_marriage', 140, '熟女'],
    ['girl_marriage', 142, '幼女'],
  ];
  for (const [func, talent, prefix] of table) {
    const fixture = seed();
    fixture.store.set('itemname:500', '成年男子');
    fixture.store.set(`talent:1:${talent}`, 1);
    await load(fixture)[func](1, 500);
    assert.ok(
      texts(fixture).includes(`角色1和${prefix}成年男子结婚了。`),
      `${func} talent ${talent}：前缀`,
    );
  }
  // 两支典礼的前缀档互斥（先命中的赢）
  const both = seed();
  both.store.set('itemname:500', '成年男子');
  both.store.set('talent:1:141', 1);
  both.store.set('talent:1:143', 1);
  await load(both).man_marriage(1, 500);
  assert.ok(texts(both).includes('角色1和中年成年男子结婚了。'));
});

test('触手婚的首行写的是字面「触手」，不是 ITEMNAME', async () => {
  const fixture = seed();
  fixture.store.set('itemname:500', '触手生物');
  await load(fixture).syokusyu_marriage(1, 500);
  assert.ok(texts(fixture).includes('角色1和触手结婚了。'));
  assert.equal(texts(fixture).includes('角色1和触手生物结婚了。'), false);
});

test('MARRIAGE_YOU / MARRIAGE_LOVERS / SLAVE_MARRIAGE：三支特殊典礼的正文', async () => {
  {
    const fixture = seed();
    await load(fixture).marriage_you(1);
    assert.ok(texts(fixture).includes('角色1和你结婚了。'));
    assert.ok(
      texts(fixture).includes(
        '从今以后，角色1就是魔王的妃子之一了，魔王妃千岁！',
      ),
    );
  }
  {
    const fixture = seed();
    fixture.store.set('cflag:1:606', 3);

    await load(fixture).marriage_lovers(1);
    assert.ok(texts(fixture).includes('角色1被允许与信赖的恋人结婚了'));
    assert.ok(texts(fixture).includes('粗野的流氓可以共同过上幸福生活了……'));
  }
  {
    const fixture = seed();
    add_chara(fixture, 2, '乙');
    await load(fixture).slave_marriage(1, 2);
    assert.ok(texts(fixture).includes('角色1和乙结婚了。'));
    assert.ok(texts(fixture).includes('从今往后角色1和乙将携手白头……'));
  }
});

// —— @MARRIAGE 主流程（:52-451） ——

/** 已持有的一只怪物：100 号（凌辱类型 1 = 亚人/半兽人，走 ORC 典礼） */
const MONSTER = 100;
/** 怪物识别号 → 它触发的种族典礼（凌辱类型取自 ere/data/monster-database.js） */
const RITUAL_BY_MONSTER = [
  [100, 'orc', '角色1全身赤裸，被涂满了赤黑色的泥一样的东西作为化妆。'],
  [102, 'slime', '瓶子和角色1被锁链锁在一起了。'],
  [103, 'insect', '梦魔往怪物胯部涂上了引起其兴奋的药物。'],
  [112, 'ivy', '穿着婚纱的角色1被盆子里的怪物抱着。'],
  [113, 'syokusyu', '一条粗的触手伸到眼前，'],
  [123, 'faily', '由花朵和蘑菇装饰着的婚礼台，令人犹如置身在森林中，'],
  [130, 'giant', '角色1穿着暴露的婚纱，'],
  [131, 'man', '角色1穿着高露出度的婚纱，'],
  [134, 'girl', '角色1和怪物都穿着高露出度的婚礼礼服，'],
  [114, 'beast', '魔王的宫殿里，台上出现了未戴项圈的怪物和角色1，'],
  [162, 'brain', '然后，怪物用触手的嘴亲吻了她的嘴……'],
  [183, 'horse', '从今以后，角色1要到马厩和怪物共同生活了。'],
];

/**
 * 让 SEARCH_FAMILY(cid, kind) 能在 1 ↔ 2 之间命中（照 test/cross-stubs.test.js
 * 的实测配置：名字编号一致 + 前身 4 + 性格 165 + 家族构成 76）。
 * @param {object} fixture 夹具
 * @param {'MARRIAGE'|'LOVE'} kind 关系种类
 */
function seed_pair_relation(fixture, kind) {
  const pair =
    kind === 'MARRIAGE' ? { data: 601, name: 609 } : { data: 610, name: 608 };
  fixture.store.set('cflag:1:6', 42);
  fixture.store.set(`cflag:1:${pair.name}`, 42);
  fixture.store.set(`cflag:1:${pair.data}`, 7605042);
  fixture.store.set('talent:1:320', 76);
  fixture.store.set(`cflag:2:${pair.name}`, 42);
  fixture.store.set(`cflag:2:${pair.data}`, 1);
  fixture.store.set('talent:2:315', 4);
  fixture.store.set('talent:2:165', 1);
  fixture.store.set('talent:2:320', 76);
}

test('MARRIAGE：入口两档——不可结婚返回 2；侵攻中的勇者走 ENTER_LOVER，成功则返回 1', async () => {
  {
    const fixture = seed();
    fixture.store.set('cflag:1:1', 1);
    assert.equal(await load(fixture).marriage(1), 2);
    assert.deepEqual(texts(fixture), [], '不可结婚没有任何输出');
  }
  {
    // 恋人设定取消 → 返回 0
    const fixture = seed();
    fixture.store.set('cflag:1:1', 2);
    fixture.set_inputs(999);
    assert.equal(await load(fixture).marriage(1), 0);
  }
  {
    // 恋人设定选了实人 → 返回 1（原作「成功の場合ターンエンド」）
    const fixture = seed();
    fixture.store.set('cflag:1:1', 2);
    fixture.set_inputs(1);
    assert.equal(await load(fixture).marriage(1), 1);
    assert.equal(fixture.store.get('cflag:1:606'), 1, '恋人类型落进 CFLAG:606');
  }
});

test('MARRIAGE：菜单按钮集——野狗/恋人三项/离婚的可选性随 ITEM:22、CFLAG:606、CFLAG:601 变', async () => {
  // [标签, 预置, 期望可选项（正文 + 编号）, 期望灰掉的正文]
  const table = [
    [
      '无狗无恋人未婚',
      {},
      [
        ['你', 901],
        ['恋人设定', 902],
        ['从奴隶中选', 904],
        ['返回', 999],
      ],
      ['野狗', '与恋人结婚', '与恋人分手', '离婚'],
    ],
    [
      '有狗有恋人已婚',
      { 'item:22': 1, 'cflag:1:606': 3, 'cflag:1:601': 900 },
      [
        ['野狗', 900],
        ['你', 901],
        ['与恋人结婚', 902],
        ['与恋人分手', 903],
        ['从奴隶中选', 904],
        ['离婚', 998],
        ['返回', 999],
      ],
      ['恋人设定'],
    ],
  ];
  for (const [label, preset, expected_enabled, expected_disabled] of table) {
    const fixture = seed();
    for (const [key, value] of Object.entries(preset)) {
      fixture.store.set(key, value);
    }
    fixture.set_inputs(999);
    assert.equal(await load(fixture).marriage(1), 0, label);

    const all = buttons(fixture);
    assert.deepEqual(
      all.filter((b) => !b.disabled).map((b) => [b.text, b.accelerator]),
      expected_enabled,
      `${label}：可选项`,
    );
    const grey = all.filter((b) => b.disabled);
    assert.deepEqual(
      grey.map((b) => b.text),
      expected_disabled,
      `${label}：灰掉的正文`,
    );
    // 灰项一律用原作的 666 编号，且不进合法输入集（夹具的 disabled 镜像）
    assert.ok(
      grey.every((b) => b.accelerator === 666),
      `${label}：灰项编号`,
    );
  }
});

test('MARRIAGE：菜单尾部画出「目前结婚对象」的一行', async () => {
  // [标签, CFLAG:601, 期望正文]
  const table = [
    ['没对象', 0, '无'],
    ['野狗', 900, '野狗'],
    ['你', 901, '你'],
    ['恋人（606=3）', 902, '粗野的流氓'],
    ['怪物（物品名）', MONSTER, '怪物'],
  ];
  for (const [label, spouse, expected] of table) {
    const fixture = seed();
    fixture.store.set('cflag:1:601', spouse);
    fixture.store.set('cflag:1:606', 3);
    fixture.store.set('cflag:1:6', 42); // 避免与 CFLAG:0:601 的 0 撞成「魔王配偶」
    fixture.store.set(`itemname:${MONSTER}`, '怪物');
    fixture.set_inputs(999);
    await load(fixture).marriage(1, () => 0);
    assert.ok(
      texts(fixture).includes(`[角色1目前结婚对象:${expected}]`),
      label,
    );
  }
});

test('MARRIAGE：选怪物 → MONSTER_DATA 取陵辱类型 → 对应种族典礼——表驱动走完十二族', async () => {
  for (const [id, ritual, marker] of RITUAL_BY_MONSTER) {
    const fixture = seed();
    fixture.store.set(`item:${id}`, 1);
    fixture.store.set(`itemname:${id}`, '怪物');
    fixture.set_inputs(id);

    const result = await load(fixture).marriage(1, () => 0);

    assert.equal(result, 1, `${ritual}：返回 1（回合结束）`);
    assert.ok(
      texts(fixture).includes('*角色1和怪物举行了结婚典礼*'),
      `${ritual}：结婚典礼首行`,
    );
    assert.ok(texts(fixture).includes(marker), `${ritual}：本族典礼正文`);
    assert.equal(fixture.store.get('cflag:1:601'), id, `${ritual}：登记对象`);
    assert.equal(fixture.store.get('cflag:1:602'), 0, `${ritual}：爱情度归零`);
    assert.equal(fixture.store.get(`item:${id}`), 1, '持有数没被消耗');
  }
});

test('MARRIAGE：选野狗与选你——两支特殊典礼，登记为 900/901', async () => {
  {
    const fixture = seed();
    fixture.store.set('item:22', 1);
    fixture.set_inputs(900);
    assert.equal(await load(fixture).marriage(1, () => 0), 1);
    assert.ok(texts(fixture).includes('角色1和野狗结婚了。'));
    assert.equal(fixture.store.get('cflag:1:601'), 900);
  }
  {
    const fixture = seed();
    fixture.set_inputs(901);
    assert.equal(await load(fixture).marriage(1, () => 0), 1);
    assert.ok(texts(fixture).includes('角色1和你结婚了。'));
    assert.equal(fixture.store.get('cflag:1:601'), 901);
  }
});

test('MARRIAGE：与恋人结婚分两路——恋人就是家族册上的实人时，对方那一侧也登记', async () => {
  {
    // 一般恋人（CFLAG:606 != 200）：对象名走 LOVER_NAMES
    const fixture = seed();
    fixture.store.set('cflag:1:606', 3);
    fixture.set_inputs(902);
    assert.equal(await load(fixture).marriage(1, () => 0), 1);
    assert.ok(texts(fixture).includes('*角色1和粗野的流氓举行了结婚典礼*'));
    assert.equal(fixture.store.get('cflag:1:601'), 902);
    assert.ok(texts(fixture).includes('角色1被允许与信赖的恋人结婚了'));
  }
  {
    // 恋人 == 200（实人）：SEARCH_FAMILY 的 LOVE 找得到就登记对方
    const fixture = seed();
    add_chara(fixture, 2, '乙');
    seed_pair_relation(fixture, 'LOVE');
    fixture.store.set('cflag:1:606', 200);
    fixture.set_inputs(902);
    assert.equal(await load(fixture).marriage(1, () => 0), 1);
    assert.ok(texts(fixture).includes('*角色1和乙举行了结婚典礼*'));
    assert.equal(fixture.store.get('cflag:2:601'), 902, '对方登记为恋人');
    assert.equal(fixture.store.get('cflag:2:602') || 0, 0, '对方爱情度归零');
  }
});

test('MARRIAGE：从奴隶中选——LIFE_LIST 的选中者成为对象，双方名槽互换', async () => {
  const fixture = seed();
  add_chara(fixture, 2, '乙');
  fixture.store.set('cflag:1:6', 5);
  fixture.store.set('cflag:2:6', 7);
  fixture.set_inputs(904, 2);

  assert.equal(await load(fixture).marriage(1, () => 0), 1);

  assert.equal(
    fixture.store.get('cflag:2:609'),
    5,
    '名槽：对方记下发起方的名字编号',
  );
  assert.equal(
    fixture.store.get('cflag:1:609'),
    7,
    '名槽：发起方记下对方的名字编号',
  );
  assert.ok(texts(fixture).includes('*角色1和乙举行了结婚典礼*'));
  assert.ok(texts(fixture).includes('角色1和乙结婚了。'));
  // 奴隶婚不掷处女丧失的骰（GROOM_TYPE == 1000 被排除在 :405 的判据外）
  assert.equal(texts(fixture).includes('【处女丧失】'), false);
});

test('MARRIAGE：奴隶子菜单的四条拒绝与返回——状态 2 / 其它占用态 / 已婚 / 自恋', async () => {
  // [标签, 预置的对方状态/婚姻, 期望播报]
  const table = [
    ['对方侵攻中', { 'cflag:2:1': 2 }, '乙尚未在支配之下。'],
    ['对方状态占用', { 'cflag:2:1': 8 }, '乙处于无法出席婚礼的状态。'],
    ['对方已婚', { 'cflag:2:601': 900 }, '乙已婚了。'],
  ];
  for (const [label, preset, message] of table) {
    const fixture = seed();
    add_chara(fixture, 2, '乙');
    for (const [key, value] of Object.entries(preset)) {
      fixture.store.set(key, value);
    }
    fixture.set_inputs(904, 2, 999); // 子菜单选中 → 被拒回外层 → 再按 999 返回

    assert.equal(await load(fixture).marriage(1, () => 0), 0, label);
    assert.ok(texts(fixture).includes(message), `${label}：播报`);
    assert.equal(fixture.store.get('cflag:1:601') || 0, 0, `${label}：没结成`);
  }
  {
    // 自恋：选中的就是发起方自己
    const fixture = seed();
    fixture.set_inputs(904, 1, 999);
    assert.equal(await load(fixture).marriage(1, () => 0), 0);
    assert.ok(texts(fixture).includes('角色1并不是一个自恋狂。'));
  }
  {
    // 子菜单里按 999 直接回外层
    const fixture = seed();
    add_chara(fixture, 2, '乙');
    fixture.set_inputs(904, 999, 999);
    assert.equal(await load(fixture).marriage(1, () => 0), 0);
    assert.equal(fixture.store.get('cflag:1:601') || 0, 0);
  }
});

test('MARRIAGE：奴隶子菜单的翻页——单页时两块页码按钮都不动页，重画同一页', async () => {
  const fixture = seed();
  add_chara(fixture, 2, '乙');
  // 上一页 / 下一页 各按一次都不该改页（总数 2 ≤ 20），最后 999 退出
  fixture.set_inputs(904, 1000, 1001, 999, 999);

  assert.equal(await load(fixture).marriage(1, () => 0), 0);

  // 每次进子菜单画一遍页码按钮：首次进入 + 两次翻页 = 三遍
  assert.equal(
    buttons(fixture).filter((b) => b.text === '- 上一页').length,
    3,
    '子菜单重画三次（页码没动）',
  );
});

test('MARRIAGE：已婚后选别的对象报「已婚了」，选当前对象报「对象已婚了」', async () => {
  {
    const fixture = seed();
    fixture.store.set('cflag:1:601', 900);
    fixture.store.set(`item:${MONSTER}`, 1);
    fixture.store.set(`itemname:${MONSTER}`, '怪物');
    fixture.set_inputs(MONSTER);
    assert.equal(await load(fixture).marriage(1, () => 0), 0);
    assert.ok(texts(fixture).includes('角色1已婚了。'));
    assert.equal(fixture.store.get('cflag:1:601'), 900, '登记没变');
  }
  {
    const fixture = seed();
    fixture.store.set('cflag:1:601', MONSTER);
    fixture.store.set(`item:${MONSTER}`, 1);
    fixture.store.set(`itemname:${MONSTER}`, '怪物');
    fixture.set_inputs(MONSTER);
    assert.equal(await load(fixture).marriage(1, () => 0), 0);
    assert.ok(texts(fixture).includes('对象已婚了。'));
  }
});

test('MARRIAGE：[903] 与恋人分手、[998] 离婚，两条出口各自收尾', async () => {
  {
    const fixture = seed();
    fixture.store.set('cflag:1:606', 3);
    fixture.set_inputs(903, 999);
    assert.equal(await load(fixture).marriage(1), 0);
    assert.ok(texts(fixture).includes('与恋人分手了。'));
    assert.equal(fixture.store.get('cflag:1:606'), 0);
  }
  {
    const fixture = seed();
    fixture.store.set('cflag:1:601', 900);
    fixture.store.set('cflag:1:609', 12);
    fixture.set_inputs(998);
    assert.equal(await load(fixture).marriage(1, () => 0), 0);
    assert.ok(texts(fixture).includes('角色1离婚了。'));
    assert.equal(fixture.store.get('cflag:1:601') || 0, 0);
    assert.equal(fixture.store.get('cflag:1:609') || 0, 0);
  }
});

test('DIVORCE：家族册上的对方也被解除登记，婚姻编码按重婚/再婚回落', () => {
  const fixture = seed();
  add_chara(fixture, 2, '乙');
  seed_pair_relation(fixture, 'MARRIAGE');
  fixture.store.set('cflag:2:601', 1); // 对方的压缩数据非零（否则搜索跳过）
  fixture.store.set('talent:1:320', 30000); // 十万位段 = 3（重婚）

  load(fixture).divorce(1);

  assert.equal(fixture.store.get('cflag:2:601') || 0, 0, '对方解除');
  assert.equal(fixture.store.get('cflag:2:609') || 0, 0);
  assert.equal(fixture.store.get('cflag:1:601') || 0, 0, '自己解除');
  assert.equal(fixture.store.get('cflag:1:609') || 0, 0);
  assert.equal(fixture.store.get('talent:1:320'), 10000, '重婚回落一档');
});

test('MARRIAGE：婚前清旧账——CFLAG:609 有值但家族册上找不到人时，DIVORCE(-1) 先跑一趟', async () => {
  // 能走到清旧账段的唯一形态：CFLAG:601 == 0（否则 :261 的「已婚」守卫先返回）
  // 而 CFLAG:609 > 0。此时 SEARCH_FAMILY 返回 -1，原作 :271 的 ELSE 仍然调
  // DIVORCE(RESULT)——即 DIVORCE(-1)，只把发起方自己清干净（文件头的例外条）
  {
    const fixture = seed();
    fixture.store.set(`item:${MONSTER}`, 1);
    fixture.store.set(`itemname:${MONSTER}`, '怪物');
    fixture.store.set('cflag:1:609', 42);
    fixture.set_inputs(MONSTER);

    assert.equal(await load(fixture).marriage(1, () => 0), 1);

    assert.ok(texts(fixture).includes('离婚了。'), '旧账清了一趟');
    assert.equal(fixture.store.get('cflag:1:601'), MONSTER, '新婚礼登记落上');
    // DIVORCE(-1) 清的是 cflag:-1:601/609，发起方的名槽 42 留着（原作同款）
    assert.equal(fixture.store.get('cflag:1:609'), 42, '名槽没被动过');
  }
  {
    // EX_TALENT:2 且找不到人时那支是空体：不清旧账，直接办婚礼
    const fixture = seed();
    fixture.store.set(`item:${MONSTER}`, 1);
    fixture.store.set(`itemname:${MONSTER}`, '怪物');
    fixture.store.set('cflag:1:609', 42);
    fixture.store.set('ex_talent:1:2', 1);
    fixture.set_inputs(MONSTER);

    assert.equal(await load(fixture).marriage(1, () => 0), 1);

    assert.equal(texts(fixture).includes('离婚了。'), false, '没清旧账');
    assert.equal(fixture.store.get('cflag:1:609'), 42, '名槽原样');
    assert.equal(fixture.store.get('cflag:1:601'), MONSTER);
  }
});

test('MARRIAGE：处女丧失的记录码按对象分档（你 1 / 野狗 103 / 怪物 104）', async () => {
  // [标签, 输入, 预置, 期望 CFLAG:15]
  const table = [
    ['与你结婚 → 1', 901, {}, 1],
    ['与野狗结婚 → 103', 900, { 'item:22': 1 }, 103],
    [
      '与怪物结婚 → 104',
      MONSTER,
      { [`item:${MONSTER}`]: 1, [`itemname:${MONSTER}`]: '怪物' },
      104,
    ],
  ];
  for (const [label, pick, preset, expected] of table) {
    const fixture = seed();
    fixture.store.set('talent:1:0', 1); // 处女
    for (const [key, value] of Object.entries(preset)) {
      fixture.store.set(key, value);
    }
    fixture.set_inputs(pick);

    await load(fixture).marriage(1, () => 0);

    assert.ok(texts(fixture).includes('【处女丧失】'), `${label}：播报`);
    assert.equal(fixture.store.get('talent:1:0'), 0, `${label}：处女素质清掉`);
    assert.equal(fixture.store.get('cflag:1:15'), expected, `${label}：记录码`);
  }
});

test('MARRIAGE：处女丧失的四道守卫——特殊服装 79 / 素质 273 / 经验非零 / 奴隶婚都不落', async () => {
  // [标签, 预置, 是否走奴隶婚]
  const table = [
    ['特殊服装 79 挡住', { 'cflag:1:42': 79 }, false],
    ['素质 273 挡住', { 'talent:1:273': 1 }, false],
    ['经验非零挡住', { 'exp:1:0': 5 }, false],
    ['奴隶婚不掷这颗骰（GROOM_TYPE == 1000）', {}, true],
  ];
  for (const [label, preset, slave] of table) {
    const fixture = seed();
    add_chara(fixture, 2, '乙');
    fixture.store.set('talent:1:0', 1);
    fixture.store.set(`item:${MONSTER}`, 1);
    fixture.store.set(`itemname:${MONSTER}`, '怪物');
    for (const [key, value] of Object.entries(preset)) {
      fixture.store.set(key, value);
    }
    fixture.set_inputs(...(slave ? [904, 2] : [MONSTER]));

    await load(fixture).marriage(1, () => 0);

    assert.equal(
      texts(fixture).includes('【处女丧失】'),
      false,
      `${label}：不该播报`,
    );
    assert.equal(fixture.store.get('talent:1:0'), 1, `${label}：素质没动`);
    assert.equal(fixture.store.get('cflag:1:15') || 0, 0, `${label}：没记录码`);
  }
});

test('MARRIAGE：虫/史莱姆/植物婚的处女骰上界是 9，掷到 4 以上就不破处', async () => {
  for (const id of [102, 103, 112]) {
    const fixture = seed();
    fixture.store.set('talent:1:0', 1);
    fixture.store.set(`item:${id}`, 1);
    fixture.store.set(`itemname:${id}`, '怪物');
    fixture.set_inputs(id);
    const bounds = [];
    const rand = (n) => {
      bounds.push(n);
      return n - 1; // 一律掷到上界减一
    };

    await load(fixture).marriage(1, rand);

    assert.ok(bounds.includes(9), `怪物 ${id}：处女骰的上界是 9`);
    assert.equal(
      texts(fixture).includes('【处女丧失】'),
      false,
      `怪物 ${id}：掷到 8 不破处`,
    );
  }
});

test('MARRIAGE：初吻的记录码按对象分档（你 1 / 野狗 998 / 其它 994），你那一档连魔王一起记', async () => {
  // [标签, 输入, 预置, 期望 CFLAG:16]
  const table = [
    ['与你结婚 → 1', 901, {}, 1],
    ['与野狗结婚 → 998', 900, { 'item:22': 1 }, 998],
    [
      '与怪物结婚 → 994',
      MONSTER,
      { [`item:${MONSTER}`]: 1, [`itemname:${MONSTER}`]: '怪物' },
      994,
    ],
  ];
  for (const [label, pick, preset, expected] of table) {
    const fixture = seed();
    fixture.store.set('cflag:1:16', -1);
    fixture.store.set('cflag:0:16', -1);
    for (const [key, value] of Object.entries(preset)) {
      fixture.store.set(key, value);
    }
    fixture.set_inputs(pick);

    await load(fixture).marriage(1, () => 0);

    assert.ok(texts(fixture).includes('【初吻】'), `${label}：播报`);
    assert.equal(fixture.store.get('cflag:1:16'), expected, `${label}：记录码`);
    if (label === '与你结婚 → 1') {
      assert.equal(fixture.store.get('cstr:1:4'), '你', '初吻对象名');
      assert.equal(
        fixture.store.get('cflag:0:16'),
        2,
        '魔王的初吻对象 = ARG + 1',
      );
      assert.equal(fixture.store.get('cstr:0:4'), '角色1');
    }
  }
});

test('MARRIAGE：初吻只在未初始化（-1）时落一次', async () => {
  const fixture = seed();
  fixture.store.set('cflag:1:16', 5); // 已经有初吻对象
  fixture.store.set(`item:${MONSTER}`, 1);
  fixture.store.set(`itemname:${MONSTER}`, '怪物');
  fixture.set_inputs(MONSTER);

  await load(fixture).marriage(1, () => 0);

  assert.equal(texts(fixture).includes('【初吻】'), false);
  assert.equal(fixture.store.get('cflag:1:16'), 5, '原值不动');
});

test('MARRIAGE：异种婚姻（欲望 LV 5 + 异种奸经验 300 + 主从逆转/异种恋慕）追加三行并置素质 159', async () => {
  // [标签, 预置, 是否触发]
  const table = [
    ['全部满足', { 'abl:1:11': 5, 'talent:1:293': 1, 'exp:1:58': 300 }, true],
    [
      '欲望 LV 不够',
      { 'abl:1:11': 4, 'talent:1:293': 1, 'exp:1:58': 300 },
      false,
    ],
    ['没有主从逆转/异种恋慕', { 'abl:1:11': 5, 'exp:1:58': 300 }, false],
    [
      '异种奸经验不足',
      { 'abl:1:11': 5, 'talent:1:294': 1, 'exp:1:58': 299 },
      false,
    ],
    [
      '已经有异种婚姻素质',
      { 'abl:1:11': 5, 'talent:1:293': 1, 'exp:1:58': 300, 'talent:1:159': 1 },
      false,
    ],
  ];
  for (const [label, preset, triggered] of table) {
    const fixture = seed();
    fixture.store.set(`item:${MONSTER}`, 1);
    fixture.store.set(`itemname:${MONSTER}`, '怪物');
    fixture.store.set('talentname:159', '异种婚姻');
    for (const [key, value] of Object.entries(preset)) {
      fixture.store.set(key, value);
    }
    fixture.set_inputs(MONSTER);

    await load(fixture).marriage(1, () => 0);

    assert.equal(
      texts(fixture).includes('角色1与肉体・精神接彼此相爱的伙伴结婚了…'),
      triggered,
      label,
    );
    if (triggered) {
      assert.ok(texts(fixture).includes('角色1得到了【异种婚姻】'));
      assert.equal(fixture.store.get('talent:1:159'), 1);
    }
  }
});

// —— 补钉：奴隶婚的处女骰、婚姻编码的进位、翻页边界（#393 自检补） ——

test('MARRIAGE：奴隶婚的处女骰按双方性别组合掷四档上界（5/7/9/5 逐个钉住）', async () => {
  // [标签, 对方 122/121, 本人 122/121, 期望上界]
  const table = [
    ['双方都不是男人也不是扶她（同为女性）', [0, 0], [0, 0], 5],
    ['对方是男人、本人不是男人', [1, 0], [0, 0], 7],
    ['对方是男人、本人既是男人又是扶她（跳过第二档）', [1, 0], [1, 1], 9],
    ['对方是扶她、本人既是男人又是扶她', [0, 1], [1, 1], 5],
  ];
  for (const [label, partner, self, upper] of table) {
    const fixture = seed();
    add_chara(fixture, 2, '乙');
    fixture.store.set('talent:2:122', partner[0]);
    fixture.store.set('talent:2:121', partner[1]);
    fixture.store.set('talent:1:122', self[0]);
    fixture.store.set('talent:1:121', self[1]);
    fixture.set_inputs(904, 2);
    const bounds = [];
    const rand = (n) => {
      bounds.push(n);
      return n - 1;
    };

    await load(fixture).marriage(1, rand);

    assert.ok(bounds.includes(upper), `${label}：处女骰上界 ${upper}`);
    // 奴隶婚的 VIRGIN_B 是**死值**：:405 的判据带 `GROOM_TYPE != 1000`，
    // 掷出来的数没有任何消费者（原作如此，见模块文件头）
    assert.equal(
      texts(fixture).includes('【处女丧失】'),
      false,
      `${label}：发起方不破处`,
    );
    assert.equal(fixture.store.get('talent:1:0') || 0, 0, label);
  }
});

test('MARRIAGE：奴隶婚的第五档——对方是女性且本人是男人时，直接让对方破处', async () => {
  {
    const fixture = seed();
    add_chara(fixture, 2, '乙');
    fixture.store.set('talent:2:0', 1); // 对方处女
    fixture.store.set('talent:1:122', 1); // 本人男人
    fixture.set_inputs(904, 2);

    await load(fixture).marriage(1, () => 0);

    assert.ok(texts(fixture).includes('乙【处女丧失】'), '播报');
    assert.equal(fixture.store.get('talent:2:0'), 0, '对方的处女素质清掉');
  }
  {
    // 对方不是处女时不进这一档
    const fixture = seed();
    add_chara(fixture, 2, '乙');
    fixture.store.set('talent:1:122', 1);
    fixture.set_inputs(904, 2);

    await load(fixture).marriage(1, () => 0);

    assert.equal(texts(fixture).includes('乙【处女丧失】'), false);
  }
});

test('MARRIAGE：婚姻编码的进位——已婚（位 1）与离婚（位 2）再婚各 +20000', async () => {
  // [标签, TALENT:320 初值, 期望终值]
  const table = [
    ['未婚（位 0）：不进位', 0, 0],
    ['已婚（位 1）：+20000', 10000, 30000],
    ['离婚（位 2）：+20000', 20000, 40000],
    ['重婚（位 3）：不进位', 30000, 30000],
  ];
  for (const [label, before, after] of table) {
    const fixture = seed();
    fixture.store.set(`item:${MONSTER}`, 1);
    fixture.store.set(`itemname:${MONSTER}`, '怪物');
    fixture.store.set('talent:1:320', before);
    fixture.set_inputs(MONSTER);

    await load(fixture).marriage(1, () => 0);

    assert.equal(fixture.store.get('talent:1:320'), after, label);
  }
});

test('DIVORCE：重婚（位 3）与再婚（位 4）各回落 20000，其余不动', () => {
  for (const [before, after] of [
    [30000, 10000],
    [40000, 20000],
    [10000, 10000],
  ]) {
    const fixture = seed();
    fixture.store.set('cflag:1:601', 900);
    fixture.store.set('talent:1:320', before);

    load(fixture).divorce(1);

    assert.equal(
      fixture.store.get('talent:1:320'),
      after,
      `${before} → ${after}`,
    );
  }
});

test('MARRIAGE：奴隶列表的翻页窗口按位置开——第 21 人只在第 2 页', async () => {
  const fixture = seed();
  for (let cid = 2; cid <= 21; cid += 1) add_chara(fixture, cid, `角色${cid}`);
  fixture.set_inputs(904, 1001, 21); // 进子菜单 → 下一页 → 选第 21 人

  assert.equal(await load(fixture).marriage(1, () => 0), 1);

  assert.ok(texts(fixture).includes('*角色1和角色21举行了结婚典礼*'));
  assert.equal(
    fixture.store.get('cflag:1:601'),
    fixture.load_module('chara/chara-stats').chara_id_output(21) + 9,
    '登记对象 = CHARA_ID_OUTPUT(21) + 9',
  );
});

// —— 补钉二：目前结婚对象的「在故乡等待的伴侣」、自恋守卫、魔王娶奴隶、翻页边界 ——

test('MARRIAGE：没对象但素质 315 == 21 或有 157 时，显示「在故乡等待的伴侣」', async () => {
  // [标签, 预置]
  const table = [
    ['前身是主妇（TALENT:315 == 21）', { 'talent:1:315': 21 }],
    ['有 157 素质', { 'talent:1:157': 1 }],
    ['前身是别的（22）且没有 157', { 'talent:1:315': 22 }],
  ];
  for (const [label, preset] of table) {
    const fixture = seed();
    for (const [key, value] of Object.entries(preset)) {
      fixture.store.set(key, value);
    }
    fixture.set_inputs(999);
    await load(fixture).marriage(1, () => 0);
    const expected = label.startsWith('前身是别的') ? '无' : '在故乡等待的伴侣';
    assert.ok(
      texts(fixture).includes(`[角色1目前结婚对象:${expected}]`),
      label,
    );
  }
});

test('MARRIAGE：[901] 选自己——魔王被拒（自恋守卫），非魔王则照常结婚', async () => {
  {
    const fixture = seed();
    fixture.set_inputs(901, 999);
    assert.equal(await load(fixture).marriage(0), 0);
    assert.ok(
      texts(fixture).includes('魔王大人，自恋也是要有限度的啦。'),
      '魔王的拒绝话术',
    );
    assert.equal(fixture.store.get('cflag:0:601') || 0, 0, '没结成');
  }
  {
    // 角色 1 选「你」不受这条守卫限制
    const fixture = seed();
    fixture.set_inputs(901);
    assert.equal(await load(fixture).marriage(1, () => 0), 1);
    assert.equal(fixture.store.get('cflag:1:601'), 901);
  }
});

test('MARRIAGE：魔王（ARG 0）娶奴隶时，被求婚方那一侧登记的是 901（你）而不是编号', async () => {
  const fixture = seed();
  add_chara(fixture, 2, '乙');
  fixture.set_inputs(904, 2);

  assert.equal(await load(fixture).marriage(0, () => 0), 1);

  assert.equal(fixture.store.get('cflag:2:601'), 901, '被求婚方登记「你」');
  assert.ok(texts(fixture).includes('你和乙结婚了。'));
});

test('MARRIAGE：奴隶子菜单的翻页边界——19 名奴隶（总数 20，正好一页）时下一页翻到空页', async () => {
  // 原作判据是 (NO_PAGE+1)*20 <= CHARANUM，而 CHARANUM 含魔王：19 名奴隶
  // ＋魔王正好让「还有下一页」成立一次，翻过去是空页（原作如此）
  const fixture = seed();
  for (let cid = 2; cid <= 19; cid += 1) add_chara(fixture, cid, `角色${cid}`);
  fixture.set_inputs(904, 1001, 999, 999);

  assert.equal(await load(fixture).marriage(1, () => 0), 0);

  // 两轮子菜单各自的收尾标记（LIFE_LIST 的行在页码按钮之前）
  const nexts = [];
  fixture.lines_history.forEach((line, idx) => {
    if (line.type === 'button' && line.text === '- 下一页') nexts.push(idx);
  });
  assert.equal(nexts.length, 2, '进子菜单一次、翻页重画一次');
  const rows_in_second_render = fixture.lines_history
    .slice(nexts[0] + 1, nexts[1])
    .filter((line) => line.type === 'button' && /^\d+$/.test(line.text));
  assert.deepEqual(rows_in_second_render, [], '第 2 页是空的');
});
