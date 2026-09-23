/**
 * @file 调教后自主行为检查（EVENT_AFTERTRAIN.ERB 移植）。
 *
 * 源: target/ERB/EVENT/EVENT_AFTERTRAIN.ERB
 *     @CHARADEAD_CHECK（:6-92，#548/S7 起真身）
 *     @SELF_CHECK（:100-128）
 *     @AFTERTRAIN_SEX_CHECK（:140-250）
 *     @AFTERTRAIN_ANALSEX_CHECK（:255-349）
 *     @AFTERTRAIN_LESBIANSEX_CHECK（:354-546）
 *     @AFTERTRAIN_MASTURBATION_CHECK（:551-703）
 *     @AFTERTRAIN_BEASTSEX_CHECK（:708-842）
 *
 * 原作缺陷 1:1 照抄（#14 / #270）：兽奸报告分支源 :837 `JUEL:8 += A*200`
 * 而打印用 `B*200`。本模块用 leftover_a 只建模同模块内自慰→兽奸那一跳，
 * 跨模块残留不建模。
 *
 * 移植说明（有意偏离）：
 *   - **@CHARADEAD_CHECK 的 `BASE:0 = -1`（:76）落到 0**：引擎自动钳制 base
 *     （小于 0 时重置为 0，大于 maxbase 时重置为 maxbase——
 *     `dev-guides/09-static.md:203`），ere 侧写不进 -1。**后果不是「等价」**：
 *     魔王死亡且有继任者时，旧魔王的身体留在场上，原作
 *     `CHARA_INFO_SHOW ver1.1.2.ERB:1159-1160` 对 `BASE:0 < 0` 显示
 *     ★死亡★，ere 只能落到「体力 0」那一档的 ★濒死★。后续判死全部走
 *     `< 1`（:357 / :364 / :376 的判据），所以除显示档位外的行为不受影响。
 *     写入仍照原作写 -1（意图 1:1），钳制是引擎的行为。
 *   - 原作 `#DIM TEMP` / `TEMPMAOU` 是死变量（#14 登记）：:68-73 的
 *     `IF !TEMP || ...` 恒走第一支，`ELSEIF` 的叙事与 `%SAVESTR:TEMP%`
 *     不可达，不构造。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
// @MAOU_KOUHO 的真身（EVENT_NEXTDAY.ERB:2430-2451）——原作另一处调用点正是
// 本文件的 @CHARADEAD_CHECK（:33），ere 侧此前只有 @EVENTEND 的魔王倒下分支
// 引用它
const { maou_kouho } = require('#/event/event-nextday');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { self_kojo } = require('#/kojo/kojo-system');
const { self_call } = require('#/kojo/kojo-text');
const { chara_callname } = require('#/utils/callname-utils');

/**
 * 原作 A 是跨函数全局（技能指南 glossary.md:151）。本项目只建模同模块内
 * 的那一跳：aftertrain_masturbation_check 写、aftertrain_beastsex_check 读。
 * 跨模块残留不建模（已知偏差，#14 / #270）。兽奸报告分支源 :837 写
 * `JUEL:8 += A*200` 而打印用 `B*200`——原作缺陷，1:1 照抄。
 */
let leftover_a = 0;
/**
 * 原作 Q 是跨函数全局。AFTERTRAIN 自慰检查写，SELF_KOJO（K2 等）读
 * （调教后自慰口上里 Q == 1 助手 / Q == 2 野狗）。
 */
let leftover_q = 0;
/**
 * 原作 S 是跨函数全局。AFTERTRAIN 性交检查写次数，SELF_KOJO 的
 * 调教后性交支读 `s`（K5 :6223 源文就是小写 s；K6 的 SELF_KOJO 同读）。
 */
let leftover_s = 0;
/**
 * 原作 S 在出售链是卖出价。SELL_CHARA 写完再 CALL SELF_KOJO。
 */
let leftover_sale = 0;

/**
 * SELF_KOJO 读的原作 Q（AFTERTRAIN 自慰检查的妄想对象：0 主人 / 1 助手 / 2 野狗）。
 * @returns {number}
 */
function peek_aftertrain_q() {
  return leftover_q;
}

/**
 * SELF_KOJO 读的原作性交次数 S（K5 源文 :6223 写作小写 s）。
 * @returns {number}
 */
function peek_aftertrain_s() {
  return leftover_s;
}

/**
 * SELF_KOJO 出售支读的原作卖出价 S（K5 :6250 注释「Sは売却値」）。
 * @returns {number}
 */
function peek_sale_price() {
  return leftover_sale;
}

/**
 * 写入出售口上要读的卖出价（原作 SELL_CHARA 的 S）。
 * @param {number} v
 */
function remember_sale_price(v) {
  leftover_sale = v;
}

/**
 * AFTERTRAIN 性交检查未跑时，测试写入性交回数（原作 S / K5 源文 s）。
 * @param {number} v
 */
function remember_aftertrain_s(v) {
  leftover_s = v;
}

/**
 * 获取角色称呼（SAVESTR / CALLNAME）
 * @param {number} cid
 * @returns {string}
 */
function chara_name(cid) {
  return chara_callname(cid);
}

