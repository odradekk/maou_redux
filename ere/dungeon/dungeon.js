/**
 * @file 迷宫主循环（issue #172，阶段 3 H3）：@DUNGEON 与三个附属函数。
 *
 * 源: target/ERB/迷宮/DUNGEON.ERB  @DUNGEON（:3-853，主循环）、
 *       @CHECK_STATUS（:856-1035，队伍伤势判定）、@GET_JUNK_ITEM（:1041-1073，
 *       换金财物）、@GET_DOWN_ENEMY（:1076-1091，勇者陷落结算）
 *
 * 原作局部变量语义（DUNGEON.ERB :14-22 注释逐条照抄——后续七张 H 票的
 * 共同词汇表）：
 *   ARG:0 / A = 攻略中的角色（队长）     D:20 = 侵攻度    D:1 = 1 时帰還
 *   D:4 = 陷阱试行次数                   D:0  = 欠番（有意跳过，别复用）
 *   TURN = 侵攻计数器   SIDEA / SIDEB = 同伴 A / B   TURNEND = 有人战败而中断
 *   FLOOR = 现在阶层    NO_BATTLE = 不发生战斗       ROOM / MAPC
 *
 * `MAPC` 决定演出用词：默认「地下城」，CFLAG:(ARG:0):1 == 12（战役）时是
 * 「迷宮」（:23-25）。
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - **SAVESTR 无引擎通道**（#171 引擎实测钉下，钉子在
 *     test/static-table-coverage.test.js「savestr 族不存在」用例）：三段
 *     `savestr:0:1` 完全静默丢弃，照抄的后果是 88 处演出文本全部空白。
 *     名字承载一律走 `callname:${id}:-1`（#5 决议）；
 *   - EQUIP_CHECK / EQUIP_SELECT 用 #174（H5）真身 ere/system/equip/——
 *     工单票面把它俩列在存根表，出票后 H5 已先合并，以文件实际内容为准；
 *   - ere 无全局 RAND 序列（#117），随机经注入的 rand 掷出（缺省
 *     Math.random，测试注入定值序——enter-enemy.js 先例）；
 *   - 原作全局 A / TARGET / W:8 / RESULT 的换手在 ere 侧显式传参（#5 决议
 *     第六条）：A → 局部 a，W:8 → equip_check 第二参，RESULT → 返回值；
 *   - :157 `X *= 2`（迎击臂的侵攻度累加处）：X 是原作全局、全库无初始化
 *     （恒 0），*= 2 无副作用——死代码，注释保留不落变量；
 *   - :569 `CALL GET_DOWN_ENEMY, B`：B 由 @DUNGEON_BATTLE2_PARTY 设置
 *     （败者号）；H6（#175）起经返回值 { result, loser } 显式传出
 *     （#5 决议第六条）；
 *   - 跨域写走门面（#71/#72）：CFLAG:1（invasion.状态）、502
 *     （event.侵攻度）、506/507（invasion.新人/回城标志）、521
 *     （invasion.存档点，#172 补名）、50（event.贞操带钥匙，#172 补名）、
 *     151（chara.善恶值）；MONEY → era_flag.money、EX_FLAG:4444 →
 *     era_exflag.legit_money。dungeon 属主的 501/503/505/508/509/514/534/
 *     580/581 与 exp:80、base:1 为域内写，裸寻址即合法（#70）；
 *   - BARL（:161 侵攻度条形图）无 era API 通道，在 FLAG:5 & 32 渲染守卫内
 *     以注释标记跳过（数值行为不受影响）；
 *   - 原作 PRINT/PRINTFORM 不换行、PRINTL/PRINTFORML 换行，同一显示行的
 *     拼接归并为一次 era.print（引擎 print 每调用一行）；PRINTW/PRINTFORMW
 *     是 print + 读键。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { chara } = require('#/facade/chara');
const { stub_line, stub_line_wait } = require('#/utils/stub-line');
const { equip_check } = require('#/system/equip/equip-check');
const { equip_select } = require('#/system/equip/equip-select');
const { party_del } = require('#/dungeon/dungeon-party');
const { ending_2 } = require('#/event/event-ending');
const dungeon_bitch_mod = require('#/kojo/kojo-dungeon-bitch');
// H6（#175）战斗真身：dungeon-battle / dungeon-battle2 对 dungeon.js 的
// karma / add_ex_item / use_ex_item 存根是函数内延迟 require（避开循环
// 初始化），本文件对它们是顶层引用——两侧只在一处顶层引用，无环。
// H7（#176）陷阱真身在 ere/dungeon/dungeon-trap.js（其对 dungeon.js 的
// KARMA 存根是延迟 require，同款防环；DARK_JUEL :1344 唯一调用点）
const battle_mod = require('#/dungeon/dungeon-battle');
const battle2_mod = require('#/dungeon/dungeon-battle2');
const trap_mod = require('#/dungeon/dungeon-trap');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。EQUIP_CHECK/EQUIP_SELECT 不在此列
 * （#174 真身，文件头）；DUNGEON_TRAP 不在此列（#176 真身
 * ere/dungeon/dungeon-trap.js）。
 */
const STUBBED_CALLS = [
  'DUNGEON_ROOM',
  'DUNGEON_TOWN',
  'KARMA',
  'ADD_EX_ITEM',
  'USE_EX_ITEM',
  'CAMPAIGN_QUEST',
  'CAMPAIGN_ENDING',
  'CAMPAIGN_ROOM',
  'BEDROOM_BATTLE_MALE',
];

/** 名字承载（#5 决议；savestr 通道不存在，文件头） */
function name_of(cid) {
  return era.get(`callname:${cid}:-1`) ?? '';
}

/** 原作 RAND:N（0..N-1）的缺省实现 */
function default_rand(n) {
  return Math.floor(Math.random() * n);
}

// —— 存根层（工单 #172 十组中余下的 + 附属；DUNGEON_BITCH 已随 #184 换真身——
//    真身在 ere/kojo/kojo-dungeon-bitch.js，:718 经模块对象调用；归属见 docs/stub-registry.md）——

// H6（#175）起三处战斗存根换成真身：DUNGEON_SPY / DUNGEON_PARTY_BATTLE /
// DUNGEON_BATTLE2_PARTY 见 ere/dungeon/dungeon-battle2.js 与
// ere/dungeon/dungeon-battle.js（调用点经模块对象引用，对比测试可替换）。
// H7（#176）起 DUNGEON_TRAP 存根换成真身：ere/dungeon/dungeon-trap.js
// （调用点经模块对象引用 trap_mod，同款可替换）。

/**
 * @DUNGEON_ROOM 存根（迷宮/DUNGEON_ROOM.ERB；#177 H8）：房间设施效果。
 * RESULT：1 = 该房间不发生战斗（NO_BATTLE 累加）——存根返回 0（战斗可能
 * 发生）是中性值，侵攻度与层数的推进不受存根影响（工单验收线）。
 * @param {number} cid 受设施效果者（原作 A）
 * @returns {Promise<number>} 原作 RESULT（存根恒 0）
 */
async function dungeon_room() {
  await stub_line_wait('DUNGEON_ROOM', '房间设施', '随 #177（H8）房间票');
  return 0;
}

/**
 * @DUNGEON_TOWN 存根（迷宮/DUNGEON_TOWN.ERB；#178 H9）：勇者撤到迷宫外
 * 时的城镇事件（补给 / 任务 / 娼馆，CFLAG:580 所持金的消费端）。
 * @param {number} cid 队长（原作 ARG:0）
 * @returns {Promise<number>} 原作 RETURN（存根恒 0）
 */
async function dungeon_town() {
  await stub_line_wait('DUNGEON_TOWN', '城镇事件', '随 #178（H9）城镇票');
  return 0;
}

/**
 * @KARMA 存根（キャラ関数/CHAR_ST.ERB:71；善恶值票，阶段 5）：善恶值
 * 增减。存根不改善恶值（ENTER_ENEMY 的 CM_KIND 值域 [0,199] 恒非负，
 * 本票全部善恶阈值分支结构保留、不达）。
 * @param {number} cid 角色
 * @param {number} delta 增减量
 * @returns {void} 原作无 RESULT 消费
 */
function karma() {
  stub_line('KARMA', '善恶值增减', '随善恶值票（阶段 5）');
}

