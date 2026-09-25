/**
 * 角色信息显示链的行为测试（issue #390，N6 段 2）——本票全部生产模块共用
 * 一个测试文件（内环按票跑）。
 *
 * 源: target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB（全 18 函数）
 *     target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB（全 20 函数）
 *     target/ERB/キャラ関数/CHARA_BODY.ERB @CUP_SIZE（:781-850，#390 认领）
 *
 * 被测模块：components/chara-info-title.js / chara-talents.js /
 * chara-info-abl-mark.js / chara-appearance.js / stain-info.js /
 * chara-equip-status.js / chara-data.js、page-chara-talent-condition.js、
 * page-chara-info-show.js、chara/chara-body.js 的 cup_size。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点），经模块公开导出
 * 直驱。带随机源形参的函数一律显式注入确定序列（#344）。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/** RAND:N 恒 0 的随机源 */
const always = () => 0;

/**
 * 依次吐出给定值的确定随机源（序列耗尽后回落 0）。
 * @param {number[]} values
 * @returns {(n: number) => number}
 */
function seq(values) {
  const queue = [...values];
  return () => (queue.length > 0 ? queue.shift() : 0);
}

/** FLAG:5 的位值（位号 → 掩码） */
const bit = (index) => 1 << index;

/**
 * 画面里所有按钮条目的引擎实显文本（夹具的 `rendered`，见 era-fixture 的
 * make_button_entry）。#530 起用它断言选项「经 printButton 出、编号由引擎拼」：
 * 只看 text 会漏掉手写前缀与引擎前缀撞车（实显成 `[2] [2] …`）。
 * @param {object} fixture 夹具
 * @returns {string[]}
 */
function button_rendered(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'button')
    .map((line) => line.rendered);
}

function title_fixture(flag5 = 0) {
  const fixture = create_era_fixture();
  fixture.store.set('flag:5', flag5);
  fixture.store.set('callname:7:-1', '考狄利亚');
  return {
    fixture,
    ...fixture.load_module('page/components/chara-info-title'),
  };
}

/** 取第 n 条 text 行的文本（多列行的各格在此已由夹具压平） */
function text_at(fixture, index) {
  return fixture.lines[index]?.text;
}

test('SHOW_INFO_TITLE：等号线 + 编号/名字/年龄行的逐字形态', () => {
  const { fixture, show_info_title } = title_fixture(bit(12));
  fixture.store.set('cflag:7:451', 16); // CFLAG:451 人类年龄
  fixture.store.set('cflag:7:452', 16); // CFLAG:452 种族年龄
  show_info_title(7, always);

  assert.equal(fixture.lines[0].type, 'divider');
  assert.equal(fixture.lines[0].border, 'solid', ':326 CUSTOMDRAWLINE =');
  // :333/:336/:346/:370 —— 编号宽 3 左对齐（"7  " + 一个空格）、名字宽 12、
  // 五个全角空格、年龄右对齐 48
  assert.equal(
    text_at(fixture, 1),
    `NO.7\u00A0\u00A0 考狄利亚\u00A0\u00A0\u00A0\u00A0\u3000\u3000\u3000\u3000\u3000${'\u00A0'.repeat(43)}16 岁`,
  );
});

test('SHOW_INFO_TITLE：爱慕优先于淫乱，两者都不命中时补五个全角空格', () => {
  // [TALENT 位, 期望片段, 说明]
  const cases = [
    [85, '　<爱慕>　', 'TALENT:85 爱慕'],
    [76, '　<淫乱>　', 'TALENT:76 淫乱'],
    [0, '　　　　　', '两者皆无'],
  ];
  for (const [talent_id, fragment, label] of cases) {
    const { fixture, show_info_title } = title_fixture(bit(12));
    fixture.store.set('cflag:7:451', 16);
    if (talent_id !== 0) fixture.store.set(`talent:7:${talent_id}`, 1);
    show_info_title(7, always);
    assert.equal(
      text_at(fixture, 1),
      `NO.7\u00A0\u00A0 考狄利亚\u00A0\u00A0\u00A0\u00A0${fragment}${'\u00A0'.repeat(43)}16 岁`,
      label,
    );
    const colored = fixture.lines[1].content.filter(
      (f) => f.color !== undefined,
    );
    assert.equal(
      colored.length,
      talent_id === 0 ? 0 : 1,
      `${label}：爱慕/淫乱标带 #ff6464 着色`,
    );
    if (talent_id !== 0) {
      assert.equal(colored[0].color, '#ff6464');
    }
  }
});

test('SHOW_INFO_TITLE：85 与 76 同设时爱慕胜出（IF/ELSEIF 顺序）', () => {
  const { fixture, show_info_title } = title_fixture(bit(12));
  fixture.store.set('cflag:7:451', 16);
  fixture.store.set('talent:7:85', 1);
  fixture.store.set('talent:7:76', 1);
  show_info_title(7, always);
  assert.match(text_at(fixture, 1), /<爱慕>/);
  assert.doesNotMatch(text_at(fixture, 1), /<淫乱>/);
});

test('SHOW_INFO_TITLE：FLAG:5 位 12/13/14/15 的四种年龄串组合（表驱动）', () => {
  // [FLAG:5 位组合, 期望年龄串（已右对齐到 48）, 说明]
  const cases = [
    [0, '\u00A0'.repeat(48), '位 12 关：年龄串为空 → 48 空格'],
    [bit(12), `${'\u00A0'.repeat(43)}16 岁`, '位 12 开：人类年龄'],
    [
      bit(12) | bit(13),
      `${'\u00A0'.repeat(43)}30 岁`,
      '位 13 开：改用种族年龄',
    ],
    [
      bit(12) | bit(13) | bit(14),
      `${'\u00A0'.repeat(26)}30 岁 (换算人类\u00A016 岁)`,
      '位 14 也开且两者不同：追加换算人类',
    ],
  ];
  for (const [flag5, expected, label] of cases) {
    const { fixture, show_info_title } = title_fixture(flag5);
    fixture.store.set('cflag:7:451', 16); // CFLAG:451 人类年龄
    fixture.store.set('cflag:7:452', 30); // CFLAG:452 种族年龄
    show_info_title(7, always);
    const line = text_at(fixture, 1);
    assert.equal(line.slice(-expected.length), expected, label);
  }
});

test('SHOW_INFO_TITLE：位 14 开但两年龄相同时不追加换算（第三个条件）', () => {
  const { fixture, show_info_title } = title_fixture(
    bit(12) | bit(13) | bit(14),
  );
  fixture.store.set('cflag:7:451', 16);
  fixture.store.set('cflag:7:452', 16);
  show_info_title(7, always);
  assert.equal(
    text_at(fixture, 1),
    `NO.7\u00A0\u00A0 考狄利亚\u00A0\u00A0\u00A0\u00A0\u3000\u3000\u3000\u3000\u3000${'\u00A0'.repeat(43)}16 岁`,
  );
});

test('SHOW_INFO_TITLE：TALENT:292 魔王之影追加寿命倒计时', () => {
  const { fixture, show_info_title } = title_fixture(bit(12));
  fixture.store.set('cflag:7:451', 16);
  fixture.store.set('cflag:7:820', 7); // CFLAG:820 寿命剩余天数
  fixture.store.set('talent:7:292', 1);
  show_info_title(7, always);
  // {CFLAG:820, 3} 右对齐宽 3 → "\u00A0\u00A07"
  assert.match(text_at(fixture, 1), /16 岁 \[寿命还有\u00A0{2}7 天\]$/);
});

test('SHOW_INFO_TITLE：魔王（cid 0）不显示年龄行但编号行照出', () => {
  const { fixture, show_info_title } = title_fixture(bit(12));
  fixture.store.set('cflag:0:451', 999);
  show_info_title(0, always);
  const line = text_at(fixture, 1);
  assert.match(line, /^NO.0\u00A0{2}/);
  assert.doesNotMatch(line, /岁/);
  assert.equal(line.slice(-48), '\u00A0'.repeat(48));
});

test('SHOW_INFO_TITLE：CFLAG:451 缺失时现调 CHAR_BODY_GENERATE_WAPPED 补生成', () => {
  const { fixture, show_info_title } = title_fixture(bit(12));
  assert.equal(fixture.store.get('cflag:7:451'), undefined);
  show_info_title(7, seq([7]));
  assert.notEqual(fixture.store.get('cflag:7:451'), 0, '生成后写入年龄');
  assert.match(text_at(fixture, 1), /岁$/);
});

test('SHOW_INFO_TITLE：CFLAG:451 已有值时不再生成（不消费随机源）', () => {
  const { fixture, show_info_title } = title_fixture(bit(12));
  fixture.store.set('cflag:7:451', 20);
  fixture.store.set('cflag:7:452', 20);
  show_info_title(7, () => {
    throw new Error('不应调用随机源');
  });
  assert.match(text_at(fixture, 1), /20 岁$/);
});

// —— @SHOW_BLOCK（:372-427） ——

function block_fixture(flag5 = 0, flag8 = 0) {
  const fixture = create_era_fixture();
  fixture.store.set('flag:5', flag5);
  fixture.store.set('flag:8', flag8);
  fixture.store.set('callname:7:-1', '考狄利亚');
  return {
    fixture,
    ...fixture.load_module('page/components/chara-info-title'),
  };
}

test('SHOW_BLOCK：一人称行 = 自称宽 26 左对齐 + [8] 一人称重设真按钮（#546）', async () => {
  const { fixture, show_block } = block_fixture();
  fixture.store.set('cstr:7:60', '人家'); // CSTR:60 自称
  await show_block(7);
  // 原作 :374-375 是 PRINTPLAINFORM + PRINTFORM 的同一行文字提示；ere 的
  // input 只接受已打印按钮的快捷键（#129），[8] 升级为真按钮才能点进
  // RANDOM_SELF_CALL 的 MODE 1——按钮自成一行（项目通例，见 #384 先例）
  assert.equal(text_at(fixture, 0), `一人称：${'人家' + '\u00A0'.repeat(22)}`);
  const buttons = fixture.lines.filter(
    (line) => line.type === 'button' && line.accelerator === 8,
  );
  assert.equal(buttons.length, 1);
  assert.equal(buttons[0].rendered, '[8] 一人称重设 ');
});

test('SHOW_BLOCK：三处收行 PRINTL 只结束所在行，全程零空行（#596）', async () => {
  // 原作 :395-396/:405-408/:416-419 的 PRINTL 都只结束上一行（一人称/身高行、
  // 体重行/LIFE_BAR 的未收行、臀围行/VITAL_BAR 的未收行），不产生空行。
  // 魔王臂里 :395 的守卫不成立、:408/:419 落在两条 bar 的未收行上——三种
  // 组合都不该多出空行。
  const cases = [
    [7, bit(15), '非魔王 + 三围开'],
    [7, 0, '非魔王 + 三围关'],
    [0, bit(15), '魔王'],
  ];
  for (const [cid, flag5, label] of cases) {
    const { fixture, show_block } = block_fixture(flag5);
    await show_block(cid);
    // 空行的两种形态都算（println 落 br、print('') 落 text 空串）
    assert.equal(
      fixture.lines.filter(
        (line) =>
          line.type === 'br' || (line.type === 'text' && line.text === ''),
      ).length,
      0,
      `${label}：SHOW_BLOCK 零空行（三处 PRINTL 只收行）`,
    );
  }
  // 段落逐行相邻：一人称 → [8] → 身高 → 体力条 → 体重 → 气力条 → 臀围
  const { fixture, show_block } = block_fixture(bit(15));
  fixture.store.set('maxbase:7:0', 1000);
  fixture.store.set('base:7:0', 800);
  fixture.store.set('maxbase:7:1', 500);
  fixture.store.set('base:7:1', 400);
  await show_block(7);
  assert.deepEqual(
    fixture.lines.map((line) => line.type),
    ['text', 'button', 'text', 'progress', 'text', 'progress', 'text'],
    '段落序列（:395-396/:405-408/:416-419 三处都不插空行）',
  );
});

test('SHOW_BLOCK：魔王（cid 0）不打印一人称行与 [8] 按钮（:373 的 ARG != MASTER）', async () => {
  const { fixture, show_block } = block_fixture();
  await show_block(0);
  assert.equal(fixture.text_lines().length, 0, '魔王没有一人称行');
  assert.equal(
    fixture.lines.filter((line) => line.type === 'button').length,
    0,
    '魔王没有 [8] 按钮',
  );
});

test('SHOW_BLOCK：三围行只在 FLAG:5 位 15 且非魔王时出现（两侧）', () => {
  // [FLAG:5, cid, 是否出现, 说明]
  const cases = [
    [bit(15), 7, true, '位 15 开 + 非魔王'],
    [0, 7, false, '位 15 关'],
    [bit(15), 0, false, '魔王：两个判据的第二个不成立'],
  ];
  return (async () => {
    for (const [flag5, cid, shown, label] of cases) {
      const { fixture, show_block } = block_fixture(flag5);
      fixture.store.set(`cflag:${cid}:453`, 1600);
      fixture.store.set(`cflag:${cid}:455`, 800);
      await show_block(cid);
      const has_size = fixture.lines.some(
        (line) => line.text !== undefined && line.text.includes('身高'),
      );
      assert.equal(has_size, shown, label);
    }
  })();
});

test('SHOW_BLOCK：身高/胸围行与罩杯括号，男性位改补 8 空格', () => {
  // [TALENT:122, 行尾, 说明]；身高 160.0 → 下胸围 689，胸围 800 → CAL_VAR 4 → A
  const cases = [
    [0, '(A)\u00A0\u00A0\u00A0\u00A0', '女性：罩杯括号补到 7 列'],
    [1, '\u00A0'.repeat(7), 'TALENT:122 男人：整段空格（8 格减命令分隔符）'],
  ];
  return (async () => {
    for (const [man, tail, label] of cases) {
      const { fixture, show_block } = block_fixture(bit(15));
      fixture.store.set('cflag:7:453', 1600);
      fixture.store.set('cflag:7:455', 800);
      if (man === 1) fixture.store.set('talent:7:122', 1);
      await show_block(7);
      assert.equal(
        text_at(fixture, 2), // 0 一人称行、1 [8] 按钮（#546 起真按钮）
        `\u00A0\u00A0身高 160.0 cm\u3000B \u00A080.0 cm${tail}`,
        label,
      );
    }
  })();
});

test('SHOW_BLOCK：体力条后接体重/腰围行、气力条后接臀围行', () => {
  const { fixture, show_block } = block_fixture(bit(15));
  fixture.store.set('maxbase:7:0', 1000);
  fixture.store.set('base:7:0', 800);
  fixture.store.set('maxbase:7:1', 500);
  fixture.store.set('base:7:1', 400);
  fixture.store.set('cflag:7:454', 450);
  fixture.store.set('cflag:7:456', 880);
  fixture.store.set('cflag:7:457', 900);
  return show_block(7).then(() => {
    const texts = fixture.text_lines();
    assert(
      texts.includes('体重 \u00A045.0 kg　W \u00A088.0 cm'),
      '体力条后的体重行',
    );
    assert(texts.includes(' H \u00A090.0 cm'), '气力条后的臀围行');
    // 两条 progress 行（体力/气力）都在
    assert.equal(fixture.lines.filter((l) => l.type === 'progress').length, 2);
  });
});

test('SHOW_BLOCK：魔王（cid 0）不出三围行，但体力/气力条照出', () => {
  const { fixture, show_block } = block_fixture(bit(15));
  fixture.store.set('maxbase:0:0', 1000);
  fixture.store.set('base:0:0', 500);
  fixture.store.set('maxbase:0:1', 500);
  fixture.store.set('base:0:1', 250);
  return show_block(0).then(() => {
    assert.equal(fixture.lines.filter((l) => l.type === 'progress').length, 2);
    assert.equal(fixture.text_lines().length, 0, '魔王没有一人称/三围行');
  });
});

test('SHOW_BLOCK：受注任务三段的守卫（CFLAG:534 / CFLAG:1 / FLAG:8 位 3）', () => {
  // [CFLAG:534, CFLAG:1, FLAG:8 位 3, 期望段数, 说明]
  const cases = [
    [
      1,
      2,
      bit(3),
      2,
      '三个判据全中：任务名 + 障碍聚合（怪物编号 0 → 讨伐对象段直返）',
    ],
    [1, 2, 0, 0, 'FLAG:8 位 3 关：整段不出'],
    [1, 0, bit(3), 0, 'CFLAG:1 非 2（不在任务中）'],
    [0, 2, bit(3), 0, 'CFLAG:534 非 1（没接任务）'],
  ];
  // 顺序跑：本文件的生产代码有惰性 require（quest_now），四份夹具并发时
  // 缓存里的模块实例会串到别的夹具上
  return (async () => {
    for (const [q534, state, flag8, expected, label] of cases) {
      const { fixture, show_block } = block_fixture(0, flag8);
      fixture.store.set('cflag:7:534', q534);
      fixture.store.set('cflag:7:1', state);
      fixture.store.set('cflag:7:537', 1); // 任务类型 1（さらわれた娘）
      fixture.store.set('cflag:7:540', 0); // 人物档
      fixture.store.set('cflag:7:538', 0); // 怪物编号 0 → 讨伐对象段直返
      fixture.store.set('cflag:7:536', 1); // 障碍位图非 0 → 障碍聚合段出
      await show_block(7);
      const quest_lines = fixture
        .text_lines()
        .filter((t) => t.startsWith('任务[') || t.startsWith('*任务会有'));
      assert.equal(quest_lines.length, expected, label);
    }
  })();
});

test('SHOW_BLOCK：任务三段的顺序是 任务名 → 障碍聚合 → 讨伐对象', () => {
  const { fixture, show_block } = block_fixture(0, bit(3));
  fixture.store.set('cflag:7:534', 1);
  fixture.store.set('cflag:7:1', 2);
  fixture.store.set('cflag:7:537', 1);
  fixture.store.set('cflag:7:540', 0);
  fixture.store.set('cflag:7:536', 0b11111); // 五种障碍全置位
  fixture.store.set('cflag:7:538', 9); // 怪物编号 9
  fixture.store.set('itemname:9', '史莱姆');
  return show_block(7).then(() => {
    const texts = fixture.text_lines();
    const first = texts.findIndex((t) => t.startsWith('任务['));
    const second = texts.findIndex((t) => t.startsWith('*任务会有'));
    const third = texts.findIndex((t) => t.startsWith('*讨伐对象是'));
    assert(first >= 0 && second > first && third > second, texts.join(' | '));
    assert.equal(texts[second], '*任务会有BOSS战/陷阱/时限/大量敌人/性要求');
    assert.equal(texts[third], '*讨伐对象是史莱姆');
  });
});