/** 原作 GETCHARA(n) 的等价物：在场返回角色号（= cid，#21 扁平化），不在场 -1 */
function get_chara(no) {
  return era.getAddedCharacters().includes(no) ? no : -1;
}

/**
 * @CHARADEAD_CHECK（:6-92）：调教后死亡检查（@EVENTEND :339 的 CALL）。
 *
 * RESULT：0 = 存活（或濒死自动结束）；1 = 目标已死（调用方跳过 SELF_CHECK，
 * 死亡删除分支接管）。原作尾行 `RETURN 1, TEMP` 的第二个返回值全库无读者
 * （TEMP 是 #DIM 死变量），ere 侧只回 RESULT。
 *
 * 原作缺陷 1:1 保留（#14 登记）：`#DIM TEMP = 0` / `#DIM TEMPMAOU = 0`
 * 之后两者从未被赋值——:68-73 的 `IF !TEMP || ...` 恒走第一支
 * 「%SAVESTR:TARGET%死掉了……」，ELSEIF 的「身体死掉了/苏醒了」叙事与
 * %SAVESTR:TEMP% 不可达，不构造（#405 可证死代码同款）。TEMPMAOU 同为
 * 死变量。
 *
 * BASE:0 = -1 的写：引擎自动把 base 钳到 0~maxbase（`dev-guides/09-static.md:203`
 * ——小于 0 重置为 0），写入落盘即 0。**这不是等价替换**：原作
 * `CHARA_INFO_SHOW ver1.1.2.ERB:1159-1160` 对 `BASE:0 < 0` 显示 ★死亡★，
 * ere 只剩 ★濒死★（文件头「移植说明」有完整说明）。判死判据全走 `< 1`，
 * 除显示档位外的行为不受影响；写入仍照原作写 -1。
 *
 * @returns {Promise<number>} 原作 RESULT（QUIT 路径 throw，不返回）
 */
async function charadead_check() {
  const target = era_flag.target;
  // :11-13 菲娅线推进（EX_FLAG:2807 落在 160-169 段且调教对象是菲娅 → 170）
  const route = era_exflag.route_35;
  if (route >= 160 && route < 170 && target === get_chara(35)) {
    era_exflag.route_35 = 170;
  }

  // :16-17 生きてるなら問題ナシ（BASE:0 = 目标的体力）
  if ((era.get(`base:${target}:0`) || 0) > 0) {
    return 0;
  }

  // :19-24 瀕死時に調教を自動終了（FLAG:35 = 濒死自动结束开关，
  // event-comend.js 同一变量）：体力钳到 1 后按存活返回
  if (era.get('flag:35')) {
    if ((era.get(`base:${target}:0`) || 0) < 1) {
      chara(target).dungeon.体力 = 1;
    }
    return 0;
  }

  // :26-61 mowangsiwang（TARGET == 0 = 魔王自己倒下）
  if (target === 0) {
    if (!era_exflag.next_maou) {
      // :28-31 无继任（EX_FLAG:3 = 0）：GAMEOVER + INPUT + QUIT。QUIT 是
      // throw 型（#148）：之后的死亡口上/死亡旗整段不可达
      era.print(
        '-------------------------------GAMEOVER---------------------------------',
      );
      await era.input();
      era.quit();
    } else {
      // :33 继任候补的确定（净效果 = 最后一个持 EX_TALENT:3 的角色，
      // event-nextday.js 的 JSDoc 有证明）
      maou_kouho();
      era.print(
        '-------------------------------GAMEOVER---------------------------------',
      );
      era.print(
        '------------------------------------------------------------------------',
      );
      await era.waitAnyKey(); // PRINTW
      era.print(
        '------------------------------------------------------------------------',
      );
      await era.waitAnyKey();
      era.print(
        '------------------------------------------------------------------------',
      );
      await era.waitAnyKey();
      era.print(
        '-------------------------------@@@@@@@@---------------------------------',
      );
      await era.waitAnyKey();
      const successor = era_exflag.next_maou;
      const successor_name = chara_name(successor);
      // :39-58 四分支叙事（SAVESTR → callname 承载，#5 决议）
      if (
        successor !== get_chara(17) &&
        (successor === era_flag.player || successor === era_flag.assi)
      ) {
        // 分支一：候补是调教者或助手（旁观的旧身体）
        era.print('你猛的醒了过来、看见了倒在了自己身旁的原本属于自己的身体');
        await era.waitAnyKey();
        era.print('你似乎明白了什么……');
        await era.waitAnyKey();
        era.print(`从一旁的巨大镜子中映出的是${successor_name}的身影……`);
        await era.waitAnyKey();
        era.print(`「果然…${self_call(successor)}……死了呢」`);
        await era.waitAnyKey();
      } else if (
        successor !== get_chara(17) &&
        successor !== era_flag.player &&
        successor !== era_flag.assi
      ) {
        // 分支二：候补另有其人（似曾相识的房间）
        era.print('你猛的醒了过来、看着这似曾相识的房间……');
        await era.waitAnyKey();
        era.print('你似乎明白了什么……');
        await era.waitAnyKey();
        era.print(`从一旁的镜子中映出的是${successor_name}的身影……`);
        await era.waitAnyKey();
        era.print(`「果然…${self_call(successor)}……死了呢」`);
        await era.waitAnyKey();
      } else if (
        successor === get_chara(17) &&
        (successor === era_flag.player || successor === era_flag.assi)
      ) {
        // 分支三：候补是 17 号且在身旁
        era.print(`${successor_name}看着倒在眼前的东西……`);
        await era.waitAnyKey();
        era.print('心中有些怅然若失……');
        await era.waitAnyKey();
        era.print(
          `但很快、${successor_name}似乎感受到了什么似的、眼中闪过了一丝光芒`,
        );
        await era.waitAnyKey();
        era.print(`==============${successor_name}成为魔王了==============`);
        await era.waitAnyKey();
      } else if (
        successor === get_chara(17) &&
        (successor !== era_flag.player || successor !== era_flag.assi)
      ) {
        // 分支四：候补是 17 号且不在身旁（条件的 || 形态照抄——17 号已在前
        // 一支被 (==PLAYER || ==ASSI) 挡过，这里的 OR 与 AND 同效）
        era.print(`${successor_name}突然像丢了魂似的瘫坐在地上……`);
        await era.waitAnyKey();
        era.print(
          `但很快、${successor_name}似乎感受到了什么似的、眼中闪过了一丝光芒`,
        );
        await era.waitAnyKey();
        era.print(`==============${successor_name}成为魔王了==============`);
        await era.waitAnyKey();
      }
    }
  }

  // :63-67 死亡時口上（TFLAG:13 = 999 的事件码；@EVENTEND 尚在调教期，
  // tflag 表开着——self_check 的同款调法）
  game.train.初吻与自我口上 = 999;
  await self_kojo();
  era.drawLine();
  era.println(); // PRINTL（空行）
  // :68-75 TEMP 恒 0 → 恒走第一支（ELSEIF 不可达，见 JSDoc）
  era.print(`${chara_name(target)}死掉了……`);
  era.println();
  era.drawLine();
  // :76 BASE:0 = -1（意图 1:1；引擎把 base 钳到 0，★死亡★ 显示不出来——
  // 见文件头「移植说明」的这处偏离）
  chara(target).dungeon.体力 = -1;

  // :78-80 死亡フラグを残す：FLAG:(NO+999) = -2（与 @EVENTEND 死亡删除
  // 分支的 FLAG:(NO+199) = 1 是两段不同的旗）
  // FLAGNAME:(TARGET+999) = 死亡旗（-2 = 已死）
  era.set(`flag:${target + 999}`, -2);

  // :82-83 キャラの殺害回数に加算
  game.event.杀死人数 += 1;

  // :86-90 殺した人数が3人以上で、【威圧感】が付く（TALENT:93）
  if (game.event.杀死人数 >= 3 && !era.get('talent:0:93')) {
    era.print(`${chara_name(0)}掌握了【${era.get('talentname:93') ?? ''}】。`);
    await era.waitAnyKey(); // PRINTFORMW 的读键
    era.set('talent:0:93', 1);
  }

  return 1; // :92 RETURN 1, TEMP（TEMP 无读者，见 JSDoc）
}

