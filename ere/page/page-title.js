/**
 * @file 标题画面。
 *
 * 移植说明：
 *   - LOADGLOBAL 不镜像：引擎在每次脚本启动前自动读取公共存档
 *     （dev-guides/11-saves.md），显式加载由引擎承担。
 *   - 标题音乐自 #69 起接通：GLOBAL:0 == 1 时播 TFM-003A_17.mp3（注册名
 *     即文件名，res/sound/sound.csv）。旧版 PLAYBGM 默认循环，而
 *     playMusic 的缺省 config 是 {loop: false}（app.asar 实证），须显式
 *     {loop: true}。SETBGMVOLUME（标题音乐音量）无引擎等价物（playMusic
 *     只有 loop/fade；window.audio 是全局音量非逐曲），音量值不镜像，
 *     仅为存档保真由 era-global 的播种落 66。默认值 1/66 是旧版随包
 *     global.sav 的实证值，ere 侧由 seed_title_music_defaults() 一次性
 *     播种（#18 移交的缺口，#69 实现）。
 *   - 调试残留（[IF_DEBUG] 分支与被注释的 CLEARLINE）不移植。
 *   - 标题图自 #69 起接通：printWholeImage('TITLE') 输出全图（随网格
 *     缩放）。资源未启用时（resource: false 或未注册）checkImage 为假、
 *     退回纯文本标题——组件必须知道自己能不能用图（ADR-0003）；其下
 *     两行空行保留纵向间距。
 *   - %GAMEBASE_TITLE% 的文本标题在旧版被注释（标题由图片承载）；图片
 *     缺席的回退路径仍是文本输出标题，满足「标题画面显示游戏标题」的
 *     验收（#19）。
 *   - 停曲自 #69 起镜像为 era.stopMusic()（新的猎物/旧的奴隶两分支各
 *     一处）。
 *   - RESTART 的语义是重跑本函数，ere 侧写成 for(;;) 循环，不用递归。
 *   - CLEARLINE 1（清除输入回显行）不镜像：ere 的输入不经回显成行。
 *   - 新游戏：RESETDATA 自 #22 起接通——ere 等价物 era.resetData()，
 *     会话内重开局的清档（上一局的日期/金钱/角色列表不带进新局）。
 *     加入初始角色 0 并执行其专属初始化自 T6 接通（issue #21，
 *     ere/chara/chara-ex.js）。BEGIN FIRST 的转场已接通（issue #20）——
 *     发出转场信号、结束本函数，信号由主循环接住
 *     （system/flow/main-loop.js），EVENTFIRST 链的真身
 *     （event/event-first.js，issue #22）完成初始化后转入 SHOP。
 *   - 读档自 #136 起接通（真身见 page/page-save-load.js 的 load_game）：
 *     读档成功返回后标题无条件重跑——load_game 返回后的 continue 即
 *     RESTART 的等价物，重绘的标题用读入的新数据。
 */

const era = require('#/era-electron');
const { begin, STATE } = require('#/system/flow/begin-signal');
const { add_chara_ex } = require('#/chara/chara-ex');
const { init_portcflag } = require('#/chara/chara-portcflag');
const era_global = require('#/era-utils/era-global');
const { load_game } = require('#/page/page-save-load');

