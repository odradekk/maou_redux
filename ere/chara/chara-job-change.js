/**
 * @file 转职：角色信息页的「转职」按钮、资格判定与转职流程
 * （issue #393，N9）。
 *
 * 调用点：ere/page/page-chara-info.js（「转职」按钮与按下后的动作）。
 *
 * 移植说明（有意偏离既有行为，均注明依据）：
 *
 *   - **按钮正文不写 `[{NUM}]` 前缀**：引擎的 `printButton` 自动拼
 *     `[快捷键] `（`showAcc` 默认真），手写前缀会渲染成 `[0] [0] 转职`
 *     （#170 的 PR #30 实录）。`NUM` 只作 `accelerator` 实参（同
 *     chara-name-edit.js 的处置）。按钮正文尾部的全角空格保留（渲染层会把
 *     连续空白折叠成一个半角空格）。
 *
 *   - **色值写法：`era.setColor('#646464')` 着灰、`era.setColor('')`
 *     复位**：SDK `setColor` 的空参即恢复默认色
 *     （era-electron.js:537-541），灰值与 event-execution.js:120、
 *     chara-name-edit.js:109 同款（#175 先例）。
 *
 *   - **职业菜单用 `printMultiColumns` + `printButton`**：本项目通例是
 *     「行首编号升级为真按钮」（见 page-chara-info.js 文件头），布局交给
 *     多列网格（monsterplay_list
 *     同款三格一行），菜单行尾不排对齐空格：布局由多列网格宽度承担，
 *     行尾空格只会被渲染层折叠。
 *
 *   - **素质名走名字表运行时查询**（`talentname:n`）：
 *     硬编码中文标签等于另开一份可能与
 *     `yml/Talent.yml` 不一致的真相源（get-specialtalent.js 同款结论）。
 *
 *   - **`monster_name` 的返回值并入一次 `era.print`**：
 *     ere 侧的 `monster_name` 是返回字符串的纯函数
 *     （monster-data.js:190），不是会打印的过程。
 *
 *   - **怪物持有列表用 `monsterplay_list()` 真身**
 *     （#342，ere/dungeon/monster-play.js）。
 *
 *   - **「无效输入重输」一支与「勋章不足」一支在 ere 侧结构性不可达**：
 *     引擎 `input()` 只回传本轮已打印
 *     按钮的快捷键（`useRule` 默认开，#130 镜像进夹具），越界值进不了
 *     游戏逻辑，而 `[10]`/`[11]` 只在勋章够时才会打印、于是那支的
 *     勋章判断也恒假。两支保留为防御性 `continue`
 *     （`MEDAL_REQUIRED` 一个常量两处共用），不构造只有夹具能触发的
 *     用例。
 *
 *   - **跨域写一律经属主域门面**（#66/#70 决定，逐条登记在案）：
 *     状态 CFLAG:1 走
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

/** 判定返回值：魔王（你）的职业不可变 */
const JOB_CHANGE_KING = 1;
/** 判定返回值：侵攻中的勇者 */
const JOB_CHANGE_HERO = 2;
/** 判定返回值：等级不足 50 */
const JOB_CHANGE_LOW_LEVEL = 3;
/** 判定返回值：处于不可转职的状态 */
const JOB_CHANGE_BLOCKED = 4;

/** 上位职（魔界将军 / 魔导神官）所需的勋章数（菜单追加与选中校验两处同值） */
const MEDAL_REQUIRED = 10;

/** 职业素质区间的下界（选项 0-12 → 素质 200-212） */
const JOB_TALENT_BASE = 200;
/** 职业素质区间的上界（开区间：偏移 0-12 共 13 格） */
const JOB_TALENT_COUNT = 13;

/** 常识改变【战斗】重设后的模数（talent:281 按此取模循环） */
const COMMON_SENSE_BATTLE_MOD = 3;
/** 常识改变【日常】重设后的模数（talent:283 按此取模循环） */
const COMMON_SENSE_DAILY_MOD = 6;
/** 「日常」档的兽奸过滤位（等于 5 且没养狗时跳过一档） */
const COMMON_SENSE_DAILY_BEAST = 5;
/** 兽奸过滤判断条件里的狗（item:22 = 野良犬）持有数 */
const DOG_ITEM = 22;

