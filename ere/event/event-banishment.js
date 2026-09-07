/**
 * @file 流放处刑（issue #348）。
 *
 * 源: target/ERB/處刑相關/BANISHMENT.ERB  @BANISHMENT（:2-949）
 */

'use strict';

const era = require('#/era-electron');
const {
  family_bits,
  former_life_fate,
} = require('#/event/event-banishment-fate');
const {
  apply_prestige,
  archive_fate,
  dispose_character,
  get,
  she,
} = require('#/event/event-execution-common');
const { search_family } = require('#/chara/chara-family');
const {
  banishment_koujo_family,
  kojo_handler_id,
} = require('#/kojo/kojo-system');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const era_flag = require('#/era-utils/era-flag');
const { chara_callname } = require('#/utils/callname-utils');

// 数字槽语义：TALENT:46/85/121/122/204/220 = 药瘾/爱慕/扶她/男人/
// 肉便器/精英；244–247 = 恶魔外观；314–320 = 种族、前生活、成为勇者的
// 契机、喜好、阴茎状态及家族构成。ABL:3/11/13/17/21/22/32/39 = 肛门
// 感觉/欲望/侍奉技术/露出癖/抖M/百合/精液中毒/兽奸中毒；EXP:56/70/74
// = 兽奸/拍摄/卖淫经验。其余 TALENT 数字是原作分支直接判定的素质位。
function default_rand(n) {
  return Math.floor(Math.random() * n);
}

function has(cid, family, index) {
  return get(`${family}:${cid}:${index}`) !== 0;
}

async function printw(text) {
  await era.printAndWait(text);
}

function family_words(bits, kind) {
  const { sister, brother, younger_sister, younger_brother } = bits;
  const mask = [sister, brother, younger_sister, younger_brother]
    .map((value) => (value > 0 ? 1 : 0))
    .join('');
  const table = {
    all: {
      1111: '兄弟姐妹',
      1110: '哥哥和姐妹',
      1101: '哥哥和姐弟',
      1011: '姐妹和弟弟',
      '0111': '兄弟和妹妹',
      1100: '哥哥和姐姐',
      1010: '姐姐和妹妹',
      1001: '姐姐和弟弟',
      '0110': '哥哥和妹妹',
      '0101': '哥哥和弟弟',
      '0011': '妹妹和弟弟',
      1000: '姐姐',
      '0100': '哥哥',
      '0010': '妹妹',
      '0001': '弟弟',
      '0000': '父亲和母亲',
    },
    loved: {
      1111: '被自己兄弟姐妹喜爱的',
      1110: '被哥哥和姐妹喜爱的',
      1101: '被哥哥和姐弟喜爱的',
      1011: '被姐妹和弟弟喜爱的',
      '0111': '被兄弟和妹妹喜爱的',
      1100: '被哥哥和姐姐宠爱的',
      1010: '被姐姐和妹妹喜爱的',
      1001: '被姐姐和弟弟喜爱的',
      '0110': '被哥哥和妹妹喜爱的',
      '0101': '被哥哥和弟弟喜爱的',
      '0011': '被妹妹和弟弟景仰的',
      1000: '被姐姐宠爱的',
      '0100': '被哥哥宠爱的',
      '0010': '被妹妹景仰的',
      '0001': '被弟弟景仰的',
      '0000': '被父母宠爱的',
    },
    theme: {
      1111: '主题是近亲乱伦的',
      1110: '主题是近亲乱伦的',
      1101: '主题是近亲乱伦的',
      1011: '主题是近亲乱伦的',
      '0111': '主题是近亲乱伦的',
      1100: '主题是兄妹乱伦的',
      1010: '主题是姐妹百合的',
      1001: '主题是姐弟乱伦的',
      '0110': '主题是兄妹乱伦的',
      '0101': '主题是兄弟搞基的',
      '0011': '主题是兄妹乱伦的',
      1000: '主题是恋物癖的',
      '0100': '百合的',
      '0010': '主题是抖M被狠狠调教的',
      '0001': '百合的',
      '0000': '主题是滥交夫妇的',
    },
    act: {
      1111: '和兄弟姐妹们一起，激烈地交媾着……',
      1110: '和姐妹们一同趴在哥哥的面前，摇晃着饥渴的臀部，乞求着哥哥的大肉棒……',
      1101: '在哥哥和姐姐面前含弄着弟弟的肉棒……',
      1011: '和姐妹们一起侵犯青涩的弟弟……',
      '0111': '在弟弟妹妹的注视下和哥哥一起高潮……',
      1100: '和姐姐一起趴在哥哥的面前，摇晃着饥渴的臀部，乞求着哥哥的大肉棒……',
      1010: '和姐妹一起高潮……',
      1001: '和姐姐一起侵犯青涩的弟弟……',
      '0110':
        '和妹妹一起趴在哥哥的面前，摇晃着饥渴的臀部，乞求着哥哥的大肉棒……',
      '0101': '被兄弟分别从前后一起插入……',
      '0011': '和妹妹一起侵犯青涩的弟弟……',
      1000: '和姐姐交缠着……',
      '0100': '被哥哥激烈地侵犯……',
      '0010': '和妹妹交缠着……',
      '0001': '侵犯青涩的弟弟……',
      '0000':
        '和母亲一起趴在父亲的面前，摇晃着饥渴的臀部，乞求着父亲的大肉棒……',
    },
  };
  return table[kind][mask];
}

