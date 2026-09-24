/**
 * @file 外观描述（issue #389，N5）：LOOK.ERB 的设定、清空与信息显示五函数。
 *
 * 源: target/ERB/キャラ関数/LOOK.ERB
 *     @LOOK_SET（:4-813）、@LOOK_CLEAR（:814-822）、@LOOK_INFO（:823-1666）、
 *     @LOOK_INFO_LOVE（:1667-2810）、@LOVE_LIKE_BASE（:2811-2884）
 *     ——同文件的第六个函数 @GET_LOOK_INFO（:2885-3775）是式中函数，真身在
 *     ere/chara/look-info.js（拆出去消 require 环，见该文件头）。
 *
 * 调用面：#389 起 LOOK_SET 由 ere/chara/chara-make.js 的 @CM_LOOK 接入
 * （源 CHARA_MAKE.ERB:864 的 `CALL LOOK_SET, ARG`）；@LOOK_INFO 的两个调用点
 * 在 CHARA_INFO_SHOW ver1.1.2.ERB:233/:295，#390 的靶——本票只把函数做成
 * 可被调用的形状（`await look_info(cid)` 走 era.print 逐行输出），不去改那个
 * 文件。LOOK_INFO_LOVE 由 LOOK_INFO 尾段无条件调用（源 :1656-1660）。
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - **TARGET 换手显式传参**（#5 决议第六条）：源的 `TARGET = A` / `SWAP`
 *     一律消解成 cid 形参，与 chara-make.js 同款。
 *   - **`%SELF_CALL(TARGET)%` 改用 ere/kojo/kojo-text.js 的真身**，
 *     `CALL GOBI_KOUJO` 用 ere/kojo/kojo-system.js 的真身（语尾口上族，
 *     未实现的分支打占位行——那是那张票的欠账，不在本票）。
 *   - **`CALL NAME_LOVER,CFLAG:606,1` 改读 LOVER_NAMES 表**（与
 *     ere/page/page-chara-info.js:201 同款做法）：原函数按 print_flag=1
 *     直接打印 14 格填充，这里按同一张登记表取裸文本 + 同一填充宽度。
 *   - **SETCOLORBYNAME / RESETCOLOR 保留为彩色片段**（`{content,color}` 数组，
 *     page-dungeon-info2.js 先例）——LOOK_INFO 的两态（`FLAG:5 & 2048` 的
 *     「口上视角」与默认的「方括号视角」）都按此落地。
 *   - **`PRINT`/`PRINTFORM`/`PRINTV` 合流**：引擎每次 era.print 即一行，
 *     原作「不换行的连续 PRINT」合成一条字符串后一次输出（page-shop-trap.js
 *     先例）。
 *
 * == 源里三处恒真/恒假写法按 1:1 保留（不改写成等价形状）==
 *
 *   - :485 `ELSEIF TALENT:319 == 10 || 12`——`|| 12` 是恒真常量，该臂等价
 *     于 ELSE；保留原写法，注释说明。
 *   - :586 `IF Q > 103 && EX_TALENT:2`——Q 只可能是 1-20 或 90-93，该判定
 *     恒假；保留原写法（改写成常量会让它的变异失去意义）。
 *   - :1277-1279 `IF Q >= 2` 吞掉了随后的 `ELSEIF Q == 3` / `ELSEIF Q == 4`
 *     两支（头发修剪方式：2 齐剪 / 3 层剪 不可达）；按 page-chara-info.js
 *     先例**精简为可达形状**，源行号与结论写在注释里。
 */

'use strict';

const era = require('#/era-electron');
const { chara_callname } = require('#/utils/callname-utils');
const { karma } = require('#/chara/chara-stats');
const { family_print_info } = require('#/chara/chara-family');
const { get_look_info } = require('#/chara/look-info');
const { heart, self_call } = require('#/kojo/kojo-text');
const { chara } = require('#/facade/chara');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。
 *
 * 空数组：本文件调用的 GOBI_KOUJO / SELF_CALL / FAMILY_PRINT_INFO /
 * NAME_LOVER / KARMA 都是真身（各自的未落地分支由那些模块自己登记）。
 */
const STUBBED_CALLS = [];

const default_rand = (n) => Math.floor(Math.random() * n);

/** 素质下标（yml/Talent.yml；与 ere/chara/look-info.js 的同名常量各写一份，两边都只服务本文件） */
const T_处女 = 0;
const T_童贞 = 1;
const T_魁梧 = 99;
const T_娇小 = 100;
const T_贫乳 = 109;
const T_巨乳 = 110;
const T_爆乳 = 114;
const T_绝壁 = 116;
const T_超乳 = 119;
const T_扶她 = 121;
const T_男人 = 122;
const T_动物耳朵 = 124;
const T_幼稚 = 132;
const T_早泄 = 133;
const T_未熟 = 135;
const T_兽类 = 137;
const T_人妻 = 157;
const T_金红桃 = 167;
const T_精英 = 220;
const T_战术 = 240;
const T_恶魔肌肤 = 244;
const T_恶魔翅膀 = 245;
const T_恶魔尾巴 = 246;
const T_恶魔眼睛 = 247;
const T_褐色肌肤 = 253;
const T_白皙 = 255;
const T_俊足 = 258;
const T_史莱姆 = 261;
const T_触手 = 262;
const T_小人体型 = 263;
const T_角 = 264;
const T_私处封印 = 273;
const T_光之能力者 = 278;
const T_暗之能力者 = 279;
const T_头发颜色 = 300;
const T_头发状态 = 301;
const T_头发长度 = 302;
const T_头发修剪方式 = 303;
const T_发型 = 304;
const T_目 = 305;
const T_瞳色 = 306;
const T_唇 = 307;
const T_体型 = 308;
const T_乳头 = 309;
const T_阴毛状态 = 310;
const T_阴毛生长极限 = 311;
const T_魅力点 = 312;
const T_癖 = 313;
const T_种族 = 314;
const T_成为勇者前的生活 = 315;
const T_成为勇者的契机 = 316;
const T_喜欢的东西 = 317;
const T_阴茎的状态 = 318;
const T_种族2 = 319;
const T_家族构成 = 320;

/** 素质下标 → 值（`TALENT:x` 的隐式 TARGET 在 ere 侧一律显式传 cid） */
function t(cid, idx) {
  return era.get(`talent:${cid}:${idx}`) || 0;
}

/** 写素质（域内下标；跨域的在调用点走门面） */
function set_t(cid, idx, value) {
  era.set(`talent:${cid}:${idx}`, value);
}

/** EX 素质（`EX_TALENT:2` 后代标记；#138 的 ex_talent 表） */
function ex_t(cid, idx) {
  return era.get(`ex_talent:${cid}:${idx}`) || 0;
}

/**
 * 源 :1025-1029 的刺青候选表（`LOCALS:10 '= "淫乱" , …`，10 项）。
 * LOCAL = RAND:8 + 10 → 取前 8 项。
 */
const TATTOO_NAMES = [
  '淫乱',
  '母猪',
  '蛇',
  '蜘蛛女郎',
  '蔷薇',
  '肉便器',
  '便女',
  '阴茎图画',
  '性器标志',
  '骷髅',
];

/**
 * @LOOK_SET（:4-813）：按种族设定掷出全部外貌素质。
 *
 * 设定面（全部写 TALENT:x:300-320 与 ABL/EXP 的少数档）：
 *   头发颜色/状态/长度/修剪/发型、目、瞳色、唇、体型、乳头、阴毛、阴茎、
 *   魅力点、癖、种族、成为勇者前的生活、成为勇者的契机、喜欢的东西、
 *   家族构成。
 *
 * 已设定则保留：头发颜色在 `TALENT:300 > 0` 时整段跳过（源 :11-13）。
 *
 * @param {number} cid 角色 ID（源 TARGET）
 * @param {number} arg 种族设定（源 ARG：0 随机、-1 人类、10/11 指定、其余按码）
 * @param {(n: number) => number} [rand] RAND:N 随机源（缺省均匀随机）
 * @returns {number} 源 :808-812 `RETURN 1`
 */
