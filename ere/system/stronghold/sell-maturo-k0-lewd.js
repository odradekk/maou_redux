/**
 * @file 黑市淫乱末路（issue #338/#797）。
 *
 * 淫乱（TALENT:76）：按魔族（TALENT:314 == 9）、非魔族与售价分成 8 个末路族。
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

/** lewd_matu_ge1m：淫乱 · 魔族 · 百万以上。 */
async function lewd_matu_ge1m(ctx) {
  const { cid, target_name } = ctx;
  let buyer = '';
  let route = 0;
  let ending = '';
  if (era.get(`talent:${cid}:200`) == 1 || era.get(`talent:${cid}:203`) == 1) {
    buyer = '魔界的谍报机关';
    route = 3;
  } else if (
    era.get(`talent:${cid}:205`) == 1 ||
    era.get(`talent:${cid}:207`) == 1
  ) {
    buyer = '魔界的高级妓院';
    route = 2;
  } else if (
    era.get(`talent:${cid}:202`) == 1 ||
    era.get(`talent:${cid}:206`) == 1
  ) {
    buyer = '堕落神的神官长';
    route = 1;
  } else {
    buyer = '魔界大富豪';
    route = 0;
  }
  await era.printAndWait(`${buyer}买下${target_name}之后………`);
  await era.printAndWait(`………`);
  await era.printAndWait(`……`);
  await era.printAndWait(`…`);

  if (route === 3) ending = await lewd_matu_ge1m_spy_agency(ctx);
  else if (route === 2) ending = await lewd_matu_ge1m_high_brothel(ctx);
  else if (route === 1) ending = await lewd_matu_ge1m_high_priest(ctx);
  else if (route === 0) ending = await lewd_matu_ge1m_magnate(ctx);
  return ending;
}

/** lewd_matu_ge1m_spy_agency：魔界的谍报机关买下；结局 魔界的谍报员 / 谍报组织的提审官。 */
async function lewd_matu_ge1m_spy_agency({ cid, target_name }) {
  let ending = '';
  if (era.get(`cflag:${cid}:9`) >= 100) {
    await era.printAndWait(`${target_name}据闻和一个山间小国的君主结婚了。`);
    await era.printAndWait(
      `那国王在和${she(cid)}相处了一晚之后就马上发布了结婚的决定。`,
    );
    await era.printAndWait(
      `你突然想起，那小国是生产魔界中为数不多的珍稀魔石的地方。`,
    );
    await era.printAndWait(
      `近来，那国家好像发生了什么政变，不过这对你来说已经是无关重要的话题了吧。`,
    );
    ending = '魔界的谍报员';
  } else {
    await era.printAndWait(
      `作为淫魔且拥有极品身体的${target_name}对讯问官手舞足蹈着，`,
    );
    await era.printAndWait(
      `无论男女都被${she(cid)}吸干精气而死，面对这样的身姿，其他讯问官都胆怯地跑掉了。`,
    );
    await era.printAndWait(
      `这样的生活，对于${target_name}来说，也算是一种幸福了吧。`,
    );
    ending = '谍报组织的提审官';
  }
  return ending;
}

/** lewd_matu_ge1m_high_brothel：魔界的高级妓院买下；结局 乳交娼妇 / 高级娼妇。 */
async function lewd_matu_ge1m_high_brothel({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(
      `${target_name}彻底堕落的身体让所有客人都很尽兴。从现在这个在男人身上淫乱不堪的样子，根本无法想象${she(cid)}曾经作为勇者挥剑战斗。`,
    );
    await era.printAndWait(
      `面对整晚都在渴求阴茎的${she(cid)}，有熟客说不如让他手下的一个小队来玩轮奸秀吧！`,
    );
    await era.printAndWait(
      `结果留下了光靠乳交就榨干了一个小队的精液这样的轶事。`,
    );
    ending = '乳交娼妇';
  } else {
    await era.printAndWait(
      `${target_name}彻底堕落的身体让所有客人都很尽兴。从现在这个在男人身上淫乱不堪的样子，根本无法想象${she(cid)}曾经作为勇者挥剑战斗。`,
    );
    await era.printAndWait(
      `一天到晚都在渴求阴茎，还曾发生把初次接待的客人榨干致死的事。`,
    );
    await era.printAndWait(
      `没有三个人一起上是搞不定${she(cid)}的，传出这样的传闻，让预约${she(cid)}的客人反而大大增加了。`,
    );
    ending = '高级娼妇';
  }
  return ending;
}

/** lewd_matu_ge1m_high_priest：堕落神的神官长买下；结局 堕落神的祭品 / 堕落神的巫女。 */
async function lewd_matu_ge1m_high_priest({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(`成熟了的淫乱魔族的肉体，是堕落神最好的祭品之一。`);
    await era.printAndWait(
      `神官长使用秘术，活祭${target_name}的仪式取得了成功。`,
    );
    await era.printAndWait(
      `现在${target_name}已脱离了现世，去堕落神身边体验永恒的快乐了。`,
    );
    ending = '堕落神的祭品';
  } else {
    await era.printAndWait(`${target_name}被带到神殿的深处。`);
    await era.printAndWait(
      `以神官长为首的神官们，对${target_name}使用了秘术。`,
    );
    await era.printAndWait(
      `「堕落神即将降临」「神殿新的祭品」「默示录即将开始」等等稀奇古怪的传言，对你来说是无关重要的事了吧……`,
    );
    ending = '堕落神的巫女';
  }
  return ending;
}

