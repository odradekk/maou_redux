/**
 * @file ere/page/page-chara-info.js 的行为测试（issue #391）。
 *
 * 缝 = test/helpers/era-fixture.js。覆盖行动徽章/比较器/婚姻文本三个纯函数、
 * 四个列表函数的排序契约、主循环 CHARA_INFO 的翻页与分派、个别信息页
 * CHARA_INFO_INDIVIDUAL 的按钮分发与导航。详情正文（SHOW_CHARA_INFO）与
 * 大部分操作按钮属存根，此处只验证「按钮出现/不出现」与「调用被正确门控」，
 * 不验证存根本身的文本（存根文本由 stub-line.js 自身的测试固定）。
 */

'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function add_chara(fixture, cid, name = `角色${cid}`) {
  fixture.seed_chara(cid, { id: cid, name, callname: name });
  assert.equal(fixture.era.addCharacter(cid), true);
}

function printed_includes(fixture, substr) {
  return fixture.lines_history.some((line) => line.text?.includes(substr));
}

/** 文本行出现的位置（lines_history 下标），用于断言「谁先印出来」 */
function text_positions(fixture, substr) {
  const found = [];
  fixture.lines_history.forEach((line, idx) => {
    if (line.type === 'text' && (line.text ?? '').includes(substr)) {
      found.push(idx);
    }
  });
  return found;
}

function buttons_with(fixture, accelerator) {
  return fixture.lines_history.filter(
    (line) => line.type === 'button' && line.accelerator === accelerator,
  );
}

/**
 * 显示宽度：全角按 2 格、半角按 1 格（原作 Emuera 的字符格口径）。
 * 只覆盖本屏会出现的字符——U+3000 全角空格、U+2015 横线、CJK 汉字与全角
 * 标点、半角 ASCII；不是通用的 East Asian Width 实现，别拿去量别处的文本。
 * @param {string} text
 * @returns {number}
 */
function display_width(text) {
  let width = 0;
  for (const char of text) {
    const code = char.codePointAt(0);
    const wide =
      code === 0x3000 || // 全角空格（这一屏的列对齐靠它）
      code === 0x2015 || // ―（SHOW_CHARA_ACT 回落文案里的横线）
      (code >= 0x2e80 && code <= 0xa4cf) || // CJK 部首～彝文（汉字都在内）
      (code >= 0xac00 && code <= 0xd7a3) || // 谚文音节
      (code >= 0xf900 && code <= 0xfaff) || // CJK 兼容表意文字
      (code >= 0xfe30 && code <= 0xfe4f) || // CJK 兼容符号
      (code >= 0xff00 && code <= 0xff60) || // 全角 ASCII 变体
      (code >= 0xffe0 && code <= 0xffe6); // 全角货币符号
    width += wide ? 2 : 1;
  }
  return width;
}

// —— SHOW_CHARA_ACT ——

test('SHOW_CHARA_ACT：状态码到徽章文本/颜色的映射，未登记状态回落残留字面量——表驱动走完 state 整个维度', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 1);
  const { show_chara_act } = fixture.load_module('page/page-chara-info');

  // state → {content, color}：每个已登记状态各一行，外加一行未登记状态
  // 的回落。floor 固定取 3，只在 state 2/3 的文案里体现（其余状态忽略它）
  const ACT_TABLE = [
    [2, '3F侵攻中', '#ff6464'],
    [3, '3F迎击中', '#64ffff'],
    [0, '[可调教]', '#6464ff'],
    [7, '[ 苗床 ]', '#64ff64'],
    [8, '[拘束台]', '#64ff64'],
    [9, '[ NTR中]', '#ff0000'],
    [10, '[育儿室]', '#64ff64'],
    [99, '-F\u3000\u2015\u3000', undefined], // 未登记状态：原作残留字面量
  ];
  fixture.store.set('cflag:1:501', 3);
  for (const [state, content, color] of ACT_TABLE) {
    fixture.store.set('cflag:1:1', state);
    const expected = color === undefined ? { content } : { content, color };
    assert.deepEqual(show_chara_act(1), expected, `state=${state}`);
  }
});

// —— COMPARE_CHARA_ACT ——

test('COMPARE_CHARA_ACT：按 (状态+11-act)%11 排名，同排名再按楼层/ID 决胜', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 1);
  add_chara(fixture, 2);
  const { compare_chara_act } = fixture.load_module('page/page-chara-info');

  assert.equal(compare_chara_act(1, 1), 0, '同一角色恒 0');

  fixture.store.set('cflag:1:1', 0); // 可调教，rank=(0+9)%11=9
  fixture.store.set('cflag:2:1', 7); // 苗床，rank=(7+9)%11=5
  assert.equal(
    compare_chara_act(1, 2, 2),
    1,
    '苗床（rank 5）排在可调教（rank 9）之前',
  );

  // 状态 2/3（侵攻中/迎击中）：源 :813 的 `… == 2 || … == 3 && 楼层不等` 按
  // Emuera 的「&& 与 || 同优先级、左结合」读作 `(状态 ∈ {2,3}) && 楼层不等`，
  // 楼层相等时整支不命中、落到末行的 ID 决胜（#517）
  fixture.store.set('cflag:1:1', 2);
  fixture.store.set('cflag:2:1', 2);
  fixture.store.set('cflag:1:501', 5);
  fixture.store.set('cflag:2:501', 5);
  assert.equal(
    compare_chara_act(1, 2, 2),
    -1,
    '楼层相等时落 ID 决胜（a 编号小 → 排前）',
  );

  fixture.store.set('cflag:2:501', 8); // a 楼层更浅
  assert.equal(compare_chara_act(1, 2, 2), -1);

  // 楼层序与 ID 序相反：这一侧才区分得出「真的在按楼层比」与「落到 ID 决胜」
  // （a=1 楼层 5、b=2 楼层 3 → 按楼层该判 1，按 ID 该判 -1）
  fixture.store.set('cflag:2:501', 3);
  assert.equal(compare_chara_act(1, 2, 2), 1, 'b 楼层更浅 → 按楼层判 1');

  fixture.store.set('cflag:1:1', 0);
  fixture.store.set('cflag:2:1', 0);
  assert.equal(compare_chara_act(1, 2, 2), -1, '排名并列时按 ID 升序决胜');
  assert.equal(compare_chara_act(2, 1, 2), 1);
});

// —— CHARA_MARRIGE_BEFORE ——

test('CHARA_MARRIGE_BEFORE：%10==0 早退、category 0/2/6 分档', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 1);
  const { chara_marriage_before } = fixture.load_module('page/page-chara-info');

  assert.equal(chara_marriage_before(1), '无', '缺省 0：无');

  // 早退判据是 `code % 10 === 0`，不是 `code % 100 === 0`——0 与 00 结尾在
  // 两种判据下都会早退，分不出改坏。10010 是 %10==0 但 %100!=0 的例子：
  // 早退判据命中即返回「无」；若误改成 %100，会漏判早退、继续往下算出
  // category=trunc(10010/10000)=1、kind=trunc(10010/10^9)=0，落进「0/4/8
  // → 故乡丈夫」，与早退的「无」不同，两侧才分得出来
  fixture.store.set('talent:1:320', 10010);
  assert.equal(
    chara_marriage_before(1),
    '无',
    '%10==0 早退（非 %100==0）：10010',
  );

  // category = trunc((code%100000)/10000)，构造 category=0：code=5（远小于
  // 10000，local1=code%100000=5，末位非零躲开 %10==0 早退）
  fixture.store.set('talent:1:320', 5);
  assert.equal(chara_marriage_before(1), '无', 'category 0');

  fixture.store.set('talent:1:320', 20005); // local1=20005 → category=2
  assert.equal(chara_marriage_before(1), '无', 'category 2');

  fixture.store.set('talent:1:320', 60005); // local1=60005 → category=6：CASEELSE 死代码
  assert.equal(
    chara_marriage_before(1),
    '',
    'category 5/CASEELSE：原作死代码，无输出',
  );
});

test('CHARA_MARRIGE_BEFORE：kind [0,4,8]/[1,5,7]/其余 三分组——表驱动走完 kind=0..9 整个维度', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 1);
  const { chara_marriage_before } = fixture.load_module('page/page-chara-info');

  // category 固定取 1（code = kind*10^9 + 10005，低 5 位 10005 → category=1，
  // 末位非零躲开 %10==0 早退），只让 kind 变化——逐个成员单独测，删掉/挪动
  // [0,4,8] 或 [1,5,7] 里任意一个都会被某一行拖住，不是只测三个代表值
  const KIND_TABLE = [
    [0, '故乡丈夫'],
    [4, '故乡丈夫'],
    [8, '故乡丈夫'],
    [1, '故乡扶她'],
    [5, '故乡扶她'],
    [7, '故乡扶她'],
    [2, '故乡妻子'],
    [3, '故乡妻子'],
    [6, '故乡妻子'],
    [9, '故乡妻子'],
  ];
  for (const [kind, expected] of KIND_TABLE) {
    fixture.store.set('talent:1:320', kind * 1_000_000_000 + 10005);
    assert.equal(chara_marriage_before(1), expected, `kind=${kind}`);
  }
});

// —— 四个列表函数：排序契约 + 表头/行渲染基本形状 ——

test('SHOW_CHARA_INFO_LIST：返回已加入角色 ID（不含魔王），渲染魔王表头与每行编号按钮', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  add_chara(fixture, 2, '乙');
  const { show_chara_info_list } = fixture.load_module('page/page-chara-info');

  const order = show_chara_info_list(0);

  assert.deepEqual(order, [1, 2]);
  assert.equal(printed_includes(fixture, '你 LV'), true, '魔王表头');
  assert.equal(buttons_with(fixture, 1).length, 1);
  assert.equal(buttons_with(fixture, 2).length, 1);
});

test('SHOW_CHARA_INFO_LIST：角色行的编号按钮仅由引擎拼一层 [N] 前缀，姓名/等级/攻防同格（#535）', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  add_chara(fixture, 11, '乙');
  // 下标含义（行内同格，原作 CHARA_INFO ver1.0.1.ERB:158-163）：
  // CFLAG:x:9 等级 / :13 攻击 / :14 防御 / :151 善恶值
  fixture.store.set('cflag:1:9', 5);
  fixture.store.set('cflag:1:13', 15);
  fixture.store.set('cflag:1:14', 20);
  fixture.store.set('cflag:1:151', 188);
  fixture.store.set('cflag:11:9', 7);
  fixture.store.set('cflag:11:13', 3);
  fixture.store.set('cflag:11:14', 4);
  fixture.store.set('cflag:11:151', -12);
  const { show_chara_info_list } = fixture.load_module('page/page-chara-info');

  show_chara_info_list(0);

  // 角色行的按钮正文为空，编号完全由引擎按 showAcc 拼（AGENTS.md 硬约束，
  // PR #30）。断言看 rendered（引擎实显文本）且**逐字相等**，不用 includes
  // 取子串：正文自带 `[N]` 时引擎会再拼一层、实显成 `[11] [11]`，子串判断
  // 照样成立，抓不住重复前缀（#530 立的写法）。
  // 不按快捷键筛行——这条用例本身要钉快捷键就是角色号，筛了就成了循环论证：
  // 魔王行的按钮排在最前，其后两个按钮就是两名角色。
  const buttons = fixture.lines_history.filter(
    (line) => line.type === 'button',
  );
  assert.equal(buttons.length, 3, '魔王行 ＋ 甲(1) ＋ 乙(11)');
  const rows = buttons.slice(1);
  assert.deepEqual(
    rows.map((line) => line.accelerator),
    [1, 11],
    '角色行的按钮带角色号（点得动、也敲得进白名单）',
  );
  assert.deepEqual(
    rows.map((line) => line.rendered),
    ['[1] ', '[11] '],
    '编号只有引擎拼的一层前缀；正文若自带 [N] 会实显成 [1] [1]',
  );
  assert.deepEqual(
    rows.map((line) => line.text),
    ['', ''],
    '按钮正文不含编号（含不含都要看实显，text 是游戏侧传入的原文）',
  );

  // 每格的列宽（引擎 24 列网格的 span，夹具记在 grid_width）：3 + 13 + 6 + 2
  // = 24。这一屏的排版核对（#535 第 4 项）靠它固定——后列的横向位置由跨度
  // 决定，与前一格的文本长度无关，所以编号格写 `[11] ` 还是 `[1] ` 都不会
  // 带着后列走（原作的定宽右对齐 `[{n,MAX_NUM_LEN}]` 在引擎里做不到，见
  // page-chara-info.js 文件头）
  assert.deepEqual(
    fixture.lines_history
      .filter((line) => line.type === 'button' || line.type === 'text')
      .map((line) => line.grid_width),
    [3, 13, 3, 13, 6, 2, 3, 13, 6, 2],
    '魔王行的两格 ＋ 两名角色各四格',
  );

  // 角色行的姓名 / 等级 / 攻防善恶同格：等级地址（cflag:cid:9）与魔王行
  // 同款，#530 的验收在魔王行上撞出过「名字有人守、等级没人守」的空缺
  // （M11210），角色行这边一并钉住。只取角色行（夹具按多列调用分组，
  // row > 0）——魔王行自己的等级由 #530 那两个用例守着，不在这里重复。
  assert.deepEqual(
    fixture.lines_history
      .filter(
        (line) =>
          line.type === 'text' && line.row > 0 && line.text.includes(' LV'),
      )
      .map((line) => line.text),
    [
      '[可调教] 甲 LV5 攻击15/防御20 善恶值188',
      '[可调教] 乙 LV7 攻击3/防御4 善恶值-12',
    ],
    '角色行的等级取自 cflag:cid:9（甲 LV5 / 乙 LV7）；地址读成 :10 会变 LV0',
  );
});

