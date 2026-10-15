/**
 * @file 黑市反抗刻印末路（issue #338/#797）。
 *
 * 反抗刻印（MARK:3 == 3）：按魔族（TALENT:314 == 9）、非魔族与售价分成 4 个末路族。
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

/** rebel_matu_ge100k：反抗刻印 · 魔族 · 十万以上。 */
async function rebel_matu_ge100k(ctx) {
  const { rand_n, target_name } = ctx;
  let buyer = '';
  let route = 0;
  let ending = '';
  if (rand_n(2) == 0) {
    buyer = '魔界中央奴隶市场';
    route = 1;
  } else {
    buyer = '魔界中央奴隶市场';
    route = 0;
  }
  await era.printAndWait(`${target_name}被送到${buyer}………`);
  await era.printAndWait(`………`);
  await era.printAndWait(`……`);
  await era.printAndWait(`…`);

  if (route === 1) ending = await rebel_matu_ge100k_arena(ctx);
  else if (route === 0) ending = await rebel_matu_ge100k_captive(ctx);
  return ending;
}

/** rebel_matu_ge100k_arena：魔界中央奴隶市场买下；结局 角斗士 / 鲨鱼的食物。 */
async function rebel_matu_ge100k_arena({ cid, target_name }) {
  let ending = '';
  if (era.get(`cflag:${cid}:9`) >= 50) {
    await era.printAndWait(`${target_name}作为死斗场的角斗士在战斗着。`);
    await era.printAndWait(`貌似经历了许多相当严苛的死斗，依然活下来了。`);
    await era.printAndWait(
      `如果让主办者不尽兴的话，也许很快就会不明不白地死掉吧。`,
    );
    ending = '角斗士';
  } else {
    await era.printAndWait(
      `${target_name}在奴隶船上叫醒了其它奴隶，发动了叛乱。`,
    );
    await era.printAndWait(`但是起义却被其它的奴隶背叛，被轻易地镇压了。`);
    await era.printAndWait(`作为惩罚，貌似被丢海里喂鱼了……`);
    ending = '鲨鱼的食物';
  }
  return ending;
}

