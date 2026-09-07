/**
 * @file 结婚日事件（issue #342，阶段 5a L11）。
 *
 * 源: target/ERB/怪物相關/MARRIAGE_DAY.ERB  @MARRIAGE_DAY
 *     及其十六个分支。
 *
 * Emuera 的全局单字母 y 在主分发中掷出后由分支共用，ere 侧改为显式参数；
 * 所有随机分支均接受注入的随机源，确保测试与回放可复现。
 */

'use strict';

const era = require('#/era-electron');
const { begin, STATE } = require('#/system/flow/begin-signal');
const { search_family } = require('#/chara/chara-family');
const {
  LOVER_NAMES,
  dungeon_town_lover,
  dungeon_town_lover_chara_enter,
} = require('#/dungeon/dungeon-lovers');
const { she } = require('#/dungeon/dungeon-battle');
const { clitoris_word } = require('#/dungeon/dungeon-battle2');
const { e_get, item_name, monster_data } = require('#/dungeon/monster-data');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { chara_callname } = require('#/utils/callname-utils');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');

const default_rand = (n) => Math.floor(Math.random() * n);
const name_of = (cid) => chara_callname(cid);
const marriage_name = (cid) => item_name(chara(cid).chara.结婚对象 || 0);
const talent_name = (index) => era.get(`talentname:${index}`) ?? '';
// ITEM[怪物编号] = 当前持有的对应怪物数量（婚后事件的配偶存在判据）。
const monster_stock = (monster_id) => era.get(`item:${monster_id}`) || 0;
const power = (base, exponent) => base ** exponent;
const pick = (items, rand) => items[rand(items.length)];
const lover_display_name = (lover_type) => {
  const name = LOVER_NAMES.get(lover_type) ?? '';
  return name ? name.padEnd(14, '　') : '';
};

// CFLAG[603] = 结婚对象状态（0 普通、1 出轨、2 私通、3 私通妊娠）；
// 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt:466。
const marriage_partner_status = (cid) => era.get(`cflag:${cid}:603`) || 0;
// CFLAG[609] = 结婚对象采用角色数据的标志；原作同名“结婚对象名字”槽。
// 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt:472。
const marriage_partner_character = (cid) => era.get(`cflag:${cid}:609`) || 0;
// JUEL[4]/[5]/[6] = 欲情／恭顺／屈服点数。
const desire_points = (cid) => era.get(`juel:${cid}:4`) || 0;
const obedience_points = (cid) => era.get(`juel:${cid}:5`) || 0;
const submission_points = (cid) => era.get(`juel:${cid}:6`) || 0;
// TALENT[183]/[184] = 有常客／求爱；Talent.yml 的静态表定义。
const has_regular_customer = (cid) => era.get(`talent:${cid}:183`) || 0;
const is_courting = (cid) => era.get(`talent:${cid}:184`) || 0;

// 源范围 :4-152
async function marriage_day(cid, rand = default_rand, restart_turnend = true) {
  const view = chara(cid);
  const marriage_type = view.chara.结婚对象; // CFLAG[601] = 结婚对象
  const unavailable = view.invasion.状态 !== 0 || marriage_type === 0;

  if (unavailable) {
    if (view.dungeon.恋人 === 0) {
      await dungeon_town_lover_chara_enter(cid, rand);
    }
    if (view.dungeon.恋人 === 200) {
      await dungeon_town_lover(cid, rand);
    }
    return 0;
  }

  view.chara.结婚爱情 += 1; // CFLAG[602]
  const monster_id = marriage_type;
  if (marriage_type < 900 && (marriage_partner_character(cid) || 0) === 0) {
    if (monster_stock(monster_id) <= 0) return 0;
  }

  era.println();
  era.drawLine();

  let marriage_chara = 0;
  let lover_type = 0;
  let monster_kind = 0;
  let spouse_name;
  if (marriage_type === 902) {
    lover_type = view.dungeon.恋人;
    spouse_name = lover_display_name(lover_type);
  } else if ((marriage_partner_character(cid) || 0) > 0) {
    marriage_chara = search_family(cid, 'MARRIAGE');
    spouse_name = marriage_chara < 0 ? '奴隶' : name_of(marriage_chara);
  } else if (marriage_type < 900) {
    monster_data(marriage_type, 5, -1, -1, -1, rand);
    monster_kind = e_get(507);
    spouse_name = item_name(monster_id);
  } else if (marriage_type === 900) {
    spouse_name = '野狗';
  } else if (marriage_type === 901) {
    spouse_name = '你';
  } else {
    marriage_chara = search_family(cid, 'MARRIAGE');
    spouse_name = marriage_chara < 0 ? '奴隶' : name_of(marriage_chara);
  }
  await era.printAndWait(`*${name_of(cid)}和${spouse_name}的结婚生活*`);

  if (chara(cid).chara.妊娠) {
    await era.printAndWait('夫妇俩人期待着孩子的出生。');
    return 0;
  }
  if (chara(cid).chara.育儿中) {
    await era.printAndWait('夫妇俩人期待着孩子的长大。');
    return 0;
  }

  const y = rand(5) + 1;
  let final_y = y;
  view.chara.结婚对象 = marriage_type;
  view.dungeon.怪物膣内射精 = 0; // CFLAG[107]
  era.set(`cflag:${cid}:112`, 0); // CFLAG[112] = 异种妊娠对象

  if (marriage_type === 900) {
    final_y = await marriage_day_dog(cid, y, rand);
  } else if (marriage_type === 901) {
    final_y = await marriage_day_you(cid, y, rand);
  } else if (marriage_type === 902) {
    await marriage_day_lovers(lover_type, cid, rand);
  } else if ((marriage_partner_character(cid) || 0) > 0 && marriage_chara > 0) {
    await marriage_day_slave(cid, marriage_chara);
  } else {
    const branches = [
      null,
      orc_marriage_day,
      slime_marriage_day,
      insect_marriage_day,
      ivy_marriage_day,
      syokusyu_marriage_day,
      faily_marriage_day,
      giant_marriage_day,
      man_marriage_day,
      girl_marriage_day,
      beast_marriage_day,
      brain_marriage_day,
      horse_marriage_day,
    ];
    const branch = branches[monster_kind];
    if (branch) final_y = await branch(cid, y, rand);
    else await marriage_day_slave(cid, marriage_chara);
  }

  if (
    (chara(cid).chara.处女 || 0) === 1 &&
    (chara(cid).dungeon.私处经验 || 0) > 0 &&
    (chara(cid).chara.私处封印 || 0) === 0 &&
    (chara(cid).chara.特别服装类型 || 0) !== 79 &&
    ![2, 3, 4].includes(monster_kind)
  ) {
    await era.printAndWait('【处女丧失】');
    view.chara.处女 = 0; // TALENT[0]（跨域写，属主 chara）
  }

  if (
    view.dungeon.怪物膣内射精 !== 0 &&
    ![900, 901, 902].includes(marriage_type)
  ) {
    era.set(`cflag:${cid}:112`, monster_id);
  }

  if ((chara(cid).chara.母乳体质 || 0) === 1) {
    await era.printAndWait(
      `${name_of(cid)}多余的奶水被卖出了获得${final_y * 100}pts`,
    );
    era_flag.money += final_y * 100;
    era_exflag.legit_money += final_y * 100;
  }
  // 原作从子程序 BEGIN TURNEND 会结束本次婚后事件。事件注册表以异常表达
  // BEGIN；若已在 TURNEND 处理器内仍抛出，会中断余下结算并无限重进本状态。
  // 正常调用保留转场；TURNEND 接线显式关闭同状态重入后，等价地顺接后文。
  if (restart_turnend) begin(STATE.TURNEND);
  return 1;
}

// 源范围 :153-330
async function marriage_day_dog(cid, y = 1, rand = default_rand) {
  await era.printAndWait(`${name_of(cid)}和野狗在狗屋生活着。`);

  if (
    cid === 0 &&
    chara(cid).event.牝犬 == 0 &&
    (chara(cid).train.兽奸中毒 <= 1 || chara(cid).chara.结婚爱情 < 50)
  ) {
    if (
      chara(cid).chara.私处封印 == 1 ||
      (chara(cid).chara.特别服装类型 == 79 &&
        chara(cid).train.着衣状态 & 64 &&
        game.system.着衣系统) ||
      chara(cid).chara.男人 == 1
    ) {
      await era.printAndWait(
        `${name_of(cid)}抱着野狗，肛门完全接收了野狗的阴茎。`,
      );
      era.print(`肛门经验+${y}`);
      // EXP[1] + = y（变量语义：EXP 族，(cid)[1] +）
      era.add(`exp:${cid}:1`, y);
      await era.printAndWait(`兽奸经验+${y}`);
      // EXP[56] + = y（变量语义：EXP 族，(cid)[56] +）
      era.add(`exp:${cid}:56`, y);
    } else {
      await era.printAndWait(`${name_of(cid)}抱着野狗，完全接收了野狗的阴茎。`);
      era.print(`私处经验+${y}`);
      // EXP[0] + = y（变量语义：EXP 族，(cid)[0] +）
      era.add(`exp:${cid}:0`, y);
      await era.printAndWait(`兽奸经验+${y}`);
      // EXP[56] + = y（变量语义：EXP 族，(cid)[56] +）
      era.add(`exp:${cid}:56`, y);
      // CFLAG[106] + = y（变量语义：CFLAG 族，(cid)[106] +）
      era.add(`cflag:${cid}:106`, y);
    }
  } else if (chara(cid).event.牝犬 == 1) {
    let description = name_of(cid);

    if (chara(cid).chara.结婚爱情 > 40) {
      description += '满心欢喜地';
    }

    if (chara(cid).chara.种族 == 2) {
      description += '摇着尾巴';
    } else {
      description += '摇着屁股';
    }

    if (chara(cid).system.露出癖 >= 3) {
      description += '在公众场所';
    }

    if (
      chara(cid).chara.私处封印 == 1 ||
      (chara(cid).chara.特别服装类型 == 79 &&
        chara(cid).train.着衣状态 & 64 &&
        game.system.着衣系统) ||
      chara(cid).chara.男人 == 1
    ) {
      description += '用肛门';
    }

    description += '和野狗';

    if (rand(3) == 0) {
      await era.printAndWait(`${description}发情交尾着。`);
    } else if (rand(2) == 0) {
      await era.printAndWait(`${description}交配着。`);
    } else {
      await era.printAndWait(`${description}爱爱着。`);
    }

    if (
      chara(cid).chara.私处封印 == 1 ||
      (chara(cid).chara.特别服装类型 == 79 &&
        chara(cid).train.着衣状态 & 64 &&
        game.system.着衣系统) ||
      chara(cid).chara.男人 == 1
    ) {
      era.print(`肛门经验+${y}`);
      // EXP[1] + = y（变量语义：EXP 族，(cid)[1] +）
      era.add(`exp:${cid}:1`, y);
      await era.printAndWait(`兽奸经验+${y}`);
      // EXP[56] + = y（变量语义：EXP 族，(cid)[56] +）
      era.add(`exp:${cid}:56`, y);

      era.print(`肛门点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`);
      // JUEL:cid[2] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[2] +）
      era.add(`juel:${cid}:2`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      await era.printAndWait(`绝顶经验+${y}`);
      // EXP:cid[2] + = y（变量语义：EXP 族，cid[2] +）
      era.add(`exp:${cid}:2`, y);
    } else {
      era.print(`私处经验+${y}`);
      // EXP[0] + = y（变量语义：EXP 族，(cid)[0] +）
      era.add(`exp:${cid}:0`, y);
      await era.printAndWait(`兽奸经验+${y}`);
      // EXP[56] + = y（变量语义：EXP 族，(cid)[56] +）
      era.add(`exp:${cid}:56`, y);

      era.print(`私处点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`);
      // JUEL:cid[1] + = (CFLAG:cid[602] * 10 * y + 10)（变量语义：JUEL 族，cid[1] +）
      era.add(`juel:${cid}:1`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      await era.printAndWait(`绝顶经验+${y}`);
      // EXP:cid[2] + = y（变量语义：EXP 族，cid[2] +）
      era.add(`exp:${cid}:2`, y);

      // CFLAG[106] + = y（变量语义：CFLAG 族，(cid)[106] +）
      era.add(`cflag:${cid}:106`, y);
    }
  } else if (chara(cid).train.兽奸中毒 >= 1 || chara(cid).chara.结婚爱情 > 40) {
    if (
      chara(cid).chara.私处封印 == 1 ||
      (chara(cid).chara.特别服装类型 == 79 &&
        chara(cid).train.着衣状态 & 64 &&
        game.system.着衣系统) ||
      chara(cid).chara.男人 == 1
    ) {
      await era.printAndWait(
        `${name_of(cid)}在用肛门与狗交配的时候，感觉到了爱意。`,
      );
      era.print(`肛门经验+${y}`);
      // EXP[1] + = y（变量语义：EXP 族，(cid)[1] +）
      era.add(`exp:${cid}:1`, y);
      await era.printAndWait(`兽奸经验+${y}`);
      // EXP[56] + = y（变量语义：EXP 族，(cid)[56] +）
      era.add(`exp:${cid}:56`, y);

      era.print(`肛门点数+${chara(cid).chara.结婚爱情 * 8 * y + 8}`);
      // JUEL:cid[2] + = (CFLAG:cid[602] * 8 * y + 8)（变量语义：JUEL 族，cid[2] +）
      era.add(`juel:${cid}:2`, chara(cid).chara.结婚爱情 * 8 * y + 8);
      await era.printAndWait(`绝顶经验+${y}`);
      // EXP:cid[2] + = y（变量语义：EXP 族，cid[2] +）
      era.add(`exp:${cid}:2`, y);
    } else {
      await era.printAndWait(`${name_of(cid)}在与狗交配的时候，感觉到了爱意。`);
      era.print(`私处经验+${y}`);
      // EXP[0] + = y（变量语义：EXP 族，(cid)[0] +）
      era.add(`exp:${cid}:0`, y);
      await era.printAndWait(`兽奸经验+${y}`);
      // EXP[56] + = y（变量语义：EXP 族，(cid)[56] +）
      era.add(`exp:${cid}:56`, y);

      era.print(`私处点数+${chara(cid).chara.结婚爱情 * 8 * y + 8}`);
      // JUEL:cid[1] + = (CFLAG:cid[602] * 8 * y + 8)（变量语义：JUEL 族，cid[1] +）
      era.add(`juel:${cid}:1`, chara(cid).chara.结婚爱情 * 8 * y + 8);
      await era.printAndWait(`绝顶经验+${y}`);
      // EXP:cid[2] + = y（变量语义：EXP 族，cid[2] +）
      era.add(`exp:${cid}:2`, y);

      // CFLAG[106] + = y（变量语义：CFLAG 族，(cid)[106] +）
      era.add(`cflag:${cid}:106`, y);
    }
  } else if (chara(cid).chara.结婚爱情 > 20) {
    if (chara(cid).event.反抗心 == 1) {
      await era.printAndWait(`${name_of(cid)}终于理解自己的状况了……`);

      await era.printAndWait(`屈服点数+${chara(cid).chara.结婚爱情 * y + 10}`);
      // JUEL:cid[6] + = (CFLAG:cid[602] * y + 10)（变量语义：JUEL 族，cid[6] +）
      era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * y + 10);
    } else if (chara(cid).chara.刚强 == 1) {
      await era.printAndWait(`${name_of(cid)}和野狗一起玩耍，关系加深了……`);

      await era.printAndWait(`屈服点数+${chara(cid).chara.结婚爱情 * y + 10}`);
      // JUEL:cid[6] + = (CFLAG:cid[602] * y + 10)（变量语义：JUEL 族，cid[6] +）
      era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * y + 10);
    } else if (
      chara(cid).chara.坦率 == 1 ||
      chara(cid).chara.喜欢的东西 == 12
    ) {
      await era.printAndWait(`${name_of(cid)}与野狗接吻的样子被目击了。`);

      era.print(`屈服点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`);
      // JUEL:cid[6] + = (CFLAG:cid[602] * 10 * y + 10)（变量语义：JUEL 族，cid[6] +）
      era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      await era.printAndWait(
        `欲情点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`,
      );
      // JUEL:cid[5] + = (CFLAG:cid[602] * 10 * y + 10)（变量语义：JUEL 族，cid[5] +）
      era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 10 * y + 10);
    } else {
      await era.printAndWait(`${name_of(cid)}用刷子为野狗刷毛……`);

      await era.printAndWait(
        `恭顺点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`,
      );
      // JUEL:cid[4] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[4] +）
      era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 5 * y + 5);
    }
  } else {
    if (chara(cid).event.反抗心 == 1) {
      await era.printAndWait(`${name_of(cid)}用手推开靠过来的野狗。`);

      await era.printAndWait(
        `屈服点数+${chara(cid).chara.结婚爱情 * 2 * y + 2}`,
      );
      // JUEL:cid[6] + = (CFLAG:cid[602] * 2 * y + 2)（变量语义：JUEL 族，cid[6] +）
      era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 2 * y + 2);
    } else if (chara(cid).chara.刚强 == 1) {
      await era.printAndWait(`${name_of(cid)}有空就去照看野狗。`);

      await era.printAndWait(
        `恭顺点数+${chara(cid).chara.结婚爱情 * 2 * y + 2}`,
      );
      // JUEL:cid[4] + = (CFLAG:cid[602] * 2 * y + 2)（变量语义：JUEL 族，cid[4] +）
      era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 2 * y + 2);
    } else if (
      chara(cid).chara.坦率 == 1 ||
      chara(cid).chara.喜欢的东西 == 12
    ) {
      await era.printAndWait(`${name_of(cid)}有空就去和野狗玩耍。`);

      await era.printAndWait(
        `欲情点数+${chara(cid).chara.结婚爱情 * 2 * y + 2}`,
      );
      // JUEL:cid[5] + = (CFLAG:cid[602] * 2 * y + 2)（变量语义：JUEL 族，cid[5] +）
      era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 2 * y + 2);
    } else {
      await era.printAndWait(
        `从不正眼看野狗，${name_of(cid)}陷入了深深的绝望中……`,
      );

      await era.printAndWait(
        `恐怖点数+${chara(cid).chara.结婚爱情 * 2 * y + 2}`,
      );
      // JUEL:cid[10] + = (CFLAG:cid[602] * 2 * y + 2)（变量语义：JUEL 族，cid[10] +）
      era.add(`juel:${cid}:10`, chara(cid).chara.结婚爱情 * 2 * y + 2);
    }
  }

  return y;
}

