/**
 * @file 服装系统的状态机：着衣位的初始化、调教后处理、再着衣与失禁弄脏
 * （issue #215 J5）。本文件归 train 域（ADR-0007：50 处 CFLAG 持久写入、
 * 调教后处理 / 弄脏 / 洗涤的消费者全在调教流程内）。
 *
 * == 变量承载 ==
 *
 *   - CFLAG:40 着衣状態位域（&1 内裤 &2 胸罩 &4 上装 &8 下装·裙
 *     &16 下装·裤 &64 特别服装）；41 上衣类型；42 特别服装类型；
 *     43-47 各部位洗濯/废弃状态；48 内裤穿旧度；
 *   - TFLAG:45 调教中的一时弄脏标志（&1 内裤 &2 内裤处理 &4 下装
 *     &8 下装处理 &16 特别服装 &32 特别服装处理）——调教域表，桶随
 *     beginTrain 建、endTrain 删；
 *   - 写入通道的域归属：40/41/43/45-48 属主 train（本文件 train 域内
 *     直写）；42 属主 chara——AFTERTRAIN_CLOTH 的写经 chara(cid).chara.
 *     特别服装类型 门面（#71，ownership/cflag-ownership.yml "42"）。
 *
 * == TFLAG:45 的调教外通道（#179 TFLAG:18 同样处置） ==
 *
 * 唯一的调教外消费链是日程推进的尿床分支（run_event_nextday 侧）：
 * soiling_cloth_no1 置位、紧随的 aftertrain_cloth 消费。ere
 * 引擎的 tflag 桶随 endTrain 删除，调教外读写 TFLAG:45 会落「key error in
 * getter/setter」（era-fixture 的 TRAIN_ONLY_TABLES 镜像同一条）——该通道
 * 在 ere 侧由参数链代位：soiling_cloth_no1/no2 返回置位掩码，调教外调用
 * 传 { in_train: false } 跳过 tflag 写入，aftertrain_cloth 经第二参
 * soiled_mask 接收（tflag:45 的写入只在调教期内存活，endTrain 删表即消除
 * 残留——#179 结论）。**给后续工单的提醒：在日程推进侧实现尿床事件时，
 * 读 soiling 返回值传 aftertrain 的 mask 参数，不要碰 tflag:45。**已知的
 * 语义边界：TFLAG:45 的未处理位（如 CFLAG:46 != 0 时滞留的 &4）在调教期
 * 结束时随 endTrain 删表一并消失，不会残留到日程段——按 #179 的等价
 * 结论接受，不补通道。
 *
 * == 洗涤与洗衣状态（CFLAG:43-47 的正值语义已废弃） ==
 *
 * 洗涤即时完成：aftertrain_cloth 的各洗涤分支只收穿着位、不再置洗衣
 * 状态（43/45/46/47 ≥ 1 的正值），洗过的衣物下次 wearing_cloth_able /
 * re_clothed 即可穿回，无需购新重置。负值状态保留语义：-2 废弃
 * （调教后处理的丢弃分支）、-3 撕破（指令 111）、-1 没收。CFLAG:48（内裤
 * 穿旧度）无写点，恒 0。
 *
 * 本文件全函数真身；
 * 消费方（pissing_ecst_check / 指令 46・85 文本 / 尿床事件）各自接入。
 */

'use strict';

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { chara } = require('#/facade/chara');
const { chara_callname } = require('#/utils/callname-utils');
const { clothtype_main2_text } = require('#/page/page-clothtype');
const { get_clothtype_special } = require('#/system/cloth-lookup');

// —— 读数缺省处理（未声明下标 undefined → 0，#13；包装层 getter 一律 || 0） ——

const worn = (cid) => era.get(`cflag:${cid}:40`) || 0; // CFLAG:40 位域
const set_worn = (cid, v) => era.set(`cflag:${cid}:40`, v);
const main_type = (cid) => era.get(`cflag:${cid}:41`) || 0;
const special_type = (cid) => chara(cid).chara.特别服装类型; // CFLAG:42
const talent = (cid, idx) => era.get(`talent:${cid}:${idx}`) || 0;

/** TFLAG:45 的置位（调教内调用方使用；返回更新后的掩码） */
function or_tflag45(mask, bit, in_train) {
  if (in_train) {
    era.set('tflag:45', mask | bit);
  }
  return mask | bit;
}

