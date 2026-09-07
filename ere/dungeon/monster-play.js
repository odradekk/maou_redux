/**
 * @file 怪物玩弄（issue #340，阶段 5a L9）。
 *
 * 源: target/ERB/怪物相關/MONSTER_PLAY.ERB  @MONSTER_PLAY（:5-74）、
 *     @MONSTERPLAY_LIST（:77-96）与十三个种族分支（见各函数头）。
 */

'use strict';

const era = require('#/era-electron');
const { begin, STATE } = require('#/system/flow/begin-signal');
const { chara } = require('#/facade/chara');
const { e_get, monster_data } = require('#/dungeon/monster-data');

/** 原作 RAND:N（0..N-1）的缺省实现。 */
function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/** ITEM:N 怪物库存；未声明槽按 Emuera 初值 0 处理。 */
function item_count(id) {
  return era.get(`item:${id}`) || 0;
}

/** ITEMNAME:N 怪物名。 */
function item_name(id) {
  return era.get(`itemname:${id}`) ?? '';
}

/** SAVESTR:A 在 ere 的名字承载。 */
function name_of(cid) {
  return era.get(`callname:${cid}:-1`) ?? '';
}

/** PRINTW / PRINTFORMW：输出一行并等键。 */
async function print_wait(text) {
  await era.printAndWait(text);
}

/**
 * @MONSTERPLAY_LIST（:77-96）：列出库存非零的 100-199 号怪物。
 * 原作是三项一行的自由输入文本；ere 以同编号按钮承载可达输入。
 * @returns {number} 原作 RETURN 0
 */
function monsterplay_list() {
  let row = [];
  for (let id = 100; id < 200; id += 1) {
    if (item_count(id) >= 1) {
      row.push({
        type: 'button',
        accelerator: id,
        content: item_name(id),
        config: { align: 'left', width: 12 },
      });
      if (row.length === 3) {
        era.printMultiColumns(row);
        row = [];
      }
    }
  }
  if (row.length > 0) era.printMultiColumns(row);
  return 0;
}

/** @MONSTER_PLAY_DOG（:99-117）：野狗。 */
async function monster_play_dog(cid, y) {
  if ((era.get('talent:0:122') || 0) === 1) {
    await print_wait('你为狗做了点心。');
    return 0;
  }
  await print_wait('『汪汪，汪汪汪～～』');
  await print_wait(
    `${name_of(cid)}用甜美的声音把狗引到怀里，${name_of(cid)}四肢分开，把野狗膨胀的阴茎引入了私处。`,
  );
  era.print(`私处经验+${y}`);
  era.add(`exp:${cid}:0`, y); // EXP:A:0 = 私处经验
  await print_wait(`兽奸经验+${y}`);
  era.add(`exp:${cid}:56`, y); // EXP:A:56 = 兽奸经验
  era.add(`cflag:${cid}:106`, y); // CFLAG:A:106 = 野狗受精计数
  return 0;
}