function look_set(cid, arg, rand = default_rand) {
  const rand_n = rand;

  // —— 头发颜色（:9-52）——
  if (t(cid, T_头发颜色) > 0) {
    // :10-13 設定済み（stick 修改：不再按 rand 重掷）
  } else {
    rand_n(100); // :13-15 Q = RAND:100 —— 源里随即被 SELECTCASE 的 RAND:100 覆盖，此掷不参与判定（1:1 保留，它仍消费一个随机数）
    // :15-51 0-4 粉髪 5% / 5-14 紫髪 10% / 15-20 白发 6% / 21-30 青髪 10%
    //        31-40 緑髪 10% / 41-50 栗毛 10% / 51-60 金色 10% / 61-79 黒髪 19%
    //        80-89 赤毛 10% / 90-94 暗金色 5% / 95-99 銀髪 5%
    const q_color = rand_n(100);
    set_t(
      cid,
      T_头发颜色,
      q_color <= 4
        ? 11
        : q_color <= 14
          ? 8
          : q_color <= 20
            ? 9
            : q_color <= 30
              ? 6
              : q_color <= 40
                ? 7
                : q_color <= 50
                  ? 2
                  : q_color <= 60
                    ? 1
                    : q_color <= 79
                      ? 3
                      : q_color <= 89
                        ? 4
                        : q_color <= 94
                          ? 10
                          : 5,
    );
  }

  // —— 头发状态（:54-71）——
  const q_state = rand_n(12); // :55 Q = RAND:12
  set_t(
    cid,
    T_头发状态,
    q_state <= 6
      ? 1 // :56-58 直毛
      : q_state === 7
        ? 2 // :59-61 カール
        : q_state === 8
          ? 3 // :62-64 内カール
          : q_state === 9
            ? 4 // :65-67 外カール
            : q_state === 10
              ? 5 // :68-70 癖毛
              : 6, // :71-73 ウェーブ
  );

  // —— 头发长度（:75-87）ボーイッシュ（未熟 135）なら常にショート ——
  const q_hair_len = rand_n(6); // :77
  set_t(
    cid,
    T_头发长度,
    q_hair_len <= 1 || t(cid, T_未熟)
      ? 1 // :78-80 ショート
      : q_hair_len === 4
        ? 101 // :81-83 セミロング
        : 201, // :84-87 ロング
  );

  // —— 头发修剪方式（:89-99）——
  const q_cut = rand_n(6); // :90-92
  // 源 :93-99 是 `IF Q >= 2 → 1` 后接 `ELSEIF Q == 3 → 2` / `ELSEIF Q == 4 → 3`：
  // 前一支把 2..5 全吃掉，2 齐剪与 3 层剪**不可达**（page-chara-info.js 先例，
  // 精简为可达形状：Q >= 2 → 1 基本剪法，否则 → 4 碎发）
  set_t(cid, T_头发修剪方式, q_cut >= 2 ? 1 : 4);

  // —— 髪型（:101-127）长度决定可掷范围 ——
  const hair_len = t(cid, T_头发长度);
  let q_style; // :119-125
  if (hair_len >= 1 && hair_len <= 100) {
    q_style = rand_n(3);
  } else if (hair_len >= 101 && hair_len <= 200) {
    q_style = rand_n(10);
  } else {
    q_style = rand_n(12);
  }
  set_t(cid, T_发型, q_style + 1); // :126-127 Q += 1

  // —— 目（:129-156）——
  const q_eye = rand_n(100); // :130
  set_t(
    cid,
    T_目,
    q_eye <= 10
      ? 1 // :134-136 切れ長 11%
      : q_eye <= 20
        ? 2 // :137-139 大きい 10%
        : q_eye <= 25
          ? 3 // :140-142 神秘的 5%
          : q_eye <= 35
            ? 4 // :143-145 釣り目 5%
            : q_eye <= 40
              ? 5 // :146-148 潤み目 5%
              : q_eye <= 45
                ? 8 // :149-151 たれ目 5%
                : q_eye <= 48
                  ? 7 // :152-154 三白眼 3%
                  : 6, // :155-157 標準 56%
  );

  // —— 瞳色（:159-179）——
  const q_eye_color = rand_n(100); // :160
  set_t(
    cid,
    T_瞳色,
    q_eye_color <= 40
      ? 1 // :162-164 碧
      : q_eye_color <= 60
        ? 2 // :165-167 ブラウン
        : q_eye_color <= 80
          ? 6 // :168-170 黒
          : q_eye_color <= 97
            ? 3 // :171-173 グレー
            : q_eye_color <= 98
              ? 4 // :174-176 ゴールド
              : 5, // :177-179 クリムゾン
  );

  // —— 唇（:181-195）——
  const q_lip = rand_n(6); // :182
  set_t(
    cid,
    T_唇,
    q_lip === 0
      ? 1 // :184-186 肉感的
      : q_lip === 1
        ? 2 // :187-189 薄い
        : q_lip === 2
          ? 3 // :190-192 瑞々しい
          : 4, // :193-195 標準
  );

  // —— 体型（:197-207）——
  const q_body = rand_n(3); // :197-199
  set_t(
    cid,
    T_体型,
    q_body === 0
      ? 300 // :200-202 丰满
      : q_body === 1
        ? 1 // :203-205 骨感
        : 150, // :206-207 標準
  );

  // —— 乳头（:209-223）——
  const q_nipple = rand_n(6); // :210
  set_t(
    cid,
    T_乳头,
    q_nipple === 0
      ? 1 // :212-214 ピンク
      : q_nipple === 1
        ? 2 // :215-217 褐色
        : q_nipple === 2
          ? 4 // :218-220 陥没
          : 3, // :221-223 標準
  );

  // —— 陰毛（:225-243）——
  const q_pubic = rand_n(150); // :226
  set_t(
    cid,
    T_阴毛生长极限,
    q_pubic <= 20
      ? 1 // :228-230 無
      : q_pubic <= 45
        ? 20 // :231-233 産毛
        : q_pubic <= 70
          ? 50 // :234-236 薄い
          : q_pubic <= 100
            ? 100 // :237-239 標準
            : q_pubic <= 130
              ? 150 // :240-242 濃い
              : 201, // :243-245 剛毛
  );
  set_t(cid, T_阴毛状态, t(cid, T_阴毛生长极限)); // :246-247

  // —— ペニス（:249-266）有無にかかわらず設定は入れておく ——
  const q_penis = rand_n(150); // :251
  const boyish = t(cid, T_未熟);
  set_t(
    cid,
    T_阴茎的状态,
    q_penis <= 50
      ? 0 // :253-255 普通
      : q_penis <= 100 || (boyish && q_penis <= 50)
        ? 3 // :256-258 包茎
        : q_penis <= 130 || (boyish && q_penis <= 100)
          ? 2 // :259-261 短小包茎
          : 1, // :262-264 巨根
  );
  // :266-268 包茎・短小包茎は早漏を得ることがあるように
  const penis_state = t(cid, T_阴茎的状态);
  if ((penis_state === 2 || penis_state === 3) && rand_n(10) === 0) {
    set_t(cid, T_早泄, 1);
  }

  // —— 魅力点（:270-302）：$CHARMPOINT 标号 + 两处 GOTO 重掷 ——
  let charm; // :271-272 $CHARMPOINT
  for (;;) {
    charm = rand_n(28) + 1;
    // :276-278 贫乳は美乳になれない（109 命中且掷到 12 → 重掷）
    if (t(cid, T_贫乳) && charm === 12) {
      continue;
    }
    // :285-292 自前のペニス持ちなら追加のふたなり獲得チャンス
    if (charm === 24) {
      if (rand_n(40) === 0 && t(cid, T_男人) === 0) {
        set_t(cid, T_扶她, 1);
      }
      // :289-291 ふたなりになれなければチャームポイント決め直し
      if (t(cid, T_扶她) === 0 && t(cid, T_男人) === 0) {
        continue;
      }
    }
    break;
  }
  set_t(cid, T_魅力点, charm); // :300-302

  // —— 癖（:305-315）：$HABIT 标号 + 说话不能时重掷 ——
  let habit; // :306-308 $HABIT
  for (;;) {
    habit = rand_n(34) + 1;
    // :310-312 話せないなら決め台詞はありえない（金红桃 167 命中且掷到 25 → 重掷）
    if (t(cid, T_金红桃) && habit === 25) {
      continue;
    }
    break;
  }
  set_t(cid, T_癖, habit); // :315

  race_set(cid, arg, rand_n); // :320-499 $RACE
  born_set(cid, rand_n); // :506-583 $BORN
  reason_set(cid, rand_n); // :585-608 $REASON
  love_set(cid, rand_n); // :610-624 $LOVE
  family_set(cid, rand_n); // :626-791 $FAMILY

  return 1; // :808-812 RETURN 1
}

/**
 * 源 `$RACE` 段（:320-499）：种族与种族特性。
 *
 * @param {number} cid 角色 ID
 * @param {number} arg 种族设定（源 ARG）
 * @param {(n: number) => number} rand_n RAND:N 随机源
 */
function race_set(cid, arg, rand_n) {
  // :328-329 精英は种族随机作成を行わないように修正
  if (t(cid, T_精英) !== 1) {
    const q = rand_n(200); // :330
    // :331-333 人間 50%（ARG == -1 强制人类）
    if ((arg === 0 && q <= 99) || arg === -1) {
      set_t(cid, T_种族, 0);
    } else if ((arg === 0 && q <= 119) || arg === 10) {
      // :334-350 ホビット
      set_t(cid, T_种族, 10);
      set_t(cid, T_娇小, 1);
      if (t(cid, T_男人) === 0) {
        set_t(cid, T_贫乳, 1);
      }
      // :340-345 ドワーフとホビットには巨乳と大柄は付かない（絶壁と爆乳、超乳も付かない）
      set_t(cid, T_绝壁, 0);
      set_t(cid, T_爆乳, 0);
      set_t(cid, T_超乳, 0);
      set_t(cid, T_巨乳, 0);
      set_t(cid, T_魁梧, 0);
      // :346-350 ホビットは陰毛が無毛になりやすい
      if (rand_n(10) <= 3) {
        set_t(cid, T_阴毛生长极限, 1);
        set_t(cid, T_阴毛状态, 1);
      }
    } else if ((arg === 0 && q <= 139) || arg === 11) {
      // :351-367 ドワーフ
      set_t(cid, T_种族, 11);
      set_t(cid, T_娇小, 1);
      if (t(cid, T_男人) === 0) {
        set_t(cid, T_贫乳, 1);
      }
      set_t(cid, T_绝壁, 0);
      set_t(cid, T_爆乳, 0);
      set_t(cid, T_超乳, 0);
      set_t(cid, T_巨乳, 0);
      set_t(cid, T_魁梧, 0);
      // :363-367 ドワーフは陰毛が剛毛になりやすい
      if (rand_n(10) <= 3) {
        set_t(cid, T_阴毛生长极限, 201);
        set_t(cid, T_阴毛状态, 201);
      }
    } else if ((arg === 0 && q <= 159) || arg === 1) {
      // :368-371 エルフ（善恶值が高い）
      set_t(cid, T_种族, 1);
      karma(cid, 20);
    } else if ((arg === 0 && q <= 169) || arg === 2) {
      // :372-376 人狼（善恶值が低い）
      set_t(cid, T_种族, 2);
      set_t(cid, T_动物耳朵, 1);
      karma(cid, -20);
    } else if ((arg === 0 && q <= 179) || arg === 3) {
      // :377-380 吸血鬼
      set_t(cid, T_种族, 3);
      karma(cid, -40);
    } else if ((arg === 0 && q <= 189) || arg === 4) {
      // :381-387 无头骑士
      set_t(cid, T_种族, 4);
      if (rand_n(40) === 0) {
        set_t(cid, T_暗之能力者, 1);
      }
      karma(cid, -40);
    } else if ((arg === 0 && q <= 197) || arg === 5) {
      // :388-391 ドラゴン（角）
      set_t(cid, T_种族, 5);
      set_t(cid, T_角, 1);
    } else if (arg) {
      // :392-394 その他指定の種族
      set_t(cid, T_种族, arg);
    } else {
      // :395-401 天使（光之能力者，善恶值が高い）
      set_t(cid, T_种族, 6);
      if (rand_n(40) === 0) {
        set_t(cid, T_光之能力者, 1);
      }
      karma(cid, 40);
    }
    return;
  }

  // :403-497 精英の場合はこちら（种族 9 + 种族2 的特性）
  set_t(cid, T_种族, 9);
  const race2 = t(cid, T_种族2); // :404-406 TALENT:319
  if (race2 === 1) {
    // :406-414 亜人
    if (rand_n(4) === 0) {
      set_t(cid, 472, 1); // 落穴捕获
    }
    // :411-414 亜人は陰毛が剛毛になりやすい
    if (rand_n(10) <= 3) {
      set_t(cid, T_阴毛生长极限, 201);
      set_t(cid, T_阴毛状态, 201);
    }
  } else if (race2 === 2) {
    // :415-427 史莱姆（無毛）
    set_t(cid, T_史莱姆, 1);
    if (rand_n(4) === 0) {
      set_t(cid, 471, 1); // 粘液捕获
    }
    set_t(cid, T_阴毛生长极限, 1);
    set_t(cid, T_阴毛状态, 1);
  } else if (race2 === 3) {
    // :428-434 昆虫（战术）
    set_t(cid, T_战术, 1);
    if (rand_n(4) === 0) {
      set_t(cid, 474, 1); // 铠破坏
    }
  } else if (race2 === 4) {
    // :435-441 植物（たまに触手を持つ）
    if (rand_n(10) === 0) {
      set_t(cid, T_触手, 1);
    }
    if (rand_n(4) === 0) {
      set_t(cid, 473, 1); // 藤蔓捕获
    }
  } else if (race2 === 5 || race2 === 11) {
    // :442-446 触手＆脑奸
    set_t(cid, T_触手, 1);
    if (rand_n(4) === 0) {
      set_t(cid, 476, 1); // 再生
    }
  } else if (race2 === 6) {
    // :447-463 妖精
    set_t(cid, T_小人体型, 1);
    set_t(cid, T_魁梧, 0);
    set_t(cid, T_娇小, 0);
    if (rand_n(4) === 0) {
      set_t(cid, 478, 1); // 迷惑
    }
    // :455-457 妖精の大半は幼稚である
    if (rand_n(4) !== 0) {
      set_t(cid, T_幼稚, 1);
    }
    // :458-462 妖精は陰毛が無毛になりやすい
    if (rand_n(10) <= 3) {
      set_t(cid, T_阴毛生长极限, 1);
      set_t(cid, T_阴毛状态, 1);
    }
  } else if (race2 === 7) {
    // :464-465 巨人（无追加设定）
  } else if (race2 === 8 || race2 === 9) {
    // :466-479 男＆女魔族
    set_t(cid, T_恶魔翅膀, 1);
    set_t(cid, T_恶魔尾巴, 1);
    set_t(cid, T_恶魔眼睛, 1);
    if (rand_n(4) === 0) {
      if (race2 === 8) {
        set_t(cid, 485, 1); // 魔力吸取
      } else {
        set_t(cid, 481, 1); // 诱惑
      }
    }
  } else {
    // :480-487 獣＆馬。**源写 `ELSEIF TALENT:319 == 10 || 12`——`|| 12` 是
    // 恒真常量（Emuera 的 || 两侧按数值取真），该臂因此等价于 ELSE**：任何
    // 未命中前几档的 319 值都落到这里。写法上收成裸 else（ESLint 的
    // no-constant-condition 会拦原样照抄），语义逐字相同
    set_t(cid, T_恶魔肌肤, 0);
    set_t(cid, T_褐色肌肤, 0);
    set_t(cid, T_白皙, 0);
    set_t(cid, T_兽类, 1);
    set_t(cid, T_俊足, 1);
    set_t(cid, T_动物耳朵, 1);
    if (rand_n(4) === 0) {
      set_t(cid, 479, 1); // 吐息
    }
  }
}