/** lewd_matu_ge1m_magnate：魔界大富豪买下；结局 妊娠便器 / 扩张奴隶。 */
async function lewd_matu_ge1m_magnate({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:204`) == 1) {
    await era.printAndWait(
      `「知道主人为${she(cid)}花费了多少吗？」正当客人这样窃窃私语的时候，${target_name}在掌声中入场了。`,
    );
    await era.printAndWait(
      `被带上台的${target_name}腹部夸张地隆起，能看出快要临盘了。`,
    );
    await era.printAndWait(
      `排卵诱发剂让${she(cid)}同时多重怀孕了，也进一步注射了阵痛诱发剂。`,
    );
    await era.printAndWait(
      `今晚的出产秀，到底会生出个什么呢？大家都拭目以待。`,
    );
    ending = '妊娠便器';
  } else {
    await era.printAndWait(
      `「知道${she(cid)}的主人为${she(cid)}花费了多少吗？」正当客人这样窃窃私语的时候，${target_name}在掌声中入场了。`,
    );
    await era.printAndWait(
      `被车子推上台的${target_name}的股间被两根巨大的假阳具撑开到极限。`,
    );
    await era.printAndWait(
      `因肉奴隶出色的状态而兴奋非常的客人们，催促着主人把手伸向${target_name}……`,
    );
    ending = '扩张奴隶';
  }
  return ending;
}

/** lewd_matu_ge500k：淫乱 · 魔族 · 五十万以上。 */
async function lewd_matu_ge500k(ctx) {
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
    buyer = '魔界的高级酒吧';
    route = 2;
  } else if (
    era.get(`talent:${cid}:202`) == 1 ||
    era.get(`talent:${cid}:206`) == 1
  ) {
    buyer = '堕落神的神殿';
    route = 1;
  } else {
    buyer = '魔界的好事之徒';
    route = 0;
  }
  await era.printAndWait(`${buyer}买下${target_name}之后………`);
  await era.printAndWait(`………`);
  await era.printAndWait(`……`);
  await era.printAndWait(`…`);

  if (route === 3) ending = await lewd_matu_ge500k_high_officer(ctx);
  else if (route === 2) ending = await lewd_matu_ge500k_high_bar(ctx);
  else if (route === 1) ending = await lewd_matu_ge500k_temple(ctx);
  else if (route === 0) ending = await lewd_matu_ge500k_busybody(ctx);
  return ending;
}

/** lewd_matu_ge500k_high_officer：魔王军的高级将校买下；结局 高级将校的保镖 / 高级将校的情人。 */
async function lewd_matu_ge500k_high_officer({ cid, target_name }) {
  let ending = '';
  if (era.get(`cflag:${cid}:9`) >= 50) {
    await era.printAndWait(`${target_name}现在作为主人的保镖兼情人生活着。`);
    await era.printAndWait(`即使已经堕落了，原勇者的战斗力也是不容小视的。`);
    await era.printAndWait(`发情生疼的淫靡肉体，也每晚都被主人疼爱着。`);
    ending = '高级将校的保镖';
  } else {
    await era.printAndWait(`${target_name}现在作为主人的情人生活着。`);
    await era.printAndWait(`淫媚的肉体，每晚都接受着主人过剩性欲的糟蹋。`);
    await era.printAndWait(
      `至今为止已经玩坏了许多奴隶的主人，貌似终于找到一个可以承受他日夜征讨的性奴隶了。`,
    );
    ending = '高级将校的情人';
  }
  return ending;
}

/** lewd_matu_ge500k_high_bar：魔界的高级酒吧买下；结局 高级酒馆的女侍应 / 高级酒馆的表演者。 */
async function lewd_matu_ge500k_high_bar({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(
      `${target_name}与其说是女服务员，不如说是恳求客人交欢的妓女。`,
    );
    await era.printAndWait(
      `用高耸挺拔的乳房引诱着客人往乳沟里塞小费，事成后马上把客人拖去另一个房间。`,
    );
    await era.printAndWait(`似乎只要给够钱，不管什么人都可以同度春宵的样子。`);
    ending = '高级酒馆的女侍应';
  } else {
    await era.printAndWait(`${target_name}每晚都参加舞台上各式各样的表演。`);
    await era.printAndWait(
      `从钢管舞到轮奸，从兽奸到分娩秀，什么玩法都表演过了。`,
    );
    await era.printAndWait(
      `现在，孩子都长大，还被轮奸出孙子了，但依然保持着妖艳的肉体。`,
    );
    ending = '高级酒馆的表演者';
  }
  return ending;
}

/** lewd_matu_ge500k_temple：堕落神的神殿买下；结局 堕落神的信徒 / 堕落神的性奴。 */
async function lewd_matu_ge500k_temple({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(
      `${target_name}每天从神殿开门到神殿关门，都被信徒们侵犯着。`,
    );
    await era.printAndWait(
      `在堕落神的保佑下，即使没怀孕，也会从丰满的乳房滴出母乳来。`,
    );
    await era.printAndWait(
      `现在已经彻底沉迷在无穷的快感之中，完全变成堕落神的信徒了。`,
    );
    ending = '堕落神的信徒';
  } else {
    await era.printAndWait(
      `${target_name}每天从神殿开门到神殿关门，都被信徒们侵犯着。`,
    );
    await era.printAndWait(`在信徒中有着高人气，每次都同时被好几人狠狠玩弄。`);
    await era.printAndWait(`不过，看起来貌似对这样的生活感到很幸福的样子。`);
    ending = '堕落神的性奴';
  }
  return ending;
}

/** lewd_matu_ge500k_busybody：魔界的好事之徒买下；结局 肉便器 / 好事者的抱枕。 */
async function lewd_matu_ge500k_busybody({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:204`) == 1) {
    await era.printAndWait(
      `作为肉便器被放置在屋子的厕所里，无论主人、客人还是佣人，男女老少都可以使用。`,
    );
    await era.printAndWait(
      `特意请人来负责肉便器${target_name}的清洁及维护工作。`,
    );
    await era.printAndWait(`每使用一次都进行一遍保养，主人就是想得这么周到。`);
    ending = '肉便器';
  } else {
    await era.printAndWait(
      `${target_name}的手脚都被砍断了，作为主人的抱枕而存在着。`,
    );
    await era.printAndWait(`为了照顾这样的抱枕，特意雇佣了一个女仆来负责。`);
    await era.printAndWait(`作为抱枕，好像有着无论被侵犯多少次都不够的样子。`);
    ending = '好事者的抱枕';
  }
  return ending;
}

