/**
 * @file 黑市爱慕末路（issue #338/#797）。
 *
 * 爱慕（TALENT:85）：按魔族（TALENT:314 == 9）、非魔族与售价分成 8 个末路族。
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

/** love_matu_ge1m：爱慕 · 魔族 · 百万以上。 */
async function love_matu_ge1m(ctx) {
  const { cid, target_name } = ctx;
  let buyer = '';
  let route = 0;
  let ending = '';
  if (era.get(`talent:${cid}:200`) == 1 || era.get(`talent:${cid}:203`) == 1) {
    buyer = '魔王军将军';
    route = 3;
  } else if (
    era.get(`talent:${cid}:205`) == 1 ||
    era.get(`talent:${cid}:207`) == 1
  ) {
    buyer = '魔界贵族';
    route = 2;
  } else if (
    era.get(`talent:${cid}:202`) == 1 ||
    era.get(`talent:${cid}:206`) == 1
  ) {
    buyer = '堕落神的神官长';
    route = 1;
  } else {
    buyer = '魔界土豪';
    route = 0;
  }
  await era.printAndWait(`${buyer}买下${target_name}之后………`);
  await era.printAndWait(`………`);
  await era.printAndWait(`……`);
  await era.printAndWait(`…`);

  if (route === 3) ending = await love_matu_ge1m_general(ctx);
  else if (route === 2) ending = await love_matu_ge1m_noble(ctx);
  else if (route === 1) ending = await love_matu_ge1m_high_priest(ctx);
  else if (route === 0) ending = await love_matu_ge1m_tycoon(ctx);
  return ending;
}

/** love_matu_ge1m_general：魔王军将军买下；结局 性奴隶。 */
async function love_matu_ge1m_general({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:75`) == 1) {
    await era.printAndWait(
      `${target_name}的蜜壶，不管被怎么粗暴对待都只会产生快感。私处紧紧地按摩着将军的阴茎，让他也快感连连。`,
    );
    await era.printAndWait(
      `迷人的肉体以及作为原勇者的经历，也是将军非常中意的地方。`,
    );
    await era.printAndWait(`原来只是打算买个性奴隶，现在渐渐变得像是爱人了。`);
  } else {
    await era.printAndWait(`将军对${target_name}的肉穴相当粗暴。`);
    await era.printAndWait(`作为性奴隶，每晚都被狠狠侵犯，像是要玩坏一般。`);
    await era.printAndWait(
      `只靠作为原勇者的耐久力，恐怕被玩坏也只是时间问题了吧。`,
    );
  }
  ending = '性奴隶';
  return ending;
}

/** love_matu_ge1m_noble：魔界贵族买下；结局 魔界贵族的情人。 */
async function love_matu_ge1m_noble({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(
      `被主人买下的${target_name}每天晚上都被仔细地玩弄乳房，在床上不断娇喘着。`,
    );
    await era.printAndWait(
      `不过，${she(cid)}在你身边的时候已经充分学会如何应对这种情况了。`,
    );
    await era.printAndWait(
      `作为被主人宠爱的宠物，${target_name}的生活还是过得比较幸福的。`,
    );
  } else {
    await era.printAndWait(`${target_name}在屋里做着女仆和情人的工作。`);
    await era.printAndWait(`每天都过着只要主人高兴就会被叫到房里做爱的生活。`);
    await era.printAndWait(
      `恐怕没几天就会被主人干到怀孕，不过应该也会被勒令堕胎吧。`,
    );
  }
  ending = '魔界贵族的情人';
  return ending;
}

/** love_matu_ge1m_high_priest：堕落神的神官长买下；结局 菊奴女神官 / 性奴女神官。 */
async function love_matu_ge1m_high_priest({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:77`) == 1) {
    await era.printAndWait(
      `${target_name}作为堕落神和神官长的近侍在神殿里工作着。`,
    );
    await era.printAndWait(
      `为了更好地供奉堕落神，神官长对${she(cid)}的肛门进行了深度的调教。`,
    );
    await era.printAndWait(
      `现在，敏感的菊穴已经被扩张，巨魔的阴茎也能轻易插入了。`,
    );
    ending = '菊奴女神官';
  } else {
    await era.printAndWait(
      `${target_name}作为神官长的第五个情妇每晚都被侵犯。`,
    );
    await era.printAndWait(
      `曾经也是神职人员的${target_name}，现在歌颂堕落神。`,
    );
    await era.printAndWait(`因为堕落神赐予的愉悦，而不断娇喘着。`);
    ending = '性奴女神官';
  }
  return ending;
}

/** love_matu_ge1m_tycoon：魔界土豪买下；结局 生意助手 / 土豪的情人。 */
async function love_matu_ge1m_tycoon({ cid, target_name }) {
  let ending = '';
  if (era.get(`abl:${cid}:15`) >= 5) {
    await era.printAndWait(
      `${target_name}在枕边经常妙语连珠，让土豪决定把${she(cid)}当成秘书。`,
    );
    await era.printAndWait(`机智的交涉及性感的身体，为主人带来了不少好处。`);
    await era.printAndWait(`每晚，从客厅里都不断传出被主人和客人疼爱的呻吟。`);
    ending = '生意助手';
  } else {
    await era.printAndWait(
      `${target_name}作为土豪的第八个情妇被买下了，总是如影随形地跟着。`,
    );
    await era.printAndWait(
      `过于温柔的性格不为魔族所喜，不过土豪的众多孩子却相当喜欢。`,
    );
    await era.printAndWait(
      `被土豪已经成年的儿子求爱了，在房间里每晚都被疼爱着。`,
    );
    ending = '土豪的情人';
  }
  return ending;
}

