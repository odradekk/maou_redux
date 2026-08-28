/**
 * @file 队伍编组（issue #172，阶段 3 H3）：迷宫勇者队伍的结成 / 加入 /
 *     离队 / 除名。
 *
 * 源: target/ERB/迷宮/DUNGEON_PARTY.ERB  @PARTY_UNITE（:5-83）、
 *       @PARTY_JOIN（:86-176）、@SEARCH_FREE（:179-223）、@PARTY_DEL
 *       （:226-297）、@PARTY_CHAR_DEL（:300-326）
 *
 * 队伍数据全在 CFLAG 530-533（まとめ :421-425「パーティー関連」）：
 * 530 行動終了フラグ（行动完了，同伴以此追随队长）、531 仲間A、532 仲間B、
 * 533 リーダー記憶（队长记忆）——属主 dungeon，本文件域内裸寻址即合法
 * （#70）。
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - **SAVESTR 无引擎通道**（#171 用引擎实测钉下，钉子在
 *     test/static-table-coverage.test.js 的「savestr 族不存在」用例）：三段
 *     寻址 `savestr:0:1` 连 era.error 都不给、完全静默丢弃，照抄的后果是
 *     全部演出文本空白。名字承载一律走 `callname:${id}:-1`（#5 决议）；
 *   - 原作 `FOR CHARID, 0, CHARANUM` 按注册序号迭代，ere 扁平化（#21）
 *     下角色号 = 预设号，迭代改 `era.getAddedCharacters()`（键升序，夹具
 *     与引擎同序）；从 1 起的循环以 `charid === 0` 跳过魔王等价；
 *   - **@PARTY_CHAR_DEL 的重排段不移植**（:312-324）：原作 DELCHARA 后
 *     注册号整体前移，531/532/533 里大于被删号的引用要跟着 -1；ere 的
 *     角色号是预设号、removeCharacter 后**不重排**（#21），照抄重排会把
 *     活引用改写成不存在的号——按死代码处理，注释保留原文说明；
 *   - PARTY_DEL 对 CFLAG:601（结婚对象，属主 chara）的清零经门面
 *     chara(cid).chara.结婚对象（#172 补名），SEARCH_FAMILY 存根恒返 0
 *     下该写不可达、结构 1:1 保留；
 *   - 原作 PRINTFORMW 一行 + 读键，ere 侧 era.print + era.waitAnyKey
 *     （引擎 print 每调用一行，同一显示行的拼接归并为一次 print）；
 *   - `SIF CFLAG:CHARID:533 == 0 && CHARID == NEW` 的「自己成为队长」与
 *     FINALIZE 段的补设定是两处不同的演出（后者为潜入奴隶号更小时
 *     SEARCH_FREE 条件失效的补丁，:164-165 注释），逐字分开保留。
 */

const era = require('#/era-electron');
const { chara } = require('#/facade/chara');
const { stub_line } = require('#/utils/stub-line');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。
 */
const STUBBED_CALLS = ['SEARCH_FAMILY'];

/** 原作 CHARANUM 的等价物（在场角色数） */
function charanum() {
  return era.getAddedCharacters().length;
}

/**
 * @SEARCH_FAMILY（キャラ関数/CHAR_ST.ERB 家族系；PARTY_DEL :291 的调用点）
 * 的存根：按关系检索家族成员。恒返回 0（未找到）——PARTY_DEL 的结婚对象
 * 清零（:293）随之不可达，结构 1:1 保留。存根不消费参数（先例
 * medal_bonus()），调用点保持 1:1 传参。
 * @param {number} cid 角色
 * @param {string} kind 关系种类（原作字符串实参，如 "MARRIAGE"）
 * @returns {number} 原作 RETURN：0 = 未找到
 */
function search_family() {
  stub_line('SEARCH_FAMILY', '家族检索', '随家族票');
  return 0;
}

/**
 * @PARTY_UNITE（:5-83）：队伍编成的初期准备（每日回合结算先调）。
 *
 * 先把全角色的行动完了标志清零；再核对每个成员的仲間A/B 引用——越界
 * （>= CHARANUM）或指向已行动完的角色则解除，指向正确队长的置行动完了
 * （此后该角色在 @DUNGEON 里作为同伴追随队长行动），指定错乱则整套复位。
 *
 * @returns {void} 原作 RETURN 0
 */