async function ordinary_fate(cid) {
  const name = chara_callname(cid);
  const man = has(cid, 'talent', 122);
  if ([244, 245, 246, 247].some((id) => has(cid, 'talent', id))) {
    await printw(
      `${name}被附近的村民捕获，空有恶魔般的外表，只能当观赏物在马戏团中渡过余生……`,
    );
    return '玩物';
  }
  if (has(cid, 'talent', 204)) {
    await printw(
      `早已沦为肉便器的${name}如今浓妆艳抹，到处派送写着个人联系方式和真名的宣传单。`,
    );
    await printw('每天都在水晶球前，努力地扭动腰肢呢……');
    if ([75, 76, 31].some((id) => has(cid, 'talent', id))) {
      await printw(
        man
          ? `因为${name}毫无节操的性爱准则，“公开滥交男”的名头在视频界已经变得非常响亮了呢……`
          : `因为${name}“是个男的就行”的性爱准则，“公开滥交女”的名头在视频界已经变得非常响亮了呢……`,
      );
      return has(cid, 'talent', 122) ? '性爱变态' : '淫娃荡妇';
    }
    if (has(cid, 'abl', 39) || get(`talent:${cid}:317`) === 12) {
      await printw(
        `由于只拍摄兽奸视频，${name}“只艹动物”的名头已经变得非常响亮了呢……`,
      );
      return '动物爱好者';
    }
    if (has(cid, 'talent', 121) && get(`talent:${cid}:318`) === 1) {
      await printw(
        `${name}作为扶她女优，却总是喜欢在视频中炫耀自己巨大阴茎。不过这种行为也让她变得非常出名。`,
      );
      return '行行行，你JB大你先射';
    }
    if (has(cid, 'talent', 121) && get(`talent:${cid}:318`) === 2) {
      await printw(
        `扶她化的${name}非常出名，因为总是在水晶球视频中露出自己的短小包茎还总是射得一塌糊涂。`,
      );
      return '六郎';
    }
    if (has(cid, 'talent', 121)) {
      await printw(
        `身为扶他的${name}喜欢只和女性交往，还总将性爱过程拍摄下来。因为精力持久，那超长马拉松般的性爱视频饱受热议。`,
      );
      return '雌性种马';
    }
    if (has(cid, 'abl', 22)) {
      await printw(`${name}因为总是拍摄激烈的女同性爱视频变得非常有名。`);
      return '妖艳百合';
    }
    if (has(cid, 'talent', 104) || has(cid, 'talent', 232)) {
      await printw(
        `因为总是喜欢把1:1大小的巨龙阳具按摩棒塞进阴道，${name}的水晶球视频在绅士群体中非常畅销……`,
      );
      return '阴道扩张女优';
    }
    if (has(cid, 'talent', 106) || has(cid, 'talent', 233)) {
      await printw(
        `由于喜欢使用巨型带拖网肛门按摩棒的变态行为，${name}的水晶球视频在绅士群体中非常畅销……`,
      );
      return has(cid, 'talent', 122) ? '肛门扩张男优' : '肛门扩张女优';
    }
    if (
      (has(cid, 'talent', 102) || has(cid, 'talent', 230)) &&
      !has(cid, 'talent', 122)
    ) {
      await printw(
        `由于${name}那极端肥大化的阴蒂，视频在绅士群体中一直很畅销……`,
      );
      return '阴蒂肥大女优';
    }
    if (has(cid, 'talent', 108) || has(cid, 'talent', 231)) {
      await printw(
        `因为${name}那极端肥大化的乳头，视频在绅士群体中一直很畅销……`,
      );
      return has(cid, 'talent', 122) ? '乳头开发男优' : '乳头开发女优';
    }
    if (get(`abl:${cid}:17`) > 0) {
      await printw(`${name}因为热衷于野外暴露下体的性爱视频而远近闻名……`);
      return '野战';
    }
    if (get(`abl:${cid}:21`) > 0) {
      await printw(
        `因为嗜好被各种调教的被虐狂，${name}在水晶球前的奴隶姿态成为了热议话题。`,
      );
      return has(cid, 'talent', 122) ? '抖M男优' : '抖M女优';
    }
    if (has(cid, 'talent', 60) || has(cid, 'talent', 74)) {
      await printw(
        `呐，你知道黑猩猩每天都要自慰八个小时，而且每次都会绝顶吗？嗯，${name}在视频里也一样。`,
      );
      return has(cid, 'talent', 122) ? '自慰男优' : '自慰女优';
    }
    if (get(`talent:${cid}:317`) === 13) {
      await printw(
        `由于${name}热衷于在各种性器官上穿环的变态行为，成为了知名的肉体改造发烧友。`,
      );
      return '肉体改造发烧友';
    }
    if (has(cid, 'talent', 57)) {
      await printw(
        `${name}因为热衷于在野外和各种没人的地方排便，水晶球视频广受各大漏尿癖爱好者的好评。`,
      );
      return man ? '野外放尿男优' : '野外放尿女优';
    }
    if (has(cid, 'talent', 48)) {
      await printw(
        `因为${name}在视频中总是带着眼镜的呆萌表情，身体却又极度淫荡的强烈反差而出名了。`,
      );
      return man ? '眼镜男优' : '眼镜女优';
    }
    if (get(`talent:${cid}:314`) === 1) {
      await printw(`${name}作为“那个在视频里总是喜欢艹橡树的变态精灵”出名了。`);
      return man ? '恋物癖男优' : '恋物癖女优';
    }
    if (has(cid, 'talent', 0)) {
      await printw(
        `身为知名的尻穴便器，${name}的小穴一直保持着默默无闻未经开发的状态，但是她那已经扩张到极限的肛门却截然相反，每天都热闹得很呐……`,
      );
      return '尻穴便器女优';
    }
    await printw(
      man
        ? `${name}因为在街上变态的痴汉行为而出名。`
        : `${name}因为在街上变态的痴女行为而出名。`,
    );
    return man ? '痴汉男优' : '痴女女优';
  }

  if (has(cid, 'talent', 46)) {
    await printw(
      `之后，已经上瘾的${name}屈服于欲望之下，变成了一个只要给${she(cid)}药物便会张开双腿的娼妓……`,
    );
    return '药物中毒的娼妓';
  }
  if ([3, 18].includes(get(`talent:${cid}:316`))) {
    await printw(
      `曾经的信仰被唾弃，${name}开始寻找新的精神寄托。终于，在新兴宗教信徒的淫乱性爱派对中，${she(cid)}似乎找到了归宿……`,
    );
    return '新兴宗教的信者';
  }
  if ([4, 11].includes(get(`talent:${cid}:317`))) {
    await printw(
      `${name}经历了漫长的旅途后终于回到了故乡。看着曾经的爱人与其伴侣相对微笑的场景，${she(cid)}又默默地消失在黑暗中……`,
    );
    return '下落不明';
  }
  if (get(`talent:${cid}:316`) === 7) {
    await printw(
      `当初为了拯救大家的${name}回到故乡，看着已经荒芜落败的村庄，被已经成为奴隶的原村人捕获，成为大家公用的泄欲肉便器，还被迫挂着一块木牌，上面刻着“对不起”……`,
    );
    return '慰安用肉便器';
  }
  if (get(`talent:${cid}:315`) === 8) {
    const bits = family_bits(cid);
    await printw(
      `身为原贵族的${name}回到家乡后得知，自己的家族早已没落。${bits.sister && bits.younger_sister ? `${name}原本身为美丽贵妇的姐妹们、如今只能在妓院卖淫为生。` : bits.sister ? `${name}原本身为美丽贵妇的姐姐、如今只能在妓院卖淫为生。` : bits.younger_sister ? `${name}原本身为美丽贵妇的妹妹、如今只能在妓院卖淫为生。` : ''}而成为娼妓的${name}如今，被当初自己所看不起的低等市民日夜奸淫着……`,
    );
    return '高级娼妓';
  }
  if (get(`talent:${cid}:316`) === 2) {
    await printw(
      `曾经身为勇者的${name}当初为了冒险，欠下了一大笔债。如今被债务人找上，为了还清债务舍弃了最后的尊严开始工作；如今身为变态性癖富豪的玩物，只要主人命令，连大便都要含笑吞下呢……`,
    );
    return '下等娼妓';
  }
  if (get(`talent:${cid}:317`) === 8) {
    const bits = family_bits(cid);
    await printw(
      `${family_words(bits, 'loved')}${name}回到家乡，发现自己的家庭早已债台高筑、支离破碎。${name}的${family_words(bits, 'all')}为了偿还欠债，出演了一部${family_words(bits, 'theme')}水晶球色情视频，${name}自己也加入了进去，${family_words(bits, 'act')}感觉自己所有关于家庭的美好回忆都崩坏了……`,
    );
    return man ? '乱伦男忧' : '乱伦女忧';
  }
  if (get(`abl:${cid}:39`) > 0) {
    await printw(`没多久，${name}在草丛中和流浪野狗交尾的身姿被人发现……`);
    return has(cid, 'talent', 122) ? '兽奸变态' : '变态兽奸女';
  }
  if (get(`abl:${cid}:32`) > 0) {
    await printw(
      `没多久，某处公共厕所里五花八门的涂鸦中，混杂着出现了${name}的名字和联系方式。「好想喝乳白色的“果汁”。等你联络哟？？」`,
    );
    return '精液便器';
  }
  if (get(`abl:${cid}:17`) > 0) {
    await printw(
      `一段时间后，有人发现了${name}趁着夜色在街道上全裸自慰的身影，成为了这条街上有名的痴${man ? '汉' : '女'}。`,
    );
    return '露出狂';
  }
  if (get(`abl:${cid}:21`) > 0) {
    await printw(
      `一段时间后，${name}以大众情妇的身份出现在盗贼团中，被当成受虐母猪一样对待依然乐此不疲……`,
    );
    return '口交母猪';
  }
  if (has(cid, 'talent', 60) || has(cid, 'talent', 74)) {
    await printw(
      `之后，表面上恢复正常工作的${name}，暗地里早已沦为手淫的官能奴隶；薪水全部花在官能小说和猥亵的性玩具上，每天都在卖力地搓弄着下体……`,
    );
    return '自慰狂';
  }
  if (has(cid, 'talent', 121) && get(`talent:${cid}:318`) === 2) {
    await printw(
      `身为扶她的${name}因为自己的短小包茎无法满足女性，只能靠看水晶球里的色情影片来发泄因为扶她化而产生的、对女性肉体的饥渴……`,
    );
    return '扶她色情狂';
  }
  if (has(cid, 'talent', 121)) {
    await printw(
      `扶她化的${name}每天收工后都会光顾街道上的便宜妓院，发泄着因为扶她化而产生的、对女性肉体的饥渴……`,
    );
    return '扶她嫖客';
  }
  if (has(cid, 'talent', 273)) {
    await printw(
      `无法支付解除私处封印的高昂费用，${name}只好成为了专门提供肛交服务的妓女；肛交的嫖资非常低廉，${name}在妓院的盘剥下苦苦挣扎、日益沦陷……`,
    );
    return '肮脏的屁眼交易';
  }
  const favorite = get(`talent:${cid}:317`);
  if (favorite === 3) {
    await printw(
      `喜欢唱歌的${name}决定以歌手的身份工作养活自己。可是没人喜欢${name}的歌，最近已经沦为便宜画家的裸体模特……`,
    );
    return '不入流的歌手';
  }
  if (favorite === 6) {
    await printw(
      `喜欢跳舞的${name}决定以舞者的身份工作养活自己。可是没人喜欢${name}的舞蹈，跳舞时的服装越来越少，最近只剩一根丝带挂在身上了……`,
    );
    return '不入流的舞者';
  }
  if (favorite === 7) {
    await printw(
      `喜欢绘画的${name}决定靠卖自己的裸体画挣钱养活自己。可是没人喜欢${name}的作品，最近画作的主题已经逐渐变成男女的交媾……`,
    );
    return '不入流的画家';
  }
  if (favorite === 18) {
    await printw(
      `喜欢小说的${name}决定以官能小说家的身份工作养活自己。可是没人喜欢${name}的文风，最近小说描写的细节越来越变态……`,
    );
    return '不入流的小说家';
  }
  const former = get(`talent:${cid}:315`);
  if (former === 5) {
    await printw(`${name}又回到了过去卖淫的生活中，站在街头招揽生意……`);
    return '娼妓';
  }
  if (former === 7) {
    await printw(`${name}又回到了过去乞丐的生活中，蹲在街角乞讨……`);
    return '乞丐';
  }
  if (former === 9) {
    await printw(`${name}又回到了过去贫民的生活中，继续居住在破烂的草棚子里……`);
    return '贫民';
  }
  await printw(`此后${name}的行踪也逐渐消失了……`);
  return '下落不明';
}

