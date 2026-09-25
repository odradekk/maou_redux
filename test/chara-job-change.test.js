/**
 * @file ere/chara/chara-job-change.js 的行为测试（issue #393，N9）。
 *
 * 源: target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB 全四函数（:4-263）——
 *     @SHOW_BUTTON_JOB_CHANGE / @CHECK_ABLE_TO_JOB_CHANGE（式中函数）/
 *     @CHARA_INFO_JOB_CHANGE / @JOB_CHANGE_BENKI。
 *
 * 缝 = test/helpers/era-fixture.js。判定与按钮外观照 chara-name-edit.test.js
 * 的读法（`rendered` 看引擎拼的快捷键前缀，染灰看 `setColor` 调用序列——
 * 夹具不把颜色带进按钮，见该文件头）。
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
  return fixture.load_module('chara/chara-job-change');
}

function texts(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

function buttons(fixture) {
  return fixture.lines_history.filter((line) => line.type === 'button');
}

function color_calls(fixture) {
  return fixture.calls
    .filter((call) => call.api === 'setColor')
    .map((call) => call.args[0]);
}

/** 转职菜单一行共用的「可转职角色」底稿：状态 0、等级 50 */
function seed_able(fixture, cid = 1) {
  add_chara(fixture, cid);
  fixture.store.set(`cflag:${cid}:1`, 0);
  fixture.store.set(`cflag:${cid}:9`, 50);
  return cid;
}

// —— @CHECK_ABLE_TO_JOB_CHANGE（:23-42，式中函数）——

test('CHECK_ABLE_TO_JOB_CHANGE：五档判定的先后与边界——表驱动走完整个维度', () => {
  // [标签, arg, 状态, 等级, 期望]；状态 null = 不预设（读作 0）
  const table = [
    ['魔王恒不可转职', 0, null, 99, 1],
    ['魔王：状态 2 也还是 1（ARG==0 先判）', 0, 2, 99, 1],
    ['侵攻中的勇者', 1, 2, 99, 2],
    ['侵攻中：等级不足也还是 2（状态 2 先于等级判）', 1, 2, 0, 2],
    ['等级 49 = 差一点', 1, 0, 49, 3],
    ['等级 50 = 刚好够', 1, 0, 50, 0],
    ['待机（状态 1）不可是 4', 1, 1, 50, 4],
    ['迎击中（状态 3）不可是 4', 1, 3, 50, 4],
    ['死亡（状态 4）不可是 4', 1, 4, 50, 4],
    ['状态 0 可', 1, 0, 50, 0],
    ['状态 7（苗床）可', 1, 7, 50, 0],
  ];
  for (const [label, arg, state, level, expected] of table) {
    const fixture = create_era_fixture();
    add_chara(fixture, arg);
    if (state !== null) fixture.store.set(`cflag:${arg}:1`, state);
    fixture.store.set(`cflag:${arg}:9`, level);
    assert.equal(load(fixture).check_able_to_job_change(arg), expected, label);
  }
});

// —— @SHOW_BUTTON_JOB_CHANGE（:4-20）——

test('SHOW_BUTTON_JOB_CHANGE：侵攻中不渲染；其余三档渲染同一按钮，只有不可用档染灰', () => {
  // [标签, 状态, 等级, 期望的 setColor 调用序列]
  const table = [
    ['侵攻中：按钮整个不出现', 2, 99, []],
    ['可用：不染灰，仍以复原色调用收尾', 0, 50, ['']],
    ['等级不足：先染灰再复原', 0, 49, ['#646464', '']],
    ['状态占用：先染灰再复原', 1, 50, ['#646464', '']],
  ];
  for (const [label, state, level, expected_colors] of table) {
    const fixture = create_era_fixture();
    add_chara(fixture, 1);
    fixture.store.set('cflag:1:1', state);
    fixture.store.set('cflag:1:9', level);

    load(fixture).show_button_job_change(2, 1);

    assert.deepEqual(color_calls(fixture), expected_colors, label);
    if (expected_colors.length > 0) {
      assert.equal(buttons(fixture)[0].rendered, '[2] 转职 ', `${label}：正文`);
    }
  }
});

// —— @CHARA_INFO_JOB_CHANGE（:45-230）：入口四档 ——

