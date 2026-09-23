/**
 * @file 日程推进 @EVENT_NEXTDAY 与翌朝事件 @EVENT_NEWDAY（issue #115 起步，
 * #400（N16）扩成全路径）。
 *
 * 源: target/ERB/EVENT/EVENT_NEXTDAY.ERB（2,478 行 / 16 函数）——
 *     @EVENT_NEXTDAY（:6-189）、@EVENT_NEWDAY（:193-243）、@RUNNING_COST
 *     （:247-363）、@EVENT_FUTA_F（:367-386）、@EVENT_MORASI（:390-395）、
 *     @EVENT_YOUJI（:399-465）、@EVENT_MAZOKU（:470-498）、
 *     @SOMETIMES_SHE_COMES_BACK（:502-526）、@MORNING_FELLATIO（:533-698）、
 *     @ONESHO（:703-806）、@OFFERVIRGIN_CHECK（:813-1088）、
 *     @NIGHT_STALKING_CHECK（:1095-1321）、@DOG_WALK（:1325-1462）、
 *     @MAOU_KOUHO（:2430-2451）、@MAOU_TENSHIN（:2455-2479）。
 *     @PILLORY（:1465-2426）单独成文件 ere/event/event-nextday-pillory.js
 *     （绝大部分是文本表，与判定逻辑不同类）。
 *
 * 调用关系：
 *   - @EVENT_NEXTDAY 由 #PRI 档在日推进时调用（EVENT_TURNEND.ERB:77，
 *     先于 :79 的 DAY:0 += 1）——ere/event/event-turnend.js；
 *   - @EVENT_NEWDAY 由普通档在日推进回合（TIME==0）调用（SYSTEM
 *     ver1.0.3.ERB:751）——ere/system/turnend-settle.js；
 *   - @MAOU_TENSHIN 另由 @EVENTEND 的魔王倒下分支调用
 *     （TRAIN_MAIN.ERB:376-378）——ere/event/event-end.js；
 *   - @MAOU_KOUHO 的原作另一处调用点在 @CHARADEAD_CHECK（EVENT_AFTERTRAIN
 *     :33）内（自 #548 起为真身，ere/event/event-aftertrain.js）。
 *
 * 移植说明：
 *   - 原作注释态的调用 1:1 保持不调用（:59 熏香洗濯链、:75/:84/:88 出产三
 *     CALL、:117 @RUNNING_COST、:196 @SOMETIMES_SHE_COMES_BACK、:229 誕生日、
 *     :235 特定日付）——其中 @RUNNING_COST 与 @SOMETIMES_SHE_COMES_BACK
 *     本体已移植并导出，直接驱动可测（调用点仍照原作留注释）。
 *   - 指针不落（#5 决议第六条）：原作用 TARGET/COUNT/全局 A-Z 在函数间传值，
 *     ere 侧一律显式传参；本文件内需要时改 era_flag.target 并在轮末还原
 *     （@DOG_WALK 的 SAVE_TARGET 同款）。
 *   - SAVESTR:x 的读数源是 callname 表（utils/callname-utils.js，本作
 *     里 = 名前）；%SAVESTR:COUNT% 播报一律 chara_callname(cid)。
 *   - @EVENT_NEWDAY 的影寿命循环（:200-221，TALENT:292 魔王之影）当前
 *     不可达（292 无写入路径）——按「登记不占位」处理（#119 KYOTEN_EVENT
 *     先例）：代码留接入注释，执行到也不输出。影角色票落地时补真身。
 *   - :146-147 原作注释「处女の場合善恶值上昇」与条件 TALENT:0 == 0
 *     （非处女）相反——条件 1:1 照搬，以注释存疑。
 *   - @RUNNING_COST 的人气梯子升序书写（:281-287），70/90 两支不可达；
 *     @MAOU_KOUHO 的内层重扫（:2437-2445）净效果是「最后一个候补胜出」——
 *     两处上游瑕疵都 1:1 保留并在各自 JSDoc 里写明证明。
 *   - 调教期专表的读写在调教外会失效（EraElectron 的 tflag/tequip/palam 随
 *     endTrain 删除）：TFLAG:13/14 走 game.train 的调教外通道，TEQUIP:35
 *     （安全套）改函数内局部，PALAM:5 的两条 SIF 在引擎里恒不命中——
 *     OFFERVIRGIN_CHECK 的 JSDoc 逐条记了这三处。
 */
const era = require('#/era-electron');
const { karma, faith } = require('#/chara/chara-stats');
const pregnancy_mod = require('#/chara/chara-pregnancy');
const {
  soul_dislocation,
  swap_chara,
  transfer_soul,
} = require('#/chara/chara-soul-transfer');
const summon_mod = require('#/dungeon/monster-summon');
const { run_endcheck } = require('#/event/event-endcheck');
const { auto_save } = require('#/page/page-save-load');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const era_flag = require('#/era-utils/era-flag');
const { PALAMLV } = require('#/era-utils/palam-level');
const era_exflag = require('#/era-utils/era-exflag');
const {
  chara_callname,
  chara_name,
  chara_nickname,
} = require('#/utils/callname-utils');
// 三张跨边的被调方，皆由并行票交付、本票只接线（各自的调用点备注见
// docs/stub-registry.md 的「调用点接线随 #400」）
const { aphrodisiac_addict } = require('#/event/event-addict');
const { sabbath, sabbath_day } = require('#/event/event-sabbath');
const { tax_get } = require('#/system/stronghold/tax');
const { self_kojo } = require('#/kojo/kojo-system');
const { clothtype_text } = require('#/page/page-clothtype');
const { pillory } = require('#/event/event-nextday-pillory');
const {
  in_vagina_m_to_t,
  conception_check_m_to_t,
} = require('#/event/event-pregnancy');
const { incest } = require('#/system/train/incest');
const { aftertrain_cloth, soiling_cloth_no1 } = require('#/system/train/cloth');
const { curse_equip_ring } = require('#/system/equip/equip-curse');
const { event_video_day } = require('#/system/stronghold/sell-video');
const { ntr_video } = require('#/system/ntr');
// H8（#177）起 DUNGEON_ROOM_DAY 真身：设施日结算（商店街税入 + 牧场）。
// 随机源不注入（缺省 Math.random）——日结算的税额掷与迷宫推进的随机源
// 在原作同属全局 RAND 序列，ere 侧各自缺省即等价
const room_day_mod = require('#/dungeon/dungeon-room');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。#502 起 SENGEN_VIDEO_DE 换真身
 * （本文件的 sengen_video_de），名单清空。
 */
const STUBBED_CALLS = [];

/** 原作 RAND:N（0..N-1）的缺省随机源（各函数以 rand 为注入名，同族模块同款） */
function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/** %TALENTNAME:n%（:370/:375/:380/:392/:402/:407…）的读数源：引擎素质名表 */
function talent_name(n) {
  return era.get(`talentname:${n}`) ?? '';
}

/** %MARKNAME:n%（:463）的读数源 */
function mark_name(n) {
  return era.get(`markname:${n}`) ?? '';
}

/**
 * @EVENT_FUTA_F（:367-386）：不思議の根（TALENT:326）持有者的扶她化确认。
 *
 * 原作 INPUT 的三路分支：0 = 得到【扶她】+【童贞】并清【肉芽诅咒】、
 * 1 = 放弃并只清【肉芽诅咒】、其余 = `GOTO INPUT_LOOP` 重问（#400 落真身，
 * 由 @EVENT_NEXTDAY 的 `TALENT:326 == 1 && EXP:20 >= 150` 支触发）。
 *
 * @param {number} cid 角色 ID（原作循环里的 TARGET）
 */
async function event_futa_f(cid) {
  const name = chara_callname(cid);
  era.print('（呃…这是什么？）'); // :368
  for (;;) {
    era.print(`${name}要【${talent_name(121)}】化吗？`); // :370
    era.print('[0] - 好的'); // :371
    era.print('[1] - 不要'); // :372
    const result = await era.input(); // :373
    if (result === 0) {
      // :375-378
      era.print(`${name}获得了【${talent_name(121)}】。`);
      chara(cid).stronghold.肉芽诅咒 = 0;
      chara(cid).chara.扶她 = 1;
      chara(cid).train.童贞 = 1;
      break;
    }
    if (result === 1) {
      // :380-381
      era.print(`${name}失去了【${talent_name(326)}】。`);
      chara(cid).stronghold.肉芽诅咒 = 0;
      break;
    }
    // :382-383 ELSE → GOTO INPUT_LOOP（重印询问行，不消耗其它状态）
  }
  await era.waitAnyKey(); // :386
}

/** TIMES X, m：整数变量乘小数后截断（math-etc.md，source-check.js 同款） */
function times(v, m) {
  return Math.floor(v * m);
}

/**
 * 原作 FLAG:48 的建造位 → 每日追加额（:258-278 的七个 SIF，位 64 另计人数）。
 * 顺序即原作的书写顺序（加法可交换，保留只为 1:1 追溯）。
 */
const RUNNING_COST_FACILITIES = [
  [1, 500], // 個室を拡張
  [2, 100], // ＳＭグッズ
  [4, 1000], // 護衛を雇用
  [32, 500], // 浴室を拡張
  [8, 1800], // 多目的ホール
  [16, 100], // マイク
];

/**
 * @RUNNING_COST（:247-363）：娼館の維持費と奴隷達の生活費。
 *
 * **原作的调用点（:117）是注释态**，ere 侧 1:1 保持不调用；本函数导出，
 * 供直接驱动（`CALL RUNNING_COST` 一旦被启用，接上即可）。
 *
 * 两处上游判据的书写瑕疵 1:1 保留，不「修好」（改了就是改了行为）：
 *   - 人气梯子（:281-287）升序书写且用 `>=`，故 50 那一支先命中，
 *     70/90 两支**永不可达**——人气 90 仍只乘 1.10；
 *   - 贡献度梯子（:290-304）降序书写，各支正常可达。
 *
 * @returns {Promise<void>}
 */