// —— @SHOW_TALENT / @SHOW_TALENT_GROUP（:428-921） ——

const { parse_yml_ids } = require('./helpers/static-names');

/** yml/Talent.yml 的 序号 → 名（用例侧断言用） */
const TALENT_NAMES = parse_yml_ids('Talent.yml');

/** 播种名字表（talentname:N；引擎装载后由名字表提供） */
function seed_talent_names(fixture) {
  for (const [id, name] of TALENT_NAMES) {
    fixture.store.set(`talentname:${id}`, name);
  }
}

/** 名字表里的名字（断言期望值时用，避免手抄） */
function tname(id) {
  return TALENT_NAMES.get(id);
}

function talent_fixture({ flag5 = 0, talents = {}, ex_talents = {} } = {}) {
  const fixture = create_era_fixture();
  fixture.store.set('flag:5', flag5);
  seed_talent_names(fixture);
  for (const [id, value] of Object.entries(talents)) {
    fixture.store.set(`talent:7:${id}`, value);
  }
  for (const [id, value] of Object.entries(ex_talents)) {
    fixture.store.set(`ex_talent:7:${id}`, value);
  }
  return { fixture, ...fixture.load_module('page/components/chara-talents') };
}

/** 素质编号（yml/Talent.yml 的名字表） */
const T = {
  处女: 0,
  童贞: 1,
  崩坏: 9,
  戒备森严: 27,
  开放: 33,
  害羞: 35,
  接受快感: 70,
  自慰狂: 74,
  淫乱: 76,
  双性恋: 81,
  爱慕: 85,
  魅力: 113,
  男人: 122,
  早泄: 133,
  牝犬: 136,
  妊娠: 153,
  育儿中: 154,
  伶俐: 175,
  巫者: 206,
  职业弓手: 208,
  精英: 220,
  绝伦: 230,
  先制: 252,
  白皙: 255,
  私处封印: 273,
  魂缚: 274,
  初心者: 291,
  魔物知识325: 325,
  魔界知识: 325,
  淫魔知识: 327,
  魔虫知识: 328,
};

test('SHOW_TALENT：黄金样本 daycycle-max 的分类显示七行逐字复现', () => {
  // 素质取自 daycycle-max-log:186-191 的勇者考狄利亚；组内顺序即
  // SECTIONS 的扫描顺序（伶俐 175 属 160-179 档，排在 戒备森严 27 之前）
  const { fixture, show_talent } = talent_fixture({
    flag5: 1 << 8,
    talents: {
      [T.处女]: 1,
      [T.私处封印]: 1,
      [T.伶俐]: 1,
      [T.戒备森严]: 1,
      [T.开放]: 1,
      [T.害羞]: 1,
      [T.魅力]: 1,
      [T.接受快感]: 1,
      [T.双性恋]: 1,
      [T.初心者]: 1,
      [T.职业弓手]: 1,
      [T.先制]: 1,
    },
  });
  assert.equal(show_talent(7), 'grouped');
  assert.deepEqual(fixture.text_lines(), [
    '　性别：[女][处女][私处封印]',
    '　性格：[伶俐][戒备森严][开放][害羞]',
    '　体质：　技术：[魅力]',
    '　性癖：[接受快感][双性恋]',
    '　后天：[初心者]',
    '　战斗：[弓手][先制]',
  ]);
});

test('SHOW_TALENT：性别行按 男/扶她/女 三档，男与扶她追加阴茎状态标', () => {
  // [TALENT:122, TALENT:121, TALENT:318, 期望行, 说明]
  const cases = [
    [0, 0, 0, '　性别：[女]', '女性'],
    [1, 0, 0, '　性别：[男][普通阴茎]', '男（TALENT:318 = 0）'],
    [0, 1, 4, '　性别：[扶她][马阴茎]', '扶她（TALENT:318 = 4）'],
    [1, 0, 5, '　性别：[男]', 'TALENT:318 越界不标（五档之外）'],
    [1, 1, 1, '　性别：[男][巨根]', '男优先于扶她'],
  ];
  for (const [man, futa, penis, expected, label] of cases) {
    const talents = {};
    if (man) talents[T.男人] = 1;
    if (futa) talents[121] = 1;
    if (penis) talents[318] = penis;
    const { fixture, show_talent } = talent_fixture({ flag5: 1 << 8, talents });
    show_talent(7);
    assert.equal(fixture.text_lines()[0], expected, label);
  }
});

test('SHOW_TALENT：性别行末尾三个素质标只出已得的（处女/童贞/私处封印）', () => {
  const { fixture, show_talent } = talent_fixture({
    flag5: 1 << 8,
    talents: { [T.童贞]: 1 },
  });
  show_talent(7);
  assert.equal(fixture.text_lines()[0], '　性别：[女][童贞]');
});

test('SHOW_TALENT：每 8 项换行、续行补 4 个全角空格（9 项分两行）', () => {
  const talents = {};
  for (let id = 200; id <= 208; id += 1) talents[id] = 1; // 职业 200-212 连号
  talents[T.接受快感] = 1; // 性癖段有输出 → 收行，战斗段得以独占一行
  talents[T.初心者] = 1; // 后天段同上
  const { fixture, show_talent } = talent_fixture({ flag5: 1 << 8, talents });
  show_talent(7);
  const lines = fixture.text_lines();
  const combat = lines.find((t) => t.startsWith('　战斗：'));
  assert(combat !== undefined);
  assert.equal(combat.split('[').length - 1, 8, '首行 8 项');
  const continuation = lines[lines.indexOf(combat) + 1];
  assert(continuation.startsWith('　　　　'), '续行以 4 个全角空格缩进');
  assert.equal(continuation.split('[').length - 1, 1, '续行 1 项');
});

test('SHOW_TALENT：分组色按源 SELECTCASE 逐条落地（表驱动）', () => {
  // [素质编号, 期望色, 说明]；色串取源 SETCOLOR/SETCOLORBYNAME 的等价物
  const cases = [
    [74, 'DarkSeaGreen', '自慰狂（CASE 101,102,230,74）'],
    [230, 'DarkSeaGreen', '绝伦'],
    [75, '#ffa500', '性爱狂（SETCOLOR 255,165,0）'],
    [232, '#ffa500', '淫壶'],
    [77, '#db7093', '尻穴狂（SETCOLOR 219,112,147）'],
    [233, '#db7093', '淫肛'],
    [78, '#66b3ff', '弄乳狂（SETCOLOR 102,179,255）'],
    [114, '#66b3ff', '爆乳'],
    [153, '#64ff64', '妊娠（SETCOLOR 100,255,100）'],
    [130, '#64ff64', '母乳体质'],
    [76, 'Salmon', '淫乱（SETCOLORBYNAME Salmon）'],
    [85, 'Salmon', '爱慕'],
    [200, '#64ff64', '职业档下沿'],
    [208, '#64ff64', '职业档 200-212'],
    [212, '#64ff64', '职业档上沿（含）'],
    [213, undefined, '213 越出职业档'],
    [T.魅力, undefined, '未命中任何一档 → 默认色'],
  ];
  for (const [id, color, label] of cases) {
    const { talent_color } = talent_fixture();
    assert.equal(talent_color(id, 0), color, label);
  }
});

test('SHOW_TALENT：EX 素质的第二组配色覆盖第一组（表驱动）', () => {
  // [EX 编号, 期望色, 说明]
  const cases = [
    [101, '#ffd700', 'EX 性格 101-800（SETCOLOR 255,215,0）'],
    [800, '#ffd700', '上沿'],
    [801, undefined, 'EX 战斗 801-900：RESETCOLOR'],
    [900, undefined, '上沿'],
    [901, '#64ff64', 'EX 职业 901-999（SETCOLOR 100,255,100）'],
    [999, '#64ff64', '上沿'],
    [100, undefined, '100 不在任何 EX 档（CASE 101 TO 800 的下界不含）'],
  ];
  for (const [id, color, label] of cases) {
    const { talent_color } = talent_fixture();
    assert.equal(talent_color(id, 2), color, label);
  }
});

test('SHOW_TALENT：模式 2 取 EX 名字表、模式 1 取感觉封锁名', () => {
  const { fixture, talent_label } = talent_fixture();
  fixture.load_module('chara/chara-ex').ex_talentname_init();
  // 模式 2：EX_TALENTNAME 的运行时表
  assert.equal(talent_label(7, 101, 2), '琼');
  assert.equal(talent_label(7, 901, 2), '一人军团');
  assert.equal(talent_label(7, 999, 2), '', '未登记名字的 EX 序号 → 空串');

  // 模式 1：四个感觉封锁名
  assert.equal(talent_label(7, 101, 1), '阴核感觉封锁');
  assert.equal(talent_label(7, 103, 1), '私处感觉封锁');
  assert.equal(talent_label(7, 105, 1), '肛门感觉封锁');
  assert.equal(talent_label(7, 107, 1), '乳房感觉封锁');
  assert.equal(talent_label(7, 99, 1), tname(99), '其余编号不改名');
});

test('SHOW_TALENT：男体下 101/102/230 三个素质改用阴茎侧名字', () => {
  const man = talent_fixture({ talents: { [T.男人]: 1 } });
  assert.equal(man.talent_label(7, 101, 0), '阴茎钝感');
  assert.equal(man.talent_label(7, 102, 0), '阴茎敏感');
  assert.equal(man.talent_label(7, 230, 0), '绝伦');
  assert.equal(
    man.talent_label(7, 101, 1),
    '阴茎感觉封锁',
    '模式 1 也看男体位',
  );

  const woman = talent_fixture();
  assert.equal(woman.talent_label(7, 101, 0), tname(101));
  assert.equal(woman.talent_label(7, 101, 1), '阴核感觉封锁');
});

test('SHOW_TALENT：TALENT:206 恒以「巫者」显示（覆盖其余改名结论）', () => {
  const { fixture, show_talent } = talent_fixture({
    flag5: 1 << 8,
    talents: { [T.巫者]: 1 },
  });
  show_talent(7);
  assert(fixture.text_lines().some((t) => t.includes('[巫者]')));
});

test('SHOW_TALENT：体质段无输出时标签与下一段同拼一行，有输出才收行', () => {
  const empty = talent_fixture({ flag5: 1 << 8 });
  empty.show_talent(7);
  assert.deepEqual(
    empty.fixture.text_lines().filter((t) => t.includes('　技术：')),
    ['　性格：　体质：　技术：'],
    '前三段全空时三个标签依次拼在同一行（源的两条收行判据）',
  );

  const with_body = talent_fixture({
    flag5: 1 << 8,
    talents: { [T.白皙]: 1 },
  });
  with_body.show_talent(7);
  assert(
    with_body.fixture.text_lines().some((t) => t.includes('　体质：[白皙]')),
    '体质段有输出时本段收行',
  );
});

test('SHOW_TALENT：327/328 的原作笔误 1:1（守 328 的判据读 TALENT:327）', () => {
  const only327 = talent_fixture({
    flag5: 1 << 8,
    talents: { [T.淫魔知识]: 1 },
  });
  only327.show_talent(7);
  const line = only327.fixture.text_lines().find((t) => t.includes('技术'));
  assert(line.includes('[淫魔知识]'), '327 自身照出');
  assert(line.includes('[魔虫知识]'), '328 由 327 的值守出（原作笔误）');

  const only328 = talent_fixture({
    flag5: 1 << 8,
    talents: { [T.魔虫知识]: 1 },
  });
  only328.show_talent(7);
  assert(
    !only328.fixture.text_lines().some((t) => t.includes('[魔虫知识]')),
    '只设 328 时反而不出（笔误的后果）',
  );
});

test('SHOW_TALENT：早泄（133）的守卫是扶她或男人，且要求自身已得', () => {
  const cases = [
    [{ [T.早泄]: 1 }, false, '女性：不出'],
    [{ [T.早泄]: 1, [T.男人]: 1 }, true, '男人：出'],
    [{ [T.早泄]: 1, 121: 1 }, true, '扶她：出'],
    [{ [T.男人]: 1 }, false, '只有男人位、自身未得：不出'],
  ];
  for (const [talents, shown, label] of cases) {
    const { fixture, show_talent } = talent_fixture({ flag5: 1 << 8, talents });
    show_talent(7);
    assert.equal(
      fixture.text_lines().some((t) => t.includes('[早泄]')),
      shown,
      label,
    );
  }
});

test('SHOW_TALENT：扫描区间的上界是不含的（边界两侧）', () => {
  // 取两个只被单一区间覆盖的编号带：499/500/599（性格的 EX 性格档）与
  // 469/470/489（战斗的精英技能档）——其余档位与别的段重叠，测不出边界。
  // 这四个编号在原作名字表里没有条目（该档位靠 EX_TALENTNAME 之类运行期
  // 命名），用例就地播种合成名，使断言认得住。
  const cases = [
    [499, false, '500-599 的下界-1'],
    [500, true, '500-599 的下界'],
    [599, true, '500-599 的上界'],
    [469, false, '470-489 的下界-1'],
    [470, true, '470-489 的下界'],
    [489, true, '470-489 的上界'],
  ];
  for (const [id, shown, label] of cases) {
    const { fixture, show_talent } = talent_fixture({
      flag5: 1 << 8,
      talents: { [id]: 1 },
    });
    fixture.store.set(`talentname:${id}`, `档${id}`);
    show_talent(7);
    assert.equal(
      fixture.text_lines().some((t) => t.includes(`[档${id}]`)),
      shown,
      `TALENT:${id}：${label}`,
    );
  }
});

test('SHOW_TALENT：简单臂无标签、起始计数 U = 6（首行只放 2 项）', () => {
  const talents = {};
  for (const id of [200, 201, 202, 203]) talents[id] = 1;
  const { fixture, show_talent } = talent_fixture({ flag5: 0, talents });
  assert.equal(show_talent(7), 'plain');
  const lines = fixture.text_lines();
  assert.equal(lines.length, 2, '4 项分两行');
  assert.equal(lines[0].split('[').length - 1, 2, '首行 2 项（U 从 6 起算）');
  assert(!lines[0].startsWith('　'), '无分组标签');
  assert(lines[1].startsWith('　　　　'), '续行缩进');
});

test('SHOW_TALENT：简单臂跳过 300-324，其余照扫', () => {
  const talents = {};
  for (const id of [294, 300, 324, 325]) talents[id] = 1;
  const { fixture, show_talent } = talent_fixture({ flag5: 0, talents });
  show_talent(7);
  const text = fixture.text_lines().join('');
  assert(text.includes(`[${tname(294)}]`), '294 在区间外，照出');
  assert(!text.includes(`[${tname(300)}]`), '300 在下界上，跳过');
  assert(!text.includes(`[${tname(324)}]`), '324 在区间内，跳过');
  assert(text.includes(`[${tname(325)}]`), '325 在上界上，照出');
});

test('SHOW_TALENT：简单臂补一趟 470-489 的精英魔物技能', () => {
  const { fixture, show_talent } = talent_fixture({
    flag5: 0,
    talents: { 471: 1, 485: 1, 486: 1, 489: 1, 490: 1 },
  });
  // 486-490 在原作名字表里没有条目，就地播种合成名以便断言
  for (const id of [486, 489, 490])
    fixture.store.set(`talentname:${id}`, `档${id}`);
  show_talent(7);
  const text = fixture.text_lines().join('');
  assert(text.includes(`[${tname(471)}]`), '471 在额外趟内');
  assert(text.includes(`[${tname(485)}]`), '485 在额外趟内');
  assert(text.includes('[档486]'), '486 仍在额外趟内');
  assert(text.includes('[档489]'), '489 在额外趟上界（含）');
  assert(!text.includes('[档490]'), '490 越出额外趟上界');
});

test('SHOW_TALENT：简单臂里 133 的守卫同样生效', () => {
  const female = talent_fixture({ flag5: 0, talents: { [T.早泄]: 1 } });
  female.show_talent(7);
  assert(!female.fixture.text_lines().join('').includes('[早泄]'));

  const male = talent_fixture({
    flag5: 0,
    talents: { [T.早泄]: 1, [T.男人]: 1 },
  });
  male.show_talent(7);
  assert(male.fixture.text_lines().join('').includes('[早泄]'));
});

test('SHOW_TALENT：EX 素质走分类臂的 EX 段（性格 100-800 与战斗 801-899）', () => {
  const { fixture, show_talent } = talent_fixture({
    flag5: 1 << 8,
    ex_talents: { 101: 1, 801: 1, 901: 1 },
  });
  fixture.load_module('chara/chara-ex').ex_talentname_init();
  show_talent(7);
  const text = fixture.text_lines().join('');
  assert(text.includes('[琼]'), 'EX 101 在性格段（100-800）');
  assert(text.includes('[无双]'), 'EX 801 在战斗段（801-899）');
  assert(!text.includes('[一人军团]'), 'EX 901 不在任何扫描区间内');
});

test('SHOW_TALENT_GROUP：8 项换行的判定点是「第 9 项先收行再落项」', () => {
  const { fixture, show_talent_group } = talent_fixture({ flag5: 1 << 8 });
  seed_talent_names(fixture);
  const line = { fragments: [{ content: '　标签：' }], count: 0 };
  for (let i = 0; i < 8; i += 1) show_talent_group(line, 7, 200 + i, 0);
  assert.equal(fixture.lines.length, 0, '8 项仍在同一行缓冲里');
  show_talent_group(line, 7, 208, 0);
  assert.equal(fixture.lines.length, 1, '第 9 项先把行收掉');
  assert.equal(line.fragments[0].content, '　　　　', '续行首片段是缩进');
  assert.equal(line.count, 9);
});

test('SHOW_TALENT_GROUP：101-108 的模式取自素质自身的第 2 位', () => {
  // TALENT:101 = 2（封锁位）→ 模式 2 → 走 EX 名字表
  const two = talent_fixture({ talents: { 101: 2 } });
  two.fixture.load_module('chara/chara-ex').ex_talentname_init();
  const line = { fragments: [], count: 0 };
  two.show_talent_group(line, 7, 101, 2);
  assert.equal(line.fragments[0].content, '[琼]');
  assert.equal(line.fragments[0].color, '#ffd700', 'EX 101 落 101-800 档');

  // TALENT:101 = 1（仅取得位）→ 模式 0 → 普通名
  const one = talent_fixture({ talents: { 101: 1 } });
  const line2 = { fragments: [], count: 0 };
  one.show_talent_group(line2, 7, 101, 1 & 2);
  assert.equal(line2.fragments[0].content, `[${tname(101)}]`);
});