/**
 * 源 `$BORN` 段（:506-583）：成为勇者前的生活 + 对应的经验与善恶值。
 *
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} rand_n RAND:N 随机源
 */
function born_set(cid, rand_n) {
  let q; // :507-508 $BORN
  for (;;) {
    q = rand_n(21) + 1;
    // :510-513 配下の場合、特別な元職業
    if (t(cid, T_精英) === 1 || ex_t(cid, 2)) {
      q = 90 + rand_n(4);
    }
    // :514-515 法術を知らない場合修道女にはなれない
    if (q === 2 && t(cid, T_法术) === 0) {
      continue;
    }
    break;
  }

  // :516-556 妓女・物乞い・奴隷の場合、経験がつく
  // （EXP:0/1/5/74 属 dungeon 域 → 走 chara(cid).dungeon 门面，#71）
  if (q === 5 || q === 7 || q === 20) {
    if (t(cid, T_男人) && t(cid, T_童贞)) {
      // :518-524 童貞オトコの場合
      const local = rand_n(20) + 1;
      chara(cid).dungeon.肛门经验 += local;
      chara(cid).dungeon.性交经验 += local;
      if (q !== 20) {
        chara(cid).dungeon.卖淫经验 += local;
      }
    } else if (t(cid, T_男人)) {
      // :525-530 オトコの場合
      const local = rand_n(40) + 1;
      chara(cid).dungeon.肛门经验 += local;
      chara(cid).dungeon.性交经验 += local;
      if (q !== 20) {
        chara(cid).dungeon.卖淫经验 += local;
      }
    } else if (t(cid, T_处女) === 1) {
      // :531-536 处女の場合
      const local = rand_n(40) + 1;
      chara(cid).dungeon.肛门经验 += local;
      chara(cid).dungeon.性交经验 += local;
      if (q !== 20) {
        chara(cid).dungeon.卖淫经验 += local;
      }
    } else if (rand_n(5) === 0) {
      // :537-546 非处女でアナルも使用している
      const local0 = rand_n(40) + 1;
      const local1 = rand_n(40) + 1;
      chara(cid).dungeon.私处经验 += local0;
      chara(cid).dungeon.肛门经验 += local1;
      const sum5 = chara(cid).dungeon.私处经验 + chara(cid).dungeon.肛门经验;
      chara(cid).dungeon.性交经验 += sum5;
      if (q !== 20) {
        chara(cid).dungeon.卖淫经验 += sum5;
      }
    } else {
      // :547-551 非处女でVのみ
      const local = rand_n(40) + 1;
      chara(cid).dungeon.私处经验 += local;
      chara(cid).dungeon.性交经验 += local;
      if (q !== 20) {
        chara(cid).dungeon.卖淫经验 += local;
      }
    }

    // :553-559 妓女と奴隷は、刺青を入れられていることがある
    if (rand_n(15) === 0 && q !== 7 && t(cid, T_男人) === 0) {
      const local = rand_n(8) + 10; // :555
      // :556 `LOCALS:10 '= "淫乱" , …"骷髅"`（10 项），:557 `CSTR:LOCAL = %LOCALS:LOCAL%`
      era.set(`cstr:${cid}:${local}`, TATTOO_NAMES[local - 10]);
    }

    // :561-563 非处女の場合、生育经验がつくことがある（EXP:60 属主 chara）
    if (t(cid, T_处女) === 0 && rand_n(15) === 0 && t(cid, T_男人) === 0) {
      chara(cid).chara.生育经验 += rand_n(3);
    }
    // :565 そして善恶值が低い
    karma(cid, -30);
  } else if (q === 2 || q === 8 || q === 11 || q === 12 || q === 13) {
    // :566-571 修道女・貴族・巫女・聖女・予言者は善恶值が高い
    karma(cid, 30);
    // :569-571 光之能力者になるチャンス
    if (rand_n(40) === 0) {
      set_t(cid, T_光之能力者, 1);
    }
  } else if (q === 6) {
    // :572-574 盗人は善恶值が低い
    karma(cid, -40);
  } else if (q === 21 && t(cid, T_男人) === 0) {
    // :575-580 主婦は経験がつく + 確定で子持ち
    const local0 = rand_n(20) + 10;
    chara(cid).dungeon.私处经验 += local0;
    chara(cid).dungeon.性交经验 += local0;
    set_t(cid, T_处女, 0); // :596 处女を失う
    set_t(cid, T_私处封印, 0); // :597-599 私处封印も失う
    set_t(cid, T_人妻, 1); // :600 必ず人妻がつく
  }
  set_t(cid, T_成为勇者前的生活, q); // :583
}

/**
 * 源 `$REASON` 段（:585-608）：成为勇者的理由。
 *
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} rand_n RAND:N 随机源
 */
function reason_set(cid, rand_n) {
  let q = rand_n(20) + 1; // :586-587
  // :589-590 配下の場合、特別な理由
  if (t(cid, T_精英) === 1 || ex_t(cid, 2)) {
    q = 90 + rand_n(4);
  }
  // :591-592 `SIF Q > 103 && EX_TALENT:2 → Q = 93`：Q 只可能是 1-20 或
  // 90-93，此判定在两个赋值点之后**恒假**（1:1 保留原写法，见文件头）
  if (q > 103 && ex_t(cid, 2)) {
    q = 93;
  }
  if (q === 1 || q === 3 || q === 4 || q === 7 || q === 16 || q === 17) {
    // :592-596 運命・啓示・使命・故郷・平和・正義は善恶值が高い
    karma(cid, 20);
  } else if (q === 2 || q === 11 || q === 13) {
    // :596-598 金・自暴自棄・命令は善恶值が低い
    karma(cid, -20);
  }
  set_t(cid, T_成为勇者的契机, q); // :606-608
}

/**
 * 源 `$LOVE` 段（:610-624）：喜欢的东西。
 *
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} rand_n RAND:N 随机源
 */
function love_set(cid, rand_n) {
  const q = rand_n(20) + 1; // :611-612
  if (q === 4 || q === 8 || q === 9 || q === 10 || q === 11) {
    // :613-615 恋人・家族・使命・故郷・憧れは善恶值が高い
    karma(cid, 20);
  } else if (q === 5 || q === 13 || q === 14) {
    // :616-618 金・装飾品・宝石は善恶值が低い
    karma(cid, -20);
  }
  set_t(cid, T_喜欢的东西, q); // :624
}

/**
 * 源 `$FAMILY` 段（:626-791）：家族构成码（TALENT:320）的生成。
 *
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} rand_n RAND:N 随机源
 */
