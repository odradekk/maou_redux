/**
 * @file 博物馆处刑（issue #347）。
 *
 * 源: target/ERB/處刑相關/MUSEUM.ERB  @MUSEUM（:2-1107）
 */

'use strict';

const era = require('#/era-electron');
const { name_reset } = require('#/chara/char-make');
const { search_family } = require('#/chara/chara-family');
const { kojo_handler_id, museum_koujo_family } = require('#/kojo/kojo-system');
const { party_char_del } = require('#/dungeon/dungeon-party');
const { equip_get } = require('#/system/equip/equip-lookup');
const { video_maturo } = require('#/system/stronghold/sell-video');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { chara_callname } = require('#/utils/callname-utils');

function default_rand(n) {
  return Math.floor(Math.random() * n);
}

// 本函数沿原作分支密集读取的数字槽：TALENT 11 反抗心、12 刚强、14 文静、
// 16 嚣张、26 悲观、28 爱表现、34 抵抗、35 害羞、57 漏尿癖、60 容易自慰、
// 80 倒错、85 爱慕、89 露出狂、113 魅力、121 扶她、122 男人、130 母乳体质、
// 136 牝犬、153 妊娠、220 精英、308 体型、312 魅力点、315 成为勇者前的生活、
// 317 喜欢的东西、329 造型王；EX_TALENT:1 是扣威望的特殊角色标志；
// MARK:3 是反抗刻印。来源为 yml/Talent.yml、yml/Mark.yml 与原作对应条件。
function get(name) {
  return era.get(name) || 0;
}

function she(cid) {
  return chara(cid).chara.男人 ? '他' : '她';
}

// #DIMS MATURO 与内建 LOCALS 在 Emuera 中是函数静态槽；宝石支及隐藏的
// 100 输入会观察到上次调用的残值，故不能降成每次调用重置的 JS 局部量。
let maturo = '';
let locals = '';

/**
 * @MUSEUM：把指定角色制作成展品并从队伍中除名。
 * @param {number} a 原作单字母变量 A（待处刑角色 ID）
 * @param {(n: number) => number} [rand_n] RAND:N 随机源
 * @returns {Promise<number>} RESULT：恒 0
 */
