/**
 * @file 成熟奴隶出售后的异族市场与宠物市场末路（issue #337）。
 *
 * 源: target/ERB/售卻相關/SELL_MATURO_K1.ERB @SELL_MATURO_K1（:25-1381）
 *     target/ERB/售卻相關/SELL_MATURO_K2_牝犬.ERB 全文（追加于文件尾）
 *
 * 原作 S = SALE_CHARA 算出的售价；独立调用时用 ESTIMATE_CHARA 重算。
 * K1 的随机源可注入，保证分支测试确定。CSTR 的家族角色下标 5 保存末路，
 * TSTR 下标 30 是 VIDEO_MATURO 消费的录像标题暂存。
 *
 * 变量语义：MARK 下标 3 = 反抗刻印；CFLAG 下标 9 = 等级；ABL 下标
 * 2/3/15 = 私处/肛门感觉/话术；TALENT 下标 61/62/75-77/85 = 不怕污臭/
 * 反感污臭/性爱狂/淫乱/尻穴狂/爱慕；110/114/119/121/124 = 巨乳/爆乳/
 * 超乳/扶她/动物耳朵；136 = 牝犬；200-207 = 八类职业；314/315 = 种族/
 * 成为勇者前的生活。CFLAG 下标 605 = 压缩家族关系；CSTR 下标 5 =
 * 家人的末路记录。
 */

'use strict';

const era = require('#/era-electron');
const { estimate_chara } = require('#/system/stronghold/sale');
const { video_maturo } = require('#/system/stronghold/sell-video');
const { search_family } = require('#/chara/chara-family');
const { chara } = require('#/facade/chara');
const era_flag = require('#/era-utils/era-flag');
const { chara_callname, chara_name } = require('#/utils/callname-utils');