async function narrate_former_life(cid) {
  const name = chara_callname(cid);
  const man = has(cid, 'talent', 122);
  switch (get(`talent:${cid}:315`)) {
    case 0:
      await printw(`之后，${name}的下落不明……`);
      return;
    case 1:
      if (has(cid, 'talent', 204))
        await printw(`已经沦为肉便器的${name}成为学校里有名的荡妇。`);
      if (has(cid, 'talent', 48))
        await printw(`朴素的眼镜看上去颇有学霸的潜力。`);
      if (has(cid, 'talent', 180))
        await printw(`放学后，${name}靠援交挣钱养活自己。`);
      await printw(`总之，${name}以学生的身份，尽情“享受”着生活。`);
      return;
    case 2:
      if (get(`abl:${cid}:13`) > 0 || has(cid, 'talent', 52))
        await printw(
          `${name}十分享受被舔弄阴茎时少年神官那愉悦和苦闷并存的神情。`,
        );
      if (get(`abl:${cid}:3`) > 0 || has(cid, 'talent', 106))
        await printw(
          `${name}因为无法抗拒尻穴性交的背德感，偷偷地进行着尻穴买春的行为。`,
        );
      await printw(`总之，${name}仍在主持着神殿的日常工作，请多多关照哦。`);
      return;
    case 3:
      if (has(cid, 'talent', 13))
        await printw(
          `${name}坦然面对自己的过去，与同样职业的农民结婚后，每日下地辛勤地耕作。`,
        );
      if (get(`exp:${cid}:56`) >= 5)
        await printw(
          `似乎${name}无法忘却那些交尾的经验，他们家农耕用的家畜似乎都很活跃呢……`,
        );
      await printw(`总之，${name}成为了一名农民，过着平凡的生活。`);
      return;
    case 4:
      if (has(cid, 'talent', 13))
        await printw(
          `${name}坦然面对自己的过去，努力工作，修补渔网的工作越来越得心应手。`,
        );
      if (get(`exp:${cid}:74`) >= 5)
        await printw(
          `偶尔有商船停泊${name}所在的渔村时，${she(cid)}也会张开双腿挣点外快。`,
        );
      await printw(`总之，${name}成为了一名渔夫，过着平凡的生活。`);
      return;
    case 5:
      if (get(`abl:${cid}:21`) > 0)
        await printw(`身为抖M的${name}手活不错，在店里很受欢迎。`);
      if (get(`abl:${cid}:17`) > 0 || has(cid, 'talent', 28))
        await printw(
          `${name}喜欢在公开场合卖淫做爱取乐，反而要向围观群众收票钱……`,
        );
      await printw(`总之，${name}又回到了之前的卖淫生涯。`);
      return;
    case 6:
      if (
        get(`abl:${cid}:22`) > 0 ||
        has(cid, 'talent', 81) ||
        has(cid, 'talent', 82)
      )
        await printw(
          `${name}热衷于专门诱拐女性卖淫犯罪。只是每一位受害人都被${she(cid)}先上过……`,
        );
      await printw(`于是，${name}再次沦为社会底层的犯罪分子。`);
      return;
    case 7:
      if (has(cid, 'talent', 180))
        await printw(
          `不久后传来消息，${name}已经沦为最底层的站街女，付多付少都给上。`,
        );
      await printw(`${name}再次成为社会底层的廉价娼妇。`);
      return;
    case 8:
      await printw(`身为原贵族的${name}回到家族，过着和之前一样的生活。`);
      if (
        get(`abl:${cid}:11`) > 0 ||
        has(cid, 'talent', 102) ||
        has(cid, 'talent', 60)
      )
        await printw(
          `但${name}无法压抑甜美的欲望，经常躲在房间里不可抑制地疯狂手淫。`,
        );
      await printw(`总之，${name}又回到了贵族社交圈之中。`);
      return;
    case 9:
      if (get(`exp:${cid}:70`) >= 5)
        await printw(
          `因为曾经拍摄的水晶球视频流出，${name}回到贫民区后，邻居的男性都蜂拥而至……`,
        );
      await printw(`总之，${name}回到了贫民的生活中。`);
      return;
    case 10:
      if (get(`abl:${cid}:17`) > 0 || has(cid, 'talent', 28))
        await printw(
          `${name}十分享受那些躲在周围阴暗处偷窥的淫秽目光，毕竟“全裸的守墓人”听上去就很刺激啊……`,
        );
      await printw(`总之，${name}继续${she(cid)}守墓人的生涯。`);
      return;
    case 11:
      if (get(`abl:${cid}:3`) > 0 || has(cid, 'talent', 106))
        await printw(
          `回到神殿的${name}难以抵抗自己的欲望，偷偷进行着肛交卖淫的事业，明知这是肮脏的背德交易，却依旧乐此不疲……`,
        );
      await printw(`总之，${name}开始继续着神殿的日常工作了。`);
      return;
    case 12:
    case 13:
      if (get(`abl:${cid}:13`) > 0 || has(cid, 'talent', 52))
        await printw(
          `回到神殿的${name}很是享受自己的日常生活，尤其是舔弄那些少年神官的肉棒时，他们脸上苦闷和愉悦混杂的表情。`,
        );
      await printw(`总之，${name}开始继续着神殿的日常工作了。`);
      return;
    case 14:
      if (get(`abl:${cid}:11`) > 0 || has(cid, 'talent', 36))
        await printw(
          `被放逐的${name}回到故地，继续${she(cid)}的占卜事业，并在其中加入了性骚扰的元素，时常让前来占卜的顾客面红耳赤……`,
        );
      await printw(`于是，街头巷尾都流传着关于“变态色情占卜师”${name}的故事……`);
      return;
    case 15:
      if (has(cid, 'talent', 204))
        await printw(
          `身为肉便器的${name}回到家乡继续经营之前的商店，只是商店似乎多了不少让男性顾客趋之若鹜的可疑“副业”。`,
        );
      await printw(
        `“今天，你进去了么？”凡是路过${name}商店的男客人都会露出会心的笑容……`,
      );
      return;
    case 16:
      if (get(`abl:${cid}:17`) > 0 || has(cid, 'talent', 28))
        await printw(
          `回到曾经居住的村庄后，${name}喜欢独自一人时在森林中脱光衣服，享受着森林浴带来的奇妙感觉……`,
        );
      await printw(`看来${name}打算在那个寂静的村庄中渡过余生。`);
      return;
    case 17:
      if (get(`abl:${cid}:17`) > 0 || has(cid, 'talent', 28))
        await printw(
          `虽然${name}依旧不常露面，但是市面上${she(cid)}主演的水晶球视频却偷偷发售了……`,
        );
      await printw(`总之，${name}又回到了之前的隐居生活。`);
      return;
    case 18:
      if (has(cid, 'talent', 204))
        await printw(
          `身为肉便器的${name}回到家乡继续经营之前的面包店，只是店里似乎多了不少让男性顾客趋之若鹜的可疑“副业”。`,
        );
      await printw(
        `“太可疑了，为什么顾客都去${name}的店里买面包？！”竞争对手偷偷地讨论着。`,
      );
      return;
    case 19:
      if (get(`exp:${cid}:70`) >= 5)
        await printw(
          `然而在军队内部，${name}的水晶球视频已经流传甚广，军营中已经开始出现奇怪的流言……`,
        );
      await printw(`归队的${name}从军之路看来并不会很顺利呐。`);
      return;
    case 20:
      if (has(cid, 'talent', 143) || has(cid, 'talent', 13))
        await printw(
          `几经倒卖的${name}像商品一样被转手给了某位性格温柔的少年主人，新主人似乎很重视${she(cid)}。`,
        );
      await printw(`被放逐的${name}又回到了之前的奴隶生涯。`);
      return;
    case 21:
      if (get(`exp:${cid}:56`) >= 5)
        await printw(
          `${name}最近新买了一只宠物犬。只是每次${name}看着狗狗的眼神中总是充满了情欲。`,
        );
      await printw(
        `面对自己过往、毫不知情的${man ? '伴侣' : '丈夫'}，${name}又回到了之前平静的${man ? '主夫' : '主妇'}生活。`,
      );
      return;
    default:
      await printw(`在此之后，${name}下落不明了……`);
  }
}