/** rebel_matu_ge100k_captive：魔界中央奴隶市场买下；结局 神殿的人柱 / 苦力奴隶。 */
async function rebel_matu_ge100k_captive({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:202`) == 1 || era.get(`talent:${cid}:206`) == 1) {
    await era.printAndWait(`被选为新落成的神殿的祭品。`);
    await era.printAndWait(
      `${target_name}被带来了。听说${target_name}以前是高明的圣职者，神官们都因此非常满意。`,
    );
    await era.printAndWait(
      `拿${target_name}做祭品的神殿，一定是了不起的神殿吧……`,
    );
    ending = '神殿的人柱';
  } else {
    await era.printAndWait(
      `作为原勇者的${target_name}，现在双手双脚都被锁链锁着，在港口做苦力。`,
    );
    await era.printAndWait(
      `时而展现出的反抗态度，告诉了人们背上伤痕累累的原因。`,
    );
    await era.printAndWait(`这种悲惨而痛苦的生活，应该一生都无法摆脱了……`);
    ending = '苦力奴隶';
  }
  return ending;
}

/** rebel_matu_lt100k：反抗刻印 · 魔族 · 十万以下。 */
async function rebel_matu_lt100k(ctx) {
  const { rand_n, target_name } = ctx;
  let buyer = '';
  let route = 0;
  let ending = '';
  if (rand_n(2) == 0) {
    buyer = '魔界地方奴隶市场';
    route = 1;
  } else {
    buyer = '魔界地方奴隶市场';
    route = 0;
  }
  await era.printAndWait(`${target_name}被送到${buyer}………`);
  await era.printAndWait(`………`);
  await era.printAndWait(`……`);
  await era.printAndWait(`…`);
  if (route === 1) ending = await rebel_matu_lt100k_runaway(ctx);
  else if (route === 0) ending = await rebel_matu_lt100k_butcher(ctx);
  return ending;
}

/** rebel_matu_lt100k_runaway：魔界地方奴隶市场买下；结局 瞎子奴隶 / 瘸子奴隶。 */
async function rebel_matu_lt100k_runaway({ rand_n, target_name }) {
  let ending = '';
  if (rand_n(2) == 0) {
    await era.printAndWait(
      `${target_name}在奴隶小屋准备转运奴隶的时候试图逃走。`,
    );
    await era.printAndWait(
      `当然，最后还是被抓回来了，${target_name}要因此被重罚。`,
    );
    await era.printAndWait(`双眼都被小刀挖掉了。`);
    era.setColor('#990000');
    await era.printAndWait(
      `「那位客人……来看看这个吧？双目失明不可能逃走哦！」`,
    );
    era.setColor();
    ending = '瞎子奴隶';
  } else {
    era.setColor('#990000');
    await era.printAndWait(
      `「知道逃脱的奴隶会怎么样吗？哎呀，即使不知道也马上会知道了哦！」`,
    );
    era.setColor();
    await era.printAndWait(
      `${target_name}在奴隶小屋准备转运奴隶的时候试图逃走。`,
    );
    await era.printAndWait(
      `当然，最后还是被抓回来了，${target_name}要因此接受惩罚。`,
    );
    await era.printAndWait(`右脚的脚跟被挑断了，其它奴隶看得心惊胆颤。`);
    era.setColor('#990000');
    await era.printAndWait(`「这样，以后都别想逃跑了…」`);
    era.setColor();
    ending = '瘸子奴隶';
  }
  return ending;
}

/** rebel_matu_lt100k_butcher：魔界地方奴隶市场买下；结局 肉品 / 生物标本。 */
async function rebel_matu_lt100k_butcher({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(
      `尚拥有反抗心的${target_name}在市场上引起暴动，把前来视察的地方领主的脸刮伤了。`,
    );
    await era.printAndWait(
      `本来只需要普通的鞭刑。但是，那位大人有另外的打算。`,
    );
    await era.printAndWait(
      `以恶毒性虐者而闻名的地方领主，将${she(cid)}买下带到肉联厂去了。`,
    );
    await era.printAndWait('');
    await era.printAndWait(`「你看，上等的肉哦？！看看这胸～」`);
    await era.printAndWait(
      `就这样，${target_name}的肉以一斤500点的价格在市面上出售了。`,
    );
    ending = '肉品';
  } else {
    era.setColor('#990000');
    await era.printAndWait(
      `「知道逃脱的奴隶会怎么样吗？哎呀，即使不知道也马上会知道了哦！」`,
    );
    era.setColor();
    await era.printAndWait(
      `逃走失败的${target_name}被绑在手术台上，看来马上要进行什么变态的改造。`,
    );
    await era.printAndWait(`数小时后，${she(cid)}的手脚都被截肢，弄成人棍了。`);
    await era.printAndWait(`猎奇收藏家觉得不错，马上把${she(cid)}买走了……`);
    ending = '生物标本';
  }
  return ending;
}

/** rebel_other_ge100k：反抗刻印 · 非魔族 · 十万以上。 */
async function rebel_other_ge100k(ctx) {
  const { cid, target_name } = ctx;
  let buyer = '';
  let route = 0;
  let ending = '';
  if (era.get(`talent:${cid}:314`) == 5) {
    buyer = '魔界中央奴隶市场';
    route = 2;
  } else if (
    era.get(`talent:${cid}:200`) == 1 ||
    era.get(`talent:${cid}:203`) == 1
  ) {
    buyer = '魔界中央奴隶市场';
    route = 1;
  } else {
    buyer = '魔界中央奴隶市场';
    route = 0;
  }
  await era.printAndWait(`${target_name}被送到${buyer}………`);
  await era.printAndWait(`………`);
  await era.printAndWait(`……`);
  await era.printAndWait(`…`);

  if (route === 2) ending = await rebel_other_ge100k_taxidermy(ctx);
  else if (route === 1) ending = await rebel_other_ge100k_arena(ctx);
  else if (route === 0) ending = await rebel_other_ge100k_captive(ctx);
  return ending;
}

/** rebel_other_ge100k_taxidermy：魔界中央奴隶市场买下；结局 标本。 */
async function rebel_other_ge100k_taxidermy({ target_name }) {
  let ending = '';
  era.setColor('#990000');
  await era.printAndWait(
    `「客人客人！过来看过来挑啊！这里可是有好东西哦！？」`,
  );
  era.setColor();
  await era.printAndWait(`被叫住的客人是和贩子相熟的商人，被引入帐篷里了。`);
  await era.printAndWait(
    `一进去，就看到了张牙舞爪，振翅挺胸随时可以高飞似得龙族女孩。`,
  );
  await era.printAndWait(
    `不过${target_name}的眼神里，却没有生命的灵光，因为已经是个标本了。`,
  );
  era.setColor('#990000');
  await era.printAndWait(
    `「我和你熟才告诉你啊～这孩子咬舌自尽了！就这么讨厌当奴隶么……」`,
  );
  era.setColor();
  ending = '标本';
  return ending;
}

/** rebel_other_ge100k_arena：魔界中央奴隶市场买下；结局 角斗士。 */
async function rebel_other_ge100k_arena({ cid, target_name }) {
  let ending = '';
  await era.printAndWait(`${target_name}作为死斗场的角斗士在战斗着。`);

  if (era.get(`cflag:${cid}:9`) >= 100) {
    await era.printAndWait(`和其它角斗士一起发动了叛乱，最后被镇压了。`);
    await era.printAndWait(`作为主谋的${target_name}一直行踪不明，无法处置。`);
    await era.printAndWait(`而其它在叛乱中被生擒的角斗士，全部拿去喂猛兽了。`);
  } else {
    await era.printAndWait(`和其它角斗士一起发动了叛乱，最后被镇压了。`);
    await era.printAndWait(`作为主谋的${target_name}要因此接受惩罚。`);
    await era.printAndWait(`成为了死斗场中冠军猛兽的食物。`);
  }
  ending = '角斗士';
  return ending;
}

/** rebel_other_ge100k_captive：魔界中央奴隶市场买下；结局 神殿的人柱 / 划桨奴隶。 */
async function rebel_other_ge100k_captive({ cid, target_name }) {
  let ending = '';
  if (era.get(`talent:${cid}:202`) == 1 || era.get(`talent:${cid}:206`) == 1) {
    await era.printAndWait(`被选为新落成的神殿的祭品。`);
    await era.printAndWait(
      `${target_name}被带来了。听说${target_name}以前是高明的圣职者，神官们都非常满意。`,
    );
    await era.printAndWait(
      `拿${target_name}做祭品的神殿，一定是了不起的神殿了吧……`,
    );
    ending = '神殿的人柱';
  } else {
    await era.printAndWait(`作为船底仓的划桨奴隶，被锁在桨上。`);
    await era.printAndWait(`一天，船遇到了风浪，沉没了。`);
    await era.printAndWait(`在那之后，就再也没有听到${target_name}的消息。`);
    ending = '划桨奴隶';
  }
  return ending;
}

/** rebel_other_lt100k：反抗刻印 · 非魔族 · 十万以下。 */
async function rebel_other_lt100k(ctx) {
  const { rand_n, target_name } = ctx;
  let buyer = '';
  let route = 0;
  let ending = '';
  if (rand_n(2) == 0) {
    buyer = '魔界地方奴隶市场';
    route = 1;
  } else {
    buyer = '魔界地方奴隶市场';
    route = 0;
  }
  await era.printAndWait(`${target_name}被送到${buyer}………`);
  await era.printAndWait(`………`);
  await era.printAndWait(`……`);
  await era.printAndWait(`…`);
  if (route === 1) ending = await rebel_other_lt100k_furniture(ctx);
  else if (route === 0) ending = await rebel_other_lt100k_butcher(ctx);
  return ending;
}

/** rebel_other_lt100k_furniture：魔界地方奴隶市场买下；结局 活着的桌子 / 活着的椅子。 */
async function rebel_other_lt100k_furniture({ cid, rand_n, target_name }) {
  let ending = '';
  if (rand_n(2) == 0) {
    era.setColor('#990000');
    await era.printAndWait(`「哈哈～像你这种沉默不语的最可爱了！」`);
    era.setColor();
    await era.printAndWait(`即将对${target_name}进行手术的男人笑着说。`);
    await era.printAndWait(
      `${she(cid)}的手肘及膝盖以下都被切除，换成金属的替代品。`,
    );
    await era.printAndWait(`完全没有听到任何的抗议，因为舌头已经被拔掉了。`);
    era.setColor('#990000');
    await era.printAndWait(`「呃呃，这张桌子，应该能卖个好价钱………」`);
    era.setColor();
    ending = '活着的桌子';
  } else {
    era.setColor('#990000');
    await era.printAndWait(`「哈哈～像你这种沉默不语的最可爱了！」`);
    era.setColor();
    await era.printAndWait(`即将为${target_name}进行手术的男人笑着说。`);
    await era.printAndWait(
      `${she(cid)}的四肢被齐根切除，以人棍的模样被做成了人肉椅子。`,
    );
    await era.printAndWait(
      `舌头也被拔掉了，手脚则作为椅子的装饰被粘合在椅子上。`,
    );
    era.setColor('#990000');
    await era.printAndWait(`「呃呃，这张椅子，应该能卖个好价钱………」`);
    era.setColor();
    ending = '活着的椅子';
  }
  return ending;
}

/** rebel_other_lt100k_butcher：魔界地方奴隶市场买下；结局 肉品 / 生物标本。 */
async function rebel_other_lt100k_butcher({ cid, target_name }) {
  let ending = '';
  if (
    era.get(`talent:${cid}:110`) == 1 ||
    era.get(`talent:${cid}:114`) == 1 ||
    era.get(`talent:${cid}:119`) == 1
  ) {
    await era.printAndWait(
      `尚拥有反抗心的${target_name}在市场上引起暴动，把前来视察的地方领主的脸刮伤了。`,
    );
    await era.printAndWait(
      `本来只需要普通的鞭刑，但是，那位大人有另外的打算。`,
    );
    await era.printAndWait(
      `以恶毒性虐者而闻名的地方领主，将${she(cid)}买下带到肉联厂去了。`,
    );
    await era.printAndWait('');
    await era.printAndWait(`「你看，上等的肉哦？！看看这胸～」`);
    await era.printAndWait(
      `就这样${target_name}的肉以一斤500点的价格在市面上出售了。`,
    );
    ending = '肉品';
  } else {
    era.setColor('#990000');
    await era.printAndWait(
      `「知道逃脱的奴隶会怎么样吗？哎呀，即使不知道也马上会知道了哦」`,
    );
    era.setColor();
    await era.printAndWait(
      `逃走失败的${target_name}被绑在手术台上，看来马上要进行什么变态的改造。`,
    );
    await era.printAndWait(`数小时后，${she(cid)}的手脚都被截肢，弄成人棍了。`);
    await era.printAndWait(`猎奇收藏家觉得不错，马上把${she(cid)}买走了……`);
    ending = '生物标本';
  }
  return ending;
}

/** 末路族表：k0_route 给出的编号 → 该族的买家选择与末路分派函数。 */
const ROUTES = {
  rebel_matu_ge100k,
  rebel_matu_lt100k,
  rebel_other_ge100k,
  rebel_other_lt100k,
};

/** 正文表：末路编号 → 输出该末路正文并返回结局名的函数。 */
const ENDINGS = {
  rebel_matu_ge100k_arena,
  rebel_matu_ge100k_captive,
  rebel_matu_lt100k_runaway,
  rebel_matu_lt100k_butcher,
  rebel_other_ge100k_taxidermy,
  rebel_other_ge100k_arena,
  rebel_other_ge100k_captive,
  rebel_other_lt100k_furniture,
  rebel_other_lt100k_butcher,
};

module.exports = { ROUTES, ENDINGS };
