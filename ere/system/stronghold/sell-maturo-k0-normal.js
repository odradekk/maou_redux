/**
 * @file 黑市常态末路（issue #338/#797）。
 *
 * 常态（三项素质都不满足）：按魔族（TALENT:314 == 9）、非魔族与售价分成 6 个末路族。
 * 每个末路族先定买家与末路编号，再交给该末路的函数输出正文；文案与随机
 * 消费顺序逐字沿用拆分前的黑市末路，末路编号由 sell-maturo-k0 的 k0_route 给出。
 *
 * 变量语义：ABL 下标 2/3/15 = 私处/肛门感觉/话术；CFLAG 下标 9 = 等级；
 * TALENT 下标 75-77/85 = 性爱狂/淫乱/尻穴狂/爱慕，110/114/119 = 巨乳/
 * 爆乳/超乳，122 = 男人，200-207 = 八类职业，204 = 肉便器，314 = 种族。
 */

'use strict';

const era = require('#/era-electron');

function she(id) {
  return (era.get(`talent:${id}:122`) || 0) !== 0 ? '他' : '她';
}

/** normal_matu_ge500k：常态 · 魔族 · 五十万以上。 */
async function normal_matu_ge500k(ctx) {
  const { cid, target_name } = ctx;
  let buyer = '';
  let route = 0;
  let ending = '';
  if (era.get(`talent:${cid}:200`) == 1 || era.get(`talent:${cid}:203`) == 1) {
    buyer = '魔王军的高级将校';
    route = 3;
  } else if (
    era.get(`talent:${cid}:205`) == 1 ||
    era.get(`talent:${cid}:207`) == 1
  ) {
    buyer = '魔界地方领主';
    route = 2;
  } else if (
    era.get(`talent:${cid}:202`) == 1 ||
    era.get(`talent:${cid}:206`) == 1
  ) {
    buyer = '堕落神的神殿';
    route = 1;
  } else {
    buyer = '魔界的大商人';
    route = 0;
  }
  await era.printAndWait(`${buyer}买下${target_name}之后………`);
  await era.printAndWait(`………`);
  await era.printAndWait(`……`);
  await era.printAndWait(`…`);

  if (route === 3) ending = await normal_matu_ge500k_high_officer(ctx);
  else if (route === 2) ending = await normal_matu_ge500k_lord(ctx);
  else if (route === 1) ending = await normal_matu_ge500k_temple(ctx);
  else if (route === 0) ending = await normal_matu_ge500k_merchant(ctx);
  return ending;
}

