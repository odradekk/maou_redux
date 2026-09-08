/**
 * @file 处刑选择与迷你处刑（issue #348）。
 *
 * 源: target/ERB/處刑相關/EXECUTION.ERB
 *     @EXECUTION（:2-372）/@EXECUTION_MINI（:375-446）
 */

'use strict';

const era = require('#/era-electron');
const { search_family } = require('#/chara/chara-family');
const {
  exucution_koujo_family,
  kojo_handler_id,
} = require('#/kojo/kojo-system');
const {
  video_maturo,
  video_maturo2,
} = require('#/system/stronghold/sell-video');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const era_exflag = require('#/era-utils/era-exflag');
const era_flag = require('#/era-utils/era-flag');
const { chara_callname } = require('#/utils/callname-utils');
const { banishment } = require('#/event/event-banishment');
const {
  apply_prestige,
  dispose_character,
  get,
  release_equipment,
} = require('#/event/event-execution-common');
const { grotesque } = require('#/event/event-grotesque');
const { museum } = require('#/event/event-museum');
const { public_execution } = require('#/event/event-public-execution');

// 数字槽沿用原作：CFLAG:0/1/9/700 = 出售资格/当前状态/等级/收藏；
// TALENT:9/76/85/121/122 = 崩坏/淫乱/爱慕/扶她/男人，200–212 = 前职业，
// 230–233 = 淫核/淫乳/淫壶/淫肛，241/242/250 = 魔术/法术/咒术，
// 312/317/318 = 魅力点/喜好/阴茎状态；ABL:2/3/16/17/21/22/32/33 =
// 私处感觉/肛门感觉/侍奉精神/露出癖/抖M/百合/精液中毒/百合中毒。
function default_rand(n) {
  return Math.floor(Math.random() * n);
}

function execution_candidates() {
  return era.getAddedCharacters().filter((cid) => {
    const state = get(`cflag:${cid}:1`);
    return (
      cid !== 0 &&
      (state === 0 || state === 7) &&
      (!get(`ex_talent:${cid}:1`) ||
        (get(`ex_talent:${cid}:2`) && (era_exflag.mod_switch_bits & 2) !== 0))
    );
  });
}

function job_name(cid) {
  const jobs = [
    '战士',
    '魔法师',
    '神官',
    '盗贼',
    '肉便器',
    '骑士',
    get(`talent:${cid}:122`) ? '巫者' : '巫女',
    '忍者',
    '弓手',
    '苗床',
    '魔界将军',
    '魔导神官',
    '魔物使',
  ];
  const index = jobs.findIndex((_, offset) =>
    get(`talent:${cid}:${200 + offset}`),
  );
  return index < 0 ? ' ' : jobs[index];
}

function print_candidates(candidates) {
  era.drawLine();
  era.print('请选择处刑对象');
  if (game.event.装饰品数 < 20 && era_flag.day_count < 60) {
    era.print(
      `<${60 - era_flag.day_count}天以内再展出${20 - game.event.装饰品数}名勇者到博物馆将解锁实绩！>`,
    );
  } else {
    era.println();
  }
  era.drawLine();
  candidates.forEach((cid, index) => {
    let line = `[${String(index).padStart(2)}] ${chara_callname(cid).padEnd(12)} ${job_name(cid).padEnd(6)} LV${String(get(`cflag:${cid}:9`)).padStart(3)}`;
    if (get(`cflag:${cid}:700`)) line += ' [☆]';
    if (get(`cflag:${cid}:0`) > 0) line += ' [可卖掉]';
    era.print(line);
  });
}

function print_methods(cid) {
  [
    '流放出地下城',
    '公开处刑',
    '博物馆展品',
    '施行猎奇向处刑',
    '做成肉便器',
    '士兵化',
    '固定示众',
    '消除记忆后释放',
  ].forEach((label, index) => {
    era.print(
      index <= 4 && get(`cflag:${cid}:700`)
        ? [{ content: `[${index}] ${label}`, color: '#646464' }]
        : `[${index}] ${label}`,
    );
  });
  era.println();
  era.print('[100] 停止');
  era.print([
    {
      content: '[101] 水晶球记录',
      color: era_exflag.mod_switch_bits & 4 ? '#ffffff' : '#646464',
    },
  ]);
}

