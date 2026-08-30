/**
 * @file 调教指令 110「穿脱衣服」与 111「撕破衣服」：@COM110 / @COM111 的
 * 实现 + @COM_ABLE110 / @COM_ABLE111 的可执行性判定（issue #228 J18——
 * 服装系统 #215 在指令侧的消费者，本票主要是接线）。
 *
 * 源: target/ERB/調教相關/COMF110_服の着脱.ERB  @COM110（:8-323）
 *     target/ERB/調教相關/COMF110_服の着脱.ERB  @COM110_ABLE0T…ABLE5W
 *     （:329-540，12 个着脱判定）
 *     target/ERB/調教相關/COMF111_服を破る.ERB  @COM111（:7-168）
 *     target/ERB/調教相關/COMF111_服を破る.ERB  @COM111_ABLE0L…ABLE6L
 *     （:174-262，7 个引き裂き判定）
 *     target/ERB/調教相關/COMABLE.ERB  @COM_ABLE110（:3662-3678）/
 *     @COM_ABLE111（:3692-3716）
 *
 * == 本族的形态（源文件头自述：「実行してもパラメーターは変更せず通常
 *    コマンド扱いにならない」） ==
 *
 * 两条指令都是**自带 INPUT 循环的子菜单指令**，不写 SOURCE/delta、不调
 * TRAIN_MESSAGE——era wiki（Emuera/flow，flow1821＝本作引擎 1.821）TRAIN
 * 节明载：**@COMxx 返回 0 → 引擎不调 @SOURCE_CHECK/@EVENTCOMEND，直接回
 * @SHOW_STATUS**；返回非 0 才走结算。COM110/111 的全部出口 RETURN 0，故：
 * 无 SOURCE_CHECK 输出、PREVCOM 不推进（原作在 @SOURCE_CHECK:545 自做，
 * SOURCE_CHECK 不跑就不推——golden train-natural 的 210/250 两行实证：COM110
 * 执行前后「上次的调教指令」同为接吻）。「通常コマンド扱いにならない」
 * 指的就是这条。ere 侧的回合取消语义随本票落进 train-loop.js 的
 * execute_command_round。
 *
 * COM111 是高级 COM（#213 的 ADVANCED_COM_IDS 之一）但 @GET_ADV_COM 的
 * 21 个 CASE 无 110/111——全库唯一调用点是 COM110 子菜单 [9]（COMF110
 * 的 :314 CALL COM111）。COM_ABLE111 因此不会被引擎扫描消费（不在
 * Train.csv 可直选空间），注册进 com_able_family 只为编号空间的完整性。
 *
 * == 四样装齐的空缺说明（#209 裁定 6 的两条空项） ==
 *
 * - TRAIN_MESSAGE_A/B 分支：EVENT_TRAIN_MESSAGE_A/B.ERB 全文无
 *   SELECTCOM == 110/111 分支（grep 实证），COMF110/111 也不 CALL
 *   TRAIN_MESSAGE——本族无消息分支可装。
 * - 升格规则：@GET_ADV_COM 无 110/111 的 CASE（grep 实证）——本族无
 *   升格规则，adv_com_family 留空（缺失语义由调用点 whenMissing 声明，
 *   #7 决议）。
 * - 口上：SOURCE_CHECK → @KOJO_MESSAGE_COM 的既有分发（kojo-system.js）
 *   对 SELECTCOM 110/111 经 TRYCALL 落空静默——各性格文件的
 *   IF SELECTCOM == 110/111 台词段随轴 B（J21-J41）落地，本票不写台词。
 *
 * == 被调面（全部为 #215 已落真身，直接用） ==
 *
 *   @WEARING_CLOTH_ALL → ere/system/train/cloth.js（B = 标准装位探测：
 *   源 :14-17 先存 A、初始化后读 B、再还原 A——判定函数按 B 判断「标准
 *   装备是否含该部位」）；@PRINT_CLOTHTYPE / _MAIN2 / _SPECIAL →
 *   ere/page/page-clothtype.js（返回串出口，行由本模块合成一次 print）。
 *
 * == 写入通道的域归属（#215 完成报告「给 J18」节） ==
 *
 * 穿脱/撕破坏写 CFLAG:40（位域）/41/43/45/46/47（各部位洗濯状态）——
 * 属主 train，域内直写。**CFLAG:44（胸罩状态）属主 stronghold**
 * （ownership/cflag-ownership.yml "44"：3 处写中据点侧占 2）——COM111
 * 撕胸罩的 CFLAG:44 = -3 是登记在册的跨域写
 * （ownership/cflag-cross-domain-writes.yml），经 chara(cid).stronghold.
 * 胸罩状态 门面（#71）。CFLAG:42/49 只读（42 的写在 AFTERTRAIN_CLOTH、
 * 49 的写据点/日程侧）。
 *
 * == 原作空格与排版的三条裁定（对拍逐字比对的依据） ==
 *
 * - Emuera 的 PRINT 系取「命令 + 一个分隔空格」之后的**字面文本**：
 *   源 `PRINTL  [7] - 全部扒光`（两空格）在 golden train-natural:217
 *   渲染为 ` [7] - 全部扒光`（一空格）——脱衣行一空格、穿衣行
 *   （源四空格）三空格。
 * - COM111 的 [100] 行源是 `PRINTL  [100]- 算了`——] 与 - 间无空格，
 *   1:1 保留。
 * - 内裤脱衣（:278-287）的弄脏前缀查 TFLAG:45 的位 8/4（下装/下装处理）
 *   而非位 2/1（内裤）——与穿衣分支（位 2/1）不对称，是原作的抄写怪癖，
 *   1:1 保留不改。
 *
 * 这张票无存根/登记（docs/stub-registry.md）：被调全为真身，口上经既有
 * 分发的合法缺失。
 */