/**
 * @ADD_EX_ITEM 存根（其他/USE_EX_ITEM.ERB:127；EX 道具票，阶段 5）：战利
 * 品 / 补给入手。RESULT == 0 时上层打「没找到什么有用的」——存根返回 0
 * 与之自洽。
 * @param {number} kind 入手种类（原作 ARG:0：-1 踏破战利品 / -3 补给购买）
 * @param {number} cid 角色（原作 ARG:1）
 * @param {number} flag 购买标志（原作 ARG:2）
 * @returns {Promise<number>} 原作 RESULT（存根恒 0 = 没找到）
 */
async function add_ex_item() {
  await stub_line_wait('ADD_EX_ITEM', '道具入手', '随 EX 道具票（阶段 5）');
  return 0;
}

/**
 * @USE_EX_ITEM 存根（其他/USE_EX_ITEM.ERB；EX 道具票，阶段 5）：道具使用。
 * 原作读全局 A（使用者），存根签名按此预留。
 * @param {string} timing 使用时机（原作字符串实参，如 "战斗后"）
 * @param {number} cid 使用者（原作 A）
 * @returns {Promise<number>} 原作 RETURN（存根恒 0）
 */
async function use_ex_item() {
  await stub_line_wait('USE_EX_ITEM', '道具使用', '随 EX 道具票（阶段 5）');
  return 0;
}

/**
 * @CAMPAIGN_QUEST 存根（侵略/CAMPAIGN/；战役票，阶段 5）：战役中的踏破
 * 判定。RESULT：1 = 攻略成功 / 0 = 失败被赶回。FLAG:400 无写入路径恒 0，
 * 本票不达；返回 1（成功）贴近「不改变推进」。
 * @param {number} cid 队长（原作 ARG:0）
 * @returns {Promise<number>} RESULT（存根恒 1）
 */
async function campaign_quest() {
  await stub_line_wait('CAMPAIGN_QUEST', '战役踏破判定', '随战役票（阶段 5）');
  return 1;
}

/**
 * @CAMPAIGN_ENDING 存根（侵略/CAMPAIGN/；战役票，阶段 5）：战役终局演出。
 * @param {number} cid 队长（原作 ARG:0）
 * @returns {Promise<number>} 原作 RETURN（存根恒 0）
 */
async function campaign_ending() {
  await stub_line_wait('CAMPAIGN_ENDING', '战役终局', '随战役票（阶段 5）');
  return 0;
}

/**
 * @CAMPAIGN_ROOM 存根（侵略/CAMPAIGN/；战役票，阶段 5）：战役迷宫的房间
 * 类型。ROOM = RESULT——存根返回 0。
 * @param {number} floor 阶层（原作 ARG:0）
 * @returns {Promise<number>} 房间类型（存根恒 0）
 */
async function campaign_room() {
  await stub_line_wait('CAMPAIGN_ROOM', '战役房间', '随战役票（阶段 5）');
  return 0;
}

/**
 * @BEDROOM_BATTLE_MALE 存根（阶段 5）：男魔王对挑战者的寝室战（冒险者
 * TALENT:122 四分之一概率挑战、且魔王欲望条件满足时，:210）。
 * @param {number} cid 挑战者（原作 ARG:0）
 * @returns {Promise<number>} 原作 RETURN（存根恒 0）
 */
async function bedroom_battle_male() {
  await stub_line_wait(
    'BEDROOM_BATTLE_MALE',
    '魔王寝室战',
    '随寝室战票（阶段 5）',
  );
  return 0;
}

/**
 * @DUNGEON（:3-853）：迷宫攻略主循环。每次调用推进一「回合」（FOR TURN
 * 0..4 在 TURN > 0 即 BREAK——:79-81 的平衡调整，实际单轮），回合内按
 * 侵攻度 D:20 决定踏破 / 撤退 / 滞留，再走设施、陷阱、战斗、伤势判定与
 * 撤退决议。#103 判定：本函数曾被 侵略/AGENT/AGENT.ERB 的 2014 旧快照
 * 遮蔽（首个加载生效），实际运行的一直是旧版——本项目以本文件为准，
 * AGENT 版登记为缺陷死代码。
 *
 * @param {number} arg0 攻略中的角色·队长（原作 ARG:0）
 * @param {(n: number) => number} [rand] RAND:N 随机源（缺省均匀随机）
 * @returns {Promise<number>} 原作 RETURN 0
 */