/**
 * @AFTERTRAIN_SEX_CHECK（:140-250）：调教后通常性交检查
 * @returns {Promise<number>} 执行回数或 0
 */
async function aftertrain_sex_check() {
  leftover_s = 0;
  const target = era_flag.target;
  if (target < 0) return 0;
  if (era.get(`talent:${target}:135`)) return 0; // 未成熟
  if (!era.get(`talent:${target}:85`) && !era.get(`talent:${target}:76`))
    return 0; // 爱慕 / 淫乱
  if ((era.get(`exp:${target}:5`) || 0) < 30) return 0; // 性交经验 >= 30
  if (era.get(`talent:${target}:0`) || era.get(`talent:${target}:122`))
    return 0; // 处女 / 男性

  // 贞操带 / 贞操封印
  if (
    (era.get(`cflag:${target}:42`) || 0) === 79 &&
    (era.get(`cflag:${target}:40`) || 0) & 64
  ) {
    return 0;
  }
  if (era.get(`cflag:${target}:273`)) return 0;

  // 主人为男性或扶她
  if (!era.get('talent:0:122') && !era.get('talent:0:121')) return 0;
  if ((era.get(`base:${target}:0`) || 0) < 500) return 0; // 濒死

  let s = 0;
  const abl2 = era.get(`abl:${target}:2`) || 0; // V感觉
  if (abl2 === 4) s += 1;
  else if (abl2 === 5) s += 2;
  else if (abl2 >= 6) s += 3;

  const abl30 = era.get(`abl:${target}:30`) || 0; // 性交中毒
  if (abl30 > 0) s += Math.floor(abl30 / 2) + 1;

  if (s <= 0) return 0;

  const abl11 = era.get(`abl:${target}:11`) || 0; // 欲望
  const abl16 = era.get(`abl:${target}:16`) || 0; // 侍奉精神
  const palam5 = era.get(`palam:${target}:5`) || 0; // 欲情
  const palamlv3 = 3000;
  const palamlv4 = 10000;

  if (abl11 >= 5 && abl16 >= 5 && palam5 >= palamlv4) s += 2;
  if (abl11 === 4 && abl16 >= 4 && palam5 >= palamlv4) s += 1;
  if (
    abl11 >= 7 &&
    (era.get(`abl:${target}:5`) || 0) >= 6 &&
    palam5 >= palamlv3
  )
    s += 1;
  if (abl11 >= 4 && abl2 >= 3 && palam5 >= palamlv3) s += 1;

  if (era.get(`talent:${target}:85`)) s += 1; // 爱慕
  if (era.get(`talent:${target}:76`)) s += 1; // 淫乱
  if (era.get(`talent:${target}:75`)) s += 2; // 性爱狂

  if (era.get(`talent:${target}:70`))
    s += 1; // 接受快感
  else if (era.get(`talent:${target}:71`)) s -= 2; // 否定快感

  if (s <= 0) return 0;

  const target_name = chara_name(target);
  const master_name = chara_name(0);

  era.drawLine();
  era.print(`${master_name}和${target_name}抑制不住无法冷却的兴奋，`);
  era.print(`回到床上做了${s}次…`);
  era.print('');

  // 源 :231-232：TFLAG:13 = 4; CALL SELF_KOJO（在 PRINTFORML %EXPNAME:0% 之前）
  leftover_s = s;
  game.train.初吻与自我口上 = 4;
  await self_kojo();
  era.print(`V经验＋${s}`);
  era.print(`性交经验＋${s}`);
  era.print(`快V点数＋${s * 200}`);
  era.print(`恭顺点数＋${s * 100}`);
  era.print(`欲情点数＋${s * 250}`);
  await era.waitAnyKey();

  const { chara } = require('#/facade/chara');
  chara(target).dungeon.私处经验 += s;
  chara(target).dungeon.性交经验 += s;
  era.add(`juel:${target}:1`, s * 200);
  era.add(`juel:${target}:4`, s * 100);
  era.add(`juel:${target}:5`, s * 250);

  const abl10 = era.get(`abl:${target}:10`) || 0; // 顺从
  if (abl10 + abl2 + abl16 >= 13) {
    era.print(`${target_name}在依依不舍地拉着${master_name}的袖子，`);
    await era.waitAnyKey();
    era.print(`但${master_name}抖开了那只手，离开房间。`);
    await era.waitAnyKey();
  }

  return 1;
}