/** lewd_matu_ge100k：淫乱 · 魔族 · 十万以上。 */
async function lewd_matu_ge100k(ctx) {
  const { cid, target_name } = ctx;
  let buyer = '';
  let route = 0;
  let ending = '';
  if (era.get(`talent:${cid}:200`) == 1 || era.get(`talent:${cid}:203`) == 1) {
    buyer = '魔界的黑帮';
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
    buyer = '魔界的黑酒吧';
    route = 1;
  } else {
    buyer = '魔界的赌场';
    route = 0;
  }
  await era.printAndWait(`${buyer}买下${target_name}之后………`);
  await era.printAndWait(`………`);
  await era.printAndWait(`……`);
  await era.printAndWait(`…`);

  if (route === 3) ending = await lewd_matu_ge100k_gang(ctx);
  else if (route === 2) ending = await lewd_matu_ge100k_brothel(ctx);
  else if (route === 1) ending = await lewd_matu_ge100k_shady_bar(ctx);
  else if (route === 0) ending = await lewd_matu_ge100k_casino(ctx);
  return ending;
}

/** lewd_matu_ge100k_gang：魔界的黑帮买下；结局 黑帮成员 / 黑社会的情妇。 */
async function lewd_matu_ge100k_gang({ cid, target_name }) {
  let ending = '';
  if (era.get(`cflag:${cid}:9`) >= 30) {
    await era.printAndWait(
      `${target_name}成为黑社会的一员了。因为原来的勇者经历，被委以重任了。`,
    );
    await era.printAndWait(
      `每晚都用淫秽的肉体和部下交欢着，团队内部因此非常团结。`,
    );
    await era.printAndWait(
      `${target_name}在黑社会中如何生存下去真的难以预料，愿${she(cid)}长寿吧……`,
    );
    ending = '黑帮成员';
  } else {
    await era.printAndWait(
      `${target_name}成为黑社会的一员了。作为成员情妇的${target_name}每晚都要侍奉不同的男人。`,
    );
    await era.printAndWait(
      `对于一天都不能没有性爱的${she(cid)}来说，也算是一个可喜的环境吧。`,
    );
    await era.printAndWait(
      `${target_name}在黑社会中如何生存下去真的难以预料，愿${she(cid)}长寿吧……`,
    );
    ending = '黑社会的情妇';
  }
  return ending;
}

/** lewd_matu_ge100k_brothel：魔界的妓院买下；结局 刺青娼妇。 */
async function lewd_matu_ge100k_brothel({ cid, target_name }) {
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
      `因为这个原因，总有很多熟客找上门来。对于${target_name}这一直渴求男人的淫靡肉体来说，能每晚交欢，应该是比能挣钱还重要吧。`,
    );
    await era.printAndWait(`${she(cid)}已经无法想象没有性的生活了。`);
    ending = '刺青娼妇';
  } else {
    await era.printAndWait(
      `${target_name}被放在橱窗里吸引客人。不知是否是妓院主人的爱好，${she(cid)}的脸的右侧被画上了下流的图案。`,
    );
    await era.printAndWait(
      `貌似因为这个原因吸引了不少有着奇妙癖好的熟客，每晚${she(cid)}的房间里都传出不间断的悲鸣。`,
    );
    await era.printAndWait(
      `对于不能没有男人的${target_name}来说，这样的生活也许也是一种幸福吧。`,
    );
    ending = '刺青娼妇';
  }
  return ending;
}

/** lewd_matu_ge100k_shady_bar：魔界的黑酒吧买下；结局 黑酒吧的乳奴隶 / 黑酒吧的女侍应。 */
async function lewd_matu_ge100k_shady_bar({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(`贩毒的黑帮在自己经营的黑酒吧里，也流通着毒品。`);
    await era.printAndWait(
      `${target_name}被喂食了特制的母乳果实，双峰分泌出特殊的母乳了。`,
    );
    await era.printAndWait(
      `一般都是把母乳挤到杯子里，不过一些优待的客人可以直接从乳房上喝。`,
    );
    await era.printAndWait(
      `母乳里有强烈的催情成分，一般${target_name}当场就被这些客人侵犯了。`,
    );
    ending = '黑酒吧的乳奴隶';
  } else {
    await era.printAndWait(`贩毒的黑帮在自己经营的黑酒吧里，也流通着毒品。`);
    await era.printAndWait(
      `${target_name}平常只是做一般的服务员，有时也会被一些嗑药嗑高了，或者喝多了的客人侵犯。`,
    );
    await era.printAndWait(`不过${she(cid)}也挺享受这种偶发事件的。`);
    ending = '黑酒吧的女侍应';
  }
  return ending;
}