test('SHOW_CHARA_INFO_LIST：魔王行与角色行的姓名列在格内同宽（全角按 2、半角按 1，#535 引擎实测）', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  add_chara(fixture, 11, '乙');
  const { show_chara_info_list } = fixture.load_module('page/page-chara-info');

  show_chara_info_list(0);

  // 引擎里每格的横向位置由 el-col 的 span 决定，**不随前一格文本长度变化**
  // （#535 验收在引擎里实测确认），所以「姓名列齐不齐」只取决于姓名格内部
  // 到姓名为止的显示宽度：魔王行是空档，角色行是状态徽章 + 一个空格。
  // 实测口径：全角按 2 格、半角按 1 格（原作 Emuera 的字符格）。
  // 魔王行原来空档 10 格（5 个全角空格），实机上「你」比角色行的名字右一个
  // 半角字符（原作两行是齐的——golden 目录下的名册基准日志里可以直接数出来），
  // #535 改成 4 个全角 + 1 个半角＝9 格。
  const prefix_widths = [
    { row: 0, name: '你', label: '魔王行' },
    { row: 1, name: '甲', label: '角色行（1 位数编号）' },
    { row: 2, name: '乙', label: '角色行（2 位数编号）' },
  ].map(({ row, name, label }) => {
    const cell = fixture.lines_history.find(
      (line) =>
        line.type === 'text' && line.row === row && line.text.includes(' LV'),
    );
    assert.ok(cell, `${label}应有姓名格（row ${row}）`);
    const name_at = cell.text.indexOf(name);
    assert.ok(name_at >= 0, `${label}的姓名格里有「${name}」`);
    return display_width(cell.text.slice(0, name_at));
  });
  assert.deepEqual(
    prefix_widths,
    [9, 9, 9],
    '魔王行与角色行的姓名前缀显示宽度相等：魔王行 4 全角 + 1 半角；角色行徽章 8 + 1 半角',
  );

  // 编号格的实显宽度本来就不等（`[0] ` 4 格 / `[1] ` 4 格 / `[11] ` 5 格），
  // 姓名列照样齐——这正是「格位置由 span 定、不由前一格文本撑开」的观测面
  assert.deepEqual(
    fixture.lines_history
      .filter((line) => line.type === 'button')
      .map((line) => line.rendered),
    ['[0] ', '[1] ', '[11] '],
    '编号格实显宽度不等，但姓名列仍然对齐',
  );
});

test('SHOW_CHARA_ACT_LIST：act=0 走 COMPARE_CHARA_ACT，按 (状态+11-2)%11 排名（迎击中 rank=1 早于可调教 rank=9）', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  add_chara(fixture, 2, '乙');
  fixture.store.set('cflag:1:1', 3); // 甲：迎击中，rank=(3+11-2)%11=1
  fixture.store.set('cflag:2:1', 0); // 乙：可调教，rank=(0+11-2)%11=9
  const { show_chara_act_list } = fixture.load_module('page/page-chara-info');

  const order = show_chara_act_list(0, 0);

  assert.deepEqual(
    order,
    [1, 2],
    'rank 数值小的排前（源注释：0=調教中…3=迎撃中…）',
  );
});

test('SHOW_CHARA_ACT_LIST：双方都在侵攻/迎击时改走 ENEMY_COMPARE（按楼层，不是按状态排名）', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  add_chara(fixture, 2, '乙');
  fixture.store.set('cflag:1:1', 2); // 甲：侵攻中，rank(compare_chara_act)=0
  fixture.store.set('cflag:1:501', 20); // 但楼层很深
  fixture.store.set('cflag:2:1', 3); // 乙：迎击中，rank(compare_chara_act)=1
  fixture.store.set('cflag:2:501', 2); // 楼层很浅
  const { show_chara_act_list } = fixture.load_module('page/page-chara-info');

  // 若误退回 COMPARE_CHARA_ACT（只看状态排名，2 排 3 前）会得到 [1,2]；
  // ENEMY_COMPARE 按楼层比（浅层优先）应得到 [2,1]——两者在本例故意给出
  // 相反答案，用来分辨排序真的走了哪条支
  const order = show_chara_act_list(0, 1);
  assert.deepEqual(order, [2, 1]);
});

test('MARRIAGE_BRACKET_TEXT：spouse 分支串——表驱动走完外层四路 + ELSE 内四条支线', () => {
  // 每行独立起一个 fixture（分支所需的辅助状态互不相同，混用会串味）；
  // add_chara(0) 固定名字「你」，与外层 901/ELSE-同魔王婚姻分支的期望值对齐
  const CASES = [
    ['spouse=900 → 野狗', (f) => f.store.set('cflag:1:601', 900), '野狗'],
    [
      'spouse=901 → 魔王本人',
      (f) => {
        f.store.set('cflag:1:601', 901);
        // 避免退到 ELSE 分支 2 时因 cflag:0:601/cflag:1:6 都缺省为 0 而
        // 意外撞对同一个「你」，把 901 分支本身的必要性掩盖掉
        f.store.set('cflag:0:601', 1);
        f.store.set('cflag:1:6', 2);
      },
      '你',
    ],
    [
      'spouse=0 → 委托 CHARA_MARRIGE_BEFORE（code=0 早退为无）',
      (f) => {
        f.store.set('cflag:1:601', 0);
        f.store.set('talent:1:320', 0);
      },
      '无',
    ],
    [
      'spouse=902 → LOVER_NAMES 登记表（CFLAG:606）',
      (f) => {
        f.store.set('cflag:1:601', 902);
        f.store.set('cflag:1:606', 1);
      },
      '温柔的青年',
    ],
    [
      'ELSE 分支 1：EX_TALENT:2 非零且 SEARCH_FAMILY 未命中 → 无',
      (f) => {
        f.store.set('cflag:1:601', 903);
        f.store.set('cflag:0:601', 1); // 避免与 cflag:1:6 缺省值 0 撞上分支 2
        f.store.set('ex_talent:1:2', 1);
      },
      '无',
    ],
    [
      'ELSE 分支 2：CFLAG:0:601 与 CFLAG:cid:6 同值 → 魔王本人',
      (f) => {
        f.store.set('cflag:1:601', 903);
        f.store.set('cflag:0:601', 55);
        f.store.set('cflag:1:6', 55);
      },
      '你',
    ],
    [
      'ELSE 分支 3：spouse%10===9 且 SEARCH_FAMILY 命中 → 对方名字',
      (f) => {
        f.store.set('cflag:1:601', 909);
        f.store.set('cflag:0:601', 1);
        f.store.set('talent:1:165', 1);
        f.store.set('talent:2:171', 1);
      },
      '乙',
    ],
    [
      'ELSE 分支 3：spouse%10===9 但 SEARCH_FAMILY 未命中 → 无',
      (f) => {
        f.store.set('cflag:1:601', 909);
        f.store.set('cflag:0:601', 1);
      },
      '无',
    ],
    [
      'ELSE 默认：查 ITEMNAME 表',
      (f) => {
        f.store.set('cflag:1:601', 903);
        f.store.set('cflag:0:601', 1);
        f.store.set('itemname:903', '某道具');
      },
      '某道具',
    ],
  ];

  for (const [label, setup, expected] of CASES) {
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    add_chara(fixture, 1, '甲');
    add_chara(fixture, 2, '乙');
    setup(fixture);
    const { marriage_bracket_text } = fixture.load_module(
      'page/page-chara-info',
    );
    assert.equal(marriage_bracket_text(1), expected, label);
  }
});

test('SHOW_CHARA_MONEY_LIST：按 CFLAG:580 降序，取值相同按迭代顺序（稳定排序）', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  add_chara(fixture, 2, '乙');
  add_chara(fixture, 3, '丙');
  fixture.store.set('cflag:1:580', 100);
  fixture.store.set('cflag:2:580', 300);
  fixture.store.set('cflag:3:580', 300);
  const { show_chara_money_list } = fixture.load_module('page/page-chara-info');

  const order = show_chara_money_list(0);

  assert.deepEqual(order, [2, 3, 1], '300 并列维持原顺序，300 都在 100 之前');
  assert.equal(printed_includes(fixture, '所持金:300'), true);
});

test('SHOW_CHARA_DEBT_LIST：按 CFLAG:582 升序（负值越小债务越多，越靠前），显示取反', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  add_chara(fixture, 2, '乙');
  fixture.store.set('cflag:1:582', -50);
  fixture.store.set('cflag:2:582', -200);
  const { show_chara_debt_list } = fixture.load_module('page/page-chara-info');

  const order = show_chara_debt_list(0);

  assert.deepEqual(order, [2, 1], '负债更多（更负）排前');
  assert.equal(printed_includes(fixture, '借金:200'), true, '显示为正数');
});

// —— CHARA_INFO 主循环 ——

test('CHARA_INFO：魔王行的 [0] 是真按钮（名册轮次白名单非空，纯文本行敲不进编号，#530）', async () => {
  // 名册这一轮的白名单非空——角色行按角色号、排序表头 1200-1700、翻页
  // 997/998、返回 999 都在上面打印过；而 added_chara_ids() 把 0 滤掉了，
  // **没有别的按钮编号是 0**。魔王行若是纯文本，玩家敲 0 被引擎拒收
  // （夹具同款校验当场抛「输入不合法」），`result === 0` 就成了死支路。
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  // 等级设成可区分的值：魔王行的名字与等级在同一个 text 格里，编号格只有
  // `[0] `——地址（cflag:0:9）读错时下面那条断言必须红（M11210）
  fixture.store.set('cflag:0:9', 7);
  const { chara_info } = fixture.load_module('page/page-chara-info');

  // 点魔王行 → 个别页 [100] 返回 → 名册 [999] 返回主菜单
  fixture.set_inputs(0, 100, 999);
  const result = await chara_info();

  assert.equal(result, 0, '999 返回主菜单');
  assert.equal(
    printed_includes(fixture, 'NO.0'),
    true,
    '魔王(0) 的个别信息页已打开（:`581` result === 0 的分支可达）',
  );
  const rendered = fixture.lines_history
    .filter((line) => line.type === 'button')
    .map((line) => line.rendered);
  assert.ok(
    rendered.some((text) => text === '[0] '),
    `魔王行的编号按钮由引擎拼 [0]（实显：${JSON.stringify(rendered.slice(0, 6))}…）`,
  );
  assert.ok(
    printed_includes(fixture, '你 LV7'),
    `魔王行的等级取自 cflag:0:9，名字与等级同格实显（实际文本格：${JSON.stringify(
      fixture.lines_history
        .filter(
          (line) => line.type === 'text' && (line.text ?? '').includes('你'),
        )
        .map((line) => line.text),
    )}）`,
  );
});

test('CHARA_INFO：[1600]/[1700] 分别进两个真身流程，返回后名册整屏重进（#545）', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  const { chara_info } = fixture.load_module('page/page-chara-info');

  // 1600 → 统一卖春积极性真身（选 [2003] 取消，不写任何值）→ JUMP 重进
  // 1700 → 换号真身（[1999] 結束换号）→ JUMP 重进 → 999 返回主菜单
  fixture.set_inputs(1600, 2003, 1700, 1999, 999);
  const result = await chara_info();

  assert.equal(result, 0, '999 返回主菜单');
  assert.equal(
    printed_includes(fixture, '统一设置迷宫内角色的"卖春积极性"'),
    true,
    '1600 进统一卖春积极性真身（首页提示语）',
  );
  assert.equal(
    printed_includes(fixture, '已将当前迷宫'),
    false,
    '[2003] 取消不写值、不播报设置完成',
  );
  assert.equal(
    printed_includes(fixture, '交换角色的排序编号'),
    true,
    '1700 进换号真身（首页提示语）',
  );
  assert.equal(
    printed_includes(fixture, '@换号'),
    false,
    '换号不再是运行时占位（#545 前是存根）',
  );
  assert.equal(
    printed_includes(fixture, '一并调整全部角色的卖春积极性'),
    false,
    '统一卖春积极性不再是运行时占位',
  );
  assert.equal(fixture.store.get('cflag:1:120'), undefined, '未写卖春积极性');
});

