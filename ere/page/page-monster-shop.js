/**
 * @file 怪物商店（召唤魔物从者）：@MONSTER_SHOP 族（issue #399 / N15 段 3）。
 *
 * 源: target/ERB/SHOP/SHOP_MONSTER.ERB
 *     @MONSTER_SHOP（:18-173，入口菜单 + 性别选择 + 种族选择 + 召唤确认）
 *     @SHOW_SHOP_MONSTER（:178-196，头行）
 *     @SELECT_MONSTER（:200-285，种族映射 + 商品陈列 + 购买入口）
 *     @BUY_MONSTER（:288-410，祭品选择与召唤结算）
 *
 * 调用点：SHOP ver1.0.2.ERB:218（@USERSHOP 的 120「召唤」分支，
 * CHARANUM < MAX_CHARANUM 时），由 page/page-shop.js 接入。
 *
 * == 有意偏离（逐条注明依据） ==
 *
 * 1. **TFLAG:100/101/102 改落模块内状态**。据点期没有 tflag 表
 *    （beginTrain 建、endTrain 删；page-shop-trap.js:24-31 的实测），
 *    写二段直接抛 key error。三个槽的语义（:16-18 的注释）：TFLAG:100/101
 *    = 怪物种族的两个档（1-4/6/7 同值；5/8/9 各自映射到第二档），
 *    TFLAG:102 = 选中的商品编号。它们只在一次召唤交互内被写读、
 *    不进存档（@MONSTER_SHOP :27-29 每次进店置 0），故落在模块级的
 *    `shop_state`。
 * 2. **`[IF DEBUG]` 的 `[2]召唤异界勇者` 不移植**（:32-35 的调试编译块，
 *    page-ablup.js:113 / page-title.js:18 同款先例）。那条支路是
 *    `JUMP CHARA_SIM_SHOP`——SHOP_CHARA.ERB 的函数按 1:1 落在
 *    page-chara-shop.js（文件级交付），但**发布构建里没有入口**，
 *    与原作一致。
 * 3. **`PRINTFORML` 的换行排版按显示宽度近似**：本屏的种族一览（:97-99）
 *    与商品一览（:238 的 `,22,LEFT%` + `,5,RIGHT%`）都按原文字面量排版；
 *    商品一览两格一行（`SIF LOCAL%2 == 0 → PRINTL`）。
 * 4. **`:271` 的第二条金钱守卫恒不达**（`MONEY < ITEMPRICE:RESULT * 135`
 *    与它上一条逐字相同、只多一个 `&& TALENT:A:122`），照 #391 口径精简：
 *    上一条已把整个条件吃掉。同 :216-224 的 SELECT_MONSTER 里也有这一对。
 * 5. **`PRINTW` / `CLEARLINE`**：PRINTW = print + waitAnyKey 显式组合
 *    （utils/stub-line.js 文件头的说明）；CLEARLINE（:82/:111 的「表示外の
 *    数字なら戻す」）在 ere 侧没有对应动作——本屏幕的重绘由商店轮的循环
 *    承担，局部清行不镜像（page-ability-up.js 同款）。
 * 6. **选项升格为按钮**（#572）：入口菜单（:30-37）、性别（:71/:73）、
 *    种族（:97-101）、召唤确认（:149-155）与成交确认（:344）改
 *    `era.printButton`（PR #53 通则，正文不写 [编号] 前缀；第 3 条的列排版
 *    因此变成「一按钮一行」的记名差异，见 CONTEXT.md）。两处商品/祭品
 *    一览轮的 `[999] 返回` **保持纯文本**——同轮的有效编号是那些格行的
 *    编号，打按钮会把它们锁死（理由见各处注释）。
 */

'use strict';

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { chara } = require('#/facade/chara');
const { char_make, name_reset } = require('#/chara/char-make');
const { add_chara_ex } = require('#/chara/chara-ex');
const { party_char_del } = require('#/dungeon/dungeon-party');
const { show_chara_info } = require('#/page/page-chara-info-show');
const { clear_shop } = require('#/page/page-item-shop');
const { chara_callname } = require('#/utils/callname-utils');
const { pad_display, pad_left } = require('#/utils/display-width'); // #577：对齐补位 NBSP 化

