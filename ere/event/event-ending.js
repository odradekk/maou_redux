/**
 * @file 结局演出：#118 实现 ending_1 与 ending_3/4/5/end10_55 的接入
 *     （阶段 1 第三条贯通路径的 S6——游戏第一次可通关）；#173（H4）实现
 *     ending_2（游戏第一次能输）；#404（N20）补齐 ending_3/4/5 的横幅、
 *     char_gift 的献上流程、ending_n 的 Normal End 演出与
 *     ending_input / inconseq_select 两个选项分发。
 *
 * 说明（有意偏离，均注明依据）：
 *   - ending_1 是中场结局不是游戏终止（#112 判断条件）：默认路径继续游戏，
 *     玩家选 [1] 才 QUIT（era.quit()，引擎 API）；「演出已出现」的判定
 *     取 FLAG:82 == 1，只在继续路径置位（QUIT 分支不置）；
 *   - ending_2 是真 GAMEOVER（#173 判断条件）：无条件 QUIT、无 RETURN、不置
 *     任何旗标（整段即演出 + INPUT + QUIT）——端到端的断言是
 *     quit 抛出，不是某个 flag 变 1；
 *   - [0]/[1] 选项用 printButton（原为 PRINTL [0] - … + INPUT）：引擎
 *     showAcc 自动拼 [快捷键] 正文，按钮正文不写 [编号] 前缀（PR #30
 *     实机教训，工单「两个容易做错的点」之二），但**正文里的 `- ` 保留**，
 *     它是显示文本的一部分（page-ability-up.js 同款），渲染即
 *     `[0] - …`；ending_2 的 INPUT 无按钮（纯确认，无选项），
 *     era.input() 直收；
 *     **#572 起覆盖 char_gift 的全部菜单**，唯一**有独立结果**的例外是
 *     发色子菜单——`RESULT == 11` 受理未显示的编号，消费点保留
 *     `useRule: false`（`RESULT >= 8 → PERSONAL = 160` 同样受理未显示
 *     编号，但与 [0] 慈爱同值、玩法上零影响，按钮化后不可达，保留结构）；
 *   - $INPUT_LOOP 的无效输入只重问不重画；
 *   - `CALL ADDCHARA_EX, CHARANUM-1` → add_chara_ex(35)（ere 以角色号
 *     直接寻址，#21）；`A = CHARANUM-1` 的全局传参媒介改为 ere 显式
 *     传参（#5 决议第六条），不再镜像；
 *   - ending_2 的 %SAVESTR:TARGET% → callname:TARGET:-1（SAVESTR 无引擎
 *     通道，#171 的 #5 决议承载；取 TARGET 指针不取队长，见函数内注释）；
 *   - char_gift 的「FLAG:87/89/91 = 1 → CALL → = 2」状态机保留
 *     （置位是防重复触发的判断条件，不是演出），演出本体自 #404 起为真身；
 *   - ending_n 的 14 行横幅是 PRINTFORMW 逐行读键，其后的 FORCEWAIT
 *     紧跟在首行读键之后——**连续两次等待**，保留；
 *   - end10_55 的八行演出自 #404 起为真身（此前只做 EX_FLAG:2810 += 5）。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { race_age_generate } = require('#/chara/chara-body');
const { add_chara_ex } = require('#/chara/chara-ex');
const { char_init } = require('#/chara/chara-init');
const { chara } = require('#/facade/chara');
const { char_make, name_reset } = require('#/chara/char-make');
const { get_look_info } = require('#/chara/look-info');
const { party_char_del } = require('#/dungeon/dungeon-party');
const { show_chara_info } = require('#/page/page-chara-info-show'); // #390 起真身

/**
 * ending_1：人间界征服的中场结局（GOOD END）。
 *
 * 横幅 → 菲娅（角色 35）入队与初始化 → 询问是否继续 → 置 FLAG:82。
 * 选 [1] 才 QUIT，选 [0] 继续游戏（阶段 3 的接续前提）。
 *
 * QUIT 是 throw 型控制流（#148，普查报告 G5）：引擎 quit() 发关窗 IPC 后
 * 抛 Error("quit")，异常炸穿整个调用链（装载循环按 message 静默放行），
 * 故 QUIT 路径上置 FLAG:82 与收尾 PRINTW 均不可达——quit()
 * 之后不写任何语句。夹具同款 throw（era-fixture.js），测试可证。
 *
 * @returns {Promise<number>} 0 = 继续游戏。QUIT 路径不返回（异常炸穿，见上）。
 */