function family_set(cid, rand_n) {
  // :632-633 非精英（TALENT:220 == 0）は家族構成設定あり＝個位 1 から始める
  if (t(cid, T_精英) === 0) {
    set_t(cid, T_家族构成, 1);
  }

  let local = 0; // :628-629 LOCAL = 0
  let marry = 0; // :629 MARRY = 0

  // :631-662 結婚相手の設定
  if (t(cid, T_人妻) === 1) {
    // :633-643 人妻：バツ2 / バツ1 / 初婚
    if (rand_n(20) === 0) {
      local += 30;
    } else if (rand_n(10) === 0) {
      local += 20;
    } else {
      local += 10;
    }
    local += 10000; // :644 現在の状況…結婚
    marry = 1;
  } else if (rand_n(20) === 0 && ex_t(cid, 2) === 0) {
    // :646-662 離婚または未亡人
    if (rand_n(10) === 0) {
      local += 20; // バツ2
    } else {
      local += 10; // バツ1
    }
    if (rand_n(2) === 0) {
      local += 20000; // 離婚
    } else {
      local += 50000; // 死別（未亡人）
    }
    marry = 1;
  }

  // :666-736 子供の設定（非処女限定）
  if (t(cid, T_成为勇者前的生活) === 21 && t(cid, T_处女) === 0) {
    // :669-679 主婦：最大 4 人（ループ抜けの位置が違うので、一人は確定する）
    for (let i = 0; i < 4; i += 1) {
      local += rand_n(2) === 0 ? 100 : 1000; // 娘 / 息子
      if (rand_n(2) === 0) {
        break;
      }
    }
  } else if (local >= 10 && t(cid, T_处女) === 0) {
    // :680-694 結婚経験がある
    for (let i = 0; i < 4; i += 1) {
      if (rand_n(2) === 0) {
        break;
      }
      local += rand_n(2) === 0 ? 100 : 1000;
    }
  } else if (rand_n(20) === 0 && t(cid, T_处女) === 0) {
    // :695-735 未婚の母：最大 2 人（娼婦は 4 人もいる可能性）
    let limit = 2; // :698-700 LOCAL:2 = 2
    if (t(cid, T_成为勇者前的生活) === 5) {
      limit += 2; // :701
    }
    for (let i = 0; i < limit; i += 1) {
      if (rand_n(2) === 0) {
        break;
      }
      local += rand_n(2) === 0 ? 100 : 1000;
    }
  }

  // :738-758 兄弟姉妹の設定（最大 4 人）
  for (let i = 0; i < 4; i += 1) {
    if (rand_n(2) === 0) {
      break;
    }
    if (rand_n(4) === 0) {
      local += 100000; // 姉
    } else if (rand_n(3) === 0) {
      local += 1000000; // 兄
    } else if (rand_n(2) === 0) {
      local += 10000000; // 妹
    } else {
      local += 100000000; // 弟
    }
  }

  // :760-790 性別の設定（人妻の場合）
  if (t(cid, T_男人) === 1 && marry === 1) {
    // :762-771 オトコ
    if (rand_n(20) === 0) {
      local += 8000000000; // 男男カップル
      chara(cid).system.断背气质 = 3; // :768-770 BLっ気補正
    } else if (rand_n(8) === 0) {
      local += 7000000000; // 男ふたカップル
    } else {
      local += 6000000000; // 男女カップル
    }
  } else if (t(cid, T_扶她) === 1 && marry === 1) {
    // :772-785 ふたなり
    if (rand_n(10) === 0) {
      local += 5000000000; // 希少なふたなりのカップル
      chara(cid).chara.百合气质 = 3; // :779 百合气质補正
    } else if (rand_n(2) === 0) {
      local += 4000000000; // ふた男カップル
    } else {
      local += 3000000000; // ふた女カップル
      chara(cid).chara.百合气质 = 3; // :782-784
    }
  } else if (marry === 1) {
    // :786-790 女
    if (rand_n(20) === 0) {
      local += 2000000000; // 女女カップル
      chara(cid).chara.百合气质 = 3; // :788
    } else if (rand_n(8) === 0) {
      local += 1000000000; // 女ふたカップル
      chara(cid).chara.百合气质 = 3; // :788-792
    }
  }

  // :793 データ反映
  era.add(`talent:${cid}:${T_家族构成}`, local);
}

/**
 * @LOOK_CLEAR（:814-822）：把 TALENT:300 起的全部外貌素质清零。
 *
 * 源 `REPEAT 314` 扫 COUNT = 0..313，`SIF COUNT < 300 → COUNT = 300`——
 * 即 0-299 一律归到 300、300-313 用自己的号，于是实际只清 300..313，
 * 且 300 被写 300 次。1:1 保留这个等价形状（写 300 一次 + 301..313 一次，
 * 结果相同；随机性与副作用皆无，重复写不产生可观测差异）。
 *
 * @param {number} cid 角色 ID（源 TARGET）
 * @param {number} [count] 源循环变量初值（缺省 0；测试用）
 */
function look_clear(cid) {
  set_t(cid, 300, 0);
  for (let count = 301; count <= 313; count += 1) {
    set_t(cid, count, 0);
  }
}

/**
 * @LOVE_LIKE_BASE（:2811-2884）：TALENT:317 的字面档 → 文本。
 *
 * 源是「打印 + 返回命中标志」的二合一（:2815-2819 `LOCAL = 0`，命中则
 * `LOCAL++` 后 `RETURN LOCAL`）。本实现返回 `{printed, matched}`：调用方
 * （look_info_love）需要的是「有没有命中」与「输出什么串」，而打印时机由
 * 调用方决定——与源在 LOOK_INFO_LOVE 里的用法（`CALL LOVE_LIKE_BASE` 后
 * `SIF RESULT == 0 CONTINUE`）等价。
 *
 * @param {number} cid 角色 ID（源 TARGET）
 * @returns {{printed: string, matched: boolean}} 命中的文本与命中标志
 */
function love_like_base(cid) {
  const v = t(cid, T_喜欢的东西); // :2815-2817 TALENT:317
  const zero_cflag0 = (era.get(`cflag:${cid}:0`) || 0) === 0; // :2823-2825 起四处 `&& CFLAG:0 == 0`
  const table = [
    [1, true, '甜食'],
    [2, true, '辣条'],
    [3, true, '唱歌'],
    [4, zero_cflag0, '故乡的恋人'],
    [5, true, '钱'],
    [6, true, '跳舞'],
    [7, true, '绘画'],
    [8, zero_cflag0, '家族'],
    [9, zero_cflag0, '使命'],
    [10, zero_cflag0, '故乡'],
    [11, zero_cflag0, '憧憬的那个人'],
    [12, true, '可爱的动物'],
    [13, true, '美丽的饰品'],
    [14, true, '宝石'],
    [15, true, '点心'],
    [16, true, '喝茶'],
    [17, true, '睡觉'],
    [18, true, '小说'],
    [19, true, '开怀大笑'],
    [20, true, '游泳'],
  ];
  for (const [code, ok, text] of table) {
    if (v === code && ok) {
      return { printed: text, matched: true }; // :2819 起 `PRINTFORM …` + `LOCAL++`
    }
  }
  return { printed: '', matched: false }; // :2881-2885 RETURN LOCAL（未被覆盖 → 0）
}

/** SETCOLORBYNAME LightSalmon 的 ere 等价物（LOOK.ERB:859 起全篇的高亮色） */
const LIGHT_SALMON = 'LightSalmon';
/** SETCOLORBYNAME LightGreen 的 ere 等价物（:1557-1559 借金行） */
const LIGHT_GREEN = 'LightGreen';

/**
 * LOOK_INFO 族的输出片段缓冲：源里 `SETCOLORBYNAME X … RESETCOLOR` 之间的
 * 文字是一个彩色片段（page-shop-trap.js / page-dungeon-info2.js 的
 * `{content,color}` 数组先例）。一次 era.print = 源里一条 PRINTL 行。
 *
 * **一处有意偏离（行合并）**：源 :915-978 的「头发颜色と性質」与「头发长度・
 * カット・髪型」两块之间没有 PRINTL，在 Emuera 里落在同一行；本实现按块各出
 * 一行。理由有二：引擎每次 era.print 即一行（page-shop-trap.js 头注的同一
 * 约束），而两块之间在口上视角还夹着 `CALL GOBI_KOUJO`（异步整行输出），
 * 引擎的行模型下「插入后再续写」没有对应形态。文本内容逐字一致，只有分行
 * 位置不同。
 */
class Spans {
  constructor() {
    this.parts = [];
  }

  /** 普通片段 */
  add(text) {
    if (text !== '') this.parts.push({ content: text });
    return this;
  }

  /** 高亮片段（LightSalmon） */
  hl(text) {
    if (text !== '') this.parts.push({ content: text, color: LIGHT_SALMON });
    return this;
  }

  /** 指定色的片段 */
  color(text, color) {
    if (text !== '') this.parts.push({ content: text, color });
    return this;
  }

  /** 取走当前片段并清空（一次 print 一行） */
  take() {
    const parts = this.parts;
    this.parts = [];
    return parts;
  }

  /** 当前是否已有内容 */
  get filled() {
    return this.parts.length > 0;
  }
}

/** 素质下标（LOOK_INFO / LOOK_INFO_LOVE 专用的一批；与文件上半同名的各自定义） */
const T_服从 = 85; // 爱慕
const T_淫乱_T = 76;
const T_低姿态 = 17; // 源 :1488 的 TALENT:17
const T_冒渎者 = 282;
const T_法术 = 242; // 法术（上半 $BORN 的修道女判定与 $RACE 之外都读它）
const T_咒术 = 250;
const T_原种族_T = 321;
const T_现种族_T = 322;
const T_妊娠适性 = 158;
const T_好奇心 = 23;
const T_保守的 = 24;
const T_看重贞操 = 30;
const T_看轻贞操 = 31;
const T_害羞 = 35;
const T_不知羞耻 = 36;
const T_害怕疼痛 = 40;
const T_喜欢精液 = 47;
const T_漏尿癖 = 57;
const T_容易自慰 = 60;
const T_自慰狂 = 74;
const T_性爱狂 = 75;
const T_尻穴狂 = 77;
const T_弄乳狂 = 78;
const T_倒错的 = 80;
const T_施虐狂 = 83;
const T_受虐狂 = 88;
const T_露出狂 = 89;
const T_阴蒂钝感 = 101;
const T_阴蒂敏感 = 102;
const T_私处钝感 = 103;
const T_私处敏感 = 104;
const T_肛门钝感 = 105;
const T_肛门敏感 = 106;
const T_乳房钝感 = 107;
const T_乳房敏感 = 108;
const T_母乳体质 = 130;
const T_恋母情结 = 140;
const T_恋父情结 = 141;
const T_萝莉控 = 142;
const T_正太控 = 143;
const T_从不自慰 = 150;
const T_绝不侍奉 = 151;
const T_妓女 = 180;
const T_倾城 = 181;
const T_肉便器 = 204;
const T_淫核 = 230;
const T_淫乳 = 231;
const T_淫壶 = 232;
const T_淫肛 = 233;
const T_狂王俘虏 = 280;

/** 经验下标（源里写名字，这里落 yml/Exp.yml 的 id） */
const E_精饮绝顶经验 = 8;
const E_侍奉快乐经验 = 21;
const E_爱情经验 = 23;
const E_被虐快乐经验 = 30;
const E_肛门快乐经验 = 32;
const E_施虐快乐经验 = 33;
const E_营业爱情经验 = 75;

/** 刻印下标（MARK:cid:n） */
const M_屈服刻印 = 2;
const M_快乐刻印 = 1;
const M_反抗刻印 = 3;

