/**
 * @file 标题画面。
 *
 * 源: target/ERB/SYSTEM/TITLE ver1.0.8.ERB  @SYSTEM_TITLE
 * （根目录 ERB/TITLE.ERB 的同名函数被引擎忽略——#12 已用引擎级证据仲裁，勿参考。）
 *
 * 移植说明（对照原作行号）：
 *   - :2 LOADGLOBAL 不镜像：ere 引擎在每次脚本启动前自动读取公共存档
 *     （dev-guides/11-saves.md），原作的显式加载在 ere 侧是引擎行为。
 *   - :3-7 标题音乐（PLAYBGM "TFM-003A_17.mp3" / SETBGMVOLUME）不接：res/ 为
 *     空、资源未启用，音频属未决议领域（issue #19 作用域外）。开关与音量变量
 *     的访问器已在 era-utils/era-global.js 就位；注意 ere 全新 global.sav 把它
 *     们初始化为 0，原作声明的默认值 1/66 由音频票落地时补写（#18 决议说明
 *     移交的已知缺口）。
 *   - :13-15 调试残留（[IF_DEBUG] 分支与被注释的 CLEARLINE）不移植。
 *   - :22 HTML_PRINT 标题图不接（res/ 为空）；其下两行空行保留纵向间距。
 *   - :27 %GAMEBASE_TITLE% 在原作被注释（标题由图片承载）；图片不接后改为
 *     文本输出标题，满足「标题画面显示游戏标题」的验收。
 *   - RESTART 的语义是重跑本函数，ere 侧写成 for(;;) 循环，不用递归。
 *   - :93/:103 CLEARLINE 1（清除输入回显行）不镜像：ere 的输入不经回显成行。
 *   - 新游戏（RESETDATA/ADDCHARA/BEGIN FIRST，归 issue #22）与读档
 *     （CALL @SYSTEM_LOADGAME，归后续存档票）均未移植，只留占位反馈。
 */

const era = require('#/era-electron');
const era_global = require('#/era-utils/era-global');

// 原作 :58-73：GLOBAL:99 == 0 时展开的完整制作名单。末行「※特别鸣谢…※」在
// 原作是不换行的 PRINTFORM，其后紧跟按钮 9；'' 即原作的空 PRINTFORML。
const GREETING_EXPANDED_LINES = [
  '※本版本由Delicious基于谦悟制作的0.60EX制作，仅作为汉化交流及代码练习使用，请于18小时内删除※',
  '※私自传播及运行本程序所产生的一切后果，请自行负责※',
  '※本作在许多方面已偏离原作较远，敬请留意※',
  '',
  '地文及指令素质汉化：谦悟、匿名神人、干掉人龙、魔法少女张春华、幽灵 轻^3、文文、撸撸睡、Delicious',
  '技术支持：风飏、stick、红茶与枪、你见不到我、谦悟、雄霸天、看飞机、墨镜马赛克、不科学灰骑士、毒菇、Delicious',
  '测试校对及润色：钢笔、谦悟、猫出没注意、醉饮千殇不知愁、imightcatchsth',
  '',
  '口上组成员：',
  '大众性格：谦悟、文文、匿名神人、干掉人龙、歪闷林、華胥の亡靈、Delicious',
  '专用口上：毛线夜、谦悟、幽灵 轻^3、魔法少女张春华、文文、喝奶茶呛着了、社会废人',
  '原创口上及剧情：白告姬、红茶与枪、幽灵 轻^3、毛线夜、谦悟',
  '',
  '年度版现由我（自由人）在先人的基础上进行魔改',
  '因为本人是重度魔王爱好者，又因为本人比较自私与傲慢，所以大量私货不可避…以及ooc致歉，但大概率是改不了的！诶嘿（）',
  '欢迎各路大佬的加入，本人势单力薄，但仍会尽力！',
  '总而言之…',
  '敬请见证！',
  '',
  '※衷心感谢首席代码君：风飏。没有昨天的你就没有今天的我，在此祝愿你的明天会更好※',
  '※特别鸣谢安东尼，感谢日本网友的原创，也感谢群内所有人的测试与指导※',
];

// 原作 :76-79：GLOBAL:99 非 0 时折叠为两行摘要（第二行无句末※、不换行，
// 其后紧跟按钮 9）
const GREETING_COLLAPSED_LINES = [
  '※本版本由谦悟制作，仅作为汉化交流及代码练习使用，请于18小时内删除※',
  '※私自传播及运行本程序所产生的一切后果，请自行负责',
];