async function ending_1() {
  // 横幅（DRAWLINE + 制表框 8 行 + 空行 2，含全角空格的手工对齐，
  // 逐字保留）
  era.drawLine();
  era.print('┌─────────────────────────────┐');
  era.print('｜　　　　　　　　魔王终于再次掌握了世界　　　　　　　　　　｜');
  era.print('｜　魔物们冲入皇宫，将还在熟睡中的年幼公主拖下床，抓了起来　｜');
  era.print('｜　　　　　　而且，魔王还对人类提出了这样的要求　　　　　　｜');
  era.print('｜　　　　　命令人类继续派出勇者到地下城来讨伐自己　　　　　｜');
  era.print('｜　　　　　因为这样很有趣，哈哈哈哈。魔王这么说着　　　　　｜');
  era.print('｜　　　　这些女孩实际上已经不是勇者，而是魔王的祭品　　　　｜');
  era.print('└─────────────────────────────┘');
  era.print('');
  era.print('');

  // ADDCHARA 35（菲娅）→ add_chara_ex → char_init。
  // add_chara_ex 分发 EX_TALENT:104 = 菲娅（#21 已实现）
  era.addCharacter(35);
  await add_chara_ex(35);
  await char_init(35);

  // WAIT
  await era.waitAnyKey();
  era.drawLine();
  // 询问
  era.print('人间界已经陷落了，不过世上还有很多其它地方，要继续游戏吗？');
  // [0] 继续 / [1] 退出（printButton 的偏离说明见文件头）
  era.printButton('- 世界这么大，我想再去看看！', 0);
  era.printButton('- 我……已经……不想做魔王了……', 1);

  // $INPUT_LOOP：选 1 → QUIT；非 0 的其它值重问
  for (;;) {
    const result = await era.input();
    if (result === 1) {
      // QUIT：引擎 quit() 发关窗 IPC 后抛 Error("quit")（throw 型，
      // #148）——本函数与全部调用方的后续语句不可达，FLAG:82 = 1
      // 与收尾 PRINTW 均不执行。quit() 之后不写任何语句；夹具同款
      // throw（era-fixture.js），测试可证
      era.quit();
    }
    if (result !== 0) {
      continue; // GOTO INPUT_LOOP（重问不重画）
    }
    break;
  }
  // FLAG:82 = 1（人间界已陷落）——「演出已出现」的判断条件（#112）
  era_flag.human_realm_fallen = 1;
  // PRINTW *人类皇族公主菲娅，被你抓获了*
  era.print('*人类皇族公主菲娅，被你抓获了*');
  await era.waitAnyKey();
  return 0;
}

/**
 * ending_2：魔王城陷落——真 GAMEOVER。
 *
 * 与 ending_1 的中场结局写法不同：横幅 → 勇者封印播报（PRINTFORMW）→
 * 空行（行尾两个半角空格，逐字保留）→ GAMEOVER 分隔行 → INPUT（仪式性
 * 确认，结果不被消费——下一步就 QUIT）→ QUIT。**无条件退出，无 RETURN。**
 *
 * 调用点在 ere/dungeon/dungeon.js（FLOOR >= 9 且 TALENT:122 == 0
 * 的真勇者踏破第 9 层）。尾跳转语义：调用方不再执行后续，ere 侧以
 * 调用后的 return 0 收尾（#172）——真身抛 quit 后该行不可达（#148 的
 * throw 型控制流，与 ending_1 的 QUIT 路径同一机制，夹具同款 throw）。
 *
 * @returns {Promise<void>} 永不返回（QUIT 抛 Error("quit") 炸穿调用链）
 */
