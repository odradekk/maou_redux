/**
 * @file 结局演出：@ENDING_1 真身 + @ENDING_3/4/5 与 @END10_55 的条件接线
 *     与状态置位（issue #118，阶段 1 第三条贯通路径的 S6——游戏第一次
 *     可通关）。
 *
 * 源: target/ERB/EVENT/ENDING ver 1.0.1.ERB  @ENDING_1（:6-40，人间界
 *       征服的中场结局）/ @ENDING_3（:59-74，精灵领域）/ @ENDING_4
 *       （:77-92，龙之山脉）/ @ENDING_5（:97-112，天界）/ @CHAR_GIFT
 *       （:136-，贡品角色的献上流程，存根）
 *     target/ERB/EVENT/ENDINGDATA_ADDON1.ERB  @END10_55（:475-485，
 *       天神宫结局演出，存根）
 *     （触发条件与 CALL 在 ere/page/page-invasion.js 的 invasion_check，
 *     原作 INVASION.ERB:999-1021）
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - ENDING_1 是中场结局不是游戏终止（#112 判据）：默认路径继续游戏，
 *     玩家选 [1] 才 QUIT（era.quit()，引擎 API）；「演出已出现」的判定
 *     取 FLAG:82 == 1，只在继续路径置位（原作 :38，QUIT 分支不置）；
 *   - [0]/[1] 选项改 printButton（原作 PRINTL [0] - … + INPUT）：引擎
 *     showAcc 自动拼 [快捷键] 正文，按钮正文不写 [编号] 前缀（PR #30
 *     实机教训，工单「两个容易做错的点」之二）；原作「 - 」分隔随引擎
 *     渲染公式成为「 」，与 page-invasion 的菜单同一先例；
 *   - $INPUT_LOOP 的无效输入只重问不重画（原作 :31-37 的 GOTO）；
 *   - `CALL ADDCHARA_EX, CHARANUM-1` → add_chara_ex(35)（ere 以角色号
 *     直接寻址，#21）；`A = CHARANUM-1` 是原作的全局传参媒介，ere 显式
 *     传参（#5 决议第六条），不再镜像；
 *   - CHAR_GIFT 的「FLAG:87/89/91 = 1 → CALL → = 2」状态机 1:1 保留
 *     （置位是防重复触发的判据，不是演出），演出本体存根。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { add_chara_ex } = require('#/chara/chara-ex');
const { char_init } = require('#/chara/chara-init');
const { stub_line_wait } = require('#/utils/stub-line');

/** 本文件存根化的原作调用名（docs/stub-registry.md 核对固定） */
const STUBBED_CALLS = [
  'ENDING_3',
  'ENDING_4',
  'ENDING_5',
  'END10_55',
  'CHAR_GIFT',
];

/**
 * @ENDING_1（ENDING ver 1.0.1.ERB:6-40）：人间界征服的中场结局（GOOD END）。
 *
 * 横幅 → 菲娅（角色 35）入队与初始化 → 询问是否继续 → 置 FLAG:82。
 * 选 [1] 才 QUIT，选 [0] 继续游戏（阶段 3 的接续前提）。
 *
 * @returns {Promise<number>} 0 = 正常返回（原作 RETURN 0）；1 = QUIT 路径。
 *   原作 QUIT 终止执行、:40 的 RETURN 0 不可达，ere 的 quit() 后进程
 *   关闭时机未定义，故以返回值显式承载「QUIT 后续不执行」（调用方据此
 *   跳过 INVASION_CHECK 里的威望 +10，见 invasion_check）。
 */