// @MARRIAGE_DAY_YOU,cid
// 源范围 :331-513
async function marriage_day_you(cid, y = 1) {
  if (chara(cid).invasion.状态 != 0 || chara(0).invasion.状态 != 0) {
    return y;
  }

  era.print(`${name_of(cid)}与${name_of(0)}一起生活着。`);

  if (chara(cid).stronghold.爱慕 == 1) {
    await era.printAndWait(
      `${name_of(cid)}常常一言不发，柔情似水地凝望着你。一副自豪的样子在你身旁侍奉着。`,
    );

    await era.printAndWait(
      `为成为一个好妃子努力修行着。自动接受着各种羞耻的调教。`,
    );

    era.print(`屈服,欲情,恭顺,耻情点数+${chara(cid).system.顺从 * y * 10}`);
    // JUEL:cid[6] + = (ABL:cid[10] * y * 10)（变量语义：JUEL 族，cid[6] +）
    era.add(`juel:${cid}:6`, chara(cid).system.顺从 * y * 10);
    // JUEL:cid[5] + = (ABL:cid[10] * y * 10)（变量语义：JUEL 族，cid[5] +）
    era.add(`juel:${cid}:5`, chara(cid).system.顺从 * y * 10);
    // JUEL:cid[4] + = (ABL:cid[10] * y * 10)（变量语义：JUEL 族，cid[4] +）
    era.add(`juel:${cid}:4`, chara(cid).system.顺从 * y * 10);
    // JUEL:cid[8] + = (ABL:cid[10] * y * 10)（变量语义：JUEL 族，cid[8] +）
    era.add(`juel:${cid}:8`, chara(cid).system.顺从 * y * 10);
    if (chara(cid).chara.男人) {
      era.print(
        `${clitoris_word(cid)},乳房,肛门点数+${chara(cid).system.顺从 * y * 10}`,
      );
      // JUEL:cid[0] + = (ABL:cid[10] * y * 10)（变量语义：JUEL 族，cid[0] +）
      era.add(`juel:${cid}:0`, chara(cid).system.顺从 * y * 10);
      // JUEL:cid[14] + = (ABL:cid[10] * y * 10)（变量语义：JUEL 族，cid[14] +）
      era.add(`juel:${cid}:14`, chara(cid).system.顺从 * y * 10);
      // JUEL:cid[2] + = (ABL:cid[10] * y * 10)（变量语义：JUEL 族，cid[2] +）
      era.add(`juel:${cid}:2`, chara(cid).system.顺从 * y * 10);
    } else {
      era.print(
        `${clitoris_word(cid)},乳房,肛门,私处点数+${chara(cid).system.顺从 * y * 10}`,
      );
      // JUEL:cid[0] + = (ABL:cid[10] * y * 10)（变量语义：JUEL 族，cid[0] +）
      era.add(`juel:${cid}:0`, chara(cid).system.顺从 * y * 10);
      // JUEL:cid[14] + = (ABL:cid[10] * y * 10)（变量语义：JUEL 族，cid[14] +）
      era.add(`juel:${cid}:14`, chara(cid).system.顺从 * y * 10);
      // JUEL:cid[1] + = (ABL:cid[10] * y * 10)（变量语义：JUEL 族，cid[1] +）
      era.add(`juel:${cid}:1`, chara(cid).system.顺从 * y * 10);
      // JUEL:cid[2] + = (ABL:cid[10] * y * 10)（变量语义：JUEL 族，cid[2] +）
      era.add(`juel:${cid}:2`, chara(cid).system.顺从 * y * 10);
    }
    era.print(`话术+${chara(cid).system.顺从 * y * 10}`);
    // JUEL:cid[7] + = (ABL:cid[10] * y * 10)（变量语义：JUEL 族，cid[7] +）
    era.add(`juel:${cid}:7`, chara(cid).system.顺从 * y * 10);
    era.print(`苦痛点数+${chara(cid).system.顺从 * y * 5 + 10}`);
    // JUEL:cid[9] + = (ABL:cid[10] * y * 5 + 10 )（变量语义：JUEL 族，cid[9] +）
    era.add(`juel:${cid}:9`, chara(cid).system.顺从 * y * 5 + 10);
    if (chara(cid).chara.男人) {
      era.print(`肛门,口交经验+${y}`);
      // EXP:cid[1] + = y（变量语义：EXP 族，cid[1] +）
      era.add(`exp:${cid}:1`, y);
      // EXP:cid[22] + = y（变量语义：EXP 族，cid[22] +）
      era.add(`exp:${cid}:22`, y);
    } else {
      era.print(`私处,肛门,口交经验+${y}`);
      // EXP:cid[0] + = y（变量语义：EXP 族，cid[0] +）
      era.add(`exp:${cid}:0`, y);
      // EXP:cid[1] + = y（变量语义：EXP 族，cid[1] +）
      era.add(`exp:${cid}:1`, y);
      // EXP:cid[22] + = y（变量语义：EXP 族，cid[22] +）
      era.add(`exp:${cid}:22`, y);
    }
    era.print(`性交经验,精液经验+${y}`);
    // EXP:cid[5] + = y（变量语义：EXP 族，cid[5] +）
    era.add(`exp:${cid}:5`, y);
    // EXP:cid[20] + = y（变量语义：EXP 族，cid[20] +）
    era.add(`exp:${cid}:20`, y);
    era.print(`调教会话经验+${y}`);
    // EXP:cid[73] + = y（变量语义：EXP 族，cid[73] +）
    era.add(`exp:${cid}:73`, y);
    era.print(`自慰经验,调教自慰经验+${y}`);
    // EXP:cid[10] + = y（变量语义：EXP 族，cid[10] +）
    era.add(`exp:${cid}:10`, y);
    // EXP:cid[11] + = y（变量语义：EXP 族，cid[11] +）
    era.add(`exp:${cid}:11`, y);
    era.print(`绝顶经验+${Math.trunc(y / 2)}`);
    // EXP:cid[2] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[2] +）
    era.add(`exp:${cid}:2`, Math.trunc(y / 2));
    await era.printAndWait(`施虐经验,被虐经验+${y}`);
    // EXP:cid[30] + = y（变量语义：EXP 族，cid[30] +）
    era.add(`exp:${cid}:30`, y);
    // EXP:cid[33] + = y（变量语义：EXP 族，cid[33] +）
    era.add(`exp:${cid}:33`, y);
  } else if (chara(cid).stronghold.淫乱 == 1) {
    const body =
      chara(cid).chara.扶她 || chara(cid).chara.男人 ? '阴茎' : '身体';
    await era.printAndWait(
      `${name_of(cid)}经常在身边露出淫媚的笑容，在你的${body}上不停摩挲着。`,
    );

    await era.printAndWait(`心里却盘算着如何偷偷引诱你某几个部下...`);

    era.print(`屈服,欲情,恭顺,耻情点数+${chara(cid).system.顺从 * y * 10}`);
    // JUEL:cid[6] + = (ABL:cid[11] * y * 10)（变量语义：JUEL 族，cid[6] +）
    era.add(`juel:${cid}:6`, chara(cid).system.欲望 * y * 10);
    // JUEL:cid[5] + = (ABL:cid[11] * y * 10)（变量语义：JUEL 族，cid[5] +）
    era.add(`juel:${cid}:5`, chara(cid).system.欲望 * y * 10);
    // JUEL:cid[4] + = (ABL:cid[11] * y * 10)（变量语义：JUEL 族，cid[4] +）
    era.add(`juel:${cid}:4`, chara(cid).system.欲望 * y * 10);
    // JUEL:cid[8] + = (ABL:cid[11] * y * 10)（变量语义：JUEL 族，cid[8] +）
    era.add(`juel:${cid}:8`, chara(cid).system.欲望 * y * 10);
    if (chara(cid).chara.男人) {
      era.print(
        `${clitoris_word(cid)},乳房,肛门点数+${chara(cid).system.顺从 * y * 10}`,
      );
      // JUEL:cid[0] + = (ABL:cid[11] * y * 10)（变量语义：JUEL 族，cid[0] +）
      era.add(`juel:${cid}:0`, chara(cid).system.欲望 * y * 10);
      // JUEL:cid[14] + = (ABL:cid[11] * y * 10)（变量语义：JUEL 族，cid[14] +）
      era.add(`juel:${cid}:14`, chara(cid).system.欲望 * y * 10);
      // JUEL:cid[2] + = (ABL:cid[11] * y * 10)（变量语义：JUEL 族，cid[2] +）
      era.add(`juel:${cid}:2`, chara(cid).system.欲望 * y * 10);
    } else {
      era.print(
        `${clitoris_word(cid)},乳房,肛门,私处点数+${chara(cid).system.顺从 * y * 10}`,
      );
      // JUEL:cid[0] + = (ABL:cid[11] * y * 10)（变量语义：JUEL 族，cid[0] +）
      era.add(`juel:${cid}:0`, chara(cid).system.欲望 * y * 10);
      // JUEL:cid[14] + = (ABL:cid[11] * y * 10)（变量语义：JUEL 族，cid[14] +）
      era.add(`juel:${cid}:14`, chara(cid).system.欲望 * y * 10);
      // JUEL:cid[1] + = (ABL:cid[11] * y * 10)（变量语义：JUEL 族，cid[1] +）
      era.add(`juel:${cid}:1`, chara(cid).system.欲望 * y * 10);
      // JUEL:cid[2] + = (ABL:cid[11] * y * 10)（变量语义：JUEL 族，cid[2] +）
      era.add(`juel:${cid}:2`, chara(cid).system.欲望 * y * 10);
    }
    era.print(`话术+${chara(cid).system.欲望 * y * 10}`);
    // JUEL:cid[7] + = (ABL:cid[11] * y * 10)（变量语义：JUEL 族，cid[7] +）
    era.add(`juel:${cid}:7`, chara(cid).system.欲望 * y * 10);
    era.print(`苦痛点数+${chara(cid).system.欲望 * y * 5 + 10}`);
    // JUEL:cid[9] + = (ABL:cid[11] * y * 5 + 10)（变量语义：JUEL 族，cid[9] +）
    era.add(`juel:${cid}:9`, chara(cid).system.欲望 * y * 5 + 10);
    if (chara(cid).chara.男人) {
      era.print(`肛门,口交经验+${Math.trunc(y / 2)}`);
      // EXP:cid[1] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[1] +）
      era.add(`exp:${cid}:1`, Math.trunc(y / 2));
      // EXP:cid[22] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[22] +）
      era.add(`exp:${cid}:22`, Math.trunc(y / 2));
    } else {
      era.print(`私处,肛门,口交经验+${Math.trunc(y / 2)}`);
      // EXP:cid[0] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[0] +）
      era.add(`exp:${cid}:0`, Math.trunc(y / 2));
      // EXP:cid[1] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[1] +）
      era.add(`exp:${cid}:1`, Math.trunc(y / 2));
      // EXP:cid[22] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[22] +）
      era.add(`exp:${cid}:22`, Math.trunc(y / 2));
    }
    era.print(`性交经验,精液经验+${Math.trunc(y / 2)}`);
    // EXP:cid[5] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[5] +）
    era.add(`exp:${cid}:5`, Math.trunc(y / 2));
    // EXP:cid[20] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[20] +）
    era.add(`exp:${cid}:20`, Math.trunc(y / 2));
    era.print(`兽奸经验,异常经验,卖淫经验+${Math.trunc(y / 2)}`);
    // EXP:cid[50] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[50] +）
    era.add(`exp:${cid}:50`, Math.trunc(y / 2));
    // EXP:cid[56] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[56] +）
    era.add(`exp:${cid}:56`, Math.trunc(y / 2));
    // EXP:cid[74] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[74] +）
    era.add(`exp:${cid}:74`, Math.trunc(y / 2));
    era.print(`调教会话经验+${Math.trunc(y / 2)}`);
    // EXP:cid[73] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[73] +）
    era.add(`exp:${cid}:73`, Math.trunc(y / 2));
    era.print(`自慰经验,调教自慰经验+${Math.trunc(y / 2)}`);
    // EXP:cid[10] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[10] +）
    era.add(`exp:${cid}:10`, Math.trunc(y / 2));
    // EXP:cid[11] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[11] +）
    era.add(`exp:${cid}:11`, Math.trunc(y / 2));
    era.print(`绝顶经验+${Math.trunc(y / 2)}`);
    // EXP:cid[2] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[2] +）
    era.add(`exp:${cid}:2`, Math.trunc(y / 2));
    era.print(`施虐经验,被虐经验+${Math.trunc(y / 2)}`);
    // EXP:cid[30] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[30] +）
    era.add(`exp:${cid}:30`, Math.trunc(y / 2));
    // EXP:cid[33] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[33] +）
    era.add(`exp:${cid}:33`, Math.trunc(y / 2));
  } else if (chara(cid).system.顺从 >= 3) {
    await era.printAndWait(
      `${name_of(cid)}作为勇者陷落的象征，勉为其难地陪侍着你身边。`,
    );

    await era.printAndWait(`偶尔象征性的表示期望你的调教...`);

    era.print(
      `屈服,欲情,恭顺,耻情点数+${chara(cid).system.欲望 * y * 8 + chara(cid).system.顺从 * y * 8 + 8}`,
    );
    // JUEL:cid[6] + = (ABL:cid[11] * y * 8 + ABL:cid[10] * y * 8 + 8)（变量语义：JUEL 族，cid[6] +）
    era.add(
      `juel:${cid}:6`,
      chara(cid).system.欲望 * y * 8 + chara(cid).system.顺从 * y * 8 + 8,
    );
    // JUEL:cid[5] + = (ABL:cid[11] * y * 8 + ABL:cid[10] * y * 8 + 8)（变量语义：JUEL 族，cid[5] +）
    era.add(
      `juel:${cid}:5`,
      chara(cid).system.欲望 * y * 8 + chara(cid).system.顺从 * y * 8 + 8,
    );
    // JUEL:cid[4] + = (ABL:cid[11] * y * 8 + ABL:cid[10] * y * 8 + 8)（变量语义：JUEL 族，cid[4] +）
    era.add(
      `juel:${cid}:4`,
      chara(cid).system.欲望 * y * 8 + chara(cid).system.顺从 * y * 8 + 8,
    );
    // JUEL:cid[8] + = (ABL:cid[11] * y * 8 + ABL:cid[10] * y * 8 + 8)（变量语义：JUEL 族，cid[8] +）
    era.add(
      `juel:${cid}:8`,
      chara(cid).system.欲望 * y * 8 + chara(cid).system.顺从 * y * 8 + 8,
    );
    if (chara(cid).chara.男人) {
      era.print(
        `${clitoris_word(cid)},乳房,肛门点数+${chara(cid).system.欲望 * y * 8 + chara(cid).system.顺从 * y * 8 + 8}`,
      );
      // JUEL:cid[0] + = (ABL:cid[11] * y * 8 + ABL:cid[10] * y * 8 + 8)（变量语义：JUEL 族，cid[0] +）
      era.add(
        `juel:${cid}:0`,
        chara(cid).system.欲望 * y * 8 + chara(cid).system.顺从 * y * 8 + 8,
      );
      // JUEL:cid[14] + = (ABL:cid[11] * y * 8 + ABL:cid[10] * y * 8 + 8)（变量语义：JUEL 族，cid[14] +）
      era.add(
        `juel:${cid}:14`,
        chara(cid).system.欲望 * y * 8 + chara(cid).system.顺从 * y * 8 + 8,
      );
      // JUEL:cid[2] + = (ABL:cid[11] * y * 8 + ABL:cid[10] * y * 8 + 8)（变量语义：JUEL 族，cid[2] +）
      era.add(
        `juel:${cid}:2`,
        chara(cid).system.欲望 * y * 8 + chara(cid).system.顺从 * y * 8 + 8,
      );
    } else {
      era.print(
        `${clitoris_word(cid)},乳房,肛门,私处点数+${chara(cid).system.欲望 * y * 8 + chara(cid).system.顺从 * y * 8 + 8}`,
      );
      // JUEL:cid[0] + = (ABL:cid[11] * y * 8 + ABL:cid[10] * y * 8 + 8)（变量语义：JUEL 族，cid[0] +）
      era.add(
        `juel:${cid}:0`,
        chara(cid).system.欲望 * y * 8 + chara(cid).system.顺从 * y * 8 + 8,
      );
      // JUEL:cid[14] + = (ABL:cid[11] * y * 8 + ABL:cid[10] * y * 8 + 8)（变量语义：JUEL 族，cid[14] +）
      era.add(
        `juel:${cid}:14`,
        chara(cid).system.欲望 * y * 8 + chara(cid).system.顺从 * y * 8 + 8,
      );
      // JUEL:cid[1] + = (ABL:cid[11] * y * 8 + ABL:cid[10] * y * 8 + 8)（变量语义：JUEL 族，cid[1] +）
      era.add(
        `juel:${cid}:1`,
        chara(cid).system.欲望 * y * 8 + chara(cid).system.顺从 * y * 8 + 8,
      );
      // JUEL:cid[2] + = (ABL:cid[11] * y * 8 + ABL:cid[10] * y * 8 + 8)（变量语义：JUEL 族，cid[2] +）
      era.add(
        `juel:${cid}:2`,
        chara(cid).system.欲望 * y * 8 + chara(cid).system.顺从 * y * 8 + 8,
      );
    }
    await era.printAndWait(
      `话术+${chara(cid).system.欲望 * y * 8 + chara(cid).system.顺从 * y * 8 + 8}`,
    );
    // JUEL:cid[7] + = (ABL:cid[11] * y * 8 + ABL:cid[10] * y * 8 + 8)（变量语义：JUEL 族，cid[7] +）
    era.add(
      `juel:${cid}:7`,
      chara(cid).system.欲望 * y * 8 + chara(cid).system.顺从 * y * 8 + 8,
    );
  } else if (chara(cid).system.反抗刻印 >= 1) {
    await era.printAndWait(
      `${name_of(cid)}被链子锁着，用充满杀意的目光望着你。`,
    );

    await era.printAndWait(`但已经被调教过的身体是诚实的...`);

    era.print(
      `屈服,欲情,恭顺,耻情点数+${chara(cid).system.欲望 * y * 5 + chara(cid).system.顺从 * y * 5 + 5}`,
    );
    // JUEL:cid[6] + = (ABL:cid[11] * y * 5 + ABL:cid[10] * y * 5 + 5)（变量语义：JUEL 族，cid[6] +）
    era.add(
      `juel:${cid}:6`,
      chara(cid).system.欲望 * y * 5 + chara(cid).system.顺从 * y * 5 + 5,
    );
    // JUEL:cid[5] + = (ABL:cid[11] * y * 5 + ABL:cid[10] * y * 5 + 5)（变量语义：JUEL 族，cid[5] +）
    era.add(
      `juel:${cid}:5`,
      chara(cid).system.欲望 * y * 5 + chara(cid).system.顺从 * y * 5 + 5,
    );
    // JUEL:cid[4] + = (ABL:cid[11] * y * 5 + ABL:cid[10] * y * 5 + 5)（变量语义：JUEL 族，cid[4] +）
    era.add(
      `juel:${cid}:4`,
      chara(cid).system.欲望 * y * 5 + chara(cid).system.顺从 * y * 5 + 5,
    );
    // JUEL:cid[8] + = (ABL:cid[11] * y * 5 + ABL:cid[10] * y * 5 + 5)（变量语义：JUEL 族，cid[8] +）
    era.add(
      `juel:${cid}:8`,
      chara(cid).system.欲望 * y * 5 + chara(cid).system.顺从 * y * 5 + 5,
    );
  } else {
    await era.printAndWait(`${name_of(cid)}被链子锁着，放弃了似得自暴自弃。`);

    await era.printAndWait(`被恐惧、羞耻与绝望侵蚀着...`);

    await era.printAndWait(
      `屈服,恐惧,痛苦点数+${chara(cid).system.欲望 * y * 2 + chara(cid).system.顺从 * y * 2 + 2}`,
    );
    // JUEL:cid[6] + = (ABL:cid[11] * y * 2 + ABL:cid[10] * y * 2 + 2)（变量语义：JUEL 族，cid[6] +）
    era.add(
      `juel:${cid}:6`,
      chara(cid).system.欲望 * y * 2 + chara(cid).system.顺从 * y * 2 + 2,
    );
    // JUEL:cid[9] + = (ABL:cid[11] * y * 2 + ABL:cid[10] * y * 2 + 2)（变量语义：JUEL 族，cid[9] +）
    era.add(
      `juel:${cid}:9`,
      chara(cid).system.欲望 * y * 2 + chara(cid).system.顺从 * y * 2 + 2,
    );
    // JUEL:cid[10] + = (ABL:cid[11] * y * 2 + ABL:cid[10] * y * 2 + 2)（变量语义：JUEL 族，cid[10] +）
    era.add(
      `juel:${cid}:10`,
      chara(cid).system.欲望 * y * 2 + chara(cid).system.顺从 * y * 2 + 2,
    );
  }

  await era.waitAnyKey();
  return y;
}

// @MARRIAGE_DAY_LOVERS,cid[0],cid[1]
// 源范围 :514-526
async function marriage_day_lovers(lover_type, cid, rand = default_rand) {
  const lover_name = lover_display_name(lover_type);
  era.print(`${name_of(cid)}和${lover_name}一起生活着。`);
  await dungeon_town_lover(cid, rand);
  await era.waitAnyKey();
  return 0;
}

// 源范围 :527-554
async function marriage_day_slave(cid, spouse) {
  era.print(
    `${name_of(cid)}和${spouse < 0 ? '奴隶' : name_of(spouse)}一起生活着。`,
  );
  await era.waitAnyKey();
  return 0;
}

