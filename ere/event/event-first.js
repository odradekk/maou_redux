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
 *   - 被 FIRST_SETTING（存根）钉死在默认值的分支体以注释占位：村娘分支
 *   （FLAG:501，:95-187）与丽塔块（丽塔启动！，:152-166/:205-215）——
 *   开局设置票落地后两者才可达，正文随彼票移植。
 *
 * 出口：begin(STATE.SHOP)（:231）。主菜单渲染归 #23，主循环进入 SHOP 时
 * 的守卫报错（点名状态）即本票的到站标记。
 */

const era = require('#/era-electron');
const { on } = require('#/system/event/registry');
const { begin, STATE } = require('#/system/flow/begin-signal');
const era_flag = require('#/era-utils/era-flag');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 对账钉死）——后续票据此认领工作；名单变动必须同步清单。
 */
const STUBBED_CALLS = [
  'FIRST_SETTING',
  'GEO_TEST',
  'SET_VIL',
  'CHARA_NAME_INIT',
  'EX_TALENTNAME_INIT',
  'RAND_CHARA_MAKE',
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

  // :19 CALL FIRST_SETTING —— 交互式开局设置（存根）。原作借此让玩家改
  // 魔王性别/初期奴隶/2D 模式/丽塔开关；存根即全默认：FLAG:501=0 随机、
  // FLAG:502=0 通常、丽塔启动！=0 关闭——下方两个分支由此不可达。
  stub_line('FIRST_SETTING', '开局设置');

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

  // :35 ITEMSALES:53 = 1 —— 53 号道具上架（引擎 item 表的 sales 子表）
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

  // :95-187 IF FLAG:501 == 1 —— 村娘分支，整段以注释占位（FIRST_SETTING
  // 存根使其不可达）。正文含：ADDCHARA 17 + ADDCHARA_EX、CFLAG 批量
  //（420/9/1/11-14/16/450 等）、CHAR_BODY_GENERATE_WAPPED、搬运/拖拽二选
  // 一的输入环（:112-151）、丽塔块（:152-166）、囚禁播报与自己的
  // BEGIN SHOP 出口（:187）。随开局设置票与初始奴隶票移植；涉及的调用
  // 已登记 docs/stub-registry.md（CHARA_NAME_DEFINE、
  // CHAR_BODY_GENERATE_WAPPED）。

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