/** lewd_matu_ge100k_casino：魔界的赌场买下；结局 赌场的肉便器 / 赌场的赠品。 */
async function lewd_matu_ge100k_casino({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:204`) == 1) {
    await era.printAndWait(
      `赌场为了安抚那些输了很多的客人，就会把他们带到一个侍奉房间里。`,
    );
    await era.printAndWait(
      `在里面，客人可以彻底地玩弄作为肉便器的${target_name}，`,
    );
    await era.printAndWait(`私处和肛门，被塞了很多赌场特制的筹码，`);
    await era.printAndWait(
      `每天在赌场里输掉的人络绎不绝，看来今后${she(cid)}都要作为肉便器玩具永远这样生活下去了。`,
    );
    ending = '赌场的肉便器';
  } else {
    await era.printAndWait(`${target_name}成为了赌场的赠品。`);
    await era.printAndWait(
      `在被买回来的当天，就被作为附加礼品送给了中了大乐透的客人。`,
    );
    await era.printAndWait(
      `不过不久之后，就作为借款的抵押，又被赌场当成赠品了。这样的事连续发生了好多次。`,
    );
    await era.printAndWait(
      `在赌徒中，开始有流言说${she(cid)}是会吸取财运的魔女。`,
    );
    ending = '赌场的赠品';
  }
  return ending;
}

/** lewd_matu_lt100k：淫乱 · 魔族 · 十万以下。 */
async function lewd_matu_lt100k(ctx) {
  const { cid, target_name } = ctx;
  let buyer = '';
  let route = 0;
  let ending = '';
  if (era.get(`talent:${cid}:200`) == 1 || era.get(`talent:${cid}:203`) == 1) {
    buyer = '魔界的酒吧';
    route = 3;
  } else if (
    era.get(`talent:${cid}:205`) == 1 ||
    era.get(`talent:${cid}:207`) == 1
  ) {
    buyer = '乞丐';
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
  await era.printAndWait(`${buyer}买下${target_name}之后`);
  await era.printAndWait(`………`);
  await era.printAndWait(`……`);
  await era.printAndWait(`…`);

  if (route === 3) ending = await lewd_matu_lt100k_bar(ctx);
  else if (route === 2) ending = await lewd_matu_lt100k_beggar(ctx);
  else if (route === 1) ending = await lewd_matu_lt100k_tentacle_hut(ctx);
  else if (route === 0) ending = await lewd_matu_lt100k_toilet(ctx);
  return ending;
}

/** lewd_matu_lt100k_bar：魔界的酒吧买下；结局 酒吧的赠品。 */
async function lewd_matu_lt100k_bar({ cid, target_name }) {
  let ending = '';
  if (era.get(`cflag:${cid}:9`) >= 20) {
    await era.printAndWait(`周末，这种酒吧都会搞一些特别的活动。`);
    await era.printAndWait(
      `${target_name}作为飞镖的靶子，参加了特别的飞镖比赛。特别的魔法，让${she(cid)}被射中的痛楚都会转变为快感。`,
    );
    await era.printAndWait(
      `赢了的人，就可以当场侵犯已经发情的${target_name}，不过${she(cid)}做爱如此疯狂，常常会把优胜者给榨干。`,
    );
    ending = '酒吧的赠品';
  } else {
    await era.printAndWait(`周末，这种酒吧都会搞一些特别的活动。`);
    await era.printAndWait(
      `${target_name}作为飞镖的靶子，参加了特别的飞镖比赛。特别的魔法，让${she(cid)}被射中的痛楚都会转变为快感。`,
    );
    await era.printAndWait(
      `赢了的人，就可以当场侵犯已经发情的${target_name}，其它的参赛者，往往也会在之后对${she(cid)}进行轮奸。`,
    );
    ending = '酒吧的赠品';
  }
  return ending;
}

/** lewd_matu_lt100k_beggar：乞丐买下；结局 乞丐的妻子。 */
async function lewd_matu_lt100k_beggar({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(
      `晚上在主人的巢穴里被疼爱着，白天则被租给主人的乞丐朋友，为主人换取喝酒钱。`,
    );
    await era.printAndWait(
      `丰满的乳房被毫不客气地玩弄着，但淫靡的肉体却无法反抗这种醉人的痛楚。`,
    );
    await era.printAndWait(
      `不过，${target_name}貌似对成为主人朋友们的宠物感到挺愉悦的。`,
    );
    ending = '乞丐的妻子';
  } else {
    await era.printAndWait(
      `晚上在主人的巢穴里被疼爱着，白天则被租给主人的乞丐朋友，为主人换取喝酒钱。`,
    );
    await era.printAndWait(
      `不过，${target_name}貌似对成为主人朋友们的宠物感到挺愉悦的。`,
    );
    ending = '乞丐的妻子';
  }
  return ending;
}

/** lewd_matu_lt100k_tentacle_hut：触手小屋买下；结局 触手的苗床。 */
async function lewd_matu_lt100k_tentacle_hut({ cid, target_name }) {
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
    ending = '触手的苗床';
  } else {
    await era.printAndWait(`${target_name}被安排在量产触手的触手小屋里，`);
    await era.printAndWait(`不知培养了多少触手，也许成百上千了。`);
    await era.printAndWait(
      `完全适应了作为触手的母体，看来这样的生活会持续到${she(cid)}死去的那一天。`,
    );
    ending = '触手的苗床';
  }
  return ending;
}

/** lewd_matu_lt100k_toilet：公厕买下；结局 公众便所 / 公众肉便器。 */
async function lewd_matu_lt100k_toilet({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:204`) == 1) {
    await era.printAndWait(
      `被锁在公厕里的${target_name}，作为公众肉便器开始了无休止的侍奉。`,
    );
    await era.printAndWait(`被无尽的男人们侵犯，只是最普通的日常罢了。`);
    await era.printAndWait(
      `直到${target_name}身上的锁链被解开的那天，好像为几百人生了孩子。`,
    );
    ending = '公众便所';
  } else {
    await era.printAndWait(
      `${target_name}作为市民的公众肉便器，不分昼夜地被使用着。`,
    );
    await era.printAndWait(
      `每次被男人侵犯的时候，${she(cid)}都不停地娇声呻吟着。`,
    );
    await era.printAndWait(
      `被你彻底调教的淫乱身体起了充分的反应，不断吸收着市民们的欲望。`,
    );
    ending = '公众肉便器';
  }
  return ending;
}

/** lewd_other_ge1m：淫乱 · 非魔族 · 百万以上。 */
async function lewd_other_ge1m(ctx) {
  const { cid, target_name } = ctx;
  let buyer = '';
  let route = 0;
  let ending = '';
  if (era.get(`talent:${cid}:200`) == 1 || era.get(`talent:${cid}:203`) == 1) {
    buyer = '魔界的间谍培训机构';
    route = 3;
  } else if (
    era.get(`talent:${cid}:205`) == 1 ||
    era.get(`talent:${cid}:207`) == 1
  ) {
    buyer = '魔界的高级妓院';
    route = 2;
  } else if (
    era.get(`talent:${cid}:202`) == 1 ||
    era.get(`talent:${cid}:206`) == 1
  ) {
    buyer = '堕落神的神官长';
    route = 1;
  } else {
    buyer = '魔界大富豪';
    route = 0;
  }
  await era.printAndWait(`${buyer}买下${target_name}之后………`);
  await era.printAndWait(`………`);
  await era.printAndWait(`……`);
  await era.printAndWait(`…`);

  if (route === 3) ending = await lewd_other_ge1m_spy_school(ctx);
  else if (route === 2) ending = await lewd_other_ge1m_high_brothel(ctx);
  else if (route === 1) ending = await lewd_other_ge1m_high_priest(ctx);
  else if (route === 0) ending = await lewd_other_ge1m_magnate(ctx);
  return ending;
}