test('CHARA_INFO：名册每页 24 行（NUM_PAGE）——第 24 人还在第 1 页，第 25 人只在第 2 页', async () => {
  const fixture = create_era_fixture();
  // 角色号 1..25：25 人正好跨两页（第 1 页 24 行、第 2 页 1 行）
  const chara_ids = Array.from({ length: 25 }, (_, index) => index + 1);
  add_chara(fixture, 0, '你');
  for (const cid of chara_ids) add_chara(fixture, cid, `角色${cid}`);
  const { chara_info } = fixture.load_module('page/page-chara-info');

  fixture.set_inputs(998, 997, 997, 999); // 下一页 → 上一页 ×2 → 返回主菜单
  assert.equal(await chara_info(), 0);

  // 每次绘制以 [998] 收尾，用它把四次绘制切片。角色行的按钮正文自 #535 起
  // 为空（编号由引擎按 showAcc 拼，见 print_chara_row），旧写法按 text 匹配
  // `/^\[\d+\]$/` 切不动了——改按快捷键数值筛：角色号是 1..25，排序表头
  // 1200-1700、翻页 997/998/999 都在这个区间之外。魔王行的编号格快捷键是 0
  // （正文同为空的按钮），也由这条筛选天然排除。
  const draws = [];
  let start = 0;
  fixture.lines_history.forEach((line, idx) => {
    if (line.type === 'button' && line.accelerator === 998) {
      draws.push(fixture.lines_history.slice(start, idx + 1));
      start = idx + 1;
    }
  });
  assert.equal(draws.length, 4, '初始 ＋ 下一页 ＋ 上一页 ×2');
  const chara_rows = (draw) =>
    draw.filter(
      (line) => line.type === 'button' && chara_ids.includes(line.accelerator),
    );
  const rows_of = (draw) => chara_rows(draw).map((line) => line.accelerator);

  assert.equal(
    rows_of(draws[0]).length,
    24,
    '第 1 页 24 行（魔王行的编号格快捷键是 0，不计）',
  );
  assert.equal(rows_of(draws[0]).includes(24), true, '第 24 人在第 1 页');
  assert.equal(rows_of(draws[0]).includes(25), false, '第 25 人不在第 1 页');
  assert.deepEqual(rows_of(draws[1]), [25], '第 2 页只剩第 25 人');
  assert.deepEqual(
    rows_of(draws[2]),
    rows_of(draws[0]),
    '翻回第 1 页又是 24 人',
  );
  assert.deepEqual(
    rows_of(draws[3]),
    rows_of(draws[0]),
    '第 1 页再按「上一页」停在第 1 页（no_page 不落到 0 以下）',
  );
  // 整屏路径上的实显也钉一遍（#535）：正文为空，实显恰好是 `[N] ` 一层前缀
  for (const row of chara_rows(draws[0])) {
    assert.equal(
      row.rendered,
      `[${row.accelerator}] `,
      '角色行实显的编号只有引擎拼的一层',
    );
  }
  assert.equal(
    printed_includes(fixture, '(总计25人)'),
    true,
    '总数是魔王之外的 25 人',
  );
});

test('CHARA_INFO：选中一个角色进入个别信息页，其返回值原样上浮', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  const { chara_info } = fixture.load_module('page/page-chara-info');

  // 选中角色 1（可调教，state=0）→ 个别页立即按「返回」(100) 退回名册，
  // 再从名册按「返回」(999) 退出
  fixture.set_inputs(1, 100, 999);
  const result = await chara_info();

  assert.equal(result, 0);
});

test('CHARA_INFO：个别页子调用完成后 continue 回名册主循环（非 1 即停留原页）', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  fixture.store.set('cflag:1:1', 8); // 拘束台
  const { chara_info } = fixture.load_module('page/page-chara-info');

  fixture.set_inputs(1, 102, 12, 999);
  const result = await chara_info();

  assert.equal(result, 0);
  assert.equal(fixture.store.get('cflag:1:1'), 0, '拘束台解放已生效');
});

// —— CHARA_INFO_INDIVIDUAL：分页与换人导航 ——

test('CHARA_INFO_INDIVIDUAL：前页/后页在 0..3 间夹紧', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  const { chara_info_individual } = fixture.load_module('page/page-chara-info');

  // 起始 sub_page=0，先按「前页」(101) 应保持在 0（不越界），再连按 4 次
  // 「后页」(102) 应停在 3，最后返回
  fixture.set_inputs(101, 102, 102, 102, 102, 100);
  const result = await chara_info_individual(1, [1]);

  assert.equal(result, 0);
});

test('CHARA_INFO_INDIVIDUAL：前一人/后一人按 chara_sort 顺位导航，含魔王(0)边界', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  add_chara(fixture, 2, '乙');
  const { chara_info_individual } = fixture.load_module('page/page-chara-info');

  // 从甲(1)开始：后一人 → 乙(2，此时已是末位，按钮不再画出）；
  // 前一人 → 回到甲(1)；再前一人 → 到魔王(0)（l_indx===0 特例）；
  // 魔王行 l_indx=-1 同样满足「后一人」判据（#391 修正，见文件头），
  // 按下后应回到顺位第一个 chara_sort[0]=1
  fixture.set_inputs(600, 500, 500, 600, 100);
  const result = await chara_info_individual(1, [1, 2]);

  assert.equal(result, 0);
});

test('CHARA_INFO_INDIVIDUAL：case 6 设为目标——按钮与分发共用同一门控条件', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  const { chara_info_individual } = fixture.load_module('page/page-chara-info');

  // is_assistable(1)!==0（cflag:1:0 默认不是 2）时「设为助手」按钮不画出，
  // 分发端对 case 7 的同一判据因此也无从触发——按钮门控与分发门控用的是
  // 同一个函数调用，不存在"画出但点了不生效"的缝隙，故这里只验证 case 6
  fixture.set_inputs(102, 6, 100);
  await chara_info_individual(1, [1]);

  assert.equal(fixture.store.get('flag:1'), 1, 'case 6：默认可调教，写入目标');
});

test('CHARA_INFO_INDIVIDUAL：case 7 满足条件时写入助手', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  fixture.store.set('cflag:1:0', 2); // 助手役
  const { chara_info_individual } = fixture.load_module('page/page-chara-info');

  fixture.set_inputs(102, 7, 100);
  await chara_info_individual(1, [1]);

  assert.equal(fixture.store.get('flag:2'), 1);
});

test('CHARA_INFO_INDIVIDUAL：case 12 拘束台解放仅在 state===8 时生效，并直接返回 0', async () => {
  {
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    add_chara(fixture, 1, '甲');
    fixture.store.set('cflag:1:1', 8);
    fixture.store.set('cflag:1:77', 1); // 附带清 777
    const { chara_info_individual } = fixture.load_module(
      'page/page-chara-info',
    );

    fixture.set_inputs(102, 12);
    const result = await chara_info_individual(1, [1]);

    assert.equal(result, 0, '直接返回名册，不是 continue 停留');
    assert.equal(fixture.store.get('cflag:1:1'), 0);
    assert.equal(fixture.store.get('cflag:1:777'), 0);
  }
  {
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    add_chara(fixture, 1, '甲');
    fixture.store.set('cflag:1:1', 0); // 非拘束台
    const { chara_info_individual } = fixture.load_module(
      'page/page-chara-info',
    );

    fixture.set_inputs(102, 100); // [12] 未渲染（state!==8），直接返回
    const result = await chara_info_individual(1, [1]);

    assert.equal(result, 0, '未命中时 continue，随后按返回退出');
    assert.equal(fixture.store.get('cflag:1:1'), 0, '未被改动');
  }
});

test('CHARA_INFO_INDIVIDUAL：case 13 强行召回门控 state===3，命中后调用 CHARA_INFO_CALLBACK 并返回 0', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  fixture.store.set('cflag:1:1', 3);
  fixture.store.set('cflag:0:9', 10);
  fixture.store.set('cflag:1:9', 1);
  fixture.store.set('maxbase:0:1', 100);
  fixture.store.set('base:0:1', 100);
  fixture.set_inputs(102, 13, 0); // sub_page->1, 强行召回, 确认「立即召回」
  const { chara_info_individual } = fixture.load_module('page/page-chara-info');

  const result = await chara_info_individual(1, [1]);

  assert.equal(result, 0);
  assert.equal(
    fixture.store.get('cflag:1:1'),
    0,
    'CHARA_INFO_CALLBACK 已清状态',
  );
});

test('CHARA_INFO_INDIVIDUAL：case 14/15/17 门控 state===0 才可用', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  fixture.store.set('cflag:1:1', 0);
  fixture.store.set('base:1:0', 0);
  fixture.store.set('maxbase:1:0', 10); // 体力未满，14 号回复体力按钮可见
  fixture.store.set('flag:10004', 0); // 金钱不够，走「金钱不够」分支但不抛错
  const { chara_info_individual } = fixture.load_module('page/page-chara-info');

  fixture.set_inputs(102, 14, 100); // sub_page->1, 回复体力（金钱不够仅播报）, 返回
  const result = await chara_info_individual(1, [1]);

  assert.equal(result, 0);
  assert.equal(printed_includes(fixture, '回复体力'), true);
  assert.equal(printed_includes(fixture, '提升等级'), true);
  assert.equal(printed_includes(fixture, '灵魂转移'), true);
});

test('CHARA_INFO_INDIVIDUAL：case 17 灵魂转移改写 current 为其返回值', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  fixture.store.set('cflag:1:1', 0);
  fixture.set_inputs(102, 17, 1, 100); // sub_page->1, 灵魂转移, 拒绝确认(RETURN ARG=1), 返回
  const { chara_info_individual } = fixture.load_module('page/page-chara-info');

  const result = await chara_info_individual(1, [1]);

  assert.equal(result, 0, '拒绝确认后 current 仍是 1，按返回正常退出');
});

test('CHARA_INFO_INDIVIDUAL：case 9 收藏切换仅对非魔王角色生效', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  const { chara_info_individual } = fixture.load_module('page/page-chara-info');

  fixture.set_inputs(9, 9, 100);
  await chara_info_individual(1, [1]);

  assert.equal(fixture.store.get('cflag:1:700'), 0, '收藏又取消，回到 0');
});

// CASE 18（SET_BICH_LEVEL）：原作与本port都没有为它画按钮（源码逐行核对，
// 只有 `CASE 18` 分支体，DRAW_PAGE 段无对应 PRINTLC/PRINTBUTTON），只能靠
// 输入框直接敲数字触发——本夹具的 era.input() 白名单校验镜像引擎行为，
// 不打算模拟「跳过白名单直接敲字」，故这里不测；set_bich_level() 本体已有
// 专属覆盖，见 test/kojo-dungeon-bitch.test.js。

// CASE >=15000（跳转到其他角色）：加速键编码目标角色 ID，供别的页面内嵌
// 「快速跳到角色 X 信息页」按钮使用；截至本票，ere/ 里没有任何页面已经
// 布这种按钮（全库检索 `15000` 只有本文件自己的分发端），故本轮同样无法
// 通过 era.input() 的白名单驱动到——留给接入该跳转的调用方在自己的测试里
// 覆盖端到端路径。

test('CHARA_INFO_INDIVIDUAL_WAPPED：顺位表是全部已加入角色（按排序编号），前一人/后一人照它走（#545 返工）', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  for (const cid of [1, 2, 3]) add_chara(fixture, cid, `角色${cid}`);
  // 原作这里现建的是 1..CHARANUM 的序号顺位表＝「编号」视图那套顺序；ere 侧
  // 换成同一套排列键（PORTCFLAG:排序编号）：3 号持最小、1 号持最大 → [3,2,1]
  fixture.store.set('portcflag:3:排序编号', 1);
  fixture.store.set('portcflag:1:排序编号', 3);
  const { chara_info_individual_wrapped } = fixture.load_module(
    'page/page-chara-info',
  );

  // 从 2 号进（顺位表 [3,2,1] 的中间一位）：后一人应到 1 号——按 ID 序
  // （[1,2,3]）走会到 3 号，两侧答案不同
  fixture.set_inputs(600, 100);
  const result = await chara_info_individual_wrapped(2);

  assert.equal(result, 0);
  const nos = fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => (line.text.match(/NO\.(\d+)/) ?? [])[1])
    .filter(Boolean);
  assert.deepEqual(nos, ['2', '1'], '后一人按排序编号顺位走到 1 号');
});