'use strict';

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { com_able_family, com_family } = require('#/system/train/com-family');
const { wearing_cloth_all } = require('#/system/train/cloth');
const {
  clothtype_main2_text,
  clothtype_special_text,
  clothtype_text,
} = require('#/page/page-clothtype');
const { chara } = require('#/facade/chara');
const { chara_callname } = require('#/utils/callname-utils');

// CFLAG:40 着衣位域（FUNC_CLOTH.ERB:14）：1 内裤 2 胸罩 4 上装 8 裙
// 16 裤 64 特别服装
const BIT_PANTY = 1;
const BIT_BRA = 2;
const BIT_UPPER = 4;
const BIT_SKIRT = 8;
const BIT_TROUSERS = 16;
const BIT_SPECIAL = 64;

// —— 读数兜底（未声明下标 undefined → 0，#13） ——

const worn = (cid) => era.get(`cflag:${cid}:40`) || 0;
const set_worn = (cid, v) => era.set(`cflag:${cid}:40`, v);
const main_type = (cid) => era.get(`cflag:${cid}:41`) || 0;
const special_type = (cid) => era.get(`cflag:${cid}:42`) || 0;
const laundry = (cid, idx) => era.get(`cflag:${cid}:${idx}`) || 0;
const set_laundry = (cid, idx, v) => era.set(`cflag:${cid}:${idx}`, v);
const tequip = (cid, idx) => era.get(`tequip:${cid}:${idx}`) || 0;

/** 裙型判定（源多处复用的 CFLAG:41 ∈ [1,100]） */
const is_skirt = (cid) => {
  const type = main_type(cid);
  return type >= 1 && type <= 100;
};

/**
 * 源 :14-17 / :13-16 的 A・B 探测：存回当前着衣位、以 WEARING_CLOTH_ALL
 * 求标准装位（B）、再还原当前态（A）。判定函数的 B 参数由此传入。
 * @param {number} cid 角色 ID
 * @returns {number} 标准装位（B）
 */
function standard_bits(cid) {
  const keep = worn(cid);
  wearing_cloth_all(cid);
  const bits = worn(cid);
  set_worn(cid, keep);
  return bits;
}

// ============================================================
// @COM110 的 12 个着脱判定（COMF110:328-611）
// ============================================================

/**
 * @COM110_ABLE0T（:329-349）：特別コス脱衣。尿布（42==69）支内的第二条
 * SIF（(40&64) && 42<=50）在 42==69 的分支里恒假——原作死条件，1:1 保留。
 */
function com110_able0t(cid) {
  if (special_type(cid) === 0) {
    return 0;
  }
  if ((worn(cid) & BIT_SPECIAL) === 0) {
    return 0;
  }
  if (special_type(cid) === 69) {
    if (worn(cid) & BIT_TROUSERS) {
      return 0;
    }
    if (worn(cid) & BIT_SPECIAL && special_type(cid) <= 50) {
      return 0; // :342-343 尿布支内恒假（42==69 与 <=50 互斥），1:1
    }
    if (main_type(cid) === 202 && worn(cid) & BIT_SKIRT) {
      return 0;
    }
  }
  return 1;
}