/**
 * @AFTERTRAIN_ANALSEX_CHECK（:255-349）：调教后肛门性交检查
 * @returns {Promise<number>}
 */
async function aftertrain_analsex_check() {
  const target = era_flag.target;
  if (target < 0) return 0;
  if (!era.get(`talent:${target}:85`) && !era.get(`talent:${target}:76`))
    return 0;
  if ((era.get(`exp:${target}:5`) || 0) < 30) return 0;
  if (!era.get('talent:0:122') && !era.get('talent:0:121')) return 0;
  if ((era.get(`base:${target}:0`) || 0) < 500) return 0;

  let s = 0;
  const abl3 = era.get(`abl:${target}:3`) || 0; // A感觉
  if (abl3 === 4) s += 1;
  else if (abl3 === 5) s += 2;
  else if (abl3 >= 6) s += 3;

  const abl30 = era.get(`abl:${target}:30`) || 0;
  if (abl30 > 0) s += Math.floor(abl30 / 2) + 1;

  if (s <= 0) return 0;

  const abl11 = era.get(`abl:${target}:11`) || 0;
  const abl16 = era.get(`abl:${target}:16`) || 0;
  const palam5 = era.get(`palam:${target}:5`) || 0;
  const palamlv3 = 3000;
  const palamlv4 = 10000;

  if (abl11 >= 5 && abl16 >= 5 && palam5 >= palamlv4) s += 2;
  if (abl11 === 4 && abl16 >= 4 && palam5 >= palamlv4) s += 1;
  if (
    abl11 >= 7 &&
    (era.get(`abl:${target}:5`) || 0) >= 6 &&
    palam5 >= palamlv3
  )
    s += 1;
  if (
    abl11 >= 4 &&
    (era.get(`abl:${target}:2`) || 0) >= 3 &&
    palam5 >= palamlv3
  )
    s += 1;

  if (era.get(`talent:${target}:85`)) s += 1;
  if (era.get(`talent:${target}:76`)) s += 1;
  if (era.get(`talent:${target}:75`)) s += 2;

  if (era.get(`talent:${target}:70`)) s += 1;
  else if (era.get(`talent:${target}:71`)) s -= 2;

  if (s <= 0) return 0;

  const target_name = chara_name(target);
  const master_name = chara_name(0);

  era.drawLine();
  era.print(`${master_name}和${target_name}抑制不住无法冷却的兴奋，`);
  era.print(`回到床上做了${s}次…`);
  era.print('');

  era.print(`A经验＋${s}`);
  era.print(`性交经验＋${s}`);
  era.print(`快A点数＋${s * 200}`);
  era.print(`恭顺点数＋${s * 100}`);
  era.print(`欲情点数＋${s * 250}`);
  await era.waitAnyKey();

  const { chara } = require('#/facade/chara');
  chara(target).dungeon.肛门经验 += s;
  chara(target).dungeon.性交经验 += s;
  era.add(`juel:${target}:2`, s * 200);
  era.add(`juel:${target}:4`, s * 100);
  era.add(`juel:${target}:5`, s * 250);

  const abl10 = era.get(`abl:${target}:10`) || 0;
  if (abl10 + abl3 + abl16 >= 13) {
    era.print(`${target_name}在依依不舍地拉着${master_name}的袖子，`);
    await era.waitAnyKey();
    era.print(`但${master_name}抖开了那只手，离开房间…`);
    await era.waitAnyKey();
  }

  return 1;
}