// —— 未落地调用一律走存根，登记与实现同步 ——

test('STUBBED_CALLS：只剩调试一条在列；装备两处与一人称改名随 #546 换真身移出，兼职与更换立绘随 #542 判死移出，统一积极性与换号随 #545 换真身移出', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  const { STUBBED_CALLS, chara_info_individual } = fixture.load_module(
    'page/page-chara-info',
  );

  // SHOW_BUTTON_NAME_EDIT / CHARA_INFO_NAME_EDIT 自 #384 起是真身
  // （ere/chara/chara-name-edit.js），SHOW_BUTTON_CHILD_CARE / CHILD_CARE_CHARA
  // 自 #401 起是真身（ere/event/event-pregnancy.js），转职 / 魔的诱惑 / 结婚
  // 三对自 #393 起是真身（ere/chara/chara-job-change.js、chara-temptation.js、
  // chara-marriage.js），统一卖春积极性 / 换号自 #545 起是真身
  // （ere/page/page-uniform-bitch-level.js、page-chara-number-swap.js），
  // 装备详情三函数与 RANDOM_SELF_CALL 的 MODE 1 自 #546 起是真身
  // （ere/system/equip/equip-show.js、ere/chara/chara-self-call.js）
  assert.ok(
    STUBBED_CALLS.includes('CHAR_DEBUG'),
    'CHAR_DEBUG 应在存根登记表内',
  );
  // PTJ_BUTTON / 更换立绘 自 #542 起是判死终态（打工 MOD 与立绘系统不移植），
  // 入口提示行不是存根占位，不再进名单；清单同名行仍在函数表（改判不移植）
  for (const name of ['PTJ_BUTTON', '更换立绘']) {
    assert.ok(
      !STUBBED_CALLS.includes(name),
      `${name} 已判不移植（#542），不应再留在存根名单里`,
    );
  }
  // #546 起 [16] 装备情报按钮与详情流程换真身：随真身名单核对，见下方专测
  for (const name of [
    'SHOW_BUTTON_EQUIP',
    'EQUIP_ST_SHOW',
    'RANDOM_SELF_CALL',
  ]) {
    assert.ok(
      !STUBBED_CALLS.includes(name),
      `${name} 已有真身（#546），不应再留在本文件的存根名单里`,
    );
  }
  // SHOW_CHARA_INFO 自 #390 起是真身（ere/page/page-chara-info-show.js），
  // 三对动作按钮与流程自 #393 起是真身——两票各加一批，这里取并集
  for (const name of [
    'SHOW_BUTTON_CHILD_CARE',
    'CHILD_CARE_CHARA',
    'SHOW_CHARA_INFO',
    'SHOW_BUTTON_JOB_CHANGE',
    'SHOW_BUTTON_TEMPTATION',
    'SHOW_BUTTON_MARRIAGE',
    'CHARA_INFO_JOB_CHANGE',
    'TEMPTATION',
    'MARRIAGE',
    '统一卖春积极性',
    '换号',
  ]) {
    assert.ok(
      !STUBBED_CALLS.includes(name),
      `${name} 已有真身，不应再留在本文件的存根名单里`,
    );
  }
  // 绘制期：改名自 #384、三对动作按钮自 #393、育儿室自 #401 起都是真按钮
  // （都在判定放行时才渲染）；#546 起装备详情（sub_page 1/2 的 [16]）也是真按钮
  fixture.set_inputs(100);
  const result = await chara_info_individual(1, [1]);
  assert.equal(result, 0);
  const rendered = fixture.lines_history
    .filter((line) => line.type === 'button')
    .map((b) => b.rendered);
  assert.ok(
    rendered.includes('[0] 改名 ') && rendered.includes('[1] 还原名字 '),
    '改名 / 还原名字按钮已渲染（#384 真身）',
  );
  // 角色 1：状态 0（可转职 / 可结婚）、等级 0（转职按钮照渲染，只是染灰）、
  // 非侵攻中（诱惑按钮不渲染）
  assert.ok(rendered.includes('[2] 转职 '), '转职按钮已渲染（#393 真身）');
  assert.equal(
    rendered.some((text) => text.includes('魔的诱惑')),
    false,
    '非侵攻中 → 诱惑按钮不渲染（:29-31）',
  );
  assert.ok(rendered.includes('[4] 结婚 '), '结婚按钮已渲染（#393 真身）');
  assert.ok(
    !rendered.includes('[5] 前往育儿室'),
    '角色 1 不在育儿室（CFLAG:1:1 = 0）→ 育儿室按钮不渲染（#401 真身，:459-467）',
  );
  assert.ok(
    !rendered.some((text) => text.includes('装备情报')),
    'sub_page 0 不渲染 [16] 装备情报（:873 的 ELSEIF 不含 0）',
  );
  for (const stub_name of [
    'SHOW_BUTTON_JOB_CHANGE',
    'SHOW_BUTTON_TEMPTATION',
    'SHOW_BUTTON_MARRIAGE',
    'CHARA_INFO_JOB_CHANGE',
    'TEMPTATION',
    'MARRIAGE',
    'SHOW_BUTTON_EQUIP',
    'EQUIP_ST_SHOW',
    'RANDOM_SELF_CALL',
  ]) {
    assert.equal(
      printed_includes(fixture, `@${stub_name}`),
      false,
      `${stub_name} 的占位行不该再出现`,
    );
  }
});

// —— #546：装备详情与自定义一人称的接线 ——

test('[16] 装备情报按钮（:880）：CHECK_ABLE_TO_SHOW_EQUIP 放行才渲染——表驱动', async () => {
  // 五道 OR 之一成立 = 放行（此处用善恶值 ≤0 与顺从 >0 两道代表）；
  // 全不满足（善恶值 1）= 按钮整个不出现
  const table = [
    ['善恶值 0 → 渲染', { 'cflag:1:151': 0 }, true],
    ['顺从 1 → 渲染', { 'abl:1:10': 1 }, true],
    ['全不满足（善恶值 1）→ 不渲染', { 'cflag:1:151': 1 }, false],
  ];
  for (const [label, seeds, expected] of table) {
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    add_chara(fixture, 1, '甲');
    for (const [key, value] of Object.entries(seeds)) {
      fixture.store.set(key, value);
    }
    fixture.set_inputs(102, 100); // 后页到 sub_page 1，再返回
    await fixture
      .load_module('page/page-chara-info')
      .chara_info_individual(1, [1]);
    const buttons = fixture.lines_history.filter(
      (line) => line.type === 'button' && line.accelerator === 16,
    );
    assert.equal(buttons.length > 0, expected, label);
    if (expected) {
      assert.equal(buttons[0].rendered, '[16] 装备情报 ', label);
    }
  }
});

test('case 16（:1070-1074）：印出装备状态行并等键，重绘回页（LOCAL = LINECOUNT 是死赋值）', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  fixture.store.set('cflag:1:151', 0); // 放行 [16]
  fixture.store.set('cflag:1:550', 47 + 2 * 1000); // 战锤 +2
  fixture.set_inputs(102, 16, 100);
  const result = await fixture
    .load_module('page/page-chara-info')
    .chara_info_individual(1, [1]);
  assert.equal(result, 0);
  assert.ok(
    printed_includes(fixture, '*160的打击力') &&
      printed_includes(fixture, '*30％概率打偏'),
    '装备状态行随 [16] 印出',
  );
  assert.ok(printed_includes(fixture, '战锤+2'), '名称行印出');
  // WAIT：详情行之后有一次真实等待（rows_at_wait 在详情行之后）
  const waited = fixture.waits.filter((w) => w.waited);
  assert.ok(waited.length >= 1, '详情后 WAIT 至少一次');
  const equip_pos = fixture.lines_history.findIndex((line) =>
    (line.text ?? '').includes('*160的打击力'),
  );
  assert.ok(
    equip_pos >= 0 && fixture.lines_history[equip_pos].row !== undefined,
    '装备详情行是 Row 条目',
  );
  assert.ok(
    waited.some((w) => w.rows_at_wait > fixture.lines_history[equip_pos].row),
    '等待发生在装备详情行之后',
  );
  // 等键后 GOTO DRAW_PAGE：同一轮里页导航按钮再次出现
  assert.ok(
    fixture.lines_history.filter(
      (line) => line.type === 'button' && line.accelerator === 100,
    ).length >= 2,
    '详情显示后页面重绘（返回按钮再次出现）',
  );
});

test('case 8（:1062）：[8] 一人称重设走 MODE 1 自定义输入，写入 CSTR:60 与档位 0', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  fixture.set_inputs(8, '在下', 100);
  const result = await fixture
    .load_module('page/page-chara-info')
    .chara_info_individual(1, [1]);
  assert.equal(result, 0);
  assert.ok(
    printed_includes(fixture, '请输入想设定的第一人称，若不输入择随机设定'),
    'MODE 1 的提示行印出（1:1 照抄原作）',
  );
  assert.ok(
    printed_includes(fixture, '（输入 0 随机设定）'),
    'ere 侧补的「输入 0」提示行印出（有意偏离，#567）',
  );
  assert.equal(fixture.store.get('cstr:1:60'), '在下');
  assert.equal(fixture.store.get('cflag:1:450'), 0);
});

test('case 8：输入 0 代替空输入（有意偏离，原作会把一人称写成「0」）→ 随机重掷路径（<9 直设「我」）', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  fixture.set_inputs(8, 0, 100);
  await fixture
    .load_module('page/page-chara-info')
    .chara_info_individual(1, [1]);
  assert.equal(fixture.store.get('cstr:1:60'), '我');
  assert.equal(fixture.store.get('cflag:1:450'), 9);
});

// —— #542：PTJ_BUTTON 与更换立绘的判死落点 ——

test('更换立绘按钮（:870-871）：守卫去掉恒关的立绘开关，按钮保留可见——表驱动', async () => {
  // 原作守卫是 `SIF 立绘 && CFLAG:ARG:1 == 0 && ARG != MASTER`；立绘系统判
  // 不移植（#542）后开关恒关，照抄守卫按钮永不可见——有意偏离：去掉开关
  // 条件、保留后两条，玩家能按到 [20] 并看到不移植提示（#540 范围决定 4）
  // [标签, 角色, CFLAG:1:1, 期望 [20] 是否渲染]
  const table = [
    ['奴隶 + 状态 0：渲染', 1, 0, true],
    ['奴隶 + 状态 2（侵攻中）：不渲染', 1, 2, false],
    ['魔王（ARG == MASTER）：不渲染', 0, 0, false],
  ];
  for (const [label, cid, state, expected] of table) {
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    add_chara(fixture, 1, '甲');
    fixture.store.set('cflag:1:1', state);
    fixture.set_inputs(100);
    await fixture
      .load_module('page/page-chara-info')
      .chara_info_individual(cid, [1]);
    const rendered = fixture.lines_history
      .filter((line) => line.type === 'button')
      .some((b) => b.rendered === '[20] 更换立绘');
    assert.equal(rendered, expected, label);
  }
});

test('更换立绘按钮（CASE 20）：按下打一行不移植提示并等键', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  fixture.set_inputs(20, 100);
  await fixture
    .load_module('page/page-chara-info')
    .chara_info_individual(1, [1]);

  const line = fixture.text_lines().find((t) => t.includes('@更换立绘'));
  assert.ok(line, '提示行必须带原作函数名 @更换立绘（清单行的检索键）');
  assert.ok(
    line.includes('不在移植范围') && line.includes('素材不在仓库'),
    `不移植提示要说清为何：${line}`,
  );
  assert.equal(fixture.waits.length, 1, '提示行必须等键（#73 同款）');
});

test('卖春积极性按钮（PTJ_BUTTON 默认态）：档位文案随 CFLAG:120 变，按下进真身——表驱动', async () => {
  // :883 CALL PTJ_BUTTON(ARG)：打工 MOD（EX_FLAG:9000 第 2 位）判不移植
  // （#542），只保留默认态分支——PTJ.ERB:5 的 ELSE = SHOW_BUTTON_BICH_LEVEL(18,ARG)
  // 的 [18] 卖春积极性按钮；打工变体（SHOW_PTJ_BUTTON_LEVEL）不渲染
  // [CFLAG:1:120, 期望按钮正文]
  const table = [
    [0, '[18] 卖春积极性 - 没有'],
    [1, '[18] 卖春积极性 - 普通'],
    [5, '[18] 卖春积极性 - 5等级'],
  ];
  for (const [level, expected] of table) {
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    add_chara(fixture, 1, '甲');
    fixture.store.set('cflag:1:120', level);
    fixture.set_inputs(102, 100); // 翻到 sub_page 1 后退出
    await fixture
      .load_module('page/page-chara-info')
      .chara_info_individual(1, [1]);
    const rendered = fixture.lines_history
      .filter((line) => line.type === 'button')
      .map((b) => b.rendered);
    assert.ok(
      rendered.includes(expected),
      `sub_page 1 应渲染 [18] 卖春积极性按钮（CFLAG:120 = ${level}）：${rendered}`,
    );
    assert.ok(
      rendered.some((text) => text.startsWith('[18] 卖春积极性')),
      '[18] 编号只有一个（打工变体不叠加渲染）',
    );
  }
});