/** @COM110_ABLE0W（:351-377）：特別コス装着（B 含特别位、洗涤中不可） */
function com110_able0w(cid, b) {
  if (special_type(cid) === 0) {
    return 0;
  }
  if (worn(cid) & BIT_SPECIAL) {
    return 0;
  }
  if ((b & BIT_SPECIAL) === 0) {
    return 0;
  }
  if (laundry(cid, 47) !== 0) {
    return 0;
  }
  if (special_type(cid) === 69) {
    if (worn(cid) & BIT_TROUSERS) {
      return 0;
    }
    if (worn(cid) & BIT_SPECIAL && special_type(cid) <= 50) {
      return 0; // 同 able0t：尿布支内恒假，1:1
    }
    if (main_type(cid) === 202 && worn(cid) & BIT_SKIRT) {
      return 0;
    }
  }
  return 1;
}

/** @COM110_ABLE1T（:379-390）：ワンピース脱衣（41 ≥ 201 的全身衣装） */
function com110_able1t(cid) {
  if (main_type(cid) <= 200) {
    return 0;
  }
  if ((worn(cid) & (BIT_UPPER | BIT_SKIRT | BIT_TROUSERS)) === 0) {
    return 0;
  }
  if (worn(cid) & BIT_SPECIAL && special_type(cid) <= 50) {
    return 0;
  }
  return 1;
}

/** @COM110_ABLE1W（:392-411）：ワンピース装着（上下两半都不可用时才行） */
function com110_able1w(cid, b) {
  if (main_type(cid) <= 200) {
    return 0;
  }
  // :400-403 「上装穿着中或洗涤中」且「下装穿着中或洗涤中」→ 不可
  //（原作注释：为「衣装破れた」情形留的口——上下任一半还在（含洗着）
  // 就不算失去整件，不能重新穿上）
  if (worn(cid) & BIT_UPPER || laundry(cid, 45) !== 0) {
    if (worn(cid) & (BIT_SKIRT | BIT_TROUSERS) || laundry(cid, 46) !== 0) {
      return 0;
    }
  }
  if (
    (b & BIT_UPPER) === 0 ||
    ((b & BIT_SKIRT) === 0 && (b & BIT_TROUSERS) === 0)
  ) {
    return 0;
  }
  if (worn(cid) & BIT_SPECIAL && special_type(cid) <= 50) {
    return 0;
  }
  return 1;
}

/** @COM110_ABLE2T（:413-424）：ツーピース上脱衣（41 ≤ 200 的两截衣装） */
function com110_able2t(cid) {
  if (main_type(cid) >= 201) {
    return 0;
  }
  if ((worn(cid) & BIT_UPPER) === 0) {
    return 0;
  }
  if (worn(cid) & BIT_SPECIAL && special_type(cid) <= 50) {
    return 0;
  }
  return 1;
}

/** @COM110_ABLE2W（:426-443）：ツーピース上装着 */
function com110_able2w(cid, b) {
  if (main_type(cid) >= 201) {
    return 0;
  }
  if (worn(cid) & BIT_UPPER) {
    return 0;
  }
  if ((b & BIT_UPPER) === 0) {
    return 0;
  }
  if (laundry(cid, 45) !== 0) {
    return 0;
  }
  if (worn(cid) & BIT_SPECIAL && special_type(cid) <= 50) {
    return 0;
  }
  return 1;
}

/** @COM110_ABLE3T（:445-456）：ツーピース下脱衣 */
function com110_able3t(cid) {
  if (main_type(cid) >= 201) {
    return 0;
  }
  if ((worn(cid) & (BIT_SKIRT | BIT_TROUSERS)) === 0) {
    return 0;
  }
  if (worn(cid) & BIT_SPECIAL && special_type(cid) === 11) {
    return 0; // 史莱姆着ぐるみ覆盖全身
  }
  return 1;
}

/** @COM110_ABLE3W（:458-475）：ツーピース下装着 */
function com110_able3w(cid, b) {
  if (main_type(cid) >= 201) {
    return 0;
  }
  if (worn(cid) & (BIT_SKIRT | BIT_TROUSERS)) {
    return 0;
  }
  if ((b & (BIT_SKIRT | BIT_TROUSERS)) === 0) {
    return 0;
  }
  if (laundry(cid, 46) !== 0) {
    return 0;
  }
  if (worn(cid) & BIT_SPECIAL && special_type(cid) === 11) {
    return 0;
  }
  return 1;
}

/** @COM110_ABLE4T（:477-488）：ブラジャー脱衣（上装在身时不可） */
function com110_able4t(cid) {
  if ((worn(cid) & BIT_BRA) === 0) {
    return 0;
  }
  if (worn(cid) & BIT_UPPER) {
    return 0;
  }
  if (worn(cid) & BIT_SPECIAL && special_type(cid) <= 50) {
    return 0;
  }
  return 1;
}

