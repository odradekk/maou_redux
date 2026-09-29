/**
 * @file 回合结束事件 EVENTTURNEND 的 #PRI 档定义（issue #114 真身；#44 曾以
 * 壳承载调教收尾的出口；#401 补齐体外调用）。
 *
 * EVENTTURNEND 有三处定义（#6 的论证样本），本文件是第一处：
 *   - #PRI（本文件）：时段推进 TIME 0→1→0、TIME==1 时的日推进与日程事件；
 *   - 普通档（回合结算本体：HP/装备回复、队伍设定、迷宫处理，尾部转场 SHOP）
 *     ——ere/system/turnend-settle.js；
 *   - #LATER（空）——ere/event/event-turnend-later.js。
 * 三者在同一条链上先后执行（#6 语义：BEGIN 只暂存跳转、链继续，最后的
 * BEGIN 胜出；两个出口同为 SHOP，覆盖不产生差异）。
 *
 * `auto_buying` 与 `debug_check` 的宿主在本文件，函数体落在本模块尾部并
 * 导出（可单独驱动、可测）。
 *
 * 移植说明：
 *   - 两处 FOR TARGET 循环以 TARGET 为循环变量、被调函数隐式读它；ere
 *     侧指针不隐式传（#5 决议第六条），循环按角色 ID 显式进行（era.
 *     getAddedCharacters()，对应 0..CHARANUM-1 的已加入序号全体），
 *     循环体内显式写回 `era_flag.target`——FOR 就是写全局 TARGET，
 *     不写回会让全部 TARGET 相关的妊娠判定读到上个角色的残留。
 *   - 死亡删除段被注释掉，保持不实现（照原样保持注释状态）。
 *   - `debug_check` 两段 DO 的 `LOCAL:5` 是**同一个局部量**，
 *     第二段的 5000 次预算接着第一段算——共用一个计数器（`attempts`），
 *     不拆成两个。
 *   - `debug_check` 的两处有意偏离（都是旧实现自带的缺陷，详见各自函数
 *     注释）：删除后的 FLAG:1/FLAG:2 重排补偿段不移植（同
 *     dungeon-party.js 的 party_char_del 先例）；第二段爆炸的「放弃搜索」
 *     分支补上退出（旧实现是空体，会让 DO 循环永不终止）。
 */

const era = require('#/era-electron');
const { on, TIER } = require('#/system/event/registry');
const { begin, STATE } = require('#/system/flow/begin-signal');
const { check_sellassiable } = require('#/system/stronghold/sale');
const { check_specialskil } = require('#/event/get-specialtalent');
const { run_event_nextday } = require('#/event/event-nextday');
const { run_event_nextmonth } = require('#/event/event-nextmonth');
// ENTER_ENEMY 经模块对象调用（不解构）：#171 的夹具隔离开关
// （era-fixture.js 的 disable_enter_enemy，#168 结论 4）就地替换本模块的
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
 * `RAND:CHARANUM` 的 ere 等价物：从在场名单里随机取一个角色。
 * #21 扁平化下角色号 = 预设号且稀疏（0 主人 / 1-16 勇者位 / 17-40 特殊位 /
 * 1000+ 子代），`RAND:CHARANUM` 那种「序号取值范围」不再等于「在场角色」，
 * 等价物是名单的均匀抽样。
 *
 * @param {number[]} added 在场角色号（调用方传入，避免循环内重取）
 * @param {(n: number) => number} rand 随机源
 * @returns {number} 抽中的角色号
 */
function random_chara(added, rand) {
  return added[rand(added.length)];
}

/**
 * 把角色从场上抹掉，并修好两处指向它的引用。
 *
 * 三段爆炸事件把同一段步骤逐字抄了三遍（宝库受害者的清理、
 * 暴走奴隶本人的清理、陪葬近邻的清理）——这里合并成
 * 一处实现；每一步在函数内逐条标注。
 *
 * **登録番号の前移補償段不移植**（
 * `SIF FLAG:1 > <被删号> THEN FLAG:1 -= 1`）：它依赖删除后注册号前移，
 * 而 #21 扁平化下角色号 = 预设号、removeCharacter 不重排——照原样保留会把活引用
 * 改写成另一个角色的号（文件头偏离一）。`== <被删号> → -1` 那两行不是补偿、
 * 是作废，保留。
 *
 * @param {number} cid 被抹掉的角色号
 * @returns {void}
 */