async function ending_2() {
  // DRAWLINE
  era.drawLine();
  // 横幅（制表框 4 行，含全角空格的手工对齐，逐字保留）
  era.print('┌─────────────────────────────┐');
  era.print('｜　　　　　　新的女勇者，终于攻陷了魔王的地下城　　　　　　｜');
  era.print('｜　　　　　　魔王将打倒自己的勇者的模样铭记于心　　　　　　｜');
  era.print('｜　　　带着一丝不易察觉的微笑，再次陷入了封印的沉睡之中　　｜');
  era.print('└─────────────────────────────┘');

  // PRINTFORMW *勇者%SAVESTR:TARGET%封印了魔王……*。SAVESTR 无引擎
  // 通道（#171：app.asar 无 savestr 表），名字承载按 #5 决议读
  // callname:TARGET:-1。**取的是 TARGET 指针、不是队长 ARG:0**（
  // #173：两者在这条路径上未必同一人，差异是有意保留的行为，
  // 别顺手改成队长）——本函数无参，读的就是全局指针；其值由
  // run_dungeon 在进入时设置（TARGET = ARG:0），离场复位
  // 在尾跳转之后不可达，故触发时恒为踏破第 9 层的队长
  // 本人（对现状的观察，不是把判断条件改写成队长的依据）
  const target_name = era.get(`callname:${era_flag.target}:-1`) ?? '';
  era.print(`*勇者${target_name}封印了魔王，被后人歌颂为传说中的勇者*`);
  await era.waitAnyKey(); // PRINTFORMW 的读键

  // PRINTL（两个尾随半角空格的行——与 ending_1 的纯空 PRINTL 不同，
  // 逐字保留）
  era.print('  ');
  // GAMEOVER 分隔行
  era.print(
    '-------------------------------GAMEOVER---------------------------------',
  );

  // INPUT——确认用，结果不被消费（QUIT 之后无读者）
  await era.input();

  // QUIT：引擎 quit() 发关窗 IPC 后抛 Error("quit")（throw 型，#148）
  // ——本函数与地下城调用链的后续语句全部不可达。quit() 之后不写任何
  // 语句（无 RETURN）
  era.quit();
}

/**
 * RAND:N / RAND(min, max)（0..N-1 / min..max-1）的缺省实现
 * （dungeon-lvup.js 同款）。
 */
function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/** 角色姓名（NAME:x / SAVESTR:x 在 ere 侧的共同读数源，#5 决议） */
function name_of(cid) {
  return era.get(`callname:${cid}:-1`) ?? '';
}

/**
 * char_gift 的三个 ARG 档。head/tail 与角色名拼出播报文案，
 * 其余三串各是询问、按钮与种族文案。
 */
const CHAR_GIFT_TABLE = {
  1: {
    no_chara: 31,
    head: '精灵族圣女',
    tail: '被精灵族作为贡品献了上来………',
    ask: '要收下精灵族圣女作为贡品吗？',
    pick: '去要圣女',
    race: '精灵族',
  },
  5: {
    no_chara: 32,
    head: '龙族公主',
    tail: '被龙族长老作为贡品献了上来………',
    ask: '要收下龙族公主作为贡品吗？',
    pick: '去要公主',
    race: '龙族',
  },
  6: {
    no_chara: 33,
    head: '天使族的下任主神',
    tail: '被天使族作为贡品献了上来………',
    ask: '要收下天使族下任主神作为贡品吗？',
    pick: '去要主神候补',
    race: '天使族',
  },
};

/** 性格档位表（[0]..[7] → TALENT 编号） */
const CHAR_GIFT_PERSONAL = [160, 161, 162, 163, 164, 166, 172, 173];

/**
 * char_gift：三领域征服结局的「献上」
 * 流程——预设角色（圣女/公主/主神候补）或随机生成的贡品少女，最后定人选。
 *
 * 三个输入循环（loop 0/1/2）在 ere 侧合并为一个状态循环，
 * 语义逐条对应（含两处易漏的细节）：
 *   - 行数快照只在整段入口捕一次，从末轮跳回 loop 0
 *     时**不重捕**——`era.clear(getLineCount() - line_count_0)` 因此会连同
 *     上一轮的画面一起清；
 *   - `PERSONAL = 160` 的复位在 loop 1 入口之前，只在从 loop 0 落进 loop 1
 *     时执行；从末轮跳回 loop 1 时**不复位**（保留上一轮的选择）。
 *
 * `A = CHARANUM - 1` 按 #21 扁平化为「刚加入的角色的 ID」（= 预设号）；
 * 角色名读 callname 的 -1 槽——引擎侧的 callname 是 addCharacter 时才写的，
 * 故文案的拼接放在入队之后（静态名表与入队时序无关，取值相同）。
 *
 * @param {number} arg 献上档（1 = 精灵族圣女 / 5 = 龙族公主 /
 *   6 = 下任主神；其余 THROW INVALID ARGUMENT）
 * @param {(n: number) => number} [rand] RAND(1, 17) 的随机源（透传 char_make）
 * @returns {Promise<number|undefined>} 收下时 0，自选路线的「收下她吧」无值
 * @throws {Error} arg 不在三档内
 */
