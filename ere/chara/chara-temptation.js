/**
 * @file 魔的诱惑：侵攻中勇者的劝降判定与结算（issue #393，N9）。
 *
 * 调用点：ere/page/page-chara-info.js 的「魔的诱惑」按钮与其动作分发。
 *
 * 移植说明（有意偏离既有写法，均注明依据）：
 *
 *   - **按钮正文不写 `[{NUM}]` 前缀**（同 chara-name-edit.js 的处置）：
 *     引擎 `printButton` 自动拼 `[快捷键] `，手写会渲染成 `[0] [0] 魔的诱惑`。
 *     判定非 0 时整段不渲染——空体判定与提前返回合写为一条，行为不变。
 *
 *   - **「文本行 ＋ 字符条」两行并成一行原生进度格**：固定 50 格的字符条
 *     没有对应通道——era 的 `printProgress` 按网格列宽排版（page-invasion.js 的
 *     `print_progress_line`、components/chara-bars.js 同款先例）。标签与
 *     数值原样进格：`好感度：{n}/1000` 的两段拆成 inContent/outContent。
 *
 *   - **双输出（成功签/失败签张数）改为返回数组**：ere 无引用传参通道，
 *     按 `[seikou, sippai]` 返回——chara-family.js 的 `family_register` / chara-body.js 的
 *     `char_age_generate` 同款（多输出的既有约定）。
 *
 *   - **担保人素质按名字表下标 290 寻址**（`yml/Talent.yml` 的 id）。
 *     全篇素质一律下标寻址（look-info.js 的头注同款）。
 *
 *   - **`MONEY` 与 `EX_FLAG:4444` 走具名访问器**（`era_flag.money` /
 *     `era_exflag.legit_money`）；跨域写经属主域门面：**三支赞助的入账
 *     并不相同**——「担保人」与「肉芽诅咒」两支给目标写 CFLAG:580，代还
 *     借款那一支**不写**（那笔钱直接抵了勇者的债，写的是 582），收尾因此
 *     拆成 `pay_sponsor()`（双资金同减，三支共用）与 `credit_partner()`
 *     （两支共用的入账）；
 *     状态 CFLAG:1 / 新人 506 / 归城 507（invasion）、气力 BASE:0:1 与
 *     所持金 CFLAG:580（dungeon）、借款 CFLAG:582（patch）、肉芽诅咒
 *     TALENT:326（stronghold）——均为跨域写下标，写一律走属主域门面。
 *
 *   - **取 1..3 / 1..2 写作 `1 + rand(3)` / `1 + rand(2)`**（随机源返回
 *     [0, n) 的整数）。`&&`/`||` 按短路求值直译——右侧未掷的骰不消耗
 *     随机序列，掷骰的次数因此逐次对应。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { select_yes_no } = require('#/page/page-life-list');
const { karma } = require('#/chara/chara-stats');
const { party_del } = require('#/dungeon/dungeon-party');
const { add_ex_item } = require('#/dungeon/ex-item');
const { chara } = require('#/facade/chara');

/** 判定返回值：不是侵攻中的勇者 */
const TEMPTATION_NOT_HERO = 1;
/** 判定返回值：狂王（CFLAG:800 == 4，无法被诱惑） */
const TEMPTATION_CRAZY_KING = 2;

/** 每次诱惑消耗的魔王气力（门槛与扣减同值） */
const TEMPTATION_MP_COST = 2000;
/** 投诚线：好感度满这个数即陷落（也是进度条的满刻度） */
const TEMPTATION_FALL = 1000;
/** 进度格的条宽（网格列数；固定 50 格的字符条没有对应通道，见文件头） */
const TEMPTATION_BAR_WIDTH = 20;

/** 担保人的援助额 */
const SPONSOR_AMOUNT = 10000;
/** 担保人素质（yml/Talent.yml 的名字表下标） */
const T_SPONSOR = 290;

function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/** 状态（CFLAG:1；invasion 域，写经门面、读可裸寻址） */
function state_of(cid) {
  return era.get(`cflag:${cid}:1`) || 0;
}

/**
 * 一行「标签 ＋ 原生进度格 ＋ 数值」（见文件头的进度格说明）。
 * @param {string} label 条内文字
 * @param {number} value 当前值
 * @param {number} max 满刻度
 */
function print_bar(label, value, max) {
  era.printMultiColumns([
    {
      type: 'progress',
      percentage: max > 0 ? Math.min(100, (100 * value) / max) : 0,
      inContent: label,
      outContent: ` ${value}/${max}`,
      config: { barWidth: TEMPTATION_BAR_WIDTH },
    },
  ]);
}

