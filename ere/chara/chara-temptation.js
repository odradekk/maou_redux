/**
 * @file 魔的诱惑：侵攻中勇者的劝降判定与结算（issue #393，N9）。
 *
 * 源: target/ERB/キャラ関数/CHARA_TEMPTATION.ERB 六个函数——
 *     @SHOW_BUTTON_TEMPTATION（:4-20）、@CHECK_ABLE_TO_TEMPTATION
 *     （:23-36，#FUNCTION 式中函数）、@TEMPTATION（:39-86）、
 *     @TEMPTATION_TRY（:202-364）、@FI_TEMPTATION（:373-397，#FUNCTION）、
 *     @PREPARE_TEMPTATION（:404-447，#DIM REF 双输出）。
 *
 * 调用点：原作 CHARA_INFO ver1.0.1.ERB:861（按钮）与 :1054（CASE 3 动作），
 * 已接在 ere/page/page-chara-info.js。
 *
 * **`@TEMPTATION_TRY` 在这个文件里出现两次，不是重定义。** 第一份
 * （:90-197）整段包在 `[SKIPSTART]`～`[SKIPEND]` 之间，Emuera 的预处理
 * 指令把整段的装载整个跳过（技能手册 references/core-concepts/preprocessor.md
 * :61-69「`[SKIPSTART]` 到 `[SKIPEND]` 之间的所有行不会被执行」），所以
 * 引擎里只有 :202 那一份定义。移植照此只落第二份；第一份的差异（固定
 * `RAND:10` 档位表、`TALENT:ARG:290` 的旧写法）不构成行为面。
 *
 * 移植说明（有意偏离，均注明依据）：
 *
 *   - **按钮正文不写 `[{NUM}]` 前缀**（同 chara-name-edit.js 的处置）：
 *     引擎 `printButton` 自动拼 `[快捷键] `，手写会渲染成 `[0] [0] 魔的诱惑`。
 *     `:11-13` 的空体 `IF LOCAL != 2`（评分支）与 `:14-19` 合并为一条
 *     「非 0 即不渲染」——两支的返回一致（都 RETURN 0），合并后行为不变。
 *
 *   - **`BARL x,max,50` 的两行（文本行 ＋ 条）并成一行原生进度格**：
 *     字符条的 50 格长度是 Emuera 的文本排版，era 的 `printProgress` 按
 *     网格列宽排版，没有「50 格」这个通道（page-invasion.js 的
 *     `print_progress_line`、components/chara-bars.js 同款先例）。标签与
 *     数值原样进格：`好感度：{n}/1000` 的两段拆成 inContent/outContent。
 *
 *   - **`#DIM REF SEIKOU` / `#DIM REF SIPPAI` 的引用传参改为返回数组**
 *     （:404-447）：ere 无引用通道，按 `[seikou, sippai]` 返回——
 *     chara-family.js 的 `family_register` / chara-body.js 的
 *     `char_age_generate` 同款（多输出的既有约定）。
 *
 *   - **`TALENT:ARG:担保人`（:306）按名字表下标写作 290**（`yml/Talent.yml`
 *     的 id；同文件 :189 的 SKIPSTART 版就是写 290）。全篇素质一律下标寻址
 *     （look-info.js 的头注同款）。
 *
 *   - **`MONEY` 与 `EX_FLAG:4444` 走具名访问器**（`era_flag.money` /
 *     `era_exflag.legit_money`，:319-320 三处同款）；跨域写经属主域门面：
 *     **三支赞助的入账并不相同**——「担保人」（`:319-322`）与「肉芽
 *     诅咒」（`:339-341`）两支给目标写 CFLAG:580，代还借款那一支（`:355-357`）**不写**
 *     （那笔钱直接抵了勇者的债，写的是 582），三处收尾因此拆成
 *     `pay_sponsor()`（双资金同减，三支共用）与 `credit_partner()`（两支
 *     共用的入账）；
 *     状态 CFLAG:1 / 新人 506 / 归城 507（invasion）、气力 BASE:0:1 与
 *     所持金 CFLAG:580（dungeon）、借款 CFLAG:582（patch）、肉芽诅咒
 *     TALENT:326（stronghold）——ownership/*-cross-domain-writes.yml 逐条
 *     核对。
 *
 *   - **`RAND(1, 4)` / `RAND(1, 3)` 是双参形式（左闭右开）**：技能手册
 *     references/core-concepts/in-expression-functions.md:96「双参数返回
 *     [min, max)」，故逐字写作 `1 + rand(3)` / `1 + rand(2)`。
 *     `&&`/`||` 的短路求值照 JS 语义直译（技能手册确认 Emuera 同样是短路
 *     求值，:288-300），掷骰的次数因此逐次对应。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { select_yes_no } = require('#/page/page-life-list');
const { karma } = require('#/chara/chara-stats');
const { party_del } = require('#/dungeon/dungeon-party');
const { add_ex_item } = require('#/dungeon/ex-item');
const { chara } = require('#/facade/chara');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。六函数都落真身，名单为空。
 */
