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

function buttons_with(fixture, accelerator) {
  return fixture.lines_history.filter(
    (line) => line.type === 'button' && line.accelerator === accelerator,
  );
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

  // 状态 2（侵攻中）：不论楼层是否相等都进「按楼层比」分支，相等时判假、
  // b 反而排前——原作如此，1:1 保留（文件头已注明）
  fixture.store.set('cflag:1:1', 2);
  fixture.store.set('cflag:2:1', 2);
  fixture.store.set('cflag:1:501', 5);
  fixture.store.set('cflag:2:501', 5);
  assert.equal(
    compare_chara_act(1, 2, 2),
    1,
    '楼层相等时 a 反而排后（原作行为）',
  );

  fixture.store.set('cflag:2:501', 8); // a 楼层更浅
  assert.equal(compare_chara_act(1, 2, 2), -1);

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

test('CHARA_INFO：翻页/换排序视图/统一积极性与换号存根/返回主菜单', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  const { chara_info } = fixture.load_module('page/page-chara-info');

  fixture.set_inputs(1600, 1700, 1300, 999);
  const result = await chara_info();

  assert.equal(result, 0, '999 返回主菜单');
  assert.equal(
    printed_includes(fixture, '一并调整全部角色的卖春积极性'),
    true,
    '1600 走存根',
  );
  assert.equal(
    printed_includes(fixture, '@换号'),
    true,
    '1700 走阶段 6 MOD 范围存根（@换号 定义在 target/ERB/魔改新增/，非死引用）',
  );
});

test('CHARA_INFO：名册每页 24 行（NUM_PAGE）——第 24 人还在第 1 页，第 25 人只在第 2 页', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  for (let cid = 1; cid <= 25; cid += 1) add_chara(fixture, cid, `角色${cid}`);
  const { chara_info } = fixture.load_module('page/page-chara-info');

  fixture.set_inputs(998, 997, 999); // 下一页 → 上一页 → 返回主菜单
  assert.equal(await chara_info(), 0);

  // 每次绘制以 [998] 收尾，用它把三次绘制切片；行按钮的 text 是 `[编号]`
  // （排序表头等按钮的 text 是中文标签，天然滤掉）
  const draws = [];
  let start = 0;
  fixture.lines_history.forEach((line, idx) => {
    if (line.type === 'button' && line.accelerator === 998) {
      draws.push(fixture.lines_history.slice(start, idx + 1));
      start = idx + 1;
    }
  });
  assert.equal(draws.length, 3, '初始 ＋ 下一页 ＋ 上一页');
  const rows_of = (draw) =>
    draw
      .filter((line) => line.type === 'button' && /^\[\d+\]$/.test(line.text))
      .map((line) => line.text);

  assert.equal(
    rows_of(draws[0]).length,
    24,
    '第 1 页 24 行（魔王行是文本行，不计）',
  );
  assert.equal(rows_of(draws[0]).includes('[24]'), true, '第 24 人在第 1 页');
  assert.equal(
    rows_of(draws[0]).includes('[25]'),
    false,
    '第 25 人不在第 1 页',
  );
  assert.deepEqual(rows_of(draws[1]), ['[25]'], '第 2 页只剩第 25 人');
  assert.deepEqual(
    rows_of(draws[2]),
    rows_of(draws[0]),
    '翻回第 1 页又是 24 人',
  );
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

test('CHARA_INFO_INDIVIDUAL_WAPPED：以全部已加入角色 ID 为顺位表打开个别页', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  const { chara_info_individual_wrapped } = fixture.load_module(
    'page/page-chara-info',
  );

  fixture.set_inputs(100);
  const result = await chara_info_individual_wrapped(1);

  assert.equal(result, 0);
});

// —— 未落地调用一律走存根，登记与实现同步 ——

test('STUBBED_CALLS：装备/兼职/调试/立绘/统一积极性/换号仍在列，三对动作已移出', async () => {
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
  // chara-marriage.js），九条均不再是本文件的存根
  for (const name of [
    'SHOW_CHARA_INFO',
    'SHOW_BUTTON_EQUIP',
    'PTJ_BUTTON',
    'EQUIP_ST_SHOW',
    'CHAR_DEBUG',
    'RANDOM_SELF_CALL',
    '更换立绘',
    '统一卖春积极性',
    '换号',
  ]) {
    assert.ok(STUBBED_CALLS.includes(name), `${name} 应在存根登记表内`);
  }
  for (const name of [
    'SHOW_BUTTON_CHILD_CARE',
    'CHILD_CARE_CHARA',
    'SHOW_BUTTON_JOB_CHANGE',
    'SHOW_BUTTON_TEMPTATION',
    'SHOW_BUTTON_MARRIAGE',
    'CHARA_INFO_JOB_CHANGE',
    'TEMPTATION',
    'MARRIAGE',
  ]) {
    assert.ok(
      !STUBBED_CALLS.includes(name),
      `${name} 已有真身，不应再留在本文件的存根名单里`,
    );
  }

  // 绘制期：改名自 #384、三对动作按钮自 #393、育儿室自 #401 起都是真按钮
  // （都在判定放行时才渲染）；装备/兼职(sub_page 1/2)仍是 stub_line 占位。
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
  for (const stub_name of [
    'SHOW_BUTTON_JOB_CHANGE',
    'SHOW_BUTTON_TEMPTATION',
    'SHOW_BUTTON_MARRIAGE',
    'CHARA_INFO_JOB_CHANGE',
    'TEMPTATION',
    'MARRIAGE',
  ]) {
    assert.equal(
      printed_includes(fixture, `@${stub_name}`),
      false,
      `${stub_name} 的占位行不该再出现`,
    );
  }
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
