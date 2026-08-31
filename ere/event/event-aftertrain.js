/**
 * @file 调教后自主行为检查（EVENT_AFTERTRAIN.ERB 移植）。
 *
 * 源: target/ERB/EVENT/EVENT_AFTERTRAIN.ERB
 *     @CHARADEAD_CHECK（:6-85）
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
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { self_kojo } = require('#/kojo/kojo-system');
const { chara_callname } = require('#/utils/callname-utils');

/**
 * 原作 A 是跨函数全局（技能指南 glossary.md:151）。本项目只建模同模块内
 * 的那一跳：aftertrain_masturbation_check 写、aftertrain_beastsex_check 读。
 * 跨模块残留不建模（已知偏差，#14 / #270）。兽奸报告分支源 :837 写
 * `JUEL:8 += A*200` 而打印用 `B*200`——原作缺陷，1:1 照抄。
 */
let leftover_a = 0;

/**
 * 获取角色称呼（SAVESTR / CALLNAME）
 * @param {number} cid
 * @returns {string}
 */
function chara_name(cid) {
  return chara_callname(cid);
}

/**
 * @AFTERTRAIN_SEX_CHECK（:140-250）：调教后通常性交检查
 * @returns {Promise<number>} 执行回数或 0
 */
async function aftertrain_sex_check() {
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
  aftertrain_analsex_check,
  aftertrain_beastsex_check,
  aftertrain_lesbiansex_check,
  aftertrain_masturbation_check,
  aftertrain_sex_check,
  self_check,
};