/** 本文件存根化的原作调用名（docs/stub-registry.md 必须收录每一个） */
const STUBBED_CALLS = [];

/** 魔物从者的上限（:55 `COUNT:1 >= 30`） */
const FOLLOWER_LIMIT = 30;
/** 魔物从者的素质编号（:52 `TALENT:COUNT:220`，召喚済み标记） */
const FOLLOWER_TALENT = 220;
/** 种族2 的素质编号（:237/:303 `CSVTALENT(LCOUNT,319,0)`） */
const RACE_TALENT = 319;
/** 召唤费（:107/:120/:166 的 1500） */
const SUMMON_FEE = 1500;
/** 献祭的金钱倍率（:267/:271 `ITEMPRICE:RESULT * 135`） */
const SACRIFICE_RATE = 135;
/** 商品段（:232 `FOR LCOUNT,201,280`——上界开区间） */
const MONSTER_IDS = { start: 201, end: 280 };
/** 每页行数（:232 起的两格一行；:206 `#DIM LCOUNT, 2` 是变量声明） */
const COLUMNS = 2;
/** 商品名字段宽（:238 `%ITEMNAME:LCOUNT,22,LEFT%`） */
const NAME_WIDTH = 22;
/** 最低等级字段宽（:238 `%TOSTR(ITEMPRICE:LCOUNT),5,RIGHT%`） */
const LEVEL_WIDTH = 5;
/** 祭品一览的名字字段宽（:283/:334 `%ITEMNAME:LCOUNT,22,LEFT%`） */
const SACRIFICE_NAME_WIDTH = 22;
/** 祭品数量的字段宽（:283/:334 `%TOSTR(MONS:LCOUNT:2),7,RIGHT%`） */
const SACRIFICE_COUNT_WIDTH = 7;
/** 可选祭品一览的名字字段宽（:330/:381 `%ITEMNAME:LCOUNT,20,LEFT%`） */
const PICK_NAME_WIDTH = 20;
/** 可选祭品一览的数量字段宽（:330/:381 `%TOSTR(MONS:LCOUNT:1),5,RIGHT%`） */
const PICK_COUNT_WIDTH = 5;
/** 性别选择的选项上限（:81 `RESULT > 3`） */
const SEX_MAX = 3;
/** 种族选择的选项上限（:110 `RESULT > 9`） */
const RACE_MAX = 9;

/**
 * 怪物商店的交互内状态（原作 TFLAG:100/101/102，见文件头第 1 条）。
 * `race`/`race2` 是种族映射出的两档，`chosen` 是选中的商品编号。
 */
const shop_state = { race: 0, race2: 0, chosen: 0 };

/** TALENT 读数兜底（#13：未声明下标读回 undefined） */
function talent(cid, idx) {
  return era.get(`talent:${cid}:${idx}`) || 0;
}

/** %ITEMNAME:id%（Item.yml 登记名） */
function item_name(id) {
  return era.get(`itemname:${id}`) ?? '';
}

/** %ITEMPRICE:id%（Item.yml 的 price，缺号回落 0——`SIF ITEMPRICE:LCOUNT == 0` 的判据） */
function item_price(id) {
  return era.get(`itemprice:${id}`) || 0;
}

/**
 * CSVTALENT(n, idx, 0)：角色预设在 yml/CharaN.yml 里的素质表读数。
 * 与 CSVNAME 族同一处置（chara-name.js / chara-self-call.js 的先例）：
 * 取 `era.get('chara:'+n)` 的整份预设对象后按可选链读，不走三段静态寻址
 * （引擎的 getVar 没有四段形态）。
 * @param {number} no 角色预设编号
 * @param {number} idx 素质编号
 * @returns {number}
 */
function csv_talent(no, idx) {
  const preset = era.get(`chara:${no}`);
  return Number(preset?.talent?.[idx] ?? preset?.talent?.[String(idx)] ?? 0);
}

/**
 * @SHOW_SHOP_MONSTER（:178-196）：召唤系列三个画面的公共头行。
 */