const STUBBED_CALLS = [];

/** 判定返回值：不是侵攻中的勇者（:29-31） */
const TEMPTATION_NOT_HERO = 1;
/** 判定返回值：狂王（CFLAG:800 == 4，无法被诱惑）（:32-34） */
const TEMPTATION_CRAZY_KING = 2;

/** 每次诱惑消耗的魔王气力（:60-64 判据与扣减同值） */
const TEMPTATION_MP_COST = 2000;
/** 投诚线：好感度满这个数即陷落（:77 与 :71 的条刻度同值） */
const TEMPTATION_FALL = 1000;
/** 进度格的条宽（网格列数；原作字符条的 50 格无 era 通道，见文件头） */
const TEMPTATION_BAR_WIDTH = 20;

/** 担保人的援助额（:304 `LOCAL = 10000`） */
const SPONSOR_AMOUNT = 10000;
/** 担保人素质（:306 `TALENT:ARG:担保人` 的名字表下标） */
const T_SPONSOR = 290;

function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/** 状态（CFLAG:1；invasion 域，写经门面、读可裸寻址） */
function state_of(cid) {
  return era.get(`cflag:${cid}:1`) || 0;
}

/**
 * 一行「标签 ＋ 原生进度格 ＋ 数值」（BARL 的等价物，见文件头）。
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
 * @CHECK_ABLE_TO_TEMPTATION（:23-36，#FUNCTION 式中函数）：勇者能否被诱惑。
 *
 * @param {number} arg 角色号（原作 ARG）
 * @returns {0|1|2} 0 = 可以；1 = 不是侵攻中的勇者；2 = 狂王
 */
function check_able_to_temptation(arg) {
  if (state_of(arg) !== 2) return TEMPTATION_NOT_HERO; // :29-31
  if ((era.get(`cflag:${arg}:800`) || 0) === 4) return TEMPTATION_CRAZY_KING; // :32-34
  return 0; // :36
}

/**
 * @SHOW_BUTTON_TEMPTATION（:4-20）：渲染「魔的诱惑」按钮。
 *
 * 原作 :11-19 的形状是 `IF LOCAL != 2`（空体）＋ `IF LOCAL != 0 → RETURN 0`
 * ＋ 打印——两段合起来就是「非 0 一律不渲染」（文件头）。
 *
 * @param {number} num 按钮的快捷键编号（原作 NUM）
 * @param {number} arg 目标角色号（原作 ARG）
 */
function show_button_temptation(num, arg) {
  if (check_able_to_temptation(arg) !== 0) return; // :10-19
  era.printButton('魔的诱惑\u3000', num); // :20
}

/**
 * @TEMPTATION（:39-86）：魅力诱惑的整场结算。
 *
 * @param {number} arg 目标角色号（原作 ARG）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0 = 已处理；2 = 不是侵攻中的勇者（按钮本不该显示）
 */
