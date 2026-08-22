/**
 * @file 侵略画面：@INVASION 的魔力出兵窄路径 + @KYOTEN_EVENT 的人间界臂 +
 *     @INVASION_EVENT 的魔力臂 + @INVASION_CHECK 五组结局判定（issue #117
 *     出兵窄路径；issue #118 结局判定本体与 ENDING_1 接线）。
 *
 * 源: target/ERB/侵略/INVASION.ERB  @INVASION（:6-997，#117 只做 [1] 魔力
 *       出兵：菜单 :139-204、魔力分支 :266-296、共通补正 :565-603、结果段
 *       :609-618 + :694-757、结算尾 :976-997）/ @MEDAL_BONUS（:1026-1067，
 *       存根）/ @INVASION_CHECK（:999-1021，#118 五组条件 1:1；ENDING_x
 *       演出本体在 ere/event/event-ending.js）
 *     target/ERB/侵略/INVASION_EVENT.ERB  @KYOTEN_EVENT（:2-209，仅 ARG:0
 *       == 1 人间界臂）/ @INVASION_EVENT（:212-235，魔力臂）
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - CLEARLINE 局部重绘不镜像（:26 等）：ere 控制台是滚动视图，画面每次
 *     进入整屏重画（page-select-target 同款先例）；$INPUT_LOOP 对无效输入
 *     只重问不重画（:193/:195/:197/:199 的 GOTO），1:1 保留；
 *   - BARSTR 文本条 → era 原生进度条格（printMultiColumns 的 progress 格，
 *     page-train 先例）：barWidth 16 保住条后数值列（引擎缺省 24 会被
 *     el-col-0 吞掉，M155 的教训）；本路径无黄金样本（#108 接受），逐字
 *     锁随 #109 裁定后补；
 *   - @INVASION_EVENT 的 RAND:10 分发（:224-232）不掷骰直接归约：三个分支
 *     对 INV_TYPE == 1 全部「打印守卫后 RETURN -1」（FORT :539、CHALLENGE
 *     :824 的 SIF 守卫、SEIEI :273 的 SIF INV_TYPE != 2），掷不掷骰结果
 *     相同；ere 侧无全局 RAND 序列，归约无副作用；
 *   - [0]/[2]/[3] 出兵路线整支存根（含 600 只怪物的门槛渲染）；存根返回 0
 *     （不消耗回合、零结算）——原作路线走完 RETURN 1，真身落地时一并恢复；
 *   - %SAVESTR:MASTER%（魔王存档名）经 callname:0:-1 承载（#5 决议，
 *     utils/callname-utils），新档 =「你」。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const {
  end10_55,
  ending_1,
  ending_3,
  ending_4,
  ending_5,
} = require('#/event/event-ending');
const { chara } = require('#/facade/chara');
const { stub_line, stub_line_wait } = require('#/utils/stub-line');
const { chara_callname } = require('#/utils/callname-utils');

/**
 * 本文件存根化的原作调用名（docs/stub-registry.md 核对固定）。
 *
 * 'INVASION' 是函数内联段的宿主名（先例：DRAW_MAINMENU 指令面板段）：
 * 地上征服后分支（:25-138）、[0]/[2]/[3] 出兵路线三段（:210-/:299-/:442-）。
 * 'INVASION_CHECK' 自 #118 起是真身（五组条件 1:1），移出本名单。
 */
const STUBBED_CALLS = ['INVASION', 'MEDAL_BONUS', 'INVASION_EVENT_SEIEI'];

/** 进度条的条宽（< 24，否则引擎 el-col-0 吞掉条后数值列，见文件头） */
const BAR_WIDTH = 16;

/** 侵略目标的人间界 FLAG 下标（:110-111，AREA/SINDO 依原作命名） */
const HUMAN_WORLD = { area: 81, sindo: 82 };

// @KYOTEN_EVENT 的星号横幅（INVASION_EVENT.ERB:16-22 等十处，逐字抄自原作，
// 含全角空格的手工对齐）
const BANNER_STAR =
  '*******************************************************************************************';
const BANNER_BLANK =
  '*********　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　**********';