/**
 * check_able_to_temptation：勇者能否被诱惑。
 *
 * @param {number} arg 角色号
 * @returns {0|1|2} 0 = 可以；1 = 不是侵攻中的勇者；2 = 狂王
 */
function check_able_to_temptation(arg) {
  if (state_of(arg) !== 2) return TEMPTATION_NOT_HERO;
  if ((era.get(`cflag:${arg}:800`) || 0) === 4) return TEMPTATION_CRAZY_KING;
  return 0;
}

/**
 * show_button_temptation：渲染「魔的诱惑」按钮——判定非 0 一律不渲染。
 *
 * @param {number} num 按钮的快捷键编号
 * @param {number} arg 目标角色号
 */
function show_button_temptation(num, arg) {
  if (check_able_to_temptation(arg) !== 0) return;
  era.printButton('魔的诱惑\u3000', num);
}

/**
 * temptation：魅力诱惑的整场结算。
 *
 * @param {number} arg 目标角色号
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0 = 已处理；2 = 不是侵攻中的勇者（按钮本不该显示）
 */
async function temptation(arg, rand = default_rand) {
  const able = check_able_to_temptation(arg); // LOCAL
  if (able !== 0) {
    if (able === TEMPTATION_NOT_HERO) return 2; // 按钮没显示但输入仍能到达
    return 0; // （狂王那一档的收尾）
  }

  if ((chara(0).dungeon.气力 || 0) < TEMPTATION_MP_COST) {
    // 気力減衰
    era.print('*你的魔力耗尽了*');
    return 0;
  }
  chara(0).dungeon.气力 -= TEMPTATION_MP_COST;

  await temptation_try(arg, rand);
  await era.waitAnyKey(); // WAIT

  // 結果表示
  print_bar('好感度', era.get(`cflag:${arg}:2`) || 0, TEMPTATION_FALL);
  // MAXBASE:1 属 dungeon 域；门面生成器只产出了 MAXBASE:0（体力上限），
  // 这个下标仍用裸寻址（chara-dungeon.js 手写区注释同款）
  print_bar('你的魔力', chara(0).dungeon.气力, era.get('maxbase:0:1') || 0);
  await era.waitAnyKey(); // WAIT

  if ((era.get(`cflag:${arg}:2`) || 0) >= TEMPTATION_FALL) {
    // 陥落：投诚
    era.print('*勇者被你诱惑，投诚了！*');
    chara(arg).invasion.状态 = 0; // CFLAG:1 = 0
    chara(arg).invasion.新人 = 1; // CFLAG:506 = 1
    chara(arg).invasion.回城标志 = 0; // CFLAG:507 = 0
    party_del(arg);
  }

  // 函数落尾返回 0，不返回 1。
  return 0;
}

/**
 * prepare_temptation：算出成功/失败的抽签张数。
 *
 * @param {number} arg 目标角色号
 * @returns {[number, number]} `[seikou, sippai]`（双输出，见文件头）
 */
function prepare_temptation(arg) {
  // 成功の基本値（魔王等级＋三个 FLAG 加成＋勇者的经验与素质）
  let seikou = 99 + (era.get('cflag:0:9') || 0);
  seikou +=
    (era.get('flag:30') || 0) +
    (era.get('flag:31') || 0) +
    (era.get('flag:32') || 0);
  seikou += Math.trunc(
    ((era.get(`exp:${arg}:2`) || 0) +
      (era.get(`exp:${arg}:5`) || 0) +
      (era.get(`exp:${arg}:20`) || 0) +
      (era.get(`exp:${arg}:55`) || 0) +
      (era.get(`exp:${arg}:56`) || 0) +
      (era.get(`exp:${arg}:57`) || 0) +
      (era.get(`exp:${arg}:74`) || 0)) /
      3,
  );
  seikou +=
    5 *
    ((era.get(`abl:${arg}:0`) || 0) +
      (era.get(`abl:${arg}:1`) || 0) +
      (era.get(`abl:${arg}:2`) || 0) +
      (era.get(`abl:${arg}:3`) || 0));
  seikou +=
    10 * ((era.get(`abl:${arg}:10`) || 0) + (era.get(`abl:${arg}:11`) || 0));

  // 残り体力・気力の二段（最大倍率は脅威の36倍）
  seikou = times(seikou, health_factor(arg, 0));
  seikou = times(seikou, health_factor(arg, 1));

  // 失敗の基本値は勇者レベルとカルマ、刻印の効果が大
  let sippai =
    50 + (era.get(`cflag:${arg}:9`) || 0) + (era.get(`cflag:${arg}:151`) || 0); // CFLAG:151 善恶值
  sippai = Math.max(0, sippai);
  sippai *= 1 + (era.get(`mark:${arg}:3`) || 0);
  sippai = Math.trunc(
    sippai /
      Math.pow(
        1 +
          (era.get(`mark:${arg}:0`) || 0) +
          (era.get(`mark:${arg}:1`) || 0) +
          (era.get(`mark:${arg}:2`) || 0),
        2,
      ),
  );
  return [seikou, sippai];
}