async function call_execution_kojo(cid, result, rand_n) {
  game.event.犬射精或处刑口上 = result;
  const kojo_id = kojo_handler_id(cid);
  if (kojo_id >= 0) {
    const kojo_arg = kojo_id === 0 ? result : rand_n;
    await exucution_koujo_family.call(kojo_id, {
      whenMissing: 0,
      args: [kojo_arg],
    });
  }
}

async function keep_as_soldier(cid) {
  // TALENT:254 = 魔之刻印（士兵化完成标记）。
  chara(cid).chara.魔之刻印 = 1;
  era.print(`在${chara_callname(cid)}的身体上刻上了服从的刻印，`);
  await era.printAndWait('只残留一点点的意识和记忆，');
  await era.printAndWait('命令其现在就去把勇者杀光。');
  chara(cid).chara.基础攻击 = Math.trunc(chara(cid).chara.基础攻击 / 2);
  chara(cid).chara.基础防御 = Math.trunc(chara(cid).chara.基础防御 / 2);
  await era.printAndWait('*法术的副作用导致其战斗力下降了*');
  const title = `魔王傀儡${chara_callname(cid)}`;
  era.set(`cstr:${cid}:30`, title);
  era.set('tstr:30', title);
  video_maturo2(cid);
}

async function keep_on_display(cid) {
  chara(cid).invasion.状态 = 8;
  era.print(`把${chara_callname(cid)}的屁股抬高，扣在固定的枷锁上，`);
  await era.printAndWait('任由怪物们发泄性欲，');
  if (get(`talent:${cid}:9`) === 1) {
    await era.printAndWait('被玩坏了的奴隶，什么都意识不到，在痴笑着。');
  } else if (get(`talent:${cid}:76`) === 1) {
    await era.printAndWait('淫乱的奴隶，不如说，正在享受现在的样子。');
  } else {
    await era.printAndWait('悲哀的奴隶，对今后将发生的制裁害怕极了。');
  }
  const title = `魔族公厕${chara_callname(cid)}`;
  era.set(`cstr:${cid}:30`, title);
  era.set('tstr:30', title);
  video_maturo2(cid);
}

function release_without_memory(cid) {
  era.print(
    `${chara_callname(cid)}被清除了关于地下城的所有记忆，被丢到地下城外了。`,
  );
  era.print(`${chara_callname(cid)}再次开始了冒险……`);
  chara(cid).dungeon.侵攻阶层 = 1;
  era.set(`cflag:${cid}:502`, 0);
  chara(cid).invasion.状态 = 2;
  chara(cid).dungeon.再起点 = 3;
  if (chara(cid).chara.善恶值 < -50) chara(cid).chara.善恶值 = -50;
  chara(cid).chara.好感度 = 20;
}

