/**
 * @file 成熟奴隶出售后的黑市末路（issue #338）。
 *
 * 售价优先取出售流程留下的估价（peek_sale_price），缺省用 estimate_chara 重算。
 * 市场菜单的 1000 号输入翻转 EXFLAG:9000 第 2 位（水晶球录像开关）。
 * 代词一律按被出售角色（各函数实参 cid）的 TALENT:122 取「他/她」。
 *
 * 变量语义：MARK 下标 3 = 反抗刻印；CFLAG 下标 9 = 等级、605 = 压缩
 * 家族关系；ABL 下标 2/3/15 = 私处/肛门感觉/话术；TALENT 下标 75-77/
 * 85 = 性爱狂/淫乱/尻穴狂/爱慕，110/114/119 = 巨乳/爆乳/超乳，122 =
 * 男人，200-207 = 八类职业，204 = 肉便器，314 = 种族；CSTR 下标 5 =
 * 家人的末路记录；TSTR 下标 30 = VIDEO_MATURO 消费的录像标题暂存。
 */

'use strict';

const era = require('#/era-electron');
const { peek_sale_price } = require('#/event/event-aftertrain');
const { search_family } = require('#/chara/chara-family');
const { chara } = require('#/facade/chara');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { chara_callname, chara_name } = require('#/utils/callname-utils');

function she(id) {
  return (era.get(`talent:${id}:122`) || 0) !== 0 ? '他' : '她';
}

function print_market_menu() {
  era.print('要卖到哪个市场？');
  era.printButton('魔界的黑市', 0);
  era.printButton('魔界的异族交易市场', 1);
  era.printButton('魔界的宠物市场', 2);
  era.printButton('找什么市场？随手卖掉吧！！', 999);
  era.printButton('水晶球记录', 1000, {
    color: era_exflag.mod_switch_bits & 4 ? '#ffffff' : '#646464',
  });
}

async function choose_market(cid, price, rand) {
  let redraw = true;
  for (;;) {
    if (redraw) print_market_menu();
    redraw = false;
    const result = await era.input();
    if (result < 0 || (result >= 3 && result !== 999 && result !== 1000)) {
      continue;
    }
    if (result === 999) return true;
    if (result === 1000) {
      era_exflag.mod_switch_bits ^= 4;
      redraw = true;
      continue;
    }
    if (result === 1) {
      const { sell_maturo_k1 } = require('#/system/stronghold/sell-maturo');
      await sell_maturo_k1(cid, { price, rand });
      return true;
    }
    if (result === 2) {
      const { sell_maturo_k2 } = require('#/system/stronghold/sell-maturo');
      await sell_maturo_k2(cid, { price });
      return true;
    }
    return false;
  }
}

