// issue #398：SHOP_LABO 秘密实验室（M9401-M9472：初版 M9401-M9449，
// 验收补的等号侧探针见下方 M9450 起的说明段延伸到 M9472——本行数字必须
// 跟着这份文件的实际末尾条目走，AGENTS.md 记录的 grep 取号法只认这一行
// 的字面数字，本行漏改会让下一张票的号段起点算错，#406 验收时正是这样
// 撞的号）。
//
// 改动文件常驻 ere/page/page-shop-labo.js（52 函数：主分发 + 四页菜单 +
// MODIFY 族 + 特殊流程）；tests 一律是这张工单的 test/page-shop-labo.test.js。
// 取点原则（工单覆盖面标准）：价格/门槛/素质编号等字面量逐个钉、随机上界
// 单独钉（DEIMMATURITY 的 RAND:2、DEMON_REBIRTH 的 RAND:3/7）、范围端点
// （编号 150/199、页高 23、CHARANUM 60/80/90）。
//
// M9450 起补的是**等号侧**（#398 一轮验收的抽样探针打出）：字面量钉的是
// 「那个数」，`>= N` 改 `> N` 数字一个没动却改变了恰好取等时的行为。每条
// 改的都是比较运算符本身，目标是 test/page-shop-labo.test.js 第六节。
const code = 'ere/page/page-shop-labo.js';
const make = (id, desc, find, replace, must_mention) => ({
  desc: `M${id} ${desc}`,
  file: code,
  tests: ['page-shop-labo'],
  find,
  replace,
  must_mention,
});

/** 本分片条数（门 1）：增删条目必须同步改它 */
export const COUNT = 106; // #743 +3（M14605–M14607：在场角色的苏生前置、名单与提交检查）；#740 +7（M14562–M14568：勋章提示不读素质 398、苏生名单取预设名）；#724 返工 +12（M14500–M14511：条目尾段等键删除）；此前 +3（M14496/M14497/M14499） // #567 起 +4（M11840-M11842/M11844：刺青与自由局部调教的两处自由输入与提示行）；#562 +4（M11866-M11868 页脚不产生空行、M11872 :272 的真空行）