// 原作 $PRINT_TITLE 起至 INPUT 前的整屏渲染（RESTART 每轮重跑）
function draw_title_screen() {
  // gamebase 由静态表 yml/GameBase.yml 提供，属性名是英文变量名
  // （dev-guides/09-static.md）；只读，不硬编码
  const gamebase = era.get('gamebase');
  // 原作 :17 LOCALS = {V/1000}.{V%1000}（整数除法）→ 93106 即 "93.106"。
  // 照原作自算，不依赖引擎 versionName 的回退。
  const version_text = `${Math.floor(gamebase.version / 1000)}.${
    gamebase.version % 1000
  }`;

  era.setAlign('center'); // 原作 :20-21 ALIGNMENT CENTER，本屏全部居中
  era.drawLine(); // 原作 :19 DRAWLINE
  era.println(); // 原作 :23-24 图片下两个空行（图片缺席，保留纵向间距）
  era.println();

  // 原作 :25-26 SETFONT "ARIEL BLACK"/FONTBOLD、:82 SETFONT：ere 无全局字体
  // 开关，用片段的 fontWeight / 行的 fontSize 近似
  era.print(gamebase.title, { fontSize: '1.25rem' });
  // 原作 :29-35 标题行三段拼色：伪(#ff8000) + Ver%LOCALS% + 立绘版(#ccff99)
  era.print(
    [
      { content: '伪', color: '#ff8000', fontWeight: 'bold' },
      { content: `Ver${version_text}`, fontWeight: 'bold' },
      { content: '立绘版', color: '#ccff99', fontWeight: 'bold' },
    ],
    { fontSize: '1.25rem' },
  );
  era.print([{ content: gamebase.author, fontWeight: 'bold' }]);
  // 原作 :36-37 SIF STRLENS(GAMEBASE_YEAR) > 0（非空才输出，带半角括号）
  if (gamebase.year) {
    era.print([{ content: `(${gamebase.year})`, fontWeight: 'bold' }]);
  }
  era.println(); // 原作 :38 PRINTL

  // 原作 :39-86 致辞段：GLOBAL:99 == 0 展开、非 0 折叠（读值走包装层，#18）
  const greeting_lines =
    era_global.greeting_collapsed === 0
      ? GREETING_EXPANDED_LINES
      : GREETING_COLLAPSED_LINES;
  greeting_lines.forEach((line) => era.print(line));
  // 致辞末行在原作不换行（PRINTFORM），按钮 9 直接跟在同一行；ere 的按钮
  // 独占一行（dev-guides/06-output.md），无法完全同行，文本保留原作的前置
  // 空格（" <<" / " >>"；下面联系段的按钮 8 同此约束）
  era.printButton(era_global.greeting_collapsed === 0 ? ' <<' : ' >>', 9);
  era.println(); // 原作 :73/:80 按钮后的 PRINTL

  // 原作 :73 PRINTFORM %GAMEBASE_INFO% 不换行、由联系段的 PRINTFORML 补行尾；
  // ere 的每次 print 独占一行（dev-guides/06-output.md），两行布局等效
  era.print(gamebase.info);
  // 原作 :74-81 联系方式段：GLOBAL:98 == 0 显示「版本推进出问题 」、非 0 显示
  // 联系方式，按钮 8 切换。前者的尾部空格照原作（与按钮同行的间距）。
  if (era_global.contact_info_shown === 0) {
    era.print('版本推进出问题 ');
    era.printButton('>>', 8);
  } else {
    era.print('群里@Delicious或者小窗');
    era.printButton('<<', 8);
  }

  era.println(); // 原作 :84 PRINTFORML（空行）
  era.drawLine(); // 原作 :86 DRAWLINE
  // 原作 :89-90 [0]/[1] 原为纯文本 + INPUT 收数字；ere 侧改为可点按钮（可点可
  // 键入），accelerator 沿用原作编号，文本保留 [0]/[1] 前缀贴近原排版
  era.printButton('[0] 旧的奴隶', 0);
  era.printButton('[1] 新的猎物', 1);
}

/**
 * 标题画面主循环：渲染 → 等输入 → 分发，镜像原作 @SYSTEM_TITLE 的
 * $PRINT_TITLE … RESTART 结构。循环即「RESTART 重跑本函数」的等价物。
 */
async function run_title_page() {
  for (;;) {
    // 主界面整屏重绘（RESTART 语义）：清屏后从头输出标题画面
    await era.clear();
    draw_title_screen();

    // 原作 :91 INPUT（无过滤，玩家可键入任意内容）
    const result = await era.input();

    if (result === 1) {
      // 原作 :92-101 新游戏：送行句与分割线照原作，其后 RESETDATA/ADDCHARA 0/
      // CALL @ADDCHARA_EX/BEGIN FIRST 未移植（issue #22），只留占位反馈；
      // 首句 STOPBGM（无音乐可停）与 CLEARLINE 1（输入不回显）均不镜像。
      era.print('即使前路已经破碎，也请魔王大人当上这世界的王……');
      era.drawLine();
      era.setAlign('left'); // 原作 :99 ALIGNMENT LEFT
      era.print('（新游戏流程尚未移植，此处为占位反馈——见 issue #22。）');
      await era.waitAnyKey();
      continue; // 占位近似：读键后重绘标题（原作此处 BEGIN FIRST 进游戏）
    }

    if (result === 0) {
      // 原作 :102-107 读档：分割线后 CALL @SYSTEM_LOADGAME 未移植（归后续
      // 存档票），只留占位反馈；原作调用返回后 RESTART 回标题。
      era.drawLine();
      era.setAlign('left'); // 原作 :106 ALIGNMENT LEFT
      era.print(
        '（读档界面尚未移植，此处为占位反馈——原作 @SYSTEM_LOADGAME。）',
      );
      await era.waitAnyKey();
      continue;
    }

    if (result === 8) {
      // 原作 :108-110：GLOBAL:98 = (GLOBAL:98+1)%2; SAVEGLOBAL; RESTART。
      // 包装层 setter 不代劳保存（#18），显式 await 落公共存档。
      era_global.toggle_contact_info();
      await era.saveGlobal();
      continue;
    }

    if (result === 9) {
      // 原作 :111-113：GLOBAL:99 = (GLOBAL:99+1)%2; SAVEGLOBAL; RESTART
      era_global.toggle_greeting();
      await era.saveGlobal();
      continue;
    }

    // 原作 :114-115 ELSE → RESTART：无法识别的输入重绘标题画面，不报错。
    // （原作函数尾的 RETURN RESULT 只在 BEGIN/CALL 转场路径上到达；本移植的
    // 转场未接，循环常驻，等价于标题画面不退出。）
  }
}

module.exports = run_title_page;