/** @COM110_ABLE4W（:490-504）：ブラジャー装着（上半身全裸才可） */
function com110_able4w(cid, b) {
  if (worn(cid) & (BIT_BRA | BIT_UPPER)) {
    return 0;
  }
  if ((b & BIT_BRA) === 0) {
    return 0;
  }
  if (laundry(cid, 44) !== 0) {
    return 0;
  }
  if (worn(cid) & BIT_SPECIAL && special_type(cid) <= 50) {
    return 0;
  }
  return 1;
}

/** @COM110_ABLE5T（:506-520）：パンツ脱衣（裤型下装在身时不可） */
function com110_able5t(cid) {
  if ((worn(cid) & BIT_PANTY) === 0) {
    return 0;
  }
  if (worn(cid) & BIT_TROUSERS) {
    return 0;
  }
  if (worn(cid) & BIT_SPECIAL && special_type(cid) === 11) {
    return 0;
  }
  if (main_type(cid) === 202 && worn(cid) & BIT_SKIRT) {
    return 0; // 和服下为裙时脱内裤不可
  }
  return 1;
}

/** @COM110_ABLE5W（:522-540）：パンツ装着 */
function com110_able5w(cid, b) {
  if (worn(cid) & BIT_PANTY) {
    return 0;
  }
  if (worn(cid) & BIT_TROUSERS) {
    return 0;
  }
  if ((b & BIT_PANTY) === 0) {
    return 0;
  }
  if (laundry(cid, 43) !== 0) {
    return 0;
  }
  if (worn(cid) & BIT_SPECIAL && special_type(cid) === 11) {
    return 0;
  }
  if (main_type(cid) === 202 && worn(cid) & BIT_SKIRT) {
    return 0;
  }
  return 1;
}

// ============================================================
// @COM111 的 7 个引き裂き判定（COMF111:158-321）
// ============================================================

/** @COM111_ABLE0L（:174-182）：特別コス引き裂き */
function com111_able0l(cid) {
  if (special_type(cid) === 0) {
    return 0;
  }
  if ((worn(cid) & BIT_SPECIAL) === 0) {
    return 0;
  }
  return 1;
}

/** @COM111_ABLE1L（:184-195）：ワンピース上引き裂き（41 ≥ 201） */
function com111_able1l(cid) {
  if (main_type(cid) <= 200) {
    return 0;
  }
  if ((worn(cid) & BIT_UPPER) === 0) {
    return 0;
  }
  if (worn(cid) & BIT_SPECIAL && special_type(cid) <= 50) {
    return 0;
  }
  return 1;
}

/** @COM111_ABLE2L（:197-208）：ワンピース下引き裂き */
function com111_able2l(cid) {
  if (main_type(cid) <= 200) {
    return 0;
  }
  if ((worn(cid) & (BIT_SKIRT | BIT_TROUSERS)) === 0) {
    return 0;
  }
  if (worn(cid) & BIT_SPECIAL && special_type(cid) === 11) {
    return 0;
  }
  return 1;
}

/** @COM111_ABLE3L（:210-221）：ツーピース上引き裂き（41 ≤ 200） */
function com111_able3l(cid) {
  if (main_type(cid) >= 201) {
    return 0;
  }
  if ((worn(cid) & BIT_UPPER) === 0) {
    return 0;
  }
  if (worn(cid) & BIT_SPECIAL && special_type(cid) <= 50) {
    return 0;
  }
  return 1;
}

/** @COM111_ABLE4L（:223-234）：ツーピース下引き裂き */
function com111_able4l(cid) {
  if (main_type(cid) >= 201) {
    return 0;
  }
  if ((worn(cid) & (BIT_SKIRT | BIT_TROUSERS)) === 0) {
    return 0;
  }
  if (worn(cid) & BIT_SPECIAL && special_type(cid) === 11) {
    return 0;
  }
  return 1;
}

/** @COM111_ABLE5L（:236-247）：ブラジャー引き裂き */
function com111_able5l(cid) {
  if ((worn(cid) & BIT_BRA) === 0) {
    return 0;
  }
  if (worn(cid) & BIT_UPPER) {
    return 0;
  }
  if (worn(cid) & BIT_SPECIAL && special_type(cid) <= 50) {
    return 0;
  }
  return 1;
}

