/* eslint-disable no-irregular-whitespace, no-dupe-else-if, no-unused-vars */
/**
 * @file 悪女性格口上 K6（issue #237）。
 *
 * 转译初稿 products/kojo/kojo-k6-wicked.js（#107）经逐段复核后移入。
 *
 * == 头部检查（K6 与 K2/K5 不同，逐文件不同） ==
 *
 * kojo_message_com_6 的检查（实测）：
 *   1. ASSI > 0 && ASSIPLAY（助手调教）→ 跳过；
 *   2. TEQUIP:45 && SELECTCOM != 45（口塞）→ 跳过；
 *   3. TFLAG:899（失神）→ 跳过；
 *   4. TALENT:9（崩坏）→ 跳过；
 *   5. TEQUIP:89（兽奸）→ **岔去本文件真身 dog_kojo_6**；
 *   6. TEQUIP:55（死斗场）→ **岔去本文件真身 colosseum_kojo_6**。
 * **无 TEQUIP:90 头部检查**（触手只在 COM 6 内部出现）。
 *
 * == 状态机（CFLAG:301～400，个位数推进） ==
 *
 * 各 SELECTCOM 分支按「初めて → 淫乱(76) → 爱慕(85) → 刻印/顺从分档 →
 * それ以外」取首个命中；FLAG:7 == 2（默认）时 CFLAG 上限被旁路、同支
 * 每次出声；FLAG:7 == 1 时逐阶段各出一次声。
 *
 * SELL_MATURO_K0 成熟出售真身已随 #338 接通。
 */

const era = require('#/era-electron');
const { sell_maturo_k0 } = require('#/system/stronghold/sell-maturo');
const { on, TIER } = require('#/system/event/registry');
const era_flag = require('#/era-utils/era-flag');
const { PALAMLV } = require('#/era-utils/palam-level');
const {
  kojo_message_com_family,
  kojo_message_palamcng_family,
  kojo_message_markcng_family,
  self_kojo_family,
  dog_kojo_family,
  colosseum_kojo_family,
  benki_koujo_family,
  dungeon_victory_family,
  dungeon_attack_family,
  ntr_koujo_family,
  exucution_koujo_family,
  museum_koujo_family,
  banishment_koujo_family,
  public_exucution_koujo_family,
  grotesque_koujo_family,
  enterenemy_koujo_family,
  gobi_koujo_family,
} = require('#/kojo/kojo-system');
const {
  gohoubi_after_koujo_family,
  osioski_koujo_family,
  gohoubi_request_koujo_family,
} = require('#/kojo/kojo-dungeon-after');
const {
  ryouzyoku_kojo_family,
  ryouzyoku_after_kojo_family,
} = require('#/kojo/kojo-dungeon-ravish');
const { heart, self_call, self_call_first } = require('#/kojo/kojo-text');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const {
  peek_aftertrain_q,
  peek_aftertrain_s,
} = require('#/event/event-aftertrain');
const { chara_callname, chara_name } = require('#/utils/callname-utils');

/**
 * 口上函数共用的读取面：随机源、当前角色名、自称、门面。
 * @param {(n: number) => number} [rand]
 */
function bind_ctx(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const assi = era_flag.assi;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const assi_name = assi >= 0 ? chara_callname(assi) : ''; // %SAVESTR:ASSI%
  const master_name = chara_name(0); // %NAME:MASTER%
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%
  const scf = () => self_call_first(target); // %SELF_CALL_FIRST(TARGET)%
  const view = chara(target);
  const kojo = chara(target).kojo;
  return {
    rand_n,
    target,
    assi,
    target_name,
    player_name,
    assi_name,
    master_name,
    sc,
    scf,
    view,
    kojo,
  };
}

// EVENTTRAIN #PRI 档：存在标志 + 总开关补 0
on(
  'EVENTTRAIN',
  () => {
    game.kojo.口上存在_6 = 1; // FLAG:106 = 1（K6 口上存在标志）
    if (game.kojo.口上开关 === 0) {
      game.kojo.口上开关 = 2;
    }
  },
  TIER.PRI,
);

// EVENTEND #LATER 档：调教结束清存在标志
on(
  'EVENTEND',
  () => {
    game.kojo.口上存在_6 = 0;
  },
  TIER.LATER,
);

async function eventtrain_k6(rand) {
  const {
    rand_n,
    target,
    assi,
    target_name,
    player_name,
    assi_name,
    master_name,
    sc,
    scf,
    view,
    kojo,
  } = bind_ctx(rand);
  if (game.kojo.口上开关 <= 0) {
    return 0;
  }
  if ((era.get(`talent:${target}:166`) || 0) !== 1) {
    return 0;
  }

  if (kojo.初调教 === 0) {
    era.drawLine();

    if ((era.get(`talent:${target}:314`) || 0) === 1) {
      await era.printAndWait(`「别、别盯着我看啊！你这家伙！」`);
      await era.printAndWait(
        `${target_name}用比平常的精灵锐利得多的目光直视着${player_name}。`,
      );
      await era.printAndWait(`这样的对象应该很难快速驯服吧。`);
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;
    } else if ((era.get(`talent:${target}:314`) || 0) === 2) {
      await era.printAndWait(`「只要你敢再靠近一步…我就咬断你的喉咙！」`);
      await era.printAndWait(
        `${target_name}瞪着${player_name}恶狠狠地威胁道。。`,
      );
      await era.printAndWait(`这样的对象狼应该很难快速驯服吧。`);
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;
    } else if ((era.get(`talent:${target}:314`) || 0) === 3) {
      await era.printAndWait(
        `「不妨把你身上所具有的魔王的权能都让渡给我，然后去给我扫一辈子的厕所吧！」`,
      );
      await era.printAndWait(
        `${target_name}带着冷酷的表情凝视着${player_name}。`,
      );
      await era.printAndWait(`这样的对象吸血鬼应该很难快速驯服吧。`);
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;
    } else if ((era.get(`talent:${target}:314`) || 0) === 4) {
      await era.printAndWait(
        `「你就是所谓的魔王？哈哈哈哈…这样的魔王还真是荒谬得令人发笑啊！」`,
      );
      await era.printAndWait(
        `${target_name}因为愤怒而扬起眉毛，瞪视着${player_name}。`,
      );
      await era.printAndWait(
        `稍微大意了一点就被身为无头骑士的她用飞过来的头袭击了。`,
      );
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;
    } else if ((era.get(`talent:${target}:314`) || 0) === 5) {
      await era.printAndWait(
        `「像你这种程度的魔王，要不是${sc()}被那些家伙打倒了…！」`,
      );
      await era.printAndWait(`${target_name}因为后悔而露出咬牙切齿的样子。`);
      await era.printAndWait(`如果能驯服这样的龙人大概会非常有趣吧……`);
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;
    } else if ((era.get(`talent:${target}:314`) || 0) === 6) {
      await era.printAndWait(
        `「哼，既然被天堂那些大天使驱逐了，就勉勉强强投靠你吧！」`,
      );
      await era.printAndWait(
        `虽然是个天使，${target_name}却毫不在意的说着这样罪恶的台词。`,
      );
      await era.printAndWait(
        `对于这样嚣张的天使所进行的调教，一定要彻底征服她的肉体与心灵才行。`,
      );
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;
    } else if ((era.get(`talent:${target}:314`) || 0) === 9) {
      await era.printAndWait(
        `${target_name}是被改造才变成魔族的。${player_name}这个改造的主使者来到的时候，却注意到她脸上的表情有些严峻。`,
      );
      await era.printAndWait(
        `「呼，哼…变成这样其实也无所谓啦，但好歹先把我身上这些东西解开啊！」`,
      );
      await era.printAndWait(
        `「如果${sc()}把你劫持了是不是就可以自己当魔王啦？哈，听起来不错嘛！」`,
      );
      await era.printAndWait(
        `但作为魔族的她只能任你为所欲为，这是来自她本能的对魔族之王的遵从………`,
      );
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;

      // CFLAG:370  = 1（变量语义：CFLAG 族，370）
      kojo.魔族化 = 1;
    } else if ((era.get(`talent:${target}:314`) || 0) === 10) {
      await era.printAndWait(
        `「真是没办法…这样吧，每天都能让我吃饱的话就暂时老老实实听你的话，可以吗？」`,
      );
      await era.printAndWait(`${target_name}向${player_name}要求更好的待遇。`);
      await era.printAndWait(`有点被霍比特这个种族的价值观吓到了啊……`);
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;
    } else if ((era.get(`talent:${target}:314`) || 0) === 11) {
      await era.printAndWait(`「用、用我的矿山来换取我的自由吧！」`);
      await era.printAndWait(
        `${target_name}是矮人，号称自己能付出像黄金矿山那么多的赎金，然而${player_name}并不相信她说的这些。`,
      );
      await era.printAndWait(`真正想要的是这个矮人的身体啊……`);
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;
    } else {
      if (rand_n(10) === 0) {
        await era.printAndWait(
          `「喂！你…你想干什么！为什么我的眼睛…放开我！你这个变态！${sc()}绝不会被你洗脑的！」`,
        );
      } else {
        await era.printAndWait(
          `「喂！你…你想干什么！为什么我的眼睛…放开我！你这个变态！」`,
        );
      }
      await era.printAndWait(
        `${target_name}简直不像是一个勇者，征服这样的她应该是很难的吧……`,
      );
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;
      return 1;
    }
  } else if (
    kojo.初调教 < 5 &&
    kojo.魔族化 === 0 &&
    (era.get(`talent:${target}:314`) || 0) === 9 &&
    (era.get(`talent:${target}:85`) || 0) === 0 &&
    (era.get(`talent:${target}:76`) || 0) === 0
  ) {
    await era.printAndWait(
      `${target_name}是被多次改造后才变成魔族的。${player_name}这个改造的主使者来到的时候，却注意到她脸上的表情有些严峻。`,
    );
    await era.printAndWait(
      `「该死…都是因为你这个家伙，我才会变成现在这样子！」`,
    );
    await era.printAndWait(
      `「哼，你给我小心点，我一定会找机会取代你成为魔王的！现在，给我滚出去！」`,
    );
    await era.printAndWait(
      `但作为魔族的她只能任你为所欲为，这是来自她本能的对魔族之王的遵从………`,
    );

    // CFLAG:370  = 2（变量语义：CFLAG 族，370）
    kojo.魔族化 = 2;
    return 1;
  } else if (kojo.初调教 >= 1 && kojo.NTR再捕获 === 1) {
    if (
      era.get(`talent:${target}:85`) ||
      0 ||
      era.get(`talent:${target}:76`) ||
      0
    ) {
      era.drawLine();
      await era.printAndWait(
        `「这个，咳咳，我回来了！啊嗯…唔嗯…反正，${sc()}就是这样人尽可夫的糟糕家伙，有什么大不了的嘛！」`,
      );
      await era.printAndWait(
        `${target_name}糟糕的态度简直像一个凌晨回家的妻子。`,
      );
      await era.printAndWait(
        `「呐，这个水晶球里是狂王想要对魔王大人说的话…总之全都是假的！给我忘掉啊！你给我忘掉那些话！」`,
      );

      // CFLAG:650  = 0（变量语义：CFLAG 族，650）
      kojo.NTR再捕获 = 0;
    } else {
      era.drawLine();
      await era.printAndWait(
        `「哼，总算是回到这儿了呢。虽然狂王那儿也不坏，但好像还是自己人这里更舒服一点嘛。」`,
      );
      await era.printAndWait(`${target_name}想着背叛的经过邪恶地笑了起来………`);

      // CFLAG:650  = 0（变量语义：CFLAG 族，650）
      kojo.NTR再捕获 = 0;
    }
    return 1;
  } else if (kojo.初调教 < 2 && (era.get(`mark:${target}:2`) || 0) === 1) {
    era.drawLine();
    await era.printAndWait(
      `「啊，不行…不行，没办法逃跑的话，只能先想个法子把这家伙糊弄着再说了。」`,
    );
    await era.printAndWait(
      `${target_name}看${player_name}的目光似乎变得柔和了一些……`,
    );
    // CFLAG:201  = 2（变量语义：CFLAG 族，201）
    kojo.初调教 = 2;
    return 1;
  } else if (kojo.初调教 < 3 && (era.get(`mark:${target}:2`) || 0) === 2) {
    era.drawLine();
    await era.printAndWait(`「似乎没那么讨厌这家伙了啊…${sc()}…已经……」`);
    await era.printAndWait(
      `${player_name}向${target_name}走来，逼得她一步步退后。`,
    );
    await era.printAndWait(`「不…不行了…不想抵抗了…反而有点期待啊……」`);
    await era.printAndWait(
      `身后就是墙壁，无法退后的${target_name}身体都开始颤抖了……`,
    );
    // CFLAG:201  = 3（变量语义：CFLAG 族，201）
    kojo.初调教 = 3;
    return 1;
  } else if (
    kojo.初调教 < 4 &&
    (era.get(`mark:${target}:2`) || 0) === 3 &&
    (era.get(`talent:${target}:85`) || 0) === 0
  ) {
    era.drawLine();
    await era.printAndWait(`「啊——啊、啊，已经……没办法反抗了…」`);
    await era.printAndWait(
      `${target_name}像奴隶一样来到${player_name}身前，缓缓跪下。`,
    );
    await era.printAndWait(
      `「至今为止一直…过分地任性呢…对，对不起了…啊啊啊啊……」`,
    );
    await era.printAndWait(
      `流下象征着完全屈服的眼泪，${target_name}向${player_name}卑微地低下了头，几乎要吻到你的脚。`,
    );
    // CFLAG:201  = 4（变量语义：CFLAG 族，201）
    kojo.初调教 = 4;
    return 1;
  } else if (
    kojo.初调教 < 5 &&
    (era.get(`talent:${target}:85`) || 0) === 0 &&
    (era.get(`talent:${target}:76`) || 0) === 1 &&
    (era.get(`talent:${target}:314`) || 0) !== 9
  ) {
    era.drawLine();
    await era.printAndWait(`${target_name}双腿呈M字打开，妩媚地看着你。`);
    await era.printAndWait(
      `「${sc()}一直在犯错呢……来干死我啊……狠狠的操我吧…」`,
    );
    await era.printAndWait(`温热的舌头诉说着淫猥放荡的话语`);
    await era.printAndWait(`曾经的傲慢不逊完完全全地消失了。`);
    // CFLAG:201  = 5（变量语义：CFLAG 族，201）
    kojo.初调教 = 5;
    return 1;
  } else if (
    (era.get(`talent:${target}:314`) || 0) === 9 &&
    kojo.初调教 < 6 &&
    (era.get(`talent:${target}:85`) || 0) === 0 &&
    (era.get(`talent:${target}:76`) || 0) === 1
  ) {
    era.drawLine();

    if (kojo.魔族化 === 1) {
      await era.printAndWait(
        `被转化为魔族并且反复调教过后，${target_name}已经完全陷落了。`,
      );
      await era.printAndWait(
        `身为魔族的眼睛泛着春光，光是看到你的两腿间就已经淫水泛滥起来，害羞地磨擦着双腿。`,
      );
      await era.printAndWait(`「呼哈，控制不住了…快给我大肉棒吧！」`);

      if ((era.get(`talent:${target}:0`) || 0) === 1) {
        await era.printAndWait(
          `「啊啊啊…快来把${sc()}的处女膜狠狠捅破吧！无论是怎样的家伙都好，来免费侵犯${sc()}鲜嫩的小穴吧！」`,
        );
        await era.printAndWait(`${target_name}压抑着体内的性欲流着泪乞求着。`);
      }
      await era.printAndWait(
        `${target_name}愈发兴奋地抱住${player_name}，伸出灼热的舌头在脸上舔来舔去。`,
      );
      await era.printAndWait(
        `「哈…哈…要上天了…这样的气味…啊啊啊啊啊啊啊…魔王大人的汗…是最上等的味道…已经…无法思考了啊！${heart(1)}」`,
      );
      await era.printAndWait(
        `「您的大肉棒…真是令人着迷啊…就让我来…服侍您吧… ${heart(3)}」`,
      );
      await era.printAndWait(`之前那个傲慢不可一世的样子已经完全看不出来了………`);
      // CFLAG:201  = 6（变量语义：CFLAG 族，201）
      kojo.初调教 = 6;
      return 1;
    } else if (kojo.魔族化 === 2) {
      await era.printAndWait(
        `被转化为魔族并且反复调教过后，${target_name}完全陷落了。`,
      );
      await era.printAndWait(
        `身为魔族的眼睛泛着春光，光是看到你两腿间就已经淫水泛滥起来，害羞地磨擦着双腿。`,
      );
      await era.printAndWait(`「呼哈，控制不住了…快给我大肉棒吧！」`);

      if ((era.get(`talent:${target}:0`) || 0) === 1) {
        await era.printAndWait(
          `「啊啊啊…快来把${sc()}的处女膜狠狠捅破吧！无论是怎样的家伙都好，来免费侵犯${sc()}鲜嫩的小穴吧！」`,
        );
        await era.printAndWait(`${target_name}压抑着体内的性欲流着泪乞求着。`);
      }
      await era.printAndWait(
        `${target_name}愈发兴奋地抱住${player_name}伸出灼热的舌头在脸上舔来舔去。`,
      );
      await era.printAndWait(
        `「哈…哈…要上天了…这样的气味…啊啊啊啊啊啊啊…魔王大人的汗…是最上等的味道…已经…无法思考了啊！${heart(1)}」`,
      );
      await era.printAndWait(
        `「您的大肉棒…真是令人着迷啊…就让我来…服侍您吧… ${heart(3)}」`,
      );
      await era.printAndWait(`之前那个傲慢不可一世的样子已经完全看不出来了………`);
      // CFLAG:201  = 6（变量语义：CFLAG 族，201）
      kojo.初调教 = 6;
      return 1;
    } else {
      await era.printAndWait(
        `「是啊…唔…啊啊…魔王大人…真好…感觉…只是靠近您…就会充满魔力啊…${heart(1)}」`,
      );
      await era.printAndWait(
        `变成魔族的${target_name}在地板上来来回回地走着，大概是受到魔王魔力刺激的缘故，地板上到处都是一摊一摊的爱液。`,
      );
      await era.printAndWait(
        `发现了这一点的${player_name}故意放出一点魔力，让${target_name}艰难地吸收了。`,
      );
      await era.printAndWait(
        `「啊啊啊啊啊啊啊啊…这么棒的身体，真是开心啊啊${heart(3)} 请让我变成魔王大人的私有物吧，${sc()}做出了正确的决定呢…！」`,
      );
      await era.printAndWait(
        `${target_name}发自内心地对能成为魔族这件事感到十分欢喜………`,
      );

      if ((era.get(`talent:${target}:0`) || 0) === 0) {
        await era.printAndWait(
          `然后${target_name}莞尔一笑，呈M字打开双腿用手托着，像是在诱惑${player_name}一样。`,
        );
        await era.printAndWait(
          `「就像是重生了一样…请尽情地享用作为魔族的${sc()}吧！魔王大人那浓厚的精液～${heart(1)}」`,
        );
      }
      // CFLAG:201  = 6（变量语义：CFLAG 族，201）
      kojo.初调教 = 6;
      return 1;
    }
  } else if (
    kojo.初调教 < 7 &&
    (era.get(`talent:${target}:85`) || 0) === 1 &&
    (era.get(`talent:${target}:314`) || 0) !== 9
  ) {
    era.drawLine();
    await era.printAndWait(`${target_name}依偎在你怀里说着话`);
    await era.printAndWait(
      `「之前是${sc()}错了…对不起…从今往后，什么都听您的…」`,
    );
    await era.printAndWait(`热泪盈眶的她的身姿连忏悔都显得美丽至极。`);
    await era.printAndWait(`曾经的傲慢全无踪影…`);
    // CFLAG:201  = 7（变量语义：CFLAG 族，201）
    kojo.初调教 = 7;
    return 1;
  } else if (
    (era.get(`talent:${target}:314`) || 0) === 9 &&
    kojo.初调教 < 8 &&
    (era.get(`talent:${target}:85`) || 0) === 1 &&
    (era.get(`talent:${target}:76`) || 0) === 0
  ) {
    era.drawLine();

    if (kojo.魔族化 === 1) {
      await era.printAndWait(
        `被转化为魔族并且反复调教过后，${target_name}完全陷落了。`,
      );
      await era.printAndWait(
        `「${sc()}已经完完全全爱上魔王大人了呢……今后也会一直侍奉在魔王大人身边的……${heart(1)}`,
      );
      await era.printAndWait(
        `弯曲双膝低下螓首，亲吻了身为魔王的${player_name}的脚背立下了誓约之吻。。`,
      );
      await era.printAndWait(`「啊…这种心动…要死了啦…${heart(1)}」`);

      if ((era.get(`talent:${target}:0`) || 0) === 1) {
        await era.printAndWait(
          `「啊唔…嗯…就把${sc()}的处子之身送给您当做礼物吧…要好好疼爱我哟，这可是我小心珍藏到现在的宝物呢………♪」`,
        );
        await era.printAndWait(`${target_name}伏在${player_name}脚下恳求道……`);
      }
      // CFLAG:201  = 8（变量语义：CFLAG 族，201）
      kojo.初调教 = 8;
      return 1;
    } else if (kojo.魔族化 === 2) {
      await era.printAndWait(
        `被转化为魔族并且反复调教过后，${target_name}完全陷落了。`,
      );
      await era.printAndWait(
        `「${sc()}已经完完全全爱上魔王大人了呢……今后也会一直侍奉在魔王大人身边的……${heart(1)}`,
      );
      await era.printAndWait(
        `弯曲双膝低下螓首，亲吻了身为魔王的${player_name}的脚背立下了誓约之吻。。`,
      );
      await era.printAndWait(`「啊…这种心动…要死了啦…${heart(1)}」`);

      if ((era.get(`talent:${target}:0`) || 0) === 1) {
        await era.printAndWait(
          `「啊唔…嗯…就把${sc()}的处子之身送给您当做礼物吧…要好好疼爱我哟，这可是我小心珍藏到现在的宝物呢………♪」`,
        );
        await era.printAndWait(`${target_name}伏在${player_name}脚下恳求道……`);
      }
      // CFLAG:201  = 8（变量语义：CFLAG 族，201）
      kojo.初调教 = 8;
      return 1;
    } else {
      await era.printAndWait(
        `「切…明明一开始是以魔王大人的性命作为目标的…怎么会不知不觉就变成这样了啊…」`,
      );
      await era.printAndWait(
        `已经被改造成魔族的${target_name}坐在那儿，表情有些落寞。`,
      );
      await era.printAndWait(
        `「可是…已经变成这样了啊…已经，离不开魔王大人了呢…♪」`,
      );
      await era.printAndWait(`${target_name}抱住${player_name}深情地亲吻着………`);

      if ((era.get(`talent:${target}:0`) || 0) === 1) {
        await era.printAndWait(
          `「呐，就这样，就这样把我的处女也、也拿去吧！一直以来…都在期待这一天的到来呢…」`,
        );
        await era.printAndWait(
          `${target_name}突然变得兴奋起来，很快身体就与${player_name}的腿和尾巴纠缠在一起………`,
        );
      }
      // CFLAG:201  = 8（变量语义：CFLAG 族，201）
      kojo.初调教 = 8;
      return 1;
    }
  } else if ((era.get(`talent:${target}:9`) || 0) === 1 && kojo.初调教 < 9) {
    era.drawLine();
    await era.printAndWait(
      `${target_name}带着恍惚的表情用指甲刮着房间的墙壁。`,
    );
    await era.printAndWait(`「想从这里出去…好想出去啊啊啊啊啊…呜呜…」`);
    await era.printAndWait(`${target_name}的精神受到了难以恢复的巨大创伤……`);
    // CFLAG:201  = 9（变量语义：CFLAG 族，201）
    kojo.初调教 = 9;
    return 1;
  } else if (era_flag.assi < 0) {
    await k6_kojo2(rand_n); // CALL K6_KOJO2
  } else if (assi === 17) {
    era.drawLine();
    if (era.get(`talent:${assi}:165`) || 0) {
      if (kojo.简易助手_0 === 0) {
        if ((era.get(`talent:${target}:9`) || 0) === 1) {
          era.setColor('#ffccff'); // SETCOLOR 255,204,255
          await era.printAndWait(
            `『诶？主人，这个人，看起来已经被玩坏掉了的样子呢～』`,
          );
          era.setColor(''); // RESETCOLOR
          await era.printAndWait(
            `的确如此，${target_name}的精神已经崩溃了，只是呆呆地凝视着${assi_name}………`,
          );
        } else if (
          (era.get(`talent:${target}:76`) || 0) === 1 &&
          kojo.初调教 >= 5
        ) {
          await era.printAndWait(
            `${player_name}带着${assi_name}来看${target_name}，两人从上向下俯视着对${target_name}品头论足起来。`,
          );
          await era.printAndWait(
            `「啊哈，原来你喜欢这样的孩子吗？不太理解，不过我也不太讨厌的样子呢～♪」`,
          );
          await era.printAndWait(
            `${target_name}还以为是自己来凌辱${assi_name}呢，于是${player_name}告诉她${assi_name}才是调教者。`,
          );
          await era.printAndWait(
            `「诶，今天是这家伙调教${sc()}吗？啊啊啊不要啊！」`,
          );
          await era.printAndWait(
            `${assi_name}趁机突袭一下子就把${target_name}推倒在地。`,
          );
          era.setColor('#ffccff'); // SETCOLOR 255,204,255
          await era.printAndWait(
            `『啊哈哈♪…是这样哟…主人说的，或者说姐姐想要反抗…我么？』`,
          );
          era.setColor(''); // RESETCOLOR
          await era.printAndWait(
            `房间里回响起${target_name}有些愉快意味的惨叫声………`,
          );
        } else if (
          (era.get(`talent:${target}:85`) || 0) === 1 &&
          kojo.初调教 >= 7
        ) {
          await era.printAndWait(
            `${player_name}带着${assi_name}来看${target_name}。`,
          );
          await era.printAndWait(
            `「那个…${sc()}觉得有点意外…我可是，很专一的呢，所以这样的事情…唉…」`,
          );
          await era.printAndWait(
            `${target_name}轻轻叹息着，目光在${player_name}与${assi_name}间划过。`,
          );
          await era.printAndWait(`「另外…魔王大人原来喜欢这样的孩子吗？」`);
          if (
            (era.get(`talent:${assi}:85`) || 0) === 1 ||
            (era.get(`talent:${assi}:76`) || 0) === 1
          ) {
            era.setColor('#ffccff'); // SETCOLOR 255,204,255
            await era.printAndWait(
              `『不要介意啦～我和姐姐一样都被魔王大人疼爱着呢～主人可是要我来调教姐姐大人哦～」`,
            );
            era.setColor(''); // RESETCOLOR
            await era.printAndWait(
              `${assi_name}一边说着这样的话，一边趁${target_name}不备推倒了她………`,
            );
          } else {
            era.setColor('#ffccff'); // SETCOLOR 255,204,255
            await era.printAndWait(
              `『放心啦，大家都是魔王大人调教出来的哟～魔王大人可是说，把你当做我今天的奖品呢～』`,
            );
            era.setColor(''); // RESETCOLOR
            await era.printAndWait(
              `${assi_name}说着这样的话推倒了${target_name}………`,
            );
          }
        } else {
          await era.printAndWait(
            `${player_name}带着${assi_name}来看${target_name}的时候，她把脸背了过去。`,
          );
          await era.printAndWait(
            `「把那样的家伙带过来干什么？${sc()}对那样的孩子可没有兴趣啊！」`,
          );
          await era.printAndWait(
            `${assi_name}扳过${target_name}扭向一边的脸，狠狠打了一耳光。`,
          );
          await era.printAndWait(`「痛啊…混蛋，为什么…${sc()}做错了……吗……」`);
          await era.printAndWait(
            `${assi_name}毫不留情地捏住${target_name}的脸，把自己的脸靠过去说道。`,
          );
          era.setColor('#ffccff'); // SETCOLOR 255,204,255
          await era.printAndWait(
            `『喂喂我亲爱的勇者大人～♪主人说今天我可以调教你哦～所以，你不听话的话我会很难办呢～♪』`,
          );
          era.setColor(''); // RESETCOLOR
        }
        // CFLAG:202  = 1（变量语义：CFLAG 族，202）
        kojo.简易助手_0 = 1;
        return 1;
      } else if (kojo.简易助手_0 === 1 && game.kojo.口上开关 === 2) {
        if ((era.get(`talent:${target}:9`) || 0) === 1) {
          era.setColor('#ffccff'); // SETCOLOR 255,204,255
          await era.printAndWait(`『被玩坏掉的家伙还真是无趣啊…』`);
          era.setColor(''); // RESETCOLOR
          await era.printAndWait(
            `${assi_name}一边说着一边拉着${target_name}的头发向上提起。好像是在考虑怎么取乐的样子………`,
          );
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          await era.printAndWait(
            `「又…来了…要、要干嘛…又要${sc()}…那…那样吗…？」`,
          );
          await era.printAndWait(
            `${target_name}想起${assi_name}上次对自己“温柔”的调教，脸变得通红一片。`,
          );
          era.setColor('#ffccff'); // SETCOLOR 255,204,255
          await era.printAndWait(
            `『就是那样哟～姐姐今天的反应也非常可爱呢～♪』`,
          );
          era.setColor(''); // RESETCOLOR
          await era.printAndWait(
            `${assi_name}露出与少女年龄不相称的淫靡表情，温柔地抚摸着${target_name}的头发。`,
          );
          await era.printAndWait(`「唔…${scf()}，${sc()}才没有啊…唔…啊啊……」`);
          await era.printAndWait(`${target_name}的身体害羞地颤抖着………`);
        } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
          await era.printAndWait(
            `「又…来了…要、要干嘛…又要${sc()}…那…那样吗…？」`,
          );
          await era.printAndWait(
            `${target_name}想起${assi_name}上次对自己“激烈”的调教，脸变得通红一片。`,
          );
          era.setColor('#ffccff'); // SETCOLOR 255,204,255
          await era.printAndWait(
            `『对哦～想要听到姐姐可爱的声音所以就又来了呢～♪』`,
          );
          era.setColor(''); // RESETCOLOR
          await era.printAndWait(
            `${assi_name}把手放在${target_name}肩上，舌头舔舐起对方的嘴唇。`,
          );
          era.setColor('#ffccff'); // SETCOLOR 255,204,255
          await era.printAndWait(
            `『啊哈哈哈！在主人来之前先送你一份礼物吧～♪』`,
          );
          era.setColor(''); // RESETCOLOR
          await era.printAndWait(`${target_name}就这样被推倒了。`);
          await era.printAndWait(
            `「啊啊…完全没法抵抗这样的孩子啊…${scf()}、${sc()}………${heart(1)}」`,
          );
          await era.printAndWait(
            `就在${player_name}的面前，${target_name}和${assi_name}开始了水乳交融般的纠缠………`,
          );
        } else {
          await era.printAndWait(`「该死…又、又来了啊…这…小混蛋……！」`);
          await era.printAndWait(
            `${target_name}一边回忆着与${assi_name}的交合一边骂着。`,
          );
          era.setColor('#ffccff'); // SETCOLOR 255,204,255
          await era.printAndWait(
            `『啊哈哈！可爱的姐姐！今天我也来满足你了哦～要把姐姐给灌得满满的呢～♪』`,
          );
          era.setColor(''); // RESETCOLOR
          await era.printAndWait(
            `${target_name}还没反应过来就被${assi_name}给推倒了………`,
          );
        }
        return 1;
      }
    }
  } else {
    await k6_kojo2(rand_n); // CALL K6_KOJO2
  }
}

// k6_kojo2

async function k6_kojo2(rand) {
  const {
    rand_n,
    target,
    assi,
    target_name,
    player_name,
    assi_name,
    master_name,
    sc,
    scf,
    view,
    kojo,
  } = bind_ctx(rand);

  if ((era.get(`talent:${target}:9`) || 0) === 1 && game.kojo.口上开关 === 2) {
    era.drawLine();
    await era.printAndWait(`「呜呜呜…啊呜…呜呜………」`);
    await era.printAndWait(
      `没办法期待已经精神崩溃的${target_name}做出什么反应啊………`,
    );
    return 1;
  } else if (
    (era.get(`mark:${target}:3`) || 0) === 3 &&
    game.kojo.口上开关 === 2
  ) {
    if (
      (era.get(`mark:${target}:2`) || 0) === 3 &&
      (era.get(`mark:${target}:3`) || 0) === 3 &&
      (era.get(`talent:${target}:85`) || 0) === 0 &&
      (era.get(`talent:${target}:76`) || 0) === 0
    ) {
      era.drawLine();
      await era.printAndWait(`「哼…想要抱我的话…那就来吧！」`);
      await era.printAndWait(`${target_name}四仰八叉地躺倒在床上叫嚣着………`);
    } else {
      era.drawLine();
      await era.printAndWait(`「…给我去死吧」`);
      await era.printAndWait(
        `${target_name}用锐利得仿佛可以杀死${player_name}般的眼神瞪视着………`,
      );
    }
    return 1;
  } else if (
    (era.get(`mark:${target}:2`) || 0) === 0 &&
    game.kojo.口上开关 === 2
  ) {
    era.drawLine();
    await era.printAndWait(`「别开玩笑了，你这废物」`);
    await era.printAndWait(`${target_name}砸着嘴瞪视${player_name}。`);
    return 1;
  } else if (
    (era.get(`mark:${target}:2`) || 0) === 1 &&
    game.kojo.口上开关 === 2
  ) {
    era.drawLine();
    await era.printAndWait(`「嘁，不明白么…才不会听你的啊！」`);
    await era.printAndWait(`${target_name}脸上似乎出现了一点胆怯的表情………`);
    return 1;
  } else if (
    (era.get(`mark:${target}:2`) || 0) === 2 &&
    game.kojo.口上开关 === 2
  ) {
    era.drawLine();
    await era.printAndWait(`「到这种程度为止吧…再做更过分的事我可不答应啊…」`);
    await era.printAndWait(`${target_name}抱住双肩有点厌恶似的摇着头………`);
    return 1;
  } else if (
    (era.get(`mark:${target}:2`) || 0) === 3 &&
    (era.get(`talent:${target}:85`) || 0) === 0 &&
    (era.get(`talent:${target}:76`) || 0) === 0 &&
    game.kojo.口上开关 === 2
  ) {
    era.drawLine();
    await era.printAndWait(`「…要开始了吗。好吧。」`);
    await era.printAndWait(
      `${target_name}老老实实地抱住${player_name}准备开始了…`,
    );
    return 1;
  } else if (
    (era.get(`talent:${target}:76`) || 0) === 1 &&
    game.kojo.口上开关 === 2
  ) {
    era.drawLine();

    if (rand_n(3) === 0) {
      await era.printAndWait(`${target_name}四肢趴在地上向你抬起屁股`);
      await era.printAndWait(`「啊啊啊啊啊…快来吧…已经忍不住了…」`);
      await era.printAndWait(`你踢踢她的屁股，开始了调教………`);
    } else if (rand_n(2) === 0) {
      await era.printAndWait(`${target_name}一看到你就跪下说道`);
      await era.printAndWait(`「如您所愿……${sc()}……想要更多的处罚……」`);
      await era.printAndWait(`仰望着你的眼睛里露出充满欲望的光芒………`);
    } else {
      await era.printAndWait(`${target_name}分开双臀展示出自己的小穴`);
      await era.printAndWait(
        `「${sc()}很蠢吧…在你的身下就更没办法思考了呢…所以要对我负责哦♪」`,
      );
      await era.printAndWait(`那淫荡的表情完全没有了一开始的恶毒………`);
    }
    return 1;
  } else if (
    (era.get(`talent:${target}:85`) || 0) === 1 &&
    game.kojo.口上开关 === 2
  ) {
    era.drawLine();

    if (rand_n(3) === 0) {
      await era.printAndWait(`「今天也来惩罚${sc()}吧…♪」`);
      await era.printAndWait(`${target_name}有些迫不及待地开始做调教准备了……`);
      await era.printAndWait(
        `「${sc()}的身体上已经充满了魔王大人的印记了呢…${heart(1)}」`,
      );
    } else if (rand_n(2) === 0) {
      await era.printAndWait(
        `「有点…迟到了啊………不、不过无论什么时候，都在等待着为魔王大人服务呢」`,
      );
      await era.printAndWait(`${target_name}轻轻嘟着嘴唇，眼中充满期待。`);
      await era.printAndWait(
        `「您…快开始吧…${sc()}的子宫已经在不安分地跳动了呢…${heart(1)}」`,
      );
    } else {
      await era.printAndWait(`「啊，您好～♪」`);
      await era.printAndWait(`${target_name}微笑着撩起发梢寒暄起来。`);
      await era.printAndWait(
        `「一想到要被魔王大人疼爱…${sc()}就变得高兴起来了呢………」`,
      );
    }
    return 1;
  }
  return 0;
}

// eventend_k6：EVENTEND NORMAL 档

async function eventend_k6(rand) {
  const {
    rand_n,
    target,
    assi,
    target_name,
    player_name,
    assi_name,
    master_name,
    sc,
    scf,
    view,
    kojo,
  } = bind_ctx(rand);
  if (game.kojo.口上开关 <= 0) {
    return 0;
  }
  if ((era.get(`talent:${target}:166`) || 0) !== 1) {
    return 0;
  }

  if ((era.get(`base:${target}:0`) || 0) <= 0) {
    return 0;
  }

  if ((era.get(`talent:${target}:9`) || 0) === 1) {
    era.drawLine();
    await era.printAndWait(`「哈…唔啊…啊啊啊啊啊………」`);
    await era.printAndWait(
      `${target_name}美丽的身体已经被玩坏了，还是少让她做些事情吧………`,
    );
    return 1;
  } else if (
    (era.get(`mark:${target}:3`) || 0) === 3 &&
    (era.get(`mark:${target}:2`) || 0) === 0 &&
    (era.get(`talent:${target}:85`) || 0) === 0 &&
    (era.get(`talent:${target}:76`) || 0) === 0
  ) {
    era.drawLine();
    await era.printAndWait(`「去死吧！」`);
    if ((era.get(`base:${target}:0`) || 0) <= 500) {
      await era.printAndWait(
        `虽然疲惫不堪，${target_name}的眼光中还是充满了抵触。`,
      );
    }
    await era.printAndWait(
      `${player_name}在${target_name}的痛骂中不由得耸了耸肩………`,
    );
    return 1;
  } else if (
    (era.get(`mark:${target}:2`) || 0) <= 1 &&
    (era.get(`talent:${target}:85`) || 0) === 0 &&
    (era.get(`talent:${target}:76`) || 0) === 0
  ) {
    era.drawLine();
    await era.printAndWait(`「下贱的渣滓！」`);
    await era.printAndWait(`居然还有痛骂的精神，看来调教得还不够啊……`);
    return 1;
  } else if (
    (era.get(`mark:${target}:2`) || 0) === 2 &&
    (era.get(`talent:${target}:85`) || 0) === 0 &&
    (era.get(`talent:${target}:76`) || 0) === 0
  ) {
    era.drawLine();
    await era.printAndWait(`「你、你这臭虫！」`);
    await era.printAndWait(`还有精神说这样的话，需要更多的调教呢……`);
    return 1;
  } else if (
    (era.get(`mark:${target}:2`) || 0) === 3 &&
    (era.get(`talent:${target}:85`) || 0) === 0 &&
    (era.get(`talent:${target}:76`) || 0) === 0
  ) {
    era.drawLine();
    await era.printAndWait(`「哈啊…终于……结束了吗………」`);
    if ((era.get(`base:${target}:0`) || 0) <= 500) {
      await era.printAndWait(`${target_name}气喘吁吁，已经脱力了。`);
    }
    await era.printAndWait(`调教的成果显现出来，这匹野马也被驯服了呢……`);
    return 1;
  } else if (
    (era.get(`mark:${target}:2`) || 0) === 3 &&
    (era.get(`mark:${target}:3`) || 0) === 3 &&
    (era.get(`talent:${target}:85`) || 0) === 0 &&
    (era.get(`talent:${target}:76`) || 0) === 0
  ) {
    era.drawLine();
    await era.printAndWait(`「你有什么事情吗…唔…不要啊！」`);
    if ((era.get(`base:${target}:0`) || 0) <= 500) {
      await era.printAndWait(
        `虽然疲惫不堪，${target_name}的眼光中还是充满了抵触。`,
      );
    }
    await era.printAndWait(
      `${player_name}看着${target_name}现在的样子笑了起来，${target_name}流下了懊悔的眼泪………`,
    );
    return 1;
  } else if (
    (era.get(`talent:${target}:76`) || 0) === 1 &&
    (era.get(`base:${target}:0`) || 0) >= 500
  ) {
    era.drawLine();
    await era.printAndWait(`「再激烈一点嘛～♪」`);
    await era.printAndWait(`${target_name}欲求不满地在床上写下这样的字句………`);
    return 1;
  } else if (
    (era.get(`talent:${target}:76`) || 0) === 1 &&
    (era.get(`base:${target}:0`) || 0) <= 500
  ) {
    era.drawLine();
    await era.printAndWait(`「唔啊，被喂得饱饱的呢～♪」`);
    await era.printAndWait(`${target_name}非常满足地呈大字躺在地上………`);
    return 1;
  } else if (
    (era.get(`talent:${target}:85`) || 0) === 1 &&
    (era.get(`base:${target}:0`) || 0) >= 500
  ) {
    era.drawLine();
    await era.printAndWait(`「下次惩罚不要手下留情哦……♪」`);
    await era.printAndWait(
      `${target_name}趴在${player_name}的肩头撒娇似的说着下次调教的事情………`,
    );
    return 1;
  } else if (
    (era.get(`talent:${target}:85`) || 0) === 1 &&
    (era.get(`base:${target}:0`) || 0) <= 500
  ) {
    era.drawLine();
    await era.printAndWait(`「啊啊…这、这么多………${heart(1)}」`);
    await era.printAndWait(`${target_name}满足地叹息着大字躺在地上………`);
    return 1;
  }
  return 0;
}

// kojo_message_com_6

async function kojo_message_com_6(rand) {
  const {
    rand_n,
    target,
    assi,
    target_name,
    player_name,
    assi_name,
    master_name,
    sc,
    scf,
    view,
    kojo,
  } = bind_ctx(rand);
  const { piercing_state } = require('#/system/train/com-hardcore');
  let P = piercing_state.p;

  if (era_flag.assi > 0 && era_flag.assiplay) {
    return 0;
  }

  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 45) {
    return 0;
  }

  if (game.train.失神) {
    return 0;
  }

  if ((era.get(`talent:${target}:9`) || 0) === 1) {
    return 0;
  }

  if (era.get(`tequip:${target}:89`)) {
    await dog_kojo_6(rand_n); // CALL DOG_KOJO_6
    return 0;
  }

  if (era.get(`tequip:${target}:55`)) {
    await colosseum_kojo_6(rand_n); // CALL COLOSSEUM_KOJO_6
    return 0;
  }

  if (era_flag.selectcom === 0) {
    if (kojo.爱抚 === 0) {
      if ((era.get(`mark:${target}:2`) || 0) >= 2) {
        await era.printAndWait(`「哈啊…该死……别这样摸我啊…呜！…啊嗯！」`);
        await era.printAndWait(`${target_name}的身体被爱抚着………`);
      } else {
        await era.printAndWait(`「嘁、摸吧！你这渣滓！」`);
        await era.printAndWait(`${target_name}厌恶地扭动着身体………`);
      }
      // CFLAG:301  = 1（变量语义：CFLAG 族，301）
      kojo.爱抚 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「只是触摸可不够哦～♪」`);
        await era.printAndWait(
          `${target_name}抓住${player_name}的手引导着伸向敏感带………`,
        );
        // CFLAG:301  = 6（变量语义：CFLAG 族，301）
        kojo.爱抚 = 6;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「主人的手的触感…好温暖…」`);
        await era.printAndWait(
          `${target_name}丝毫不抵抗地享受着爱抚，发出舒服的呻吟………`,
        );
        // CFLAG:301  = 5（变量语义：CFLAG 族，301）
        kojo.爱抚 = 5;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「…不要！呼呼、哈啊…」`);
        await era.printAndWait(`${target_name}的身体被爱抚着………`);
        // CFLAG:301  = 4（变量语义：CFLAG 族，301）
        kojo.爱抚 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 2 &&
        (kojo.爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「真是…没办法啊…」`);
        await era.printAndWait(`${target_name}的身体被爱抚着………`);
        // CFLAG:301  = 3（变量语义：CFLAG 族，301）
        kojo.爱抚 = 3;
      } else if (
        (era.get(`mark:${target}:2`) || 0) <= 1 &&
        (kojo.爱抚 <= 1 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「别碰我！你这垃圾！」`);
        await era.printAndWait(`${target_name}在爱抚过程中厌恶地扭动着身体………`);
        // CFLAG:301  = 2（变量语义：CFLAG 族，301）
        kojo.爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 1) {
    if (kojo.舔阴 === 0) {
      if ((era.get(`talent:${target}:0`) || 0) === 1) {
        await era.printAndWait(`「别…别舔那里！说了很脏啊！」`);
        await era.printAndWait(
          `${player_name}舔舐着${target_name}未经人事的阴唇………`,
        );
      } else {
        await era.printAndWait(`「你是认真的吗！别开玩笑了！」`);
        await era.printAndWait(
          `${player_name}抱住${target_name}的两条大腿，把阴唇含在了嘴里………`,
        );
      }
      // CFLAG:302  = 1（变量语义：CFLAG 族，302）
      kojo.舔阴 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.舔阴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊哈啊…再用力一点啊…呼♪噗～」`);
        await era.printAndWait(
          `${target_name}双腿夹住${player_name}的头，发出挑衅般充满快感的呻吟声………`,
        );
        // CFLAG:302  = 5（变量语义：CFLAG 族，302）
        kojo.舔阴 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.舔阴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「真开心啊…哟…哈啊${heart(1)}」`);
        await era.printAndWait(
          `${target_name}分开自己的双腿带着陶醉的神色享受着${player_name}的爱抚………`,
        );
        // CFLAG:302  = 4（变量语义：CFLAG 族，302）
        kojo.舔阴 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.舔阴 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「嘛…很好…啊唔…啊…哈…哈…」`);
        await era.printAndWait(
          `${target_name}分开自己的双腿接受着${player_name}的爱抚………`,
        );
        // CFLAG:302  = 3（变量语义：CFLAG 族，302）
        kojo.舔阴 = 3;
      } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「你这变态！快给我去死啊！滚、滚开！」`);
        await era.printAndWait(
          `${player_name}抱住还在痛骂着的${target_name}的大腿，把阴唇含在了嘴里………`,
        );
        // CFLAG:302  = 2（变量语义：CFLAG 族，302）
        kojo.舔阴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 2) {
    if (kojo.肛门爱抚 === 0) {
      if ((era.get(`abl:${target}:3`) || 0) >= 3) {
        await era.printAndWait(`「啊…呀啊…啊！还不够啊…唔…啊啊！」`);
        await era.printAndWait(
          `${target_name}的肛门在${player_name}手指的挑动下几近痉挛，欲望高涨………`,
        );
      } else {
        await era.printAndWait(`「啊，不要这样！」`);
        await era.printAndWait(
          `${target_name}摆动着腰肢想从${player_name}的手指中逃离………`,
        );
      }
      // CFLAG:TARGET:303  = 1（变量语义：CFLAG 族，TARGET:303）
      kojo.肛门爱抚 = 1;
      return 0;
    } else {
      P =
        (era.get(`palam:${target}:3`) || 0) +
        (era.get(`delta:${target}:3`) || 0); // PALAM:3 + UP:3

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`talent:${target}:77`) || 0) === 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊呜…肛门…变得黏糊糊的啦…${heart(1)}」`);
        await era.printAndWait(
          `${target_name}的肛门在${player_name}手指的挑动下几近痉挛，欲望高涨………`,
        );
        // CFLAG:303  = 9（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 9;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊哈哈♪　想要更多！♪」`);
        await era.printAndWait(
          `${target_name}的肛门夹紧了${player_name}的手指欢快地蠕动着………`,
        );
        // CFLAG:303  = 8（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 8;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        P < PALAMLV[2] &&
        (kojo.肛门爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「还要更湿一点呢……」`);
        await era.printAndWait(
          `${target_name}的肛门似乎还没有充分润滑，对于爱抚显得有些痛苦………`,
        );
        // CFLAG:303  = 7（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 7;
      } else if (
        (era.get(`talent:${target}:77`) || 0) === 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊咿…呜…啊啊啊啊…屁股…啊…要、要上天了啦！${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的肛门紧紧的夹住${player_name}的手指，完全无法抽出来………`,
        );
        // CFLAG:303  = 6（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 6;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「屁股小穴…好、好舒服…♪ 想…想要更多………♪」`);
        await era.printAndWait(
          `${target_name}的肛门夹紧了${player_name}的手指欢快地蠕动着………`,
        );
        // CFLAG:303  = 5（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        P < PALAMLV[2] &&
        (kojo.肛门爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「…呀！　还要更湿一点才能进去呢………」`);
        await era.printAndWait(
          `${target_name}的肛门似乎还没有充分润滑，对于爱抚显得有些痛苦………`,
        );
        // CFLAG:303  = 4（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 4;
      } else if (
        P >= PALAMLV[2] &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.肛门爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「难以置信…屁股的…快感…」`);
        await era.printAndWait(
          `${target_name}的肛门紧紧的夹住了${player_name}的手指………`,
        );
        // CFLAG:303  = 3（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 3;
      } else if (kojo.首次耻情Lv2 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「住手，你这卑贱的淫虫！」`);
        await era.printAndWait(
          `${target_name}拼命地摆动着腰肢想从${player_name}的手指中逃离………`,
        );
        // CFLAG:303  = 2（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 3) {
    if (kojo.自慰 === 0) {
      await era.printAndWait(`「嘁，自慰么…？」`);
      // CFLAG:TARGET:304  = 1（变量语义：CFLAG 族，TARGET:304）
      kojo.自慰 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`talent:${target}:0`) || 0) === 1 &&
        (kojo.自慰 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「${sc()}的这里完全没被开发过哟……♪」`);
        await era.printAndWait(`${target_name}边自慰着边露出充满快感的笑容。`);
        await era.printAndWait(
          `「啊啊啊…呐诶…${sc()}就这样破掉自己的处女吧…魔王大人会发怒也没办法了啊啊！噗噜 ${heart(1)}」`,
        );
        await era.printAndWait(
          `开始兴奋起来的${target_name}自慰得更加激烈了……`,
        );
        // CFLAG:304  = 9（变量语义：CFLAG 族，304）
        kojo.自慰 = 9;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:31`) || 0) >= 3 &&
        (kojo.自慰 <= 7 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「哈啊…哈啊…迫不及待了呢…光是手指已经不够了啊 ${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一边流着口水一边激烈地自慰着。`,
          );
          await era.printAndWait(
            `「啊啊啊…唔啊…已经…啊啊啊…完全停不下来了…停、停不下来了啊啊啊…呜…啊啊 ${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「呵啊…虽然很舒服但是有点累呢…明明对方就在我面前站着，却…诶嘿嘿 ${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}边自慰边把目光投向${player_name}，眼中那充满欲望的湿润越发明显。`,
          );
          await era.printAndWait(
            `「啊啊…哈…哈啊${heart(1)}…啊啊啊…想要…哈啊啊${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊啊…呜…哈啊啊啊！像那样…手指都累了呢…呜…啊啊啊…啊啊呜啊！${heart(1)}」`,
          );
          await era.printAndWait(
            `虽然这样说着${target_name}却完全没有停下来的意思，反而自慰得更加狂野了。`,
          );
          await era.printAndWait(
            `「已经，已经…像这样…全部都变得湿漉漉了…${heart(1)}」`,
          );
        }
        // CFLAG:304  = 8（变量语义：CFLAG 族，304）
        kojo.自慰 = 8;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:31`) || 0) < 3 &&
        (kojo.自慰 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「呵啊…虽然很舒服但是有点累呢…明明对方就在我面前站着，却… ${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一边抱怨着一边继续自慰，修长的手指从私处带出爱液。`,
          );
          await era.printAndWait(`「唔…啊…啊啊…哈呜…呜${heart(1)}」`);
        } else {
          await era.printAndWait(
            `「啊啊啊…呜…哈啊啊啊！像那样…手指都累了呢…呜…啊啊啊…啊啊呜啊！」`,
          );
          await era.printAndWait(`${target_name}的动作越来越激烈。`);
          await era.printAndWait(
            `「啊啊…像这样…已经等不及了呢…唔…呜啊…啊啊啊嗯${heart(1)}」`,
          );
        }
        // CFLAG:304  = 7（变量语义：CFLAG 族，304）
        kojo.自慰 = 7;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`talent:${target}:0`) || 0) === 1 &&
        (kojo.自慰 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊…${sc()}照做就是了…只能到这个地步，不能再欺负我了…！」`,
        );
        await era.printAndWait(`${target_name}带着淫荡的表情继续自慰。`);
        await era.printAndWait(
          `「呜呜像${heart(1)} 这、这样已经是极限了…请让我自己来弄破处女膜吧…」`,
        );
        // CFLAG:304  = 6（变量语义：CFLAG 族，304）
        kojo.自慰 = 6;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:31`) || 0) >= 3 &&
        (kojo.自慰 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「居然想看${sc()}自慰的样子…魔王大人真是的…啊啊啊${heart(1)} ${sc()}的样子…再多看一点吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}已经把${player_name}的注视抛在脑后继续自慰着。`,
          );
          await era.printAndWait(`「啊…呜呜…已经停不下来了！」`);
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊啊…比起自慰什么的反而…更想要魔王大人的手指啊！想要魔王大人的大肉棒啊！」`,
          );
          await era.printAndWait(
            `${target_name}一边说着一边沉浸在玩弄自己私处的快感中。`,
          );
          await era.printAndWait(
            `「啊啊…不行…不行…完全停不下来了…${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「听人说手淫不好呢…手淫的孩子什么的…${sc()}才不会感谢你啊！」`,
          );
          await era.printAndWait(
            `虽然这么说着但${target_name}脸上带着淫靡的红晕，玩弄私处的手指完全没有停下来的迹象。`,
          );
          await era.printAndWait(
            `「咿…啊啊啊啊啊啊啊啊…呜…呼…啊啊啊啊…${heart(1)}」`,
          );
        }
        // CFLAG:304  = 5（变量语义：CFLAG 族，304）
        kojo.自慰 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:31`) || 0) < 3 &&
        (kojo.自慰 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「居然想看${sc()}自慰的样子…魔王大人真是的…啊啊啊${heart(1)} ${sc()}的样子…再多看一点吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}用期待的眼神看着这边自慰起来………`,
          );
        } else {
          await era.printAndWait(
            `「啊啊啊…比起自慰什么的反而…更想要魔王大人的手指啊！想要魔王大人的大肉棒啊！」`,
          );
          await era.printAndWait(
            `${target_name}一边说着一边沉浸在来回玩弄自己私处的快感中。`,
          );
        }
        // CFLAG:304  = 4（变量语义：CFLAG 族，304）
        kojo.自慰 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`abl:${target}:31`) || 0) >= 1 &&
        (kojo.自慰 <= 2 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「哈啊…哈啊…呜…呼…啊呜…啊啊…咕噜！」`);
          await era.printAndWait(
            `${target_name}咬着嘴唇继续自慰，偶尔从唇中发出淫靡的闷哼………`,
          );
        } else {
          await era.printAndWait(
            `「啊…呜呜…看、看什么啊…变态！变态混蛋！…呜…啊啊啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}一边痛骂看得津津有味的${player_name}一边继续自慰着………`,
          );
        }
        // CFLAG:304  = 3（变量语义：CFLAG 族，304）
        kojo.自慰 = 3;
      } else if (kojo.自慰 <= 1 || game.kojo.口上开关 === 2) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊…我…呜呜…让${sc()}做这样的事情…不、不许看啊！………」`,
          );
          await era.printAndWait(`${target_name}抽动着自己的手指………`);
        } else {
          await era.printAndWait(
            `「啊啊…这样的事也…要${sc()}…呜…好的…唔啊！」`,
          );
          await era.printAndWait(
            `${target_name}像是被强行命令了一般拼命地抽动着手指………`,
          );
        }
        // CFLAG:304  = 2（变量语义：CFLAG 族，304）
        kojo.自慰 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 5) {
    if (kojo.胸爱抚 === 0) {
      if (
        (era.get(`talent:${target}:130`) || 0) === 1 &&
        era.get(`palam:${target}:5`) > PALAMLV[3] &&
        era.get(`tequip:${target}:16`) === 0 &&
        era.get(`tequip:${target}:15`) === 0
      ) {
        if (
          (era.get(`talent:${target}:85`) || 0) === 1 ||
          (era.get(`talent:${target}:76`) || 0) === 1
        ) {
          if (
            (era.get(`talent:${target}:110`) || 0) === 1 ||
            (era.get(`talent:${target}:114`) || 0) === 1 ||
            (era.get(`talent:${target}:119`) || 0) === 1
          ) {
            await era.printAndWait(
              `「啊啊…要${sc()}…这样做…会有奶汁什么的喷出来吧…」`,
            );
            await era.printAndWait(
              `${target_name}丰满的乳房挤出了乳汁，滋润着${player_name}的喉咙………`,
            );
          } else {
            await era.printAndWait(
              `「啊啊…要${sc()}…这样做…会有奶汁什么的喷出来吧…」`,
            );
            await era.printAndWait(
              `${target_name}把还在吮吸着自己胸部的${player_name}的头轻轻抱住，温柔地叹息着………`,
            );
          }
        } else {
          if (
            (era.get(`talent:${target}:110`) || 0) === 1 ||
            (era.get(`talent:${target}:114`) || 0) === 1 ||
            (era.get(`talent:${target}:119`) || 0) === 1
          ) {
            await era.printAndWait(`「快、快停下来…奶…不要啊…别吸啊，喂！」`);
            await era.printAndWait(
              `母乳从${target_name}硕大的乳房滴出滋润着${player_name}的喉咙………………`,
            );
          } else {
            await era.printAndWait(`「啊啊啊…那样的…像婴儿一样的…吸奶…呜！」`);
            await era.printAndWait(
              `${target_name}的乳房被吸吮着感到有些痛苦………`,
            );
          }
        }
      } else {
        if (
          (era.get(`talent:${target}:85`) || 0) === 1 ||
          (era.get(`talent:${target}:76`) || 0) === 1
        ) {
          if (
            (era.get(`talent:${target}:110`) || 0) === 1 ||
            (era.get(`talent:${target}:114`) || 0) === 1 ||
            (era.get(`talent:${target}:119`) || 0) === 1
          ) {
            await era.printAndWait(
              `「啊啊…哈啊啊…请随意玩弄${sc()}的胸部吧…只有主人可以哟～${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}丰满的乳房被揉搓着发出了这样的叹息………`,
            );
          } else {
            await era.printAndWait(`「啊…啊～…真是温柔的开始呢………」`);
            await era.printAndWait(
              `${target_name}的胸部被揉搓着发出甜蜜的喘息声………`,
            );
          }
        } else {
          if (
            (era.get(`talent:${target}:110`) || 0) === 1 ||
            (era.get(`talent:${target}:114`) || 0) === 1 ||
            (era.get(`talent:${target}:119`) || 0) === 1
          ) {
            await era.printAndWait(
              `「嘁…被你这样的家伙…${sc()}引以为傲的胸部………放…放开啊！」`,
            );
            await era.printAndWait(
              `${target_name}的丰乳被揉搓着，厌恶地扭动着身体………`,
            );
          } else {
            await era.printAndWait(
              `「哈啊…对胸部这么着迷，你这家伙有恋母情结么………呜！松开！别用牙咬啊！」`,
            );
            await era.printAndWait(
              `${target_name}的胸被毫不留情地肆意玩弄着………`,
            );
          }
        }
      }
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306）
      kojo.胸爱抚 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:130`) || 0) === 1 &&
        era.get(`palam:${target}:5`) > PALAMLV[3] &&
        era.get(`tequip:${target}:16`) === 0 &&
        era.get(`tequip:${target}:15`) === 0
      ) {
        if (
          (era.get(`talent:${target}:76`) || 0) === 1 &&
          (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
        ) {
          if (
            (era.get(`talent:${target}:110`) || 0) === 1 ||
            (era.get(`talent:${target}:114`) || 0) === 1 ||
            (era.get(`talent:${target}:119`) || 0) === 1
          ) {
            await era.printAndWait(
              `「吸～来吸～吧！来喝${sc()}…的奶水！啊啊啊！去了～要去了！～${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}带着淫荡的表情挤压着自己丰满的乳房，挤出母乳滋润着${player_name}的喉咙………`,
            );
          } else {
            await era.printAndWait(
              `「呜，真是的……异常的舒服呢…被人吸的感觉是这样啊${heart(1)}…啊啊${sc()}要疯掉了～${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}的乳头被不断吸吮着，快感让她全身痉挛，心旷神怡………`,
            );
          }
          // CFLAG:306  = 5（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 5;
        } else if (
          (era.get(`talent:${target}:85`) || 0) === 1 &&
          (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
        ) {
          if (
            (era.get(`talent:${target}:110`) || 0) === 1 ||
            (era.get(`talent:${target}:114`) || 0) === 1 ||
            (era.get(`talent:${target}:119`) || 0) === 1
          ) {
            await era.printAndWait(
              `「啊啊…${sc()}的…胸部…会分泌出牛奶一样的乳汁呢…魔王大人…请喝我的母乳吧…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}轻抚着正在吸吮自己胸部的${player_name}的头。`,
            );
            await era.printAndWait(
              `带着淫荡表情的${target_name}那丰满的乳房挤出了乳汁，滋润着${player_name}的喉咙………`,
            );
          } else {
            await era.printAndWait(
              `「那个…那个…魔王要是想喝奶的话…${sc()}的奶水也很美味的说…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}把还在吮吸着自己胸部的${player_name}的头轻轻抱住，温柔地叹息着………`,
            );
          }
          // CFLAG:306  = 4（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 4;
        } else if (
          (era.get(`abl:${target}:1`) || 0) >= 3 &&
          (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
        ) {
          if (
            (era.get(`talent:${target}:110`) || 0) === 1 ||
            (era.get(`talent:${target}:114`) || 0) === 1 ||
            (era.get(`talent:${target}:119`) || 0) === 1
          ) {
            await era.printAndWait(
              `「啊啊啊…这样…不过是吸奶而已…身体，不受控制了…来、来吧…♪」`,
            );
            await era.printAndWait(
              `${target_name}硕大的乳房因为快感的缘故颤动着………`,
            );
          } else {
            await era.printAndWait(
              `「你怎么…像个婴儿一样啊…啊啊…咿啊…呜呜呜！」`,
            );
            await era.printAndWait(
              `${target_name}因为快感而全身痉挛，母乳喷了出来………`,
            );
          }
          // CFLAG:306  = 3（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 3;
        } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
          if (
            (era.get(`talent:${target}:110`) || 0) === 1 ||
            (era.get(`talent:${target}:114`) || 0) === 1 ||
            (era.get(`talent:${target}:119`) || 0) === 1
          ) {
            await era.printAndWait(`「快、快停下来…胸部…不要啊…别吸啊，喂！」`);
            await era.printAndWait(
              `母乳从${target_name}硕大的乳房流出滋润着${player_name}的喉咙………………`,
            );
          } else {
            await era.printAndWait(`「啊啊啊…那样的…像婴儿一样的…吸奶…呜！」`);
            await era.printAndWait(
              `${target_name}的母乳被吸吮着感到有些痛苦………`,
            );
          }
          // CFLAG:306  = 2（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 2;
        }
      } else {
        if (
          (era.get(`talent:${target}:76`) || 0) === 1 &&
          (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
        ) {
          if (
            (era.get(`talent:${target}:110`) || 0) === 1 ||
            (era.get(`talent:${target}:114`) || 0) === 1 ||
            (era.get(`talent:${target}:119`) || 0) === 1
          ) {
            await era.printAndWait(
              `「等不及了…快来玩弄${sc()}淫荡下贱的奶子吧！唔啊！就、就是这样${heart(1)}」`,
            );
            await era.printAndWait(
              `${player_name}将${target_name}丰满的乳房来回扭动着，${target_name}饶有兴致地把身子后仰享受这苦闷的快感………`,
            );
          } else {
            await era.printAndWait(
              `「啊啊…现在的…${sc()}的乳房…已经变得乱七八糟了啊${heart(1)} 啊呜啊啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}完全沉浸在对乳房的爱抚中，只顾着寻求更多的刺激………`,
            );
          }
          // CFLAG:306  = 5（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 5;
        } else if (
          (era.get(`talent:${target}:85`) || 0) === 1 &&
          (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
        ) {
          if (
            (era.get(`talent:${target}:110`) || 0) === 1 ||
            (era.get(`talent:${target}:114`) || 0) === 1 ||
            (era.get(`talent:${target}:119`) || 0) === 1
          ) {
            await era.printAndWait(
              `「哈啊…想要更多…${sc()}的胸需要魔王大人的爱心按摩啊啊${heart(1)} 这乳房已经完完全全被魔王大人征服了！」`,
            );
            await era.printAndWait(
              `${target_name}丰满的乳房被揉搓着发出了满足的叹息………`,
            );
          } else {
            await era.printAndWait(
              `「啊…呜…啊嗯…哈啊…揉吧…${sc()}的胸部…请用力地摆布啊…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}眼中泛着春光，接受着${player_name}的爱抚………`,
            );
          }
          // CFLAG:306  = 4（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 4;
        } else if (
          (era.get(`abl:${target}:1`) || 0) >= 3 &&
          (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
        ) {
          if (
            (era.get(`talent:${target}:110`) || 0) === 1 ||
            (era.get(`talent:${target}:114`) || 0) === 1 ||
            (era.get(`talent:${target}:119`) || 0) === 1
          ) {
            await era.printAndWait(
              `「哈啊…啊啊…怎么…${sc()}的胸部会有这样的感觉啊…啊啊…呜呜！」`,
            );
            await era.printAndWait(
              `${target_name}丰满的乳房享受着爱抚变成了桃红色，嘴中泄露出娇艳的喘息声………`,
            );
          } else {
            await era.printAndWait(
              `「哈、哈啊…有恋母情结的人都喜欢这么做吗…呜…呜…哈啊！」`,
            );
            await era.printAndWait(
              `${target_name}被${player_name}的爱抚弄得满脸红晕……`,
            );
          }
          // CFLAG:306  = 3（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 3;
        } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
          if (
            (era.get(`talent:${target}:110`) || 0) === 1 ||
            (era.get(`talent:${target}:114`) || 0) === 1 ||
            (era.get(`talent:${target}:119`) || 0) === 1
          ) {
            await era.printAndWait(`「该死……呜哇…！别碰我…迷恋胸部的变态…！」`);
            await era.printAndWait(
              `${target_name}因为硕乳被揉捏不高兴地摇了摇头………`,
            );
          } else {
            await era.printAndWait(
              `「你这恋母情结的变态！别、别揉我的胸了啊！…呜呜…住手！」`,
            );
            await era.printAndWait(
              `${target_name}咬紧牙关忍受着对自己胸部的特殊关照………`,
            );
          }
          // CFLAG:306  = 2（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 2;
        }
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 6) {
    if (kojo.接吻 === 0 && game.train.初吻与自我口上) {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        era_flag.assiplay === 0 &&
        era.get(`tequip:${target}:89`) === 0 &&
        era.get(`tequip:${target}:90`) === 0
      ) {
        await era.printAndWait(`「唔嗯…呜…啊啊………嗯哼…呜呜呜！」`);
        await era.printAndWait(`${target_name}的舌头纠缠了很久才舍得放开。`);
        await era.printAndWait(
          `「啊啊${heart(1)}……${sc()}的初吻的味道怎么样～…魔王大人${heart(1)}」`,
        );
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        era_flag.assiplay === 0 &&
        era.get(`tequip:${target}:89`) === 0 &&
        era.get(`tequip:${target}:90`) === 0
      ) {
        await era.printAndWait(`「呜…啊啊…啊…呜呜…噗噜………」`);
        await era.printAndWait(
          `唇分开之后${target_name}凝视着${player_name}的脸庞。`,
        );
        await era.printAndWait(
          `「呐，${sc()}的初吻已经…在这之前绝对没有和别人接吻过哦………${heart(1)}」`,
        );
      } else {
        await era.printAndWait(`「唔嗯！…呜啊…呜………这、这个……」`);
        await era.printAndWait(
          `${target_name}的嘴唇被肆意蹂躏着、懊悔地擦拭了好多次。`,
        );
        await era.printAndWait(`「…${scf()}、${sc()}的初吻竟然………」`);
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      kojo.接吻 = 1;
      return 0;
    } else if (kojo.接吻 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(`「呜…唔啊…呜…还不够…呜…唔嗯…啊啊${heart(1)}」`);
        await era.printAndWait(
          `${target_name}与${player_name}的舌头纠缠在一起不愿分开。`,
        );
        await era.printAndWait(`「呜…唔啊…啊啊啊…口水真美味啊…${heart(1)}」`);
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(
          `「唔啊…吻我…呜…呜呜…跟魔王大人接吻…好开心${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}努力将温热的舌尖挤进${player_name}嘴中仔细品味着。`,
        );
        await era.printAndWait(`「呼呼…呜…呜呜啊…唔嗯…唔…继续…${heart(1)}」`);
      } else {
        await era.printAndWait(
          `「呜…真是屈辱…啊…呜…随你………呜…已、已经够了吧……」`,
        );
        await era.printAndWait(`${target_name}眼泛泪光地瞪着${player_name}………`);
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      kojo.接吻 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.接吻 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊哈…呼呜呜…还想要更多的啾啾…已经舒服到无法思考了啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}只是亲吻就已经泪光闪烁，积极地索求着舌间的纠缠。`,
        );
        await era.printAndWait(
          `「呜呜…呼…啊啊…想…${sc()}想要更多唔嗯…${heart(1)}」`,
        );
        // CFLAG:307  = 5（变量语义：CFLAG 族，307）
        kojo.接吻 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.接吻 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊、不行啊…太、太久了啦…呜…哈啊…呜呜…啊啊…呜呜呜……${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}予取予求地伸出舌头，因为兴奋不由自主地喘息着。`,
        );
        await era.printAndWait(
          `「呜…啊啊…唔啊啊…更…更多一点…魔王大人…${heart(1)}」`,
        );
        // CFLAG:307  = 4（变量语义：CFLAG 族，307）
        kojo.接吻 = 4;
      } else if (
        (era.get(`abl:${target}:10`) || 0) >= 2 &&
        (kojo.接吻 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呜…老实一点啊…啊…呜…呜呜…哈啊………」`);
        await era.printAndWait(`${target_name}的嘴唇毫不设防………`);
        // CFLAG:307  = 3（变量语义：CFLAG 族，307）
        kojo.接吻 = 3;
      } else if (kojo.接吻 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「呜…那么…还不够么…啊…呜…唔啊！…够了！」`);
        await era.printAndWait(
          `${target_name}的下巴被${player_name}抓住，任由你摆布了………`,
        );
        // CFLAG:307  = 2（变量语义：CFLAG 族，307）
        kojo.接吻 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 7) {
    if (kojo.自己扒开 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(
          `「啊啊…魔王大人在看我的小穴…！再…再深一点…！」`,
        );
        await era.printAndWait(
          `${target_name}脸上发热，仿佛在引诱${player_name}一般扒开自己的小穴………`,
        );
        if ((era.get(`talent:${target}:0`) || 0) === 1) {
          await era.printAndWait(`「啊啊啊…连处女膜也…看得到哦！」`);
        }
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(
          `「既然…想要看的话…那就…给你看好了～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}因为羞耻涨红了脸，却仍用手指撑开小穴………`,
        );
        if ((era.get(`talent:${target}:0`) || 0) === 1) {
          await era.printAndWait(`「啊…啊啊…处女膜都被看见了………」`);
        }
      } else {
        await era.printAndWait(`「你…你这变态…死吧！去死啊啊！」`);
        await era.printAndWait(
          `${target_name}虽然痛骂着${player_name}却没能反抗这命令，用颤抖的手指分开了自己的阴唇………`,
        );
      }
      // CFLAG:TARGET:308  = 1（变量语义：CFLAG 族，TARGET:308）
      kojo.自己扒开 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.自己扒开 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「真的吗，${sc()}的里面的样子${heart(1)} 真的能看得到吗？」`,
        );
        await era.printAndWait(
          `${target_name}一边舔着嘴唇一边开心地分开阴唇。`,
        );
        await era.printAndWait(
          `「啊啊啊…被你看到了哦${heart(1)}…我的一切都被你看到了呢${heart(1)}」`,
        );
        if ((era.get(`talent:${target}:0`) || 0) === 1) {
          await era.printAndWait(
            `「啊啊处女膜也被看到了…！什么时候才要蹂躏它呢～」`,
          );
        }
        // CFLAG:306  = 5（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.自己扒开 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「${sc()}的那里无论看多少次都不会厌…什么的…${sc()}…魔王大人是变态呜呜………」`,
        );
        await era.printAndWait(
          `${target_name}虽然害羞却主动扩大着自己的小穴。`,
        );
        await era.printAndWait(`「别…这样…节制一点！变态！」`);
        if ((era.get(`talent:${target}:0`) || 0) === 1) {
          await era.printAndWait(
            `「啊啊…处女膜…能看见吗？${scf()}、${sc()}…还是处女哟～………${heart(1)}」`,
          );
        }
        // CFLAG:306  = 4（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 4;
      } else if (
        (era.get(`abl:${target}:17`) || 0) >= 3 &&
        (kojo.自己扒开 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「你这变态…想看就看吧…看…我啊…你就喜欢这种事情吧？」`,
        );
        await era.printAndWait(`${target_name}舔着嘴唇分开双腿展示出阴部。`);
        await era.printAndWait(
          `「啊啊啊…哈…看看吧…看啊！这就是你想看到的吧！…啊…哈哈啊」`,
        );
        // CFLAG:306  = 3（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 3;
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「看就算了…还、还要我自己张开…你在看哪儿啊…大变态！」`,
        );
        await era.printAndWait(
          `${target_name}一边咒骂一边慢慢用手指打开了小穴……`,
        );
        // CFLAG:306  = 2（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 8) {
    if (kojo.插入手指 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(`「啊啊…啊啊啊…呜呜呜…手指…好粗大…！」`);
        await era.printAndWait(
          `${target_name}一边说着一边感受着${player_name}手指插入带来的兴奋………`,
        );
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(`「啊啊…呜…这、这样的…啊…啊啊！」`);
        await era.printAndWait(
          `${target_name}因为异物的侵入皱起眉头，咬了咬嘴唇………`,
        );
      } else {
        await era.printAndWait(`「停、停下来…别用、用…手指进来…啊啊啊！」`);
        await era.printAndWait(`${target_name}因为强烈的异物感而尖叫起来………`);
      }
      // CFLAG:TARGET:309  = 1（变量语义：CFLAG 族，TARGET:309）
      kojo.插入手指 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.插入手指 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊…啊啊啊…！用手指…搅动${sc()}淫荡的小穴啊啊…哈、哈啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}沉浸在快感中，扭动起腰肢配合着搅动的手指。`,
        );
        await era.printAndWait(`「啊…唔嗯…魔王大人…主人………${heart(1)}」`);
        // CFLAG:309  = 6（变量语义：CFLAG 族，309）
        kojo.插入手指 = 6;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.插入手指 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊！这、这是…要对${sc()}做这样的事情…呜…唔啊啊啊！」`,
        );
        await era.printAndWait(`${target_name}在这个瞬间皱着眉勉强地摇着头。`);
        await era.printAndWait(
          `「${sc()}…看上去很奇怪吧…唔啊唔啊啊啊${heart(1)}」`,
        );
        // CFLAG:309  = 5（变量语义：CFLAG 族，309）
        kojo.插入手指 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.插入手指 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊…哈…好粗…呜啊…啊啊啊！」`);
        await era.printAndWait(
          `${target_name}因为异物的侵入皱起眉头，咬了咬嘴唇………`,
        );
        // CFLAG:309  = 4（变量语义：CFLAG 族，309）
        kojo.插入手指 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.插入手指 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「你…你喜、喜欢就好…啊啊…呜…呜呜呜！」`);
        await era.printAndWait(`${target_name}配合着手指插入的动作做着反应………`);
        // CFLAG:309  = 3（变量语义：CFLAG 族，309）
        kojo.插入手指 = 3;
      } else if (kojo.插入手指 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「哼嗯…变态色狼连这样的事也…完全理解不了这种事有什么好啊啊…啊啊…呜呜…！」`,
        );
        await era.printAndWait(
          `${target_name}边骂着边扭动着身体想要逃离手指的侵袭………`,
        );
        // CFLAG:309  = 2（变量语义：CFLAG 族，309）
        kojo.插入手指 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 9) {
    if (kojo.舔肛 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(`「还要…请继续啊啊…♪」`);
        await era.printAndWait(`${target_name}在舔舐下括约肌完全放松了下来………`);
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(
          `「唔嗯，很脏呢♪变态${heart(1)}变态${heart(1)} 下流${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}故作愤怒的样子可爱极了，肛门的快感让她不由发出淫靡的喘息………`,
        );
      } else {
        await era.printAndWait(`「变态！　混蛋！　人渣！」`);
        await era.printAndWait(
          `${target_name}虽然痛骂着${player_name}却无力反抗………`,
        );
      }
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310）
      kojo.舔肛 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`talent:${target}:77`) || 0) === 1 &&
        (kojo.舔肛 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊啊啊啊…呜、呜呜…屁股…只是被舔而已嘛…唔啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}感受着肛门的快感发出意乱神迷的声音………`,
        );
        // CFLAG:310  = 7（变量语义：CFLAG 族，310）
        kojo.舔肛 = 7;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.舔肛 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「屁股小穴，在舌头上融化了…♪」`);
        await era.printAndWait(
          `${target_name}被舔舐而露出要化掉一般舒爽的神色………`,
        );
        // CFLAG:310  = 6（变量语义：CFLAG 族，310）
        kojo.舔肛 = 6;
      } else if (
        (era.get(`talent:${target}:77`) || 0) === 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「想要…更深一点…来吧${heart(1)} 用力哟${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}仅仅是被舔肛门就快要发狂了………`);
        // CFLAG:310  = 5（变量语义：CFLAG 族，310）
        kojo.舔肛 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.舔肛 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊啊…来、来吧，很舒服的呢…！」`);
        await era.printAndWait(
          `${target_name}被${player_name}精心舔舐的时候，能感觉到肛门的颤动………`,
        );
        // CFLAG:310  = 4（变量语义：CFLAG 族，310）
        kojo.舔肛 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.舔肛 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈啊啊…这…啊啊啊…这样的事…${sc()}…呜呜！」`);
        await era.printAndWait(`${target_name}被舔舐的同时懊恼的咬着嘴唇………`);
        // CFLAG:310  = 3（变量语义：CFLAG 族，310）
        kojo.舔肛 = 3;
      } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「这…！变态！你、你居然舔我的屁股…啊啊…完全不能接受…渣、渣滓！」`,
        );
        await era.printAndWait(
          `${target_name}除了肛门被舔的厌恶以外似乎还感到了另一种奇怪的感觉………`,
        );
        // CFLAG:310  = 2（变量语义：CFLAG 族，310）
        kojo.舔肛 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 10) {
    if (kojo.振动宝石 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(`「啊，真是的…这种道具也不错嘛…♪」`);
        await era.printAndWait(
          `${target_name}一边喘息着，一边沉浸在振动宝石给予的快感中。`,
        );
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 1
      ) {
        await era.printAndWait(`「呜…哼啊…要用这种东西吗…？」`);
        await era.printAndWait(
          `${target_name}看着振动宝石皱了皱眉头，露出寂寞的表情………`,
        );
      } else {
        await era.printAndWait(`「真的…要、要这样吗…唔啊！」`);
        await era.printAndWait(
          `${target_name}摇着头，拼命地忍受着异样的感觉………`,
        );
      }
      // CFLAG:TARGET:311  = 1（变量语义：CFLAG 族，TARGET:311）
      kojo.振动宝石 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.振动宝石 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「小豆豆哧哧的颤动着呢…♪」`);
        await era.printAndWait(
          `${target_name}流着口水沉浸在振动宝石带来的快感中。`,
        );
        await era.printAndWait(
          `「呜…唔嗯…阴蒂的感觉${heart(1)}…好舒服${heart(1)}」`,
        );
        // CFLAG:311  = 5（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.振动宝石 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈哈…好的哟～…」`);
        await era.printAndWait(
          `${target_name}受到振动宝石的刺激坦率地发出了喘息声。`,
        );
        await era.printAndWait(
          `「啊啊咿…呜…啊啊啊…阴蒂要…麻痹了啊…${heart(1)}」`,
        );
        // CFLAG:311  = 4（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.振动宝石 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「发、发麻了…已经…真是的！」`);
        await era.printAndWait(
          `${target_name}的身体因为受到振动宝石的刺激坦率地喘息着，因为快感而扭动着腰部。`,
        );
        // CFLAG:311  = 3（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 3;
      } else if (kojo.振动宝石 <= 1 || game.kojo.口上开关 === 2) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「你…你这变态！…啊啊…呜呜」`);
          await era.printAndWait(
            `${target_name}虽然嘴上不饶人，却也无法抵抗这种刺激………`,
          );
        } else {
          await era.printAndWait(`「啊啊…感觉…感觉好难受啊…真是的！」`);
          await era.printAndWait(
            `${target_name}摇晃着头拼命忍耐着强烈的刺激………`,
          );
        }
        // CFLAG:311  = 2（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 11 && era.get(`tequip:${target}:11`)) {
    if (kojo.壶虫 === 0) {
      if ((era.get(`talent:${target}:0`) || 0) === 1) {
        if ((era.get(`talent:${target}:76`) || 0) === 1) {
          await era.printAndWait(
            `「这可是我的第一次哦～…啊哈哈…这样的感觉也不错嘛♪」`,
          );
          await era.printAndWait(
            `${target_name}在蠕虫进入阴道的最深处夺取处女的同时，兴奋不安地扭动着腰………`,
          );
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          await era.printAndWait(`「好、好希望是魔王大人来…唔啊！」`);
          await era.printAndWait(
            `${target_name}带着一抹落寞的表情随着蠕虫的抽插发出痛苦的悲鸣………`,
          );
        } else {
          await era.printAndWait(`「那、那样的话…」`);
          await era.printAndWait(
            `${target_name}对于自己的私处正被蠕虫入侵这件事情还有些难以置信。`,
          );
          await era.printAndWait(
            `「开玩笑吧…这么脏的虫子…${sc()}的处子之身…啊啊啊！」`,
          );
        }
      } else {
        if ((era.get(`talent:${target}:76`) || 0) === 1) {
          await era.printAndWait(`「还是挺长的嘛…感觉不错哦${heart(1)}」`);
          await era.printAndWait(
            `${target_name}因为在体内蠢蠢而动的蠕虫发出诱人的呻吟………`,
          );
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          await era.printAndWait(`「这…这是…虫、虫子…进来了…啊啊啊啊！？」`);
          await era.printAndWait(
            `${target_name}因为阴道里蠕虫的抽插大声叫着………`,
          );
        } else {
          await era.printAndWait(
            `「这是什么！糟糕透了！咿呀！别，别动了啊！」`,
          );
          await era.printAndWait(
            `${target_name}随着阴道里蠕虫的动静越来越大而昏倒了………`,
          );
        }
      }
      // CFLAG:312  = 1（变量语义：CFLAG 族，312）
      kojo.壶虫 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.壶虫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「已经上瘾了呢…♪」`);
        await era.printAndWait(
          `${target_name}被蠕虫一直侵犯着，放荡地摆动着腰诱惑起${player_name}。`,
        );
        await era.printAndWait(
          `「啊啊啊…还在动${heart(1)}…${sc()}的小穴…好舒服啊…腰都不由自主地颤动起来了呢${heart(1)}」`,
        );
        // CFLAG:312  = 5（变量语义：CFLAG 族，312）
        kojo.壶虫 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.壶虫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「咿…啊啊啊！身体里…的感觉…啊…呜…！」`);
        await era.printAndWait(`${target_name}随着蠕虫的蠕动抖动着腰。`);
        await era.printAndWait(
          `「${scf()}、${sc()}…心情还不错呢…${heart(1)}」`,
        );
        // CFLAG:312  = 4（变量语义：CFLAG 族，312）
        kojo.壶虫 = 4;
      } else if (
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (kojo.壶虫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「感觉么…才、才没有…开玩笑吧…${scf()}…${sc()}…呜呜！」`,
        );
        await era.printAndWait(
          `${target_name}似乎已经习惯了虫子插入阴道的快感，但还不能坦率地承认这个事实……`,
        );
        // CFLAG:312  = 3（变量语义：CFLAG 族，312）
        kojo.壶虫 = 3;
      } else if (kojo.壶虫 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「被这样的低等生物…咿…呜…侵犯…啊啊啊！」`);
        await era.printAndWait(`${target_name}因为阴道里蠕虫的动作而悲鸣着………`);
        // CFLAG:312  = 2（变量语义：CFLAG 族，312）
        kojo.壶虫 = 2;
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 11 &&
    era.get(`tequip:${target}:11`) === 0
  ) {
    if (
      (era.get(`talent:${target}:76`) || 0) === 1 &&
      (kojo.壶虫着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「呀啊啊…要拿下来吗…别拔出去嘛………」`);
      await era.printAndWait(`${target_name}娇声发出了抗议………`);
      // CFLAG:372  = 3（变量语义：CFLAG 族，372）
      kojo.壶虫着脱 = 3;
    } else if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (kojo.壶虫着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊呜…啊啊啊啊…下次…要更………」`);
      await era.printAndWait(
        `${target_name}感觉不到那种异物感后觉得有些空虚………`,
      );
      // CFLAG:372  = 2（变量语义：CFLAG 族，372）
      kojo.壶虫着脱 = 2;
    } else if (kojo.壶虫着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「啊啊啊啊啊…这、这样就…被…啊啊啊啊……」`);
      await era.printAndWait(
        `${target_name}体下的蠕虫沾染的爱液之多令人感到讶异………`,
      );
      // CFLAG:372  = 1（变量语义：CFLAG 族，372）
      kojo.壶虫着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 12) {
    if (kojo.振动杖 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(`「啊啊！这、这…还、还要${heart(1)}」`);
        await era.printAndWait(
          `${target_name}初次体验振动棒的按压，舒服到腰都直不起来了………`,
        );
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(
          `「啊啊啊！…魔界都是这样奇怪的道具吗…呜…呜呜${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}感受着震动棒的按压，因为那新鲜的感觉而颤抖着………`,
        );
      } else {
        await era.printAndWait(
          `「想做什么！？别、别用那种东西碰我啊！淫棍！」`,
        );
        await era.printAndWait(
          `${target_name}感受着震动棒的按压一边叫骂，因为那新鲜的感觉而颤抖………`,
        );
      }
      // CFLAG:313  = 1（变量语义：CFLAG 族，313）
      kojo.振动杖 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.振动杖 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「唔啊啊呜呜呜！再…再按紧一点${heart(1)}」`);
        await era.printAndWait(
          `${target_name}努力把下体凑到振动棒上，享受着更强的快感………`,
        );
        // CFLAG:313  = 5（变量语义：CFLAG 族，313）
        kojo.振动杖 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.振动杖 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哎呀！发麻了…啊…啊啊啊啊${heart(1)}」`);
        await era.printAndWait(
          `${target_name}在${player_name}的视线中因为振动棒带来的快感发出愉悦的呻吟………`,
        );
        // CFLAG:313  = 4（变量语义：CFLAG 族，313）
        kojo.振动杖 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.振动杖 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呜…！哈啊哈啊…啊啊啊」`);
        await era.printAndWait(`${target_name}老实地享受着振动棒带来的快感………`);
        // CFLAG:313  = 3（变量语义：CFLAG 族，313）
        kojo.振动杖 = 3;
      } else if (kojo.振动杖 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「这…这东西…！住手！　人渣！…啊啊啊！」`);
        await era.printAndWait(
          `${target_name}因为振动棒被按在身上而大骂起来………`,
        );
        // CFLAG:313  = 2（变量语义：CFLAG 族，313）
        kojo.振动杖 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 13 && era.get(`tequip:${target}:13`)) {
    if (kojo.肛门虫 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(
          `「呜…奇怪的虫子…讨厌啦♪啊啊啊…全部…都插进来了${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}深深吐出一口气，平复着肛门虫带来的快感………`,
        );
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(
          `「啊…啊啊…在屁股里乱动！…哈哈啊…诶？里面很漂亮…吧…？」`,
        );
        await era.printAndWait(
          `${target_name}脸上带着泪痕，因为肛门虫的快感身体颤抖着………`,
        );
      } else {
        await era.printAndWait(
          `「哇啊啊啊啊啊！那是什么东西啊！ 唔啊啊…屁股…会被、被吃掉的吧！？」`,
        );
        await era.printAndWait(
          `${target_name}因为肛门虫的蠢动发出了可爱的悲鸣………`,
        );
      }
      // CFLAG:TARGET:314  = 1（变量语义：CFLAG 族，TARGET:314）
      kojo.肛门虫 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`talent:${target}:77`) || 0) === 1 &&
        (kojo.肛门虫 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊啊啊啊…屁股小穴把…进去了！吞进去了！好棒啊！」`,
        );
        await era.printAndWait(
          `${target_name}柔软的菊花把整个肛门虫都吞进去了。`,
        );
        await era.printAndWait(
          `「唔啊！呜呜！…屁股小穴里已经变得黏黏糊糊的了！${heart(3)}」`,
        );
        await era.printAndWait(`${target_name}翻着白眼沉浸在无比的快乐中………`);
        // CFLAG:314  = 9（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 9;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.肛门虫 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊啊♪　在我的肛门里饲养它么…？」`);
        await era.printAndWait(
          `${target_name}朝${player_name}莞尔一笑，然后开心地疯狂抖动着屁股………`,
        );
        // CFLAG:314  = 8（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 8;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.肛门虫 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「咿哇…在里面动呢…！啊啊啊啊…♪」`);
        await era.printAndWait(
          `${target_name}因为肛门虫而露出淫荡的样子，已经很有感觉了呢………`,
        );
        // CFLAG:314  = 7（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 7;
      } else if (
        (era.get(`talent:${target}:77`) || 0) === 1 &&
        (kojo.肛门虫 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…啊…啊啊啊啊…屁股小穴…被蠕虫侵犯了${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的肛门被下等生物蹂躏着反而发出了愉悦的声音。`,
        );
        await era.printAndWait(
          `「额啊啊啊啊啊啊啊…${scf()}、${sc()}…已、已经…快要高潮了啦${heart(1)}」`,
        );
        // CFLAG:314  = 6（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 6;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.肛门虫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「屁股…像融化了一样…♪ 啊…啊啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的肛门在蠕虫们的蹂躏下，已经产生了相当程度的快感………`,
        );
        // CFLAG:314  = 5（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.肛门虫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「有种…奇妙的感觉…啊…啊啊…！」`);
        await era.printAndWait(
          `${target_name}尽力忍耐着肛门里虫子翻绞产生的奇异的感觉………`,
        );
        // CFLAG:314  = 4（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 4;
      } else if (
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.肛门虫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「里面…在搅拌呢…♪ 啊…啊啊」`);
        await era.printAndWait(
          `${target_name}因为肛门被虫子蹂躏脸上露出享受的神色………`,
        );
        // CFLAG:314  = 3（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 3;
      } else if (kojo.肛门虫 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「搞什么啊！　${scf()}、${sc()}的屁股难道就任这些虫子施暴吗！」`,
        );
        await era.printAndWait(
          `${target_name}对于在自己肛门内蠕动的虫子表现出显而易见的厌恶………`,
        );
        // CFLAG:314  = 2（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 2;
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 13 &&
    era.get(`tequip:${target}:13`) === 0
  ) {
    if (
      (era.get(`talent:${target}:77`) || 0) === 1 &&
      (era.get(`talent:${target}:76`) || 0) === 1 &&
      (kojo.肛门虫着脱 < 6 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「呼啊啊啊…还不够呢…不够啊…屁股的感觉似乎变得很糟糕了呢！」`,
      );
      // CFLAG:374  = 6（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 6;
    } else if (
      (era.get(`talent:${target}:76`) || 0) === 1 &&
      (kojo.肛门虫着脱 < 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「屁股…黏糊糊的哟………」`);
      // CFLAG:374  = 5（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 5;
    } else if (
      (era.get(`talent:${target}:77`) || 0) === 1 &&
      (kojo.肛门虫着脱 < 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊啊啊啊…有点遗憾呢…糟糕的屁股想要主人的肉棒了…」`,
      );
      // CFLAG:374  = 4（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 4;
    } else if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (kojo.肛门虫着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「哈啊啊…更用力地…欺负我吧………」`);
      // CFLAG:374  = 3（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 3;
    } else if (
      (era.get(`abl:${target}:3`) || 0) >= 3 &&
      (kojo.肛门虫着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊啊啊…啊…啊啊啊啊啊…屁股…意外地舒服呢………」`);
      // CFLAG:374  = 2（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 2;
    } else if (kojo.肛门虫着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「总、总算…拿出去了…啊」`);
      // CFLAG:374  = 1（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 14 && era.get(`tequip:${target}:14`)) {
    if (kojo.阴蒂夹 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(`「哈啊啊啊啊…小豆豆已经迫不及待了呢！来吧！」`);
        await era.printAndWait(
          `${target_name}毫不犹豫地把振动着的阴蒂夹给夹上了………`,
        );
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(
          `「啊…啊啊啊…感觉这东西…好厉害啊啊………${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}把阴蒂夹安上之后脸上浮现出淫荡的表情……`,
        );
      } else {
        await era.printAndWait(
          `「啊啊啊！这、这种东西！拿走！给我拿下去！啊啊！」`,
        );
        await era.printAndWait(`${target_name}随着阴蒂夹震动变强发出哀鸣………`);
      }
      // CFLAG:315  = 1（变量语义：CFLAG 族，315）
      kojo.阴蒂夹 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.阴蒂夹 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊啊啊啊…小穴已经${heart(1)}　失去知觉了　${heart(1)} 唔嗯嗯嗯嗯！」`,
        );
        await era.printAndWait(
          `${target_name}因为阴蒂夹的震动毫不掩饰地娇喘着………`,
        );
        // CFLAG:315  = 5（变量语义：CFLAG 族，315）
        kojo.阴蒂夹 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.阴蒂夹 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呜啊…哈啊…这、这太强了…呜啊啊啊！这个强度的…震动…太厉害了${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}伴随着阴蒂夹的震动声，发出愉悦的呻吟………`,
        );
        // CFLAG:315  = 4（变量语义：CFLAG 族，315）
        kojo.阴蒂夹 = 4;
      } else if (
        (era.get(`abl:${target}:0`) || 0) >= 3 &&
        (kojo.阴蒂夹 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呜啊…呜…啊啊啊…这、这样…已经…啊啊啊…要去了！」`,
        );
        await era.printAndWait(
          `${target_name}咬着嘴唇忍耐着压低娇喘的音量。她这个样子非常诱人………`,
        );
        // CFLAG:315  = 3（变量语义：CFLAG 族，315）
        kojo.阴蒂夹 = 3;
      } else if (kojo.阴蒂夹 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「用、用这种东西…我无话可说…混蛋！啊啊啊啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}虽然骂着，却也无法取下阴蒂夹，不断地发出哀鸣………`,
        );
        // CFLAG:315  = 2（变量语义：CFLAG 族，315）
        kojo.阴蒂夹 = 2;
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 14 &&
    era.get(`tequip:${target}:14`) === 0
  ) {
    if (
      (era.get(`talent:${target}:76`) || 0) === 1 &&
      (kojo.阴蒂夹着脱 < 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊啊…还是安上来比较舒服嘛………」`);
      // CFLAG:375  = 4（变量语义：CFLAG 族，375）
      kojo.阴蒂夹着脱 = 4;
    } else if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (kojo.阴蒂夹着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「哈啊哈啊…总算是结束了………」`);
      // CFLAG:375  = 3（变量语义：CFLAG 族，375）
      kojo.阴蒂夹着脱 = 3;
    } else if (
      (era.get(`abl:${target}:0`) || 0) >= 3 &&
      (kojo.阴蒂夹着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊啊…哈…啊啊…啊啊啊………呜」`);
      // CFLAG:375  = 2（变量语义：CFLAG 族，375）
      kojo.阴蒂夹着脱 = 2;
    } else if (kojo.阴蒂夹着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「总、总算是取下来了…就不能早点吗！废、废物！」`);
      // CFLAG:375  = 1（变量语义：CFLAG 族，375）
      kojo.阴蒂夹着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 15 && era.get(`tequip:${target}:15`)) {
    if (kojo.乳头夹 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(
          `「这、这个不错嘛！…乳头…啊啊啊啊…在哧哧地震动${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}因为乳头夹的振动呼吸变得粗重起来………`,
        );
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(`「呜…呼呼…这、这东西…还…还好啦${heart(1)}」`);
        await era.printAndWait(
          `${target_name}随着乳头夹的震动显露出淫荡的风情………`,
        );
      } else {
        await era.printAndWait(
          `「用这种道具…嘁！${sc()}…啊啊啊啊…怎、怎么会！」`,
        );
        await era.printAndWait(
          `${target_name}的乳头持续被刺激着，以至于表情都有些扭曲了………`,
        );
      }
      // CFLAG:316  = 1（变量语义：CFLAG 族，316）
      kojo.乳头夹 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.乳头夹 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「偶尔这样也不错嘛…${sc()}的乳头…要融化了啦${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}乳头持续受刺激以至于呼吸变得粗重起来………`,
        );
        // CFLAG:316  = 5（变量语义：CFLAG 族，316）
        kojo.乳头夹 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.乳头夹 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呼唔啊…不要再欺负…${scf()}、${sc()}的乳头…了啊…好嘛${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}随着乳头夹的震动显露出淫荡的风情………`,
        );
        // CFLAG:316  = 4（变量语义：CFLAG 族，316）
        kojo.乳头夹 = 4;
      } else if (
        (era.get(`abl:${target}:1`) || 0) >= 3 &&
        (kojo.乳头夹 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「这、这种程度…啊啊啊啊…才不在乎…什么嘛…啊啊啊啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}的乳头完全勃起了，乳头夹继续夹着她敏感的部位………`,
        );
        // CFLAG:316  = 3（变量语义：CFLAG 族，316）
        kojo.乳头夹 = 3;
      } else if (kojo.乳头夹 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「一点感觉都不会有的…这种事情才不会有感觉啊…！」`,
        );
        await era.printAndWait(
          `${target_name}的乳头持续被刺激着，以至于表情都有些扭曲了………`,
        );
        // CFLAG:316  = 2（变量语义：CFLAG 族，316）
        kojo.乳头夹 = 2;
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 15 &&
    era.get(`tequip:${target}:15`) === 0
  ) {
    if (
      (era.get(`talent:${target}:76`) || 0) === 1 &&
      (kojo.乳头夹着脱 < 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「呜呜…啊啊…这淫荡的乳头变得更有感觉了呢………」`);
      // CFLAG:376  = 4（变量语义：CFLAG 族，376）
      kojo.乳头夹着脱 = 4;
    } else if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (kojo.乳头夹着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「哈…哈…别再欺负${sc()}了啦………」`);
      // CFLAG:376  = 3（变量语义：CFLAG 族，376）
      kojo.乳头夹着脱 = 3;
    } else if (
      (era.get(`abl:${target}:1`) || 0) >= 3 &&
      (kojo.乳头夹着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「哼！一点感觉都没有…哈啊。对${sc()}一点意义都没有…唔啊啊」`,
      );
      // CFLAG:376  = 2（变量语义：CFLAG 族，376）
      kojo.乳头夹着脱 = 2;
    } else if (kojo.乳头夹着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「哈…哈…已经麻、麻木了………」`);
      // CFLAG:376  = 1（变量语义：CFLAG 族，376）
      kojo.乳头夹着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 16 && era.get(`tequip:${target}:16`)) {
    if (kojo.榨乳器 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(
          `「呀啊…${sc()}…射出来了射出来了！${heart(1)}…好、好刺激${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被榨乳器榨出乳汁，发出了快意的呻吟………`,
        );
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(
          `「啊、啊啊…${sc()}的胸部…有东西出来了………${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被榨乳器榨出乳汁的同时出神地凝望着榨乳器………`,
        );
      } else {
        await era.printAndWait(
          `「住…住手啊…${scf()}、${sc()}怎么可能有那种东西…啊啊啊啊！」`,
        );
        await era.printAndWait(`${target_name}在榨乳器的压榨下发出悲鸣………`);
      }
      // CFLAG:317  = 1（变量语义：CFLAG 族，317）
      kojo.榨乳器 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.榨乳器 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…有、有快感了…${sc()}…明明只是在蹂躏乳房而已啊…呜呜…要去了！要去了！」`,
        );
        await era.printAndWait(
          `榨乳器开动的瞬间${target_name}的母乳就被吸了出来。`,
        );
        await era.printAndWait(
          `「怎么会这样…奶水出来得太多了啦………${heart(1)}」`,
        );
        // CFLAG:317  = 4（变量语义：CFLAG 族，317）
        kojo.榨乳器 = 4;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.榨乳器 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「胸部…已经流出来了…啊啊啊…魔王大人请享用这新鲜的乳汁吧………！」`,
        );
        await era.printAndWait(
          `榨乳器毫不留情地吸出着${target_name}的母乳，母乳的流出使她愉悦地呻吟起来。`,
        );
        await era.printAndWait(
          `「啊啊啊啊…${sc()}的…${sc()}感觉好奇怪…就像是…整个身体都要融化了呜呜呜 ${heart(1)}」`,
        );
        // CFLAG:317  = 3（变量语义：CFLAG 族，317）
        kojo.榨乳器 = 3;
      } else if (kojo.榨乳器 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「${scf()}、${sc()}…的母乳被你这样的小子…喝掉…才不要…啊啊啊啊啊！」`,
        );
        await era.printAndWait(
          `榨乳器启动开始刺激${target_name}的乳房，然而似乎没有母乳被榨出来………`,
        );
        // CFLAG:317  = 2（变量语义：CFLAG 族，317）
        kojo.榨乳器 = 2;
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 16 &&
    era.get(`tequip:${target}:16`) === 0
  ) {
    if (
      (era.get(`talent:${target}:76`) || 0) === 1 &&
      (kojo.榨乳器着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊啊啊…母乳已经满了…真是糟糕呢…嘿嘿………${heart(1)}」`,
      );
      // CFLAG:377  = 3（变量语义：CFLAG 族，377）
      kojo.榨乳器着脱 = 3;
    } else if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (kojo.榨乳器着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊…哈…太好了…胸部没有什么异常反应呢…${heart(1)}」`,
      );
      // CFLAG:377  = 2（变量语义：CFLAG 族，377）
      kojo.榨乳器着脱 = 2;
    } else if (kojo.榨乳器着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(
        `「啊啊啊…啊啊啊…竟敢…榨取我的${sc()}乳汁呜啊啊………」`,
      );
      // CFLAG:377  = 1（变量语义：CFLAG 族，377）
      kojo.榨乳器着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 17 && era.get(`tequip:${target}:17`)) {
    if (kojo.飞机杯 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(`「肉棒被摩擦的感觉……意外的舒服呢…」`);
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(
          `「呜…啊…阴茎…被包裹起来…啊…不可思议的…快感…♪」`,
        );
      } else {
        await era.printAndWait(`「嘁…给我按上这样的东西干什么………！」`);
      }
      // CFLAG:318  = 1（变量语义：CFLAG 族，318）
      kojo.飞机杯 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.飞机杯 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「肉棒真舒服啊♪　飞机杯最好了～♪」`);
        await era.printAndWait(
          `${target_name}强忍着射精的冲动剧烈抽插着阴茎………`,
        );
        // CFLAG:318  = 4（变量语义：CFLAG 族，318）
        kojo.飞机杯 = 4;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.飞机杯 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呜…啊…阴茎…被包裹起来…啊…不可思议的…快感…♪」`,
        );
        await era.printAndWait(`${target_name}看着飞机杯露出陶醉的神情………`);
        // CFLAG:318  = 3（变量语义：CFLAG 族，318）
        kojo.飞机杯 = 3;
      } else if (kojo.飞机杯 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「为、为什么要${sc()}做…这么可怕的事情啊………」`);
        await era.printAndWait(
          `${target_name}羞耻地看着双腿间的飞机杯，欲哭无泪………`,
        );
        // CFLAG:318  = 2（变量语义：CFLAG 族，318）
        kojo.飞机杯 = 2;
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 17 &&
    era.get(`tequip:${target}:17`) === 0
  ) {
    if (
      (era.get(`talent:${target}:76`) || 0) === 1 &&
      (kojo.飞机杯着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊啊呜啊…可以的话，能别拔下来吗…想要更多的射精～${heart(1)}」`,
      );
      // CFLAG:378  = 3（变量语义：CFLAG 族，378）
      kojo.飞机杯着脱 = 3;
    } else if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (kojo.飞机杯着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊哈啊啊…真想继续下去啊………」`);
      // CFLAG:378  = 2（变量语义：CFLAG 族，378）
      kojo.飞机杯着脱 = 2;
    } else if (kojo.飞机杯着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「啊啊啊…总算…取下来了………」`);
      // CFLAG:378  = 1（变量语义：CFLAG 族，378）
      kojo.飞机杯着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 19 && era.get(`tequip:${target}:19`)) {
    if (kojo.肛珠 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(
          `「啊啊呜…请继续欺负肛门吧！把珠子全都放进来${heart(1)}」`,
        );
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(`「啊啊啊啊…忍、忍不住了！…请温柔点…啊啊啊！」`);
      } else {
        await era.printAndWait(
          `「呜…唔啊！住手啊你这混球！…怎么能放在做那种事的地方…啊啊啊！！」`,
        );
      }
      // CFLAG:TARGET:320  = 1（变量语义：CFLAG 族，TARGET:320）
      kojo.肛珠 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`talent:${target}:77`) || 0) === 1 &&
        (kojo.肛珠 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊啊…还不够还不够…请、请更用力的蹂躏我的屁股小穴吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的肛门像是还想要更多的珠子似的蠢动着………`,
        );
        // CFLAG:320  = 9（变量语义：CFLAG 族，320）
        kojo.肛珠 = 9;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.肛珠 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哎呀哎呀…${sc()}的肛门里…满满的都是…好充实${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}在珠子一个个放进来的过程中，发自内心地赞叹着………`,
        );
        // CFLAG:320  = 8（变量语义：CFLAG 族，320）
        kojo.肛珠 = 8;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.肛珠 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…屁股小穴已经饥渴难耐了！请把珠子全都塞进来啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}张开双腿以便珠子塞入，在完成后舒畅地喘息起来………`,
        );
        // CFLAG:320  = 7（变量语义：CFLAG 族，320）
        kojo.肛珠 = 7;
      } else if (
        (era.get(`talent:${target}:77`) || 0) === 1 &&
        (kojo.肛珠 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「屁眼要坏了…啊…啊啊…想要…想要更多的充实感啊！${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的肛门非常柔软，甘之如饴地吞进了一个又一个串珠………`,
        );
        // CFLAG:320  = 6（变量语义：CFLAG 族，320）
        kojo.肛珠 = 6;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.肛珠 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「${sc()}的屁股…被当做玩物了…啊啊…啊啊…啊呜呜${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}每被塞入一个肛珠就发出一声可爱的呻吟………`,
        );
        // CFLAG:320  = 5（变量语义：CFLAG 族，320）
        kojo.肛珠 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.肛珠 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊…啊啊啊…变得、有点痛了…呜…啊啊啊啊！」`);
        await era.printAndWait(`${target_name}随着肛珠的进入发出痛苦的声音………`);
        // CFLAG:320  = 4（变量语义：CFLAG 族，320）
        kojo.肛珠 = 4;
      } else if (
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.肛珠 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「${sc()}的屁股…才不会变成你的玩物…啊啊啊…咿…啊…呜呜」`,
        );
        await era.printAndWait(
          `${target_name}的喘息声随着肛珠的进入变得粗重起来………`,
        );
        // CFLAG:320  = 3（变量语义：CFLAG 族，320）
        kojo.肛珠 = 3;
      } else if (kojo.肛珠 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「呜…唔啊！住手啊你这混球！…怎么能放在做那种事的地方…啊啊啊！！」`,
        );
        await era.printAndWait(
          `${target_name}在肛珠被一次性全塞进去的时候就老实了下来………`,
        );
        // CFLAG:320  = 2（变量语义：CFLAG 族，320）
        kojo.肛珠 = 2;
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 19 &&
    era.get(`tequip:${target}:19`) === 0
  ) {
    if (
      (era.get(`talent:${target}:76`) || 0) === 1 &&
      (kojo.肛珠着脱 < 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「呜咿咿咿！肛门…里面搅成一团了${heart(1)}」`);
      await era.printAndWait(
        `${target_name}在肛珠拔出的过程中一直发出意义不明的呻吟………`,
      );
      // CFLAG:379  = 4（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 4;
    } else if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (kojo.肛珠着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊哈…啊…啊啊啊…${sc()}的屁股…被玩弄了…${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}露出意味深长的遗憾表情………`);
      // CFLAG:379  = 3（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 3;
    } else if (
      (era.get(`abl:${target}:3`) || 0) >= 3 &&
      (kojo.肛珠着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊哈！全、全部…全部都弄出来了呢…啊啊♪」`);
      await era.printAndWait(
        `${target_name}在肛门张开的过程中一直是一副出神的表情………`,
      );
      // CFLAG:379  = 2（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 2;
    } else if (kojo.肛珠着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「不要啊…啊…啊啊…啊啊啊啊啊…呜呜呜……」`);
      await era.printAndWait(
        `${target_name}因为肛珠拔出的不适感一时呆若木鸡………`,
      );
      // CFLAG:379  = 1（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 20) {
    if (kojo.正常位 === 0) {
      if ((era.get(`talent:${target}:0`) || 0) === 1) {
        if ((era.get(`talent:${target}:76`) || 0) === 1) {
          if ((era.get(`talent:${target}:314`) || 0) === 9) {
            await era.printAndWait(
              `「哇啊啊…！好…好厉害…魔王大人的大肉棒${heart(1)}…${sc()}的处女膜…就请用力地捅破吧${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}光滑的皮肤变得通红，缠住${player_name}的双手在耳边低声私语。`,
            );
            await era.printAndWait(
              `「就是这样…肆意玩弄${sc()}的小穴${heart(1)} 魔王大人${heart(1)}」`,
            );
            await era.printAndWait(
              `「啊啊啊！被干得越来越舒服了啊${heart(1)}…想更多的品尝，魔王大人的大肉棒${heart(1)}」`,
            );
          } else {
            await era.printAndWait(`「${sc()}终于变成女人了呢…♪」`);
            await era.printAndWait(
              `${target_name}完全无视了破处之痛，脸上露出陶醉的表情。`,
            );
            await era.printAndWait(
              `「在这个地方…真正变成魔王大人的女人…真是想都没有想到过呢…哇啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}还想要说什么，不过${player_name}早已心急地托起她的腰开始了征伐………`,
            );
          }
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          if ((era.get(`talent:${target}:314`) || 0) === 9) {
            await era.printAndWait(
              `「${scf()}…${sc()}…已经变成…魔王大人的………${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}的处女身被阴茎顶到最深处，忍着骤然产生的痛苦在魔王耳边细语着。`,
            );
            await era.printAndWait(
              `「喂，喂…先说好，${sc()}要做第一夫人的哟？…唔，这么说你就是我的爱人啦…啊啊啊！别…别动啊！要去了…啊啊啊！」`,
            );
            await era.printAndWait(
              `虽然作为魔族已经屈服了，但${target_name}似乎还不是太明白自己的处境呢～需要继续狠狠地调教她啊………`,
            );
          } else {
            await era.printAndWait(
              `「好幸福…！这、这样的…${scf()}、${sc()}的第一次…啦啦啦啦…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}伸出双手挂在${player_name}脖子上，还是处子身的小穴被阴茎一下子顶到最深处。`,
            );
            await era.printAndWait(
              `「既、既然…已经破了…就…就不用再担心了呢…动、用力地动起来吧………${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}兴奋地恳求着，于是${player_name}愈发激烈地抽查起来………`,
            );
          }
        } else {
          await era.printAndWait(
            `「该、该死…${sc()}的处女…被你这种人…哇啊…啊啊啊啊啊啊啊！」`,
          );
          await era.printAndWait(
            `${player_name}对${target_name}撕心裂肺的哭喊充耳不闻，自顾自地蹂躏着这令人心醉的胴体………`,
          );
        }
      } else {
        if ((era.get(`talent:${target}:76`) || 0) === 1) {
          await era.printAndWait(`「抱紧我…♪」`);
          await era.printAndWait(
            `${target_name}和${player_name}拉着手紧抱在一起。`,
          );
          await era.printAndWait(
            `「${sc()}的小穴已经泛滥成灾…来尽情地欺负我吧${heart(1)}」`,
          );
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          await era.printAndWait(`「啊哈…开心…」`);
          await era.printAndWait(
            `${target_name}将双腿抬到最适合插入的角度，发出性感的喘息。`,
          );
          await era.printAndWait(`「呜…喜欢…喜欢这种感觉${heart(1)}」`);
        } else {
          await era.printAndWait(`「哼，你…你喜欢就好…淫棍………！」`);
          await era.printAndWait(
            `${target_name}表面上一副不以为然的样子，却随着肉棒的抽送发出懊悔的叹息声………`,
          );
        }
      }
      // CFLAG:321  = 1（变量语义：CFLAG 族，321）
      kojo.正常位 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.正常位 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(`「好的！　不错嘛！　更用力一点…♪」`);
          await era.printAndWait(
            `${target_name}在激烈的抽插下体液四溅，那样子就像是个下贱的妓女。`,
          );
          await era.printAndWait(
            `「不要…停下来…小穴里${heart(1)}…要被肉棒${heart(1)} 刺穿了啊啊啊${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊啊…${sc()}…已经…变成魔王大人的肉棒的奴隶了…哈啊啊…请赏赐给您下贱的仆人，您那神圣的肉棒吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的私处与${player_name}的阴茎紧紧的贴合在一起。`,
          );
          await era.printAndWait(
            `「不要放开…要肉棒${heart(1)}…一定不要停止下来哟${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「呜…啊啊啊…请更加…更加严厉地惩罚我…惩罚我吧！」`,
          );
          await era.printAndWait(
            `${target_name}向${player_name}撒娇般地要求着。`,
          );
          await era.printAndWait(
            `「被肉棒惩罚…要高潮了${heart(1)}…已经到极限了啊啊${heart(1)}」`,
          );
        }
        // CFLAG:321  = 7（变量语义：CFLAG 族，321）
        kojo.正常位 = 7;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.正常位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(`「抱紧一点…要一直这样抱着我哟…呜呜♪」`);
          await era.printAndWait(
            `${target_name}边喘息着边撒娇似的调笑着正抱住自己的${target_name}。`,
          );
          await era.printAndWait(
            `「啊啊啊…幸福…好幸福…被魔王大人抱着…是这个世界上最幸福的事情啦${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊…啊啊啊啊…更、更深一点…魔王大人的肉棒…到${scf()}、${sc()}的…最深处来…啊啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}一边扭动着腰一边在${player_name}耳边窃窃私语着。`,
          );
          await era.printAndWait(
            `「这样…就像这样…深深地吻我…摸…我的乳房${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊啊…被…魔王大人您…做这样的事…非常的幸福呢………${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}似乎很喜欢${player_name}蹂躏她的小穴，脸上露出幸福的神色。`,
          );
          await era.printAndWait(
            `「${sc()}…${sc()}…已、已经…到极限了了…要去了啊啊${heart(1)}」`,
          );
        }
        // CFLAG:321  = 6（变量语义：CFLAG 族，321）
        kojo.正常位 = 6;
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (kojo.正常位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「嘁…呜噗…这样做…根本就不舒服啊…令人憎厌的家伙……啊啊啊」`,
          );
          await era.printAndWait(
            `${target_name}倔强地忍住眼泪承受着${player_name}的侵犯。但她的下体似乎非常诚实地暴露出了对肉棒的渴望。`,
          );
          await era.printAndWait(
            `「咿！呜…我…啊啊啊啊…已、已经…滚开…滚开啊！…啊啊啊啊！」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `${target_name}紧紧咬着嘴唇不想发出任何声音，但淫穴已经泛滥成灾仿佛在等待着男人的征讨。`,
          );
          await era.printAndWait(
            `「呜…唔…呜呜…啊…啊…啊…啊啊啊啊…已经完全讨厌不起来了啊！啊啊啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}被情欲击溃了所有抵抗，发出呜呜的哭声………`,
          );
        } else {
          await era.printAndWait(
            `「这、这种事情……做出这样事情的你……该死的淫虫………去死啊！」`,
          );
          await era.printAndWait(
            `${target_name}虽然嘴上对被侵犯的事情毫不谅解，却诱惑地扭动着腰用自己的身体取悦着${player_name}。`,
          );
          await era.printAndWait(
            `「给我适可而止啊…滚开…拔出去…呜…太深了太深了唔啊啊！」`,
          );
        }
        // CFLAG:321  = 5（变量语义：CFLAG 族，321）
        kojo.正常位 = 5;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (kojo.正常位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊…啊…啊啊啊…这样就…${sc()}…啊啊啊！啊！啊啊啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}毫不掩饰的喘息让${player_name}的阴茎打了鸡血般变得更硬了………`,
        );
        await era.printAndWait(
          `「啊…哎呀…变得，更大了啊…已经是极限了…啊啊啊啊！」`,
        );
        // CFLAG:321  = 4（变量语义：CFLAG 族，321）
        kojo.正常位 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.正常位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊…呼…讨厌～…${sc()}…已经…啊啊啊啊！」`);
        await era.printAndWait(
          `${target_name}听天由命般任${player_name}粗暴地侵犯着自己………`,
        );
        // CFLAG:321  = 3（变量语义：CFLAG 族，321）
        kojo.正常位 = 3;
      } else if (kojo.正常位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「呜…呜呜呜！被做了这样的事情…千万不能被其他人发现啊…！」`,
        );
        await era.printAndWait(
          `${target_name}的私处似乎还承受不了这样的剧烈抽插，随着${player_name}的动作，${target_name}发出哀婉痛苦的悲鸣………`,
        );
        // CFLAG:321  = 2（变量语义：CFLAG 族，321）
        kojo.正常位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 21) {
    if (kojo.背后位 === 0) {
      if ((era.get(`talent:${target}:0`) || 0) === 1) {
        if ((era.get(`talent:${target}:76`) || 0) === 1) {
          if ((era.get(`talent:${target}:314`) || 0) === 9) {
            await era.printAndWait(
              `${target_name}被阴茎分开青色的臀肉，插入到最深处，发出泣诉似的呻吟。`,
            );
            await era.printAndWait(
              `「啊哈…啊啊…啊啊啊呜${heart(1)} 好厉害啊…请继续…${heart(1)} ${sc()}的处女膜被夺走了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}作为魔族证明的尾巴紧紧缠住${player_name}的腰部，仿佛是在寻求更加激烈的凌辱。`,
            );
            await era.printAndWait(
              `「${sc()}、哈 ${heart(1)}…没问题的 ${heart(1)}…请继续侵犯我…想要魔王大人的大鸡巴${heart(3)}」`,
            );
          } else {
            await era.printAndWait(`「第一次被从后面插…好兴奋啊♪」`);
            await era.printAndWait(
              `${target_name}主动趴在地上引导${player_name}的阴茎插到最深处。`,
            );
            await era.printAndWait(
              `「第一次感受到魔王大人的大肉棒威力呢…${sc()}好幸福啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}那刚刚被破处的小穴蠕动着，变本加厉地向${player_name}索求起来………`,
            );
          }
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          if ((era.get(`talent:${target}:314`) || 0) === 9) {
            await era.printAndWait(
              `${player_name}的下体狠狠刺破${target_name}的处女膜直到最深处，魔族的尾巴因为极度的愉悦直立起来`,
            );
            await era.printAndWait(
              `「啊哈…啊啊啊啊…请…魔王大人…不要怜惜我…好棒…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}用指爪支撑着趴在地上，${player_name}从后面不断抽插。`,
            );
            await era.printAndWait(
              `「呜啊…啊哈哈…说、说真的…魔王大人的话…怎么使用${sc()}的身体…都无所谓哦${heart(1)}」`,
            );
          } else {
            await era.printAndWait(
              `「这…这姿势…像野兽交合一样…啊啊…啊呜啊！」`,
            );
            await era.printAndWait(
              `${target_name}把自己的屁股高高举起，${player_name}收下这淫靡的贡品，夺走了${target_name}的纯洁。`,
            );
            await era.printAndWait(
              `「这是${scf()}、${sc()}…的第一次…所以…请温柔……呜啊，温柔一点…啊啊啊啊！」`,
            );
            await era.printAndWait(
              `${target_name}的话似乎没有起到什么作用，${player_name}毫不怜惜地蹂躏着这处女的肉穴………`,
            );
          }
        } else {
          await era.printAndWait(
            `${player_name}毫不手软地挺枪直入，将处女膜的阻拦轻松捅破。`,
          );
          await era.printAndWait(
            `「不…该死…用这种姿势夺走${sc()}的处女之身…不要啊！」`,
          );
          await era.printAndWait(
            `哭泣喊叫的${target_name}反而使${player_name}更加兴奋，抓住身下人的腰猛烈地冲刺起来………`,
          );
        }
      } else {
        if ((era.get(`talent:${target}:76`) || 0) === 1) {
          await era.printAndWait(
            `「从后面进来什么的…听起来不错呢${heart(1)}…呜啊呜${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的身体迎合着${player_name}的阴茎摇动起来。`,
          );
          await era.printAndWait(`「好…好棒唔…呜…啊啊啊…哈啊呜${heart(1)}」`);
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          await era.printAndWait(`「像是…野兽一样…啊啊啊…！」`);
          await era.printAndWait(
            `为了让${target_name}体会到野兽一样的感觉，${player_name}故意加大了撞击的力度。`,
          );
          await era.printAndWait(
            `「啊啊…啊啊啊啊…呼…好深…唔…太深了啊啊…${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `${target_name}趴在地上，${player_name}的腰肆无忌惮地撞击着。`,
          );
          await era.printAndWait(
            `「这样做…竟然会让你感觉舒服吗…混蛋…呼…啊啊啊啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}到现在还带着一点可爱的嚣张呢，可这反而让人更加兴奋………`,
          );
        }
      }
      // CFLAG:322  = 1（变量语义：CFLAG 族，322）
      kojo.背后位 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.背后位 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「呼！　哈啊啊…♪　想要更刺激地被干♪ 啊啊啊…这、这样舒服的感觉${heart(1)}」`,
          );
          await era.printAndWait(
            `为了满足这个愿望，${target_name}的腰被紧紧抓住，阴茎狠狠地抽插着发出噗咻噗咻的水声。`,
          );
          await era.printAndWait(
            `「啊啊啊…啊呜…哈啊…啊啊啊！${sc()}已经被魔王大人的肉棒征服了呜呜呜呜～！」`,
          );
          await era.printAndWait(`${target_name}的娇吟声越来越大………`);
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「像狗狗一样呢…汪汪！……开个玩笑哈哈…啊啊呜呜${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}羞答答的样子激发了更狂暴的性欲。`,
          );
          await era.printAndWait(
            `「啊呜…啊啊啊啊啊…啊啊啊${heart(1)}…${sc()}…想像野兽一样…被从后面侵犯…${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}背部后仰发出了这样的呼喊………`);
        } else {
          await era.printAndWait(`「后面…好啦！　真是的！　…啊啊啊啊♪」`);
          await era.printAndWait(
            `${target_name}的屁股很容易就将${player_name}的肉棒吸纳进小穴里。`,
          );
          await era.printAndWait(
            `「被大肉棒…侵犯了啊啊…想要一直一直被侵犯${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}脑子里已经只剩想被耕耘的欲望了………`,
          );
        }
        // CFLAG:322  = 7（变量语义：CFLAG 族，322）
        kojo.背后位 = 7;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「从后面也请温柔点…呜啊哈啊…啊啊…啊啊啊…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的叫声显得有些可爱，${player_name}在这样的刺激下更加卖力了起来。`,
          );
          await era.printAndWait(
            `「哼${heart(1)} 啊啊啊${heart(1)} 啊啊呜${heart(1)} 那、那种地方…魔王大人真坏${heart(1)}」`,
          );
          await era.printAndWait(
            `像只小狗一样的${target_name}再度发出了可爱的声音………`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「请惩罚我吧…${heart(1)} 啊…啊啊啊啊…太、太深了啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}圆滚滚的屁股因为${player_name}腰部激烈的拍打而变得通红。`,
          );
          await era.printAndWait(
            `「魔王大人的肉棒…好充实…好棒！最喜欢…最喜欢肉棒了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}为了让${player_name}射在阴道里而卖力地吸吮着肉棒………`,
          );
        } else {
          await era.printAndWait(
            `「请给…啊呜${heart(1)}…我…给我大肉棒…呜啊哈啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}自然而然地将${player_name}的阴茎吞进小穴里。`,
          );
          await era.printAndWait(
            `「啊啊啊啊…还、还要…想要更多…${sc()}…像是发情的母狗一样呢${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}这发情母狗似的表现让${target_name}感到非常兴奋………`,
          );
        }
        // CFLAG:322  = 6（变量语义：CFLAG 族，322）
        kojo.背后位 = 6;
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (kojo.背后位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊啊…低、低劣的手段…那种事情…明明…只会觉得痛苦而已…啊呜啊啊！？」`,
          );
          await era.printAndWait(
            `似乎是有点太激烈了，只是搅动了几下${target_name}的声音里就混入了一丝甜美的喘息。`,
          );
          await era.printAndWait(
            `「啊啊啊…你这样的渣滓…决不会…不会屈服…不…呜…啊啊啊…啊呜哈啊！」`,
          );
          await era.printAndWait(
            `即使${target_name}的小穴已经因为调教变得十分敏感，她也顽固地不打算承认的样子………`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `${target_name}虽然用手在抵挡着身后人那凶狠的刺击，柔软的小穴却主动纠缠住了阴茎。`,
          );
          await era.printAndWait(
            `「${scf()}、${sc()}…绝不是因为你的垃圾肉棒…绝对没有…感觉到什么啊…！哈…啊啊啊啊啊啊！」`,
          );
          await era.printAndWait(
            `不管${target_name}到底有没有感觉到快感，${target_name}的淫穴还死死地缠住阴茎不肯放开………`,
          );
        } else {
          await era.printAndWait(
            `「啊啊，被做着这样的事情…已经有点习惯了吗…嘁…啊啊啊…！才不会认输啊…糖衣炮弹什么的…啊啊呜！」`,
          );
          await era.printAndWait(
            `${player_name}为了不让${target_name}乱动抓紧了她的腰使劲抽插着。那懊悔的声音里明显有着快感的成分。`,
          );
          await era.printAndWait(
            `「啊啊啊…这、这样…蛆虫一样下贱的混蛋…啊啊啊啊…和…这样的…${sc()}…啊啊啊啊啊！」`,
          );
        }
        // CFLAG:322  = 5（变量语义：CFLAG 族，322）
        kojo.背后位 = 5;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「再、再激烈一点也…没、没问题的…哈…啊啊啊啊………！」`,
        );
        await era.printAndWait(`${target_name}带着恳求和享受的声音发散开来。`);
        await era.printAndWait(
          `「呜…唔啊…啊啊啊啊啊…已、已经…！…想…被侵犯得更激烈一点…！啊啊啊啊…呼…呜…啊啊啊！」`,
        );
        // CFLAG:322  = 4（变量语义：CFLAG 族，322）
        kojo.背后位 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}老实的把屁股暴露在${player_name}的面前。`,
        );
        await era.printAndWait(
          `「啊啊…讨厌…啊啊…有点啊啊…太…太深了…啊啊啊啊啊！」`,
        );
        await era.printAndWait(
          `看到${target_name}被侵犯得喘息连连快要哭出来的的表情，阴茎变得更加挺立起来………`,
        );
        // CFLAG:322  = 3（变量语义：CFLAG 族，322）
        kojo.背后位 = 3;
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「你这家伙…啊啊啊！你难道不知道什么叫做…温、温柔吗…呼…痛啊…啊啊啊啊！」`,
        );
        await era.printAndWait(`${target_name}痛苦的悲鸣着然而似乎无济于事………`);
        // CFLAG:322  = 2（变量语义：CFLAG 族，322）
        kojo.背后位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 22) {
    if (kojo.对面座位 === 0) {
      if ((era.get(`talent:${target}:0`) || 0) === 1) {
        if ((era.get(`talent:${target}:76`) || 0) === 1) {
          await era.printAndWait('');
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      } else {
        if ((era.get(`talent:${target}:76`) || 0) === 1) {
          await era.printAndWait(
            `「啊啊…啊啊…热…魔王大人的身体好灼热呢${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}摇晃着身体紧紧地缠住肉棒。`);
          await era.printAndWait(
            `「啊啊啊啊…就…就喜欢…这样被侵犯…哈啊…被侵犯${heart(1)}」`,
          );
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          await era.printAndWait(`「很温柔呢………${heart(1)}」`);
          await era.printAndWait(
            `${target_name}撒娇似的把脸靠在${player_name}肩上呢喃道。`,
          );
          await era.printAndWait(
            `「啊啊啊啊…${sc()}…这样温柔的感觉…还是第一次呢………${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊哈…这、这不是…这不是恋人才会做的事情吗…啊啊！啊啊啊…！」`,
          );
          await era.printAndWait(
            `${player_name}紧紧抱住${target_name}不让她逃走，慢慢开始晃动腰部………`,
          );
        }
      }
      // CFLAG:323  = 1（变量语义：CFLAG 族，323）
      kojo.对面座位 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.对面座位 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(`「${sc()}…很喜欢这样被操啊…${heart(1)}」`);
          await era.printAndWait(
            `${target_name}的小穴被塞得慢慢的，望着${player_name}的脸忽然凑上来舔了起来。`,
          );
          await era.printAndWait(
            `「哈啊…呜…呜啊…已、已经…${sc()}…已经…要高潮了呜啊啊啊…${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `${target_name}的小穴贪婪地吸引着${player_name}的阴茎，想要把它整个吞进去。`,
          );
          await era.printAndWait(
            `「肉棒…越来越想要…魔王大人的肉棒了啊${heart(1)}」`,
          );
          await era.printAndWait(
            `那诱人的腰肢不断摆动着品尝起${player_name}肉棒的滋味………`,
          );
        } else {
          await era.printAndWait(
            `「啊啊…啊啊…热…魔王大人的身体好灼热呢${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}摇晃着身体紧紧地缠住肉棒。`);
          await era.printAndWait(
            `「啊啊啊…想被更粗暴的…侵犯…侵犯…侵犯啊啊啊啊${heart(1)}」`,
          );
        }
        // CFLAG:323  = 7（变量语义：CFLAG 族，323）
        kojo.对面座位 = 7;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.对面座位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「喜…喜欢…${sc()}…喜欢魔王大人下面的的东西…啊啊啊…呜啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}主动向你索吻，同时${target_name}的下体也夹得越来越紧。`,
          );
          await era.printAndWait(
            `「啊啊啊…已经…爱上做爱这种事情了………${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `${target_name}紧紧抱住${player_name}，不禁咬住${player_name}肩头。`,
          );
          await era.printAndWait(
            `「哈啊…啊啊…啊啊啊啊…太深了…最、最里面…里面…${heart(1)}」`,
          );
          await era.printAndWait(
            `虽然${player_name}很体谅${target_name}的辛苦，但仍不断抽插着肉棒………`,
          );
        } else {
          await era.printAndWait(
            `${target_name}撒娇似的把脸靠在${player_name}肩上呢喃到。`,
          );
          await era.printAndWait(
            `「啊哈啊啊…${sc()}…喜欢被这样温柔的对待呢…………${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}主动摆动腰臀迎合着………`);
        }
        // CFLAG:323  = 6（变量语义：CFLAG 族，323）
        kojo.对面座位 = 6;
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (kojo.对面座位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(5) === 0) {
          await era.printAndWait(
            `尽管${target_name}努力从${player_name}身边挣脱，${player_name}还是抓住她的腰边抚摸那诱人的身躯边开始了冲击。`,
          );
          await era.printAndWait(
            `「呜…哈…唔啊啊…啊啊…已经逃不出这双手了吗…不，${sc()}仅仅是…被那东西给…呜啊！」`,
          );
          await era.printAndWait(
            `被开发的身体反应十分敏感，双手徒劳地在${player_name}背后拉扯着………`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊啊…别抱着我啊，讨厌的男人…啊啊啊啊啊！腰、腰也不准动…不、不行…啊！」`,
          );
          await era.printAndWait(
            `${target_name}的挣扎和悲鸣被完全无视了，阳具在她体内搅动。`,
          );
          await era.printAndWait(
            `「被做了这样的事情…${sc()}…啊啊啊…那、那里不行啊！」`,
          );
        } else {
          await era.printAndWait(
            `「卑鄙的家伙…竟然对${sc()}做这样的事情…啊啊啊啊……！」`,
          );
          await era.printAndWait(
            `${target_name}的骂声中${player_name}抓住她的腰开始推送，这样的她再怎么挣扎也无能为力吧。`,
          );
          await era.printAndWait(
            `「啊啊啊…呼…呜啊…呜啊…完、完全就没有感觉嘛…哈呜…住手…啊啊啊啊！」`,
          );
          await era.printAndWait(
            `嘴上这么说着小穴却像金鱼嘴一样紧紧吸附着的${target_name}看上去也有点可爱呢………`,
          );
        }
        // CFLAG:323  = 5（变量语义：CFLAG 族，323）
        kojo.对面座位 = 5;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (kojo.对面座位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「就是这样子…啊…啊呜呜！呜…！真是的，用力过头了吧…啊啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}被下面的人轻轻顶着，就晃动着发出甜腻淫荡的呻吟………`,
        );
        // CFLAG:323  = 4（变量语义：CFLAG 族，323）
        kojo.对面座位 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.对面座位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…呜啊！呜！………这个程度的动作…好吧…啊啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}拼命地摇摆着腰肢，让${player_name}感到非常愉悦………`,
        );
        // CFLAG:323  = 3（变量语义：CFLAG 族，323）
        kojo.对面座位 = 3;
      } else if (kojo.对面座位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「居、居然…做出…这样的事…不…啊啊啊啊！」`);
        await era.printAndWait(
          `${target_name}想要逃开的身躯被紧紧抱住，无力挣脱………`,
        );
        // CFLAG:323  = 2（变量语义：CFLAG 族，323）
        kojo.对面座位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 23) {
    if (kojo.背面座位 === 0) {
      if ((era.get(`talent:${target}:0`) || 0) === 1) {
        if ((era.get(`talent:${target}:76`) || 0) === 1) {
          await era.printAndWait('');
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      } else {
        if ((era.get(`talent:${target}:76`) || 0) === 1) {
          await era.printAndWait(
            `「啊啊啊啊…进进出出的地方…都被看光了${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}主动张开双腿扭动着腰………`);
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          await era.printAndWait(
            `「就这样从后面抱着我…啊…啊啊啊呜…魔王大人…真可爱${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}把手绕到后面抚摸${player_name}，发出娇嫩的呻吟………`,
          );
        } else {
          await era.printAndWait(
            `「住、住手啊肮脏的家伙…！放、放开我…啊啊啊啊！」`,
          );
        }
      }
      // CFLAG:324  = 1（变量语义：CFLAG 族，324）
      kojo.背面座位 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.背面座位 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊啊啊…能享用这样的肉棒${heart(1)} 不论怎样都无所谓啦…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}来回抚摸着下腹，屁股左右摆动想要把阴茎吞到更深的地方………`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「用力抱紧我…怎样都不要放开${heart(1)}」`);
          await era.printAndWait(
            `如同${target_name}所期望的那样，${player_name}从后面抱住她，肉棒在泛滥成灾的小穴里狠狠抽插起来………`,
          );
        } else {
          await era.printAndWait(
            `「啊啊啊啊…想要肉棒…插得更深一些！啊啊啊啊…谢谢款待哦${heart(1)}」`,
          );
          await era.printAndWait(
            `如${target_name}所愿插入得更深了。久经调教的身体柔软摆动，取悦着身后紧紧抱住的${player_name}。`,
          );
          await era.printAndWait(
            `「更、更想…想要…想要肉棒了啊………${heart(1)}」`,
          );
        }
        // CFLAG:324  = 7（变量语义：CFLAG 族，324）
        kojo.背面座位 = 7;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.背面座位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「那、那里…已经…被您弄得黏糊糊的了呢……${heart(1)}」`,
          );
          await era.printAndWait(
            `从后面抱着的${target_name}温柔的声音充满了甜蜜……`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊啊…呜…哈啊哈啊…已经要去了呢…明明还想要更激烈一点${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}温柔地抚摸着乳房，腰部配合地扭动着………`,
          );
        } else {
          await era.printAndWait(
            `「从后面抱着很温柔呢…呜…啊啊…大脑里一片空白了啦………${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被从后面插得几乎神志不清，连喘息声都甜得发腻………`,
          );
        }
        // CFLAG:324  = 6（变量语义：CFLAG 族，324）
        kojo.背面座位 = 6;
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (kojo.背面座位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「哈…啊啊啊…脖子…很痒的啊…呜哈啊啊啊！啊…啊呼！」`,
          );
          await era.printAndWait(
            `${player_name}亲吻着${target_name}的脖子，缓缓地开始了征伐………`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「下、下贱的魔族…再侮辱${sc()}的话…就…啊啊啊啊…够了！」`,
          );
          await era.printAndWait(
            `${target_name}在${player_name}的抽插下大声地叫着。`,
          );
          await era.printAndWait(`女人嫌弃地看着玩弄自己身体的“对手”………`);
        } else {
          await era.printAndWait(
            `「哈啊…啊…啊呼…别得意忘形…总有一天会让你…啊啊啊啊呜！」`,
          );
          await era.printAndWait(
            `${target_name}在${player_name}腰间喝骂着，那小穴正是男人求之不得的瑰宝啊。`,
          );
          await era.printAndWait(`她不知不觉开始扭动着腰，发出快乐的呻吟………`);
        }
        // CFLAG:324  = 5（变量语义：CFLAG 族，324）
        kojo.背面座位 = 5;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (kojo.背面座位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呜…啊呜！…哈啊哈啊…到…到最里面了…插进来了…啊啊啊啊呜！」`,
        );
        await era.printAndWait(
          `${target_name}弯着腰，灼热的小穴紧紧包裹着${player_name}的阴茎持续提供着快感………`,
        );
        // CFLAG:324  = 4（变量语义：CFLAG 族，324）
        kojo.背面座位 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.背面座位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊…哈啊…啊啊啊…胸部！干嘛…抓这么紧啊………！」`);
        await era.printAndWait(
          `${target_name}的胸部被揉搓着，小穴也被更加激烈地冲击着………`,
        );
        // CFLAG:324  = 3（变量语义：CFLAG 族，324）
        kojo.背面座位 = 3;
      } else if (kojo.背面座位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「滚…放手啊…不管你怎么做…我也只会感到痛苦而已…停手…！」`,
        );
        await era.printAndWait(
          `${target_name}的阴道被${player_name}的肉棒叩开，狠狠插了进去………`,
        );
        // CFLAG:324  = 2（变量语义：CFLAG 族，324）
        kojo.背面座位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 26) {
    if (kojo.正常位肛交 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(
          `「啊啊啊呜！那、那里是屁…啊啊啊…好舒服${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的肛门被阴茎一口气插到深处，${target_name}双手在${player_name}背上抓挠着………`,
        );
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(
          `「啊、啊如果是…魔王大人的话…${sc()}什么都…呜呜！呜啊！」`,
        );
        await era.printAndWait(
          `${target_name}的肛门被阴茎一口气贯穿，因为痛苦不禁咬住了嘴唇………`,
        );
      } else {
        await era.printAndWait(
          `「住手…你这变态的肮脏动物！那、那不是插进去的地方啊…不要啊啊啊！」`,
        );
      }
      // CFLAG:TARGET:327  = 1（变量语义：CFLAG 族，TARGET:327）
      kojo.正常位肛交 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.正常位肛交 <= 7 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊哇啊…啊呜…啊啊…啊哈…啊啊啊啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}因为肛门的蹂躏已经几乎进入了极乐世界，只能不断地发出喘息声………`,
          );
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            await era.printAndWait(
              `「啊啊…${sc()}…要和这根大鸡巴结婚啊啊${heart(1)} 屁眼已经要升天了啊啊${heart(1)}」`,
            );
          }
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「魔王大人的大肉棒…好厉害…请继续…侵犯我吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}檀口微张，享受着${player_name}对自己肛门的侵犯………`,
          );
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            await era.printAndWait(
              `「要受不了了${heart(1)} 要疯了疯了啊啊啊${heart(1)} 啊啊啊啊…${sc()}已经，对肉棒完全失去抵抗力了${heart(1)}」`,
            );
          }
        } else {
          await era.printAndWait(
            `「啊啊啊啊呜…呜…这是…屁股小穴被扩张开了呢…！真、真棒啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}饱受调教的屁股将${player_name}的肉棒紧紧缠绕起来………`,
          );
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            await era.printAndWait(
              `「哈哈哈啊啊啊哈${heart(1)}…还想被侵犯…肛门已经爱上肉棒的味道了${heart(1)}」`,
            );
          }
        }
        // CFLAG:327  = 8（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 8;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.正常位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「魔王大人…啊啊啊啊啊…再激烈一点也…没关系的呜啊！」`,
        );
        await era.printAndWait(`${target_name}调教不足的肛门显得有一丝痛苦………`);
        // CFLAG:327  = 7（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 7;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.正常位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「哎呀…这感觉…啊啊啊啊…屁股…出乎意料地舒服呢…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的肛门虽然被蹂躏着却感到十分舒服，连带着屁股附近的部位也充满快感………`,
          );
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            await era.printAndWait(
              `「还要！还想被干！${sc()}的屁股…要去了啊啊啊啊${heart(1)}」`,
            );
          }
        } else {
          await era.printAndWait(
            `「${scf()}、${sc()}的屁股…快感十足呢…啊啊啊…魔王大人下面的东西…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的肛门被${player_name}的抽插弄得高潮连连………`,
          );
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            await era.printAndWait(
              `「屁股在发热…！主人的…${heart(1)}好棒${heart(1)}…呜啊哈啊${heart(1)}」`,
            );
          }
        }
        // CFLAG:327  = 6（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 6;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.正常位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「魔王大人…啊啊啊啊啊…就不能温柔点吗………呜！」`);
        await era.printAndWait(`${target_name}调教不足的肛门显得有一丝痛苦………`);
        // CFLAG:327  = 5（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 5;
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.正常位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「混蛋…混蛋…快拔出来…啊啊！会坏掉的…${sc()}的屁股，怎么可能主动分开…！」`,
          );
          await era.printAndWait(
            `${target_name}对肛门被侵犯的事情表现出强烈的嫌恶感。`,
          );
          await era.printAndWait(`「呜…该死…你这蛆虫…快拔出来…拔出来啊…！」`);
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「咦…呜呜呜！…啊啊啊…啊啊啊啊啊………！你这下贱无耻的混蛋，下贱无耻！」`,
          );
          await era.printAndWait(
            `${target_name}被开发过的肛门因为阴茎的进出持续地产生着快感。`,
          );
          await era.printAndWait(
            `「啊啊啊啊…到这个程度了…就…就已经…到此为止了吧…呜…啊啊啊呜！」`,
          );
        } else {
          await era.printAndWait(
            `「渣滓…！啊、啊呜哈啊啊…这样玩弄奇怪的地方…到底有什么意义…呜！唔啊啊啊啊！」`,
          );
          await era.printAndWait(`${target_name}在侵犯的间隙不断痛骂着。`);
          await era.printAndWait(
            `「垃圾！废物！给我停手啊…啊啊啊啊啊！混蛋住手啊！！啊呜呜呜！」`,
          );
        }
        // CFLAG:327  = 4（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 4;
      } else if (
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.正常位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呜…哈…啊啊啊啊…！不、不行了…！要去了！」`);
        await era.printAndWait(
          `${target_name}的肛门大概已经习惯了这样的事情，随着抽插发出轻微的喘息声………`,
        );
        // CFLAG:327  = 3（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 3;
      } else if (kojo.正常位肛交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊喂…住…住手啊！…滚、滚开…滚开啊败类！」`);
        await era.printAndWait(
          `懊悔的呻吟声中${target_name}的肛门依然紧闭着，${player_name}强行挤开了肛门………`,
        );
        // CFLAG:327  = 2（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 27) {
    if (kojo.背后位肛交 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(`「屁眼被射满精液了…♪啊呜啊哈${heart(1)}」`);
        await era.printAndWait(
          `${target_name}的肛门被从后面贯穿，发出撒娇似的呻吟………`,
        );
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(`「屁股里感觉，好奇怪呢…${heart(1)}」`);
        await era.printAndWait(
          `${target_name}的肛门被从后面贯穿，喘息变得粗重起来………`,
        );
      } else {
        await era.printAndWait(
          `「那、那里…不、不能用啊…可恶的败类，别乱动啊！」`,
        );
        await era.printAndWait(`${target_name}肛门被从后面侵犯着，惨叫连连………`);
      }
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328）
      kojo.背后位肛交 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背后位肛交 <= 7 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「哈呜…啊呜…啊啊啊呜…屁股小穴被侵犯什么的…最棒了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}那开发过的肛门就像专门为男人所准备似的………`,
          );
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            await era.print('');
            await era.printAndWait(
              `「啊哈哈哈…就这样射精吧！${scf()}、${sc()}…的屁股小穴想喝精液啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}的肛门为了促进射精紧紧包裹住${target_name}的阴茎蠕动起来………`,
            );
          }
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「肛门感觉，好舒服啊…${heart(1)} 你好坏呢${heart(1)} 哈啊呜${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的腰被抓住肆意侵犯着肛门。快感不断地侵袭着她的全身………`,
          );
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            await era.print('');
            await era.printAndWait(
              `「啊啊啊呜${heart(1)}…${sc()}…肛门被侵犯什么的…感觉太棒了啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `作为尻穴狂的${target_name}已经没有办法从这样的快感中挣脱了吧………`,
            );
          }
        } else {
          await era.printAndWait(
            `「${sc()}的屁股只要…只要有肉棒就会变得很开心呢${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}扭动着纤腰贪婪地将${player_name}的阴茎吞入尻穴………`,
          );
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            await era.print('');
            await era.printAndWait(
              `「呜啊哈啊${heart(1)} 哈啊啊啊啊${heart(1)} 屁股什么的好棒啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}在阴茎强烈的突进下浪叫起来………`,
            );
          }
        }
        // CFLAG:328  = 8（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 8;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.背后位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊…啊啊啊！太、太激烈了…太激烈了！啊啊啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}的悲鸣声不断响起，肛门已经习惯了这种抽插了吧………`,
        );
        // CFLAG:328  = 7（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 7;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背后位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「噢！我的屁股已经！　唔啊啊啊！　记住阴茎的形状了啦！」`,
          );
          await era.printAndWait(
            `${target_name}的肛门被侵犯发出了下贱的悲鸣………`,
          );
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            await era.print('');
            await era.printAndWait(
              `「已经…已经不行了…这淫荡的屁股${heart(1)}迫不及待了呢${heart(1)}」`,
            );
            await era.printAndWait(
              `作为尻穴狂的${target_name}半翻着白眼几乎要失去神智了………`,
            );
          }
        } else {
          await era.printAndWait(`「${sc()}的屁股…也能作为性器了吧♪」`);
          await era.printAndWait(
            `${target_name}已经完全变得柔软的肛门缠绕着${player_name}的肉棒，快感不断上升………`,
          );
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            await era.print('');
            await era.printAndWait(
              `「啊啊啊啊…淫荡的…${sc()}…已、已经要…要疯了啊啊啊………${heart(1)}」`,
            );
            await era.printAndWait(
              `作为尻穴狂的${target_name}半翻着白眼几乎要失去神智了………`,
            );
          }
        }
        // CFLAG:328  = 6（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 6;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.背后位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊…屁股…要坏掉了坏掉了啊！…呜啊！…哈呜…哈啊！啊啊啊！」`,
        );
        await era.printAndWait(
          `大概是${target_name}的菊穴还不太习惯的缘故，声音中带着一丝痛楚………`,
        );
        // CFLAG:328  = 5（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 5;
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背后位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊啊啊…别、别看啊…变态！ 呜哇！不要啊…住手啊啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}久经开发的肛门被${player_name}的肉棒插得肠液四溅。这大概就是所谓的口嫌体正直吧。`,
          );
          await era.printAndWait(
            `「啊啊啊…不、不要啦…这样的东西…啊啊…啊啊啊！」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊啊啊…呜…！只有变态…才会对屁股这么执着吧……啊啊哇啊啊啊！」`,
          );
          await era.printAndWait(
            `从后面被侵犯的${target_name}那久经开发的淫荡菊穴已经变得湿润了。`,
          );
          await era.printAndWait(
            `「啊啊…怎么会！屁股…变得奇怪了…要去了呜啊啊啊………！」`,
          );
        } else {
          await era.printAndWait(
            `「${scf()}、${sc()}…会有这样的感觉什么的…是假的吧…假的吧…啊啊啊啊呜！不要啊！哇啊唔啊啊！」`,
          );
          await era.printAndWait(
            `悲呼喊着的${target_name}的肛门显得有些窄小，这使${player_name}感到更加愉悦………`,
          );
        }
        // CFLAG:328  = 4（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 4;
      } else if (
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背后位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「什么啊…到、到这个程度…${sc()}…已经…已经…要去了！」`,
        );
        await era.printAndWait(
          `肛门被侵犯着的${target_name}那甘甜的呻吟与${player_name}的愉悦低吼交织在一起………`,
        );
        // CFLAG:328  = 3（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 3;
      } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「别、别动啊…呜…痛…很痛的！」`);
        await era.printAndWait(
          `${target_name}随着肛门内肉棒的抽送痛苦地咒骂着………`,
        );
        // CFLAG:328  = 2（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 28) {
    if (kojo.对面座位肛交 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(
          `「呜…啊呜…哈啊…肉棒…一整根都插进去了呢…呜呜哈啊…真、真是让人心情愉悦啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}带着淫荡的笑容，对肛门被侵犯这件事情感受到发自内心的愉悦………`,
        );
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(
          `「啊哈呜${heart(1)} 哇、哇啊…屁、屁股变得怪怪的啦…请、请抱紧我哦${heart(1)}」`,
        );
        await era.printAndWait(
          `${player_name}温柔地抱着${target_name}，体恤地慢慢开始了抽插………`,
        );
      } else {
        await era.printAndWait(`「住…住手…那是屁股啊…！喂…别、别凑上来啊！」`);
        await era.printAndWait(
          `${player_name}一把抱住想要逃开的${target_name}、腰部开始慢慢耸动起来………`,
        );
      }
      // CFLAG:TARGET:329  = 1（变量语义：CFLAG 族，TARGET:329）
      kojo.对面座位肛交 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.对面座位肛交 <= 7 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「呜…啊呜…哈啊…肉棒…一整根都进去了呢…呜呜哈啊…真、真是让人心情愉悦啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}带着淫荡的笑容，对肛门被侵犯这件事情感受到发自内心的开心………`,
          );
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            await era.print('');
            await era.printAndWait(
              `「啊啊啊呜…屁股什么的最棒了啊啊${heart(1)}…想、想要更多的精液呜哈哈${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}那淫荡的屁股似乎想要享受更多的${player_name}的精液………`,
            );
          }
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊啊…已、已经…屁眼已经快要忍不住了…呜、呜啊…好舒服啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}抱紧了${player_name}主动扭动着腰部迎合着抽插……`,
          );
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            await era.print('');
            await era.printAndWait(
              `「啊啊啊…${heart(1)}屁眼感觉好…好棒…很棒呢${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}紧紧抱住${player_name}的肩流着口水，犹自不满足地摆动着腰肢………`,
            );
          }
        } else {
          await era.printAndWait(
            `「呜…啊呜…哈啊…肉棒…一整根都进去了呢…呜呜哈啊…真、真是让人好开心啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}带着淫荡的笑容，对肛门被侵犯这件事情感受到发自内心的喜悦………`,
          );
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            await era.print('');
            await era.printAndWait(
              `「啊啊啊呜…屁股什么的最棒了啊啊${heart(1)}…想、想要更多的肉棒牛奶呜啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}那淫荡的屁股似乎想要享受更多的${player_name}的精液………`,
            );
          }
        }
        // CFLAG:329  = 8（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 8;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.对面座位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊呜…啊啊啊…大肉棒…全都插进去了…呜…有、有点点痛呢…呜」`,
        );
        await era.printAndWait(
          `${target_name}有些痛苦地皱着眉将${player_name}的阴茎引入自己的肛门………`,
        );
        // CFLAG:329  = 7（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 7;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.对面座位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「哈啊…啊啊…屁股被侵犯什么的…想多看一会儿呢${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被${player_name}抱在身上，扭动着腰………`,
          );
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            await era.print('');
            await era.printAndWait(
              `「啊啊啊啊…${heart(1)} 这样就够了吧…再、再来是不允许的啦${heart(3)}」`,
            );
            await era.printAndWait(
              `${target_name}在${player_name}勉强保持着姿态，强忍着高潮的欲望………`,
            );
          }
        } else {
          await era.printAndWait(
            `「呜…啊啊啊…哈啊哈啊…屁股…一边被侵犯…一边看着魔王大人的样子…唔啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `说着这样的话${target_name}伸出舌头与${player_name}纠缠起来………`,
          );
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            await era.print('');
            await era.printAndWait(
              `「哈…哈…呜…呜啊${heart(1)}…呜啊${heart(1)}…屁股…已、已经…要去了呜呜呜………${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}的话里带着无法压抑的愉悦与淫靡的气氛………`,
            );
          }
        }
        // CFLAG:329  = 6（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 6;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.对面座位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…请…慢一点啊…呜…哈啊哈啊…再温柔一些嘛……${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的肛门因为开发不足而感到有些痛苦………`,
        );
        // CFLAG:329  = 5（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 5;
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.对面座位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊啊…啊呜啊…哈啊…啊啊…啊啊啊…恶、恶心的感觉……明明…怎么会这样啊啊………！」`,
          );
          await era.printAndWait(
            `虽然流着泪但${target_name}久经调教的肛门似乎已经无法忍耐那如潮般的快感了………`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「哈啊…呜…不…不要…让我…呜嗯…看到你那恶心的脸………呜哇哇！」`,
          );
          await era.printAndWait(
            `${target_name}脸上那厌恶忍耐的表情在肛门被侵犯的时候已经坚持不下去了………`,
          );
        } else {
          await era.printAndWait(
            `「这份屈辱…该死…人渣…啊啊啊啊！我会…唔啊啊啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}在肛门被抽插的瞬间发出一声悲鸣，这使${player_name}更加兴奋了………`,
          );
        }
        // CFLAG:329  = 4（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 4;
      } else if (
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.对面座位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊啊啊…呜…呜啊…屁股…感觉在发热…！请、请就那样慢慢的………」`,
        );
        await era.printAndWait(
          `${player_name}把${target_name}抱在怀中侵犯着肛门………`,
        );
        // CFLAG:329  = 3（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 3;
      } else if (kojo.对面座位肛交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「不…不要…这肮脏的…滚、滚开…滚开啊…混蛋啊啊！」`,
        );
        await era.printAndWait(
          `${player_name}一把抱住想要逃开的${target_name}、腰部开始慢慢耸动起来………`,
        );
        // CFLAG:329  = 2（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 29) {
    if (kojo.背面座位肛交 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(
          `「啊啊啊…呜…被人从后面抱着…侵犯屁股小洞洞什么的………♪」`,
        );
        await era.printAndWait(
          `然后对${target_name}那充满弹性的肛门的侵犯就继续起来………`,
        );
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(`「哈啊…哈啊…真、真是的${heart(1)}」`);
        await era.printAndWait(
          `${target_name}的肛门被从后方贯穿，发出了可爱的悲鸣………`,
        );
      } else {
        await era.printAndWait(`「滚开…别、别过来！别再做强暴之类的事情了！」`);
        await era.printAndWait(`${target_name}因为肛门被侵犯悲伤的哭泣着………`);
      }
      // CFLAG:TARGET:330  = 1（变量语义：CFLAG 族，TARGET:330）
      kojo.背面座位肛交 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背面座位肛交 <= 7 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「呜哇…啊啊啊…啊啊…哈啊啊啊${heart(1)} 想要…想要屁眼被更狠地侵犯${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的屁股左右摇动着想要更多地品味${player_name}阴茎的味道………`,
          );
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            await era.print('');
            await era.printAndWait(
              `「啊啊啊啊…已经…${sc()}的屁眼要被玩坏掉了…啊啊啊啊啊啊！」`,
            );
            await era.printAndWait(
              `${target_name}的脑袋里已经只剩肛门那无与伦比的快感了，${player_name}的凌辱继续着………`,
            );
          }
        } else {
          await era.printAndWait(
            `「${scf()}、${sc()}…呜…啊啊啊…被这样地侵犯…变得舒服了呢…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的肛门紧紧纠缠着${player_name}的肉棒………`,
          );
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            await era.print('');
            await era.printAndWait(
              `「啊啊啊…已、已经…屁股已经忍不住了啊啊…${heart(1)} 呜哇哇哇…哇啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}那敏感的肛门只是因为简单地抽插几次就已经泛滥成灾………`,
            );
          }
        }
        // CFLAG:330  = 8（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 8;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.背面座位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊恩…呜…哈啊…啊啊啊啊啊…呜啊…………♪」`);
        await era.printAndWait(
          `${player_name}从后面侵犯着${target_name}那充满弹性的肛门………`,
        );
        // CFLAG:330  = 7（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 7;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背面座位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「哈啊…啊啊…啊啊啊…这、这还…远远不够嘛…从后面温柔地抱着我哦…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}久经调教的肛门淫荡的弛缓下来，阴茎充满快感地大力抽插着………`,
          );
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            await era.print('');
            await era.printAndWait(
              `「啊啊啊…啊哈…啊啊啊呜！那、那么激烈吗…！已、已经要不行了啊！」`,
            );
            await era.printAndWait(
              `${target_name}的腰被抓紧抬起狠狠击打着，充满快感地喊叫起来………`,
            );
          }
        } else {
          await era.printAndWait(
            `「啊啊啊…除此之外…胸部也可以玩弄呢…啊呜${heart(1)} 好、好棒${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的胸被从后面抓住，阴茎挤进了窄小的肛门抽动起来………`,
          );
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            await era.print('');
            await era.printAndWait(
              `「啊哇哇哇哇${heart(1)} 屁股…啊啊啊啊啊啊啊…要去了啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}不停地摆动着腰一边向${player_name}发出快乐的叫喊声………`,
            );
          }
        }
        // CFLAG:330  = 6（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 6;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.背面座位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呜啊…哈啊…虽然还是有点…无所谓啦………${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的肛门被从后方贯穿，发出了可爱的悲鸣………`,
        );
        // CFLAG:330  = 5（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 5;
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背面座位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「连、连胸部也不放过吗…别碰啊…变态狂！啊啊…啊呜恩！」`,
          );
          await era.printAndWait(
            `${target_name}的胸被手不断摩挲着，${player_name}对肛门的进犯还在继续………`,
          );
        } else {
          await era.printAndWait(
            `「给、给我…适可而止啊…混蛋！ 啊啊啊…这也太深了啊…！」`,
          );
          await era.printAndWait(
            `${target_name}被从后面抱住，${player_name}对肛门的进犯还在继续………`,
          );
        }
        // CFLAG:330  = 4（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 4;
      } else if (
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背面座位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊…屁股…呜嗯…变得…啊呜呜嗯…！啊啊啊啊啊………！」`,
        );
        await era.printAndWait(
          `${player_name}对${target_name}的悲鸣充耳不闻，继续侵犯着尻穴………`,
        );
        // CFLAG:330  = 3（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 3;
      } else if (kojo.背面座位肛交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「滚开…别、别过来！强暴什么的…不要啊！」`);
        await era.printAndWait(
          `${target_name}的胸被从后面抓住，因为肛门被侵犯而哭了起来………`,
        );
        // CFLAG:330  = 2（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 30) {
    if (kojo.手淫 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(
          `「要这样抚摸这根肉棒吗…呜呼…要是其他人要${sc()}做这种服务可是要收费的哟，不过魔王大人的话就无所谓啦…啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边出神地想着什么一边继续摩擦着${player_name}的阴茎………`,
        );
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(
          `「哈啊哈啊…魔王大人的肉棒居然有这么大呢…${heart(1)} ${scf()}、${sc()}…想要…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}垂涎欲滴地望着${player_name}的肉棒摩擦起来………`,
        );
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        await era.printAndWait(`「知道啦…难道魔族都离不开这种事吗…？」`);
        await era.printAndWait(`笑意暖暖的${target_name}温柔地摩挲着阴茎………`);
      } else {
        await era.printAndWait(
          `「居然用${scf()}、${sc()}的手来手淫吗…不、不可原谅！变态！去死啊！」`,
        );
        await era.printAndWait(`${target_name}一边说着一边笨拙地搓动着双手………`);
      }
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331）
      kojo.手淫 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.手淫 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「${sc()}来服侍魔王大人的肉棒吧${heart(1)} 不过，除了手以外，还想享受其他的服务吗～」`,
          );
          await era.printAndWait(
            `${target_name}粗重地喘息着，手丝毫不停地继续着淫靡地套动………`,
          );
        } else {
          await era.printAndWait(
            `「普通人的话可是要收钱的哟…魔王大人的话就请随意使用吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}舔了舔嘴唇，开始用手摩擦阴茎………`,
          );
        }
        // CFLAG:331  = 7（变量语义：CFLAG 族，331）
        kojo.手淫 = 7;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.手淫 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「这么大的一根肉棒…哈啊${sc()}想被它射满满一脸呢…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边出神地想着什么一边继续摩擦着${player_name}的阴茎………`,
        );
        // CFLAG:331  = 6（变量语义：CFLAG 族，331）
        kojo.手淫 = 6;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.手淫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「哈啊哈啊…肉棒…真是让人心情舒畅啊…啊啊啊…这样就有液体溜出来了吗…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}内心的渴望让她更加热情地对待阴茎………`,
          );
        } else {
          await era.printAndWait(
            `「啊啊啊…大肉棒…${sc()}想要…更加用心地服侍它呢………${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}带着陶醉的神情用手指继续套弄着阴茎………`,
          );
        }
        // CFLAG:331  = 5（变量语义：CFLAG 族，331）
        kojo.手淫 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.手淫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…肉棒…好热啊…手都要被烫伤了来着…啊啊啊…啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}垂涎欲滴地望着${player_name}的肉棒摩擦起来………`,
        );
        // CFLAG:331  = 4（变量语义：CFLAG 族，331）
        kojo.手淫 = 4;
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.手淫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「男人居然真的喜欢这样的事情啊………♪」`);
        await era.printAndWait(`笑意暖暖的${target_name}温柔地摩挲着阴茎………`);
        // CFLAG:331  = 3（变量语义：CFLAG 族，331）
        kojo.手淫 = 3;
      } else if (kojo.手淫 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「会、会喜欢这样的事情…该说不愧是变态的垃圾吗…！」`,
        );
        await era.printAndWait(
          `一边咒骂着，${target_name}继续笨拙地搓动着双手………`,
        );
        // CFLAG:331  = 2（变量语义：CFLAG 族，331）
        kojo.手淫 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 31) {
    if (kojo.口交_奴 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(
          `「哈啊哈啊…您的…您的肉棒…还真是…惊人啊…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}贪婪地吮吸着阴茎，心情十分舒畅………`,
        );
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(
          `「嗷嗷呜…用魔王大人的肉棒当做奶嘴…是最最高兴的事情啦……呜哈…哈啊…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}毫不犹豫地凑在${player_name}的阴茎上，出神地舔舐着………`,
        );
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        await era.printAndWait(
          `「真是的，男人的这活儿怎么这么…呜…大啊…呜…呜呜…真是的………」`,
        );
        await era.printAndWait(
          `${target_name}脸上有些吃惊的样子，用舌头拨动着阴茎………`,
        );
      } else {
        await era.printAndWait(
          `「唔啊啊…混蛋、怎么可能这么做…不行啊…呼…呜啊…」`,
        );
        await era.printAndWait(
          `${target_name}脸上全是嫌恶的表情，但还是不得不用舌头舔舐着${player_name}的阴茎………`,
        );
      }
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332）
      kojo.口交_奴 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.口交_奴 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「哈啊哈啊…您的…您的肉棒…还真是…惊人啊…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}那贪婪索求阴茎的样子，那淫靡诱惑的身姿是之前完全想象不到的。`,
          );
          await era.printAndWait(
            `「呜咕…噗呜…呜呜呜呼…肉棒什么的…${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊啊…${sc()}已经吃掉了这么多肉棒了吗…${sc()}还是想要这个呢…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}用心底能想到最完美的词赞美着${player_name}的阴茎并吸吮着。`,
          );
          await era.printAndWait(
            `粘糊糊的舌头紧紧包住阴茎，嘴巴捋动的频率越来越快………`,
          );
        } else {
          await era.printAndWait(
            `「一大半都…呜…呜呼…${heart(1)} 都已经…插进去了呢…${heart(1)}」`,
          );
          await era.printAndWait(
            `虽然这么说着但${target_name}似乎完全没有放开${player_name}阴茎的意思。`,
          );
          await era.printAndWait(
            `「呜咕…呜噜噜…还…呼…呼…还要更多…${heart(1)}」`,
          );
        }
        // CFLAG:332  = 6（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 6;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.口交_奴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「呜咕…哈呼呜呜…不…啊啊啊…不要…呜咕噜呼…不要停${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}喘息粗重地用口腔服侍着阴茎。`);
          await era.printAndWait(
            `「${sc()}…才没有这么喜欢大肉棒什么的…呜咕${heart(1)} 都是因为魔王的缘故才会这么做哦${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「肉棒呜啊…真是…呼恩…呜…${scf()}、${sc()}…已经，没有肉棒就活不下去了啊啊啊…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}像母狗一样闻着下体的味道喘着气，然后开始舔舐起来。`,
          );
          await era.printAndWait(
            `「呜啊呜啊…呜…这个味道…很诱人呢${heart(1)} 呜…咕噜…呼呼${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「呜啊…哈啊…${sc()}只有在对方是…魔王大人的肉棒的时候…才会这么做哦…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}吮吸着眼前这雄伟的肉棒变得十分兴奋。`,
          );
          await era.printAndWait(`「呜嗯…哈啊…我说…啊呜…呜…呜啊…${heart(1)}」`);
        }
        // CFLAG:332  = 5（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 5;
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呜啊……哈啊…哈啊…啊啊咕咕…竟然做这样的事情…不要给我机会啊…否则一定会把这丑陋的东西咬成几段的…呜啊！？`,
        );
        await era.printAndWait(
          `${player_name}的阴茎堵住${target_name}的喉咙让她动弹不得，然后下达了吮吸的命令………`,
        );
        // CFLAG:332  = 4（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 4;
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.口交_奴 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「${sc()}能得到这样的肉棒，真是幸福啊…呜…哇啊…呜呜呜…哈啊……♪」`,
        );
        await era.printAndWait(`${target_name}眯着眼睛用舌头和阴茎纠缠着………`);
        // CFLAG:332  = 3（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 3;
      } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「为什么这家伙这么硬啊……咕…呜啊…哈呜…呜………」`);
        await era.printAndWait(
          `${target_name}眼中含泪，勉强地用舌头清扫着${player_name}的阴茎………`,
        );
        // CFLAG:332  = 2（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 32) {
    if (kojo.乳交 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(
          `「${sc()}的乳房上…满满地都是魔王大人的痕迹呢${heart(1)}」`,
        );
        if (
          era.get(`talent:${target}:110`) ||
          0 ||
          era.get(`talent:${target}:114`) ||
          0 ||
          era.get(`talent:${target}:119`) ||
          0
        ) {
          await era.printAndWait(`「${sc()}的大咪咪能让你舒服吗？」`);
          await era.printAndWait(
            `${target_name}自傲地笑了，继续着对丰乳的爱抚………`,
          );
        }
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(`「啊哈哈，胸部很舒服呢…♪」`);
        if (
          era.get(`talent:${target}:110`) ||
          0 ||
          era.get(`talent:${target}:114`) ||
          0 ||
          era.get(`talent:${target}:119`) ||
          0
        ) {
          await era.printAndWait(`${target_name}带着得意的笑容继续着乳交。`);
          await era.printAndWait(
            `「哈啊…这个乳房，已经成为魔王大人的私有物了哦…${heart(1)}」`,
          );
        }
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        await era.printAndWait(
          `「哈啊…要我…做这样的事情吗………身体…开始发热了………」`,
        );
        if (
          era.get(`talent:${target}:110`) ||
          0 ||
          era.get(`talent:${target}:114`) ||
          0 ||
          era.get(`talent:${target}:119`) ||
          0
        ) {
          await era.printAndWait(
            `「${scf()}、${sc()}这自豪的胸部…啊啊啊………！」`,
          );
          await era.printAndWait(
            `${target_name}那丰满的乳房仍然被${player_name}的阴茎侵犯着………`,
          );
        }
      } else {
        await era.printAndWait(
          `「嘁…让${sc()}做这样羞耻的事情，总有一天要将你碎尸万段啊啊………！」`,
        );
      }
      // CFLAG:TARGET:333  = 1（变量语义：CFLAG 族，TARGET:333）
      kojo.乳交 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.口交_奴 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「${sc()}用胸部做这种事情…只有你能享用哦…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}粗重地喘息着，继续用那丰满的乳房服侍着………`,
          );
          if (
            era.get(`talent:${target}:110`) ||
            0 ||
            era.get(`talent:${target}:114`) ||
            0 ||
            era.get(`talent:${target}:119`) ||
            0
          ) {
            await era.printAndWait(
              `「呜啊…哈啊哈啊…${sc()}的乳房能够被…被这样做真是太好了…${heart(1)} 请把大肉棒全都塞进来吧${heart(1)}」`,
            );
            await era.printAndWait(
              `说着这样的话，${target_name}丰满的乳房中间${player_name}的阴茎正昂扬地埋在这里………`,
            );
          }
        } else {
          await era.printAndWait(
            `「呜…呼呼…哇啊啊…更…更舒服了啊啊…${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}窃笑着，继续用乳房服务起来………`);
          if (
            era.get(`talent:${target}:110`) ||
            0 ||
            era.get(`talent:${target}:114`) ||
            0 ||
            era.get(`talent:${target}:119`) ||
            0
          ) {
            await era.printAndWait(
              `「啊啊啊啊啊…胸部被侵犯的感觉…比所预料的还要好呢${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}丰满的胸部在${player_name}的阴茎前后突刺下变成了很下贱的样子………`,
            );
          }
        }
        // CFLAG:333  = 6（变量语义：CFLAG 族，333）
        kojo.乳交 = 6;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.口交_奴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…${sc()}的奶子，充满了您留下的痕迹呢…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}因为阴茎的味道兴奋得连呼吸都变得急促了………`,
        );
        if (
          era.get(`talent:${target}:110`) ||
          0 ||
          era.get(`talent:${target}:114`) ||
          0 ||
          era.get(`talent:${target}:119`) ||
          0
        ) {
          await era.printAndWait(
            `「${sc()}的大咪咪能让你舒服吗？ 啊哈哈…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}骄傲地笑着，继续用丰满的乳房服侍着阴茎………`,
          );
        }
        // CFLAG:333  = 5（变量语义：CFLAG 族，333）
        kojo.乳交 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.乳交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊…${sc()}的胸部就是为魔王大人而存在的啊………♪」`,
          );
          await era.printAndWait(
            `${target_name}非常陶醉地继续进行着胸部的服务………`,
          );
          if (
            era.get(`talent:${target}:110`) ||
            0 ||
            era.get(`talent:${target}:114`) ||
            0 ||
            era.get(`talent:${target}:119`) ||
            0
          ) {
            await era.printAndWait(
              `「哈啊哈啊…这硕大的胸部就是用来做这种事的呢…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}用丰满的乳房把${player_name}的阴茎包裹进去………`,
            );
          }
        } else {
          await era.printAndWait(
            `「哈啊啊…开始发热了${heart(1)} ${sc()}的胸部很舒服呢♪」`,
          );
          await era.printAndWait(
            `在${target_name}胸口肆意进出的${player_name}的阴茎差点就射精了………`,
          );
          if (
            era.get(`talent:${target}:110`) ||
            0 ||
            era.get(`talent:${target}:114`) ||
            0 ||
            era.get(`talent:${target}:119`) ||
            0
          ) {
            await era.printAndWait(
              `接着${target_name}带着得意的笑容继续着乳交。`,
            );
            await era.printAndWait(
              `「啊啊…${sc()}的乳房在…发情了呢${heart(1)}」`,
            );
          }
        }
        // CFLAG:333  = 4（变量语义：CFLAG 族，333）
        kojo.乳交 = 4;
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.乳交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈啊哈啊…这样就行了吗…呜啊……有点热♪」`);
        await era.printAndWait(
          `${target_name}用充满快感的胸部夹住${player_name}的阴茎。`,
        );
        if (
          era.get(`talent:${target}:110`) ||
          0 ||
          era.get(`talent:${target}:114`) ||
          0 ||
          era.get(`talent:${target}:119`) ||
          0
        ) {
          await era.printAndWait(`「${sc()}自豪的胸部…很舒服的吧………？」`);
          await era.printAndWait(`${target_name}用丰满的乳房拼命服侍着………`);
        }
        // CFLAG:333  = 3（变量语义：CFLAG 族，333）
        kojo.乳交 = 3;
      } else if (kojo.乳交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「别、别在我胸口磨蹭啊…啊…啊啊啊！」`);
        await era.printAndWait(
          `${target_name}因为胸口被胡乱抽插着而痛苦不已………`,
        );
        // CFLAG:333  = 2（变量语义：CFLAG 族，333）
        kojo.乳交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 33) {
    if (kojo.股间性交 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(
          `「哈啊啊…肉棒好烫呢…好想就这样插进来………${heart(1)}」`,
        );
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(
          `「肉、肉棒让人很舒服呢…${heart(1)} 呜…嗷嗷呜${heart(1)}」`,
        );
      } else {
        await era.printAndWait(`「这、这种事情简直比死掉还糟糕啊…呜…不要…」`);
      }
      // CFLAG:TARGET:334  = 1（变量语义：CFLAG 族，TARGET:334）
      kojo.股间性交 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`talent:${target}:0`) || 0) === 1 &&
        (kojo.股间性交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「这样吗…魔王大人的肉棒…这样插进来了…其实明明更想要…插到里面去呢${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边哭着，一边因为阴茎的热度而继续着处女的股间性交奉仕………`,
        );
        // CFLAG:334  = 6（变量语义：CFLAG 族，334）
        kojo.股间性交 = 6;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.股间性交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊啊…肉棒好烫呢…好想就这样插进来………${heart(1)}」`,
        );
        await era.printAndWait(
          `脸上浮现出淫荡的微笑，${target_name}愉快地享受着股间性交………`,
        );
        // CFLAG:334  = 5（变量语义：CFLAG 族，334）
        kojo.股间性交 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`talent:${target}:0`) || 0) === 1 &&
        (kojo.股间性交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「要、要做这样的事情啊…${sc()}…只、只要被魔王大人抱着就足够了！」`,
        );
        await era.printAndWait(
          `${target_name}露出差点就要哭的样子，继续着股间性交………`,
        );
        // CFLAG:334  = 4（变量语义：CFLAG 族，334）
        kojo.股间性交 = 4;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.股间性交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「肉、肉棒让人很舒服呢…${heart(1)} 呜…嗷嗷呜${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}满脸通红地回想着与${player_name}愉快的股间性交………`,
        );
        // CFLAG:334  = 3（变量语义：CFLAG 族，334）
        kojo.股间性交 = 3;
      } else if (kojo.股间性交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「呼，哼，下贱的虫子，居然想要把那东西放进${sc()}的那个地方吗………」`,
        );
        await era.printAndWait(`${target_name}脸红了，继续着股间性交………`);
        // CFLAG:334  = 2（变量语义：CFLAG 族，334）
        kojo.股间性交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 34) {
    if (kojo.骑乘位 === 0) {
      if ((era.get(`talent:${target}:0`) || 0) === 1) {
        if ((era.get(`talent:${target}:76`) || 0) === 1) {
          if ((era.get(`talent:${target}:314`) || 0) === 9) {
            await era.printAndWait(
              `「嘿、嘿嘿…魔王大人的巨型肉棒…把${sc()}的处女之身给吞噬了呢…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}不顾破处的痛楚摆动着腰品尝${player_name}阴茎的味道。`,
            );
            await era.printAndWait(
              `「呜啊呜呼…啊啊啊…${sc()}…魔王大人的肉棒真让人着迷…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}梦呓般嘟哝着，一边在${player_name}身上为了寻求快乐，激烈地摇动着纤腰………`,
            );
          } else {
            await era.printAndWait(
              `「啊啊啊啊…整、整个都进去了…魔王大人的阴茎…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}肩部因为愉悦而震动着，不管破处的痛苦只顾着把阴茎引入小穴的更深处。`,
            );
            await era.printAndWait(
              `「哈啊哈啊…${sc()}成为魔王大人的女人了…${heart(1)} 还…还可以更激烈一点…呜呜啊啊啊啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}一边发出这样的声音一边被${player_name}抓住腰更加用力的蹂躏着处女之身………`,
            );
          }
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          if ((era.get(`talent:${target}:314`) || 0) === 9) {
            await era.printAndWait(
              `「唔啊啊…哈啊啊呜…啊啊…${sc()}……${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}因为破瓜之痛的缘故背上的翅膀痉挛着舒张开来，气喘吁吁。`,
            );
            await era.printAndWait(
              `「轻、轻点…有点痛…呜！可以好好感受魔王大人华丽的肉棒了呢………♪」`,
            );
            await era.printAndWait(
              `${target_name}撒娇似的请求着${player_name}不要乱动，由${target_name}自己来控制动作的幅度………`,
            );
          } else {
            await era.printAndWait(
              `「${scf()}、${sc()}的那里…呜咕…哈啊哈啊…全部都被塞满了…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}的处女穴深处被${player_name}的阴茎连连刺探，剧烈地喘息着。`,
            );
            await era.printAndWait(
              `「哈啊哈啊…得到了${sc()}的处女之身的感觉怎样呢…啊、啊呼…啊啊啊啊！」`,
            );
            await era.printAndWait(
              `${player_name}腰部开始抽动起来，品尝着${target_name}处女小穴的滋味………`,
            );
          }
        } else {
          await era.printAndWait(
            `${target_name}的处女穴将${player_name}的阴茎紧紧夹住。`,
          );
          await era.printAndWait(
            `「啊啊啊啊…我、我的…我的处女之身就这样…${sc()}…啊啊啊啊！」`,
          );
          await era.printAndWait(
            `${player_name}提起腰部开始慢慢享受处女的芬芳肉穴………`,
          );
        }
      } else {
        if ((era.get(`talent:${target}:76`) || 0) === 1) {
          await era.printAndWait(
            `「啊呜…啊啊啊…就这样！更…更用力的干…${scf()}，${sc()}啊…${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}紧紧抓住${target_name}偏开的腰部狠狠将阴茎插入摩擦着阴道壁。`,
          );
          await era.printAndWait(
            `「就、就是这样${heart(1)}…好、好棒…魔王大人啊啊${heart(1)}」`,
          );
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          await era.printAndWait(`「啊啊…${sc()}的小穴里…满满的都是呢…♪」`);
          await era.printAndWait(
            `${target_name}扭动着自己的腰想要更多地享受${player_name}阴茎那美好的滋味。`,
          );
          await era.printAndWait(
            `「不用魔王大人动哦…${sc()}感觉好舒服呢…${heart(1)}」`,
          );
        } else {
          await era.printAndWait(`「要我自己…自己动吗…呜…哈啊哈啊…呜………」`);
          await era.printAndWait(
            `${target_name}对意外跨坐在你身上这件事感觉非常羞耻，只是敷衍着，并不肯配合你扭动腰部。`,
          );
          await era.printAndWait(
            `「哈呜！？住、住手啊！不、不能插进那里…哈啊啊呜呜呜！」`,
          );
        }
      }
      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335）
      kojo.骑乘位 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.骑乘位 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(4) === 0) {
          await era.printAndWait(
            `「啊呜…啊啊啊…就这样！更…更用力的干…${scf()}、${sc()}啊…${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}紧紧抓住${target_name}偏开的腰部狠狠将阴茎插入摩擦着阴道壁。`,
          );
          await era.printAndWait(
            `「就、就是这样${heart(1)}…好、好棒…魔王大人啊啊${heart(1)}」`,
          );
        } else if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊啊啊…呜…啊啊啊…还要…更…更粗暴的侵犯${sc()}吧…${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}兴奋地抓住${target_name}的腰用阴茎狠狠在阴道壁上磨擦着。`,
          );
          await era.printAndWait(
            `「呼…哈啊啊${heart(1)}唔啊啊${heart(1)}魔王的肉棒最粗了！超级肉棒！」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「动…继续动下去…${sc()}感觉很舒服呢…啊啊…啊啊啊啊…${sc()}这淫荡的腰技感觉如何？」`,
          );
          await era.printAndWait(
            `${target_name}淫乱的腰部舞动着，将阴茎引入小穴最深处。`,
          );
          await era.printAndWait(
            `「哈啊…啊啊啊啊…魔王大人只要躺着不动就好了…啊啊啊啊${heart(1)} 真、真是舒服呢${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「动、继续动下去…${sc()}感觉很舒服呢…啊啊…啊啊啊啊…${sc()}这淫荡的腰技感觉如何？」`,
          );
          await era.printAndWait(
            `${target_name}淫乱的腰部舞动着，将阴茎引入小穴深处上下耸动。`,
          );
          await era.printAndWait(
            `「哈呜…这深深的插入…魔王大人那力量十足的中出${heart(1)} 小穴里满满的好舒服${heart(1)}」`,
          );
        }
        // CFLAG:335  = 7（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 7;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.骑乘位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(4) === 0) {
          await era.printAndWait(
            `「啊啊…${sc()}的小穴里…满满的都是呢…♪ 呐，整根都进来了哟，看到了吗…？」`,
          );
          await era.printAndWait(
            `${target_name}扭动着自己的腰想要更多地享受${player_name}阴茎那美好的滋味。`,
          );
          await era.printAndWait(
            `「不用魔王大人动哦…${sc()}感觉好舒服呢…${heart(1)}」`,
          );
        } else if (rand_n(3) === 0) {
          await era.printAndWait(`「呜…啊啊啊…啊啊啊呜…啊呼呜${heart(1)}」`);
          await era.printAndWait(
            `${player_name}的阴茎顶得${target_name}不由得发出可爱的呻吟声，剧烈地喘息起来。`,
          );
          await era.printAndWait(
            `「请…请让${sc()}为您献上更舒服的服务…啊、啊啊呜${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「呜…啊啊啊…啊啊啊呜…啊呼呜${heart(1)}」`);
          await era.printAndWait(
            `${player_name}的阴茎顶得${target_name}不由得发出可爱的呻吟声，剧烈地喘息起来。`,
          );
          await era.printAndWait(
            `「${scf()}、${sc()}…已、已经要去了…去了…啊啊啊啊${heart(1)}…啊啊啊啊${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「哈啊啊…能够…被魔王大人的大肉棒垂青…${sc()}是多么的幸运…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}坐在${player_name}身上淫靡地扭动着腰肢。`,
          );
          await era.printAndWait(
            `「${sc()}已经快要爽上天了…啊啊啊啊啊…魔王大人不要动哦…${heart(1)}」`,
          );
        }
        // CFLAG:335  = 6（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 6;
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (kojo.骑乘位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「不、不怕我掐断你的脖子吗…呜啊啊啊！…住、住手…从下往上顶进来了啊…啊啊啊啊啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}的小穴被${player_name}的阴茎顶得快感连连。`,
          );
          await era.printAndWait(
            `跟随${target_name}的意志软化下来的小穴很快包裹住了${player_name}的阴茎，带来了非常愉悦的享受………`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「哈啊…哈啊…呜…！哈、住手、你这渣滓…啊啊…不要呜呜♪」`,
          );
          await era.printAndWait(
            `可${target_name}那久经调教的小穴，只能给男人深入的阴茎带来快乐吧。`,
          );
          await era.printAndWait(
            `「啊啊啊…呜…不要…${scf()}，${sc()}感觉…感觉好糟糕…哈呜…啊啊啊啊！！」`,
          );
          await era.printAndWait(
            `因为屈辱而哭泣喘息着的${target_name}被${player_name}深深地插进了紧窄的小穴………`,
          );
        } else {
          await era.printAndWait(
            `${target_name}的小穴已经被阴茎狠狠侵犯着。即使意志再坚强也无法阻止快感在她体内源源不断的产生。`,
          );
          await era.printAndWait(
            `「呜…哈…哈啊…！总有一天…总有一天我一定会…杀了你…杀了你啊啊啊啊！不、不要不要不要啊啊啊！」`,
          );
          await era.printAndWait(
            `下体不由自主配合着的${target_name}虽然还怀有强烈的反抗心，却情不自禁地发出快乐的呻吟………`,
          );
        }
        // CFLAG:335  = 5（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 5;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (kojo.骑乘位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「呜…啊啊啊…啊呜！啊啊…哈啊…${sc()}…的声音…呜…哈啊呜♪」`,
          );
          await era.printAndWait(
            `${target_name}的小穴被${player_name}的阴茎一刺到底。`,
          );
          await era.printAndWait(
            `主动扭动起腰部的${target_name}露出愉悦的痴态承受着${player_name}阴茎的抽插………`,
          );
        } else {
          await era.printAndWait(`「啊啊…啊啊啊…顶、顶进去了…不要…啊啊啊呜♪」`);
          await era.printAndWait(
            `想要逃开的${target_name}被${player_name}双手紧紧抓住，毫不留情地用肉棒责罚着小穴。`,
          );
          await era.printAndWait(
            `${target_name}久经调教的小穴十分柔软地包裹住${player_name}的阴茎，带来了相当程度的快感………`,
          );
        }
        // CFLAG:335  = 4（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.骑乘位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…这种事情会满足你那肮脏的欲望吗…？ 啊啊…啊啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}摆动着自己的腰部，这使${player_name}感到更加愉悦………`,
        );
        // CFLAG:335  = 3（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 3;
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「啊啊啊…呜…反、反正你快点射精就行了…啊啊啊啊！？把我的腰放开…啊啊啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}敷衍似的摇动着腰部，却被${player_name}抓住腰狠狠地上下摆动摩擦着阴茎………`,
        );
        // CFLAG:335  = 2（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 35) {
    if (kojo.全身擦洗 === 0) {
      if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        await era.printAndWait(`「呼…呼…热得有些兴奋了呢………」`);
        await era.printAndWait(
          `作为第一次全身擦洗，${target_name}的手在${player_name}身体上笨拙地滑动着………`,
        );
      } else {
        await era.printAndWait(
          `「为什么要${sc()}做这种事………啊、不好，手滑了！」`,
        );
        await era.printAndWait(
          `作为第一次全身擦洗，${target_name}的手在${player_name}身体上笨拙地滑动着………`,
        );
      }
      // CFLAG:TARGET:336  = 1（变量语义：CFLAG 族，TARGET:336）
      kojo.全身擦洗 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.全身擦洗 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊${heart(1)} 啊啊啊${heart(1)} ${sc()}的擦洗做得很舒服吧，所以射精什么的可还不行哦${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边笑着一边在${player_name}泡在水里的小兄弟上摩擦着。`,
        );
        await era.printAndWait(
          `「呜…啊呜…啊啊啊…${sc()}也觉得很舒服呢…${heart(1)}」`,
        );
        // CFLAG:336  = 6（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 6;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.全身擦洗 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「${sc()}全身上下的美丽都被你看光了呢…啊啊啊啊♪ 看，连这种地方都显得很漂亮吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}灵活的身体滑动在${player_name}身上仔细擦洗着。`,
        );
        await era.printAndWait(
          `${player_name}的脚被轻轻抱住，脚趾的前端被含进嘴里………`,
        );
        // CFLAG:336  = 5（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 5;
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (kojo.全身擦洗 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「${sc()}才不会在你这种垃圾面前展露身体啊…呜…别碰奇怪的地方！…呜啊啊啊！」`,
        );
        await era.printAndWait(
          `${player_name}非常耐心地对待着${target_name}，像毛巾一样“使用”她的身体………`,
        );
        // CFLAG:336  = 4（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 4;
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.全身擦洗 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呜…哈…啊啊呜…哈啊哈啊…难得的洗澡时间呢…啊啊啊呜」`,
        );
        await era.printAndWait(
          `虽然这么说着${target_name}还是取来肥皂一边发出诱人的声音一边仔细擦洗着身体………`,
        );
        // CFLAG:336  = 3（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 3;
      } else if (kojo.全身擦洗 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「呼…哈啊…哈啊…呜呜呜…真是屈辱…${sc()}是不会给你洗的…哈呜…别碰我啊！」`,
        );
        await era.printAndWait(
          `${target_name}流着眼泪开始用自己的身体擦拭着${player_name}的身体………`,
        );
        // CFLAG:336  = 2（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 36) {
    if (kojo.骑乘位肛交 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        if ((era.get(`abl:${target}:3`) || 0) >= 3) {
          await era.printAndWait(
            `「呜呼…哇啊呜…！ ${scf()}、${sc()}…请随意享用我的身体吧${heart(1)}…啊啊啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}舔了舔嘴唇开始扭动腰部享受这快乐………`,
          );
        } else {
          await era.printAndWait(
            `「呜…啊啊啊…厉害的肉棒…啊啊啊呜…屁股要坏掉了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}放低自己的腰部，将${player_name}的阴茎根部吞入久经开发的肛门………`,
          );
        }
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        if ((era.get(`abl:${target}:3`) || 0) >= 3) {
          await era.printAndWait(
            `「啊啊呜…啊…看啊…${sc()}的屁股…魔王大人的整根肉棒都插进去了…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}炫耀似的展开双腿上下摇动着身体感受肛门的触觉………`,
          );
        } else {
          await era.printAndWait(
            `「呜…啊啊…别、别那么粗暴…啊啊…啊啊啊啊…不、不要全都插进去…呜哈啊！」`,
          );
          await era.printAndWait(
            `${player_name}抓住${target_name}的腰把阴茎顶在肛门上，强行插了进去………`,
          );
        }
      } else {
        if ((era.get(`abl:${target}:3`) || 0) >= 3) {
          await era.printAndWait(
            `「啊啊啊…哈啊…呜呼…全都进去了…哈呜…别、别动啊……啊啊啊啊呜♪」`,
          );
          await era.printAndWait(
            `${target_name}未经开发的尻穴艰难地将${player_name}的阴茎吞入，紧紧夹住………`,
          );
        } else {
          await era.printAndWait(`「居然要我，做这样的事情…嘁…呜…呜哇…！」`);
          await era.printAndWait(
            `${player_name}抓住${target_name}的腰把阴茎顶在肛门上，强行插了进去………`,
          );
        }
      }
      // CFLAG:TARGET:337  = 1（变量语义：CFLAG 族，TARGET:337）
      kojo.骑乘位肛交 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.骑乘位肛交 <= 7 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「呜呼…哇啊呜…！ ${scf()}、${sc()}…随你怎样都可以啦${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}舔了舔嘴唇开始扭动腰部享受这快乐………`,
          );
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            await era.printAndWait(
              `「已、已经…已经要高潮了啊啊…啊啊啊…屁股坏掉了${heart(1)}」`,
            );
          }
        } else {
          await era.printAndWait(
            `${target_name}的尻穴紧紧纠缠着肉棒使之快感十足。`,
          );
          await era.printAndWait(
            `「啊啊啊…啊啊啊…就是这个样子…${sc()}…还想要更激烈的冲击${heart(1)}」`,
          );
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            await era.printAndWait(
              `「啊啊啊啊…真是强壮啊…${sc()}的屁股已经变得很糟糕了呢${heart(1)}」`,
            );
          }
        }
        // CFLAG:337  = 8（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 8;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.骑乘位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呜…啊啊啊…厉害的肉棒…啊啊啊呜…屁股要坏掉了${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}放低自己的腰部，将${player_name}的阴茎整根吞入久经开发的尻穴………`,
        );
        await era.printAndWait(
          `「呜哈${heart(1)} 肉棒…全都吞进去了哦…${heart(1)}」`,
        );
        // CFLAG:337  = 7（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 7;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.骑乘位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊呜…啊…看啊…${sc()}的屁股…魔王大人的整根肉棒都插进去了…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}炫耀似的展开双腿上下摇动着身体感受肛门的触觉。`,
          );
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            await era.printAndWait(
              `「呜哈…哈啊啊啊啊${heart(1)} 屁股已经把肉棒“吃掉”了${heart(1)}」`,
            );
          }
        } else {
          await era.printAndWait(
            `「屁股…呜啊${heart(1)}…哇啊啊啊…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}主动摆动腰部迎合，开心地品尝着这滋味。`,
          );
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            await era.printAndWait(
              `「呜啊啊啊…哈啊…屁股${heart(1)} 快融化啦${heart(1)}」`,
            );
          }
        }
        // CFLAG:337  = 6（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 6;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.骑乘位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呜…啊啊…别、别那么粗暴…啊啊…啊啊啊啊…不、不要全都插进去…呜哈啊！」`,
        );
        await era.printAndWait(
          `${player_name}抓住${target_name}的腰把阴茎顶在肛门上，强行插了进去………`,
        );
        // CFLAG:337  = 5（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 5;
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `${target_name}咬紧牙关带着屈辱的表情摇动着腰。`,
          );
          await era.printAndWait(
            `「哈啊…呜…啊啊啊…${sc()}的屁股…会让你这种废物舒服吗…唔啊啊！」`,
          );
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            await era.printAndWait(
              `但${player_name}腰部的耸动让面带厌恶的${target_name}发出了愉悦淫靡的呻吟声。`,
            );
            await era.printAndWait(
              `「怎么会！？啊、哈啊、怎么…停下来…这种恶心的呜呜呜呜啊啊啊♪ 呜…哈啊啊…呜…啊啊啊」`,
            );
            await era.printAndWait(
              `坐在${player_name}身上的${target_name}尽管充满了反抗的欲望，但那开发过的身体传来的快感让她不由自主地迎合索求浪叫着………`,
            );
          }
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「${scf()}、${sc()}的身体…啊啊…啊呜啊…哇啊啊…怎么会用来取悦…你这样的人渣…啊啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}不由自主地扭动腰部，屁股忠实地为${player_name}服务着。`,
          );
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            await era.printAndWait(
              `${target_name}痛骂的声音越来越大，可她的腰肢也越来越柔软无力。`,
            );
            await era.printAndWait(
              `「如同深渊臭虫的男人！这、这样的肉棒…${sc()}…啊啊啊去死吧去死吧去死啊！」`,
            );
            await era.printAndWait(
              `「…啊呜…呜啊啊啊！？…死啊…去死吧…啊…啊啊啊…啊啊啊啊啊…别插了我要去了啊啊啊！」`,
            );
          }
        } else {
          await era.printAndWait(
            `${target_name}柔软而久经调教的尻穴被${player_name}的阴茎狠狠侵犯着，发出悲鸣。`,
          );
          await era.printAndWait(
            `「啊哈…呜…呜啊…渣滓…住、住手…恶心的家伙…${scf()}、${sc()}…已经…呜啊啊啊！」`,
          );
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            await era.printAndWait(
              `随着抽插${target_name}嘴中开始溢出淫靡的呻吟。`,
            );
            await era.printAndWait(
              `「啊啊啊…啊啊…呜哇…哈呜…不、不要…住手…啊、啊啊屁股变得奇怪了！」`,
            );
          }
        }
        // CFLAG:337  = 4（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 4;
      } else if (
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊…哈呜…呜…啊…继续…就这样动……啊呜♪…呜呼………」`,
        );
        await era.printAndWait(
          `${target_name}久经开发的尻穴轻易将${player_name}的阴茎吞入，轻松地说笑着纠缠起来………`,
        );
        // CFLAG:337  = 3（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 3;
      } else if (kojo.骑乘位肛交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「让我做这样的事…什么嘛…啊呜…搞什么鬼啊…哈啊啊啊…！」`,
        );
        await era.printAndWait(
          `${player_name}抓住${target_name}的腰把阴茎顶在肛门上，强行插了进去………`,
        );
        // CFLAG:337  = 2（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 37) {
    if (kojo.肛门侍奉 === 0) {
      if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        await era.printAndWait(`「啊啊…哈啊…呜呜咕噜…呜哈啊…呜咕………」`);
        await era.printAndWait(`${target_name}眼中含泪，顺从地继续着服务………`);
      } else {
        await era.printAndWait(
          `「诶…怎么…怎么对我做这样的事情…呜…停、停下…别贴着我啊…啊呜呜呜！？」`,
        );
        await era.printAndWait(`${target_name}眼中含泪，无奈地继续着服务………`);
      }
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338）
      kojo.肛门侍奉 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊呜…魔王大人的菊花呢${heart(1)}」`);
        await era.printAndWait(
          `${target_name}带着淫猥的笑容细心地舔舐着肛门上每一条褶皱的纹路………`,
        );
        // CFLAG:338  = 5（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「魔王大人的肛门…真是…诱人呢…${heart(1)}」`);
        await era.print(
          `${target_name}带着陶醉表情的舔舐使${player_name}肛门放松下来………`,
        );
        // CFLAG:338  = 4（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「喂！舔你这种肮脏的混蛋的屁股什么的…太…太可怕了…绝对…绝不可能…呜哈啊啊…呜咕咕」`,
        );
        await era.printAndWait(`${target_name}眼中含泪，粗暴地继续着服务………`);
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊…呜啊…呜呜呜哈啊…啊呜…哈啊…啊啊啊啊………」`,
        );
        await era.printAndWait(`${target_name}流着泪用嘴巴服务着………`);
        // CFLAG:338  = 3（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 3;
      } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「诶…怎么…怎么对我做这样的事情…呜…停、停下…别贴着我啊…啊呜呜呜！？」`,
        );
        await era.printAndWait(`${target_name}眼中含泪，无奈地继续着服务………`);
        // CFLAG:338  = 2（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 40) {
    if (kojo.打屁股 === 0) {
      await era.printAndWait(`「住、住手…别打了…！」`);
      // CFLAG:TARGET:341  = 1（变量语义：CFLAG 族，TARGET:341）
      kojo.打屁股 = 1;
      return 0;
    } else {
      if (view.chara.特别服装类型 === 11 && view.train.着衣状态 & 64) {
        return 0;
      }

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.打屁股 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈啊♪　请继续！　更严酷地惩罚${sc()}吧！」`);
        await era.printAndWait(
          `${target_name}边被打边发出娇弱的呻吟，很明显可以发现她的下体已经一片春情………`,
        );
        // CFLAG:TARGET:341  = 6（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 6;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.打屁股 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「对不起！　对不起！　对……呜呜呜呜♪」`);
        await era.printAndWait(
          `${target_name}被拍打着屁股的同时，呻吟声越来越淫靡艳丽………`,
        );
        // CFLAG:TARGET:341  = 5（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 5;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (kojo.打屁股 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呜啊！喂！畜生！这样打我的屁股…啊啊啊！你这暴力的蛆虫！」`,
        );
        await era.printAndWait(
          `${player_name}将${target_name}跪放在自己的膝盖上打着屁股，尽情地发泄着欲望………`,
        );
        // CFLAG:TARGET:341  = 4（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 4;
      } else if (
        (era.get(`mark:${target}:0`) || 0) === 3 &&
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.打屁股 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哇啊啊…再、再也不会反抗你啦…好痛……好痛啊！～！」`,
        );
        await era.printAndWait(
          `${target_name}老实地被${player_name}击打着屁股，像是一只小狗一样………`,
        );
        // CFLAG:TARGET:341  = 3（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 3;
      } else if (kojo.打屁股 <= 1 && game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「呜…哈啊…为什么…对我做这种像管教孩子一样的事情啊…哈呜！」`,
        );
        await era.printAndWait(
          `${player_name}拍打着${target_name}的屁股使她发出惨叫………`,
        );
        // CFLAG:TARGET:341  = 2（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 41) {
    if (kojo.鞭 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(
          `「啊啊啊…舞着鞭子像对待母猪一样对待${sc()}吧${heart(1)}」`,
        );
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(
          `「啊啊…${sc()}是…是坏孩子…所以…才会被鞭打吧…${heart(1)}」`,
        );
      } else {
        await era.printAndWait(`「住…住手…很痛的啊混蛋！」`);
      }
      // CFLAG:TARGET:342  = 1（变量语义：CFLAG 族，TARGET:342）
      kojo.鞭 = 1;
      return 0;
    } else {
      if (view.chara.特别服装类型 === 11 && view.train.着衣状态 & 64) {
        return 0;
      }

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.鞭 <= 9 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈诶♪	啊啊啊♪　${sc()}我是一碰到鞭子就兴奋的变态母猪奴隶♪　嘎啊♪」`,
        );
        await era.printAndWait(
          `${target_name}在鞭下十分兴奋，像是发情的母猪一样浪叫着。`,
        );
        await era.printAndWait(
          `落在伤痕累累屁股上的鞭打使${target_name}发出了越来越大的呻吟………`,
        );
        // CFLAG:TARGET:342  = 10（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 10;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.鞭 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊啊啊啊！　还想要更多！　请您惩罚，下贱的肉奴隶吧！」`,
        );
        await era.printAndWait(
          `${target_name}在鞭下十分兴奋，红肿的屁股四下摇摆着索求着什么………`,
        );
        // CFLAG:TARGET:342  = 9（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 9;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.鞭 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊呜…啊啊啊…${sc()}是魔王大人养的猪猡……哈哇啊啊啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}细嫩肌肤暴露在在鞭下，高亢的惨叫使${player_name}十分愉悦………`,
        );
        // CFLAG:TARGET:342  = 8（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 8;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.鞭 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「对不起！　对不起！　${sc()}是头下贱的母猪！　所以请惩罚我吧♪」`,
        );
        await era.printAndWait(
          `${target_name}脸部因为兴奋而扭曲，双脚磨蹭着，在${player_name}鞭下喜悦的承受着………`,
        );
        // CFLAG:TARGET:342  = 7（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 7;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.鞭 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「对不起！对不起…呜哈啊♪」`);
        await era.printAndWait(
          `${target_name}的娇声呻吟中${player_name}继续着鞭打………`,
        );
        // CFLAG:TARGET:342  = 6（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 6;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.鞭 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「${scf()}、${sc()}…难道做错了什么吗…啊啊！」`);
        await era.printAndWait(
          `${target_name}细嫩的肌肤被鞭子打击着发出高亢的惨叫………`,
        );
        // CFLAG:TARGET:342  = 5（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 5;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (kojo.打屁股 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呜…哈啊！…你这个变态冷血的施虐狂！对你来说女人就像是不用在乎的牲畜一样的东西吗……啊！…哈啊…呜呜呜啊啊啊！」`,
        );
        await era.printAndWait(
          `鞭打持续着、作为对${target_name}这样强烈反抗心的一种回应，调教更加激烈地进行着………`,
        );
        // CFLAG:TARGET:342  = 4（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 4;
      } else if (
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.鞭 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呜…啊啊…啊哈…这已经算是…呜…很残酷的事情了吧…啊啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}被鞭打的时候夹杂着一点愉悦的叫声………`,
        );
        // CFLAG:TARGET:342  = 3（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 3;
      } else if (kojo.鞭 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「停，停下…居然对${sc()}做出这样的事情…哈…啊呜呜呜！」`,
        );
        await era.printAndWait(
          `${target_name}嘴里的嘟哝被听到了，所以鞭子的击打持续着………`,
        );
        // CFLAG:TARGET:342  = 2（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 42) {
    if (kojo.针 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(
          `「啊哈呜！啊啊啊…像淫乱的母猪一样的${sc()}越痛越想被主人狠狠的操弄啊…${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}几次被针刺中，到处都在流血………`);
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(
          `「啊啊啊…对不起，对不起呜呜…是${sc()}做了什么坏事的惩罚吗！」`,
        );
        await era.printAndWait(`${target_name}几次被针刺中，到处都在流血………`);
      } else {
        await era.printAndWait(
          `「啊喂！…用那样的针在${sc()}身上…可怕啊！住手你这人渣…！」`,
        );
        await era.printAndWait(`${target_name}几次被针刺中，到处都在流血………`);
      }
      // CFLAG:TARGET:343  = 1（变量语义：CFLAG 族，TARGET:343）
      kojo.针 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.针 <= 9 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊…啊${heart(1)}…哈啊啊…那里…那里终于…有了一点带痛的快感了呢…啊啊呜${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}柔软的肌肤被针几次刺中，反而愉悦得浪叫连连…………`,
        );
        // CFLAG:TARGET:343  = 10（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 10;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.针 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊呜呜…呜哈啊啊…老实说还可以刺的…更深一点哦」`,
        );
        await era.printAndWait(
          `${target_name}柔软的肌肤被针几次刺中，反而兴奋得浪叫连连………`,
        );
        // CFLAG:TARGET:343  = 9（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 9;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.针 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊哈呜！啊啊啊…像淫乱的母猪一样的${sc()}越痛越想被主人狠狠的操弄啊…${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}几次被针刺中，到处都在流血………`);
        // CFLAG:TARGET:343  = 8（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 8;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.针 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…更冷酷地处罚${sc()}吧…乳头…或者小穴…都可以用针刺啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}似乎已经习惯了被刺的痛苦，想要挑战更敏感的地方………`,
        );
        // CFLAG:TARGET:343  = 7（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 7;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.针 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…啊啊呜…快…快来更用力地刺我吧…${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}眼神空洞地催促着………`);
        // CFLAG:TARGET:343  = 6（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 6;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.针 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…对不起，对不起呜呜…是${sc()}做了什么坏事的惩罚吗！」`,
        );
        await era.printAndWait(`${target_name}几次被针刺中，到处都在流血………`);
        // CFLAG:TARGET:343  = 5（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 5;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (kojo.针 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「你这…变态的施虐狂！…呜…哇啊！…怎么能…怎么能这样…哇啊啊啊！」`,
        );
        await era.printAndWait(
          `${player_name}在如同五月苍蝇般叫嚷着的${target_name}的乳头刺下一针，又拿起了新的针具………`,
        );
        // CFLAG:TARGET:343  = 4（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 4;
      } else if (
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.针 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊…啊啊…那样的针…快扎在${sc()}的身体上吧…等不及了啊！」`,
        );
        await era.printAndWait(`${target_name}被针几次刺中发出可爱的惨叫声………`);
        // CFLAG:TARGET:343  = 3（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 3;
      } else if (kojo.针 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「啊喂！…用那样的针在${sc()}身上…可怕啊！住手你这人渣…！」`,
        );
        await era.printAndWait(`${target_name}几次被针刺中，到处都在流血………`);
        // CFLAG:TARGET:343  = 2（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 43 && era.get(`tequip:${target}:43`)) {
    if (kojo.眼罩 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(
          `「哈啊哈啊…就是这样，对${sc()}做些乱七八糟的事情吧………${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}老实地等待着………`);
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(`「看不到魔王大人的脸的话会很困恼诶………」`);
        await era.printAndWait(`${target_name}噘着嘴唇老实地戴上了眼罩………`);
      } else {
        await era.printAndWait(`「住…住手…这之后…打算做更过分的事情吧…！」`);
        await era.printAndWait(
          `${target_name}摇着头但还是被粗暴地戴上了眼罩………`,
        );
      }
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344）
      kojo.眼罩 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.眼罩 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…就是这样，对${sc()}做些乱七八糟的事情吧………${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}老实地等待着………`);
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 9;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.眼罩 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…就是这样，对${sc()}做些乱七八糟的事情吧………${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}老实地等待着………`);
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 8;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.眼罩 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…就是这样，对${sc()}做些乱七八糟的事情吧………${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}老实地等待着………`);
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 7;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.眼罩 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊…有点忐忑呢………${heart(1)}」`);
        await era.printAndWait(`${target_name}期待地伸出舌头等待着………`);
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 6;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.眼罩 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊…有点忐忑呢………${heart(1)}」`);
        await era.printAndWait(`${target_name}期待地伸出舌头等待着………`);
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.眼罩 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「看不到魔王大人的脸的话会很困恼诶………」`);
        await era.printAndWait(`${target_name}噘着嘴唇老实地戴上了眼罩………`);
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 4;
      } else if (
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.眼罩 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「要做什么奇怪的事情吗………啊啊………」`);
        await era.printAndWait(
          `${target_name}只是轻微地抵抗了一下就老实地戴上了眼罩………`,
        );
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 3;
      } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「住…住手…这之后…打算做更过分的事情吧…！」`);
        await era.printAndWait(
          `${target_name}摇着头但还是被粗暴地戴上了眼罩………`,
        );
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 2;
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 43 &&
    era.get(`tequip:${target}:43`) === 0
  ) {
    if (
      (era.get(`talent:${target}:76`) || 0) === 1 &&
      (kojo.眼罩着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「这样就取下来了吗………？」`);
      // CFLAG:380  = 3（变量语义：CFLAG 族，380）
      kojo.眼罩着脱 = 3;
    } else if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (kojo.眼罩着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「哈啊哈啊………」`);
      // CFLAG:380  = 2（变量语义：CFLAG 族，380）
      kojo.眼罩着脱 = 2;
    } else if (kojo.眼罩着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「总算取下来了………」`);
      // CFLAG:380  = 1（变量语义：CFLAG 族，380）
      kojo.眼罩着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 44 && era.get(`tequip:${target}:44`)) {
    if (kojo.绳子 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(
          `「啊啊呜…这种被紧紧绑住的痛苦…小穴都湿了呢…${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}美丽的肌肤被绳子勒得通红………`);
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(`「哈啊哈啊…啊啊啊…感觉很兴奋呢…${heart(1)}」`);
        await era.printAndWait(`${target_name}美丽的肌肤被绳子勒得通红………`);
      } else {
        await era.printAndWait(`「喂！住手…停手啊！这样也太粗暴了！」`);
        await era.printAndWait(`${target_name}被绳子绑了个严严实实………`);
      }
      // CFLAG:TARGET:345  = 1（变量语义：CFLAG 族，TARGET:345）
      kojo.绳子 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.绳子 <= 9 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…要高潮了啊啊…还可以更紧一点…把${sc()}绑紧…${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}美丽的肌肤被绳子勒得通红………`);
        // CFLAG:TARGET:345  = 10（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 10;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.绳子 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…居然、居然高潮了…在这样的束缚下…${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}美丽的肌肤被绳子勒得通红………`);
        // CFLAG:TARGET:345  = 9（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 9;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.绳子 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊呜…这种被紧紧绑住的痛苦…小穴都湿了呢…${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}美丽的肌肤被绳子勒得通红………`);
        // CFLAG:TARGET:345  = 8（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 8;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.绳子 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…只有被绳子绑住的时候才会高潮………${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}美丽的肌肤被绳子勒得通红………`);
        // CFLAG:TARGET:345  = 7（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 7;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.绳子 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊啊…绑得更紧一点………${heart(1)}」`);
        await era.printAndWait(`${target_name}美丽的肌肤被绳子勒得通红………`);
        // CFLAG:TARGET:345  = 6（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 6;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.绳子 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈啊哈啊…啊啊啊…感觉很兴奋呢…${heart(1)}」`);
        await era.printAndWait(`${target_name}美丽的肌肤被绳子勒得通红………`);
        // CFLAG:TARGET:345  = 5（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 5;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`mark:${target}:3`) || 0) >= 2 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (kojo.绳子 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「住…住手…对${sc()}做这样的事情…住手啊！绳子、陷进去了！很痛诶！」`,
        );
        await era.printAndWait(
          `${target_name}被${player_name}粗暴地制住，用绳子紧紧绑着………`,
        );
        // CFLAG:TARGET:345  = 4（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 4;
      } else if (
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.绳子 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊…绳子陷进皮肤了…啊啊！」`);
        await era.printAndWait(
          `${target_name}被束缚住的时候意外的老实、呼吸粗重………`,
        );
        // CFLAG:TARGET:345  = 3（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 3;
      } else if (kojo.绳子 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「喂！住手…停手啊！这样也太粗暴了！」`);
        await era.printAndWait(`${target_name}被绳子绑了个严严实实………`);
        // CFLAG:TARGET:345  = 2（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 2;
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 44 &&
    era.get(`tequip:${target}:44`) === 0
  ) {
    if (
      (era.get(`talent:${target}:76`) || 0) === 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊啊呜…被绑着什么的真是太棒了………」`);
      // CFLAG:385  = 2（变量语义：CFLAG 族，385）
      kojo.绳子着脱 = 2;
    } else if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊啊…身上的痕迹很明显呢…${heart(1)}」`);
      // CFLAG:385  = 2（变量语义：CFLAG 族，385）
      kojo.绳子着脱 = 2;
    } else if (kojo.绳子着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「哈啊哈啊…终于…解开了……」`);
      // CFLAG:385  = 1（变量语义：CFLAG 族，385）
      kojo.绳子着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 45 && era.get(`tequip:${target}:45`)) {
    if (kojo.口塞 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(`「呜呼…呜啊…呜啊${heart(1)}」`);
        // 同一行输出：无后缀 PRINTFORM 不换行，末行
        // PRINTL 才收行；ELSE 支是同一行的另一支。前缀提到语句外
        // 共用——ELSE 那条语句只列本支，前缀留在里面会多出一段
        // 不属于本支的插值记号（#621）
        const mouth_front_3953 = `配合地戴上口塞的${target_name}带着期待`;
        const blindfold_3954 = era.get(`tequip:${target}:43`);
        if (blindfold_3954) {
          await era.print(`配合地戴上口塞的${target_name}带着期待地晃动着………`);
        } else {
          await era.print(mouth_front_3953 + `${player_name}………`);
        }
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(`「呜咕…呜…呼啊…${heart(1)}」`);
        // 同型（ELSE 支）
        const mouth_front_3962 = `配合地戴上口塞的${target_name}带着温柔的眼神`;
        const blindfold_3963 = era.get(`tequip:${target}:43`);
        if (blindfold_3963) {
          await era.print(
            `配合地戴上口塞的${target_name}带着温柔的眼神晃动着………`,
          );
        } else {
          await era.print(mouth_front_3962 + `看着${player_name}………`);
        }
      } else {
        await era.printAndWait(`「啊、这、这样吗…嘴里…呜…呜咕噜…………」`);
        // 同型（ELSE 支）
        const mouth_front_3971 = `戴上口塞的${target_name}`;
        const blindfold_3972 = era.get(`tequip:${target}:43`);
        if (blindfold_3972) {
          await era.print(`戴上口塞的${target_name}左右摇着头………`);
        } else {
          await era.print(mouth_front_3971 + `瞪着你………`);
        }
      }
      // CFLAG:TARGET:346  = 1（变量语义：CFLAG 族，TARGET:346）
      kojo.口塞 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.口塞 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呼啊…呜啊…呜啊${heart(1)}」`);
        // 同型（ELSE 支）
        const mouth_front_3985 = `配合地戴上口塞的${target_name}粗重急促地喘息`;
        const blindfold_3986 = era.get(`tequip:${target}:43`);
        if (blindfold_3986) {
          await era.print(`配合地戴上口塞的${target_name}粗重急促地喘息着………`);
        } else {
          await era.print(mouth_front_3985 + `着，眼中闪耀着畅快淋漓的神色………`);
        }
        // CFLAG:TARGET:346  = 9（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 9;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.口塞 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呜呼…呜啊…呜啊${heart(1)}」`);
        await era.printAndWait(
          `配合地戴上口塞的${target_name}粗重急促地喘息着………`,
        );
        // CFLAG:TARGET:346  = 8（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 8;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.口塞 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呜呼…呜啊…呜啊${heart(1)}」`);
        // 同型（ELSE 支）
        const mouth_front_4000 = `配合地戴上口塞的${target_name}带着期待`;
        const blindfold_4001 = era.get(`tequip:${target}:43`);
        if (blindfold_4001) {
          await era.print(`配合地戴上口塞的${target_name}带着期待地晃动着………`);
        } else {
          await era.print(mouth_front_4000 + `看着${player_name}………`);
        }
        // CFLAG:TARGET:346  = 7（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 7;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.口塞 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呜呼…呜…呜啊…${heart(1)}」`);
        await era.printAndWait(
          `配合地戴上口塞的${target_name}两腿摩擦着，露出放荡的神情………`,
        );
        // CFLAG:TARGET:346  = 6（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 6;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.口塞 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈啊…呜…呜啊…${heart(1)}」`);
        await era.printAndWait(`配合地戴上口塞的${target_name}两腿摩擦着………`);
        // CFLAG:TARGET:346  = 5（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.口塞 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呜咕…呜…呜啊…${heart(1)}」`);
        await era.printAndWait(
          `配合地戴上口塞的${target_name}用温柔的眼神凝视着${player_name}………`,
        );
        // CFLAG:TARGET:346  = 4（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 4;
      } else if (
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.口塞 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呜啊…哈…哈………」`);
        // 同型（ELSE 支）
        const mouth_front_4025 = `${target_name}习以为常地被口塞塞住嘴`;
        const blindfold_4026 = era.get(`tequip:${target}:43`);
        if (blindfold_4026) {
          await era.print(`${target_name}习以为常地被口塞塞住嘴眼色朦胧………`);
        } else {
          await era.print(mouth_front_4025 + `看着${player_name}………`);
        }
        // CFLAG:TARGET:346  = 3（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 3;
      } else if (kojo.口塞 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊、这、这样吗…嘴里…呜…呜咕噜…………」`);
        // 同型（ELSE 支）
        const mouth_front_4035 = `戴上口塞的${target_name}`;
        const blindfold_4036 = era.get(`tequip:${target}:43`);
        if (blindfold_4036) {
          await era.print(`戴上口塞的${target_name}左右摇着头………`);
        } else {
          await era.print(mouth_front_4035 + `瞪着你………`);
        }
        // CFLAG:TARGET:346  = 2（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 2;
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 45 &&
    era.get(`tequip:${target}:45`) === 0
  ) {
    if (
      (era.get(`talent:${target}:76`) || 0) === 1 &&
      (kojo.口塞着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「呜啊…哈啊哈啊…」`);
      // CFLAG:386  = 3（变量语义：CFLAG 族，386）
      kojo.口塞着脱 = 3;
    } else if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (kojo.口塞着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「呜啊…哈啊哈啊…」`);
      // CFLAG:386  = 2（变量语义：CFLAG 族，386）
      kojo.口塞着脱 = 2;
    } else if (kojo.口塞着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「呜啊…哈啊哈啊…呼诶………」`);
      // CFLAG:386  = 1（变量语义：CFLAG 族，386）
      kojo.口塞着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 46 && era.get(`tequip:${target}:46`)) {
    if (kojo.灌肠肛塞 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(`「诶…哎呀…这样的话就全部都………！」`);
        await era.printAndWait(
          `或许是灌肠液浓度稍高的缘故，${target_name}捂着肚子痛苦地呻吟着………`,
        );
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(
          `「${scf()}…${sc()}…又没有便秘什么的…呜呜哈啊…肚子好难受！」`,
        );
        await era.printAndWait(
          `或许是灌肠液浓度稍高的缘故，${target_name}捂着肚子痛苦地呻吟着………`,
        );
      } else {
        await era.printAndWait(`「哇啊啊！啊啊…热…肚子里好热…呜啊啊啊啊！」`);
        await era.printAndWait(
          `或许是灌肠液浓度稍高的缘故，${target_name}捂着肚子痛苦地呻吟着………`,
        );
      }
      // CFLAG:TARGET:347  = 1（变量语义：CFLAG 族，TARGET:347）
      kojo.灌肠肛塞 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.灌肠肛塞 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊啊…在这样的情况下被人从前面干的话…会有多舒服呢…啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `渗透进肠内的灌肠液不断刺激着${target_name}的肚子。${target_name}的屁股扭动着仿佛在向${player_name}求索什么………`,
        );
        // CFLAG:347  = 8（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 8;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.灌肠肛塞 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「诶…哎呀…这样的话就全部都………！」`);
        await era.printAndWait(
          `或许是灌肠液浓度稍高的缘故，${target_name}捂着肚子痛苦地呻吟着………`,
        );
        // CFLAG:347  = 7（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 7;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.灌肠肛塞 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊啊啊…想、想要做爱…已经…无法忍受了…哈啊…想被狠狠插进来………${heart(1)}」`,
        );
        await era.printAndWait(
          `渗透进肠内的灌肠液不断刺激着${target_name}的肚子。${target_name}的屁股扭动着仿佛在向${player_name}求索什么………`,
        );
        // CFLAG:347  = 6（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 6;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.灌肠肛塞 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「${scf()}…${sc()}…又没有便秘什么的…呜呜哈啊…肚子好难受！」`,
        );
        await era.printAndWait(
          `或许是灌肠液浓度稍高的缘故，${target_name}捂着肚子痛苦地呻吟着………`,
        );
        // CFLAG:347  = 5（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 5;
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (kojo.灌肠肛塞 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊啊…呜…哈啊…好痛…哇呜呜呜啊…好痛啊啊啊啊！」`,
        );
        await era.printAndWait(
          `由于灌肠液的浓度已经到了极限，${target_name}脸色铁青万分痛苦地痛叫起来………`,
        );
        // CFLAG:347  = 4（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 4;
      } else if (
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.灌肠肛塞 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊啊啊…肚子…咕噜噜噜地响了…啊啊啊♪」`);
        await era.printAndWait(
          `渗透进肠内的灌肠液不断刺激着${target_name}的肚子………`,
        );
        // CFLAG:347  = 3（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 3;
      } else if (kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「哇啊啊！啊啊…热…肚子里好热…呜啊啊啊啊！」`);
        await era.printAndWait(
          `或许是灌肠液浓度稍高的缘故，${target_name}捂着肚子痛苦地呻吟着………`,
        );
        // CFLAG:347  = 2（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom === 46) {
    if (
      (era.get(`talent:${target}:76`) || 0) === 1 &&
      (era.get(`abl:${target}:3`) || 0) >= 3 &&
      (era.get(`abl:${target}:21`) || 0) >= 3 &&
      (kojo.灌肠肛塞 <= 7 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「出，出来了啊啊${heart(1)}　别，别看了……脏东西要喷出来了啊……${heart(1)}　啊゛啊゛啊゛啊゛啊啊……${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}和言语相反的，一脸恍惚地喷溅着脏污………`,
      );
      // CFLAG:347  = 8（变量语义：CFLAG 族，347）
      kojo.灌肠肛塞 = 8;
    } else if (
      (era.get(`talent:${target}:76`) || 0) === 1 &&
      (kojo.灌肠肛塞 <= 6 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「别，别看啊啊！　脏东西要喷出来了啊啊啊！！」`);
      await era.printAndWait(
        `${target_name}香汗淋漓地惊声尖叫着，似乎再也忍不住地喷出了排泄物………`,
      );
      // CFLAG:347  = 7（变量语义：CFLAG 族，347）
      kojo.灌肠肛塞 = 7;
    } else if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (era.get(`abl:${target}:3`) || 0) >= 3 &&
      (era.get(`abl:${target}:21`) || 0) >= 3 &&
      (kojo.灌肠肛塞 <= 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「出，出来了………${heart(1)}　${sc()}…是这么肮脏的女人对不起……${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}和言语相反的，一脸恍惚地喷溅着脏污………`,
      );
      // CFLAG:347  = 6（变量语义：CFLAG 族，347）
      kojo.灌肠肛塞 = 6;
    } else if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (kojo.灌肠肛塞 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「别，别看啊啊啊！　肮脏的${sc()}…要被轻蔑了啊……」`,
      );
      await era.printAndWait(
        `${target_name}香汗淋漓地惊声尖叫着，似乎再也忍不住地喷出了排泄物………`,
      );
      // CFLAG:347  = 5（变量语义：CFLAG 族，347）
      kojo.灌肠肛塞 = 5;
    } else if (
      (era.get(`mark:${target}:2`) || 0) >= 2 &&
      (era.get(`mark:${target}:3`) || 0) === 3 &&
      (era.get(`talent:${target}:85`) || 0) === 0 &&
      (era.get(`talent:${target}:76`) || 0) === 0 &&
      (kojo.灌肠肛塞 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「别开玩笑了……这样的恶行……绝对不会忘掉的……不行了啊啊啊啊！！！」`,
      );
      await era.printAndWait(
        `${target_name}带着愤怒的表情眼中泛着泪光，夸张地将脏污排泄了出来………`,
      );
      // CFLAG:347  = 4（变量语义：CFLAG 族，347）
      kojo.灌肠肛塞 = 4;
    } else if (
      (era.get(`abl:${target}:3`) || 0) >= 3 &&
      (era.get(`abl:${target}:21`) || 0) >= 3 &&
      (kojo.灌肠肛塞 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「明明不可以的……因为排泄脏污而有快感怎么可以呢……♪」`,
      );
      await era.printAndWait(
        `${target_name}和言语相反的，一脸恍惚地喷溅着脏污………`,
      );
      // CFLAG:347  = 3（变量语义：CFLAG 族，347）
      kojo.灌肠肛塞 = 3;
    } else if (kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「别看啊……不要啊啊啊啊！」`);
      await era.printAndWait(`${target_name}一脸苍白地喷溅着脏污………`);
      // CFLAG:347  = 2（变量语义：CFLAG 族，347）
      kojo.灌肠肛塞 = 2;
    }
    return 0;
  }

  if (era_flag.selectcom === 55) {
    if (kojo.放置PLAY === 0) {
      if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(`「啊啊啊…想要做…更多…${heart(1)}」`);
        await era.printAndWait(`${target_name}有些不甘寂寞的样子………`);
      } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(`「想…想做爱…哈啊${heart(1)}」`);
        await era.printAndWait(`${target_name}的欲望溢于言表………`);
      } else {
        await era.printAndWait(`「有…有什么奇怪的打算吗」`);
        await era.printAndWait(`${target_name}对你询问道………`);
      }
      await era.print('');

      if (era.get(`tequip:${target}:11`)) {
        await era.printAndWait(
          `${target_name}小穴里蠕虫蠢动，毫不怜惜地冲击着。`,
        );
      }

      if (era.get(`tequip:${target}:13`)) {
        await era.printAndWait(
          `${target_name}菊花里肛门虫蠢动，毫不怜惜地冲击着。`,
        );
      }

      if (era.get(`tequip:${target}:19`)) {
        await era.printAndWait(`${target_name}后庭被插进肛珠，微微张开着。`);
      }

      if (era.get(`tequip:${target}:14`)) {
        await era.printAndWait(
          `${target_name}被装上电动阴蒂夹，阴蒂被不断刺激着。`,
        );
      }

      if (era.get(`tequip:${target}:15`)) {
        await era.printAndWait(
          `${target_name}被装上乳头夹，乳头被不断刺激着。`,
        );
      }

      if (era.get(`tequip:${target}:16`)) {
        await era.print(`${target_name}胸部被安上榨乳器，开始榨出乳汁。`);
      }

      if (era.get(`tequip:${target}:17`)) {
        await era.printAndWait(
          `${target_name}的阴茎上套着飞机杯，快要射精的样子。`,
        );
      }

      if (era.get(`tequip:${target}:43`)) {
        await era.printAndWait(`${target_name}被装上了眼罩。`);
      }

      if (era.get(`tequip:${target}:44`)) {
        await era.printAndWait(`${target_name}的身体被绳子束缚着。`);
      }

      if (era.get(`tequip:${target}:46`)) {
        await era.printAndWait(
          `${target_name}的腹部因为灌肠的原因发出尴尬的声音，一取下肛塞就排泄出大量浊物。`,
        );
      }

      if (era.get(`tequip:${target}:49`)) {
        await era.printAndWait(
          `${target_name}的肛门插着电极，每次轻微的电流流过都会使肛门括约肌猛地收缩。`,
        );
      }

      if (era.get(`tequip:${target}:53`)) {
        await era.printAndWait(
          `然后，${target_name}的身姿从头到尾被录制了进去………`,
        );
      }
      // CFLAG:356  = 1（变量语义：CFLAG 族，356）
      kojo.放置PLAY = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        era.get(`palam:${target}:5`) >= PALAMLV[3] &&
        (kojo.放置PLAY <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「想…想做爱…哈啊${heart(1)}」`);
        await era.printAndWait(`${target_name}的欲望溢于言表………`);
        // CFLAG:356  = 7（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 7;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.放置PLAY <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈啊…这是一种另类的挑逗吗…${heart(1)}」`);
        await era.printAndWait(`${target_name}眼泛春光，淫荡地呻吟起来………`);
        // CFLAG:356  = 6（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 6;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        era.get(`palam:${target}:5`) >= PALAMLV[3] &&
        (kojo.放置PLAY <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊啊…想要做…更多…${heart(1)}」`);
        await era.printAndWait(`${target_name}有些不甘寂寞的样子………`);
        // CFLAG:356  = 5（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.放置PLAY <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「${scf()}、${sc()}…不准突然袭击哟………0」`);
        await era.printAndWait(`${target_name}眯起眼睛，看着${player_name}………`);
        // CFLAG:356  = 4（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 4;
      } else if (
        era.get(`palam:${target}:5`) >= PALAMLV[3] &&
        (kojo.放置PLAY <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈啊哈啊…向你屈服…这种事情…是不可能的………」`);
        await era.printAndWait(`${target_name}对你说道………`);
        // CFLAG:356  = 3（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 3;
      } else if (kojo.放置PLAY <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「有…有什么奇怪的打算吗」`);
        await era.printAndWait(`${target_name}对你询问道………`);
        // CFLAG:356  = 2（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 2;
      }
      await era.print('');

      if (era.get(`tequip:${target}:11`)) {
        await era.printAndWait(
          `${target_name}小穴里蠕虫蠢动，毫不怜惜地冲击着。`,
        );
      }

      if (era.get(`tequip:${target}:13`)) {
        await era.printAndWait(
          `${target_name}菊花里肛门虫蠢动，毫不怜惜地冲击着。`,
        );
      }

      if (era.get(`tequip:${target}:19`)) {
        await era.printAndWait(`${target_name}后庭被插进肛珠，微微张开着。`);
      }

      if (era.get(`tequip:${target}:14`)) {
        await era.printAndWait(
          `${target_name}被装上电动阴蒂夹，阴蒂被不断刺激着。`,
        );
      }

      if (era.get(`tequip:${target}:15`)) {
        await era.printAndWait(
          `${target_name}被装上乳头夹，乳头被不断刺激着。`,
        );
      }

      if (era.get(`tequip:${target}:16`)) {
        await era.print(`${target_name}胸部被安上榨乳器，开始榨出乳汁。`);
      }

      if (era.get(`tequip:${target}:17`)) {
        await era.printAndWait(
          `${target_name}的阴茎上套着飞机杯，快要射精的样子。`,
        );
      }

      if (era.get(`tequip:${target}:43`)) {
        await era.printAndWait(`${target_name}被装上了眼罩。`);
      }

      if (era.get(`tequip:${target}:44`)) {
        await era.printAndWait(`${target_name}的身体被绳子束缚着。`);
      }

      if (era.get(`tequip:${target}:46`)) {
        await era.printAndWait(
          `${target_name}的腹部因为灌肠的原因发出尴尬的声音，一取下肛塞就排泄出大量浊物。`,
        );
      }

      if (era.get(`tequip:${target}:49`)) {
        await era.printAndWait(
          `${target_name}的肛门插着电极，每次轻微的电流流过都会使肛门括约肌猛地收缩。`,
        );
      }

      if (era.get(`tequip:${target}:53`)) {
        await era.printAndWait(
          `然后，${target_name}的身姿从头到尾被录制了进去………`,
        );
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 56) {
    if (kojo.交谈 === 0) {
      if (era.get(`tequip:${target}:53`) === 1) {
        await era.print(`${player_name}催促${target_name}进行自我介绍，`);
        if (
          rand_n(3) === 0 &&
          (era.get(`talent:${target}:89`) ||
            0 ||
            (era.get(`abl:${target}:17`) || 0) >= 5)
        ) {
          // 同一行输出：无后缀 PRINTFORM 连续不换行，末行
          // PRINTFORML 才收行；SIF ABL:31 >= 3 的条件片段提到语句外
          // 取值（#621）
          const dirty_exp = (era.get(`abl:${target}:31`) || 0) >= 3;
          await era.print(
            `面带微笑的${target_name}介绍了自己的本名和性经验` +
              (dirty_exp ? `，甚至还有手淫的时候想到的内容` : '') +
              `……`,
          );
          await era.print(
            `对于这个发往故乡的水晶球的某种幻想使她双腿之间泛滥成灾……`,
          );
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
          await era.printAndWait(
            `${target_name}向水晶球展现出自己那诱人的小穴，两足大张。`,
          );
          await era.printAndWait(`「你好啊，见到你很高兴♪」`);
          await era.printAndWait(
            `「今后那个高傲的${target_name}酱会舍弃自己的自尊变成摇着屁股求干的贱货哟♪」`,
          );
          await era.printAndWait(
            `「请大家一起见证${sc()}这淫荡下贱的样子吧～♪」`,
          );
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          await era.printAndWait(`${target_name}有些兴奋地聊了起来。`);
          await era.printAndWait(`「你好啊，这里是${target_name}♪」`);
          await era.printAndWait(
            `「曾经高傲的${sc()}，现在每天都在和魔王大人做爱呢♪」`,
          );
          await era.printAndWait(`「那么请好好看做爱的过程吧~♪」`);
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) ||
            0 ||
            (era.get(`abl:${target}:11`) || 0) >= 5)
        ) {
          await era.print(`${target_name}对着水晶球说起淫猥的话语。`);
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`talent:${target}:85`) ||
          0 ||
          (era.get(`abl:${target}:10`) || 0) >= 3 ||
          (era.get(`abl:${target}:11`) || 0) >= 4 ||
          (era.get(`abl:${target}:17`) || 0) >= 2
        ) {
          await era.print(`${target_name}对着水晶球开始介绍自己。`);
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else {
          await era.printAndWait(`${target_name}侧过脸去，沉默不语。`);
        }
      } else {
        // 起是一整行：无后缀 PRINTFORM 不换行，各支的 PRINTL/W 才收行。
        // 前缀提到语句外共用——除了第一条合成的语句，各支自己
        // 的语句只列本支，前缀留在里面会多出一段不属于本支的插值记号（#621）
        const talk_front_4342 = `在和${player_name}`;
        if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:85`) ||
            0 ||
            (era.get(`abl:${target}:10`) || 0) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(
            `在和${player_name}会话的过程中，${target_name}呢喃着充满爱意的话语。`,
          );
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) ||
            0 ||
            (era.get(`abl:${target}:11`) || 0) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(
            talk_front_4342 +
              `会话的过程中，${target_name}扭动着腰叫嚷着淫猥的话语。`,
          );
        } else if (
          (era.get(`palam:${target}:4`) >= PALAMLV[4] ||
            (era.get(`abl:${target}:10`) || 0) >= 5 ||
            era.get(`talent:${target}:85`) ||
            0 ||
            era.get(`talent:${target}:76`) ||
            0) &&
          era.get(`palam:${target}:5`) >= PALAMLV[4]
        ) {
          // 也同属一行：三条无后缀 PRINT 连续不换行，
          // 的 PRINTFORML 才收行；两档语调的条件提到语句外取值（#621）
          const excited_4349 =
            era.get(`tequip:${target}:11`) ||
            era.get(`tequip:${target}:13`) ||
            era.get(`tequip:${target}:14`) ||
            era.get(`tequip:${target}:15`) ||
            era.get(`tequip:${target}:16`) ||
            era.get(`tequip:${target}:17`);
          const painful_4351 =
            era.get(`tequip:${target}:44`) || era.get(`tequip:${target}:49`);
          await era.print(
            talk_front_4342 +
              `会话的过程中，${target_name}` +
              (excited_4349
                ? `带着快乐的语调`
                : painful_4351
                  ? `带着痛苦的语调`
                  : '') +
              `拼命地回应着。`,
          );
        } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
          await era.print(
            talk_front_4342 +
              `会话的过程中，${target_name}一副想要做爱胜过说话的样子。`,
          );
          await era.printAndWait(`「想要…想要肉棒嘛…${heart(1)}」`);
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[4] ||
          era.get(`talent:${target}:85`) ||
          0 ||
          (era.get(`abl:${target}:10`) || 0) >= 5
        ) {
          await era.print(
            talk_front_4342 +
              `会话的过程中，${target_name}交谈还算融洽的样子。`,
          );
          await era.printAndWait(`「啊，还有这种事啊？…是这样吗………」`);
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[2] ||
          (era.get(`abl:${target}:10`) || 0) >= 3
        ) {
          await era.print(
            talk_front_4342 +
              `会话的过程中，${target_name}时不时会给出一些回应。`,
          );
          await era.printAndWait(`「嗯、嗯…这样啊………」`);
        } else {
          await era.print(
            talk_front_4342 + `会话的过程中，${target_name}一副心不在焉的样子…`,
          );
        }
      }
      // CFLAG:357  = 1（变量语义：CFLAG 族，357）
      kojo.交谈 = 1;
      return 0;
    } else {
      if (era.get(`tequip:${target}:53`) === 1) {
        await era.print(`${player_name}催促${target_name}进行自我介绍，`);
        if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:85`) ||
            0 ||
            (era.get(`abl:${target}:10`) || 0) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(`${target_name}扭着腰对水晶球说出了充满爱意的话语`);
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) ||
            0 ||
            (era.get(`abl:${target}:11`) || 0) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(`${target_name}扭着腰对水晶球叫嚷着淫猥的话语`);
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (
          rand_n(3) === 0 &&
          (era.get(`talent:${target}:89`) ||
            0 ||
            (era.get(`abl:${target}:17`) || 0) >= 5)
        ) {
          // 同型：三条无后缀 PRINTFORM/PRINT 连续不换行，末行
          // PRINTFORML 才收行；SIF ABL:31 >= 3 的条件片段（#621）
          const dirty_exp_4384 = (era.get(`abl:${target}:31`) || 0) >= 3;
          await era.print(
            `${target_name}面带微笑地介绍了自己的本名和性经验` +
              (dirty_exp_4384 ? `，甚至还有手淫的时候想到的内容` : '') +
              `……`,
          );
          await era.print(
            `对于这个发往故乡的水晶球的某种幻想使她双腿之间泛滥成灾……`,
          );
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
          await era.printAndWait(
            `${target_name}向水晶球展现出自己那诱人的小穴。`,
          );
          await era.printAndWait(`「你好啊，见到你很高兴♪」`);
          await era.printAndWait(
            `「今后那个高傲的${target_name}酱会舍弃自己的自尊变成摇着屁股求干的贱货哟♪」`,
          );
          await era.printAndWait(
            `「请大家一起见证${sc()}这淫荡下贱的样子吧～♪」`,
          );
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          await era.printAndWait(`${target_name}有些兴奋地聊了起来。`);
          await era.printAndWait(`「你好啊，这里是${target_name}♪」`);
          await era.printAndWait(
            `「曾经高傲的${sc()}，现在每天都在和魔王大人做爱呢♪」`,
          );
          await era.printAndWait(`「那么请好好看做爱的过程吧~♪」`);
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) ||
            0 ||
            (era.get(`abl:${target}:11`) || 0) >= 5)
        ) {
          await era.print(`${target_name}对着水晶球说起淫猥的话语`);
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`talent:${target}:85`) ||
          0 ||
          (era.get(`abl:${target}:10`) || 0) >= 3 ||
          (era.get(`abl:${target}:11`) || 0) >= 4 ||
          (era.get(`abl:${target}:17`) || 0) >= 2
        ) {
          await era.print(`${target_name}对着水晶球开始介绍自己`);
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else {
          await era.printAndWait(`${target_name}侧过脸去，沉默不语`);
        }
      } else {
        // 起是一整行，同一行：前缀提到语句外共用（#621）
        const talk_front_4414 = `在和${player_name}`;
        if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:85`) ||
            0 ||
            (era.get(`abl:${target}:10`) || 0) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(
            `在和${player_name}会话的过程中，${target_name}呢喃着充满爱意的话语`,
          );
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) ||
            0 ||
            (era.get(`abl:${target}:11`) || 0) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(
            talk_front_4414 +
              `会话的过程中，${target_name}扭动着腰叫嚷着淫猥的话语`,
          );
        } else if (
          (era.get(`palam:${target}:4`) >= PALAMLV[4] ||
            (era.get(`abl:${target}:10`) || 0) >= 5 ||
            era.get(`talent:${target}:85`) ||
            0 ||
            era.get(`talent:${target}:76`) ||
            0) &&
          era.get(`palam:${target}:5`) >= PALAMLV[4]
        ) {
          // 也同属一行；两档语调的条件提到语句外取值（#621）
          const excited_4421 =
            era.get(`tequip:${target}:11`) ||
            era.get(`tequip:${target}:13`) ||
            era.get(`tequip:${target}:14`) ||
            era.get(`tequip:${target}:15`) ||
            era.get(`tequip:${target}:16`) ||
            era.get(`tequip:${target}:17`);
          const painful_4423 =
            era.get(`tequip:${target}:44`) || era.get(`tequip:${target}:49`);
          await era.print(
            talk_front_4414 +
              `会话的过程中，${target_name}` +
              (excited_4421
                ? `带着快乐的语调`
                : painful_4423
                  ? `带着痛苦的语调`
                  : '') +
              `拼命地回应着。`,
          );
        } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
          await era.print(
            talk_front_4414 +
              `会话的过程中，${target_name}露出一副想要做爱胜过说话的样子。`,
          );
          await era.printAndWait(`「想要…想要肉棒…${heart(1)}」`);
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[4] ||
          era.get(`talent:${target}:85`) ||
          0 ||
          (era.get(`abl:${target}:10`) || 0) >= 5
        ) {
          await era.print(
            talk_front_4414 +
              `会话的过程中，与${target_name}的交谈还算融洽的样子。`,
          );
          await era.printAndWait(`「啊，还有这种事啊？…是这样吗………」`);
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[2] ||
          (era.get(`abl:${target}:10`) || 0) >= 3
        ) {
          await era.print(
            talk_front_4414 +
              `会话的过程中，${target_name}时不时会给出一些回应`,
          );
          await era.printAndWait(`「嗯、嗯…这样啊………」`);
        } else {
          await era.print(
            talk_front_4414 + `会话的过程中，${target_name}只是认真地听着…`,
          );
        }
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 123) {
    if (kojo.乳夹口交 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(
          `「哈啊哈啊…很热呢…这仿佛在燃烧着的肉棒…${heart(1)}」`,
        );
        if (era.get(`talent:${target}:109`) || 0) {
          await era.printAndWait(
            `「啊啊…${sc()}的乳房虽然很小…但服务可不差哦…咕噜咕噜…哈啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}十分兴奋，用那平薄的胸部摩擦着阴茎的一端………`,
          );
        } else if (era.get(`talent:${target}:110`) || 0) {
          await era.printAndWait(
            `「${sc()}的胸部很舒服的吧…啊哈哈…这大家伙都已经这么硬了呢…哈呜…咕噜咕噜…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}十分兴奋，把阴茎夹在一对巨乳间进行着口交。`,
          );
        } else if (era.get(`talent:${target}:114`) || 0) {
          await era.printAndWait(
            `「啊哈哈哈…${sc()}这傲人的胸部能让你很舒服吧…${heart(1)} 呜咕噜…哈呼…呜呜${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}十分兴奋，把阴茎埋在一双豪乳间进行着口交………`,
          );
        } else {
          await era.printAndWait(
            `「呃呃…嘻嘻～${heart(1)} 这样子侍奉着阴茎…${sc()}已经忍不住了啦～${heart(1)} 唔喔…唔唔～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}十分兴奋，把阴茎夹在胸间进行着口交………`,
          );
        }
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(`「肉棒…啊啊…已经在发热了呢……${heart(1)}」`);
        if (era.get(`talent:${target}:109`) || 0) {
          await era.printAndWait(
            `「如果${sc()}的胸部…更大一点的话…呜…啊哈…呜…哈啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}将带着精臭的阴茎包在嘴里，用那平薄的胸部摩擦着阴茎的一端………`,
          );
        } else if (era.get(`talent:${target}:110`) || 0) {
          await era.printAndWait(
            `「啊哈…这灼热的…把${sc()}的胸都要烫伤了呢…啊哈呜呜…呜咕…咕噜${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}自豪地笑着，把阴茎夹在一对巨乳间进行着口交。`,
          );
        } else if (era.get(`talent:${target}:114`) || 0) {
          await era.printAndWait(
            `「啊啊啊…肉棒全都埋进去了呢…哈啊…好像会出来很多精液的样子${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}自豪地笑着，把阴茎埋在一双豪乳间进行着口交。`,
          );
          await era.printAndWait(
            `「来吧${heart(1)}…哈呜${heart(1)}…来射到…啊啊啊…来射满我的胸部${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊啊啊…肉棒…${sc()}会用嘴巴和胸部让它更加舒服的…呜呼…咕噜噜…哈啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}舔着嘴唇，把阴茎夹在胸间进行着口交………`,
          );
        }
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        await era.printAndWait(`「啊啊…呜…呜啊…咕咕…咕噜…呜呼咕咕咕噜噜………」`);
        if (era.get(`talent:${target}:109`) || 0) {
          await era.printAndWait(
            `${target_name}拼命用那微薄的胸部摩擦着阴茎，同时开始了口交………`,
          );
        } else if (era.get(`talent:${target}:110`) || 0) {
          await era.printAndWait(
            `「被你看着…${sc()}的乳房变得更加舒服了呢…啊哈…呜咕…哈啊…呜呜呜」`,
          );
          await era.printAndWait(
            `${target_name}十分愉快地把阴茎夹在一对巨乳间进行着口交………`,
          );
        } else if (era.get(`talent:${target}:114`) || 0) {
          await era.printAndWait(
            `「但凡是男人…都喜欢盯着${sc()}的胸口看呢…呜…啊呜啊呜…哈啊…呜咕咕噜…」`,
          );
          await era.printAndWait(
            `${target_name}十分愉快地把阴茎埋在一双豪乳间进行着口交………`,
          );
        } else {
          await era.printAndWait(
            `${target_name}十分愉快地把阴茎夹在胸间进行着口交………`,
          );
        }
      } else {
        await era.printAndWait(
          `「${scf()}、${sc()}居然要做这种屈辱的事情吗…啊呜………」`,
        );
        if (era.get(`talent:${target}:109`) || 0) {
          await era.printAndWait(
            `${target_name}胸口被阴茎蹭着，开始吮吸起来………`,
          );
        } else if (era.get(`talent:${target}:110`) || 0) {
          await era.printAndWait(
            `「呜呼…男人都喜欢…啊啊…啊咕…把肉棒强加到别人身上吗…呜…呜咕噜路…哈啊」`,
          );
          await era.printAndWait(
            `${target_name}带着懊悔的表情把阴茎夹在一对巨乳间进行着口交………`,
          );
        } else if (era.get(`talent:${target}:114`) || 0) {
          await era.printAndWait(
            `「居然要${sc()}用这自豪的胸部做这种丑陋的事情…啊啊啊…呜呼…呜咕噜…呜呜呜呜呜！」`,
          );
          await era.printAndWait(
            `${target_name}带着懊悔的表情把阴茎埋在一双豪乳间进行着口交………`,
          );
        } else {
          await era.printAndWait(
            `${target_name}带着懊悔的表情把阴茎夹在胸间进行着口交………`,
          );
        }
      }
      // CFLAG:TARGET:360  = 1（变量语义：CFLAG 族，TARGET:360）
      kojo.乳夹口交 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.乳夹口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…很热呢…这仿佛在燃烧的肉棒…${heart(1)}」`,
        );
        if (era.get(`talent:${target}:109`) || 0) {
          await era.printAndWait(
            `「啊啊…${sc()}的乳房虽然很小…但服务可不差哦…咕噜咕噜…哈啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}十分兴奋，用那平薄的胸部摩擦着阴茎的一端………`,
          );
        } else if (era.get(`talent:${target}:110`) || 0) {
          await era.printAndWait(
            `「${sc()}的胸部很舒服的吧…啊哈哈…这大家伙都已经这么硬了呢…哈呜…咕噜咕噜…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}十分兴奋，把阴茎夹在一对巨乳间进行着口交。`,
          );
        } else if (era.get(`talent:${target}:114`) || 0) {
          await era.printAndWait(
            `「啊哈哈哈…${sc()}这傲人的胸部能让你很舒服吧…${heart(1)} 呜咕噜…哈呼…呜呜${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}十分兴奋，把阴茎埋在一双豪乳间进行着口交………`,
          );
        } else {
          await era.printAndWait(
            `「呃呃…嘻嘻～${heart(1)} 这样子侍奉着阴茎…${sc()}已经忍不住了啦～${heart(1)} 唔喔…唔唔～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}十分兴奋，把阴茎夹在胸间进行着口交………`,
          );
        }
        // CFLAG:360  = 5（变量语义：CFLAG 族，360）
        kojo.乳夹口交 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.乳夹口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「肉棒…啊啊…已经在发热了呢……${heart(1)}」`);
        if (era.get(`talent:${target}:109`) || 0) {
          await era.printAndWait(
            `「如果${sc()}的胸部…更大一点的话…呜…啊哈…呜…哈啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}将带着精臭的阴茎包在嘴里，用那平薄的胸部摩擦着阴茎的一端………`,
          );
        } else if (era.get(`talent:${target}:110`) || 0) {
          await era.printAndWait(
            `「啊哈…这灼热的…把${sc()}的胸都要烫伤了呢…啊哈呜呜…呜咕…咕噜${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}自豪地笑着，把阴茎夹在一对巨乳间进行着口交。`,
          );
        } else if (era.get(`talent:${target}:114`) || 0) {
          await era.printAndWait(
            `「啊啊啊…肉棒全都埋进去了呢…哈啊…好像会出来很多精液的样子${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}自豪地笑着，把阴茎埋在一双豪乳间进行着口交。`,
          );
          await era.printAndWait(
            `「来吧${heart(1)}…哈呜${heart(1)}…来射到…啊啊啊…来射满我的胸部${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊啊啊…肉棒…${sc()}会用嘴巴和胸部让它更加舒服的…呜呼…咕噜噜…哈啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}舔着嘴唇，把阴茎夹在胸间进行着口交………`,
          );
        }
        // CFLAG:360  = 4（变量语义：CFLAG 族，360）
        kojo.乳夹口交 = 4;
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.乳夹口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊…呜…呜啊…咕咕…咕噜…呜呼咕咕咕噜噜………」`);
        if (era.get(`talent:${target}:109`) || 0) {
          await era.printAndWait(
            `${target_name}拼命用那微薄的胸部摩擦着阴茎，同时开始了口交………`,
          );
        } else if (era.get(`talent:${target}:110`) || 0) {
          await era.printAndWait(
            `「被你看着…${sc()}的乳房变得更加舒服了呢…啊哈…呜咕…哈啊…呜呜呜」`,
          );
          await era.printAndWait(
            `${target_name}十分愉快地把阴茎夹在一对巨乳间进行着口交………`,
          );
        } else if (era.get(`talent:${target}:114`) || 0) {
          await era.printAndWait(
            `「但凡是男人…都喜欢盯着${sc()}的胸口看呢…呜…啊呜啊呜…哈啊…呜咕咕噜…」`,
          );
          await era.printAndWait(
            `${target_name}十分愉快地把阴茎埋在一双豪乳间进行着口交………`,
          );
        } else {
          await era.printAndWait(
            `${target_name}十分愉快地把阴茎夹在胸间进行着口交………`,
          );
        }
        // CFLAG:360  = 3（变量语义：CFLAG 族，360）
        kojo.乳夹口交 = 3;
      } else if (kojo.乳夹口交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「${scf()}、${sc()}居然要做这种屈辱的事情吗…啊呜………」`,
        );
        if (era.get(`talent:${target}:109`) || 0) {
          await era.printAndWait(
            `${target_name}胸口被阴茎蹭着，开始吮吸起来………`,
          );
        } else if (era.get(`talent:${target}:110`) || 0) {
          await era.printAndWait(
            `「呜呼…男人都喜欢…啊啊…啊咕…把肉棒强加到别人身上吗…呜…呜咕噜路…哈啊」`,
          );
          await era.printAndWait(
            `${target_name}带着懊悔的表情把阴茎夹在一对巨乳间进行着口交………`,
          );
        } else if (era.get(`talent:${target}:114`) || 0) {
          await era.printAndWait(
            `「居然要${sc()}用这自豪的胸部做这种丑陋的事情…啊啊啊…呜呼…呜咕噜…呜呜呜呜呜！」`,
          );
          await era.printAndWait(
            `${target_name}带着懊悔的表情把阴茎埋在一双豪乳间进行着口交………`,
          );
        } else {
          await era.printAndWait(
            `${target_name}带着懊悔的表情把阴茎夹在胸间进行着口交………`,
          );
        }
        // CFLAG:360  = 2（变量语义：CFLAG 族，360）
        kojo.乳夹口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 125) {
    if (kojo.口交时自慰 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(
          `「呜咕噜…才、才没有…喜欢这么做呢…啊呜…呜咕噜${heart(1)} 唔啊啊${heart(1)} 哈啊啊${heart(1)} 好舒服${heart(1)}」`,
        );
        // 同一行输出：无后缀 PRINTFORM 不换行，末行 PRINTL
        // 才收行；ELSEIF/ELSE 三支是同一行的另三支。前缀提到
        // 语句外共用——各支自己的语句只列本支，前缀留在里面会多出一段
        // 不属于本支的插值记号（#621）
        const mouth_front_4594 = `${target_name}含住${player_name}的阴茎显得十分兴奋，`;
        if (era.get(`tequip:${target}:11`) && era.get(`tequip:${target}:13`)) {
          await era.print(
            `${target_name}含住${player_name}的阴茎显得十分兴奋，用手摆弄着插入私处和肛门的蠕虫，激烈地抽插着……`,
          );
        } else if (era.get(`tequip:${target}:11`)) {
          await era.print(
            mouth_front_4594 + `用手摆弄着插入私处的蠕虫，激烈地抽插着……`,
          );
        } else if (era.get(`tequip:${target}:13`)) {
          await era.print(
            mouth_front_4594 + `用手摆弄着插入肛门的蠕虫，激烈地抽插着……`,
          );
        } else {
          await era.print(mouth_front_4594 + `自慰仍在继续着………`);
        }
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(
          `「肉棒…想要…${heart(1)} 啊啊…一边自慰一边品尝肉棒的感觉${heart(1)}」`,
        );
        // 同型（ELSEIF/ELSE 三支）
        const tongue_front_4607 = `${target_name}用舌头纠缠着${player_name}的阴茎，`;
        if (era.get(`tequip:${target}:11`) && era.get(`tequip:${target}:13`)) {
          await era.print(
            `${target_name}用舌头纠缠着${player_name}的阴茎，两穴里的蠕虫蠕动着，自慰激烈地继续………`,
          );
        } else if (era.get(`tequip:${target}:11`)) {
          await era.print(
            tongue_front_4607 + `小穴里的壶虫蠕动着，自慰激烈的继续………`,
          );
        } else if (era.get(`tequip:${target}:13`)) {
          await era.print(
            tongue_front_4607 + `肛门里的肛门虫蠕动着，自慰激烈地继续………`,
          );
        } else {
          await era.print(tongue_front_4607 + `自慰仍在继续着………`);
        }
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        await era.printAndWait(
          `「${scf()}、${sc()}…才不要一边自慰…一边帮你做那种事…呜…呜啊…呜…呜咕………」`,
        );
        // 同型（ELSEIF/ELSE 三支）
        const serve_front_4620 = `${target_name}被命令用口服侍${player_name}的阴茎，`;
        if (era.get(`tequip:${target}:11`) && era.get(`tequip:${target}:13`)) {
          await era.print(
            `${target_name}被命令用口服侍${player_name}的阴茎，两穴里的蠕虫蠕动着，自慰仍在继续………`,
          );
        } else if (era.get(`tequip:${target}:11`)) {
          await era.print(
            serve_front_4620 + `小穴里的壶虫蠕动着，自慰仍在继续………`,
          );
        } else if (era.get(`tequip:${target}:13`)) {
          await era.print(
            serve_front_4620 + `肛门里的肛门虫蠕动着，自慰仍在继续………`,
          );
        } else {
          await era.print(serve_front_4620 + `自慰仍在继续着………`);
        }
      } else {
        await era.printAndWait(
          `「呜…哈啊…哈啊…要${sc()}…做这样的事…呜呼…呜呜…呜哈啊咕咕……！」`,
        );
        // 同型（ELSEIF/ELSE 三支）
        const serve_front_4633 = `${target_name}被命令用口服侍${player_name}的阴茎，`;
        if (era.get(`tequip:${target}:11`) && era.get(`tequip:${target}:13`)) {
          await era.print(
            `${target_name}被命令用口服侍${player_name}的阴茎，两穴里的蠕虫蠕动着，自慰仍在继续………`,
          );
        } else if (era.get(`tequip:${target}:11`)) {
          await era.print(
            serve_front_4633 + `小穴里的壶虫蠕动着，自慰仍在继续………`,
          );
        } else if (era.get(`tequip:${target}:13`)) {
          await era.print(
            serve_front_4633 + `肛门里的肛门虫蠕动着，自慰仍在继续………`,
          );
        } else {
          await era.print(serve_front_4633 + `自慰仍在继续着………`);
        }
      }
      // CFLAG:TARGET:361  = 1（变量语义：CFLAG 族，TARGET:361）
      kojo.口交时自慰 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.口交时自慰 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呜咕噜…才、才没有…喜欢这么做呢…啊呜…呜咕噜${heart(1)} 唔啊啊${heart(1)} 哈啊啊${heart(1)} 好舒服${heart(1)}」`,
        );
        // 同型（ELSEIF/ELSE 三支）
        const mouth_front_4651 = `${target_name}含住${player_name}的阴茎显得十分兴奋，`;
        if (era.get(`tequip:${target}:11`) && era.get(`tequip:${target}:13`)) {
          await era.print(
            `${target_name}含住${player_name}的阴茎显得十分兴奋，两穴里的蠕虫蠕动着蠕动着，自慰激烈地继续………`,
          );
        } else if (era.get(`tequip:${target}:11`)) {
          await era.print(
            mouth_front_4651 + `小穴里的壶虫蠕动着，自慰激烈的继续………`,
          );
        } else if (era.get(`tequip:${target}:13`)) {
          await era.print(
            mouth_front_4651 + `肛门里的肛门虫蠕动着，自慰激烈地继续………`,
          );
        } else {
          await era.print(mouth_front_4651 + `自慰仍在继续着………`);
        }
        await era.printAndWait(
          `「啊啊啊…一边自慰…一边舔着大肉棒…好舒服呢……啊啊啊啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `（啊啊啊…肉棒…好想要肉棒啊${heart(1)} 只是自慰完全无法忍受了${heart(1)}）`,
        );
        // CFLAG:361  = 5（变量语义：CFLAG 族，361）
        kojo.口交时自慰 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.口交时自慰 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「肉棒…想要…${heart(1)} 啊啊…一边自慰一边品尝肉棒的感觉${heart(1)}」`,
        );
        // 同型（ELSEIF/ELSE 三支）
        const tongue_front_4667 = `${target_name}用舌头纠缠着${player_name}的阴茎，`;
        if (era.get(`tequip:${target}:11`) && era.get(`tequip:${target}:13`)) {
          await era.print(
            `${target_name}用舌头纠缠着${player_name}的阴茎，任两穴里的蠕虫蠕动着，摇动着纤腰………`,
          );
        } else if (era.get(`tequip:${target}:11`)) {
          await era.print(
            tongue_front_4667 + `任私处的蠕虫蠕动，摇动着纤腰………`,
          );
        } else if (era.get(`tequip:${target}:13`)) {
          await era.print(
            tongue_front_4667 + `任肛门里的肛门虫蠕动，摇动着纤腰………`,
          );
        } else {
          await era.print(tongue_front_4667 + `继续用手指在阴唇上抚摸着。`);
        }
        await era.printAndWait(
          `「呜哈啊啊…咕噜…呜呜…哈…啊呜…呜咕噜噜噜…${heart(1)}」`,
        );
        await era.printAndWait(
          `（一边自慰一边吮吸肉棒真是太美味了…${sc()}已经…对精液迫不及待了呢………${heart(1)}）`,
        );
        // CFLAG:361  = 4（变量语义：CFLAG 族，361）
        kojo.口交时自慰 = 4;
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.口交时自慰 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「${scf()}、${sc()}…才不要一边自慰…一边帮你做那种事…呜…呜啊…呜…呜咕………」`,
        );
        // 同型（ELSEIF/ELSE 三支）
        const serve_front_4683 = `${target_name}被命令用口服侍${player_name}的阴茎，`;
        if (era.get(`tequip:${target}:11`) && era.get(`tequip:${target}:13`)) {
          await era.print(
            `${target_name}被命令用口服侍${player_name}的阴茎，两穴里的蠕虫蠕动着，自慰激烈地继续………`,
          );
        } else if (era.get(`tequip:${target}:11`)) {
          await era.print(
            serve_front_4683 + `小穴里的壶虫蠕动着，自慰激烈的继续………`,
          );
        } else if (era.get(`tequip:${target}:13`)) {
          await era.print(
            serve_front_4683 + `肛门里的肛门虫蠕动着，自慰激烈地继续………`,
          );
        } else {
          await era.print(serve_front_4683 + `自慰仍在继续着………`);
        }
        await era.printAndWait(`「呜呜…呜咕噜…哈啊…呜…呜咕…呜呜……！」`);
        await era.printAndWait(`（哎呀…${sc()}已经习惯了这样的事情了啊………）`);
        // CFLAG:361  = 3（变量语义：CFLAG 族，361）
        kojo.口交时自慰 = 3;
      } else if (kojo.口交时自慰 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「呜…哈啊…哈啊…要${sc()}…做这样的事…呜呼…呜呜…呜哈啊咕咕……！」`,
        );
        // 同型（ELSEIF/ELSE 三支）
        const serve_front_4699 = `${target_name}被命令用口服侍${player_name}的阴茎，`;
        if (era.get(`tequip:${target}:11`) && era.get(`tequip:${target}:13`)) {
          await era.print(
            `${target_name}被命令用口服侍${player_name}的阴茎，两穴里的蠕虫蠕动着，自慰激烈地继续………`,
          );
        } else if (era.get(`tequip:${target}:11`)) {
          await era.print(
            serve_front_4699 + `小穴里的壶虫蠕动着，自慰激烈的继续………`,
          );
        } else if (era.get(`tequip:${target}:13`)) {
          await era.print(
            serve_front_4699 + `肛门里的肛门虫蠕动着，自慰激烈地继续………`,
          );
        } else {
          await era.print(serve_front_4699 + `自慰仍在继续着………`);
        }
        // CFLAG:361  = 2（变量语义：CFLAG 族，361）
        kojo.口交时自慰 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 126) {
    if (kojo.手搓口交 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(
          `「啊啊啊想要精液！…请毫无顾虑的在${sc()}嘴里射满精液吧…${heart(1)}」`,
        );
        await era.printAndWait(
          `这么说着的${target_name}一边用舌头舔着龟头，一边用手搓动着阴茎的根部………`,
        );
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(
          `「手上都是精液呢，不过${sc()}的嘴里也想被射满精液…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的舌头缠绕着阴茎，用手摩擦着根部………`,
        );
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        await era.printAndWait(`「就这样一边吸一边摩擦吧…♪」`);
        await era.printAndWait(
          `${target_name}将${player_name}的阴茎用嘴吸吮着，同时用手搓动起来………`,
        );
      } else {
        await era.printAndWait(`「哈啊哈啊…做这种事情会让你很高兴吗！？」`);
        await era.printAndWait(
          `${target_name}将${player_name}的阴茎用嘴吸吮着，同时用手搓动起来………`,
        );
      }
      // CFLAG:TARGET:362  = 1（变量语义：CFLAG 族，TARGET:362）
      kojo.手搓口交 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.手搓口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊想要精液啊！…请毫无顾虑地在${sc()}嘴里射满精液吧…${heart(1)}」`,
        );
        await era.printAndWait(
          `这么说着的${target_name}一边用舌头舔着龟头，一边用手搓动着阴茎的根部。`,
        );
        await era.printAndWait(
          `「啊啊啊…忍着不让精液射出来会更满足吧${heart(1)} 呜哈呜啊…呜咕噜路${heart(1)}」`,
        );
        // CFLAG:362  = 5（变量语义：CFLAG 族，362）
        kojo.手搓口交 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.手搓口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「手上都是精液呢，不过${sc()}的嘴里也想被射满精液…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的舌头缠绕着阴茎，用手摩擦着根部。`,
        );
        await era.printAndWait(
          `「哈啊${heart(1)}…呜啊呼${heart(1)}…这样就好了吧${heart(1)}…啊啊啊…像这样…${sc()}的身体也有些燥热了呢…${heart(1)}」`,
        );
        // CFLAG:362  = 4（变量语义：CFLAG 族，362）
        kojo.手搓口交 = 4;
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.手搓口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「就这样一边吸一边摩擦吧…♪」`);
        await era.printAndWait(
          `${target_name}将${player_name}的阴茎用嘴吸吮着，同时用手搓动起来………`,
        );
        // CFLAG:362  = 3（变量语义：CFLAG 族，362）
        kojo.手搓口交 = 3;
      } else if (kojo.手搓口交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「哈啊哈啊…做这种事情会让你很高兴吗！？」`);
        await era.printAndWait(
          `${target_name}将${player_name}的阴茎用嘴吸吮着，同时用手搓动起来………`,
        );
        // CFLAG:362  = 2（变量语义：CFLAG 族，362）
        kojo.手搓口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 127) {
    if (kojo.真空口交 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(
          `「呜啊啊啊…啊呼…呜呼…${heart(1)}　呜…呜咕噜噜噜…哈啊…哈呜…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}舔着嘴唇收缩口腔，一边发出下流的声音一边用力吸住${player_name}的阴茎………`,
        );
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(
          `「呜啊啊啊…啊呼…呜呼…呜…呜咕噜噜噜…哈啊…哈呜…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}对插进来的阴茎爱不释口，故意发出下流的声音兴奋地引诱着………`,
        );
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        await era.printAndWait(`「一大半都…呜呼…呜呜…真…真是不老实…呼呜呜…」`);
      } else {
        await era.printAndWait(`「呜嗯呜咕咕…呜啊…呜…呜咕咕咕噜…！」`);
      }
      // CFLAG:TARGET:363  = 1（变量语义：CFLAG 族，TARGET:363）
      kojo.真空口交 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.真空口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「不要停下…哈啊…咕噜噜…唔啊啊${heart(1)}…嘿…呼…咕噜噜噜噜 ${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}收缩口腔，一边发出下流的声音一边用力吸住${player_name}的阴茎………`,
        );
        await era.printAndWait(
          `「呜呼呼…呜嗯…咕噜咕噜${heart(1)}…哈啊呜呜…呜啊呜啊${heart(1)}…哈啊啊啊啊${heart(1)}」`,
        );
        // CFLAG:363  = 5（变量语义：CFLAG 族，363）
        kojo.真空口交 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.真空口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呜啊啊啊…啊呼…呜呼…呜…呜咕噜噜噜…哈啊…哈呜…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}对插进来的阴茎爱不释口，故意发出下流的声音兴奋地引诱着………`,
        );
        await era.printAndWait(
          `「停不下来了${heart(1)}…好棒…想一直继续下去${heart(1)}…呜呼啊啊啊啊${heart(1)}」`,
        );
        // CFLAG:363  = 4（变量语义：CFLAG 族，363）
        kojo.真空口交 = 4;
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.真空口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「一大半都…呜呼…呜呜…真…真是不老实…呼呜呜…」`);
        await era.printAndWait(
          `${target_name}那灵巧的舌头与阴茎纠缠着奏出一曲靡靡之音………`,
        );
        // CFLAG:363  = 3（变量语义：CFLAG 族，363）
        kojo.真空口交 = 3;
      } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「呜嗯呜咕咕…呜啊…呜…呜咕咕咕噜…！！」`);
        await era.printAndWait(
          `${target_name}眼中含着泪吸吮着肉棒，不时发出下流的响声………`,
        );
        // CFLAG:363  = 2（变量语义：CFLAG 族，363）
        kojo.真空口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 69) {
    if (kojo.六九式 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(
          `「啊啊呜！ ${sc()}下面已经变得湿湿的了呢${heart(1)} 您的阴茎也很厉害呢${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}屁股左右摆动着把自己的小穴压在${player_name}脸上………`,
        );
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(
          `「啊啊…不要，这样太恶心了啦…${scf()}、${sc()}做那样的事…啊啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `虽然这么说但${target_name}还是把股间暴露在${player_name}面前，发出轻轻的呻吟开始了口交服务。`,
        );
        await era.printAndWait(`「呜…哈啊…呜咕…呜啊…呜嗯…${heart(1)}」`);
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        await era.printAndWait(`「呜…啊呜…差不多就行了吧…快要忍受不了了…！」`);
        await era.printAndWait(
          `${target_name}感受着下体传来的舌头的感觉，背部不由自主地颤抖着，开始用嘴舔舐阴茎………`,
        );
      } else {
        await era.printAndWait(
          `「啊啊啊…呜…停、停下…再不老实的话…就…就开始咬了啊………！」`,
        );
        await era.printAndWait(
          `${target_name}感受着下体传来的舌头的感觉，背部不由自主地颤抖着，开始用嘴舔舐阴茎………`,
        );
      }
      // CFLAG:TARGET:364  = 1（变量语义：CFLAG 族，TARGET:364）
      kojo.六九式 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.六九式 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊呜！ ${sc()}下面已经变得湿湿的了呢${heart(1)} 您的阴茎也很厉害呢${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}屁股左右摆动着把自己的小穴压在${player_name}脸上………`,
        );
        await era.printAndWait(
          `「呜…呜咕…下面被玩弄得，玩弄得好舒服…啊啊…啊呜${heart(1)} 呜啊…咕噜…${heart(1)}」`,
        );
        // CFLAG:364  = 5（变量语义：CFLAG 族，364）
        kojo.六九式 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.六九式 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呜呜…再、再欺负我的话…就要咬人了啦…呜啊${heart(1)} 哈呜${heart(1)}」`,
        );
        await era.printAndWait(
          `虽然这么说但${target_name}还是把股间暴露在${player_name}面前，发出轻轻的呻吟开始了口交服务。`,
        );
        await era.printAndWait(
          `「啊啊啊…不、不要…已经不行了啊啊…哈呜${heart(1)} 啊啊呜…啊嗯…真讨厌～…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}用嘴唇夹住阴茎，一边发出下流的声音一边吮吸着………`,
        );
        // CFLAG:364  = 4（变量语义：CFLAG 族，364）
        kojo.六九式 = 4;
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.六九式 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呜…呜呜…这、这个程度已经够了啊啊…不要…唔啊唔嗯…哈啊…呜呜！！」`,
        );
        await era.printAndWait(
          `${target_name}的小穴被舌头不知不觉地入侵，发出有些意外的呻吟。`,
        );
        await era.printAndWait(`「就这样…呜咕…呜呜…还…还可以在激烈点…呼啊…」`);
        // CFLAG:364  = 3（变量语义：CFLAG 族，364）
        kojo.六九式 = 3;
      } else if (kojo.六九式 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「啊啊啊…呜…停、停下…再不老实的话…就…就开始咬了啊………！」`,
        );
        await era.printAndWait(
          `${target_name}感受着下体传来的舌头的感觉，背部不由自主地颤抖着，开始用嘴舔舐阴茎………`,
        );
        await era.printAndWait(`「呜…哈啊…呜…咕…呜…呜呜！」`);
        // CFLAG:364  = 2（变量语义：CFLAG 族，364）
        kojo.六九式 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 124) {
    if (kojo.深喉 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(
          `${target_name}被阴茎插入了喉咙最深处，潮湿的舌头缠绕着阴茎不断来回清扫。`,
        );
        await era.printAndWait(
          `「别、别这样…呜呼${heart(1)}…咕噜…呜呜呜噜${heart(1)}…咕噜…呜呜呜咕咕${heart(1)}」`,
        );
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(
          `${target_name}带着幸福的神色放松喉咙将阴茎引了进来。`,
        );
        await era.printAndWait(
          `「呜咕…咕噜…呜呜呜咕噜${heart(1)}…呜呜…咕噜噜噜噜${heart(1)}」`,
        );
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        await era.printAndWait(`「呜咕…咕噜…呜呜呜咕噜…呜呜…咕噜噜噜噜…♪」`);
        await era.printAndWait(
          `${target_name}喘息变得粗重，将阴茎深深吞入口腔来回舔舐………`,
        );
      } else {
        await era.printAndWait(
          `「哈啊…要伸到…喉咙里这么深的地方…呜…呜咕咕噜…！」`,
        );
        await era.printAndWait(
          `${target_name}脸部因为痛苦而有些扭曲，不情不愿地将阴茎吞入喉中………`,
        );
      }
      // CFLAG:TARGET:365  = 1（变量语义：CFLAG 族，TARGET:365）
      kojo.深喉 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.真空口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}被阴茎插入了喉咙最深处，潮湿的舌头缠绕着阴茎不断来回清扫。`,
        );
        await era.printAndWait(
          `「别、别这样…呜呼${heart(1)}…咕噜…呜呜呜噜${heart(1)}…咕噜…呜呜呜咕咕${heart(1)}」`,
        );
        await era.printAndWait(
          `（啊…就这样把肉棒全部吞下去${heart(1)} 连胃里也侵犯一番吧${heart(1)}）`,
        );
        // CFLAG:365  = 5（变量语义：CFLAG 族，365）
        kojo.深喉 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.真空口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}带着幸福的神色放松喉咙将阴茎引了进来。`,
        );
        await era.printAndWait(
          `「呜咕…咕噜…呜呜呜咕噜${heart(1)}…呜呜…咕噜噜噜噜${heart(1)}」`,
        );
        await era.printAndWait(
          `（这个大肉棒…全部是${sc()}的…谁也别想要抢…${heart(1)}）`,
        );
        // CFLAG:365  = 4（变量语义：CFLAG 族，365）
        kojo.深喉 = 4;
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.真空口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呜咕…咕噜…呜呜呜咕噜…呜呜…咕噜噜噜噜…♪」`);
        await era.printAndWait(
          `${target_name}鼻息粗重地感受着阴茎在自己喉咙里来回往复。`,
        );
        await era.printAndWait(`几次忍住呕吐的欲望吞吐着阴茎拼命地服侍着………`);
        // CFLAG:365  = 3（变量语义：CFLAG 族，365）
        kojo.深喉 = 3;
      } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「呜…呜呜…呜嗯呜嗯…知、知道了…这种肮脏的服务…呜…呜咕…！」`,
        );
        await era.printAndWait(`${target_name}将阴茎勉勉强强地含在嘴里………`);
        // CFLAG:365  = 2（变量语义：CFLAG 族，365）
        kojo.深喉 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 80) {
    if (kojo.强制口交 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(
          `「唔啊啊啊…呜呼！呼啊啊！啊啊啊…真是粗暴呢${heart(1)}…这样抓着头很痛啊…！啊啊呜！」`,
        );
        await era.printAndWait(
          `虽然这样说着但${target_name}还是对${player_name}粗暴的突刺很是享受的样子………`,
        );
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(
          `「呜啊啊啊…${sc()}的嘴巴被当做飞机杯了吧…呜呜咕咕噜呜！？ 」`,
        );
        await era.printAndWait(
          `${target_name}的头被抓住，阴茎粗鲁地挤进喉咙里，翻起了白眼………`,
        );
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0
      ) {
        await era.printAndWait(
          `「住…住手！想把那样的脏东西放进${sc()}的嘴里吗…我、我会咬断它的…呜…呜咕咕咕咕咕！？」`,
        );
        await era.printAndWait(
          `${target_name}的头被紧紧抓住阴茎不断地在她喉间耸动………`,
        );
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        await era.printAndWait(
          `「啊呜咕…呜…呜…呜咕咕咕咕噜！？！？还、还要再来吗…呜咕噜！」`,
        );
        await era.printAndWait(`${target_name}的喉咙深处被插入的阴茎动摇着………`);
      } else {
        await era.printAndWait(
          `「啊啊啊…停、停下来…喉咙要受不了了…呜咕…呜啊啊啊…咕噜…咕噜！」`,
        );
        await era.printAndWait(`${target_name}苦涩地应对着插到喉间的阴茎………`);
      }
      // CFLAG:TARGET:381  = 1（变量语义：CFLAG 族，TARGET:381）
      kojo.强制口交 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.强制口交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${player_name}抓住${target_name}的头，激烈地耸动着腰，侵犯她的嘴巴。`,
        );
        await era.printAndWait(
          `「呜咕…哈啊呜呜${heart(1)}…咕噜咕噜${heart(1)}…咕噜咕噜呜噜呜噜${heart(1)}」`,
        );
        await era.printAndWait(
          `已经品尝到阴茎美味的${target_name}边流着泪边露出愉悦的表情………`,
        );
        // CFLAG:381  = 6（变量语义：CFLAG 族，381）
        kojo.强制口交 = 6;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.强制口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「什么啊！？…不…别这样嘛…呜呜…呜咕咕咕咕${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}喉咙被突入最深处，眼神中露出一丝放荡。`,
        );
        await era.printAndWait(
          `「啊呜…呜呜咕噜…${sc()}的嘴巴真是幸福呢…${heart(1)} 呜呜咕咕咕咕噜噜${heart(1)}」`,
        );
        // CFLAG:381  = 5（变量语义：CFLAG 族，381）
        kojo.强制口交 = 5;
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (kojo.强制口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呜呜…呜咕！我的脸颊…快、快住手啊…我真的咬了……呜！呜呜咕噜！」`,
        );
        await era.printAndWait(
          `${target_name}摇着头想反抗却被捏住鼻子强行把阴茎伸进了嘴里，只能无奈地忍受嘴里抽动的的阴茎。`,
        );
        await era.printAndWait(
          `「呜呼…呜…呜咕…咕噜…已、已经…咕啊啊啊啊啊呜…呜呜！！！」`,
        );
        // CFLAG:381  = 4（变量语义：CFLAG 族，381）
        kojo.强制口交 = 4;
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.强制口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}的喉咙深处被插入的阴茎卡得动弹不得………`,
        );
        await era.printAndWait(
          `「再、再这样粗暴的话…就要吐出来了………唔咕咕咕…呜咕噜噜噜！」`,
        );
        // CFLAG:381  = 3（变量语义：CFLAG 族，381）
        kojo.强制口交 = 3;
      } else if (kojo.强制口交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「哈啊哈啊…我会老实的，所以快点结束吧…呜啊！呜呜咕咕咕咕噜！」`,
        );
        await era.printAndWait(
          `${target_name}痛苦地忍耐着在喉咙深处不断抽插的阴茎………`,
        );
        // CFLAG:381  = 2（变量语义：CFLAG 族，381）
        kojo.强制口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 87) {
    if (kojo.穿环 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        if (chara(target).train.穿环状态 & P) {
          if (P === 1) {
            await era.printAndWait(
              `「哈～哈～乳头被穿上这么可爱的环……真高兴啊…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}忍受着乳头穿刺的疼痛，好像因为被穿环而愉悦着……`,
            );
          } else if (P === 2) {
            await era.printAndWait(
              `「嘻嘻～这样的话，以后都一直穿着露脐装吧？」`,
            );
            await era.printAndWait(
              `${target_name}忍受着肚脐穿刺的疼痛，好像因为被穿环而愉悦着……`,
            );
          } else if (P === 4) {
            await era.printAndWait(
              `「啊…${sc()}…连被这样弄，也有感觉了………${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}忍受着阴唇穿刺的疼痛，好像因为被穿环而愉悦着……`,
            );
          } else if (P === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              0 ||
              era.get(`talent:${target}:122`) ||
              0
            ) {
              await era.printAndWait(
                `「鸡鸡变得这么好看了呢…非常感谢～${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}忍受着阴茎穿刺的疼痛，好像因为被穿环而愉悦着……`,
              );
            } else {
              await era.printAndWait(
                `「啊、啊…得到这么漂亮的环…小豆豆也有感觉了～${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}忍受着阴蒂穿刺的疼痛，好像因为被穿环而愉悦着……`,
              );
            }
          } else if (P === 16) {
            await era.printAndWait(
              `「唔…哦～这样子，口交的时候，就会更舒服了～…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}忍受着舌头穿刺的疼痛，好像因为被穿环而愉悦着……`,
            );
          } else if (P === 32) {
            await era.printAndWait(
              `「唔…这个环真适合我…哈哈～………${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}用舌头舔舐着自己刚被穿环的嘴唇……`,
            );
          } else if (P === 64) {
            await era.printAndWait(`「这，这个有点…不好意思………」`);
            await era.printAndWait(
              `${target_name}害羞地转过了头，不让你看到被穿环的鼻子……`,
            );
          }
        } else {
          await era.printAndWait(`${target_name}抚摸着之前被穿环的地方……`);
        }
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        if (chara(target).train.穿环状态 & P) {
          if (P === 1) {
            await era.printAndWait(
              `「啊！…漂亮的环…如果这是订婚戒指的话…该多好啊………${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}忍受着乳头穿刺的疼痛，好像看着闪闪发亮的乳环陷入了妄想之中……`,
            );
          } else if (P === 2) {
            await era.printAndWait(`「嗯…肚脐竟然………不过，好漂亮呢～………♪」`);
            await era.printAndWait(`${target_name}在脐环周围摩挲着。`);
          } else if (P === 4) {
            await era.printAndWait(
              `「这，这种地方被上环的话…${scf()}、${sc()}…会变奇怪的啦！………」`,
            );
            await era.printAndWait(
              `${target_name}嘴上说不要，身体却老老实实地开始发烫了。`,
            );
          } else if (P === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              0 ||
              era.get(`talent:${target}:122`) ||
              0
            ) {
              await era.printAndWait(
                `「啊～鸡鸡被这么漂亮地装饰着……十分感谢～！…♪」`,
              );
              await era.printAndWait(
                `${target_name}因阴茎被穿环，气息变得炽热了。`,
              );
            } else {
              await era.printAndWait(
                `「连这种地方都得到了赏赐…${scf()}、${sc()}…已经不能没有魔王大人了～${heart(1)}」`,
              );
              await era.printAndWait(`${target_name}红着脸兴奋地说到。`);
            }
          } else if (P === 16) {
            await era.printAndWait(
              `「呢～…魔王大人哦～…来和${sc()}接吻嘛～…来感受一下${sc()}的舌头～…♪」`,
            );
            await era.printAndWait(
              `${target_name}伸出被穿环的舌头，引诱着${player_name}………`,
            );
          } else if (P === 32) {
            await era.printAndWait(
              `「嘿嘿嘿…曾经也到过一些地方，以这样子为时尚呢～♪」`,
            );
            await era.printAndWait(
              `${target_name}用舌头舔舐着自己刚被穿环的嘴唇……`,
            );
          } else if (P === 64) {
            await era.printAndWait(`「讨，讨厌啦～…在这里穿环什么的………」`);
            await era.printAndWait(
              `${target_name}害羞地转过了头，不让你看到被穿环的鼻子……`,
            );
          }
        } else {
          await era.printAndWait(`${target_name}抚摸着之前被穿环的地方……`);
        }
      } else {
        if (chara(target).train.穿环状态 & P) {
          if (P === 1) {
            await era.printAndWait(
              `「唔呀呀！…${sc()}要开始讨厌你啦…！放过乳头啊！～！」`,
            );
            await era.printAndWait(
              `${target_name}因为乳头的疼痛和屈辱而流下了泪水……`,
            );
          } else if (P === 2) {
            await era.printAndWait(`「这、这种样子……只是一种时尚………」`);
            await era.printAndWait(`${target_name}因肚脐的痛楚泪眼婆娑了………`);
          } else if (P === 4) {
            await era.printAndWait(
              `「在这种地方上环？！…啊啊！…${sc()}已经……………」`,
            );
            await era.printAndWait(
              `${target_name}因为阴唇的疼痛和屈辱而流下了泪水……`,
            );
          } else if (P === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              0 ||
              era.get(`talent:${target}:122`) ||
              0
            ) {
              await era.printAndWait(
                `「呜呜…呜呜…呜呜喔…为……为什么要被做这样的事………」`,
              );
              await era.printAndWait(
                `${target_name}因为阴茎的疼痛和屈辱而流下了泪水……`,
              );
            } else {
              await era.printAndWait(
                `「呜呜…呜呜…呜呜喔…被……被做这样的事………已经……嫁不出去了啦…………」`,
              );
              await era.printAndWait(
                `${target_name}因为阴蒂的疼痛和屈辱而流下了泪水……`,
              );
            }
          } else if (P === 16) {
            await era.printAndWait(
              `「放……放过……我……我以后再也不说……您的坏话了………」`,
            );
            await era.printAndWait(`${target_name}因为舌环，口齿不清了……`);
          } else if (P === 32) {
            await era.printAndWait(`「连嘴唇也不放过………」`);
            await era.printAndWait(
              `${target_name}的唇上被穿了环，流下了屈辱的泪水……`,
            );
          } else if (P === 64) {
            await era.printAndWait(
              `「${scf()}、${sc()}才不是家畜！！………呜呜！」`,
            );
            await era.printAndWait(
              `${target_name}屈辱地转过了头，不让你看到被穿环的鼻子，嚎啕大哭着……`,
            );
          }
        } else {
          await era.printAndWait(`${target_name}抚摸着之前被穿环的地方……`);
        }
      }
      // CFLAG:TARGET:348  = 1（变量语义：CFLAG 族，TARGET:348）
      kojo.穿环 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.穿环 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (chara(target).train.穿环状态 & P) {
          if (P === 1) {
            await era.printAndWait(
              `「哈～哈～乳头被穿上这么可爱的环……真高兴啊…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}忍受着乳头穿刺的疼痛，好像因为被穿环而愉悦着……`,
            );
          } else if (P === 2) {
            await era.printAndWait(
              `「嘻嘻～这样的话，以后都一直穿着露脐装吧？」`,
            );
            await era.printAndWait(
              `${target_name}忍受着肚脐穿刺的疼痛，好像因为被穿环而愉悦着……`,
            );
          } else if (P === 4) {
            await era.printAndWait(
              `「啊……被这么弄的话，${sc()}以后只能和变态做爱的嘛…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}忍受着阴唇穿刺的疼痛，好像因为被穿环而愉悦着……`,
            );
          } else if (P === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              0 ||
              era.get(`talent:${target}:122`) ||
              0
            ) {
              await era.printAndWait(
                `「鸡鸡变得这么好看了呢…非常感谢～${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}忍受着阴茎穿刺的疼痛，好像因为被穿环而愉悦着……`,
              );
            } else {
              await era.printAndWait(
                `「啊、啊…得到这么漂亮的环…小豆豆也有感觉了～${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}忍受着阴蒂穿刺的疼痛，好像因为被穿环而愉悦着……`,
              );
            }
          } else if (P === 16) {
            await era.printAndWait(
              `「唔…哦～这样子，口交的时候，就会更舒服了～…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}忍受着舌头穿刺的疼痛，好像因为被穿环而愉悦着……`,
            );
          } else if (P === 32) {
            await era.printAndWait(
              `「呵呵，嘴唇和环，意外地相衬呢…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}用舌头舔舐着自己刚被穿环的嘴唇……`,
            );
          } else if (P === 64) {
            await era.printAndWait(
              `「鼻…鼻子穿了环的话，显得我更加可爱了吗……？…」`,
            );
            await era.printAndWait(`${target_name}有点不好意思地摸着鼻子……`);
          }
        } else {
          await era.printAndWait(`${target_name}抚摸着之前被穿环的地方……`);
        }
        // CFLAG:348  = 4（变量语义：CFLAG 族，348）
        kojo.穿环 = 4;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.穿环 <= 2 || game.kojo.口上开关 === 2)
      ) {
        if (chara(target).train.穿环状态 & P) {
          if (P === 1) {
            await era.printAndWait(
              `「嘻嘻～魔王大人啊～两边都可以尽情地玩弄哦！……${heart(1)}」`,
            );
            await era.printAndWait(`${target_name}晃动着胸前的环……`);
          } else if (P === 2) {
            await era.printAndWait(`「嗯…肚脐竟然………不过，好漂亮呢～………♪」`);
            await era.printAndWait(`${target_name}在脐环周围摩挲着。`);
          } else if (P === 4) {
            await era.printAndWait(
              `「这，这种地方也被上环的话……已经不能和魔王大人以外的对象做爱啦！…${heart(1)}」`,
            );
            await era.printAndWait(`${target_name}看着闪闪发亮的环出神了…………`);
          } else if (P === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              0 ||
              era.get(`talent:${target}:122`) ||
              0
            ) {
              await era.printAndWait(
                `「啊～鸡鸡被这么漂亮地装饰着……十分感谢～！…♪」`,
              );
              await era.printAndWait(
                `${target_name}因阴茎被穿环，气息变得炽热了。`,
              );
            } else {
              await era.printAndWait(
                `「这样的地方也被穿环了啊…魔王大人，要对人家负责啊～${heart(1)}」`,
              );
              await era.printAndWait(`${target_name}红着脸兴奋地说到。`);
            }
          } else if (P === 16) {
            await era.printAndWait(
              `「呢～…魔王大人哦～…来和${sc()}接吻嘛～…来感受一下${sc()}的舌头～…♪」`,
            );
            await era.printAndWait(
              `${target_name}伸出被穿环的舌头，引诱着${player_name}………`,
            );
          } else if (P === 32) {
            await era.printAndWait(
              `「嘿嘿嘿…曾经也到过一些地方，以这样子为时尚呢～♪」`,
            );
            await era.printAndWait(
              `${target_name}用舌头舔舐着自己刚被穿环的嘴唇……`,
            );
          } else if (P === 64) {
            await era.printAndWait(`「讨，讨厌啦～…在这里穿环什么的………」`);
            await era.printAndWait(
              `${target_name}害羞地转过了头，不让你看到被穿环的鼻子……`,
            );
          }
        } else {
          await era.printAndWait(`${target_name}抚摸着之前被穿环的地方……`);
        }
        // CFLAG:348  = 3（变量语义：CFLAG 族，348）
        kojo.穿环 = 3;
      } else if (kojo.穿环 <= 1 || game.kojo.口上开关 === 2) {
        if (chara(target).train.穿环状态 & P) {
          if (P === 1) {
            await era.printAndWait(
              `「唔呀呀！…${sc()}要开始讨厌你啦…！放过乳头啊！～！」`,
            );
            await era.printAndWait(
              `${target_name}因为乳头的疼痛和屈辱而流下了泪水……`,
            );
          } else if (P === 2) {
            await era.printAndWait(`「这，这种样子……只是一种时尚………」`);
            await era.printAndWait(`${target_name}因肚脐的痛楚泪眼婆娑了………`);
          } else if (P === 4) {
            await era.printAndWait(
              `「在这种地方上环？！…啊啊！…${sc()}已经……………」`,
            );
            await era.printAndWait(
              `${target_name}因为阴唇的疼痛和屈辱而流下了泪水……`,
            );
          } else if (P === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              0 ||
              era.get(`talent:${target}:122`) ||
              0
            ) {
              await era.printAndWait(
                `「呜呜…呜呜…呜呜喔…为……为什么要被做这样的事………」`,
              );
              await era.printAndWait(
                `${target_name}因为阴茎的疼痛和屈辱而流下了泪水……`,
              );
            } else {
              await era.printAndWait(
                `「呜呜…呜呜…呜呜喔…被……被做这样的事………已经……嫁不出去了啦…………」`,
              );
              await era.printAndWait(
                `${target_name}因为阴蒂的疼痛和屈辱而流下了泪水……`,
              );
            }
          } else if (P === 16) {
            await era.printAndWait(
              `「放……放过……我……我以后再也不说……您的坏话了………」`,
            );
            await era.printAndWait(`${target_name}因为舌环，口齿不清了……`);
          } else if (P === 32) {
            await era.printAndWait(`「连嘴唇也不放过………」`);
            await era.printAndWait(
              `${target_name}的唇上被穿了环，流下了屈辱的泪水……`,
            );
          } else if (P === 64) {
            await era.printAndWait(
              `「${scf()}、${sc()}才不是家畜！！………呜呜！」`,
            );
            await era.printAndWait(
              `${target_name}屈辱地转过了头，不让你看到被穿环的鼻子，嚎啕大哭着……`,
            );
          }
        } else {
          await era.printAndWait(`${target_name}抚摸着之前被穿环的地方……`);
        }
        // CFLAG:348  = 2（变量语义：CFLAG 族，348）
        kojo.穿环 = 2;
      }
    }
    return 0;
  }
}

// dog_kojo_6

async function dog_kojo_6(rand) {
  const {
    rand_n,
    target,
    assi,
    target_name,
    player_name,
    assi_name,
    master_name,
    sc,
    scf,
    view,
    kojo,
  } = bind_ctx(rand);

  if (era_flag.selectcom === 0) {
    if (kojo.爱抚 === 0) {
      if ((era.get(`mark:${target}:2`) || 0) >= 2) {
        await era.printAndWait(`「啊…狗…」`);
      } else {
        await era.printAndWait(`「滚开！　你这蠢狗！」`);
      }
      // CFLAG:301  = 1（变量语义：CFLAG 族，301）
      kojo.爱抚 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:136`) || 0) === 1 &&
        (kojo.爱抚 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊啊♪　可爱的狗狗♪」`);
        // CFLAG:301  = 7（变量语义：CFLAG 族，301）
        kojo.爱抚 = 7;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「狗也不错嘛…」`);
        // CFLAG:301  = 6（变量语义：CFLAG 族，301）
        kojo.爱抚 = 6;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「…兽类么」`);
        // CFLAG:301  = 5（变量语义：CFLAG 族，301）
        kojo.爱抚 = 5;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「不…」`);
        // CFLAG:301  = 4（变量语义：CFLAG 族，301）
        kojo.爱抚 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 2 &&
        (kojo.爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「混蛋！住手！」`);
        // CFLAG:301  = 3（变量语义：CFLAG 族，301）
        kojo.爱抚 = 3;
      } else if (
        (era.get(`mark:${target}:2`) || 0) <= 1 &&
        (kojo.爱抚 <= 1 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「你这死狗！」`);
        // CFLAG:301  = 2（变量语义：CFLAG 族，301）
        kojo.爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 1) {
    if (kojo.舔阴 === 0) {
      if ((era.get(`talent:${target}:0`) || 0) === 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:302  = 1（变量语义：CFLAG 族，302）
      kojo.舔阴 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:136`) || 0) === 1 &&
        (kojo.舔阴 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊啊啊、很舒服呢…♪」`);
        // CFLAG:302  = 6（变量语义：CFLAG 族，302）
        kojo.舔阴 = 6;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.舔阴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「…用力点舔吧……」`);
        // CFLAG:302  = 5（变量语义：CFLAG 族，302）
        kojo.舔阴 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.舔阴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「…嗯嗯」`);
        // CFLAG:302  = 4（变量语义：CFLAG 族，302）
        kojo.舔阴 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.舔阴 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「不…」`);
        // CFLAG:302  = 3（变量语义：CFLAG 族，302）
        kojo.舔阴 = 3;
      } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「滚开！　禽兽！」`);
        // CFLAG:302  = 2（变量语义：CFLAG 族，302）
        kojo.舔阴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 5) {
    if (kojo.胸爱抚 === 0) {
      if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306）
      kojo.胸爱抚 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:136`) || 0) === 1 &&
        (kojo.胸爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 6（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 6;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 5（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 4（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 4;
      } else if (
        (era.get(`abl:${target}:1`) || 0) >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 3（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 3;
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait('');
        // CFLAG:306  = 2（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 6) {
    if (kojo.接吻 === 0 && game.train.初吻与自我口上) {
      if ((era.get(`talent:${target}:136`) || 0) === 1) {
        await era.printAndWait(`「初吻…献给狗先生了呢…♪」`);
      } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait('');
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      kojo.接吻 = 1;
      return 0;
    } else if (kojo.接吻 === 0) {
      if ((era.get(`talent:${target}:136`) || 0) === 1) {
        await era.printAndWait(`「和狗先生接吻…♪」`);
      } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(`「狗啊……」`);
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(`「狗…？」`);
      } else {
        await era.printAndWait('');
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      kojo.接吻 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:136`) || 0) === 1 &&
        (kojo.接吻 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「狗先生啊…咕咕…」`);
        // CFLAG:307  = 6（变量语义：CFLAG 族，307）
        kojo.接吻 = 6;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.接吻 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「狗啊……」`);
        // CFLAG:307  = 5（变量语义：CFLAG 族，307）
        kojo.接吻 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.接吻 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「狗…？」`);
        // CFLAG:307  = 4（变量语义：CFLAG 族，307）
        kojo.接吻 = 4;
      } else if (
        (era.get(`abl:${target}:10`) || 0) >= 2 &&
        (kojo.接吻 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「住、住手啊…」`);
        // CFLAG:307  = 3（变量语义：CFLAG 族，307）
        kojo.接吻 = 3;
      } else if (kojo.接吻 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「无法接受…死也不能接受啊…」`);
        // CFLAG:307  = 2（变量语义：CFLAG 族，307）
        kojo.接吻 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 9) {
    if (kojo.舔肛 === 0) {
      if ((era.get(`talent:${target}:136`) || 0) === 1) {
        await era.printAndWait(`「要被舔肛门吗…？」`);
      } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(`「要被舔肛门吗…？」`);
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(`「屁股…吗」`);
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310）
      kojo.舔肛 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:136`) || 0) === 1 &&
        (kojo.舔肛 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「屁股融化了…」`);
        // CFLAG:310  = 6（变量语义：CFLAG 族，310）
        kojo.舔肛 = 6;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「狗的呼吸…」`);
        // CFLAG:310  = 5（变量语义：CFLAG 族，310）
        kojo.舔肛 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.舔肛 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「感觉很奇怪啊」`);
        // CFLAG:310  = 4（变量语义：CFLAG 族，310）
        kojo.舔肛 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.舔肛 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「不…不…」`);
        // CFLAG:310  = 3（变量语义：CFLAG 族，310）
        kojo.舔肛 = 3;
      } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「混蛋！　住手啊你这贱狗！」`);
        // CFLAG:310  = 2（变量语义：CFLAG 族，310）
        kojo.舔肛 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 21) {
    if (kojo.背后位 === 0) {
      if ((era.get(`talent:${target}:0`) || 0) === 1) {
        if ((era.get(`talent:${target}:136`) || 0) === 1) {
          await era.printAndWait(`「献给狗先生…很荣幸呢♪」`);
        } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
          await era.printAndWait(`「需要一定的勇气啊」`);
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          await era.printAndWait(`「和狗做这种事情…太过分了」`);
        } else {
          await era.printAndWait('');
        }
      } else {
        if ((era.get(`talent:${target}:136`) || 0) === 1) {
          await era.printAndWait(`「和狗先生交配呢♪」`);
        } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
          await era.printAndWait(`「有点不太对劲吧？」`);
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          await era.printAndWait(`「狗吗…」`);
        } else {
          await era.printAndWait('');
        }
      }
      // CFLAG:322  = 1（变量语义：CFLAG 族，322）
      kojo.背后位 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:136`) || 0) === 1 &&
        (kojo.背后位 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(`${target_name}像野兽般呻吟着，摇摆着下体。`);
          await era.printAndWait(
            `「啊狗先生！　我已经、沉溺在做母狗的快乐里了！请射在我体内吧♪」`,
          );
          await era.printAndWait(`两只野兽纠缠着，享受这欲望的快感`);
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `${target_name}一边吮吸着野狗的舌头，承受着身后大肉棒的侵袭`,
          );
          await era.printAndWait(`「汪！　汪汪！　啊呼…♪」`);
          await era.printAndWait(
            `哪里还找得到曾经的高傲，如今不过是一头淫兽罢了`,
          );
        } else {
          await era.printAndWait(`${target_name}和野兽激烈地碰撞着`);
          await era.printAndWait(
            `「${sc()}、是狗先生的奴隶！　请饲养${sc()}吧♪　拜托了♪」`,
          );
          await era.printAndWait(
            `这谄媚地望向野狗的身姿，已经找不到曾经的傲慢`,
          );
        }
        // CFLAG:322  = 7（变量语义：CFLAG 族，322）
        kojo.背后位 = 7;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait('');
        } else if (rand_n(2) === 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:322  = 6（变量语义：CFLAG 族，322）
        kojo.背后位 = 6;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.背后位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait('');
        } else if (rand_n(2) === 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:322  = 5（变量语义：CFLAG 族，322）
        kojo.背后位 = 5;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:322  = 4（变量语义：CFLAG 族，322）
        kojo.背后位 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:322  = 3（变量语义：CFLAG 族，322）
        kojo.背后位 = 3;
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait('');

        // CFLAG:322  = 2（变量语义：CFLAG 族，322）
        kojo.背后位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 27) {
    if (kojo.背后位肛交 === 0) {
      if ((era.get(`talent:${target}:136`) || 0) === 1) {
        await era.printAndWait('');
      } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait('');
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328）
      kojo.背后位肛交 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:136`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背后位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「狗先生、好粗…肛门都被撑开了…」`);
        } else {
          await era.printAndWait(
            `「啊啊…狗先生…${sc()}的小穴和肛门感觉如何…？」`,
          );
        }
        // CFLAG:328  = 7（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 7;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背后位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:328  = 6（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 6;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背后位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:328  = 5（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.背后位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:328  = 4（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 4;
      } else if (
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背后位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:328  = 3（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 3;
      } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait('');
        // CFLAG:328  = 2（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 30) {
    if (kojo.手淫 === 0) {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait('');
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait('');
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331）
      kojo.手淫 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:136`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.手淫 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「给狗先生服务好幸福…♪」`);
        } else {
          await era.printAndWait(`「撸啊撸啊撸♪」`);
        }
        // CFLAG:331  = 7（变量语义：CFLAG 族，331）
        kojo.手淫 = 7;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.手淫 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:331  = 6（变量语义：CFLAG 族，331）
        kojo.手淫 = 6;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.手淫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:331  = 5（变量语义：CFLAG 族，331）
        kojo.手淫 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.手淫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:331  = 4（变量语义：CFLAG 族，331）
        kojo.手淫 = 4;
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.手淫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:331  = 3（变量语义：CFLAG 族，331）
        kojo.手淫 = 3;
      } else if (kojo.手淫 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait('');
        // CFLAG:331  = 2（变量语义：CFLAG 族，331）
        kojo.手淫 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 31) {
    if (kojo.口交_奴 === 0) {
      if ((era.get(`talent:${target}:136`) || 0) === 1) {
        await era.printAndWait(`「野兽鸡巴♪　我要开动咯♪」`);
      } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(`「唔诶……野兽的味道……」`);
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(`「唔诶……野兽的味道……」`);
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        await era.printAndWait(`「好的……照做不就行了嘛」`);
      } else {
        await era.printAndWait(`「唔噗呜……呕诶……讨厌」`);
      }
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332）
      kojo.口交_奴 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:136`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.口交_奴 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「狗先生，请不要客气，把精液注入我下贱的嘴里吧♪」`,
        );
        // CFLAG:332  = 8（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 8;
      } else if (
        (era.get(`talent:${target}:136`) || 0) === 1 &&
        (kojo.口交_奴 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈唔……啾……觉得舒服吗♪」`);
        // CFLAG:332  = 7（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 7;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.口交_奴 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「野兽虽然臭臭的……但是可以啊、可以啊」`);
        // CFLAG:332  = 6（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 6;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.口交_奴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呜……野兽的味道」`);
        // CFLAG:332  = 5（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「野兽虽然臭臭的……但我会尽力的」`);
        // CFLAG:332  = 4（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 4;
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.口交_奴 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呜呜……服务它就可以了吧」`);
        // CFLAG:332  = 3（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 3;
      } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「呜噗……呕诶……讨厌」`);
        // CFLAG:332  = 2（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 34) {
    if (kojo.骑乘位 === 0) {
      if ((era.get(`talent:${target}:0`) || 0) === 1) {
        if ((era.get(`talent:${target}:136`) || 0) === 1) {
          await era.printAndWait('');
        } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
          await era.printAndWait('');
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      } else {
        if ((era.get(`talent:${target}:136`) || 0) === 1) {
          await era.printAndWait('');
        } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
          await era.printAndWait('');
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      }
      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335）
      kojo.骑乘位 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:136`) || 0) === 1 &&
        (kojo.骑乘位 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait('');
        } else if (rand_n(2) === 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:335  = 7（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 7;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.骑乘位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(4) === 0) {
          await era.printAndWait('');
        } else if (rand_n(3) === 0) {
          await era.printAndWait('');
        } else if (rand_n(2) === 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:335  = 6（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 6;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.骑乘位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(4) === 0) {
          await era.print('');
        } else if (rand_n(3) === 0) {
          await era.printAndWait('');
        } else if (rand_n(2) === 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:335  = 5（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 5;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (kojo.骑乘位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(4) === 0) {
          await era.printAndWait('');
        } else if (rand_n(3) === 0) {
          await era.printAndWait('');
        } else if (rand_n(2) === 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:335  = 4（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.骑乘位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.print('');
        await era.printAndWait('');
        // CFLAG:335  = 3（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 3;
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait('');
        // CFLAG:335  = 2（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 37) {
    if (kojo.肛门侍奉 === 0) {
      if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338）
      kojo.肛门侍奉 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:136`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.肛门侍奉 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「狗先生的肛门，看起来好诱人呢…♪」`);
        // CFLAG:338  = 6（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 6;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:338  = 5（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.print('');
        // CFLAG:338  = 4（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 4;
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:338  = 3（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 3;
      } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait('');
        // CFLAG:338  = 2（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 43 && era.get(`tequip:${target}:43`)) {
    if (kojo.眼罩 === 0) {
      if ((era.get(`talent:${target}:136`) || 0) === 1) {
        await era.printAndWait('');
      } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait('');
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344）
      kojo.眼罩 = 1;
      return 0;
    } else {
      if (
        (era.get(`talent:${target}:136`) || 0) === 1 &&
        (kojo.眼罩 <= 9 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 10（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 10;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.眼罩 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 9;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.眼罩 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 8;
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.眼罩 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 7;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.眼罩 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 6;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.眼罩 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 5;
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.眼罩 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 4;
      } else if (
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.眼罩 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 3;
      } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 2;
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 43 &&
    era.get(`tequip:${target}:43`) === 0
  ) {
    if (
      (era.get(`talent:${target}:136`) || 0) === 1 &&
      (kojo.眼罩着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('');
      // CFLAG:380  = 4（变量语义：CFLAG 族，380）
      kojo.眼罩着脱 = 4;
    } else if (
      (era.get(`talent:${target}:76`) || 0) === 1 &&
      (kojo.眼罩着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('');
      // CFLAG:380  = 3（变量语义：CFLAG 族，380）
      kojo.眼罩着脱 = 3;
    } else if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (kojo.眼罩着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('');
      // CFLAG:380  = 2（变量语义：CFLAG 族，380）
      kojo.眼罩着脱 = 2;
    } else if (kojo.眼罩着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait('');
      // CFLAG:380  = 1（变量语义：CFLAG 族，380）
      kojo.眼罩着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 56) {
    if (kojo.交谈 === 0) {
      if (era.get(`tequip:${target}:53`)) {
        if ((era.get(`talent:${target}:136`) || 0) === 1) {
          await era.printAndWait(`「你好啊♪　这里是${target_name}♪」`);
          await era.printAndWait(
            `「很惊讶吧，以后${sc()}，就会住在你旁边一直和你做爱哟♪」`,
          );
          await era.printAndWait(
            `「${sc()}啊♪已经成为比狗狗还下贱的家畜了♪跟狗先生缔结了奴隶契约的说♪」`,
          );
          await era.printAndWait(
            `「可不要因为${sc()}像是野兽一样的低贱地和狗交配就蔑视我哟♪」`,
          );
        } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
          await era.printAndWait('');
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      }
      // CFLAG:357  = 1（变量语义：CFLAG 族，357）
      kojo.交谈 = 1;
      return 0;
    } else {
      if (era.get(`tequip:${target}:53`)) {
        if (
          (era.get(`talent:${target}:136`) || 0) === 1 &&
          (kojo.交谈 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「你好啊♪　这里是${target_name}♪」`);
          await era.printAndWait(
            `「很惊讶吧、以后${sc()}，就会住在你旁边一直和你做爱哟♪」`,
          );
          await era.printAndWait(
            `「${sc()}啊♪已经成为比狗狗还下贱的家畜了♪跟狗先生缔结了奴隶契约的说♪」`,
          );

          if ((era.get(`abl:${target}:39`) || 0) >= 6) {
            await era.printAndWait(
              `「阴道和子宫已经完全成了狗肉棒专用的了啦♪」`,
            );
          }

          if ((era.get(`talent:${target}:317`) || 0) === 4) {
            await era.printAndWait(
              `「恋人……？嗯，已经没办法生他的孩子了啦♪　抱歉了啦♪♪」`,
            );
          }
          await era.printAndWait(
            `「可不要因为${sc()}像是野兽一样的低贱地和狗交配就蔑视我哟♪」`,
          );
          // CFLAG:357  = 5（变量语义：CFLAG 族，357）
          kojo.交谈 = 5;
        } else if (
          (era.get(`talent:${target}:76`) || 0) === 1 &&
          (kojo.交谈 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait('');
          // CFLAG:357  = 4（变量语义：CFLAG 族，357）
          kojo.交谈 = 4;
        } else if (
          (era.get(`talent:${target}:85`) || 0) === 1 &&
          (kojo.交谈 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait('');
          // CFLAG:357  = 3（变量语义：CFLAG 族，357）
          kojo.交谈 = 3;
        } else if (kojo.交谈 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait('');
          // CFLAG:357  = 2（变量语义：CFLAG 族，357）
          kojo.交谈 = 2;
        }
      }
      return 0;
    }
  }

  return 0;
}

// kojo_message_palamcng_6

async function kojo_message_palamcng_6(rand) {
  const {
    rand_n,
    target,
    assi,
    target_name,
    player_name,
    assi_name,
    master_name,
    sc,
    scf,
    view,
    kojo,
  } = bind_ctx(rand);
  let P = 0;
  let A = 0;

  if (era_flag.assi > 0 && era_flag.assiplay) {
    return 0;
  }

  if (era.get(`tequip:${target}:45`)) {
    return 0;
  }

  if ((era.get(`talent:${target}:9`) || 0) === 1) {
    return 0;
  }

  if (era.get(`tequip:${target}:55`)) {
    return 0;
  }

  if (game.train.失神) {
    return 0;
  }

  P = (era.get(`palam:${target}:3`) || 0) + (era.get(`delta:${target}:3`) || 0); // PALAM:3 + UP:3
  if (P > PALAMLV[2] && kojo.首次润滑Lv2 === 0) {
    if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (era.get(`talent:${target}:76`) || 0) === 1
    ) {
      if (era_flag.selectcom === 50) {
        await era.printAndWait(
          `${target_name}饶有兴味地研究着自己大腿间流下的润滑液………`,
        );
        await era.printAndWait(`―――润滑第一次超过LV2了`);
      } else {
        await era.printAndWait(
          `${target_name}因为过于兴奋而摩擦着双脚，小穴已经爱液泛滥。`,
        );
        await era.printAndWait(`「${scf()}…${sc()}已经湿了呢………」`);
        await era.printAndWait(`―――润滑第一次超过LV2了`);
      }
    } else {
      if (era_flag.selectcom === 50) {
        await era.printAndWait(
          `${target_name}饶有兴味地研究着自己大腿间流下的润滑液………`,
        );
        await era.printAndWait(`―――润滑第一次超过LV2了`);
      } else {
        await era.printAndWait(
          `${target_name}的小穴因为兴奋的缘故变得湿润起来。`,
        );
        await era.printAndWait(`「${scf()}、${sc()}才没有什么感觉…！」`);
        await era.printAndWait(`―――润滑第一次超过LV2了`);
      }
    }
    // CFLAG:TARGET:221  = 1（变量语义：CFLAG 族，TARGET:221）
    kojo.首次润滑Lv2 = 1;
  }

  P = (era.get(`palam:${target}:5`) || 0) + (era.get(`delta:${target}:5`) || 0); // PALAM:5 + UP:5
  if (P > PALAMLV[2] && kojo.首次欲情Lv2 === 0) {
    if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (era.get(`talent:${target}:76`) || 0) === 1
    ) {
      if (era_flag.selectcom === 51) {
        await era.print('');
        await era.printAndWait(
          `媚药发作的${target_name}不仅嘴巴张开，耳朵也因为发情变得通红。`,
        );
        await era.printAndWait(
          `「对${sc()}用…用这样的药…啊啊啊…不行…大脑已经完全无法思考了…${heart(1)}」`,
        );
        await era.printAndWait(`―――欲情第一次超过LV2`);
      } else {
        await era.print('');
        await era.printAndWait(
          `${target_name}脸上带着之前从未有过的欲望看向${player_name}。`,
        );
        await era.printAndWait(`「啊啊啊…想马上就把你推倒…${heart(1)}」`);
        await era.printAndWait(`―――欲情第一次超过LV2`);
      }
    } else {
      if (era_flag.selectcom === 51) {
        await era.print('');
        await era.printAndWait(
          `媚药发作使得${target_name}不得不张开嘴巴，发出粗重的喘息。`,
        );
        await era.printAndWait(
          `「哈啊啊啊…卑鄙的家、家伙…用这种…肮、肮脏的…手段…！ 啊啊啊…啊啊…身体好热！」`,
        );
        await era.printAndWait(`―――欲情第一次超过LV2`);
      } else {
        await era.print('');
        await era.printAndWait(
          `${target_name}脸颊染上一层春色，露出松懈的表情。`,
        );
        await era.printAndWait(
          `「${scf()}、${sc()}…怎么有点、有点想要的样子…嗯啊……」`,
        );
        await era.printAndWait(`―――欲情第一次超过LV2`);
      }
    }
    // CFLAG:222  = 1（变量语义：CFLAG 族，222）
    kojo.首次欲情Lv2 = 1;
  }

  P = (era.get(`palam:${target}:8`) || 0) + (era.get(`delta:${target}:8`) || 0); // PALAM:8 + UP:8
  if (P > PALAMLV[2] && kojo.首次耻情Lv2 === 0) {
    if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (era.get(`talent:${target}:76`) || 0) === 1
    ) {
      await era.print('');
      await era.printAndWait(
        `注意到自己做了太过于羞耻的事情，${target_name}的脸因为耻辱变得通红。`,
      );
      await era.printAndWait(`「啊………不…不准…呜…看…看我啊」`);
      await era.printAndWait(`―――耻情第一次超过LV2`);
    } else {
      await era.print('');
      await era.printAndWait(`${target_name}因为耻辱耳根通红。`);
      await era.printAndWait(`「呜呜…不、不准看我………！」`);
      await era.printAndWait(`―――耻情第一次超过LV2`);
    }
    // CFLAG:223  = 1（变量语义：CFLAG 族，223）
    kojo.首次耻情Lv2 = 1;
  }

  P =
    (era.get(`palam:${target}:10`) || 0) + (era.get(`delta:${target}:10`) || 0); // PALAM:10 + UP:10
  if (P > PALAMLV[2] && kojo.首次恐怖Lv2 === 0) {
    if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (era.get(`talent:${target}:76`) || 0) === 1
    ) {
      await era.print('');
      await era.printAndWait(`${target_name}因为这意想不到的情况而脸色铁青……`);
      await era.printAndWait(`―――恐怖第一次超过LV2`);
    } else {
      await era.print('');
      await era.printAndWait(`${target_name}因为恐怖而脸色扭曲………`);
      await era.printAndWait(`―――恐怖第一次超过LV2`);
    }
    // CFLAG:224  = 1（变量语义：CFLAG 族，224）
    kojo.首次恐怖Lv2 = 1;
  }

  if ((era.get(`nowex:${target}:0`) || 0) > 0 && kojo.首次C绝顶 === 0) {
    if ((era.get(`talent:${target}:85`) || 0) === 1) {
      await era.printAndWait(
        `「啊啊啊啊…去了！去啦！…${sc()}要去啦！～…唔哦哦哦哦！！～${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}的阴蒂受到刺激第一次到达了绝顶。`);
      await era.printAndWait(`这使她表情呆滞，口中有唾液垂下………`);
    } else {
      await era.printAndWait(
        `「啊啊啊啊…下面、下面的那里…要去了…忍不住了…啊啊啊…呜啊啊哈啊！」`,
      );
      await era.printAndWait(`${target_name}的阴蒂受到刺激第一次到达了绝顶………`);

      if (
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0
      ) {
        await era.printAndWait(`「该、该死…被你这种家伙看到这样的丑态………」`);
      }
    }
    // CFLAG:225  = 1（变量语义：CFLAG 族，225）
    kojo.首次C绝顶 = 1;
  }

  if ((era.get(`nowex:${target}:1`) || 0) > 0 && kojo.首次V绝顶 === 0) {
    if ((era.get(`talent:${target}:76`) || 0) === 1) {
      await era.printAndWait(
        `「啊啊啊啊${sc()}淫荡的小穴高潮了呜呜${heart(1)}…哈啊整个高潮的过程都被看得一清二楚呢${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}第一次达到了高潮，发出一阵又一阵高亢的呻吟………`,
      );
    } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
      await era.printAndWait(
        `「有、呜…呜…${sc()}…有奇…奇怪的感觉…${heart(1)}…啊啊啊啊啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}第一次达到了阴道绝顶，气喘吁吁筋疲力尽地娇喘着靠在你的肩上。`,
      );
      await era.printAndWait(`「这就是高潮的感觉啊…啊啊啊${heart(1)}」`);
    } else if (
      (era.get(`mark:${target}:3`) || 0) === 3 &&
      (era.get(`talent:${target}:85`) || 0) === 0 &&
      (era.get(`talent:${target}:76`) || 0) === 0
    ) {
      await era.printAndWait(
        `「住、住手啊…啊啊啊啊…快停下来…不要再侵犯我的小穴了啊…啊啊啊啊！…呜呜…啊呜咕咕呜！」`,
      );
      await era.printAndWait(
        `${target_name}第一次达到了阴道绝顶，眼神空洞地发着呆，小声嘀咕着什么。`,
      );
      await era.printAndWait(`「已经…该死…讨厌的家伙…明明不想的…却………」`);
    } else {
      await era.printAndWait(
        `「啊啊啊…呀呀呀…为什么…有一种糟糕的感觉…啊啊啊呜啊啊！」`,
      );
      await era.printAndWait(
        `${target_name}第一次达到了高潮，发出一阵又一阵高亢的呻吟………`,
      );
    }
    // CFLAG:TARGET:226  = 1（变量语义：CFLAG 族，TARGET:226）
    kojo.首次V绝顶 = 1;
  }

  if ((era.get(`nowex:${target}:2`) || 0) > 0 && kojo.首次A绝顶 === 0) {
    if ((era.get(`talent:${target}:76`) || 0) === 1) {
      await era.printAndWait(
        `「屁股…屁股也…要去了…哇啊呜呜呜${heart(1)} …啊啊啊…屁股传来这新鲜的感觉…咿咿${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}迎来了第一次肛门绝顶，脸上浮现出一层粉红色的春潮………`,
      );
    } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
      await era.printAndWait(
        `「啊啊…啊啊啊…屁、屁股${heart(1)}…要去了啊啊啊…啊啊…啊呜呜呜呜${heart(1)}…哈啊啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}第一次感受到了高潮，口大大地张开垂下一行唾液………`,
      );
    } else if (
      (era.get(`mark:${target}:3`) || 0) === 3 &&
      (era.get(`talent:${target}:85`) || 0) === 0 &&
      (era.get(`talent:${target}:76`) || 0) === 0
    ) {
      await era.printAndWait(
        `「哈…啊啊啊啊！别、别再玩弄我的屁股了！停下来啊啊！………啊啊啊呜呜呜咕咕咕！」`,
      );
      await era.printAndWait(
        `${target_name}第一次达到了肛门绝顶，双目无神留下了大颗大颗的眼泪。`,
      );
      await era.printAndWait(`「${sc()}…已经…已经不行了………」`);
    } else {
      await era.printAndWait(
        `「屁股、快要忍不住了！ 呜…要去了…啊啊啊啊啊…不，呜呜…不要啊啊…呜呜呜！」`,
      );
      await era.printAndWait(
        `${target_name}第一次达到了肛门绝顶。在呆滞了一会儿之后，泪水顺着脸庞流下………`,
      );
    }
    // CFLAG:227  = 1（变量语义：CFLAG 族，227）
    kojo.首次A绝顶 = 1;
  }

  if ((era.get(`nowex:${target}:3`) || 0) > 0 && kojo.首次B绝顶 === 0) {
    if ((era.get(`talent:${target}:85`) || 0) === 1) {
      await era.printAndWait(
        `「淫、淫荡的胸部${heart(1)}…啊啊…啊呜…啊呜呜呜${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}的胸部第一次因为刺激而高潮了………`);
    } else {
      await era.printAndWait(
        `「啊啊啊…胸部…明明只是被玩弄了而已…呜…唔啊……呜呜呜！」`,
      );
      await era.printAndWait(`${target_name}的胸部第一次因为刺激而高潮了………`);

      if (
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0
      ) {
        await era.printAndWait(`「胸部，高潮了么…这下贱的身体…呜呜」`);
      }
    }
    // CFLAG:TARGET:228  = 1（变量语义：CFLAG 族，TARGET:228）
    kojo.首次B绝顶 = 1;
  }

  A =
    (era.get(`delta:${target}:11`) || 0) + (era.get(`delta:${target}:12`) || 0); // UP:11 + UP:12
  if (game.train.处女丧失 === 1 && kojo.处女丧失 === 0) {
    if (game.train.主人导致处女丧失 === 1) {
      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (A < 500 || game.system.反抗刻印回避 === 1)
      ) {
        await era.printAndWait(`「啊啊啊啊…这样…就能享受更多的调教了吧？」`);
        await era.printAndWait(
          `${target_name}妖艳地笑着，脸上丝毫不见被破处的疼痛与失落。`,
        );
        await era.printAndWait(
          `「${sc()}…把第一次给了魔王大人也很高兴呢，请狠狠地调教我…开心得快要疯了呢…！」`,
        );
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (A < 500 || game.system.反抗刻印回避 === 1)
      ) {
        await era.printAndWait(`「${scf()}、${sc()}的第一次…啊…很意外吗…？」`);
        await era.printAndWait(
          `${player_name}不禁点了点头，${target_name}扑哧一声笑了出来。`,
        );
        await era.printAndWait(
          `「${sc()}…想要…把自己的第一次…给喜欢的人啊…啊啊啊${heart(1)}」`,
        );
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0
      ) {
        await era.printAndWait(
          `「哇啊……好后悔…第一次给了…你这样的混蛋………！啊啊啊啊啊！呜啊啊啊啊啊………」`,
        );
        await era.printAndWait(
          `看到自己双腿间流出的血液，${target_name}大哭起来………`,
        );
      } else {
        await era.printAndWait(
          `「痛！很痛啊…快、快拔出去…！ 这样的事情…不要啊！」`,
        );
        await era.printAndWait(
          `${target_name}的处女之身被无情夺走，在${player_name}面前低下了头………`,
        );
      }
    } else {
      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        await era.printAndWait(
          `「啊哈哈…终于${sc()}也已经完成了“成人礼”了呢${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}对大腿间流出的血液熟视无睹。`);
        await era.printAndWait(`「接下来…进行更多的调教吧？」`);
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        await era.printAndWait(`「啊啊…这么多血………啊啊………」`);
        await era.printAndWait(`${target_name}的大腿间流出了血液………`);
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0
      ) {
        await era.printAndWait(
          `「早知道是这种结果…处女什么的还不如自己弄破呢………」`,
        );
        await era.printAndWait(
          `大腿间还留着血迹的${target_name}自言自语起来………`,
        );
      } else {
        await era.printAndWait(
          `「啊啊…很痛的啊…停下！该死！…啊啊啊…这是…血么………」`,
        );
        await era.printAndWait(
          `见到这意料之外的出血量${target_name}完全愣住了………`,
        );
      }
    }
    // CFLAG:TARGET:229  = 1（变量语义：CFLAG 族，TARGET:229）
    kojo.处女丧失 = 1;
  }
}

// kojo_message_markcng_6

async function kojo_message_markcng_6(rand) {
  const {
    rand_n,
    target,
    assi,
    target_name,
    player_name,
    assi_name,
    master_name,
    sc,
    scf,
    view,
    kojo,
  } = bind_ctx(rand);

  if (era.get(`tequip:${target}:45`)) {
    return 0;
  }

  if ((era.get(`talent:${target}:9`) || 0) === 1) {
    return 0;
  }

  if (game.system.苦痛刻印变动 === 3 && kojo.苦痛刻印Lv3 === 0) {
    if ((era.get(`talent:${target}:85`) || 0) === 1) {
      await era.printAndWait(`「啊啊啊…这就是所谓爱的痛楚吗…？」`);
      await era.printAndWait(`${target_name}一边痛苦地呻吟着一边勉强地笑了………`);
    } else {
      await era.printAndWait(`「啊呜…已、已经到极限了…${sc()}…呜呜呜」`);
      await era.printAndWait(`${target_name}因为这近乎极限的痛苦落泪不止………`);
    }
    // CFLAG:297  = 1（变量语义：CFLAG 族，297）
    kojo.苦痛刻印Lv3 = 1;
  }

  if (game.system.快乐刻印变动 === 3 && kojo.快乐刻印Lv3 === 0) {
    if ((era.get(`talent:${target}:85`) || 0) === 1) {
      await era.printAndWait(
        `「啊啊啊…${scf()}、${sc()}…做着这、这样令人舒服的事情…已经快、快要不行了…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}柔软的身体已经铭记了这种永生难忘的快乐………`,
      );
    } else {
      await era.printAndWait(`「啊啊啊…舒服到…骨髓里了呢…♪」`);
      await era.printAndWait(
        `${target_name}柔软的身体已经铭记了这种永生难忘的快乐………`,
      );
    }
    // CFLAG:298  = 1（变量语义：CFLAG 族，298）
    kojo.快乐刻印Lv3 = 1;
  }

  if (game.system.屈服刻印变动 === 3 && kojo.屈服刻印Lv3 === 0) {
    if ((era.get(`talent:${target}:85`) || 0) === 1) {
      await era.printAndWait(
        `「啊啊啊啊…从现在开始，想要做什么都行…我的…主人${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}的身心已经完全屈服了，这之后无论是怎样的调教都不会违抗吧………`,
      );
    } else {
      await era.printAndWait(`「已、已经不敢再违逆您了，主人…原谅我吧………」`);
      await era.printAndWait(
        `${target_name}经过调教终于完全屈服了，这样之后下命令应该会顺利很多吧………`,
      );
    }
    // CFLAG:299  = 1（变量语义：CFLAG 族，299）
    kojo.屈服刻印Lv3 = 1;
  }

  if (game.system.反抗刻印变动 === 3 && kojo.反抗刻印Lv3 === 0) {
    if ((era.get(`talent:${target}:85`) || 0) === 1) {
      await era.printAndWait(`「啊呜…为什么${sc()}会遇到这种事情…呜呜！」`);
      await era.printAndWait(
        `似乎是做得太过火了，${target_name}的眼睛里仿佛燃烧着一种名为仇恨的火焰………`,
      );
    } else {
      await era.printAndWait(`「啊呜…啊…呜呜…决、决不会忘记这样的屈辱…！！」`);
      await era.printAndWait(
        `似乎是做得太过火了，${target_name}的眼睛里仿佛燃烧着一种名为仇恨的火焰………`,
      );
    }
    // CFLAG:300  = 1（变量语义：CFLAG 族，300）
    kojo.反抗刻印Lv3 = 1;
  }
}

// self_kojo_k6

async function self_kojo_k6(rand) {
  const {
    rand_n,
    target,
    assi,
    target_name,
    player_name,
    assi_name,
    master_name,
    sc,
    scf,
    view,
    kojo,
  } = bind_ctx(rand);
  const Q = peek_aftertrain_q();
  const S = peek_aftertrain_s();
  const cstr2 = era.get(`cstr:${target}:2`) || '';

  if (game.train.初吻与自我口上 === 1) {
    if ((era.get(`talent:${target}:9`) || 0) === 1) {
      await era.printAndWait(`${target_name}像坏掉的玩具般疯狂地自慰着………`);
    } else if (Q === 1) {
      await era.printAndWait(
        `「啊啊…和${assi_name}的百合性交…好舒服呢…啊，呜…呼呼♪」`,
      );
      await era.printAndWait(
        `${target_name}一边回忆着与${assi_name}的交合过程一边自慰起来………`,
      );
    } else if (Q === 2) {
      await era.printAndWait(
        `「啊啊…啊啊啊！还是想跟狗狗做爱啊…想要狗狗的肉棒！」`,
      );
      await era.printAndWait(
        `${target_name}野兽般大声呼喊，继续着激烈地自慰………`,
      );
    } else {
      if (
        (era.get(`talent:${target}:76`) || 0) &&
        (kojo.调教后自慰 < 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呜呼…噢…喔喔…${heart(1)} 啊啊啊…更想做色色的事情了…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}想着${master_name}，在充斥着淫媚叫声的房间里不断地自慰着……`,
        );
        // CFLAG:261  = 4（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 4;
      } else if (
        (era.get(`talent:${target}:85`) || 0) &&
        (kojo.调教后自慰 < 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「魔王大人我………好想要……${heart(1)} 嗯……嗯……噢喔～${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}在床上扭动着身躯结束了自慰………`);
        // CFLAG:261  = 3（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 3;
      } else if (
        (era.get(`abl:${target}:31`) || 0) >= 3 &&
        (kojo.调教后自慰 < 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「已、已经…停不下来了…${scf()}、${sc()}…呜啊呜嗯…啊啊啊！」`,
        );
        await era.printAndWait(
          `自慰中毒的${target_name}的动作也不知道什么时候才能停下来………`,
        );
        // CFLAG:261  = 2（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 2;
      } else if (kojo.调教后自慰 < 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「哈啊哈啊…为什么，为什么${sc()}连这种事情都忍耐不住…呜…呜呼」`,
        );
        await era.printAndWait(
          `${target_name}满脸的不甘心，但手上的动作却越来越激烈了。`,
        );
        // CFLAG:261  = 1（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 1;
      }
    }
  }

  if (game.train.初吻与自我口上 === 2) {
    if ((era.get(`talent:${target}:9`) || 0) === 1) {
      await era.printAndWait(
        `${assi_name}玩弄着已经坏掉的${target_name}享受其中颓废的女同之乐………`,
      );
    } else if (
      (era.get(`talent:${target}:76`) || 0) &&
      (kojo.百合PLAY < 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「哈…啊啊…女人之间也可以性交呢…这样做爱好舒服${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}和${assi_name}像交尾的蛞蝓般扭在一起………`,
      );
      // CFLAG:262  = 5（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 5;
    } else if (
      (era.get(`talent:${target}:85`) || 0) &&
      (kojo.百合PLAY < 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊啊…啊呼…这件事…那个地方可是秘密哦！啊？…啊啊…呼…啊啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}一边用秘密作为借口，一边用手在${assi_name}的敏感部位抚摸。`,
      );
      // 同一行输出：无后缀 PRINTFORM 不换行，末行
      // PRINTFORMW 才收行；ELSE 支是同一行的另一支，前缀提到语句外共用（#621）
      const lily_front_6516 = `${assi_name}苦笑着和${target_name}以女人间特有的方式纠缠在一起，`;
      if (era_flag.time === 0) {
        await era.printAndWait(
          `${assi_name}苦笑着和${target_name}以女人间特有的方式纠缠在一起，直到黄昏………`,
        );
      } else {
        await era.printAndWait(lily_front_6516 + `直到夜幕渐深………`);
      }
      // CFLAG:262  = 4（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 4;
    } else if (
      (era.get(`abl:${target}:33`) || 0) >= 3 &&
      (kojo.百合PLAY < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊啊啊…原来跟女人做爱这么舒服…到了这里之后才发现呢♪」`,
      );
      // 同型（ELSE 支）
      const lily_front_6526 = `尝到百合滋味的${target_name}嬉笑着和${assi_name}纠缠着，`;
      if (era_flag.time === 0) {
        await era.printAndWait(
          `尝到百合滋味的${target_name}嬉笑着和${assi_name}纠缠着，直到黄昏………`,
        );
      } else {
        await era.printAndWait(lily_front_6526 + `直到夜幕渐深………`);
      }
      // CFLAG:262  = 3（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 3;
    } else if (
      (era.get(`abl:${target}:22`) || 0) >= 3 &&
      (kojo.百合PLAY < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「${sc()}才不喜欢百合什么的………呜…啊啊啊…还、还要…继续啊…♪」`,
      );
      await era.printAndWait(
        `${assi_name}舌尖湿润，温柔地吻着${target_name}的脸庞………`,
      );
      // CFLAG:262  = 2（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 2;
    } else if (kojo.百合PLAY < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(
        `「停、停下…${sc()}对这种事情没有兴趣啊…啊啊…要、要去了…啊啊啊！」`,
      );
      await era.printAndWait(
        `${target_name}摇着头抗拒着，但仍被${assi_name}玩弄于手指间………`,
      );
      // CFLAG:262  = 1（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 1;
    }
  }

  if (game.train.初吻与自我口上 === 3) {
    if ((era.get(`talent:${target}:9`) || 0) === 1) {
      await era.printAndWait(`「啊哈…精液的味道…呜啊呜嗯嗯…♪」`);
      await era.printAndWait(
        `${target_name}带着幼儿般放荡的表情，继续着扫除式的口交………`,
      );
    } else if (
      (era.get(`talent:${target}:76`) || 0) === 1 &&
      (kojo.朝口交 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊…呜呜…呜呜${heart(1)}…就这样接受${sc()}的侵犯吧…一大早就能品尝到浓厚的精液的感觉…难以忍受啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}一口将整个阴茎吞进嘴里用心舔舐，一边翻身骑在了你身上。`,
      );
      await era.printAndWait(
        `${master_name}在这种诱惑下起身轻松把${target_name}重新压到了身下。`,
      );
      await era.printAndWait(
        `「哼…不行么？ 真是出乎预料…那以后要记得主动到${sc()}的屋子里来哦…喂？」`,
      );
      // CFLAG:263  = 3（变量语义：CFLAG 族，263）
      kojo.朝口交 = 3;
    } else if (
      (era.get(`talent:${target}:85`) || 0) &&
      (kojo.朝口交 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊呜咿${heart(1)}…要开始了…呜呜呜…啊啊、早上好魔王大人${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}用舌头精心“清扫”着刚刚射精的阴茎。`,
      );
      await era.printAndWait(
        `「啊啊…不愧是魔王大人的肉棒，一整天都元气满满的，${sc()}忍不住要多弄几次了呢～」`,
      );
      await era.printAndWait(`${target_name}握着手里的阴茎嫣然一笑………`);
      // CFLAG:263  = 3（变量语义：CFLAG 族，263）
      kojo.朝口交 = 3;
    } else if (
      (era.get(`abl:${target}:16`) || 0) >= 5 &&
      (kojo.朝口交 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「呜呜…唔嗯…啊呜…哈哈…唔啊♪………真是诱人的肉棒，该进行早上的调教了哦………」`,
      );
      await era.printAndWait(
        `${target_name}周到地把肉棒吮吸得干干净净后轻轻叹息一声，转身走出了房间………`,
      );
      // CFLAG:263  = 2（变量语义：CFLAG 族，263）
      kojo.朝口交 = 2;
    } else if (kojo.朝口交 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(
        `「啊哈…哈…一大早就这么精神…再、再来一次就够了吧…该去调教了呢………」`,
      );
      await era.printAndWait(`${target_name}擦了擦满是精液的嘴角离开了屋子………`);
      // CFLAG:263  = 1（变量语义：CFLAG 族，263）
      kojo.朝口交 = 1;
    }
  }

  if (game.train.初吻与自我口上 === 4) {
    if (
      (era.get(`talent:${target}:9`) || 0) === 1 &&
      (kojo.调教后性交 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `即使${target_name}已经被玩坏了也无法忘怀做爱的快感啊………`,
      );
      // CFLAG:264  = 3（变量语义：CFLAG 族，264）
      kojo.调教后性交 = 3;
    } else if (
      (era.get(`abl:${target}:2`) || 0) >= 4 &&
      (kojo.调教后性交 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `已经完全被开发了的${target_name}的阴道在${player_name}阴茎的不断抽插下，产生了难以言喻的快感。`,
      );
      await era.printAndWait(`「啊啊啊…能像这样抱着…${sc()}…${sc()}好幸福！」`);
      if (S >= 3) {
        await era.printAndWait(`${target_name}在${S}回中出后满足了………`);
      }
      // CFLAG:264  = 2（变量语义：CFLAG 族，264）
      kojo.调教后性交 = 2;
    } else if (kojo.调教后性交 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「啊啊…哈啊…啊啊…抱紧我…抱紧点…啊…啊啊啊啊！」`);
      await era.printAndWait(
        `化身为一条母狗的${target_name}紧紧抱住${player_name}不愿放开………`,
      );
      // CFLAG:264  = 1（变量语义：CFLAG 族，264）
      kojo.调教后性交 = 1;
    }
  }

  if (game.train.初吻与自我口上 === 5) {
    if (
      (era.get(`talent:${target}:9`) || 0) === 1 &&
      (kojo.夜袭 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊啊啊…啊啊…想要大肉棒…哈哈………」`);
      await era.printAndWait(
        `${target_name}被欲望控制，像个梦游症病人般进入了${master_name}的屋子………`,
      );
      // CFLAG:265  = 2（变量语义：CFLAG 族，265）
      kojo.夜袭 = 2;
    } else if (kojo.夜袭 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「${sc()}觉得…监禁屋的锁也不过如此嘛………」`);
      await era.printAndWait(`${target_name}拉着${master_name}上了床。`);
      await era.printAndWait(
        `「像是…嗯…这样的话，无论什么时候袭击都是可行的吧？啊哈哈哈♪」`,
      );
      // CFLAG:265  = 1（变量语义：CFLAG 族，265）
      kojo.夜袭 = 1;
    }
  }

  if (game.train.初吻与自我口上 === 6) {
    if ((era.get(`talent:${target}:9`) || 0) === 1) {
      await era.printAndWait(
        `「啊啊啊啊…终于出来了…${sc()}已经自由了…哈哈哈哈哈」`,
      );
      await era.printAndWait(
        `见到这一幕来取货的奴隶商人不禁皱了皱眉头，${master_name}装作什么也不知道的样子签下了契约书………`,
      );
    } else if (
      (era.get(`talent:${target}:85`) || 0) &&
      (era.get(`mark:${target}:3`) || 0) < 3
    ) {
      await era.printAndWait(
        `「背叛和被背叛什么的也不是第一次了…可还是没想到魔王大人也………」`,
      );
      await era.printAndWait(`${target_name}痛快地坐上了马车。`);
      await era.printAndWait(`没有上手铐和脚镣，一言不发地被送向远方………`);
    } else if ((era.get(`mark:${target}:3`) || 0) === 3) {
      await era.printAndWait(
        `「有件事给我记住…我一定会杀了你…一定要杀了你！」`,
      );
      await era.printAndWait(
        `暴怒的${target_name}最终被绳子捆起来，送到了马车上………`,
      );
    } else if (era.get(`talent:${target}:76`) || 0) {
      await era.printAndWait(
        `「${sc()}的小穴…一旦玩厌了…就被当成已经厌倦了的玩具般丢掉了呢………」`,
      );
      await era.printAndWait(
        `流着泪说着这样的话，${target_name}坐上马车，被卖往远方………`,
      );
    } else {
      await era.printAndWait(
        `「输给魔王被俘，性命就由不得自己掌控了…这种说法哪有道理啊！该死！${sc()}不想被卖啊！」`,
      );
      await era.printAndWait(`${target_name}哭叫着被绑上了马车………`);
    }
    await era.print('');
    if ((era.get(`talent:${target}:122`) || 0) !== 1) {
      await sell_maturo_k0(target, { rand }); // CALL SELL_MATURO_K0
    }
  }

  if (game.train.初吻与自我口上 === 11) {
    if (kojo.妊娠发觉 === 0) {
      if ((era.get(`talent:${target}:9`) || 0) === 1) {
        await era.printAndWait(
          `「${sc()}的肚子里好像有什么东西呢…啊啊啊，这家伙大概会把${sc()}整个吃掉吧…啊哈哈哈哈」`,
        );
        await era.printAndWait(
          `以${target_name}的精神状况已经无法认清怀孕的事实了………`,
        );
      } else if (view.event.妊娠相手 === 1) {
        if (era.get(`talent:${target}:85`) || 0) {
          await era.printAndWait(
            `「魔王大人快来摸摸哟…${sc()}的肚子里已经有魔王大人的孩子了呢…${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}出神地用手摩挲着小腹………`);
        } else if (era.get(`talent:${target}:76`) || 0) {
          await era.printAndWait(
            `「啊啊…肚子里已经怀有魔王大人的孩子了…这样的情况下被魔王大人侵犯一定会很舒服吧？」`,
          );
          await era.printAndWait(
            `${target_name}摸着下腹部，用舌头舔了舔嘴唇………`,
          );
        } else {
          await era.printAndWait(
            `「难道…是…魔王的孩子…${sc()}肚子里的那东西…啊啊啊」`,
          );
          await era.printAndWait(
            `${target_name}因为这巨大的打击不禁潸然泪下………`,
          );
        }
      } else if (view.event.妊娠相手 === 2) {
        await era.printAndWait(`「难道是有了…${cstr2}的孩子吗………」`);
        await era.printAndWait(`意外的怀孕让${target_name}的脸色十分难看………`);
      } else if (view.event.妊娠相手 === 3) {
        await era.printAndWait(`「难道是有了…${cstr2}的孩子吗………」`);
        await era.printAndWait(`意外的怀孕让${target_name}的脸色十分难看………`);
      } else if (view.event.妊娠相手 === 5) {
        if ((era.get(`talent:${target}:136`) || 0) === 1) {
          await era.printAndWait(
            `「啊哈哈哈！竟然生下了狗先生的孩子，真是幸运啊」`,
          );
        } else {
          await era.printAndWait(
            `「唔啊啊…野狗的孩子孕育在${sc()}的肚子里，这是什么鬼东西啊………啊！」`,
          );
          await era.printAndWait(
            `${target_name}因为自己的身体失陷于兽类而流下了懊恼的泪水………`,
          );
        }
      } else if (view.event.妊娠相手 === 7) {
        await era.printAndWait(`「${sc()}怀了狂王殿下的…真的…？」`);
      } else {
        await era.printAndWait(
          `「啊啊…${sc()}肚子里怀的到底是谁的孩子啊………！」`,
        );
      }
      // CFLAG:271  = 1（变量语义：CFLAG 族，271）
      kojo.妊娠发觉 = 1;
    } else {
      if ((era.get(`talent:${target}:9`) || 0) === 1) {
        await era.printAndWait(
          `「${sc()}的肚子里好像有什么东西呢…啊啊啊，这家伙大概会把${sc()}整个吃掉吧…啊哈哈哈哈」`,
        );
        await era.printAndWait(
          `以${target_name}的精神状况已经无法认清怀孕的事实了………`,
        );
      } else if (view.event.妊娠相手 === 1) {
        if (era.get(`talent:${target}:85`) || 0) {
          await era.printAndWait(
            `「魔王大人快来摸摸哟…${sc()}的肚子里已经有魔王大人的孩子了呢…${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}出神地用手摩挲着小腹………`);
        } else if (era.get(`talent:${target}:76`) || 0) {
          await era.printAndWait(
            `「啊啊…肚子里已经怀有魔王大人的孩子了…这样的情况下被魔王大人侵犯一定会很舒服吧？」`,
          );
          await era.printAndWait(
            `${target_name}摸着下腹部，用舌头舔了舔嘴唇………`,
          );
        } else {
          await era.printAndWait(
            `「难道…是…魔王的孩子…${sc()}肚子里的那东西…啊啊啊」`,
          );
          await era.printAndWait(
            `${target_name}因为这巨大的打击不禁潸然泪下………`,
          );
        }
      } else if (view.event.妊娠相手 === 2) {
        await era.printAndWait(`「难道是有了…${cstr2}的孩子吗………」`);
        await era.printAndWait(`意外的怀孕让${target_name}的脸色十分难看………`);
      } else if (view.event.妊娠相手 === 3) {
        await era.printAndWait(`「难道是有了…${cstr2}的孩子吗………」`);
        await era.printAndWait(`意外的怀孕让${target_name}的脸色十分难看………`);
      } else if (view.event.妊娠相手 === 5) {
        if ((era.get(`talent:${target}:136`) || 0) === 1) {
          await era.printAndWait(
            `「啊哈哈哈！竟然生下了狗先生的孩子，真是幸运啊」`,
          );
        } else {
          await era.printAndWait(
            `「唔啊啊…野狗的孩子孕育在${sc()}的肚子里，这是什么鬼东西啊………啊！」`,
          );
          await era.printAndWait(
            `${target_name}因为自己的身体失陷于兽类而流下了懊恼的泪水………`,
          );
        }
      } else if (view.event.妊娠相手 === 7) {
        await era.printAndWait(`「${sc()}怀了狂王殿下的…真的…？」`);
      } else {
        await era.printAndWait(
          `「啊啊…${sc()}肚子里怀的到底是谁的孩子啊………！」`,
        );
      }
      // CFLAG:271  = 1（变量语义：CFLAG 族，271）
      kojo.妊娠发觉 = 1;
    }
  }

  if (game.train.初吻与自我口上 === 12) {
    if (kojo.生产 === 0) {
      if ((era.get(`talent:${target}:9`) || 0) === 1) {
        await era.printAndWait(
          `「孩、孩子出生了…${sc()}的可爱的小怪物…♪ 哈哈哈哈」`,
        );
        await era.printAndWait(
          `生产的过程平安地结束了，然而${target_name}崩坏的精神已经没救了吧………`,
        );
      } else if (view.event.妊娠相手 === 1) {
        if (era.get(`talent:${target}:85`) || 0) {
          await era.printAndWait(
            `「魔王大人的孩子哟…终于…这孩子的角和尾巴跟大人一模一样呢…${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}哄着怀里被布包裹的魔物婴儿………`);
        } else if (era.get(`talent:${target}:76`) || 0) {
          await era.printAndWait(
            `「呜呼呼…跟魔王大人一样喜欢袭击漂亮大姐姐的样子呢…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}带着些许失神的表情抚摸着怀中的孩子………`,
          );
        } else {
          await era.printAndWait(
            `「啊啊啊…已经生出了魔王的孩子呢…没法…回头了………」`,
          );
          await era.printAndWait(`${target_name}用细小的声音嘟哝着………`);
        }
      } else if (view.event.妊娠相手 === 2) {
        await era.printAndWait(
          `「哈哈…${cstr2}的孩子已经生下来了呢…孩子的哭声元气十足啊…」`,
        );
        await era.printAndWait(`${target_name}心满意足地点了点头………`);
      } else if (view.event.妊娠相手 === 3) {
        await era.printAndWait(
          `「哈哈…${cstr2}的孩子已经生下来了呢…孩子的哭声元气十足啊…」`,
        );
        await era.printAndWait(`${target_name}心满意足地点了点头………`);
      } else if (view.event.妊娠相手 === 4) {
        await era.printAndWait(`「哈啊，孩子出生了…啊啊啊啊…搞什么啊…」`);
      } else if (view.event.妊娠相手 === 5) {
        if ((era.get(`talent:${target}:136`) || 0) === 1) {
          await era.printAndWait(
            `「啊啊啊，如此元气十足的哭声，即使是${sc()}和狗的孩子也让人感觉动力十足呢♪」`,
          );
        } else {
          await era.printAndWait(
            `「呜呜呜…从哭声里就听得出来…${sc()}和狗的孩子已经生出来了啊………」`,
          );
        }
      } else if (view.event.妊娠相手 === 7) {
        await era.printAndWait(`「狂王殿下和…下贱的${sc()}的孩子…」`);
      } else {
        await era.printAndWait(
          `「啊啊…哈啊…那样的东西我都觉得肮脏啊！快扔掉好了！」`,
        );
        await era.printAndWait(
          `${target_name}完全无法接受这个事实，看都不想看这孩子一眼………`,
        );
      }
      // CFLAG:272  = 1（变量语义：CFLAG 族，272）
      kojo.生产 = 1;
    } else {
      if ((era.get(`talent:${target}:9`) || 0) === 1) {
        await era.printAndWait(
          `「孩、孩子出生了…${sc()}的可爱的小怪物…♪ 哈哈哈哈」`,
        );
        await era.printAndWait(
          `生产的过程平安地结束了，然而${target_name}崩坏的精神已经没救了吧………`,
        );
      } else if (view.event.妊娠相手 === 1) {
        if (era.get(`talent:${target}:85`) || 0) {
          await era.printAndWait(
            `「魔王大人的孩子哟…终于…这孩子的角和尾巴跟大人一模一样呢…${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}哄着怀里被布包裹的魔物婴儿………`);
        } else if (era.get(`talent:${target}:76`) || 0) {
          await era.printAndWait(
            `「呜呼呼…跟魔王大人一样喜欢袭击漂亮大姐姐的样子呢…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}带着些许失神的表情抚摸着怀中的孩子………`,
          );
        } else {
          await era.printAndWait(
            `「啊啊啊…已经生出了魔王的孩子呢…没法…回头了………」`,
          );
          await era.printAndWait(`${target_name}用细小的声音嘟哝着………`);
        }
      } else if (view.event.妊娠相手 === 2) {
        await era.printAndWait(
          `「哈哈…${cstr2}的孩子已经生下来了呢…孩子的哭声元气十足啊…」`,
        );
        await era.printAndWait(`${target_name}心满意足地点了点头………`);
      } else if (view.event.妊娠相手 === 3) {
        await era.printAndWait(
          `「哈哈…${cstr2}的孩子已经生下来了呢…孩子的哭声元气十足啊…」`,
        );
        await era.printAndWait(`${target_name}心满意足地点了点头………`);
      } else if (view.event.妊娠相手 === 4) {
        await era.printAndWait(`「哈啊，孩子出生了…啊啊啊啊…搞什么啊…」`);
      } else if (view.event.妊娠相手 === 5) {
        if ((era.get(`talent:${target}:136`) || 0) === 1) {
          await era.printAndWait(
            `「啊啊啊、如此元气十足的哭声，即使是${sc()}和狗的孩子也让人感觉动力十足呢♪」`,
          );
        } else {
          await era.printAndWait(
            `「呜呜呜…从哭声里就听得出来…${sc()}和狗的孩子已经生出来了啊………」`,
          );
        }
      } else if (view.event.妊娠相手 === 7) {
        await era.printAndWait(`「狂王殿下和…下贱的${sc()}的孩子…」`);
      } else {
        await era.printAndWait(
          `「啊啊…哈啊…那样的东西我都觉得肮脏啊！快扔掉好了！」`,
        );
        await era.printAndWait(
          `${target_name}完全无法接受这个事实，看都不想看这孩子一眼………`,
        );
      }
      // CFLAG:272  = 1（变量语义：CFLAG 族，272）
      kojo.生产 = 1;
    }
  }

  if (game.train.初吻与自我口上 === 13) {
    if (
      era.get(`talent:${target}:85`) ||
      0 ||
      era.get(`talent:${target}:76`) ||
      0
    ) {
      if (era.get(`talent:${target}:153`) || 0) {
        await era.printAndWait(
          `「哈…这样下去长大了的${sc()}也会恶贯满盈吗～」`,
        );
        await era.printAndWait(
          `${target_name}抚摸着这因为将要生产而膨大的肚子………`,
        );
      } else if (era.get(`talent:${target}:154`) || 0) {
        await era.printAndWait(
          `「什么啊…${sc()}给孩子喝牛奶这种事很奇怪吗？」`,
        );
        await era.printAndWait(`${target_name}漫不经心地哄着孩子………`);
      }
    }
    // CFLAG:273  = 1（变量语义：CFLAG 族，273）
    kojo.育儿室 = 1;
  }

  if (game.train.初吻与自我口上 === 14) {
    if (
      era.get(`talent:${target}:85`) ||
      0 ||
      era.get(`talent:${target}:76`) ||
      0
    ) {
      await era.printAndWait(
        `「大家…没什么好哭的，孩子走了反而更清静了不是么…呜」`,
      );
    }
    // CFLAG:274  = 1（变量语义：CFLAG 族，274）
    kojo.亲离 = 1;
  }

  if (game.train.初吻与自我口上 === 999) {
    if (era.get(`talent:${target}:85`) || 0) {
      await era.printAndWait(`明明，还还有值得留恋的东西啊…`);
    } else {
      await era.printAndWait(`就、就到此为止了吧。`);
    }
  }

  if (game.train.初吻与自我口上 === 998) {
    if (era.get(`talent:${target}:85`) || 0) {
      await era.printAndWait(`不能…陪你走到最后了`);
    } else {
      await era.printAndWait(`无法抵抗死神的召唤…`);
    }
  }

  // TFLAG:13  = 0（变量语义：TFLAG 族，13）
  game.train.初吻与自我口上 = 0;

  return 0;
}

// dungeon_ryouzyoku_k6

async function dungeon_ryouzyoku_k6(rand) {
  const {
    rand_n,
    target,
    assi,
    target_name,
    player_name,
    assi_name,
    master_name,
    sc,
    scf,
    view,
    kojo,
  } = bind_ctx(rand);

  if ((era.get(`talent:${target}:0`) || 0) === 1) {
    await era.printAndWait(`「这不可能…不可能吧…${sc()}的…处女之身…」`);

    if (
      (era.get(`talent:${target}:21`) || 0) === 1 ||
      (era.get(`talent:${target}:22`) || 0) === 1
    ) {
      await era.printAndWait(`「不可能…不…」`);

      return 0;
    } else if (
      (era.get(`talent:${target}:17`) || 0) === 1 ||
      (era.get(`talent:${target}:31`) || 0) === 1 ||
      (era.get(`talent:${target}:36`) || 0) === 1
    ) {
      await era.printAndWait(`「放过我！请您放过我！拜、拜托了…」`);

      if (
        (era.get(`talent:${target}:106`) || 0) === 1 ||
        (era.get(`exp:${target}:1`) || 0) > 0
      ) {
        await era.printAndWait(`「可以的话享用我的屁股吧！请…拜托了…帮帮我…」`);
      }

      if ((era.get(`exp:${target}:22`) || 0) > 0) {
        await era.printAndWait(`「需要的话请使用我的嘴巴吧！我会尽力的…」`);
      }
    } else if (
      (era.get(`talent:${target}:11`) || 0) === 1 ||
      (era.get(`talent:${target}:12`) || 0) === 1 ||
      (era.get(`talent:${target}:15`) || 0) === 1 ||
      (era.get(`talent:${target}:30`) || 0) === 1 ||
      (era.get(`talent:${target}:34`) || 0) === 1
    ) {
      await era.printAndWait(`「一定会杀了你的！总有一天会…会…杀死你…」`);
    } else if (
      (era.get(`talent:${target}:10`) || 0) === 1 ||
      (era.get(`talent:${target}:26`) || 0) === 1
    ) {
      await era.printAndWait(`「去死吧！都死掉啊…死掉就好了…」`);
    } else {
      await era.printAndWait(`「嘶…该死！！不想死啊！不想就这么死啊…」`);
    }
  } else {
    await era.printAndWait(`「不可能的…被这样的下等生物…」`);

    if (
      (era.get(`talent:${target}:21`) || 0) === 1 ||
      (era.get(`talent:${target}:22`) || 0) === 1
    ) {
      await era.printAndWait(`「不可能…不…」`);

      return 0;
    } else if (
      (era.get(`talent:${target}:17`) || 0) === 1 ||
      (era.get(`talent:${target}:31`) || 0) === 1 ||
      (era.get(`talent:${target}:36`) || 0) === 1
    ) {
      await era.printAndWait(
        `「饶我一命…求你了！放过我吧！想怎么使用${sc()}的身体都行！」`,
      );

      if (
        (era.get(`talent:${target}:106`) || 0) === 1 ||
        (era.get(`exp:${target}:1`) || 0) > 0
      ) {
        await era.printAndWait(
          `「我的肛交经验很丰富！就算玩坏我身上所有的洞也好…拜托了…」`,
        );
      }

      if ((era.get(`exp:${target}:22`) || 0) > 0) {
        await era.printAndWait(`「会努力用嘴服侍您的…拜托了…」`);
      }
    } else if (
      (era.get(`talent:${target}:11`) || 0) === 1 ||
      (era.get(`talent:${target}:12`) || 0) === 1 ||
      (era.get(`talent:${target}:15`) || 0) === 1 ||
      (era.get(`talent:${target}:30`) || 0) === 1 ||
      (era.get(`talent:${target}:34`) || 0) === 1
    ) {
      await era.printAndWait(`「一定会杀了你的！　总有一天会…会…杀死你…」`);
    } else if (
      (era.get(`talent:${target}:10`) || 0) === 1 ||
      (era.get(`talent:${target}:26`) || 0) === 1
    ) {
      await era.printAndWait(`「去死吧！都死掉啊…死掉就好了…」`);
    } else {
      await era.printAndWait(`「嘶…该死！！不想死啊！不想就这么死啊…」`);
    }
  }

  return 0;
}

// dungeon_ryouzyoku_after_k6

async function dungeon_ryouzyoku_after_k6(rand) {
  const {
    rand_n,
    target,
    assi,
    target_name,
    player_name,
    assi_name,
    master_name,
    sc,
    scf,
    view,
    kojo,
  } = bind_ctx(rand);

  if ((era.get(`talent:${target}:0`) || 0) === 1) {
    await era.printAndWait(`「呜呜呜…不要…唔啊啊」`);

    if (
      (era.get(`talent:${target}:21`) || 0) === 1 ||
      (era.get(`talent:${target}:22`) || 0) === 1
    ) {
      await era.printAndWait(`「呜…」`);

      return 0;
    }

    if ((era.get(`exp:${target}:1`) || 0) > 20) {
      await era.printAndWait(`「屁股…的感觉…」`);
      await era.printAndWait(`「呜呜呜…」`);
    }

    if ((era.get(`exp:${target}:22`) || 0) > 20) {
      await era.printAndWait(`「别让我再舔了…」`);
    }

    if ((era.get(`exp:${target}:20`) || 0) > 20) {
      await era.printAndWait(`「咕啊啊啊…」`);
    }
  } else {
    await era.printAndWait(`「呜…呼啊…呜…」`);

    if (
      (era.get(`talent:${target}:21`) || 0) === 1 ||
      (era.get(`talent:${target}:22`) || 0) === 1
    ) {
      await era.printAndWait(`「呜…」`);

      return 0;
    }

    if ((era.get(`exp:${target}:0`) || 0) > 20) {
      await era.printAndWait(`「有点…太过分了…」`);
      await era.printAndWait(`「要…坏掉了…」`);
    }

    if ((era.get(`exp:${target}:1`) || 0) > 20) {
      await era.printAndWait(`「屁股…的感觉…」`);
      await era.printAndWait(`「呜…」`);
    }

    if ((era.get(`exp:${target}:22`) || 0) > 20) {
      await era.printAndWait(`「别让我再舔了…」`);
    }

    if ((era.get(`exp:${target}:20`) || 0) > 20) {
      await era.printAndWait(`「咕啊啊啊…」`);
    }
  }

  return 0;
}

// benki_koujo_k6

async function benki_koujo_k6(rand) {
  const {
    rand_n,
    target,
    assi,
    target_name,
    player_name,
    assi_name,
    master_name,
    sc,
    scf,
    view,
    kojo,
  } = bind_ctx(rand);
  const a = target;

  if (game.train.肉便器行动 === 0) {
    if (game.dungeon.肉便器常识改写 === 1) {
      await era.printAndWait(
        `「嘿、肉便器服务呢。连对这么恶心的生物也要『完全服从』什么的了、好好安心吧」`,
      );
      await era.printAndWait(
        `「先说好咯${sc()}最讨厌像你们这样又丑又臭的家伙了。甚至要吐了的哦」`,
      );
      await era.printAndWait(
        `「但是『完全服从』的时候也是会好好做好口交、好好舔干净肉棒上的东西的、就别介意啦♪」`,
      );
    } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
      await era.printAndWait(
        `「愚蠢的家伙们，能得到我这样的便器可是你们的荣幸啊！！」`,
      );
    } else if (era.get(`talent:${a}:85`) || 0) {
      await era.printAndWait(`「对不起！对不起！对…」`);
    } else if ((era.get(`abl:${a}:16`) || 0) >= 5) {
      await era.printAndWait(`「还做得不够好…」`);
    } else {
      await era.printAndWait(`「哎呀！救、救命…」`);
    }
  } else if (game.train.肉便器行动 === 1) {
    if ((era.get(`talent:${a}:76`) || 0) === 1) {
      await era.printAndWait(
        `「${sc()}是个喜欢作肉便器的变态女人哟哟哟！！哇啊啊啊啊♪♪」`,
      );
    } else if (era.get(`talent:${a}:85`) || 0) {
      await era.printAndWait(`「请让我为您服务…」`);
    } else if ((era.get(`abl:${a}:16`) || 0) >= 5) {
      await era.printAndWait(`「请让我为您服务…」`);
    } else {
      await era.printAndWait(`「哎呀！救、救命…」`);
    }
  } else if (game.train.肉便器行动 === 2) {
    if ((era.get(`talent:${target}:136`) || 0) === 1) {
      await era.printAndWait(
        `「${sc()}是头母猪的说！一头下贱的除了被干以外没有任何价值的母猪！哇啊啊啊啊！」`,
      );
    } else if ((era.get(`talent:${a}:76`) || 0) === 1) {
      await era.printAndWait(
        `「${sc()}是头母猪的说！一头下贱的除了被干以外没有任何价值的母猪！哇啊啊啊啊！」`,
      );
    } else if (era.get(`talent:${a}:85`) || 0) {
      await era.printAndWait(`「交尾么…啊啊啊啊…」`);
    } else if ((era.get(`abl:${a}:16`) || 0) >= 5) {
      await era.printAndWait(`「请和我交尾…」`);
    } else {
      await era.printAndWait(`「这也太疯狂了…开玩笑吧…」`);
    }
  } else if (game.train.肉便器行动 === 3) {
    if (game.dungeon.肉便器常识改写 === 1) {
      await era.printAndWait(
        `「好嘞、明白咯${heart(1)}　快把前后两个穴都操烂吧${heart(1)}」`,
      );
      await era.printAndWait(
        `「真是的、真操坏了可怎么办啊……嘛、就算真操坏了、还被催眠着就没法抵抗了啦♪」`,
      );
      await era.printAndWait(
        `「这样乱来说不定还会这么怀上谁的孩子呢、人生真是完蛋了${heart(1)}」`,
      );
    } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
      await era.printAndWait(
        `「请再用力一点！${sc()}的小穴就是为了肉棒而生的！」`,
      );
    } else if (era.get(`talent:${a}:85`) || 0) {
      await era.printAndWait(`「唔啊，好…痛苦…」`);
    } else if ((era.get(`abl:${a}:16`) || 0) >= 5) {
      await era.printAndWait(`「前面和后面都可以使用…」`);
    } else {
      await era.printAndWait(`「救救我！」`);
    }
  } else if (game.train.肉便器行动 === 4) {
    if ((era.get(`talent:${a}:76`) || 0) === 1) {
      await era.printAndWait(
        `「${sc()}决定开放自己的小穴哦，来尽情地享用吧～♪」`,
      );
    } else if (era.get(`talent:${a}:85`) || 0) {
      await era.printAndWait(`「那里…呜啊啊啊」`);
    } else if ((era.get(`abl:${a}:16`) || 0) >= 5) {
      await era.printAndWait(`「请享用我的小穴…」`);
    } else {
      await era.printAndWait(`「救救我！」`);
    }
  } else if (game.train.肉便器行动 === 5) {
    if ((era.get(`talent:${a}:76`) || 0) === 1) {
      await era.printAndWait(`「菊花肉便器♪　${sc()}的肛门就是最好的肉便器♪」`);
    } else if (era.get(`talent:${a}:85`) || 0) {
      await era.printAndWait(`「屁股感觉好…」`);
    } else if ((era.get(`abl:${a}:16`) || 0) >= 5) {
      await era.printAndWait(`「请享用我的屁股…」`);
    } else {
      await era.printAndWait(`「不要啊！」`);
    }
  } else if (game.train.肉便器行动 === 6) {
    if ((era.get(`talent:${target}:76`) || 0) === 1) {
      await era.printAndWait(`「用嘴免费！　用嘴巴就不用钱！」`);
    } else if (era.get(`talent:${target}:85`) || 0) {
      await era.printAndWait(`「给我肉棒……肉棒」`);
    } else if ((era.get(`abl:${target}:16`) || 0) >= 5) {
      await era.printAndWait(`「让我奉仕肉棒把……」`);
    } else {
      await era.printAndWait(`「呕……」`);
    }
  } else if (game.train.肉便器行动 === 7) {
    if ((era.get(`talent:${target}:136`) || 0) === 1) {
      await era.printAndWait(
        `「大家久等了！　家畜${target_name}哦。今天也要看着${sc()}的交配好好撸哦♪」`,
      );
    } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
      await era.printAndWait(
        `「今天也要好好地把${sc()}的羞耻的模样……尽收眼底哦！」`,
      );
    } else if (era.get(`talent:${target}:85`) || 0) {
      await era.printAndWait(
        `「今天也要好好地把${sc()}的羞耻的模样……尽收眼底哦！」`,
      );
    } else if ((era.get(`abl:${target}:16`) || 0) >= 5) {
      await era.printAndWait(`「${sc()}就在这里了啊……不看可不行哦」`);
    } else {
      await era.printAndWait(`「${sc()}就在这里了啊……不看可不行哦」`);
    }
  } else if (game.train.肉便器行动 === 8) {
    if ((era.get(`talent:${target}:76`) || 0) === 1) {
      await era.printAndWait(
        `「今天也十分感谢♪　${target_name}哦。今天${sc()}，叫了妓女姐姐来哦！」`,
      );
      await era.printAndWait(`「${sc()}们的鱼水之欢，好好看着哦♪」`);
    } else if (era.get(`talent:${target}:85`) || 0) {
      await era.printAndWait(
        `「今天也十分感谢♪　${target_name}哦。今日${sc()}，叫了妓女姐姐来哦！」`,
      );
      await era.printAndWait(`「${sc()}们的鱼水之欢，好好看着哦♪」`);
    } else if ((era.get(`abl:${target}:16`) || 0) >= 5) {
      await era.printAndWait(
        `「今天啊，叫了妓女姐姐来。之后就要在房间里啪啪啪了……」`,
      );
    } else {
      await era.printAndWait(
        `「今天啊，叫了妓女姐姐来。之后就要在房间里啪啪啪了……」`,
      );
    }
  } else if (game.train.肉便器行动 === 9) {
    if ((era.get(`talent:${target}:76`) || 0) === 1) {
      await era.printAndWait(
        `「今天也十分感谢♪　${target_name}哦。今日的${sc()}，带着水晶球到外面来了……」`,
      );
      await era.printAndWait(`「${sc()}，现在开始全裸出镜，看着哦……♪」`);
    } else if (era.get(`talent:${target}:85`) || 0) {
      await era.printAndWait(
        `「今天也十分感谢♪　${target_name}哦。今日的${sc()}，带着水晶球到外面来了……」`,
      );
      await era.printAndWait(`「${sc()}，现在开始全裸出镜，看着哦……♪」`);
    } else if ((era.get(`abl:${target}:16`) || 0) >= 5) {
      await era.printAndWait(`「今天，就在地下城里全裸瞎晃……」`);
    } else {
      await era.printAndWait(`「今天，就在地下城里全裸瞎晃……」`);
    }
  }

  return 0;
}

// dungeon_victory_k6

async function dungeon_victory_k6(rand) {
  const {
    rand_n,
    target,
    assi,
    target_name,
    player_name,
    assi_name,
    master_name,
    sc,
    scf,
    view,
    kojo,
  } = bind_ctx(rand);
  const a = target;

  await era.printAndWait(`「嘁，明明是个废物却表现的这么嚣张」`);

  if (
    (era.get(`talent:${target}:21`) || 0) === 1 ||
    (era.get(`talent:${target}:22`) || 0) === 1
  ) {
    if (rand_n(3) === 0) {
      await era.printAndWait(`「消失吧！」`);
    } else if (rand_n(2) === 0) {
      await era.printAndWait(`「哈哈！」`);
    } else {
      await era.printAndWait(`「去死！」`);
    }

    return 0;
  } else if (
    (era.get(`talent:${target}:11`) || 0) === 1 ||
    (era.get(`talent:${target}:12`) || 0) === 1 ||
    (era.get(`talent:${target}:15`) || 0) === 1 ||
    (era.get(`talent:${target}:30`) || 0) === 1 ||
    (era.get(`talent:${target}:34`) || 0) === 1
  ) {
    if (rand_n(4) === 0) {
      await era.printAndWait(`「只有这种程度吗～？弱者。就赐你一死吧」`);
    } else if (rand_n(3) === 0) {
      await era.printAndWait(`「哈哈！丑陋的生物！」`);
    } else if (rand_n(2) === 0) {
      await era.printAndWait(`「哈哈！愚蠢的下等生物！」`);
    } else {
      await era.printAndWait(`「这就是你的末路」`);
    }
  } else if (
    (era.get(`talent:${target}:10`) || 0) === 1 ||
    (era.get(`talent:${target}:26`) || 0) === 1
  ) {
    if (rand_n(4) === 0) {
      await era.printAndWait(`「差不多就好了啊……」`);
    } else if (rand_n(3) === 0) {
      await era.printAndWait(`「简直不敢相信……」`);
    } else if (rand_n(2) === 0) {
      await era.printAndWait(`「区区废物还想蹬鼻子上脸……」`);
    } else {
      await era.printAndWait(`「吓了一跳呢，原来这么弱啊…」`);
    }

    return 0;
  } else {
    if (rand_n(4) === 0) {
      await era.printAndWait(`「呼，清理完垃圾清爽很多呢」`);
    } else if (rand_n(3) === 0) {
      await era.printAndWait(`「废物！这不就把鞋子弄脏了么！」`);
    } else if (rand_n(2) === 0) {
      await era.printAndWait(`「这鲜血如同其自身一样肮脏」`);
    } else {
      await era.printAndWait(`「肮脏！庸俗！无可救药的渣滓们啊！」`);
    }
  }

  if (
    ((era.get(`base:${a}:0`) || 0) * 100) / era.get(`maxbase:${a}:0`) < 50 ||
    ((era.get(`base:${a}:1`) || 0) * 100) / era.get(`maxbase:${a}:1`) < 50
  ) {
    await era.printAndWait(`（有点不妙啊…）`);
  } else {
    await era.printAndWait(`「${sc()}已经天下无敌了！」`);
  }

  return 0;
}

// dungeon_attack_k6

async function dungeon_attack_k6(rand) {
  const {
    rand_n,
    target,
    assi,
    target_name,
    player_name,
    assi_name,
    master_name,
    sc,
    scf,
    view,
    kojo,
  } = bind_ctx(rand);

  if (view.invasion.状态 === 2) {
    if (
      (era.get(`talent:${target}:21`) || 0) === 1 ||
      (era.get(`talent:${target}:22`) || 0) === 1
    ) {
      await era.printAndWait(`「……」`);

      return 0;
    } else if (
      (era.get(`talent:${target}:11`) || 0) === 1 ||
      (era.get(`talent:${target}:12`) || 0) === 1 ||
      (era.get(`talent:${target}:15`) || 0) === 1 ||
      (era.get(`talent:${target}:30`) || 0) === 1 ||
      (era.get(`talent:${target}:34`) || 0) === 1
    ) {
      if (rand_n(3) === 0) {
        await era.printAndWait(`「死吧！渣滓！」`);
      } else if (rand_n(2) === 0) {
        await era.printAndWait(`「见死神去吧！」`);
      } else {
        await era.printAndWait(`「肮脏的垃圾！」`);
      }
    } else if (
      (era.get(`talent:${target}:10`) || 0) === 1 ||
      (era.get(`talent:${target}:26`) || 0) === 1
    ) {
      await era.printAndWait(`「这是什么……去死啊啊」`);

      return 0;
    } else {
      if (rand_n(3) === 0) {
        await era.printAndWait(`「从${sc()}面前消失吧！」`);
      } else if (rand_n(2) === 0) {
        await era.printAndWait(`「看到我还不逃走吗！」`);
      } else {
        await era.printAndWait(`「真是丑陋。」`);
      }
    }
  } else {
    if (
      (era.get(`talent:${target}:21`) || 0) === 1 ||
      (era.get(`talent:${target}:22`) || 0) === 1
    ) {
      await era.printAndWait(`「……」`);

      return 0;
    } else if (
      (era.get(`talent:${target}:11`) || 0) === 1 ||
      (era.get(`talent:${target}:12`) || 0) === 1 ||
      (era.get(`talent:${target}:15`) || 0) === 1 ||
      (era.get(`talent:${target}:30`) || 0) === 1 ||
      (era.get(`talent:${target}:34`) || 0) === 1
    ) {
      if (rand_n(3) === 0) {
        await era.printAndWait(`「啊啊，到此为止了！」`);
      } else if (rand_n(2) === 0) {
        await era.printAndWait(`「你赢不了的，还是投降吧！」`);
      } else {
        await era.printAndWait(`「嘁，你那无聊的正义，看清楚我的力量吧！」`);
      }
    } else if (
      (era.get(`talent:${target}:10`) || 0) === 1 ||
      (era.get(`talent:${target}:26`) || 0) === 1
    ) {
      await era.printAndWait(`「魔王大人赐予的力量…绝不会输！」`);

      return 0;
    } else {
      if (rand_n(3) === 0) {
        await era.printAndWait(`「傻孩子……我来教你享受真正的快乐吧～」`);
      } else if (rand_n(2) === 0) {
        await era.printAndWait(`「决定了！恩准你成为${sc()}的部下吧！」`);
      } else {
        await era.printAndWait(`「你的样子很适合做肉便器哦！」`);
      }
    }
  }

  return 0;
}

// colosseum_kojo_6

async function colosseum_kojo_6(rand) {
  const {
    rand_n,
    target,
    assi,
    target_name,
    player_name,
    assi_name,
    master_name,
    sc,
    scf,
    view,
    kojo,
  } = bind_ctx(rand);

  if (era_flag.selectcom === 55) {
    if ((era.get(`base:${target}:1`) || 0) <= 0) {
      await era.printAndWait(`${target_name}像是已经没有力气站起来了一样……`);
    } else {
      await era.printAndWait(`${target_name}高昂的战意看得她的对手心惊胆战……`);
    }
    return 0;
  }

  if (era_flag.selectcom === 56) {
    if ((era.get(`base:${target}:1`) || 0) <= 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「呜哇…${assi_name}请放过我吧……」`);
        await era.printAndWait(
          `气力用尽的${target_name}悔恨地抓着死斗场的墙壁……`,
        );
      } else {
        await era.printAndWait(`「哈啊…哈啊…想怎么做就怎么做吧……」`);
        await era.printAndWait(
          `气力用尽的${target_name}悔恨地抓着死斗场的墙壁……`,
        );
      }
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(
          `「呼，哼…${assi_name}这种程度的对手早就习以为常了！」`,
        );
        await era.printAndWait(`${target_name}看着${assi_name}逞强地说……`);
      } else {
        await era.printAndWait(
          `「那、那样的怪物${sc()}一个人就可以干掉十只！来决一死战吧！」`,
        );
        await era.printAndWait(
          `尽管面对着死斗场里丑陋的怪物，${target_name}还是说出了非常强硬的话……`,
        );
      }
    }
    return 0;
  }

  if (era_flag.selectcom === 31) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(
        `「啊啊啊…已经…已经不能再应付更多的肉棒了…会痛的啊……哇啊…呜咕噜…！」`,
      );
      // 同一行输出：三条无后缀 PRINTFORM/PRINT 连续不换行，末行
      // PRINTFORMW 才收行。两条 SIF（助手有阴茎 / 持假阳具）的条件提到语句外取值，
      // 片段文本留在输出语句里（#621）
      const assi_has_penis_7493 =
        (era.get(`talent:${assi}:121`) || 0) === 1 ||
        (era.get(`talent:${assi}:122`) || 0) === 1;
      const assi_dildo_7495 = !assi_has_penis_7493 && era.get('item:4') === 1; // ITEM:PBAND 是内建非角色变量（4 号 = 假阳具），不再改写（#552）
      await era.printAndWait(
        `${assi_name}将` +
          (assi_has_penis_7493 ? `阴茎` : '') +
          (assi_dildo_7495 ? `假阳具` : '') +
          `塞入${target_name}的口中。她吞吐着，脸上带有几分愉悦的表情……`,
      );
    } else {
      await era.printAndWait(`「啊啊啊…这种、这种可怕的味道……哇啊…呜咕噜…！」`);
      await era.printAndWait(`${target_name}吮舔着气味令人作呕的肉棒……`);
    }
    return 0;
  }

  if (era_flag.selectcom === 5) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(
        `「${assi_name}…求、求你别这样对待${sc()}的身体啊…啊啊…啊呜呜！」`,
      );
      await era.printAndWait(`${target_name}被${assi_name}爱抚着胸部……`);
    } else {
      await era.printAndWait(`「痛、好痛…别那么粗暴地揉啊…给我住手啊喂！」`);
      await era.printAndWait(
        `${target_name}的乳房被毫无章法地玩弄着，发出痛苦的呻吟……`,
      );
    }
    return 0;
  }

  if (era_flag.selectcom === 21) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(
        `「你、你怎么能这样对我啊…不要…这样激烈的话…啊啊啊啊…饶、饶了我吧！！～！」`,
      );
      // 同型（三条无后缀连写，末行 PRINTFORMW 收行；#621）
      const assi_has_penis_7526 =
        (era.get(`talent:${assi}:121`) || 0) === 1 ||
        (era.get(`talent:${assi}:122`) || 0) === 1;
      const assi_dildo_7528 = !assi_has_penis_7526 && era.get('item:4') === 1; // ITEM:PBAND = 4 号假阳具（#552）
      await era.printAndWait(
        `${assi_name}边听着惨叫边用` +
          (assi_has_penis_7526 ? `阴茎` : '') +
          (assi_dildo_7528 ? `假阳具` : '') +
          `毫不留情地蹂躏着${target_name}的阴道……`,
      );
    } else if (game.train.死斗场敌种 === 206) {
      await era.printAndWait(`「痛…痛啊…呜咿…咕咿咿咿……」`);
      await era.printAndWait(
        `可怜的${target_name}只能无力地呻吟着，任凭巨魔摆布……`,
      );
    } else {
      await era.printAndWait(
        `「呜…呜啊…${scf()}、${sc()}认真起来的话，这种家伙………呜……哇！！」`,
      );
      await era.printAndWait(`${target_name}被怪物无情地侵犯着……`);
    }
    return 0;
  }

  if (era_flag.selectcom === 27) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(
        `「你、你怎么能这样对我啊…不要…这样侵犯我的屁股的话…啊啊啊啊…这样下去屁股会坏掉的啊！」`,
      );
      // 同型（三条无后缀连写，末行 PRINTFORMW 收行；#621）
      const assi_has_penis_7550 =
        (era.get(`talent:${assi}:121`) || 0) === 1 ||
        (era.get(`talent:${assi}:122`) || 0) === 1;
      const assi_dildo_7552 = !assi_has_penis_7550 && era.get('item:4') === 1; // ITEM:PBAND = 4 号假阳具（#552）
      await era.printAndWait(
        `${assi_name}边听着惨叫边用` +
          (assi_has_penis_7550 ? `阴茎` : '') +
          (assi_dildo_7552 ? `假阳具` : '') +
          `蹂躏着${target_name}那鲜嫩的肛门……`,
      );
    } else if (game.train.死斗场敌种 === 206) {
      await era.printAndWait(`「痛…痛啊…呜咿…咕咿咿咿……」`);
      await era.printAndWait(
        `可怜的${target_name}只能无力的呻吟着，任凭巨魔摆布……`,
      );
    } else {
      await era.printAndWait(
        `「${scf()}、${sc()}如果认真起来的话…明明…啊啊啊…别、别动我的屁股啊！！」`,
      );
      await era.printAndWait(`${target_name}的肛门被怪物们肆意侵犯着……`);
    }
    return 0;
  }

  if (era_flag.selectcom === 51) {
    await era.printAndWait(
      `「这、这种低劣的…春药…对我完全没有作用啊…呜…呜嗯…啊啊…」`,
    );
    return 0;
  }

  return 0;
}

// ntr_koujo_k6

async function ntr_koujo_k6(rand, P) {
  const {
    rand_n,
    target,
    assi,
    target_name,
    player_name,
    assi_name,
    master_name,
    sc,
    scf,
    view,
    kojo,
  } = bind_ctx(rand);
  P = P ?? 0;

  if (kojo.NTR再捕获 === 0) {
    // CFLAG:650  = 1（变量语义：CFLAG 族，650）
    kojo.NTR再捕获 = 1;
  }

  if (P === 1) {
    if (
      era.get(`talent:${target}:76`) ||
      0 ||
      era.get(`talent:${target}:85`) ||
      0
    ) {
      await era.printAndWait(
        `「住手、住手！${sc()}还…只被魔王大人抱过啊…唔啊…啊啊啊啊啊！」`,
      );
    } else {
      await era.printAndWait(
        `「不要…不要啊…${sc()}为什么…怎么会…不自觉地…开始配合了…啊！」`,
      );
    }
    // CFLAG:651  = 1（变量语义：CFLAG 族，651）
    kojo.NTR_651 = 1;
  } else if (P === 2) {
    if (
      era.get(`talent:${target}:76`) ||
      0 ||
      era.get(`talent:${target}:85`) ||
      0
    ) {
      await era.printAndWait(
        `「呜啊！肛门被…被大肉棒侵入了…啊啊啊…啊…啊啊…哇啊啊啊${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「这样的事也被${sc()}给…碰到了…屈服的话…呜啊…其实…也不是不可以嘛♪」`,
      );
    }
    // CFLAG:652  = 1（变量语义：CFLAG 族，652）
    kojo.NTR_652 = 1;
  } else if (P === 3) {
    if (era.get(`talent:${target}:136`) || 0) {
      await era.printAndWait(
        `「啊啊啊…被这样…看着…啊啊啊啊…${sc()}是个变态，被狗粗暴地侵犯反而很兴奋呢…请看着我…看着我吧！啊…啊啊啊啊～${heart(1)}」`,
      );
    } else if (
      era.get(`talent:${target}:76`) ||
      0 ||
      era.get(`talent:${target}:85`) ||
      0
    ) {
      await era.printAndWait(
        `「这样吗…真是屈辱…大概…那家伙也不愿意看到我现在这副样子吧…呜…啊…啊啊啊${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「住手…别这样…该死…啊…啊喂…唔啊…啊啊啊啊啊啊！」`,
      );
    }
    // CFLAG:653  = 1（变量语义：CFLAG 族，653）
    kojo.NTR_653 = 1;
  } else if (P === 4) {
    if (
      era.get(`talent:${target}:76`) ||
      0 ||
      era.get(`talent:${target}:85`) ||
      0
    ) {
      await era.printAndWait(
        `「唔啊…嘤嘤…请更用力地侵犯我…狂王大人…${sc()}已经变得糟糕了啊啊…要坏掉了${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「啊啊啊…狂王大人的腰技…最棒了…啊啊啊…已经受不了了啦♪」`,
      );
    }
    // CFLAG:654  = 1（变量语义：CFLAG 族，654）
    kojo.NTR_654 = 1;
  } else if (P === 5) {
    if (
      era.get(`talent:${target}:76`) ||
      0 ||
      era.get(`talent:${target}:85`) ||
      0
    ) {
      await era.printAndWait(
        `「还想要…还想要更多的…大肉棒…${heart(1)} ${sc()}的脑袋里…已经只有淫荡这两个字了啊…${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「啊啊啊…${sc()}的屁股和小穴已经…唔啊…停、停不下来了…${scf()}、${sc()}…想要成为大家的肉便器♪」`,
      );
    }
    // CFLAG:655  = 1（变量语义：CFLAG 族，655）
    kojo.NTR_655 = 1;
  } else if (P === 6) {
    if (
      era.get(`talent:${target}:76`) ||
      0 ||
      era.get(`talent:${target}:85`) ||
      0
    ) {
      await era.printAndWait(
        `「啊啊啊…啊呜…呜啊…魔王什么的对${sc()}来说已经不算什么了…啊啊…只想要更多的肉棒给我带来快感…哇啊${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「来吧…快来啊…请…唔啊…大家…在…在我这个肉便器身上射出精液吧…♪」`,
      );
    }
    // CFLAG:656  = 1（变量语义：CFLAG 族，656）
    kojo.NTR_656 = 1;
  } else if (P === 7) {
    if (
      era.get(`talent:${target}:76`) ||
      0 ||
      era.get(`talent:${target}:85`) ||
      0
    ) {
      await era.printAndWait(
        `「呼呼…${sc()}已经是狂王殿下的人了…那个地方，不回去也无所谓啊…${heart(1)}」`,
      );
      await era.printAndWait(
        `「今后服侍狂王大人这种事情，就由我来负责好了…${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「啊哈…啊啊啊…魔王大人…您的仆人…已经向狂王殿下倒戈了哦…♪」`,
      );
    }
    // CFLAG:657  = 1（变量语义：CFLAG 族，657）
    kojo.NTR_657 = 1;
  } else if (P === 20) {
    if (
      era.get(`talent:${target}:76`) ||
      0 ||
      era.get(`talent:${target}:85`) ||
      0
    ) {
      if (view.event.妊娠相手 === 1) {
        await era.printAndWait(
          `「那个孩子是${sc()}的小孩…所以…请还给我啊………」`,
        );
      } else {
        await era.printAndWait(
          `「既然${sc()}已经到了这种境地…这孩子就是狂王大人的了…」`,
        );
      }
    } else {
      await era.printAndWait(
        `「啊哈哈…魔王大人…有看到${sc()}生下的孩子的样子吗？」`,
      );
      await era.printAndWait(`「今天小穴也被狂王殿下灌满了精液哦♪」`);
    }
  }
  return 0;
}

// exucution_koujo_k6

async function exucution_koujo_k6(rand) {
  const {
    rand_n,
    target,
    assi,
    target_name,
    player_name,
    assi_name,
    master_name,
    sc,
    scf,
    view,
    kojo,
  } = bind_ctx(rand);

  if (game.event.犬射精或处刑口上 === 4) {
    await era.printAndWait(
      `「其他的什么都可以！请饶恕我，不要让我做怪兽的肉便器啊！」`,
    );
  } else if (game.event.犬射精或处刑口上 === 5) {
    await era.printAndWait(
      `「干什么！${sc()}、${sc()}不要变成这样啊…哈啊啊…啊啊啊啊啊………」`,
    );
  } else if (game.event.犬射精或处刑口上 === 6) {
    await era.printAndWait(`「${sc()}总有一天会报复回来的啊啊啊！」`);
  } else if (game.event.犬射精或处刑口上 === 7) {
    await era.printAndWait('');
  }
}

// museum_koujo_k6

async function museum_koujo_k6(rand) {
  const {
    rand_n,
    target,
    assi,
    target_name,
    player_name,
    assi_name,
    master_name,
    sc,
    scf,
    view,
    kojo,
  } = bind_ctx(rand);
  const a = target; // 源 %SAVESTR:A%（分发前 TARGET=A）

  if (game.event.博物馆口上 === 0) {
    await era.printAndWait(`「谁…谁想变成你所谓的石像啊！」`);
    await era.printAndWait(`${target_name}毫无顾忌地竖起中指………`);
  } else if (game.event.博物馆口上 === 1) {
    await era.printAndWait(`「变成标本也会一直诅咒你啊！」`);
  } else if (game.event.博物馆口上 === 2) {
    await era.printAndWait(`「变成蜡像也不会放过你！」`);
  } else if (game.event.博物馆口上 === 3) {
    await era.printAndWait(
      `「呜呜、${sc()}这样的暴露的样子被…！…别盯着这边看啊！」`,
    );
  } else if (game.event.博物馆口上 === 4) {
    await era.printAndWait(
      `「${sc()}是绝对！不会…变成…你的……人…偶、什……么……的…」`,
    );
    await era.printAndWait(
      `看起来${chara_callname(a)}到最后也没有察觉到异变的发生呢…`,
    );
  } else if (game.event.博物馆口上 === 5) {
    await era.printAndWait(`「就这样毫无美感的…」`);
  } else if (game.event.博物馆口上 === 6) {
    await era.printAndWait(`「就这样变成中看不中用的玩物吗…」`);
  } else if (game.event.博物馆口上 === 7) {
    await era.printAndWait(`「就这样失去生命了呢…」`);
  } else if (game.event.博物馆口上 === 8) {
    await era.printAndWait(`「才不要变成家具，不要啊…」`);
  } else if (game.event.博物馆口上 === 9) {
    await era.printAndWait(`「敢这么做的话，小心我撕烂这幅画啊！」`);
  }
}

// banishment_koujo_k6

async function banishment_koujo_k6(rand) {
  const {
    rand_n,
    target,
    assi,
    target_name,
    player_name,
    assi_name,
    master_name,
    sc,
    scf,
    view,
    kojo,
  } = bind_ctx(rand);

  if (game.event.流放口上 === 0) {
    await era.printAndWait(
      `「骗人的吧…${sc()}已经失去力量了…这样的话…这样的话…那些家伙…真是荒谬啊………」`,
    );
  } else if (game.event.流放口上 === 1) {
    await era.printAndWait('');
  } else if (game.event.流放口上 === 2) {
    await era.printAndWait('');
  } else if (game.event.流放口上 === 3) {
    await era.printAndWait('');
  } else if (game.event.流放口上 === 4) {
    await era.printAndWait('');
  }
}

// public_exucution_koujo_k6

async function public_exucution_koujo_k6(rand) {
  const {
    rand_n,
    target,
    assi,
    target_name,
    player_name,
    assi_name,
    master_name,
    sc,
    scf,
    view,
    kojo,
  } = bind_ctx(rand);

  if (game.event.公开处刑口上 === 0) {
    await era.printAndWait(
      `「喂、喂…骗人的吧…${sc()}的身体…被那些野兽什么的一起蹂躏的话…会死的啊…一定会死的啊」`,
    );
  } else if (game.event.公开处刑口上 === 1) {
    await era.printAndWait(
      `「呼，捕获的人就会被这样处决吗…魔王的残暴还真是一览无遗啊………」`,
    );
  } else if (game.event.公开处刑口上 === 2) {
    await era.printAndWait('');
  }
}

// grotesque_koujo_k6

async function grotesque_koujo_k6(rand) {
  const {
    rand_n,
    target,
    assi,
    target_name,
    player_name,
    assi_name,
    master_name,
    sc,
    scf,
    view,
    kojo,
  } = bind_ctx(rand);

  if (game.event.猎奇处刑口上 === 0) {
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 === 1) {
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 === 2) {
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 === 3) {
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 === 4) {
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 === 5) {
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 === 6) {
    await era.printAndWait('');
  }
}

// enterenemy_koujo_k6

async function enterenemy_koujo_k6(rand) {
  const {
    rand_n,
    target,
    assi,
    target_name,
    player_name,
    assi_name,
    master_name,
    sc,
    scf,
    view,
    kojo,
  } = bind_ctx(rand);
  const a = target;

  if (
    (era.get(`talent:${a}:21`) || 0) === 1 ||
    (era.get(`talent:${a}:22`) || 0) === 1
  ) {
    await era.printAndWait(`「………开始了」`);
  } else if (
    (era.get(`talent:${a}:11`) || 0) === 1 ||
    (era.get(`talent:${a}:12`) || 0) === 1 ||
    (era.get(`talent:${a}:15`) || 0) === 1 ||
    (era.get(`talent:${a}:30`) || 0) === 1 ||
    (era.get(`talent:${a}:34`) || 0) === 1
  ) {
    await era.printAndWait(`「不管魔王有一个还是两个，都消灭给你看！」`);
  } else if (
    (era.get(`talent:${a}:10`) || 0) === 1 ||
    (era.get(`talent:${a}:26`) || 0) === 1
  ) {
    await era.printAndWait(
      `「要、要进入这样的地方吗，才不会害怕啊，${self_call(a)}可是勇者来着…」`,
    );
  } else {
    await era.printAndWait(`「要消灭这群虫子吗？不过是探囊取物而已啊！」`);
  }
}

// gohoubi_request_koujo_k6

async function gohoubi_request_koujo_k6(cid, rand) {
  const {
    rand_n,
    target,
    assi,
    target_name,
    player_name,
    assi_name,
    master_name,
    sc,
    scf,
    view,
    kojo,
  } = bind_ctx(rand);
  const a = cid ?? target;

  if (chara(a).stronghold.要求奖赏 === 0) {
    await era.printAndWait(`「${self_call(a)}想要很多钱」`);
  } else if (
    chara(a).stronghold.要求奖赏 === 1 ||
    chara(a).stronghold.要求奖赏 === 2 ||
    chara(a).stronghold.要求奖赏 === 3
  ) {
    await era.printAndWait(`「${self_call(a)}想和…`);
    // 同一行输出：三条无后缀 PRINT 互斥（狗/猪/马），
    // PRINTFORMW 收行（#621）
    const request_animal_7812 =
      chara(a).stronghold.要求奖赏 === 1
        ? `狗`
        : chara(a).stronghold.要求奖赏 === 2
          ? `猪`
          : `马`;
    await era.printAndWait(request_animal_7812 + `性交啦♪」`);
  } else if (chara(a).stronghold.要求奖赏 === 4) {
    await era.printAndWait(`「请、请吻我吧…啊啊」`);
  } else if (chara(a).stronghold.要求奖赏 === 5) {
    await era.printAndWait(`「回来的时候…请拥抱我～」`);
  } else if (chara(a).stronghold.要求奖赏 === 6) {
    await era.printAndWait(`「让我来帮你做一次满满的口交吧～」`);
  } else if (chara(a).stronghold.要求奖赏 === 7) {
    await era.printAndWait(`「呼呼…想要跟大家交，朋，友～」`);
  } else if (chara(a).stronghold.要求奖赏 === 8) {
    await era.printAndWait(`「${self_call(a)}想请…魔王大人撒尿…♪」`);
  } else if (chara(a).stronghold.要求奖赏 === 9) {
    await era.printAndWait(`「作为女人想品尝童贞的肉棒呢…♪」`);
  }
}

// gohoubi_after_koujo_k6

async function gohoubi_after_koujo_k6(cid, choice, rand) {
  const {
    rand_n,
    target,
    assi,
    target_name,
    player_name,
    assi_name,
    master_name,
    sc,
    scf,
    view,
    kojo,
  } = bind_ctx(rand);
  const a = cid ?? target;

  if (choice === 0) {
    await era.printAndWait(`「这样的事情可不能长久」`);
  } else if (choice === 1) {
    await era.printAndWait(`「感觉还不错嘛…${self_call(a)}…」`);
  } else if (choice === 2) {
    if (chara(a).stronghold.要求奖赏 === 0) {
      await era.printAndWait(`「该怎么用呢？这样下去能存很多钱吧～」`);
    } else if (chara(a).stronghold.要求奖赏 === 1) {
      if ((era.get(`talent:${a}:0`) || 0) === 1) {
        await era.printAndWait(`「唔啊！被狗狗干肛门最棒了！最最最棒了！」`);
      } else {
        await era.printAndWait(`「唔啊！跟狗狗性交最棒了！最最最棒了！」`);
      }
    } else if (chara(a).stronghold.要求奖赏 === 2) {
      if ((era.get(`talent:${a}:0`) || 0) === 1) {
        await era.printAndWait(`「唔啊！被猪干肛门最棒了！最最最棒了！」`);
      } else {
        await era.printAndWait(`「唔啊！跟猪性交最棒了！最最最棒了！」`);
      }
    } else if (chara(a).stronghold.要求奖赏 === 3) {
      if ((era.get(`talent:${a}:0`) || 0) === 1) {
        await era.printAndWait(`「唔啊！被马干肛门最棒了！最最最棒了！」`);
      } else {
        await era.printAndWait(`「唔啊！跟马性交最棒了！最最最棒了！」`);
      }
    } else if (chara(a).stronghold.要求奖赏 === 4) {
      await era.printAndWait(
        `「呵呵，这样的吻就已经满足了啊，${self_call(a)}果然是个廉价的女人呢♪」`,
      );
    } else if (chara(a).stronghold.要求奖赏 === 5) {
      if ((era.get(`abl:${a}:2`) || 0) > (era.get(`abl:${a}:3`) || 0)) {
        await era.printAndWait(
          `「啊啊啊！果然打倒勇者后被插小穴是最棒啊的啦！抱紧我哦！」`,
        );
      } else {
        await era.printAndWait(
          `「啊啊啊！果然打倒勇者后被插屁眼是最棒啊的啦！抱紧我哦！」`,
        );
      }
    } else if (chara(a).stronghold.要求奖赏 === 6) {
      await era.printAndWait(
        `「呼…作为报酬的话还远远不够呢，所以${self_call(a)}还要更努力的榨干你们嘛…${heart(1)}」`,
      );
    } else if (chara(a).stronghold.要求奖赏 === 7) {
      if ((era.get(`talent:${a}:0`) || 0) === 1) {
        await era.printAndWait(`「像这种激烈程度的乱交派对…已经习惯了呢♪」`);
      } else {
        await era.printAndWait(`「像这种激烈程度的乱交派对…已经习惯了呢♪」`);
      }
    } else if (chara(a).stronghold.要求奖赏 === 8) {
      await era.printAndWait(`「哈哈…无论怎样的美酒都不及你的尿液啊♪」`);
    } else if (chara(a).stronghold.要求奖赏 === 9) {
      if ((era.get(`abl:${a}:2`) || 0) > (era.get(`abl:${a}:3`) || 0)) {
        await era.printAndWait(
          `「啊哈哈哈！处男的味道是怎样呢，想想都觉得激动啊！」`,
        );
      } else {
        await era.printAndWait(
          `「用屁股夺走鲜嫩肉棒的童贞的感觉真是太棒了哈哈${heart(1)}」`,
        );
      }
    }
  }
}

// osioski_koujo_k6

async function osioki_koujo_k6(cid, choice, rand) {
  const {
    rand_n,
    target,
    assi,
    target_name,
    player_name,
    assi_name,
    master_name,
    sc,
    scf,
    view,
    kojo,
  } = bind_ctx(rand);
  const a = cid ?? target;

  if (choice === 0) {
    await era.printAndWait(
      `「${self_call_first(a)}、${self_call(a)}这就回房间」`,
    );
  } else if (choice === 1) {
    if ((era.get(`abl:${a}:21`) || 0) >= 3) {
      await era.printAndWait(`「啊呜！哔哩哔哩地！哔哩哔哩啊呜哔哩哔哩！」`);
    } else {
      await era.printAndWait(
        `「哈啊！这样…看不到尽头的拷问…呜呜、唔啊啊啊！」`,
      );
    }
  } else if (choice === 2) {
    if ((era.get(`abl:${a}:17`) || 0) >= 4) {
      await era.printAndWait(
        `「你在看什么？如果在看我的话是要付钱的哦，只要＄１就够了♪」`,
      );
    } else {
      await era.printAndWait(
        `「啊啊啊！你在看哪里啊！再看就杀了你！唔嗯…呜…啊呜」`,
      );
    }
  } else if (choice === 3) {
    if ((era.get(`abl:${a}:17`) || 0) >= 6) {
      await era.printAndWait(
        `「呼呼…唔啊…好，继续啊…更加仔细地看${self_call(a)}吧！」`,
      );
    } else {
      await era.printAndWait(`「呜咿…呜…呜咿呜咿咿咿咿………讨厌啊！」`);
    }
  } else if (choice === 4) {
    if ((era.get(`abl:${a}:21`) || 0) >= 3) {
      await era.printAndWait(
        `「抱、抱歉讨伐失败了呢，${self_call(a)}真是头愚蠢的母猪！请狠狠的鞭笞我吧！」`,
      );
    } else {
      await era.printAndWait(
        `「哇啊！对不起啊！真对不起啊！全部都是${self_call(a)}的错！」`,
      );
    }
  } else if (choice === 5) {
    if (
      (era.get(`talent:${a}:88`) || 0) === 1 ||
      (era.get(`talent:${a}:76`) || 0) === 1
    ) {
      await era.printAndWait(
        `「啊啊啊…虽然是别人的尿但是意外的美味呢…谢、谢谢您提供的饮品………」`,
      );
    } else {
      await era.printAndWait(`「我要洗澡…要洗澡…洗澡………」`);
    }
  } else if (choice === 6) {
    await era.printAndWait(`「事到如今，扫除这样的惩罚是我分内之事啊」`);
  } else if (choice === 7) {
    await era.printAndWait(`「啊啊…谁能给我一份饭吃就好了啊………」`);
  } else if (choice === 8) {
    await era.printAndWait(
      `「啊啊啊啊啊啊…我要大肉棒！不管是谁都好，请跟我性交吧！要疯了啊啊！就算是当做肉便器也无所谓了！啊啊啊！谁来救救我啊啊啊！」`,
    );
  } else if (choice === 9) {
    await era.printAndWait(`「呀呼！」`);
  }
}

// gobi_koujo_k6（ARG:0）

function gobi_koujo_k6(arg_0, rand) {
  const { rand_n } = bind_ctx(rand);

  if (arg_0 === 1) {
    return `的哟♪`;
  } else if (arg_0 === 2) {
    return `啊！`;
  } else if (arg_0 === 3) {
    return `来着……。`;
  } else if (arg_0 === 4) {
    return `啦……。`;
  } else if (arg_0 === 5) {
    return `呢……。`;
  } else {
    if (rand_n(3) === 0) {
      return `啊。`;
    } else if (rand_n(2) === 0) {
      return `呢。`;
    } else {
      return `的说。`;
    }
  }
}

on('EVENTTRAIN', eventtrain_k6);
on('EVENTEND', eventend_k6);

kojo_message_com_family.register(6, kojo_message_com_6);
dog_kojo_family.register(6, dog_kojo_6);
colosseum_kojo_family.register(6, colosseum_kojo_6);
kojo_message_palamcng_family.register(6, kojo_message_palamcng_6);
kojo_message_markcng_family.register(6, kojo_message_markcng_6);
self_kojo_family.register(6, self_kojo_k6);
ryouzyoku_kojo_family.register(6, dungeon_ryouzyoku_k6);
ryouzyoku_after_kojo_family.register(6, dungeon_ryouzyoku_after_k6);
benki_koujo_family.register(6, benki_koujo_k6);
dungeon_victory_family.register(6, dungeon_victory_k6);
dungeon_attack_family.register(6, dungeon_attack_k6);
ntr_koujo_family.register(6, ntr_koujo_k6);
exucution_koujo_family.register(6, exucution_koujo_k6);
museum_koujo_family.register(6, museum_koujo_k6);
banishment_koujo_family.register(6, banishment_koujo_k6);
public_exucution_koujo_family.register(6, public_exucution_koujo_k6);
grotesque_koujo_family.register(6, grotesque_koujo_k6);
enterenemy_koujo_family.register(6, enterenemy_koujo_k6);
gohoubi_request_koujo_family.register(6, gohoubi_request_koujo_k6);
gohoubi_after_koujo_family.register(6, gohoubi_after_koujo_k6);
osioski_koujo_family.register(6, osioki_koujo_k6);
gobi_koujo_family.register(6, gobi_koujo_k6);

module.exports = {
  kojo_message_com_6,
  dog_kojo_6,
  colosseum_kojo_6,
  k6_kojo2,
  self_kojo_k6,
  kojo_message_palamcng_6,
  kojo_message_markcng_6,
  benki_koujo_k6,
  dungeon_ryouzyoku_k6,
  dungeon_ryouzyoku_after_k6,
  dungeon_victory_k6,
  dungeon_attack_k6,
  ntr_koujo_k6,
  exucution_koujo_k6,
  museum_koujo_k6,
  banishment_koujo_k6,
  public_exucution_koujo_k6,
  grotesque_koujo_k6,
  enterenemy_koujo_k6,
  gohoubi_request_koujo_k6,
  gohoubi_after_koujo_k6,
  osioki_koujo_k6,
  gobi_koujo_k6,
};