function show_shop_monster() {
  // :183 CUSTOMDRAWLINE = → 本屏的分隔线走实线（page-shop-trap.js 同款近似）
  era.print('召唤');
  era.print('《需要献祭同类的怪物，并支付一定金钱来召唤精英魔物从者》');
  era.drawLine({ isSolid: true }); // :183-186
  // :187-193 PRINTV DAY+1 / PRINT 日 / PRINTL  午前|午后
  era.print(
    `${era_flag.day_count + 1}日${era_flag.time === 0 ? ' 午前' : ' 午后'}`,
  );
  era.print(`所持金：${era_flag.money}点`); // :195
  era.drawLine({ isSolid: true }); // :195-196
}

/**
 * @MONSTER_SHOP（:18-173）：召唤魔物从者的入口。
 *
 * 结构 1:1：入口菜单（[1] 召唤 / [999] 返回）→ 从者数上限检查（≥ 30 拒绝）
 * → 性别选择（1/2/3）→ 种族选择（1-9）→ @SELECT_MONSTER → @BUY_MONSTER
 * → 入队与角色生成（CHAR_MAKE）→ 确认（[0] 就它 / [1] 再换一个）。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（透传给 CHAR_MAKE 与
 *   @MONSTER_DATA 的两处骰子；缺省均匀随机）
 * @returns {Promise<number>} 原作 RETURN 0（:173）
 */