/** @COM111_ABLE6L（:249-262）：パンツ引き裂き（和服下为裙时不可） */
function com111_able6l(cid) {
  if ((worn(cid) & BIT_PANTY) === 0) {
    return 0;
  }
  if (worn(cid) & BIT_TROUSERS) {
    return 0;
  }
  if (worn(cid) & BIT_SPECIAL && special_type(cid) === 11) {
    return 0;
  }
  if (main_type(cid) === 202 && worn(cid) & BIT_SKIRT) {
    return 0;
  }
  return 1;
}

// ============================================================
// @COM110 / @COM111 主体
// ============================================================

/**
 * 弄脏前缀（脱衣行的内联形容词；TFLAG:45 位 → 串）。pos 为「污物处理」位、
 * neg 为「尿」位（各部位两 bit 相邻：32/16 特别服装、8/4 下装——内裤脱衣
 * 也查下装位是原作怪癖，见文件头）。
 */
function soiled_adjective(mask, poop_bit, pee_bit) {
  if (mask & poop_bit) {
    return '沾满污物的';
  }
  if (mask & pee_bit) {
    return '尿湿透的';
  }
  return '';
}

/**
 * 穿衣侧的弄脏拒绝句（整行 PRINTFORML，各部位同文）。
 */
function soiled_unusable(mask, poop_bit, pee_bit) {
  if (mask & poop_bit) {
    return '沾满了污物，不是可以使用的状态';
  }
  if (mask & pee_bit) {
    return '被尿淋透了，不是可以使用的状态';
  }
  return null;
}

/**
 * @COM110（COMF110:7-134）：穿脱衣服子菜单。1:1 的 INPUT 循环。
 * @returns {Promise<number>} 原作 RETURN 0（全部出口；引擎语义见文件头）
 */