/** love_matu_ge500k：爱慕 · 魔族 · 五十万以上。 */
async function love_matu_ge500k(ctx) {
  const { cid, target_name } = ctx;
  let buyer = '';
  let route = 0;
  let ending = '';
  if (era.get(`talent:${cid}:200`) == 1 || era.get(`talent:${cid}:203`) == 1) {
    buyer = '黑帮首领';
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
  await era.printAndWait(`${buyer}买下${target_name}之后`);
  await era.printAndWait(`………`);
  await era.printAndWait(`……`);
  await era.printAndWait(`…`);

  if (route === 3) ending = await love_matu_ge500k_gang_boss(ctx);
  else if (route === 2) ending = await love_matu_ge500k_lord(ctx);
  else if (route === 1) ending = await love_matu_ge500k_temple(ctx);
  else if (route === 0) ending = await love_matu_ge500k_merchant(ctx);
  return ending;
}

/** love_matu_ge500k_gang_boss：黑帮首领买下；结局 黑老大的情人。 */
async function love_matu_ge500k_gang_boss({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:203`) == 1) {
    await era.printAndWait(
      `在魔界也是首屈一指的繁荣城市里，${target_name}成为了黑社会的一员。`,
    );
    await era.printAndWait(
      `因为原来的盗贼经历，马上融入到了黑社会的生活之中了。`,
    );
    await era.printAndWait(`作为首领的爱人，也习惯了被每天疼爱着。`);
    ending = '黑老大的情人';
  } else {
    await era.printAndWait(
      `在魔界也是首屈一指的繁荣城市里，${target_name}成为了黑社会的一员。`,
    );
    await era.printAndWait(`原来作为战士的本领得以发挥，过着保镖一样的生活。`);
    await era.printAndWait(`作为首领的爱人，也习惯了被每天疼爱着。`);
    ending = '黑老大的情人';
  }
  return ending;
}

/** love_matu_ge500k_lord：魔界地方领主买下；结局 领主的女仆 / 领主的玩物。 */
async function love_matu_ge500k_lord({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(`${target_name}在女仆长的指示下在屋子里帮忙收拾。`);
    await era.printAndWait(
      `因为低胸的女仆装，总是被男人们用下流的眼光看着，有时还被揩油。`,
    );
    await era.printAndWait(
      `到了晚上，就彻底地被领主所占有了，过着这样的生活。`,
    );
    ending = '领主的女仆';
  } else {
    await era.printAndWait(
      `${target_name}因为年轻，被作为年幼的领主的玩具一样被放置在他的身边。`,
    );
    await era.printAndWait(`每天过着像布娃娃一样的生活。`);
    await era.printAndWait(`在主人玩够之前，这种生活还要不停地持续着。`);
    ending = '领主的玩物';
  }
  return ending;
}

/** love_matu_ge500k_temple：堕落神的神殿买下；结局 邪神殿的菊奴 / 邪神殿的性奴。 */
async function love_matu_ge500k_temple({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:77`) == 1) {
    await era.printAndWait(
      `神殿新设置了堕落神的贡品，${target_name}作为奴隶要为神殿献出身心。`,
    );
    await era.printAndWait(
      `被络绎不绝的信徒们侵犯肛门多次，${target_name}淫媚的呻吟越来越大声了。`,
    );
    await era.printAndWait(`好像这样子就能让堕落神高兴似得，不断奉献着。`);
    ending = '邪神殿的菊奴';
  } else {
    await era.printAndWait(
      `神殿新设置了堕落神的贡品，所有信徒都可以无偿侵犯。`,
    );
    await era.printAndWait(
      `然后，被信徒侵犯所生下的孩子，也在神殿中被抚养着。`,
    );
    await era.printAndWait(
      `原来信仰其它神的${target_name}，现在全心全意地信奉着堕落神了。`,
    );
    ending = '邪神殿的性奴';
  }
  return ending;
}

