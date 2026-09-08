/**
 * @file 猎奇处刑（issue #348）。
 *
 * 源: target/ERB/處刑相關/GROTESQUE.ERB  @GROTESQUE（:2-222）
 */

'use strict';

const era = require('#/era-electron');
const {
  grotesque_koujo_family,
  kojo_handler_id,
} = require('#/kojo/kojo-system');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const era_flag = require('#/era-utils/era-flag');
const { chara_callname } = require('#/utils/callname-utils');
const {
  apply_prestige,
  archive_fate,
  dispose_character,
  get,
} = require('#/event/event-execution-common');

function default_rand(n) {
  return Math.floor(Math.random() * n);
}

const ENDINGS = [
  {
    fate: '人棍',
    lines: [
      '四肢被固定住的{name}被怪物们狠狠地凌虐之后',
      '四肢被一根一根地切下，喂给了下级怪物们了',
      '{name}就这样被放置直到失血死为止了。',
      '{name}之后被漂亮地剥制后，摆在了魔王的大宫殿里当装饰了………',
    ],
    beloved: '你十分疼爱地抚摸着被剥制后的{name}的脸颊………',
  },
  {
    fate: '活体饲料',
    lines: [
      '四肢被固定住的{name}被怪物们活生生地剖开了腹部',
      '肝脏还有肾脏都被怪物们互相争夺吃掉了，只留下维持生命的脏器而已',
      '{name}虽然暂时还活着………不过在短暂地挣扎中力竭了………',
    ],
    beloved: '你将{name}的尸体漂亮地剥制后、挂在了你的房间里当装饰了………',
  },
  {
    fate: '身首异处',
    lines: [
      '被固定在斩首台上的{name}被怪物们狠狠地侵犯的途中………',
      '斩首台的刀刃落下来了………',
    ],
    beloved:
      '{name}被干净利落切下来的脑袋被泡在了充满福尔马林液体的罐子里保管起来了………',
  },
  {
    fate: '红烧肉',
    lines: [
      '被实行火烧刑的{name}被火焰抱住了………',
      '变成黑炭的{name}的尸体被挂在了地下城入口处了',
    ],
    beloved: '在火焰中的听到了{name}不停地哭着求救的叫声………',
  },
  {
    fate: '肉类',
    seal: '在{name}的身上刻下封印所有力量的烙印后、被执行了食肉刑………',
    lines: [
      '用魔法将其身体的痛感变成快感后，怪物们将{name}的身体大卸八块了………',
      '最后{name}的脑袋被怪物们分食之后，{name}才咽下了最后一口气………',
    ],
    beloved: [
      '「明明…明明…胸部被怪物们吃着…但是好舒服啊…啊呜…呃…嗯哼呜呜」',
      '{name}好像已经坏掉了的样子………',
    ],
  },
  {
    fate: '低级幽灵',
    lines: [
      '{name}被施加了死灵化的诅咒………',
      '因为诅咒而变成低级死灵的{name}发出了怪异的叫声………',
      '{name}再也不能转生了，成为了地下城里的又一只游魂野鬼………',
    ],
    beloved: [
      '「啊啊啊…这样就能…一直跟你、一直一直在一起了~…好、好、好高高高高兴兴兴兴兴兴…………」',
      '{name}好像对你的身体十分地眷恋而四处徘徊着………',
    ],
  },
  {
    fate: '丧尸奴隶',
    lines: [
      '{name}被施加了僵尸化的诅咒………',
      '变成僵尸后的{name}进行着扩张地下城的工作………',
      '变成永远的奴隶的{name}将会成为你的力量的基石吧。',
    ],
    beloved: [
      '「啊呜…呜…胸部…腐烂掉了…要被…要被那位大人讨厌了…嫌要被讨厌了…」',
      '{name}的嘴边不停地掉落着扭动着的蠕虫的同时喃喃自语着………',
    ],
  },
];

function format_line(line, name) {
  return line.replaceAll('{name}', name);
}

async function grotesque(cid, rand_n = default_rand) {
  if (cid === 0) return 0;
  [
    '四肢切断刑',
    '内脏凌辱刑',
    '斩首刑',
    '火烧刑',
    '食肉刑',
    '死灵化',
    '僵尸化',
  ].forEach((label, index) => era.print(`[${index}] ${label}`));
  era.println();
  let result;
  do {
    result = await era.input({ useRule: false });
  } while (result < 0 || (result >= 7 && result !== 100));
  if (result === 100) {
    game.event.犬射精或处刑口上 = -1;
    return 0;
  }

  era_flag.target = cid;
  apply_prestige(cid);
  game.event.猎奇处刑口上 = result;
  const kojo_id = kojo_handler_id(cid);
  if (kojo_id >= 0) {
    const kojo_arg = kojo_id === 0 ? result : rand_n;
    await grotesque_koujo_family.call(kojo_id, {
      whenMissing: 0,
      args: [kojo_arg],
    });
  }
  // GROTESQUE_KOUJO 可改写 TFLAG:530；原作在 CALL 后读取。
  result = game.event.猎奇处刑口上;

  const name = chara_callname(cid);
  const ending = ENDINGS[result];
  const prelude = get(`talent:${cid}:85`)
    ? `${name}就这样不知道为什么会被处刑的情况下、怜爱地叫着你的名字请求着原谅。然而${chara_callname(0)}却`
    : '';
  await era.printAndWait(
    `${prelude}${format_line(ending.seal || '在{name}的身上刻下了封印所有力量的烙印', name)}`,
  );
  for (const line of ending.lines) {
    await era.printAndWait(format_line(line, name));
  }
  const beloved = ending.beloved;
  if (get(`talent:${cid}:85`) && beloved) {
    for (const line of Array.isArray(beloved) ? beloved : [beloved]) {
      await era.printAndWait(format_line(line, name));
    }
  }
  era.println();
  era.print('到手的勇者之力以勋章的形式保留下来了');
  era.print('勋章经验+1');
  chara(0).event.勋章经验 += 1;

  archive_fate(cid, ending.fate);
  return dispose_character(cid, {
    experience_message: (experience) =>
      `《吸收了被封印的勇者之力后你获得了${experience}的经验值！》`,
  });
}

module.exports = { grotesque };