async function running_cost() {
  let cost = 500; // :249 基礎維持運営費

  if (era_flag.day_count > 31) cost += 1000; // :252-253
  if (era_flag.day_count > 51) cost += 2000; // :254-256

  const facilities = era.get('flag:48') || 0;
  for (const [bit, amount] of RUNNING_COST_FACILITIES) {
    if (facilities & bit) cost += amount; // :259-274
  }
  if (facilities & 64) cost += (era.get('flag:40') || 0) * 500; // :276-278

  const popularity = era.get('exp:0:91') || 0; // EXP:MASTER:91
  if (popularity >= 50)
    cost = times(cost, 1.1); // :281-282
  else if (popularity >= 70)
    cost = times(cost, 1.2); // :283-284（不可达）
  else if (popularity >= 90) cost = times(cost, 1.3); // :285-286（不可达）

  const contribution = era.get('exp:0:90') || 0; // EXP:MASTER:90
  const contribution_ladder = [
    [3000, 0.1],
    [2000, 0.3],
    [1200, 0.5],
    [700, 0.6],
    [400, 0.7],
    [200, 0.8],
    [100, 0.9],
  ];
  for (const [threshold, factor] of contribution_ladder) {
    // :290-303 降序 IF/ELSEIF：只取首个命中
    if (contribution >= threshold) {
      cost = times(cost, factor);
      break;
    }
  }

  // :306-316 基礎生活費（1 人あたり）难度档 × 人数
  const charnum = era.getAddedCharacters().length;
  const difficulty = era.get('flag:5') || 0;
  if (difficulty <= 2 || difficulty === 9)
    cost += charnum * 100; // :308-309
  else if (difficulty === 3)
    cost += charnum * 200; // :310-311
  else if (difficulty === 4)
    cost += charnum * 300; // :312-313
  else if (difficulty === 5) cost += charnum * 400; // :314-315
  cost -= 100; // :318 MASTER の分は無料or割引

  // :320-353 難易度倍率（EASY 0.8 / HARD〜PHANTASM は日数で段階）
  if (difficulty === 1) {
    cost = times(cost, 0.8); // :321-322
  } else if (difficulty === 3) {
    if (era_flag.day_count <= 20) cost = times(cost, 1.2);
    else if (era_flag.day_count <= 40) cost = times(cost, 1.5);
    else if (era_flag.day_count <= 60) cost = times(cost, 2.0);
    else cost = times(cost, 2.5);
  } else if (difficulty === 4) {
    if (era_flag.day_count <= 20) cost = times(cost, 1.4);
    else if (era_flag.day_count <= 30) cost = times(cost, 1.8);
    else if (era_flag.day_count <= 40) cost = times(cost, 3.0);
    else cost = times(cost, 5.0);
  } else if (difficulty === 5) {
    if (era_flag.day_count <= 15) cost = times(cost, 2.0);
    else if (era_flag.day_count <= 25) cost = times(cost, 4.0);
    else if (era_flag.day_count <= 35) cost = times(cost, 8.0);
    else cost = times(cost, 16.0);
  }

  // :355-363 発生条件：最高难度档不发生；EASY 第 20 日、其余第 10 日起
  if (difficulty !== 9) {
    const due =
      (difficulty === 1 && era_flag.day_count >= 20) ||
      (difficulty >= 2 && era_flag.day_count >= 10);
    if (due) {
      // :358 原作 `…花了${A}……`——紧挨取值的 `$` 是字面量，JS 模板串要写 $$
      era.print(`调教中心的维持费和奴隶们的生活费花了$${cost}……`);
      era.drawLine(); // :359-360
      era_flag.money -= cost; // :360 MONEY -= A
      era_exflag.legit_money -= cost; // :361 EX_FLAG:4444 -= A
    }
  }
}

/**
 * @SOMETIMES_SHE_COMES_BACK（:502-526）：死掉的奴隶偶尔回归。
 *
 * **原作的调用点（:196）是注释态**（`;CALL SOMETIMES_SHE_COMES_BACK`、
 * `;D = 0` / `;SIF D` / `;RETURN 1`），ere 侧 1:1 保持不调用；本函数导出
 * 供直接驱动，返回值即原作经全局 D 回传的「有人归来」标志。
 *
 * 一次只回来一人（:520 注释）：扫到第一个「体力 0」的非 0 号角色即复位
 * 并返回；0 号位（魔王）在 :505-506 被跳过，不参与判定。
 *
 * @returns {Promise<number>} 1 = 有人归来（原作 `D = 1` / `RETURN 1`），
 *   0 = 无人（WAIT 落 await，故整函数异步）
 */
async function sometimes_she_comes_back() {
  const master_name = chara_name(0); // %NAME:MASTER%
  for (const cid of era.getAddedCharacters()) {
    if (cid === 0) {
      continue; // :505-506 主人公は判定から省く
    }
    if ((era.get(`base:${cid}:0`) || 0) === 0) {
      // :509-510 体力 = 上限の 1/10（整数除算）、気力 = 上限
      chara(cid).dungeon.体力 = Math.floor(
        (era.get(`maxbase:${cid}:0`) || 0) / 10,
      );
      chara(cid).dungeon.气力 = era.get(`maxbase:${cid}:1`) || 0;
      const name = chara_callname(cid);
      era.drawLine(); // :511-512
      era.print(
        `早上，${master_name}睁开双眼，发现确实已经死掉了的${name}就站在面前。`,
      ); // :512
      era.print('哎呦我的妈！葱油炒蛋花！'); // :513
      era.print(`${name}好像什么事都没发生一样，循例进行上午的请安。`); // :514
      era.print(''); // :515 PRINTL（空行）
      await era.waitAnyKey(); // :516 WAIT
      era.print(`${name}回归了……`); // :517
      era.drawLine(); // :518-519
      await era.waitAnyKey(); // :519 WAIT
      return 1; // :521-522 一度に帰ってくるのは一人ずつ
    }
  }
  return 0; // :526-527
}

/** 原作 GETCHARA(n) 的等价物：在场返回角色号（= cid，#21 扁平化），不在场 -1 */
function get_chara(no) {
  return era.getAddedCharacters().includes(no) ? no : -1;
}

/**
 * 朝フェラ候选的过滤 + 适性值 A（原作 :575-616 与 :624-671 两趟逐字相同的
 * 筛选块）。七条排除守卫任一命中即返回 null；通过则回 A：
 * `A = 精液中毒(ABL:32)`，再按五项素质各加减 1。
 *
 * @param {number} cid 角色 ID（原作循环里的 COUNT）
 * @returns {number|null} 适性值（≤ 0 视为不合格时调用方按 null 处理）
 */
function fellatio_aptitude(cid) {
  if (
    (era.get(`abl:${cid}:11`) || 0) < 4 || // 欲望
    (era.get(`abl:${cid}:16`) || 0) < 4 || // 侍奉精神
    (era.get(`abl:${cid}:32`) || 0) < 1 // 精液中毒
  ) {
    return null;
  }
  if ((era.get(`base:${cid}:0`) || 0) <= 0) return null; // :577-579 已死
  if ((era.get(`base:${cid}:0`) || 0) <= 500) return null; // :580-582 濒死
  if (
    era.get(`talent:${cid}:154`) || // 育儿中
    ((era.get(`cflag:${cid}:110`) || 0) - 2 <= era_flag.day_count && // 临月
      era.get(`talent:${cid}:153`))
  ) {
    return null; // :583-585
  }
  if ((era.get(`cflag:${cid}:1`) || 0) !== 0) return null; // :586-588 不在魔王房间
  if (
    (era.get(`cflag:${cid}:601`) || 0) !== 0 &&
    (era.get(`cflag:${cid}:601`) || 0) !== 901
  ) {
    return null; // :589-591 未婚或与魔王结婚
  }
  if (era.get(`talent:${cid}:151`)) return null; // :592-594 绝不侍奉
  if ((era.get(`mark:${cid}:3`) || 0) > 0) return null; // :595-597 反抗刻印

  let a = era.get(`abl:${cid}:32`) || 0; // :598
  if (era.get(`talent:${cid}:61`)) a += 1; // :599-601 不怕污臭
  if (era.get(`talent:${cid}:62`)) a -= 1; // :602-604 反感污臭
  if (era.get(`talent:${cid}:63`)) a += 1; // :605-607 献身的
  if (era.get(`talent:${cid}:76`)) a += 1; // :608-610 淫乱
  if (era.get(`talent:${cid}:85`)) a += 1; // :611-613 爱慕
  return a > 0 ? a : null; // :614-615 SIF A > 0
}

/**
 * 持有检查（COMABLE 各段的「ITEM:x == 0 && NOITEM == 0」共形，
 * system/train/com-sm.js 同款）——**道具持有**为真时任一项成立。
 * @param {number} i 道具编号
 * @returns {boolean}
 */
function has_item(i) {
  return (era.get(`item:${i}`) || 0) > 0 || (era.get('noitem:0') || 0) !== 0;
}

/**
 * 处女献上的十条准入守卫（原作 :815-864），任一条成立即早退。
 * @param {number} cid 当前目标（原作 TARGET）
 * @returns {boolean} true = 该早退
 */
function virgin_offer_blocked(cid) {
  if ((era.get('flag:38') || 0) <= -1) return true; // :816-817 処女献上禁止
  if ((era_flag.target ?? 0) < 0) return true; // :819-820 調教対象が空
  if (era.get(`talent:${cid}:151`)) return true; // :822-823 绝不侍奉
  if (era.get(`talent:${cid}:135`)) return true; // :825-826 未熟
  if ((era.get(`talent:${cid}:0`) || 0) === 0 || era.get(`talent:${cid}:122`)) {
    return true; // :828-829 非处女或男人
  }
  if (
    (era.get('talent:0:122') || 0) === 0 &&
    (era.get('talent:0:121') || 0) === 0
  ) {
    return true; // :831-832 主人既非男人也非扶她
  }
  if (
    (era.get(`talent:${cid}:85`) || 0) === 0 &&
    (era.get(`talent:${cid}:76`) || 0) === 0
  ) {
    return true; // :835-836 既无爱也无淫乱
  }
  if (
    (era.get(`abl:${cid}:10`) || 0) +
      (era.get(`abl:${cid}:11`) || 0) +
      (era.get(`abl:${cid}:16`) || 0) <=
    10
  ) {
    return true; // :838-839 顺+欲+侍奉 ≤ 10
  }
  if ((era.get(`base:${cid}:0`) || 0) < 500) return true; // :841-842 瀕死
  if ((era.get(`cflag:${cid}:71`) || 0) > 0) return true; // :844-845 処女膜再生済
  if (
    (era.get(`cflag:${cid}:42`) || 0) === 79 &&
    ((era.get(`cflag:${cid}:49`) || 0) === 0 ||
      (era.get(`cflag:${cid}:50`) || 0) === 0)
  ) {
    return true; // :847-848 貞操帯の鍵
  }
  const status = era.get(`cflag:${cid}:1`) || 0; // :857-858 魔王部屋にいない
  if (status !== 0 && status !== 1) return true;
  if ((era.get('flag:38') || 0) === 0 && era.get(`cflag:${cid}:62`)) {
    return true; // :863-864 もうダメだぞ（一次限定の発生済）
  }
  return false;
}