async function make_toilet(cid) {
  game.invasion.肉便器数 += 1;
  apply_prestige(cid);
  const family_id = search_family(cid);
  const name = chara_callname(cid);
  const prelude = get(`talent:${cid}:85`)
    ? `${name}不知道自己为什么要被做成肉便器，不停地高叫着你的名字，请求饶恕。`
    : '';
  await era.printAndWait(
    `${prelude}但${chara_callname(0)}依然给${name}烙上了封锁所有力量的封印，`,
  );
  await era.printAndWait('被吸收了全部力量的她，身体变成淫靡的肉块了。');
  await era.printAndWait('作为地下城里怪物的慰问品被使用着，');
  await era.printAndWait('今后别说重新当勇者，就连看一眼阳光也不可能了吧。');

  if (get(`talent:${cid}:原种族`) === 1) {
    await era.printAndWait(`精灵族的${name}在丑陋的兽人中广受好评。`);
  }
  if (get(`abl:${cid}:32`) > 0 || get(`talent:${cid}:擅用舌头`)) {
    await era.printAndWait(
      `${name}作为精液便器，每天都心怀欢喜地把精液喝光了。`,
    );
  }
  if (get(`abl:${cid}:33`) > 0 || get(`abl:${cid}:22`) > 2) {
    await era.printAndWait(
      `作为女子便器的${name}获得了很高的评价。阴部、肛门有污垢也毫不在意，老老实实地把她们舔高潮了。`,
    );
  }
  if (get(`abl:${cid}:21`) > 0) {
    await era.printAndWait(
      `沐浴在骂声中的${name}腿间开始湿润，脸上浮现起恍惚的笑容。`,
    );
  }
  if (get(`abl:${cid}:17`) > 0) {
    await era.printAndWait(
      `${name}在地下城的大街上展露痴态。不管是不是怪物，对所有路过的客人，均热情献媚。`,
    );
  }
  if (get(`abl:${cid}:16`) > 0) {
    await era.printAndWait(
      `完全崩坏了的${name}连自我都失去了，只有在侍奉肉棒时能感觉到喜悦。`,
    );
  }
  if (get(`abl:${cid}:2`) > 3) {
    await era.printAndWait(
      `被数之不尽的阴茎抽插，${name}的私处完全扩张，失去弹性了。最近的对象，全是巨魔和马这样有巨根的。`,
    );
  }
  if (get(`abl:${cid}:3`) > 3) {
    await era.printAndWait(
      `已经算不上是性器官，${name}的肛门，被极限扩张，关都关不上了。可是哪怕这样，只要有肉棒在直肠射精，她还是兴奋得快疯了似得。`,
    );
  }
  if (get(`talent:${cid}:85`)) {
    await era.printAndWait(`${name}把所有的阴茎都幻想成深爱的你的阴茎的模样。`);
  }
  if (get(`talent:${cid}:104`) || get(`talent:${cid}:232`)) {
    await era.printAndWait(
      `${name}对被什么东西插入并不在意，用卑微的话语哀求着打种。`,
    );
  }
  if (get(`talent:${cid}:106`) || get(`talent:${cid}:233`)) {
    await era.printAndWait(
      `${name}的肛门特别有感觉，恶魔们特意把她的肛门改造成能怀孕的样子。`,
    );
  }
  if (get(`talent:${cid}:102`) || get(`talent:${cid}:230`)) {
    await era.printAndWait(
      `${name}的阴蒂又大又肿，一鞭子下去，她就爱液四射，口水横流地绝顶了。`,
    );
  }
  if (get(`talent:${cid}:108`) || get(`talent:${cid}:231`)) {
    await era.printAndWait(
      `${name}的乳头被恶魔们改造过，现在可以插入乳头里性交了。`,
    );
  }
  if (get(`talent:${cid}:241`) || get(`talent:${cid}:250`)) {
    await era.printAndWait(
      `有魔力的${name}，头部完全被头罩包裹，强制地被削弱了魔力。`,
    );
  }
  if (get(`talent:${cid}:242`)) {
    await era.printAndWait(
      `有神圣之力的${name}，被恶魔们强制肛交了无数次，完全堕落为恶魔的力量了。`,
    );
  }
  if (get(`talent:${cid}:121`) && game.invasion.肉便器数 >= 2) {
    const penis = get(`talent:${cid}:318`);
    if (penis === 1) {
      era.print(`扶她巨根的${name}被改造成更大的阴茎，`);
      await era.printAndWait('奉命去侵犯其它的肉便器了。');
    } else if (penis === 2) {
      era.print(`扶她短小包茎的${name}为了发泄性欲压在其它肉便器身上。`);
      await era.printAndWait('但即使激烈地摆动腰身，也无法令对方满足。');
    } else if (penis === 3) {
      era.print(`扶她包茎的${name}哪怕洗澡，也不剥开包皮清洗里面的污垢。`);
      await era.printAndWait('而是让其它肉便器用口服侍清洁。');
    } else {
      era.print(`扶她的${name}积极地侵犯着其它肉便器，`);
      await era.printAndWait('巨大的阴囊生产了大量的精液，射到周围都是。');
    }
  }
  const charm = get(`talent:${cid}:312`);
  const charm_lines = {
    12: '作为魅力点的美乳，现在变成一堆丑陋膨胀的肉块了。',
    14: '作为魅力点的臀部曲线，现在变成一团下流膨胀的肉块了。',
    21: '作为魅力点的性器，现在正变成奇怪的肉块。',
    22: '作为魅力点的光泽的头发，现在完全褪色了。',
    23: '作为魅力点的大屁股，现在变成了充满下流气息的成熟桃子。',
  };
  if (charm_lines[charm]) await era.printAndWait(charm_lines[charm]);
  if (get(`talent:${cid}:317`) === 4 || get(`talent:${cid}:317`) === 11) {
    await era.printAndWait(
      `${name}双眼空虚，在重复着谁的名字。也许正在妄想和爱人拥抱吧。`,
    );
  }
  era.print(`现在的肉便器数量：${game.invasion.肉便器数}`);
  const title = `肉便器${name}`;
  if (family_id >= 0) era.set(`cstr:${family_id}:5`, title);
  era.set('tstr:30', title);
  video_maturo(cid);
  return dispose_character(cid, {
    experience_message: (experience) =>
      `《封印吸收了力量，使你获得了${experience}的经验值！》`,
  });
}