/** 转职后重新设定的体力/气力上限（体力与气力两行同值） */
const JOB_MAX_BASE = 2000;
/** 上位职的额外上限 */
const JOB_ELITE_BONUS = 500;

/** 神官 / 巫女的「治癒」素质 */
const T_HEAL = 117;
/** 战士 / 骑士 / 魔物使的「鼓舞」素质 */
const T_INSPIRE = 118;
/** 神官 / 巫女转职后同时写入的高信仰值 */
const HIGH_FAITH = 20;
/** 常识改变【战斗】素质（转职清零与档位循环都写它） */
const COMMON_SENSE_BATTLE_TALENT = 281;
/** 常识改变【日常】素质（档位循环时写它） */
const COMMON_SENSE_DAILY_TALENT = 283;
/** 肉便器素质（转职后进「常识改变」菜单的开关） */
const JOB_BENKI_TALENT = 204;
/** 魔界将军素质（上位职判断条件的一支） */
const JOB_ELITE_TALENT_A = 210;
/** 魔导神官素质（上位职判断条件的另一支） */
const JOB_ELITE_TALENT_B = 211;

/**
 * 转职时附赠的战斗技能素质：职业素质 → 战斗技能素质。
 * 肉便器（204）与两个上位职（210/211）不在表内——既有分支里它们
 * 不获赠技能，是**有意的空档**，不是漏移植。
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

/** 职业素质 → [攻,防,基础攻,基础防]（同值职业合并一行） */
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

/** 未列职业的缺省参数（肉便器与苗床落这一支） */
const JOB_PARAMS_DEFAULT = [15, 15, 15, 15];

/**
 * 素质名的运行时查询（引擎静态表 talent 的列名 `talentname:n`）。
 * @param {number} idx 素质下标
 * @returns {string}
 */
function talentname(idx) {
  return era.get(`talentname:${idx}`) ?? '';
}

/**
 * 角色某个素质的读数（`talent:${cid}:${idx}`；未声明的序号引擎返回 undefined，
 * 缺省按 0 处理）。
 * @param {number} cid 角色 ID
 * @param {number} idx 素质下标
 * @returns {number}
 */
function talent(cid, idx) {
  return era.get(`talent:${cid}:${idx}`) || 0;
}

/**
 * check_able_to_job_change：角色能否转职。
 *
 * 四道检查依次短路，返回值即拒绝理由。
 *
 * @param {number} arg 角色号
 * @returns {0|1|2|3|4} 0 = 可以；1 = 魔王；2 = 侵攻中的勇者；3 = 等级不足
 *   50；4 = 处于不可转职的状态
 */
function check_able_to_job_change(arg) {
  if (arg === 0) return JOB_CHANGE_KING; // 你の職は変えられない
  if ((era.get(`cflag:${arg}:1`) || 0) === 2) return JOB_CHANGE_HERO;
  if ((era.get(`cflag:${arg}:9`) || 0) < 50) return JOB_CHANGE_LOW_LEVEL;
  const state = era.get(`cflag:${arg}:1`) || 0;
  if (state !== 0 && state !== 7) return JOB_CHANGE_BLOCKED;
  return 0;
}

/**
 * show_button_job_change：渲染「转职」按钮。
 *
 * @param {number} num 按钮的快捷键编号
 * @param {number} arg 目标角色号
 * @returns {number} 恒 0（调用点不读返回值）
 */
function show_button_job_change(num, arg) {
  const able = check_able_to_job_change(arg); // LOCAL
  if (able === JOB_CHANGE_HERO) return 0; // 侵攻中の勇者ならボタン自体を表示しない
  if (able !== 0) {
    era.setColor('#646464'); // 奴隷で実行不可なら灰色にする
  }
  era.printButton('转职\u3000', num);
  era.setColor(''); // 恢复默认色
  return 0; // （打印与色值复位之后收尾）
}

/**
 * 转职菜单的「职业号 → 职业名」（十一个基础职，按菜单展示顺序排列）。
 * 这十一个名字是菜单文案字面量；转职成功的播报才走 `talentname()` 查表，
 * 两处数据源分工不同。
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

/** 菜单每行三格（基础职三个一行排布） */
const JOB_MENU_COLUMNS = 3;

