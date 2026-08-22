/**
 * @file 日程推进 @EVENT_NEXTDAY 与翌朝事件 @EVENT_NEWDAY（issue #115：
 * 日循环的日程窄路径——EVENT_NEXTDAY.ERB 共 2,478 行，本文件只落侵略线
 * 必经的那条窄路径，判界依据 docs/research/ending-paths.md 第四节）。
 *
 * 源: target/ERB/EVENT/EVENT_NEXTDAY.ERB  @EVENT_NEXTDAY（:6-189）
 *     target/ERB/EVENT/EVENT_NEXTDAY.ERB  @EVENT_NEWDAY（:193-243）
 *
 * 调用关系（全库唯一调用点，已查实）：
 *   - @EVENT_NEXTDAY 由 #PRI 档在日推进时调用（EVENT_TURNEND.ERB:77，
 *     先于 :79 的 DAY:0 += 1）——ere/event/event-turnend.js；
 *   - @EVENT_NEWDAY 由普通档在日推进回合（TIME==0）调用（SYSTEM
 *     ver1.0.3.ERB:751）——ere/system/turnend-settle.js；
 *   - @ENDCHECK 的每日调用点在本文件 run_event_newday 尾部（:241，
 *     注释「主线剧情监测」），本体是 #116。
 *
 * 移植说明：
 *   - 窄路径 = 判断骨架与无条件写 1:1 移植（条件全部读 talent/exp/abl/
 *     mark/cflag，直读 + || 0 兜底），体外 CALL 一律存根（占位行 +
 *     docs/stub-registry.md，名单见 STUBBED_CALLS）。原作注释态的调用
 *     （:75/:84/:88/:117/:229/:235 与 :59）1:1 保持不调用。
 *   - 指针不落（#5 决议第六条）：原作循环以 TARGET/COUNT 为载体、被调
 *     函数隐式读它；ere 侧被调存根不读指针，条件判断直接以 cid 寻址，
 *     era_flag.target 不被本文件触碰（#114 的 #PRI 档同款）。
 *   - SAVESTR:x 的读数源是 callname 表（utils/callname-utils.js，本作
 *     里 = 名前）；%SAVESTR:COUNT% 播报一律 chara_callname(cid)。
 *   - @EVENT_NEWDAY 的影寿命循环（:200-221，TALENT:292 魔王之影）当前
 *     不可达（292 无写入路径）——按「登记不占位」处理（#119 KYOTEN_EVENT
 *     先例）：代码留接入注释，执行到也不输出。影角色票落地时补真身。
 *   - :146-147 原作注释「处女の場合善恶值上昇」与条件 TALENT:0 == 0
 *     （非处女）相反——条件 1:1 照搬，以注释存疑。
 */

const era = require('#/era-electron');
const { run_endcheck } = require('#/event/event-endcheck');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const era_flag = require('#/era-utils/era-flag');
const { chara_callname } = require('#/utils/callname-utils');
const { stub_line } = require('#/utils/stub-line');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。
 */
const STUBBED_CALLS = [
  'EVENT_FUTA_F',
  'EVENT_MORASI',
  'EVENT_YOUJI',
  'EVENT_MAZOKU',
  'APHRODISIAC_ADDICT',
  'SOUL_DISLOCATION',
  'NINSIN_MAIN',
  'OFFERVIRGIN_CHECK',
  'NIGHT_STALKING_CHECK',
  'CURSE_EQUIP_RING',
  'SUMMON_MONSTER',
  'DUNGEON_ROOM_DAY',
  'PILLORY',
  'SABBATH',
  'SABBATH_DAY',
  'NTR_VIDEO',
  'EVENT_VIDEO_DAY',
  'KARMA',
  'FAITH',
  'TAX_GET',
  'SENGEN_VIDEO_DE',
  'MAOU_KOUHO',
  'MORNING_FELLATIO',
  'ONESHO',
  'DOG_WALK',
];

