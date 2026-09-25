/**
 * @file 转职：角色信息页的「转职」按钮、资格判定与转职流程
 * （issue #393，N9）。
 *
 * 源: target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB 全四函数——
 *     @SHOW_BUTTON_JOB_CHANGE（:4-20）、@CHECK_ABLE_TO_JOB_CHANGE
 *     （:23-42，#FUNCTION 式中函数）、@CHARA_INFO_JOB_CHANGE（:45-230）、
 *     @JOB_CHANGE_BENKI（:233-262）。
 *
 * 调用点：原作 CHARA_INFO ver1.0.1.ERB:860（按钮）与 :1051（CASE 2 动作），
 * 已接在 ere/page/page-chara-info.js。
 *
 * 移植说明（有意偏离，均注明依据）：
 *
 *   - **按钮正文不写 `[{NUM}]` 前缀**：引擎的 `printButton` 自动拼
 *     `[快捷键] `（`showAcc` 默认真），手写前缀会渲染成 `[0] [0] 转职`
 *     （#170 的 PR #30 实录）。`NUM` 只作 `accelerator` 实参（同
 *     chara-name-edit.js 的处置）。尾部全角空格照抄原文，由引擎渲染层折叠。
 *
 *   - **`SETCOLOR 0x646464` / `RESETCOLOR` → `era.setColor('#646464')` /
 *     `era.setColor('')`**（:16/:19）：SDK `setColor` 的空参即恢复默认色
 *     （era-electron.js:537-541），灰值与 event-execution.js:120、
 *     chara-name-edit.js:109 同款（#175 先例）。
 *
 *   - **职业菜单由 `PRINT`/`PRINTL` 定宽文本升级为 `printMultiColumns` +
 *     `printButton`**（:70-86）：原作三个一行靠 PRINT/PRINTL 排布，`[N]`
 *     由玩家手敲；本项目通例是「行首编号升级为真 PRINTBUTTON」（见
 *     page-chara-info.js 文件头），布局交给多列网格（monsterplay_list
 *     同款三格一行），因此**不照抄原作行尾的对齐全角空格**——那是对齐
 *     手段，网格宽度已经承担。
 *
 *   - **`TALENTNAME:LOCAL` 走名字表运行时查询**（`talentname:n`，:188）：
 *     原作即是数据驱动查表，硬编码中文标签等于另开一份可能与
 *     `yml/Talent.yml` 漂移的真相源（get-specialtalent.js 同款裁定）。
 *
 *   - **`CALL MONSTER_NAME,CFLAG:ARG:570,0` 的返回值并入一次 `era.print`**
 *     （:227-228）：ere 侧的 `monster_name` 是返回字符串的纯函数
 *     （monster-data.js:190），不是会打印的过程。
 *
 *   - **`CALL MONSTERPLAY_LIST`（:222）用 `monsterplay_list()` 真身**
 *     （#342，ere/dungeon/monster-play.js）：原作同一张怪物持有表。
 *
 *   - **原作的「无效输入重输」一支（:99-100）与「勋章不足」一支
 *     （:91-96）在 ere 侧结构性不可达**：引擎 `input()` 只回传本轮已打印
 *     按钮的快捷键（`useRule` 默认开，#130 镜像进夹具），越界值进不了
 *     游戏逻辑，而 `[10]`/`[11]` 只在勋章够时才会打印、于是那支的
 *     `EXP:ARG:81 < 10` 判据也恒假。两处 1:1 保留为 `continue`（判据与阈值
 *     照抄，`MEDAL_REQUIRED` 一个常量两处共用），不构造只有夹具能触发的
 *     用例——page-dungeon-setup.js :19-27 的先例。
 *
 *   - **跨域写一律经属主域门面**（#66/#70 裁定，ownership/
 *     *-cross-domain-writes.yml 逐条核对）：状态 CFLAG:1 走
 *     `chara().invasion.状态`（invasion）、攻防 CFLAG:11/12 走
 *     `chara().dungeon.攻击力/防御力`（dungeon）、体力气力 BASE:0/1 走
 *     `chara().dungeon.体力/气力`（dungeon）、契约怪物 CFLAG:570 走
 *     `chara().system.从属怪物`（system）。读仍可用裸寻址（
 *     kojo-dungeon-ravish.js:66 的先例）。
 */

const era = require('#/era-electron');
const { KIND, get_look_info } = require('#/chara/look-info');
const { monster_name } = require('#/dungeon/monster-data');
const { monsterplay_list } = require('#/dungeon/monster-play');
const { chara } = require('#/facade/chara');
const { chara_callname } = require('#/utils/callname-utils');
const { NBSP } = require('#/utils/display-width'); // #577：对齐补位 NBSP 化

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。四函数都落真身，名单为空。
 */