/** love_matu_ge500k_merchant：魔界的大商人买下；结局 肉便器 / 商人的情人。 */
async function love_matu_ge500k_merchant({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:204`) == 1) {
    await era.printAndWait(`${target_name}作为员工们的肉便器被放置在公司。`);
    await era.printAndWait(`十几年间，生下了许多不知父亲是谁的孩子。`);
    await era.printAndWait(
      `生下的孩子也马上作为肉便器被卖掉了，那些钱拿来做了${target_name}的生活费。`,
    );
    ending = '肉便器';
  } else {
    await era.printAndWait(
      `作为情妇被买下的${target_name}老老实实地侍奉着自己的主人。`,
    );
    await era.printAndWait(
      `每晚都和商人的正室一起侍奉着商人，应该说是作为商人夫妇的共同宠物被宠爱着。`,
    );
    await era.printAndWait(`据说在怀孕之后，孩子也作为宠物被抚养了。`);
    ending = '商人的情人';
  }
  return ending;
}

/** love_matu_ge100k：爱慕 · 魔族 · 十万以上。 */
async function love_matu_ge100k(ctx) {
  const { cid, target_name } = ctx;
  let buyer = '';
  let route = 0;
  let ending = '';
  if (era.get(`talent:${cid}:200`) == 1 || era.get(`talent:${cid}:203`) == 1) {
    buyer = '魔王军的士官';
    route = 3;
  } else if (
    era.get(`talent:${cid}:205`) == 1 ||
    era.get(`talent:${cid}:201`) == 1
  ) {
    buyer = '魔界学院';
    route = 2;
  } else if (
    era.get(`talent:${cid}:202`) == 1 ||
    era.get(`talent:${cid}:206`) == 1
  ) {
    buyer = '魔界大农场';
    route = 1;
  } else {
    buyer = '魔界商人';
    route = 0;
  }
  await era.printAndWait(`${buyer}买下${target_name}之后………`);
  await era.printAndWait(`………`);
  await era.printAndWait(`……`);
  await era.printAndWait(`…`);

  if (route === 3) ending = await love_matu_ge100k_officer(ctx);
  else if (route === 2) ending = await love_matu_ge100k_academy(ctx);
  else if (route === 1) ending = await love_matu_ge100k_farm(ctx);
  else if (route === 0) ending = await love_matu_ge100k_dealer(ctx);
  return ending;
}

/** love_matu_ge100k_officer：魔王军的士官买下；结局 士官的性奴。 */
async function love_matu_ge100k_officer({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:75`) == 1) {
    await era.printAndWait(`士官在战场上立功了，用奖金买下了${target_name}。`);
    await era.printAndWait(
      `被年轻士官推倒的时候，${target_name}终于有被卖了的自觉。`,
    );
    await era.printAndWait(`士官沉迷于${target_name}舒服的私处感触里了。`);
  } else {
    await era.printAndWait(`士官在战场上立功了，用奖金买下了${target_name}。`);
    await era.printAndWait(
      `被年轻士官推倒的时候，${target_name}终于有被卖了的自觉。`,
    );
    await era.printAndWait(
      `在因被侵犯而泪流满面的奴隶身上，年轻的士官终于成为了大人了。`,
    );
  }
  ending = '士官的性奴';
  return ending;
}

/** love_matu_ge100k_academy：魔界学院买下；结局 人形奶牛 / 异种交配实验体。 */
async function love_matu_ge100k_academy({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(
      `${target_name}那双有魅力的乳房，被注射了学院还在开发中的药剂。`,
    );
    await era.printAndWait(
      `乳房变为以前的两倍大，还不停地分泌着母乳，作为食堂的人形取奶器而受到欢迎。`,
    );
    await era.printAndWait(
      `巨大的胸部让学生们爱不释手，${target_name}每天都因此被玩得死去活来。`,
    );
    ending = '人形奶牛';
  } else {
    await era.printAndWait(
      `作为学生的性处理便器而购买的${target_name}，作用还不止于此，`,
    );
    await era.printAndWait(`经常作为交配用的实验动物，被实验室所征用。`);
    await era.printAndWait(
      `如果能产生什么新物种的话，整个实验小组会被你传召嘉奖也说不定。`,
    );
    ending = '异种交配实验体';
  }
  return ending;
}

/** love_matu_ge100k_farm：魔界大农场买下；结局 大农场主的性奴隶。 */
async function love_matu_ge100k_farm({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:77`) == 1) {
    await era.printAndWait(`大农场主在买农奴的时候顺便买下了${target_name}。`);
    await era.printAndWait(
      `最初品尝过${she(cid)}的肛门之后，被预想以外的快感所震惊，因而每晚都要侵犯${she(cid)}。`,
    );
    await era.printAndWait(
      `被巨大阴茎连续侵犯的结果，就是${she(cid)}现在只能摊在床上，还略带有脱肛。`,
    );
  } else {
    await era.printAndWait(`大农场主在买农奴的时候顺便买下了${target_name}。`);
    await era.printAndWait(
      `也说不出到底喜欢${she(cid)}哪里，但是依然像对妻子一样温柔地对待${she(cid)}。`,
    );
    await era.printAndWait(
      `接受了主人精液的${target_name}怀孕了，临盘也快了。`,
    );
  }
  ending = '大农场主的性奴隶';
  return ending;
}

/** love_matu_ge100k_dealer：魔界商人买下；结局 肉便器 / 魔改肉块。 */
async function love_matu_ge100k_dealer({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:204`) == 1) {
    await era.printAndWait(`作为店里的肉便器被放在厕所里。`);
    await era.printAndWait(
      `无论客人还是店员都可以使用的肉便器，${target_name}的身上还标明了哪些时段是客人专用。`,
    );
    await era.printAndWait(
      `终于怀孕了的时候还被挂上了【肉便器出产秀】的牌子，看来到极限为止都会被锁在厕所里。`,
    );
    ending = '肉便器';
  } else {
    await era.printAndWait(`${target_name}作为素材被妖术师买下了。`);
    await era.printAndWait(
      `按照顾客的需求进行了改造，给${target_name}赋予了一些附加价值。`,
    );
    await era.printAndWait(`好像又转卖给其它人了。`);
    ending = '魔改肉块';
  }
  return ending;
}