async function com110() {
  const target = era_flag.target;
  const name = chara_callname(target);

  for (;;) {
    era.print('穿脱衣服'); // :12

    const b = standard_bits(target); // :14-17 A・B 探测

    // :22-24 着脱の確認（现在%名%的外貌是，…。）
    era.print(`现在${name}的外貌是，${clothtype_text(target)}。`);

    // :27-50 判定変数 T/W
    const t = [
      com110_able0t(target),
      com110_able1t(target),
      com110_able2t(target),
      com110_able3t(target),
      com110_able4t(target),
      com110_able5t(target),
    ];
    const w = [
      com110_able0w(target, b),
      com110_able1w(target, b),
      com110_able2w(target, b),
      com110_able3w(target, b),
      com110_able4w(target, b),
      com110_able5w(target, b),
    ];

    // —— :52-135 子菜单（脱衣行一空格 / 穿衣行三空格，见文件头）——
    if (t[0]) {
      era.print(
        ` [0] - ${clothtype_special_text(target)}${
          special_type(target) >= 51 ? '取下' : '脱掉'
        }`,
      );
    }
    if (w[0]) {
      era.print(
        `   [0] - ${clothtype_special_text(target)}${
          special_type(target) >= 51 ? '装上' : '穿起'
        }`,
      );
    }
    if (t[1]) {
      era.print(` [1] - ${clothtype_main2_text(target)}脱掉`);
    }
    if (w[1]) {
      era.print(`   [1] - ${clothtype_main2_text(target)}穿起`);
    }
    if (t[2]) {
      era.print(` [1] - ${clothtype_main2_text(target)}上半身脱掉`);
    }
    if (w[2]) {
      era.print(`   [1] - ${clothtype_main2_text(target)}上半身穿起`);
    }
    if (t[3]) {
      era.print(
        ` [2] - ${clothtype_main2_text(target)}${
          is_skirt(target) ? '的裙子脱掉' : '下半身脱掉'
        }`,
      );
    }
    if (w[3]) {
      era.print(
        `   [2] - ${clothtype_main2_text(target)}${
          is_skirt(target) ? '的裙子穿起' : '下半身穿起'
        }`,
      );
    }
    if (t[4]) {
      era.print(' [3] - 解开胸罩');
    }
    if (w[4]) {
      era.print('   [3] - 穿上胸罩');
    }
    if (t[5]) {
      era.print(' [4] - 脱掉内裤');
    }
    if (w[5]) {
      era.print('   [4] - 穿上内裤');
    }
    if (worn(target) !== 0) {
      era.print(' [7] - 全部扒光');
    }
    if (worn(target) !== 0) {
      era.print(' [9] - 移动到[撕破衣服]');
    }
    era.print(' [100] - 算了');

    const result = await era.input(); // :136（COMF110）

    // —— :142-319 着脱処理 ——
    if (result === 0 && laundry(target, 49)) {
      // :141-144 外せない特別コス（贞操带钥匙已丢）
      era.print(`${name}贞操带的钥匙丢掉了。`);
      await era.waitAnyKey();
    } else if (result === 0 && t[0]) {
      // :146-160 特別コス脱衣
      const mask = era.get('tflag:45') || 0;
      era.print(
        `${name}把${soiled_adjective(mask, 32, 16)}${clothtype_special_text(target)}${
          special_type(target) >= 51 ? '取下了。' : '脱掉了。'
        }`,
      );
      set_worn(target, worn(target) - BIT_SPECIAL);
    } else if (result === 0 && w[0]) {
      // :161-178 特別コス装着（污物/尿浸时不可用）
      const mask = era.get('tflag:45') || 0;
      const unusable = soiled_unusable(mask, 32, 16);
      if (unusable) {
        era.print(unusable);
      } else {
        era.print(
          `${name}将${clothtype_special_text(target)}${
            special_type(target) >= 51 ? '装上了。' : '穿上了。'
          }`,
        );
        set_worn(target, worn(target) | BIT_SPECIAL);
      }
    } else if (result === 1 && t[1]) {
      // :179-194 ワンピース脱衣（上下一起脱）
      const mask = era.get('tflag:45') || 0;
      era.print(
        `${name}将${soiled_adjective(mask, 8, 4)}${clothtype_main2_text(target)}脱掉了。`,
      );
      let bits = worn(target);
      if (bits & BIT_UPPER) {
        bits -= BIT_UPPER;
      }
      if (bits & BIT_SKIRT) {
        bits -= BIT_SKIRT;
      }
      if (bits & BIT_TROUSERS) {
        bits -= BIT_TROUSERS;
      }
      set_worn(target, bits);
    } else if (result === 1 && w[1]) {
      // :195-216 ワンピース装着（上下两半都不可用才成）
      const mask = era.get('tflag:45') || 0;
      const unusable = soiled_unusable(mask, 8, 4);
      if (unusable) {
        era.print(unusable);
      } else {
        era.print(`${name}将${clothtype_main2_text(target)}穿上了。`);
        let bits = worn(target);
        if (laundry(target, 45) === 0) {
          bits |= BIT_UPPER;
        }
        if (laundry(target, 46) === 0) {
          // :210-215 201-250 裙型 → 位 8 / 251-300 裤型 → 位 16
          bits |= main_type(target) <= 250 ? BIT_SKIRT : BIT_TROUSERS;
        }
        set_worn(target, bits);
      }
    } else if (result === 1 && t[2]) {
      // :217-222 ツーピース上脱衣
      era.print(`${name}将${clothtype_main2_text(target)}的上半身脱掉了。`);
      set_worn(target, worn(target) - BIT_UPPER);
    } else if (result === 1 && w[2]) {
      // :223-228 ツーピース上装着
      era.print(`${name}把${clothtype_main2_text(target)}的上半身穿上了。`);
      set_worn(target, worn(target) | BIT_UPPER);
    } else if (result === 2 && t[3]) {
      // :229-247 ツーピース下脱衣
      const mask = era.get('tflag:45') || 0;
      era.print(
        `${name}将${soiled_adjective(mask, 8, 4)}${clothtype_main2_text(target)}${
          is_skirt(target) ? '的裙子脱掉了。' : '的下半身脱掉了。'
        }`,
      );
      let bits = worn(target);
      if (bits & BIT_SKIRT) {
        bits -= BIT_SKIRT;
      }
      if (bits & BIT_TROUSERS) {
        bits -= BIT_TROUSERS;
      }
      set_worn(target, bits);
    } else if (result === 2 && w[3]) {
      // :248-273 ツーピース下装着
      const mask = era.get('tflag:45') || 0;
      const unusable = soiled_unusable(mask, 8, 4);
      if (unusable) {
        era.print(unusable);
      } else {
        era.print(
          `${name}把${clothtype_main2_text(target)}${
            is_skirt(target) ? '的裙子穿上了。' : '的下半身穿上了。'
          }`,
        );
        // :263-267 1-100 裙型 → 位 8 / 101-200 裤型 → 位 16
        set_worn(
          target,
          worn(target) | (main_type(target) <= 100 ? BIT_SKIRT : BIT_TROUSERS),
        );
      }
    } else if (result === 3 && t[4]) {
      // :270-273 ブラジャー脱衣
      era.print(`${name}的胸罩解开了。`);
      set_worn(target, worn(target) - BIT_BRA);
    } else if (result === 3 && w[4]) {
      // :274-277 ブラジャー装着
      era.print(`${name}穿上了胸罩。`);
      set_worn(target, worn(target) | BIT_BRA);
    } else if (result === 4 && t[5]) {
      // :278-287 パンツ脱衣（弄脏位查下装 8/4 是原作怪癖，见文件头）
      const mask = era.get('tflag:45') || 0;
      era.print(`${name}把${soiled_adjective(mask, 8, 4)}内裤脱掉了。`);
      set_worn(target, worn(target) - BIT_PANTY);
    } else if (result === 4 && w[5]) {
      // :288-299 パンツ装着
      const mask = era.get('tflag:45') || 0;
      const unusable = soiled_unusable(mask, 2, 1);
      if (unusable) {
        era.print(unusable);
      } else {
        era.print(`${name}穿上了内裤。`);
        set_worn(target, worn(target) | BIT_PANTY);
      }
    } else if (result === 7 && worn(target) !== 0) {
      // :300-311 全裸にして終了（贞操带直接选才脱得掉）
      if (special_type(target) === 79 && worn(target) & BIT_SPECIAL) {
        era.print(`${name}除了贞操带以外一丝不挂。`);
        await era.waitAnyKey();
        set_worn(target, BIT_SPECIAL);
      } else {
        era.print(`${name}全裸了。`);
        set_worn(target, 0);
        await era.waitAnyKey();
        return 0;
      }
    } else if (result === 9 && worn(target) !== 0) {
      // :312-316 移动到撕破衣服
      era.print('');
      const ripped = await com111();
      if (ripped === 1) {
        return 0;
      }
    } else if (result === 100) {
      // :317-318 算了
      return 0;
    }

    era.print(''); // :321
    // GOTO INPUT_LOOP（:323）
  }
}