function party_unite() {
  // :15-17 まず行動終了フラグOFF（全角色）
  for (const charid of era.getAddedCharacters()) {
    // CFLAG:530 = 0（行动完了复位）
    era.set(`cflag:${charid}:530`, 0);
  }

  // :23-79 次に、リーダー以外のキャラを行動終了にしていく——仲間A/B 两段
  // 同构（:25-50 / :53-78），slot 即 531/532
  for (const charid of era.getAddedCharacters()) {
    for (const slot of [531, 532]) {
      const rest = era.get(`cflag:${charid}:${slot}`) || 0; // RESTCHAR = 仲間勇者控え
      if (rest >= charanum()) {
        // 仲間指定を外しておく（越界引用）
        era.set(`cflag:${charid}:${slot}`, 0);
      } else if (rest > 0 && (era.get(`cflag:${rest}:530`) || 0) === 1) {
        // 仲間のはずなのにすでに他の誰かの仲間になっている → 解除
        era.set(`cflag:${charid}:${slot}`, 0);
      } else if (rest > 0) {
        // リーダー指定を返しているか見る（CFLAG:533 队长记忆）
        const leader = era.get(`cflag:${rest}:533`) || 0;
        if (leader === charid) {
          // 合っていたら行動終了になる（同伴以行动完了追随队长）
          era.set(`cflag:${rest}:530`, 1);
        } else {
          // 変な指定——バグの元なので初期化して戻す
          era.set(`cflag:${charid}:${slot}`, 0);
          era.set(`cflag:${rest}:530`, 0);
          era.set(`cflag:${rest}:531`, 0);
          era.set(`cflag:${rest}:532`, 0);
          era.set(`cflag:${rest}:533`, 0);
        }
      }
    }
  }
  // :81 行動終了していないキャラはリーダーとなり、移動等を受け持つ
}

/**
 * @SEARCH_FREE（:179-223）：按阶层找同行的自由勇者。
 *
 * 条件：非行动完了、与搜索者同阶层（CFLAG:501）、非狂王独行（CFLAG:800
 * == 4）、自己没有同伴（531/532 均空）、且状态与搜索者同型（CFLAG:1 相等
 * ——同为侵攻 2 或同为迎击 3）；迎击中的潜入工作奴隶（CFLAG:1 == 3 且
 * CFLAG:500 == 4）额外可入队（忍び寄る潜入工作の魔の手）。
 * @param {number} floor 阶层（ARG:0）
 * @param {number} caller 搜索者角色号（ARG:1，状态基准）
 * @returns {number} 原作 RETURN：可入队的角色号；0 = 未找到
 */
function search_free(floor, caller) {
  const type = era.get(`cflag:${caller}:1`) || 0; // TYPE = 搜索者的行动状态
  for (const charid of era.getAddedCharacters()) {
    if (charid === 0) {
      continue; // FOR CHARID, 1, CHARANUM——跳过魔王
    }
    // 行動完了（仲間済み）を除く
    if ((era.get(`cflag:${charid}:530`) || 0) === 1) {
      continue;
    }
    // 同階層以外を除く（CFLAG:501 侵攻阶层）
    if (floor !== (era.get(`cflag:${charid}:501`) || 0)) {
      continue;
    }
    // 狂王独行（CFLAG:800 == 4）
    if ((era.get(`cflag:${charid}:800`) || 0) === 4) {
      continue;
    }
    // 仲間A/B を見る——已有同伴的不入队
    if ((era.get(`cflag:${charid}:531`) || 0) > 0) {
      continue;
    }
    if ((era.get(`cflag:${charid}:532`) || 0) > 0) {
      continue;
    }
    // そもそも侵攻中？（与搜索者同状态）
    if ((era.get(`cflag:${charid}:1`) || 0) === type) {
      return charid;
    }
    if (
      (era.get(`cflag:${charid}:1`) || 0) === 3 &&
      (era.get(`cflag:${charid}:500`) || 0) === 4
    ) {
      // 忍び寄る潜入工作の魔の手
      return charid;
    }
  }
  // お探しの勇者はいませんでした
  return 0;
}