// 标题画面的整屏渲染（每轮重绘都从头跑一遍）
function draw_title_screen() {
  // gamebase 由静态表 yml/GameBase.yml 提供，属性名是英文变量名
  // （dev-guides/09-static.md）；只读，不硬编码
  const gamebase = era.get('gamebase');
  // 旧版自算式 {V/1000}.{V%1000}（整数除法）。有意偏离（#135 / ADR-0006）：
  // 移植版版本轴重设为 0.0.0 后，自算式对【版本】0 会算出 "0.0"，位数语义
  // 已失；改为直读【版本代号】versionName（String，纯显示，
  // dev-guides/09-static.md）。引擎对 versionName 缺省的回退恰是「版本号
  // 除以 1000」，与旧自算式同族，但我们显式设值、不走回退。
  const version_text = gamebase.versionName;

  era.setAlign('center'); // 本屏全部居中
  era.drawLine(); // 首条分隔线

  // 标题图：资源在场才显示（resource: false 时 checkImage 恒假，退回
  // 纯文本标题）；printWholeImage 输出全图（整图随网格缩放，宽高由引擎
  // 注册时自动读取）。
  if (era.checkImage('TITLE')) {
    era.printWholeImage('TITLE');
  }
  era.println(); // 图片下两个空行（图片缺席，保留纵向间距）
  era.println();

  // ere 无全局字体开关（SETFONT/FONTBOLD 无等价物），用片段的 fontWeight /
  // 行的 fontSize 近似
  era.print(gamebase.title, { fontSize: '1.25rem' });
  // 版本行只留 Ver【版本代号】（#642 返工：删掉「伪」「立绘版」两段装饰——
  // 立绘在本仓库未实现，装饰失去所指）
  era.print([{ content: `Ver${version_text}`, fontWeight: 'bold' }], {
    fontSize: '1.25rem',
  });
  era.print([{ content: gamebase.author, fontWeight: 'bold' }]);
  // 年份非空才输出（带半角括号）
  if (gamebase.year) {
    era.print([{ content: `(${gamebase.year})`, fontWeight: 'bold' }]);
  }
  era.println(); // 作者行与年份行之后的一个空行

  // 追加信息与年份同款：留空时不占行（本仓库【追加信息】为空）
  if (gamebase.info) {
    era.print(gamebase.info);
  }

  // 分割线紧跟年份行后的空行，两者之间不补空行；按钮一律独占一行
  era.drawLine(); // 按钮区上方的分隔线
  // [0]/[1] 原为纯文本配数字输入；ere 侧改为可点按钮（可点可键入），
  // accelerator 沿用既有编号。
  //
  // 按钮文本一律不写 [编号] 前缀：引擎的 showAcc 默认为 true，渲染时自动拼成
  // `[快捷键] 按钮文本`（且把文本里的连续空白折叠成一个空格），手写前缀会得到
  // 「[0] [0] 旧的奴隶」。方括号编号归引擎，本文件只给正文。
  era.printButton('旧的奴隶', 0);
  era.printButton('新的猎物', 1);
}

/**
 * 标题画面主循环：渲染 → 等输入 → 分发。循环即「RESTART 重跑本函数」
 * 的等价物。
 */
async function run_title_page() {
  // 标题音乐：在重绘循环之前，每次进标题状态只执行一次（重绘不重播）。
  // 播种先于播放：全新 global.sav 的开关是 0，先补上旧版随包默认值 1/66
  // （#18 移交、#69 实现），否则首局进标题没 BGM。
  await era_global.seed_title_music_defaults();
  if (era_global.title_music_enabled === 1) {
    // playMusic 缺省 config 是 {loop: false}（app.asar 实证），循环须显式
    // {loop: true}。资源未启用时引擎查无此名、静默返回 false——不停机、
    // 不报错，与 resource: false 的回退一致。
    era.playMusic('TFM-003A_17.mp3', { loop: true });
  }

  for (;;) {
    // 主界面整屏重绘（RESTART 语义）：清屏后从头输出标题画面
    await era.clear();
    draw_title_screen();

    // 等输入
    const result = await era.input();

    if (result === 1) {
      // 离开标题（新游戏路径）停曲——之后的主菜单是否换曲由
      // page-main-menu.js 的开关决定（#69）
      era.stopMusic();
      // 新游戏：送行句与分割线；CLEARLINE 1（输入不回显）不镜像。
      era.print('即使前路已经破碎，也请魔王大人当上这世界的王……');
      era.drawLine();
      era.setAlign('left'); // 送行段左对齐
      // 新游戏四件套。RESETDATA 自 #22 接通：清掉上一局的会话数据
      // （日期/金钱/角色列表），会话内重开新局不携带旧值；加入初始角色 0、
      // 经分发注册表执行其专属初始化自 T6 接通（issue #21）——ere 以角色号 0
      // 直接寻址。之后 BEGIN FIRST——发出转场信号并当场结束本函数（begin
      // 只 throw 不返回，下方语句与循环的下一轮都不再执行），信号由主循环的
      // enter_state 接住转入 FIRST 状态。
      era.resetData();
      era.addCharacter(0);
      await add_chara_ex(0);
      // 移植版自建（issue #67）：给刚加入的角色盖移植数据版本戳
      // （portcflag 扩展表，每个加入点 addCharacter 之后都调它）
      init_portcflag(0);
      begin(STATE.FIRST);
    }

    if (result === 0) {
      // 离开标题（读档路径）同样停曲
      era.stopMusic();
      // 读档：分割线后进 load_game（page/page-save-load.js，#136），返回后
      // 重跑标题循环——读档成功与否都一样（无条件重绘）
      era.drawLine();
      era.setAlign('left'); // 读档段左对齐
      await load_game();
      continue;
    }
    // 无法识别的输入重绘标题画面，不报错。（本移植的转场经 begin() 以信号
    // 退出函数——循环仅在信号抛出时离开，其余输入都回到循环头重绘，
    // 等价于标题画面不退出。）
  }
}

module.exports = run_title_page;