/** @ORC_MONSTER_PLAY（:121-167）：亚人。 */
async function orc_monster_play(cid, y, rand = default_rand) {
  if ((era.get('talent:0:122') || 0) === 1) {
    await print_wait('『魔王大人，请饶了我吧…』');
    return 0;
  }
  const greetings = [
    '『魔…魔王大人的爱爱……啊…！』',
    '『有这宠幸，太感谢了…』',
    '『魔王大人真的合适吗，和我这样的？』',
    '『呃…呃……啊……魔王大人…啊……』',
    '『哼啊啊～～噢～魔王……大……人…』',
  ];
  await print_wait(greetings[rand(5)]);
  if (rand(2) === 0) {
    await print_wait('『魔王大人…我的鸡鸡快要…！』');
    await print_wait(
      `${name_of(cid)}全裸着玩弄兽人的阴茎。浓厚的精液流入${name_of(cid)}的嘴里了…`,
    );
    era.print(`口交经验+${y}`);
    era.print(`精液经验+${y}`);
    era.add(`exp:${cid}:22`, y); // EXP:A:22 = 口交经验
    era.add(`exp:${cid}:20`, y); // EXP:A:20 = 精液经验
  } else {
    await print_wait('『大家，一起向魔王大人齐射…！』');
    await print_wait(
      `${name_of(cid)}的私处内，嘴里，肛门，所有洞里都插着兽人们的阴茎，被精液注射得满满的！`,
    );
    await print_wait('空洞的眼睛望着地下城那微暗的天花板，失去了焦点。');
    await print_wait(
      `${y}人份的存货，沾满了脸和性器，看到这个样子，兽人们更加兴奋了。`,
    );
    era.print(`私处经验+${y}`);
    era.print(`肛门经验+${y}`);
    era.print(`口交经验+${y}`);
    era.print(`精液经验+${y}`);
    era.add(`exp:${cid}:0`, y); // EXP:A:0 = 私处经验
    era.add(`exp:${cid}:1`, y); // EXP:A:1 = 肛门经验
    era.add(`exp:${cid}:22`, y); // EXP:A:22 = 口交经验
    era.add(`exp:${cid}:20`, y); // EXP:A:20 = 精液经验
    era.add(`cflag:${cid}:107`, y); // CFLAG:A:107 = 阴道内射精计数
  }
  await era.waitAnyKey(); // :121-167 WAIT
  return 0;
}

/** @SLIME_MONSTER_PLAY（:170-203）：史莱姆。 */
async function slime_monster_play(cid, y, rand = default_rand) {
  if ((era.get('talent:0:122') || 0) === 1) {
    await print_wait('你把双脚放入黏液里，充分地感受那冷冷的触感。');
    return 0;
  }
  await print_wait('黏液怪蠢动着………');
  if (rand(2) === 0) {
    await print_wait(`${name_of(cid)}享受着黏液浴。`);
    await print_wait('…黏黏糊糊的！');
    era.print(`耻情点数+${y * 10}`);
    era.print(`欲情点数+${y * 10}`);
    era.add(`juel:${cid}:5`, y * 10); // 原作 JUEL:A:5（文案称耻情，1:1）
    era.add(`juel:${cid}:8`, y * 10); // 原作 JUEL:A:8（文案称欲情，1:1）
  } else {
    await print_wait(`${name_of(cid)}享受着黏液浴。`);
    await print_wait(
      `${name_of(cid)}的肛门被大量的黏液逆流进去，正品味着那美妙的感觉。`,
    );
    era.print(`肛门经验+${y}`);
    era.print(`耻情点数+${y * 10}`);
    era.print(`欲情点数+${y * 10}`);
    era.add(`juel:${cid}:5`, y * 10); // JUEL:A:5 = 原作耻情点数写入槽
    era.add(`juel:${cid}:8`, y * 10); // JUEL:A:8 = 原作欲情点数写入槽
    era.add(`exp:${cid}:1`, y); // EXP:A:1 = 肛门经验
  }
  await era.waitAnyKey();
  return 0;
}

/** @INSECT_MONSTER_PLAY（:206-234）：昆虫。 */
async function insect_monster_play(cid, y, rand = default_rand) {
  if ((era.get('talent:0:122') || 0) === 1) {
    await print_wait('你充满兴趣地观察了昆虫。');
    return 0;
  }
  await print_wait('在节肢动物的甲壳上摩擦着…');
  if (rand(2) === 0) {
    await print_wait('『嗯…嗯…嗯嗯……』');
    await print_wait(`${name_of(cid)}用嘴吸啜了输卵管。`);
    era.print(`欲情点数+${y * 10}`);
    era.add(`juel:${cid}:5`, y * 10); // JUEL:A:5 = 原作欲情点数写入槽
  } else {
    await print_wait('『咦～～呀～～』');
    await print_wait(`${name_of(cid)}的肛门被输卵管贯通，在里面产卵了。`);
    await print_wait(`${name_of(cid)}四肢大张，准备着产卵。`);
    await print_wait(`${y}只轮流从体内滚落到身下，从臀部到背部全被卵覆盖了。`);
    era.print(`肛门经验+${y}`);
    era.add(`exp:${cid}:1`, y); // EXP:A:1 = 肛门经验
  }
  await era.waitAnyKey();
  return 0;
}