export default [
  // —— 价格：MODIFY 族整表（每条的价格字面量各一） ——
  make(
    9401,
    'MODIFY_BONYU 价格 50000 改 50001',
    "  price: 50000,\n  poor: '有钱的孩子才有奶喝',",
    "  price: 50001,\n  poor: '有钱的孩子才有奶喝',",
    'modify_bonyu：扣掉整整 50000 点',
  ),
  make(
    9402,
    'MODIFY_FUTANARI_ERASE 价格 10000 改 10001',
    "  price: 10000,\n  poor: '钱不够，快快去挣钱',",
    "  price: 10001,\n  poor: '钱不够，快快去挣钱',",
    'modify_futanari_erase：扣掉整整 10000 点',
  ),
  make(
    9403,
    'MODIFY_ANIMAL 价格 2000 改 2001',
    '  price: 2000,',
    '  price: 2001,',
    'modify_animal：扣掉整整 2000 点',
  ),
  make(
    9404,
    'MODIFY_ANIMAL_ERASE 价格 1000 改 1001',
    '  price: 1000,',
    '  price: 1001,',
    'modify_animal_erase：扣掉整整 1000 点',
  ),
  make(
    9405,
    'MODIFY_REMOVEHAIR 价格 5000 改 5001',
    '  price: 5000,',
    '  price: 5001,',
    'modify_removehair：扣掉整整 5000 点',
  ),
  make(
    9406,
    'MODIFY_DEIMMATURITY 价格 10000 改 10001',
    'const MODIFY_DEIMMATURITY_ITEM = {\n  price: 10000,',
    'const MODIFY_DEIMMATURITY_ITEM = {\n  price: 10001,',
    'modify_deimmaturity：扣掉整整 10000 点',
  ),
  make(
    9407,
    'MODIFY_BONYU_ERASE 价格 10000 改 10001',
    'const MODIFY_BONYU_ERASE_ITEM = {\n  price: 10000,',
    'const MODIFY_BONYU_ERASE_ITEM = {\n  price: 10001,',
    'modify_bonyu_erase：扣掉整整 10000 点',
  ),
  make(
    9408,
    'MODIFY_OMORASHI_ERASE 价格 10000 改 10001',
    'const MODIFY_OMORASHI_ERASE_ITEM = {\n  price: 10000,',
    'const MODIFY_OMORASHI_ERASE_ITEM = {\n  price: 10001,',
    'modify_omorashi_erase：扣掉整整 10000 点',
  ),
  make(
    9409,
    'SHOJO_SAISEI 价格 100000 改 100001',
    '  price: 100000,',
    '  price: 100001,',
    'shojo_saisei：扣掉整整 100000 点',
  ),
  make(
    9410,
    'SHOJO_SEAL 价格 10000 改 10001',
    'const SHOJO_SEAL_ITEM = {\n  price: 10000,',
    'const SHOJO_SEAL_ITEM = {\n  price: 10001,',
    'shojo_seal：扣掉整整 10000 点',
  ),
  make(
    9411,
    'SHOJO_SEAL_OFF 价格 10000 改 10001',
    "  price: 10000,\n  poor: '穷鬼玩啥处女啊！',",
    "  price: 10001,\n  poor: '穷鬼玩啥处女啊！',",
    'shojo_seal_off：扣掉整整 10000 点',
  ),
  make(
    9412,
    'TRANS_SEX 价格 200000 改 200001',
    '  price: 200000,',
    '  price: 200001,',
    'trans_sex：扣掉整整 200000 点',
  ),
  make(
    9413,
    'HORN 价格 20000 改 20001',
    "  price: 20000,\n  poor: '角可是很贵的',",
    "  price: 20001,\n  poor: '角可是很贵的',",
    'horn：扣掉整整 20000 点',
  ),
  make(
    9414,
    'BLUESKIN 价格 20000 改 20001',
    'const BLUESKIN_ITEM = {\n  price: 20000,',
    'const BLUESKIN_ITEM = {\n  price: 20001,',
    'blueskin：扣掉整整 20000 点',
  ),
  make(
    9415,
    'EVILWING 价格 20000 改 20001',
    'const EVILWING_ITEM = {\n  price: 20000,',
    'const EVILWING_ITEM = {\n  price: 20001,',
    'evilwing：扣掉整整 20000 点',
  ),
  make(
    9416,
    'EVILTAIL 价格 20000 改 20001',
    'const EVILTAIL_ITEM = {\n  price: 20000,',
    'const EVILTAIL_ITEM = {\n  price: 20001,',
    'eviltail：扣掉整整 20000 点',
  ),
  make(
    9417,
    'EVILSIGHT 价格 20000 改 20001',
    'const EVILSIGHT_ITEM = {\n  price: 20000,',
    'const EVILSIGHT_ITEM = {\n  price: 20001,',
    'evilsight：扣掉整整 20000 点',
  ),
  make(
    9418,
    'SOULBOUND 价格 10000 改 10001',
    "  price: 10000,\n  poor: '金钱不足',",
    "  price: 10001,\n  poor: '金钱不足',",
    'soulbound：扣掉整整 10000 点',
  ),
  make(
    9419,
    'SOULBOUND_ERASE 价格 50000 改 50001',
    'const SOULBOUND_ERASE_ITEM = {\n  price: 50000,',
    'const SOULBOUND_ERASE_ITEM = {\n  price: 50001,',
    'soulbound_erase：扣掉整整 50000 点',
  ),
  make(
    9420,
    'ENCHARMED_ERASE 价格 50000 改 50001',
    'const ENCHARMED_ERASE_ITEM = {\n  price: 50000,',
    'const ENCHARMED_ERASE_ITEM = {\n  price: 50001,',
    'encharmed_erase：扣掉整整 50000 点',
  ),
  make(
    9421,
    'MAGICRESIST 价格 50000 改 50001',
    "  price: 50000,\n  poor: '钱不够',",
    "  price: 50001,\n  poor: '钱不够',",
    'magicresist：扣掉整整 50000 点',
  ),
  make(
    9422,
    'EXTRA_PREG_MARK 价格 20000 改 20001',
    'const EXTRA_PREG_MARK_ITEM = {\n  price: 20000,',
    'const EXTRA_PREG_MARK_ITEM = {\n  price: 20001,',
    'extra_preg_mark：扣掉整整 20000 点',
  ),
  make(
    9423,
    'EXTRA_PREG_ERASE 价格 35000 改 35001',
    '  price: 35000,',
    '  price: 35001,',
    'extra_preg_erase：扣掉整整 35000 点',
  ),
  make(
    9424,
    'ANTI_AGING 价格 20000 改 20001',
    "  price: 20000,\n  poor: '没钱就别想这些事情',",
    "  price: 20001,\n  poor: '没钱就别想这些事情',",
    'anti_aging：扣掉整整 20000 点',
  ),
  // —— 价格：单写流程 ——
  make(
    9425,
    'BUSTUP 基础价 20000 改 20001（成交扣款档）',
    '    let cost = 20000; // C = 20000',
    '    let cost = 20001; // C = 20000',
    'MODIFY_BUSTUP：扣掉 20000 点',
  ),
  make(
    9426,
    'BUSTUP 加价档 50000 改 50001',
    '      cost = 50000;',
    '      cost = 50001;',
    '加价档扣 50000',
  ),
  make(
    9427,
    'AMNESIA 扣款 100000 改 100001',
    '  pay(100000);\n  return 1;',
    '  pay(100001);\n  return 1;',
    'modify_amnesia：全清清单（ABL/MARK/JUEL 各 100 项、TALENT 74-78、85/86、CFLAG 0/2/10）',
  ),
  make(
    9428,
    'TATOO 价格 10000 改 10001',
    '  const cost = 10000; // COST = 10000',
    '  const cost = 10001; // COST = 10000',
    'tatoo_set_off：部位菜单 + 自由文字（刻印与消去两支）',
  ),
  make(
    9429,
    'HAIR_COLOR 扣款 5000 改 5001',
    '    era.print(`《${savestr(t)}的发色变成【${hair_color_name(t)}】了》`);\n    pay(5000);',
    '    era.print(`《${savestr(t)}的发色变成【${hair_color_name(t)}】了》`);\n    pay(5001);',
    'MODIFY_HAIR_COLOR：扣掉 5000 点',
  ),
  make(
    9430,
    'BLOCK_FEELING 扣款 20000 改 20001',
    '      pay(20000);',
    '      pay(20001);',
    'BLOCK_FEELING：扣掉 20000 点',
  ),
  make(
    9431,
    '洗脑【早泄】档 8000 改 8001',
    '  31: [8000, 133], // 【早泄】',
    '  31: [8001, 133], // 【早泄】',
    'brain_washing：四档「费用 × 素质」整表 + 三道检查',
  ),
  make(
    9432,
    '触手生物 扣款 50000 改 50001',
    '      pay(50000);\n      await era.waitAnyKey(); // WAIT',
    '      pay(50001);\n      await era.waitAnyKey(); // WAIT',
    'BOUGT_TENTACLES：扣掉 50000 点',
  ),
  make(
    9433,
    'ST_UP_LABO 扣款多收 1 点',
    '  pay(cost * times);',
    '  pay(cost * times + 1);',
    'HP：扣 5000 × 3',
  ),
  make(
    9434,
    'TRANS_SPECIALTALENT 扣款 500000 改 500001',
    '  pay(500000);',
    '  pay(500001);',
    'TRANS_SPECIALTALENT：扣掉 500000 点',
  ),
  make(
    9435,
    'SUMMON_SLAVE 扣款 100000 改 100001',
    '    pay(100000);',
    '    pay(100001);',
    'SUMMON_SLAVE：扣掉 100000 点',
  ),
  make(
    9436,
    '肉棒改造 扣款 20000 改 20001',
    '    pay(20000);\n    // 改造播报在回选人屏前经按键确认（ADR-0009）\n    await era.waitAnyKey();\n    return 1;',
    '    pay(20001);\n    // 改造播报在回选人屏前经按键确认（ADR-0009）\n    await era.waitAnyKey();\n    return 1;',
    '肉棒改造：扣掉 20000 点',
  ),
  // —— 素质编号 / 映射（改一项应只被对应的表驱动用例抓到） ——
  make(
    9437,
    'TRANS_SEX 的已性转检查认错人（cid !== MASTER 改 cid !== 1）',
    '    if (cflag(cid, 70) && cid !== MASTER) {',
    '    if (cflag(cid, 70) && cid !== 1) {',
    'trans_sex：提示原文「奴隶1已经被性转过了。」在场',
  ),
  make(
    9438,
    'BLOCK_FEELING 的部位素质表 101 改 102',
    'const PID_TALENT = [101, 103, 105, 107];',
    'const PID_TALENT = [102, 103, 105, 107];',
    'block_feeling：部位维度表驱动（四部位 × 钝感位与 ABL 两道门）',
  ),
  make(
    9439,
    'BLOCK_FEELING 的 PAID 映射首位 0 改 1',
    'const PID_ABL = [0, 2, 3, 1];',
    'const PID_ABL = [1, 2, 3, 1];',
    'block_feeling：部位维度表驱动（四部位 × 钝感位与 ABL 两道门）',
  ),
  make(
    9440,
    '洗脑四项的素质映射 133 改 134',
    '  31: [8000, 133], // 【早泄】',
    '  31: [8000, 134], // 【早泄】',
    'brain_washing：四档「费用 × 素质」整表 + 三道检查',
  ),
  make(
    9441,
    'DEMON_REBIRTH 类型表首行首项 133 改 134',
    '  [133, 143, 153, 163, 160, 170], // 男巫/女巫/男祭司/女忍/黑暗骑士/女祭司',
    '  [134, 143, 153, 163, 160, 170], // 男巫/女巫/男祭司/女忍/黑暗骑士/女祭司',
    'demon_rebirth：类型表整表 + 等级门 + 附加素质 + 随机上界 3/7',
  ),
  // —— 随机上界 ——
  make(
    9442,
    'DEIMMATURITY 的 RAND:2 上界改 3',
    'chara(cid).chara.阴茎的状态 = talent(cid, 318) - rand(2);',
    'chara(cid).chara.阴茎的状态 = talent(cid, 318) - rand(3);',
    'RAND:2 的上界是 2',
  ),
  make(
    9443,
    'DEMON_REBIRTH 的 RAND:3 上界改 4',
    '    if (rand(3) === 0) {',
    '    if (rand(4) === 0) {',
    '随机上界依次是 3 与 7',
  ),
  make(
    9444,
    'DEMON_REBIRTH 的 RAND:7 上界改 6',
    '      labo_dr_change_hair_color(t, rand(7) + 1);',
    '      labo_dr_change_hair_color(t, rand(6) + 1);',
    '随机上界依次是 3 与 7',
  ),
  // —— 范围端点 / 门槛 ——
  make(
    9445,
    'SUMMON_SLAVE 的收录编号下界 150 改 149',
    '    if (result > 199 || result < 150) {',
    '    if (result > 199 || result < 149) {',
    '149 以下与 199 以上都拒收',
  ),
  make(
    9446,
    '选人页高 NUM_PAGE 23 改 22',
    'const NUM_PAGE = 23;',
    'const NUM_PAGE = 22;',
    'MODIFY 族：选人列表的翻页（1001 进、1000 退、上界按 CHARANUM）',
  ),
  make(
    9447,
    '生命摇篮的勇者数门 60 改 61',
    '      if (game.event.人间界征服完了 === 0 && charanum() > 60) {',
    '      if (game.event.人间界征服完了 === 0 && charanum() > 61) {',
    '角色数 > 60 且人间界未征服 → 勇者数量过多',
  ),
  make(
    9448,
    '生命摇篮的亲卫队砦门 15 改 16',
    '      } else if (game.invasion.亲卫队砦侵攻度 < 15 && charanum() > 80) {',
    '      } else if (game.invasion.亲卫队砦侵攻度 < 16 && charanum() > 80) {',
    'FLAG:92 == 15（不小于 15）时放行',
  ),
  make(
    9449,
    '主循环前翻页 P += 3 改 2',
    '      p += 3; // 前一页',
    '      p += 2; // 前一页',
    'P=0 →（998）P=1 →（997）P=0 →（997）P=3',
  ),
  // —— 等号侧（#398 一轮验收抽样探针打出的空白）：比较运算符的取等那一侧 ——
  make(
    9450,
    'require_money 的 `money < price` 改 `<=`（钱刚好够就买不了）',
    '  if (era_flag.money < price) {',
    '  if (era_flag.money <= price) {',
    'modify_bonyu：钱 == 价格时应成交（money < price 的等号侧）',
  ),
  make(
    9451,
    'BUSTUP 加价档的 `money < cost` 改 `<=`',
    '    if (era_flag.money < cost) {',
    '    if (era_flag.money <= cost) {',
    '加价档钱刚好够也成交（money < cost 的等号侧）',
  ),
  make(
    9452,
    'BLOCK_FEELING 的 `money >= C` 改 `> C`（买完刚好剩单价时不回菜单）',
    '      if (era_flag.money >= 20000) {',
    '      if (era_flag.money > 20000) {',
    'MONEY == C 时回到部位菜单（money >= C 的等号侧）',
  ),
  make(
    9453,
    '选人「上一页」的 `no_page > 0` 改 `>= 0`（第 1 页往前翻）',
    '    if (no_page > 0) {',
    '    if (no_page >= 0) {',
    '两屏都画出奴隶 1：NO_PAGE == 0 时不能往前翻（no_page > 0 的等号侧）',
  ),
  make(
    9454,
    '选人「下一页」的 `(NO_PAGE+1)*NUM_PAGE <= CHARANUM` 改 `<`',
    '      if ((no_page + 1) * NUM_PAGE <= charanum()) {',
    '      if ((no_page + 1) * NUM_PAGE < charanum()) {',
    '第 2 页是空的（恰好取等也允许翻页；`<` 会停在原位再画一遍）',
  ),
  make(
    9455,
    '死者苏生列表的 `FLAG <= -2` 改 `< -2`',
    '        (era.get(`flag:${c}`) || 0) <= -2 &&',
    '        (era.get(`flag:${c}`) || 0) < -2 &&',
    '只有 FLAG <= -2 的槽进列表（-1 / 0 / 正数都不进）',
  ),
  make(
    9456,
    '死者苏生扫描的 `FLAG < 0` 改 `<= 0`（|| 0 缺省取 0，被算成亡者）',
    '      (era.get(`flag:${count + 1000}`) || 0) < 0 &&',
    '      (era.get(`flag:${count + 1000}`) || 0) <= 0 &&',
    '没有任何 FLAG:1000-1099 < 0 时拒绝（|| 0 的缺省值是 0，不算亡者）',
  ),
  make(
    9457,
    '死者苏生的 `charanum() > 30` 改 `>=`（恰好 30 人时拒绝）',
    '  if (charanum() > 30) {',
    '  if (charanum() >= 30) {',
    '角色数 == 30 放行（charanum > 30 的等号侧）',
  ),
  make(
    9458,
    '死者苏生的 `charanum() > 10` 改 `>=`（恰好 10 人时拒绝）',
    '  if (settings_bitmap() !== 9 && charanum() > 10) {',
    '  if (settings_bitmap() !== 9 && charanum() >= 10) {',
    '角色数 == 10 放行（charanum > 10 的等号侧）',
  ),
  make(
    9459,
    '生命摇篮的 `charanum() > 60` 改 `>=`（恰好 60 人时拦下）',
    '      if (game.event.人间界征服完了 === 0 && charanum() > 60) {',
    '      if (game.event.人间界征服完了 === 0 && charanum() >= 60) {',
    '角色数 == 60 放行（charanum > 60 的等号侧）',
  ),
  make(
    9460,
    'ST_UP 强化次数的 `times > d` 改 `>= d`（次数取上限时被拒）',
    '  if (times < 1 || times > d) {',
    '  if (times < 1 || times >= d) {',
    '次数 == D 成交',
  ),
  make(
    9461,
    '转生门槛的 `cflag(9) < 门槛` 改 `<=`（等级恰好够时被拒）',
    '    if (cond[row] === 0 || cflag(t, 9) < Math.trunc(item_price(id) / 20)) {',
    '    if (cond[row] === 0 || cflag(t, 9) <= Math.trunc(item_price(id) / 20)) {',
    '等级 == 门槛 放行（`<` 的等号侧）',
  ),
  make(
    9462,
    '召唤编号下界的 `result < 150` 改 `<= 150`（150 被拒）',
    '    if (result > 199 || result < 150) {',
    '    if (result > 199 || result <= 150) {',
    '编号 150（闭区间端点）可用',
  ),
  make(
    9463,
    '召唤编号上界的 `result > 199` 改 `>= 199`（199 被拒）',
    '    if (result > 199 || result < 150) {',
    '    if (result >= 199 || result < 150) {',
    '编号 199（闭区间端点）可用',
  ),
  make(
    9464,
    '召唤的等级门 `cflag(0,9) < 30` 改 `<= 30`（等级恰好 30 时拒绝）',
    '    if (cflag(MASTER, 9) < 30) {',
    '    if (cflag(MASTER, 9) <= 30) {',
    '编号 150（闭区间端点）可用',
  ),
  make(
    9465,
    '召唤的肉便器门 `< 30` 改 `<= 30`（恰好 30 个时拒绝）',
    '    if (game.invasion.肉便器数 < 30) {',
    '    if (game.invasion.肉便器数 <= 30) {',
    '编号 150（闭区间端点）可用',
  ),
  make(
    9466,
    'ST_UP 上限条件的 `current >= limit` 改 `>`（取上限时放行）',
    '    if (current >= limit) {',
    '    if (current > limit) {',
    '当前值 == 上限时拒绝（current >= limit 的等号侧）',
  ),
  make(
    9467,
    'CURE_INSANE 的 `EXP <= 30` 改 `< 30`（勋章恰好 30 时放行）',
    '  if (exp_of(MASTER, 81) <= 30) {',
    '  if (exp_of(MASTER, 81) < 30) {',
    'EXP == 30 时仍被拒绝（条件是 <= 30）',
  ),
  make(
    9468,
    'GIVEN_HUMAN_LIFE 的 `EXP <= 0` 改 `< 0`（没勋章也放行）',
    "  if (exp_of(MASTER, 81) <= 0) {\n    era.print('人的生命是金钱无法购买的……'); // PRINTW",
    "  if (exp_of(MASTER, 81) < 0) {\n    era.print('人的生命是金钱无法购买的……'); // PRINTW",
    'EXP:MASTER:81 <= 0 时的提示',
  ),
  make(
    9469,
    '感觉封锁的 `ABL > 0` 改 `>= 0`（LV0 也拒）',
    '    if (abl(cid, PID_ABL[pid]) > 0) {',
    '    if (abl(cid, PID_ABL[pid]) >= 0) {',
    '部位 0 → TALENT:101 |= 2',
  ),
  make(
    9470,
    '洗脑助手资格的 `cflag(cid,0) < 2` 改 `<= 2`（恰好 2 也不可洗）',
    '    if (cid !== MASTER && cflag(cid, 0) < 2) {',
    '    if (cid !== MASTER && cflag(cid, 0) <= 2) {',
    // 检查拦下后流程回到主循环，输入序列对不上（夹具报错）——按用例名判红
    'brain_washing：四档「费用 × 素质」整表 + 三道检查',
  ),
  make(
    9471,
    'DEIMMATURITY 的 `talent(318) > 1` 改 `>= 1`（318 == 1 也掷骰）',
    '      if (talent(cid, 318) > 1) {',
    '      if (talent(cid, 318) >= 1) {',
    '318 == 1 保持（> 1 的等号侧）',
  ),
  make(
    9472,
    '选人濒死门的 `base < 1` 改 `<= 1`（BASE == 1 也被当成濒死）',
    '    if (base(result, 0) < 1) {',
    '    if (base(result, 0) <= 1) {',
    'BASE == 1 的角色可选（< 1 的等号侧）；BASE == 0 的被跳过',
  ),
  // —— #517：运算符优先级普查（&& 与 || 同层混写按 C 式读错） ——
  make(
    11142,
    '减龄魔药检查按 C 式「&& 优先」读错（年龄 < 18 不再吃种族年龄检查）',
    '    if ((cflag(cid, 451) < 18 || long_lived) && cflag(cid, 452) < 18) {',
    '    if (cflag(cid, 451) < 18 || (long_lived && cflag(cid, 452) < 18)) {',
    '年龄 17 但种族年龄 30 → 不拦',
  ),
  // —— #567：自由文字输入的空输入语义（0 ＝ 空输入）与输入 0 说明 ——
  make(
    11840,
    '刺青的自由输入改回 A 语义（0 落成刺青文字「0」，消去支不可达）',
    "  const results = input_text(await era.input({ useRule: false })); // INPUTS\n  if (results !== '') {",
    "  const results = String((await era.input({ useRule: false })) ?? ''); // 变异：A 语义\n  if (results !== '') {",
    '输入 0 落成空串',
  ),
  make(
    11841,
    '刺青提示行的输入 0 说明改坏（玩家看不到「不输入」的替代操作）',
    "  era.print('（输入 0 消去刺青）');",
    "  era.print('（输入 0 消去）');",
    'ere 侧补的输入 0 说明（#567）',
  ),
  make(
    11842,
    '自由局部调教提示行的输入 0 说明改坏（同上）',
    "  era.print('（输入 0 重置）');",
    "  era.print('（输入 0 重置调教）');",
    'ere 侧补的输入 0 说明（#567）',
  ),
  make(
    11844,
    '自由局部调教的自由输入改回 A 语义（0 落成调教项「0」，重置支不可达）',
    '  const results = input_text(await era.input({ useRule: false })); // INPUTS\n  chara(local).stronghold.自由调教内容 = results; // CSTR:LOCAL:7 = %RESULTS%',
    "  const results = String((await era.input({ useRule: false })) ?? ''); // 变异：A 语义\n  chara(local).stronghold.自由调教内容 = results; // CSTR:LOCAL:7 = %RESULTS%",
    '输入 0 落成空串',
  ),
  // —— #562：PRINTLC 系不换行（收尾的 PRINTL 只结束按钮那一行，不产生空行） ——
  // 三条各补回一处空行：按钮自成一行（＝ PRINTLC + 收尾的 PRINTL），多补
  // 一条就是多出来的空行（语义与勘误见 CONTEXT.md「输出 API 的排版与对齐」）。
  make(
    11866,
    '选人画面页脚补回空行（按「PRINTLC 自带换行」翻译的旧写法）',
    "  era.printButton('- 下一页', 1001); // PRINTLC [1001] - 下一页\n}",
    "  era.printButton('- 下一页', 1001); // PRINTLC [1001] - 下一页\n  era.print(''); // 变异：页脚之后多补空行\n}",
    '实验室选人画面页脚按钮之后不应有空行',
  ),
  make(
    11867,
    'EVILAPP 页脚补回空行（同上，PRINTL 只收 [999] 那一行）',
    "  era.printButton('- 返  回', 999); // PRINTLC",
    "  era.printButton('- 返  回', 999); // PRINTLC\n  era.print(''); // 变异：页脚之后多补空行",
    '恶魔体征改造页脚按钮之后不应有空行',
  ),
  make(
    11868,
    '秘密实验室页脚补回空行（同上，PRINTL 只收 [998] 那一行）',
    "    era.printButton('- 后一页', 998); // PRINTLC  [998] - 后一页",
    "    era.printButton('- 后一页', 998); // PRINTLC  [998] - 后一页\n    era.print(''); // 变异：页脚之后多补空行",
    '秘密实验室页脚按钮之后不应有空行',
  ),
  // 反方向的一条：这里的 PRINTL 是独立真空行（上一行是整行 PRINTL），删掉即错
  make(
    11872,
    'LABO_PAGE4 的真空行删除（这里的 PRINTL 是独立的一行，不是收尾）',
    "  era.print(''); // PRINTL\n  era.print('□洗脑 （助手用）');",
    "  // 变异：:272 的真空行删除\n  era.print('□洗脑 （助手用）');",
    '独立 PRINTL 仍是一个真空行',
  ),
  // —— #724：子页面换屏 ——
  {
    desc: 'M14496 实验室选人屏每轮换屏调用删除',
    file: 'ere/page/page-shop-labo.js',
    find: `    // 画面的公共骨架，一处接入覆盖所有条目
    await change_screen();
    draw_pick(cfg.intro, no_page, cfg.mode ?? 1, cfg.cancel ?? '返  回');`,
    replace: `    // 画面的公共骨架，一处接入覆盖所有条目
    draw_pick(cfg.intro, no_page, cfg.mode ?? 1, cfg.cancel ?? '返  回');`,
    tests: ['page-shop-labo', 'subpage-clear-screen'],
    must_mention: '实验室换屏：选人屏翻页空转轮重画，行数相同（#724）',
  },
  // —— #724：子页面换屏 ——
  {
    desc: 'M14497 实验室主菜单每轮换屏调用删除',
    file: 'ere/page/page-shop-labo.js',
    find: `    // $DRAW_PAGE。每轮绘制前换屏：画面上只有当前这一屏（ADR-0009）
    await change_screen();
    era.print('魔界的大门');`,
    replace: `    // $DRAW_PAGE。每轮绘制前换屏：画面上只有当前这一屏（ADR-0009）
    era.print('魔界的大门');`,
    tests: ['page-shop-labo', 'subpage-clear-screen'],
    must_mention: '实验室换屏：主菜单翻页空转轮重画，行数相同（#724）',
  },
  // —— #724：子页面换屏 ——
  {
    desc: 'M14499 run_modify 成交尾段的换屏确认等键删除（apply 播报未读就被清）',
    file: 'ere/page/page-shop-labo.js',
    find: `      // apply 的结果文案在回主菜单屏前经按键确认（ADR-0009）——全部
      // 条目的 apply 都打印，这里必等且只等一次
      await era.waitAnyKey();
      return 1;`,
    replace: `      // apply 的结果文案在回主菜单屏前经按键确认（ADR-0009）——全部
      // 条目的 apply 都打印，这里必等且只等一次
      return 1;`,
    tests: ['page-shop-labo', 'subpage-clear-screen'],
    must_mention:
      '实验室等键：条目成交的播报在回主菜单换屏前先经按键确认（#724）',
  },
  // —— #724 返工：换屏前的等键 ——
  {
    desc: 'M14500 modify_bustup 尾段等键删除（档位播报未读就被清）',
    file: 'ere/page/page-shop-labo.js',
    find: `    // 档位播报在回选人/主菜单屏前经按键确认（ADR-0009）
    await era.waitAnyKey();
    return 1;
  }
}

/** modify_bustdown：平胸改造。 */`,
    replace: `    // 档位播报在回选人/主菜单屏前经按键确认（ADR-0009）
    return 1;
  }
}

/** modify_bustdown：平胸改造。 */`,
    tests: ['page-shop-labo'],
    must_mention:
      '等键契约：改造族尾段（bustup/bustdown/futanari/penis）换屏前已确认',
  },
  // —— #724 返工：换屏前的等键 ——
  {
    desc: 'M14501 modify_bustdown 尾段等键删除（档位播报未读就被清）',
    file: 'ere/page/page-shop-labo.js',
    find: `    // 档位播报在回选人/主菜单屏前经按键确认（ADR-0009）
    await era.waitAnyKey();
    return 1;
  }
}

/** modify_bonyu：母乳体质化。 */`,
    replace: `    // 档位播报在回选人/主菜单屏前经按键确认（ADR-0009）
    return 1;
  }
}

/** modify_bonyu：母乳体质化。 */`,
    tests: ['page-shop-labo'],
    must_mention:
      '等键契约：改造族尾段（bustup/bustdown/futanari/penis）换屏前已确认',
  },
  // —— #724 返工：换屏前的等键 ——
  {
    desc: 'M14502 modify_futanari 尾段等键删除（形状播报未读就被清）',
    file: 'ere/page/page-shop-labo.js',
    find: `    // 改造播报在回选人屏前经按键确认（ADR-0009）
    await era.waitAnyKey();
    return 1;
  }
}

/** modify_futanari_erase：去扶她化。 */`,
    replace: `    // 改造播报在回选人屏前经按键确认（ADR-0009）
    return 1;
  }
}

/** modify_futanari_erase：去扶她化。 */`,
    tests: ['page-shop-labo'],
    must_mention:
      '等键契约：改造族尾段（bustup/bustdown/futanari/penis）换屏前已确认',
  },
  // —— #724 返工：换屏前的等键 ——
  {
    desc: 'M14503 tatoo_set_off 尾段等键删除（刺青播报未读就被清）',
    file: 'ere/page/page-shop-labo.js',
    find: `  // 刺青播报在回选人屏前经按键确认（ADR-0009）
  await era.waitAnyKey();
  return 1;`,
    replace: `  // 刺青播报在回选人屏前经按键确认（ADR-0009）
  return 1;`,
    tests: ['page-shop-labo'],
    must_mention: '等键契约：刺青/发色/肤色/转生/自由调教/强化尾段换屏前已确认',
  },
  // —— #724 返工：换屏前的等键 ——
  {
    desc: 'M14504 modify_hair_color 尾段等键删除（发色播报未读就被清）',
    file: 'ere/page/page-shop-labo.js',
    find: `    // 发色播报在回选人屏前经按键确认（ADR-0009）
    await era.waitAnyKey();
    return 1;`,
    replace: `    // 发色播报在回选人屏前经按键确认（ADR-0009）
    return 1;`,
    tests: ['page-shop-labo'],
    must_mention: '等键契约：刺青/发色/肤色/转生/自由调教/强化尾段换屏前已确认',
  },
  // —— #724 返工：换屏前的等键 ——
  {
    desc: 'M14505 modify_skin_color 尾段等键删除（肤色播报未读就被清）',
    file: 'ere/page/page-shop-labo.js',
    find: `    // 肤色播报在回选人屏前经按键确认（ADR-0009）
    await era.waitAnyKey();
    return 1;`,
    replace: `    // 肤色播报在回选人屏前经按键确认（ADR-0009）
    return 1;`,
    tests: ['page-shop-labo'],
    must_mention: '等键契约：刺青/发色/肤色/转生/自由调教/强化尾段换屏前已确认',
  },
  // —— #724 返工：换屏前的等键 ——
  {
    desc: 'M14506 demon_rebirth 转生播报等键删除（转生播报未读就被清）',
    file: 'ere/page/page-shop-labo.js',
    find: `      // 转生播报在回选人屏前经按键确认（ADR-0009）
      await era.waitAnyKey();
      return 1;`,
    replace: `      // 转生播报在回选人屏前经按键确认（ADR-0009）
      return 1;`,
    tests: ['page-shop-labo'],
    must_mention: '等键契约：刺青/发色/肤色/转生/自由调教/强化尾段换屏前已确认',
  },
  // —— #724 返工：换屏前的等键 ——
  {
    desc: 'M14507 st_up_labo「数值太大」等键删除（提示未读就被清）',
    file: 'ere/page/page-shop-labo.js',
    find: `      // 提示后等键再重画（ADR-0009：换屏前的输出先经按键确认）
      await era.waitAnyKey();
      continue input_loop; // GOTO INPUT_LOOP（重来整段）`,
    replace: `      // 提示后等键再重画（ADR-0009：换屏前的输出先经按键确认）
      continue input_loop; // GOTO INPUT_LOOP（重来整段）`,
    tests: ['page-shop-labo'],
    must_mention: '等键契约：刺青/发色/肤色/转生/自由调教/强化尾段换屏前已确认',
  },
  // —— #724 返工：换屏前的等键 ——
  {
    desc: 'M14508 set_free_train 设定播报等键删除（播报未读就被清）',
    file: 'ere/page/page-shop-labo.js',
    find: `  // 设定播报在回选人屏前经按键确认（ADR-0009）
  await era.waitAnyKey();
  return 1;`,
    replace: `  // 设定播报在回选人屏前经按键确认（ADR-0009）
  return 1;`,
    tests: ['page-shop-labo'],
    must_mention: '等键契约：刺青/发色/肤色/转生/自由调教/强化尾段换屏前已确认',
  },
  // —— #724 返工：换屏前的等键 ——
  {
    desc: 'M14509 trans_specialtalent 失败支等键删除（失败播报未读就被清）',
    file: 'ere/page/page-shop-labo.js',
    find: `      // 提示后等键再重画选人屏（ADR-0009：换屏前的输出先经按键确认）
      await era.waitAnyKey();
      continue input_loop; // GOTO INPUT_LOOP（重来整段）`,
    replace: `      // 提示后等键再重画选人屏（ADR-0009：换屏前的输出先经按键确认）
      continue input_loop; // GOTO INPUT_LOOP（重来整段）`,
    tests: ['page-shop-labo'],
    must_mention: '等键契约：素质互换的成功与失败两支换屏前已确认',
  },
  // —— #724 返工：换屏前的等键 ——
  {
    desc: 'M14510 trans_specialtalent 成功支等键删除（互换播报未读就被清）',
    file: 'ere/page/page-shop-labo.js',
    find: `    // 互换播报在回选人屏前经按键确认（ADR-0009）
    await era.waitAnyKey();
    return 1;`,
    replace: `    // 互换播报在回选人屏前经按键确认（ADR-0009）
    return 1;`,
    tests: ['page-shop-labo'],
    must_mention: '等键契约：素质互换的成功与失败两支换屏前已确认',
  },
  // —— #724 返工：换屏前的等键 ——
  {
    desc: 'M14511 penis_remodel 尾段等键删除（改造播报未读就被清）',
    file: 'ere/page/page-shop-labo.js',
    find: `    // 改造播报在回选人屏前经按键确认（ADR-0009）
    await era.waitAnyKey();
    return 1;
  }
}

// ————————————————————————————————————————————————`,
    replace: `    // 改造播报在回选人屏前经按键确认（ADR-0009）
    return 1;
  }
}

// ————————————————————————————————————————————————`,
    tests: ['page-shop-labo'],
    must_mention:
      '等键契约：改造族尾段（bustup/bustdown/futanari/penis）换屏前已确认',
  },
  // —— #740：勋章提示与苏生名单不读未声明的名字序号 ——
  {
    desc: 'M14562 given_human_life 的勋章提示改回读 talentname:398（素质表未声明，引擎抛错）',
    file: 'ere/page/page-shop-labo.js',
    find: "  await with_self_kojo(15, () => self_kojo(rand, undefined, true));\n  era.print('《失去了【勋章】》');",
    replace:
      '  await with_self_kojo(15, () => self_kojo(rand, undefined, true));\n  era.print(`《失去了【${talentname(398)}】》`); // 变异',
    tests: ['page-shop-labo'],
    must_mention: 'given_human_life：非人类支只提示不返回',
  },
  {
    desc: 'M14563 resulection 的勋章提示改回读 talentname:398',
    file: 'ere/page/page-shop-labo.js',
    find: "    break;\n  }\n  era.print('《失去了【勋章】》');",
    replace:
      '    break;\n  }\n  era.print(`《失去了【${talentname(398)}】》`); // 变异',
    tests: ['page-shop-labo'],
    must_mention: 'resulection：三道前置',
  },
  {
    desc: 'M14568 resulection 的勋章提示写成「获得了」（勋章随后清零）',
    file: 'ere/page/page-shop-labo.js',
    find: "    break;\n  }\n  era.print('《失去了【勋章】》');",
    replace: "    break;\n  }\n  era.print('《获得了【勋章】》'); // 变异",
    tests: ['page-shop-labo'],
    must_mention: 'resulection：三道前置',
  },
  {
    desc: 'M14564 cure_insane 的勋章提示改回读 talentname:398',
    file: 'ere/page/page-shop-labo.js',
    find: "    era.print('《【勋章】不见了》');",
    replace: '    era.print(`《【${talentname(398)}】不见了》`); // 变异',
    tests: ['page-shop-labo'],
    must_mention: 'cure_insane：崩坏与疯狂两支各清一项',
  },
  {
    desc: 'M14565 reget_chastity_key 的勋章提示改回读 talentname:398',
    file: 'ere/page/page-shop-labo.js',
    find: "  chara(t).stronghold.贞操带钥匙已丢弃 = 0; // CFLAG:T:49 = 0\n  era.print('《【勋章】不见了》');",
    replace:
      '  chara(t).stronghold.贞操带钥匙已丢弃 = 0; // CFLAG:T:49 = 0\n  era.print(`《【${talentname(398)}】不见了》`); // 变异',
    tests: ['page-shop-labo'],
    must_mention: 'reget_chastity_key：找回钥匙 + 勋章清零',
  },
  {
    desc: 'M14566 苏生名单改回按按钮编号读 ITEMNAME（魔物名表，105 等编号未声明）',
    file: 'ere/page/page-shop-labo.js',
    find: 'era.printButton(`- ${csv_name(count + 1)}`, idx);',
    replace: 'era.printButton(`- ${itemname(idx)}`, idx); // 变异',
    tests: ['page-shop-labo'],
    must_mention: 'resulection：名单显示亡者的预设名字',
  },
  {
    desc: 'M14567 苏生名单的预设编号差一（取 count 而不是 count + 1）',
    file: 'ere/page/page-shop-labo.js',
    find: 'era.printButton(`- ${csv_name(count + 1)}`, idx);',
    replace: 'era.printButton(`- ${csv_name(count)}`, idx); // 变异',
    tests: ['page-shop-labo'],
    must_mention: 'resulection：名单显示亡者的预设名字',
  },
  {
    desc: 'M14605 苏生前置扫描不排除在场角色',
    file: code,
    find: '\n      !era.getAddedCharacters().includes(count + 1)',
    replace: '\n      true',
    tests: ['page-shop-labo'],
    must_mention: 'resulection：死亡后重新加入的角色不再可选',
  },
  {
    desc: 'M14606 苏生名单不隐藏在场角色',
    file: code,
    find: '        !era.getAddedCharacters().includes(count + 1)',
    replace: '        true',
    tests: ['page-shop-labo'],
    must_mention: '苏生名单仅列出不在场的亡者',
  },
  {
    desc: 'M14607 苏生提交选择时不再检查目标是否在场',
    file: code,
    find: '      era.getAddedCharacters().includes(preset)',
    replace: '      false',
    tests: ['page-shop-labo'],
    must_mention: '拦截后可以取消，不会完成苏生',
  },
];