/**
 * 判定变量 S（原作 :868-924）：`-RAND:3` 起步，爱/淫乱各行按能力档加值，
 * 再叠快感/贞操/好奇/戒备四项。S ≤ 0 即「这次不发生」。
 *
 * @param {number} cid 当前目标
 * @param {(n: number) => number} rand RAND:N 随机源
 * @returns {number} 判定值
 */
function virgin_offer_score(cid, rand) {
  let s = -rand(3); // :868 S = (RAND:3 * -1)
  if (era.get(`talent:${cid}:85`)) {
    // :871-879 爱 → 顺从档
    const loyalty = era.get(`abl:${cid}:10`) || 0;
    if (loyalty === 4) s += 1;
    else if (loyalty === 5) s += 2;
    else if (loyalty >= 6) s += 3;
  }
  if (era.get(`talent:${cid}:76`)) {
    // :882-890 淫乱 → 欲望档
    const desire = era.get(`abl:${cid}:11`) || 0;
    if (desire === 4) s += 1;
    else if (desire === 5) s += 2;
    else if (desire >= 6) s += 3;
  }
  // :894-898 欲情达 PALAMLV:4，两档各 +1（高档含低档，故最多 +2）。
  // **引擎事实**：PALAM 表随 endTrain 删除，本函数跑在日循环里，读回来恒
  // 为空 → 这两支在 EraElectron 里恒不命中（原作在 Emuera 里 PALAM 常驻，
  // 会命中）。保留 1:1 代码，不因引擎限制删判据。
  if (
    (era.get(`abl:${cid}:11`) || 0) >= 5 &&
    (era.get(`abl:${cid}:16`) || 0) >= 5 &&
    (era.get(`palam:${cid}:5`) || 0) >= PALAMLV[4]
  ) {
    s += 1;
  }
  if (
    (era.get(`abl:${cid}:11`) || 0) >= 4 &&
    (era.get(`abl:${cid}:16`) || 0) >= 4 &&
    (era.get(`palam:${cid}:5`) || 0) >= PALAMLV[4]
  ) {
    s += 1;
  }
  if (era.get(`talent:${cid}:70`))
    s += 1; // :901-902 接受快感
  else if (era.get(`talent:${cid}:71`)) s -= 2; // :903-904 否定快感
  if (era.get(`talent:${cid}:30`))
    s -= 2; // :908-909 看重贞操
  else if (era.get(`talent:${cid}:31`)) s += 1; // :910-911 看轻贞操
  if (era.get(`talent:${cid}:27`)) s += 1; // :915-916 好奇心
  if (era.get(`talent:${cid}:27`)) s -= 2; // :919-920 戒备森严（原作同读 TALENT:27）
  return s;
}

/**
 * 亲族关系编码 → CFLAG:15 的九档映射（原作 :1028-1044 与 :1055-1071 两张
 * 同构表，后者是魔王侧）。表驱动等价于 ELSEIF 链：按顺序取首个命中。
 * @param {number} relation TFLAG:14
 * @param {boolean} is_male 对应角色的男人素质
 * @param {boolean} master_side 魔王侧（表号不同）
 * @returns {number} 命中则返回编码，未命中返回 null
 */
function first_experience_code(relation, is_male, master_side) {
  const table = master_side
    ? [
        [2, true, 300],
        [2, false, 301],
        [3, true, 306],
        [3, false, 307],
        [4, true, 304],
        [4, false, 305],
        [5, true, 309],
        [6, false, 308],
      ]
    : [
        [1, true, 300],
        [1, false, 301],
        [3, true, 304],
        [3, false, 305],
        [4, true, 306],
        [4, false, 307],
        [5, false, 308],
        [6, true, 309],
      ];
  for (const [rel, male, code] of table) {
    if (relation === rel && is_male === male) return code;
  }
  return null;
}

/**
 * @OFFERVIRGIN_CHECK（:813-1088）：调教对象主动献上处女。
 *
 * 结构：十条准入守卫（`virgin_offer_blocked`）→ 判定值 S（`virgin_offer_score`，
 * S ≤ 0 即不发生）→ 询问（INPUT 循环，非 0/1 重问）→ 拒绝支（顺从 -2 带下限、
 * 收回贞操带钥匙、一次限定落 CFLAG:62）→ 破处支（安全套二问、经验与珠结算、
 * 初体验记录、亲族关系编码）→ 收尾。
 *
 * **跨边（不在位，存根 + 登记）**：`CALL IN_VAGINA_M_TO_T` /
 * `CALL CONCEPTION_CHECK_M_TO_T`（:1012/:1013）属 EVENT_PREGNANCY.ERB 的
 * @N17（#401 并行票），本票只保留占位，不另造一份。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 1 = 献上成立、0 = 未发生/被拒（原作两处 `RETURN 0`）
 */
async function offervirgin_check(rand = default_rand) {
  const cid = era_flag.target; // 原作 TARGET
  if (virgin_offer_blocked(cid)) {
    return 0;
  }
  const s = virgin_offer_score(cid, rand);
  if (s <= 0) {
    return 0; // :923-924
  }

  const name = chara_callname(cid);
  const master = chara_nickname(0); // %CALLNAME:MASTER%
  // :927/:973/:1010/:1015 的 TEQUIP:35（安全套使用フラグ）在 EraElectron 里
  // 是**调教期专表**：三段寻址在调教外被引擎静默丢弃，写不进去也读不回来。
  // 原作用途全程在本函数内（置 0 → 也许置 1 → 判一次 → 复位 0），与 TFLAG
  // 同属「调教外借调教期变量」的情形，改由函数内局部承载（#5：临时变量按
  // JS 局部处理），语义与在引擎里可执行的等价物一致。
  let condom = 0; // :927 TEQUIP:35 = 0
  await era.printAndWait('＜奉献处女＞'); // :928 printw
  era.print(`一天又过去了，${master}正准备上床睡觉，`); // :930-931
  await era.printAndWait(`${name}带着害羞但又坚毅的神情，造访了你的房间。`); // :931
  await era.printAndWait(
    '双腿摩擦着，手足无措，面红耳赤，看来是想把自己的处女奉献给你……',
  ); // :932
  if (era.get(`cflag:${cid}:49`)) {
    // :933-937
    era.print(`那只手，曾经那么的抗拒${master}，`);
    await era.printAndWait('而现在，正紧紧地握着自己贞操带的钥匙。');
    await era.printAndWait('看来是为了今晚，拼命地找回来了。');
  }
  if (era.get(`talent:${cid}:273`)) {
    // :938-941
    era.print('封印的力量，现在在本人欲望的冲击下摇摇欲坠。');
    await era.printAndWait(
      '在她本人的帮助下，想要现在突破封印，应该变得容易了吧。',
    );
  }

  let answer;
  for (;;) {
    era.print(`要夺取${name}的处女吗？`); // :943
    era.print('[0] - 等你很久了！'); // :944
    era.print('[1] - 继续等着吧你……'); // :945
    answer = await era.input(); // :946
    if (answer === 1 || answer === 0) break;
    // :963-964 ELSEIF RESULT != 0 → GOTO INPUT_LOOP_01
  }

  if (answer === 1) {
    // :948-962 拒绝支
    era.print(`${name}失望而归，作为女孩子的自尊，遭到了毁灭性打击。`);
    chara(cid).system.顺从 -= 2; // :949 ABL:10 -= 2
    if ((era.get(`abl:${cid}:10`) || 0) < 0) {
      chara(cid).system.顺从 = 0; // :951
      await era.printAndWait(
        `${era.get('ablname:10') ?? ''}降低为${era.get(`abl:${cid}:10`) || 0}。`,
      ); // :952
    }
    if (era.get(`cflag:${cid}:49`)) {
      // :953-958
      await era.printAndWait(`${name}的贞操带的钥匙拿回来了。`);
      chara(cid).stronghold.贞操带钥匙已丢弃 = 0; // :955 CFLAG:49 = 0
      era.set(`cflag:${cid}:50`, 0); // :957（原作注释：不清会飞回奴隶手里）
    }
    if ((era.get('flag:38') || 0) === 0) {
      era.set(`cflag:${cid}:62`, 1); // :961 発生済フラグ
    }
    return 0; // :962-963
  }

  if (era.get(`item:24`)) {
    // :966-978 安全套二问
    for (;;) {
      era.print('要使用安全套吗？'); // :968
      era.print('[0] - 安全第一！'); // :969
      era.print('[1] - 中出最高！'); // :970
      const answer_condom = await era.input(); // :971
      if (answer_condom === 1) break; // :975-976 ELSEIF RESULT != 1 → 重问
      if (answer_condom === 0) {
        condom = 1; // :973 TEQUIP:35 = 1
        break;
      }
    }
    if (condom === 1) {
      game.train.安全套 -= 1; // :974 ITEM:24 -= 1
    }
  }

  era.print(`${name}将处女奉献给了${master}……`); // :980
  await era.printAndWait('【处女丧失】'); // :981 PRINTW
  chara(cid).chara.处女 = 0; // :982 TALENT:0 = 0

  if (era.get(`talent:${cid}:273`)) {
    // :985-988 封印も解かれる
    await era.printAndWait('守护贞操的封印破碎了……');
    chara(cid).chara.私处封印 = 0;
  }

  // :991-1006 経験・珠の獲得
  era.print(`${era.get('expname:0') ?? ''}＋2`);
  era.print(`${era.get('expname:5') ?? ''}＋1`);
  await era.printAndWait(`${era.get('expname:20') ?? ''}＋1`);
  era.print(`${era.get('palamname:1') ?? ''}点数＋${s * 400}`);
  era.print(`${era.get('palamname:4') ?? ''}点数＋${s * 1000}`);
  era.print(`${era.get('palamname:5') ?? ''}点数＋${s * 500}`);
  era.print(`${era.get('palamname:6') ?? ''}点数＋${s * 1000}`);
  await era.printAndWait(`${era.get('palamname:9') ?? ''}点数＋${s * 1000}`);
  chara(cid).dungeon.私处经验 += 2; // :999
  chara(cid).dungeon.性交经验 += 1; // :1000
  chara(cid).dungeon.精液经验 += 1; // :1001
  era.add(`juel:${cid}:1`, s * 400); // :1002
  era.add(`juel:${cid}:4`, s * 1000); // :1003
  era.add(`juel:${cid}:5`, s * 500); // :1004
  era.add(`juel:${cid}:6`, s * 1000); // :1005
  era.add(`juel:${cid}:9`, s * 1000); // :1006

  if (condom === 0) {
    // :1010-1014 膣内射精チェック。IN_VAGINA_M_TO_T/CONCEPTION_CHECK_M_TO_T
    // 的真身早已随 event-pregnancy.js 的 PAIRS 通用表落地（'m_to_t' 那一档，
    // 供 in_vagina_all/conception_check_all 复用），只是这个调用点一直没接
    // 上、留着占位——era_flag.target 此刻正是 cid（本函数开头 `const cid =
    // era_flag.target`），两个函数按 TARGET 隐式取人，直接调用即可（#406）
    chara(cid).system.主人膣内射精 = 30; // :1011 CFLAG:101 = 30
    in_vagina_m_to_t(rand);
    conception_check_m_to_t(rand);
  }
  condom = 0; // :1015 TEQUIP:35 = 0

  // :1018-1020 親族関係の判定。TFLAG:14 只在调教期存在（EraElectron 的
  // tflag 表随 endTrain 删除），本链跑在日循环里——经 game.train 的调教外
  // 通道承载（facade/game-train.js 的 with_relation_event）
  era_flag.player = 0; // PLAYER = MASTER（MASTER 恒 0）
  const relation = await game.train.with_relation_event(() => incest(cid, 0)); // :1019-1020

  if ((era.get(`cflag:${cid}:15`) || 0) === 0) {
    // :1022-1045 初体験の相手を記録
    chara(cid).train.初体验对象 = 1; // :1024 CFLAG:15 = NO:PLAYER + 1（PLAYER = 魔王 = 0 号）
    chara(cid).train.初体验对象名 = chara_callname(0); // :1025 %SAVESTR:PLAYER%
    // :1028-1043 目标侧的表读的是 **TALENT:PLAYER:122**（魔王的性别），
    // 不是目标自己的——与下面魔王侧的表正好相反
    const code = first_experience_code(
      relation,
      !!era.get('talent:0:122'),
      false,
    );
    if (code !== null) chara(cid).train.初体验对象 = code;
  }

  if (era.get('talent:0:1')) {
    // :1048-1073 マスターが童贞なら童贞喪失
    chara(0).train.童贞 = 0; // :1049
    if ((era.get(`cflag:0:15`) || 0) === 0) {
      chara(0).train.初体验对象 = cid + 1; // :1051 NO:TARGET + 1
      chara(0).train.初体验对象名 = name; // :1052 %SAVESTR:TARGET%
      const code = first_experience_code(
        relation,
        !!era.get(`talent:${cid}:122`),
        true,
      ); // :1055-1070
      if (code !== null) chara(0).train.初体验对象 = code;
    }
  }
  // :1074 TFLAG:14 = 0 —— 调教外通道的临时值随 with_relation_event 出链归还，
  // 无需再写（本函数后续不读它）

  if (era.get(`cflag:${cid}:49`)) {
    // :1076-1084
    await era.printAndWait(`${name}的贞操带的钥匙拿回来了。`);
    chara(cid).stronghold.贞操带钥匙已丢弃 = 0; // :1078 CFLAG:49 = 0
    chara(cid).train.着衣状态 -= 64; // :1079 CFLAG:40 -= 64
    era.set(`cflag:${cid}:50`, 0); // :1082
    chara(cid).chara.特别服装类型 = 0; // :1083
  }

  era.drawLine(); // :1086-1088
  return 1; // :1088-1089
}