const STUBBED_CALLS = [];

/** 判定返回值：魔王（你）的职业不可变（:31） */
const JOB_CHANGE_KING = 1;
/** 判定返回值：侵攻中的勇者（:33-34） */
const JOB_CHANGE_HERO = 2;
/** 判定返回值：等级不足 50（:35-36） */
const JOB_CHANGE_LOW_LEVEL = 3;
/** 判定返回值：处于不可转职的状态（:38-40） */
const JOB_CHANGE_BLOCKED = 4;

/** 上位职（魔界将军 / 魔导神官）所需的勋章数（:81-84 与 :93 两处同值） */
const MEDAL_REQUIRED = 10;

/** 职业素质区间的下界（:106 `TALENT:ARG:(COUNT+200)`，0-12 → 200-212） */
const JOB_TALENT_BASE = 200;
/** 职业素质区间的上界（:105 `FOR COUNT, 0, 13` 的上界是开区间） */
const JOB_TALENT_COUNT = 13;

/** 常识改变【战斗】重设后的模数（:253 `TALENT:ARG:281 %= 3`） */
const COMMON_SENSE_BATTLE_MOD = 3;
/** 常识改变【日常】重设后的模数（:259 `TALENT:ARG:283 %= 6`） */
const COMMON_SENSE_DAILY_MOD = 6;
/** 「日常」档的兽奸过滤位（:257-258：等于 5 且没养狗时跳过一档） */
const COMMON_SENSE_DAILY_BEAST = 5;
/** 兽奸过滤判据里的狗（ITEM:22 = 野良犬）持有数 */
const DOG_ITEM = 22;

/** 转职后重新设定的体力/气力上限（:178-179 两行同值） */
const JOB_MAX_BASE = 2000;
/** 上位职的额外上限（:180-184） */
const JOB_ELITE_BONUS = 500;

/** 神官 / 巫女的「治癒」素质（:213） */
const T_HEAL = 117;
/** 战士 / 骑士 / 魔物使的「鼓舞」素质（:217） */
const T_INSPIRE = 118;
/** 神官 / 巫女转职后同时写入的高信仰值（:215） */
const HIGH_FAITH = 20;
/** 常识改变【战斗】素质（:109 的清零与 :252 的循环都写它） */
const COMMON_SENSE_BATTLE_TALENT = 281;
/** 常识改变【日常】素质（:255-259 的循环） */
const COMMON_SENSE_DAILY_TALENT = 283;
/** 肉便器素质（:190-191 的转职后菜单开关） */
const JOB_BENKI_TALENT = 204;
/** 魔界将军素质（:180 上位职判据的一支） */
const JOB_ELITE_TALENT_A = 210;
/** 魔导神官素质（:180 上位职判据的另一支） */
const JOB_ELITE_TALENT_B = 211;

/**
 * 转职时附赠的战斗技能素质（:117-137）：职业素质 → 战斗技能素质。
 * 肉便器（204）与两个上位职（210/211）不在表内——原作这九支 IF 里没有
 * 它们的臂，是**有意的空档**，不是漏移植。
 */
const JOB_SKILLS = new Map([
  [200, 240],
  [201, 241],
  [202, 242],
  [203, 243],
  [205, 249],
  [206, 250],
  [207, 251],
  [208, 252],
  [212, 265],
]);

/** 职业素质 → [攻,防,基础攻,基础防]（:140-176 的五支 IF；同值职业合并一行） */
const JOB_PARAMS = new Map([
  [200, [20, 20, 20, 20]], // 战士
  [205, [20, 20, 20, 20]], // 骑士
  [201, [15, 15, 15, 15]], // 魔法师
  [206, [15, 15, 15, 15]], // 巫女
  [202, [15, 20, 15, 20]], // 神官
  [207, [15, 20, 15, 20]], // 忍者
  [203, [20, 15, 20, 15]], // 盗贼
  [208, [20, 15, 20, 15]], // 弓手
  [212, [20, 15, 20, 15]], // 魔物使
  [210, [40, 40, 40, 40]], // 魔界将军
  [211, [40, 40, 40, 40]], // 魔导神官
]);

/** :170-175 的 ELSE 臂（肉便器与苗床落这一支） */
const JOB_PARAMS_DEFAULT = [15, 15, 15, 15];

/**
 * `%TALENTNAME:n%` 的等价物（引擎静态表 talent 的列名）。
 * @param {number} idx 素质下标
 * @returns {string}
 */