async function sell_maturo_k1(cid = era_flag.target, { price, rand } = {}) {
  price ??= estimate_chara(cid).price;
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target_name = chara_callname(cid);
  const master_name = chara_name(0);
  const family_id = search_family(cid);
  let buyer = '';
  let route = 0;
  let ending = '';

  if (era.get(`mark:${cid}:3`) == 3) {
    if (era.get(`talent:${cid}:314`) == 9) {
      if (price >= 100000) {
        if (rand_n(2) == 0) {
          buyer = '食脑魔的诸侯';
          route = 1;
        } else {
          buyer = '食脑魔的大神官';
          route = 0;
        }
        await era.printAndWait(`${buyer}买下${target_name}之后………`);
        await era.printAndWait(`………`);
        await era.printAndWait(`……`);
        await era.printAndWait(`…`);

        if (route == 1) {
          if (era.get(`cflag:${cid}:9`) >= 50) {
            await era.printAndWait(
              `反抗心很强的${target_name}受到了好事之徒的喜爱。`,
            );
            await era.printAndWait(`脑子被改造，成为了唯命是从的奴隶。`);
            await era.printAndWait(
              `${target_name}，现在作为优秀的指挥官，不断地流着爱液和口水履行着自己的职务。`,
            );
            ending = '脑改造指挥官';
          } else {
            await era.printAndWait(
              `反抗心很强的${target_name}被好事之徒改造了脑子。`,
            );
            await era.printAndWait(
              `但是手术失败了，完全成为了废人，行为退行到婴幼儿一样。`,
            );
            await era.printAndWait(`每天屎尿横流地，无忧无虑在玩耍……`);
            ending = '白痴';
          }
        } else if (route == 0) {
          if (
            era.get(`talent:${cid}:202`) == 1 ||
            era.get(`talent:${cid}:206`) == 1
          ) {
            await era.printAndWait(
              `反抗心很强的${target_name}成为了奇怪的教团的干部。`,
            );
            await era.printAndWait(`现在，已经被洗脑成了顺从的神圣娼妓了。`);
            await era.printAndWait(
              `${target_name}向信徒们大开双腿，述说着堕落神的慈爱。`,
            );
            ending = '堕落神的神圣娼妇';
          } else {
            await era.printAndWait(
              `反抗心很强的${target_name}被奇怪的教团选为祭品了。`,
            );
            await era.printAndWait(
              `脑子的一部分被献给了堕落神，现在已经成为了完全顺从的神圣娼妓。`,
            );
            await era.printAndWait(
              `口水和爱液不断地流出来，但是她却感到幸福……`,
            );
            ending = '堕落神的神圣娼妇';
          }
        }
      } else {
        if (rand_n(2) == 0) {
          buyer = '恶魔的诸侯';
          route = 1;
        } else {
          buyer = '恶魔的大富豪';
          route = 0;
        }
        await era.printAndWait(`${buyer}买下${target_name}之后………`);
        await era.printAndWait(`………`);
        await era.printAndWait(`……`);
        await era.printAndWait(`…`);
        if (route == 1) {
          if (rand_n(2) == 0) {
            await era.printAndWait(
              `反抗心很强的${target_name}成为了恶魔的玩具。`,
            );
            await era.printAndWait(`性器被改造得乱七八糟，还弄出了阴茎，`);
            await era.printAndWait(`被恶魔们当成杂耍奴隶而存在着。`);
            ending = '恶魔的玩具';
          } else {
            await era.printAndWait(
              `反抗心很强的${target_name}成为了肥料制造装置。`,
            );
            await era.printAndWait(
              `嘴巴被强灌家畜用的饲料，不到一个小时就产生了优质的肥料。`,
            );
            await era.printAndWait(
              `因为脱粪时的叫声很像叫床声，${target_name}被`,
            );
            await era.printAndWait(
              `设置在开阔的农田中，作为展示物而被展示着。`,
            );
            ending = '脱粪肥料装置';
          }
        } else if (route == 0) {
          // 原作行 111 把超乳（119）写了两次、没有检查扶她（121）；按 1:1 保留。
          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            await era.printAndWait(
              `反抗心很强的${target_name}被当作奶罐被饲养着畜舍里。`,
            );
            await era.printAndWait(
              `原来就很有规模的乳房，被魔法和药物弄得更加夸张了，犹如史莱姆一般。`,
            );
            await era.printAndWait(
              `每天都被强制地榨乳和播种，${target_name}口水和爱液持续不断地滴落下来。`,
            );
            ending = '奶罐';
          } else {
            await era.printAndWait(
              `反抗心很强的${target_name}被魔法夺取了作为人类的思考和语言能力。`,
            );
            await era.printAndWait(
              `现在，无论有没有来客，她都被颈圈和锁链扣着，作为一只用四肢爬行的狗而存在。`,
            );
            await era.printAndWait(`今晚，也在进行着与狗交配的表演。`);
            await era.printAndWait(
              `${target_name}带着幸福的表情，积极地扭动着自己的腰肢。`,
            );
            ending = '无脑的牝犬';
          }
        }
      }
    } else {
      if (price >= 100000) {
        if (era.get(`talent:${cid}:314`) == 5) {
          buyer = '高阶魔法研究所';
          route = 2;
        } else if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          buyer = '兽人的佣兵团';
          route = 1;
        } else {
          buyer = '吸血鬼的暗黑神殿';
          route = 0;
        }
        await era.printAndWait(`${buyer}买下${target_name}之后………`);
        await era.printAndWait(`………`);
        await era.printAndWait(`……`);
        await era.printAndWait(`…`);

        if (route == 2) {
          await era.printAndWait(
            `反抗心很强的${target_name}被当作珍贵的异族关入了笼子里。`,
          );
          await era.printAndWait(
            `${target_name}被饲养在充满法师和魔女的魔法研究设施中。`,
          );
          await era.printAndWait(`每天都有人定时采集她的血液及排泄物。`);
          await era.printAndWait(
            `被充分灌肠，在桶里排泄着的${target_name}，满眼泪光……`,
          );
          ending = '排泄实验素材';
        } else if (route == 1) {
          await era.printAndWait(`${target_name}作为护卫剑士被雇佣了。`);

          if (era.get(`cflag:${cid}:9`) >= 100) {
            await era.printAndWait(
              `靠着武艺高强和牙尖嘴利，${target_name}成为了兽人们大姐一样的角色。`,
            );
            await era.printAndWait(`有时在训练的时候，还会直接用脚踢飞它们。`);
            await era.printAndWait(`「到底谁才是奴隶啊……」兽人们苦笑着……`);
          } else {
            await era.printAndWait(
              `${target_name}没怎么反抗了，似乎适应了在佣兵团的生活。`,
            );
            await era.printAndWait(
              `使用着和兽人一样的嚣张语气，不管问题都用拳头解决，训练的时候用木剑相互搏击……`,
            );
            await era.printAndWait(
              `一天的辛劳过后，还会和兽人们一起裸体洗澡……`,
            );
            await era.printAndWait(
              `看来很快${target_name}就会成为佣兵团里不可或缺的一员了吧。`,
            );
          }
          ending = '护卫剑士';
        } else if (route == 0) {
          if (
            era.get(`talent:${cid}:202`) == 1 ||
            era.get(`talent:${cid}:206`) == 1
          ) {
            await era.printAndWait(
              `反抗心很强的${target_name}，被吸血鬼所洗礼，成了暗黑之神的信徒。`,
            );
            await era.printAndWait(
              `由于已经被邪恶的仪式洗脑了几次，现在的她忠诚而得心应手地履行着职务。`,
            );
            await era.printAndWait(
              `不过，由于使用了强烈的药物，她经常无意识地失禁，接着因此绝顶……`,
            );
            ending = '暗黑神的信徒';
          } else {
            await era.printAndWait(
              `反抗心很强的${target_name}，现在作为饮料机为吸血鬼提供着血液。`,
            );
            await era.printAndWait(
              `全身被紧紧地拘束着，抽血的管子从胳膊处延伸出来。进食和排泄也都通过管子来处理。`,
            );
            await era.printAndWait(
              `她唯一的乐趣，就是临睡前被爱抚至绝顶，每天有且仅有一次……`,
            );
            ending = '吸血鬼的饮料';
          }
        }
      } else {
        if (rand_n(2) == 0) {
          buyer = '巨魔佣兵团';
          route = 1;
        } else {
          buyer = '恶魔的人间牧场';
          route = 0;
        }
        await era.printAndWait(`${buyer}买下${target_name}之后………`);
        await era.printAndWait(`………`);
        await era.printAndWait(`……`);
        await era.printAndWait(`…`);
        if (route == 1) {
          if (rand_n(2) == 0) {
            await era.printAndWait(
              `反抗心很强的${target_name}被改造成适应巨魔佣兵团团长的阴茎的飞机杯。`,
            );
            await era.printAndWait(
              `手脚都被切掉，私处被扩张至极限，用锁链绑在了巨魔的身上。`,
            );
            await era.printAndWait(
              `子宫也完全的肉穴化了，变得无论怎么被弄都不会怀孕的样子……`,
            );
            ending = '巨魔的飞机杯';
          } else {
            await era.printAndWait(
              `反抗心很强的${target_name}被当成巨魔们的繁殖用便器。`,
            );
            await era.printAndWait(
              `${target_name}的子宫，像气球一样地夸张膨胀着，孕育着健康的巨魔婴儿。`,
            );
            await era.printAndWait(
              `孩子到底是谁的，${target_name}自己也分不清楚了……`,
            );
            ending = '巨魔的繁殖便器';
          }
        } else if (route == 0) {
          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            await era.printAndWait(
              `反抗心很强的${target_name}作为奶罐而被饲养着畜舍里。`,
            );
            await era.printAndWait(
              `旁边排列着不知多少和她相似的裸体女人，全员的乳房都被逼近极限地肥大化了。`,
            );
            await era.printAndWait(
              `淌着口水，一副高潮脸的${target_name}，和鼻子上的鼻环真相称呢～`,
            );
            ending = '奶罐';
          } else {
            await era.printAndWait(
              `反抗心很强的${target_name}作为繁殖用牲畜而被饲养在畜舍里。`,
            );
            await era.printAndWait(
              `也不知道哪里买回来的男奴，在她身上拼命地挺动着腰，锁链撞得啦啦作响。`,
            );
            await era.printAndWait(
              `${target_name}的自由和人权都被剥夺了，只能贪图着性交的快乐……`,
            );
            ending = '繁殖用家畜奴隶';
          }
        }
      }
    }
  } else if (era.get(`talent:${cid}:85`) || era.get(`talent:${cid}:76`)) {
    if (era.get(`talent:${cid}:314`) == 9) {
      if (price >= 1000000) {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          buyer = '暗黑龙';
          route = 3;
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:207`) == 1
        ) {
          buyer = '上级恶魔';
          route = 2;
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          buyer = '异形之神的神殿';
          route = 1;
        } else {
          buyer = '魔兽的研究设施';
          route = 0;
        }
        await era.printAndWait(`${buyer}买下${target_name}之后………`);
        await era.printAndWait(`………`);
        await era.printAndWait(`……`);
        await era.printAndWait(`…`);

        if (route == 3) {
          if (era.get(`talent:${cid}:75`) == 1) {
            await era.printAndWait(
              `${target_name}成为了暗黑龙的新娘，在龙的洞穴里生活着。`,
            );
            await era.printAndWait(
              `接受着龙的挞伐和种子，帮助濒临绝种的龙延续后代而多次怀孕产子。`,
            );
            await era.printAndWait(
              `最近，好像因为暗黑龙的播种过度而叫苦不迭。`,
            );
          } else {
            await era.printAndWait(
              `${target_name}成为了暗黑龙的新娘，在龙的洞穴里生活着。`,
            );
            await era.printAndWait(
              `魔族的肉体接受着龙的挞伐和种子，孕育了几只龙的幼崽。`,
            );
            await era.printAndWait(
              `${target_name}的肉体，按照龙的想法在持续地被改造着。`,
            );
          }
          ending = '暗黑龙的新娘';
        } else if (route == 2) {
          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            await era.printAndWait(
              `有着伟岸胸部的${target_name}成为了上级恶魔的女仆。`,
            );
            await era.printAndWait(
              `穿着露出乳头的衣服，乳头常年兴奋地勃起着。`,
            );
            await era.printAndWait(
              `一但被主人发现乳头勃起，就要接受淫秽的惩罚，`,
            );
            await era.printAndWait(
              `但是，即使是主人邪恶的催淫咒语，${target_name}也愉悦地享受着……`,
            );
          } else {
            await era.printAndWait(`${target_name}成为了上级恶魔的女仆。`);
            await era.printAndWait(
              `只要犯错，就会触发主人的自慰诅咒，当场自慰起来。`,
            );
            await era.printAndWait(`一直带着常人难以理解的紧张感在工作着。`);
            await era.printAndWait(
              `不过最近，${target_name}似乎故意犯错而主动地在公开自慰，主人为此十分苦恼。`,
            );
          }
          ending = '上级恶魔的女仆';
        } else if (route == 1) {
          if (era.get(`talent:${cid}:77`) == 1) {
            await era.printAndWait(
              `${target_name}在异形之神的神殿，照顾着变异的信徒。`,
            );
            await era.printAndWait(
              `那些信徒，无论吃饭还是行走，都需要她的帮助。`,
            );
            await era.printAndWait(
              `而且，如果那可怕的阴茎勃起的话，也是需要${target_name}用肛门去平复的。`,
            );
          } else {
            await era.printAndWait(
              `${target_name}在异形之神的神殿，照顾着变异的信徒。`,
            );
            await era.printAndWait(
              `作为神的新娘，${target_name}的子宫是信徒们的公共财产。`,
            );
            await era.printAndWait(
              `现在，也接受了异形的种子，怀上了异形宝宝。`,
            );
          }
          ending = '异形之神的干事';
        } else if (route == 0) {
          if (era.get(`abl:${cid}:15`) >= 5) {
            await era.printAndWait(
              `${target_name}用巧妙的话语说服了魔兽研究所的研究人员，`,
            );
            await era.printAndWait(`让她主导了实验室里试验品的购买和使用。`);
            await era.printAndWait(
              `和魔兽、异形杂交用的奴隶，从各地被她购买回来，明天都在听着她们的悲鸣而手淫着。`,
            );
            ending = '实验室的采购';
          } else {
            await era.printAndWait(
              `${target_name}作为与魔兽交配用的奴隶被买回来了，现在也被强制与怪物交配着。`,
            );
            await era.printAndWait(
              `最近，好像对魔兽们起了爱意，交配时会忘情地叫着实验魔兽的名字。`,
            );
            await era.printAndWait(`扭动着腰，与魔兽相互亲吻着……`);
            ending = '魔兽交配奴隶';
          }
        }
      } else if (price >= 500000) {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          buyer = '食人魔佣兵团';
          route = 3;
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:207`) == 1
        ) {
          buyer = '半人马的骑士团';
          route = 2;
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          buyer = '牛头人祭司';
          route = 1;
        } else {
          buyer = '兽人富商';
          route = 0;
        }
        await era.printAndWait(`${buyer}买下${target_name}之后………`);
        await era.printAndWait(`………`);
        await era.printAndWait(`……`);
        await era.printAndWait(`…`);

        if (route == 3) {
          if (era.get(`talent:${cid}:203`) == 1) {
            await era.printAndWait(
              `${target_name}成为了食人魔佣兵团的一员，起到支援和后勤的作用。`,
            );
            await era.printAndWait(
              `专心致志地，负责着资产管理、装备与物资的购买等工作。`,
            );
            await era.printAndWait(
              `因为怀上了团长的孩子，肚子夸张地膨胀了起来，孕育着下一任的团长。`,
            );
          } else {
            await era.printAndWait(`${target_name}作为佣兵团的战士而活跃着。`);
            await era.printAndWait(
              `比起奴隶时代，肌肉也好，筋骨也好，都更加强壮了。`,
            );
            await era.printAndWait(
              `佣兵团的食人魔们看着这样的${target_name}，个个都情难自禁。`,
            );
            await era.printAndWait(
              `强大的战斗力，对于它们来说才是最富吸引力的性魅力。`,
            );
          }
          ending = '食人魔佣兵团员';
        } else if (route == 2) {
          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            await era.printAndWait(`${target_name}过着抚养半人马孩子的生活。`);
            await era.printAndWait(
              `丰满的乳房，不断地供给着母乳，尽显慈母姿态。`,
            );
            await era.printAndWait(
              `半人马的孩子，和马一样，阴茎拥有令人咋舌的尺寸。`,
            );
            await era.printAndWait(
              `看着青涩的果实逐渐成长，${target_name}忍不住舔了舔嘴唇。`,
            );
            await era.printAndWait(`「今晚，也进行禁断的性教育吧……」`);
            ending = '半人马的奶妈';
          } else {
            await era.printAndWait(
              `${target_name}作为骑士团的侍从，在打杂着。`,
            );
            await era.printAndWait(
              `半人马的性欲很强，不允许她的下半身穿任何东西。`,
            );
            await era.printAndWait(
              `${target_name}经常因此突然间就被推倒、侵犯…………`,
            );
            ending = '半人马骑士侍从';
          }
        } else if (route == 1) {
          if (era.get(`talent:${cid}:77`) == 1) {
            await era.printAndWait(
              `${target_name}作为优秀的祭典活动人，受到牛头人祭司们的肯定。`,
            );
            await era.printAndWait(
              `作为暗黑神的使徒，在仪式的时候要一边用肛门自慰着，一边跳着淫乱的舞蹈。`,
            );
            await era.printAndWait(
              `那个肛门，被扩张到了极限，通过奇妙的方式盛开着……`,
            );
            ending = '牛头人圣女';
          } else {
            await era.printAndWait(
              `作为牛头人神殿的圣母，${target_name}怀上了牛头人的幼崽。`,
            );
            await era.printAndWait(`为了产下混血又强大的牛头人，进行着仪式，`);
            await era.printAndWait(`现在，这位圣母正分娩着牛面之神的孩子……`);
            ending = '牛头人圣母';
          }
        } else if (route == 0) {
          if (era.get(`talent:${cid}:204`) == 1) {
            await era.printAndWait(
              `作为宴客用肉便器，${target_name}在兽人的屋子里有着特殊的地位。`,
            );
            await era.printAndWait(
              `拿勇者来当肉便器，充分满足了兽人富商的虚荣心。`,
            );
            await era.printAndWait(
              `被放在书房角落的肉便器，经常在主人和客人的视线下毫无顾忌地疯狂自慰着。`,
            );
            await era.printAndWait(
              `只是这样看着，就让兽人富商沉醉在像得到一切似的成就感……`,
            );
            ending = '宴客肉便器';
          } else {
            await era.printAndWait(
              `作为爱人被买回来的${target_name}在兽人的屋子里有着特殊的地位。`,
            );
            await era.printAndWait(
              `兽人富商完全倾心于${target_name}，每天都用珠宝华服打扮着她。`,
            );
            await era.printAndWait(
              `${target_name}穿着华丽的衣饰，似乎整个人连气质都变了。`,
            );
            ending = '兽人的爱人';
          }
        }
      } else if (price >= 100000) {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          buyer = '六头海蛇的联防队';
          route = 3;
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:201`) == 1
        ) {
          buyer = '黑暗精灵的学校';
          route = 2;
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          buyer = '魔像的大农场';
          route = 1;
        } else {
          buyer = '狼人的赌场';
          route = 0;
        }
        await era.printAndWait(`${buyer}买下${target_name}之后………`);
        await era.printAndWait(`………`);
        await era.printAndWait(`……`);
        await era.printAndWait(`…`);

        if (route == 3) {
          if (era.get(`talent:${cid}:75`) == 1) {
            await era.printAndWait(
              `${target_name}作为六头海蛇联防队的外雇战士被雇佣了。`,
            );
            await era.printAndWait(
              `被调教过的${target_name}，顺从着命令，在联防队里表现活跃。`,
            );
            await era.printAndWait(
              `然而，${target_name}的性欲太强了，经常在训练时偷偷地和其它的六头海蛇做爱。`,
            );
            await era.printAndWait(
              `最近，她把全队的风气都搞得一团糟，终于被装上了贞操带，并严令不得在工作时间进行任何形式的性行为。`,
            );
          } else {
            await era.printAndWait(
              `${target_name}作为六头海蛇联防队的外雇战士被雇佣了。`,
            );
            await era.printAndWait(
              `被调教过的${target_name}，顺从着命令，在联防队里表现活跃。`,
            );
            await era.printAndWait(
              `在共同的磨砺和战斗中，逐渐与其它六头海蛇建立起了信赖。`,
            );
            await era.printAndWait(
              `最近，还传来了即将要和队里其中一只年轻的六头海蛇结婚的消息。`,
            );
          }
          ending = '六头海蛇的联防队外籍战士';
        } else if (route == 2) {
          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            await era.printAndWait(`${target_name}在黑暗精灵的中学做讲师。`);
            await era.printAndWait(
              `胸部呼之欲出，${target_name}被少年们所憧憬着。`,
            );
            await era.printAndWait(`最近，她和黑暗精灵少年的淫行被发现了。`);
            await era.printAndWait(
              `作为惩罚，${target_name}被刺上了【淫行老师】的刺青。`,
            );
            ending = '黑暗精灵学校的淫行老师';
          } else {
            await era.printAndWait(`${target_name}在黑暗精灵的中学做讲师。`);
            await era.printAndWait(
              `经验丰富的${target_name}被少年们所憧憬着。`,
            );
            await era.printAndWait(
              `与全班的男生都维持着性关系，${target_name}貌似对几名女生都出手了。`,
            );
            await era.printAndWait(`据说在保健课上，与全班一起在搞性实习……`);
            ending = '黑暗精灵学校的淫行老师';
          }
        } else if (route == 1) {
          if (era.get(`talent:${cid}:77`) == 1) {
            await era.printAndWait(
              `${target_name}在魔像的大农场里，从事着生产肥料的工作。`,
            );
            await era.printAndWait(
              `大量的剩菜残羹和饲料被灌入像孕妇一样发胀的肚子，在被改造过的内脏里发酵。`,
            );
            await era.printAndWait(
              `然后，随着她的娇喘，优质的肥料就会被排泄出来。`,
            );
            ending = '肥料生产奴隶';
          } else {
            await era.printAndWait(
              `${target_name}成为了魔像的生物部件在大农场里工作着。`,
            );
            await era.printAndWait(
              `${target_name}全身都被封入了魔像体内，大脑一片空白地操纵着魔像的行动。`,
            );
            await era.printAndWait(
              `已经失去了所有的思考能力，只是永恒体验着在胯间和乳头的慰安装置带来的快乐。`,
            );
            ending = '魔像的生物部件';
          }
        } else if (route == 0) {
          if (era.get(`talent:${cid}:204`) == 1) {
            await era.printAndWait(`${target_name}在狼人的赌场里，当肉便器。`);
            await era.printAndWait(
              `被改造成能怀上犬类的${target_name}，正出演着被狼人侵犯的表演。`,
            );
            await era.printAndWait(
              `「在被射第几次会怀孕呢？」带着这样的赌局，观众们纷纷投注。`,
            );
            ending = '赌场的兽奸女优';
          } else {
            await era.printAndWait(`${target_name}在狼人的赌场里，当肉便器。`);
            await era.printAndWait(
              `被改造成扶她的${target_name}，在把女狼人弄高潮之前都不被允许射出来。`,
            );
            await era.printAndWait(
              `「到底能干多少个女狼人才射呢？」带着这样的赌局，观众们纷纷投注。`,
            );
            ending = '赌场的扶她玩具';
          }
        }
      } else {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          buyer = '兽人佣兵团';
          route = 3;
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:207`) == 1
        ) {
          buyer = '巨魔的奴隶主';
          route = 2;
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          buyer = '黑暗精灵的学者';
          route = 1;
        } else {
          buyer = '街角的杂耍小屋';
          route = 0;
        }
        await era.printAndWait(`${buyer}买下${target_name}之后………`);
        await era.printAndWait(`………`);
        await era.printAndWait(`……`);
        await era.printAndWait(`…`);

        if (route == 3) {
          if (era.get(`talent:${cid}:75`) == 1) {
            await era.printAndWait(`${target_name}作为佣兵团的一员被招募了。`);
            await era.printAndWait(
              `喜欢性爱的${target_name}，经常在训练的时候偷偷给别的兽人口交。`,
            );
          } else {
            await era.printAndWait(`${target_name}作为佣兵团的一员被招募了。`);
            await era.printAndWait(
              `被团长看上了，坚持要和她生个孩子，${target_name}每晚都被团长播种着……`,
            );
          }
          ending = '兽人佣兵团员';
        } else if (route == 2) {
          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            await era.printAndWait(`${target_name}成为了巨魔苦力们的飞机杯。`);
            await era.printAndWait(
              `巨魔们完全不知道什么叫怜香惜玉，直接把她套在自己的阴茎上，疯狂地机械运动着。`,
            );
            await era.printAndWait(
              `奶水从她丰满的胸部中被粗暴地挤出，用来给巨魔解渴。`,
            );
          } else {
            await era.printAndWait(`${target_name}成为了巨魔苦力的飞机杯。`);
            await era.printAndWait(
              `巨魔们完全不知道什么叫怜香惜玉，直接把她套在自己的阴茎上，疯狂地机械运动着。`,
            );
            await era.printAndWait(
              `被改造成只能靠巨魔的精液生存。她经常带着淫荡的表情，脸都歪了。`,
            );
          }
          ending = '巨魔的慰安妇';
        } else if (route == 1) {
          if (era.get(`talent:${cid}:77`) == 1) {
            await era.printAndWait(
              `${target_name}成为了新的性拷问研究用实验体。`,
            );
            await era.printAndWait(`肛门被特殊的假阳具，日以继夜地蹂躏着。`);
            await era.printAndWait(
              `这个新发明，据说是用来开发通过阴道无法感受的超强快感。`,
            );
          } else {
            await era.printAndWait(
              `${target_name}成为了新的性拷问研究用实验体。`,
            );
            await era.printAndWait(
              `不断地被注射着新型的媚药，不断地重复令人发疯的绝顶高潮。`,
            );
            await era.printAndWait(
              `最近，只是被风吹到，就能令她绝顶高潮了。于是为了研究忍耐快感的药物，学者们开始了反向的实验……`,
            );
          }
          ending = '黑暗精灵学者的实验体';
        } else if (route == 0) {
          if (era.get(`talent:${cid}:204`) == 1) {
            await era.printAndWait(
              `${target_name}的肉体被淫秽地改造了，被全身赤裸地放在店里招揽客人。`,
            );
            await era.printAndWait(
              `被改造出了怪诞的性器官，乳房淫乱至极地膨胀着，吸引着街上行人的好奇心。`,
            );
            await era.printAndWait(
              `最近，还和有着丑陋阴茎的扶她奴隶公开做爱。`,
            );
          } else {
            await era.printAndWait(
              `${target_name}的肉体被淫秽地改造了，被全身赤裸地放在店里招揽客人。`,
            );
            await era.printAndWait(
              `被改造出了奇形怪状的阴茎。被带到街边进行公开自慰表演。`,
            );
            await era.printAndWait(
              `因为射精太多而阳痿了。最近，好像学会了如何把软趴趴的阴茎塞入阴道里自慰。`,
            );
          }
          ending = '杂耍小屋的扶她便器';
        }
      }
    } else {
      if (price >= 1000000) {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          buyer = '堕天使的贵族';
          route = 3;
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:207`) == 1
        ) {
          buyer = '狮鹫快递';
          route = 2;
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          buyer = '蛇妖的高级妓院';
          route = 1;
        } else {
          buyer = '哥布林的大剧场';
          route = 0;
        }
        await era.printAndWait(`${buyer}买下${target_name}之后………`);
        await era.printAndWait(`………`);
        await era.printAndWait(`……`);
        await era.printAndWait(`…`);

        if (route == 3) {
          if (era.get(`talent:${cid}:75`) == 1) {
            await era.printAndWait(
              `${target_name}成为了堕天使的贵族少年的性教育者。`,
            );
            await era.printAndWait(
              `对越堕落越强大的堕天使来说，教育最重要的一环，就是性实习。`,
            );
            await era.printAndWait(
              `但是，连性欲旺盛的堕天使少年都忍不住发出了悲鸣，因为${target_name}每晚都疯狂地榨取着精液。`,
            );
          } else {
            await era.printAndWait(
              `${target_name}成为了堕天使的贵族少年的性教育者。`,
            );
            await era.printAndWait(
              `对越堕落越强大的堕天使来说，教育最重要的一环，就是性实习。`,
            );
            await era.printAndWait(
              `${target_name}总是温柔地拥抱着因性欲旺盛而在自己身上拼命耸动腰身的堕天使少年。`,
            );
          }
          ending = '堕天使少年的私教';
        } else if (route == 2) {
          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            await era.printAndWait(`${target_name}成为了狮鹫的骑手。`);
            await era.printAndWait(
              `表面上是送快递，实际上却是上门服务的应召女郎。`,
            );
            await era.printAndWait(
              `有着迷人胸部的${target_name}，在屡次被指名后，成为看板娘了。`,
            );
          } else {
            await era.printAndWait(`${target_name}成为了狮鹫的骑手。`);
            await era.printAndWait(
              `表面上是送快递，实际上却是上门服务的应召女郎。`,
            );
            await era.printAndWait(
              `进步很快的${target_name}，以超强的口交技术而闻名。`,
            );
          }
          ending = '狮鹫骑士';
        } else if (route == 1) {
          if (era.get(`talent:${cid}:77`) == 1) {
            await era.printAndWait(`${target_name}成为了专卖菊花的妓女。`);
            await era.printAndWait(
              `在各色各样异种族名流聚集的蛇妖妓院里，${target_name}拥有很高的人气。`,
            );
            await era.printAndWait(
              `在平常妓院会被拒之门外的异形客人，今天也聚集在${target_name}的门外企图一亲芳泽。`,
            );
            ending = '菊穴娼妇';
          } else {
            await era.printAndWait(
              `${target_name}在异种族热衷的蛇妖妓院里工作着。`,
            );
            await era.printAndWait(
              `哪怕怀上了异形的孩子，${target_name}依然要为一些喜欢孕妇的客人打开双腿。`,
            );
            await era.printAndWait(
              `在平常妓院会被拒之门外的异形客人，今天也聚集在${target_name}的门外企图一亲芳泽。`,
            );
            ending = '异种奸娼妇';
          }
        } else if (route == 0) {
          if (era.get(`abl:${cid}:15`) >= 5) {
            await era.printAndWait(
              `${target_name}成为了哥布林们的偶像，现在也在大剧场里载歌载舞着。`,
            );
            await era.printAndWait(
              `${target_name}穿着欲盖弥彰的下流布条作为衣服，在舞台上唱着黄色歌曲。`,
            );
            await era.printAndWait(
              `为了欣赏那淫荡的姿态，哥布林们把场馆都快挤爆了。`,
            );
          } else {
            await era.printAndWait(
              `${target_name}成为了哥布林们的偶像，现在也在大剧场里载歌载舞着。`,
            );
            await era.printAndWait(
              `${target_name}穿着欲盖弥彰的下流布条作为衣服，在舞台上扭动着纤腰。`,
            );
            await era.printAndWait(`那淫荡的姿态，让哥布林粉丝越来越多。`);
          }
          ending = '哥布林的偶像';
        }
      } else if (price >= 500000) {
        if (
          era.get(`talent:${cid}:207`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          buyer = '黑暗精灵的暗杀公会';
          route = 3;
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:200`) == 1
        ) {
          buyer = '六头海蛇的海盗船';
          route = 2;
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          buyer = '大富豪蛇妖';
          route = 1;
        } else {
          buyer = '暗黑兽人战士';
          route = 0;
        }
        await era.printAndWait(`${buyer}买下${target_name}之后………`);
        await era.printAndWait(`………`);
        await era.printAndWait(`……`);
        await era.printAndWait(`…`);

        if (route == 3) {
          if (era.get(`talent:${cid}:203`) == 1) {
            await era.printAndWait(`${target_name}成为了暗杀公会的情报人员。`);
            await era.printAndWait(
              `过往成了谜，${target_name}从不同的炮友身上不断地窃取着信息。`,
            );
            await era.printAndWait(
              `在没有工作的日子里，每晚都焦急地等待着性拷问。`,
            );
            ending = '暗杀公会的情报员';
          } else {
            await era.printAndWait(`${target_name}成为了暗杀公会的刺客。`);
            await era.printAndWait(
              `过往成了谜，和${target_name}睡过的男人，第二天总会发现已经惨死。`,
            );
            await era.printAndWait(
              `在没有工作的日子里，每晚都焦急地等待着性拷问。`,
            );
            ending = '暗杀公会的刺客';
          }
        } else if (route == 2) {
          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            await era.printAndWait(
              `${target_name}成为了六头海蛇海贼团的船长。`,
            );
            await era.printAndWait(
              `好像是因为那双引人入胜的漂亮乳房，被六头海蛇们推举上去的。`,
            );
            await era.printAndWait(
              `现在，她正坐在船长室的高座上，享受着亲信的按摩。`,
            );
            ending = '女海贼团船长';
          } else {
            await era.printAndWait(
              `${target_name}成为了六头海蛇海贼团的水手。`,
            );
            await era.printAndWait(`船上的水手们，都是被掠夺来的奴隶。`);
            await era.printAndWait(
              `${target_name}，向这些肮脏的水手分开双腿，缓和着他们的不满情绪。`,
            );
            ending = '女海贼团船员';
          }
        } else if (route == 1) {
          if (era.get(`talent:${cid}:77`) == 1) {
            await era.printAndWait(
              `${target_name}每晚都被喜欢百合的蛇妖欺负着。`,
            );
            await era.printAndWait(
              `喜欢玩弄后庭的蛇妖富豪，用她的灵活的长舌头捣弄着${target_name}的肛门。`,
            );
            await era.printAndWait(
              `${target_name}只感觉肛门都要融化了，每次都忍不住发出苦恼的喘息……`,
            );
            ending = '蛇妖的百合奴隶';
          } else {
            await era.printAndWait(
              `${target_name}每晚都被喜欢百合的蛇妖欺负着。`,
            );
            await era.printAndWait(
              `蛇妖们喜欢用她修长的身体，缠绕着${target_name}。`,
            );
            await era.printAndWait(
              `每次，${target_name}都忍不住发出苦闷的喘息，痛苦地扭动着。`,
            );
            ending = '蛇妖的百合奴隶';
          }
        } else if (route == 0) {
          if (era.get(`talent:${cid}:204`) == 1) {
            await era.printAndWait(
              `${target_name}全身都被刻上了奇怪的咒术刺青，在未开化的蛮族部落里生活着。`,
            );
            await era.printAndWait(
              `乳头、私处、鼻子、耳朵统统穿满了环，完全不像以前的样子了。`,
            );
            await era.printAndWait(
              `${target_name}的背上，还刻着蛮族主人的名字。这种被拥有的感觉，让她觉得愉悦不已。`,
            );
            ending = '蛮族兽人的一员';
          } else {
            await era.printAndWait(
              `${target_name}全身都被刻上了奇怪的咒术刺青，在未开化的蛮族部落里生活着。`,
            );
            await era.printAndWait(
              `乳头、私处、鼻子、耳朵统统穿满了环，完全不像以前的样子了。`,
            );
            await era.printAndWait(
              `从那时起，${target_name}已经完全成为另一个人，总是满怀喜悦地拥抱着蛮族那宽广的胸膛。`,
            );
            ending = '蛮族兽人的一员';
          }
        }
      } else if (price >= 100000) {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          buyer = '魔界的植物园';
          route = 3;
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:201`) == 1
        ) {
          buyer = '兽人骑士团';
          route = 2;
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          buyer = '鹰身女妖的奴隶中介';
          route = 1;
        } else {
          buyer = '花妖炼金术师';
          route = 0;
        }
        await era.printAndWait(`${buyer}买下${target_name}之后………`);
        await era.printAndWait(`………`);
        await era.printAndWait(`……`);
        await era.printAndWait(`…`);

        if (route == 3) {
          if (era.get(`talent:${cid}:75`) == 1) {
            await era.printAndWait(
              `${target_name}作为养分的供给，在培育着魔界的植物。`,
            );
            await era.printAndWait(
              `魔界植物的根，深深地扎入了她的阴道，直接吸取体内的养分。`,
            );
            await era.printAndWait(
              `喜欢做爱的${target_name}，无法抗拒那插入的感觉，通过阴道把自己的一切都献给植物了。`,
            );
            ending = '魔界植物的苗床';
          } else {
            await era.printAndWait(
              `${target_name}作为养分的供给，在培育着魔界的植物。`,
            );
            await era.printAndWait(
              `魔界植物的根，深深地扎入了她的直肠，直接吸取体内的养分。`,
            );
            await era.printAndWait(
              `${target_name}培育出来的植物，发育得非常良好，甚至在品评会上得奖了。`,
            );
            ending = '魔界植物的苗床';
          }
        } else if (route == 2) {
          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            await era.printAndWait(
              `${target_name}被兽人的骑士团拿来抚育和训练兽人的孩子。`,
            );
            await era.printAndWait(
              `随着傲人双峰被改造，她负责了所有孩子的喂养。同时努力地给兽人的孩子进行战斗训练。`,
            );
            await era.printAndWait(
              `村庄的深处，偶尔会传来作为母体的女人们的呻吟声……`,
            );
            await era.printAndWait(
              `她一听就知道又有一个兽人的孩子出生了，自己又有工作了。`,
            );
            ending = '兽人的幼教';
          } else {
            await era.printAndWait(
              `${target_name}作为兽人骑士团的一员而战斗着。`,
            );
            await era.printAndWait(
              `骑士团袭击了人类的村庄，掠夺着金钱和女人。`,
            );
            await era.printAndWait(
              `${target_name}发现了一个躲藏着的女人，将手里的人类战士首级丢出，把她吓了出来。`,
            );
            await era.printAndWait(
              `带着拼命求饶的女人，${target_name}凯旋而归，回到了深爱的兽人丈夫身边。`,
            );
            ending = '兽人骑士团员';
          }
        } else if (route == 1) {
          if (era.get(`talent:${cid}:77`) == 1) {
            await era.printAndWait(
              `${target_name}被鹰身女妖富豪作为照顾生活的奴隶买下了。`,
            );
            await era.printAndWait(
              `她全身赤裸着，只戴着项圈，照顾着富豪的女儿。`,
            );
            await era.printAndWait(
              `富豪的女儿，是个有名的性虐狂。${target_name}经常被塞上肛塞，享受着严格的排泄管理。`,
            );
            ending = '鹰身女妖富豪的奴隶';
          } else {
            await era.printAndWait(
              `${target_name}被鹰身女妖富豪作为照顾生活的奴隶买下了。`,
            );
            await era.printAndWait(
              `她全身赤裸着，只戴着项圈，照顾着鹰身女妖一家的生活。`,
            );
            await era.printAndWait(
              `${target_name}为了生出新的奴隶，在工作的闲暇，还要与男奴隶交配。`,
            );
            ending = '鹰身女妖的奴隶';
          }
        } else if (route == 0) {
          if (era.get(`talent:${cid}:204`) == 1) {
            await era.printAndWait(
              `作为肉便器的${target_name}为了收集实验用的精液，成为了公众便器。`,
            );
            await era.printAndWait(
              `被肉体改造过的${target_name}，用她那奇形怪状的阴道，吸取着精液，将精液存储在气球一般膨胀的子宫内。`,
            );
            await era.printAndWait(
              `这大量的精液，将来会参与人造人的实验与制作。`,
            );
            ending = '公众肉便器';
          } else {
            await era.printAndWait(
              `${target_name}为了进行魔法的素材收集，被肉体改造了。`,
            );
            await era.printAndWait(
              `${target_name}被弄出了巨大的阴囊，不停地生产着精液。`,
            );
            await era.printAndWait(
              `永远勃起无法软下的巨大阴茎，被管子连通着，不断地被榨精。`,
            );
            await era.printAndWait(
              `「今天的量已经过半了。还剩下五千次，加油哦！」`,
            );
            await era.printAndWait(
              `肛门被侵犯着，${target_name}虚弱的身体不断颤抖，在这种折磨中持续地高潮。`,
            );
            ending = '生产精液的扶她奴隶';
          }
        }
      } else {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          buyer = '兽人的高级战士';
          route = 3;
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:207`) == 1
        ) {
          buyer = '蜥蜴人骑士';
          route = 2;
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          buyer = '黑暗精灵的女神官';
          route = 1;
        } else {
          buyer = '街边的公厕';
          route = 0;
        }
        await era.printAndWait(`${buyer}买下${target_name}之后………`);
        await era.printAndWait(`………`);
        await era.printAndWait(`……`);
        await era.printAndWait(`…`);

        if (route == 3) {
          if (era.get(`talent:${cid}:75`) == 1) {
            await era.printAndWait(`${target_name}与兽人的高级战士结婚了。`);
            await era.printAndWait(`迷上了兽人健壮的肉体，两人深深地相爱着。`);
            await era.printAndWait(
              `最近，作为丈夫的兽人，开始在性欲方面输给${target_name}了。`,
            );
          } else {
            await era.printAndWait(`${target_name}与兽人的高级战士结婚了。`);
            await era.printAndWait(`迷上了兽人健壮的肉体，两人深深地相爱着。`);
            await era.printAndWait(`据说马上就要生第五个孩子了。`);
          }
          ending = '兽人高等战士的妻子';
        } else if (route == 2) {
          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            await era.printAndWait(`${target_name}与蜥蜴人骑士结婚了。`);
            await era.printAndWait(`陌生的鳞片式肌肤，也没能阻止两人的爱。`);
            await era.printAndWait(
              `丈夫因为${target_name}的巨乳而非常自豪，整天赞美着她。`,
            );
          } else {
            await era.printAndWait(`${target_name}与蜥蜴人骑士结婚了。`);
            await era.printAndWait(`陌生的鳞片式肌肤，也没能阻止两人的爱。`);
            await era.printAndWait(
              `随着一同度过的日子一天天过去，${target_name}越发被丈夫所溺爱着，总是被丈夫赞美。`,
            );
          }
          ending = '蜥蜴人骑士的妻子';
        } else if (route == 1) {
          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            await era.printAndWait(
              `${target_name}在黑暗精灵女神官的指引下修行着。`,
            );
            await era.printAndWait(
              `交换了姐妹契约，每天都过着奉献给暗黑之神的生活。`,
            );
            await era.printAndWait(
              `${target_name}的傲人双峰外露着，乳环上发出契约魔法的光芒。`,
            );
            ending = '邪教的姐妹信徒';
          } else {
            await era.printAndWait(
              `${target_name}在黑暗精灵女神官的指引下修行着。`,
            );
            await era.printAndWait(
              `交换了姐妹契约，每天都过着奉献给暗黑之神的生活。`,
            );
            await era.printAndWait(
              `${target_name}的性器被契约之环封闭着，应该再也不能接受阴茎了吧。`,
            );
            ending = '邪教的姐妹信徒';
          }
        } else if (route == 0) {
          if (era.get(`talent:${cid}:204`) == 1) {
            await era.printAndWait(
              `在异种族的街道上，${target_name}作为公众便器被锁在公厕里。`,
            );
            await era.printAndWait(
              `${target_name}必须接受所有种族的阴茎，哪怕怀孕也不能休息。`,
            );
            await era.printAndWait(
              `生下来的孩子，受孤儿院收养，进行着出色的教育，将来也会为街区作出贡献吧。`,
            );
            ending = '公众肉便器';
          } else {
            await era.printAndWait(
              `在异种族的街道上，${target_name}作为公众便器被锁在公厕里。`,
            );
            await era.printAndWait(
              `${target_name}必须接受所有种族的阴茎，什么精液都要喝下去。`,
            );
            await era.printAndWait(
              `据说，${target_name}成为了相当有名的便器女，后来被常客买走结婚了。`,
            );
            ending = '公众肉便器';
          }
        }
      }
    }
  } else {
    if (era.get(`talent:${cid}:314`) == 9) {
      if (price >= 500000) {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          buyer = '食人魔佣兵团';
          route = 3;
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:207`) == 1
        ) {
          buyer = '半人马的骑士团';
          route = 2;
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          buyer = '牛头人祭司';
          route = 1;
        } else {
          buyer = '兽人富商';
          route = 0;
        }
        await era.printAndWait(`${buyer}买下${target_name}之后………`);
        await era.printAndWait(`………`);
        await era.printAndWait(`……`);
        await era.printAndWait(`…`);

        if (route == 3) {
          if (era.get(`talent:${cid}:203`) == 1) {
            await era.printAndWait(
              `${target_name}作为顾问，加入了食人魔佣兵团。`,
            );
            await era.printAndWait(
              `食人魔们服从着${target_name}，将佣兵团的运营完全交给了她。`,
            );
            await era.printAndWait(`前任团长手下的战士，则在偷偷地密谋，`);
            await era.printAndWait(
              `通过自己的巨根令${target_name}服从，从而获得佣兵团里更大的权力。`,
            );
            ending = '食人魔佣兵团顾问';
          } else {
            await era.printAndWait(
              `${target_name}作为保镖，加入了食人魔佣兵团。`,
            );
            await era.printAndWait(
              `在佣兵团进行掠夺的时候，${target_name}自豪地挥舞着自己的武器。`,
            );
            await era.printAndWait(
              `有着魔族力量的她，单手就把女骑士之类的撂倒了。`,
            );
            await era.printAndWait(
              `抓回来的女人，则作为佣兵团的公共财产，被当作任意使用的肉便器。`,
            );
            ending = '食人魔佣兵团保镖';
          }
        } else if (route == 2) {
          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            await era.printAndWait(
              `${target_name}作为教职人员，加入了半人马的骑士团。`,
            );
            await era.printAndWait(
              `教导着半人马的孩子们如何做一个合格的魔族。`,
            );
            await era.printAndWait(
              `丰满的乳房，分泌出魔族的母乳，常常令孩子们勃起。`,
            );
            await era.printAndWait(
              `这种时候，${target_name}总会温柔地用手帮他们处理。`,
            );
            ending = '半人马的幼教';
          } else {
            await era.printAndWait(
              `${target_name}作为教职人员，加入了半人马的骑士团。`,
            );
            await era.printAndWait(
              `教导着半人马的孩子们如何做一个合格的魔族。`,
            );
            await era.printAndWait(
              `半人马的孩子，沐浴在${target_name}的魔族的力量里，常常情不自禁地勃起。`,
            );
            await era.printAndWait(
              `这种时候，${target_name}就会扭动着腰，帮他们处理。`,
            );
            ending = '半人马的幼教';
          }
        } else if (route == 1) {
          if (era.get(`talent:${cid}:77`) == 1) {
            await era.printAndWait(
              `${target_name}每晚都在牛头人神官们的仪式上奉献着后庭。`,
            );
            await era.printAndWait(
              `被牛头人的巨根侵犯着的肛门，已经被扩张到了极限。`,
            );
            await era.printAndWait(
              `括约肌完全松弛，没有肛门制动器的话，相信会对她的日常生活带来困扰吧。`,
            );
            ending = '牛头人神殿的贡品';
          } else {
            await era.printAndWait(
              `${target_name}接受了牛头人的信仰，成为了牛头人神殿的圣母。`,
            );
            await era.printAndWait(
              `今天，性欲高涨的牛头人信徒们，又来到神殿了。`,
            );
            await era.printAndWait(
              `${target_name}一边听着他们的烦恼与告解，一边用手和嘴巴帮他们解决。`,
            );

            ending = '牛头人神殿的圣母';
          }
        } else if (route == 0) {
          if (era.get(`talent:${cid}:204`) == 1) {
            await era.printAndWait(
              `${target_name}作为宴客用的肉便器，在屋子里像家畜似的被养着。`,
            );
            await era.printAndWait(
              `全身都被写满了淫贱的话语，每天都被扶她奴隶侵犯着。`,
            );
            await era.printAndWait(
              `肉体被下流地改造过的扶她奴隶，因为思考能力已经完全被性欲所掩盖，而疯狂地侵犯着${target_name}。`,
            );
            await era.printAndWait(
              `「等到客人们也厌倦${target_name}的时候，就把她也改造成扶她奴隶吧……」`,
            );
            ending = '宴客肉便器';
          } else {
            await era.printAndWait(
              `作为情人被买回来的${target_name}，温顺地顺从着自己的主人。`,
            );
            await era.printAndWait(
              `兽人富商，几乎每天都买漂亮的衣服和饰品给${target_name}穿戴。`,
            );
            await era.printAndWait(
              `没过多久，她就爱上了兽人富商，子宫里孕育着半兽人的婴儿。`,
            );
            ending = '兽人商人的情人';
          }
        }
      } else if (price >= 100000) {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          buyer = '六头海蛇的联防队';
          route = 3;
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:207`) == 1
        ) {
          buyer = '黑暗精灵的学校';
          route = 2;
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          buyer = '魔像的大农场';
          route = 1;
        } else {
          buyer = '魔界的大监狱';
          route = 0;
        }
        await era.printAndWait(`${buyer}买下${target_name}之后………`);
        await era.printAndWait(`………`);
        await era.printAndWait(`……`);
        await era.printAndWait(`…`);

        if (route == 3) {
          if (era.get(`talent:${cid}:75`) == 1) {
            await era.printAndWait(
              `${target_name}作为六头海蛇联防队的外雇战士被雇佣了。`,
            );
            await era.printAndWait(
              `工作结束后，${target_name}常常被六头海蛇的前辈命令做性处理服侍。`,
            );
            await era.printAndWait(`喜欢做爱的${target_name}，没有一丝犹豫，`);
            await era.printAndWait(`今天的她也搔首弄姿地，在休息室里等候着……`);
            ending = '六头海蛇的联防队外籍战士';
          } else {
            await era.printAndWait(
              `${target_name}作为六头海蛇联防队的外雇战士被雇佣了。`,
            );
            await era.printAndWait(
              `工作结束后，${target_name}常常被六头海蛇的前辈命令做性处理服侍。`,
            );
            await era.printAndWait(
              `现在，已经完全适应了六头海蛇那与众不同的阴茎了。`,
            );
            ending = '六头海蛇的联防队外籍战士';
          }
        } else if (route == 2) {
          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            await era.printAndWait(
              `${target_name}在黑暗精灵的中学做保健老师。`,
            );
            await era.printAndWait(
              `胸部呼之欲出，${target_name}被少年们所憧憬着。`,
            );
            await era.printAndWait(
              `有烦恼的青少年们，都会去找她倾诉，被学生们信赖着。`,
            );
            await era.printAndWait(
              `秉承着如果发泄掉性欲，那么烦恼就会消失的信条，保健室被弄得像妓院似的……`,
            );
            ending = '黑暗精灵学校的保健老师';
          } else {
            await era.printAndWait(
              `${target_name}在黑暗精灵的中学做保健老师。`,
            );
            await era.printAndWait(
              `经验丰富的${target_name}被少年们所憧憬着。`,
            );
            await era.printAndWait(
              `有恋爱烦恼的少年少女们，都会去找她做性启蒙。`,
            );
            await era.printAndWait(`保健室拜此所赐，被弄得像情人旅馆似的……`);
            ending = '黑暗精灵学校的保健老师';
          }
        } else if (route == 1) {
          if (era.get(`talent:${cid}:77`) == 1) {
            await era.printAndWait(
              `${target_name}在魔像的大农场里，从事着魔像维护的工作。`,
            );
            await era.printAndWait(
              `${target_name}的肉体被改造了，吃了的东西会在肠内变成魔像的燃料。`,
            );
            await era.printAndWait(
              `然后，肛门被插入了管子，去供应魔像的活动。`,
            );
            ending = '魔像的维护工';
          } else {
            await era.printAndWait(
              `${target_name}在魔像的大农场里，从事着看守作物的工作。`,
            );
            await era.printAndWait(
              `${target_name}用探照魔法，照亮入侵的野生动物和盗贼，然后引导安保部队去处理。`,
            );
            await era.printAndWait(
              `休息的时间，则在保安室里小睡，几乎没有任何的娱乐。`,
            );
            await era.printAndWait(
              `只能拜托作为同事的奴隶，靠激烈的性爱来消磨时间。`,
            );
            ending = '农场保安';
          }
        } else if (route == 0) {
          if (era.get(`talent:${cid}:204`) == 1) {
            await era.printAndWait(
              `为了让牛头人和半人马之类性欲旺盛的种族不造反。`,
            );
            await era.printAndWait(
              `${target_name}作为犯人的娱乐用具而被监狱买回来了，继续从事着肉便器的工作。`,
            );
            await era.printAndWait(
              `${target_name}接受着各种各样异种族的阴茎，几乎没有哪个现存种族的阴茎她没有品尝过了。`,
            );
            ending = '囚犯便器';
          } else {
            await era.printAndWait(
              `${target_name}作为犯人的娱乐用具而被监狱买回来了，继续从事着肉便器的工作。`,
            );
            await era.printAndWait(
              `忍耐多时的犯人们毫不客气，用尽她身上的每一个部位来让自己舒服。`,
            );
            await era.printAndWait(
              `据说和因猥亵罪而被捕的变态兽人相爱，准备要在监狱里结婚。`,
            );
            ending = '兽人囚犯的妻子';
          }
        }
      } else {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          buyer = '兽人佣兵团';
          route = 3;
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:207`) == 1
        ) {
          buyer = '巨魔的奴隶主';
          route = 2;
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          buyer = '黑暗精灵的学者';
          route = 1;
        } else {
          buyer = '街角的杂耍小屋';
          route = 0;
        }
        await era.printAndWait(`${buyer}买下${target_name}之后………`);
        await era.printAndWait(`………`);
        await era.printAndWait(`……`);
        await era.printAndWait(`…`);

        if (route == 3) {
          if (era.get(`abl:${cid}:2`) >= 5) {
            await era.printAndWait(`${target_name}成为了兽人佣兵团的备品。`);
            await era.printAndWait(`她被绑在马车里，无休止地被侵犯着。`);
            ending = '兽人佣兵团的备品';
          } else {
            await era.printAndWait(
              `${target_name}成为了兽人佣兵团的性处理器。`,
            );
            await era.printAndWait(
              `每天都要为全员进行口交，清洁着大家的阴茎。`,
            );
            ending = '兽人佣兵团的性处理器';
          }
        } else if (route == 2) {
          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            await era.printAndWait(
              `${target_name}在巨魔奴隶的工厂里作为慰安妇而工作着。`,
            );
            await era.printAndWait(
              `${target_name}用那迷人的巨乳，安抚着巨魔们的巨根。`,
            );
            await era.printAndWait(
              `今天也是，工作完之后，巨魔们又在${target_name}面前排起了长队。`,
            );
            ending = '苦力巨魔的慰安妇';
          } else {
            await era.printAndWait(
              `${target_name}在巨魔奴隶的工厂里作为慰安妇而工作着。`,
            );
            await era.printAndWait(
              `有着巨大阴囊的巨魔们，性欲是非常旺盛的，得不到发泄就会捣乱。`,
            );
            await era.printAndWait(
              `${target_name}被镶嵌在墙上，只露出屁股。今天，又会被多少巨根蹂躏呢？`,
            );
            ending = '苦力巨魔的慰安妇';
          }
        } else if (route == 1) {
          if (era.get(`abl:${cid}:3`) >= 3) {
            await era.printAndWait(`${target_name}成为了新媚药的实验体。`);
            await era.printAndWait(
              `肛门被涂上了烈性的新药，令人发疯的快感将她的一切思考能力都吹散了。`,
            );
            ending = '媚药实验体';
          } else {
            await era.printAndWait(`${target_name}成为了新媚药的实验体。`);
            await era.printAndWait(
              `阴蒂被涂上了烈性的新药，一整天都不断地绝顶高潮着。`,
            );
            ending = '媚药实验体';
          }
        } else if (route == 0) {
          if (era.get(`talent:${cid}:204`) == 1) {
            await era.printAndWait(
              `${target_name}作为魔族奴隶，在杂耍小屋里全裸地被戏弄着。`,
            );
            await era.printAndWait(
              `和肮脏的兽人公开做爱，为店里集聚了一点人气。`,
            );
            ending = '杂耍小屋的肉便器';
          } else {
            await era.printAndWait(
              `${target_name}作为魔族奴隶，在杂耍小屋里全裸地被戏弄着。`,
            );
            await era.printAndWait(
              `身体被改造，还穿上了环，刻了刺青，为店里集聚了一点人气。`,
            );
            ending = '杂耍小屋的肉便器';
          }
        }
      }
    } else {
      if (price >= 500000) {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          buyer = '食人魔佣兵团';
          route = 3;
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:207`) == 1
        ) {
          buyer = '半人马的骑士团';
          route = 2;
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          buyer = '牛头人祭司';
          route = 1;
        } else {
          buyer = '兽人富商';
          route = 0;
        }
        await era.printAndWait(`${buyer}买下${target_name}之后………`);
        await era.printAndWait(`………`);
        await era.printAndWait(`……`);
        await era.printAndWait(`…`);

        if (route == 3) {
          if (era.get(`talent:${cid}:75`) == 1) {
            await era.printAndWait(
              `${target_name}作为高级性奴隶，加入了食人魔佣兵团。`,
            );
            await era.printAndWait(
              `食人魔们恋慕着${target_name}，像对圣母一样对待她。`,
            );
            await era.printAndWait(`前任团长手下的战士，则在偷偷地密谋，`);
            await era.printAndWait(
              `通过自己的巨根令${target_name}服从，从而获得佣兵团里更大的权力。`,
            );
            ending = '食人魔佣兵团的高级性奴';
          } else {
            await era.printAndWait(
              `${target_name}作为保镖，加入了食人魔佣兵团。`,
            );
            await era.printAndWait(
              `经验丰富的${target_name}，成为了佣兵团的剑，在前线作战着。`,
            );
            await era.printAndWait(
              `她也不是对食人魔没有性魅力，因此为了不做性奴隶，`,
            );
            await era.printAndWait(
              `${target_name}也常常抢夺女人，用她们来代替自己成为肉便器。`,
            );
            ending = '食人魔佣兵团保镖';
          }
        } else if (route == 2) {
          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            await era.printAndWait(
              `${target_name}作为教职人员，加入了半人马的骑士团。`,
            );
            await era.printAndWait(
              `教导着半人马的孩子们如何做一个合格的战士。`,
            );
            await era.printAndWait(
              `有着巨乳的${target_name}，非常受孩子们的欢迎，经常被缠着要喝母乳。`,
            );
            ending = '半人马的幼教';
          } else {
            await era.printAndWait(
              `${target_name}作为教职人员，加入了半人马的骑士团。`,
            );
            await era.printAndWait(
              `教导着半人马的孩子们如何做一个合格的战士。`,
            );
            await era.printAndWait(
              `作为异种族的${target_name}，早早地就被孩子们舔遍全身，成为了班级里的共用便器了。`,
            );
            ending = '半人马的幼教';
          }
        } else if (route == 1) {
          if (era.get(`talent:${cid}:77`) == 1) {
            await era.printAndWait(
              `${target_name}被牛头人神官作为祭品买回来了。`,
            );
            await era.printAndWait(
              `虽然不需要奉献生命，但是每天都要在祭坛上奉献肛门。`,
            );
            await era.printAndWait(
              `作为奴隶与其它奴隶一起卑微地戴着项圈，通过锁链被连在一起，等待着被侵犯。`,
            );
            ending = '牛头人的性祭品';
          } else {
            await era.printAndWait(
              `${target_name}被牛头人神官作为祭品买回来了。`,
            );
            await era.printAndWait(
              `虽然不需要奉献生命，但是每天都要在祭坛上做爱。`,
            );
            await era.printAndWait(
              `和性欲旺盛的青年疯狂地做爱，如果怀孕了就把孩子当奴隶卖掉。`,
            );

            ending = '牛头人的性祭品';
          }
        } else if (route == 0) {
          if (era.get(`talent:${cid}:204`) == 1) {
            await era.printAndWait(
              `${target_name}作为宴客用的肉便器，在屋子里像家畜似得养着。`,
            );
            if (era.get(`talent:${cid}:121`)) {
              await era.printAndWait(
                `身为扶她的${target_name}被改造出巨根，不停地侵犯着其它的奴隶。`,
              );
            } else {
              await era.printAndWait(
                `被改造成扶她的${target_name}，不停地侵犯着其它的奴隶。`,
              );
            }
            await era.printAndWait(
              `思考能力经过洗脑后完全被性欲所掩盖了，不再考虑射精以外的事情。`,
            );
            ending = '扶她便器';
          } else {
            await era.printAndWait(
              `作为情人被买回来的${target_name}，温顺地服从着自己的主人。`,
            );
            await era.printAndWait(
              `兽人富商溺爱着${target_name}，两人过着幸福的生活。`,
            );
            await era.printAndWait(
              `没过多久，她就爱上了兽人富商，子宫里孕育着半兽人的婴儿。`,
            );
            ending = '兽人的情人';
          }
        }
      } else if (price >= 100000) {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          buyer = '六头海蛇的联防队';
          route = 3;
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:207`) == 1
        ) {
          buyer = '黑暗精灵的学校';
          route = 2;
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          buyer = '魔像的大农场';
          route = 1;
        } else {
          buyer = '哥布林赌场';
          route = 0;
        }
        await era.printAndWait(`${buyer}买下${target_name}之后………`);
        await era.printAndWait(`………`);
        await era.printAndWait(`……`);
        await era.printAndWait(`…`);

        if (route == 3) {
          if (era.get(`abl:${cid}:2`) >= 5) {
            await era.printAndWait(
              `${target_name}作为六头海蛇联防队的外雇战士被雇佣了。`,
            );
            await era.printAndWait(
              `工作结束后，${target_name}总会被战斗心激昂的六头海蛇抓去泄欲。`,
            );
            ending = '六头海蛇的联防队外籍战士';
          } else {
            await era.printAndWait(
              `${target_name}作为六头海蛇联防队的杂役被雇佣了。`,
            );
            await era.printAndWait(
              `被命令打磨铠甲的${target_name}，如果工作有怠慢，屁股就会挨鞭子。`,
            );
            ending = '六头海蛇的联防队的打杂';
          }
        } else if (route == 2) {
          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            await era.printAndWait(`${target_name}在黑暗精灵的中学做备品。`);
            await era.printAndWait(
              `拥有漂亮巨乳的${target_name}，在肉体改造的实验课上，被作为实验品摆上实验台了。`,
            );
            ending = '黑暗精灵中学的备品';
          } else {
            await era.printAndWait(`${target_name}在黑暗精灵的中学做备品。`);
            await era.printAndWait(
              `在肉体改造的实验课上，被作为实验品摆上实验台了，接下来要进行的是异种交配的控制实验。`,
            );
            ending = '黑暗精灵中学的备品';
          }
        } else if (route == 1) {
          if (era.get(`talent:${cid}:124`)) {
            await era.printAndWait(
              `${target_name}因为外形接近动物，因此作为繁殖用家畜，被饲养在马厩里。`,
            );
            await era.printAndWait(
              `子宫被改造了，现在每三天就能生下一只家畜。`,
            );
            await era.printAndWait(
              `这样的子宫，在分娩的时候，有着产生常人难以理解的快感的副作用，让${target_name}的思考能力接近崩溃了。`,
            );
            ending = '繁殖用家畜奴隶';
          } else {
            await era.printAndWait(`${target_name}在农场里照看牲口。`);
            await era.printAndWait(
              `所谓的牲口，其实也是被家畜化改造过的肉便器。肥大化的乳房，方便被榨乳。`,
            );
            await era.printAndWait(
              `有时，为了检查牲口是否健康，要把手伸进她们的肛门里，这时候，肉便器们的娇喘总是此起彼伏着。`,
            );
            ending = '家畜便器的管理员';
          }
        } else if (route == 0) {
          if (era.get(`talent:${cid}:204`) == 1) {
            await era.printAndWait(
              `作为肉便器的${target_name}，主持着赌场里受欢迎的赌局。`,
            );
            await era.printAndWait(
              `哥布林们投注后，各自把精液装在一排的酒杯里，让${target_name}喝掉，然后猜哪杯是谁的。`,
            );
            await era.printAndWait(
              `被猜中的那个哥布林，就能独得所有人的投注。`,
            );
            ending = '赌场的玩具';
          } else {
            await era.printAndWait(
              `${target_name}在赌场里穿着兔女郎装做荷官。`,
            );
            await era.printAndWait(
              `如果客人赢了，就能获得${target_name}的一次口交。`,
            );
            await era.printAndWait(`因此，她的那桌总是很受欢迎，排着长队。`);
            ending = '赌场的兔女郎';
          }
        }
      } else {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          buyer = '兽人的公共澡堂';
          route = 3;
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:207`) == 1
        ) {
          buyer = '巨魔的奴隶主';
          route = 2;
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          buyer = '黑暗精灵的大学生';
          route = 1;
        } else {
          buyer = '哥布林的村庄';
          route = 0;
        }
        await era.printAndWait(`${buyer}买下${target_name}之后………`);
        await era.printAndWait(`………`);
        await era.printAndWait(`……`);
        await era.printAndWait(`…`);

        if (route == 3) {
          if (era.get(`abl:${cid}:2`) >= 5) {
            await era.printAndWait(`${target_name}在公共澡堂里为兽人们按摩。`);
            await era.printAndWait(
              `如果在${target_name}的手法下勃起了的话，只要加一点钱就能狠操${target_name}一顿。`,
            );
            ending = '公共浴场的按摩师';
          } else {
            await era.printAndWait(`${target_name}在公共澡堂里为兽人们按摩。`);
            await era.printAndWait(
              `虽然经常累得肩膀生痛，但很受客人们的好评。`,
            );
            ending = '公共浴场的按摩师';
          }
        } else if (route == 2) {
          if (
            era.get(`talent:${cid}:61`) == 1 ||
            era.get(`talent:${cid}:62`) == 1
          ) {
            await era.printAndWait(`${target_name}被当做巨魔奴隶的清洁工。`);
            await era.printAndWait(
              `${target_name}每天都要用身体，漂亮地擦干净那些脏得不行的巨魔们的屁股。`,
            );
            ending = '苦力巨魔的慰安妇';
          } else {
            await era.printAndWait(`${target_name}被当做巨魔奴隶的清洁工。`);
            await era.printAndWait(
              `${target_name}每天都要用湿毛巾把那些不愿洗澡的巨魔们擦干净。`,
            );
            ending = '苦力巨魔的慰安妇';
          }
        } else if (route == 1) {
          if (era.get(`talent:${cid}:315`) == 1) {
            await era.printAndWait(
              `黑暗精灵的大学生，居然是${target_name}原来的同学。`,
            );
            await era.printAndWait(`结果，两人结婚了，过着幸福的生活。`);
            ending = '黑暗精灵学生的妻子';
          } else {
            await era.printAndWait(
              `黑暗精灵的大学生，把${target_name}当做宿舍里的共用便器。`,
            );
            await era.printAndWait(`结果那间宿舍，每天都有很多人来串门。`);
            ending = '黑暗精灵学生的宿舍便器';
          }
        } else if (route == 0) {
          if (era.get(`talent:${cid}:204`) == 1) {
            await era.printAndWait(
              `${target_name}作为生育便器被哥布林们宠爱着。`,
            );
            await era.printAndWait(
              `据说学会了哥布林的语言，幸福地为它们生下了孩子。`,
            );
            ending = '哥布林的生育便器';
          } else {
            await era.printAndWait(
              `${target_name}作为打杂受到了哥布林们的喜爱。`,
            );
            await era.printAndWait(
              `据说学会了哥布林的语言，过着平淡而又幸福的生活。`,
            );
            ending = '哥布林的打杂';
          }
        }
      }
    }
  }

  if (family_id >= 0) {
    chara(family_id).event.家人末路 = `${ending}${target_name}`;
  }
  era.set('tstr:30', `${ending}${target_name}`);

  await era.print('');
  await era.printAndWait(
    `就这样，${master_name}和${target_name}再也没有见面……`,
  );
  await era.print('');
  video_maturo(cid);
  return 0;
}

// @SELL_MATURO_K2_<n>（:225-297）：15 个纯输出函数照原作合为一张表。
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

/** @SELL_MATURO_K2_<n>：原作 15 个纯输出函数的统一分发入口。 */
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

/** @SELL_MATURO_K2（:9-224）：宠物市场的牝犬末路。 */
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

module.exports = {
  sell_maturo_k1,
  sell_maturo_k2,
  sell_maturo_k2_branch,
};