/** normal_matu_ge500k_high_officer：魔王军的高级将校买下；结局 高级将校的性奴 / 高级将校的宠物。 */
async function normal_matu_ge500k_high_officer({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:75`) == 1) {
    await era.printAndWait(
      `被改造成魔族的${target_name}，每晚都被主人温柔地对待着。`,
    );
    await era.printAndWait(
      `${she(cid)}好像在主人身上感受到了在你身上感受不到的东西。`,
    );
    await era.printAndWait(`主人也觉得自己买了个好奴隶，非常满意。`);
    ending = '高级将校的性奴';
  } else {
    await era.printAndWait(`主人把${target_name}当作宠物来饲养。`);
    await era.printAndWait(
      `主人整天在客人来访的时候让${she(cid)}讲述自己如何作为勇者战败，最后沦落为奴隶的故事。每讲一次，都能宾主尽欢。`,
    );
    await era.printAndWait(`主人对此非常满意，认为自己买了个好奴隶。`);
    ending = '高级将校的宠物';
  }
  return ending;
}

/** normal_matu_ge500k_lord：魔界地方领主买下；结局 人形奶牛 / 领主孩子的玩具。 */
async function normal_matu_ge500k_lord({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(`${target_name}作为母乳机被放在屋内。`);
    await era.printAndWait(
      `被灌下了特殊的药物，以前就很有规模的乳房，现在更加膨胀了，总是滴出母乳。`,
    );
    await era.printAndWait(`然后，${target_name}的母乳，总是受到主人的称赞。`);
    ending = '人形奶牛';
  } else {
    await era.printAndWait(`${target_name}被领主送给儿子当新玩具。`);
    await era.printAndWait(
      `那个孩子，有着禁忌的血统的力量，传闻有时候会巨魔化然后捏碎自己的奴隶。`,
    );
    await era.printAndWait(`${she(cid)}的下场，想必不会很好吧。`);
    ending = '领主孩子的玩具';
  }
  return ending;
}

/** normal_matu_ge500k_temple：堕落神的神殿买下；结局 神殿的奴隶 / 堕落神的信徒。 */
async function normal_matu_ge500k_temple({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(
      `${target_name}被放在神殿的角落，身边围满了呱噪的信徒们。`,
    );
    await era.printAndWait(
      `在新奴隶即将作为神殿侍奉而举行的仪式上，一整天都被信徒们持续轮奸着。`,
    );
    await era.printAndWait(
      `这一期的女孩，素质大多都差不多。但其中有着诱人双峰的${target_name}是最受欢迎的。`,
    );
    ending = '神殿的奴隶';
  } else {
    await era.printAndWait(
      `${target_name}因为被发现信奉着其它的神，立刻被带到了地下室。`,
    );
    await era.printAndWait(
      `神官们嘲弄着${she(cid)}的信仰，不停地狠狠侵犯着${she(cid)}，直到蓝色肌肤完全被精液染成白色。`,
    );
    await era.printAndWait(
      `${she(cid)}的理性终于被粉碎，屈服了，发誓自己将皈依堕落神。`,
    );
    ending = '堕落神的信徒';
  }
  return ending;
}

/** normal_matu_ge500k_merchant：魔界的大商人买下；结局 肉便器 / 性奴隶。 */
async function normal_matu_ge500k_merchant({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:204`) == 1) {
    await era.printAndWait(
      `作为肉便器被买回来的${target_name}，被装到一个专用的箱子里。`,
    );
    await era.printAndWait(
      `主人商务出差的时候，就被当做行李搬走，作为主人专用的肉便器随着出差。`,
    );
    await era.printAndWait(
      `「这是大商人的肉箱子！」，搬行李的人指着${target_name}对其它人这么说到。`,
    );
    ending = '肉便器';
  } else {
    await era.printAndWait(
      `${target_name}作为主人的第五个性奴隶在宅邸的地下室生活着。`,
    );
    await era.printAndWait(
      `多亏了你的调教，${she(cid)}早就习惯了地下的生活，很快就习惯了新环境。`,
    );
    await era.printAndWait(
      `每晚被叫去侍奉主人也是轻车熟路，对${she(cid)}来说就是单纯换了个主人而已。`,
    );
    ending = '性奴隶';
  }
  return ending;
}

/** normal_matu_ge100k：常态 · 魔族 · 十万以上。 */
async function normal_matu_ge100k(ctx) {
  const { cid, target_name } = ctx;
  let buyer = '';
  let route = 0;
  let ending = '';
  if (era.get(`talent:${cid}:200`) == 1 || era.get(`talent:${cid}:203`) == 1) {
    buyer = '魔王军的士官';
    route = 3;
  } else if (
    era.get(`talent:${cid}:205`) == 1 ||
    era.get(`talent:${cid}:207`) == 1
  ) {
    buyer = '魔界的妓院';
    route = 2;
  } else if (
    era.get(`talent:${cid}:202`) == 1 ||
    era.get(`talent:${cid}:206`) == 1
  ) {
    buyer = '魔界大农场';
    route = 1;
  } else {
    buyer = '魔界的赌场';
    route = 0;
  }
  await era.printAndWait(`${buyer}买下${target_name}之后………`);
  await era.printAndWait(`………`);
  await era.printAndWait(`……`);
  await era.printAndWait(`…`);

  if (route === 3) ending = await normal_matu_ge100k_officer(ctx);
  else if (route === 2) ending = await normal_matu_ge100k_brothel(ctx);
  else if (route === 1) ending = await normal_matu_ge100k_farm(ctx);
  else if (route === 0) ending = await normal_matu_ge100k_casino(ctx);
  return ending;
}