async function animal_fate(cid, rand_n) {
  const animals = [
    ['一匹马', 'My little Pony！'],
    ['一条狗', '汪？'],
    ['一只小鸟', '吱？'],
    ['一只兔子', '颤抖的双耳'],
    ['一只羊', '羊……'],
    ['一只狐狸', '狐狸'],
  ];
  let selected;
  // ELSEIF 的每个 RAND:8 都会重新求值，不能缓存成一次随机数。
  if (rand_n(8) === 0) selected = animals[0];
  else if (rand_n(8) === 1) selected = animals[1];
  else if (rand_n(8) === 2) selected = animals[2];
  else if (rand_n(8) === 3) selected = animals[3];
  else if (rand_n(8) === 4) selected = animals[4];
  else if (rand_n(8) === 5) selected = animals[5];
  else selected = ['一只猫', '喵~'];
  await era.printAndWait(
    `随后${chara_callname(0)}将${she(cid)}变成了${selected[0]}的样子。`,
  );
  return selected[1];
}

async function banishment(cid, rand_n = default_rand) {
  if (cid === 0) return 0;
  // TARGET = A：处刑口上与随后公共结算均以被选角色为当前目标。
  era_flag.target = cid;
  const family_id = search_family(cid);
  await era.printAndWait('要来点有意思的放逐吗？');
  era.println();
  era.print('[0] 就这样流放掉');
  era.print('[1] 施予男性化的诅咒');
  era.print('[2] 消去之前的记忆');
  era.print(`[3] 变成小动物后放生`);
  era.print(`[4] 让${she(cid)}回到成为勇者前的生活`);
  era.println();

  let result;
  for (;;) {
    result = await era.input({ useRule: false });
    if (result < 0 || (result >= 5 && result !== 100)) continue;
    // 原作 :27 的 ELSEIF RESULT == 1 缺少 TALENT:A:122 条件，导致女性也
    // 无法选择男性化；这是可达的原作缺陷，1:1 保留。
    if (result === 1) {
      await era.printAndWait(
        `${chara_callname(cid)}已经是男性了。换个手段吧。`,
      );
      continue;
    }
    break;
  }
  if (result === 100) {
    game.event.犬射精或处刑口上 = -1;
    return 0;
  }

  apply_prestige(cid);
  game.event.流放口上 = result;
  const kojo_id = kojo_handler_id(cid);
  if (kojo_id >= 0) {
    const kojo_arg = kojo_id === 0 ? result : rand_n;
    await banishment_koujo_family.call(kojo_id, {
      whenMissing: 0,
      args: [kojo_arg],
    });
  }
  // BANISHMENT_KOUJO 可改写 TFLAG:510；原作在 CALL 后才按该值分支。
  result = game.event.流放口上;

  const name = chara_callname(cid);
  let fate;
  if (result === 0) {
    era.print(`${name}的力量被封印起来，`);
    await era.printAndWait('放逐到地下城的外面');
    if (has(cid, 'talent', 85)) {
      await printw(
        `${name}不知所措地被放逐了，嘴中还在重复着你的名字。${name}带着一副快要崩溃的悲伤表情，慢慢地消失在远方的森林中…………`,
      );
      // 原作 ELSEIF 把 TALENT:85 放在前一支之后，故这个“怀孕且依恋”支永不可达。
      // eslint-disable-next-line no-dupe-else-if
    } else if (has(cid, 'talent', 85) && has(cid, 'talent', 153)) {
      await printw(
        `${name}不知所措地被放逐了，嘴中还在重复着你的名字。还在怀孕期的${name}一副快要崩溃的悲伤表情，慢慢地消失在远方的森林中…………`,
      );
    } else if (has(cid, 'talent', 153)) {
      await printw(`还在怀孕期的${name}一脸茫然，慢慢地消失在远方的森林中…………`);
    }
    fate = await ordinary_fate(cid);
    if (has(cid, 'talent', 204)) {
      const favorite = get(`talent:${cid}:317`);
      const former = get(`talent:${cid}:315`);
      if ([4, 11].includes(favorite)) {
        await printw(
          `昔日的恋人费尽周折打听${name}的消息，却只得到一个水晶球；看着${name}已经面目全非的淫秽表演，他一边哭泣着一边自慰起来……`,
        );
      } else if (former === 1) {
        await printw(
          `某个一直单恋着${name}的同学看着手中的水晶球，视频里${name}淫乱的姿态让他的心中充满了羞耻，却情不自禁地摸向了双腿之间……`,
        );
      } else if (former === 8) {
        await printw(
          `某个曾经憧憬着身为高级贵族${name}的男性入手了一个水晶球。看着${name}淫乱的姿态让他的心中充满了羞耻，却情不自禁地摸向了双腿之间……`,
        );
      } else if (former === 12) {
        await printw(
          `某个曾经憧憬着身为${has(cid, 'talent', 122) ? '圣者' : '圣女'}${name}的少年入手了一个水晶球。看着${name}变态的行为让他的心中充满了羞耻，却情不自禁地摸向了双腿之间……`,
        );
      } else if ([15, 18].includes(former)) {
        const job =
          former === 15
            ? has(cid, 'talent', 122)
              ? '商人'
              : '商店看板娘'
            : has(cid, 'talent', 122)
              ? '面包店店员'
              : '面包店看板娘';
        await printw(
          `某个一直暗恋着${job}${name}的青年入手了一个水晶球。看着${name}堕落淫乱的样子，忍不住一边哭泣一边自慰起来……`,
        );
      } else if (former === 19) {
        await printw(
          `一群原本是${name}部下的军人们集体入手了一整套水晶球。看着原本可信赖的上司和领袖${name}变成淫贱牝犬的姿态，军营中传出了一阵粗重的喘息声……`,
        );
      }
    }
  } else if (result === 1) {
    await printw(
      `${name}所有的力量都在烙印被打上的那一瞬间被封印了，女性的肉体被咒语改变成为了男性，不可逆转。`,
    );
    await printw(`被${chara_callname(0)}男性化的${name}体力耗尽，被放逐了。`);
    await printw(
      '放逐的过程中也渐渐忘记了自己曾是女性的事实，决定今后将作为男性继续活下去……',
    );
    fate = '一个爷们站起来了';
  } else if (result === 2) {
    await era.printAndWait(
      `${name}所有的力量都在烙印被打上的那一瞬间被封印了，迄今为止所有的人生记忆也被全部抹去。`,
    );
    await era.printAndWait(
      `被${chara_callname(0)}抹去记忆的${name}茫然失措，被放逐了`,
    );
    await era.printAndWait(`${she(cid)}还在彷徨地回想着自己是谁…`);
    fate = '记忆碎片';
  } else if (result === 3) {
    await era.printAndWait(
      `${name}所有的力量都在被${chara_callname(0)}打上烙印的那一瞬间封印了，`,
    );
    await era.printAndWait(`加上${name}所有关于“自己曾是人类”的记忆都被封锁。`);
    fate = await animal_fate(cid, rand_n);
    await era.printAndWait(
      `${chara_callname(0)}将已经变成小动物的${name}放逐了。`,
    );
    await era.printAndWait(`${she(cid)}以后不会记得自己曾经是人类了……`);
  } else if (result === 4) {
    await era.printAndWait(
      `${name}所有的力量都在被${chara_callname(0)}打上烙印的那一瞬间封印了，`,
    );
    await era.printAndWait('被放逐回成为勇者前的生活');
    // 源 :613 先清空函数静态 MATURO；JS 中以本次局部 fate 取代该残值。
    await narrate_former_life(cid);
    fate = former_life_fate(cid);
    await era.printAndWait(`——下场：${fate}`);
  }

  // 回归旧生活支（TFLAG:510 == 4）是唯一不发勋章的分支，照源保留。
  if (result !== 4) {
    chara(0).event.勋章经验 += 1;
    era.println();
    era.print('得到了象征勇者之力的勋章');
    era.print('勋章经验+1');
  }
  if (family_id >= 0) era.set(`cstr:${family_id}:5`, `${fate}${name}`);
  archive_fate(cid, fate);
  return dispose_character(cid, {
    experience_message: (experience) =>
      `《你抽取了被封印的勇者之力尽为己用，获得了${experience}经验值》`,
  });
}

module.exports = { banishment };