async function monster_shop(rand) {
  // :21-23 TFLAG:100/101/102 = 0（文件头第 1 条）
  shop_state.race = 0;
  shop_state.race2 = 0;
  shop_state.chosen = 0;

  // :30-37 入口菜单。**#572 起整轮按钮化**：此前「本系列屏一律印纯文本」
  // 的理由是「打了按钮就把输入集收紧到那批编号、头行里没有的选项（性别
  // 1-3、种族 1-9）再也键入不进」——那只在**同轮只打一部分按钮**时成立；
  // 同轮的每个选项都升格按钮后，白名单恰是显示出来的编号，点击与键入都通。
  // 本轮「其余值」（原作没有 ELSE、顺着落进 :48）的兜底臂随之不可达，
  // 1:1 保留不补用例（page-ability-up.js 文件头同款登记）。
  era.drawLine({ isSolid: true });
  era.printButton('召唤魔物从者', 1);
  // :32-35 [IF DEBUG] 的 [2]召唤异界勇者不移植（文件头第 2 条）
  era.drawLine({ isSolid: true });
  era.printButton('返回', 999);
  const entry = await era.input();
  if (entry === 999) {
    clear_shop(); // :40
    return 0;
  }
  // :42-46 RESULT == 1 → GOTO MONSTER_SHOP_TAG；其余值（原作没有 ELSE）
  // 顺着往下落进 :48 的标签，与选 1 同路（[2] 的调试支不移植，见文件头）

  // :48-62 召唤的魔物从者数量太多（TALENT:220 计数 >= 30）
  let follower_count = 0;
  for (const cid of era.getAddedCharacters()) {
    if (talent(cid, FOLLOWER_TALENT)) {
      follower_count += 1;
    }
  }
  if (follower_count >= FOLLOWER_LIMIT) {
    era.print('召唤的魔物从者数量太多，魔界已经没有志愿者了……');
    await era.waitAnyKey(); // :57 WAIT
    clear_shop(); // :58
    return 0;
  }

  // :66-88 性别选择
  let sex_coin = 0;
  for (;;) {
    show_shop_monster(); // :68
    era.print('请选择要召唤的魔物从者的性别'); // :70
    // :71 的列排版纯文本选项 → 与 :73 的返回一并升格为按钮（#572）
    era.printButton('男性', 1);
    era.printButton('女性', 2);
    era.printButton('扶她', 3);
    era.drawLine({ isSolid: true }); // :70-72
    era.printButton('返回', 999); // :73
    const result = await era.input();
    if (result === 999) {
      clear_shop(); // :78
      return 0;
    }
    if (result > SEX_MAX) {
      continue; // :81-83（原作 CLEARLINE 1 后回标签）
    }
    sex_coin = result;
    if (result === 0) {
      continue; // :86-87
    }
    break;
  }

  // :91-117 种族选择
  for (;;) {
    show_shop_monster(); // :93
    // :97-99 三行列排版纯文本选项 → 与 :101 的返回一并升格为按钮（#572）
    era.printButton('兽人类', 1);
    era.printButton('史莱姆类', 2);
    era.printButton('昆虫类', 3);
    era.printButton('植物类', 4);
    era.printButton('触手类', 5);
    era.printButton('妖精类', 6);
    era.printButton('巨人类', 7);
    era.printButton('魔人类', 8);
    era.printButton('魔兽类', 9);
    era.drawLine({ isSolid: true }); // :97-100
    era.printButton('返回', 999); // :101
    era.print('\u3000请选择魔物从者的种类'); // :102
    const result = await era.input();
    if (result === 999) {
      clear_shop(); // :107
      return 0;
    }
    if (result > RACE_MAX) {
      continue; // :110-112
    }
    if ((await select_monster(result, rand)) === 0) {
      continue; // :114-116 SIF RESULT == 0 → GOTO INPUT_LOOP
    }
    break;
  }

  // :119-171 $ADD_CHARA：入队、生成、确认
  for (;;) {
    const chara_id = shop_state.chosen; // :121 CHARA = TFLAG:102
    era.addCharacter(chara_id); // :122 ADDCHARA CHARA
    await add_chara_ex(chara_id); // :123 CALL ADDCHARA_EX, CHARANUM-1（扁平化直传）
    const a = chara_id; // :124 A = CHARANUM - 1（ere 侧角色号 = 预设号，#21）
    if (sex_coin === 1) {
      chara(a).chara.男人 = 1; // :126-127 男性
    }
    if (sex_coin === 3) {
      chara(a).chara.扶她 = 1; // :128-129 扶她
    }
    await char_make(a, 0, 0, rand); // :131-132 CALL CHAR_MAKE; A = RESULT
    chara(a).invasion.状态 = 0; // :133 CFLAG:A:1 = 0
    // :135-137 善良値調整
    if ((era.get(`cflag:${a}:151`) || 0) < -100) {
      chara(a).chara.善恶值 = -100;
    }

    era.print('*****************************************'); // :140
    era.print(`${chara_callname(a)}回应了你的召唤………`); // :141
    era.print('*****************************************'); // :142
    await era.waitAnyKey(); // :143 PRINTW
    // :144 CALL SHOW_CHARA_INFO, A, -2（#390 起真身，见 docs/stub-registry.md；
    // -2 = 贡品信息页。rand 一路透传：标题的身体数据生成吃随机）
    await show_chara_info(a, -2, rand);
    era.print(`确定要召唤${chara_callname(a)}么？`); // :146
    era.print(''); // :147
    era.print(''); // :148
    // :149-155 [0] 就是 他/她 了  [1] 再换一个（花费1500）→ 按钮（#572）
    const gender_word = talent(a, 122) !== 0 ? '他' : '她';
    era.printButton(`就是${gender_word}了`, 0);
    era.printButton('再换一个（花费1500）', 1);

    const result = await era.input();
    if (result !== 1) {
      return 0; // :172-173（[0] 与其余输入都落到函数尾）
    }
    // :159-170 再换一个：退人退钱再走一遍 $ADD_CHARA
    if (era_flag.money <= SUMMON_FEE) {
      era.print('金钱不够！'); // :161-162
      await era.waitAnyKey();
      return 0;
    }
    await party_char_del(a); // :164 CALL PARTY_CHAR_DEL, A
    era.removeCharacter(a); // :165 DELCHARA A
    era_flag.money -= SUMMON_FEE; // :166
    era_exflag.legit_money -= SUMMON_FEE; // :167
    name_reset(); // :168 CALL NAME_RESET
  }
}

/**
 * @SELECT_MONSTER（:200-285）与 @SELECT_CHARA（SHOP_CHARA.ERB:155-234）的
 * 通用核：两个函数逐字相同，只差**两道守卫**——SHOP_CHARA 的那份没有
 * 「编号在 201-280 段内」与「ITEMSALES 已点亮」两条（SHOP_MONSTER.ERB
 * :260-265 的注释在 SHOP_CHARA 里不存在），故按 `guard` 形参分档。
 *
 * @param {object} options
 * @param {number} options.arg0 种族选择的输入（原作 ARG:0）
 * @param {() => void} options.show 头行绘制（SHOW_SHOP_MONSTER / _CHARA）
 * @param {boolean} options.guard 段内与在售位的两道守卫（见上）
 * @param {(n: number) => number} [options.rand] RAND:N 随机源
 * @returns {Promise<number>} 1 = 买定（原作 RETURN 1）、0 = 退回种族选择
 */
