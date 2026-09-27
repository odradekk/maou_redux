/**
 * @file 安全套共用子程序：每角色的用套设定画面、性交前的用套确认、
 * 逆侵犯助手（COM65）专用的对象侧确认。
 *
 * 变量语义：CFLAG:61 = 每角色的自动用套设定（0 每次问 / 1 有就用 / 2 不用，
 * COMF_CONDOM.ERB:7-8 的头注）；TEQUIP:35 = 主人装着（属主 event——train
 * 侧写经 chara(cid).event 门面，#215 建模）；TEQUIP:36 = 助手装着 /
 * TEQUIP:37 = 对象装着（属主 train，直写）；ITEM:24 = 安全套所持数。
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - 设定画面的「现在：」行显示当前档位标签（CFLAG:61 → 每次问/有套就用/
 *     不用三档措辞，与画面按钮一一对应）。
 *   - 原作 PRINTL [n] 正文 + 自由数字 INPUT、CASEELSE GOTO 的行内重试在
 *     ere 侧不可达：引擎对已打印按钮拒收白名单外输入（#130 白名单），
 *     按钮化后无效值到不了游戏（#214 裁定六同款）。循环骨架保留给
 *     RESTART——CASE 2/3 改设定后从函数头重跑（:66/:69），化为外层循环。
 *   - @CONFIRM_CONDOM 的自动分支里「没有安全套」的 PRINTFORM 尾接
 *     PRINTFORML（:146-150）拼一行，ere 侧一个 print 调用同串。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');

/** MASTER（Emuera 内置变量）：魔王主角，恒为角色 0（CONTEXT.md） */
const MASTER = 0;

/**
 * @CONDOM_SETTINGS（:10-40）：调教菜单 [103] 的设定画面。
 * TARGET < 1（魔王自己是调教对象）时直接 RETURN 1 不开画面（:11-12）。
 * @returns {Promise<number>} 0（[9] 返回与设定变更后均 RETURN 0；引擎不读）
 */
async function condom_settings() {
  const cid = era_flag.target;
  if (cid < 1) {
    return 1;
  }
  const name = era.get(`callname:${cid}:-1`) ?? '';
  era.print(`和${name}做爱要戴套吗？`);
  // 当前档位标签（与下方三键措辞一一对应；CFLAG:61 未设时按 0 档显示）
  const setting_label = ['每次都问', '有套就用', '每次都直接来，来个痛快'][
    era.get(`cflag:${cid}:61`) || 0
  ];
  era.print(`现在：${setting_label}`);
  era.drawLine();
  era.printButton('每次都问', 0);
  era.printButton('有套就用', 1);
  era.printButton('每次都直接来，来个痛快', 2);
  era.printButton('返回', 9);
  for (;;) {
    const result = await era.input();
    if (result === 9) {
      return 0;
    }
    if (result === 0) {
      era.print('每次确认。');
      await era.waitAnyKey(); // PRINTW
      era.set(`cflag:${cid}:61`, 0);
      return 0;
    }
    if (result === 1) {
      era.print('使用安全套。');
      await era.waitAnyKey();
      era.set(`cflag:${cid}:61`, 1);
      return 0;
    }
    if (result === 2) {
      era.print(`和${name}直接做。`);
      await era.waitAnyKey();
      era.set(`cflag:${cid}:61`, 2);
      return 0;
    }
    // CASEELSE GOTO INPUT_LOOP_01（:35）：白名单外输入到不了游戏（头注）
  }
}

/**
 * @CONFIRM_CONDOM（:42-163）：性交指令入口的用套确认。
 * RETURN 1 = 指令继续；RETURN 0 = 中止（调用方 SIF !RESULT RETURN 0）。
 * 会消耗一枚安全套（ITEM:24 -= 1）并置装着位。
 * @returns {Promise<number>} 1 继续 / 0 中止（无套且玩家拒绝时）
 */