/**
 * 夜这い候选的过滤 + OK_FLAG（原作 :1105-1167 与 :1175-1243 两趟逐字相同的
 * 筛选块）。十条排除守卫任一命中即 null；通过则回
 * `OK_FLAG = 性交中毒 + 七项素质加减`，≤ 0 视为不合格。
 *
 * @param {number} cid 角色 ID（原作循环里的 NIGHT_COUNT）
 * @returns {number|null} OK_FLAG
 */
function night_ok_flag(cid) {
  if (
    (era.get(`abl:${cid}:11`) || 0) < 4 || // 欲望
    (era.get(`abl:${cid}:30`) || 0) < 1 // 性交中毒
  ) {
    return null;
  }
  if ((era.get(`base:${cid}:0`) || 0) <= 0) return null; // :1108-1109 已死
  if ((era.get(`base:${cid}:0`) || 0) <= 500) return null; // :1111-1112 濒死
  if (
    era.get(`talent:${cid}:154`) ||
    ((era.get(`cflag:${cid}:110`) || 0) - 2 <= era_flag.day_count &&
      era.get(`talent:${cid}:153`))
  ) {
    return null; // :1114-1115 育儿中或临月
  }
  if ((era.get(`cflag:${cid}:1`) || 0) !== 0) return null; // :1117-1118
  const marriage = era.get(`cflag:${cid}:601`) || 0; // :1120-1121
  if (marriage !== 0 && marriage !== 901) return null;
  if (era.get(`talent:${cid}:151`)) return null; // :1123-1124 绝不侍奉
  if ((era.get(`mark:${cid}:3`) || 0) > 0) return null; // :1126-1127 反抗刻印

  const sum = (n) =>
    (era.get(`abl:${cid}:10`) || 0) +
    (era.get(`abl:${cid}:11`) || 0) +
    (era.get(`abl:${cid}:${n}`) || 0);
  // :1129-1139 处女 / 非男人 / 男人 / 贞操带 四支门槛（判据互不包含，逐条照抄）
  if (era.get(`talent:${cid}:0`) && sum(3) <= 14) return null;
  if (
    (era.get(`talent:${cid}:122`) || 0) === 0 &&
    sum(2) <= 12 &&
    sum(3) <= 14
  ) {
    return null;
  }
  if (era.get(`talent:${cid}:122`) && sum(3) <= 12) return null;
  if (
    (era.get(`cflag:${cid}:42`) || 0) === 79 &&
    ((era.get(`cflag:${cid}:40`) || 0) & 64) !== 0 &&
    sum(3) <= 14
  ) {
    return null;
  }

  let ok = era.get(`abl:${cid}:30`) || 0; // :1142 性交中毒
  if (era.get(`talent:${cid}:33`)) ok += 1; // :1145-1146 开放
  if (era.get(`talent:${cid}:20`)) ok -= 2; // :1148-1149 克制
  if (era.get(`talent:${cid}:70`)) ok += 1; // :1151-1152 接受快感
  if (era.get(`talent:${cid}:71`)) ok -= 1; // :1154-1155 否定快感
  if (
    era.get(`talent:${cid}:75`) &&
    (era.get(`talent:${cid}:0`) || 0) === 0 &&
    (era.get(`abl:${cid}:2`) || 0) >= (era.get(`abl:${cid}:3`) || 0)
  ) {
    ok += 1; // :1157-1158 性爱狂
  }
  if (
    era.get(`talent:${cid}:77`) &&
    (era.get(`talent:${cid}:0`) ||
      (era.get(`abl:${cid}:3`) || 0) > (era.get(`abl:${cid}:2`) || 0))
  ) {
    ok += 1; // :1160-1161 尻穴狂
  }
  if (era.get(`talent:${cid}:76`) && era.get(`talent:${cid}:0`)) {
    ok += 1; // :1163-1164 淫乱（处女限定）
  }
  return ok > 0 ? ok : null; // :1165-1166
}

/**
 * @NIGHT_STALKING_CHECK（:1095-1321）：性交中毒者的夜这い。
 *
 * 两趟筛选逐字相同（:1105-1168 数合格人数 LOCAL:1、:1175-1243 按
 * `RAND:(LOCAL:1)` 抽当番），故共用 `night_ok_flag`。合格者为零即早退；
 * 选中后先打来访播报，再以事件码 5（TFLAG:13）在调教外调 SELF_KOJO，
 * 随后按「V 使用标志」二分：V 支写 EXP:0/5 + JUEL:1/4/5，肛门支写
 * EXP:1/5 + JUEL:2/4/5，PLAY = 性交中毒 + 感覚三档加成（≤4 → +1、
 * ==5 → +2、≥6 → +4）。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 1 = 有人来访、0 = 无人（原作两处 `RETURN 0`）
 */