/**
 * @AFTERTRAIN_LESBIANSEX_CHECK（:354-546）：百合中毒百合检查
 * @param {number} sex_result 之前的性交返回值 S
 * @returns {Promise<number>}
 */
async function aftertrain_lesbiansex_check(sex_result = 0) {
  const target = era_flag.target;
  const assi = era_flag.assi;
  if (target < 0 || assi < 0) return 0;
  if (era.get(`talent:${target}:122`) || era.get(`talent:${assi}:122`))
    return 0;

  const abl22 = era.get(`abl:${target}:22`) || 0; // 百合气质
  const abl0 = era.get(`abl:${target}:0`) || 0; // C感觉
  const abl10 = era.get(`abl:${target}:10`) || 0; // 顺从
  const abl11 = era.get(`abl:${target}:11`) || 0; // 欲望
  if (abl22 < 2 || abl0 < 3 || abl10 < 2 || abl11 < 2) return 0;

  const target_les_addict = era.get(`abl:${target}:33`) || 0;
  const assi_les_addict = era.get(`abl:${assi}:33`) || 0;
  if (target_les_addict === 0 && assi_les_addict === 0) return 0;

  if ((era.get(`base:${target}:0`) || 0) < 500) return 0;

  let n = 0;
  if (target_les_addict === 1) n += 1;
  else if (target_les_addict === 2) n += 2;
  else if (target_les_addict === 3) n += 3;
  else if (target_les_addict === 4) n += 5;
  else if (target_les_addict === 5) n += 7;
  else if (target_les_addict >= 6) n += 9;

  if (assi_les_addict === 1) n += 1;
  else if (assi_les_addict === 2) n += 2;
  else if (assi_les_addict === 3) n += 5;
  else if (assi_les_addict === 4) n += 8;
  else if (assi_les_addict === 5) n += 13;
  else if (assi_les_addict >= 6) n += 18;

  if (n <= 0) return 0;

  const palam5 = era.get(`palam:${target}:5`) || 0;
  const palamlv3 = 3000;
  if (abl22 >= 5 && palam5 >= palamlv3) n += 1;
  if ((era.get(`abl:${assi}:22`) || 0) >= 3 && palam5 >= palamlv3) n += 1;
  if (
    abl11 >= 7 &&
    (era.get(`abl:${target}:5`) || 0) >= 6 &&
    palam5 >= palamlv3
  )
    n += 1;
  if (
    abl11 >= 4 &&
    (era.get(`abl:${target}:2`) || 0) >= 3 &&
    palam5 >= palamlv3
  )
    n += 1;

  // 相性
  const relation = era.get(`relation:${target}:${assi}`) || 0;
  if (relation > 0) {
    n = Math.floor((n * relation) / 100);
  }

  if (era.get(`talent:${target}:24`)) n -= 1; // 保守的
  if (era.get(`talent:${assi}:24`)) n -= 1;
  if (era.get(`talent:${target}:27`)) n -= 1; // 戒备森严
  if (era.get(`talent:${assi}:27`)) n -= 1;

  if (era.get(`talent:${target}:81`)) n += 2; // 双性恋
  if (era.get(`talent:${assi}:81`)) n += 2;
  if (era.get(`talent:${target}:76`)) n += 1; // 淫乱
  if (era.get(`talent:${assi}:76`)) n += 1;

  if (era.get(`talent:${target}:70`)) n += 1;
  else if (era.get(`talent:${target}:71`)) n -= 2;

  if (era.get(`talent:${assi}:70`)) n += 1;
  else if (era.get(`talent:${assi}:71`)) n -= 2;

  if (n <= 0) return 0;

  const target_name = chara_name(target);
  const assi_name = chara_name(assi);
  const master_name = chara_name(0);

  if (sex_result === 1) {
    era.drawLine();
    era.print(`${master_name}出去之后，`);
  } else {
    era.print('调教结束之后，');
  }
  era.print(`${target_name}和${assi_name}好像又百合PLAY了${n}回。`);
  await era.waitAnyKey();

  // 源 :480-481：TFLAG:13 = 2; CALL SELF_KOJO
  game.train.初吻与自我口上 = 2;
  await self_kojo();

  const exp2_add = Math.floor((n * 100 * abl10) / 500);
  era.print(`百合经验＋${n * 20}`);
  if (exp2_add > 0) {
    era.print(`绝顶经验＋${exp2_add}`);
  }
  era.print(`快C点数＋${n * 100 * abl10}`);
  era.print(`欲情点数＋${n * 200}`);

  chara(target).train.百合经验 += n * 20;
  chara(target).dungeon.绝顶经验 += exp2_add;
  era.add(`juel:${target}:0`, n * 100 * abl10);
  era.add(`juel:${target}:5`, n * 200);

  const abl12 = era.get(`abl:${target}:12`) || 0; // 技巧
  const abl16 = era.get(`abl:${target}:16`) || 0; // 侍奉精神
  if (era.get(`talent:${assi}:121`)) {
    // 助手是扶她
    era.print(`精液经验＋${n}`);
    era.print(`屈服点数＋${n * 100 * (abl12 + abl16)}`);
    era.print(`习得点数＋${n * 100 * (abl12 + abl16)}`);
    chara(target).dungeon.精液经验 += n;
    era.add(`juel:${target}:6`, n * 100 * (abl12 + abl16));
    era.add(`juel:${target}:7`, n * 100 * (abl12 + abl16));
  } else {
    era.print(`屈服点数＋${n * 50 * (abl12 + abl16)}`);
    era.print(`习得点数＋${n * 50 * (abl12 + abl16)}`);
    era.add(`juel:${target}:6`, n * 50 * (abl12 + abl16));
    era.add(`juel:${target}:7`, n * 50 * (abl12 + abl16));
  }

  if (era.get(`talent:${assi}:83`)) {
    // 助手抖S
    era.print(`苦痛快乐经验＋${n}`);
    const abl21 = era.get(`abl:${target}:21`) || 0;
    if (n * 100 * abl21 > 0) {
      era.print(`苦痛点数＋${n * 100 * abl21}`);
    }
    era.add(`juel:${target}:9`, n * 100 * abl21);
    chara(target).dungeon.被虐快乐经验 += n;
  }

  if (era.get(`talent:${target}:121`)) {
    // 目标是扶她
    era.print(`射精经验＋${n}`);
    era.print(`耻情点数＋${n * 100}`);
    chara(target).train.射精经验 += n;
    era.add(`juel:${target}:8`, n * 100);
  }

  if (
    era.get(`talent:${target}:121`) &&
    era.get(`talent:${assi}:121`) &&
    abl16 >= 3 &&
    (era.get(`abl:${target}:32`) || 0) >= 3
  ) {
    era.print(`${assi_name}和${target_name}`);
    if (era_flag.time === 0) {
      era.print('从早到晚都在吮吸着彼此的阴茎。');
    } else {
      era.print('整晚都在吮吸着彼此的阴茎。');
    }
    await era.waitAnyKey();

    era.print(`射精经验＋${n}`);
    era.print(`精液经验＋${n}`);
    era.print(`侍奉快乐经验＋${n}`);
    era.print(`口交经验＋${n}`);
    era.print(`欲情点数＋${n * 100}`);
    era.print(`屈服点数＋${n * 100}`);
    era.print(`耻情点数＋${n * 100}`);

    chara(target).train.射精经验 += n;
    chara(target).dungeon.精液经验 += n;
    chara(target).dungeon.侍奉快乐经验 += n;
    chara(target).dungeon.口交经验 += n;
    era.add(`juel:${target}:5`, n * 100);
    era.add(`juel:${target}:6`, n * 100);
    era.add(`juel:${target}:8`, n * 100);
  }

  return 1;
}