async function select_follower({ arg0, show, guard, rand }) {
  // :209-224 SELECTCASE ARG:0：种族两档的映射（TFLAG:100/101）
  const mapping = {
    1: [1, 1],
    2: [2, 2],
    3: [3, 3],
    4: [4, 4],
    5: [5, 11],
    6: [6, 6],
    7: [7, 7],
    8: [8, 9],
    9: [10, 12],
  };
  const mapped = mapping[arg0];
  if (mapped === undefined) {
    return 0; // :222-223 CASEELSE → RETURN 0
  }
  [shop_state.race, shop_state.race2] = mapped;

  for (;;) {
    show(); // :228
    era.print(
      '需要献祭一定数量的怪物以符合其合计等级的要求，作为祭品的怪物还需满足最低等级才能作为祭品，',
    ); // :228-230
    era.print('还需要支付最低等级＊１３５的金钱来召唤精英魔物从者'); // :230

    // :232-247 商品一览（ITEMPRICE 为 0 的不出场；CSVTALENT 的种族 319
    // 与两个档任一相等即列出）
    const rows = [];
    let row = '';
    let shown = 0;
    for (let id = MONSTER_IDS.start; id < MONSTER_IDS.end; id += 1) {
      if (item_price(id) === 0) {
        continue;
      }
      const race2 = csv_talent(id, RACE_TALENT);
      if (race2 !== shop_state.race && race2 !== shop_state.race2) {
        continue;
      }
      // :238 名字字段与「最低等级：」之间有一个半角空格（在 %…,22,LEFT% 之后，
      // 是实参里的字面量，不是命令分隔符）
      row +=
        `[${pad_display(String(id), 3)}] ` +
        `${pad_display(item_name(id), NAME_WIDTH)} ` +
        `最低等级：${pad_left(String(item_price(id)), LEVEL_WIDTH)}\u3000\u3000`;
      era.set(`itemsales:${id}`, 1); // :240 購入可能フラグ
      shown += 1;
      if (shown % COLUMNS === 0) {
        rows.push(row);
        row = '';
      }
    }
    for (const line of rows) {
      era.print(line);
    }
    if (row !== '') {
      era.print(row); // :246-247 SIF LOCAL%2 → PRINTL
    }

    era.drawLine({ isSolid: true }); // :238-249
    // :250 的 [999] 返回保持纯文本（#572）：本轮的有效编号是上面商品行的
    // 「[编号]」格行（拼行，编号即输入值 100-199），单给这行打按钮会把
    // 白名单收成 999、商品编号当场被拒收。整轮按钮化要先重排格行。
    era.print('[999] 返回'); // :250
    era.print(shown === 0 ? '没有能召唤的魔物从者' : '请选择要召唤的魔物从者'); // :251-255

    const result = await era.input();
    if (result === 999) {
      return 0; // :258-259
    }
    // :261-265 商品编号段与在售位的两道守卫（不在段内/没点亮则重问；
    // SELECT_CHARA 没有这两条，见函数头）
    if (guard) {
      if (result < MONSTER_IDS.start || result > MONSTER_IDS.end) {
        continue;
      }
      if ((era.get(`itemsales:${result}`) || 0) === 0) {
        continue;
      }
    }
    // :266-274 钱不够则重问（两条守卫的判据逐字相同，第二条恒不达——
    // 文件头第 4 条）
    if (era_flag.money < item_price(result) * SACRIFICE_RATE) {
      era.print(
        '虽然魔物从者都不是物质的女孩，但必要的金钱总是要准备的吧～贫穷的魔王大人哦！',
      );
      await era.waitAnyKey();
      continue;
    }

    shop_state.chosen = result; // :278 TFLAG:102 = RESULT
    if ((await buy_follower({ show, rand })) === 0) {
      continue; // :282-283 SIF RESULT == 0 → GOTO INPUT_LOOP
    }
    return 1; // :282-285
  }
}

/**
 * @SELECT_MONSTER（:200-285）：种族 → 商品陈列 → @BUY_MONSTER。
 * @param {number} arg0 种族选择的输入（原作 ARG:0）
 * @param {(n: number) => number} [rand] RAND:N 随机源（透传给 @MONSTER_DATA）
 * @returns {Promise<number>} 1 = 买定、0 = 退回种族选择
 */
