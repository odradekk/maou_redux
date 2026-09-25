/**
 * @file 开局设置 @FIRST_SETTING（issue #463 起全量实现，除丽塔/卡拉隐藏分支）。
 *
 * 源: target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB  @FIRST_SETTING（:781-950）
 *
 * 原作是一个可反复重选的总菜单（$INPUT_LOOP，:787-941）：玩家可任意顺序
 * 多次修改各问答案，最后点 [100] 决定退出；未点开的问维持 Emuera 零值
 * 默认。ask_initial_slave/ask_dungeon_mode（#50/#181）已确立「强制逐问作答、
 * 不做总菜单」的偏离并经审查落地——本票新增的三问延续同一形态，不追加
 * 总菜单：各问单独用一个重问循环强制作答，first_setting() 按固定顺序问完
 * 全部五问。
 *
 * CFLAG:0:16 = -1（初吻对象）在原作四个魔王性别分支与函数入口（:784）写的
 * 都是同一个值——挪到 first_setting() 只写一次，语义不变（不引入新行为）。
 *
 * QUE2MK（:785）恒 RETURN 0（SYSTEM_MODEINT.ERB，本票一并落地）：
 * `IF !RESULT`（:786）恒真，:942 起以 `ELSEIF RESULT` 开头的假支路
 * （$INPUT_LOOP2）不可达，不移植。
 *
 * [7] 丽塔/卡拉隐藏开关（:841 起，原作连菜单文字都被注释掉）不移植：
 * 丽塔启动！/卡拉启动！是 MOD SAVEDATA 变量，本项目无 ere 存储（同
 * docs/stub-registry.md「开局设置票」行的既有登记）。
 */

const era = require('#/era-electron');
const { game } = require('#/facade/game');
const { chara } = require('#/facade/chara');

/**
 * @QUE2MK（SYSTEM_MODEINT.ERB:1-2）：恒定函数，非占位——真实翻译源码。
 */
function que2mk() {
  return 0;
}

/**
 * 「魔王性别」一问：@FIRST_SETTING RESULT == 0 子问（:855-889）的移植。
 *
 * 无重试豁免——原作本身无效输入即落回总菜单重绘、不作答；本切片强制作答
 * （同 ask_initial_slave 的既有偏离），故循环至有效值。
 *
 * @returns {Promise<number>} 玩家的选择（0 男性/1 女性/2 扶她/3 少年）
 */
async function ask_maou_sex() {
  for (;;) {
    era.print('魔王性别：');
    era.printButton('男性', 0);
    era.printButton('女性 [推荐]', 1);
    era.printButton('扶她 [推荐]', 2);
    era.printButton('少年', 3);
    const result = await era.input();
    if (result === 0) {
      chara(0).train.童贞 = 1;
      chara(0).chara.男人 = 1;
      chara(0).chara.扶她 = 0;
      chara(0).chara.娇小 = 0;
    } else if (result === 1) {
      chara(0).train.童贞 = 0;
      chara(0).chara.男人 = 0;
      chara(0).chara.扶她 = 0;
      chara(0).chara.娇小 = 0;
    } else if (result === 2) {
      chara(0).train.童贞 = 1;
      chara(0).chara.男人 = 0;
      chara(0).chara.扶她 = 1;
      chara(0).chara.娇小 = 0;
    } else if (result === 3) {
      chara(0).train.童贞 = 1;
      chara(0).chara.男人 = 1;
      chara(0).chara.扶她 = 0;
      chara(0).chara.娇小 = 1;
      chara(0).train.未熟 = 1;
    } else {
      continue;
    }
    return result;
  }
}

/**
 * 「肉棒尺寸」一问：@FIRST_SETTING RESULT == 1 子问（:891-898）的移植。
 * 仅当魔王性别 ≠ 女性时由 first_setting() 调用（原作 :800 IF MAOUSEX != 1）。
 *
 * @returns {Promise<number>} 玩家的选择（0-4），已写入
 *   chara(0).chara.阴茎的状态（TALENT:0:318，与 CONFIG.ERB 的
 *   config_penis_you_setting 共用门面）
 */
async function ask_penis_size() {
  for (;;) {
    era.print('肉棒尺寸：');
    era.printButton('普通阴茎', 0);
    era.printButton('巨根', 1);
    era.printButton('短小包茎', 2);
    era.printButton('包茎', 3);
    era.printButton('马阴茎', 4);
    const result = await era.input();
    if (result >= 0 && result <= 4) {
      chara(0).chara.阴茎的状态 = result;
      return result;
    }
  }
}