async function confirm_condom() {
  const cid = era_flag.target;
  const player = era_flag.player;
  // RESTART = 外层循环：CASE 2/3 改 CFLAG:61 后按新值重跑（头注）
  for (;;) {
    if ((era.get(`cflag:${cid}:61`) || 0) === 2) {
      return 1; // 设定为不用
    }
    if (era.get(`tequip:${cid}:89`)) {
      return 1; // 兽奸
    }
    if (era.get(`tequip:${cid}:55`)) {
      return 1; // 死斗场
    }
    // 调教者既非扶她（121）也非男人（122）→ 无男性器，继续
    if (
      !(era.get(`talent:${player}:121`) || 0) &&
      !(era.get(`talent:${player}:122`) || 0)
    ) {
      return 1;
    }
    // 调教者已戴着（主人位 35 / 助手位 36）
    const wearing_master = chara(cid).event.主人避孕套;
    const wearing_assi = era.get(`tequip:${cid}:36`) || 0;
    if (
      (!era_flag.assiplay && wearing_master) ||
      (era_flag.assiplay && wearing_assi)
    ) {
      return 1;
    }
    const player_name = era.get(`callname:${player}:-1`) ?? '';
    // 每次确认且有套 → 问一次（0 戴 / 1 不戴 / 2 今后都直接 / 3 今后都戴）
    if ((era.get(`cflag:${cid}:61`) || 0) === 0 && game.train.安全套) {
      if (!era_flag.assiplay) {
        era.print('要戴套吗？');
        era.printButton('- 戴', 0);
        era.printButton('- 不戴', 1);
      } else {
        era.print('让使用安全套吗？');
        era.printButton('- 使用', 0);
        era.printButton('- 不使用', 1);
      }
      era.printButton('- 今后都直接来，来个痛快', 2);
      era.printButton('- 今后都戴套', 3);
      const result = await era.input();
      if (result === 0) {
        game.train.安全套 -= 1;
        if (!era_flag.assiplay) {
          era.print(`${player_name}戴着套。`);
          chara(cid).event.主人避孕套 = 1; // （属主 event，走门面）
        } else {
          era.print(`让${player_name}戴着套。`);
          era.set(`tequip:${cid}:36`, 1);
        }
        return 1;
      }
      if (result === 1) {
        return 1;
      }
      if (result === 2) {
        era.print(`今后和${name_of(cid)}做都是直接来。`);
        era.set(`cflag:${cid}:61`, 2);
        continue; // RESTART
      }
      if (result === 3) {
        era.print('今后有套就用。');
        era.set(`cflag:${cid}:61`, 1);
        continue; // RESTART
      }
      // CASEELSE GOTO（:95）：白名单外输入到不了游戏（头注）
    }
    // 设定为有就用
    if ((era.get(`cflag:${cid}:61`) || 0) === 1) {
      if (game.train.安全套 > 0) {
        game.train.安全套 -= 1; // 有 → 用
        if (!era_flag.assiplay) {
          era.print(`${player_name}戴着套。`);
          chara(cid).event.主人避孕套 = 1;
        } else {
          era.print(`让${player_name}戴着套。`);
          era.set(`tequip:${cid}:36`, 1);
        }
        return 1;
      }
      // 没套：主人技巧 Lv5 以上才问（魔王笨一点就直接来——:115 原注）
      if (Math.floor(era.get(`abl:${MASTER}:12`) || 0) > 4) {
        // PRINTFORM 尾接 PRINTFORML 拼一行（头注）
        era.print(
          `没有安全套，直接来。${era_flag.assiplay ? '让吗？' : '来吗？'}`,
        );
        era.printButton('- 好的(下次也继续确认)', 0);
        era.printButton('- 好的(今后都直接来)', 1);
        era.printButton('- 不要', 2);
        const result = await era.input();
        if (result === 0) {
          return 1;
        }
        if (result === 1) {
          era.print(`今后对${name_of(cid)}不再确认。`);
          era.set(`cflag:${cid}:61`, 2);
          return 1;
        }
        if (result === 2) {
          return 0;
        }
        // CASEELSE（:136）：白名单外输入到不了游戏（头注）
      } else {
        era.print('因为没有安全套所以直接插入。');
        return 1;
      }
    }
    return 1; // 全模式拾遗（原文为注释态的兜底 RETURN）
  }
}

/**
 * @CONFIRM_CONDOM2（:165-183）：COM65「逆侵犯助手」的对象侧用套确认。
 * 对象（TARGET）有男性器（121/122）且未戴（TEQUIP:37）且有套且主人设定
 * 非「不用」时问一次；选「用」消耗一枚并给对象戴上。
 * @returns {Promise<number>} 1（恒继续——:183 的 RETURN 1 是唯一出口）
 */
async function confirm_condom2() {
  const cid = era_flag.target;
  for (;;) {
    if (
      (era.get(`tequip:${cid}:37`) || 0) === 0 &&
      game.train.安全套 &&
      (era.get(`talent:${cid}:121`) ||
        0 ||
        era.get(`talent:${cid}:122`) ||
        0) &&
      (era.get(`cflag:${MASTER}:61`) || 0) !== 2
    ) {
      // （主人的 CFLAG:61——注意是 MASTER 行不是 TARGET 行）
      era.print(`${name_of(cid)}使用安全套吗？`);
      era.printButton('- 用', 0);
      era.printButton('- 这次直接来', 1);
      const result = await era.input();
      if (result === 0) {
        era.print(`${name_of(cid)}戴着套`);
        game.train.安全套 -= 1;
        era.set(`tequip:${cid}:37`, 1);
      } else if (result === 1) {
        era.set(`cflag:${MASTER}:61`, 2);
      }
      // ELSEIF RESULT != 1 → GOTO（:178）：白名单外输入到不了游戏（头注）
    }
    return 1;
  }
}

/** %SAVESTR:x% 的名字承载（#5 决议：无 savestr 通道，读 callname） */
function name_of(cid) {
  return era.get(`callname:${cid}:-1`) ?? '';
}

module.exports = { condom_settings, confirm_condom, confirm_condom2 };