async function run_dungeon(arg0, rand) {
  const rand_n = rand ?? default_rand;
  const leader_name = name_of(arg0);

  // :23-25 MAPC：演出用词（战役是「迷宮」，其余「地下城」）
  const mapc = chara(arg0).invasion.状态 === 12 ? '迷宫' : '地下城';

  // :27-32 行動完了の場合飛ばす（CFLAG:530 == 1 本日行动已完）
  if ((era.get(`cflag:${arg0}:530`) || 0) === 1) {
    // 迎撃中の場合、潜入行動（CFLAG:1 == 3）——H6（#175）真身
    if (chara(arg0).invasion.状态 === 3) {
      await battle2_mod.dungeon_spy(arg0, rand_n);
    }
    return 0;
  }

  // :34-35 SIDEA / SIDEB = 仲間A / 仲間B（CFLAG:531 / 532）
  let sidea = era.get(`cflag:${arg0}:531`) || 0;
  let sideb = era.get(`cflag:${arg0}:532`) || 0;
  // :37 TARGET = ARG:0（进击了要）
  era_flag.target = arg0;
  // :38 D:20 = CFLAG:502（侵攻度；event 属主，走门面）
  let walk20 = chara(arg0).event.侵攻度;
  // :9 FLOOR = 现在阶层（#DIM 函数级变量——循环外战后段的「階層を反映」
  // 仍读它，声明随之外提）
  let floor = chara(arg0).dungeon.侵攻阶层;
  // :39 D:1 = 0（帰還フラグ——全函数无读者，撤退判定实走 CFLAG:507，
  // 原作注释照抄、不落变量）

  // :40-67 FLAG:5 & 32（战斗日志显示）时的开场演出
  const settings = era.get('flag:5') || 0;
  if ((settings & 32) !== 0) {
    era.println(); // :41 PRINTL（空行）
    era.drawLine(); // :42
    if (
      chara(arg0).invasion.状态 === 3 &&
      chara(arg0).invasion.回城标志 === 0
    ) {
      // :43-44 迎击开始
      era.print(`${leader_name}的队伍，开始迎击勇者了！！`);
    } else if (
      chara(arg0).invasion.状态 === 3 &&
      chara(arg0).invasion.回城标志 === 1
    ) {
      // :46-52 迎撃時体力が回復していると迎撃再開（HP/MP 均 > 80%）
      if (
        Math.floor(
          (chara(arg0).dungeon.体力 * 100) /
            (era.get(`maxbase:${arg0}:0`) || 0),
        ) > 80 &&
        Math.floor(
          (chara(arg0).dungeon.气力 * 100) /
            (era.get(`maxbase:${arg0}:1`) || 0),
        ) > 80
      ) {
        era.print(`体力恢复了的${leader_name}，再次开始迎击勇者！！`);
        chara(arg0).invasion.回城标志 = 0; // :49 CFLAG:507 = 0
      } else {
        era.print(`${leader_name}仍然在恢复体力。`);
      }
    } else if (chara(arg0).invasion.回城标志 === 1) {
      // :53-54 撤退中
      era.print(`${leader_name}的队伍，想要逃离${mapc}。`);
    } else {
      // :55-56 攻略开始
      era.print(`${leader_name}的队伍开始攻略${mapc}！！`);
    }
    era.drawLine(); // :58
    era.println(); // :60
    // :61-66 コンフィグ「戦闘ログでのSKIP中断」（FLAG:5 位 9）
    if (((settings >> 9) & 1) !== 0) {
      await era.waitAnyKey(true); // FORCEWAIT
    } else {
      await era.waitAnyKey(); // WAIT
    }
  }

  // :69-74 フラグオフ（CFLAG:503 休憩标志复位，队长与同伴）
  chara(arg0).dungeon.休憩 = 0;
  if (sidea > 0) {
    chara(sidea).dungeon.休憩 = 0;
  }
  if (sideb > 0) {
    chara(sideb).dungeon.休憩 = 0;
  }

  // :78 FOR TURN, 0, 5——バランス調整のため侵攻は一回で終了（:80-81）
  for (let turn = 0; turn < 5; turn += 1) {
    if (turn > 0) {
      break;
    }

    // :84 戦闘が発生しないフラグ初期化（NO_BATTLE）
    let no_battle = 0;

    // :86-88 PRINTFORM %SAVESTR%%MAPC%——与 :136-143 的 PRINTL 同一显示行
    // （拼接见文件头），此处仅在有守卫演出时随其归并

    // :90-94 WALK = RAND:20 + 6 × RAND:10（速度UP）
    let walk = rand_n(20);
    for (let i = 0; i < 6; i += 1) {
      walk += rand_n(10);
    }
    // :96-97 引き返す（撤退中 CFLAG:507 != 0 → 反向两倍速）
    if (chara(arg0).invasion.回城标志 !== 0) {
      walk *= -2;
    }

    // :99-103 装備効果(侵攻)（W:8 = 17，#174 真身）
    if (equip_check(arg0, 17) > 0) {
      walk *= 2;
    }
    // :105-109 装備効果(試練)（W:8 = 19）
    if (equip_check(arg0, 19) > 0) {
      walk = Math.floor(walk / 2);
    }

    // :111-122 迷惑状態（CFLAG:509 == 1）：RAND:3 == 0 时解除，否则 WALK = 0
    if ((era.get(`cflag:${arg0}:509`) || 0) === 1) {
      if (rand_n(3) === 0) {
        // たまに回復（ハメを防ぐため先に判定する）
        era.set(`cflag:${arg0}:509`, 0);
      } else {
        walk = 0;
      }
    }

    // :124 FLOOR = CFLAG:501（现在阶层——每轮从 CFLAG 重读，声明已外提）
    floor = chara(arg0).dungeon.侵攻阶层;
    // :125-131 房间类型：战役（FLAG:400）走 CAMPAIGN_ROOM，否则
    // FLAG:(FLOOR + 349) 的逐层房间表
    let room;
    if (era.get('flag:400') || 0) {
      room = await campaign_room(floor); // イベントダンジョン
    } else {
      room = era.get(`flag:${floor + 349}`) || 0;
    }

    // :133-153 FLAG:5 & 32 时的推进演出（与 :87 拼接为同一显示行）
    if ((settings & 32) !== 0) {
      if (room === 507 && (era.get(`talent:${arg0}:180`) || 0)) {
        // 娼館街かつ娼婦（TALENT:180 妓女）
        era.print(`${leader_name}${mapc}挑选着客人……`);
        walk = 0;
      } else if (walk >= 1) {
        era.print(`${leader_name}${mapc}前进着。`);
      } else if (walk <= -1) {
        era.print(`${leader_name}${mapc}急速撤退着。`);
      } else {
        era.print(`${leader_name}${mapc}迷路了。`);
      }
      await era.waitAnyKey(); // :146 WAIT
      era.print('----------------------'); // :148
      era.print(`   ${mapc}深处`); // :149 PRINTFORML（全角空格缩进）
      era.print('----------------------'); // :150
      era.print(`第${floor}阶层`); // :152 PRINTFORM
    }

    // :154-159 侵攻度累加：侵攻/战役（2/12）前进，其余（迎击 3）倒退。
    // :157 X *= 2 是原作全局 X（全库无初始化恒 0）的死代码，不落变量
    if (chara(arg0).invasion.状态 === 2 || chara(arg0).invasion.状态 === 12) {
      walk20 += walk;
    } else {
      walk20 -= walk;
    }
    // :160-162 BARL D:20,100,50（侵攻度条形图）——无 era API 通道，跳过

    // === 侵攻度检查（:165-373 三臂）===
    if (walk20 >= 100) {
      // :167 階層滞在カウントをリセット（CFLAG:514）
      era.set(`cflag:${arg0}:514`, 0);
      if (chara(arg0).invasion.状态 === 2 || chara(arg0).invasion.状态 === 12) {
        // —— 勇者臂（:168-265）——
        if (
          (era.get('flag:400') || 0) !== 0 &&
          chara(arg0).invasion.状态 === 12
        ) {
          // :169-180 イベント中は踏破できるか判定がある（战役踏破判定）
          const cleared = await campaign_quest(arg0);
          if (cleared) {
            era.print(`${leader_name}踏破这一层了！`); // :174 攻略成功
          } else {
            // :176-179 攻略失敗。追い返される
            era.print(`${leader_name}放弃探索，开始回头了。`);
            chara(arg0).invasion.回城标志 = 1; // CFLAG:507 = 1
            walk20 = 95;
          }
        } else {
          era.print(`${leader_name}踏破这一层了！`); // :182
        }

        // :185-186 搜刮战利品中…
        if ((settings & 32) !== 0) {
          era.print('搜刮战利品中…');
        }
        // :188 CALL ADD_EX_ITEM, -1, ARG:0, 0（战利品；RESULT == 0 没找到）
        const loot = await add_ex_item(-1, arg0, 0);
        if ((settings & 32) !== 0 && loot === 0) {
          era.print('没找到什么有用的。'); // :190-191
        }

        if ((era.get('flag:400') || 0) > 0 && floor >= 6) {
          // :193-197 戦役的盡頭（战役终局，存根）
          era.print(`到达了${mapc}的尽头………`);
          await campaign_ending(arg0);
          walk20 = 0;
          break;
        } else if (floor >= 9) {
          // :199-224 魔王的房间——本票的贯通终点
          era.print('这里是魔王的房间………'); // :200
          if ((era.get(`talent:${arg0}:122`) || 0) === 0) {
            // :201-202 真勇者（非冒险者）→ JUMP ENDING_2（#173 H4 存根；
            // QUIT 后不返回，真身落地前以 RETURN 收口）
            await ending_2();
            return 0;
          } else if (era.get(`talent:${arg0}:122`)) {
            // :203-222 冒险者（TALENT:122 非零）：深知无法击败魔王
            era.print('作为冒险者而非勇者的他深知自己无法击败魔王。');
            if (rand_n(4) === 0) {
              // :205-214 四分之一概率发起挑战
              era.print(`但${leader_name}仍是向魔王发起了挑战。`);
              // :207 女魔王且欲望大于3、男魔王欲望3基3、欲求不满的欲望6
              // （ABL:11 欲望 / ABL:23；TALENT:MASTER:122 男人位）
              if (
                ((era.get('talent:0:122') || 0) === 0 &&
                  (era.get('abl:0:11') || 0) > 3) ||
                ((era.get('abl:0:11') || 0) > 3 &&
                  era.get('talent:0:122') &&
                  (era.get('abl:0:23') || 0) > 3) ||
                (era.get('abl:0:11') || 0) > 6
              ) {
                era.print(`${name_of(0)}察觉到了${leader_name}的气息。`);
                await bedroom_battle_male(arg0); // :210
              } else {
                // :212-213 挑战失败成为奴隶
                era.print(
                  `可想而知${leader_name}失败了、成为了${mapc}里众多奴隶的一员。`,
                );
                chara(arg0).invasion.状态 = 0; // CFLAG:1 = 0
              }
            } else {
              // :216-221 放弃英雄梦回头（挫折阶层记忆）
              era.print(`${leader_name}放弃了成为英雄的念头，开始回头了。`);
              era.print('再次鼓起勇气来到这里可能会花些时间了。');
              chara(arg0).invasion.回城标志 = 1; // CFLAG:507 = 1
              chara(arg0).dungeon.再起点 = 7; // CFLAG:508 = 7
              chara(arg0).invasion.存档点 = 7; // CFLAG:521 = 7
              chara(arg0).dungeon.到达阶层 = 8; // CFLAG:520 = 8
            }
          }
          walk20 = 0; // :224
        } else {
          // :225-264 体力有富余时再冒险一层
          // CFLAG:520 目標階層（到达阶层记忆；dungeon 属主域内裸寻址）
          if (floor > (era.get(`cflag:${arg0}:520`) || 0)) {
            let tired = 0; // :229 LOCAL = 0
            const max_hp = era.get(`maxbase:${arg0}:0`) || 0;
            const max_wp = era.get(`maxbase:${arg0}:1`) || 0;
            if (Math.floor((chara(arg0).dungeon.体力 * 100) / max_hp) < 90) {
              tired += 1; // :230-231
            } else if (
              Math.floor((chara(arg0).dungeon.气力 * 100) / max_wp) < 90
            ) {
              tired += 1; // :232-233
            } else if (
              sidea > 0 &&
              Math.floor(
                (chara(sidea).dungeon.体力 * 100) /
                  (era.get(`maxbase:${sidea}:0`) || 0),
              ) < 90
            ) {
              tired += 1; // :235-236 仲間Aの体調も見る
            } else if (
              sidea > 0 &&
              Math.floor(
                (chara(sidea).dungeon.气力 * 100) /
                  (era.get(`maxbase:${sidea}:1`) || 0),
              ) < 90
            ) {
              tired += 1; // :237-238
            } else if (
              sideb > 0 &&
              Math.floor(
                (chara(sideb).dungeon.体力 * 100) /
                  (era.get(`maxbase:${sideb}:0`) || 0),
              ) < 90
            ) {
              tired += 1; // :240-241 仲間Bの体調も見る
            } else if (
              sideb > 0 &&
              Math.floor(
                (chara(sideb).dungeon.气力 * 100) /
                  (era.get(`maxbase:${sideb}:1`) || 0),
              ) < 90
            ) {
              tired += 1; // :242-243
            }
            if (tired === 0) {
              // :245-248 状態良好→向更深阶层发起挑战
              era.print(`状态良好的${leader_name}的队伍、向更深阶层发起挑战……`);
              era.set(`cflag:${arg0}:520`, floor); // CFLAG:520 = FLOOR
            }
          }

          if (floor > (era.get(`cflag:${arg0}:520`) || 0)) {
            // :251-257 放弃探索回头（到达阶层未及，挫折阶层记忆）
            era.print(`${leader_name}放弃探索，开始回头了。`);
            chara(arg0).invasion.回城标志 = 1; // CFLAG:507 = 1
            // :254-256 到達階層を記憶（CFLAG:521 存档点）
            if (floor > chara(arg0).invasion.存档点) {
              chara(arg0).invasion.存档点 = floor;
            }
            walk20 = 95;
          } else {
            // :258-264 下潜一层
            chara(arg0).dungeon.侵攻阶层 += 1; // CFLAG:501 += 1
            chara(arg0).dungeon.再起点 += 1; // CFLAG:508 += 1
            floor += 1;
            era.print(`${leader_name}向第${floor}阶层发起挑战。`);
            walk20 = 0;
          }
        }
      } else {
        // —— 迎击臂（:266-283）：侵攻度满 100 时迎击方推到魔王房间 ——
        if (floor >= 9) {
          era.print(`${leader_name}返回了魔王的房间。`); // :268
          walk20 = 100;
          chara(arg0).invasion.回城标志 = 0; // :270 CFLAG:507 = 0
        } else {
          chara(arg0).dungeon.侵攻阶层 += 1; // :272 CFLAG:501 += 1
          floor += 1;
          era.print(`${leader_name}回到了第${floor}阶层。`);
          walk20 = 10;
        }
        // :277-281 深处滞在休憩 +1（队长与同伴；CFLAG:503）
        chara(arg0).dungeon.休憩 += 1;
        if (sidea > 0) {
          chara(sidea).dungeon.休憩 += 1;
        }
        if (sideb > 0) {
          chara(sideb).dungeon.休憩 += 1;
        }
        break; // :282
      }
    } else if (walk20 <= 0) {
      // === 撤退臂（:284-354）===
      // :286 階層滞在カウントをリセット
      era.set(`cflag:${arg0}:514`, 0);
      if (chara(arg0).invasion.状态 === 2 || chara(arg0).invasion.状态 === 12) {
        // —— 勇者撤出（:287-327）——
        if (floor === 5) {
          floor = 1; // :288-289 第 5 层直接回到 1（中转层设计）
        }
        if (floor <= 1) {
          era.print(`${leader_name}回到了${mapc}外面。`); // :291
          walk20 = 0;
          // :294-295 街でのイベント（城镇事件，存根 #178）
          await dungeon_town(arg0);
          // :297-314 補給购买段在原作是注释状态（;CALL ADD_EX_ITEM -3），不移植
          break; // :315
        } else {
          chara(arg0).dungeon.侵攻阶层 -= 1; // :317 CFLAG:501 -= 1
          floor -= 1;
          era.print(`${leader_name}回到了第${floor}阶层。`); // :319
          walk20 = 90;
        }
        // :322-326 休憩 +1（队长与同伴）
        chara(arg0).dungeon.休憩 += 1;
        if (sidea > 0) {
          chara(sidea).dungeon.休憩 += 1;
        }
        if (sideb > 0) {
          chara(sideb).dungeon.休憩 += 1;
        }
      } else {
        // —— 迎击方被推出（:328-354）——
        era.print(`${leader_name}踏破了这一层！`); // :329

        // :331-337 拡張任務の失敗判定（CFLAG:500 == 3）
        if ((era.get(`cflag:${arg0}:500`) || 0) === 3) {
          era.print(`${leader_name}企图扩张设施，失败了……`);
          era.print(`${leader_name}使用回城魔法回来了。`);
          chara(arg0).invasion.状态 = 6; // CFLAG:1 = 6
          return 0;
        }

        if (floor <= 1) {
          // :339-347 走出迷宫（回城标志 CFLAG:505 决定状态 5 或 6）
          era.print(`再往前走就走出${mapc}了………`);
          era.print(`${leader_name}使用回城魔法回来了。`);
          if ((era.get(`cflag:${arg0}:505`) || 0) > 0) {
            chara(arg0).invasion.状态 = 5;
          } else {
            chara(arg0).invasion.状态 = 6;
          }
          return 0;
        } else {
          chara(arg0).dungeon.侵攻阶层 -= 1; // :349 CFLAG:501 -= 1
          floor -= 1;
          era.print(`${leader_name}向夺回第${floor}阶层发起挑战。`); // :351
          walk20 = 90;
        }
      }
    } else {
      // === 滞留臂（:355-373）：0 < D:20 < 100，无阶层移动 ===
      // :358 階層滞在カウントを+1（CFLAG:514）
      era.set(`cflag:${arg0}:514`, (era.get(`cflag:${arg0}:514`) || 0) + 1);

      // :360-371 奴隷の場合カウントが溜まると帰還する（迎击奴隶滞留 > 15）
      if (
        chara(arg0).invasion.状态 === 3 &&
        (era.get(`cflag:${arg0}:514`) || 0) > 15
      ) {
        era.print(`${leader_name}在此长期滞留感到十分疲乏……`);
        era.print(`${leader_name}使用了归还魔法回程了。`);
        if ((era.get(`cflag:${arg0}:505`) || 0) > 0) {
          chara(arg0).invasion.状态 = 5;
        } else {
          chara(arg0).invasion.状态 = 6;
        }
        era.set(`cflag:${arg0}:514`, 0);
        return 0;
      }
    }

    // === 设施効果（:377-388）：1/3 の確率で受けるキャラが変わる ===
    let a; // 原作全局 A（设施/陷阱的受者）
    if (rand_n(3) === 0 && sidea > 0) {
      a = sidea;
    } else if (rand_n(2) === 0 && sideb > 0) {
      a = sideb;
    } else {
      a = arg0;
    }
    // :386 CALL DUNGEON_ROOM, A——戦闘无なら1が加算される（RESULT → NO_BATTLE）
    no_battle += await dungeon_room(a);

    // === 陷阱処理（:390-413）：受者另行 1/3 掷选 ===
    let trap_target;
    if (rand_n(3) === 0 && sidea > 0) {
      trap_target = sidea;
    } else if (rand_n(2) === 0 && sideb > 0) {
      trap_target = sideb;
    } else {
      trap_target = arg0;
    }

    // D:4 = 陷阱试行次数（原作全局 D 槽；装备「陷阱誘発」的强度——真身
    // （#176）的输入）。D:20 与陷阱共享（TELEPORT 写、ONE_WAY/SHOOT 读），
    // 经 ctx 对象回写（原作全局 D 槽，#5 决议第六条）
    const trap_ctx = { d20: walk20 };
    // :400-405 装備効果(陷阱誘発)（W:8 = 20）
    if (equip_check(trap_target, 20) > 0) {
      await trap_mod.dungeon_trap(
        trap_target,
        equip_check(trap_target, 20),
        rand_n,
        trap_ctx,
      );
    } else {
      // :408-412 装備効果(陷阱避け)（W:8 = 16）：RESULT < RAND:10 时触发
      if (equip_check(trap_target, 16) < rand_n(10)) {
        await trap_mod.dungeon_trap(trap_target, 0, rand_n, trap_ctx);
      }
    }
    // TELEPORT 的 D:20 写回（:330/:335）——:748 的 CFLAG:502 = D:20 用它
    walk20 = trap_ctx.d20;

    // :415-419 シュートでPTが分断された時のためにここで一度SIDEA・SIDEBを
    // 再定義（ちょっと乱暴だけど…ハズ）
    a = arg0;
    sidea = era.get(`cflag:${arg0}:531`) || 0;
    sideb = era.get(`cflag:${arg0}:532`) || 0;

    // === 戦闘フェイズ（:421-589 三臂）===
    if (chara(arg0).invasion.状态 === 2) {
      // —— 侵攻勇者（:423-522）——
      if ((settings & 16) !== 0 || no_battle > 0) {
        // :424-431 / :432-440 无敌人开关（FLAG:5 & 16）或战斗未发生：
        // 経験値増加（CFLAG:MASTER:9 魔王等级，MASTER 恒角色 0）
        if ((settings & 32) !== 0) {
          era.print('因为没有敌人所以进行了训练。（经验值增加）'); // :426/:434
          await era.waitAnyKey();
        }
        chara(arg0).dungeon.战斗经验 += era.get('cflag:0:9') || 0;
        if (sidea > 0) {
          chara(sidea).dungeon.战斗经验 += era.get('cflag:0:9') || 0;
        }
        if (sideb > 0) {
          chara(sideb).dungeon.战斗经验 += era.get('cflag:0:9') || 0;
        }
      } else {
        // :441-477 戦闘（H6（#175）真身：勇者会掉 HP/气力、会投降）
        let turnend = 0; // TURNEND：誰かが敗北して冒険が中断される
        await battle_mod.dungeon_party_battle(arg0, rand_n);
        // :445 陥落したか否か（队长）
        if (
          chara(arg0).invasion.状态 !== 2 &&
          chara(arg0).invasion.状态 !== 3
        ) {
          await get_down_enemy(arg0); // :446（复活，依据 #103）
          // :447-456 善悪値が低いと、仲間を売って助かろうとする（<= -50）
          if (chara(arg0).chara.善恶值 <= -50 && (sidea > 0 || sideb > 0)) {
            era.print(`${leader_name}背叛了同伴，开始透露她们的位置。`);
            era.print('带着谄媚的神情出卖着同伴，拼死地乞求着饶命……');
            await era.waitAnyKey();
            if (sidea > 0 && chara(sidea).invasion.状态 === 2) {
              chara(sidea).invasion.状态 = 0;
            }
            if (sideb > 0 && chara(sideb).invasion.状态 === 2) {
              chara(sideb).invasion.状态 = 0;
            }
          }
          party_del(arg0); // :457
          turnend += 1;
        }

        // :461-466 仲間Aが陥落したかどうか
        if (
          sidea > 0 &&
          chara(sidea).invasion.状态 !== 2 &&
          chara(sidea).invasion.状态 !== 3
        ) {
          await get_down_enemy(sidea); // :463
          party_del(sidea); // :464
          turnend += 1;
        }
        // :468-473 仲間B
        if (
          sideb > 0 &&
          chara(sideb).invasion.状态 !== 2 &&
          chara(sideb).invasion.状态 !== 3
        ) {
          await get_down_enemy(sideb); // :470
          party_del(sideb); // :471
          turnend += 1;
        }
        if (turnend > 0) {
          break; // :475-476
        }
      }

      // :479 TURNEND = 0——循环体单轮（:80-81 平衡调整），复位无后读，不落

      // :481-507 善悪値によっては魔王に寝返る（<= -150 且 CFLAG:1 == 2）
      if (chara(arg0).chara.善恶值 <= -150 && chara(arg0).invasion.状态 === 2) {
        chara(arg0).invasion.状态 = 0; // :483
        await get_down_enemy(arg0); // :484
        if (sidea > 0 || sideb > 0) {
          era.print(`${leader_name}背叛了同伴，开始透露她们的位置。`);
          era.print('似乎想把同伴当成投诚的礼物……');
          await era.waitAnyKey();
          if (sidea > 0 && chara(sidea).invasion.状态 === 2) {
            chara(sidea).invasion.状态 = 0;
          }
          if (sideb > 0 && chara(sideb).invasion.状态 === 2) {
            chara(sideb).invasion.状态 = 0;
          }
        }
        party_del(arg0); // :493

        // :495-499 仲間Aが陥落したかどうか（寝返り连锁）
        if (
          sidea > 0 &&
          chara(sidea).invasion.状态 !== 2 &&
          chara(sidea).invasion.状态 !== 3
        ) {
          await get_down_enemy(sidea); // :497
          chara(sidea).invasion.状态 = 0; // :498
        }
        // :501-505 仲間B
        if (
          sideb > 0 &&
          chara(sideb).invasion.状态 !== 2 &&
          chara(sideb).invasion.状态 !== 3
        ) {
          await get_down_enemy(sideb); // :503
          chara(sideb).invasion.状态 = 0; // :504
        }
        // :506 TURNEND += 1 → :521-522 BREAK
        break;
      }

      // :509-513 SIDEA 善悪 <= -150 且 == 2
      if (
        sidea > 0 &&
        chara(sidea).chara.善恶值 <= -150 &&
        chara(sidea).invasion.状态 === 2
      ) {
        await get_down_enemy(sidea); // :510
        party_del(sidea); // :511
        break; // TURNEND += 1 → BREAK
      }
      // :515-519 SIDEB
      if (
        sideb > 0 &&
        chara(sideb).chara.善恶值 <= -150 &&
        chara(sideb).invasion.状态 === 2
      ) {
        await get_down_enemy(sideb); // :516
        party_del(sideb); // :517
        break;
      }
    } else if (chara(arg0).invasion.状态 === 12) {
      // —— 戦役（:523-563 イベントダンジョン）——
      if (no_battle > 0) {
        // :525-533 戦闘未発生フラグ
        if ((settings & 32) !== 0) {
          era.print('因没有敌人而自己进行了训练（经验值增加）'); // :528
          await era.waitAnyKey();
        }
        chara(arg0).dungeon.战斗经验 += era.get('cflag:0:9') || 0;
        if (sidea > 0) {
          chara(sidea).dungeon.战斗经验 += era.get('cflag:0:9') || 0;
        }
        if (sideb > 0) {
          chara(sideb).dungeon.战斗经验 += era.get('cflag:0:9') || 0;
        }
      } else {
        let turnend = 0;
        await battle_mod.dungeon_party_battle(arg0, rand_n); // :536
        // :537-543 陥落したか否か（队长）
        if (
          chara(arg0).invasion.状态 !== 2 &&
          chara(arg0).invasion.状态 !== 3 &&
          chara(arg0).invasion.状态 !== 12
        ) {
          era.print(`${leader_name}被抓住了…`); // :539
          chara(arg0).invasion.回城标志 = 0; // :540
          party_del(arg0); // :541
          turnend += 1;
        }
        // :545-551 仲間A
        if (
          sidea > 0 &&
          chara(sidea).invasion.状态 !== 2 &&
          chara(sidea).invasion.状态 !== 3 &&
          chara(sidea).invasion.状态 !== 12
        ) {
          era.print(`${name_of(sidea)}被抓住了…`); // :547
          chara(sidea).invasion.回城标志 = 0; // :548
          party_del(sidea); // :549
          turnend += 1;
        }
        // :553-559 仲間B
        if (
          sideb > 0 &&
          chara(sideb).invasion.状态 !== 2 &&
          chara(sideb).invasion.状态 !== 3 &&
          chara(sideb).invasion.状态 !== 12
        ) {
          era.print(`${name_of(sideb)}被抓住了…`); // :555
          chara(sideb).invasion.回城标志 = 0; // :556
          party_del(sideb); // :557
          turnend += 1;
        }
        if (turnend > 0) {
          break; // :561-562
        }
      }
    } else {
      // —— 勇者と元勇者の戦闘（:564-588 迎击 3）——H6（#175）真身：
      // RESULT 与败者号 B 经返回值显式传出（#5 决议第六条，文件头）
      const { result: battle2r, loser: b } =
        await battle2_mod.dungeon_battle2_party(arg0, rand_n);
      if (battle2r === 2) {
        // :568-571 迎击方的 B 被打倒
        await get_down_enemy(b); // :569（复活，依据 #103）
        // CFLAG:505 勇者撃破数 += 1（dungeon 属主域内）
        era.set(`cflag:${arg0}:505`, (era.get(`cflag:${arg0}:505`) || 0) + 1);
        party_del(b); // :571
      } else if (battle2r === 1) {
        // :572-587 勇者被击退
        chara(arg0).invasion.回城标志 = 0; // :574
        if (chara(arg0).invasion.状态 === 0) {
          if ((era.get(`cflag:${arg0}:505`) || 0) > 0) {
            chara(arg0).invasion.状态 = 5; // :576-577
          } else {
            chara(arg0).invasion.状态 = 6; // :579
          }
        }
        // :582-584 NTRれたなら勇者討伐数を０に（CFLAG:1 == 9）
        if (chara(arg0).invasion.状态 === 9) {
          era.set(`cflag:${arg0}:505`, 0);
        }
        party_del(arg0); // :585
        era_flag.target = -1; // :586 TARGET = -1
        return 0; // :587
      }
    }

    // === 迎击训练（:591-603）===
    if (
      chara(arg0).invasion.状态 === 3 &&
      (settings & 16) !== 0 &&
      (era.get('cflag:0:9') || 0) > 0
    ) {
      if ((settings & 32) !== 0) {
        era.print(`${leader_name}和怪物们进行了训练（经验值增加）`); // :593
        await era.waitAnyKey();
      }
      chara(arg0).dungeon.战斗经验 += era.get('cflag:0:9') || 0;
      // :596-597 訓練行動と合わせて1.5倍に増加（CFLAG:500 == 5）
      if ((era.get(`cflag:${arg0}:500`) || 0) === 5) {
        chara(arg0).dungeon.战斗经验 += Math.floor(
          (era.get('cflag:0:9') || 0) / 2,
        );
      }
    } else if (
      chara(arg0).invasion.状态 === 3 &&
      (era.get(`cflag:${arg0}:500`) || 0) === 5 &&
      (era.get('cflag:0:9') || 0) > 0
    ) {
      // :598-602 迎撃時の訓練行動
      if ((settings & 32) !== 0) {
        era.print(`${leader_name}和怪物们进行了训练（经验值增加）`); // :601
        await era.waitAnyKey();
      }
      chara(arg0).dungeon.战斗经验 += era.get('cflag:0:9') || 0;
    }

    // === 貞操帯のカギを探す（:605-627；迎击者 CFLAG:49 == 1 且未找到）===
    if (
      chara(arg0).invasion.状态 === 3 &&
      (era.get(`cflag:${arg0}:49`) || 0) === 1 &&
      (era.get(`cflag:${arg0}:50`) || 0) === 0
    ) {
      era.println(); // :607
      era.print(
        `探索${mapc}的时候，在洞穴角落里发现了发光的东西。${leader_name}在意地把它捡起来了。`,
      );
      await era.waitAnyKey();
      // :609-626 ELSEIF 链（RAND:2 掷选，首个命中后短路）——原作每臂条件
      // 字面相同（RAND:2 == 0），ere 侧以顺序 if + 提前收尾等价改写：掷中
      // 即打印读键并结束，未掷中继续掷下一臂（与 ELSEIF 短路同语义）
      if (rand_n(2) === 0) {
        era.print(
          `………是个旧奖章么，这种东西没有价值啊。${leader_name}把它丢掉了。`,
        );
        await era.waitAnyKey();
      } else {
        if (rand_n(2) === 0) {
          era.print(
            `………是个被压坏了的戒指么，想必是哪个被怪物袭击的牺牲者的吧。${leader_name}把它丢掉了。`,
          );
          await era.waitAnyKey();
        } else {
          if (rand_n(2) === 0) {
            era.print(
              `………罐头的盖子么，这种东西没有价值啊。${leader_name}把它丢掉了。`,
            );
            await era.waitAnyKey();
          } else {
            if (rand_n(2) === 0) {
              era.print(
                `………金属片啊，想必是铠甲或者盾牌的碎片吧。${leader_name}把它丢掉了。`,
              );
              await era.waitAnyKey();
            } else {
              if (rand_n(2) === 0) {
                era.print('………注意到有细细的线连着诱导陷阱的机关！');
                await era.waitAnyKey();
                era.print(
                  `但是机关却没有发动，似乎是时间久远已经坏掉了。${leader_name}咒骂着把它丢掉了。`,
                );
                await era.waitAnyKey();
              } else {
                if (rand_n(2) === 0) {
                  era.print(
                    `………是脏了的钻戒吗。但是对${leader_name}来说，完全是多余的东西。`,
                  );
                  await era.waitAnyKey();
                } else {
                  era.print(
                    `………没有看错，是那时候被${name_of(0)}丢掉的贞操带钥匙。${leader_name}终于找到了贞操带钥匙！`,
                  );
                  await era.waitAnyKey();
                  era.print(
                    `${leader_name}带着陶醉的神情，郑重地把它放到怀里了………（${leader_name}拿着贞操带钥匙）`,
                  );
                  await era.waitAnyKey();
                  chara(arg0).event.贞操带钥匙 = 1; // :625 CFLAG:50 = 1（event 属主门面）
                }
              }
            }
          }
        }
      }
    }

    // === 冒険の疲れ（:629-634）：气力 - RAND:6，队长与同伴 ===
    chara(arg0).dungeon.气力 -= rand_n(6);
    if (sidea > 0) {
      chara(sidea).dungeon.气力 -= rand_n(6);
    }
    if (sideb > 0) {
      chara(sideb).dungeon.气力 -= rand_n(6);
    }

    // === 状态判定（:636-637 CALL CHECK_STATUS, ARG:0）===
    const status = await check_status(arg0);

    // === 帰還するかどうか（:639-705 撤退决议）===
    if (chara(arg0).invasion.回城标志 === 1) {
      // :640-642 すでに帰還中である
      era.print(`${leader_name}在${mapc}内撤退（现在第${floor}层）`);
    } else {
      // :643-700 帰還フラグを立て、挫折した階層を記憶する
      const set_retreat = (target_floor) => {
        chara(arg0).invasion.回城标志 = 1; // CFLAG:507 = 1
        era.set(`cflag:${arg0}:520`, target_floor); // CFLAG:520 = …
      };
      if (sidea > 0 && sideb > 0) {
        // :646-666 双同伴队
        if (status[3] >= 1) {
          era.print(`有人濒死，${leader_name}决定后退。（现在第${floor}层）`);
          set_retreat(floor - 2);
        } else if (status[2] >= 2) {
          era.print(
            `大部分人重伤，${leader_name}决定后退。（现在第${floor}层）`,
          );
          set_retreat(floor - 2);
        } else if (status[1] >= 3) {
          era.print(`全员轻伤，${leader_name}决定后退。（现在第${floor}层）`);
          set_retreat(floor - 1);
        } else if (status[5] >= 2) {
          era.print(
            `全员身体状况不佳，${leader_name}决定后退。（现在第${floor}层）`,
          );
          set_retreat(floor - 1);
        } else {
          // :663-665 攻略を続ける
          era.print(
            `${leader_name}决定继续在${mapc}内前进……（现在第${floor}层）`,
          );
        }
      } else if (sidea > 0 || sideb > 0) {
        // :667-683 单同伴队
        if (status[3] >= 1) {
          era.print(`有人濒死，${leader_name}决定后退。（现在第${floor}层）`);
          set_retreat(floor - 2);
        } else if (status[2] >= 1 && status[1] >= 1) {
          era.print(`各种伤势，${leader_name}决定后退。（现在第${floor}层）`);
          set_retreat(floor - 2);
        } else if (status[5] >= 2) {
          era.print(
            `全员身体状况不佳，${leader_name}决定后退。（现在第${floor}层）`,
          );
          set_retreat(floor - 1);
        } else {
          era.print(
            `${leader_name}决定继续在${mapc}内前进……（现在第${floor}层）`,
          );
        }
      } else {
        // :684-700 单人队（CFLAG:534 状态档 × 素质）
        if (
          (era.get(`cflag:${arg0}:534`) || 0) >= 2 &&
          (era.get(`talent:${arg0}:10`) || 0) === 1
        ) {
          // :685-688 胆小的（TALENT:10）轻伤即撤
          era.print(
            `胆小的${leader_name}虽然只是受到轻伤，依然决定撤退。（现在第${floor}层）`,
          );
          set_retreat(floor - 1);
        } else if ((era.get(`cflag:${arg0}:534`) || 0) >= 3) {
          // :689-692 重伤了
          era.print(`${leader_name}重伤了，决定撤退。（现在第${floor}层）`);
          set_retreat(floor - 1);
        } else if (
          (era.get(`cflag:${arg0}:534`) || 0) === 4 &&
          ((era.get(`talent:${arg0}:12`) || 0) === 1 ||
            (era.get(`talent:${arg0}:161`) || 0) === 1)
        ) {
          // :693-696 坚毅的（TALENT:12 刚强 / 161）濒死才撤
          era.print(
            `坚毅的${leader_name}陷入濒死，迫不得已决定撤退了。（现在第${floor}层）`,
          );
          set_retreat(floor - 1);
        } else {
          era.print(
            `${leader_name}决定继续在${mapc}内前进……（现在第${floor}层）`,
          );
        }
      }

      // :702-704 防止后退过度（CFLAG:520 为 0 时钳到 1）
      if ((era.get(`cflag:${arg0}:520`) || 0) === 0) {
        era.set(`cflag:${arg0}:520`, 1);
      }
    }
  }
  // —— FOR TURN 循环结束（:706 NEXT）——

  // === 戦闘後探索（:708-718）：1/3 の確率で受けるキャラが変わる ===
  let after_target;
  if (rand_n(3) === 0 && sidea > 0) {
    after_target = sidea;
  } else if (rand_n(2) === 0 && sideb > 0) {
    after_target = sideb;
  } else {
    after_target = arg0;
  }

  await dungeon_bitch_mod.dungeon_bitch(after_target, rand_n); // :718（真身 #184；rand_n 透传，迷宫与卖春共用随机源。模块对象不解构——测试可替换导出断言被调，enter-enemy 先例）
  await get_junk_item(after_target); // :719

  // === 宝箱を見つける（:721-731；侵攻中 2 且 RAND:4 == 0，各自判定）===
  if (chara(arg0).invasion.状态 === 2 && rand_n(4) === 0) {
    await equip_select(arg0, rand_n); // :723 CALL EQUIP_SELECT（#174 真身）
  }
  if (sidea > 0 && chara(sidea).invasion.状态 === 2 && rand_n(4) === 0) {
    await equip_select(sidea, rand_n); // :724-726
  }
  if (sideb > 0 && chara(sideb).invasion.状态 === 2 && rand_n(4) === 0) {
    await equip_select(sideb, rand_n); // :728-730
  }

  // === アイテムの使用（:735-744 CALL USE_EX_ITEM,"战斗后"）===
  await use_ex_item('战斗后', arg0); // :736（A = ARG:0）
  if (sidea > 0) {
    await use_ex_item('战斗后', sidea); // :739（A = SIDEA）
  }
  if (sideb > 0) {
    await use_ex_item('战斗后', sideb); // :743（A = SIDEB）
  }

  // === 移動を反映（:748-753 CFLAG:502 = D:20，队长与同伴）===
  chara(arg0).event.侵攻度 = walk20;
  if (sidea > 0) {
    chara(sidea).event.侵攻度 = walk20;
  }
  if (sideb > 0) {
    chara(sideb).event.侵攻度 = walk20;
  }

  // === 階層を反映（:755-760 CFLAG:SIDE?:501 = FLOOR）===
  floor = chara(arg0).dungeon.侵攻阶层;
  if (sidea > 0) {
    chara(sidea).dungeon.侵攻阶层 = floor;
  }
  if (sideb > 0) {
    chara(sideb).dungeon.侵攻阶层 = floor;
  }

  // === 休憩フェイズ（:762-849）===

  // :764-777 勇者に紛れ込んだ奴隷が暗躍します（同伴是迎击奴隶 3 时，
  // 熟睡后对同伴降善恶值——KARMA 存根不动值，演出保留）
  if (sidea > 0 && chara(sidea).invasion.状态 === 3) {
    era.print(
      `${name_of(sidea)}在大家都熟睡后开始了奇妙的仪式……（同伴的善良值-1）`,
    );
    await era.waitAnyKey();
    karma(arg0, -1); // :767
    if (sideb > 0) {
      karma(sideb, -1); // :769
    }
  }
  if (sideb > 0 && chara(sideb).invasion.状态 === 3) {
    era.print(
      `${name_of(sideb)}在大家都熟睡后开始了奇妙的仪式……（同伴的善良值-1）`,
    );
    await era.waitAnyKey();
    karma(arg0, -1); // :774
    if (sidea > 0) {
      karma(sidea, -1); // :776
    }
  }

  // :780-811 装備効果(キャンプ)（W:8 = 18）：RESULT > 0 且休憩位 0 → +1
  // （队长与同伴各自 EQUIP_CHECK；0 = 空槽，原作 IF SIDEA > 0）
  for (const camper of [arg0, sidea, sideb]) {
    if (camper <= 0) {
      continue;
    }
    if (equip_check(camper, 18) > 0) {
      if (!(chara(camper).dungeon.休憩 & 1)) {
        chara(camper).dungeon.休憩 += 1;
      }
    }
  }

  // :816-836 装備効果(キャンプ禁止)（W:8 = 19）：休憩位 1 且 RESULT > 0 → -1
  for (const camper of [arg0, sidea, sideb]) {
    if (camper <= 0) {
      continue;
    }
    if (chara(camper).dungeon.休憩 & 1 && equip_check(camper, 19) > 0) {
      chara(camper).dungeon.休憩 -= 1;
    }
  }

  // :841-849 休憩演出（侵攻中 2、休憩位 1、FLOOR > 1）
  if (
    chara(arg0).invasion.状态 === 2 &&
    chara(arg0).dungeon.休憩 & 1 &&
    floor > 1
  ) {
    if ((settings & 32) !== 0) {
      era.println(); // :843
      era.drawLine(); // :844
      era.print(`${leader_name}躲起来休息。`); // :845 PRINTFORMW
      await era.waitAnyKey();
      era.drawLine(); // :846
      era.println(); // :847
    }
  }
  if ((settings & 32) !== 0) {
    era.println(); // :850-851
  }
  era_flag.target = -1; // :852 TARGET = -1
  return 0;
}

