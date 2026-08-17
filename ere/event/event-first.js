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
 *     FLAG:26/27（种族年龄表）、EX_FLAG、PBAND、BOUGHT、冒險者性別、
 *     丽塔启动！——全部登记在 docs/stub-registry.md 的「变量级欠账」；
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
 * 的守卫报错（点名状态）即本票的到站标记。
 */

const era = require('#/era-electron');
const { on } = require('#/system/event/registry');
const { begin, STATE } = require('#/system/flow/begin-signal');
const { ask_initial_slave } = require('#/event/first-setting');
const { add_chara_ex } = require('#/chara/chara-ex');
const era_flag = require('#/era-utils/era-flag');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 对账钉死）——后续票据此认领工作；名单变动必须同步清单。
 */
const STUBBED_CALLS = [
  'GEO_TEST',
  'SET_VIL',
  'CHARA_NAME_INIT',
  'EX_TALENTNAME_INIT',
  'RAND_CHARA_MAKE',
  'CHARA_NAME_DEFINE',
  'CHAR_BODY_GENERATE_WAPPED',
];

// 存根的运行时占位：一行可见反馈，正文含原作函数名（可检索、可断言）。
// 文案样式沿用 page-title.js 的读档占位（#19 先例）。
function stub_line(erb_name, note) {
  era.print(
    `（${note}尚未移植，此处为占位——原作 @${erb_name}，见 docs/stub-registry.md。）`,
  );
}

