/**
 * @file 角色创建入口与追加（issue #392，N8 段 2）。
 *
 * **调试面板不移植**：世界观调试用的面板，角色信息页原先留的 99 号调试入口
 * 已随 #638 删除。本文件因此不导出它。
 *
 * 调用面（两条外部边，这张工单只做前者）：
 *   - `char_create(arg)` 是**跨域入口**：ere/page/page-shop-labo.js（研究所）
 *     的购买路径属于 #398（N14），届时经
 *     `require('#/chara/chara-custom').char_create` 接上；
 *   - `char_append(arg, mode)` 是本文件内部件（char_create 的下游）。
 *
 * char_create 的 arg 语义：
 *   0 = 付费定制（购买路径：列「勇者」与「精英」两段、定价、可取消），
 *   1 = 调试/免费（登录路径：多列一段「特殊」、勇者走 char_make 随机成型、
 *       不问性别与名字）。
 *
 * 移植说明（有意偏离既有写法，均注明依据）：
 *
 *   - **列表是按钮网格**（#710）：勇者段每行 4 格、精英与特殊段每行 5 格，
 *     排版走 `#/utils/button-grid`。原先按「一次 print 一行」拼纯文本格行，
 *     玩家只能手敲编号；按钮化后正文只写名字（补位交给网格与 showAcc）。
 *   - **末位 else 分支保留**：把输入直接当素质编号、随后由 exist_csv 拦下。
 *     #710 列表按钮化后，三种区间的显示编号各走各的映射、列表外的编号被
 *     引擎拒收，这条缺省处理在实机上不可达（结构保留，测试不再构造它的输入）。
 *   - **find_chara 落成「已在场」判定**：ere 的角色 ID 即预设编号
 *     （chara-ex.js / chara-name.js 的既定标准），编号在
 *     `getAddedCharacters()` 内则返回它，否则 -1（chara-make-inport.js:136
 *     同款）。
 *   - **csv_name(n) / exist_csv(n)**：前者读静态预设的「名前」
 *     （`era.get('chara:n')`，chara-name.js:105 同款），后者问
 *     `getAllCharacters()`（引擎 `getAllCharacters = Object.keys(staticData.chara)`）。
 *   - **跨域写走门面**（#71）：CFLAG:1（invasion）、CFLAG:9（chara 域内）、
 *     CFLAG:11-14（dungeon）、CFLAG:15/16（train）、ABL:31（train）、
 *     EXP:0/5/10（dungeon）、BASE:0/1（dungeon）、FLAG:224（chara 域的
 *     flag 段，`game.chara.勇者入场_24`）一律经具名访问器；CFLAG:420/6/550
 *     与 TALENT/CSTR 的 chara 属主下标域内裸寻址（#70 读全部放行）。
 *   - **随机源提成 `rand` 形参**（chara-init.js 先例）：四处随机名编号的
 *     `rand(80)` 共用它。
 *   - **空输入按 #567 的决定处理**：0 视为空输入、走随机名支；提示行后补
 *     一句「（输入 0 随机生成名字）」——有意偏离既有文案，判断条件与依据
 *     见 ere/utils/input-text.js。
 */

'use strict';

const era = require('#/era-electron');
const { add_chara_ex } = require('#/chara/chara-ex');
const { char_init } = require('#/chara/chara-init');
const { char_make } = require('#/chara/char-make');
const { char_custom } = require('#/chara/chara-custom2');
const { char_body_generate_wapped } = require('#/chara/chara-body');
const { chara_name_random_define } = require('#/chara/chara-name');
const { wearing_cloth_able } = require('#/system/train/cloth');
const { st_up } = require('#/dungeon/dungeon-lvup');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const era_flag = require('#/era-utils/era-flag');
const { print_button_grid } = require('#/utils/button-grid');
const { chara_callname } = require('#/utils/callname-utils');
const { input_text } = require('#/utils/input-text');

const default_rand = (n) => Math.floor(Math.random() * n);