/**
 * @CHECK_STATUS 的单人判定段（:897-938 队长 / :939-981 仲間A / :982-1024
 * 仲間B 的同构链）：按 HP/MP 百分比写 CFLAG:534（状态档）并返回累加的
 * STATUS 槽位。
 *
 * 原作现状（1:1 保留，不「修好」）：首分支 `HP% < 60 || MP% < 50` 已吞并
 * 其后全部六个分支（身体抱恙 / 重伤 / 头脑发昏 / 濒死×2 / 气绝在逻辑上
 * 均不可达），实际可达态只有「轻伤（2）」与「元气满满（1）」两档——
 * DUNGEON.ERB 的撤退判定（:685-696 的 534 >= 3 / == 4）随之只有
 * 「轻伤 + 胆小」一臂真实可达。
 *
 * @param {number} cid 角色
 * @param {number} mode MODE（非 0 时静默不打印，:899）
 * @returns {number} STATUS 槽位（1 轻伤 / 0 元气满满；2-6 为不可达档）
 */
function check_status_one(cid, mode) {
  const name = name_of(cid);
  const hp_pct = Math.floor(
    (chara(cid).dungeon.体力 * 100) / (era.get(`maxbase:${cid}:0`) || 0),
  );
  const wp_pct = Math.floor(
    (chara(cid).dungeon.气力 * 100) / (era.get(`maxbase:${cid}:1`) || 0),
  );
  // :889-894 阈值（S1_HP 60 / S1_MP 50 / S2_HP 35 / S2_MP 30 / S3_HP 20 /
  // S3_MP 10）随各分支字面内联。原作是 ELSEIF 链，ere 侧以顺序 if + return
  // 等价改写（首个真条件胜出）——分支 2-7 的条件被首分支覆盖（原作现状），
  // 改写不引入行为差异
  if (hp_pct < 60 || wp_pct < 50) {
    if (!mode) {
      era.print(`${name}轻伤。`);
    }
    chara(cid).dungeon.已接任务 = 2; // CFLAG:534 = 2
    return 1;
  }
  if (wp_pct < 50) {
    // :903-907 不可达（首分支已含），1:1 保留
    if (!mode) {
      era.print(`${name}身体抱恙。`);
    }
    chara(cid).dungeon.已接任务 = 2;
    return 4;
  }
  if (hp_pct < 35 || wp_pct < 30) {
    // :908-912 不可达，1:1 保留
    if (!mode) {
      era.print(`${name}重伤。`);
    }
    chara(cid).dungeon.已接任务 = 3;
    return 2;
  }
  if (wp_pct < 30) {
    // :913-917 不可达，1:1 保留
    if (!mode) {
      era.print(`${name}头脑发昏。`);
    }
    chara(cid).dungeon.已接任务 = 3;
    return 5;
  }
  if (hp_pct < 20 && wp_pct < 10) {
    // :918-922 不可达，1:1 保留
    if (!mode) {
      era.print(`${name}濒死。`);
    }
    chara(cid).dungeon.已接任务 = 4;
    return 3;
  }
  if (hp_pct < 20) {
    // :923-927 不可达，1:1 保留
    if (!mode) {
      era.print(`${name}濒死。`);
    }
    chara(cid).dungeon.已接任务 = 4;
    return 3;
  }
  if (wp_pct < 10) {
    // :928-932 不可达，1:1 保留
    if (!mode) {
      era.print(`${name}气绝。`);
    }
    chara(cid).dungeon.已接任务 = 4;
    return 6;
  }
  if (!mode) {
    era.print(`${name}元气满满。`);
  }
  chara(cid).dungeon.已接任务 = 1; // CFLAG:534 = 1
  return 0;
}