test('卖春积极性按钮（CASE 18）：按下进 set_bich_level 真身', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  fixture.set_inputs(102, 18, 3, 100); // 翻页 → [18] → 选 3 → 退出
  await fixture
    .load_module('page/page-chara-info')
    .chara_info_individual(1, [1]);

  assert.equal(fixture.store.get('cflag:1:120'), 3);
  assert.ok(
    fixture.text_lines().some((t) => t.includes('卖春积极性变为等级3了')),
    'SET_BICH_LEVEL 真身的回显',
  );
});

test('三动作按钮（#393）：[2] 转职 / [3] 魔的诱惑 / [4] 结婚×恋人设定 的渲染随状态变——表驱动', async () => {
  // 三个 SHOW_BUTTON_* 的实参（快捷键 2/3/4 与真角色号）都在这一行接线里：
  // 换号、换实参、染色与否都在这里露馅。
  // [标签, 状态, 等级, 期望的三支按钮正文（按渲染顺序）, 期望的 #646464 次数]
  const table = [
    [
      '状态 0 + 等级 50：转职与结婚都亮着',
      0,
      50,
      ['[2] 转职 ', '[4] 结婚 '],
      0,
    ],
    ['状态 0 + 等级 49：转职染灰', 0, 49, ['[2] 转职 ', '[4] 结婚 '], 1],
    [
      '状态 2 侵攻中的勇者：转职不渲染，诱惑与恋人设定各一个',
      2,
      50,
      ['[3] 魔的诱惑 ', '[4] 恋人设定 '],
      0,
    ],
    [
      '状态 1 待机：只留灰着的转职（另两处灰来自 #384 的改名/还原名字）',
      1,
      50,
      ['[2] 转职 '],
      3,
    ],
  ];
  for (const [label, state, level, expected, gray] of table) {
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    add_chara(fixture, 1, '甲');
    fixture.store.set('cflag:1:1', state);
    fixture.store.set('cflag:1:9', level);
    fixture.set_inputs(100);

    assert.equal(
      await fixture
        .load_module('page/page-chara-info')
        .chara_info_individual(1, [1]),
      0,
      label,
    );

    const rendered = fixture.lines_history
      .filter((line) => line.type === 'button')
      .map((line) => line.rendered)
      .filter((text) => /^\[[234]\]/.test(text));
    assert.deepEqual(rendered, expected, label);
    assert.equal(
      fixture.calls.filter(
        (call) => call.api === 'setColor' && call.args[0] === '#646464',
      ).length,
      gray,
      `${label}：灰值 setColor 次数（转职按钮的档位判定拿到的是真角色号）`,
    );
  }
});

test('三动作接线（#393）：[2]/[3]/[4] 分别进转职 / 魔的诱惑 / 结婚三支真身', async () => {
  {
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    add_chara(fixture, 1, '甲');
    fixture.store.set('cflag:1:9', 50); // 等级门放行
    fixture.set_inputs(2, 999, 100); // 转职菜单 → [999] 返回 → 退出
    assert.equal(
      await fixture
        .load_module('page/page-chara-info')
        .chara_info_individual(1, [1]),
      0,
    );
    assert.ok(
      printed_includes(fixture, '请选择想要契约的魔兽') === false,
      '转职真身的菜单里没有契约魔兽那一问（那是选完魔物使之后）',
    );
    assert.ok(
      buttons_with(fixture, 12).length > 0,
      '按下 [2] 后画出了转职真身的 [12] 魔物使（未选职业所以没有播报）',
    );
    assert.equal(printed_includes(fixture, '@CHARA_INFO_JOB_CHANGE'), false);
    assert.equal(
      buttons_with(fixture, 100).length,
      1,
      '转职返回 0 时上浮回名册（页不再重画一次）',
    );
  }
  {
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    add_chara(fixture, 1, '甲');
    fixture.store.set('cflag:1:1', 2); // 侵攻中 → 诱惑按钮渲染
    fixture.store.set('base:0:1', 0); // 魔王魔力耗尽 → 真身当场返回
    fixture.set_inputs(3, 100);
    assert.equal(
      await fixture
        .load_module('page/page-chara-info')
        .chara_info_individual(1, [1]),
      0,
    );
    assert.ok(
      printed_includes(fixture, '*你的魔力耗尽了*'),
      '按下 [3] 后进了诱惑真身',
    );
    assert.equal(printed_includes(fixture, '@TEMPTATION'), false);
    assert.equal(
      buttons_with(fixture, 100).length,
      1,
      '诱惑返回 0 时上浮回名册（页不再重画一次）',
    );
  }
  {
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    add_chara(fixture, 1, '甲');
    fixture.set_inputs(4, 999, 100); // 结婚菜单 → [999] 返回 → 退出
    assert.equal(
      await fixture
        .load_module('page/page-chara-info')
        .chara_info_individual(1, [1]),
      0,
    );
    assert.ok(
      printed_includes(fixture, '[甲目前结婚对象:无]'),
      '按下 [4] 后进了结婚真身的菜单',
    );
    assert.equal(printed_includes(fixture, '@MARRIAGE'), false);
    assert.equal(
      buttons_with(fixture, 100).length,
      1,
      '结婚返回 0 时也上浮回名册',
    );
  }
});

test('三动作接线（#393）：被调方返回 2（防御支）时不上浮，落回 INPUT_LOOP 重画', async () => {
  // 三个动作的返回 2 都是「按钮本不该显示」的防御支（chara-job-change.js:279
  // 的侵攻中勇者 / chara-temptation.js:156 的非侵攻中 / chara-marriage.js:1095
  // 的不可结婚状态）——原作 :1094-1099 的返り値による処理写的是「2なら再入力」。
  // EraElectron 的渲染层只回传本轮已打印按钮的快捷键（夹具同款白名单），
  // 「未渲染按钮的编号」到不了游戏逻辑，所以这里按夹具头注的既有手法
  // （「SDK 是普通可变对象、可在 require 之后就地替换函数」）直接替换
  // era.input 把 2 喂进去——测的是接线本身：谁把 2 当结果时会被上浮。
  const cases = [
    ['chara_info_job_change：侵攻中的勇者（状态 2）', 2, 2],
    ['temptation：非侵攻中（状态 0）', 0, 3],
    ['marriage：不可结婚状态（状态 1）', 1, 4],
  ];
  for (const [label, state, accel] of cases) {
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    add_chara(fixture, 1, '甲');
    fixture.store.set('cflag:1:1', state);
    const answers = [accel, 100];
    fixture.era.input = async () => answers.shift();

    const result = await fixture
      .load_module('page/page-chara-info')
      .chara_info_individual(1, [1]);

    assert.equal(result, 0, `${label}：2 不上浮，页重画后由 [100] 收尾`);
    assert.deepEqual(
      answers,
      [],
      `${label}：两次输入都被消费（真返回 2 会提前退出）`,
    );
    assert.equal(
      buttons_with(fixture, 100).length,
      2,
      `${label}：页重画了一次`,
    );
  }
});

test('三动作接线（#393）：诱惑真身不传随机源时走默认源（Math.random）', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  fixture.store.set('cflag:1:1', 2); // 侵攻中 → 诱惑按钮渲染
  fixture.store.set('maxbase:0:1', 2000);
  fixture.store.set('base:0:1', 2000); // 气力刚好够一场
  fixture.store.set('talent:1:73', 1); // 即落ち：判定恒成功
  fixture.set_inputs(3);
  // 页面调 `temptation(current)` 不传随机源（生产路径），默认源是
  // Math.random（chara-temptation.js 的 default_rand）——钉住它可跑通：
  // 固定到 0 后六轮各走 CASE 0，扣满 2000 气力、好感度 +60、不投诚
  fixture.override_math_random(() => 0);
  let result;
  try {
    result = await fixture
      .load_module('page/page-chara-info')
      .chara_info_individual(1, [1]);
  } finally {
    fixture.restore_math_random();
  }

  assert.equal(result, 0);
  assert.equal(
    fixture.store.get('base:0:1'),
    0,
    '气力按 TEMPTATION_MP_COST 扣完',
  );
  assert.equal(fixture.store.get('cflag:1:2'), 60, '六轮 CASE 0 各 +10');
  assert.equal(fixture.store.get('cflag:1:1'), 2, '好感度未满 1000：不投诚');
});

test('育儿室接线（#401）：在育儿室的角色渲染 [5] 按钮，按下后进 CHILD_CARE_CHARA 真身', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  fixture.store.set('cflag:1:1', 10); // 状态位 10 = 育儿室
  const { chara_info_individual } = fixture.load_module('page/page-chara-info');
  const era_flag = fixture.load_module('era-utils/era-flag');

  // 输入 5（育儿室）→ 真身跑完回到页内继续重绘 → 100 退出
  fixture.set_inputs(5, 100);
  assert.equal(await chara_info_individual(1, [1]), 0);

  const rendered = fixture.lines_history
    .filter((line) => line.type === 'button')
    .map((b) => b.rendered);
  assert.ok(
    rendered.includes('[5] 前往育儿室'),
    '育儿室里的角色应渲染按钮（CHECK_ABLE_TO_CHILD_CARE == 0）',
  );
  assert(
    fixture.lines_history.some((line) => line.text === '你去了甲的育儿室。'),
    '按下 [5] 后走真身的到访播报',
  );
  assert.equal(era_flag.target, 1, 'CHILD_CARE_CHARA 的 TARGET = ARG');
  assert.equal(
    printed_includes(fixture, '@CHILD_CARE_CHARA'),
    false,
    '不再打 CHILD_CARE_CHARA 的占位行',
  );
});

test('三动作接线（#393）：结婚成功后 MARRIAGE 的返回 1 上浮为「回合结束」', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  fixture.store.set('item:100', 1);
  fixture.store.set('itemname:100', '怪物');
  // [4] → 结婚菜单 → 选 100 号怪物 → 婚礼跑完（MARRIAGE 返回 1）→ 上浮
  fixture.set_inputs(4, 100, 100); // 末尾的 100 只在返回值没上浮时才会被消费
  const result = await fixture
    .load_module('page/page-chara-info')
    .chara_info_individual(1, [1]);

  assert.equal(result, 1, '个别信息页把 1 上浮给 CHARA_INFO（回合结束）');
  assert.ok(printed_includes(fixture, '举行了结婚典礼'));
});

// —— #545：#535 验收转来的三处覆盖缺口 ——

/**
 * 按名册每轮收尾的 [998] 按钮把 lines_history 切成「每次绘制」的切片。
 * 每轮绘制的收尾固定是 上一页/返回/下一页 三连（print_sort_header_row 之后），
 * [998] 是最后一枚。
 */
function draws_by_998(fixture) {
  const draws = [];
  let start = 0;
  fixture.lines_history.forEach((line, idx) => {
    if (line.type === 'button' && line.accelerator === 998) {
      draws.push(fixture.lines_history.slice(start, idx + 1));
      start = idx + 1;
    }
  });
  if (start < fixture.lines_history.length) {
    draws.push(fixture.lines_history.slice(start));
  }
  return draws;
}

test('排序表头：[1200]-[1500] 四个快捷键各自切到对应视图——表驱动（#535 转来的覆盖缺口）', async () => {
  // 四个视图各有一个只在它上面出现的行内标记：1200＝攻防善恶列、
  // 1300＝[婚:…] 婚姻括号、1400＝所持金列、1500＝借金列。按下快捷键后的
  // 那次重绘必须出现对应标记——快捷键写错（如 1200 拼成 1201）会当场被
  // 输入白名单拒收，视图接错则标记缺失
  const VIEWS = [
    [1200, '攻击15/防御20'],
    [1300, '[婚:'],
    [1400, '所持金:300'],
    [1500, '借金:200'],
  ];
  for (const [accel, marker] of VIEWS) {
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    add_chara(fixture, 1, '甲');
    // 下标含义（CHARA_INFO ver1.0.1.ERB:158-163 同款）：CFLAG:x:13 攻击 /
    // :14 防御 / :580 所持金 / :582 借金（负值存储，显示取反）
    fixture.store.set('cflag:1:13', 15);
    fixture.store.set('cflag:1:14', 20);
    fixture.store.set('cflag:1:580', 300);
    fixture.store.set('cflag:1:582', -200);
    const { chara_info } = fixture.load_module('page/page-chara-info');

    fixture.set_inputs(accel, 999);
    await chara_info();

    const draws = draws_by_998(fixture);
    assert.equal(draws.length, 2, `accel=${accel}：初始 ＋ 切换后各一次绘制`);
    const texts = draws[1]
      .filter((line) => line.type === 'text')
      .map((line) => line.text);
    assert.ok(
      texts.some((text) => text.includes(marker)),
      `accel=${accel} 的重绘应含「${marker}」标记（实际：${JSON.stringify(texts)}）`,
    );
    // 表头按钮每轮各一枚（快捷键数值由这批按钮进白名单）
    assert.equal(
      buttons_with(fixture, accel).length,
      2,
      `accel=${accel}：两次绘制各一枚表头按钮`,
    );
  }
});