const KYOTEN_BANNERS = {
  占领了村庄:
    '*********　　　　　　　　　　　　　　　占领了村庄　　　　　　　　　　　　　　　　**********',
  占领了港口:
    '*********　　　　　　　　　　　　　　　占领了港口　　　　　　　　　　　　　　　　**********',
  攻陷了堡垒:
    '*********　　　　　　　　　　　　　　　攻陷了堡垒　　　　　　　　　　　　　　　　**********',
  占领了街道:
    '*********　　　　　　　　　　　　　　　占领了街道　　　　　　　　　　　　　　　　**********',
  占领了城市:
    '*********　　　　　　　　　　　　　　　占领了城市　　　　　　　　　　　　　　　　**********',
  人间界的军队占领了村庄:
    '*********　　　　　　　　　　　　人间界的军队占领了村庄　　　　　　　　　　　　　**********',
  人间界的军队占领了港口:
    '*********　　　　　　　　　　　　人间界的军队占领了港口　　　　　　　　　　　　　**********',
  人间界的军队攻陷了堡垒:
    '*********　　　　　　　　　　　　人间界的军队攻陷了堡垒　　　　　　　　　　　　　**********',
  人间界的军队占领了街道:
    '*********　　　　　　　　　　　　人间界的军队占领了街道　　　　　　　　　　　　　**********',
  人间界的军队占领了城市:
    '*********　　　　　　　　　　　　人间界的军队占领了城市　　　　　　　　　　　　　**********',
};

/**
 * 一行「标签 + 进度条 + 数值」（BARSTR/BAR 的等价物，偏离说明见文件头）。
 * @param {string} label 行首标签
 * @param {number} value 当前进度
 * @param {number} max 满刻度
 */
function print_progress_line(label, value, max) {
  era.printMultiColumns([
    {
      type: 'progress',
      percentage: max > 0 ? Math.min(100, (100 * value) / max) : 0,
      inContent: label,
      outContent: ` ${value}/${max}`,
      config: { barWidth: BAR_WIDTH },
    },
  ]);
}

/**
 * @KYOTEN_EVENT（INVASION_EVENT.ERB:2-209）：据点事件横幅。
 *
 * ARG:0 == 1（人间界）的完整状态机：侵攻度跨 2000/4000/6000/8000/10000 逐档
 * 推进 FLAG:93，回落到 500/2000/4000/6000/8000 以下时逐档回退。ARG:0 ==
 * 2/3/4（精灵/龙/天界）臂内赋值在汉化版已被注释（:111-:204 的
 * `;FLAG:9x = n` 全注释，只剩横幅打印），且窄路径 AREA 恒 81、征服后分支
 * 未移植，三臂不可达——登记 docs/stub-registry.md，不搬。
 *
 * @param {number} arg 地区编号（1=人间界；2/3/4 当前不可达）
 * @returns {Promise<0>} 原作恒 RETURN 0
 */
async function kyoten_event(arg) {
  if (arg !== 1) {
    // ARG 2/3/4：不可达（见上），空转与原作注释掉赋值后的行为一致
    return 0;
  }
  const progress = era_flag.human_realm_invasion; // FLAG:81
  const stage = era_flag.human_realm_event_stage; // FLAG:93
  // :15-104 的 ELSEIF 链：命中档推进/回退并打七行横幅，未命中空转
  let next = stage;
  if (progress >= 2000 && stage === 0) {
    next = 1;
  } else if (progress >= 4000 && stage === 1) {
    next = 2;
  } else if (progress >= 6000 && stage === 2) {
    next = 3;
  } else if (progress >= 8000 && stage === 3) {
    next = 4;
  } else if (progress >= 10000 && stage === 4) {
    next = 5;
  } else if (progress <= 500 && stage === 1) {
    next = 0;
  } else if (progress <= 2000 && stage === 2) {
    next = 1;
  } else if (progress <= 4000 && stage === 3) {
    next = 2;
  } else if (progress <= 6000 && stage === 4) {
    next = 3;
  } else if (progress <= 8000 && stage === 5) {
    next = 4;
  }
  if (next === stage) {
    return 0;
  }
  const banner =
    KYOTEN_BANNERS[stage < next ? forward_key(next) : recapture_key(stage)];
  era.print(BANNER_STAR);
  era.print(BANNER_STAR);
  era.print(BANNER_BLANK);
  era.print(banner);
  era.print(BANNER_BLANK);
  era.print(BANNER_STAR);
  era.print(BANNER_STAR);
  era_flag.human_realm_event_stage = next;
  return 0;
}

