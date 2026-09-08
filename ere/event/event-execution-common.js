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

function archive_fate(cid, fate) {
  const title = `${fate}${chara_callname(cid)}`;
  // TSTR:30 = VIDEO_MATURO 的一次性标题；VideoArchive = 角色末路标题表。
  era.set('tstr:30', title);
  era.set(`videoarchive:${cid}`, title);
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
  // FLAG:(角色 ID + 199) = 对应勇者已经处刑。
  era.set(`flag:${cid + 199}`, 1);

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
  dispose_character,
  get,
  release_equipment,
  she,
};