test('CHARA_INFO_JOB_CHANGE：四档拒绝——三档播报后返回 0，侵攻中那档静默返回 2', async () => {
  // [标签, 状态, 等级, arg, 期望返回, 期望播报]
  const table = [
    ['魔王不可转职', 0, 99, 0, 0, '你的职业无法改变'],
    ['侵攻中的勇者：按钮不渲染、输入仍能到达', 2, 99, 1, 2, undefined],
    ['等级不足', 0, 49, 1, 0, '必须积累更多经验！'],
    ['状态占用', 1, 50, 1, 0, '该角色处于不可转职的状态'],
  ];
  for (const [label, state, level, arg, expected, message] of table) {
    const fixture = create_era_fixture();
    add_chara(fixture, arg);
    fixture.store.set(`cflag:${arg}:1`, state);
    fixture.store.set(`cflag:${arg}:9`, level);

    const result = await load(fixture).chara_info_job_change(arg);

    assert.equal(result, expected, `${label}：返回值`);
    if (message === undefined) {
      assert.deepEqual(texts(fixture), [], `${label}：不应有任何播报`);
    } else {
      assert.ok(texts(fixture).includes(message), `${label}：播报 ${message}`);
    }
  }
});

// —— @CHARA_INFO_JOB_CHANGE：菜单渲染与输入校验（:68-101）——

test('CHARA_INFO_JOB_CHANGE：菜单恒有 0-9/12/999，上位职两项按勋章数（EXP:81 > 9）出现', async () => {
  for (const [medals, expected_tenth, expected_eleventh] of [
    [9, false, false],
    [10, true, true],
  ]) {
    const fixture = create_era_fixture();
    seed_able(fixture);
    fixture.store.set('exp:1:81', medals);
    fixture.set_inputs(999);

    assert.equal(await load(fixture).chara_info_job_change(1), 0);

    const accelerators = buttons(fixture).map((b) => b.accelerator);
    assert.deepEqual(
      accelerators,
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 12]
        .concat(expected_tenth ? [10] : [])
        .concat(expected_eleventh ? [11] : [])
        .concat([999]),
      `勋章 ${medals} 的菜单项`,
    );
    assert.deepEqual(
      buttons(fixture)
        .filter((b) => b.accelerator <= 12)
        .map((b) => b.text),
      [
        '战士',
        '魔法师',
        '神官',
        '盗贼',
        '肉便器',
        '骑士',
        '巫女',
        '忍者',
        '弓手',
        '苗床',
        '魔物使',
      ]
        .concat(expected_tenth ? ['魔界将军'] : [])
        .concat(expected_eleventh ? ['魔导神官'] : []),
      '职业名逐字',
    );
    // 排版：每行 JOB_MENU_COLUMNS(3) 格——按 Row 分组逐行钉住。格数常量
    // 少写一格时最后一行会散开（11 项 3 格一行 → 收尾是 [9,12] 两格一行），
    // 这条断言就是那个边界的看门人（M9046）
    const rows = [];
    for (const b of buttons(fixture)) {
      if (rows.length === 0 || rows.at(-1).row !== b.row) {
        rows.push({ row: b.row, accels: [] });
      }
      rows.at(-1).accels.push(b.accelerator);
    }
    assert.deepEqual(
      rows.map((r) => r.accels),
      [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [9, 12],
      ]
        .concat(expected_tenth ? [[10, 11]] : [])
        .concat([[999]]),
      `勋章 ${medals} 的每行格数`,
    );
  }
});

test('CHARA_INFO_JOB_CHANGE：999 返回且不动任何状态', async () => {
  const fixture = create_era_fixture();
  seed_able(fixture);
  fixture.store.set('talent:1:200', 1); // 旧职业标记
  fixture.set_inputs(999);

  assert.equal(await load(fixture).chara_info_job_change(1), 0);
  assert.equal(fixture.store.get('talent:1:200'), 1, '未动职业表');
  assert.equal(fixture.store.get('cflag:1:9'), 50, '未动等级');
});

// —— @CHARA_INFO_JOB_CHANGE：转职落地（:103-176）——

/** 职业号 → 职业名（TALENTNAME 的播种值，与菜单正文同源：yml/Talent.yml） */
const JOB_NAMES = {
  0: '战士',
  1: '魔法师',
  2: '神官',
  3: '盗贼',
  4: '肉便器',
  5: '骑士',
  6: '巫女',
  7: '忍者',
  8: '弓手',
  9: '苗床',
  10: '魔界将军',
  11: '魔导神官',
  12: '魔物使',
};