// 推进档（stage → next）与夺回档（stage → next-1）的横幅键
function forward_key(next_stage) {
  return ['占领了村庄', '占领了港口', '攻陷了堡垒', '占领了街道', '占领了城市'][
    next_stage - 1
  ];
}
function recapture_key(stage) {
  return [
    '人间界的军队占领了村庄',
    '人间界的军队占领了港口',
    '人间界的军队攻陷了堡垒',
    '人间界的军队占领了街道',
    '人间界的军队占领了城市',
  ][stage - 1];
}

/**
 * @INVASION_EVENT（INVASION_EVENT.ERB:212-235）：侵略中途事件。
 *
 * 魔力路线（INV_TYPE == 1）的完整行为（RAND 分发的归约依据见文件头）：
 * FLAG:SINDO != 0（已征服）→ -1；FLAG:AREA == 0（首次侵略）→ 一行传闻
 * 文本；INV_TYPE != 2 → -1。SINKOU 是 #DIM REF 引用传参，本路径不被改写。
 *
 * @param {number} area 侵攻地区 FLAG 下标（81）
 * @param {number} sindo 征服标记 FLAG 下标（82）
 * @param {number} inv_type 出兵类别（窄路径恒 1）
 * @returns {Promise<number>} -1 = 继续侵攻；>0 = 侵攻中止（调用方透传返回）
 */
async function invasion_event(area, sindo, inv_type) {
  // :250-251 SIF FLAG:SINDO != 0 → RETURN -1
  if ((era.get(`flag:${sindo}`) || 0) !== 0) {
    return -1;
  }
  // :257-260 FLAG:AREA == 0：狂王组织精锐部队的传闻（PRINTFORMW → 等键）
  if ((era.get(`flag:${area}`) || 0) === 0) {
    era.drawLine();
    era.print('根据传闻狂王为了应对魔王军的入侵已开始组织起了精锐部队。');
    await era.waitAnyKey();
    era.drawLine();
  }
  // :273-274 SIF INV_TYPE != 2 → RETURN -1；INV_TYPE == 2 的精锐部队战斗体
  // （:279-459）随勇者出兵票（[2] 路线本票存根，当前不可达）
  if (inv_type !== 2) {
    return -1;
  }
  await stub_line_wait('INVASION_EVENT_SEIEI', '精锐部队战斗', '随勇者出兵票');
  return 0;
}

/**
 * @MEDAL_BONUS（INVASION.ERB:1026-1067）：勋章补正（EXP:ARG:81 分档）。
 *
 * 存根恒返回 100（无补正）：新档魔王的 EXP:0:81 = 0，原作在该档本就返回
 * 100，窄路径数值不受影响。真实分档随勋章票。原作实参 ARG 是角色号（调用
 * 点恒 0 = 魔王），存根不读。
 * @returns {Promise<number>} 恒 100
 */
async function medal_bonus() {
  stub_line('MEDAL_BONUS', '勋章补正', '随勋章票');
  return 100;
}

/**
 * @INVASION_CHECK（INVASION.ERB:999-1021）：结局判定（#118 本体）。
 *
 * 五组 ELSEIF（顺序 1:1，命中一组即止）：各领域侵攻度满 10000 且未征服
 * → 对应结局演出 + EX_FLAG:99 += 10 + PRINTL 声望+10。人间界组
 * （:1001-1003）是阶段 1 的贯通终点——ENDING_1 演出后游戏可继续；其余
 * 四组（精灵/龙/天界/天神宫）在窄路径不可达（对应 FLAG/EX_FLAG 无写入
 * 点），演出在 ere/event/event-ending.js 存根。
 *
 * @returns {Promise<void>}
 */