async function temptation(arg, rand = default_rand) {
  const able = check_able_to_temptation(arg); // :45 LOCAL
  if (able !== 0) {
    if (able === TEMPTATION_NOT_HERO) return 2; // :47-49 按钮没显示但输入仍能到达
    return 0; // :46-51（狂王那一档的收尾）
  }

  if ((chara(0).dungeon.气力 || 0) < TEMPTATION_MP_COST) {
    // :60-63 気力減衰
    era.print('*你的魔力耗尽了*');
    return 0;
  }
  chara(0).dungeon.气力 -= TEMPTATION_MP_COST; // :64

  await temptation_try(arg, rand); // :67
  await era.waitAnyKey(); // :68 WAIT

  // :71-74 結果表示
  print_bar('好感度', era.get(`cflag:${arg}:2`) || 0, TEMPTATION_FALL);
  // MAXBASE:1 属 dungeon 域；门面生成器只产出了 MAXBASE:0（体力上限），
  // 这个下标仍用裸寻址（chara-dungeon.js 手写区注释同款）
  print_bar('你的魔力', chara(0).dungeon.气力, era.get('maxbase:0:1') || 0);
  await era.waitAnyKey(); // :75 WAIT

  if ((era.get(`cflag:${arg}:2`) || 0) >= TEMPTATION_FALL) {
    // :77-83 陥落：投诚
    era.print('*勇者被你诱惑，投诚了！*');
    chara(arg).invasion.状态 = 0; // CFLAG:ARG:1 = 0
    chara(arg).invasion.新人 = 1; // CFLAG:ARG:506 = 1
    chara(arg).invasion.回城标志 = 0; // CFLAG:ARG:507 = 0
    party_del(arg); // CALL PARTY_DEL(ARG)
  }

  // :85-86 `;リターン１でターンエンド` 与 `;RETURN 1` 在原作里是注释，
  // 函数落尾返回 0——移植照此不返回 1。
  return 0;
}

/**
 * @PREPARE_TEMPTATION（:404-447）：算出成功/失败的抽签张数。
 *
 * @param {number} arg 目标角色号（原作 ARG）
 * @returns {[number, number]} `[SEIKOU, SIPPAI]`（原作的 #DIM REF 双输出，
 *   见文件头）
 */