/**
 * (当前值 * 100) / 上限 的整数除法（截断为整数）。
 * @param {number} arg 角色号
 * @param {0|1} index 0 = 体力、1 = 气力
 * @returns {number} 百分比（整数）
 */
function health_ratio(arg, index) {
  const value = era.get(`base:${arg}:${index}`) || 0;
  const max = era.get(`maxbase:${arg}:${index}`) || 0;
  return Math.trunc((value * 100) / max);
}

/**
 * 体力/气力残量百分比的倍率（两轴逐位同值）。
 * @param {number} arg 角色号
 * @param {0|1} index 0 = 体力、1 = 气力
 * @returns {number} 倍率
 */
function health_factor(arg, index) {
  const ratio = health_ratio(arg, index);
  if (ratio >= 75) return 1; // CASE IS >= 75：不加倍
  if (ratio >= 50) return 1.5;
  if (ratio >= 25) return 3;
  if (ratio >= 10) return 4.5;
  return 6;
}

/** 乘以小数后截断（向下取整） */
function times(value, factor) {
  return Math.floor(value * factor);
}

/**
 * fi_temptation：单轮诱惑的正否抽签。
 *
 * 判定条件按序短路，掷骰次数随之不同（见文件头）。
 *
 * @param {number} arg 目标角色号
 * @param {number} seikou 成功签张数
 * @param {number} sippai 失败签张数
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {0|1} 1 = 诱惑成功
 */
function fi_temptation(arg, seikou, sippai, rand = default_rand) {
  const ring1 = (era.get(`cflag:${arg}:551`) || 0) % 1000; // RING:1
  const ring2 = (era.get(`cflag:${arg}:552`) || 0) % 1000; // RING:2
  // [即落ち][淫乱][愛][肉便器]なら無条件で成功
  if (
    era.get(`talent:${arg}:73`) ||
    era.get(`talent:${arg}:76`) ||
    era.get(`talent:${arg}:85`) ||
    era.get(`talent:${arg}:204`)
  ) {
    return 1;
  }
  // 不幸の指輪（RING == 20）は 25％で強制成功
  if (rand(20) < 5 && (ring1 === 20 || ring2 === 20)) return 1;
  // 結界の指輪（RING == 18）は 50％で強制失敗
  if (rand(10) < 5 && (ring1 === 18 || ring2 === 18)) return 0;
  // 本抽签：成功签 / 总签
  return rand(seikou + sippai) < seikou ? 1 : 0;
}

/**
 * temptation_try：六轮诱惑判定与三次「赞助机会」。
 *
 * @param {number} arg 目标角色号
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 恒 0
 */