async function night_stalking_check(rand = default_rand) {
  if (
    (era.get('talent:0:122') || 0) === 0 &&
    (era.get('talent:0:121') || 0) === 0
  ) {
    return 0; // :1101-1102 主人が男人でないとダメ
  }

  const pool = [];
  for (const cid of era.getAddedCharacters()) {
    if (cid === 0) {
      continue;
    }
    const ok = night_ok_flag(cid);
    if (ok !== null) pool.push(cid);
  }
  if (pool.length === 0) {
    return 0; // :1170-1171 SIF LOCAL:1 == 0
  }

  let index = rand(pool.length); // :1173 LOCAL:2 = RAND:(LOCAL:1)
  const target = pool[index]; // 恒 < pool.length，无需再扫一遍
  index = 0;

  const name = chara_callname(target);
  era.print(
    `调教结束后，${chara_nickname(0)}正准备上床就寝，${name}突然跑到房间里来。`,
  ); // :1245
  await era.waitAnyKey(); // :1246 WAIT

  era_flag.target = target; // :1249 TARGET = NIGHT_TARGET
  await game.train.with_self_kojo_event(5, () =>
    self_kojo(rand, undefined, true),
  ); // :1250-1251 TFLAG:13 = 5 / CALL SELF_KOJO

  // :1254-1269 Ｖ使用フラグ（男人 / 处女 / 贞操带 / 贞操封印 / A 感覚压过 V
  // 任一成立即走肛门支）
  let use_v = 1;
  if (era.get(`talent:${target}:122`)) use_v = 0;
  if (era.get(`talent:${target}:0`)) use_v = 0;
  if (
    (era.get(`cflag:${target}:42`) || 0) === 79 &&
    ((era.get(`cflag:${target}:40`) || 0) & 64) !== 0
  ) {
    use_v = 0;
  }
  if (era.get(`talent:${target}:273`)) use_v = 0;
  if ((era.get(`abl:${target}:2`) || 0) < (era.get(`abl:${target}:3`) || 0)) {
    use_v = 0;
  }

  // :1272/:1296 セックス回数（两支共用 ABL:30 作基数）
  let play = era.get(`abl:${target}:30`) || 0;
  const sense = use_v === 1 ? 2 : 3; // V 感覚 / 肛门感覚
  const sense_value = era.get(`abl:${target}:${sense}`) || 0;
  if (sense_value <= 4) play += 1;
  else if (sense_value === 5) play += 2;
  else if (sense_value >= 6) play += 4;

  if (use_v === 1) {
    // :1282-1293 膣内
    era.print(
      `想${chara_nickname(0)}抱抱，一直无可救药地想着你，子宫想你想得发疼，乞求着你的宠爱……`,
    );
    era.print(`${play}次交合之后，两人相拥而眠，深深沉睡了。`);
    era.print(`${era.get('expname:0') ?? ''}＋${play}`);
    era.print(`${era.get('expname:5') ?? ''}＋${play}`);
    chara(target).dungeon.私处经验 += play; // :1286
    chara(target).dungeon.性交经验 += play; // :1287
    era.print(`${era.get('palamname:1') ?? ''}点数＋${play * 400}`);
    era.print(`${era.get('palamname:4') ?? ''}点数＋${play * 250}`);
    await era.printAndWait(
      `${era.get('palamname:5') ?? ''}点数＋${play * 250}`,
    );
    era.add(`juel:${target}:1`, play * 400); // :1291
    era.add(`juel:${target}:4`, play * 250); // :1292
    era.add(`juel:${target}:5`, play * 250); // :1293
  } else {
    // :1305-1316 肛門
    era.print(
      `想${chara_nickname(0)}抱抱，一直无可救药地想着你，肛门想你想得发疼，乞求着你的宠爱……`,
    );
    era.print(`${play}次交合之后，两人相拥而眠，深深沉睡了。`);
    era.print(`${era.get('expname:1') ?? ''}＋${play}`);
    era.print(`${era.get('expname:5') ?? ''}＋${play}`);
    chara(target).dungeon.肛门经验 += play; // :1309
    chara(target).dungeon.性交经验 += play; // :1310
    era.print(`${era.get('palamname:2') ?? ''}点数＋${play * 400}`);
    era.print(`${era.get('palamname:4') ?? ''}点数＋${play * 250}`);
    await era.printAndWait(
      `${era.get('palamname:5') ?? ''}点数＋${play * 250}`,
    );
    era.add(`juel:${target}:2`, play * 400); // :1314
    era.add(`juel:${target}:4`, play * 250); // :1315
    era.add(`juel:${target}:5`, play * 250); // :1316
  }

  era.drawLine(); // :1319-1321
  return 1; // :1319-1321
}

/**
 * @DOG_WALK（:1325-1462）：遛狗。
 *
 * 当番选取按**加入序下标**（`DOG_WALKING = RAND:(CHARANUM - 1)`，取
 * 0..CHARANUM-2——加入序最后一个角色永远不会被随机选中，上游如此），
 * 再经三条调整守卫退回 0 号位（魔王自己带狗散步）。选出后按
 * `PLAY = 兽奸中毒 + 牝犬×2 + 动物耳 + 喜欢动物` 与
 * `OPEN = -2 + 露出癖 + 露出狂 + 爱表现` 决定交尾/口交/耻情三支。
 *
 * 原作 `%SAVESTR:TARGET%` 的读法：`TARGET = DOG_WALKING` 后由
 * SAVESTR/服装两处消费，尾部 `TARGET = SAVE_TARGET` 还原——ere 侧同样
 * 在体内改 `era_flag.target` 再还原（本轮内改、轮末还原，可见范围与原作
 * 一致）。NO_SEX（处女/私处封印/贞操带）与 !NO_SEX 的两支只差「交尾 vs
 * 口交」，经验/珠的写法各不相同。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0 = 魔王自己散步或没道具（原作两处 `RETURN 0`），
 *   1 = 奴隶带狗散步
 */
async function dog_walk(rand = default_rand) {
  if (!has_item(22)) {
    return 0; // :1335-1336 いぬを持ってないとダメ
  }

  const save_target = era_flag.target; // :1338 SAVE_TARGET = TARGET
  const list = era.getAddedCharacters();
  let walking = list.length - 1; // :1341 DOG_WALKING = CHARANUM - 1（下标）
  if (walking === 0) {
    // :1343-1347 奴隷がいなければ你が散歩
    era.print('');
    await era.printAndWait('你带了野狗去散步。'); // %SAVESTR:0% = 魔王
    return 0;
  }
  walking = rand(walking); // :1348（下标 0..CHARANUM-2）

  const picked = () => list[walking];
  // :1351-1359 三条调整守卫：不满足「已陷落且待机」就退回 0 号位。原作写成
  // 三个 ELSEIF，第三支的判据（CFLAG:0 == 0）与第一支同侧重复，并集即
  // 「CFLAG:1 != 0 或 CFLAG:0 == 0」——按并集写，不构造重复支。
  if (
    walking !== 0 &&
    ((era.get(`cflag:${picked()}:1`) || 0) !== 0 ||
      (era.get(`cflag:${picked()}:0`) || 0) === 0)
  ) {
    walking = 0;
  }
  era.print(''); // :1360 PRINTL

  const cid = picked();
  era_flag.target = cid; // :1362 TARGET = DOG_WALKING

  let play = 0; // :1365 興奮度
  let open = -2; // :1367 露出要素（若干の抵抗あり）
  let no_sex = 0; // :1369 V禁止

  play += era.get(`abl:${cid}:39`) || 0; // :1372 兽奸中毒
  if (era.get(`talent:${cid}:136`)) play += 2; // :1374-1375 牝犬
  open += era.get(`abl:${cid}:17`) || 0; // :1378 露出癖
  if (era.get(`talent:${cid}:89`)) open += 1; // :1380-1381 露出狂
  if (era.get(`talent:${cid}:28`)) open += 1; // :1383-1384 目立ちたがり
  if (era.get(`talent:${cid}:124`) && play > 0) play += 1; // :1388-1389 動物耳
  if ((era.get(`talent:${cid}:317`) || 0) === 12 && play > 0) play += 1; // :1391-1392

  if (era.get(`talent:${cid}:0`)) {
    no_sex = 1; // :1394-1396 処女
  } else if (era.get(`talent:${cid}:273`)) {
    no_sex = 1; // :1397-1399 処女封印
  } else if (
    (era.get(`cflag:${cid}:42`) || 0) === 79 &&
    ((era.get(`cflag:${cid}:40`) || 0) & 64) !== 0 &&
    era.get('flag:37')
  ) {
    no_sex = 1; // :1400-1402 貞操帯
  }

  if (walking !== 0) {
    // :1405-1412 服（原作 PRINT 不换行三连，拼成一行）
    const name = chara_callname(cid);
    const collar =
      play > 0 ? '好像自己散步似地，戴上项圈，四脚爬爬地出去了。' : '';
    era.print(`${clothtype_text(cid)}的${name}${collar}和野狗一起散了散步。`);
  }

  if (play > 0 && no_sex === 0) {
    // :1414-1432 交尾
    era.print(`${chara_callname(cid)}在散步途中无可忍耐地发情了，`);
    era.print(
      `${open > 0 ? '一边向路人展示着痴态，' : ''}一边引诱着野狗进行了交配。`,
    );
    era.print(`${era.get('expname:56') ?? ''}+1`);
    era.print(`${era.get('palamname:0') ?? ''}点数+${5 * play}`);
    era.print(`${era.get('palamname:5') ?? ''}点数+${5 * play}`);
    chara(cid).dungeon.兽奸经验 += 1; // :1423 EXP:DOG_WALKING:56 += 1
    era.add(`juel:${cid}:0`, 5 * play); // :1424
    era.add(`juel:${cid}:5`, 5 * play); // :1425
    era.print(`${era.get('expname:5') ?? ''}+1`); // :1427
    era.print(`${era.get('expname:0') ?? ''}+1`); // :1428
    era.print(`${era.get('palamname:1') ?? ''}之珠+${4 * play}`); // :1429
    era.add(`juel:${cid}:1`, 4 * play); // :1430
    chara(cid).dungeon.性交经验 += 1; // :1431
    chara(cid).dungeon.私处经验 += 1; // :1432
  } else if (play > 0 && no_sex === 1) {
    // :1433-1450 交尾無し（口交）
    era.print(`${chara_callname(cid)}在散步途中无可忍耐地发情了，`);
    era.print(
      `${open > 0 ? '一边向路人展示着痴态，' : ''}一边帮野狗口交起来了。`,
    );
    era.print(`${era.get('expname:56') ?? ''}+1`);
    era.print(`${era.get('palamname:5') ?? ''}点数+${5 * play}`);
    chara(cid).dungeon.兽奸经验 += 1; // :1441
    era.add(`juel:${cid}:5`, 5 * play); // :1442
    era.print(`${era.get('expname:22') ?? ''}+1`); // :1445
    era.print(`${era.get('expname:20') ?? ''}+1`); // :1446
    chara(cid).dungeon.口交经验 += 1; // :1447
    chara(cid).dungeon.精液经验 += 1; // :1448
  }

  if (play > 0 && open > 0) {
    // :1452-1455 露出した場合恥情点数
    await era.printAndWait(`${era.get('palamname:8') ?? ''}点数+${5 * play}`);
    era.add(`juel:${cid}:8`, 5 * play);
  } else {
    await era.waitAnyKey(); // :1457
  }

  era_flag.target = save_target; // :1460 TARGET = SAVE_TARGET
  return 1; // :1462-1464
}

/**
 * @ONESHO（:703-806）：【漏尿癖】持有者的尿床检查（晨间三事件之二）。
 *
 * 准入掷：`TALENT:57 == 1 && RAND:12 <= EXP:31/10 + TALENT:132*2`——左值
 * 为真才掷（`&&` 短絡，operators 章），故未持【漏尿癖】者不消耗随机序列。
 * 命中后按「尿道导管」二分：装备判定 = 特別服装 98/99 + CFLAG:40 位 64 +
 * 着衣开关 FLAG:37 + 角色状态 < 2（:712-715），内层再按顺从（ABL:10）
 * 分 <3 / <6 / 其余三档。无导管支走洗濯两连（调教外通道 `in_train: false`）
 * 与围观报告（露+抖M ≥ 8，人数 ≥ 3 换文案）。
 *
 * **L 的初值（有意偏差，写明理由）**：原作导管支的四处 `JUEL:L:8/9/4` 用的
 * 是全局 L，而本函数自始至终没有给 L 赋值——它在实机里是上一个调用者留下
 * 的值（紧邻的 @MORNING_FELLATIO 会写 L），在 EreElectron 侧没有跨函数
 * 残留的全局量（#5 决议：A-Z 按 JS 局部处理）。本移植取 Emuera 的**初值 0**
 * （即 0 号位，魔王），不复刻残留，也不擅自改成 COUNT（那是替原作改行为）。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 恒 1（原作 :804-806）
 */