/**
 * @AFTERTRAIN_MASTURBATION_CHECK（:551-703）：自慰检查
 * @param {number} sex_result S
 * @param {number} les_result N
 * @param {(n: number) => number} [rand]
 * @returns {Promise<number>}
 */
async function aftertrain_masturbation_check(
  sex_result = 0,
  les_result = 0,
  rand = (n) => Math.floor(Math.random() * n),
) {
  const target = era_flag.target;
  const assi = era_flag.assi;
  if (target < 0) return 0;
  if (
    (era.get(`abl:${target}:0`) || 0) < 3 ||
    (era.get(`abl:${target}:11`) || 0) < 2
  )
    return 0;
  if (era.get(`talent:${target}:150`)) return 0; // 从不自慰
  if ((era.get(`base:${target}:0`) || 0) < 500) return 0;

  let a = 0;
  leftover_a = 0;
  leftover_q = 0;
  const abl31 = era.get(`abl:${target}:31`) || 0; // 自慰中毒
  if (abl31 === 1) a += 1;
  else if (abl31 === 2) a += 2;
  else if (abl31 === 3) a += 4;
  else if (abl31 === 4) a += 6;
  else if (abl31 === 5) a += 9;
  else if (abl31 >= 6) a += 14;

  const abl11 = era.get(`abl:${target}:11`) || 0;
  const palam5 = era.get(`palam:${target}:5`) || 0;
  const palamlv3 = 3000;
  const palamlv4 = 10000;

  if (era.get(`talent:${target}:60`) && abl11 >= 3 && palam5 >= palamlv3)
    a += 1;
  if (assi >= 0) {
    if (era.get(`talent:${assi}:118`) && abl11 >= 4 && palam5 >= palamlv3)
      a += 1;
  }

  const abl17 = era.get(`abl:${target}:17`) || 0;
  if (abl11 >= 5 && abl17 >= 4 && palam5 >= palamlv4) a += 1;
  if (abl11 >= 4 && abl17 >= 3 && palam5 >= palamlv4) a += 1;

  leftover_a = a;
  if (a <= 0) return 0;
  if (era.get(`talent:${target}:74`)) a = Math.floor(a * 1.5);
  if (assi >= 0 && era.get(`talent:${assi}:118`)) a = Math.floor(a * 1.2);

  if (era.get(`talent:${target}:17`)) a += 1;
  if (era.get(`talent:${target}:33`)) a += 1;

  if (era.get(`talent:${target}:15`)) a -= 1;
  if (era.get(`talent:${target}:20`)) a -= 1;
  if (era.get(`talent:${target}:32`)) a -= 1;

  if (era.get(`talent:${target}:70`)) a += 1;
  else if (era.get(`talent:${target}:71`)) a -= 2;

  if (era.get(`talent:${target}:76`)) a += 1;

  leftover_a = a;

  if (a <= 0) return 0;

  const target_name = chara_name(target);
  const assi_name = assi >= 0 ? chara_name(assi) : '';
  const master_name = chara_name(0);

  era.drawLine();
  let prefix = '调教结束之后，';
  if (les_result === 1) prefix = `${assi_name}出去之后，`;
  else if (sex_result === 1) prefix = `${master_name}出去之后，`;

  let q = 0;
  const abl22 = era.get(`abl:${target}:22`) || 0;
  const abl39 = era.get(`abl:${target}:39`) || 0;

  if (!era.get(`talent:${target}:85`) && les_result === 1 && abl22 > rand(5)) {
    era.print(
      `${target_name}在${prefix}好像一边想着${assi_name}，一边自慰了${a}次。`,
    );
    q = 1;
  } else if (
    !era.get(`talent:${target}:85`) &&
    abl39 > rand(5) &&
    (era.get('item:22') || 0) > 0
  ) {
    era.print(
      `${target_name}在${prefix}好像一边妄想着与野狗交配，一边自慰了${a}次。`,
    );
    q = 2;
  } else {
    era.print(
      `${target_name}在${prefix}好像一边想着${master_name}，一边自慰了${a}次。`,
    );
    q = 0;
  }

  // 源 :669-670：TFLAG:13 = 1; CALL SELF_KOJO
  leftover_q = q;
  game.train.初吻与自我口上 = 1;
  await self_kojo(undefined, q);
  era.print(`自慰经验＋${a}`);
  const { chara } = require('#/facade/chara');
  chara(target).dungeon.自慰经验 += a;

  if (era.get(`talent:${target}:122`)) {
    era.print(`阴茎点数＋${a * 500}`);
  } else {
    era.print(`快C点数＋${a * 500}`);
  }
  era.print(`恭顺点数＋${a * 100}`);
  era.print(`欲情点数＋${a * 250}`);
  await era.waitAnyKey();

  era.add(`juel:${target}:0`, a * 500);
  era.add(`juel:${target}:4`, a * 100);
  era.add(`juel:${target}:5`, a * 250);

  const abl10 = era.get(`abl:${target}:10`) || 0;
  const abl21 = era.get(`abl:${target}:21`) || 0;
  if (abl10 + abl17 + abl21 >= 10 && era_flag.time === 0) {
    era.print(`在那之后${target_name}来报告了。`);
    era.print(`耻情点数＋${a * 200}`);
    era.add(`juel:${target}:8`, a * 200);
  }

  if ((abl10 >= 5 || abl11 >= 5) && q === 0) {
    era.print(`无论自慰了多少次，也无法填满对${master_name}的欲望。`);
    await era.waitAnyKey();
  } else if (
    (abl11 >= 5 || (era.get(`abl:${target}:33`) || 0) >= 3) &&
    q === 1
  ) {
    era.print(`无论自慰了多少次，也无法填满对${assi_name}的欲望。`);
    await era.waitAnyKey();
  } else if ((abl11 >= 5 || abl39 >= 3) && q === 2) {
    era.print('无论自慰了多少次，也无法填满对兽交的欲望。');
    await era.waitAnyKey();
  }

  return 1;
}