test('SHOW_TALENT：每一段的首项都能被驱动出来（表驱动全段）', () => {
  const { SECTIONS } = talent_fixture();
  for (const section of SECTIONS) {
    const first = section.entries.find((e) => e.guard === undefined);
    const { fixture, show_talent } = talent_fixture({
      flag5: 1 << 8,
      talents: { [first.id]: 1 },
    });
    show_talent(7);
    assert(
      fixture
        .text_lines()
        .join('')
        .includes(`[${tname(first.id)}]`),
      `${section.label} 的首个无守卫项 ${first.id} 未出现`,
    );
  }
});

// —— @SHOW_INFO_ABL / @SHOW_INFO_MARK（:927-1016） ——

/** yml/Abl.yml 的 序号 → 名 */
const ABL_NAMES = parse_yml_ids('Abl.yml');

function abl_fixture({ talents = {}, abls = {}, marks = {} } = {}) {
  const fixture = create_era_fixture();
  seed_talent_names(fixture);
  for (const [id, name] of ABL_NAMES) {
    fixture.store.set(`ablname:${id}`, name);
  }
  for (const [id, value] of Object.entries(talents)) {
    fixture.store.set(`talent:7:${id}`, value);
  }
  for (const [id, value] of Object.entries(abls)) {
    fixture.store.set(`abl:7:${id}`, value);
  }
  for (const [id, value] of Object.entries(marks)) {
    fixture.store.set(`mark:7:${id}`, value);
  }
  return {
    fixture,
    ...fixture.load_module('page/components/chara-info-abl-mark'),
  };
}

/** 一条能力行的期望文本（名字宽 8 左对齐、等级宽 2 左对齐、标记位 2 空格） */
function abl_line(name, level) {
  const lv = String(level);
  return `\u00A0\u00A0${name}${'\u00A0'.repeat(8 - name.length * 2)} - LV${lv}${'\u00A0'.repeat(2 - lv.length + 2)}`;
}

test('SHOW_INFO_ABL：黄金样本 train-upgrade 的能力行逐字复现', () => {
  // train-upgrade-log:157 是魔王（cid 0）能力画面唯一的非空能力行：
  // 2 个前导空格 + 名字宽 8 + " - LV" + 等级宽 2 + 2 个标记位空格
  const { fixture, show_info_abl } = abl_fixture({ abls: { 12: 3 } });
  show_info_abl(7);
  // #577：这一行的四段补位（前导 2 / 名字列宽 8 / 等级列宽 2 / 标记位 2）
  // 都得是 NBSP——退回半角空格会留下连续半角空格，引擎合并后整行错位。
  // 放在逐字比对之前：补位字符退回半角时，先红的是这条（点名补位而非整行 diff）
  const abl_row = fixture.text_lines()[0];
  assert.ok(
    !/ {2,}/.test(abl_row),
    `能力行的列补位须是 NBSP、不得出现连续半角空格（实得 ${JSON.stringify(abl_row)}）`,
  );
  assert.deepEqual(fixture.text_lines(), [
    '\u00A0\u00A0技巧\u00A0\u00A0\u00A0\u00A0 - LV3\u00A0\u00A0\u00A0',
  ]);
});

test('SHOW_INFO_ABL：零值能力不出、每 4 项收行、末组不足 4 也收行', () => {
  // [能力表, 期望行数, 期望首行的项数, 说明]
  const cases = [
    [{ 10: 3 }, 1, 1, '1 项 → 1 行'],
    [{ 10: 3, 11: 2, 12: 1, 13: 1 }, 1, 4, '4 项 → 1 行'],
    [{ 10: 3, 11: 2, 12: 1, 13: 1, 14: 1 }, 2, 4, '5 项 → 2 行（末行 1 项）'],
    [{ 10: 5, 11: 5, 12: 5, 0: 5 }, 1, 4, '零值不占位'],
    [{ 10: 0, 11: 0 }, 0, 0, '全零 → 一行也不出'],
  ];
  for (const [abls, rows, first_count, label] of cases) {
    const { fixture, show_info_abl } = abl_fixture({ abls });
    show_info_abl(7);
    const lines = fixture.text_lines();
    assert.equal(lines.length, rows, label);
    if (rows > 0) {
      assert.equal(
        lines[0].split(' - LV').length - 1,
        first_count,
        `${label}：首行项数`,
      );
    }
  }
});

test('SHOW_INFO_ABL：编号空洞整组跳过（五段 INRANGE 与 38）', () => {
  const skipped = [
    5, 6, 7, 8, 9, 18, 19, 24, 25, 26, 27, 28, 29, 34, 35, 36, 38,
  ];
  for (const id of skipped) {
    const { fixture, show_info_abl } = abl_fixture({ abls: { [id]: 5 } });
    show_info_abl(7);
    assert.deepEqual(fixture.text_lines(), [], `ABL:${id} 在空洞里，不应出现`);
  }
  // 边界两侧：空洞的外沿（只挑性别中立的编号，22/23/33/34 由性别过滤另测）
  for (const id of [4, 10, 11, 17, 20, 30, 37, 39, 40]) {
    const { fixture, show_info_abl } = abl_fixture({ abls: { [id]: 5 } });
    show_info_abl(7);
    assert.equal(fixture.text_lines().length, 1, `ABL:${id} 不在空洞里，照出`);
  }
  // 41 是循环上界（FOR 0, 41），不出
  const { fixture, show_info_abl } = abl_fixture({ abls: { 41: 5 } });
  show_info_abl(7);
  assert.deepEqual(fixture.text_lines(), [], 'ABL:41 在循环上界之外');
});

test('SHOW_INFO_ABL：性别过滤（男无私处感觉/百合，女无断背）', () => {
  // [TALENT:122, TALENT:121, 能力编号, 是否出现, 说明]
  const cases = [
    [1, 0, 2, false, '男：私处感觉不出'],
    [1, 0, 22, false, '男：百合气质不出'],
    [1, 0, 33, false, '男：百合中毒不出'],
    [1, 0, 23, true, '男：断背气质照出'],
    [0, 0, 2, true, '女：私处感觉照出'],
    [0, 0, 23, false, '女：断背气质不出'],
    [0, 1, 2, true, '扶她是非男体：私处感觉照出'],
    [0, 1, 23, false, '扶她是非男体：断背气质不出'],
  ];
  for (const [man, futa, abl_id, shown, label] of cases) {
    const talents = {};
    if (man) talents[T.男人] = 1;
    if (futa) talents[121] = 1;
    const { fixture, show_info_abl } = abl_fixture({
      talents,
      abls: { [abl_id]: 2 },
    });
    show_info_abl(7);
    assert.equal(fixture.text_lines().length === 1, shown, label);
  }
});

test('SHOW_INFO_ABL：男体与扶她下阴蒂感觉（ABL:0）改名阴茎感觉', () => {
  const cases = [
    [{ [T.男人]: 1 }, '阴茎感觉', '男体'],
    [{ 121: 1 }, '阴茎感觉', '扶她'],
    [{}, ABL_NAMES.get(0), '女体用名字表里的名字'],
  ];
  for (const [talents, name, label] of cases) {
    const { fixture, show_info_abl } = abl_fixture({ talents, abls: { 0: 3 } });
    show_info_abl(7);
    assert.equal(fixture.text_lines()[0], abl_line(name, 3), label);
  }
});

test('SHOW_INFO_ABL：等级宽 2 左对齐（两位数不截断、一位数补 1 空格）', () => {
  const one = abl_fixture({ abls: { 12: 3 } });
  one.show_info_abl(7);
  assert.equal(
    one.fixture.text_lines()[0],
    '\u00A0\u00A0技巧\u00A0\u00A0\u00A0\u00A0 - LV3\u00A0\u00A0\u00A0',
  );

  const ten = abl_fixture({ abls: { 12: 12 } });
  ten.show_info_abl(7);
  assert.equal(
    ten.fixture.text_lines()[0],
    '\u00A0\u00A0技巧\u00A0\u00A0\u00A0\u00A0 - LV12\u00A0\u00A0',
  );
});

test('SHOW_INFO_MARK：黄金样本 train-upgrade 的四枚刻印行逐字复现', () => {
  // train-upgrade-log:159：四枚全 LV0，条是 3 格的 BAR（_replace.csv
  // 缺省字符 * 与 .，方括号由 BAR 命令加）
  const { fixture, show_info_mark } = abl_fixture();
  show_info_mark(7);
  assert.deepEqual(fixture.text_lines(), [
    '\u00A0苦痛:LV0 [...]\u00A0\u00A0\u00A0快乐:LV0 [...]\u00A0\u00A0\u00A0屈服:LV0 [...]\u00A0\u00A0\u00A0反抗:LV0 [...]',
  ]);
});

test('SHOW_INFO_MARK：等级取自 MARK:0-3，条的填充随等级变化', () => {
  // [MARK:0 的值, 期望条, 说明]
  const cases = [
    [0, '...', 'LV0：全空'],
    [1, '*..', 'LV1'],
    [2, '**.', 'LV2'],
    [3, '***', 'LV3：满'],
    [9, '***', '越界：夹到满格'],
    [-1, '...', '负值：夹到全空'],
  ];
  for (const [level, bar, label] of cases) {
    const { fixture, show_info_mark } = abl_fixture({ marks: { 0: level } });
    show_info_mark(7);
    assert(
      fixture.text_lines()[0].startsWith(`\u00A0苦痛:LV${level} [${bar}]`),
      `${label}（实际：${fixture.text_lines()[0]}）`,
    );
  }
});

test('SHOW_INFO_MARK：四枚刻印各自独立取值，顺序是 苦痛/快乐/屈服/反抗', () => {
  const { fixture, show_info_mark } = abl_fixture({
    marks: { 0: 1, 1: 2, 2: 3, 3: 0 },
    // 名字表里的名字与硬编码标签不同（苦痛刻印 vs 苦痛），行里用的是后者
  });
  show_info_mark(7);
  assert.equal(
    fixture.text_lines()[0],
    '\u00A0苦痛:LV1 [*..]\u00A0\u00A0\u00A0快乐:LV2 [**.]\u00A0\u00A0\u00A0屈服:LV3 [***]\u00A0\u00A0\u00A0反抗:LV0 [...]',
  );
});

test('BAR_TEXT：条长与最大值的边界（表驱动）', () => {
  const { bar_text } = abl_fixture();
  const cases = [
    [0, 3, 3, '[...]', '空'],
    [1, 3, 3, '[*..]', '三分之一（截断）'],
    [2, 3, 3, '[**.]', '三分之二'],
    [3, 3, 3, '[***]', '满'],
    [0, 0, 3, '[...]', '最大值 0：全空'],
    [5, 0, 3, '[...]', '最大值 0 且当前值非 0：仍全空'],
    [0, 5, 0, '[]', '格数 0'],
    [5, 5, 1, '[*]', '单格满'],
    [1, 100, 1, '[.]', '单格未满'],
  ];
  for (const [cur, max, len, expected, label] of cases) {
    assert.equal(bar_text(cur, max, len), expected, label);
  }
});

// —— @SHOW_APPEARACE / @SHOW_RING（:1209-1430） ——

function appearance_fixture({
  flag37 = 0,
  cflags = {},
  cstrs = {},
  talents = {},
  abls = {},
} = {}) {
  const fixture = create_era_fixture();
  fixture.store.set('flag:37', flag37);
  fixture.store.set('callname:7:-1', '考狄利亚');
  for (const [index, value] of Object.entries(cflags)) {
    fixture.store.set(`cflag:7:${index}`, value);
  }
  for (const [index, value] of Object.entries(cstrs)) {
    fixture.store.set(`cstr:7:${index}`, value);
  }
  for (const [index, value] of Object.entries(talents)) {
    fixture.store.set(`talent:7:${index}`, value);
  }
  for (const [index, value] of Object.entries(abls)) {
    fixture.store.set(`abl:7:${index}`, value);
  }
  return {
    fixture,
    ...fixture.load_module('page/components/chara-appearance'),
  };
}

test('SHOW_APPEARACE：六处刺青逐条按 CSTR:10-17 出现（表驱动）', () => {
  // [CSTR 下标, 标记文案, 期望行, 说明]；CSTR:11-13 受「上半身赤裸」守卫
  const cases = [
    [10, '脸纹', ' 脸上刻着『脸纹』样的刺青。', '脸部（段首，独立行）'],
    [11, '胸纹', ' 胸部上刻着『胸纹』样的刺青。', '胸部'],
    [12, '背纹', ' 背上刻着『背纹』样的刺青。', '背部'],
    [13, '腹纹', ' 下腹处刻着『腹纹』样的刺青。', '下腹'],
    [14, '臀纹', ' 屁股上刻着『臀纹』样的刺青。', '臀部'],
    [15, '器纹', ' 性器上刻着『器纹』样的刺青。', '性器'],
    [16, '肛纹', ' 肛门上刻着『肛纹』样的刺青。', '肛门'],
    [17, '腿纹', ' 大腿上刻着『腿纹』样的刺青。', '大腿'],
  ];
  for (const [index, mark, expected, label] of cases) {
    // CFLAG:40 位 1 关 + 非裙装：让 :1257/:1269 的两条提前 RETURN 不命中
    const { fixture, show_appearance } = appearance_fixture({
      cstrs: { [index]: mark },
      cflags: { 40: 0, 1: 1 },
    });
    show_appearance(7);
    assert(
      fixture.text_lines().includes(expected),
      `${label}（实际：${JSON.stringify(fixture.text_lines())}）`,
    );
    if (index >= 11 && index <= 13) {
      const blocked = appearance_fixture({
        cstrs: { [index]: mark },
        cflags: { 40: 2, 1: 1 }, // 上半身赤裸（位 1）
      });
      blocked.show_appearance(7);
      assert(
        !blocked.fixture.text_lines().includes(expected),
        `${label}：上半身赤裸时整段不出`,
      );
    }
  }
});

test('SHOW_APPEARACE：现着装行只在 FLAG:37 打开时出现', () => {
  // [FLAG:37, 是否出现, 说明]
  const cases = [
    [1, true, '服装系统打开'],
    [0, false, '服装系统关闭'],
  ];
  for (const [flag37, shown, label] of cases) {
    const { fixture, show_appearance } = appearance_fixture({
      flag37,
      cflags: { 40: 0, 1: 1 },
    });
    show_appearance(7);
    assert.equal(
      fixture.text_lines().some((t) => t.includes('现在的样子是')),
      shown,
      label,
    );
    if (shown) {
      assert.equal(
        fixture.text_lines()[0],
        ' 考狄利亚现在的样子是全裸。',
        '形状串来自 PRINT_CLOTHTYPE（全裸）',
      );
    }
  }
});

test('SHOW_APPEARACE：玩偶装（CFLAG:42 = 11 且位 64）提前收尾并 RETURN 1', () => {
  const { fixture, show_appearance } = appearance_fixture({
    cflags: { 40: 64, 42: 11, 1: 1 },
  });
  assert.equal(show_appearance(7), 1);
  assert.deepEqual(fixture.text_lines(), [' 貌似，里面是真空的。']);

  // CFLAG:40 还有别的位时不打那句话
  const other = appearance_fixture({ cflags: { 40: 64 | 8, 42: 11, 1: 1 } });
  assert.equal(other.show_appearance(7), 1);
  assert.deepEqual(other.fixture.text_lines(), []);
});

test('SHOW_APPEARACE：裙装未穿内裤的一句，与三条提前 RETURN 的守卫', () => {
  // CFLAG:40 位 8（裙装）+ 位 1 关 → 「貌似没穿内裤」
  const no_panties = appearance_fixture({ cflags: { 40: 8, 1: 0 } });
  no_panties.show_appearance(7);
  assert(no_panties.fixture.text_lines().includes(' 貌似没穿内裤。'));

  // :1257 CFLAG:40 & 17 → RETURN 0
  const hidden = appearance_fixture({ cflags: { 40: 16, 1: 1 } });
  assert.equal(hidden.show_appearance(7), 0);
  assert.deepEqual(hidden.fixture.text_lines(), []);

  // :1263 (CFLAG:40 & 64) && CFLAG:42 == 69 → RETURN 0
  const diaper = appearance_fixture({ cflags: { 40: 64, 42: 69, 1: 1 } });
  assert.equal(diaper.show_appearance(7), 0);
  assert.deepEqual(diaper.fixture.text_lines(), []);

  // :1269 裙装且 顺从+露出度 < 3 → RETURN 0（「没穿内裤」那句已在守卫之前打出）
  const skirt_shy = appearance_fixture({
    cflags: { 40: 8, 1: 0 },
    abls: { 10: 1, 17: 1 },
  });
  assert.equal(skirt_shy.show_appearance(7), 0);
  assert.deepEqual(skirt_shy.fixture.text_lines(), [' 貌似没穿内裤。']);
  // 恰好 3 时不拦（ABL:10 + ABL:17 = 3）
  const enough = appearance_fixture({
    cflags: { 40: 8, 1: 0 },
    abls: { 10: 1, 17: 2 },
  });
  assert.equal(
    enough.show_appearance(7),
    0,
    '仍可能在别的守卫上返回，但没被这一条拦',
  );
  assert(
    enough.fixture.text_lines().some((t) => t.includes('考狄利亚')),
    '和恰好为 3 时越过 :1269 的守卫（阴毛段的名字打出来了）',
  );
});

test('SHOW_APPEARACE：阴毛七档 + 白虎（TALENT:125）优先级', () => {
  // [TALENT:310, 期望片段, 说明]；TALENT:125 不设
  const cases = [
    [1, '的性器完全没有长毛。', '第一档（= 1）'],
    [2, '的阴部覆盖着刚刚长出的阴毛。', '2-20 下沿'],
    [20, '的阴部覆盖着刚刚长出的阴毛。', '2-20 上沿'],
    [21, '的阴部覆盖着薄薄的阴毛。', '21 落下一档'],
    [50, '的阴部覆盖着薄薄的阴毛。', '21-50 上沿'],
    [51, '的耻丘长着整齐的阴毛。', '51 落下一档'],
    [100, '的耻丘长着整齐的阴毛。', '51-100 上沿'],
    [101, '的股间长着茂盛的阴毛。', '101 落下一档'],
    [200, '的股间长着茂盛的阴毛。', '101-200 上沿'],
    [201, '从阴阜到肛门都被茂密的阴毛所覆盖。', '201+'],
  ];
  for (const [hair, fragment, label] of cases) {
    const { fixture, show_appearance } = appearance_fixture({
      cflags: { 40: 0, 1: 1 },
      talents: { 310: hair },
    });
    show_appearance(7);
    assert(
      fixture.text_lines().some((t) => t.endsWith(fragment)),
      `${label}（实际：${JSON.stringify(fixture.text_lines())}）`,
    );
  }

  // 白虎（125）优先于 310 的任意档
  const bald = appearance_fixture({
    cflags: { 40: 0, 1: 1 },
    talents: { 125: 1, 310: 201 },
  });
  bald.show_appearance(7);
  assert(
    bald.fixture.text_lines().some((t) => t.endsWith('露出了永久脱毛的阴部。')),
  );
});