/**
 * wearing_cloth_all：着衣位的初始化。CFLAG:41/42 都未设定时直接返回；
 * 否则先全裸、再按类型装位。
 * @param {number} cid 角色 ID（显式传参，#5 决议第六条）
 * @returns {number} 0 = 无既定服装、1 = 已初始化
 */
function wearing_cloth_all(cid) {
  // 標準衣装が設定されてない場合は戻る
  if (main_type(cid) === 0 && special_type(cid) === 0) {
    return 0;
  }
  // 一旦全裸に
  let bits = 0;

  // 標準コス処理（CFLAG:41 != 0）
  if (main_type(cid) !== 0) {
    // パンツ装着
    bits |= 1;
    // 绝壁(116)、未熟(135)＋幼稚(132)＆贫乳(109)の場合を除きブラ装着
    if (
      talent(cid, 116) === 0 &&
      talent(cid, 135) === 0 &&
      (talent(cid, 132) === 0 || talent(cid, 109) === 0)
    ) {
      bits |= 2;
    }
    const type = main_type(cid);
    // 和服(202)・バニースーツ(254)用ノーブラ化処理
    if (bits & 2 && (type === 202 || type === 254)) {
      bits -= 2;
    }
    // 全裸の上にまとうタイプ（191-200 / 241-250 / 291-300）
    if (type >= 191 && type <= 200) {
      bits = 0;
    }
    if (type >= 241 && type <= 250) {
      bits = 0;
    }
    if (type >= 291 && type <= 300) {
      bits = 0;
    }
    // 島の娘の服（29）
    if (type === 29) {
      bits = 0;
    }
    // オムツ着用時（CFLAG:42 == 69）のノーパン処理
    if (bits & 1 && special_type(cid) === 69) {
      bits -= 1;
    }

    // 下装类型 → 位 4 与位 8/16
    if (type >= 1 && type <= 100) {
      // スカートタイプのツーピース
      bits |= 4;
      bits |= 8;
    } else if (type >= 101 && type <= 200) {
      // ズボンタイプのツーピース
      bits |= 4;
      bits |= 16;
    } else if (type >= 201 && type <= 250) {
      // スカートタイプの全身衣装
      bits |= 4;
      bits |= 8;
    } else if (type >= 251 && type <= 300) {
      // ズボンタイプの全身衣装
      bits |= 4;
      bits |= 16;
    }

    // ふんどし（192）は位 16 单独成立
    if (type === 192) {
      bits = 16;
    }
  }

  // 特別コスの装着（位 64）
  if (special_type(cid)) {
    bits |= 64;
  }

  set_worn(cid, bits);
  return 1;
}

/**
 * wearing_cloth_able：着用可能な衣装の全装着。全量初始化后，按各部位
 * 的洗濯/废弃状态剥掉不可着用的位。尾部不显式返回（隐式 0），调用方
 * （char_init / enter_enemy 等）不读返回值。
 * @param {number} cid 角色 ID
 * @returns {number} 0（隐式返回）
 */
function wearing_cloth_able(cid) {
  wearing_cloth_all(cid);
  const before = worn(cid);
  let bits = before;
  // 洗濯中（≥1）/没收（-1）/废弃（-2）的部位不可着用——逐部位检查
  // 命中才写 CFLAG:40（-= 位），全不命中时**不写**（未写与写 0 在
  // undefined 读数上有别，测试可见）
  if ((era.get(`cflag:${cid}:43`) || 0) !== 0) {
    bits -= bits & 1;
  }
  if ((era.get(`cflag:${cid}:44`) || 0) !== 0) {
    bits -= bits & 2;
  }
  if ((era.get(`cflag:${cid}:45`) || 0) !== 0) {
    bits -= bits & 4;
  }
  if ((era.get(`cflag:${cid}:46`) || 0) !== 0) {
    bits -= bits & 8;
  }
  if ((era.get(`cflag:${cid}:46`) || 0) !== 0) {
    bits -= bits & 16;
  }
  if ((era.get(`cflag:${cid}:47`) || 0) !== 0) {
    bits -= bits & 64;
  }
  if (bits !== before) {
    set_worn(cid, bits);
  }
  return 0;
}

/**
 * aftertrain_cloth：调教后的衣物处理——丢弃/洗涤的结算与穿戴位的收回。
 * @param {number} cid 角色 ID
 * @param {number} [soiled_mask] 弄脏掩码（TFLAG:45 的等价物）。缺省
 *   （undefined）= 调教内调用（EVENTEND 链），直接读写 TFLAG:45；传数值 =
 *   调教外调用（尿床链），TFLAG:45 由 soiling_cloth_no* 的返回值传入、
 *   本函数不触碰 tflag 表（文件头「TFLAG:45 的调教外通道」节）。
 * @returns {Promise<number>} 恒 1
 */