/** normal_matu_ge100k_officer：魔王军的士官买下；结局 士官的性奴。 */
async function normal_matu_ge100k_officer({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:75`) == 1) {
    await era.printAndWait(`${target_name}作为奖赏，赏给立了战功的士官。`);
    await era.printAndWait(
      `「这么年轻漂亮的魔族姑娘是我的奴隶」，年轻的士官还不是很适应状况，因而像恋人一样地对待${she(cid)}。`,
    );
    await era.printAndWait(
      `${target_name}积极地回应着主人的疼爱，展露出与年轻的脸不相称的性交上的成熟。`,
    );
  } else {
    await era.printAndWait(`${target_name}作为奖赏，赏给立了战功的士官。`);
    await era.printAndWait(`士官对年轻漂亮的魔族姑娘尽情地蹂躏着。`);
    await era.printAndWait(
      `要说为什么的话，刚从战场回来的士官，总是特别粗暴的。`,
    );
  }
  ending = '士官的性奴';
  return ending;
}

/** normal_matu_ge100k_brothel：魔界的妓院买下；结局 橱窗娼妇。 */
async function normal_matu_ge100k_brothel({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(
      `${target_name}被放在橱窗里吸引客人。不知是否是妓院主人的爱好，${she(cid)}的丰满的乳房被画上了下流的图案，乳头也穿了几个乳环。`,
    );
    await era.printAndWait(
      `据说在被弄上淫靡装饰的时候，${target_name}不停地在哭喊。`,
    );
    await era.printAndWait(
      `不过现在似乎已经忘记了那件事，每晚都在客人的拥抱中发出娇媚的呻吟。`,
    );
  } else {
    await era.printAndWait(
      `${target_name}被放在橱窗里吸引客人。不知是否是妓院主人的爱好，${she(cid)}的脸的右侧被画上了下流的图案。`,
    );
    await era.printAndWait(
      `据说在被弄上淫靡装饰的时候，${target_name}不停地在哭喊。`,
    );
    await era.printAndWait(
      `不过现在似乎已经忘记了那件事，总是跨坐在客人的身上发出娇媚的呻吟。`,
    );
  }
  ending = '橱窗娼妇';
  return ending;
}

/** normal_matu_ge100k_farm：魔界大农场买下；结局 大农场里的玩具。 */
async function normal_matu_ge100k_farm({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:77`) == 1) {
    await era.printAndWait(
      `大农场的主人在买其它农奴的时候顺便买下了${target_name}，作为礼物送给自己的儿子们。`,
    );
    await era.printAndWait(
      `邪恶的孩子们，特别喜欢欺负${target_name}敏感的肛门。`,
    );
    await era.printAndWait(
      `此时此刻，${target_name}也正作为肛门玩具，被他们狠狠地侵犯着。`,
    );
  } else {
    await era.printAndWait(
      `大农场的主人在买其它农奴的时候顺便买下了${target_name}，作为礼物送给自己的儿子们。`,
    );
    await era.printAndWait(`邪恶的孩子们，每晚都要狠狠地侵犯${target_name}。`);
    await era.printAndWait(
      `没多长时间，${she(cid)}怀孕了，孩子们对父亲是谁开了一个赌局。`,
    );
  }
  ending = '大农场里的玩具';
  return ending;
}