test('SHOW_APPEARACE：TALENT:310 为 0 时行不收（原作自身的显示缺陷，1:1）', () => {
  const { fixture, show_appearance } = appearance_fixture({
    cflags: { 40: 0, 1: 1 },
  });
  show_appearance(7);
  // 行在出口处被收掉（ere 侧的收尾，见实现注释），内容是「空格 + 名字」
  assert.deepEqual(fixture.text_lines(), [' 考狄利亚']);
});

test('SHOW_APPEARACE：穿环的位序、间隔与收尾用语（S 计数）', () => {
  // [CFLAG:7, 期望行尾, 期望间隔, 说明]
  // 阴毛那行收行后穿环另起一行，行首没有名字（源的两条 PRINTL 之间无名字）
  const cases = [
    [8, ' 阴蒂被穿环了。', 'S == 1：单数用语'],
    [8 | 64, ' 阴蒂、鼻子都被穿环了。', 'S == 2：复数用语'],
    [
      8 | 64 | 32 | 4 | 2 | 16,
      ' 阴蒂、鼻子、嘴唇、阴唇、肚脐、舌头都被穿环了。',
      'S == 6',
    ],
    [8 | 64 | 1, ' 阴蒂、鼻子、乳头都被穿环了。', '乳头位（bit 1）'],
  ];
  for (const [piercing, expected, label] of cases) {
    const { fixture, show_appearance } = appearance_fixture({
      cflags: { 40: 0, 1: 1, 7: piercing },
      talents: { 310: 1 },
    });
    show_appearance(7);
    assert.equal(fixture.text_lines().at(-1), expected, label);
  }
});

test('SHOW_APPEARACE：生殖器那枚穿环按性别取名（阴茎/阴蒂）', () => {
  const cases = [
    [{}, ' 阴蒂被穿环了。', '女体：阴蒂'],
    [{ [T.男人]: 1 }, ' 阴茎被穿环了。', '男体：阴茎'],
    [{ 121: 1 }, ' 阴茎被穿环了。', '扶她：阴茎'],
  ];
  for (const [talents, expected, label] of cases) {
    const { fixture, show_appearance } = appearance_fixture({
      cflags: { 40: 0, 1: 1, 7: 8 },
      talents: { ...talents, 310: 1 },
    });
    show_appearance(7);
    assert.equal(fixture.text_lines().at(-1), expected, label);
  }
});

test('SHOW_APPEARACE：乳头穿环在上半身赤裸（CFLAG:40 & 6）时不显示', () => {
  const covered = appearance_fixture({
    cflags: { 40: 0, 1: 1, 7: 1 },
    talents: { 310: 1 },
  });
  covered.show_appearance(7);
  assert(covered.fixture.text_lines().at(-1).includes('乳头'));

  const naked = appearance_fixture({
    cflags: { 40: 2, 1: 1, 7: 1 },
    talents: { 310: 1 },
  });
  naked.show_appearance(7);
  assert(
    !naked.fixture.text_lines().some((t) => t.includes('乳头')),
    '上半身赤裸时乳头那枚整段跳过',
  );
});

test('SHOW_APPEARACE：掀起下摆段（裙装 + 顺从露出度达标）', () => {
  const { fixture, show_appearance } = appearance_fixture({
    cflags: { 40: 8, 1: 1 },
    abls: { 10: 2, 17: 2 },
    talents: { 310: 1 },
  });
  show_appearance(7);
  const line = fixture.text_lines().find((t) => t.includes('掀起'));
  assert(line !== undefined, '掀起段出现');
  assert(line.includes('的下摆，'), '下摆串来自 PRINT_CLOTHTYPE_MAIN2');
});

test('SHOW_RING：三个装备位的空手/无与装备名（表驱动）', () => {
  // [CFLAG:550, CFLAG:551, CFLAG:552, 期望行, 说明]
  const cases = [
    [-1, -1, -1, ' 【武器】: 空手　 【装饰A】: 无　 【装饰B】: 无', '三空位'],
    [0, -1, -1, ' 【武器】: 剑　 【装饰A】: 无　 【装饰B】: 无', '武器位 0 号'],
  ];
  for (const [weapon, ring_a, ring_b, expected, label] of cases) {
    const { fixture, show_ring } = appearance_fixture({
      cflags: { 550: weapon, 551: ring_a, 552: ring_b },
    });
    show_ring(7);
    assert.equal(fixture.text_lines().at(-1), expected, label);
  }
});

test('SHOW_RING：装饰B 有装备时行尾补一个半角空格', () => {
  const { fixture, show_ring } = appearance_fixture({
    cflags: { 550: -1, 551: -1, 552: 0 },
  });
  show_ring(7);
  assert(
    fixture.text_lines().at(-1).endsWith(' 【装饰B】: 装饰戒指 '),
    '非空位走 equip_ring_spans，尾部补空格（源 :1427 PRINTL 两个空格减分隔符）',
  );
});

// —— @STAIN_INFO（:1435-1556） ——

function stain_fixture({
  flag_target = 0,
  flag_assi = 0,
  stains = {},
  talents = {},
} = {}) {
  const fixture = create_era_fixture();
  fixture.store.set('callname:0:-1', '魔王');
  fixture.store.set('callname:7:-1', '考狄利亚');
  fixture.store.set('flag:10012', flag_target);
  fixture.store.set('flag:10013', flag_assi);
  fixture.store.set('flag:10006', flag_assi); // era_flag.assi 的底层键
  // stain 属调教域的表（夹具镜像引擎「beginTrain 才可寻址」，见 era-fixture.js:494）
  fixture.era.beginTrain(0, 1, 2);
  for (const [key, value] of Object.entries(stains)) {
    fixture.store.set(key, value);
  }
  for (const [key, value] of Object.entries(talents)) {
    fixture.store.set(key, value);
  }
  const era_flag = fixture.load_module('era-utils/era-flag');
  return {
    fixture,
    era_flag,
    stain_info: fixture.load_module('page/components/stain-info').stain_info,
  };
}

test('STAIN_INFO：主人/对象/助手三方各五行（无扶她男人时跳过阴茎位）', async () => {
  const { fixture, stain_info } = stain_fixture();
  await stain_info();
  const lines = fixture.text_lines();
  assert.equal(lines.length, 15, '3 方 × 5 行（部位 2 跳过）');
  assert(lines[0].startsWith('魔王'), '第一方是主人（NAME:MASTER）');
});

test('STAIN_INFO：污渍位逐条落标记、顺序固定（表驱动）', async () => {
  // [STAIN 位, 期望标记, 说明]
  const cases = [
    [1, '<爱液>', '位 1'],
    [2, '<前液>', '位 2'],
    [4, '<精液>', '位 4'],
    [8, '<肠液>', '位 8'],
    [16, '<乳汁>', '位 16'],
    [32, '<尿液>', '位 32'],
  ];
  for (const [bit, mark, label] of cases) {
    const { fixture, stain_info } = stain_fixture({
      stains: { 'stain:0:0': bit },
    });
    await stain_info();
    assert.equal(fixture.text_lines()[0], `魔王的嘴巴：${mark}`, label);
  }
  // 多个位按固定顺序串起来
  const { fixture, stain_info } = stain_fixture({
    stains: { 'stain:0:0': 1 | 4 | 32 },
  });
  await stain_info();
  assert.equal(fixture.text_lines()[0], '魔王的嘴巴：<爱液><精液><尿液>');
});

test('STAIN_INFO：部位名六档与三方的跳过规则（扶她/男人）', async () => {
  const { fixture, stain_info } = stain_fixture({
    flag_target: 0,
    flag_assi: 0,
  });
  await stain_info();
  const lines = fixture.text_lines();
  assert.equal(lines[0], '魔王的嘴巴：');
  assert.equal(lines[1], '魔王的双手：');
  assert.equal(lines[2], '魔王的私处：', '双方都非男人：阴茎位被跳过');
  assert.equal(lines[3], '魔王的肛门：');
  assert.equal(lines[4], '魔王的乳房：');

  // 男人：私处位与乳房位都不出
  const man = stain_fixture({ talents: { 'talent:0:122': 1 } });
  await man.stain_info();
  const man_lines = man.fixture.text_lines();
  assert(
    !man_lines.some((t) => t.includes('的私处：') || t.includes('的乳房：')),
    '男人不出私处/乳房',
  );
  assert(
    man_lines.some((t) => t.includes('的阴茎：')),
    '男人出阴茎位',
  );

  // 扶她：阴茎位出，私处/乳房也出
  const futa = stain_fixture({ talents: { 'talent:0:121': 1 } });
  await futa.stain_info();
  const futa_lines = futa.fixture.text_lines();
  assert(
    futa_lines.some((t) => t.includes('的阴茎：')),
    '扶她出阴茎位',
  );
  assert(
    futa_lines.some((t) => t.includes('的私处：')),
    '扶她出私处位',
  );
});

test('STAIN_INFO：换手把第二方换成 flag:10012，尾部换回', async () => {
  const { fixture, era_flag, stain_info } = stain_fixture({ flag_target: 7 });
  assert.equal(era_flag.target, 0, '进入前 TARGET 未设 → 0');
  await stain_info();
  const lines = fixture.text_lines();
  assert(
    lines.some((t) => t.startsWith('考狄利亚')),
    '第二方用 TARGET:1（flag:10012 = 7）的存档名',
  );
  assert.equal(era_flag.target, 0, '退出后换回');
  assert.equal(era_flag.target_record, 7, '退出后 TARGET:1 换回');
});

test('STAIN_INFO：ASSI < 0 时第三方整段跳过，末尾等一次键', async () => {
  const { fixture, era_flag, stain_info } = stain_fixture({ flag_assi: -1 });
  era_flag.assi = -1; // 助手槽（flag:10006）
  await stain_info();
  assert.equal(fixture.text_lines().length, 10, '两方 × 5 行');
  assert.equal(fixture.waits.length, 1, 'WAIT 一次');
  assert.equal(fixture.waits[0].waited, true);
  assert.equal(era_flag.assi, -1, '退出后助手的换手也复原');
});

test('STAIN_INFO：ASSI >= 0 时第三方照出（0 也算一方）', async () => {
  const { fixture, stain_info } = stain_fixture();
  await stain_info();
  assert.equal(fixture.text_lines().length, 15, '三方 × 5 行');
});

// —— @SHOW_EQUIP_1 / @SHOW_EQUIP_2（:1564-1676） ——

function equip_fixture({ tequips = {}, cflags = {}, tflags = {} } = {}) {
  const fixture = create_era_fixture();
  fixture.store.set('callname:7:-1', '考狄利亚');
  fixture.era.beginTrain(7);
  for (const [index, value] of Object.entries(tequips)) {
    fixture.store.set(`tequip:7:${index}`, value);
  }
  for (const [index, value] of Object.entries(cflags)) {
    fixture.store.set(`cflag:7:${index}`, value);
  }
  for (const [index, value] of Object.entries(tflags)) {
    fixture.store.set(`tflag:${index}`, value);
  }
  return {
    fixture,
    ...fixture.load_module('page/components/chara-equip-status'),
  };
}

/** 粉色片段（整段的着色判据） */
const PINK = '#ff1493';

test('SHOW_EQUIP_2：九个位的标记与顺序（表驱动）', () => {
  // [TEQUIP 位, 期望片段, 说明]
  const cases = [
    [54, '[野外PLAY中]', '野外'],
    [57, '[羞耻（大镜子）PLAY中]', '大镜子'],
    [58, '[浴室PLAY中]', '浴室'],
    [59, '[新妻PLAY中]', '新妻'],
    [89, '[兽奸PLAY中]', '兽奸'],
    [90, '[触手召唤中]', '触手'],
    [55, '[死斗场决斗中]', '死斗场'],
  ];
  for (const [bit, fragment, label] of cases) {
    const { fixture, show_equip_2 } = equip_fixture({ tequips: { [bit]: 1 } });
    show_equip_2(7);
    const line = fixture.text_lines().at(-1);
    assert(line.includes(fragment), `${label}（实际：${line}）`);
    assert(line.startsWith(' '), '每段前有一个前导空格');
    assert(
      fixture.lines.at(-1).content.every((f) => f.color === PINK),
      `${label}：整行粉色（SETCOLOR 0xff1493）`,
    );
  }
});

test('SHOW_EQUIP_2：摄影位的剩余次数公式 10 + 4*499 - 491 + 1', () => {
  // [CFLAG:499, CFLAG:491, 期望, 说明]
  const cases = [
    [0, 0, 11, '两个都未设'],
    [3, 0, 23, '4 * 3 + 11'],
    [3, 5, 18, '减掉已拍张数'],
    [1, 100, -85, '不减到 0（公式原样：10 + 4 − 100 + 1）'],
  ];
  for (const [c499, c491, expected, label] of cases) {
    const { fixture, show_equip_2 } = equip_fixture({
      tequips: { 53: 1 },
      cflags: { 499: c499, 491: c491 },
    });
    show_equip_2(7);
    assert(
      fixture.text_lines().at(-1).includes(`[摄影中(剩${expected}次)]`),
      `${label}（实际：${fixture.text_lines().at(-1)}）`,
    );
  }
});

test('SHOW_EQUIP_2：使役魔兽的名字取自 E:300，位关时整行只有一个空格', () => {
  const on = equip_fixture({ tequips: { 88: 1 } });
  on.fixture.store.set('e:300', 3);
  on.fixture.store.set('itemname:3', '史莱姆');
  on.show_equip_2(7);
  assert(
    on.fixture.text_lines().at(-1).includes('[使役魔兽PLAY中（史莱姆）]'),
    '名字嵌在括号里',
  );

  const off = equip_fixture();
  off.show_equip_2(7);
  assert.deepEqual(off.fixture.text_lines(), [' '], '无位命中：只打一个空格');
});

test('SHOW_EQUIP_1：十八个位与两个 TFLAG 是整段的守卫（表驱动）', () => {
  // [键, 值, 是否出整段, 说明]
  const cases = [
    [{ tequips: { 11: 1 } }, true, 'TEQUIP:11'],
    [{ tequips: { 98: 1 } }, true, 'TEQUIP:98'],
    [{ tflags: { 60: 1 } }, true, 'TFLAG:60'],
    [{ tflags: { 899: 1 } }, true, 'TFLAG:899'],
    [{ tequips: { 12: 1 } }, false, 'TEQUIP:12 不在守卫名单里'],
    [{ tequips: {} }, false, '全空'],
  ];
  for (const [setup, shown, label] of cases) {
    const { fixture, show_equip_1 } = equip_fixture(setup);
    show_equip_1(7);
    assert.equal(fixture.text_lines().length > 0, shown, label);
  }
});

test('SHOW_EQUIP_1：头行是默认色、其后整段粉色', () => {
  const { fixture, show_equip_1 } = equip_fixture({
    tequips: { 11: 1 },
    tflags: { 60: 1 },
  });
  show_equip_1(7);
  const fragments = fixture.lines.at(-1).content;
  assert.equal(fragments[0].content, '使用中(考狄利亚) ');
  assert.equal(fragments[0].color, undefined, '头行在 SETCOLOR 之前');
  assert(fragments[1].content.includes('[蠕虫]'));
  assert.equal(fragments[1].color, PINK);
});

test('SHOW_EQUIP_1：八个位的触手形态优先于常态形态', () => {
  // [位, 无触手时, 有触手时]
  const cases = [
    [11, '[蠕虫]', '[触手插入]'],
    [13, '[肛门虫]', '[触手肛门插入]'],
    [14, '[阴蒂夹]', '[触手蹂躏阴蒂]'],
    [15, '[乳头夹]', '[触手蹂躏乳头]'],
    [16, '[榨乳器]', '[触手榨乳]'],
    [17, '[飞机杯]', '[触手蹂躏阴茎]'],
    [44, '[绳子束缚]', '[触手束缚]'],
    [46, '[灌肠＋肛门塞]', '[触手灌肠]'],
  ];
  for (const [bit, normal, tentacle] of cases) {
    const plain = equip_fixture({ tequips: { [bit]: 1 } });
    plain.show_equip_1(7);
    assert(
      plain.fixture.text_lines().at(-1).includes(normal),
      `位 ${bit} 常态`,
    );

    const with90 = equip_fixture({ tequips: { [bit]: 1, 90: 1 } });
    with90.show_equip_1(7);
    const line = with90.fixture.text_lines().at(-1);
    assert(line.includes(tentacle), `位 ${bit} 触手形态（实际：${line}）`);
    assert(!line.includes(normal), `位 ${bit}：触手形态时不打常态名`);
  }
});

test('SHOW_EQUIP_1：单形态的八个位与插入中/失神中', () => {
  const singles = [
    [98, '[触手口辱]'],
    [43, '[眼罩]'],
    [45, '[口塞]'],
    [18, '[淋浴]'],
    [19, '[肛珠]'],
    [49, '[肛门电极]'],
    [21, '[媚药效果发挥中]'],
    [22, '[利尿剂效果发挥中]'],
  ];
  for (const [bit, fragment] of singles) {
    const { fixture, show_equip_1 } = equip_fixture({ tequips: { [bit]: 1 } });
    show_equip_1(7);
    assert(fixture.text_lines().at(-1).includes(fragment), `位 ${bit}`);
  }
});