/** 「勇者」段的每行格数 */
const HERO_COLUMNS = 4;
/** 「精英」与「特殊」段的每行格数 */
const ELITE_COLUMNS = 5;
/** 名字长度上限 */
const NAME_MAX_LENGTH = 16;

/** 预设编号在库（= 引擎 staticData.chara 的键集） */
function exist_csv(index) {
  return era.getAllCharacters().includes(index);
}

/** 预设的「名前」（chara-name.js:105 同款读法） */
function csv_name(index) {
  const preset = era.get(`chara:${index}`);
  return String(preset?.name ?? '');
}

/** 编号 n 的角色已在场则回它，否则 -1（见文件头） */
function find_chara(index) {
  return era.getAddedCharacters().includes(index) ? index : -1;
}

/** 码点计数（全角一字算 1） */
function strlens(text) {
  return Array.from(String(text ?? '')).length;
}

/**
 * char_create：生命摇篮——列出可登录的预设并交出定制权。
 *
 * #710：三段列表改成按钮网格（原来的 `[NN] 名字` 纯文本行玩家点不了，
 * 只能手敲编号）。显示编号即快捷键，正文只写名字、编号由引擎按 showAcc
 * 拼（PR #30）；补位随文本行去掉（按钮正文的连续空白会被引擎折叠）。
 * 非列表项（9-16 号勇者、未列出的特殊位）按钮化后不可达——引擎只回传
 * 本轮打印过的编号，这与 #709 堵上「手敲 8 选貴公子」同类。
 *
 * @param {number} arg 0 = 付费定制 / 1 = 调试登录（文件头）
 * @param {(n: number) => number} [rand] 随机源（本函数内不用，传给下游）
 * @returns {Promise<number>} 0（取消时的返回）；其余出口落到 char_custom 或
 *   返回角色号
 */
async function char_create(arg, rand = default_rand) {
  era.drawLine();
  era.print('使用神奇的生命摇篮，凭空创造出一体生物');
  era.print('这生物的一切，完全由魔王大人您自己凭喜好定制');
  if (arg === 0) {
    era.print('这将耗费大量的金钱，幸好只看不买是免费的');
  }
  era.drawLine();
  era.println();
  await era.waitAnyKey();

  era.print('■=== 勇者 ===■');
  print_button_grid(
    Array.from({ length: 8 }, (_, i) => [i + 1, csv_name(i + 1)]),
    HERO_COLUMNS,
  );

  era.print('■=== 精英 ===■');
  print_button_grid(
    Array.from({ length: 10 }, (_, i) => [i + 21, csv_name(i + 201)]),
    ELITE_COLUMNS,
  );

  if (arg === 1) {
    // 特殊段（仅调试登录）：17-39 里在库且在用的预设，18/19 排除
    era.print('■=== 特殊 ===■');
    const special = [];
    for (let i = 17; i < 40; i += 1) {
      if (!exist_csv(i) || i === 19 || i === 18) {
        continue;
      }
      special.push([i + 20, csv_name(i)]);
    }
    print_button_grid(special, ELITE_COLUMNS);
  }

  era.drawLine();
  era.printButton('返回', 999);

  for (;;) {
    const result = await era.input();
    let index;
    if (result === 999) {
      return 0;
    } else if (result >= 1 && result <= 16) {
      index = result;
    } else if (result >= 21 && result <= 30) {
      index = result - 20 + 200;
    } else if (result >= 37 && result <= 60) {
      index = result - 20;
    } else {
      index = result; // （缺省分支，见文件头）
    }

    if (!exist_csv(index)) {
      await era.clear(1); // 抹掉刚回显的输入行
      continue;
    }

    let target = -1;
    if (index >= 17 && index <= 40) {
      target = find_chara(index);
    }
    if (target < 0) {
      target = await char_append(index, arg);
      if (target < 0) {
        return 0;
      }
      era.print(`你召唤出了${chara_callname(target)}……`);
      await era.waitAnyKey();
    }
    await char_custom(target, arg, rand);
    return target;
  }
}