test('CHARA_INFO_JOB_CHANGE：转职落地——职业表先清后设、等级归 1、四维与上限按职业表（13 档表驱动）', async () => {
  // [输入, 职业素质, 战斗技能素质, 状态, [攻,防,基础攻,基础防], 上限, 治癒, 鼓舞, 追加输入]
  const table = [
    [0, 200, 240, 0, [20, 20, 20, 20], 2000, false, true, []],
    [1, 201, 241, 0, [15, 15, 15, 15], 2000, false, false, []],
    [2, 202, 242, 0, [15, 20, 15, 20], 2000, true, false, []],
    [3, 203, 243, 0, [20, 15, 20, 15], 2000, false, false, []],
    [4, 204, null, 0, [15, 15, 15, 15], 2000, false, false, [999]],
    [5, 205, 249, 0, [20, 20, 20, 20], 2000, false, true, []],
    [6, 206, 250, 0, [15, 15, 15, 15], 2000, true, false, []],
    [7, 207, 251, 0, [15, 20, 15, 20], 2000, false, false, []],
    [8, 208, 252, 0, [20, 15, 20, 15], 2000, false, false, []],
    [9, 209, null, 7, [15, 15, 15, 15], 2000, false, false, []],
    [10, 210, null, 0, [40, 40, 40, 40], 2500, false, false, []],
    [11, 211, null, 0, [40, 40, 40, 40], 2500, false, false, []],
    [12, 212, 265, 0, [20, 15, 20, 15], 2000, false, true, [0]],
  ];
  for (const [
    input,
    job,
    skill,
    state,
    params,
    max_base,
    heal,
    inspire,
    extra,
  ] of table) {
    const fixture = create_era_fixture();
    seed_able(fixture);
    fixture.store.set('exp:1:81', 10); // 上位职的勋章
    // 旧职业预置在**十三格的两端**（200 = 第一格、212 = 最后一格）：格数常量
    // 少写一格时最后一格会静默留下旧职业，这里才拦得住（M9042）
    fixture.store.set('talent:1:200', 1);
    fixture.store.set('talent:1:212', 1);
    fixture.store.set('talent:1:281', 2); // 常识改变【战斗】也要清
    // 十三格职业名都播种，且刻意与菜单号错开一位——播报取错格（恒读 200
    // 之类的实现）会立刻露馅
    for (const [num, name] of Object.entries(JOB_NAMES)) {
      fixture.store.set(`talentname:${200 + Number(num)}`, name);
    }
    fixture.set_inputs(input, ...extra);

    assert.equal(
      await load(fixture).chara_info_job_change(1),
      0,
      `输入 ${input}`,
    );

    // 职业表：200-212 十三格只剩目标那一格
    const set = [];
    for (let offset = 0; offset < 13; offset += 1) {
      if (fixture.store.get(`talent:1:${200 + offset}`)) set.push(200 + offset);
    }
    assert.deepEqual(set, [job], `输入 ${input}：职业表`);
    assert.equal(
      fixture.store.get('talent:1:281'),
      0,
      `输入 ${input}：常识改变清空`,
    );

    assert.equal(fixture.store.get('cflag:1:9'), 1, `输入 ${input}：等级归 1`);
    assert.equal(fixture.store.get('cflag:1:1'), state, `输入 ${input}：状态`);
    assert.deepEqual(
      [11, 12, 13, 14].map((idx) => fixture.store.get(`cflag:1:${idx}`)),
      params,
      `输入 ${input}：攻防四维`,
    );
    assert.equal(
      fixture.store.get('maxbase:1:0'),
      max_base,
      `输入 ${input}：体力上限`,
    );
    assert.equal(
      fixture.store.get('maxbase:1:1'),
      max_base,
      `输入 ${input}：气力上限`,
    );
    assert.equal(
      fixture.store.get('base:1:0'),
      max_base,
      `输入 ${input}：体力回满`,
    );
    assert.equal(
      fixture.store.get('base:1:1'),
      max_base,
      `输入 ${input}：气力回满`,
    );

    if (skill !== null) {
      assert.equal(
        fixture.store.get(`talent:1:${skill}`),
        1,
        `输入 ${input}：战斗技能 ${skill}`,
      );
    }
    assert.equal(
      fixture.store.get('talent:1:117') || 0,
      heal ? 1 : 0,
      `输入 ${input}：治癒`,
    );
    assert.equal(
      fixture.store.get('talent:1:118') || 0,
      inspire ? 1 : 0,
      `输入 ${input}：鼓舞`,
    );
    if (heal) {
      assert.equal(
        fixture.store.get('cflag:1:152'),
        20,
        `输入 ${input}：高信仰值`,
      );
    }
    assert.ok(
      texts(fixture).includes(`角色1转职为${JOB_NAMES[input]}了！`),
      `输入 ${input}：播报新职名`,
    );
  }
});