test('SHOW_EQUIP_1：[插入中] 只在 TFLAG:60 == 1 且上次指令不是 56 时出', () => {
  // [TFLAG:60, PREVCOM, 是否出, 说明]
  const cases = [
    [1, 55, true, 'TFLAG:60 恰为 1'],
    [2, 55, false, 'TFLAG:60 >= 2 不算（判据是 == 1）'],
    [1, 56, false, '上次指令 56（不显示）'],
  ];
  for (const [t60, prevcom, shown, label] of cases) {
    const { fixture, show_equip_1 } = equip_fixture({ tflags: { 60: t60 } });
    fixture.load_module('era-utils/era-flag').prevcom = prevcom;
    show_equip_1(7);
    assert.equal(
      fixture.text_lines().at(-1).includes('[插入中]'),
      shown,
      label,
    );
  }
});

test('SHOW_EQUIP_1：失神中的判据是 TFLAG:899 >= 1', () => {
  const one = equip_fixture({ tflags: { 899: 1 } });
  one.show_equip_1(7);
  assert(one.fixture.text_lines().at(-1).includes('[失神中]'));

  const zero = equip_fixture({ tflags: { 899: 0 } });
  zero.show_equip_1(7);
  assert.deepEqual(zero.fixture.text_lines(), [], 'TFLAG:899 = 0 时整段不出');
});

// —— @SHOW_DATA（:1681-1760） ——

function data_fixture({ cflags = {}, ex_talents = {}, items = {} } = {}) {
  const fixture = create_era_fixture();
  fixture.store.set('callname:0:-1', '魔王');
  fixture.store.set('callname:7:-1', '考狄利亚');
  for (const [index, value] of Object.entries(cflags)) {
    fixture.store.set(`cflag:7:${index}`, value);
  }
  for (const [index, value] of Object.entries(ex_talents)) {
    fixture.store.set(`ex_talent:7:${index}`, value);
  }
  for (const [index, value] of Object.entries(items)) {
    fixture.store.set(`itemname:${index}`, value);
  }
  fixture.era.beginTrain(7); // e: 与 tflag 同属调教域的表
  return { fixture, ...fixture.load_module('page/components/chara-data') };
}

test('SHOW_DATA：无色段与底色——使役魔兽的名字着 #63e390', () => {
  // CFLAG:570 是配下怪物的识别号；< 100 时 MONSTER_DATA（:384 的
  // `if (inum < 100) { E:300 = 0; return 0 }`）会把 E:300 清成 0，
  // 于是名字取 0 号怪物的名字——这一步也一并钉住。
  const { fixture, show_data } = data_fixture({
    cflags: { 570: 3 },
    items: { 0: '史莱姆' },
  });
  show_data(7, () => 0);
  const line = fixture.lines.at(-1);
  const colored = line.content.filter((f) => f.color !== undefined);
  assert.equal(colored.length, 1, '只有使役魔兽的名字带色');
  assert.equal(colored[0].color, '#63e390');
  assert.equal(colored[0].content, '史莱姆');
});

test('SHOW_DATA：凌辱隶属/畏惧按 CFLAG:131 > 5 分档，且都要求 CFLAG:130 > 0', () => {
  // [CFLAG:130, CFLAG:131, 期望片段, 说明]
  const cases = [
    [0, 9, null, 'CFLAG:130 = 0：整段不出'],
    [3, 6, '[凌辱隶属:', 'CFLAG:131 = 6 > 5'],
    [3, 5, '[凌辱畏惧:', 'CFLAG:131 = 5 不算 > 5'],
    [3, 0, '[凌辱畏惧:', 'CFLAG:131 未设'],
  ];
  for (const [c130, c131, fragment, label] of cases) {
    const { fixture, show_data } = data_fixture({
      cflags: { 130: c130, 131: c131 },
    });
    show_data(7, () => 0);
    const text = fixture.text_lines().at(-1);
    assert.equal(
      fragment === null ? !text.includes('凌辱') : text.includes(fragment),
      true,
      `${label}（实际：${text}）`,
    );
  }
});

test('SHOW_DATA：结婚对象的六个分支（表驱动）', () => {
  // [CFLAG:601, CFLAG:606, 期望片段, 说明]
  const cases = [
    [900, 0, '[结婚对象:野狗]', '野狗'],
    [901, 0, '[结婚对象:魔王]', '魔王（SAVESTR:MASTER）'],
    [
      902,
      1,
      `[结婚对象:${'温柔的青年'.padEnd(14, '　')}]`,
      '恋人档：查 LOVER_NAMES',
    ],
    [
      0,
      0,
      '[结婚对象:无]',
      '未婚走 GET_LOOK_INFO 的婚史（当前实现返回「无」）',
    ],
    [13, 0, '[结婚对象:装饰戒指]', '末位非 9：查 ITEMNAME'],
  ];
  for (const [c601, c606, fragment, label] of cases) {
    const { fixture, show_data } = data_fixture({
      cflags: { 601: c601, 606: c606 },
      items: { 13: '装饰戒指' },
    });
    show_data(7, () => 0);
    const text = fixture.text_lines().at(-1);
    assert(text.includes(fragment), `${label}（实际：${text}）`);
  }
});

test('SHOW_DATA：未婚时按 EX_TALENT:2 分叉（有后代标记 → 无，否则查婚史）', () => {
  const with_child = data_fixture({ ex_talents: { 2: 1 } });
  with_child.show_data(7, () => 0);
  assert(with_child.fixture.text_lines().at(-1).includes('[结婚对象:无]'));

  const no_child = data_fixture();
  no_child.show_data(7, () => 0);
  const history = no_child.fixture
    .load_module('chara/look-info')
    .get_look_info(7, '婚史');
  assert(
    no_child.fixture.text_lines().at(-1).includes(`[结婚对象:${history}]`),
    `无后代标记时走婚史（当前值 ${history}）`,
  );
});

test('SHOW_DATA：善恶值七档（表驱动全维度）', () => {
  // [CFLAG:151, 期望档, 说明]
  const cases = [
    [200, '纯洁', '> 150'],
    [151, '纯洁', '下沿 +1'],
    [150, '正义', '150 不进纯洁档'],
    [101, '正义', '下沿'],
    [100, '秩序', '100 不进正义档'],
    [51, '秩序', '下沿'],
    [50, '中立', '50 不进秩序档'],
    [-49, '中立', '下沿'],
    [-50, '混沌', '−50 不进中立档'],
    [-99, '混沌', '下沿'],
    [-100, '堕落', '−100 不进混沌档'],
    [-149, '堕落', '下沿'],
    [-150, '邪恶', '−150 不进堕落档'],
  ];
  for (const [karma, band, label] of cases) {
    const { fixture, show_data } = data_fixture({ cflags: { 151: karma } });
    show_data(7, () => 0);
    const text = fixture.text_lines().at(-1);
    assert(
      text.includes(`[善恶值:${karma}|${band}]`),
      `${label}（实际：${text}）`,
    );
  }
});

test('SHOW_DATA：整行以「]　」（全角空格）收尾', () => {
  const { fixture, show_data } = data_fixture();
  show_data(7, () => 0);
  assert(fixture.text_lines().at(-1).endsWith(']　'));
});

// —— SHOW_TALENT_CONDITION 族（CHARA_INFO_SHOW_TALENT.ERB） ——

function condition_fixture({
  cflags = {},
  talents = {},
  flags = {},
  abls = {},
  exps = {},
  marks = {},
} = {}) {
  const fixture = create_era_fixture();
  for (const [table, file] of [
    ['talent', 'Talent.yml'],
    ['abl', 'Abl.yml'],
    ['mark', 'Mark.yml'],
    ['exp', 'Exp.yml'],
  ]) {
    for (const [id, name] of parse_yml_ids(file)) {
      fixture.store.set(`${table}name:${id}`, name);
    }
  }
  for (const [index, value] of Object.entries(cflags)) {
    fixture.store.set(`cflag:7:${index}`, value);
  }
  for (const [index, value] of Object.entries(talents)) {
    fixture.store.set(`talent:7:${index}`, value);
  }
  for (const [index, value] of Object.entries(flags)) {
    fixture.store.set(`flag:${index}`, value);
  }
  for (const [index, value] of Object.entries(abls)) {
    fixture.store.set(`abl:7:${index}`, value);
  }
  for (const [index, value] of Object.entries(exps)) {
    fixture.store.set(`exp:7:${index}`, value);
  }
  for (const [index, value] of Object.entries(marks)) {
    fixture.store.set(`mark:7:${index}`, value);
  }
  return {
    fixture,
    ...fixture.load_module('page/page-chara-talent-condition'),
  };
}

test('SHOW_TALENT_CONDITION：黄金样本 daycycle-max 的 20 行逐字复现', () => {
  // daycycle-max-log:203-222（20 行）。样本里的勇者考狄利亚四枚性感素质全未得
  // （74/75/77/78），故四处封面图那一臂都不进；助手条件行也不在（无 76/85）。
  // 坐「喜欢精液」行的饮精绝顶基准是 50（SEIIN_BASE 无修正），样本记 51 是因为
  // 那位勇者带着 戒备森严(+5) / 乐观的(−2) / 开放(−2) 三枚素质——那条公式的
  // 组合覆盖在 STC_SEIIN_CHECK 的用例里（黄金组合单独一条）。
  // 唯一与样本的差异在末行行尾：样本记的 `[反抗刻印]` 没有 STC_PRINTC 补的
  // 两个空格，源里 :405-406 的 CALL 与 PRINTL 之间没有任何东西会吃掉它，
  // 判定为录制侧的截断（比对工具的分类路径不看行尾空白），实现按源保留。
  const { fixture, show_talent_condition } = condition_fixture();
  show_talent_condition(7);
  assert.deepEqual(fixture.text_lines(), [
    '爱慕条件： [好感度 100%]\u00A0\u00A0[顺从\u00A0\u00A0 Lv3]\u00A0\u00A0\u00A0[侍奉精神 Lv3]\u00A0[屈服刻印 Lv3]\u00A0[侍奉快乐\u00A0200]\u00A0[反抗刻印]\u00A0\u00A0',
    '淫乱条件： [好感度 100%]\u00A0\u00A0[欲望\u00A0\u00A0 Lv3]\u00A0\u00A0\u00A0[四点感觉Lv10]\u00A0[快乐刻印 Lv3]\u00A0[屈服刻印 Lv3]\u00A0[异常经验\u00A0\u00A0\u00A03]\u00A0[反抗刻印]\u00A0\u00A0',
    '擅用舌头： [技巧\u00A0\u00A0 Lv5]\u00A0\u00A0\u00A0[侍奉技术 Lv5]\u00A0[口交经验1000]\u00A0',
    '施虐狂\u00A0\u00A0： [抖S气质 Lv4]\u00A0\u00A0[技巧\u00A0\u00A0 Lv4]\u00A0\u00A0\u00A0[施虐快乐\u00A0300]\u00A0',
    '受虐狂\u00A0\u00A0： [抖M气质 Lv4]\u00A0\u00A0[露出癖 Lv2]\u00A0\u00A0\u00A0[被虐快乐\u00A0300]\u00A0',
    '露出狂\u00A0\u00A0： [露出癖 Lv4]\u00A0\u00A0\u00A0[抖M气质 Lv2]\u00A0\u00A0[调教自慰|放尿经验|喷奶经验\u00A0200]',
    '牝犬条件： [欲望\u00A0\u00A0 Lv5]\u00A0\u00A0\u00A0[兽奸中毒 Lv3]\u00A0[兽奸经验\u00A0300]\u00A0',
    '自慰狂\u00A0\u00A0： [阴蒂感觉 Lv4]\u00A0[调教自慰\u00A0100]\u00A0[绝顶经验\u00A0100]\u00A0',
    '弄乳狂\u00A0\u00A0： [乳房感觉 Lv4]\u00A0[喷奶经验\u00A0100]\u00A0[绝顶经验\u00A0100]\u00A0',
    '性爱狂\u00A0\u00A0： [私处感觉 Lv4]\u00A0[私处经验\u00A0300]\u00A0[绝顶经验\u00A0100]\u00A0',
    '尻穴狂\u00A0\u00A0： [肛门感觉 Lv4]\u00A0[肛门快乐\u00A0300]\u00A0[绝顶经验\u00A0100]\u00A0',
    '淫核条件： [阴蒂感觉 Lv5]\u00A0[调教自慰\u00A0100]\u00A0[绝顶经验\u00A0300]\u00A0',
    '淫乳条件： [乳房感觉 Lv5]\u00A0[喷奶经验\u00A0100]\u00A0[绝顶经验\u00A0300]\u00A0',
    '淫壶条件： [私处感觉 Lv5]\u00A0[私处经验\u00A0300]\u00A0[绝顶经验\u00A0300]\u00A0',
    '淫肛条件： [肛门感觉 Lv5]\u00A0[肛门快乐\u00A0300]\u00A0[绝顶经验\u00A0300]\u00A0',
    '性豪条件： [淫核素质]\u00A0\u00A0[淫乳素质]\u00A0\u00A0[淫壶素质]\u00A0\u00A0[淫肛素质]\u00A0\u00A0',
    '时常发情： [润滑积蓄 700]\u00A0[欲情积蓄2250]\u00A0',
    '喜欢精液： [饮精绝顶\u00A0\u00A050]',
    '妓女条件： [技巧\u00A0\u00A0 Lv1]\u00A0\u00A0\u00A0[欲望\u00A0\u00A0 Lv2]\u00A0\u00A0\u00A0[卖淫经验\u00A0100]\u00A0[反抗刻印]\u00A0\u00A0',
    '盲从条件： 【[爱慕素质]\u00A0\u00A0[勋章经验\u00A0\u00A0\u00A05]\u00A0[顺从\u00A0\u00A0 Lv4]\u00A0\u00A0\u00A0】【[淫乱素质]\u00A0\u00A0[勋章经验\u00A0\u00A010]\u00A0[顺从\u00A0\u00A0 Lv5]\u00A0\u00A0\u00A0】[反抗刻印]\u00A0\u00A0',
  ]);
});

test('STC_PRINTC：补位长度按 Shift-JIS 字节算（含方括号）', () => {
  const { stc_printc } = condition_fixture();
  const row = { fragments: [] };
  // [文本, 期望总字节, 说明]
  const cases = [
    ['[好感度 100%]', 15, '13 字节 → 补 2'],
    ['[顺从   Lv3]', 15, '12 字节 → 补 3'],
    ['[侍奉精神 Lv3]', 15, '14 字节 → 补 1'],
    ['[反抗刻印]', 12, '10 字节补到 12（width = 12）'],
  ];
  for (const [text, width, label] of cases) {
    const target = { fragments: [] };
    stc_printc(target, text, undefined, width === 12 ? 12 : 15);
    const joined = target.fragments.map((f) => f.content).join('');
    assert.equal(
      require('#/utils/display-width').display_width(joined),
      width,
      label,
    );
    assert(joined.startsWith(text), label);
  }
  assert(row.fragments.length === 0);
});

test('SHOW_TALENT_CONDITION：助手条件行只在有 爱慕 或 淫乱 时出现', () => {
  // [已设素质, 是否出行, 说明]
  const cases = [
    [{}, false, '两者皆无'],
    [{ 76: 1 }, true, '有淫乱'],
    [{ 85: 1 }, true, '有爱慕'],
  ];
  for (const [talents, shown, label] of cases) {
    const { fixture, show_talent_condition } = condition_fixture({ talents });
    show_talent_condition(7);
    assert.equal(
      fixture.text_lines().some((t) => t.startsWith('助手条件：')),
      shown,
      label,
    );
  }
});

test('SHOW_TALENT_CONDITION：性感素质的四档需求随已得数上浮（表驱动）', () => {
  // [已得数, 自慰狂档的「调教自慰」需求（sexskill_1）, 「绝顶经验」需求（sexskill_2）, 说明]
  const cases = [
    [0, 100, 100, '一枚都没有：基础档'],
    [1, 150, 110, '100 + 50 * 1 / 100 + 10 * 1'],
    [2, 200, 120, '100 + 50 * 2 / 100 + 10 * 2'],
    [3, 250, 130, '100 + 50 * 3 / 100 + 10 * 3'],
  ];
  for (const [count, need, need2, label] of cases) {
    const talents = {};
    // 只点 75/77/78 三枚：自慰狂（74）自身保持未得，走条件臂而不是封面图臂
    const ids = [75, 77, 78];
    for (let i = 0; i < Math.min(count, ids.length); i += 1)
      talents[ids[i]] = 1;
    const { fixture, show_talent_condition } = condition_fixture({ talents });
    show_talent_condition(7);
    const line = fixture.text_lines().find((t) => t.startsWith('自慰狂'));
    assert(
      line.includes(`[调教自慰${String(need).padStart(4, '\u00A0')}]`),
      `${label} 第一档（实际：${line}）`,
    );
    assert(
      line.includes(`[绝顶经验${String(need2).padStart(4, '\u00A0')}]`),
      `${label} 第二档（实际：${line}）`,
    );
  }
});

test('SHOW_TALENT_CONDITION：四枚性感素质全得 → 四处 COVER_WHITE', () => {
  const { fixture, show_talent_condition } = condition_fixture({
    talents: { 74: 1, 75: 1, 77: 1, 78: 1 },
  });
  show_talent_condition(7);
  const images = fixture.lines.filter((l) => l.type === 'image');
  assert.equal(images.length, 4, '四个臂各一处');
  assert(
    images.every((l) => l.names[0] === 'COVER_WHITE'),
    '资源名一致',
  );
});

test('SHOW_TALENT_CONDITION：性感素质已得的那一行换成 COVER_WHITE 封面图', () => {
  const { fixture, show_talent_condition } = condition_fixture({
    talents: { 74: 1 },
  });
  show_talent_condition(7);
  const images = fixture.lines.filter((l) => l.type === 'image');
  assert.equal(images.length, 1, '只 74 已得 → 只一处封面图');
  assert.deepEqual(images[0].names, ['COVER_WHITE'], '资源名取自 res/img.csv');
  assert(
    fixture.text_lines().some((t) => t.startsWith('自慰狂')),
    '行首标签仍出（封面图替代的是条件列之后的内容）',
  );
  const self_line = fixture.text_lines().find((t) => t.startsWith('自慰狂'));
  assert(
    !self_line.includes('[调教自慰'),
    `该行不再打条件（实际：${self_line}）`,
  );
});

