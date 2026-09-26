/**
 * @file 回合结束事件 @EVENTTURNEND 的 #PRI 档定义（issue #114 真身；#44 曾以
 * 壳承载调教闭环的出口；#401 补齐体外调用）。
 *
 * 源: target/ERB/EVENT/EVENT_TURNEND.ERB
 *     @EVENTTURNEND（:8-139 本体 + :140 BEGIN SHOP，#PRI 档）
 *     @AUTO_BUYING（:145-167）、@DEBUG_CHECK（:170-334，两者同在此文件）
 *
 * 原作 @EVENTTURNEND 有三处定义（#6 的论证样本），本文件是第一处：
 *   - #PRI（本文件）：时段推进 TIME 0→1→0、TIME==1 时的日推进与日程事件；
 *   - 普通档（SYSTEM ver1.0.3.ERB:234-760，回合结算本体：HP/装备回复、队伍
 *     设定、迷宫处理，尾部 :758 BEGIN SHOP）——ere/system/turnend-settle.js；
 *   - #LATER（EVENT/ENDING ver 1.0.1.ERB:1-3，空）——ere/event/event-turnend-later.js。
 * 三者在同一条链上先后执行（#6 语义：BEGIN 只暂存跳转、链继续，最后的
 * BEGIN 胜出；两个出口同为 SHOP，覆盖不产生差异）。
 *
 * `@AUTO_BUYING` 与 `@DEBUG_CHECK` 宿主在本文件（原作的同名文件），也是
 * #401 剩下的两个存根，函数体落在本模块尾部并导出（可单独驱动、可测）。
 *
 * 移植说明：
 *   - 原作两处 FOR TARGET 循环以 TARGET 为循环变量、被调函数隐式读它；ere
 *     侧指针不隐式传（#5 决议第六条），循环按角色 ID 显式进行（era.
 *     getAddedCharacters()，对应原作 0..CHARANUM-1 的已加入序号全体），
 *     循环体内显式写回 `era_flag.target`——原作 FOR 就是写全局 TARGET，
 *     不写回会让全部 TARGET 相关的妊娠判定读到上个角色的残留。
 *   - :31-51 原作注释掉的死亡删除段，1:1 不移植（照原样保持注释状态）。
 *   - `@DEBUG_CHECK` 两段 DO 的 `LOCAL:5` 是**同一个局部量**（:204/:276），
 *     第二段的 5000 次预算接着第一段算——照原作共用一个计数器（`attempts`），
 *     不拆成两个。
 *   - `@DEBUG_CHECK` 的两处有意偏离（都是原作缺陷，详见各自函数注释）：
 *     DELCHARA 后的 FLAG:1/FLAG:2 重排补偿段不移植（同 dungeon-party.js 的
 *     @PARTY_CHAR_DEL 先例）；第二段爆炸的「放弃搜索」分支补上退出
 *     （原作是空体，会让 DO 循环永不终止）。
 */

const era = require('#/era-electron');
const { on, TIER } = require('#/system/event/registry');
const { begin, STATE } = require('#/system/flow/begin-signal');
const { check_sellassiable } = require('#/system/stronghold/sale');
const { check_specialskil } = require('#/event/get-specialtalent');
const { run_event_nextday } = require('#/event/event-nextday');
const { run_event_nextmonth } = require('#/event/event-nextmonth');
// ENTER_ENEMY 经模块对象调用（不解构）：#171 的夹具隔离开关
// （era-fixture.js 的 disable_enter_enemy，#168 裁定 4）就地替换本模块的
// enter_enemy 导出，解构会把函数固化进本闭包、替换不可达——两个写法的
// 游戏行为完全等价，差别只在导出表的属性查找发生在调用时
const enter_enemy_mod = require('#/event/enter-enemy');
const { name_reset } = require('#/chara/char-make');
const { party_char_del } = require('#/dungeon/dungeon-party');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const era_modsave = require('#/era-utils/era-modsave');
const { chara_callname } = require('#/utils/callname-utils');
const {
  conception_check_all,
  conception_check_extra,
  conception_check_kyouou_to_t,
  conception_check_ntrd_to_t,
  in_vagina_all,
  in_vagina_extra,
  in_vagina_kyouou_to_t,
  in_vagina_ntrd_to_t,
} = require('#/event/event-pregnancy');