/** normal_matu_ge100k_casino：魔界的赌场买下；结局 赌场肉便器 / 赌场赠品。 */
async function normal_matu_ge100k_casino({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:204`) == 1) {
    await era.printAndWait(
      `赌场为了安抚那些输了很多的客人，就会把他们带到一个侍奉房间里。`,
    );
    await era.printAndWait(
      `在里面，客人可以彻底地玩弄作为肉便器的${target_name}。`,
    );
    await era.printAndWait(`私处和肛门，被塞了很多赌场特制的筹码，`);
    await era.printAndWait(
      `每天在赌场里输掉的人络绎不绝，看来今后${she(cid)}都要作为肉便器玩具永远这样生活下去了。`,
    );
    ending = '赌场肉便器';
  } else {
    await era.printAndWait(`${target_name}成为了赌场的赠品。`);
    await era.printAndWait(`作为美丽的魔族奴隶的${she(cid)}，被漂亮地包装着，`);
    await era.printAndWait(`等待着什么时候，会有新主人来把自己带走……`);
    ending = '赌场赠品';
  }
  return ending;
}

/** normal_matu_lt100k：常态 · 魔族 · 十万以下。 */
async function normal_matu_lt100k(ctx) {
  const { cid, target_name } = ctx;
  let buyer = '';
  let route = 0;
  let ending = '';
  if (era.get(`talent:${cid}:200`) == 1 || era.get(`talent:${cid}:203`) == 1) {
    buyer = '魔界的矿山主';
    route = 3;
  } else if (
    era.get(`talent:${cid}:205`) == 1 ||
    era.get(`talent:${cid}:207`) == 1
  ) {
    buyer = '魔界的酒吧';
    route = 2;
  } else if (
    era.get(`talent:${cid}:202`) == 1 ||
    era.get(`talent:${cid}:206`) == 1
  ) {
    buyer = '触手小屋';
    route = 1;
  } else {
    buyer = '公厕';
    route = 0;
  }
  await era.printAndWait(`${buyer}买下${target_name}之后………`);
  await era.printAndWait(`………`);
  await era.printAndWait(`……`);
  await era.printAndWait(`…`);

  if (route === 3) ending = await normal_matu_lt100k_mine_owner(ctx);
  else if (route === 2) ending = await normal_matu_lt100k_bar(ctx);
  else if (route === 1) ending = await normal_matu_lt100k_tentacle_hut(ctx);
  else if (route === 0) ending = await normal_matu_lt100k_toilet(ctx);
  return ending;
}

/** normal_matu_lt100k_mine_owner：魔界的矿山主买下；结局 矿山性奴。 */
async function normal_matu_lt100k_mine_owner({ cid, target_name }) {
  let ending = '';
  if (era.get(`abl:${cid}:2`) >= 5) {
    await era.printAndWait(`${target_name}作为开矿奴隶的慰问品被饲养着。`);
    await era.printAndWait(
      `连续被侵犯几次都不屈服。「再这么下去真是一点都不可爱」`,
    );
  } else {
    await era.printAndWait(`${target_name}作为开矿奴隶的慰问品被饲养着。`);
    await era.printAndWait(
      `好几次在被侵犯都嚎啕大哭。矿工们觉得这很有意思，令${she(cid)}相当受欢迎。`,
    );
  }
  ending = '矿山性奴';
  return ending;
}

/** normal_matu_lt100k_bar：魔界的酒吧买下；结局 酒吧的玩具。 */
async function normal_matu_lt100k_bar({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(`周末，这种酒吧都会搞一些特别的活动。`);
    await era.printAndWait(
      `${target_name}作为飞镖的靶子，参加了特别的飞镖比赛。优胜者可以拿到可观的奖金。`,
    );
    await era.printAndWait(
      `在决出优胜者的时候，${she(cid)}那宏伟挺拔的乳房，早已鲜血横流了。`,
    );
  } else {
    await era.printAndWait(`周末，这种酒吧都会搞一些特别的活动。`);
    await era.printAndWait(
      `${target_name}作为飞镖的靶子，参加了特别的飞镖比赛。优胜者可以拿到可观的奖金。`,
    );
    await era.printAndWait(
      `在决出优胜者的时候，${she(cid)}的身体已经千疮百孔，血流满地了。`,
    );
  }
  ending = '酒吧的玩具';
  return ending;
}

/** normal_matu_lt100k_tentacle_hut：触手小屋买下；结局 触手的苗床。 */
async function normal_matu_lt100k_tentacle_hut({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(`${target_name}被安排在量产触手的触手小屋里，`);
    await era.printAndWait(`不知培养了多少触手，也许成百上千了。`);
    await era.printAndWait(
      `特别是膨胀到原来两倍大小的惊人豪乳所培养出来的触手更是价值连城。`,
    );
  } else {
    await era.printAndWait(`${target_name}被安排在量产触手的触手小屋里，`);
    await era.printAndWait(`不知培养了多少触手，也许成百上千了。`);
    await era.printAndWait(
      `完全适应了作为触手的母体，看来这样的生活会持续到${she(cid)}死去的那一天。`,
    );
  }
  ending = '触手的苗床';
  return ending;
}

/** normal_matu_lt100k_toilet：公厕买下；结局 公众肉便器。 */
async function normal_matu_lt100k_toilet({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:204`) == 1) {
    await era.printAndWait(`作为现役肉便器继续侍奉着。`);
    await era.printAndWait(
      `${target_name}在相当长的时间内作为公众肉便器被广大市民所疼爱。`,
    );
    await era.printAndWait(`好像生下了不下一百个的孩子。`);
  } else {
    await era.printAndWait(`${target_name}作为公众肉便器不分昼夜地被使用着。`);
    await era.printAndWait(`过于残酷的生活让${she(cid)}不到半年便精神崩溃了。`);
  }
  ending = '公众肉便器';
  return ending;
}