test('名单行片段：<爱慕>/<淫乱>/<未陷落> 三分支与收藏 [☆]（#535 转来的覆盖缺口）', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  add_chara(fixture, 2, '乙');
  add_chara(fixture, 3, '丙');
  // TALENT:85 爱慕 / TALENT:76 淫乱（两分支之外的第三支是 <未陷落>）；
  // CFLAG:700 收藏（favorite_fragment 的读取地址）
  fixture.store.set('talent:1:85', 1);
  fixture.store.set('talent:2:76', 1);
  fixture.store.set('cflag:3:700', 1);
  const { show_chara_info_list } = fixture.load_module('page/page-chara-info');

  show_chara_info_list(0);

  // 行尾片段格（love_lewd + favorite + team + return）与姓名格是同一次
  // 多列调用的两个格，共享 row 号——按行聚合后再断言
  const row_of = (name) => {
    const cell = fixture.lines_history.find(
      (line) =>
        line.type === 'text' && line.row > 0 && line.text.includes(name),
    );
    assert.ok(cell, `应有 ${name} 的行`);
    return fixture.lines_history
      .filter((line) => line.row === cell.row && line.type === 'text')
      .map((line) => line.text)
      .join('');
  };
  assert.ok(row_of('甲').includes('<爱慕>'), '爱慕分支');
  assert.ok(row_of('乙').includes('<淫乱>'), '淫乱分支');
  const none = row_of('丙');
  assert.ok(
    none.includes('<未陷落>'),
    `未陷落分支（实际：${JSON.stringify(none)}）`,
  );
  assert.ok(none.includes('[\u2606]'), '收藏标记读 cflag:cid:700');
  assert.equal(
    row_of('甲').includes('[\u2606]'),
    false,
    '未收藏的角色不带 [☆]',
  );
});

// —— #545：统一卖春积极性（ere/page/page-uniform-bitch-level.js） ——

test('统一卖春积极性：三个范围各写各的状态，魔王跳过，播报逐字——表驱动', async () => {
  // [范围按钮, 期望写入 cflag:120 的角色集合, 播报文案（{N} 已代入 3）]
  const SCOPES = [
    [
      2000,
      [1],
      '已将当前迷宫侵攻中的勇者（不含以后出现的新勇者），卖春积极性全设置为3了',
    ],
    [
      2001,
      [2],
      '已将当前迷宫全迎击中的奴隶（不含以后追加的新奴隶），卖春积极性全设置为3了',
    ],
    [
      2002,
      [1, 2],
      '已将当前迷宫所有侵攻与迎击者（不含以后新入迷宫的对象），卖春积极性全设置为3了',
    ],
  ];
  for (const [scope, expected, message] of SCOPES) {
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    add_chara(fixture, 1, '甲');
    add_chara(fixture, 2, '乙');
    add_chara(fixture, 3, '丙');
    add_chara(fixture, 4, '丁');
    // CFLAG:x:1 状态：2＝侵攻中、3＝迎击中、0＝可调教、7＝苗床；
    // 魔王也置成侵攻中，验证 SIF COUNT == MASTER 的跳过
    fixture.store.set('cflag:0:1', 2);
    fixture.store.set('cflag:1:1', 2);
    fixture.store.set('cflag:2:1', 3);
    fixture.store.set('cflag:3:1', 0);
    fixture.store.set('cflag:4:1', 7);
    const { uniform_bitch_level } = fixture.load_module(
      'page/page-uniform-bitch-level',
    );

    fixture.set_inputs(scope, 3);
    await uniform_bitch_level();

    for (const cid of [0, 1, 2, 3, 4]) {
      const hit = expected.includes(cid);
      assert.equal(
        fixture.store.get(`cflag:${cid}:120`),
        hit ? 3 : undefined,
        `scope=${scope}：角色 ${cid}${hit ? ' 应写入' : ' 不应写入'}`,
      );
    }
    assert.equal(
      fixture.lines_history.some((line) => line.text === message),
      true,
      `scope=${scope}：播报逐字（期望「${message}」）`,
    );
  }
});

test('统一卖春积极性：等级 [0]-[5] 六枚按钮、范围按钮实显与 [2003] 取消', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  fixture.store.set('cflag:1:1', 2);
  const { uniform_bitch_level } = fixture.load_module(
    'page/page-uniform-bitch-level',
  );

  fixture.set_inputs(2003);
  await uniform_bitch_level();

  // 四个范围按钮：正文保留原作 [ … ] 标签，编号由引擎拼一层
  assert.equal(
    buttons_with(fixture, 2000)[0].rendered,
    '[2000] [ 全侵攻中的勇者 ]',
    '范围按钮的实显',
  );
  for (const accel of [2000, 2001, 2002, 2003]) {
    assert.equal(buttons_with(fixture, accel).length, 1, `按钮 ${accel}`);
  }
  assert.equal(
    printed_includes(fixture, '要将积极性设置为多少？'),
    false,
    '[2003] 取消：不进等级选择（原作空 ELSE）',
  );
  assert.equal(fixture.store.get('cflag:1:120'), undefined, '取消不写值');

  {
    // 等级屏：六枚按钮的编号同样只由引擎拼一层（正文为空）
    const fixture2 = create_era_fixture();
    add_chara(fixture2, 0, '你');
    add_chara(fixture2, 1, '甲');
    fixture2.store.set('cflag:1:1', 2);
    const { uniform_bitch_level: run } = fixture2.load_module(
      'page/page-uniform-bitch-level',
    );
    fixture2.set_inputs(2002, 5);
    await run();
    for (const level of [0, 1, 2, 3, 4, 5]) {
      const button = buttons_with(fixture2, level)[0];
      assert.ok(button, `等级按钮 ${level} 已打印`);
      assert.equal(
        button.rendered,
        `[${level}] `,
        `等级按钮 ${level} 的实显只有引擎拼的一层前缀`,
      );
    }
    assert.equal(fixture2.store.get('cflag:1:120'), 5, '写入等级 5');
    assert.equal(
      printed_includes(fixture2, '要将积极性设置为多少？'),
      true,
      '等级屏提示语逐字（原作 :12/:33/:54 三处同文）',
    );
  }
});

// —— #545：换号（ere/page/page-chara-number-swap.js） ——

test('换号：显示守卫表驱动（状态 0/7、近卫排除、后代+铁石心肠放行）与 [SP] 标记', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲'); // 状态 0：列出
  add_chara(fixture, 2, '乙'); // 状态 2 侵攻中：不列
  add_chara(fixture, 3, '丙'); // 状态 7 苗床：列出
  add_chara(fixture, 4, '丁'); // EX_TALENT:1 近卫（无后代）：任何开关下都不列
  add_chara(fixture, 5, '戊'); // 近卫+后代：铁石心肠关时不列
  add_chara(fixture, 6, '己'); // 近卫+后代：铁石心肠开时列出
  add_chara(fixture, 7, '庚'); // 村娘系（TALENT:165）：列出并带 [SP]
  fixture.store.set('cflag:2:1', 2);
  fixture.store.set('cflag:3:1', 7);
  fixture.store.set('ex_talent:4:1', 1);
  fixture.store.set('ex_talent:5:1', 1);
  fixture.store.set('ex_talent:5:2', 1);
  fixture.store.set('ex_talent:6:1', 1);
  fixture.store.set('ex_talent:6:2', 1);
  fixture.store.set('talent:7:165', 1);
  const { chara_number_swap } = fixture.load_module(
    'page/page-chara-number-swap',
  );

  // 第一阶段：铁石心肠（EX_FLAG:9000 位 1）关
  fixture.set_inputs(1999);
  await chara_number_swap();

  assert.equal(
    printed_includes(
      fixture,
      '交换角色的排序编号(PS:侵攻与迎击中的角色无法换号)',
    ),
    true,
    '第一屏标题（原作提示语）',
  );
  for (const [cid, listed] of [
    [1, true],
    [2, false],
    [3, true],
    [4, false],
    [5, false],
    [6, false],
    [7, true],
  ]) {
    assert.equal(
      buttons_with(fixture, cid).length,
      listed ? 1 : 0,
      `铁石心肠关：角色 ${cid} ${listed ? '应列出' : '不应列出'}`,
    );
  }

  // 第二阶段：开铁石心肠后，近卫+后代（EX_TALENT:2）放行、纯近卫仍不列
  fixture.store.set('exflag:9000', 2);
  fixture.set_inputs(1999);
  await chara_number_swap();

  assert.equal(
    buttons_with(fixture, 5).length,
    1,
    '铁石心肠开：近卫+后代的角色 5 放行（第一阶段未列出）',
  );
  assert.equal(
    buttons_with(fixture, 6).length,
    1,
    '铁石心肠开：近卫+后代的角色 6 放行',
  );
  assert.equal(
    buttons_with(fixture, 4).length,
    0,
    '铁石心肠开：纯近卫（无后代）仍不列',
  );
  assert.equal(printed_includes(fixture, '[SP]'), true, '[SP] 标记（村娘系）');
  assert.equal(
    fixture.lines_history.some(
      (line) =>
        line.type === 'text' &&
        line.text.includes('庚') &&
        line.text.includes('[SP]'),
    ),
    true,
    '[SP] 追加在行尾（同一格）',
  );
  assert.equal(
    buttons_with(fixture, 1999)[0].rendered,
    '[1999] 结束换号',
    '結束换号按 #60 归一为简体',
  );
});