/** 种族（TALENT:314）里「高洁」「恶」「堕落」三组（源 :1755-1757 / :1777-1783 / :1790-1792） */
const RACES_NOBLE = [1, 6];
const RACES_EVIL = [3, 4];
const RACES_FALLEN = [7, 8, 9];

/** 喜欢的东西的档位（LOVE_ID → MAIN_LOVE 下标；源 :1674-1712 的注释表） */
const LOVE = {
  喜欢的东西: 0,
  你: 1,
  世界: 2,
  肉棒: 3,
  自ペニス: 4,
  C性感: 10,
  V性感: 11,
  A性感: 12,
  B性感: 13,
  自慰: 20,
  性交: 21,
  卖淫: 22,
  奉仕: 30,
  精液: 31,
  同性愛: 32,
  受虐: 33,
  施虐: 34,
  露出: 35,
  夫: 40,
  新夫: 41,
  恋人: 42,
  コンプレックス: 50,
  母: 51,
  父: 52,
  少女: 53,
  少年: 54,
  野良犬: 60,
  獣姦: 61,
  狂王: 62,
};

/** LOVE_SORT 的长度（源 :2620 `WHILE LOVE_COUNT < 30` 与 :2723 的 `FOR … 30`） */
const LOVE_SORT_MAX = 30;
/** 显示门槛（源 :2711 `SIF MAIN_LOVE:LOVE_ID <= 3 CONTINUE`） */
const LOVE_SHOW_MIN = 3;
/** 心形上限（源 :2743 `SIF HEART > 6`） */
const LOVE_HEART_MAX = 6;
/** 每行几个（源 :2755 `IF LOVE_NUM % 6 == 0`） */
const LOVE_PER_ROW = 6;

/** ABL 读数 */
const abl_of = (cid, idx) => era.get(`abl:${cid}:${idx}`) || 0;
/** EXP 读数 */
const exp_of = (cid, idx) => era.get(`exp:${cid}:${idx}`) || 0;
/** MARK 读数 */
const mark_of = (cid, idx) => era.get(`mark:${cid}:${idx}`) || 0;
/** CFLAG 读数 */
const cflag_of = (cid, idx) => era.get(`cflag:${cid}:${idx}`) || 0;

/** FLAG:5 位 11（2048）= 「口上视角」（源全篇的 `IF FLAG:5 & 2048`） */
function kojo_view() {
  return ((era.get('flag:5') || 0) & 2048) !== 0;
}

/**
 * `CALL GOBI_KOUJO, x`（语尾口上）：返回语尾文字，由调用方拼进当前行
 * （原作 GOBI 不换行 PRINT、接在前后 PRINT 之间；#570）。真身在
 * kojo-system，未落地的性格返回空串。
 *
 * @param {number} arg0 情绪档位
 * @returns {Promise<string>} 语尾文字（空串 = 落空）
 */
async function gobi_koujo(arg0) {
  return require('#/kojo/kojo-system').gobi_koujo(arg0);
}

/** `%CSVNAME(NO:TARGET)%`：角色预设的「名前」（callname -1 槽，chara-name.js 先例） */
const csv_name = (cid) => era.get(`callname:${cid}:-1`) ?? '';

/**
 * @LOOK_INFO（:823-1666）：角色外观与来历的整屏描述。
 *
 * 两个视角同函数内分叉（源 `IF FLAG:5 & 2048`）：口上视角用「」引号 +
 * LightSalmon 高亮 + 语尾口上（GOBI_KOUJO）；默认视角用 [] 分节。
 * 每个「块」一次 era.print（见 Spans 头注的行合并说明）。
 *
 * @param {number} cid 角色 ID（源 TARGET）
 * @returns {Promise<number>} 源 :1656-1660 `RETURN 1`
 */