/** normal_other_ge500k：常态 · 非魔族 · 五十万以上。 */
async function normal_other_ge500k(ctx) {
  const { cid, target_name } = ctx;
  let buyer = '';
  let route = 0;
  let ending = '';
  if (era.get(`talent:${cid}:200`) == 1 || era.get(`talent:${cid}:203`) == 1) {
    buyer = '魔王军的高级将校';
    route = 3;
  } else if (
    era.get(`talent:${cid}:205`) == 1 ||
    era.get(`talent:${cid}:207`) == 1
  ) {
    buyer = '魔界地方领主';
    route = 2;
  } else if (
    era.get(`talent:${cid}:202`) == 1 ||
    era.get(`talent:${cid}:206`) == 1
  ) {
    buyer = '堕落神的神殿';
    route = 1;
  } else {
    buyer = '魔界的大商人';
    route = 0;
  }
  await era.printAndWait(`${buyer}买下${target_name}之后………`);
  await era.printAndWait(`………`);
  await era.printAndWait(`……`);
  await era.printAndWait(`…`);

  if (route === 3) ending = await normal_other_ge500k_high_officer(ctx);
  else if (route === 2) ending = await normal_other_ge500k_lord(ctx);
  else if (route === 1) ending = await normal_other_ge500k_temple(ctx);
  else if (route === 0) ending = await normal_other_ge500k_merchant(ctx);
  return ending;
}

/** normal_other_ge500k_high_officer：魔王军的高级将校买下；结局 高级将校的性奴 / 高级将校的宠物。 */
async function normal_other_ge500k_high_officer({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:75`) == 1) {
    await era.printAndWait(`主人把${she(cid)}当成重要的性奴隶来看待。`);
    await era.printAndWait(
      `然后，${target_name}也尽力地侍奉着主人，在主人身上感受到了在你身上感受不到的温柔。`,
    );
    await era.printAndWait(
      `虽然没有自由，但每晚都被主人充分地疼爱着，似乎过得很幸福。`,
    );
    ending = '高级将校的性奴';
  } else {
    await era.printAndWait(`主人把${target_name}当作宠物来饲养。`);
    await era.printAndWait(
      `主人整天在客人来访的时候让${she(cid)}讲述自己如何作为勇者战败，最后沦落为奴隶的故事。每讲一次，都能宾主尽欢。`,
    );
    await era.printAndWait(
      `然后，客人总会轻蔑地看着${target_name}。主人每次都很享受这种时光。`,
    );
    ending = '高级将校的宠物';
  }
  return ending;
}

/** normal_other_ge500k_lord：魔界地方领主买下；结局 人形奶牛 / 领主孩子的玩具。 */
async function normal_other_ge500k_lord({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(`${target_name}作为母乳机被放在屋内。`);
    await era.printAndWait(
      `被灌下了特殊的药物，以前就很有规模的乳房，现在更加膨胀了，总是滴出母乳。`,
    );
    await era.printAndWait(
      `主人还特意雇佣了一个女仆来照顾${she(cid)}以及加热${she(cid)}的母乳。`,
    );
    ending = '人形奶牛';
  } else {
    await era.printAndWait(`${target_name}被领主送给儿子当新玩具。`);
    await era.printAndWait(
      `那个孩子，有着禁忌的血统的力量，有时候会巨魔化，然后抓起${target_name}当飞机杯使。`,
    );
    await era.printAndWait(
      `用原勇者的体质顽强地坚持着，但${target_name}看来也熬不了多久了。`,
    );
    ending = '领主孩子的玩具';
  }
  return ending;
}

/** normal_other_ge500k_temple：堕落神的神殿买下；结局 堕落神的性奴 / 堕落神的信徒。 */
async function normal_other_ge500k_temple({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(
      `${target_name}作为侍奉神殿的女奴，整天都被信徒们侵犯着。`,
    );
    await era.printAndWait(
      `本来信奉其它神灵的${she(cid)}，现在已经彻底转为信奉堕落神了。`,
    );
    await era.printAndWait(
      `那对诱人的双峰被绳子勒着，更是极大地激发起信徒们的情欲。`,
    );
    ending = '堕落神的性奴';
  } else {
    await era.printAndWait(
      `${target_name}因为被发现信奉着其它的神，立刻被带到了地下室。`,
    );
    await era.printAndWait(
      `神官们嘲弄着${she(cid)}的信仰，不停地狠狠侵犯着${she(cid)}，直到全身肌肤完全被精液染成白色。`,
    );
    await era.printAndWait(
      `${she(cid)}的理性终于被粉碎，屈服了，发誓自己将皈依堕落神。`,
    );
    ending = '堕落神的信徒';
  }
  return ending;
}

/** normal_other_ge500k_merchant：魔界的大商人买下；结局 肉便器 / 大商人的宠物。 */
async function normal_other_ge500k_merchant({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:204`) == 1) {
    await era.printAndWait(
      `最初只是作为肉便器被买回来的${target_name}，被放在主人的房间里。`,
    );
    await era.printAndWait(
      `作为主人专用的便器，在主人使用的时候，总是目不转睛地珍惜着与主人一起相处的时间。`,
    );
    await era.printAndWait(
      `被当成肉便器的${target_name}被调教的这么好，主人也很满意。`,
    );
    ending = '肉便器';
  } else {
    await era.printAndWait(`${target_name}作为主人的宠物生活在屋里。`);
    await era.printAndWait(
      `在主人的脚下撒娇着，${she(cid)}已经忘记了自己曾经身为勇者了吧。`,
    );
    await era.printAndWait(`看来${she(cid)}的一生也就是这样了。`);
    ending = '大商人的宠物';
  }
  return ending;
}