/** love_matu_lt100k：爱慕 · 魔族 · 十万以下。 */
async function love_matu_lt100k(ctx) {
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
    buyer = '魔界的农场';
    route = 1;
  } else {
    buyer = '街角的公厕';
    route = 0;
  }
  await era.printAndWait(`${buyer}买下${target_name}之后………`);
  await era.printAndWait(`………`);
  await era.printAndWait(`……`);
  await era.printAndWait(`…`);

  if (route === 3) ending = await love_matu_lt100k_mine_owner(ctx);
  else if (route === 2) ending = await love_matu_lt100k_bar(ctx);
  else if (route === 1) ending = await love_matu_lt100k_farm(ctx);
  else if (route === 0) ending = await love_matu_lt100k_toilet(ctx);
  return ending;
}

/** love_matu_lt100k_mine_owner：魔界的矿山主买下；结局 矿山性奴。 */
async function love_matu_lt100k_mine_owner({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:75`) == 1) {
    await era.printAndWait(`${target_name}作为开矿奴隶的慰问品被饲养着。`);
    await era.printAndWait(
      `连续被侵犯几次都不屈服。「再这么下去真是一点都不可爱」`,
    );
  } else {
    await era.printAndWait(`${target_name}作为开矿奴隶的慰问品被饲养着。`);
    await era.printAndWait(`好几次都因被侵犯而嚎啕大哭。`);
  }
  ending = '矿山性奴';
  return ending;
}

/** love_matu_lt100k_bar：魔界的酒吧买下；结局 酒馆女侍应。 */
async function love_matu_lt100k_bar({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(
      `对${target_name}宏伟的胸部来说，女服务员的制服胸口处实在是太小了。`,
    );
    await era.printAndWait(
      `「适合你的制服呢～」店长这么说着，最后的结果是要${she(cid)}一直赤裸上身迎客。`,
    );
    await era.printAndWait(
      `每晚都收到很多小费，再这么下去，看来帮自己赎身也只是时间问题而已。`,
    );
    ending = '酒馆女侍应';
  } else {
    await era.printAndWait(
      `在店主和客人之间周旋，${target_name}像个娼妇一样地活着。`,
    );
    await era.printAndWait(`原勇者，现在也彻底堕落了。`);
    ending = '酒馆女侍应';
  }
  return ending;
}

/** love_matu_lt100k_farm：魔界的农场买下；结局 农场主的性奴 / 农奴的共妻。 */
async function love_matu_lt100k_farm({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:77`) == 1) {
    await era.printAndWait(`${target_name}和其它几个奴隶作为农奴被买下了。`);
    await era.printAndWait(
      `不过，农场主在试过${she(cid)}舒服的肛门之后上瘾了。`,
    );
    await era.printAndWait(`现在作为专用性奴隶而存在着。`);
    ending = '农场主的性奴';
  } else {
    await era.printAndWait(`${target_name}和其它几个奴隶作为农奴被买下了。`);
    await era.printAndWait(
      `为了不让其它农奴逃跑，强制让${she(cid)}做了农奴们的共同妻子，每晚都被好几个男人侵犯着。`,
    );
    ending = '农奴的共妻';
  }
  return ending;
}

/** love_matu_lt100k_toilet：街角的公厕买下；结局 肉便器。 */
async function love_matu_lt100k_toilet({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:204`) == 1) {
    await era.printAndWait(`作为现役肉便器继续侍奉着。`);
    await era.printAndWait(
      `${target_name}在相当长的时间内作为公众肉便器被广大市民所疼爱。`,
    );
    await era.printAndWait(`在被精液淹死之前，好像生下了不下一百个的孩子。`);
  } else {
    await era.printAndWait(`${target_name}作为公众肉便器不分昼夜地被使用着。`);
    await era.printAndWait(`过于残酷的生活让${she(cid)}精神崩溃了。`);
    await era.printAndWait(`到最后，从灵魂到身体，都彻底坏掉了。`);
  }
  ending = '肉便器';
  return ending;
}

/** love_other_ge1m：爱慕 · 非魔族 · 百万以上。 */
async function love_other_ge1m(ctx) {
  const { cid, target_name } = ctx;
  let buyer = '';
  let route = 0;
  let ending = '';
  if (era.get(`talent:${cid}:200`) == 1 || era.get(`talent:${cid}:203`) == 1) {
    buyer = '魔王军的将军';
    route = 3;
  } else if (
    era.get(`talent:${cid}:205`) == 1 ||
    era.get(`talent:${cid}:207`) == 1
  ) {
    buyer = '魔界贵族';
    route = 2;
  } else if (
    era.get(`talent:${cid}:202`) == 1 ||
    era.get(`talent:${cid}:206`) == 1
  ) {
    buyer = '堕落神的神官长';
    route = 1;
  } else {
    buyer = '魔界土豪';
    route = 0;
  }
  await era.printAndWait(`${buyer}买下${target_name}之后………`);
  await era.printAndWait(`………`);
  await era.printAndWait(`……`);
  await era.printAndWait(`…`);

  if (route === 3) ending = await love_other_ge1m_general(ctx);
  else if (route === 2) ending = await love_other_ge1m_noble(ctx);
  else if (route === 1) ending = await love_other_ge1m_high_priest(ctx);
  else if (route === 0) ending = await love_other_ge1m_tycoon(ctx);
  return ending;
}

/** love_other_ge1m_general：魔王军的将军买下；结局 魔界将军的性奴。 */
async function love_other_ge1m_general({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:75`) == 1) {
    await era.printAndWait(
      `${target_name}的蜜壶，不管被怎么粗暴对待都只会产生快感。私处紧紧地按摩着将军的阴茎，让他也快感连连。`,
    );
    await era.printAndWait(
      `迷人的肉体以及作为原勇者的经历，也是将军非常中意的地方。`,
    );
    await era.printAndWait(
      `将军疼爱得就差亲手喂饭给${she(cid)}吃了，对于异族性奴隶来说，是难得得好待遇。`,
    );
  } else {
    await era.printAndWait(`将军对${target_name}的肉穴相当粗暴。`);
    await era.printAndWait(`作为性奴隶，每晚都被狠狠侵犯，像是要玩坏一般。`);
    await era.printAndWait(
      `如果真被玩坏了的话，将军的屋里可能又要多一具标本了吧。`,
    );
  }
  ending = '魔界将军的性奴';
  return ending;
}