/** lewd_other_ge1m_spy_school：魔界的间谍培训机构买下；结局 魔界的间谍 / 间谍教材。 */
async function lewd_other_ge1m_spy_school({ cid, target_name }) {
  let ending = '';
  if (era.get(`cflag:${cid}:9`) >= 100) {
    await era.printAndWait(
      `${target_name}在人间界被保护了的消息，你是知道的。`,
    );
    await era.printAndWait(
      `到底怎么逃出去的还不清楚，不过的确是回到了原来的王国。`,
    );
    await era.printAndWait(
      `受到了很好的治疗，不断康复，同时积极地进言向魔界进军。`,
    );
    await era.printAndWait(`据说引导了主流舆论，组成了相当规模的大军。`);
    await era.printAndWait(
      `可是你知道，他们进军的地区是魔界中也相当有名的激战区，人类军团在那种地狱应该没有胜算吧。`,
    );
    await era.printAndWait(`而且，因为这样，那个王国现在守备空虚，`);
    await era.printAndWait(`你开始盘算着如何侵略它了……`);
    ending = '魔界的间谍';
  } else {
    await era.printAndWait(
      `将所有知道的地面情报都供出了之后，被当作活教材被收容在设施里。`,
    );
    await era.printAndWait(
      `以原勇者的名头与新人对战训练，是${target_name}无聊的牢狱生活中唯一的娱乐。`,
    );
    await era.printAndWait(
      `训练生们也知道这一点，所以在对战胜利之后，也会相当彻底地凌辱${she(cid)}一番。`,
    );
    ending = '间谍教材';
  }
  return ending;
}

/** lewd_other_ge1m_high_brothel：魔界的高级妓院买下；结局 高级娼妇。 */
async function lewd_other_ge1m_high_brothel({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(
      `作为完全调教的奴隶而被买入的${target_name}，马上就被客人指名了。`,
    );
    await era.printAndWait(
      `最初的客人为了留念，在${she(cid)}的乳房上留下了刺青，从那时起，老鸨就为${she(cid)}推出了刺青服务。`,
    );
    await era.printAndWait(
      `各种各样的刺青，现在充斥在${target_name}高耸迷人的乳房上。`,
    );
    ending = '高级娼妇';
  } else {
    await era.printAndWait(
      `作为完全调教的奴隶而被买入的${target_name}，马上就被客人指名了。`,
    );
    await era.printAndWait(
      `像淫魔一样变换着花式来榨取着客人的精气，${she(cid)}的身姿连老鸨都看呆了。`,
    );
    await era.printAndWait(`实际上，${target_name}没用多久，就成为了头牌。`);
    ending = '高级娼妇';
  }
  return ending;
}

/** lewd_other_ge1m_high_priest：堕落神的神官长买下；结局 堕落神的信徒 / 堕落神的巫女。 */
async function lewd_other_ge1m_high_priest({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(
      `彻底被调教开发的淫乱肉体，是堕落神最好的祭品之一。`,
    );
    await era.printAndWait(`更何况是信仰其它神灵的人。`);
    await era.printAndWait(
      `神官长，花了相当长的时间来传教，将${target_name}的信仰扭转，发誓完全皈依堕落神。`,
    );
    await era.printAndWait(`作为堕落神的教徒，会享受到一生的无尽快感吧。`);
    ending = '堕落神的信徒';
  } else {
    await era.printAndWait(`${target_name}被带到了神殿深处。`);
    await era.printAndWait(
      `以神官长为首的神官们，为${she(cid)}施下了淫乱的秘术。`,
    );
    await era.printAndWait(
      `准备着数百年一次的仪式，貌似打算把${she(cid)}当作最后一天的祭品。`,
    );
    ending = '堕落神的巫女';
  }
  return ending;
}