/**
 * @COM111（COMF111:7-154）：撕破衣服子菜单。COM110 的 [9] 移动过来；
 * RETURN 1 = 算了（COM110 据此退出）、0 = 返回穿脱/已处理。
 * @returns {Promise<number>} 原作 RETURN 0 / 1
 */
async function com111() {
  const target = era_flag.target;
  const name = chara_callname(target);

  for (;;) {
    era.print('撕破衣服'); // :11（COMF111）

    standard_bits(target); // :13-16 A・B 探测（L 判定不用 B，还原即止）

    // :20-23 破り取る部位の確認
    era.print(`现在${name}的外貌是，${clothtype_text(target)}。`);

    // :25-39 引き裂き判定変数 L
    const l = [
      com111_able0l(target),
      com111_able1l(target),
      com111_able2l(target),
      com111_able3l(target),
      com111_able4l(target),
      com111_able5l(target),
      com111_able6l(target),
    ];

    // —— :41-84 子菜单 ——
    if (l[0]) {
      era.print(` [10] - ${clothtype_special_text(target)}剥掉`);
    }
    if (l[1]) {
      era.print(` [11] - ${clothtype_main2_text(target)}的上半身撕掉`);
    }
    if (l[2]) {
      era.print(` [12] - ${clothtype_main2_text(target)}的下半身撕掉`);
    }
    if (l[3]) {
      era.print(` [11] - ${clothtype_main2_text(target)}的上半撕破`);
    }
    if (l[4]) {
      era.print(
        ` [12] - ${clothtype_main2_text(target)}${
          is_skirt(target) ? '的裙子撕破' : '的下半撕破'
        }`,
      );
    }
    if (l[5]) {
      era.print(' [13] - 撕碎胸罩');
    }
    if (l[6]) {
      era.print(' [14] - 撕碎内裤');
    }
    era.print(' [19] - 返回[穿脱衣服]');
    era.print(' [100]- 算了');

    const result = await era.input(); // :85

    // —— :91-157 引き裂き処理 ——
    // :91-96 剥ぎ取れない特別コス（史莱姆/贞操带：被徒手撕破但撕不下来）
    if (
      result === 10 &&
      worn(target) & BIT_SPECIAL &&
      (special_type(target) === 11 || special_type(target) === 79)
    ) {
      era.print(`${clothtype_special_text(target)}被徒手撕破了。`);
      await era.waitAnyKey();
      return 0;
    }
    if (result === 10 && l[0]) {
      // :97-103 特別コス引き裂き
      era.print(`${name}的${clothtype_special_text(target)}被强行剥掉了。`);
      set_worn(target, worn(target) - BIT_SPECIAL);
      set_laundry(target, 47, -3); // :102 CFLAG:47 = -3（破り取られている）
    } else if (result === 11 && l[1]) {
      // :104-110 ワンピース上半身引き裂き
      era.print(
        `${name}穿着的${clothtype_main2_text(target)}的上半身被撕坏了。`,
      );
      set_worn(target, worn(target) - BIT_UPPER);
      set_laundry(target, 45, -3); // :109
    } else if (result === 12 && l[2]) {
      // :111-120 ワンピース下半身引き裂き（位 4 一起消）
      era.print(
        `${name}穿着的${clothtype_main2_text(target)}的下半身被撕坏了。`,
      );
      let bits = worn(target);
      if (bits & BIT_SKIRT) {
        bits -= BIT_SKIRT;
      }
      if (bits & BIT_TROUSERS) {
        bits -= BIT_TROUSERS;
      }
      set_worn(target, bits);
      set_laundry(target, 46, -3); // :119
    } else if (result === 11 && l[3]) {
      // :121-127 ツーピース上引き裂き
      era.print(
        `${name}穿着的${clothtype_main2_text(target)}的上半身被撕破了。`,
      );
      set_worn(target, worn(target) - BIT_UPPER);
      set_laundry(target, 45, -3); // :126
    } else if (result === 12 && l[4]) {
      // :128-141 ツーピース下引き裂き
      era.print(
        `${name}穿着的${clothtype_main2_text(target)}${
          is_skirt(target) ? '的裙子被撕破了。' : '的下半身被撕破了。'
        }`,
      );
      let bits = worn(target);
      if (bits & BIT_SKIRT) {
        bits -= BIT_SKIRT;
      }
      if (bits & BIT_TROUSERS) {
        bits -= BIT_TROUSERS;
      }
      set_worn(target, bits);
      set_laundry(target, 46, -3); // :140
    } else if (result === 13 && l[5]) {
      // :142-146 ブラジャー引き裂き（CFLAG:44 属主 stronghold，走门面 #71）
      era.print(`${name}的胸罩被撕碎了。`);
      set_worn(target, worn(target) - BIT_BRA);
      chara(target).stronghold.胸罩状态 = -3; // :145 CFLAG:44 = -3
    } else if (result === 14 && l[6]) {
      // :147-151 パンツ引き裂き
      era.print(`${name}的内裤被撕碎了。`);
      set_worn(target, worn(target) - BIT_PANTY);
      set_laundry(target, 43, -3); // :150
    } else if (result === 19) {
      // :151-152 返回[穿脱衣服]
      return 0;
    } else if (result === 100) {
      // :153-155 算了
      return 1;
    } else {
      // :156-157 ELSE → GOTO INPUT_LOOP（无空行直回菜单头）
      continue;
    }

    // :159-165 撕完全裸 → 收尾退出
    if (worn(target) === 0) {
      era.print('（已经全裸，撕无可撕）');
      era.print('');
      await era.waitAnyKey();
      return 0;
    }

    era.print(''); // :166
    // GOTO INPUT_LOOP（:168）
  }
}