async function char_gift(arg, rand = default_rand) {
  const gift = CHAR_GIFT_TABLE[arg];
  if (gift === undefined) {
    // ELSE / THROW INVALID ARGUMENT
    throw new Error('INVALID ARGUMENT');
  }
  const { no_chara, head, tail, ask, pick, race } = gift;

  // 行数快照 = LINECOUNT（整段入口捕一次，跳回 loop 0 不重捕）
  const line_count_0 = era.getLineCount();
  // PERSONAL = 160 的初值；state 从 loop0 落到 loop1 时复位
  let personal = 160;
  let haircolor = 0; // #DIM HAIRCOLOR（loop 1 重入不重置）
  let a = 0; // 角色 ID（显式传参，替代全局 A）
  let line_count_2 = 0; // loop 2 的行数快照
  let state = 0; // 0 = loop 0（预设角色）/ 1 = loop 1（随机角色）/ 2 = loop 2（性格发色菜单）
  for (;;) {
    if (state === 0) {
      // CLEARLINE LINECOUNT-L_LINECOUNT:0
      await era.clear(era.getLineCount() - line_count_0);
      // 添加预设角色 + add_chara_ex + char_init
      era.addCharacter(no_chara);
      await add_chara_ex(no_chara);
      a = no_chara; // A = CHARANUM - 1（#21：角色号即预设号）
      await char_init(a);
      // 贡品播报（head/tail 与角色名拼接，见函数头）
      era.print('*****************************************');
      era.print(`${head}${name_of(no_chara)}${tail}`);
      era.print('*****************************************');
      // 贡品播报与 PRINTW（空行 + 读键）
      era.print('');
      await era.waitAnyKey();
      // show_chara_info(a, -2)（#390 真身）
      await show_chara_info(a, -2);
      // 询问
      era.print(ask);
      era.printButton('收下她吧', 0);
      era.printButton('另外挑选', 1);
      const result = await era.input();
      if (result === 0) {
        // 询问与「收下预设角色」支（无返回值）
        return undefined;
      }
      // 退掉预设角色
      await drop_gift_chara(a);
      // PERSONAL = 160（只在落进 loop 1 时执行）
      personal = 160;
      state = 1;
      continue;
    }

    if (state === 1) {
      // 随机角色（CHARA = RAND(1, 17) → 1..16），并入队 + 初始化。
      // 局部名用 rand_chara：`chara` 已被门面占用（跨域写走门面）
      const rand_chara = rand(16) + 1;
      era.addCharacter(rand_chara);
      await add_chara_ex(rand_chara);
      a = rand_chara;
      // 发色：沿用上一轮的 HAIRCOLOR，0 时落 1（跨域写走门面）
      chara(a).chara.头发颜色 = haircolor;
      if (chara(a).chara.头发颜色 === 0) {
        chara(a).chara.头发颜色 = 1;
      }
      // loop 2 的行数快照 = LINECOUNT
      line_count_2 = era.getLineCount();
      state = 2;
      continue;
    }

    // state === 2：loop 2（性格发色菜单）
    // CLEARLINE LINECOUNT-L_LINECOUNT:2
    await era.clear(era.getLineCount() - line_count_2);
    era.print('请设定偏好的性格和发色。');
    // %TALENTNAME:PERSONAL% 与 get_look_info(a, '头发颜色')
    // 原是纯文本选项（PR #53 通则升格按钮，正文不写 [编号]）。
    era.printButton(`性格 ：  ${era.get(`talentname:${personal}`) ?? ''}`, 0);
    era.printButton(`发色 ：  ${get_look_info(a, '头发颜色')}`, 1);
    era.drawLine(); // 菜单块（PRINTL 三行 + DRAWLINE + 决定行）
    era.printButton('决定', 100);
    const result = await era.input(); // 菜单的 INPUT

    if (result === 0) {
      // 性格子菜单（三行 PRINTL 选项）。正文里的
      // `- ` 是显示文本的一部分（编号只是引擎按 showAcc 拼的前缀），#572
      // 审查返工：不能丢。
      era.print('请选择偏好的性格。');
      era.printButton('- 慈爱', 0);
      era.printButton('- 自信家', 1);
      era.printButton('- 懦弱', 2);
      era.printButton('- 高贵', 3);
      era.printButton('- 冷静', 4);
      era.printButton('- 恶女', 5);
      era.printButton('- 智慧', 6);
      era.printButton('- 庇护者', 7);
      const picked = await era.input();
      if (picked >= 8) {
        personal = 160;
      } else if (picked >= 0) {
        personal = CHAR_GIFT_PERSONAL[picked]; // 上面的 0..7 映射
      } else {
        personal = 160; // （负数同样落回 160）
      }
      continue; // GOTO INPUT_LOOP_2
    }

    if (result === 1) {
      // 发色子菜单（两行 PRINTL 选项）
      era.print('请选择发色。');
      era.printButton('金发', 1);
      era.printButton('栗发', 2);
      era.printButton('黑发', 3);
      era.printButton('红发', 4);
      era.printButton('银发', 5);
      era.printButton('青发', 6);
      era.printButton('绿发', 7);
      era.printButton('紫发', 8);
      era.printButton('白发', 9);
      era.printButton('暗金发', 10);
      // `RESULT == 11` 受理一个界面上不显示的编号（11 号发色），
      // 收紧白名单会锁死它——保留 useRule: false 留住这条路径（#572；
      // 先例：ere/event/event-museum.js）。
      const picked = await era.input({ useRule: false });
      // `RESULT >= 1 && RESULT <= 10 || RESULT == 11`：该层运算符序列是
      // 「`&&` … `||`」，`||` 之后没有 `&&`，左折叠与 C 式分组得到同一棵树——
      // 两种读法在一切取值上同值，故按显式括号保留结构（#517）
      if ((picked >= 1 && picked <= 10) || picked === 11) {
        chara(a).chara.头发颜色 = picked;
        haircolor = picked;
      }
      continue; // GOTO INPUT_LOOP_2
    }

    if (result !== 100) {
      continue; // ELSE / GOTO INPUT_LOOP_2
    }

    // RESULT == 100 → 落出循环
    // CALL CHAR_MAKE, PERSONAL, ARG → CFLAG:RESULT:1 = 0 → A = RESULT
    const made = await char_make(a, personal, arg, rand);
    a = made;
    chara(a).invasion.状态 = 0;
    // 種族年齢再設定（FLAG:5 位 12/13 时；由 #385 落在
    // ere/chara/chara-body.js）
    const settings = era.get('flag:5') || 0;
    if (((settings >> 12) & 1) !== 0 || ((settings >> 13) & 1) !== 0) {
      // 種族年齢再設定：race_age_generate(CFLAG:A:451, TALENT:A:314)
      // → CFLAG:A:452 = RESULT。落进 CFLAG:452 的是**函数返回值**（种族年龄），
      // 不是入参 CFLAG:451（人类换算年龄）；随机源按仓库约定透传（#385 的真身
      // 在 ere/chara/chara-body.js）
      chara(a).chara.种族年龄 = race_age_generate(
        era.get(`cflag:${a}:451`) || 0,
        era.get(`talent:${a}:314`) || 0,
        rand,
      );
    }
    // 定人选播报
    era.print('*****************************************');
    era.print(`${race}挑选少女${name_of(a)}作为贡品………`);
    era.print('*****************************************');
    era.print(''); // PRINTW（定人选播报）
    await era.waitAnyKey();
    // show_chara_info(a, -2)（同上，#390 真身）
    await show_chara_info(a, -2);
    // 询问（纯文本选项 → 按钮）
    era.print('要收下这名少女作为贡品吗？');
    era.printButton('就是她了', 0);
    era.printButton('再换一个', 1);
    era.printButton(pick, 2);
    const final_result = await era.input();
    if (final_result === 0) {
      return 0; // 收下
    }
    // [2] 回到预设角色；其余回到随机角色
    await drop_gift_chara(a);
    state = final_result === 2 ? 0 : 1;
  }
}