async function select_monster(arg0, rand) {
  return select_follower({
    arg0,
    show: show_shop_monster,
    guard: true,
    rand,
  });
}

/**
 * @BUY_MONSTER（:288-410）与 @BUY_CHARA（SHOP_CHARA.ERB:237-359）的通用核
 * （两者逐字相同，差处只有头行绘制函数与跳转标签名）。
 *
 * 祭品表（MONS）按「同种族（CSVTALENT 的 319 与两档任一相等）且在库
 * （ITEM:LCOUNT > 0）」收集，字段：编号 / 等级（E:501）/ 持有数 /
 * 已选数。合计等级达到商品价即成交，否则继续挑。
 *
 * @param {object} options
 * @param {() => void} options.show 头行绘制
 * @param {(n: number) => number} [options.rand] RAND:N 随机源
 * @returns {Promise<number>} 1 = 成交、0 = 取消或祭品不足
 */
async function buy_follower({ show, rand }) {
  const target = shop_state.chosen; // 原作 TFLAG:102
  // :301-309 收集祭品
  const offering = new Map(); // 编号 → { level, stock, picked }
  let total_level = 0; // LOCAL:1（已选合计；收集期先累持有等级、随后清零）
  for (let id = 100; id < 200; id += 1) {
    const data = read_monster(id, rand);
    if (
      (data.race2 === shop_state.race || data.race2 === shop_state.race2) &&
      (era.get(`item:${id}`) || 0) > 0
    ) {
      offering.set(id, {
        level: data.level,
        stock: era.get(`item:${id}`) || 0,
        picked: 0,
      });
      total_level += (era.get(`item:${id}`) || 0) * data.level;
    }
  }

  // :311-318 祭品不足的两个早退（RETURN 0 → 退回种族选择）
  if (offering.size === 0) {
    era.print('没有能作为祭品的怪物');
    await era.waitAnyKey();
    return 0;
  }
  if (total_level < item_price(target)) {
    era.print('＊作为祭品的怪物等级不足＊');
    await era.waitAnyKey();
    return 0;
  }

  // :321-322 LOCAL:1 = 0（改记已选合计）
  let picked_level = 0;

  for (;;) {
    show(); // :326

    if (item_price(target) - picked_level <= 0) {
      // :328-341 已凑够：确认召唤
      era.print('现在被选择的怪物');
      for (const line of sacrifice_rows(offering)) {
        era.print(line);
      }
      era.print(`合计等级：${picked_level}`); // :341
      era.drawLine({ isSolid: true }); // :341-342
      era.print(
        `要以这些怪物为代价，加上${item_price(target) * SACRIFICE_RATE}点金钱，来召唤${item_name(target)}吗？`,
      ); // :343
      // :344 的两项 → 按钮（PR #53 通则，正文不写 [编号]；#572）
      era.printButton('好的', 0);
      era.printButton('不要', 1);

      const result = await era.input();
      if (result === 1) {
        return 0; // :346-347
      }
      if (result !== 0) {
        // :345-357 的两支只认 0/1：其余值的控制流落出 IF 链、由 :394 的
        // $INPUT_LOOP_1 回到祭品选择的输入（ere 侧重画一轮祭品屏，同本
        // 文件头的第 3 条偏离）
        continue;
      }
      // :348-356 成交：扣钱、扣祭品
      era_flag.money -= item_price(target) * SACRIFICE_RATE;
      era_exflag.legit_money -= item_price(target) * SACRIFICE_RATE;
      for (const [id, info] of offering) {
        if (info.picked === 0) {
          continue;
        }
        era.set(`item:${id}`, (era.get(`item:${id}`) || 0) - info.picked);
      }
      return 1;
    }

    // :358-391 还差等级：列出可选祭品，继续挑
    era.print('请选择满足最低等级要求的怪物作为祭品');
    era.print(`剩余等级：${item_price(target) - picked_level}`); // :362
    era.print('现在被选择的怪物');
    for (const line of sacrifice_rows(offering)) {
      era.print(line);
    }
    era.print(`合计等级：${picked_level}`); // :375
    era.drawLine({ isSolid: true }); // :376
    let row = '';
    let columns = 0;
    for (const [id, info] of offering) {
      if (info.level === 0) {
        continue;
      }
      // :381-382 两行 PRINTFORM 拼一格；格尾是实参里的制表符（不是全角空格，
      // 与祭品行的 `只` + 两个 U+3000 不同源），照抄成 \t
      row +=
        `[${pad_display(String(id), 3)}] ` +
        `${pad_display(item_name(id), PICK_NAME_WIDTH)} ` +
        `LV:${info.level} ${pad_left(String(info.stock), PICK_COUNT_WIDTH)} ` +
        `- ${info.picked} 只\t`;
      columns += 1;
      if (columns % COLUMNS === 0) {
        era.print(row);
        row = '';
      }
    }
    if (row !== '') {
      era.print(row); // :387-388
    }
    era.drawLine({ isSolid: true }); // :389
    // :390 的 [999] 返回同上（祭品行轮的编号 100-199 是纯文本选项）。
    era.print('[999] 返回'); // :390
    era.print(''); // :391

    const result = await era.input();
    if (result === 999) {
      return 0; // :397-398
    }
    if (result < 100 || result >= 200) {
      continue; // :399-400
    }
    const info = offering.get(result);
    if (info === undefined || info.level === 0) {
      continue; // :401-402
    }
    if (info.stock === info.picked) {
      era.print('已经没有了'); // :403-405
      await era.waitAnyKey();
      continue;
    }
    info.picked += 1; // :408
    picked_level += info.level; // :409
  }
}