test('CHARA_INFO_JOB_CHANGE：弃教一问——三个条件只放行「换掉神官后仍有神官技能」这一支', async () => {
  // [标签, 预设的 250/242 技能, 新职业, 282 预设, 期望提问次数]
  const table = [
    ['旧神官技能还在（242）且新职不是神官/巫女 → 问', 242, 0, 0, 1],
    ['旧巫女技能还在（250）且新职不是神官/巫女 → 问', 250, 0, 0, 1],
    ['已经弃教过（282 = 1）→ 不问', 242, 0, 1, 0],
    ['没有任何神职技能 → 不问', null, 0, 0, 0],
    ['转成神官本身（202）→ 不问', 242, 2, 0, 0],
    ['转成巫女本身（206）→ 不问', 250, 6, 0, 0],
  ];
  for (const [label, skill, input, cursed, expected] of table) {
    const fixture = create_era_fixture();
    seed_able(fixture);
    if (skill !== null) fixture.store.set(`talent:1:${skill}`, 1);
    fixture.store.set('talent:1:282', cursed);
    fixture.set_inputs(input, 0, ...(input === 12 ? [0] : []));

    await load(fixture).chara_info_job_change(1);

    const asked = texts(fixture).filter((t) => t === '要弃教吗').length;
    assert.equal(asked, expected, label);
    if (expected === 1) {
      assert.equal(
        fixture.store.get('talent:1:282'),
        1,
        `${label}：答 [0] 落弃教`,
      );
      assert.ok(texts(fixture).includes('*已经弃教了*'), `${label}：播报`);
    }
  }
});

test('CHARA_INFO_JOB_CHANGE：弃教问答答 [1] 不落弃教', async () => {
  const fixture = create_era_fixture();
  seed_able(fixture);
  fixture.store.set('talent:1:242', 1); // 旧神官技能
  fixture.set_inputs(0, 1);

  await load(fixture).chara_info_job_change(1);

  assert.ok(texts(fixture).includes('要弃教吗'), '问了');
  assert.equal(fixture.store.get('talent:1:282') || 0, 0, '答 [1] 不弃教');
  assert.equal(texts(fixture).includes('*已经弃教了*'), false, '不播报弃教');
});

// —— @JOB_CHANGE_BENKI（:233-262）——

test('JOB_CHANGE_BENKI：菜单两行各带当前取值（GET_LOOK_INFO 的两 kind），[999] 終了', async () => {
  const fixture = create_era_fixture();
  seed_able(fixture);
  fixture.store.set('talent:1:281', 1); // 战斗常识：奉侍战斗
  fixture.store.set('talent:1:283', 4); // 日常常识：公众便器
  fixture.set_inputs(999);

  assert.equal(await load(fixture).job_change_benki(1), 0);

  assert.ok(texts(fixture).includes('将常识变成性爱。'));
  assert.deepEqual(
    buttons(fixture).map((b) => b.rendered),
    ['[0] 变更战斗的常识', '[1] 变更生活的常识', '[999] 终了'],
  );
  const cell_texts = fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
  assert.ok(
    cell_texts.includes('\u00A0\u00A0-\u00A0\u00A0奉侍战斗'),
    '战斗常识的当前取值',
  );
  assert.ok(
    cell_texts.includes('\u00A0\u00A0-\u00A0\u00A0公众便器'),
    '日常常识的当前取值',
  );
});

test('JOB_CHANGE_BENKI：[0] 战斗常识三档循环；[1] 日常常识六档循环且没养狗时跳过兽奸档', async () => {
  // [标签, 起始值, 目标素质, 是否养狗, 期望值]
  const table = [
    ['战斗 0 → 1', 0, 281, false, 1],
    ['战斗 1 → 2', 1, 281, false, 2],
    ['战斗 2 → 0（取模 3）', 2, 281, false, 0],
    ['日常 0 → 1', 0, 283, false, 1],
    ['日常 3 → 4', 3, 283, false, 4],
    ['日常 4 → 0（没养狗，跳过 5）', 4, 283, false, 0],
    ['日常 4 → 5（养了狗）', 4, 283, true, 5],
    ['日常 5 → 0（取模 6）', 5, 283, false, 0],
  ];
  for (const [label, start, talent, dog, expected] of table) {
    const fixture = create_era_fixture();
    seed_able(fixture);
    if (dog) fixture.store.set('item:22', 1);
    fixture.store.set(`talent:1:${talent}`, start);
    fixture.set_inputs(talent === 281 ? 0 : 1, 999);

    await load(fixture).job_change_benki(1);

    assert.equal(fixture.store.get(`talent:1:${talent}`), expected, label);
  }
});

test('CHARA_INFO_JOB_CHANGE：魔物使转职后选契约魔兽——编号写入 CFLAG:570 并播报怪物名', async () => {
  const fixture = create_era_fixture();
  seed_able(fixture);
  fixture.store.set('item:110', 1); // 持有 110 号怪物
  fixture.store.set('itemname:110', '哥布林');
  fixture.set_inputs(12, 110);

  assert.equal(await load(fixture).chara_info_job_change(1), 0);

  assert.ok(
    buttons(fixture).some((b) => b.accelerator === 110),
    '持有怪物进了 MONSTERPLAY_LIST 的按钮列表',
  );
  assert.equal(fixture.store.get('cflag:1:570'), 110, '契约怪物写入 CFLAG:570');
  assert.ok(texts(fixture).includes('与哥布林缔结契约了'), '播报怪物名');
});