function talentname(idx) {
  return era.get(`talentname:${idx}`) ?? '';
}

/**
 * 角色某个素质的读数（`TALENT:ARG:n`；未声明的序号引擎返回 undefined，
 * 按 0 兜底）。
 * @param {number} cid 角色 ID
 * @param {number} idx 素质下标
 * @returns {number}
 */
function talent(cid, idx) {
  return era.get(`talent:${cid}:${idx}`) || 0;
}

/**
 * @CHECK_ABLE_TO_JOB_CHANGE（:23-42，#FUNCTION 式中函数）：角色能否转职。
 *
 * 四道守卫按原作顺序短路，返回值即拒绝理由。
 *
 * @param {number} arg 角色号（原作 ARG）
 * @returns {0|1|2|3|4} 0 = 可以；1 = 魔王；2 = 侵攻中的勇者；3 = 等级不足
 *   50；4 = 处于不可转职的状态
 */
function check_able_to_job_change(arg) {
  if (arg === 0) return JOB_CHANGE_KING; // :29-31 你の職は変えられない
  if ((era.get(`cflag:${arg}:1`) || 0) === 2) return JOB_CHANGE_HERO; // :32-34
  if ((era.get(`cflag:${arg}:9`) || 0) < 50) return JOB_CHANGE_LOW_LEVEL; // :35-37
  const state = era.get(`cflag:${arg}:1`) || 0;
  if (state !== 0 && state !== 7) return JOB_CHANGE_BLOCKED; // :38-40
  return 0; // :42
}

/**
 * @SHOW_BUTTON_JOB_CHANGE（:4-20）：渲染「转职」按钮。
 *
 * @param {number} num 按钮的快捷键编号（原作 NUM）
 * @param {number} arg 目标角色号（原作 ARG）
 * @returns {number} 原作的 RETURN 0
 */
function show_button_job_change(num, arg) {
  const able = check_able_to_job_change(arg); // :10 LOCAL
  if (able === JOB_CHANGE_HERO) return 0; // :11-13 侵攻中の勇者ならボタン自体を表示しない
  if (able !== 0) {
    era.setColor('#646464'); // :15-16 奴隷で実行不可なら灰色にする
  }
  era.printButton('转职\u3000', num); // :18
  era.setColor(''); // :19 RESETCOLOR
  return 0; // :18-20（PRINTFORM/RESETCOLOR 之后收尾）
}

/**
 * 转职菜单的「职业号 → 职业名」（:70-80 的十一个基础职；顺序即原作排版顺序）。
 * 这十一个名字是**原作的 PRINT 字面量**（`:70-80` 逐行写死），不是从
 * `TALENTNAME` 查表来的——所以这里照抄字面量，与 `talentname()` 的用法
 * 不冲突（后者对的 :188 播报在 ERB 侧本就是 `%TALENTNAME:LOCAL%`）。
 */
const JOB_MENU = [
  [0, '战士'],
  [1, '魔法师'],
  [2, '神官'],
  [3, '盗贼'],
  [4, '肉便器'],
  [5, '骑士'],
  [6, '巫女'],
  [7, '忍者'],
  [8, '弓手'],
  [9, '苗床'],
  [12, '魔物使'],
];

/** 菜单每行三格（:70-79 的三个一行的 PRINT/PRINTL 排布） */
const JOB_MENU_COLUMNS = 3;

/**
 * 转职菜单渲染（:68-86）：基础十一项三格一行，上位职两项按勋章数追加，
 * 末尾 `[999] 停止`。布局交给多列网格，不照抄原作的对齐全角空格（文件头）。
 * @param {number} arg 目标角色号（原作 ARG）
 */
function print_job_menu(arg) {
  const entries = [...JOB_MENU];
  const medals = era.get(`exp:${arg}:81`) || 0;
  const push_row = (row) => {
    era.printMultiColumns(
      row.map(([num, label]) => ({
        type: 'button',
        accelerator: num,
        content: label,
        config: { align: 'left', width: 8 },
      })),
    );
  };
  for (let i = 0; i < entries.length; i += JOB_MENU_COLUMNS) {
    push_row(entries.slice(i, i + JOB_MENU_COLUMNS));
  }
  if (medals >= MEDAL_REQUIRED) {
    // :81-84 上位職は勲章が必要（两项同一条判据）
    push_row([
      [10, '魔界将军'],
      [11, '魔导神官'],
    ]);
  }
  era.printButton('停止', 999); // :86
}

/**
 * @CHARA_INFO_JOB_CHANGE（:45-230）：按钮被按下后的转职流程。
 *
 * @param {number} arg 目标角色号（原作 ARG）
 * @returns {Promise<number>} 0 = 已处理；2 = 侵攻中的勇者（按钮本不该显示）
 */
