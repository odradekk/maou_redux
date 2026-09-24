/**
 * @file 公开处刑（issue #348）。
 *
 * 源: target/ERB/處刑相關/PUBLIC_EXECUTION.ERB  @PUBLIC_EXECUTION（:2-194）
 */

'use strict';

const era = require('#/era-electron');
const { search_family } = require('#/chara/chara-family');
const { public_exucution_koujo } = require('#/kojo/kojo-system');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const era_flag = require('#/era-utils/era-flag');
const { chara_callname } = require('#/utils/callname-utils');
const {
  apply_prestige,
  archive_fate,
  dispose_character,
  get,
  she,
} = require('#/event/event-execution-common');

function default_rand(n) {
  return Math.floor(Math.random() * n);
}

async function public_execution(cid, rand_n = default_rand) {
  if (cid === 0) return 0;
  const family_id = search_family(cid);
  // 原作 :19-21 是 `PRINTFORML [0]`…`[2]` 的纯文本选项、:22 的空行、:26 的
  // INPUT（PR #53 通则：升格为按钮，正文不写 [编号] 前缀，引擎按 showAcc
  // 自动拼）。
  era.printButton('凌辱刑', 0);
  era.printButton('绞刑', 1);
  era.printButton('魂粉碎', 2);
  era.println(); // :22 的空行（PRINTFORML  的尾随空格）

  let result;
  do {
    // 保留 useRule: false 以留住 :23 被注释掉的 `[100] 算了`（见下）。
    result = await era.input({ useRule: false });
  } while (result < 0 || (result >= 3 && result !== 100));
  // :23 的 `;PRINTFORML [100] 算了` 被注释掉、界面上不显示，但 :31-33 的
  // `ELSEIF RESULT == 100` 仍受理它（原作置 TFLAG:16 = -1 后 JUMP 批量处刑；
  // ere 没有该魔改入口，本函数以「不执行」返回表达同一出口）。
  if (result === 100) {
    game.event.犬射精或处刑口上 = -1;
    return 0;
  }

  era_flag.target = cid;
  apply_prestige(cid);
  game.event.公开处刑口上 = result;
  // EVENT_K.ERB:402-412 的 @PUBLIC_EXUCUTION_KOUJO（#403 收口到分发入口）
  await public_exucution_koujo(cid, result, rand_n);
  // PUBLIC_EXECUTION_KOUJO 可改写 TFLAG:520；原作在 CALL 后读取。
  result = game.event.公开处刑口上;

  const name = chara_callname(cid);
  let fate;
  if (result === 0) {
    const prelude = get(`talent:${cid}:85`)
      ? `${name}不知道自己为什么要被做成肉便器，不停地高叫着你的名字，请求饶恕。`
      : '';
    await era.printAndWait(
      `${prelude}但${chara_callname(0)}依然给${name}烙上了封锁所有力量的封印。`,
    );
    era.print('直到玩坏为止，让地下城里的怪物们随意地凌辱，');
    await era.printAndWait('为了一时的娱乐而被公开处刑了。');
    if (get(`talent:${cid}:85`)) {
      await era.printAndWait(`${name}的尸体，作为祭品被怪物郑重地奉献给你了。`);
    }
    fate = '凌辱致死';
  } else if (result === 1) {
    const prelude = get(`talent:${cid}:85`)
      ? `${name}不知道自己为什么要被做成肉便器，不停地高叫着你的名字，请求饶恕。`
      : '';
    await era.printAndWait(
      `${prelude}但${chara_callname(0)}依然给${name}烙上了封锁所有力量的封印，`,
    );
    await era.printAndWait('在地下城的大街上，全裸地被吊起来了。');
    await era.printAndWait('脖子上挂着一块【我卖淫！！】的牌子，');
    await era.printAndWait(
      get(`talent:${cid}:122`)
        ? '嘴巴和肛门，都被巨大的假阳具贯穿了。'
        : '私处和肛门，都被巨大的假阳具贯穿了。',
    );
    if (get(`talent:${cid}:85`)) {
      await era.printAndWait(
        `${name}的尸体，被悬挂示众三天之后，${chara_callname(0)}亲自将${she(cid)}火化了。`,
      );
    }
    fate = '淫行悬挂';
  } else {
    await era.printAndWait(
      `封印了${name}的力量之后，将${she(cid)}的四肢锁上。`,
    );
    await era.printAndWait(
      `在咒术师的咏唱下，有一只白色的球状灵魂从${she(cid)}不停挣扎的身体里被吸出来了。`,
    );
    await era.printAndWait(
      `${chara_callname(0)}随意地一伸手，把那灵魂捏碎啦！`,
    );
    await era.printAndWait(
      '这光景，以【违逆魔王的勇者】为题，在全地下城里直播。',
    );
    const fates = [
      ['被魔界的锻造工所回收，作为武具的材料，被加工利用了。', '武具的素材'],
      ['被魔界的魔法公会所回收，作为实验用的人偶。', '实验人形'],
      ['被某个军官所回收，作为人肉充气娃娃用了。', '人肉充气娃娃'],
      ['被喜欢百合的淫魔所回收，作为使魔用了。', '淫魔的使魔'],
      ['被隐居的老魔法师所回收，作为自己新的身体用了。', '魔法师的肉体'],
      ['被魔界的厨师所回收，作为特别菜色用了。', '食材'],
      ['被魔术学院所回收，作为人体实验的材料用了。', '人体实验的素材'],
      ['被奇妙的组织领走了，成为了他们可疑信仰的降神傀儡。', '降神的傀儡'],
      ['被下级怪物们分食了。', '怪兽口粮'],
      ['被下级怪物们分食了。', '怪兽口粮'],
    ];
    const [ending, selected_fate] = fates[rand_n(10)];
    await era.printAndWait(`失去灵魂的${name}的身体，${ending}`);
    fate = selected_fate;
  }

  chara(0).event.勋章经验 += 1;
  era.println();
  era.print('得到了用勇者力量形成的勋章');
  era.print('勋章经验+1');
  if (family_id >= 0) era.set(`cstr:${family_id}:5`, fate);
  // SUISEI_STR:A 是「按书架槽位」记标题（A = 该角色在角色数组里的下标，
  // event-execution-common.js 的 archive_slot_of）；VIDEO_MATURO 另按开关
  // 把同一标题追加进首个空槽。
  archive_fate(cid, fate);
  return dispose_character(cid, {
    experience_message: (experience) =>
      `《封印把勇者的力量吸收了，你获得了${experience}的经验值！》`,
  });
}

module.exports = { public_execution };