async function execution(rand_n = default_rand) {
  for (;;) {
    const candidates = execution_candidates();
    const unstarred_count = candidates.filter(
      (cid) => !get(`cflag:${cid}:700`),
    ).length;
    print_candidates(candidates);
    if (candidates.length === 0) return 0;
    era.drawLine();
    era.print('[100] 返回');
    let selected;
    do {
      selected = await era.input({ useRule: false });
    } while (
      selected < 0 ||
      (selected >= candidates.length && selected !== 100)
    );
    if (selected === 100) return 0;
    const cid = candidates[selected];

    for (;;) {
      print_methods(cid);
      let result;
      do {
        result = await era.input({ useRule: false });
      } while (result < 0 || (result >= 8 && result !== 100 && result !== 101));
      if (result === 101) {
        era_exflag.mod_switch_bits ^= 4;
        continue;
      }
      if (result === 100) {
        era_flag.target = game.event.上次调教对象;
        return 0;
      }
      if (result <= 4 && get(`cflag:${cid}:700`)) {
        await era.printAndWait(
          `${chara_callname(cid)}在收藏列表之中，不能被处刑。`,
        );
        continue;
      }
      if (result === 5 && cid >= 17 && cid <= 40) {
        await era.printAndWait(
          `${chara_callname(cid)}拥有【不受洗脑】，无法进行士兵化洗脑。`,
        );
        continue;
      }

      era_flag.target = cid;
      await call_execution_kojo(cid, result, rand_n);
      result = game.event.犬射精或处刑口上;
      if (result === 0) {
        era.print(
          `${chara_callname(0)}把${chara_callname(cid)}从地下城里永久驱逐了。`,
        );
        return banishment(cid, rand_n);
      }
      if (result === 1) {
        era.print(`${chara_callname(0)}把${chara_callname(cid)}公开处刑了。`);
        return public_execution(cid, rand_n);
      }
      if (result === 2) {
        await era.printAndWait(`${chara_callname(cid)}被带到了工作室……`);
        return museum(cid, rand_n);
      }
      if (result === 3) {
        era.print(
          `${chara_callname(0)}决定让${chara_callname(cid)}品尝真正的痛苦…`,
        );
        await era.printAndWait('　　　　　　　　　　< ※ 注 意 ！ ※ >');
        await era.printAndWait('（之后将发生非常黄暴的事！！）');
        return grotesque(cid, rand_n);
      }
      if (result === 4) {
        await make_toilet(cid);
        // 源只在仍有未收藏候选时重画列表；稳定 ID 下重新求候选等价。
        if (unstarred_count > 1) break;
        return 0;
      }
      if (result === 5) await keep_as_soldier(cid);
      else if (result === 6) await keep_on_display(cid);
      else release_without_memory(cid);
      era_flag.target = game.event.上次调教对象;
      era_flag.assi = game.event.上次助手;
      return 0;
    }
  }
}

async function execution_mini(cid = era_flag.target, note = '') {
  era_flag.target = cid;
  release_equipment(cid);
  era.drawLine();
  if (note === '') {
    era.print(`给${chara_callname(cid)}刻下了封印所有力量的烙印。`);
    await era.printAndWait('继续处刑');
    apply_prestige(cid);
  }
  await dispose_character(cid, {
    equipment: false,
    experience_message: (experience) =>
      `《封印把勇者的力量吸收了，你获得了${experience}的经验值！》`,
    medal: true,
    reset_names: false,
  });
  // 原作紧邻两次 DELCHARA TARGET；ere 的角色键稳定，第二次同 ID 删除是
  // 幂等操作。保留第二次 API 调用，不把缺陷扩散成“删除下一个角色”。
  era.removeCharacter(cid);
  era.drawLine();
  return 0;
}

module.exports = { execution, execution_mini };