/**
 * 「退掉当前贡品」三连：party_char_del → removeCharacter（DELCHARA）→
 * name_reset（#21 扁平化下目标就是刚加入的 ID）。
 * @param {number} cid 要退掉的角色 ID
 */
async function drop_gift_chara(cid) {
  party_char_del(cid);
  era.removeCharacter(cid);
  await name_reset();
}

/**
 * ending_3：精灵领域征服的中场结局。
 *
 * 横幅 → WAIT → FLAG:87 = 1 → char_gift(1)（精灵族圣女·角色 31）→ FLAG:87 = 2。
 *
 * @param {(n: number) => number} [rand] 随机源（透传 char_gift/char_make）
 * @returns {Promise<number>} 恒 return 0
 */
async function ending_3(rand) {
  // 横幅 + WAIT（DRAWLINE、制表框 4 行、空行、WAIT、DRAWLINE 逐字保留；
  // 横幅与 WAIT 之间是真正的空行，不产出行）
  era.drawLine();
  era.print('┌─────────────────────────────┐');
  era.print('｜　　　　　　　　魔王终于征服了精灵族的领域　　　　　　　　｜');
  era.print('｜　　　　于是，魔王向精灵族的长老提出了这样的要求　　　　　｜');
  era.print('｜　　　　　　　　要求献上秘藏的精灵族圣女　　　　　　　　　｜');
  era.print('└─────────────────────────────┘');
  await era.waitAnyKey();
  era.drawLine();
  // FLAG:87 的 1 → 2 状态机（置位是防重复触发的判断条件）与 return 0
  era_flag.elf_realm_conquered = 1;
  await char_gift(1, rand);
  era_flag.elf_realm_conquered = 2;
  return 0;
}