function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/**
 * 原作 `RAND:CHARANUM` 的 ere 等价物：从在场名单里随机取一个角色。
 * #21 扁平化下角色号 = 预设号且稀疏（0 主人 / 1-16 勇者位 / 17-40 特殊位 /
 * 1000+ 子代），`RAND:CHARANUM` 那种「序号取值范围」不再等于「在场角色」，
 * 等价物是名单的均匀抽样。
 *
 * @param {number[]} added 在场角色号（调用方传入，避免循环内重取）
 * @param {(n: number) => number} rand RAND:N 的等价物
 * @returns {number} 抽中的角色号
 */
function random_chara(added, rand) {
  return added[rand(added.length)];
}

/**
 * 把角色从场上抹掉，并修好两处指向它的引用。
 *
 * 原作三段爆炸事件把同一段步骤逐字抄了三遍（:209-228 宝库受害者的清理、
 * :252-271 暴走奴隶本人的清理、:280-299 陪葬近邻的清理）——这里收敛成
 * 一处落点；每一步的行号在函数内逐条标注。
 *
 * **登録番号の前移補償段不移植**（:215-219 / :258-262 / :286-290 的
 * `SIF FLAG:1 > <被删号> THEN FLAG:1 -= 1`）：它依赖 DELCHARA 后注册号前移，
 * 而 #21 扁平化下角色号 = 预设号、removeCharacter 不重排——照抄会把活引用
 * 改写成另一个角色的号（文件头偏离一）。`== <被删号> → -1` 那两行不是补偿、
 * 是作废，保留。
 *
 * @param {number} cid 被抹掉的角色号
 * @returns {void}
 */
function erase_chara(cid) {
  // :210-211 / :253-254 / :281-282 前回の調教対象だった場合はフラグを空に
  if (game.event.上次调教对象 === cid) game.event.上次调教对象 = -1;
  // :212-213 / :255-256 / :283-284 前回の助手だった場合も同様
  if (game.event.上次助手 === cid) game.event.上次助手 = -1;
  // :221-222 / :264-265 / :292-293 TARGET / ASSI 跟着前回值走
  era_flag.target = game.event.上次调教对象;
  era_flag.assi = game.event.上次助手;
  party_char_del(cid); // :224 / :267 / :295 队伍与据点引用清理
  era.removeCharacter(cid); // :226 / :269 / :297 DELCHARA
  name_reset(); // :228 / :271 / :299 名字表重建
}

/**
 * @AUTO_BUYING（:145-167）：回合结束时按开关位自动购入三类道具。
 *
 * 触发位 FLAG:34 的位语义来自原作文档
 * （target/資料_非必要無須解壓/eramaouフラグまとめ.txt:166：&1 润滑液 /
 * &2 ビデオテープ / &4 コンドーム / &8 コンドーム10個，该行自带「未稼働」
 * 标注）：**全库（ERB + CSV + 存档说明）没有任何写入点**，也没有设置项，
 * FLAG:34 恒 0——本函数在原版里同样空转，1:1 落地等开局设置票接线。
 *
 * 两处与道具表/文档的字面差异照抄原作：位 `&4`（单个安全套）在旗标文档里
 * 列了、但本函数没有对应分支（只有 `&8` 的十连买）；`ITEM:28` 的注释写
 * 「ビデオテープ」而 yml/Item.yml 的 id 28 叫「水晶球魔力源」——道具表是
 * 权威，注释是旧稿。
 *
 * @returns {Promise<number>} 原作的隐式 RETURN 0
 */