// 源范围 :555-753
async function orc_marriage_day(cid, y = 1, rand = default_rand) {
  await era.printAndWait(
    `${name_of(cid)}和${marriage_name(cid)}在洞穴里生活着。`,
  );

  let jump_to_day40 = false;
  if (cid == 0 && chara(cid).chara.结婚爱情 < 40) {
    if (rand(2) == 0) {
      if (
        chara(cid).chara.私处封印 == 1 ||
        (chara(cid).chara.特别服装类型 == 79 &&
          chara(cid).train.着衣状态 & 64 &&
          game.system.着衣系统) ||
        chara(cid).chara.男人 == 1
      ) {
        await era.printAndWait(
          `${name_of(cid)}好像为变成${marriage_name(cid)}的精液便器而喜悦着……`,
        );
        era.print(`肛门经验+${y}`);
        era.print(`口交经验+${y}`);
        era.print(`精液经验+${y}`);
        // EXP[0] + = y（变量语义：EXP 族，(cid)[0] +）
        era.add(`exp:${cid}:0`, y);
        // EXP[22] + = y（变量语义：EXP 族，(cid)[22] +）
        era.add(`exp:${cid}:22`, y);
        // EXP[20] + = y（变量语义：EXP 族，(cid)[20] +）
        era.add(`exp:${cid}:20`, y);
      } else {
        await era.printAndWait(
          `${name_of(cid)}好像为变成${marriage_name(cid)}的精液便器而喜悦着……`,
        );
        era.print(`私处经验+${y}`);
        era.print(`肛门经验+${y}`);
        era.print(`口交经验+${y}`);
        era.print(`精液经验+${y}`);
        // EXP[0] + = y（变量语义：EXP 族，(cid)[0] +）
        era.add(`exp:${cid}:0`, y);
        // EXP[1] + = y（变量语义：EXP 族，(cid)[1] +）
        era.add(`exp:${cid}:1`, y);
        // EXP[22] + = y（变量语义：EXP 族，(cid)[22] +）
        era.add(`exp:${cid}:22`, y);
        // EXP[20] + = y（变量语义：EXP 族，(cid)[20] +）
        era.add(`exp:${cid}:20`, y);
        // CFLAG[107] + = y（变量语义：CFLAG 族，(cid)[107] +）
        era.add(`cflag:${cid}:107`, y);
      }
      await era.waitAnyKey();
      return y;
    } else if (chara(cid).chara.结婚爱情 > 40) {
      // RAW: GOTO ORC_MARRIAGE_DAY40
      jump_to_day40 = true;
    } else {
      await era.printAndWait(
        `${name_of(cid)}在${marriage_name(cid)}身上感到了爱意。`,
      );
      era.print(`口交经验+${y}`);
      era.print(`精液经验+${y}`);
      // EXP[22] + = y（变量语义：EXP 族，(cid)[22] +）
      era.add(`exp:${cid}:22`, y);
      // EXP[20] + = y（变量语义：EXP 族，(cid)[20] +）
      era.add(`exp:${cid}:20`, y);
      await era.waitAnyKey();
      return y;
    }
  }
  if (jump_to_day40 || chara(cid).chara.结婚爱情 > 40) {
    // RAW: $ORC_MARRIAGE_DAY40

    y = 10 + chara(cid).system.欲望 + chara(cid).train.侍奉技术;
    if (rand(2) == 0) {
      let description = name_of(cid);

      if (chara(cid).system.露出癖 >= 3) {
        description += `在众多${marriage_name(cid)}包围之下，`;
      }

      if (chara(cid).chara.结婚爱情 > 60) {
        description += '已经非常坦然了。';
      }
      if (chara(cid).chara.私处封印 == 1 || chara(cid).chara.男人 == 1) {
        description += '用手指撑开肛门，';
      } else {
        description += '张开大腿，';
      }
      await era.printAndWait(
        `${description}主动引诱${marriage_name(cid)}们进行`,
      );
      if (rand(2) == 0) {
        await era.printAndWait('性欲的处理，并因为成为便器而感到喜悦……');
      } else {
        await era.printAndWait('精液的处理，并因为成为便器而感到喜悦……');
      }
      if (chara(cid).chara.男人) {
        await era.printAndWait(`淫荡地摇着屁股迎合起轮奸的肛交活动`);
      } else {
        await era.printAndWait(`淫荡地摇着腰肢迎合起轮奸的性交活动`);
      }
      await era.printAndWait(
        `上下的穴口都忘记何为廉耻那般地，榨取着${marriage_name(cid)}们的精液……`,
      );
      if (chara(cid).chara.私处封印 == 1 || chara(cid).chara.男人 == 1) {
        era.print(`肛门,性交,口交,精液经验+${y + 5}`);
        // EXP[0] + = y + 5（变量语义：EXP 族，(cid)[0] +）
        era.add(`exp:${cid}:0`, y + 5);
        // EXP[5] + = y + 5（变量语义：EXP 族，(cid)[5] +）
        era.add(`exp:${cid}:5`, y + 5);
        // EXP[22] + = y + 5（变量语义：EXP 族，(cid)[22] +）
        era.add(`exp:${cid}:22`, y + 5);
        // EXP[20] + = y + 5（变量语义：EXP 族，(cid)[20] +）
        era.add(`exp:${cid}:20`, y + 5);
        era.print(
          `${clitoris_word(cid)},乳房,肛门点数+${chara(cid).chara.结婚爱情 * y + 5}`,
        );
        // JUEL:cid[0] + = (CFLAG:cid[602] * y + 5)（变量语义：JUEL 族，cid[0] +）
        era.add(`juel:${cid}:0`, chara(cid).chara.结婚爱情 * y + 5);
        // JUEL:cid[14] + = (CFLAG:cid[602] * y + 5)（变量语义：JUEL 族，cid[14] +）
        era.add(`juel:${cid}:14`, chara(cid).chara.结婚爱情 * y + 5);
        // JUEL:cid[2] + = (CFLAG:cid[602] * y + 5)（变量语义：JUEL 族，cid[2] +）
        era.add(`juel:${cid}:2`, chara(cid).chara.结婚爱情 * y + 5);
      } else {
        era.print(`私处,肛门,性交,口交,精液经验+${y}`);
        // EXP[0] + = y（变量语义：EXP 族，(cid)[0] +）
        era.add(`exp:${cid}:0`, y);
        // EXP[1] + = y（变量语义：EXP 族，(cid)[1] +）
        era.add(`exp:${cid}:1`, y);
        // EXP[5] + = y（变量语义：EXP 族，(cid)[5] +）
        era.add(`exp:${cid}:5`, y);
        // EXP[22] + = y（变量语义：EXP 族，(cid)[22] +）
        era.add(`exp:${cid}:22`, y);
        // EXP[20] + = y（变量语义：EXP 族，(cid)[20] +）
        era.add(`exp:${cid}:20`, y);
        // CFLAG[107] + = y（变量语义：CFLAG 族，(cid)[107] +）
        era.add(`cflag:${cid}:107`, y);
        era.print(
          `${clitoris_word(cid)},乳房,私处,肛门点数+${chara(cid).chara.结婚爱情 * y}`,
        );
        // JUEL:cid[0] + = (CFLAG:cid[602] * y)（变量语义：JUEL 族，cid[0] +）
        era.add(`juel:${cid}:0`, chara(cid).chara.结婚爱情 * y);
        // JUEL:cid[14] + = (CFLAG:cid[602] * y)（变量语义：JUEL 族，cid[14] +）
        era.add(`juel:${cid}:14`, chara(cid).chara.结婚爱情 * y);
        // JUEL:cid[2] + = (CFLAG:cid[602] * y)（变量语义：JUEL 族，cid[2] +）
        era.add(`juel:${cid}:2`, chara(cid).chara.结婚爱情 * y);
        // JUEL:cid[1] + = (CFLAG:cid[602] * y)（变量语义：JUEL 族，cid[1] +）
        era.add(`juel:${cid}:1`, chara(cid).chara.结婚爱情 * y);
      }
      era.print(
        `屈服,欲情,恭顺,耻情点数+${chara(cid).chara.结婚爱情 * 15 * y + 5}`,
      );
      // JUEL:cid[6] + = (CFLAG:cid[602] * 25 * y + 5 )（变量语义：JUEL 族，cid[6] +）
      era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 25 * y + 5);
      // JUEL:cid[5] + = (CFLAG:cid[602] * 25 * y + 5 )（变量语义：JUEL 族，cid[5] +）
      era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 25 * y + 5);
      // JUEL:cid[4] + = (CFLAG:cid[602] * 25 * y + 5 )（变量语义：JUEL 族，cid[4] +）
      era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 25 * y + 5);
      // JUEL:cid[8] + = (CFLAG:cid[602] * 25 * y + 5 )（变量语义：JUEL 族，cid[8] +）
      era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 25 * y + 5);
      era.print(`苦痛点数+${chara(cid).system.顺从 * y * 50 + 10}`);
      // JUEL:cid[9] + = (ABL:cid[10] * y * 50 + 10 )（变量语义：JUEL 族，cid[9] +）
      era.add(`juel:${cid}:9`, chara(cid).system.顺从 * y * 50 + 10);
      era.print(`绝顶,异常,被虐经验+${Math.trunc((y * 3) / 2)}`);
      // EXP:cid[2] + = Math.trunc(y * 3 / 2)（变量语义：EXP 族，cid[2] +）
      era.add(`exp:${cid}:2`, Math.trunc((y * 3) / 2));
      // EXP:cid[50] + = Math.trunc(y * 3 / 2)（变量语义：EXP 族，cid[50] +）
      era.add(`exp:${cid}:50`, Math.trunc((y * 3) / 2));
      // EXP:cid[30] + = Math.trunc(y * 3 / 2)（变量语义：EXP 族，cid[30] +）
      era.add(`exp:${cid}:30`, Math.trunc((y * 3) / 2));
    } else {
      await era.printAndWait(
        `${name_of(cid)}一闻到${marriage_name(cid)}的肉棒味道就发情了`,
      );
      await era.printAndWait(
        `眼神迷离饥渴地左右吸吮着，迫不及待地侍奉着复数${marriage_name(cid)}们的肉棒……`,
      );
      await era.printAndWait(
        `${name_of(cid)}沐浴在${marriage_name(cid)}的精液里感到了爱意。`,
      );
      era.print(`口交,精液经验+${y}`);
      // EXP[22] + = y（变量语义：EXP 族，(cid)[22] +）
      era.add(`exp:${cid}:22`, y);
      // EXP[20] + = y（变量语义：EXP 族，(cid)[20] +）
      era.add(`exp:${cid}:20`, y);

      era.print(
        `屈服,欲情,恭顺,耻情点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`,
      );
      // JUEL:cid[6] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[6] +）
      era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[5] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[5] +）
      era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[4] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[4] +）
      era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[8] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[8] +）
      era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      era.print(
        `${clitoris_word(cid)},乳房点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`,
      );
      // JUEL:cid[0] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[0] +）
      era.add(`juel:${cid}:0`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[14] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[14] +）
      era.add(`juel:${cid}:14`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      era.print(`饮精绝顶, 异常,被虐经验+${Math.trunc(y / 2)}`);
      // EXP:cid[8] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[8] +）
      era.add(`exp:${cid}:8`, Math.trunc(y / 2));
      // EXP:cid[50] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[50] +）
      era.add(`exp:${cid}:50`, Math.trunc(y / 2));
      // EXP:cid[30] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[30] +）
      era.add(`exp:${cid}:30`, Math.trunc(y / 2));
    }
  } else if (chara(cid).train.性交中毒 >= 1) {
    y = chara(cid).system.欲望 + chara(cid).train.性交中毒;
    await era.printAndWait(
      `数量众多的${marriage_name(cid)}轮奸着${name_of(cid)}……`,
    );
    era.print(
      pick(
        [
          `${name_of(cid)}根本分不清楚插入身体里或者嘴里的是不是丈夫还是其他人的肉棒`,
          `${marriage_name(cid)}们包围着${name_of(cid)}，像是不知停歇的马达那样耸动着胯部`,
          `身上所有能用来性交的地方，全都被${marriage_name(cid)}的肉棒侵犯`,
        ],
        rand,
      ),
    );
    era.print(
      pick(
        [
          `上下的穴口被不停灌注着精液后，又被其他人的肉棒堵的满满的`,
          `一股股浓浊的${marriage_name(cid)}精液不停地灌入${name_of(cid)}的腹中`,
        ],
        rand,
      ),
    );
    if (chara(cid).chara.私处封印 == 1 || chara(cid).chara.男人 == 1) {
      await era.printAndWait(
        `在轮番交替的性交中，${name_of(cid)}的肛门几乎被操到几乎无法合拢`,
      );
      await era.printAndWait(
        `${name_of(cid)}沈醉在被${marriage_name(cid)}们轮奸的喜悦之中了……`,
      );
      era.print(`肛门,口交,性交,精液经验+${y}`);
      // EXP[1] + = y（变量语义：EXP 族，(cid)[1] +）
      era.add(`exp:${cid}:1`, y);
      era.print(
        `${clitoris_word(cid)},乳房,肛门点数+${chara(cid).chara.结婚爱情 * y + 10}`,
      );
      // JUEL:cid[2] + = (CFLAG:cid[602] * y + 10)（变量语义：JUEL 族，cid[2] +）
      era.add(`juel:${cid}:2`, chara(cid).chara.结婚爱情 * y + 10);
    } else {
      await era.printAndWait(
        `在轮番交替的性交中，${name_of(cid)}的小穴几乎被操到几乎无法合拢`,
      );
      await era.printAndWait(
        `${name_of(cid)}沈醉在被${marriage_name(cid)}们轮奸的喜悦之中了……`,
      );
      era.print(`私处,口交,性交,精液经验+${y}`);
      // EXP[0] + = y（变量语义：EXP 族，(cid)[0] +）
      era.add(`exp:${cid}:0`, y);
      // CFLAG[107] + = y（变量语义：CFLAG 族，(cid)[107] +）
      era.add(`cflag:${cid}:107`, y);
      era.print(
        `${clitoris_word(cid)},乳房,私处点数+${chara(cid).chara.结婚爱情 * y + 10}`,
      );
      // JUEL:cid[1] + = (CFLAG:cid[602] * y + 10)（变量语义：JUEL 族，cid[1] +）
      era.add(`juel:${cid}:1`, chara(cid).chara.结婚爱情 * y + 10);
    }
    // EXP[22] + = y（变量语义：EXP 族，(cid)[22] +）
    era.add(`exp:${cid}:22`, y);
    // EXP[5] + = y（变量语义：EXP 族，(cid)[5] +）
    era.add(`exp:${cid}:5`, y);
    // EXP[20] + = y（变量语义：EXP 族，(cid)[20] +）
    era.add(`exp:${cid}:20`, y);
    // JUEL:cid[0] + = (CFLAG:cid[602] * y + 10)（变量语义：JUEL 族，cid[0] +）
    era.add(`juel:${cid}:0`, chara(cid).chara.结婚爱情 * y + 10);
    // JUEL:cid[14] + = (CFLAG:cid[602] * y + 10)（变量语义：JUEL 族，cid[14] +）
    era.add(`juel:${cid}:14`, chara(cid).chara.结婚爱情 * y + 10);

    era.print(
      `屈服,欲情,恭顺,耻情点数+${chara(cid).chara.结婚爱情 * 20 * y + 10}`,
    );
    // JUEL:cid[6] + = (CFLAG:cid[602] * 20 * y + 10 )（变量语义：JUEL 族，cid[6] +）
    era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 20 * y + 10);
    // JUEL:cid[5] + = (CFLAG:cid[602] * 20 * y + 10 )（变量语义：JUEL 族，cid[5] +）
    era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 20 * y + 10);
    // JUEL:cid[4] + = (CFLAG:cid[602] * 20 * y + 10 )（变量语义：JUEL 族，cid[4] +）
    era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 20 * y + 10);
    // JUEL:cid[8] + = (CFLAG:cid[602] * 20 * y + 10 )（变量语义：JUEL 族，cid[8] +）
    era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 20 * y + 10);
    era.print(`绝顶经验+${Math.trunc(y / 2)}`);
    // EXP:cid[2] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[2] +）
    era.add(`exp:${cid}:2`, Math.trunc(y / 2));
    await era.printAndWait(`异常,被虐经验+${y}`);
    // EXP:cid[50] + = y（变量语义：EXP 族，cid[50] +）
    era.add(`exp:${cid}:50`, y);
    // EXP:cid[30] + = y（变量语义：EXP 族，cid[30] +）
    era.add(`exp:${cid}:30`, y);
  } else {
    if (rand(2)) {
      await era.printAndWait(
        `${name_of(cid)}作为${marriage_name(cid)}的妻子，被强迫进行着精液处理的服务。`,
      );
      era.print(`口交,精液经验+${y}`);
      // EXP[22] + = y（变量语义：EXP 族，(cid)[22] +）
      era.add(`exp:${cid}:22`, y);
      // EXP[20] + = y（变量语义：EXP 族，(cid)[20] +）
      era.add(`exp:${cid}:20`, y);
    } else {
      await era.printAndWait(
        `${name_of(cid)}被${marriage_name(cid)}压在地板上侵犯，强制履行着夫妻的义务。`,
      );
      if (chara(cid).chara.男人) {
        era.print(`肛门,性交,精液经验+${y}`);
        // EXP[1] + = y（变量语义：EXP 族，(cid)[1] +）
        era.add(`exp:${cid}:1`, y);
      } else {
        era.print(`私处,性交,精液经验+${y}`);
        // EXP[0] + = y（变量语义：EXP 族，(cid)[0] +）
        era.add(`exp:${cid}:0`, y);
      }
      // EXP[5] + = y（变量语义：EXP 族，(cid)[5] +）
      era.add(`exp:${cid}:5`, y);
      // EXP[20] + = y（变量语义：EXP 族，(cid)[20] +）
      era.add(`exp:${cid}:20`, y);
    }

    era.print(
      `屈服,欲情,恭顺,耻情点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`,
    );
    // JUEL:cid[6] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[6] +）
    era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 10 * y + 10);
    // JUEL:cid[5] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[5] +）
    era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 10 * y + 10);
    // JUEL:cid[4] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[4] +）
    era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 10 * y + 10);
    // JUEL:cid[8] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[8] +）
    era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 10 * y + 10);
  }
  await era.waitAnyKey();
  return y;
}

// @SLIME_MARRIAGE_DAY,cid
// 源范围 :754-784
async function slime_marriage_day(cid, y = 1) {
  await era.printAndWait(`${name_of(cid)}和${marriage_name(cid)}一同生活着。`);

  await era.printAndWait(
    `${marriage_name(cid)}在${she(cid)}身上所有能进入的洞口里来回蠕动着.....`,
  );
  if (chara(cid).system.欲望 >= 3) {
    await era.printAndWait(`${name_of(cid)}情不自禁的自慰了起来......`);
  }
  era.print(
    `屈服,欲情,恭顺,耻情点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`,
  );
  // JUEL:cid[6] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[6] +）
  era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 10 * y + 10);
  // JUEL:cid[5] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[5] +）
  era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 10 * y + 10);
  // JUEL:cid[4] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[4] +）
  era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 10 * y + 10);
  // JUEL:cid[8] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[8] +）
  era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 10 * y + 10);
  era.print(
    `${clitoris_word(cid)},乳房,肛门点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`,
  );
  // JUEL:cid[0] + = (CFLAG:cid[602] * 10 * y + 10)（变量语义：JUEL 族，cid[0] +）
  era.add(`juel:${cid}:0`, chara(cid).chara.结婚爱情 * 10 * y + 10);
  // JUEL:cid[14] + = (CFLAG:cid[602] * 10 * y + 10)（变量语义：JUEL 族，cid[14] +）
  era.add(`juel:${cid}:14`, chara(cid).chara.结婚爱情 * 10 * y + 10);
  // JUEL:cid[2] + = (CFLAG:cid[602] * 10 * y + 10)（变量语义：JUEL 族，cid[2] +）
  era.add(`juel:${cid}:2`, chara(cid).chara.结婚爱情 * 10 * y + 10);

  era.print(`绝顶经验+${Math.trunc(y / 2)}`);
  // EXP:cid[2] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[2] +）
  era.add(`exp:${cid}:2`, Math.trunc(y / 2));
  if (chara(cid).system.欲望 >= 3) {
    era.print(`自慰经验+${y}`);
  }
  if (chara(cid).system.欲望 >= 3) {
    // EXP:cid[10] + = y（变量语义：EXP 族，cid[10] +）
    era.add(`exp:${cid}:10`, y);
  }
  await era.printAndWait(`异常,被虐经验+${y}`);
  // EXP:cid[50] + = y（变量语义：EXP 族，cid[50] +）
  era.add(`exp:${cid}:50`, y);
  // EXP:cid[30] + = y（变量语义：EXP 族，cid[30] +）
  era.add(`exp:${cid}:30`, y);

  return y;
}