test('SHOW_TALENT_CONDITION：强化素质与时常发情两组受 FLAG:73 / FLAG:75 控制', () => {
  // [FLAG:73, FLAG:75, 强化组在否, 时常发情组在否, 说明]
  const cases = [
    [0, 0, true, true, '两位都关：两组都在（判据是 <= 0）'],
    [1, 0, false, true, 'FLAG:73 开：强化组消失'],
    [0, 1, true, false, 'FLAG:75 开：时常发情消失'],
    [1, 1, false, false, '两位都开：两组都不在'],
  ];
  for (const [f73, f75, has_power, has_arousal, label] of cases) {
    const { fixture, show_talent_condition } = condition_fixture({
      flags: { 73: f73, 75: f75 },
    });
    show_talent_condition(7);
    const text = fixture.text_lines().join('\n');
    assert.equal(text.includes('淫核条件：'), has_power, `${label}：强化组`);
    assert.equal(
      text.includes('时常发情：'),
      has_arousal,
      `${label}：时常发情组`,
    );
  }
});

test('SHOW_TALENT_CONDITION：妓女/倾城两臂与元妓女（TALENT:315 == 5）', () => {
  // [TALENT:180, TALENT:315, 行首, 期望需求, 说明]
  const cases = [
    [0, 0, '妓女条件：', '[卖淫经验\u00A0100]', '未得 妓女：普通档'],
    [0, 5, '妓女条件：', '[卖淫经验\u00A0\u00A080]', '元妓女走 80'],
    [1, 0, '倾城条件：', '[卖淫经验\u00A0200]', '已得 妓女：倾城普通档'],
    [1, 5, '倾城条件：', '[卖淫经验\u00A0160]', '倾城元妓女档'],
  ];
  for (const [prostitute, exp, head, need, label] of cases) {
    const { fixture, show_talent_condition } = condition_fixture({
      talents: { 180: prostitute, 315: exp },
    });
    show_talent_condition(7);
    const line = fixture.text_lines().find((t) => t.startsWith(head.trim()));
    assert(line !== undefined, `${label}：应出现 ${head}`);
    assert(line.includes(need), `${label}（实际：${line}）`);
  }
});

test('SHOW_TALENT_CONDITION：淫乱条件行在已得 爱慕 时不出现（两条臂的分叉）', () => {
  const with_aiba = condition_fixture({ talents: { 85: 1 } });
  with_aiba.show_talent_condition(7);
  assert(
    !with_aiba.fixture.text_lines().some((t) => t.startsWith('淫乱条件：')),
    '有 爱慕 → 不打淫乱条件行',
  );
  assert(
    !with_aiba.fixture.text_lines().some((t) => t.startsWith('爱慕条件：')),
    '有 爱慕 → 也不打爱慕条件行',
  );
});

test('SHOW_TALENT_CONDITION：TALENT:184（求爱）挡掉爱慕条件行', () => {
  const { fixture, show_talent_condition } = condition_fixture({
    talents: { 184: 1 },
  });
  show_talent_condition(7);
  assert(!fixture.text_lines().some((t) => t.startsWith('爱慕条件：')));
  assert(fixture.text_lines().some((t) => t.startsWith('淫乱条件：')));
});

test('STC_SEIIN_CHECK：基础 50 与十四条素质修正（表驱动）', () => {
  const { stc_seiin_check } = condition_fixture();
  assert.equal(stc_seiin_check(7), 50, '无修正');
  // [素质编号, 增量, 说明]
  const cases = [
    [13, 4, '刚强'],
    [24, 4, '保守的'],
    [25, -2, '乐观的'],
    [26, 2, '悲观的'],
    [27, 5, '戒备森严'],
    [32, 4, '压抑'],
    [33, -2, '开放'],
    [61, -2, '不怕污臭'],
    [62, 2, '反感污臭'],
    [70, -2, '接受快感'],
    [71, 4, '否定快感'],
    [72, -5, '容易上瘾'],
    [80, -2, '倒错的'],
    [76, -20, '淫乱'],
  ];
  for (const [id, delta, label] of cases) {
    const { fixture, stc_seiin_check: check } = condition_fixture({
      talents: { [id]: 1 },
    });
    assert.equal(check(7), 50 + delta, label);
    assert.equal(fixture.store.get(`talent:7:${id}`), 1);
  }
  // 黄金样本 daycycle-max:222 的 51 = 50 + 5（戒备森严）− 2（乐观的）− 2（开放）
  const golden = condition_fixture({ talents: { 27: 1, 25: 1, 33: 1 } });
  assert.equal(golden.stc_seiin_check(7), 51, '黄金样本的组合');
});

test('SHOW_TALENT_CONDITION：男体下四处走阴茎侧分支', () => {
  // TALENT:122 男人：弄乳狂/性爱狂的条件表换列
  const woman = condition_fixture();
  woman.show_talent_condition(7);
  const woman_line = woman.fixture
    .text_lines()
    .find((t) => t.startsWith('性爱狂'));
  assert(woman_line.includes('[私处感觉 Lv4]'), '女体：私处感觉');

  const man = condition_fixture({ talents: { 122: 1 } });
  man.show_talent_condition(7);
  const man_line = man.fixture.text_lines().find((t) => t.startsWith('性爱狂'));
  assert(
    man_line.includes('[阴茎感觉 Lv4]'),
    `男体：阴茎感觉（实际：${man_line}）`,
  );
  assert(!man_line.includes('[私处感觉'), '男体不打私处感觉');
});

test('SHOW_TALENT_CONDITION：性豪条件列四枚强化素质', () => {
  const { fixture, show_talent_condition } = condition_fixture();
  show_talent_condition(7);
  const line = fixture.text_lines().find((t) => t.startsWith('性豪条件：'));
  assert.equal(
    line,
    '性豪条件： [淫核素质]\u00A0\u00A0[淫乳素质]\u00A0\u00A0[淫壶素质]\u00A0\u00A0[淫肛素质]\u00A0\u00A0',
  );
});

// —— @SHOW_CHARA_INFO 主分发与两个十六进制帮手（:7-321 / :1765-1833） ——

function main_fixture({ flag5 = 0, cflags = {}, talents = {} } = {}) {
  const fixture = create_era_fixture();
  fixture.store.set('flag:5', flag5);
  fixture.store.set('callname:7:-1', '考狄利亚');
  for (const [table, file] of [
    ['talent', 'Talent.yml'],
    ['abl', 'Abl.yml'],
    ['mark', 'Mark.yml'],
    ['exp', 'Exp.yml'],
  ]) {
    for (const [id, name] of parse_yml_ids(file)) {
      fixture.store.set(`${table}name:${id}`, name);
    }
  }
  for (const [index, value] of Object.entries(cflags)) {
    fixture.store.set(`cflag:7:${index}`, value);
  }
  for (const [index, value] of Object.entries(talents)) {
    fixture.store.set(`talent:7:${index}`, value);
  }
  return { fixture, ...fixture.load_module('page/page-chara-info-show') };
}

test('SHOW_CHARA_INFO：五个页码臂各自的段组合（表驱动）', async () => {
  // [页码, 必须出现的行首片段, 不该出现的行首片段, 说明]
  const cases = [
    [
      -2,
      '　性别：',
      '一人称：',
      '贡品时：素质行在、无人称行（-2 臂无 SHOW_BLOCK）',
    ],
    [-1, '\u00A0苦痛:LV', '一人称：', '调教时：刻印行在、无人称行'],
    [
      0,
      '一人称：',
      ' 【武器】: ',
      '首页：人称行 + 素质 + 能力 + 刻印（外观段不在）',
    ],
    [
      1,
      '一人称：',
      ' 【武器】: ',
      '状态页：人称行在（SHOW_BLOCK 在 CASE 1 里）、外观段不在',
    ],
    [2, ' 【武器】: ', '一人称：', '外观页：武器行在、无人称行'],
    [3, '※', '一人称：', '素质条件页：以 ※ 两行收尾'],
  ];
  for (const [page, must, must_not, label] of cases) {
    const { fixture, show_chara_info } = main_fixture({
      flag5: (1 << 8) | (1 << 12),
      cflags: { 451: 16 },
    });
    await show_chara_info(7, page, always);
    const lines = fixture.text_lines();
    assert(lines.length > 0, `${label}：应有输出`);
    assert(
      lines.some((t) => t.startsWith(must)),
      `${label}：应含行首为 ${must} 的行（实际 ${JSON.stringify(lines.slice(0, 5))}）`,
    );
    assert(
      !lines.some((t) => t.startsWith(must_not)),
      `${label}：不应含行首为 ${must_not} 的行`,
    );
  }
});

test('SHOW_CHARA_INFO：页码 3 的四个素质名按源序 74/78/75/77', async () => {
  const { fixture, show_chara_info } = main_fixture();
  await show_chara_info(7, 3, always);
  const line = fixture
    .text_lines()
    .find((t) => t.startsWith('※') && t.includes('每获得一项'));
  assert(
    line.includes(tname(74)) &&
      line.includes(tname(78)) &&
      line.includes(tname(75)) &&
      line.includes(tname(77)),
    `四个素质名都要在（实际：${line}）`,
  );
  assert(
    line.indexOf(tname(74)) < line.indexOf(tname(78)) &&
      line.indexOf(tname(78)) < line.indexOf(tname(75)) &&
      line.indexOf(tname(75)) < line.indexOf(tname(77)),
    '顺序照源（74 → 78 → 75 → 77，不是升序）',
  );
});

test('SHOW_CHARA_INFO：末尾补白到 27 行（含本页已出的行）', async () => {
  const { fixture, show_chara_info } = main_fixture({
    flag5: (1 << 8) | (1 << 12),
    cflags: { 451: 16 },
  });
  const before = fixture.lines.length;
  await show_chara_info(7, 3, always);
  const used = fixture.lines.length - before;
  assert(
    used >= 27,
    `从进入本函数起至少 27 行（实际 ${used}；末尾补白按 LINECOUNT 差算）`,
  );
});

test('SHOW_CHARA_INFO：献祭完成分支（CFLAG:1 == 11）走近三十项与两个出口', async () => {
  const { fixture, show_chara_info } = main_fixture({
    cflags: { 1: 11, 800: 10, 801: 10 }, // 合计 20 < 30：未满，走两个出口
  });
  fixture.set_inputs(100); // 选 [100] 返回（真按钮，见下）
  const result = await show_chara_info(7, -1, always, 0x000000);
  const lines = fixture.text_lines();
  assert.equal(lines[1], '已献祭的肉便器数量', '第 0 行是标题行');
  assert(
    lines.some((t) => t.startsWith('合计')),
    '合计行按六项之和',
  );
  // 两个出口是真按钮（#530）：编号由引擎按 showAcc 拼，正文不带 `[N]`，
  // 也不再是纯文本行——纯文本行玩家敲不进编号（#130 的通则）
  const rendered = button_rendered(fixture);
  assert.ok(
    rendered.some((text) => text === '[10] 查看符合条件的奴隶或勇者'),
    `[10] 要由引擎拼在正文前（实显：${JSON.stringify(rendered)}）`,
  );
  assert.ok(
    rendered.some((text) => text === '[100] 返回'),
    `[100] 要由引擎拼在正文前（实显：${JSON.stringify(rendered)}）`,
  );
  assert(
    !lines.some((t) => t.includes('查看符合条件的奴隶或勇者')),
    '出口不是纯文本行',
  );
  assert.equal(result, 1, '返回首页（directToHomePage 的返回值形态）');
});

test('SHOW_CHARA_INFO：献祭完成演出（合计 ≥ 30）的两句前导补位是 NBSP（#577）', async () => {
  const { fixture, show_chara_info } = main_fixture({
    cflags: { 1: 11, 800: 15, 801: 15 }, // 合计 30：满，走 :48-77 的演出
  });
  fixture.set_inputs(100);
  await show_chara_info(7, -1, always, 0x000000);
  const lines = fixture.text_lines();
  assert.ok(
    lines.includes('\u00A0'.repeat(16) + '向这伟力的降临献上喝彩！'),
    '第二句的 16 格前导（PRINTS "\\s"*16 的内容空格，#577 起 NBSP）',
  );
  assert.ok(
    lines.includes('\u00A0'.repeat(32) + '为至高无双的魔王尽瘁效忠！'),
    '第三句的 32 格前导（同为内容空格）',
  );
});

test('SHOW_CHARA_INFO：出口轮的空行按原作（#596）——[10] 之前两行、两钮之间一行、返回之后没有', async () => {
  const { fixture, show_chara_info } = main_fixture({
    cflags: { 1: 11, 800: 10 }, // 合计 10 < 30：未满，走两个出口
  });
  fixture.set_inputs(100);
  await show_chara_info(7, -1, always, 0x000000);

  // 原作 :79-80 是两句 `PRINTS "\n"*2 + 按钮文本`：第一句的两个换行落在
  // 上一行（:41 合计行）已收尾之后 = 两个真空行；第二句的首个换行只结束
  // [10] 那一行（ere 的 printButton 自成一行），余下一个是真空行；
  // :127 的返回文本之后停在 INPUT，没有 PRINTL
  const row_of = (accelerator) => {
    const line = fixture.lines.find(
      (entry) => entry.type === 'button' && entry.accelerator === accelerator,
    );
    assert.ok(line, `找不到 [${accelerator}] 按钮`);
    return line.row;
  };
  const pick = row_of(10);
  const back = row_of(100);
  assert.deepEqual(
    fixture.lines
      .filter((entry) => entry.type === 'br')
      .map((entry) => entry.row),
    [pick - 2, pick - 1, pick + 1],
    '三个真空行：[10] 之前两个、两枚按钮之间一个',
  );
  assert.equal(back, pick + 2, '[100] 紧跟 [10] 之后的那一个空行');
  assert.equal(
    fixture.lines.at(-1).row,
    back,
    ':127 的返回文本之后不补空行（下一行就是 INPUT）',
  );
});

test('SHOW_CHARA_INFO：名单轮的 [999] 返回之后不补空行（#596）', async () => {
  // 原作 :127 的 `PRINTS "\n"*2 + " [100] 返回 "` 是名单轮的收尾：返回文本
  // 之后直接 `$SacrificeListInputReacquisition` + INPUT，没有 PRINTL。
  const { fixture, show_chara_info } = main_fixture({
    cflags: { 1: 11, 800: 10 },
  });
  fixture.set_inputs(10, 999, 100); // 进名单 → 名单轮 [999] → 出口轮 [100]
  await show_chara_info(7, -1, always, 0x000000);

  const back = fixture.lines.find(
    (entry) => entry.type === 'button' && entry.accelerator === 999,
  );
  assert.ok(back, '名单轮有一枚 [999] 返回');
  const at = fixture.lines.indexOf(back);
  const next = fixture.lines[at + 1];
  assert.ok(
    !(next?.type === 'br' || (next?.type === 'text' && next.text === '')),
    ":127 的返回文本之后不补空行（println 与 print('') 两种形态都不许）",
  );
});

test('SHOW_CHARA_INFO：祭品名单的返回是真按钮（名单轮次白名单非空，#530）', async () => {
  // 名单轮次的白名单本来就非空——名单行自身是按钮（角色号），六个条件键是
  // 按钮（1000+下标）。此时若「返回」仍是纯文本行，玩家敲它的编号会被
  // 引擎拒收（renderFromButton 按 rule.indexOf 判定），夹具同款抛
  // 「输入不合法」：本用例在修好之前必定红。
  // 名单轮的返回编号自 #586 起是 [999]（该轮的 [100] 要让给 100 号预设角色，
  // 见「名单里 100 号角色行可选…」用例）；出口轮不打角色行，它的 [100] 保持
  // 原作。
  const { fixture, show_chara_info } = main_fixture({
    cflags: { 1: 11, 800: 10 },
  });
  const victim = 9;
  fixture.seed_chara(victim, { id: victim, name: '候补', callname: '候补' });
  fixture.era.addCharacter(victim);
  fixture.store.set(`cflag:${victim}:1`, 8);
  fixture.store.set('callname:7:-1', '考狄利亚'); // 名单只列同条件的角色
  // 进名单 → 名单里 [999] 返回 → RESTART 回到「两个出口」→ 再 [100] 返回首页
  fixture.set_inputs(10, 999, 100);
  const result = await show_chara_info(7, -1, always, 0x000000);

  assert.equal(result, 1, '[999] 从名单里返回首页');
  const rendered = button_rendered(fixture);
  assert.ok(
    rendered.some((text) => text === '[999] 返回'),
    `名单轮有一枚 [999] 返回（实显：${JSON.stringify(rendered)}）`,
  );
  // 出口轮在本流程里被重画两次（名单轮的 RESTART 一次），每次都是 [10] 与
  // [100] 成对；名单轮两枚都不打——数量不相等即名单轮混进了 [100]
  assert.equal(
    rendered.filter((text) => text === '[100] 返回').length,
    rendered.filter((text) => text === '[10] 查看符合条件的奴隶或勇者').length,
    `原作的 [100] 返回只留在出口轮（实显：${JSON.stringify(rendered)}）`,
  );
  // 名单轮的返回走 RESTART（回到「两个出口」重画），不是直接退到首页：
  // 出口轮的 [10] 必须在 [999] 之后**再出现一次**（改成 return 1 即红）
  assert.ok(
    rendered.lastIndexOf('[10] 查看符合条件的奴隶或勇者') >
      rendered.indexOf('[999] 返回'),
    `RESTART 后出口轮重画（实显：${JSON.stringify(rendered)}）`,
  );
});

test('SHOW_CHARA_INFO：名单里 100 号角色行可选、返回仍可用（预设 100 × [100] 撞号，#586）', async () => {
  // 预设 100「怪物的女儿」能以 ID 100 加入：生命摇篮 @CHAR_CREATE 在输入不落进
  // 1-16 / 21-30 / 37-60 三段时把它原样当预设编号（`CASEELSE`）、经 EXISTCSV
  // 放行（yml/Chara100.yml 在库），随后 `era.addCharacter(100)`
  // （chara-custom.js 的 char_append；原作同样如此，见
  // test/chara-outer.test.js:11-16）。名单轮的角色行以角色 ID 作快捷键，
  // 而返回按钮原作也是 [100]——修好之前，敲 100 命中的是返回分支，这个角色
  // 选不中（#586）。本用例在修好之前必定红：喂进去的 100 会走返回而非行。
  const { fixture, show_chara_info } = main_fixture({
    cflags: { 1: 11, 800: 10 },
  });
  const victim = 100;
  fixture.seed_chara(victim, {
    id: victim,
    name: '怪物的女儿',
    callname: '怪物的女儿',
  });
  assert.equal(
    fixture.era.addCharacter(victim),
    true,
    '预设 100 以 ID 100 加入',
  );
  fixture.store.set(`cflag:${victim}:1`, 8); // 可献祭（状态 8）
  fixture.store.set('callname:7:-1', '考狄利亚'); // 名单只列同条件的角色
  // 进名单 → 点 100 号行 → [0] 终止 → [999] 返回（名单轮）→ [100] 返回（出口轮）
  fixture.set_inputs(10, victim, 0, 999, 100);
  const result = await show_chara_info(7, -1, always, 0x000000);

  assert.equal(result, 1, '两个返回都走通，回到首页');
  const texts = fixture.text_lines();
  assert.ok(
    texts.some((t) => t.includes('确定要将 怪物的女儿 献祭？')),
    `100 号角色行被选中（实际尾部：${JSON.stringify(texts.slice(-6))}）`,
  );
  const rendered = button_rendered(fixture);
  assert.ok(
    rendered.some((text) => text.startsWith('[100] 怪物的女儿')),
    `100 号行要由引擎拼编号（实显：${JSON.stringify(rendered)}）`,
  );
  assert.ok(
    rendered.some((text) => text === '[999] 返回'),
    `名单轮的返回是 [999]（实显：${JSON.stringify(rendered)}）`,
  );
});