// 注册在模块顶层（往注册表塞函数，不碰 era.*——引擎允许；era.* 只在处理器
// 函数体内调用，#6 的两条硬规则之二）。普通档：原作 @EVENTFIRST 的其他
// 定义随各自所属票接入。
on('EVENTFIRST', async () => {
  // :8-9 HAIRCOLOR/CHARACTER = -1：#DIM 函数局部，写后全函数无读者，不移植。
  //
  // :11-12 FLAG:26/27 = 种族年龄表（base-1000 打包；232015325431115011 超
  // JS 安全整数）。唯一消费者是身体生成（CHARA_BODY.ERB），随其票落地。

  // :15 FLAG:500 = 2 —— 狂王初期性别：扶她
  era.set('flag:500', 2);

  // :19 CALL FIRST_SETTING —— 交互式开局设置。#50 起部分实现：仅「初期
  // 奴隶」一问（FLAG:501：0 随机 / 1 村娘，问答见 event/first-setting.js，
  // 置法决议与依据在 issue #50），其余各问维持默认（FLAG:500 已在 :15 置
  // 2、FLAG:502 = 0 通常、丽塔启动！= 0 关闭），占位行随问答打印。FLAG:502
  // 分支与丽塔块仍不可达。
  await ask_initial_slave();

  // :21-24 REPEAT 14：FLAG:60..73 = -1（男性冒险者用着素质展示位等）
  for (let i = 60; i < 60 + 14; i += 1) {
    era.set(`flag:${i}`, -1);
  }

  // :26 TARGET = -1（包装层：flag:10005）。:27 BOUGHT = -1 无 ere 落点
  // （builtin 标量、未声明表），等需要它的子系统票再定（存根清单）。
  era_flag.target = -1;

  // :31 FLAG:5 = 17179934119 —— 战斗日志显示设置（位打包，见 :29-30 注释）
  era.set('flag:5', 17179934119);

  // :33 DAY:1 = 1 —— 月份（包装层：flag:10001）。天数/日原作不初始化，
  // 留 0，勿补成 1 月 1 日（era-flag.js 手写区有注）。
  era_flag.month = 1;

  // :35 ITEMSALES:53 = 1 —— 53 号道具开局上架。Item 表已随 #38 落地，
  // item* 寻址在静态表缺席时的硬崩（app.asar 的 set：`a.startsWith("item")`
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

  // :42 PBAND = 4 —— 调教 PBAND，表未声明写了即 no-op，随调教票（存根清单）。

  // :45 FLAG:35 = 0 —— 濒死时自动结束调教：关
  era.set('flag:35', 0);
  // :47 FLAG:37 = 1 —— 着衣系统：开（主菜单读它）
  era.set('flag:37', 1);

  // :50-52 INVERTBIT FLAG:8, 0/1/2 —— 新档 FLAG:8 为 0，翻三位后 = 0b111
  era.set('flag:8', 7);

  // :53 冒險者性別 = -1 —— GLOBAL SAVEDATA，未收录进 Global.yml（#18 刻意
  // 留给魔改子系统票），写无可写（存根清单）。

  // :55 MONEY = 10000 —— 开局持有金（包装层：flag:10004）
  era_flag.money = 10000;

  // :56 EX_FLAG:4444 = 1234（金钱增减镜像，@MONEYSYS）、:60-62 CFLAG:0:451
  // = 21（魔王相当于人类年龄）、:62 EX_FLAG:99 = 70（初始威望）——EX_FLAG
  // 表未声明，EX_FLAG 两笔随 ExFlag 落表票（存根清单）；CFLAG 这笔照落：
  era.set('cflag:0:451', 21);

  // :65-74 IF FLAG:502 == 1（2D 地图模式）：GEO_TEST/SET_VIL + DB 50×50
  // 清零。FIRST_SETTING 存根使 FLAG:502 恒 0，分支不可达；守卫照搬，正文
  // 随迷宫票落地（GEO_TEST/SET_VIL 的占位只在真开 2D 模式后才会打印）。
  if ((era.get('flag:502') || 0) === 1) {
    stub_line('GEO_TEST', '2D 地形生成');
    stub_line('SET_VIL', '村庄设置');
    // :69-73 FOR 50×50：DB 清零（DataTable，迷宫票一并）
  }

  // :78 CALL CHARA_NAME_INIT —— 角色名初始化（存根）
  stub_line('CHARA_NAME_INIT', '角色名初始化');
  // :80 CALL EX_TALENTNAME_INIT —— EX 素质名表初始化（存根，随数据管线：
  // ex_talent/ex_talentname 表进 yml/ 时一并，见 #21 移交说明）
  stub_line('EX_TALENTNAME_INIT', 'EX 素质名初始化');

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
  // 角色 ID 1 头上，有「序号≠ID」场景的测试钉死。
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
    // ——后者只是叙述用词）。引擎守卫：无预设整段短路（#35 假绿教训），
    // 装载零告警零丢弃由 test/chara-yml.test.js 用引擎代码对拍钉死。
    era.addCharacter(17);
    // :103 CALL ADDCHARA_EX, CHARANUM-1 —— 角色专属初始化分发（ere 侧直
    // 接传角色 ID）。@CHARA_EX_17 在原作不存在：守卫 NO >= 17 放行、
    // TRYCALLFORM 落空，是分发族「空间内缺失」的合法情形（#7），返回调用
    // 点缺省 0——不是缺陷、不必实现。
    await add_chara_ex(17);

    // :105 SAVESTR:1 = %NAME:1%、:109 CSTR:1 = %NAME:1% —— 角色名暂存
    // 两处。#5 已决由内置 callname 承载：引擎 addCharacter(17) 已写
    // callname:17:-1（预设 name）与 callname:17:-2（预设 callname），无需
    // 再写；下方 :169-170 囚禁播报（原作读 SAVESTR:1）改读 callname:17:-1。
    // 欠账表（docs/stub-registry.md 变量级）村娘侧随之销账，丽塔侧仍欠。

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
    era.set('cflag:17:420', 1);
    // :111 CALL CHARA_NAME_DEFINE —— 角色称呼定义（存根，随开局设置票）
    stub_line('CHARA_NAME_DEFINE', '角色称呼定义');
    era.set('cflag:17:9', 1);
    era.set('cflag:17:1', 0);
    era.set('cflag:17:11', 15);
    era.set('cflag:17:12', 15);
    era.set('cflag:17:13', 15);
    era.set('cflag:17:14', 15);
    era.set('cflag:17:16', -1);
    era.set('cflag:17:450', 31);

    // :121 CALL CHAR_BODY_GENERATE_WAPPED, 1 —— 角色身体生成（存根；
    // FLAG:26/27 种族年龄表的唯一消费者，随角色身体票）
    stub_line('CHAR_BODY_GENERATE_WAPPED', '角色身体生成');

    // :126-129 四行角色描写（PRINTFORMW，各带读键）
    era.print('因为破坏封印時魔力的涌流，村女的衣服全都剥落了。');
    await era.waitAnyKey();
    era.print('村女还是少女体型，有个性的红色头发剪得短短的。');
    await era.waitAnyKey();
    era.print('还有气息，胸部静静地起伏，润泽的褐色肌肤仿佛在等待着蹂躪。');
    await era.waitAnyKey();
    era.print('就在这里尽情凌辱一番也不錯，不过还是暂且………');
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
      era.print('身材尚不丰满，不过应该足以承受魔王的蹂躪了。');
      await era.waitAnyKey();
      era.print('许久没有尝过女人的味道，你正打算就这样帯回自己房间侵犯………');
      await era.waitAnyKey();
      era.print('「姐……姐………」');
      await era.waitAnyKey();
      era.print('村女的呻吟声打消了你的邪念。');
      await era.waitAnyKey();
    } else {
      // :144-147 四行 PRINTFORMW
      era.print('对于这种小丫头没必要小心翼翼的―――');
      await era.waitAnyKey();
      era.print('你抓着村女的脚踝一路拖進了牢房。');
      await era.waitAnyKey();
      era.print('虽然这里那里都擦伤了不过舔舔也就好了………');
      await era.waitAnyKey();
      era.print('结果她直到被扔进牢房都没有醒过来。');
      await era.waitAnyKey();
    }

    // :152-166 IF 丽塔启动！== 1 —— 丽塔块（ADDCHARA 223 + 称呼/身体）。
    // 丽塔启动！是 SAVEDATA 自定义变量、无 ere 落点（恒非 1），不可达；
    // 正文随开局设置票（docs/stub-registry.md 丽塔行与变量级欠账表）。

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

  // :203 CALL RAND_CHARA_MAKE —— 随机角色生成（初始奴隶=随机，存根）
  stub_line('RAND_CHARA_MAKE', '随机角色生成');

  // :205-215 IF 丽塔启动！ == 1 —— 丽塔块（ADDCHARA 223 + ADDCHARA_EX +
  // SAVESTR:2/CSTR:1 + CHARA_NAME_DEFINE + CHAR_BODY_GENERATE_WAPPED）。
  // 丽塔启动！为 SAVEDATA 默认 0，唯一定值点 FIRST_SETTING 已存根 →
  // 不可达，正文随开局设置票（存根清单）。

  // :231 BEGIN SHOP —— 初始化完成，转入据点主菜单。事件链内信号由 emit
  // 捕获暂存，链跑完交给主循环；主循环进入 SHOP 的守卫报错（#23 未落地）
  // 是本票到站的预期结果。
  begin(STATE.SHOP);
});

module.exports = { STUBBED_CALLS };