/** @IVY_MONSTER_PLAY（:237-268）：藤蔓。 */
async function ivy_monster_play(cid, y, rand = default_rand) {
  if ((era.get('talent:0:122') || 0) === 1) {
    await print_wait('你充满兴趣地观察了植物。');
    return 0;
  }
  await print_wait('『嘿哟～…』');
  if (rand(2) === 0) {
    await print_wait('藤蔓紧紧地缠绕着！');
    await print_wait(
      `不知轻重的藤蔓勒得${name_of(cid)}非常痛苦，在被开放的瞬间，大口大口地喘着粗气。`,
    );
  } else {
    await print_wait('藤蔓在肛门里扎根了。');
    await print_wait(`${name_of(cid)}的肛门被蹂躏着，发出了声嘶力竭的尖叫。`);
    await print_wait('藤蔓吸收到了养分，一口气从直肠中拔出来了。');
    era.print(`肛门经验+${y}`);
    era.add(`exp:${cid}:1`, y); // EXP:A:1 = 肛门经验
  }
  era.print(`苦痛点数+${y * 10}`);
  era.print(`恐怖点数+${y * 10}`);
  era.add(`juel:${cid}:9`, y * 10); // JUEL:A:9 = 苦痛点数
  era.add(`juel:${cid}:10`, y * 10); // JUEL:A:10 = 恐怖点数
  await era.waitAnyKey();
  return 0;
}

/** @SYOKUSYU_MONSTER_PLAY（:271-317）：触手。 */
async function syokusyu_monster_play(cid, y, rand = default_rand) {
  if ((era.get('talent:0:122') || 0) === 1) {
    await print_wait('触手蜿蜒地动着…');
    return 0;
  }
  await print_wait('触手蠢蠢欲动………');
  const x = rand(4);
  if (x === 0) {
    await print_wait(`${name_of(cid)}用嘴吸啜着触手前端流出的粘液，`);
    await print_wait('大量的体液迸发，被呛到了，不久之后意识渐渐地模糊………');
    era.print(`欲情点数+${y * 10}`);
    era.add(`juel:${cid}:5`, y * 10); // JUEL:A:5 = 欲情点数
  } else if (x === 1) {
    await print_wait(`触手在${name_of(cid)}的肛门里不断深入着，`);
    await print_wait('肛门不断吸收着触手洒在直肠内的体液，');
    await print_wait('最后，菊门放松，淫秽的肛门里开始流出大量的浑浊体液。');
    era.print(`肛门经验+${y}`);
    era.print(`欲情点数+${y * 10}`);
    era.add(`juel:${cid}:5`, y * 10); // JUEL:A:5 = 欲情点数
    era.add(`exp:${cid}:1`, y); // EXP:A:1 = 肛门经验
  } else if (x === 2) {
    await print_wait(`${name_of(cid)}的性器接受了触手的侵犯，`);
    await print_wait('粗大的触手，分泌着媚药的成分，在私处里不断抽插着。');
    era.print(`私处经验+${y}`);
    era.print(`欲情点数+${y * 10}`);
    era.add(`juel:${cid}:5`, y * 10); // JUEL:A:5 = 欲情点数
    era.add(`exp:${cid}:0`, y); // EXP:A:0 = 私处经验
    era.add(`cflag:${cid}:107`, y); // CFLAG:A:107 = 阴道内射精计数
  } else {
    await print_wait(
      `${name_of(cid)}嘴也好，肛门也好，私处也好，所有被触手入侵的地方，都流出了大量的体液，`,
    );
    await print_wait(`里面还带有媚药的成分，${name_of(cid)}完全沉醉其中了…`);
    era.print(`肛门经验+${y}`);
    era.print(`私处经验+${y}`);
    era.print(`欲情点数+${y * 10}`);
    era.add(`juel:${cid}:5`, y * 10); // JUEL:A:5 = 欲情点数
    era.add(`exp:${cid}:0`, y); // EXP:A:0 = 私处经验
    era.add(`exp:${cid}:1`, y); // EXP:A:1 = 肛门经验
    era.add(`cflag:${cid}:107`, y); // CFLAG:A:107 = 阴道内射精计数
  }
  await print_wait(`触手经验+${y}`);
  era.add(`exp:${cid}:55`, y); // EXP:A:55 = 触手经验
  return 0;
}