async function temptation_try(arg, rand = default_rand) {
  const [seikou, sippai] = prepare_temptation(arg);
  const name = era.get(`callname:${arg}:-1`) ?? ''; // callname -1 槽
  const master_lv = era.get('cflag:0:9') || 0; // CFLAG:0:9 魔王等级

  for (let num = 0; num < 6; num += 1) {
    // 誘惑判定成功
    if (fi_temptation(arg, seikou, sippai, rand)) {
      let item_failed = false; // 道具赠送失败的标志
      switch (rand(9)) {
        case 0:
          era.print(`*梦魔的快乐袭击了${name}！*`);
          era.print(`欲情点数+${master_lv * 10}`);
          add_juel(arg, 5, master_lv * 10);
          add_affection(arg, 10 * (1 + abl_sum(arg, [0, 1, 2, 3])));
          break;
        case 1:
          era.print(`*自己隐藏着的兽欲袭击了${name}！*`);
          era.print(`欲情点数+${master_lv * 5}`);
          era.print(`屈服点数+${master_lv * 2}`);
          add_juel(arg, 5, master_lv * 5);
          add_juel(arg, 6, master_lv * 2);
          add_affection(arg, 15 * (1 + abl_sum(arg, [10, 11])));
          break;
        case 2:
          era.print(`*自己心中的黑暗面袭击了${name}！*`);
          era.print(`屈服点数+${master_lv * 4}`);
          add_juel(arg, 6, master_lv * 4);
          add_affection(
            arg,
            Math.trunc(
              (10 * (1 + mark_sum(arg, [0, 1, 2]))) / (1 + mark_of(arg, 3)),
            ),
          );
          break;
        case 3:
          era.print(`*魔王的甜蜜诱惑袭击了${name}！*`);
          era.print(`屈服点数+${master_lv}`);
          add_juel(arg, 6, master_lv);
          add_affection(arg, 40);
          break;
        case 4:
          era.print(`*可以和你平分这个世界哦……*`);
          era.print(`屈服点数+${master_lv * 2}`);
          add_juel(arg, 6, master_lv * 2);
          add_affection(arg, 50);
          break;
        case 5: // 体力条按残量给好感度，再治愈体力
          add_affection(arg, heal_affection(arg, 0));
          era.print(`*魔界的波动，治愈了${name}…*`);
          era.print(`HP+${master_lv * 50}`);
          heal_base(arg, 0, master_lv * 50);
          break;
        case 6: // 气力同款
          add_affection(arg, heal_affection(arg, 1));
          era.print(`*魔界的波动，治愈了${name}的心灵…*`);
          era.print(`气力+${master_lv * 50}`);
          heal_base(arg, 1, master_lv * 50);
          break;
        default: // CASE 7, 8
          era.print(`*你赐予了${name}道具…*`);
          if ((await add_ex_item(-1, arg, 0, rand)) > 0) {
            add_affection(arg, 5);
          } else {
            item_failed = true; // 转入失败结算
          }
          break;
      }

      if (item_failed) {
        // 道具没送出去也走失败结算（掷的是 1 + rand(2)）
        era.print('诱惑被切断了！');
        karma(arg, 1 + rand(2));
      } else {
        // 籠絡され堕落していく（失败时掷的是 1 + rand(3)）
        karma(arg, -(1 + rand(3)));
      }
    } else {
      // 誘惑失敗
      era.print('诱惑被切断了！');
      karma(arg, 1 + rand(2));
    }
  }

  // 保証人チャンス！（三次机会各自一条判定条件）
  await sponsor_chances(arg, rand);

  return 0; // （保証人チャンス段落走到函数尾的收尾）
}

/**
 * 两条治愈分支共用的好感度档（体力/气力逐位同值）。
 * @param {number} arg 角色号
 * @param {0|1} index 0 = 体力、1 = 气力
 * @returns {number} 好感度增量
 */
function heal_affection(arg, index) {
  const ratio = health_ratio(arg, index);
  if (ratio >= 75) return 5;
  if (ratio >= 50) return 25;
  if (ratio >= 25) return 50;
  if (ratio >= 10) return 75;
  return 200;
}

/**
 * 加值后按上限截断（跨域写走 dungeon 门面）。
 * @param {number} arg 角色号
 * @param {0|1} index 0 = 体力、1 = 气力
 * @param {number} delta 加值
 */
function heal_base(arg, index, delta) {
  const view = chara(arg).dungeon;
  const max = index === 0 ? view.体力上限 : era.get(`maxbase:${arg}:1`) || 0;
  const next = (index === 0 ? view.体力 : view.气力) + delta;
  const capped = Math.min(next, max);
  if (index === 0) view.体力 = capped;
  else view.气力 = capped;
}

/**
 * 三次「赞助机会」：担保人援助 / 肉芽诅咒 / 代还借款。
 *
 * 三条判定条件串成一条链，第一条不命中时后面的 `rand(20)` / `rand(10)`
 * 会**再掷**（短路求值只跳过同一表达式右侧，见文件头）。
 *
 * @param {number} arg 目标角色号
 * @param {(n: number) => number} rand RAND:N 随机源
 * @returns {Promise<void>}
 */