async function onesho(rand = default_rand) {
  for (const cid of era.getAddedCharacters()) {
    if (
      (era.get(`talent:${cid}:57`) || 0) !== 1 ||
      rand(12) >
        Math.floor((era.get(`exp:${cid}:31`) || 0) / 10) +
          (era.get(`talent:${cid}:132`) || 0) * 2
    ) {
      continue; // :705
    }
    if ((era.get(`base:${cid}:0`) || 0) <= 0) {
      continue; // :707-708 死んでたらダメ
    }
    era.drawLine(); // :708-709

    const name = chara_callname(cid);
    const palam = (n) => era.get(`palamname:${n}`) ?? '';
    const special = era.get(`cflag:${cid}:42`) || 0;
    const catheter =
      (special === 99 || special === 98) &&
      ((era.get(`cflag:${cid}:40`) || 0) & 64) !== 0 &&
      era.get('flag:37') &&
      (era.get(`cflag:${cid}:1`) || 0) < 2; // :712-715

    if (catheter) {
      const loyalty = era.get(`abl:${cid}:10`) || 0;
      if (loyalty < 3) {
        // :719-735 一档：毫无察觉
        era.print(`装上了尿道导管，一晚上，毫无察觉的漏尿了的${name}，`);
        era.print(
          `不可思议的并不会十分肮脏，但实在羞愧难当，穿好衣服后对${chara_nickname(0)}愤怒的瞪了一眼。`,
        );
        switch (rand(4)) {
          case 0: // :723-725
            era.print(`${palam(8)}点数＋10`);
            era.add('juel:0:8', 10);
            break;
          case 1: // :726-728
            era.print(`${palam(8)}点数＋20`);
            era.add('juel:0:8', 20);
            break;
          case 2: // :729-731
            era.print(`${palam(9)}点数＋10`);
            era.add('juel:0:9', 10);
            break;
          default: // :732-734
            era.print(`${palam(9)}点数＋20`);
            era.add('juel:0:9', 20);
            break;
        }
      } else if (loyalty < 6) {
        // :736-738 二档：察觉到但不在意（无结算）
        era.print(`装上了尿道导管，一不小心的漏尿了，并察觉到了的${name}，`);
        era.print('发现并没弄脏什么东西，于是便不在意了。');
      } else {
        // :739-773 三档：安睡
        era.print(`${name}因为装上了尿道导管，一晚上都睡得非常好，`);
        era.print(
          '虽然有漏尿过的感觉，蛋多亏了把导管前端放进了房间里没有什么用的容器中',
        );
        era.print('早上起床时一点脏污都没有。');
        if (
          (era.get(`talent:${cid}:72`) || 0) === 1 ||
          (era.get(`talent:${cid}:80`) || 0) === 1 ||
          (era.get(`talent:${cid}:88`) || 0) === 1 ||
          (era.get(`talent:${cid}:89`) || 0) === 1
        ) {
          if ((era.get(`talent:${cid}:60`) || 0) === 1) {
            // :748-755 容易自慰：坦白 + 自慰经验 + 侍奉快乐/羞耻
            era.print(`${name}向${chara_nickname(0)}坦白了尿床的事，`);
            era.print('以及那之后，因为导管特有的瘙痒感，用导管自慰了的事。');
            era.print(`${era.get('expname:10') ?? ''}＋1`);
            await era.printAndWait(`${palam(5)}点数＋800`);
            await era.printAndWait(`${palam(8)}点数＋800`);
            chara(cid).dungeon.自慰经验 += 1; // :753 EXP:COUNT:10 += 1
            era.add(`juel:${cid}:5`, 800); // :754
            era.add(`juel:${cid}:8`, 800); // :755
          } else {
            // :756-759 报告 + 羞耻
            era.print(
              `${name}向${chara_nickname(0)}报告了尿床了的事，脸上染上了羞愧的深色。`,
            );
            await era.printAndWait(`${palam(8)}点数＋300`);
            era.add(`juel:${cid}:8`, 300); // :759
          }
        }
        switch (rand(3)) {
          case 0: // :763-765
            era.print(`${palam(4)}点数＋10`);
            era.add('juel:0:4', 10);
            break;
          case 1: // :766-768
            era.print(`${palam(4)}点数＋20`);
            era.add('juel:0:4', 20);
            break;
          default: // :769-771
            era.print(`${palam(4)}点数＋30`);
            era.add('juel:0:4', 30);
            break;
        }
      }
    } else {
      // :780-803 无导管（原作 :778 注释「元々あった記述」）
      era.print(`${name}尿床了……`); // :781
      chara(cid).system.放尿经验 += 1; // :782 EXP:COUNT:31 += 1
      era.print(`${era.get('expname:31') ?? ''}＋1`); // :783
      era_flag.target = cid; // :785 TARGET = COUNT
      // :786-787 汚れた衣類の洗濯（调教外通道：soiling 的返回值喂给
      // aftertrain_cloth 的 soiled_mask，见 cloth.js 文件头）
      const mask = await soiling_cloth_no1(cid, { in_train: false });
      await aftertrain_cloth(cid, mask);
      if ((era.get(`cflag:${cid}:1`) || 0) !== 0) {
        continue; // :789-790 魔王部屋にいないとダメ
      }
      if (
        (era.get(`abl:${cid}:17`) || 0) + (era.get(`abl:${cid}:21`) || 0) >=
        8 // :792 露出 + 抖M气质
      ) {
        era.print(`关于自己尿床的事${name}`); // :793 PRINTFORM（不换行）
        if (era.getAddedCharacters().length >= 3) {
          era.print('在早餐桌上向大家坦白了。'); // :795
        } else {
          era.print('来向你报告了。'); // :797
        }
        await era.printAndWait(`${palam(8)}点数＋1000`); // :799
        era.add(`juel:${cid}:8`, 1000); // :800
      }
    }
  }
  return 1; // :804-806
}

/**
 * @MORNING_FELLATIO（:533-698）：朝フェラ（晨间口交）。
 *
 * 两趟筛选逐字相同（:575-617 数合格人数 F、:624-672 按 `RAND:F` 抽当番），
 * 故共用 `fellatio_aptitude`。主人须为男人或扶她（:535）；无人合格（F == 0）
 * 或当番未定（L == 0，原作注释「セルフフェラ発生を防止」）即早退。
 *
 * 原作 :538-572 的「朝フェラ係が決まっている場合」整段是注释态，不构造。
 * 选中后写 A（当番的适性值）到 EXP:22/20 与 JUEL:4/6/7，最后以事件码 3
 * （TFLAG:13）在调教外调 SELF_KOJO。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 1 = 有人侍奉（原作 `RETURN 1`），0 = 未发生
 */
async function morning_fellatio(rand = default_rand) {
  if (
    (era.get('talent:0:122') || 0) === 0 &&
    (era.get('talent:0:121') || 0) === 0
  ) {
    return 0; // :535-536 主人が男人でないとダメ
  }

  const candidates = [];
  for (const cid of era.getAddedCharacters()) {
    if (cid === 0) {
      continue; // :575 REPEAT CHARANUM 的 0 号位（魔王本人不侍奉）
    }
    const aptitude = fellatio_aptitude(cid);
    if (aptitude !== null) {
      candidates.push({ cid, aptitude });
    }
  }
  if (candidates.length === 0) {
    return 0; // :619-620 SIF F == 0
  }

  let e = rand(candidates.length); // :622 E = RAND:F
  let chosen = null;
  for (const candidate of candidates) {
    if (e === 0) {
      chosen = candidate; // :664-666 L = COUNT / BREAK
      break;
    }
    e -= 1; // :667-669
  }
  if (chosen === null) {
    return 0; // :675-676 セルフフェラ発生を防止
  }

  const { cid: l, aptitude: a } = chosen;
  const name = chara_callname(l);
  era.drawLine(); // :679-680
  await era.printAndWait(`早上，在${name}的口交中醒来。`); // :680
  chara(l).dungeon.口交经验 += a; // :681 EXP:L:22 += A
  era.print(`${era.get('expname:22') ?? ''}＋${a}`); // :682
  chara(l).dungeon.精液经验 += Math.floor(a / 2); // :683 EXP:L:20 += A/2
  era.print(`${era.get('expname:20') ?? ''}＋${Math.floor(a / 2)}`); // :684
  era.print(`${name}带着淫媚的笑容，抬起沾满精液的脸，进行了上午的问候。`); // :685
  era.print(`${era.get('palamname:4') ?? ''}点数＋${a * 100}`); // :686
  era.print(`${era.get('palamname:6') ?? ''}点数＋${a * 30}`); // :687
  await era.printAndWait(`${era.get('palamname:7') ?? ''}点数＋${a * 40}`); // :688
  era.add(`juel:${l}:4`, a * 100); // :689
  era.add(`juel:${l}:6`, a * 30); // :690
  era.add(`juel:${l}:7`, a * 40); // :691

  era_flag.target = l; // :694 TARGET = L
  await game.train.with_self_kojo_event(3, () =>
    self_kojo(rand, undefined, true),
  ); // :695-696 TFLAG:13 = 3 / CALL SELF_KOJO

  return 1; // :698-699
}

/**
 * @MAOU_KOUHO（:2430-2451）：魔王候补的确定。
 *
 * **净效果 = 最后一个持有 EX_TALENT:n:3（候补标记）的角色**，与好感度无关。
 * 证明：外层 `FOR COUNT, 1, CHARANUM` 每命中一名候补就把 TEMP 重置成自己，
 * 内层重扫（`$MAOUCHANGE` / `FOR TEMPMAOU, TEMP, CHARANUM`）只在找到
 * `CFLAG:TEMPMAOU:2` 更大的候补时把 TEMP 往**更靠后**的候补上挪——于是每次
 * 外层迭代的终点都落在「该候补及其之后的最大者」，而最后一次迭代的候补身后
 * 再无候补，TEMP 必然停在自己身上。内层重扫因此不构造（#405 event-sabbath
 * 「可证死代码不构造」同款；它是原作拿来比较好感度的写法，实际不可达）。
 *
 * 0 号位（魔王）不在候选面内（`FOR COUNT, 1, CHARANUM`）。
 */