/** @FAILY_MONSTER_PLAY（:320-346）：妖精（函数名按原作拼写）。 */
async function fairy_monster_play(cid, y) {
  const male = (era.get(`talent:${cid}:122`) || 0) === 1;
  const futanari = (era.get(`talent:${cid}:121`) || 0) === 1;
  await print_wait(
    male ? '『要奴家这么小的？真的没关系么？』' : '『魔王大人！大变态！』',
  );
  if (male || futanari) {
    await print_wait('『这就是，魔王大人的鸡鸡……』');
    await print_wait(`${name_of(cid)}的阴茎，妖精用全身仔细地侍奉着`);
    era.print(`阴茎点数+${y * 10}`);
  } else {
    await print_wait('『舔了哦！』');
    await print_wait(`${name_of(cid)}的阴蒂和两个乳头，被妖精们不停舔舐着，`);
    await print_wait('由于妖精们的舌头运用身体感到越来越苦闷了。');
    era.print(`阴核点数+${y * 10}`);
  }
  era.print(`欲情点数+${y * 10}`);
  era.add(`juel:${cid}:0`, y * 10); // JUEL:A:0 = 阴茎/阴核点数
  era.add(`juel:${cid}:5`, y * 10); // JUEL:A:5 = 欲情点数
  await era.waitAnyKey();
  return 0;
}

/** @GIANT_MONSTER_PLAY（:349-377）：巨人；原作 X 恒为 0。 */
async function giant_monster_play(cid, y) {
  if ((era.get('talent:0:122') || 0) === 1) {
    await print_wait('『魔王大人，请饶了我吧…』');
    return 0;
  }
  await print_wait('『魔王大人，被弄坏了也可以么？』');
  // :349-377 X = 0；其余三臂恒不达，1:1 不引入随机源。
  await print_wait('『洒家这辈子值了！！！』');
  await print_wait(`${name_of(cid)}的腰被巨人抓着，雄壮的阴茎在体内抽插着，`);
  await print_wait('『嗯！魔王大人！真舒服！！』');
  await print_wait('一瞬间，腹部夸张地膨胀起来，大量的精液喷涌而出了…');
  era.print(`私处经验+${y}`);
  era.print(`精液经验+${y}`);
  era.print(`阴道扩张经验+${y}`);
  era.add(`exp:${cid}:0`, y); // EXP:A:0 = 私处经验
  era.add(`exp:${cid}:20`, y); // EXP:A:20 = 精液经验
  era.add(`exp:${cid}:53`, y); // EXP:A:53 = 阴道扩张经验
  era.add(`cflag:${cid}:107`, y); // CFLAG:A:107 = 阴道内射精计数
  await era.waitAnyKey();
  return 0;
}

/** @MAN_MONSTER_PLAY（:380-418）：男魔族。 */
async function man_monster_play(cid, y, rand = default_rand) {
  if ((era.get('talent:0:122') || 0) === 1) {
    await print_wait('『魔王大人真会开玩笑……』');
    return 0;
  }
  await print_wait('『真，真的可以吗！？魔王大人！…真不敢相信…』');
  if (rand(2) === 0) {
    await print_wait('『啊噢…魔王大人…好舒服…』');
    await print_wait(
      `${name_of(cid)}全裸着侍奉魔族的阴茎。${name_of(cid)}的舌头，让魔族男身体越发苦闷了。`,
    );
    era.print(`口交经验+${y}`);
    era.print(`精液经验+${y}`);
    era.add(`exp:${cid}:22`, y); // EXP:A:22 = 口交经验
    era.add(`exp:${cid}:20`, y); // EXP:A:20 = 精液经验
  } else {
    await print_wait('『魔王大人…这么漂亮的屁股…！』');
    await print_wait(`${name_of(cid)}手扶墙壁，向男魔族们抬起屁股诱惑着，`);
    await print_wait(`魔族们争先恐后地勃起了，抢着侵犯${name_of(cid)}，`);
    await print_wait(`${name_of(cid)}的呻吟越来越大声，正享受着这份快感。`);
    era.print(`私处经验+${y}`);
    era.print(`肛门经验+${y}`);
    era.print(`精液经验+${y}`);
    era.add(`exp:${cid}:0`, y); // EXP:A:0 = 私处经验
    era.add(`exp:${cid}:1`, y); // EXP:A:1 = 肛门经验
    era.add(`exp:${cid}:20`, y); // EXP:A:20 = 精液经验
    era.add(`cflag:${cid}:107`, y); // CFLAG:A:107 = 阴道内射精计数
  }
  await era.waitAnyKey();
  return 0;
}