async function auto_buying() {
  const flags = era.get('flag:34') || 0;

  // :147-151 润滑液（ITEM:25，200 点，最多一个）
  if ((flags & 1) !== 0 && era_flag.money >= 200 && game.train.润滑液 === 0) {
    game.train.润滑液 += 1;
    era_flag.money -= 200;
    era_exflag.legit_money -= 200;
  }

  // :153-157 水晶球魔力源（ITEM:28，500 点，最多一个）——前置是「已持有
  // 水晶球（ITEM:6）」，该槽位没有门面字段（跨域读不受限，裸读）
  if (
    (flags & 2) !== 0 &&
    era_flag.money >= 500 &&
    (era.get('item:6') || 0) !== 0 &&
    game.train.水晶球魔力源 === 0
  ) {
    game.train.水晶球魔力源 += 1;
    era_flag.money -= 500;
    era_exflag.legit_money -= 500;
  }

  // :159-167 安全套（ITEM:24，100 点，最多存到 10）——REPEAT 10 逐个买，
  // 钱不够或到上限即停（不是一次买十个）
  if ((flags & 8) !== 0) {
    for (let i = 0; i < 10; i += 1) {
      if (era_flag.money >= 100 && game.train.安全套 < 10) {
        game.train.安全套 += 1;
        era_flag.money -= 100;
        era_exflag.legit_money -= 100;
      }
    }
  }
  return 0;
}

/**
 * @DEBUG_CHECK（:170-334）：反作弊检查与三段「爆炸」事件。
 *
 * 调用点 :137-138 是 `SIF !反作弊`——反作弊是 MOD 追加的 SAVEDATA 开关
 * （魔改新增/魔改使用.ERH:15），#547 起落 modsave:1（era_modsave.anti_cheat）：
 * 新档默认 0 = 每回合执行，设置页 [30] 切 1 后跳过（OFF = 可开修改）。它
 * **不是**无副作用的检查：三段事件都会删角色、清钱，其中第三段直接 GAMEOVER。
 *
 * 三道前置的语义（原作文档：資料_非必要無須解壓/eramaouフラグまとめ - 汉化人员.txt:34-35）：
 *   - `EX_FLAG:4444` = 非作弊资金。开局不变量 `MONEY == 4444 + 8766`
 *     （SYSTEM ver1.0.3.ERB:55-56 的 MONEY = 10000 与 EX_FLAG:4444 = 1234）
 *     ——同一份不变量在 EVENT/ENDINGDATA.ERB:46 也用它判「钱多得不正常」。
 *     这条不变量是本函数落地才真正可观察的：播种随首个消费者而来，
 *     见 ere/event/event-first.js。
 *   - `EX_FLAG:2801 % 100 < 10` = 一周目主线**未进结局档**（:303 的注释
 *     「主线剧情的检定，显示等。使用 EX_FLAG:2801-2820」；ENDINGDATA 把
 *     它推到 99）。三段事件都以它为前提。
 *   - `EX_FLAG:2802/2803/2804` 三段各自的触发位。
 *
 * 两处有意偏离原作（都是原作缺陷，1:1 复刻会得到比原作更糟的结果）：
 *
 *   一、**DELCHARA 后的 FLAG:1/FLAG:2 重排补偿段不移植**（:216-219 与
 *       :258-261 的 `SIF FLAG:1 > LOCAL:1 THEN FLAG:1 -= 1`）。它依赖
 *       删号后注册号前移，而 ere 扁平化（#21）下角色号 = 预设号、
 *       removeCharacter 不重排——照抄会把活引用改写成另一个角色的号。
 *       同 dungeon-party.js 的 @PARTY_CHAR_DEL 重排段、event-chara-leave.js
 *       决议四，同一形态同判。`== 被删号 → -1` 那两行不是补偿、是作废，
 *       保留。
 *
 *   二、**第二段爆炸的「放弃搜索」分支补上退出**（:303-305）。原作那段
 *       ELSEIF 是空体、不置 `LOCAL:1 = -1`，而 LOOP 条件是 `LOCAL:1 >= 0`
 *       且每轮都重新掷 `RAND:CHARANUM`（恒 >= 0）——一旦 5000 次都没抽到
 *       可炸的角色（例如除魔王外全场妊娠），循环永不终止。第一段爆炸
 *       （:230-231）的同款分支写了 `LOCAL:1 = -1`，可见这是复制粘贴事故，
 *       意图明确。**假死不是可移植的行为**，按意图补齐退出。
 *
 * @param {(n: number) => number} [rand] RAND:N 的随机源（缺省 Math.random）
 * @returns {Promise<number>} 原作的 RETURN 0
 */