/** 原作 RAND:N（0..N-1）的等价物 */
function rand(n) {
  return Math.floor(Math.random() * n);
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
        stub_line('EVENT_FUTA_F', '扶她化判定');
      }
    }

    // :22-28 放尿经验（幼稚 15 / 一般 40）→ 漏尿癖；两支 SIF 各自独立
    if ((era.get(`talent:${cid}:57`) || 0) === 0) {
      if (
        era.get(`talent:${cid}:132`) &&
        (era.get(`exp:${cid}:31`) || 0) >= 15
      ) {
        stub_line('EVENT_MORASI', '漏尿癖获得判定');
      }
      if (
        !(era.get(`talent:${cid}:132`) || 0) &&
        (era.get(`exp:${cid}:31`) || 0) >= 40
      ) {
        stub_line('EVENT_MORASI', '漏尿癖获得判定');
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
        stub_line('EVENT_YOUJI', '幼儿退行判定');
      } else if (
        (era.get(`abl:${cid}:11`) || 0) >= 5 &&
        (era.get(`abl:${cid}:10`) || 0) >= 5 &&
        (era.get(`abl:${cid}:21`) || 0) >= 5 &&
        (era.get(`abl:${cid}:17`) || 0) >= 5 &&
        (era.get(`exp:${cid}:50`) || 0) >= 7 &&
        (era.get(`talent:${cid}:57`) || 0) === 1
      ) {
        stub_line('EVENT_YOUJI', '幼儿退行判定');
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
        stub_line('EVENT_MAZOKU', '魔族化判定');
      }
    }

    // :47 媚药中毒 / :50 灵魂错位（无条件调用）
    stub_line('APHRODISIAC_ADDICT', '媚药中毒判定');
    stub_line('SOUL_DISLOCATION', '灵魂错位判定');
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
  stub_line('NINSIN_MAIN', '妊娠出产处理');

  // :69-95 出産日播报（FOR LOCAL, 0, CHARANUM 含 0 号位；妊娠 153 / 育儿
  // 中 154；:75/:84/:88 的三个 CALL 是注释态，1:1 不调用——只剩分隔线）。
  // CFLAG:110 出産日の属主即 event 域（ownership/cflag-ownership.yml），域内
  // 直读；写点在妊娠系统（NINSIN_MAIN 存根），本处只读比较
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
      stub_line('OFFERVIRGIN_CHECK', '处女献上检查');
    }
  }

  // :114 性交中毒夜這い检查（无条件）
  stub_line('NIGHT_STALKING_CHECK', '夜袭检查');

  // :117 運営費（原作注释态，不移植）

  // :120 指輪と召喚 / :123 召喚（参数 0）/ :126 设施効果（均无条件）
  stub_line('CURSE_EQUIP_RING', '诅咒戒指处理');
  stub_line('SUMMON_MONSTER', '怪物召唤');
  stub_line('DUNGEON_ROOM_DAY', '设施效果结算');

  // :129-178 角色事件循环（REPEAT 跳过 0 号位）
  for (const cid of era.getAddedCharacters()) {
    if (cid === 0) {
      continue;
    }

    stub_line('PILLORY', '示众台事件');
    stub_line('SABBATH', '安息日事件');
    stub_line('SABBATH_DAY', '安息日日程');
    stub_line('NTR_VIDEO', 'NTR 影像事件');
    stub_line('EVENT_VIDEO_DAY', '影像贩卖日程');

    // :146-154 善恶值随机变动（KARMA 四支；:147 条件是非处女——与原作
    // 注释「处女の場合」相反，条件照搬，见文件头）
    if (!(era.get(`talent:${cid}:0`) || 0) && rand(3) === 0) {
      stub_line('KARMA', '善恶值变动');
    }
    if ((era.get(`talent:${cid}:85`) || 0) === 1 && rand(3) === 0) {
      stub_line('KARMA', '善恶值变动');
    }
    if (chara(cid).invasion.状态 === 2 && rand(3) === 0) {
      stub_line('KARMA', '善恶值变动');
    }
    if (rand(2) === 0) {
      stub_line('KARMA', '善恶值变动');
    } else {
      stub_line('KARMA', '善恶值变动');
    }

    // :162-175 信仰值增减：圣女（TALENT:315 == 12，成为勇者前的生活）/
    // 神官（202）/ 巫女（206）上升；信仰不足 30 衰减；其后随机增减
    if (
      (era.get(`talent:${cid}:315`) || 0) === 12 ||
      era.get(`talent:${cid}:202`) ||
      era.get(`talent:${cid}:206`)
    ) {
      stub_line('FAITH', '信仰值变动');
    } else if ((era.get(`cflag:${cid}:152`) || 0) < 30) {
      stub_line('FAITH', '信仰值变动');
    } else if (rand(4) === 0) {
      stub_line('FAITH', '信仰值变动');
    } else if (rand(3) === 0) {
      stub_line('FAITH', '信仰值变动');
    }
  }

  // :181 税収 / :184 水晶球投放结算 / :187 确定魔王候补（均无条件）
  stub_line('TAX_GET', '税收结算');
  stub_line('SENGEN_VIDEO_DE', '水晶球投放结算');
  stub_line('MAOU_KOUHO', '魔王候补确定');

  // :189 RETURN 1
}

/**
 * 翌朝事件（原作 @EVENT_NEWDAY，普通档日推进回合 TIME==0 时调用）。
 */
async function run_event_newday() {
  // :200-221 影寿命循环（TALENT:292 魔王之影）：292 无写入路径，整段
  // 当前不可达——登记不占位（docs/stub-registry.md），影角色票落地时按
  // 原行号补真身（逐日 CFLAG:A:820 -1 播报、归零时 CFLAG:A:9 = 1 +
  // CALL EXECUTION_MINI 并从头重扫）

  // :226 朝フェラ（晨间事件，无条件）
  stub_line('MORNING_FELLATIO', '晨间口交事件');

  // :229 誕生日（原作注释态，不移植）

  // :232 おねしょ（晨间事件，无条件）
  stub_line('ONESHO', '尿床事件');

  // :235 特定日付イベント（原作注释态，不移植）

  // :238 犬の散歩（晨间事件，无条件）
  stub_line('DOG_WALK', '遛狗事件');

  // :241 主线剧情监测——每日一次的结局判定入口，@ENDCHECK 全链本体在
  // ere/event/event-endcheck.js（#116）
  await run_endcheck();

  // :243 RETURN 1
}

module.exports = { run_event_nextday, run_event_newday, STUBBED_CALLS };