/**
 * @CHECK_STATUS（:856-1035）：队伍伤势判定。
 *
 * 从队长记忆（CFLAG:533）解析三人（自己是队长读自己的 531/532；自己是
 * 同伴则读队长的，且若自己占了同伴A 位则视角换成队长），对侵攻 / 迎击中
 * （CFLAG:1 == 2 || 3）的三人各走判定链，产出 8 槽 STATUS 数组。
 *
 * @param {number} arg0 队长（原作 ARG:0）
 * @param {number} [mode] MODE（缺省 0；非 0 静默）
 * @returns {Promise<number[]>} 原作 RETURN STATUS,STATUS:1..STATUS:7（8 值）：
 *   [0]=STATUS:0（无消费）、[1]轻伤数、[2]重伤数、[3]濒死数、[4]身体抱恙
 *   数、[5]头脑发昏数、[6]气绝数、[7]评级
 */
async function check_status(arg0, mode = 0) {
  let sidea;
  let sideb;
  if ((era.get(`cflag:${arg0}:533`) || 0) === arg0) {
    // :878-880 自己是队长
    sidea = era.get(`cflag:${arg0}:531`) || 0;
    sideb = era.get(`cflag:${arg0}:532`) || 0;
  } else {
    // :881-888 视角换队长；自己占同伴位时把自己换成队长号
    const leader = era.get(`cflag:${arg0}:533`) || 0;
    sidea = era.get(`cflag:${leader}:531`) || 0;
    sideb = era.get(`cflag:${leader}:532`) || 0;
    if (sidea === arg0) {
      sidea = leader;
    }
    if (sideb === arg0) {
      sideb = leader;
    }
  }

  // :895 varset STATUS
  const status = [0, 0, 0, 0, 0, 0, 0, 0];

  const place = chara(arg0).invasion.状态;
  if (place === 2 || place === 3) {
    // :897-938 队长
    status[check_status_one(arg0, mode)] += 1;
    // :939-981 仲間A
    if (sidea > 0) {
      status[check_status_one(sidea, mode)] += 1;
    }
    // :982-1024 仲間B
    if (sideb > 0) {
      status[check_status_one(sideb, mode)] += 1;
    }
  }

  // :1026-1034 队伍当前状态评级：基础分0|元气满满+0|轻伤+1|身体抱恙+1|
  // 重伤+3|头脑发昏+2|濒死+4|气绝+4
  status[7] =
    status[1] +
    status[2] +
    status[3] * 4 +
    status[4] * 3 +
    status[5] * 2 +
    status[6] * 4;
  // :1035 RETURN STATUS,STATUS:1..STATUS:7
  return status;
}