function maou_kouho() {
  let temp = 0; // #DIM TEMP = 0
  for (const cid of era.getAddedCharacters()) {
    if (cid === 0) {
      continue; // :2434 FOR COUNT, 1, CHARANUM
    }
    if (era.get(`ex_talent:${cid}:3`)) {
      temp = cid; // :2435-2436
    }
  }
  if (temp) {
    era_exflag.next_maou = temp; // :2450-2451 SIF TEMP / EX_FLAG:3 = TEMP
  }
}

/**
 * @SENGEN_VIDEO_DE（INVASION.ERB:1269-1281）：水晶球投放的每日结算。
 *
 * 流行过时倒计时必减 1；另有 2/3 概率让流行度减 1（`SIF RAND:3` 是非零即
 * 真，RAND:3 取值 0..2）。任一降到 0 以下即两者清零——原作写了**两段同款
 * 的 IF**（:1274-1277 与 :1278-1281），第二段在多数情况下只是重写同一对值，
 * 1:1 保留（#14 的登记对象，不擅自合并）。
 *
 * 无输出、无交互、零 CALL；原作 EVENT_NEXTDAY.ERB:184 无条件每日调用，
 * 调用点在 run_event_nextday 的 :184。
 *
 * @param {(n: number) => number} [rand] 随机源（RAND:3 的上界）
 */
function sengen_video_de(rand = default_rand) {
  era_exflag.crystal_ball_expire = era_exflag.crystal_ball_expire - 1; // :1271
  if (rand(3)) {
    era_exflag.crystal_ball_popularity = era_exflag.crystal_ball_popularity - 1; // :1272-1273
  }
  if (era_exflag.crystal_ball_expire <= 0) {
    // :1274-1277
    era_exflag.crystal_ball_expire = 0;
    era_exflag.crystal_ball_popularity = 0;
  }
  if (era_exflag.crystal_ball_popularity <= 0) {
    // :1278-1281
    era_exflag.crystal_ball_expire = 0;
    era_exflag.crystal_ball_popularity = 0;
  }
}

/**
 * @MAOU_TENSHIN（:2455-2479）：魔王替换（旧魔王倒下后由候补继位）。
 *
 * **`MASTER = GETCHARA(17)`（:2463）的 ere 等价物是 `swap_chara(0, cid)`**：
 * 本项目的 MASTER 不是变量而是常量约定（恒角色 0，CONTEXT.md），「魔王换成
 * 另一个人」只能靠把身体数据换进 0 号槽来表达——这正是 TRANSFER_SOUL 的手法
 * （chara-soul-transfer.js 的 `swap_chara(0, cid)` 同款），ELSE 支走的就是它。
 *
 * 两处由该等价物带出的落点（都在注释里写明，不是漏移植）：
 *   - `EX_FLAG:0 = MASTER`（:2459）记的是「旧魔王身体所在的槽位」。原作里
 *     那是 0（指针改指 17 后旧魔王仍在 0 号位），ere 侧互换后旧魔王的身体落在
 *     cid 上，故写 cid——CHARA_INFO 的排名循环拿它剔除旧魔王（COUNT ==
 *     EX_FLAG:0），写 0 会剔掉刚继位的新魔王；
 *   - 紧随其后的 `EX_TALENT:(EX_FLAG:3):200 = 1`（魔王标记）与 `:3 = 0`
 *     （候补标记）在互换**之后**写 0 号位：互换已把候补的数据换进 0 号槽，
 *     原作的 `(EX_FLAG:3)` 指的就是「刚成为魔王的这个人」。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（透传给 TRANSFER_SOUL；
 *   本函数自身不掷随机）
 * @returns {Promise<void>}
 */
async function event_maou_tenshin(rand = default_rand) {
  const candidate = era_exflag.next_maou;
  if (candidate === get_chara(17)) {
    era_exflag.prev_maou = candidate; // :2459（见文件头）
    era.add(
      `maxbase:${candidate}:0`,
      Math.floor((era.get('maxbase:0:0') || 0) / 3),
    ); // :2461
    era.add(
      `maxbase:${candidate}:1`,
      Math.floor((era.get('maxbase:0:1') || 0) / 3),
    ); // :2462
    swap_chara(0, candidate); // :2463 MASTER = GETCHARA(17)
    era_exflag.prestige -= 30; // :2464
    era.set('ex_talent:0:200', 1); // :2465 新魔王的【魔王】标记
    era.set('ex_talent:0:3', 0); // :2466 候补标记清除
    for (const cid of era.getAddedCharacters()) {
      // :2467-2473 FOR COUNT, 0, CHARANUM（含 0 号位）
      chara(cid).chara.好感度 = 0;
      if (era.get(`talent:${cid}:85`)) {
        chara(cid).stronghold.爱慕 = 0;
      }
      if (era.get(`talent:${cid}:86`)) {
        era.set(`talent:${cid}:86`, 0);
      }
    }
  } else {
    era.set(`ex_talent:${candidate}:3`, 0); // :2475
    await transfer_soul(candidate, 1, rand); // :2476 CALL TRANSFER_SOUL, EX_FLAG:3, 1
    era_exflag.prestige -= 15; // :2477
  }
}

/**
 * @EVENT_MAZOKU（:470-498）：恶魔器官四件齐后的种族魔族化。
 *
 * 两支共用「原种族 = 种族、种族 = 9（魔族）」；分岔在素质与播报：
 * 欲望（ABL:11）≥ 3 → 现种族按【淫乱】二选一（152 魅魔 / 132 小恶魔）并给
 * 【魅惑】【诱惑】；否则现种族 = 140（下等恶魔）并给【混乱】（原作行内文本
 * 写「铠破坏」，数值落 TALENT:482——素质编号即事实，文本照抄不校）。
 * 持有【魂缚】（274）者在入口早退，不做任何改造（:471-472）。
 *
 * @param {number} cid 角色 ID（原作循环里的 TARGET）
 */
async function event_mazoku(cid) {
  if (era.get(`talent:${cid}:274`)) {
    return; // :471-472 SIF TALENT:魂缚 / RETURN
  }

  const name = chara_callname(cid);
  chara(cid).chara.原种族 = era.get(`talent:${cid}:314`) || 0; // :474

  if ((era.get(`abl:${cid}:11`) || 0) >= 3) {
    // :476 淫乱ならサキュバス（152）、それ以外はナイトガール（132）
    const race = era.get(`talent:${cid}:76`) ? 152 : 132;
    chara(cid).chara.现种族 = race;
    chara(cid).chara.种族 = 9; // :477
    chara(cid).chara.魅惑 = 1; // :478
    chara(cid).chara.诱惑 = 1; // :479
    await era.printAndWait('全身充满了浓厚的魔力………'); // :480
    await era.printAndWait(`${name}被深度改造，舍弃了原来的种族，`); // :481
    // ・ 与插值分段拼接：整串豁免只认「字面量整体」，模板串里的插值会把它切碎
    await era.printAndWait(
      '成为出色的【魔族・' + (era.get(`itemname:${race}`) ?? '') + '】了。',
    ); // :482
    await era.printAndWait(
      `${name}的肉体上散发出致命的诱惑，获得了【${talent_name(91)}】……`,
    ); // :483
    await era.printAndWait(
      `${name}学会了如何用自己的肉体作为武器。获得了【${talent_name(481)}】。`,
    ); // :484
    era.print(''); // :484-485 PRINTFORML（空行）
  } else {
    chara(cid).chara.现种族 = 140; // :488 インプ
    chara(cid).chara.种族 = 9; // :489
    era.set(`talent:${cid}:482`, 1); // :490
    await era.printAndWait('全身充满了浓厚的魔力………'); // :491
    await era.printAndWait(`${name}被深度改造，舍弃了原来的种族，`); // :492
    await era.printAndWait(
      '成为出色的【魔族・' + (era.get('itemname:140') ?? '') + '】了。',
    ); // :493
    await era.printAndWait(
      `${name}学会了如何破坏敌人防护。获得了【${talent_name(482)}】。`,
    ); // :494
    era.print(''); // :494-495 PRINTFORML（空行）
  }

  await era.waitAnyKey(); // :498
}

/**
 * @EVENT_MORASI（:390-395）：漏尿癖取得。
 *
 * @param {number} cid 角色 ID（原作循环里的 TARGET）
 */
async function event_morasi(cid) {
  const name = chara_callname(cid);
  era.print(`当晚，${name}尿床了…`); // :391
  era.print(`${name}获得了【${talent_name(57)}】。`); // :392
  era.set(`talent:${cid}:57`, 1); // :393
  await era.waitAnyKey(); // :395
}

/**
 * @EVENT_YOUJI 清空的素质序号（原作 :405-456 的 13 个独立 `IF TALENT:n`
 * 块，逐个守卫「有才清」，故表驱动与逐块展开等价）。
 */
const YOUJI_CLEARED_TALENTS = [
  20, 21, 22, 24, 26, 27, 30, 32, 34, 35, 37, 55, 93,
];

/**
 * @EVENT_YOUJI（:399-465）：幼儿退行。
 *
 * 三条独立动作：13 项「严苛系」素质逐个清理（有才清 + 播报）→ 无【漏尿癖】
 * 则补上 → 【反抗刻印】清零。顺序即原作的书写顺序，播报次序可观察。
 *
 * @param {number} cid 角色 ID（原作循环里的 TARGET）
 */
async function event_youji(cid) {
  const name = chara_callname(cid);
  era.print('（呃……这是什么？）'); // :400
  await era.printAndWait(`${name}的样子有点奇怪……`); // :401
  await era.printAndWait(
    `${name}再也无法接受严厉的调教，获得了【${talent_name(131)}】…`, // :402
  );
  era.set(`talent:${cid}:131`, 1); // :403

  for (const n of YOUJI_CLEARED_TALENTS) {
    if (era.get(`talent:${cid}:${n}`)) {
      era.set(`talent:${cid}:${n}`, 0);
      era.print(`【${talent_name(n)}】消失了。`);
    }
  }

  if (!(era.get(`talent:${cid}:57`) || 0)) {
    era.set(`talent:${cid}:57`, 1); // :458
    era.print(`获得了【${talent_name(57)}】。`); // :459
  }

  chara(cid).system.反抗刻印 = 0; // :462
  era.print(`【${mark_name(3)}】变为０。`); // :463

  await era.waitAnyKey(); // :465
}

/**
 * 日程推进（原作 @EVENT_NEXTDAY，#PRI 档日推进时先于 DAY:0 += 1 调用）。
 */