/**
 * 转职菜单渲染：基础十一项三格一行，上位职两项按勋章数追加，
 * 末尾 `[999] 停止`。菜单行尾不排对齐空格（理由同文件头）。
 * @param {number} arg 目标角色号
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
    // 上位職は勲章が必要（两项共用同一判断条件）
    push_row([
      [10, '魔界将军'],
      [11, '魔导神官'],
    ]);
  }
  era.printButton('停止', 999);
}

/**
 * chara_info_job_change：按钮被按下后的转职流程。
 *
 * @param {number} arg 目标角色号
 * @returns {Promise<number>} 0 = 已处理；2 = 侵攻中的勇者（按钮本不该显示）
 */
async function chara_info_job_change(arg) {
  const able = check_able_to_job_change(arg); // LOCAL
  if (able !== 0) {
    // 不可转职：按档位给出反馈后返回 0
    if (able === JOB_CHANGE_KING) {
      era.print('你的职业无法改变');
    } else if (able === JOB_CHANGE_HERO) {
      return 2; // 按钮没显示但输入仍能到达
    } else if (able === JOB_CHANGE_LOW_LEVEL) {
      era.print('必须积累更多经验！');
    } else if (able === JOB_CHANGE_BLOCKED) {
      era.print('该角色处于不可转职的状态');
    }
    return 0; // （四档反馈之后收尾）
  }

  for (;;) {
    print_job_menu(arg);
    const result = await era.input();

    if (result === 999) return 0;
    if (result < 12 && result > 9) {
      if ((era.get(`exp:${arg}:81`) || 0) < MEDAL_REQUIRED) {
        era.print('*勋章不足*');
        continue; // GOTO INPUT_LOOP
      }
    } else if (result === 12) {
      // 魔物使い：无额外检查
    } else if (result < 0 || result > 9) {
      continue; // GOTO INPUT_LOOP
    }

    // 职业变更的实现：状态复位 → 十三格职业素质全清 → 常识改变复位 →
    // 目标格置 1 → 等级归 1
    chara(arg).invasion.状态 = 0; // CFLAG:1 = 0（invasion 域）
    for (let offset = 0; offset < JOB_TALENT_COUNT; offset += 1) {
      era.set(`talent:${arg}:${JOB_TALENT_BASE + offset}`, 0);
    }
    era.set(`talent:${arg}:${COMMON_SENSE_BATTLE_TALENT}`, 0);
    const local = result + JOB_TALENT_BASE; // LOCAL = RESULT+200
    era.set(`talent:${arg}:${local}`, 1);
    chara(arg).chara.等级 = 1; // CFLAG:9 = 1

    // 战斗技能（表内九项；肉便器与两个上位职不获赠技能）
    const skill = JOB_SKILLS.get(local);
    if (skill !== undefined) {
      era.set(`talent:${arg}:${skill}`, 1);
    } else if (local === JOB_TALENT_BASE + 9) {
      // 苗床：不设技能，改把状态重设为 7（覆盖前面的清零）
      chara(arg).invasion.状态 = 7;
    }

    // 職ごとの基礎パラメーター（十三格只有一个命中，等价于按 local 查表）
    const [attack, defense, base_attack, base_defense] =
      JOB_PARAMS.get(local) ?? JOB_PARAMS_DEFAULT;
    chara(arg).dungeon.攻击力 = attack; // CFLAG:11
    chara(arg).dungeon.防御力 = defense; // CFLAG:12
    chara(arg).chara.基础攻击 = base_attack; // CFLAG:13
    chara(arg).chara.基础防御 = base_defense; // CFLAG:14

    // 上限重设与回满（maxbase 属 dungeon 域；0 有门面入口，
    // 1 的生成器尚未产出，见 chara-dungeon.js 手写区注释）
    let max_base = JOB_MAX_BASE;
    if (local === JOB_ELITE_TALENT_A || local === JOB_ELITE_TALENT_B) {
      max_base += JOB_ELITE_BONUS; // 魔界将军 / 魔导神官
    }
    chara(arg).dungeon.体力上限 = max_base; // MAXBASE:0
    era.set(`maxbase:${arg}:1`, max_base); // MAXBASE:1
    chara(arg).dungeon.体力 = max_base; // BASE:0 = MAXBASE:0
    chara(arg).dungeon.气力 = max_base; // BASE:1 = MAXBASE:1

    era.print(`${chara_callname(arg)}转职为${talentname(local)}了！`);

    if (talent(arg, JOB_BENKI_TALENT) === 1) {
      await job_change_benki(arg); // 肉便器：常识改变菜单
    }

    // 神官でも巫女でもない場合、神を冒涜するか選べる
    if (
      talent(arg, 202) === 0 &&
      talent(arg, 206) === 0 &&
      (talent(arg, 250) || talent(arg, 242)) &&
      talent(arg, 282) === 0
    ) {
      era.print('要弃教吗');
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
      ]);
      const answer = await era.input();
      if (answer === 0) {
        era.set(`talent:${arg}:282`, 1);
        era.print('*已经弃教了*');
      }
    }

    // 神官と巫女は治癒を持つ／戦士と騎士魔物使いは鼓舞を持つ
    if (talent(arg, 202) === 1 || talent(arg, 206) === 1) {
      era.set(`talent:${arg}:${T_HEAL}`, 1);
      era.set(`cflag:${arg}:152`, HIGH_FAITH); // 高い信仰値を持つ
    } else if (
      talent(arg, 200) === 1 ||
      talent(arg, 205) === 1 ||
      talent(arg, 212)
    ) {
      era.set(`talent:${arg}:${T_INSPIRE}`, 1);
    }

    if (talent(arg, 212)) {
      // 魔物使いに転職した場合、契約モンスターを選べる
      era.print('请选择想要契约的魔兽');
      monsterplay_list();
      const monster = await era.input();
      chara(arg).system.从属怪物 = monster; // CFLAG:570（system 域）
      era.print(`与${monster_name(monster)}缔结契约了`);
    }
    return 0; // （契约魔兽段之后收尾）
  }
}