// @INSECT_MARRIAGE_DAY,cid
// 源范围 :785-1053
async function insect_marriage_day(cid, y = 1, rand = default_rand) {
  await era.printAndWait(`${name_of(cid)}和${marriage_name(cid)}一同生活着。`);

  if (chara(cid).chara.处女 == 0 && chara(cid).chara.男人 == 0) {
    if (
      rand(10) == 0 &&
      chara(cid).system.欲望 >= 5 &&
      chara(cid).chara.妊娠 == 0 &&
      chara(cid).chara.母乳体质 == 0
    ) {
      era.print(
        `今天的${marriage_name(cid)}似乎不太一样,在${name_of(cid)}的子宫肠道里产下大量的卵`,
      );
      era.print(`不一会${name_of(cid)}的肚子迅速的鼓了涨起来......`);
      era.print(
        `随着四散的尿液,百十只${marriage_name(cid)}幼虫从${name_of(cid)}的阴道和肛门里喷射出来.....`,
      );
      await era.printAndWait(
        `被折磨一天的${name_of(cid)}被${marriage_name(cid)}改造的肉体开始分泌乳汁.....`,
      );
      era.print(
        `欲情,屈服,耻情,苦痛,恐怖点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`,
      );
      // JUEL:cid[5] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[5] +）
      era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[6] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[6] +）
      era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[8] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[8] +）
      era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[9] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[9] +）
      era.add(`juel:${cid}:9`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[10] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[10] +）
      era.add(`juel:${cid}:10`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      era.print(
        `${clitoris_word(cid)},乳房,私处,肛门点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`,
      );
      // JUEL:cid[0] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[0] +）
      era.add(`juel:${cid}:0`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[14] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[14] +）
      era.add(`juel:${cid}:14`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[1] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[1] +）
      era.add(`juel:${cid}:1`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[2] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[2] +）
      era.add(`juel:${cid}:2`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      await era.printAndWait(`私处,肛门,异常,被虐经验+${y}`);
      // EXP:cid[1] + = y（变量语义：EXP 族，cid[1] +）
      era.add(`exp:${cid}:1`, y);
      // EXP:cid[0] + = y（变量语义：EXP 族，cid[0] +）
      era.add(`exp:${cid}:0`, y);
      // EXP:cid[50] + = y（变量语义：EXP 族，cid[50] +）
      era.add(`exp:${cid}:50`, y);
      // EXP:cid[30] + = y（变量语义：EXP 族，cid[30] +）
      era.add(`exp:${cid}:30`, y);
      era.print(`${name_of(cid)} 获得【${talent_name(130)}】`);
      era.print(`${name_of(cid)} 获得【${talent_name(190)}】`);
      await era.printAndWait(`${name_of(cid)} 获得【${talent_name(191)}】`);
      // TALENT:cid[130]  = 1（变量语义：TALENT 族，cid[130]）
      chara(cid).chara.母乳体质 = 1;
      // TALENT:cid[190]  = 1（变量语义：TALENT 族，cid[190]）
      era.set(`talent:${cid}:190`, 1);
      // TALENT:cid[191]  = 1（变量语义：TALENT 族，cid[191]）
      era.set(`talent:${cid}:191`, 1);
    } else if (
      rand(5) == 0 &&
      chara(cid).system.欲望 >= 5 &&
      chara(cid).chara.妊娠 == 0 &&
      chara(cid).chara.母乳体质 == 1 &&
      chara(cid).chara.母性 == 0
    ) {
      era.print(
        `赤裸着身体挺着巨大肚子正在打扫城堡的${name_of(cid)}突然双腿颤抖着扶着扫帚呻吟着.....`,
      );
      era.print(
        `尿液和乳汁四散飞溅,百余只${marriage_name(cid)}幼虫从${name_of(cid)}的阴道和肛门里喷射出来.「啊~~,真不乖,那么快出来了...」`,
      );
      await era.printAndWait(
        `良久,已经习惯多次产下${marriage_name(cid)}幼虫的${name_of(cid)}用慈爱的目光看着一地的孩子们,「哎,又要重新打扫了。」`,
      );
      era.print(
        `欲情,屈服,耻情,苦痛,恐怖点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`,
      );
      // JUEL:cid[5] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[5] +）
      era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[6] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[6] +）
      era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[8] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[8] +）
      era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[9] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[9] +）
      era.add(`juel:${cid}:9`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[10] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[10] +）
      era.add(`juel:${cid}:10`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      era.print(
        `${clitoris_word(cid)},乳房,私处,肛门点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`,
      );
      // JUEL:cid[0] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[0] +）
      era.add(`juel:${cid}:0`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[14] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[14] +）
      era.add(`juel:${cid}:14`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[1] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[1] +）
      era.add(`juel:${cid}:1`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[2] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[2] +）
      era.add(`juel:${cid}:2`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      await era.printAndWait(`私处,肛门,异常,被虐经验+${y}`);
      // EXP:cid[1] + = y（变量语义：EXP 族，cid[1] +）
      era.add(`exp:${cid}:1`, y);
      // EXP:cid[0] + = y（变量语义：EXP 族，cid[0] +）
      era.add(`exp:${cid}:0`, y);
      // EXP:cid[50] + = y（变量语义：EXP 族，cid[50] +）
      era.add(`exp:${cid}:50`, y);
      // EXP:cid[30] + = y（变量语义：EXP 族，cid[30] +）
      era.add(`exp:${cid}:30`, y);
      era.print(`${name_of(cid)} 获得【${talent_name(155)}】`);
      // TALENT:cid[155]  = 1（变量语义：TALENT 族，cid[155]）
      chara(cid).chara.母性 = 1;
    } else if (
      rand(5) <= 1 &&
      chara(cid).system.欲望 >= 5 &&
      chara(cid).chara.妊娠 == 0 &&
      chara(cid).chara.母性 == 1 &&
      chara(cid).chara.母乳体质 == 1 &&
      chara(cid).system.欲望 <= 9
    ) {
      era.print(
        `你无语地看着总是赤裸着身体在你面前表演《${marriage_name(cid)}出产秀》的 ${name_of(cid)}`,
      );
      era.print(`尿液,乳汁,肠液流了一地,幼虫正在吸食着一切.....`);
      era.print(
        `「魔王大人,好像食物不够啊,请您赏孩子一点」说完就给魔王做起了口舌侍奉.....`,
      );
      era.print(`${name_of(cid)}对你的好感度上升了 300`);
      await era.printAndWait(
        `${name_of(cid)}为了获得更多的体液,出去捕食了......`,
      );
      // CFLAG:cid[2] + = 300（变量语义：CFLAG 族，cid[2] +）
      chara(cid).chara.好感度 += 300;

      if (
        chara(cid).system.欲望 >= 5 &&
        obedience_points(cid) >= power(2, chara(cid).system.欲望 - 4) * 10000
      ) {
        // JUEL:cid[5] - = (power(2,(ABL:cid[11] - 4)) * 10000)（变量语义：JUEL 族，cid[5] -）
        era.add(
          `juel:${cid}:5`,
          -(power(2, chara(cid).system.欲望 - 4) * 10000),
        );
        // ABL:cid[11] + = 1（变量语义：ABL 族，cid[11] +）
        chara(cid).system.欲望 += 1;
        await era.printAndWait(`${name_of(cid)}欲望等级+1`);
        await era.printAndWait(
          `欲情点数减少${power(2, chara(cid).system.欲望 - 4) * 10000}`,
        );
      }
      y += chara(cid).system.欲望;
      era.print(`侍奉快乐经验,卖淫经验+${y * 10}`);
      // EXP:cid[21] + = y * 10（变量语义：EXP 族，cid[21] +）
      era.add(`exp:${cid}:21`, y * 10);
      // EXP:cid[74] + = y * 10（变量语义：EXP 族，cid[74] +）
      era.add(`exp:${cid}:74`, y * 10);
      era.print(
        `欲情,屈服,耻情,苦痛,恐怖点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`,
      );
      // JUEL:cid[5] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[5] +）
      era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[6] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[6] +）
      era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[8] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[8] +）
      era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[9] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[9] +）
      era.add(`juel:${cid}:9`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[10] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[10] +）
      era.add(`juel:${cid}:10`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      era.print(
        `${clitoris_word(cid)},乳房,私处,肛门点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`,
      );
      // JUEL:cid[0] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[0] +）
      era.add(`juel:${cid}:0`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[14] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[14] +）
      era.add(`juel:${cid}:14`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[1] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[1] +）
      era.add(`juel:${cid}:1`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[2] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[2] +）
      era.add(`juel:${cid}:2`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      await era.printAndWait(`私处,肛门,异常,被虐经验+${y}`);
      // EXP:cid[1] + = y（变量语义：EXP 族，cid[1] +）
      era.add(`exp:${cid}:1`, y);
      // EXP:cid[0] + = y（变量语义：EXP 族，cid[0] +）
      era.add(`exp:${cid}:0`, y);
      // EXP:cid[50] + = y（变量语义：EXP 族，cid[50] +）
      era.add(`exp:${cid}:50`, y);
      // EXP:cid[30] + = y（变量语义：EXP 族，cid[30] +）
      era.add(`exp:${cid}:30`, y);
      if (chara(cid).system.欲望 >= 8 && chara(cid).dungeon.妓女 == 0) {
        await era.printAndWait(
          `经常勾引男性和女性获得体液的${name_of(cid)}成为一出色的妓女,获得【${talent_name(180)}】`,
        );
      }
      if (chara(cid).system.欲望 >= 8 && chara(cid).dungeon.妓女 == 0) {
        // TALENT:cid[180]  = 1（变量语义：TALENT 族，cid[180]）
        era.set(`talent:${cid}:180`, 1);
      }

      if (chara(cid).system.欲望 >= 9 && chara(cid).dungeon.倾城 == 0) {
        if (
          chara(cid).dungeon.私处产卵 == 1 ||
          chara(cid).dungeon.直肠产卵 == 1 ||
          chara(cid).stronghold.蠕虫 == 1 ||
          chara(cid).stronghold.蠕虫 == 1
        ) {
          await era.printAndWait(
            `${name_of(cid)} 发现寄生在两穴的孩子影响到体液获取,只能清除了自己的寄生状态...`,
          );
          if (chara(cid).dungeon.私处产卵 == 1) {
            await era.printAndWait(
              `${name_of(cid)}失去【${talent_name(190)}】`,
            );
          }
          if (chara(cid).dungeon.直肠产卵 == 1) {
            await era.printAndWait(
              `${name_of(cid)}失去【${talent_name(191)}】`,
            );
          }
          if (chara(cid).stronghold.蠕虫 == 1) {
            await era.printAndWait(
              `${name_of(cid)}失去【${talent_name(192)}】`,
            );
          }
          if (chara(cid).dungeon.肛门虫 == 1) {
            await era.printAndWait(
              `${name_of(cid)}失去【${talent_name(193)}】`,
            );
          }
          if (chara(cid).dungeon.私处产卵 == 1) {
            // TALENT:cid[190]  = 0（变量语义：TALENT 族，cid[190]）
            era.set(`talent:${cid}:190`, 0);
          }
          if (chara(cid).dungeon.直肠产卵 == 1) {
            // TALENT:cid[191]  = 0（变量语义：TALENT 族，cid[191]）
            era.set(`talent:${cid}:191`, 0);
          }
          if (chara(cid).stronghold.蠕虫 == 1) {
            // TALENT:cid[192]  = 0（变量语义：TALENT 族，cid[192]）
            chara(cid).stronghold.蠕虫 = 0;
          }
          if (chara(cid).dungeon.肛门虫 == 1) {
            // TALENT:cid[193]  = 0（变量语义：TALENT 族，cid[193]）
            era.set(`talent:${cid}:193`, 0);
          }
        }

        await era.printAndWait(
          `为了获得跟多体液,${name_of(cid)}精心打扮自己,完美的展示了自己的淫荡的模样,获得【${talent_name(181)}】`,
        );
        // TALENT:cid[181]  = 1（变量语义：TALENT 族，cid[181]）
        era.set(`talent:${cid}:181`, 1);
      }

      if (chara(cid).system.欲望 == 10 && chara(cid).dungeon.巧言 == 0) {
        await era.printAndWait(
          `妓女工作让${name_of(cid)}懂得如何说得更多顾客并且如何呻吟来激发对方更深层的欲望,获得【${talent_name(182)}】`,
        );
      }
      if (chara(cid).system.欲望 == 10 && chara(cid).dungeon.巧言 == 0) {
        // TALENT:cid[182]  = 1（变量语义：TALENT 族，cid[182]）
        era.set(`talent:${cid}:182`, 1);
      }
    } else if (
      rand(5) <= 2 &&
      chara(cid).system.欲望 == 10 &&
      chara(cid).chara.妊娠 == 0 &&
      chara(cid).chara.母性 == 1 &&
      chara(cid).chara.母乳体质 == 1 &&
      chara(cid).dungeon.妓女 == 1 &&
      chara(cid).dungeon.倾城 == 1 &&
      chara(cid).dungeon.巧言 == 1 &&
      (chara(cid).dungeon.歌姫 == 0 ||
        chara(cid).dungeon.舞姫 == 0 ||
        chara(cid).dungeon.魅力 == 0 ||
        chara(cid).dungeon.高人气 == 0)
    ) {
      era.print(
        `为了获得更优质的体液,吸引强大的魔族注意${name_of(cid)}开始学习黑暗艺术.....`,
      );
      y += chara(cid).train.卖淫中毒 + chara(cid).system.欲望;

      era.print(
        `《如何利用高潮唱歌技巧大全》《跳跃与体液喷射》《自慰舞蹈精选》`,
      );
      await era.printAndWait(
        `《叫床,潮喷,灌肠,歌舞融合法则》《肉体极限与道具》奇怪的知识习得了....`,
      );

      if (chara(cid).dungeon.魅力 == 0 && chara(cid).train.卖淫中毒 >= 6) {
        await era.printAndWait(
          `舞蹈与歌唱学习让${name_of(cid)}更有气质了,${name_of(cid)}获得【${talent_name(113)}】`,
        );
      }
      if (chara(cid).dungeon.魅力 == 0 && chara(cid).train.卖淫中毒 >= 6) {
        // TALENT:cid[113]  = 0（变量语义：TALENT 族，cid[113]）
        era.set(`talent:${cid}:113`, 0);
      }
      if (chara(cid).dungeon.高人气 == 0 && chara(cid).train.卖淫中毒 >= 8) {
        await era.printAndWait(
          `淫贱与大胆的歌舞表演,让${name_of(cid)}获得更多人的关注,${name_of(cid)}获得【${talent_name(126)}】`,
        );
      }
      if (chara(cid).dungeon.高人气 == 0 && chara(cid).train.卖淫中毒 >= 8) {
        // TALENT:cid[126]  = 1（变量语义：TALENT 族，cid[126]）
        era.set(`talent:${cid}:126`, 1);
      }
      if (chara(cid).dungeon.歌姫 == 0 && chara(cid).train.卖淫中毒 == 10) {
        await era.printAndWait(
          `长久的学习与实践后${name_of(cid)}已经可以在灌肠喷射带来的绝顶高潮中完美的表演歌唱了,${name_of(cid)}获得【${talent_name(185)}】`,
        );
      }
      if (chara(cid).dungeon.歌姫 == 0) {
        // TALENT:cid[185]  = 1（变量语义：TALENT 族，cid[185]）
        era.set(`talent:${cid}:185`, 1);
      }

      if (chara(cid).dungeon.舞姫 == 0 && chara(cid).train.卖淫中毒 == 10) {
        era.print(
          `${name_of(cid)}在舞台上表演曼妙优美的舞姿,旋转跳跃中挥洒出乳汁,肠液,尿液与潮喷液构成的美妙4重绝顶,`,
        );
      }
      if (chara(cid).dungeon.舞姫 == 0 && chara(cid).train.卖淫中毒 == 10) {
        await era.printAndWait(
          `观众们集体鼓掌,并争先恐后给${name_of(cid)}的身体上涂满浓臭的精液或尿液,${name_of(cid)}获得【${talent_name(186)}】`,
        );
      }
      if (chara(cid).dungeon.舞姫 == 0 && chara(cid).train.卖淫中毒 == 10) {
        // TALENT:cid[186]  = 1（变量语义：TALENT 族，cid[186]）
        era.set(`talent:${cid}:186`, 1);
      }

      await era.printAndWait(`卖淫经验+ ${y * 10}`);
      // EXP:cid[74] + = y * 10（变量语义：EXP 族，cid[74] +）
      era.add(`exp:${cid}:74`, y * 10);
      era.print(
        `欲情,屈服,耻情,苦痛,恐怖点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`,
      );
      // JUEL:cid[5] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[5] +）
      era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[6] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[6] +）
      era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[8] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[8] +）
      era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[9] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[9] +）
      era.add(`juel:${cid}:9`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[10] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[10] +）
      era.add(`juel:${cid}:10`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      era.print(
        `${clitoris_word(cid)},乳房,私处,肛门点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`,
      );
      // JUEL:cid[0] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[0] +）
      era.add(`juel:${cid}:0`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[14] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[14] +）
      era.add(`juel:${cid}:14`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[1] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[1] +）
      era.add(`juel:${cid}:1`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[2] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[2] +）
      era.add(`juel:${cid}:2`, chara(cid).chara.结婚爱情 * 5 * y + 5);

      if (
        chara(cid).train.卖淫中毒 <= 9 &&
        desire_points(cid) >= power(2, chara(cid).train.卖淫中毒) * 1500 &&
        obedience_points(cid) >= power(2, chara(cid).train.卖淫中毒) * 2000 &&
        submission_points(cid) >= power(2, chara(cid).train.卖淫中毒) * 1000 &&
        chara(cid).dungeon.卖淫经验 >= power(2, chara(cid).train.卖淫中毒) * 20
      ) {
        // JUEL:cid[4] - = (power(2,(ABL:cid[37])) * 1500)（变量语义：JUEL 族，cid[4] -）
        era.add(`juel:${cid}:4`, -(power(2, chara(cid).train.卖淫中毒) * 1500));
        // JUEL:cid[5] - = (power(2,(ABL:cid[37])) * 2000)（变量语义：JUEL 族，cid[5] -）
        era.add(`juel:${cid}:5`, -(power(2, chara(cid).train.卖淫中毒) * 2000));
        // JUEL:cid[6] - = (power(2,(ABL:cid[37])) * 1000)（变量语义：JUEL 族，cid[6] -）
        era.add(`juel:${cid}:6`, -(power(2, chara(cid).train.卖淫中毒) * 1000));
        // EXP:cid[74] - = (power(2,(ABL:cid[37])) * 20)（变量语义：EXP 族，cid[74] -）
        era.add(`exp:${cid}:74`, -(power(2, chara(cid).train.卖淫中毒) * 20));
        // ABL:cid[37] + = 1（变量语义：ABL 族，cid[37] +）
        chara(cid).train.卖淫中毒 += 1;
        await era.printAndWait(`${name_of(cid)}卖淫等级+1`);
        era.print(`恭顺点数减少${power(2, chara(cid).train.卖淫中毒) * 1500}`);
        era.print(`情欲点数减少${power(2, chara(cid).train.卖淫中毒) * 2000}`);
        era.print(`情欲点数减少${power(2, chara(cid).train.卖淫中毒) * 1000}`);
        await era.printAndWait(
          `卖淫经验减少${power(2, chara(cid).train.卖淫中毒) * 20}`,
        );
      }
      await era.printAndWait(`私处,肛门,异常,被虐经验+${y}`);
      // EXP:cid[1] + = y（变量语义：EXP 族，cid[1] +）
      era.add(`exp:${cid}:1`, y);
      // EXP:cid[0] + = y（变量语义：EXP 族，cid[0] +）
      era.add(`exp:${cid}:0`, y);
      // EXP:cid[50] + = y（变量语义：EXP 族，cid[50] +）
      era.add(`exp:${cid}:50`, y);
      // EXP:cid[30] + = y（变量语义：EXP 族，cid[30] +）
      era.add(`exp:${cid}:30`, y);
    } else if (
      chara(cid).chara.结婚爱情 >= 10 &&
      chara(cid).system.欲望 == 10 &&
      chara(cid).train.卖淫中毒 == 10 &&
      chara(cid).chara.妊娠 == 0 &&
      chara(cid).chara.母性 == 1 &&
      chara(cid).chara.母乳体质 == 1 &&
      chara(cid).dungeon.妓女 == 1 &&
      chara(cid).dungeon.巧言 == 1 &&
      chara(cid).dungeon.歌姫 == 1 &&
      chara(cid).dungeon.舞姫 == 1 &&
      chara(cid).dungeon.倾城 == 1 &&
      chara(cid).dungeon.魅力 == 1 &&
      chara(cid).dungeon.高人气 == 1 &&
      chara(cid).dungeon.苗床 == 0
    ) {
      y += 20;
      await era.printAndWait(
        `万众瞩目的${name_of(cid)}发现自己偏离的当初抚养孩子的本意,决定放弃了一切.......`,
      );
      if (chara(cid).dungeon.战士 == 1) {
        // TALENT:cid[200]  = 0（变量语义：TALENT 族，cid[200]）
        era.set(`talent:${cid}:200`, 0);
      }
      if (chara(cid).dungeon.魔法师 == 1) {
        // TALENT:cid[201]  = 0（变量语义：TALENT 族，cid[201]）
        era.set(`talent:${cid}:201`, 0);
      }
      if (chara(cid).dungeon.神官 == 1) {
        // TALENT:cid[202]  = 0（变量语义：TALENT 族，cid[202]）
        era.set(`talent:${cid}:202`, 0);
      }
      if (chara(cid).dungeon.盗贼 == 1) {
        // TALENT:cid[203]  = 0（变量语义：TALENT 族，cid[203]）
        era.set(`talent:${cid}:203`, 0);
      }
      if (chara(cid).dungeon.肉便器 == 1) {
        // TALENT:cid[204]  = 0（变量语义：TALENT 族，cid[204]）
        era.set(`talent:${cid}:204`, 0);
      }
      if (chara(cid).dungeon.骑士 == 1) {
        // TALENT:cid[205]  = 0（变量语义：TALENT 族，cid[205]）
        era.set(`talent:${cid}:205`, 0);
      }
      if (chara(cid).dungeon.巫女 == 1) {
        // TALENT:cid[206]  = 0（变量语义：TALENT 族，cid[206]）
        era.set(`talent:${cid}:206`, 0);
      }
      if (chara(cid).dungeon.忍者 == 1) {
        // TALENT:cid[207]  = 0（变量语义：TALENT 族，cid[207]）
        era.set(`talent:${cid}:207`, 0);
      }
      if (chara(cid).dungeon.弓手 == 1) {
        // TALENT:cid[208]  = 0（变量语义：TALENT 族，cid[208]）
        era.set(`talent:${cid}:208`, 0);
      }
      await era.printAndWait(
        `${name_of(cid)}准备安心的做个母亲....直到魔王的召唤....`,
      );
      if (chara(cid).dungeon.苗床 == 0) {
        // TALENT:cid[209]  = 1（变量语义：TALENT 族，cid[209]）
        era.set(`talent:${cid}:209`, 1);
      }
      await era.printAndWait(`${name_of(cid)}变成了【${talent_name(209)}】`);
      era.print(
        `欲情,屈服,耻情,苦痛,恐怖点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`,
      );
      // JUEL:cid[5] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[5] +）
      era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[6] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[6] +）
      era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[8] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[8] +）
      era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[9] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[9] +）
      era.add(`juel:${cid}:9`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[10] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[10] +）
      era.add(`juel:${cid}:10`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      era.print(
        `${clitoris_word(cid)},乳房,私处,肛门点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`,
      );
      // JUEL:cid[0] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[0] +）
      era.add(`juel:${cid}:0`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[14] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[14] +）
      era.add(`juel:${cid}:14`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[1] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[1] +）
      era.add(`juel:${cid}:1`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[2] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[2] +）
      era.add(`juel:${cid}:2`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      await era.printAndWait(`私处,肛门,异常,被虐经验+${y}`);
      // EXP:cid[1] + = y（变量语义：EXP 族，cid[1] +）
      era.add(`exp:${cid}:1`, y);
      // EXP:cid[0] + = y（变量语义：EXP 族，cid[0] +）
      era.add(`exp:${cid}:0`, y);
      // EXP:cid[50] + = y（变量语义：EXP 族，cid[50] +）
      era.add(`exp:${cid}:50`, y);
      // EXP:cid[30] + = y（变量语义：EXP 族，cid[30] +）
      era.add(`exp:${cid}:30`, y);
    } else {
      await era.printAndWait(
        `大量的${marriage_name(cid)}附着在${name_of(cid)}的身上`,
      );
      await era.printAndWait(`甚至深入到两穴里蠕动....不停地钻入钻出.....`);
      era.print(
        `欲情,屈服,耻情,苦痛,恐怖点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`,
      );
      // JUEL:cid[5] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[5] +）
      era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      // JUEL:cid[6] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[6] +）
      era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      // JUEL:cid[8] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[8] +）
      era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      // JUEL:cid[9] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[9] +）
      era.add(`juel:${cid}:9`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      // JUEL:cid[10] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[10] +）
      era.add(`juel:${cid}:10`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      era.print(
        `${clitoris_word(cid)},乳房,私处,肛门点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`,
      );
      // JUEL:cid[0] + = (CFLAG:cid[602] * 10 * y + 10)（变量语义：JUEL 族，cid[0] +）
      era.add(`juel:${cid}:0`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      // JUEL:cid[14] + = (CFLAG:cid[602] * 10 * y + 10)（变量语义：JUEL 族，cid[14] +）
      era.add(`juel:${cid}:14`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      // JUEL:cid[2] + = (CFLAG:cid[602] * 10 * y + 10)（变量语义：JUEL 族，cid[2] +）
      era.add(`juel:${cid}:2`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      // JUEL:cid[1] + = (CFLAG:cid[602] * 10 * y + 10)（变量语义：JUEL 族，cid[1] +）
      era.add(`juel:${cid}:1`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      await era.printAndWait(`私处,肛门,异常,被虐经验+${y}`);
      // EXP:cid[1] + = y（变量语义：EXP 族，cid[1] +）
      era.add(`exp:${cid}:1`, y);
      // EXP:cid[0] + = y（变量语义：EXP 族，cid[0] +）
      era.add(`exp:${cid}:0`, y);
      // EXP:cid[50] + = y（变量语义：EXP 族，cid[50] +）
      era.add(`exp:${cid}:50`, y);
      // EXP:cid[30] + = y（变量语义：EXP 族，cid[30] +）
      era.add(`exp:${cid}:30`, y);
    }
  } else {
    await era.printAndWait(`${marriage_name(cid)}在肛门里蠕动钻入钻出.....`);
    era.print(
      `欲情,屈服,耻情,苦痛,恐怖点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`,
    );
    // JUEL:cid[5] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[5] +）
    era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 10 * y + 10);
    // JUEL:cid[6] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[6] +）
    era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 10 * y + 10);
    // JUEL:cid[8] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[8] +）
    era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 10 * y + 10);
    // JUEL:cid[9] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[9] +）
    era.add(`juel:${cid}:9`, chara(cid).chara.结婚爱情 * 10 * y + 10);
    // JUEL:cid[10] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[10] +）
    era.add(`juel:${cid}:10`, chara(cid).chara.结婚爱情 * 10 * y + 10);
    era.print(
      `${clitoris_word(cid)},乳房,肛门点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`,
    );
    // JUEL:cid[0] + = (CFLAG:cid[602] * 10 * y + 10)（变量语义：JUEL 族，cid[0] +）
    era.add(`juel:${cid}:0`, chara(cid).chara.结婚爱情 * 10 * y + 10);
    // JUEL:cid[14] + = (CFLAG:cid[602] * 10 * y + 10)（变量语义：JUEL 族，cid[14] +）
    era.add(`juel:${cid}:14`, chara(cid).chara.结婚爱情 * 10 * y + 10);
    // JUEL:cid[2] + = (CFLAG:cid[602] * 10 * y + 10)（变量语义：JUEL 族，cid[2] +）
    era.add(`juel:${cid}:2`, chara(cid).chara.结婚爱情 * 10 * y + 10);
    await era.printAndWait(`肛门,异常,被虐经验+${y}`);
    // EXP:cid[1] + = y（变量语义：EXP 族，cid[1] +）
    era.add(`exp:${cid}:1`, y);
    // EXP:cid[50] + = y（变量语义：EXP 族，cid[50] +）
    era.add(`exp:${cid}:50`, y);
    // EXP:cid[30] + = y（变量语义：EXP 族，cid[30] +）
    era.add(`exp:${cid}:30`, y);
  }

  return y;
}

// @IVY_MARRIAGE_DAY,cid
// 源范围 :1054-1126
async function ivy_marriage_day(cid, y = 1) {
  await era.printAndWait(`${name_of(cid)}和${marriage_name(cid)}一同生活着。`);

  if (chara(cid).system.欲望 >= 4) {
    era.print(
      `${name_of(cid)} 用爱慕的眼光站在您的身后,一手举着的放满酒水的托盘....`,
    );
    era.print(`当你在宝座上小寐时,后退了几步背靠在一颗魔界植物边上....`);
    era.print(
      `踮着脚翘起了屁股,一手依旧举着托盘,一手把魔界植物的粗大的枝干偷偷送入肛门.....`,
    );
    if (chara(cid).chara.男人) {
      era.print(
        `「这里养分多哦」「在魔王大人面前肛交了！」「好粗,要裂开了...好舒服」.....`,
      );
    } else {
      era.print(
        `「这里养分多哦」「前面是留给魔王大人的！」「好粗,要裂开了...好舒服」.....`,
      );
    }
    era.print(`低声压抑着淫荡的呻吟不时的从高潮颤抖的身体中透出.....`);
    if (chara(cid).system.侍奉精神 >= 1) {
      y += 2;
      era.print(
        `无法被${marriage_name(cid)}满足的${name_of(cid)}爬倒了你的胯前,伸出舌头舔向你的下体...`,
      );
      if (chara(cid).train.自慰中毒 >= 1) {
        y += 2;
        era.print(`一边给你作着口舌侍奉,一边用手指疯狂自慰着。`);
        era.print(
          `${clitoris_word(cid)}点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`,
        );
        // JUEL:cid[0] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[0] +）
        era.add(`juel:${cid}:0`, chara(cid).chara.结婚爱情 * 10 * y + 10);
        era.print(`口交经验,自慰经验+${y}`);
        // EXP:cid[22] + = y（变量语义：EXP 族，cid[22] +）
        era.add(`exp:${cid}:22`, y);
        // EXP:cid[10] + = y（变量语义：EXP 族，cid[10] +）
        era.add(`exp:${cid}:10`, y);
      } else {
        era.print(`认真的给你作着口舌侍奉....`);
        era.print(`口交经验+${y}`);
        // EXP:cid[22] + = y（变量语义：EXP 族，cid[22] +）
        era.add(`exp:${cid}:22`, y);
      }
      era.print(
        `你被下身的快感弄醒,看见${name_of(cid)}一脸淫荡的样子,忍不住也丢了....`,
      );
      era.print(`${name_of(cid)}把嘴里和自己流出的腥臭体液装入空的杯子......`);
      era.print(`在你的注视下,慢慢的喝了下去.....`);
      era.print(`${name_of(cid)} 一边喝着一边高潮绝顶了....`);
      await era.printAndWait(`绝顶经验+${Math.trunc(y / 2)}`);
      // EXP:cid[2] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[2] +）
      era.add(`exp:${cid}:2`, Math.trunc(y / 2));
    }
    await era.printAndWait(
      `${name_of(cid)} 对你的好感提升+100 侍奉快乐+${y * 10}`,
    );
    // CFLAG:cid[2] + = 100（变量语义：CFLAG 族，cid[2] +）
    chara(cid).chara.好感度 += 100;
    // EXP:cid[21] + = y * 10（变量语义：EXP 族，cid[21] +）
    era.add(`exp:${cid}:21`, y * 10);
    era.print(
      `恭顺,欲情,屈服,话术,耻情点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`,
    );
    // JUEL:cid[4] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[4] +）
    era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 10 * y + 10);
    // JUEL:cid[5] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[5] +）
    era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 10 * y + 10);
    // JUEL:cid[6] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[6] +）
    era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 10 * y + 10);
    // JUEL:cid[7] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[7] +）
    era.add(`juel:${cid}:7`, chara(cid).chara.结婚爱情 * 10 * y + 10);
    // JUEL:cid[8] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[8] +）
    era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 10 * y + 10);
    await era.printAndWait(`肛门,被虐经验+${y}`);
    // EXP:cid[30] + = y（变量语义：EXP 族，cid[30] +）
    era.add(`exp:${cid}:30`, y);
    // EXP:cid[1] + = y（变量语义：EXP 族，cid[1] +）
    era.add(`exp:${cid}:1`, y);
  } else {
    era.print(
      `你戏谑的看着${name_of(cid)}的四肢被${marriage_name(cid)}的根茎缠住,撅着屁股被固定在地上........`,
    );
    await era.printAndWait(
      `「好痛啊」「为什么又是后面！」「快放开我」...痛苦的喊叫并没有减缓${marriage_name(cid)}的动作`,
    );
    era.print(`恭顺,欲情,屈服点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`);
  }
  era.print(
    `耻情,苦痛,话术,恐怖点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`,
  );
  // JUEL:cid[4] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[4] +）
  era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 10 * y + 10);
  // JUEL:cid[5] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[5] +）
  era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 10 * y + 10);
  // JUEL:cid[6] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[6] +）
  era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 10 * y + 10);
  // JUEL:cid[7] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[7] +）
  era.add(`juel:${cid}:7`, chara(cid).chara.结婚爱情 * 10 * y + 10);
  // JUEL:cid[8] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[8] +）
  era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 10 * y + 10);
  // JUEL:cid[9] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[9] +）
  era.add(`juel:${cid}:9`, chara(cid).chara.结婚爱情 * 10 * y + 10);
  // JUEL:cid[10] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[10] +）
  era.add(`juel:${cid}:10`, chara(cid).chara.结婚爱情 * 10 * y + 10);
  era.print(`肛门点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`);
  // JUEL:cid[2] + = (CFLAG:cid[602] * 10 * y + 10)（变量语义：JUEL 族，cid[2] +）
  era.add(`juel:${cid}:2`, chara(cid).chara.结婚爱情 * 10 * y + 10);
  await era.printAndWait(`肛门,被虐经验+${y}`);
  // EXP:cid[1] + = y（变量语义：EXP 族，cid[1] +）
  era.add(`exp:${cid}:1`, y);
  // EXP:cid[30] + = y（变量语义：EXP 族，cid[30] +）
  era.add(`exp:${cid}:30`, y);

  return y;
}

// @SYOKUSYU_MARRIAGE_DAY,cid
// 源范围 :1127-1168
async function syokusyu_marriage_day(cid, y = 1) {
  era.print(`${name_of(cid)}和${marriage_name(cid)}一同生活着。`);
  await era.printAndWait(
    `.....嘴巴被堵住,只能任凭${marriage_name(cid)}在身上肆虐...`,
  );

  if (
    chara(cid).chara.私处封印 == 1 ||
    (chara(cid).chara.特别服装类型 == 79 &&
      chara(cid).train.着衣状态 & 64 &&
      game.system.着衣系统) ||
    chara(cid).chara.男人 == 1
  ) {
    era.print(
      `${clitoris_word(cid)},乳房,肛门点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`,
    );
    // JUEL:cid[0] + = (CFLAG:cid[602] * 10 * y + 10)（变量语义：JUEL 族，cid[0] +）
    era.add(`juel:${cid}:0`, chara(cid).chara.结婚爱情 * 10 * y + 10);
    // JUEL:cid[14] + = (CFLAG:cid[602] * 10 * y + 10)（变量语义：JUEL 族，cid[14] +）
    era.add(`juel:${cid}:14`, chara(cid).chara.结婚爱情 * 10 * y + 10);
    // JUEL:cid[2] + = (CFLAG:cid[602] * 10 * y + 10)（变量语义：JUEL 族，cid[2] +）
    era.add(`juel:${cid}:2`, chara(cid).chara.结婚爱情 * 10 * y + 10);
  } else {
    era.print(
      `${clitoris_word(cid)},乳房,私处,肛门点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`,
    );
    // JUEL:cid[0] + = (CFLAG:cid[602] * 10 * y + 10)（变量语义：JUEL 族，cid[0] +）
    era.add(`juel:${cid}:0`, chara(cid).chara.结婚爱情 * 10 * y + 10);
    // JUEL:cid[14] + = (CFLAG:cid[602] * 10 * y + 10)（变量语义：JUEL 族，cid[14] +）
    era.add(`juel:${cid}:14`, chara(cid).chara.结婚爱情 * 10 * y + 10);
    // JUEL:cid[1] + = (CFLAG:cid[602] * 10 * y + 10)（变量语义：JUEL 族，cid[1] +）
    era.add(`juel:${cid}:1`, chara(cid).chara.结婚爱情 * 10 * y + 10);
    // JUEL:cid[2] + = (CFLAG:cid[602] * 10 * y + 10)（变量语义：JUEL 族，cid[2] +）
    era.add(`juel:${cid}:2`, chara(cid).chara.结婚爱情 * 10 * y + 10);

    era.print(`私处经验+${y}`);
    // EXP:cid[0] + = y（变量语义：EXP 族，cid[0] +）
    era.add(`exp:${cid}:0`, y);
  }

  era.print(
    `欲情,屈服,耻情,苦痛,恐怖点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`,
  );
  // JUEL:cid[5] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[5] +）
  era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 10 * y + 10);
  // JUEL:cid[6] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[6] +）
  era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 10 * y + 10);
  // JUEL:cid[8] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[8] +）
  era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 10 * y + 10);
  // JUEL:cid[9] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[9] +）
  era.add(`juel:${cid}:9`, chara(cid).chara.结婚爱情 * 10 * y + 10);
  // JUEL:cid[10] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[10] +）
  era.add(`juel:${cid}:10`, chara(cid).chara.结婚爱情 * 10 * y + 10);
  era.print(`口交,肛门经验+${y}`);
  // EXP:cid[1] + = y（变量语义：EXP 族，cid[1] +）
  era.add(`exp:${cid}:1`, y);
  // EXP:cid[22] + = y（变量语义：EXP 族，cid[22] +）
  era.add(`exp:${cid}:22`, y);
  await era.printAndWait(`触手,被虐经验+${y}`);

  // EXP:cid[55] + = y（变量语义：EXP 族，cid[55] +）
  era.add(`exp:${cid}:55`, y);
  // EXP:cid[30] + = y（变量语义：EXP 族，cid[30] +）
  era.add(`exp:${cid}:30`, y);

  return y;
}

// @FAILY_MARRIAGE_DAY,cid
// 源范围 :1169-1291
async function faily_marriage_day(cid, y = 1, rand = default_rand) {
  await era.printAndWait(`${name_of(cid)}和${marriage_name(cid)}一同生活着。`);

  await era.printAndWait(`「今天玩点啥呢？塞入哪个玩具好呢？.... 」`);
  y +=
    chara(cid).system.欲望 + chara(cid).system.顺从 + chara(cid).train.卖淫中毒;
  era.print(
    `${clitoris_word(cid)},恭顺,欲情,屈服,苦痛点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`,
  );
  // JUEL:cid[0] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[0] +）
  era.add(`juel:${cid}:0`, chara(cid).chara.结婚爱情 * 10 * y + 10);
  // JUEL:cid[4] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[4] +）
  era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 10 * y + 10);
  // JUEL:cid[5] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[5] +）
  era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 10 * y + 10);
  // JUEL:cid[6] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[6] +）
  era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 10 * y + 10);
  // JUEL:cid[9] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[9] +）
  era.add(`juel:${cid}:9`, chara(cid).chara.结婚爱情 * 10 * y + 10);
  await era.printAndWait(`肛门,施虐,异常,被虐,绝顶经验+${y}`);
  // EXP:cid[1] + = y（变量语义：EXP 族，cid[1] +）
  era.add(`exp:${cid}:1`, y);
  // EXP:cid[33] + = y（变量语义：EXP 族，cid[33] +）
  era.add(`exp:${cid}:33`, y);
  // EXP:cid[50] + = y（变量语义：EXP 族，cid[50] +）
  era.add(`exp:${cid}:50`, y);
  // EXP:cid[30] + = y（变量语义：EXP 族，cid[30] +）
  era.add(`exp:${cid}:30`, y);
  // EXP:cid[2] + = y（变量语义：EXP 族，cid[2] +）
  era.add(`exp:${cid}:2`, y);
  if (rand(10) == 0) {
    await era.printAndWait(
      `${marriage_name(cid)}对${name_of(cid)}淫荡的身体非常满意,传授给${name_of(cid)}作为调教师的技术....`,
    );
    if (chara(cid).chara.魅惑 == 0) {
      // TALENT:cid[91]  = 1（变量语义：TALENT 族，cid[91]）
      chara(cid).chara.魅惑 = 1;
      await era.printAndWait(`获得了【${talent_name(91)} 】`);
    } else if (chara(cid).dungeon.谜之魅力 == 0) {
      // TALENT:cid[92]  = 1（变量语义：TALENT 族，cid[92]）
      era.set(`talent:${cid}:92`, 1);
      await era.printAndWait(`获得了【${talent_name(92)} 】`);
    } else if (chara(cid).event.威压感 == 0) {
      // TALENT:cid[93]  = 1（变量语义：TALENT 族，cid[93]）
      chara(cid).event.威压感 = 1;
      await era.printAndWait(`获得了【${talent_name(93)} 】`);
    } else {
      await era.printAndWait(
        `但是${name_of(cid)}已经是个出色的调教师了...试试勾引个实验品吧...`,
      );

      if (chara(cid).dungeon.魅力 == 1) {
        y += 1;
      }
      if (chara(cid).dungeon.高人气 == 1) {
        y += 1;
      }
      if (chara(cid).dungeon.妓女 == 1) {
        y += 1;
      }
      if (chara(cid).dungeon.倾城 == 1) {
        y += 1;
      }
      if (chara(cid).dungeon.巧言 == 1) {
        y += 1;
      }
      if (has_regular_customer(cid) == 1) {
        y += 1;
      }
      if (chara(cid).dungeon.歌姫 == 1) {
        y += 1;
      }
      if (chara(cid).dungeon.舞姫 == 1) {
        y += 1;
      }
      await era.printAndWait(`话术+${chara(cid).chara.结婚爱情 * 10 * y + 10}`);
      await era.printAndWait(`卖淫经验+${y * 10}`);
      // JUEL:cid[7] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[7] +）
      era.add(`juel:${cid}:7`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      // EXP:cid[74] + = y * 10（变量语义：EXP 族，cid[74] +）
      era.add(`exp:${cid}:74`, y * 10);

      if (
        chara(cid).train.卖淫中毒 >= 4 &&
        chara(cid).system.欲望 >= 3 &&
        chara(cid).dungeon.妓女 == 0
      ) {
        await era.printAndWait(
          `沉迷于在勾引试验品的${name_of(cid)} 更加堕落了,${name_of(cid)}获得【${talent_name(180)}】`,
        );
      }
      if (
        chara(cid).train.卖淫中毒 >= 4 &&
        chara(cid).system.欲望 >= 4 &&
        chara(cid).dungeon.妓女 == 0
      ) {
        // TALENT:cid[180]  = 1（变量语义：TALENT 族，cid[180]）
        era.set(`talent:${cid}:180`, 1);
      }

      if (
        chara(cid).train.卖淫中毒 >= 4 &&
        chara(cid).system.欲望 >= 4 &&
        chara(cid).dungeon.倾城 == 0
      ) {
        await era.printAndWait(
          `${name_of(cid)}精心打扮自己,完美的展示了自己的淫荡的模样,${name_of(cid)}获得【${talent_name(181)}】`,
        );
      }
      if (
        chara(cid).train.卖淫中毒 >= 4 &&
        chara(cid).system.欲望 >= 4 &&
        chara(cid).dungeon.倾城 == 0
      ) {
        // TALENT:cid[181]  = 1（变量语义：TALENT 族，cid[181]）
        era.set(`talent:${cid}:181`, 1);
      }

      if (
        chara(cid).train.卖淫中毒 >= 5 &&
        chara(cid).system.欲望 >= 4 &&
        chara(cid).dungeon.倾城 == 0
      ) {
        await era.printAndWait(
          `${name_of(cid)}作为妓女的技术又更进一步,${name_of(cid)}获得【${talent_name(181)}】`,
        );
      }
      if (
        chara(cid).train.卖淫中毒 >= 4 &&
        chara(cid).system.欲望 >= 4 &&
        chara(cid).dungeon.倾城 == 0
      ) {
        // TALENT:cid[181]  = 1（变量语义：TALENT 族，cid[181]）
        era.set(`talent:${cid}:181`, 1);
      }

      if (
        chara(cid).train.卖淫中毒 >= 5 &&
        chara(cid).system.欲望 >= 5 &&
        chara(cid).chara.处女 == 0 &&
        chara(cid).chara.男人 == 0
      ) {
        era.print(`${name_of(cid)} 在${marriage_name(cid)}的特殊藏书馆中学习`);
        era.print(
          `《如何利用高潮唱歌技巧大全》《跳跃与体液喷射》《自慰舞蹈精选》`,
        );
        era.print(
          `《叫床,潮喷,灌肠,歌舞融合法则》《肉体极限与道具》奇怪的知识习得了....`,
        );
        await era.printAndWait(
          `${name_of(cid)} 在小妖精开设的黑暗表演舞台上表演....`,
        );

        if (chara(cid).dungeon.魅力 == 0 && chara(cid).train.卖淫中毒 >= 6) {
          await era.printAndWait(
            `舞蹈与歌唱学习让${name_of(cid)}更有气质了,${name_of(cid)}获得【${talent_name(113)}】`,
          );
        }
        if (chara(cid).dungeon.魅力 == 0 && chara(cid).train.卖淫中毒 >= 6) {
          // TALENT:cid[113]  = 0（变量语义：TALENT 族，cid[113]）
          era.set(`talent:${cid}:113`, 0);
        }
        if (chara(cid).dungeon.高人气 == 0 && chara(cid).train.卖淫中毒 >= 8) {
          await era.printAndWait(
            `淫贱与大胆的歌舞表演,让${name_of(cid)}获得更多人的关注,${name_of(cid)}获得【${talent_name(126)}】`,
          );
        }
        if (chara(cid).dungeon.高人气 == 0 && chara(cid).train.卖淫中毒 >= 8) {
          // TALENT:cid[126]  = 1（变量语义：TALENT 族，cid[126]）
          era.set(`talent:${cid}:126`, 1);
        }
        if (chara(cid).dungeon.歌姫 == 0 && chara(cid).train.卖淫中毒 == 10) {
          await era.printAndWait(
            `长久的学习与实践后${name_of(cid)}已经可以在灌肠喷射带来的绝顶高潮中完美的表演歌唱了,${name_of(cid)}获得【${talent_name(185)}】`,
          );
        }
        if (chara(cid).dungeon.歌姫 == 0) {
          // TALENT:cid[185]  = 1（变量语义：TALENT 族，cid[185]）
          era.set(`talent:${cid}:185`, 1);
        }

        if (chara(cid).dungeon.舞姫 == 0 && chara(cid).train.卖淫中毒 == 10) {
          era.print(
            `${name_of(cid)}在舞台上表演曼妙优美的舞姿,旋转跳跃中挥洒出乳汁,肠液,尿液与潮喷液构成的美妙4重绝顶,`,
          );
        }
        if (chara(cid).dungeon.舞姫 == 0 && chara(cid).train.卖淫中毒 == 10) {
          await era.printAndWait(
            `观众们集体鼓掌,并争先恐后给${name_of(cid)}的身体上涂满浓臭的精液或尿液,${name_of(cid)}获得【${talent_name(186)}】`,
          );
        }
        if (chara(cid).dungeon.舞姫 == 0 && chara(cid).train.卖淫中毒 == 10) {
          // TALENT:cid[186]  = 1（变量语义：TALENT 族，cid[186]）
          era.set(`talent:${cid}:186`, 1);
        }

        if (
          chara(cid).train.卖淫中毒 <= 9 &&
          desire_points(cid) >= power(2, chara(cid).train.卖淫中毒) * 1500 &&
          obedience_points(cid) >= power(2, chara(cid).train.卖淫中毒) * 2000 &&
          submission_points(cid) >=
            power(2, chara(cid).train.卖淫中毒) * 1000 &&
          chara(cid).dungeon.卖淫经验 >=
            power(2, chara(cid).train.卖淫中毒) * 20
        ) {
          // JUEL:cid[4] - = (power(2,(ABL:cid[37])) * 1500)（变量语义：JUEL 族，cid[4] -）
          era.add(
            `juel:${cid}:4`,
            -(power(2, chara(cid).train.卖淫中毒) * 1500),
          );
          // JUEL:cid[5] - = (power(2,(ABL:cid[37])) * 2000)（变量语义：JUEL 族，cid[5] -）
          era.add(
            `juel:${cid}:5`,
            -(power(2, chara(cid).train.卖淫中毒) * 2000),
          );
          // JUEL:cid[6] - = (power(2,(ABL:cid[37])) * 1000)（变量语义：JUEL 族，cid[6] -）
          era.add(
            `juel:${cid}:6`,
            -(power(2, chara(cid).train.卖淫中毒) * 1000),
          );
          // EXP:cid[74] - = (power(2,(ABL:cid[37])) * 20)（变量语义：EXP 族，cid[74] -）
          era.add(`exp:${cid}:74`, -(power(2, chara(cid).train.卖淫中毒) * 20));
          // ABL:cid[37] + = 1（变量语义：ABL 族，cid[37] +）
          chara(cid).train.卖淫中毒 += 1;

          await era.printAndWait(`${name_of(cid)}卖淫等级+1`);
          era.print(
            `恭顺点数减少${power(2, chara(cid).train.卖淫中毒) * 1500}`,
          );
          era.print(
            `情欲点数减少${power(2, chara(cid).train.卖淫中毒) * 2000}`,
          );
          era.print(
            `情欲点数减少${power(2, chara(cid).train.卖淫中毒) * 1000}`,
          );
          await era.printAndWait(
            `卖淫经验减少${power(2, chara(cid).train.卖淫中毒) * 20}`,
          );
        }
        await era.printAndWait(
          `${name_of(cid)} 在表演后被某个贵族看中了,陪贵族玩了一天的变态游戏,把获得的${y * chara(cid).system.欲望 * chara(cid).train.卖淫中毒}pts全部献给了国库`,
        );
        const income = y * chara(cid).system.欲望 * chara(cid).train.卖淫中毒;
        era_flag.money += income;
        // EX_FLAG[4444] + = y * ABL:cid[11] * ABL:cid[37]（变量语义：EX_FLAG 族，4444 +）
        era_exflag.legit_money += income;
      }
    }
  }

  return y;
}

// @GIANT_MARRIAGE_DAY,cid
// 源范围 :1292-1573
async function giant_marriage_day(cid, y = 1, rand = default_rand) {
  await era.printAndWait(`${name_of(cid)}和${marriage_name(cid)}一同生活着。`);
  y +=
    chara(cid).system.欲望 +
    chara(cid).system.顺从 +
    chara(cid).system.抖M气质 +
    Math.trunc(chara(cid).chara.结婚爱情 / 5);
  if (cid === 0 && chara(cid).chara.结婚爱情 < 55) {
    if (chara(cid).chara.私处封印 || chara(cid).chara.男人 == 1) {
      await era.printAndWait(
        `${name_of(cid)}在与${marriage_name(cid)}的肛交中感到喜悦……`,
      );
      era.print(`肛门经验+${y}`);
      era.print(`精液经验+${y}`);
      era.print(`肛门扩张经验+1`);
      // EXP[1] + = y（变量语义：EXP 族，(cid)[1] +）
      era.add(`exp:${cid}:1`, y);
      // EXP[20] + = y（变量语义：EXP 族，(cid)[20] +）
      era.add(`exp:${cid}:20`, y);
      // EXP[53] + = 1（变量语义：EXP 族，(cid)[53] +）
      era.add(`exp:${cid}:53`, 1);
    } else {
      await era.printAndWait(
        `${name_of(cid)}在与${marriage_name(cid)}的性交中感到喜悦……`,
      );
      era.print(`私处经验+${y}`);
      era.print(`精液经验+${y}`);
      era.print(`阴道扩张经验+1`);
      // EXP[0] + = y（变量语义：EXP 族，(cid)[0] +）
      era.add(`exp:${cid}:0`, y);
      // EXP[20] + = y（变量语义：EXP 族，(cid)[20] +）
      era.add(`exp:${cid}:20`, y);
      // EXP[52] + = 1（变量语义：EXP 族，(cid)[52] +）
      era.add(`exp:${cid}:52`, 1);
      // CFLAG[107] + = y（变量语义：CFLAG 族，(cid)[107] +）
      era.add(`cflag:${cid}:107`, y);
    }
  } else if (
    chara(cid).stronghold.淫乱 ||
    chara(cid).chara.结婚爱情 > 50 ||
    (chara(cid).system.欲望 >= 3 && chara(cid).system.抖M气质 >= 3)
  ) {
    await era.printAndWait(
      `${name_of(cid)}与${marriage_name(cid)}来到你的面前，一边交合一边展示着他们和谐的日常。`,
    );
    if (rand(2) == 0) {
      if (chara(cid).chara.私处封印 || chara(cid).chara.男人) {
        if (chara(cid).stronghold.尻穴狂) {
          era.print(
            `${name_of(cid)}主动拨开臀瓣，饥渴地吞吐着${marriage_name(cid)}的巨茎。`,
          );
        } else {
          era.print(
            `${name_of(cid)}的尻穴被扩张到极限，勉强地吞入了${marriage_name(cid)}的巨茎。`,
          );
        }
        era.print(
          pick(
            [
              `光是插入就让${name_of(cid)}的眼神涣散，带着双颊潮红的发情表情流着口水`,
              `一插入就让${name_of(cid)}淫荡地扭动着腰部，急切地像发情的母狗那般`,
              `被调教完成的${name_of(cid)}全身颤抖，激动地配合着交合的动作`,
            ],
            rand,
          ),
        );
        era.print(
          pick(
            [
              `那肚子已经完全变成巨人的形状，在猛烈的撞击抽送之下，发出了痛楚又愉悦的呻吟……`,
              `那不知是${name_of(cid)}的淫液或是巨人的精液从被操开的尻穴不停地喷溅出来，弄脏了地板……`,
              `那幅模样不知是被操坏了还是沉醉在肛交当中无法自拔……`,
              `那连皱褶都被操翻的菊穴，还在不知廉耻地收缩着榨取精液……`,
            ],
            rand,
          ),
        );
        await era.printAndWait(
          `最后，你抓着意识朦胧${name_of(cid)}的头部，让${she(cid)}低下头来舔舐你的下身进行服务`,
        );
        era.print(
          pick(
            [
              `将白浊灌注在这个淫荡的奴隶嘴里……`,
              `将白浊喷溅在这个淫荡奴隶的脸上……`,
            ],
            rand,
          ),
        );
        await era.printAndWait('');
        era.print(`肛门,性交,精液,口交经验+${y}`);
        era.print(`肛门扩张经验+1`);
        // EXP[1] + = y（变量语义：EXP 族，(cid)[1] +）
        era.add(`exp:${cid}:1`, y);
        // EXP[5] + = y（变量语义：EXP 族，(cid)[5] +）
        era.add(`exp:${cid}:5`, y);
        // EXP[20] + = y（变量语义：EXP 族，(cid)[20] +）
        era.add(`exp:${cid}:20`, y);
        // EXP[22] + = y（变量语义：EXP 族，(cid)[22] +）
        era.add(`exp:${cid}:22`, y);
        // EXP[53] + = 1（变量语义：EXP 族，(cid)[53] +）
        era.add(`exp:${cid}:53`, 1);

        era.print(
          `屈服,欲情,恭顺,耻情点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`,
        );
        // JUEL:cid[6] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[6] +）
        era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 5 * y + 5);
        // JUEL:cid[5] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[5] +）
        era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 5 * y + 5);
        // JUEL:cid[4] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[4] +）
        era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 5 * y + 5);
        // JUEL:cid[8] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[8] +）
        era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 5 * y + 5);
        era.print(
          `${clitoris_word(cid)},肛门点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`,
        );
        // JUEL:cid[0] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[0] +）
        era.add(`juel:${cid}:0`, chara(cid).chara.结婚爱情 * 5 * y + 5);
        // JUEL:cid[2] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[2] +）
        era.add(`juel:${cid}:2`, chara(cid).chara.结婚爱情 * 5 * y + 5);
        era.print(`苦痛点数+${chara(cid).system.顺从 * y * 50 + 10}`);
        // JUEL:cid[9] + = (ABL:cid[10] * y * 50 + 10 )（变量语义：JUEL 族，cid[9] +）
        era.add(`juel:${cid}:9`, chara(cid).system.顺从 * y * 50 + 10);
        era.print(`绝顶,异常,被虐经验+${Math.trunc(y / 2)}`);
        // EXP:cid[2] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[2] +）
        era.add(`exp:${cid}:2`, Math.trunc(y / 2));
        // EXP:cid[50] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[50] +）
        era.add(`exp:${cid}:50`, Math.trunc(y / 2));
        // EXP:cid[30] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[30] +）
        era.add(`exp:${cid}:30`, Math.trunc(y / 2));
      } else {
        era.print(
          `${name_of(cid)}主动拨开臀瓣，饥渴地吞吐着${marriage_name(cid)}的巨茎。`,
        );
        era.print(
          pick(
            [
              `光是插入就让${name_of(cid)}的眼神涣散，带着双颊潮红的发情表情流着口水`,
              `一插入就让${name_of(cid)}淫荡地扭动着腰部，急切地像发情的母狗那般`,
              `被调教完成的${name_of(cid)}全身颤抖，激动地配合着交合的动作`,
            ],
            rand,
          ),
        );
        era.print(
          pick(
            [
              `那肚子已经完全变成巨人的形状，在猛烈的撞击抽送之下，发出了痛楚又愉悦的呻吟……`,
              `那不知是${name_of(cid)}的淫液或是巨人的精液从被操开的肉穴不停地喷溅出来，弄脏了地板……`,
              `那幅模样不知是被操坏了还是沉醉在性交当中无法自拔……`,
              `那连肉壁都被操翻的小穴，还在不知廉耻地收缩着榨取精液……`,
            ],
            rand,
          ),
        );
        await era.printAndWait(
          `最后，你抓着意识朦胧${name_of(cid)}的头部，让她低下头来舔舐你的下身进行服务`,
        );
        era.print(
          pick(
            [
              `将白浊灌注在这个淫荡的奴隶嘴里……`,
              `将白浊喷溅在这个淫荡奴隶的脸上……`,
            ],
            rand,
          ),
        );
        era.print(`私处,性交,精液,口交经验+${y}`);
        era.print(`阴道扩张经验+1`);
        // EXP[0] + = y（变量语义：EXP 族，(cid)[0] +）
        era.add(`exp:${cid}:0`, y);
        // EXP[5] + = y（变量语义：EXP 族，(cid)[5] +）
        era.add(`exp:${cid}:5`, y);
        // EXP[20] + = y（变量语义：EXP 族，(cid)[20] +）
        era.add(`exp:${cid}:20`, y);
        // EXP[22] + = y（变量语义：EXP 族，(cid)[22] +）
        era.add(`exp:${cid}:22`, y);
        // EXP[52] + = y（变量语义：EXP 族，(cid)[52] +）
        era.add(`exp:${cid}:52`, y);
        // CFLAG[107] + = 1（变量语义：CFLAG 族，(cid)[107] +）
        era.add(`cflag:${cid}:107`, 1);

        era.print(
          `屈服,欲情,恭顺,耻情点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`,
        );
        // JUEL:cid[6] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[6] +）
        era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 5 * y + 5);
        // JUEL:cid[5] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[5] +）
        era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 5 * y + 5);
        // JUEL:cid[4] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[4] +）
        era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 5 * y + 5);
        // JUEL:cid[8] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[8] +）
        era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 5 * y + 5);
        era.print(
          `${clitoris_word(cid)},私处点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`,
        );
        // JUEL:cid[0] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[0] +）
        era.add(`juel:${cid}:0`, chara(cid).chara.结婚爱情 * 5 * y + 5);
        // JUEL:cid[1] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[1] +）
        era.add(`juel:${cid}:1`, chara(cid).chara.结婚爱情 * 5 * y + 5);
        era.print(`苦痛点数+${chara(cid).system.顺从 * y * 50 + 10}`);
        // JUEL:cid[9] + = (ABL:cid[10] * y * 50 + 10 )（变量语义：JUEL 族，cid[9] +）
        era.add(`juel:${cid}:9`, chara(cid).system.顺从 * y * 50 + 10);
        era.print(`绝顶经验,异常,被虐经验+${Math.trunc(y / 2)}`);
        // EXP:cid[2] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[2] +）
        era.add(`exp:${cid}:2`, Math.trunc(y / 2));
        // EXP:cid[50] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[50] +）
        era.add(`exp:${cid}:50`, Math.trunc(y / 2));
        // EXP:cid[30] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[30] +）
        era.add(`exp:${cid}:30`, Math.trunc(y / 2));
      }
    } else {
      await era.printAndWait(
        `${name_of(cid)}弯腰背对着你，将已经被${marriage_name(cid)}调教好的性器暴露出来`,
      );
      await era.printAndWait(
        `像是迫不及待展示成果那样，淫荡地摸着自己的胸部自慰又扭摆着臀部进行引诱`,
      );
      await era.printAndWait(
        `若说那下半身像水性杨花的荡妇，而上半身又像贤妻那般积极地用口舌侍奉着${marriage_name(cid)}的巨茎`,
      );
      await era.printAndWait(
        `在你好奇伸手去检查${name_of(cid)}那饥渴的肉穴能扩张到多大的时候`,
      );
      await era.printAndWait(
        `${name_of(cid)}轻易地用肉穴吞进你的整个手掌，然后发出不知廉耻的呻吟`,
      );
      await era.printAndWait(
        `一边渴求着${marriage_name(cid)}的精液，一边绞紧肉穴舍不得让你的手离开……`,
      );
      era.print(`口交,精液,自慰,被虐经验+${y}`);
      // EXP[22] + = y（变量语义：EXP 族，(cid)[22] +）
      era.add(`exp:${cid}:22`, y);
      // EXP[20] + = y（变量语义：EXP 族，(cid)[20] +）
      era.add(`exp:${cid}:20`, y);
      // EXP[10] + = y（变量语义：EXP 族，(cid)[10] +）
      era.add(`exp:${cid}:10`, y);
      // EXP:cid[30] + = y（变量语义：EXP 族，cid[30] +）
      era.add(`exp:${cid}:30`, y);
      if (chara(cid).chara.私处封印 || chara(cid).chara.男人) {
        era.print(`肛门扩张经验+1`);
        // EXP[52] + = 1（变量语义：EXP 族，(cid)[52] +）
        era.add(`exp:${cid}:52`, 1);
        era.print(
          `${clitoris_word(cid)},肛门点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`,
        );
        // JUEL:cid[0] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[0] +）
        era.add(`juel:${cid}:0`, chara(cid).chara.结婚爱情 * 5 * y + 5);
        // JUEL:cid[2] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[2] +）
        era.add(`juel:${cid}:2`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      } else {
        era.print(`阴道扩张经验+1`);
        // EXP[52] + = 1（变量语义：EXP 族，(cid)[52] +）
        era.add(`exp:${cid}:52`, 1);
        era.print(
          `${clitoris_word(cid)},私处点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`,
        );
        // JUEL:cid[0] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[0] +）
        era.add(`juel:${cid}:0`, chara(cid).chara.结婚爱情 * 5 * y + 5);
        // JUEL:cid[1] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[1] +）
        era.add(`juel:${cid}:1`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      }
      era.print(
        `屈服,欲情,恭顺,耻情点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`,
      );
      // JUEL:cid[6] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[6] +）
      era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[5] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[5] +）
      era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[4] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[4] +）
      era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[8] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[8] +）
      era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      era.print(`苦痛点数+${chara(cid).system.顺从 * y * 50 + 10}`);
      // JUEL:cid[9] + = (ABL:cid[10] * y * 50 + 10 )（变量语义：JUEL 族，cid[9] +）
      era.add(`juel:${cid}:9`, chara(cid).system.顺从 * y * 50 + 10);
    }
    await era.printAndWait(
      `${name_of(cid)} 对你的好感提升+100 侍奉快乐+${y * 10}`,
    );
    // CFLAG:cid[2] + = 100（变量语义：CFLAG 族，cid[2] +）
    chara(cid).chara.好感度 += 100;
    // EXP:cid[21] + = y * 10（变量语义：EXP 族，cid[21] +）
    era.add(`exp:${cid}:21`, y * 10);
  } else if (chara(cid).system.顺从 >= 2 || chara(cid).chara.结婚爱情 > 30) {
    if (rand(2) == 0) {
      if (chara(cid).chara.私处封印 || chara(cid).chara.男人 == 1) {
        await era.printAndWait(
          `${name_of(cid)}为了减轻与${marriage_name(cid)}肛交的痛楚，只好先用巨大的假阳具自慰地扩张着菊穴`,
        );
        await era.printAndWait(
          `最后强忍住被撕裂的恐惧，顺从地坐在${marriage_name(cid)}身上`,
        );
        await era.printAndWait(`一边扭摆着腰部一边进行着夫妻的职责……`);
        era.print(`肛门,自慰,精液,性交经验+${y}`);
        era.print(`肛门扩张经验+${Math.trunc(y / 2)}`);
        // EXP[1] + = y（变量语义：EXP 族，(cid)[1] +）
        era.add(`exp:${cid}:1`, y);
        // EXP[10] + = y（变量语义：EXP 族，(cid)[10] +）
        era.add(`exp:${cid}:10`, y);
        // EXP[5] + = y（变量语义：EXP 族，(cid)[5] +）
        era.add(`exp:${cid}:5`, y);
        // EXP[20] + = y（变量语义：EXP 族，(cid)[20] +）
        era.add(`exp:${cid}:20`, y);
        // EXP[53] + = Math.trunc(y / 2)（变量语义：EXP 族，(cid)[53] +）
        era.add(`exp:${cid}:53`, Math.trunc(y / 2));
        era.print(`肛门点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`);
        // JUEL:cid[2] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[2] +）
        era.add(`juel:${cid}:2`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      } else {
        await era.printAndWait(
          `${name_of(cid)}为了减轻与${marriage_name(cid)}性交的痛楚，只好先用巨大的假阳具自慰地扩张着小穴`,
        );
        await era.printAndWait(
          `最后强忍住被撕裂的恐惧，顺从地坐在${marriage_name(cid)}身上`,
        );
        await era.printAndWait(`一边扭摆着腰部一边进行着夫妻的职责……`);
        era.print(`私处,自慰,精液,性交经验+${y}`);
        era.print(`阴道扩张经验+${Math.trunc(y / 2)}`);
        // EXP[0] + = y（变量语义：EXP 族，(cid)[0] +）
        era.add(`exp:${cid}:0`, y);
        // EXP[10] + = y（变量语义：EXP 族，(cid)[10] +）
        era.add(`exp:${cid}:10`, y);
        // EXP[5] + = y（变量语义：EXP 族，(cid)[5] +）
        era.add(`exp:${cid}:5`, y);
        // EXP[20] + = y（变量语义：EXP 族，(cid)[20] +）
        era.add(`exp:${cid}:20`, y);
        // EXP[52] + = Math.trunc(y / 2)（变量语义：EXP 族，(cid)[52] +）
        era.add(`exp:${cid}:52`, Math.trunc(y / 2));
        era.print(`私处点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`);
        // JUEL:cid[1] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[1] +）
        era.add(`juel:${cid}:1`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      }
      era.print(
        `屈服,欲情,恭顺,耻情点数+${chara(cid).chara.结婚爱情 * 20 * y + 10}`,
      );
      // JUEL:cid[6] + = (CFLAG:cid[602] * 20 * y + 10 )（变量语义：JUEL 族，cid[6] +）
      era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 20 * y + 10);
      // JUEL:cid[5] + = (CFLAG:cid[602] * 20 * y + 10 )（变量语义：JUEL 族，cid[5] +）
      era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 20 * y + 10);
      // JUEL:cid[4] + = (CFLAG:cid[602] * 20 * y + 10 )（变量语义：JUEL 族，cid[4] +）
      era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 20 * y + 10);
      // JUEL:cid[8] + = (CFLAG:cid[602] * 20 * y + 10 )（变量语义：JUEL 族，cid[8] +）
      era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 20 * y + 10);
      era.print(`苦痛点数+${chara(cid).system.顺从 * y * 20 + 10}`);
      // JUEL:cid[9] + = (ABL:cid[10] * y * 50 + 10 )（变量语义：JUEL 族，cid[9] +）
      era.add(`juel:${cid}:9`, chara(cid).system.顺从 * y * 50 + 10);
    } else {
      era.print(
        pick(
          [
            `${name_of(cid)}的腰部被${marriage_name(cid)}的手掌紧锢住`,
            `${name_of(cid)}的肚子鼓成了${marriage_name(cid)}阴茎的形状`,
            `被${marriage_name(cid)}阴茎插入的${name_of(cid)}，发出凄厉的惨叫`,
          ],
          rand,
        ),
      );
      era.print(
        pick(
          [
            `宛如飞机杯一样被${marriage_name(cid)}肆意侵犯着`,
            `就像被人掌控的娃娃一样，无法阻止对方侵犯的行为`,
            `就像被钉在木桩上一样，只能被动地接受狂风暴雨般的抽送`,
          ],
          rand,
        ),
      );
      if (chara(cid).chara.私处封印 || chara(cid).chara.男人 == 1) {
        await era.printAndWait(
          `在初期的痛苦过后，${name_of(cid)}渐渐在与${marriage_name(cid)}的肛交中感到了喜悦……`,
        );
        era.print(`肛门,精液,性交经验+${y}`);
        era.print(`肛门扩张经验+${Math.trunc(y / 2)}`);
        // EXP[1] + = y（变量语义：EXP 族，(cid)[1] +）
        era.add(`exp:${cid}:1`, y);
        // EXP[5] + = y（变量语义：EXP 族，(cid)[5] +）
        era.add(`exp:${cid}:5`, y);
        // EXP[20] + = y（变量语义：EXP 族，(cid)[20] +）
        era.add(`exp:${cid}:20`, y);
        // EXP[53] + = Math.trunc(y / 2)（变量语义：EXP 族，(cid)[53] +）
        era.add(`exp:${cid}:53`, Math.trunc(y / 2));
        era.print(`肛门点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`);
        // JUEL:cid[2] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[2] +）
        era.add(`juel:${cid}:2`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      } else {
        await era.printAndWait(
          `在初期的痛苦过后，${name_of(cid)}渐渐在与${marriage_name(cid)}的性交中感到了喜悦……`,
        );
        era.print(`私处,精液,性交经验+${y}`);
        era.print(`阴道扩张经验+${Math.trunc(y / 2)}`);
        // EXP[0] + = y（变量语义：EXP 族，(cid)[0] +）
        era.add(`exp:${cid}:0`, y);
        // EXP[5] + = y（变量语义：EXP 族，(cid)[5] +）
        era.add(`exp:${cid}:5`, y);
        // EXP[20] + = y（变量语义：EXP 族，(cid)[20] +）
        era.add(`exp:${cid}:20`, y);
        // EXP[52] + = Math.trunc(y / 2)（变量语义：EXP 族，(cid)[52] +）
        era.add(`exp:${cid}:52`, Math.trunc(y / 2));
        // CFLAG[107] + = y（变量语义：CFLAG 族，(cid)[107] +）
        era.add(`cflag:${cid}:107`, y);
        era.print(`私处点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`);
        // JUEL:cid[1] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[1] +）
        era.add(`juel:${cid}:1`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      }
      era.print(
        `屈服,欲情,恭顺,耻情点数+${chara(cid).chara.结婚爱情 * 20 * y + 10}`,
      );
      // JUEL:cid[6] + = (CFLAG:cid[602] * 20 * y + 10 )（变量语义：JUEL 族，cid[6] +）
      era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 20 * y + 10);
      // JUEL:cid[5] + = (CFLAG:cid[602] * 20 * y + 10 )（变量语义：JUEL 族，cid[5] +）
      era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 20 * y + 10);
      // JUEL:cid[4] + = (CFLAG:cid[602] * 20 * y + 10 )（变量语义：JUEL 族，cid[4] +）
      era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 20 * y + 10);
      // JUEL:cid[8] + = (CFLAG:cid[602] * 20 * y + 10 )（变量语义：JUEL 族，cid[8] +）
      era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 20 * y + 10);
      era.print(`苦痛点数+${chara(cid).system.顺从 * y * 20 + 10}`);
      // JUEL:cid[9] + = (ABL:cid[10] * y * 50 + 10 )（变量语义：JUEL 族，cid[9] +）
      era.add(`juel:${cid}:9`, chara(cid).system.顺从 * y * 50 + 10);
      era.print(`绝顶,异常,被虐经验+${Math.trunc(y / 2)}`);
      // EXP:cid[2] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[2] +）
      era.add(`exp:${cid}:2`, Math.trunc(y / 2));
      // EXP:cid[50] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[50] +）
      era.add(`exp:${cid}:50`, Math.trunc(y / 2));
      // EXP:cid[30] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[30] +）
      era.add(`exp:${cid}:30`, Math.trunc(y / 2));
    }
  } else {
    if (rand(2)) {
      await era.printAndWait(
        `${name_of(cid)}无法承受${marriage_name(cid)}的巨茎，拼命说服对方接受其他方式的性服务`,
      );
      await era.printAndWait(
        `最后只能屈辱地一边自慰一边用口舌进行精液的处理。`,
      );
      era.print(`自慰,口交,精液经验+${y * 5}`);
      // EXP[10] + = y * 5（变量语义：EXP 族，(cid)[10] +）
      era.add(`exp:${cid}:10`, y * 5);
      // EXP[22] + = y * 5（变量语义：EXP 族，(cid)[22] +）
      era.add(`exp:${cid}:22`, y * 5);
      // EXP[20] + = y * 5（变量语义：EXP 族，(cid)[20] +）
      era.add(`exp:${cid}:20`, y * 5);
      era.print(
        `${clitoris_word(cid)},乳房点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`,
      );
      // JUEL:cid[0] + = (CFLAG:cid[602] * 10 * y + 10)（变量语义：JUEL 族，cid[0] +）
      era.add(`juel:${cid}:0`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      // JUEL:cid[14] + = (CFLAG:cid[602] * 10 * y + 10)（变量语义：JUEL 族，cid[14] +）
      era.add(`juel:${cid}:14`, chara(cid).chara.结婚爱情 * 10 * y + 10);
    } else {
      await era.printAndWait(
        `${name_of(cid)}无法承受${marriage_name(cid)}的巨茎，一边求饶一边接受扩张的调教`,
      );
      await era.printAndWait(
        `${name_of(cid)}的肉穴被${marriage_name(cid)}粗长的手指抽插侵犯着……`,
      );
      if (chara(cid).chara.男人 || chara(cid).chara.私处封印) {
        era.print(`肛门点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`);
        // JUEL:cid[2] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[2] +）
        era.add(`juel:${cid}:2`, chara(cid).chara.结婚爱情 * 5 * y + 5);
        era.print(`肛门经验+${y * 5}`);
        era.print(`肛门扩张经验+1`);
        // EXP[1] + = y*5（变量语义：EXP 族，(cid)[1] +）
        era.add(`exp:${cid}:1`, y * 5);
        // EXP[53] + = 1（变量语义：EXP 族，(cid)[53] +）
        era.add(`exp:${cid}:53`, 1);
      } else {
        era.print(`私处点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`);
        // JUEL:cid[1] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[1] +）
        era.add(`juel:${cid}:1`, chara(cid).chara.结婚爱情 * 5 * y + 5);
        era.print(`私处经验+${y * 5}`);
        era.print(`阴道扩张经验+1`);
        // EXP[0] + = y（变量语义：EXP 族，(cid)[0] +）
        era.add(`exp:${cid}:0`, y);
        // EXP[52] + = 1（变量语义：EXP 族，(cid)[52] +）
        era.add(`exp:${cid}:52`, 1);
      }
    }
    era.print(
      `屈服,欲情,恭顺,耻情点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`,
    );
    // JUEL:cid[6] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[6] +）
    era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 10 * y + 10);
    // JUEL:cid[5] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[5] +）
    era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 10 * y + 10);
    // JUEL:cid[4] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[4] +）
    era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 10 * y + 10);
    // JUEL:cid[8] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[8] +）
    era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 10 * y + 10);
    era.print(`话术+${chara(cid).chara.结婚爱情 * 10 * y + 10}`);
    // JUEL:cid[7] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[7] +）
    era.add(`juel:${cid}:7`, chara(cid).chara.结婚爱情 * 10 * y + 10);
    era.print(`苦痛点数+${chara(cid).system.顺从 * y * 10 + 10}`);
    // JUEL:cid[9] + = (ABL:cid[10] * y * 10 + 10 )（变量语义：JUEL 族，cid[9] +）
    era.add(`juel:${cid}:9`, chara(cid).system.顺从 * y * 10 + 10);
    era.print(`绝顶经验+${Math.trunc(y / 2)}`);
    // EXP:cid[2] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[2] +）
    era.add(`exp:${cid}:2`, Math.trunc(y / 2));
  }

  return y;
}

// @MAN_MARRIAGE_DAY,cid
// 源范围 :1574-1865
async function man_marriage_day(cid, y = 1, rand = default_rand) {
  const partner_age = chara(cid).chara.恋父情结
    ? '中年'
    : chara(cid).chara.正太控
      ? '少年'
      : '';
  await era.printAndWait(
    `${name_of(cid)}和${partner_age}${marriage_name(cid)}一同生活着。`,
  );

  if (cid === 0 && chara(cid).chara.结婚爱情 < 55) {
    if (
      chara(cid).chara.私处封印 == 1 ||
      (chara(cid).chara.特别服装类型 == 79 &&
        chara(cid).train.着衣状态 & 64 &&
        game.system.着衣系统) ||
      chara(cid).chara.男人 == 1
    ) {
      await era.printAndWait(
        `${name_of(cid)}的肛门接受了${partner_age}${marriage_name(cid)}的阴茎。`,
      );
      era.print(`肛门点数+${y}`);
      era.print(`恭顺点数+${y}`);
      era.print(`肛门经验+${y}`);
      era.print(`精液经验+${y}`);
      // JUEL[2] + = y（变量语义：JUEL 族，(cid)[2] +）
      era.add(`juel:${cid}:2`, y);
      // JUEL[4] + = y（变量语义：JUEL 族，(cid)[4] +）
      era.add(`juel:${cid}:4`, y);
      // EXP[1] + = y（变量语义：EXP 族，(cid)[1] +）
      era.add(`exp:${cid}:1`, y);
      // EXP[20] + = y（变量语义：EXP 族，(cid)[20] +）
      era.add(`exp:${cid}:20`, y);
    } else {
      await era.printAndWait(
        `${name_of(cid)}的阴道接受了${partner_age}${marriage_name(cid)}的阴茎。`,
      );
      era.print(`私处点数+${y}`);
      era.print(`恭顺点数+${y}`);
      era.print(`私处经验+${y}`);
      era.print(`精液经验+${y}`);
      // JUEL[1] + = y（变量语义：JUEL 族，(cid)[1] +）
      era.add(`juel:${cid}:1`, y);
      // JUEL[4] + = y（变量语义：JUEL 族，(cid)[4] +）
      era.add(`juel:${cid}:4`, y);
      // EXP[0] + = y（变量语义：EXP 族，(cid)[0] +）
      era.add(`exp:${cid}:0`, y);
      // EXP[20] + = y（变量语义：EXP 族，(cid)[20] +）
      era.add(`exp:${cid}:20`, y);
      // CFLAG[107] + = y（变量语义：CFLAG 族，(cid)[107] +）
      era.add(`cflag:${cid}:107`, y);
    }
  } else if (
    chara(cid).stronghold.淫乱 == 1 ||
    chara(cid).chara.结婚爱情 > 50
  ) {
    let description = '';
    if (chara(cid).system.抖M气质 >= 3) {
      description += '全身都被绳子束缚着，';
      // 赋值 BONUS[1] + = y
    }

    description += name_of(cid);

    if (chara(cid).system.露出癖 >= 3) {
      description += '在丈夫朋友的围观下，';
      // 赋值 BONUS[0] + = y
    }

    if (chara(cid).train.抖S气质 >= 3) {
      description += '戴着道具';
    }

    description += `和${partner_age}`;

    if (chara(cid).chara.结婚爱情 > 80) {
      description += '不停地变换着各种体位，';
    } else if (chara(cid).chara.结婚爱情 > 65) {
      description += '热情地相拥着，';
    } else {
      description += '和睦地相拥着，';
    }

    if (
      chara(cid).chara.私处封印 == 1 ||
      (chara(cid).chara.特别服装类型 == 79 &&
        chara(cid).train.着衣状态 & 64 &&
        game.system.着衣系统) ||
      chara(cid).chara.男人 == 1
    ) {
      await era.printAndWait(`${description}沉醉在肛交的快感之中了……`);
      era.print(`肛门点数+${y}`);
      era.print(`肛门经验+${y}`);
      era.print(`精液经验+${y}`);
      // JUEL[2] + = y（变量语义：JUEL 族，(cid)[2] +）
      era.add(`juel:${cid}:2`, y);
      // EXP[1] + = y（变量语义：EXP 族，(cid)[1] +）
      era.add(`exp:${cid}:1`, y);
      // EXP[20] + = y（变量语义：EXP 族，(cid)[20] +）
      era.add(`exp:${cid}:20`, y);

      era.print(
        `屈服,欲情,恭顺,耻情,苦痛点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`,
      );
      // JUEL:cid[6] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[6] +）
      era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[5] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[5] +）
      era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[4] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[4] +）
      era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[8] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[8] +）
      era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[9] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[9] +）
      era.add(`juel:${cid}:9`, chara(cid).chara.结婚爱情 * 5 * y + 5);

      era.print(`话术+${chara(cid).chara.结婚爱情 * 5 * y + 5}`);
      // JUEL:cid[7] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[7] +）
      era.add(`juel:${cid}:7`, chara(cid).chara.结婚爱情 * 5 * y + 5);

      await era.printAndWait(`绝顶经验+${Math.trunc(y / 2)}`);
      // EXP:cid[2] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[2] +）
      era.add(`exp:${cid}:2`, Math.trunc(y / 2));
    } else {
      await era.printAndWait(`${description}专心地享受造人的过程……`);
      era.print(`私处点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`);
      era.print(`恭顺点数+${y}`);
      era.print(`私处经验+${y}`);
      era.print(`精液经验+${y}`);
      // JUEL[1] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，(cid)[1] +）
      era.add(`juel:${cid}:1`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // EXP[0] + = y（变量语义：EXP 族，(cid)[0] +）
      era.add(`exp:${cid}:0`, y);
      // EXP[20] + = y（变量语义：EXP 族，(cid)[20] +）
      era.add(`exp:${cid}:20`, y);
      // CFLAG[107] + = y（变量语义：CFLAG 族，(cid)[107] +）
      era.add(`cflag:${cid}:107`, y);

      era.print(
        `屈服,欲情,恭顺,耻情,苦痛点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`,
      );
      // JUEL:cid[6] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[6] +）
      era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[5] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[5] +）
      era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[4] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[4] +）
      era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[8] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[8] +）
      era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[9] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[9] +）
      era.add(`juel:${cid}:9`, chara(cid).chara.结婚爱情 * 5 * y + 5);

      era.print(`话术+${chara(cid).chara.结婚爱情 * 5 * y + 5}`);
      // JUEL:cid[7] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[7] +）
      era.add(`juel:${cid}:7`, chara(cid).chara.结婚爱情 * 5 * y + 5);

      await era.printAndWait(`绝顶经验+${Math.trunc(y / 2)}`);
      // EXP:cid[2] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[2] +）
      era.add(`exp:${cid}:2`, Math.trunc(y / 2));
    }

    if (chara(cid).chara.正太控 == 1 && chara(cid).system.欲望 >= 4) {
      if (rand(5) == 0 && chara(cid).chara.看轻贞操 == 1) {
        await era.printAndWait(
          `${partner_age}${marriage_name(cid)}那幼小的阴茎无法满足${name_of(cid)}`,
        );
        await era.printAndWait(
          `${name_of(cid)}终于忍耐不住体内的欲望..偷偷的卖春了....`,
        );
        era.print(
          `屈服,欲情,恭顺点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`,
        );
        await era.printAndWait(`卖淫经验+${y * 5}`);
        // JUEL:cid[6] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[6] +）
        era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 5 * y + 5);
        // JUEL:cid[5] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[5] +）
        era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 5 * y + 5);
        // JUEL:cid[4] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[4] +）
        era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 5 * y + 5);
        // EXP:cid[74] + = y * 5（变量语义：EXP 族，cid[74] +）
        era.add(`exp:${cid}:74`, y * 5);
      }
      if (rand(5) <= 1) {
        await era.printAndWait(
          `${name_of(cid)}越来越渴望欺负可爱的${partner_age}${marriage_name(cid)}`,
        );
        await era.printAndWait(
          `眼中闪着施虐的欲望的${name_of(cid)}绑住了${partner_age}${marriage_name(cid)}...`,
        );
        era.print(`欲情点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`);
        // JUEL:cid[5] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[5] +）
        era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 5 * y + 5);
        await era.printAndWait(`施虐,异常经验+${y * 3}`);
        // EXP:cid[33] + = y * 3（变量语义：EXP 族，cid[33] +）
        era.add(`exp:${cid}:33`, y * 3);
        // EXP:cid[50] + = y * 3（变量语义：EXP 族，cid[50] +）
        era.add(`exp:${cid}:50`, y * 3);
      }
    } else if (chara(cid).chara.恋父情结 == 1 && chara(cid).system.欲望 >= 4) {
      if (rand(5) == 0 && chara(cid).chara.看轻贞操 == 1) {
        await era.printAndWait(
          `年轻时纵欲过渡的${partner_age}${marriage_name(cid)}已经无法满足${name_of(cid)}`,
        );
        await era.printAndWait(
          `${name_of(cid)}终于忍耐不住体内的欲望..偷偷的卖春了....`,
        );
        era.print(
          `屈服,欲情,恭顺点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`,
        );
        await era.printAndWait(`卖淫经验+${y * 5}`);
        // JUEL:cid[6] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[6] +）
        era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 5 * y + 5);
        // JUEL:cid[5] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[5] +）
        era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 5 * y + 5);
        // JUEL:cid[4] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[4] +）
        era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 5 * y + 5);
        // EXP:cid[74] + = y * 5（变量语义：EXP 族，cid[74] +）
        era.add(`exp:${cid}:74`, y * 5);
      }
      if (rand(5) <= 1 || chara(cid).event.受虐狂 == 1) {
        await era.printAndWait(
          `${name_of(cid)}越来越渴望${partner_age}${marriage_name(cid)}的欺负...`,
        );
        await era.printAndWait(
          `故意做了错事,期待着${partner_age}${marriage_name(cid)}的惩罚.....`,
        );
        era.print(`苦痛,屈服点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`);
        // JUEL:cid[9] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[9] +）
        era.add(`juel:${cid}:9`, chara(cid).chara.结婚爱情 * 5 * y + 5);
        // JUEL:cid[6] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[6] +）
        era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 5 * y + 5);
        await era.printAndWait(`被虐,异常,绝顶经验+${y * 3}`);
        // EXP:cid[2] + = y * 3（变量语义：EXP 族，cid[2] +）
        era.add(`exp:${cid}:2`, y * 3);
        // EXP:cid[30] + = y * 3（变量语义：EXP 族，cid[30] +）
        era.add(`exp:${cid}:30`, y * 3);
        // EXP:cid[50] + = y * 3（变量语义：EXP 族，cid[50] +）
        era.add(`exp:${cid}:50`, y * 3);
      }
    }
  } else if (chara(cid).system.顺从 >= 2 || chara(cid).chara.结婚爱情 > 30) {
    if (
      chara(cid).chara.私处封印 == 1 ||
      (chara(cid).chara.特别服装类型 == 79 &&
        chara(cid).train.着衣状态 & 64 &&
        game.system.着衣系统) ||
      chara(cid).chara.男人 == 1
    ) {
      await era.printAndWait(
        `${name_of(cid)}习惯了用菊穴和${partner_age}${marriage_name(cid)}过夫妻生活了。`,
      );
      era.print(`肛门点数+${chara(cid).chara.结婚爱情 * 20 * y + 10}`);
      era.print(`肛门经验+${y}`);
      era.print(`精液经验+${y}`);
      // JUEL[2] + = (CFLAG:cid[602] * 20 * y + 10 )（变量语义：JUEL 族，(cid)[2] +）
      era.add(`juel:${cid}:2`, chara(cid).chara.结婚爱情 * 20 * y + 10);
      // EXP[1] + = y（变量语义：EXP 族，(cid)[1] +）
      era.add(`exp:${cid}:1`, y);
      // EXP[20] + = y（变量语义：EXP 族，(cid)[20] +）
      era.add(`exp:${cid}:20`, y);

      era.print(
        `屈服,欲情,恭顺,耻情,苦痛点数+${chara(cid).chara.结婚爱情 * 20 * y + 10}`,
      );
      // JUEL:cid[6] + = (CFLAG:cid[602] * 20 * y + 10 )（变量语义：JUEL 族，cid[6] +）
      era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 20 * y + 10);
      // JUEL:cid[5] + = (CFLAG:cid[602] * 20 * y + 10 )（变量语义：JUEL 族，cid[5] +）
      era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 20 * y + 10);
      // JUEL:cid[4] + = (CFLAG:cid[602] * 20 * y + 10 )（变量语义：JUEL 族，cid[4] +）
      era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 20 * y + 10);
      // JUEL:cid[8] + = (CFLAG:cid[602] * 20 * y + 10 )（变量语义：JUEL 族，cid[8] +）
      era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 20 * y + 10);
      // JUEL:cid[9] + = (CFLAG:cid[602] * 20 * y + 10 )（变量语义：JUEL 族，cid[9] +）
      era.add(`juel:${cid}:9`, chara(cid).chara.结婚爱情 * 20 * y + 10);

      era.print(`话术+${chara(cid).chara.结婚爱情 * 20 * y + 10}`);
      // JUEL:cid[7] + = (CFLAG:cid[602] * 20 * y + 10 )（变量语义：JUEL 族，cid[7] +）
      era.add(`juel:${cid}:7`, chara(cid).chara.结婚爱情 * 20 * y + 10);

      await era.printAndWait(`绝顶经验+${Math.trunc(y / 2)}`);
      // EXP:cid[2] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[2] +）
      era.add(`exp:${cid}:2`, Math.trunc(y / 2));
    } else {
      await era.printAndWait(
        `${name_of(cid)}习惯了和${partner_age}${marriage_name(cid)}过夫妻生活了。`,
      );
      era.print(`私处点数+${chara(cid).chara.结婚爱情 * 20 * y + 10}`);
      era.print(`私处经验+${y}`);
      era.print(`精液经验+${y}`);
      // JUEL[1] + = (CFLAG:cid[602] * 20 * y + 10)（变量语义：JUEL 族，(cid)[1] +）
      era.add(`juel:${cid}:1`, chara(cid).chara.结婚爱情 * 20 * y + 10);
      // EXP[0] + = y（变量语义：EXP 族，(cid)[0] +）
      era.add(`exp:${cid}:0`, y);
      // EXP[20] + = y（变量语义：EXP 族，(cid)[20] +）
      era.add(`exp:${cid}:20`, y);
      // CFLAG[107] + = y（变量语义：CFLAG 族，(cid)[107] +）
      era.add(`cflag:${cid}:107`, y);

      era.print(
        `屈服,欲情,恭顺,耻情,苦痛点数+${chara(cid).chara.结婚爱情 * 20 * y + 10}`,
      );
      // JUEL:cid[6] + = (CFLAG:cid[602] * 20 * y + 10 )（变量语义：JUEL 族，cid[6] +）
      era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 20 * y + 10);
      // JUEL:cid[5] + = (CFLAG:cid[602] * 20 * y + 10 )（变量语义：JUEL 族，cid[5] +）
      era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 20 * y + 10);
      // JUEL:cid[4] + = (CFLAG:cid[602] * 20 * y + 10 )（变量语义：JUEL 族，cid[4] +）
      era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 20 * y + 10);
      // JUEL:cid[8] + = (CFLAG:cid[602] * 20 * y + 10 )（变量语义：JUEL 族，cid[8] +）
      era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 20 * y + 10);
      // JUEL:cid[9] + = (CFLAG:cid[602] * 20 * y + 10 )（变量语义：JUEL 族，cid[9] +）
      era.add(`juel:${cid}:9`, chara(cid).chara.结婚爱情 * 20 * y + 10);

      era.print(`话术+${chara(cid).chara.结婚爱情 * 20 * y + 10}`);
      // JUEL:cid[7] + = (CFLAG:cid[602] * 20 * y + 10 )（变量语义：JUEL 族，cid[7] +）
      era.add(`juel:${cid}:7`, chara(cid).chara.结婚爱情 * 20 * y + 10);

      await era.printAndWait(`绝顶经验+${Math.trunc(y / 2)}`);
      // EXP:cid[2] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[2] +）
      era.add(`exp:${cid}:2`, Math.trunc(y / 2));
    }
  } else {
    if (
      chara(cid).chara.私处封印 == 1 ||
      (chara(cid).chara.特别服装类型 == 79 &&
        chara(cid).train.着衣状态 & 64 &&
        game.system.着衣系统) ||
      chara(cid).chara.男人 == 1
    ) {
      await era.printAndWait(`${name_of(cid)}的肛门被强行侵犯。`);
      era.print(`肛门点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`);
      era.print(`肛门经验+${y}`);
      era.print(`精液经验+${y}`);
      // JUEL:cid[2] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[2] +）
      era.add(`juel:${cid}:2`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      // EXP:cid[1] + = y（变量语义：EXP 族，cid[1] +）
      era.add(`exp:${cid}:1`, y);
      // EXP:cid[20] + = y（变量语义：EXP 族，cid[20] +）
      era.add(`exp:${cid}:20`, y);

      era.print(
        `屈服,欲情,恭顺,耻情,苦痛点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`,
      );
      // JUEL:cid[6] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[6] +）
      era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      // JUEL:cid[5] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[5] +）
      era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      // JUEL:cid[4] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[4] +）
      era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      // JUEL:cid[8] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[8] +）
      era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      // JUEL:cid[9] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[9] +）
      era.add(`juel:${cid}:9`, chara(cid).chara.结婚爱情 * 10 * y + 10);

      era.print(`话术+${chara(cid).chara.结婚爱情 * 10 * y + 10}`);
      // JUEL:cid[7] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[7] +）
      era.add(`juel:${cid}:7`, chara(cid).chara.结婚爱情 * 10 * y + 10);

      await era.printAndWait(`绝顶经验+${Math.trunc(y / 2)}`);
      // EXP:cid[2] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[2] +）
      era.add(`exp:${cid}:2`, Math.trunc(y / 2));
    } else {
      await era.printAndWait(
        `${name_of(cid)}被${marriage_name(cid)}强行播种。`,
      );
      era.print(`私处点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`);
      era.print(`私处经验+${y}`);
      era.print(`精液经验+${y}`);
      // JUEL:cid[1] + = (CFLAG:cid[602] * 10 * y + 10)（变量语义：JUEL 族，cid[1] +）
      era.add(`juel:${cid}:1`, chara(cid).chara.结婚爱情 * 10 * y + 10);

      // EXP:cid[0] + = y（变量语义：EXP 族，cid[0] +）
      era.add(`exp:${cid}:0`, y);
      // EXP:cid[20] + = y（变量语义：EXP 族，cid[20] +）
      era.add(`exp:${cid}:20`, y);
      // CFLAG:cid[107] + = y（变量语义：CFLAG 族，cid[107] +）
      era.add(`cflag:${cid}:107`, y);

      era.print(
        `屈服,欲情,恭顺,耻情,苦痛点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`,
      );
      // JUEL:cid[6] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[6] +）
      era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      // JUEL:cid[5] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[5] +）
      era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      // JUEL:cid[4] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[4] +）
      era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      // JUEL:cid[8] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[8] +）
      era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      // JUEL:cid[9] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[9] +）
      era.add(`juel:${cid}:9`, chara(cid).chara.结婚爱情 * 10 * y + 10);

      era.print(`话术+${chara(cid).chara.结婚爱情 * 10 * y + 10}`);
      // JUEL:cid[7] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[7] +）
      era.add(`juel:${cid}:7`, chara(cid).chara.结婚爱情 * 10 * y + 10);

      await era.printAndWait(`绝顶经验+${Math.trunc(y / 2)}`);
      // EXP:cid[2] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[2] +）
      era.add(`exp:${cid}:2`, Math.trunc(y / 2));
    }
  }

  return y;
}

