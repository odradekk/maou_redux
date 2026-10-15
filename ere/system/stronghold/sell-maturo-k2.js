/**
 * @file 成熟奴隶出售后的宠物市场末路（issue #337/#797）。
 *
 * 末路文案合为一张表，按末路编号交给 sell_maturo_k2_branch 分发；售价由
 * 调用方传入，独立调用时用 estimate_chara 重算。CSTR 的家族角色下标 5 保存
 * 末路，TSTR 下标 30 是 VIDEO_MATURO 消费的录像标题暂存。
 *
 * 变量语义：MARK 下标 3 = 反抗刻印；CFLAG 下标 9 = 等级；ABL 下标
 * 2/3/15 = 私处/肛门感觉/话术；TALENT 下标 61/62/75-77/85 = 不怕污臭/
 * 反感污臭/性爱狂/淫乱/尻穴狂/爱慕；110/114/119/121/124 = 巨乳/爆乳/
 * 超乳/扶她/动物耳朵；136 = 牝犬；200-207 = 八类职业；314/315 = 种族/
 * 成为勇者前的生活。CFLAG 下标 605 = 压缩家族关系；CSTR 下标 5 =
 * 家人的末路记录。
 */

const era = require('#/era-electron');
const { estimate_chara } = require('#/system/stronghold/sale');
const { video_maturo } = require('#/system/stronghold/sell-video');
const { search_family } = require('#/chara/chara-family');
const { chara } = require('#/facade/chara');
const era_flag = require('#/era-utils/era-flag');
const { chara_callname, chara_name } = require('#/utils/callname-utils');

// 15 个末路文案合为一张表，按末路编号交给 sell_maturo_k2_branch 分发。
const K2_ENDINGS = {
  101: [
    '{name}今天也作为最高级牝犬饲养员在为让牝犬奴隶怀上幼犬而努力。',
    '看来她把怀上幼犬当做了至高的喜悦了，甚至买来了女奴隶来孕育幼犬。',
    '在畜舍里看着泣不成声的兽奸奴隶们和兽类做爱的样子，{name}自慰着时不时自己也参与着兽奸，就这么过着悠然自得的生活。',
  ],
  102: [
    '觉醒了兽爱性癖的{name}、成为了致力于让其他女人也觉醒兽爱性癖的牝犬训练员。',
    '买下来的女奴隶，只消一个来月就把她们变成了趴在地上腰抖不止的牝犬兽奸奴隶的样子。',
    '最终把世界变得谁在路边进行着牝犬交配都不是什么奇怪的事似乎是她的梦想……。',
  ],
  103: [
    '被土豪买下作为宠物的{name}、优雅的作为牝犬生活着。',
    '当有变态的客人时、必定要看她的交尾秀、来为宴会助兴的样子。',
    '之后更是在牝犬品评会上、多次获奖成为了让其他牝犬奴隶羡慕的榜样。',
  ],
  104: [
    '被土豪买下作为宠物的{name}、过上了淫乱的牝犬生活。',
    '当有变态的客人时、必定要她的自慰秀或是交尾秀来为宴会助兴。',
    '之后在牝犬品评会上、多次名列前茅成为了远近闻名的名犬。',
  ],
  51: [
    '{name}今天也作为魔族最高级母种犬孕育着幼犬。',
    '异种族的遗传因子交合而成的幼犬有着比魔犬更优秀的智能。',
    '完全无法想象它的母亲是这么一副露着高潮脸不断受孕着的毫无知性品性可言的模样……。',
  ],
  52: [
    '{name}、成为了在圆形剧场表演兽奸秀的牝犬女优。',
    '在无数观众的目光中、她伏在地上和犬或是山羊交尾着让他们兴奋不已。',
    '她的门票销量已经可以说是一票难求的样子……。',
  ],
  53: [
    '被女富豪买下作为宠物的{name}、过着淫行牝犬的生活。',
    '有施虐兴趣的女富豪对于{name}越来越堕落的模样感到很兴奋的样子。',
    '最近在路边时不时就让{name}开始交尾并被臭骂着她，看着这幅光景就十分开心的样子。',
  ],
  54: [
    '{name}被牝犬训练员作为模范牝犬买了下来。',
    '女调教师渐渐深入地将{name}调教成了牝犬奴隶。',
    '后来时不时会有以她们为主导乱交兽奸的样子。',
  ],
  11: [
    '{name}作为牝犬饲养员和同伴一起致力于让牝犬奴隶孕育幼犬。',
    '对于交尾既喜欢看也喜欢做的{name}和同伴的女调教师一起买了奴隶。',
    '每个月都会愉快的和同伴或是奴隶一起进行着乱交兽奸的样子。',
  ],
  12: [
    '觉醒了兽爱性癖的{name}、成为了致力于增加兽奸狂的牝犬训练员。',
    '买下女奴隶、深入地将兽爱传授给她们、并公开。',
    '最终创办起兽奸杂志似乎是她的梦想来着……。',
  ],
  13: [
    '作为女兽奸狂的朋友被买下来的{name}、过上了愉快的牝犬生活的样子。',
    '有着共同兴趣的主人和{name}很快就情投意合、开始同居了。',
    '不时亲密的把屁股并排着和大型犬一起发情……。',
  ],
  1: [
    '{name}被拥有知性的魔犬买了下来。',
    '他为了繁衍自己优秀的遗传因子、渴求着最棒的母体的样子。',
    '可惜的是预算似乎不太够、索性双方的身体相性十分的好的样子……。',
  ],
  2: [
    '{name}、成为了在小剧场表演兽奸秀的牝犬女优。',
    '在无数观众的目光中、她伏在地上和犬或是山羊交尾着让他们兴奋不已。',
    '为了让票的销量更好一些、开始和丑陋的奇珍异兽交尾了的样子……。',
  ],
  3: [
    '被变态作为宠物买下的{name}、过上了奇妙的性生活的样子。',
    '变态的奴隶主人似乎要看着{name}和大型犬交尾的姿态才会兴奋。',
    '看着自慰着的主人、心中五味杂陈的{name}高潮了。',
  ],
  4: [
    '{name}被拥有知性的魔犬买了下来。',
    '他为了繁衍自己优秀的遗传因子、渴求着最棒的母体的样子。',
    '可惜的是预算似乎不太够、但{name}淫乱的身体似乎能够满足他的样子……。',
  ],
};