async function aftertrain_cloth(cid, soiled_mask = undefined) {
  const in_train = soiled_mask === undefined;
  const name = chara_callname(cid);
  const mask = () => (in_train ? era.get('tflag:45') || 0 : soiled_mask);
  const set_mask = (v) => {
    if (in_train) {
      era.set('tflag:45', v);
    }
    soiled_mask = v;
  };

  // —— 特別コス ——
  if (special_type(cid) !== 0 && (mask() & 32) !== 0) {
    // 被拿去扔掉了（一行 + 等键）
    era.print(`（${name}的${get_clothtype_special(cid)}被拿去扔掉了）`);
    await era.waitAnyKey();
    chara(cid).chara.特别服装类型 = 0; // CFLAG:42 = 0
    set_mask(mask() - 32);
    if (worn(cid) & 64) {
      set_worn(cid, worn(cid) - 64);
    }
  } else if (
    special_type(cid) === 69 &&
    (mask() & 16) !== 0 &&
    (era.get(`cflag:${cid}:47`) || 0) === 0 &&
    era_flag.money >= 50
  ) {
    // オムツの場合の特殊処理（换新 / 洗涤的选择）
    for (;;) {
      era.print(`花费50p为${name}换尿布吗？`);
      // 按钮串 `[0] - 好的`：编号后第一格是分隔符，那一个半角
      // 空格照全项目 `[n] - …` 一族写成半角（#577 的普查标准）
      era.print(' [0] - 好的');
      era.print(' [1] - 不要');
      const result = await era.input();
      if (result === 0) {
        // 换上新的尿布（下一条耻情加成紧随其后，同段输出）
        era.print(`（为${name}换上了新的尿布）`);
        era_flag.money -= 50;
        era_exflag.legit_money -= 50;
        era.set(`cflag:${cid}:47`, 0);
        set_mask(mask() - 16);
        if (talent(cid, 135) === 0) {
          // 未熟以外：耻情点数＋500（PALAMNAME:8 = 耻情）；
          // 本句与上句连续输出、各占一行，之间不是空行——
          // 不补 println（#595）
          era.print(`${era.get('palamname:8') ?? ''}点数＋500`);
          const juel8 = era.get(`juel:${cid}:8`) || 0; // JUEL:8
          era.set(`juel:${cid}:8`, juel8 + 500);
        }
        await era.waitAnyKey();
        break;
      }
      if (result === 1) {
        // 把尿布拿去洗了
        era.print(`（把${name}的尿布拿去洗了）`);
        await era.waitAnyKey();
        // 洗衣状态不再设置：洗涤即时完成，尿布下次着衣即可穿回
        set_mask(mask() - 16);
        if (worn(cid) & 64) {
          set_worn(cid, worn(cid) - 64);
        }
        break;
      }
      // 其余输入 → 重问
    }
  } else if (
    special_type(cid) !== 0 &&
    (mask() & 16) !== 0 &&
    (era.get(`cflag:${cid}:47`) || 0) === 0
  ) {
    // 特別コスの洗濯
    era.print(`（${name}的${get_clothtype_special(cid)}被拿去洗了）`);
    await era.waitAnyKey();
    // 洗衣状态不再设置：洗涤即时完成，下次着衣即可穿回
    set_mask(mask() - 16);
    if (worn(cid) & 64) {
      set_worn(cid, worn(cid) - 64);
    }
  }

  // —— 上着下（下装） ——
  if (main_type(cid) !== 0 && (mask() & 8) !== 0) {
    // 被拿去扔掉了（拼一行后等键）
    let line = `（${name}穿过的${clothtype_main2_text(cid)}`;
    if (main_type(cid) >= 1 && main_type(cid) <= 100) {
      line += '的裙子';
    } else if (main_type(cid) <= 200) {
      line += '的下身'; // （201+ 无后缀）
    }
    era.print(`${line}被拿去扔掉了）`);
    await era.waitAnyKey();
    if (main_type(cid) >= 201) {
      // 全身衣装は上下一緒に消える
      era.set(`cflag:${cid}:41`, 0);
      let bits = worn(cid);
      if (bits & 4) {
        bits -= 4;
      }
      if (bits & 8) {
        bits -= 8;
      }
      if (bits & 16) {
        bits -= 16;
      }
      set_worn(cid, bits);
    } else {
      era.set(`cflag:${cid}:46`, -2); // ツーピースは下のみ廃棄
      let bits = worn(cid);
      if (bits & 8) {
        bits -= 8;
      }
      if (bits & 16) {
        bits -= 16;
      }
      set_worn(cid, bits);
    }
    set_mask(mask() - 8);
  } else if (
    main_type(cid) !== 0 &&
    (mask() & 4) !== 0 &&
    (era.get(`cflag:${cid}:46`) || 0) === 0
  ) {
    // 被拿去洗了
    let line = `（${name}穿过的${clothtype_main2_text(cid)}`;
    if (main_type(cid) >= 1 && main_type(cid) <= 100) {
      line += '的裙子';
    } else if (main_type(cid) <= 200) {
      line += '的下身';
    }
    era.print(`${line}被拿去洗了）`);
    await era.waitAnyKey();
    if (main_type(cid) >= 201) {
      // 全身衣装は上下とも洗濯（洗衣状态不再设置，只收穿着位）
      let bits = worn(cid);
      if (bits & 4) {
        bits -= 4;
      }
      if (bits & 8) {
        bits -= 8;
      }
      if (bits & 16) {
        bits -= 16;
      }
      set_worn(cid, bits);
    } else {
      // 两截型只收下装位（洗衣状态不再设置）
      let bits = worn(cid);
      if (bits & 8) {
        bits -= 8;
      }
      if (bits & 16) {
        bits -= 16;
      }
      set_worn(cid, bits);
    }
    set_mask(mask() - 4);
  }

  // —— パンツ ——
  if ((mask() & 2) !== 0) {
    // 内衣被拿去扔掉了
    era.print(`（${name}的内衣被拿去扔掉了）`);
    await era.waitAnyKey();
    era.set(`cflag:${cid}:43`, -2);
    if (worn(cid) & 1) {
      set_worn(cid, worn(cid) - 1);
    }
    set_mask(mask() - 2);
  } else if ((mask() & 1) !== 0 && (era.get(`cflag:${cid}:43`) || 0) === 0) {
    // 内衣被拿去洗了
    era.print(`（${name}的内衣被拿去洗了）`);
    await era.waitAnyKey();
    // 洗衣状态不再设置：洗涤即时完成，下次着衣即可穿回
    if (worn(cid) & 1) {
      set_worn(cid, worn(cid) - 1);
    }
    set_mask(mask() - 1);
  }

  // —— 上下ともダメになった衣装は削除 ——
  if (main_type(cid)) {
    // 上着上（45）も下（46）も不可 → 类型消除
    if (
      (era.get(`cflag:${cid}:45`) || 0) < 0 &&
      (era.get(`cflag:${cid}:46`) || 0) < 0
    ) {
      era.set(`cflag:${cid}:41`, 0);
    }
    // ふんどし用処理（192 は下が無ければ成立しない）
    if (main_type(cid) === 192 && (era.get(`cflag:${cid}:46`) || 0) < 0) {
      era.set(`cflag:${cid}:41`, 0);
    }
    // 外衣脱掉了（41 == 0）、但还穿着内衣（40 & 3）→ 类型 1
    if (main_type(cid) === 0 && (worn(cid) & 3) !== 0) {
      era.set(`cflag:${cid}:41`, 1);
    }
  }
  // （此处曾有一条「内衣也脱掉了 → 类型 0」的追加分支：外层 if 对
  // 非零（含 -1）恒真、41==0 时判断条件又恒假，两支都到不了——不可达死
  // 分支，已删除）

  // —— ダメになった特別コスは削除 ——
  if (special_type(cid)) {
    if ((era.get(`cflag:${cid}:47`) || 0) < 0) {
      chara(cid).chara.特别服装类型 = 0;
    }
  }

  return 1;
}