/** love_other_ge1m_noble：魔界贵族买下；结局 人体家具 / 贵族的宠物。 */
async function love_other_ge1m_noble({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(`${target_name}因为傲人的双峰被看上了。`);
    await era.printAndWait(
      `用皮质的拘束衣托起丰满的乳房，上面用乳环及针刺的伤痕漂亮地点缀着。`,
    );
    await era.printAndWait(`成为了主人放置宝石的上等人体家具。`);
    ending = '人体家具';
  } else {
    await era.printAndWait(
      `作为主人专用宠物的${target_name}，在主人有意不弄伤的情况下用拘束具锁着。`,
    );
    await era.printAndWait(`经常四肢着地，像狗一样地爬行着。`);
    await era.printAndWait(
      `完全萌生了作为宠物的自觉，只要主人命令，便马上作为牝犬和其它宠物交配。`,
    );
    ending = '贵族的宠物';
  }
  return ending;
}

/** love_other_ge1m_high_priest：堕落神的神官长买下；结局 菊奴女神官 / 性奴女神官。 */
async function love_other_ge1m_high_priest({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:77`) == 1) {
    await era.printAndWait(
      `让信仰其它神的人改信堕落神，也是神官长的一项重要工作。`,
    );
    await era.printAndWait(
      `${target_name}被神官长粗硬的阴茎侵犯着肛门，听他说了一天的教。`,
    );
    await era.printAndWait(
      `曾经被你攻陷的${target_name}，看来改信堕落神也只是时间问题了吧。`,
    );
    ending = '菊奴女神官';
  } else {
    await era.printAndWait(
      `成为神官长奴隶的${target_name}，每晚都参加妖邪的仪式。`,
    );
    await era.printAndWait(`对于信奉正神的人来说，是肮脏不堪的仪式。`);
    await era.printAndWait(
      `但曾经被你攻陷的${target_name}，现在则认为这是相当有魅力的仪式，积极地参加着。`,
    );
    ending = '性奴女神官';
  }
  return ending;
}

/** love_other_ge1m_tycoon：魔界土豪买下；结局 宴客性奴 / 土豪的宠物。 */
async function love_other_ge1m_tycoon({ cid, target_name }) {
  let ending = '';
  if (era.get(`abl:${cid}:15`) >= 5) {
    await era.printAndWait(
      `${target_name}本来只是作为性奴隶被买回来，土豪却意外地发现${she(cid)}相当能说会道。`,
    );
    await era.printAndWait(
      `为了让商谈取得优势，经常把${she(cid)}当做夜晚的宴客工具，`,
    );
    await era.printAndWait(
      `${target_name}在主人的指示下与其它男人发生关系，多次怀孕并分娩了。`,
    );
    ending = '宴客性奴';
  } else {
    await era.printAndWait(`作为土豪宠物的${target_name}，对主人相当顺从。`);
    await era.printAndWait(
      `土豪的众多孩子们也很喜欢可爱的${she(cid)}，作为宠物被多次弄怀孕并分娩了。`,
    );
    await era.printAndWait(`${she(cid)}已经得到了作为宠物的最高幸福了吧。`);
    ending = '土豪的宠物';
  }
  return ending;
}

/** love_other_ge500k：爱慕 · 非魔族 · 五十万以上。 */
async function love_other_ge500k(ctx) {
  const { cid, target_name } = ctx;
  let buyer = '';
  let route = 0;
  let ending = '';
  if (era.get(`talent:${cid}:200`) == 1 || era.get(`talent:${cid}:203`) == 1) {
    buyer = '黑帮首领';
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

  if (route === 3) ending = await love_other_ge500k_gang_boss(ctx);
  else if (route === 2) ending = await love_other_ge500k_lord(ctx);
  else if (route === 1) ending = await love_other_ge500k_temple(ctx);
  else if (route === 0) ending = await love_other_ge500k_merchant(ctx);
  return ending;
}

/** love_other_ge500k_gang_boss：黑帮首领买下；结局 驯化的宠物。 */
async function love_other_ge500k_gang_boss({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:203`) == 1) {
    await era.printAndWait(`${target_name}作为顺从的宠物与主人一起努力着。`);
    await era.printAndWait(
      `以前也试过多次逃走，但是发现奴隶项圈和奴隶手铐根本无法靠自己取下来之后变得老实了。`,
    );
    await era.printAndWait(
      `主人对这样的${target_name}非常疼爱，给予了${she(cid)}比较宽松的自由。`,
    );
  } else {
    await era.printAndWait(`${target_name}作为顺从的宠物与主人一起努力着。`);
    await era.printAndWait(
      `因为身体已经堕落了，${target_name}完全记不起自己曾经身为勇者。`,
    );
    await era.printAndWait(`被主人践踏也会产生快感。`);
  }
  ending = '驯化的宠物';
  return ending;
}

