/**
 * @file 战役 1「赤蛮咒森」的分发族与入口（#469，决议 #7）。
 *
 * 族的键都是 FLAG:400（当前进行中的战役号）；只有 campaign_set_1 存在，
 * FLAG:400 在可达状态下只能是 0/1（各调用点先挡 < 1），declaredIds
 * 声明 {1} 即可（page-campaign.js 文件头同款依据）。实现在
 * ere/page/page-campaign-1.js 注册。
 *
 * 族实例与入口放在这里、而不是迷宫主流程或战斗模块里：迷宫的房间选择
 * （dungeon-room）、讨伐对象的怪物表（dungeon-quest）、踏破与终局
 * （dungeon.js）都要用它们，而这几支互相顶层 require。族是纯分发器，
 * 没有别的依赖，适合做这个共用落点。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { chara } = require('#/facade/chara');
const { DispatchFamily } = require('#/system/dispatch/dispatch-family');
const { party_del } = require('#/system/dungeon/dungeon-party');

/** CAMPAIGN_ROOM_{FLAG:400} 族：战役迷宫的房间类型 */
const campaign_room_family = new DispatchFamily('CAMPAIGN_ROOM', [1]);
/** CAMPAIGN_QUEST_{FLAG:400} 族：战役中的踏破判定 */
const campaign_quest_family = new DispatchFamily('CAMPAIGN_QUEST', [1]);
/** CAMPAIGN_STORY_{FLAG:400} 族：踏破推进时插播的剧情文本 */
const campaign_story_family = new DispatchFamily('CAMPAIGN_STORY', [1]);
/** CAMPAIGN_ENDING_{FLAG:400} 族：战役终局演出 */
const campaign_ending_family = new DispatchFamily('CAMPAIGN_ENDING', [1]);
/**
 * CAMPAIGN_MONSTER_LIST_{FLAG:400} 族：战役迷宫的出现怪物表。
 * whenMissing 预置 190（骸骨缺省）。
 */
const campaign_monster_list_family = new DispatchFamily(
  'CAMPAIGN_MONSTER_LIST',
  [1],
);

/**
 * CAMPAIGN_MONSTER_LIST：战役迷宫的出现怪物表。
 * RESULT 预置 190（骸骨缺省）。
 * @param {number} floor 阶层
 * @param {(n: number) => number} [rand] RAND:N 随机源，透传给
 *   CAMPAIGN_MONSTER_LIST_1 的 DICE = RAND:3（缺省均匀随机，与调用方
 *   dungeon_party_battle 共用同一注入源，保持 PRNG 序列对齐）
 * @returns {Promise<number>} 怪物 ID（FLAG:400 < 1 时恒 190）
 */
async function campaign_monster_list(floor, rand) {
  const active = era_flag.hero_campaign_active;
  if (active < 1) {
    return 190;
  }
  return campaign_monster_list_family.call(active, {
    whenMissing: 190,
    args: [floor, rand],
  });
}

/**
 * campaign_quest：战役中的踏破判定，含
 * 楼层推进剧情（内嵌 campaign_story 族派发）。
 * RESULT：1 = 攻略成功 / 0 = 失败被赶回。
 * @param {number} cid 队长（ARG:0）
 * @returns {Promise<number>} RESULT（FLAG:400 < 1 时恒 0）
 */
async function campaign_quest(cid) {
  const active = era_flag.hero_campaign_active;
  if (active < 1) {
    return 0;
  }
  // 楼层（CFLAG:cid:501）超过剧情进度（FLAG:401）时推进一段剧情
  if (chara(cid).dungeon.侵攻阶层 > era_flag.campaign_story_progress) {
    era.print('―STORY―');
    await era.waitAnyKey(true); // FORCEWAIT
    await campaign_story_family.call(active, { whenMissing: 0, args: [] });
    era_flag.campaign_story_progress += 1;
  }
  return campaign_quest_family.call(active, { whenMissing: 0, args: [cid] });
}

/**
 * campaign_ending：战役终局演出。
 *
 * 角色复位循环无条件跑（不受 FLAG:400 < 1 早退约束，
 * FOR 循环放在 SIF 之前）：即使调用点已经用 `FLAG:400 > 0` 挡过一层，
 * 函数体自身仍保留这个无条件动作。
 *
 * 调用点传 ARG:0（队长），但函数体自身不使用，CAMPAIGN_ENDING_{n} 也不接收
 * 参数——故本移植不设形参。
 * @returns {Promise<number>} 家族调用的 RESULT（FLAG:400 < 1 时恒 0）
 */
async function campaign_ending() {
  // 全员取消战役派遣（与 CAMPAIGN_GAMEOVER 同构，各自独立保留）
  for (const cid of era.getAddedCharacters()) {
    if (chara(cid).invasion.状态 === 12) {
      party_del(cid);
      chara(cid).invasion.状态 = 0;
      chara(cid).invasion.回城标志 = 0;
    }
  }
  const active = era_flag.hero_campaign_active;
  if (active < 1) {
    return 0;
  }
  const result = await campaign_ending_family.call(active, {
    whenMissing: 0,
    args: [],
  });
  era_flag.hero_campaign_active = 0; // FLAG:400 = 0 战役结束清零
  return result;
}

/**
 * campaign_room：战役迷宫的房间类型。
 * @param {number} floor 阶层（ARG:0）
 * @returns {Promise<number>} 房间类型（FLAG:400 < 1 时恒 0）
 */
async function campaign_room(floor) {
  const active = era_flag.hero_campaign_active;
  if (active < 1) {
    return 0;
  }
  return campaign_room_family.call(active, { whenMissing: 0, args: [floor] });
}

module.exports = {
  campaign_room,
  campaign_quest,
  campaign_ending,
  campaign_monster_list,
  campaign_room_family,
  campaign_quest_family,
  campaign_story_family,
  campaign_ending_family,
  campaign_monster_list_family,
};