async function invasion_check() {
  // :1001-1003 人间界：FLAG:81 >= 10000 && FLAG:82 == 0 → ENDING_1
  if (
    era_flag.human_realm_invasion >= 10000 &&
    era_flag.human_realm_fallen === 0
  ) {
    const ended = await ending_1();
    if (ended !== 1) {
      // 原作 QUIT 后 :1003-1004 不可达；正常返回（含继续游戏）才结声望
      era_exflag.prestige = era_exflag.prestige + 10; // :1003 EX_FLAG:99 += 10
      era.print('声望+10'); // :1004 PRINTL
    }
    return;
  }
  // :1005-1007 精灵领域：FLAG:86 >= 10000 && FLAG:87 == 0 → ENDING_3
  if (
    era_flag.elf_realm_invasion >= 10000 &&
    era_flag.elf_realm_conquered === 0
  ) {
    await ending_3();
    era_exflag.prestige = era_exflag.prestige + 10; // :1007
    era.print('声望+10'); // :1008 PRINTL
    return;
  }
  // :1009-1011 龙之山脉：FLAG:88 >= 10000 && FLAG:89 == 0 → ENDING_4
  if (
    era_flag.dragon_realm_invasion >= 10000 &&
    era_flag.dragon_realm_conquered === 0
  ) {
    await ending_4();
    era_exflag.prestige = era_exflag.prestige + 10; // :1011
    era.print('声望+10'); // :1012 PRINTL
    return;
  }
  // :1013-1015 天界：FLAG:90 >= 10000 && FLAG:91 == 0 → ENDING_5
  if (era_flag.heaven_invasion >= 10000 && era_flag.heaven_conquered === 0) {
    await ending_5();
    era_exflag.prestige = era_exflag.prestige + 10; // :1015
    era.print('声望+10'); // :1016 PRINTL
    return;
  }
  // :1017-1019 天神宫：EX_FLAG:101 >= 10000 && EX_FLAG:102 == 0 → END10_55
  if (era_exflag.shrine_invasion >= 10000 && era_exflag.shrine_stage === 0) {
    await end10_55();
    era_exflag.prestige = era_exflag.prestige + 10; // :1019
    era.print('声望+10'); // :1020 PRINTL
  }
}

/**
 * 威望修正（INVASION.ERB:270-293，魔力分支内的一份；怪物分支 :236-259
 * 同构）。五档；0-20 档侵攻失败（早退，返回 true 表示已 RETURN）。
 *
 * @param {number} sinkou 档前侵攻点
 * @returns {{sinkou: number, failed: boolean}} 档后侵攻点 / 是否失败早退
 */
function apply_prestige_tier(sinkou) {
  const prestige = era_exflag.prestige; // EX_FLAG:99 威望
  if (prestige <= 20 && prestige >= 0) {
    // :270-274 岌岌可危：SINKOU = 0，PRINTW 侵攻失败，RETURN 1
    era.print('威望值是【岌岌可危】');
    return { sinkou: 0, failed: true };
  }
  if (prestige <= 40 && prestige > 20) {
    // :275-278 动荡不安：÷4
    era.print('威望值是【动荡不安】');
    era.print('侵攻战斗力减少');
    return { sinkou: Math.floor(sinkou / 4), failed: false };
  }
  if (prestige <= 60 && prestige > 40) {
    // :279-284 略受质疑：×(100 + (p-60)*2) / 100（p-60 为负，打折）
    era.print('威望值是【略受质疑】');
    return {
      sinkou: Math.floor((sinkou * (100 + (prestige - 60) * 2)) / 100),
      failed: false,
    };
  }
  if (prestige <= 80 && prestige > 60) {
    // :285-286 相安无事：无修正
    era.print('威望值是【相安无事】');
    return { sinkou, failed: false };
  }
  if (prestige <= 100 && prestige > 80) {
    // :287-292 广受爱戴：×(100 + (p-80)) / 100（加成）
    era.print('威望值是【广受爱戴】');
    return {
      sinkou: Math.floor((sinkou * (100 + (prestige - 80))) / 100),
      failed: false,
    };
  }
  // 威望 < 0 或 > 100：原作无匹配档，无修正（1:1）
  return { sinkou, failed: false };
}

/**
 * @INVASION（INVASION.ERB:6-997）：侵略画面，本票窄路径。
 *
 * 返回 0 = 取消（不消耗回合，回主菜单）；返回 1 = 回合已耗（调用方
 * page-shop 的 [109] 分支据此 BEGIN TURNEND）。
 *
 * @returns {Promise<number>} 0 / 1
 */