/**
 * 「狂王性别」一问：@FIRST_SETTING RESULT == 2 子问（:900-908）的移植。
 *
 * game.system.狂王性别（FLAG:500）属主 system——event 域裸写会被域检查
 * 判定为新增跨域裸写（tools/domain-ledger.mjs 已冻结、不接受新条目），
 * 走具名访问器；event-first.js:15 的既有裸写是登记在案的先例，不追加。
 *
 * @returns {Promise<number>} 玩家的选择（0 男性/1 女性/2 扶她）
 */
async function ask_kuangwang_sex() {
  // :902/:903 是两条 PRINTL（两行两 Row）；一次 print 一条，不用内部 \n 并成
  // 一行——那样显示行数虽同、引擎行计数只有 1（CONTEXT.md 的 Row 定义，#615）
  era.print('狂王是支配这个地区的领主'); // :902
  era.print('继承了曾经封印你的勇者的血统，打算把你再次封印'); // :903
  for (;;) {
    era.printButton('男性', 0);
    era.printButton('女性', 1);
    era.printButton('扶她 [默认]', 2);
    const result = await era.input();
    if (result >= 0 && result <= 2) {
      game.system.狂王性别 = result;
      return result;
    }
  }
}

/**
 * 「初期奴隶」一问：@FIRST_SETTING RESULT == 3 子问（:910-916）的移植。
 *
 * 原作里这一问是总菜单（:787-941）的一个子分支：无效输入不落笔、
 * 控制流回总菜单重绘。本切片没有总菜单，等价收敛为「重问本题」的循环；
 * 差异（原作可经 [100] 决定跳过此问、留下 FLAG:501 未置）已记录：跳过时
 * Emuera 零值与显式 0 同义，本切片强制作答，两值仍都可达。
 *
 * 选项渲染遵循按钮约定（PR #30）：正文不写 [编号] 前缀，引擎 showAcc 会
 * 自动拼 `[快捷键] 正文`；accelerator 沿用原作编号 0/1。
 *
 * @returns {Promise<number>} 玩家的选择（0 随机 / 1 村娘），已写入 flag:501
 */
async function ask_initial_slave() {
  // :912 PRINTL [0] 随机  [1] 村娘 —— 纯文本 + INPUT 改按钮（先例：
  // page-title.js 的 [0]/[1]）；ere 按钮独占一行，同行排版归 #9。原作无效
  // 输入经 GOTO INPUT_LOOP 回总菜单重绘，本切片等价为重渲染本题再问。
  for (;;) {
    era.print('初期奴隶：');
    era.printButton('随机', 0);
    era.printButton('村娘', 1);
    const result = await era.input();
    if (result === 0 || result === 1) {
      era.set('flag:501', result);
      return result;
    }
  }
}

/**
 * 「地下城模式」一问：@FIRST_SETTING RESULT == 4 子问（:918-924）的移植
 * （#181 H12 加进，#168 裁定 5）。
 *
 * 与 ask_initial_slave 同形态（总菜单未移植 → 重问循环收敛；[100] 跳过
 * 与显式 0 同义——FLAG:502 的 Emuera 零值就是「普通」模式）。原作菜单行
 * 带开发中标记（:833 `[4] 地下城模式 [锐意制作中]`），问句保持原文语义。
 *
 * @returns {Promise<number>} 玩家的选择（0 普通 / 1 2D），已写入 flag:502
 *   （dungeon 属主，走 game 门面）
 */
async function ask_dungeon_mode() {
  // :920 PRINTL [0] 普通  [1] 2D —— 按钮化同 ask_initial_slave
  for (;;) {
    era.print('地下城模式：');
    era.printButton('普通', 0);
    era.printButton('2D', 1);
    const result = await era.input();
    if (result === 0 || result === 1) {
      game.dungeon.迷宫模式 = result; // :924 FLAG:502 = RESULT
      return result;
    }
  }
}

/**
 * @FIRST_SETTING（:781-950）：整问答的顺序编排。原作是可反复重选的总
 * 菜单，本切片按固定顺序强制逐问作答一次（偏离依据见文件头）。
 */
async function first_setting() {
  chara(0).train.初吻对象 = -1; // :784，四个魔王性别分支写的都是同一个值
  que2mk(); // :785 CALL QUE2MK，恒 0——:786 IF !RESULT 恒真，:942 起不可达
  const maou_sex = await ask_maou_sex();
  if (maou_sex !== 1) {
    // :800 IF MAOUSEX != 1 —— 女性跳过肉棒尺寸一问
    await ask_penis_size();
  }
  await ask_kuangwang_sex();
  await ask_initial_slave();
  await ask_dungeon_mode();
}

module.exports = {
  que2mk,
  ask_maou_sex,
  ask_penis_size,
  ask_kuangwang_sex,
  ask_initial_slave,
  ask_dungeon_mode,
  first_setting,
};