async function run_event_nextday() {
  // :10-52 全角色素质变化检查（FOR NEXTDAY_COUNT, 1, CHARANUM 跳过 0 号
  // 位；行 11-12 的 SIF CONTINUE 是死代码——1 起永不为 0，照搬不模拟）
  for (const cid of era.getAddedCharacters()) {
    if (cid === 0) {
      continue;
    }

    // :16-20 不思議の根（TALENT:326 肉芽诅咒）+ 精液经验 150 以上 → 扶她化
    if (
      (era.get(`talent:${cid}:121`) || 0) === 0 &&
      (era.get(`talent:${cid}:122`) || 0) === 0
    ) {
      if (
        (era.get(`talent:${cid}:326`) || 0) === 1 &&
        (era.get(`exp:${cid}:20`) || 0) >= 150
      ) {
        await event_futa_f(cid);
      }
    }

    // :22-28 放尿经验（幼稚 15 / 一般 40）→ 漏尿癖；两支 SIF 各自独立
    if ((era.get(`talent:${cid}:57`) || 0) === 0) {
      if (
        era.get(`talent:${cid}:132`) &&
        (era.get(`exp:${cid}:31`) || 0) >= 15
      ) {
        await event_morasi(cid);
      }
      if (
        !(era.get(`talent:${cid}:132`) || 0) &&
        (era.get(`exp:${cid}:31`) || 0) >= 40
      ) {
        await event_morasi(cid);
      }
    }

    // :29-38 反抗刻印 3 + 全能力 5 → 幼儿退行（两支 ELSEIF）
    if ((era.get(`mark:${cid}:3`) || 0) === 3) {
      if (
        (era.get(`talent:${cid}:132`) || era.get(`talent:${cid}:134`)) &&
        (era.get(`abl:${cid}:11`) || 0) >= 5 &&
        (era.get(`abl:${cid}:10`) || 0) >= 5 &&
        (era.get(`abl:${cid}:21`) || 0) >= 5 &&
        (era.get(`exp:${cid}:50`) || 0) >= 5
      ) {
        await event_youji(cid);
      } else if (
        (era.get(`abl:${cid}:11`) || 0) >= 5 &&
        (era.get(`abl:${cid}:10`) || 0) >= 5 &&
        (era.get(`abl:${cid}:21`) || 0) >= 5 &&
        (era.get(`abl:${cid}:17`) || 0) >= 5 &&
        (era.get(`exp:${cid}:50`) || 0) >= 7 &&
        (era.get(`talent:${cid}:57`) || 0) === 1
      ) {
        await event_youji(cid);
      }
    }

    // :40-44 恶魔器官四件齐 → 种族魔族化
    if ((era.get(`talent:${cid}:314`) || 0) !== 9) {
      if (
        (era.get(`talent:${cid}:244`) || 0) === 1 &&
        (era.get(`talent:${cid}:245`) || 0) === 1 &&
        (era.get(`talent:${cid}:246`) || 0) === 1 &&
        (era.get(`talent:${cid}:247`) || 0) === 1
      ) {
        await event_mazoku(cid);
      }
    }

    // :47 媚药中毒 / :50 灵魂错位（无条件调用）——两者皆真身：#405 落
    // ere/event/event-addict.js 与 chara-soul-transfer.js，本票（#400）接线
    await aphrodisiac_addict(cid);
    soul_dislocation(cid);
  }

  // :55-61 排卵诱发剂效果结束（REPEAT 含 0 号位）：有效则播报 + 清零
  for (const cid of era.getAddedCharacters()) {
    if (chara(cid).stronghold.排卵诱发剂) {
      era.print(`${chara_callname(cid)}的排卵诱发剂的效果消失了。`);
      era.drawLine();
      chara(cid).stronghold.排卵诱发剂 = 0;
    }
  }

  // :64 熏香の使用回数をクリア（FLAG:61 = 0）
  game.stronghold.每日香料购买数 = 0;

  // :67 妊娠\出産\育児室関連处理
  await pregnancy_mod.ninsin_main();

  // :69-95 出産日播报（FOR LOCAL, 0, CHARANUM 含 0 号位；妊娠 153 / 育儿
  // 中 154；:75/:84/:88 的三个 CALL 是注释态，1:1 不调用——只剩分隔线）。
  // CFLAG:110 出産日の属主即 event 域（ownership/cflag-ownership.yml），域内
  // 直读；写点在妊娠系统，本处只读比较
  for (const cid of era.getAddedCharacters()) {
    if (era.get(`talent:${cid}:153`) || era.get(`talent:${cid}:154`)) {
      const name = chara_callname(cid);
      const birth_day = era.get(`cflag:${cid}:110`) || 0;
      // :72 临月前 3 日
      if (birth_day - 3 === era_flag.day_count) {
        era.drawLine();
        era.print(`${name}似乎再过几天就要生产了……`);
        // :77 出産前日
      } else if (birth_day - 1 === era_flag.day_count) {
        era.drawLine();
        era.print(`已经邻近${name}的出产日了……`);
        era.drawLine();
        // :82 出産当日（CALL CHILD_BIRTH 是注释态）
      } else if (birth_day === era_flag.day_count) {
        era.drawLine();
        // :86 出産 5 日后亲离（CALL DEPEARENT 是注释态）
      } else if (birth_day + 5 === era_flag.day_count) {
        era.drawLine();
        // :89 育儿中
      } else if (era.get(`talent:${cid}:154`)) {
        era.drawLine();
        era.print(`${name}正在哺育幼儿……`);
        era.drawLine();
      }
    }
  }

  // :97-99 着衣洗濯（原作注释态，不移植）

  // :102-111 处女献上检查（REPEAT 跳过 0 号位；SIF COUNT == 0 在这里有
  // 意义——COUNT 从 0 起）
  for (const cid of era.getAddedCharacters()) {
    if (cid === 0) {
      continue;
    }
    if (era.get(`talent:${cid}:0`)) {
      await offervirgin_check();
    }
  }

  // :114 性交中毒夜這い检查（无条件）
  await night_stalking_check();

  // :117 運営費（原作注释态，不移植）

  // :120 指輪と召喚（CURSE_EQUIP_RING #174 起真身）/ :123 召喚（参数 0）/
  // :126 设施効果（均无条件；DUNGEON_ROOM_DAY #177 起真身——商店街税入
  // 与牧场结算，九层房间表 FLAG:350-358 全 0 的世界零输出零随机消费）
  await curse_equip_ring();
  await summon_mod.summon_monster(0);
  await room_day_mod.dungeon_room_day();

  // :129-178 角色事件循环（REPEAT 跳过 0 号位）
  for (const cid of era.getAddedCharacters()) {
    if (cid === 0) {
      continue;
    }

    await pillory(); // #400 起真身（ere/event/event-nextday-pillory.js）
    await sabbath(cid); // #405 真身（event-sabbath.js），#400 接线
    await sabbath_day(cid);
    await ntr_video(cid);
    await event_video_day(cid);

    // :146-154 善恶值随机变动（KARMA 四支；:147 条件是非处女——与原作
    // 注释「处女の場合」相反，条件照搬，见文件头）
    if (!(era.get(`talent:${cid}:0`) || 0) && default_rand(3) === 0) {
      karma(cid, 1);
    }
    if ((era.get(`talent:${cid}:85`) || 0) === 1 && default_rand(3) === 0) {
      karma(cid, 1);
    }
    if (chara(cid).invasion.状态 === 2 && default_rand(3) === 0) {
      karma(cid, 1);
    }
    if (default_rand(2) === 0) {
      karma(cid, 1);
    } else {
      karma(cid, -1);
    }

    // :162-175 信仰值增减：圣女（TALENT:315 == 12，成为勇者前的生活）/
    // 神官（202）/ 巫女（206）上升；信仰不足 30 衰减；其后随机增减
    if (
      (era.get(`talent:${cid}:315`) || 0) === 12 ||
      era.get(`talent:${cid}:202`) ||
      era.get(`talent:${cid}:206`)
    ) {
      faith(cid, 1);
    } else if ((era.get(`cflag:${cid}:152`) || 0) < 30) {
      faith(cid, -1);
    } else if (default_rand(4) === 0) {
      faith(cid, 1);
    } else if (default_rand(3) === 0) {
      faith(cid, -1);
    }
  }

  // :181 税収 / :184 水晶球投放结算 / :187 确定魔王候补（均无条件）
  await tax_get(); // #396 真身（system/stronghold/tax.js），#400 接线
  sengen_video_de(); // #502 真身（本文件；INVASION.ERB:1269-1281）
  maou_kouho();

  // :189-190 RETURN 1
}

/**
 * 翌朝事件（原作 @EVENT_NEWDAY，普通档日推进回合 TIME==0 时调用）。
 *
 * 调用时机（turnend-settle.js:749-751）：#PRI 档已推进 DAY:0 += 1、TIME
 * 已归 0——本函数入口即「新游戏日开始」的语义点，自动存档（#137 / ADR-0006
 * 的有意偏离，非原作动作）挂在这里，备注里的「第N日午前」反映新的一天。
 */
async function run_event_newday() {
  // 自动存档进 99 号槽（行为边界与有意取舍见 page-save-load.js 的
  // auto_save：备注带「自动」前缀、不 push LASTSAVE_NO、无输出）
  await auto_save();

  // :200-221 影寿命循环（TALENT:292 魔王之影）：292 无写入路径，整段
  // 当前不可达——登记不占位（docs/stub-registry.md），影角色票落地时按
  // 原行号补真身（逐日 CFLAG:A:820 -1 播报、归零时 CFLAG:A:9 = 1 +
  // CALL EXECUTION_MINI 并从头重扫）

  // :226 朝フェラ（晨间事件，无条件）
  await morning_fellatio();

  // :229 誕生日（原作注释态，不移植）

  // :232 おねしょ（晨间事件，无条件）
  await onesho();

  // :235 特定日付イベント（原作注释态，不移植）

  // :238 犬の散歩（晨间事件，无条件）
  await dog_walk();

  // :241 主线剧情监测——每日一次的结局判定入口，@ENDCHECK 全链本体在
  // ere/event/event-endcheck.js（#116）
  await run_endcheck();

  // :243-244 RETURN 1
}

module.exports = {
  dog_walk,
  night_stalking_check,
  offervirgin_check,
  event_futa_f,
  onesho,
  morning_fellatio,
  event_maou_tenshin,
  maou_kouho,
  running_cost,
  sometimes_she_comes_back,
  event_mazoku,
  event_morasi,
  event_youji,
  run_event_nextday,
  run_event_newday,
  sengen_video_de,
  STUBBED_CALLS,
};