/**
 * @AFTERTRAIN_BEASTSEX_CHECK（:708-842）：兽奸检查
 * @returns {Promise<number>}
 */
async function aftertrain_beastsex_check() {
  const target = era_flag.target;
  if (target < 0) return 0;
  if (era.get(`talent:${target}:135`)) return 0; // 未成熟
  if ((era.get(`exp:${target}:56`) || 0) < 50) return 0; // 兽奸经验 >= 50
  if (era.get(`talent:${target}:0`) || era.get(`talent:${target}:122`))
    return 0; // 处女 / 男性

  if (
    (era.get(`cflag:${target}:42`) || 0) === 79 &&
    (era.get(`cflag:${target}:40`) || 0) & 64
  ) {
    return 0;
  }
  if (era.get(`cflag:${target}:273`)) return 0;
  if ((era.get('item:22') || 0) === 0) return 0;
  if ((era.get(`base:${target}:0`) || 0) < 500) return 0;

  let b = 0;
  const abl39 = era.get(`abl:${target}:39`) || 0; // 兽奸中毒
  if (abl39 === 0) b -= 2;
  else if (abl39 === 1) b -= 1;
  else if (abl39 === 2) b += 0;
  else if (abl39 === 3) b += 1;
  else if (abl39 === 4) b += 2;
  else if (abl39 === 5) b += 3;
  else if (abl39 >= 6) b += 4;

  const abl11 = era.get(`abl:${target}:11`) || 0;
  const abl17 = era.get(`abl:${target}:17`) || 0;
  const palam5 = era.get(`palam:${target}:5`) || 0;
  const palamlv3 = 3000;
  const palamlv4 = 10000;

  if (era.get(`talent:${target}:124`) && abl11 >= 3 && palam5 >= palamlv3)
    b += 1;
  if (abl11 >= 5 && abl17 >= 4 && palam5 >= palamlv4) b += 1;
  if (abl11 >= 4 && abl17 >= 3 && palam5 >= palamlv4) b += 1;

  if (era.get(`talent:${target}:136`)) b += 2; // 牝犬

  if (b <= 0) return 0;

  if (era.get(`talent:${target}:17`)) b += 1;
  if (era.get(`talent:${target}:33`)) b += 1;
  if (era.get(`talent:${target}:124`)) b += 1;

  if (era.get(`talent:${target}:15`)) b -= 1;
  if (era.get(`talent:${target}:20`)) b -= 1;
  if (era.get(`talent:${target}:32`)) b -= 1;
  if (era.get(`talent:${target}:62`) && !era.get(`talent:${target}:64`)) b -= 2;

  if (era.get(`talent:${target}:70`)) b += 1;
  else if (era.get(`talent:${target}:71`)) b -= 2;

  if (era.get(`talent:${target}:76`)) b += 1;

  if (era.get(`talent:${target}:136`)) b = Math.floor(b * 1.5);

  if (b <= 0) return 0;

  const target_name = chara_name(target);

  era.drawLine();
  era.print(`之后，${target_name}悄悄地去了饲养狗的狗舍，进行了${b}次交配。`);

  era.print(`兽奸经验＋${b}`);
  era.print(`绝顶经验＋${b}`);
  era.print(`性交经验＋${b}`);
  const { chara } = require('#/facade/chara');
  chara(target).dungeon.兽奸经验 += b;
  chara(target).dungeon.私处经验 += b;
  chara(target).dungeon.性交经验 += b;

  era.print(`快V点数＋${b * 200}`);
  era.print(`屈服点数＋${b * 300}`);
  era.print(`耻情点数＋${b * 200}`);
  await era.waitAnyKey();

  era.add(`juel:${target}:1`, b * 200);
  era.add(`juel:${target}:6`, b * 300);
  era.add(`juel:${target}:8`, b * 200);

  const abl10 = era.get(`abl:${target}:10`) || 0;
  const abl21 = era.get(`abl:${target}:21`) || 0;
  if (abl10 + abl17 + abl21 >= 12 && era_flag.time === 0) {
    const tail = era.get(`talent:${target}:124`) ? '摇着尾巴，' : '';
    era.print(`在那之后${target_name}${tail}来报告了。`);
    era.print(`耻情点数＋${b * 200}`);
    // 源 :837 `JUEL:8 += A*200`：A 是自慰回数残留（#14 / #270），打印仍用 B
    era.add(`juel:${target}:8`, leftover_a * 200);
  }

  return 1;
}