/** normal_other_ge100k：常态 · 非魔族 · 十万以上。 */
async function normal_other_ge100k(ctx) {
  const { cid, target_name } = ctx;
  let buyer = '';
  let route = 0;
  let ending = '';
  if (era.get(`talent:${cid}:200`) == 1 || era.get(`talent:${cid}:203`) == 1) {
    buyer = '魔王军的士官';
    route = 3;
  } else if (
    era.get(`talent:${cid}:205`) == 1 ||
    era.get(`talent:${cid}:207`) == 1
  ) {
    buyer = '魔界的妓院';
    route = 2;
  } else if (
    era.get(`talent:${cid}:202`) == 1 ||
    era.get(`talent:${cid}:206`) == 1
  ) {
    buyer = '魔界大农场';
    route = 1;
  } else {
    buyer = '魔界的赌场';
    route = 0;
  }
  await era.printAndWait(`${buyer}买下${target_name}之后………`);
  await era.printAndWait(`………`);
  await era.printAndWait(`……`);
  await era.printAndWait(`…`);

  if (route === 3) ending = await normal_other_ge100k_officer(ctx);
  else if (route === 2) ending = await normal_other_ge100k_brothel(ctx);
  else if (route === 1) ending = await normal_other_ge100k_farm(ctx);
  else if (route === 0) ending = await normal_other_ge100k_casino(ctx);
  return ending;
}

/** normal_other_ge100k_officer：魔王军的士官买下；结局 士官的性奴。 */
async function normal_other_ge100k_officer({ cid, target_name }) {
  let ending = '';
  if (era.get(`abl:${cid}:2`) >= 5) {
    await era.printAndWait(`年轻的士官用奖金买下了${target_name}。`);
    await era.printAndWait(`作为异族的温驯的美女奴隶，每晚都在疼爱着。`);
    await era.printAndWait(`${target_name}热情地接受着新主人的所有欲望。`);
  } else {
    await era.printAndWait(`年轻的士官用奖金买下了${target_name}。`);
    await era.printAndWait(`作为异族的温驯美女奴隶，每晚都在疼爱着。`);
    await era.printAndWait(`${target_name}用悲鸣回应着新主人的欲望。`);
  }
  ending = '士官的性奴';
  return ending;
}

/** normal_other_ge100k_brothel：魔界的妓院买下；结局 异种专用娼妇。 */
async function normal_other_ge100k_brothel({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(
      `${target_name}成为了专门收集异族美女的妓院里的奴隶。`,
    );
    await era.printAndWait(
      `为了让${she(cid)}逃跑也跑不远，在丰满的乳房上烙下了烙印，因为过度的疼痛而晕倒了。`,
    );
    await era.printAndWait(`托了原勇者这个绰头的福，现在这里完全不愁客人了。`);
  } else {
    await era.printAndWait(
      `${target_name}成为了专门收集异族美女的妓院里的奴隶。`,
    );
    await era.printAndWait(
      `为了让${she(cid)}逃跑也跑不远，在肩膀上烙下了烙印，因为过度的疼痛而晕倒了。`,
    );
    await era.printAndWait(`托了原勇者这个绰头的福，现在这里完全不愁客人了。`);
  }
  ending = '异种专用娼妇';
  return ending;
}