/** sell_maturo_k2_branch：按末路编号分发 K2_ENDINGS 文案的统一入口。 */
async function sell_maturo_k2_branch(branch, cid = era_flag.target) {
  const name = chara_callname(cid);
  for (const line of K2_ENDINGS[branch]) {
    await era.printAndWait(line.replaceAll('{name}', name));
  }
  return 0;
}

function k2_route(price, sex_maniac, speech_level) {
  if (price >= 1_000_000) {
    if (sex_maniac) return ['魔界牝犬饲养员', 101, '最高级牝犬饲养员'];
    if (speech_level >= 5) return ['魔界牝犬训练员', 102, '最高级牝犬训练员'];
    return ['魔界土豪', 103, '最高级牝犬奴隶'];
  }
  if (price >= 500_000) {
    if (sex_maniac) return ['魔界牝犬饲养员', 51, '高级母种犬'];
    if (speech_level >= 5) return ['魔界圆形剧场', 52, '高级牝犬女优'];
    return ['魔界女富豪', 53, '高级牝犬奴隶'];
  }
  if (price >= 100_000) {
    if (sex_maniac) return ['魔界个体饲养员', 11, '牝犬饲养员'];
    if (speech_level >= 5) return ['魔界个体经营训练员', 12, '牝犬训练员'];
    return ['魔界女兽奸狂', 13, '牝犬奴隶'];
  }
  if (sex_maniac) return ['魔犬', 1, '魔犬新娘'];
  if (speech_level >= 5) return ['魔界小剧场', 2, '牝犬女优'];
  return ['魔界变态', 3, '牝犬'];
}

/** sell_maturo_k2：宠物市场的牝犬末路。 */
async function sell_maturo_k2(cid = era_flag.target, { price } = {}) {
  price ??= estimate_chara(cid).price;
  const name = chara_callname(cid);
  let buyer;
  let branch;
  let ending;

  if (era.get(`talent:${cid}:136`)) {
    price += 50_000;
    await era.printAndWait(`已经是牝犬的${name}可以多卖50000点。`);
    [buyer, branch, ending] = k2_route(
      price,
      era.get(`talent:${cid}:75`) === 1,
      era.get(`abl:${cid}:15`) || 0,
    );
  } else if (era.get(`talent:${cid}:76`)) {
    if (price >= 1_000_000)
      [buyer, branch, ending] = ['魔界土豪', 104, '高级牝犬'];
    else if (price >= 500_000)
      [buyer, branch, ending] = ['魔界牝犬饲养员', 51, '母种犬'];
    else [buyer, branch, ending] = ['魔犬', 1, '淫乱母犬'];
  } else if (price >= 1_000_000) {
    [buyer, branch, ending] = ['魔界土豪', 104, '高级牝犬'];
  } else if (price >= 500_000) {
    [buyer, branch, ending] = ['魔界牝犬训练员', 54, '滥交牝犬'];
  } else {
    [buyer, branch, ending] = ['魔界变态', 3, '牝犬'];
  }

  await era.printAndWait(`${buyer}买下${name}之后………`);
  await era.printAndWait('………');
  await era.printAndWait('……');
  await era.printAndWait('…');
  await sell_maturo_k2_branch(branch, cid);

  const family_id = search_family(cid);
  if (family_id >= 0) chara(family_id).event.家人末路 = `${ending}${name}`;
  era.set('tstr:30', `${ending}${name}`);
  await era.print('');
  await era.printAndWait(`就这样，${chara_name(0)}和${name}再也没有见面……`);
  await era.print('');
  video_maturo(cid);
  return 0;
}

module.exports = { sell_maturo_k2, sell_maturo_k2_branch };