/**
 * ending_4：龙之山脉征服的中场结局。
 * 同 ending_3 的结构（char_gift(5)：龙族公主·角色 32，FLAG:89）。
 *
 * @param {(n: number) => number} [rand] 随机源（透传）
 * @returns {Promise<number>} 恒 return 0
 */
async function ending_4(rand) {
  // 横幅 + WAIT（同 ending_3 的形式，逐字保留）
  era.drawLine();
  era.print('┌─────────────────────────────┐');
  era.print('｜　　　　　　　　　魔王终于征服了龙族的山脉　　　　　　　　｜');
  era.print('｜　　　　　于是，魔王向龙族的长老提出了这样的要求　　　　　｜');
  era.print('｜　　　　　　　要求献上有着最悠久血统的龙族公主　　　　　　｜');
  era.print('└─────────────────────────────┘');
  await era.waitAnyKey();
  era.drawLine();
  // FLAG:89 的 1 → 2 与 return 0（char_gift(5)：龙族公主·角色 32）
  era_flag.dragon_realm_conquered = 1;
  await char_gift(5, rand);
  era_flag.dragon_realm_conquered = 2;
  return 0;
}

/**
 * ending_5：天界征服的中场结局。
 * 同 ending_3 的结构（char_gift(6)：下任主神·角色 33，FLAG:91）。
 *
 * @param {(n: number) => number} [rand] 随机源（透传）
 * @returns {Promise<number>} 恒 return 0
 */
async function ending_5(rand) {
  // 横幅 + WAIT（同 ending_3 的形式，逐字保留）
  era.drawLine();
  era.print('┌─────────────────────────────┐');
  era.print('｜　　　　　　　　　　魔王终于征服了天界　　　　　　　　　　｜');
  era.print('｜　　　　　　　　于是，魔王向天界提出了要求　　　　　　　　｜');
  era.print('｜　　　　　　　命令献上被选为下一代主神的天使　　　　　　　｜');
  era.print('└─────────────────────────────┘');
  await era.waitAnyKey();
  era.drawLine();
  // FLAG:91 的 1 → 2 与 return 0（char_gift(6)：下任主神·角色 33）
  era_flag.heaven_conquered = 1;
  await char_gift(6, rand);
  era_flag.heaven_conquered = 2;
  return 0;
}

/**
 * ending_n：一周目 500 天的 Normal End 演出。
 *
 * 调用点 run_endcheck（EX_FLAG:2801 == 99 && DAY:0 == 500，每日一次）。
 * 14 行 PRINTFORMW（每行读一次键）+ 首行后的 FORCEWAIT（**连读两次**，
 * 保留）+ 结尾的 ending_input 选择。
 *
 * 结尾选项是手写 `[1] …[2] …` 而不是 printButton——此处无按钮，玩家
 * 键入编号，ending_input 的 INPUT 直接收（与 ending_1 的按钮化刻意不同，
 * 保留该写法）。
 *
 * @returns {Promise<void>}
 */
async function ending_n() {
  // DRAWLINE + 首行 PRINTFORMW
  era.drawLine();
  // 逐行 PRINTFORMW（每行一次读键；中间的空 PRINTL 行不读）
  const lines = [
    '自从魔王被解开封印已经过了整整500天。', // （其后 FORCEWAIT，连读）
    '尽管各界源源不断地派遣勇者讨伐魔王，',
    '但都要么成为了魔王的收藏品，',
    '要么被倒卖到大陆各个龌龊的角落，',
    '要么成为了魔王力量的一部分，帮助魔王为祸人间。',
    '',
    '这块大陆的人们渐渐也习惯于魔王地下城的存在，想要寻找财富或者冒险...',
    '或者...期待着女性最本能的渴望．．．',
    '...各种心思的女孩子们，依然在源源不断地走进这个魔窟。',
    '...',
    '...',
    '大概，已经不会有尽头了吧。',
    '达成了【Normal End】。',
    '[1] 结束游戏\t\t[2] 继续游戏',
  ];
  for (const [i, line] of lines.entries()) {
    if (line !== '') {
      era.print(line);
      await era.waitAnyKey();
    } else {
      era.print(line); // 空行：PRINTFORML（不读键）
    }
    // FORCEWAIT 紧跟首行的读键（连读两次），只在首行之后
    if (i === 0) {
      await era.waitAnyKey();
    }
  }
  // ending_input(EX_FLAG:2801 + 1000)
  await ending_input(era_exflag.first_run_deadline + 1000);
}

