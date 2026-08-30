/**
 * @file 服装系统的状态机：着衣位的初始化、调教后处理、再着衣与失禁弄脏
 * （issue #215 J5）。FUNC_CLOTH 归 train 域（ADR-0007：50 处 CFLAG 持久
 * 写入、AFTERTRAIN_CLOTH / SOILING_CLOTH / WASHING_CLOTH 的消费者全在
 * 调教流程内）。
 *
 * 源: target/ERB/其他/FUNC_CLOTH.ERB  @WEARING_CLOTH_ALL（:161-221）
 *     target/ERB/其他/FUNC_CLOTH.ERB  @WEARING_CLOTH_ABLE（:226-239）
 *     target/ERB/其他/FUNC_CLOTH.ERB  @AFTERTRAIN_CLOTH（:244-388）
 *     target/ERB/其他/FUNC_CLOTH.ERB  @RE_CLOTHED（:393-405）
 *     target/ERB/其他/FUNC_CLOTH.ERB  @SOILING_CLOTH_NO1（:459-488）
 *     target/ERB/其他/FUNC_CLOTH.ERB  @SOILING_CLOTH_NO2（:493-525）
 *
 * == 变量承载（CFLAG 头注的逐条对应，FUNC_CLOTH.ERB:8-21） ==
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
 * == TFLAG:45 的调教外通道（#179 TFLAG:18 的同形态处置） ==
 *
 * 原作唯一的调教外消费链是 @EVENTNEXTDAY 的尿床分支（EVENT_NEXTDAY.ERB
 * :786-787：SOILING_CLOTH_NO1 置位、紧随的 AFTERTRAIN_CLOTH 消费）。ere
 * 引擎的 tflag 桶随 endTrain 删除，调教外读写 TFLAG:45 会落「key error in
 * getter/setter」（era-fixture 的 TRAIN_ONLY_TABLES 镜像同一条）——该通道
 * 在 ere 侧由参数链代位：soiling_cloth_no1/no2 返回置位掩码，调教外调用
 * 传 { in_train: false } 跳过 tflag 写入，AFTERTRAIN_CLOTH 经第二参
 * soiled_mask 接收（Emuera 侧跨期残留靠「TRAIN 开始清零」消除、ere 靠
 * 「endTrain 删表」，等价——#179 裁定原文）。**给后续票的提醒：尿床票
 * 接线 EVENT_NEXTDAY 时读 soiling 返回值传 aftertrain 的 mask 参数，不要
 * 碰 tflag:45。**已知的语义边界：原作 TFLAG:45 的未处理位（如 CFLAG:46
 * != 0 时滞留的 &4）会跨 TRAIN 残留到日程段被补消费，ere 侧 endTrain 删
 * 表后该残留窗口关闭——按 #179 的等价裁定接受，不补通道。
 *
 * == WASHING_CLOTH（:410-454）不移植 ==
 *
 * 全库唯一调用点被注释（EVENT_NEXTDAY.ERB:98-99 的 `;SIF FLAG:37` /
 * `;CALL WASHING_CLOTH`）——原作死代码，判死不移植（@SYSTEM_LOADEND 的
 * C2 先例），登记 #14。后果 1:1 继承：洗衣状态（CFLAG:43/46/47 ≥ 1）没有
 * 递减者，洗过的衣物直到 SHOP_TAILOR 购新（CFLAG:43/46/47 = 0 重置）才
 * 回来。CFLAG:48（内裤穿旧度）的唯一递增点也在其中，恒 0。
 *
 * 这张票存根/登记（docs/stub-registry.md）：无——本文件全函数真身；
 * 消费方（PISSING_ECST_CHECK / COMF46 / COMF85 / 尿床事件）随各自票接线。
 */

'use strict';

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { chara } = require('#/facade/chara');
const { chara_callname } = require('#/utils/callname-utils');
const { clothtype_main2_text } = require('#/page/page-clothtype');
const { get_clothtype_special } = require('#/system/cloth-lookup');