test('换号：只交换排序编号——角色 ID 与角色数据一件不搬，名册排列顺序跟着变（#545 返工）', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  fixture.seed_chara(1, { id: 1, name: '甲', callname: '甲一' });
  fixture.seed_chara(2, { id: 2, name: '乙', callname: '乙一' });
  assert.equal(fixture.era.addCharacter(1), true);
  assert.equal(fixture.era.addCharacter(2), true);
  // CFLAG:x:9 等级；:601 婚姻压缩数据；TALENT:200 战士（职业列）；
  // c_relation / c_relation_sub / relation 三张关系表的行与列。旧做法
  // （swap_chara_numbers）会把这些整片搬到对方名下——本轮返工后一件都不动，
  // 下面逐条钉住「人跟 ID 走」
  fixture.store.set('cflag:1:9', 5);
  fixture.store.set('cflag:2:9', 7);
  fixture.store.set('cflag:1:601', 900);
  fixture.store.set('talent:1:200', 1);
  fixture.store.set('c_relation:1:0', 11);
  fixture.store.set('c_relation:2:0', 22);
  fixture.store.set('c_relation:0:1', 101);
  fixture.store.set('c_relation:0:2', 202);
  fixture.store.set('c_relation_sub:1:1', 31);
  fixture.store.set('c_relation_sub:2:1', 32);
  fixture.store.set('relation:1:0', 51);
  fixture.store.set('relation:2:0', 52);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 1;
  era_flag.assi = 1;
  const { chara_number_swap } = fixture.load_module(
    'page/page-chara-number-swap',
  );

  fixture.set_inputs(1, 2, 4000, 1999);
  await chara_number_swap();

  // —— 身份不动：名字与呼び名仍归 ID 1/2 ——
  assert.equal(fixture.store.get('callname:1:-1'), '甲', 'ID 1 还是甲');
  assert.equal(fixture.store.get('callname:2:-1'), '乙', 'ID 2 还是乙');
  assert.equal(fixture.store.get('callname:1:-2'), '甲一');
  assert.equal(fixture.store.get('callname:2:-2'), '乙一');
  // —— 数据不动：数值行、素质、关系表的行与列都留在原处 ——
  assert.equal(
    fixture.store.get('cflag:1:9'),
    5,
    '换号不搬角色数据：等级仍属 ID 1',
  );
  assert.equal(fixture.store.get('cflag:2:9'), 7);
  assert.equal(fixture.store.get('cflag:1:601'), 900);
  assert.equal(
    fixture.store.get('talent:2:200'),
    undefined,
    '职业素质没有跟到 2 号名下',
  );
  assert.equal(fixture.store.get('c_relation:1:0'), 11);
  assert.equal(fixture.store.get('c_relation:2:0'), 22);
  assert.equal(fixture.store.get('c_relation:0:1'), 101);
  assert.equal(fixture.store.get('c_relation:0:2'), 202);
  assert.equal(fixture.store.get('c_relation_sub:1:1'), 31, '家族关系子表不动');
  assert.equal(fixture.store.get('c_relation_sub:2:1'), 32);
  assert.equal(fixture.store.get('relation:1:0'), 51, '内置相性表不动');
  assert.equal(fixture.store.get('relation:2:0'), 52);
  // —— 唯一变化：PORTCFLAG:角色:排序编号（移植自建扩展表，ADR-0001）——
  assert.equal(
    fixture.store.get('portcflag:1:排序编号'),
    2,
    '1 号拿到原属 2 号的排序编号',
  );
  assert.equal(
    fixture.store.get('portcflag:2:排序编号'),
    1,
    '2 号拿到原属 1 号的排序编号（对调）',
  );
  // TARGET/ASSI 复位（原作 -1，非 ere 惯例的 0）
  assert.equal(era_flag.target, -1, 'TARGET = -1');
  assert.equal(era_flag.assi, -1, 'ASSI = -1');
  // 文案与交互
  assert.equal(
    fixture.lines_history.some(
      (line) => line.text === '甲将与乙交换排序编号，确定吗？',
    ),
    true,
    '确认文案逐字（确认时还是互换前的名字）',
  );
  assert.equal(printed_includes(fixture, '已完成互换'), true);
  // 第二屏（「要跟那个角色换号呢？」到确认文案之间）剃除 CN:1 的行
  const second_from = fixture.lines_history.findIndex(
    (line) => line.text === '要跟那个角色换号呢？',
  );
  const second_to = fixture.lines_history.findIndex(
    (line, idx) => idx > second_from && (line.text ?? '').includes('确定吗？'),
  );
  assert.ok(second_from >= 0 && second_to > second_from, '第二屏的范围');
  const second_screen = fixture.lines_history.slice(second_from, second_to);
  assert.equal(
    second_screen.some(
      (line) => line.type === 'button' && line.accelerator === 1,
    ),
    false,
    '第二屏剃除 CN:1 的行',
  );
  assert.equal(
    second_screen.some(
      (line) => line.type === 'button' && line.accelerator === 2,
    ),
    true,
    '第二屏列出 CN:2 候选',
  );
  // 交换后 RESTART 重画的第一屏按新的排列顺序：拿到排序编号 1 的乙排在前
  const done_at = fixture.lines_history.findIndex(
    (line) => line.text === '已完成互换',
  );
  const row_of_after = fixture.lines_history
    .slice(done_at)
    .filter(
      (line) =>
        line.type === 'button' &&
        (line.accelerator === 1 || line.accelerator === 2),
    )
    .map((line) => line.accelerator);
  assert.deepEqual(
    row_of_after,
    [2, 1],
    '互换后第一屏按排序编号排：乙（排序编号 1）在前',
  );
  // 行体按原作 `LV:{CFLAG:COUNT:9,4,LEFT}`：冒号 + 等级值左对齐占 4 格
  // （1 位数补 3 空格，后面才是 [SP] 之类的片段），见 print_swap_row
  assert.equal(
    printed_includes(fixture, ' 甲 战士 LV:5   '),
    true,
    '行内容仍按身份取：甲带着自己的职业与等级',
  );
});

test('换号：[4001] 否回到第一屏重选，可选对方再确认', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  add_chara(fixture, 2, '乙');
  const { chara_number_swap } = fixture.load_module(
    'page/page-chara-number-swap',
  );

  // 第一屏选甲 → 第二屏选乙 → 否 → 第一屏选乙 → 第二屏选甲 → 是 → 重画 → 结束
  fixture.set_inputs(1, 2, 4001, 2, 1, 4000, 1999);
  await chara_number_swap();

  assert.equal(
    printed_includes(fixture, '甲将与乙交换排序编号，确定吗？'),
    true,
    '第一次确认',
  );
  assert.equal(
    printed_includes(fixture, '乙将与甲交换排序编号，确定吗？'),
    true,
    '否之后重选，第二次确认的名字对调',
  );
  assert.equal(
    fixture.store.get('portcflag:1:排序编号'),
    2,
    '第二次确认才交换排序编号',
  );
  assert.equal(
    fixture.lines_history.filter((line) => line.text === '已完成互换').length,
    1,
    '只互换一次',
  );
});

test('换号：每页 25 行（NUM_PAGE）、页首按上一页不动、末页按下一页不动、空尾页可进', async () => {
  {
    // 26 名候选：第 1 页 1-25、第 2 页只有 26
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    for (let cid = 1; cid <= 26; cid += 1)
      add_chara(fixture, cid, `角色${cid}`);
    const { chara_number_swap } = fixture.load_module(
      'page/page-chara-number-swap',
    );

    // 页首按上一页（不动）→ 下一页 → 末页再按下一页（不动）→ 上一页回第 1 页
    fixture.set_inputs(2000, 2001, 2001, 2000, 1999);
    await chara_number_swap();

    // 每屏以 [1999] 結束换号 收尾，按它切片：第二屏（页首按上一页后）
    // 必须仍是第 1 页的 25 行——上一页守卫写坏（no_page 落到 -1）时这一屏空
    const screens = [];
    let screen_start = 0;
    fixture.lines_history.forEach((line, idx) => {
      if (line.type === 'button' && line.accelerator === 1999) {
        screens.push(fixture.lines_history.slice(screen_start, idx + 1));
        screen_start = idx + 1;
      }
    });
    assert.equal(screens.length, 5, '五次绘制（初始 ＋ 四次翻页重画）');
    assert.equal(
      screens[1].some(
        (line) => line.type === 'button' && line.accelerator === 25,
      ),
      true,
      '页首按上一页后仍停在第 1 页（第 25 人还在）',
    );
    assert.equal(
      buttons_with(fixture, 1).length,
      3,
      '角色 1 出现在第 1、2、5 次绘制（页首上一页不动、回页后重画）',
    );
    assert.equal(
      buttons_with(fixture, 25).length,
      3,
      '第 25 人还在第 1 页（NUM_PAGE=25，名册自己的 24 不影响这里）',
    );
    assert.equal(
      buttons_with(fixture, 26).length,
      2,
      '第 26 人只在第 2 页；末页再按下一页不翻页但仍重画（原作 GOTO 在 IF 外）',
    );
  }
  {
    // 恰好 25 名候选：(0+1)*25 <= 25 成立 → 第 2 页可进，但整页无行
    //（守卫若误写成 <，这里会停在原地重画 25 行）
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    for (let cid = 1; cid <= 25; cid += 1)
      add_chara(fixture, cid, `角色${cid}`);
    const { chara_number_swap } = fixture.load_module(
      'page/page-chara-number-swap',
    );

    fixture.set_inputs(2001, 1999);
    await chara_number_swap();

    assert.equal(buttons_with(fixture, 1).length, 1, '第 2 页没有第 1 人');
    assert.equal(
      fixture.lines_history.filter(
        (line) =>
          line.text === '交换角色的排序编号(PS:侵攻与迎击中的角色无法换号)',
      ).length,
      2,
      '翻页后整屏重画了一次',
    );
  }
  {
    // 第二屏的翻页守卫与第一屏共用边界：恰 25 名候选时 [3001] 可进空尾页、
    // [3000] 回第 1 页后照常选人
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    for (let cid = 1; cid <= 25; cid += 1)
      add_chara(fixture, cid, `角色${cid}`);
    const { chara_number_swap } = fixture.load_module(
      'page/page-chara-number-swap',
    );

    fixture.set_inputs(1, 3001, 3000, 2, 4001, 1999);
    await chara_number_swap();

    assert.equal(
      fixture.lines_history.filter(
        (line) => line.text === '要跟那个角色换号呢？',
      ).length,
      3,
      '第二屏画了三屏：第 1 页 → [3001] 进空尾页 → [3000] 回第 1 页',
    );
    assert.equal(
      buttons_with(fixture, 2).length,
      4,
      '角色 2 出现在第一屏初始 ＋ 两次第 1 页的第二屏 ＋ [4001] 后的第一屏重画（空尾页上没有行）',
    );
  }
});

test('换号：互换后 RESTART 停在当前页；[1999] 出口后名册页码也保持（静态变量语义）', async () => {
  {
    // 27 名候选（第 1 页 1-25、第 2 页 26-27）：在第 2 页内部选两个角色换号
    // （互换只对调排列键，两人都还在第 2 页），重画应仍在第 2 页
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    for (let cid = 1; cid <= 27; cid += 1)
      add_chara(fixture, cid, `角色${cid}`);
    const { chara_number_swap } = fixture.load_module(
      'page/page-chara-number-swap',
    );

    // 第一屏 [2001] 翻到第 2 页选 26；第二屏（同页、剃除 26）选 27；[4000] 确认；
    // 互换发生在第 2 页，RESTART 重画仍在第 2 页（NO_PAGE 是静态变量，
    // 指南 user-defined-variables.md:67-69/:82：函数退出与 RESTART 都不重置；
    // 换号页的实现相应把页码提在模块级，见该文件头）
    fixture.set_inputs(2001, 26, 27, 4000, 1999);
    await chara_number_swap();

    const swap_at = fixture.lines_history.findIndex(
      (line) => line.text === '已完成互换',
    );
    assert.ok(swap_at >= 0, '已互换');
    const after = fixture.lines_history.slice(swap_at);
    assert.equal(
      after.some((line) => line.type === 'button' && line.accelerator === 26),
      true,
      '互换后重画仍在第 2 页（第 26 人还在，页码不归零）',
    );
    assert.equal(
      after.some((line) => line.type === 'button' && line.accelerator === 27),
      true,
      '第 27 人也在（互换只对调两人的排列键）',
    );
    assert.equal(
      after.some((line) => line.type === 'button' && line.accelerator === 2),
      false,
      '第 2 页上没有角色 2（页码确实没回第 1 页）',
    );
  }
  {
    // 名册侧重进：第 2 页按 [1700] → 换号 [1999] 出口 → 名册仍在第 2 页
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    for (let cid = 1; cid <= 25; cid += 1)
      add_chara(fixture, cid, `角色${cid}`);
    const { chara_info } = fixture.load_module('page/page-chara-info');

    fixture.set_inputs(998, 1700, 1999, 999);
    await chara_info();

    const pages = fixture.lines_history
      .filter((line) => line.type === 'text')
      .map((line) => (line.text.match(/<第(\d+)页>/) ?? [])[1])
      .filter(Boolean);
    assert.equal(
      pages[pages.length - 1],
      '2',
      `换号出口后名册保持第 2 页（同一轮 continue 沿用；实际页序 ${pages.join(',')}）`,
    );
  }
});

test('名册重进：[1600] 流程返回后名册页码保持（同一轮 continue 沿用）', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  for (let cid = 1; cid <= 25; cid += 1) add_chara(fixture, cid, `角色${cid}`);
  const { chara_info } = fixture.load_module('page/page-chara-info');

  // 翻到第 2 页后走 [1600]（选 [2003] 取消）：JUMP 重进名册在原作沿用静态变量
  // （NO_PAGE 不归零），ere 侧靠同一轮循环的 continue 复现，重画仍在第 2 页
  fixture.set_inputs(998, 1600, 2003, 999);
  await chara_info();

  const draws = draws_by_998(fixture);
  const last = draws[draws.length - 1];
  const last_texts = last
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
  assert.ok(
    last_texts.some((text) => text.includes('第2页')),
    `页码保持第 2 页（实际：${JSON.stringify(last_texts.slice(0, 3))}）`,
  );
});

test('名册重进：[1400] 切视图后走 [1600]，排序视图也保持（同一轮 continue 沿用）', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  fixture.store.set('cflag:1:580', 300);
  fixture.store.set('cflag:1:13', 15);
  fixture.store.set('cflag:1:14', 20);
  const { chara_info } = fixture.load_module('page/page-chara-info');

  fixture.set_inputs(1400, 1600, 2003, 999);
  await chara_info();

  const draws = draws_by_998(fixture);
  const last_texts = draws[draws.length - 1]
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
  assert.ok(
    last_texts.some((text) => text.includes('所持金:300')),
    `排序视图保持所持金（SORT_SELECT 是静态局部变量；实际：${JSON.stringify(last_texts)}）`,
  );
  assert.equal(
    last_texts.some((text) => text.includes('攻击15/防御20')),
    false,
    '没有落回编号视图',
  );
});

// —— #545 返工：排序编号（名册「编号」视图的排列键） ——