/**
 * ending_input：结局线的选项分发 + 后果写入。
 *
 * `arg / 1000`（向零截断）决定分档：1 = Normal End 的
 * 结束/继续、7 = 菲娅线的 three-way、16 = 姐妹双飞 end。
 * 输入循环是「无效输入只重问不重画」。
 *
 * 分档 7/16 只有测试直驱：全库活调用点只有 ending_n（恒 1 档）。
 * 原默认档（各角色线档）的后果写在 FLAG 侧无人读、活调用点走不到，
 * 自 #649 起整档删除；未分档线号静默返回。
 *
 * @param {number} arg 选项档（千位以上是分档，见上）
 * @returns {Promise<void>} QUIT 路径不返回（异常炸穿，见 ending_1 的说明）
 */
async function ending_input(arg) {
  // arg / 1000（整数除法向零截断）
  const local = Math.trunc(arg / 1000);
  // 输入循环：无效输入重问（不重画）
  for (;;) {
    const result = await era.input(); // 分档菜单的 INPUT
    let handled = true;
    if (local === 1) {
      // Normal End：[1] 结束游戏（QUIT）/ [2] 继续
      if (result === 1) {
        // QUIT：throw 型控制流（#148）——QUIT 之后无语句
        era.quit();
      } else if (result === 2) {
        era.print('魔王的传说，还将继续......'); // PRINTW
        await era.waitAnyKey();
      } else {
        handled = false; // 无效输入，重问
      }
    } else if (local === 7) {
      // 菲娅线
      if (result === 1) {
        // 两个 SIF 各护一行 PRINTW
        if (era_exflag.route_35 === 3) {
          era.print('菲娅公主线start~');
          await era.waitAnyKey();
        }
        if (era_exflag.route_35 === 13) {
          era.print('菲娅魔女线start~');
          await era.waitAnyKey();
        }
        era_exflag.route_35 = era_exflag.route_35 + 100;
        era_exflag.first_run_deadline = era_exflag.first_run_deadline + 2;
      } else if (result === 2) {
        era.print('嘛...那祝你其他线好运咯');
        await era.waitAnyKey();
        era_exflag.route_35 = era_exflag.route_35 + 100;
      } else if (result === 3) {
        era.print('嗯，那就给你先存个档，明天再问吧');
        await era.waitAnyKey();
      } else {
        handled = false; // 无效输入，重问
      }
    } else if (local === 16) {
      // 双飞 end（未完成内容：两个选项都只写 2805）
      if (result === 1) {
        era.print('此处剧情尚未做好');
        await era.waitAnyKey();
        era_exflag.route_17 = era_exflag.route_17 + 100; // EX_FLAG:2805
      } else if (result === 2) {
        era.print('你跳过了本故事线');
        await era.waitAnyKey();
        era_exflag.route_17 = era_exflag.route_17 + 100;
      } else if (result === 3) {
        era.print('好的，明天见');
        await era.waitAnyKey();
      } else {
        handled = false; // 无效输入，重问
      }
    } else {
      // 未分档的线号（5/6/8-14 各角色线）：无活调用点，原 CASEELSE 整档已删
      // （#649）——落进来静默返回，不印文本、不写任何 flag 侧
    }
    if (handled) {
      return;
    }
  }
}

/**
 * inconseq_select：菲娅线「因果选择」
 * （点头/摇头、好吃/不好吃、喝不喝魔药）的后果文本。只有 arg == 7 一档有
 * 内容，其余静默。
 *
 * 调用点：菲娅线数据段 2 / 5 / 22（ere/data/ending-scripts.js）。
 * @param {number} arg 后果档（只认 7）
 * @returns {Promise<void>}
 */