async function look_info(cid) {
  // :829-832 LOCALS / LOCALS:1..3（LOCALS 是函数局部，天然为空）
  const loc0 = get_look_info(cid, '种族'); // :834
  let loc1 = '';
  let loc2 = '';
  let loc3 = '';
  if (t(cid, T_精英)) {
    // :836-841 精英は2つ目の素質を持つ
    const race2 = t(cid, T_种族2);
    if (race2 !== 8 && race2 !== 9) {
      loc1 = get_look_info(cid, '种族2');
    }
    loc2 = csv_name(cid); // CSVNAME(NO:TARGET)
  } else if (t(cid, T_种族) === 9) {
    // :843-851 魔族化済みで现种族が設定されていない場合設定しておく
    const now = t(cid, T_现种族_T);
    if (!(now >= 100 && now <= 220)) {
      set_t(cid, T_现种族_T, 132); // インプ
    }
    loc2 = era.get(`itemname:${t(cid, T_现种族_T)}`) ?? '';
    loc3 = get_look_info(cid, '原种族');
    if (t(cid, T_原种族_T) === 9) {
      loc3 = '不明';
    }
  }

  const mark_rank = mark_of(cid, M_屈服刻印); // MARK:屈服刻印
  const gobi_mark = mark_rank >= 3 ? 0 : 4; // (MARK:屈服刻印 >= 3) ? 0 # 4

  if (kojo_view()) {
    // :855-893 口上视角
    const s = new Spans();
    s.add('「');
    if (cid === 0) s.add('拥有');
    s.hl(loc0);
    if (loc1.length > 0) s.add(`·${loc1}`);
    if (loc2.length > 0) s.add(`·${loc2}`);
    if (cid === 0) s.add('肉体');
    s.add(`的${chara_callname(cid)}`);
    s.add(await gobi_koujo(gobi_mark)); // :877
    s.add('」');
    era.print(s.take());

    if (loc3.length > 0) {
      // :880-892
      const t3 = new Spans();
      t3.add('「成为魔族前的种族：');
      if (t(cid, T_原种族_T) === 9) {
        t3.add('不明');
        t3.add(await gobi_koujo(t(cid, T_服从) || t(cid, T_淫乱_T) ? 0 : 3));
      } else {
        t3.hl(loc3);
        t3.add(await gobi_koujo(mark_rank >= 3 ? 0 : 2));
      }
      t3.add('」');
      era.print(t3.take());
    }
    // :892-894 PRINTL（口上视角的收尾换行；默认视角没有）
    era.println();
  } else {
    // :894-903 默认视角
    const s = new Spans();
    s.add(`[${loc0}`);
    if (loc1.length > 0) s.add(`·${loc1}`);
    if (loc2.length > 0) s.add(`：${loc2}`);
    s.add(']');
    era.print(s.take());
    if (loc3.length > 0) {
      era.print(`[原种族：${loc3}]`); // :905-907
    }
  }

  const kojo = kojo_view();

  // :915-941 头发颜色と性質
  if (t(cid, T_头发颜色) && t(cid, T_头发状态)) {
    const s = new Spans();
    if (kojo) {
      s.add('「头发是').hl(get_look_info(cid, '头发颜色')).add('的');
      s.hl(get_look_info(cid, '头发状态'));
      s.add(await gobi_koujo(1));
      s.add('」');
    } else {
      s.add(`[发色：${get_look_info(cid, '头发颜色')}`);
      s.add(`][头发状态：${get_look_info(cid, '头发状态')}`);
      s.add(']');
    }
    era.print(s.take());
  }

  // :944-978 头发长度・カット・髪型
  if (t(cid, T_头发长度) && t(cid, T_头发修剪方式) && t(cid, T_发型)) {
    const s = new Spans();
    const male = t(cid, T_男人) !== 0;
    if (kojo) {
      s.add('「留着').hl(get_look_info(cid, '头发长度')).add('头发，');
      s.hl(get_look_info(cid, '头发修剪方式')).add('式的');
      // :962-966 男性去除髮型顯示（口上视角同样只跳过名字本身）
      if (!male) {
        s.hl(get_look_info(cid, '发型'));
      }
      s.add(await gobi_koujo(0));
      s.add('」');
    } else {
      s.add(`[头发长度：${get_look_info(cid, '头发长度')}`);
      s.add(`][修剪：${get_look_info(cid, '头发修剪方式')}`);
      if (!male) {
        s.add(`][发型：${get_look_info(cid, '发型')}`);
      }
      s.add(']');
    }
    era.print(s.take());
  }

  // :981-1021 その他の外見（目・瞳色・唇）
  if (t(cid, T_目) && t(cid, T_瞳色) && t(cid, T_唇)) {
    const s = new Spans();
    if (kojo) {
      s.add('「我的').hl(get_look_info(cid, '目')).add('是');
      s.hl(get_look_info(cid, '瞳色')).add('的，嘴唇是');
      s.hl(get_look_info(cid, '唇'));
      s.add(await gobi_koujo(1));
      s.add('」');
    } else {
      s.add(`[眼形：${get_look_info(cid, '目')}`);
      s.add(`][瞳色：${get_look_info(cid, '瞳色')}`);
      s.add(`][唇：${get_look_info(cid, '唇')}`);
      s.add(']');
    }
    era.print(s.take());
  }

  // :1022-1080 体型・乳头・阴毛・阴茎
  if (t(cid, T_体型) && t(cid, T_乳头) && t(cid, T_阴毛状态)) {
    const s = new Spans();
    if (kojo) {
      s.add('「').hl(get_look_info(cid, '体型')).add('的体型……');
      s.add('乳头嘛……').hl(get_look_info(cid, '乳头'));
      s.add(await gobi_koujo(0));
      s.add('下面的毛毛……').hl(get_look_info(cid, '阴毛状态'));
      s.add(await gobi_koujo(4));
      if (t(cid, T_扶她) || t(cid, T_男人)) {
        // :1064-1076 ペニス（扶她・男人のみ）
        s.add('小鸡鸡是……').hl(get_look_info(cid, '阴茎的状态'));
        s.add(await gobi_koujo(2));
      }
      s.add('」');
    } else {
      s.add(`[体型：${get_look_info(cid, '体型')}`);
      s.add(`][乳头：${get_look_info(cid, '乳头')}`);
      s.add(`][阴毛：${get_look_info(cid, '阴毛状态')}`);
      if (t(cid, T_扶她) || t(cid, T_男人)) {
        s.add(`][阴茎：${get_look_info(cid, '阴茎的状态')}`);
      }
      s.add(']');
    }
    era.print(s.take());
  }

  // :1081-1103 魅力点・癖
  if (t(cid, T_魅力点) && t(cid, T_癖)) {
    const s = new Spans();
    if (kojo) {
      s.add('「').hl(get_look_info(cid, '魅力点')).add('是我的魅力点');
      s.add(await gobi_koujo(0));
      s.hl(get_look_info(cid, '癖')).add('是我的习惯');
      s.add(await gobi_koujo(0));
      s.add('」');
    } else {
      s.add(`[魅力点：${get_look_info(cid, '魅力点')}`);
      s.add(`][癖好：${get_look_info(cid, '癖')}`);
      s.add(']');
    }
    era.print(s.take());
  }

  family_print_info(cid); // :1103-1107 CALL FAMILY_PRINT_INFO(TARGET)

  // :1310-1340 + :1342-1367 成为勇者之前（四路前缀 + 取值 + 语尾）
  await look_info_block(
    cid,
    kojo,
    cid >= 200 && cid !== 222 && !ex_t(cid, 2)
      ? ['来据点之前我是', '[来到据点之前：']
      : cid !== 0 && ex_t(cid, 2)
        ? ['我是', '[出生是因为：']
        : cid !== 0 && t(cid, T_男人) === 0
          ? ['做勇者之前我是', '[成为勇者之前：']
          : cid !== 0 && t(cid, T_男人)
            ? ['做冒险者之前我是', '[成为冒险者之前：']
            : ['成为魔王之前我是', '[成为魔王之前：'],
    get_look_info(cid, '成为勇者前的生活'),
    look_info_job_gobi(t(cid, T_成为勇者前的生活)),
  );

  // :1370-1400 + :1402-1430 成为勇者的契机
  await look_info_block(
    cid,
    kojo,
    cid >= 200 && cid !== 222 && !ex_t(cid, 2)
      ? ['回应召唤是因为', '[回应召唤的理由：']
      : cid !== 0 && ex_t(cid, 2)
        ? ['选择留下是因为', '[选择留下的理由：']
        : cid !== 0 && t(cid, T_男人) === 0
          ? ['成为勇者是因为', '[成为勇者的契机：']
          : cid !== 0 && t(cid, T_男人)
            ? ['成为冒险者是因为', '[成为冒险者的契机：']
            : ['成为魔王是因为', '[成为魔王的契机：'],
    get_look_info(cid, '成为勇者的契机'),
    look_info_reason_gobi(t(cid, T_成为勇者的契机)),
  );

  // :1435-1508 信仰（巫女・聖女・法術・咒术持ち、且非魔王）
  if (
    (t(cid, T_法术) === 1 ||
      t(cid, T_咒术) === 1 ||
      t(cid, T_成为勇者前的生活) === 11 ||
      t(cid, T_成为勇者前的生活) === 12) &&
    cid !== 0
  ) {
    const faith = cflag_of(cid, 152); // CFLAG:152 信仰値
    if (faith >= 10) {
      const s = new Spans();
      s.add(kojo ? '「信仰着' : '[信仰：');
      let god = '';
      if (t(cid, T_服从) === 1) {
        god = `魔王大人${heart(3)}`;
      } else if (cflag_of(cid, 0) !== 0) {
        god = `无名的淫荡女神${heart(3)}`;
      } else if (t(cid, T_精英) === 1) {
        god = '混沌的魔界女神'; // 魔物用の信仰
      } else if (t(cid, T_咒术) === 1) {
        god = '潜藏地底的死亡女神'; // 咒术
      } else if (t(cid, T_法术) === 1) {
        god = '纯洁的神圣女神'; // 法术
      } else if (t(cid, T_成为勇者前的生活) === 11) {
        god = '丰饶的大地女神'; // 巫女
      } else if (t(cid, T_成为勇者前的生活) === 12) {
        god = '包容一切的大海女神'; // 聖女
      }
      s.hl(god);
      if (kojo) {
        s.add(await gobi_koujo(1));
        s.add(`（信仰值：${faith}）」`);
      } else {
        s.add(`（信仰值：${faith}）]`);
      }
      era.print(s.take());

      // :1487-1507 堕落した場合、以前の信仰を冒涜する（プライド低い・冒涜者のみ）
      if (
        (t(cid, T_服从) === 1 || cflag_of(cid, 0) !== 0) &&
        (t(cid, T_低姿态) || t(cid, T_冒渎者))
      ) {
        const b = new Spans();
        b.add(kojo ? '「' : '[弃教：');
        let blasphemy = '';
        if (t(cid, T_咒术) === 1) {
          blasphemy = '潜藏地底的死亡女神是生性阴暗的变态母猪！'; // 呪術
        } else if (t(cid, T_法术) === 1) {
          blasphemy = '纯洁的神圣女神是骚浪贱婊子肉便器！'; // 法術
        } else if (t(cid, T_成为勇者前的生活) === 11) {
          blasphemy = '丰饶的大地女神是是用乳头自慰的母牛！'; // 巫女
        } else if (t(cid, T_成为勇者前的生活) === 12) {
          blasphemy = '包容一切的大海女神是把正太信者榨个干净的色情狂！'; // 聖女
        }
        b.hl(blasphemy);
        if (kojo) {
          b.add(await gobi_koujo(1));
          b.add('」');
        } else {
          b.add('是这样吧]');
        }
        era.print(b.take());
      }
    }
  }

  // :1511-1532 妊娠适性（同族不育）
  if (t(cid, T_妊娠适性)) {
    const s = new Spans();
    if (kojo) {
      s.add(`「${self_call(cid)}`).hl('不能正常的怀孕');
      s.add(await gobi_koujo(5));
      s.add('」');
    } else {
      s.add('[妊娠适性：').hl('只能异种族').add(']');
    }
    era.print(s.take());
  }

  // :1534-1562 所持金・借金
  {
    const money = cflag_of(cid, 580); // CFLAG:580 所持金
    const debt = cflag_of(cid, 582); // CFLAG:582 借金（负值）
    const s = new Spans();
    s.add(kojo ? '「身上的钱么……' : '[所持金：');
    if (money <= 0) {
      s.add('身无分文');
      if (kojo) s.add(await gobi_koujo(5));
    } else {
      s.add(String(money));
      if (kojo) s.add(await gobi_koujo(0));
    }
    if (debt < 0) {
      s.add(kojo ? '欠债……' : '][借金：');
      s.color(String(0 - debt), LIGHT_GREEN);
      if (kojo) s.add(await gobi_koujo(5));
    }
    s.add(kojo ? '」' : ']');
    era.print(s.take());
  }

  // :1564-1617 常识改变系
  if (t(cid, 281) > 0 || t(cid, 283) > 0) {
    const s = new Spans();
    s.add(kojo ? '「肉便器经过洗脑之后、' : '[常识改变：');
    let flag = 0; // LOCAL（源 :1572-1576 的「LOCALは連続に使う」）
    if (t(cid, 281) > 0) {
      s.add(kojo ? '战斗' : '【战斗】 ');
      s.hl(get_look_info(cid, '常识改变【战斗】'));
      flag = 1;
    }
    if (t(cid, 283) > 0) {
      if (kojo && flag > 0) {
        s.add('、');
      } else if (flag > 0) {
        s.add(' ');
      }
      s.add(kojo ? '日常' : '【日常】 ');
      s.hl(get_look_info(cid, '常识改变【日常】'));
      flag = 1;
    }
    if (kojo) {
      s.add(`方面完全被改变了，真是可怜的${self_call(cid)}`);
      s.add(await gobi_koujo(1));
      s.add('」');
    } else {
      s.add(']');
    }
    era.print(s.take());
  }

  await look_info_love(cid); // :1620-1622 CALL LOOK_INFO_LOVE

  return 1; // :1656-1660
}

/**
 * LOOK_INFO 两段「来历」块的共用形状（源 :1342-1367 与 :1402-1430）：
 * 前缀 + 取值 + 语尾口上 + 收尾符，落在同一条输出行上。
 * @param {number} cid 角色 ID
 * @param {boolean} kojo 是否口上视角
 * @param {[string, string]} prefix [口上视角前缀, 默认视角前缀]
 * @param {string} value 取到的文本（`GET_LOOK_INFO`）
 * @param {number} gobi 口上视角的 GOBI_KOUJO 档位
 * @returns {Promise<void>}
 */
async function look_info_block(cid, kojo, prefix, value, gobi) {
  const s = new Spans();
  if (kojo) {
    s.add(`「${prefix[0]}`);
    s.hl(value);
    s.add(await gobi_koujo(gobi));
    s.add('」');
  } else {
    s.add(prefix[1]);
    s.hl(value);
    s.add(']');
  }
  era.print(s.take());
}

/**
 * 前职业（TALENT:315）决定的口上档位（源 :1348-1365）。
 * @param {number} value TALENT:315
 * @returns {number} GOBI_KOUJO 档位
 */
function look_info_job_gobi(value) {
  if (value === 8 || value === 12 || value === 19) return 1; // 貴族・聖女・軍人は誇らしい
  if (value === 5 || value === 20) return 4; // 妓女・奴隷は恥ずかしい
  if (value === 6) return 2; // 盗人は逆切れ
  if (value === 7 || value === 9) return 5; // 物乞い・貧民は情けなくなる
  return 0;
}

/**
 * 成为勇者的契机（TALENT:316）决定的口上档位（源 :1407-1428）。
 * @param {number} value TALENT:316
 * @returns {number} GOBI_KOUJO 档位
 */
function look_info_reason_gobi(value) {
  if (value === 3 || value === 7 || value === 16 || value === 17) return 1; // 啓示・故郷・平和・正義
  if (value === 10 || value === 14) return 4; // 罪・仕方なく
  if (value === 8) return 2; // 復讐
  if (value === 2 || value === 13) return 5; // 金のため・命令
  return 0;
}

/**
 * @LOOK_INFO_LOVE 的评分半（源 :1714-2594）：① 素质/能力/经验/刻印逐项给
 * MAIN_LOVE 打分；② 相互作用修正先落在 LOVE_POOL、再统一加上。
 *
 * **拆成两半是有意的（#389）**：源的返回值是常量 1，分值表在函数外无法
 * 观测，而显示侧只暴露两个高度饱和的投影（「>3 才显示」与「心形数 = 分值/5-1
 * 封顶 6」）。散在 1000 行里的加減倍率若只能经这两个投影断言，改变 1-4 分
 * 的扰动全部不可见——把评分拆成一个纯函数、显示留给 look_info_love，是为了
 * 让每一条字面量都有直接的红线（本文件所有其它函数同理：可测性优先于
 * 逐字搬移函数边界）。返回值语义与源一致的地方：调用方不看返回值。
 *
 * @param {number} cid 角色 ID（源 TARGET）
 * @returns {number[]} MAIN_LOVE:0..99（源 :2594 之后的表）
 */