async function invasion() {
  // :25-138 地上征服后（FLAG:82）的地区选择菜单整支未移植（登记）；
  // FLAG:82 只由 ENDING_1 演出置 1（#118 前），窄路径不可达
  if (era_flag.human_realm_fallen !== 0) {
    await stub_line_wait(
      'INVASION',
      '地上征服后的地区选择菜单',
      '随征服后内容票',
    );
    return 0;
  }
  // :139-142 ELSE：目标区域默认人间界
  const { area, sindo } = HUMAN_WORLD;

  // $START1 :143-151：怪物数量 = ITEM:100..189 之和（[0]/[2] 路线的 600 门槛）
  let mon_num = 0;
  for (let i = 100; i < 190; i += 1) {
    mon_num += era.get(`item:${i}`) || 0;
  }

  // :144-186 画面绘制（一次）：侵攻度 / 气力 / 怪物数量 / 出兵选项
  era.drawLine();
  print_progress_line('侵攻度', era_flag.human_realm_invasion, 10000);
  // MAXBASE:0:1（气力上限）直读：跨域读放行（ADR-0002），maxbase 无门面
  print_progress_line(
    '你的气力',
    chara(0).dungeon.气力,
    era.get('maxbase:0:1') || 0,
  );
  era.drawLine();
  era.print(`你的怪物数量 ${mon_num}只`);
  era.drawLine();
  if (mon_num < 600) {
    era.print('[-] - 怪物数量不足。至少需要600只');
  } else {
    era.printButton('使用现有怪物的一半去进攻（资金·俘虏）', 0);
  }
  era.printButton('使用魔王的魔力（经验值）', 1);
  if (mon_num < 600) {
    era.print('[-] - 怪物数量不足。至少需要600只');
  } else {
    era.printButton('派遣勇者带三分之一的怪物去进攻（资金·经验值·俘虏）', 2);
  }
  era.printButton('派遣勇者前去掠夺资金（资金·经验值）', 3);
  era.drawLine();
  era.printButton('返回', 999);

  // $INPUT_LOOP :188-200：无效输入重问不重画（GOTO INPUT_LOOP，见文件头）
  let inv_type; // :202 INV_TYPE = RESULT
  for (;;) {
    const result = await era.input();
    if (result === 999) {
      return 0; // :190-191
    }
    if (result >= 4 || result < 0) {
      continue; // :192-195
    }
    if ((result === 0 || result === 2) && mon_num < 600) {
      continue; // :196-199
    }
    if (result === 0) {
      // :209-263 怪物出兵路线（MONSTER_DATA 战斗力统计）——存根
      await stub_line_wait('INVASION', '怪物出兵路线', '随怪物出兵票');
      return 0;
    }
    if (result === 2) {
      // :298-441 勇者带三分之一怪物出兵（勇者选择列表 + 精锐部队战斗）
      await stub_line_wait('INVASION', '勇者出兵路线', '随勇者出兵票');
      return 0;
    }
    if (result === 3) {
      // :442-561 勇者掠夺（勇者选择列表 + 掠夺结算）
      await stub_line_wait('INVASION', '勇者掠夺路线', '随掠夺票');
      return 0;
    }
    inv_type = result; // 1：使用魔王的魔力
    break;
  }

  // :203-207 SINKOU = 0（A/B 是 MONSTER_DATA 的队列坐标，仅怪物路线用）
  let sinkou = 0;

  // ===== 魔力出兵（:266-296）=====
  // :267 SINKOU = BASE:0:1 / 25；:268 BASE:0:1 /= 2（失败也照减）。气力是
  // dungeon 域属主（#70 实测），跨域写走门面（#71）
  sinkou = Math.floor(chara(0).dungeon.气力 / 25);
  chara(0).dungeon.气力 = Math.floor(chara(0).dungeon.气力 / 2);
  // :269-293 威望修正（失败档早退：PRINTW 侵攻失败 → RETURN 1）
  const tier = apply_prestige_tier(sinkou);
  sinkou = tier.sinkou;
  if (tier.failed) {
    era.print('侵攻失败');
    await era.waitAnyKey();
    return 1;
  }
  // :296 PRINTFORMW 战斗力（行首对齐的全角空格在字符串字面量里——模板串
  // 会被 no-irregular-whitespace 拦下）
  era.print('战斗力　' + sinkou + '点');
  await era.waitAnyKey();

  // ===== 共通処理（:565-598）=====
  // :568-572 魔王补正：CFLAG:0:9 是百分比加成（+20 → x1.20），新档 0
  const maou_bonus = (era.get('cflag:0:9') || 0) + 100;
  era.print(
    '魔王补正　　　x' +
      Math.floor(maou_bonus / 100) +
      '.' +
      String(maou_bonus % 100).padStart(2, '0'),
  );
  await era.waitAnyKey();
  sinkou = Math.floor((sinkou * maou_bonus) / 100);
  // :574-590 知识补正（魔王的素质，新档均无）
  if ((era.get('talent:0:325') || 0) === 1) {
    era.print('魔界知识补正　x1.50');
    await era.waitAnyKey();
    sinkou = Math.floor((sinkou * 150) / 100);
  }
  if ((era.get('talent:0:327') || 0) === 1) {
    era.print('淫魔知识补正　x1.20');
    await era.waitAnyKey();
    sinkou = Math.floor((sinkou * 120) / 100);
  }
  if ((era.get('talent:0:328') || 0) === 1) {
    era.print('魔虫知识补正　x1.10');
    await era.waitAnyKey();
    sinkou = Math.floor((sinkou * 110) / 100);
  }
  // :593-595 勋章补正（存根恒 x1.00，窄路径数值不变）
  sinkou = Math.floor((sinkou * (await medal_bonus())) / 100);
  // :598 PRINTFORMW 合计
  era.print('合计　' + sinkou + '点');
  await era.waitAnyKey();

  // :601-603 CALL INVASION_EVENT；SIF RESULT > 0 → RETURN RESULT
  const event_result = await invasion_event(area, sindo, inv_type);
  if (event_result > 0) {
    return event_result;
  }

  // ===== 侵攻結果共通（:609-618）=====
  // :613-615 FLAG:AREA += SINKOU（INV_TYPE != 3）；:617-618 封顶 10000
  era_flag.human_realm_invasion = era_flag.human_realm_invasion + sinkou;
  if (era_flag.human_realm_invasion >= 10000) {
    era_flag.human_realm_invasion = 10000;
  }

  // ===== 魔力结果段（:694-757）=====
  // :696 %SAVESTR:MASTER%的魔力爆发出来了！
  era.print(`${chara_callname(0)}的魔力爆发出来了！`);
  await era.waitAnyKey();
  // :697-709 威力分档的演出文本
  const burst =
    sinkou < 100
      ? `${sinkou}点魔力形成飓风，将大树吹倒了！`
      : sinkou < 300
        ? `${sinkou}点魔力形成火焰，将平原焚烧殆尽！`
        : sinkou < 600
          ? `${sinkou}点魔力形成雷霆，将附近的村庄彻底摧毁！`
          : sinkou < 900
            ? `${sinkou}点魔力形成洪水，将城镇淹没！`
            : sinkou < 1200
              ? `${sinkou}点魔力形成剧毒气体，令骑士团窒息！`
              : `${sinkou}点魔力形成纯粹能量，将城市吞没！`;
  era.print(burst);
  await era.waitAnyKey();
  era.drawLine();
  // :711-738 经验值段（窄路径 FLAG:82 == 0 → :736-738 的 ELSE 臂）。战斗
  // 经验是 dungeon 域属主，跨域写走门面
  const exp_gain = Math.floor(sinkou / 2);
  era.print(`${chara_callname(0)}得到了${exp_gain}点经验值！`);
  await era.waitAnyKey();
  chara(0).dungeon.战斗经验 += exp_gain; // EXP:0:80（魔王的侵略经验）
  era.drawLine();
  // :742-757 侵攻度条
  print_progress_line('侵攻度', era_flag.human_realm_invasion, 10000);

  // ===== 结算尾（:976-997）=====
  era.drawLine(); // :976
  await era.waitAnyKey(); // :977 WAIT
  era_exflag.prestige = era_exflag.prestige + 2; // :978 EX_FLAG:99 += 2
  // :983-994 KYOTEN_EVENT（AREA == 81 → ARG 1）
  await kyoten_event(1);
  // :996 CALL INVASION_CHECK（结局判定，#118 本体：FLAG:81 满时在此触发
  // ENDING_1，演出含 [0] 继续 / [1] 退出的询问——选 0 继续后回落到这里）
  await invasion_check();
  return 1; // :997
}

module.exports = {
  STUBBED_CALLS,
  invasion,
  invasion_check,
  invasion_event,
  kyoten_event,
  medal_bonus,
};