/** love_other_ge500k_lord：魔界地方领主买下；结局 人形奶牛 / 宴客肉被子。 */
async function love_other_ge500k_lord({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(`负责提供母乳的${target_name}，`);
    await era.printAndWait(`和挤奶工一起住小屋里。`);
    await era.printAndWait(
      `茶会的时候，则自己用手把母乳挤出来，为主人提供鲜榨乳汁。`,
    );
    ending = '人形奶牛';
  } else {
    await era.printAndWait(`${target_name}成为了供客人使用的肉被子，`);
    await era.printAndWait(`接待了不同种族的不少客人，甚至取得了广泛的好评。`);
    await era.printAndWait(
      `生下了几个孩子。在宅邸里被男仆和女仆们共同抚养着。`,
    );
    ending = '宴客肉被子';
  }
  return ending;
}

/** love_other_ge500k_temple：堕落神的神殿买下；结局 神殿的菊奴 / 神殿的性奴。 */
async function love_other_ge500k_temple({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:77`) == 1) {
    await era.printAndWait(
      `神殿新设置了堕落神的贡品，${target_name}作为奴隶要因此为神殿献出身心。`,
    );
    await era.printAndWait(
      `因为被异族和异教徒侵犯也算是一种功德，${target_name}在信徒中得到了很高的人气。`,
    );
    await era.printAndWait(
      `所有的阴茎都被那淫乱的肛门接受了，好像这样子就能让堕落神高兴似的，不断奉献着。`,
    );
    ending = '神殿的菊奴';
  } else {
    await era.printAndWait(
      `神殿新设置了堕落神的贡品，${target_name}作为贡品，被堕落信徒没完没了地侵犯着。`,
    );
    await era.printAndWait(
      `侵犯异族和异教徒的女人也算是一种功德，信徒们每天都为侵犯${she(cid)}而排起了长队。`,
    );
    await era.printAndWait(
      `以前信仰其它神的${target_name}早晚也会从心底变成堕落神的信徒了吧。`,
    );
    ending = '神殿的性奴';
  }
  return ending;
}

/** love_other_ge500k_merchant：魔界的大商人买下；结局 肉便器 / 大商人的宠物。 */
async function love_other_ge500k_merchant({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:204`) == 1) {
    await era.printAndWait(`${target_name}作为员工们的肉便器被放置在公司。`);
    await era.printAndWait(`十几年间，生下了许多不知父亲是谁的孩子。`);
    await era.printAndWait(
      `生下的孩子也马上作为肉便器被卖掉了，那些钱拿来做了${target_name}的生活费。`,
    );
    ending = '肉便器';
  } else {
    await era.printAndWait(
      `作为宠物被买下的${target_name}老实的顺从着自己的主人。`,
    );
    await era.printAndWait(
      `原勇者的自尊心已经彻底粉碎了，完全作为宠物被教育，甚至受到了好评。`,
    );
    await era.printAndWait(
      `「如果再懂得一些技艺，就能参加宠物品评会了吧！」主人这么说道。`,
    );
    ending = '大商人的宠物';
  }
  return ending;
}

/** love_other_ge100k：爱慕 · 非魔族 · 十万以上。 */
async function love_other_ge100k(ctx) {
  const { cid, target_name } = ctx;
  let buyer = '';
  let route = 0;
  let ending = '';
  if (era.get(`talent:${cid}:200`) == 1 || era.get(`talent:${cid}:203`) == 1) {
    buyer = '魔王军的士官';
    route = 3;
  } else if (
    era.get(`talent:${cid}:205`) == 1 ||
    era.get(`talent:${cid}:201`) == 1
  ) {
    buyer = '魔界学院';
    route = 2;
  } else if (
    era.get(`talent:${cid}:202`) == 1 ||
    era.get(`talent:${cid}:206`) == 1
  ) {
    buyer = '魔界大农场';
    route = 1;
  } else {
    buyer = '魔界商人';
    route = 0;
  }
  await era.printAndWait(`${buyer}买下${target_name}之后………`);
  await era.printAndWait(`………`);
  await era.printAndWait(`……`);
  await era.printAndWait(`…`);

  if (route === 3) ending = await love_other_ge100k_officer(ctx);
  else if (route === 2) ending = await love_other_ge100k_academy(ctx);
  else if (route === 1) ending = await love_other_ge100k_farm(ctx);
  else if (route === 0) ending = await love_other_ge100k_dealer(ctx);
  return ending;
}