async function chara_info_job_change(arg) {
  const able = check_able_to_job_change(arg); // :51 LOCAL
  if (able !== 0) {
    // :52-64 不可转职：按档位给出反馈后返回 0
    if (able === JOB_CHANGE_KING) {
      era.print('你的职业无法改变'); // :54
    } else if (able === JOB_CHANGE_HERO) {
      return 2; // :55-57 按钮没显示但输入仍能到达
    } else if (able === JOB_CHANGE_LOW_LEVEL) {
      era.print('必须积累更多经验！'); // :59
    } else if (able === JOB_CHANGE_BLOCKED) {
      era.print('该角色处于不可转职的状态'); // :61
    }
    return 0; // :61-63（四档反馈之后收尾）
  }

  for (;;) {
    print_job_menu(arg); // :68-86
    const result = await era.input(); // :88

    if (result === 999) return 0; // :89-90
    if (result < 12 && result > 9) {
      if ((era.get(`exp:${arg}:81`) || 0) < MEDAL_REQUIRED) {
        era.print('*勋章不足*'); // :94
        continue; // :95 GOTO INPUT_LOOP
      }
    } else if (result === 12) {
      // :97-98 魔物使い：无额外守卫
    } else if (result < 0 || result > 9) {
      continue; // :99-100 GOTO INPUT_LOOP
    }

    // :103-115 职业落地：状态复位 → 十三格职业素质全清 → 常识改变复位 →
    // 目标格置 1 → 等级归 1
    chara(arg).invasion.状态 = 0; // :104 CFLAG:ARG:1 = 0（invasion 域）
    for (let offset = 0; offset < JOB_TALENT_COUNT; offset += 1) {
      era.set(`talent:${arg}:${JOB_TALENT_BASE + offset}`, 0); // :105-107
    }
    era.set(`talent:${arg}:${COMMON_SENSE_BATTLE_TALENT}`, 0); // :109
    const local = result + JOB_TALENT_BASE; // :111 LOCAL = RESULT+200
    era.set(`talent:${arg}:${local}`, 1); // :113
    chara(arg).chara.等级 = 1; // :115 CFLAG:ARG:9 = 1

    // :117-137 战斗技能（九支 IF；肉便器与两个上位职原样无技能）
    const skill = JOB_SKILLS.get(local);
    if (skill !== undefined) {
      era.set(`talent:${arg}:${skill}`, 1);
    } else if (local === JOB_TALENT_BASE + 9) {
      // :133-134 苗床：不设技能，改把状态重设为 7（覆盖 :104 的清零）
      chara(arg).invasion.状态 = 7;
    }

    // :140-176 職ごとの基礎パラメーター（十三格只有一个命中，等价于按 local 查表）
    const [attack, defense, base_attack, base_defense] =
      JOB_PARAMS.get(local) ?? JOB_PARAMS_DEFAULT;
    chara(arg).dungeon.攻击力 = attack; // CFLAG:11
    chara(arg).dungeon.防御力 = defense; // CFLAG:12
    chara(arg).chara.基础攻击 = base_attack; // CFLAG:13
    chara(arg).chara.基础防御 = base_defense; // CFLAG:14

    // :178-186 上限重设与回满（maxbase 属 dungeon 域；0 有门面入口，
    // 1 的生成器尚未产出，见 chara-dungeon.js 手写区注释）
    let max_base = JOB_MAX_BASE;
    if (local === JOB_ELITE_TALENT_A || local === JOB_ELITE_TALENT_B) {
      max_base += JOB_ELITE_BONUS; // :180-184 魔界将军 / 魔导神官
    }
    chara(arg).dungeon.体力上限 = max_base; // MAXBASE:0
    era.set(`maxbase:${arg}:1`, max_base); // MAXBASE:1
    chara(arg).dungeon.体力 = max_base; // :185 BASE:0 = MAXBASE:0
    chara(arg).dungeon.气力 = max_base; // :186 BASE:1 = MAXBASE:1

    era.print(`${chara_callname(arg)}转职为${talentname(local)}了！`); // :188

    if (talent(arg, JOB_BENKI_TALENT) === 1) {
      await job_change_benki(arg); // :190-192 肉便器：常识改变菜单
    }

    // :194-208 神官でも巫女でもない場合、神を冒涜するか選べる
    if (
      talent(arg, 202) === 0 &&
      talent(arg, 206) === 0 &&
      (talent(arg, 250) || talent(arg, 242)) &&
      talent(arg, 282) === 0
    ) {
      era.print('要弃教吗'); // :197
      era.printMultiColumns([
        {
          type: 'button',
          accelerator: 0,
          content: '弃教',
          config: { align: 'left', width: 6 },
        },
        {
          type: 'button',
          accelerator: 1,
          content: '不弃教',
          config: { align: 'left', width: 6 },
        },
      ]); // :198-199
      const answer = await era.input(); // :201
      if (answer === 0) {
        era.set(`talent:${arg}:282`, 1); // :204
        era.print('*已经弃教了*'); // :205
      }
    }

    // :212-218 神官と巫女は治癒を持つ／戦士と騎士魔物使いは鼓舞を持つ
    if (talent(arg, 202) === 1 || talent(arg, 206) === 1) {
      era.set(`talent:${arg}:${T_HEAL}`, 1);
      era.set(`cflag:${arg}:152`, HIGH_FAITH); // :215 高い信仰値を持つ
    } else if (
      talent(arg, 200) === 1 ||
      talent(arg, 205) === 1 ||
      talent(arg, 212)
    ) {
      era.set(`talent:${arg}:${T_INSPIRE}`, 1);
    }

    if (talent(arg, 212)) {
      // :219-229 魔物使いに転職した場合、契約モンスターを選べる
      era.print('请选择想要契约的魔兽'); // :221
      monsterplay_list(); // :222
      const monster = await era.input(); // :224
      chara(arg).system.从属怪物 = monster; // :225 CFLAG:ARG:570（system 域）
      era.print(`与${monster_name(monster)}缔结契约了`); // :226-228
    }
    return 0; // :226-230（契约魔兽段之后收尾）
  }
}