/**
 * char_append：把预设加进来，并按编号走各自的初始化。
 *
 * @param {number} arg 预设编号（需保证可用）
 * @param {number} mode 0 = 付费定制 / 1 = 调试登录
 * @param {(n: number) => number} [rand] 随机源
 * @returns {Promise<number>} 新角色号；已在场时返回 -1
 */
async function char_append(arg, mode, rand = default_rand) {
  // 引擎重复加入同号角色会重建数据，必须在任何初始化之前拒绝。
  if (find_chara(arg) >= 0) {
    await era.printAndWait('该角色已在场，无法重复创建');
    return -1;
  }
  era.addCharacter(arg);
  await add_chara_ex(arg);
  const previous_target = era_flag.target;
  const cid = arg; // 扁平化下角色号 = 预设号
  era_flag.target = cid;

  if (arg >= 1 && arg <= 16) {
    // 勇者
    if (mode === 1) {
      await char_make(cid, 0, 0, rand);
    }
  } else if (arg >= 201 && arg <= 210) {
    // 精英部下
    if (mode === 1) {
      await char_make(cid, 0, 0, rand);
    }
  } else if (arg === 17) {
    // 玛奥
    era.set(`cflag:${cid}:420`, 1); // CFLAG:420（chara 域内，无门面；全库只写不读）
    chara(cid).chara.等级 = 1; // CFLAG:9
    chara(cid).invasion.状态 = 0; // CFLAG:1
    chara(cid).dungeon.攻击力 = 15; // CFLAG:11
    chara(cid).dungeon.防御力 = 15; // CFLAG:12
    chara(cid).chara.基础攻击 = 15; // CFLAG:13（chara 域内）
    chara(cid).chara.基础防御 = 15; // CFLAG:14
    chara(cid).train.初吻对象 = -1; // CFLAG:16
    char_body_generate_wapped(17, rand);
  } else if (arg === 24) {
    // 莉莉
    chara(cid).chara.武装 = 40; // CFLAG:A:550（初期装備：剑）
    era_flag.target = cid;
    wearing_cloth_able(cid);
    char_body_generate_wapped(cid, rand);
  } else if (arg >= 20 && arg <= 23) {
    // 扑克牌
    await append_card(cid, arg, rand);
    wearing_cloth_able(cid); // 衣装全装備
    char_body_generate_wapped(cid, rand);

    // 等级调整：FLAG:60 的勇者基础等级修正逐级 st_up
    const base_level = era.get('flag:60') || 0;
    for (let i = 0; i < base_level; i += 1) {
      st_up(cid, rand);
    }
    // 四张牌的数值直接取上限（BASE = MAXBASE）
    chara(cid).dungeon.体力 = chara(cid).dungeon.体力上限; // BASE:A:0
    chara(cid).dungeon.气力 = chara(cid).dungeon.气力上限; // BASE:A:1（上限访问器见 facade/chara-dungeon.js 手写区）
  } else if ((arg >= 31 && arg <= 33) || arg === 35) {
    // 贡品
    await char_init(cid, rand);
  } else if (arg === 34) {
    // 狂王替身 葵希罗
    game.chara.勇者入场_24 = 1; // FLAG:224
    era_flag.target = cid;
    wearing_cloth_able(cid);
    char_body_generate_wapped(cid, rand);
  }

  if (mode === 0) {
    // 付费路径才问性别与名字
    era.print('请问登陆的角色是什么性别呢？');
    await era.waitAnyKey();
    era.drawLine();
    // #710：三档性别改成一行按钮（原是一行纯文本，玩家点不了）。原顺序是
    // 「打印选项 → waitAnyKey → input」，中间那次等键会把刚打印的按钮禁用
    // （引擎按 valCount 判定），故把那次等键去掉：问句的等键之后直接打印
    // 按钮并等输入，编号由引擎按 showAcc 拼。
    print_button_grid(
      [
        [1, '男性'],
        [2, '女性'],
        [3, '扶她'],
      ],
      3,
    );
    const gender = await era.input();
    if (gender === 1) {
      era.set(`talent:${cid}:122`, 1); // 男人
    }
    if (gender === 3) {
      era.set(`talent:${cid}:121`, 1); // 扶她
    }
    era.drawLine();

    for (;;) {
      era.print('新建人物的名字是？（不输入将随机生成名字）');
      // ere 侧补的输入 0 说明（#567：引擎不受理空提交，0 是「不输入」的可达形式）
      era.print('（输入 0 随机生成名字）');
      const raw = await era.input();
      chara_name_random_define(cid, -1, rand); // （先掷一个随机名打底）
      const name = input_text(raw); // 0 经共享判断条件归空串
      const length = strlens(name);
      if (length > NAME_MAX_LENGTH) {
        era.print('名字太长，请使用全角八字以下的名字。');
        await era.waitAnyKey();
        continue;
      }
      if (length > 0) {
        era.print(`新建人物今后被称呼为${name}。`);
        await era.waitAnyKey();
        era.set(`callname:${cid}:-2`, name); // CALLNAME:A
        era.set(`callname:${cid}:-1`, name); // SAVESTR:A 与 NAME:A
      } else {
        chara_name_random_define(cid, -1, rand);
        era.print(`新建人物今后被称呼为${chara_callname(cid)}。`);
        await era.waitAnyKey();
      }
      break;
    }
  }
  chara(cid).invasion.状态 = 0; // CFLAG:A:1 = 0
  era_flag.target = previous_target; // 还原调用前的 target
  return cid;
}