/**
 * @GET_JUNK_ITEM（:1041-1073）：换金财物入手。
 *
 * 计算式（:1046）：100 + 等级 × RAND(√(魔王等级 + 等级 + 1))；素质补正
 * （好奇心 +10 / 为钱而来 +20 / 霍比特·矮人 +30 / 盗贼 1.5 倍）后乘当前
 * 阶层（CFLAG:501），下限 1，累入 CFLAG:581（掠夺的换金前金品）。
 *
 * @param {number} cid 角色（原作 ARG）
 * @param {(n: number) => number} [rand] RAND:N 随机源（缺省均匀随机）
 * @returns {Promise<number>} 原作 RETURN 0
 */
async function get_junk_item(cid, rand) {
  const rand_n = rand ?? default_rand;
  // :1046 CFLAG:MASTER:9 魔王等级（MASTER 恒角色 0）；SQRT 整数平方根
  const master_lv = era.get('cflag:0:9') || 0;
  const lv = era.get(`cflag:${cid}:9`) || 0;
  let local = 100 + lv * rand_n(Math.floor(Math.sqrt(master_lv + lv + 1)));

  // :1048-1050 好奇心ボーナス（TALENT:23）
  if (era.get(`talent:${cid}:23`)) {
    local += 10;
  }
  // :1051-1053 金のためボーナス（TALENT:316 成为勇者的契机 == 2）
  if ((era.get(`talent:${cid}:316`) || 0) === 2) {
    local += 20;
  }
  // :1054-1059 ホビット（種族 TALENT:314 == 10）・ドワーフ（== 11）+30
  if (
    (era.get(`talent:${cid}:314`) || 0) === 10 ||
    (era.get(`talent:${cid}:314`) || 0) === 11
  ) {
    local += 30;
  }
  // :1060-1062 盗賊は収入が多い（1.5倍；TALENT:203）
  if (era.get(`talent:${cid}:203`)) {
    local += Math.floor(local / 2);
  }

  // :1064 LOCAL *= CFLAG:ARG:501（阶层）
  local *= chara(cid).dungeon.侵攻阶层;

  // :1066-1067 SIF LOCAL < 1 → 1
  if (local < 1) {
    local = 1;
  }
  if (((era.get('flag:5') || 0) & 32) !== 0) {
    era.print(`${name_of(cid)}找到了价值${local}的财物。`); // :1069
  }

  // :1071 CFLAG:ARG:581 += LOCAL（dungeon 属主域内）
  era.set(`cflag:${cid}:581`, (era.get(`cflag:${cid}:581`) || 0) + local);
  return 0;
}