async function sponsor_chances(arg, rand) {
  const money = era_flag.money;
  if (
    rand(20) === 0 &&
    (era.get(`talent:${arg}:${T_SPONSOR}`) || 0) === 0 &&
    money >= SPONSOR_AMOUNT
  ) {
    // 担保人でなく、あなたが LOCAL 以上のお金を持ち、1/20 の確率
    era.print(
      `*你向${era.get(`callname:${arg}:-1`) ?? ''}赞助了${SPONSOR_AMOUNT}点资金……*`,
    );
    era.print(
      `作为代价，${era.get(`callname:${arg}:-1`) ?? ''}成为了债务的担保人。`,
    );
    if ((await select_yes_no()) === 0) {
      era.print(
        `*${era.get(`callname:${arg}:-1`) ?? ''}为了钱，成为了债务的担保人了*`,
      );
      era.print(`屈服点数+${(era.get('cflag:0:9') || 0) * 2}`);
      add_juel(arg, 6, (era.get('cflag:0:9') || 0) * 2);
      add_affection(arg, 50);
      era.set(`talent:${arg}:${T_SPONSOR}`, 1);
      pay_sponsor();
      credit_partner(arg);
    }
  } else if (
    rand(20) === 0 &&
    (era.get(`talent:${arg}:121`) || 0) === 0 &&
    (era.get(`talent:${arg}:122`) || 0) === 0 &&
    money >= SPONSOR_AMOUNT
  ) {
    // オトコでもふたなりでもなく、1/20 の確率で肉芽の呪い（肉芽诅咒
    // 素质属 stronghold 域，写经门面）
    era.print(
      `*你向${era.get(`callname:${arg}:-1`) ?? ''}赞助了${SPONSOR_AMOUNT}点资金……*`,
    );
    era.print(
      `作为代价，${era.get(`callname:${arg}:-1`) ?? ''}要接受肉芽的诅咒。`,
    );
    if ((await select_yes_no()) === 0) {
      era.print(
        `*${era.get(`callname:${arg}:-1`) ?? ''}为了钱，受到了肉芽的诅咒*`,
      );
      era.print(`屈服点数+${(era.get('cflag:0:9') || 0) * 2}`);
      add_juel(arg, 6, (era.get('cflag:0:9') || 0) * 2);
      add_affection(arg, 50);
      chara(arg).stronghold.肉芽诅咒 = 1;
      pay_sponsor();
      credit_partner(arg);
    }
  } else if (
    rand(10) === 0 &&
    (era.get(`cflag:${arg}:582`) || 0) < SPONSOR_AMOUNT * -1 &&
    money >= SPONSOR_AMOUNT
  ) {
    // 借金が LOCAL 以上あり、1/10 の確率で代わりに返済
    era.print(
      `*你可以拿${SPONSOR_AMOUNT}点，来帮${era.get(`callname:${arg}:-1`) ?? ''}还债*`,
    );
    if ((await select_yes_no()) === 0) {
      era.print(
        `*${era.get(`callname:${arg}:-1`) ?? ''}还了钱，一种可怜的屈服感油然而生*`,
      );
      era.print(`屈服点数+${(era.get('cflag:0:9') || 0) * 5}`);
      add_juel(arg, 6, (era.get('cflag:0:9') || 0) * 5);
      add_affection(arg, 80);
      pay_sponsor(); // 只扣双资金，不入目标所持金
      chara(arg).patch.借款 += SPONSOR_AMOUNT; // CFLAG:582（patch 域）
    }
  }
}

/** 赞助款双资金同减（三支共用） */
function pay_sponsor() {
  era_flag.money -= SPONSOR_AMOUNT;
  era_exflag.legit_money -= SPONSOR_AMOUNT;
}

/**
 * 目标那一侧的入账：只有「担保人」与「肉芽诅咒」两支写 `CFLAG:580`；
 * 代还借款那一支**不写**——那笔钱直接抵了勇者的债（写的是 582），
 * 不进他的口袋。
 * @param {number} arg 目标角色号
 */
function credit_partner(arg) {
  chara(arg).dungeon.所持金 += SPONSOR_AMOUNT; // CFLAG:580（dungeon 域）
}

/** 一串 ABL 下标之和 */
function abl_sum(arg, indexes) {
  return indexes.reduce(
    (sum, idx) => sum + (era.get(`abl:${arg}:${idx}`) || 0),
    0,
  );
}

/** 一串 MARK 下标之和 */
function mark_sum(arg, indexes) {
  return indexes.reduce(
    (sum, idx) => sum + (era.get(`mark:${arg}:${idx}`) || 0),
    0,
  );
}

/** 单个刻印读数（MARK:n） */
function mark_of(arg, index) {
  return era.get(`mark:${arg}:${index}`) || 0;
}

/** 好感度写入（CFLAG:2） */
function add_affection(arg, delta) {
  era.set(`cflag:${arg}:2`, (era.get(`cflag:${arg}:2`) || 0) + delta);
}

/** 屈服/欲情点数写入（JUEL:n） */
function add_juel(arg, index, delta) {
  era.set(
    `juel:${arg}:${index}`,
    (era.get(`juel:${arg}:${index}`) || 0) + delta,
  );
}

module.exports = {
  show_button_temptation,
  check_able_to_temptation,
  temptation,
  temptation_try,
  fi_temptation,
  prepare_temptation,
};
