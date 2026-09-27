/**
 * @file 调教指令 110「穿脱衣服」与 111「撕破衣服」：com110 / com111 的
 * 实现 + com_able110 / com_able111 的可执行性判定（issue #228 J18——
 * 调用服装系统 #215 的接口）。
 *
 * == 子菜单不消耗调教回合 ==
 * 子菜单可以改变服装状态，但不改变调教参数。
 *
 * 两条指令都是**自带输入循环的子菜单指令**，不写 SOURCE/delta、不调用
 * train_message_a/b。回合循环将指令返回 0 解释为取消本回合：
 * 不进行 source-check 结算，不推进 PREVCOM，重新显示调教界面。
 * 返回非 0 才走结算。com110 的全部出口返回 0，
 * 因此穿脱衣服前后「上次的调教指令」保持不变。
 * com111 返回 1 时表示退出整个穿脱子菜单，返回 0 时回到穿脱菜单；
 * 这个内部返回值由 com110 处理，不会直接进入回合结算。
 * 回合取消由 train-loop.js 的 execute_command_round 负责，
 * 本模块只负责服装变化与子菜单控制。
 *
 * 111 是高级 COM（#213 的 ADVANCED_COM_IDS 之一），但 get_adv_com
 * 不含 110/111 的升格规则；com111 由 com110 子菜单的 [9] 调用。
 * com_able111 不在可直选空间内，不参与指令菜单扫描；
 * 仍注册进 com_able_family，以保持编号空间完整。
 *
 * == 本族不注册消息分支与升格规则（#209 决定 6） ==
 *
 * - train_message_a/b 不含 SELECTCOM == 110/111 分支，
 *   com110/com111 也不调用这两个消息分发函数，
 *   因此本族无需注册消息分支。
 * - get_adv_com 没有 110/111 的升格规则，
 *   adv_com_family 留空；缺失语义由调用点的 whenMissing 声明
 *   （#7 决议）。
 * - 口上由 kojo-system.js 的 kojo_message_com 分发，
 *   缺失的 SELECTCOM 110/111 分支保持静默。
 *   各性格的对应台词由口上模块负责（轴 B，J21–J41），本模块不写台词。
 *
 * == 服装接口（#215） ==
 *
 *   wearing_cloth_all 位于 ere/system/train/cloth.js，用于探测标准装位。
 *   standard_bits 暂存当前装位，调用该函数后读取标准装位，再还原当前态；
 *   各判定函数据此判断「标准装备是否含该部位」。服装名称来自
 *   ere/page/page-clothtype.js 的取值函数，由本模块合成整行再打印。
 *
 * == 写入通道的域归属（#215） ==
 *
 * 穿脱/撕破坏写 CFLAG:40（位域）/41/43/45/46/47（各部位洗濯状态）——
 * 属主 train，域内直写。**CFLAG:44（胸罩状态）属主 stronghold**
 * （ownership/cflag-ownership.yml "44"：3 处写中据点侧占 2）——COM111
 * 撕胸罩的 CFLAG:44 = -3 是登记在册的跨域写
 * （跨域写登记在案），经 chara(cid).stronghold.
 * 胸罩状态 门面（#71）。CFLAG:42/49 只读（42 由调教后服装处理写入，
 * 49 的写据点/日程侧）。
 *
 * == 菜单空格与排版约定 ==
 *
 * - 菜单正文中的前导空格是字面文本，不应按代码缩进处理：
 *   脱衣行保留一个空格，如 ` [7] - 全部扒光`；
 *   穿衣行保留三个空格，用于区分穿衣与脱衣选项。
 *   每行合成后通过一次 print 输出。
 * - com111 的 [100] 行是 ` [100]- 算了`，
 *   ] 与 - 之间不加空格。
 *   cloth.js 尿布菜单两键与 passout.js 恢复文本的前导空格
 *   曾多出一格，#577 已修正；
 *   本菜单的空格仍按上述规则保留。
 * - 内裤脱衣的弄脏前缀检查 TFLAG:45 的位 8/4（下装/下装处理），
 *   而非位 2/1（内裤）；与穿衣分支的位 2/1 不对称，
 *   当前行为保留不改。
 *
 * 本模块不需要存根登记（docs/stub-registry.md）：所调接口均已实现，
 * 口上缺失由既有分发静默处理。
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

// CFLAG:40 着衣位域：1 内裤 2 胸罩 4 上装 8 裙
// 16 裤 64 特别服装
const BIT_PANTY = 1;
const BIT_BRA = 2;
const BIT_UPPER = 4;
const BIT_SKIRT = 8;
const BIT_TROUSERS = 16;
const BIT_SPECIAL = 64;

// —— 读数默认值（未声明下标 undefined → 0，#13） ——

const worn = (cid) => era.get(`cflag:${cid}:40`) || 0;
const set_worn = (cid, v) => era.set(`cflag:${cid}:40`, v);
const main_type = (cid) => era.get(`cflag:${cid}:41`) || 0;
const special_type = (cid) => era.get(`cflag:${cid}:42`) || 0;
const laundry = (cid, idx) => era.get(`cflag:${cid}:${idx}`) || 0;
const set_laundry = (cid, idx, v) => era.set(`cflag:${cid}:${idx}`, v);
const tequip = (cid, idx) => era.get(`tequip:${cid}:${idx}`) || 0;

/** 裙型判定：CFLAG:41 ∈ [1,100] */
const is_skirt = (cid) => {
  const type = main_type(cid);
  return type >= 1 && type <= 100;
};

