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

test('SHOW_CHARA_ACT：状态码到徽章文本/颜色的映射，未登记状态回落残留字面量', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 1);
  const { show_chara_act } = fixture.load_module('page/page-chara-info');

  fixture.store.set('cflag:1:1', 2);
  fixture.store.set('cflag:1:501', 3);
  assert.deepEqual(show_chara_act(1), {
    content: '3F侵攻中',
    color: '#ff6464',
  });

  fixture.store.set('cflag:1:1', 3);
  assert.deepEqual(show_chara_act(1), {
    content: '3F迎击中',
    color: '#64ffff',
  });

  fixture.store.set('cflag:1:1', 0);
  assert.deepEqual(show_chara_act(1), {
    content: '[可调教]',
    color: '#6464ff',
  });

  fixture.store.set('cflag:1:1', 7);
  assert.deepEqual(show_chara_act(1), {
    content: '[ 苗床 ]',
    color: '#64ff64',
  });

  fixture.store.set('cflag:1:1', 99); // 未登记状态
  assert.deepEqual(show_chara_act(1), { content: '-F\u3000\u2015\u3000' });
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

test('CHARA_MARRIGE_BEFORE：家族码分档——%10==0 为无，category 0/2 为无，1/3/4 按 kind 三分支', () => {
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

  // category=1，kind = trunc((code%10^10)/10^9)：code=1*10^9+10005，
  // 低 5 位 10005 → local1=10005 → category=1；kind=trunc(code/10^9)=1
  fixture.store.set('talent:1:320', 1000010005); // kind=1 → 扶她
  assert.equal(chara_marriage_before(1), '故乡扶她');

  // kind 分组逐个成员都要能单独删掉才被拖住（仅测 kind=0/1/2 分不出删掉
  // 4/5/7/8 其中一个的改动），因此补齐剩下四个成员
  fixture.store.set('talent:1:320', 4000010005); // kind=4 → 丈夫
  assert.equal(chara_marriage_before(1), '故乡丈夫', 'kind=4');

  fixture.store.set('talent:1:320', 5000010005); // kind=5 → 扶她
  assert.equal(chara_marriage_before(1), '故乡扶她', 'kind=5');

  fixture.store.set('talent:1:320', 7000010005); // kind=7 → 扶她
  assert.equal(chara_marriage_before(1), '故乡扶她', 'kind=7');

  fixture.store.set('talent:1:320', 8000010005); // kind=8 → 丈夫
  assert.equal(chara_marriage_before(1), '故乡丈夫', 'kind=8');

  fixture.store.set('talent:1:320', 30005); // local1=30005→category=3，kind=0（数值本身小于10^9）→ 丈夫
  assert.equal(chara_marriage_before(1), '故乡丈夫');

  // category=4：code=2*10^9+40005，local1=40005→category=4；kind=2（不在
  // 0/4/8 或 1/5/7）→ 妻子
  fixture.store.set('talent:1:320', 2000040005);
  assert.equal(chara_marriage_before(1), '故乡妻子');

  fixture.store.set('talent:1:320', 60005); // local1=60005 → category=6：CASEELSE 死代码
  assert.equal(
    chara_marriage_before(1),
    '',
    'category 5/CASEELSE：原作死代码，无输出',
  );
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

test('SHOW_CHARA_ACT_LIST：MARRIAGE_BRACKET_TEXT 配偶 900 渲染「野狗」（婚姻括号列）', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  fixture.store.set('cflag:1:601', 900); // 配偶=野狗
  const { show_chara_act_list } = fixture.load_module('page/page-chara-info');

  show_chara_act_list(0, 0);

  assert.equal(printed_includes(fixture, '[婚:野狗]'), true);
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

test('STUBBED_CALLS：改名/转职/魔诱/结婚/育儿/装备/兼职/调试/立绘/统一积极性/换号均在列', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '甲');
  const { STUBBED_CALLS, chara_info_individual } = fixture.load_module(
    'page/page-chara-info',
  );

  for (const name of [
    'SHOW_CHARA_INFO',
    'SHOW_BUTTON_NAME_EDIT',
    'SHOW_BUTTON_JOB_CHANGE',
    'SHOW_BUTTON_TEMPTATION',
    'SHOW_BUTTON_MARRIAGE',
    'SHOW_BUTTON_CHILD_CARE',
    'SHOW_BUTTON_EQUIP',
    'PTJ_BUTTON',
    'CHARA_INFO_NAME_EDIT',
    'CHARA_INFO_JOB_CHANGE',
    'TEMPTATION',
    'MARRIAGE',
    'CHILD_CARE_CHARA',
    'EQUIP_ST_SHOW',
    'CHAR_DEBUG',
    'RANDOM_SELF_CALL',
    '更换立绘',
    '统一卖春积极性',
    '换号',
  ]) {
    assert.ok(STUBBED_CALLS.includes(name), `${name} 应在存根登记表内`);
  }

  // 改名/转职/魔诱/结婚/育儿(sub_page 0)与装备/兼职(sub_page 1/2)的按钮存根
  // 都在「绘制期」用 stub_line 打占位文本（不是可点击按钮，CASE 0-5/8/16/99
  // 因此目前无法通过 era.input() 驱动到——它们等各自的按钮票落地后才可达，
  // 见文件头「运行时可用只有已渲染按钮的快捷键」）。这里只验证绘制期占位
  // 文本确实出现，不去点它们背后尚不可达的分发分支。
  fixture.set_inputs(100);
  const result = await chara_info_individual(1, [1]);
  assert.equal(result, 0);
  for (const stub_name of [
    'SHOW_BUTTON_NAME_EDIT',
    'SHOW_BUTTON_JOB_CHANGE',
    'SHOW_BUTTON_TEMPTATION',
    'SHOW_BUTTON_MARRIAGE',
    'SHOW_BUTTON_CHILD_CARE',
  ]) {
    assert.equal(
      printed_includes(fixture, `@${stub_name}`),
      true,
      `${stub_name} 绘制期占位应出现`,
    );
  }
});