/** sell_maturo_k0：市场选择与黑市末路。 */
async function sell_maturo_k0(cid = era_flag.target, { price, rand } = {}) {
  const { estimate_chara } = require('#/system/stronghold/sale');
  const { video_maturo } = require('#/system/stronghold/sell-video');
  price ??= peek_sale_price() || estimate_chara(cid).price;
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target_name = chara_callname(cid);
  const master_name = chara_name(0);
  let buyer = '';
  let route = 0;
  let ending = '';

  if (await choose_market(cid, price, rand_n)) return 0;

  if (era.get(`mark:${cid}:3`) == 3) {
    if (era.get(`talent:${cid}:314`) == 9) {
      if (price >= 100000) {
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

        if (route == 1) {
          if (era.get(`cflag:${cid}:9`) >= 50) {
            await era.printAndWait(
              `${target_name}作为死斗场的角斗士在战斗着。`,
            );
            await era.printAndWait(
              `貌似经历了许多相当严苛的死斗，依然活下来了。`,
            );
            await era.printAndWait(
              `如果让主办者不尽兴的话，也许很快就会不明不白地死掉吧。`,
            );
            ending = '角斗士';
          } else {
            await era.printAndWait(
              `${target_name}在奴隶船上叫醒了其它奴隶，发动了叛乱。`,
            );
            await era.printAndWait(
              `但是起义却被其它的奴隶背叛，被轻易地镇压了。`,
            );
            await era.printAndWait(`作为惩罚，貌似被丢海里喂鱼了……`);
            ending = '鲨鱼的食物';
          }
        } else if (route == 0) {
          if (
            era.get(`talent:${cid}:202`) == 1 ||
            era.get(`talent:${cid}:206`) == 1
          ) {
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
            await era.printAndWait(
              `这种悲惨而痛苦的生活，应该一生都无法摆脱了……`,
            );
            ending = '苦力奴隶';
          }
        }
      } else {
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
        if (route == 1) {
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
            await era.printAndWait(
              `右脚的脚跟被挑断了，其它奴隶看得心惊胆颤。`,
            );
            era.setColor('#990000');
            await era.printAndWait(`「这样，以后都别想逃跑了…」`);
            era.setColor();
            ending = '瘸子奴隶';
          }
        } else if (route == 0) {
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
            await era.printAndWait(
              `数小时后，${she(cid)}的手脚都被截肢，弄成人棍了。`,
            );
            await era.printAndWait(
              `猎奇收藏家觉得不错，马上把${she(cid)}买走了……`,
            );
            ending = '生物标本';
          }
        }
      }
    } else {
      if (price >= 100000) {
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

        if (route == 2) {
          era.setColor('#990000');
          await era.printAndWait(
            `「客人客人！过来看过来挑啊！这里可是有好东西哦！？」`,
          );
          era.setColor();
          await era.printAndWait(
            `被叫住的客人是和贩子相熟的商人，被引入帐篷里了。`,
          );
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
        } else if (route == 1) {
          await era.printAndWait(`${target_name}作为死斗场的角斗士在战斗着。`);

          if (era.get(`cflag:${cid}:9`) >= 100) {
            await era.printAndWait(
              `和其它角斗士一起发动了叛乱，最后被镇压了。`,
            );
            await era.printAndWait(
              `作为主谋的${target_name}一直行踪不明，无法处置。`,
            );
            await era.printAndWait(
              `而其它在叛乱中被生擒的角斗士，全部拿去喂猛兽了。`,
            );
          } else {
            await era.printAndWait(
              `和其它角斗士一起发动了叛乱，最后被镇压了。`,
            );
            await era.printAndWait(`作为主谋的${target_name}要因此接受惩罚。`);
            await era.printAndWait(`成为了死斗场中冠军猛兽的食物。`);
          }
          ending = '角斗士';
        } else if (route == 0) {
          if (
            era.get(`talent:${cid}:202`) == 1 ||
            era.get(`talent:${cid}:206`) == 1
          ) {
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
            await era.printAndWait(
              `在那之后，就再也没有听到${target_name}的消息。`,
            );
            ending = '划桨奴隶';
          }
        }
      } else {
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
        if (route == 1) {
          if (rand_n(2) == 0) {
            era.setColor('#990000');
            await era.printAndWait(`「哈哈～像你这种沉默不语的最可爱了！」`);
            era.setColor();
            await era.printAndWait(
              `即将对${target_name}进行手术的男人笑着说。`,
            );
            await era.printAndWait(
              `${she(cid)}的手肘及膝盖以下都被切除，换成金属的替代品。`,
            );
            await era.printAndWait(
              `完全没有听到任何的抗议，因为舌头已经被拔掉了。`,
            );
            era.setColor('#990000');
            await era.printAndWait(`「呃呃，这张桌子，应该能卖个好价钱………」`);
            era.setColor();
            ending = '活着的桌子';
          } else {
            era.setColor('#990000');
            await era.printAndWait(`「哈哈～像你这种沉默不语的最可爱了！」`);
            era.setColor();
            await era.printAndWait(
              `即将为${target_name}进行手术的男人笑着说。`,
            );
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
        } else if (route == 0) {
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
            await era.printAndWait(
              `数小时后，${she(cid)}的手脚都被截肢，弄成人棍了。`,
            );
            await era.printAndWait(
              `猎奇收藏家觉得不错，马上把${she(cid)}买走了……`,
            );
            ending = '生物标本';
          }
        }
      }
    }
  } else if (era.get(`talent:${cid}:85`)) {
    if (era.get(`talent:${cid}:314`) == 9) {
      if (price >= 1000000) {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
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

        if (route == 3) {
          if (era.get(`talent:${cid}:75`) == 1) {
            await era.printAndWait(
              `${target_name}的蜜壶，不管被怎么粗暴对待都只会产生快感。私处紧紧地按摩着将军的阴茎，让他也快感连连。`,
            );
            await era.printAndWait(
              `迷人的肉体以及作为原勇者的经历，也是将军非常中意的地方。`,
            );
            await era.printAndWait(
              `原来只是打算买个性奴隶，现在渐渐变得像是爱人了。`,
            );
          } else {
            await era.printAndWait(`将军对${target_name}的肉穴相当粗暴。`);
            await era.printAndWait(
              `作为性奴隶，每晚都被狠狠侵犯，像是要玩坏一般。`,
            );
            await era.printAndWait(
              `只靠作为原勇者的耐久力，恐怕被玩坏也只是时间问题了吧。`,
            );
          }
          ending = '性奴隶';
        } else if (route == 2) {
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
            await era.printAndWait(
              `${target_name}在屋里做着女仆和情人的工作。`,
            );
            await era.printAndWait(
              `每天都过着只要主人高兴就会被叫到房里做爱的生活。`,
            );
            await era.printAndWait(
              `恐怕没几天就会被主人干到怀孕，不过应该也会被勒令堕胎吧。`,
            );
          }
          ending = '魔界贵族的情人';
        } else if (route == 1) {
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
        } else if (route == 0) {
          if (era.get(`abl:${cid}:15`) >= 5) {
            await era.printAndWait(
              `${target_name}在枕边经常妙语连珠，让土豪决定把${she(cid)}当成秘书。`,
            );
            await era.printAndWait(
              `机智的交涉及性感的身体，为主人带来了不少好处。`,
            );
            await era.printAndWait(
              `每晚，从客厅里都不断传出被主人和客人疼爱的呻吟。`,
            );
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
        }
      } else if (price >= 500000) {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
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

        if (route == 3) {
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
            await era.printAndWait(
              `原来作为战士的本领得以发挥，过着保镖一样的生活。`,
            );
            await era.printAndWait(`作为首领的爱人，也习惯了被每天疼爱着。`);
            ending = '黑老大的情人';
          }
        } else if (route == 2) {
          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            await era.printAndWait(
              `${target_name}在女仆长的指示下在屋子里帮忙收拾。`,
            );
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
            await era.printAndWait(
              `在主人玩够之前，这种生活还要不停地持续着。`,
            );
            ending = '领主的玩物';
          }
        } else if (route == 1) {
          if (era.get(`talent:${cid}:77`) == 1) {
            await era.printAndWait(
              `神殿新设置了堕落神的贡品，${target_name}作为奴隶要为神殿献出身心。`,
            );
            await era.printAndWait(
              `被络绎不绝的信徒们侵犯肛门多次，${target_name}淫媚的呻吟越来越大声了。`,
            );
            await era.printAndWait(
              `好像这样子就能让堕落神高兴似得，不断奉献着。`,
            );
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
        } else if (route == 0) {
          if (era.get(`talent:${cid}:204`) == 1) {
            await era.printAndWait(
              `${target_name}作为员工们的肉便器被放置在公司。`,
            );
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
        }
      } else if (price >= 100000) {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
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

        if (route == 3) {
          if (era.get(`talent:${cid}:75`) == 1) {
            await era.printAndWait(
              `士官在战场上立功了，用奖金买下了${target_name}。`,
            );
            await era.printAndWait(
              `被年轻士官推倒的时候，${target_name}终于有被卖了的自觉。`,
            );
            await era.printAndWait(
              `士官沉迷于${target_name}舒服的私处感触里了。`,
            );
          } else {
            await era.printAndWait(
              `士官在战场上立功了，用奖金买下了${target_name}。`,
            );
            await era.printAndWait(
              `被年轻士官推倒的时候，${target_name}终于有被卖了的自觉。`,
            );
            await era.printAndWait(
              `在因被侵犯而泪流满面的奴隶身上，年轻的士官终于成为了大人了。`,
            );
          }
          ending = '士官的性奴';
        } else if (route == 2) {
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
            await era.printAndWait(
              `经常作为交配用的实验动物，被实验室所征用。`,
            );
            await era.printAndWait(
              `如果能产生什么新物种的话，整个实验小组会被你传召嘉奖也说不定。`,
            );
            ending = '异种交配实验体';
          }
        } else if (route == 1) {
          if (era.get(`talent:${cid}:77`) == 1) {
            await era.printAndWait(
              `大农场主在买农奴的时候顺便买下了${target_name}。`,
            );
            await era.printAndWait(
              `最初品尝过${she(cid)}的肛门之后，被预想以外的快感所震惊，因而每晚都要侵犯${she(cid)}。`,
            );
            await era.printAndWait(
              `被巨大阴茎连续侵犯的结果，就是${she(cid)}现在只能摊在床上，还略带有脱肛。`,
            );
          } else {
            await era.printAndWait(
              `大农场主在买农奴的时候顺便买下了${target_name}。`,
            );
            await era.printAndWait(
              `也说不出到底喜欢${she(cid)}哪里，但是依然像对妻子一样温柔地对待${she(cid)}。`,
            );
            await era.printAndWait(
              `接受了主人精液的${target_name}怀孕了，临盘也快了。`,
            );
          }
          ending = '大农场主的性奴隶';
        } else if (route == 0) {
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
        }
      } else {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
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

        if (route == 3) {
          if (era.get(`talent:${cid}:75`) == 1) {
            await era.printAndWait(
              `${target_name}作为开矿奴隶的慰问品被饲养着。`,
            );
            await era.printAndWait(
              `连续被侵犯几次都不屈服。「再这么下去真是一点都不可爱」`,
            );
          } else {
            await era.printAndWait(
              `${target_name}作为开矿奴隶的慰问品被饲养着。`,
            );
            await era.printAndWait(`好几次都因被侵犯而嚎啕大哭。`);
          }
          ending = '矿山性奴';
        } else if (route == 2) {
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
        } else if (route == 1) {
          if (era.get(`talent:${cid}:77`) == 1) {
            await era.printAndWait(
              `${target_name}和其它几个奴隶作为农奴被买下了。`,
            );
            await era.printAndWait(
              `不过，农场主在试过${she(cid)}舒服的肛门之后上瘾了。`,
            );
            await era.printAndWait(`现在作为专用性奴隶而存在着。`);
            ending = '农场主的性奴';
          } else {
            await era.printAndWait(
              `${target_name}和其它几个奴隶作为农奴被买下了。`,
            );
            await era.printAndWait(
              `为了不让其它农奴逃跑，强制让${she(cid)}做了农奴们的共同妻子，每晚都被好几个男人侵犯着。`,
            );
            ending = '农奴的共妻';
          }
        } else if (route == 0) {
          if (era.get(`talent:${cid}:204`) == 1) {
            await era.printAndWait(`作为现役肉便器继续侍奉着。`);
            await era.printAndWait(
              `${target_name}在相当长的时间内作为公众肉便器被广大市民所疼爱。`,
            );
            await era.printAndWait(
              `在被精液淹死之前，好像生下了不下一百个的孩子。`,
            );
          } else {
            await era.printAndWait(
              `${target_name}作为公众肉便器不分昼夜地被使用着。`,
            );
            await era.printAndWait(`过于残酷的生活让${she(cid)}精神崩溃了。`);
            await era.printAndWait(`到最后，从灵魂到身体，都彻底坏掉了。`);
          }
          ending = '肉便器';
        }
      }
    } else {
      if (price >= 1000000) {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
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

        if (route == 3) {
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
            await era.printAndWait(
              `作为性奴隶，每晚都被狠狠侵犯，像是要玩坏一般。`,
            );
            await era.printAndWait(
              `如果真被玩坏了的话，将军的屋里可能又要多一具标本了吧。`,
            );
          }
          ending = '魔界将军的性奴';
        } else if (route == 2) {
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
        } else if (route == 1) {
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
        } else if (route == 0) {
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
            await era.printAndWait(
              `作为土豪宠物的${target_name}，对主人相当顺从。`,
            );
            await era.printAndWait(
              `土豪的众多孩子们也很喜欢可爱的${she(cid)}，作为宠物被多次弄怀孕并分娩了。`,
            );
            await era.printAndWait(
              `${she(cid)}已经得到了作为宠物的最高幸福了吧。`,
            );
            ending = '土豪的宠物';
          }
        }
      } else if (price >= 500000) {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
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

        if (route == 3) {
          if (era.get(`talent:${cid}:203`) == 1) {
            await era.printAndWait(
              `${target_name}作为顺从的宠物与主人一起努力着。`,
            );
            await era.printAndWait(
              `以前也试过多次逃走，但是发现奴隶项圈和奴隶手铐根本无法靠自己取下来之后变得老实了。`,
            );
            await era.printAndWait(
              `主人对这样的${target_name}非常疼爱，给予了${she(cid)}比较宽松的自由。`,
            );
          } else {
            await era.printAndWait(
              `${target_name}作为顺从的宠物与主人一起努力着。`,
            );
            await era.printAndWait(
              `因为身体已经堕落了，${target_name}完全记不起自己曾经身为勇者。`,
            );
            await era.printAndWait(`被主人践踏也会产生快感。`);
          }
          ending = '驯化的宠物';
        } else if (route == 2) {
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
            await era.printAndWait(
              `接待了不同种族的不少客人，甚至取得了广泛的好评。`,
            );
            await era.printAndWait(
              `生下了几个孩子。在宅邸里被男仆和女仆们共同抚养着。`,
            );
            ending = '宴客肉被子';
          }
        } else if (route == 1) {
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
        } else if (route == 0) {
          if (era.get(`talent:${cid}:204`) == 1) {
            await era.printAndWait(
              `${target_name}作为员工们的肉便器被放置在公司。`,
            );
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
        }
      } else if (price >= 100000) {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
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

        if (route == 3) {
          if (era.get(`talent:${cid}:75`) == 1) {
            await era.printAndWait(
              `士官将第一次军功的奖金，交给了${target_name}，`,
            );
            await era.printAndWait(
              `对年轻的士官来说，与其说是性奴隶，不如说是可爱的恋人更为贴切。`,
            );
            await era.printAndWait(
              `看着每晚都服侍自己阴茎的${she(cid)}，士官对${target_name}越来越爱怜了。`,
            );
          } else {
            await era.printAndWait(
              `士官将第一次军功的奖金，交给了${target_name}，`,
            );
            await era.printAndWait(
              `对年轻的士官来说，与其说是性奴隶，不如说是可爱的恋人更为贴切。`,
            );
            await era.printAndWait(
              `并未完全屈服的${target_name}，每天都半推半就地被士官品尝着身体。`,
            );
          }
          ending = '士官的性奴';
        } else if (route == 2) {
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
        } else if (route == 1) {
          if (era.get(`talent:${cid}:77`) == 1) {
            await era.printAndWait(
              `大农场主在买农奴的时候顺便买下了${target_name}。`,
            );
            await era.printAndWait(`过着谁都可以将其玩弄的奴隶生活。`);
            await era.printAndWait(
              `被巨大阴茎连续侵犯的结果，就是${she(cid)}现在只能摊在床上，还略带有脱肛。`,
            );
            ending = '农场主的菊奴';
          } else {
            await era.printAndWait(
              `大农场主在买农奴的时候顺便买下了${target_name}。`,
            );
            await era.printAndWait(
              `作为给大农场主儿子们的礼物，${target_name}被彻底地玩弄着，怀孕了。`,
            );
            await era.printAndWait(`据说现在作为所有人的生育奴隶被疼爱着。`);
            ending = '农场主的性奴';
          }
        } else if (route == 0) {
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
        }
      } else {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
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

        if (route == 3) {
          if (era.get(`talent:${cid}:75`) == 1) {
            await era.printAndWait(
              `${target_name}作为开矿奴隶的慰问品被饲养着。`,
            );
            await era.printAndWait(
              `连续被侵犯几次都未屈服。于是侵犯变得越来越粗暴了。`,
            );
          } else {
            await era.printAndWait(
              `${target_name}作为开矿奴隶的慰问品被饲养着。`,
            );
            await era.printAndWait(
              `好几次被侵犯时都嚎啕大哭，矿工们觉得很有意思，令${she(cid)}相当受欢迎。`,
            );
          }
          ending = '矿山性奴';
        } else if (route == 2) {
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
        } else if (route == 1) {
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
        } else if (route == 0) {
          if (era.get(`talent:${cid}:204`) == 1) {
            await era.printAndWait(`作为现役肉便器继续侍奉着。`);
            await era.printAndWait(
              `${target_name}在相当长的时间内作为公众肉便器被广大市民所疼爱。`,
            );
            await era.printAndWait(`好像生下了不下一百个的孩子。`);
          } else {
            await era.printAndWait(
              `${target_name}作为公众肉便器不分昼夜地被使用着。`,
            );
            await era.printAndWait(`过于残酷的生活让${she(cid)}精神崩溃了。`);
            await era.printAndWait(
              `多次呐喊着曾经作为主人的你的名字，最后终于完全坏掉了。`,
            );
          }
        }
        ending = '肉便器';
      }
    }
  } else if (era.get(`talent:${cid}:76`)) {
    if (era.get(`talent:${cid}:314`) == 9) {
      if (price >= 1000000) {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
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

        if (route == 3) {
          if (era.get(`cflag:${cid}:9`) >= 100) {
            await era.printAndWait(
              `${target_name}据闻和一个山间小国的君主结婚了。`,
            );
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
        } else if (route == 2) {
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
        } else if (route == 1) {
          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            await era.printAndWait(
              `成熟了的淫乱魔族的肉体，是堕落神最好的祭品之一。`,
            );
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
        } else if (route == 0) {
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
        }
      } else if (price >= 500000) {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
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

        if (route == 3) {
          if (era.get(`cflag:${cid}:9`) >= 50) {
            await era.printAndWait(
              `${target_name}现在作为主人的保镖兼情人生活着。`,
            );
            await era.printAndWait(
              `即使已经堕落了，原勇者的战斗力也是不容小视的。`,
            );
            await era.printAndWait(
              `发情生疼的淫靡肉体，也每晚都被主人疼爱着。`,
            );
            ending = '高级将校的保镖';
          } else {
            await era.printAndWait(`${target_name}现在作为主人的情人生活着。`);
            await era.printAndWait(
              `淫媚的肉体，每晚都接受着主人过剩性欲的糟蹋。`,
            );
            await era.printAndWait(
              `至今为止已经玩坏了许多奴隶的主人，貌似终于找到一个可以承受他日夜征讨的性奴隶了。`,
            );
            ending = '高级将校的情人';
          }
        } else if (route == 2) {
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
            await era.printAndWait(
              `似乎只要给够钱，不管什么人都可以同度春宵的样子。`,
            );
            ending = '高级酒馆的女侍应';
          } else {
            await era.printAndWait(
              `${target_name}每晚都参加舞台上各式各样的表演。`,
            );
            await era.printAndWait(
              `从钢管舞到轮奸，从兽奸到分娩秀，什么玩法都表演过了。`,
            );
            await era.printAndWait(
              `现在，孩子都长大，还被轮奸出孙子了，但依然保持着妖艳的肉体。`,
            );
            ending = '高级酒馆的表演者';
          }
        } else if (route == 1) {
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
            await era.printAndWait(
              `在信徒中有着高人气，每次都同时被好几人狠狠玩弄。`,
            );
            await era.printAndWait(
              `不过，看起来貌似对这样的生活感到很幸福的样子。`,
            );
            ending = '堕落神的性奴';
          }
        } else if (route == 0) {
          if (era.get(`talent:${cid}:204`) == 1) {
            await era.printAndWait(
              `作为肉便器被放置在屋子的厕所里，无论主人、客人还是佣人，男女老少都可以使用。`,
            );
            await era.printAndWait(
              `特意请人来负责肉便器${target_name}的清洁及维护工作。`,
            );
            await era.printAndWait(
              `每使用一次都进行一遍保养，主人就是想得这么周到。`,
            );
            ending = '肉便器';
          } else {
            await era.printAndWait(
              `${target_name}的手脚都被砍断了，作为主人的抱枕而存在着。`,
            );
            await era.printAndWait(
              `为了照顾这样的抱枕，特意雇佣了一个女仆来负责。`,
            );
            await era.printAndWait(
              `作为抱枕，好像有着无论被侵犯多少次都不够的样子。`,
            );
            ending = '好事者的抱枕';
          }
        }
      } else if (price >= 100000) {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
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

        if (route == 3) {
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
        } else if (route == 2) {
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
        } else if (route == 1) {
          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            await era.printAndWait(
              `贩毒的黑帮在自己经营的黑酒吧里，也流通着毒品。`,
            );
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
            await era.printAndWait(
              `贩毒的黑帮在自己经营的黑酒吧里，也流通着毒品。`,
            );
            await era.printAndWait(
              `${target_name}平常只是做一般的服务员，有时也会被一些嗑药嗑高了，或者喝多了的客人侵犯。`,
            );
            await era.printAndWait(`不过${she(cid)}也挺享受这种偶发事件的。`);
            ending = '黑酒吧的女侍应';
          }
        } else if (route == 0) {
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
        }
      } else {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
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

        if (route == 3) {
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
        } else if (route == 2) {
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
        } else if (route == 1) {
          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            await era.printAndWait(
              `${target_name}被安排在量产触手的触手小屋里，`,
            );
            await era.printAndWait(`不知培养了多少触手，也许成百上千了。`);
            await era.printAndWait(
              `特别是膨胀到原来两倍大小的惊人豪乳所培养出来的触手更是价值连城。`,
            );
            ending = '触手的苗床';
          } else {
            await era.printAndWait(
              `${target_name}被安排在量产触手的触手小屋里，`,
            );
            await era.printAndWait(`不知培养了多少触手，也许成百上千了。`);
            await era.printAndWait(
              `完全适应了作为触手的母体，看来这样的生活会持续到${she(cid)}死去的那一天。`,
            );
            ending = '触手的苗床';
          }
        } else if (route == 0) {
          if (era.get(`talent:${cid}:204`) == 1) {
            await era.printAndWait(
              `被锁在公厕里的${target_name}，作为公众肉便器开始了无休止的侍奉。`,
            );
            await era.printAndWait(
              `被无尽的男人们侵犯，只是最普通的日常罢了。`,
            );
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
        }
      }
    } else {
      if (price >= 1000000) {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
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

        if (route == 3) {
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
            await era.printAndWait(
              `据说引导了主流舆论，组成了相当规模的大军。`,
            );
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
        } else if (route == 2) {
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
            await era.printAndWait(
              `实际上，${target_name}没用多久，就成为了头牌。`,
            );
            ending = '高级娼妇';
          }
        } else if (route == 1) {
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
            await era.printAndWait(
              `作为堕落神的教徒，会享受到一生的无尽快感吧。`,
            );
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
        } else if (route == 0) {
          if (era.get(`talent:${cid}:204`) == 1) {
            await era.printAndWait(
              `被做了手术，${target_name}作为肉便器被放在屋里。`,
            );
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
        }
      } else if (price >= 500000) {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
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

        if (route == 3) {
          if (era.get(`cflag:${cid}:9`) >= 50) {
            await era.printAndWait(
              `${target_name}被主人卓越的调教弄得彻底堕落了，然后被编入了魔界军。`,
            );
            await era.printAndWait(
              `原勇者的实力，让${she(cid)}得心应手地指挥着部队。`,
            );
            await era.printAndWait(
              `${she(cid)}的部队据说有着非常凶悍的炮友亲卫队，用疯狂的战斗热情让其它部队都感到颤抖。`,
            );
            ending = '魔界的士官';
          } else {
            await era.printAndWait(`作为主人的其中一个新奴隶住在屋子里。`);
            await era.printAndWait(
              `在宅邸里，还有几个其它种族的奴隶的照料着主人。`,
            );
            await era.printAndWait(
              `${target_name}发挥领导人的才智，把大家团结起来，互助互爱，因而得到了主人的认可，成为了奴隶长。`,
            );
            ending = '高级将校的奴隶';
          }
        } else if (route == 2) {
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
        } else if (route == 1) {
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
              `而且，生出的孩子也被神殿所重视，重点培养了。`,
            );
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
        } else if (route == 0) {
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
        }
      } else if (price >= 100000) {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
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

        if (route == 3) {
          if (era.get(`abl:${cid}:2`) >= 5) {
            await era.printAndWait(`${target_name}作为干部的情妇生活着。`);
            await era.printAndWait(
              `${target_name}在干部的卓越调教下堕落了，利用${she(cid)}来操纵着部下。`,
            );
            await era.printAndWait(`被放到别墅里，每晚都侍奉着不同的男人。`);
            ending = '黑社会的情妇';
          } else {
            await era.printAndWait(
              `${target_name}作为虐待狂干部的情妇生活着。`,
            );
            await era.printAndWait(
              `${she(cid)}最开始也为此困惑过，不过夜晚的生活比想象中的更充实、更令${she(cid)}满足。`,
            );
            await era.printAndWait(
              `每晚的过激玩法，让${target_name}彻底沉迷于这种快乐。`,
            );
            ending = '黑社会的情妇';
          }
        } else if (route == 2) {
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
        } else if (route == 1) {
          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            await era.printAndWait(
              `贩毒的黑帮在自己经营的黑酒吧里，也流通着毒品。`,
            );
            await era.printAndWait(
              `${target_name}被喂食了特制的母乳果实，双峰分泌出特殊的母乳了。`,
            );
            await era.printAndWait(
              `有着强力陶醉效果的母乳，如果不定期榨取，母体本身都会因此疯掉。`,
            );
            await era.printAndWait(
              `现在一直恳求被侵犯的同时，也恳求着客人来挤奶。`,
            );
            ending = '黑酒馆的瘾君子';
          } else {
            await era.printAndWait(
              `贩毒的黑帮在自己经营的黑酒吧里，也流通着毒品。`,
            );
            await era.printAndWait(
              `${target_name}完全沉迷在毒品带来的快乐中，彻底上瘾了。整天发出甘甜、妖艳的喘息。`,
            );
            await era.printAndWait(
              `今晚，也在客人胯间努力地用嘴巴吸啜着，一但射出精液，也会满足地一饮而尽。`,
            );
            ending = '黑酒馆的瘾君子';
          }
        } else if (route == 0) {
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
            await era.printAndWait(
              `不过，在那个赌场里，奴隶是可以当作赌注的。`,
            );
            await era.printAndWait(
              `${target_name}因此被作为赌注，在数十个赌徒之间被不停转手着。`,
            );
            ending = '赌场的赠品';
          }
        }
      } else {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
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

        if (route == 3) {
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
        } else if (route == 2) {
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
        } else if (route == 1) {
          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            await era.printAndWait(
              `${target_name}被安排在量产触手的触手小屋里，`,
            );
            await era.printAndWait(
              `被不知道几万的触手侵犯过，头脑都变得不正常了。`,
            );
            await era.printAndWait(
              `曾经漂亮的丰满乳房现在已经彻底变成触手的温床了。`,
            );
          } else {
            await era.printAndWait(
              `${target_name}被安排在量产触手的触手小屋里，`,
            );
            await era.printAndWait(
              `被不知道几万的触手侵犯过，头脑都变得不正常了。`,
            );
            await era.printAndWait(
              `不止是私处，连直肠都无可避免地成为了触手的温床。`,
            );
          }
          ending = '触手的苗床';
        } else if (route == 0) {
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
            await era.printAndWait(
              `各个种族的男人都使用${she(cid)}的身体来处理性欲。`,
            );
            await era.printAndWait(
              `后来，通过了肉便器放置的法案，${target_name}被开放了。直到那天为止，好像为几百人生了孩子。`,
            );
          }
          ending = '公众肉便器';
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

        if (route == 3) {
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
        } else if (route == 2) {
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
              `然后，${target_name}的母乳，总是受到主人的称赞。`,
            );
            ending = '人形奶牛';
          } else {
            await era.printAndWait(`${target_name}被领主送给儿子当新玩具。`);
            await era.printAndWait(
              `那个孩子，有着禁忌的血统的力量，传闻有时候会巨魔化然后捏碎自己的奴隶。`,
            );
            await era.printAndWait(`${she(cid)}的下场，想必不会很好吧。`);
            ending = '领主孩子的玩具';
          }
        } else if (route == 1) {
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
        } else if (route == 0) {
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
        }
      } else if (price >= 100000) {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
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

        if (route == 3) {
          if (era.get(`talent:${cid}:75`) == 1) {
            await era.printAndWait(
              `${target_name}作为奖赏，赏给立了战功的士官。`,
            );
            await era.printAndWait(
              `「这么年轻漂亮的魔族姑娘是我的奴隶」，年轻的士官还不是很适应状况，因而像恋人一样地对待${she(cid)}。`,
            );
            await era.printAndWait(
              `${target_name}积极地回应着主人的疼爱，展露出与年轻的脸不相称的性交上的成熟。`,
            );
          } else {
            await era.printAndWait(
              `${target_name}作为奖赏，赏给立了战功的士官。`,
            );
            await era.printAndWait(`士官对年轻漂亮的魔族姑娘尽情地蹂躏着。`);
            await era.printAndWait(
              `要说为什么的话，刚从战场回来的士官，总是特别粗暴的。`,
            );
          }
          ending = '士官的性奴';
        } else if (route == 2) {
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
        } else if (route == 1) {
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
            await era.printAndWait(
              `邪恶的孩子们，每晚都要狠狠地侵犯${target_name}。`,
            );
            await era.printAndWait(
              `没多长时间，${she(cid)}怀孕了，孩子们对父亲是谁开了一个赌局。`,
            );
          }
          ending = '大农场里的玩具';
        } else if (route == 0) {
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
            await era.printAndWait(
              `作为美丽的魔族奴隶的${she(cid)}，被漂亮地包装着，`,
            );
            await era.printAndWait(`等待着什么时候，会有新主人来把自己带走……`);
            ending = '赌场赠品';
          }
        }
      } else {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
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

        if (route == 3) {
          if (era.get(`abl:${cid}:2`) >= 5) {
            await era.printAndWait(
              `${target_name}作为开矿奴隶的慰问品被饲养着。`,
            );
            await era.printAndWait(
              `连续被侵犯几次都不屈服。「再这么下去真是一点都不可爱」`,
            );
          } else {
            await era.printAndWait(
              `${target_name}作为开矿奴隶的慰问品被饲养着。`,
            );
            await era.printAndWait(
              `好几次在被侵犯都嚎啕大哭。矿工们觉得这很有意思，令${she(cid)}相当受欢迎。`,
            );
          }
          ending = '矿山性奴';
        } else if (route == 2) {
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
        } else if (route == 1) {
          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            await era.printAndWait(
              `${target_name}被安排在量产触手的触手小屋里，`,
            );
            await era.printAndWait(`不知培养了多少触手，也许成百上千了。`);
            await era.printAndWait(
              `特别是膨胀到原来两倍大小的惊人豪乳所培养出来的触手更是价值连城。`,
            );
          } else {
            await era.printAndWait(
              `${target_name}被安排在量产触手的触手小屋里，`,
            );
            await era.printAndWait(`不知培养了多少触手，也许成百上千了。`);
            await era.printAndWait(
              `完全适应了作为触手的母体，看来这样的生活会持续到${she(cid)}死去的那一天。`,
            );
          }
          ending = '触手的苗床';
        } else if (route == 0) {
          if (era.get(`talent:${cid}:204`) == 1) {
            await era.printAndWait(`作为现役肉便器继续侍奉着。`);
            await era.printAndWait(
              `${target_name}在相当长的时间内作为公众肉便器被广大市民所疼爱。`,
            );
            await era.printAndWait(`好像生下了不下一百个的孩子。`);
          } else {
            await era.printAndWait(
              `${target_name}作为公众肉便器不分昼夜地被使用着。`,
            );
            await era.printAndWait(
              `过于残酷的生活让${she(cid)}不到半年便精神崩溃了。`,
            );
          }
          ending = '公众肉便器';
        }
      }
    } else {
      if (price >= 500000) {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
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

        if (route == 3) {
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
        } else if (route == 2) {
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
        } else if (route == 1) {
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
        } else if (route == 0) {
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
        }
      } else if (price >= 100000) {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
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

        if (route == 3) {
          if (era.get(`abl:${cid}:2`) >= 5) {
            await era.printAndWait(`年轻的士官用奖金买下了${target_name}。`);
            await era.printAndWait(
              `作为异族的温驯的美女奴隶，每晚都在疼爱着。`,
            );
            await era.printAndWait(
              `${target_name}热情地接受着新主人的所有欲望。`,
            );
          } else {
            await era.printAndWait(`年轻的士官用奖金买下了${target_name}。`);
            await era.printAndWait(`作为异族的温驯美女奴隶，每晚都在疼爱着。`);
            await era.printAndWait(`${target_name}用悲鸣回应着新主人的欲望。`);
          }
          ending = '士官的性奴';
        } else if (route == 2) {
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
            await era.printAndWait(
              `托了原勇者这个绰头的福，现在这里完全不愁客人了。`,
            );
          } else {
            await era.printAndWait(
              `${target_name}成为了专门收集异族美女的妓院里的奴隶。`,
            );
            await era.printAndWait(
              `为了让${she(cid)}逃跑也跑不远，在肩膀上烙下了烙印，因为过度的疼痛而晕倒了。`,
            );
            await era.printAndWait(
              `托了原勇者这个绰头的福，现在这里完全不愁客人了。`,
            );
          }
          ending = '异种专用娼妇';
        } else if (route == 1) {
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
            await era.printAndWait(
              `实验还在继续，应该能培养出意想不到的新物种吧。`,
            );
            await era.printAndWait(
              `「和魔界猪杂交出来的品种，肉应该会变得更加松软吧。」`,
            );
            ending = '家畜奴隶';
          }
        } else if (route == 0) {
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
        }
      } else {
        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
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

        if (route == 3) {
          if (era.get(`abl:${cid}:2`) >= 5) {
            await era.printAndWait(
              `${target_name}作为开矿奴隶的慰问品被饲养着。`,
            );
            await era.printAndWait(
              `连续被侵犯几次都不屈服。「再这么下去真是一点都不可爱」`,
            );
          } else {
            await era.printAndWait(
              `${target_name}作为开矿奴隶的慰问品被饲养着。`,
            );
            await era.printAndWait(
              `${target_name}好几次在被侵犯时都会嚎啕大哭，矿工们觉得很有意思。这令${she(cid)}相当受欢迎。`,
            );
          }
          ending = '矿山性奴';
        } else if (route == 2) {
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
        } else if (route == 1) {
          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            await era.printAndWait(
              `${target_name}被安排在量产触手的触手小屋里，`,
            );
            await era.printAndWait(`不知培养了多少触手，也许成百上千了。`);
            await era.printAndWait(
              `特别是膨胀到原来两倍大小的惊人豪乳所培养出来的触手更是价值连城。`,
            );
          } else {
            await era.printAndWait(
              `${target_name}被安排在量产触手的触手小屋里，`,
            );
            await era.printAndWait(`不知培养了多少触手，也许成百上千了。`);
            await era.printAndWait(
              `${target_name}已经完全适应了作为触手的母体，看来这样的生活会持续到${she(cid)}死去的那一天。`,
            );
          }
          ending = '触手的苗床';
        } else if (route == 0) {
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
            await era.printAndWait(
              `过于残酷的生活让${she(cid)}不到半年便精神崩溃了。`,
            );
          }
          ending = '公众肉便器';
        }
      }
    }
  }

  const family_id = search_family(cid);
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

module.exports = { sell_maturo_k0 };