function love_score(cid) {
  const like = t(cid, T_喜欢的东西); // 源全篇多处读 TALENT:317
  const main = new Array(100).fill(0); // MAIN_LOVE（源 :1727-1732 的初始化循环）
  const pool = new Array(100).fill(0); // LOVE_POOL

  main[LOVE.喜欢的东西] = 15; // :1750 初期値（最初から好き）

  const race = t(cid, T_种族);
  const job = t(cid, T_成为勇者前的生活);
  const reason = t(cid, T_成为勇者的契机);
  const fall = cflag_of(cid, 0); // CFLAG:0 陥落度合い

  // :1755-1793 种族補正
  if (RACES_NOBLE.includes(race)) {
    main[LOVE.世界] += 1;
    main[LOVE.性交] -= 1;
    main[LOVE.卖淫] -= 1;
    main[LOVE.夫] += 1;
    main[LOVE.恋人] += 1;
    main[LOVE.獣姦] -= 1;
  } else if (RACES_EVIL.includes(race)) {
    main[LOVE.世界] -= 1;
    main[LOVE.性交] += 1;
    main[LOVE.卖淫] += 1;
    main[LOVE.夫] -= 1;
    main[LOVE.恋人] -= 1;
  } else if (race === 2) {
    main[LOVE.世界] -= 1;
    main[LOVE.夫] += 1;
    main[LOVE.恋人] += 1;
    main[LOVE.新夫] += 1;
    main[LOVE.野良犬] += 1;
    main[LOVE.獣姦] += 1;
  } else if (RACES_FALLEN.includes(race)) {
    main[LOVE.世界] -= 2;
    main[LOVE.性交] += 2;
    main[LOVE.卖淫] += 2;
    main[LOVE.夫] -= 2;
    main[LOVE.恋人] -= 1;
  }

  // :1797-1852 元の職業補正
  if (job === 2 || job === 12) {
    main[LOVE.世界] += 3;
    main[LOVE.自慰] -= 1;
    main[LOVE.性交] -= 1;
    main[LOVE.卖淫] -= 1;
    main[LOVE.奉仕] += 1;
  } else if (job === 5) {
    main[LOVE.性交] += 2;
    main[LOVE.卖淫] += 2;
  } else if (job === 6) {
    main[LOVE.世界] -= 2;
    main[LOVE.奉仕] -= 1;
  } else if (job === 7 || job === 9) {
    main[LOVE.世界] += 1;
  } else if (job === 8) {
    main[LOVE.性交] -= 1;
    main[LOVE.卖淫] -= 1;
    main[LOVE.コンプレックス] += 1;
  } else if (job === 11) {
    main[LOVE.性交] -= 2;
  } else if (job === 21) {
    main[LOVE.性交] += 1;
    main[LOVE.卖淫] -= 1;
    main[LOVE.夫] += 2;
  }

  // :1856-1869 理由補正
  if (reason === 2 || reason === 11) {
    main[LOVE.世界] -= 1;
    main[LOVE.卖淫] += 1;
  } else if (reason === 16 || reason === 17) {
    main[LOVE.世界] += 3;
    main[LOVE.奉仕] += 1;
  }

  // :1901-1933 喜欢的东西補正
  if (like === 4) {
    main[LOVE.恋人] += 3;
  } else if (like === 5) {
    main[LOVE.世界] -= 1;
    main[LOVE.卖淫] += 1;
  } else if (like === 8 && t(cid, T_人妻)) {
    main[LOVE.夫] += 3;
  } else if (like === 8 && t(cid, T_恋母情结)) {
    main[LOVE.母] += 3;
  } else if (like === 8 && t(cid, T_恋父情结)) {
    main[LOVE.父] += 3;
  } else if (like === 9 || like === 10) {
    main[LOVE.世界] += 1;
  } else if (like === 12) {
    main[LOVE.野良犬] += 1;
    main[LOVE.獣姦] += 1;
  }

  // :1937-1962 陥落度合い
  if (fall === 1) {
    main[LOVE.你] += 1;
    main[LOVE.世界] -= 1;
    main[LOVE.コンプレックス] += 1;
  } else if (fall === 2) {
    main[LOVE.你] += 2;
    main[LOVE.世界] -= 2;
    main[LOVE.コンプレックス] += 2;
  } else {
    main[LOVE.你] -= 1;
    main[LOVE.世界] += 1;
    main[LOVE.コンプレックス] -= 1;
  }

  // :1964-2233 素質による補正（各素質が独立に効く。源の重複条件二箇所は 1:1 保留）
  if (t(cid, T_淫乱_T)) {
    main[LOVE.你] -= 1;
    main[LOVE.世界] -= 5;
    main[LOVE.コンプレックス] += 5;
  }
  if (t(cid, T_服从)) {
    main[LOVE.你] += 10;
    main[LOVE.世界] -= 5;
  }
  if (t(cid, T_处女)) main[LOVE.V性感] -= 60;
  if (t(cid, T_童贞)) {
    main[LOVE.自ペニス] -= 1;
    main[LOVE.自慰] += 1;
  }
  if (t(cid, 9)) {
    // 崩坏
    main[LOVE.你] -= 3;
    main[LOVE.世界] -= 60;
    main[LOVE.自慰] += 3;
    main[LOVE.性交] += 3;
    main[LOVE.卖淫] += 3;
    main[LOVE.精液] += 3;
    main[LOVE.露出] += 3;
    main[LOVE.夫] += 3;
    main[LOVE.恋人] += 3;
    main[LOVE.新夫] += 3;
    main[LOVE.コンプレックス] += 3;
    main[LOVE.野良犬] += 1;
    main[LOVE.獣姦] += 1;
  }
  if (t(cid, T_好奇心)) main[LOVE.コンプレックス] += 1;
  if (t(cid, T_保守的)) {
    main[LOVE.卖淫] -= 1;
    main[LOVE.コンプレックス] -= 1;
  }
  if (t(cid, T_看重贞操)) {
    main[LOVE.性交] -= 1;
    main[LOVE.卖淫] -= 1;
    main[LOVE.コンプレックス] -= 1;
  }
  if (t(cid, T_看轻贞操)) {
    main[LOVE.性交] += 1;
    main[LOVE.卖淫] += 1;
    main[LOVE.コンプレックス] += 1;
  }
  if (t(cid, T_害羞)) main[LOVE.露出] += 1;
  if (t(cid, T_不知羞耻)) main[LOVE.露出] -= 1;
  if (t(cid, T_害怕疼痛)) main[LOVE.受虐] += 1;
  if (t(cid, T_喜欢精液)) main[LOVE.精液] += 10;
  if (t(cid, T_漏尿癖)) main[LOVE.露出] += 1;
  if (t(cid, T_容易自慰)) main[LOVE.自慰] += 1;
  if (t(cid, T_自慰狂)) {
    main[LOVE.C性感] += 3;
    main[LOVE.自慰] += 3;
  }
  if (t(cid, T_性爱狂)) {
    main[LOVE.V性感] += 3;
    main[LOVE.性交] += 3;
  }
  if (t(cid, T_尻穴狂)) {
    main[LOVE.A性感] += 3;
    main[LOVE.自慰] += 1;
    main[LOVE.性交] += 1;
  }
  if (t(cid, T_弄乳狂)) {
    main[LOVE.B性感] += 3;
    main[LOVE.自慰] += 3;
  }
  if (t(cid, T_倒错的)) {
    main[LOVE.同性愛] += 1;
    main[LOVE.受虐] += 1;
    main[LOVE.施虐] += 1;
    main[LOVE.露出] += 1;
    main[LOVE.コンプレックス] += 1;
    main[LOVE.野良犬] += 1;
    main[LOVE.獣姦] += 1;
  }
  // :2213-2217 双性恋——源与上一段同写 `IF TALENT:80`（原文如此，1:1 保留）
  if (t(cid, T_倒错的)) {
    main[LOVE.同性愛] += 1;
  }
  if (t(cid, T_施虐狂)) main[LOVE.施虐] += 10;
  if (t(cid, T_受虐狂)) main[LOVE.受虐] += 10;
  if (t(cid, T_露出狂)) main[LOVE.露出] += 10;
  if (t(cid, T_阴蒂钝感)) main[LOVE.C性感] -= 1;
  if (t(cid, T_阴蒂敏感)) main[LOVE.C性感] += 1;
  if (t(cid, T_私处钝感)) main[LOVE.V性感] -= 1;
  if (t(cid, T_私处敏感)) main[LOVE.V性感] += 1;
  if (t(cid, T_肛门钝感)) main[LOVE.A性感] -= 1;
  if (t(cid, T_肛门敏感)) main[LOVE.A性感] += 1;
  if (t(cid, T_乳房钝感)) main[LOVE.B性感] -= 1;
  if (t(cid, T_乳房敏感)) main[LOVE.B性感] += 1;
  if (t(cid, T_扶她) || t(cid, T_男人)) main[LOVE.自ペニス] += 1;
  if (t(cid, T_动物耳朵)) main[LOVE.獣姦] += 1;
  if (t(cid, T_母乳体质)) main[LOVE.B性感] += 1;
  if (t(cid, T_早泄) && (t(cid, T_扶她) || t(cid, T_男人))) {
    main[LOVE.自ペニス] -= 1;
  }
  // :2288-2292 牝犬——源同样写 `IF TALENT:124`（原文如此，1:1 保留）
  if (t(cid, T_动物耳朵)) {
    main[LOVE.野良犬] += 3;
    main[LOVE.獣姦] += 3;
  }
  if (t(cid, T_恋母情结)) main[LOVE.母] += 10;
  if (t(cid, T_恋父情结)) main[LOVE.父] += 10;
  if (t(cid, T_萝莉控)) main[LOVE.少女] += 10;
  if (t(cid, T_正太控)) main[LOVE.少年] += 10;
  if (t(cid, T_从不自慰)) main[LOVE.自慰] -= 60;
  if (t(cid, T_绝不侍奉)) main[LOVE.奉仕] -= 60;
  if (t(cid, T_人妻)) main[LOVE.夫] += 3;
  if (t(cid, T_妓女)) main[LOVE.卖淫] += 1;
  if (t(cid, T_倾城)) main[LOVE.卖淫] += 2;
  if (t(cid, T_肉便器)) {
    main[LOVE.世界] -= 1;
    main[LOVE.性交] += 1;
    main[LOVE.卖淫] += 1;
    main[LOVE.夫] -= 1;
    main[LOVE.恋人] -= 1;
  }
  if (t(cid, T_淫核)) main[LOVE.C性感] += 3;
  if (t(cid, T_淫壶)) main[LOVE.V性感] += 3;
  if (t(cid, T_淫肛)) main[LOVE.A性感] += 3;
  if (t(cid, T_淫乳)) main[LOVE.B性感] += 3;
  if (t(cid, T_私处封印)) main[LOVE.V性感] -= 3;
  if (t(cid, T_狂王俘虏)) {
    main[LOVE.你] -= 10;
    main[LOVE.狂王] += 30;
  }

  // :2437-2485 能力による補正（前半四行は無条件）
  main[LOVE.C性感] += abl_of(cid, 0);
  main[LOVE.B性感] += abl_of(cid, 1);
  main[LOVE.V性感] += abl_of(cid, 2);
  main[LOVE.A性感] += abl_of(cid, 3);
  if (t(cid, T_服从) && !t(cid, T_狂王俘虏)) {
    // 顺从（愛の場合）
    main[LOVE.你] += abl_of(cid, 10) * 3;
  }
  if (t(cid, T_淫乱_T)) {
    // 欲望（淫乱の場合）
    main[LOVE.コンプレックス] += abl_of(cid, 11) * 3;
  }
  if (abl_of(cid, 13)) main[LOVE.奉仕] += abl_of(cid, 13) + abl_of(cid, 12);
  if (abl_of(cid, 14)) main[LOVE.性交] += abl_of(cid, 14) + abl_of(cid, 12);
  main[LOVE.奉仕] += abl_of(cid, 16);
  main[LOVE.露出] += abl_of(cid, 17);
  main[LOVE.施虐] += abl_of(cid, 20);
  main[LOVE.受虐] += abl_of(cid, 21);
  main[LOVE.同性愛] += abl_of(cid, 22);
  main[LOVE.同性愛] += abl_of(cid, 23);
  main[LOVE.性交] += abl_of(cid, 30) * 3;
  main[LOVE.自慰] += abl_of(cid, 31) * 3;
  main[LOVE.精液] += abl_of(cid, 32) * 3;
  main[LOVE.同性愛] += abl_of(cid, 33) * 3;
  main[LOVE.卖淫] += abl_of(cid, 37) * 3;
  main[LOVE.獣姦] += abl_of(cid, 39) * 3;

  // :2490-2543 経験補正（7 组同构：>100 → +3 / >30 → +2 / >0 → +1）
  for (const [exp_idx, target] of [
    [E_精饮绝顶经验, LOVE.精液],
    [E_侍奉快乐经验, LOVE.奉仕],
    [E_爱情经验, LOVE.你],
    [E_被虐快乐经验, LOVE.受虐],
    [E_肛门快乐经验, LOVE.A性感],
    [E_施虐快乐经验, LOVE.施虐],
    [E_营业爱情经验, LOVE.卖淫],
  ]) {
    const v = exp_of(cid, exp_idx);
    if (v > 100) main[target] += 3;
    else if (v > 30) main[target] += 2;
    else if (v > 0) main[target] += 1;
  }

  // :2546-2548 新しい夫ボーナス / 恋人ボーナス
  main[LOVE.新夫] += Math.trunc(cflag_of(cid, 602) / 3);
  main[LOVE.恋人] += Math.trunc(cflag_of(cid, 607) / 3);

  // :2550-2558 刻印
  main[LOVE.コンプレックス] += mark_of(cid, M_快乐刻印) * 3;
  main[LOVE.你] -= mark_of(cid, M_反抗刻印) * 5;

  // :2570-2588 相互作用
  if (main[LOVE.母]) pool[LOVE.母] += main[LOVE.コンプレックス];
  if (main[LOVE.父]) pool[LOVE.父] += main[LOVE.コンプレックス];
  if (main[LOVE.少女]) pool[LOVE.少女] += main[LOVE.コンプレックス];
  if (main[LOVE.少年]) pool[LOVE.少年] += main[LOVE.コンプレックス];
  if (like === 12) {
    // 可愛い動物好きなボーナス（野良犬・獣姦が加算）
    pool[LOVE.喜欢的东西] += Math.trunc(main[LOVE.野良犬] / 3);
    pool[LOVE.喜欢的东西] += Math.trunc(main[LOVE.獣姦] / 3);
  }
  pool[LOVE.野良犬] += Math.trunc(main[LOVE.獣姦] / 2); // 獣姦好きは野良犬も好き
  pool[LOVE.夫] -= Math.trunc(main[LOVE.新夫] / 3); // 新しい夫の方がいいの…

  for (let i = 0; i < 100; i += 1) main[i] += pool[i]; // :2591-2594 修正値適用

  return main;
}