function erase_chara(cid) {
  // 前回の調教対象だった場合はフラグを空に
  if (game.event.上次调教对象 === cid) game.event.上次调教对象 = -1;
  // 前回の助手だった場合も同様
  if (game.event.上次助手 === cid) game.event.上次助手 = -1;
  // TARGET / ASSI 跟着前回值走
  era_flag.target = game.event.上次调教对象;
  era_flag.assi = game.event.上次助手;
  party_char_del(cid); // 队伍与据点引用清理
  era.removeCharacter(cid); // 除名
  name_reset(); // 名字表重建
}

/**
 * auto_buying：回合结束时按开关位自动购入三类道具。
 *
 * 触发位 FLAG:34 的位语义来自旗标文档
 * （&1 润滑液 / &2 ビデオテープ / &4 コンドーム / &8 コンドーム10個，该行自带
 * 「未稼働」标注）：**代码里没有任何写入点**，也没有设置项，
 * FLAG:34 恒 0——本函数同样空转，按原样实现等开局设置票接入。
 *
 * 两处与道具表/文档的字面差异照写：位 `&4`（单个安全套）在旗标文档里
 * 列了、但本函数没有对应分支（只有 `&8` 的十连买）；`ITEM:28` 的注释写
 * 「ビデオテープ」而 yml/Item.yml 的 id 28 叫「水晶球魔力源」——道具表是
 * 权威，注释是旧稿。
 *
 * @returns {Promise<number>} 恒 0
 */