// @GIRL_MARRIAGE_DAY,cid
// 源范围 :1866-2090
async function girl_marriage_day(cid, y = 1, rand = default_rand) {
  const partner_age = chara(cid).chara.恋母情结
    ? '熟女'
    : chara(cid).chara.正太控
      ? '幼女'
      : '';

  await era.printAndWait(
    `${name_of(cid)}和${partner_age}${marriage_name(cid)}一同生活着。`,
  );

  if (chara(cid).chara.男人 || chara(cid).chara.扶她) {
    if (chara(cid).chara.阴茎的状态 == 2) {
      if (
        marriage_partner_status(cid) == 0 &&
        rand(10) == 0 &&
        game.dungeon.游戏设定 & 128
      ) {
        // CFLAG[603]  = 1（变量语义：CFLAG 族，(cid)[603]）
        era.set(`cflag:${cid}:603`, 1);
      } else if (marriage_partner_status(cid) == 1 && rand(10) == 0) {
        // CFLAG[603]  = 2（变量语义：CFLAG 族，(cid)[603]）
        era.set(`cflag:${cid}:603`, 2);
      } else if (marriage_partner_status(cid) == 1 && rand(9) == 0) {
        // CFLAG[603]  = 0（变量语义：CFLAG 族，(cid)[603]）
        era.set(`cflag:${cid}:603`, 0);
      } else if (marriage_partner_status(cid) == 2 && rand(10) == 0) {
        // CFLAG[603]  = 3（变量语义：CFLAG 族，(cid)[603]）
        era.set(`cflag:${cid}:603`, 3);
      } else if (marriage_partner_status(cid) == 2 && rand(9) == 0) {
        // CFLAG[603]  = 0（变量语义：CFLAG 族，(cid)[603]）
        era.set(`cflag:${cid}:603`, 0);
      }

      if (
        marriage_partner_status(cid) == 2 ||
        marriage_partner_status(cid) == 3
      ) {
        await era.printAndWait(
          `${partner_age}${marriage_name(cid)}对${name_of(cid)}的短小包茎已经感到厌倦了。`,
        );
      } else if (rand(2) == 0) {
        await era.printAndWait(
          `短小包茎的${name_of(cid)}无法满足${partner_age}${marriage_name(cid)}，没抽动几次就去了。`,
        );
      } else {
        await era.printAndWait(
          `短小包茎的${name_of(cid)}被${partner_age}${marriage_name(cid)}用手轻易地搞定。`,
        );
      }
    } else if (chara(cid).chara.阴茎的状态 == 1) {
      if (rand(2) == 0) {
        await era.printAndWait(
          `巨根的${name_of(cid)}被${partner_age}${marriage_name(cid)}缠着做了通宵。`,
        );
      } else {
        await era.printAndWait(
          `巨根的${name_of(cid)}被${partner_age}${marriage_name(cid)}榨取了好几次。`,
        );
      }
    } else if (chara(cid).chara.阴茎的状态 == 4) {
      await era.printAndWait(
        `持有马阴茎的${name_of(cid)}像要把${partner_age}${marriage_name(cid)}操坏似得持续做爱着。`,
      );
    } else {
      if (rand(2) == 0) {
        await era.printAndWait(`${name_of(cid)}成为肉壶的俘虏了。`);
      } else {
        await era.printAndWait(
          `${name_of(cid)}腰都快被${partner_age}${marriage_name(cid)}弄得直不起来了。`,
        );
      }
    }
  } else if (chara(cid).train.百合中毒 >= 1 || cid === 0) {
    if (rand(2) == 0) {
      await era.printAndWait(
        `${name_of(cid)}在与${partner_age}${marriage_name(cid)}的生活中感到喜悦……`,
      );
    } else {
      await era.printAndWait(
        `${name_of(cid)}在与${partner_age}${marriage_name(cid)}的情爱中感到喜悦……`,
      );
    }
  } else if (chara(cid).chara.百合气质 >= 1) {
    await era.printAndWait(
      `${name_of(cid)}被${partner_age}${marriage_name(cid)}抱着，也不是不能接受。`,
    );
  } else {
    await era.printAndWait(`${name_of(cid)}紧紧地封闭着自己的心。`);

    await era.printAndWait(
      `愤怒的${partner_age}${marriage_name(cid)}拿起了鞭子狠狠的教育了${name_of(cid)}`,
    );
    era.print(`苦痛,屈服点数+${chara(cid).chara.结婚爱情 * 2 * y + 2}`);
    // JUEL:cid[9] + = (CFLAG:cid[602] * 2 * y + 2 )（变量语义：JUEL 族，cid[9] +）
    era.add(`juel:${cid}:9`, chara(cid).chara.结婚爱情 * 2 * y + 2);
    // JUEL:cid[6] + = (CFLAG:cid[602] * 2 * y + 2 )（变量语义：JUEL 族，cid[6] +）
    era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 2 * y + 2);
    await era.printAndWait(`被虐,异常,绝顶经验+${y}`);
    // EXP:cid[2] + = y（变量语义：EXP 族，cid[2] +）
    era.add(`exp:${cid}:2`, y);
    // EXP:cid[30] + = y（变量语义：EXP 族，cid[30] +）
    era.add(`exp:${cid}:30`, y);
    // EXP:cid[50] + = y（变量语义：EXP 族，cid[50] +）
    era.add(`exp:${cid}:50`, y);
  }

  if (marriage_partner_status(cid) == 1) {
    await era.printAndWait(
      `${name_of(cid)}的${marriage_name(cid)}妻子有外遇了。`,
    );
  } else if (marriage_partner_status(cid) == 2) {
    await era.printAndWait(
      `从门缝里偷看到，${name_of(cid)}的${marriage_name(cid)}妻子正在床上与陌生男子做爱。`,
    );
    await era.printAndWait(`${name_of(cid)}悄悄地离开了那个地方……`);
  } else if (marriage_partner_status(cid) == 3) {
    await era.printAndWait(
      `从门缝里偷看到，${name_of(cid)}的腹部膨胀的${marriage_name(cid)}妻子正在床上与陌生男子做爱。`,
    );
    await era.printAndWait(`${name_of(cid)}悄悄地离开了那个地方……`);
  }

  if (marriage_partner_status(cid) == 2 || marriage_partner_status(cid) == 3) {
    await era.printAndWait(`${name_of(cid)}考虑着如何报复出轨的妻子`);
    if (rand(2) == 0 && chara(cid).event.施虐狂 == 0) {
      await era.printAndWait(`于是,欲望驱使下,${name_of(cid)}卖春了...`);
      era.print(`屈服,欲情,恭顺点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`);
      await era.printAndWait(`卖淫经验+${y * 2}`);
      // JUEL:cid[6] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[6] +）
      era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[5] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[5] +）
      era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[4] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[4] +）
      era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // EXP:cid[74] + = y * 2（变量语义：EXP 族，cid[74] +）
      era.add(`exp:${cid}:74`, y * 2);
    } else {
      await era.printAndWait(
        `于是,${name_of(cid)}抽出鞭子准备狠狠的教训${partner_age}${marriage_name(cid)}`,
      );
      era.print(`欲情点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`);
      // JUEL:cid[5] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[5] +）
      era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      await era.printAndWait(`施虐,异常经验+${y * 2}`);
      // EXP:cid[33] + = y * 2（变量语义：EXP 族，cid[33] +）
      era.add(`exp:${cid}:33`, y * 2);
      // EXP:cid[50] + = y * 2（变量语义：EXP 族，cid[50] +）
      era.add(`exp:${cid}:50`, y * 2);
    }
  } else if (chara(cid).chara.男人) {
    era.print(`阴茎点数+${y * 10}`);
    era.print(`欲情点数+${y * 10}`);
    era.print(`射精经验+1`);
    // JUEL[0] + = y * 10（变量语义：JUEL 族，(cid)[0] +）
    era.add(`juel:${cid}:0`, y * 10);
    // JUEL[5] + = y * 10（变量语义：JUEL 族，(cid)[5] +）
    era.add(`juel:${cid}:5`, y * 10);
    // EXP[3] + = 1（变量语义：EXP 族，(cid)[3] +）
    chara(cid).train.射精经验 += 1;
  } else if (chara(cid).chara.扶她) {
    if (
      (chara(cid).chara.看轻贞操 == 1 ||
        chara(cid).chara.双性恋 == 1 ||
        chara(cid).event.露出狂 == 1 ||
        chara(cid).system.欲望 >= 3) &&
      rand(2) == 0
    ) {
      await era.printAndWait(`欲望驱使下,${name_of(cid)}卖春了...`);
      era.print(`屈服,欲情,恭顺点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`);
      await era.printAndWait(`卖淫经验+${y * 2}`);
      // JUEL:cid[6] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[6] +）
      era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[5] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[5] +）
      era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[4] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[4] +）
      era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // EXP:cid[74] + = y * 2（变量语义：EXP 族，cid[74] +）
      era.add(`exp:${cid}:74`, y * 2);
    } else if (
      chara(cid).stronghold.淫乱 == 1 ||
      chara(cid).dungeon.妓女 == 1 ||
      chara(cid).dungeon.倾城 == 1 ||
      has_regular_customer(cid) == 1 ||
      is_courting(cid) == 1
    ) {
      await era.printAndWait(`欲望驱使下,${name_of(cid)}卖春了...`);
      era.print(`屈服,欲情,恭顺点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`);
      await era.printAndWait(`卖淫经验+${y * 2}`);
      // JUEL:cid[6] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[6] +）
      era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[5] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[5] +）
      era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[4] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[4] +）
      era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // EXP:cid[74] + = y * 2（变量语义：EXP 族，cid[74] +）
      era.add(`exp:${cid}:74`, y * 2);
    }

    if (
      (chara(cid).event.施虐狂 == 1 || chara(cid).chara.小恶魔 == 1) &&
      rand(10) <= 6
    ) {
      await era.printAndWait(
        `意犹未尽的${name_of(cid)}抽出鞭子狠狠的教训了${partner_age}${marriage_name(cid)}`,
      );
      era.print(`欲情点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`);
      // JUEL:cid[5] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[5] +）
      era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      await era.printAndWait(`施虐,异常经验+${y * 3}`);
      // EXP:cid[33] + = y * 2（变量语义：EXP 族，cid[33] +）
      era.add(`exp:${cid}:33`, y * 2);
      // EXP:cid[50] + = y * 2（变量语义：EXP 族，cid[50] +）
      era.add(`exp:${cid}:50`, y * 2);
    } else if (chara(cid).event.受虐狂 == 1) {
      await era.printAndWait(
        `${name_of(cid)}叼着鞭子,像狗一样爬到${partner_age}${marriage_name(cid)}跟前.....`,
      );
      era.print(`苦痛,屈服点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`);
      // JUEL:cid[9] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[9] +）
      era.add(`juel:${cid}:9`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[6] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[6] +）
      era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      await era.printAndWait(`被虐,异常,绝顶经验+${y * 3}`);
      // EXP:cid[2] + = y * 3（变量语义：EXP 族，cid[2] +）
      era.add(`exp:${cid}:2`, y * 3);
      // EXP:cid[30] + = y * 3（变量语义：EXP 族，cid[30] +）
      era.add(`exp:${cid}:30`, y * 3);
      // EXP:cid[50] + = y * 3（变量语义：EXP 族，cid[50] +）
      era.add(`exp:${cid}:50`, y * 3);
    }
  } else {
    if (
      (chara(cid).chara.看轻贞操 == 1 ||
        chara(cid).chara.双性恋 == 1 ||
        chara(cid).event.露出狂 == 1 ||
        chara(cid).system.欲望 >= 3) &&
      rand(2) == 0
    ) {
      await era.printAndWait(`欲望驱使下,${name_of(cid)}卖春了...`);
      era.print(`屈服,欲情,恭顺点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`);
      await era.printAndWait(`卖淫经验+${y * 2}`);
      // JUEL:cid[6] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[6] +）
      era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[5] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[5] +）
      era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[4] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[4] +）
      era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // EXP:cid[74] + = y * 2（变量语义：EXP 族，cid[74] +）
      era.add(`exp:${cid}:74`, y * 2);
    } else if (
      chara(cid).stronghold.淫乱 == 1 ||
      chara(cid).dungeon.妓女 == 1 ||
      chara(cid).dungeon.倾城 == 1 ||
      has_regular_customer(cid) == 1 ||
      is_courting(cid) == 1
    ) {
      await era.printAndWait(`欲望驱使下,${name_of(cid)}卖春了...`);
      era.print(`屈服,欲情,恭顺点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`);
      await era.printAndWait(`卖淫经验+${y * 2}`);
      // JUEL:cid[6] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[6] +）
      era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[5] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[5] +）
      era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[4] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[4] +）
      era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // EXP:cid[74] + = y * 2（变量语义：EXP 族，cid[74] +）
      era.add(`exp:${cid}:74`, y * 2);
    }

    if (
      (chara(cid).event.施虐狂 == 1 || chara(cid).chara.小恶魔 == 1) &&
      rand(10) <= 6
    ) {
      await era.printAndWait(
        `意犹未尽的${name_of(cid)}抽出鞭子狠狠的教训了${partner_age}${marriage_name(cid)}`,
      );
      era.print(`欲情点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`);
      // JUEL:cid[5] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[5] +）
      era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      await era.printAndWait(`施虐,异常经验+${y * 3}`);
      // EXP:cid[33] + = y * 2（变量语义：EXP 族，cid[33] +）
      era.add(`exp:${cid}:33`, y * 2);
      // EXP:cid[50] + = y * 2（变量语义：EXP 族，cid[50] +）
      era.add(`exp:${cid}:50`, y * 2);
    } else if (chara(cid).event.受虐狂 == 1) {
      await era.printAndWait(
        `${name_of(cid)}叼着鞭子,像狗一样爬到${partner_age}${marriage_name(cid)}跟前.....`,
      );
      era.print(`苦痛,屈服点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`);
      // JUEL:cid[9] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[9] +）
      era.add(`juel:${cid}:9`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[6] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[6] +）
      era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      await era.printAndWait(`被虐,异常,绝顶经验+${y * 3}`);
      // EXP:cid[2] + = y * 3（变量语义：EXP 族，cid[2] +）
      era.add(`exp:${cid}:2`, y * 3);
      // EXP:cid[30] + = y * 3（变量语义：EXP 族，cid[30] +）
      era.add(`exp:${cid}:30`, y * 3);
      // EXP:cid[50] + = y * 3（变量语义：EXP 族，cid[50] +）
      era.add(`exp:${cid}:50`, y * 3);
    }
  }

  if (marriage_partner_status(cid) == 3 && rand(10)) {
    await era.printAndWait(
      `${name_of(cid)}的${marriage_name(cid)}妻子平安分娩。`,
    );

    // CFLAG[603]  = 2（变量语义：CFLAG 族，(cid)[603]）
    era.set(`cflag:${cid}:603`, 2);
  }

  return y;
}

// @BEAST_MARRIAGE_DAY,cid
// 源范围 :2091-2194
async function beast_marriage_day(cid, y = 1) {
  await era.printAndWait(`${name_of(cid)}和${marriage_name(cid)}一同生活着。`);

  if (chara(cid).event.牝犬 == 1 || cid === 0) {
    if (
      chara(cid).chara.私处封印 == 1 ||
      (chara(cid).chara.特别服装类型 == 79 &&
        chara(cid).train.着衣状态 & 64 &&
        game.system.着衣系统) ||
      chara(cid).chara.男人 == 1
    ) {
      await era.printAndWait(
        `${name_of(cid)}如牝犬一般吐着舌头兴奋地扭动腰肢迎接着${marriage_name(cid)}。`,
      );
      era.print(
        `屈服,欲情,恭顺,耻情点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`,
      );
      // JUEL:cid[6] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[6] +）
      era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[5] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[5] +）
      era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[4] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[4] +）
      era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[8] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[8] +）
      era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      era.print(`肛门点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`);
      // JUEL:cid[2] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[2] +）
      era.add(`juel:${cid}:2`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      era.print(`绝顶经验+${Math.trunc(y / 2)}`);
      // EXP:cid[2] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[2] +）
      era.add(`exp:${cid}:2`, Math.trunc(y / 2));
      await era.printAndWait(`兽奸,异常,被虐经验+${y}`);
      // EXP:cid[56] + = y（变量语义：EXP 族，cid[56] +）
      era.add(`exp:${cid}:56`, y);
      // EXP:cid[50] + = y（变量语义：EXP 族，cid[50] +）
      era.add(`exp:${cid}:50`, y);
      // EXP:cid[30] + = y（变量语义：EXP 族，cid[30] +）
      era.add(`exp:${cid}:30`, y);
    } else {
      await era.printAndWait(
        `${name_of(cid)}如牝犬一般吐着舌头兴奋地扭动腰肢迎接着${marriage_name(cid)}。`,
      );
      era.print(
        `屈服,欲情,恭顺,耻情点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`,
      );
      // JUEL:cid[6] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[6] +）
      era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[5] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[5] +）
      era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[4] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[4] +）
      era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[8] + = (CFLAG:cid[602] * 5 * y + 5 )（变量语义：JUEL 族，cid[8] +）
      era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      era.print(`私处,肛门点数+${chara(cid).chara.结婚爱情 * 5 * y + 5}`);

      // JUEL:cid[2] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[2] +）
      era.add(`juel:${cid}:2`, chara(cid).chara.结婚爱情 * 5 * y + 5);
      // JUEL:cid[1] + = (CFLAG:cid[602] * 5 * y + 5)（变量语义：JUEL 族，cid[1] +）
      era.add(`juel:${cid}:1`, chara(cid).chara.结婚爱情 * 5 * y + 5);

      era.print(`苦痛点数+${chara(cid).system.顺从 * y * 50 + 10}`);
      // JUEL:cid[9] + = (ABL:cid[10] * y * 50 + 10 )（变量语义：JUEL 族，cid[9] +）
      era.add(`juel:${cid}:9`, chara(cid).system.顺从 * y * 50 + 10);

      era.print(`绝顶经验+${Math.trunc(y / 2)}`);
      // EXP:cid[2] + = Math.trunc(y / 2)（变量语义：EXP 族，cid[2] +）
      era.add(`exp:${cid}:2`, Math.trunc(y / 2));
      await era.printAndWait(`兽奸,异常,被虐经验+${y}`);
      // EXP:cid[56] + = y（变量语义：EXP 族，cid[56] +）
      era.add(`exp:${cid}:56`, y);
      // EXP:cid[50] + = y（变量语义：EXP 族，cid[50] +）
      era.add(`exp:${cid}:50`, y);
      // EXP:cid[30] + = y（变量语义：EXP 族，cid[30] +）
      era.add(`exp:${cid}:30`, y);

      // CFLAG:cid[107] + = y（变量语义：CFLAG 族，cid[107] +）
      era.add(`cflag:${cid}:107`, y);
    }
  } else if (chara(cid).train.兽奸中毒 >= 1 || chara(cid).chara.结婚爱情 > 40) {
    if (
      chara(cid).chara.私处封印 == 1 ||
      (chara(cid).chara.特别服装类型 == 79 &&
        chara(cid).train.着衣状态 & 64 &&
        game.system.着衣系统) ||
      chara(cid).chara.男人 == 1
    ) {
      await era.printAndWait(
        `${name_of(cid)}如牝犬一般吐着舌头兴奋地扭动腰肢迎接着${marriage_name(cid)}。`,
      );
      era.print(
        `屈服,欲情,恭顺,耻情点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`,
      );
      // JUEL:cid[6] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[6] +）
      era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      // JUEL:cid[5] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[5] +）
      era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      // JUEL:cid[4] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[4] +）
      era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      // JUEL:cid[8] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[8] +）
      era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      era.print(`肛门点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`);
      // JUEL:cid[2] + = (CFLAG:cid[602] * 10 * y + 10)（变量语义：JUEL 族，cid[2] +）
      era.add(`juel:${cid}:2`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      era.print(`苦痛点数+${chara(cid).system.顺从 * y * 100 + 10}`);
      // JUEL:cid[9] + = (ABL:cid[10] * y * 100 + 10 )（变量语义：JUEL 族，cid[9] +）
      era.add(`juel:${cid}:9`, chara(cid).system.顺从 * y * 100 + 10);
      era.print(`绝顶经验+${y}`);
      // EXP:cid[2] + = y（变量语义：EXP 族，cid[2] +）
      era.add(`exp:${cid}:2`, y);
      await era.printAndWait(`兽奸,异常,被虐经验+${y}`);
      // EXP:cid[56] + = y * 2（变量语义：EXP 族，cid[56] +）
      era.add(`exp:${cid}:56`, y * 2);
      // EXP:cid[50] + = y * 2（变量语义：EXP 族，cid[50] +）
      era.add(`exp:${cid}:50`, y * 2);
      // EXP:cid[30] + = y * 2（变量语义：EXP 族，cid[30] +）
      era.add(`exp:${cid}:30`, y * 2);
    } else {
      await era.printAndWait(
        `${name_of(cid)}如牝犬一般吐着舌头兴奋地扭动腰肢迎接着${marriage_name(cid)}。`,
      );
      era.print(
        `屈服,欲情,恭顺,耻情点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`,
      );
      // JUEL:cid[6] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[6] +）
      era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      // JUEL:cid[5] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[5] +）
      era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      // JUEL:cid[4] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[4] +）
      era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      // JUEL:cid[8] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[8] +）
      era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      era.print(`私处,肛门点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`);

      // JUEL:cid[2] + = (CFLAG:cid[602] * 10 * y + 10)（变量语义：JUEL 族，cid[2] +）
      era.add(`juel:${cid}:2`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      // JUEL:cid[1] + = (CFLAG:cid[602] * 10 * y + 10)（变量语义：JUEL 族，cid[1] +）
      era.add(`juel:${cid}:1`, chara(cid).chara.结婚爱情 * 10 * y + 10);

      era.print(`苦痛点数+${chara(cid).system.顺从 * y * 100 + 10}`);
      // JUEL:cid[9] + = (ABL:cid[10] * y * 100 + 10 )（变量语义：JUEL 族，cid[9] +）
      era.add(`juel:${cid}:9`, chara(cid).system.顺从 * y * 100 + 10);

      era.print(`绝顶经验+${y}`);
      // EXP:cid[2] + = y（变量语义：EXP 族，cid[2] +）
      era.add(`exp:${cid}:2`, y);
      await era.printAndWait(`兽奸,异常,被虐经验+${y}`);
      // EXP:cid[56] + = y * 2（变量语义：EXP 族，cid[56] +）
      era.add(`exp:${cid}:56`, y * 2);
      // EXP:cid[50] + = y * 2（变量语义：EXP 族，cid[50] +）
      era.add(`exp:${cid}:50`, y * 2);
      // EXP:cid[30] + = y * 2（变量语义：EXP 族，cid[30] +）
      era.add(`exp:${cid}:30`, y * 2);
    }
  } else {
    await era.printAndWait(
      `从不正眼看${marriage_name(cid)}，${name_of(cid)}陷入了深深的绝望中……`,
    );
    await era.printAndWait(
      `屈服,恐怖点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`,
    );
    // JUEL:cid[6] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[6] +）
    era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 10 * y + 10);
    // JUEL:cid[10] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[10] +）
    era.add(`juel:${cid}:10`, chara(cid).chara.结婚爱情 * 10 * y + 10);
  }

  return y;
}

// @BRAIN_MARRIAGE_DAY,cid
// 源范围 :2195-2250
async function brain_marriage_day(cid, y = 1, rand = default_rand) {
  let fantasy;
  if (chara(cid).stronghold.淫乱 || chara(cid).stronghold.爱慕) {
    fantasy = name_of(0);
  } else if (chara(cid).dungeon.恋人) {
    fantasy = LOVER_NAMES.get(chara(cid).dungeon.恋人) || '恋人';
  } else if (chara(cid).chara.成为勇者前的生活 == 21 || chara(cid).chara.人妻) {
    fantasy = '在故乡等待的伴侣';
  } else if (chara(cid).train.兽奸中毒 >= 1) {
    fantasy = '魔兽';
  } else {
    fantasy = '性幻想对象';
  }
  y =
    (chara(cid).system.欲望 || 0) +
    (chara(cid).system.露出癖 || 0) +
    (chara(cid).train.自慰中毒 || 0);
  await era.printAndWait(`${name_of(cid)}和${marriage_name(cid)}一同生活着。`);
  if (chara(cid).event.漏尿癖 == 1 || rand(20) == 0) {
    await era.printAndWait(
      `偶然看到${marriage_name(cid)}的样子,${name_of(cid)}就忍不住失禁了。`,
    );
    if (chara(cid).event.漏尿癖 == 0) {
      await era.printAndWait(`${name_of(cid)}获得【${talent_name(57)}】`);
      // TALENT:cid[57]  = 1（变量语义：TALENT 族，cid[57]）
      chara(cid).event.漏尿癖 = 1;
    }
    await era.printAndWait(`放尿,异常经验+${y}`);
    // EXP:cid[31] + = y（变量语义：EXP 族，cid[31] +）
    chara(cid).system.放尿经验 += y;
    // EXP:cid[50] + = y（变量语义：EXP 族，cid[50] +）
    era.add(`exp:${cid}:50`, y);
    await era.printAndWait(
      `屈服,恐怖点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`,
    );
    // JUEL:cid[6] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[6] +）
    era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 10 * y + 10);
    // JUEL:cid[10] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[10] +）
    era.add(`juel:${cid}:10`, chara(cid).chara.结婚爱情 * 10 * y + 10);
  } else {
    await era.printAndWait(
      `被${marriage_name(cid)}从耳朵侵犯脑部的${name_of(cid)}，翻着白眼流着口水失神了`,
    );
    await era.printAndWait(
      `因为${marriage_name(cid)}分泌的体液产生了异常的幻觉`,
    );
    era.print(
      pick(
        [
          `${name_of(cid)}走到人来人往的街道上，脱掉衣服公开自慰着，不断地反覆高潮直到晕倒为止……`,
          `因幻觉的作用，${name_of(cid)}将大厅当成浴室，开始脱衣服当众洗澡了起来……`,
          `${name_of(cid)}将庭园的大树当成${fantasy}进行求爱，用大腿紧紧夹紧着树干，不知廉耻地摩擦着……`,
          `${name_of(cid)}将楼梯的扶杆当成${fantasy}，张开大腿坐在上面，用下体不停地摩擦着……`,
        ],
        rand,
      ),
    );
    await era.printAndWait(`调教失神经验+1`);
    await era.printAndWait(`调教自慰经验+${chara(cid).chara.结婚爱情 * y}`);
    // EXP:cid[65] + = 1（变量语义：EXP 族，cid[65] +）
    chara(cid).train.调教失神经验 += 1;
    // EXP:cid[11] + = y * CFLAG:cid[602]（变量语义：EXP 族，cid[11] +）
    era.add(`exp:${cid}:11`, y * chara(cid).chara.结婚爱情);
    await era.printAndWait(
      `${clitoris_word(cid)},欲情,恭顺,耻情点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`,
    );
    // JUEL:cid[0] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[0] +）
    era.add(`juel:${cid}:0`, chara(cid).chara.结婚爱情 * 10 * y + 10);
    // JUEL:cid[5] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[5] +）
    era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 10 * y + 10);
    // JUEL:cid[4] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[4] +）
    era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 10 * y + 10);
    // JUEL:cid[8] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[8] +）
    era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 10 * y + 10);
  }

  return y;
}