// ============================================================
// @COM_ABLE110 / @COM_ABLE111（COMABLE.ERB:3662-3716）
// ============================================================

/** @COM_ABLE110（:3662-3678）：着衣設定未开/无衣可穿/特殊调教装备中不可 */
async function com_able110() {
  const target = era_flag.target;
  // :3664-3665 自动不可（CALLTRAIN 的自动回合标记）
  if ((era.get('tflag:224') || 0) === 555) {
    return 0;
  }
  // :3666-3667 着衣設定を使ってない
  if ((era.get('flag:37') || 0) === 0) {
    return 0;
  }
  // :3670-3671 着衣フラグが存在しない（既定服装与特别服装均未设定）
  if (main_type(target) === 0 && special_type(target) === 0) {
    return 0;
  }
  // :3672-3681 触手/决斗/绳子/浴室/新妻各装备位
  if (tequip(target, 90)) {
    return 0;
  }
  if (tequip(target, 55)) {
    return 0;
  }
  if (tequip(target, 44)) {
    return 0;
  }
  if (tequip(target, 58)) {
    return 0;
  }
  if (tequip(target, 59)) {
    return 0;
  }
  return 1;
}

/** @COM_ABLE111（:3692-3716）：同 110，另加全裸不可 */
async function com_able111() {
  const base = await com_able110();
  if (base === 0) {
    return 0;
  }
  // :3718-3719 全裸だとダメ
  if (worn(era_flag.target) === 0) {
    return 0;
  }
  return 1;
}

com_family.register(110, com110);
com_family.register(111, com111);
com_able_family.register(110, com_able110);
com_able_family.register(111, com_able111);

module.exports = { com110, com111, com_able110, com_able111 };