/**
 * 先保存当前着衣位，再以 wearing_cloth_all 求标准装位（B），
 * 最后还原当前态。判定函数的 B 参数由此传入。
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
// com110 的 12 个穿脱判定
// ============================================================

/**
 * com110_able0t：特别服装脱衣。尿布（42==69）分支内的第二条
 * 检查（(40&64) && 42<=50）在 42==69 的分支里恒假——两个条件互斥，
 * 因此该检查不会额外阻止脱衣。
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
      return 0; // 尿布支内恒假（42==69 与 <=50 互斥）的双保险
    }
    if (main_type(cid) === 202 && worn(cid) & BIT_SKIRT) {
      return 0;
    }
  }
  return 1;
}

/** com110_able0w：特别服装穿衣（B 含特别位、洗涤中不可） */
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
      return 0; // 同 com110_able0t：尿布支内恒假的双保险
    }
    if (main_type(cid) === 202 && worn(cid) & BIT_SKIRT) {
      return 0;
    }
  }
  return 1;
}

/** com110_able1t：连体服装脱衣（41 ≥ 201 的全身衣装） */
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

/** com110_able1w：连体服装穿衣（上下两半不能同时在身或洗涤中） */
function com110_able1w(cid, b) {
  if (main_type(cid) <= 200) {
    return 0;
  }
  // 「上装穿着中或洗涤中」且「下装穿着中或洗涤中」→ 不可
  // 上下两半均还在（含洗涤中）时，不能重新穿上；
  // 只剩一半时仍允许重新穿衣，以处理部分衣物破损的情况。
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

/** com110_able2t：两件套上装脱衣（41 ≤ 200 的两截衣装） */
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

/** com110_able2w：两件套上装穿衣 */
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

/** com110_able3t：两件套下装脱衣 */
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

/** com110_able3w：两件套下装穿衣 */
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

/** com110_able4t：胸罩脱衣（上装在身时不可） */
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

/** com110_able4w：胸罩穿衣（上半身全裸才可） */
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

/** com110_able5t：内裤脱衣（裤型下装在身时不可） */
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

/** com110_able5w：内裤穿衣 */
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
// com111 的 7 个撕破判定
// ============================================================

/** com111_able0l：特别服装撕破 */
function com111_able0l(cid) {
  if (special_type(cid) === 0) {
    return 0;
  }
  if ((worn(cid) & BIT_SPECIAL) === 0) {
    return 0;
  }
  return 1;
}

/** com111_able1l：连体服装上半身撕破（41 ≥ 201） */
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

/** com111_able2l：连体服装下半身撕破 */
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

/** com111_able3l：两件套上装撕破（41 ≤ 200） */
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

/** com111_able4l：两件套下装撕破 */
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

/** com111_able5l：胸罩撕破 */
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

/** com111_able6l：内裤撕破（和服下为裙时不可） */
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
// com110 / com111 主体
// ============================================================

/**
 * 弄脏前缀（脱衣行的内联形容词；TFLAG:45 位 → 串）。pos 为「污物处理」位、
 * neg 为「尿」位（各部位两 bit 相邻：32/16 特别服装、8/4 下装——内裤脱衣
 * 也检查下装位，见文件头）。
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
 * com110：穿脱衣服子菜单。逐键输入循环。
 * @returns {Promise<number>} 返回 0（全部出口；回合取消语义见文件头）
 */
async function com110() {
  const target = era_flag.target;
  const name = chara_callname(target);

  for (;;) {
    era.print('穿脱衣服');

    const b = standard_bits(target); // A・B 探测

    // 着脱の確認（现在%名%的外貌是，…。）
    era.print(`现在${name}的外貌是，${clothtype_text(target)}。`);

    // 判定変数 T/W
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

    // —— 子菜单（脱衣行一空格 / 穿衣行三空格，见文件头）——
    if (t[0]) {
      era.print(
        ` [0] - ${clothtype_special_text(target)}${
          special_type(target) >= 51 ? '取下' : '脱掉'
        }`,
      );
    }
    if (w[0]) {
      era.print(
        `\u00A0\u00A0\u00A0[0] - ${clothtype_special_text(target)}${
          special_type(target) >= 51 ? '装上' : '穿起'
        }`,
      );
    }
    if (t[1]) {
      era.print(` [1] - ${clothtype_main2_text(target)}脱掉`);
    }
    if (w[1]) {
      era.print(`\u00A0\u00A0\u00A0[1] - ${clothtype_main2_text(target)}穿起`);
    }
    if (t[2]) {
      era.print(` [1] - ${clothtype_main2_text(target)}上半身脱掉`);
    }
    if (w[2]) {
      era.print(
        `\u00A0\u00A0\u00A0[1] - ${clothtype_main2_text(target)}上半身穿起`,
      );
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
        `\u00A0\u00A0\u00A0[2] - ${clothtype_main2_text(target)}${
          is_skirt(target) ? '的裙子穿起' : '下半身穿起'
        }`,
      );
    }
    if (t[4]) {
      era.print(' [3] - 解开胸罩');
    }
    if (w[4]) {
      era.print('\u00A0\u00A0\u00A0[3] - 穿上胸罩');
    }
    if (t[5]) {
      era.print(' [4] - 脱掉内裤');
    }
    if (w[5]) {
      era.print('\u00A0\u00A0\u00A0[4] - 穿上内裤');
    }
    if (worn(target) !== 0) {
      era.print(' [7] - 全部扒光');
    }
    if (worn(target) !== 0) {
      era.print(' [9] - 移动到[撕破衣服]');
    }
    era.print(' [100] - 算了');

    const result = await era.input(); // 选择结果用于下面的穿脱分支

    // —— 穿脱处理 ——
    if (result === 0 && laundry(target, 49)) {
      // 外せない特別コス（贞操带钥匙已丢）
      era.print(`${name}贞操带的钥匙丢掉了。`);
      await era.waitAnyKey();
    } else if (result === 0 && t[0]) {
      // 特別コス脱衣
      const mask = era.get('tflag:45') || 0;
      era.print(
        `${name}把${soiled_adjective(mask, 32, 16)}${clothtype_special_text(target)}${
          special_type(target) >= 51 ? '取下了。' : '脱掉了。'
        }`,
      );
      set_worn(target, worn(target) - BIT_SPECIAL);
    } else if (result === 0 && w[0]) {
      // 特別コス装着（污物/尿浸时不可用）
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
      // ワンピース脱衣（上下一起脱）
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
      // ワンピース装着（上下两半都不可用才成）
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
          // 201-250 裙型 → 位 8 / 251-300 裤型 → 位 16
          bits |= main_type(target) <= 250 ? BIT_SKIRT : BIT_TROUSERS;
        }
        set_worn(target, bits);
      }
    } else if (result === 1 && t[2]) {
      // ツーピース上脱衣
      era.print(`${name}将${clothtype_main2_text(target)}的上半身脱掉了。`);
      set_worn(target, worn(target) - BIT_UPPER);
    } else if (result === 1 && w[2]) {
      // ツーピース上装着
      era.print(`${name}把${clothtype_main2_text(target)}的上半身穿上了。`);
      set_worn(target, worn(target) | BIT_UPPER);
    } else if (result === 2 && t[3]) {
      // ツーピース下脱衣
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
      // ツーピース下装着
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
        // 1-100 裙型 → 位 8 / 101-200 裤型 → 位 16
        set_worn(
          target,
          worn(target) | (main_type(target) <= 100 ? BIT_SKIRT : BIT_TROUSERS),
        );
      }
    } else if (result === 3 && t[4]) {
      // ブラジャー脱衣
      era.print(`${name}的胸罩解开了。`);
      set_worn(target, worn(target) - BIT_BRA);
    } else if (result === 3 && w[4]) {
      // ブラジャー装着
      era.print(`${name}穿上了胸罩。`);
      set_worn(target, worn(target) | BIT_BRA);
    } else if (result === 4 && t[5]) {
      // 内裤脱衣（弄脏位检查下装 8/4，见文件头）
      const mask = era.get('tflag:45') || 0;
      era.print(`${name}把${soiled_adjective(mask, 8, 4)}内裤脱掉了。`);
      set_worn(target, worn(target) - BIT_PANTY);
    } else if (result === 4 && w[5]) {
      // パンツ装着
      const mask = era.get('tflag:45') || 0;
      const unusable = soiled_unusable(mask, 2, 1);
      if (unusable) {
        era.print(unusable);
      } else {
        era.print(`${name}穿上了内裤。`);
        set_worn(target, worn(target) | BIT_PANTY);
      }
    } else if (result === 7 && worn(target) !== 0) {
      // 全裸にして終了（贞操带直接选才脱得掉）
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
      // 移动到撕破衣服；菜单输出已经结束当前行，
      // 此处再输出一个空行（#595）。
      era.print('');
      const ripped = await com111();
      if (ripped === 1) {
        return 0;
      }
    } else if (result === 100) {
      // 算了
      return 0;
    }

    era.print(''); // 各分支输出已结束当前行，再补一个空行（#595）
    // 回到输入循环
  }
}