/** normal_other_ge100k_farm：魔界大农场买下；结局 乳牛奴隶 / 家畜奴隶。 */
async function normal_other_ge100k_farm({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(
      `${target_name}因为丰满的乳房而被看中了。作为牛奴隶被栓在厩舍里。`,
    );
    await era.printAndWait(
      `怀上了牛系魔兽的孩子，乳房还被注射了肥大化的药剂，作为乳牛每天被榨乳。`,
    );
    await era.printAndWait(
      `被榨乳的时候，${target_name}的脸上总会露出销魂的表情。`,
    );
    ending = '乳牛奴隶';
  } else {
    await era.printAndWait(
      `为了做出新品种的家畜而让${target_name}和所有的家畜交配。`,
    );
    await era.printAndWait(`实验还在继续，应该能培养出意想不到的新物种吧。`);
    await era.printAndWait(
      `「和魔界猪杂交出来的品种，肉应该会变得更加松软吧。」`,
    );
    ending = '家畜奴隶';
  }
  return ending;
}

/** normal_other_ge100k_casino：魔界的赌场买下；结局 赌场的肉便器 / 赌场的狗。 */
async function normal_other_ge100k_casino({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:204`) == 1) {
    await era.printAndWait(
      `赌场为了安抚那些输了很多的客人，就会把他们带到一个侍奉房间里。`,
    );
    await era.printAndWait(
      `在里面，客人可以彻底地玩弄作为肉便器的${target_name}。`,
    );
    await era.printAndWait(`私处和肛门，被塞了很多赌场特制的筹码，`);
    await era.printAndWait(
      `每天在赌场里输掉的人络绎不绝，看来今后${target_name}都要作为肉便器玩具永远这样生活下去了。`,
    );
    ending = '赌场的肉便器';
  } else {
    await era.printAndWait(`${target_name}成为了赌场里的赛狗。`);
    await era.printAndWait(
      `被彻底调教的${she(cid)}，现在只会四脚爬爬地行走了。`,
    );
    await era.printAndWait(
      `赛跑成绩不错的${target_name}，被拿去和其它赛狗配种，人们希望${she(cid)}能生出更优良的赛狗。`,
    );
    ending = '赌场的狗';
  }
  return ending;
}

/** normal_other_lt100k：常态 · 非魔族 · 十万以下。 */
async function normal_other_lt100k(ctx) {
  const { cid, target_name } = ctx;
  let buyer = '';
  let route = 0;
  let ending = '';
  if (era.get(`talent:${cid}:200`) == 1 || era.get(`talent:${cid}:203`) == 1) {
    buyer = '魔界的矿山主';
    route = 3;
  } else if (
    era.get(`talent:${cid}:205`) == 1 ||
    era.get(`talent:${cid}:207`) == 1
  ) {
    buyer = '魔界的酒吧';
    route = 2;
  } else if (
    era.get(`talent:${cid}:202`) == 1 ||
    era.get(`talent:${cid}:206`) == 1
  ) {
    buyer = '触手小屋';
    route = 1;
  } else {
    buyer = '公厕';
    route = 0;
  }
  await era.printAndWait(`${buyer}买下${target_name}之后………`);
  await era.printAndWait(`………`);
  await era.printAndWait(`……`);
  await era.printAndWait(`…`);

  if (route === 3) ending = await normal_other_lt100k_mine_owner(ctx);
  else if (route === 2) ending = await normal_other_lt100k_bar(ctx);
  else if (route === 1) ending = await normal_other_lt100k_tentacle_hut(ctx);
  else if (route === 0) ending = await normal_other_lt100k_toilet(ctx);
  return ending;
}

/** normal_other_lt100k_mine_owner：魔界的矿山主买下；结局 矿山性奴。 */
async function normal_other_lt100k_mine_owner({ cid, target_name }) {
  let ending = '';
  if (era.get(`abl:${cid}:2`) >= 5) {
    await era.printAndWait(`${target_name}作为开矿奴隶的慰问品被饲养着。`);
    await era.printAndWait(
      `连续被侵犯几次都不屈服。「再这么下去真是一点都不可爱」`,
    );
  } else {
    await era.printAndWait(`${target_name}作为开矿奴隶的慰问品被饲养着。`);
    await era.printAndWait(
      `${target_name}好几次在被侵犯时都会嚎啕大哭，矿工们觉得很有意思。这令${she(cid)}相当受欢迎。`,
    );
  }
  ending = '矿山性奴';
  return ending;
}

/** normal_other_lt100k_bar：魔界的酒吧买下；结局 酒吧的玩具。 */
async function normal_other_lt100k_bar({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(`周末，这种酒吧都会搞一些特别的活动。`);
    await era.printAndWait(
      `${target_name}作为飞镖的靶子，参加了特别的飞镖比赛。优胜者可以拿到可观的奖金。`,
    );
    await era.printAndWait(
      `在决出优胜者的时候，${she(cid)}那宏伟挺拔的乳房，早已鲜血横流了。`,
    );
  } else {
    await era.printAndWait(`周末，这种酒吧都会搞一些特别的活动。`);
    await era.printAndWait(
      `${target_name}作为飞镖的靶子，参加了特别的飞镖比赛。优胜者可以拿到可观的奖金。`,
    );
    await era.printAndWait(
      `在决出优胜者的时候，${she(cid)}的身体已经千疮百孔，血流满地了。`,
    );
  }
  ending = '酒吧的玩具';
  return ending;
}

/** normal_other_lt100k_tentacle_hut：触手小屋买下；结局 触手的苗床。 */
async function normal_other_lt100k_tentacle_hut({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(`${target_name}被安排在量产触手的触手小屋里，`);
    await era.printAndWait(`不知培养了多少触手，也许成百上千了。`);
    await era.printAndWait(
      `特别是膨胀到原来两倍大小的惊人豪乳所培养出来的触手更是价值连城。`,
    );
  } else {
    await era.printAndWait(`${target_name}被安排在量产触手的触手小屋里，`);
    await era.printAndWait(`不知培养了多少触手，也许成百上千了。`);
    await era.printAndWait(
      `${target_name}已经完全适应了作为触手的母体，看来这样的生活会持续到${she(cid)}死去的那一天。`,
    );
  }
  ending = '触手的苗床';
  return ending;
}

/** normal_other_lt100k_toilet：公厕买下；结局 公众肉便器。 */
async function normal_other_lt100k_toilet({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:204`) == 1) {
    await era.printAndWait(`作为现役肉便器继续侍奉着。`);
    await era.printAndWait(
      `${target_name}在相当长的时间内，作为公众肉便器而被广大市民所疼爱。`,
    );
    await era.printAndWait(`好像生下了不下一百个的孩子。`);
  } else {
    await era.printAndWait(
      `${target_name}作为公众肉便器，不分昼夜地被使用着。`,
    );
    await era.printAndWait(`过于残酷的生活让${she(cid)}不到半年便精神崩溃了。`);
  }
  ending = '公众肉便器';
  return ending;
}