/**
 * MONS 的祭品行（:329-338 / :363-372 两处同形）：`名字 LV:{等级} {已选}只`，
 * 每两格一行。
 * @param {Map<number, {level: number, stock: number, picked: number}>} offering
 * @returns {string[]}
 */
function sacrifice_rows(offering) {
  const rows = [];
  let row = '';
  let columns = 0;
  for (const [id, info] of offering) {
    if (info.picked === 0) {
      continue;
    }
    row +=
      `${pad_display(item_name(id), SACRIFICE_NAME_WIDTH)} ` +
      `LV:${info.level} ${pad_left(String(info.picked), SACRIFICE_COUNT_WIDTH)}只\u3000\u3000`;
    columns += 1;
    if (columns % COLUMNS === 0) {
      rows.push(row);
      row = '';
    }
  }
  if (row !== '') {
    rows.push(row); // :337-338 SIF !LINEISEMPTY() → PRINTL
  }
  return rows;
}

/**
 * `CALL MONSTER_DATA, LCOUNT, 5` 的等价物：祭品判定要的两个数（E:501 等级、
 * E:507 种族2）。真身在 dungeon/monster-data.js 的 `monster_data`
 * （`@MONSTER_DATA`，ARG:1 = 5 时只算属性、不落任何赋值）。
 * @param {number} id 怪物编号
 * @param {(n: number) => number} [rand] RAND:N 随机源（缺省均匀随机）
 * @returns {{level: number, race2: number}}
 */
function read_monster(id, rand) {
  // 延迟 require：monster-data 顶层取 page-life-list（→ page-select-target
  // → monster-play → monster-data）的环，加载期取会拿到半成品
  // （page-life-list.js:290-298 的同款处置）
  const { e_get, monster_data } = require('#/dungeon/monster-data');
  monster_data(id, 5, -1, -1, -1, rand);
  return { level: e_get(501), race2: e_get(507) };
}

/**
 * @BUY_MONSTER（:288-410）：@BUY_CHARA 的同形复用（见 buy_follower）。
 * @param {(n: number) => number} [rand] RAND:N 随机源（@MONSTER_DATA 的骰子）
 * @returns {Promise<number>} 1 = 召唤成功、0 = 取消或祭品不足
 */
async function buy_monster(rand) {
  return buy_follower({ show: show_shop_monster, rand });
}

module.exports = {
  STUBBED_CALLS,
  monster_shop,
  show_shop_monster,
  select_monster,
  buy_monster,
  // SHOP_CHARA.ERB 的两份同形函数（page-chara-shop.js 复用；两者与原作的
  // TFLAG 槽位本就共用，见该文件的说明）
  select_follower,
  buy_follower,
  shop_state,
};