/**
 * com111：撕破衣服子菜单，由 com110 的 [9] 调用；
 * RETURN 1 = 算了（COM110 据此退出）、0 = 返回穿脱/已处理。
 * @returns {Promise<number>} 返回 0 / 1
 */
async function com111() {
  const target = era_flag.target;
  const name = chara_callname(target);

  for (;;) {
    era.print('撕破衣服'); // 撕破菜单标题

    standard_bits(target); // A・B 探测（L 判定不用 B，还原即止）

    // 破り取る部位の確認
    era.print(`现在${name}的外貌是，${clothtype_text(target)}。`);

    // 引き裂き判定変数 L
    const l = [
      com111_able0l(target),
      com111_able1l(target),
      com111_able2l(target),
      com111_able3l(target),
      com111_able4l(target),
      com111_able5l(target),
      com111_able6l(target),
    ];

    // —— 子菜单 ——
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

    const result = await era.input();

    // —— 撕破处理 ——
    // 剥ぎ取れない特別コス（史莱姆/贞操带：被徒手撕破但撕不下来）
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
      // 特別コス引き裂き
      era.print(`${name}的${clothtype_special_text(target)}被强行剥掉了。`);
      set_worn(target, worn(target) - BIT_SPECIAL);
      set_laundry(target, 47, -3); // CFLAG:47 = -3（破り取られている）
    } else if (result === 11 && l[1]) {
      // ワンピース上半身引き裂き
      era.print(
        `${name}穿着的${clothtype_main2_text(target)}的上半身被撕坏了。`,
      );
      set_worn(target, worn(target) - BIT_UPPER);
      set_laundry(target, 45, -3);
    } else if (result === 12 && l[2]) {
      // ワンピース下半身引き裂き（位 4 一起消）
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
      set_laundry(target, 46, -3);
    } else if (result === 11 && l[3]) {
      // ツーピース上引き裂き
      era.print(
        `${name}穿着的${clothtype_main2_text(target)}的上半身被撕破了。`,
      );
      set_worn(target, worn(target) - BIT_UPPER);
      set_laundry(target, 45, -3);
    } else if (result === 12 && l[4]) {
      // ツーピース下引き裂き
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
      set_laundry(target, 46, -3);
    } else if (result === 13 && l[5]) {
      // ブラジャー引き裂き（CFLAG:44 属主 stronghold，走门面 #71）
      era.print(`${name}的胸罩被撕碎了。`);
      set_worn(target, worn(target) - BIT_BRA);
      chara(target).stronghold.胸罩状态 = -3; // CFLAG:44 = -3
    } else if (result === 14 && l[6]) {
      // パンツ引き裂き
      era.print(`${name}的内裤被撕碎了。`);
      set_worn(target, worn(target) - BIT_PANTY);
      set_laundry(target, 43, -3);
    } else if (result === 19) {
      // 返回[穿脱衣服]
      return 0;
    } else if (result === 100) {
      // 算了
      return 1;
    } else {
      // ELSE → GOTO INPUT_LOOP（无空行直回菜单头）
      continue;
    }

    // 撕完全裸 → 收尾退出
    if (worn(target) === 0) {
      era.print('（已经全裸，撕无可撕）');
      // 前一条提示已结束当前行，此处再输出一个空行（#595）
      era.print('');
      await era.waitAnyKey();
      return 0;
    }

    era.print(''); // 撕破分支输出已结束当前行，再补一个空行（#595）
    // 回到输入循环
  }
}

// ============================================================
// com_able110 / com_able111：可用性检查
// ============================================================

/** com_able110：着衣设定未开/无衣可穿/特殊调教装备中不可 */
async function com_able110() {
  const target = era_flag.target;
  // 自动不可（CALLTRAIN 的自动回合标记）
  if ((era.get('tflag:224') || 0) === 555) {
    return 0;
  }
  // 着衣設定を使ってない
  if ((era.get('flag:37') || 0) === 0) {
    return 0;
  }
  // 着衣フラグが存在しない（既定服装与特别服装均未设定）
  if (main_type(target) === 0 && special_type(target) === 0) {
    return 0;
  }
  // 触手/决斗/绳子/浴室/新妻各装备位
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

/** com_able111：复用 com_able110，另加全裸不可 */
async function com_able111() {
  const base = await com_able110();
  if (base === 0) {
    return 0;
  }
  // 全裸だとダメ
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