// —— 读数兜底（未声明下标 undefined → 0，#13；包装层 getter 一律 || 0） ——

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
 * @WEARING_CLOTH_ALL（:161-221）：着衣位的初始化。CFLAG:41/42 都未设定
 * 时直接返回；否则先全裸、再按类型装位。
 * @param {number} cid 角色 ID（原作经 TARGET 隐式读——调用方一律 SWAP
 *   TARGET，ere 侧显式传参，#5 决议第六条）
 * @returns {number} 原作 RETURN（0 = 无既定服装、1 = 已初始化）
 */
function wearing_cloth_all(cid) {
  // :163-164 標準衣装が設定されてない場合は戻る
  if (main_type(cid) === 0 && special_type(cid) === 0) {
    return 0;
  }
  // :167 一旦全裸に
  let bits = 0;

  // :170-215 標準コス処理（CFLAG:41 != 0）
  if (main_type(cid) !== 0) {
    // :172 パンツ装着
    bits |= 1;
    // :174 绝壁(116)、未熟(135)＋幼稚(132)＆贫乳(109)の場合を除きブラ装着
    if (
      talent(cid, 116) === 0 &&
      talent(cid, 135) === 0 &&
      (talent(cid, 132) === 0 || talent(cid, 109) === 0)
    ) {
      bits |= 2;
    }
    const type = main_type(cid);
    // :177-178 和服(202)・バニースーツ(254)用ノーブラ化処理
    if (bits & 2 && (type === 202 || type === 254)) {
      bits -= 2;
    }
    // :180-185 全裸の上にまとうタイプ（191-200 / 241-250 / 291-300）
    if (type >= 191 && type <= 200) {
      bits = 0;
    }
    if (type >= 241 && type <= 250) {
      bits = 0;
    }
    if (type >= 291 && type <= 300) {
      bits = 0;
    }
    // :187-188 島の娘の服（29）
    if (type === 29) {
      bits = 0;
    }
    // :190-191 オムツ着用時（CFLAG:42 == 69）のノーパン処理
    if (bits & 1 && special_type(cid) === 69) {
      bits -= 1;
    }

    // :194-209 下装类型 → 位 4 与位 8/16
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

    // :212-213 ふんどし（192）は位 16 单独成立
    if (type === 192) {
      bits = 16;
    }
  }

  // :218-219 特別コスの装着（位 64）
  if (special_type(cid)) {
    bits |= 64;
  }

  set_worn(cid, bits);
  return 1;
}

/**
 * @WEARING_CLOTH_ABLE（:226-239）：着用可能な衣装の全装着。全量初始化后，
 * 按各部位的洗濯/废弃状态剥掉不可着用的位。原作尾部无 RETURN（隐式 0），
 * 调用方（CHARA_MAKE_INIT / ENTER_ENEMY 等）不读返回值。
 * @param {number} cid 角色 ID
 * @returns {number} 0（原作隐式返回）
 */