async function ending_1() {
  // :8-18 横幅（DRAWLINE + 制表框 8 行 + 空行 2，含全角空格的手工对齐，
  // 逐字抄）
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

  // :20-23 ADDCHARA 35（菲娅）→ CALL ADDCHARA_EX → CALL CHAR_INIT。
  // ADDCHARA_EX 分发 CHARA_EX_35（EX_TALENT:104 = 菲娅，#21 已实现）
  era.addCharacter(35);
  await add_chara_ex(35);
  await char_init(35);

  // :25 WAIT
  await era.waitAnyKey();
  era.drawLine();
  // :27 询问
  era.print('人间界已经陷落了，不过世上还有很多其它地方，要继续游戏吗？');
  // :29-30 [0] 继续 / [1] 退出（printButton 的偏离说明见文件头）
  era.printButton('世界这么大，我想再去看看！', 0);
  era.printButton('我……已经……不想做魔王了……', 1);

  // :31-37 $INPUT_LOOP：选 1 → QUIT；非 0 的其它值重问
  for (;;) {
    const result = await era.input();
    if (result === 1) {
      // :34 QUIT：结束游戏并关闭引擎。原作 QUIT 后函数不再返回，:38 的
      // FLAG:82 = 1 与 :39 的 PRINTW 均不执行——ere 侧 quit() 后直接带
      // 哨兵值返回（见 JSDoc），不置 FLAG:82
      era.quit();
      return 1;
    }
    if (result !== 0) {
      continue; // :35-36 GOTO INPUT_LOOP（重问不重画）
    }
    break;
  }
  // :38 FLAG:82 = 1（人间界已陷落）——「演出已出现」的判据（#112）
  era_flag.human_realm_fallen = 1;
  // :39 PRINTW *人类皇族公主菲娅，被你抓获了*
  era.print('*人类皇族公主菲娅，被你抓获了*');
  await era.waitAnyKey();
  return 0;
}

/**
 * @ENDING_3（ENDING ver 1.0.1.ERB:59-74）：精灵领域征服的中场结局。
 *
 * 横幅与 CHAR_GIFT, 1（精灵族圣女·角色 31 的献上）随各领域征服票，
 * FLAG:87 的 1 → 2 状态机 1:1（防重复触发的判据）。
 *
 * @returns {Promise<number>} 原作恒 RETURN 0
 */
async function ending_3() {
  await stub_line_wait('ENDING_3', '精灵领域结局的横幅演出', '随各领域征服票');
  era_flag.elf_realm_conquered = 1; // :70 FLAG:87 = 1
  await stub_line_wait('CHAR_GIFT', '精灵族圣女的献上流程', '随各领域征服票');
  era_flag.elf_realm_conquered = 2; // :72 FLAG:87 = 2
  return 0;
}

/**
 * @ENDING_4（ENDING ver 1.0.1.ERB:77-92）：龙之山脉征服的中场结局。
 * 同 ending_3 的结构（CHAR_GIFT, 5：龙族公主·角色 32）。
 *
 * @returns {Promise<number>} 原作恒 RETURN 0
 */
async function ending_4() {
  await stub_line_wait('ENDING_4', '龙之山脉结局的横幅演出', '随各领域征服票');
  era_flag.dragon_realm_conquered = 1; // :88 FLAG:89 = 1
  await stub_line_wait('CHAR_GIFT', '龙族公主的献上流程', '随各领域征服票');
  era_flag.dragon_realm_conquered = 2; // :90 FLAG:89 = 2
  return 0;
}

/**
 * @ENDING_5（ENDING ver 1.0.1.ERB:97-112）：天界征服的中场结局。
 * 同 ending_3 的结构（CHAR_GIFT, 6：下任主神·角色 33）。
 *
 * @returns {Promise<number>} 原作恒 RETURN 0
 */
async function ending_5() {
  await stub_line_wait('ENDING_5', '天界结局的横幅演出', '随各领域征服票');
  era_flag.heaven_conquered = 1; // :108 FLAG:91 = 1
  await stub_line_wait('CHAR_GIFT', '下任主神的献上流程', '随各领域征服票');
  era_flag.heaven_conquered = 2; // :110 FLAG:91 = 2
  return 0;
}

/**
 * @END10_55（ENDINGDATA_ADDON1.ERB:475-485）：天神宫结局演出（嘉德救援战）。
 *
 * 窄路径不可达（EX_FLAG:101 天神宫侵攻度无写入点，#102 查明；判据
 * EX_FLAG:102 由口上 K902 置位——原作本函数也不置它，重复触发的抑制
 * 归剧情线，1:1 不动）。演出存根，嘉德线进度 EX_FLAG:2810 += 5 照做。
 *
 * @returns {Promise<void>} 原作无显式 RETURN
 */
async function end10_55() {
  await stub_line_wait('END10_55', '天神宫结局演出', '随天神宫剧情票');
  // :485 EX_FLAG:2810 += 5（嘉德线的天神宫段进度）
  era_exflag.route_33 = era_exflag.route_33 + 5;
}

module.exports = {
  STUBBED_CALLS,
  end10_55,
  ending_1,
  ending_3,
  ending_4,
  ending_5,
};