/**
 * @PARTY_JOIN 的单枠劝诱（:115-137 仲間A / :139-161 仲間B 的同构段）。
 * 找到人则填枠、置行动完了与队长记忆并播报；找不到返回 false（原作
 * GOTO FINALIZE——跳过仲間B 直落循环尾的 FINALIZE 段）。
 * @param {number} charid 劝诱者（队长候选）
 * @param {number} slot 枠位（531 仲間A / 532 仲間B）
 * @param {number} floor 阶层
 * @returns {Promise<boolean>} true = 已入队
 */
async function try_join_slot(charid, slot, floor) {
  if ((era.get(`cflag:${charid}:${slot}`) || 0) !== 0) {
    return true; // 枠非空，无事可做（原作 IF RESTCHAR == 0 才进）
  }
  // フリーの勇者を勧誘する
  const new_member = search_free(floor, charid);
  if (new_member === 0) {
    return false; // SIF RESULT == 0 → GOTO FINALIZE
  }
  if ((era.get(`cflag:${charid}:533`) || 0) === 0 && charid === new_member) {
    // 自己填进空枠且尚无队长记忆 → 成为队长（:126-127）
    const name = era.get(`callname:${charid}:-1`) ?? '';
    era.print(`${name}成为队伍的队长了！`);
    await era.waitAnyKey();
  }
  // 枠に入れて、行動完了と、リーダー記憶と、初期化を行う（:129-134）
  era.set(`cflag:${charid}:${slot}`, new_member);
  era.set(`cflag:${new_member}:530`, 1);
  era.set(`cflag:${new_member}:531`, 0);
  era.set(`cflag:${new_member}:532`, 0);
  era.set(`cflag:${new_member}:533`, charid);
  if (charid !== new_member) {
    const leader_name = era.get(`callname:${charid}:-1`) ?? '';
    const member_name = era.get(`callname:${new_member}:-1`) ?? '';
    era.print(`${member_name}加入了${leader_name}的队伍！`);
    await era.waitAnyKey();
  }
  return true;
}

/**
 * @PARTY_JOIN（:86-176）：队伍加入处理（每日回合结算末调）。
 *
 * 行动完了初始化（@PARTY_UNITE）后，每个未行动完了的侵攻中角色
 * （CFLAG:1 == 2 或 12，狂王独行除外）按阶层劝诱自由勇者填仲間A/B。
 *
 * @returns {Promise<void>} 原作 RETURN 0
 */
async function party_join() {
  // :98 行動完了初期化
  party_unite();

  for (const charid of era.getAddedCharacters()) {
    // 行動完了を除く
    if ((era.get(`cflag:${charid}:530`) || 0) === 1) {
      continue;
    }
    // 侵攻中以外を除く
    const place = era.get(`cflag:${charid}:1`) || 0;
    if (place !== 2 && place !== 12) {
      continue;
    }
    // 狂王独行（CFLAG:800 == 4）
    if ((era.get(`cflag:${charid}:800`) || 0) === 4) {
      continue;
    }
    // 階層（CFLAG:501 侵攻阶层）
    const floor = era.get(`cflag:${charid}:501`) || 0;

    // 仲間A → 仲間B；A 找不到人即 GOTO FINALIZE（跳过 B）
    const joined_a = await try_join_slot(charid, 531, floor);
    if (joined_a) {
      await try_join_slot(charid, 532, floor);
    }

    // $FINALIZE（:163-169）——潜入奴隷のキャラ番号が CHARID より若い場合、
    // 自分をメンバー登録する前に SEARCH_FREE の条件から外れてしまうため
    // 改めてここで自分をリーダーとして設定する
    if (
      (era.get(`cflag:${charid}:533`) || 0) === 0 &&
      (era.get(`cflag:${charid}:531`) || 0) !== 0
    ) {
      const name = era.get(`callname:${charid}:-1`) ?? '';
      era.print(`${name}成为队伍的队长了！`);
      await era.waitAnyKey();
      era.set(`cflag:${charid}:533`, charid);
    }
  }
}

