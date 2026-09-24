/**
 * @file 处刑事件公共结算（issue #348）。
 *
 * 源: target/ERB/處刑相關/EXECUTION.ERB  @EXECUTION/@EXECUTION_MINI
 *     target/ERB/處刑相關/BANISHMENT.ERB  @BANISHMENT
 *     target/ERB/處刑相關/GROTESQUE.ERB  @GROTESQUE
 *     target/ERB/處刑相關/PUBLIC_EXECUTION.ERB  @PUBLIC_EXECUTION
 */

'use strict';

const era = require('#/era-electron');
const { name_reset } = require('#/chara/char-make');
const { template_no_of } = require('#/chara/chara-pregnancy');
const { party_char_del } = require('#/dungeon/dungeon-party');
const { equip_get } = require('#/system/equip/equip-lookup');
const { video_maturo } = require('#/system/stronghold/sell-video');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { chara_callname } = require('#/utils/callname-utils');

function get(name) {
  return era.get(name) || 0;
}

function she(cid) {
  return get(`talent:${cid}:122`) ? '他' : '她';
}

function apply_prestige(cid) {
  // TALENT:220 = 精英；EX_TALENT:1 = 扣威望的特殊角色。
  if (!get(`talent:${cid}:220`) && !get(`ex_talent:${cid}:1`)) {
    era_exflag.prestige += 2;
    era.print('威望值增加');
  } else {
    era_exflag.prestige -= 10;
    era.print('威望值减少');
  }
}

/**
 * SUISEI_STR（录像书架）的写入槽位（issue #561 第 1 条）：原作
 * `SUISEI_STR:A = …` 按**书架槽位**寻址（书架本体见 售卻相關/SELL_VIDEO.ERB
 * 的 @VIDEO_SHELF），A 是该角色在角色数组里的下标——处刑入口的
 * `A = COUNT` 取自 `REPEAT CHARANUM`（處刑相關/EXECUTION.ERB:65-73），既不是
 * ere 的角色 ID，也不是「逐角色末路记录」。
 *
 * ere 里用 `era.getAddedCharacters()` 的下标代位（引擎与夹具都按角色号升序
 * 返回，见 test/helpers/era-fixture.js 的「角色列表的顺序语义」段）。这是
 * **代位而非同构**：原作的下标是数组的插入序（ADDNUM 序，后加入的排在后面），
 * ere 是**角色号升序**——两者在「插入序 ≠ 角色号序」（例如先有 31 号、之后
 * 才加入 1 号）时给出的槽位不同，影响的只是书架内的相对顺序与覆写落点，
 * 不越界也不丢条目（登记 #14）。除名造成的下标前移两边同构。
 *
 * 这同时保证槽位恒落在 [0, CHARANUM) 内：写 `videoarchive:<角色 ID>` 会让
 * 后代（ID ≥ FIRST_CHILD_ID）落到 20000 格的书架之外，书架里看不到。
 * @param {number} cid 角色 ID
 * @returns {number} 书架槽位
 */
function archive_slot_of(cid) {
  return era.getAddedCharacters().indexOf(cid);
}

function archive_fate(cid, fate) {
  const title = `${fate}${chara_callname(cid)}`;
  // TSTR:30 = VIDEO_MATURO 的一次性标题；SUISEI_STR 是录像书架，槽位取角色
  // 在已加入列表中的位置（archive_slot_of 的注释）。
  era.set('tstr:30', title);
  era.set(`videoarchive:${archive_slot_of(cid)}`, title);
  video_maturo(cid);
}

function release_equipment(cid) {
  const target_chara = chara(cid);
  for (const [owner, field] of [
    [target_chara.chara, '武装'],
    [target_chara.event, '装饰'],
    [target_chara.event, '装饰2'],
  ]) {
    equip_get({ 存储编号: owner[field] });
    owner[field] = -1;
  }
}

async function dispose_character(
  cid,
  {
    equipment = true,
    experience_message,
    medal = false,
    message = true,
    reset_names = true,
  } = {},
) {
  const target_chara = chara(cid);
  if (equipment) release_equipment(cid);

  const level = target_chara.chara.等级;
  // FLAG:(NO:A + 199) = 对应勇者已经处刑（@EXECUTION 各支尾部的
  // `X = NO:A + 199; FLAG:X = 1`）。普通角色的 NO 就是角色 ID；后代的原作
  // NO 是来源模板号（chara-pregnancy.js 的 template_no_of），故经它换算——
  // 直加角色 ID 会写到 100199 以上的别处下标。
  era.set(`flag:${template_no_of(cid) + 199}`, 1);

  // 原作后续的“注册号大于被删号则减一”依赖 DELCHARA 重排；ere 使用稳定
  // 角色 ID，故只清掉真正指向被删角色的槽位（#21 扁平化裁定）。
  if (game.event.上次调教对象 === cid) game.event.上次调教对象 = -1;
  if (game.event.上次助手 === cid) game.event.上次助手 = -1;
  era_flag.target = game.event.上次调教对象;
  era_flag.assi = game.event.上次助手;

  party_char_del(cid);
  era.removeCharacter(cid);
  if (reset_names) await name_reset();

  game.event.处刑勇者数 += 1;
  const experience = (level + 1) * 50;
  chara(0).dungeon.战斗经验 += experience;
  if (medal) {
    chara(0).event.勋章经验 += 1;
    era.println();
    era.print('得到了用勇者力量形成的勋章');
    era.print('勋章经验+1');
  }
  if (message) {
    await era.printAndWait(
      experience_message?.(experience) ||
        `《封印吸取了勇者的力量，你获得了${experience}点的经验值！》`,
    );
  }
  era_flag.target = game.event.上次调教对象;
  era_flag.assi = game.event.上次助手;
  return 0;
}

module.exports = {
  apply_prestige,
  archive_fate,
  archive_slot_of,
  dispose_character,
  get,
  release_equipment,
  she,
};
