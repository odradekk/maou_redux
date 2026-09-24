/**
 * ere/event/event-first.js 的行为测试（issue #22：@EVENTFIRST 真身；
 * #50：村娘分支与 FLAG:501 初期奴隶一问）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点，issue #16）。凡经主
 * 循环跑到标题画面的用例先 preset_gamebase（helpers/gamebase.js）；要走到
 * 村娘分支的用例再 preset_chara_17（helpers/chara.js，严格夹具下无预设
 * 加不进角色，#35 教训）。
 *
 * 覆盖五层：
 *   1. 端到端：标题选「新的猎物」→ 初期奴隶问答（村娘）→ 初始化 → 转向
 *      SHOP 渲染主菜单（#23 起主菜单真实渲染，以预置输入耗尽到站）；
 *   2. 初始化写入：随机/村娘两条路径与原作开局值逐项一致（全量断言，
 *      意外写入当场暴露）；
 *   3. 序号 vs 角色 ID：村娘分支的写入必须落在角色 ID 17 上，用「序号 1
 *      ≠ ID 17」的开局世界固定（#50 最易错处）；
 *   4. era-flag 包装层：月份/所持金的底层寻址钉在 yml/Flag.yml 的 id 上；
 *   5. 存根清单：docs/stub-registry.md 可检索且与本文件两处存根核对。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_gamebase } = require('./helpers/gamebase');
const {
  preset_chara_0,
  preset_chara_1,
  preset_chara_17,
} = require('./helpers/chara');

// 原作 @EVENTFIRST 直线赋值的完整期望（SYSTEM ver1.0.3.ERB:11-62，按语句
// 顺序；:42 的不可落地项不在内，见 docs/stub-registry.md）。
// 逐槽等价性由 test/extalent-table.test.js 用 BigInt 拆原值钉住）。
// DAY:1/MONEY 走包装层（flag:10001/10004），TARGET 走指针槽（flag:10005）。
// initial_slave = FLAG:501（#50：first-setting.js 问答的写入，:19 位置）；
// 选村娘（1）时追加村娘分支（:95-187）的写入组——原作的序号 1 一律译为
// 角色 ID 17。#463 起 :19 CALL FIRST_SETTING 全量实现五问：本函数固定用
// 魔王性别「女性」（跳过肉棒尺寸一问，减少本测试的输入面）+ 狂王性别
// 「扶她」（与 :15 的暂定值同值，flag:500 因此写两次、值不变）+
// initial_slave（唯一按参数变化的轴）+ 地下城模式「普通」。
function expected_init_writes(initial_slave) {
  const writes = [
    // 移植自建（#136 返工）：存读档指针 11 槽初值 -1（见 event-first 的
    // 注释与 era-flag.js 手写区），位于原作各行之前
    ...Array.from({ length: 11 }, (_, k) => ({
      name: `flag:${10018 + k}`,
      value: -1,
    })),
    { name: 'flag:26', value: [11, 115, 431, 325, 15, 232] }, // :11 种族年龄
    // 表槽 0-5（base-1000 打包 232015325431115011 的逐槽拆解，#105 决议四
    // 的数组承载——超 JS 安全整数，整数照搬必失精度）
    { name: 'flag:27', value: [1, 1] }, // :12 种族年龄表槽 6-7（原 001001）
    { name: 'flag:500', value: 2 }, // :15 狂王初期性别：扶她（问答前的暂定值）
    // :19 CALL FIRST_SETTING（#463 起全量五问，first-setting.js 的
    // first_setting()）：
    { name: 'cflag:0:16', value: -1 }, // :784 初吻对象（四个魔王性别分支
    // 写的都是同一个值，挪到编排层只写一次）
    // 魔王性别选「女性」（RESULT==1，:867-873）：四个 TALENT 全 0
    { name: 'talent:0:1', value: 0 },
    { name: 'talent:0:122', value: 0 },
    { name: 'talent:0:121', value: 0 },
    { name: 'talent:0:100', value: 0 },
    // 女性跳过肉棒尺寸一问（:800 IF MAOUSEX != 1）
    { name: 'flag:500', value: 2 }, // 狂王性别选「扶她」（第二次写，值不变）
    { name: 'flag:501', value: initial_slave }, // 初期奴隶一问
    { name: 'flag:502', value: 0 }, // 地下城模式一问（#181，选普通）
    ...Array.from({ length: 14 }, (_, k) => ({
      name: `flag:${60 + k}`,
      value: -1,
    })), // :21-24 FLAG:60..73 = -1
    { name: 'flag:10005', value: -1 }, // :26 TARGET = -1（指针槽）
    { name: 'flag:10029', value: -1 }, // BOUGHT = -1（购入品指针，#395）
    { name: 'flag:5', value: 17179934119 }, // :31 战斗日志显示设置
    { name: 'flag:10001', value: 1 }, // :33 DAY:1 = 1（月）
    { name: 'itemsales:53', value: 1 }, // :35 53 号道具开局上架（#38 恢复：
    // Item 表已落地，item* 直接崩溃支消除；进商店轮时 @EVENTSHOP 的清零循环
    // 会再把它清 0——原作语义，见端到端用例的尾部断言）
    ...Array.from({ length: 8 }, (_, k) => ({
      name: `flag:${200 + k}`,
      value: 1,
    })), // :36-40 FLAG:200..207 = 1
    { name: 'flag:35', value: 0 }, // :45 濒死自动结束调教：关
    { name: 'flag:37', value: 1 }, // :47 着衣系统：开
    { name: 'flag:8', value: 7 }, // :50-52 新档翻位 0b111
    { name: 'global:3', value: -1 }, // :53 冒險者性別 = -1（#547 落 global:3，
    // GLOBAL SAVEDATA：每次开局无条件重置，设置页 [27] 的用户选择维持到
    // 下一次新游戏）
    { name: 'flag:10004', value: 10000 }, // :55 MONEY = 10000
    { name: 'exflag:4444', value: 1234 }, // :56 EX_FLAG:4444 = 1234（#401 起播种：
    // @DEBUG_CHECK 按 MONEY == EX_FLAG:4444 + 8766 判「钱被改过」，这份不变量
    // 是它不误伤正常开局的全部依据）
    { name: 'cflag:0:451', value: 21 }, // :60 魔王相当于人类年龄
    { name: 'exflag:99', value: 70 }, // :62 EX_FLAG:99 = 70（初始威望，#117
    // 接入：ExFlag.yml 已随 #113 落地，播种是侵略线窄路径的前置——威望 0
    // 会让首次魔力出兵落进「岌岌可危」档直接失败）
  ];
  if (initial_slave === 1) {
    writes.push(
      // 移植自建（#67，非原作动作）：村娘加入点的 portcflag 版本戳，先于
      // 原作 :105 起的 CFLAG 组（接入位置在 addCharacter/add_chara_ex 之后）
      { name: 'portcflag:17:数据版本', value: 1 },
      { name: 'flag:10005', value: 17 }, // :107 TARGET = 1（序号）→ 角色 ID 17
      { name: 'cflag:17:420', value: 1 }, // :110 玛奥专属标记
      // :111 CALL CHARA_NAME_DEFINE（无实参；#565 起真身 ere/chara/
      // chara-name.js）：省略数值参数按 0 处理（无 TARGET 代入），L_A = 0 =
      // 魔王，落特殊角色分支（:153-162）——两槽称呼取预设呼び名（addCharacter
      // 已写过同值，这里按原作再写一次）、NID = 10000；村娘（17）不经此调用
      { name: 'callname:0:-1', value: '你' },
      { name: 'callname:0:-2', value: '你' },
      { name: 'cflag:0:6', value: 10000 },
      // :160 CALL RELATION_RENAME_REBUILD(L_A)（RELATION.ERB:52）真身：
      // needs_rebuild(0) 的 nid() 副作用先写一次 NID，核对不过（对角
      // c_relation 未初始化）→ @RELATION_REBUILD（:135-194）逐加入角色修
      // 复对角：角色 0 与 17 各「写 NID + 写 c_relation 对角」——村娘的
      // NID（10017）由这一步落，与原作同源（原作同样不经 :111 给村娘定名）
      { name: 'cflag:0:6', value: 10000 },
      { name: 'cflag:0:6', value: 10000 },
      { name: 'c_relation:0:0', value: 10000 },
      { name: 'cflag:17:6', value: 10017 },
      { name: 'c_relation:17:17', value: 10017 },
      { name: 'cflag:17:9', value: 1 }, // :112 等级
      { name: 'cflag:17:1', value: 0 }, // :113 解除占用（可调教的关键一步）
      { name: 'cflag:17:11', value: 15 }, // :114-117 战斗数值
      { name: 'cflag:17:12', value: 15 },
      { name: 'cflag:17:13', value: 15 },
      { name: 'cflag:17:14', value: 15 },
      { name: 'cflag:17:16', value: -1 }, // :118 未定状态位
      { name: 'cflag:17:450', value: 31 }, // :119 一人称（自称）编号
      // CHAR_BODY_GENERATE_WAPPED 链内的 relation 核对（needs_rebuild() 无参
      // 形态的 nid() 副作用：两名角色的 NID 各重写一次、值不变，核对通过
      // 不再重建）——上一次重建已把对角修好，这两笔是纯副作用写
      { name: 'cflag:0:6', value: 10000 },
      { name: 'cflag:17:6', value: 10017 },
      // :121 CALL CHAR_BODY_GENERATE_WAPPED, 1（#385 起真身）：FLAG:5 的位
      // 12/15 在 :31 已开（17179934119），故身体数据真的生成。写入顺序是
      // CHAR_SIZE_GENERATE 先落胸围分量（CFLAG:458/459），再由
      // CHAR_BODY_GENERATE_WAPPED 落七元组（451-457）。这九个值由
      // Math.random ≡ 0 的确定随机源算出（本用例显式注入，见下）：
      // 年龄 = 17 + 处女修正 1 = 18，取点 RAND:17 掷 0（-2）→ 16，未设
      // 种族走 1 倍档 → CFLAG:452 = 16；身高 1549 / 体重 445 / 胸围 792 /
      // 腰围 573 / 臀围 821 / 胸围差 125 / 下胸围 667（100 倍定点值的
      // 百分之一，逐位算式见 CHARA_BODY.ERB:408-761 与 CHARA_BODY2.ERB）
      { name: 'cflag:17:458', value: 125 },
      { name: 'cflag:17:459', value: 667 },
      { name: 'cflag:17:451', value: 16 },
      { name: 'cflag:17:452', value: 16 },
      { name: 'cflag:17:453', value: 1549 },
      { name: 'cflag:17:454', value: 445 },
      { name: 'cflag:17:455', value: 792 },
      { name: 'cflag:17:456', value: 573 },
      { name: 'cflag:17:457', value: 821 },
    );
  }
  return writes;
}

// #138：FLAG:26/27 数组承载与原打包值逐槽等价（BigInt 拆解，无引擎也跑）。
// 原值 232015325431115011 ≈ 2.32e17 超 Number.MAX_SAFE_INTEGER 约 26 倍，
// 只能用 BigInt 算：CHARA_BODY.ERB:291 的取槽式 RACE_CLA = FLAG:26 /
// POWER(1000, RACE_ID) % 1000，槽 0 是最低三位。001001（FLAG:27）同理，
// 槽 6-7（:289 接 RACE_ID >= 6）。event-first.js 的字面数组若与拆解不符，
// 上方 expected_init_writes 的 deepEqual 会在 var_writes 处红。
test('FLAG:26/27 数组承载与原打包值逐槽等价（BigInt 拆解原值 232015325431115011 / 001001）', () => {
  const unpack = (packed, slots) => {
    const value = BigInt(packed);
    return Array.from({ length: slots }, (_, slot) =>
      Number((value / 1000n ** BigInt(slot)) % 1000n),
    );
  };
  assert.deepEqual(
    unpack('232015325431115011', 6),
    [11, 115, 431, 325, 15, 232],
  );
  assert.deepEqual(unpack('001001', 2), [1, 1]);
});

test('que2mk：QUE2MK 恒返回 0（真身，非占位——SYSTEM_MODEINT.ERB:1-2 的真实翻译）', () => {
  const fixture = create_era_fixture();
  const { que2mk } = fixture.load_module('event/first-setting');
  assert.equal(que2mk(), 0);
});

test('ask_maou_sex：四个分支各自的 TALENT/CFLAG 写入（:860-889）', async () => {
  const fixture = create_era_fixture();
  const { ask_maou_sex } = fixture.load_module('event/first-setting');
  const { chara } = fixture.load_module('facade/chara');

  const cases = [
    { result: 0, 童贞: 1, 男人: 1, 扶她: 0, 娇小: 0, 未熟: 0 },
    { result: 1, 童贞: 0, 男人: 0, 扶她: 0, 娇小: 0, 未熟: 0 },
    { result: 2, 童贞: 1, 男人: 0, 扶她: 1, 娇小: 0, 未熟: 0 },
    { result: 3, 童贞: 1, 男人: 1, 扶她: 0, 娇小: 1, 未熟: 1 },
  ];
  for (const c of cases) {
    fixture.set_inputs(c.result);
    const picked = await ask_maou_sex();
    assert.equal(picked, c.result);
    assert.equal(chara(0).train.童贞, c.童贞);
    assert.equal(chara(0).chara.男人, c.男人);
    assert.equal(chara(0).chara.扶她, c.扶她);
    assert.equal(chara(0).chara.娇小, c.娇小);
    assert.equal(chara(0).train.未熟, c.未熟);
  }
});

test('ask_maou_sex：越界输入不落笔、重问直到有效值（原作无重试豁免，本切片强制作答）', async () => {
  const fixture = create_era_fixture();
  const { ask_maou_sex } = fixture.load_module('event/first-setting');
  fixture.set_inputs(9, 1); // 9 不是任何已打印按钮的快捷键
  await assert.rejects(
    () => ask_maou_sex(),
    /测试夹具：输入不合法/,
    '9 不在本轮按钮白名单内，引擎侧不可达（#130），不应被当作有效重问输入消费',
  );
});

test('ask_penis_size：0-4 写 chara(0).chara.阴茎的状态（:891-898）', async () => {
  const fixture = create_era_fixture();
  const { ask_penis_size } = fixture.load_module('event/first-setting');
  const { chara } = fixture.load_module('facade/chara');
  fixture.set_inputs(3);
  const picked = await ask_penis_size();
  assert.equal(picked, 3);
  assert.equal(chara(0).chara.阴茎的状态, 3);
});

test('ask_kuangwang_sex：0-2 写 game.system.狂王性别（:900-908），走具名门面不裸写 FLAG:500', async () => {
  const fixture = create_era_fixture();
  const { ask_kuangwang_sex } = fixture.load_module('event/first-setting');
  const { game } = fixture.load_module('facade/game');
  fixture.set_inputs(1);
  const picked = await ask_kuangwang_sex();
  assert.equal(picked, 1);
  assert.equal(game.system.狂王性别, 1);
  assert(
    fixture.text_lines().some((t) => t.includes('狂王是支配这个地区的领主')),
  );
});

test('#615 ask_kuangwang_sex：两条 PRINTL 各是一行一次 print（不带尾换行）', async () => {
  const fixture = create_era_fixture();
  const { ask_kuangwang_sex } = fixture.load_module('event/first-setting');
  fixture.set_inputs(2);
  await ask_kuangwang_sex();

  // SYSTEM ver1.0.3.ERB:902/:903 是两条 PRINTL（两行两 Row）——一次 print 一条；
  // 并成「一次 print + 内部 \n」会少一个 Row，末尾补 \n 会多一个显示行（#615）
  assert.equal(
    fixture.text_lines()[0],
    '狂王是支配这个地区的领主',
    ':902 的首行',
  );
  assert.equal(
    fixture.text_lines()[1],
    '继承了曾经封印你的勇者的血统，打算把你再次封印',
    ':903 的第二行（独立一行一次 print）',
  );
  assert.equal(fixture.lines[2].type, 'button', ':904 的按钮行紧随其下');
});

test('first_setting：魔王性别选女性（1）跳过肉棒尺寸一问（:800 IF MAOUSEX != 1）', async () => {
  const fixture = create_era_fixture();
  const { first_setting } = fixture.load_module('event/first-setting');
  // 女性 + 狂王男性 + 初期奴隶随机 + 地下城模式普通——若肉棒尺寸一问被
  // 误触发，第二个输入 0 会被它消费而非狂王性别，之后的断言会连锁错位
  fixture.set_inputs(1, 0, 0, 0);
  await first_setting();
  assert.equal(
    fixture.inputs_consumed.filter((e) => e.api === 'input').length,
    4,
    '跳过肉棒尺寸后，五问只消费四次输入',
  );
  assert.equal(
    fixture.var_writes.filter((w) => w.name === 'talent:0:318').length,
    0,
    '肉棒尺寸一问不应被触发，不应出现任何 talent:0:318 写入',
  );
});

test('first_setting：魔王性别选男性（0）会问肉棒尺寸（:800 条件为真）', async () => {
  const fixture = create_era_fixture();
  const { first_setting } = fixture.load_module('event/first-setting');
  fixture.set_inputs(0, 2, 0, 0, 0); // 男性 + 肉棒尺寸短小包茎 + 狂王男性 + 随机 + 普通
  await first_setting();
  const { chara } = fixture.load_module('facade/chara');
  assert.equal(chara(0).chara.阴茎的状态, 2);
});

test('端到端：新的猎物 → 初期奴隶选村娘 → 初始化 → 转向 SHOP 渲染主菜单', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  // 严格夹具：角色 0/17 都要有预设才加得进（#35 镜像的引擎守卫）
  preset_chara_0(fixture);
  preset_chara_17(fixture);
  // 六次输入：标题「新的猎物」、魔王性别「女性」（跳过肉棒尺寸一问）、
  // 狂王性别「扶她」、初期奴隶问答「村娘」、地下城模式「普通」（#181 加的
  // 一问）、搬运方式「抱起来」
  fixture.set_inputs(1, 1, 2, 1, 0, 1);
  const main = fixture.load_module('main');

  // 流程：标题消费输入 1（resetData + 加入角色 0 + 专属初始化）→ BEGIN
  // FIRST → @EVENTFIRST 真身：FIRST_SETTING 五问（魔王性别「女性」→ 跳过
  // 肉棒尺寸 → 狂王性别「扶她」→ 初期奴隶「村娘」→ 地下城模式「普通」，
  // #463 全量实现）→ 直线赋值、开场叙事（:91 读键）→ 村娘分支：加入角色
  // 17、CFLAG 一组、描写（读键）、搬运二选一（输入 1）、囚禁播报（读键）
  // → BEGIN SHOP → 主循环进 SHOP：绘制主菜单 → era.input() 输入耗尽抛错
  // 到站。
  await assert.rejects(() => main(), /预置输入已耗尽/);

  // 新游戏四件套（标题侧）+ 村娘（#50）：清档后已加入 [0, 17]
  assert.deepEqual(fixture.chara_no, [0, 17]);
  assert(
    fixture.var_writes.some(
      (w) => w.name === 'ex_talent:0:200' && w.value === 1,
    ),
    '角色 0 的专属初始化必须经分发注册表触发（issue #21）',
  );

  // 读键恰为原作各 PRINTW/WAIT 的次数，无多余等待（主菜单的 input 在取数
  // 前抛错，不记入已消费）：:91 开场叙事 1 次、村娘分支 :96-100 五次、
  // :126-129 四次、抱起分支 :138-142 五次、:175 囚禁播报 1 次
  assert.deepEqual(fixture.inputs_consumed, [
    { api: 'input', value: 1 }, // 标题「新的猎物」
    { api: 'input', value: 1 }, // 魔王性别「女性」（跳过肉棒尺寸一问）
    { api: 'input', value: 2 }, // 狂王性别「扶她」
    { api: 'input', value: 1 }, // 初期奴隶「村娘」
    { api: 'input', value: 0 }, // #181 地下城模式一问（普通）
    ...Array.from({ length: 1 }, () => ({ api: 'waitAnyKey' })),
    ...Array.from({ length: 5 }, () => ({ api: 'waitAnyKey' })),
    ...Array.from({ length: 4 }, () => ({ api: 'waitAnyKey' })),
    { api: 'input', value: 1 },
    ...Array.from({ length: 5 }, () => ({ api: 'waitAnyKey' })),
    ...Array.from({ length: 1 }, () => ({ api: 'waitAnyKey' })),
  ]);

  // 开场叙事、村娘分支文本与存根占位都可见（存根行含原作函数名，可检索）
  const texts = fixture.text_lines();
  assert(texts.includes('今天，又有纯洁无垢的勇者敲响了地下城的大门……'));
  assert(texts.includes('魔王俯视着被吸取了能量用于破坏封印的村女'));
  assert(texts.includes('因为破坏封印时魔力的涌流，村女的衣服全都剥落了。'));
  // 囚禁播报读 callname:17:-1（引擎 addCharacter 写入的预设名）
  assert(texts.includes('村娘玛奥被囚禁在了地牢里'));
  // :78 CALL CHARA_NAME_INIT 真的被调用（#388，只有读取 namelistkeys 才能证明，因为它无其它可观察副作用）
  assert(
    fixture.var_reads.some((r) => r.name === 'namelistkeys'),
    'EVENTFIRST 链必须真的调用了 chara_name_init',
  );
  // FIRST_SETTING 自 #463 起五问全部落地，first-setting.js 不再打占位行
  assert(
    !texts.some((line) => line.includes('@FIRST_SETTING')),
    'FIRST_SETTING 已全量实现，不得再出现存根占位行',
  );
  assert(
    !texts.some((line) => line.includes('@CHARA_NAME_DEFINE')),
    '称呼定义已落真身（#565 接线），不得再出现存根占位行',
  );
  // 真身的可观察效果：NID 落 10000 + 17（特殊角色分支 :159 的「定义 NID」）
  assert.equal(fixture.store.get('cflag:17:6'), 10017);
  // #385 起 CHAR_BODY_GENERATE_WAPPED 是真身（ere/chara/chara-body.js）：
  // 判据从占位行改为 CFLAG:17:451-457 的落盘（本用例不注入随机源，只断言
  // 写入发生；逐值与全量写入断言在下方两条「初始化写入」用例里）
  assert(
    fixture.var_writes.some((w) => w.name === 'cflag:17:451'),
    '村娘的身体数据必须经真身落盘（FLAG:5 已开位 12/15）',
  );
  assert(
    !texts.some((line) => line.includes('@CHAR_BODY_GENERATE_WAPPED')),
    '身体数据已落真身，不得再出现占位行',
  );
  // 随机路径被村娘出口（:187 BEGIN SHOP 即结束函数）跳过，其存根不得出现
  assert(
    !texts.some((line) => line.includes('@RAND_CHARA_MAKE')),
    '村娘路径不得触发随机角色生成的占位（原作 BEGIN 即跳出随机路径）',
  );
  // 反向钉（同 test/page-save-load.test.js 的同款写法）：CHARA_NAME_INIT 已落真身（#388），不得再出现存根占位行
  assert(
    !texts.some((line) => line.includes('@CHARA_NAME_INIT')),
    '角色名初始化已落真身，不得出现存根占位行',
  );

  // 初始化后的开局值（验收项：日期与金钱取原作开局值）。
  // date：@EVENTFIRST 本身不初始化、留 0（1:1 照搬），主菜单到站前
  // @SHOW_SHOP 的防御性钳制已把它修成 1。
  const era_flag = fixture.load_module('era-utils/era-flag');
  assert.equal(era_flag.month, 1);
  assert.equal(era_flag.money, 10000);
  assert.equal(era_flag.day_count, 0);
  assert.equal(era_flag.date, 1, 'date 应已被 @SHOW_SHOP 钳成 1');
  assert.equal(era_flag.time, 0);
  // :107 TARGET = 1（序号）→ 指针槽存角色 ID 17（#21 语义；主菜单的
  // 防御性钳制放行：17 在已加入列表且 cflag:17:1 == 0）
  assert.equal(era_flag.target, 17);

  // 【#50 验收】主菜单 [100] 调教入口的可用性判据 A > 0：可选奴隶数 = 1
  // （玛奥；魔王不计入、cflag:17:1 = 0 未占用）。渲染与分发读的都是
  // count_selectable_slaves（page-shop.js 的 usershop 同源）。
  const { count_selectable_slaves } = fixture.load_module(
    'page/page-main-menu',
  );
  assert.equal(
    count_selectable_slaves(),
    1,
    '村娘分支走完后必须恰有一名可选奴隶（A > 0，[100] 可用）',
  );
  // 可视面：调教目标按钮（496）点亮（指针 >= 1 即亮，era 侧存的是 ID 17）
  const target_button = fixture.lines.find(
    (line) => line.type === 'button' && line.accelerator === 496,
  );
  assert.ok(target_button, '主菜单必须渲染调教目标按钮（496）');
  assert.equal(target_button.color, undefined, '已选中目标时按钮不得调暗');

  // @EVENTSHOP 的清零循环（#38 恢复）：进商店轮时 ITEMSALES:0..99 依序
  // 清 0。两层 1:1 写入都要在：EVENTFIRST 先置 53 号 = 1，清零块随后把它
  // 清回 0（原作语义，在售位由商店侧重新点亮）；清零块完整且连续，紧随
  // 其后的是 @SHOW_SHOP 的日期钳制（清零在绘制之前）。
  const writes = fixture.var_writes;
  const set_53 = writes.findIndex(
    (w) => w.name === 'itemsales:53' && w.value === 1,
  );
  assert.ok(set_53 >= 0, '@EVENTFIRST 必须先置 itemsales:53 = 1');
  const zero_start = writes.findIndex(
    (w) => w.name === 'itemsales:0' && w.value === 0,
  );
  assert.ok(
    zero_start > set_53,
    '清零循环必须在 EVENTFIRST 的上架写入之后（BEGIN SHOP 才执行）',
  );
  assert.deepEqual(
    writes.slice(zero_start, zero_start + 100),
    Array.from({ length: 100 }, (_, k) => ({
      name: `itemsales:${k}`,
      value: 0,
    })),
    '@EVENTSHOP 必须依序清 100 个道具上架位',
  );
  // @EVENTSHOP 清零之后紧接着把 BOUGHT 复位 -1（#395；与 @EVENTFIRST 的
  // 初始化同一变量，见 page-shop.js 文件头 BOUGHT 段），随后是本轮
  // @SHOW_SHOP 自己的两段写入
  assert.deepEqual(writes[zero_start + 100], { name: 'flag:10029', value: -1 });
  // #399 起 @SHOW_SHOP:25 的 CALL CLEAR_SHOP 是真身（清 ITEMSALES:0-299，
  // page-item-shop.js clear_shop）——比 @EVENTSHOP 的 100 格多出 200 格，
  // 1:1 照搬原作的两层写入（商店本体随后重新点亮在售位）
  assert.deepEqual(
    writes.slice(zero_start + 101, zero_start + 401),
    Array.from({ length: 300 }, (_, k) => ({
      name: `itemsales:${k}`,
      value: 0,
    })),
    '@SHOW_SHOP 的 CLEAR_SHOP 必须依序清 300 个道具上架位',
  );
  // 之后才是日期钳制（原作 :33-36）
  assert.deepEqual(writes[zero_start + 401], { name: 'flag:10002', value: 1 });
});

test('初始化写入（随机）：问答选 0 后开局直线赋值逐项一致；随机奴隶经 @RAND_CHARA_MAKE 真身生成（#565）', async () => {
  const fixture = create_era_fixture();
  // rand ≡ 0 → RAND(1,17) 取 1：勇者位 1 的预设必须先种（严格夹具，#35）
  preset_chara_0(fixture);
  preset_chara_1(fixture);
  const { STUBBED_CALLS } = fixture.load_module('event/event-first');
  const { emit } = fixture.load_module('system/event/registry');
  const { STATE } = fixture.load_module('system/flow/begin-signal');

  // 标题步骤的等价物（emit 直调不经标题）：先加角色 0，原作语境的
  //「魔王在列」成立——RAND_CHARA_MAKE 的占位判定与收下播报都读已加入列表
  fixture.era.addCharacter(0);
  // 四次问答（魔王性别「女性」跳过肉棒尺寸 + 狂王性别「扶她」+ 初期奴隶
  // 「随机」+ 地下城模式「普通」）+ RAND_CHARA_MAKE 的两处输入：形象确认
  // 选 [100] 進む（首轮性格/发色随机补设后直接收）、收下确认选 [2]
  fixture.set_inputs(1, 2, 0, 0, 100, 2);
  fixture.override_math_random(() => 0);
  let pending;
  try {
    pending = await emit('EVENTFIRST');
  } finally {
    fixture.restore_math_random();
  }

  // 出口：随机路径的共用出口 :231 BEGIN SHOP
  assert.equal(pending, STATE.SHOP);
  // #136 返工的独立锚（放前缀断言之前：变异删初始化时此处先红）
  assert(
    Array.from({ length: 11 }, (_, k) => `flag:${10018 + k}`).every((name) =>
      fixture.var_writes.some((w) => w.name === name && w.value === -1),
    ),
    '11 个存读档指针槽必须初始化为 -1（登记后 fillData 补 0 会冒充 0 号槽）',
  );
  // :203 之前的直线赋值逐项一致（全量前缀断言：:11-:62 的原作开局值不被
  // 接线改动）。:203 起进入 RAND_CHARA_MAKE 真身（换人循环、形象确认、
  // CHAR_MAKE 管线），其写入由 test/chara-make.test.js 各段锁，此处锁
  // 「真的进了那段」与链尾的原作语义（见下）。
  const prefix = expected_init_writes(0);
  assert.deepEqual(
    fixture.var_writes.slice(0, prefix.length),
    prefix,
    '随机路径的直线赋值必须与村娘路径共用同一前缀（:11-:62）',
  );
  const texts = fixture.text_lines();
  assert(
    !texts.some((line) => line.includes('@RAND_CHARA_MAKE')),
    '随机角色生成已接真身，不得再出现占位行',
  );
  // 生成的奴隶真的入列：勇者位 1（rand ≡ 0 掷 1）+ 魔王 0
  assert.deepEqual(fixture.chara_no, [0, 1]);
  // 形象确认循环与收下确认的可见文本（非战役招募文案，:76 的普通版）。
  // [100] 是 :103-104 的原作正文、继续确认的唯一入口——**必须按钮化**
  // （PR #53 通则：EraElectron 的 input 只收本轮按钮快捷键，纯文本前缀行
  // 实机敲不进 100，形象确认会卡死；审查 #565 起钮住）。断言看 rendered
  assert(texts.includes('呃……面前的勇者，是这个形象的……'));
  // （引擎拼 [快捷键] 前缀后的实际显示）
  const proceed_btn = fixture.lines.find(
    (l) => l.type === 'button' && l.accelerator === 100,
  );
  assert(proceed_btn, '形象确认必须有 [100] 進む按钮');
  assert.match(
    proceed_btn.rendered,
    /^\[100\] 你发动了魔王真眼，深入探究更进一步的详细素质……/,
    '[100] 按钮的渲染文本必须与原作 PRINTL 行一致',
  );
  assert(texts.includes('解开你封印的，真的是这样的对象吗…？'));
  // SHOW_CHARA_INFO（-2 贡品页）按原作 :25-26/:320-321 临时把 TARGET 换成
  // 被显示的角色：语尾口上按新角色取，不得回退到打 @GOBI_KOUJO 占位
  // （#565 返工第 2 条引擎实测：换 TARGET 前 -2 页会打 13 行语尾占位）
  assert(
    !texts.some((t) => t.includes('@GOBI_KOUJO')),
    '形象确认的 -2 贡品页不得打语尾占位（TARGET 临时换 + 未命中静默）',
  );
  // :172-186 收下播报（rand ≡ 0 → 非异国，无「异国的」前缀）与读键收尾
  assert(texts.includes('冒险者佳奈美被囚禁在了地牢里！'));
  // :182 FLAG:402 用过的标志归位、:184 TARGET = FLAG:1（开局 0）
  assert.equal(fixture.store.get('flag:402'), 0);
  const era_flag = fixture.load_module('era-utils/era-flag');
  assert.equal(era_flag.target, 0, ':184 TARGET = FLAG:1（开局默认 0）');
  // 存根清单核对用的导出（RAND_CHARA_MAKE 已接线，本文件存根名单清空）
  assert.deepEqual(STUBBED_CALLS, []);
});

test('初始化写入（村娘）：CFLAG 一组 1:1 落在角色 ID 17 上（全量断言）', async () => {
  const fixture = create_era_fixture();
  // 两层预置（#565 起 CHARA_NAME_DEFINE 真身读 chara:17 静态表取 CSVCALLNAME，
  // 单喂 addCharacter 守卫层会把称呼写成空串）；严格夹具下村娘也真的入列
  preset_chara_0(fixture);
  preset_chara_17(fixture);
  fixture.era.addCharacter(0); // 标题步骤的等价物
  fixture.load_module('event/event-first'); // 顶层注册 EVENTFIRST 处理器
  const { emit } = fixture.load_module('system/event/registry');
  const { STATE } = fixture.load_module('system/flow/begin-signal');

  // #385 起身体数据生成为真身，会消耗随机数：注入 Math.random ≡ 0（RAND:N
  // 恒 0）把九个身体数据写入钉成定值（算式见 expected_init_writes 的注释）
  fixture.override_math_random(() => 0);
  try {
    // 五次输入：魔王性别「女性」（跳过肉棒尺寸）、狂王性别「扶她」、问答
    // 「村娘」、地下城模式「普通」（#181 的第二问）、搬运「抱起来」
    fixture.set_inputs(1, 2, 1, 0, 1);
    const pending = await emit('EVENTFIRST');

    // 出口：村娘分支自己的 :187 BEGIN SHOP
    assert.equal(pending, STATE.SHOP);
    // 全量断言：任何多写、少写、写错地址（如 cflag:1:*）、写错值都当场红
    assert.deepEqual(fixture.var_writes, expected_init_writes(1));
  } finally {
    fixture.restore_math_random();
  }
});

test('【#50 验收】村娘分支的写入落在角色 ID 17 而非已加入序号 1', async () => {
  // 序号≠ID 的开局世界：已加入 [0, 17]——村娘的已加入序号是 1、角色 ID 是
  // 17，两者不重合；角色 ID 1 是另一个（不存在的）角色。照抄原作数字 1 的
  // 移植（cflag:1:*、target = 1）在本世界里会把全部状态写到一个空角色头上，
  // 与正确行为可区分——这正是要固定的那类错。
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  preset_chara_17(fixture);
  fixture.load_module('event/event-first'); // 顶层注册 EVENTFIRST 处理器
  const { emit } = fixture.load_module('system/event/registry');
  fixture.set_inputs(1, 2, 1, 0, 1); // 女性 + 扶她 + 村娘 + 普通（#181 第二问）+ 搬运默认走完
  // 标题步骤的等价物（emit 直调不经标题）：先加角色 0，村娘加入后世界才是
  // 原作语境的 [0, 17]——序号 1 恰好指向村娘
  fixture.era.addCharacter(0);
  await emit('EVENTFIRST');

  // CFLAG 组的每笔都落在 17 上，一笔都不许落在 1 上
  const wrong_index_writes = fixture.var_writes.filter((w) =>
    /^cflag:1:/.test(w.name),
  );
  assert.deepEqual(
    wrong_index_writes,
    [],
    '不得出现 cflag:1:* 的写入（那是角色 ID 1，不是序号 1 的村娘）',
  );
  assert.equal(fixture.store.get('cflag:17:420'), 1);
  assert.equal(fixture.store.get('cflag:17:450'), 31);
  // 指针槽：17（角色 ID），不是 1（序号）
  const era_flag = fixture.load_module('era-utils/era-flag');
  assert.equal(era_flag.target, 17);
  // 世界本身：序号 1 ↔ ID 17 的对应关系成立
  assert.deepEqual(fixture.chara_no, [0, 17]);
});

test('初期奴隶问答：玩家选择生效（无效输入引擎侧不可达，#130）', async () => {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  preset_chara_1(fixture); // rand ≡ 0 时随机路径掷勇者位 1（#565 起真身）
  fixture.load_module('event/event-first'); // 顶层注册 EVENTFIRST 处理器
  const { emit } = fixture.load_module('system/event/registry');
  const { STATE } = fixture.load_module('system/flow/begin-signal');

  // 原作用例曾先喂 9（越界）验证重问。问答每轮重印按钮，引擎的 input()
  // 只送达已打印按钮的快捷键，越界值在渲染层被弹回——重问分支是引擎死
  // 路径，此处只走有效输入。魔王性别选男性（0）以同时覆盖肉棒尺寸一问
  // （0 = 普通阴茎），狂王性别选男性（0）。随机路径选 0 后接
  // RAND_CHARA_MAKE 的形象确认 [100] 与收下 [2]（#565）
  fixture.set_inputs(0, 0, 0, 0, 0, 100, 2);
  fixture.override_math_random(() => 0);
  let pending;
  try {
    pending = await emit('EVENTFIRST');
  } finally {
    fixture.restore_math_random();
  }

  assert.deepEqual(
    fixture.inputs_consumed.filter((e) => e.api === 'input'),
    [
      { api: 'input', value: 0 }, // 魔王性别「男性」
      { api: 'input', value: 0 }, // 肉棒尺寸「普通阴茎」（男性不跳过）
      { api: 'input', value: 0 }, // 狂王性别「男性」
      { api: 'input', value: 0 }, // 初期奴隶「随机」
      { api: 'input', value: 0 }, // 地下城模式「普通」
      { api: 'input', value: 100 }, // 形象确认：進む（RAND_CHARA_MAKE :107）
      { api: 'input', value: 2 }, // 收下确认（:158）
    ],
  );
  // 五问的按钮都是 0 号快捷键；形象确认的 [0] 改印象按钮同号（#565 返工
  // 第 1 条），按正文排除
  const question_rounds = fixture.lines.filter(
    (line) =>
      line.type === 'button' &&
      line.accelerator === 0 &&
      !line.rendered.includes('印象 ：'),
  );
  assert.equal(question_rounds.length, 5, '五问各渲染一轮');
  assert.equal(fixture.store.get('flag:501'), 0);
  // 选 0 走随机路径：共用出口
  assert.equal(pending, STATE.SHOP);
});

test('搬运方式：拖拽分支与抱起分支输出不同，无效输入重问（:135-150）', async () => {
  const fixture = create_era_fixture();
  fixture.load_module('event/event-first'); // 顶层注册 EVENTFIRST 处理器
  const { emit } = fixture.load_module('system/event/registry');

  // 女性（跳过肉棒尺寸）→ 狂王性别扶她 → 村娘 → 地下城模式普通（#181 第二问）
  // → 搬运方式选 2 拖拽。原作用例曾在中间喂越界的 3 验证 GOTO 重问：搬运
  // 画面只印一次 [1]/[2]，引擎的 input() 只送达已打印按钮的快捷键，3 在
  // 渲染层被弹回——重问分支是引擎死路径（#130），此处只走有效输入
  fixture.set_inputs(1, 2, 1, 0, 2);
  await emit('EVENTFIRST');

  assert.deepEqual(
    fixture.inputs_consumed.filter((e) => e.api === 'input'),
    [
      { api: 'input', value: 1 }, // 魔王性别「女性」
      { api: 'input', value: 2 }, // 狂王性别「扶她」
      { api: 'input', value: 1 }, // 初期奴隶「村娘」
      { api: 'input', value: 0 }, // 地下城模式「普通」
      { api: 'input', value: 2 }, // 搬运方式「拖拽」
    ],
  );

  // 拖拽分支的四行（:144-147）在，抱起分支的五行（:138-142）一行都不在——
  // 两个分支的可观测结果必须能区分，否则改坏任一支都不会红
  const texts = fixture.text_lines();
  assert(texts.includes('对于这种小丫头没必要小心翼翼的―――'));
  assert(texts.includes('结果她直到被扔进牢房都没有醒过来。'));
  assert(
    !texts.some((line) => line.includes('村女比想象中要轻')),
    '选 2 时不得输出抱起分支的文本',
  );
});
test('era-flag 包装层：月份/所持金的底层寻址钉在 yml/Flag.yml 的 id 上', async () => {
  const fixture = create_era_fixture();
  const era_flag = fixture.load_module('era-utils/era-flag');

  // id 即存档格式的一部分（#5 决议的 10000 保留区），改动必须惊动本测试
  era_flag.month = 2;
  era_flag.money = 5;
  assert.deepEqual(fixture.var_writes, [
    { name: 'flag:10001', value: 2 },
    { name: 'flag:10004', value: 5 },
  ]);
});

test('存根清单可检索：docs/stub-registry.md 收录全部存根化调用', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('event/event-first');
  // #565 起 RAND_CHARA_MAKE / CHARA_NAME_DEFINE 均已接线，本文件存根名单
  // 清空——「名字 ↔ 清单状态」的机械核对由 test/stub-registry-status.test.js
  // 与 tools/trace-check.mjs --coverage 承担，此处只剩历史检索锚。
  assert.deepEqual(STUBBED_CALLS, []);
  const registry_path = path.resolve(
    __dirname,
    '..',
    'docs',
    'stub-registry.md',
  );
  const registry = fs.readFileSync(registry_path, 'utf8');

  // 工单指出的优先项 + 既有存根（page-title 的读档）也必须可检索
  for (const name of ['PARTY_UNITE', 'SYSTEM_LOADGAME']) {
    assert(registry.includes(name), `存根清单缺少 ${name}`);
  }
});
