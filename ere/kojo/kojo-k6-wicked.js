/* eslint-disable no-irregular-whitespace, no-dupe-else-if, no-unused-vars */
/**
 * @file 悪女性格口上 K6：整份 EVENT_K6_悪女.ERB 复核落地（issue #237）。
 *
 * 源: target/ERB/口上/EVENT_K6_悪女.ERB
 *     @EVENTTRAIN #PRI（:73-77，存在标志 FLAG:106）
 *     @EVENTEND #LATER（:79-81，清标志）
 *     @EVENTTRAIN 普通档（:87 起，初调教 CFLAG:201 / 种族分档 / K6_KOJO2）
 *     @EVENTEND 普通档（:580-582 起，调教结束台词）
 *     @K6_KOJO2（:490，助手缺失时的二回目以降入口）
 *     @KOJO_MESSAGE_COM_6（:678；六道跳过判定 :681-700——助手最先、
 *       无 TEQUIP:90；兽奸 / 死斗场岔本文件真身）
 *     以及 DOG / COLOSSEUM / PALAMCNG / MARKCNG / SELF_KOJO / 死斗场 /
 *     肉便器 / 凌辱 / 奖赏惩罚 / 语尾 等非调教函数（#209 裁定 2）
 *
 * 转译初稿 products/kojo/kojo-k6-wicked.js（#107）经逐段复核后移入。
 *
 * == 守卫（K6 与 K2/K5 不同，逐文件 1:1） ==
 *
 * @KOJO_MESSAGE_COM_6 的守卫（:681-700，源实测）：
 *   1. ASSI > 0 && ASSIPLAY（助手调教）→ 跳过；
 *   2. TEQUIP:45 && SELECTCOM != 45（口塞）→ 跳过；
 *   3. TFLAG:899（失神）→ 跳过；
 *   4. TALENT:9（崩坏）→ 跳过；
 *   5. TEQUIP:89（兽奸）→ **岔去本文件真身 DOG_KOJO_6**；
 *   6. TEQUIP:55（死斗场）→ **岔去本文件真身 COLOSSEUM_KOJO_6**。
 * **无 TEQUIP:90 头部守卫**（触手只在 COM 6 内部出现）。
 *
 * == 状态机（CFLAG:301～400，个位数推进） ==
 *
 * 各 SELECTCOM 分支按「初めて → 淫乱(76) → 爱慕(85) → 刻印/顺从分档 →
 * それ以外」取首个命中；FLAG:7 == 2（默认）时 CFLAG 上限被旁路、同支
 * 每次出声；FLAG:7 == 1 时逐阶段各出一次声。
 *
 * 这张票存根（docs/stub-registry.md）：SELL_MATURO_K0（售卖扩展口上，
 * 随售卖票）。
 */

const era = require('#/era-electron');
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
  gohoubi_request_koujo_family,
  gobi_koujo_family,
} = require('#/kojo/kojo-system');
const {
  gohoubi_after_koujo_family,
  osioski_koujo_family,
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
const { stub_line } = require('#/utils/stub-line');

const STUBBED_CALLS = ['SELL_MATURO_K0'];

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

// @EVENTTRAIN #PRI（:73-77）：存在标志 + 总开关补 0
on(
  'EVENTTRAIN',
  () => {
    game.kojo.口上存在_6 = 1; // :75 FLAG:106 = 1（K6 口上存在标志）
    if (game.kojo.口上开关 === 0) {
      game.kojo.口上开关 = 2; // :77
    }
  },
  TIER.PRI,
);

// @EVENTEND #LATER（:79-81）：调教结束清存在标志
on(
  'EVENTEND',
  () => {
    game.kojo.口上存在_6 = 0; // :81
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
    // :88-89
    return 0; // :88-89
  } // :88-89
  if ((era.get(`talent:${target}:166`) || 0) !== 1) {
    // :90-91
    return 0; // :90-91
  } // :90-91

  if (kojo.初调教 === 0) {
    // :96
    era.drawLine(); // :97

    if ((era.get(`talent:${target}:314`) || 0) === 1) {
      // :99
      await era.printAndWait(`「别、别盯着我看啊！你这家伙！」`); // :100
      await era.printAndWait(
        `${target_name}用比平常的精灵锐利得多的目光直视着${player_name}。`,
      ); // :101
      await era.printAndWait(`这样的对象应该很难快速驯服吧。`); // :102
      // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :103
      kojo.初调教 = 1; // :103
    } else if ((era.get(`talent:${target}:314`) || 0) === 2) {
      // :105
      await era.printAndWait(`「只要你敢再靠近一步…我就咬断你的喉咙！」`); // :106
      await era.printAndWait(
        `${target_name}瞪着${player_name}恶狠狠地威胁道。。`,
      ); // :107
      await era.printAndWait(`这样的对象狼应该很难快速驯服吧。`); // :108
      // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :109
      kojo.初调教 = 1; // :109
    } else if ((era.get(`talent:${target}:314`) || 0) === 3) {
      // :111
      await era.printAndWait(
        `「不妨把你身上所具有的魔王的权能都让渡给我，然后去给我扫一辈子的厕所吧！」`,
      ); // :112
      await era.printAndWait(
        `${target_name}带着冷酷的表情凝视着${player_name}。`,
      ); // :113
      await era.printAndWait(`这样的对象吸血鬼应该很难快速驯服吧。`); // :114
      // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :115
      kojo.初调教 = 1; // :115
    } else if ((era.get(`talent:${target}:314`) || 0) === 4) {
      // :117
      await era.printAndWait(
        `「你就是所谓的魔王？哈哈哈哈…这样的魔王还真是荒谬得令人发笑啊！」`,
      ); // :118
      await era.printAndWait(
        `${target_name}因为愤怒而扬起眉毛，瞪视着${player_name}。`,
      ); // :119
      await era.printAndWait(
        `稍微大意了一点就被身为无头骑士的她用飞过来的头袭击了。`,
      ); // :120
      // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :121
      kojo.初调教 = 1; // :121
    } else if ((era.get(`talent:${target}:314`) || 0) === 5) {
      // :123
      await era.printAndWait(
        `「像你这种程度的魔王，要不是${sc()}被那些家伙打倒了…！」`,
      ); // :124
      await era.printAndWait(`${target_name}因为后悔而露出咬牙切齿的样子。`); // :125
      await era.printAndWait(`如果能驯服这样的龙人大概会非常有趣吧……`); // :126
      // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :127
      kojo.初调教 = 1; // :127
    } else if ((era.get(`talent:${target}:314`) || 0) === 6) {
      // :129
      await era.printAndWait(
        `「哼，既然被天堂那些大天使驱逐了，就勉勉强强投靠你吧！」`,
      ); // :130
      await era.printAndWait(
        `虽然是个天使，${target_name}却毫不在意的说着这样罪恶的台词。`,
      ); // :131
      await era.printAndWait(
        `对于这样嚣张的天使所进行的调教，一定要彻底征服她的肉体与心灵才行。`,
      ); // :132
      // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :133
      kojo.初调教 = 1; // :133
    } else if ((era.get(`talent:${target}:314`) || 0) === 9) {
      // :135
      await era.printAndWait(
        `${target_name}是被改造才变成魔族的。${player_name}这个改造的主使者来到的时候，却注意到她脸上的表情有些严峻。`,
      ); // :136
      await era.printAndWait(
        `「呼，哼…变成这样其实也无所谓啦，但好歹先把我身上这些东西解开啊！」`,
      ); // :137
      await era.printAndWait(
        `「如果${sc()}把你劫持了是不是就可以自己当魔王啦？哈，听起来不错嘛！」`,
      ); // :138
      await era.printAndWait(
        `但作为魔族的她只能任你为所欲为，这是来自她本能的对魔族之王的遵从………`,
      ); // :139
      // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :140
      kojo.初调教 = 1; // :140

      // CFLAG:370  = 1（变量语义：CFLAG 族，370） // :142
      kojo.魔族化 = 1; // :142
    } else if ((era.get(`talent:${target}:314`) || 0) === 10) {
      // :144
      await era.printAndWait(
        `「真是没办法…这样吧，每天都能让我吃饱的话就暂时老老实实听你的话，可以吗？」`,
      ); // :145
      await era.printAndWait(`${target_name}向${player_name}要求更好的待遇。`); // :146
      await era.printAndWait(`有点被霍比特这个种族的价值观吓到了啊……`); // :147
      // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :148
      kojo.初调教 = 1; // :148
    } else if ((era.get(`talent:${target}:314`) || 0) === 11) {
      // :150
      await era.printAndWait(`「用、用我的矿山来换取我的自由吧！」`); // :151
      await era.printAndWait(
        `${target_name}是矮人，号称自己能付出像黄金矿山那么多的赎金，然而${player_name}并不相信她说的这些。`,
      ); // :152
      await era.printAndWait(`真正想要的是这个矮人的身体啊……`); // :153
      // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :154
      kojo.初调教 = 1; // :154
    } else {
      // :156-157
      if (rand_n(10) === 0) {
        // :157
        await era.printAndWait(
          `「喂！你…你想干什么！为什么我的眼睛…放开我！你这个变态！${sc()}绝不会被你洗脑的！」`,
        ); // :158
      } else {
        // :158-159
        await era.printAndWait(
          `「喂！你…你想干什么！为什么我的眼睛…放开我！你这个变态！」`,
        ); // :160
      } // :160-161
      await era.printAndWait(
        `${target_name}简直不像是一个勇者，征服这样的她应该是很难的吧……`,
      ); // :162
      // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :163
      kojo.初调教 = 1; // :163
      return 1; // :164
    } // :164-165
  } else if (
    kojo.初调教 < 5 &&
    kojo.魔族化 === 0 &&
    (era.get(`talent:${target}:314`) || 0) === 9 &&
    (era.get(`talent:${target}:85`) || 0) === 0 &&
    (era.get(`talent:${target}:76`) || 0) === 0
  ) {
    // :169
    await era.printAndWait(
      `${target_name}是被多次改造后才变成魔族的。${player_name}这个改造的主使者来到的时候，却注意到她脸上的表情有些严峻。`,
    ); // :170
    await era.printAndWait(
      `「该死…都是因为你这个家伙，我才会变成现在这样子！」`,
    ); // :171
    await era.printAndWait(
      `「哼，你给我小心点，我一定会找机会取代你成为魔王的！现在，给我滚出去！」`,
    ); // :172
    await era.printAndWait(
      `但作为魔族的她只能任你为所欲为，这是来自她本能的对魔族之王的遵从………`,
    ); // :173

    // CFLAG:370  = 2（变量语义：CFLAG 族，370） // :175
    kojo.魔族化 = 2; // :175
    return 1; // :176
  } else if (kojo.初调教 >= 1 && kojo.NTR再捕获 === 1) {
    // :180
    if (
      era.get(`talent:${target}:85`) ||
      0 ||
      era.get(`talent:${target}:76`) ||
      0
    ) {
      // :181
      era.drawLine(); // :182
      await era.printAndWait(
        `「这个，咳咳，我回来了！啊嗯…唔嗯…反正，${sc()}就是这样人尽可夫的糟糕家伙，有什么大不了的嘛！」`,
      ); // :183
      await era.printAndWait(
        `${target_name}糟糕的态度简直像一个凌晨回家的妻子。`,
      ); // :184
      await era.printAndWait(
        `「呐，这个水晶球里是狂王想要对魔王大人说的话…总之全都是假的！给我忘掉啊！你给我忘掉那些话！」`,
      ); // :185

      // CFLAG:650  = 0（变量语义：CFLAG 族，650） // :187
      kojo.NTR再捕获 = 0; // :187
    } else {
      // :187-188
      era.drawLine(); // :189
      await era.printAndWait(
        `「哼，总算是回到这儿了呢。虽然狂王那儿也不坏，但好像还是自己人这里更舒服一点嘛。」`,
      ); // :190
      await era.printAndWait(`${target_name}想着背叛的经过邪恶地笑了起来………`); // :191

      // CFLAG:650  = 0（变量语义：CFLAG 族，650） // :193
      kojo.NTR再捕获 = 0; // :193
    } // :193-194
    return 1; // :195
  } else if (kojo.初调教 < 2 && (era.get(`mark:${target}:2`) || 0) === 1) {
    // :200
    era.drawLine(); // :201
    await era.printAndWait(
      `「啊，不行…不行，没办法逃跑的话，只能先想个法子把这家伙糊弄着再说了。」`,
    ); // :202
    await era.printAndWait(
      `${target_name}看${player_name}的目光似乎变得柔和了一些……`,
    ); // :203
    // CFLAG:201  = 2（变量语义：CFLAG 族，201） // :204
    kojo.初调教 = 2; // :204
    return 1; // :205
  } else if (kojo.初调教 < 3 && (era.get(`mark:${target}:2`) || 0) === 2) {
    // :208
    era.drawLine(); // :209
    await era.printAndWait(`「似乎没那么讨厌这家伙了啊…${sc()}…已经……」`); // :210
    await era.printAndWait(
      `${player_name}向${target_name}走来，逼得她一步步退后。`,
    ); // :211
    await era.printAndWait(`「不…不行了…不想抵抗了…反而有点期待啊……」`); // :212
    await era.printAndWait(
      `身后就是墙壁，无法退后的${target_name}身体都开始颤抖了……`,
    ); // :213
    // CFLAG:201  = 3（变量语义：CFLAG 族，201） // :214
    kojo.初调教 = 3; // :214
    return 1; // :215
  } else if (
    kojo.初调教 < 4 &&
    (era.get(`mark:${target}:2`) || 0) === 3 &&
    (era.get(`talent:${target}:85`) || 0) === 0
  ) {
    // :218
    era.drawLine(); // :219
    await era.printAndWait(`「啊——啊、啊，已经……没办法反抗了…」`); // :220
    await era.printAndWait(
      `${target_name}像奴隶一样来到${player_name}身前，缓缓跪下。`,
    ); // :221
    await era.printAndWait(
      `「至今为止一直…过分地任性呢…对，对不起了…啊啊啊啊……」`,
    ); // :222
    await era.printAndWait(
      `流下象征着完全屈服的眼泪，${target_name}向${player_name}卑微地低下了头，几乎要吻到你的脚。`,
    ); // :223
    // CFLAG:201  = 4（变量语义：CFLAG 族，201） // :224
    kojo.初调教 = 4; // :224
    return 1; // :225
  } else if (
    kojo.初调教 < 5 &&
    (era.get(`talent:${target}:85`) || 0) === 0 &&
    (era.get(`talent:${target}:76`) || 0) === 1 &&
    (era.get(`talent:${target}:314`) || 0) !== 9
  ) {
    // :228
    era.drawLine(); // :229
    await era.printAndWait(`${target_name}双腿呈M字打开，妩媚地看着你。`); // :230
    await era.printAndWait(
      `「${sc()}一直在犯错呢……来干死我啊……狠狠的操我吧…」`,
    ); // :231
    await era.printAndWait(`温热的舌头诉说着淫猥放荡的话语`); // :232
    await era.printAndWait(`曾经的傲慢不逊完完全全地消失了。`); // :233
    // CFLAG:201  = 5（变量语义：CFLAG 族，201） // :234
    kojo.初调教 = 5; // :234
    return 1; // :235
  } else if (
    (era.get(`talent:${target}:314`) || 0) === 9 &&
    kojo.初调教 < 6 &&
    (era.get(`talent:${target}:85`) || 0) === 0 &&
    (era.get(`talent:${target}:76`) || 0) === 1
  ) {
    // :238
    era.drawLine(); // :239

    if (kojo.魔族化 === 1) {
      // :241
      await era.printAndWait(
        `被转化为魔族并且反复调教过后，${target_name}已经完全陷落了。`,
      ); // :242
      await era.printAndWait(
        `身为魔族的眼睛泛着春光，光是看到你的两腿间就已经淫水泛滥起来，害羞地磨擦着双腿。`,
      ); // :243
      await era.printAndWait(`「呼哈，控制不住了…快给我大肉棒吧！」`); // :244

      if ((era.get(`talent:${target}:0`) || 0) === 1) {
        // :246
        await era.printAndWait(
          `「啊啊啊…快来把${sc()}的处女膜狠狠捅破吧！无论是怎样的家伙都好，来免费侵犯${sc()}鲜嫩的小穴吧！」`,
        ); // :247
        await era.printAndWait(`${target_name}压抑着体内的性欲流着泪乞求着。`); // :248
      } // :248-249
      await era.printAndWait(
        `${target_name}愈发兴奋地抱住${player_name}，伸出灼热的舌头在脸上舔来舔去。`,
      ); // :250
      await era.printAndWait(
        `「哈…哈…要上天了…这样的气味…啊啊啊啊啊啊啊…魔王大人的汗…是最上等的味道…已经…无法思考了啊！${heart(1)}」`,
      ); // :251
      await era.printAndWait(
        `「您的大肉棒…真是令人着迷啊…就让我来…服侍您吧… ${heart(3)}」`,
      ); // :252
      await era.printAndWait(`之前那个傲慢不可一世的样子已经完全看不出来了………`); // :253
      // CFLAG:201  = 6（变量语义：CFLAG 族，201） // :254
      kojo.初调教 = 6; // :254
      return 1; // :255
    } else if (kojo.魔族化 === 2) {
      // :257
      await era.printAndWait(
        `被转化为魔族并且反复调教过后，${target_name}完全陷落了。`,
      ); // :258
      await era.printAndWait(
        `身为魔族的眼睛泛着春光，光是看到你两腿间就已经淫水泛滥起来，害羞地磨擦着双腿。`,
      ); // :259
      await era.printAndWait(`「呼哈，控制不住了…快给我大肉棒吧！」`); // :260

      if ((era.get(`talent:${target}:0`) || 0) === 1) {
        // :262
        await era.printAndWait(
          `「啊啊啊…快来把${sc()}的处女膜狠狠捅破吧！无论是怎样的家伙都好，来免费侵犯${sc()}鲜嫩的小穴吧！」`,
        ); // :263
        await era.printAndWait(`${target_name}压抑着体内的性欲流着泪乞求着。`); // :264
      } // :264-265
      await era.printAndWait(
        `${target_name}愈发兴奋地抱住${player_name}伸出灼热的舌头在脸上舔来舔去。`,
      ); // :266
      await era.printAndWait(
        `「哈…哈…要上天了…这样的气味…啊啊啊啊啊啊啊…魔王大人的汗…是最上等的味道…已经…无法思考了啊！${heart(1)}」`,
      ); // :267
      await era.printAndWait(
        `「您的大肉棒…真是令人着迷啊…就让我来…服侍您吧… ${heart(3)}」`,
      ); // :268
      await era.printAndWait(`之前那个傲慢不可一世的样子已经完全看不出来了………`); // :269
      // CFLAG:201  = 6（变量语义：CFLAG 族，201） // :270
      kojo.初调教 = 6; // :270
      return 1; // :271
    } else {
      // :273-274
      await era.printAndWait(
        `「是啊…唔…啊啊…魔王大人…真好…感觉…只是靠近您…就会充满魔力啊…${heart(1)}」`,
      ); // :274
      await era.printAndWait(
        `变成魔族的${target_name}在地板上来来回回地走着，大概是受到魔王魔力刺激的缘故，地板上到处都是一摊一摊的爱液。`,
      ); // :275
      await era.printAndWait(
        `发现了这一点的${player_name}故意放出一点魔力，让${target_name}艰难地吸收了。`,
      ); // :276
      await era.printAndWait(
        `「啊啊啊啊啊啊啊啊…这么棒的身体，真是开心啊啊${heart(3)} 请让我变成魔王大人的私有物吧，${sc()}做出了正确的决定呢…！」`,
      ); // :277
      await era.printAndWait(
        `${target_name}发自内心地对能成为魔族这件事感到十分欢喜………`,
      ); // :278

      if ((era.get(`talent:${target}:0`) || 0) === 0) {
        // :280
        await era.printAndWait(
          `然后${target_name}莞尔一笑，呈M字打开双腿用手托着，像是在诱惑${player_name}一样。`,
        ); // :281
        await era.printAndWait(
          `「就像是重生了一样…请尽情地享用作为魔族的${sc()}吧！魔王大人那浓厚的精液～${heart(1)}」`,
        ); // :282
      } // :282-283
      // CFLAG:201  = 6（变量语义：CFLAG 族，201） // :284
      kojo.初调教 = 6; // :284
      return 1; // :285
    } // :285-286
  } else if (
    kojo.初调教 < 7 &&
    (era.get(`talent:${target}:85`) || 0) === 1 &&
    (era.get(`talent:${target}:314`) || 0) !== 9
  ) {
    // :288
    era.drawLine(); // :289
    await era.printAndWait(`${target_name}依偎在你怀里说着话`); // :290
    await era.printAndWait(
      `「之前是${sc()}错了…对不起…从今往后，什么都听您的…」`,
    ); // :291
    await era.printAndWait(`热泪盈眶的她的身姿连忏悔都显得美丽至极。`); // :292
    await era.printAndWait(`曾经的傲慢全无踪影…`); // :293
    // CFLAG:201  = 7（变量语义：CFLAG 族，201） // :294
    kojo.初调教 = 7; // :294
    return 1; // :295
  } else if (
    (era.get(`talent:${target}:314`) || 0) === 9 &&
    kojo.初调教 < 8 &&
    (era.get(`talent:${target}:85`) || 0) === 1 &&
    (era.get(`talent:${target}:76`) || 0) === 0
  ) {
    // :297
    era.drawLine(); // :298

    if (kojo.魔族化 === 1) {
      // :300
      await era.printAndWait(
        `被转化为魔族并且反复调教过后，${target_name}完全陷落了。`,
      ); // :301
      await era.printAndWait(
        `「${sc()}已经完完全全爱上魔王大人了呢……今后也会一直侍奉在魔王大人身边的……${heart(1)}`,
      ); // :302
      await era.printAndWait(
        `弯曲双膝低下螓首，亲吻了身为魔王的${player_name}的脚背立下了誓约之吻。。`,
      ); // :303
      await era.printAndWait(`「啊…这种心动…要死了啦…${heart(1)}」`); // :304

      if ((era.get(`talent:${target}:0`) || 0) === 1) {
        // :306
        await era.printAndWait(
          `「啊唔…嗯…就把${sc()}的处子之身送给您当做礼物吧…要好好疼爱我哟，这可是我小心珍藏到现在的宝物呢………♪」`,
        ); // :307
        await era.printAndWait(`${target_name}伏在${player_name}脚下恳求道……`); // :308
      } // :308-309
      // CFLAG:201  = 8（变量语义：CFLAG 族，201） // :310
      kojo.初调教 = 8; // :310
      return 1; // :311
    } else if (kojo.魔族化 === 2) {
      // :313
      await era.printAndWait(
        `被转化为魔族并且反复调教过后，${target_name}完全陷落了。`,
      ); // :314
      await era.printAndWait(
        `「${sc()}已经完完全全爱上魔王大人了呢……今后也会一直侍奉在魔王大人身边的……${heart(1)}`,
      ); // :315
      await era.printAndWait(
        `弯曲双膝低下螓首，亲吻了身为魔王的${player_name}的脚背立下了誓约之吻。。`,
      ); // :316
      await era.printAndWait(`「啊…这种心动…要死了啦…${heart(1)}」`); // :317

      if ((era.get(`talent:${target}:0`) || 0) === 1) {
        // :319
        await era.printAndWait(
          `「啊唔…嗯…就把${sc()}的处子之身送给您当做礼物吧…要好好疼爱我哟，这可是我小心珍藏到现在的宝物呢………♪」`,
        ); // :320
        await era.printAndWait(`${target_name}伏在${player_name}脚下恳求道……`); // :321
      } // :321-322
      // CFLAG:201  = 8（变量语义：CFLAG 族，201） // :323
      kojo.初调教 = 8; // :323
      return 1; // :324
    } else {
      // :326-327
      await era.printAndWait(
        `「切…明明一开始是以魔王大人的性命作为目标的…怎么会不知不觉就变成这样了啊…」`,
      ); // :327
      await era.printAndWait(
        `已经被改造成魔族的${target_name}坐在那儿，表情有些落寞。`,
      ); // :328
      await era.printAndWait(
        `「可是…已经变成这样了啊…已经，离不开魔王大人了呢…♪」`,
      ); // :329
      await era.printAndWait(`${target_name}抱住${player_name}深情地亲吻着………`); // :330

      if ((era.get(`talent:${target}:0`) || 0) === 1) {
        // :332
        await era.printAndWait(
          `「呐，就这样，就这样把我的处女也、也拿去吧！一直以来…都在期待这一天的到来呢…」`,
        ); // :333
        await era.printAndWait(
          `${target_name}突然变得兴奋起来，很快身体就与${player_name}的腿和尾巴纠缠在一起………`,
        ); // :334
      } // :334-335
      // CFLAG:201  = 8（变量语义：CFLAG 族，201） // :336
      kojo.初调教 = 8; // :336
      return 1; // :337
    } // :337-338
  } else if ((era.get(`talent:${target}:9`) || 0) === 1 && kojo.初调教 < 9) {
    // :340
    era.drawLine(); // :341
    await era.printAndWait(
      `${target_name}带着恍惚的表情用指甲刮着房间的墙壁。`,
    ); // :342
    await era.printAndWait(`「想从这里出去…好想出去啊啊啊啊啊…呜呜…」`); // :343
    await era.printAndWait(`${target_name}的精神受到了难以恢复的巨大创伤……`); // :344
    // CFLAG:201  = 9（变量语义：CFLAG 族，201） // :345
    kojo.初调教 = 9; // :345
    return 1; // :346
  } else if (era_flag.assi < 0) {
    // :349
    await k6_kojo2(rand_n); // CALL K6_KOJO2 // :350
  } else if (assi === 17) {
    // :359

    era.drawLine(); // :361
    if (era.get(`talent:${assi}:165`) || 0) {
      // :362

      if (kojo.简易助手_0 === 0) {
        // :364

        if ((era.get(`talent:${target}:9`) || 0) === 1) {
          // :366
          era.setColor('#ffccff'); // SETCOLOR 255,204,255 // :367
          await era.printAndWait(
            `『诶？主人，这个人，看起来已经被玩坏掉了的样子呢～』`,
          ); // :368
          era.setColor(''); // RESETCOLOR // :369
          await era.printAndWait(
            `的确如此，${target_name}的精神已经崩溃了，只是呆呆地凝视着${assi_name}………`,
          ); // :370
        } else if (
          (era.get(`talent:${target}:76`) || 0) === 1 &&
          kojo.初调教 >= 5
        ) {
          // :372
          await era.printAndWait(
            `${player_name}带着${assi_name}来看${target_name}，两人从上向下俯视着对${target_name}品头论足起来。`,
          ); // :373
          await era.printAndWait(
            `「啊哈，原来你喜欢这样的孩子吗？不太理解，不过我也不太讨厌的样子呢～♪」`,
          ); // :374
          await era.printAndWait(
            `${target_name}还以为是自己来凌辱${assi_name}呢，于是${player_name}告诉她${assi_name}才是调教者。`,
          ); // :375
          await era.printAndWait(
            `「诶，今天是这家伙调教${sc()}吗？啊啊啊不要啊！」`,
          ); // :376
          await era.printAndWait(
            `${assi_name}趁机突袭一下子就把${target_name}推倒在地。`,
          ); // :377
          era.setColor('#ffccff'); // SETCOLOR 255,204,255 // :378
          await era.printAndWait(
            `『啊哈哈♪…是这样哟…主人说的，或者说姐姐想要反抗…我么？』`,
          ); // :379
          era.setColor(''); // RESETCOLOR // :380
          await era.printAndWait(
            `房间里回响起${target_name}有些愉快意味的惨叫声………`,
          ); // :381
        } else if (
          (era.get(`talent:${target}:85`) || 0) === 1 &&
          kojo.初调教 >= 7
        ) {
          // :383
          await era.printAndWait(
            `${player_name}带着${assi_name}来看${target_name}。`,
          ); // :384
          await era.printAndWait(
            `「那个…${sc()}觉得有点意外…我可是，很专一的呢，所以这样的事情…唉…」`,
          ); // :385
          await era.printAndWait(
            `${target_name}轻轻叹息着，目光在${player_name}与${assi_name}间划过。`,
          ); // :386
          await era.printAndWait(`「另外…魔王大人原来喜欢这样的孩子吗？」`); // :387
          if (
            (era.get(`talent:${assi}:85`) || 0) === 1 ||
            (era.get(`talent:${assi}:76`) || 0) === 1
          ) {
            // :388
            era.setColor('#ffccff'); // SETCOLOR 255,204,255 // :389
            await era.printAndWait(
              `『不要介意啦～我和姐姐一样都被魔王大人疼爱着呢～主人可是要我来调教姐姐大人哦～」`,
            ); // :390
            era.setColor(''); // RESETCOLOR // :391
            await era.printAndWait(
              `${assi_name}一边说着这样的话，一边趁${target_name}不备推倒了她………`,
            ); // :392
          } else {
            // :392-393
            era.setColor('#ffccff'); // SETCOLOR 255,204,255 // :394
            await era.printAndWait(
              `『放心啦，大家都是魔王大人调教出来的哟～魔王大人可是说，把你当做我今天的奖品呢～』`,
            ); // :395
            era.setColor(''); // RESETCOLOR // :396
            await era.printAndWait(
              `${assi_name}说着这样的话推倒了${target_name}………`,
            ); // :397
          } // :397-398
        } else {
          // :400-401
          await era.printAndWait(
            `${player_name}带着${assi_name}来看${target_name}的时候，她把脸背了过去。`,
          ); // :401
          await era.printAndWait(
            `「把那样的家伙带过来干什么？${sc()}对那样的孩子可没有兴趣啊！」`,
          ); // :402
          await era.printAndWait(
            `${assi_name}扳过${target_name}扭向一边的脸，狠狠打了一耳光。`,
          ); // :403
          await era.printAndWait(`「痛啊…混蛋，为什么…${sc()}做错了……吗……」`); // :404
          await era.printAndWait(
            `${assi_name}毫不留情地捏住${target_name}的脸，把自己的脸靠过去说道。`,
          ); // :405
          era.setColor('#ffccff'); // SETCOLOR 255,204,255 // :406
          await era.printAndWait(
            `『喂喂我亲爱的勇者大人～♪主人说今天我可以调教你哦～所以，你不听话的话我会很难办呢～♪』`,
          ); // :407
          era.setColor(''); // RESETCOLOR // :408
        } // :408-409
        // CFLAG:202  = 1（变量语义：CFLAG 族，202） // :410
        kojo.简易助手_0 = 1; // :410
        return 1; // :411
      } else if (kojo.简易助手_0 === 1 && game.kojo.口上开关 === 2) {
        // :413

        if ((era.get(`talent:${target}:9`) || 0) === 1) {
          // :415
          era.setColor('#ffccff'); // SETCOLOR 255,204,255 // :416
          await era.printAndWait(`『被玩坏掉的家伙还真是无趣啊…』`); // :417
          era.setColor(''); // RESETCOLOR // :418
          await era.printAndWait(
            `${assi_name}一边说着一边拉着${target_name}的头发向上提起。好像是在考虑怎么取乐的样子………`,
          ); // :419
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          // :421
          await era.printAndWait(
            `「又…来了…要、要干嘛…又要${sc()}…那…那样吗…？」`,
          ); // :422
          await era.printAndWait(
            `${target_name}想起${assi_name}上次对自己“温柔”的调教，脸变得通红一片。`,
          ); // :423
          era.setColor('#ffccff'); // SETCOLOR 255,204,255 // :424
          await era.printAndWait(
            `『就是那样哟～姐姐今天的反应也非常可爱呢～♪』`,
          ); // :425
          era.setColor(''); // RESETCOLOR // :426
          await era.printAndWait(
            `${assi_name}露出与少女年龄不相称的淫靡表情，温柔地抚摸着${target_name}的头发。`,
          ); // :427
          await era.printAndWait(`「唔…${scf()}，${sc()}才没有啊…唔…啊啊……」`); // :428
          await era.printAndWait(`${target_name}的身体害羞地颤抖着………`); // :429
        } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
          // :431
          await era.printAndWait(
            `「又…来了…要、要干嘛…又要${sc()}…那…那样吗…？」`,
          ); // :432
          await era.printAndWait(
            `${target_name}想起${assi_name}上次对自己“激烈”的调教，脸变得通红一片。`,
          ); // :433
          era.setColor('#ffccff'); // SETCOLOR 255,204,255 // :434
          await era.printAndWait(
            `『对哦～想要听到姐姐可爱的声音所以就又来了呢～♪』`,
          ); // :435
          era.setColor(''); // RESETCOLOR // :436
          await era.printAndWait(
            `${assi_name}把手放在${target_name}肩上，舌头舔舐起对方的嘴唇。`,
          ); // :437
          era.setColor('#ffccff'); // SETCOLOR 255,204,255 // :438
          await era.printAndWait(
            `『啊哈哈哈！在主人来之前先送你一份礼物吧～♪』`,
          ); // :439
          era.setColor(''); // RESETCOLOR // :440
          await era.printAndWait(`${target_name}就这样被推倒了。`); // :441
          await era.printAndWait(
            `「啊啊…完全没法抵抗这样的孩子啊…${scf()}、${sc()}………${heart(1)}」`,
          ); // :442
          await era.printAndWait(
            `就在${player_name}的面前，${target_name}和${assi_name}开始了水乳交融般的纠缠………`,
          ); // :443
        } else {
          // :445-446
          await era.printAndWait(`「该死…又、又来了啊…这…小混蛋……！」`); // :446
          await era.printAndWait(
            `${target_name}一边回忆着与${assi_name}的交合一边骂着。`,
          ); // :447
          era.setColor('#ffccff'); // SETCOLOR 255,204,255 // :448
          await era.printAndWait(
            `『啊哈哈！可爱的姐姐！今天我也来满足你了哦～要把姐姐给灌得满满的呢～♪』`,
          ); // :449
          era.setColor(''); // RESETCOLOR // :450
          await era.printAndWait(
            `${target_name}还没反应过来就被${assi_name}给推倒了………`,
          ); // :451
        } // :451-452
        return 1; // :453
      } // :453-454
    } // :455-456
  } else {
    // :482-483
    await k6_kojo2(rand_n); // CALL K6_KOJO2 // :483
  } // :483-484
}

// @K6_KOJO2 // :490

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
    // :492
    era.drawLine(); // :493
    await era.printAndWait(`「呜呜呜…啊呜…呜呜………」`); // :494
    await era.printAndWait(
      `没办法期待已经精神崩溃的${target_name}做出什么反应啊………`,
    ); // :495
    return 1; // :496
  } else if (
    (era.get(`mark:${target}:3`) || 0) === 3 &&
    game.kojo.口上开关 === 2
  ) {
    // :499

    if (
      (era.get(`mark:${target}:2`) || 0) === 3 &&
      (era.get(`mark:${target}:3`) || 0) === 3 &&
      (era.get(`talent:${target}:85`) || 0) === 0 &&
      (era.get(`talent:${target}:76`) || 0) === 0
    ) {
      // :501
      era.drawLine(); // :502
      await era.printAndWait(`「哼…想要抱我的话…那就来吧！」`); // :503
      await era.printAndWait(`${target_name}四仰八叉地躺倒在床上叫嚣着………`); // :504
    } else {
      // :504-505
      era.drawLine(); // :506
      await era.printAndWait(`「…给我去死吧」`); // :507
      await era.printAndWait(
        `${target_name}用锐利得仿佛可以杀死${player_name}般的眼神瞪视着………`,
      ); // :508
    } // :508-509
    return 1; // :510
  } else if (
    (era.get(`mark:${target}:2`) || 0) === 0 &&
    game.kojo.口上开关 === 2
  ) {
    // :513
    era.drawLine(); // :514
    await era.printAndWait(`「别开玩笑了，你这废物」`); // :515
    await era.printAndWait(`${target_name}砸着嘴瞪视${player_name}。`); // :516
    return 1; // :517
  } else if (
    (era.get(`mark:${target}:2`) || 0) === 1 &&
    game.kojo.口上开关 === 2
  ) {
    // :520
    era.drawLine(); // :521
    await era.printAndWait(`「嘁，不明白么…才不会听你的啊！」`); // :522
    await era.printAndWait(`${target_name}脸上似乎出现了一点胆怯的表情………`); // :523
    return 1; // :524
  } else if (
    (era.get(`mark:${target}:2`) || 0) === 2 &&
    game.kojo.口上开关 === 2
  ) {
    // :527
    era.drawLine(); // :528
    await era.printAndWait(`「到这种程度为止吧…再做更过分的事我可不答应啊…」`); // :529
    await era.printAndWait(`${target_name}抱住双肩有点厌恶似的摇着头………`); // :530
    return 1; // :531
  } else if (
    (era.get(`mark:${target}:2`) || 0) === 3 &&
    (era.get(`talent:${target}:85`) || 0) === 0 &&
    (era.get(`talent:${target}:76`) || 0) === 0 &&
    game.kojo.口上开关 === 2
  ) {
    // :534
    era.drawLine(); // :535
    await era.printAndWait(`「…要开始了吗。好吧。」`); // :536
    await era.printAndWait(
      `${target_name}老老实实地抱住${player_name}准备开始了…`,
    ); // :537
    return 1; // :538
  } else if (
    (era.get(`talent:${target}:76`) || 0) === 1 &&
    game.kojo.口上开关 === 2
  ) {
    // :542
    era.drawLine(); // :543

    if (rand_n(3) === 0) {
      // :545
      await era.printAndWait(`${target_name}四肢趴在地上向你抬起屁股`); // :546
      await era.printAndWait(`「啊啊啊啊啊…快来吧…已经忍不住了…」`); // :547
      await era.printAndWait(`你踢踢她的屁股，开始了调教………`); // :548
    } else if (rand_n(2) === 0) {
      // :549
      await era.printAndWait(`${target_name}一看到你就跪下说道`); // :550
      await era.printAndWait(`「如您所愿……${sc()}……想要更多的处罚……」`); // :551
      await era.printAndWait(`仰望着你的眼睛里露出充满欲望的光芒………`); // :552
    } else {
      // :552-553
      await era.printAndWait(`${target_name}分开双臀展示出自己的小穴`); // :554
      await era.printAndWait(
        `「${sc()}很蠢吧…在你的身下就更没办法思考了呢…所以要对我负责哦♪」`,
      ); // :555
      await era.printAndWait(`那淫荡的表情完全没有了一开始的恶毒………`); // :556
    } // :556-557
    return 1; // :558
  } else if (
    (era.get(`talent:${target}:85`) || 0) === 1 &&
    game.kojo.口上开关 === 2
  ) {
    // :561
    era.drawLine(); // :562

    if (rand_n(3) === 0) {
      // :564
      await era.printAndWait(`「今天也来惩罚${sc()}吧…♪」`); // :565
      await era.printAndWait(`${target_name}有些迫不及待地开始做调教准备了……`); // :566
      await era.printAndWait(
        `「${sc()}的身体上已经充满了魔王大人的印记了呢…${heart(1)}」`,
      ); // :567
    } else if (rand_n(2) === 0) {
      // :568
      await era.printAndWait(
        `「有点…迟到了啊………不、不过无论什么时候，都在等待着为魔王大人服务呢」`,
      ); // :569
      await era.printAndWait(`${target_name}轻轻嘟着嘴唇，眼中充满期待。`); // :570
      await era.printAndWait(
        `「您…快开始吧…${sc()}的子宫已经在不安分地跳动了呢…${heart(1)}」`,
      ); // :571
    } else {
      // :571-572
      await era.printAndWait(`「啊，您好～♪」`); // :573
      await era.printAndWait(`${target_name}微笑着撩起发梢寒暄起来。`); // :574
      await era.printAndWait(
        `「一想到要被魔王大人疼爱…${sc()}就变得高兴起来了呢………」`,
      ); // :575
    } // :575-576
    return 1; // :577
  } // :577-578
  return 0; // :577-579
}

// @EVENTEND // :585

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
    // :586-587
    return 0; // :586-587
  } // :586-587
  if ((era.get(`talent:${target}:166`) || 0) !== 1) {
    // :588-589
    return 0; // :588-589
  } // :588-589

  if ((era.get(`base:${target}:0`) || 0) <= 0) {
    // :592-593
    return 0; // :592-593
  } // :592-593

  if ((era.get(`talent:${target}:9`) || 0) === 1) {
    // :599
    era.drawLine(); // :600
    await era.printAndWait(`「哈…唔啊…啊啊啊啊啊………」`); // :601
    await era.printAndWait(
      `${target_name}美丽的身体已经被玩坏了，还是少让她做些事情吧………`,
    ); // :602
    return 1; // :603
  } else if (
    (era.get(`mark:${target}:3`) || 0) === 3 &&
    (era.get(`mark:${target}:2`) || 0) === 0 &&
    (era.get(`talent:${target}:85`) || 0) === 0 &&
    (era.get(`talent:${target}:76`) || 0) === 0
  ) {
    // :606
    era.drawLine(); // :607
    await era.printAndWait(`「去死吧！」`); // :608
    if ((era.get(`base:${target}:0`) || 0) <= 500) {
      // :610
      await era.printAndWait(
        `虽然疲惫不堪，${target_name}的眼光中还是充满了抵触。`,
      ); // :610
    } // :610
    await era.printAndWait(
      `${player_name}在${target_name}的痛骂中不由得耸了耸肩………`,
    ); // :611
    return 1; // :612
  } else if (
    (era.get(`mark:${target}:2`) || 0) <= 1 &&
    (era.get(`talent:${target}:85`) || 0) === 0 &&
    (era.get(`talent:${target}:76`) || 0) === 0
  ) {
    // :615
    era.drawLine(); // :616
    await era.printAndWait(`「下贱的渣滓！」`); // :617
    await era.printAndWait(`居然还有痛骂的精神，看来调教得还不够啊……`); // :618
    return 1; // :619
  } else if (
    (era.get(`mark:${target}:2`) || 0) === 2 &&
    (era.get(`talent:${target}:85`) || 0) === 0 &&
    (era.get(`talent:${target}:76`) || 0) === 0
  ) {
    // :622
    era.drawLine(); // :623
    await era.printAndWait(`「你、你这臭虫！」`); // :624
    await era.printAndWait(`还有精神说这样的话，需要更多的调教呢……`); // :625
    return 1; // :626
  } else if (
    (era.get(`mark:${target}:2`) || 0) === 3 &&
    (era.get(`talent:${target}:85`) || 0) === 0 &&
    (era.get(`talent:${target}:76`) || 0) === 0
  ) {
    // :629
    era.drawLine(); // :630
    await era.printAndWait(`「哈啊…终于……结束了吗………」`); // :631
    if ((era.get(`base:${target}:0`) || 0) <= 500) {
      // :633
      await era.printAndWait(`${target_name}气喘吁吁，已经脱力了。`); // :633
    } // :633
    await era.printAndWait(`调教的成果显现出来，这匹野马也被驯服了呢……`); // :634
    return 1; // :635
  } else if (
    (era.get(`mark:${target}:2`) || 0) === 3 &&
    (era.get(`mark:${target}:3`) || 0) === 3 &&
    (era.get(`talent:${target}:85`) || 0) === 0 &&
    (era.get(`talent:${target}:76`) || 0) === 0
  ) {
    // :638
    era.drawLine(); // :639
    await era.printAndWait(`「你有什么事情吗…唔…不要啊！」`); // :640
    if ((era.get(`base:${target}:0`) || 0) <= 500) {
      // :642
      await era.printAndWait(
        `虽然疲惫不堪，${target_name}的眼光中还是充满了抵触。`,
      ); // :642
    } // :642
    await era.printAndWait(
      `${player_name}看着${target_name}现在的样子笑了起来，${target_name}流下了懊悔的眼泪………`,
    ); // :643
    return 1; // :644
  } else if (
    (era.get(`talent:${target}:76`) || 0) === 1 &&
    (era.get(`base:${target}:0`) || 0) >= 500
  ) {
    // :647
    era.drawLine(); // :648
    await era.printAndWait(`「再激烈一点嘛～♪」`); // :649
    await era.printAndWait(`${target_name}欲求不满地在床上写下这样的字句………`); // :650
    return 1; // :651
  } else if (
    (era.get(`talent:${target}:76`) || 0) === 1 &&
    (era.get(`base:${target}:0`) || 0) <= 500
  ) {
    // :653
    era.drawLine(); // :654
    await era.printAndWait(`「唔啊，被喂得饱饱的呢～♪」`); // :655
    await era.printAndWait(`${target_name}非常满足地呈大字躺在地上………`); // :656
    return 1; // :657
  } else if (
    (era.get(`talent:${target}:85`) || 0) === 1 &&
    (era.get(`base:${target}:0`) || 0) >= 500
  ) {
    // :660
    era.drawLine(); // :661
    await era.printAndWait(`「下次惩罚不要手下留情哦……♪」`); // :662
    await era.printAndWait(
      `${target_name}趴在${player_name}的肩头撒娇似的说着下次调教的事情………`,
    ); // :663
    return 1; // :664
  } else if (
    (era.get(`talent:${target}:85`) || 0) === 1 &&
    (era.get(`base:${target}:0`) || 0) <= 500
  ) {
    // :666
    era.drawLine(); // :667
    await era.printAndWait(`「啊啊…这、这么多………${heart(1)}」`); // :668
    await era.printAndWait(`${target_name}满足地叹息着大字躺在地上………`); // :669
    return 1; // :670
  } // :670-671
  return 0; // :670-672
}

// @KOJO_MESSAGE_COM_6 // :678

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
    // :680-681
    return 0; // :680-681
  } // :680-681

  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 45) {
    // :683-684
    return 0; // :683-684
  } // :683-684

  if (game.train.失神) {
    // :686-687
    return 0; // :686-687
  } // :686-687

  if ((era.get(`talent:${target}:9`) || 0) === 1) {
    // :689-690
    return 0; // :689-690
  } // :689-690

  if (era.get(`tequip:${target}:89`)) {
    // :692
    await dog_kojo_6(rand_n); // CALL DOG_KOJO_6 // :693
    return 0; // :693-694
  } // :695-696

  if (era.get(`tequip:${target}:55`)) {
    // :697
    await colosseum_kojo_6(rand_n); // CALL COLOSSEUM_KOJO_6 // :698
    return 0; // :698-699
  } // :698-700

  if (era_flag.selectcom === 0) {
    // :708

    if (kojo.爱抚 === 0) {
      // :710

      if ((era.get(`mark:${target}:2`) || 0) >= 2) {
        // :712
        await era.printAndWait(`「哈啊…该死……别这样摸我啊…呜！…啊嗯！」`); // :713
        await era.printAndWait(`${target_name}的身体被爱抚着………`); // :714
      } else {
        // :716-717
        await era.printAndWait(`「嘁、摸吧！你这渣滓！」`); // :717
        await era.printAndWait(`${target_name}厌恶地扭动着身体………`); // :718
      } // :718-719
      // CFLAG:301  = 1（变量语义：CFLAG 族，301） // :720
      kojo.爱抚 = 1; // :720
      return 0; // :720-721
    } else {
      // :723-725

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :725
        await era.printAndWait(`「只是触摸可不够哦～♪」`); // :726
        await era.printAndWait(
          `${target_name}抓住${player_name}的手引导着伸向敏感带………`,
        ); // :727
        // CFLAG:301  = 6（变量语义：CFLAG 族，301） // :728
        kojo.爱抚 = 6; // :728
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :730
        await era.printAndWait(`「主人的手的触感…好温暖…」`); // :731
        await era.printAndWait(
          `${target_name}丝毫不抵抗地享受着爱抚，发出舒服的呻吟………`,
        ); // :732
        // CFLAG:301  = 5（变量语义：CFLAG 族，301） // :733
        kojo.爱抚 = 5; // :733
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :735
        await era.printAndWait(`「…不要！呼呼、哈啊…」`); // :736
        await era.printAndWait(`${target_name}的身体被爱抚着………`); // :737
        // CFLAG:301  = 4（变量语义：CFLAG 族，301） // :738
        kojo.爱抚 = 4; // :738
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 2 &&
        (kojo.爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :740
        await era.printAndWait(`「真是…没办法啊…」`); // :741
        await era.printAndWait(`${target_name}的身体被爱抚着………`); // :742
        // CFLAG:301  = 3（变量语义：CFLAG 族，301） // :743
        kojo.爱抚 = 3; // :743
      } else if (
        (era.get(`mark:${target}:2`) || 0) <= 1 &&
        (kojo.爱抚 <= 1 || game.kojo.口上开关 === 2)
      ) {
        // :745
        await era.printAndWait(`「别碰我！你这垃圾！」`); // :746
        await era.printAndWait(`${target_name}在爱抚过程中厌恶地扭动着身体………`); // :747
        // CFLAG:301  = 2（变量语义：CFLAG 族，301） // :748
        kojo.爱抚 = 2; // :748
      } // :748-749
      return 0; // :748-750
    } // :748-751
  } // :752-755

  if (era_flag.selectcom === 1) {
    // :757

    if (kojo.舔阴 === 0) {
      // :759

      if ((era.get(`talent:${target}:0`) || 0) === 1) {
        // :761
        await era.printAndWait(`「别…别舔那里！说了很脏啊！」`); // :762
        await era.printAndWait(
          `${player_name}舔舐着${target_name}未经人事的阴唇………`,
        ); // :763
      } else {
        // :765-766
        await era.printAndWait(`「你是认真的吗！别开玩笑了！」`); // :766
        await era.printAndWait(
          `${player_name}抱住${target_name}的两条大腿，把阴唇含在了嘴里………`,
        ); // :767
      } // :767-768
      // CFLAG:302  = 1（变量语义：CFLAG 族，302） // :769
      kojo.舔阴 = 1; // :769
      return 0; // :769-770
    } else {
      // :772-774

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.舔阴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :774
        await era.printAndWait(`「啊哈啊…再用力一点啊…呼♪噗～」`); // :775
        await era.printAndWait(
          `${target_name}双腿夹住${player_name}的头，发出挑衅般充满快感的呻吟声………`,
        ); // :776
        // CFLAG:302  = 5（变量语义：CFLAG 族，302） // :777
        kojo.舔阴 = 5; // :777
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.舔阴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :779
        await era.printAndWait(`「真开心啊…哟…哈啊${heart(1)}」`); // :780
        await era.printAndWait(
          `${target_name}分开自己的双腿带着陶醉的神色享受着${player_name}的爱抚………`,
        ); // :781
        // CFLAG:302  = 4（变量语义：CFLAG 族，302） // :782
        kojo.舔阴 = 4; // :782
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.舔阴 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :784
        await era.printAndWait(`「嘛…很好…啊唔…啊…哈…哈…」`); // :785
        await era.printAndWait(
          `${target_name}分开自己的双腿接受着${player_name}的爱抚………`,
        ); // :786
        // CFLAG:302  = 3（变量语义：CFLAG 族，302） // :787
        kojo.舔阴 = 3; // :787
      } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 === 2) {
        // :789
        await era.printAndWait(`「你这变态！快给我去死啊！滚、滚开！」`); // :790
        await era.printAndWait(
          `${player_name}抱住还在痛骂着的${target_name}的大腿，把阴唇含在了嘴里………`,
        ); // :791
        // CFLAG:302  = 2（变量语义：CFLAG 族，302） // :792
        kojo.舔阴 = 2; // :792
      } // :792-793
      return 0; // :792-794
    } // :792-795
  } // :796-799

  if (era_flag.selectcom === 2) {
    // :801

    if (kojo.肛门爱抚 === 0) {
      // :803

      if ((era.get(`abl:${target}:3`) || 0) >= 3) {
        // :805
        await era.printAndWait(`「啊…呀啊…啊！还不够啊…唔…啊啊！」`); // :806
        await era.printAndWait(
          `${target_name}的肛门在${player_name}手指的挑动下几近痉挛，欲望高涨………`,
        ); // :807
      } else {
        // :807-808
        await era.printAndWait(`「啊，不要这样！」`); // :809
        await era.printAndWait(
          `${target_name}摆动着腰肢想从${player_name}的手指中逃离………`,
        ); // :810
      } // :810-811
      // CFLAG:TARGET:303  = 1（变量语义：CFLAG 族，TARGET:303） // :812
      kojo.肛门爱抚 = 1; // :812
      return 0; // :812-813
    } else {
      // :815-816
      P =
        (era.get(`palam:${target}:3`) || 0) +
        (era.get(`delta:${target}:3`) || 0); // PALAM:3 + UP:3 // :816

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`talent:${target}:77`) || 0) === 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :818
        await era.printAndWait(`「啊呜…肛门…变得黏糊糊的啦…${heart(1)}」`); // :819
        await era.printAndWait(
          `${target_name}的肛门在${player_name}手指的挑动下几近痉挛，欲望高涨………`,
        ); // :820
        // CFLAG:303  = 9（变量语义：CFLAG 族，303） // :821
        kojo.肛门爱抚 = 9; // :821
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :823
        await era.printAndWait(`「啊哈哈♪　想要更多！♪」`); // :824
        await era.printAndWait(
          `${target_name}的肛门夹紧了${player_name}的手指欢快地蠕动着………`,
        ); // :825
        // CFLAG:303  = 8（变量语义：CFLAG 族，303） // :826
        kojo.肛门爱抚 = 8; // :826
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        P < PALAMLV[2] &&
        (kojo.肛门爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :828
        await era.printAndWait(`「还要更湿一点呢……」`); // :829
        await era.printAndWait(
          `${target_name}的肛门似乎还没有充分润滑，对于爱抚显得有些痛苦………`,
        ); // :830
        // CFLAG:303  = 7（变量语义：CFLAG 族，303） // :831
        kojo.肛门爱抚 = 7; // :831
      } else if (
        (era.get(`talent:${target}:77`) || 0) === 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :833
        await era.printAndWait(
          `「啊咿…呜…啊啊啊啊…屁股…啊…要、要上天了啦！${heart(1)}」`,
        ); // :834
        await era.printAndWait(
          `${target_name}的肛门紧紧的夹住${player_name}的手指，完全无法抽出来………`,
        ); // :835
        // CFLAG:303  = 6（变量语义：CFLAG 族，303） // :836
        kojo.肛门爱抚 = 6; // :836
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :838
        await era.printAndWait(`「屁股小穴…好、好舒服…♪ 想…想要更多………♪」`); // :839
        await era.printAndWait(
          `${target_name}的肛门夹紧了${player_name}的手指欢快地蠕动着………`,
        ); // :840
        // CFLAG:303  = 5（变量语义：CFLAG 族，303） // :841
        kojo.肛门爱抚 = 5; // :841
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        P < PALAMLV[2] &&
        (kojo.肛门爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :843
        await era.printAndWait(`「…呀！　还要更湿一点才能进去呢………」`); // :844
        await era.printAndWait(
          `${target_name}的肛门似乎还没有充分润滑，对于爱抚显得有些痛苦………`,
        ); // :845
        // CFLAG:303  = 4（变量语义：CFLAG 族，303） // :846
        kojo.肛门爱抚 = 4; // :846
      } else if (
        P >= PALAMLV[2] &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.肛门爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :848
        await era.printAndWait(`「难以置信…屁股的…快感…」`); // :849
        await era.printAndWait(
          `${target_name}的肛门紧紧的夹住了${player_name}的手指………`,
        ); // :850
        // CFLAG:303  = 3（变量语义：CFLAG 族，303） // :851
        kojo.肛门爱抚 = 3; // :851
      } else if (kojo.首次耻情Lv2 <= 1 || game.kojo.口上开关 === 2) {
        // :853
        await era.printAndWait(`「住手，你这卑贱的淫虫！」`); // :854
        await era.printAndWait(
          `${target_name}拼命地摆动着腰肢想从${player_name}的手指中逃离………`,
        ); // :855
        // CFLAG:303  = 2（变量语义：CFLAG 族，303） // :856
        kojo.肛门爱抚 = 2; // :856
      } // :856-857
      return 0; // :856-858
    } // :856-859
  } // :860-863

  if (era_flag.selectcom === 3) {
    // :865

    if (kojo.自慰 === 0) {
      // :867
      await era.printAndWait(`「嘁，自慰么…？」`); // :868
      // CFLAG:TARGET:304  = 1（变量语义：CFLAG 族，TARGET:304） // :869
      kojo.自慰 = 1; // :869
      return 0; // :869-870
    } else {
      // :872-874

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`talent:${target}:0`) || 0) === 1 &&
        (kojo.自慰 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :874
        await era.printAndWait(`「${sc()}的这里完全没被开发过哟……♪」`); // :875
        await era.printAndWait(`${target_name}边自慰着边露出充满快感的笑容。`); // :876
        await era.printAndWait(
          `「啊啊啊…呐诶…${sc()}就这样破掉自己的处女吧…魔王大人会发怒也没办法了啊啊！噗噜 ${heart(1)}」`,
        ); // :877
        await era.printAndWait(
          `开始兴奋起来的${target_name}自慰得更加激烈了……`,
        ); // :878
        // CFLAG:304  = 9（变量语义：CFLAG 族，304） // :879
        kojo.自慰 = 9; // :879
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:31`) || 0) >= 3 &&
        (kojo.自慰 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :881

        if (rand_n(3) === 0) {
          // :883
          await era.printAndWait(
            `「哈啊…哈啊…迫不及待了呢…光是手指已经不够了啊 ${heart(1)}」`,
          ); // :884
          await era.printAndWait(
            `${target_name}一边流着口水一边激烈地自慰着。`,
          ); // :885
          await era.printAndWait(
            `「啊啊啊…唔啊…已经…啊啊啊…完全停不下来了…停、停不下来了啊啊啊…呜…啊啊 ${heart(1)}」`,
          ); // :886
        } else if (rand_n(2) === 0) {
          // :887
          await era.printAndWait(
            `「呵啊…虽然很舒服但是有点累呢…明明对方就在我面前站着，却…诶嘿嘿 ${heart(1)}」`,
          ); // :888
          await era.printAndWait(
            `${target_name}边自慰边把目光投向${player_name}，眼中那充满欲望的湿润越发明显。`,
          ); // :889
          await era.printAndWait(
            `「啊啊…哈…哈啊${heart(1)}…啊啊啊…想要…哈啊啊${heart(1)}」`,
          ); // :890
        } else {
          // :890-891
          await era.printAndWait(
            `「啊啊啊…呜…哈啊啊啊！像那样…手指都累了呢…呜…啊啊啊…啊啊呜啊！${heart(1)}」`,
          ); // :892
          await era.printAndWait(
            `虽然这样说着${target_name}却完全没有停下来的意思，反而自慰得更加狂野了。`,
          ); // :893
          await era.printAndWait(
            `「已经，已经…像这样…全部都变得湿漉漉了…${heart(1)}」`,
          ); // :894
        } // :894-895
        // CFLAG:304  = 8（变量语义：CFLAG 族，304） // :896
        kojo.自慰 = 8; // :896
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:31`) || 0) < 3 &&
        (kojo.自慰 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :898

        if (rand_n(2) === 0) {
          // :900
          await era.printAndWait(
            `「呵啊…虽然很舒服但是有点累呢…明明对方就在我面前站着，却… ${heart(1)}」`,
          ); // :901
          await era.printAndWait(
            `${target_name}一边抱怨着一边继续自慰，修长的手指从私处带出爱液。`,
          ); // :902
          await era.printAndWait(`「唔…啊…啊啊…哈呜…呜${heart(1)}」`); // :903
        } else {
          // :903-904
          await era.printAndWait(
            `「啊啊啊…呜…哈啊啊啊！像那样…手指都累了呢…呜…啊啊啊…啊啊呜啊！」`,
          ); // :905
          await era.printAndWait(`${target_name}的动作越来越激烈。`); // :906
          await era.printAndWait(
            `「啊啊…像这样…已经等不及了呢…唔…呜啊…啊啊啊嗯${heart(1)}」`,
          ); // :907
        } // :907-908
        // CFLAG:304  = 7（变量语义：CFLAG 族，304） // :909
        kojo.自慰 = 7; // :909
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`talent:${target}:0`) || 0) === 1 &&
        (kojo.自慰 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :911
        await era.printAndWait(
          `「啊…${sc()}照做就是了…只能到这个地步，不能再欺负我了…！」`,
        ); // :912
        await era.printAndWait(`${target_name}带着淫荡的表情继续自慰。`); // :913
        await era.printAndWait(
          `「呜呜像${heart(1)} 这、这样已经是极限了…请让我自己来弄破处女膜吧…」`,
        ); // :914
        // CFLAG:304  = 6（变量语义：CFLAG 族，304） // :915
        kojo.自慰 = 6; // :915
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:31`) || 0) >= 3 &&
        (kojo.自慰 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :917

        if (rand_n(3) === 0) {
          // :919
          await era.printAndWait(
            `「居然想看${sc()}自慰的样子…魔王大人真是的…啊啊啊${heart(1)} ${sc()}的样子…再多看一点吧${heart(1)}」`,
          ); // :920
          await era.printAndWait(
            `${target_name}已经把${player_name}的注视抛在脑后继续自慰着。`,
          ); // :921
          await era.printAndWait(`「啊…呜呜…已经停不下来了！」`); // :922
        } else if (rand_n(2) === 0) {
          // :923
          await era.printAndWait(
            `「啊啊啊…比起自慰什么的反而…更想要魔王大人的手指啊！想要魔王大人的大肉棒啊！」`,
          ); // :924
          await era.printAndWait(
            `${target_name}一边说着一边沉浸在玩弄自己私处的快感中。`,
          ); // :925
          await era.printAndWait(
            `「啊啊…不行…不行…完全停不下来了…${heart(1)}」`,
          ); // :926
        } else {
          // :926-927
          await era.printAndWait(
            `「听人说手淫不好呢…手淫的孩子什么的…${sc()}才不会感谢你啊！」`,
          ); // :928
          await era.printAndWait(
            `虽然这么说着但${target_name}脸上带着淫靡的红晕，玩弄私处的手指完全没有停下来的迹象。`,
          ); // :929
          await era.printAndWait(
            `「咿…啊啊啊啊啊啊啊啊…呜…呼…啊啊啊啊…${heart(1)}」`,
          ); // :930
        } // :930-931
        // CFLAG:304  = 5（变量语义：CFLAG 族，304） // :932
        kojo.自慰 = 5; // :932
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:31`) || 0) < 3 &&
        (kojo.自慰 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :934

        if (rand_n(2) === 0) {
          // :936
          await era.printAndWait(
            `「居然想看${sc()}自慰的样子…魔王大人真是的…啊啊啊${heart(1)} ${sc()}的样子…再多看一点吧${heart(1)}」`,
          ); // :937
          await era.printAndWait(
            `${target_name}用期待的眼神看着这边自慰起来………`,
          ); // :938
        } else {
          // :938-939
          await era.printAndWait(
            `「啊啊啊…比起自慰什么的反而…更想要魔王大人的手指啊！想要魔王大人的大肉棒啊！」`,
          ); // :940
          await era.printAndWait(
            `${target_name}一边说着一边沉浸在来回玩弄自己私处的快感中。`,
          ); // :941
        } // :941-942
        // CFLAG:304  = 4（变量语义：CFLAG 族，304） // :943
        kojo.自慰 = 4; // :943
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`abl:${target}:31`) || 0) >= 1 &&
        (kojo.自慰 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :945

        if (rand_n(2) === 0) {
          // :947
          await era.printAndWait(`「哈啊…哈啊…呜…呼…啊呜…啊啊…咕噜！」`); // :948
          await era.printAndWait(
            `${target_name}咬着嘴唇继续自慰，偶尔从唇中发出淫靡的闷哼………`,
          ); // :949
        } else {
          // :949-950
          await era.printAndWait(
            `「啊…呜呜…看、看什么啊…变态！变态混蛋！…呜…啊啊啊啊！」`,
          ); // :951
          await era.printAndWait(
            `${target_name}一边痛骂看得津津有味的${player_name}一边继续自慰着………`,
          ); // :952
        } // :952-953
        // CFLAG:304  = 3（变量语义：CFLAG 族，304） // :954
        kojo.自慰 = 3; // :954
      } else if (kojo.自慰 <= 1 || game.kojo.口上开关 === 2) {
        // :956

        if (rand_n(2) === 0) {
          // :958
          await era.printAndWait(
            `「啊…我…呜呜…让${sc()}做这样的事情…不、不许看啊！………」`,
          ); // :959
          await era.printAndWait(`${target_name}抽动着自己的手指………`); // :960
        } else {
          // :960-961
          await era.printAndWait(
            `「啊啊…这样的事也…要${sc()}…呜…好的…唔啊！」`,
          ); // :962
          await era.printAndWait(
            `${target_name}像是被强行命令了一般拼命地抽动着手指………`,
          ); // :963
        } // :963-964
        // CFLAG:304  = 2（变量语义：CFLAG 族，304） // :965
        kojo.自慰 = 2; // :965
      } // :965-966
      return 0; // :965-967
    } // :965-968
  } // :969-972

  if (era_flag.selectcom === 5) {
    // :974

    if (kojo.胸爱抚 === 0) {
      // :976

      if (
        (era.get(`talent:${target}:130`) || 0) === 1 &&
        era.get(`palam:${target}:5`) > PALAMLV[3] &&
        era.get(`tequip:${target}:16`) === 0 &&
        era.get(`tequip:${target}:15`) === 0
      ) {
        // :978

        if (
          (era.get(`talent:${target}:85`) || 0) === 1 ||
          (era.get(`talent:${target}:76`) || 0) === 1
        ) {
          // :980

          if (
            (era.get(`talent:${target}:110`) || 0) === 1 ||
            (era.get(`talent:${target}:114`) || 0) === 1 ||
            (era.get(`talent:${target}:119`) || 0) === 1
          ) {
            // :982
            await era.printAndWait(
              `「啊啊…要${sc()}…这样做…会有奶汁什么的喷出来吧…」`,
            ); // :983
            await era.printAndWait(
              `${target_name}丰满的乳房挤出了乳汁，滋润着${player_name}的喉咙………`,
            ); // :984
          } else {
            // :984-985
            await era.printAndWait(
              `「啊啊…要${sc()}…这样做…会有奶汁什么的喷出来吧…」`,
            ); // :986
            await era.printAndWait(
              `${target_name}把还在吮吸着自己胸部的${player_name}的头轻轻抱住，温柔地叹息着………`,
            ); // :987
          } // :987-988
        } else {
          // :989-990

          if (
            (era.get(`talent:${target}:110`) || 0) === 1 ||
            (era.get(`talent:${target}:114`) || 0) === 1 ||
            (era.get(`talent:${target}:119`) || 0) === 1
          ) {
            // :992
            await era.printAndWait(`「快、快停下来…奶…不要啊…别吸啊，喂！」`); // :993
            await era.printAndWait(
              `母乳从${target_name}硕大的乳房滴出滋润着${player_name}的喉咙………………`,
            ); // :994
          } else {
            // :994-995
            await era.printAndWait(`「啊啊啊…那样的…像婴儿一样的…吸奶…呜！」`); // :996
            await era.printAndWait(
              `${target_name}的乳房被吸吮着感到有些痛苦………`,
            ); // :997
          } // :997-998
        } // :997-999
      } else {
        // :1000-1002

        if (
          (era.get(`talent:${target}:85`) || 0) === 1 ||
          (era.get(`talent:${target}:76`) || 0) === 1
        ) {
          // :1002

          if (
            (era.get(`talent:${target}:110`) || 0) === 1 ||
            (era.get(`talent:${target}:114`) || 0) === 1 ||
            (era.get(`talent:${target}:119`) || 0) === 1
          ) {
            // :1004
            await era.printAndWait(
              `「啊啊…哈啊啊…请随意玩弄${sc()}的胸部吧…只有主人可以哟～${heart(1)}」`,
            ); // :1005
            await era.printAndWait(
              `${target_name}丰满的乳房被揉搓着发出了这样的叹息………`,
            ); // :1006
          } else {
            // :1006-1007
            await era.printAndWait(`「啊…啊～…真是温柔的开始呢………」`); // :1008
            await era.printAndWait(
              `${target_name}的胸部被揉搓着发出甜蜜的喘息声………`,
            ); // :1009
          } // :1009-1010
        } else {
          // :1011-1012

          if (
            (era.get(`talent:${target}:110`) || 0) === 1 ||
            (era.get(`talent:${target}:114`) || 0) === 1 ||
            (era.get(`talent:${target}:119`) || 0) === 1
          ) {
            // :1014
            await era.printAndWait(
              `「嘁…被你这样的家伙…${sc()}引以为傲的胸部………放…放开啊！」`,
            ); // :1015
            await era.printAndWait(
              `${target_name}的丰乳被揉搓着，厌恶地扭动着身体………`,
            ); // :1016
          } else {
            // :1016-1017
            await era.printAndWait(
              `「哈啊…对胸部这么着迷，你这家伙有恋母情结么………呜！松开！别用牙咬啊！」`,
            ); // :1018
            await era.printAndWait(
              `${target_name}的胸被毫不留情地肆意玩弄着………`,
            ); // :1019
          } // :1019-1020
        } // :1019-1021
      } // :1022-1023
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306） // :1023
      kojo.胸爱抚 = 1; // :1023
      return 0; // :1023-1024
    } else {
      // :1026-1028

      if (
        (era.get(`talent:${target}:130`) || 0) === 1 &&
        era.get(`palam:${target}:5`) > PALAMLV[3] &&
        era.get(`tequip:${target}:16`) === 0 &&
        era.get(`tequip:${target}:15`) === 0
      ) {
        // :1028

        if (
          (era.get(`talent:${target}:76`) || 0) === 1 &&
          (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :1030

          if (
            (era.get(`talent:${target}:110`) || 0) === 1 ||
            (era.get(`talent:${target}:114`) || 0) === 1 ||
            (era.get(`talent:${target}:119`) || 0) === 1
          ) {
            // :1032
            await era.printAndWait(
              `「吸～来吸～吧！来喝${sc()}…的奶水！啊啊啊！去了～要去了！～${heart(1)}」`,
            ); // :1033
            await era.printAndWait(
              `${target_name}带着淫荡的表情挤压着自己丰满的乳房，挤出母乳滋润着${player_name}的喉咙………`,
            ); // :1034
          } else {
            // :1034-1035
            await era.printAndWait(
              `「呜，真是的……异常的舒服呢…被人吸的感觉是这样啊${heart(1)}…啊啊${sc()}要疯掉了～${heart(1)}」`,
            ); // :1036
            await era.printAndWait(
              `${target_name}的乳头被不断吸吮着，快感让她全身痉挛，心旷神怡………`,
            ); // :1037
          } // :1037-1038
          // CFLAG:306  = 5（变量语义：CFLAG 族，306） // :1039
          kojo.胸爱抚 = 5; // :1039
        } else if (
          (era.get(`talent:${target}:85`) || 0) === 1 &&
          (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :1041

          if (
            (era.get(`talent:${target}:110`) || 0) === 1 ||
            (era.get(`talent:${target}:114`) || 0) === 1 ||
            (era.get(`talent:${target}:119`) || 0) === 1
          ) {
            // :1043
            await era.printAndWait(
              `「啊啊…${sc()}的…胸部…会分泌出牛奶一样的乳汁呢…魔王大人…请喝我的母乳吧…${heart(1)}」`,
            ); // :1044
            await era.printAndWait(
              `${target_name}轻抚着正在吸吮自己胸部的${player_name}的头。`,
            ); // :1045
            await era.printAndWait(
              `带着淫荡表情的${target_name}那丰满的乳房挤出了乳汁，滋润着${player_name}的喉咙………`,
            ); // :1046
          } else {
            // :1046-1047
            await era.printAndWait(
              `「那个…那个…魔王要是想喝奶的话…${sc()}的奶水也很美味的说…${heart(1)}」`,
            ); // :1048
            await era.printAndWait(
              `${target_name}把还在吮吸着自己胸部的${player_name}的头轻轻抱住，温柔地叹息着………`,
            ); // :1049
          } // :1049-1050
          // CFLAG:306  = 4（变量语义：CFLAG 族，306） // :1051
          kojo.胸爱抚 = 4; // :1051
        } else if (
          (era.get(`abl:${target}:1`) || 0) >= 3 &&
          (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :1053

          if (
            (era.get(`talent:${target}:110`) || 0) === 1 ||
            (era.get(`talent:${target}:114`) || 0) === 1 ||
            (era.get(`talent:${target}:119`) || 0) === 1
          ) {
            // :1055
            await era.printAndWait(
              `「啊啊啊…这样…不过是吸奶而已…身体，不受控制了…来、来吧…♪」`,
            ); // :1056
            await era.printAndWait(
              `${target_name}硕大的乳房因为快感的缘故颤动着………`,
            ); // :1057
          } else {
            // :1057-1058
            await era.printAndWait(
              `「你怎么…像个婴儿一样啊…啊啊…咿啊…呜呜呜！」`,
            ); // :1059
            await era.printAndWait(
              `${target_name}因为快感而全身痉挛，母乳喷了出来………`,
            ); // :1060
          } // :1060-1061
          // CFLAG:306  = 3（变量语义：CFLAG 族，306） // :1062
          kojo.胸爱抚 = 3; // :1062
        } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
          // :1064

          if (
            (era.get(`talent:${target}:110`) || 0) === 1 ||
            (era.get(`talent:${target}:114`) || 0) === 1 ||
            (era.get(`talent:${target}:119`) || 0) === 1
          ) {
            // :1066
            await era.printAndWait(`「快、快停下来…胸部…不要啊…别吸啊，喂！」`); // :1067
            await era.printAndWait(
              `母乳从${target_name}硕大的乳房流出滋润着${player_name}的喉咙………………`,
            ); // :1068
          } else {
            // :1068-1069
            await era.printAndWait(`「啊啊啊…那样的…像婴儿一样的…吸奶…呜！」`); // :1070
            await era.printAndWait(
              `${target_name}的母乳被吸吮着感到有些痛苦………`,
            ); // :1071
          } // :1071-1072
          // CFLAG:306  = 2（变量语义：CFLAG 族，306） // :1073
          kojo.胸爱抚 = 2; // :1073
        } // :1073-1074
      } else {
        // :1073-1075

        if (
          (era.get(`talent:${target}:76`) || 0) === 1 &&
          (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :1077

          if (
            (era.get(`talent:${target}:110`) || 0) === 1 ||
            (era.get(`talent:${target}:114`) || 0) === 1 ||
            (era.get(`talent:${target}:119`) || 0) === 1
          ) {
            // :1079
            await era.printAndWait(
              `「等不及了…快来玩弄${sc()}淫荡下贱的奶子吧！唔啊！就、就是这样${heart(1)}」`,
            ); // :1080
            await era.printAndWait(
              `${player_name}将${target_name}丰满的乳房来回扭动着，${target_name}饶有兴致地把身子后仰享受这苦闷的快感………`,
            ); // :1081
          } else {
            // :1081-1082
            await era.printAndWait(
              `「啊啊…现在的…${sc()}的乳房…已经变得乱七八糟了啊${heart(1)} 啊呜啊啊啊啊${heart(1)}」`,
            ); // :1083
            await era.printAndWait(
              `${target_name}完全沉浸在对乳房的爱抚中，只顾着寻求更多的刺激………`,
            ); // :1084
          } // :1084-1085
          // CFLAG:306  = 5（变量语义：CFLAG 族，306） // :1086
          kojo.胸爱抚 = 5; // :1086
        } else if (
          (era.get(`talent:${target}:85`) || 0) === 1 &&
          (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :1088

          if (
            (era.get(`talent:${target}:110`) || 0) === 1 ||
            (era.get(`talent:${target}:114`) || 0) === 1 ||
            (era.get(`talent:${target}:119`) || 0) === 1
          ) {
            // :1090
            await era.printAndWait(
              `「哈啊…想要更多…${sc()}的胸需要魔王大人的爱心按摩啊啊${heart(1)} 这乳房已经完完全全被魔王大人征服了！」`,
            ); // :1091
            await era.printAndWait(
              `${target_name}丰满的乳房被揉搓着发出了满足的叹息………`,
            ); // :1092
          } else {
            // :1092-1093
            await era.printAndWait(
              `「啊…呜…啊嗯…哈啊…揉吧…${sc()}的胸部…请用力地摆布啊…${heart(1)}」`,
            ); // :1094
            await era.printAndWait(
              `${target_name}眼中泛着春光，接受着${player_name}的爱抚………`,
            ); // :1095
          } // :1095-1096
          // CFLAG:306  = 4（变量语义：CFLAG 族，306） // :1097
          kojo.胸爱抚 = 4; // :1097
        } else if (
          (era.get(`abl:${target}:1`) || 0) >= 3 &&
          (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :1099

          if (
            (era.get(`talent:${target}:110`) || 0) === 1 ||
            (era.get(`talent:${target}:114`) || 0) === 1 ||
            (era.get(`talent:${target}:119`) || 0) === 1
          ) {
            // :1101
            await era.printAndWait(
              `「哈啊…啊啊…怎么…${sc()}的胸部会有这样的感觉啊…啊啊…呜呜！」`,
            ); // :1102
            await era.printAndWait(
              `${target_name}丰满的乳房享受着爱抚变成了桃红色，嘴中泄露出娇艳的喘息声………`,
            ); // :1103
          } else {
            // :1103-1104
            await era.printAndWait(
              `「哈、哈啊…有恋母情结的人都喜欢这么做吗…呜…呜…哈啊！」`,
            ); // :1105
            await era.printAndWait(
              `${target_name}被${player_name}的爱抚弄得满脸红晕……`,
            ); // :1106
          } // :1106-1107
          // CFLAG:306  = 3（变量语义：CFLAG 族，306） // :1108
          kojo.胸爱抚 = 3; // :1108
        } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
          // :1110

          if (
            (era.get(`talent:${target}:110`) || 0) === 1 ||
            (era.get(`talent:${target}:114`) || 0) === 1 ||
            (era.get(`talent:${target}:119`) || 0) === 1
          ) {
            // :1112
            await era.printAndWait(`「该死……呜哇…！别碰我…迷恋胸部的变态…！」`); // :1113
            await era.printAndWait(
              `${target_name}因为硕乳被揉捏不高兴地摇了摇头………`,
            ); // :1114
          } else {
            // :1114-1115
            await era.printAndWait(
              `「你这恋母情结的变态！别、别揉我的胸了啊！…呜呜…住手！」`,
            ); // :1116
            await era.printAndWait(
              `${target_name}咬紧牙关忍受着对自己胸部的特殊关照………`,
            ); // :1117
          } // :1117-1118
          // CFLAG:306  = 2（变量语义：CFLAG 族，306） // :1119
          kojo.胸爱抚 = 2; // :1119
        } // :1119-1120
      } // :1119-1121
      return 0; // :1119-1122
    } // :1119-1123
  } // :1124-1127

  if (era_flag.selectcom === 6) {
    // :1129

    if (kojo.接吻 === 0 && game.train.初吻与自我口上) {
      // :1131

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        era_flag.assiplay === 0 &&
        era.get(`tequip:${target}:89`) === 0 &&
        era.get(`tequip:${target}:90`) === 0
      ) {
        // :1133
        await era.printAndWait(`「唔嗯…呜…啊啊………嗯哼…呜呜呜！」`); // :1134
        await era.printAndWait(`${target_name}的舌头纠缠了很久才舍得放开。`); // :1135
        await era.printAndWait(
          `「啊啊${heart(1)}……${sc()}的初吻的味道怎么样～…魔王大人${heart(1)}」`,
        ); // :1136
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        era_flag.assiplay === 0 &&
        era.get(`tequip:${target}:89`) === 0 &&
        era.get(`tequip:${target}:90`) === 0
      ) {
        // :1138
        await era.printAndWait(`「呜…啊啊…啊…呜呜…噗噜………」`); // :1139
        await era.printAndWait(
          `唇分开之后${target_name}凝视着${player_name}的脸庞。`,
        ); // :1140
        await era.printAndWait(
          `「呐，${sc()}的初吻已经…在这之前绝对没有和别人接吻过哦………${heart(1)}」`,
        ); // :1141
      } else {
        // :1143-1144
        await era.printAndWait(`「唔嗯！…呜啊…呜………这、这个……」`); // :1144
        await era.printAndWait(
          `${target_name}的嘴唇被肆意蹂躏着、懊悔地擦拭了好多次。`,
        ); // :1145
        await era.printAndWait(`「…${scf()}、${sc()}的初吻竟然………」`); // :1146
      } // :1146-1147
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :1148
      kojo.接吻 = 1; // :1148
      return 0; // :1148-1149
    } else if (kojo.接吻 === 0) {
      // :1151

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :1153
        await era.printAndWait(`「呜…唔啊…呜…还不够…呜…唔嗯…啊啊${heart(1)}」`); // :1154
        await era.printAndWait(
          `${target_name}与${player_name}的舌头纠缠在一起不愿分开。`,
        ); // :1155
        await era.printAndWait(`「呜…唔啊…啊啊啊…口水真美味啊…${heart(1)}」`); // :1156
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :1158
        await era.printAndWait(
          `「唔啊…吻我…呜…呜呜…跟魔王大人接吻…好开心${heart(1)}」`,
        ); // :1159
        await era.printAndWait(
          `${target_name}努力将温热的舌尖挤进${player_name}嘴中仔细品味着。`,
        ); // :1160
        await era.printAndWait(`「呼呼…呜…呜呜啊…唔嗯…唔…继续…${heart(1)}」`); // :1161
      } else {
        // :1163-1164
        await era.printAndWait(
          `「呜…真是屈辱…啊…呜…随你………呜…已、已经够了吧……」`,
        ); // :1164
        await era.printAndWait(`${target_name}眼泛泪光地瞪着${player_name}………`); // :1165
      } // :1165-1166
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :1167
      kojo.接吻 = 1; // :1167
      return 0; // :1167-1168
    } else {
      // :1170-1172

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.接吻 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :1172
        await era.printAndWait(
          `「啊哈…呼呜呜…还想要更多的啾啾…已经舒服到无法思考了啊啊啊${heart(1)}」`,
        ); // :1173
        await era.printAndWait(
          `${target_name}只是亲吻就已经泪光闪烁，积极地索求着舌间的纠缠。`,
        ); // :1174
        await era.printAndWait(
          `「呜呜…呼…啊啊…想…${sc()}想要更多唔嗯…${heart(1)}」`,
        ); // :1175
        // CFLAG:307  = 5（变量语义：CFLAG 族，307） // :1176
        kojo.接吻 = 5; // :1176
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.接吻 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :1178
        await era.printAndWait(
          `「啊、不行啊…太、太久了啦…呜…哈啊…呜呜…啊啊…呜呜呜……${heart(1)}」`,
        ); // :1179
        await era.printAndWait(
          `${target_name}予取予求地伸出舌头，因为兴奋不由自主地喘息着。`,
        ); // :1180
        await era.printAndWait(
          `「呜…啊啊…唔啊啊…更…更多一点…魔王大人…${heart(1)}」`,
        ); // :1181
        // CFLAG:307  = 4（变量语义：CFLAG 族，307） // :1182
        kojo.接吻 = 4; // :1182
      } else if (
        (era.get(`abl:${target}:10`) || 0) >= 2 &&
        (kojo.接吻 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :1184
        await era.printAndWait(`「呜…老实一点啊…啊…呜…呜呜…哈啊………」`); // :1185
        await era.printAndWait(`${target_name}的嘴唇毫不设防………`); // :1186
        // CFLAG:307  = 3（变量语义：CFLAG 族，307） // :1187
        kojo.接吻 = 3; // :1187
      } else if (kojo.接吻 <= 1 || game.kojo.口上开关 === 2) {
        // :1189
        await era.printAndWait(`「呜…那么…还不够么…啊…呜…唔啊！…够了！」`); // :1190
        await era.printAndWait(
          `${target_name}的下巴被${player_name}抓住，任由你摆布了………`,
        ); // :1191
        // CFLAG:307  = 2（变量语义：CFLAG 族，307） // :1192
        kojo.接吻 = 2; // :1192
      } // :1192-1193
      return 0; // :1192-1194
    } // :1192-1195
  } // :1196-1199

  if (era_flag.selectcom === 7) {
    // :1201

    if (kojo.自己扒开 === 0) {
      // :1203

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :1205
        await era.printAndWait(
          `「啊啊…魔王大人在看我的小穴…！再…再深一点…！」`,
        ); // :1206
        await era.printAndWait(
          `${target_name}脸上发热，仿佛在引诱${player_name}一般扒开自己的小穴………`,
        ); // :1207
        if ((era.get(`talent:${target}:0`) || 0) === 1) {
          // :1209
          await era.printAndWait(`「啊啊啊…连处女膜也…看得到哦！」`); // :1209
        } // :1209
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :1211
        await era.printAndWait(
          `「既然…想要看的话…那就…给你看好了～${heart(1)}」`,
        ); // :1212
        await era.printAndWait(
          `${target_name}因为羞耻涨红了脸，却仍用手指撑开小穴………`,
        ); // :1213
        if ((era.get(`talent:${target}:0`) || 0) === 1) {
          // :1215
          await era.printAndWait(`「啊…啊啊…处女膜都被看见了………」`); // :1215
        } // :1215
      } else {
        // :1217-1218
        await era.printAndWait(`「你…你这变态…死吧！去死啊啊！」`); // :1218
        await era.printAndWait(
          `${target_name}虽然痛骂着${player_name}却没能反抗这命令，用颤抖的手指分开了自己的阴唇………`,
        ); // :1219
      } // :1219-1220
      // CFLAG:TARGET:308  = 1（变量语义：CFLAG 族，TARGET:308） // :1221
      kojo.自己扒开 = 1; // :1221
      return 0; // :1221-1222
    } else {
      // :1224-1226

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.自己扒开 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :1226
        await era.printAndWait(
          `「真的吗，${sc()}的里面的样子${heart(1)} 真的能看得到吗？」`,
        ); // :1227
        await era.printAndWait(
          `${target_name}一边舔着嘴唇一边开心地分开阴唇。`,
        ); // :1228
        await era.printAndWait(
          `「啊啊啊…被你看到了哦${heart(1)}…我的一切都被你看到了呢${heart(1)}」`,
        ); // :1229
        if ((era.get(`talent:${target}:0`) || 0) === 1) {
          // :1231
          await era.printAndWait(
            `「啊啊处女膜也被看到了…！什么时候才要蹂躏它呢～」`,
          ); // :1231
        } // :1231
        // CFLAG:306  = 5（变量语义：CFLAG 族，306） // :1232
        kojo.胸爱抚 = 5; // :1232
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.自己扒开 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :1234
        await era.printAndWait(
          `「${sc()}的那里无论看多少次都不会厌…什么的…${sc()}…魔王大人是变态呜呜………」`,
        ); // :1235
        await era.printAndWait(
          `${target_name}虽然害羞却主动扩大着自己的小穴。`,
        ); // :1236
        await era.printAndWait(`「别…这样…节制一点！变态！」`); // :1237
        if ((era.get(`talent:${target}:0`) || 0) === 1) {
          // :1239
          await era.printAndWait(
            `「啊啊…处女膜…能看见吗？${scf()}、${sc()}…还是处女哟～………${heart(1)}」`,
          ); // :1239
        } // :1239
        // CFLAG:306  = 4（变量语义：CFLAG 族，306） // :1240
        kojo.胸爱抚 = 4; // :1240
      } else if (
        (era.get(`abl:${target}:17`) || 0) >= 3 &&
        (kojo.自己扒开 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :1242
        await era.printAndWait(
          `「你这变态…想看就看吧…看…我啊…你就喜欢这种事情吧？」`,
        ); // :1243
        await era.printAndWait(`${target_name}舔着嘴唇分开双腿展示出阴部。`); // :1244
        await era.printAndWait(
          `「啊啊啊…哈…看看吧…看啊！这就是你想看到的吧！…啊…哈哈啊」`,
        ); // :1245
        // CFLAG:306  = 3（变量语义：CFLAG 族，306） // :1246
        kojo.胸爱抚 = 3; // :1246
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
        // :1248
        await era.printAndWait(
          `「看就算了…还、还要我自己张开…你在看哪儿啊…大变态！」`,
        ); // :1249
        await era.printAndWait(
          `${target_name}一边咒骂一边慢慢用手指打开了小穴……`,
        ); // :1250
        // CFLAG:306  = 2（变量语义：CFLAG 族，306） // :1251
        kojo.胸爱抚 = 2; // :1251
      } // :1251-1252
      return 0; // :1251-1253
    } // :1251-1254
  } // :1255-1258

  if (era_flag.selectcom === 8) {
    // :1260

    if (kojo.插入手指 === 0) {
      // :1262

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :1264
        await era.printAndWait(`「啊啊…啊啊啊…呜呜呜…手指…好粗大…！」`); // :1265
        await era.printAndWait(
          `${target_name}一边说着一边感受着${player_name}手指插入带来的兴奋………`,
        ); // :1266
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :1268
        await era.printAndWait(`「啊啊…呜…这、这样的…啊…啊啊！」`); // :1269
        await era.printAndWait(
          `${target_name}因为异物的侵入皱起眉头，咬了咬嘴唇………`,
        ); // :1270
      } else {
        // :1272-1273
        await era.printAndWait(`「停、停下来…别用、用…手指进来…啊啊啊！」`); // :1273
        await era.printAndWait(`${target_name}因为强烈的异物感而尖叫起来………`); // :1274
      } // :1274-1275
      // CFLAG:TARGET:309  = 1（变量语义：CFLAG 族，TARGET:309） // :1276
      kojo.插入手指 = 1; // :1276
      return 0; // :1276-1277
    } else {
      // :1279-1281

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.插入手指 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :1281
        await era.printAndWait(
          `「啊…啊啊啊…！用手指…搅动${sc()}淫荡的小穴啊啊…哈、哈啊${heart(1)}」`,
        ); // :1282
        await era.printAndWait(
          `${target_name}沉浸在快感中，扭动起腰肢配合着搅动的手指。`,
        ); // :1283
        await era.printAndWait(`「啊…唔嗯…魔王大人…主人………${heart(1)}」`); // :1284
        // CFLAG:309  = 6（变量语义：CFLAG 族，309） // :1285
        kojo.插入手指 = 6; // :1285
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.插入手指 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :1287
        await era.printAndWait(
          `「啊啊！这、这是…要对${sc()}做这样的事情…呜…唔啊啊啊！」`,
        ); // :1288
        await era.printAndWait(`${target_name}在这个瞬间皱着眉勉强地摇着头。`); // :1289
        await era.printAndWait(
          `「${sc()}…看上去很奇怪吧…唔啊唔啊啊啊${heart(1)}」`,
        ); // :1290
        // CFLAG:309  = 5（变量语义：CFLAG 族，309） // :1291
        kojo.插入手指 = 5; // :1291
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.插入手指 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :1293
        await era.printAndWait(`「啊啊…哈…好粗…呜啊…啊啊啊！」`); // :1294
        await era.printAndWait(
          `${target_name}因为异物的侵入皱起眉头，咬了咬嘴唇………`,
        ); // :1295
        // CFLAG:309  = 4（变量语义：CFLAG 族，309） // :1296
        kojo.插入手指 = 4; // :1296
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.插入手指 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :1298
        await era.printAndWait(`「你…你喜、喜欢就好…啊啊…呜…呜呜呜！」`); // :1299
        await era.printAndWait(`${target_name}配合着手指插入的动作做着反应………`); // :1300
        // CFLAG:309  = 3（变量语义：CFLAG 族，309） // :1301
        kojo.插入手指 = 3; // :1301
      } else if (kojo.插入手指 <= 1 || game.kojo.口上开关 === 2) {
        // :1303
        await era.printAndWait(
          `「哼嗯…变态色狼连这样的事也…完全理解不了这种事有什么好啊啊…啊啊…呜呜…！」`,
        ); // :1304
        await era.printAndWait(
          `${target_name}边骂着边扭动着身体想要逃离手指的侵袭………`,
        ); // :1305
        // CFLAG:309  = 2（变量语义：CFLAG 族，309） // :1306
        kojo.插入手指 = 2; // :1306
      } // :1306-1307
      return 0; // :1306-1308
    } // :1306-1309
  } // :1310-1313

  if (era_flag.selectcom === 9) {
    // :1315

    if (kojo.舔肛 === 0) {
      // :1317

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :1319
        await era.printAndWait(`「还要…请继续啊啊…♪」`); // :1320
        await era.printAndWait(`${target_name}在舔舐下括约肌完全放松了下来………`); // :1321
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :1323
        await era.printAndWait(
          `「唔嗯，很脏呢♪变态${heart(1)}变态${heart(1)} 下流${heart(1)}」`,
        ); // :1324
        await era.printAndWait(
          `${target_name}故作愤怒的样子可爱极了，肛门的快感让她不由发出淫靡的喘息………`,
        ); // :1325
      } else {
        // :1327-1328
        await era.printAndWait(`「变态！　混蛋！　人渣！」`); // :1328
        await era.printAndWait(
          `${target_name}虽然痛骂着${player_name}却无力反抗………`,
        ); // :1329
      } // :1329-1330
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310） // :1331
      kojo.舔肛 = 1; // :1331
      return 0; // :1331-1332
    } else {
      // :1334-1336

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`talent:${target}:77`) || 0) === 1 &&
        (kojo.舔肛 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :1336
        await era.printAndWait(
          `「啊啊啊啊啊啊…呜、呜呜…屁股…只是被舔而已嘛…唔啊啊啊${heart(1)}」`,
        ); // :1337
        await era.printAndWait(
          `${target_name}感受着肛门的快感发出意乱神迷的声音………`,
        ); // :1338
        // CFLAG:310  = 7（变量语义：CFLAG 族，310） // :1339
        kojo.舔肛 = 7; // :1339
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.舔肛 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :1341
        await era.printAndWait(`「屁股小穴，在舌头上融化了…♪」`); // :1342
        await era.printAndWait(
          `${target_name}被舔舐而露出要化掉一般舒爽的神色………`,
        ); // :1343
        // CFLAG:310  = 6（变量语义：CFLAG 族，310） // :1344
        kojo.舔肛 = 6; // :1344
      } else if (
        (era.get(`talent:${target}:77`) || 0) === 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :1346
        await era.printAndWait(
          `「想要…更深一点…来吧${heart(1)} 用力哟${heart(1)}」`,
        ); // :1347
        await era.printAndWait(`${target_name}仅仅是被舔肛门就快要发狂了………`); // :1348
        // CFLAG:310  = 5（变量语义：CFLAG 族，310） // :1349
        kojo.舔肛 = 5; // :1349
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.舔肛 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :1351
        await era.printAndWait(`「啊啊啊…来、来吧，很舒服的呢…！」`); // :1352
        await era.printAndWait(
          `${target_name}被${player_name}精心舔舐的时候，能感觉到肛门的颤动………`,
        ); // :1353
        // CFLAG:310  = 4（变量语义：CFLAG 族，310） // :1354
        kojo.舔肛 = 4; // :1354
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.舔肛 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :1356
        await era.printAndWait(`「哈啊啊…这…啊啊啊…这样的事…${sc()}…呜呜！」`); // :1357
        await era.printAndWait(`${target_name}被舔舐的同时懊恼的咬着嘴唇………`); // :1358
        // CFLAG:310  = 3（变量语义：CFLAG 族，310） // :1359
        kojo.舔肛 = 3; // :1359
      } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 === 2) {
        // :1361
        await era.printAndWait(
          `「这…！变态！你、你居然舔我的屁股…啊啊…完全不能接受…渣、渣滓！」`,
        ); // :1362
        await era.printAndWait(
          `${target_name}除了肛门被舔的厌恶以外似乎还感到了另一种奇怪的感觉………`,
        ); // :1363
        // CFLAG:310  = 2（变量语义：CFLAG 族，310） // :1364
        kojo.舔肛 = 2; // :1364
      } // :1364-1365
      return 0; // :1364-1366
    } // :1364-1367
  } // :1368-1371

  if (era_flag.selectcom === 10) {
    // :1373

    if (kojo.振动宝石 === 0) {
      // :1375

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :1377
        await era.printAndWait(`「啊，真是的…这种道具也不错嘛…♪」`); // :1378
        await era.printAndWait(
          `${target_name}一边喘息着，一边沉浸在振动宝石给予的快感中。`,
        ); // :1379
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 1
      ) {
        // :1381
        await era.printAndWait(`「呜…哼啊…要用这种东西吗…？」`); // :1382
        await era.printAndWait(
          `${target_name}看着振动宝石皱了皱眉头，露出寂寞的表情………`,
        ); // :1383
      } else {
        // :1385-1386
        await era.printAndWait(`「真的…要、要这样吗…唔啊！」`); // :1386
        await era.printAndWait(
          `${target_name}摇着头，拼命地忍受着异样的感觉………`,
        ); // :1387
      } // :1387-1388
      // CFLAG:TARGET:311  = 1（变量语义：CFLAG 族，TARGET:311） // :1389
      kojo.振动宝石 = 1; // :1389
      return 0; // :1389-1390
    } else {
      // :1392-1394

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.振动宝石 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :1394
        await era.printAndWait(`「小豆豆哧哧的颤动着呢…♪」`); // :1395
        await era.printAndWait(
          `${target_name}流着口水沉浸在振动宝石带来的快感中。`,
        ); // :1396
        await era.printAndWait(
          `「呜…唔嗯…阴蒂的感觉${heart(1)}…好舒服${heart(1)}」`,
        ); // :1397
        // CFLAG:311  = 5（变量语义：CFLAG 族，311） // :1398
        kojo.振动宝石 = 5; // :1398
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.振动宝石 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :1400
        await era.printAndWait(`「哈哈…好的哟～…」`); // :1401
        await era.printAndWait(
          `${target_name}受到振动宝石的刺激坦率地发出了喘息声。`,
        ); // :1402
        await era.printAndWait(
          `「啊啊咿…呜…啊啊啊…阴蒂要…麻痹了啊…${heart(1)}」`,
        ); // :1403
        // CFLAG:311  = 4（变量语义：CFLAG 族，311） // :1404
        kojo.振动宝石 = 4; // :1404
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.振动宝石 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :1406
        await era.printAndWait(`「发、发麻了…已经…真是的！」`); // :1407
        await era.printAndWait(
          `${target_name}的身体因为受到振动宝石的刺激坦率地喘息着，因为快感而扭动着腰部。`,
        ); // :1408
        // CFLAG:311  = 3（变量语义：CFLAG 族，311） // :1409
        kojo.振动宝石 = 3; // :1409
      } else if (kojo.振动宝石 <= 1 || game.kojo.口上开关 === 2) {
        // :1411
        if (rand_n(2) === 0) {
          // :1412
          await era.printAndWait(`「你…你这变态！…啊啊…呜呜」`); // :1413
          await era.printAndWait(
            `${target_name}虽然嘴上不饶人，却也无法抵抗这种刺激………`,
          ); // :1414
        } else {
          // :1414-1415
          await era.printAndWait(`「啊啊…感觉…感觉好难受啊…真是的！」`); // :1416
          await era.printAndWait(
            `${target_name}摇晃着头拼命忍耐着强烈的刺激………`,
          ); // :1417
        } // :1417-1418
        // CFLAG:311  = 2（变量语义：CFLAG 族，311） // :1419
        kojo.振动宝石 = 2; // :1419
      } // :1419-1420
      return 0; // :1419-1421
    } // :1419-1422
  } // :1423-1426

  if (era_flag.selectcom === 11 && era.get(`tequip:${target}:11`)) {
    // :1429

    if (kojo.壶虫 === 0) {
      // :1431

      if ((era.get(`talent:${target}:0`) || 0) === 1) {
        // :1433

        if ((era.get(`talent:${target}:76`) || 0) === 1) {
          // :1435
          await era.printAndWait(
            `「这可是我的第一次哦～…啊哈哈…这样的感觉也不错嘛♪」`,
          ); // :1436
          await era.printAndWait(
            `${target_name}在蠕虫进入阴道的最深处夺取处女的同时，兴奋不安地扭动着腰………`,
          ); // :1437
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          // :1439
          await era.printAndWait(`「好、好希望是魔王大人来…唔啊！」`); // :1440
          await era.printAndWait(
            `${target_name}带着一抹落寞的表情随着蠕虫的抽插发出痛苦的悲鸣………`,
          ); // :1441
        } else {
          // :1443-1444
          await era.printAndWait(`「那、那样的话…」`); // :1444
          await era.printAndWait(
            `${target_name}对于自己的私处正被蠕虫入侵这件事情还有些难以置信。`,
          ); // :1445
          await era.printAndWait(
            `「开玩笑吧…这么脏的虫子…${sc()}的处子之身…啊啊啊！」`,
          ); // :1446
        } // :1446-1447
      } else {
        // :1449-1451

        if ((era.get(`talent:${target}:76`) || 0) === 1) {
          // :1451
          await era.printAndWait(`「还是挺长的嘛…感觉不错哦${heart(1)}」`); // :1452
          await era.printAndWait(
            `${target_name}因为在体内蠢蠢而动的蠕虫发出诱人的呻吟………`,
          ); // :1453
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          // :1455
          await era.printAndWait(`「这…这是…虫、虫子…进来了…啊啊啊啊！？」`); // :1456
          await era.printAndWait(
            `${target_name}因为阴道里蠕虫的抽插大声叫着………`,
          ); // :1457
        } else {
          // :1459-1460
          await era.printAndWait(
            `「这是什么！糟糕透了！咿呀！别，别动了啊！」`,
          ); // :1460
          await era.printAndWait(
            `${target_name}随着阴道里蠕虫的动静越来越大而昏倒了………`,
          ); // :1461
        } // :1461-1462
      } // :1463-1464
      // CFLAG:312  = 1（变量语义：CFLAG 族，312） // :1464
      kojo.壶虫 = 1; // :1464
      return 0; // :1464-1465
    } else {
      // :1467-1469

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.壶虫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :1469
        await era.printAndWait(`「已经上瘾了呢…♪」`); // :1470
        await era.printAndWait(
          `${target_name}被蠕虫一直侵犯着，放荡地摆动着腰诱惑起${player_name}。`,
        ); // :1471
        await era.printAndWait(
          `「啊啊啊…还在动${heart(1)}…${sc()}的小穴…好舒服啊…腰都不由自主地颤动起来了呢${heart(1)}」`,
        ); // :1472
        // CFLAG:312  = 5（变量语义：CFLAG 族，312） // :1473
        kojo.壶虫 = 5; // :1473
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.壶虫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :1475
        await era.printAndWait(`「咿…啊啊啊！身体里…的感觉…啊…呜…！」`); // :1476
        await era.printAndWait(`${target_name}随着蠕虫的蠕动抖动着腰。`); // :1477
        await era.printAndWait(
          `「${scf()}、${sc()}…心情还不错呢…${heart(1)}」`,
        ); // :1478
        // CFLAG:312  = 4（变量语义：CFLAG 族，312） // :1479
        kojo.壶虫 = 4; // :1479
      } else if (
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (kojo.壶虫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :1481
        await era.printAndWait(
          `「感觉么…才、才没有…开玩笑吧…${scf()}…${sc()}…呜呜！」`,
        ); // :1482
        await era.printAndWait(
          `${target_name}似乎已经习惯了虫子插入阴道的快感，但还不能坦率地承认这个事实……`,
        ); // :1483
        // CFLAG:312  = 3（变量语义：CFLAG 族，312） // :1484
        kojo.壶虫 = 3; // :1484
      } else if (kojo.壶虫 <= 1 || game.kojo.口上开关 === 2) {
        // :1486
        await era.printAndWait(`「被这样的低等生物…咿…呜…侵犯…啊啊啊！」`); // :1487
        await era.printAndWait(`${target_name}因为阴道里蠕虫的动作而悲鸣着………`); // :1488
        // CFLAG:312  = 2（变量语义：CFLAG 族，312） // :1489
        kojo.壶虫 = 2; // :1489
      } // :1489-1490
      return 0; // :1489-1491
    } // :1492-1494
  } else if (
    era_flag.selectcom === 11 &&
    era.get(`tequip:${target}:11`) === 0
  ) {
    // :1494

    if (
      (era.get(`talent:${target}:76`) || 0) === 1 &&
      (kojo.壶虫着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // :1496
      await era.printAndWait(`「呀啊啊…要拿下来吗…别拔出去嘛………」`); // :1497
      await era.printAndWait(`${target_name}娇声发出了抗议………`); // :1498
      // CFLAG:372  = 3（变量语义：CFLAG 族，372） // :1499
      kojo.壶虫着脱 = 3; // :1499
    } else if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (kojo.壶虫着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :1501
      await era.printAndWait(`「啊呜…啊啊啊啊…下次…要更………」`); // :1502
      await era.printAndWait(
        `${target_name}感觉不到那种异物感后觉得有些空虚………`,
      ); // :1503
      // CFLAG:372  = 2（变量语义：CFLAG 族，372） // :1504
      kojo.壶虫着脱 = 2; // :1504
    } else if (kojo.壶虫着脱 < 1 || game.kojo.口上开关 === 2) {
      // :1506
      await era.printAndWait(`「啊啊啊啊啊…这、这样就…被…啊啊啊啊……」`); // :1507
      await era.printAndWait(
        `${target_name}体下的蠕虫沾染的爱液之多令人感到讶异………`,
      ); // :1508
      // CFLAG:372  = 1（变量语义：CFLAG 族，372） // :1509
      kojo.壶虫着脱 = 1; // :1509
    } // :1509-1510
    return 0; // :1509-1511
  } // :1509-1512

  if (era_flag.selectcom === 12) {
    // :1517

    if (kojo.振动杖 === 0) {
      // :1519

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :1521
        await era.printAndWait(`「啊啊！这、这…还、还要${heart(1)}」`); // :1522
        await era.printAndWait(
          `${target_name}初次体验振动棒的按压，舒服到腰都直不起来了………`,
        ); // :1523
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :1525
        await era.printAndWait(
          `「啊啊啊！…魔界都是这样奇怪的道具吗…呜…呜呜${heart(1)}」`,
        ); // :1526
        await era.printAndWait(
          `${target_name}感受着震动棒的按压，因为那新鲜的感觉而颤抖着………`,
        ); // :1527
      } else {
        // :1529-1530
        await era.printAndWait(
          `「想做什么！？别、别用那种东西碰我啊！淫棍！」`,
        ); // :1530
        await era.printAndWait(
          `${target_name}感受着震动棒的按压一边叫骂，因为那新鲜的感觉而颤抖………`,
        ); // :1531
      } // :1531-1532
      // CFLAG:313  = 1（变量语义：CFLAG 族，313） // :1533
      kojo.振动杖 = 1; // :1533
      return 0; // :1533-1534
    } else {
      // :1536-1538

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.振动杖 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :1538
        await era.printAndWait(`「唔啊啊呜呜呜！再…再按紧一点${heart(1)}」`); // :1539
        await era.printAndWait(
          `${target_name}努力把下体凑到振动棒上，享受着更强的快感………`,
        ); // :1540
        // CFLAG:313  = 5（变量语义：CFLAG 族，313） // :1541
        kojo.振动杖 = 5; // :1541
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.振动杖 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :1543
        await era.printAndWait(`「哎呀！发麻了…啊…啊啊啊啊${heart(1)}」`); // :1544
        await era.printAndWait(
          `${target_name}在${player_name}的视线中因为振动棒带来的快感发出愉悦的呻吟………`,
        ); // :1545
        // CFLAG:313  = 4（变量语义：CFLAG 族，313） // :1546
        kojo.振动杖 = 4; // :1546
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.振动杖 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :1548
        await era.printAndWait(`「呜…！哈啊哈啊…啊啊啊」`); // :1549
        await era.printAndWait(`${target_name}老实地享受着振动棒带来的快感………`); // :1550
        // CFLAG:313  = 3（变量语义：CFLAG 族，313） // :1551
        kojo.振动杖 = 3; // :1551
      } else if (kojo.振动杖 <= 1 || game.kojo.口上开关 === 2) {
        // :1553
        await era.printAndWait(`「这…这东西…！住手！　人渣！…啊啊啊！」`); // :1554
        await era.printAndWait(
          `${target_name}因为振动棒被按在身上而大骂起来………`,
        ); // :1555
        // CFLAG:313  = 2（变量语义：CFLAG 族，313） // :1556
        kojo.振动杖 = 2; // :1556
      } // :1556-1557
      return 0; // :1556-1558
    } // :1556-1559
  } // :1560-1563

  if (era_flag.selectcom === 13 && era.get(`tequip:${target}:13`)) {
    // :1566

    if (kojo.肛门虫 === 0) {
      // :1568

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :1570
        await era.printAndWait(
          `「呜…奇怪的虫子…讨厌啦♪啊啊啊…全部…都插进来了${heart(1)}」`,
        ); // :1571
        await era.printAndWait(
          `${target_name}深深吐出一口气，平复着肛门虫带来的快感………`,
        ); // :1572
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :1574
        await era.printAndWait(
          `「啊…啊啊…在屁股里乱动！…哈哈啊…诶？里面很漂亮…吧…？」`,
        ); // :1575
        await era.printAndWait(
          `${target_name}脸上带着泪痕，因为肛门虫的快感身体颤抖着………`,
        ); // :1576
      } else {
        // :1578-1579
        await era.printAndWait(
          `「哇啊啊啊啊啊！那是什么东西啊！ 唔啊啊…屁股…会被、被吃掉的吧！？」`,
        ); // :1579
        await era.printAndWait(
          `${target_name}因为肛门虫的蠢动发出了可爱的悲鸣………`,
        ); // :1580
      } // :1580-1581
      // CFLAG:TARGET:314  = 1（变量语义：CFLAG 族，TARGET:314） // :1582
      kojo.肛门虫 = 1; // :1582
      return 0; // :1582-1583
    } else {
      // :1585-1587

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`talent:${target}:77`) || 0) === 1 &&
        (kojo.肛门虫 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :1587
        await era.printAndWait(
          `「啊啊啊啊啊啊…屁股小穴把…进去了！吞进去了！好棒啊！」`,
        ); // :1588
        await era.printAndWait(
          `${target_name}柔软的菊花把整个肛门虫都吞进去了。`,
        ); // :1589
        await era.printAndWait(
          `「唔啊！呜呜！…屁股小穴里已经变得黏黏糊糊的了！${heart(3)}」`,
        ); // :1590
        await era.printAndWait(`${target_name}翻着白眼沉浸在无比的快乐中………`); // :1591
        // CFLAG:314  = 9（变量语义：CFLAG 族，314） // :1592
        kojo.肛门虫 = 9; // :1592
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.肛门虫 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :1594
        await era.printAndWait(`「啊啊啊♪　在我的肛门里饲养它么…？」`); // :1595
        await era.printAndWait(
          `${target_name}朝${player_name}莞尔一笑，然后开心地疯狂抖动着屁股………`,
        ); // :1596
        // CFLAG:314  = 8（变量语义：CFLAG 族，314） // :1597
        kojo.肛门虫 = 8; // :1597
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.肛门虫 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :1599
        await era.printAndWait(`「咿哇…在里面动呢…！啊啊啊啊…♪」`); // :1600
        await era.printAndWait(
          `${target_name}因为肛门虫而露出淫荡的样子，已经很有感觉了呢………`,
        ); // :1601
        // CFLAG:314  = 7（变量语义：CFLAG 族，314） // :1602
        kojo.肛门虫 = 7; // :1602
      } else if (
        (era.get(`talent:${target}:77`) || 0) === 1 &&
        (kojo.肛门虫 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :1604
        await era.printAndWait(
          `「啊啊啊…啊…啊啊啊啊…屁股小穴…被蠕虫侵犯了${heart(1)}」`,
        ); // :1605
        await era.printAndWait(
          `${target_name}的肛门被下等生物蹂躏着反而发出了愉悦的声音。`,
        ); // :1606
        await era.printAndWait(
          `「额啊啊啊啊啊啊啊…${scf()}、${sc()}…已、已经…快要高潮了啦${heart(1)}」`,
        ); // :1607
        // CFLAG:314  = 6（变量语义：CFLAG 族，314） // :1608
        kojo.肛门虫 = 6; // :1608
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.肛门虫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :1610
        await era.printAndWait(
          `「屁股…像融化了一样…♪ 啊…啊啊啊啊${heart(1)}」`,
        ); // :1611
        await era.printAndWait(
          `${target_name}的肛门在蠕虫们的蹂躏下，已经产生了相当程度的快感………`,
        ); // :1612
        // CFLAG:314  = 5（变量语义：CFLAG 族，314） // :1613
        kojo.肛门虫 = 5; // :1613
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.肛门虫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :1615
        await era.printAndWait(`「有种…奇妙的感觉…啊…啊啊…！」`); // :1616
        await era.printAndWait(
          `${target_name}尽力忍耐着肛门里虫子翻绞产生的奇异的感觉………`,
        ); // :1617
        // CFLAG:314  = 4（变量语义：CFLAG 族，314） // :1618
        kojo.肛门虫 = 4; // :1618
      } else if (
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.肛门虫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :1620
        await era.printAndWait(`「里面…在搅拌呢…♪ 啊…啊啊」`); // :1621
        await era.printAndWait(
          `${target_name}因为肛门被虫子蹂躏脸上露出享受的神色………`,
        ); // :1622
        // CFLAG:314  = 3（变量语义：CFLAG 族，314） // :1623
        kojo.肛门虫 = 3; // :1623
      } else if (kojo.肛门虫 <= 1 || game.kojo.口上开关 === 2) {
        // :1625
        await era.printAndWait(
          `「搞什么啊！　${scf()}、${sc()}的屁股难道就任这些虫子施暴吗！」`,
        ); // :1626
        await era.printAndWait(
          `${target_name}对于在自己肛门内蠕动的虫子表现出显而易见的厌恶………`,
        ); // :1627
        // CFLAG:314  = 2（变量语义：CFLAG 族，314） // :1628
        kojo.肛门虫 = 2; // :1628
      } // :1628-1629
      return 0; // :1628-1630
    } // :1631-1633
  } else if (
    era_flag.selectcom === 13 &&
    era.get(`tequip:${target}:13`) === 0
  ) {
    // :1633

    if (
      (era.get(`talent:${target}:77`) || 0) === 1 &&
      (era.get(`talent:${target}:76`) || 0) === 1 &&
      (kojo.肛门虫着脱 < 6 || game.kojo.口上开关 === 2)
    ) {
      // :1635
      await era.printAndWait(
        `「呼啊啊啊…还不够呢…不够啊…屁股的感觉似乎变得很糟糕了呢！」`,
      ); // :1636
      // CFLAG:374  = 6（变量语义：CFLAG 族，374） // :1637
      kojo.肛门虫着脱 = 6; // :1637
    } else if (
      (era.get(`talent:${target}:76`) || 0) === 1 &&
      (kojo.肛门虫着脱 < 5 || game.kojo.口上开关 === 2)
    ) {
      // :1639
      await era.printAndWait(`「屁股…黏糊糊的哟………」`); // :1640
      // CFLAG:374  = 5（变量语义：CFLAG 族，374） // :1641
      kojo.肛门虫着脱 = 5; // :1641
    } else if (
      (era.get(`talent:${target}:77`) || 0) === 1 &&
      (kojo.肛门虫着脱 < 4 || game.kojo.口上开关 === 2)
    ) {
      // :1643
      await era.printAndWait(
        `「啊啊啊啊…有点遗憾呢…糟糕的屁股想要主人的肉棒了…」`,
      ); // :1644
      // CFLAG:374  = 4（变量语义：CFLAG 族，374） // :1645
      kojo.肛门虫着脱 = 4; // :1645
    } else if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (kojo.肛门虫着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // :1647
      await era.printAndWait(`「哈啊啊…更用力地…欺负我吧………」`); // :1648
      // CFLAG:374  = 3（变量语义：CFLAG 族，374） // :1649
      kojo.肛门虫着脱 = 3; // :1649
    } else if (
      (era.get(`abl:${target}:3`) || 0) >= 3 &&
      (kojo.肛门虫着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :1651
      await era.printAndWait(`「啊啊啊…啊…啊啊啊啊啊…屁股…意外地舒服呢………」`); // :1652
      // CFLAG:374  = 2（变量语义：CFLAG 族，374） // :1653
      kojo.肛门虫着脱 = 2; // :1653
    } else if (kojo.肛门虫着脱 < 1 || game.kojo.口上开关 === 2) {
      // :1655
      await era.printAndWait(`「总、总算…拿出去了…啊」`); // :1656
      // CFLAG:374  = 1（变量语义：CFLAG 族，374） // :1657
      kojo.肛门虫着脱 = 1; // :1657
    } // :1657-1658
    return 0; // :1657-1659
  } // :1657-1660

  if (era_flag.selectcom === 14 && era.get(`tequip:${target}:14`)) {
    // :1666

    if (kojo.阴蒂夹 === 0) {
      // :1668

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :1670
        await era.printAndWait(`「哈啊啊啊啊…小豆豆已经迫不及待了呢！来吧！」`); // :1671
        await era.printAndWait(
          `${target_name}毫不犹豫地把振动着的阴蒂夹给夹上了………`,
        ); // :1672
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :1674
        await era.printAndWait(
          `「啊…啊啊啊…感觉这东西…好厉害啊啊………${heart(1)}」`,
        ); // :1675
        await era.printAndWait(
          `${target_name}把阴蒂夹安上之后脸上浮现出淫荡的表情……`,
        ); // :1676
      } else {
        // :1678-1679
        await era.printAndWait(
          `「啊啊啊！这、这种东西！拿走！给我拿下去！啊啊！」`,
        ); // :1679
        await era.printAndWait(`${target_name}随着阴蒂夹震动变强发出哀鸣………`); // :1680
      } // :1680-1681
      // CFLAG:315  = 1（变量语义：CFLAG 族，315） // :1682
      kojo.阴蒂夹 = 1; // :1682
      return 0; // :1682-1683
    } else {
      // :1685-1687

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.阴蒂夹 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :1687
        await era.printAndWait(
          `「哈啊啊啊啊…小穴已经${heart(1)}　失去知觉了　${heart(1)} 唔嗯嗯嗯嗯！」`,
        ); // :1688
        await era.printAndWait(
          `${target_name}因为阴蒂夹的震动毫不掩饰地娇喘着………`,
        ); // :1689
        // CFLAG:315  = 5（变量语义：CFLAG 族，315） // :1690
        kojo.阴蒂夹 = 5; // :1690
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.阴蒂夹 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :1692
        await era.printAndWait(
          `「呜啊…哈啊…这、这太强了…呜啊啊啊！这个强度的…震动…太厉害了${heart(1)}」`,
        ); // :1693
        await era.printAndWait(
          `${target_name}伴随着阴蒂夹的震动声，发出愉悦的呻吟………`,
        ); // :1694
        // CFLAG:315  = 4（变量语义：CFLAG 族，315） // :1695
        kojo.阴蒂夹 = 4; // :1695
      } else if (
        (era.get(`abl:${target}:0`) || 0) >= 3 &&
        (kojo.阴蒂夹 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :1697
        await era.printAndWait(
          `「呜啊…呜…啊啊啊…这、这样…已经…啊啊啊…要去了！」`,
        ); // :1698
        await era.printAndWait(
          `${target_name}咬着嘴唇忍耐着压低娇喘的音量。她这个样子非常诱人………`,
        ); // :1699
        // CFLAG:315  = 3（变量语义：CFLAG 族，315） // :1700
        kojo.阴蒂夹 = 3; // :1700
      } else if (kojo.阴蒂夹 <= 1 || game.kojo.口上开关 === 2) {
        // :1702
        await era.printAndWait(
          `「用、用这种东西…我无话可说…混蛋！啊啊啊啊啊！」`,
        ); // :1703
        await era.printAndWait(
          `${target_name}虽然骂着，却也无法取下阴蒂夹，不断地发出哀鸣………`,
        ); // :1704
        // CFLAG:315  = 2（变量语义：CFLAG 族，315） // :1705
        kojo.阴蒂夹 = 2; // :1705
      } // :1705-1706
      return 0; // :1705-1707
    } // :1708-1710
  } else if (
    era_flag.selectcom === 14 &&
    era.get(`tequip:${target}:14`) === 0
  ) {
    // :1710

    if (
      (era.get(`talent:${target}:76`) || 0) === 1 &&
      (kojo.阴蒂夹着脱 < 4 || game.kojo.口上开关 === 2)
    ) {
      // :1712
      await era.printAndWait(`「啊啊…还是安上来比较舒服嘛………」`); // :1713
      // CFLAG:375  = 4（变量语义：CFLAG 族，375） // :1714
      kojo.阴蒂夹着脱 = 4; // :1714
    } else if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (kojo.阴蒂夹着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // :1716
      await era.printAndWait(`「哈啊哈啊…总算是结束了………」`); // :1717
      // CFLAG:375  = 3（变量语义：CFLAG 族，375） // :1718
      kojo.阴蒂夹着脱 = 3; // :1718
    } else if (
      (era.get(`abl:${target}:0`) || 0) >= 3 &&
      (kojo.阴蒂夹着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :1720
      await era.printAndWait(`「啊啊…哈…啊啊…啊啊啊………呜」`); // :1721
      // CFLAG:375  = 2（变量语义：CFLAG 族，375） // :1722
      kojo.阴蒂夹着脱 = 2; // :1722
    } else if (kojo.阴蒂夹着脱 < 1 || game.kojo.口上开关 === 2) {
      // :1724
      await era.printAndWait(`「总、总算是取下来了…就不能早点吗！废、废物！」`); // :1725
      // CFLAG:375  = 1（变量语义：CFLAG 族，375） // :1726
      kojo.阴蒂夹着脱 = 1; // :1726
    } // :1726-1727
    return 0; // :1726-1728
  } // :1726-1729

  if (era_flag.selectcom === 15 && era.get(`tequip:${target}:15`)) {
    // :1735

    if (kojo.乳头夹 === 0) {
      // :1737

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :1739
        await era.printAndWait(
          `「这、这个不错嘛！…乳头…啊啊啊啊…在哧哧地震动${heart(1)}」`,
        ); // :1740
        await era.printAndWait(
          `${target_name}因为乳头夹的振动呼吸变得粗重起来………`,
        ); // :1741
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :1743
        await era.printAndWait(`「呜…呼呼…这、这东西…还…还好啦${heart(1)}」`); // :1744
        await era.printAndWait(
          `${target_name}随着乳头夹的震动显露出淫荡的风情………`,
        ); // :1745
      } else {
        // :1747-1748
        await era.printAndWait(
          `「用这种道具…嘁！${sc()}…啊啊啊啊…怎、怎么会！」`,
        ); // :1748
        await era.printAndWait(
          `${target_name}的乳头持续被刺激着，以至于表情都有些扭曲了………`,
        ); // :1749
      } // :1749-1750
      // CFLAG:316  = 1（变量语义：CFLAG 族，316） // :1751
      kojo.乳头夹 = 1; // :1751
      return 0; // :1751-1752
    } else {
      // :1754-1756

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.乳头夹 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :1756
        await era.printAndWait(
          `「偶尔这样也不错嘛…${sc()}的乳头…要融化了啦${heart(1)}」`,
        ); // :1757
        await era.printAndWait(
          `${target_name}乳头持续受刺激以至于呼吸变得粗重起来………`,
        ); // :1758
        // CFLAG:316  = 5（变量语义：CFLAG 族，316） // :1759
        kojo.乳头夹 = 5; // :1759
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.乳头夹 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :1761
        await era.printAndWait(
          `「呼唔啊…不要再欺负…${scf()}、${sc()}的乳头…了啊…好嘛${heart(1)}」`,
        ); // :1762
        await era.printAndWait(
          `${target_name}随着乳头夹的震动显露出淫荡的风情………`,
        ); // :1763
        // CFLAG:316  = 4（变量语义：CFLAG 族，316） // :1764
        kojo.乳头夹 = 4; // :1764
      } else if (
        (era.get(`abl:${target}:1`) || 0) >= 3 &&
        (kojo.乳头夹 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :1766
        await era.printAndWait(
          `「这、这种程度…啊啊啊啊…才不在乎…什么嘛…啊啊啊啊啊！」`,
        ); // :1767
        await era.printAndWait(
          `${target_name}的乳头完全勃起了，乳头夹继续夹着她敏感的部位………`,
        ); // :1768
        // CFLAG:316  = 3（变量语义：CFLAG 族，316） // :1769
        kojo.乳头夹 = 3; // :1769
      } else if (kojo.乳头夹 <= 1 || game.kojo.口上开关 === 2) {
        // :1771
        await era.printAndWait(
          `「一点感觉都不会有的…这种事情才不会有感觉啊…！」`,
        ); // :1772
        await era.printAndWait(
          `${target_name}的乳头持续被刺激着，以至于表情都有些扭曲了………`,
        ); // :1773
        // CFLAG:316  = 2（变量语义：CFLAG 族，316） // :1774
        kojo.乳头夹 = 2; // :1774
      } // :1774-1775
      return 0; // :1774-1776
    } // :1777-1779
  } else if (
    era_flag.selectcom === 15 &&
    era.get(`tequip:${target}:15`) === 0
  ) {
    // :1779

    if (
      (era.get(`talent:${target}:76`) || 0) === 1 &&
      (kojo.乳头夹着脱 < 4 || game.kojo.口上开关 === 2)
    ) {
      // :1781
      await era.printAndWait(`「呜呜…啊啊…这淫荡的乳头变得更有感觉了呢………」`); // :1782
      // CFLAG:376  = 4（变量语义：CFLAG 族，376） // :1783
      kojo.乳头夹着脱 = 4; // :1783
    } else if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (kojo.乳头夹着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // :1785
      await era.printAndWait(`「哈…哈…别再欺负${sc()}了啦………」`); // :1786
      // CFLAG:376  = 3（变量语义：CFLAG 族，376） // :1787
      kojo.乳头夹着脱 = 3; // :1787
    } else if (
      (era.get(`abl:${target}:1`) || 0) >= 3 &&
      (kojo.乳头夹着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :1789
      await era.printAndWait(
        `「哼！一点感觉都没有…哈啊。对${sc()}一点意义都没有…唔啊啊」`,
      ); // :1790
      // CFLAG:376  = 2（变量语义：CFLAG 族，376） // :1791
      kojo.乳头夹着脱 = 2; // :1791
    } else if (kojo.乳头夹着脱 < 1 || game.kojo.口上开关 === 2) {
      // :1793
      await era.printAndWait(`「哈…哈…已经麻、麻木了………」`); // :1794
      // CFLAG:376  = 1（变量语义：CFLAG 族，376） // :1795
      kojo.乳头夹着脱 = 1; // :1795
    } // :1795-1796
    return 0; // :1795-1797
  } // :1795-1798

  if (era_flag.selectcom === 16 && era.get(`tequip:${target}:16`)) {
    // :1804

    if (kojo.榨乳器 === 0) {
      // :1806

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :1808
        await era.printAndWait(
          `「呀啊…${sc()}…射出来了射出来了！${heart(1)}…好、好刺激${heart(1)}」`,
        ); // :1809
        await era.printAndWait(
          `${target_name}被榨乳器榨出乳汁，发出了快意的呻吟………`,
        ); // :1810
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :1812
        await era.printAndWait(
          `「啊、啊啊…${sc()}的胸部…有东西出来了………${heart(1)}」`,
        ); // :1813
        await era.printAndWait(
          `${target_name}被榨乳器榨出乳汁的同时出神地凝望着榨乳器………`,
        ); // :1814
      } else {
        // :1816-1817
        await era.printAndWait(
          `「住…住手啊…${scf()}、${sc()}怎么可能有那种东西…啊啊啊啊！」`,
        ); // :1817
        await era.printAndWait(`${target_name}在榨乳器的压榨下发出悲鸣………`); // :1818
      } // :1818-1819
      // CFLAG:317  = 1（变量语义：CFLAG 族，317） // :1820
      kojo.榨乳器 = 1; // :1820
      return 0; // :1820-1821
    } else {
      // :1823-1825

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.榨乳器 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :1825
        await era.printAndWait(
          `「啊啊啊…有、有快感了…${sc()}…明明只是在蹂躏乳房而已啊…呜呜…要去了！要去了！」`,
        ); // :1826
        await era.printAndWait(
          `榨乳器开动的瞬间${target_name}的母乳就被吸了出来。`,
        ); // :1827
        await era.printAndWait(
          `「怎么会这样…奶水出来得太多了啦………${heart(1)}」`,
        ); // :1828
        // CFLAG:317  = 4（变量语义：CFLAG 族，317） // :1829
        kojo.榨乳器 = 4; // :1829
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.榨乳器 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :1831
        await era.printAndWait(
          `「胸部…已经流出来了…啊啊啊…魔王大人请享用这新鲜的乳汁吧………！」`,
        ); // :1832
        await era.printAndWait(
          `榨乳器毫不留情地吸出着${target_name}的母乳，母乳的流出使她愉悦地呻吟起来。`,
        ); // :1833
        await era.printAndWait(
          `「啊啊啊啊…${sc()}的…${sc()}感觉好奇怪…就像是…整个身体都要融化了呜呜呜 ${heart(1)}」`,
        ); // :1834
        // CFLAG:317  = 3（变量语义：CFLAG 族，317） // :1835
        kojo.榨乳器 = 3; // :1835
      } else if (kojo.榨乳器 <= 1 || game.kojo.口上开关 === 2) {
        // :1837
        await era.printAndWait(
          `「${scf()}、${sc()}…的母乳被你这样的小子…喝掉…才不要…啊啊啊啊啊！」`,
        ); // :1838
        await era.printAndWait(
          `榨乳器启动开始刺激${target_name}的乳房，然而似乎没有母乳被榨出来………`,
        ); // :1839
        // CFLAG:317  = 2（变量语义：CFLAG 族，317） // :1840
        kojo.榨乳器 = 2; // :1840
      } // :1840-1841
      return 0; // :1840-1842
    } // :1843-1845
  } else if (
    era_flag.selectcom === 16 &&
    era.get(`tequip:${target}:16`) === 0
  ) {
    // :1845

    if (
      (era.get(`talent:${target}:76`) || 0) === 1 &&
      (kojo.榨乳器着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // :1847
      await era.printAndWait(
        `「啊啊啊…母乳已经满了…真是糟糕呢…嘿嘿………${heart(1)}」`,
      ); // :1848
      // CFLAG:377  = 3（变量语义：CFLAG 族，377） // :1849
      kojo.榨乳器着脱 = 3; // :1849
    } else if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (kojo.榨乳器着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :1851
      await era.printAndWait(
        `「啊…哈…太好了…胸部没有什么异常反应呢…${heart(1)}」`,
      ); // :1852
      // CFLAG:377  = 2（变量语义：CFLAG 族，377） // :1853
      kojo.榨乳器着脱 = 2; // :1853
    } else if (kojo.榨乳器着脱 < 1 || game.kojo.口上开关 === 2) {
      // :1855
      await era.printAndWait(
        `「啊啊啊…啊啊啊…竟敢…榨取我的${sc()}乳汁呜啊啊………」`,
      ); // :1856
      // CFLAG:377  = 1（变量语义：CFLAG 族，377） // :1857
      kojo.榨乳器着脱 = 1; // :1857
    } // :1857-1858
    return 0; // :1857-1859
  } // :1857-1860

  if (era_flag.selectcom === 17 && era.get(`tequip:${target}:17`)) {
    // :1866

    if (kojo.飞机杯 === 0) {
      // :1868

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :1870
        await era.printAndWait(`「肉棒被摩擦的感觉……意外的舒服呢…」`); // :1871
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :1873
        await era.printAndWait(
          `「呜…啊…阴茎…被包裹起来…啊…不可思议的…快感…♪」`,
        ); // :1874
      } else {
        // :1876-1877
        await era.printAndWait(`「嘁…给我按上这样的东西干什么………！」`); // :1877
      } // :1877-1878
      // CFLAG:318  = 1（变量语义：CFLAG 族，318） // :1879
      kojo.飞机杯 = 1; // :1879
      return 0; // :1879-1880
    } else {
      // :1882-1884

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.飞机杯 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :1884
        await era.printAndWait(`「肉棒真舒服啊♪　飞机杯最好了～♪」`); // :1885
        await era.printAndWait(
          `${target_name}强忍着射精的冲动剧烈抽插着阴茎………`,
        ); // :1886
        // CFLAG:318  = 4（变量语义：CFLAG 族，318） // :1887
        kojo.飞机杯 = 4; // :1887
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.飞机杯 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :1889
        await era.printAndWait(
          `「呜…啊…阴茎…被包裹起来…啊…不可思议的…快感…♪」`,
        ); // :1890
        await era.printAndWait(`${target_name}看着飞机杯露出陶醉的神情………`); // :1891
        // CFLAG:318  = 3（变量语义：CFLAG 族，318） // :1892
        kojo.飞机杯 = 3; // :1892
      } else if (kojo.飞机杯 <= 1 || game.kojo.口上开关 === 2) {
        // :1894
        await era.printAndWait(`「为、为什么要${sc()}做…这么可怕的事情啊………」`); // :1895
        await era.printAndWait(
          `${target_name}羞耻地看着双腿间的飞机杯，欲哭无泪………`,
        ); // :1896
        // CFLAG:318  = 2（变量语义：CFLAG 族，318） // :1897
        kojo.飞机杯 = 2; // :1897
      } // :1897-1898
      return 0; // :1897-1899
    } // :1900-1902
  } else if (
    era_flag.selectcom === 17 &&
    era.get(`tequip:${target}:17`) === 0
  ) {
    // :1902

    if (
      (era.get(`talent:${target}:76`) || 0) === 1 &&
      (kojo.飞机杯着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // :1904
      await era.printAndWait(
        `「啊啊呜啊…可以的话，能别拔下来吗…想要更多的射精～${heart(1)}」`,
      ); // :1905
      // CFLAG:378  = 3（变量语义：CFLAG 族，378） // :1906
      kojo.飞机杯着脱 = 3; // :1906
    } else if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (kojo.飞机杯着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :1908
      await era.printAndWait(`「啊哈啊啊…真想继续下去啊………」`); // :1909
      // CFLAG:378  = 2（变量语义：CFLAG 族，378） // :1910
      kojo.飞机杯着脱 = 2; // :1910
    } else if (kojo.飞机杯着脱 < 1 || game.kojo.口上开关 === 2) {
      // :1912
      await era.printAndWait(`「啊啊啊…总算…取下来了………」`); // :1913
      // CFLAG:378  = 1（变量语义：CFLAG 族，378） // :1914
      kojo.飞机杯着脱 = 1; // :1914
    } // :1914-1915
    return 0; // :1914-1916
  } // :1914-1917

  if (era_flag.selectcom === 19 && era.get(`tequip:${target}:19`)) {
    // :1923

    if (kojo.肛珠 === 0) {
      // :1925

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :1927
        await era.printAndWait(
          `「啊啊呜…请继续欺负肛门吧！把珠子全都放进来${heart(1)}」`,
        ); // :1928
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :1930
        await era.printAndWait(`「啊啊啊啊…忍、忍不住了！…请温柔点…啊啊啊！」`); // :1931
      } else {
        // :1933-1934
        await era.printAndWait(
          `「呜…唔啊！住手啊你这混球！…怎么能放在做那种事的地方…啊啊啊！！」`,
        ); // :1934
      } // :1934-1935
      // CFLAG:TARGET:320  = 1（变量语义：CFLAG 族，TARGET:320） // :1936
      kojo.肛珠 = 1; // :1936
      return 0; // :1936-1937
    } else {
      // :1939-1941

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`talent:${target}:77`) || 0) === 1 &&
        (kojo.肛珠 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :1941
        await era.printAndWait(
          `「啊啊啊啊…还不够还不够…请、请更用力的蹂躏我的屁股小穴吧${heart(1)}」`,
        ); // :1942
        await era.printAndWait(
          `${target_name}的肛门像是还想要更多的珠子似的蠢动着………`,
        ); // :1943
        // CFLAG:320  = 9（变量语义：CFLAG 族，320） // :1944
        kojo.肛珠 = 9; // :1944
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.肛珠 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :1946
        await era.printAndWait(
          `「哎呀哎呀…${sc()}的肛门里…满满的都是…好充实${heart(1)}」`,
        ); // :1947
        await era.printAndWait(
          `${target_name}在珠子一个个放进来的过程中，发自内心地赞叹着………`,
        ); // :1948
        // CFLAG:320  = 8（变量语义：CFLAG 族，320） // :1949
        kojo.肛珠 = 8; // :1949
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.肛珠 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :1951
        await era.printAndWait(
          `「啊啊啊…屁股小穴已经饥渴难耐了！请把珠子全都塞进来啊啊${heart(1)}」`,
        ); // :1952
        await era.printAndWait(
          `${target_name}张开双腿以便珠子塞入，在完成后舒畅地喘息起来………`,
        ); // :1953
        // CFLAG:320  = 7（变量语义：CFLAG 族，320） // :1954
        kojo.肛珠 = 7; // :1954
      } else if (
        (era.get(`talent:${target}:77`) || 0) === 1 &&
        (kojo.肛珠 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :1956
        await era.printAndWait(
          `「屁眼要坏了…啊…啊啊…想要…想要更多的充实感啊！${heart(1)}」`,
        ); // :1957
        await era.printAndWait(
          `${target_name}的肛门非常柔软，甘之如饴地吞进了一个又一个串珠………`,
        ); // :1958
        // CFLAG:320  = 6（变量语义：CFLAG 族，320） // :1959
        kojo.肛珠 = 6; // :1959
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.肛珠 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :1961
        await era.printAndWait(
          `「${sc()}的屁股…被当做玩物了…啊啊…啊啊…啊呜呜${heart(1)}」`,
        ); // :1962
        await era.printAndWait(
          `${target_name}每被塞入一个肛珠就发出一声可爱的呻吟………`,
        ); // :1963
        // CFLAG:320  = 5（变量语义：CFLAG 族，320） // :1964
        kojo.肛珠 = 5; // :1964
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.肛珠 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :1966
        await era.printAndWait(`「啊…啊啊啊…变得、有点痛了…呜…啊啊啊啊！」`); // :1967
        await era.printAndWait(`${target_name}随着肛珠的进入发出痛苦的声音………`); // :1968
        // CFLAG:320  = 4（变量语义：CFLAG 族，320） // :1969
        kojo.肛珠 = 4; // :1969
      } else if (
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.肛珠 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :1971
        await era.printAndWait(
          `「${sc()}的屁股…才不会变成你的玩物…啊啊啊…咿…啊…呜呜」`,
        ); // :1972
        await era.printAndWait(
          `${target_name}的喘息声随着肛珠的进入变得粗重起来………`,
        ); // :1973
        // CFLAG:320  = 3（变量语义：CFLAG 族，320） // :1974
        kojo.肛珠 = 3; // :1974
      } else if (kojo.肛珠 <= 1 || game.kojo.口上开关 === 2) {
        // :1976
        await era.printAndWait(
          `「呜…唔啊！住手啊你这混球！…怎么能放在做那种事的地方…啊啊啊！！」`,
        ); // :1977
        await era.printAndWait(
          `${target_name}在肛珠被一次性全塞进去的时候就老实了下来………`,
        ); // :1978
        // CFLAG:320  = 2（变量语义：CFLAG 族，320） // :1979
        kojo.肛珠 = 2; // :1979
      } // :1979-1980
      return 0; // :1979-1981
    } // :1982-1984
  } else if (
    era_flag.selectcom === 19 &&
    era.get(`tequip:${target}:19`) === 0
  ) {
    // :1984

    if (
      (era.get(`talent:${target}:76`) || 0) === 1 &&
      (kojo.肛珠着脱 < 4 || game.kojo.口上开关 === 2)
    ) {
      // :1986
      await era.printAndWait(`「呜咿咿咿！肛门…里面搅成一团了${heart(1)}」`); // :1987
      await era.printAndWait(
        `${target_name}在肛珠拔出的过程中一直发出意义不明的呻吟………`,
      ); // :1988
      // CFLAG:379  = 4（变量语义：CFLAG 族，379） // :1989
      kojo.肛珠着脱 = 4; // :1989
    } else if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (kojo.肛珠着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // :1991
      await era.printAndWait(
        `「啊哈…啊…啊啊啊…${sc()}的屁股…被玩弄了…${heart(1)}」`,
      ); // :1992
      await era.printAndWait(`${target_name}露出意味深长的遗憾表情………`); // :1993
      // CFLAG:379  = 3（变量语义：CFLAG 族，379） // :1994
      kojo.肛珠着脱 = 3; // :1994
    } else if (
      (era.get(`abl:${target}:3`) || 0) >= 3 &&
      (kojo.肛珠着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :1996
      await era.printAndWait(`「啊哈！全、全部…全部都弄出来了呢…啊啊♪」`); // :1997
      await era.printAndWait(
        `${target_name}在肛门张开的过程中一直是一副出神的表情………`,
      ); // :1998
      // CFLAG:379  = 2（变量语义：CFLAG 族，379） // :1999
      kojo.肛珠着脱 = 2; // :1999
    } else if (kojo.肛珠着脱 < 1 || game.kojo.口上开关 === 2) {
      // :2001
      await era.printAndWait(`「不要啊…啊…啊啊…啊啊啊啊啊…呜呜呜……」`); // :2002
      await era.printAndWait(
        `${target_name}因为肛珠拔出的不适感一时呆若木鸡………`,
      ); // :2003
      // CFLAG:379  = 1（变量语义：CFLAG 族，379） // :2004
      kojo.肛珠着脱 = 1; // :2004
    } // :2004-2005
    return 0; // :2004-2006
  } // :2004-2007

  if (era_flag.selectcom === 20) {
    // :2012

    if (kojo.正常位 === 0) {
      // :2014

      if ((era.get(`talent:${target}:0`) || 0) === 1) {
        // :2016

        if ((era.get(`talent:${target}:76`) || 0) === 1) {
          // :2018

          if ((era.get(`talent:${target}:314`) || 0) === 9) {
            // :2020
            await era.printAndWait(
              `「哇啊啊…！好…好厉害…魔王大人的大肉棒${heart(1)}…${sc()}的处女膜…就请用力地捅破吧${heart(1)}」`,
            ); // :2021
            await era.printAndWait(
              `${target_name}光滑的皮肤变得通红，缠住${player_name}的双手在耳边低声私语。`,
            ); // :2022
            await era.printAndWait(
              `「就是这样…肆意玩弄${sc()}的小穴${heart(1)} 魔王大人${heart(1)}」`,
            ); // :2023
            await era.printAndWait(
              `「啊啊啊！被干得越来越舒服了啊${heart(1)}…想更多的品尝，魔王大人的大肉棒${heart(1)}」`,
            ); // :2024
          } else {
            // :2024-2025
            await era.printAndWait(`「${sc()}终于变成女人了呢…♪」`); // :2026
            await era.printAndWait(
              `${target_name}完全无视了破处之痛，脸上露出陶醉的表情。`,
            ); // :2027
            await era.printAndWait(
              `「在这个地方…真正变成魔王大人的女人…真是想都没有想到过呢…哇啊${heart(1)}」`,
            ); // :2028
            await era.printAndWait(
              `${target_name}还想要说什么，不过${player_name}早已心急地托起她的腰开始了征伐………`,
            ); // :2029
          } // :2029-2030
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          // :2032

          if ((era.get(`talent:${target}:314`) || 0) === 9) {
            // :2034
            await era.printAndWait(
              `「${scf()}…${sc()}…已经变成…魔王大人的………${heart(1)}」`,
            ); // :2035
            await era.printAndWait(
              `${target_name}的处女身被阴茎顶到最深处，忍着骤然产生的痛苦在魔王耳边细语着。`,
            ); // :2036
            await era.printAndWait(
              `「喂，喂…先说好，${sc()}要做第一夫人的哟？…唔，这么说你就是我的爱人啦…啊啊啊！别…别动啊！要去了…啊啊啊！」`,
            ); // :2037
            await era.printAndWait(
              `虽然作为魔族已经屈服了，但${target_name}似乎还不是太明白自己的处境呢～需要继续狠狠地调教她啊………`,
            ); // :2038
          } else {
            // :2038-2039
            await era.printAndWait(
              `「好幸福…！这、这样的…${scf()}、${sc()}的第一次…啦啦啦啦…${heart(1)}」`,
            ); // :2040
            await era.printAndWait(
              `${target_name}伸出双手挂在${player_name}脖子上，还是处子身的小穴被阴茎一下子顶到最深处。`,
            ); // :2041
            await era.printAndWait(
              `「既、既然…已经破了…就…就不用再担心了呢…动、用力地动起来吧………${heart(1)}」`,
            ); // :2042
            await era.printAndWait(
              `${target_name}兴奋地恳求着，于是${player_name}愈发激烈地抽查起来………`,
            ); // :2043
          } // :2043-2044
        } else {
          // :2046-2047
          await era.printAndWait(
            `「该、该死…${sc()}的处女…被你这种人…哇啊…啊啊啊啊啊啊啊！」`,
          ); // :2047
          await era.printAndWait(
            `${player_name}对${target_name}撕心裂肺的哭喊充耳不闻，自顾自地蹂躏着这令人心醉的胴体………`,
          ); // :2048
        } // :2048-2049
      } else {
        // :2051-2052
        if ((era.get(`talent:${target}:76`) || 0) === 1) {
          // :2052
          await era.printAndWait(`「抱紧我…♪」`); // :2053
          await era.printAndWait(
            `${target_name}和${player_name}拉着手紧抱在一起。`,
          ); // :2054
          await era.printAndWait(
            `「${sc()}的小穴已经泛滥成灾…来尽情地欺负我吧${heart(1)}」`,
          ); // :2055
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          // :2057
          await era.printAndWait(`「啊哈…开心…」`); // :2058
          await era.printAndWait(
            `${target_name}将双腿抬到最适合插入的角度，发出性感的喘息。`,
          ); // :2059
          await era.printAndWait(`「呜…喜欢…喜欢这种感觉${heart(1)}」`); // :2060
        } else {
          // :2062-2063
          await era.printAndWait(`「哼，你…你喜欢就好…淫棍………！」`); // :2063
          await era.printAndWait(
            `${target_name}表面上一副不以为然的样子，却随着肉棒的抽送发出懊悔的叹息声………`,
          ); // :2064
        } // :2064-2065
      } // :2066-2067
      // CFLAG:321  = 1（变量语义：CFLAG 族，321） // :2067
      kojo.正常位 = 1; // :2067
      return 0; // :2067-2068
    } else {
      // :2070-2072

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.正常位 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :2072
        if (rand_n(3) === 0) {
          // :2073
          await era.printAndWait(`「好的！　不错嘛！　更用力一点…♪」`); // :2074
          await era.printAndWait(
            `${target_name}在激烈的抽插下体液四溅，那样子就像是个下贱的妓女。`,
          ); // :2075
          await era.printAndWait(
            `「不要…停下来…小穴里${heart(1)}…要被肉棒${heart(1)} 刺穿了啊啊啊${heart(1)}」`,
          ); // :2076
        } else if (rand_n(2) === 0) {
          // :2077
          await era.printAndWait(
            `「啊啊啊…${sc()}…已经…变成魔王大人的肉棒的奴隶了…哈啊啊…请赏赐给您下贱的仆人，您那神圣的肉棒吧${heart(1)}」`,
          ); // :2078
          await era.printAndWait(
            `${target_name}的私处与${player_name}的阴茎紧紧的贴合在一起。`,
          ); // :2079
          await era.printAndWait(
            `「不要放开…要肉棒${heart(1)}…一定不要停止下来哟${heart(1)}」`,
          ); // :2080
        } else {
          // :2080-2081
          await era.printAndWait(
            `「呜…啊啊啊…请更加…更加严厉地惩罚我…惩罚我吧！」`,
          ); // :2082
          await era.printAndWait(
            `${target_name}向${player_name}撒娇般地要求着。`,
          ); // :2083
          await era.printAndWait(
            `「被肉棒惩罚…要高潮了${heart(1)}…已经到极限了啊啊${heart(1)}」`,
          ); // :2084
        } // :2084-2085
        // CFLAG:321  = 7（变量语义：CFLAG 族，321） // :2086
        kojo.正常位 = 7; // :2086
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.正常位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :2088
        if (rand_n(3) === 0) {
          // :2089
          await era.printAndWait(`「抱紧一点…要一直这样抱着我哟…呜呜♪」`); // :2090
          await era.printAndWait(
            `${target_name}边喘息着边撒娇似的调笑着正抱住自己的${target_name}。`,
          ); // :2091
          await era.printAndWait(
            `「啊啊啊…幸福…好幸福…被魔王大人抱着…是这个世界上最幸福的事情啦${heart(1)}」`,
          ); // :2092
        } else if (rand_n(2) === 0) {
          // :2093
          await era.printAndWait(
            `「啊啊…啊啊啊啊…更、更深一点…魔王大人的肉棒…到${scf()}、${sc()}的…最深处来…啊啊啊！」`,
          ); // :2094
          await era.printAndWait(
            `${target_name}一边扭动着腰一边在${player_name}耳边窃窃私语着。`,
          ); // :2095
          await era.printAndWait(
            `「这样…就像这样…深深地吻我…摸…我的乳房${heart(1)}」`,
          ); // :2096
        } else {
          // :2096-2097
          await era.printAndWait(
            `「啊啊啊…被…魔王大人您…做这样的事…非常的幸福呢………${heart(1)}」`,
          ); // :2098
          await era.printAndWait(
            `${target_name}似乎很喜欢${player_name}蹂躏她的小穴，脸上露出幸福的神色。`,
          ); // :2099
          await era.printAndWait(
            `「${sc()}…${sc()}…已、已经…到极限了了…要去了啊啊${heart(1)}」`,
          ); // :2100
        } // :2100-2101
        // CFLAG:321  = 6（变量语义：CFLAG 族，321） // :2102
        kojo.正常位 = 6; // :2102
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (kojo.正常位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :2104
        if (rand_n(3) === 0) {
          // :2105
          await era.printAndWait(
            `「嘁…呜噗…这样做…根本就不舒服啊…令人憎厌的家伙……啊啊啊」`,
          ); // :2106
          await era.printAndWait(
            `${target_name}倔强地忍住眼泪承受着${player_name}的侵犯。但她的下体似乎非常诚实地暴露出了对肉棒的渴望。`,
          ); // :2107
          await era.printAndWait(
            `「咿！呜…我…啊啊啊啊…已、已经…滚开…滚开啊！…啊啊啊啊！」`,
          ); // :2108
        } else if (rand_n(2) === 0) {
          // :2109
          await era.printAndWait(
            `${target_name}紧紧咬着嘴唇不想发出任何声音，但淫穴已经泛滥成灾仿佛在等待着男人的征讨。`,
          ); // :2110
          await era.printAndWait(
            `「呜…唔…呜呜…啊…啊…啊…啊啊啊啊…已经完全讨厌不起来了啊！啊啊啊啊！」`,
          ); // :2111
          await era.printAndWait(
            `${target_name}被情欲击溃了所有抵抗，发出呜呜的哭声………`,
          ); // :2112
        } else {
          // :2112-2113
          await era.printAndWait(
            `「这、这种事情……做出这样事情的你……该死的淫虫………去死啊！」`,
          ); // :2114
          await era.printAndWait(
            `${target_name}虽然嘴上对被侵犯的事情毫不谅解，却诱惑地扭动着腰用自己的身体取悦着${player_name}。`,
          ); // :2115
          await era.printAndWait(
            `「给我适可而止啊…滚开…拔出去…呜…太深了太深了唔啊啊！」`,
          ); // :2116
        } // :2116-2117
        // CFLAG:321  = 5（变量语义：CFLAG 族，321） // :2118
        kojo.正常位 = 5; // :2118
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (kojo.正常位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :2120
        await era.printAndWait(
          `「哈啊…啊…啊啊啊…这样就…${sc()}…啊啊啊！啊！啊啊啊啊！」`,
        ); // :2121
        await era.printAndWait(
          `${target_name}毫不掩饰的喘息让${player_name}的阴茎打了鸡血般变得更硬了………`,
        ); // :2122
        await era.printAndWait(
          `「啊…哎呀…变得，更大了啊…已经是极限了…啊啊啊啊！」`,
        ); // :2123
        // CFLAG:321  = 4（变量语义：CFLAG 族，321） // :2124
        kojo.正常位 = 4; // :2124
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.正常位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :2126
        await era.printAndWait(`「啊…呼…讨厌～…${sc()}…已经…啊啊啊啊！」`); // :2127
        await era.printAndWait(
          `${target_name}听天由命般任${player_name}粗暴地侵犯着自己………`,
        ); // :2128
        // CFLAG:321  = 3（变量语义：CFLAG 族，321） // :2129
        kojo.正常位 = 3; // :2129
      } else if (kojo.正常位 <= 1 || game.kojo.口上开关 === 2) {
        // :2131
        await era.printAndWait(
          `「呜…呜呜呜！被做了这样的事情…千万不能被其他人发现啊…！」`,
        ); // :2132
        await era.printAndWait(
          `${target_name}的私处似乎还承受不了这样的剧烈抽插，随着${player_name}的动作，${target_name}发出哀婉痛苦的悲鸣………`,
        ); // :2133
        // CFLAG:321  = 2（变量语义：CFLAG 族，321） // :2134
        kojo.正常位 = 2; // :2134
      } // :2134-2135
      return 0; // :2134-2136
    } // :2134-2137
  } // :2138-2141

  if (era_flag.selectcom === 21) {
    // :2143

    if (kojo.背后位 === 0) {
      // :2145

      if ((era.get(`talent:${target}:0`) || 0) === 1) {
        // :2147

        if ((era.get(`talent:${target}:76`) || 0) === 1) {
          // :2149

          if ((era.get(`talent:${target}:314`) || 0) === 9) {
            // :2151
            await era.printAndWait(
              `${target_name}被阴茎分开青色的臀肉，插入到最深处，发出泣诉似的呻吟。`,
            ); // :2152
            await era.printAndWait(
              `「啊哈…啊啊…啊啊啊呜${heart(1)} 好厉害啊…请继续…${heart(1)} ${sc()}的处女膜被夺走了啊啊啊${heart(1)}」`,
            ); // :2153
            await era.printAndWait(
              `${target_name}作为魔族证明的尾巴紧紧缠住${player_name}的腰部，仿佛是在寻求更加激烈的凌辱。`,
            ); // :2154
            await era.printAndWait(
              `「${sc()}、哈 ${heart(1)}…没问题的 ${heart(1)}…请继续侵犯我…想要魔王大人的大鸡巴${heart(3)}」`,
            ); // :2155
          } else {
            // :2155-2156
            await era.printAndWait(`「第一次被从后面插…好兴奋啊♪」`); // :2157
            await era.printAndWait(
              `${target_name}主动趴在地上引导${player_name}的阴茎插到最深处。`,
            ); // :2158
            await era.printAndWait(
              `「第一次感受到魔王大人的大肉棒威力呢…${sc()}好幸福啊${heart(1)}」`,
            ); // :2159
            await era.printAndWait(
              `${target_name}那刚刚被破处的小穴蠕动着，变本加厉地向${player_name}索求起来………`,
            ); // :2160
          } // :2160-2161
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          // :2163

          if ((era.get(`talent:${target}:314`) || 0) === 9) {
            // :2165
            await era.printAndWait(
              `${player_name}的下体狠狠刺破${target_name}的处女膜直到最深处，魔族的尾巴因为极度的愉悦直立起来`,
            ); // :2166
            await era.printAndWait(
              `「啊哈…啊啊啊啊…请…魔王大人…不要怜惜我…好棒…${heart(1)}」`,
            ); // :2167
            await era.printAndWait(
              `${target_name}用指爪支撑着趴在地上，${player_name}从后面不断抽插。`,
            ); // :2168
            await era.printAndWait(
              `「呜啊…啊哈哈…说、说真的…魔王大人的话…怎么使用${sc()}的身体…都无所谓哦${heart(1)}」`,
            ); // :2169
          } else {
            // :2169-2170
            await era.printAndWait(
              `「这…这姿势…像野兽交合一样…啊啊…啊呜啊！」`,
            ); // :2171
            await era.printAndWait(
              `${target_name}把自己的屁股高高举起，${player_name}收下这淫靡的贡品，夺走了${target_name}的纯洁。`,
            ); // :2172
            await era.printAndWait(
              `「这是${scf()}、${sc()}…的第一次…所以…请温柔……呜啊，温柔一点…啊啊啊啊！」`,
            ); // :2173
            await era.printAndWait(
              `${target_name}的话似乎没有起到什么作用，${player_name}毫不怜惜地蹂躏着这处女的肉穴………`,
            ); // :2174
          } // :2174-2175
        } else {
          // :2177-2178
          await era.printAndWait(
            `${player_name}毫不手软地挺枪直入，将处女膜的阻拦轻松捅破。`,
          ); // :2178
          await era.printAndWait(
            `「不…该死…用这种姿势夺走${sc()}的处女之身…不要啊！」`,
          ); // :2179
          await era.printAndWait(
            `哭泣喊叫的${target_name}反而使${player_name}更加兴奋，抓住身下人的腰猛烈地冲刺起来………`,
          ); // :2180
        } // :2180-2181
      } else {
        // :2183-2185

        if ((era.get(`talent:${target}:76`) || 0) === 1) {
          // :2185
          await era.printAndWait(
            `「从后面进来什么的…听起来不错呢${heart(1)}…呜啊呜${heart(1)}」`,
          ); // :2186
          await era.printAndWait(
            `${target_name}的身体迎合着${player_name}的阴茎摇动起来。`,
          ); // :2187
          await era.printAndWait(`「好…好棒唔…呜…啊啊啊…哈啊呜${heart(1)}」`); // :2188
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          // :2190
          await era.printAndWait(`「像是…野兽一样…啊啊啊…！」`); // :2191
          await era.printAndWait(
            `为了让${target_name}体会到野兽一样的感觉，${player_name}故意加大了撞击的力度。`,
          ); // :2192
          await era.printAndWait(
            `「啊啊…啊啊啊啊…呼…好深…唔…太深了啊啊…${heart(1)}」`,
          ); // :2193
        } else {
          // :2195-2196
          await era.printAndWait(
            `${target_name}趴在地上，${player_name}的腰肆无忌惮地撞击着。`,
          ); // :2196
          await era.printAndWait(
            `「这样做…竟然会让你感觉舒服吗…混蛋…呼…啊啊啊啊啊！」`,
          ); // :2197
          await era.printAndWait(
            `${target_name}到现在还带着一点可爱的嚣张呢，可这反而让人更加兴奋………`,
          ); // :2198
        } // :2198-2199
      } // :2200-2201
      // CFLAG:322  = 1（变量语义：CFLAG 族，322） // :2201
      kojo.背后位 = 1; // :2201
      return 0; // :2201-2202
    } else {
      // :2204-2206

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.背后位 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :2206
        if (rand_n(3) === 0) {
          // :2207
          await era.printAndWait(
            `「呼！　哈啊啊…♪　想要更刺激地被干♪ 啊啊啊…这、这样舒服的感觉${heart(1)}」`,
          ); // :2208
          await era.printAndWait(
            `为了满足这个愿望，${target_name}的腰被紧紧抓住，阴茎狠狠地抽插着发出噗咻噗咻的水声。`,
          ); // :2209
          await era.printAndWait(
            `「啊啊啊…啊呜…哈啊…啊啊啊！${sc()}已经被魔王大人的肉棒征服了呜呜呜呜～！」`,
          ); // :2210
          await era.printAndWait(`${target_name}的娇吟声越来越大………`); // :2211
        } else if (rand_n(2) === 0) {
          // :2212
          await era.printAndWait(
            `「像狗狗一样呢…汪汪！……开个玩笑哈哈…啊啊呜呜${heart(1)}」`,
          ); // :2213
          await era.printAndWait(
            `${target_name}羞答答的样子激发了更狂暴的性欲。`,
          ); // :2214
          await era.printAndWait(
            `「啊呜…啊啊啊啊啊…啊啊啊${heart(1)}…${sc()}…想像野兽一样…被从后面侵犯…${heart(1)}」`,
          ); // :2215
          await era.printAndWait(`${target_name}背部后仰发出了这样的呼喊………`); // :2216
        } else {
          // :2216-2217
          await era.printAndWait(`「后面…好啦！　真是的！　…啊啊啊啊♪」`); // :2218
          await era.printAndWait(
            `${target_name}的屁股很容易就将${player_name}的肉棒吸纳进小穴里。`,
          ); // :2219
          await era.printAndWait(
            `「被大肉棒…侵犯了啊啊…想要一直一直被侵犯${heart(1)}」`,
          ); // :2220
          await era.printAndWait(
            `${target_name}脑子里已经只剩想被耕耘的欲望了………`,
          ); // :2221
        } // :2221-2222
        // CFLAG:322  = 7（变量语义：CFLAG 族，322） // :2223
        kojo.背后位 = 7; // :2223
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :2225
        if (rand_n(3) === 0) {
          // :2226
          await era.printAndWait(
            `「从后面也请温柔点…呜啊哈啊…啊啊…啊啊啊…${heart(1)}」`,
          ); // :2227
          await era.printAndWait(
            `${target_name}的叫声显得有些可爱，${player_name}在这样的刺激下更加卖力了起来。`,
          ); // :2228
          await era.printAndWait(
            `「哼${heart(1)} 啊啊啊${heart(1)} 啊啊呜${heart(1)} 那、那种地方…魔王大人真坏${heart(1)}」`,
          ); // :2229
          await era.printAndWait(
            `像只小狗一样的${target_name}再度发出了可爱的声音………`,
          ); // :2230
        } else if (rand_n(2) === 0) {
          // :2231
          await era.printAndWait(
            `「请惩罚我吧…${heart(1)} 啊…啊啊啊啊…太、太深了啊啊${heart(1)}」`,
          ); // :2232
          await era.printAndWait(
            `${target_name}圆滚滚的屁股因为${player_name}腰部激烈的拍打而变得通红。`,
          ); // :2233
          await era.printAndWait(
            `「魔王大人的肉棒…好充实…好棒！最喜欢…最喜欢肉棒了${heart(1)}」`,
          ); // :2234
          await era.printAndWait(
            `${target_name}为了让${player_name}射在阴道里而卖力地吸吮着肉棒………`,
          ); // :2235
        } else {
          // :2235-2236
          await era.printAndWait(
            `「请给…啊呜${heart(1)}…我…给我大肉棒…呜啊哈啊${heart(1)}」`,
          ); // :2237
          await era.printAndWait(
            `${target_name}自然而然地将${player_name}的阴茎吞进小穴里。`,
          ); // :2238
          await era.printAndWait(
            `「啊啊啊啊…还、还要…想要更多…${sc()}…像是发情的母狗一样呢${heart(1)}」`,
          ); // :2239
          await era.printAndWait(
            `${player_name}这发情母狗似的表现让${target_name}感到非常兴奋………`,
          ); // :2240
        } // :2240-2241
        // CFLAG:322  = 6（变量语义：CFLAG 族，322） // :2242
        kojo.背后位 = 6; // :2242
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (kojo.背后位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :2244
        if (rand_n(3) === 0) {
          // :2245
          await era.printAndWait(
            `「啊啊…低、低劣的手段…那种事情…明明…只会觉得痛苦而已…啊呜啊啊！？」`,
          ); // :2246
          await era.printAndWait(
            `似乎是有点太激烈了，只是搅动了几下${target_name}的声音里就混入了一丝甜美的喘息。`,
          ); // :2247
          await era.printAndWait(
            `「啊啊啊…你这样的渣滓…决不会…不会屈服…不…呜…啊啊啊…啊呜哈啊！」`,
          ); // :2248
          await era.printAndWait(
            `即使${target_name}的小穴已经因为调教变得十分敏感，她也顽固地不打算承认的样子………`,
          ); // :2249
        } else if (rand_n(2) === 0) {
          // :2250
          await era.printAndWait(
            `${target_name}虽然用手在抵挡着身后人那凶狠的刺击，柔软的小穴却主动纠缠住了阴茎。`,
          ); // :2251
          await era.printAndWait(
            `「${scf()}、${sc()}…绝不是因为你的垃圾肉棒…绝对没有…感觉到什么啊…！哈…啊啊啊啊啊啊！」`,
          ); // :2252
          await era.printAndWait(
            `不管${target_name}到底有没有感觉到快感，${target_name}的淫穴还死死地缠住阴茎不肯放开………`,
          ); // :2253
        } else {
          // :2253-2254
          await era.printAndWait(
            `「啊啊，被做着这样的事情…已经有点习惯了吗…嘁…啊啊啊…！才不会认输啊…糖衣炮弹什么的…啊啊呜！」`,
          ); // :2255
          await era.printAndWait(
            `${player_name}为了不让${target_name}乱动抓紧了她的腰使劲抽插着。那懊悔的声音里明显有着快感的成分。`,
          ); // :2256
          await era.printAndWait(
            `「啊啊啊…这、这样…蛆虫一样下贱的混蛋…啊啊啊啊…和…这样的…${sc()}…啊啊啊啊啊！」`,
          ); // :2257
        } // :2257-2258
        // CFLAG:322  = 5（变量语义：CFLAG 族，322） // :2259
        kojo.背后位 = 5; // :2259
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :2261
        await era.printAndWait(
          `「再、再激烈一点也…没、没问题的…哈…啊啊啊啊………！」`,
        ); // :2262
        await era.printAndWait(`${target_name}带着恳求和享受的声音发散开来。`); // :2263
        await era.printAndWait(
          `「呜…唔啊…啊啊啊啊啊…已、已经…！…想…被侵犯得更激烈一点…！啊啊啊啊…呼…呜…啊啊啊！」`,
        ); // :2264
        // CFLAG:322  = 4（变量语义：CFLAG 族，322） // :2265
        kojo.背后位 = 4; // :2265
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :2267
        await era.printAndWait(
          `${target_name}老实的把屁股暴露在${player_name}的面前。`,
        ); // :2268
        await era.printAndWait(
          `「啊啊…讨厌…啊啊…有点啊啊…太…太深了…啊啊啊啊啊！」`,
        ); // :2269
        await era.printAndWait(
          `看到${target_name}被侵犯得喘息连连快要哭出来的的表情，阴茎变得更加挺立起来………`,
        ); // :2270
        // CFLAG:322  = 3（变量语义：CFLAG 族，322） // :2271
        kojo.背后位 = 3; // :2271
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 === 2) {
        // :2273
        await era.printAndWait(
          `「你这家伙…啊啊啊！你难道不知道什么叫做…温、温柔吗…呼…痛啊…啊啊啊啊！」`,
        ); // :2274
        await era.printAndWait(`${target_name}痛苦的悲鸣着然而似乎无济于事………`); // :2275
        // CFLAG:322  = 2（变量语义：CFLAG 族，322） // :2276
        kojo.背后位 = 2; // :2276
      } // :2276-2277
      return 0; // :2276-2278
    } // :2276-2279
  } // :2280-2283

  if (era_flag.selectcom === 22) {
    // :2285
    if (kojo.对面座位 === 0) {
      // :2286

      if ((era.get(`talent:${target}:0`) || 0) === 1) {
        // :2289

        if ((era.get(`talent:${target}:76`) || 0) === 1) {
          // :2291
          await era.printAndWait(''); // :2292
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          // :2294
          await era.printAndWait(''); // :2295
        } else {
          // :2294-2297
          await era.printAndWait(''); // :2298
        } // :2299-2303
      } else {
        // :2301-2303

        if ((era.get(`talent:${target}:76`) || 0) === 1) {
          // :2303
          await era.printAndWait(
            `「啊啊…啊啊…热…魔王大人的身体好灼热呢${heart(1)}」`,
          ); // :2304
          await era.printAndWait(`${target_name}摇晃着身体紧紧地缠住肉棒。`); // :2305
          await era.printAndWait(
            `「啊啊啊啊…就…就喜欢…这样被侵犯…哈啊…被侵犯${heart(1)}」`,
          ); // :2306
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          // :2308
          await era.printAndWait(`「很温柔呢………${heart(1)}」`); // :2309
          await era.printAndWait(
            `${target_name}撒娇似的把脸靠在${player_name}肩上呢喃道。`,
          ); // :2310
          await era.printAndWait(
            `「啊啊啊啊…${sc()}…这样温柔的感觉…还是第一次呢………${heart(1)}」`,
          ); // :2311
        } else {
          // :2313-2314
          await era.printAndWait(
            `「啊哈…这、这不是…这不是恋人才会做的事情吗…啊啊！啊啊啊…！」`,
          ); // :2314
          await era.printAndWait(
            `${player_name}紧紧抱住${target_name}不让她逃走，慢慢开始晃动腰部………`,
          ); // :2315
        } // :2315-2316
      } // :2317-2318
      // CFLAG:323  = 1（变量语义：CFLAG 族，323） // :2318
      kojo.对面座位 = 1; // :2318
      return 0; // :2318-2319
    } else {
      // :2321-2323

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.对面座位 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :2323
        if (rand_n(3) === 0) {
          // :2324
          await era.printAndWait(`「${sc()}…很喜欢这样被操啊…${heart(1)}」`); // :2325
          await era.printAndWait(
            `${target_name}的小穴被塞得慢慢的，望着${player_name}的脸忽然凑上来舔了起来。`,
          ); // :2326
          await era.printAndWait(
            `「哈啊…呜…呜啊…已、已经…${sc()}…已经…要高潮了呜啊啊啊…${heart(1)}」`,
          ); // :2327
        } else if (rand_n(2) === 0) {
          // :2328
          await era.printAndWait(
            `${target_name}的小穴贪婪地吸引着${player_name}的阴茎，想要把它整个吞进去。`,
          ); // :2329
          await era.printAndWait(
            `「肉棒…越来越想要…魔王大人的肉棒了啊${heart(1)}」`,
          ); // :2330
          await era.printAndWait(
            `那诱人的腰肢不断摆动着品尝起${player_name}肉棒的滋味………`,
          ); // :2331
        } else {
          // :2331-2332
          await era.printAndWait(
            `「啊啊…啊啊…热…魔王大人的身体好灼热呢${heart(1)}」`,
          ); // :2333
          await era.printAndWait(`${target_name}摇晃着身体紧紧地缠住肉棒。`); // :2334
          await era.printAndWait(
            `「啊啊啊…想被更粗暴的…侵犯…侵犯…侵犯啊啊啊啊${heart(1)}」`,
          ); // :2335
        } // :2335-2336
        // CFLAG:323  = 7（变量语义：CFLAG 族，323） // :2337
        kojo.对面座位 = 7; // :2337
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.对面座位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :2339
        if (rand_n(3) === 0) {
          // :2340
          await era.printAndWait(
            `「喜…喜欢…${sc()}…喜欢魔王大人下面的的东西…啊啊啊…呜啊${heart(1)}」`,
          ); // :2341
          await era.printAndWait(
            `${target_name}主动向你索吻，同时${target_name}的下体也夹得越来越紧。`,
          ); // :2342
          await era.printAndWait(
            `「啊啊啊…已经…爱上做爱这种事情了………${heart(1)}」`,
          ); // :2343
        } else if (rand_n(2) === 0) {
          // :2344
          await era.printAndWait(
            `${target_name}紧紧抱住${player_name}，不禁咬住${player_name}肩头。`,
          ); // :2345
          await era.printAndWait(
            `「哈啊…啊啊…啊啊啊啊…太深了…最、最里面…里面…${heart(1)}」`,
          ); // :2346
          await era.printAndWait(
            `虽然${player_name}很体谅${target_name}的辛苦，但仍不断抽插着肉棒………`,
          ); // :2347
        } else {
          // :2347-2348
          await era.printAndWait(
            `${target_name}撒娇似的把脸靠在${player_name}肩上呢喃到。`,
          ); // :2349
          await era.printAndWait(
            `「啊哈啊啊…${sc()}…喜欢被这样温柔的对待呢…………${heart(1)}」`,
          ); // :2350
          await era.printAndWait(`${target_name}主动摆动腰臀迎合着………`); // :2351
        } // :2351-2352
        // CFLAG:323  = 6（变量语义：CFLAG 族，323） // :2353
        kojo.对面座位 = 6; // :2353
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (kojo.对面座位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :2355

        if (rand_n(5) === 0) {
          // :2357
          await era.printAndWait(
            `尽管${target_name}努力从${player_name}身边挣脱，${player_name}还是抓住她的腰边抚摸那诱人的身躯边开始了冲击。`,
          ); // :2358
          await era.printAndWait(
            `「呜…哈…唔啊啊…啊啊…已经逃不出这双手了吗…不，${sc()}仅仅是…被那东西给…呜啊！」`,
          ); // :2359
          await era.printAndWait(
            `被开发的身体反应十分敏感，双手徒劳地在${player_name}背后拉扯着………`,
          ); // :2360
        } else if (rand_n(2) === 0) {
          // :2362
          await era.printAndWait(
            `「啊啊啊…别抱着我啊，讨厌的男人…啊啊啊啊啊！腰、腰也不准动…不、不行…啊！」`,
          ); // :2363
          await era.printAndWait(
            `${target_name}的挣扎和悲鸣被完全无视了，阳具在她体内搅动。`,
          ); // :2364
          await era.printAndWait(
            `「被做了这样的事情…${sc()}…啊啊啊…那、那里不行啊！」`,
          ); // :2365
        } else {
          // :2365-2366
          await era.printAndWait(
            `「卑鄙的家伙…竟然对${sc()}做这样的事情…啊啊啊啊……！」`,
          ); // :2367
          await era.printAndWait(
            `${target_name}的骂声中${player_name}抓住她的腰开始推送，这样的她再怎么挣扎也无能为力吧。`,
          ); // :2368
          await era.printAndWait(
            `「啊啊啊…呼…呜啊…呜啊…完、完全就没有感觉嘛…哈呜…住手…啊啊啊啊！」`,
          ); // :2369
          await era.printAndWait(
            `嘴上这么说着小穴却像金鱼嘴一样紧紧吸附着的${target_name}看上去也有点可爱呢………`,
          ); // :2370
        } // :2370-2371
        // CFLAG:323  = 5（变量语义：CFLAG 族，323） // :2372
        kojo.对面座位 = 5; // :2372
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (kojo.对面座位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :2374
        await era.printAndWait(
          `「就是这样子…啊…啊呜呜！呜…！真是的，用力过头了吧…啊啊啊！」`,
        ); // :2375
        await era.printAndWait(
          `${target_name}被下面的人轻轻顶着，就晃动着发出甜腻淫荡的呻吟………`,
        ); // :2376
        // CFLAG:323  = 4（变量语义：CFLAG 族，323） // :2377
        kojo.对面座位 = 4; // :2377
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.对面座位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :2379
        await era.printAndWait(
          `「啊啊啊…呜啊！呜！………这个程度的动作…好吧…啊啊啊！」`,
        ); // :2380
        await era.printAndWait(
          `${target_name}拼命地摇摆着腰肢，让${player_name}感到非常愉悦………`,
        ); // :2381
        // CFLAG:323  = 3（变量语义：CFLAG 族，323） // :2382
        kojo.对面座位 = 3; // :2382
      } else if (kojo.对面座位 <= 1 || game.kojo.口上开关 === 2) {
        // :2384
        await era.printAndWait(`「居、居然…做出…这样的事…不…啊啊啊啊！」`); // :2385
        await era.printAndWait(
          `${target_name}想要逃开的身躯被紧紧抱住，无力挣脱………`,
        ); // :2386
        // CFLAG:323  = 2（变量语义：CFLAG 族，323） // :2387
        kojo.对面座位 = 2; // :2387
      } // :2387-2388
      return 0; // :2387-2389
    } // :2387-2390
  } // :2391-2394

  if (era_flag.selectcom === 23) {
    // :2396
    if (kojo.背面座位 === 0) {
      // :2397

      if ((era.get(`talent:${target}:0`) || 0) === 1) {
        // :2400

        if ((era.get(`talent:${target}:76`) || 0) === 1) {
          // :2402
          await era.printAndWait(''); // :2403
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          // :2405
          await era.printAndWait(''); // :2406
        } else {
          // :2405-2408
          await era.printAndWait(''); // :2409
        } // :2410-2414
      } else {
        // :2412-2414

        if ((era.get(`talent:${target}:76`) || 0) === 1) {
          // :2414
          await era.printAndWait(
            `「啊啊啊啊…进进出出的地方…都被看光了${heart(1)}」`,
          ); // :2415
          await era.printAndWait(`${target_name}主动张开双腿扭动着腰………`); // :2416
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          // :2418
          await era.printAndWait(
            `「就这样从后面抱着我…啊…啊啊啊呜…魔王大人…真可爱${heart(1)}」`,
          ); // :2419
          await era.printAndWait(
            `${target_name}把手绕到后面抚摸${player_name}，发出娇嫩的呻吟………`,
          ); // :2420
        } else {
          // :2422-2423
          await era.printAndWait(
            `「住、住手啊肮脏的家伙…！放、放开我…啊啊啊啊！」`,
          ); // :2423
        } // :2423-2424
      } // :2425-2426
      // CFLAG:324  = 1（变量语义：CFLAG 族，324） // :2426
      kojo.背面座位 = 1; // :2426
      return 0; // :2426-2427
    } else {
      // :2429-2431

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.背面座位 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :2431
        if (rand_n(3) === 0) {
          // :2432
          await era.printAndWait(
            `「啊啊啊…能享用这样的肉棒${heart(1)} 不论怎样都无所谓啦…${heart(1)}」`,
          ); // :2433
          await era.printAndWait(
            `${target_name}来回抚摸着下腹，屁股左右摆动想要把阴茎吞到更深的地方………`,
          ); // :2434
        } else if (rand_n(2) === 0) {
          // :2435
          await era.printAndWait(`「用力抱紧我…怎样都不要放开${heart(1)}」`); // :2436
          await era.printAndWait(
            `如同${target_name}所期望的那样，${player_name}从后面抱住她，肉棒在泛滥成灾的小穴里狠狠抽插起来………`,
          ); // :2437
        } else {
          // :2437-2438
          await era.printAndWait(
            `「啊啊啊啊…想要肉棒…插得更深一些！啊啊啊啊…谢谢款待哦${heart(1)}」`,
          ); // :2439
          await era.printAndWait(
            `如${target_name}所愿插入得更深了。久经调教的身体柔软摆动，取悦着身后紧紧抱住的${player_name}。`,
          ); // :2440
          await era.printAndWait(
            `「更、更想…想要…想要肉棒了啊………${heart(1)}」`,
          ); // :2441
        } // :2441-2442
        // CFLAG:324  = 7（变量语义：CFLAG 族，324） // :2443
        kojo.背面座位 = 7; // :2443
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.背面座位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :2445
        if (rand_n(3) === 0) {
          // :2446
          await era.printAndWait(
            `「那、那里…已经…被您弄得黏糊糊的了呢……${heart(1)}」`,
          ); // :2447
          await era.printAndWait(
            `从后面抱着的${target_name}温柔的声音充满了甜蜜……`,
          ); // :2448
        } else if (rand_n(2) === 0) {
          // :2449
          await era.printAndWait(
            `「啊啊啊…呜…哈啊哈啊…已经要去了呢…明明还想要更激烈一点${heart(1)}」`,
          ); // :2450
          await era.printAndWait(
            `${target_name}温柔地抚摸着乳房，腰部配合地扭动着………`,
          ); // :2451
        } else {
          // :2451-2452
          await era.printAndWait(
            `「从后面抱着很温柔呢…呜…啊啊…大脑里一片空白了啦………${heart(1)}」`,
          ); // :2453
          await era.printAndWait(
            `${target_name}被从后面插得几乎神志不清，连喘息声都甜得发腻………`,
          ); // :2454
        } // :2454-2455
        // CFLAG:324  = 6（变量语义：CFLAG 族，324） // :2456
        kojo.背面座位 = 6; // :2456
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (kojo.背面座位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :2458
        if (rand_n(3) === 0) {
          // :2459
          await era.printAndWait(
            `「哈…啊啊啊…脖子…很痒的啊…呜哈啊啊啊！啊…啊呼！」`,
          ); // :2460
          await era.printAndWait(
            `${player_name}亲吻着${target_name}的脖子，缓缓地开始了征伐………`,
          ); // :2461
        } else if (rand_n(2) === 0) {
          // :2462
          await era.printAndWait(
            `「下、下贱的魔族…再侮辱${sc()}的话…就…啊啊啊啊…够了！」`,
          ); // :2463
          await era.printAndWait(
            `${target_name}在${player_name}的抽插下大声地叫着。`,
          ); // :2464
          await era.printAndWait(`女人嫌弃地看着玩弄自己身体的“对手”………`); // :2465
        } else {
          // :2465-2466
          await era.printAndWait(
            `「哈啊…啊…啊呼…别得意忘形…总有一天会让你…啊啊啊啊呜！」`,
          ); // :2467
          await era.printAndWait(
            `${target_name}在${player_name}腰间喝骂着，那小穴正是男人求之不得的瑰宝啊。`,
          ); // :2468
          await era.printAndWait(`她不知不觉开始扭动着腰，发出快乐的呻吟………`); // :2469
        } // :2469-2470
        // CFLAG:324  = 5（变量语义：CFLAG 族，324） // :2471
        kojo.背面座位 = 5; // :2471
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (kojo.背面座位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :2473
        await era.printAndWait(
          `「呜…啊呜！…哈啊哈啊…到…到最里面了…插进来了…啊啊啊啊呜！」`,
        ); // :2474
        await era.printAndWait(
          `${target_name}弯着腰，灼热的小穴紧紧包裹着${player_name}的阴茎持续提供着快感………`,
        ); // :2475
        // CFLAG:324  = 4（变量语义：CFLAG 族，324） // :2476
        kojo.背面座位 = 4; // :2476
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.背面座位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :2478
        await era.printAndWait(`「啊…哈啊…啊啊啊…胸部！干嘛…抓这么紧啊………！」`); // :2479
        await era.printAndWait(
          `${target_name}的胸部被揉搓着，小穴也被更加激烈地冲击着………`,
        ); // :2480
        // CFLAG:324  = 3（变量语义：CFLAG 族，324） // :2481
        kojo.背面座位 = 3; // :2481
      } else if (kojo.背面座位 <= 1 || game.kojo.口上开关 === 2) {
        // :2483
        await era.printAndWait(
          `「滚…放手啊…不管你怎么做…我也只会感到痛苦而已…停手…！」`,
        ); // :2484
        await era.printAndWait(
          `${target_name}的阴道被${player_name}的肉棒叩开，狠狠插了进去………`,
        ); // :2485
        // CFLAG:324  = 2（变量语义：CFLAG 族，324） // :2486
        kojo.背面座位 = 2; // :2486
      } // :2486-2487
      return 0; // :2486-2488
    } // :2486-2489
  } // :2490-2493

  if (era_flag.selectcom === 26) {
    // :2496

    if (kojo.正常位肛交 === 0) {
      // :2498

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :2500
        await era.printAndWait(
          `「啊啊啊呜！那、那里是屁…啊啊啊…好舒服${heart(1)}」`,
        ); // :2501
        await era.printAndWait(
          `${target_name}的肛门被阴茎一口气插到深处，${target_name}双手在${player_name}背上抓挠着………`,
        ); // :2502
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :2504
        await era.printAndWait(
          `「啊、啊如果是…魔王大人的话…${sc()}什么都…呜呜！呜啊！」`,
        ); // :2505
        await era.printAndWait(
          `${target_name}的肛门被阴茎一口气贯穿，因为痛苦不禁咬住了嘴唇………`,
        ); // :2506
      } else {
        // :2508-2509
        await era.printAndWait(
          `「住手…你这变态的肮脏动物！那、那不是插进去的地方啊…不要啊啊啊！」`,
        ); // :2509
      } // :2509-2510
      // CFLAG:TARGET:327  = 1（变量语义：CFLAG 族，TARGET:327） // :2511
      kojo.正常位肛交 = 1; // :2511
      return 0; // :2511-2512
    } else {
      // :2514-2515

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.正常位肛交 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :2517
        if (rand_n(3) === 0) {
          // :2518
          await era.printAndWait(
            `「啊哇啊…啊呜…啊啊…啊哈…啊啊啊啊啊啊${heart(1)}」`,
          ); // :2519
          await era.printAndWait(
            `${target_name}因为肛门的蹂躏已经几乎进入了极乐世界，只能不断地发出喘息声………`,
          ); // :2520
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            // :2522
            await era.printAndWait(
              `「啊啊…${sc()}…要和这根大鸡巴结婚啊啊${heart(1)} 屁眼已经要升天了啊啊${heart(1)}」`,
            ); // :2522
          } // :2522
        } else if (rand_n(2) === 0) {
          // :2523
          await era.printAndWait(
            `「魔王大人的大肉棒…好厉害…请继续…侵犯我吧${heart(1)}」`,
          ); // :2524
          await era.printAndWait(
            `${target_name}檀口微张，享受着${player_name}对自己肛门的侵犯………`,
          ); // :2525
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            // :2527
            await era.printAndWait(
              `「要受不了了${heart(1)} 要疯了疯了啊啊啊${heart(1)} 啊啊啊啊…${sc()}已经，对肉棒完全失去抵抗力了${heart(1)}」`,
            ); // :2527
          } // :2527
        } else {
          // :2527-2528
          await era.printAndWait(
            `「啊啊啊啊呜…呜…这是…屁股小穴被扩张开了呢…！真、真棒啊${heart(1)}」`,
          ); // :2529
          await era.printAndWait(
            `${target_name}饱受调教的屁股将${player_name}的肉棒紧紧缠绕起来………`,
          ); // :2530
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            // :2532
            await era.printAndWait(
              `「哈哈哈啊啊啊哈${heart(1)}…还想被侵犯…肛门已经爱上肉棒的味道了${heart(1)}」`,
            ); // :2532
          } // :2532
        } // :2532-2533
        // CFLAG:327  = 8（变量语义：CFLAG 族，327） // :2534
        kojo.正常位肛交 = 8; // :2534
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.正常位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :2536
        await era.printAndWait(
          `「魔王大人…啊啊啊啊啊…再激烈一点也…没关系的呜啊！」`,
        ); // :2537
        await era.printAndWait(`${target_name}调教不足的肛门显得有一丝痛苦………`); // :2538
        // CFLAG:327  = 7（变量语义：CFLAG 族，327） // :2539
        kojo.正常位肛交 = 7; // :2539
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.正常位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :2541
        if (rand_n(2) === 0) {
          // :2542
          await era.printAndWait(
            `「哎呀…这感觉…啊啊啊啊…屁股…出乎意料地舒服呢…${heart(1)}」`,
          ); // :2543
          await era.printAndWait(
            `${target_name}的肛门虽然被蹂躏着却感到十分舒服，连带着屁股附近的部位也充满快感………`,
          ); // :2544
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            // :2546
            await era.printAndWait(
              `「还要！还想被干！${sc()}的屁股…要去了啊啊啊啊${heart(1)}」`,
            ); // :2546
          } // :2546
        } else {
          // :2546-2547
          await era.printAndWait(
            `「${scf()}、${sc()}的屁股…快感十足呢…啊啊啊…魔王大人下面的东西…${heart(1)}」`,
          ); // :2548
          await era.printAndWait(
            `${target_name}的肛门被${player_name}的抽插弄得高潮连连………`,
          ); // :2549
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            // :2551
            await era.printAndWait(
              `「屁股在发热…！主人的…${heart(1)}好棒${heart(1)}…呜啊哈啊${heart(1)}」`,
            ); // :2551
          } // :2551
        } // :2551-2552
        // CFLAG:327  = 6（变量语义：CFLAG 族，327） // :2553
        kojo.正常位肛交 = 6; // :2553
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.正常位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :2555
        await era.printAndWait(`「魔王大人…啊啊啊啊啊…就不能温柔点吗………呜！」`); // :2556
        await era.printAndWait(`${target_name}调教不足的肛门显得有一丝痛苦………`); // :2557
        // CFLAG:327  = 5（变量语义：CFLAG 族，327） // :2558
        kojo.正常位肛交 = 5; // :2558
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.正常位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :2560
        if (rand_n(3) === 0) {
          // :2561
          await era.printAndWait(
            `「混蛋…混蛋…快拔出来…啊啊！会坏掉的…${sc()}的屁股，怎么可能主动分开…！」`,
          ); // :2562
          await era.printAndWait(
            `${target_name}对肛门被侵犯的事情表现出强烈的嫌恶感。`,
          ); // :2563
          await era.printAndWait(`「呜…该死…你这蛆虫…快拔出来…拔出来啊…！」`); // :2564
        } else if (rand_n(2) === 0) {
          // :2565
          await era.printAndWait(
            `「咦…呜呜呜！…啊啊啊…啊啊啊啊啊………！你这下贱无耻的混蛋，下贱无耻！」`,
          ); // :2566
          await era.printAndWait(
            `${target_name}被开发过的肛门因为阴茎的进出持续地产生着快感。`,
          ); // :2567
          await era.printAndWait(
            `「啊啊啊啊…到这个程度了…就…就已经…到此为止了吧…呜…啊啊啊呜！」`,
          ); // :2568
        } else {
          // :2568-2569
          await era.printAndWait(
            `「渣滓…！啊、啊呜哈啊啊…这样玩弄奇怪的地方…到底有什么意义…呜！唔啊啊啊啊！」`,
          ); // :2570
          await era.printAndWait(`${target_name}在侵犯的间隙不断痛骂着。`); // :2571
          await era.printAndWait(
            `「垃圾！废物！给我停手啊…啊啊啊啊啊！混蛋住手啊！！啊呜呜呜！」`,
          ); // :2572
        } // :2572-2573
        // CFLAG:327  = 4（变量语义：CFLAG 族，327） // :2574
        kojo.正常位肛交 = 4; // :2574
      } else if (
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.正常位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :2576
        await era.printAndWait(`「呜…哈…啊啊啊啊…！不、不行了…！要去了！」`); // :2577
        await era.printAndWait(
          `${target_name}的肛门大概已经习惯了这样的事情，随着抽插发出轻微的喘息声………`,
        ); // :2578
        // CFLAG:327  = 3（变量语义：CFLAG 族，327） // :2579
        kojo.正常位肛交 = 3; // :2579
      } else if (kojo.正常位肛交 <= 1 || game.kojo.口上开关 === 2) {
        // :2581
        await era.printAndWait(`「啊喂…住…住手啊！…滚、滚开…滚开啊败类！」`); // :2582
        await era.printAndWait(
          `懊悔的呻吟声中${target_name}的肛门依然紧闭着，${player_name}强行挤开了肛门………`,
        ); // :2583
        // CFLAG:327  = 2（变量语义：CFLAG 族，327） // :2584
        kojo.正常位肛交 = 2; // :2584
      } // :2584-2585
      return 0; // :2584-2586
    } // :2584-2587
  } // :2588-2591

  if (era_flag.selectcom === 27) {
    // :2593

    if (kojo.背后位肛交 === 0) {
      // :2595

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :2597
        await era.printAndWait(`「屁眼被射满精液了…♪啊呜啊哈${heart(1)}」`); // :2598
        await era.printAndWait(
          `${target_name}的肛门被从后面贯穿，发出撒娇似的呻吟………`,
        ); // :2599
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :2601
        await era.printAndWait(`「屁股里感觉，好奇怪呢…${heart(1)}」`); // :2602
        await era.printAndWait(
          `${target_name}的肛门被从后面贯穿，喘息变得粗重起来………`,
        ); // :2603
      } else {
        // :2605-2606
        await era.printAndWait(
          `「那、那里…不、不能用啊…可恶的败类，别乱动啊！」`,
        ); // :2606
        await era.printAndWait(`${target_name}肛门被从后面侵犯着，惨叫连连………`); // :2607
      } // :2607-2608
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328） // :2609
      kojo.背后位肛交 = 1; // :2609
      return 0; // :2609-2610
    } else {
      // :2612-2613

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背后位肛交 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :2614
        if (rand_n(3) === 0) {
          // :2615
          await era.printAndWait(
            `「哈呜…啊呜…啊啊啊呜…屁股小穴被侵犯什么的…最棒了${heart(1)}」`,
          ); // :2616
          await era.printAndWait(
            `${target_name}那开发过的肛门就像专门为男人所准备似的………`,
          ); // :2617
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            // :2618
            await era.print(''); // :2619
            await era.printAndWait(
              `「啊哈哈哈…就这样射精吧！${scf()}、${sc()}…的屁股小穴想喝精液啊啊啊${heart(1)}」`,
            ); // :2620
            await era.printAndWait(
              `${target_name}的肛门为了促进射精紧紧包裹住${target_name}的阴茎蠕动起来………`,
            ); // :2621
          } // :2621-2622
        } else if (rand_n(2) === 0) {
          // :2623
          await era.printAndWait(
            `「肛门感觉，好舒服啊…${heart(1)} 你好坏呢${heart(1)} 哈啊呜${heart(1)}」`,
          ); // :2624
          await era.printAndWait(
            `${target_name}的腰被抓住肆意侵犯着肛门。快感不断地侵袭着她的全身………`,
          ); // :2625
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            // :2626
            await era.print(''); // :2627
            await era.printAndWait(
              `「啊啊啊呜${heart(1)}…${sc()}…肛门被侵犯什么的…感觉太棒了啊啊${heart(1)}」`,
            ); // :2628
            await era.printAndWait(
              `作为尻穴狂的${target_name}已经没有办法从这样的快感中挣脱了吧………`,
            ); // :2629
          } // :2629-2630
        } else {
          // :2631-2632
          await era.printAndWait(
            `「${sc()}的屁股只要…只要有肉棒就会变得很开心呢${heart(1)}」`,
          ); // :2632
          await era.printAndWait(
            `${target_name}扭动着纤腰贪婪地将${player_name}的阴茎吞入尻穴………`,
          ); // :2633
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            // :2634
            await era.print(''); // :2635
            await era.printAndWait(
              `「呜啊哈啊${heart(1)} 哈啊啊啊啊${heart(1)} 屁股什么的好棒啊${heart(1)}」`,
            ); // :2636
            await era.printAndWait(
              `${target_name}在阴茎强烈的突进下浪叫起来………`,
            ); // :2637
          } // :2637-2638
        } // :2639-2640
        // CFLAG:328  = 8（变量语义：CFLAG 族，328） // :2640
        kojo.背后位肛交 = 8; // :2640
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.背后位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :2642
        await era.printAndWait(
          `「啊啊…啊啊啊！太、太激烈了…太激烈了！啊啊啊啊！」`,
        ); // :2643
        await era.printAndWait(
          `${target_name}的悲鸣声不断响起，肛门已经习惯了这种抽插了吧………`,
        ); // :2644
        // CFLAG:328  = 7（变量语义：CFLAG 族，328） // :2645
        kojo.背后位肛交 = 7; // :2645
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背后位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :2647
        if (rand_n(2) === 0) {
          // :2648
          await era.printAndWait(
            `「噢！我的屁股已经！　唔啊啊啊！　记住阴茎的形状了啦！」`,
          ); // :2649
          await era.printAndWait(
            `${target_name}的肛门被侵犯发出了下贱的悲鸣………`,
          ); // :2650
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            // :2651
            await era.print(''); // :2652
            await era.printAndWait(
              `「已经…已经不行了…这淫荡的屁股${heart(1)}迫不及待了呢${heart(1)}」`,
            ); // :2653
            await era.printAndWait(
              `作为尻穴狂的${target_name}半翻着白眼几乎要失去神智了………`,
            ); // :2654
          } // :2654-2655
        } else {
          // :2656-2657
          await era.printAndWait(`「${sc()}的屁股…也能作为性器了吧♪」`); // :2657
          await era.printAndWait(
            `${target_name}已经完全变得柔软的肛门缠绕着${player_name}的肉棒，快感不断上升………`,
          ); // :2658
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            // :2659
            await era.print(''); // :2660
            await era.printAndWait(
              `「啊啊啊啊…淫荡的…${sc()}…已、已经要…要疯了啊啊啊………${heart(1)}」`,
            ); // :2661
            await era.printAndWait(
              `作为尻穴狂的${target_name}半翻着白眼几乎要失去神智了………`,
            ); // :2662
          } // :2662-2663
        } // :2664-2665
        // CFLAG:328  = 6（变量语义：CFLAG 族，328） // :2665
        kojo.背后位肛交 = 6; // :2665
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.背后位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :2667
        await era.printAndWait(
          `「啊啊…屁股…要坏掉了坏掉了啊！…呜啊！…哈呜…哈啊！啊啊啊！」`,
        ); // :2668
        await era.printAndWait(
          `大概是${target_name}的菊穴还不太习惯的缘故，声音中带着一丝痛楚………`,
        ); // :2669
        // CFLAG:328  = 5（变量语义：CFLAG 族，328） // :2670
        kojo.背后位肛交 = 5; // :2670
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背后位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :2672
        if (rand_n(3) === 0) {
          // :2673
          await era.printAndWait(
            `「啊啊啊…别、别看啊…变态！ 呜哇！不要啊…住手啊啊啊！」`,
          ); // :2674
          await era.printAndWait(
            `${target_name}久经开发的肛门被${player_name}的肉棒插得肠液四溅。这大概就是所谓的口嫌体正直吧。`,
          ); // :2675
          await era.printAndWait(
            `「啊啊啊…不、不要啦…这样的东西…啊啊…啊啊啊！」`,
          ); // :2676
        } else if (rand_n(2) === 0) {
          // :2677
          await era.printAndWait(
            `「啊啊啊啊…呜…！只有变态…才会对屁股这么执着吧……啊啊哇啊啊啊！」`,
          ); // :2678
          await era.printAndWait(
            `从后面被侵犯的${target_name}那久经开发的淫荡菊穴已经变得湿润了。`,
          ); // :2679
          await era.printAndWait(
            `「啊啊…怎么会！屁股…变得奇怪了…要去了呜啊啊啊………！」`,
          ); // :2680
        } else {
          // :2680-2681
          await era.printAndWait(
            `「${scf()}、${sc()}…会有这样的感觉什么的…是假的吧…假的吧…啊啊啊啊呜！不要啊！哇啊唔啊啊！」`,
          ); // :2682
          await era.printAndWait(
            `悲呼喊着的${target_name}的肛门显得有些窄小，这使${player_name}感到更加愉悦………`,
          ); // :2683
        } // :2683-2684
        // CFLAG:328  = 4（变量语义：CFLAG 族，328） // :2685
        kojo.背后位肛交 = 4; // :2685
      } else if (
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背后位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :2687
        await era.printAndWait(
          `「什么啊…到、到这个程度…${sc()}…已经…已经…要去了！」`,
        ); // :2688
        await era.printAndWait(
          `肛门被侵犯着的${target_name}那甘甜的呻吟与${player_name}的愉悦低吼交织在一起………`,
        ); // :2689
        // CFLAG:328  = 3（变量语义：CFLAG 族，328） // :2690
        kojo.背后位肛交 = 3; // :2690
      } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 === 2) {
        // :2692
        await era.printAndWait(`「别、别动啊…呜…痛…很痛的！」`); // :2693
        await era.printAndWait(
          `${target_name}随着肛门内肉棒的抽送痛苦地咒骂着………`,
        ); // :2694
        // CFLAG:328  = 2（变量语义：CFLAG 族，328） // :2695
        kojo.背后位肛交 = 2; // :2695
      } // :2695-2696
      return 0; // :2695-2697
    } // :2695-2698
  } // :2699-2702

  if (era_flag.selectcom === 28) {
    // :2704

    if (kojo.对面座位肛交 === 0) {
      // :2706

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :2708
        await era.printAndWait(
          `「呜…啊呜…哈啊…肉棒…一整根都插进去了呢…呜呜哈啊…真、真是让人心情愉悦啊${heart(1)}」`,
        ); // :2709
        await era.printAndWait(
          `${target_name}带着淫荡的笑容，对肛门被侵犯这件事情感受到发自内心的愉悦………`,
        ); // :2710
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :2712
        await era.printAndWait(
          `「啊哈呜${heart(1)} 哇、哇啊…屁、屁股变得怪怪的啦…请、请抱紧我哦${heart(1)}」`,
        ); // :2713
        await era.printAndWait(
          `${player_name}温柔地抱着${target_name}，体恤地慢慢开始了抽插………`,
        ); // :2714
      } else {
        // :2716-2717
        await era.printAndWait(`「住…住手…那是屁股啊…！喂…别、别凑上来啊！」`); // :2717
        await era.printAndWait(
          `${player_name}一把抱住想要逃开的${target_name}、腰部开始慢慢耸动起来………`,
        ); // :2718
      } // :2718-2719
      // CFLAG:TARGET:329  = 1（变量语义：CFLAG 族，TARGET:329） // :2720
      kojo.对面座位肛交 = 1; // :2720
      return 0; // :2720-2721
    } else {
      // :2723-2724

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.对面座位肛交 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :2725
        if (rand_n(3) === 0) {
          // :2726
          await era.printAndWait(
            `「呜…啊呜…哈啊…肉棒…一整根都进去了呢…呜呜哈啊…真、真是让人心情愉悦啊${heart(1)}」`,
          ); // :2727
          await era.printAndWait(
            `${target_name}带着淫荡的笑容，对肛门被侵犯这件事情感受到发自内心的开心………`,
          ); // :2728
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            // :2729
            await era.print(''); // :2730
            await era.printAndWait(
              `「啊啊啊呜…屁股什么的最棒了啊啊${heart(1)}…想、想要更多的精液呜哈哈${heart(1)}」`,
            ); // :2731
            await era.printAndWait(
              `${target_name}那淫荡的屁股似乎想要享受更多的${player_name}的精液………`,
            ); // :2732
          } // :2732-2733
        } else if (rand_n(2) === 0) {
          // :2734
          await era.printAndWait(
            `「啊啊啊…已、已经…屁眼已经快要忍不住了…呜、呜啊…好舒服啊啊！」`,
          ); // :2735
          await era.printAndWait(
            `${target_name}抱紧了${player_name}主动扭动着腰部迎合着抽插……`,
          ); // :2736
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            // :2737
            await era.print(''); // :2738
            await era.printAndWait(
              `「啊啊啊…${heart(1)}屁眼感觉好…好棒…很棒呢${heart(1)}」`,
            ); // :2739
            await era.printAndWait(
              `${target_name}紧紧抱住${player_name}的肩流着口水，犹自不满足地摆动着腰肢………`,
            ); // :2740
          } // :2740-2741
        } else {
          // :2742-2743
          await era.printAndWait(
            `「呜…啊呜…哈啊…肉棒…一整根都进去了呢…呜呜哈啊…真、真是让人好开心啊${heart(1)}」`,
          ); // :2743
          await era.printAndWait(
            `${target_name}带着淫荡的笑容，对肛门被侵犯这件事情感受到发自内心的喜悦………`,
          ); // :2744
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            // :2745
            await era.print(''); // :2746
            await era.printAndWait(
              `「啊啊啊呜…屁股什么的最棒了啊啊${heart(1)}…想、想要更多的肉棒牛奶呜啊啊${heart(1)}」`,
            ); // :2747
            await era.printAndWait(
              `${target_name}那淫荡的屁股似乎想要享受更多的${player_name}的精液………`,
            ); // :2748
          } // :2748-2749
        } // :2750-2751
        // CFLAG:329  = 8（变量语义：CFLAG 族，329） // :2751
        kojo.对面座位肛交 = 8; // :2751
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.对面座位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :2753
        await era.printAndWait(
          `「啊呜…啊啊啊…大肉棒…全都插进去了…呜…有、有点点痛呢…呜」`,
        ); // :2754
        await era.printAndWait(
          `${target_name}有些痛苦地皱着眉将${player_name}的阴茎引入自己的肛门………`,
        ); // :2755
        // CFLAG:329  = 7（变量语义：CFLAG 族，329） // :2756
        kojo.对面座位肛交 = 7; // :2756
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.对面座位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :2758
        if (rand_n(2) === 0) {
          // :2759
          await era.printAndWait(
            `「哈啊…啊啊…屁股被侵犯什么的…想多看一会儿呢${heart(1)}」`,
          ); // :2760
          await era.printAndWait(
            `${target_name}被${player_name}抱在身上，扭动着腰………`,
          ); // :2761
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            // :2762
            await era.print(''); // :2763
            await era.printAndWait(
              `「啊啊啊啊…${heart(1)} 这样就够了吧…再、再来是不允许的啦${heart(3)}」`,
            ); // :2764
            await era.printAndWait(
              `${target_name}在${player_name}勉强保持着姿态，强忍着高潮的欲望………`,
            ); // :2765
          } // :2765-2766
        } else {
          // :2767-2768
          await era.printAndWait(
            `「呜…啊啊啊…哈啊哈啊…屁股…一边被侵犯…一边看着魔王大人的样子…唔啊啊${heart(1)}」`,
          ); // :2768
          await era.printAndWait(
            `说着这样的话${target_name}伸出舌头与${player_name}纠缠起来………`,
          ); // :2769
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            // :2770
            await era.print(''); // :2771
            await era.printAndWait(
              `「哈…哈…呜…呜啊${heart(1)}…呜啊${heart(1)}…屁股…已、已经…要去了呜呜呜………${heart(1)}」`,
            ); // :2772
            await era.printAndWait(
              `${target_name}的话里带着无法压抑的愉悦与淫靡的气氛………`,
            ); // :2773
          } // :2773-2774
        } // :2775-2776
        // CFLAG:329  = 6（变量语义：CFLAG 族，329） // :2776
        kojo.对面座位肛交 = 6; // :2776
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.对面座位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :2778
        await era.printAndWait(
          `「哈啊哈啊…请…慢一点啊…呜…哈啊哈啊…再温柔一些嘛……${heart(1)}」`,
        ); // :2779
        await era.printAndWait(
          `${target_name}的肛门因为开发不足而感到有些痛苦………`,
        ); // :2780
        // CFLAG:329  = 5（变量语义：CFLAG 族，329） // :2781
        kojo.对面座位肛交 = 5; // :2781
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.对面座位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :2783
        if (rand_n(3) === 0) {
          // :2784
          await era.printAndWait(
            `「啊啊…啊呜啊…哈啊…啊啊…啊啊啊…恶、恶心的感觉……明明…怎么会这样啊啊………！」`,
          ); // :2785
          await era.printAndWait(
            `虽然流着泪但${target_name}久经调教的肛门似乎已经无法忍耐那如潮般的快感了………`,
          ); // :2786
        } else if (rand_n(2) === 0) {
          // :2787
          await era.printAndWait(
            `「哈啊…呜…不…不要…让我…呜嗯…看到你那恶心的脸………呜哇哇！」`,
          ); // :2788
          await era.printAndWait(
            `${target_name}脸上那厌恶忍耐的表情在肛门被侵犯的时候已经坚持不下去了………`,
          ); // :2789
        } else {
          // :2789-2790
          await era.printAndWait(
            `「这份屈辱…该死…人渣…啊啊啊啊！我会…唔啊啊啊啊！」`,
          ); // :2791
          await era.printAndWait(
            `${target_name}在肛门被抽插的瞬间发出一声悲鸣，这使${player_name}更加兴奋了………`,
          ); // :2792
        } // :2792-2793
        // CFLAG:329  = 4（变量语义：CFLAG 族，329） // :2794
        kojo.对面座位肛交 = 4; // :2794
      } else if (
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.对面座位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :2796
        await era.printAndWait(
          `「哈啊啊啊…呜…呜啊…屁股…感觉在发热…！请、请就那样慢慢的………」`,
        ); // :2797
        await era.printAndWait(
          `${player_name}把${target_name}抱在怀中侵犯着肛门………`,
        ); // :2798
        // CFLAG:329  = 3（变量语义：CFLAG 族，329） // :2799
        kojo.对面座位肛交 = 3; // :2799
      } else if (kojo.对面座位肛交 <= 1 || game.kojo.口上开关 === 2) {
        // :2801
        await era.printAndWait(
          `「不…不要…这肮脏的…滚、滚开…滚开啊…混蛋啊啊！」`,
        ); // :2802
        await era.printAndWait(
          `${player_name}一把抱住想要逃开的${target_name}、腰部开始慢慢耸动起来………`,
        ); // :2803
        // CFLAG:329  = 2（变量语义：CFLAG 族，329） // :2804
        kojo.对面座位肛交 = 2; // :2804
      } // :2804-2805
      return 0; // :2804-2806
    } // :2804-2807
  } // :2808-2811

  if (era_flag.selectcom === 29) {
    // :2814

    if (kojo.背面座位肛交 === 0) {
      // :2816

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :2818
        await era.printAndWait(
          `「啊啊啊…呜…被人从后面抱着…侵犯屁股小洞洞什么的………♪」`,
        ); // :2819
        await era.printAndWait(
          `然后对${target_name}那充满弹性的肛门的侵犯就继续起来………`,
        ); // :2820
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :2822
        await era.printAndWait(`「哈啊…哈啊…真、真是的${heart(1)}」`); // :2823
        await era.printAndWait(
          `${target_name}的肛门被从后方贯穿，发出了可爱的悲鸣………`,
        ); // :2824
      } else {
        // :2826-2827
        await era.printAndWait(`「滚开…别、别过来！别再做强暴之类的事情了！」`); // :2827
        await era.printAndWait(`${target_name}因为肛门被侵犯悲伤的哭泣着………`); // :2828
      } // :2828-2829
      // CFLAG:TARGET:330  = 1（变量语义：CFLAG 族，TARGET:330） // :2830
      kojo.背面座位肛交 = 1; // :2830
      return 0; // :2830-2831
    } else {
      // :2833-2834

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背面座位肛交 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :2835
        if (rand_n(2) === 0) {
          // :2836
          await era.printAndWait(
            `「呜哇…啊啊啊…啊啊…哈啊啊啊${heart(1)} 想要…想要屁眼被更狠地侵犯${heart(1)}」`,
          ); // :2837
          await era.printAndWait(
            `${target_name}的屁股左右摇动着想要更多地品味${player_name}阴茎的味道………`,
          ); // :2838
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            // :2839
            await era.print(''); // :2840
            await era.printAndWait(
              `「啊啊啊啊…已经…${sc()}的屁眼要被玩坏掉了…啊啊啊啊啊啊！」`,
            ); // :2841
            await era.printAndWait(
              `${target_name}的脑袋里已经只剩肛门那无与伦比的快感了，${player_name}的凌辱继续着………`,
            ); // :2842
          } // :2842-2843
        } else {
          // :2844-2845
          await era.printAndWait(
            `「${scf()}、${sc()}…呜…啊啊啊…被这样地侵犯…变得舒服了呢…${heart(1)}」`,
          ); // :2845
          await era.printAndWait(
            `${target_name}的肛门紧紧纠缠着${player_name}的肉棒………`,
          ); // :2846
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            // :2847
            await era.print(''); // :2848
            await era.printAndWait(
              `「啊啊啊…已、已经…屁股已经忍不住了啊啊…${heart(1)} 呜哇哇哇…哇啊啊啊${heart(1)}」`,
            ); // :2849
            await era.printAndWait(
              `${target_name}那敏感的肛门只是因为简单地抽插几次就已经泛滥成灾………`,
            ); // :2850
          } // :2850-2851
        } // :2852-2853
        // CFLAG:330  = 8（变量语义：CFLAG 族，330） // :2853
        kojo.背面座位肛交 = 8; // :2853
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.背面座位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :2855
        await era.printAndWait(`「啊恩…呜…哈啊…啊啊啊啊啊…呜啊…………♪」`); // :2856
        await era.printAndWait(
          `${player_name}从后面侵犯着${target_name}那充满弹性的肛门………`,
        ); // :2857
        // CFLAG:330  = 7（变量语义：CFLAG 族，330） // :2858
        kojo.背面座位肛交 = 7; // :2858
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背面座位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :2860
        if (rand_n(2) === 0) {
          // :2861
          await era.printAndWait(
            `「哈啊…啊啊…啊啊啊…这、这还…远远不够嘛…从后面温柔地抱着我哦…${heart(1)}」`,
          ); // :2862
          await era.printAndWait(
            `${target_name}久经调教的肛门淫荡的弛缓下来，阴茎充满快感地大力抽插着………`,
          ); // :2863
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            // :2864
            await era.print(''); // :2865
            await era.printAndWait(
              `「啊啊啊…啊哈…啊啊啊呜！那、那么激烈吗…！已、已经要不行了啊！」`,
            ); // :2866
            await era.printAndWait(
              `${target_name}的腰被抓紧抬起狠狠击打着，充满快感地喊叫起来………`,
            ); // :2867
          } // :2867-2868
        } else {
          // :2869-2870
          await era.printAndWait(
            `「啊啊啊…除此之外…胸部也可以玩弄呢…啊呜${heart(1)} 好、好棒${heart(1)}」`,
          ); // :2870
          await era.printAndWait(
            `${target_name}的胸被从后面抓住，阴茎挤进了窄小的肛门抽动起来………`,
          ); // :2871
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            // :2872
            await era.print(''); // :2873
            await era.printAndWait(
              `「啊哇哇哇哇${heart(1)} 屁股…啊啊啊啊啊啊啊…要去了啊啊${heart(1)}」`,
            ); // :2874
            await era.printAndWait(
              `${target_name}不停地摆动着腰一边向${player_name}发出快乐的叫喊声………`,
            ); // :2875
          } // :2875-2876
        } // :2877-2878
        // CFLAG:330  = 6（变量语义：CFLAG 族，330） // :2878
        kojo.背面座位肛交 = 6; // :2878
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.背面座位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :2880
        await era.printAndWait(
          `「呜啊…哈啊…虽然还是有点…无所谓啦………${heart(1)}」`,
        ); // :2881
        await era.printAndWait(
          `${target_name}的肛门被从后方贯穿，发出了可爱的悲鸣………`,
        ); // :2882
        // CFLAG:330  = 5（变量语义：CFLAG 族，330） // :2883
        kojo.背面座位肛交 = 5; // :2883
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背面座位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :2885
        if (rand_n(2) === 0) {
          // :2886
          await era.printAndWait(
            `「连、连胸部也不放过吗…别碰啊…变态狂！啊啊…啊呜恩！」`,
          ); // :2887
          await era.printAndWait(
            `${target_name}的胸被手不断摩挲着，${player_name}对肛门的进犯还在继续………`,
          ); // :2888
        } else {
          // :2888-2889
          await era.printAndWait(
            `「给、给我…适可而止啊…混蛋！ 啊啊啊…这也太深了啊…！」`,
          ); // :2890
          await era.printAndWait(
            `${target_name}被从后面抱住，${player_name}对肛门的进犯还在继续………`,
          ); // :2891
        } // :2891-2892
        // CFLAG:330  = 4（变量语义：CFLAG 族，330） // :2893
        kojo.背面座位肛交 = 4; // :2893
      } else if (
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背面座位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :2895
        await era.printAndWait(
          `「哈啊…屁股…呜嗯…变得…啊呜呜嗯…！啊啊啊啊啊………！」`,
        ); // :2896
        await era.printAndWait(
          `${player_name}对${target_name}的悲鸣充耳不闻，继续侵犯着尻穴………`,
        ); // :2897
        // CFLAG:330  = 3（变量语义：CFLAG 族，330） // :2898
        kojo.背面座位肛交 = 3; // :2898
      } else if (kojo.背面座位肛交 <= 1 || game.kojo.口上开关 === 2) {
        // :2900
        await era.printAndWait(`「滚开…别、别过来！强暴什么的…不要啊！」`); // :2901
        await era.printAndWait(
          `${target_name}的胸被从后面抓住，因为肛门被侵犯而哭了起来………`,
        ); // :2902
        // CFLAG:330  = 2（变量语义：CFLAG 族，330） // :2903
        kojo.背面座位肛交 = 2; // :2903
      } // :2903-2904
      return 0; // :2903-2905
    } // :2903-2906
  } // :2907-2910

  if (era_flag.selectcom === 30) {
    // :2912

    if (kojo.手淫 === 0) {
      // :2914

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :2916
        await era.printAndWait(
          `「要这样抚摸这根肉棒吗…呜呼…要是其他人要${sc()}做这种服务可是要收费的哟，不过魔王大人的话就无所谓啦…啊啊${heart(1)}」`,
        ); // :2917
        await era.printAndWait(
          `${target_name}一边出神地想着什么一边继续摩擦着${player_name}的阴茎………`,
        ); // :2918
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :2920
        await era.printAndWait(
          `「哈啊哈啊…魔王大人的肉棒居然有这么大呢…${heart(1)} ${scf()}、${sc()}…想要…${heart(1)}」`,
        ); // :2921
        await era.printAndWait(
          `${target_name}垂涎欲滴地望着${player_name}的肉棒摩擦起来………`,
        ); // :2922
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        // :2924
        await era.printAndWait(`「知道啦…难道魔族都离不开这种事吗…？」`); // :2925
        await era.printAndWait(`笑意暖暖的${target_name}温柔地摩挲着阴茎………`); // :2926
      } else {
        // :2928-2929
        await era.printAndWait(
          `「居然用${scf()}、${sc()}的手来手淫吗…不、不可原谅！变态！去死啊！」`,
        ); // :2929
        await era.printAndWait(`${target_name}一边说着一边笨拙地搓动着双手………`); // :2930
      } // :2930-2931
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331） // :2932
      kojo.手淫 = 1; // :2932
      return 0; // :2932-2933
    } else {
      // :2935-2936

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.手淫 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :2937
        if (rand_n(2) === 0) {
          // :2938
          await era.printAndWait(
            `「${sc()}来服侍魔王大人的肉棒吧${heart(1)} 不过，除了手以外，还想享受其他的服务吗～」`,
          ); // :2939
          await era.printAndWait(
            `${target_name}粗重地喘息着，手丝毫不停地继续着淫靡地套动………`,
          ); // :2940
        } else {
          // :2940-2941
          await era.printAndWait(
            `「普通人的话可是要收钱的哟…魔王大人的话就请随意使用吧${heart(1)}」`,
          ); // :2942
          await era.printAndWait(
            `${target_name}舔了舔嘴唇，开始用手摩擦阴茎………`,
          ); // :2943
        } // :2943-2944
        // CFLAG:331  = 7（变量语义：CFLAG 族，331） // :2945
        kojo.手淫 = 7; // :2945
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.手淫 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :2947
        await era.printAndWait(
          `「这么大的一根肉棒…哈啊${sc()}想被它射满满一脸呢…${heart(1)}」`,
        ); // :2948
        await era.printAndWait(
          `${target_name}一边出神地想着什么一边继续摩擦着${player_name}的阴茎………`,
        ); // :2949
        // CFLAG:331  = 6（变量语义：CFLAG 族，331） // :2950
        kojo.手淫 = 6; // :2950
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.手淫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :2952
        if (rand_n(2) === 0) {
          // :2953
          await era.printAndWait(
            `「哈啊哈啊…肉棒…真是让人心情舒畅啊…啊啊啊…这样就有液体溜出来了吗…${heart(1)}」`,
          ); // :2954
          await era.printAndWait(
            `${target_name}内心的渴望让她更加热情地对待阴茎………`,
          ); // :2955
        } else {
          // :2955-2956
          await era.printAndWait(
            `「啊啊啊…大肉棒…${sc()}想要…更加用心地服侍它呢………${heart(1)}」`,
          ); // :2957
          await era.printAndWait(
            `${target_name}带着陶醉的神情用手指继续套弄着阴茎………`,
          ); // :2958
        } // :2958-2959
        // CFLAG:331  = 5（变量语义：CFLAG 族，331） // :2960
        kojo.手淫 = 5; // :2960
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.手淫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :2962
        await era.printAndWait(
          `「啊啊啊…肉棒…好热啊…手都要被烫伤了来着…啊啊啊…啊啊啊${heart(1)}」`,
        ); // :2963
        await era.printAndWait(
          `${target_name}垂涎欲滴地望着${player_name}的肉棒摩擦起来………`,
        ); // :2964
        // CFLAG:331  = 4（变量语义：CFLAG 族，331） // :2965
        kojo.手淫 = 4; // :2965
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.手淫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :2967
        await era.printAndWait(`「男人居然真的喜欢这样的事情啊………♪」`); // :2968
        await era.printAndWait(`笑意暖暖的${target_name}温柔地摩挲着阴茎………`); // :2969
        // CFLAG:331  = 3（变量语义：CFLAG 族，331） // :2970
        kojo.手淫 = 3; // :2970
      } else if (kojo.手淫 <= 1 || game.kojo.口上开关 === 2) {
        // :2972
        await era.printAndWait(
          `「会、会喜欢这样的事情…该说不愧是变态的垃圾吗…！」`,
        ); // :2973
        await era.printAndWait(
          `一边咒骂着，${target_name}继续笨拙地搓动着双手………`,
        ); // :2974
        // CFLAG:331  = 2（变量语义：CFLAG 族，331） // :2975
        kojo.手淫 = 2; // :2975
      } // :2975-2976
      return 0; // :2975-2977
    } // :2975-2978
  } // :2979-2982

  if (era_flag.selectcom === 31) {
    // :2984

    if (kojo.口交_奴 === 0) {
      // :2986

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :2988
        await era.printAndWait(
          `「哈啊哈啊…您的…您的肉棒…还真是…惊人啊…${heart(1)}」`,
        ); // :2989
        await era.printAndWait(
          `${target_name}贪婪地吮吸着阴茎，心情十分舒畅………`,
        ); // :2990
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :2992
        await era.printAndWait(
          `「嗷嗷呜…用魔王大人的肉棒当做奶嘴…是最最高兴的事情啦……呜哈…哈啊…${heart(1)}」`,
        ); // :2993
        await era.printAndWait(
          `${target_name}毫不犹豫地凑在${player_name}的阴茎上，出神地舔舐着………`,
        ); // :2994
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        // :2996
        await era.printAndWait(
          `「真是的，男人的这活儿怎么这么…呜…大啊…呜…呜呜…真是的………」`,
        ); // :2997
        await era.printAndWait(
          `${target_name}脸上有些吃惊的样子，用舌头拨动着阴茎………`,
        ); // :2998
      } else {
        // :3000-3001
        await era.printAndWait(
          `「唔啊啊…混蛋、怎么可能这么做…不行啊…呼…呜啊…」`,
        ); // :3001
        await era.printAndWait(
          `${target_name}脸上全是嫌恶的表情，但还是不得不用舌头舔舐着${player_name}的阴茎………`,
        ); // :3002
      } // :3002-3003
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332） // :3004
      kojo.口交_奴 = 1; // :3004
      return 0; // :3004-3005
    } else {
      // :3007-3009

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.口交_奴 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3009
        if (rand_n(3) === 0) {
          // :3010
          await era.printAndWait(
            `「哈啊哈啊…您的…您的肉棒…还真是…惊人啊…${heart(1)}」`,
          ); // :3011
          await era.printAndWait(
            `${target_name}那贪婪索求阴茎的样子，那淫靡诱惑的身姿是之前完全想象不到的。`,
          ); // :3012
          await era.printAndWait(
            `「呜咕…噗呜…呜呜呜呼…肉棒什么的…${heart(1)}」`,
          ); // :3013
        } else if (rand_n(2) === 0) {
          // :3014
          await era.printAndWait(
            `「啊啊啊…${sc()}已经吃掉了这么多肉棒了吗…${sc()}还是想要这个呢…${heart(1)}」`,
          ); // :3015
          await era.printAndWait(
            `${target_name}用心底能想到最完美的词赞美着${player_name}的阴茎并吸吮着。`,
          ); // :3016
          await era.printAndWait(
            `粘糊糊的舌头紧紧包住阴茎，嘴巴捋动的频率越来越快………`,
          ); // :3017
        } else {
          // :3017-3018
          await era.printAndWait(
            `「一大半都…呜…呜呼…${heart(1)} 都已经…插进去了呢…${heart(1)}」`,
          ); // :3019
          await era.printAndWait(
            `虽然这么说着但${target_name}似乎完全没有放开${player_name}阴茎的意思。`,
          ); // :3020
          await era.printAndWait(
            `「呜咕…呜噜噜…还…呼…呼…还要更多…${heart(1)}」`,
          ); // :3021
        } // :3021-3022
        // CFLAG:332  = 6（变量语义：CFLAG 族，332） // :3023
        kojo.口交_奴 = 6; // :3023
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.口交_奴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3025
        if (rand_n(3) === 0) {
          // :3026
          await era.printAndWait(
            `「呜咕…哈呼呜呜…不…啊啊啊…不要…呜咕噜呼…不要停${heart(1)}」`,
          ); // :3027
          await era.printAndWait(`${target_name}喘息粗重地用口腔服侍着阴茎。`); // :3028
          await era.printAndWait(
            `「${sc()}…才没有这么喜欢大肉棒什么的…呜咕${heart(1)} 都是因为魔王的缘故才会这么做哦${heart(1)}」`,
          ); // :3029
        } else if (rand_n(2) === 0) {
          // :3030
          await era.printAndWait(
            `「肉棒呜啊…真是…呼恩…呜…${scf()}、${sc()}…已经，没有肉棒就活不下去了啊啊啊…${heart(1)}」`,
          ); // :3031
          await era.printAndWait(
            `${target_name}像母狗一样闻着下体的味道喘着气，然后开始舔舐起来。`,
          ); // :3032
          await era.printAndWait(
            `「呜啊呜啊…呜…这个味道…很诱人呢${heart(1)} 呜…咕噜…呼呼${heart(1)}」`,
          ); // :3033
        } else {
          // :3033-3034
          await era.printAndWait(
            `「呜啊…哈啊…${sc()}只有在对方是…魔王大人的肉棒的时候…才会这么做哦…${heart(1)}」`,
          ); // :3035
          await era.printAndWait(
            `${target_name}吮吸着眼前这雄伟的肉棒变得十分兴奋。`,
          ); // :3036
          await era.printAndWait(`「呜嗯…哈啊…我说…啊呜…呜…呜啊…${heart(1)}」`); // :3037
        } // :3037-3038
        // CFLAG:332  = 5（变量语义：CFLAG 族，332） // :3039
        kojo.口交_奴 = 5; // :3039
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3041
        await era.printAndWait(
          `「呜啊……哈啊…哈啊…啊啊咕咕…竟然做这样的事情…不要给我机会啊…否则一定会把这丑陋的东西咬成几段的…呜啊！？`,
        ); // :3042
        await era.printAndWait(
          `${player_name}的阴茎堵住${target_name}的喉咙让她动弹不得，然后下达了吮吸的命令………`,
        ); // :3043
        // CFLAG:332  = 4（变量语义：CFLAG 族，332） // :3044
        kojo.口交_奴 = 4; // :3044
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.口交_奴 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :3046
        await era.printAndWait(
          `「${sc()}能得到这样的肉棒，真是幸福啊…呜…哇啊…呜呜呜…哈啊……♪」`,
        ); // :3047
        await era.printAndWait(`${target_name}眯着眼睛用舌头和阴茎纠缠着………`); // :3048
        // CFLAG:332  = 3（变量语义：CFLAG 族，332） // :3049
        kojo.口交_奴 = 3; // :3049
      } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 === 2) {
        // :3051
        await era.printAndWait(`「为什么这家伙这么硬啊……咕…呜啊…哈呜…呜………」`); // :3052
        await era.printAndWait(
          `${target_name}眼中含泪，勉强地用舌头清扫着${player_name}的阴茎………`,
        ); // :3053
        // CFLAG:332  = 2（变量语义：CFLAG 族，332） // :3054
        kojo.口交_奴 = 2; // :3054
      } // :3054-3055
      return 0; // :3054-3056
    } // :3054-3057
  } // :3058-3061

  if (era_flag.selectcom === 32) {
    // :3063

    if (kojo.乳交 === 0) {
      // :3065

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :3067
        await era.printAndWait(
          `「${sc()}的乳房上…满满地都是魔王大人的痕迹呢${heart(1)}」`,
        ); // :3068
        if (
          era.get(`talent:${target}:110`) ||
          0 ||
          era.get(`talent:${target}:114`) ||
          0 ||
          era.get(`talent:${target}:119`) ||
          0
        ) {
          // :3069
          await era.printAndWait(`「${sc()}的大咪咪能让你舒服吗？」`); // :3070
          await era.printAndWait(
            `${target_name}自傲地笑了，继续着对丰乳的爱抚………`,
          ); // :3071
        } // :3071-3072
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :3074
        await era.printAndWait(`「啊哈哈，胸部很舒服呢…♪」`); // :3075
        if (
          era.get(`talent:${target}:110`) ||
          0 ||
          era.get(`talent:${target}:114`) ||
          0 ||
          era.get(`talent:${target}:119`) ||
          0
        ) {
          // :3076
          await era.printAndWait(`${target_name}带着得意的笑容继续着乳交。`); // :3077
          await era.printAndWait(
            `「哈啊…这个乳房，已经成为魔王大人的私有物了哦…${heart(1)}」`,
          ); // :3078
        } // :3078-3079
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        // :3081
        await era.printAndWait(
          `「哈啊…要我…做这样的事情吗………身体…开始发热了………」`,
        ); // :3082
        if (
          era.get(`talent:${target}:110`) ||
          0 ||
          era.get(`talent:${target}:114`) ||
          0 ||
          era.get(`talent:${target}:119`) ||
          0
        ) {
          // :3083
          await era.printAndWait(
            `「${scf()}、${sc()}这自豪的胸部…啊啊啊………！」`,
          ); // :3084
          await era.printAndWait(
            `${target_name}那丰满的乳房仍然被${player_name}的阴茎侵犯着………`,
          ); // :3085
        } // :3085-3086
      } else {
        // :3088-3089
        await era.printAndWait(
          `「嘁…让${sc()}做这样羞耻的事情，总有一天要将你碎尸万段啊啊………！」`,
        ); // :3089
      } // :3089-3090
      // CFLAG:TARGET:333  = 1（变量语义：CFLAG 族，TARGET:333） // :3091
      kojo.乳交 = 1; // :3091
      return 0; // :3091-3092
    } else {
      // :3094-3095

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.口交_奴 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3096
        if (rand_n(2) === 0) {
          // :3097
          await era.printAndWait(
            `「${sc()}用胸部做这种事情…只有你能享用哦…${heart(1)}」`,
          ); // :3098
          await era.printAndWait(
            `${target_name}粗重地喘息着，继续用那丰满的乳房服侍着………`,
          ); // :3099
          if (
            era.get(`talent:${target}:110`) ||
            0 ||
            era.get(`talent:${target}:114`) ||
            0 ||
            era.get(`talent:${target}:119`) ||
            0
          ) {
            // :3100
            await era.printAndWait(
              `「呜啊…哈啊哈啊…${sc()}的乳房能够被…被这样做真是太好了…${heart(1)} 请把大肉棒全都塞进来吧${heart(1)}」`,
            ); // :3101
            await era.printAndWait(
              `说着这样的话，${target_name}丰满的乳房中间${player_name}的阴茎正昂扬地埋在这里………`,
            ); // :3102
          } // :3102-3103
        } else {
          // :3104-3105
          await era.printAndWait(
            `「呜…呼呼…哇啊啊…更…更舒服了啊啊…${heart(1)}」`,
          ); // :3105
          await era.printAndWait(`${target_name}窃笑着，继续用乳房服务起来………`); // :3106
          if (
            era.get(`talent:${target}:110`) ||
            0 ||
            era.get(`talent:${target}:114`) ||
            0 ||
            era.get(`talent:${target}:119`) ||
            0
          ) {
            // :3107
            await era.printAndWait(
              `「啊啊啊啊啊…胸部被侵犯的感觉…比所预料的还要好呢${heart(1)}」`,
            ); // :3108
            await era.printAndWait(
              `${target_name}丰满的胸部在${player_name}的阴茎前后突刺下变成了很下贱的样子………`,
            ); // :3109
          } // :3109-3110
        } // :3111-3112
        // CFLAG:333  = 6（变量语义：CFLAG 族，333） // :3112
        kojo.乳交 = 6; // :3112
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.口交_奴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3114
        await era.printAndWait(
          `「哈啊哈啊…${sc()}的奶子，充满了您留下的痕迹呢…${heart(1)}」`,
        ); // :3115
        await era.printAndWait(
          `${target_name}因为阴茎的味道兴奋得连呼吸都变得急促了………`,
        ); // :3116
        if (
          era.get(`talent:${target}:110`) ||
          0 ||
          era.get(`talent:${target}:114`) ||
          0 ||
          era.get(`talent:${target}:119`) ||
          0
        ) {
          // :3117
          await era.printAndWait(
            `「${sc()}的大咪咪能让你舒服吗？ 啊哈哈…${heart(1)}」`,
          ); // :3118
          await era.printAndWait(
            `${target_name}骄傲地笑着，继续用丰满的乳房服侍着阴茎………`,
          ); // :3119
        } // :3119-3120
        // CFLAG:333  = 5（变量语义：CFLAG 族，333） // :3121
        kojo.乳交 = 5; // :3121
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.乳交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3123
        if (rand_n(2) === 0) {
          // :3124
          await era.printAndWait(
            `「啊啊…${sc()}的胸部就是为魔王大人而存在的啊………♪」`,
          ); // :3125
          await era.printAndWait(
            `${target_name}非常陶醉地继续进行着胸部的服务………`,
          ); // :3126
          if (
            era.get(`talent:${target}:110`) ||
            0 ||
            era.get(`talent:${target}:114`) ||
            0 ||
            era.get(`talent:${target}:119`) ||
            0
          ) {
            // :3127
            await era.printAndWait(
              `「哈啊哈啊…这硕大的胸部就是用来做这种事的呢…${heart(1)}」`,
            ); // :3128
            await era.printAndWait(
              `${target_name}用丰满的乳房把${player_name}的阴茎包裹进去………`,
            ); // :3129
          } // :3129-3130
        } else {
          // :3131-3132
          await era.printAndWait(
            `「哈啊啊…开始发热了${heart(1)} ${sc()}的胸部很舒服呢♪」`,
          ); // :3132
          await era.printAndWait(
            `在${target_name}胸口肆意进出的${player_name}的阴茎差点就射精了………`,
          ); // :3133
          if (
            era.get(`talent:${target}:110`) ||
            0 ||
            era.get(`talent:${target}:114`) ||
            0 ||
            era.get(`talent:${target}:119`) ||
            0
          ) {
            // :3134
            await era.printAndWait(
              `接着${target_name}带着得意的笑容继续着乳交。`,
            ); // :3135
            await era.printAndWait(
              `「啊啊…${sc()}的乳房在…发情了呢${heart(1)}」`,
            ); // :3136
          } // :3136-3137
        } // :3138-3139
        // CFLAG:333  = 4（变量语义：CFLAG 族，333） // :3139
        kojo.乳交 = 4; // :3139
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.乳交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :3141
        await era.printAndWait(`「哈啊哈啊…这样就行了吗…呜啊……有点热♪」`); // :3142
        await era.printAndWait(
          `${target_name}用充满快感的胸部夹住${player_name}的阴茎。`,
        ); // :3143
        if (
          era.get(`talent:${target}:110`) ||
          0 ||
          era.get(`talent:${target}:114`) ||
          0 ||
          era.get(`talent:${target}:119`) ||
          0
        ) {
          // :3144
          await era.printAndWait(`「${sc()}自豪的胸部…很舒服的吧………？」`); // :3145
          await era.printAndWait(`${target_name}用丰满的乳房拼命服侍着………`); // :3146
        } // :3146-3147
        // CFLAG:333  = 3（变量语义：CFLAG 族，333） // :3148
        kojo.乳交 = 3; // :3148
      } else if (kojo.乳交 <= 1 || game.kojo.口上开关 === 2) {
        // :3150
        await era.printAndWait(`「别、别在我胸口磨蹭啊…啊…啊啊啊！」`); // :3151
        await era.printAndWait(
          `${target_name}因为胸口被胡乱抽插着而痛苦不已………`,
        ); // :3152
        // CFLAG:333  = 2（变量语义：CFLAG 族，333） // :3153
        kojo.乳交 = 2; // :3153
      } // :3153-3154
      return 0; // :3153-3155
    } // :3153-3156
  } // :3157-3160

  if (era_flag.selectcom === 33) {
    // :3162

    if (kojo.股间性交 === 0) {
      // :3164

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :3166
        await era.printAndWait(
          `「哈啊啊…肉棒好烫呢…好想就这样插进来………${heart(1)}」`,
        ); // :3167
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :3169
        await era.printAndWait(
          `「肉、肉棒让人很舒服呢…${heart(1)} 呜…嗷嗷呜${heart(1)}」`,
        ); // :3170
      } else {
        // :3172-3173
        await era.printAndWait(`「这、这种事情简直比死掉还糟糕啊…呜…不要…」`); // :3173
      } // :3173-3174
      // CFLAG:TARGET:334  = 1（变量语义：CFLAG 族，TARGET:334） // :3175
      kojo.股间性交 = 1; // :3175
      return 0; // :3175-3176
    } else {
      // :3178-3180

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`talent:${target}:0`) || 0) === 1 &&
        (kojo.股间性交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3180
        await era.printAndWait(
          `「这样吗…魔王大人的肉棒…这样插进来了…其实明明更想要…插到里面去呢${heart(1)}」`,
        ); // :3181
        await era.printAndWait(
          `${target_name}一边哭着，一边因为阴茎的热度而继续着处女的股间性交奉仕………`,
        ); // :3182
        // CFLAG:334  = 6（变量语义：CFLAG 族，334） // :3183
        kojo.股间性交 = 6; // :3183
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.股间性交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3185
        await era.printAndWait(
          `「哈啊啊…肉棒好烫呢…好想就这样插进来………${heart(1)}」`,
        ); // :3186
        await era.printAndWait(
          `脸上浮现出淫荡的微笑，${target_name}愉快地享受着股间性交………`,
        ); // :3187
        // CFLAG:334  = 5（变量语义：CFLAG 族，334） // :3188
        kojo.股间性交 = 5; // :3188
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`talent:${target}:0`) || 0) === 1 &&
        (kojo.股间性交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3190
        await era.printAndWait(
          `「要、要做这样的事情啊…${sc()}…只、只要被魔王大人抱着就足够了！」`,
        ); // :3191
        await era.printAndWait(
          `${target_name}露出差点就要哭的样子，继续着股间性交………`,
        ); // :3192
        // CFLAG:334  = 4（变量语义：CFLAG 族，334） // :3193
        kojo.股间性交 = 4; // :3193
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.股间性交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :3195
        await era.printAndWait(
          `「肉、肉棒让人很舒服呢…${heart(1)} 呜…嗷嗷呜${heart(1)}」`,
        ); // :3196
        await era.printAndWait(
          `${target_name}满脸通红地回想着与${player_name}愉快的股间性交………`,
        ); // :3197
        // CFLAG:334  = 3（变量语义：CFLAG 族，334） // :3198
        kojo.股间性交 = 3; // :3198
      } else if (kojo.股间性交 <= 1 || game.kojo.口上开关 === 2) {
        // :3200
        await era.printAndWait(
          `「呼，哼，下贱的虫子，居然想要把那东西放进${sc()}的那个地方吗………」`,
        ); // :3201
        await era.printAndWait(`${target_name}脸红了，继续着股间性交………`); // :3202
        // CFLAG:334  = 2（变量语义：CFLAG 族，334） // :3203
        kojo.股间性交 = 2; // :3203
      } // :3203-3204
      return 0; // :3203-3205
    } // :3203-3206
  } // :3207-3210

  if (era_flag.selectcom === 34) {
    // :3212

    if (kojo.骑乘位 === 0) {
      // :3214

      if ((era.get(`talent:${target}:0`) || 0) === 1) {
        // :3216

        if ((era.get(`talent:${target}:76`) || 0) === 1) {
          // :3218

          if ((era.get(`talent:${target}:314`) || 0) === 9) {
            // :3220
            await era.printAndWait(
              `「嘿、嘿嘿…魔王大人的巨型肉棒…把${sc()}的处女之身给吞噬了呢…${heart(1)}」`,
            ); // :3221
            await era.printAndWait(
              `${target_name}不顾破处的痛楚摆动着腰品尝${player_name}阴茎的味道。`,
            ); // :3222
            await era.printAndWait(
              `「呜啊呜呼…啊啊啊…${sc()}…魔王大人的肉棒真让人着迷…${heart(1)}」`,
            ); // :3223
            await era.printAndWait(
              `${target_name}梦呓般嘟哝着，一边在${player_name}身上为了寻求快乐，激烈地摇动着纤腰………`,
            ); // :3224
          } else {
            // :3224-3225
            await era.printAndWait(
              `「啊啊啊啊…整、整个都进去了…魔王大人的阴茎…${heart(1)}」`,
            ); // :3226
            await era.printAndWait(
              `${target_name}肩部因为愉悦而震动着，不管破处的痛苦只顾着把阴茎引入小穴的更深处。`,
            ); // :3227
            await era.printAndWait(
              `「哈啊哈啊…${sc()}成为魔王大人的女人了…${heart(1)} 还…还可以更激烈一点…呜呜啊啊啊啊啊啊${heart(1)}」`,
            ); // :3228
            await era.printAndWait(
              `${target_name}一边发出这样的声音一边被${player_name}抓住腰更加用力的蹂躏着处女之身………`,
            ); // :3229
          } // :3229-3230
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          // :3232

          if ((era.get(`talent:${target}:314`) || 0) === 9) {
            // :3234
            await era.printAndWait(
              `「唔啊啊…哈啊啊呜…啊啊…${sc()}……${heart(1)}」`,
            ); // :3235
            await era.printAndWait(
              `${target_name}因为破瓜之痛的缘故背上的翅膀痉挛着舒张开来，气喘吁吁。`,
            ); // :3236
            await era.printAndWait(
              `「轻、轻点…有点痛…呜！可以好好感受魔王大人华丽的肉棒了呢………♪」`,
            ); // :3237
            await era.printAndWait(
              `${target_name}撒娇似的请求着${player_name}不要乱动，由${target_name}自己来控制动作的幅度………`,
            ); // :3238
          } else {
            // :3238-3239
            await era.printAndWait(
              `「${scf()}、${sc()}的那里…呜咕…哈啊哈啊…全部都被塞满了…${heart(1)}」`,
            ); // :3240
            await era.printAndWait(
              `${target_name}的处女穴深处被${player_name}的阴茎连连刺探，剧烈地喘息着。`,
            ); // :3241
            await era.printAndWait(
              `「哈啊哈啊…得到了${sc()}的处女之身的感觉怎样呢…啊、啊呼…啊啊啊啊！」`,
            ); // :3242
            await era.printAndWait(
              `${player_name}腰部开始抽动起来，品尝着${target_name}处女小穴的滋味………`,
            ); // :3243
          } // :3243-3244
        } else {
          // :3246-3247
          await era.printAndWait(
            `${target_name}的处女穴将${player_name}的阴茎紧紧夹住。`,
          ); // :3247
          await era.printAndWait(
            `「啊啊啊啊…我、我的…我的处女之身就这样…${sc()}…啊啊啊啊！」`,
          ); // :3248
          await era.printAndWait(
            `${player_name}提起腰部开始慢慢享受处女的芬芳肉穴………`,
          ); // :3249
        } // :3249-3250
      } else {
        // :3252-3254

        if ((era.get(`talent:${target}:76`) || 0) === 1) {
          // :3254
          await era.printAndWait(
            `「啊呜…啊啊啊…就这样！更…更用力的干…${scf()}，${sc()}啊…${heart(1)}」`,
          ); // :3255
          await era.printAndWait(
            `${player_name}紧紧抓住${target_name}偏开的腰部狠狠将阴茎插入摩擦着阴道壁。`,
          ); // :3256
          await era.printAndWait(
            `「就、就是这样${heart(1)}…好、好棒…魔王大人啊啊${heart(1)}」`,
          ); // :3257
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          // :3259
          await era.printAndWait(`「啊啊…${sc()}的小穴里…满满的都是呢…♪」`); // :3260
          await era.printAndWait(
            `${target_name}扭动着自己的腰想要更多地享受${player_name}阴茎那美好的滋味。`,
          ); // :3261
          await era.printAndWait(
            `「不用魔王大人动哦…${sc()}感觉好舒服呢…${heart(1)}」`,
          ); // :3262
        } else {
          // :3264-3265
          await era.printAndWait(`「要我自己…自己动吗…呜…哈啊哈啊…呜………」`); // :3265
          await era.printAndWait(
            `${target_name}对意外跨坐在你身上这件事感觉非常羞耻，只是敷衍着，并不肯配合你扭动腰部。`,
          ); // :3266
          await era.printAndWait(
            `「哈呜！？住、住手啊！不、不能插进那里…哈啊啊呜呜呜！」`,
          ); // :3267
        } // :3267-3268
      } // :3269-3270
      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335） // :3270
      kojo.骑乘位 = 1; // :3270
      return 0; // :3270-3271
    } else {
      // :3273-3275

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.骑乘位 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :3275
        if (rand_n(4) === 0) {
          // :3276
          await era.printAndWait(
            `「啊呜…啊啊啊…就这样！更…更用力的干…${scf()}、${sc()}啊…${heart(1)}」`,
          ); // :3277
          await era.printAndWait(
            `${player_name}紧紧抓住${target_name}偏开的腰部狠狠将阴茎插入摩擦着阴道壁。`,
          ); // :3278
          await era.printAndWait(
            `「就、就是这样${heart(1)}…好、好棒…魔王大人啊啊${heart(1)}」`,
          ); // :3279
        } else if (rand_n(3) === 0) {
          // :3280
          await era.printAndWait(
            `「啊啊啊…呜…啊啊啊…还要…更…更粗暴的侵犯${sc()}吧…${heart(1)}」`,
          ); // :3281
          await era.printAndWait(
            `${player_name}兴奋地抓住${target_name}的腰用阴茎狠狠在阴道壁上磨擦着。`,
          ); // :3282
          await era.printAndWait(
            `「呼…哈啊啊${heart(1)}唔啊啊${heart(1)}魔王的肉棒最粗了！超级肉棒！」`,
          ); // :3283
        } else if (rand_n(2) === 0) {
          // :3284
          await era.printAndWait(
            `「动…继续动下去…${sc()}感觉很舒服呢…啊啊…啊啊啊啊…${sc()}这淫荡的腰技感觉如何？」`,
          ); // :3285
          await era.printAndWait(
            `${target_name}淫乱的腰部舞动着，将阴茎引入小穴最深处。`,
          ); // :3286
          await era.printAndWait(
            `「哈啊…啊啊啊啊…魔王大人只要躺着不动就好了…啊啊啊啊${heart(1)} 真、真是舒服呢${heart(1)}」`,
          ); // :3287
        } else {
          // :3287-3288
          await era.printAndWait(
            `「动、继续动下去…${sc()}感觉很舒服呢…啊啊…啊啊啊啊…${sc()}这淫荡的腰技感觉如何？」`,
          ); // :3289
          await era.printAndWait(
            `${target_name}淫乱的腰部舞动着，将阴茎引入小穴深处上下耸动。`,
          ); // :3290
          await era.printAndWait(
            `「哈呜…这深深的插入…魔王大人那力量十足的中出${heart(1)} 小穴里满满的好舒服${heart(1)}」`,
          ); // :3291
        } // :3291-3292
        // CFLAG:335  = 7（变量语义：CFLAG 族，335） // :3293
        kojo.骑乘位 = 7; // :3293
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.骑乘位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3295
        if (rand_n(4) === 0) {
          // :3296
          await era.printAndWait(
            `「啊啊…${sc()}的小穴里…满满的都是呢…♪ 呐，整根都进来了哟，看到了吗…？」`,
          ); // :3297
          await era.printAndWait(
            `${target_name}扭动着自己的腰想要更多地享受${player_name}阴茎那美好的滋味。`,
          ); // :3298
          await era.printAndWait(
            `「不用魔王大人动哦…${sc()}感觉好舒服呢…${heart(1)}」`,
          ); // :3299
        } else if (rand_n(3) === 0) {
          // :3300
          await era.printAndWait(`「呜…啊啊啊…啊啊啊呜…啊呼呜${heart(1)}」`); // :3301
          await era.printAndWait(
            `${player_name}的阴茎顶得${target_name}不由得发出可爱的呻吟声，剧烈地喘息起来。`,
          ); // :3302
          await era.printAndWait(
            `「请…请让${sc()}为您献上更舒服的服务…啊、啊啊呜${heart(1)}」`,
          ); // :3303
        } else if (rand_n(2) === 0) {
          // :3304
          await era.printAndWait(`「呜…啊啊啊…啊啊啊呜…啊呼呜${heart(1)}」`); // :3305
          await era.printAndWait(
            `${player_name}的阴茎顶得${target_name}不由得发出可爱的呻吟声，剧烈地喘息起来。`,
          ); // :3306
          await era.printAndWait(
            `「${scf()}、${sc()}…已、已经要去了…去了…啊啊啊啊${heart(1)}…啊啊啊啊${heart(1)}」`,
          ); // :3307
        } else {
          // :3307-3308
          await era.printAndWait(
            `「哈啊啊…能够…被魔王大人的大肉棒垂青…${sc()}是多么的幸运…${heart(1)}」`,
          ); // :3309
          await era.printAndWait(
            `${target_name}坐在${player_name}身上淫靡地扭动着腰肢。`,
          ); // :3310
          await era.printAndWait(
            `「${sc()}已经快要爽上天了…啊啊啊啊啊…魔王大人不要动哦…${heart(1)}」`,
          ); // :3311
        } // :3311-3312
        // CFLAG:335  = 6（变量语义：CFLAG 族，335） // :3313
        kojo.骑乘位 = 6; // :3313
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (kojo.骑乘位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3315
        if (rand_n(3) === 0) {
          // :3316
          await era.printAndWait(
            `「不、不怕我掐断你的脖子吗…呜啊啊啊！…住、住手…从下往上顶进来了啊…啊啊啊啊啊啊！」`,
          ); // :3317
          await era.printAndWait(
            `${target_name}的小穴被${player_name}的阴茎顶得快感连连。`,
          ); // :3318
          await era.printAndWait(
            `跟随${target_name}的意志软化下来的小穴很快包裹住了${player_name}的阴茎，带来了非常愉悦的享受………`,
          ); // :3319
        } else if (rand_n(2) === 0) {
          // :3320
          await era.printAndWait(
            `「哈啊…哈啊…呜…！哈、住手、你这渣滓…啊啊…不要呜呜♪」`,
          ); // :3321
          await era.printAndWait(
            `可${target_name}那久经调教的小穴，只能给男人深入的阴茎带来快乐吧。`,
          ); // :3322
          await era.printAndWait(
            `「啊啊啊…呜…不要…${scf()}，${sc()}感觉…感觉好糟糕…哈呜…啊啊啊啊！！」`,
          ); // :3323
          await era.printAndWait(
            `因为屈辱而哭泣喘息着的${target_name}被${player_name}深深地插进了紧窄的小穴………`,
          ); // :3324
        } else {
          // :3324-3325
          await era.printAndWait(
            `${target_name}的小穴已经被阴茎狠狠侵犯着。即使意志再坚强也无法阻止快感在她体内源源不断的产生。`,
          ); // :3326
          await era.printAndWait(
            `「呜…哈…哈啊…！总有一天…总有一天我一定会…杀了你…杀了你啊啊啊啊！不、不要不要不要啊啊啊！」`,
          ); // :3327
          await era.printAndWait(
            `下体不由自主配合着的${target_name}虽然还怀有强烈的反抗心，却情不自禁地发出快乐的呻吟………`,
          ); // :3328
        } // :3328-3329
        // CFLAG:335  = 5（变量语义：CFLAG 族，335） // :3330
        kojo.骑乘位 = 5; // :3330
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (kojo.骑乘位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3332
        if (rand_n(2) === 0) {
          // :3333
          await era.printAndWait(
            `「呜…啊啊啊…啊呜！啊啊…哈啊…${sc()}…的声音…呜…哈啊呜♪」`,
          ); // :3334
          await era.printAndWait(
            `${target_name}的小穴被${player_name}的阴茎一刺到底。`,
          ); // :3335
          await era.printAndWait(
            `主动扭动起腰部的${target_name}露出愉悦的痴态承受着${player_name}阴茎的抽插………`,
          ); // :3336
        } else {
          // :3336-3337
          await era.printAndWait(`「啊啊…啊啊啊…顶、顶进去了…不要…啊啊啊呜♪」`); // :3338
          await era.printAndWait(
            `想要逃开的${target_name}被${player_name}双手紧紧抓住，毫不留情地用肉棒责罚着小穴。`,
          ); // :3339
          await era.printAndWait(
            `${target_name}久经调教的小穴十分柔软地包裹住${player_name}的阴茎，带来了相当程度的快感………`,
          ); // :3340
        } // :3340-3341
        // CFLAG:335  = 4（变量语义：CFLAG 族，335） // :3342
        kojo.骑乘位 = 4; // :3342
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.骑乘位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :3344
        await era.printAndWait(
          `「哈啊哈啊…这种事情会满足你那肮脏的欲望吗…？ 啊啊…啊啊啊！」`,
        ); // :3345
        await era.printAndWait(
          `${target_name}摆动着自己的腰部，这使${player_name}感到更加愉悦………`,
        ); // :3346
        // CFLAG:335  = 3（变量语义：CFLAG 族，335） // :3347
        kojo.骑乘位 = 3; // :3347
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {
        // :3349
        await era.printAndWait(
          `「啊啊啊…呜…反、反正你快点射精就行了…啊啊啊啊！？把我的腰放开…啊啊啊啊！」`,
        ); // :3350
        await era.printAndWait(
          `${target_name}敷衍似的摇动着腰部，却被${player_name}抓住腰狠狠地上下摆动摩擦着阴茎………`,
        ); // :3351
        // CFLAG:335  = 2（变量语义：CFLAG 族，335） // :3352
        kojo.骑乘位 = 2; // :3352
      } // :3352-3353
      return 0; // :3352-3354
    } // :3352-3355
  } // :3356-3359

  if (era_flag.selectcom === 35) {
    // :3361

    if (kojo.全身擦洗 === 0) {
      // :3363

      if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        // :3365
        await era.printAndWait(`「呼…呼…热得有些兴奋了呢………」`); // :3366
        await era.printAndWait(
          `作为第一次全身擦洗，${target_name}的手在${player_name}身体上笨拙地滑动着………`,
        ); // :3367
      } else {
        // :3369-3370
        await era.printAndWait(
          `「为什么要${sc()}做这种事………啊、不好，手滑了！」`,
        ); // :3370
        await era.printAndWait(
          `作为第一次全身擦洗，${target_name}的手在${player_name}身体上笨拙地滑动着………`,
        ); // :3371
      } // :3371-3372
      // CFLAG:TARGET:336  = 1（变量语义：CFLAG 族，TARGET:336） // :3373
      kojo.全身擦洗 = 1; // :3373
      return 0; // :3373-3374
    } else {
      // :3376-3377

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.全身擦洗 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3378
        await era.printAndWait(
          `「哈啊${heart(1)} 啊啊啊${heart(1)} ${sc()}的擦洗做得很舒服吧，所以射精什么的可还不行哦${heart(1)}」`,
        ); // :3379
        await era.printAndWait(
          `${target_name}一边笑着一边在${player_name}泡在水里的小兄弟上摩擦着。`,
        ); // :3380
        await era.printAndWait(
          `「呜…啊呜…啊啊啊…${sc()}也觉得很舒服呢…${heart(1)}」`,
        ); // :3381
        // CFLAG:336  = 6（变量语义：CFLAG 族，336） // :3382
        kojo.全身擦洗 = 6; // :3382
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.全身擦洗 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3384
        await era.printAndWait(
          `「${sc()}全身上下的美丽都被你看光了呢…啊啊啊啊♪ 看，连这种地方都显得很漂亮吧${heart(1)}」`,
        ); // :3385
        await era.printAndWait(
          `${target_name}灵活的身体滑动在${player_name}身上仔细擦洗着。`,
        ); // :3386
        await era.printAndWait(
          `${player_name}的脚被轻轻抱住，脚趾的前端被含进嘴里………`,
        ); // :3387
        // CFLAG:336  = 5（变量语义：CFLAG 族，336） // :3388
        kojo.全身擦洗 = 5; // :3388
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (kojo.全身擦洗 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3390
        await era.printAndWait(
          `「${sc()}才不会在你这种垃圾面前展露身体啊…呜…别碰奇怪的地方！…呜啊啊啊！」`,
        ); // :3391
        await era.printAndWait(
          `${player_name}非常耐心地对待着${target_name}，像毛巾一样“使用”她的身体………`,
        ); // :3392
        // CFLAG:336  = 4（变量语义：CFLAG 族，336） // :3393
        kojo.全身擦洗 = 4; // :3393
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.全身擦洗 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :3395
        await era.printAndWait(
          `「呜…哈…啊啊呜…哈啊哈啊…难得的洗澡时间呢…啊啊啊呜」`,
        ); // :3396
        await era.printAndWait(
          `虽然这么说着${target_name}还是取来肥皂一边发出诱人的声音一边仔细擦洗着身体………`,
        ); // :3397
        // CFLAG:336  = 3（变量语义：CFLAG 族，336） // :3398
        kojo.全身擦洗 = 3; // :3398
      } else if (kojo.全身擦洗 <= 1 || game.kojo.口上开关 === 2) {
        // :3400
        await era.printAndWait(
          `「呼…哈啊…哈啊…呜呜呜…真是屈辱…${sc()}是不会给你洗的…哈呜…别碰我啊！」`,
        ); // :3401
        await era.printAndWait(
          `${target_name}流着眼泪开始用自己的身体擦拭着${player_name}的身体………`,
        ); // :3402
        // CFLAG:336  = 2（变量语义：CFLAG 族，336） // :3403
        kojo.全身擦洗 = 2; // :3403
      } // :3403-3404
      return 0; // :3403-3405
    } // :3403-3406
  } // :3407-3410

  if (era_flag.selectcom === 36) {
    // :3412

    if (kojo.骑乘位肛交 === 0) {
      // :3414

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :3416
        if ((era.get(`abl:${target}:3`) || 0) >= 3) {
          // :3417
          await era.printAndWait(
            `「呜呼…哇啊呜…！ ${scf()}、${sc()}…请随意享用我的身体吧${heart(1)}…啊啊啊啊啊${heart(1)}」`,
          ); // :3418
          await era.printAndWait(
            `${target_name}舔了舔嘴唇开始扭动腰部享受这快乐………`,
          ); // :3419
        } else {
          // :3419-3420
          await era.printAndWait(
            `「呜…啊啊啊…厉害的肉棒…啊啊啊呜…屁股要坏掉了${heart(1)}」`,
          ); // :3421
          await era.printAndWait(
            `${target_name}放低自己的腰部，将${player_name}的阴茎根部吞入久经开发的肛门………`,
          ); // :3422
        } // :3422-3423
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :3425
        if ((era.get(`abl:${target}:3`) || 0) >= 3) {
          // :3426
          await era.printAndWait(
            `「啊啊呜…啊…看啊…${sc()}的屁股…魔王大人的整根肉棒都插进去了…${heart(1)}」`,
          ); // :3427
          await era.printAndWait(
            `${target_name}炫耀似的展开双腿上下摇动着身体感受肛门的触觉………`,
          ); // :3428
        } else {
          // :3428-3429
          await era.printAndWait(
            `「呜…啊啊…别、别那么粗暴…啊啊…啊啊啊啊…不、不要全都插进去…呜哈啊！」`,
          ); // :3430
          await era.printAndWait(
            `${player_name}抓住${target_name}的腰把阴茎顶在肛门上，强行插了进去………`,
          ); // :3431
        } // :3431-3432
      } else {
        // :3434-3435
        if ((era.get(`abl:${target}:3`) || 0) >= 3) {
          // :3435
          await era.printAndWait(
            `「啊啊啊…哈啊…呜呼…全都进去了…哈呜…别、别动啊……啊啊啊啊呜♪」`,
          ); // :3436
          await era.printAndWait(
            `${target_name}未经开发的尻穴艰难地将${player_name}的阴茎吞入，紧紧夹住………`,
          ); // :3437
        } else {
          // :3437-3438
          await era.printAndWait(`「居然要我，做这样的事情…嘁…呜…呜哇…！」`); // :3439
          await era.printAndWait(
            `${player_name}抓住${target_name}的腰把阴茎顶在肛门上，强行插了进去………`,
          ); // :3440
        } // :3440-3441
      } // :3442-3443
      // CFLAG:TARGET:337  = 1（变量语义：CFLAG 族，TARGET:337） // :3443
      kojo.骑乘位肛交 = 1; // :3443
      return 0; // :3443-3444
    } else {
      // :3446-3447

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.骑乘位肛交 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :3449
        if (rand_n(2) === 0) {
          // :3450
          await era.printAndWait(
            `「呜呼…哇啊呜…！ ${scf()}、${sc()}…随你怎样都可以啦${heart(1)}」`,
          ); // :3451
          await era.printAndWait(
            `${target_name}舔了舔嘴唇开始扭动腰部享受这快乐………`,
          ); // :3452
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            // :3454
            await era.printAndWait(
              `「已、已经…已经要高潮了啊啊…啊啊啊…屁股坏掉了${heart(1)}」`,
            ); // :3454
          } // :3454
        } else {
          // :3454-3455
          await era.printAndWait(
            `${target_name}的尻穴紧紧纠缠着肉棒使之快感十足。`,
          ); // :3456
          await era.printAndWait(
            `「啊啊啊…啊啊啊…就是这个样子…${sc()}…还想要更激烈的冲击${heart(1)}」`,
          ); // :3457
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            // :3459
            await era.printAndWait(
              `「啊啊啊啊…真是强壮啊…${sc()}的屁股已经变得很糟糕了呢${heart(1)}」`,
            ); // :3459
          } // :3459
        } // :3459-3460
        // CFLAG:337  = 8（变量语义：CFLAG 族，337） // :3461
        kojo.骑乘位肛交 = 8; // :3461
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.骑乘位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :3463
        await era.printAndWait(
          `「呜…啊啊啊…厉害的肉棒…啊啊啊呜…屁股要坏掉了${heart(1)}」`,
        ); // :3464
        await era.printAndWait(
          `${target_name}放低自己的腰部，将${player_name}的阴茎整根吞入久经开发的尻穴………`,
        ); // :3465
        await era.printAndWait(
          `「呜哈${heart(1)} 肉棒…全都吞进去了哦…${heart(1)}」`,
        ); // :3466
        // CFLAG:337  = 7（变量语义：CFLAG 族，337） // :3467
        kojo.骑乘位肛交 = 7; // :3467
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.骑乘位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3469
        if (rand_n(2) === 0) {
          // :3470
          await era.printAndWait(
            `「啊啊呜…啊…看啊…${sc()}的屁股…魔王大人的整根肉棒都插进去了…${heart(1)}」`,
          ); // :3471
          await era.printAndWait(
            `${target_name}炫耀似的展开双腿上下摇动着身体感受肛门的触觉。`,
          ); // :3472
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            // :3474
            await era.printAndWait(
              `「呜哈…哈啊啊啊啊${heart(1)} 屁股已经把肉棒“吃掉”了${heart(1)}」`,
            ); // :3474
          } // :3474
        } else {
          // :3474-3475
          await era.printAndWait(
            `「屁股…呜啊${heart(1)}…哇啊啊啊…${heart(1)}」`,
          ); // :3476
          await era.printAndWait(
            `${target_name}主动摆动腰部迎合，开心地品尝着这滋味。`,
          ); // :3477
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            // :3479
            await era.printAndWait(
              `「呜啊啊啊…哈啊…屁股${heart(1)} 快融化啦${heart(1)}」`,
            ); // :3479
          } // :3479
        } // :3479-3480
        // CFLAG:337  = 6（变量语义：CFLAG 族，337） // :3481
        kojo.骑乘位肛交 = 6; // :3481
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.骑乘位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3483
        await era.printAndWait(
          `「呜…啊啊…别、别那么粗暴…啊啊…啊啊啊啊…不、不要全都插进去…呜哈啊！」`,
        ); // :3484
        await era.printAndWait(
          `${player_name}抓住${target_name}的腰把阴茎顶在肛门上，强行插了进去………`,
        ); // :3485
        // CFLAG:337  = 5（变量语义：CFLAG 族，337） // :3486
        kojo.骑乘位肛交 = 5; // :3486
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3488
        if (rand_n(3) === 0) {
          // :3489
          await era.printAndWait(
            `${target_name}咬紧牙关带着屈辱的表情摇动着腰。`,
          ); // :3490
          await era.printAndWait(
            `「哈啊…呜…啊啊啊…${sc()}的屁股…会让你这种废物舒服吗…唔啊啊！」`,
          ); // :3491
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            // :3492
            await era.printAndWait(
              `但${player_name}腰部的耸动让面带厌恶的${target_name}发出了愉悦淫靡的呻吟声。`,
            ); // :3493
            await era.printAndWait(
              `「怎么会！？啊、哈啊、怎么…停下来…这种恶心的呜呜呜呜啊啊啊♪ 呜…哈啊啊…呜…啊啊啊」`,
            ); // :3494
            await era.printAndWait(
              `坐在${player_name}身上的${target_name}尽管充满了反抗的欲望，但那开发过的身体传来的快感让她不由自主地迎合索求浪叫着………`,
            ); // :3495
          } // :3495-3496
        } else if (rand_n(2) === 0) {
          // :3497
          await era.printAndWait(
            `「${scf()}、${sc()}的身体…啊啊…啊呜啊…哇啊啊…怎么会用来取悦…你这样的人渣…啊啊啊！」`,
          ); // :3498
          await era.printAndWait(
            `${target_name}不由自主地扭动腰部，屁股忠实地为${player_name}服务着。`,
          ); // :3499
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            // :3500
            await era.printAndWait(
              `${target_name}痛骂的声音越来越大，可她的腰肢也越来越柔软无力。`,
            ); // :3501
            await era.printAndWait(
              `「如同深渊臭虫的男人！这、这样的肉棒…${sc()}…啊啊啊去死吧去死吧去死啊！」`,
            ); // :3502
            await era.printAndWait(
              `「…啊呜…呜啊啊啊！？…死啊…去死吧…啊…啊啊啊…啊啊啊啊啊…别插了我要去了啊啊啊！」`,
            ); // :3503
          } // :3503-3504
        } else {
          // :3505-3506
          await era.printAndWait(
            `${target_name}柔软而久经调教的尻穴被${player_name}的阴茎狠狠侵犯着，发出悲鸣。`,
          ); // :3506
          await era.printAndWait(
            `「啊哈…呜…呜啊…渣滓…住、住手…恶心的家伙…${scf()}、${sc()}…已经…呜啊啊啊！」`,
          ); // :3507
          if ((era.get(`talent:${target}:77`) || 0) === 1) {
            // :3508
            await era.printAndWait(
              `随着抽插${target_name}嘴中开始溢出淫靡的呻吟。`,
            ); // :3509
            await era.printAndWait(
              `「啊啊啊…啊啊…呜哇…哈呜…不、不要…住手…啊、啊啊屁股变得奇怪了！」`,
            ); // :3510
          } // :3510-3511
        } // :3512-3513
        // CFLAG:337  = 4（变量语义：CFLAG 族，337） // :3513
        kojo.骑乘位肛交 = 4; // :3513
      } else if (
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :3515
        await era.printAndWait(
          `「啊啊…哈呜…呜…啊…继续…就这样动……啊呜♪…呜呼………」`,
        ); // :3516
        await era.printAndWait(
          `${target_name}久经开发的尻穴轻易将${player_name}的阴茎吞入，轻松地说笑着纠缠起来………`,
        ); // :3517
        // CFLAG:337  = 3（变量语义：CFLAG 族，337） // :3518
        kojo.骑乘位肛交 = 3; // :3518
      } else if (kojo.骑乘位肛交 <= 1 || game.kojo.口上开关 === 2) {
        // :3520
        await era.printAndWait(
          `「让我做这样的事…什么嘛…啊呜…搞什么鬼啊…哈啊啊啊…！」`,
        ); // :3521
        await era.printAndWait(
          `${player_name}抓住${target_name}的腰把阴茎顶在肛门上，强行插了进去………`,
        ); // :3522
        // CFLAG:337  = 2（变量语义：CFLAG 族，337） // :3523
        kojo.骑乘位肛交 = 2; // :3523
      } // :3523-3524
      return 0; // :3523-3525
    } // :3523-3526
  } // :3527-3530

  if (era_flag.selectcom === 37) {
    // :3532

    if (kojo.肛门侍奉 === 0) {
      // :3534

      if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        // :3536
        await era.printAndWait(`「啊啊…哈啊…呜呜咕噜…呜哈啊…呜咕………」`); // :3537
        await era.printAndWait(`${target_name}眼中含泪，顺从地继续着服务………`); // :3538
      } else {
        // :3540-3541
        await era.printAndWait(
          `「诶…怎么…怎么对我做这样的事情…呜…停、停下…别贴着我啊…啊呜呜呜！？」`,
        ); // :3541
        await era.printAndWait(`${target_name}眼中含泪，无奈地继续着服务………`); // :3542
      } // :3542-3543
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338） // :3544
      kojo.肛门侍奉 = 1; // :3544
      return 0; // :3544-3545
    } else {
      // :3547-3548

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3549
        await era.printAndWait(`「啊啊呜…魔王大人的菊花呢${heart(1)}」`); // :3550
        await era.printAndWait(
          `${target_name}带着淫猥的笑容细心地舔舐着肛门上每一条褶皱的纹路………`,
        ); // :3551
        // CFLAG:338  = 5（变量语义：CFLAG 族，338） // :3552
        kojo.肛门侍奉 = 5; // :3552
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3554
        await era.printAndWait(`「魔王大人的肛门…真是…诱人呢…${heart(1)}」`); // :3555
        await era.print(
          `${target_name}带着陶醉表情的舔舐使${player_name}肛门放松下来………`,
        ); // :3556
        // CFLAG:338  = 4（变量语义：CFLAG 族，338） // :3557
        kojo.肛门侍奉 = 4; // :3557
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3559
        await era.printAndWait(
          `「喂！舔你这种肮脏的混蛋的屁股什么的…太…太可怕了…绝对…绝不可能…呜哈啊啊…呜咕咕」`,
        ); // :3560
        await era.printAndWait(`${target_name}眼中含泪，粗暴地继续着服务………`); // :3561
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :3563
        await era.printAndWait(
          `「啊啊…呜啊…呜呜呜哈啊…啊呜…哈啊…啊啊啊啊………」`,
        ); // :3564
        await era.printAndWait(`${target_name}流着泪用嘴巴服务着………`); // :3565
        // CFLAG:338  = 3（变量语义：CFLAG 族，338） // :3566
        kojo.肛门侍奉 = 3; // :3566
      } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 === 2) {
        // :3568
        await era.printAndWait(
          `「诶…怎么…怎么对我做这样的事情…呜…停、停下…别贴着我啊…啊呜呜呜！？」`,
        ); // :3569
        await era.printAndWait(`${target_name}眼中含泪，无奈地继续着服务………`); // :3570
        // CFLAG:338  = 2（变量语义：CFLAG 族，338） // :3571
        kojo.肛门侍奉 = 2; // :3571
      } // :3571-3572
      return 0; // :3571-3573
    } // :3571-3574
  } // :3575-3578

  if (era_flag.selectcom === 40) {
    // :3580

    if (kojo.打屁股 === 0) {
      // :3582
      await era.printAndWait(`「住、住手…别打了…！」`); // :3583
      // CFLAG:TARGET:341  = 1（变量语义：CFLAG 族，TARGET:341） // :3584
      kojo.打屁股 = 1; // :3584
      return 0; // :3584-3585
    } else {
      // :3587-3588

      if (view.chara.特别服装类型 === 11 && view.train.着衣状态 & 64) {
        // :3589-3590
        return 0; // :3589-3590
      } // :3589-3590

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.打屁股 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3592
        await era.printAndWait(`「哈啊♪　请继续！　更严酷地惩罚${sc()}吧！」`); // :3593
        await era.printAndWait(
          `${target_name}边被打边发出娇弱的呻吟，很明显可以发现她的下体已经一片春情………`,
        ); // :3594
        // CFLAG:TARGET:341  = 6（变量语义：CFLAG 族，TARGET:341） // :3595
        kojo.打屁股 = 6; // :3595
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.打屁股 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3597
        await era.printAndWait(`「对不起！　对不起！　对……呜呜呜呜♪」`); // :3598
        await era.printAndWait(
          `${target_name}被拍打着屁股的同时，呻吟声越来越淫靡艳丽………`,
        ); // :3599
        // CFLAG:TARGET:341  = 5（变量语义：CFLAG 族，TARGET:341） // :3600
        kojo.打屁股 = 5; // :3600
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (kojo.打屁股 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3602
        await era.printAndWait(
          `「呜啊！喂！畜生！这样打我的屁股…啊啊啊！你这暴力的蛆虫！」`,
        ); // :3603
        await era.printAndWait(
          `${player_name}将${target_name}跪放在自己的膝盖上打着屁股，尽情地发泄着欲望………`,
        ); // :3604
        // CFLAG:TARGET:341  = 4（变量语义：CFLAG 族，TARGET:341） // :3605
        kojo.打屁股 = 4; // :3605
      } else if (
        (era.get(`mark:${target}:0`) || 0) === 3 &&
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.打屁股 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :3607
        await era.printAndWait(
          `「哇啊啊…再、再也不会反抗你啦…好痛……好痛啊！～！」`,
        ); // :3608
        await era.printAndWait(
          `${target_name}老实地被${player_name}击打着屁股，像是一只小狗一样………`,
        ); // :3609
        // CFLAG:TARGET:341  = 3（变量语义：CFLAG 族，TARGET:341） // :3610
        kojo.打屁股 = 3; // :3610
      } else if (kojo.打屁股 <= 1 && game.kojo.口上开关 === 2) {
        // :3612
        await era.printAndWait(
          `「呜…哈啊…为什么…对我做这种像管教孩子一样的事情啊…哈呜！」`,
        ); // :3613
        await era.printAndWait(
          `${player_name}拍打着${target_name}的屁股使她发出惨叫………`,
        ); // :3614
        // CFLAG:TARGET:341  = 2（变量语义：CFLAG 族，TARGET:341） // :3615
        kojo.打屁股 = 2; // :3615
      } // :3615-3616
      return 0; // :3615-3617
    } // :3615-3618
  } // :3619-3622

  if (era_flag.selectcom === 41) {
    // :3624

    if (kojo.鞭 === 0) {
      // :3626

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :3628
        await era.printAndWait(
          `「啊啊啊…舞着鞭子像对待母猪一样对待${sc()}吧${heart(1)}」`,
        ); // :3629
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :3631
        await era.printAndWait(
          `「啊啊…${sc()}是…是坏孩子…所以…才会被鞭打吧…${heart(1)}」`,
        ); // :3632
      } else {
        // :3634-3635
        await era.printAndWait(`「住…住手…很痛的啊混蛋！」`); // :3635
      } // :3635-3636
      // CFLAG:TARGET:342  = 1（变量语义：CFLAG 族，TARGET:342） // :3637
      kojo.鞭 = 1; // :3637
      return 0; // :3637-3638
    } else {
      // :3640-3641

      if (view.chara.特别服装类型 === 11 && view.train.着衣状态 & 64) {
        // :3642-3643
        return 0; // :3642-3643
      } // :3642-3643

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.鞭 <= 9 || game.kojo.口上开关 === 2)
      ) {
        // :3645
        await era.printAndWait(
          `「哈诶♪	啊啊啊♪　${sc()}我是一碰到鞭子就兴奋的变态母猪奴隶♪　嘎啊♪」`,
        ); // :3646
        await era.printAndWait(
          `${target_name}在鞭下十分兴奋，像是发情的母猪一样浪叫着。`,
        ); // :3647
        await era.printAndWait(
          `落在伤痕累累屁股上的鞭打使${target_name}发出了越来越大的呻吟………`,
        ); // :3648
        // CFLAG:TARGET:342  = 10（变量语义：CFLAG 族，TARGET:342） // :3649
        kojo.鞭 = 10; // :3649
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.鞭 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :3651
        await era.printAndWait(
          `「啊啊啊啊啊啊！　还想要更多！　请您惩罚，下贱的肉奴隶吧！」`,
        ); // :3652
        await era.printAndWait(
          `${target_name}在鞭下十分兴奋，红肿的屁股四下摇摆着索求着什么………`,
        ); // :3653
        // CFLAG:TARGET:342  = 9（变量语义：CFLAG 族，TARGET:342） // :3654
        kojo.鞭 = 9; // :3654
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.鞭 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :3656
        await era.printAndWait(
          `「啊呜…啊啊啊…${sc()}是魔王大人养的猪猡……哈哇啊啊啊啊！」`,
        ); // :3657
        await era.printAndWait(
          `${target_name}细嫩肌肤暴露在在鞭下，高亢的惨叫使${player_name}十分愉悦………`,
        ); // :3658
        // CFLAG:TARGET:342  = 8（变量语义：CFLAG 族，TARGET:342） // :3659
        kojo.鞭 = 8; // :3659
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.鞭 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :3661
        await era.printAndWait(
          `「对不起！　对不起！　${sc()}是头下贱的母猪！　所以请惩罚我吧♪」`,
        ); // :3662
        await era.printAndWait(
          `${target_name}脸部因为兴奋而扭曲，双脚磨蹭着，在${player_name}鞭下喜悦的承受着………`,
        ); // :3663
        // CFLAG:TARGET:342  = 7（变量语义：CFLAG 族，TARGET:342） // :3664
        kojo.鞭 = 7; // :3664
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.鞭 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3666
        await era.printAndWait(`「对不起！对不起…呜哈啊♪」`); // :3667
        await era.printAndWait(
          `${target_name}的娇声呻吟中${player_name}继续着鞭打………`,
        ); // :3668
        // CFLAG:TARGET:342  = 6（变量语义：CFLAG 族，TARGET:342） // :3669
        kojo.鞭 = 6; // :3669
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.鞭 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3671
        await era.printAndWait(`「${scf()}、${sc()}…难道做错了什么吗…啊啊！」`); // :3672
        await era.printAndWait(
          `${target_name}细嫩的肌肤被鞭子打击着发出高亢的惨叫………`,
        ); // :3673
        // CFLAG:TARGET:342  = 5（变量语义：CFLAG 族，TARGET:342） // :3674
        kojo.鞭 = 5; // :3674
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (kojo.打屁股 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3676
        await era.printAndWait(
          `「呜…哈啊！…你这个变态冷血的施虐狂！对你来说女人就像是不用在乎的牲畜一样的东西吗……啊！…哈啊…呜呜呜啊啊啊！」`,
        ); // :3677
        await era.printAndWait(
          `鞭打持续着、作为对${target_name}这样强烈反抗心的一种回应，调教更加激烈地进行着………`,
        ); // :3678
        // CFLAG:TARGET:342  = 4（变量语义：CFLAG 族，TARGET:342） // :3679
        kojo.鞭 = 4; // :3679
      } else if (
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.鞭 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :3681
        await era.printAndWait(
          `「呜…啊啊…啊哈…这已经算是…呜…很残酷的事情了吧…啊啊啊！」`,
        ); // :3682
        await era.printAndWait(
          `${target_name}被鞭打的时候夹杂着一点愉悦的叫声………`,
        ); // :3683
        // CFLAG:TARGET:342  = 3（变量语义：CFLAG 族，TARGET:342） // :3684
        kojo.鞭 = 3; // :3684
      } else if (kojo.鞭 <= 1 || game.kojo.口上开关 === 2) {
        // :3686
        await era.printAndWait(
          `「停，停下…居然对${sc()}做出这样的事情…哈…啊呜呜呜！」`,
        ); // :3687
        await era.printAndWait(
          `${target_name}嘴里的嘟哝被听到了，所以鞭子的击打持续着………`,
        ); // :3688
        // CFLAG:TARGET:342  = 2（变量语义：CFLAG 族，TARGET:342） // :3689
        kojo.鞭 = 2; // :3689
      } // :3689-3690
      return 0; // :3689-3691
    } // :3689-3692
  } // :3693-3696

  if (era_flag.selectcom === 42) {
    // :3698

    if (kojo.针 === 0) {
      // :3700

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :3702
        await era.printAndWait(
          `「啊哈呜！啊啊啊…像淫乱的母猪一样的${sc()}越痛越想被主人狠狠的操弄啊…${heart(1)}」`,
        ); // :3703
        await era.printAndWait(`${target_name}几次被针刺中，到处都在流血………`); // :3704
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :3706
        await era.printAndWait(
          `「啊啊啊…对不起，对不起呜呜…是${sc()}做了什么坏事的惩罚吗！」`,
        ); // :3707
        await era.printAndWait(`${target_name}几次被针刺中，到处都在流血………`); // :3708
      } else {
        // :3710-3711
        await era.printAndWait(
          `「啊喂！…用那样的针在${sc()}身上…可怕啊！住手你这人渣…！」`,
        ); // :3711
        await era.printAndWait(`${target_name}几次被针刺中，到处都在流血………`); // :3712
      } // :3712-3713
      // CFLAG:TARGET:343  = 1（变量语义：CFLAG 族，TARGET:343） // :3714
      kojo.针 = 1; // :3714
      return 0; // :3714-3715
    } else {
      // :3717-3718

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.针 <= 9 || game.kojo.口上开关 === 2)
      ) {
        // :3719
        await era.printAndWait(
          `「啊啊…啊${heart(1)}…哈啊啊…那里…那里终于…有了一点带痛的快感了呢…啊啊呜${heart(1)}」`,
        ); // :3720
        await era.printAndWait(
          `${target_name}柔软的肌肤被针几次刺中，反而愉悦得浪叫连连…………`,
        ); // :3721
        // CFLAG:TARGET:343  = 10（变量语义：CFLAG 族，TARGET:343） // :3722
        kojo.针 = 10; // :3722
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.针 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :3724
        await era.printAndWait(
          `「啊呜呜…呜哈啊啊…老实说还可以刺的…更深一点哦」`,
        ); // :3725
        await era.printAndWait(
          `${target_name}柔软的肌肤被针几次刺中，反而兴奋得浪叫连连………`,
        ); // :3726
        // CFLAG:TARGET:343  = 9（变量语义：CFLAG 族，TARGET:343） // :3727
        kojo.针 = 9; // :3727
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.针 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :3729
        await era.printAndWait(
          `「啊哈呜！啊啊啊…像淫乱的母猪一样的${sc()}越痛越想被主人狠狠的操弄啊…${heart(1)}」`,
        ); // :3730
        await era.printAndWait(`${target_name}几次被针刺中，到处都在流血………`); // :3731
        // CFLAG:TARGET:343  = 8（变量语义：CFLAG 族，TARGET:343） // :3732
        kojo.针 = 8; // :3732
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.针 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :3734
        await era.printAndWait(
          `「啊啊啊…更冷酷地处罚${sc()}吧…乳头…或者小穴…都可以用针刺啊${heart(1)}」`,
        ); // :3735
        await era.printAndWait(
          `${target_name}似乎已经习惯了被刺的痛苦，想要挑战更敏感的地方………`,
        ); // :3736
        // CFLAG:TARGET:343  = 7（变量语义：CFLAG 族，TARGET:343） // :3737
        kojo.针 = 7; // :3737
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.针 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3739
        await era.printAndWait(
          `「啊啊啊…啊啊呜…快…快来更用力地刺我吧…${heart(1)}」`,
        ); // :3740
        await era.printAndWait(`${target_name}眼神空洞地催促着………`); // :3741
        // CFLAG:TARGET:343  = 6（变量语义：CFLAG 族，TARGET:343） // :3742
        kojo.针 = 6; // :3742
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.针 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3744
        await era.printAndWait(
          `「啊啊啊…对不起，对不起呜呜…是${sc()}做了什么坏事的惩罚吗！」`,
        ); // :3745
        await era.printAndWait(`${target_name}几次被针刺中，到处都在流血………`); // :3746
        // CFLAG:TARGET:343  = 5（变量语义：CFLAG 族，TARGET:343） // :3747
        kojo.针 = 5; // :3747
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (kojo.针 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3749
        await era.printAndWait(
          `「你这…变态的施虐狂！…呜…哇啊！…怎么能…怎么能这样…哇啊啊啊！」`,
        ); // :3750
        await era.printAndWait(
          `${player_name}在如同五月苍蝇般叫嚷着的${target_name}的乳头刺下一针，又拿起了新的针具………`,
        ); // :3751
        // CFLAG:TARGET:343  = 4（变量语义：CFLAG 族，TARGET:343） // :3752
        kojo.针 = 4; // :3752
      } else if (
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.针 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :3754
        await era.printAndWait(
          `「啊啊…啊啊…那样的针…快扎在${sc()}的身体上吧…等不及了啊！」`,
        ); // :3755
        await era.printAndWait(`${target_name}被针几次刺中发出可爱的惨叫声………`); // :3756
        // CFLAG:TARGET:343  = 3（变量语义：CFLAG 族，TARGET:343） // :3757
        kojo.针 = 3; // :3757
      } else if (kojo.针 <= 1 || game.kojo.口上开关 === 2) {
        // :3759
        await era.printAndWait(
          `「啊喂！…用那样的针在${sc()}身上…可怕啊！住手你这人渣…！」`,
        ); // :3760
        await era.printAndWait(`${target_name}几次被针刺中，到处都在流血………`); // :3761
        // CFLAG:TARGET:343  = 2（变量语义：CFLAG 族，TARGET:343） // :3762
        kojo.针 = 2; // :3762
      } // :3762-3763
      return 0; // :3762-3764
    } // :3762-3765
  } // :3766-3769

  if (era_flag.selectcom === 43 && era.get(`tequip:${target}:43`)) {
    // :3772

    if (kojo.眼罩 === 0) {
      // :3774

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :3776
        await era.printAndWait(
          `「哈啊哈啊…就是这样，对${sc()}做些乱七八糟的事情吧………${heart(1)}」`,
        ); // :3777
        await era.printAndWait(`${target_name}老实地等待着………`); // :3778
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :3780
        await era.printAndWait(`「看不到魔王大人的脸的话会很困恼诶………」`); // :3781
        await era.printAndWait(`${target_name}噘着嘴唇老实地戴上了眼罩………`); // :3782
      } else {
        // :3784-3785
        await era.printAndWait(`「住…住手…这之后…打算做更过分的事情吧…！」`); // :3785
        await era.printAndWait(
          `${target_name}摇着头但还是被粗暴地戴上了眼罩………`,
        ); // :3786
      } // :3786-3787
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344） // :3788
      kojo.眼罩 = 1; // :3788
      return 0; // :3788-3789
    } else {
      // :3791-3792

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.眼罩 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :3793
        await era.printAndWait(
          `「哈啊哈啊…就是这样，对${sc()}做些乱七八糟的事情吧………${heart(1)}」`,
        ); // :3794
        await era.printAndWait(`${target_name}老实地等待着………`); // :3795
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344） // :3796
        kojo.眼罩 = 9; // :3796
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.眼罩 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :3798
        await era.printAndWait(
          `「哈啊哈啊…就是这样，对${sc()}做些乱七八糟的事情吧………${heart(1)}」`,
        ); // :3799
        await era.printAndWait(`${target_name}老实地等待着………`); // :3800
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344） // :3801
        kojo.眼罩 = 8; // :3801
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.眼罩 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :3803
        await era.printAndWait(
          `「哈啊哈啊…就是这样，对${sc()}做些乱七八糟的事情吧………${heart(1)}」`,
        ); // :3804
        await era.printAndWait(`${target_name}老实地等待着………`); // :3805
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344） // :3806
        kojo.眼罩 = 7; // :3806
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.眼罩 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3808
        await era.printAndWait(`「啊啊…有点忐忑呢………${heart(1)}」`); // :3809
        await era.printAndWait(`${target_name}期待地伸出舌头等待着………`); // :3810
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344） // :3811
        kojo.眼罩 = 6; // :3811
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.眼罩 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3813
        await era.printAndWait(`「啊啊…有点忐忑呢………${heart(1)}」`); // :3814
        await era.printAndWait(`${target_name}期待地伸出舌头等待着………`); // :3815
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344） // :3816
        kojo.眼罩 = 5; // :3816
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.眼罩 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3818
        await era.printAndWait(`「看不到魔王大人的脸的话会很困恼诶………」`); // :3819
        await era.printAndWait(`${target_name}噘着嘴唇老实地戴上了眼罩………`); // :3820
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344） // :3821
        kojo.眼罩 = 4; // :3821
      } else if (
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.眼罩 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :3823
        await era.printAndWait(`「要做什么奇怪的事情吗………啊啊………」`); // :3824
        await era.printAndWait(
          `${target_name}只是轻微地抵抗了一下就老实地戴上了眼罩………`,
        ); // :3825
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344） // :3826
        kojo.眼罩 = 3; // :3826
      } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 === 2) {
        // :3828
        await era.printAndWait(`「住…住手…这之后…打算做更过分的事情吧…！」`); // :3829
        await era.printAndWait(
          `${target_name}摇着头但还是被粗暴地戴上了眼罩………`,
        ); // :3830
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344） // :3831
        kojo.眼罩 = 2; // :3831
      } // :3831-3832
      return 0; // :3831-3833
    } // :3834-3836
  } else if (
    era_flag.selectcom === 43 &&
    era.get(`tequip:${target}:43`) === 0
  ) {
    // :3836

    if (
      (era.get(`talent:${target}:76`) || 0) === 1 &&
      (kojo.眼罩着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // :3838
      await era.printAndWait(`「这样就取下来了吗………？」`); // :3839
      // CFLAG:380  = 3（变量语义：CFLAG 族，380） // :3840
      kojo.眼罩着脱 = 3; // :3840
    } else if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (kojo.眼罩着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :3842
      await era.printAndWait(`「哈啊哈啊………」`); // :3843
      // CFLAG:380  = 2（变量语义：CFLAG 族，380） // :3844
      kojo.眼罩着脱 = 2; // :3844
    } else if (kojo.眼罩着脱 < 1 || game.kojo.口上开关 === 2) {
      // :3846
      await era.printAndWait(`「总算取下来了………」`); // :3847
      // CFLAG:380  = 1（变量语义：CFLAG 族，380） // :3848
      kojo.眼罩着脱 = 1; // :3848
    } // :3848-3849
    return 0; // :3848-3850
  } // :3848-3851

  if (era_flag.selectcom === 44 && era.get(`tequip:${target}:44`)) {
    // :3857

    if (kojo.绳子 === 0) {
      // :3859

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :3861
        await era.printAndWait(
          `「啊啊呜…这种被紧紧绑住的痛苦…小穴都湿了呢…${heart(1)}」`,
        ); // :3862
        await era.printAndWait(`${target_name}美丽的肌肤被绳子勒得通红………`); // :3863
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :3865
        await era.printAndWait(`「哈啊哈啊…啊啊啊…感觉很兴奋呢…${heart(1)}」`); // :3866
        await era.printAndWait(`${target_name}美丽的肌肤被绳子勒得通红………`); // :3867
      } else {
        // :3869-3870
        await era.printAndWait(`「喂！住手…停手啊！这样也太粗暴了！」`); // :3870
        await era.printAndWait(`${target_name}被绳子绑了个严严实实………`); // :3871
      } // :3871-3872
      // CFLAG:TARGET:345  = 1（变量语义：CFLAG 族，TARGET:345） // :3873
      kojo.绳子 = 1; // :3873
      return 0; // :3873-3874
    } else {
      // :3876-3877

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.绳子 <= 9 || game.kojo.口上开关 === 2)
      ) {
        // :3878
        await era.printAndWait(
          `「啊啊啊…要高潮了啊啊…还可以更紧一点…把${sc()}绑紧…${heart(1)}」`,
        ); // :3879
        await era.printAndWait(`${target_name}美丽的肌肤被绳子勒得通红………`); // :3880
        // CFLAG:TARGET:345  = 10（变量语义：CFLAG 族，TARGET:345） // :3881
        kojo.绳子 = 10; // :3881
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.绳子 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :3883
        await era.printAndWait(
          `「啊啊啊…居然、居然高潮了…在这样的束缚下…${heart(1)}」`,
        ); // :3884
        await era.printAndWait(`${target_name}美丽的肌肤被绳子勒得通红………`); // :3885
        // CFLAG:TARGET:345  = 9（变量语义：CFLAG 族，TARGET:345） // :3886
        kojo.绳子 = 9; // :3886
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.绳子 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :3888
        await era.printAndWait(
          `「啊啊呜…这种被紧紧绑住的痛苦…小穴都湿了呢…${heart(1)}」`,
        ); // :3889
        await era.printAndWait(`${target_name}美丽的肌肤被绳子勒得通红………`); // :3890
        // CFLAG:TARGET:345  = 8（变量语义：CFLAG 族，TARGET:345） // :3891
        kojo.绳子 = 8; // :3891
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.绳子 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :3893
        await era.printAndWait(
          `「啊啊啊…只有被绳子绑住的时候才会高潮………${heart(1)}」`,
        ); // :3894
        await era.printAndWait(`${target_name}美丽的肌肤被绳子勒得通红………`); // :3895
        // CFLAG:TARGET:345  = 7（变量语义：CFLAG 族，TARGET:345） // :3896
        kojo.绳子 = 7; // :3896
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.绳子 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3898
        await era.printAndWait(`「啊啊啊…绑得更紧一点………${heart(1)}」`); // :3899
        await era.printAndWait(`${target_name}美丽的肌肤被绳子勒得通红………`); // :3900
        // CFLAG:TARGET:345  = 6（变量语义：CFLAG 族，TARGET:345） // :3901
        kojo.绳子 = 6; // :3901
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.绳子 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3903
        await era.printAndWait(`「哈啊哈啊…啊啊啊…感觉很兴奋呢…${heart(1)}」`); // :3904
        await era.printAndWait(`${target_name}美丽的肌肤被绳子勒得通红………`); // :3905
        // CFLAG:TARGET:345  = 5（变量语义：CFLAG 族，TARGET:345） // :3906
        kojo.绳子 = 5; // :3906
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`mark:${target}:3`) || 0) >= 2 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (kojo.绳子 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3908
        await era.printAndWait(
          `「住…住手…对${sc()}做这样的事情…住手啊！绳子、陷进去了！很痛诶！」`,
        ); // :3909
        await era.printAndWait(
          `${target_name}被${player_name}粗暴地制住，用绳子紧紧绑着………`,
        ); // :3910
        // CFLAG:TARGET:345  = 4（变量语义：CFLAG 族，TARGET:345） // :3911
        kojo.绳子 = 4; // :3911
      } else if (
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.绳子 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :3913
        await era.printAndWait(`「啊啊…绳子陷进皮肤了…啊啊！」`); // :3914
        await era.printAndWait(
          `${target_name}被束缚住的时候意外的老实、呼吸粗重………`,
        ); // :3915
        // CFLAG:TARGET:345  = 3（变量语义：CFLAG 族，TARGET:345） // :3916
        kojo.绳子 = 3; // :3916
      } else if (kojo.绳子 <= 1 || game.kojo.口上开关 === 2) {
        // :3918
        await era.printAndWait(`「喂！住手…停手啊！这样也太粗暴了！」`); // :3919
        await era.printAndWait(`${target_name}被绳子绑了个严严实实………`); // :3920
        // CFLAG:TARGET:345  = 2（变量语义：CFLAG 族，TARGET:345） // :3921
        kojo.绳子 = 2; // :3921
      } // :3921-3922
      return 0; // :3921-3923
    } // :3924-3926
  } else if (
    era_flag.selectcom === 44 &&
    era.get(`tequip:${target}:44`) === 0
  ) {
    // :3926

    if (
      (era.get(`talent:${target}:76`) || 0) === 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :3928
      await era.printAndWait(`「啊啊呜…被绑着什么的真是太棒了………」`); // :3929
      // CFLAG:385  = 2（变量语义：CFLAG 族，385） // :3930
      kojo.绳子着脱 = 2; // :3930
    } else if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :3932
      await era.printAndWait(`「啊啊…身上的痕迹很明显呢…${heart(1)}」`); // :3933
      // CFLAG:385  = 2（变量语义：CFLAG 族，385） // :3934
      kojo.绳子着脱 = 2; // :3934
    } else if (kojo.绳子着脱 < 1 || game.kojo.口上开关 === 2) {
      // :3936
      await era.printAndWait(`「哈啊哈啊…终于…解开了……」`); // :3937
      // CFLAG:385  = 1（变量语义：CFLAG 族，385） // :3938
      kojo.绳子着脱 = 1; // :3938
    } // :3938-3939
    return 0; // :3938-3940
  } // :3938-3941

  if (era_flag.selectcom === 45 && era.get(`tequip:${target}:45`)) {
    // :3947

    if (kojo.口塞 === 0) {
      // :3949

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :3951
        await era.printAndWait(`「呜呼…呜啊…呜啊${heart(1)}」`); // :3952
        await era.print(`配合地戴上口塞的${target_name}带着期待`); // :3953
        if (era.get(`tequip:${target}:43`)) {
          // :3954
          await era.print(`地晃动着………`); // :3955
        } else {
          // :3955-3956
          await era.print(`${player_name}………`); // :3957
        } // :3957-3958
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :3960
        await era.printAndWait(`「呜咕…呜…呼啊…${heart(1)}」`); // :3961
        await era.print(`配合地戴上口塞的${target_name}带着温柔的眼神`); // :3962
        if (era.get(`tequip:${target}:43`)) {
          // :3963
          await era.print(`晃动着………`); // :3964
        } else {
          // :3964-3965
          await era.print(`看着${player_name}………`); // :3966
        } // :3966-3967
      } else {
        // :3969-3970
        await era.printAndWait(`「啊、这、这样吗…嘴里…呜…呜咕噜…………」`); // :3970
        await era.print(`戴上口塞的${target_name}`); // :3971
        if (era.get(`tequip:${target}:43`)) {
          // :3972
          await era.print(`左右摇着头………`); // :3973
        } else {
          // :3973-3974
          await era.print(`瞪着你………`); // :3975
        } // :3975-3976
      } // :3977
      // CFLAG:TARGET:346  = 1（变量语义：CFLAG 族，TARGET:346） // :3978
      kojo.口塞 = 1; // :3978
      return 0; // :3978-3979
    } else {
      // :3981-3982

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.口塞 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :3983
        await era.printAndWait(`「呼啊…呜啊…呜啊${heart(1)}」`); // :3984
        await era.print(`配合地戴上口塞的${target_name}粗重急促地喘息`); // :3985
        if (era.get(`tequip:${target}:43`)) {
          // :3986
          await era.print(`着………`); // :3987
        } else {
          // :3987-3988
          await era.print(`着，眼中闪耀着畅快淋漓的神色………`); // :3989
        } // :3989-3990
        // CFLAG:TARGET:346  = 9（变量语义：CFLAG 族，TARGET:346） // :3991
        kojo.口塞 = 9; // :3991
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.口塞 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :3993
        await era.printAndWait(`「呜呼…呜啊…呜啊${heart(1)}」`); // :3994
        await era.printAndWait(
          `配合地戴上口塞的${target_name}粗重急促地喘息着………`,
        ); // :3995
        // CFLAG:TARGET:346  = 8（变量语义：CFLAG 族，TARGET:346） // :3996
        kojo.口塞 = 8; // :3996
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.口塞 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :3998
        await era.printAndWait(`「呜呼…呜啊…呜啊${heart(1)}」`); // :3999
        await era.print(`配合地戴上口塞的${target_name}带着期待`); // :4000
        if (era.get(`tequip:${target}:43`)) {
          // :4001
          await era.print(`地晃动着………`); // :4002
        } else {
          // :4002-4003
          await era.print(`看着${player_name}………`); // :4004
        } // :4004-4005
        // CFLAG:TARGET:346  = 7（变量语义：CFLAG 族，TARGET:346） // :4006
        kojo.口塞 = 7; // :4006
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.口塞 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :4008
        await era.printAndWait(`「呜呼…呜…呜啊…${heart(1)}」`); // :4009
        await era.printAndWait(
          `配合地戴上口塞的${target_name}两腿摩擦着，露出放荡的神情………`,
        ); // :4010
        // CFLAG:TARGET:346  = 6（变量语义：CFLAG 族，TARGET:346） // :4011
        kojo.口塞 = 6; // :4011
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.口塞 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4013
        await era.printAndWait(`「哈啊…呜…呜啊…${heart(1)}」`); // :4014
        await era.printAndWait(`配合地戴上口塞的${target_name}两腿摩擦着………`); // :4015
        // CFLAG:TARGET:346  = 5（变量语义：CFLAG 族，TARGET:346） // :4016
        kojo.口塞 = 5; // :4016
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.口塞 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4018
        await era.printAndWait(`「呜咕…呜…呜啊…${heart(1)}」`); // :4019
        await era.printAndWait(
          `配合地戴上口塞的${target_name}用温柔的眼神凝视着${player_name}………`,
        ); // :4020
        // CFLAG:TARGET:346  = 4（变量语义：CFLAG 族，TARGET:346） // :4021
        kojo.口塞 = 4; // :4021
      } else if (
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.口塞 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :4023
        await era.printAndWait(`「呜啊…哈…哈………」`); // :4024
        await era.print(`${target_name}习以为常地被口塞塞住嘴`); // :4025
        if (era.get(`tequip:${target}:43`)) {
          // :4026
          await era.print(`眼色朦胧………`); // :4027
        } else {
          // :4027-4028
          await era.print(`看着${player_name}………`); // :4029
        } // :4029-4030
        // CFLAG:TARGET:346  = 3（变量语义：CFLAG 族，TARGET:346） // :4031
        kojo.口塞 = 3; // :4031
      } else if (kojo.口塞 <= 1 || game.kojo.口上开关 === 2) {
        // :4033
        await era.printAndWait(`「啊、这、这样吗…嘴里…呜…呜咕噜…………」`); // :4034
        await era.print(`戴上口塞的${target_name}`); // :4035
        if (era.get(`tequip:${target}:43`)) {
          // :4036
          await era.print(`左右摇着头………`); // :4037
        } else {
          // :4037-4038
          await era.print(`瞪着你………`); // :4039
        } // :4039-4040
        // CFLAG:TARGET:346  = 2（变量语义：CFLAG 族，TARGET:346） // :4041
        kojo.口塞 = 2; // :4041
      } // :4041-4042
      return 0; // :4041-4043
    } // :4044-4046
  } else if (
    era_flag.selectcom === 45 &&
    era.get(`tequip:${target}:45`) === 0
  ) {
    // :4046

    if (
      (era.get(`talent:${target}:76`) || 0) === 1 &&
      (kojo.口塞着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // :4048
      await era.printAndWait(`「呜啊…哈啊哈啊…」`); // :4049
      // CFLAG:386  = 3（变量语义：CFLAG 族，386） // :4050
      kojo.口塞着脱 = 3; // :4050
    } else if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (kojo.口塞着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :4052
      await era.printAndWait(`「呜啊…哈啊哈啊…」`); // :4053
      // CFLAG:386  = 2（变量语义：CFLAG 族，386） // :4054
      kojo.口塞着脱 = 2; // :4054
    } else if (kojo.口塞着脱 < 1 || game.kojo.口上开关 === 2) {
      // :4056
      await era.printAndWait(`「呜啊…哈啊哈啊…呼诶………」`); // :4057
      // CFLAG:386  = 1（变量语义：CFLAG 族，386） // :4058
      kojo.口塞着脱 = 1; // :4058
    } // :4058-4059
    return 0; // :4058-4060
  } // :4058-4061

  if (era_flag.selectcom === 46 && era.get(`tequip:${target}:46`)) {
    // :4067

    if (kojo.灌肠肛塞 === 0) {
      // :4069

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :4071
        await era.printAndWait(`「诶…哎呀…这样的话就全部都………！」`); // :4072
        await era.printAndWait(
          `或许是灌肠液浓度稍高的缘故，${target_name}捂着肚子痛苦地呻吟着………`,
        ); // :4073
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :4075
        await era.printAndWait(
          `「${scf()}…${sc()}…又没有便秘什么的…呜呜哈啊…肚子好难受！」`,
        ); // :4076
        await era.printAndWait(
          `或许是灌肠液浓度稍高的缘故，${target_name}捂着肚子痛苦地呻吟着………`,
        ); // :4077
      } else {
        // :4079-4080
        await era.printAndWait(`「哇啊啊！啊啊…热…肚子里好热…呜啊啊啊啊！」`); // :4080
        await era.printAndWait(
          `或许是灌肠液浓度稍高的缘故，${target_name}捂着肚子痛苦地呻吟着………`,
        ); // :4081
      } // :4081-4082
      // CFLAG:TARGET:347  = 1（变量语义：CFLAG 族，TARGET:347） // :4083
      kojo.灌肠肛塞 = 1; // :4083
      return 0; // :4083-4084
    } else {
      // :4086-4087

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.灌肠肛塞 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :4088
        await era.printAndWait(
          `「啊啊啊啊…在这样的情况下被人从前面干的话…会有多舒服呢…啊啊啊${heart(1)}」`,
        ); // :4089
        await era.printAndWait(
          `渗透进肠内的灌肠液不断刺激着${target_name}的肚子。${target_name}的屁股扭动着仿佛在向${player_name}求索什么………`,
        ); // :4090
        // CFLAG:347  = 8（变量语义：CFLAG 族，347） // :4091
        kojo.灌肠肛塞 = 8; // :4091
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.灌肠肛塞 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :4093
        await era.printAndWait(`「诶…哎呀…这样的话就全部都………！」`); // :4094
        await era.printAndWait(
          `或许是灌肠液浓度稍高的缘故，${target_name}捂着肚子痛苦地呻吟着………`,
        ); // :4095
        // CFLAG:347  = 7（变量语义：CFLAG 族，347） // :4096
        kojo.灌肠肛塞 = 7; // :4096
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.灌肠肛塞 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :4098
        await era.printAndWait(
          `「啊啊啊啊啊…想、想要做爱…已经…无法忍受了…哈啊…想被狠狠插进来………${heart(1)}」`,
        ); // :4099
        await era.printAndWait(
          `渗透进肠内的灌肠液不断刺激着${target_name}的肚子。${target_name}的屁股扭动着仿佛在向${player_name}求索什么………`,
        ); // :4100
        // CFLAG:347  = 6（变量语义：CFLAG 族，347） // :4101
        kojo.灌肠肛塞 = 6; // :4101
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.灌肠肛塞 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4103
        await era.printAndWait(
          `「${scf()}…${sc()}…又没有便秘什么的…呜呜哈啊…肚子好难受！」`,
        ); // :4104
        await era.printAndWait(
          `或许是灌肠液浓度稍高的缘故，${target_name}捂着肚子痛苦地呻吟着………`,
        ); // :4105
        // CFLAG:347  = 5（变量语义：CFLAG 族，347） // :4106
        kojo.灌肠肛塞 = 5; // :4106
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (kojo.灌肠肛塞 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4108
        await era.printAndWait(
          `「啊啊啊啊…呜…哈啊…好痛…哇呜呜呜啊…好痛啊啊啊啊！」`,
        ); // :4109
        await era.printAndWait(
          `由于灌肠液的浓度已经到了极限，${target_name}脸色铁青万分痛苦地痛叫起来………`,
        ); // :4110
        // CFLAG:347  = 4（变量语义：CFLAG 族，347） // :4111
        kojo.灌肠肛塞 = 4; // :4111
      } else if (
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.灌肠肛塞 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :4113
        await era.printAndWait(`「啊啊啊啊…肚子…咕噜噜噜地响了…啊啊啊♪」`); // :4114
        await era.printAndWait(
          `渗透进肠内的灌肠液不断刺激着${target_name}的肚子………`,
        ); // :4115
        // CFLAG:347  = 3（变量语义：CFLAG 族，347） // :4116
        kojo.灌肠肛塞 = 3; // :4116
      } else if (kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 === 2) {
        // :4118
        await era.printAndWait(`「哇啊啊！啊啊…热…肚子里好热…呜啊啊啊啊！」`); // :4119
        await era.printAndWait(
          `或许是灌肠液浓度稍高的缘故，${target_name}捂着肚子痛苦地呻吟着………`,
        ); // :4120
        // CFLAG:347  = 2（变量语义：CFLAG 族，347） // :4121
        kojo.灌肠肛塞 = 2; // :4121
      } // :4121-4122
      return 0; // :4121-4123
    } // :4124-4125
  } else if (era_flag.selectcom === 46) {
    // :4125

    if (
      (era.get(`talent:${target}:76`) || 0) === 1 &&
      (era.get(`abl:${target}:3`) || 0) >= 3 &&
      (era.get(`abl:${target}:21`) || 0) >= 3 &&
      (kojo.灌肠肛塞 <= 7 || game.kojo.口上开关 === 2)
    ) {
      // :4127
      await era.printAndWait(
        `「出，出来了啊啊${heart(1)}　别，别看了……脏东西要喷出来了啊……${heart(1)}　啊゛啊゛啊゛啊゛啊啊……${heart(1)}」`,
      ); // :4128
      await era.printAndWait(
        `${target_name}和言语相反的，一脸恍惚地喷溅着脏污………`,
      ); // :4129
      // CFLAG:347  = 8（变量语义：CFLAG 族，347） // :4130
      kojo.灌肠肛塞 = 8; // :4130
    } else if (
      (era.get(`talent:${target}:76`) || 0) === 1 &&
      (kojo.灌肠肛塞 <= 6 || game.kojo.口上开关 === 2)
    ) {
      // :4132
      await era.printAndWait(`「别，别看啊啊！　脏东西要喷出来了啊啊啊！！」`); // :4133
      await era.printAndWait(
        `${target_name}香汗淋漓地惊声尖叫着，似乎再也忍不住地喷出了排泄物………`,
      ); // :4134
      // CFLAG:347  = 7（变量语义：CFLAG 族，347） // :4135
      kojo.灌肠肛塞 = 7; // :4135
    } else if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (era.get(`abl:${target}:3`) || 0) >= 3 &&
      (era.get(`abl:${target}:21`) || 0) >= 3 &&
      (kojo.灌肠肛塞 <= 5 || game.kojo.口上开关 === 2)
    ) {
      // :4137
      await era.printAndWait(
        `「出，出来了………${heart(1)}　${sc()}…是这么肮脏的女人对不起……${heart(1)}」`,
      ); // :4138
      await era.printAndWait(
        `${target_name}和言语相反的，一脸恍惚地喷溅着脏污………`,
      ); // :4139
      // CFLAG:347  = 6（变量语义：CFLAG 族，347） // :4140
      kojo.灌肠肛塞 = 6; // :4140
    } else if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (kojo.灌肠肛塞 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // :4142
      await era.printAndWait(
        `「别，别看啊啊啊！　肮脏的${sc()}…要被轻蔑了啊……」`,
      ); // :4143
      await era.printAndWait(
        `${target_name}香汗淋漓地惊声尖叫着，似乎再也忍不住地喷出了排泄物………`,
      ); // :4144
      // CFLAG:347  = 5（变量语义：CFLAG 族，347） // :4145
      kojo.灌肠肛塞 = 5; // :4145
    } else if (
      (era.get(`mark:${target}:2`) || 0) >= 2 &&
      (era.get(`mark:${target}:3`) || 0) === 3 &&
      (era.get(`talent:${target}:85`) || 0) === 0 &&
      (era.get(`talent:${target}:76`) || 0) === 0 &&
      (kojo.灌肠肛塞 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // :4147
      await era.printAndWait(
        `「别开玩笑了……这样的恶行……绝对不会忘掉的……不行了啊啊啊啊！！！」`,
      ); // :4148
      await era.printAndWait(
        `${target_name}带着愤怒的表情眼中泛着泪光，夸张地将脏污排泄了出来………`,
      ); // :4149
      // CFLAG:347  = 4（变量语义：CFLAG 族，347） // :4150
      kojo.灌肠肛塞 = 4; // :4150
    } else if (
      (era.get(`abl:${target}:3`) || 0) >= 3 &&
      (era.get(`abl:${target}:21`) || 0) >= 3 &&
      (kojo.灌肠肛塞 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // :4152
      await era.printAndWait(
        `「明明不可以的……因为排泄脏污而有快感怎么可以呢……♪」`,
      ); // :4153
      await era.printAndWait(
        `${target_name}和言语相反的，一脸恍惚地喷溅着脏污………`,
      ); // :4154
      // CFLAG:347  = 3（变量语义：CFLAG 族，347） // :4155
      kojo.灌肠肛塞 = 3; // :4155
    } else if (kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 === 2) {
      // :4157
      await era.printAndWait(`「别看啊……不要啊啊啊啊！」`); // :4158
      await era.printAndWait(`${target_name}一脸苍白地喷溅着脏污………`); // :4159
      // CFLAG:347  = 2（变量语义：CFLAG 族，347） // :4160
      kojo.灌肠肛塞 = 2; // :4160
    } // :4160-4161
    return 0; // :4160-4162
  } // :4164-4167

  if (era_flag.selectcom === 55) {
    // :4170

    if (kojo.放置PLAY === 0) {
      // :4172

      if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :4174
        await era.printAndWait(`「啊啊啊…想要做…更多…${heart(1)}」`); // :4175
        await era.printAndWait(`${target_name}有些不甘寂寞的样子………`); // :4176
      } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :4178
        await era.printAndWait(`「想…想做爱…哈啊${heart(1)}」`); // :4179
        await era.printAndWait(`${target_name}的欲望溢于言表………`); // :4180
      } else {
        // :4182-4183
        await era.printAndWait(`「有…有什么奇怪的打算吗」`); // :4183
        await era.printAndWait(`${target_name}对你询问道………`); // :4184
      } // :4184-4185
      await era.print(''); // :4186

      if (era.get(`tequip:${target}:11`)) {
        // :4189
        await era.printAndWait(
          `${target_name}小穴里蠕虫蠢动，毫不怜惜地冲击着。`,
        ); // :4189
      } // :4189

      if (era.get(`tequip:${target}:13`)) {
        // :4192
        await era.printAndWait(
          `${target_name}菊花里肛门虫蠢动，毫不怜惜地冲击着。`,
        ); // :4192
      } // :4192

      if (era.get(`tequip:${target}:19`)) {
        // :4195
        await era.printAndWait(`${target_name}后庭被插进肛珠，微微张开着。`); // :4195
      } // :4195

      if (era.get(`tequip:${target}:14`)) {
        // :4198
        await era.printAndWait(
          `${target_name}被装上电动阴蒂夹，阴蒂被不断刺激着。`,
        ); // :4198
      } // :4198

      if (era.get(`tequip:${target}:15`)) {
        // :4201
        await era.printAndWait(
          `${target_name}被装上乳头夹，乳头被不断刺激着。`,
        ); // :4201
      } // :4201

      if (era.get(`tequip:${target}:16`)) {
        // :4204
        await era.print(`${target_name}胸部被安上榨乳器，开始榨出乳汁。`); // :4204
      } // :4204

      if (era.get(`tequip:${target}:17`)) {
        // :4207
        await era.printAndWait(
          `${target_name}的阴茎上套着飞机杯，快要射精的样子。`,
        ); // :4207
      } // :4207

      if (era.get(`tequip:${target}:43`)) {
        // :4210
        await era.printAndWait(`${target_name}被装上了眼罩。`); // :4210
      } // :4210

      if (era.get(`tequip:${target}:44`)) {
        // :4213
        await era.printAndWait(`${target_name}的身体被绳子束缚着。`); // :4213
      } // :4213

      if (era.get(`tequip:${target}:46`)) {
        // :4216
        await era.printAndWait(
          `${target_name}的腹部因为灌肠的原因发出尴尬的声音，一取下肛塞就排泄出大量浊物。`,
        ); // :4216
      } // :4216

      if (era.get(`tequip:${target}:49`)) {
        // :4219
        await era.printAndWait(
          `${target_name}的肛门插着电极，每次轻微的电流流过都会使肛门括约肌猛地收缩。`,
        ); // :4219
      } // :4219

      if (era.get(`tequip:${target}:53`)) {
        // :4222
        await era.printAndWait(
          `然后，${target_name}的身姿从头到尾被录制了进去………`,
        ); // :4222
      } // :4222
      // CFLAG:356  = 1（变量语义：CFLAG 族，356） // :4223
      kojo.放置PLAY = 1; // :4223
      return 0; // :4223-4224
    } else {
      // :4226-4227

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        era.get(`palam:${target}:5`) >= PALAMLV[3] &&
        (kojo.放置PLAY <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :4228
        await era.printAndWait(`「想…想做爱…哈啊${heart(1)}」`); // :4229
        await era.printAndWait(`${target_name}的欲望溢于言表………`); // :4230
        // CFLAG:356  = 7（变量语义：CFLAG 族，356） // :4231
        kojo.放置PLAY = 7; // :4231
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.放置PLAY <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :4233
        await era.printAndWait(`「哈啊…这是一种另类的挑逗吗…${heart(1)}」`); // :4234
        await era.printAndWait(`${target_name}眼泛春光，淫荡地呻吟起来………`); // :4235
        // CFLAG:356  = 6（变量语义：CFLAG 族，356） // :4236
        kojo.放置PLAY = 6; // :4236
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        era.get(`palam:${target}:5`) >= PALAMLV[3] &&
        (kojo.放置PLAY <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4238
        await era.printAndWait(`「啊啊啊…想要做…更多…${heart(1)}」`); // :4239
        await era.printAndWait(`${target_name}有些不甘寂寞的样子………`); // :4240
        // CFLAG:356  = 5（变量语义：CFLAG 族，356） // :4241
        kojo.放置PLAY = 5; // :4241
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.放置PLAY <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4243
        await era.printAndWait(`「${scf()}、${sc()}…不准突然袭击哟………0」`); // :4244
        await era.printAndWait(`${target_name}眯起眼睛，看着${player_name}………`); // :4245
        // CFLAG:356  = 4（变量语义：CFLAG 族，356） // :4246
        kojo.放置PLAY = 4; // :4246
      } else if (
        era.get(`palam:${target}:5`) >= PALAMLV[3] &&
        (kojo.放置PLAY <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :4248
        await era.printAndWait(`「哈啊哈啊…向你屈服…这种事情…是不可能的………」`); // :4249
        await era.printAndWait(`${target_name}对你说道………`); // :4250
        // CFLAG:356  = 3（变量语义：CFLAG 族，356） // :4251
        kojo.放置PLAY = 3; // :4251
      } else if (kojo.放置PLAY <= 1 || game.kojo.口上开关 === 2) {
        // :4253
        await era.printAndWait(`「有…有什么奇怪的打算吗」`); // :4254
        await era.printAndWait(`${target_name}对你询问道………`); // :4255
        // CFLAG:356  = 2（变量语义：CFLAG 族，356） // :4256
        kojo.放置PLAY = 2; // :4256
      } // :4256-4257
      await era.print(''); // :4258

      if (era.get(`tequip:${target}:11`)) {
        // :4261
        await era.printAndWait(
          `${target_name}小穴里蠕虫蠢动，毫不怜惜地冲击着。`,
        ); // :4261
      } // :4261

      if (era.get(`tequip:${target}:13`)) {
        // :4264
        await era.printAndWait(
          `${target_name}菊花里肛门虫蠢动，毫不怜惜地冲击着。`,
        ); // :4264
      } // :4264

      if (era.get(`tequip:${target}:19`)) {
        // :4267
        await era.printAndWait(`${target_name}后庭被插进肛珠，微微张开着。`); // :4267
      } // :4267

      if (era.get(`tequip:${target}:14`)) {
        // :4270
        await era.printAndWait(
          `${target_name}被装上电动阴蒂夹，阴蒂被不断刺激着。`,
        ); // :4270
      } // :4270

      if (era.get(`tequip:${target}:15`)) {
        // :4273
        await era.printAndWait(
          `${target_name}被装上乳头夹，乳头被不断刺激着。`,
        ); // :4273
      } // :4273

      if (era.get(`tequip:${target}:16`)) {
        // :4276
        await era.print(`${target_name}胸部被安上榨乳器，开始榨出乳汁。`); // :4276
      } // :4276

      if (era.get(`tequip:${target}:17`)) {
        // :4279
        await era.printAndWait(
          `${target_name}的阴茎上套着飞机杯，快要射精的样子。`,
        ); // :4279
      } // :4279

      if (era.get(`tequip:${target}:43`)) {
        // :4282
        await era.printAndWait(`${target_name}被装上了眼罩。`); // :4282
      } // :4282

      if (era.get(`tequip:${target}:44`)) {
        // :4285
        await era.printAndWait(`${target_name}的身体被绳子束缚着。`); // :4285
      } // :4285

      if (era.get(`tequip:${target}:46`)) {
        // :4288
        await era.printAndWait(
          `${target_name}的腹部因为灌肠的原因发出尴尬的声音，一取下肛塞就排泄出大量浊物。`,
        ); // :4288
      } // :4288

      if (era.get(`tequip:${target}:49`)) {
        // :4291
        await era.printAndWait(
          `${target_name}的肛门插着电极，每次轻微的电流流过都会使肛门括约肌猛地收缩。`,
        ); // :4291
      } // :4291

      if (era.get(`tequip:${target}:53`)) {
        // :4294
        await era.printAndWait(
          `然后，${target_name}的身姿从头到尾被录制了进去………`,
        ); // :4294
      } // :4294
      return 0; // :4294-4295
    } // :4294-4296
  } // :4294-4297

  if (era_flag.selectcom === 56) {
    // :4304

    if (kojo.交谈 === 0) {
      // :4306

      if (era.get(`tequip:${target}:53`) === 1) {
        // :4308
        await era.print(`${player_name}催促${target_name}进行自我介绍，`); // :4309
        if (
          rand_n(3) === 0 &&
          (era.get(`talent:${target}:89`) ||
            0 ||
            (era.get(`abl:${target}:17`) || 0) >= 5)
        ) {
          // :4310
          await era.print(`面带微笑的${target_name}介绍了自己的本名和性经验`); // :4311
          if ((era.get(`abl:${target}:31`) || 0) >= 3) {
            // :4313
            await era.print(`，甚至还有手淫的时候想到的内容`); // :4313
          } // :4313
          await era.print(`……`); // :4314
          await era.print(
            `对于这个发往故乡的水晶球的某种幻想使她双腿之间泛滥成灾……`,
          ); // :4315
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4316
          game.kojo.录像内容 |= 2; // :4316
        } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
          // :4318
          await era.printAndWait(
            `${target_name}向水晶球展现出自己那诱人的小穴，两足大张。`,
          ); // :4319
          await era.printAndWait(`「你好啊，见到你很高兴♪」`); // :4320
          await era.printAndWait(
            `「今后那个高傲的${target_name}酱会舍弃自己的自尊变成摇着屁股求干的贱货哟♪」`,
          ); // :4321
          await era.printAndWait(
            `「请大家一起见证${sc()}这淫荡下贱的样子吧～♪」`,
          ); // :4322
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4323
          game.kojo.录像内容 |= 2; // :4323
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          // :4325
          await era.printAndWait(`${target_name}有些兴奋地聊了起来。`); // :4326
          await era.printAndWait(`「你好啊，这里是${target_name}♪」`); // :4327
          await era.printAndWait(
            `「曾经高傲的${sc()}，现在每天都在和魔王大人做爱呢♪」`,
          ); // :4328
          await era.printAndWait(`「那么请好好看做爱的过程吧~♪」`); // :4329
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4330
          game.kojo.录像内容 |= 2; // :4330
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) ||
            0 ||
            (era.get(`abl:${target}:11`) || 0) >= 5)
        ) {
          // :4331
          await era.print(`${target_name}对着水晶球说起淫猥的话语。`); // :4332
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4333
          game.kojo.录像内容 |= 2; // :4333
        } else if (
          era.get(`talent:${target}:85`) ||
          0 ||
          (era.get(`abl:${target}:10`) || 0) >= 3 ||
          (era.get(`abl:${target}:11`) || 0) >= 4 ||
          (era.get(`abl:${target}:17`) || 0) >= 2
        ) {
          // :4334
          await era.print(`${target_name}对着水晶球开始介绍自己。`); // :4335
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4336
          game.kojo.录像内容 |= 2; // :4336
        } else {
          // :4336-4337
          await era.printAndWait(`${target_name}侧过脸去，沉默不语。`); // :4338
        } // :4338-4339
      } else {
        // :4341-4342
        await era.print(`在和${player_name}`); // :4342
        if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:85`) ||
            0 ||
            (era.get(`abl:${target}:10`) || 0) >= 5) &&
          game.event.插着不拔
        ) {
          // :4343
          await era.print(`会话的过程中，${target_name}呢喃着充满爱意的话语。`); // :4344
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) ||
            0 ||
            (era.get(`abl:${target}:11`) || 0) >= 5) &&
          game.event.插着不拔
        ) {
          // :4345
          await era.print(
            `会话的过程中，${target_name}扭动着腰叫嚷着淫猥的话语。`,
          ); // :4346
        } else if (
          (era.get(`palam:${target}:4`) >= PALAMLV[4] ||
            (era.get(`abl:${target}:10`) || 0) >= 5 ||
            era.get(`talent:${target}:85`) ||
            0 ||
            era.get(`talent:${target}:76`) ||
            0) &&
          era.get(`palam:${target}:5`) >= PALAMLV[4]
        ) {
          // :4347
          await era.print(`会话的过程中，${target_name}`); // :4348
          if (
            era.get(`tequip:${target}:11`) ||
            era.get(`tequip:${target}:13`) ||
            era.get(`tequip:${target}:14`) ||
            era.get(`tequip:${target}:15`) ||
            era.get(`tequip:${target}:16`) ||
            era.get(`tequip:${target}:17`)
          ) {
            // :4349
            await era.print(`带着快乐的语调`); // :4350
          } else if (
            era.get(`tequip:${target}:44`) ||
            era.get(`tequip:${target}:49`)
          ) {
            // :4351
            await era.print(`带着痛苦的语调`); // :4352
          } // :4352-4353
          await era.print(`拼命地回应着。`); // :4354
        } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
          // :4356
          await era.print(
            `会话的过程中，${target_name}一副想要做爱胜过说话的样子。`,
          ); // :4357
          await era.printAndWait(`「想要…想要肉棒嘛…${heart(1)}」`); // :4358
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[4] ||
          era.get(`talent:${target}:85`) ||
          0 ||
          (era.get(`abl:${target}:10`) || 0) >= 5
        ) {
          // :4359
          await era.print(`会话的过程中，${target_name}交谈还算融洽的样子。`); // :4360
          await era.printAndWait(`「啊，还有这种事啊？…是这样吗………」`); // :4361
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[2] ||
          (era.get(`abl:${target}:10`) || 0) >= 3
        ) {
          // :4362
          await era.print(`会话的过程中，${target_name}时不时会给出一些回应。`); // :4363
          await era.printAndWait(`「嗯、嗯…这样啊………」`); // :4364
        } else {
          // :4364-4365
          await era.print(`会话的过程中，${target_name}一副心不在焉的样子…`); // :4366
        } // :4366-4367
      } // :4368-4369
      // CFLAG:357  = 1（变量语义：CFLAG 族，357） // :4369
      kojo.交谈 = 1; // :4369
      return 0; // :4369-4370
    } else {
      // :4372-4374

      if (era.get(`tequip:${target}:53`) === 1) {
        // :4374
        await era.print(`${player_name}催促${target_name}进行自我介绍，`); // :4375
        if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:85`) ||
            0 ||
            (era.get(`abl:${target}:10`) || 0) >= 5) &&
          game.event.插着不拔
        ) {
          // :4376
          await era.print(`${target_name}扭着腰对水晶球说出了充满爱意的话语`); // :4377
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4378
          game.kojo.录像内容 |= 2; // :4378
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) ||
            0 ||
            (era.get(`abl:${target}:11`) || 0) >= 5) &&
          game.event.插着不拔
        ) {
          // :4379
          await era.print(`${target_name}扭着腰对水晶球叫嚷着淫猥的话语`); // :4380
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4381
          game.kojo.录像内容 |= 2; // :4381
        } else if (
          rand_n(3) === 0 &&
          (era.get(`talent:${target}:89`) ||
            0 ||
            (era.get(`abl:${target}:17`) || 0) >= 5)
        ) {
          // :4382
          await era.print(`${target_name}面带微笑地介绍了自己的本名和性经验`); // :4383
          if ((era.get(`abl:${target}:31`) || 0) >= 3) {
            // :4385
            await era.print(`，甚至还有手淫的时候想到的内容`); // :4385
          } // :4385
          await era.print(`……`); // :4386
          await era.print(
            `对于这个发往故乡的水晶球的某种幻想使她双腿之间泛滥成灾……`,
          ); // :4387
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4388
          game.kojo.录像内容 |= 2; // :4388
        } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
          // :4390
          await era.printAndWait(
            `${target_name}向水晶球展现出自己那诱人的小穴。`,
          ); // :4391
          await era.printAndWait(`「你好啊，见到你很高兴♪」`); // :4392
          await era.printAndWait(
            `「今后那个高傲的${target_name}酱会舍弃自己的自尊变成摇着屁股求干的贱货哟♪」`,
          ); // :4393
          await era.printAndWait(
            `「请大家一起见证${sc()}这淫荡下贱的样子吧～♪」`,
          ); // :4394
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4395
          game.kojo.录像内容 |= 2; // :4395
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          // :4397
          await era.printAndWait(`${target_name}有些兴奋地聊了起来。`); // :4398
          await era.printAndWait(`「你好啊，这里是${target_name}♪」`); // :4399
          await era.printAndWait(
            `「曾经高傲的${sc()}，现在每天都在和魔王大人做爱呢♪」`,
          ); // :4400
          await era.printAndWait(`「那么请好好看做爱的过程吧~♪」`); // :4401
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4402
          game.kojo.录像内容 |= 2; // :4402
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) ||
            0 ||
            (era.get(`abl:${target}:11`) || 0) >= 5)
        ) {
          // :4403
          await era.print(`${target_name}对着水晶球说起淫猥的话语`); // :4404
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4405
          game.kojo.录像内容 |= 2; // :4405
        } else if (
          era.get(`talent:${target}:85`) ||
          0 ||
          (era.get(`abl:${target}:10`) || 0) >= 3 ||
          (era.get(`abl:${target}:11`) || 0) >= 4 ||
          (era.get(`abl:${target}:17`) || 0) >= 2
        ) {
          // :4406
          await era.print(`${target_name}对着水晶球开始介绍自己`); // :4407
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4408
          game.kojo.录像内容 |= 2; // :4408
        } else {
          // :4408-4409
          await era.printAndWait(`${target_name}侧过脸去，沉默不语`); // :4410
        } // :4410-4411
      } else {
        // :4413-4414
        await era.print(`在和${player_name}`); // :4414
        if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:85`) ||
            0 ||
            (era.get(`abl:${target}:10`) || 0) >= 5) &&
          game.event.插着不拔
        ) {
          // :4415
          await era.print(`会话的过程中，${target_name}呢喃着充满爱意的话语`); // :4416
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) ||
            0 ||
            (era.get(`abl:${target}:11`) || 0) >= 5) &&
          game.event.插着不拔
        ) {
          // :4417
          await era.print(
            `会话的过程中，${target_name}扭动着腰叫嚷着淫猥的话语`,
          ); // :4418
        } else if (
          (era.get(`palam:${target}:4`) >= PALAMLV[4] ||
            (era.get(`abl:${target}:10`) || 0) >= 5 ||
            era.get(`talent:${target}:85`) ||
            0 ||
            era.get(`talent:${target}:76`) ||
            0) &&
          era.get(`palam:${target}:5`) >= PALAMLV[4]
        ) {
          // :4419
          await era.print(`会话的过程中，${target_name}`); // :4420
          if (
            era.get(`tequip:${target}:11`) ||
            era.get(`tequip:${target}:13`) ||
            era.get(`tequip:${target}:14`) ||
            era.get(`tequip:${target}:15`) ||
            era.get(`tequip:${target}:16`) ||
            era.get(`tequip:${target}:17`)
          ) {
            // :4421
            await era.print(`带着快乐的语调`); // :4422
          } else if (
            era.get(`tequip:${target}:44`) ||
            era.get(`tequip:${target}:49`)
          ) {
            // :4423
            await era.print(`带着痛苦的语调`); // :4424
          } // :4424-4425
          await era.print(`拼命地回应着。`); // :4426
        } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
          // :4428
          await era.print(
            `会话的过程中，${target_name}露出一副想要做爱胜过说话的样子。`,
          ); // :4429
          await era.printAndWait(`「想要…想要肉棒…${heart(1)}」`); // :4430
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[4] ||
          era.get(`talent:${target}:85`) ||
          0 ||
          (era.get(`abl:${target}:10`) || 0) >= 5
        ) {
          // :4431
          await era.print(
            `会话的过程中，与${target_name}的交谈还算融洽的样子。`,
          ); // :4432
          await era.printAndWait(`「啊，还有这种事啊？…是这样吗………」`); // :4433
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[2] ||
          (era.get(`abl:${target}:10`) || 0) >= 3
        ) {
          // :4434
          await era.print(`会话的过程中，${target_name}时不时会给出一些回应`); // :4435
          await era.printAndWait(`「嗯、嗯…这样啊………」`); // :4436
        } else {
          // :4436-4437
          await era.print(`会话的过程中，${target_name}只是认真地听着…`); // :4438
        } // :4438-4439
      } // :4438-4440
      return 0; // :4438-4441
    } // :4442-4445
  } // :4443-4445

  if (era_flag.selectcom === 123) {
    // :4447

    if (kojo.乳夹口交 === 0) {
      // :4449

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :4451
        await era.printAndWait(
          `「哈啊哈啊…很热呢…这仿佛在燃烧着的肉棒…${heart(1)}」`,
        ); // :4452
        if (era.get(`talent:${target}:109`) || 0) {
          // :4453
          await era.printAndWait(
            `「啊啊…${sc()}的乳房虽然很小…但服务可不差哦…咕噜咕噜…哈啊${heart(1)}」`,
          ); // :4454
          await era.printAndWait(
            `${target_name}十分兴奋，用那平薄的胸部摩擦着阴茎的一端………`,
          ); // :4455
        } else if (era.get(`talent:${target}:110`) || 0) {
          // :4456
          await era.printAndWait(
            `「${sc()}的胸部很舒服的吧…啊哈哈…这大家伙都已经这么硬了呢…哈呜…咕噜咕噜…${heart(1)}」`,
          ); // :4457
          await era.printAndWait(
            `${target_name}十分兴奋，把阴茎夹在一对巨乳间进行着口交。`,
          ); // :4458
        } else if (era.get(`talent:${target}:114`) || 0) {
          // :4459
          await era.printAndWait(
            `「啊哈哈哈…${sc()}这傲人的胸部能让你很舒服吧…${heart(1)} 呜咕噜…哈呼…呜呜${heart(1)}」`,
          ); // :4460
          await era.printAndWait(
            `${target_name}十分兴奋，把阴茎埋在一双豪乳间进行着口交………`,
          ); // :4461
        } else {
          // :4461-4462
          await era.printAndWait(
            `「呃呃…嘻嘻～${heart(1)} 这样子侍奉着阴茎…${sc()}已经忍不住了啦～${heart(1)} 唔喔…唔唔～${heart(1)}」`,
          ); // :4463
          await era.printAndWait(
            `${target_name}十分兴奋，把阴茎夹在胸间进行着口交………`,
          ); // :4464
        } // :4464-4465
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :4467
        await era.printAndWait(`「肉棒…啊啊…已经在发热了呢……${heart(1)}」`); // :4468
        if (era.get(`talent:${target}:109`) || 0) {
          // :4469
          await era.printAndWait(
            `「如果${sc()}的胸部…更大一点的话…呜…啊哈…呜…哈啊${heart(1)}」`,
          ); // :4470
          await era.printAndWait(
            `${target_name}将带着精臭的阴茎包在嘴里，用那平薄的胸部摩擦着阴茎的一端………`,
          ); // :4471
        } else if (era.get(`talent:${target}:110`) || 0) {
          // :4472
          await era.printAndWait(
            `「啊哈…这灼热的…把${sc()}的胸都要烫伤了呢…啊哈呜呜…呜咕…咕噜${heart(1)}」`,
          ); // :4473
          await era.printAndWait(
            `${target_name}自豪地笑着，把阴茎夹在一对巨乳间进行着口交。`,
          ); // :4474
        } else if (era.get(`talent:${target}:114`) || 0) {
          // :4475
          await era.printAndWait(
            `「啊啊啊…肉棒全都埋进去了呢…哈啊…好像会出来很多精液的样子${heart(1)}」`,
          ); // :4476
          await era.printAndWait(
            `${target_name}自豪地笑着，把阴茎埋在一双豪乳间进行着口交。`,
          ); // :4477
          await era.printAndWait(
            `「来吧${heart(1)}…哈呜${heart(1)}…来射到…啊啊啊…来射满我的胸部${heart(1)}」`,
          ); // :4478
        } else {
          // :4478-4479
          await era.printAndWait(
            `「啊啊啊啊…肉棒…${sc()}会用嘴巴和胸部让它更加舒服的…呜呼…咕噜噜…哈啊${heart(1)}」`,
          ); // :4480
          await era.printAndWait(
            `${target_name}舔着嘴唇，把阴茎夹在胸间进行着口交………`,
          ); // :4481
        } // :4481-4482
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        // :4484
        await era.printAndWait(`「啊啊…呜…呜啊…咕咕…咕噜…呜呼咕咕咕噜噜………」`); // :4485
        if (era.get(`talent:${target}:109`) || 0) {
          // :4486
          await era.printAndWait(
            `${target_name}拼命用那微薄的胸部摩擦着阴茎，同时开始了口交………`,
          ); // :4487
        } else if (era.get(`talent:${target}:110`) || 0) {
          // :4488
          await era.printAndWait(
            `「被你看着…${sc()}的乳房变得更加舒服了呢…啊哈…呜咕…哈啊…呜呜呜」`,
          ); // :4489
          await era.printAndWait(
            `${target_name}十分愉快地把阴茎夹在一对巨乳间进行着口交………`,
          ); // :4490
        } else if (era.get(`talent:${target}:114`) || 0) {
          // :4491
          await era.printAndWait(
            `「但凡是男人…都喜欢盯着${sc()}的胸口看呢…呜…啊呜啊呜…哈啊…呜咕咕噜…」`,
          ); // :4492
          await era.printAndWait(
            `${target_name}十分愉快地把阴茎埋在一双豪乳间进行着口交………`,
          ); // :4493
        } else {
          // :4493-4494
          await era.printAndWait(
            `${target_name}十分愉快地把阴茎夹在胸间进行着口交………`,
          ); // :4495
        } // :4495-4496
      } else {
        // :4498-4499
        await era.printAndWait(
          `「${scf()}、${sc()}居然要做这种屈辱的事情吗…啊呜………」`,
        ); // :4499
        if (era.get(`talent:${target}:109`) || 0) {
          // :4500
          await era.printAndWait(
            `${target_name}胸口被阴茎蹭着，开始吮吸起来………`,
          ); // :4501
        } else if (era.get(`talent:${target}:110`) || 0) {
          // :4502
          await era.printAndWait(
            `「呜呼…男人都喜欢…啊啊…啊咕…把肉棒强加到别人身上吗…呜…呜咕噜路…哈啊」`,
          ); // :4503
          await era.printAndWait(
            `${target_name}带着懊悔的表情把阴茎夹在一对巨乳间进行着口交………`,
          ); // :4504
        } else if (era.get(`talent:${target}:114`) || 0) {
          // :4505
          await era.printAndWait(
            `「居然要${sc()}用这自豪的胸部做这种丑陋的事情…啊啊啊…呜呼…呜咕噜…呜呜呜呜呜！」`,
          ); // :4506
          await era.printAndWait(
            `${target_name}带着懊悔的表情把阴茎埋在一双豪乳间进行着口交………`,
          ); // :4507
        } else {
          // :4507-4508
          await era.printAndWait(
            `${target_name}带着懊悔的表情把阴茎夹在胸间进行着口交………`,
          ); // :4509
        } // :4509-4510
      } // :4511-4512
      // CFLAG:TARGET:360  = 1（变量语义：CFLAG 族，TARGET:360） // :4512
      kojo.乳夹口交 = 1; // :4512
      return 0; // :4512-4513
    } else {
      // :4515-4517

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.乳夹口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4517
        await era.printAndWait(
          `「哈啊哈啊…很热呢…这仿佛在燃烧的肉棒…${heart(1)}」`,
        ); // :4518
        if (era.get(`talent:${target}:109`) || 0) {
          // :4519
          await era.printAndWait(
            `「啊啊…${sc()}的乳房虽然很小…但服务可不差哦…咕噜咕噜…哈啊${heart(1)}」`,
          ); // :4520
          await era.printAndWait(
            `${target_name}十分兴奋，用那平薄的胸部摩擦着阴茎的一端………`,
          ); // :4521
        } else if (era.get(`talent:${target}:110`) || 0) {
          // :4522
          await era.printAndWait(
            `「${sc()}的胸部很舒服的吧…啊哈哈…这大家伙都已经这么硬了呢…哈呜…咕噜咕噜…${heart(1)}」`,
          ); // :4523
          await era.printAndWait(
            `${target_name}十分兴奋，把阴茎夹在一对巨乳间进行着口交。`,
          ); // :4524
        } else if (era.get(`talent:${target}:114`) || 0) {
          // :4525
          await era.printAndWait(
            `「啊哈哈哈…${sc()}这傲人的胸部能让你很舒服吧…${heart(1)} 呜咕噜…哈呼…呜呜${heart(1)}」`,
          ); // :4526
          await era.printAndWait(
            `${target_name}十分兴奋，把阴茎埋在一双豪乳间进行着口交………`,
          ); // :4527
        } else {
          // :4527-4528
          await era.printAndWait(
            `「呃呃…嘻嘻～${heart(1)} 这样子侍奉着阴茎…${sc()}已经忍不住了啦～${heart(1)} 唔喔…唔唔～${heart(1)}」`,
          ); // :4529
          await era.printAndWait(
            `${target_name}十分兴奋，把阴茎夹在胸间进行着口交………`,
          ); // :4530
        } // :4530-4531
        // CFLAG:360  = 5（变量语义：CFLAG 族，360） // :4532
        kojo.乳夹口交 = 5; // :4532
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.乳夹口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4534
        await era.printAndWait(`「肉棒…啊啊…已经在发热了呢……${heart(1)}」`); // :4535
        if (era.get(`talent:${target}:109`) || 0) {
          // :4536
          await era.printAndWait(
            `「如果${sc()}的胸部…更大一点的话…呜…啊哈…呜…哈啊${heart(1)}」`,
          ); // :4537
          await era.printAndWait(
            `${target_name}将带着精臭的阴茎包在嘴里，用那平薄的胸部摩擦着阴茎的一端………`,
          ); // :4538
        } else if (era.get(`talent:${target}:110`) || 0) {
          // :4539
          await era.printAndWait(
            `「啊哈…这灼热的…把${sc()}的胸都要烫伤了呢…啊哈呜呜…呜咕…咕噜${heart(1)}」`,
          ); // :4540
          await era.printAndWait(
            `${target_name}自豪地笑着，把阴茎夹在一对巨乳间进行着口交。`,
          ); // :4541
        } else if (era.get(`talent:${target}:114`) || 0) {
          // :4542
          await era.printAndWait(
            `「啊啊啊…肉棒全都埋进去了呢…哈啊…好像会出来很多精液的样子${heart(1)}」`,
          ); // :4543
          await era.printAndWait(
            `${target_name}自豪地笑着，把阴茎埋在一双豪乳间进行着口交。`,
          ); // :4544
          await era.printAndWait(
            `「来吧${heart(1)}…哈呜${heart(1)}…来射到…啊啊啊…来射满我的胸部${heart(1)}」`,
          ); // :4545
        } else {
          // :4545-4546
          await era.printAndWait(
            `「啊啊啊啊…肉棒…${sc()}会用嘴巴和胸部让它更加舒服的…呜呼…咕噜噜…哈啊${heart(1)}」`,
          ); // :4547
          await era.printAndWait(
            `${target_name}舔着嘴唇，把阴茎夹在胸间进行着口交………`,
          ); // :4548
        } // :4548-4549
        // CFLAG:360  = 4（变量语义：CFLAG 族，360） // :4550
        kojo.乳夹口交 = 4; // :4550
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.乳夹口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :4552
        await era.printAndWait(`「啊啊…呜…呜啊…咕咕…咕噜…呜呼咕咕咕噜噜………」`); // :4553
        if (era.get(`talent:${target}:109`) || 0) {
          // :4554
          await era.printAndWait(
            `${target_name}拼命用那微薄的胸部摩擦着阴茎，同时开始了口交………`,
          ); // :4555
        } else if (era.get(`talent:${target}:110`) || 0) {
          // :4556
          await era.printAndWait(
            `「被你看着…${sc()}的乳房变得更加舒服了呢…啊哈…呜咕…哈啊…呜呜呜」`,
          ); // :4557
          await era.printAndWait(
            `${target_name}十分愉快地把阴茎夹在一对巨乳间进行着口交………`,
          ); // :4558
        } else if (era.get(`talent:${target}:114`) || 0) {
          // :4559
          await era.printAndWait(
            `「但凡是男人…都喜欢盯着${sc()}的胸口看呢…呜…啊呜啊呜…哈啊…呜咕咕噜…」`,
          ); // :4560
          await era.printAndWait(
            `${target_name}十分愉快地把阴茎埋在一双豪乳间进行着口交………`,
          ); // :4561
        } else {
          // :4561-4562
          await era.printAndWait(
            `${target_name}十分愉快地把阴茎夹在胸间进行着口交………`,
          ); // :4563
        } // :4563-4564
        // CFLAG:360  = 3（变量语义：CFLAG 族，360） // :4565
        kojo.乳夹口交 = 3; // :4565
      } else if (kojo.乳夹口交 <= 1 || game.kojo.口上开关 === 2) {
        // :4567
        await era.printAndWait(
          `「${scf()}、${sc()}居然要做这种屈辱的事情吗…啊呜………」`,
        ); // :4568
        if (era.get(`talent:${target}:109`) || 0) {
          // :4569
          await era.printAndWait(
            `${target_name}胸口被阴茎蹭着，开始吮吸起来………`,
          ); // :4570
        } else if (era.get(`talent:${target}:110`) || 0) {
          // :4571
          await era.printAndWait(
            `「呜呼…男人都喜欢…啊啊…啊咕…把肉棒强加到别人身上吗…呜…呜咕噜路…哈啊」`,
          ); // :4572
          await era.printAndWait(
            `${target_name}带着懊悔的表情把阴茎夹在一对巨乳间进行着口交………`,
          ); // :4573
        } else if (era.get(`talent:${target}:114`) || 0) {
          // :4574
          await era.printAndWait(
            `「居然要${sc()}用这自豪的胸部做这种丑陋的事情…啊啊啊…呜呼…呜咕噜…呜呜呜呜呜！」`,
          ); // :4575
          await era.printAndWait(
            `${target_name}带着懊悔的表情把阴茎埋在一双豪乳间进行着口交………`,
          ); // :4576
        } else {
          // :4576-4577
          await era.printAndWait(
            `${target_name}带着懊悔的表情把阴茎夹在胸间进行着口交………`,
          ); // :4578
        } // :4578-4579
        // CFLAG:360  = 2（变量语义：CFLAG 族，360） // :4580
        kojo.乳夹口交 = 2; // :4580
      } // :4580-4581
      return 0; // :4580-4582
    } // :4580-4583
  } // :4584-4586

  if (era_flag.selectcom === 125) {
    // :4588

    if (kojo.口交时自慰 === 0) {
      // :4590

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :4592
        await era.printAndWait(
          `「呜咕噜…才、才没有…喜欢这么做呢…啊呜…呜咕噜${heart(1)} 唔啊啊${heart(1)} 哈啊啊${heart(1)} 好舒服${heart(1)}」`,
        ); // :4593
        await era.print(`${target_name}含住${player_name}的阴茎显得十分兴奋，`); // :4594
        if (era.get(`tequip:${target}:11`) && era.get(`tequip:${target}:13`)) {
          // :4595
          await era.print(`用手摆弄着插入私处和肛门的蠕虫，激烈地抽插着……`); // :4596
        } else if (era.get(`tequip:${target}:11`)) {
          // :4597
          await era.print(`用手摆弄着插入私处的蠕虫，激烈地抽插着……`); // :4598
        } else if (era.get(`tequip:${target}:13`)) {
          // :4599
          await era.print(`用手摆弄着插入肛门的蠕虫，激烈地抽插着……`); // :4600
        } else {
          // :4600-4601
          await era.print(`自慰仍在继续着………`); // :4602
        } // :4602-4603
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :4605
        await era.printAndWait(
          `「肉棒…想要…${heart(1)} 啊啊…一边自慰一边品尝肉棒的感觉${heart(1)}」`,
        ); // :4606
        await era.print(`${target_name}用舌头纠缠着${player_name}的阴茎，`); // :4607
        if (era.get(`tequip:${target}:11`) && era.get(`tequip:${target}:13`)) {
          // :4608
          await era.print(`两穴里的蠕虫蠕动着，自慰激烈地继续………`); // :4609
        } else if (era.get(`tequip:${target}:11`)) {
          // :4610
          await era.print(`小穴里的壶虫蠕动着，自慰激烈的继续………`); // :4611
        } else if (era.get(`tequip:${target}:13`)) {
          // :4612
          await era.print(`肛门里的肛门虫蠕动着，自慰激烈地继续………`); // :4613
        } else {
          // :4613-4614
          await era.print(`自慰仍在继续着………`); // :4615
        } // :4615-4616
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        // :4618
        await era.printAndWait(
          `「${scf()}、${sc()}…才不要一边自慰…一边帮你做那种事…呜…呜啊…呜…呜咕………」`,
        ); // :4619
        await era.print(`${target_name}被命令用口服侍${player_name}的阴茎，`); // :4620
        if (era.get(`tequip:${target}:11`) && era.get(`tequip:${target}:13`)) {
          // :4621
          await era.print(`两穴里的蠕虫蠕动着，自慰仍在继续………`); // :4622
        } else if (era.get(`tequip:${target}:11`)) {
          // :4623
          await era.print(`小穴里的壶虫蠕动着，自慰仍在继续………`); // :4624
        } else if (era.get(`tequip:${target}:13`)) {
          // :4625
          await era.print(`肛门里的肛门虫蠕动着，自慰仍在继续………`); // :4626
        } else {
          // :4626-4627
          await era.print(`自慰仍在继续着………`); // :4628
        } // :4628-4629
      } else {
        // :4631-4632
        await era.printAndWait(
          `「呜…哈啊…哈啊…要${sc()}…做这样的事…呜呼…呜呜…呜哈啊咕咕……！」`,
        ); // :4632
        await era.print(`${target_name}被命令用口服侍${player_name}的阴茎，`); // :4633
        if (era.get(`tequip:${target}:11`) && era.get(`tequip:${target}:13`)) {
          // :4634
          await era.print(`两穴里的蠕虫蠕动着，自慰仍在继续………`); // :4635
        } else if (era.get(`tequip:${target}:11`)) {
          // :4636
          await era.print(`小穴里的壶虫蠕动着，自慰仍在继续………`); // :4637
        } else if (era.get(`tequip:${target}:13`)) {
          // :4638
          await era.print(`肛门里的肛门虫蠕动着，自慰仍在继续………`); // :4639
        } else {
          // :4639-4640
          await era.print(`自慰仍在继续着………`); // :4641
        } // :4641-4642
      } // :4643-4644
      // CFLAG:TARGET:361  = 1（变量语义：CFLAG 族，TARGET:361） // :4644
      kojo.口交时自慰 = 1; // :4644
      return 0; // :4644-4645
    } else {
      // :4647-4649

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.口交时自慰 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4649
        await era.printAndWait(
          `「呜咕噜…才、才没有…喜欢这么做呢…啊呜…呜咕噜${heart(1)} 唔啊啊${heart(1)} 哈啊啊${heart(1)} 好舒服${heart(1)}」`,
        ); // :4650
        await era.print(`${target_name}含住${player_name}的阴茎显得十分兴奋，`); // :4651
        if (era.get(`tequip:${target}:11`) && era.get(`tequip:${target}:13`)) {
          // :4652
          await era.print(`两穴里的蠕虫蠕动着蠕动着，自慰激烈地继续………`); // :4653
        } else if (era.get(`tequip:${target}:11`)) {
          // :4654
          await era.print(`小穴里的壶虫蠕动着，自慰激烈的继续………`); // :4655
        } else if (era.get(`tequip:${target}:13`)) {
          // :4656
          await era.print(`肛门里的肛门虫蠕动着，自慰激烈地继续………`); // :4657
        } else {
          // :4657-4658
          await era.print(`自慰仍在继续着………`); // :4659
        } // :4659-4660
        await era.printAndWait(
          `「啊啊啊…一边自慰…一边舔着大肉棒…好舒服呢……啊啊啊啊啊啊${heart(1)}」`,
        ); // :4661
        await era.printAndWait(
          `（啊啊啊…肉棒…好想要肉棒啊${heart(1)} 只是自慰完全无法忍受了${heart(1)}）`,
        ); // :4662
        // CFLAG:361  = 5（变量语义：CFLAG 族，361） // :4663
        kojo.口交时自慰 = 5; // :4663
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.口交时自慰 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4665
        await era.printAndWait(
          `「肉棒…想要…${heart(1)} 啊啊…一边自慰一边品尝肉棒的感觉${heart(1)}」`,
        ); // :4666
        await era.print(`${target_name}用舌头纠缠着${player_name}的阴茎，`); // :4667
        if (era.get(`tequip:${target}:11`) && era.get(`tequip:${target}:13`)) {
          // :4668
          await era.print(`任两穴里的蠕虫蠕动着，摇动着纤腰………`); // :4669
        } else if (era.get(`tequip:${target}:11`)) {
          // :4670
          await era.print(`任私处的蠕虫蠕动，摇动着纤腰………`); // :4671
        } else if (era.get(`tequip:${target}:13`)) {
          // :4672
          await era.print(`任肛门里的肛门虫蠕动，摇动着纤腰………`); // :4673
        } else {
          // :4673-4674
          await era.print(`继续用手指在阴唇上抚摸着。`); // :4675
        } // :4675-4676
        await era.printAndWait(
          `「呜哈啊啊…咕噜…呜呜…哈…啊呜…呜咕噜噜噜…${heart(1)}」`,
        ); // :4677
        await era.printAndWait(
          `（一边自慰一边吮吸肉棒真是太美味了…${sc()}已经…对精液迫不及待了呢………${heart(1)}）`,
        ); // :4678
        // CFLAG:361  = 4（变量语义：CFLAG 族，361） // :4679
        kojo.口交时自慰 = 4; // :4679
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.口交时自慰 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :4681
        await era.printAndWait(
          `「${scf()}、${sc()}…才不要一边自慰…一边帮你做那种事…呜…呜啊…呜…呜咕………」`,
        ); // :4682
        await era.print(`${target_name}被命令用口服侍${player_name}的阴茎，`); // :4683
        if (era.get(`tequip:${target}:11`) && era.get(`tequip:${target}:13`)) {
          // :4684
          await era.print(`两穴里的蠕虫蠕动着，自慰激烈地继续………`); // :4685
        } else if (era.get(`tequip:${target}:11`)) {
          // :4686
          await era.print(`小穴里的壶虫蠕动着，自慰激烈的继续………`); // :4687
        } else if (era.get(`tequip:${target}:13`)) {
          // :4688
          await era.print(`肛门里的肛门虫蠕动着，自慰激烈地继续………`); // :4689
        } else {
          // :4689-4690
          await era.print(`自慰仍在继续着………`); // :4691
        } // :4691-4692
        await era.printAndWait(`「呜呜…呜咕噜…哈啊…呜…呜咕…呜呜……！」`); // :4693
        await era.printAndWait(`（哎呀…${sc()}已经习惯了这样的事情了啊………）`); // :4694
        // CFLAG:361  = 3（变量语义：CFLAG 族，361） // :4695
        kojo.口交时自慰 = 3; // :4695
      } else if (kojo.口交时自慰 <= 1 || game.kojo.口上开关 === 2) {
        // :4697
        await era.printAndWait(
          `「呜…哈啊…哈啊…要${sc()}…做这样的事…呜呼…呜呜…呜哈啊咕咕……！」`,
        ); // :4698
        await era.print(`${target_name}被命令用口服侍${player_name}的阴茎，`); // :4699
        if (era.get(`tequip:${target}:11`) && era.get(`tequip:${target}:13`)) {
          // :4700
          await era.print(`两穴里的蠕虫蠕动着，自慰激烈地继续………`); // :4701
        } else if (era.get(`tequip:${target}:11`)) {
          // :4702
          await era.print(`小穴里的壶虫蠕动着，自慰激烈的继续………`); // :4703
        } else if (era.get(`tequip:${target}:13`)) {
          // :4704
          await era.print(`肛门里的肛门虫蠕动着，自慰激烈地继续………`); // :4705
        } else {
          // :4705-4706
          await era.print(`自慰仍在继续着………`); // :4707
        } // :4707-4708
        // CFLAG:361  = 2（变量语义：CFLAG 族，361） // :4709
        kojo.口交时自慰 = 2; // :4709
      } // :4709-4710
      return 0; // :4709-4711
    } // :4709-4712
  } // :4713-4716

  if (era_flag.selectcom === 126) {
    // :4718

    if (kojo.手搓口交 === 0) {
      // :4720

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :4722
        await era.printAndWait(
          `「啊啊啊想要精液！…请毫无顾虑的在${sc()}嘴里射满精液吧…${heart(1)}」`,
        ); // :4723
        await era.printAndWait(
          `这么说着的${target_name}一边用舌头舔着龟头，一边用手搓动着阴茎的根部………`,
        ); // :4724
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :4726
        await era.printAndWait(
          `「手上都是精液呢，不过${sc()}的嘴里也想被射满精液…${heart(1)}」`,
        ); // :4727
        await era.printAndWait(
          `${target_name}的舌头缠绕着阴茎，用手摩擦着根部………`,
        ); // :4728
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        // :4730
        await era.printAndWait(`「就这样一边吸一边摩擦吧…♪」`); // :4731
        await era.printAndWait(
          `${target_name}将${player_name}的阴茎用嘴吸吮着，同时用手搓动起来………`,
        ); // :4732
      } else {
        // :4734-4735
        await era.printAndWait(`「哈啊哈啊…做这种事情会让你很高兴吗！？」`); // :4735
        await era.printAndWait(
          `${target_name}将${player_name}的阴茎用嘴吸吮着，同时用手搓动起来………`,
        ); // :4736
      } // :4736-4737
      // CFLAG:TARGET:362  = 1（变量语义：CFLAG 族，TARGET:362） // :4738
      kojo.手搓口交 = 1; // :4738
      return 0; // :4738-4739
    } else {
      // :4741-4743

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.手搓口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4743
        await era.printAndWait(
          `「啊啊啊想要精液啊！…请毫无顾虑地在${sc()}嘴里射满精液吧…${heart(1)}」`,
        ); // :4744
        await era.printAndWait(
          `这么说着的${target_name}一边用舌头舔着龟头，一边用手搓动着阴茎的根部。`,
        ); // :4745
        await era.printAndWait(
          `「啊啊啊…忍着不让精液射出来会更满足吧${heart(1)} 呜哈呜啊…呜咕噜路${heart(1)}」`,
        ); // :4746
        // CFLAG:362  = 5（变量语义：CFLAG 族，362） // :4747
        kojo.手搓口交 = 5; // :4747
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.手搓口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4749
        await era.printAndWait(
          `「手上都是精液呢，不过${sc()}的嘴里也想被射满精液…${heart(1)}」`,
        ); // :4750
        await era.printAndWait(
          `${target_name}的舌头缠绕着阴茎，用手摩擦着根部。`,
        ); // :4751
        await era.printAndWait(
          `「哈啊${heart(1)}…呜啊呼${heart(1)}…这样就好了吧${heart(1)}…啊啊啊…像这样…${sc()}的身体也有些燥热了呢…${heart(1)}」`,
        ); // :4752
        // CFLAG:362  = 4（变量语义：CFLAG 族，362） // :4753
        kojo.手搓口交 = 4; // :4753
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.手搓口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :4755
        await era.printAndWait(`「就这样一边吸一边摩擦吧…♪」`); // :4756
        await era.printAndWait(
          `${target_name}将${player_name}的阴茎用嘴吸吮着，同时用手搓动起来………`,
        ); // :4757
        // CFLAG:362  = 3（变量语义：CFLAG 族，362） // :4758
        kojo.手搓口交 = 3; // :4758
      } else if (kojo.手搓口交 <= 1 || game.kojo.口上开关 === 2) {
        // :4760
        await era.printAndWait(`「哈啊哈啊…做这种事情会让你很高兴吗！？」`); // :4761
        await era.printAndWait(
          `${target_name}将${player_name}的阴茎用嘴吸吮着，同时用手搓动起来………`,
        ); // :4762
        // CFLAG:362  = 2（变量语义：CFLAG 族，362） // :4763
        kojo.手搓口交 = 2; // :4763
      } // :4763-4764
      return 0; // :4763-4765
    } // :4763-4766
  } // :4763-4767

  if (era_flag.selectcom === 127) {
    // :4774

    if (kojo.真空口交 === 0) {
      // :4776

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :4778
        await era.printAndWait(
          `「呜啊啊啊…啊呼…呜呼…${heart(1)}　呜…呜咕噜噜噜…哈啊…哈呜…${heart(1)}」`,
        ); // :4779
        await era.printAndWait(
          `${target_name}舔着嘴唇收缩口腔，一边发出下流的声音一边用力吸住${player_name}的阴茎………`,
        ); // :4780
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :4782
        await era.printAndWait(
          `「呜啊啊啊…啊呼…呜呼…呜…呜咕噜噜噜…哈啊…哈呜…${heart(1)}」`,
        ); // :4783
        await era.printAndWait(
          `${target_name}对插进来的阴茎爱不释口，故意发出下流的声音兴奋地引诱着………`,
        ); // :4784
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        // :4786
        await era.printAndWait(`「一大半都…呜呼…呜呜…真…真是不老实…呼呜呜…」`); // :4787
      } else {
        // :4789-4790
        await era.printAndWait(`「呜嗯呜咕咕…呜啊…呜…呜咕咕咕噜…！」`); // :4790
      } // :4790-4791
      // CFLAG:TARGET:363  = 1（变量语义：CFLAG 族，TARGET:363） // :4792
      kojo.真空口交 = 1; // :4792
      return 0; // :4792-4793
    } else {
      // :4795-4797

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.真空口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4797
        await era.printAndWait(
          `「不要停下…哈啊…咕噜噜…唔啊啊${heart(1)}…嘿…呼…咕噜噜噜噜 ${heart(1)}」`,
        ); // :4798
        await era.printAndWait(
          `${target_name}收缩口腔，一边发出下流的声音一边用力吸住${player_name}的阴茎………`,
        ); // :4799
        await era.printAndWait(
          `「呜呼呼…呜嗯…咕噜咕噜${heart(1)}…哈啊呜呜…呜啊呜啊${heart(1)}…哈啊啊啊啊${heart(1)}」`,
        ); // :4800
        // CFLAG:363  = 5（变量语义：CFLAG 族，363） // :4801
        kojo.真空口交 = 5; // :4801
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.真空口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4803
        await era.printAndWait(
          `「呜啊啊啊…啊呼…呜呼…呜…呜咕噜噜噜…哈啊…哈呜…${heart(1)}」`,
        ); // :4804
        await era.printAndWait(
          `${target_name}对插进来的阴茎爱不释口，故意发出下流的声音兴奋地引诱着………`,
        ); // :4805
        await era.printAndWait(
          `「停不下来了${heart(1)}…好棒…想一直继续下去${heart(1)}…呜呼啊啊啊啊${heart(1)}」`,
        ); // :4806
        // CFLAG:363  = 4（变量语义：CFLAG 族，363） // :4807
        kojo.真空口交 = 4; // :4807
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.真空口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :4809
        await era.printAndWait(`「一大半都…呜呼…呜呜…真…真是不老实…呼呜呜…」`); // :4810
        await era.printAndWait(
          `${target_name}那灵巧的舌头与阴茎纠缠着奏出一曲靡靡之音………`,
        ); // :4811
        // CFLAG:363  = 3（变量语义：CFLAG 族，363） // :4812
        kojo.真空口交 = 3; // :4812
      } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 === 2) {
        // :4814
        await era.printAndWait(`「呜嗯呜咕咕…呜啊…呜…呜咕咕咕噜…！！」`); // :4815
        await era.printAndWait(
          `${target_name}眼中含着泪吸吮着肉棒，不时发出下流的响声………`,
        ); // :4816
        // CFLAG:363  = 2（变量语义：CFLAG 族，363） // :4817
        kojo.真空口交 = 2; // :4817
      } // :4817-4818
      return 0; // :4817-4819
    } // :4817-4820
  } // :4821-4824

  if (era_flag.selectcom === 69) {
    // :4826

    if (kojo.六九式 === 0) {
      // :4828

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :4830
        await era.printAndWait(
          `「啊啊呜！ ${sc()}下面已经变得湿湿的了呢${heart(1)} 您的阴茎也很厉害呢${heart(1)}」`,
        ); // :4831
        await era.printAndWait(
          `${target_name}屁股左右摆动着把自己的小穴压在${player_name}脸上………`,
        ); // :4832
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :4834
        await era.printAndWait(
          `「啊啊…不要，这样太恶心了啦…${scf()}、${sc()}做那样的事…啊啊啊啊${heart(1)}」`,
        ); // :4835
        await era.printAndWait(
          `虽然这么说但${target_name}还是把股间暴露在${player_name}面前，发出轻轻的呻吟开始了口交服务。`,
        ); // :4836
        await era.printAndWait(`「呜…哈啊…呜咕…呜啊…呜嗯…${heart(1)}」`); // :4837
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        // :4839
        await era.printAndWait(`「呜…啊呜…差不多就行了吧…快要忍受不了了…！」`); // :4840
        await era.printAndWait(
          `${target_name}感受着下体传来的舌头的感觉，背部不由自主地颤抖着，开始用嘴舔舐阴茎………`,
        ); // :4841
      } else {
        // :4843-4844
        await era.printAndWait(
          `「啊啊啊…呜…停、停下…再不老实的话…就…就开始咬了啊………！」`,
        ); // :4844
        await era.printAndWait(
          `${target_name}感受着下体传来的舌头的感觉，背部不由自主地颤抖着，开始用嘴舔舐阴茎………`,
        ); // :4845
      } // :4845-4846
      // CFLAG:TARGET:364  = 1（变量语义：CFLAG 族，TARGET:364） // :4847
      kojo.六九式 = 1; // :4847
      return 0; // :4847-4848
    } else {
      // :4850-4852

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.六九式 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4852
        await era.printAndWait(
          `「啊啊呜！ ${sc()}下面已经变得湿湿的了呢${heart(1)} 您的阴茎也很厉害呢${heart(1)}」`,
        ); // :4853
        await era.printAndWait(
          `${target_name}屁股左右摆动着把自己的小穴压在${player_name}脸上………`,
        ); // :4854
        await era.printAndWait(
          `「呜…呜咕…下面被玩弄得，玩弄得好舒服…啊啊…啊呜${heart(1)} 呜啊…咕噜…${heart(1)}」`,
        ); // :4855
        // CFLAG:364  = 5（变量语义：CFLAG 族，364） // :4856
        kojo.六九式 = 5; // :4856
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.六九式 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4858
        await era.printAndWait(
          `「呜呜…再、再欺负我的话…就要咬人了啦…呜啊${heart(1)} 哈呜${heart(1)}」`,
        ); // :4859
        await era.printAndWait(
          `虽然这么说但${target_name}还是把股间暴露在${player_name}面前，发出轻轻的呻吟开始了口交服务。`,
        ); // :4860
        await era.printAndWait(
          `「啊啊啊…不、不要…已经不行了啊啊…哈呜${heart(1)} 啊啊呜…啊嗯…真讨厌～…${heart(1)}」`,
        ); // :4861
        await era.printAndWait(
          `${target_name}用嘴唇夹住阴茎，一边发出下流的声音一边吮吸着………`,
        ); // :4862
        // CFLAG:364  = 4（变量语义：CFLAG 族，364） // :4863
        kojo.六九式 = 4; // :4863
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.六九式 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :4865
        await era.printAndWait(
          `「呜…呜呜…这、这个程度已经够了啊啊…不要…唔啊唔嗯…哈啊…呜呜！！」`,
        ); // :4866
        await era.printAndWait(
          `${target_name}的小穴被舌头不知不觉地入侵，发出有些意外的呻吟。`,
        ); // :4867
        await era.printAndWait(`「就这样…呜咕…呜呜…还…还可以在激烈点…呼啊…」`); // :4868
        // CFLAG:364  = 3（变量语义：CFLAG 族，364） // :4869
        kojo.六九式 = 3; // :4869
      } else if (kojo.六九式 <= 1 || game.kojo.口上开关 === 2) {
        // :4871
        await era.printAndWait(
          `「啊啊啊…呜…停、停下…再不老实的话…就…就开始咬了啊………！」`,
        ); // :4872
        await era.printAndWait(
          `${target_name}感受着下体传来的舌头的感觉，背部不由自主地颤抖着，开始用嘴舔舐阴茎………`,
        ); // :4873
        await era.printAndWait(`「呜…哈啊…呜…咕…呜…呜呜！」`); // :4874
        // CFLAG:364  = 2（变量语义：CFLAG 族，364） // :4875
        kojo.六九式 = 2; // :4875
      } // :4875-4876
      return 0; // :4875-4877
    } // :4875-4878
  } // :4879-4882

  if (era_flag.selectcom === 124) {
    // :4884

    if (kojo.深喉 === 0) {
      // :4886

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :4888
        await era.printAndWait(
          `${target_name}被阴茎插入了喉咙最深处，潮湿的舌头缠绕着阴茎不断来回清扫。`,
        ); // :4889
        await era.printAndWait(
          `「别、别这样…呜呼${heart(1)}…咕噜…呜呜呜噜${heart(1)}…咕噜…呜呜呜咕咕${heart(1)}」`,
        ); // :4890
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :4892
        await era.printAndWait(
          `${target_name}带着幸福的神色放松喉咙将阴茎引了进来。`,
        ); // :4893
        await era.printAndWait(
          `「呜咕…咕噜…呜呜呜咕噜${heart(1)}…呜呜…咕噜噜噜噜${heart(1)}」`,
        ); // :4894
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        // :4896
        await era.printAndWait(`「呜咕…咕噜…呜呜呜咕噜…呜呜…咕噜噜噜噜…♪」`); // :4897
        await era.printAndWait(
          `${target_name}喘息变得粗重，将阴茎深深吞入口腔来回舔舐………`,
        ); // :4898
      } else {
        // :4900-4901
        await era.printAndWait(
          `「哈啊…要伸到…喉咙里这么深的地方…呜…呜咕咕噜…！」`,
        ); // :4901
        await era.printAndWait(
          `${target_name}脸部因为痛苦而有些扭曲，不情不愿地将阴茎吞入喉中………`,
        ); // :4902
      } // :4902-4903
      // CFLAG:TARGET:365  = 1（变量语义：CFLAG 族，TARGET:365） // :4904
      kojo.深喉 = 1; // :4904
      return 0; // :4904-4905
    } else {
      // :4907-4909

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.真空口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4909
        await era.printAndWait(
          `${target_name}被阴茎插入了喉咙最深处，潮湿的舌头缠绕着阴茎不断来回清扫。`,
        ); // :4910
        await era.printAndWait(
          `「别、别这样…呜呼${heart(1)}…咕噜…呜呜呜噜${heart(1)}…咕噜…呜呜呜咕咕${heart(1)}」`,
        ); // :4911
        await era.printAndWait(
          `（啊…就这样把肉棒全部吞下去${heart(1)} 连胃里也侵犯一番吧${heart(1)}）`,
        ); // :4912
        // CFLAG:365  = 5（变量语义：CFLAG 族，365） // :4913
        kojo.深喉 = 5; // :4913
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.真空口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4915
        await era.printAndWait(
          `${target_name}带着幸福的神色放松喉咙将阴茎引了进来。`,
        ); // :4916
        await era.printAndWait(
          `「呜咕…咕噜…呜呜呜咕噜${heart(1)}…呜呜…咕噜噜噜噜${heart(1)}」`,
        ); // :4917
        await era.printAndWait(
          `（这个大肉棒…全部是${sc()}的…谁也别想要抢…${heart(1)}）`,
        ); // :4918
        // CFLAG:365  = 4（变量语义：CFLAG 族，365） // :4919
        kojo.深喉 = 4; // :4919
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.真空口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :4921
        await era.printAndWait(`「呜咕…咕噜…呜呜呜咕噜…呜呜…咕噜噜噜噜…♪」`); // :4922
        await era.printAndWait(
          `${target_name}鼻息粗重地感受着阴茎在自己喉咙里来回往复。`,
        ); // :4923
        await era.printAndWait(`几次忍住呕吐的欲望吞吐着阴茎拼命地服侍着………`); // :4924
        // CFLAG:365  = 3（变量语义：CFLAG 族，365） // :4925
        kojo.深喉 = 3; // :4925
      } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 === 2) {
        // :4927
        await era.printAndWait(
          `「呜…呜呜…呜嗯呜嗯…知、知道了…这种肮脏的服务…呜…呜咕…！」`,
        ); // :4928
        await era.printAndWait(`${target_name}将阴茎勉勉强强地含在嘴里………`); // :4929
        // CFLAG:365  = 2（变量语义：CFLAG 族，365） // :4930
        kojo.深喉 = 2; // :4930
      } // :4930-4931
      return 0; // :4930-4932
    } // :4930-4933
  } // :4934-4937

  if (era_flag.selectcom === 80) {
    // :4939

    if (kojo.强制口交 === 0) {
      // :4941

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :4943
        await era.printAndWait(
          `「唔啊啊啊…呜呼！呼啊啊！啊啊啊…真是粗暴呢${heart(1)}…这样抓着头很痛啊…！啊啊呜！」`,
        ); // :4944
        await era.printAndWait(
          `虽然这样说着但${target_name}还是对${player_name}粗暴的突刺很是享受的样子………`,
        ); // :4945
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :4947
        await era.printAndWait(
          `「呜啊啊啊…${sc()}的嘴巴被当做飞机杯了吧…呜呜咕咕噜呜！？ 」`,
        ); // :4948
        await era.printAndWait(
          `${target_name}的头被抓住，阴茎粗鲁地挤进喉咙里，翻起了白眼………`,
        ); // :4949
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0
      ) {
        // :4951
        await era.printAndWait(
          `「住…住手！想把那样的脏东西放进${sc()}的嘴里吗…我、我会咬断它的…呜…呜咕咕咕咕咕！？」`,
        ); // :4952
        await era.printAndWait(
          `${target_name}的头被紧紧抓住阴茎不断地在她喉间耸动………`,
        ); // :4953
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        // :4955
        await era.printAndWait(
          `「啊呜咕…呜…呜…呜咕咕咕咕噜！？！？还、还要再来吗…呜咕噜！」`,
        ); // :4956
        await era.printAndWait(`${target_name}的喉咙深处被插入的阴茎动摇着………`); // :4957
      } else {
        // :4959-4960
        await era.printAndWait(
          `「啊啊啊…停、停下来…喉咙要受不了了…呜咕…呜啊啊啊…咕噜…咕噜！」`,
        ); // :4960
        await era.printAndWait(`${target_name}苦涩地应对着插到喉间的阴茎………`); // :4961
      } // :4961-4962
      // CFLAG:TARGET:381  = 1（变量语义：CFLAG 族，TARGET:381） // :4963
      kojo.强制口交 = 1; // :4963
      return 0; // :4963-4964
    } else {
      // :4966-4968

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.强制口交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :4968
        await era.printAndWait(
          `${player_name}抓住${target_name}的头，激烈地耸动着腰，侵犯她的嘴巴。`,
        ); // :4969
        await era.printAndWait(
          `「呜咕…哈啊呜呜${heart(1)}…咕噜咕噜${heart(1)}…咕噜咕噜呜噜呜噜${heart(1)}」`,
        ); // :4970
        await era.printAndWait(
          `已经品尝到阴茎美味的${target_name}边流着泪边露出愉悦的表情………`,
        ); // :4971
        // CFLAG:381  = 6（变量语义：CFLAG 族，381） // :4972
        kojo.强制口交 = 6; // :4972
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.强制口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4974
        await era.printAndWait(
          `「什么啊！？…不…别这样嘛…呜呜…呜咕咕咕咕${heart(1)}」`,
        ); // :4975
        await era.printAndWait(
          `${target_name}喉咙被突入最深处，眼神中露出一丝放荡。`,
        ); // :4976
        await era.printAndWait(
          `「啊呜…呜呜咕噜…${sc()}的嘴巴真是幸福呢…${heart(1)} 呜呜咕咕咕咕噜噜${heart(1)}」`,
        ); // :4977
        // CFLAG:381  = 5（变量语义：CFLAG 族，381） // :4978
        kojo.强制口交 = 5; // :4978
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0 &&
        (kojo.强制口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4980
        await era.printAndWait(
          `「呜呜…呜咕！我的脸颊…快、快住手啊…我真的咬了……呜！呜呜咕噜！」`,
        ); // :4981
        await era.printAndWait(
          `${target_name}摇着头想反抗却被捏住鼻子强行把阴茎伸进了嘴里，只能无奈地忍受嘴里抽动的的阴茎。`,
        ); // :4982
        await era.printAndWait(
          `「呜呼…呜…呜咕…咕噜…已、已经…咕啊啊啊啊啊呜…呜呜！！！」`,
        ); // :4983
        // CFLAG:381  = 4（变量语义：CFLAG 族，381） // :4984
        kojo.强制口交 = 4; // :4984
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.强制口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :4986
        await era.printAndWait(
          `${target_name}的喉咙深处被插入的阴茎卡得动弹不得………`,
        ); // :4987
        await era.printAndWait(
          `「再、再这样粗暴的话…就要吐出来了………唔咕咕咕…呜咕噜噜噜！」`,
        ); // :4988
        // CFLAG:381  = 3（变量语义：CFLAG 族，381） // :4989
        kojo.强制口交 = 3; // :4989
      } else if (kojo.强制口交 <= 1 || game.kojo.口上开关 === 2) {
        // :4991
        await era.printAndWait(
          `「哈啊哈啊…我会老实的，所以快点结束吧…呜啊！呜呜咕咕咕咕噜！」`,
        ); // :4992
        await era.printAndWait(
          `${target_name}痛苦地忍耐着在喉咙深处不断抽插的阴茎………`,
        ); // :4993
        // CFLAG:381  = 2（变量语义：CFLAG 族，381） // :4994
        kojo.强制口交 = 2; // :4994
      } // :4994-4995
      return 0; // :4994-4996
    } // :4994-4997
  } // :4998-5001

  if (era_flag.selectcom === 87) {
    // :5005

    if (kojo.穿环 === 0) {
      // :5008

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :5010

        if (chara(target).train.穿环状态 & P) {
          // :5012

          if (P === 1) {
            // :5014
            await era.printAndWait(
              `「哈～哈～乳头被穿上这么可爱的环……真高兴啊…${heart(1)}」`,
            ); // :5015
            await era.printAndWait(
              `${target_name}忍受着乳头穿刺的疼痛，好像因为被穿环而愉悦着……`,
            ); // :5016
          } else if (P === 2) {
            // :5018
            await era.printAndWait(
              `「嘻嘻～这样的话，以后都一直穿着露脐装吧？」`,
            ); // :5019
            await era.printAndWait(
              `${target_name}忍受着肚脐穿刺的疼痛，好像因为被穿环而愉悦着……`,
            ); // :5020
          } else if (P === 4) {
            // :5022
            await era.printAndWait(
              `「啊…${sc()}…连被这样弄，也有感觉了………${heart(1)}」`,
            ); // :5023
            await era.printAndWait(
              `${target_name}忍受着阴唇穿刺的疼痛，好像因为被穿环而愉悦着……`,
            ); // :5024
          } else if (P === 8) {
            // :5026
            if (
              era.get(`talent:${target}:121`) ||
              0 ||
              era.get(`talent:${target}:122`) ||
              0
            ) {
              // :5027
              await era.printAndWait(
                `「鸡鸡变得这么好看了呢…非常感谢～${heart(1)}」`,
              ); // :5028
              await era.printAndWait(
                `${target_name}忍受着阴茎穿刺的疼痛，好像因为被穿环而愉悦着……`,
              ); // :5029
            } else {
              // :5029-5030
              await era.printAndWait(
                `「啊、啊…得到这么漂亮的环…小豆豆也有感觉了～${heart(1)}」`,
              ); // :5031
              await era.printAndWait(
                `${target_name}忍受着阴蒂穿刺的疼痛，好像因为被穿环而愉悦着……`,
              ); // :5032
            } // :5032-5033
          } else if (P === 16) {
            // :5035
            await era.printAndWait(
              `「唔…哦～这样子，口交的时候，就会更舒服了～…${heart(1)}」`,
            ); // :5036
            await era.printAndWait(
              `${target_name}忍受着舌头穿刺的疼痛，好像因为被穿环而愉悦着……`,
            ); // :5037
          } else if (P === 32) {
            // :5039
            await era.printAndWait(
              `「唔…这个环真适合我…哈哈～………${heart(1)}」`,
            ); // :5040
            await era.printAndWait(
              `${target_name}用舌头舔舐着自己刚被穿环的嘴唇……`,
            ); // :5041
          } else if (P === 64) {
            // :5043
            await era.printAndWait(`「这，这个有点…不好意思………」`); // :5044
            await era.printAndWait(
              `${target_name}害羞地转过了头，不让你看到被穿环的鼻子……`,
            ); // :5045
          } // :5045-5046
        } else {
          // :5048-5049
          await era.printAndWait(`${target_name}抚摸着之前被穿环的地方……`); // :5049
        } // :5049-5050
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :5052

        if (chara(target).train.穿环状态 & P) {
          // :5054

          if (P === 1) {
            // :5056
            await era.printAndWait(
              `「啊！…漂亮的环…如果这是订婚戒指的话…该多好啊………${heart(1)}」`,
            ); // :5057
            await era.printAndWait(
              `${target_name}忍受着乳头穿刺的疼痛，好像看着闪闪发亮的乳环陷入了妄想之中……`,
            ); // :5058
          } else if (P === 2) {
            // :5060
            await era.printAndWait(`「嗯…肚脐竟然………不过，好漂亮呢～………♪」`); // :5061
            await era.printAndWait(`${target_name}在脐环周围摩挲着。`); // :5062
          } else if (P === 4) {
            // :5064
            await era.printAndWait(
              `「这，这种地方被上环的话…${scf()}、${sc()}…会变奇怪的啦！………」`,
            ); // :5065
            await era.printAndWait(
              `${target_name}嘴上说不要，身体却老老实实地开始发烫了。`,
            ); // :5066
          } else if (P === 8) {
            // :5068
            if (
              era.get(`talent:${target}:121`) ||
              0 ||
              era.get(`talent:${target}:122`) ||
              0
            ) {
              // :5069
              await era.printAndWait(
                `「啊～鸡鸡被这么漂亮地装饰着……十分感谢～！…♪」`,
              ); // :5070
              await era.printAndWait(
                `${target_name}因阴茎被穿环，气息变得炽热了。`,
              ); // :5071
            } else {
              // :5071-5072
              await era.printAndWait(
                `「连这种地方都得到了赏赐…${scf()}、${sc()}…已经不能没有魔王大人了～${heart(1)}」`,
              ); // :5073
              await era.printAndWait(`${target_name}红着脸兴奋地说到。`); // :5074
            } // :5074-5075
          } else if (P === 16) {
            // :5077
            await era.printAndWait(
              `「呢～…魔王大人哦～…来和${sc()}接吻嘛～…来感受一下${sc()}的舌头～…♪」`,
            ); // :5078
            await era.printAndWait(
              `${target_name}伸出被穿环的舌头，引诱着${player_name}………`,
            ); // :5079
          } else if (P === 32) {
            // :5081
            await era.printAndWait(
              `「嘿嘿嘿…曾经也到过一些地方，以这样子为时尚呢～♪」`,
            ); // :5082
            await era.printAndWait(
              `${target_name}用舌头舔舐着自己刚被穿环的嘴唇……`,
            ); // :5083
          } else if (P === 64) {
            // :5085
            await era.printAndWait(`「讨，讨厌啦～…在这里穿环什么的………」`); // :5086
            await era.printAndWait(
              `${target_name}害羞地转过了头，不让你看到被穿环的鼻子……`,
            ); // :5087
          } // :5087-5088
        } else {
          // :5090-5091
          await era.printAndWait(`${target_name}抚摸着之前被穿环的地方……`); // :5091
        } // :5091-5092
      } else {
        // :5094-5096

        if (chara(target).train.穿环状态 & P) {
          // :5096

          if (P === 1) {
            // :5098
            await era.printAndWait(
              `「唔呀呀！…${sc()}要开始讨厌你啦…！放过乳头啊！～！」`,
            ); // :5099
            await era.printAndWait(
              `${target_name}因为乳头的疼痛和屈辱而流下了泪水……`,
            ); // :5100
          } else if (P === 2) {
            // :5102
            await era.printAndWait(`「这、这种样子……只是一种时尚………」`); // :5103
            await era.printAndWait(`${target_name}因肚脐的痛楚泪眼婆娑了………`); // :5104
          } else if (P === 4) {
            // :5106
            await era.printAndWait(
              `「在这种地方上环？！…啊啊！…${sc()}已经……………」`,
            ); // :5107
            await era.printAndWait(
              `${target_name}因为阴唇的疼痛和屈辱而流下了泪水……`,
            ); // :5108
          } else if (P === 8) {
            // :5110
            if (
              era.get(`talent:${target}:121`) ||
              0 ||
              era.get(`talent:${target}:122`) ||
              0
            ) {
              // :5111
              await era.printAndWait(
                `「呜呜…呜呜…呜呜喔…为……为什么要被做这样的事………」`,
              ); // :5112
              await era.printAndWait(
                `${target_name}因为阴茎的疼痛和屈辱而流下了泪水……`,
              ); // :5113
            } else {
              // :5113-5114
              await era.printAndWait(
                `「呜呜…呜呜…呜呜喔…被……被做这样的事………已经……嫁不出去了啦…………」`,
              ); // :5115
              await era.printAndWait(
                `${target_name}因为阴蒂的疼痛和屈辱而流下了泪水……`,
              ); // :5116
            } // :5116-5117
          } else if (P === 16) {
            // :5119
            await era.printAndWait(
              `「放……放过……我……我以后再也不说……您的坏话了………」`,
            ); // :5120
            await era.printAndWait(`${target_name}因为舌环，口齿不清了……`); // :5121
          } else if (P === 32) {
            // :5123
            await era.printAndWait(`「连嘴唇也不放过………」`); // :5124
            await era.printAndWait(
              `${target_name}的唇上被穿了环，流下了屈辱的泪水……`,
            ); // :5125
          } else if (P === 64) {
            // :5127
            await era.printAndWait(
              `「${scf()}、${sc()}才不是家畜！！………呜呜！」`,
            ); // :5128
            await era.printAndWait(
              `${target_name}屈辱地转过了头，不让你看到被穿环的鼻子，嚎啕大哭着……`,
            ); // :5129
          } // :5129-5130
        } else {
          // :5132-5133
          await era.printAndWait(`${target_name}抚摸着之前被穿环的地方……`); // :5133
        } // :5133-5134
      } // :5135-5136
      // CFLAG:TARGET:348  = 1（变量语义：CFLAG 族，TARGET:348） // :5136
      kojo.穿环 = 1; // :5136
      return 0; // :5136-5137
    } else {
      // :5139-5141

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.穿环 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5141

        if (chara(target).train.穿环状态 & P) {
          // :5143

          if (P === 1) {
            // :5145
            await era.printAndWait(
              `「哈～哈～乳头被穿上这么可爱的环……真高兴啊…${heart(1)}」`,
            ); // :5146
            await era.printAndWait(
              `${target_name}忍受着乳头穿刺的疼痛，好像因为被穿环而愉悦着……`,
            ); // :5147
          } else if (P === 2) {
            // :5149
            await era.printAndWait(
              `「嘻嘻～这样的话，以后都一直穿着露脐装吧？」`,
            ); // :5150
            await era.printAndWait(
              `${target_name}忍受着肚脐穿刺的疼痛，好像因为被穿环而愉悦着……`,
            ); // :5151
          } else if (P === 4) {
            // :5153
            await era.printAndWait(
              `「啊……被这么弄的话，${sc()}以后只能和变态做爱的嘛…${heart(1)}」`,
            ); // :5154
            await era.printAndWait(
              `${target_name}忍受着阴唇穿刺的疼痛，好像因为被穿环而愉悦着……`,
            ); // :5155
          } else if (P === 8) {
            // :5157
            if (
              era.get(`talent:${target}:121`) ||
              0 ||
              era.get(`talent:${target}:122`) ||
              0
            ) {
              // :5158
              await era.printAndWait(
                `「鸡鸡变得这么好看了呢…非常感谢～${heart(1)}」`,
              ); // :5159
              await era.printAndWait(
                `${target_name}忍受着阴茎穿刺的疼痛，好像因为被穿环而愉悦着……`,
              ); // :5160
            } else {
              // :5160-5161
              await era.printAndWait(
                `「啊、啊…得到这么漂亮的环…小豆豆也有感觉了～${heart(1)}」`,
              ); // :5162
              await era.printAndWait(
                `${target_name}忍受着阴蒂穿刺的疼痛，好像因为被穿环而愉悦着……`,
              ); // :5163
            } // :5163-5164
          } else if (P === 16) {
            // :5166
            await era.printAndWait(
              `「唔…哦～这样子，口交的时候，就会更舒服了～…${heart(1)}」`,
            ); // :5167
            await era.printAndWait(
              `${target_name}忍受着舌头穿刺的疼痛，好像因为被穿环而愉悦着……`,
            ); // :5168
          } else if (P === 32) {
            // :5170
            await era.printAndWait(
              `「呵呵，嘴唇和环，意外地相衬呢…${heart(1)}」`,
            ); // :5171
            await era.printAndWait(
              `${target_name}用舌头舔舐着自己刚被穿环的嘴唇……`,
            ); // :5172
          } else if (P === 64) {
            // :5174
            await era.printAndWait(
              `「鼻…鼻子穿了环的话，显得我更加可爱了吗……？…」`,
            ); // :5175
            await era.printAndWait(`${target_name}有点不好意思地摸着鼻子……`); // :5176
          } // :5176-5177
        } else {
          // :5179-5180
          await era.printAndWait(`${target_name}抚摸着之前被穿环的地方……`); // :5180
        } // :5180-5181
        // CFLAG:348  = 4（变量语义：CFLAG 族，348） // :5182
        kojo.穿环 = 4; // :5182
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.穿环 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :5184

        if (chara(target).train.穿环状态 & P) {
          // :5186

          if (P === 1) {
            // :5188
            await era.printAndWait(
              `「嘻嘻～魔王大人啊～两边都可以尽情地玩弄哦！……${heart(1)}」`,
            ); // :5189
            await era.printAndWait(`${target_name}晃动着胸前的环……`); // :5190
          } else if (P === 2) {
            // :5192
            await era.printAndWait(`「嗯…肚脐竟然………不过，好漂亮呢～………♪」`); // :5193
            await era.printAndWait(`${target_name}在脐环周围摩挲着。`); // :5194
          } else if (P === 4) {
            // :5196
            await era.printAndWait(
              `「这，这种地方也被上环的话……已经不能和魔王大人以外的对象做爱啦！…${heart(1)}」`,
            ); // :5197
            await era.printAndWait(`${target_name}看着闪闪发亮的环出神了…………`); // :5198
          } else if (P === 8) {
            // :5200
            if (
              era.get(`talent:${target}:121`) ||
              0 ||
              era.get(`talent:${target}:122`) ||
              0
            ) {
              // :5201
              await era.printAndWait(
                `「啊～鸡鸡被这么漂亮地装饰着……十分感谢～！…♪」`,
              ); // :5202
              await era.printAndWait(
                `${target_name}因阴茎被穿环，气息变得炽热了。`,
              ); // :5203
            } else {
              // :5203-5204
              await era.printAndWait(
                `「这样的地方也被穿环了啊…魔王大人，要对人家负责啊～${heart(1)}」`,
              ); // :5205
              await era.printAndWait(`${target_name}红着脸兴奋地说到。`); // :5206
            } // :5206-5207
          } else if (P === 16) {
            // :5209
            await era.printAndWait(
              `「呢～…魔王大人哦～…来和${sc()}接吻嘛～…来感受一下${sc()}的舌头～…♪」`,
            ); // :5210
            await era.printAndWait(
              `${target_name}伸出被穿环的舌头，引诱着${player_name}………`,
            ); // :5211
          } else if (P === 32) {
            // :5213
            await era.printAndWait(
              `「嘿嘿嘿…曾经也到过一些地方，以这样子为时尚呢～♪」`,
            ); // :5214
            await era.printAndWait(
              `${target_name}用舌头舔舐着自己刚被穿环的嘴唇……`,
            ); // :5215
          } else if (P === 64) {
            // :5217
            await era.printAndWait(`「讨，讨厌啦～…在这里穿环什么的………」`); // :5218
            await era.printAndWait(
              `${target_name}害羞地转过了头，不让你看到被穿环的鼻子……`,
            ); // :5219
          } // :5219-5220
        } else {
          // :5222-5223
          await era.printAndWait(`${target_name}抚摸着之前被穿环的地方……`); // :5223
        } // :5223-5224
        // CFLAG:348  = 3（变量语义：CFLAG 族，348） // :5225
        kojo.穿环 = 3; // :5225
      } else if (kojo.穿环 <= 1 || game.kojo.口上开关 === 2) {
        // :5227

        if (chara(target).train.穿环状态 & P) {
          // :5229

          if (P === 1) {
            // :5231
            await era.printAndWait(
              `「唔呀呀！…${sc()}要开始讨厌你啦…！放过乳头啊！～！」`,
            ); // :5232
            await era.printAndWait(
              `${target_name}因为乳头的疼痛和屈辱而流下了泪水……`,
            ); // :5233
          } else if (P === 2) {
            // :5235
            await era.printAndWait(`「这，这种样子……只是一种时尚………」`); // :5236
            await era.printAndWait(`${target_name}因肚脐的痛楚泪眼婆娑了………`); // :5237
          } else if (P === 4) {
            // :5239
            await era.printAndWait(
              `「在这种地方上环？！…啊啊！…${sc()}已经……………」`,
            ); // :5240
            await era.printAndWait(
              `${target_name}因为阴唇的疼痛和屈辱而流下了泪水……`,
            ); // :5241
          } else if (P === 8) {
            // :5243
            if (
              era.get(`talent:${target}:121`) ||
              0 ||
              era.get(`talent:${target}:122`) ||
              0
            ) {
              // :5244
              await era.printAndWait(
                `「呜呜…呜呜…呜呜喔…为……为什么要被做这样的事………」`,
              ); // :5245
              await era.printAndWait(
                `${target_name}因为阴茎的疼痛和屈辱而流下了泪水……`,
              ); // :5246
            } else {
              // :5246-5247
              await era.printAndWait(
                `「呜呜…呜呜…呜呜喔…被……被做这样的事………已经……嫁不出去了啦…………」`,
              ); // :5248
              await era.printAndWait(
                `${target_name}因为阴蒂的疼痛和屈辱而流下了泪水……`,
              ); // :5249
            } // :5249-5250
          } else if (P === 16) {
            // :5252
            await era.printAndWait(
              `「放……放过……我……我以后再也不说……您的坏话了………」`,
            ); // :5253
            await era.printAndWait(`${target_name}因为舌环，口齿不清了……`); // :5254
          } else if (P === 32) {
            // :5256
            await era.printAndWait(`「连嘴唇也不放过………」`); // :5257
            await era.printAndWait(
              `${target_name}的唇上被穿了环，流下了屈辱的泪水……`,
            ); // :5258
          } else if (P === 64) {
            // :5260
            await era.printAndWait(
              `「${scf()}、${sc()}才不是家畜！！………呜呜！」`,
            ); // :5261
            await era.printAndWait(
              `${target_name}屈辱地转过了头，不让你看到被穿环的鼻子，嚎啕大哭着……`,
            ); // :5262
          } // :5262-5263
        } else {
          // :5265-5266
          await era.printAndWait(`${target_name}抚摸着之前被穿环的地方……`); // :5266
        } // :5266-5267
        // CFLAG:348  = 2（变量语义：CFLAG 族，348） // :5268
        kojo.穿环 = 2; // :5268
      } // :5268-5269
    } // :5268-5270
    return 0; // :5268-5271
  } // :5272-5275
}

// @DOG_KOJO_6 // :5278

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
    // :5283

    if (kojo.爱抚 === 0) {
      // :5285

      if ((era.get(`mark:${target}:2`) || 0) >= 2) {
        // :5287
        await era.printAndWait(`「啊…狗…」`); // :5288
      } else {
        // :5290-5291
        await era.printAndWait(`「滚开！　你这蠢狗！」`); // :5291
      } // :5291-5292
      // CFLAG:301  = 1（变量语义：CFLAG 族，301） // :5293
      kojo.爱抚 = 1; // :5293
      return 0; // :5293-5294
    } else {
      // :5296-5298

      if (
        (era.get(`talent:${target}:136`) || 0) === 1 &&
        (kojo.爱抚 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :5298
        await era.printAndWait(`「啊啊啊♪　可爱的狗狗♪」`); // :5299
        // CFLAG:301  = 7（变量语义：CFLAG 族，301） // :5300
        kojo.爱抚 = 7; // :5300
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :5302
        await era.printAndWait(`「狗也不错嘛…」`); // :5303
        // CFLAG:301  = 6（变量语义：CFLAG 族，301） // :5304
        kojo.爱抚 = 6; // :5304
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :5306
        await era.printAndWait(`「…兽类么」`); // :5307
        // CFLAG:301  = 5（变量语义：CFLAG 族，301） // :5308
        kojo.爱抚 = 5; // :5308
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5310
        await era.printAndWait(`「不…」`); // :5311
        // CFLAG:301  = 4（变量语义：CFLAG 族，301） // :5312
        kojo.爱抚 = 4; // :5312
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 2 &&
        (kojo.爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :5314
        await era.printAndWait(`「混蛋！住手！」`); // :5315
        // CFLAG:301  = 3（变量语义：CFLAG 族，301） // :5316
        kojo.爱抚 = 3; // :5316
      } else if (
        (era.get(`mark:${target}:2`) || 0) <= 1 &&
        (kojo.爱抚 <= 1 || game.kojo.口上开关 === 2)
      ) {
        // :5318
        await era.printAndWait(`「你这死狗！」`); // :5319
        // CFLAG:301  = 2（变量语义：CFLAG 族，301） // :5320
        kojo.爱抚 = 2; // :5320
      } // :5320-5321
      return 0; // :5320-5322
    } // :5320-5323
  } // :5324-5327

  if (era_flag.selectcom === 1) {
    // :5329

    if (kojo.舔阴 === 0) {
      // :5331

      if ((era.get(`talent:${target}:0`) || 0) === 1) {
        // :5333
        await era.printAndWait(''); // :5334
      } else {
        // :5333-5336
        await era.printAndWait(''); // :5337
      } // :5338-5339
      // CFLAG:302  = 1（变量语义：CFLAG 族，302） // :5339
      kojo.舔阴 = 1; // :5339
      return 0; // :5339-5340
    } else {
      // :5342-5344

      if (
        (era.get(`talent:${target}:136`) || 0) === 1 &&
        (kojo.舔阴 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :5344
        await era.printAndWait(`「啊啊啊啊、很舒服呢…♪」`); // :5345
        // CFLAG:302  = 6（变量语义：CFLAG 族，302） // :5346
        kojo.舔阴 = 6; // :5346
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.舔阴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :5348
        await era.printAndWait(`「…用力点舔吧……」`); // :5349
        // CFLAG:302  = 5（变量语义：CFLAG 族，302） // :5350
        kojo.舔阴 = 5; // :5350
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.舔阴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5352
        await era.printAndWait(`「…嗯嗯」`); // :5353
        // CFLAG:302  = 4（变量语义：CFLAG 族，302） // :5354
        kojo.舔阴 = 4; // :5354
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.舔阴 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :5356
        await era.printAndWait(`「不…」`); // :5357
        // CFLAG:302  = 3（变量语义：CFLAG 族，302） // :5358
        kojo.舔阴 = 3; // :5358
      } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 === 2) {
        // :5360
        await era.printAndWait(`「滚开！　禽兽！」`); // :5361
        // CFLAG:302  = 2（变量语义：CFLAG 族，302） // :5362
        kojo.舔阴 = 2; // :5362
      } // :5362-5363
      return 0; // :5362-5364
    } // :5362-5365
  } // :5362-5366

  if (era_flag.selectcom === 5) {
    // :5372

    if (kojo.胸爱抚 === 0) {
      // :5374

      if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :5376
        await era.printAndWait(''); // :5377
      } else {
        // :5378-5379
        await era.printAndWait(''); // :5380
      } // :5381-5382
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306） // :5382
      kojo.胸爱抚 = 1; // :5382
      return 0; // :5382-5383
    } else {
      // :5385-5387

      if (
        (era.get(`talent:${target}:136`) || 0) === 1 &&
        (kojo.胸爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :5387
        await era.printAndWait(''); // :5388
        // CFLAG:306  = 6（变量语义：CFLAG 族，306） // :5389
        kojo.胸爱抚 = 6; // :5389
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :5391
        await era.printAndWait(''); // :5392
        // CFLAG:306  = 5（变量语义：CFLAG 族，306） // :5393
        kojo.胸爱抚 = 5; // :5393
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5395
        await era.printAndWait(''); // :5396
        // CFLAG:306  = 4（变量语义：CFLAG 族，306） // :5397
        kojo.胸爱抚 = 4; // :5397
      } else if (
        (era.get(`abl:${target}:1`) || 0) >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :5399
        await era.printAndWait(''); // :5400
        // CFLAG:306  = 3（变量语义：CFLAG 族，306） // :5401
        kojo.胸爱抚 = 3; // :5401
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
        // :5403
        await era.printAndWait(''); // :5404
        // CFLAG:306  = 2（变量语义：CFLAG 族，306） // :5405
        kojo.胸爱抚 = 2; // :5405
      } // :5405-5406
      return 0; // :5405-5407
    } // :5405-5408
  } // :5409-5412

  if (era_flag.selectcom === 6) {
    // :5414

    if (kojo.接吻 === 0 && game.train.初吻与自我口上) {
      // :5416

      if ((era.get(`talent:${target}:136`) || 0) === 1) {
        // :5418
        await era.printAndWait(`「初吻…献给狗先生了呢…♪」`); // :5419
      } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :5421
        await era.printAndWait(''); // :5422
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :5424
        await era.printAndWait(''); // :5425
      } else {
        // :5424-5427
        await era.printAndWait(''); // :5428
      } // :5429-5430
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :5430
      kojo.接吻 = 1; // :5430
      return 0; // :5430-5431
    } else if (kojo.接吻 === 0) {
      // :5433

      if ((era.get(`talent:${target}:136`) || 0) === 1) {
        // :5435
        await era.printAndWait(`「和狗先生接吻…♪」`); // :5436
      } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :5438
        await era.printAndWait(`「狗啊……」`); // :5439
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :5441
        await era.printAndWait(`「狗…？」`); // :5442
      } else {
        // :5442-5444
        await era.printAndWait(''); // :5445
      } // :5446-5447
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :5447
      kojo.接吻 = 1; // :5447
      return 0; // :5447-5448
    } else {
      // :5450-5452

      if (
        (era.get(`talent:${target}:136`) || 0) === 1 &&
        (kojo.接吻 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :5452
        await era.printAndWait(`「狗先生啊…咕咕…」`); // :5453
        // CFLAG:307  = 6（变量语义：CFLAG 族，307） // :5454
        kojo.接吻 = 6; // :5454
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.接吻 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :5456
        await era.printAndWait(`「狗啊……」`); // :5457
        // CFLAG:307  = 5（变量语义：CFLAG 族，307） // :5458
        kojo.接吻 = 5; // :5458
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.接吻 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5460
        await era.printAndWait(`「狗…？」`); // :5461
        // CFLAG:307  = 4（变量语义：CFLAG 族，307） // :5462
        kojo.接吻 = 4; // :5462
      } else if (
        (era.get(`abl:${target}:10`) || 0) >= 2 &&
        (kojo.接吻 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :5464
        await era.printAndWait(`「住、住手啊…」`); // :5465
        // CFLAG:307  = 3（变量语义：CFLAG 族，307） // :5466
        kojo.接吻 = 3; // :5466
      } else if (kojo.接吻 <= 1 || game.kojo.口上开关 === 2) {
        // :5468
        await era.printAndWait(`「无法接受…死也不能接受啊…」`); // :5469
        // CFLAG:307  = 2（变量语义：CFLAG 族，307） // :5470
        kojo.接吻 = 2; // :5470
      } // :5470-5471
      return 0; // :5470-5472
    } // :5470-5473
  } // :5474-5477

  if (era_flag.selectcom === 9) {
    // :5479

    if (kojo.舔肛 === 0) {
      // :5481

      if ((era.get(`talent:${target}:136`) || 0) === 1) {
        // :5483
        await era.printAndWait(`「要被舔肛门吗…？」`); // :5484
      } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :5486
        await era.printAndWait(`「要被舔肛门吗…？」`); // :5487
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :5489
        await era.printAndWait(`「屁股…吗」`); // :5490
      } else {
        // :5491-5492
        await era.printAndWait(''); // :5493
      } // :5494-5495
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310） // :5495
      kojo.舔肛 = 1; // :5495
      return 0; // :5495-5496
    } else {
      // :5498-5500

      if (
        (era.get(`talent:${target}:136`) || 0) === 1 &&
        (kojo.舔肛 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :5500
        await era.printAndWait(`「屁股融化了…」`); // :5501
        // CFLAG:310  = 6（变量语义：CFLAG 族，310） // :5502
        kojo.舔肛 = 6; // :5502
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :5504
        await era.printAndWait(`「狗的呼吸…」`); // :5505
        // CFLAG:310  = 5（变量语义：CFLAG 族，310） // :5506
        kojo.舔肛 = 5; // :5506
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.舔肛 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5508
        await era.printAndWait(`「感觉很奇怪啊」`); // :5509
        // CFLAG:310  = 4（变量语义：CFLAG 族，310） // :5510
        kojo.舔肛 = 4; // :5510
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.舔肛 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :5512
        await era.printAndWait(`「不…不…」`); // :5513
        // CFLAG:310  = 3（变量语义：CFLAG 族，310） // :5514
        kojo.舔肛 = 3; // :5514
      } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 === 2) {
        // :5516
        await era.printAndWait(`「混蛋！　住手啊你这贱狗！」`); // :5517
        // CFLAG:310  = 2（变量语义：CFLAG 族，310） // :5518
        kojo.舔肛 = 2; // :5518
      } // :5518-5519
      return 0; // :5518-5520
    } // :5518-5521
  } // :5522-5525

  if (era_flag.selectcom === 21) {
    // :5527

    if (kojo.背后位 === 0) {
      // :5529

      if ((era.get(`talent:${target}:0`) || 0) === 1) {
        // :5531

        if ((era.get(`talent:${target}:136`) || 0) === 1) {
          // :5533
          await era.printAndWait(`「献给狗先生…很荣幸呢♪」`); // :5534
        } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
          // :5536
          await era.printAndWait(`「需要一定的勇气啊」`); // :5537
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          // :5539
          await era.printAndWait(`「和狗做这种事情…太过分了」`); // :5540
        } else {
          // :5540-5543
          await era.printAndWait(''); // :5544
        } // :5545-5549
      } else {
        // :5547-5549

        if ((era.get(`talent:${target}:136`) || 0) === 1) {
          // :5549
          await era.printAndWait(`「和狗先生交配呢♪」`); // :5550
        } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
          // :5552
          await era.printAndWait(`「有点不太对劲吧？」`); // :5553
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          // :5555
          await era.printAndWait(`「狗吗…」`); // :5556
        } else {
          // :5556-5558
          await era.printAndWait(''); // :5559
        } // :5560-5562
      } // :5561-5562
      // CFLAG:322  = 1（变量语义：CFLAG 族，322） // :5562
      kojo.背后位 = 1; // :5562
      return 0; // :5562-5563
    } else {
      // :5565-5567

      if (
        (era.get(`talent:${target}:136`) || 0) === 1 &&
        (kojo.背后位 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :5567
        if (rand_n(3) === 0) {
          // :5568
          await era.printAndWait(`${target_name}像野兽般呻吟着，摇摆着下体。`); // :5569
          await era.printAndWait(
            `「啊狗先生！　我已经、沉溺在做母狗的快乐里了！请射在我体内吧♪」`,
          ); // :5570
          await era.printAndWait(`两只野兽纠缠着，享受这欲望的快感`); // :5571
        } else if (rand_n(2) === 0) {
          // :5572
          await era.printAndWait(
            `${target_name}一边吮吸着野狗的舌头，承受着身后大肉棒的侵袭`,
          ); // :5573
          await era.printAndWait(`「汪！　汪汪！　啊呼…♪」`); // :5574
          await era.printAndWait(
            `哪里还找得到曾经的高傲，如今不过是一头淫兽罢了`,
          ); // :5575
        } else {
          // :5575-5576
          await era.printAndWait(`${target_name}和野兽激烈地碰撞着`); // :5577
          await era.printAndWait(
            `「${sc()}、是狗先生的奴隶！　请饲养${sc()}吧♪　拜托了♪」`,
          ); // :5578
          await era.printAndWait(
            `这谄媚地望向野狗的身姿，已经找不到曾经的傲慢`,
          ); // :5579
        } // :5579-5580
        // CFLAG:322  = 7（变量语义：CFLAG 族，322） // :5581
        kojo.背后位 = 7; // :5581
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :5583
        if (rand_n(3) === 0) {
          // :5584
          await era.printAndWait(''); // :5585
        } else if (rand_n(2) === 0) {
          // :5586
          await era.printAndWait(''); // :5587
        } else {
          // :5586-5588
          await era.printAndWait(''); // :5589
        } // :5590-5591
        // CFLAG:322  = 6（变量语义：CFLAG 族，322） // :5591
        kojo.背后位 = 6; // :5591
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.背后位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :5593
        if (rand_n(3) === 0) {
          // :5594
          await era.printAndWait(''); // :5595
        } else if (rand_n(2) === 0) {
          // :5596
          await era.printAndWait(''); // :5597
        } else {
          // :5596-5598
          await era.printAndWait(''); // :5599
        } // :5600-5601
        // CFLAG:322  = 5（变量语义：CFLAG 族，322） // :5601
        kojo.背后位 = 5; // :5601
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5603
        await era.printAndWait(''); // :5604
        // CFLAG:322  = 4（变量语义：CFLAG 族，322） // :5605
        kojo.背后位 = 4; // :5605
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :5607
        await era.printAndWait(''); // :5608
        // CFLAG:322  = 3（变量语义：CFLAG 族，322） // :5609
        kojo.背后位 = 3; // :5609
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 === 2) {
        // :5611
        await era.printAndWait(''); // :5612

        // CFLAG:322  = 2（变量语义：CFLAG 族，322） // :5614
        kojo.背后位 = 2; // :5614
      } // :5614-5615
      return 0; // :5614-5616
    } // :5614-5617
  } // :5618-5621

  if (era_flag.selectcom === 27) {
    // :5623

    if (kojo.背后位肛交 === 0) {
      // :5625

      if ((era.get(`talent:${target}:136`) || 0) === 1) {
        // :5627
        await era.printAndWait(''); // :5628
      } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :5630
        await era.printAndWait(''); // :5631
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :5633
        await era.printAndWait(''); // :5634
      } else {
        // :5635-5636
        await era.printAndWait(''); // :5637
      } // :5638-5639
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328） // :5639
      kojo.背后位肛交 = 1; // :5639
      return 0; // :5639-5640
    } else {
      // :5642-5643

      if (
        (era.get(`talent:${target}:136`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背后位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :5644
        if (rand_n(2) === 0) {
          // :5645
          await era.printAndWait(`「狗先生、好粗…肛门都被撑开了…」`); // :5646
        } else {
          // :5646-5647
          await era.printAndWait(
            `「啊啊…狗先生…${sc()}的小穴和肛门感觉如何…？」`,
          ); // :5648
        } // :5648-5649
        // CFLAG:328  = 7（变量语义：CFLAG 族，328） // :5650
        kojo.背后位肛交 = 7; // :5650
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背后位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :5652
        if (rand_n(2) === 0) {
          // :5653
          await era.printAndWait(''); // :5654
        } else {
          // :5653-5655
          await era.printAndWait(''); // :5656
        } // :5657-5658
        // CFLAG:328  = 6（变量语义：CFLAG 族，328） // :5658
        kojo.背后位肛交 = 6; // :5658
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背后位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :5660
        if (rand_n(2) === 0) {
          // :5661
          await era.printAndWait(''); // :5662
        } else {
          // :5661-5663
          await era.printAndWait(''); // :5664
        } // :5665-5666
        // CFLAG:328  = 5（变量语义：CFLAG 族，328） // :5666
        kojo.背后位肛交 = 5; // :5666
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.背后位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5668
        await era.printAndWait(''); // :5669
        // CFLAG:328  = 4（变量语义：CFLAG 族，328） // :5670
        kojo.背后位肛交 = 4; // :5670
      } else if (
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背后位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :5672
        await era.printAndWait(''); // :5673
        // CFLAG:328  = 3（变量语义：CFLAG 族，328） // :5674
        kojo.背后位肛交 = 3; // :5674
      } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 === 2) {
        // :5676
        await era.printAndWait(''); // :5677
        // CFLAG:328  = 2（变量语义：CFLAG 族，328） // :5678
        kojo.背后位肛交 = 2; // :5678
      } // :5678-5679
      return 0; // :5678-5680
    } // :5678-5681
  } // :5682-5685

  if (era_flag.selectcom === 30) {
    // :5687

    if (kojo.手淫 === 0) {
      // :5689

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :5691
        await era.printAndWait(''); // :5692
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :5694
        await era.printAndWait(''); // :5695
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        // :5697
        await era.printAndWait(''); // :5698
      } else {
        // :5699-5700
        await era.printAndWait(''); // :5701
      } // :5702-5703
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331） // :5703
      kojo.手淫 = 1; // :5703
      return 0; // :5703-5704
    } else {
      // :5706-5707

      if (
        (era.get(`talent:${target}:136`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.手淫 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :5708
        if (rand_n(2) === 0) {
          // :5709
          await era.printAndWait(`「给狗先生服务好幸福…♪」`); // :5710
        } else {
          // :5710-5711
          await era.printAndWait(`「撸啊撸啊撸♪」`); // :5712
        } // :5712-5713
        // CFLAG:331  = 7（变量语义：CFLAG 族，331） // :5714
        kojo.手淫 = 7; // :5714
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.手淫 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :5716
        if (rand_n(2) === 0) {
          // :5717
          await era.printAndWait(''); // :5718
        } else {
          // :5717-5719
          await era.printAndWait(''); // :5720
        } // :5721-5722
        // CFLAG:331  = 6（变量语义：CFLAG 族，331） // :5722
        kojo.手淫 = 6; // :5722
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.手淫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :5724
        if (rand_n(2) === 0) {
          // :5725
          await era.printAndWait(''); // :5726
        } else {
          // :5725-5727
          await era.printAndWait(''); // :5728
        } // :5729-5730
        // CFLAG:331  = 5（变量语义：CFLAG 族，331） // :5730
        kojo.手淫 = 5; // :5730
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.手淫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5732
        await era.printAndWait(''); // :5733
        // CFLAG:331  = 4（变量语义：CFLAG 族，331） // :5734
        kojo.手淫 = 4; // :5734
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.手淫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :5736
        await era.printAndWait(''); // :5737
        // CFLAG:331  = 3（变量语义：CFLAG 族，331） // :5738
        kojo.手淫 = 3; // :5738
      } else if (kojo.手淫 <= 1 || game.kojo.口上开关 === 2) {
        // :5740
        await era.printAndWait(''); // :5741
        // CFLAG:331  = 2（变量语义：CFLAG 族，331） // :5742
        kojo.手淫 = 2; // :5742
      } // :5742-5743
      return 0; // :5742-5744
    } // :5742-5745
  } // :5746-5749

  if (era_flag.selectcom === 31) {
    // :5751

    if (kojo.口交_奴 === 0) {
      // :5753

      if ((era.get(`talent:${target}:136`) || 0) === 1) {
        // :5755
        await era.printAndWait(`「野兽鸡巴♪　我要开动咯♪」`); // :5756
      } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :5758
        await era.printAndWait(`「唔诶……野兽的味道……」`); // :5759
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :5761
        await era.printAndWait(`「唔诶……野兽的味道……」`); // :5762
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        // :5764
        await era.printAndWait(`「好的……照做不就行了嘛」`); // :5765
      } else {
        // :5767-5768
        await era.printAndWait(`「唔噗呜……呕诶……讨厌」`); // :5768
      } // :5768-5769
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332） // :5770
      kojo.口交_奴 = 1; // :5770
      return 0; // :5770-5771
    } else {
      // :5773-5774

      if (
        (era.get(`talent:${target}:136`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.口交_奴 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :5775
        await era.printAndWait(
          `「狗先生，请不要客气，把精液注入我下贱的嘴里吧♪」`,
        ); // :5776
        // CFLAG:332  = 8（变量语义：CFLAG 族，332） // :5777
        kojo.口交_奴 = 8; // :5777
      } else if (
        (era.get(`talent:${target}:136`) || 0) === 1 &&
        (kojo.口交_奴 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :5779
        await era.printAndWait(`「哈唔……啾……觉得舒服吗♪」`); // :5780
        // CFLAG:332  = 7（变量语义：CFLAG 族，332） // :5781
        kojo.口交_奴 = 7; // :5781
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.口交_奴 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :5783
        await era.printAndWait(`「野兽虽然臭臭的……但是可以啊、可以啊」`); // :5784
        // CFLAG:332  = 6（变量语义：CFLAG 族，332） // :5785
        kojo.口交_奴 = 6; // :5785
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.口交_奴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :5787
        await era.printAndWait(`「呜……野兽的味道」`); // :5788
        // CFLAG:332  = 5（变量语义：CFLAG 族，332） // :5789
        kojo.口交_奴 = 5; // :5789
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5791
        await era.printAndWait(`「野兽虽然臭臭的……但我会尽力的」`); // :5792
        // CFLAG:332  = 4（变量语义：CFLAG 族，332） // :5793
        kojo.口交_奴 = 4; // :5793
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.口交_奴 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :5795
        await era.printAndWait(`「呜呜……服务它就可以了吧」`); // :5796
        // CFLAG:332  = 3（变量语义：CFLAG 族，332） // :5797
        kojo.口交_奴 = 3; // :5797
      } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 === 2) {
        // :5799
        await era.printAndWait(`「呜噗……呕诶……讨厌」`); // :5800
        // CFLAG:332  = 2（变量语义：CFLAG 族，332） // :5801
        kojo.口交_奴 = 2; // :5801
      } // :5801-5802
      return 0; // :5801-5803
    } // :5801-5804
  } // :5805-5808

  if (era_flag.selectcom === 34) {
    // :5810

    if (kojo.骑乘位 === 0) {
      // :5812

      if ((era.get(`talent:${target}:0`) || 0) === 1) {
        // :5814

        if ((era.get(`talent:${target}:136`) || 0) === 1) {
          // :5816
          await era.printAndWait(''); // :5817
        } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
          // :5819
          await era.printAndWait(''); // :5820
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          // :5822
          await era.printAndWait(''); // :5823
        } else {
          // :5824-5825
          await era.printAndWait(''); // :5826
        } // :5824-5827
      } else {
        // :5829-5831

        if ((era.get(`talent:${target}:136`) || 0) === 1) {
          // :5831
          await era.printAndWait(''); // :5832
        } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
          // :5834
          await era.printAndWait(''); // :5835
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          // :5837
          await era.printAndWait(''); // :5838
        } else {
          // :5837-5840
          await era.printAndWait(''); // :5841
        } // :5842-5844
      } // :5843-5844
      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335） // :5844
      kojo.骑乘位 = 1; // :5844
      return 0; // :5844-5845
    } else {
      // :5847-5849

      if (
        (era.get(`talent:${target}:136`) || 0) === 1 &&
        (kojo.骑乘位 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :5849
        if (rand_n(3) === 0) {
          // :5850
          await era.printAndWait(''); // :5851
        } else if (rand_n(2) === 0) {
          // :5852
          await era.printAndWait(''); // :5853
        } else {
          // :5852-5854
          await era.printAndWait(''); // :5855
        } // :5856-5857
        // CFLAG:335  = 7（变量语义：CFLAG 族，335） // :5857
        kojo.骑乘位 = 7; // :5857
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.骑乘位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :5859
        if (rand_n(4) === 0) {
          // :5860
          await era.printAndWait(''); // :5861
        } else if (rand_n(3) === 0) {
          // :5862
          await era.printAndWait(''); // :5863
        } else if (rand_n(2) === 0) {
          // :5864
          await era.printAndWait(''); // :5865
        } else {
          // :5864-5866
          await era.printAndWait(''); // :5867
        } // :5868-5869
        // CFLAG:335  = 6（变量语义：CFLAG 族，335） // :5869
        kojo.骑乘位 = 6; // :5869
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.骑乘位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :5871
        if (rand_n(4) === 0) {
          // :5872
          await era.print(''); // :5873
        } else if (rand_n(3) === 0) {
          // :5874
          await era.printAndWait(''); // :5875
        } else if (rand_n(2) === 0) {
          // :5876
          await era.printAndWait(''); // :5877
        } else {
          // :5876-5878
          await era.printAndWait(''); // :5879
        } // :5880-5881
        // CFLAG:335  = 5（变量语义：CFLAG 族，335） // :5881
        kojo.骑乘位 = 5; // :5881
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (kojo.骑乘位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5883
        if (rand_n(4) === 0) {
          // :5884
          await era.printAndWait(''); // :5885
        } else if (rand_n(3) === 0) {
          // :5886
          await era.printAndWait(''); // :5887
        } else if (rand_n(2) === 0) {
          // :5888
          await era.printAndWait(''); // :5889
        } else {
          // :5888-5890
          await era.printAndWait(''); // :5891
        } // :5892-5893
        // CFLAG:335  = 4（变量语义：CFLAG 族，335） // :5893
        kojo.骑乘位 = 4; // :5893
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.骑乘位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :5895
        await era.print(''); // :5896
        await era.printAndWait(''); // :5897
        // CFLAG:335  = 3（变量语义：CFLAG 族，335） // :5898
        kojo.骑乘位 = 3; // :5898
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {
        // :5900
        await era.printAndWait(''); // :5901
        // CFLAG:335  = 2（变量语义：CFLAG 族，335） // :5902
        kojo.骑乘位 = 2; // :5902
      } // :5902-5903
      return 0; // :5902-5904
    } // :5902-5905
  } // :5906-5909

  if (era_flag.selectcom === 37) {
    // :5911

    if (kojo.肛门侍奉 === 0) {
      // :5913

      if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        // :5915
        await era.printAndWait(''); // :5916
      } else {
        // :5917-5918
        await era.printAndWait(''); // :5919
      } // :5920-5921
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338） // :5921
      kojo.肛门侍奉 = 1; // :5921
      return 0; // :5921-5922
    } else {
      // :5924-5925

      if (
        (era.get(`talent:${target}:136`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.肛门侍奉 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :5926
        await era.printAndWait(`「狗先生的肛门，看起来好诱人呢…♪」`); // :5927
        // CFLAG:338  = 6（变量语义：CFLAG 族，338） // :5928
        kojo.肛门侍奉 = 6; // :5928
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :5930
        await era.printAndWait(''); // :5931
        // CFLAG:338  = 5（变量语义：CFLAG 族，338） // :5932
        kojo.肛门侍奉 = 5; // :5932
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5934
        await era.print(''); // :5935
        // CFLAG:338  = 4（变量语义：CFLAG 族，338） // :5936
        kojo.肛门侍奉 = 4; // :5936
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :5938
        await era.printAndWait(''); // :5939
        // CFLAG:338  = 3（变量语义：CFLAG 族，338） // :5940
        kojo.肛门侍奉 = 3; // :5940
      } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 === 2) {
        // :5942
        await era.printAndWait(''); // :5943
        // CFLAG:338  = 2（变量语义：CFLAG 族，338） // :5944
        kojo.肛门侍奉 = 2; // :5944
      } // :5944-5945
      return 0; // :5944-5946
    } // :5944-5947
  } // :5948-5951

  if (era_flag.selectcom === 43 && era.get(`tequip:${target}:43`)) {
    // :5954

    if (kojo.眼罩 === 0) {
      // :5956

      if ((era.get(`talent:${target}:136`) || 0) === 1) {
        // :5958
        await era.printAndWait(''); // :5959
      } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :5961
        await era.printAndWait(''); // :5962
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :5964
        await era.printAndWait(''); // :5965
      } else {
        // :5964-5967
        await era.printAndWait(''); // :5968
      } // :5969-5970
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344） // :5970
      kojo.眼罩 = 1; // :5970
      return 0; // :5970-5971
    } else {
      // :5973-5975

      if (
        (era.get(`talent:${target}:136`) || 0) === 1 &&
        (kojo.眼罩 <= 9 || game.kojo.口上开关 === 2)
      ) {
        // :5975
        await era.printAndWait(''); // :5976
        // CFLAG:TARGET:344  = 10（变量语义：CFLAG 族，TARGET:344） // :5977
        kojo.眼罩 = 10; // :5977
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.眼罩 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :5979
        await era.printAndWait(''); // :5980
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344） // :5981
        kojo.眼罩 = 9; // :5981
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.眼罩 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :5983
        await era.printAndWait(''); // :5984
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344） // :5985
        kojo.眼罩 = 8; // :5985
      } else if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (kojo.眼罩 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :5987
        await era.printAndWait(''); // :5988
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344） // :5989
        kojo.眼罩 = 7; // :5989
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.眼罩 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :5991
        await era.printAndWait(''); // :5992
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344） // :5993
        kojo.眼罩 = 6; // :5993
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.眼罩 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :5995
        await era.printAndWait(''); // :5996
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344） // :5997
        kojo.眼罩 = 5; // :5997
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (kojo.眼罩 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5999
        await era.printAndWait(''); // :6000
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344） // :6001
        kojo.眼罩 = 4; // :6001
      } else if (
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.眼罩 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :6003
        await era.printAndWait(''); // :6004
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344） // :6005
        kojo.眼罩 = 3; // :6005
      } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 === 2) {
        // :6007
        await era.printAndWait(''); // :6008
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344） // :6009
        kojo.眼罩 = 2; // :6009
      } // :6009-6010
      return 0; // :6009-6011
    } // :6012-6014
  } else if (
    era_flag.selectcom === 43 &&
    era.get(`tequip:${target}:43`) === 0
  ) {
    // :6014

    if (
      (era.get(`talent:${target}:136`) || 0) === 1 &&
      (kojo.眼罩着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // :6016
      await era.printAndWait(''); // :6017
      // CFLAG:380  = 4（变量语义：CFLAG 族，380） // :6018
      kojo.眼罩着脱 = 4; // :6018
    } else if (
      (era.get(`talent:${target}:76`) || 0) === 1 &&
      (kojo.眼罩着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // :6020
      await era.printAndWait(''); // :6021
      // CFLAG:380  = 3（变量语义：CFLAG 族，380） // :6022
      kojo.眼罩着脱 = 3; // :6022
    } else if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (kojo.眼罩着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :6024
      await era.printAndWait(''); // :6025
      // CFLAG:380  = 2（变量语义：CFLAG 族，380） // :6026
      kojo.眼罩着脱 = 2; // :6026
    } else if (kojo.眼罩着脱 < 1 || game.kojo.口上开关 === 2) {
      // :6028
      await era.printAndWait(''); // :6029
      // CFLAG:380  = 1（变量语义：CFLAG 族，380） // :6030
      kojo.眼罩着脱 = 1; // :6030
    } // :6030-6031
    return 0; // :6030-6032
  } // :6030-6033

  if (era_flag.selectcom === 56) {
    // :6039

    if (kojo.交谈 === 0) {
      // :6041
      if (era.get(`tequip:${target}:53`)) {
        // :6042

        if ((era.get(`talent:${target}:136`) || 0) === 1) {
          // :6045
          await era.printAndWait(`「你好啊♪　这里是${target_name}♪」`); // :6046
          await era.printAndWait(
            `「很惊讶吧，以后${sc()}，就会住在你旁边一直和你做爱哟♪」`,
          ); // :6047
          await era.printAndWait(
            `「${sc()}啊♪已经成为比狗狗还下贱的家畜了♪跟狗先生缔结了奴隶契约的说♪」`,
          ); // :6048
          await era.printAndWait(
            `「可不要因为${sc()}像是野兽一样的低贱地和狗交配就蔑视我哟♪」`,
          ); // :6049
        } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
          // :6051
          await era.printAndWait(''); // :6052
        } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
          // :6054
          await era.printAndWait(''); // :6055
        } else {
          // :6054-6057
          await era.printAndWait(''); // :6058
        } // :6059-6061
      } // :6060-6061
      // CFLAG:357  = 1（变量语义：CFLAG 族，357） // :6061
      kojo.交谈 = 1; // :6061
      return 0; // :6061-6062
    } else {
      // :6064-6065
      if (era.get(`tequip:${target}:53`)) {
        // :6065

        if (
          (era.get(`talent:${target}:136`) || 0) === 1 &&
          (kojo.交谈 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :6068
          await era.printAndWait(`「你好啊♪　这里是${target_name}♪」`); // :6069
          await era.printAndWait(
            `「很惊讶吧、以后${sc()}，就会住在你旁边一直和你做爱哟♪」`,
          ); // :6070
          await era.printAndWait(
            `「${sc()}啊♪已经成为比狗狗还下贱的家畜了♪跟狗先生缔结了奴隶契约的说♪」`,
          ); // :6071

          if ((era.get(`abl:${target}:39`) || 0) >= 6) {
            // :6073
            await era.printAndWait(
              `「阴道和子宫已经完全成了狗肉棒专用的了啦♪」`,
            ); // :6074
          } // :6074-6075

          if ((era.get(`talent:${target}:317`) || 0) === 4) {
            // :6077
            await era.printAndWait(
              `「恋人……？嗯，已经没办法生他的孩子了啦♪　抱歉了啦♪♪」`,
            ); // :6078
          } // :6078-6079
          await era.printAndWait(
            `「可不要因为${sc()}像是野兽一样的低贱地和狗交配就蔑视我哟♪」`,
          ); // :6080
          // CFLAG:357  = 5（变量语义：CFLAG 族，357） // :6081
          kojo.交谈 = 5; // :6081
        } else if (
          (era.get(`talent:${target}:76`) || 0) === 1 &&
          (kojo.交谈 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :6083
          await era.printAndWait(''); // :6084
          // CFLAG:357  = 4（变量语义：CFLAG 族，357） // :6085
          kojo.交谈 = 4; // :6085
        } else if (
          (era.get(`talent:${target}:85`) || 0) === 1 &&
          (kojo.交谈 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :6087
          await era.printAndWait(''); // :6088
          // CFLAG:357  = 3（变量语义：CFLAG 族，357） // :6089
          kojo.交谈 = 3; // :6089
        } else if (kojo.交谈 <= 1 || game.kojo.口上开关 === 2) {
          // :6091
          await era.printAndWait(''); // :6092
          // CFLAG:357  = 2（变量语义：CFLAG 族，357） // :6093
          kojo.交谈 = 2; // :6093
        } // :6093-6094
      } // :6093-6095
      return 0; // :6093-6096
    } // :6093-6097
  } // :6093-6098

  return 0; // :6101-6104
}

// @KOJO_MESSAGE_PALAMCNG_6 // :6108

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
    // :6110-6111
    return 0; // :6110-6111
  } // :6110-6111

  if (era.get(`tequip:${target}:45`)) {
    // :6113-6114
    return 0; // :6113-6114
  } // :6113-6114

  if ((era.get(`talent:${target}:9`) || 0) === 1) {
    // :6116-6117
    return 0; // :6116-6117
  } // :6116-6117

  if (era.get(`tequip:${target}:55`)) {
    // :6119
    return 0; // :6119-6120
  } // :6121-6122

  if (game.train.失神) {
    // :6123-6124
    return 0; // :6123-6124
  } // :6123-6124

  P = (era.get(`palam:${target}:3`) || 0) + (era.get(`delta:${target}:3`) || 0); // PALAM:3 + UP:3 // :6132
  if (P > PALAMLV[2] && kojo.首次润滑Lv2 === 0) {
    // :6133

    if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (era.get(`talent:${target}:76`) || 0) === 1
    ) {
      // :6135

      if (era_flag.selectcom === 50) {
        // :6137
        await era.printAndWait(
          `${target_name}饶有兴味地研究着自己大腿间流下的润滑液………`,
        ); // :6138
        await era.printAndWait(`―――润滑第一次超过LV2了`); // :6139
      } else {
        // :6141-6142
        await era.printAndWait(
          `${target_name}因为过于兴奋而摩擦着双脚，小穴已经爱液泛滥。`,
        ); // :6142
        await era.printAndWait(`「${scf()}…${sc()}已经湿了呢………」`); // :6143
        await era.printAndWait(`―――润滑第一次超过LV2了`); // :6144
      } // :6144-6145
    } else {
      // :6147-6148

      if (era_flag.selectcom === 50) {
        // :6149
        await era.printAndWait(
          `${target_name}饶有兴味地研究着自己大腿间流下的润滑液………`,
        ); // :6150
        await era.printAndWait(`―――润滑第一次超过LV2了`); // :6151
      } else {
        // :6153-6154
        await era.printAndWait(
          `${target_name}的小穴因为兴奋的缘故变得湿润起来。`,
        ); // :6154
        await era.printAndWait(`「${scf()}、${sc()}才没有什么感觉…！」`); // :6155
        await era.printAndWait(`―――润滑第一次超过LV2了`); // :6156
      } // :6156-6157
    } // :6158-6159
    // CFLAG:TARGET:221  = 1（变量语义：CFLAG 族，TARGET:221） // :6159
    kojo.首次润滑Lv2 = 1; // :6159
  } // :6159-6160

  P = (era.get(`palam:${target}:5`) || 0) + (era.get(`delta:${target}:5`) || 0); // PALAM:5 + UP:5 // :6165
  if (P > PALAMLV[2] && kojo.首次欲情Lv2 === 0) {
    // :6166

    if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (era.get(`talent:${target}:76`) || 0) === 1
    ) {
      // :6168

      if (era_flag.selectcom === 51) {
        // :6170
        await era.print(''); // :6171
        await era.printAndWait(
          `媚药发作的${target_name}不仅嘴巴张开，耳朵也因为发情变得通红。`,
        ); // :6172
        await era.printAndWait(
          `「对${sc()}用…用这样的药…啊啊啊…不行…大脑已经完全无法思考了…${heart(1)}」`,
        ); // :6173
        await era.printAndWait(`―――欲情第一次超过LV2`); // :6174
      } else {
        // :6176-6177
        await era.print(''); // :6177
        await era.printAndWait(
          `${target_name}脸上带着之前从未有过的欲望看向${player_name}。`,
        ); // :6178
        await era.printAndWait(`「啊啊啊…想马上就把你推倒…${heart(1)}」`); // :6179
        await era.printAndWait(`―――欲情第一次超过LV2`); // :6180
      } // :6180-6181
    } else {
      // :6183-6185

      if (era_flag.selectcom === 51) {
        // :6185
        await era.print(''); // :6186
        await era.printAndWait(
          `媚药发作使得${target_name}不得不张开嘴巴，发出粗重的喘息。`,
        ); // :6187
        await era.printAndWait(
          `「哈啊啊啊…卑鄙的家、家伙…用这种…肮、肮脏的…手段…！ 啊啊啊…啊啊…身体好热！」`,
        ); // :6188
        await era.printAndWait(`―――欲情第一次超过LV2`); // :6189
      } else {
        // :6191-6192
        await era.print(''); // :6192
        await era.printAndWait(
          `${target_name}脸颊染上一层春色，露出松懈的表情。`,
        ); // :6193
        await era.printAndWait(
          `「${scf()}、${sc()}…怎么有点、有点想要的样子…嗯啊……」`,
        ); // :6194
        await era.printAndWait(`―――欲情第一次超过LV2`); // :6195
      } // :6195-6196
    } // :6197-6198
    // CFLAG:222  = 1（变量语义：CFLAG 族，222） // :6198
    kojo.首次欲情Lv2 = 1; // :6198
  } // :6198-6199

  P = (era.get(`palam:${target}:8`) || 0) + (era.get(`delta:${target}:8`) || 0); // PALAM:8 + UP:8 // :6204
  if (P > PALAMLV[2] && kojo.首次耻情Lv2 === 0) {
    // :6205

    if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (era.get(`talent:${target}:76`) || 0) === 1
    ) {
      // :6207
      await era.print(''); // :6208
      await era.printAndWait(
        `注意到自己做了太过于羞耻的事情，${target_name}的脸因为耻辱变得通红。`,
      ); // :6209
      await era.printAndWait(`「啊………不…不准…呜…看…看我啊」`); // :6210
      await era.printAndWait(`―――耻情第一次超过LV2`); // :6211
    } else {
      // :6213-6214
      await era.print(''); // :6214
      await era.printAndWait(`${target_name}因为耻辱耳根通红。`); // :6215
      await era.printAndWait(`「呜呜…不、不准看我………！」`); // :6216
      await era.printAndWait(`―――耻情第一次超过LV2`); // :6217
    } // :6217-6218
    // CFLAG:223  = 1（变量语义：CFLAG 族，223） // :6219
    kojo.首次耻情Lv2 = 1; // :6219
  } // :6219-6220

  P =
    (era.get(`palam:${target}:10`) || 0) + (era.get(`delta:${target}:10`) || 0); // PALAM:10 + UP:10 // :6225
  if (P > PALAMLV[2] && kojo.首次恐怖Lv2 === 0) {
    // :6226

    if (
      (era.get(`talent:${target}:85`) || 0) === 1 &&
      (era.get(`talent:${target}:76`) || 0) === 1
    ) {
      // :6228
      await era.print(''); // :6229
      await era.printAndWait(`${target_name}因为这意想不到的情况而脸色铁青……`); // :6230
      await era.printAndWait(`―――恐怖第一次超过LV2`); // :6231
    } else {
      // :6233-6234
      await era.print(''); // :6234
      await era.printAndWait(`${target_name}因为恐怖而脸色扭曲………`); // :6235
      await era.printAndWait(`―――恐怖第一次超过LV2`); // :6236
    } // :6236-6237
    // CFLAG:224  = 1（变量语义：CFLAG 族，224） // :6238
    kojo.首次恐怖Lv2 = 1; // :6238
  } // :6238-6239

  if ((era.get(`nowex:${target}:0`) || 0) > 0 && kojo.首次C绝顶 === 0) {
    // :6244

    if ((era.get(`talent:${target}:85`) || 0) === 1) {
      // :6246
      await era.printAndWait(
        `「啊啊啊啊…去了！去啦！…${sc()}要去啦！～…唔哦哦哦哦！！～${heart(1)}」`,
      ); // :6247
      await era.printAndWait(`${target_name}的阴蒂受到刺激第一次到达了绝顶。`); // :6248
      await era.printAndWait(`这使她表情呆滞，口中有唾液垂下………`); // :6249
    } else {
      // :6251-6252
      await era.printAndWait(
        `「啊啊啊啊…下面、下面的那里…要去了…忍不住了…啊啊啊…呜啊啊哈啊！」`,
      ); // :6252
      await era.printAndWait(`${target_name}的阴蒂受到刺激第一次到达了绝顶………`); // :6253

      if (
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0
      ) {
        // :6256
        await era.printAndWait(`「该、该死…被你这种家伙看到这样的丑态………」`); // :6256
      } // :6256
    } // :6256-6257
    // CFLAG:225  = 1（变量语义：CFLAG 族，225） // :6258
    kojo.首次C绝顶 = 1; // :6258
  } // :6258-6259

  if ((era.get(`nowex:${target}:1`) || 0) > 0 && kojo.首次V绝顶 === 0) {
    // :6264

    if ((era.get(`talent:${target}:76`) || 0) === 1) {
      // :6266
      await era.printAndWait(
        `「啊啊啊啊${sc()}淫荡的小穴高潮了呜呜${heart(1)}…哈啊整个高潮的过程都被看得一清二楚呢${heart(1)}」`,
      ); // :6267
      await era.printAndWait(
        `${target_name}第一次达到了高潮，发出一阵又一阵高亢的呻吟………`,
      ); // :6268
    } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
      // :6270
      await era.printAndWait(
        `「有、呜…呜…${sc()}…有奇…奇怪的感觉…${heart(1)}…啊啊啊啊啊啊${heart(1)}」`,
      ); // :6271
      await era.printAndWait(
        `${target_name}第一次达到了阴道绝顶，气喘吁吁筋疲力尽地娇喘着靠在你的肩上。`,
      ); // :6272
      await era.printAndWait(`「这就是高潮的感觉啊…啊啊啊${heart(1)}」`); // :6273
    } else if (
      (era.get(`mark:${target}:3`) || 0) === 3 &&
      (era.get(`talent:${target}:85`) || 0) === 0 &&
      (era.get(`talent:${target}:76`) || 0) === 0
    ) {
      // :6275
      await era.printAndWait(
        `「住、住手啊…啊啊啊啊…快停下来…不要再侵犯我的小穴了啊…啊啊啊啊！…呜呜…啊呜咕咕呜！」`,
      ); // :6276
      await era.printAndWait(
        `${target_name}第一次达到了阴道绝顶，眼神空洞地发着呆，小声嘀咕着什么。`,
      ); // :6277
      await era.printAndWait(`「已经…该死…讨厌的家伙…明明不想的…却………」`); // :6278
    } else {
      // :6280-6281
      await era.printAndWait(
        `「啊啊啊…呀呀呀…为什么…有一种糟糕的感觉…啊啊啊呜啊啊！」`,
      ); // :6281
      await era.printAndWait(
        `${target_name}第一次达到了高潮，发出一阵又一阵高亢的呻吟………`,
      ); // :6282
    } // :6282-6283
    // CFLAG:TARGET:226  = 1（变量语义：CFLAG 族，TARGET:226） // :6284
    kojo.首次V绝顶 = 1; // :6284
  } // :6284-6285

  if ((era.get(`nowex:${target}:2`) || 0) > 0 && kojo.首次A绝顶 === 0) {
    // :6290

    if ((era.get(`talent:${target}:76`) || 0) === 1) {
      // :6292
      await era.printAndWait(
        `「屁股…屁股也…要去了…哇啊呜呜呜${heart(1)} …啊啊啊…屁股传来这新鲜的感觉…咿咿${heart(1)}」`,
      ); // :6293
      await era.printAndWait(
        `${target_name}迎来了第一次肛门绝顶，脸上浮现出一层粉红色的春潮………`,
      ); // :6294
    } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
      // :6296
      await era.printAndWait(
        `「啊啊…啊啊啊…屁、屁股${heart(1)}…要去了啊啊啊…啊啊…啊呜呜呜呜${heart(1)}…哈啊啊啊${heart(1)}」`,
      ); // :6297
      await era.printAndWait(
        `${target_name}第一次感受到了高潮，口大大地张开垂下一行唾液………`,
      ); // :6298
    } else if (
      (era.get(`mark:${target}:3`) || 0) === 3 &&
      (era.get(`talent:${target}:85`) || 0) === 0 &&
      (era.get(`talent:${target}:76`) || 0) === 0
    ) {
      // :6300
      await era.printAndWait(
        `「哈…啊啊啊啊！别、别再玩弄我的屁股了！停下来啊啊！………啊啊啊呜呜呜咕咕咕！」`,
      ); // :6301
      await era.printAndWait(
        `${target_name}第一次达到了肛门绝顶，双目无神留下了大颗大颗的眼泪。`,
      ); // :6302
      await era.printAndWait(`「${sc()}…已经…已经不行了………」`); // :6303
    } else {
      // :6305-6306
      await era.printAndWait(
        `「屁股、快要忍不住了！ 呜…要去了…啊啊啊啊啊…不，呜呜…不要啊啊…呜呜呜！」`,
      ); // :6306
      await era.printAndWait(
        `${target_name}第一次达到了肛门绝顶。在呆滞了一会儿之后，泪水顺着脸庞流下………`,
      ); // :6307
    } // :6307-6308
    // CFLAG:227  = 1（变量语义：CFLAG 族，227） // :6309
    kojo.首次A绝顶 = 1; // :6309
  } // :6309-6310

  if ((era.get(`nowex:${target}:3`) || 0) > 0 && kojo.首次B绝顶 === 0) {
    // :6315

    if ((era.get(`talent:${target}:85`) || 0) === 1) {
      // :6317
      await era.printAndWait(
        `「淫、淫荡的胸部${heart(1)}…啊啊…啊呜…啊呜呜呜${heart(1)}」`,
      ); // :6318
      await era.printAndWait(`${target_name}的胸部第一次因为刺激而高潮了………`); // :6319
    } else {
      // :6321-6322
      await era.printAndWait(
        `「啊啊啊…胸部…明明只是被玩弄了而已…呜…唔啊……呜呜呜！」`,
      ); // :6322
      await era.printAndWait(`${target_name}的胸部第一次因为刺激而高潮了………`); // :6323

      if (
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0
      ) {
        // :6326
        await era.printAndWait(`「胸部，高潮了么…这下贱的身体…呜呜」`); // :6326
      } // :6326
    } // :6326-6327
    // CFLAG:TARGET:228  = 1（变量语义：CFLAG 族，TARGET:228） // :6328
    kojo.首次B绝顶 = 1; // :6328
  } // :6328-6329

  A =
    (era.get(`delta:${target}:11`) || 0) + (era.get(`delta:${target}:12`) || 0); // UP:11 + UP:12 // :6334
  if (game.train.处女丧失 === 1 && kojo.处女丧失 === 0) {
    // :6335

    if (game.train.主人导致处女丧失 === 1) {
      // :6337

      if (
        (era.get(`talent:${target}:76`) || 0) === 1 &&
        (A < 500 || game.system.反抗刻印回避 === 1)
      ) {
        // :6339
        await era.printAndWait(`「啊啊啊啊…这样…就能享受更多的调教了吧？」`); // :6340
        await era.printAndWait(
          `${target_name}妖艳地笑着，脸上丝毫不见被破处的疼痛与失落。`,
        ); // :6341
        await era.printAndWait(
          `「${sc()}…把第一次给了魔王大人也很高兴呢，请狠狠地调教我…开心得快要疯了呢…！」`,
        ); // :6342
      } else if (
        (era.get(`talent:${target}:85`) || 0) === 1 &&
        (A < 500 || game.system.反抗刻印回避 === 1)
      ) {
        // :6344
        await era.printAndWait(`「${scf()}、${sc()}的第一次…啊…很意外吗…？」`); // :6345
        await era.printAndWait(
          `${player_name}不禁点了点头，${target_name}扑哧一声笑了出来。`,
        ); // :6346
        await era.printAndWait(
          `「${sc()}…想要…把自己的第一次…给喜欢的人啊…啊啊啊${heart(1)}」`,
        ); // :6347
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0
      ) {
        // :6349
        await era.printAndWait(
          `「哇啊……好后悔…第一次给了…你这样的混蛋………！啊啊啊啊啊！呜啊啊啊啊啊………」`,
        ); // :6350
        await era.printAndWait(
          `看到自己双腿间流出的血液，${target_name}大哭起来………`,
        ); // :6351
      } else {
        // :6353-6354
        await era.printAndWait(
          `「痛！很痛啊…快、快拔出去…！ 这样的事情…不要啊！」`,
        ); // :6354
        await era.printAndWait(
          `${target_name}的处女之身被无情夺走，在${player_name}面前低下了头………`,
        ); // :6355
      } // :6355-6356
    } else {
      // :6357-6358

      if ((era.get(`talent:${target}:76`) || 0) === 1) {
        // :6360
        await era.printAndWait(
          `「啊哈哈…终于${sc()}也已经完成了“成人礼”了呢${heart(1)}」`,
        ); // :6361
        await era.printAndWait(`${target_name}对大腿间流出的血液熟视无睹。`); // :6362
        await era.printAndWait(`「接下来…进行更多的调教吧？」`); // :6363
      } else if ((era.get(`talent:${target}:85`) || 0) === 1) {
        // :6365
        await era.printAndWait(`「啊啊…这么多血………啊啊………」`); // :6366
        await era.printAndWait(`${target_name}的大腿间流出了血液………`); // :6367
      } else if (
        (era.get(`mark:${target}:2`) || 0) >= 2 &&
        (era.get(`mark:${target}:3`) || 0) === 3 &&
        (era.get(`talent:${target}:85`) || 0) === 0 &&
        (era.get(`talent:${target}:76`) || 0) === 0
      ) {
        // :6369
        await era.printAndWait(
          `「早知道是这种结果…处女什么的还不如自己弄破呢………」`,
        ); // :6370
        await era.printAndWait(
          `大腿间还留着血迹的${target_name}自言自语起来………`,
        ); // :6371
      } else {
        // :6373-6374
        await era.printAndWait(
          `「啊啊…很痛的啊…停下！该死！…啊啊啊…这是…血么………」`,
        ); // :6374
        await era.printAndWait(
          `见到这意料之外的出血量${target_name}完全愣住了………`,
        ); // :6375
      } // :6375-6376
    } // :6377-6378
    // CFLAG:TARGET:229  = 1（变量语义：CFLAG 族，TARGET:229） // :6378
    kojo.处女丧失 = 1; // :6378
  } // :6378-6379
}

// @KOJO_MESSAGE_MARKCNG_6 // :6386

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
    // :6391-6392
    return 0; // :6391-6392
  } // :6391-6392

  if ((era.get(`talent:${target}:9`) || 0) === 1) {
    // :6394-6395
    return 0; // :6394-6395
  } // :6394-6395

  if (game.system.苦痛刻印变动 === 3 && kojo.苦痛刻印Lv3 === 0) {
    // :6399

    if ((era.get(`talent:${target}:85`) || 0) === 1) {
      // :6401
      await era.printAndWait(`「啊啊啊…这就是所谓爱的痛楚吗…？」`); // :6402
      await era.printAndWait(`${target_name}一边痛苦地呻吟着一边勉强地笑了………`); // :6403
    } else {
      // :6403-6404
      await era.printAndWait(`「啊呜…已、已经到极限了…${sc()}…呜呜呜」`); // :6405
      await era.printAndWait(`${target_name}因为这近乎极限的痛苦落泪不止………`); // :6406
    } // :6406-6407
    // CFLAG:297  = 1（变量语义：CFLAG 族，297） // :6408
    kojo.苦痛刻印Lv3 = 1; // :6408
  } // :6408-6409

  if (game.system.快乐刻印变动 === 3 && kojo.快乐刻印Lv3 === 0) {
    // :6414

    if ((era.get(`talent:${target}:85`) || 0) === 1) {
      // :6416
      await era.printAndWait(
        `「啊啊啊…${scf()}、${sc()}…做着这、这样令人舒服的事情…已经快、快要不行了…${heart(1)}」`,
      ); // :6417
      await era.printAndWait(
        `${target_name}柔软的身体已经铭记了这种永生难忘的快乐………`,
      ); // :6418
    } else {
      // :6418-6419
      await era.printAndWait(`「啊啊啊…舒服到…骨髓里了呢…♪」`); // :6420
      await era.printAndWait(
        `${target_name}柔软的身体已经铭记了这种永生难忘的快乐………`,
      ); // :6421
    } // :6421-6422
    // CFLAG:298  = 1（变量语义：CFLAG 族，298） // :6423
    kojo.快乐刻印Lv3 = 1; // :6423
  } // :6423-6424

  if (game.system.屈服刻印变动 === 3 && kojo.屈服刻印Lv3 === 0) {
    // :6429

    if ((era.get(`talent:${target}:85`) || 0) === 1) {
      // :6431
      await era.printAndWait(
        `「啊啊啊啊…从现在开始，想要做什么都行…我的…主人${heart(1)}」`,
      ); // :6432
      await era.printAndWait(
        `${target_name}的身心已经完全屈服了，这之后无论是怎样的调教都不会违抗吧………`,
      ); // :6433
    } else {
      // :6433-6434
      await era.printAndWait(`「已、已经不敢再违逆您了，主人…原谅我吧………」`); // :6435
      await era.printAndWait(
        `${target_name}经过调教终于完全屈服了，这样之后下命令应该会顺利很多吧………`,
      ); // :6436
    } // :6436-6437
    // CFLAG:299  = 1（变量语义：CFLAG 族，299） // :6438
    kojo.屈服刻印Lv3 = 1; // :6438
  } // :6438-6439

  if (game.system.反抗刻印变动 === 3 && kojo.反抗刻印Lv3 === 0) {
    // :6444

    if ((era.get(`talent:${target}:85`) || 0) === 1) {
      // :6446
      await era.printAndWait(`「啊呜…为什么${sc()}会遇到这种事情…呜呜！」`); // :6447
      await era.printAndWait(
        `似乎是做得太过火了，${target_name}的眼睛里仿佛燃烧着一种名为仇恨的火焰………`,
      ); // :6448
    } else {
      // :6448-6449
      await era.printAndWait(`「啊呜…啊…呜呜…决、决不会忘记这样的屈辱…！！」`); // :6450
      await era.printAndWait(
        `似乎是做得太过火了，${target_name}的眼睛里仿佛燃烧着一种名为仇恨的火焰………`,
      ); // :6451
    } // :6451-6452
    // CFLAG:300  = 1（变量语义：CFLAG 族，300） // :6453
    kojo.反抗刻印Lv3 = 1; // :6453
  } // :6453-6454
}

// @SELF_KOJO_K6 // :6458

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
    // :6462

    if ((era.get(`talent:${target}:9`) || 0) === 1) {
      // :6464
      await era.printAndWait(`${target_name}像坏掉的玩具般疯狂地自慰着………`); // :6465
    } else if (Q === 1) {
      // :6467
      await era.printAndWait(
        `「啊啊…和${assi_name}的百合性交…好舒服呢…啊，呜…呼呼♪」`,
      ); // :6468
      await era.printAndWait(
        `${target_name}一边回忆着与${assi_name}的交合过程一边自慰起来………`,
      ); // :6469
    } else if (Q === 2) {
      // :6471
      await era.printAndWait(
        `「啊啊…啊啊啊！还是想跟狗狗做爱啊…想要狗狗的肉棒！」`,
      ); // :6472
      await era.printAndWait(
        `${target_name}野兽般大声呼喊，继续着激烈地自慰………`,
      ); // :6473
    } else {
      // :6473-6475

      if (
        (era.get(`talent:${target}:76`) || 0) &&
        (kojo.调教后自慰 < 4 || game.kojo.口上开关 === 2)
      ) {
        // :6477
        await era.printAndWait(
          `「呜呼…噢…喔喔…${heart(1)} 啊啊啊…更想做色色的事情了…${heart(1)}」`,
        ); // :6478
        await era.printAndWait(
          `${target_name}想着${master_name}，在充斥着淫媚叫声的房间里不断地自慰着……`,
        ); // :6479
        // CFLAG:261  = 4（变量语义：CFLAG 族，261） // :6480
        kojo.调教后自慰 = 4; // :6480
      } else if (
        (era.get(`talent:${target}:85`) || 0) &&
        (kojo.调教后自慰 < 3 || game.kojo.口上开关 === 2)
      ) {
        // :6482
        await era.printAndWait(
          `「魔王大人我………好想要……${heart(1)} 嗯……嗯……噢喔～${heart(1)}」`,
        ); // :6483
        await era.printAndWait(`${target_name}在床上扭动着身躯结束了自慰………`); // :6484
        // CFLAG:261  = 3（变量语义：CFLAG 族，261） // :6485
        kojo.调教后自慰 = 3; // :6485
      } else if (
        (era.get(`abl:${target}:31`) || 0) >= 3 &&
        (kojo.调教后自慰 < 2 || game.kojo.口上开关 === 2)
      ) {
        // :6487
        await era.printAndWait(
          `「已、已经…停不下来了…${scf()}、${sc()}…呜啊呜嗯…啊啊啊！」`,
        ); // :6488
        await era.printAndWait(
          `自慰中毒的${target_name}的动作也不知道什么时候才能停下来………`,
        ); // :6489
        // CFLAG:261  = 2（变量语义：CFLAG 族，261） // :6490
        kojo.调教后自慰 = 2; // :6490
      } else if (kojo.调教后自慰 < 1 || game.kojo.口上开关 === 2) {
        // :6492
        await era.printAndWait(
          `「哈啊哈啊…为什么，为什么${sc()}连这种事情都忍耐不住…呜…呜呼」`,
        ); // :6493
        await era.printAndWait(
          `${target_name}满脸的不甘心，但手上的动作却越来越激烈了。`,
        ); // :6494
        // CFLAG:261  = 1（变量语义：CFLAG 族，261） // :6495
        kojo.调教后自慰 = 1; // :6495
      } // :6495-6496
    } // :6495-6497
  } // :6495-6498

  if (game.train.初吻与自我口上 === 2) {
    // :6503

    if ((era.get(`talent:${target}:9`) || 0) === 1) {
      // :6505
      await era.printAndWait(
        `${assi_name}玩弄着已经坏掉的${target_name}享受其中颓废的女同之乐………`,
      ); // :6506
    } else if (
      (era.get(`talent:${target}:76`) || 0) &&
      (kojo.百合PLAY < 5 || game.kojo.口上开关 === 2)
    ) {
      // :6508
      await era.printAndWait(
        `「哈…啊啊…女人之间也可以性交呢…这样做爱好舒服${heart(1)}」`,
      ); // :6509
      await era.printAndWait(
        `${target_name}和${assi_name}像交尾的蛞蝓般扭在一起………`,
      ); // :6510
      // CFLAG:262  = 5（变量语义：CFLAG 族，262） // :6511
      kojo.百合PLAY = 5; // :6511
    } else if (
      (era.get(`talent:${target}:85`) || 0) &&
      (kojo.百合PLAY < 4 || game.kojo.口上开关 === 2)
    ) {
      // :6513
      await era.printAndWait(
        `「啊啊…啊呼…这件事…那个地方可是秘密哦！啊？…啊啊…呼…啊啊啊${heart(1)}」`,
      ); // :6514
      await era.printAndWait(
        `${target_name}一边用秘密作为借口，一边用手在${assi_name}的敏感部位抚摸。`,
      ); // :6515
      await era.print(
        `${assi_name}苦笑着和${target_name}以女人间特有的方式纠缠在一起，`,
      ); // :6516
      if (era_flag.time === 0) {
        // :6517
        await era.printAndWait(`直到黄昏………`); // :6518
      } else {
        // :6518-6519
        await era.printAndWait(`直到夜幕渐深………`); // :6520
      } // :6520-6521
      // CFLAG:262  = 4（变量语义：CFLAG 族，262） // :6522
      kojo.百合PLAY = 4; // :6522
    } else if (
      (era.get(`abl:${target}:33`) || 0) >= 3 &&
      (kojo.百合PLAY < 3 || game.kojo.口上开关 === 2)
    ) {
      // :6524
      await era.printAndWait(
        `「啊啊啊…原来跟女人做爱这么舒服…到了这里之后才发现呢♪」`,
      ); // :6525
      await era.print(
        `尝到百合滋味的${target_name}嬉笑着和${assi_name}纠缠着，`,
      ); // :6526
      if (era_flag.time === 0) {
        // :6527
        await era.printAndWait(`直到黄昏………`); // :6528
      } else {
        // :6528-6529
        await era.printAndWait(`直到夜幕渐深………`); // :6530
      } // :6530-6531
      // CFLAG:262  = 3（变量语义：CFLAG 族，262） // :6532
      kojo.百合PLAY = 3; // :6532
    } else if (
      (era.get(`abl:${target}:22`) || 0) >= 3 &&
      (kojo.百合PLAY < 2 || game.kojo.口上开关 === 2)
    ) {
      // :6534
      await era.printAndWait(
        `「${sc()}才不喜欢百合什么的………呜…啊啊啊…还、还要…继续啊…♪」`,
      ); // :6535
      await era.printAndWait(
        `${assi_name}舌尖湿润，温柔地吻着${target_name}的脸庞………`,
      ); // :6536
      // CFLAG:262  = 2（变量语义：CFLAG 族，262） // :6537
      kojo.百合PLAY = 2; // :6537
    } else if (kojo.百合PLAY < 1 || game.kojo.口上开关 === 2) {
      // :6539
      await era.printAndWait(
        `「停、停下…${sc()}对这种事情没有兴趣啊…啊啊…要、要去了…啊啊啊！」`,
      ); // :6540
      await era.printAndWait(
        `${target_name}摇着头抗拒着，但仍被${assi_name}玩弄于手指间………`,
      ); // :6541
      // CFLAG:262  = 1（变量语义：CFLAG 族，262） // :6542
      kojo.百合PLAY = 1; // :6542
    } // :6542-6543
  } // :6542-6544

  if (game.train.初吻与自我口上 === 3) {
    // :6549

    if ((era.get(`talent:${target}:9`) || 0) === 1) {
      // :6551
      await era.printAndWait(`「啊哈…精液的味道…呜啊呜嗯嗯…♪」`); // :6552
      await era.printAndWait(
        `${target_name}带着幼儿般放荡的表情，继续着扫除式的口交………`,
      ); // :6553
    } else if (
      (era.get(`talent:${target}:76`) || 0) === 1 &&
      (kojo.朝口交 < 3 || game.kojo.口上开关 === 2)
    ) {
      // :6555
      await era.printAndWait(
        `「啊…呜呜…呜呜${heart(1)}…就这样接受${sc()}的侵犯吧…一大早就能品尝到浓厚的精液的感觉…难以忍受啊啊${heart(1)}」`,
      ); // :6556
      await era.printAndWait(
        `${target_name}一口将整个阴茎吞进嘴里用心舔舐，一边翻身骑在了你身上。`,
      ); // :6557
      await era.printAndWait(
        `${master_name}在这种诱惑下起身轻松把${target_name}重新压到了身下。`,
      ); // :6558
      await era.printAndWait(
        `「哼…不行么？ 真是出乎预料…那以后要记得主动到${sc()}的屋子里来哦…喂？」`,
      ); // :6559
      // CFLAG:263  = 3（变量语义：CFLAG 族，263） // :6560
      kojo.朝口交 = 3; // :6560
    } else if (
      (era.get(`talent:${target}:85`) || 0) &&
      (kojo.朝口交 < 3 || game.kojo.口上开关 === 2)
    ) {
      // :6562
      await era.printAndWait(
        `「啊呜咿${heart(1)}…要开始了…呜呜呜…啊啊、早上好魔王大人${heart(1)}」`,
      ); // :6563
      await era.printAndWait(
        `${target_name}用舌头精心“清扫”着刚刚射精的阴茎。`,
      ); // :6564
      await era.printAndWait(
        `「啊啊…不愧是魔王大人的肉棒，一整天都元气满满的，${sc()}忍不住要多弄几次了呢～」`,
      ); // :6565
      await era.printAndWait(`${target_name}握着手里的阴茎嫣然一笑………`); // :6566
      // CFLAG:263  = 3（变量语义：CFLAG 族，263） // :6567
      kojo.朝口交 = 3; // :6567
    } else if (
      (era.get(`abl:${target}:16`) || 0) >= 5 &&
      (kojo.朝口交 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :6569
      await era.printAndWait(
        `「呜呜…唔嗯…啊呜…哈哈…唔啊♪………真是诱人的肉棒，该进行早上的调教了哦………」`,
      ); // :6570
      await era.printAndWait(
        `${target_name}周到地把肉棒吮吸得干干净净后轻轻叹息一声，转身走出了房间………`,
      ); // :6571
      // CFLAG:263  = 2（变量语义：CFLAG 族，263） // :6572
      kojo.朝口交 = 2; // :6572
    } else if (kojo.朝口交 < 1 || game.kojo.口上开关 === 2) {
      // :6574
      await era.printAndWait(
        `「啊哈…哈…一大早就这么精神…再、再来一次就够了吧…该去调教了呢………」`,
      ); // :6575
      await era.printAndWait(`${target_name}擦了擦满是精液的嘴角离开了屋子………`); // :6576
      // CFLAG:263  = 1（变量语义：CFLAG 族，263） // :6577
      kojo.朝口交 = 1; // :6577
    } // :6577-6578
  } // :6577-6579

  if (game.train.初吻与自我口上 === 4) {
    // :6584

    if (
      (era.get(`talent:${target}:9`) || 0) === 1 &&
      (kojo.调教后性交 < 3 || game.kojo.口上开关 === 2)
    ) {
      // :6586
      await era.printAndWait(
        `即使${target_name}已经被玩坏了也无法忘怀做爱的快感啊………`,
      ); // :6587
      // CFLAG:264  = 3（变量语义：CFLAG 族，264） // :6588
      kojo.调教后性交 = 3; // :6588
    } else if (
      (era.get(`abl:${target}:2`) || 0) >= 4 &&
      (kojo.调教后性交 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :6590
      await era.printAndWait(
        `已经完全被开发了的${target_name}的阴道在${player_name}阴茎的不断抽插下，产生了难以言喻的快感。`,
      ); // :6591
      await era.printAndWait(`「啊啊啊…能像这样抱着…${sc()}…${sc()}好幸福！」`); // :6592
      if (S >= 3) {
        // :6594
        await era.printAndWait(`${target_name}在${S}回中出后满足了………`); // :6594
      } // :6594
      // CFLAG:264  = 2（变量语义：CFLAG 族，264） // :6595
      kojo.调教后性交 = 2; // :6595
    } else if (kojo.调教后性交 < 1 || game.kojo.口上开关 === 2) {
      // :6597
      await era.printAndWait(`「啊啊…哈啊…啊啊…抱紧我…抱紧点…啊…啊啊啊啊！」`); // :6598
      await era.printAndWait(
        `化身为一条母狗的${target_name}紧紧抱住${player_name}不愿放开………`,
      ); // :6599
      // CFLAG:264  = 1（变量语义：CFLAG 族，264） // :6600
      kojo.调教后性交 = 1; // :6600
    } // :6600-6601
  } // :6600-6602

  if (game.train.初吻与自我口上 === 5) {
    // :6607

    if (
      (era.get(`talent:${target}:9`) || 0) === 1 &&
      (kojo.夜袭 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :6609
      await era.printAndWait(`「啊啊啊…啊啊…想要大肉棒…哈哈………」`); // :6610
      await era.printAndWait(
        `${target_name}被欲望控制，像个梦游症病人般进入了${master_name}的屋子………`,
      ); // :6611
      // CFLAG:265  = 2（变量语义：CFLAG 族，265） // :6612
      kojo.夜袭 = 2; // :6612
    } else if (kojo.夜袭 < 1 || game.kojo.口上开关 === 2) {
      // :6613
      await era.printAndWait(`「${sc()}觉得…监禁屋的锁也不过如此嘛………」`); // :6614
      await era.printAndWait(`${target_name}拉着${master_name}上了床。`); // :6615
      await era.printAndWait(
        `「像是…嗯…这样的话，无论什么时候袭击都是可行的吧？啊哈哈哈♪」`,
      ); // :6616
      // CFLAG:265  = 1（变量语义：CFLAG 族，265） // :6617
      kojo.夜袭 = 1; // :6617
    } // :6617-6618
  } // :6617-6619

  if (game.train.初吻与自我口上 === 6) {
    // :6624

    if ((era.get(`talent:${target}:9`) || 0) === 1) {
      // :6626
      await era.printAndWait(
        `「啊啊啊啊…终于出来了…${sc()}已经自由了…哈哈哈哈哈」`,
      ); // :6627
      await era.printAndWait(
        `见到这一幕来取货的奴隶商人不禁皱了皱眉头，${master_name}装作什么也不知道的样子签下了契约书………`,
      ); // :6628
    } else if (
      (era.get(`talent:${target}:85`) || 0) &&
      (era.get(`mark:${target}:3`) || 0) < 3
    ) {
      // :6630
      await era.printAndWait(
        `「背叛和被背叛什么的也不是第一次了…可还是没想到魔王大人也………」`,
      ); // :6631
      await era.printAndWait(`${target_name}痛快地坐上了马车。`); // :6632
      await era.printAndWait(`没有上手铐和脚镣，一言不发地被送向远方………`); // :6633
    } else if ((era.get(`mark:${target}:3`) || 0) === 3) {
      // :6635
      await era.printAndWait(
        `「有件事给我记住…我一定会杀了你…一定要杀了你！」`,
      ); // :6636
      await era.printAndWait(
        `暴怒的${target_name}最终被绳子捆起来，送到了马车上………`,
      ); // :6637
    } else if (era.get(`talent:${target}:76`) || 0) {
      // :6639
      await era.printAndWait(
        `「${sc()}的小穴…一旦玩厌了…就被当成已经厌倦了的玩具般丢掉了呢………」`,
      ); // :6640
      await era.printAndWait(
        `流着泪说着这样的话，${target_name}坐上马车，被卖往远方………`,
      ); // :6641
    } else {
      // :6643-6644
      await era.printAndWait(
        `「输给魔王被俘，性命就由不得自己掌控了…这种说法哪有道理啊！该死！${sc()}不想被卖啊！」`,
      ); // :6644
      await era.printAndWait(`${target_name}哭叫着被绑上了马车………`); // :6645
    } // :6645-6646
    await era.print(''); // :6647
    if ((era.get(`talent:${target}:122`) || 0) !== 1) {
      // :6649
      await stub_line('SELL_MATURO_K0'); // CALL SELL_MATURO_K0 // :6649
    } // :6649
  } // :6649-6650

  if (game.train.初吻与自我口上 === 11) {
    // :6656
    if (kojo.妊娠发觉 === 0) {
      // :6657

      if ((era.get(`talent:${target}:9`) || 0) === 1) {
        // :6659
        await era.printAndWait(
          `「${sc()}的肚子里好像有什么东西呢…啊啊啊，这家伙大概会把${sc()}整个吃掉吧…啊哈哈哈哈」`,
        ); // :6660
        await era.printAndWait(
          `以${target_name}的精神状况已经无法认清怀孕的事实了………`,
        ); // :6661
      } else if (view.event.妊娠相手 === 1) {
        // :6663

        if (era.get(`talent:${target}:85`) || 0) {
          // :6665
          await era.printAndWait(
            `「魔王大人快来摸摸哟…${sc()}的肚子里已经有魔王大人的孩子了呢…${heart(1)}」`,
          ); // :6666
          await era.printAndWait(`${target_name}出神地用手摩挲着小腹………`); // :6667
        } else if (era.get(`talent:${target}:76`) || 0) {
          // :6669
          await era.printAndWait(
            `「啊啊…肚子里已经怀有魔王大人的孩子了…这样的情况下被魔王大人侵犯一定会很舒服吧？」`,
          ); // :6670
          await era.printAndWait(
            `${target_name}摸着下腹部，用舌头舔了舔嘴唇………`,
          ); // :6671
        } else {
          // :6671-6672
          await era.printAndWait(
            `「难道…是…魔王的孩子…${sc()}肚子里的那东西…啊啊啊」`,
          ); // :6673
          await era.printAndWait(
            `${target_name}因为这巨大的打击不禁潸然泪下………`,
          ); // :6674
        } // :6674-6675
      } else if (view.event.妊娠相手 === 2) {
        // :6677
        await era.printAndWait(`「难道是有了…${cstr2}的孩子吗………」`); // :6678
        await era.printAndWait(`意外的怀孕让${target_name}的脸色十分难看………`); // :6679
      } else if (view.event.妊娠相手 === 3) {
        // :6681
        await era.printAndWait(`「难道是有了…${cstr2}的孩子吗………」`); // :6682
        await era.printAndWait(`意外的怀孕让${target_name}的脸色十分难看………`); // :6683
      } else if (view.event.妊娠相手 === 5) {
        // :6685
        if ((era.get(`talent:${target}:136`) || 0) === 1) {
          // :6686
          await era.printAndWait(
            `「啊哈哈哈！竟然生下了狗先生的孩子，真是幸运啊」`,
          ); // :6687
        } else {
          // :6687-6688
          await era.printAndWait(
            `「唔啊啊…野狗的孩子孕育在${sc()}的肚子里，这是什么鬼东西啊………啊！」`,
          ); // :6689
          await era.printAndWait(
            `${target_name}因为自己的身体失陷于兽类而流下了懊恼的泪水………`,
          ); // :6690
        } // :6690-6691
      } else if (view.event.妊娠相手 === 7) {
        // :6693
        await era.printAndWait(`「${sc()}怀了狂王殿下的…真的…？」`); // :6694
      } else {
        // :6696-6697
        await era.printAndWait(
          `「啊啊…${sc()}肚子里怀的到底是谁的孩子啊………！」`,
        ); // :6697
      } // :6697-6698
      // CFLAG:271  = 1（变量语义：CFLAG 族，271） // :6699
      kojo.妊娠发觉 = 1; // :6699
    } else {
      // :6701-6702

      if ((era.get(`talent:${target}:9`) || 0) === 1) {
        // :6703
        await era.printAndWait(
          `「${sc()}的肚子里好像有什么东西呢…啊啊啊，这家伙大概会把${sc()}整个吃掉吧…啊哈哈哈哈」`,
        ); // :6704
        await era.printAndWait(
          `以${target_name}的精神状况已经无法认清怀孕的事实了………`,
        ); // :6705
      } else if (view.event.妊娠相手 === 1) {
        // :6707

        if (era.get(`talent:${target}:85`) || 0) {
          // :6709
          await era.printAndWait(
            `「魔王大人快来摸摸哟…${sc()}的肚子里已经有魔王大人的孩子了呢…${heart(1)}」`,
          ); // :6710
          await era.printAndWait(`${target_name}出神地用手摩挲着小腹………`); // :6711
        } else if (era.get(`talent:${target}:76`) || 0) {
          // :6713
          await era.printAndWait(
            `「啊啊…肚子里已经怀有魔王大人的孩子了…这样的情况下被魔王大人侵犯一定会很舒服吧？」`,
          ); // :6714
          await era.printAndWait(
            `${target_name}摸着下腹部，用舌头舔了舔嘴唇………`,
          ); // :6715
        } else {
          // :6715-6716
          await era.printAndWait(
            `「难道…是…魔王的孩子…${sc()}肚子里的那东西…啊啊啊」`,
          ); // :6717
          await era.printAndWait(
            `${target_name}因为这巨大的打击不禁潸然泪下………`,
          ); // :6718
        } // :6718-6719
      } else if (view.event.妊娠相手 === 2) {
        // :6721
        await era.printAndWait(`「难道是有了…${cstr2}的孩子吗………」`); // :6722
        await era.printAndWait(`意外的怀孕让${target_name}的脸色十分难看………`); // :6723
      } else if (view.event.妊娠相手 === 3) {
        // :6725
        await era.printAndWait(`「难道是有了…${cstr2}的孩子吗………」`); // :6726
        await era.printAndWait(`意外的怀孕让${target_name}的脸色十分难看………`); // :6727
      } else if (view.event.妊娠相手 === 5) {
        // :6729
        if ((era.get(`talent:${target}:136`) || 0) === 1) {
          // :6730
          await era.printAndWait(
            `「啊哈哈哈！竟然生下了狗先生的孩子，真是幸运啊」`,
          ); // :6731
        } else {
          // :6731-6732
          await era.printAndWait(
            `「唔啊啊…野狗的孩子孕育在${sc()}的肚子里，这是什么鬼东西啊………啊！」`,
          ); // :6733
          await era.printAndWait(
            `${target_name}因为自己的身体失陷于兽类而流下了懊恼的泪水………`,
          ); // :6734
        } // :6734-6735
      } else if (view.event.妊娠相手 === 7) {
        // :6737
        await era.printAndWait(`「${sc()}怀了狂王殿下的…真的…？」`); // :6738
      } else {
        // :6740-6741
        await era.printAndWait(
          `「啊啊…${sc()}肚子里怀的到底是谁的孩子啊………！」`,
        ); // :6741
      } // :6741-6742
      // CFLAG:271  = 1（变量语义：CFLAG 族，271） // :6743
      kojo.妊娠发觉 = 1; // :6743
    } // :6743-6744
  } // :6743-6745

  if (game.train.初吻与自我口上 === 12) {
    // :6751
    if (kojo.生产 === 0) {
      // :6752

      if ((era.get(`talent:${target}:9`) || 0) === 1) {
        // :6754
        await era.printAndWait(
          `「孩、孩子出生了…${sc()}的可爱的小怪物…♪ 哈哈哈哈」`,
        ); // :6755
        await era.printAndWait(
          `生产的过程平安地结束了，然而${target_name}崩坏的精神已经没救了吧………`,
        ); // :6756
      } else if (view.event.妊娠相手 === 1) {
        // :6758

        if (era.get(`talent:${target}:85`) || 0) {
          // :6760
          await era.printAndWait(
            `「魔王大人的孩子哟…终于…这孩子的角和尾巴跟大人一模一样呢…${heart(1)}」`,
          ); // :6761
          await era.printAndWait(`${target_name}哄着怀里被布包裹的魔物婴儿………`); // :6762
        } else if (era.get(`talent:${target}:76`) || 0) {
          // :6764
          await era.printAndWait(
            `「呜呼呼…跟魔王大人一样喜欢袭击漂亮大姐姐的样子呢…${heart(1)}」`,
          ); // :6765
          await era.printAndWait(
            `${target_name}带着些许失神的表情抚摸着怀中的孩子………`,
          ); // :6766
        } else {
          // :6766-6767
          await era.printAndWait(
            `「啊啊啊…已经生出了魔王的孩子呢…没法…回头了………」`,
          ); // :6768
          await era.printAndWait(`${target_name}用细小的声音嘟哝着………`); // :6769
        } // :6769-6770
      } else if (view.event.妊娠相手 === 2) {
        // :6772
        await era.printAndWait(
          `「哈哈…${cstr2}的孩子已经生下来了呢…孩子的哭声元气十足啊…」`,
        ); // :6773
        await era.printAndWait(`${target_name}心满意足地点了点头………`); // :6774
      } else if (view.event.妊娠相手 === 3) {
        // :6776
        await era.printAndWait(
          `「哈哈…${cstr2}的孩子已经生下来了呢…孩子的哭声元气十足啊…」`,
        ); // :6777
        await era.printAndWait(`${target_name}心满意足地点了点头………`); // :6778
      } else if (view.event.妊娠相手 === 4) {
        // :6780
        await era.printAndWait(`「哈啊，孩子出生了…啊啊啊啊…搞什么啊…」`); // :6781
      } else if (view.event.妊娠相手 === 5) {
        // :6783
        if ((era.get(`talent:${target}:136`) || 0) === 1) {
          // :6784
          await era.printAndWait(
            `「啊啊啊，如此元气十足的哭声，即使是${sc()}和狗的孩子也让人感觉动力十足呢♪」`,
          ); // :6785
        } else {
          // :6785-6786
          await era.printAndWait(
            `「呜呜呜…从哭声里就听得出来…${sc()}和狗的孩子已经生出来了啊………」`,
          ); // :6787
        } // :6787-6788
      } else if (view.event.妊娠相手 === 7) {
        // :6790
        await era.printAndWait(`「狂王殿下和…下贱的${sc()}的孩子…」`); // :6791
      } else {
        // :6793-6794
        await era.printAndWait(
          `「啊啊…哈啊…那样的东西我都觉得肮脏啊！快扔掉好了！」`,
        ); // :6794
        await era.printAndWait(
          `${target_name}完全无法接受这个事实，看都不想看这孩子一眼………`,
        ); // :6795
      } // :6795-6796
      // CFLAG:272  = 1（变量语义：CFLAG 族，272） // :6797
      kojo.生产 = 1; // :6797
    } else {
      // :6797-6798

      if ((era.get(`talent:${target}:9`) || 0) === 1) {
        // :6800
        await era.printAndWait(
          `「孩、孩子出生了…${sc()}的可爱的小怪物…♪ 哈哈哈哈」`,
        ); // :6801
        await era.printAndWait(
          `生产的过程平安地结束了，然而${target_name}崩坏的精神已经没救了吧………`,
        ); // :6802
      } else if (view.event.妊娠相手 === 1) {
        // :6804

        if (era.get(`talent:${target}:85`) || 0) {
          // :6806
          await era.printAndWait(
            `「魔王大人的孩子哟…终于…这孩子的角和尾巴跟大人一模一样呢…${heart(1)}」`,
          ); // :6807
          await era.printAndWait(`${target_name}哄着怀里被布包裹的魔物婴儿………`); // :6808
        } else if (era.get(`talent:${target}:76`) || 0) {
          // :6810
          await era.printAndWait(
            `「呜呼呼…跟魔王大人一样喜欢袭击漂亮大姐姐的样子呢…${heart(1)}」`,
          ); // :6811
          await era.printAndWait(
            `${target_name}带着些许失神的表情抚摸着怀中的孩子………`,
          ); // :6812
        } else {
          // :6812-6813
          await era.printAndWait(
            `「啊啊啊…已经生出了魔王的孩子呢…没法…回头了………」`,
          ); // :6814
          await era.printAndWait(`${target_name}用细小的声音嘟哝着………`); // :6815
        } // :6815-6816
      } else if (view.event.妊娠相手 === 2) {
        // :6818
        await era.printAndWait(
          `「哈哈…${cstr2}的孩子已经生下来了呢…孩子的哭声元气十足啊…」`,
        ); // :6819
        await era.printAndWait(`${target_name}心满意足地点了点头………`); // :6820
      } else if (view.event.妊娠相手 === 3) {
        // :6822
        await era.printAndWait(
          `「哈哈…${cstr2}的孩子已经生下来了呢…孩子的哭声元气十足啊…」`,
        ); // :6823
        await era.printAndWait(`${target_name}心满意足地点了点头………`); // :6824
      } else if (view.event.妊娠相手 === 4) {
        // :6826
        await era.printAndWait(`「哈啊，孩子出生了…啊啊啊啊…搞什么啊…」`); // :6827
      } else if (view.event.妊娠相手 === 5) {
        // :6829
        if ((era.get(`talent:${target}:136`) || 0) === 1) {
          // :6830
          await era.printAndWait(
            `「啊啊啊、如此元气十足的哭声，即使是${sc()}和狗的孩子也让人感觉动力十足呢♪」`,
          ); // :6831
        } else {
          // :6831-6832
          await era.printAndWait(
            `「呜呜呜…从哭声里就听得出来…${sc()}和狗的孩子已经生出来了啊………」`,
          ); // :6833
        } // :6833-6834
      } else if (view.event.妊娠相手 === 7) {
        // :6836
        await era.printAndWait(`「狂王殿下和…下贱的${sc()}的孩子…」`); // :6837
      } else {
        // :6839-6840
        await era.printAndWait(
          `「啊啊…哈啊…那样的东西我都觉得肮脏啊！快扔掉好了！」`,
        ); // :6840
        await era.printAndWait(
          `${target_name}完全无法接受这个事实，看都不想看这孩子一眼………`,
        ); // :6841
      } // :6841-6842
      // CFLAG:272  = 1（变量语义：CFLAG 族，272） // :6843
      kojo.生产 = 1; // :6843
    } // :6843-6844
  } // :6843-6845

  if (game.train.初吻与自我口上 === 13) {
    // :6850

    if (
      era.get(`talent:${target}:85`) ||
      0 ||
      era.get(`talent:${target}:76`) ||
      0
    ) {
      // :6852

      if (era.get(`talent:${target}:153`) || 0) {
        // :6854
        await era.printAndWait(
          `「哈…这样下去长大了的${sc()}也会恶贯满盈吗～」`,
        ); // :6855
        await era.printAndWait(
          `${target_name}抚摸着这因为将要生产而膨大的肚子………`,
        ); // :6856
      } else if (era.get(`talent:${target}:154`) || 0) {
        // :6858
        await era.printAndWait(
          `「什么啊…${sc()}给孩子喝牛奶这种事很奇怪吗？」`,
        ); // :6859
        await era.printAndWait(`${target_name}漫不经心地哄着孩子………`); // :6860
      } // :6860-6861
    } // :6862-6863
    // CFLAG:273  = 1（变量语义：CFLAG 族，273） // :6863
    kojo.育儿室 = 1; // :6863
  } // :6863-6864

  if (game.train.初吻与自我口上 === 14) {
    // :6869

    if (
      era.get(`talent:${target}:85`) ||
      0 ||
      era.get(`talent:${target}:76`) ||
      0
    ) {
      // :6871
      await era.printAndWait(
        `「大家…没什么好哭的，孩子走了反而更清静了不是么…呜」`,
      ); // :6872
    } // :6872-6873
    // CFLAG:274  = 1（变量语义：CFLAG 族，274） // :6874
    kojo.亲离 = 1; // :6874
  } // :6874-6875

  if (game.train.初吻与自我口上 === 999) {
    // :6881

    if (era.get(`talent:${target}:85`) || 0) {
      // :6883
      await era.printAndWait(`明明，还还有值得留恋的东西啊…`); // :6884
    } else {
      // :6886-6887
      await era.printAndWait(`就、就到此为止了吧。`); // :6887
    } // :6887-6888
  } // :6887-6889

  if (game.train.初吻与自我口上 === 998) {
    // :6894

    if (era.get(`talent:${target}:85`) || 0) {
      // :6896
      await era.printAndWait(`不能…陪你走到最后了`); // :6897
    } else {
      // :6899-6900
      await era.printAndWait(`无法抵抗死神的召唤…`); // :6900
    } // :6900-6901
  } // :6900-6902

  // TFLAG:13  = 0（变量语义：TFLAG 族，13） // :6907
  game.train.初吻与自我口上 = 0; // :6907

  return 0; // :6907-6909
}

// @DUNGEON_RYOUZYOKU_K6 // :6940

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
    // :6945

    await era.printAndWait(`「这不可能…不可能吧…${sc()}的…处女之身…」`); // :6947

    if (
      (era.get(`talent:${target}:21`) || 0) === 1 ||
      (era.get(`talent:${target}:22`) || 0) === 1
    ) {
      // :6949

      await era.printAndWait(`「不可能…不…」`); // :6952

      return 0; // :6954-6955
    } else if (
      (era.get(`talent:${target}:17`) || 0) === 1 ||
      (era.get(`talent:${target}:31`) || 0) === 1 ||
      (era.get(`talent:${target}:36`) || 0) === 1
    ) {
      // :6955

      await era.printAndWait(`「放过我！请您放过我！拜、拜托了…」`); // :6958

      if (
        (era.get(`talent:${target}:106`) || 0) === 1 ||
        (era.get(`exp:${target}:1`) || 0) > 0
      ) {
        // :6962
        await era.printAndWait(`「可以的话享用我的屁股吧！请…拜托了…帮帮我…」`); // :6962
      } // :6962

      if ((era.get(`exp:${target}:22`) || 0) > 0) {
        // :6966
        await era.printAndWait(`「需要的话请使用我的嘴巴吧！我会尽力的…」`); // :6966
      } // :6966
    } else if (
      (era.get(`talent:${target}:11`) || 0) === 1 ||
      (era.get(`talent:${target}:12`) || 0) === 1 ||
      (era.get(`talent:${target}:15`) || 0) === 1 ||
      (era.get(`talent:${target}:30`) || 0) === 1 ||
      (era.get(`talent:${target}:34`) || 0) === 1
    ) {
      // :6968

      await era.printAndWait(`「一定会杀了你的！总有一天会…会…杀死你…」`); // :6972
    } else if (
      (era.get(`talent:${target}:10`) || 0) === 1 ||
      (era.get(`talent:${target}:26`) || 0) === 1
    ) {
      // :6974

      await era.printAndWait(`「去死吧！都死掉啊…死掉就好了…」`); // :6977
    } else {
      // :6977-6979

      await era.printAndWait(`「嘶…该死！！不想死啊！不想就这么死啊…」`); // :6982
    } // :6982-6984
  } else {
    // :6985-6987

    await era.printAndWait(`「不可能的…被这样的下等生物…」`); // :6987

    if (
      (era.get(`talent:${target}:21`) || 0) === 1 ||
      (era.get(`talent:${target}:22`) || 0) === 1
    ) {
      // :6989

      await era.printAndWait(`「不可能…不…」`); // :6992

      return 0; // :6994-6995
    } else if (
      (era.get(`talent:${target}:17`) || 0) === 1 ||
      (era.get(`talent:${target}:31`) || 0) === 1 ||
      (era.get(`talent:${target}:36`) || 0) === 1
    ) {
      // :6995

      await era.printAndWait(
        `「饶我一命…求你了！放过我吧！想怎么使用${sc()}的身体都行！」`,
      ); // :6998

      if (
        (era.get(`talent:${target}:106`) || 0) === 1 ||
        (era.get(`exp:${target}:1`) || 0) > 0
      ) {
        // :7002
        await era.printAndWait(
          `「我的肛交经验很丰富！就算玩坏我身上所有的洞也好…拜托了…」`,
        ); // :7002
      } // :7002

      if ((era.get(`exp:${target}:22`) || 0) > 0) {
        // :7006
        await era.printAndWait(`「会努力用嘴服侍您的…拜托了…」`); // :7006
      } // :7006
    } else if (
      (era.get(`talent:${target}:11`) || 0) === 1 ||
      (era.get(`talent:${target}:12`) || 0) === 1 ||
      (era.get(`talent:${target}:15`) || 0) === 1 ||
      (era.get(`talent:${target}:30`) || 0) === 1 ||
      (era.get(`talent:${target}:34`) || 0) === 1
    ) {
      // :7008

      await era.printAndWait(`「一定会杀了你的！　总有一天会…会…杀死你…」`); // :7012
    } else if (
      (era.get(`talent:${target}:10`) || 0) === 1 ||
      (era.get(`talent:${target}:26`) || 0) === 1
    ) {
      // :7014

      await era.printAndWait(`「去死吧！都死掉啊…死掉就好了…」`); // :7017
    } else {
      // :7017-7019

      await era.printAndWait(`「嘶…该死！！不想死啊！不想就这么死啊…」`); // :7022
    } // :7022-7024
  } // :7022-7025

  return 0; // :7027-7030
}

// @DUNGEON_RYOUZYOKU_AFTER_K6 // :7030

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
    // :7035

    await era.printAndWait(`「呜呜呜…不要…唔啊啊」`); // :7037

    if (
      (era.get(`talent:${target}:21`) || 0) === 1 ||
      (era.get(`talent:${target}:22`) || 0) === 1
    ) {
      // :7039

      await era.printAndWait(`「呜…」`); // :7042

      return 0; // :7042-7044
    } // :7045-7047

    if ((era.get(`exp:${target}:1`) || 0) > 20) {
      // :7048
      await era.printAndWait(`「屁股…的感觉…」`); // :7049
      await era.printAndWait(`「呜呜呜…」`); // :7050
    } // :7050-7051

    if ((era.get(`exp:${target}:22`) || 0) > 20) {
      // :7055
      await era.printAndWait(`「别让我再舔了…」`); // :7055
    } // :7055

    if ((era.get(`exp:${target}:20`) || 0) > 20) {
      // :7059
      await era.printAndWait(`「咕啊啊啊…」`); // :7059
    } // :7059
  } else {
    // :7059-7060

    await era.printAndWait(`「呜…呼啊…呜…」`); // :7062

    if (
      (era.get(`talent:${target}:21`) || 0) === 1 ||
      (era.get(`talent:${target}:22`) || 0) === 1
    ) {
      // :7064

      await era.printAndWait(`「呜…」`); // :7067

      return 0; // :7067-7069
    } // :7070-7072

    if ((era.get(`exp:${target}:0`) || 0) > 20) {
      // :7073
      await era.printAndWait(`「有点…太过分了…」`); // :7074
      await era.printAndWait(`「要…坏掉了…」`); // :7075
    } // :7075-7076

    if ((era.get(`exp:${target}:1`) || 0) > 20) {
      // :7079
      await era.printAndWait(`「屁股…的感觉…」`); // :7080
      await era.printAndWait(`「呜…」`); // :7081
    } // :7081-7082

    if ((era.get(`exp:${target}:22`) || 0) > 20) {
      // :7086
      await era.printAndWait(`「别让我再舔了…」`); // :7086
    } // :7086

    if ((era.get(`exp:${target}:20`) || 0) > 20) {
      // :7090
      await era.printAndWait(`「咕啊啊啊…」`); // :7090
    } // :7090
  } // :7090-7091

  return 0; // :7093-7095
}

// @BENKI_KOUJO_K6 // :7095

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
    // :7100

    if (game.dungeon.肉便器常识改写 === 1) {
      // :7103
      await era.printAndWait(
        `「嘿、肉便器服务呢。连对这么恶心的生物也要『完全服从』什么的了、好好安心吧」`,
      ); // :7104
      await era.printAndWait(
        `「先说好咯${sc()}最讨厌像你们这样又丑又臭的家伙了。甚至要吐了的哦」`,
      ); // :7105
      await era.printAndWait(
        `「但是『完全服从』的时候也是会好好做好口交、好好舔干净肉棒上的东西的、就别介意啦♪」`,
      ); // :7106
    } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
      // :7108
      await era.printAndWait(
        `「愚蠢的家伙们，能得到我这样的便器可是你们的荣幸啊！！」`,
      ); // :7109
    } else if (era.get(`talent:${a}:85`) || 0) {
      // :7111
      await era.printAndWait(`「对不起！对不起！对…」`); // :7112
    } else if ((era.get(`abl:${a}:16`) || 0) >= 5) {
      // :7114
      await era.printAndWait(`「还做得不够好…」`); // :7115
    } else {
      // :7117-7118
      await era.printAndWait(`「哎呀！救、救命…」`); // :7118
    } // :7118-7119
  } else if (game.train.肉便器行动 === 1) {
    // :7120

    if ((era.get(`talent:${a}:76`) || 0) === 1) {
      // :7123
      await era.printAndWait(
        `「${sc()}是个喜欢作肉便器的变态女人哟哟哟！！哇啊啊啊啊♪♪」`,
      ); // :7124
    } else if (era.get(`talent:${a}:85`) || 0) {
      // :7126
      await era.printAndWait(`「请让我为您服务…」`); // :7127
    } else if ((era.get(`abl:${a}:16`) || 0) >= 5) {
      // :7129
      await era.printAndWait(`「请让我为您服务…」`); // :7130
    } else {
      // :7132-7133
      await era.printAndWait(`「哎呀！救、救命…」`); // :7133
    } // :7133-7134
  } else if (game.train.肉便器行动 === 2) {
    // :7135

    if ((era.get(`talent:${target}:136`) || 0) === 1) {
      // :7138
      await era.printAndWait(
        `「${sc()}是头母猪的说！一头下贱的除了被干以外没有任何价值的母猪！哇啊啊啊啊！」`,
      ); // :7139
    } else if ((era.get(`talent:${a}:76`) || 0) === 1) {
      // :7141
      await era.printAndWait(
        `「${sc()}是头母猪的说！一头下贱的除了被干以外没有任何价值的母猪！哇啊啊啊啊！」`,
      ); // :7142
    } else if (era.get(`talent:${a}:85`) || 0) {
      // :7144
      await era.printAndWait(`「交尾么…啊啊啊啊…」`); // :7145
    } else if ((era.get(`abl:${a}:16`) || 0) >= 5) {
      // :7147
      await era.printAndWait(`「请和我交尾…」`); // :7148
    } else {
      // :7150-7151
      await era.printAndWait(`「这也太疯狂了…开玩笑吧…」`); // :7151
    } // :7151-7152
  } else if (game.train.肉便器行动 === 3) {
    // :7153

    if (game.dungeon.肉便器常识改写 === 1) {
      // :7156
      await era.printAndWait(
        `「好嘞、明白咯${heart(1)}　快把前后两个穴都操烂吧${heart(1)}」`,
      ); // :7157
      await era.printAndWait(
        `「真是的、真操坏了可怎么办啊……嘛、就算真操坏了、还被催眠着就没法抵抗了啦♪」`,
      ); // :7158
      await era.printAndWait(
        `「这样乱来说不定还会这么怀上谁的孩子呢、人生真是完蛋了${heart(1)}」`,
      ); // :7159
    } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
      // :7161
      await era.printAndWait(
        `「请再用力一点！${sc()}的小穴就是为了肉棒而生的！」`,
      ); // :7162
    } else if (era.get(`talent:${a}:85`) || 0) {
      // :7164
      await era.printAndWait(`「唔啊，好…痛苦…」`); // :7165
    } else if ((era.get(`abl:${a}:16`) || 0) >= 5) {
      // :7167
      await era.printAndWait(`「前面和后面都可以使用…」`); // :7168
    } else {
      // :7170-7171
      await era.printAndWait(`「救救我！」`); // :7171
    } // :7171-7172
  } else if (game.train.肉便器行动 === 4) {
    // :7173

    if ((era.get(`talent:${a}:76`) || 0) === 1) {
      // :7176
      await era.printAndWait(
        `「${sc()}决定开放自己的小穴哦，来尽情地享用吧～♪」`,
      ); // :7177
    } else if (era.get(`talent:${a}:85`) || 0) {
      // :7179
      await era.printAndWait(`「那里…呜啊啊啊」`); // :7180
    } else if ((era.get(`abl:${a}:16`) || 0) >= 5) {
      // :7182
      await era.printAndWait(`「请享用我的小穴…」`); // :7183
    } else {
      // :7185-7186
      await era.printAndWait(`「救救我！」`); // :7186
    } // :7186-7187
  } else if (game.train.肉便器行动 === 5) {
    // :7188

    if ((era.get(`talent:${a}:76`) || 0) === 1) {
      // :7191
      await era.printAndWait(`「菊花肉便器♪　${sc()}的肛门就是最好的肉便器♪」`); // :7192
    } else if (era.get(`talent:${a}:85`) || 0) {
      // :7194
      await era.printAndWait(`「屁股感觉好…」`); // :7195
    } else if ((era.get(`abl:${a}:16`) || 0) >= 5) {
      // :7197
      await era.printAndWait(`「请享用我的屁股…」`); // :7198
    } else {
      // :7200-7201
      await era.printAndWait(`「不要啊！」`); // :7201
    } // :7201-7202
  } else if (game.train.肉便器行动 === 6) {
    // :7203

    if ((era.get(`talent:${target}:76`) || 0) === 1) {
      // :7206
      await era.printAndWait(`「用嘴免费！　用嘴巴就不用钱！」`); // :7207
    } else if (era.get(`talent:${target}:85`) || 0) {
      // :7209
      await era.printAndWait(`「给我肉棒……肉棒」`); // :7210
    } else if ((era.get(`abl:${target}:16`) || 0) >= 5) {
      // :7212
      await era.printAndWait(`「让我奉仕肉棒把……」`); // :7213
    } else {
      // :7215-7216
      await era.printAndWait(`「呕……」`); // :7216
    } // :7216-7217
  } else if (game.train.肉便器行动 === 7) {
    // :7218

    if ((era.get(`talent:${target}:136`) || 0) === 1) {
      // :7221
      await era.printAndWait(
        `「大家久等了！　家畜${target_name}哦。今天也要看着${sc()}的交配好好撸哦♪」`,
      ); // :7222
    } else if ((era.get(`talent:${target}:76`) || 0) === 1) {
      // :7224
      await era.printAndWait(
        `「今天也要好好地把${sc()}的羞耻的模样……尽收眼底哦！」`,
      ); // :7225
    } else if (era.get(`talent:${target}:85`) || 0) {
      // :7227
      await era.printAndWait(
        `「今天也要好好地把${sc()}的羞耻的模样……尽收眼底哦！」`,
      ); // :7228
    } else if ((era.get(`abl:${target}:16`) || 0) >= 5) {
      // :7230
      await era.printAndWait(`「${sc()}就在这里了啊……不看可不行哦」`); // :7231
    } else {
      // :7233-7234
      await era.printAndWait(`「${sc()}就在这里了啊……不看可不行哦」`); // :7234
    } // :7234-7235
  } else if (game.train.肉便器行动 === 8) {
    // :7236

    if ((era.get(`talent:${target}:76`) || 0) === 1) {
      // :7239
      await era.printAndWait(
        `「今天也十分感谢♪　${target_name}哦。今天${sc()}，叫了妓女姐姐来哦！」`,
      ); // :7240
      await era.printAndWait(`「${sc()}们的鱼水之欢，好好看着哦♪」`); // :7241
    } else if (era.get(`talent:${target}:85`) || 0) {
      // :7243
      await era.printAndWait(
        `「今天也十分感谢♪　${target_name}哦。今日${sc()}，叫了妓女姐姐来哦！」`,
      ); // :7244
      await era.printAndWait(`「${sc()}们的鱼水之欢，好好看着哦♪」`); // :7245
    } else if ((era.get(`abl:${target}:16`) || 0) >= 5) {
      // :7247
      await era.printAndWait(
        `「今天啊，叫了妓女姐姐来。之后就要在房间里啪啪啪了……」`,
      ); // :7248
    } else {
      // :7250-7251
      await era.printAndWait(
        `「今天啊，叫了妓女姐姐来。之后就要在房间里啪啪啪了……」`,
      ); // :7251
    } // :7251-7252
  } else if (game.train.肉便器行动 === 9) {
    // :7253

    if ((era.get(`talent:${target}:76`) || 0) === 1) {
      // :7256
      await era.printAndWait(
        `「今天也十分感谢♪　${target_name}哦。今日的${sc()}，带着水晶球到外面来了……」`,
      ); // :7257
      await era.printAndWait(`「${sc()}，现在开始全裸出镜，看着哦……♪」`); // :7258
    } else if (era.get(`talent:${target}:85`) || 0) {
      // :7260
      await era.printAndWait(
        `「今天也十分感谢♪　${target_name}哦。今日的${sc()}，带着水晶球到外面来了……」`,
      ); // :7261
      await era.printAndWait(`「${sc()}，现在开始全裸出镜，看着哦……♪」`); // :7262
    } else if ((era.get(`abl:${target}:16`) || 0) >= 5) {
      // :7264
      await era.printAndWait(`「今天，就在地下城里全裸瞎晃……」`); // :7265
    } else {
      // :7267-7268
      await era.printAndWait(`「今天，就在地下城里全裸瞎晃……」`); // :7268
    } // :7268-7269
  } // :7268-7270

  return 0; // :7272-7275
}

// @DUNGEON_VICTORY_K6 // :7275

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

  await era.printAndWait(`「嘁，明明是个废物却表现的这么嚣张」`); // :7280

  if (
    (era.get(`talent:${target}:21`) || 0) === 1 ||
    (era.get(`talent:${target}:22`) || 0) === 1
  ) {
    // :7282

    if (rand_n(3) === 0) {
      // :7285
      await era.printAndWait(`「消失吧！」`); // :7286
    } else if (rand_n(2) === 0) {
      // :7287
      await era.printAndWait(`「哈哈！」`); // :7288
    } else {
      // :7288-7289
      await era.printAndWait(`「去死！」`); // :7290
    } // :7290-7291

    return 0; // :7293-7294
  } else if (
    (era.get(`talent:${target}:11`) || 0) === 1 ||
    (era.get(`talent:${target}:12`) || 0) === 1 ||
    (era.get(`talent:${target}:15`) || 0) === 1 ||
    (era.get(`talent:${target}:30`) || 0) === 1 ||
    (era.get(`talent:${target}:34`) || 0) === 1
  ) {
    // :7294

    if (rand_n(4) === 0) {
      // :7297
      await era.printAndWait(`「只有这种程度吗～？弱者。就赐你一死吧」`); // :7298
    } else if (rand_n(3) === 0) {
      // :7299
      await era.printAndWait(`「哈哈！丑陋的生物！」`); // :7300
    } else if (rand_n(2) === 0) {
      // :7301
      await era.printAndWait(`「哈哈！愚蠢的下等生物！」`); // :7302
    } else {
      // :7302-7303
      await era.printAndWait(`「这就是你的末路」`); // :7304
    } // :7304-7305
  } else if (
    (era.get(`talent:${target}:10`) || 0) === 1 ||
    (era.get(`talent:${target}:26`) || 0) === 1
  ) {
    // :7307

    if (rand_n(4) === 0) {
      // :7310
      await era.printAndWait(`「差不多就好了啊……」`); // :7311
    } else if (rand_n(3) === 0) {
      // :7312
      await era.printAndWait(`「简直不敢相信……」`); // :7313
    } else if (rand_n(2) === 0) {
      // :7314
      await era.printAndWait(`「区区废物还想蹬鼻子上脸……」`); // :7315
    } else {
      // :7315-7316
      await era.printAndWait(`「吓了一跳呢，原来这么弱啊…」`); // :7317
    } // :7317-7318

    return 0; // :7317-7320
  } else {
    // :7321-7323

    if (rand_n(4) === 0) {
      // :7324
      await era.printAndWait(`「呼，清理完垃圾清爽很多呢」`); // :7325
    } else if (rand_n(3) === 0) {
      // :7326
      await era.printAndWait(`「废物！这不就把鞋子弄脏了么！」`); // :7327
    } else if (rand_n(2) === 0) {
      // :7328
      await era.printAndWait(`「这鲜血如同其自身一样肮脏」`); // :7329
    } else {
      // :7329-7330
      await era.printAndWait(`「肮脏！庸俗！无可救药的渣滓们啊！」`); // :7331
    } // :7331-7332
  } // :7334-7336

  if (
    ((era.get(`base:${a}:0`) || 0) * 100) / era.get(`maxbase:${a}:0`) < 50 ||
    ((era.get(`base:${a}:1`) || 0) * 100) / era.get(`maxbase:${a}:1`) < 50
  ) {
    // :7336

    await era.printAndWait(`（有点不妙啊…）`); // :7338
  } else {
    // :7338-7339

    await era.printAndWait(`「${sc()}已经天下无敌了！」`); // :7341
  } // :7341-7342

  return 0; // :7341-7344
}

// @DUNGEON_ATTACK_K6 // :7349

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
    // :7354

    if (
      (era.get(`talent:${target}:21`) || 0) === 1 ||
      (era.get(`talent:${target}:22`) || 0) === 1
    ) {
      // :7356

      await era.printAndWait(`「……」`); // :7359

      return 0; // :7361-7362
    } else if (
      (era.get(`talent:${target}:11`) || 0) === 1 ||
      (era.get(`talent:${target}:12`) || 0) === 1 ||
      (era.get(`talent:${target}:15`) || 0) === 1 ||
      (era.get(`talent:${target}:30`) || 0) === 1 ||
      (era.get(`talent:${target}:34`) || 0) === 1
    ) {
      // :7362

      if (rand_n(3) === 0) {
        // :7365
        await era.printAndWait(`「死吧！渣滓！」`); // :7366
      } else if (rand_n(2) === 0) {
        // :7367
        await era.printAndWait(`「见死神去吧！」`); // :7368
      } else {
        // :7368-7369
        await era.printAndWait(`「肮脏的垃圾！」`); // :7370
      } // :7370-7371
    } else if (
      (era.get(`talent:${target}:10`) || 0) === 1 ||
      (era.get(`talent:${target}:26`) || 0) === 1
    ) {
      // :7373

      await era.printAndWait(`「这是什么……去死啊啊」`); // :7376

      return 0; // :7376-7378
    } else {
      // :7379-7381

      if (rand_n(3) === 0) {
        // :7382
        await era.printAndWait(`「从${sc()}面前消失吧！」`); // :7383
      } else if (rand_n(2) === 0) {
        // :7384
        await era.printAndWait(`「看到我还不逃走吗！」`); // :7385
      } else {
        // :7385-7386
        await era.printAndWait(`「真是丑陋。」`); // :7387
      } // :7387-7388
    } // :7387-7390
  } else {
    // :7391-7393

    if (
      (era.get(`talent:${target}:21`) || 0) === 1 ||
      (era.get(`talent:${target}:22`) || 0) === 1
    ) {
      // :7393

      await era.printAndWait(`「……」`); // :7396

      return 0; // :7398-7399
    } else if (
      (era.get(`talent:${target}:11`) || 0) === 1 ||
      (era.get(`talent:${target}:12`) || 0) === 1 ||
      (era.get(`talent:${target}:15`) || 0) === 1 ||
      (era.get(`talent:${target}:30`) || 0) === 1 ||
      (era.get(`talent:${target}:34`) || 0) === 1
    ) {
      // :7399

      if (rand_n(3) === 0) {
        // :7402
        await era.printAndWait(`「啊啊，到此为止了！」`); // :7403
      } else if (rand_n(2) === 0) {
        // :7404
        await era.printAndWait(`「你赢不了的，还是投降吧！」`); // :7405
      } else {
        // :7405-7406
        await era.printAndWait(`「嘁，你那无聊的正义，看清楚我的力量吧！」`); // :7407
      } // :7407-7408
    } else if (
      (era.get(`talent:${target}:10`) || 0) === 1 ||
      (era.get(`talent:${target}:26`) || 0) === 1
    ) {
      // :7410

      await era.printAndWait(`「魔王大人赐予的力量…绝不会输！」`); // :7413

      return 0; // :7413-7415
    } else {
      // :7416-7418

      if (rand_n(3) === 0) {
        // :7419
        await era.printAndWait(`「傻孩子……我来教你享受真正的快乐吧～」`); // :7420
      } else if (rand_n(2) === 0) {
        // :7421
        await era.printAndWait(`「决定了！恩准你成为${sc()}的部下吧！」`); // :7422
      } else {
        // :7422-7423
        await era.printAndWait(`「你的样子很适合做肉便器哦！」`); // :7424
      } // :7424-7425
    } // :7424-7427
  } // :7424-7428

  return 0; // :7424-7432
}

// @COLOSSEUM_KOJO_6 // :7444

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
    // :7448

    if ((era.get(`base:${target}:1`) || 0) <= 0) {
      // :7450
      await era.printAndWait(`${target_name}像是已经没有力气站起来了一样……`); // :7451
    } else {
      // :7451-7452
      await era.printAndWait(`${target_name}高昂的战意看得她的对手心惊胆战……`); // :7453
    } // :7453-7454
    return 0; // :7453-7455
  } // :7456-7458

  if (era_flag.selectcom === 56) {
    // :7460

    if ((era.get(`base:${target}:1`) || 0) <= 0) {
      // :7462

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :7464
        await era.printAndWait(`「呜哇…${assi_name}请放过我吧……」`); // :7465
        await era.printAndWait(
          `气力用尽的${target_name}悔恨地抓着死斗场的墙壁……`,
        ); // :7466
      } else {
        // :7466-7467
        await era.printAndWait(`「哈啊…哈啊…想怎么做就怎么做吧……」`); // :7468
        await era.printAndWait(
          `气力用尽的${target_name}悔恨地抓着死斗场的墙壁……`,
        ); // :7469
      } // :7469-7470
    } else {
      // :7471-7472

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :7473
        await era.printAndWait(
          `「呼，哼…${assi_name}这种程度的对手早就习以为常了！」`,
        ); // :7474
        await era.printAndWait(`${target_name}看着${assi_name}逞强地说……`); // :7475
      } else {
        // :7475-7476
        await era.printAndWait(
          `「那、那样的怪物${sc()}一个人就可以干掉十只！来决一死战吧！」`,
        ); // :7477
        await era.printAndWait(
          `尽管面对着死斗场里丑陋的怪物，${target_name}还是说出了非常强硬的话……`,
        ); // :7478
      } // :7478-7479
    } // :7478-7480
    return 0; // :7478-7481
  } // :7482-7485

  if (era_flag.selectcom === 31) {
    // :7487

    if (era_flag.assi > 0 && era_flag.assiplay) {
      // :7489
      await era.printAndWait(
        `「啊啊啊…已经…已经不能再应付更多的肉棒了…会痛的啊……哇啊…呜咕噜…！」`,
      ); // :7490
      await era.print(`${assi_name}将`); // :7491
      if (
        (era.get(`talent:${assi}:121`) || 0) === 1 ||
        (era.get(`talent:${assi}:122`) || 0) === 1
      ) {
        // :7493
        await era.print(`阴茎`); // :7493
      } // :7493
      if (
        (era.get(`talent:${assi}:121`) || 0) !== 1 &&
        (era.get(`talent:${assi}:122`) || 0) !== 1 &&
        era.get('item:PBAND') === 1
      ) {
        // :7495
        await era.print(`假阳具`); // :7495
      } // :7495
      await era.printAndWait(
        `塞入${target_name}的口中。她吞吐着，脸上带有几分愉悦的表情……`,
      ); // :7496
    } else {
      // :7496-7497
      await era.printAndWait(`「啊啊啊…这种、这种可怕的味道……哇啊…呜咕噜…！」`); // :7498
      await era.printAndWait(`${target_name}吮舔着气味令人作呕的肉棒……`); // :7499
    } // :7499-7500
    return 0; // :7499-7501
  } // :7502-7504

  if (era_flag.selectcom === 5) {
    // :7506

    if (era_flag.assi > 0 && era_flag.assiplay) {
      // :7508
      await era.printAndWait(
        `「${assi_name}…求、求你别这样对待${sc()}的身体啊…啊啊…啊呜呜！」`,
      ); // :7509
      await era.printAndWait(`${target_name}被${assi_name}爱抚着胸部……`); // :7510
    } else {
      // :7510-7511
      await era.printAndWait(`「痛、好痛…别那么粗暴地揉啊…给我住手啊喂！」`); // :7512
      await era.printAndWait(
        `${target_name}的乳房被毫无章法地玩弄着，发出痛苦的呻吟……`,
      ); // :7513
    } // :7513-7514
    return 0; // :7513-7515
  } // :7516-7518

  if (era_flag.selectcom === 21) {
    // :7520

    if (era_flag.assi > 0 && era_flag.assiplay) {
      // :7522
      await era.printAndWait(
        `「你、你怎么能这样对我啊…不要…这样激烈的话…啊啊啊啊…饶、饶了我吧！！～！」`,
      ); // :7523
      await era.print(`${assi_name}边听着惨叫边用`); // :7524
      if (
        (era.get(`talent:${assi}:121`) || 0) === 1 ||
        (era.get(`talent:${assi}:122`) || 0) === 1
      ) {
        // :7526
        await era.print(`阴茎`); // :7526
      } // :7526
      if (
        (era.get(`talent:${assi}:121`) || 0) !== 1 &&
        (era.get(`talent:${assi}:122`) || 0) !== 1 &&
        era.get('item:PBAND') === 1
      ) {
        // :7528
        await era.print(`假阳具`); // :7528
      } // :7528
      await era.printAndWait(`毫不留情地蹂躏着${target_name}的阴道……`); // :7529
    } else if (game.train.死斗场敌种 === 206) {
      // :7531
      await era.printAndWait(`「痛…痛啊…呜咿…咕咿咿咿……」`); // :7532
      await era.printAndWait(
        `可怜的${target_name}只能无力地呻吟着，任凭巨魔摆布……`,
      ); // :7533
    } else {
      // :7533-7534
      await era.printAndWait(
        `「呜…呜啊…${scf()}、${sc()}认真起来的话，这种家伙………呜……哇！！」`,
      ); // :7535
      await era.printAndWait(`${target_name}被怪物无情地侵犯着……`); // :7536
    } // :7536-7537
    return 0; // :7536-7538
  } // :7536-7539

  if (era_flag.selectcom === 27) {
    // :7544

    if (era_flag.assi > 0 && era_flag.assiplay) {
      // :7546
      await era.printAndWait(
        `「你、你怎么能这样对我啊…不要…这样侵犯我的屁股的话…啊啊啊啊…这样下去屁股会坏掉的啊！」`,
      ); // :7547
      await era.print(`${assi_name}边听着惨叫边用`); // :7548
      if (
        (era.get(`talent:${assi}:121`) || 0) === 1 ||
        (era.get(`talent:${assi}:122`) || 0) === 1
      ) {
        // :7550
        await era.print(`阴茎`); // :7550
      } // :7550
      if (
        (era.get(`talent:${assi}:121`) || 0) !== 1 &&
        (era.get(`talent:${assi}:122`) || 0) !== 1 &&
        era.get('item:PBAND') === 1
      ) {
        // :7552
        await era.print(`假阳具`); // :7552
      } // :7552
      await era.printAndWait(`蹂躏着${target_name}那鲜嫩的肛门……`); // :7553
    } else if (game.train.死斗场敌种 === 206) {
      // :7555
      await era.printAndWait(`「痛…痛啊…呜咿…咕咿咿咿……」`); // :7556
      await era.printAndWait(
        `可怜的${target_name}只能无力的呻吟着，任凭巨魔摆布……`,
      ); // :7557
    } else {
      // :7557-7558
      await era.printAndWait(
        `「${scf()}、${sc()}如果认真起来的话…明明…啊啊啊…别、别动我的屁股啊！！」`,
      ); // :7559
      await era.printAndWait(`${target_name}的肛门被怪物们肆意侵犯着……`); // :7560
    } // :7560-7561
    return 0; // :7560-7562
  } // :7560-7563

  if (era_flag.selectcom === 51) {
    // :7568
    await era.printAndWait(
      `「这、这种低劣的…春药…对我完全没有作用啊…呜…呜嗯…啊啊…」`,
    ); // :7569
    return 0; // :7569-7570
  } // :7569-7571

  return 0; // :7574-7577
}

// @NTR_KOUJO_K6 // :7577

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
    // :7581
    // CFLAG:650  = 1（变量语义：CFLAG 族，650） // :7581
    kojo.NTR再捕获 = 1; // :7581
  } // :7581

  if (P === 1) {
    // :7584

    if (
      era.get(`talent:${target}:76`) ||
      0 ||
      era.get(`talent:${target}:85`) ||
      0
    ) {
      // :7586
      await era.printAndWait(
        `「住手、住手！${sc()}还…只被魔王大人抱过啊…唔啊…啊啊啊啊啊！」`,
      ); // :7587
    } else {
      // :7587-7588
      await era.printAndWait(
        `「不要…不要啊…${sc()}为什么…怎么会…不自觉地…开始配合了…啊！」`,
      ); // :7589
    } // :7589-7590
    // CFLAG:651  = 1（变量语义：CFLAG 族，651） // :7591
    kojo.NTR_651 = 1; // :7591
  } else if (P === 2) {
    // :7593
    if (
      era.get(`talent:${target}:76`) ||
      0 ||
      era.get(`talent:${target}:85`) ||
      0
    ) {
      // :7594
      await era.printAndWait(
        `「呜啊！肛门被…被大肉棒侵入了…啊啊啊…啊…啊啊…哇啊啊啊${heart(1)}」`,
      ); // :7595
    } else {
      // :7595-7596
      await era.printAndWait(
        `「这样的事也被${sc()}给…碰到了…屈服的话…呜啊…其实…也不是不可以嘛♪」`,
      ); // :7597
    } // :7597-7598
    // CFLAG:652  = 1（变量语义：CFLAG 族，652） // :7599
    kojo.NTR_652 = 1; // :7599
  } else if (P === 3) {
    // :7601
    if (era.get(`talent:${target}:136`) || 0) {
      // :7602
      await era.printAndWait(
        `「啊啊啊…被这样…看着…啊啊啊啊…${sc()}是个变态，被狗粗暴地侵犯反而很兴奋呢…请看着我…看着我吧！啊…啊啊啊啊～${heart(1)}」`,
      ); // :7603
    } else if (
      era.get(`talent:${target}:76`) ||
      0 ||
      era.get(`talent:${target}:85`) ||
      0
    ) {
      // :7604
      await era.printAndWait(
        `「这样吗…真是屈辱…大概…那家伙也不愿意看到我现在这副样子吧…呜…啊…啊啊啊${heart(1)}」`,
      ); // :7605
    } else {
      // :7605-7606
      await era.printAndWait(
        `「住手…别这样…该死…啊…啊喂…唔啊…啊啊啊啊啊啊！」`,
      ); // :7607
    } // :7607-7608
    // CFLAG:653  = 1（变量语义：CFLAG 族，653） // :7609
    kojo.NTR_653 = 1; // :7609
  } else if (P === 4) {
    // :7611
    if (
      era.get(`talent:${target}:76`) ||
      0 ||
      era.get(`talent:${target}:85`) ||
      0
    ) {
      // :7612
      await era.printAndWait(
        `「唔啊…嘤嘤…请更用力地侵犯我…狂王大人…${sc()}已经变得糟糕了啊啊…要坏掉了${heart(1)}」`,
      ); // :7613
    } else {
      // :7613-7614
      await era.printAndWait(
        `「啊啊啊…狂王大人的腰技…最棒了…啊啊啊…已经受不了了啦♪」`,
      ); // :7615
    } // :7615-7616
    // CFLAG:654  = 1（变量语义：CFLAG 族，654） // :7617
    kojo.NTR_654 = 1; // :7617
  } else if (P === 5) {
    // :7619
    if (
      era.get(`talent:${target}:76`) ||
      0 ||
      era.get(`talent:${target}:85`) ||
      0
    ) {
      // :7620
      await era.printAndWait(
        `「还想要…还想要更多的…大肉棒…${heart(1)} ${sc()}的脑袋里…已经只有淫荡这两个字了啊…${heart(1)}」`,
      ); // :7621
    } else {
      // :7621-7622
      await era.printAndWait(
        `「啊啊啊…${sc()}的屁股和小穴已经…唔啊…停、停不下来了…${scf()}、${sc()}…想要成为大家的肉便器♪」`,
      ); // :7623
    } // :7623-7624
    // CFLAG:655  = 1（变量语义：CFLAG 族，655） // :7625
    kojo.NTR_655 = 1; // :7625
  } else if (P === 6) {
    // :7627
    if (
      era.get(`talent:${target}:76`) ||
      0 ||
      era.get(`talent:${target}:85`) ||
      0
    ) {
      // :7628
      await era.printAndWait(
        `「啊啊啊…啊呜…呜啊…魔王什么的对${sc()}来说已经不算什么了…啊啊…只想要更多的肉棒给我带来快感…哇啊${heart(1)}」`,
      ); // :7629
    } else {
      // :7629-7630
      await era.printAndWait(
        `「来吧…快来啊…请…唔啊…大家…在…在我这个肉便器身上射出精液吧…♪」`,
      ); // :7631
    } // :7631-7632
    // CFLAG:656  = 1（变量语义：CFLAG 族，656） // :7633
    kojo.NTR_656 = 1; // :7633
  } else if (P === 7) {
    // :7635
    if (
      era.get(`talent:${target}:76`) ||
      0 ||
      era.get(`talent:${target}:85`) ||
      0
    ) {
      // :7636
      await era.printAndWait(
        `「呼呼…${sc()}已经是狂王殿下的人了…那个地方，不回去也无所谓啊…${heart(1)}」`,
      ); // :7637
      await era.printAndWait(
        `「今后服侍狂王大人这种事情，就由我来负责好了…${heart(1)}」`,
      ); // :7638
    } else {
      // :7638-7639
      await era.printAndWait(
        `「啊哈…啊啊啊…魔王大人…您的仆人…已经向狂王殿下倒戈了哦…♪」`,
      ); // :7640
    } // :7640-7641
    // CFLAG:657  = 1（变量语义：CFLAG 族，657） // :7642
    kojo.NTR_657 = 1; // :7642
  } else if (P === 20) {
    // :7644
    if (
      era.get(`talent:${target}:76`) ||
      0 ||
      era.get(`talent:${target}:85`) ||
      0
    ) {
      // :7645
      if (view.event.妊娠相手 === 1) {
        // :7646
        await era.printAndWait(
          `「那个孩子是${sc()}的小孩…所以…请还给我啊………」`,
        ); // :7647
      } else {
        // :7647-7648
        await era.printAndWait(
          `「既然${sc()}已经到了这种境地…这孩子就是狂王大人的了…」`,
        ); // :7649
      } // :7649-7650
    } else {
      // :7651-7652
      await era.printAndWait(
        `「啊哈哈…魔王大人…有看到${sc()}生下的孩子的样子吗？」`,
      ); // :7652
      await era.printAndWait(`「今天小穴也被狂王殿下灌满了精液哦♪」`); // :7653
    } // :7653-7654
  } // :7653-7655
  return 0; // :7653-7656
}

// @EXUCUTION_KOUJO_K6 // :7660

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
    // :7663
    await era.printAndWait(
      `「其他的什么都可以！请饶恕我，不要让我做怪兽的肉便器啊！」`,
    ); // :7664
  } else if (game.event.犬射精或处刑口上 === 5) {
    // :7666
    await era.printAndWait(
      `「干什么！${sc()}、${sc()}不要变成这样啊…哈啊啊…啊啊啊啊啊………」`,
    ); // :7667
  } else if (game.event.犬射精或处刑口上 === 6) {
    // :7669
    await era.printAndWait(`「${sc()}总有一天会报复回来的啊啊啊！」`); // :7670
  } else if (game.event.犬射精或处刑口上 === 7) {
    // :7672
    await era.printAndWait(''); // :7673
  } // :7672-7674
}

// @MUSEUM_KOUJO_K6 // :7677

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
    // :7680
    await era.printAndWait(`「谁…谁想变成你所谓的石像啊！」`); // :7681
    await era.printAndWait(`${target_name}毫无顾忌地竖起中指………`); // :7682
  } else if (game.event.博物馆口上 === 1) {
    // :7684
    await era.printAndWait(`「变成标本也会一直诅咒你啊！」`); // :7685
  } else if (game.event.博物馆口上 === 2) {
    // :7687
    await era.printAndWait(`「变成蜡像也不会放过你！」`); // :7688
  } else if (game.event.博物馆口上 === 3) {
    // :7690
    await era.printAndWait(
      `「呜呜、${sc()}这样的暴露的样子被…！…别盯着这边看啊！」`,
    ); // :7691
  } else if (game.event.博物馆口上 === 4) {
    // :7693
    await era.printAndWait(
      `「${sc()}是绝对！不会…变成…你的……人…偶、什……么……的…」`,
    ); // :7694
    await era.printAndWait(
      `看起来${chara_callname(a)}到最后也没有察觉到异变的发生呢…`,
    ); // :7695
  } else if (game.event.博物馆口上 === 5) {
    // :7697
    await era.printAndWait(`「就这样毫无美感的…」`); // :7698
  } else if (game.event.博物馆口上 === 6) {
    // :7700
    await era.printAndWait(`「就这样变成中看不中用的玩物吗…」`); // :7701
  } else if (game.event.博物馆口上 === 7) {
    // :7703
    await era.printAndWait(`「就这样失去生命了呢…」`); // :7704
  } else if (game.event.博物馆口上 === 8) {
    // :7706
    await era.printAndWait(`「才不要变成家具，不要啊…」`); // :7707
  } else if (game.event.博物馆口上 === 9) {
    // :7709
    await era.printAndWait(`「敢这么做的话，小心我撕烂这幅画啊！」`); // :7710
  } // :7710-7711
}

// @BANISHMENT_KOUJO_K6 // :7714

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
    // :7718
    await era.printAndWait(
      `「骗人的吧…${sc()}已经失去力量了…这样的话…这样的话…那些家伙…真是荒谬啊………」`,
    ); // :7719
  } else if (game.event.流放口上 === 1) {
    // :7721
    await era.printAndWait(''); // :7722
  } else if (game.event.流放口上 === 2) {
    // :7724
    await era.printAndWait(''); // :7725
  } else if (game.event.流放口上 === 3) {
    // :7727
    await era.printAndWait(''); // :7728
  } else if (game.event.流放口上 === 4) {
    // :7730
    await era.printAndWait(''); // :7731
  } // :7730-7732
}

// @PUBLIC_EXUCUTION_KOUJO_K6 // :7735

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
    // :7739
    await era.printAndWait(
      `「喂、喂…骗人的吧…${sc()}的身体…被那些野兽什么的一起蹂躏的话…会死的啊…一定会死的啊」`,
    ); // :7740
  } else if (game.event.公开处刑口上 === 1) {
    // :7742
    await era.printAndWait(
      `「呼，捕获的人就会被这样处决吗…魔王的残暴还真是一览无遗啊………」`,
    ); // :7743
  } else if (game.event.公开处刑口上 === 2) {
    // :7745
    await era.printAndWait(''); // :7746
  } // :7745-7747
}

// @GROTESQUE_KOUJO_K6 // :7750

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
    // :7754
    await era.printAndWait(''); // :7755
  } else if (game.event.猎奇处刑口上 === 1) {
    // :7757
    await era.printAndWait(''); // :7758
  } else if (game.event.猎奇处刑口上 === 2) {
    // :7760
    await era.printAndWait(''); // :7761
  } else if (game.event.猎奇处刑口上 === 3) {
    // :7763
    await era.printAndWait(''); // :7764
  } else if (game.event.猎奇处刑口上 === 4) {
    // :7766
    await era.printAndWait(''); // :7767
  } else if (game.event.猎奇处刑口上 === 5) {
    // :7769
    await era.printAndWait(''); // :7770
  } else if (game.event.猎奇处刑口上 === 6) {
    // :7772
    await era.printAndWait(''); // :7773
  } // :7772-7774
}

// @ENTERENEMY_KOUJO_K6 // :7777

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
    // :7780

    await era.printAndWait(`「………开始了」`); // :7782
  } else if (
    (era.get(`talent:${a}:11`) || 0) === 1 ||
    (era.get(`talent:${a}:12`) || 0) === 1 ||
    (era.get(`talent:${a}:15`) || 0) === 1 ||
    (era.get(`talent:${a}:30`) || 0) === 1 ||
    (era.get(`talent:${a}:34`) || 0) === 1
  ) {
    // :7783

    await era.printAndWait(`「不管魔王有一个还是两个，都消灭给你看！」`); // :7785
  } else if (
    (era.get(`talent:${a}:10`) || 0) === 1 ||
    (era.get(`talent:${a}:26`) || 0) === 1
  ) {
    // :7786

    await era.printAndWait(
      `「要、要进入这样的地方吗，才不会害怕啊，${self_call(a)}可是勇者来着…」`,
    ); // :7788
  } else {
    // :7788-7789

    await era.printAndWait(`「要消灭这群虫子吗？不过是探囊取物而已啊！」`); // :7791
  } // :7791-7792
}

// @GOHOUBI_REQUEST_KOUJO_K6 // :7796

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
    // :7799

    await era.printAndWait(`「${self_call(a)}想要很多钱」`); // :7801
  } else if (
    chara(a).stronghold.要求奖赏 === 1 ||
    chara(a).stronghold.要求奖赏 === 2 ||
    chara(a).stronghold.要求奖赏 === 3
  ) {
    // :7802

    await era.printAndWait(`「${self_call(a)}想和…`); // :7804
    if (chara(a).stronghold.要求奖赏 === 1) {
      // :7805
      await era.print(`狗`); // :7806
    } else if (chara(a).stronghold.要求奖赏 === 2) {
      // :7807
      await era.print(`猪`); // :7808
    } else if (chara(a).stronghold.要求奖赏 === 3) {
      // :7809
      await era.print(`马`); // :7810
    } // :7810-7811
    await era.printAndWait(`性交啦♪」`); // :7812
  } else if (chara(a).stronghold.要求奖赏 === 4) {
    // :7813

    await era.printAndWait(`「请、请吻我吧…啊啊」`); // :7815
  } else if (chara(a).stronghold.要求奖赏 === 5) {
    // :7816

    await era.printAndWait(`「回来的时候…请拥抱我～」`); // :7818
  } else if (chara(a).stronghold.要求奖赏 === 6) {
    // :7819

    await era.printAndWait(`「让我来帮你做一次满满的口交吧～」`); // :7821
  } else if (chara(a).stronghold.要求奖赏 === 7) {
    // :7822

    await era.printAndWait(`「呼呼…想要跟大家交，朋，友～」`); // :7824
  } else if (chara(a).stronghold.要求奖赏 === 8) {
    // :7825

    await era.printAndWait(`「${self_call(a)}想请…魔王大人撒尿…♪」`); // :7827
  } else if (chara(a).stronghold.要求奖赏 === 9) {
    // :7828

    await era.printAndWait(`「作为女人想品尝童贞的肉棒呢…♪」`); // :7830
  } // :7830-7831
}

// @GOHOUBI_AFTER_KOUJO_K6 // :7834

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
    // :7838
    await era.printAndWait(`「这样的事情可不能长久」`); // :7839
  } else if (choice === 1) {
    // :7841
    await era.printAndWait(`「感觉还不错嘛…${self_call(a)}…」`); // :7842
  } else if (choice === 2) {
    // :7843

    if (chara(a).stronghold.要求奖赏 === 0) {
      // :7845
      await era.printAndWait(`「该怎么用呢？这样下去能存很多钱吧～」`); // :7846
    } else if (chara(a).stronghold.要求奖赏 === 1) {
      // :7848

      if ((era.get(`talent:${a}:0`) || 0) === 1) {
        // :7850
        await era.printAndWait(`「唔啊！被狗狗干肛门最棒了！最最最棒了！」`); // :7851
      } else {
        // :7851-7852
        await era.printAndWait(`「唔啊！跟狗狗性交最棒了！最最最棒了！」`); // :7853
      } // :7853-7854
    } else if (chara(a).stronghold.要求奖赏 === 2) {
      // :7856

      if ((era.get(`talent:${a}:0`) || 0) === 1) {
        // :7858
        await era.printAndWait(`「唔啊！被猪干肛门最棒了！最最最棒了！」`); // :7859
      } else {
        // :7859-7860
        await era.printAndWait(`「唔啊！跟猪性交最棒了！最最最棒了！」`); // :7861
      } // :7861-7862
    } else if (chara(a).stronghold.要求奖赏 === 3) {
      // :7864

      if ((era.get(`talent:${a}:0`) || 0) === 1) {
        // :7866
        await era.printAndWait(`「唔啊！被马干肛门最棒了！最最最棒了！」`); // :7867
      } else {
        // :7867-7868
        await era.printAndWait(`「唔啊！跟马性交最棒了！最最最棒了！」`); // :7869
      } // :7869-7870
    } else if (chara(a).stronghold.要求奖赏 === 4) {
      // :7872
      await era.printAndWait(
        `「呵呵，这样的吻就已经满足了啊，${self_call(a)}果然是个廉价的女人呢♪」`,
      ); // :7873
    } else if (chara(a).stronghold.要求奖赏 === 5) {
      // :7875

      if ((era.get(`abl:${a}:2`) || 0) > (era.get(`abl:${a}:3`) || 0)) {
        // :7877
        await era.printAndWait(
          `「啊啊啊！果然打倒勇者后被插小穴是最棒啊的啦！抱紧我哦！」`,
        ); // :7878
      } else {
        // :7880-7881
        await era.printAndWait(
          `「啊啊啊！果然打倒勇者后被插屁眼是最棒啊的啦！抱紧我哦！」`,
        ); // :7881
      } // :7881-7882
    } else if (chara(a).stronghold.要求奖赏 === 6) {
      // :7884
      await era.printAndWait(
        `「呼…作为报酬的话还远远不够呢，所以${self_call(a)}还要更努力的榨干你们嘛…${heart(1)}」`,
      ); // :7885
    } else if (chara(a).stronghold.要求奖赏 === 7) {
      // :7887

      if ((era.get(`talent:${a}:0`) || 0) === 1) {
        // :7889
        await era.printAndWait(`「像这种激烈程度的乱交派对…已经习惯了呢♪」`); // :7890
      } else {
        // :7890-7891
        await era.printAndWait(`「像这种激烈程度的乱交派对…已经习惯了呢♪」`); // :7892
      } // :7892-7893
    } else if (chara(a).stronghold.要求奖赏 === 8) {
      // :7895
      await era.printAndWait(`「哈哈…无论怎样的美酒都不及你的尿液啊♪」`); // :7896
    } else if (chara(a).stronghold.要求奖赏 === 9) {
      // :7898

      if ((era.get(`abl:${a}:2`) || 0) > (era.get(`abl:${a}:3`) || 0)) {
        // :7900
        await era.printAndWait(
          `「啊哈哈哈！处男的味道是怎样呢，想想都觉得激动啊！」`,
        ); // :7901
      } else {
        // :7903-7904
        await era.printAndWait(
          `「用屁股夺走鲜嫩肉棒的童贞的感觉真是太棒了哈哈${heart(1)}」`,
        ); // :7904
      } // :7904-7905
    } else {
      // :7904-7906
    } // :7904-7907
  } // :7908-7910
}

// @OSIOKI_KOUJO_K6 // :7910

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
    // :7914
    await era.printAndWait(
      `「${self_call_first(a)}、${self_call(a)}这就回房间」`,
    ); // :7915
  } else if (choice === 1) {
    // :7917

    if ((era.get(`abl:${a}:21`) || 0) >= 3) {
      // :7919
      await era.printAndWait(`「啊呜！哔哩哔哩地！哔哩哔哩啊呜哔哩哔哩！」`); // :7920
    } else {
      // :7920-7921
      await era.printAndWait(
        `「哈啊！这样…看不到尽头的拷问…呜呜、唔啊啊啊！」`,
      ); // :7922
    } // :7922-7923
  } else if (choice === 2) {
    // :7925

    if ((era.get(`abl:${a}:17`) || 0) >= 4) {
      // :7927
      await era.printAndWait(
        `「你在看什么？如果在看我的话是要付钱的哦，只要＄１就够了♪」`,
      ); // :7928
    } else {
      // :7928-7929
      await era.printAndWait(
        `「啊啊啊！你在看哪里啊！再看就杀了你！唔嗯…呜…啊呜」`,
      ); // :7930
    } // :7930-7931
  } else if (choice === 3) {
    // :7933

    if ((era.get(`abl:${a}:17`) || 0) >= 6) {
      // :7935
      await era.printAndWait(
        `「呼呼…唔啊…好，继续啊…更加仔细地看${self_call(a)}吧！」`,
      ); // :7936
    } else {
      // :7936-7937
      await era.printAndWait(`「呜咿…呜…呜咿呜咿咿咿咿………讨厌啊！」`); // :7938
    } // :7938-7939
  } else if (choice === 4) {
    // :7941

    if ((era.get(`abl:${a}:21`) || 0) >= 3) {
      // :7943
      await era.printAndWait(
        `「抱、抱歉讨伐失败了呢，${self_call(a)}真是头愚蠢的母猪！请狠狠的鞭笞我吧！」`,
      ); // :7944
    } else {
      // :7944-7945
      await era.printAndWait(
        `「哇啊！对不起啊！真对不起啊！全部都是${self_call(a)}的错！」`,
      ); // :7946
    } // :7946-7947
  } else if (choice === 5) {
    // :7949

    if (
      (era.get(`talent:${a}:88`) || 0) === 1 ||
      (era.get(`talent:${a}:76`) || 0) === 1
    ) {
      // :7951
      await era.printAndWait(
        `「啊啊啊…虽然是别人的尿但是意外的美味呢…谢、谢谢您提供的饮品………」`,
      ); // :7952
    } else {
      // :7952-7953
      await era.printAndWait(`「我要洗澡…要洗澡…洗澡………」`); // :7954
    } // :7954-7955
  } else if (choice === 6) {
    // :7957
    await era.printAndWait(`「事到如今，扫除这样的惩罚是我分内之事啊」`); // :7958
  } else if (choice === 7) {
    // :7960
    await era.printAndWait(`「啊啊…谁能给我一份饭吃就好了啊………」`); // :7961
  } else if (choice === 8) {
    // :7963
    await era.printAndWait(
      `「啊啊啊啊啊啊…我要大肉棒！不管是谁都好，请跟我性交吧！要疯了啊啊！就算是当做肉便器也无所谓了！啊啊啊！谁来救救我啊啊啊！」`,
    ); // :7964
  } else if (choice === 9) {
    // :7966
    await era.printAndWait(`「呀呼！」`); // :7967
  } // :7967-7968
}

// @GOBI_KOUJO_K6, ARG:0 // :7972

async function gobi_koujo_k6(arg_0, rand) {
  const { rand_n } = bind_ctx(rand);

  if (arg_0 === 1) {
    // :7975

    await era.print(`的哟♪`); // :7977
  } else if (arg_0 === 2) {
    // :7978

    await era.print(`啊！`); // :7980
  } else if (arg_0 === 3) {
    // :7981

    await era.print(`来着……。`); // :7983
  } else if (arg_0 === 4) {
    // :7984

    await era.print(`啦……。`); // :7986
  } else if (arg_0 === 5) {
    // :7987

    await era.print(`呢……。`); // :7989
  } else {
    // :7989-7990

    if (rand_n(3) === 0) {
      // :7993
      await era.print(`啊。`); // :7994
    } else if (rand_n(2) === 0) {
      // :7995
      await era.print(`呢。`); // :7996
    } else {
      // :7996-7997
      await era.print(`的说。`); // :7998
    } // :7998-7999
  } // :7998-8000
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
  STUBBED_CALLS,
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