/**
 * @LOOK_INFO_LOVE（:1667-2810）：喜欢的东西的评分、排序与显示。
 *
 * 评分在 love_score（见其头注）；本函数接 :2602 起的 ③ 排序（降序取前 30、
 * 同值按添字序）与 ④ 显示（每项心形数 = 分值/5 - 1，封顶 6）。
 *
 * @param {number} cid 角色 ID（源 TARGET）
 * @returns {Promise<number>} 源 :2802-2804 `RETURN 1`
 */
async function look_info_love(cid) {
  const lover = cflag_of(cid, 606); // :1735 LOVER = CFLAG:606 的读取点移到显示侧
  const main = love_score(cid);
  const sort = new Array(100).fill(0); // LOVE_SORT

  // :2602-2641 ソート（降順に最大 30 件。同値は添字順）
  let top = -9999; // LOCAL
  for (let i = 0; i < 100; i += 1) {
    if (top < main[i]) top = main[i];
  }
  let count = 0; // LOVE_COUNT
  let guard = 0; // LOCAL:1 無限ループ避け
  let next_top = -9999; // LOCAL:2
  while (count < LOVE_SORT_MAX) {
    for (let id = 0; id < 100; id += 1) {
      if (top === main[id]) {
        sort[count] = id; // リストにIDを記憶
        count += 1; // 順位を進める
      } else if (main[id] < top && main[id] > next_top) {
        next_top = main[id];
      }
    }
    top = next_top;
    next_top = -9999;
    guard += 1;
    if (guard > 100) break; // :2636-2637 SIF LOCAL:1 > 100 BREAK
  }

  // :2650-2654 各種表示の前置き
  era.print(kojo_view() ? '「喜欢的东西是……' : '[喜欢的东西]'); // :2652/:2652-2656 PRINTL

  // :2673-2777 本体
  const s = new Spans();
  s.add('　');
  let shown = 0; // LOVE_NUM
  const lover_names = require('#/dungeon/dungeon-lovers').LOVER_NAMES;
  for (let rank = 0; rank < LOVE_SORT_MAX; rank += 1) {
    const id = sort[rank]; // LOVE_ID = LOVE_SORT:LOVE_COUNT
    if (main[id] <= LOVE_SHOW_MIN) continue; // :2711
    let text = null;
    if (id === 0) {
      const base = love_like_base(cid);
      if (!base.matched) continue; // :2713-2715 SIF RESULT == 0 CONTINUE
      text = base.printed;
    } else if (id === 1) {
      text = '魔王大人';
    } else if (id === 2) {
      text = '拯救万民';
    } else if (id === 3) {
      text = '肉棒';
    } else if (id === 4) {
      text = '勃起';
    } else if (id === 10) {
      text = t(cid, T_男人) ? '被玩弄阴茎' : '被弄阴蒂';
    } else if (id === 11) {
      if (t(cid, T_男人)) continue; // :2720 `ELSEIF LOVE_ID == 11 && !TALENT:男人`
      text = '被弄小穴';
    } else if (id === 12) {
      text = '被弄菊穴';
    } else if (id === 13) {
      text = '被弄乳房';
    } else if (id === 20) {
      text = '手淫';
    } else if (id === 21) {
      text = '做爱';
    } else if (id === 22) {
      text = '卖淫';
    } else if (id === 30) {
      text = '侍奉';
    } else if (id === 31) {
      text = '精液';
    } else if (id === 32) {
      text = t(cid, T_男人) ? '断背行为' : '百合行为';
    } else if (id === 33) {
      text = '被人虐待';
    } else if (id === 34) {
      text = '虐待别人';
    } else if (id === 35) {
      text = '露出身体';
    } else if (id === 40) {
      text = t(cid, T_男人) ? '伴侣' : '丈夫';
    } else if (id === 41) {
      text = t(cid, T_男人) ? '现在的伴侣' : '现在的丈夫';
    } else if (id === 42) {
      // :2738-2747 恋人（四支）
      if (lover === 0 && t(cid, T_男人)) {
        text = '将来的伴侣';
      } else if (lover === 0) {
        text = '将来的老公';
      } else if (lover === 200) {
        text = '恋人';
      } else {
        const name = lover_names.get(lover) ?? '';
        text = `恋人的${name === '' ? '' : name.padEnd(14, '　')}`;
      }
    } else if (id === 50) {
      continue; // :2748-2749 コンプレックスは強化ソースなので表示はしない
    } else if (id === 51) {
      text = main[LOVE.コンプレックス] > 6 ? '人妻' : '妈妈';
    } else if (id === 52) {
      text = main[LOVE.コンプレックス] > 6 ? '中年大叔' : '爸爸';
    } else if (id === 53) {
      text = main[LOVE.コンプレックス] > 6 ? '萝莉的小穴' : '小女孩';
    } else if (id === 54) {
      text = main[LOVE.コンプレックス] > 6 ? '正太的阴茎' : '美少年';
    } else if (id === 60) {
      text = main[LOVE.コンプレックス] > 6 ? '野狗大人' : '狗';
    } else if (id === 61) {
      text = main[LOVE.コンプレックス] > 6 ? '和野兽交配' : '可爱的东西';
    } else if (id === 62) {
      text = '狂王大人';
    } else {
      continue; // :2750 ELSE CONTINUE
    }
    s.add(text);
    // :2740-2746 5 個ごとに金红桃が一つずつ増える（上限 6 個）
    let hearts = Math.trunc(main[id] / 5) - 1;
    if (hearts > LOVE_HEART_MAX) hearts = LOVE_HEART_MAX;
    if (hearts > 0) s.add(heart(hearts));
    s.add('　'); // :2750 間の空白
    shown += 1; // :2753 好きな数を増やす
    if (shown % LOVE_PER_ROW === 0) {
      // :2755-2758 改行
      era.print(s.take());
      era.println();
      s.add('　');
    }
  }
  if (s.filled) era.print(s.take());

  // :2770-2777 收尾
  if (kojo_view()) {
    era.print(`${await gobi_koujo(1)}」 `); // :2772-2774（:2799 喜び语尾 + PRINTL 」 同行，#570）
  } else {
    era.print(' '); // :2776 PRINTL
  }
  era.print(`[共${shown}个喜欢的东西]`); // :2779 PRINTFORML

  return 1; // :2802-2804
}

module.exports = {
  STUBBED_CALLS,
  look_set,
  look_clear,
  look_info,
  look_info_love,
  love_score,
  love_like_base,
};