/** @GIRL_MONSTER_PLAY（:421-456）：女魔族。 */
async function girl_monster_play(cid, y) {
  const male = (era.get(`talent:${cid}:122`) || 0) === 1;
  await print_wait(
    male
      ? '『啊啦啦？魔王大人想和我们玩吗？♡♡♡嘻嘻～让我们来侍奉魔王大人吧，绝对比那些臭勇者好多了我们！！』'
      : '『魔王大人…还有这样的爱好啊～』',
  );
  if (male) {
    await print_wait(
      '『噢～啊～魔王大人～好棒♡♡♡可以的话，每晚都让我们来侍奉你吧？我们会为魔王大人做任何事情～怎么玩都可以哦！』',
    );
    await print_wait(`${name_of(cid)}的阴茎旁，围着一群恳求着的魔族女孩。`);
    era.print(`阴茎点数+${y * 10}`);
    era.print(`欲情点数+${y * 10}`);
    era.add(`juel:${cid}:0`, y * 10); // JUEL:A:0 = 阴茎点数
    era.add(`juel:${cid}:5`, y * 10); // JUEL:A:5 = 欲情点数
  } else {
    await print_wait('『啊～魔王大人！我是你的奴隶♪』');
    await print_wait(
      `${name_of(cid)}的${(era.get(`talent:${cid}:121`) || 0) === 1 ? '阴茎' : '假阳具'}侵犯着魔族女孩，`,
    );
    await print_wait('同为女人，感受到了与众不同的快感。');
    era.print(`阴核点数+${y * 10}`);
    era.print(`欲情点数+${y * 10}`);
    era.print(`百合经验+${y}`);
    era.add(`juel:${cid}:0`, y * 10); // JUEL:A:0 = 阴核点数
    era.add(`juel:${cid}:5`, y * 10); // JUEL:A:5 = 欲情点数
    // EXP:A:40 = 百合经验，归 train 域；跨域写经属主门面。
    chara(cid).train.百合经验 += y;
  }
  await era.waitAnyKey();
  return 0;
}

/**
 * @BRAIN_MONSTER_PLAY（:478-507）：食脑魔。
 * :478-507 中无条件 RETURN 0 后的 RAND:40、死亡和异常经验全不可达。
 */
async function brain_monster_play(cid, y, rand = default_rand) {
  void cid;
  void y;
  void rand;
  await print_wait('『魔王大人，请饶了我吧…』');
  return 0;
}

/**
 * @MONSTER_PLAY（:5-74）：选择怪物、执行对应种族场景并转入回合结束。
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 999 取消时返回 0；成功路径发出 BEGIN TURNEND
 */
