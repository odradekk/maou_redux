/**
 * @file 新游戏初始化事件 @EVENTFIRST 的处理器（issue #22，真身）。
 *
 * 源: target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB  @EVENTFIRST（:1-:231）
 *
 * 移植策略（工单 #22 判据：不做它，主菜单还能不能正确显示？）：
 *   - 直线赋值 1:1 照搬。flag/cflag/item 是引擎内嵌表（app.asar 的 data
 *     初始化：abl/base/cflag/cstr/equip/exp/flag/item/juel/love/mark/
 *     maxbase/relation/source/talent），未声明下标写入即落、可回读——
 *     #13 的「静默建变量」在写入侧是可用的通道，读侧仍须兜底；
 *   - 落不进去的不装样子写（表未声明，写了即静默 no-op），注释说明去向：
 *     冒險者性別、丽塔启动！——登记在 docs/stub-registry.md 的
 *     「变量级待办」（FLAG:26/27 已随 #138 数组化落地，EX_FLAG 已随 #113
 *     落表并接入，BOUGHT 已随 #395 落表并接入；PBAND 已随 #552 结清——
 *     读取处直接用常量 4，不落表）；
 *   - 约二十处调用绝大部分存根化：可达路径上的存根各打一行占位（含原作
 *     函数名，可检索可断言），不可达分支体内的调用仅登记不打印；
 *   - 被 FIRST_SETTING 钉在默认值的分支体：村娘分支（FLAG:501，:95-187）
 *     已随 #50 落地（ADDCHARA 17、CFLAG 一组、搬运/拖拽二选一、囚禁播报
 *     与自己的 BEGIN SHOP 出口，全部按角色 ID 寻址；FLAG:501 由
 *     first-setting.js 的初期奴隶一问产生）；丽塔块（丽塔启动！，
 *     :152-166/:205-215）仍以注释占位——SAVEDATA 变量无 ere 落点、恒非
 *     1，随开局设置票。
 *
 * 出口：begin(STATE.SHOP)（:231）。主菜单渲染归 #23，主循环进入 SHOP 时
 * 的守卫报错（报出状态）即这张票的到站标记。
 */

const era = require('#/era-electron');
const { on } = require('#/system/event/registry');
const { begin, STATE } = require('#/system/flow/begin-signal');
const { first_setting } = require('#/event/first-setting');
const { add_chara_ex, ex_talentname_init } = require('#/chara/chara-ex');
const { chara_name_init } = require('#/chara/chara-name-list');
const { chara_name_define } = require('#/chara/chara-name'); // #565 起接线
const { char_body_generate_wapped } = require('#/chara/chara-body'); // #385 起真身
const { rand_chara_make } = require('#/chara/chara-make'); // #565 起接线
const { char_make_inport } = require('#/chara/char-make'); // 转发层（#494 同款注入）
const { init_portcflag } = require('#/chara/chara-portcflag');
const { game } = require('#/facade/game');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const era_global = require('#/era-utils/era-global');
const { geo_test, db_set } = require('#/dungeon/labo'); // 2D 模式分支（#181 H12）
const { set_vil } = require('#/dungeon/labo-map');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）。#565 起 RAND_CHARA_MAKE（随机分支 :203）与 CHARA_NAME_DEFINE
 * （村娘分支 :111）均接真身，名单清空；名字 ↔ 清单状态的机械核对在
 * tools/trace-coverage.mjs 的 check_stub_names（随 --coverage 跑）。
 */
const STUBBED_CALLS = [];