async function inconseq_select(arg) {
  const result = await era.input(); // 读选择（点头/摇头…）
  if (arg !== 7) {
    return; // CASEELSE 空档
  }
  // %NAME:MASTER% 的承载（#5 决议：NAME/SAVESTR 同源，走 callname 的 -1 槽）
  const master = era.get('callname:0:-1') ?? '';
  const texts = {
    1: [
      '「哇～魔王大人最好了～那，菲娅先去房间里了哦～♪」',
      '菲娅蹦蹦跳跳的走掉了，看起来很开心的样子，',
      '看起来已经完全适应这里的生活了。',
    ],
    2: [
      '「啊唔唔……魔王大人今天很忙吗……这样啊……」',
      '「那，菲娅会乖乖的等着的哦……」',
      '看起来已经完全适应这里的生活了。',
    ],
    3: ['「……啊～那样的话太好了」', '菲娅看起来很开心的样子。'],
    4: [
      '「这，这样啊……虽然努力的练习过了……果然还是不行吗……」',
      '菲娅看起来很沮丧的样子。',
    ],
    5: [
      '药水并不多，只一小口就全部喝干净了，',
      '并没有觉得有什么不适，……总觉得身体热了起来，',
      '大概是搞成了媚药一类的东西吧，不过，也没什么不好的',
      `${master}就这样顺势的，把菲娅按倒在床上，扯开了衣服，露出了幼小的身体……`,
    ],
    6: [
      '「不，不要喝吗……？」',
      '「诶？即使不用这种东西，菲娅也是魔王大人的……怎，怎么这样……这种事……太犯规了啦……」',
      '听见话语的菲娅愣了一下，豆大的泪珠涌出了眼眶，顺着白皙的脸颊滑了下来，',
      `小小的身体扑在${master}的身上，大声的哭了起来，`,
      `${master}轻抚着菲娅的头，安慰着，`,
      '虽然有点不像自己的风格，不过偶尔这样也不坏呢……',
    ],
    7: [
      '打开瓶子以后，趁着菲娅不注意，统统的都让她喝了下去。',
      '「咕咳咳……？！魔，魔王大人……突然就这么粗暴的……」',
      '「呼啊啊……身体……怎么……好热呢……❤」',
      '看着皮肤泛着粉红色的菲娅，只是把她揽到怀里这样的动作，就使菲娅娇喘连连，',
      '大概是搞成了媚药一类的东西吧，只是普通的抚摸，就让内裤已经彻底湿透了，敏感度也增加了的样子，',
      `${master}就这样顺势的让菲娅趴在自己身上，扯开了衣服，露出了幼小的身体……`,
    ],
  };
  for (const line of texts[result] ?? []) {
    // 每条 PRINTFORMW：打印 + 读键
    era.print(line);
    await era.waitAnyKey();
  }
}

/**
 * end10_55：天神宫结局演出（嘉德救援战）。
 *
 * 窄路径不可达（EX_FLAG:101 天神宫侵攻度无写入点，#102 查明；判断条件
 * EX_FLAG:102 由口上 K902 置位——本演出也不置它，重复触发的抑制
 * 归剧情线，不动）。嘉德线进度 EX_FLAG:2810 += 5 照做。
 *
 * @returns {Promise<void>} 无显式返回
 */
async function end10_55() {
  // 演出（八行 PRINTFORMW，逐字保留）
  era.drawLine();
  const lines = [
    '当你突破层层包围、攻入天界宫广场时、首先看到的却是嘉德被六个人包围在其中的身影',
    '你大手一挥、大量魔物一拥而上、与广场中的天界十字军战到了一起。',
    '而你则突入了六个审判者的包围圈',
    '当你靠近了嘉德、你才发现、嘉德早已遍体鳞伤。身上不知道散布着多少伤口、丝丝鲜血早已染红了嘉德破碎的衣服、',
    '「呵。。呵呵。。本。。本宫居然。。居然被同胞刀剑相向。。然。。然后被魔王所救什么的。。真。。真是狼狈啊。。」',
    '嘉德不停地喘息着。鲜血随着嘉德垂着的指尖滴落。',
    '而且则是轻哼一声、从腰间拔出魔剑指向周围仅剩的六个审判者',
    '战斗、一触即发。',
  ];
  for (const line of lines) {
    era.print(line);
    await era.waitAnyKey();
  }
  // EX_FLAG:2810 += 5（嘉德线的天神宫段进度）
  era_exflag.route_33 = era_exflag.route_33 + 5;
}

module.exports = {
  char_gift,
  end10_55,
  ending_1,
  ending_2,
  ending_3,
  ending_4,
  ending_5,
  ending_input,
  ending_n,
  inconseq_select,
};
