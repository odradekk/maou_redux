/**
 * @file 新游戏初始化事件 EVENTFIRST 的处理器（issue #22，真身）。
 *
 * 实现策略（工单 #22 的判断条件：不做它，主菜单还能不能正确显示？）：
 *   - 直线赋值逐项落表。flag/cflag/item 是引擎内嵌表（app.asar 的 data
 *     初始化：abl/base/cflag/cstr/equip/exp/flag/item/juel/love/mark/
 *     maxbase/relation/source/talent），未声明下标写入即落、可回读——
 *     #13 的「静默建变量」在写入侧是可用的通道，读侧仍须缺省处理；
 *   - 落不进去的不装样子写（表未声明，写了即静默 no-op），注释说明去向：
 *     冒險者性別、丽塔启动！——登记为变量级待办（FLAG:26/27 已随 #138
 *     数组化实现，EX_FLAG 已随 #113 落表并接入，BOUGHT 已随 #395 落表并
 *     接入；PBAND 已随 #552 结清——读取处直接用常量 4，不落表）；
 *   - 约二十处附属初始化大部分不实现：可达路径上的各打一行占位（含源
 *     函数名，可检索可断言），不可达分支体内的调用不打印；
 *   - 被开局设置钉在默认值的分支体：村娘分支（FLAG:501）
 *     已随 #50 实现（addCharacter 17、CFLAG 一组、搬运/拖拽二选一、囚禁播报
 *     与自己的 SHOP 转场出口，全部按角色 ID 寻址；FLAG:501 由
 *     first-setting.js 的初期奴隶一问产生）；丽塔块（丽塔启动！）
 *     仍以注释占位——SAVEDATA 变量无 ere 落点、恒非 1，随开局设置票。
 *
 * 出口：begin(STATE.SHOP)。主菜单渲染归 #23，主循环进入 SHOP 时
 * 的检查报错（报出状态）即这张工单的到站标记。
 */

const era = require('#/era-electron');
const { on } = require('#/system/event/registry');
const { begin, STATE } = require('#/system/flow/begin-signal');
const { first_setting } = require('#/event/first-setting');
const { add_chara_ex, ex_talentname_init } = require('#/chara/chara-ex');
const { chara_name_init } = require('#/chara/chara-name-list');
const { chara_name_define } = require('#/chara/chara-name'); // #565 起接入
const { char_body_generate_wapped } = require('#/chara/chara-body'); // #385 起真身
const { rand_chara_make } = require('#/chara/chara-make'); // #565 起接入
const { char_make_inport } = require('#/chara/char-make'); // 转发层（#494 同款注入）
const { init_portcflag } = require('#/chara/chara-portcflag');
const { game } = require('#/facade/game');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const era_global = require('#/era-utils/era-global');
const { geo_test, db_set } = require('#/dungeon/labo'); // 2D 模式分支（#181 H12）
const { set_vil } = require('#/dungeon/labo-map');