/**
 * @SELF_CHECK（:100-128）：调教后行为检查
 * @param {(n: number) => number} [rand]
 * @returns {Promise<number>}
 */
async function self_check(rand) {
  // 逆レイプ関連のもの
  if (era.get('cflag:0:61')) {
    const { chara } = require('#/facade/chara');
    chara(0).train.逆强暴 = 0;
  }

  const target = era_flag.target;
  if (target < 0) return 0;

  // 失神中に調教終了したらスルー
  if ((era.get('tflag:899') || 0) >= 1) {
    return 0;
  }

  // 調教後の性交渉チェック
  let s = 0;
  const abl2 = era.get(`abl:${target}:2`) || 0; // V感觉
  const abl3 = era.get(`abl:${target}:3`) || 0; // A感觉
  const is_male = era.get(`talent:${target}:122`);
  const is_virgin = era.get(`talent:${target}:0`);

  if (is_male || (!is_male && abl2 < abl3) || (is_virgin && abl3 >= 3)) {
    s = await aftertrain_analsex_check();
  } else {
    s = await aftertrain_sex_check();
  }

  // 百合中毒によるレズチェック
  const n = await aftertrain_lesbiansex_check(s);

  // 自慰中毒による自慰チェック
  await aftertrain_masturbation_check(s, n, rand);

  // 兽奸中毒による兽奸チェック
  await aftertrain_beastsex_check();

  return 0;
}

module.exports = {
  charadead_check,
  aftertrain_analsex_check,
  aftertrain_beastsex_check,
  aftertrain_lesbiansex_check,
  aftertrain_masturbation_check,
  aftertrain_sex_check,
  peek_aftertrain_q,
  peek_aftertrain_s,
  peek_sale_price,
  remember_aftertrain_s,
  remember_sale_price,
  self_check,
};