// 注册在模块顶层（往注册表塞函数，不碰 era.*——引擎允许；era.* 只在处理器
// 函数体内调用，#6 的两条硬规则之二）。普通档：原作 @EVENTFIRST 的其他
// 定义随各自所属票接入。
on('EVENTFIRST', async () => {
  // 移植自建（#136 返工，非原作 @EVENTFIRST 的行）：存读档指针的初值
  // -1（flag:10018-10028，已登记 yml/Flag.yml 保留区）。登记后引擎
  // resetData/fillData 会为已声明序号赋 0——0 是有效槽号（0 号槽会被误
  // 高亮），初值只能靠显式写（完整论证见 era-flag.js 手写区）。原作侧
  // 对应：LASTSAVE_NO 的 `#DIM LASTSAVE_NO,10 = -1`（VARIABLES.ERH:16，
  // 装载期初值）与 LASTLOAD_NO 的引擎初值 -1（RESETDATA/返回标题恢复）
  // ——ere 无这两个钩子，等价落点＝新档初始化。
  for (let i = 10018; i <= 10028; i += 1) {
    era.set(`flag:${i}`, -1);
  }

  // :8-9 HAIRCOLOR/CHARACTER = -1：#DIM 函数局部，写后全函数无读者，不移植。
  //
  // :11-12 FLAG:26/27 = 种族年龄表。原作是 base-1000 打包整数：
  //   FLAG:26 = 232015325431115011（18 位 = 种族槽 0-5，低位是槽 0，
  //   CHARA_BODY.ERB 取槽段的 RACE_CLA = FLAG:26 / POWER(1000, RACE_ID) % 1000），
  //   FLAG:27 = 001001（种族槽 6-7，接 RACE_ID >= 6）。
  // 232015325431115011 ≈ 2.32e17 超出 Number.MAX_SAFE_INTEGER（≈9.01e15）约
  // 26 倍，照搬必失精度；BigInt 出局（JSON.stringify 遇 BigInt 抛 TypeError，
  // 存档当场写不出去）。#105 决议四：拆数组承载——按槽号索引，每个元素即
  // 该种族的 RACE_CLA（三位：百位年龄倍率档 / 十位数量级 / 个位倍数）。
  // 有意偏离 1:1，登记于 docs/stub-registry.md 变量级表；消费者（CHARA_BODY
  // 的解包与 RACE_CONFIG 编辑器）随角色身体票移植，届时按槽号直接取数组
  // 元素。写入走 game.chara 门面（域边界由 domain-check 守，裸寻址会被拦）。
  // FLAGNAME:26 = 种族年龄表（槽 0-5，低位在前）
  // FLAGNAME:27 = 种族年龄表续（槽 6-7）
  game.chara.种族年龄设定_0 = [11, 115, 431, 325, 15, 232];
  game.chara.种族年龄设定_1 = [1, 1];

  // :15 FLAG:500 = 2 —— 狂王初期性别：扶她
  era.set('flag:500', 2);

  // :19 CALL FIRST_SETTING —— 交互式开局设置，issue #463 起全量实现（除
  // 丽塔/卡拉隐藏分支，SAVEDATA 变量无 ere 落点，见 first-setting.js 文件
  // 头）。五问（魔王性别/肉棒尺寸/狂王性别/初期奴隶/地下城模式）的编排在
  // event/first-setting.js 的 first_setting()。FLAG:500 会被狂王性别一问
  // 覆盖——下面 :15 置的 2 只是问答前的暂定值（原作同款：函数入口先给个
  // 初值，问答按玩家选择改写）。
  await first_setting();

  // :21-24 REPEAT 14：FLAG:60..73 = -1（男性冒险者用着素质展示位等）
  for (let i = 60; i < 60 + 14; i += 1) {
    era.set(`flag:${i}`, -1);
  }

  // :26 TARGET = -1（包装层：flag:10005）。:27 BOUGHT = -1（#395 起落表：
  // flag:10029，见 yml/Flag.yml「购入品指针」——BOUGHT 是无声明即写不进任何
  // 表的 builtin 标量，新档不显式初始化会读回 fillData 补的 0（误判为「正在
  // 购物道具 0 号」），必须与 TARGET 同处显式置 -1）。
  era_flag.target = -1;
  era_flag.bought = -1;

  // :31 FLAG:5 = 17179934119 —— 战斗日志显示设置（位打包，见 :29-30 注释）
  era.set('flag:5', 17179934119);

  // :33 DAY:1 = 1 —— 月份（包装层：flag:10001）。天数/日原作不初始化，
  // 留 0，勿补成 1 月 1 日（era-flag.js 手写区有注）。
  era_flag.month = 1;

  // :35 ITEMSALES:53 = 1 —— 53 号道具开局上架。Item 表已随 #38 落地，
  // item* 寻址在静态表缺席时的直接崩溃（app.asar 的 set：`a.startsWith("item")`
  // 分支无守卫，直接 `this.staticData.item.name[u]`，PR #34 实机撞见）已随
  // 表消除——引擎行为本身不变（写未声明的 item 变量仍会崩），变的是本表
  // 在场。test/variable-yml.test.js 有「表缺席即抛 reading 'name'」的
  // 引擎级回归锁。原作顺序上，进商店轮时 @EVENTSHOP 的清零循环会把本位
  // 一并清 0（SHOP ver1.0.2.ERB:15-18），在售位由商店侧重新点亮——1:1
  // 照搬，两层都保留。
  era.set('itemsales:53', 1);

  // :36-40 A=200; REPEAT 8：FLAG:200..207 = 1
  for (let i = 200; i < 200 + 8; i += 1) {
    era.set(`flag:${i}`, 1);
  }

  // :42 PBAND = 4 —— 假阳具的道具号。PBAND 是 Emuera 内建非角色变量，
  // ere 侧没有它的存储，也无需播种：读取处直接用常量 4
  // （`era.get('item:4')`，ere/kojo 八个口上文件共 25 处）（#552）。

  // :45 FLAG:35 = 0 —— 濒死时自动结束调教：关
  era.set('flag:35', 0);
  // :47 FLAG:37 = 1 —— 着衣系统：开（主菜单读它）
  era.set('flag:37', 1);

  // :50-52 INVERTBIT FLAG:8, 0/1/2 —— 新档 FLAG:8 为 0，翻三位后 = 0b111
  era.set('flag:8', 7);

  // :53 冒險者性別 = -1 —— GLOBAL SAVEDATA（魔改使用.ERH:2），#547 起落
  // global:3（era_global.adventurer_gender）：每次开局无条件重置 -1（跨档
  // 共享，用户经设置页 [27] 改的档位维持到下一次新游戏）；原作此处无
  // SAVEGLOBAL，持久化交给引擎的自动 saveGlobal 时机，不显式代劳。
  era_global.adventurer_gender = -1;
  // :55 MONEY = 10000 —— 开局持有金（包装层：flag:10004）
  era_flag.money = 10000;

  // :56 EX_FLAG:4444 = 1234（金钱增减镜像，@MONEYSYS）。**#401 起播种**：
  // 首个消费者是 @DEBUG_CHECK（EVENT_TURNEND.ERB:174）——它按
  // `MONEY == EX_FLAG:4444 + 8766`（1234 + 8766 = 10000 = 上面的开局持有金）
  // 判定「钱被改过」，不成立就炸掉宝库并把资金清零。此前该值无消费者、
  // 播种刻意缓议（存根清单变量级待办），落函数体的同时必须落这份不变量。
  era_exflag.legit_money = 1234;

  // :60-62 CFLAG:0:451 = 21（魔王相当于人类年龄）、:62 EX_FLAG:99 = 70
  // （初始威望）——威望播种自 #117 起接入（包装层写入；侵略线窄路径的
  // 前置，威望 0 会让首次魔力出兵落进「岌岌可危」档直接失败）；CFLAG 照落：
  era.set('cflag:0:451', 21);
  era_exflag.prestige = 70;

  // :65-74 IF FLAG:502 == 1（2D 地图模式）：GEO_TEST/SET_VIL + DB 50×50
  // 清零。#181（H12）起 FLAG:502 有玩家置位路径（first-setting 的地下城
  // 模式一问），分支可达，正文接真身（ere/dungeon/labo.js 与
  // labo-map.js；DA/DB/DC 的承载见 labo.js 文件头）。
  if ((era.get('flag:502') || 0) === 1) {
    geo_test(); // :67 CALL GEO_TEST（缺省随机源走 Math.random）
    set_vil(); // :68 CALL SET_VIL
    // :69-73 FOR 50×50：DB 清零
    for (let y = 0; y < 50; y += 1) {
      for (let x = 0; x < 50; x += 1) {
        db_set(y, x, 0);
      }
    }
  }

  // :78 CALL CHARA_NAME_INIT —— 角色名初始化，真身见 chara-name-list.js（#388）
  chara_name_init();
  // :80 CALL EX_TALENTNAME_INIT —— 非存档的 EX 素质名表。
  ex_talentname_init();

  // :82-92 开场叙事：居中七行（:87 是两个空格的空行）→ 左对齐 → WAIT →
  // DRAWLINE。ere 的 print 自成一行，PRINTL 直接映射。
  era.setAlign('center');
  era.print('很久很久以前，某代魔王得到了不死之力，');
  era.print('虽然渐渐得到了足以掌握世界的力量，');
  era.print('但作为代价ta受到了一定会被女性打倒的诅咒。');
  era.print('后来却败给了传说中的女勇者，被封印起来了。');
  era.println(); // :87 PRINTL「  」
  era.print('经过漫长的岁月，如今！封印被打破了！');
  era.print('今天，又有纯洁无垢的勇者敲响了地下城的大门……');
  era.setAlign('left');
  await era.waitAnyKey(); // :91 WAIT
  era.drawLine(); // :92 DRAWLINE

  // :95-187 IF FLAG:501 == 1 —— 村娘分支（#50 落地）。序号陷阱：此时已
  // 加入列表为 [0, 17]，分支内原作写的「1」全部是已加入序号 1（= 角色 ID
  // 17），ere 侧一律按角色 ID 寻址（CONTEXT.md 末节）；照抄数字 1 会写到
  // 角色 ID 1 头上，有「序号≠ID」场景的测试固定住。
  if ((era.get('flag:501') || 0) === 1) {
    // :96-100 五行 PRINTW（各带读键）
    era.print('首先，要奖励一下唤醒了我沉睡的愚蠢女人啊……');
    await era.waitAnyKey();
    era.print('魔王俯视着被吸取了能量用于破坏封印的村女');
    await era.waitAnyKey();
    era.print('………');
    await era.waitAnyKey();
    era.print('……');
    await era.waitAnyKey();
    era.print('…');
    await era.waitAnyKey();

    // :102 ADDCHARA 17 —— 预设 yml/Chara17.yml（名字玛奥，不是「村娘」
    // ——后者只是叙述用词）。引擎守卫：无预设整段短路（#35 误报通过教训），
    // 装载零告警零丢弃由 test/chara-yml.test.js 用引擎代码比对固定。
    era.addCharacter(17);
    // :103 CALL ADDCHARA_EX, CHARANUM-1 —— 角色专属初始化分发（ere 侧直
    // 接传角色 ID）。@CHARA_EX_17 在原作不存在：守卫 NO >= 17 放行、
    // TRYCALLFORM 落空，是分发族「空间内缺失」的合法情形（#7），返回调用
    // 点缺省 0——不是缺陷、不必实现。
    await add_chara_ex(17);
    // 移植自建（issue #67，非原作动作）：给刚加入的角色盖移植数据版本戳
    // （portcflag 扩展表；预设基线 0 已由 addCharacter 套上，此处盖为当前
    // 版本——引擎侧链路由 test/portcflag-table.test.js 驱动引擎代码比对）
    init_portcflag(17);

    // :105 SAVESTR:1 = %NAME:1%、:109 CSTR:1 = %NAME:1% —— 角色名暂存
    // 两处。#5 已决由内置 callname 承载：引擎 addCharacter(17) 已写
    // callname:17:-1（预设 name）与 callname:17:-2（预设 callname），无需
    // 再写；下方 :169-170 囚禁播报（原作读 SAVESTR:1）改读 callname:17:-1。
    // 待办表（docs/stub-registry.md 变量级）村娘侧随之划掉，丽塔侧仍欠。

    // :107 TARGET = 1 —— 原作写的是已加入序号 1；ere 指针槽存角色 ID
    // （#21，主菜单的钳制/计数同语义），故写 17。
    era_flag.target = 17;

    // :110-119 CFLAG 一组（原作无下标 = 隐式指向 TARGET = 序号 1 = 角色
    // 17）。逐项语义：420 玛奥专属标记（全库只写不读，唯二定值点均为初始
    // 化玛奥，CHARA_CUSTOM ver1.0.1.ERB CASE 17 同款）；9 等级（@SAVEINFO
    // 的 LV{CFLAG:MASTER:9}、SHOW_LIST_TRAINABLE 的 LV 列）；1 占用/调教中
    // （IS_TRAINABLE 以 CFLAG:ARG:1 != 0 拒绝。注意预设 フラグ,1,1 并未落进
    // data——引擎 initCharaTable 只拷贝名字表内登记的下标，而 cflag 名字表为空
    // （yml/CFlag.yml 头注释），所以此处的 0 与默认值同值、是 1:1 照搬的冗余
    // 写入，不是「解除占用」的必要步骤）；11-14 战斗数值
    // （DUNGEON_TRAP「攻击力和防御力」减半/清零的是 11/12，處刑改寫「攻击/
    // 防御」减半的是 13/14，两组各 15）；16 未定状态位（-1 = 未设定，迷宫
    // 代码在 -1 时临时改写 995，FIRST_SETTING 对魔王同置 -1）；450 一人称
    // （自称）编号（SELF_CALL.ERB 一个人称設定，31 = 表内编号）。
    era.set('cflag:17:420', 1); // :110 玛奥专属标记
    // :111 CALL CHARA_NAME_DEFINE（无实参；#565 起真身 ere/chara/chara-name.js）：
    // 省略的数值参数按 0 处理（技能手册：不做 TARGET 代入），L_A = 0 = 魔王
    // （cid 0 与原作 NO:0 同值）——走特殊角色分支，把魔王的称呼重写为预设
    // 值（与 :78 CHARA_NAME_INIT 的产物相同）、NID 写回 10000、关系称呼重建
    // 一次。村娘（cid 17）的命名不经此调用：其称呼由 addCharacter 装预设时
    // 落地，NID 维持原作同款的不写（原作同样没给村娘定 NID）
    chara_name_define(0);
    era.set('cflag:17:9', 1);
    era.set('cflag:17:1', 0);
    era.set('cflag:17:11', 15);
    era.set('cflag:17:12', 15);
    era.set('cflag:17:13', 15);
    era.set('cflag:17:14', 15);
    era.set('cflag:17:16', -1);
    era.set('cflag:17:450', 31);

    // :121 CALL CHAR_BODY_GENERATE_WAPPED, 1 —— 角色身体生成（#385 起真身；
    // FLAG:26/27 种族年龄表的消费者，闸门在函数的 FLAG:5 位 12/15 守卫里）
    char_body_generate_wapped(17); // A = 1（序号）→ 角色 ID 17

    // :126-129 四行角色描写（PRINTFORMW，各带读键）
    era.print('因为破坏封印时魔力的涌流，村女的衣服全都剥落了。');
    await era.waitAnyKey();
    era.print('村女还是少女体型，有个性的红色头发剪得短短的。');
    await era.waitAnyKey();
    era.print('还有气息，胸部静静地起伏，润泽的褐色肌肤仿佛在等待着蹂躏。');
    await era.waitAnyKey();
    era.print('就在这里尽情凌辱一番也不错，不过还是暂且………');
    await era.waitAnyKey();

    // :130-133 空行 + 搬运/拖拽二选一（原作 PRINTL 纯文本 + INPUT 收数字；
    // ere 改按钮，accelerator 沿用原作编号，正文不写 [编号] 前缀——PR #30）
    // + 分隔线
    era.println();
    era.printButton('抱起来搬到牢房里', 1);
    era.printButton('抓着脚踝拖到牢房里', 2);
    era.drawLine();

    // :135-150 $INPUT_LOOP：1 = 抱起 / 2 = 拖拽，其余 GOTO 重问
    let carry;
    for (;;) {
      carry = await era.input();
      if (carry === 1 || carry === 2) {
        break;
      }
    }
    if (carry === 1) {
      // :138-142 五行 PRINTFORMW
      era.print('村女比想象中要轻。少女的体香混合着农民的土地气息。');
      await era.waitAnyKey();
      era.print('身材尚不丰满，不过应该足以承受魔王的蹂躏了。');
      await era.waitAnyKey();
      era.print('许久没有尝过女人的味道，你正打算就这样带回自己房间侵犯………');
      await era.waitAnyKey();
      era.print('「姐……姐………」');
      await era.waitAnyKey();
      era.print('村女的呻吟声打消了你的邪念。');
      await era.waitAnyKey();
    } else {
      // :144-147 四行 PRINTFORMW
      era.print('对于这种小丫头没必要小心翼翼的―――');
      await era.waitAnyKey();
      era.print('你抓着村女的脚踝一路拖进了牢房。');
      await era.waitAnyKey();
      era.print('虽然这里那里都擦伤了不过舔舔也就好了………');
      await era.waitAnyKey();
      era.print('结果她直到被扔进牢房都没有醒过来。');
      await era.waitAnyKey();
    }

    // :152-166 IF 丽塔启动！== 1 —— 丽塔块（ADDCHARA 223 + 称呼/身体）。
    // 丽塔启动！是 SAVEDATA 自定义变量、无 ere 落点（恒非 1），不可达；
    // 正文随开局设置票（docs/stub-registry.md 丽塔行与变量级待办表）。

    // :168-172 囚禁播报。原作 PRINT 村娘 + PRINTS SAVESTR:1 + PRINTL 被囚
    // 禁…拼成一行；ere 的 print 独占一行，读 callname:17:-1（引擎
    // addCharacter 已写）合并输出。无兜底：读不到名字即预设装载失败的信
    // 号（#35 的静默降级教训），不该被掩盖。
    era.print('*****************************************');
    era.print(`村娘${era.get('callname:17:-1')}被囚禁在了地牢里`);
    era.print('*****************************************');

    // :175 WAIT
    await era.waitAnyKey();

    // :187 BEGIN SHOP —— 村娘分支自己的出口（BEGIN 即结束当前函数，原作
    // 的随机路径因此不再执行；ere 侧 begin() 抛信号离开本处理器，下方代码
    // 同样被跳过）。
    begin(STATE.SHOP);
  }

  // :190-201 随机分支开场（默认路径）：六行 PRINTW（各带读键）+ 三行省略号
  era.print('首先，要奖励一下唤醒了我沉睡的愚蠢女人啊……');
  await era.waitAnyKey();
  era.print('魔王俯视着被吸取了能量用于破坏封印的冒险者');
  await era.waitAnyKey();
  era.print('………');
  await era.waitAnyKey();
  era.print('……');
  await era.waitAnyKey();
  era.print('…');
  await era.waitAnyKey();
  era.println(); // :198 PRINTW「 」（空行 + 读键）
  await era.waitAnyKey();
  era.print('…'); // :199-201 PRINTL 三行省略号
  era.print('……');
  era.print('………');

  // :203 CALL RAND_CHARA_MAKE（#565 起真身 ere/chara/chara-make.js）。
  // 原作 CALL 无实参、返回值（RETURN CHARANUM-1）此处不读（:205 起只判
  // 丽塔启动！）。开局是普通路径（非战役招募）：campaign_slave 缺省 false，
  // 勇者位照原作 RAND(1,17) 掷——掷中已占用的位就落 :188-191 的「勇者没有
  // 出现」失败文案，不重掷。完整流程含 :57 的 CHAR_MAKE_INPORT 异国判定与
  // 形象确认（INPUT_LOOP_12）、收下确认（:151-186）的人工交互。
  //
  // `char_make_inport` 必须从转发层 ere/chara/char-make.js 作参数注入（真身
  // 反向 require 转发层会成环，见 chara-make.js 文件头）；ARG:0 缺省 1 =
  // RAND(1) 恒 0，异国判定恒真身跑（开局 FLAG:76 = 0，真身首行即 RETURN 0 =
  // 非异国，page-campaign.js:171 的战役招募同款传法）。rand_n 缺省均匀随机
  // （#117 决议：ere 无全局 RAND 序列，测试经 override_math_random 注入）。
  const rand_n = (n) => Math.floor(Math.random() * n);
  await rand_chara_make(rand_n, () => char_make_inport(1, rand_n));

  // :205-215 IF 丽塔启动！ == 1 —— 丽塔块（ADDCHARA 223 + ADDCHARA_EX +
  // SAVESTR:2/CSTR:1 + CHARA_NAME_DEFINE + CHAR_BODY_GENERATE_WAPPED）。
  // 丽塔启动！为 SAVEDATA 默认 0，唯一定值点 FIRST_SETTING 已存根 →
  // 不可达，正文随开局设置票（存根清单）。

  // :231 BEGIN SHOP —— 初始化完成，转入据点主菜单。事件链内信号由 emit
  // 捕获暂存，链跑完交给主循环；主循环进入 SHOP 的守卫报错（#23 未落地）
  // 是这张票到站的预期结果。
  begin(STATE.SHOP);
});

module.exports = { STUBBED_CALLS };