async function museum(a, rand_n = default_rand) {
  if (a === 0) return 0;

  const target = a;
  const family_id = search_family(a);
  let lv = 0;
  let z = 0;
  let line = '';

  await era.printAndWait('要制作成什么样的展品呢？');
  era.print('');
  const exhibits = [
    '石像',
    '标本',
    '蜡像',
    '人体模型人偶',
    '球型关节人偶',
    '金属雕像',
    '冰雕',
    '宝石像',
    '屋内家具',
    '画像',
  ];
  for (const [index, exhibit] of exhibits.entries()) {
    era.printButton(exhibit, index);
  }
  era.print('');

  let result;
  do {
    // 原作 INPUT 可键入未显示的 100；关闭按钮规则才能保留其隐藏路径。
    result = await era.input({ useRule: false });
  } while (result < 0 || (result >= 10 && result !== 100));

  era_flag.target = a;
  if (!get(`talent:${a}:220`) && !get(`ex_talent:${a}:1`)) {
    era_exflag.prestige += 2;
    era.print('威望值增加');
  } else {
    era_exflag.prestige -= 10;
    era.print('威望值减少');
  }
  game.event.博物馆口上 = result;
  const kojo_id = kojo_handler_id(a);
  if (kojo_id >= 0) {
    // K0 是早期落地的旧签名，直接收展品编号；其余处理器按现行契约收随机源。
    const kojo_arg = kojo_id === 0 ? result : rand_n;
    await museum_koujo_family.call(kojo_id, {
      whenMissing: 0,
      args: [kojo_arg],
    });
  }

  if (game.event.博物馆口上 === 0) {
    game.event.装饰品数 += 1;
    if (
      get(`talent:${a}:57`) ||
      get(`talent:${a}:121`) ||
      get(`talent:${a}:122`) ||
      get(`talent:${a}:130`)
    ) {
      game.event.喷水像_石 += 1;
    }
    game.event.石像数 += 1;
    era.print(`${chara_callname(a)}被封印了全部的力量，站在邪恶的魔法阵中央。`);
    await era.printAndWait(`然后，一束光芒闪过，`);
    line = `${she(a)}的身体变成了`;
    maturo = '';
    if (rand_n(3) === 0) {
      line += '石膏';
      maturo += '石膏';
    } else if (rand_n(3) === 1) {
      line += '大理石';
      maturo += '大理石';
    } else {
      line += '石';
      maturo += '石';
    }
    await era.printAndWait(`${line}像。`);
    maturo += '像';
    locals = '';

    if (
      get(`talent:${a}:57`) ||
      get(`talent:${a}:121`) ||
      get(`talent:${a}:122`) ||
      get(`talent:${a}:130`)
    ) {
      await era.printAndWait(
        `${chara_callname(0)}为了让${chara_callname(a)}的像喷水而特地亲手改造了魔法阵。`,
      );

      if (get(`talent:${a}:121`) || get(`talent:${a}:122`)) {
        await era.printAndWait(
          `${chara_callname(a)}的勃起的男根如预定的那样变换成了喷水装置，前端激烈的喷着水…`,
        );
        locals = '射精';

        if (get(`talent:${a}:130`)) {
          await era.printAndWait(
            `稍微一碰就会喷出母乳的${chara_callname(a)}的乳首也被变换、从勃起的尖端喷出了水…`,
          );
          locals += '喷乳';
        }

        if (
          get(`mark:${target}:3`) === 3 &&
          (get(`talent:${a}:11`) ||
            get(`talent:${a}:12`) ||
            get(`talent:${a}:16`) ||
            get(`talent:${a}:34`))
        ) {
          await era.printAndWait(
            `${chara_callname(a)}带着险恶的表情盯着这边，散发出稍有空隙就会马上袭击过来的气氛`,
          );
          await era.printAndWait(
            `但是无力抵抗的${she(a)}只能就这样被变成喷水像、在大众面前露出着难看的姿态…`,
          );
          locals += '叛逆';
        } else if (get(`mark:${target}:3`) === 3) {
          await era.printAndWait(
            `${chara_callname(a)}用严峻的神色瞪着${chara_callname(0)}，一副宁死不屈的姿态。`,
          );
          await era.printAndWait(
            `不过，无法反抗的${she(a)}最后还是被做成了喷水像，将那美丽的肢体呈现在大众眼前。`,
          );
          locals += '抗拒';
        } else if (get(`talent:${a}:85`)) {
          await era.printAndWait(
            `${chara_callname(a)}虽然被变成了喷水像、但却温和的微笑着…`,
          );
          locals += '奉献';
        } else if (get(`talent:${a}:153`)) {
          await era.printAndWait(
            `妊娠的${chara_callname(a)}、就那样以腹部膨胀起来的状态被变成了喷水像装饰了起来…`,
          );
          locals += '妊娠';
        } else if (get(`talent:${a}:60`) || get(`talent:${a}:80`)) {
          await era.printAndWait(
            `因为处在特殊的状况下、性的兴奋超过了恐怖的${chara_callname(a)}就那样带着兴奋的表情被变成了喷水像…`,
          );
          locals += '倒错';
        } else if (get(`talent:${a}:28`) || get(`talent:${a}:89`)) {
          await era.printAndWait(
            `一直隐藏露出癖的${chara_callname(a)}浮现出恍惚的表情、以好像在卖弄自己的身体一样的姿势被装饰在了台座上…`,
          );
          locals += '暴露';
        } else if (get(`talent:${a}:14`) || get(`talent:${a}:26`)) {
          await era.printAndWait(
            `${chara_callname(a)}好像早早地就接受了自己的状况、带着混入了顿悟和达观的表情静静地伫立在那里…`,
          );
          locals += '宁静';
        } else if (get(`talent:${a}:35`)) {
          await era.printAndWait(
            `${chara_callname(a)}因为很害羞、用两手拼命地想遮住自己的身体`,
          );
          await era.printAndWait(
            `因为遮挡的途中被石化、手停在了不上不下的位置挡不住关键的部位`,
          );
          await era.printAndWait(
            `因为${she(a)}那混入了羞耻和困惑的表情而风格独特的喷水像被装饰了起来`,
          );
          locals += '羞涩';
        } else if (get(`talent:${a}:136`)) {
          await era.printAndWait(
            `${chara_callname(a)}大概是因为无意识的想起被当做野兽时的行为、`,
          );
          await era.printAndWait(
            `四肢着地后、被变成了狗小便那样抬起单腿的姿势的喷水像装饰了起来…`,
          );
          locals += '牝犬';
        } else if (get(`talent:${a}:113`)) {
          await era.printAndWait(
            `变成喷水像的${chara_callname(a)}散发着说不出的美丽…`,
          );
          locals += '魅惑';
        } else {
          await era.printAndWait(
            `变成喷水像的${chara_callname(a)}被用正在小便的孩子的姿势装饰了起来…`,
          );
        }
      } else if (get(`talent:${a}:130`)) {
        await era.printAndWait(
          `时常滴着母乳的${chara_callname(a)}乳首、如${chara_callname(0)}所想的那样变换成了从顶端喷出水的样子…`,
        );
        locals = '喷乳';
        if (get(`talent:${a}:57`)) {
          await era.printAndWait(
            `然后有放尿癖的${chara_callname(a)}、从尿道的地方也断断续续的流出水来…`,
          );
          locals += '漏尿';
        }
        if (
          get(`mark:${target}:3`) === 3 &&
          (get(`talent:${a}:11`) ||
            get(`talent:${a}:12`) ||
            get(`talent:${a}:16`) ||
            get(`talent:${a}:34`))
        ) {
          await era.printAndWait(
            `${chara_callname(a)}带着险恶的表情盯着这边，散发出稍有空隙就会马上袭击过来的气氛`,
          );
          await era.printAndWait(
            `但是无力抵抗的${she(a)}只能就这样被变成喷水像、在大众面前露出着难看的姿态…`,
          );
          locals += '叛逆';
        } else if (get(`mark:${target}:3`) === 3) {
          await era.printAndWait(
            `${chara_callname(a)}用严峻的神色瞪着${chara_callname(0)}，一副宁死不屈的姿态。`,
          );
          await era.printAndWait(
            `不过，无法反抗的${she(a)}最后还是被做成了喷水像，将那美丽的肢体呈现在大众眼前。`,
          );
          locals += '抗拒';
        } else if (get(`talent:${a}:85`)) {
          await era.printAndWait(
            `${chara_callname(a)}虽然被变成了喷水像、但却温和的微笑着…`,
          );
          locals += '奉献';
        } else if (get(`talent:${a}:153`)) {
          await era.printAndWait(
            `妊娠的${chara_callname(a)}、就那样以腹部膨胀起来的状态被变成了喷水像装饰了起来…`,
          );
          locals += '妊娠';
        } else if (get(`talent:${a}:60`) || get(`talent:${a}:80`)) {
          await era.printAndWait(
            `因为处在特殊的状况下、性的兴奋超过了恐怖的${chara_callname(a)}就那样带着兴奋的表情被变成了喷水像…`,
          );
          locals += '倒错';
        } else if (get(`talent:${a}:28`) || get(`talent:${a}:89`)) {
          await era.printAndWait(
            `一直隐藏露出癖的${chara_callname(a)}浮现出恍惚的表情、以好像在卖弄自己的身体一样的姿势被装饰在了台座上…`,
          );
          locals += '暴露';
        } else if (get(`talent:${a}:14`) || get(`talent:${a}:26`)) {
          await era.printAndWait(
            `${chara_callname(a)}好像早早地就接受了自己的状况、带着混入了顿悟和达观的表情静静地伫立在那里…`,
          );
          locals += '宁静';
        } else if (get(`talent:${a}:35`)) {
          await era.printAndWait(
            `${chara_callname(a)}因为很害羞、用两手拼命地想遮住自己的身体`,
          );
          await era.printAndWait(
            `因为遮挡的途中被石化、手停在了不上不下的位置挡不住关键的部位`,
          );
          await era.printAndWait(
            `因为${she(a)}那混入了羞耻和困惑的表情而风格独特的喷水像被装饰了起来`,
          );
          locals += '羞涩';
        } else if (get(`talent:${a}:136`)) {
          await era.printAndWait(
            `${chara_callname(a)}大概是因为无意识的想起被当做野兽时的行为、`,
          );
          await era.printAndWait(
            `四肢着地后、被变成了狗小便那样抬起单腿的姿势的喷水像装饰了起来…`,
          );
          locals += '牝犬';
        } else if (get(`talent:${a}:113`)) {
          await era.printAndWait(
            `变成喷水像的${chara_callname(a)}散发着说不出的美丽…`,
          );
          locals += '魅惑';
        } else {
          await era.printAndWait(
            `变成喷水像的${chara_callname(a)}、以用膝盖顶起突出着胸部的姿势被装饰了起来……`,
          );
        }
      } else if (get(`talent:${a}:57`)) {
        await era.printAndWait(
          `尿道宽松的${chara_callname(a)}的尿道的地方变换成了喷水装置、${chara_callname(a)}要在人们面前永远不停地放尿了…`,
        );
        locals += '漏尿';
        if (
          get(`mark:${target}:3`) === 3 &&
          (get(`talent:${a}:11`) ||
            get(`talent:${a}:12`) ||
            get(`talent:${a}:16`) ||
            get(`talent:${a}:34`))
        ) {
          await era.printAndWait(
            `${chara_callname(a)}带着险恶的表情盯着这边，散发出稍有空隙就会马上袭击过来的气氛`,
          );
          await era.printAndWait(
            `但是无力抵抗的${she(a)}只能就这样被变成喷水像、在大众面前露出着难看的姿态…`,
          );
          locals += '叛逆';
        } else if (get(`mark:${target}:3`) === 3) {
          await era.printAndWait(
            `${chara_callname(a)}用严峻的神色瞪着${chara_callname(0)}，一副宁死不屈的姿态。`,
          );
          await era.printAndWait(
            `不过，无法反抗的${she(a)}最后还是被做成了喷水像，将那美丽的肢体呈现在大众眼前。`,
          );
          locals += '抗拒';
        } else if (get(`talent:${a}:85`)) {
          await era.printAndWait(
            `${chara_callname(a)}虽然被变成了喷水像、但却温和的微笑着…`,
          );
          locals += '奉献';
        } else if (get(`talent:${a}:153`)) {
          await era.printAndWait(
            `妊娠的${chara_callname(a)}、就那样以腹部膨胀起来的状态被变成了喷水像装饰了起来…`,
          );
          locals += '妊娠';
        } else if (get(`talent:${a}:60`) || get(`talent:${a}:80`)) {
          await era.printAndWait(
            `因为处在特殊的状况下、性的兴奋超过了恐怖的${chara_callname(a)}就那样带着兴奋的表情被变成了喷水像…`,
          );
          locals += '倒错';
        } else if (get(`talent:${a}:28`) || get(`talent:${a}:89`)) {
          await era.printAndWait(
            `一直隐藏露出癖的${chara_callname(a)}浮现出恍惚的表情、以好像在卖弄自己的身体一样的姿势被装饰在了台座上…`,
          );
          locals += '暴露';
        } else if (get(`talent:${a}:14`) || get(`talent:${a}:26`)) {
          await era.printAndWait(
            `${chara_callname(a)}好像早早地就接受了自己的状况、带着混入了顿悟和达观的表情静静地伫立在那里…`,
          );
          locals += '宁静';
        } else if (get(`talent:${a}:35`)) {
          await era.printAndWait(
            `${chara_callname(a)}因为很害羞、用两手拼命地想遮住自己的身体`,
          );
          await era.printAndWait(
            `因为遮挡的途中被石化、手停在了不上不下的位置挡不住关键的部位`,
          );
          await era.printAndWait(
            `因为${she(a)}那混入了羞耻和困惑的表情而风格独特的喷水像被装饰了起来`,
          );
          locals += '羞涩';
        } else if (get(`talent:${a}:136`)) {
          await era.printAndWait(
            `${chara_callname(a)}大概是因为无意识的想起被当做野兽时的行为、`,
          );
          await era.printAndWait(
            `四肢着地后、被变成了狗小便那样抬起单腿的姿势的喷水像装饰了起来…`,
          );
          locals += '牝犬';
        } else if (get(`talent:${a}:113`)) {
          await era.printAndWait(
            `变成喷水像的${chara_callname(a)}散发着说不出的美丽…`,
          );
          locals += '魅惑';
          // 原作第 259 行重复 TALENT:153；前支已覆盖，死分支仍按 1:1 保留。
          // eslint-disable-next-line no-dupe-else-if
        } else if (get(`talent:${a}:153`)) {
          await era.printAndWait(
            `妊娠的${chara_callname(a)}、就那样以腹部膨胀起来的状态被变成了喷水像装饰了起来…`,
          );
          locals += '妊娠';
        } else if (rand_n(8) === 0) {
          await era.printAndWait(
            `变成喷水像的${chara_callname(a)}，不知为何被摆成尿尿小僧的形象。`,
          );
          await era.printAndWait(`一条拱形的水柱，从${she(a)}的下体潺潺而出。`);
          locals += '小便';
        } else {
          await era.printAndWait(
            `变成喷水像的${chara_callname(a)}，腰和腿摆成大大的Ｍ字形被装饰起来了。`,
          );
        }
      }
    } else {
      if (
        get(`mark:${target}:3`) === 3 &&
        (get(`talent:${a}:11`) ||
          get(`talent:${a}:12`) ||
          get(`talent:${a}:16`) ||
          get(`talent:${a}:34`))
      ) {
        await era.printAndWait(
          `${chara_callname(a)}带着险恶的表情盯着这边，散发出稍有空隙就会马上袭击过来的气氛`,
        );
        await era.printAndWait(
          `但是无力抵抗的${she(a)}只能就这样被变成石像、在大众面前露出着难看的姿态…`,
        );
        locals += '叛逆';
      } else if (get(`mark:${target}:3`) === 3) {
        await era.printAndWait(
          `${chara_callname(a)}用严峻的神色瞪着${chara_callname(0)}，一副宁死不屈的姿态。`,
        );
        await era.printAndWait(
          `不过，无法反抗的${she(a)}最后还是被做成了石像，将那美丽的肢体呈现在大众眼前。`,
        );
        locals += '抗拒';
      } else if (get(`talent:${a}:85`)) {
        await era.printAndWait(
          `${chara_callname(a)}虽然被变成了石像、但却温和的微笑着…`,
        );
        locals += '奉献';
      } else if (get(`talent:${a}:153`)) {
        await era.printAndWait(
          `妊娠的${chara_callname(a)}、就那样以腹部膨胀起来的状态被变成了石像装饰了起来…`,
        );
        locals += '妊娠';
      } else if (get(`talent:${a}:60`) || get(`talent:${a}:80`)) {
        await era.printAndWait(
          `因为处在特殊的状况下、性的兴奋超过了恐怖的${chara_callname(a)}就那样带着兴奋的表情被变成了石像…`,
        );
        locals += '倒错';
      } else if (get(`talent:${a}:28`) || get(`talent:${a}:89`)) {
        await era.printAndWait(
          `一直隐藏露出癖的${chara_callname(a)}浮现出恍惚的表情、以好像在卖弄自己的身体一样的姿势被装饰在了台座上…`,
        );
        locals += '暴露';
      } else if (get(`talent:${a}:14`) || get(`talent:${a}:26`)) {
        await era.printAndWait(
          `${chara_callname(a)}好像早早地就接受了自己的状况、带着混入了顿悟和达观的表情静静地伫立在那里…`,
        );
        locals += '宁静';
      } else if (get(`talent:${a}:35`)) {
        await era.printAndWait(
          `${chara_callname(a)}因为很害羞、用两手拼命地想遮住自己的身体`,
        );
        await era.printAndWait(
          `因为遮挡的途中被石化、手停在了不上不下的位置挡不住关键的部位`,
        );
        await era.printAndWait(
          `因为${she(a)}那混入了羞耻和困惑的表情而风格独特的石像被装饰了起来`,
        );
        locals += '羞涩';
      } else if (get(`talent:${a}:136`)) {
        await era.printAndWait(
          `${chara_callname(a)}大概是因为无意识的想起被当做野兽时的行为、`,
        );
        await era.printAndWait(
          `以「坐下」的姿势、就那样以等待着下个命令的状态被变成石像装饰了起来…`,
        );
        locals += '牝犬';
      } else if (get(`talent:${a}:113`)) {
        await era.printAndWait(
          `变成石像的${chara_callname(a)}散发着说不出的美丽…`,
        );
        locals += '魅惑';
      }
    }
    if (
      get(`talent:${a}:57`) ||
      get(`talent:${a}:121`) ||
      get(`talent:${a}:122`) ||
      get(`talent:${a}:130`)
    ) {
      await era.printAndWait(`现在石制喷水像的数量…${game.event.喷水像_石}个`);
    }
    await era.printAndWait(`现在石像数量…${game.event.石像数}个`);
    maturo = locals + maturo;
  } else if (game.event.博物馆口上 === 1) {
    game.event.装饰品数 += 1;
    game.event.剥制数 += 1;
    era.print(
      `被从天花板上拉下来的锁链扣着四肢，魔物接近了${chara_callname(a)}。`,
    );
    await era.printAndWait(`用小刀将${she(a)}肢解、放血。`);
    await era.printAndWait(`凄厉的惨叫声回响不已。`);
    await era.printAndWait(`${she(a)}的身体，变成漂亮的标本了。`);
    maturo = '标本';
    locals = '';
    if (
      get(`mark:${target}:3`) === 3 &&
      (get(`talent:${a}:11`) ||
        get(`talent:${a}:12`) ||
        get(`talent:${a}:16`) ||
        get(`talent:${a}:34`))
    ) {
      await era.printAndWait(
        `${chara_callname(a)}带着险恶的表情盯着这边，散发出稍有空隙就会马上袭击过来的气氛`,
      );
      await era.printAndWait(
        `但是无力抵抗的${she(a)}就那样被做成了标本、被当做家具一样装饰在了墙壁上…`,
      );
    } else if (get(`mark:${target}:3`) === 3) {
      await era.printAndWait(
        `${chara_callname(a)}用严峻的神色瞪着${chara_callname(0)}，一副宁死不屈的姿态。`,
      );
      await era.printAndWait(
        `不过，无法反抗的${she(a)}最后还是被做成了标本，作为装饰品挂在墙上。`,
      );
    } else if (get(`talent:${a}:85`)) {
      await era.printAndWait(`被做成标本的${chara_callname(a)}平静的微笑着…`);
    } else if (get(`talent:${a}:35`)) {
      await era.printAndWait(
        `${chara_callname(a)}的标本浮现出满脸通红的困惑表情、被装饰在了墙壁上…`,
      );
    } else if (get(`talent:${a}:28`) || get(`talent:${a}:89`)) {
      await era.printAndWait(
        `一直隐藏露出癖的${chara_callname(a)}的标本露出恍惚的表情、被装饰在了墙壁上…`,
      );
    } else if (get(`talent:${a}:14`) || get(`talent:${a}:26`)) {
      await era.printAndWait(
        `${chara_callname(a)}好像早早地就接受了自己的状况、带着混入了顿悟和达观的表情被装饰在了墙壁上…`,
      );
    } else if (get(`talent:${a}:153`)) {
      await era.printAndWait(
        `妊娠的${chara_callname(a)}、就那样以腹部膨胀起来的状态、被装饰在了墙壁上…`,
      );
      locals = '妊娠';
    } else if (get(`talent:${a}:113`)) {
      await era.printAndWait(
        `被做成标本的${chara_callname(a)}散发着说不出的美丽…`,
      );
      locals = '魅惑';
    }
    await era.printAndWait(`现在的标本数量…${game.event.剥制数}个`);
    maturo = locals + maturo;
  } else if (game.event.博物馆口上 === 2) {
    game.event.装饰品数 += 1;
    game.event.蜡像数 += 1;
    era.print(`${chara_callname(a)}被封印了全部的力量，站在台座上。`);
    await era.printAndWait(`属下的魔物收到指示，将大量的蜡倾倒而下。`);
    await era.printAndWait(
      `最初的激烈惨叫声，随着时间和不停倾倒的蜡渐渐变小了。`,
    );
    await era.printAndWait(
      `在悲鸣完全听不到后又过了一段时间，将多余的蜡仔细地刮掉…`,
    );
    await era.printAndWait(`现在，${she(a)}的身体成为蜡像了。`);
    maturo = '蜡像';
    locals = '';
    if (
      get(`mark:${target}:3`) === 3 &&
      (get(`talent:${a}:11`) ||
        get(`talent:${a}:12`) ||
        get(`talent:${a}:16`) ||
        get(`talent:${a}:34`))
    ) {
      await era.printAndWait(
        `${chara_callname(a)}带着险恶的表情盯着这边，散发出稍有空隙就会马上袭击过来的气氛`,
      );
      await era.printAndWait(
        `但是无力抵抗的${she(a)}就这样被做成了蜡像、在大众面前露出着难看的姿态…`,
      );
    } else if (get(`mark:${target}:3`) === 3) {
      await era.printAndWait(
        `${chara_callname(a)}用严峻的神色瞪着${chara_callname(0)}，一副宁死不屈的姿态。`,
      );
      await era.printAndWait(
        `不过，无法反抗的${she(a)}最后还是被做成了蜡像，将那美丽的肢体呈现在大众眼前。`,
      );
    } else if (get(`talent:${a}:85`)) {
      await era.printAndWait(`被做成蜡像的${chara_callname(a)}平静的微笑着`);
    } else if (get(`talent:${a}:35`)) {
      await era.printAndWait(
        `${chara_callname(a)}因为很害羞、用两手拼命地想遮住自己的身体`,
      );
      await era.printAndWait(
        `因为遮挡的途中蜡化完成、手停在了不上不下的位置挡不住关键的部位`,
      );
      await era.printAndWait(
        `因为${she(a)}那混入了羞耻和困惑的表情而风格独特的蜡像被装饰了起来`,
      );
    } else if (get(`talent:${a}:28`) || get(`talent:${a}:89`)) {
      await era.printAndWait(
        `一直隐藏露出癖的${chara_callname(a)}浮现出恍惚的表情、以好像在卖弄自己的身体一样的姿势被装饰在了台座上…`,
      );
    } else if (get(`talent:${a}:14`) || get(`talent:${a}:26`)) {
      await era.printAndWait(
        `${chara_callname(a)}好像早早地就接受了自己的状况、带着混入了顿悟和达观的表情静静地伫立在那里…`,
      );
    } else if (get(`talent:${a}:153`)) {
      await era.printAndWait(
        `妊娠的${chara_callname(a)}、就那样以腹部膨胀起来的状态被做成了蜡像装饰了起来…`,
      );
      locals = '妊娠';
    } else if (get(`talent:${a}:113`)) {
      await era.printAndWait(
        `被做成蜡像的${chara_callname(a)}散发着说不出的美丽…`,
      );
      locals = '魅惑';
    }
    await era.printAndWait(`现在的蜡像数量…${game.event.蜡像数}个`);
    maturo = locals + maturo;
  } else if (game.event.博物馆口上 === 3) {
    game.event.装饰品数 += 1;
    game.event.人偶数_服装 += 1;
    line = '被封印一切力量的';

    if (get(`talent:${a}:308`) <= 201) {
      line += '肉感的';
      maturo = '肉感';
    } else if (get(`talent:${a}:308`) >= 100) {
      line += '苗条的';
      maturo = '纤细';
    } else {
      line += '标准体型的';
      maturo = '';
    }
    line += `${chara_callname(a)}，得到了`;

    if (get(`talent:${a}:312`) === 12) {
      line += '突出美乳';
      maturo += '美乳';
    } else if (get(`talent:${a}:312`) === 13) {
      line += '突出腰线';
      maturo += '细腰';
    } else if (get(`talent:${a}:312`) === 14) {
      line += '突出臀部';
      maturo += '翘臀';
    } else if (get(`talent:${a}:312`) === 15) {
      line += '突出腿部曲线';
      maturo += '美腿';
    } else if (get(`talent:${a}:312`) === 23) {
      line += '突出大屁股';
      maturo += '巨尻';
    } else {
      line += '指定姿势';
    }
    await era.printAndWait(`${line}的指示。`);
    await era.printAndWait(
      `魔物接近了被固定姿势的${she(a)}，咏唱着${she(a)}听不懂的咒语。`,
    );
    if (rand_n(3) === 0) {
      await era.printAndWait(
        `${she(a)}对魔物的行为感到疑惑，但一瞬间，${she(a)}就无法思考了。`,
      );
      await era.printAndWait(`全身表皮都似变成了塑料，覆盖着整个美丽的肢体。`);
      await era.printAndWait(`仔细看的话，在各处关节位置均出现了细细的缝隙。`);
      await era.printAndWait(
        `下半身固定着，以腰线为界，上半身能转动或拿下来。`,
      );
    } else {
      await era.printAndWait(
        `只见${she(a)}整个人颤动了一下，然后就什么声音都听不见了。`,
      );
      await era.printAndWait(`全身表皮都似变成了塑料，覆盖着整个美丽的肢体。`);
      await era.printAndWait(
        `体态和形状发生了微妙的变化，完全感觉不到一丝生气。`,
      );
      await era.printAndWait(
        `表情凝固的${she(a)}，被轻轻地抬走，放到了展示台上。`,
      );
    }
    await era.printAndWait(`就这样，${she(a)}被变为漂亮的人体模型人偶了。`);
    maturo += '模型人偶';
    locals = '';
    if (get(`talent:${a}:85`)) {
      await era.printAndWait(
        `变成人体模型人偶的${chara_callname(a)}，时而会被前来参观的魔物偷走身上的各部件。`,
      );
      await era.printAndWait(
        `${chara_callname(a)}脖子以上的部件浮现出了好像接受被玩弄似的温和的笑容…`,
      );
    } else if (get(`talent:${a}:60`) || get(`talent:${a}:80`)) {
      await era.printAndWait(
        `在这种特异的情况下，性兴奋反而战胜了恐怖。${chara_callname(a)}成为了带有兴奋表情的人体模型人偶了……`,
      );
    } else if (get(`talent:${a}:28`) || get(`talent:${a}:89`)) {
      await era.printAndWait(
        `一直隐藏露出癖的${chara_callname(a)}浮现出恍惚的表情、以好像在卖弄自己的身体一样的姿势被装饰在了台座上…`,
      );
    } else if (get(`talent:${a}:153`)) {
      await era.printAndWait(
        `妊娠的${chara_callname(a)}、就那样以腹部膨胀起来的状态被变成了人体模型人偶装饰了起来…`,
      );
      locals = '妊娠';
    } else if (get(`talent:${a}:113`)) {
      await era.printAndWait(
        `变成人体模型人偶的${chara_callname(a)}，酝酿出一种难以言表的美…`,
      );
      locals = '魅惑';
    }
    await era.printAndWait(`人体模型人偶数量…${game.event.人偶数_服装}个`);
    maturo = locals + maturo;
  } else if (game.event.博物馆口上 === 4) {
    game.event.装饰品数 += 1;
    game.event.人偶数_球形关节 += 1;
    era.print(
      `被封印全部力量的${chara_callname(a)}身边站满魔物，正在吟唱着奇特的咒语。`,
    );
    await era.printAndWait(
      `${she(a)}试图逃离这些魔物，却发现自己的动作越来越迟钝了。`,
    );
    await era.printAndWait(
      `${she(a)}的身体，一点一点地失去着温度，从人体的肌肤转为无机质。关节部位，变成了球体。`,
    );
    await era.printAndWait(
      `完全不能理解自己身上发生了什么，${she(a)}持续挣扎着。`,
    );
    await era.printAndWait(`几分钟后，${she(a)}变成了精巧的球型关节人偶了。`);
    maturo = '球型关节人偶';
    locals = '';
    if (
      get(`mark:${target}:3`) === 3 &&
      (get(`talent:${a}:11`) ||
        get(`talent:${a}:12`) ||
        get(`talent:${a}:16`) ||
        get(`talent:${a}:34`))
    ) {
      await era.printAndWait(
        `${chara_callname(a)}带着险恶的表情盯着这边，散发出稍有空隙就会马上袭击过来的气氛`,
      );
      await era.printAndWait(
        `但是无力抵抗的${she(a)}只能就这样被变成球形关节人偶、在大众面前露出着难看的姿态…`,
      );
    } else if (get(`mark:${target}:3`) === 3) {
      await era.printAndWait(
        `${chara_callname(a)}用严峻的神色瞪着${chara_callname(0)}，一副宁死不屈的姿态。`,
      );
      await era.printAndWait(
        `不过，无法反抗的${she(a)}最后还是被做成了球形关节人偶，四肢被摆成了向观众献媚的姿势。`,
      );
    } else if (get(`talent:${a}:85`)) {
      await era.printAndWait(
        `${chara_callname(a)}虽然被变成了球形关节人偶、但却温和的微笑着…`,
      );
    } else if (get(`talent:${a}:35`)) {
      await era.printAndWait(
        `${chara_callname(a)}因为很害羞、用两手拼命地想遮住自己的身体`,
      );
      await era.printAndWait(
        `因为遮挡的途中人形化完成、手停在了不上不下的位置挡不住关键的部位`,
      );
      await era.printAndWait(
        `因为${she(a)}那混入了羞耻和困惑的表情而风格独特的球形人偶被装饰了起来`,
      );
    } else if (get(`talent:${a}:28`) || get(`talent:${a}:89`)) {
      await era.printAndWait(
        `一直隐藏露出癖的${chara_callname(a)}浮现出恍惚的表情、以好像在卖弄自己的身体一样的姿势被装饰在了台座上…`,
      );
    } else if (get(`talent:${a}:14`) || get(`talent:${a}:26`)) {
      await era.printAndWait(
        `${chara_callname(a)}好像早早地就接受了自己的状况、带着混入了顿悟和达观的表情静静地伫立在那里…`,
      );
    } else if (get(`talent:${a}:153`)) {
      await era.printAndWait(
        `妊娠的${chara_callname(a)}、就那样以腹部膨胀起来的状态被变成了球形关节人偶装饰了起来…`,
      );
      locals = '妊娠的';
    } else if (get(`talent:${a}:113`)) {
      await era.printAndWait(
        `变成球形关节人偶的${chara_callname(a)}散发着说不出的美丽…`,
      );
      locals = '魅惑的';
    }
    await era.printAndWait(`球型关节人偶数量…${game.event.人偶数_球形关节}个`);
    maturo = locals + maturo;
  } else if (game.event.博物馆口上 === 5) {
    game.event.装饰品数 += 1;
    if (
      get(`talent:${a}:57`) ||
      get(`talent:${a}:121`) ||
      get(`talent:${a}:122`) ||
      get(`talent:${a}:130`)
    ) {
      game.event.喷水像_金属 += 1;
    }
    game.event.金属像数 += 1;
    era.print(`${chara_callname(a)}被封印了全部的力量，站在邪恶的魔法阵中央。`);
    await era.printAndWait(
      `属下的魔物收到指示，瞬间，耀眼的光芒包围了${she(a)}。`,
    );
    await era.printAndWait(
      `在光芒里，${she(a)}感到自己心中的什么东西，充实地被满足了。`,
    );
    await era.printAndWait(
      `不知何来的充实感及满足感，使踌躇的${she(a)}感到舒适，将身心都委托给了这种感觉。`,
    );
    await era.printAndWait(`不一会儿，光芒消失。`);
    line = `${she(a)}的身体变成了`;
    if (rand_n(8) === 0) {
      line += '白金';
      maturo = '白金';
    } else if (rand_n(8) === 1) {
      line += '黄金';
      maturo = '黄金';
    } else if (rand_n(8) === 2) {
      line += '白银';
      maturo = '白银';
    } else if (rand_n(8) === 3) {
      line += '赤铜';
      maturo = '赤铜';
    } else if (rand_n(8) === 4) {
      line += '钢铁';
      maturo = '钢铁';
    } else {
      line += '青铜';
      maturo = '青铜';
    }
    await era.printAndWait(`${line}像。`);
    maturo += '像';
    locals = '';

    if (
      get(`talent:${a}:57`) ||
      get(`talent:${a}:121`) ||
      get(`talent:${a}:122`) ||
      get(`talent:${a}:130`)
    ) {
      await era.printAndWait(
        `${chara_callname(0)}为了让${chara_callname(a)}的像喷水而特地亲手改造了魔法阵。`,
      );

      if (get(`talent:${a}:121`) || get(`talent:${a}:122`)) {
        await era.printAndWait(
          `${chara_callname(a)}的勃起的男根如预定的那样变换成了喷水装置，前端激烈的喷着水…`,
        );
        locals = '射精';
        if (get(`talent:${a}:130`)) {
          await era.printAndWait(
            `稍微一碰就会喷出母乳的${chara_callname(a)}的乳首也被变换、从勃起的尖端喷出了水…`,
          );
          locals += '喷乳';
        }

        if (
          get(`mark:${target}:3`) === 3 &&
          (get(`talent:${a}:11`) ||
            get(`talent:${a}:12`) ||
            get(`talent:${a}:16`) ||
            get(`talent:${a}:34`))
        ) {
          await era.printAndWait(
            `${chara_callname(a)}带着险恶的表情盯着这边，散发出稍有空隙就会马上袭击过来的气氛`,
          );
          await era.printAndWait(
            `但是无力抵抗的${she(a)}只能就这样被变成喷水像、在大众面前露出着难看的姿态…`,
          );
        } else if (get(`mark:${target}:3`) === 3) {
          await era.printAndWait(
            `${chara_callname(a)}用严峻的神色瞪着${chara_callname(0)}，一副宁死不屈的姿态。`,
          );
          await era.printAndWait(
            `不过，无法反抗的${she(a)}最后还是被做成了喷水像，将那美丽的肢体呈现在大众眼前。`,
          );
        } else if (get(`talent:${a}:85`)) {
          await era.printAndWait(
            `${chara_callname(a)}虽然被变成了喷水像、但却温和的微笑着…`,
          );
        } else if (get(`talent:${a}:153`)) {
          await era.printAndWait(
            `妊娠的${chara_callname(a)}、就那样以腹部膨胀起来的状态被变成了喷水像装饰了起来…`,
          );
          locals += '妊娠';
        } else if (get(`talent:${a}:60`) || get(`talent:${a}:80`)) {
          await era.printAndWait(
            `因为处在特殊的状况下、性的兴奋超过了恐怖的${chara_callname(a)}就那样带着兴奋的表情被变成了喷水像…`,
          );
        } else if (get(`talent:${a}:28`) || get(`talent:${a}:89`)) {
          await era.printAndWait(
            `一直隐藏露出癖的${chara_callname(a)}浮现出恍惚的表情、以好像在卖弄自己的身体一样的姿势被装饰在了台座上…`,
          );
        } else if (get(`talent:${a}:14`) || get(`talent:${a}:26`)) {
          await era.printAndWait(
            `${chara_callname(a)}好像早早地就接受了自己的状况、带着混入了顿悟和达观的表情静静地伫立在那里…`,
          );
        } else if (get(`talent:${a}:35`)) {
          await era.printAndWait(
            `${chara_callname(a)}因为很害羞、用两手拼命地想遮住自己的身体`,
          );
          await era.printAndWait(
            `因为遮挡的途中被石化、手停在了不上不下的位置挡不住关键的部位`,
          );
          await era.printAndWait(
            `因为${she(a)}那混入了羞耻和困惑的表情而风格独特的喷水像被装饰了起来`,
          );
        } else if (get(`talent:${a}:136`)) {
          await era.printAndWait(
            `${chara_callname(a)}大概是因为无意识的想起被当做野兽时的行为、`,
          );
          await era.printAndWait(
            `四肢着地后、被变成了狗小便那样抬起单腿的姿势的喷水像装饰了起来…`,
          );
          locals += '牝犬';
        } else if (get(`talent:${a}:113`)) {
          await era.printAndWait(
            `变成喷水像的${chara_callname(a)}散发着说不出的美丽…`,
          );
          locals += '魅惑';
        } else {
          await era.printAndWait(
            `变成喷水像的${chara_callname(a)}被用正在小便的孩子的姿势装饰了起来…`,
          );
        }
      } else if (get(`talent:${a}:130`)) {
        await era.printAndWait(
          `时常滴着母乳的${chara_callname(a)}乳首、如${chara_callname(0)}所想的那样变换成了从顶端喷出水的样子…`,
        );
        locals = '喷乳';
        if (get(`talent:${a}:57`)) {
          await era.printAndWait(
            `然后有放尿癖的${chara_callname(a)}、从尿道的地方也断断续续的流出水来…`,
          );
          locals += '漏尿';
        }
        if (
          get(`mark:${target}:3`) === 3 &&
          (get(`talent:${a}:11`) ||
            get(`talent:${a}:12`) ||
            get(`talent:${a}:16`) ||
            get(`talent:${a}:34`))
        ) {
          await era.printAndWait(
            `${chara_callname(a)}带着险恶的表情盯着这边，散发出稍有空隙就会马上袭击过来的气氛`,
          );
          await era.printAndWait(
            `但是无力抵抗的${she(a)}只能就这样被变成喷水像、在大众面前露出着难看的姿态…`,
          );
        } else if (get(`mark:${target}:3`) === 3) {
          await era.printAndWait(
            `${chara_callname(a)}用严峻的神色瞪着${chara_callname(0)}，一副宁死不屈的姿态。`,
          );
          await era.printAndWait(
            `不过，无法反抗的${she(a)}最后还是被做成了喷水像，将那美丽的肢体呈现在大众眼前。`,
          );
        } else if (get(`talent:${a}:85`)) {
          await era.printAndWait(
            `${chara_callname(a)}虽然被变成了喷水像、但却温和的微笑着…`,
          );
        } else if (get(`talent:${a}:153`)) {
          await era.printAndWait(
            `妊娠的${chara_callname(a)}、就那样以腹部膨胀起来的状态被变成了喷水像装饰了起来…`,
          );
          locals += '妊娠';
        } else if (get(`talent:${a}:60`) || get(`talent:${a}:80`)) {
          await era.printAndWait(
            `因为处在特殊的状况下、性的兴奋超过了恐怖的${chara_callname(a)}就那样带着兴奋的表情被变成了喷水像…`,
          );
        } else if (get(`talent:${a}:28`) || get(`talent:${a}:89`)) {
          await era.printAndWait(
            `一直隐藏露出癖的${chara_callname(a)}浮现出恍惚的表情、以好像在卖弄自己的身体一样的姿势被装饰在了台座上…`,
          );
        } else if (get(`talent:${a}:14`) || get(`talent:${a}:26`)) {
          await era.printAndWait(
            `${chara_callname(a)}好像早早地就接受了自己的状况、带着混入了顿悟和达观的表情静静地伫立在那里…`,
          );
        } else if (get(`talent:${a}:35`)) {
          await era.printAndWait(
            `${chara_callname(a)}因为很害羞、用两手拼命地想遮住自己的身体`,
          );
          await era.printAndWait(
            `因为遮挡的途中被金属化、手停在了不上不下的位置挡不住关键的部位`,
          );
          await era.printAndWait(
            `因为${she(a)}那混入了羞耻和困惑的表情而风格独特的喷水像被装饰了起来`,
          );
        } else if (get(`talent:${a}:136`)) {
          await era.printAndWait(
            `${chara_callname(a)}大概是因为无意识的想起被当做野兽时的行为、`,
          );
          await era.printAndWait(
            `四肢着地后、以露出腹部表达服从的意思的姿势被做成了喷水像装饰了起来…`,
          );
          locals += '牝犬';
        } else if (get(`talent:${a}:113`)) {
          await era.printAndWait(
            `变成喷水像的${chara_callname(a)}散发着说不出的美丽…`,
          );
          locals += '魅惑';
        } else {
          await era.printAndWait(
            `变成喷水像的${chara_callname(a)}、以用膝盖顶起突出着胸部的姿势被装饰了起来…`,
          );
        }
      } else if (get(`talent:${a}:57`)) {
        await era.printAndWait(
          `尿道宽松的${chara_callname(a)}的尿道的地方变换成了喷水装置、${chara_callname(a)}要在人们面前永远不停地放尿了…`,
        );
        locals += '漏尿';
        if (
          get(`mark:${target}:3`) === 3 &&
          (get(`talent:${a}:11`) ||
            get(`talent:${a}:12`) ||
            get(`talent:${a}:16`) ||
            get(`talent:${a}:34`))
        ) {
          await era.printAndWait(
            `${chara_callname(a)}带着险恶的表情盯着这边，散发出稍有空隙就会马上袭击过来的气氛`,
          );
          await era.printAndWait(
            `但是无力抵抗的${she(a)}只能就这样被变成喷水像、在大众面前露出着难看的姿态…`,
          );
        } else if (get(`mark:${target}:3`) === 3) {
          await era.printAndWait(
            `${chara_callname(a)}用严峻的神色瞪着${chara_callname(0)}，一副宁死不屈的姿态。`,
          );
          await era.printAndWait(
            `不过，无法反抗的${she(a)}最后还是被做成了喷水像，将那美丽的肢体呈现在大众眼前。`,
          );
        } else if (get(`talent:${a}:85`)) {
          await era.printAndWait(
            `${chara_callname(a)}虽然被变成了喷水像、但却温和的微笑着…`,
          );
        } else if (get(`talent:${a}:153`)) {
          await era.printAndWait(
            `妊娠的${chara_callname(a)}、就那样以腹部膨胀起来的状态被变成了喷水像装饰了起来…`,
          );
          locals += '妊娠';
        } else if (get(`talent:${a}:60`) || get(`talent:${a}:80`)) {
          await era.printAndWait(
            `因为处在特殊的状况下、性的兴奋超过了恐怖的${chara_callname(a)}就那样带着兴奋的表情被变成了喷水像…`,
          );
        } else if (get(`talent:${a}:28`) || get(`talent:${a}:89`)) {
          await era.printAndWait(
            `一直隐藏露出癖的${chara_callname(a)}浮现出恍惚的表情、以好像在卖弄自己的身体一样的姿势被装饰在了台座上…`,
          );
        } else if (get(`talent:${a}:14`) || get(`talent:${a}:26`)) {
          await era.printAndWait(
            `${chara_callname(a)}好像早早地就接受了自己的状况、带着混入了顿悟和达观的表情静静地伫立在那里…`,
          );
        } else if (get(`talent:${a}:35`)) {
          await era.printAndWait(
            `${chara_callname(a)}因为很害羞、用两手拼命地想遮住自己的身体`,
          );
          await era.printAndWait(
            `因为遮挡的途中被石化、手停在了不上不下的位置挡不住关键的部位`,
          );
          await era.printAndWait(
            `因为${she(a)}那混入了羞耻和困惑的表情而风格独特的喷水像被装饰了起来`,
          );
        } else if (get(`talent:${a}:136`)) {
          await era.printAndWait(
            `${chara_callname(a)}大概是因为无意识的想起被当做野兽时的行为、`,
          );
          await era.printAndWait(
            `四肢着地后、被变成了狗小便那样抬起单腿的姿势的喷水像装饰了起来…`,
          );
          locals += '牝犬';
        } else if (get(`talent:${a}:113`)) {
          await era.printAndWait(
            `变成喷水像的${chara_callname(a)}散发着说不出的美丽…`,
          );
          locals += '魅惑';
        } else {
          await era.printAndWait(
            `被变成喷水像的${chara_callname(a)}、被以沉下腰，两膝大大的分开的姿势被装饰了起来…`,
          );
        }
      }
    } else {
      if (
        get(`mark:${target}:3`) === 3 &&
        (get(`talent:${a}:11`) ||
          get(`talent:${a}:12`) ||
          get(`talent:${a}:16`) ||
          get(`talent:${a}:34`))
      ) {
        await era.printAndWait(
          `${chara_callname(a)}带着险恶的表情盯着这边，散发出稍有空隙就会马上袭击过来的气氛`,
        );
        await era.printAndWait(
          `但是无力抵抗的${she(a)}只能就这样被变成金属像、在大众面前露出着难看的姿态…`,
        );
      } else if (get(`mark:${target}:3`) === 3) {
        await era.printAndWait(
          `${chara_callname(a)}用严峻的神色瞪着${chara_callname(0)}，一副宁死不屈的姿态。`,
        );
        await era.printAndWait(
          `不过，无法反抗的${she(a)}最后还是被做成了金属像，将那美丽的肢体呈现在大众眼前。`,
        );
      } else if (get(`talent:${a}:85`)) {
        await era.printAndWait(
          `${chara_callname(a)}虽然被变成了金属像、但却温和的微笑着…`,
        );
      } else if (get(`talent:${a}:153`)) {
        await era.printAndWait(
          `妊娠的${chara_callname(a)}、就那样以腹部膨胀起来的状态被变成了金属像装饰了起来…`,
        );
        locals += '妊娠';
      } else if (get(`talent:${a}:60`) || get(`talent:${a}:80`)) {
        await era.printAndWait(
          `因为处在特殊的状况下、性的兴奋超过了恐怖的${chara_callname(a)}就那样带着兴奋的表情被变成了金属像…`,
        );
      } else if (get(`talent:${a}:28`) || get(`talent:${a}:89`)) {
        await era.printAndWait(
          `一直隐藏露出癖的${chara_callname(a)}浮现出恍惚的表情、以好像在卖弄自己的身体一样的姿势被装饰在了台座上…`,
        );
      } else if (get(`talent:${a}:14`) || get(`talent:${a}:26`)) {
        await era.printAndWait(
          `${chara_callname(a)}好像早早地就接受了自己的状况、带着混入了顿悟和达观的表情静静地伫立在那里…`,
        );
      } else if (get(`talent:${a}:35`)) {
        await era.printAndWait(
          `${chara_callname(a)}因为很害羞、用两手拼命地想遮住自己的身体`,
        );
        await era.printAndWait(
          `因为遮挡的途中被金属化、手停在了不上不下的位置挡不住关键的部位`,
        );
        await era.printAndWait(
          `因为${she(a)}那混入了羞耻和困惑的表情而风格独特的金属像被装饰了起来`,
        );
      } else if (get(`talent:${a}:136`)) {
        await era.printAndWait(
          `${chara_callname(a)}大概是因为无意识的想起被当做野兽时的行为、`,
        );
        await era.printAndWait(
          `以「坐下」的姿势、就那样以等待着下个命令的状态被变成金属像装饰了起来…`,
        );
        locals += '牝犬';
      } else if (get(`talent:${a}:113`)) {
        await era.printAndWait(
          `变成金属像的${chara_callname(a)}散发着说不出的美丽…`,
        );
        locals += '魅惑';
      }
    }
    if (
      get(`talent:${a}:57`) ||
      get(`talent:${a}:121`) ||
      get(`talent:${a}:122`) ||
      get(`talent:${a}:130`)
    ) {
      await era.printAndWait(
        `现在金属喷水像的数量…${game.event.喷水像_金属}个`,
      );
    }
    await era.printAndWait(`现在金属像的数量……${game.event.金属像数}个`);
    maturo = locals + maturo;
  } else if (game.event.博物馆口上 === 6) {
    game.event.装饰品数 += 1;
    game.event.冰像数 += 1;
    era.print(`${chara_callname(a)}被封印了全部的力量，站在巨型的魔法阵中央。`);
    await era.printAndWait(
      `属下的魔物收到指示，维持魔法阵的全体魔物，一起发出了极端强烈的冷气。`,
    );
    await era.printAndWait(`不一会儿，冷气平息，魔法阵的中央，`);
    line = `${she(a)}的身体`;
    if (rand_n(4) === 0) {
      line += '彻底被冰封住了';
      maturo = '冰封';
    } else if (rand_n(4) === 1) {
      line += '变成了透明的冰雕像';
      maturo = '透明';
    } else {
      line += '变成了漂亮的冰雕像';
      maturo = '';
    }
    await era.printAndWait(`${line}。`);
    maturo += '冰雕';
    locals = '';
    if (
      get(`mark:${target}:3`) === 3 &&
      (get(`talent:${a}:11`) ||
        get(`talent:${a}:12`) ||
        get(`talent:${a}:16`) ||
        get(`talent:${a}:34`))
    ) {
      await era.printAndWait(
        `${chara_callname(a)}带着险恶的表情盯着这边，散发出稍有空隙就会马上袭击过来的气氛`,
      );
      await era.printAndWait(
        `但是无力抵抗的${she(a)}只能就这样被变成冰雕像、在大众面前露出着难看的姿态…`,
      );
    } else if (get(`mark:${target}:3`) === 3) {
      await era.printAndWait(
        `${chara_callname(a)}用严峻的神色瞪着${chara_callname(0)}，一副宁死不屈的姿态。`,
      );
      await era.printAndWait(
        `不过，无法反抗的${she(a)}最后还是被做成了冰雕，将那美丽的肢体呈现在大众眼前。`,
      );
    } else if (get(`talent:${a}:85`)) {
      await era.printAndWait(`被变成冰雕像的${chara_callname(a)}平静的微笑着`);
    } else if (get(`talent:${a}:153`)) {
      await era.printAndWait(
        `妊娠的${chara_callname(a)}、就那样以腹部膨胀起来的状态被变成了冰雕像装饰了起来…`,
      );
      locals = '妊娠';
    } else if (get(`talent:${a}:35`)) {
      await era.printAndWait(
        `${chara_callname(a)}因为很害羞、用两手拼命地想遮住自己的身体`,
      );
      await era.printAndWait(
        `因为遮挡的途中被冻结、手停在了不上不下的位置挡不住关键的部位`,
      );
      await era.printAndWait(
        `因为${she(a)}那混入了羞耻和困惑的表情而风格独特的冰雕像被装饰了起来`,
      );
    } else if (get(`talent:${a}:28`) || get(`talent:${a}:89`)) {
      await era.printAndWait(
        `一直隐藏露出癖的${chara_callname(a)}浮现出恍惚的表情、以好像在卖弄自己的身体一样的姿势被装饰在了台座上…`,
      );
    } else if (get(`talent:${a}:14`) || get(`talent:${a}:26`)) {
      await era.printAndWait(
        `${chara_callname(a)}好像早早地就接受了自己的状况、带着混入了顿悟和达观的表情静静地伫立在那里…`,
      );
    } else if (get(`talent:${a}:113`)) {
      await era.printAndWait(
        `变成冰雕像的${chara_callname(a)}被用正在小便的孩子的姿势装饰了起来…`,
      );
      locals = '魅惑';
    }
    await era.printAndWait(`现在冰雕像的数量…${game.event.冰像数}个`);
    maturo = locals + maturo;
  } else if (game.event.博物馆口上 === 7) {
    game.event.装饰品数 += 1;
    game.event.金属像数_2 += 1;
    era.print(`${chara_callname(a)}被封印了全部的力量，站在邪恶的魔法阵中央。`);
    await era.printAndWait(
      `属下的魔物收到指示，瞬间，耀眼的光芒包围了${she(a)}。`,
    );
    await era.printAndWait(
      `在光芒里，${she(a)}感到自己心中突然一片澄清，再也没有一丝杂质。`,
    );
    await era.printAndWait(
      `不知何来的爽快感及清爽感，使踌躇的${she(a)}感到舒适，将身心都委托给了这种感觉。`,
    );
    await era.printAndWait(`不一会儿，光芒消失。`);
    line = `${she(a)}的身体变成了`;
    if (rand_n(8) === 0) {
      line += '蛋白石';
      maturo = '蛋白石';
    } else if (rand_n(8) === 1) {
      line += '翡翠';
      maturo = '翡翠';
    } else if (rand_n(8) === 2) {
      line += '红宝石';
      maturo = '红宝石';
    } else if (rand_n(8) === 3) {
      line += '绿宝石';
      maturo = '绿宝石';
    } else if (rand_n(8) === 4) {
      line += '蓝宝石';
      maturo = '蓝宝石';
    } else if (rand_n(8) === 5) {
      line += '紫水晶';
      maturo = '紫水晶';
    } else {
      line += '玻璃';
      maturo = '玻璃';
    }
    await era.printAndWait(`${line}雕像。`);
    maturo += '雕像';
    if (
      get(`mark:${target}:3`) === 3 &&
      (get(`talent:${a}:11`) ||
        get(`talent:${a}:12`) ||
        get(`talent:${a}:16`) ||
        get(`talent:${a}:34`))
    ) {
      await era.printAndWait(
        `${chara_callname(a)}带着险恶的表情盯着这边，散发出稍有空隙就会马上袭击过来的气氛`,
      );
      await era.printAndWait(
        `但是无力抵抗的${she(a)}只能就这样被变成宝石像、在大众面前露出着难看的姿态…`,
      );
    } else if (get(`mark:${target}:3`) === 3) {
      await era.printAndWait(
        `${chara_callname(a)}用严峻的神色瞪着${chara_callname(0)}，一副宁死不屈的姿态。`,
      );
      await era.printAndWait(
        `不过，无法反抗的${she(a)}最后还是被做成了宝石像，将那美丽的肢体呈现在大众眼前。`,
      );
    } else if (get(`talent:${a}:85`)) {
      await era.printAndWait(
        `${chara_callname(a)}虽然被变成了宝石像、但却温和的微笑着…`,
      );
    } else if (get(`talent:${a}:153`)) {
      await era.printAndWait(
        `妊娠的${chara_callname(a)}、就那样以腹部膨胀起来的状态被变成了宝石像装饰了起来…`,
      );
      locals = '妊娠';
    } else if (get(`talent:${a}:60`) || get(`talent:${a}:80`)) {
      await era.printAndWait(
        `在这种特异的情况下，性兴奋反而战胜了恐怖。${chara_callname(a)}成为了带有兴奋表情的宝石像了……`,
      );
    } else if (get(`talent:${a}:28`) || get(`talent:${a}:89`)) {
      await era.printAndWait(
        `一直隐藏露出癖的${chara_callname(a)}浮现出恍惚的表情、以好像在卖弄自己的身体一样的姿势被装饰在了台座上…`,
      );
    } else if (get(`talent:${a}:14`) || get(`talent:${a}:26`)) {
      await era.printAndWait(
        `${chara_callname(a)}好像早早地就接受了自己的状况、带着混入了顿悟和达观的表情静静地伫立在那里…`,
      );
    } else if (get(`talent:${a}:35`)) {
      await era.printAndWait(
        `${chara_callname(a)}因为很害羞、用两手拼命地想遮住自己的身体`,
      );
      await era.printAndWait(
        `因为遮挡的途中被宝石化、手停在了不上不下的位置挡不住关键的部位`,
      );
      await era.printAndWait(
        `因为${she(a)}那混入了羞耻和困惑的表情而风格独特的宝石像被装饰了起来`,
      );
    } else if (get(`talent:${a}:136`)) {
      await era.printAndWait(
        `${chara_callname(a)}大概是因为无意识的想起被当做野兽时的行为、`,
      );
      await era.printAndWait(
        `以「坐下」的姿势、就那样以等待着下个命令的状态被变成宝石像装饰了起来…`,
      );
      locals = '牝犬';
    } else if (get(`talent:${a}:113`)) {
      await era.printAndWait(
        `变成宝石像的${chara_callname(a)}散发着说不出的美丽…`,
      );
      locals = '魅惑';
    }
    await era.printAndWait(`现在的宝石像数量…${game.event.金属像数_2}个`);
    maturo = locals + maturo;
  } else if (game.event.博物馆口上 === 8) {
    game.event.装饰品数 += 1;
    game.event.家具数 += 1;
    era.print(`${chara_callname(a)}被封印了全部的力量，站在邪恶的魔法阵中央。`);
    await era.printAndWait(
      `属下的魔物收到指示，瞬间，耀眼的光芒包围了${she(a)}。`,
    );
    await era.printAndWait(
      `在光芒里，${she(a)}感到自己全身都被肢解了，肢体被再构筑成了家具。`,
    );
    await era.printAndWait(
      `剧烈的痛楚，被魔法转换成了快感，充斥着${she(a)}的身心。`,
    );
    await era.printAndWait(
      `被无法想象的快感所笼罩，${chara_callname(a)}渐渐地接受了自己被构筑的事实。`,
    );
    await era.printAndWait(`不一会儿，光芒消失。`);
    line = `${she(a)}的身体变成了`;
    if (rand_n(8) === 0) {
      line += '桌子';
      maturo = '人形桌子';
    } else if (rand_n(8) === 1) {
      line += '椅子';
      maturo = '人形椅子';
    } else if (rand_n(8) === 2) {
      line += '烛台';
      maturo = '人形烛台';
    } else if (rand_n(8) === 3) {
      line += '柜子';
      maturo = '人形柜子';
    } else {
      line += '花瓶';
      maturo = '人形花瓶';
    }
    await era.printAndWait(`${line}的样子。`);
    await era.printAndWait(`现在的家具数量…${game.event.家具数}个`);
  } else if (game.event.博物馆口上 === 9) {
    game.event.装饰品数 += 1;
    game.event.绘画数 += 1;
    era.print(`${chara_callname(a)}被封印了全部的力量，站在邪恶的魔法阵中央。`);
    await era.printAndWait(
      `在${she(a)}后面的墙上，用上等画框裱着的纸上面，画着同样的魔法阵。`,
    );
    await era.printAndWait(
      `属下的魔物收到指示，魔法阵之间产生了奇怪的共鸣。瞬间，耀眼的光芒包围了${she(a)}。`,
    );
    await era.printAndWait(
      `…在光芒里，${she(a)}感到自己从脚开始正慢慢地化为了粒子，粒子随着魔力，流动到不知什么地方。`,
    );
    await era.printAndWait(
      `很快，${she(a)}的全身都被粒子化了，粒子沿着魔力的流动，渐渐汇聚在画框里，一瞬间，${she(a)}明白了一切。`,
    );
    await era.printAndWait(
      `【我要在这光芒中永远消失了吗？】抱着这样的恐惧，但在${she(a)}想出答案之间，意识就消失了。`,
    );
    await era.printAndWait(
      `不一会儿，光芒消失。画框中的魔法阵，渐渐在画纸上变成了一些风景和生物。`,
    );
    line = `${she(a)}变成了题材为`;
    z = rand_n(8);
    if (get(`talent:${a}:85`)) {
      line += '「依偎着魔王的魔王侧室」';
      maturo = '魔王侧室';
    } else if (
      get(`talent:${target}:317`) === 4 ||
      get(`talent:${target}:315`) === 21
    ) {
      if (get(`talent:${target}:122`)) {
        line += '「与爱人并立的男人」';
        maturo = '人妻';
      } else {
        line += '「与爱人并立的女人」';
        maturo = '人妻';
      }
    } else if (get(`talent:${target}:315`) === 1) {
      line += '「课堂上听课的学生」';
      maturo = '学生';
    } else if (
      get(`talent:${target}:315`) === 2 ||
      get(`talent:${target}:315`) === 12
    ) {
      line += '「天使与圣母指引前往天界的圣职者」';
      maturo = '升天';
    } else if (z === 0) {
      if (get(`talent:${target}:122`)) {
        line += '「林间与动物、妖精嬉戏的爱花人」';
        maturo = '森之住民';
      } else {
        line += '「林间与动物、妖精嬉戏的爱花女人」';
        maturo = '森女';
      }
    } else if (z === 1) {
      if (get(`talent:${target}:122`)) {
        line += '「湖畔水浴的裸男」';
        maturo = '裸男';
      } else {
        line += '「湖畔水浴的裸妇」';
        maturo = '裸妇';
      }
    } else if (z === 2) {
      if (get(`talent:${target}:122`)) {
        line += '「在街道上招蜂引蝶的男人」';
      } else {
        line += '「街道上引人注目的女人」';
      }
      maturo = '娼妓';
    } else if (z === 3) {
      line += '「收获祭典上欢乐的民众」';
      maturo = '群交';
    } else if (z === 4) {
      line += '「关怀仆人的女贵族」';
      maturo = '贵族';
    } else if (z === 5) {
      line += '「海中与鱼虾嬉戏的人鱼」';
      maturo = '人鱼';
    } else {
      if (get(`talent:${target}:122`)) {
        line += '「依偎着狂王的性奴」';
      } else {
        line += '「依偎着狂王的裸妇」';
      }
      maturo = '狂王性奴';
    }
    await era.printAndWait(`${line}绘画中的一部分。`);
    await era.printAndWait(
      `${chara_callname(a)}作为画中世界的居民，将永远在画里生活下去。`,
    );
    if (get(`talent:${a}:85`)) {
      await era.printAndWait(
        `在画里面，${chara_callname(a)}正甜蜜地笑着，小鸟依人地依偎着你。`,
      );
    }
    await era.printAndWait(`现在的画像数量…${game.event.绘画数}幅`);
    maturo += '画';
  }

  if (family_id >= 0) {
    // CSTR:5 = 家族成员的末路说明。
    era.set(`cstr:${family_id}:5`, maturo);
  }

  const archive_title = `${maturo}${chara_callname(a)}`;
  // TSTR:30 = VIDEO_MATURO 的一次性标题；VideoArchive = 角色末路标题表。
  era.set('tstr:30', archive_title);
  era.set(`videoarchive:${a}`, archive_title);
  video_maturo(a);

  const target_chara = chara(a);
  for (const [owner, field] of [
    [target_chara.chara, '武装'],
    [target_chara.event, '装饰'],
    [target_chara.event, '装饰2'],
  ]) {
    equip_get({ 存储编号: owner[field] });
    owner[field] = -1;
  }

  lv = target_chara.chara.等级;
  // FLAG:(角色 ID + 199) = 对应勇者已经处刑。
  era.set(`flag:${a + 199}`, 1);

  // FLAG:1/2 = 上次调教目标/助手；被删角色本身需清空。原作第 1062-1066 行
  // 的注册号重排依赖 DELCHARA 后编号前移，ere 的角色 ID 稳定，故不移植。
  if (game.event.上次调教对象 === a) game.event.上次调教对象 = -1;
  if (game.event.上次助手 === a) game.event.上次助手 = -1;
  era_flag.target = game.event.上次调教对象;
  era_flag.assi = game.event.上次助手;

  party_char_del(a);
  era.removeCharacter(a);
  await name_reset();

  game.event.处刑勇者数 += 1;
  lv = (lv + 1) * 50;
  chara(0).dungeon.战斗经验 += lv;
  // TALENT:329 = 造型王实绩；原作先加经验再翻倍显示值，顺序 1:1 保留。
  if (get('talent:0:329')) lv *= 2;
  line = '《封印吸取了勇者的力量，';
  if (get('talent:0:329')) {
    line += '因为造型王实绩的双倍加成，最后';
  }
  await era.printAndWait(`${line}获得了${lv}点的经验值！》`);
  if (
    game.event.装饰品数 >= 20 &&
    era_flag.day_count < 60 &&
    !get('talent:0:329')
  ) {
    await era.printAndWait(
      '派遣讨伐魔王的勇者、似乎让城市渐渐过上了安宁的日子……',
    );
    await era.printAndWait(
      '某日、传出了在地下城附近建起了、以来自魔王的「友好之证」为名的博物馆之类的传闻',
    );
    await era.printAndWait('「勇者……和魔王交涉过了吗？」');
    await era.printAndWait('「打成什么样了啊？」');
    await era.printAndWait('城里的外交官在护卫的引导下来到了博物馆');
    await era.printAndWait('在那里人们见到的是……已然面目全非的「勇者」们');
    await era.printAndWait('…………');
    await era.printAndWait('……');
    await era.printAndWait(`你获得了${era.get('talentname:329') || ''}`);
    era.set('talent:0:329', 1);
  }

  era_flag.target = game.event.上次调教对象;
  era_flag.assi = game.event.上次助手;
  return 0;
}

module.exports = { museum };