function wearing_cloth_able(cid) {
  wearing_cloth_all(cid);
  const before = worn(cid);
  let bits = before;
  // :228-239 洗濯中（≥1）/没收（-1）/废弃（-2）的部位不可着用——原作每条
  // SIF 命中才写 CFLAG:40（-= 位），全不命中时**不写**（未写与写 0 在
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
 * @AFTERTRAIN_CLOTH（:244-388）：调教后的衣物处理——丢弃/洗涤的结算与
 * 穿戴位的收回。
 * @param {number} cid 角色 ID
 * @param {number} [soiled_mask] 弄脏掩码（TFLAG:45 的等价物）。缺省
 *   （undefined）= 调教内调用（@EVENTEND），直接读写 TFLAG:45；传数值 =
 *   调教外调用（尿床链），TFLAG:45 由 soiling_cloth_no* 的返回值传入、
 *   本函数不触碰 tflag 表（文件头「TFLAG:45 的调教外通道」节）。
 * @returns {Promise<number>} 原作 RETURN 1
 */
async function aftertrain_cloth(cid, soiled_mask = undefined) {
  const in_train = soiled_mask === undefined;
  const name = chara_callname(cid); // %SAVESTR:TARGET%
  const mask = () => (in_train ? era.get('tflag:45') || 0 : soiled_mask);
  const set_mask = (v) => {
    if (in_train) {
      era.set('tflag:45', v);
    }
    soiled_mask = v;
  };

  // —— :247-295 特別コス ——
  if (special_type(cid) !== 0 && (mask() & 32) !== 0) {
    // :249 被拿去扔掉了（PRINTFORMW：一行 + 等键）
    era.print(`（${name}的${get_clothtype_special(cid)}被拿去扔掉了）`);
    await era.waitAnyKey();
    chara(cid).chara.特别服装类型 = 0; // :250 CFLAG:42 = 0
    set_mask(mask() - 32); // :251
    if (worn(cid) & 64) {
      set_worn(cid, worn(cid) - 64); // :253-254
    }
  } else if (
    special_type(cid) === 69 &&
    (mask() & 16) !== 0 &&
    (era.get(`cflag:${cid}:47`) || 0) === 0 &&
    era_flag.money >= 50
  ) {
    // :255-284 オムツの場合の特殊処理（换新 / 洗涤的选择）
    for (;;) {
      era.print(`花费50p为${name}换尿布吗？`); // :258 PRINTFORML
      era.print('  [0] - 好的'); // :259
      era.print('  [1] - 不要'); // :260
      const result = await era.input(); // :261
      if (result === 0) {
        // :263 换上新的尿布（PRINTFORM，不收行——:269 空行后另有输出）
        era.print(`（为${name}换上了新的尿布）`);
        era_flag.money -= 50; // :264 MONEY
        era_exflag.legit_money -= 50; // :265 EX_FLAG:4444
        era.set(`cflag:${cid}:47`, 0); // :266
        set_mask(mask() - 16); // :267
        if (talent(cid, 135) === 0) {
          // :268-271 未熟以外：空行 + 耻情点数＋500（PALAMNAME:8 = 耻情）
          era.print(''); // :269 PRINTL（空行）
          era.print(`${era.get('palamname:8') ?? ''}点数＋500`);
          const juel8 = era.get(`juel:${cid}:8`) || 0; // JUEL:8
          era.set(`juel:${cid}:8`, juel8 + 500);
        }
        await era.waitAnyKey(); // :273 WAIT
        break;
      }
      if (result === 1) {
        // :276 把尿布拿去洗了
        era.print(`（把${name}的尿布拿去洗了）`);
        await era.waitAnyKey();
        era.set(`cflag:${cid}:47`, 2); // :277
        set_mask(mask() - 16); // :278
        if (worn(cid) & 64) {
          set_worn(cid, worn(cid) - 64); // :280-281
        }
        break;
      }
      // :282-283 ELSE → GOTO INPUT_LOOP_01（重问）
    }
  } else if (
    special_type(cid) !== 0 &&
    (mask() & 16) !== 0 &&
    (era.get(`cflag:${cid}:47`) || 0) === 0
  ) {
    // :285-294 特別コスの洗濯
    era.print(`（${name}的${get_clothtype_special(cid)}被拿去洗了）`);
    await era.waitAnyKey();
    era.set(`cflag:${cid}:47`, 5); // :287
    if (special_type(cid) === 69) {
      // :289-290 オムツは洗濯速度が下着並
      era.set(`cflag:${cid}:47`, 2);
    }
    set_mask(mask() - 16); // :291
    if (worn(cid) & 64) {
      set_worn(cid, worn(cid) - 64); // :293-294
    }
  }

  // —— :297-350 上着下（下装） ——
  if (main_type(cid) !== 0 && (mask() & 8) !== 0) {
    // :298-305 被拿去扔掉了（PRINTFORM + PRINTW 拼一行后等键）
    let line = `（${name}穿过的${clothtype_main2_text(cid)}`;
    if (main_type(cid) >= 1 && main_type(cid) <= 100) {
      line += '的裙子'; // :300-301
    } else if (main_type(cid) <= 200) {
      line += '的下身'; // :302-303（201+ 无后缀，1:1）
    }
    era.print(`${line}被拿去扔掉了）`);
    await era.waitAnyKey(); // PRINTW
    if (main_type(cid) >= 201) {
      // :306-313 全身衣装は上下一緒に消える
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
      era.set(`cflag:${cid}:46`, -2); // :315 ツーピースは下のみ廃棄
      let bits = worn(cid);
      if (bits & 8) {
        bits -= 8;
      }
      if (bits & 16) {
        bits -= 16;
      }
      set_worn(cid, bits);
    }
    set_mask(mask() - 8); // :321
  } else if (
    main_type(cid) !== 0 &&
    (mask() & 4) !== 0 &&
    (era.get(`cflag:${cid}:46`) || 0) === 0
  ) {
    // :323-349 被拿去洗了
    let line = `（${name}穿过的${clothtype_main2_text(cid)}`;
    if (main_type(cid) >= 1 && main_type(cid) <= 100) {
      line += '的裙子'; // :326-327
    } else if (main_type(cid) <= 200) {
      line += '的下身'; // :328-329
    }
    era.print(`${line}被拿去洗了）`);
    await era.waitAnyKey();
    if (main_type(cid) >= 201) {
      // :332-340 全身衣装は上下とも洗濯
      era.set(`cflag:${cid}:45`, 3);
      era.set(`cflag:${cid}:46`, 3);
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
      era.set(`cflag:${cid}:46`, 3); // :342
      let bits = worn(cid);
      if (bits & 8) {
        bits -= 8;
      }
      if (bits & 16) {
        bits -= 16;
      }
      set_worn(cid, bits);
    }
    set_mask(mask() - 4); // :348
  }

  // —— :352-366 パンツ ——
  if ((mask() & 2) !== 0) {
    // :353 内衣被拿去扔掉了
    era.print(`（${name}的内衣被拿去扔掉了）`);
    await era.waitAnyKey();
    era.set(`cflag:${cid}:43`, -2); // :354
    if (worn(cid) & 1) {
      set_worn(cid, worn(cid) - 1); // :355-356
    }
    set_mask(mask() - 2); // :357
  } else if ((mask() & 1) !== 0 && (era.get(`cflag:${cid}:43`) || 0) === 0) {
    // :359-365 内衣被拿去洗了
    era.print(`（${name}的内衣被拿去洗了）`);
    await era.waitAnyKey();
    era.set(`cflag:${cid}:43`, 2); // :361
    if (worn(cid) & 1) {
      set_worn(cid, worn(cid) - 1); // :362-363
    }
    set_mask(mask() - 1); // :364
  }

  // —— :369-381 上下ともダメになった衣装は削除 ——
  if (main_type(cid)) {
    // :370-371 上着上（45）も下（46）も不可 → 类型消除
    if (
      (era.get(`cflag:${cid}:45`) || 0) < 0 &&
      (era.get(`cflag:${cid}:46`) || 0) < 0
    ) {
      era.set(`cflag:${cid}:41`, 0);
    }
    // :373-374 ふんどし用処理（192 は下が無ければ成立しない）
    if (main_type(cid) === 192 && (era.get(`cflag:${cid}:46`) || 0) < 0) {
      era.set(`cflag:${cid}:41`, 0);
    }
    // :376-377 外衣脱掉了（41 == 0）、但还穿着内衣（40 & 3）→ 类型 1
    if (main_type(cid) === 0 && (worn(cid) & 3) !== 0) {
      era.set(`cflag:${cid}:41`, 1);
    }
  } else if (
    (main_type(cid) === 1 || main_type(cid) === -1) &&
    (worn(cid) & 3) === 0
  ) {
    // :379-380 内衣也被脱掉了 → 类型 0
    era.set(`cflag:${cid}:41`, 0);
  }

  // —— :383-386 ダメになった特別コスは削除 ——
  if (special_type(cid)) {
    if ((era.get(`cflag:${cid}:47`) || 0) < 0) {
      chara(cid).chara.特别服装类型 = 0; // :385
    }
  }

  return 1;
}

/**
 * @RE_CLOTHED（:393-405）：衣類の再着衣。顺从（ABL:10）＋露出癖（ABL:17）
 * 3 以上则维持被脱掉的状态；否则把能穿的全部穿回。
 * @param {number} cid 角色 ID
 * @returns {Promise<number>} 原作 RETURN 1
 */
async function re_clothed(cid) {
  const obedience = era.get(`abl:${cid}:10`) || 0; // ABL:10 顺从
  const exposure = era.get(`abl:${cid}:17`) || 0; // ABL:17 露出癖
  if (obedience + exposure < 3) {
    const before = worn(cid);
    wearing_cloth_able(cid);
    if (worn(cid) > before) {
      // :400 PRINTFORML + :401 WAIT
      era.print(`（${chara_callname(cid)}把被脱掉的衣服又穿上了）`);
      await era.waitAnyKey();
    }
  }
  return 1;
}

/**
 * 失禁弄脏的下装句（:473-480 与 :508-515 共用形状：弄脏物名与收行命令
 * 不同——NO1 用 PRINTFORML、NO2 用 PRINTL，串内容一致由调用方拼）。
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
 * @SOILING_CLOTH_NO1（:459-488）：調教中のおもらし処理（小）。着衣設定
 * でなければ何もしない。
 * @param {number} cid 角色 ID
 * @param {object} [opts]
 * @param {boolean} [opts.in_train] 调教内调用（缺省 true：置位落
 *   TFLAG:45）。调教外（尿床链）传 false——文件头「TFLAG:45 的调教外
 *   通道」节。
 * @returns {Promise<number>} 置位后的掩码（原作 RETURN 0/1 的补强返回，
 *   调教外调用方把它传给 aftertrain_cloth）
 */
async function soiling_cloth_no1(cid, { in_train = true } = {}) {
  // :461-462 着衣設定でなければそのまま終了
  if ((era.get('flag:37') || 0) === 0) {
    return 0;
  }
  let mask = in_train ? era.get('tflag:45') || 0 : 0;

  // :465-471 着衣中に放尿：特别服装（≤50 的着装型或 69 尿布）暂时不可用
  if (
    (worn(cid) & 64) !== 0 &&
    (special_type(cid) <= 50 || special_type(cid) === 69)
  ) {
    era.print(
      `《${chara_callname(cid)}的${get_clothtype_special(cid)}沾满了尿》`,
    ); // :466 PRINTFORML
    mask = or_tflag45(mask, 16, in_train);
    // :469-470 オムツ着用中なら他の衣類は無事
    if (special_type(cid) === 69) {
      return mask;
    }
  }
  // :472-482 下装
  if ((worn(cid) & 8) !== 0 || (worn(cid) & 16) !== 0) {
    era.print(`${soiled_lower_prefix(cid)}沾满了尿》`); // :480 PRINTFORML
    mask = or_tflag45(mask, 4, in_train);
  }
  // :483-486 内裤
  if (worn(cid) & 1) {
    era.print(`《${chara_callname(cid)}的内衣沾满了尿》`); // :484
    mask = or_tflag45(mask, 1, in_train);
  }
  return mask;
}

/**
 * @SOILING_CLOTH_NO2（:493-525）：調教中のおもらし処理（大）——脱糞，
 * 弄脏的衣物直接进废弃处理。
 * @param {number} cid 角色 ID
 * @param {object} [opts] 同 soiling_cloth_no1
 * @returns {Promise<number>} 置位后的掩码
 */
async function soiling_cloth_no2(cid, { in_train = true } = {}) {
  // :495-496 着衣設定でなければそのまま終了
  if ((era.get('flag:37') || 0) === 0) {
    return 0;
  }
  let mask = in_train ? era.get('tflag:45') || 0 : 0;

  // :499-506 特别服装：洗濯 + 処分双位置位
  if (
    (worn(cid) & 64) !== 0 &&
    (special_type(cid) <= 50 || special_type(cid) === 69)
  ) {
    era.print(
      `《${chara_callname(cid)}的${get_clothtype_special(cid)}沾满了污物`,
    ); // :500 PRINTFORML（原文缺右书名号，1:1）
    mask = or_tflag45(mask, 16, in_train);
    mask = or_tflag45(mask, 32, in_train);
    // :504-505 オムツ着用中なら他の衣類は無事
    if (special_type(cid) === 69) {
      return mask;
    }
  }
  // :507-518 下装：洗濯 + 処分
  if ((worn(cid) & 8) !== 0 || (worn(cid) & 16) !== 0) {
    era.print(`${soiled_lower_prefix(cid)}沾满了污物》`); // :515 PRINTL
    mask = or_tflag45(mask, 4, in_train);
    mask = or_tflag45(mask, 8, in_train);
  }
  // :519-523 内裤
  if (worn(cid) & 1) {
    era.print(`《${chara_callname(cid)}的内衣沾满了污物》`); // :520
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