/** 末路族表：k0_route 给出的编号 → 该族的买家选择与末路分派函数。 */
const ROUTES = {
  normal_matu_ge500k,
  normal_matu_ge100k,
  normal_matu_lt100k,
  normal_other_ge500k,
  normal_other_ge100k,
  normal_other_lt100k,
};

/** 正文表：末路编号 → 输出该末路正文并返回结局名的函数。 */
const ENDINGS = {
  normal_matu_ge500k_high_officer,
  normal_matu_ge500k_lord,
  normal_matu_ge500k_temple,
  normal_matu_ge500k_merchant,
  normal_matu_ge100k_officer,
  normal_matu_ge100k_brothel,
  normal_matu_ge100k_farm,
  normal_matu_ge100k_casino,
  normal_matu_lt100k_mine_owner,
  normal_matu_lt100k_bar,
  normal_matu_lt100k_tentacle_hut,
  normal_matu_lt100k_toilet,
  normal_other_ge500k_high_officer,
  normal_other_ge500k_lord,
  normal_other_ge500k_temple,
  normal_other_ge500k_merchant,
  normal_other_ge100k_officer,
  normal_other_ge100k_brothel,
  normal_other_ge100k_farm,
  normal_other_ge100k_casino,
  normal_other_lt100k_mine_owner,
  normal_other_lt100k_bar,
  normal_other_lt100k_tentacle_hut,
  normal_other_lt100k_toilet,
};

module.exports = { ROUTES, ENDINGS };