/**
 * re_clothed：衣類の再着衣。顺从（ABL:10）＋露出癖（ABL:17）
 * 3 以上则维持被脱掉的状态；否则把能穿的全部穿回。
 * @param {number} cid 角色 ID
 * @returns {Promise<number>} 恒 1
 */
async function re_clothed(cid) {
  const obedience = era.get(`abl:${cid}:10`) || 0; // ABL:10 顺从
  const exposure = era.get(`abl:${cid}:17`) || 0; // ABL:17 露出癖
  if (obedience + exposure < 3) {
    const before = worn(cid);
    wearing_cloth_able(cid);
    if (worn(cid) > before) {
      era.print(`（${chara_callname(cid)}把被脱掉的衣服又穿上了）`);
      await era.waitAnyKey();
    }
  }
  return 1;
}

/**
 * 失禁弄脏的下装句前缀（soiling_cloth_no1 / no2 共用：弄脏物名不同
 * ——尿与污物，串内容一致由调用方拼）。
 * @param {number} cid 角色 ID
 * @returns {string} 「…正穿着<类型><裙子/下身>」的前半句
 */
function soiled_lower_prefix(cid) {
  let line = `《${chara_callname(cid)}正穿着${clothtype_main2_text(cid)}`;
  if (main_type(cid) >= 1 && main_type(cid) <= 100) {
    line += '的裙子';
  } else if (main_type(cid) <= 200) {
    line += '的下身';
  }
  return line;
}