test('排序编号：sort_by_number 按排序编号升序、并列按 ID，与输入顺序无关——#545 返工', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  for (const cid of [1, 2, 3]) add_chara(fixture, cid, `角色${cid}`);
  // 键：3→1；1→2；2→缺省回落 ID＝2。1 与 2 并列在 2，按 ID 决胜。
  // 入参故意打乱（[2,3,1]）：这里若没有并列决胜、靠稳定排序吃输入顺序，
  // 会得到 [3,2,1]
  fixture.store.set('portcflag:3:排序编号', 1);
  fixture.store.set('portcflag:1:排序编号', 2);
  const { sort_by_number } = fixture.load_module('chara/chara-portcflag');

  assert.deepEqual(sort_by_number([2, 3, 1]), [3, 1, 2]);
  assert.deepEqual(sort_by_number([1, 2, 3]), [3, 1, 2], '两种入参同结果');
  const ids = [2, 3, 1];
  sort_by_number(ids);
  assert.deepEqual(ids, [2, 3, 1], '不改入参（返回新数组）');
});

test('名册「编号」视图按 PORTCFLAG:排序编号 升序（缺省＝角色 ID，并列按 ID）——#545 返工', () => {
  {
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    for (const cid of [1, 2, 3, 4]) add_chara(fixture, cid, `角色${cid}`);
    // 排序编号是移植自建的排列键（ADR-0001 的 portcflag 扩展表）：缺省 0 =
    // 未设，回落角色 ID。这里让 4 号持最小、1 号持最大——退回 ID 序（[1,2,3,4]）
    // 或「未设不回落 ID」（2、3 都读成 0）都会得到另一个顺序
    fixture.store.set('portcflag:4:排序编号', 1);
    fixture.store.set('portcflag:1:排序编号', 4);
    const { show_chara_info_list } = fixture.load_module(
      'page/page-chara-info',
    );

    const order = show_chara_info_list(0);

    assert.deepEqual(
      order,
      [4, 2, 3, 1],
      '顺位表按排序编号升序（未设的回落角色 ID）',
    );
    assert.deepEqual(
      fixture.lines_history
        .filter((line) => line.type === 'button' && line.row > 0)
        .map((line) => line.accelerator),
      [4, 2, 3, 1],
      '屏幕上的行序＝顺位表（编号格里的快捷键仍是角色 ID）',
    );
  }
  {
    // 并列（两个角色持同一排序编号）时按 ID 升序决胜
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    for (const cid of [1, 2, 3]) add_chara(fixture, cid, `角色${cid}`);
    fixture.store.set('portcflag:2:排序编号', 1);
    fixture.store.set('portcflag:3:排序编号', 1);
    fixture.store.set('portcflag:1:排序编号', 3);
    const { show_chara_info_list } = fixture.load_module(
      'page/page-chara-info',
    );

    assert.deepEqual(show_chara_info_list(0), [2, 3, 1], '并列按 ID 升序决胜');
  }
});

test('换号页：候选列表按排序编号升序，编号格显示的仍是角色 ID——#545 返工', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  for (const cid of [1, 2, 3]) add_chara(fixture, cid, `角色${cid}`);
  fixture.store.set('portcflag:3:排序编号', 1); // 3 号排最前
  fixture.store.set('portcflag:1:排序编号', 5);
  fixture.store.set('portcflag:2:排序编号', 9); // 2 号排最后
  fixture.store.set('cflag:1:9', 5); // 1 位数 → 补 3 格
  fixture.store.set('cflag:3:9', 12); // 2 位数 → 补 2 格（左对齐 4 格宽）
  const { chara_number_swap } = fixture.load_module(
    'page/page-chara-number-swap',
  );

  fixture.set_inputs(1999);
  await chara_number_swap();

  const rows = fixture.lines_history.filter(
    (line) => line.type === 'button' && [1, 2, 3].includes(line.accelerator),
  );
  assert.deepEqual(
    rows.map((line) => line.accelerator),
    [3, 1, 2],
    '行序按排序编号',
  );
  assert.deepEqual(
    rows.map((line) => line.rendered),
    ['[3] ', '[1] ', '[2] '],
    '编号格＝引擎按 showAcc 拼的快捷键（角色 ID）：看到的号与敲的号是同一个',
  );
  // 等级列：原作 :21/:72 的 `LV:{CFLAG:COUNT:9,4,LEFT}`——冒号 + 左对齐 4 格
  const row_text = (name) =>
    fixture.lines_history.find(
      (line) =>
        line.type === 'text' &&
        line.row > 0 &&
        (line.text ?? '').includes(name),
    )?.text ?? '';
  assert.ok(
    row_text('角色1').includes(' LV:5   '),
    `1 位等级补 3 格（实际：${JSON.stringify(row_text('角色1'))}）`,
  );
  assert.ok(
    row_text('角色3').includes(' LV:12  '),
    `2 位等级补 2 格（左对齐 4 格宽，实际：${JSON.stringify(row_text('角色3'))}）`,
  );
});

test('换号第二屏：只剩一名候选时也有出口——[3002] 取消回第一屏，不卡死（#545 第 2 轮返工）', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 17, '玛奥');
  const { chara_number_swap } = fixture.load_module(
    'page/page-chara-number-swap',
  );

  // 唯一候选 17 被选中后，第二屏把她本人剃除（:67-69）→ 屏上再没有候选行；
  // 只剩 [3000]/[3001]/[3002]，而 [3001] 在候选不足一页时只重绘同一屏。
  // 原作那条「乱输编号也走确认屏 → [4001] 否 → 回第一屏」的兜底在白名单下
  // 不可达，本轮补出的 [3002] 取消就是这条路上唯一可达的出口
  fixture.set_inputs(17, 3002, 1999);
  let thrown = null;
  try {
    await chara_number_swap();
  } catch (error) {
    thrown = error;
  }

  const second_headers = text_positions(fixture, '要跟那个角色换号呢？');
  const headers = text_positions(fixture, '请先选择要变换排序的角色');
  const second_from = second_headers[0];
  const second_to = headers.find((idx) => idx > second_from);
  const second_screen =
    second_from >= 0 && second_to !== undefined
      ? fixture.lines_history.slice(second_from, second_to)
      : [];
  assert.equal(
    second_screen.some(
      (line) => line.type === 'button' && line.accelerator === 17,
    ),
    false,
    '第二屏把她本人剃除：屏上没有候选行（这正是玩家卡死的场景）',
  );
  assert.ok(
    second_to !== undefined && headers.length === 2,
    `取消后回到第一屏重画（第二屏之后应再画一次第一屏；实际抛错 ${thrown ? thrown.message : '无'}）`,
  );
  assert.ok(
    !printed_includes(fixture, '确定吗？'),
    '取消直接回第一屏、不进确认屏（漏掉这条支路时 1999 会落到确认屏的白名单外）',
  );
  assert.equal(thrown, null, '整条路走完不抛错：没有卡死');
  assert.equal(
    fixture.store.get('portcflag:17:排序编号'),
    undefined,
    '取消不写排序编号',
  );
  assert.equal(
    buttons_with(fixture, 3002).length,
    1,
    '第二屏有一枚 [3002] 取消按钮',
  );
});

test('换号页：页码跨次进入沿用（原作 NO_PAGE 是静态变量）——#545 返工', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  for (let cid = 1; cid <= 26; cid += 1) add_chara(fixture, cid, `角色${cid}`);
  const { chara_number_swap } = fixture.load_module(
    'page/page-chara-number-swap',
  );

  fixture.set_inputs(2001, 1999); // 翻到第 2 页后退出
  await chara_number_swap();
  fixture.set_inputs(1999); // 再次进入
  await chara_number_swap();

  const entries = text_positions(fixture, '交换角色的排序编号');
  // 第一次进入画了两屏（进入时 + [2001] 翻页重画），第二次进入一屏
  assert.equal(entries.length, 3, '三次绘制，最后一次是第二次进入的第一屏');
  const second_entry = fixture.lines_history.slice(entries[2]);
  assert.ok(
    second_entry.some(
      (line) => line.type === 'button' && line.accelerator === 26,
    ),
    '再次进入仍在第 2 页：页码不随函数退出归零（静态变量语义）',
  );
  assert.equal(
    second_entry.some(
      (line) => line.type === 'button' && line.accelerator === 1,
    ),
    false,
    '没有落回第 1 页',
  );
});

test('换号：排序编号随存档往返（PORTCFLAG 随档走）——#545 返工', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  add_chara(fixture, 2, '乙');
  const { chara_number_swap } = fixture.load_module(
    'page/page-chara-number-swap',
  );

  fixture.set_inputs(1, 2, 4000, 1999);
  await chara_number_swap();
  assert.equal(fixture.store.get('portcflag:1:排序编号'), 2);

  assert.equal(await fixture.era.saveData(7, '换号往返'), true);
  // 抹掉现值（等价于另开一局后的空白状态）再读回：快照里没有这一条即红
  fixture.store.delete('portcflag:1:排序编号');
  fixture.store.delete('portcflag:2:排序编号');
  assert.equal(await fixture.era.loadData(7), true);
  assert.equal(
    fixture.store.get('portcflag:1:排序编号'),
    2,
    '排序编号 2 读回 1 号角色',
  );
  assert.equal(fixture.store.get('portcflag:2:排序编号'), 1);

  const { show_chara_info_list } = fixture.load_module('page/page-chara-info');
  assert.deepEqual(show_chara_info_list(0), [2, 1], '名册顺序随档回来');
});

// —— #545 返工：子流程返回后名册才继续（漏 await 时两处共用一个输入） ——

test('名册分发：[1600] 子流程返回后名册才继续——漏 await 时名册抢在播报前重绘（#545 返工）', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  fixture.store.set('cflag:1:1', 2); // 侵攻中 → [2000]/[2002] 档命中
  const { chara_info } = fixture.load_module('page/page-chara-info');

  // 2002（所有侵攻与迎击者）→ 等级 5 → 名册重进 → 999 退出。多留两个输入：
  // 漏 await 时名册会抢走子流程的那一份，两条流程各消费各的序列不同——队列
  // 空掉会先炸「预置输入已耗尽」，把真正要看的顺序盖掉
  fixture.set_inputs(1600, 2002, 5, 999, 5, 999);
  let thrown = null;
  let result = null;
  try {
    result = await chara_info();
  } catch (error) {
    // 漏 await 时名册会抢走子流程的输入（等级 5 不在名册的白名单里，夹具
    // 当场抛错）。这里只记下，断言放在后面：顺序契约的失败信息比抛错更能说明问题
    thrown = error;
  }

  const headers = text_positions(fixture, '请选择一个角色以了解详细信息');
  const done = text_positions(fixture, '已将当前迷宫');
  assert.ok(
    done.length === 1 && done[0] < headers[1],
    `统一卖春积极性返回后名册才继续：完成播报必须先于名册的下一次重绘（漏 await 时两处抢同一个输入；实际抛错 ${thrown ? thrown.message : '无'}、播报 ${JSON.stringify(done)}、名册表头 ${JSON.stringify(headers)}）`,
  );
  assert.equal(thrown, null, '名册与设置流程各消费各的输入，互不打断');
  assert.equal(result, 0);
  assert.equal(fixture.store.get('cflag:1:120'), 5, '等级 5 写进 CFLAG:120');
});

test('名册分发：[1700] 子流程返回后名册才继续——漏 await 时两者抢同一个输入（#545 返工）', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  add_chara(fixture, 2, '乙');
  const { chara_info } = fixture.load_module('page/page-chara-info');

  // 换号三步：选 1 → 选 2 → [4000] 是 → [1999] 退出换号 → 名册 999 退出
  fixture.set_inputs(1700, 1, 2, 4000, 1999, 999);
  let thrown = null;
  let result = null;
  try {
    result = await chara_info();
  } catch (error) {
    // 漏 await 时名册会抢走换号页的输入（4000 不在名册的白名单里，夹具当场
    // 抛错）。这里只记下，断言放在后面：顺序契约的失败信息比抛错更能说明问题
    thrown = error;
  }

  const headers = text_positions(fixture, '请选择一个角色以了解详细信息');
  const done = text_positions(fixture, '已完成互换');
  assert.ok(
    done.length === 1 && done[0] < headers[1],
    `换号返回后名册才继续：完成播报必须先于名册的下一次重绘（漏 await 时两处抢同一个输入；实际抛错 ${thrown ? thrown.message : '无'}、播报 ${JSON.stringify(done)}、名册表头 ${JSON.stringify(headers)}）`,
  );
  assert.equal(thrown, null, '名册与换号流程各消费各的输入，互不打断');
  assert.equal(result, 0);
  assert.equal(fixture.store.get('portcflag:1:排序编号'), 2, '排序编号已交换');
});