/** love_other_ge100k_officer：魔王军的士官买下；结局 士官的性奴。 */
async function love_other_ge100k_officer({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:75`) == 1) {
    await era.printAndWait(`士官将第一次军功的奖金，交给了${target_name}，`);
    await era.printAndWait(
      `对年轻的士官来说，与其说是性奴隶，不如说是可爱的恋人更为贴切。`,
    );
    await era.printAndWait(
      `看着每晚都服侍自己阴茎的${she(cid)}，士官对${target_name}越来越爱怜了。`,
    );
  } else {
    await era.printAndWait(`士官将第一次军功的奖金，交给了${target_name}，`);
    await era.printAndWait(
      `对年轻的士官来说，与其说是性奴隶，不如说是可爱的恋人更为贴切。`,
    );
    await era.printAndWait(
      `并未完全屈服的${target_name}，每天都半推半就地被士官品尝着身体。`,
    );
  }
  ending = '士官的性奴';
  return ending;
}

/** love_other_ge100k_academy：魔界学院买下；结局 淫虫的苗床 / 学生的玩具。 */
async function love_other_ge100k_academy({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(
      `${target_name}那双有魅力的乳房，被注射了学院还在开发中的药剂。`,
    );
    await era.printAndWait(
      `作为乳房淫虫的培养基，乳房中蠢蠢欲动的淫虫分泌着奇妙的体液，给予${she(cid)}持续的甜美快感。`,
    );
    await era.printAndWait(
      `如果这个实验成功的话，市面上应该就会多出一种新的媚药了吧。`,
    );
    ending = '淫虫的苗床';
  } else {
    await era.printAndWait(
      `作为学生的性处理便器而购买的${target_name}每天都被学生们侵犯。`,
    );
    await era.printAndWait(`哪怕在上课途中，被学生侵犯也是常态。`);
    await era.printAndWait(
      `这种时候，老师就会以「妨碍学生上课」为由鞭打${target_name}。`,
    );
    await era.printAndWait(
      `听着被鞭打的${target_name}的惨叫响彻教室，学生们的欲望更加高涨了。`,
    );
    ending = '学生的玩具';
  }
  return ending;
}

/** love_other_ge100k_farm：魔界大农场买下；结局 农场主的菊奴 / 农场主的性奴。 */
async function love_other_ge100k_farm({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:77`) == 1) {
    await era.printAndWait(`大农场主在买农奴的时候顺便买下了${target_name}。`);
    await era.printAndWait(`过着谁都可以将其玩弄的奴隶生活。`);
    await era.printAndWait(
      `被巨大阴茎连续侵犯的结果，就是${she(cid)}现在只能摊在床上，还略带有脱肛。`,
    );
    ending = '农场主的菊奴';
  } else {
    await era.printAndWait(`大农场主在买农奴的时候顺便买下了${target_name}。`);
    await era.printAndWait(
      `作为给大农场主儿子们的礼物，${target_name}被彻底地玩弄着，怀孕了。`,
    );
    await era.printAndWait(`据说现在作为所有人的生育奴隶被疼爱着。`);
    ending = '农场主的性奴';
  }
  return ending;
}

/** love_other_ge100k_dealer：魔界商人买下；结局 肉便器。 */
async function love_other_ge100k_dealer({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:204`) == 1) {
    await era.printAndWait(
      `之前的肉便器崩溃了，作为新的肉便器被放置在厕所里。`,
    );
    await era.printAndWait(`无论是客人还是员工都可以使用。`);
    await era.printAndWait(
      `终于到了出产秀的时候，会生出什么样的孩子还被设立了赌局。`,
    );
  } else {
    await era.printAndWait(`${target_name}作为素材被妖术师买下了。`);
    await era.printAndWait(`妖术师为如何使用原勇者这种素材而烦恼着。`);
    await era.printAndWait(
      `「反正听听客人怎么说，按顾客的喜欢来改造总不会错吧。」`,
    );
  }
  ending = '肉便器';
  return ending;
}

/** love_other_lt100k：爱慕 · 非魔族 · 十万以下。 */
async function love_other_lt100k(ctx) {
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
    buyer = '魔界的农场';
    route = 1;
  } else {
    buyer = '街角的公厕';
    route = 0;
  }
  await era.printAndWait(`${buyer}买下${target_name}之后………`);
  await era.printAndWait(`………`);
  await era.printAndWait(`……`);
  await era.printAndWait(`…`);

  if (route === 3) ending = await love_other_lt100k_mine_owner(ctx);
  else if (route === 2) ending = await love_other_lt100k_bar(ctx);
  else if (route === 1) ending = await love_other_lt100k_farm(ctx);
  else if (route === 0) ending = await love_other_lt100k_toilet(ctx);
  // 这一档的结局一律是下面这个：原文的赋值在所有末路之后，覆盖各末路的返回值。
  ending = '肉便器';
  return ending;
}

/** love_other_lt100k_mine_owner：魔界的矿山主买下；结局 矿山性奴。 */
async function love_other_lt100k_mine_owner({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:75`) == 1) {
    await era.printAndWait(`${target_name}作为开矿奴隶的慰问品被饲养着。`);
    await era.printAndWait(
      `连续被侵犯几次都未屈服。于是侵犯变得越来越粗暴了。`,
    );
  } else {
    await era.printAndWait(`${target_name}作为开矿奴隶的慰问品被饲养着。`);
    await era.printAndWait(
      `好几次被侵犯时都嚎啕大哭，矿工们觉得很有意思，令${she(cid)}相当受欢迎。`,
    );
  }
  ending = '矿山性奴';
  return ending;
}