/**
 * soiling_cloth_no1：調教中のおもらし処理（小）。着衣設定でなければ何も
 * しない。
 * @param {number} cid 角色 ID
 * @param {object} [opts]
 * @param {boolean} [opts.in_train] 调教内调用（缺省 true：置位落
 *   TFLAG:45）。调教外（尿床链）传 false——文件头「TFLAG:45 的调教外
 *   通道」节。
 * @returns {Promise<number>} 置位后的掩码
 *   （调教外调用方把它传给 aftertrain_cloth）
 */
async function soiling_cloth_no1(cid, { in_train = true } = {}) {
  // 着衣設定でなければそのまま終了
  if ((era.get('flag:37') || 0) === 0) {
    return 0;
  }
  let mask = in_train ? era.get('tflag:45') || 0 : 0;

  // 着衣中に放尿：特别服装（≤50 的着装型或 69 尿布）暂时不可用
  if (
    (worn(cid) & 64) !== 0 &&
    (special_type(cid) <= 50 || special_type(cid) === 69)
  ) {
    era.print(
      `《${chara_callname(cid)}的${get_clothtype_special(cid)}沾满了尿》`,
    );
    mask = or_tflag45(mask, 16, in_train);
    // オムツ着用中なら他の衣類は無事
    if (special_type(cid) === 69) {
      return mask;
    }
  }
  // 下装
  if ((worn(cid) & 8) !== 0 || (worn(cid) & 16) !== 0) {
    era.print(`${soiled_lower_prefix(cid)}沾满了尿》`);
    mask = or_tflag45(mask, 4, in_train);
  }
  // 内裤
  if (worn(cid) & 1) {
    era.print(`《${chara_callname(cid)}的内衣沾满了尿》`);
    mask = or_tflag45(mask, 1, in_train);
  }
  return mask;
}

/**
 * soiling_cloth_no2：調教中のおもらし処理（大）——脱糞，
 * 弄脏的衣物直接进废弃处理。
 * @param {number} cid 角色 ID
 * @param {object} [opts] 同 soiling_cloth_no1
 * @returns {Promise<number>} 置位后的掩码
 */
async function soiling_cloth_no2(cid, { in_train = true } = {}) {
  // 着衣設定でなければそのまま終了
  if ((era.get('flag:37') || 0) === 0) {
    return 0;
  }
  let mask = in_train ? era.get('tflag:45') || 0 : 0;

  // 特别服装：洗濯 + 処分双位置位
  if (
    (worn(cid) & 64) !== 0 &&
    (special_type(cid) <= 50 || special_type(cid) === 69)
  ) {
    era.print(
      `《${chara_callname(cid)}的${get_clothtype_special(cid)}沾满了污物》`,
    ); // 与下装句同形，右书名号闭合
    mask = or_tflag45(mask, 16, in_train);
    mask = or_tflag45(mask, 32, in_train);
    // オムツ着用中なら他の衣類は無事
    if (special_type(cid) === 69) {
      return mask;
    }
  }
  // 下装：洗濯 + 処分
  if ((worn(cid) & 8) !== 0 || (worn(cid) & 16) !== 0) {
    era.print(`${soiled_lower_prefix(cid)}沾满了污物》`);
    mask = or_tflag45(mask, 4, in_train);
    mask = or_tflag45(mask, 8, in_train);
  }
  // 内裤
  if (worn(cid) & 1) {
    era.print(`《${chara_callname(cid)}的内衣沾满了污物》`);
    mask = or_tflag45(mask, 1, in_train);
    mask = or_tflag45(mask, 2, in_train);
  }
  return mask;
}

module.exports = {
  aftertrain_cloth,
  re_clothed,
  soiling_cloth_no1,
  soiling_cloth_no2,
  wearing_cloth_able,
  wearing_cloth_all,
};