async function monster_play(rand = default_rand) {
  era.drawLine();
  era.print('请选择怪物');
  era.drawLine();
  monsterplay_list();
  if (item_count(22) >= 1) {
    era.printButton('野狗', 900);
  }
  era.printButton('返回', 999);

  let selected;
  for (;;) {
    // 原作列表是 PRINT + INPUT，可输入未显示但有库存的编号；按钮不应把
    // 这个行为收紧，故显式关闭引擎的按钮白名单。
    selected = await era.input({ useRule: false });
    if (selected === 999) return 0;
    if (
      (selected !== 900 && item_count(selected) <= 0) ||
      (selected === 900 && item_count(22) <= 0)
    ) {
      await era.clear(1); // :5-74 CLEARLINE 1，只清输入回显，不重画菜单
      continue;
    }
    break;
  }

  let type = 0;
  if (selected !== 900) {
    // :5-74 X 列取数。与 Y/场景共用随机序列，保留 MONSTER_DATA 的消费顺序。
    monster_data(selected, 5, -1, -1, -1, rand);
    type = e_get(507); // E:507 = 凌辱类型（怪物种族）
  }

  const cid = 0; // :5-74 A = 0（魔王）
  const y = rand(5) + 3; // :5-74 Y = RAND:5 + 3
  if (selected === 900) {
    await monster_play_dog(cid, y);
  } else {
    const play_by_type = {
      1: orc_monster_play,
      2: slime_monster_play,
      3: insect_monster_play,
      4: ivy_monster_play,
      5: syokusyu_monster_play,
      6: fairy_monster_play,
      7: giant_monster_play,
      8: man_monster_play,
      9: girl_monster_play,
      10: beast_monster_play,
      11: brain_monster_play,
      12: horse_monster_play,
    };
    const play = play_by_type[type];
    if (play) await play(cid, y, rand);
  }

  // :5-74 场景后的处女丧失判定。TALENT:0 属 chara 域，跨域写经门面。
  if (chara(cid).chara.处女 === 1 && (era.get(`exp:${cid}:0`) || 0) > 0) {
    await print_wait('【处女丧失】');
    chara(cid).chara.处女 = 0;
  }
  begin(STATE.TURNEND); // :5-74；其后的 RETURN 1 因 BEGIN 立即结束而不可达
}

/** @BEAST_MONSTER_PLAY（:459-475）：魔兽。 */
async function beast_monster_play(cid, y) {
  if ((era.get('talent:0:122') || 0) === 1) {
    await print_wait('你把魔兽拉进怀里，尽情地抚摸着它的毛发。');
    return 0;
  }
  await print_wait('『呼～呼～～』');
  await print_wait(
    `${name_of(cid)}用甜美的声音把魔兽引到怀里，${name_of(cid)}四肢分开，把魔兽膨胀的阴茎引入了私处。`,
  );
  era.print(`私处经验+${y}`);
  era.add(`exp:${cid}:0`, y); // EXP:A:0 = 私处经验
  await print_wait(`兽奸经验+${y}`);
  era.add(`exp:${cid}:56`, y); // EXP:A:56 = 兽奸经验
  era.add(`cflag:${cid}:107`, y); // CFLAG:A:107 = 阴道内射精计数
  return 0;
}

/** @HORSE_MONSTER_PLAY（:510-531）：马。 */
async function horse_monster_play(cid, y) {
  if ((era.get('talent:0:122') || 0) === 1) {
    await print_wait('你充分享受了骑马的乐趣。');
    return 0;
  }
  await print_wait('『吁～吁！』');
  await print_wait(`${name_of(cid)}哄着马的同时，屏息弯腰潜入到马的下腹处，`);
  await print_wait(`马的巨大阴茎，即使对于${name_of(cid)}来说也相当大了。`);
  era.print(`苦痛点数+${y * 10}`);
  era.print(`恐怖点数+${y * 10}`);
  era.print(`私处经验+${y}`);
  era.add(`exp:${cid}:0`, y); // EXP:A:0 = 私处经验
  era.add(`juel:${cid}:9`, y * 10); // JUEL:A:9 = 苦痛点数
  era.add(`juel:${cid}:10`, y * 10); // JUEL:A:10 = 恐怖点数
  era.add(`cflag:${cid}:107`, y); // CFLAG:A:107 = 阴道内射精计数
  await print_wait(`兽奸经验+${y}`);
  era.add(`exp:${cid}:56`, y); // EXP:A:56 = 兽奸经验
  return 0;
}

module.exports = {
  beast_monster_play,
  brain_monster_play,
  fairy_monster_play,
  giant_monster_play,
  girl_monster_play,
  horse_monster_play,
  insect_monster_play,
  ivy_monster_play,
  monster_play_dog,
  monster_play,
  monsterplay_list,
  man_monster_play,
  orc_monster_play,
  slime_monster_play,
  syokusyu_monster_play,
};