/**
 * job_change_benki：肉便器转职后的「常识改变」菜单。
 *
 * 两项各自循环加一取模（战斗 3 档、日常 6 档），日常那档带兽奸过滤：
 * 数值走到 5 且没养狗时跳过 5 直接回绕。菜单渲染用「按钮格 ＋ 当前值文本格」
 * 的网格行复刻 `[N] 标题  -  取值` 的单行排版。
 *
 * @param {number} arg 角色号
 * @returns {Promise<number>} 0 = 选了 [999] 終了
 */
async function job_change_benki(arg) {
  for (;;) {
    era.print('将常识变成性爱。');
    era.printMultiColumns([
      {
        type: 'button',
        accelerator: 0,
        content: '变更战斗的常识',
        config: { align: 'left', width: 8 },
      },
      {
        type: 'text',
        content: `${NBSP.repeat(2)}-${NBSP.repeat(2)}${get_look_info(arg, KIND.COMMON_SENSE_BATTLE)}`,
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
        content: `${NBSP.repeat(2)}-${NBSP.repeat(2)}${get_look_info(arg, KIND.COMMON_SENSE_DAILY)}`,
        config: { align: 'left', width: 8 },
      },
    ]);
    era.printButton('终了', 999);

    const result = await era.input();

    if (result === 999) return 0;
    if (result === 0) {
      // 战斗常识：0 → 1 → 2 → 0
      const next =
        ((era.get(`talent:${arg}:${COMMON_SENSE_BATTLE_TALENT}`) || 0) + 1) %
        COMMON_SENSE_BATTLE_MOD;
      era.set(`talent:${arg}:${COMMON_SENSE_BATTLE_TALENT}`, next);
    } else if (result === 1) {
      // 日常常识：兽奸过滤后 0-5 循环
      let next =
        (era.get(`talent:${arg}:${COMMON_SENSE_DAILY_TALENT}`) || 0) + 1;
      if (
        next === COMMON_SENSE_DAILY_BEAST &&
        (era.get(`item:${DOG_ITEM}`) || 0) === 0
      ) {
        next += 1; // 没养狗就跳过「兽奸」那一档
      }
      era.set(
        `talent:${arg}:${COMMON_SENSE_DAILY_TALENT}`,
        next % COMMON_SENSE_DAILY_MOD,
      );
    }
    // 其余输入无限重问（ere 侧结构性不可达，见文件头）
  }
}

module.exports = {
  show_button_job_change,
  check_able_to_job_change,
  chara_info_job_change,
  job_change_benki,
};