/** lewd_other_ge1m_magnate：魔界大富豪买下；结局 肉便器 / 大富豪的收藏品。 */
async function lewd_other_ge1m_magnate({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:204`) == 1) {
    await era.printAndWait(`被做了手术，${target_name}作为肉便器被放在屋里。`);
    await era.printAndWait(
      `手脚都被切掉了，身子和一根铁管连在一起一动也不能动。`,
    );
    await era.printAndWait(
      `一般来说这么弄要顺便洗脑的，不过主人说要保持${she(cid)}的智力和意识，所以未实施。`,
    );
    await era.printAndWait(
      `通常人被这么弄早就发疯了，但被你彻底调教的${she(cid)}却坚持了下来。`,
    );
    await era.printAndWait(
      `被主人和客人的尿淋满一身，${target_name}居然愉悦地绝顶了。`,
    );
    ending = '肉便器';
  } else {
    await era.printAndWait(`${target_name}被装上台座，被放到屋里。`);
    await era.printAndWait(
      `台座伸出两根巨大的假阳具，深深地插入了${she(cid)}的私处及肛门，不停抽插着。`,
    );
    await era.printAndWait(
      `在同一房间内，不知有多少个与${target_name}一样处境的原勇者，被作为展品似的放置着。`,
    );
    await era.printAndWait(
      `那位大富豪貌似有这样的收藏癖，用重金把所有战败勇者都收集起来。`,
    );
    ending = '大富豪的收藏品';
  }
  return ending;
}

/** lewd_other_ge500k：淫乱 · 非魔族 · 五十万以上。 */
async function lewd_other_ge500k(ctx) {
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
    buyer = '魔界的高级酒吧';
    route = 2;
  } else if (
    era.get(`talent:${cid}:202`) == 1 ||
    era.get(`talent:${cid}:206`) == 1
  ) {
    buyer = '堕落神的神殿';
    route = 1;
  } else {
    buyer = '魔界的好事之徒';
    route = 0;
  }
  await era.printAndWait(`${buyer}买下${target_name}之后………`);
  await era.printAndWait(`………`);
  await era.printAndWait(`……`);
  await era.printAndWait(`…`);

  if (route === 3) ending = await lewd_other_ge500k_high_officer(ctx);
  else if (route === 2) ending = await lewd_other_ge500k_high_bar(ctx);
  else if (route === 1) ending = await lewd_other_ge500k_temple(ctx);
  else if (route === 0) ending = await lewd_other_ge500k_busybody(ctx);
  return ending;
}

/** lewd_other_ge500k_high_officer：魔王军的高级将校买下；结局 魔界的士官 / 高级将校的奴隶。 */
async function lewd_other_ge500k_high_officer({ cid, target_name }) {
  let ending = '';
  if (era.get(`cflag:${cid}:9`) >= 50) {
    await era.printAndWait(
      `${target_name}被主人卓越的调教弄得彻底堕落了，然后被编入了魔界军。`,
    );
    await era.printAndWait(`原勇者的实力，让${she(cid)}得心应手地指挥着部队。`);
    await era.printAndWait(
      `${she(cid)}的部队据说有着非常凶悍的炮友亲卫队，用疯狂的战斗热情让其它部队都感到颤抖。`,
    );
    ending = '魔界的士官';
  } else {
    await era.printAndWait(`作为主人的其中一个新奴隶住在屋子里。`);
    await era.printAndWait(`在宅邸里，还有几个其它种族的奴隶的照料着主人。`);
    await era.printAndWait(
      `${target_name}发挥领导人的才智，把大家团结起来，互助互爱，因而得到了主人的认可，成为了奴隶长。`,
    );
    ending = '高级将校的奴隶';
  }
  return ending;
}

/** lewd_other_ge500k_high_bar：魔界的高级酒吧买下；结局 高级酒馆的女侍应。 */
async function lewd_other_ge500k_high_bar({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(
      `${target_name}的乳头被打入了好几根乳钉，穿着露乳服装接待着客人。`,
    );
    await era.printAndWait(
      `客人们可以拔下${she(cid)}乳头上的细钉，来代替叉子来食用料理。`,
    );
    await era.printAndWait(`这种服务，受到了客人们的广泛好评。`);
    ending = '高级酒馆的女侍应';
  } else {
    await era.printAndWait(
      `${target_name}被指派专门接待脾气不好的客人。但被客人责骂，${target_name}也感到相当愉悦。`,
    );
    await era.printAndWait(
      `应对性骚扰也显得游刃有余，对于淫乱的${she(cid)}来说，这根本不是问题。`,
    );
    await era.printAndWait(
      `当然，为了接待怎么也不满足的客人，${she(cid)}为他们留下了一间特别的侍奉房间。`,
    );
    ending = '高级酒馆的女侍应';
  }
  return ending;
}

/** lewd_other_ge500k_temple：堕落神的神殿买下；结局 神殿的性奴 / 堕落神的巫女。 */
async function lewd_other_ge500k_temple({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(
      `${target_name}每天从神殿开门到神殿关门，都被信徒们侵犯着。`,
    );
    await era.printAndWait(
      `在堕落神的保佑下，即使没怀孕，也会从丰满的乳房滴出母乳来。`,
    );
    await era.printAndWait(`而且，生出的孩子也被神殿所重视，重点培养了。`);
    ending = '神殿的性奴';
  } else {
    await era.printAndWait(
      `${target_name}每天从神殿开门到神殿关门，都被信徒们侵犯着。`,
    );
    await era.printAndWait(
      `作为异族以及信奉其它神的人，在信徒中有着高人气，每次都同时被数人狠狠玩弄。`,
    );
    await era.printAndWait(
      `现在，${target_name}已经成为了信仰堕落神的性巫女，将在神殿中度过余生。`,
    );
    ending = '堕落神的巫女';
  }
  return ending;
}

/** lewd_other_ge500k_busybody：魔界的好事之徒买下；结局 马厩的肉便器 / 好事者的抱枕。 */
async function lewd_other_ge500k_busybody({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:204`) == 1) {
    await era.printAndWait(`作为男仆们和女仆们的肉便器被绑在马厩里。`);
    await era.printAndWait(
      `当然，马到了发情期的时候，会狠狠地侵犯${target_name}。`,
    );
    await era.printAndWait(
      `主人有时也会身穿便服来马厩侵犯${she(cid)}。脏脏的小屋里，气氛非常和谐。`,
    );
    ending = '马厩的肉便器';
  } else {
    await era.printAndWait(`作为好事者的抱枕被使用着。`);
    await era.printAndWait(
      `手脚都被切断了，被削成人棍，还被装上了一些可爱的装饰。`,
    );
    await era.printAndWait(
      `不过，也许是主人的睡相不好吧～总是在早上发现${she(cid)}掉到床下正在挣扎。`,
    );
    ending = '好事者的抱枕';
  }
  return ending;
}

/** lewd_other_ge100k：淫乱 · 非魔族 · 十万以上。 */
async function lewd_other_ge100k(ctx) {
  const { cid, target_name } = ctx;
  let buyer = '';
  let route = 0;
  let ending = '';
  if (era.get(`talent:${cid}:200`) == 1 || era.get(`talent:${cid}:203`) == 1) {
    buyer = '魔界的黑帮';
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
    buyer = '魔界的黑酒吧';
    route = 1;
  } else {
    buyer = '魔界的赌场';
    route = 0;
  }
  await era.printAndWait(`${buyer}买下${target_name}之后………`);
  await era.printAndWait(`………`);
  await era.printAndWait(`……`);
  await era.printAndWait(`…`);

  if (route === 3) ending = await lewd_other_ge100k_gang(ctx);
  else if (route === 2) ending = await lewd_other_ge100k_brothel(ctx);
  else if (route === 1) ending = await lewd_other_ge100k_shady_bar(ctx);
  else if (route === 0) ending = await lewd_other_ge100k_casino(ctx);
  return ending;
}