// @HORSE_MARRIAGE_DAY,cid
// 源范围 :2251-2352
async function horse_marriage_day(cid, y = 1, rand = default_rand) {
  await era.printAndWait(
    `${name_of(cid)}和${marriage_name(cid)}一起在马厩里生活着。`,
  );

  if (chara(cid).event.牝犬 == 1 || cid === 0) {
    if (rand(2) == 0) {
      if (
        chara(cid).chara.私处封印 == 1 ||
        (chara(cid).chara.特别服装类型 == 79 &&
          chara(cid).train.着衣状态 & 64 &&
          game.system.着衣系统) ||
        chara(cid).chara.男人 == 1
      ) {
        await era.printAndWait(
          `${name_of(cid)}嬉笑着跨上了木马，沉浸在与${marriage_name(cid)}的肛交之中……`,
        );

        era.print(
          `屈服,欲情,恭顺,耻情点数+${chara(cid).chara.结婚爱情 * 15 * y + 10}`,
        );
        // JUEL:cid[6] + = (CFLAG:cid[602] * 15 * y + 10 )（变量语义：JUEL 族，cid[6] +）
        era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 15 * y + 10);
        // JUEL:cid[5] + = (CFLAG:cid[602] * 15 * y + 10 )（变量语义：JUEL 族，cid[5] +）
        era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 15 * y + 10);
        // JUEL:cid[4] + = (CFLAG:cid[602] * 15 * y + 10 )（变量语义：JUEL 族，cid[4] +）
        era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 15 * y + 10);
        // JUEL:cid[8] + = (CFLAG:cid[602] * 15 * y + 10 )（变量语义：JUEL 族，cid[8] +）
        era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 15 * y + 10);
        era.print(`肛门点数+${chara(cid).chara.结婚爱情 * 15 * y + 10}`);
        // JUEL:cid[2] + = (CFLAG:cid[602] * 15 * y + 10)（变量语义：JUEL 族，cid[2] +）
        era.add(`juel:${cid}:2`, chara(cid).chara.结婚爱情 * 15 * y + 10);
        era.print(`苦痛点数+${chara(cid).system.顺从 * y * 200 + 10}`);
        // JUEL:cid[9] + = (ABL:cid[10] * y * 200 + 10 )（变量语义：JUEL 族，cid[9] +）
        era.add(`juel:${cid}:9`, chara(cid).system.顺从 * y * 200 + 10);
        era.print(`绝顶经验+${y * 10}`);
        // EXP:cid[2] + = y * 10（变量语义：EXP 族，cid[2] +）
        era.add(`exp:${cid}:2`, y * 10);
        era.print(`兽奸,异常,被虐经验+${y * 10}`);
        // EXP:cid[56] + = y * 10（变量语义：EXP 族，cid[56] +）
        era.add(`exp:${cid}:56`, y * 10);
        // EXP:cid[50] + = y * 10（变量语义：EXP 族，cid[50] +）
        era.add(`exp:${cid}:50`, y * 10);
        // EXP:cid[30] + = y * 10（变量语义：EXP 族，cid[30] +）
        era.add(`exp:${cid}:30`, y * 10);

        era.print(`肛门经验+${y * 10}`);
        await era.printAndWait(`肛门扩张经验+${y * 10}`);
        // EXP:cid[1] + = y * 10（变量语义：EXP 族，cid[1] +）
        era.add(`exp:${cid}:1`, y * 10);
        // EXP:cid[53] + = y * 10（变量语义：EXP 族，cid[53] +）
        era.add(`exp:${cid}:53`, y * 10);
      } else {
        era.print(
          `屈服,欲情,恭顺,耻情点数+${chara(cid).chara.结婚爱情 * 15 * y + 10}`,
        );
        // JUEL:cid[6] + = (CFLAG:cid[602] * 15 * y + 10 )（变量语义：JUEL 族，cid[6] +）
        era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 15 * y + 10);
        // JUEL:cid[5] + = (CFLAG:cid[602] * 15 * y + 10 )（变量语义：JUEL 族，cid[5] +）
        era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 15 * y + 10);
        // JUEL:cid[4] + = (CFLAG:cid[602] * 15 * y + 10 )（变量语义：JUEL 族，cid[4] +）
        era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 15 * y + 10);
        // JUEL:cid[8] + = (CFLAG:cid[602] * 15 * y + 10 )（变量语义：JUEL 族，cid[8] +）
        era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 15 * y + 10);
        era.print(`私处点数+${chara(cid).chara.结婚爱情 * 15 * y + 10}`);

        // JUEL:cid[1] + = (CFLAG:cid[602] * 15 * y + 10)（变量语义：JUEL 族，cid[1] +）
        era.add(`juel:${cid}:1`, chara(cid).chara.结婚爱情 * 15 * y + 10);

        era.print(`苦痛点数+${chara(cid).system.顺从 * y * 200 + 10}`);
        // JUEL:cid[9] + = (ABL:cid[10] * y * 20 + 10 )（变量语义：JUEL 族，cid[9] +）
        era.add(`juel:${cid}:9`, chara(cid).system.顺从 * y * 20 + 10);

        era.print(`绝顶经验+${y * 10}`);
        // EXP:cid[2] + = y * 10（变量语义：EXP 族，cid[2] +）
        era.add(`exp:${cid}:2`, y * 10);
        era.print(`兽奸,异常,被虐经验+${y * 10}`);
        // EXP:cid[56] + = y * 10（变量语义：EXP 族，cid[56] +）
        era.add(`exp:${cid}:56`, y * 10);
        // EXP:cid[50] + = y * 10（变量语义：EXP 族，cid[50] +）
        era.add(`exp:${cid}:50`, y * 10);
        // EXP:cid[30] + = y * 10（变量语义：EXP 族，cid[30] +）
        era.add(`exp:${cid}:30`, y * 10);
        era.print(`私处经验+${y * 10}`);
        await era.printAndWait(`阴道扩张经验+${y * 10}`);
        // EXP:cid[0] + = y * 10（变量语义：EXP 族，cid[0] +）
        era.add(`exp:${cid}:0`, y * 10);
        // EXP:cid[52] + = y * 10（变量语义：EXP 族，cid[52] +）
        era.add(`exp:${cid}:52`, y * 10);

        // CFLAG:cid[107] + = y（变量语义：CFLAG 族，cid[107] +）
        era.add(`cflag:${cid}:107`, y);
      }
    } else {
      await era.printAndWait(
        `${name_of(cid)}把${marriage_name(cid)}满溢的精液喝光了。`,
      );

      era.print(
        `屈服,欲情,恭顺,耻情点数+${chara(cid).chara.结婚爱情 * 10 * y + 10}`,
      );
      // JUEL:cid[6] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[6] +）
      era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      // JUEL:cid[5] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[5] +）
      era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      // JUEL:cid[4] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[4] +）
      era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      // JUEL:cid[8] + = (CFLAG:cid[602] * 10 * y + 10 )（变量语义：JUEL 族，cid[8] +）
      era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 10 * y + 10);
      era.print(`口交经验+${y * 5}`);
      era.print(`精液经验+${y * 5}`);
      // EXP:cid[22] + = y * 5（变量语义：EXP 族，cid[22] +）
      era.add(`exp:${cid}:22`, y * 5);
      // EXP:cid[20] + = y * 5（变量语义：EXP 族，cid[20] +）
      era.add(`exp:${cid}:20`, y * 5);
      await era.printAndWait(`兽奸经验+${y * 5}`);
      // EXP:cid[56] + = y * 5（变量语义：EXP 族，cid[56] +）
      era.add(`exp:${cid}:56`, y * 5);
    }
  } else if (chara(cid).train.兽奸中毒 >= 1 || chara(cid).chara.结婚爱情 > 40) {
    await era.printAndWait(
      `${name_of(cid)}细心地舔舐着${marriage_name(cid)}的阴茎。`,
    );

    era.print(
      `屈服,欲情,恭顺,耻情点数+${chara(cid).chara.结婚爱情 * 8 * y + 8}`,
    );
    // JUEL:cid[6] + = (CFLAG:cid[602] * 8 * y + 8 )（变量语义：JUEL 族，cid[6] +）
    era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 8 * y + 8);
    // JUEL:cid[5] + = (CFLAG:cid[602] * 8 * y + 8 )（变量语义：JUEL 族，cid[5] +）
    era.add(`juel:${cid}:5`, chara(cid).chara.结婚爱情 * 8 * y + 8);
    // JUEL:cid[4] + = (CFLAG:cid[602] * 8 * y + 8 )（变量语义：JUEL 族，cid[4] +）
    era.add(`juel:${cid}:4`, chara(cid).chara.结婚爱情 * 8 * y + 8);
    // JUEL:cid[8] + = (CFLAG:cid[602] * 8 * y + 8 )（变量语义：JUEL 族，cid[8] +）
    era.add(`juel:${cid}:8`, chara(cid).chara.结婚爱情 * 8 * y + 8);
    era.print(`口交经验+${y * 5}`);
    era.print(`精液经验+${y * 5}`);
    // EXP:cid[22] + = y * 5（变量语义：EXP 族，cid[22] +）
    era.add(`exp:${cid}:22`, y * 5);
    // EXP:cid[20] + = y * 5（变量语义：EXP 族，cid[20] +）
    era.add(`exp:${cid}:20`, y * 5);
    await era.printAndWait(`兽奸经验+${y * 5}`);
    // EXP:cid[56] + = y * 5（变量语义：EXP 族，cid[56] +）
    era.add(`exp:${cid}:56`, y * 5);
  } else {
    await era.printAndWait(`${name_of(cid)}蹲在马厩的角落里，深深地绝望了。`);
    await era.printAndWait(
      `屈服,恐怖点数+${chara(cid).chara.结婚爱情 * 8 * y + 8}`,
    );
    // JUEL:cid[6] + = (CFLAG:cid[602] * 8 * y + 8 )（变量语义：JUEL 族，cid[6] +）
    era.add(`juel:${cid}:6`, chara(cid).chara.结婚爱情 * 8 * y + 8);
    // JUEL:cid[10] + = (CFLAG:cid[602] * 8 * y + 8 )（变量语义：JUEL 族，cid[10] +）
    era.add(`juel:${cid}:10`, chara(cid).chara.结婚爱情 * 8 * y + 8);
  }

  return y;
}

module.exports = {
  marriage_day,
  marriage_day_dog,
  marriage_day_you,
  marriage_day_lovers,
  marriage_day_slave,
  orc_marriage_day,
  slime_marriage_day,
  insect_marriage_day,
  ivy_marriage_day,
  syokusyu_marriage_day,
  faily_marriage_day,
  giant_marriage_day,
  man_marriage_day,
  girl_marriage_day,
  beast_marriage_day,
  brain_marriage_day,
  horse_marriage_day,
};