async function debug_check(rand = default_rand) {
  // :171-172 #DIM COUNTER / #DIM MINUS：函数局部量（不是持久状态），ere
  // 侧用 JS 局部。:173 的 `MINUS = MONEY - EX_FLAG:4444` 算出后全函数
  // 无人读——原作的死局部量，写它没有可观察效果，不落地。
  const added = era.getAddedCharacters();
  // :204 / :276 的 `LOCAL:5 ++`：两段 DO **共用同一个局部量**，所以第二段
  // 的 5000 次预算接着第一段算（同一回合里钱被改又有人暴走时，前一段试了
  // N 次、后一段只剩 5000-N 次）。分成两个计数器是常见误读，本移植照原作
  // 共用一个
  let attempts = 0;

  // :174-175 资金不变量被破坏即认定改过钱
  if (era_flag.money !== era_exflag.legit_money + 8766) {
    era_exflag.money_cheat_ending = 1;
  }

  // :177-182 全角色扫描（SIF 逐次覆盖，循环结束后留的是最后一个命中的
  // 角色）：等级 >= 5000 且状态位 0 的角色 → EX_FLAG:2803（失控奴隶号）
  for (const cid of added) {
    if (chara(cid).chara.等级 >= 5000 && chara(cid).invasion.状态 === 0) {
      era_exflag.runaway_slave_id = cid;
    }
  }

  // :184-185 魔王本人（角色 0）等级 >= 5000 → EX_FLAG:2804（魔王失控结局）
  if (chara(0).chara.等级 >= 5000) {
    era_exflag.maou_runaway_ending = 1;
  }

  // 三段共同的第一道前置：EX_FLAG:2801 % 100 < 10（未进结局档）
  const not_in_ending = era_exflag.first_run_deadline % 100 < 10;

  // —— :187-235 第一段：资金作弊 → 宝库被炸 ——
  if (era_exflag.money_cheat_ending === 1 && not_in_ending) {
    era.drawLine(); // :188-189（DRAWLINE + 首行）
    await era.printAndWait('一些贪婪的魔物们对宝库里的财宝动起了歪念头。'); // :189
    await era.waitAnyKey(true); // :190 FORCEWAIT
    for (const line of [
      '趁着夜深人静，几只无法克制金钱欲望的哥布林企图炸开宝库大门，偷取财宝。', // :191
      '【这是魔王大人的财宝，我们这么干不好吧？】其中一只哥布林担心地说到。', // :192
      '【魔王大人努力得来的我们不偷，这些神力变出来的，我们拿一点也没什么吧！】为首的哥布林充满不屑。', // :193
      '无奈宝库的大门太过结实，一般的炸药无法撼动。', // :194
      '贪婪的绿皮们只能不断地添加当量，结果炸药过多，发生了大爆炸。', // :195
      '肇事的哥布林们和宝库里的财富都被炸得粉碎了……', // :196
    ]) {
      await era.printAndWait(line);
    }
    await era.printAndWait(''); // :197 PRINTFORMW（空行等待）

    era_flag.money = 0; // :198
    era_exflag.legit_money = era_flag.money - 8766; // :199（重建不变量：0 == -8766 + 8766）
    await era.printAndWait('资金清零了。'); // :200

    // :201-233 随机挑一个「状态位 0」的奴隶炸死（最多试 5000 次）
    let victim = 1; // :201 LOCAL:1 = 1——只是进入 DO 的初值
    while (victim >= 0) {
      victim = random_chara(added, rand); // :203 RAND:CHARANUM
      attempts += 1;
      if (victim > 0 && attempts < 5000 && chara(victim).invasion.状态 === 0) {
        await era.printAndWait(
          `${chara_callname(victim)}的房间，刚好在宝库的正上方。`,
        ); // :206
        await era.printAndWait(
          '睡梦中的她没有任何防备，不幸地被猛烈的爆炸所淹没。',
        ); // :207
        await era.printAndWait(`${chara_callname(victim)}被炸死了。`); // :208
        // :209-228 引用作废 + 队伍清理 + 除名 + 名字表重建（erase_chara）
        erase_chara(victim);
        victim = -1; // :229
      } else if (attempts >= 5000) {
        victim = -1; // :230-231
      }
    }
    era_exflag.money_cheat_ending = 0; // :234
  }

  // —— :237-308 第二段：失控奴隶 → 自身的魔力爆炸 ——
  const runaway = era_exflag.runaway_slave_id;
  if (runaway > 0 && not_in_ending) {
    const runaway_name = chara_callname(runaway); // :238 LOCALS
    era.drawLine(); // :239-240（DRAWLINE + 首行）
    await era.printAndWait('整个地下城，其实就是一个巨大的封印，'); // :240
    await era.waitAnyKey(true); // :241 FORCEWAIT
    for (const line of [
      '封印着魔王的力量，也封印着勇者的力量。', // :242
      '加上日常生活和战斗所需的魔力，连同地底不断涌出的魔力，', // :243
      '组成了地下城里错综复杂的魔力流动。', // :244
      '几只特别强大的怪物和你本人，会聚集大量的魔力。', // :245
      '但还是有一些魔力，从封印和法师们的掌控中流出，聚集到奴隶的身边。', // :246
      '你能感觉得到，有一个奴隶，与众不同，身边的魔力在不断聚集着。', // :247
      '因为她的力量已经强于你施加于她的封印，魔力之间相互碰撞，越来越不稳定了。', // :248
      '', // :249
      '魔力失控！发生大爆炸！', // :250
    ]) {
      await era.printAndWait(line);
    }
    await era.printAndWait(`${runaway_name}被自己暴走的魔力炸得粉碎！`); // :251

    // :252-271 同上（erase_chara）
    erase_chara(runaway);

    // :274-306 再挑一个「就在她旁边」的奴隶陪葬（同样最多试 5000 次）
    let neighbour = 1; // （循环初值同第一段；DO 体先赋值，初值不进判据）
    while (neighbour >= 0) {
      neighbour = random_chara(added, rand); // :275
      attempts += 1; // :276 LOCAL:5 ++（与第一段同一个局部量）
      if (
        neighbour > 0 &&
        neighbour !== runaway &&
        attempts < 5000 &&
        chara(neighbour).invasion.状态 === 0
      ) {
        await era.printAndWait(
          `${chara_callname(neighbour)}因为房间就在${runaway_name}的旁边，也被她暴走的魔力波及了。`,
        ); // :278
        await era.printAndWait(`${chara_callname(neighbour)}也被炸死了。`); // :279
        // :280-299 同上（erase_chara）
        erase_chara(neighbour);
        neighbour = -1; // :301
      } else if (attempts >= 5000) {
        neighbour = -1; // :303-305 原作此处为空体（不终止），按意图补齐（文件头偏离二）
      }
    }
    era_exflag.runaway_slave_id = 0; // :307
  }

  // —— :310-332 第三段：魔王本人暴走 → GAMEOVER ——
  if (era_exflag.maou_runaway_ending === 1 && not_in_ending) {
    era.drawLine(); // :311-312（DRAWLINE + 首行）
    await era.printAndWait('整个地下城，其实就是一个巨大的封印，'); // :312
    await era.waitAnyKey(true); // :313 FORCEWAIT
    for (const line of [
      '封印着魔王的力量，也封印着勇者的力量。', // :314
      '加上日常生活和战斗所需的魔力，连同地底不断涌出的魔力，', // :315
      '组成了地下城里错综复杂的魔力流动。', // :316
      '几只特别强大的怪物和你本人，会聚集大量的魔力。', // :317
      '但最近，你感觉魔力在身边聚集越来越多，挥之不去。', // :318
      '你能感觉得到，各式各样的魔力在体内不停汇聚着，相互冲击。', // :319
      '好难受！！！', // :320
      '终于有一天，你再也无法控制。感觉到一股暖流从身体喷涌而出！', // :321
      '', // :322
    ]) {
      await era.printAndWait(line);
    }
    era_exflag.maou_runaway_ending = 0; // :323
    await era.printAndWait('你的魔力失控！发生大爆炸！'); // :324
    await era.printAndWait('巨大的威力，将你本人和整个地下城都化为齑粉。'); // :325
    await era.printAndWait(
      '四界都能感受到大地的颤抖，余波引起的海啸和地震，摧毁了无数地方。',
    ); // :326
    await era.printAndWait(
      '这次事件造成的伤亡，比你所有侵攻的造成的伤害还要多，世人将这次爆炸称为【大冲击】。',
    ); // :327
    await era.printAndWait(''); // :328
    era.print(
      '-------------------------------GAMEOVER---------------------------------',
    ); // :329 PRINTL
    await era.input(); // :330 INPUT
    era.quit(); // :331 QUIT
  }

  // :330-334 的收尾 RETURN 0 ——:331 的 QUIT 是 throw 型（引擎 quit() 直接
  // 抛，event-ending.js 同款），其后不可达，故本行只在三段都没触发时走到
  return 0;
}