/** lewd_other_ge100k_gang：魔界的黑帮买下；结局 黑社会的情妇。 */
async function lewd_other_ge100k_gang({ cid, target_name }) {
  let ending = '';
  if (era.get(`abl:${cid}:2`) >= 5) {
    await era.printAndWait(`${target_name}作为干部的情妇生活着。`);
    await era.printAndWait(
      `${target_name}在干部的卓越调教下堕落了，利用${she(cid)}来操纵着部下。`,
    );
    await era.printAndWait(`被放到别墅里，每晚都侍奉着不同的男人。`);
    ending = '黑社会的情妇';
  } else {
    await era.printAndWait(`${target_name}作为虐待狂干部的情妇生活着。`);
    await era.printAndWait(
      `${she(cid)}最开始也为此困惑过，不过夜晚的生活比想象中的更充实、更令${she(cid)}满足。`,
    );
    await era.printAndWait(
      `每晚的过激玩法，让${target_name}彻底沉迷于这种快乐。`,
    );
    ending = '黑社会的情妇';
  }
  return ending;
}

/** lewd_other_ge100k_brothel：魔界的妓院买下；结局 橱窗娼妇。 */
async function lewd_other_ge100k_brothel({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(`${target_name}隔着橱窗招揽客人。`);
    await era.printAndWait(
      `在橱窗待了一段时间之后，${she(cid)}出名了。因为袒胸露乳的衣着下，${she(cid)}丰满的乳房被画上了下流的刺青，乳头也被穿上乳环。`,
    );
    await era.printAndWait(
      `虽然以后也很难把胸部藏起来了，但在熟客们的照顾下，还是过得不错。`,
    );
    ending = '橱窗娼妇';
  } else {
    await era.printAndWait(
      `${target_name}隔着橱窗招揽客人，看上去已经习惯自己的妆容了。`,
    );
    await era.printAndWait(
      `身为异族女人好像特别受欢迎，最近每个月底都会有个魔族男人总是指名${she(cid)}。`,
    );
    await era.printAndWait(
      `直接包夜，结结实实地侵犯着${she(cid)}的全身，把${she(cid)}弄丢几十次。`,
    );
    await era.printAndWait(
      `那人有意无意地传递着想帮${she(cid)}赎身的想法，但${target_name}婉拒了。`,
    );
    ending = '橱窗娼妇';
  }
  return ending;
}

/** lewd_other_ge100k_shady_bar：魔界的黑酒吧买下；结局 黑酒馆的瘾君子。 */
async function lewd_other_ge100k_shady_bar({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(`贩毒的黑帮在自己经营的黑酒吧里，也流通着毒品。`);
    await era.printAndWait(
      `${target_name}被喂食了特制的母乳果实，双峰分泌出特殊的母乳了。`,
    );
    await era.printAndWait(
      `有着强力陶醉效果的母乳，如果不定期榨取，母体本身都会因此疯掉。`,
    );
    await era.printAndWait(`现在一直恳求被侵犯的同时，也恳求着客人来挤奶。`);
    ending = '黑酒馆的瘾君子';
  } else {
    await era.printAndWait(`贩毒的黑帮在自己经营的黑酒吧里，也流通着毒品。`);
    await era.printAndWait(
      `${target_name}完全沉迷在毒品带来的快乐中，彻底上瘾了。整天发出甘甜、妖艳的喘息。`,
    );
    await era.printAndWait(
      `今晚，也在客人胯间努力地用嘴巴吸啜着，一但射出精液，也会满足地一饮而尽。`,
    );
    ending = '黑酒馆的瘾君子';
  }
  return ending;
}