/**
 * @GET_DOWN_ENEMY（:1076-1091）：勇者陷落时的初始化与资金入手。
 *
 * 原作里因 @DUNGEON 主入口被 AGENT.ERB 旧快照遮蔽而**纯死代码**——
 * **#103 判定为复制粘贴事故、本项目决定复活**（判据：AGENT 版恰缺 2015
 * 三轮补丁特征，含本函数消费的 CFLAG:580/581/582 勇者资产闭环）。本票
 * 接上全部 9 处调用点（:446/:463/:470/:484/:497/:503/:510/:516/:569）。
 *
 * @param {number} arg0 陷落的勇者（原作 ARG:0）
 * @returns {Promise<number>} 原作 RETURN 0
 */
async function get_down_enemy(arg0) {
  // :1079-1083 善悪値 <= -150 且侵攻中 → 投诚；否则被抓住
  if (chara(arg0).chara.善恶值 <= -150 && chara(arg0).invasion.状态 === 2) {
    era.print(`${name_of(arg0)}背叛了使命，向魔王军投诚了……`);
  } else {
    era.print(`${name_of(arg0)}被抓住了…`);
  }
  // :1084-1086 MONEY += CFLAG:580 / 100（所持金的百分之一充公；EX_FLAG:4444
  // 金钱增减镜像）
  const gain = Math.floor(chara(arg0).dungeon.所持金 / 100);
  era_flag.money += gain;
  era_exflag.legit_money += gain;
  era.print(`获得${gain}G！`);
  // :1087-1089 资产复位与新人标志
  chara(arg0).dungeon.所持金 = 0; // CFLAG:580 = 0
  chara(arg0).invasion.新人 = 1; // CFLAG:506 = 1
  chara(arg0).invasion.回城标志 = 0; // CFLAG:507 = 0
  return 0;
}

module.exports = {
  STUBBED_CALLS,
  run_dungeon,
  check_status,
  check_status_one,
  get_junk_item,
  get_down_enemy,
  // 三支战斗侧消费的域内存根（#175 起 dungeon-battle/-battle2 经模块对象
  // 引用——单点登记，docs/stub-registry.md 不重复收录）
  karma,
  add_ex_item,
  use_ex_item,
};