test('SHOW_CHARA_INFO：条件键 [1005]/[1000] 两端都切页并按新条件重筛名单（#586 探针补）', async () => {
  // 六个条件键的编号是 1000 + 下标，两端是 [1000]（种族）与 [1005]（瞳色）。
  // 9 号与 7 号的「种族」相同（都未设 → 人类），「瞳色」不同（9 号 TALENT:306
  // = 1 → 蓝色，7 号未设 → ERROR）——切到瞳色页它不再符合条件，切回种族页
  // 又出现。两端各喂一次，编号基数或任一端的界挪动都会红。
  const { fixture, show_chara_info } = main_fixture({
    cflags: { 1: 11, 800: 10 },
  });
  const victim = 9;
  fixture.seed_chara(victim, { id: victim, name: '候补', callname: '候补' });
  fixture.era.addCharacter(victim);
  fixture.store.set(`cflag:${victim}:1`, 8);
  fixture.store.set('callname:7:-1', '考狄利亚');
  fixture.store.set(`talent:${victim}:306`, 1);
  // 进名单 → [1005] 切瞳色页 → [1000] 切回种族页 → [999] 返回 → [100] 返回首页
  fixture.set_inputs(10, 1005, 1000, 999, 100);
  const result = await show_chara_info(7, -1, always, 0x000000);

  assert.equal(result, 1);
  const rendered = button_rendered(fixture);
  const rows = rendered.filter((text) => text.startsWith('[9] '));
  assert.equal(
    rows.length,
    2,
    `切页后 9 号不再符合条件、切回来又出现：只在两次「种族页」渲染里成行（实显：${JSON.stringify(rendered)}）`,
  );
  assert.ok(
    rows.every((text) => text.includes('（人类）')),
    `两次成行都在种族页（内容值 = 人类；实显：${JSON.stringify(rows)}）`,
  );
});

test('SHOW_CHARA_INFO：名单里勇者档（状态 2）的行打开贡品信息页（#586 探针补）', async () => {
  // 源 :140 的 CASE 2：勇者档点开的是贡品信息页（SHOW_CHARA_INFO(…, -2)），
  // 不是献祭确认，也不是「该状态不可操作」。
  const { fixture, show_chara_info } = main_fixture({
    cflags: { 1: 11, 800: 10 },
  });
  const victim = 9;
  fixture.seed_chara(victim, { id: victim, name: '候补', callname: '候补' });
  fixture.era.addCharacter(victim);
  fixture.store.set(`cflag:${victim}:1`, 2); // 勇者
  fixture.store.set('callname:7:-1', '考狄利亚');
  fixture.set_inputs(10, victim, 999, 100); // 进名单 → 点勇者行 → 返回 → 返回首页
  const result = await show_chara_info(7, -1, always, 0x000000);

  assert.equal(result, 1);
  const texts = fixture.text_lines();
  // 贡品信息页（-2 臂）自己的可认标志：9 号的标题行 + 刻印行（-1/-2 两臂共有的
  // 段）——名单页与献祭分支都不会打这两样
  assert.ok(
    texts.some((t) => /^NO\.9\s/.test(t)),
    `打开的是 9 号的贡品信息页（实际尾部：${JSON.stringify(texts.slice(-8))}）`,
  );
  assert.ok(
    texts.some((t) => t.startsWith('\u00A0苦痛:LV')),
    `-2 臂的刻印行在（实际尾部：${JSON.stringify(texts.slice(-8))}）`,
  );
  assert.ok(
    !texts.some((t) => t.includes('该状态不可操作')),
    '状态 2 不得落进不可操作分支',
  );
});

test('SHOW_CHARA_INFO：名单不列献祭对象自身（源 :98 的 temp != shadow；#586 探针补）', async () => {
  // 献祭对象自己也在场、条件与自己也相同——若不排除自身，名单里会出现它的行，
  // 点下去是自献祭。
  const { fixture, show_chara_info } = main_fixture({
    cflags: { 1: 11, 800: 10 },
  });
  fixture.seed_chara(7, { id: 7, name: '考狄利亚', callname: '考狄利亚' });
  assert.equal(fixture.era.addCharacter(7), true, '献祭对象自己也在场');
  const victim = 9;
  fixture.seed_chara(victim, { id: victim, name: '候补', callname: '候补' });
  fixture.era.addCharacter(victim);
  fixture.store.set(`cflag:${victim}:1`, 8);
  fixture.set_inputs(10, 999, 100); // 进名单 → [999] 返回 → [100] 返回首页
  const result = await show_chara_info(7, -1, always, 0x000000);

  assert.equal(result, 1);
  const accelerators = fixture.lines_history
    .filter((line) => line.type === 'button')
    .map((line) => line.accelerator);
  assert.ok(accelerators.includes(victim), '名单里照常列出其他角色');
  assert.ok(
    !accelerators.includes(7),
    `献祭对象自身的行不出（实显：${JSON.stringify(button_rendered(fixture))}）`,
  );
});

test('SHOW_CHARA_INFO：献祭满足时走「完全召唤」演出并清零状态位', async () => {
  const { fixture, show_chara_info } = main_fixture({
    cflags: { 1: 11, 800: 30 },
  });
  await show_chara_info(7, -1, always, 0x000000).catch(() => {});
  const texts = fixture.text_lines();
  assert(
    texts.includes('————此刻正是献祭完成之时！'),
    `演出首句（实际前几句：${JSON.stringify(texts.slice(0, 3))}）`,
  );
  assert(texts.some((t) => t.includes('魔王之影 『 考狄利亚 』')));
  // #615 起横幅第二行与两串 `"-"*16` 同占一行（原作 :66-68）
  assert(texts.some((t) => t.includes('< 完 全 召 唤 >')));
  assert.equal(fixture.store.get('cflag:7:1'), 0, '状态位清零');
  assert.equal(fixture.store.get('cflag:7:700'), 1, '收藏位置 1');
  assert.equal(fixture.store.get('cflag:7:820'), 666666, '影の寿命置满');
});

test('#615 SHOW_CHARA_INFO：完全召唤横幅两行、之间一个真空行、之后两个真空行', async () => {
  const { fixture, show_chara_info } = main_fixture({
    cflags: { 1: 11, 800: 30 },
  });
  await show_chara_info(7, -1, always, 0x000000).catch(() => {});

  const lines = fixture.lines;
  const banner1 = lines.findIndex(
    (l) => l.type === 'text' && l.text.includes('魔王之影 『 考狄利亚 』'),
  );
  assert.ok(banner1 >= 0, '横幅第一行在场');
  // :63-65：`"-"*16` + `PRINTFORM  魔王之影 『 … 』 ` + `"-"*16 + "\s"*2 + "\n"*2`
  // —— 一次 print 一行（自带 2 个尾随空格），末尾第二个 \n 是真空行
  assert.equal(
    lines[banner1].text,
    `${'-'.repeat(16)} 魔王之影 『 考狄利亚 』 ${'-'.repeat(16)}  `,
    '横幅第一行',
  );
  assert.equal(
    lines[banner1 + 1].type,
    'br',
    ':65 的第二个 \\n：两行横幅之间的真空行',
  );
  // :66-68：`"-"*16` + `< 完 全 召 唤 >` + `"-"*16 + "\s"*2 + "\n"` —— 第二行
  assert.equal(
    lines[banner1 + 2].text,
    `${'-'.repeat(16)}< 完 全 召 唤 >${'-'.repeat(16)}  `,
    '横幅第二行（不再被拆成三段）',
  );
  // :75 WAIT → :76 `PRINTS "\n"*2`：第二行横幅之后的两个真空行（横幅票补一个）
  assert.equal(lines[banner1 + 3].type, 'br', ':76 的第一个 \\n');
  assert.equal(lines[banner1 + 4].type, 'br', ':76 的第二个 \\n');
  // 演出到此为止（:77 RESTART → 外层 for(;;) 重画一屏，下一行是新一屏的行）
  assert.notEqual(
    lines[banner1 + 5]?.type,
    'br',
    ':76 的两个空行之后直接进下一次重画',
  );
});

test('HEXtoDEC：六位十六进制按 ×15 合成三段（原作自身的进制笔误，1:1）', () => {
  const { hex_to_dec } = main_fixture();
  // [颜色整数, 期望三段, 说明]
  const cases = [
    [0x000000, [0, 0, 0], '全黑'],
    [0xffffff, [240, 240, 240], '全白（15*15+15 = 240，×16 会得 255）'],
    [0x123456, [17, 49, 81], '1*15+2 / 3*15+4 / 5*15+6'],
    [0x000001, [0, 0, 1], '末位最低'],
  ];
  for (const [hex, expected, label] of cases) {
    const dec = [0, 0, 0];
    hex_to_dec(hex, dec);
    assert.deepEqual(dec, expected, label);
  }
});

test('ColorJudgmentWorB：背景均值 ≤ 128 落白字，否则落黑字', () => {
  const { color_judgment_wor_b } = main_fixture();
  // [输入三段, 期望 dec[1..3], 说明]
  const cases = [
    [[0, 0, 0], 255, '纯黑背景 → 白字'],
    [[128, 128, 128], 255, '均值恰 128 → 白字（判据是 <= 128）'],
    [[129, 129, 129], 0, '均值 129 → 黑字'],
    [[255, 255, 255], 0, '纯白背景 → 黑字'],
  ];
  for (const [input, expected, label] of cases) {
    const dec = [...input, 0];
    color_judgment_wor_b(dec);
    assert.deepEqual(
      [dec[1], dec[2], dec[3]],
      [expected, expected, expected],
      label,
    );
    assert.equal(dec[0], input[0], 'dec[0] 不被改写（读写错开一位是原作自身）');
  }
});

// —— 标签与配色的逐条断言（#390 返工：只体现在输出上的颜色/标签也算行为） ——

/** 直接驱动 STC_* 助手，取回它压进行缓冲的片段 */
function stc_run(stc, cid, args) {
  const row = { fragments: [] };
  stc(row, cid, ...args);
  return row.fragments;
}

test('STC_LAB_TAL：三档配色 + 「条件」补字的判据（表驱动）', () => {
  // [已设素质, 取用编号, 期望 color, 期望行首标签, 说明]
  const cases = [
    [
      {},
      85,
      undefined,
      '爱慕条件： ',
      '未获得且未崩坏：默认色（TALENTNAME=爱慕，4 字节 → 补「条件」）',
    ],
    [
      { 85: 1 },
      85,
      '#66b3ff',
      '爱慕条件： ',
      '已获得：达成色（SETCOLOR 102,179,255）',
    ],
    [
      { 85: 1, 9: 1 },
      85,
      'DarkRed',
      '爱慕条件： ',
      '崩坏（TALENT:9）：不可用色，压过达成色',
    ],
    [
      { 52: 1 },
      52,
      '#66b3ff',
      '擅用舌头： ',
      '名字 8 字节 > 4：不补「条件」二字',
    ],
  ];
  for (const [talents, id, color, label, note] of cases) {
    const { fixture, stc_lab_tal } = condition_fixture({ talents });
    const fragments = stc_run(stc_lab_tal, 7, [id]);
    assert.equal(fragments[0].color, color, `${note}（色）`);
    assert.equal(
      fragments[0].content,
      label,
      `${note}（标签；实际 ${JSON.stringify(fragments[0].content)}）`,
    );
    assert.equal(fixture.store.get('talent:7:85') ?? 0, talents[85] ?? 0);
  }
  // 崩坏对**每一条**条件行都生效（不只爱慕那一条）
  const broken = condition_fixture({ talents: { 9: 1 } });
  for (const id of [52, 83, 88, 89, 136]) {
    const fragments = stc_run(broken.stc_lab_tal, 7, [id]);
    assert.equal(
      fragments[0].color,
      'DarkRed',
      `崩坏时 TALENT:${id} 的行首也是不可用色`,
    );
  }
});

test('STC_LAB_TAL：「条件」二字的补字阈值是 4 字节（表驱动边界）', () => {
  // [素质编号, 期望标签, 说明]——名字字节数刚好卡在 4 的两侧
  const cases = [
    [85, '爱慕条件： ', '爱慕 = 4 字节（含上沿）→ 补'],
    [76, '淫乱条件： ', '淫乱 = 4 字节（含上沿）→ 补'],
    [52, '擅用舌头： ', '擅用舌头 = 8 字节 → 不补'],
    [83, '施虐狂\u00A0\u00A0： ', '施虐狂 = 6 字节 → 不补（名字列补到 8）'],
  ];
  for (const [id, label, note] of cases) {
    const { stc_lab_tal } = condition_fixture();
    assert.equal(stc_run(stc_lab_tal, 7, [id])[0].content, label, note);
  }
});

test('STC_SAY_TAL：名字 4 字节以下补「素质」并补到 12 列', () => {
  // [素质编号, 期望文本, 说明]
  const cases = [
    [85, '[爱慕素质]\u00A0\u00A0', '爱慕（4 字节）→ 补「素质」，再补到 12'],
    [76, '[淫乱素质]\u00A0\u00A0', '淫乱（4 字节）→ 同上'],
    [52, '[擅用舌头]\u00A0\u00A0', '擅用舌头（8 字节）→ 不补，补到 12'],
  ];
  for (const [id, expected, note] of cases) {
    const { stc_say_tal } = condition_fixture();
    const frag = stc_run(stc_say_tal, 7, [id])[0];
    assert.equal(frag.content, expected, note);
  }
});

test('STC_SAY_MARK：刻印名的宽度判据是 6（短名补位、长名原样）', () => {
  // 四枚真实刻印名都是 8 字节（XX刻印），补位路径只有合成短名才碰得到
  const { fixture, stc_say_mark } = condition_fixture();
  fixture.store.set('markname:9', '苦痛'); // 4 字节 ≤ 6 → 右补到 6
  assert.equal(
    stc_run(stc_say_mark, 7, [9, 3])[0].content,
    '[苦痛\u00A0\u00A0 Lv3]\u00A0\u00A0\u00A0',
    '短名按 6 列补位；整段再补到 15（源 :489 用的是 STC_PRINTC 缺省列宽）',
  );
  assert.equal(
    stc_run(stc_say_mark, 7, [2, 3])[0].content,
    '[屈服刻印 Lv3]\u00A0',
    '8 字节的真名超宽不截（14 字节 → 补 1，yml/Mark.yml 的 2 号）',
  );
});

test('STC_SAY_*：true / false 两档配色（表驱动，两侧都站）', () => {
  // [构造, 取用方式, 期望 color, 说明]
  const cases = [
    [
      { abls: { 10: 3 } },
      (fx) => stc_run(fx.stc_say_abl, 7, [10, 3]),
      'White',
      'ABL 达标 → 白',
    ],
    [
      { abls: { 10: 2 } },
      (fx) => stc_run(fx.stc_say_abl, 7, [10, 3]),
      'Gray',
      'ABL 差一级 → 灰',
    ],
    [
      { exps: { 21: 200 } },
      (fx) => stc_run(fx.stc_say_exp, 7, [21, 200]),
      'White',
      'EXP 达标 → 白',
    ],
    [
      { exps: { 21: 199 } },
      (fx) => stc_run(fx.stc_say_exp, 7, [21, 200]),
      'Gray',
      'EXP 差一点 → 灰',
    ],
    [
      { marks: { 2: 3 } },
      (fx) => stc_run(fx.stc_say_mark, 7, [2, 3]),
      'White',
      'MARK 达标 → 白',
    ],
    [
      { marks: { 2: 2 } },
      (fx) => stc_run(fx.stc_say_mark, 7, [2, 3]),
      'Gray',
      'MARK 差一级 → 灰',
    ],
    [
      { talents: { 85: 1 } },
      (fx) => stc_run(fx.stc_say_tal, 7, [85]),
      'White',
      'TALENT 已得 → 白',
    ],
    [{}, (fx) => stc_run(fx.stc_say_tal, 7, [85]), 'Gray', 'TALENT 未得 → 灰'],
  ];
  for (const [setup, run, color, note] of cases) {
    assert.equal(run(condition_fixture(setup))[0].color, color, note);
  }
});

test('STC_SAYNO_*：right / alert 两档配色（表驱动，两侧都站）', () => {
  // [已设刻印/素质, 期望 color, 说明]
  const cases = [
    [{ marks: { 3: 0 } }, 'DarkSeaGreen', 'MARK:3 = 0 ≤ 0 → 达标色'],
    [{ marks: { 3: 1 } }, 'LightSalmon', 'MARK:3 = 1 > 0 → 警示色'],
    [{ talents: { 85: 0 } }, 'DarkSeaGreen', 'TALENT 未得 ≤ 0 → 达标色'],
    [{ talents: { 85: 1 } }, 'LightSalmon', 'TALENT 已得 > 0 → 警示色'],
  ];
  for (const [setup, color, note] of cases) {
    const fx = condition_fixture(setup);
    const mark = setup.marks !== undefined;
    const frag = mark
      ? stc_run(fx.stc_sayno_mark, 7, [3])[0]
      : stc_run(fx.stc_sayno_tal, 7, [85])[0];
    assert.equal(frag.color, color, note);
  }
});