/** lewd_other_ge100k_casino：魔界的赌场买下；结局 赌场的肉便器 / 赌场的赠品。 */
async function lewd_other_ge100k_casino({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:204`) == 1) {
    await era.printAndWait(
      `赌场为了安抚那些输了很多的客人，就会把他们带到一个侍奉房间里。`,
    );
    await era.printAndWait(
      `在里面，客人可以彻底地玩弄作为肉便器的${target_name}．`,
    );
    await era.printAndWait(`私处和肛门，被塞了很多赌场特制的筹码，`);
    await era.printAndWait(
      `每天在赌场里输掉的人络绎不绝，看来今后${she(cid)}都要作为肉便器玩具永远这样生活下去了。`,
    );
    ending = '赌场的肉便器';
  } else {
    await era.printAndWait(`${target_name}成为了赌场的赠品。`);
    await era.printAndWait(
      `在被买回来的当天，就被作为附加礼品送给了中了大乐透的客人。`,
    );
    await era.printAndWait(`不过，在那个赌场里，奴隶是可以当作赌注的。`);
    await era.printAndWait(
      `${target_name}因此被作为赌注，在数十个赌徒之间被不停转手着。`,
    );
    ending = '赌场的赠品';
  }
  return ending;
}

/** lewd_other_lt100k：淫乱 · 非魔族 · 十万以下。 */
async function lewd_other_lt100k(ctx) {
  const { cid, target_name } = ctx;
  let buyer = '';
  let route = 0;
  let ending = '';
  if (era.get(`talent:${cid}:200`) == 1 || era.get(`talent:${cid}:203`) == 1) {
    buyer = '魔界的酒吧';
    route = 3;
  } else if (
    era.get(`talent:${cid}:205`) == 1 ||
    era.get(`talent:${cid}:207`) == 1
  ) {
    buyer = '乞丐';
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

  if (route === 3) ending = await lewd_other_lt100k_bar(ctx);
  else if (route === 2) ending = await lewd_other_lt100k_beggar(ctx);
  else if (route === 1) ending = await lewd_other_lt100k_tentacle_hut(ctx);
  else if (route === 0) ending = await lewd_other_lt100k_toilet(ctx);
  return ending;
}

/** lewd_other_lt100k_bar：魔界的酒吧买下；结局 酒吧的赠品。 */
async function lewd_other_lt100k_bar({ cid, target_name }) {
  let ending = '';
  if (era.get(`abl:${cid}:2`) >= 5) {
    await era.printAndWait(`周末，这种酒吧都会搞一些特别的竞赛。`);
    await era.printAndWait(
      `${target_name}作为飞镖的靶子，参加了特别的飞镖比赛。特别的魔法，让${she(cid)}被射中都不会留下伤口，而是转变为一种电击似的痛楚。`,
    );
    await era.printAndWait(
      `谁让${she(cid)}惨叫得最大声，谁就会成为优胜者。竞赛在热烈的气氛中持续着。`,
    );
  } else {
    await era.printAndWait(`周末，这种酒吧都会搞一些特别的表演。`);
    await era.printAndWait(
      `${target_name}作为飞镖的靶子，参加了特别的飞镖比赛。特别的魔法，让${she(cid)}被射中都不会留下伤口，而是转变为一种电击似的痛楚。`,
    );
    await era.printAndWait(
      `酒吧老板很有技巧地投掷着飞镖，让${she(cid)}连晕过去都做不到，持续地惨叫着……`,
    );
  }
  ending = '酒吧的赠品';
  return ending;
}

/** lewd_other_lt100k_beggar：乞丐买下；结局 乞丐的妻子。 */
async function lewd_other_lt100k_beggar({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(
      `${target_name}晚上在主人的巢穴里被疼爱着，白天则被租给主人的乞丐朋友，为主人换取喝酒钱。`,
    );
    await era.printAndWait(
      `丰满的乳房被毫不客气地玩弄着，但淫靡的肉体却无法反抗这种醉人的痛楚。`,
    );
    await era.printAndWait(
      `怀孕生下的孩子马上又被卖掉了，因此更加频繁地出租给别人。`,
    );
  } else {
    await era.printAndWait(
      `${target_name}晚上在主人的巢穴里被疼爱着，白天则被租给主人的乞丐朋友，为主人换取喝酒钱。`,
    );
    await era.printAndWait(
      `怀孕生下的孩子马上又被卖掉了，因此更加频繁地出租给别人。`,
    );
  }
  ending = '乞丐的妻子';
  return ending;
}

/** lewd_other_lt100k_tentacle_hut：触手小屋买下；结局 触手的苗床。 */
async function lewd_other_lt100k_tentacle_hut({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(`${target_name}被安排在量产触手的触手小屋里，`);
    await era.printAndWait(`被不知道几万的触手侵犯过，头脑都变得不正常了。`);
    await era.printAndWait(`曾经漂亮的丰满乳房现在已经彻底变成触手的温床了。`);
  } else {
    await era.printAndWait(`${target_name}被安排在量产触手的触手小屋里，`);
    await era.printAndWait(`被不知道几万的触手侵犯过，头脑都变得不正常了。`);
    await era.printAndWait(`不止是私处，连直肠都无可避免地成为了触手的温床。`);
  }
  ending = '触手的苗床';
  return ending;
}

/** lewd_other_lt100k_toilet：公厕买下；结局 公众肉便器。 */
async function lewd_other_lt100k_toilet({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:204`) == 1) {
    await era.printAndWait(
      `被锁在公厕里的${target_name}，作为公众肉便器开始了无休止的侍奉。`,
    );
    await era.printAndWait(
      `被地下城里各个种族的无尽的男人侵犯，对${she(cid)}来说，还没有住在公厕里辛苦。`,
    );
    await era.printAndWait(
      `后来，通过了肉便器放置的法案，${target_name}被开放了。直到那天为止，好像为几百人生了孩子。`,
    );
  } else {
    await era.printAndWait(
      `被锁在公厕里的${target_name}，作为公众肉便器开始了无休止的侍奉。`,
    );
    await era.printAndWait(`各个种族的男人都使用${she(cid)}的身体来处理性欲。`);
    await era.printAndWait(
      `后来，通过了肉便器放置的法案，${target_name}被开放了。直到那天为止，好像为几百人生了孩子。`,
    );
  }
  ending = '公众肉便器';
  return ending;
}

/** 末路族表：k0_route 给出的编号 → 该族的买家选择与末路分派函数。 */
const ROUTES = {
  lewd_matu_ge1m,
  lewd_matu_ge500k,
  lewd_matu_ge100k,
  lewd_matu_lt100k,
  lewd_other_ge1m,
  lewd_other_ge500k,
  lewd_other_ge100k,
  lewd_other_lt100k,
};

/** 正文表：末路编号 → 输出该末路正文并返回结局名的函数。 */
const ENDINGS = {
  lewd_matu_ge1m_spy_agency,
  lewd_matu_ge1m_high_brothel,
  lewd_matu_ge1m_high_priest,
  lewd_matu_ge1m_magnate,
  lewd_matu_ge500k_high_officer,
  lewd_matu_ge500k_high_bar,
  lewd_matu_ge500k_temple,
  lewd_matu_ge500k_busybody,
  lewd_matu_ge100k_gang,
  lewd_matu_ge100k_brothel,
  lewd_matu_ge100k_shady_bar,
  lewd_matu_ge100k_casino,
  lewd_matu_lt100k_bar,
  lewd_matu_lt100k_beggar,
  lewd_matu_lt100k_tentacle_hut,
  lewd_matu_lt100k_toilet,
  lewd_other_ge1m_spy_school,
  lewd_other_ge1m_high_brothel,
  lewd_other_ge1m_high_priest,
  lewd_other_ge1m_magnate,
  lewd_other_ge500k_high_officer,
  lewd_other_ge500k_high_bar,
  lewd_other_ge500k_temple,
  lewd_other_ge500k_busybody,
  lewd_other_ge100k_gang,
  lewd_other_ge100k_brothel,
  lewd_other_ge100k_shady_bar,
  lewd_other_ge100k_casino,
  lewd_other_lt100k_bar,
  lewd_other_lt100k_beggar,
  lewd_other_lt100k_tentacle_hut,
  lewd_other_lt100k_toilet,
};

module.exports = { ROUTES, ENDINGS };