/** love_other_lt100k_bar：魔界的酒吧买下；结局 酒馆女侍应。 */
async function love_other_lt100k_bar({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(
      `看中了${target_name}傲人胸部的魅力，于是让${she(cid)}赤裸上身接待客人。`,
    );
    await era.printAndWait(
      `客人们毫不客气地把玩${she(cid)}的乳房，作为奴隶的${she(cid)}只能忍耐。`,
    );
    await era.printAndWait(
      `为了帮自己赎身，每晚都很在意客人的小费，有时会故意挺胸让客人们玩。`,
    );
  } else {
    await era.printAndWait(
      `店主对客人介绍${she(cid)}的时候，会特意提醒${she(cid)}可以出台。`,
    );
    await era.printAndWait(
      `作为异族女孩${target_name}还是相当有人气的，不过皮肉钱绝大部分都被主人拿走，没留下多少给${she(cid)}。`,
    );
  }
  ending = '酒馆女侍应';
  return ending;
}

/** love_other_lt100k_farm：魔界的农场买下；结局 乳牛奴隶 / 异种交配家畜。 */
async function love_other_lt100k_farm({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(
      `看中了${target_name}丰满的乳房，被作为牛奴隶栓到厩舍里。`,
    );
    await era.printAndWait(
      `怀上了牛系魔兽的孩子，乳房还被注射了肥大化的药剂，作为乳牛每天被榨乳。`,
    );
    ending = '乳牛奴隶';
  } else {
    await era.printAndWait(
      `为了做出新品种的家畜让${target_name}和一切的家畜交配。`,
    );
    await era.printAndWait(
      `还没有什么实验成果，不过持续下去，应该不久就见效了吧。`,
    );
    ending = '异种交配家畜';
  }
  return ending;
}

/** love_other_lt100k_toilet：街角的公厕买下；结局 沿用族末行赋值。 */
async function love_other_lt100k_toilet({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:204`) == 1) {
    await era.printAndWait(`作为现役肉便器继续侍奉着。`);
    await era.printAndWait(
      `${target_name}在相当长的时间内作为公众肉便器被广大市民所疼爱。`,
    );
    await era.printAndWait(`好像生下了不下一百个的孩子。`);
  } else {
    await era.printAndWait(`${target_name}作为公众肉便器不分昼夜地被使用着。`);
    await era.printAndWait(`过于残酷的生活让${she(cid)}精神崩溃了。`);
    await era.printAndWait(
      `多次呐喊着曾经作为主人的你的名字，最后终于完全坏掉了。`,
    );
  }
  return ending;
}

/** 末路族表：k0_route 给出的编号 → 该族的买家选择与末路分派函数。 */
const ROUTES = {
  love_matu_ge1m,
  love_matu_ge500k,
  love_matu_ge100k,
  love_matu_lt100k,
  love_other_ge1m,
  love_other_ge500k,
  love_other_ge100k,
  love_other_lt100k,
};

/** 正文表：末路编号 → 输出该末路正文并返回结局名的函数。 */
const ENDINGS = {
  love_matu_ge1m_general,
  love_matu_ge1m_noble,
  love_matu_ge1m_high_priest,
  love_matu_ge1m_tycoon,
  love_matu_ge500k_gang_boss,
  love_matu_ge500k_lord,
  love_matu_ge500k_temple,
  love_matu_ge500k_merchant,
  love_matu_ge100k_officer,
  love_matu_ge100k_academy,
  love_matu_ge100k_farm,
  love_matu_ge100k_dealer,
  love_matu_lt100k_mine_owner,
  love_matu_lt100k_bar,
  love_matu_lt100k_farm,
  love_matu_lt100k_toilet,
  love_other_ge1m_general,
  love_other_ge1m_noble,
  love_other_ge1m_high_priest,
  love_other_ge1m_tycoon,
  love_other_ge500k_gang_boss,
  love_other_ge500k_lord,
  love_other_ge500k_temple,
  love_other_ge500k_merchant,
  love_other_ge100k_officer,
  love_other_ge100k_academy,
  love_other_ge100k_farm,
  love_other_ge100k_dealer,
  love_other_lt100k_mine_owner,
  love_other_lt100k_bar,
  love_other_lt100k_farm,
  love_other_lt100k_toilet,
};

module.exports = { ROUTES, ENDINGS };