// 注册在模块顶层（往注册表塞函数，不碰 era.*——引擎允许；era.* 只在处理器
// 函数体内调用，#6 的两条硬规则之二）。普通档：源 EVENTFIRST 的其他
// 定义随各自所属票接入。
on('EVENTFIRST', async () => {
  // 自建（#136 返工，非源 EVENTFIRST 的行）：存读档指针的初值
  // -1（flag:10018-10028，已登记 yml/Flag.yml 保留区）。登记后引擎
  // resetData/fillData 会为已声明序号赋 0——0 是有效槽号（0 号槽会被误
  // 高亮），初值只能靠显式写（完整论证见 era-flag.js 手写区）。旧引擎的
  // 对应：LASTSAVE_NO 的装载期初值 -1（#DIM ... = -1）与 LASTLOAD_NO 的
  // 装载期初值 -1（旧引擎在 RESETDATA/返回标题时恢复）
  // ——ere 无这两个钩子，等价落点＝新档初始化。
  for (let i = 10018; i <= 10028; i += 1) {
    era.set(`flag:${i}`, -1);
  }

  // HAIRCOLOR/CHARACTER = -1：#DIM 函数局部，写后全函数无读者，不移植。
  //
  // FLAG:26/27 = 种族年龄表。旧引擎里是 base-1000 打包整数：
  //   FLAG:26 = 232015325431115011（18 位 = 种族槽 0-5，低位是槽 0，
  //   取槽段 RACE_CLA = FLAG:26 / POWER(1000, RACE_ID) % 1000），
  //   FLAG:27 = 001001（种族槽 6-7，接 RACE_ID >= 6）。
  // 232015325431115011 ≈ 2.32e17 超出 Number.MAX_SAFE_INTEGER（≈9.01e15）约
  // 26 倍，照打包写法必失精度；BigInt 出局（JSON.stringify 遇 BigInt 抛 TypeError，
  // 存档当场写不出去）。#105 决议四：拆数组承载——按槽号索引，每个元素即
  // 该种族的 RACE_CLA（三位：百位年龄倍率档 / 十位数量级 / 个位倍数）。
  // 有意不按打包写法承载，按数组承载；消费者（身体生成
  // 与种族配置编辑器）按槽号直接取数组元素。写入走 game.chara 门面
  // （域边界由 domain-check 守，裸寻址会被拦）。
  // FLAGNAME:26 = 种族年龄表（槽 0-5，低位在前）
  // FLAGNAME:27 = 种族年龄表续（槽 6-7）
  game.chara.种族年龄设定_0 = [11, 115, 431, 325, 15, 232];
  game.chara.种族年龄设定_1 = [1, 1];

  // FLAG:500 = 2 —— 狂王初期性别：扶她
  era.set('flag:500', 2);

  // CALL FIRST_SETTING —— 交互式开局设置，issue #463 起全量实现（除
  // 丽塔/卡拉隐藏分支，SAVEDATA 变量无 ere 落点，见 first-setting.js 文件
  // 头）。五问（魔王性别/肉棒尺寸/狂王性别/初期奴隶/地下城模式）的编排在
  // event/first-setting.js 的 first_setting()。FLAG:500 会被狂王性别一问
  // 覆盖——下面置的 2 只是问答前的暂定值（同款做法：函数入口先给个
  // 初值，问答按玩家选择改写）。
  await first_setting();

  // REPEAT 14：FLAG:60..73 = -1（男性冒险者用着素质展示位等）
  for (let i = 60; i < 60 + 14; i += 1) {
    era.set(`flag:${i}`, -1);
  }

  // TARGET = -1（包装层：flag:10005）。:27 BOUGHT = -1（#395 起落表：
  // flag:10029，见 yml/Flag.yml「购入品指针」——BOUGHT 是无声明即写不进任何
  // 表的 builtin 标量，新档不显式初始化会读回 fillData 补的 0（误判为「正在
  // 购物道具 0 号」），必须与 TARGET 同处显式置 -1）。
  era_flag.target = -1;
  era_flag.bought = -1;

  // FLAG:5 = 17179934119 —— 战斗日志显示设置（位打包，见 :29-30 注释）
  era.set('flag:5', 17179934119);

  // DAY:1 = 1 —— 月份（包装层：flag:10001）。天数/日不初始化，
  // 留 0，勿补成 1 月 1 日（era-flag.js 手写区有注）。
  era_flag.month = 1;

  // ITEMSALES:53 = 1 —— 53 号道具开局上架。Item 表已随 #38 实现，
  // item* 寻址在静态表缺席时的直接崩溃（app.asar 的 set：`a.startsWith("item")`
  // 分支无检查，直接 `this.staticData.item.name[u]`，PR #34 实机撞见）已随
  // 表消除——引擎行为本身不变（写未声明的 item 变量仍会崩），变的是本表
  // 在场。test/variable-yml.test.js 有「表缺席即抛 reading 'name'」的
  // 回归锁。顺序上，进商店轮时 EVENTSHOP 的清零循环会把本位
  // 一并清 0，在售位由商店侧重新点亮——两层写入都保留。
  era.set('itemsales:53', 1);

  // A=200; REPEAT 8：FLAG:200..207 = 1
  for (let i = 200; i < 200 + 8; i += 1) {
    era.set(`flag:${i}`, 1);
  }

  // PBAND = 4 —— 假阳具的道具号。PBAND 是旧引擎内建非角色变量，
  // ere 侧没有它的存储，也无需播种：读取处直接用常量 4
  // （`era.get('item:4')`，ere/kojo 八个口上文件共 25 处）（#552）。

  // FLAG:35 = 0 —— 濒死时自动结束调教：关
  era.set('flag:35', 0);
  // FLAG:37 = 1 —— 着衣系统：开（主菜单读它）
  era.set('flag:37', 1);

  // INVERTBIT FLAG:8, 0/1/2 —— 新档 FLAG:8 为 0，翻三位后 = 0b111
  era.set('flag:8', 7);

  // 冒險者性別 = -1 —— GLOBAL SAVEDATA（魔改使用.ERH:2），#547 起落
  // global:3（era_global.adventurer_gender）：每次开局无条件重置 -1（跨档
  // 共享，用户经设置页 [27] 改的档位维持到下一次新游戏）；此处无
  // SAVEGLOBAL，持久化交给引擎的自动 saveGlobal 时机，不显式代劳。
  era_global.adventurer_gender = -1;
  // MONEY = 10000 —— 开局持有金（包装层：flag:10004）
  era_flag.money = 10000;

  // EX_FLAG:4444 = 1234（金钱增减镜像，moneysys）。**#401 起播种**：
  // 首个消费者是回合结算的 debug_check——它按
  // `MONEY == EX_FLAG:4444 + 8766`（1234 + 8766 = 10000 = 上面的开局持有金）
  // 判定「钱被改过」，不成立就炸掉宝库并把资金清零。此前该值无消费者、
  // 播种刻意缓议（变量级待办），落函数体的同时必须落这份不变量。
  era_exflag.legit_money = 1234;

  // CFLAG:0:451 = 21（魔王相当于人类年龄）、:62 EX_FLAG:99 = 70
  // （初始威望）——威望播种自 #117 起接入（包装层写入；侵略线窄路径的
  // 前置，威望 0 会让首次魔力出兵落进「岌岌可危」档直接失败）；CFLAG 照落：
  era.set('cflag:0:451', 21);
  era_exflag.prestige = 70;

  // IF FLAG:502 == 1（2D 地图模式）：GEO_TEST/SET_VIL + DB 50×50
  // 清零。#181（H12）起 FLAG:502 有玩家置位路径（first-setting 的地下城
  // 模式一问），分支可达，正文接真身（ere/dungeon/labo.js 与
  // labo-map.js；DA/DB/DC 的承载见 labo.js 文件头）。
  if ((era.get('flag:502') || 0) === 1) {
    geo_test(); // CALL GEO_TEST（缺省随机源走 Math.random）
    set_vil(); // CALL SET_VIL
    // FOR 50×50：DB 清零
    for (let y = 0; y < 50; y += 1) {
      for (let x = 0; x < 50; x += 1) {
        db_set(y, x, 0);
      }
    }
  }

  // chara_name_init —— 角色名初始化（#388）
  chara_name_init();
  // ex_talentname_init —— 非存档的 EX 素质名表。
  ex_talentname_init();

  // 开场叙事：居中七行（含一个两空格空行）→ 左对齐 → 等待 →
  // 分隔线。ere 的 print 自成一行，换行直接映射。
  era.setAlign('center');
  era.print('很久很久以前，某代魔王得到了不死之力，');
  era.print('虽然渐渐得到了足以掌握世界的力量，');
  era.print('但作为代价ta受到了一定会被女性打倒的诅咒。');
  era.print('后来却败给了传说中的女勇者，被封印起来了。');
  era.println(); // 空行（两空格）
  era.print('经过漫长的岁月，如今！封印被打破了！');
  era.print('今天，又有纯洁无垢的勇者敲响了地下城的大门……');
  era.setAlign('left');
  await era.waitAnyKey(); // WAIT
  era.drawLine(); // 分隔线

  // FLAG:501 == 1 —— 村娘分支（#50 实现）。序号陷阱：此时已
  // 加入列表为 [0, 17]，分支内写的「1」全部是已加入序号 1（= 角色 ID
  // 17），ere 侧一律按角色 ID 寻址（CONTEXT.md 末节）；直接写数字 1 会写到
  // 角色 ID 1 头上，有「序号≠ID」场景的测试固定住。
  if ((era.get('flag:501') || 0) === 1) {
    // 五行叙述（各带读键）
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

    // addCharacter 17 —— 预设 yml/Chara17.yml（名字玛奥，不是「村娘」
    // ——后者只是叙述用词）。引擎检查：无预设整段短路（#35 误报通过教训），
    // 装载零告警零丢弃由 test/chara-yml.test.js 用引擎代码比对固定。
    era.addCharacter(17);
    // add_chara_ex —— 角色专属初始化分发（ere 侧直
    // 接传角色 ID）。17 号的专属初始化不存在：检查 NO >= 17 放行、
    // 动态调用落空，是分发族「空间内缺失」的合法情形（#7），返回调用
    // 点缺省 0——不是缺陷、不必实现。
    await add_chara_ex(17);
    // 自建（issue #67，追加动作）：给刚加入的角色盖数据版本戳
    // （portcflag 扩展表；预设基线 0 已由 addCharacter 套上，此处盖为当前
    // 版本——引擎侧链路由 test/portcflag-table.test.js 驱动引擎代码比对）
    init_portcflag(17);

    // 角色名暂存两处。#5 已决由内置 callname 承载：引擎 addCharacter(17) 已写
    // callname:17:-1（预设 name）与 callname:17:-2（预设 callname），无需
    // 再写；下方囚禁播报改读 callname:17:-1。
    // 待办村娘侧随之结清，丽塔侧仍欠。

    // TARGET = 1 —— 这里写的是已加入序号 1；ere 指针槽存角色 ID
    // （#21，主菜单的钳制/计数同语义），故写 17。
    era_flag.target = 17;

    // CFLAG 一组（无下标 = 隐式指向 TARGET = 序号 1 = 角色
    // 17）。逐项语义：420 玛奥专属标记（只写不读，唯二定值点均为初始
    // 化玛奥，角色定制 CASE 17 同款）；9 等级（存档信息
    // 的 LV{CFLAG:MASTER:9}、SHOW_LIST_TRAINABLE 的 LV 列）；1 占用/调教中
    // （可选角色检查以 CFLAG:ARG:1 != 0 拒绝。注意预设 フラグ,1,1 并未落进
    // data——引擎 initCharaTable 只拷贝名字表内登记的下标，而 cflag 名字表为空
    // （yml/CFlag.yml 头注释），所以此处的 0 与默认值同值、是按原样保留的冗余
    // 写入，不是「解除占用」的必要步骤）；11-14 战斗数值
    // （迷宫陷阱「攻击力和防御力」减半/清零的是 11/12，處刑改寫「攻击/
    // 防御」减半的是 13/14，两组各 15）；16 未定状态位（-1 = 未设定，迷宫
    // 代码在 -1 时临时改写 995，开局设置对魔王同置 -1）；450 一人称
    // （自称）编号（kojo-self-call 的一个人称設定，31 = 表内编号）。
    era.set('cflag:17:420', 1); // 玛奥专属标记
    // chara_name_define（无实参；#565 起真身 ere/chara/chara-name.js）：
    // 省略的数值参数按 0 处理（技能手册：不做 TARGET 代入），L_A = 0 = 魔王
    // （cid 0 与 NO:0 同值）——走特殊角色分支，把魔王的称呼重写为预设
    // 值（与 addCharacter 装预设时的直写同值，CHARA_NAME_INIT 只建
    // 名字表、不碰称呼）、NID 写回 10000、关系称呼重建一次。村娘（cid 17）
    // 的命名不经此调用：其称呼同样来自 addCharacter 的预设直写，NID 维持不写
    chara_name_define(0);
    era.set('cflag:17:9', 1);
    era.set('cflag:17:1', 0);
    era.set('cflag:17:11', 15);
    era.set('cflag:17:12', 15);
    era.set('cflag:17:13', 15);
    era.set('cflag:17:14', 15);
    era.set('cflag:17:16', -1);
    era.set('cflag:17:450', 31);

    // char_body_generate_wapped —— 角色身体生成（#385 起真身；
    // FLAG:26/27 种族年龄表的消费者，闸门在函数的 FLAG:5 位 12/15 检查里）
    char_body_generate_wapped(17); // A = 1（序号）→ 角色 ID 17

    // 四行角色描写（各带读键）
    era.print('因为破坏封印时魔力的涌流，村女的衣服全都剥落了。');
    await era.waitAnyKey();
    era.print('村女还是少女体型，有个性的红色头发剪得短短的。');
    await era.waitAnyKey();
    era.print('还有气息，胸部静静地起伏，润泽的褐色肌肤仿佛在等待着蹂躏。');
    await era.waitAnyKey();
    era.print('就在这里尽情凌辱一番也不错，不过还是暂且………');
    await era.waitAnyKey();

    // 空行 + 搬运/拖拽二选一（纯文本列表 + 数字输入；
    // ere 改按钮，accelerator 沿用既有编号，正文不写 [编号] 前缀——PR #30）
    // + 分隔线
    era.println();
    era.printButton('抱起来搬到牢房里', 1);
    era.printButton('抓着脚踝拖到牢房里', 2);
    era.drawLine();

    // 输入循环：1 = 抱起 / 2 = 拖拽，其余重问
    let carry;
    for (;;) {
      carry = await era.input();
      if (carry === 1 || carry === 2) {
        break;
      }
    }
    if (carry === 1) {
      // 五行叙述
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
      // 四行叙述
      era.print('对于这种小丫头没必要小心翼翼的―――');
      await era.waitAnyKey();
      era.print('你抓着村女的脚踝一路拖进了牢房。');
      await era.waitAnyKey();
      era.print('虽然这里那里都擦伤了不过舔舔也就好了………');
      await era.waitAnyKey();
      era.print('结果她直到被扔进牢房都没有醒过来。');
      await era.waitAnyKey();
    }

    // 丽塔启动！== 1 —— 丽塔块（addCharacter 223 + 称呼/身体）。
    // 丽塔启动！是 SAVEDATA 自定义变量、无 ere 落点（恒非 1），不可达；
    // 正文随开局设置票。

    // 囚禁播报。把村娘名与被囚禁句拼成一行；
    // ere 的 print 独占一行，读 callname:17:-1（引擎
    // addCharacter 已写）合并输出。无缺省处理：读不到名字即预设装载失败的信
    // 号（#35 的静默降级教训），不该被掩盖。
    era.print('*****************************************');
    era.print(`村娘${era.get('callname:17:-1')}被囚禁在了地牢里`);
    era.print('*****************************************');

    // WAIT
    await era.waitAnyKey();

    // SHOP 转场 —— 村娘分支自己的出口（转场即结束当前函数，
    // 的随机路径因此不再执行；ere 侧 begin() 抛信号离开本处理器，下方代码
    // 同样被跳过）。
    begin(STATE.SHOP);
  }

  // 随机分支开场（默认路径）：六行叙述（各带读键）+ 三行省略号
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
  era.println(); // 空行（两空格，带读键）
  await era.waitAnyKey();
  era.print('…'); // 三行省略号
  era.print('……');
  era.print('………');

  // rand_chara_make（#565 起真身 ere/chara/chara-make.js）。
  // 该调用无实参、返回值此处不读（后续只判
  // 丽塔启动！）。开局是普通路径（非战役招募）：campaign_slave 缺省 false，
  // 勇者位照 RAND(1,17) 掷——掷中已占用的位就落「勇者没有
  // 出现」失败文案，不重掷。完整流程含异国判定与
  // 形象确认、收下确认的人工交互。
  //
  // `char_make_inport` 必须从转发层 ere/chara/char-make.js 作参数注入（真身
  // 反向 require 转发层会成环，见 chara-make.js 文件头）；首参缺省 1 =
  // RAND(1) 恒 0，异国判定恒真身跑（开局 FLAG:76 = 0，真身首行即返回 0 =
  // 非异国，page-campaign.js 的战役招募同款传法）。rand_n 缺省均匀随机
  // （#117 决议：ere 无全局 RAND 序列，测试经 override_math_random 注入）。
  const rand_n = (n) => Math.floor(Math.random() * n);
  await rand_chara_make(rand_n, () => char_make_inport(1, rand_n));

  // 丽塔启动！ == 1 —— 丽塔块（addCharacter 223 + add_chara_ex +
  // 名字定义 + 身体生成）。
  // 丽塔启动！为 SAVEDATA 默认 0，唯一定值点开局设置已按默认跳过 →
  // 不可达，正文随开局设置票。

  // SHOP 转场 —— 初始化完成，转入据点主菜单。事件链内信号由 emit
  // 捕获暂存，链跑完交给主循环；主循环进入 SHOP 的检查报错（#23 未实现）
  // 是这张工单到站的预期结果。
  begin(STATE.SHOP);
});