on(
  'EVENTTURNEND',
  async () => {
    // :13-27 全角色判定循环（LOCAL = TARGET 暂存 → FOR TARGET,0,CHARANUM →
    // 原样还原）。CHECK_SPECIALSKIL 只对非当前目标执行（原行 19 的 SIF TARGET != LOCAL）
    const saved_target = era_flag.target;
    for (const cid of era.getAddedCharacters()) {
      era_flag.target = cid; // :14 FOR TARGET 写全局 TARGET
      await check_sellassiable(cid);
      if (cid !== saved_target) {
        await check_specialskil(cid); // :19-20
      }
      in_vagina_all(); // :23 妊娠判定（全角色）
      conception_check_all(); // :26 妊娠确定处理（全角色）
    }
    era_flag.target = saved_target; // :29 TARGET = LOCAL

    // :31-51 完全死亡角色的删除段：原作整段注释掉，1:1 保持不移植。

    // :54 休憩标志外す（flag:0 = 休息，@EVENTSHOP 的 199 休息置位、此处复位）
    era.set('flag:0', 0);

    // :57 午后（TIME==1）则进次日、午前（TIME==0）则进午后
    if (era_flag.time === 1) {
      // :61-74 妊判第二组（卖春/狂王兽奸/NTR 各两件）。原作这里也是
      // FOR TARGET,0,CHARANUM——六个被调函数内部自己 REPEAT 全角色、
      // 不看 TARGET，但 FOR 仍写全局 TARGET，1:1 写回（#5 决议第六条）
      const local = era_flag.target;
      for (const cid of era.getAddedCharacters()) {
        era_flag.target = cid;
        in_vagina_extra(); // :64
        conception_check_extra(); // :65
        in_vagina_kyouou_to_t(); // :68
        conception_check_kyouou_to_t(); // :69
        in_vagina_ntrd_to_t(); // :70
        conception_check_ntrd_to_t(); // :71
      }
      era_flag.target = local; // :74 TARGET = LOCAL

      // :77 日付変更時のイベント（日程推进，#115 真身；全库唯此一处调用，
      // 先于 :79 的 DAY:0 += 1 执行）
      await run_event_nextday();

      // :79-91 日推进：DAY:0 天数 +1；DAY:2 日 +1，超过 28 触发月替（
      // EVENT_NEXTMONTH，#115）；DAY:3 星期 +1，日曜（6）的次日回月曜（0）
      era_flag.day_count += 1;
      era_flag.date += 1;
      if (era_flag.date > 28) {
        // 毎月 29 日以上になってたら月替わり処理（行 81-84，#115 真身）
        await run_event_nextmonth();
      }
      era_flag.weekday += 1;
      if (era_flag.weekday > 6) {
        // 日曜の次は月曜にする（行 86-89）
        era_flag.weekday = 0;
      }

      // TIME = 0（次日午前，行 91）
      era_flag.time = 0;

      // :93 随机遇敌的第一件（参数 0；#171 起为真身 ere/event/enter-enemy.js）
      await enter_enemy_mod.enter_enemy(0);

      // :95-107 宣言数 SENGEN/SENGENMAX（EX_FLAG:9012 = 水晶球流行度，SENGEN
      // 一族：投放时累加、每日 SENGEN_VIDEO_DE 衰减）。#502 起真读——此前
      // 「EX_FLAG 表未落地、按 0 承接」的 TODO 已过时（门面早已备好）。
      // DAY 分档依原作（>=100/>=300/>=500 各减一档，注意原作 IF 顺序：
      // DAY >= 500 的分支因 >= 100 先命中而不可达，1:1 照搬）
      const ex_flag_9012 = era_exflag.crystal_ball_popularity;
      const day = era_flag.day_count;
      let sengen;
      let sengenmax;
      if (day >= 100) {
        sengen = ex_flag_9012 - 2;
        sengenmax = 12 - 2;
      } else if (day >= 300) {
        sengen = ex_flag_9012 - 3;
        sengenmax = 12 - 3;
      } else if (day >= 500) {
        sengen = ex_flag_9012 - 4;
        sengenmax = 12 - 4;
      } else {
        sengen = ex_flag_9012 - 2;
        sengenmax = 12 - 1;
      }
      // :108-120 上限钳制、按 DAY 追加遇敌、下限修正（EX_FLAG:9012 == 0 时
      // SENGEN 归 0，追加循环不发生）
      if (sengen >= sengenmax) {
        sengen = sengenmax;
      }
      if (day >= 100) {
        // :112 CALL ENTER_ENEMY（#171 起为真身）
        await enter_enemy_mod.enter_enemy(0);
      }
      if (day >= 300) {
        // :114 CALL ENTER_ENEMY
        await enter_enemy_mod.enter_enemy(0);
      }
      if (day >= 500) {
        // :116 CALL ENTER_ENEMY
        await enter_enemy_mod.enter_enemy(0);
      }
      if (sengen <= 0 && ex_flag_9012 > 0) {
        sengen = 1;
      }
      if (ex_flag_9012 === 0) {
        sengen = 0;
      }
      // :121-125 IF SENGEN > 0：FOR EFFECT, 0, SENGEN 追加遇敌
      for (let effect = 0; effect < sengen; effect += 1) {
        // :123 CALL ENTER_ENEMY
        await enter_enemy_mod.enter_enemy(0);
      }
    } else {
      // :126-128 午前 → 午后
      era_flag.time = 1;
    }

    // :131 道具自动购入（AUTO_BUYING，真身在本文件；触发位 FLAG:34 无写入点、恒 0）
    await auto_buying();

    // :134-135 调教对象与助手清空
    era_flag.target = -1;
    era_flag.assi = -1;

    // :137-138 反作弊检查（`SIF !反作弊` → CALL DEBUG_CHECK）。反作弊是 MOD
    // 追加的 SAVEDATA 开关（魔改使用.ERH:15），#547 落 modsave:1
    // （era_modsave.anti_cheat）：0 = 每回合执行（新档默认），1 = 跳过检查
    // （设置页 [30] 可切，OFF = 可开修改）
    if (!era_modsave.anti_cheat) {
      await debug_check();
    }

    // :140 BEGIN SHOP —— 无条件出口（链继续，普通档与 #LATER 随后执行，
    // #6 用 emuera.log 证明的原作行为）
    begin(STATE.SHOP);
  },
  TIER.PRI,
);

module.exports = {
  auto_buying,
  debug_check,
};