/**
 * char_append 的扑克牌段：四张扑克牌各自的初始装备与经验。
 *
 * @param {number} cid 角色号
 * @param {number} arg 预设编号（20-23）
 * @param {(n: number) => number} rand 随机源
 */
async function append_card(cid, arg, rand) {
  if (arg === 22) {
    // 東の砦 黑方片 &1：剑 +9000 + 暗黒接頭語
    chara(cid).chara.武装 = 40;
    chara(cid).chara.武装 += 9000;
    chara(cid).chara.武装 += 900000;
    chara(cid).chara.随机名编号 = rand(80); // CFLAG:A:6
  } else if (arg === 23) {
    // 西の砦 白梅花 &4：法杖 + アイス
    chara(cid).train.自慰中毒 = 1; // ABL:A:31
    chara(cid).dungeon.自慰经验 = 30; // EXP:A:10
    chara(cid).chara.武装 = 41;
    chara(cid).chara.武装 += 9000;
    chara(cid).chara.武装 += 600000;
    chara(cid).chara.随机名编号 = rand(80);
  } else if (arg === 21) {
    // 南の砦 银黑桃 &2：手里剑 + デス
    chara(cid).dungeon.自慰经验 = 10;
    chara(cid).chara.武装 = 44;
    chara(cid).chara.武装 += 9000;
    chara(cid).chara.武装 += 300000;
    chara(cid).chara.随机名编号 = rand(80);
  } else if (arg === 20) {
    // 北の砦 金红桃 &8：细剑 + スラッシュ
    chara(cid).dungeon.私处经验 = 20; // EXP:A:0
    const king_flag = era.get('flag:500') || 0;
    if (king_flag === 0 || king_flag === 2) {
      chara(cid).dungeon.性交经验 = chara(cid).dungeon.私处经验;
    }
    chara(cid).train.初体验对象 = 105; // CFLAG:A:15（初体験の相手は狂王）
    chara(cid).chara.武装 = 50;
    chara(cid).chara.武装 += 10000;
    chara(cid).chara.武装 += 400000;
    chara(cid).chara.随机名编号 = rand(80);
  }
}

module.exports = {
  HERO_COLUMNS,
  ELITE_COLUMNS,
  char_create,
  char_append,
};