/**
 * @PARTY_DEL（:226-297）：队伍离队处理。
 *
 * 队长离队 = 解散（队长与两名同伴的队伍数据全套复位、回到未行动状态）；
 * 同伴离队 = 该枠与同伴自己的记忆复位。对不上号时按解散处理（バグ対策，
 * :274-275）。末尾按结婚对象编号（CFLAG:601 尾数 9）清除对象的婚姻登记。
 *
 * @param {number} cid 离队角色（ARG:0）
 * @returns {void} 原作 RETURN 0
 */
function party_del(cid) {
  const leader = era.get(`cflag:${cid}:533`) || 0; // LEADER = リーダー
  const rest_a = era.get(`cflag:${leader}:531`) || 0; // 仲間A
  const rest_b = era.get(`cflag:${leader}:532`) || 0; // 仲間B

  if (cid === leader) {
    // 脱退キャラがリーダーの場合：パーティ解散
    era.set(`cflag:${leader}:530`, 0);
    era.set(`cflag:${leader}:531`, 0);
    era.set(`cflag:${leader}:532`, 0);
    era.set(`cflag:${leader}:533`, 0);
    era.set(`cflag:${rest_a}:530`, 0);
    era.set(`cflag:${rest_a}:533`, 0);
    era.set(`cflag:${rest_b}:530`, 0);
    era.set(`cflag:${rest_b}:533`, 0);
  } else if (cid === rest_a) {
    // 脱退キャラがLEADERの仲間Aだった場合
    era.set(`cflag:${leader}:531`, 0);
    era.set(`cflag:${rest_a}:530`, 0);
    era.set(`cflag:${rest_a}:533`, 0);
  } else if (cid === rest_b) {
    // 脱退キャラがLEADERの仲間Bだった場合
    era.set(`cflag:${leader}:532`, 0);
    era.set(`cflag:${rest_b}:530`, 0);
    era.set(`cflag:${rest_b}:533`, 0);
  } else {
    // バグ対策、パーティ解散と同じ（:277-284）
    era.set(`cflag:${leader}:530`, 0);
    era.set(`cflag:${leader}:531`, 0);
    era.set(`cflag:${leader}:532`, 0);
    era.set(`cflag:${leader}:533`, 0);
    era.set(`cflag:${rest_a}:530`, 0);
    era.set(`cflag:${rest_a}:533`, 0);
    era.set(`cflag:${rest_b}:530`, 0);
    era.set(`cflag:${rest_b}:533`, 0);
  }

  // 结婚对象编号清除（:287-294）：尾数 9（对象是勇者编号段）时经
  // SEARCH_FAMILY 找到对方清掉登记——存根恒 0 下不可达，1:1 保留
  let marriage = era.get(`cflag:${cid}:601`) || 0;
  marriage %= 10;
  if (marriage === 9) {
    const partner = search_family(cid, 'MARRIAGE');
    if (partner > 0) {
      chara(partner).chara.结婚对象 = 0; // CFLAG:RESULT:601 = 0
    }
  }
}

/**
 * @PARTY_CHAR_DEL（:300-326）：角色除名时的队伍数据处理。
 *
 * 先走 @PARTY_DEL 解除本人的队伍关系，再修正残余引用。原作 :312-324 的
 * 重排循环（531/532/533 大于被删号者 -1）依赖 DELCHARA 后注册号前移，
 * **ere 扁平化（#21）下角色号 = 预设号、removeCharacter 不重排**，照抄会
 * 把活引用改写成不存在的号——按死代码不移植（文件头）。
 *
 * @param {number} cid 被除名角色（ARG:0）
 * @returns {void} 原作 RETURN 0
 */
function party_char_del(cid) {
  party_del(cid);
  // :312-324 注册号重排段：#21 扁平化下无对应语义，不移植（文件头）
}

module.exports = {
  STUBBED_CALLS,
  charanum,
  party_unite,
  party_join,
  search_free,
  party_del,
  party_char_del,
};