test('STC_SAYSUM_EXP：三项之和的判据与标签拼接（两侧都站）', () => {
  // [EXP 三项, 期望 color, 期望标签, 说明]
  const cases = [
    [
      { 11: 100, 31: 60, 54: 40 },
      'White',
      '[调教自慰|放尿经验|喷奶经验\u00A0200]',
      '和恰好 200 ≥ 200',
    ],
    [
      { 11: 100, 31: 60, 54: 39 },
      'Gray',
      '[调教自慰|放尿经验|喷奶经验\u00A0200]',
      '和 199 差一点',
    ],
    [
      { 11: 201 },
      'White',
      '[调教自慰\u00A0200]',
      '后两项为 0 时不入标签（也不入和）',
    ],
  ];
  for (const [exps, color, label, note] of cases) {
    const fx = condition_fixture({ exps });
    const tail = label === '[调教自慰\u00A0200]' ? [0, 0] : [31, 54];
    const frag = stc_run(fx.stc_saysum_exp, 7, [200, 11, ...tail])[0];
    assert.equal(frag.color, color, `${note}（色）`);
    assert.equal(frag.content, label, `${note}（标签）`);
  }
});

test('STC_SAY_ABCV：四级感觉之和的判据（两侧都站）', () => {
  const cases = [
    [{ 0: 3, 1: 3, 2: 2, 3: 2 }, 'White', '和恰好 10 ≥ 10'],
    [{ 0: 3, 1: 3, 2: 2, 3: 1 }, 'Gray', '和 9 差一点'],
  ];
  for (const [abls, color, note] of cases) {
    const fx = condition_fixture({ abls });
    const frag = stc_run(fx.stc_say_abcv, 7, [10])[0];
    assert.equal(frag.color, color, note);
    assert.equal(frag.content, '[四点感觉Lv10]\u00A0');
  }
});

test('STC_SAYSUM_ABL：四项之和的判据与标签（本文件无调用点，直驱）', () => {
  const cases = [
    [{ 10: 2, 11: 1 }, 'White', '和恰好 3 ≥ 3'],
    [{ 10: 2 }, 'Gray', '和 2 差一点'],
  ];
  for (const [abls, color, note] of cases) {
    const fx = condition_fixture({ abls });
    const frag = stc_run(fx.stc_saysum_abl, 7, [3, 10, 11])[0];
    assert.equal(frag.color, color, note);
    assert.equal(
      frag.content,
      `[${ABL_NAMES.get(10)}|${ABL_NAMES.get(11)} Lv3]`,
    );
  }
});

test('STC_SAY_EXP：经验名按 8 字节截断（全角 4 字），整段补到 15 的整数倍', () => {
  // 调教自慰经验（6 字 = 12 字节）截成前 4 字；口交经验（4 字 = 8 字节）不截。
  // 文本 + STC_PRINTC 的补位同落一个片段（源里 RESETCOLOR 在 STC_PRINTC 之后）。
  const long = condition_fixture({ exps: { 11: 100 } });
  assert.equal(
    stc_run(long.stc_say_exp, 7, [11, 100])[0].content,
    '[调教自慰\u00A0100]\u00A0',
    '长名截到 8 字节（14 字节 → 补 1 空格）',
  );
  assert.equal(
    stc_run(long.stc_say_exp, 7, [11, 1000])[0].content,
    '[调教自慰1000]\u00A0'.replace('[调教自慰1000]', '[调教自慰1000]'),
    '需求值右对齐宽 4',
  );
  const short = condition_fixture({ exps: { 22: 1000 } });
  assert.equal(
    stc_run(short.stc_say_exp, 7, [22, 1000])[0].content,
    '[口交经验1000]\u00A0',
    '恰好 8 字节的名字不截',
  );
});

// —— 跨文件：display-width（其余模块的公共底座） ——

test('DISPLAY_WIDTH：全角 2 列 / 半角 1 列', () => {
  const { display_width } = condition_fixture().fixture.load_module(
    'utils/display-width',
  );
  const cases = [
    ['', 0, '空串'],
    ['abc', 3, '半角'],
    ['技巧', 4, '全角'],
    ['[顺从   Lv3]', 12, '混合（方括号是半角）'],
    ['　', 2, '全角空格'],
    ['\u00A0', 1, '不换行空格在 0xFF 以内 → 半角'],
  ];
  for (const [text, width, note] of cases) {
    assert.equal(display_width(text), width, note);
  }
});

test('PAD_DISPLAY / PAD_LEFT：按显示宽度补位，超宽不截断', () => {
  const { pad_display, pad_left } = condition_fixture().fixture.load_module(
    'utils/display-width',
  );
  assert.equal(
    pad_display('技巧', 8),
    '技巧\u00A0\u00A0\u00A0\u00A0',
    '左对齐补到 8 列（4 + 4 空格）',
  );
  assert.equal(pad_display('技巧', 2), '技巧', '已超宽不截断');
  assert.equal(
    pad_left('技巧', 8),
    '\u00A0\u00A0\u00A0\u00A0技巧',
    '右对齐补到 8 列',
  );
  assert.equal(pad_left('7', 3), '\u00A0\u00A07', '数字右对齐');
});

test('SLICE_DISPLAY：按字节截断，不切半全角字', () => {
  const { slice_display } = condition_fixture().fixture.load_module(
    'utils/display-width',
  );
  const cases = [
    ['调教自慰经验', 8, '调教自慰', '全角 4 字 = 8 字节'],
    ['口交经验', 8, '口交经验', '恰好 8 字节不截'],
    ['ab', 8, 'ab', '不足上限原样返回'],
    ['调教自慰', 7, '调教自', '7 字节装不下第 4 个全角字'],
  ];
  for (const [text, width, expected, note] of cases) {
    assert.equal(slice_display(text, width), expected, note);
  }
});

/** 在全部输出条目里找含该文本的片段，取它的 color（颜色也算行为的断言口） */
function color_of(fixture, text) {
  for (const line of fixture.lines) {
    if (!Array.isArray(line.content)) continue;
    for (const frag of line.content) {
      if (String(frag.content).includes(text)) return frag.color;
    }
  }
  return undefined;
}

test('STC_LAB_TAL：「条件」补字的阈值在 4 与 5 之间（宽度 5 的名字不补）', () => {
  // 真实名字里没有 5 列宽的（全角 2 字节成对），用合成名把边界钉死：
  // 判据是 STRLENS ≤ 4，5 列的 'AAA级' 必须**不**补「条件」
  const { fixture, stc_lab_tal } = condition_fixture();
  fixture.store.set('talentname:900', 'AAA级'); // 宽 5（3 个半角 + 1 个全角）
  assert.equal(
    stc_run(stc_lab_tal, 7, [900])[0].content,
    'AAA级\u00A0\u00A0\u00A0： ',
    '宽 5 > 4 → 不补「条件」',
  );
  fixture.store.set('talentname:901', 'AA级'); // 宽 4
  assert.equal(
    stc_run(stc_lab_tal, 7, [901])[0].content,
    'AA级条件： ',
    '宽 4 ≤ 4 → 补「条件」',
  );
});

test('STC_LAB_TAL：男体下 230 那一行改称「绝伦」', () => {
  const man = condition_fixture({ talents: { 122: 1 } });
  assert.equal(
    stc_run(man.stc_lab_tal, 7, [230])[0].content,
    '绝伦条件： ',
    'TALENT:122 时 TALENT:230 的行首是「绝伦条件」',
  );
  const woman = condition_fixture();
  assert.equal(
    stc_run(woman.stc_lab_tal, 7, [230])[0].content,
    `${tname(230)}条件： `,
    '非男体用名字表里的原名（淫核 = 4 字节 → 补「条件」）',
  );
  assert.equal(tname(230), '淫核');
});

test('SHOW_TALENT_CONDITION：助手条件行的行首配色三档（默认 / 达成 / 崩坏）', () => {
  const base = { talents: { 85: 1 } };
  const cases = [
    [{ ...base, cflags: { 2: 0 } }, undefined, '好感度非 2 且未崩坏 → 默认色'],
    [{ ...base, cflags: { 2: 2 } }, '#66b3ff', '好感度恰为 2 → 达成色'],
    [
      { ...base, cflags: { 2: 2 }, talents: { 85: 1, 9: 1 } },
      'DarkRed',
      '崩坏压过达成色',
    ],
  ];
  for (const [setup, color, note] of cases) {
    const { fixture, show_talent_condition } = condition_fixture(setup);
    show_talent_condition(7);
    assert.equal(color_of(fixture, '助手条件'), color, note);
  }
});

test('SHOW_TALENT_CONDITION：[好感度 200%] 格的两侧配色与文案', () => {
  const cases = [
    [1999, 'Gray', '好感度 1999 < 2000 → 灰'],
    [2000, 'White', '好感度 2000 ≥ 2000 → 白'],
  ];
  for (const [affection, color, note] of cases) {
    const { fixture, show_talent_condition } = condition_fixture({
      talents: { 85: 1 },
      cflags: { 2: affection },
    });
    show_talent_condition(7);
    assert.equal(color_of(fixture, '[好感度 200%]'), color, note);
  }
});

test('SHOW_TALENT_CONDITION：时常发情行的两个阈值配色（700 / 2250）', () => {
  // [CFLAG:81, CFLAG:82, 润滑色, 欲情色, 说明]
  const cases = [
    [699, 2249, 'Gray', 'Gray', '两个都差一点'],
    [700, 2250, 'White', 'White', '两个都恰好达标'],
    [700, 0, 'White', 'Gray', '润滑达标、欲情未达标（两侧独立）'],
  ];
  for (const [c81, c82, c1, c2, note] of cases) {
    const { fixture, show_talent_condition } = condition_fixture({
      cflags: { 81: c81, 82: c82 },
    });
    show_talent_condition(7);
    assert.equal(color_of(fixture, '[润滑积蓄 700]'), c1, `${note}（润滑）`);
    assert.equal(color_of(fixture, '[欲情积蓄2250]'), c2, `${note}（欲情）`);
  }
});

test('SHOW_TALENT_CONDITION：性爱狂第二档的 sexskill_3（私处经验 300+50*N）', () => {
  // 只点尻穴狂（77）：sexskill_count = 1，性爱狂（75）自身未得 → 走上浮档
  const { fixture, show_talent_condition } = condition_fixture({
    talents: { 77: 1 },
  });
  show_talent_condition(7);
  const line = fixture.text_lines().find((t) => t.startsWith('性爱狂'));
  assert(
    line.includes('[私处感觉 Lv5]') && line.includes('[私处经验\u00A0350]'),
    `sexskill_3 = 300 + 50 * 1（实际：${line}）`,
  );
  assert(
    line.includes('[绝顶经验\u00A0110]'),
    `sexskill_2 同档（实际：${line}）`,
  );
});

test('SHOW_TALENT_CONDITION：尻穴狂第二档走 sexskill_3（两侧都站）', () => {
  const cases = [
    [
      { talents: { 75: 1 } },
      '[肛门快乐\u00A0350]',
      'sexskill_count = 1 → 300 + 50',
    ],
    [
      { talents: { 75: 1, 78: 1 } },
      '[肛门快乐\u00A0400]',
      'sexskill_count = 2 → 300 + 100',
    ],
  ];
  for (const [setup, fragment, note] of cases) {
    const { fixture, show_talent_condition } = condition_fixture(setup);
    show_talent_condition(7);
    const line = fixture.text_lines().find((t) => t.startsWith('尻穴狂'));
    assert(line.includes(fragment), `${note}（实际：${line}）`);
  }
});

// —— 覆盖面补齐（#390 返工第二轮：探针打出的四处盲区） ——

test('SHOW_DATA：结婚对象末位 9 的取法是 %10（119 也走家族婚姻）', () => {
  // 119 % 10 = 9 → 家族婚姻档；若写成 % 100 会得 19 → 落到 ITEMNAME 档
  const { fixture, show_data } = data_fixture({
    cflags: { 601: 119 },
    items: { 119: '不该出现的物品名' },
  });
  show_data(7, () => 0);
  const text = fixture.text_lines().at(-1);
  assert(
    text.includes('[结婚对象:无]'),
    `119 的末位是 9 → 家族婚姻（实际：${text}）`,
  );
  assert(!text.includes('不该出现的物品名'), '不得落到 ITEMNAME 档');
});

test('SHOW_APPEARACE：内裤位（CFLAG:40 位 1）也算「私处不可见」提前收尾', () => {
  // 判据是 CFLAG:40 & 17（位 1 + 位 16）；只穿内裤时同样看不到记录阴毛那一段
  const { fixture, show_appearance } = appearance_fixture({
    cflags: { 40: 1 }, // 只有内裤位，非裙装
  });
  assert.equal(show_appearance(7), 0);
  assert.deepEqual(fixture.text_lines(), [], '位 1 命中：不落到阴毛/穿环段');

  // 对照：同样的世界去掉内裤位（g = 0）时那一段照出
  const control = appearance_fixture({ cflags: { 40: 0 } });
  control.show_appearance(7);
  assert(
    control.fixture.text_lines().some((t) => t.includes('考狄利亚')),
    '位 1 未命中时才走到阴毛段',
  );
});

test('SHOW_CHARA_INFO：名单里点可献祭的角色（状态 0/7/8）走确认流程', async () => {
  // 状态在 SACRIFICABLE_STATES 里 → 出「确定要将…献祭？」；不在 → 「该状态不可操作：N」
  const cases = [
    [8, true, '状态 8（拘束台）也算可献祭'],
    [7, true, '状态 7（苗床）可献祭'],
    [5, false, '状态 5 不可操作'],
  ];
  for (const [state, sacrificable, note] of cases) {
    const { fixture, show_chara_info } = main_fixture({
      cflags: { 1: 11, 800: 10 },
    });
    const victim = 9;
    fixture.seed_chara(victim, { id: victim, name: '候补', callname: '候补' });
    fixture.era.addCharacter(victim);
    fixture.store.set(`cflag:${victim}:1`, state);
    // 名单只列与献祭对象同条件的角色：把 victim 的「种族」做成与 cid 7 一致
    fixture.store.set('callname:7:-1', '考狄利亚');
    fixture.set_inputs(10, victim, 0); // 进名单 → 点 victim → 终止
    await show_chara_info(7, -1, always, 0x000000).catch(() => {});
    const texts = fixture.text_lines();
    if (sacrificable) {
      assert(
        texts.some((t) => t.includes('确定要将 候补 献祭？')),
        `${note}（实际尾部：${JSON.stringify(texts.slice(-6))}）`,
      );
    } else {
      assert(
        texts.some((t) => t.includes('该状态不可操作：5')),
        `${note}（实际尾部：${JSON.stringify(texts.slice(-6))}）`,
      );
    }
  }
});

test('SHOW_TALENT：性別行的阴茎状态标带 #a1d8e6 着色', () => {
  const cases = [
    [{ [T.男人]: 1 }, 0, '#a1d8e6', '男体 + TALENT:318 = 0 → 带色'],
    [{ 121: 1 }, 4, '#a1d8e6', '扶她 + 马阴茎 → 带色'],
    [{}, 0, undefined, '女体：整段不出，自然无该片段'],
  ];
  for (const [talents, penis, color, note] of cases) {
    const { fixture, show_talent } = talent_fixture({
      flag5: 1 << 8,
      talents: { ...talents, ...(penis ? { 318: penis } : {}) },
    });
    show_talent(7);
    const line = fixture.lines.find(
      (l) =>
        Array.isArray(l.content) &&
        l.content.some((f) => String(f.content).includes('阴茎')),
    );
    const frag = line?.content.find((f) => f.content.includes('阴茎'));
    assert.equal(frag?.color, color, note);
  }
});

test('SHOW_APPEARACE：编号 1 的角色照样显名（NO 判据的两侧）', () => {
  // 判据是 NO:x != 0——番号 1 的角色与番号 7 一样要出名字
  const { fixture, show_appearance } = appearance_fixture({
    cflags: { 40: 0 },
    talents: { 310: 1 },
  });
  fixture.store.set('callname:1:-1', '阿尔');
  show_appearance(1);
  assert(
    fixture.text_lines().some((t) => t.includes('阿尔')),
    `番号 1 也要显名（实际：${JSON.stringify(fixture.text_lines())}）`,
  );
});

test('SHOW_CHARA_INFO：献祭后代时死亡标记按来源模板号落位（#561 第 2 条）', async () => {
  const { fixture, show_chara_info } = main_fixture({
    cflags: { 1: 11, 800: 10 },
  });
  // 后代形状的被献祭者：ID 落在 FIRST_CHILD_ID 段（模板 1 的 100000-100099），
  // template_no_of 拆出模板 1——与真后代走同一条寻址（不必跑生育流程）
  const victim = 100000;
  fixture.seed_chara(1, { id: 1, name: '后代模板', callname: '后代模板' });
  fixture.seed_chara(victim, { id: victim, name: '候补', callname: '候补' });
  assert.equal(fixture.era.addCharacter([victim, 1]), true);
  fixture.store.set(`cflag:${victim}:1`, 8);
  fixture.set_inputs(10, victim, 1); // 进名单 → 点 victim → [1] 献祭
  await show_chara_info(7, -1, always, 0x000000).catch(() => {});

  assert.equal(fixture.store.get('flag:200'), 1, '模板 1 → FLAG:200');
  assert.equal(
    fixture.store.get('flag:100199'),
    undefined,
    '不按角色 ID 直加（100000 + 199 = 100199）',
  );
  assert(!fixture.era.getAddedCharacters().includes(victim), '被献祭者除名');
});

test('SHOW_CHARA_INFO：献祭成功后对应的分项计数 +100', async () => {
  const { fixture, show_chara_info } = main_fixture({
    cflags: { 1: 11, 800: 10 },
  });
  const victim = 9;
  fixture.seed_chara(victim, { id: victim, name: '候补', callname: '候补' });
  fixture.era.addCharacter(victim);
  fixture.store.set(`cflag:${victim}:1`, 8);
  fixture.set_inputs(10, victim, 1); // 进名单 → 点 victim → [1] 献祭
  await show_chara_info(7, -1, always, 0x000000).catch(() => {});
  assert.equal(
    fixture.store.get('cflag:7:800'),
    110,
    'CFLAG:800 += 100（源 :157）',
  );
  assert.equal(fixture.store.get(`cflag:${victim}:1`), 0, '被献祭者状态清零');
  // 确认对话的两个选项是真按钮（#530）：上面喂的 `1` 之所以能被夹具放行，
  // 正是因为它是本轮打印过的按钮快捷键——纯文本行会被白名单当场拒收
  const rendered = button_rendered(fixture);
  assert.ok(
    rendered.some((text) => text === '[1] 献祭') &&
      rendered.some((text) => text === '[0] 终止'),
    `确认选项要由引擎拼编号（实显：${JSON.stringify(rendered)}）`,
  );
});