/**
 * @JOB_CHANGE_BENKI（:233-262）：肉便器转职后的「常识改变」菜单。
 *
 * 两项各自循环加一取模（战斗 3 档、日常 6 档），日常那档带兽奸过滤：
 * 数值走到 5 且没养狗时跳过 5 直接回绕。菜单渲染用「按钮格 ＋ 当前值文本格」
 * 的网格行复刻原作的 `PRINT [N] 标题  -  取值` 单行排版。
 *
 * @param {number} arg 角色号（原作 ARG）
 * @returns {Promise<number>} 0 = 选了 [999] 終了
 */
async function job_change_benki(arg) {
  for (;;) {
    era.print('将常识变成性爱。'); // :238
    era.printMultiColumns([
      {
        type: 'button',
        accelerator: 0,
        content: '变更战斗的常识',
        config: { align: 'left', width: 8 },
      },
      {
        type: 'text',
        content: `${NBSP.repeat(2)}-${NBSP.repeat(2)}${get_look_info(arg, KIND.COMMON_SENSE_BATTLE)}`, // :239-240
        config: { align: 'left', width: 8 },
      },
    ]);
    era.printMultiColumns([
      {
        type: 'button',
        accelerator: 1,
        content: '变更生活的常识',
        config: { align: 'left', width: 8 },
      },
      {
        type: 'text',
        content: `${NBSP.repeat(2)}-${NBSP.repeat(2)}${get_look_info(arg, KIND.COMMON_SENSE_DAILY)}`, // :242-243
        config: { align: 'left', width: 8 },
      },
    ]);
    era.printButton('终了', 999); // :245

    const result = await era.input(); // :247

    if (result === 999) return 0; // :249-250
    if (result === 0) {
      // :251-253 战斗常识：0 → 1 → 2 → 0
      const next =
        ((era.get(`talent:${arg}:${COMMON_SENSE_BATTLE_TALENT}`) || 0) + 1) %
        COMMON_SENSE_BATTLE_MOD;
      era.set(`talent:${arg}:${COMMON_SENSE_BATTLE_TALENT}`, next);
    } else if (result === 1) {
      // :254-259 日常常识：兽奸过滤后 0-5 循环
      let next =
        (era.get(`talent:${arg}:${COMMON_SENSE_DAILY_TALENT}`) || 0) + 1;
      if (
        next === COMMON_SENSE_DAILY_BEAST &&
        (era.get(`item:${DOG_ITEM}`) || 0) === 0
      ) {
        next += 1; // :257-258 没养狗就跳过「兽奸」那一档
      }
      era.set(
        `talent:${arg}:${COMMON_SENSE_DAILY_TALENT}`,
        next % COMMON_SENSE_DAILY_MOD,
      );
    }
    // :260-262 其余输入无限重问（ere 侧结构性不可达，见文件头）
  }
}

module.exports = {
  STUBBED_CALLS,
  show_button_job_change,
  check_able_to_job_change,
  chara_info_job_change,
  job_change_benki,
};