function prepare_temptation(arg) {
  // :411-416 成功の基本値（魔王等级＋三个 FLAG 加成＋勇者的经验与素质）
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

  // :419-429 / :430-440 残り体力・気力の二段（最大倍率は脅威の36倍）
  seikou = times(seikou, health_factor(arg, 0));
  seikou = times(seikou, health_factor(arg, 1));

  // :443-447 失敗の基本値は勇者レベルとカルマ、刻印の効果が大
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
 * `(BASE:ARG:n * 100) / MAXBASE:ARG:n` 的整数除法。
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
 * `:419-440` 两条 SELECTCASE 的倍率（体力与气力逐位同值）。
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

/** `TIMES 整数变量, 小数`：截断（技能手册 commands/math-etc.md:209-227） */
function times(value, factor) {
  return Math.floor(value * factor);
}

/**
 * @FI_TEMPTATION（:373-397，#FUNCTION 式中函数）：单轮诱惑的正否抽签。
 *
 * 四条判据按序短路，掷骰次数随之不同（`&&` 短路，见文件头）。
 *
 * @param {number} arg 目标角色号（原作 ARG）
 * @param {number} seikou 成功签张数（原作 SEIKOU）
 * @param {number} sippai 失败签张数（原作 SIPPAI）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {0|1} 1 = 诱惑成功
 */
function fi_temptation(arg, seikou, sippai, rand = default_rand) {
  const ring1 = (era.get(`cflag:${arg}:551`) || 0) % 1000; // RING:1
  const ring2 = (era.get(`cflag:${arg}:552`) || 0) % 1000; // RING:2
  // :382-384 [即落ち][淫乱][愛][肉便器]なら無条件で成功
  if (
    era.get(`talent:${arg}:73`) ||
    era.get(`talent:${arg}:76`) ||
    era.get(`talent:${arg}:85`) ||
    era.get(`talent:${arg}:204`)
  ) {
    return 1;
  }
  // :385-388 不幸の指輪（RING == 20）は 25％で強制成功
  if (rand(20) < 5 && (ring1 === 20 || ring2 === 20)) return 1;
  // :389-391 結界の指輪（RING == 18）は 50％で強制失敗
  if (rand(10) < 5 && (ring1 === 18 || ring2 === 18)) return 0;
  // :393-397 本抽签：成功签 / 总签
  return rand(seikou + sippai) < seikou ? 1 : 0;
}

/**
 * @TEMPTATION_TRY（:202-364）：六轮诱惑判定与三次「赞助机会」。
 *
 * @param {number} arg 目标角色号（原作 ARG）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 原作的 RETURN 0
 */
async function temptation_try(arg, rand = default_rand) {
  const [seikou, sippai] = prepare_temptation(arg); // :207
  const name = era.get(`callname:${arg}:-1`) ?? ''; // %SAVESTR:ARG%
  const master_lv = era.get('cflag:0:9') || 0; // CFLAG:0:9 魔王等级

  for (let num = 0; num < 6; num += 1) {
    // :210 誘惑判定成功
    if (fi_temptation(arg, seikou, sippai, rand)) {
      let item_failed = false; // 原作 CASE 7,8 的 GOTO FAIL
      switch (rand(9)) {
        case 0: // :216-220
          era.print(`*梦魔的快乐袭击了${name}！*`);
          era.print(`欲情点数+${master_lv * 10}`);
          add_juel(arg, 5, master_lv * 10);
          add_affection(arg, 10 * (1 + abl_sum(arg, [0, 1, 2, 3])));
          break;
        case 1: // :221-227
          era.print(`*自己隐藏着的兽欲袭击了${name}！*`);
          era.print(`欲情点数+${master_lv * 5}`);
          era.print(`屈服点数+${master_lv * 2}`);
          add_juel(arg, 5, master_lv * 5);
          add_juel(arg, 6, master_lv * 2);
          add_affection(arg, 15 * (1 + abl_sum(arg, [10, 11])));
          break;
        case 2: // :228-232
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
        case 3: // :233-237
          era.print(`*魔王的甜蜜诱惑袭击了${name}！*`);
          era.print(`屈服点数+${master_lv}`);
          add_juel(arg, 6, master_lv);
          add_affection(arg, 40);
          break;
        case 4: // :238-242
          era.print(`*可以和你平分这个世界哦……*`);
          era.print(`屈服点数+${master_lv * 2}`);
          add_juel(arg, 6, master_lv * 2);
          add_affection(arg, 50);
          break;
        case 5: // :243-260 体力条按残量给好感度，再治愈体力
          add_affection(arg, heal_affection(arg, 0));
          era.print(`*魔界的波动，治愈了${name}…*`);
          era.print(`HP+${master_lv * 50}`);
          heal_base(arg, 0, master_lv * 50);
          break;
        case 6: // :261-278 气力同款
          add_affection(arg, heal_affection(arg, 1));
          era.print(`*魔界的波动，治愈了${name}的心灵…*`);
          era.print(`气力+${master_lv * 50}`);
          heal_base(arg, 1, master_lv * 50);
          break;
        default: // :279-287 CASE 7, 8
          era.print(`*你赐予了${name}道具…*`);
          if ((await add_ex_item(-1, arg, 0, rand)) > 0) {
            add_affection(arg, 5);
          } else {
            item_failed = true; // GOTO FAIL
          }
          break;
      }

      if (item_failed) {
        // :294-297 $FAIL：道具没送出去也走失败结算（掷的是 RAND(1, 3)）
        era.print('诱惑被切断了！');
        karma(arg, 1 + rand(2));
      } else {
        // :290-291 籠絡され堕落していく（失败时掷的是 RAND(1, 4)）
        karma(arg, -(1 + rand(3)));
      }
    } else {
      // :293-298 誘惑失敗
      era.print('诱惑被切断了！');
      karma(arg, 1 + rand(2));
    }
  }

  // :301-360 保証人チャンス！（三次机会各自一条判据）
  await sponsor_chances(arg, rand);

  return 0; // :344-364（保証人チャンス段落走到函数尾的收尾）
}

/**
 * `:243-278` 两条治愈臂共用的好感度档（体力/气力逐位同值）。
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
 * `:258-260` / `:276-278`：加值后按上限截断（跨域写走 dungeon 门面）。
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
 * `:301-360` 三次「赞助机会」：担保人援助 / 肉芽诅咒 / 代还借款。
 *
 * 三条判据以 `IF`/`ELSEIF` 串成一条链，第一条不命中时后面的 `RAND:20` /
 * `RAND:10` 会**再掷**（短路求值只跳过同一表达式右侧，见文件头）。
 *
 * @param {number} arg 目标角色号（原作 ARG）
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
    // :306-322 担保人でなく、あなたが LOCAL 以上のお金を持ち、1/20 の確率
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
    // :326-342 オトコでもふたなりでもなく、1/20 の確率で肉芽の呪い（肉芽诅咒
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
    // :344-358 借金が LOCAL 以上あり、1/10 の確率で代わりに返済
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
      pay_sponsor(); // :355-356 只扣双资金，不入目标所持金
      chara(arg).patch.借款 += SPONSOR_AMOUNT; // CFLAG:582（patch 域）
    }
  }
}

/** `:319-321` / `:339-341` / `:355-356`：赞助款双资金同减（三支共用） */
function pay_sponsor() {
  era_flag.money -= SPONSOR_AMOUNT;
  era_exflag.legit_money -= SPONSOR_AMOUNT;
}

/**
 * 目标那一侧的入账：只有「担保人」`:319-322` 与「肉芽诅咒」`:339-341` 两支写
 * `CFLAG:ARG:580`；代还借款那一支 `:355-357` **不写**——那笔钱直接抵了
 * 勇者的债（写的是 582），不进他的口袋。
 * @param {number} arg 目标角色号
 */
function credit_partner(arg) {
  chara(arg).dungeon.所持金 += SPONSOR_AMOUNT; // CFLAG:580（dungeon 域）
}

/** 一串素质下标之和（`ABL:ARG:0 + ABL:ARG:1 + …` 的读法） */
function abl_sum(arg, indexes) {
  return indexes.reduce(
    (sum, idx) => sum + (era.get(`abl:${arg}:${idx}`) || 0),
    0,
  );
}

/** 一串刻印下标之和（`MARK:ARG:a + …` 的读法） */
function mark_sum(arg, indexes) {
  return indexes.reduce(
    (sum, idx) => sum + (era.get(`mark:${arg}:${idx}`) || 0),
    0,
  );
}

/** 单个刻印读数（MARK:ARG:n） */
function mark_of(arg, index) {
  return era.get(`mark:${arg}:${index}`) || 0;
}

/** 好感度写入（CFLAG:ARG:2） */
function add_affection(arg, delta) {
  era.set(`cflag:${arg}:2`, (era.get(`cflag:${arg}:2`) || 0) + delta);
}

/** 屈服/欲情点数写入（JUEL:ARG:n） */
function add_juel(arg, index, delta) {
  era.set(
    `juel:${arg}:${index}`,
    (era.get(`juel:${arg}:${index}`) || 0) + delta,
  );
}

module.exports = {
  STUBBED_CALLS,
  show_button_temptation,
  check_able_to_temptation,
  temptation,
  temptation_try,
  fi_temptation,
  prepare_temptation,
};