async function auto_buying() {
  const flags = era.get('flag:34') || 0;

  // 润滑液（ITEM:25，200 点，最多一个）
  if ((flags & 1) !== 0 && era_flag.money >= 200 && game.train.润滑液 === 0) {
    game.train.润滑液 += 1;
    era_flag.money -= 200;
    era_exflag.legit_money -= 200;
  }

  // 水晶球魔力源（ITEM:28，500 点，最多一个）——前置是「已持有
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

  // 安全套（ITEM:24，100 点，最多存到 10）——REPEAT 10 逐个买，
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
 * debug_check：反作弊检查与三段「爆炸」事件。
 *
 * 调用点是 `SIF !反作弊`——反作弊是 MOD 追加的 SAVEDATA 开关
 * （魔改使用的自定义全局变量），#547 起落 modsave:1（era_modsave.anti_cheat）：
 * 新档默认 0 = 每回合执行，设置页 [30] 切 1 后跳过（OFF = 可开修改）。它
 * **不是**无副作用的检查：三段事件都会删角色、清钱，其中第三段直接 GAMEOVER。
 *
 * 三道前置的语义（旗标文档）：
 *   - `EX_FLAG:4444` = 非作弊资金。开局不变量 `MONEY == 4444 + 8766`
 *     （10000 = 1234 + 8766）
 *     ——同一份不变量在结局追加数据处也用它判「钱多得不正常」。
 *     这条不变量是本函数实现才真正可观察的：播种随首个消费者而来，
 *     见 ere/event/event-first.js。
 *   - `EX_FLAG:2801 % 100 < 10` = 一周目主线**未进结局档**（旗标文档
 *     「主线剧情的检定，显示等。使用 EX_FLAG:2801-2820」；结局追加数据把
 *     它推到 99）。三段事件都以它为前提。
 *   - `EX_FLAG:2802/2803/2804` 三段各自的触发位。
 *
 * 两处有意偏离（都是旧实现自带的缺陷，按原样保留会得到比旧实现更糟的结果）：
 *
 *   一、**删除后的 FLAG:1/FLAG:2 重排补偿段不移植**（`SIF FLAG:1 >
 *       LOCAL:1 THEN FLAG:1 -= 1`）。它依赖删号后注册号前移，而 ere
 *       扁平化（#21）下角色号 = 预设号、removeCharacter 不重排——按原样保留
 *       会把活引用改写成另一个角色的号。
 *       同 dungeon-party.js 的 party_char_del 重排段、event-chara-leave.js
 *       决议四，同一形式同判。`== 被删号 → -1` 那两行不是补偿、是作废，
 *       保留。
 *
 *   二、**第二段爆炸的「放弃搜索」分支补上退出**。旧实现的该段
 *       ELSEIF 是空体、不置 `LOCAL:1 = -1`，而 LOOP 条件是 `LOCAL:1 >= 0`
 *       且每轮都重新掷随机数（恒 >= 0）——一旦 5000 次都没抽到
 *       可炸的角色（例如除魔王外全场妊娠），循环永不终止。第一段爆炸
 *       的同款分支写了 `LOCAL:1 = -1`，可见这是复制粘贴事故，
 *       意图明确。**假死不是可移植的行为**，按意图补齐退出。
 *
 * @param {(n: number) => number} [rand] 随机源（缺省 Math.random）
 * @returns {Promise<number>} 恒 0
 */
async function debug_check(rand = default_rand) {
  // #DIM COUNTER / #DIM MINUS：函数局部量（不是持久状态），ere
  // 侧用 JS 局部。MINUS = MONEY - EX_FLAG:4444 算出后全函数
  // 无人读——死局部量，写它没有可观察效果，不实现。
  const added = era.getAddedCharacters();
  // 的 `LOCAL:5 ++`：两段 DO **共用同一个局部量**，所以第二段
  // 的 5000 次预算接着第一段算（同一回合里钱被改又有人暴走时，前一段试了
  // N 次、后一段只剩 5000-N 次）。分成两个计数器是常见误读，本移植照原样
  let attempts = 0;

  // 资金不变量被破坏即认定改过钱
  if (era_flag.money !== era_exflag.legit_money + 8766) {
    era_exflag.money_cheat_ending = 1;
  }

  // 全角色扫描（条件逐次覆盖，循环结束后留的是最后一个命中的
  // 角色）：等级 >= 5000 且状态位 0 的角色 → EX_FLAG:2803（失控奴隶号）
  for (const cid of added) {
    if (chara(cid).chara.等级 >= 5000 && chara(cid).invasion.状态 === 0) {
      era_exflag.runaway_slave_id = cid;
    }
  }

  // 魔王本人（角色 0）等级 >= 5000 → EX_FLAG:2804（魔王失控结局）
  if (chara(0).chara.等级 >= 5000) {
    era_exflag.maou_runaway_ending = 1;
  }

  // 三段共同的第一道前置：EX_FLAG:2801 % 100 < 10（未进结局档）
  const not_in_ending = era_exflag.first_run_deadline % 100 < 10;

  // —— 第一段：资金作弊 → 宝库被炸 ——
  if (era_exflag.money_cheat_ending === 1 && not_in_ending) {
    era.drawLine(); // 分隔线 + 首行
    await era.printAndWait('一些贪婪的魔物们对宝库里的财宝动起了歪念头。');
    await era.waitAnyKey(true); // FORCEWAIT
    for (const line of [
      '趁着夜深人静，几只无法克制金钱欲望的哥布林企图炸开宝库大门，偷取财宝。',
      '【这是魔王大人的财宝，我们这么干不好吧？】其中一只哥布林担心地说到。',
      '【魔王大人努力得来的我们不偷，这些神力变出来的，我们拿一点也没什么吧！】为首的哥布林充满不屑。',
      '无奈宝库的大门太过结实，一般的炸药无法撼动。',
      '贪婪的绿皮们只能不断地添加当量，结果炸药过多，发生了大爆炸。',
      '肇事的哥布林们和宝库里的财富都被炸得粉碎了……',
    ]) {
      await era.printAndWait(line);
    }
    await era.printAndWait(''); // 空行等待

    era_flag.money = 0;
    era_exflag.legit_money = era_flag.money - 8766; // （重建不变量：0 == -8766 + 8766）
    await era.printAndWait('资金清零了。');

    // 随机挑一个「状态位 0」的奴隶炸死（最多试 5000 次）
    let victim = 1; // LOCAL:1 = 1——只是进入 DO 的初值
    while (victim >= 0) {
      victim = random_chara(added, rand);
      attempts += 1;
      if (victim > 0 && attempts < 5000 && chara(victim).invasion.状态 === 0) {
        await era.printAndWait(
          `${chara_callname(victim)}的房间，刚好在宝库的正上方。`,
        );
        await era.printAndWait(
          '睡梦中的她没有任何防备，不幸地被猛烈的爆炸所淹没。',
        );
        await era.printAndWait(`${chara_callname(victim)}被炸死了。`);
        // 引用作废 + 队伍清理 + 除名 + 名字表重建（erase_chara）
        erase_chara(victim);
        victim = -1;
      } else if (attempts >= 5000) {
        victim = -1;
      }
    }
    era_exflag.money_cheat_ending = 0;
  }

  // —— 第二段：失控奴隶 → 自身的魔力爆炸 ——
  const runaway = era_exflag.runaway_slave_id;
  if (runaway > 0 && not_in_ending) {
    const runaway_name = chara_callname(runaway); // LOCALS
    era.drawLine(); // 分隔线 + 首行
    await era.printAndWait('整个地下城，其实就是一个巨大的封印，');
    await era.waitAnyKey(true); // FORCEWAIT
    for (const line of [
      '封印着魔王的力量，也封印着勇者的力量。',
      '加上日常生活和战斗所需的魔力，连同地底不断涌出的魔力，',
      '组成了地下城里错综复杂的魔力流动。',
      '几只特别强大的怪物和你本人，会聚集大量的魔力。',
      '但还是有一些魔力，从封印和法师们的掌控中流出，聚集到奴隶的身边。',
      '你能感觉得到，有一个奴隶，与众不同，身边的魔力在不断聚集着。',
      '因为她的力量已经强于你施加于她的封印，魔力之间相互碰撞，越来越不稳定了。',
      '',
      '魔力失控！发生大爆炸！',
    ]) {
      await era.printAndWait(line);
    }
    await era.printAndWait(`${runaway_name}被自己暴走的魔力炸得粉碎！`);

    // 同上（erase_chara）
    erase_chara(runaway);

    // 再挑一个「就在她旁边」的奴隶陪葬（同样最多试 5000 次）
    let neighbour = 1; // （循环初值同第一段；DO 体先赋值，初值不进条件）
    while (neighbour >= 0) {
      neighbour = random_chara(added, rand);
      attempts += 1; // LOCAL:5 ++（与第一段同一个局部量）
      if (
        neighbour > 0 &&
        neighbour !== runaway &&
        attempts < 5000 &&
        chara(neighbour).invasion.状态 === 0
      ) {
        await era.printAndWait(
          `${chara_callname(neighbour)}因为房间就在${runaway_name}的旁边，也被她暴走的魔力波及了。`,
        );
        await era.printAndWait(`${chara_callname(neighbour)}也被炸死了。`);
        // 同上（erase_chara）
        erase_chara(neighbour);
        neighbour = -1;
      } else if (attempts >= 5000) {
        neighbour = -1; // 此处为空体（不终止），按意图补齐（文件头偏离二）
      }
    }
    era_exflag.runaway_slave_id = 0;
  }

  // —— 第三段：魔王本人暴走 → GAMEOVER ——
  if (era_exflag.maou_runaway_ending === 1 && not_in_ending) {
    era.drawLine(); // 分隔线 + 首行
    await era.printAndWait('整个地下城，其实就是一个巨大的封印，');
    await era.waitAnyKey(true); // FORCEWAIT
    for (const line of [
      '封印着魔王的力量，也封印着勇者的力量。',
      '加上日常生活和战斗所需的魔力，连同地底不断涌出的魔力，',
      '组成了地下城里错综复杂的魔力流动。',
      '几只特别强大的怪物和你本人，会聚集大量的魔力。',
      '但最近，你感觉魔力在身边聚集越来越多，挥之不去。',
      '你能感觉得到，各式各样的魔力在体内不停汇聚着，相互冲击。',
      '好难受！！！',
      '终于有一天，你再也无法控制。感觉到一股暖流从身体喷涌而出！',
      '',
    ]) {
      await era.printAndWait(line);
    }
    era_exflag.maou_runaway_ending = 0;
    await era.printAndWait('你的魔力失控！发生大爆炸！');
    await era.printAndWait('巨大的威力，将你本人和整个地下城都化为齑粉。');
    await era.printAndWait(
      '四界都能感受到大地的颤抖，余波引起的海啸和地震，摧毁了无数地方。',
    );
    await era.printAndWait(
      '这次事件造成的伤亡，比你所有侵攻的造成的伤害还要多，世人将这次爆炸称为【大冲击】。',
    );
    await era.printAndWait('');
    era.print(
      '-------------------------------GAMEOVER---------------------------------',
    ); // 横幅行
    await era.input();
    era.quit(); // 退出
  }

  // 收尾 0 ——QUIT 是 throw 型（引擎 quit() 直接
  // 抛，event-ending.js 同款），其后不可达，故本行只在三段都没触发时走到
  return 0;
}

on(
  'EVENTTURNEND',
  async () => {
    // 全角色判定循环（LOCAL = TARGET 暂存 → FOR TARGET,0,CHARANUM →
    // 原样还原）。check_specialskil 只对非当前目标执行（SIF TARGET != LOCAL）
    const saved_target = era_flag.target;
    for (const cid of era.getAddedCharacters()) {
      era_flag.target = cid; // FOR TARGET 写全局 TARGET
      await check_sellassiable(cid);
      if (cid !== saved_target) {
        await check_specialskil(cid);
      }
      in_vagina_all(); // 妊娠判定（全角色）
      conception_check_all(); // 妊娠确定处理（全角色）
    }
    era_flag.target = saved_target; // TARGET = LOCAL

    // 完全死亡角色的删除段：整段被注释掉，保持不实现。

    // 休憩标志外す（flag:0 = 休息，EVENTSHOP 的休息置位、此处复位）
    era.set('flag:0', 0);

    // 午后（TIME==1）则进次日、午前（TIME==0）则进午后
    if (era_flag.time === 1) {
      // 妊判第二组（卖春/狂王兽奸/NTR 各两件）。这里也是
      // FOR TARGET,0,CHARANUM——六个被调函数内部自己 REPEAT 全角色、
      // 不看 TARGET，但 FOR 仍写全局 TARGET，按原样写回（#5 决议第六条）
      const local = era_flag.target;
      for (const cid of era.getAddedCharacters()) {
        era_flag.target = cid;
        in_vagina_extra();
        conception_check_extra();
        in_vagina_kyouou_to_t();
        conception_check_kyouou_to_t();
        in_vagina_ntrd_to_t();
        conception_check_ntrd_to_t();
      }
      era_flag.target = local; // TARGET = LOCAL

      // 日付変更時のイベント（日程推进，#115 真身；只此一处调用，
      // 先于 DAY:0 += 1 执行）
      await run_event_nextday();

      // 日推进：DAY:0 天数 +1；DAY:2 日 +1，超过 28 触发月替（
      // EVENTNEXTMONTH，#115）；DAY:3 星期 +1，日曜的次日回月曜
      era_flag.day_count += 1;
      era_flag.date += 1;
      if (era_flag.date > 28) {
        // 毎月 29 日以上になってたら月替わり処理（#115 真身）
        await run_event_nextmonth();
      }
      era_flag.weekday += 1;
      if (era_flag.weekday > 6) {
        // 日曜の次は月曜にする
        era_flag.weekday = 0;
      }

      // TIME = 0（次日午前）
      era_flag.time = 0;

      // 随机遇敌的第一件（参数 0；#171 起为真身 ere/event/enter-enemy.js）
      await enter_enemy_mod.enter_enemy(0);

      // 宣言数 SENGEN/SENGENMAX（EX_FLAG:9012 = 水晶球流行度，SENGEN
      // 一族：投放时累加、每日 SENGEN_VIDEO_DE 衰减）。#502 起真读——此前
      // 「EX_FLAG 表未实现、按 0 承接」的 TODO 已过时（门面早已备好）。
      // DAY 分档（>=100/>=300/>=500 各减一档，注意 IF 顺序：
      // DAY >= 500 的分支因 >= 100 先命中而不可达，按原样保留）
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
      // 上限钳制、按 DAY 追加遇敌、下限修正（EX_FLAG:9012 == 0 时
      // SENGEN 归 0，追加循环不发生）
      if (sengen >= sengenmax) {
        sengen = sengenmax;
      }
      if (day >= 100) {
        // enter_enemy（#171 起为真身）
        await enter_enemy_mod.enter_enemy(0);
      }
      if (day >= 300) {
        // enter_enemy
        await enter_enemy_mod.enter_enemy(0);
      }
      if (day >= 500) {
        // enter_enemy
        await enter_enemy_mod.enter_enemy(0);
      }
      if (sengen <= 0 && ex_flag_9012 > 0) {
        sengen = 1;
      }
      if (ex_flag_9012 === 0) {
        sengen = 0;
      }
      // IF SENGEN > 0：FOR EFFECT, 0, SENGEN 追加遇敌
      for (let effect = 0; effect < sengen; effect += 1) {
        // enter_enemy
        await enter_enemy_mod.enter_enemy(0);
      }
    } else {
      // 午前 → 午后
      era_flag.time = 1;
    }

    // 道具自动购入（AUTO_BUYING，真身在本文件；触发位 FLAG:34 无写入点、恒 0）
    await auto_buying();

    // 调教对象与助手清空
    era_flag.target = -1;
    era_flag.assi = -1;

    // 反作弊检查（`SIF !反作弊` → debug_check）。反作弊是 MOD
    // 追加的 SAVEDATA 开关（魔改使用的自定义全局变量），#547 落 modsave:1
    // （era_modsave.anti_cheat）：0 = 每回合执行（新档默认），1 = 跳过检查
    // （设置页 [30] 可切，OFF = 可开修改）
    if (!era_modsave.anti_cheat) {
      await debug_check();
    }

    // SHOP 转场 —— 无条件出口（链继续，普通档与 #LATER 随后执行，
    // #6 已证明的引擎行为）
    begin(STATE.SHOP);
  },
  TIER.PRI,
);

module.exports = {
  auto_buying,
  debug_check,
};
