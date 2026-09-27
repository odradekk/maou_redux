/* eslint-disable no-irregular-whitespace, no-dupe-else-if, no-unreachable */
/**
 * @file マオ（村娘A）口上 K5：整份 EVENT_K5_マオ.ERB 复核落地（issue #236）。
 *
 * 转译初稿 products/kojo/kojo-k5-mao.js（#107）经逐段复核后移入。
 *
 * == 守卫（K5 与 K3 顺序不同，逐文件 1:1） ==
 *
 * @KOJO_MESSAGE_COM_5 的守卫（:771-793）：
 *   1. ASSI > 0 && ASSIPLAY（助手调教）→ 跳过；
 *   2. TEQUIP:45 && SELECTCOM != 45（口塞）→ 跳过；
 *   3. TFLAG:899（失神）→ 跳过；
 *   4. TEQUIP:89（兽奸）→ **静默跳过，无 DOG_KOJO 调用**；
 *   5. TEQUIP:90（触手）→ 跳过；
 *   6. TEQUIP:55（死斗场）→ **岔去本文件真身 COLOSSEUM_KOJO_5**；
 *   7. TALENT:9（崩坏）→ 跳过。
 *
 * == 状态机（CFLAG:301-400） ==
 *
 * 与 K3 同构但阈值是个位数：初回 → 1；二回目以降按「淫乱(76) → 爱慕(85) →
 * 屈服刻印Lv3 → Lv2 → それ以外」取首个命中。FLAG:7 == 2（默认）时上限被
 * 旁路、同支每次出声；FLAG:7 == 1 时逐阶段各出一次声。
 *
 * 这张票存根（docs/stub-registry.md）：无（K5 源文件无 SELL_MATURO 调用）。
 *
 * == 正文已归一为简体（issue #60） ==
 */

const era = require('#/era-electron');
const { on, TIER } = require('#/system/event/registry');
const era_flag = require('#/era-utils/era-flag');
const {
  kojo_message_com_family,
  self_kojo_family,
  kojo_message_palamcng_family,
  kojo_message_markcng_family,
  benki_koujo_family,
  enterenemy_koujo_family,
  dungeon_victory_family,
  dungeon_attack_family,
  ntr_koujo_family,
  exucution_koujo_family,
  museum_koujo_family,
  banishment_koujo_family,
  public_exucution_koujo_family,
  grotesque_koujo_family,
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
const { PALAMLV } = require('#/era-utils/palam-level');
const {
  peek_aftertrain_q,
  peek_aftertrain_s,
  peek_sale_price,
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

// @EVENTTRAIN #PRI（:80-84）：存在标志 + 总开关补 0
on(
  'EVENTTRAIN',
  () => {
    game.kojo.口上存在_5 = 1; // FLAG:105 = 1（K5 口上存在标志）
    if (game.kojo.口上开关 === 0) {
      game.kojo.口上开关 = 2;
    }
  },
  TIER.PRI,
);

// @EVENTEND #LATER（:86-88）：调教结束清存在标志
on(
  'EVENTEND',
  () => {
    game.kojo.口上存在_5 = 0;
  },
  TIER.LATER,
);

// @EVENTTRAIN
async function eventtrain_k5(rand) {
  const { target, target_name, master_name, kojo } = bind_ctx(rand);

  if (game.kojo.口上开关 <= 0) {
    return 0;
  }
  if (era.get(`talent:${target}:165`) !== 1) {
    return 0;
  }

  if (kojo.初调教 === 0) {
    era.drawLine();

    if (era.get(`talent:${target}:314`) === 9) {
      await era.printAndWait(`「不要…不要啊…对不起…对不起…神啊…救救我吧………」`);
      await era.printAndWait(
        `眼前这个魔族少女…曾经是人类、名为玛奥的这个少女在房间的角落里低声啜泣着。`,
      );
      await era.printAndWait(
        `${master_name}看着那个重生为魔族的少女、露出满意的微笑、出声搭话。`,
      );
      await era.printAndWait(
        `最初少女只是发呆地看着这边、或许是因为魔族的本能、认出了${master_name}就是魔王。`,
      );
      await era.printAndWait(`「…………魔王大人？…魔王大人的话…会救赎我的吧…？」`);
      await era.printAndWait(
        `虽然成为了魔族、但是没有随着肉体堕落勉强维持住理智的少女、终于找到了自己的主人………`,
      );
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;

      // CFLAG:370  = 1（变量语义：CFLAG 族，370）
      kojo.魔族化 = 1;
    } else {
      await era.printAndWait(
        `「你…你这家伙是谁啊！对本小姐做出这样的事、村子里的大家不会放过你的！」`,
      );
      await era.printAndWait(
        `少女…名字好像是叫玛奥…虽然被带到了调教室里、态度仍旧十分傲慢。`,
      );
      await era.printAndWait(
        `看上去是个１２~３岁左右的小女孩、晒黑的褐色肌肤与红色的头发十分相配、显得很可爱。`,
      );
      await era.printAndWait(`「要是敢做奇怪的事的话就咬你哦！」`);
      await era.printAndWait(
        `${master_name}把自己是魔王这件事告诉了少女、问她想要什么作为复活自己的回礼。`,
      );
      await era.printAndWait(
        `「骗…骗人的吧…魔王什么的不是童话里才有的吗…回、回礼什么的…总之我想要从这里出去…不、不行吗…？」`,
      );
      await era.printAndWait(
        `${master_name}看起来愉快地摇着头、用手摁住了少女的肩………`,
      );
      await era.printAndWait(`「讨…讨厌…别摸我…别过来！」`);
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;
      return 1;
    }
  } else if (
    kojo.初调教 < 5 &&
    kojo.魔族化 === 0 &&
    era.get(`talent:${target}:314`) === 9 &&
    era.get(`talent:${target}:85`) === 0 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    await era.printAndWait(`「我大概…已经…没法回到村子里去了……」`);
    await era.printAndWait(
      `眼前的魔族少女…曾经是人类的玛奥失望地垂下头、看着${master_name}。`,
    );
    await era.printAndWait(`「变成这样的身体什么的、根本没有想过啊………」`);
    await era.printAndWait(
      `${target_name}的脸皱了起来、一副马上要哭出来的样子。`,
    );

    // CFLAG:370  = 2（变量语义：CFLAG 族，370）
    kojo.魔族化 = 2;
    return 1;
  } else if (kojo.初调教 >= 1 && kojo.NTR再捕获 === 1) {
    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {
      era.drawLine();
      await era.printAndWait(
        `把在那个水晶球看到的事情告诉她之后、${target_name}的脸就像戴上了能面面具一样没有了表情。`,
      );
      await era.printAndWait(
        `「够、够了…干脆…干脆杀了我吧…我已经…不想再被很强的家伙玩来玩去了………那个狂王大人也是…魔王大人也是………」`,
      );
      await era.printAndWait(
        `「但是反正要死的话…想被魔王大人…杀死…就…就算被弄得七零八落也…只是希望不要被魔物杀了吃掉就好………」`,
      );
      await era.printAndWait(
        `”毕竟还是个小女孩”${master_name}用鼻子吭声冷笑、不管怎样${target_name}的命运从最初开始就被${master_name}握在手里、那之中已经不存在${target_name}的意志了………`,
      );

      // CFLAG:650  = 0（变量语义：CFLAG 族，650）
      kojo.NTR再捕获 = 0;
    } else {
      era.drawLine();
      await era.printAndWait(
        `「魔王大人、对、对不起、我对魔王大人一点违逆之心都没有…是那个狂王…强行要我………」`,
      );
      await era.printAndWait(`「请、请原谅…请原谅我吧………」`);
      await era.printAndWait(
        `${master_name}讲起被送来的水晶球你拍摄的内容、${target_name}五体投地跪在地上请求原谅………`,
      );

      // CFLAG:650  = 0（变量语义：CFLAG 族，650）
      kojo.NTR再捕获 = 0;
    }
    return 1;
  } else if (
    kojo.初调教 < 2 &&
    era.get(`mark:${target}:2`) === 1 &&
    era.get(`talent:${target}:85`) === 0 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    era.drawLine();
    await era.printAndWait(`「只要忍耐的话…勇者大人一定会来拯救我的…！」`);
    await era.printAndWait(
      `${target_name}依然还有反抗的精力、逞强地回瞪着你………`,
    );
    // CFLAG:201  = 2（变量语义：CFLAG 族，201）
    kojo.初调教 = 2;
    return 1;
  } else if (
    kojo.初调教 < 3 &&
    era.get(`mark:${target}:2`) === 2 &&
    era.get(`talent:${target}:85`) === 0 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    era.drawLine();
    await era.printAndWait(`「为什么…谁都没来救我………？」`);
    await era.printAndWait(`看起来${target_name}的精神已经变得相当很疲惫了………`);
    // CFLAG:201  = 3（变量语义：CFLAG 族，201）
    kojo.初调教 = 3;
    return 1;
  } else if (
    kojo.初调教 < 4 &&
    era.get(`mark:${target}:2`) === 3 &&
    era.get(`talent:${target}:85`) === 0 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    era.drawLine();
    await era.printAndWait(
      `「如果再这样下去的话…我、我整个人都要变得奇怪了………！」`,
    );
    await era.printAndWait(
      `${target_name}满脸通红、身体绷紧剧烈颤抖着。照着个样子下去要不了多久就会陷落的吧………`,
    );
    // CFLAG:201  = 4（变量语义：CFLAG 族，201）
    kojo.初调教 = 4;
    return 1;
  } else if (
    kojo.初调教 < 5 &&
    era.get(`talent:${target}:85`) === 0 &&
    era.get(`talent:${target}:76`) === 1 &&
    era.get(`talent:${target}:314`) !== 9
  ) {
    era.drawLine();
    await era.printAndWait(
      `${target_name}连${master_name}来到了房间都没在意、一直玩弄着股间。`,
    );
    await era.printAndWait(
      `「啊啊${heart(1)}…小穴…好舒服…好舒服啊…${heart(1)}」`,
    );
    await era.printAndWait(
      `「啊…主人…欺负小穴…好舒服…真的好舒服呜呜${heart(1)}」`,
    );
    await era.printAndWait(
      `${target_name}看到${master_name}来了、抬起腰、用手指摩擦着股间。`,
    );
    if (era.get(`talent:${target}:0`) === 1) {
      await era.printAndWait(
        `「好想快点被人夺走处女…已经做好准备了…${heart(1)}」`,
      );
    }
    await era.printAndWait(
      `${target_name}一边露出心神荡漾的表情一边持续着自慰、看起来已经完全变成淫乱的雌性了。`,
    );
    await era.printAndWait(
      `「已经…被…被怎么对待都可以…想要变得舒服起来${heart(1)}」`,
    );
    // CFLAG:201  = 5（变量语义：CFLAG 族，201）
    kojo.初调教 = 5;
    return 1;
  } else if (
    era.get(`talent:${target}:314`) === 9 &&
    kojo.初调教 < 6 &&
    era.get(`talent:${target}:85`) === 0 &&
    era.get(`talent:${target}:76`) === 1
  ) {
    era.drawLine();

    if (kojo.魔族化 === 1) {
      await era.printAndWait(`${target_name}匍匐在地上、不停玩弄着股间。`);
      await era.printAndWait(
        `背上的翅膀看起来很舒服地伸展着、口水都滴到了地上。`,
      );
      await era.printAndWait(`「主人…快…快…快来侵犯我啊………${heart(1)}」`);
      await era.printAndWait(
        `察觉到${master_name}到来的${target_name}一脸心神荡漾荡地投去了视线。`,
      );
      await era.printAndWait(
        `「啊…是主人啊…${heart(1)} 抱抱…抱抱………${heart(1)}」`,
      );
      await era.printAndWait(
        `经过反复调教而变得十分淫乱的${target_name}一边抱住${master_name}一边用自己的股间磨蹭${master_name}的大腿。`,
      );
      await era.printAndWait(
        `「好想做爱…已经忍不住啦…呐…快点去床上吧…${heart(1)}」`,
      );
      if (era.get(`talent:${target}:0`) === 1) {
        await era.printAndWait(
          `「我还是处女哦${heart(1)}…想要主人快点来侵犯我已经想的受不了了啦…${heart(1)}」`,
        );
      }
      // CFLAG:201  = 6（变量语义：CFLAG 族，201）
      kojo.初调教 = 6;
      return 1;
    } else if (kojo.魔族化 === 2) {
      await era.printAndWait(`${target_name}匍匐在地上、不停玩弄着股间。`);
      await era.printAndWait(
        `背上的翅膀看起来很舒服地伸展着、口水都滴到了地上。`,
      );
      await era.printAndWait(`「主人…快…快…快来侵犯我啊………${heart(1)}」`);
      await era.printAndWait(
        `察觉到${master_name}到来的${target_name}一脸心神荡漾荡地投去了视线。`,
      );
      await era.printAndWait(
        `「啊…主人…我…被主人抱太多次了…整个人都变得奇怪了…${heart(1)}」`,
      );
      await era.printAndWait(
        `经过反复调教而变得十分淫乱的${target_name}一边抱住${master_name}一边用自己的股间磨蹭${master_name}的大腿。`,
      );
      await era.printAndWait(
        `「这是因为变成魔族的原因么？啊啊…总之我忍不住了啊…呐…就这样做下去吧…${heart(1)}」`,
      );
      if (era.get(`talent:${target}:0`) === 1) {
        await era.printAndWait(
          `「我还是处女哦${heart(1)}…想要主人快点来侵犯我已经想的受不了了啦…${heart(1)}」`,
        );
      }
      // CFLAG:201  = 6（变量语义：CFLAG 族，201）
      kojo.初调教 = 6;
      return 1;
    } else {
      await era.printAndWait(
        `「欸嘿嘿…我也成为和主人一样的魔族了呢…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}步伐轻快地跑过去抱住了${master_name}。`,
      );
      await era.printAndWait(
        `「主人…能感受到魔王大人的魔力非常的厉害…如果小穴就这样被干的话…我一定会变得奇怪的${heart(1)}」`,
      );
      await era.printAndWait(
        `${master_name}眼里露出期待的目光、这样放任下去的话一定会推倒${master_name}的吧。`,
      );
      await era.printAndWait(
        `更是一副绝对不会放手的样子把尾巴缠到了${master_name}的大腿上………`,
      );
      if (era.get(`talent:${target}:0`) === 1) {
        await era.printAndWait(
          `「啊哈…新生的我的处女小穴…快点来贯穿吧…来侵犯我吧${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「拜…托了…想要主人的肉棒…忍不住了…忍不住了啦${heart(1)}」`,
        );
      }
      // CFLAG:201  = 6（变量语义：CFLAG 族，201）
      kojo.初调教 = 6;
      return 1;
    }
  } else if (
    kojo.初调教 < 7 &&
    era.get(`talent:${target}:85`) === 1 &&
    era.get(`talent:${target}:314`) !== 9 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    era.drawLine();

    await era.printAndWait(`「主人…我、我…已经…不会再违抗你了………」`);
    await era.printAndWait(`少女跪在地上、双手合十地恳求着。`);
    await era.printAndWait(
      `「无论什么…做饭也好、打扫也好…我都会做的…所、所以………」`,
    );
    await era.printAndWait(
      `「请让我一直呆在这里…不要把我从魔王大人身边赶走！」`,
    );
    await era.printAndWait(
      `${master_name}把哭得不成样子的${target_name}抱到怀里、让她在自己的胸膛上抽泣着………`,
    );
    await era.printAndWait(`「即使回到村子…也已经…没有我的容身之处了………」`);
    // CFLAG:201  = 7（变量语义：CFLAG 族，201）
    kojo.初调教 = 7;
    return 1;
  } else if (
    era.get(`talent:${target}:314`) === 9 &&
    kojo.初调教 < 8 &&
    era.get(`talent:${target}:85`) === 1 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    era.drawLine();

    if (kojo.魔族化 === 1) {
      await era.printAndWait(
        `今天的${target_name}顺从地等候着${master_name}。`,
      );
      await era.printAndWait(`「不想离开…主人…」`);
      await era.printAndWait(
        `出神地看着这边的${target_name}向${master_name}撒着娇。`,
      );
      await era.printAndWait(
        `「传达过来的主人的魔力让我感到十分放心呢…${heart(3)}」`,
      );
      await era.printAndWait(
        `${target_name}抱住${master_name}、把尾巴缠上了他的大腿。`,
      );
      await era.printAndWait(
        `「啊啊、最喜欢主人了…${heart(1)} 真的最喜欢了………${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}一边在${master_name}的耳边细语着情话一边开心地笑了。`,
      );
      await era.printAndWait(
        `「感谢您让我成为魔族…我真的很高兴哟…${heart(1)}」`,
      );
      // CFLAG:201  = 8（变量语义：CFLAG 族，201）
      kojo.初调教 = 8;
      return 1;
    } else if (kojo.魔族化 === 2) {
      await era.printAndWait(
        `${master_name}进到了可爱的奴隶${target_name}的房间。`,
      );
      await era.printAndWait(`「啊！…真、真是的…别突然进来啊笨蛋！」`);
      await era.printAndWait(`「讨厌～…主人一点都不体贴、记得要敲门啊！」`);
      await era.printAndWait(
        `马上打扮完的${target_name}一边整理着头发一边走向${master_name}。`,
      );

      if (game.event.爱或淫乱人数 >= 5) {
        await era.printAndWait(
          `「老是陪着勇者大人们…我真的受够了！你根本什么都不明白！」`,
        );
        await era.printAndWait(`${target_name}撅着嘴盯着${master_name}。`);
        await era.printAndWait(
          `「………但、但是…主人最爱的果然还是我呢…${heart(1)}」`,
        );
        await era.printAndWait(
          `可是突然眉开眼笑地在${master_name}的胸口划着圈圈。`,
        );
        await era.printAndWait(
          `「我是多么想生下…魔王大人的孩子啊…所以、呐？」`,
        );
        await era.printAndWait(
          `${target_name}耳朵通红地向${master_name}乞求………`,
        );
        if (era.get(`talent:${target}:0`) === 1) {
          await era.printAndWait(`「啊…真是的！太让女孩子丢人了！」`);
        }
      } else if (game.event.爱或淫乱人数 >= 2) {
        await era.printAndWait(`「那样真的会被原勇者大人讨厌的吧？」`);
        await era.printAndWait(
          `${target_name}背着手转过身来、投来了炽热的目光。`,
        );
        await era.printAndWait(
          `（嘛、我这样做也不坏呢…竞争对手自然是越少越好………）忽然避开视线小声嘟哝着。`,
        );
        await era.printAndWait(
          `「那个、你看啊…被别人讨厌的魔王大人…我、我会好好安慰你的${heart(1)}」`,
        );
        await era.printAndWait(
          `「因为只有作为魔族的我才是主人你的同伴哦${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}害羞地抱住了${master_name}………`);
      } else {
        await era.printAndWait(`「那样做真的会被抓到的勇者大人讨厌的吧？」`);
        await era.printAndWait(
          `${target_name}背着手转过身来、投来了炽热的目光。`,
        );
        await era.printAndWait(
          `（嘛、我这样做也不坏呢………）忽然避开视线小声嘟哝着。`,
        );
        await era.printAndWait(
          `「那个、你看啊…被别人讨厌的魔王大人…我、我会好好安慰你的${heart(1)}」`,
        );
        await era.printAndWait(
          `「因为只有作为魔族的我才是主人你的同伴哦${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}害羞地抱住了${master_name}………`);
      }
      // CFLAG:201  = 8（变量语义：CFLAG 族，201）
      kojo.初调教 = 8;
      return 1;
    } else {
      await era.printAndWait(`「啊…主人啊…看吧、这绝妙的青色肌肤………」`);
      await era.printAndWait(
        `${target_name}一边双手抚摸着自己的青色肌肤一边神魂颠倒地发着呆。`,
      );
      await era.printAndWait(
        `「只是想着过会要被主人做什么就已经要变得奇怪了………${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}浑身发抖、瘫倒在地摩擦着双腿。`);
      await era.printAndWait(
        `「感受到了魔王大人那无与伦比的魔力…看啊…呐…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}怯生生地张开双手诱惑着${master_name}。`,
      );
      await era.printAndWait(`「拜托了啦…好好抱抱新生的我把！」`);
      // CFLAG:201  = 8（变量语义：CFLAG 族，201）
      kojo.初调教 = 8;
      return 1;
    }
  } else if (era.get(`talent:${target}:9`) === 1 && kojo.初调教 < 9) {
    era.drawLine();
    await era.printAndWait(`「啊啊…我、我已经…受够了…不要…不要…不要啊………」`);
    await era.printAndWait(
      `${target_name}靠着墙坐着、嘴里不知道在嘟哝着什么。仔细一看她周围都是失禁的秽物。`,
    );
    await era.printAndWait(`精神已经崩坏的${target_name}应该恢复不了吧………`);
    // CFLAG:201  = 9（变量语义：CFLAG 族，201）
    kojo.初调教 = 9;
    return 1;
  } else if (era_flag.assi < 0) {
    await k5_kojo2(rand);
    await k5_fuku(rand);
  } else {
    await k5_kojo2(rand);
    await k5_fuku(rand);
  }
}

// @K5_KOJO2
async function k5_kojo2(rand) {
  const { rand_n, target, target_name, master_name, view } = bind_ctx(rand);

  if (era.get(`talent:${target}:9`) === 1 && game.kojo.口上开关 === 2) {
    era.drawLine();
    await era.printAndWait(
      `「呼…呼…别碰我…真是的…请不要再对我动手动脚的了…啊…啊啊……」`,
    );
    await era.printAndWait(
      `不能期待精神已经崩坏了的${target_name}做出正面的回应吧………`,
    );
    return 1;
  } else if (era.get(`mark:${target}:3`) === 3 && game.kojo.口上开关 === 2) {
    era.drawLine();
    await era.printAndWait(`「呜！呜！」`);
    await era.printAndWait(`${target_name}发出警惕的嘶吼。简直和野兽一样。`);
    return 1;
  } else if (
    era.get(`mark:${target}:2`) === 0 &&
    game.kojo.口上开关 === 2 &&
    era.get(`talent:${target}:85`) === 0 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    era.drawLine();
    await era.printAndWait(`「别、别过来啊、咬你哦！」`);
    await era.printAndWait(`${target_name}知道没用但还是虚张声势着………`);
    return 1;
  } else if (
    era.get(`mark:${target}:2`) === 1 &&
    game.kojo.口上开关 === 2 &&
    era.get(`talent:${target}:85`) === 0 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    era.drawLine();
    await era.printAndWait(`「像你这种人总有一天会被勇者大人打倒的！」`);
    await era.printAndWait(`${target_name}事到如今依然对将来怀有希望………`);
    return 1;
  } else if (
    era.get(`mark:${target}:2`) === 2 &&
    game.kojo.口上开关 === 2 &&
    era.get(`talent:${target}:85`) === 0 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    era.drawLine();
    await era.printAndWait(`「这样做也没关系哦…完全不要紧的………」`);
    await era.printAndWait(`${target_name}的身体微微颤抖、小声嘟哝着………`);
    return 1;
  } else if (
    era.get(`mark:${target}:2`) === 3 &&
    era.get(`talent:${target}:85`) === 0 &&
    game.kojo.口上开关 === 2 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    era.drawLine();
    await era.printAndWait(
      `「啊啊…会听…魔王大人的命令的………已经不那么痛了………」`,
    );
    await era.printAndWait(`${target_name}顺从地准备开始………`);
    return 1;
  } else if (era.get(`talent:${target}:76`) === 1 && game.kojo.口上开关 === 2) {
    era.drawLine();

    if (game.system.着衣系统 !== 0) {
      if (view.train.着衣状态 & 28 && view.train.上衣类型 === 1) {
        await era.printAndWait(
          `虽然${target_name}穿着的只是很普通的便宜衣服、她却十分爱惜。`,
        );
        await era.printAndWait(
          `「一直以来穿的都是姐姐穿过的旧衣服、把这样的衣服给我穿实在是太浪费了♪」`,
        );
        await era.printAndWait(
          `「那个、所以…今天也会做的吧？ 可以哦、即使把衣服弄脏也…衣服染上主人的气味什么的最棒了${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边说着那样的话一边撩起裙子露出了可爱的内衣………`,
        );
        return 1;
      } else if (view.train.着衣状态 & 28 && view.train.上衣类型 === 101) {
        await era.printAndWait(
          `虽然${target_name}穿着的只是很普通的便宜衣服、她却十分爱惜。`,
        );
        await era.printAndWait(
          `「呐、怎么样？合适吗？…但是、我穿着这样的裤子完全就像是个男孩子嘛…而且做起来不是会很麻烦吗」`,
        );
        await era.printAndWait(
          `可是${target_name}一边笑着一边弯下腰撅起了屁股。`,
        );
        await era.printAndWait(
          `「看啊看啊～碰到屁股了哦～♪ 嗯…就那样把内裤脱掉…侵犯我把…${heart(1)}」`,
        );
        return 1;
      } else if (view.train.着衣状态 & 28 && view.train.上衣类型 === 209) {
        await era.printAndWait(
          `${target_name}提起女仆装的裙摆、按照${master_name}吩咐的样子行礼。`,
        );
        await era.printAndWait(
          `「非常感谢您选择了我。在这段时间里我会诚心诚意地为您服务的………」`,
        );
        await era.printAndWait(
          `「………啊哈…当然是H意义上的${heart(1)} 吮吸主人的肉棒吗？可以哟！」`,
        );
        await era.printAndWait(
          `啊啊、淫乱至极的${target_name}马上结束了行礼、不留痕迹地抱住了${master_name}的下半身吮吸起来………`,
        );
        return 1;
      } else if (view.train.着衣状态 & 28 && view.train.上衣类型 === 203) {
        await era.printAndWait(`「啊哈…主人…现在的我是不是色色的？很淫荡？」`);
        await era.printAndWait(
          `${target_name}穿着的妓女服是量身定制的、与她的肤色非常相配的粉色木纹礼服胸口深V露出的深壑让${master_name}觉得十分赏心悦目。`,
        );
        await era.printAndWait(
          `「因为我是被主人买下的专用少女娼妓…什么都可以做哟…啊、但是应该和平时一样吧、尼嘿嘿♪」`,
        );
        await era.printAndWait(`${target_name}害羞地行了一礼并拉起了裙子。`);
        await era.printAndWait(
          `「啊啊…想要展现自己、特别是H这方面的…主人…我们来做爱吧${heart(1)}」`,
        );
        return 1;
      }
    }

    if (era.get(`talent:${target}:314`) === 9) {
      if (rand_n(3) === 0) {
        await era.printAndWait(`「今天想要舔主人身体的各个地方呢${heart(1)}」`);
        await era.printAndWait(`${target_name}舔了舔紫色的嘴唇。`);
        await era.printAndWait(
          `「肉棒也好肛门也好…无论是哪里我都会舔的哟…${heart(1)}」`,
        );
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `「啊啊嗯、魔王大人…今天也请赐予我满满的魔力吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}颤动着背上的翅膀像撒欢的小狗一样和${master_name}嬉戏着、灼热的娇喘让人觉得很淫乱………`,
        );
        await era.printAndWait(`「身体里无论哪里都会接受的${heart(1)}」`);
      } else {
        await era.printAndWait(
          `「主人${heart(1)} 今天也请让我侍奉肉棒…我会好好努力的${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}跪在${master_name}胯间吮吸着………`);
        if (era.get(`abl:${target}:32`) >= 3) {
          await era.printAndWait(`「主人的精液…全部都是我的东西${heart(1)}」`);
        }
        if (era.get(`abl:${target}:32`) >= 3) {
          await era.printAndWait(
            `「浓浓的、热热的、美味的…全部都会喝下去的${heart(1)}」`,
          );
        }
      }
    } else {
      if (rand_n(3) === 0) {
        await era.printAndWait(
          `「主人${heart(1)}…我会好好地侍奉你的${heart(1)}、会让你变得很舒服的${heart(1)}」`,
        );
        await era.printAndWait(`「今天想要舔主人身体的各个地方呢${heart(1)}」`);
        await era.printAndWait(`${target_name}舔了舔可爱的嘴唇………`);
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `「对于我自己的身体我可是很有自信的…一定会让主人变得很舒服的${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}像撒欢的小狗一样和${master_name}嬉戏着、灼热的娇喘让人觉得很淫乱………`,
        );
      } else {
        await era.printAndWait(
          `「主人${heart(1)} 今天也请让我侍奉肉棒…我会好好努力的${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}跪在${master_name}胯间吮吸着………`);
        if (era.get(`abl:${target}:32`) >= 3) {
          await era.printAndWait(`「主人的精液…全部都是我的东西${heart(1)}」`);
        }
        if (era.get(`abl:${target}:32`) >= 3) {
          await era.printAndWait(
            `「浓浓的、热热的、美味的…全部都会喝下去的${heart(1)}」`,
          );
        }
      }
    }
    return 1;
  } else if (era.get(`talent:${target}:85`) === 1 && game.kojo.口上开关 === 2) {
    era.drawLine();

    if (
      view.chara.特别服装类型 === 91 &&
      view.train.着衣状态 & 64 &&
      view.chara.结婚对象 === 901 &&
      game.system.着衣系统 !== 0
    ) {
      await era.printAndWait(`${target_name}出神地看着手上的戒指。`);
      await era.printAndWait(
        `可是注意到${master_name}看着这边是马上红着脸端正了坐姿。`,
      );
      await era.print('');
    }

    if (game.system.着衣系统 !== 0) {
      if (view.train.着衣状态 & 28 && view.train.上衣类型 === 1) {
        await era.printAndWait(
          `「还在村子里时、一直只能穿姐姐穿过的旧衣服…能穿上这么好的衣服什么的…非常感谢主人！」`,
        );
        await era.printAndWait(
          `只是如此普通的衣服就让少女如此高兴反而让你有些害羞。但是、看到那样的${target_name}你也觉得很高兴。`,
        );
        await era.printAndWait(
          `于是${target_name}发自内心的笑着突然转过身来。飘扬的裙摆让你觉得美丽到炫目………`,
        );
        return 1;
      } else if (view.train.着衣状态 & 28 && view.train.上衣类型 === 101) {
        await era.printAndWait(
          `「还在村子里时、一直只能穿姐姐穿过的旧衣服…能穿上这么好的衣服什么的…非常感谢主人！」`,
        );
        await era.printAndWait(
          `只是如此普通的衣服就让少女如此高兴反而让你有些害羞。`,
        );
        await era.printAndWait(`「欸嘿嘿、穿裤子的样子也很可爱吧？」`);
        return 1;
      } else if (view.train.着衣状态 & 28 && view.train.上衣类型 === 209) {
        await era.printAndWait(
          `${target_name}提起女仆装的裙摆、按照${master_name}吩咐的样子行礼。`,
        );
        await era.printAndWait(
          `「非常感谢您选择了我。在这段时间里我会诚心诚意地为您服务的………」`,
        );
        await era.printAndWait(
          `「………啊~真是的！这个好像不怎么适合我啊！好害羞啊~！」`,
        );
        await era.printAndWait(
          `接下来要做更加羞羞的事情吧…${master_name}不由地苦笑起来。`,
        );
        return 1;
      } else if (view.train.着衣状态 & 28 && view.train.上衣类型 === 203) {
        await era.printAndWait(`「那、那个…这么艳丽的衣服是不适合我…的呀！」`);
        await era.printAndWait(
          `${master_name}把手伸进了${target_name}的妓女服胸口露出的深壑里、温柔地抚摸着胸部。`,
        );
        await era.printAndWait(
          `${target_name}发出甜腻的呻吟、向${master_name}的怀里挤了挤。`,
        );
        await era.printAndWait(
          `「啊…哈…♪…真是的…主人…更加…H…也是可以的哟…${heart(1)}」`,
        );
        return 1;
      }
    }

    if (era.get(`talent:${target}:314`) === 9) {
      if (rand_n(3) === 0) {
        await era.printAndWait(`「啊…今天也请好好疼爱我${heart(1)}」`);
        await era.printAndWait(`「想要直接感受主人的魔力哟………」`);
        await era.printAndWait(
          `${target_name}颤动着背上的翅膀、看起来让人十分焦急………`,
        );
      } else if (rand_n(2) === 0) {
        await era.printAndWait(`「呐呐…我比勇者姐姐们都要更“好”吗…？」`);
        await era.printAndWait(
          `「………欸嘿嘿…果然是因为都是魔族所以相性很好吧…好高兴${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}在${master_name}的胸口撒娇似地蹭了蹭鼻子。`,
        );
        await era.printAndWait(`「呐…来做吧…想要满满的魔力哟${heart(1)}」`);
      } else {
        await era.printAndWait(`「最喜欢…魔王大人了${heart(1)}」`);
        await era.printAndWait(
          `「只是凝视着你就让我不能自已了呢…${heart(1)}」`,
        );
        await era.printAndWait(
          `正如${target_name}所说的、她黄色的眼眸渐渐湿润了、差不多该好好疼爱她一番了吧………`,
        );
      }
    } else {
      if (rand_n(3) === 0) {
        await era.printAndWait(
          `「欸嘿嘿、欢迎主人你大驾光临${heart(1)} 我一直在等你哟~」`,
        );
        await era.printAndWait(
          `「要好好疼爱我哦${heart(1)} 明明只是被主人触摸而已…为什么会感到这么高兴呢${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}无忧无虑地笑着准备开始………`);
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `「那个…那个…或许…我比勇者姐姐们都要更“好”吗…？」`,
        );
        await era.printAndWait(
          `「是那样的话…我真的非常高兴呢…呜呼呼${heart(1)}」`,
        );
        await era.printAndWait(
          `${master_name}温柔地抚摸着${target_name}的头………`,
        );
        await era.printAndWait(`「啊…今天也请让我好好地侍奉你${heart(1)}」`);
      } else {
        await era.printAndWait(`「最喜欢…魔王大人了${heart(1)}」`);
        await era.printAndWait(
          `「只是凝视着你就让我不能自已了呢…${heart(1)}」`,
        );
        await era.printAndWait(
          `正如${target_name}所说的、她的眼眸渐渐湿润了、差不多该好好疼爱她一番了吧………`,
        );
      }
    }
    return 1;
  }
}

// @K5_FUKU
async function k5_fuku(rand) {
  const { rand_n, target, target_name, view } = bind_ctx(rand);

  if (era.get(`talent:${target}:9`) === 1 && game.kojo.口上开关 === 2) {
    return 1;
  }

  if (game.system.着衣系统 === 0) {
    return 1;
  }

  if (view.chara.特别服装类型 <= 50 && view.chara.特别服装类型 !== 0) {
    return 1;
  }

  if ((view.train.着衣状态 & 28) === 0 && view.train.上衣类型 === 0) {
    if (
      era.get(`mark:${target}:3`) === 3 &&
      era.get(`talent:${target}:85`) === 0 &&
      era.get(`talent:${target}:76`) === 0
    ) {
      era.drawLine();
      await era.printAndWait(
        `浑身赤裸的${target_name}搓着自己冰冷的身体、发现你看到了自己狼狈的样子的${target_name}轻蔑地瞪了你一眼、背过身去………`,
      );
    } else if (
      era.get(`mark:${target}:2`) === 0 &&
      era.get(`talent:${target}:85`) === 0 &&
      era.get(`talent:${target}:76`) === 0
    ) {
      era.drawLine();
      await era.printAndWait(
        `「那个、这里这么冷能给我一件像样点的衣服吗？…啊…不要露出那种表情啊！稍、稍微差点的衣服也可以啦！」`,
      );
    } else if (
      era.get(`mark:${target}:2`) === 1 &&
      era.get(`talent:${target}:85`) === 0 &&
      era.get(`talent:${target}:76`) === 0
    ) {
      era.drawLine();
      await era.printAndWait(
        `「啊啊真是的！…我很怕冷的啊、给我一件衣服穿吧！」`,
      );
    } else if (
      era.get(`mark:${target}:2`) === 2 &&
      era.get(`talent:${target}:85`) === 0 &&
      era.get(`talent:${target}:76`) === 0
    ) {
      era.drawLine();
      await era.printAndWait(`「但是…好冷啊…拜托了…给我一件衣服穿吧！」`);
    } else if (
      era.get(`mark:${target}:2`) === 3 &&
      era.get(`talent:${target}:85`) === 0 &&
      era.get(`talent:${target}:76`) === 0
    ) {
      era.drawLine();
      await era.printAndWait(`「那个…请让我吧衣服穿上吧…拜托您了………」`);
    } else if (
      era.get(`mark:${target}:2`) === 3 &&
      era.get(`talent:${target}:85`) === 1 &&
      era.get(`talent:${target}:76`) === 0
    ) {
      era.drawLine();
      await era.printAndWait(
        `「那、那个…在主人面前赤身裸体的呼很不好意思啦…想要穿新衣服…不行？不行吗…？」`,
      );

      if (rand_n(3) === 0) {
        await era.printAndWait(
          `「那个啊、我想试一下“女仆装”啦、当然普通的衣服也可以啦」`,
        );
        if (rand_n(5) === 0 && view.chara.特别服装类型 !== 91) {
          await era.printAndWait(`「………接、接下来…那个…戒、戒指什么的…呀♪」`);
        }
      }
    } else if (
      era.get(`mark:${target}:2`) === 3 &&
      era.get(`talent:${target}:85`) === 0 &&
      era.get(`talent:${target}:76`) === 1
    ) {
      era.drawLine();
      await era.printAndWait(`「裸体也不是不可以…可是更想要漂亮的衣服…」`);
      await era.printAndWait(`「呐…帮我买嘛♪」`);

      if (rand_n(3) === 0) {
        await era.printAndWait(
          `「那个啊、“妓女服”和“女仆装”我都想试一下啦、如果是干净的普通衣服的话也是可以的哟~」`,
        );
      }
    }
  }
  return 1;

  return 0;
}

// @EVENTEND
async function eventend_k5(rand) {
  const { target, target_name } = bind_ctx(rand);

  if (game.kojo.口上开关 <= 0) {
    return 0;
  }
  if (era.get(`talent:${target}:165`) !== 1) {
    return 0;
  }

  if (era.get(`base:${target}:0`) <= 0) {
    return 0;
  }

  if (era.get(`talent:${target}:9`) === 1 && game.kojo.口上开关 === 2) {
    era.drawLine();
    await era.printAndWait(`「不要…不要…我不要怀上怪物的孩子…不要啊………」`);
    await era.printAndWait(
      `${target_name}的眼泪和口水流得到处都是、就这样瘫倒在地上………`,
    );
    return 1;
  } else if (
    era.get(`mark:${target}:3`) === 3 &&
    era.get(`talent:${target}:85`) === 0 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    era.drawLine();
    await era.printAndWait(`${target_name}在床上啜泣着。`);
    await era.printAndWait(`「姐姐…救救我…救救我啊………」`);
    return 1;
  } else if (
    era.get(`mark:${target}:2`) <= 1 &&
    era.get(`talent:${target}:85`) === 0 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    era.drawLine();
    await era.printAndWait(`${target_name}精疲力尽地瘫倒在地上。`);
    await era.printAndWait(`「这种事…根本不算什么………」`);
    return 1;
  } else if (
    era.get(`mark:${target}:2`) === 2 &&
    era.get(`talent:${target}:85`) === 0 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    era.drawLine();
    await era.printAndWait(`「救救我吧…勇者大人………」`);
    await era.printAndWait(`${target_name}瘫倒在床上、卑微地祈求着帮助………`);
    return 1;
  } else if (
    era.get(`mark:${target}:2`) === 3 &&
    era.get(`talent:${target}:85`) === 0 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    era.drawLine();
    await era.printAndWait(`「不能…做…这样的事哦………真是的…受不了你………」`);
    await era.printAndWait(`${target_name}精神恍惚、沉浸在调教的余韵里………`);
    return 1;
  } else if (
    era.get(`talent:${target}:76`) === 1 &&
    era.get(`base:${target}:0`) >= 500
  ) {
    era.drawLine();

    if (era.get(`talent:${target}:314`) === 9) {
      await era.printAndWait(`「啊嗯…还不够哟…还想要更多啊」`);
      await era.printAndWait(`${target_name}感到些许的不满足………`);
    } else {
      await era.printAndWait(
        `「欸嘿嘿…对一个孩子做出这样的事…主人果然很鬼畜呢………${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}在床上哧哧地笑着………`);
    }
    return 1;
  } else if (
    era.get(`talent:${target}:76`) === 1 &&
    era.get(`base:${target}:0`) <= 500
  ) {
    era.drawLine();

    if (era.get(`talent:${target}:314`) === 9) {
      await era.printAndWait(`「啊…还要…还想要…请把我干死吧…${heart(1)}」`);
      await era.printAndWait(`${target_name}难受地提高了声音………`);
    } else {
      await era.printAndWait(`「啊…请…请接着做下去…${heart(1)}」`);
      await era.printAndWait(
        `${target_name}难受地提高了声音、明明应该已经非常累了、不过好像并不是很累的样子………`,
      );
    }
    return 1;
  } else if (
    era.get(`talent:${target}:85`) === 1 &&
    era.get(`base:${target}:0`) >= 500
  ) {
    era.drawLine();

    if (era.get(`talent:${target}:314`) === 9) {
      await era.printAndWait(`「魔王大人还满意吗…？」`);
      await era.printAndWait(
        `${target_name}在床上手忙脚乱的。体力还很富余的样子………`,
      );
    } else {
      await era.printAndWait(`「魔王大人还满意吗…？」`);
      await era.printAndWait(`${target_name}体力还很富余的样子………`);
    }
    return 1;
  } else if (
    era.get(`talent:${target}:85`) === 1 &&
    era.get(`base:${target}:0`) <= 500
  ) {
    era.drawLine();

    if (era.get(`talent:${target}:314`) === 9) {
      await era.printAndWait(`「很高兴能好好地侍奉魔王大人哟…${heart(1)}」`);
      await era.printAndWait(`${target_name}露出了满足的笑容………`);
    } else {
      await era.printAndWait(
        `「对我这样的孩子做出这样的事…主人还真是个变态呢${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}露出了满足的笑容………`);
    }
    return 1;
  }
  return 0;
}

// @KOJO_MESSAGE_COM_5
async function kojo_message_com_5(rand) {
  const { rand_n, target, target_name, player_name, master_name, view, kojo } =
    bind_ctx(rand);
  const player = era_flag.player;
  let P = 0;

  // 助手が調教した時に口上をスキップする
  if (era_flag.assi > 0 && era_flag.assiplay) {
    return 0;
  }
  // ボールギャグ着用時（SELECTCOM == 45 自己说话不算）
  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 45) {
    return 0;
  }
  // 失神時（TFLAG:899）——跨域读属主 train 的一维门面
  if (game.train.失神) {
    return 0;
  }
  // 獣姦プレイ中（K5 是静默跳过，无 DOG_KOJO 调用）
  if (era.get(`tequip:${target}:89`)) {
    return 0;
  }
  // 触手調教中（TEQUIP:90）
  if (era.get(`tequip:${target}:90`)) {
    return 0;
  }
  // コロシアム中は専用口上
  if (era.get(`tequip:${target}:55`)) {
    await colosseum_kojo_5(rand_n);
    return 0;
  }
  // 崩坏した場合（TALENT:9）
  if (era.get(`talent:${target}:9`) === 1) {
    return 0;
  }

  if (era_flag.selectcom === 0) {
    const mark = (i) => era.get(`mark:${target}:${i}`) || 0;

    // 初めて（CFLAG:301 == 0）
    if (kojo.爱抚 === 0) {
      // 屈服刻印Lv2以上
      if (mark(2) >= 2) {
        await era.printAndWait('「咕…呜呜…啊！」');
      } else {
        await era.printAndWait('「你这个变态…别、别碰我！」');
        await era.printAndWait(
          '（现在如果发出奇怪的声音的话…只会让这家伙感到高兴、一定要忍耐…！）',
        );
      }
      kojo.爱抚 = 1;
      return 0;
    }

    // 二回目以降
    // 淫乱（TALENT:76）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「嗯…啊…主人的手指好厉害…${heart(1)}」`);
      await era.printAndWait(
        `${target_name}弯曲着身体、把${player_name}的手夹在自己的大腿间。`,
      );
      await era.printAndWait(`「请让我的H小穴…变得更加淫乱吧${heart(1)}」`);
      kojo.爱抚 = 6;
    } else if (
      // 愛慕（TALENT:85）
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊…啊哈…啊${heart(1)}不要嗯${heart(1)}」`);
      await era.printAndWait(`故意发出尖叫的${target_name}显得十分的可爱。`);
      await era.printAndWait(
        `「主人、再多摸摸我嘛${heart(1)} 舒服的我都要叫出来了啦${heart(1)}」`,
      );
      kojo.爱抚 = 5;
    } else if (
      // 屈服刻印Lv3
      mark(2) === 3 &&
      (kojo.爱抚 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「哈…呜…嗯咕${heart(1)}…啊…啊…嗯${heart(1)}……」`);
      await era.printAndWait(`${target_name}的嘴里不住地发出甜美的娇喘。`);
      await era.printAndWait('（明明只是被触摸而已…声音…却…忍不住了…啦）');
      kojo.爱抚 = 4;
    } else if (
      // 屈服刻印Lv2
      mark(2) === 2 &&
      (kojo.爱抚 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「啊…啊咕…呜呜…嗯咕…！」');
      await era.printAndWait(
        `${target_name}感受到了从未体验过的愉悦在沸腾着、忍不住皱起了脸………`,
      );
      kojo.爱抚 = 3;
    } else if (
      // それ以外（MARK:2 <= 1）
      mark(2) <= 1 &&
      (kojo.爱抚 <= 1 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「不要、那、那里…不要…碰那里…啊！」');
      await era.printAndWait(`${target_name}不停地扭动着身体进行反抗………`);
      kojo.爱抚 = 2;
    }
    return 0;
  }

  if (era_flag.selectcom === 1) {
    if (kojo.舔阴 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        await era.printAndWait(`「不、不要…啊…难道…要舔那里…啊呜！」`);
        await era.printAndWait(
          `不理会${target_name}慌乱的反抗、${player_name}强硬地把她的双腿掰开。`,
        );
        await era.printAndWait(`「那、那里…祇有那里是不可以的…啊！」`);
      } else {
        await era.printAndWait(`「不、不要…啊…难道…要舔那里…啊呜！」`);
        await era.printAndWait(
          `不理会${target_name}慌乱的反抗、${player_name}强硬地把她的双腿掰开………`,
        );
      }
      // CFLAG:302  = 1（变量语义：CFLAG 族，302）
      kojo.舔阴 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.舔阴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呀啊…主人真是H…${heart(1)}」`);
        await era.printAndWait(
          `${target_name}抱住大开的双腿、用手指掰开小穴。`,
        );
        await era.printAndWait(
          `「不要再考虑了快来舔嘛、小穴已经…湿成这样了${heart(1)}」`,
        );
        await era.printAndWait(
          `会露出那种淫荡表情的人已经不再是原来的那个村娘了、而是和这个地城相当相称的居民………`,
        );
        // CFLAG:302  = 5（变量语义：CFLAG 族，302）
        kojo.舔阴 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.舔阴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「好、好的…请舔…我的那里吧………${heart(1)}」`);
        await era.printAndWait(
          `${target_name}高兴地打开双腿、迎接${player_name}。`,
        );
        await era.printAndWait(
          `「啊…舔的…好舒服啊${heart(1)}…主人啊${heart(1)}」`,
        );
        await era.printAndWait(
          `激动的${target_name}用柔弱的大腿、夹紧了${player_name}的头………`,
        );
        // CFLAG:302  = 4（变量语义：CFLAG 族，302）
        kojo.舔阴 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.舔阴 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「我不会…反抗的…所以请温柔一点………」`);
        await era.printAndWait(
          `炽热的舌头仔细地舔着${target_name}露出的阴唇。`,
        );
        await era.printAndWait(`「啊…呼…呜…啊…呜咕」`);
        // CFLAG:302  = 3（变量语义：CFLAG 族，302）
        kojo.舔阴 = 3;
      } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊呜！好、好恶心………」`);
        await era.printAndWait(`被舔着阴唇的${target_name}显露出厌恶的情绪。`);
        await era.printAndWait(`「就算是像被狗舔那样也…啊嗯！」`);
        // CFLAG:302  = 2（变量语义：CFLAG 族，302）
        kojo.舔阴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 2) {
    if (kojo.肛门爱抚 === 0) {
      if (era.get(`abl:${target}:3`) >= 3) {
        await era.printAndWait(`「呜…嗯…呜啊…手、手指进来了…啊呜！」`);
        await era.printAndWait(`${target_name}的肛门抽动着……`);
      } else {
        await era.printAndWait(`「难、难道是那里…呀啊！？」`);
        await era.printAndWait(
          `${target_name}不停地扭动着腰、想要避开${player_name}的手指………`,
        );
      }
      // CFLAG:TARGET:303  = 1（变量语义：CFLAG 族，TARGET:303）
      kojo.肛门爱抚 = 1;
      return 0;
    } else {
      P =
        (era.get(`palam:${target}:3`) || 0) +
        (era.get(`delta:${target}:3`) || 0);

      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:77`) === 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哼呀…连、连里面都…进来了…塞得满满的…嘻…嘻呀…啊啊啊………${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的腰完全脱力了、只是轻轻地动一下手指就能让她颤抖不止。`,
        );
        await era.printAndWait(
          `「好、的…真是的…不玩弄屁股小穴的话…已经活不下去了啦${heart(1)}」`,
        );
        await era.printAndWait(
          `「怎么样都可以…快点再…玩弄我的…屁股小穴啊………${heart(1)}」`,
        );
        // CFLAG:303  = 9（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「肛门…可以哦${heart(1)}…啊~弄得我好舒服${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}发出了仿佛舒服得要融化掉的声音。`,
        );
        await era.printAndWait(
          `「啊啊…要上瘾了…主人再多摸一会儿啊${heart(1)}」`,
        );
        // CFLAG:303  = 8（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        P < PALAMLV[2] &&
        (kojo.肛门爱抚 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「主人…请再温柔一点…啊${heart(1)}…哈嗯${heart(1)}」`,
        );
        await era.printAndWait(
          `润滑稍稍有点不足、${target_name}忍着疼痛接纳手指的进入。`,
        );
        await era.printAndWait(`「啊…哈………啊呜嗯${heart(1)}」`);
        // CFLAG:303  = 7（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 7;
      } else if (
        era.get(`talent:${target}:77`) === 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「再多抠抠我的肛门啊${heart(1)}…可以哟${heart(1)}可以的哟${heart(1)}」`,
        );
        await era.printAndWait(
          `只是被稍稍玩弄了下肛门的${target_name}腰不住地颤抖、发出了快乐的尖叫。`,
        );
        await era.printAndWait(
          `「只是屁股就快要去了啊${heart(1)} 请更多地${heart(1)}」`,
        );
        // CFLAG:303  = 6（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊呀呜…这、这样可以哟…${heart(1)}」`);
        await era.printAndWait(
          `被玩弄着肛门的${target_name}发出了仿佛舒服得要融化掉的声音。`,
        );
        await era.printAndWait(
          `「嗯呀…啊${heart(1)} 啊${heart(1)} 啊${heart(1)} 哈啊啊呀呜呜${heart(1)}」`,
        );
        // CFLAG:303  = 5（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        P < PALAMLV[2] &&
        (kojo.肛门爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呜呀…请再…温柔一点…啊…啊哈${heart(1)}」`);
        await era.printAndWait(
          `润滑稍稍有点不足、${target_name}忍着疼痛接纳手指的进入。`,
        );
        await era.printAndWait(
          `「我、我…会好好用屁股做H的事的…所以…请再温柔一点${heart(1)}」`,
        );
        // CFLAG:303  = 4（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 4;
      } else if (
        P >= PALAMLV[2] &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛门爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呜…嗯…呜啊…嗯…嗯嗯……好像…要…变得奇怪了啊…屁股要变得奇怪了………」`,
        );
        await era.printAndWait(`${target_name}的肛门抽动着……`);
        // CFLAG:303  = 3（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 3;
      } else if (kojo.肛门爱抚 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「住手啊…做那种事只会让我很痛啊！」`);
        await era.printAndWait(
          `${target_name}不停地扭动着腰、想要避开${player_name}的手指………`,
        );
        // CFLAG:303  = 2（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 3) {
    if (kojo.自慰 === 0) {
      await era.printAndWait(`「我、我知道了…我、我会…自、自慰的………」`);
      // CFLAG:TARGET:304  = 1（变量语义：CFLAG 族，TARGET:304）
      kojo.自慰 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:0`) === 1 &&
        (kojo.自慰 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「只是自慰的话不够啦、已经忍不住了${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}在那瞬间突然猛地把手指插了进去、像是要戳破处女膜一样。`,
        );
        await era.printAndWait(
          `「如果戳破处女膜…手指进到更里面的话…一定很舒服吧${heart(1)}」`,
        );
        await era.printAndWait(
          `「好想把手指插进去变得更舒服啊…啊哈嗯${heart(1)}」`,
        );
        // CFLAG:304  = 9（变量语义：CFLAG 族，304）
        kojo.自慰 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:31`) >= 3 &&
        (kojo.自慰 <= 7 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「小穴…小穴好舒服${heart(1)} 好喜欢欺负阴蒂啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}完全沉浸在用手指揉搓阴蒂的快感当中。`,
          );
          await era.printAndWait(
            `淫水翻动的声音不时响起。从幼小的躯体当中能感受到相当淫靡的感觉。`,
          );
          await era.printAndWait(
            `「想要更多地自慰${heart(1)}…我已经只需要小穴了${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「欸嘿嘿…可以哟、我会好好地在主人面前自慰的哟${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}带着一脸淫荡的表情开始了自慰、她的手熟练地摩擦着小穴、连呼吸都炽热了起来。`,
          );
          await era.printAndWait(
            `「哈…哈…啊嗯…小穴好舒服…好舒服啊………${heart(1)}」`,
          );
          await era.printAndWait(
            `「主人在旁边看着的话…连着自慰一整天也不是不可以哟${heart(1)} 」`,
          );
        } else {
          await era.printAndWait(`「我的自慰show…请好好地享受吧${heart(1)}」`);
          await era.printAndWait(
            `${target_name}扭动着腰、享受着自慰带来的快感。已经是谁都不能阻止她自慰了吧。`,
          );
          await era.printAndWait(
            `「手指停不下来…啊啊啊…主人${heart(1)}…快看、快看我自慰的地方啊${heart(1)}」`,
          );
        }
        // CFLAG:304  = 8（变量语义：CFLAG 族，304）
        kojo.自慰 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:31`) < 3 &&
        (kojo.自慰 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「不要…比起自慰什么的…更想要主人的肉棒啊${heart(1)}」`,
          );
          await era.printAndWait(
            `说着那样的话的${target_name}一边打开双腿、一边开始高兴地自慰起来。`,
          );
          await era.printAndWait(
            `「嗯${heart(1)} 嗯${heart(1)}…啊啊…把这个…想象成…主人的肉棒${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}渐渐加快了手指抽插的速度………`);
        } else {
          await era.printAndWait(
            `「只是看着我自慰…主人就很高兴了吗？………啊哈哈${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}扭动着腰、享受着自慰带来的快感。`,
          );
          await era.printAndWait(
            `「啊…啊啊嗯…肉棒${heart(1)}…好想要肉棒${heart(1)} 好想要肉棒啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}年幼的身体拼命地后仰、一边发出尖叫着一边持续着自慰………`,
          );
        }
        // CFLAG:304  = 7（变量语义：CFLAG 族，304）
        kojo.自慰 = 7;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`talent:${target}:0`) === 1 &&
        (kojo.自慰 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「只是自慰的话不够啦、已经忍不住了${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}在那瞬间突然猛地把手指插了进去、像是要戳破处女膜一样。`,
        );
        await era.printAndWait(`「快点啦、快点嘛…给我…主人的${heart(3)}」`);
        // CFLAG:304  = 6（变量语义：CFLAG 族，304）
        kojo.自慰 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:31`) >= 3 &&
        (kojo.自慰 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(`「小穴自慰的地方…请好好滴欣赏${heart(1)}」`);
          await era.printAndWait(
            `那样无忧无虑地笑着的${target_name}把手指伸向了小穴。`,
          );
          await era.printAndWait(
            `「啊哈…好喜欢自慰啊${heart(1)} 喜欢${heart(1)} 喜欢${heart(1)} 好想一直这样下去${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的手指伸进了小穴、不停地抽插着、发出了色情的声响………`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「嗯、嗯…一直都是想着主人的事…来…自慰${heart(1)}」`,
          );
          await era.printAndWait(
            `「好像永远自慰下去…连内衣都不想穿了呢${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}扭动着腰、为了激发出小穴的快感不停地动着手指………`,
          );
        } else {
          await era.printAndWait(
            `被命令自慰的${target_name}开始愉快地玩弄起自己的小穴。`,
          );
          await era.printAndWait(
            `「我是个H的孩子真是对不起…是个最喜欢自慰的小猴子真是对不起${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}一边感叹着、一边注视着${target_name}的自慰show。`,
          );
          await era.printAndWait(
            `「我、我…最喜欢被主人看着自慰了…真是个变态的小姑娘呢${heart(1)}」`,
          );
        }
        // CFLAG:304  = 5（变量语义：CFLAG 族，304）
        kojo.自慰 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:31`) < 3 &&
        (kojo.自慰 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「真是的…想看着我自慰什么的………真是拿你没办法呢${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}两腿大开、挺起腰部、把手指伸向了小穴。`,
          );
          await era.printAndWait(
            `「被主人…看见了…看见了啊…${heart(1)} 啊啊啊啊哈嗯${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「虽然很害羞可是…如果是主人你想看的话…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}舔了舔嘴唇、把手指伸向了小穴。`,
          );
          await era.printAndWait(
            `「啊…啊啊…嗯…哈呜…被看着…好有感觉…太有感觉了啊………${heart(1)}`,
          );
        }
        // CFLAG:304  = 4（变量语义：CFLAG 族，304）
        kojo.自慰 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`abl:${target}:31`) >= 1 &&
        (kojo.自慰 <= 2 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「才、才没有感觉呢…呜…咕…哈啊啊……哈…嗯」`);
          await era.printAndWait(
            `一边这么说着一边发出妖艳的呻吟、果然还不是很坦率呢………`,
          );
        } else {
          await era.printAndWait(`「不要…不要看啊…太难为情了………」`);
          await era.printAndWait(`${target_name}害羞地低下头、持续着自慰………`);
        }
        // CFLAG:304  = 3（变量语义：CFLAG 族，304）
        kojo.自慰 = 3;
      } else if (kojo.自慰 <= 1 || game.kojo.口上开关 === 2) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「嗯…呼…啊…这、这样就可以了吗？…欸、不、不行…？」`,
          );
          await era.printAndWait(`${target_name}敷衍地动着手指………`);
        } else {
          await era.printAndWait(`「嗯…哈…手指好累啊………」`);
          await era.printAndWait(
            `${target_name}慢慢地用手指勾勒着阴唇的样子………`,
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
        era.get(`talent:${target}:130`) === 1 &&
        era.get(`palam:${target}:5`) > PALAMLV[3] &&
        era.get(`tequip:${target}:16`) === 0 &&
        era.get(`tequip:${target}:15`) === 0
      ) {
        if (
          era.get(`talent:${target}:85`) === 1 ||
          era.get(`talent:${target}:76`) === 1
        ) {
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            await era.printAndWait(
              `「呐…喝吧…再多喝一点♪ 我的牛奶…${heart(1)}」`,
            );
            await era.printAndWait(
              `${player_name}抓住${target_name}那大而膨胀的乳房、咕嘟咕嘟地喝光了母乳………`,
            );
          } else {
            await era.printAndWait(
              `「呐…喝吧…再多喝一点♪ 我的牛奶…${heart(1)}」`,
            );
            await era.printAndWait(
              `${player_name}抓住${target_name}那大而膨胀的乳房、咕嘟咕嘟地喝光了母乳………`,
            );
          }
        } else {
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            await era.printAndWait(`「够、够了啊…不要啊！」`);
            await era.printAndWait(
              `${player_name}抓住悲鸣不已的${target_name}那大而膨胀的乳房、咕嘟咕嘟地喝光了母乳………`,
            );
          } else {
            await era.printAndWait(
              `「怎么这样…发出这样的声音…不要…啊…啊呜呜！」`,
            );
            await era.printAndWait(
              `${player_name}吸住悲鸣不已的${target_name}的乳头、咕嘟咕嘟地喝光了母乳………`,
            );
          }
        }
      } else {
        if (
          era.get(`talent:${target}:85`) === 1 ||
          era.get(`talent:${target}:76`) === 1
        ) {
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            await era.printAndWait(
              `「欸嘿嘿…胸部比姐姐的都要大了…啊嗯${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}出神地眯着眼睛吐着气。嘴里微微漏出了撒娇的声音………`,
            );
          } else {
            await era.printAndWait(
              `「我的胸部摸着开心吗？…呀、啊…哈呜${heart(1)}」`,
            );
            await era.printAndWait(
              `看着这可爱的反应还真是一件十分快乐的事呢、${player_name}暗地里笑着………`,
            );
          }
        } else {
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            await era.printAndWait(`「这样的事…因为…胸很大就…啊啊！」`);
            await era.printAndWait(
              `被揉着和幼小的身体毫不相称的巨乳的${target_name}发出了痛苦的呻吟………`,
            );
          } else {
            await era.printAndWait(`「摸的手法…就像个色狼大叔一样…呀啊！？」`);
            await era.printAndWait(`「像、像那个样子摸的话…啊啊！」`);
          }
        }
      }
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306）
      kojo.胸爱抚 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:130`) === 1 &&
        era.get(`palam:${target}:5`) > PALAMLV[3] &&
        era.get(`tequip:${target}:16`) === 0 &&
        era.get(`tequip:${target}:15`) === 0
      ) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
        ) {
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            await era.printAndWait(
              `「啊嗯…都是主人的原因…变得能出牛奶了呢…啊呜…请再多喝一点…${heart(1)}」`,
            );
            await era.printAndWait(
              `「啊~${heart(1)} 啊~${heart(1)} 牛奶出来了好舒服${heart(1)}…好舒服啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}脸上浮现出不似少女的淫靡表情、温柔地抱着${player_name}的头。`,
            );
            await era.printAndWait(
              `${player_name}抓住${target_name}那大而膨胀的乳房、咕嘟咕嘟地喝光了母乳………`,
            );
          } else {
            await era.printAndWait(
              `「嗯嘻…嗯${heart(1)} 像那样一直吸着乳头的话…牛奶要出来了啊${heart(1)}」`,
            );
            await era.printAndWait(
              `「如果被那样吸的话…胸部会变大的啦${heart(1)} 快、快放过我吧～${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}脸上浮现出不似少女的淫靡表情、温柔地抱着${player_name}的头。`,
            );
            await era.printAndWait(
              `${player_name}吸住${target_name}的乳头、咕嘟咕嘟地喝光了母乳………`,
            );
          }
          // CFLAG:306  = 5（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
        ) {
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            await era.printAndWait(
              `「呐…喝吧…再多喝一点♪ 我的牛奶…${heart(1)}」`,
            );
            await era.printAndWait(
              `「啊嗯…就像个大宝宝一样…好可爱…啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${player_name}抓住${target_name}那大而膨胀的乳房、咕嘟咕嘟地喝光了母乳………`,
            );
          } else {
            await era.printAndWait(
              `「啊哈…那样吸我的…喝吧…再多喝一点♪ 我的牛奶……${heart(1)}」`,
            );
            await era.printAndWait(`「更加…更加咕嘟咕嘟的吸吧…${heart(1)}」`);
            await era.printAndWait(
              `${player_name}吸住${target_name}的乳头、咕嘟咕嘟地喝光了母乳………`,
            );
          }
          // CFLAG:306  = 4（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 4;
        } else if (
          era.get(`abl:${target}:1`) >= 3 &&
          (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
        ) {
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            await era.printAndWait(`「啊 …真是的…像个小宝宝一样…啊…啊嗯♪」`);
            await era.printAndWait(
              `${target_name}的乳头高高勃起、每次吸的时候都能让${target_name}发出一阵喘息。`,
            );
            await era.printAndWait(
              `${player_name}抓住${target_name}那大而膨胀的乳房、咕嘟咕嘟地喝光了母乳………`,
            );
          } else {
            await era.printAndWait(
              `「啊啊…不行的啦…被这么吸的话…牛奶又要出来了啦♪」`,
            );
            await era.printAndWait(
              `${target_name}的乳头高高勃起、每次吸的时候都能让${target_name}发出一阵喘息。`,
            );
            await era.printAndWait(
              `${player_name}吸住${target_name}的乳头、咕嘟咕嘟地喝光了母乳………`,
            );
          }
          // CFLAG:306  = 3（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 3;
        } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            await era.printAndWait(
              `「呜咕…想吸牛奶什么的…我的胸部很大什么的…啊…啊呜！」`,
            );
            await era.printAndWait(
              `${player_name}抓住悲鸣不已的${target_name}那大而膨胀的乳房、咕嘟咕嘟地喝光了母乳………`,
            );
          } else {
            await era.printAndWait(
              `「不、不可以哟…这样的…魔王大人你不能这样做哟…啊！」`,
            );
            await era.printAndWait(
              `${player_name}吸住悲鸣不已的${target_name}的乳头、咕嘟咕嘟地喝光了母乳………`,
            );
          }
          // CFLAG:306  = 2（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 2;
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
        ) {
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            await era.printAndWait(
              `「果然很喜欢大胸呢${heart(1)}比姐姐的还要大呢…啊嗯${heart(1)}」`,
            );
            if (era.get(`talent:${target}:114`) === 1) {
              await era.printAndWait(
                `「这么大的话…走路都会很辛苦呢…${heart(1)}」`,
              );
            }
            await era.printAndWait(
              `手指陷入了${target_name}的巨乳里、少女舒服地眯起了眼睛。`,
            );
            await era.printAndWait(
              `「啊…老是…摸胸部…但是主人想做什么都可以哟${heart(1)}」`,
            );
            await era.printAndWait(`浮现出不似少女的淫靡表情、接受着爱抚。`);
            await era.printAndWait(
              `「因为…被主人摸着胸部…已经没法思考了啦………${heart(1)}」`,
            );
            if (view.train.穿环状态 & 1) {
              await era.printAndWait(
                `「真是的啊${heart(1)} 这样拉乳头环的话${heart(1)} 乳头会裂开的啦${heart(1)}」`,
              );
            }
          } else {
            await era.printAndWait(
              `「啊…嗯…我的贫乳…也很有魅力吗？…呼呼呼${heart(1)}」`,
            );
            await era.printAndWait(
              `${player_name}多次点头、来回抚摸着${target_name}的胸部。${target_name}恶作剧似地笑着。`,
            );
            await era.printAndWait(
              `「骗人…明明是大的比较好${heart(1)}…呀啊…乳、乳头不可以${heart(1)}」`,
            );
            await era.printAndWait(
              `${player_name}拧着少女的乳头慢慢地摩擦着、近乎疼痛的刺激让少女的身体反弓了起来。`,
            );
            await era.printAndWait(
              `「啊啊啊…胸部好舒服…好喜欢被摸啊${heart(1)} 再更多地摸摸啊${heart(1)}」`,
            );
            if (view.train.穿环状态 & 1) {
              await era.printAndWait(
                `「真是的啊${heart(1)} 这样拉乳头环的话${heart(1)} 乳头会裂开的啦${heart(1)}」`,
              );
            }
          }
          // CFLAG:306  = 5（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
        ) {
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            await era.printAndWait(
              `「欸嘿嘿…胸部比姐姐的都要大了呢${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}出神地眯着眼睛吐着气、嘴里微微漏出了撒娇的声音。`,
            );
            await era.printAndWait(
              `「你们男人还真是喜欢胸部呢…总觉得我好像明白原因呢${heart(1)}」`,
            );
            await era.printAndWait(
              `「啊…啊嗯${heart(1)} 再来欺负胸部啊${heart(1)}」`,
            );
            if (view.train.穿环状态 & 1) {
              await era.printAndWait(
                `「呀啊、乳头环被拉了的话胸部要变得放荡了啦${heart(1)}」`,
              );
            }
          } else {
            await era.printAndWait(
              `「我的胸部…虽然小、但是是主人专用的哟${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}仔细地爱抚着整个胸部、漏出激动的呻吟。`,
            );
            await era.printAndWait(
              `「啊啊啊…胸部…就是为了被摸而存在的呢…主人你是这样教我的吧${heart(1)}」`,
            );
            await era.printAndWait(`「再来…再来欺负胸部啊…${heart(1)}」`);
            if (view.train.穿环状态 & 1) {
              await era.printAndWait(
                `「呀啊、乳头环被拉…好喜欢…啊${heart(1)}」`,
              );
            }
          }
          // CFLAG:306  = 4（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 4;
        } else if (
          era.get(`abl:${target}:1`) >= 3 &&
          (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
        ) {
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            await era.printAndWait(`「啊…啊…嗯…哈…啊啊啊………${heart(1)}」`);
            await era.printAndWait(
              `被爱抚着的${target_name}出神地眯起眼睛、渐渐习惯起来。`,
            );
            await era.printAndWait(
              `「呜、嗯…如果温柔一点的话…就、就不要紧………嗯」`,
            );
          } else {
            await era.printAndWait(
              `「啊…我的胸部摸着开心吗…？…啊、嗯嗯呜………」`,
            );
            await era.printAndWait(
              `${target_name}感受到了快感、渐渐鼓胀起来的乳头变得更加突出了。`,
            );
            await era.printAndWait(`「呐、呐…来、来玩弄乳头嘛！」`);
          }
          // CFLAG:306  = 3（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 3;
        } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            await era.printAndWait(
              `「啊…咕…嗯啊啊…不要…不要像那个样子抓住乳房啊………」`,
            );
            await era.printAndWait(
              `被揉着和身体不相称的巨乳的${target_name}发出了尖叫。`,
            );
            await era.printAndWait(`「要、要裂开了呜呜呜………」`);
          } else {
            await era.printAndWait(
              `「我、我的胸部才没有被摸出感觉呢！…我也知道她们很小啦！」`,
            );
            await era.printAndWait(`${target_name}扭动着身体想要逃开爱抚………`);
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
        era.get(`talent:${target}:76`) === 1 &&
        era_flag.assiplay === 0 &&
        era.get(`tequip:${target}:89`) === 0 &&
        era.get(`tequip:${target}:90`) === 0
      ) {
        await era.printAndWait(`「嗯…嗯呒…嗯嗯…嗯…啊哈…${heart(1)}」`);
        await era.printAndWait(
          `${target_name}和${player_name}双唇紧贴、舌头如饥似渴地纠缠着。`,
        );
        await era.printAndWait(
          `「哈…哈…呣呒${heart(1)} 哈…哈…啊啊…kiss…好舒服…${heart(1)}」`,
        );
        await era.printAndWait(
          `少女喘着气向后稍稍拉开了距离、两人的嘴间牵起了一根唾液构成的丝。`,
        );
        await era.printAndWait(
          `「虽然和主人做过很多H的事…但是…这样的接吻还是第一次呢${heart(1)}」`,
        );
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era_flag.assiplay === 0 &&
        era.get(`tequip:${target}:89`) === 0 &&
        era.get(`tequip:${target}:90`) === 0
      ) {
        await era.printAndWait(
          `「啊，亲吻吗，嗯${heart(1)}请让我自己来好么，因为……`,
        );
        await era.printAndWait(`「这是……人家的第一次初吻呢」`);
        await era.printAndWait(`玛奥眼睛湿润了看着你`);
        await era.printAndWait(
          `「明明主人很坏心眼地对人家做了许多很过分的事情，却给人家留下了最后的一点少女的纯洁呢」`,
        );
        await era.printAndWait(
          `「人家确实是小孩子，不太懂得爱上别人什么的……但是……遇上您真是太好了」`,
        );
        await era.printAndWait(
          `「把第一次的kiss留给心爱的人，是少女的梦想……」`,
        );
        await era.printAndWait(
          `少女说着那样的话，羞怯的闭上眼睛，轻轻在你的嘴唇上啄了一下，「……现在梦想实现了哦，诶嘿嘿${heart(1)}」`,
        );
        await era.printAndWait(`在你面前的少女，带着满足的笑意。`);
        await era.printAndWait(
          `你第一次发现，她一直蕴含在内心深处的那份纯真和柔情。`,
        );
        await era.printAndWait(
          `好像被触动了内心的某种东西，你深深的吻了上去……`,
        );
      } else {
        await era.printAndWait(`「嗯咕…嗯…不、不要…！放开我………！」`);
        await era.printAndWait(
          `${target_name}用力推开${player_name}、用袖口擦着嘴唇。`,
        );
        await era.printAndWait(`「我、我的第一次…明明是第一次！」`);
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      kojo.接吻 = 1;
      return 0;
    } else if (kojo.接吻 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「嗯…嗯呒…嗯嗯…嗯…啊哈…${heart(1)}」`);
        await era.printAndWait(
          `${target_name}和${player_name}双唇紧贴、舌头如饥似渴地纠缠着。`,
        );
        await era.printAndWait(
          `「哈…哈…呣呒${heart(1)} 哈…哈…啊啊…kiss…好舒服…${heart(1)}」`,
        );
        await era.printAndWait(
          `少女喘着气向后稍稍拉开了距离、两人的嘴间牵起了一根唾液构成的丝。`,
        );
        await era.printAndWait(`「主人的kiss…好舒服………${heart(1)}」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「嗯…啾…啾${heart(1)} 再来…啾啾${heart(1)}」`);
        await era.printAndWait(
          `${target_name}虽然笨拙但很热情地和${player_name}反复接吻着。`,
        );
        await era.printAndWait(`「想要更多地接吻嘛………主人…${heart(1)}」`);
        await era.printAndWait(`少女说着那样的话、再次撒着娇开始了接吻………`);
      } else {
        await era.printAndWait(`「嗯咕…嗯…不、不要…！放开我………！」`);
        await era.printAndWait(
          `${target_name}用力推开${player_name}、用袖口擦着嘴唇。`,
        );
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      kojo.接吻 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.接吻 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「嗯…嗯呒…嗯嗯…嗯…啊哈…${heart(1)}」`);
        await era.printAndWait(`${target_name}的舌头如饥似渴地纠缠着。`);
        await era.printAndWait(
          `「嗯呒${heart(1)} 啾呜呜${heart(1)} …嗯呒${heart(1)} 哈…哈…啊啊…更多地接吻…${heart(1)}」`,
        );
        await era.printAndWait(
          `少女喘着气向后稍稍拉开了距离、两人的嘴间牵起了一根唾液构成的丝。`,
        );
        await era.printAndWait(`「想要和主人更多地…接吻哟………${heart(1)}」`);
        // CFLAG:307  = 5（变量语义：CFLAG 族，307）
        kojo.接吻 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.接吻 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯…啾…啾${heart(1)} 更多地…kiss…啾${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}和${player_name}反复接吻着、由于兴奋舌头粘乎乎地纠缠在一起。`,
        );
        await era.printAndWait(
          `「啾…啾…啾呜${heart(1)}…已经没法思考了呜…${heart(1)}」`,
        );
        await era.printAndWait(
          `少女脸上露出与年龄不相称的迷醉表情沉浸在接吻带来的快感里………`,
        );
        // CFLAG:307  = 4（变量语义：CFLAG 族，307）
        kojo.接吻 = 4;
      } else if (
        era.get(`abl:${target}:10`) >= 2 &&
        (kojo.接吻 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「接、接吻不算什么啦…喏…按你喜欢的做就…嗯…！」`,
        );
        await era.printAndWait(`${target_name}好像已经习惯了变得老实了一点。`);
        await era.printAndWait(`「嗯…哈…嗯咕…啾…啾…啊啊………啊」`);
        // CFLAG:307  = 3（变量语义：CFLAG 族，307）
        kojo.接吻 = 3;
      } else if (kojo.接吻 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「不想…和你接吻…嗯！？」`);
        await era.printAndWait(
          `${player_name}强行把${target_name}的下巴掰向自己、贪图着圆润的嘴唇。`,
        );
        await era.printAndWait(`「嗯咕…嗯…嗯…嗯…呜呜呜………」`);
        // CFLAG:307  = 2（变量语义：CFLAG 族，307）
        kojo.接吻 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 7) {
    if (kojo.自己扒开 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊啊～…连小穴的里面…都是主人的所有物哟～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边发出火热的叹息声一边用手指大大地撑开私处…………`,
        );
        if (era.get(`talent:${target}:0`) === 1) {
          await era.printAndWait(
            `「讨厌…再这样张下去处女膜都要被看见了…快点夺走我的处女吧～${heart(1)}」`,
          );
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「唔嗯～…主人想看的话…无论何时都会向您展示的${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边爽朗地着一边用手指撑开了私处…………`,
        );
        if (era.get(`talent:${target}:0`) === 1) {
          await era.printAndWait(
            `「啊啊…明明想被主人拿走处女的…好害羞………${heart(1)}」`,
          );
        }
      } else {
        await era.printAndWait(`「做、做这种事到底有什么好高兴的～！」`);
        await era.printAndWait(
          `${target_name}一边背过通红的脸蛋、一边战战兢兢的用手指撑开私处………`,
        );
      }
      // CFLAG:TARGET:308  = 1（变量语义：CFLAG 族，TARGET:308）
      kojo.自己扒开 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.自己扒开 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「小、小穴…想要肉棒…不要只是看着呀…我已经不能忍耐了啦${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边漏出炽热的喘息一边用手指拨开了小穴…………`,
        );
        if (era.get(`talent:${target}:0`) === 1) {
          await era.printAndWait(
            `「啊啊…就这样推倒我嘛${heart(1)}夺走我的处女啦${heart(1)}」`,
          );
        }
        // CFLAG:306  = 5（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.自己扒开 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「主人…看嘛…看嘛…${heart(1)} 里面都能看到吗…全部都是主人的东西哟${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边明媚地笑着一边用手指拨开了小穴…………`,
        );
        if (era.get(`talent:${target}:0`) === 1) {
          await era.printAndWait(
            `「啊啊…想要主人来夺走我的处女嘛………${heart(1)}」`,
          );
        }
        // CFLAG:306  = 4（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 4;
      } else if (
        era.get(`abl:${target}:17`) >= 3 &&
        (kojo.自己扒开 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「这、张扬看上去好像…一、一个变态…变态啊！」`);
        await era.printAndWait(
          `${target_name}一边咒骂着一边用手指拨开了小穴。`,
        );
        await era.printAndWait(`「想看的话就看吧、来吧…更…更多地………」`);
        await era.printAndWait(`爱液渐渐从她的小穴里溢出来了………`);
        // CFLAG:306  = 3（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 3;
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「不、不要、这种事才不要…为什么…这样的…呜呜」`);
        await era.printAndWait(`${target_name}一边哭着鼻子一边拨开了小穴………`);
        // CFLAG:306  = 2（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 8) {
    if (kojo.插入手指 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「主人的手指…进来了…啊…啊啊…更加…把里面弄得更加咕啾咕啾的啊${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「主人的手指…进来了啊…请再伸进去一点啊${heart(1)}」`,
        );
      } else {
        await era.printAndWait(`「嘻…咿、不要…太勉强了…不要再伸进去了啊！」`);
      }
      // CFLAG:TARGET:309  = 1（变量语义：CFLAG 族，TARGET:309）
      kojo.插入手指 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.插入手指 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「主人的手指…好舒服啊${heart(1)} 把里面弄得咕啾咕啾的吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}配合着手指的动作摆动着腰、贪享着快乐………`,
        );
        // CFLAG:309  = 5（变量语义：CFLAG 族，309）
        kojo.插入手指 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.插入手指 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「不、不要紧的啦…主人的手指的话…无论做什么都是可以的啦${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}随着手指的动作不时绷直腰部、发出销魂的呻吟………`,
        );
        // CFLAG:309  = 4（变量语义：CFLAG 族，309）
        kojo.插入手指 = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.插入手指 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「主人的手指…请更…温柔一点${heart(1)} 进、进到…里面了………${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}像是因为承受着手指插入带来的不适感、腰不停地发抖………`,
        );
        // CFLAG:309  = 4（变量语义：CFLAG 族，309）
        kojo.插入手指 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.插入手指 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「我、我会听话的…请温柔一点！」`);
        // CFLAG:309  = 3（变量语义：CFLAG 族，309）
        kojo.插入手指 = 3;
      } else if (kojo.插入手指 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「这、这样的…不行啊…太勉强了…啊、啊啊」`);
        // CFLAG:309  = 2（变量语义：CFLAG 族，309）
        kojo.插入手指 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 9) {
    if (kojo.舔肛 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「呀啊…主人的舌头…热热…的…再多舔舔啊${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「咿呀…不、不行哟、主人你舔了那种地方的话…啊啊~好害羞！」`,
        );
      } else {
        await era.printAndWait(`「变、变态…你在舔哪里啊！快住手！真是恶心！」`);
      }
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310）
      kojo.舔肛 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:77`) === 1 &&
        (kojo.舔肛 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呀啊…更多地舔我的肛门啊…每一条皱褶都好好地舔一舔哟${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}那不检点的嘴不停喘息着。`);
        await era.printAndWait(
          `「呼…啊嗯…啊啊${heart(1)} …呀啊啊好舒服${heart(1)} 好舒服哟${heart(1)} 喜欢${heart(1)}」`,
        );
        await era.printAndWait(
          `少女的肛门无论被怎么样对待应该都能承受下来吧………`,
        );
        // CFLAG:310  = 7（变量语义：CFLAG 族，310）
        kojo.舔肛 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.舔肛 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「被舌头舔着好舒服…主人的舌头…啊啊${heart(1)} 把舌头伸进去…舔更深的地方啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}每次被舔肛门都会发出粗重的喘息。`,
        );
        await era.printAndWait(`每一条皱褶都被精心舔着………`);
        // CFLAG:310  = 6（变量语义：CFLAG 族，310）
        kojo.舔肛 = 6;
      } else if (
        era.get(`talent:${target}:77`) === 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呀啊…更多…再来更多地舔我的肛门啊…屁股里面都已经黏乎乎的了啊${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}那不检点的嘴不停喘息着。`);
        await era.printAndWait(`少女沉浸在肛门的快乐中、寻求着新的刺激………`);
        // CFLAG:310  = 5（变量语义：CFLAG 族，310）
        kojo.舔肛 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.舔肛 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「不行哟、主人你舔了那种地方的话…啊啊~好害羞！」`,
        );
        await era.printAndWait(
          `${target_name}害羞地紧闭双眼、忍受着肛门那传来的奇特感觉………`,
        );
        // CFLAG:310  = 4（变量语义：CFLAG 族，310）
        kojo.舔肛 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.舔肛 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「咕…呜呜…不、不要舔的那么投入啊………」`);
        // CFLAG:310  = 3（变量语义：CFLAG 族，310）
        kojo.舔肛 = 3;
      } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「变、变态…住、住手啦…快住手！」`);
        // CFLAG:310  = 2（变量语义：CFLAG 族，310）
        kojo.舔肛 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 10) {
    if (kojo.振动宝石 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「再…用点力…连这种色色的道具都有…魔族好厉害${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「这、这样的…好、好厉害啊………${heart(1)}」`);
      } else {
        await era.printAndWait(`「不、不要啊…那种震动…不、不行、好害怕！」`);
      }
      // CFLAG:TARGET:311  = 1（变量语义：CFLAG 族，TARGET:311）
      kojo.振动宝石 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.振动宝石 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊哈…哈、哈嗯${heart(1)} 请更多地欺负阴蒂啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}反弓起腰、想要更好地品味这快感………`,
        );
        // CFLAG:311  = 5（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.振动宝石 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呀啊${heart(1)} 这个、好舒服好舒服${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}一脸高潮的表情持续承受着刺激………`);
        // CFLAG:311  = 4（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.振动宝石 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呜啊…啊…啊啊………不、不要再欺负我了…啊…嗯咕${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}咬紧牙关承受着快感………`);
        // CFLAG:311  = 3（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 3;
      } else if (kojo.振动宝石 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「咕…呜呜…呀…呀啊啊………」`);
        await era.printAndWait(`${target_name}好像还不能理解这未知的快感………`);
        // CFLAG:311  = 2（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 11 && era.get(`tequip:${target}:11`)) {
    if (kojo.壶虫 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「啊…啊啊啊…不是处女了啊…被虫子破处了呢${heart(1)}」`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(`「笨蛋…笨蛋…再温柔一点啊…这样的…好讨厌………」`);
        } else {
          await era.printAndWait(
            `「不要…不要啊…这、这样的…被这样对待什么的…！」`,
          );
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「不、不要…就这样进到我的小穴里来了啊${heart(1)}」`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「不要…这、这个孩子…在里面动着…呜啊啊啊啊${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「住、住手啊…那样的不要放进来啊…咿咿咿呀！」`,
          );
        }
      }
      // CFLAG:312  = 1（变量语义：CFLAG 族，312）
      kojo.壶虫 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.壶虫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「更多地…欺负小穴吧${heart(1)}…把小穴弄得一塌糊涂吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}配合着虫子的蠕动扭动着腰、跳着淫秽的舞蹈………`,
        );
        // CFLAG:312  = 5（变量语义：CFLAG 族，312）
        kojo.壶虫 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.壶虫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊哈嗯${heart(1)}动着…在里面…动着呢！」`);
        await era.printAndWait(
          `虫子每次动的时候${target_name}都扭动着身体发出快感的悲鸣。`,
        );
        // CFLAG:312  = 4（变量语义：CFLAG 族，312）
        kojo.壶虫 = 4;
      } else if (
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.壶虫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊…啊啊…满满的…啊、好舒服…啊啊嗯${heart(1)}」`,
        );
        await era.printAndWait(`已经习惯了的${target_name}发出甜美的呻吟………`);
        // CFLAG:312  = 3（变量语义：CFLAG 族，312）
        kojo.壶虫 = 3;
      } else if (kojo.壶虫 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「不要…全都进来了…讨厌…这样的好讨厌………」`);
        await era.printAndWait(`虫子不停地钻进少女的阴道………`);
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
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.壶虫着脱 < 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「哈…啊、啊啊嗯………出来了………」`);
      await era.printAndWait(`「下次啊…请赐给我主人的肉棒吧${heart(1)}」`);
      // CFLAG:372  = 4（变量语义：CFLAG 族，372）
      kojo.壶虫着脱 = 4;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.壶虫着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊啊…好、好难受…不要这么欺负我啊………」`);
      await era.printAndWait(`这样说这的少女将炽热的誓言转向了虫子………`);
      // CFLAG:372  = 3（变量语义：CFLAG 族，372）
      kojo.壶虫着脱 = 3;
    } else if (
      era.get(`abl:${target}:2`) >= 3 &&
      (kojo.壶虫着脱 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「哈…啊、啊啊嗯………出来了………」`);
      // CFLAG:372  = 2（变量语义：CFLAG 族，372）
      kojo.壶虫着脱 = 2;
    } else if (kojo.壶虫着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「啊、啊啊…好难受………」`);
      // CFLAG:372  = 1（变量语义：CFLAG 族，372）
      kojo.壶虫着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 12) {
    if (kojo.振动杖 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「好、好厉害…震动传过来了${heart(1)}」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「呜啊…咿呀酥酥麻麻的…酥酥麻麻的啊${heart(1)}」`,
        );
      } else {
        await era.printAndWait(`「呀啊…不、不要啊…那、那种酥麻感！」`);
      }
      // CFLAG:313  = 1（变量语义：CFLAG 族，313）
      kojo.振动杖 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.振动杖 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「好、好厉害…震动传过来了${heart(1)} 震动再强烈一些啊${heart(1)}」`,
        );
        await era.printAndWait(
          `「整个人…都要变得奇怪了啦${heart(1)} 啊咿${heart(1)} 咿呀${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被震动棒彻底地按摩着股间、淌着口水沉浸在快感之中………`,
        );
        // CFLAG:313  = 5（变量语义：CFLAG 族，313）
        kojo.振动杖 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.振动杖 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呜啊…呀啊${heart(1)}啊！嗯！酥酥麻麻的…酥酥麻麻的啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}用力把按摩棒压在股间、品味着快感………`,
        );
        // CFLAG:313  = 4（变量语义：CFLAG 族，313）
        kojo.振动杖 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.振动杖 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「咕…呜…啊啊…哈啊啊…不、不行…不要那样压上来啊………」`,
        );
        await era.printAndWait(
          `每次被压上按摩棒的时候、${target_name}的声音都渐渐变得甘甜起来………`,
        );
        // CFLAG:313  = 3（变量语义：CFLAG 族，313）
        kojo.振动杖 = 3;
      } else if (kojo.振动杖 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「呀啊…不、不要啊…那、那种酥麻感！」`);
        // CFLAG:313  = 2（变量语义：CFLAG 族，313）
        kojo.振动杖 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 13 && era.get(`tequip:${target}:13`)) {
    if (kojo.肛门虫 === 0) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:77`) === 1
      ) {
        await era.printAndWait(
          `「啊…虫子…咿…进到…肚子里来了…被弄得黏乎乎的了啊${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊哈…啊…啊啊${heart(1)} 肛门被扩张了…扩张了呜${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:77`) === 1) {
        await era.printAndWait(
          `「咿呀…啊啊…虫子在里面…哈…嘻咿…要、要变得奇怪了呜…${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「那、那样的…嗯、不行的啦…啊啊…啊…屁股会坏掉的…请放过我吧………」`,
        );
      } else {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「不、不要啊！不要把那种东西放进来啊！放过我啊！」`,
          );
          await era.printAndWait(
            `与话语不同的是很轻易地就把虫子塞进了被调教后的${target_name}的肛门里………`,
          );
        } else {
          await era.printAndWait(
            `「不、不要啊！不要把那种东西放进来啊！放过我啊！」`,
          );
          await era.printAndWait(
            `虽然肛门紧紧地缩了起来、不过虫子还是毫不留情地钻了进去………`,
          );
        }
      }
      // CFLAG:TARGET:314  = 1（变量语义：CFLAG 族，TARGET:314）
      kojo.肛门虫 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:77`) === 1 &&
        (kojo.肛门虫 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「嗯咿…进到…进到里面来了…${heart(1)}」`);
        await era.printAndWait(
          `肛门蠕虫一边发出咕嗞咕嗞的声音一边钻进了${target_name}的肛门。`,
        );
        await era.printAndWait(
          `「嗯哈…啊啊…屁股小穴好舒服…再来做更多啊${heart(1)}」`,
        );
        await era.printAndWait(
          `少女沉浸在肛门的快感之中、放着不管的话多少次都能去吧………`,
        );
        // CFLAG:314  = 9（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呀呜${heart(1)}…肛门…啊啊…在被虫子侵犯着啊${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}的肛门已经很习惯被塞进虫子了。`);
        await era.printAndWait(
          `「咿呀${heart(1)} 咿呀${heart(1)} 咿呀${heart(1)}…太闹腾了…啊啊…不…不行${heart(1)}」`,
        );
        await era.printAndWait(
          `肛门蠕虫蠕动的时候带来的快感让少女的腰不停地上下起伏………`,
        );
        // CFLAG:314  = 8（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.肛门虫 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊哈啊…虫子进来了啊${heart(1)}」`);
        await era.printAndWait(
          `${target_name}的腰微微颤抖着、享受着虫子带来的快感。`,
        );
        await era.printAndWait(
          `「呜…酥酥麻麻的…的呜…屁股…要、要变得奇怪了啊${heart(1)}」`,
        );
        // CFLAG:314  = 7（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 7;
      } else if (
        era.get(`talent:${target}:77`) === 1 &&
        (kojo.肛门虫 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呀呜${heart(1)}…屁股…里面…全部全部…都在被虫子侵犯着${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被扩张到极限的肛门已经非常习惯吞进虫子了。`,
        );
        await era.printAndWait(
          `「已…已经…只要有屁股就可以了${heart(1)}…只要有屁股就可以了啊！」`,
        );
        await era.printAndWait(
          `肛门蠕虫蠕动的时候带来的快感让少女的腰不停地上下起伏………`,
        );
        // CFLAG:314  = 6（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊…虫子在里面动着啊…不、不要…不、不要动啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}带着一脸快要去了的表情品味着快感。`,
        );
        await era.printAndWait(
          `「哈啊啊…屁股那里的…感觉传过来了好可怕…${heart(1)}」`,
        );
        await era.printAndWait(`「主人啊…已、已经可以放过我了吧………！」`);
        // CFLAG:314  = 5（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.肛门虫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「没、没关系…不是很害怕啦………${heart(1)}」`);
        await era.printAndWait(
          `${target_name}虽然很紧张、还是把虫子全部咽进了肛门。`,
        );
        await era.printAndWait(`「咕…咿…咿…咿嗯…啊啊…咕、咕噜呜」`);
        // CFLAG:314  = 4（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「不要…不要啊…虫子什么的不要放进来啊…！」`);
        await era.printAndWait(
          `由于已经被调教了好多次、${target_name}的肛门很轻易就咽下了虫子。`,
        );
        await era.printAndWait(
          `「这、这样的…不要、不要啊…不、不想…体验啊…！」`,
        );
        // CFLAG:314  = 3（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 3;
      } else if (kojo.肛门虫 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「这、这样的…一点…都不舒服啊………！」`);
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
      era.get(`talent:${target}:77`) === 1 &&
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.肛门虫着脱 < 6 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「哈呜呜${heart(1)}…下次…想要肉棒啊…${heart(1)}」`,
      );
      // CFLAG:374  = 6（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 6;
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.肛门虫着脱 < 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊哈…屁股被扩张开来回不去了${heart(1)}」`);
      // CFLAG:374  = 5（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 5;
    } else if (
      era.get(`talent:${target}:77`) === 1 &&
      (kojo.肛门虫着脱 < 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「更多…更加欺负…再来侵犯屁股小穴啊${heart(1)}」`);
      // CFLAG:374  = 4（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 4;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.肛门虫着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「呼啊啊…更加地…玩弄也可以哟…${heart(1)}」`);
      // CFLAG:374  = 3（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 3;
    } else if (
      era.get(`abl:${target}:3`) >= 3 &&
      (kojo.肛门虫着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「哈…哈…啊嗯${heart(1)} 一、一点都不舒服啦………」`);
      // CFLAG:374  = 2（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 2;
    } else if (kojo.肛门虫着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「哈…哈…屁股…屁股被扩张开来回不去了呜………」`);
      // CFLAG:374  = 1（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 14 && era.get(`tequip:${target}:14`)) {
    if (kojo.阴蒂夹 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊、嘻呀…这、这个…好厉害……阴蒂酥酥麻麻的${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}因为阴蒂受到了强烈的刺激发出了喜悦的呻吟………`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「啊啊啊…再温柔一些…就好了…${heart(1)}」`);
        await era.printAndWait(
          `${target_name}为着阴蒂上未知的快感感到不知所措………`,
        );
      } else {
        await era.printAndWait(`「咕…不、不可以…这、这样的…嘻！」`);
        await era.printAndWait(
          `夹子紧紧地夹住阴蒂施加着持续的刺激、${target_name}尝试着徒劳的反抗………`,
        );
      }
      // CFLAG:315  = 1（变量语义：CFLAG 族，315）
      kojo.阴蒂夹 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.阴蒂夹 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊…嗯嗯…啊哈…可以…欺负阴蒂哟${heart(1)}」`);
        await era.printAndWait(`「颤动着…好舒服${heart(1)}」`);
        // CFLAG:315  = 4（变量语义：CFLAG 族，315）
        kojo.阴蒂夹 = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.阴蒂夹 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「这、这种刺激才不会去呢…主人的手指更加舒服啊${heart(1)}」`,
        );
        await era.printAndWait(`「啊啊放过我吧…放过我吧${heart(1)}」`);
        // CFLAG:315  = 3（变量语义：CFLAG 族，315）
        kojo.阴蒂夹 = 3;
      } else if (kojo.阴蒂夹 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「咕…呜啊…哈…哈嗯…不要啊…不要做这种事啊………」`);
        await era.printAndWait(
          `夹子紧紧地夹住阴蒂施加着持续的刺激、${target_name}尝试着徒劳的反抗………`,
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
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.阴蒂夹着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「呀啊…喜、喜欢这个…喜欢这种舒服的感觉………${heart(1)}」`,
      );
      // CFLAG:375  = 3（变量语义：CFLAG 族，375）
      kojo.阴蒂夹着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.阴蒂夹着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「这次…主人…做的很好哦…${heart(1)}」`);
      // CFLAG:375  = 2（变量语义：CFLAG 族，375）
      kojo.阴蒂夹着脱 = 2;
    } else if (kojo.阴蒂夹着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「啊、呜呜…啊啊…真、真是的…放过…我吧………」`);
      // CFLAG:375  = 1（变量语义：CFLAG 族，375）
      kojo.阴蒂夹着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 15 && era.get(`tequip:${target}:15`)) {
    if (kojo.乳头夹 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(`「嘻呀…胸部在被欺负着…${heart(1)}」`);
          await era.printAndWait(
            `${target_name}一边摇晃着那对沉重的乳房一边享受着乳头传来的快感………`,
          );
        } else {
          await era.printAndWait(
            `「不要…虽然很舒服…但是乳头要被拉长了啦${heart(1)}」`,
          );
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait('');
          await era.printAndWait(`「啊嗯…呀…呀啊…胸部…摇晃着…啊${heart(1)}」`);
          await era.printAndWait(
            `${target_name}一边发出粗重的喘息一边摇晃着那对沉重的乳房………`,
          );
        } else {
          await era.printAndWait(
            `「乳、乳头…太刺激了啊…啊、啊啊…哈…啊嗯${heart(1)}」`,
          );
        }
      } else {
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait('');
          await era.printAndWait(
            `「胸部…好重…啊啊…不要…不要再这样玩弄乳头了啊………」`,
          );
          await era.printAndWait(
            `${target_name}为着乳头受到的快感颤抖着、摇晃着和身体不相称的巨乳………`,
          );
        } else {
          await era.printAndWait(`「呀呜…不要…被这样对待…啊啊啊啊！」`);
        }
      }
      // CFLAG:316  = 1（变量语义：CFLAG 族，316）
      kojo.乳头夹 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.乳头夹 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(
            `「啊…乳头被欺负着…好舒服…更多…还要${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一边摇晃着和身体不相称的巨乳一边发出快乐的呻吟。`,
          );
          await era.printAndWait(`「咿嘻…胸部也…请用力的揉吧${heart(1)}」`);
        } else {
          await era.printAndWait(
            `「啊…被、被那样紧紧地夹住了…太刺激了啦…啊…啊啊${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}一边淌着口水一边体味着快感………`);
        }
        // CFLAG:316  = 4（变量语义：CFLAG 族，316）
        kojo.乳头夹 = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.乳头夹 <= 2 || game.kojo.口上开关 === 2)
      ) {
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(`「啊嗯…呀…呀啊…胸部…摇晃着…啊${heart(1)}」`);
          await era.printAndWait(
            `${target_name}不能承受乳头的刺激、摇晃着那和身体不相称的巨乳喘息着。`,
          );
          await era.printAndWait(`「嗯嗯…好害羞…不要看啊………」`);
        } else {
          await era.printAndWait(
            `「啊啊…啊啊~${heart(1)} 啊啊~${heart(1)} 好舒服…好舒服…${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}的乳头受到了强烈的刺激………`);
        }
        // CFLAG:316  = 3（变量语义：CFLAG 族，316）
        kojo.乳头夹 = 3;
      } else if (kojo.乳头夹 <= 1 || game.kojo.口上开关 === 2) {
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(`「不要啊啊…这样的…住、住手啊………」`);
          await era.printAndWait(`${target_name}震颤着和身体不相称的巨乳………`);
        } else {
          await era.printAndWait(`「咕…呜呜呜…这样的…也没什么了不起的嘛………」`);
          await era.printAndWait(
            `${target_name}的脸红红的、忍耐着来自乳头的刺激………`,
          );
        }
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
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.乳头夹着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「咕嗯…下次用主人的手指来欺负乳头吧${heart(1)}」`,
      );
      // CFLAG:376  = 3（变量语义：CFLAG 族，376）
      kojo.乳头夹着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.乳头夹着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「哈…哈…下次主人来………做吧………${heart(1)}」`);
      // CFLAG:376  = 2（变量语义：CFLAG 族，376）
      kojo.乳头夹着脱 = 2;
    } else if (kojo.乳头夹着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「哈…哈…呜呜…乳头已经这么肿了………」`);
      // CFLAG:376  = 1（变量语义：CFLAG 族，376）
      kojo.乳头夹着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 16 && era.get(`tequip:${target}:16`)) {
    if (kojo.榨乳器 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(
            `「啊哈…胸部在被吸…咿呀…嗯${heart(1)} 嗯呜好舒服啊…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的巨乳被装上了榨乳机、呻吟着被榨出了奶………`,
          );
        } else {
          await era.printAndWait(
            `「啊嗯…乳汁…全部被吸出来了啊…好舒服…好舒服啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的乳房被装上了榨乳机、呻吟着被榨出了奶………`,
          );
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(
            `「咿…呀啊…啊啊…乳汁出来了…出来了啊…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的巨乳被装上了榨乳机、被毫不留情地榨着乳汁……`,
          );
        } else {
          await era.printAndWait(`「不行…乳汁是要留给小宝宝的啊………」`);
          await era.printAndWait(`${target_name}被装上了榨乳机、哭喊着………`);
        }
      } else {
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(`「我、我…不是乳牛啊………！」`);
          await era.printAndWait(
            `${target_name}的巨乳被装上了榨乳机、被毫不留情地榨着乳汁………`,
          );
        } else {
          await era.printAndWait(`「我、我…不是乳牛啊………！」`);
        }
      }
      // CFLAG:317  = 1（变量语义：CFLAG 族，317）
      kojo.榨乳器 = 1;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.榨乳器 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(
            `「啊哈…胸部在被吸…咿呀…嗯${heart(1)} 嗯呜好舒服啊…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的巨乳被装上了榨乳机、呻吟着被榨出了奶………`,
          );
        } else {
          await era.printAndWait(
            `「啊嗯…乳汁…全部被吸出来了啊…好舒服…好舒服啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的乳房被装上了榨乳机、呻吟着被榨出了奶………`,
          );
        }
        // CFLAG:317  = 4（变量语义：CFLAG 族，317）
        kojo.榨乳器 = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.榨乳器 <= 2 || game.kojo.口上开关 === 2)
      ) {
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(
            `「咿…呀啊…啊啊…乳汁出来了…出来了啊…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的巨乳被装上了榨乳机、被毫不留情地榨着乳汁……`,
          );
        } else {
          await era.printAndWait(`「不行…乳汁是要留给小宝宝的啊………」`);
          await era.printAndWait(`${target_name}被装上了榨乳机、哭喊着………`);
        }
        // CFLAG:317  = 3（变量语义：CFLAG 族，317）
        kojo.榨乳器 = 3;
      } else if (kojo.榨乳器 <= 1 || game.kojo.口上开关 === 2) {
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(`「不要啦…我又不是乳牛………」`);
          await era.printAndWait(
            `${target_name}的巨乳被装上了榨乳机、被毫不留情地榨着乳汁……`,
          );
        } else {
          await era.printAndWait(
            `「咕呜………收、收集我的乳汁什么的…到底在想什么啊………」`,
          );
        }
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
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.榨乳器着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊呀………哈哈…主人把它喝掉嘛…${heart(1)}」`);
      // CFLAG:377  = 3（变量语义：CFLAG 族，377）
      kojo.榨乳器着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.榨乳器着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「哈哈………主人把它喝掉的话就再好不过了………」`);
      // CFLAG:377  = 2（变量语义：CFLAG 族，377）
      kojo.榨乳器着脱 = 2;
    } else if (kojo.榨乳器着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「呜…不要再榨了啊………」`);
      // CFLAG:377  = 1（变量语义：CFLAG 族，377）
      kojo.榨乳器着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 17 && era.get(`tequip:${target}:17`)) {
    if (kojo.飞机杯 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「呀啊…飞机杯好舒服${heart(1)} 请再多欺负我的肉棒${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「请、请温柔地…摩擦…啊${heart(1)}…啊啊${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「不要…住手啊…那、那种东西…不、不要再让我高潮了！」`,
        );
      }
      // CFLAG:318  = 1（变量语义：CFLAG 族，318）
      kojo.飞机杯 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.飞机杯 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「想要射精…想要射出好多精液${heart(1)} 在飞机杯里…满满地中出${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的阴茎上套着飞机杯、前后摆动着腰………`,
        );
        // CFLAG:318  = 4（变量语义：CFLAG 族，318）
        kojo.飞机杯 = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.飞机杯 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊…主人…请…请再多玩弄我那下流的肉棒${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}虽然看上去很害羞、但完全不能抑制想要射精的欲望………`,
        );
        // CFLAG:318  = 3（变量语义：CFLAG 族，318）
        kojo.飞机杯 = 3;
      } else if (kojo.飞机杯 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「不行…不可以…要是做了这种事的话…啊啊…真的…要不行了啊……」`,
        );
        await era.printAndWait(
          `${target_name}胯间高高挺立的阴茎在飞机杯颤动着、很舒服的样子………`,
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
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.飞机杯着脱 <= 32 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊嗯…还想射出更多${heart(1)}」`);
      // CFLAG:378  = 2（变量语义：CFLAG 族，378）
      kojo.飞机杯着脱 = 2;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.飞机杯着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊啊…哈${heart(1)}…满满地射出了…？」`);
      // CFLAG:378  = 2（变量语义：CFLAG 族，378）
      kojo.飞机杯着脱 = 2;
    } else if (kojo.飞机杯着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「不要…我…射出了那么多………」`);
      // CFLAG:378  = 1（变量语义：CFLAG 族，378）
      kojo.飞机杯着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 19 && era.get(`tequip:${target}:19`)) {
    if (kojo.肛珠 === 0) {
      if (era.get(`talent:${target}:77`) === 1) {
        await era.printAndWait(
          `「呀啊！就、就这样插进来什么的…太、太棒了…${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「呣呒…屁、屁股…变得好奇怪…${heart(1)}」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「啊啊…进来了…屁股…变得…好奇怪${heart(1)}」`);
      } else {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(`「不…不要…不要就那样插进来啊………！」`);
          await era.printAndWait(
            `与言语相反的是、很轻松地就把拉珠塞进了接受调教的${target_name}的肛门里………`,
          );
        } else {
          await era.printAndWait(`「不…不要…不要就那样插进来啊………！」`);
          await era.printAndWait(
            `虽然${target_name}收紧肛门来反抗、拉珠还是毫不留情地塞了进去………`,
          );
        }
      }
      // CFLAG:TARGET:320  = 1（变量语义：CFLAG 族，TARGET:320）
      kojo.肛珠 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:77`) === 1 &&
        (kojo.肛珠 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊哈…嘿嘿嘿…${heart(1)} 屁股…变得黏乎乎的了…变得…变得更加奇怪了呢${heart(1)}」`,
        );
        await era.printAndWait(
          `菊穴里塞进了全部肛门拉珠的${target_name}露出了不检点的啊嘿颜。`,
        );
        await era.printAndWait(
          `「我的屁股小穴…希望受到各种各样的欺负呢${heart(1)}」`,
        );
        // CFLAG:320  = 8（变量语义：CFLAG 族，320）
        kojo.肛珠 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呀哈…啊啊…拉珠…全部进来了…啊啊…好舒服…${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}发出舒服到极点的声音撒着娇。`);
        await era.printAndWait(
          `「屁…屁股…更加湿嗒嗒的…想要变得更加湿嗒嗒的………${heart(1)}」`,
        );
        // CFLAG:320  = 8（变量语义：CFLAG 族，320）
        kojo.肛珠 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.肛珠 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「屁股…虽然觉得很奇怪…总觉得…要觉醒新的癖好了…${heart(1)}」`,
        );
        await era.printAndWait(
          `菊穴里塞进了全部肛门拉珠的${target_name}左右扭动着可爱的屁股`,
        );
        await era.printAndWait(
          `「欸嘿嘿…请再多惩罚我这个H的宠物吧${heart(1)}」`,
        );
        // CFLAG:320  = 7（变量语义：CFLAG 族，320）
        kojo.肛珠 = 7;
      } else if (
        era.get(`talent:${target}:77`) === 1 &&
        (kojo.肛珠 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊哈…嘻呀…${heart(1)} 屁股…变得黏乎乎的了…变得…变得更加奇怪了呢${heart(1)}」`,
        );
        await era.printAndWait(
          `菊穴里塞进了全部肛门拉珠的${target_name}露出了不检点的啊嘿颜。`,
        );
        await era.printAndWait(`「再…再…多欺负…我的屁股小穴${heart(1)}」`);
        // CFLAG:320  = 6（变量语义：CFLAG 族，320）
        kojo.肛珠 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊${heart(1)}…呣呒${heart(1)}…再…快点也…啊嗯…呀啊…这么突然啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}好像已经习惯了、放松的肛门慢慢吞入了肛门拉珠………`,
        );
        // CFLAG:320  = 5（变量语义：CFLAG 族，320）
        kojo.肛珠 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.肛珠 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊…进来了…屁股…变得…奇怪了啦${heart(1)}」`);
        await era.printAndWait(`${target_name}扭动着屁股、忍受着肛门的快感………`);
        // CFLAG:320  = 4（变量语义：CFLAG 族，320）
        kojo.肛珠 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「不、不要…住手…快住手啊…不、不要塞进来啊…明明…啊嗯」`,
        );
        await era.printAndWait(
          `${target_name}所发出的痛苦的叫喊之中也混杂着甜美的呻吟………`,
        );
        // CFLAG:320  = 3（变量语义：CFLAG 族，320）
        kojo.肛珠 = 3;
      } else if (kojo.肛珠 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「这、这样的…真的是…好讨厌………」`);
        await era.printAndWait(
          `每插入一颗肛门拉珠、${target_name}都会左右扭动屁股来反抗………`,
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
      era.get(`talent:${target}:77`) === 1 &&
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.肛珠着脱 < 6 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「咕嘻${heart(1)}…把我的屁股小穴弄得更加乱七八糟的吧${heart(1)}」`,
      );
      // CFLAG:379  = 6（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 6;
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.肛珠着脱 < 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「呀啊…好、好厉害哟…这…这个…${heart(1)}」`);
      // CFLAG:379  = 5（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 5;
    } else if (
      era.get(`talent:${target}:77`) === 1 &&
      (kojo.肛珠着脱 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊啊…下次…想要更加大的${heart(1)}」`);
      // CFLAG:379  = 4（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 4;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.肛珠着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「呀啊………好、好舒服…啊嗯${heart(1)}」`);
      // CFLAG:379  = 3（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 3;
    } else if (
      era.get(`abl:${target}:3`) >= 3 &&
      (kojo.肛珠着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「呀哈…啊啊…啊啊啊…这样的…明明应该讨厌的………」`);
      // CFLAG:379  = 2（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 2;
    } else if (kojo.肛珠着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「嗯啊啊…啊啊…啊…屁、屁股…要裂开来了………」`);
      // CFLAG:379  = 1（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 20) {
    if (kojo.正常位 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        if (era.get(`talent:${target}:76`) === 1) {
          if (!(era_flag.assi > 0 && era_flag.assiplay)) {
            if (era.get(`talent:${target}:314`) === 9) {
              await era.printAndWait(
                `「啊呀~${heart(1)}…好高兴啊哈~啊~…${heart(1)} 啊嗯~…啊~哈啊~~…${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}两眼冒光地抱着${player_name}。`,
              );
              await era.printAndWait(
                `「感觉到主人的魔力了呢~…主人~${heart(1)}…魔王大人~${heart(1)}」`,
              );
              await era.printAndWait(
                `因为紧闭地紧贴在一起的原因，${target_name}发出了欢喜的声音。`,
              );
              await era.printAndWait(
                `「大鸡巴…往更加深的地方插进来吧~…俺要因为大鸡巴而坏掉啦~${heart(1)}」`,
              );
              await era.printAndWait(
                `${master_name}她那一副塞进了阴茎后就变得淫乱的姿态，如同完全臣服了的魔族少女一样………`,
              );
            } else {
              await era.printAndWait(
                `「哈~…啊~…啊啊啊~…大鸡巴进来了~…呜~啊~…啊啊~${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}紧张地呼吸着、不成熟的蜜穴的深处被塞进了阴茎。`,
              );
              await era.printAndWait(
                `「主…人~…大人~…啊~…俺没…没问题的…所以请好好地品尝俺的处女小穴吧~…${heart(1)}」`,
              );
              await era.printAndWait(
                `「魔王大人的大鸡巴就是为了这个才存在的吧~…俺…俺想要…成为主人的小穴呐~${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}拼命地忍耐着破瓜之痛紧紧地抱了过来………`,
              );
            }
          }
        } else if (era.get(`talent:${target}:85`) === 1) {
          if (!(era_flag.assi > 0 && era_flag.assiplay)) {
            if (era.get(`talent:${target}:314`) === 9) {
              await era.printAndWait(
                `${target_name}的脸破瓜的疼痛而变得僵硬，露出了一副不自然却十分坚强的笑容。`,
              );
              await era.printAndWait(
                `「没、没事的啦…这样的…完全没事的啦…嗯~………啊啊~」`,
              );
              await era.printAndWait(
                `看着如此坚强的${target_name}，${player_name}不假思索地抚摸了她的脑袋。`,
              );
              await era.printAndWait(
                `「魔王大人的…大鸡巴~…感觉到了~${heart(1)}…好热的…好热啊…啊~………${heart(1)}」`,
              );
              await era.printAndWait(
                `「啊啊~…更加大力地动吧~${heart(1)}…将俺…将俺变成魔王大人的东西吧~！」`,
              );
              await era.printAndWait(
                `${player_name}那一副塞进了阴茎而喜极而泣的姿态、如同完全臣服了的魔族少女一样………`,
              );
            } else {
              await era.printAndWait(`「哈啊…哈啊…嗯~…啊~…啊呜~………」`);
              await era.printAndWait(
                `${target_name}忍耐着破瓜的痛苦的样子、闭着眼睛紧咬着牙。`,
              );
              await era.printAndWait(
                `「完、完全…没、没有问题的啦~…主人~…请、变得舒服…起、起来吧~…~………」`,
              );
              await era.printAndWait(
                `少女的手在${player_name}的背后划出了刮痕、而这刮痕带来的疼痛让${player_name}感到了十分地舒爽的感觉。`,
              );
              await era.printAndWait(
                `「啊啊~…主人的~…大鸡巴好热啊~…好想…更加地侍奉啊~…${heart(1)}」`,
              );
            }
          }
        } else {
          if (era_flag.assi > 0 && era_flag.assiplay) {
            await era.printAndWait('');
          } else {
            await era.printAndWait(
              `「啊唔呜呜呜~！…好难受…好难受啊…快点…快点拔掉啊~………！」`,
            );
            await era.printAndWait(
              `强行将${target_name}未成熟的蜜穴完全扩张、远远不像快感的痛苦的叫声响彻了周围。`,
            );
            await era.printAndWait(
              `因为这痛苦的声音而兴奋起来的${player_name}继续凌辱着少女………`,
            );
          }
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「啊啊恩~…更加…更加用力地插进去吧~…插到要将小穴弄坏的程度吧~~…好想要大鸡巴啊~~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}十分欣喜地让阴茎插进了蜜穴后发出了十分甘甜的娇喘声………`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「哈呜~…啊~…啊啊~………更加…慢一点做吧…啊~…啊啊恩~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被插进去后，就不停地喘着炽热的粗气紧紧地抱着${player_name}………`,
          );
        } else {
          await era.printAndWait(
            `「啊~…唔~…进来了…鸡巴…啊~呀啊~…突然这样子~…啊啊~！」`,
          );
          await era.printAndWait(
            `将阴茎强行地塞进了${target_name}蜜穴的深处后${player_name}毫不留情地蹂蹑起了少女………`,
          );
        }
      }
      // CFLAG:321  = 1（变量语义：CFLAG 族，321）
      kojo.正常位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.正常位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊啊恩~…更加…更加用力地抽插吧~…插到小穴要坏掉的程度吧~…好想要大鸡巴啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}十分欣喜地让阴茎插进了蜜穴后发出了十分甘甜的娇喘声。`,
          );
          await era.printAndWait(
            `「俺、俺已经…变成喜欢鸡巴的变态狂也没有关系了~${heart(1)}…更加…更加激烈地做吧~${heart(1)}」`,
          );
          await era.printAndWait(
            `「一抽一抽地…好想被biu~地一下在里面射出精液啊~…${heart(1)}」`,
          );
          await era.printAndWait(
            `不像样地张大着嘴巴恳求的姿态、看来少女已经不是村女而是完完全全妓女了………`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊~…主人的好热的来了~${heart(1)} 呜嗯~…这个好喜欢啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}发出了愉悦的声音用双手缠绕住了${player_name}。`,
          );
          await era.printAndWait(
            `「啊~${heart(1)} 啊~${heart(1)} 啊啊~${heart(1)}…好想就这样和主人融化合在一起啊~…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}越过${player_name}的背后环抱住的双手意外地舒服………`,
          );
          if (era.get(`talent:${target}:314`) === 9) {
            await era.printAndWait(
              `「啊~啊啊~${heart(1)}…就这样…将俺吃掉吧~…好想成为主人的一部分啊~………${heart(1)}」`,
            );
            await era.printAndWait(
              `没错，向${player_name}撒娇的少女那魔族的双目发出了灿烂的光辉………`,
            );
          }
        } else {
          await era.printAndWait(
            `「看着俺…的…脸吧~…被主人…用大鸡巴来调教…变得舒服起来的样子被看到了~…${heart(1)}」`,
          );
          await era.printAndWait(
            `每当${target_name}的腔内深处被不断地抽插的时候，这个少女可爱的脸蛋就会歪曲掉发出了十分色情的娇喘声。`,
          );
          await era.printAndWait(
            `「呀~${heart(1)}…呀啊~…啊~…哼~…呀啊~${heart(1)}…啊啊~…大鸡巴~…好棒~${heart(1)}…大鸡巴~…好喜欢${heart(1)}…最喜欢了~…${heart(1)}」`,
          );
          await era.printAndWait(
            `「对不起~…只有俺变得那么舒服真是对不起~${heart(1)}…但是~…但是~…主人的大鸡巴好棒啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的脑袋完全变成了痴女的样子了………`,
          );
        }
        // CFLAG:321  = 6（变量语义：CFLAG 族，321）
        kojo.正常位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.正常位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊~…哼~…啊呜~…哈啊嗯~…${heart(1)} 没问题的啊嗯~…更加激烈地动吧~！」`,
          );
          await era.printAndWait(
            `${target_name}兴奋了起来，紧紧地抱住了${player_name}。`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊~…嗯~…哼…啊啊…小穴…好棒啊~………${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `「更加地…调教俺吧~${heart(1)}…俺的小穴~${heart(1)} 作为主人专用的小穴来用吧~！」`,
          );
          await era.printAndWait(
            `每当腔内深处被抽插的时候，${target_name}就会一脸幸福的表情发出了甘甜的娇喘声。`,
          );
          await era.printAndWait(
            `「俺…俺已经…不和主人在一起的话就活不下去了呢~………♪」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊~…哈啊~…啊~啊啊~…不要啦~…好羞耻啊~………${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}将${target_name}的双腿抓住一口气拉开直接抽插了起来。`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊~…嗯~…哼…啊啊…小穴，变得好有感觉啊~…好棒啊…快看那里吧~………${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `「啊~…啊~…哼啊啊~…不行…俺、俺要…变得奇怪起来…了啊嗯~…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}就算羞耻地脸别过去也一直因为快感而不断地发出娇喘声………`,
          );
        } else {
          await era.printAndWait(
            `「哈呜~…啊啊啊~…更加…激烈地做吧~…啊~…啊啊嗯~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被插进去后吐出炽热的喘息，紧紧地抱住了${player_name}。`,
          );
          await era.printAndWait(
            `「更加地疼爱我吧…将我疼爱到要弄坏的程度~${heart(1)} 让我将全部事情都忘记的程度吧~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一边发出可爱的声音一边因为${player_name}的下身而喘着粗气………`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「哼…啊啊…小穴…要融化掉了…${heart(1)} 俺…已经要变得不行了~${heart(1)}」`,
            );
          }
        }
        // CFLAG:321  = 5（变量语义：CFLAG 族，321）
        kojo.正常位 = 5;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.正常位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈呜呜~嗯~…啊…怎么感觉…好像…舒服起来…了…啊嗯~」`,
        );
        await era.printAndWait(
          `${target_name}被不断地侵犯最终变得有感觉了的样子，变得娇喘连连了起来。`,
        );
        await era.printAndWait(`「哈、哈啊嗯~…俺…俺会将腿张得更开的…~！」`);
        await era.printAndWait(
          `少女将双腿张开到极限的时候、为了让${player_name}变得更加高兴而大声地娇喘了起来………`,
        );
        // CFLAG:321  = 4（变量语义：CFLAG 族，321）
        kojo.正常位 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.正常位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「嗯呜~…往…往深处塞进去也…没问题…的噢~………」`);
        await era.printAndWait(
          `往刚刚说出如此坚强话语的${target_name}的腔内深处塞进了阴茎后，${player_name}就毫不留情地开始凌辱这可怜的少女………`,
        );
        await era.printAndWait(
          `「哼~…呜~…啊啊~…嗯呜~…已、已经…再这样下去…啊呜~」`,
        );
        // CFLAG:321  = 3（变量语义：CFLAG 族，321）
        kojo.正常位 = 3;
      } else if (kojo.正常位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「啊~…唔~…进来了…小鸡鸡…啊~呀~…突然这样子啊~…啊啊~！」`,
        );
        await era.printAndWait(
          `往${target_name}的腔内深处塞进了阴茎后，${player_name}就毫不留情地开始凌辱这可怜的少女………`,
        );
        // CFLAG:321  = 2（变量语义：CFLAG 族，321）
        kojo.正常位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 21) {
    if (kojo.背后位 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        if (era.get(`talent:${target}:76`) === 1) {
          if (era_flag.assi > 0 && era_flag.assiplay) {
            await era.printAndWait(`「」`);
          } else if (era.get(`talent:${target}:314`) === 9) {
            await era.printAndWait(
              `「啊啊~${heart(1)}…大鸡巴要来啊~${heart(1)} 噢~哦哈啊~…好深啊~${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}的腰被抓住就这样被塞进了深处。破瓜的疼痛和未知的感觉让少女发出了欢喜的娇喘声。`,
            );
            await era.printAndWait(
              `「感觉到主人的魔力了呢…主人~${heart(1)}…魔王大人~${heart(1)}」`,
            );
            await era.printAndWait(
              `可能是因为紧紧贴在一起的原因，${target_name}发出了愉悦的声音、背后的翅膀突然就张开了。`,
            );
            await era.printAndWait(
              `「更加地…啪啪啪吧~…将俺当成飞机杯用吧~${heart(1)}…被魔王大人给强暴了…好棒啊~${heart(1)}」`,
            );
            await era.printAndWait(
              `少女被${player_name}抓住了腰、将立起脚尖的魔族少女的处女穴给弄得乱七八糟了………`,
            );
          } else {
            await era.printAndWait(
              `「啊哈啊啊~${heart(1)} 好深啊~…大、大鸡巴好深啊啊啊~${heart(1)}」`,
            );
            await era.printAndWait(`${target_name}非常下流地将舌头伸了出来。`);
            await era.printAndWait(
              `「啊啊~…处女小穴被欺负了~${heart(1)}…主人啊嗯~~更加用力的${heart(1)}…更加激烈地欺负吧~${heart(1)}」`,
            );
            await era.printAndWait(
              `「感觉到大鸡巴在里面不停地侵犯俺呢~${heart(1)}…好棒啊~${heart(1)}…太舒服了~…感觉要变奇怪了~${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}的腰部被抓住、如她所希望的那样被继续侵犯下去了………`,
            );
          }
        } else if (era.get(`talent:${target}:85`) === 1) {
          if (era_flag.assi > 0 && era_flag.assiplay) {
            await era.printAndWait(`「」`);
          } else if (era.get(`talent:${target}:314`) === 9) {
            await era.printAndWait(
              `${player_name}将少女的双手向后拉着的姿态下侵犯了她，${target_name}就这样发出了如同叹气一样的娇喘声。`,
            );
            await era.printAndWait(
              `「啊…哈啊啊啊…${heart(1)} 好激烈啊…魔王大人啊啊~…${heart(1)}」`,
            );
            await era.printAndWait(
              `背后的翅膀突然就张开了、每当小小的屁股被侵犯的时候尾巴就会不停地乱甩着。`,
            );
            await era.printAndWait(
              `「魔王大人的…大鸡巴里…魔力…好厉害的${heart(1)} …传进了…${heart(1)} 啊哈啊啊~${heart(1)} 俺、俺已经…变成魔王大人的东西了~${heart(1)}」`,
            );
            await era.printAndWait(
              `${player_name}那一副塞进了阴茎而喜极而泣的姿态、如同完全臣服了的魔族少女一样………`,
            );
          } else {
            await era.printAndWait(
              `「呜啊…啊啊啊…好深啊~…大鸡巴~…捅到了深处了啊~${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}大幅度地仰着腰，忍耐着破瓜的疼痛。`,
            );
            await era.printAndWait(
              `「主人啊啊~…将俺的小穴…弄坏掉吧~…弄坏掉吧~~………${heart(1)}」`,
            );
            await era.printAndWait(
              `每当小小的屁股被阴茎抽插的时候就会出现淫猥的声音。毫不留情地将腰撞上去后，${target_name}的屁股就不断地变红了起来。`,
            );
            await era.printAndWait(
              `「啊~啊啊~…已、已经不行了~…俺的小穴…要变成主人专用的了呜啊~${heart(1)}」`,
            );
          }
        } else {
          if (era_flag.assi > 0 && era_flag.assiplay) {
            await era.printAndWait('');
          } else {
            await era.printAndWait(
              `${target_name}被${player_name}向后拉着双手的情况下侵犯着。`,
            );
            await era.printAndWait(
              `「啊啊啊啊~！好、好难受啊啊~…不、不要啊啊…不要这样动起来啊啊啊~！」`,
            );
            await era.printAndWait(
              `${target_name}不成熟的蜜穴被强行扩张、无法称之为快乐的苦痛的呻吟之声响彻了周围。`,
            );
            await era.printAndWait(
              `因为这呻吟声兴奋起来的${player_name}重新将少女的小屁股抓住、毫不留情地继续凌辱着………`,
            );
          }
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「啊哈啊~…将俺就这样当成主人专用的飞机杯来用吧~${heart(1)} 弄得俺更加乱七八糟的吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的腰被抓住就这样被插到了深处、发出了欢喜的娇喘声。`,
          );
          await era.printAndWait(
            `「啊啊~…好棒啊~…主人的大鸡巴好棒~${heart(1)}…好棒啊~${heart(1)}」`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「明明这样的姿势好羞耻来的…啊~…啊哈啊啊~…好深啊~…啊~啊啊啊啊~…到深处来了~…${heart(1)}」`,
          );
          await era.printAndWait(
            `捅进了${target_name}的腔内深处后，${player_name}开始慢慢地抽插了起来。`,
          );
          await era.printAndWait(
            `「啊啊~…啊啊啊~…主人啊啊~…要翻起来了…小穴要翻出来了啊~${heart(1)}…啊啊啊~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `${target_name}被${player_name}向后拉着双手的情况下侵犯着。`,
          );
          await era.printAndWait(
            `「拜、拜托了~…再这样下去的话…原谅…俺吧…………」`,
          );
          await era.printAndWait(
            `听到哀求声而兴奋起来的${player_name}重新将少女的小屁股抓住、毫不留情地继续凌辱着………`,
          );
        }
      }
      // CFLAG:322  = 1（变量语义：CFLAG 族，322）
      kojo.背后位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊啊~…啊啊嗯~…嗯~…呜嗯~…好棒~…好舒服~…好棒啊啊~…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的屁股不断地被腰用力的撞上去而变得红肿了起来。${target_name}连这份疼痛也当成快乐来享受的样子。`,
          );
          await era.printAndWait(
            `「被侵犯的好喜欢啊~${heart(1)}…用大鸡巴来用力地啪啪啪俺吧~${heart(1)} 小穴变得黏糊糊起来了~${heart(1)}」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊啊~…已经~已经~…只能考虑大鸡巴的事情了哈呜~${heart(1)}…已经…已经不行了哈嗯嗯嗯~${heart(1)}」`,
            );
          }
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊呀~…呀~…呀啊嗯~…被从背后做的…太有感觉了呜~…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}将屁股高高地伸了出来、就这样任由${player_name}侵犯着。`,
          );
          await era.printAndWait(
            `「啊啊啊~…主人啊啊~…好棒啊啊~${heart(1)}…更加激烈地侵犯俺吧~…侵犯要坏掉的程度吧~…${heart(1)}」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊呀哈恩~…小穴要来了~${heart(1)}…要来了啊~…${heart(1)} 已、已经要变得不行了呜呜~${heart(1)}」`,
            );
          }
        } else {
          await era.printAndWait(
            `「啊哈啊~…将俺就这样当成主人专用的飞机杯来用吧${heart(1)} 将俺弄得更加乱七八糟的吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的腰被抓住就这样被插到了深处后、就发出了欢喜的娇喘声。。`,
          );
          await era.printAndWait(
            `「啊啊啊~…小穴被干着好舒服啊~~~${heart(1)}…大鸡巴进到深处了呜呜~${heart(1)}」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊啊~…小穴好棒啊~${heart(1)}…好棒的啊~…${heart(1)} 将俺弄得更加舒服起来吧~${heart(1)}」`,
            );
          }
        }
        // CFLAG:322  = 6（变量语义：CFLAG 族，322）
        kojo.背后位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.背后位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(`「从背后做好舒服啊~…主人~${heart(1)}」`);
          }
          await era.printAndWait(
            `${target_name}趴在地上、沉浸在了被从背后侵犯所带来的快感之中。`,
          );
          await era.printAndWait(
            `「嗯~…啊啊~…嗯呀~…好~…好棒啊~…主人~…俺是主人的小狗狗来的~${heart(1)}」`,
          );
          await era.printAndWait(
            `「就这样…将种子射进来吧~${heart(1)}…俺…会将主人的小宝宝生出来的~${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊嗯~…啊哈啊啊~${heart(1)}…被主人从后面…做的话…就感觉…俺变成野兽了一样~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被从背后做而兴奋起来的样子，不断地大声呻吟着。`,
          );
          await era.printAndWait(
            `「啊哈啊啊嗯~…啊啊啊嗯~${heart(1)}…俺是…主人的小狗狗来的~${heart(1)}」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊啊~…主人的大鸡巴好棒~${heart(1)}…大鸡巴最棒了啊~${heart(1)}」`,
            );
          }
        } else {
          await era.printAndWait(
            `「明明这样的姿势很羞耻来的~…啊~…啊哈啊啊~…好深啊~…啊~啊啊啊啊…插到深处来了呜嗯~…${heart(1)}」`,
          );
          await era.printAndWait(
            `插进${target_name}的腔内深处后，${player_name}慢慢地抽插起来了。`,
          );
          await era.printAndWait(
            `「啊啊~…啊啊啊~…主人啊嗯~…要翻出来了…小穴要翻起来了啊~${heart(1)}…啊啊啊~${heart(1)}」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「小…小穴…好棒啊~${heart(1)}…更加用力地侵犯俺吧~${heart(1)}…主人~${heart(1)}」`,
            );
          }
        }
        // CFLAG:322  = 5（变量语义：CFLAG 族，322）
        kojo.背后位 = 5;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}将屁股高高地抬起来、少女的蜜穴如同追求快感一样抽动着。`,
        );
        await era.printAndWait(
          `「啊~…哈啊~…嗯~♪…好棒~…这个…好棒啊~…啊~啊啊~…连、深处都…被侵犯着呐哈呜~」`,
        );
        await era.printAndWait(
          `完全屈服了的${target_name}因为被侵犯的快感而颤抖起来了、每次捅进去的时候都会发出甘甜的娇喘声………`,
        );
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「嗯~…啊~…啊啊嗯~…啊嗯~…啊嗯~…啊哼唔嗯~♪………好深…好爽~好舒服啊~${heart(1)}」`,
          );
        }
        // CFLAG:322  = 4（变量语义：CFLAG 族，322）
        kojo.背后位 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}在双手被向后拉的情况下被侵犯着。`,
        );
        await era.printAndWait(
          `「啊~啊啊啊~…嗯~…啊啊啊~…唔呜~…呜呜~………哈唔呜~」`,
        );
        await era.printAndWait(
          `可能开始习惯起被侵犯的吧，${target_name}虽然尽力的忍耐着不让自己发出声音、然而是不是还是会从嘴边漏出甜美的娇喘声………`,
        );
        // CFLAG:322  = 3（变量语义：CFLAG 族，322）
        kojo.背后位 = 3;
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `${target_name}在双手被向后拉的情况下被侵犯着。`,
        );
        await era.printAndWait(`「拜、拜托了~…再这样下去的话…原谅…俺吧…………」`);
        await era.printAndWait(
          `听到哀求声的${player_name}重新将少女的小屁股抓住、毫不留情地继续凌辱着………`,
        );
        // CFLAG:322  = 2（变量语义：CFLAG 族，322）
        kojo.背后位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 22) {
    if (kojo.对面座位 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(`「」`);
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(`「」`);
        } else {
          await era.printAndWait(`「」`);
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「啊啊啊~…主人的~…进到深处里面去了啊~~${heart(1)}…啊啊~…俺、俺要忍不住了啊~………${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的腰轻轻地前后晃动品味起快感后就整个人都因为刺激而跳了一下………`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「啊啊~…嗯哼呜…跟主人完全完美地贴在一起了~${heart(1)}…啊啊嗯~…主人啊嗯~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}就这样贴合在一起的情况下如同撒娇一样用脸颊蹭起了${player_name}………`,
          );
        } else {
          await era.printAndWait(
            `「啊啊~…进到了…深处了啊呜…啊啊~…不、不能往上捅啊啊………」`,
          );
          await era.printAndWait(
            `${player_name}将${target_name}的细腰抓住，十分粗鲁地将腰往上撞、而少女就这样一直忍耐着这份凌辱………`,
          );
        }
      }
      // CFLAG:323  = 1（变量语义：CFLAG 族，323）
      kojo.对面座位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.对面座位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊啊啊~…主人的…进到深处了啊嗯~${heart(1)}…啊啊~…俺、俺要忍不住了啊~………${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的腰轻轻地前后晃动品味起快感后就整个人都因为刺激而跳了一下………`,
          );
          await era.printAndWait(
            `「啊嗯~…哈啊~…啊啊啊啊啊…主人的大鸡巴嵌入进去了啊嗯~~…将俺的小穴干地乱七八糟的吧~${heart(1)}」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「唔呀啊~呀嗯~${heart(1)} 啊啊啊…已经记住了大鸡巴的味道了呢~…啊啊~啊啊啊嗯~${heart(1)}」`,
            );
          }
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊哈啊…主人~…亲吻…吧~…呐啊~…俺想要亲吻嘛~…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的幼小的腔内深处塞进了阴茎后，少女忍不住发出了甜美的呻吟声。`,
          );
          await era.printAndWait(
            `然后，${player_name}将少女的小屁股抓住好不留情的上下抽插后。甜美的呻吟声变成了大声的娇喘声了。`,
          );
          await era.printAndWait(
            `「哈呀啊嗯~${heart(1)}…不~不行呀啊~…这、这样子…往上捅的话突…俺、俺要坏掉了~${heart(1)}」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊哈啊啊~…大鸡巴好棒啊~${heart(1)}…将俺的小穴…干地乱起八糟的吧~${heart(1)}…啊啊~啊~啊啊啊啊~${heart(1)}」`,
            );
          }
        } else {
          await era.printAndWait(
            `「啊啊~…不要啊…快、快点动起来嘛~…俺、俺要变奇怪起来了………${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的腰被双手牢牢的抓住，完全动不了而被玩弄着。`,
          );
          await era.printAndWait(
            `「啊啊~…拜托了~…将俺的色情小穴…狠狠地侵犯了吧…侵犯了嘛~…啊~…呀哈啊嗯~${heart(1)}」`,
          );
          await era.printAndWait(
            `可能是看到少女已经到了忍耐的极限，${player_name}将${target_name}的腰抓住毫不留情的上下抽插起来了………`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「呀~…呀啊啊~…大鸡巴好棒啊~…主人的大鸡巴最棒了啊~${heart(1)} 小穴要融化掉呜~${heart(1)}」`,
            );
          }
        }
        // CFLAG:323  = 6（变量语义：CFLAG 族，323）
        kojo.对面座位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.对面座位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊啊~…嗯哼呜…跟主人完全完美地贴在一起了~${heart(1)}…啊啊嗯~…主人啊嗯~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}就这样贴合在一起的情况下如同撒娇一样用脸颊蹭起了${player_name}。`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊~…喜欢~${heart(1)}…好喜欢${heart(1)}…就这样一直合在一起嘛~…主人~…${heart(1)}」`,
            );
          }
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「主人~${heart(1)}…主人啊嗯~${heart(1)}」`);
          await era.printAndWait(
            `${player_name}将紧紧搂过来的${target_name}的腰部抓住后十分粗暴地往上抽插起来了，而少女却发出了十分欣喜的娇喘声。`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「好棒啊~…被主人…狠狠地干好棒啊~${heart(1)}」`,
            );
          }
        } else {
          await era.printAndWait(
            `「这样的姿势的话…就能不停地亲吻了我好喜欢~${heart(1)}…好喜欢啾~${heart(1)}…啾~啾呜~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}牢牢地将${player_name}的身体搂住、哪怕正在侵犯也在不停地亲吻着${player_name}。`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `${player_name}将${target_name}的腰抓住后十分粗暴的往上捅、品味着紧紧吸附住的甘甜的腔内。`,
            );
            await era.printAndWait(
              `「啊啊…被、被那么地往上抽插了的话…会、会亲不了了啊嗯…嗯~…嗯噗呜~${heart(1)}」`,
            );
          }
        }
        // CFLAG:323  = 5（变量语义：CFLAG 族，323）
        kojo.对面座位 = 5;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.对面座位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊~…嗯呜呜~…啊啊~…进到里面啊嗯…了啊嗯…」`);
        await era.printAndWait(
          `${player_name}将${target_name}的细腰抓住，十分粗鲁地将腰往上撞、而少女就这样一直忍耐着这份凌辱………`,
        );
        await era.printAndWait(
          `「啊~…哈呜呜~…嗯~………啊啊~…明明是被那么粗暴地对待来着…啊~啊啊啊~」`,
        );
        await era.printAndWait(`从少女的嘴里不断地漏出了甜美的娇喘声………`);
        // CFLAG:323  = 4（变量语义：CFLAG 族，323）
        kojo.对面座位 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.对面座位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊~…嗯呜呜~…啊啊~…进到深处了…啊呜…」`);
        await era.printAndWait(
          `${player_name}将${target_name}的细腰抓住，十分粗鲁地将腰往上撞、而少女就这样一直忍耐着这份凌辱………`,
        );
        await era.printAndWait(`「啊呀~…呀啊~…啊呜呜呜~…请、请原谅俺了吧………」`);
        // CFLAG:323  = 3（变量语义：CFLAG 族，323）
        kojo.对面座位 = 3;
      } else if (kojo.对面座位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「啊啊~…进到…深处了啊嗯…啊啊~…往、往上捅不行的啊啊啊………」`,
        );
        await era.printAndWait(
          `${player_name}将${target_name}的细腰抓住，十分粗鲁地将腰往上撞、而少女就这样一直忍耐着这份凌辱………`,
        );
        // CFLAG:323  = 2（变量语义：CFLAG 族，323）
        kojo.对面座位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 23) {
    if (kojo.背面座位 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(`「」`);
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(`「」`);
        } else {
          await era.printAndWait(`「」`);
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「嗯呀~呀啊啊嗯~${heart(1)}…将俺的小穴插到要坏掉的程度吧~…啊嗯~${heart(1)}」`,
          );
          if (era.get(`talent:${target}:110`) === 1) {
            await era.printAndWait(
              `${target_name}的巨乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`,
            );
          }
          if (era.get(`talent:${target}:114`) === 1) {
            await era.printAndWait(
              `${target_name}的爆乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`,
            );
          }
          if (era.get(`talent:${target}:119`) === 1) {
            await era.printAndWait(
              `${target_name}的超乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`,
            );
          }
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「啊啊~…哈啊啊…主人…啊啊~…更用力地…揉俺的胸部吧…${heart(1)}」`,
          );
          if (era.get(`talent:${target}:110`) === 1) {
            await era.printAndWait(
              `${target_name}的巨乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`,
            );
          }
          if (era.get(`talent:${target}:114`) === 1) {
            await era.printAndWait(
              `${target_name}的爆乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`,
            );
          }
          if (era.get(`talent:${target}:119`) === 1) {
            await era.printAndWait(
              `${target_name}的超乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`,
            );
          }
        } else {
          await era.printAndWait(
            `「啊唔~…呜呜~…啊啊啊啊~…这么从下往上捅的话…呀~…呀哈啊~…！」`,
          );
          if (era.get(`talent:${target}:110`) === 1) {
            await era.printAndWait(
              `${target_name}的巨乳从后背被揉着并且被从下捅上来而发出了苦痛的娇喘声………`,
            );
          }
          if (era.get(`talent:${target}:114`) === 1) {
            await era.printAndWait(
              `${target_name}的爆乳从后背被揉着并且被从下捅上来而发出了苦痛的娇喘声………`,
            );
          }
          if (era.get(`talent:${target}:119`) === 1) {
            await era.printAndWait(
              `${target_name}的超乳从后背被揉着并且被从下捅上来而发出了苦痛的娇喘声………`,
            );
          }
        }
      }
      // CFLAG:324  = 1（变量语义：CFLAG 族，324）
      kojo.背面座位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.背面座位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `${target_name}将双腿张开，让阴茎插到了深处。`,
          );
          await era.printAndWait(
            `「啊啊啊~…明明是如此羞耻的姿势来的~…好舒服啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}环抱住${target_name}的腰部温柔地往上抽插着。`,
          );
          await era.printAndWait(
            `「啊~啊啊啊~…更加激烈地做嘛~…俺…已经…不是被狠狠地干的话就不行了啊~${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊~啊啊~…俺的小穴…发出了噗呲噗呲的声音了呢~…${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}用手臂环抱住了${target_name}的幼小身体、慢慢地用手抚摸着胸部。`,
          );
          await era.printAndWait(
            `「啊啊~…将俺的胸部也…弄得乱起八糟的吧…${heart(1)}」`,
          );
          if (era.get(`talent:${target}:110`) === 1) {
            await era.printAndWait(
              `${target_name}的巨乳被从后面揉着、将乳头捏了一下后少女就发出了大声的娇喘声。`,
            );
          }
          if (era.get(`talent:${target}:114`) === 1) {
            await era.printAndWait(
              `${target_name}的爆乳被从后面揉着、将乳头捏了一下后少女就发出了大声的娇喘声。`,
            );
          }
          if (era.get(`talent:${target}:119`) === 1) {
            await era.printAndWait(
              `${target_name}的超乳被从后面揉着、将乳头捏了一下后少女就发出了大声的娇喘声。`,
            );
          }
          await era.printAndWait(
            `「呀啊~啊啊啊~…啊啊啊~…乳头…变得奇怪起来了~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「嗯呀~~呀啊啊嗯~${heart(1)}…将俺的小穴往上捅到要坏掉的程度吧~…啊嗯~${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}环抱住${target_name}的幼小身体，毫不留情地用腰撞上去。`,
          );
          await era.printAndWait(
            `「啊啊啊~…啊哼呜~…呀哈啊~${heart(1)}…好棒啊~…小穴好棒啊~…${heart(1)}」`,
          );
          if (era.get(`talent:${target}:110`) === 1) {
            await era.printAndWait(
              `${target_name}的巨乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`,
            );
          }
          if (era.get(`talent:${target}:114`) === 1) {
            await era.printAndWait(
              `${target_name}的爆乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`,
            );
          }
          if (era.get(`talent:${target}:119`) === 1) {
            await era.printAndWait(
              `${target_name}的超乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`,
            );
          }
        }
        // CFLAG:324  = 6（变量语义：CFLAG 族，324）
        kojo.背面座位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.背面座位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊哈啊~…俺、俺已…已经…已经…变得奇怪起来了呜~${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}环抱住${target_name}的腰慢慢地十分温柔地从上抽插起来了。`,
          );
          await era.printAndWait(
            `「啊~…啊啊~哈啊啊…被、被这么干了的话…啊~…啊啊啊啊~${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊哈啊~…哈啊啊嗯~${heart(1)}…大鸡巴好深啊~…啊~啊啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}用手臂环抱住了${target_name}的幼小身体、慢慢地用手抚摸着胸部。`,
          );
          await era.printAndWait(
            `「啊啊~…啊嗯~…哈呜呜呜~…被那么温柔的…的话…哈啊啊嗯~${heart(1)}」`,
          );
          if (era.get(`talent:${target}:110`) === 1) {
            await era.printAndWait(
              `${target_name}因为自己的巨乳被从背后温柔地抚摸而发出了甘甜的声音………`,
            );
          }
          if (era.get(`talent:${target}:114`) === 1) {
            await era.printAndWait(
              `${target_name}因为自己的爆乳被从背后温柔地抚摸而发出了甘甜的声音………`,
            );
          }
          if (era.get(`talent:${target}:119`) === 1) {
            await era.printAndWait(
              `${target_name}因为自己的超乳被从背后温柔地抚摸而发出了甘甜的声音………`,
            );
          }
        } else {
          await era.printAndWait(
            `「啊啊~…哈啊啊啊…主人…啊啊~…更加地…用俺的胸部吧~…${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}环抱住${target_name}的幼小身体，毫不留情地插了上去。`,
          );
          await era.printAndWait(
            `「哈啊~啊啊~${heart(1)}…主人的大鸡巴…进到里面去了~${heart(1)}」`,
          );
          if (era.get(`talent:${target}:110`) === 1) {
            await era.printAndWait(
              `${target_name}的巨乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`,
            );
          }
          if (era.get(`talent:${target}:114`) === 1) {
            await era.printAndWait(
              `${target_name}的爆乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`,
            );
          }
          if (era.get(`talent:${target}:119`) === 1) {
            await era.printAndWait(
              `${target_name}的超乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`,
            );
          }
        }
        // CFLAG:324  = 5（变量语义：CFLAG 族，324）
        kojo.背面座位 = 5;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.背面座位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${player_name}环抱住${target_name}的幼小身体，毫不留情地插了上去。`,
        );
        await era.printAndWait(
          `「嗯呀~…呀啊~…啊啊啊~…好奇怪啊…明明是被这么粗暴地对待来着…居然会那么舒服………！」`,
        );
        if (era.get(`talent:${target}:110`) === 1) {
          await era.printAndWait(
            `${target_name}的巨乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`,
          );
        }
        if (era.get(`talent:${target}:114`) === 1) {
          await era.printAndWait(
            `${target_name}的爆乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`,
          );
        }
        if (era.get(`talent:${target}:119`) === 1) {
          await era.printAndWait(
            `${target_name}的超乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`,
          );
        }
        // CFLAG:324  = 4（变量语义：CFLAG 族，324）
        kojo.背面座位 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.背面座位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${player_name}环抱住${target_name}的幼小身体，毫不留情地插了上去。`,
        );
        await era.printAndWait(
          `「啊~…啊啊啊~…胸部就这样被抓者的情况下…被插上来的话…啊呜呜呜~…！」`,
        );
        if (era.get(`talent:${target}:110`) === 1) {
          await era.printAndWait(
            `${target_name}的巨乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`,
          );
        }
        if (era.get(`talent:${target}:114`) === 1) {
          await era.printAndWait(
            `${target_name}的爆乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`,
          );
        }
        if (era.get(`talent:${target}:119`) === 1) {
          await era.printAndWait(
            `${target_name}的超乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`,
          );
        }
        // CFLAG:324  = 3（变量语义：CFLAG 族，324）
        kojo.背面座位 = 3;
      } else if (kojo.背面座位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「啊唔~…呜呜~…啊啊啊啊~…被这么激烈地捅上去的话…呀~…哈呀~…！」`,
        );
        if (era.get(`talent:${target}:110`) === 1) {
          await era.printAndWait(
            `${target_name}的巨乳从后背被揉着并且被从下捅上来而发出了苦痛的娇喘声………`,
          );
        }
        if (era.get(`talent:${target}:114`) === 1) {
          await era.printAndWait(
            `${target_name}的爆乳从后背被揉着并且被从下捅上来而发出了苦痛的娇喘声………`,
          );
        }
        if (era.get(`talent:${target}:119`) === 1) {
          await era.printAndWait(
            `${target_name}的超乳从后背被揉着并且被从下捅上来而发出了苦痛的娇喘声………`,
          );
        }
        // CFLAG:324  = 2（变量语义：CFLAG 族，324）
        kojo.背面座位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 26) {
    if (kojo.正常位肛交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「将俺的屁股…干得乱七八糟地吧~…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}为了品味更强烈的快感而将双腿张的大大的让${player_name}就这样侵犯着屁股………`,
          );
        } else {
          await era.printAndWait(
            `「将俺的屁股…干得乱七八糟地吧~…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}时不时很痛苦似的皱着眉头、被毫不留情的侵犯着………`,
          );
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「唔…嗯~…！ 主人啊嗯~…更加激烈地…侵犯俺的屁股吧~………${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}用她纤细的双手抱住${player_name}、享受着调教play的肛门凌辱的快感。………`,
          );
        } else {
          await era.printAndWait(
            `「唔啊啊~…唔…嗯~…！ 好、好难受啊~………${heart(1)}」`,
          );
          await era.printAndWait(
            `调教不足的肛门被毫不留情地凌辱着、${target_name}在${player_name}的身下发出了十分痛苦的呻吟声………`,
          );
        }
      } else {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(`「啊啊啊~…大、大鸡巴~…进去了…嗯呀啊嗯~…！」`);
          await era.printAndWait(
            `每当被重度开发过的肛门被阴茎来回抽插的时候、${target_name}发出了充满快感的呻吟声………`,
          );
        } else {
          await era.printAndWait(
            `「不、不要啊~…那里才…不是该进去的地方啊…唔…呀、呀啊啊啊~」`,
          );
          await era.printAndWait(
            `${target_name}的肛门被阴茎毫不留情地蹂蹑了………`,
          );
        }
      }
      // CFLAG:TARGET:327  = 1（变量语义：CFLAG 族，TARGET:327）
      kojo.正常位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:77`) === 1 &&
        (kojo.正常位肛交 <= 8 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          if (era.get(`talent:${target}:0`) === 1) {
            await era.printAndWait(
              `「俺是…主人专用肛穴奴隶来的${heart(1)} 小穴缝起来也没问题的噢~${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `「里面在被主人搅拌着呢哈啊啊~${heart(1)} 肛穴好舒服好爽啊啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}像完全沉迷于肛门性交中似的、光是被插入肛门就露出了放荡的表情。`,
          );
          await era.printAndWait(
            `「咿呓～…咿啊～…啊啊啊啊~${heart(1)} 啊～${heart(1)}啊～${heart(1)}啊啊啊啊啊啊~${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「这样～的做爱～${heart(1)} 太～棒～啦～${heart(1)}」`,
          );
          if (era.get(`talent:${target}:0`) === 1) {
            await era.printAndWait(
              `「小穴什么的已经可以不需要了～…${heart(1)} 来更多的操菊穴吧～${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `被毫不留情的侵犯肛门的${target_name}一边翻起白眼一边叫嚷起来。少女已经完全变成肛门性爱狂了。`,
          );
          await era.printAndWait(
            `「啊咿～咿～噫～～${heart(1)}…黏糊糊的～${heart(1)}…菊穴变得黏糊糊的～${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「哦哦～${heart(1)}…哦吼～${heart(1)}…菊穴被撑大了${heart(1)}主人～～主人～～${heart(1)}」`,
          );
          await era.printAndWait(
            `虽然${target_name}被毫不留情的侵犯肛门、但她的小小身体也变得更容易品味到阴茎插入的快感的样子。`,
          );
          await era.printAndWait(
            `「菊穴好爽啊～${heart(1)}…想一直被肉棒侵犯下去${heart(1)}…菊穴好爽啊～${heart(1)} 好爽～${heart(1)}」`,
          );
        }
        // CFLAG:327  = 9（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 7 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「嗯呼呜～…肛门被掀动起来了${heart(1)} 被肉棒侵犯好爽啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `被施予了大量尻穴调教的肛门、每次随着阴茎的抽插、就会令${target_name}发出充满快感的呻吟声。`,
          );
          await era.printAndWait(
            `「啊啊啊～${heart(1)} 不行了…嘻～嘻～…再这么激烈的话…已经…不行了～${heart(1)}」`,
          );
        } else {
          if (era.get(`talent:${target}:0`) === 1) {
            await era.printAndWait(
              `「虽然想快点被侵犯小穴…但是肛门感觉也很爽${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `「不对不对～…肛门…太有感觉了…不、要啊～…再这样下去的话～${heart(1)}」`,
          );
          await era.printAndWait(
            `肛门在一颤一颤地夹紧着阴茎、${player_name}更激烈的插起了肛门。`,
          );
          await era.printAndWait(
            `「啊啊～${heart(1)} 不要～不要～${heart(1)}…我、已经…已经…嘻嘻～嘻嘻～${heart(1)}」`,
          );
        }
        // CFLAG:327  = 8（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.正常位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊咕呜～…又、是这么激烈～…但是～…被主人这么努力地开发的话…感觉好开心啊～…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的还没调教完成的尻穴被尽可能地扩张开、少女忍不住皱起了眉头………`,
        );
        // CFLAG:327  = 7（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 7;
      } else if (
        era.get(`talent:${target}:77`) === 1 &&
        (kojo.正常位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          if (era.get(`talent:${target}:0`) === 1) {
            await era.printAndWait(
              `「已经…变成菊穴专用奴隶了呢～${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `「快来操吧…我的屁股～…用主人的肉棒把它搅得一塌糊涂吧～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}像完全沉迷于肛门性交中似的、光是被插入肛门就露出了放荡的表情。`,
          );
          await era.printAndWait(
            `「已、已经…只需要屁股就够了～…快来侵犯屁股吧～${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊～…啊～啊啊啊～…哈啊啊${heart(1)} 已、已经…变得奇怪了…肛交呜～${heart(1)}」`,
          );
          await era.printAndWait(
            `被毫不留情的侵犯肛门的${target_name}一边翻起白眼一边叫嚷起来。少女已经完全变成肛门性爱狂了。`,
          );
          await era.printAndWait(
            `「呀～…噫～…库咿咿～～…只要能被操屁股的话…不管怎么样都好啦～${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「咿～咿～～…啊啊～…主人～～主人～～${heart(1)}」`,
          );
          await era.printAndWait(
            `虽然${target_name}被毫不留情的侵犯肛门、但她的小小身体也变得更容易品味到阴茎插入的快感的样子。`,
          );
          await era.printAndWait(
            `「我的菊花变得黏糊糊的了呢…已经…变成肉棒专用穴了哦…${heart(1)}」`,
          );
        }
        // CFLAG:327  = 6（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          if (era.get(`talent:${target}:0`) === 1) {
            await era.printAndWait(`「我…明明是处女…屁股却这么爽${heart(1)}」`);
          }
          await era.printAndWait(
            `「啊啊啊～…我的屁股…因为被主人干所以好有感觉啊～～…${heart(1)}」`,
          );
          await era.printAndWait(
            `被施予了大量尻穴调教的肛门、每次随着阴茎的抽插、就会令${target_name}发出充满快感的呻吟声。`,
          );
          await era.printAndWait(
            `「屁股也…记住鸡鸡的味道了呢～…${heart(1)} 更多…还想尝尝更多～${heart(1)}」`,
          );
        } else {
          if (era.get(`talent:${target}:0`) === 1) {
            await era.printAndWait(
              `「啊哈哈～…明明想早点被干小穴…屁股却啊啊～${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `「不行不行～～…屁股…实在太爽了…不、要啊～…再这样辖区的话～${heart(1)}」`,
          );
          await era.printAndWait(
            `肛门在一颤一颤地夹紧着阴茎、${master_name}更激烈的插起了肛门。`,
          );
          await era.printAndWait(
            `「啊啊～${heart(1)} 不行不行不行～${heart(1)}…我、已经…已经…嘻嘻～嘻嘻～${heart(1)}」`,
          );
        }
        // CFLAG:327  = 5（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.正常位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「没、没事的…这样…完全没什么大不了的…唔～…咕呜～…啊、哈啊啊～………！」`,
        );
        await era.printAndWait(
          `${target_name}的还没调教完成的尻穴被尽可能地扩张开、${target_name}咬着牙尽量忍住痛苦的声音。`,
        );
        if (era.get(`talent:${target}:0`) === 1) {
          await era.printAndWait(`「比起屁股…更想…好好地、用小穴做呢～！」`);
        }
        // CFLAG:327  = 4（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊~…嗯~…呀嗯~…啊~…啊啊啊…要翻起来了呜~…要翻出来了啊呜呜呜~………！」`,
        );
        await era.printAndWait(
          `被施予了大量尻穴调教的肛门、每次随着阴茎的抽插、就会令${target_name}发出充满快感的呻吟声………`,
        );
        // CFLAG:327  = 3（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 3;
      } else if (kojo.正常位肛交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「唔~…啊~…呀~…拔出来…快点…拔出来啦………」`);
        await era.printAndWait(
          `${target_name}还是很紧很窄的肛门被扩张到极限、${target_name}也因此发出了苦痛的呻吟声………`,
        );
        // CFLAG:327  = 2（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 27) {
    if (kojo.背后位肛交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「明、明明是这样的姿势来的…明明被这样侵犯着肛门…但是好棒啊啊~${heart(1)}…啊哈啊~啊啊~啊啊啊啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `对经过尻穴调教变为性器的肛门的刺激令${target_name}的精神从原本纯朴的村娘向着牝犬的方向堕落着………`,
          );
        } else {
          await era.printAndWait(
            `「啊咕呜～…虽、虽然很激烈…但总觉的…主人的肉棒…热热的…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的还没调教完成的尻穴被尽可能地扩张开、${player_name}开始毫不留情的抽送起来………`,
          );
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊呀嗯嗯～${heart(1)}…啊啊啊~…从后面…被侵犯屁股了～～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的已调教完毕的肛门颤抖着被${player_name}一次次插入深处、${player_name}一边看着小屁股的颤抖一边不停地抽插着。`,
          );
        } else {
          await era.printAndWait(
            `「啊呜～…呜、从后面…啊啊～、那、那里是～…额！」`,
          );
          await era.printAndWait(
            `摁住${target_name}的娇小体躯、毫不留情地从后面贯穿了未熟的肛门………`,
          );
        }
      } else {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊～…啊呜呜～…被掀起来了…我的…屁股…屁股啊～………」`,
          );
          await era.printAndWait(
            `${player_name}抓住${target_name}的小屁股、毫不留情地对调教完毕的肛门展开了陵辱………`,
          );
        } else {
          await era.printAndWait(
            `「啊~…啊啊啊~…不~…不要啊…这样的…啊啊啊啊~！」`,
          );
          await era.printAndWait(
            `${target_name}的肛门被阴茎毫不留情地蹂蹑了………`,
          );
        }
      }
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328）
      kojo.背后位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:77`) === 1 &&
        (kojo.背后位肛交 <= 8 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          if (era.get(`talent:${target}:0`) === 1) {
            await era.printAndWait(
              `「对成为菊穴专用奴隶的我来说…小穴什么的…已经没必要了～${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `「啊～咿～～${heart(1)}…嘻～嘻嘻…来啦～…我已经…只要有菊穴就好了～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}好像已经完全成为了尻穴狂的样子、只是轻轻摩擦肛门就会变成牝犬似的。`,
          );
          await era.printAndWait(
            `「啊啊啊～…菊穴…变得黏糊糊的了…啊啊啊啊～…好想被中出～～…好想被中出啊～～${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「诶嘿嘿～${heart(1)}…啊啊～…啊呀啊啊…菊穴性交…要融化了…我、我…要融化了～…${heart(1)}」`,
          );
          if (era.get(`talent:${target}:0`) === 1) {
            await era.printAndWait(
              `「已经不需要小穴了～…${heart(1)} 更多的搅动我的菊穴吧～${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `被毫不留情的侵犯肛门的${target_name}、通过肛门的快感已经达到了高潮的样子。`,
          );
          await era.printAndWait(
            `「啊～啊啊～…主人～…真棒啊～${heart(1)}…更多地插菊穴吧～${heart(3)}」`,
          );
        } else {
          await era.printAndWait(
            `「哦哦～${heart(1)}…哦吼～${heart(1)}…菊穴强暴真是最棒了～${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}一边抓住小屁股一边毫不留情的侵犯起了${target_name}的肛门、就好像玩弄玩具似的。`,
          );
          await era.printAndWait(
            `「啊啊啊啊～…不要不要不要～${heart(1)}…我…又、又…高潮…又高潮了～…要变成笨蛋了～${heart(1)}」`,
          );
        }
        // CFLAG:328  = 9（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 7 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊啊～被看到了～${heart(1)}…肛门…被抽插的地方正在被看着～${heart(1)}」`,
          );
          await era.printAndWait(
            `通过尻穴调教已经成为性器的${target_name}的肛门、每当被阴茎抽送就会很明显地感到会收缩起来。`,
          );
          await era.printAndWait(
            `「啊啊啊～${heart(1)} 被、被这样弄下去的话～…我、我…已、经～${heart(1)}」`,
          );
        } else {
          if (era.get(`talent:${target}:0`) === 1) {
            await era.printAndWait(
              `「啊啊啊～…要、要这样…侵犯小穴吗～…${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `一抓住${target_name}的小屁股${player_name}就毫不留情的动起腰开始侵犯起了肛门。`,
          );
          await era.printAndWait(
            `「啊呓咿～…只、只有屁股…只有屁股也好棒～～${heart(1)}」`,
          );
          await era.printAndWait(
            `对经由尻穴调教变成性器的肛门的刺激令${target_name}的精神从原本纯朴的村娘往牝犬堕落了。`,
          );
          await era.printAndWait(
            `「咿咿咿咿～${heart(1)}…咿咿咿咿噫～${heart(1)}…噫啊啊～啊啊～啊啊啊～${heart(1)}…啊哈啊啊啊啊～${heart(1)}」`,
          );
        }
        // CFLAG:328  = 8（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.背后位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊咕呜～…好、激烈、但是…总觉的…主人的肉棒…热乎乎的…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的还没调教完成的尻穴被尽可能地扩张开、${player_name}开始毫不留情的抽送起来………`,
        );
        // CFLAG:328  = 7（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 7;
      } else if (
        era.get(`talent:${target}:77`) === 1 &&
        (kojo.背后位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          if (
            era.get(`talent:${target}:85`) === 1 &&
            era.get(`talent:${target}:0`) === 1
          ) {
            await era.printAndWait(
              `「啊～啊哈啊～…已、已经…只要有屁股就好了～…变成菊穴专用奴隶了～${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `「啊咿呓～${heart(1)} 屁股～屁股～！…啊啊啊～…已、已经…心神俱醉了～～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}像已经完全沉迷于肛门性交中似的样子、垂直分开的肛门不像话地张开并包住了${player_name}的阴茎。`,
          );
          await era.printAndWait(
            `「啊啊啊嗯～…啊～啊啊～…啊啊啊啊嗯～${heart(1)}…像要让屁股怀孕般地射精吧～${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊～…咕～…呜呼～…呜呜～…咕呜～…噫～咿呓～…${heart(1)}」`,
          );
          await era.printAndWait(
            `被毫不留情的侵犯肛门的${target_name}正脸朝下趴着、一边努力地抬起小屁股一边呻吟着。`,
          );
          await era.printAndWait(
            `「啊啊啊～…我、已经…为了能被侵犯屁股…不管什么事都会去做了…主人啊啊啊～${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「嗯呼呜呜呜～…啊呜～…呜～…啊啊啊啊～…我的屁股～…变成主人的飞机杯了～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}紧缩起来的肛门、已经变得不管被什么东西插入都会产生快感了吧。`,
          );
          await era.printAndWait(
            `「啊咿～…咿～噫咿咿咿～…我的…菊、菊穴…能被肉棒插进来真是太感谢了～～${heart(1)}」`,
          );
          if (
            era.get(`talent:${target}:85`) === 1 &&
            era.get(`talent:${target}:0`) === 1
          ) {
            await era.printAndWait(
              `「啊～啊哈啊～…已、已经…只要有屁股就够了～…变成菊穴专用奴隶了～${heart(1)}」`,
            );
          }
        }
        // CFLAG:328  = 6（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          if (era.get(`talent:${target}:0`) === 1) {
            await era.printAndWait(
              `「啊啊啊～…真是的…我的处女…快点夺走吧～～～………${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `「咿～噫咿～…用屁股好有感觉啊～…主人的鸡鸡…感觉到了～${heart(1)}」`,
          );
          await era.printAndWait(
            `在后背位下可以很明显的观察到经受了多次尻穴调教后的肛门紧缩了起来、${player_name}一边舔着嘴唇。`,
          );
          await era.printAndWait(
            `「啊啊～…主人的鸡鸡…真棒～…啊～啊哈啊～啊～啊呜呜嗯～${heart(1)}」`,
          );
        } else {
          if (era.get(`talent:${target}:0`) === 1) {
            await era.printAndWait(
              `「呐、呐～…好好地抱我嘛～…用主人的拿东西夺走我的处女嘛～………」`,
            );
          }
          await era.printAndWait(
            `「呃！噫咿～～…咿～呓～…啊啊啊～…屁股…有感觉了…好有感觉哦～………${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的肛门每当被${player_name}用阴茎连根插入便会一颤一颤的、小屁股的震动尽收眼底并不断地继续抽插着。`,
          );
          await era.printAndWait(
            `「啊呀～${heart(1)}…咿～呓～${heart(1)}…我、我的…屁股、屁股要变得奇怪了～${heart(1)}」`,
          );
        }
        // CFLAG:328  = 5（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.背后位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊～…啊～…哈啊…主、主人～${heart(1)}…再温柔点～…啊～啊啊～……！」`,
        );
        await era.printAndWait(
          `${target_name}的还没调教完成的尻穴被尽可能地扩张开、${player_name}的阴茎被紧紧收缩起来的肛门刺激的很舒服………`,
        );
        if (era.get(`talent:${target}:0`) === 1) {
          await era.printAndWait(
            `「呐、呐～…不要光是屁股…把我的处女也…早点夺走吧～…${heart(1)}」`,
          );
        }
        // CFLAG:328  = 4（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊～…啊啊啊～…哈～…啊咕呜～…我…明明不是狗～！」`,
        );
        await era.printAndWait(
          `抓住并侵犯着${target_name}的小屁股、可以很明显地发现肛门收缩起来了。`,
        );
        await era.printAndWait(
          `「啊～…啊呜呜～…收缩起来了…我的…屁股…变得奇怪了………」`,
        );
        // CFLAG:328  = 3（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 3;
      } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊~…啊啊啊~…不~…不要啊…这样的…啊啊啊~！」`);
        await era.printAndWait(`${target_name}的肛门被阴茎毫不留情地蹂蹑了………`);
        // CFLAG:328  = 2（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 28) {
    if (kojo.对面座位肛交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「主人啊啊~…屁、屁股…好深啊~…啊啊~${heart(1)}更加激烈地…做吧~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的被调教过扩张过的尻穴十分容易就将${player_name}的阴茎给吞进去了、少女的肛门慢慢地变成了愉悦的性用品了………`,
          );
        } else {
          await era.printAndWait(
            `「啊~…啊嗯~…啊、啊啊…俺、俺会…好好地动起来的啦…啊嗯~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一脸淫荡的表情有点生疏的前后动起了腰………`,
          );
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊~啊呜呜~…屁股被扩张了呜…主人的大鸡巴全部都进去了啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被开发过的肛门十分容易地就接受了${player_name}的阴茎。少女的表情不断地变得荡漾起来了………`,
          );
        } else {
          await era.printAndWait(
            `「啊啊~…主人~…啊~啊啊~…大鸡巴…全部进去了呀~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}抱住${player_name}将忍耐已久的阴茎撑开肛门慢慢地埋了进去………`,
          );
        }
      } else {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(`「啊~…嗯呀~…哈~…拔出来…啊啊~啊啊啊~！」`);
          await era.printAndWait(
            `${target_name}被开发过的肛门十分容易地就接受了${player_name}的阴茎………`,
          );
        } else {
          await era.printAndWait(
            `「啊~啊啊啊~…那、那里是…屁股来的…啊~…啊啊啊啊~！」`,
          );
          await era.printAndWait(
            `${target_name}的肛门被${player_name}的阴茎毫不留情地蹂蹑了………`,
          );
        }
      }
      // CFLAG:TARGET:329  = 1（变量语义：CFLAG 族，TARGET:329）
      kojo.对面座位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:77`) === 1 &&
        (kojo.对面座位肛交 <= 8 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          if (era.get(`talent:${target}:0`) === 1) {
            await era.printAndWait(
              `「请、请更多地…侵犯菊穴吧～${heart(1)}…小穴什么的已经无所谓啦～${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `「啊啊～啊咿～～…嗯咿～～…主人～${heart(1)}…我、我…咿咿噫～、被、插得不行了～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的淫乱肛门完全变成了性器、每被从下往上插${target_name}就感到如痴如醉。`,
          );
          await era.printAndWait(
            `「啊啊～…煮～仁～…煮～仁～${heart(1)}…我、我…又、又要去了呃呃呃～～${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「太棒了～～${heart(1)} …主人的肉棒${heart(1)} …在搅动菊穴～${heart(1)}」`,
          );
          if (era.get(`talent:${target}:0`) === 1) {
            await era.printAndWait(
              `「小穴什么的已经无所谓啦～${heart(1)} 一直肛交下去吧～${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `${target_name}每当肛门被插、被搅动、被侵犯。她的全身就会因为暴力般的刺激而感到快乐。`,
          );
          await era.printAndWait(
            `「啊呀呀～…菊穴真爽～${heart(1)}…菊穴真爽～${heart(1)}…真爽～${heart(1)}…真爽～${heart(1)}…真爽～${heart(3)}」`,
          );
        } else {
          await era.printAndWait(
            `「呀哈啊～${heart(1)}…啊啊～${heart(1)}…屁、屁股要化了…已、已经…已经…${heart(1)}」`,
          );
          await era.printAndWait(
            `每当肛门被插${target_name}就会紧紧抱住${player_name}、不断地发出娇喘声。`,
          );
          await era.printAndWait(
            `「啊啊哈啊啊…又、又…又要不行了～…菊穴要融化了…要变不回去了～${heart(1)}」`,
          );
        }
        // CFLAG:329  = 9（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 7 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          if (era.get(`talent:${target}:0`) === 1) {
            await era.printAndWait(
              `「啊呜呜～…呐、呐～…为什么只是对屁股…啊啊啊～${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `${target_name}的肛门一被阴茎连根插入、便向将其从少女变成大人的${player_name}撒起娇来。`,
          );
          await era.printAndWait(
            `「啊咿～啊啊啊…主人…屁股…好棒…好棒哦…${heart(1)} 嗯啾嗯啾呜…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}纠缠不休的与${player_name}不断接吻的同时、自己前后动起了腰贪求着快乐。`,
          );
          await era.printAndWait(
            `「嗯啾～…啾～…啾${heart(1)}…就这样…射精吧～…在我的屁股里…射精吧～${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `一抓住${target_name}的腰${player_name}就用阴茎插进肛门开始侵犯起来。`,
          );
          await era.printAndWait(
            `「啊～啊啊啊～…主人啊啊…屁、屁股…继续…操～${heart(1)}」`,
          );
          await era.printAndWait(
            `经由尻穴调教被扩张开的肛门轻松地吞下了${player_name}的阴茎、菊穴变成了快乐的坩埚。`,
          );
          await era.printAndWait(
            `「啊呜呜呜…屁股好爽～…好爽～${heart(1)} 被干得好爽～${heart(1)}」`,
          );
        }
        // CFLAG:329  = 8（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.对面座位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊～…啊嗯～…啊、啊啊…我、我…有好好地动腰…了啊啊～${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}一脸陶醉地前后晃着腰。`);
        await era.printAndWait(
          `「啊啊～…好、好激烈…嗯啊～…啊～…啊呜呜～${heart(1)}」`,
        );
        // CFLAG:329  = 7（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 7;
      } else if (
        era.get(`talent:${target}:77`) === 1 &&
        (kojo.对面座位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「嗯啊呜呜～…菊穴好爽啊～～${heart(1)}…光用屁股就高潮了～${heart(1)} 高潮了～～～${heart(3)}」`,
          );
          await era.printAndWait(
            `${target_name}的肛门很轻易地吞下了${player_name}的阴茎、只是品尝这一快乐就变得神情荡漾。`,
          );
          await era.printAndWait(
            `「再来～…侵犯我的菊穴吧～…被主人的大肉棒侵犯实在是太棒了～～${heart(1)}」`,
          );
          if (
            era.get(`talent:${target}:85`) === 1 &&
            era.get(`talent:${target}:0`) === 1
          ) {
            await era.printAndWait(
              `「已、已经…小穴什么的已经随便怎样都好了…只要…菊穴…舒服…${heart(1)}」`,
            );
          }
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊呜～…嗯～…呼呜～…啊啊…主人～…喜欢…喜欢…菊穴做爱好喜欢～…${heart(1)}」`,
          );
          await era.printAndWait(
            `被毫不留情的侵犯肛门的${target_name}抱住${player_name}品味着肛门的快乐。`,
          );
          await era.printAndWait(
            `「还要…更多…再激烈点也可以哦～…狠狠地把菊穴弄坏吧～～${heart(3)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊…啊…嘿啊啊啊啊啊…要融化了…下半身要融化了～～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的肛门经过多次调教完全成为了性器、即使粗暴地对待也会发出愉悦的呻吟。`,
          );
          await era.printAndWait(
            `「啊哈啊～…啊～啊呜呜～…主人～${heart(1)} 主人～${heart(1)} 主人啊啊啊～${heart(3)}」`,
          );
          if (
            era.get(`talent:${target}:85`) === 1 &&
            era.get(`talent:${target}:0`) === 1
          ) {
            await era.printAndWait(
              `「啊～啊哈啊～…我、已经…不会再说任性的话了…变成菊穴专用奴隶了～～${heart(1)}」`,
            );
          }
        }
        // CFLAG:329  = 6（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          if (era.get(`talent:${target}:0`) === 1) {
            await era.printAndWait(
              `「啊呜～真是的…再这样下去只有屁股才会有感觉呜～快点夺走处女吧～${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `「啊～啊呜呜～…屁股被撑开了…感觉到被主人的鸡鸡全部插进了～～…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}紧紧抱住${player_name}、每当肛门被插便会发出呻吟声。`,
          );
          await era.printAndWait(
            `「啊哈啊～…啊啊～…啊啊～哈啊啊～…已、已经不行了…饶了我吧…主人～${heart(1)}」`,
          );
        } else {
          if (era.get(`talent:${target}:0`) === 1) {
            await era.printAndWait(
              `「就这、这样抱我嘛…用主人的东西夺走我的处女吧～………」`,
            );
          }
          await era.printAndWait(
            `「呀咿～…咿～咿～…啊啊啊～…屁股…好有感觉～…好有感觉哦～………${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}抓住腰不断地蹂躙着肛门、看着发出可爱悲鸣的${target_name}、${player_name}舔了舔嘴唇。`,
          );
          await era.printAndWait(
            `「啊呀～${heart(1)}…咕咿～${heart(1)}…屁、屁股…缩起来了缩起来了…啊呜呜呜${heart(1)}」`,
          );
        }
        // CFLAG:329  = 5（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.对面座位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊~…主人啊~…啊~啊啊~…大鸡巴…全部进来啦~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}紧紧地抱住${player_name}忍耐的同时，${player_name}缓慢地将阴茎塞了进去。`,
        );
        await era.printAndWait(
          `「啊啊…不、不行~…再、再这样捅下去的话…要…要坏掉了~…！」`,
        );
        if (era.get(`talent:${target}:0`) === 1) {
          await era.printAndWait(
            `「啊~啊啊啊…只欺负屁股什么的…啊嗯~…啊啊啊~${heart(1)}」`,
          );
        }
        // CFLAG:329  = 4（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊~…嗯呀~…再、再这样下去的话…全部进去了…啊~啊啊呜呜~」`,
        );
        await era.printAndWait(
          `${target_name}被开发过的肛门十分容易地就接受了${player_name}的阴茎、少女的腰在不知不觉中晃动了起来。`,
        );
        await era.printAndWait(`「啊啊啊啊~…腰、腰自…自己就…动起来了呜呜~」`);
        // CFLAG:329  = 3（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 3;
      } else if (kojo.对面座位肛交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊~啊啊~啊~…屁~屁股…不要啊啊啊~！」`);
        await era.printAndWait(`${target_name}的肛门被阴茎毫不留情地蹂蹑了………`);
        // CFLAG:329  = 2（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 29) {
    if (kojo.背面座位肛交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `${target_name}被从后面抱着，饱经开发的肛穴被鸡巴插入时、口中漏出了甜媚的喘息。`,
          );
          await era.printAndWait(
            `「啊咿~…噫…深深的好爽${heart(1)}…主人的大鸡巴${heart(1)}…全部品尝到了啊~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊~…深深的好舒服…哦哦~啊${heart(1)} 俺的${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}抱着${target_name}从她身后插入了肛门………`,
          );
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「主、主人啊…这、这个姿势什么的好羞人…啊啊啊~呀嗯~咿${heart(1)}…啊啊啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}开发过的肛门被鸡巴强行侵入、插进了一半${target_name}就变得老实了起来。`,
          );
          await era.printAndWait(
            `${player_name}温柔的揉胸引起了一声声甜美的呼唤。${target_name}一次又一次的收缩着直肠催促他射精。`,
          );
          await era.printAndWait(`「啊啊~…啊咿~…咦…好棒…好棒呢…${heart(1)}」`);
        } else {
          await era.printAndWait(
            `「啊啊啊~…呼…插太深了插太深了啦…鸡、鸡巴这不是全部插进来了嘛${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}温柔的从后面抱起${target_name}慢慢地插入了她的肛门………`,
          );
        }
      } else {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊咕…嗯呀…全、全部进来了…啊啊~…啊咿~噫嗯~…去了~♪」`,
          );
          await era.printAndWait(
            `${target_name}开发过的直肠开心的绞紧了${player_name}插进来的肉棒………`,
          );
        } else {
          await era.printAndWait(
            `「把、把脚掰那么开的话…啊~！啊、啊咕呜…好、深…不、不行啦…」`,
          );
          await era.printAndWait(
            `${target_name}的肛门被${player_name}的鸡巴无情的蹂躏着………`,
          );
        }
      }
      // CFLAG:TARGET:330  = 1（变量语义：CFLAG 族，TARGET:330）
      kojo.背面座位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:77`) === 1 &&
        (kojo.背面座位肛交 <= 8 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          if (era.get(`talent:${target}:0`) === 1) {
            await era.printAndWait(
              `「真、真是的…肛穴这样被干的话${heart(1)}…小穴什么根本不需要啦${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `「啊啊~…好棒…好舒服…大肉帮最喜欢了${heart(1)}…喜欢${heart(1)}肉棒大爱${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的肛门已经完全成为性器了、只是从下面插进来的程度就让快乐在少女脑中回荡了起来。`,
          );
          await era.printAndWait(
            `「脑、脑袋要变得奇怪了${heart(1)}…除了小肛穴以外的事情怎么样都好啦${heart(1)}…大鸡巴…啊啊啊~啊呜~…啊啊啊啊啊${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊~…啊哈啊~…肛穴被干着${heart(1)}…被侵犯着有感觉了${heart(1)}」`,
          );
          if (era.get(`talent:${target}:0`) === 1) {
            await era.printAndWait(
              `「小穴什么的已经不需要啦${heart(1)} 一直、一直做肛穴SEX就咿咿咿${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `${target_name}左右晃动着她的小屁股的同时将${player_name}的阴茎用肛门全部吞进去了后，少女露出了一脸荡漾的表情。`,
          );
          await era.printAndWait(
            `「啊嘿呀啊~…大鸡巴…最棒了呀${heart(1)} 更多…更多插进来…射出好多好多吧${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊啊、啊呀啊嗯~…干、干坏掉吧…俺的肛穴开始…全部…全部干到坏掉吧${heart(1)}」`,
          );
          if (era.get(`talent:${target}:110`) === 1) {
            await era.printAndWait(
              `从${target_name}身后像榨乳一样用力揉搓着那对巨乳，少女口中不禁漏出了激烈的喘息声。`,
            );
          }
          if (era.get(`talent:${target}:114`) === 1) {
            await era.printAndWait(
              `从${target_name}身后像榨乳一样用力揉搓着那对爆乳，少女口中不禁漏出了激烈的喘息声。`,
            );
          }
          await era.printAndWait(
            `「奶子…再欺负俺的奶子…扭、扭断了也没关系${heart(1)}…啊啊~…啊哈啊啊~…啊呜呜呜${heart(1)}」`,
          );
          await era.printAndWait(
            `胸部被抓着肛门再次被侵犯的${target_name}发出了狂乱的娇喘。`,
          );
          await era.printAndWait(
            `「啊唏呀啊嗯~…超赞…哦哦…啊哈啊啊…肛穴里面已经变得黏糊糊的了${heart(1)}…好想要精液呢${heart(1)}」`,
          );
        }
        // CFLAG:330  = 9（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 7 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          if (era.get(`talent:${target}:0`) === 1) {
            await era.printAndWait(
              `「啊呜呜…屁股那边很好是没错…小、小穴那边也……啊~！？…咿呀啊啊~${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `${player_name}抱着${target_name}从她身后插入了肛门。`,
          );
          await era.printAndWait(
            `「啊啊~…这么深好棒…哦哦啊啊~${heart(1)} 人家的肛门都被撑大了${heart(1)}」`,
          );
          if (era.get(`talent:${target}:110`) === 1) {
            await era.printAndWait(
              `从${target_name}身后像榨乳一样用力揉搓着那对巨乳，少女口中不禁漏出了激烈的喘息声。`,
            );
          }
          if (era.get(`talent:${target}:114`) === 1) {
            await era.printAndWait(
              `从${target_name}身后像榨乳一样用力揉搓着那对爆乳，少女口中不禁漏出了激烈的喘息声。`,
            );
          }
          await era.printAndWait(
            `「啊啊啊嗯~…好棒${heart(1)}…好棒啊${heart(1)}…俺…已、已经…啊啊啊嗯~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「主人大人${heart(1)}…喜欢~喜欢${heart(1)}…肛门sex最喜欢了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一边甜甜的叫着一边在${player_name}的腰上狂乱的舞蹈着。`,
          );
          if (era.get(`talent:${target}:110`) === 1) {
            await era.printAndWait(
              `从${target_name}身后像榨乳一样用力揉搓着那对巨乳，少女口中不禁漏出了甘甜的喘息声。`,
            );
          }
          if (era.get(`talent:${target}:114`) === 1) {
            await era.printAndWait(
              `从${target_name}身后像榨乳一样用力揉搓着那对爆乳，少女口中不禁漏出了甘甜的喘息声。`,
            );
          }
          await era.printAndWait(
            `「胸部被揉着的话…哈呜呜…啊~…啊呜呜呜嗯~…啊呀啊…已、已经…要不行了…${heart(1)}」`,
          );
        }
        // CFLAG:330  = 8（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.背面座位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (era.get(`talent:${target}:0`) === 1) {
          await era.printAndWait(
            `「啊呜呜…屁股那边很好是没错…小、小穴那边也……啊~！？…咿呀啊啊~${heart(1)}」`,
          );
        }
        await era.printAndWait(
          `「啊啊~…这么深好棒…哦哦啊啊~${heart(1)} 人家的肛门都被撑大了${heart(1)}」`,
        );
        await era.printAndWait(
          `${player_name}抱着${target_name}从她身后插入了肛门………`,
        );
        if (era.get(`talent:${target}:110`) === 1) {
          await era.printAndWait(
            `然后从${target_name}身后像榨乳一样用力揉搓着那对巨乳，少女口中不禁漏出了激烈的喘息声………`,
          );
        }
        if (era.get(`talent:${target}:114`) === 1) {
          await era.printAndWait(
            `然后从${target_name}身后像榨乳一样用力揉搓着那对爆乳，少女口中不禁漏出了激烈的喘息声………`,
          );
        }
        // CFLAG:330  = 7（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 7;
      } else if (
        era.get(`talent:${target}:77`) === 1 &&
        (kojo.背面座位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊啊~…哈呜呜~…肉棒全部进来了${heart(1)}…俺的肛穴里面…全部进来了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}左右晃动着她的小屁股的同时将${player_name}的阴茎用肛门全部吞进去了后，少女露出了一脸荡漾的表情。`,
          );
          await era.printAndWait(
            `「啊哈啊～${heart(1)}…好爽…好爽…肛穴sex稀饭（喜欢）${heart(1)}…坠稀饭惹（最喜欢了）${heart(3)}」`,
          );
          if (
            era.get(`talent:${target}:85`) === 1 &&
            era.get(`talent:${target}:0`) === 1
          ) {
            await era.printAndWait(
              `「再、再来…永远永远…干俺的肛穴啊…${heart(1)}」`,
            );
          }
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊哈啊啊啊~…好深${heart(1)} 大鸡巴全部进来了${heart(1)}」`,
          );
          await era.printAndWait(
            `直肠被无情的侵犯着的${target_name}感受着肛门的抽插，发出一声声愉悦的喊叫。`,
          );
          await era.printAndWait(
            `「再来…再来${heart(1)}…更激烈的…请把俺的肛门插坏吧${heart(3)}」`,
          );
          if (era.get(`talent:${target}:110`) === 1) {
            await era.printAndWait(
              `从${target_name}身后像榨乳一样用力揉搓着那对巨乳，少女口中不禁漏出了甘甜的叫喊声………`,
            );
          }
          if (era.get(`talent:${target}:114`) === 1) {
            await era.printAndWait(
              `从${target_name}身后像榨乳一样用力揉搓着那对爆乳，少女口中不禁漏出了甘甜的叫喊声………`,
            );
          }
        } else {
          await era.printAndWait(`「软掉了…俺的腰…已经软掉了${heart(1)}」`);
          await era.printAndWait(
            `${target_name}如同性器一样的肛门紧紧的绞紧${player_name}的阴茎，一下下催促着射精。。`,
          );
          await era.printAndWait(
            `「嗯噫…咿…啊噫…就这样射出来${heart(1)}…让俺的肛穴染上精液的味道吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}翻着白眼吐出零落的淫语、好像坏掉一样舞动着腰肢………`,
          );
          if (
            era.get(`talent:${target}:85`) === 1 &&
            era.get(`talent:${target}:0`) === 1
          ) {
            await era.printAndWait(
              `「啊啊~…哈咕呜嗯~…小、小穴什么的缝起来就好了${heart(1)}…一、一生都处女肛穴奴隶也不错咿咿呀${heart(1)}」`,
            );
          }
        }
        // CFLAG:330  = 6（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `${player_name}从${target_name}插着肛门，同时刺激着她的阴蒂。`,
          );
          if (era.get(`talent:${target}:0`) === 1) {
            await era.printAndWait(
              `「啊呜~真是的…这个样子呀…手、手指也好…把处女拿去嘛…啊哈啊～${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `「啊~啊呜呜~…嗯~…嗯咕呜…这、这么温柔的话…啊~啊啊啊嗯~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}发出了甜美的叫声、肛门继续被侵犯着。`,
          );
          await era.printAndWait(
            `「啊~…啊呜~…啊啊啊啊…屁股没力气了…已、已经…不、不行啦…${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊~…啊~…啊哈啊～${heart(1)}…主人…喜欢…喜欢${heart(1)}」`,
          );
          if (era.get(`talent:${target}:110`) === 1) {
            await era.printAndWait(
              `从${target_name}身后像榨乳一样用力揉搓着那对巨乳，少女口中不禁漏出了甘甜的喘息声。`,
            );
          }
          if (era.get(`talent:${target}:114`) === 1) {
            await era.printAndWait(
              `从${target_name}身后像榨乳一样用力揉搓着那对爆乳，少女口中不禁漏出了甘甜的喘息声。`,
            );
          }
          await era.printAndWait(
            `「啊呼呜…胸、胸部被揉着的话…要、要去了呀…啊~${heart(1)} 哦噢！嗯~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}发出了甜美的叫声在${player_name}的腰上撒着娇。`,
          );
          await era.printAndWait(
            `「嗯呀~…啊啊啊啊…啊哈~${heart(1)}…啊~啊啊啊~${heart(1)}…哈~…哈咿咿${heart(1)}…好…好舒服${heart(1)}」`,
          );
        }
        // CFLAG:330  = 5（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.背面座位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (era.get(`talent:${target}:0`) === 1) {
          await era.printAndWait(
            `「啊~啊啊啊…这样…只欺负屁股的话…嗯~…啊啊啊~${heart(1)}」`,
          );
        }
        await era.printAndWait(
          `「主人…稍微…温柔一些…啊~…啊哈啊～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被${player_name}从后面抱着，火热的肉棒在肛门里搅动。`,
        );
        if (era.get(`talent:${target}:110`) === 1) {
          await era.printAndWait(
            `${target_name}的巨乳被从身后温柔的抚摸着，发出了甜润的喘息声。`,
          );
        }
        if (era.get(`talent:${target}:114`) === 1) {
          await era.printAndWait(
            `${target_name}的爆乳被从身后温柔的抚摸着，发出了甜润的喘息声。`,
          );
        }
        await era.printAndWait(
          `「啊啊…哈啊~…啊啊~…再、再…再继续的话哈啊………${heart(1)}」`,
        );
        // CFLAG:330  = 4（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊咕…嗯呀…全、全部进来了呢…啊啊~…啊咿~咦嗯~…去了~♪」`,
        );
        await era.printAndWait(
          `${target_name}开发后的肛门轻松地吞入了${player_name}的阴茎，并一下下的吞吐着。`,
        );
        if (era.get(`talent:${target}:110`) === 1) {
          await era.printAndWait(
            `${target_name}的巨乳被从身后温柔的抚摸着，突然发出了煽情的叫声。`,
          );
        }
        if (era.get(`talent:${target}:114`) === 1) {
          await era.printAndWait(
            `${target_name}的爆乳被从身后温柔的抚摸着，突然发出了煽情的叫声。`,
          );
        }
        await era.printAndWait(
          `「啊噫~…胸、胸部这样子被摸的话…啊~啊啊啊~………」`,
        );
        // CFLAG:330  = 3（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 3;
      } else if (kojo.背面座位肛交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊、啊咕~…好、深…不、不要…」`);
        await era.printAndWait(
          `${target_name}的肛门被${player_name}的阴茎无情的蹂躏着………`,
        );
        // CFLAG:330  = 2（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 30) {
    if (kojo.手淫 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「大鸡巴…啊啊…好烫啊…居然那么硬…${heart(1)}」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「大鸡巴好热啊~…这个就是要进到我身体里面的东西来的呀…${heart(1)}」`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「这、这样子做的话…会、会不会舒服的啊…如、如果舒服的话要说出来噢？」`,
        );
      } else {
        await era.printAndWait(`「呜呜…这样的…不要啊…啊啊…感觉好恶心啊………」`);
      }
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331）
      kojo.手淫 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「主人的大鸡巴…好烫好大呀~…用俺的手变得更加舒服起来吧~…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}将鼻尖伸向阴茎不断地闻着阴茎的味道、慢慢的鼻息变得慌乱起来了。`,
          );
          await era.printAndWait(
            `「啊~啊啊啊~…好有味道…好H的味道啊…俺、俺的…脑子要融化掉了~…${heart(1)}」`,
          );
          if (era.get(`abl:${target}:32`) >= 3) {
            await era.printAndWait(
              `「就这样…射出精液的话…俺…就要去了噢~…只是被射了精液而已俺就要去了噢~${heart(1)}」`,
            );
          }
        } else {
          await era.printAndWait(
            `「哈啊…哈啊…大鸡巴~${heart(1)}…大鸡巴~${heart(1)}…只是触摸一下而已…俺就要去了~${heart(1)}」`,
          );
          await era.printAndWait(
            `少女所说的话看起来并不是谎言、${target_name}在用手给阴茎爱抚的同时、不断地摩擦着自己的大腿内侧。`,
          );
          await era.printAndWait(
            `「俺想要主人的大鸡巴在俺的手中射出来啊${heart(1)}…接着…俺也会去了的啦~${heart(1)}…啊~啊啊…${heart(1)}」`,
          );
          if (era.get(`abl:${target}:32`) >= 3) {
            await era.printAndWait(
              `「好想要精液…主人的精液~…好想让精液就这样直接射到俺的脸上啊${heart(1)}」`,
            );
          }
        }
        // CFLAG:331  = 7（变量语义：CFLAG 族，331）
        kojo.手淫 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.手淫 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「大鸡巴…啊啊…好烫…居然那么硬~…${heart(1)}」`);
        await era.printAndWait(
          `${target_name}舔着嘴唇的同时不断撸着阴茎、如果允许她放开干的话很有可能立马就会舔舐起阴茎的样子………`,
        );
        if (era.get(`abl:${target}:32`) >= 3) {
          await era.printAndWait(
            `「精液…好想要啊~…主人的…精液~…精液~…好想要精液啊~${heart(1)}」`,
          );
        }
        // CFLAG:331  = 6（变量语义：CFLAG 族，331）
        kojo.手淫 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.手淫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(100) >= 50) {
          await era.printAndWait(
            `「哈啊~${heart(1)}…哈啊~${heart(1)}…变得舒服起来吧~~、主人~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}对给阴茎侍奉的这件事看成她平生至上的喜悦、十分疼爱地摩擦着阴茎。`,
          );
          await era.printAndWait(
            `「大鸡巴${heart(1)}…又硬又烫又大的大鸡巴${heart(1)}…好棒啊啊~${heart(1)}…变得舒服起来吧~~…${heart(1)}」`,
          );
          if (era.get(`abl:${target}:32`) >= 3) {
            await era.printAndWait(
              `「为了让主人随时射出来都没有问题所以早就将嘴巴准备好了…往俺的嘴巴里用精液射地满满的吧~${heart(1)}」`,
            );
          }
        } else {
          await era.printAndWait(
            `「嗯~…黏黏糊糊地液体出来好多了呢~主人~${heart(1)}…这就代表主人现在很舒服对吧~？」`,
          );
          await era.printAndWait(
            `${target_name}十分欣喜地微笑着来回舔着嘴唇、将冒出来的前列腺液从龟头开始涂满整个阴茎。`,
          );
          await era.printAndWait(
            `「用俺的手…变得…变得更加舒服起来吧~${heart(1)}…全部都射出来吧~${heart(1)}」`,
          );
          if (era.get(`abl:${target}:32`) >= 3) {
            await era.printAndWait(
              `「精液…想要全部都喝下去呢…精液…精液好想要啦~${heart(1)}」`,
            );
          }
        }
        // CFLAG:331  = 5（变量语义：CFLAG 族，331）
        kojo.手淫 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.手淫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「大鸡巴好热啊~…${heart(1)} 俺会更加地上下摩擦的啦~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}兴奋到口水都留下来的样子、紧紧地抓住阴茎不停地撸着，甚至已经有些疼的程度………`,
        );
        // CFLAG:331  = 4（变量语义：CFLAG 族，331）
        kojo.手淫 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呜、呜嗯…会变得舒服起来的地方…差不多搞懂了呢…」`,
        );
        await era.printAndWait(
          `${target_name}好想觉得有些有趣地样子继续地撸着${player_name}的阴茎。`,
        );
        await era.printAndWait(
          `「啊~、刚刚跳了一下呢…原来是这呀…这里很舒服来的啊……」`,
        );
        // CFLAG:331  = 3（变量语义：CFLAG 族，331）
        kojo.手淫 = 3;
      } else if (kojo.手淫 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「俺、俺的手被…弄脏了呜…被弄脏了啊………」`);
        await era.printAndWait(
          `一副打从心底里厌恶的样子的${target_name}还是按照命令那样不断地用她的小手上下地摩擦着阴茎………`,
        );
        // CFLAG:331  = 2（变量语义：CFLAG 族，331）
        kojo.手淫 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 31) {
    if (kojo.口交_奴 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊啊嗯~…能用嘴巴来侍奉主人的大鸡巴真是好高兴啊~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}毫不犹豫地将${player_name}的阴茎含进了嘴巴十分高兴地舔舐了起来………`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「主人的…大鸡巴…${heart(1)} 啊啊嗯~…嗯~…啊呜…嗯哼唔…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}十分下流地用嘴巴亲吻了阴茎前端不知道多少次后便含进去了………`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「只、只要用嘴巴…就可以了对吧…啊~啊嗯~…嗯~…嗯~…啾~…啾唔~………」`,
        );
        await era.printAndWait(
          `${target_name}小心翼翼的把阴茎含在嘴里、舔了起来………`,
        );
      } else {
        await era.printAndWait(
          `「明…明白了啦…只、只要用嘴巴来就可以了对吧…这样的…才、才没有什么问题的啦…」`,
        );
        await era.printAndWait(
          `${target_name}皱着眉头一副十分胆怯的样子舔起了阴茎………`,
        );
      }
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332）
      kojo.口交_奴 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.口交_奴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「嗯唔呜嗯~…嗯啾呜…啾呜呜~${heart(1)}…大鸡巴…最喜欢了…大鸡巴最喜欢了噢~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}说着卑劣的话语的同时来回进行着。`,
          );
          await era.printAndWait(
            `「好像就这样吮吸主人的大鸡巴啊…让俺一直吮吸主人的大鸡巴吧~…${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「嗯啊啊~…嗯唔~…嗯啾~…啾~啾唔~…哼啊啊啊…好像更加激烈地吮吸大鸡巴啊~…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}眼角浮出眼泪的同时用舌头缠绕着阴茎、炽热的吐息吹向了。`,
          );
          await era.printAndWait(
            `「用嘴白来侍奉大鸡巴好舒服啊~${heart(1)} 俺会更加更加积极地吮吸大鸡巴噢~…呸咯~…${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `${target_name}用嘴唇含着阴茎前端的同时向上仰视着${player_name}、看来是想要看到这边的反应的样子。`,
          );
          await era.printAndWait(
            `「嗯啾~…啾唔${heart(1)}…嗯哼哼…呸咯…啾~呸咯~…噗哈~…主人~…发出更厉害的声音出来嘛~…${heart(1)}」`,
          );
          await era.printAndWait(
            `「只要看到主人的眼睛就可以知道主人舒不舒服了噢？嗯哼哼~ …啾~啾啪~${heart(1)}…呸咯~…嗯~${heart(1)}」`,
          );
        }
        // CFLAG:332  = 5（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「主人的大鸡巴~${heart(1)}…真美妙呢~…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}十分有感觉地轻轻喘息着的同时积极地将阴茎含进了口中。`,
          );
          await era.printAndWait(
            `「嗯呜~…嗯~嗯~${heart(1)}…啾~…啾噗~呸咯哦~…嗯~嗯噗呜${heart(1)}…舒服啦？啾~…啾呜呜~${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「好喜欢大鸡巴…能侍奉那么雄伟的大鸡巴真是好幸福呢~………${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一脸恍惚地样子进行起了口腔奉仕、小小的嘴巴张得大大地将阴茎含进去用舌头缠绕上去了。`,
          );
          await era.printAndWait(
            `「嗯啾~${heart(1)}…啾~…呸咯…呸咯~…嗯哼唔${heart(1)}…大鸡巴好好吃啊~…${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「嗯啊啊…${heart(1)} 好喜欢啊~…主人的大鸡巴~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}十分下流得将嘴巴张开，把舌头伸了出来开始舔了起来。`,
          );
          await era.printAndWait(
            `「啊~啊~…大鸡巴~${heart(1)}…好棒啊…俺会更加地侍奉主人的~…${heart(1)}」`,
          );
        }
        // CFLAG:332  = 4（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.口交_奴 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「用、用俺的嘴巴来…弄干净吧…啊啊~…嗯~…嗯啾…啾唔~…呸咯~…嗯唔………」`,
        );
        await era.printAndWait(
          `${target_name}的小嘴长得大大的十分积极地舔舐着阴茎………`,
        );
        // CFLAG:332  = 3（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 3;
      } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「啊呜~…嗯~…嗯~…嗯啾…呸咯~…嗯~…嗯啊…哈啊…哈啊………」`,
        );
        await era.printAndWait(`${target_name}并不是很积极地在舔的样子………`);
        // CFLAG:332  = 2（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 32) {
    if (kojo.乳交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊嗯~…胸部在被抽插着呢~…${heart(1)} 就这样将胸部侵犯了吧~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}露出了一副淫乱的笑容开始侍奉起了阴茎。`,
        );
        if (era.get(`talent:${target}:110`) === 1) {
          await era.printAndWait(
            `${target_name}温柔地把巨乳压向阴茎而完全将阴茎包裹住了………`,
          );
        }
        if (era.get(`talent:${target}:114`) === 1) {
          await era.printAndWait(
            `${target_name}温柔地把完全不平衡地巨大化的乳房压向阴茎而完全将阴茎包裹住了………`,
          );
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「哈啊啊嗯~…俺、俺的胸部是不是很舒服呀…？变得更加舒服起来吧~…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}十分欣喜的微笑着，继续对着阴茎进行着侍奉。`,
        );
        if (era.get(`talent:${target}:110`) === 1) {
          await era.printAndWait(
            `${target_name}温柔地把巨乳压向阴茎而完全将阴茎包裹住了………`,
          );
        }
        if (era.get(`talent:${target}:114`) === 1) {
          await era.printAndWait(
            `${target_name}温柔地把完全不平衡地巨大化的乳房压向阴茎而完全将阴茎包裹住了………`,
          );
        }
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「嗯~…啊呜…大鸡巴…好烫…啊~…」`);
        await era.printAndWait(
          `${target_name}对着被胸部夹着的阴茎兴奋起来了。`,
        );
        if (era.get(`talent:${target}:110`) === 1) {
          await era.printAndWait(
            `少女温柔地把巨乳压向阴茎而完全将阴茎包裹住了………`,
          );
        }
        if (era.get(`talent:${target}:114`) === 1) {
          await era.printAndWait(
            `${target_name}温柔地把完全不平衡地巨大化的乳房压向阴茎而完全将阴茎包裹住了………`,
          );
        }
      } else {
        await era.printAndWait(`「这样的…感觉好恶心啊………」`);
        if (era.get(`talent:${target}:110`) === 1) {
          await era.printAndWait(
            `${target_name}温柔地把巨乳压向阴茎而完全将阴茎包裹住了………`,
          );
        }
        if (era.get(`talent:${target}:114`) === 1) {
          await era.printAndWait(
            `${target_name}温柔地把完全不平衡地巨大化的乳房压向阴茎而完全将阴茎包裹住了………`,
          );
        }
      }
      // CFLAG:TARGET:333  = 1（变量语义：CFLAG 族，TARGET:333）
      kojo.乳交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「用胸部来侍奉好舒服啊~…${heart(1)}」`);
          await era.printAndWait(
            `「俺的胸部…正在被主人的大鸡巴来回抽插着呢${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一脸淫笑地对着阴茎进行着侍奉。`,
          );
          if (era.get(`talent:${target}:110`) === 1) {
            await era.printAndWait(
              `${target_name}温柔地把巨乳压向阴茎而完全将阴茎包裹住了………`,
            );
          }
          if (era.get(`talent:${target}:114`) === 1) {
            await era.printAndWait(
              `${target_name}温柔地把完全不平衡地巨大化的乳房压向阴茎而完全将阴茎包裹住了………`,
            );
          }
        } else {
          await era.printAndWait(
            `「胸部是主人的东西来的啦…所以更加激烈地侵犯也可以噢~${heart(1)}」`,
          );
          await era.printAndWait(
            `「哈嗯~…乳头在被来来回回地摩擦着呢啊呜~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一脸淫笑地对着阴茎进行着侍奉。`,
          );
          if (era.get(`talent:${target}:110`) === 1) {
            await era.printAndWait(
              `${target_name}温柔地把巨乳压向阴茎而完全将阴茎包裹住了………`,
            );
          }
          if (era.get(`talent:${target}:114`) === 1) {
            await era.printAndWait(
              `${target_name}温柔地把完全不平衡地巨大化的乳房压向阴茎而完全将阴茎包裹住了………`,
            );
          }
        }
        // CFLAG:333  = 7（变量语义：CFLAG 族，333）
        kojo.乳交 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.口交_奴 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯~…嗯哼唔…就这样侵犯着俺的胸部吧~～${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}一脸淫笑地对着阴茎进行着侍奉。`);
        if (era.get(`talent:${target}:110`) === 1) {
          await era.printAndWait(
            `${target_name}温柔地把巨乳压向阴茎而完全将阴茎包裹住了………`,
          );
        }
        if (era.get(`talent:${target}:114`) === 1) {
          await era.printAndWait(
            `${target_name}温柔地把完全不平衡地巨大化的乳房压向阴茎而完全将阴茎包裹住了………`,
          );
        }
        // CFLAG:333  = 6（变量语义：CFLAG 族，333）
        kojo.乳交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.乳交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「大鸡巴…用俺的胸部变得舒服起来吧~…${heart(1)}」`,
          );
          await era.printAndWait(
            `「主人啊嗯~…俺会…用尽全力来侍奉的啦~…啊~…啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}十分欣喜的微笑着，继续对着阴茎进行着侍奉。`,
          );
          if (era.get(`talent:${target}:110`) === 1) {
            await era.printAndWait(
              `${target_name}温柔地把巨乳压向阴茎而完全将阴茎包裹住了………`,
            );
          }
          if (era.get(`talent:${target}:114`) === 1) {
            await era.printAndWait(
              `${target_name}温柔地把完全不平衡地巨大化的乳房压向阴茎而完全将阴茎包裹住了………`,
            );
          }
        } else {
          await era.printAndWait(`「主人的大鸡巴…真美妙呢~…${heart(1)}」`);
          await era.printAndWait(
            `「哈啊啊嗯~…俺、俺的胸部是不是很舒服呀…？变得更加舒服起来吧~…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}十分欣喜的微笑着，继续对着阴茎进行着侍奉。`,
          );
          if (era.get(`talent:${target}:110`) === 1) {
            await era.printAndWait(
              `${target_name}温柔地把巨乳压向阴茎而完全将阴茎包裹住了………`,
            );
          }
          if (era.get(`talent:${target}:114`) === 1) {
            await era.printAndWait(
              `${target_name}温柔地把完全不平衡地巨大化的乳房压向阴茎而完全将阴茎包裹住了………`,
            );
          }
        }
        // CFLAG:333  = 4（变量语义：CFLAG 族，333）
        kojo.乳交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.乳交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「嗯~…啊呜…大鸡巴…好烫…啊~…」`);
        await era.printAndWait(
          `${target_name}对着被胸部夹着的阴茎兴奋起来了。`,
        );
        if (era.get(`talent:${target}:110`) === 1) {
          await era.printAndWait(
            `${target_name}温柔地把巨乳压向阴茎而完全将阴茎包裹住了………`,
          );
        }
        if (era.get(`talent:${target}:114`) === 1) {
          await era.printAndWait(
            `${target_name}温柔地把完全不平衡地巨大化的乳房压向阴茎而完全将阴茎包裹住了………`,
          );
        }
        // CFLAG:333  = 3（变量语义：CFLAG 族，333）
        kojo.乳交 = 3;
      } else if (kojo.乳交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「胸部…在被侵犯着…不要啊…~………」`);
        if (era.get(`talent:${target}:110`) === 1) {
          await era.printAndWait(`${target_name}用这巨大化的乳房侍奉着………`);
        }
        if (era.get(`talent:${target}:114`) === 1) {
          await era.printAndWait(
            `${target_name}用温柔地把完全不平衡地巨大化的乳房侍奉着………………`,
          );
        }
        // CFLAG:333  = 2（变量语义：CFLAG 族，333）
        kojo.乳交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 33) {
    if (kojo.股间性交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「哈啊~…请、请不要捉弄俺啦~…主人啊嗯~………${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}用舌头舔着嘴唇的同时摩擦着股间………`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「啊啊~…嗯啊啊~…大鸡巴好热啊~…变得奇怪起来了啊~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}好像十分羞耻的样子，缓慢地摩擦着股间………`,
        );
      } else {
        await era.printAndWait(
          `「啊啊…哈啊…哈啊…这、这样的…这样的好羞耻啊………！」`,
        );
        await era.printAndWait(
          `${target_name}脸变得通红的情况下继续进行着素股play………`,
        );
      }
      // CFLAG:TARGET:334  = 1（变量语义：CFLAG 族，TARGET:334）
      kojo.股间性交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:0`) === 1 &&
        (kojo.股间性交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊~…请、请不要捉弄俺啦~…主人~………${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}从嘴边漏出娇喘声的同时摩擦着股间、好像很舒服的样子颤动着腰部。`,
        );
        await era.printAndWait(
          `「就这样…哈~…进来吧~…大、大鸡巴…好想要啊${heart(1)} 收下俺的处女嘛~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}每次要想插进去而想要将腰对准的时候都被紧紧着抓住了腰部继续着素股play。`,
        );
        await era.printAndWait(
          `「差、差不多就好了啦…再这样下去的话等下俺就要强行侵犯主人了啦…啊~…啊啊啊嗯~${heart(1)}」`,
        );
        // CFLAG:334  = 7（变量语义：CFLAG 族，334）
        kojo.股间性交 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.股间性交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊~啊哈啊~${heart(1)}…请、请不要捉弄俺啦~…主人~………${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}嘴边漏出娇喘声的同时摩擦着股间、好像很舒服的样子颤动着腰部。`,
        );
        await era.printAndWait(
          `「嗯~…啊嗯~…啊啊啊~…大鸡巴好热啊…要变奇怪起来了呜~${heart(1)}…要变奇怪起来了啦~…${heart(1)}」`,
        );
        // CFLAG:334  = 6（变量语义：CFLAG 族，334）
        kojo.股间性交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`talent:${target}:0`) === 1 &&
        (kojo.股间性交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊~…嗯啊啊…大鸡巴好热啊~…感觉要变奇怪了啊~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}将腰十分下流的晃动着的同时用阴唇摩擦着${player_name}的阴茎。`,
        );
        await era.printAndWait(
          `「主、主人…如果要将精液射出来的话…就、就在俺的里面…射、射出来…射出来吧…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一脸想要哭出来，不像样子的表情看着${player_name}。`,
        );
        await era.printAndWait(
          `「就这样夺走俺的处女吧…拜托了嘛~…${heart(1)}」`,
        );
        // CFLAG:334  = 5（变量语义：CFLAG 族，334）
        kojo.股间性交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.股间性交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊~…嗯啊啊…大鸡巴好热啊…感觉要变奇怪起来了啊~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}将腰十分下流的晃动着的同时用阴唇摩擦着${player_name}的阴茎。`,
        );
        await era.printAndWait(
          `「哈啊…啊呜~${heart(1)}…主人~${heart(1)}…好想要…大鸡巴啊~${heart(1)}…只是素股的话完全满足不了啊~${heart(1)}」`,
        );
        // CFLAG:334  = 4（变量语义：CFLAG 族，334）
        kojo.股间性交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.股间性交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊嗯~…哈啊哈啊…摩、摩擦起来后…很舒服吗…？」`);
        await era.printAndWait(
          `${target_name}好像已经习惯了的样子、腰十分下流的晃动着的同时用阴唇摩擦着${player_name}的阴茎。`,
        );
        await era.printAndWait(
          `「嗯~…啊啊~…哈呜呜~…俺、俺也…变了舒服起来了啊………」`,
        );
        // CFLAG:334  = 3（变量语义：CFLAG 族，334）
        kojo.股间性交 = 3;
      } else if (kojo.股间性交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊啊…哈啊…哈啊…这、这样的…好羞耻啊~………！」`);
        await era.printAndWait(
          `${target_name}脸变得通红的情况下用阴唇摩擦着………`,
        );
        // CFLAG:334  = 2（变量语义：CFLAG 族，334）
        kojo.股间性交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 34) {
    if (kojo.骑乘位 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        if (era.get(`talent:${target}:76`) === 1) {
          if (era_flag.assi > 0 && era_flag.assiplay) {
            await era.printAndWait(
              `收到命令后很高兴的放空了腰腿的力量、助手的肉棒一下子把${target_name}的处女象征贯穿了。`,
            );
          } else if (era.get(`talent:${target}:314`) === 9) {
            await era.printAndWait(
              `「啊哈…主人大的…连、最里面都…啊、啊啊啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}忍耐着疼痛慢慢放下了腰、背上的翅膀竭力的伸展着。`,
            );
            await era.printAndWait(
              `「主人~…啊啊…魔王大人…连起来了~…和魔王大人用肉棒连起来了呢${heart(1)}」`,
            );
            await era.printAndWait(
              `因为更加紧密的肉体链接、${player_name}和${target_name}之间的魔力循环变得愈加明显了。`,
            );
            await era.printAndWait(
              `「啊啊~…魔王大人~…啊~哈啊啊…呀${heart(1)}…啊啊~…腰…自己动起来惹${heart(1)}…想要魔王大人的鸡巴所以自己动起来惹${heart(1)}」`,
            );
            await era.printAndWait(
              `完全成为了${player_name}之物的魔族少女带着愉悦的泪痕，扭动着腰肢在${player_name}身上驰骋起来………`,
            );
          } else {
            await era.printAndWait(
              `「啊啊~…啊~…哈呜…${heart(1)} 进、进来了呜…全部进来了哟…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}忍耐着疼痛慢慢放下了腰、初次结合的喜悦让少女露出了笑容。`,
            );
            await era.printAndWait(
              `「哈啊~…哈啊~…主人大人的大肉棒${heart(1)}…已经变成俺的东西了哟${heart(1)}…啊~…啊啊~…好高兴${heart(1)}」`,
            );
            await era.printAndWait(
              `看到${target_name}那感动至极的表情、${player_name}的恶作剧之心不禁沸腾了起来。`,
            );
            await era.printAndWait(
              `「咿呀！啊~唏呀！干、干什么…还、还在慢慢适应中呢${heart(1)} 突、突然插进来、不、不行…不行啦~${heart(1)}」`,
            );
          }
        } else if (era.get(`talent:${target}:85`) === 1) {
          if (era_flag.assi > 0 && era_flag.assiplay) {
            await era.printAndWait(
              `收到命令后面露悲戚地放空了腰腿的力量、助手的肉棒一下子把${target_name}的处女象征贯穿了。`,
            );
          } else if (era.get(`talent:${target}:314`) === 9) {
            await era.printAndWait(
              `「嗯~…没关系呢~…这种程度…完全、不在意啦…呜啊…啊~哈呜…！」`,
            );
            await era.printAndWait(
              `${target_name}忍耐着疼痛慢慢放下了腰、背上的翅膀竭力的伸展着。`,
            );
            await era.printAndWait(
              `「啊~啊啊啊啊~…魔王大人的大肉棒…全部…插进里面啦…啊啊…好幸福${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}两手捧着脸颊、开心地扭来扭去。`,
            );
            await era.printAndWait(
              `「魔王大人的魔力…大股的流进来了…啊哈${heart(1)}…啊啊~…啊啊啊~${heart(1)}」`,
            );
            await era.printAndWait(
              `完全成为了${player_name}之物的魔族少女带着愉悦的泪痕，用小穴吞吐着${player_name}的肉棒………`,
            );
          } else {
            await era.printAndWait(
              `「啊~…啊啊~哈啊………全、全部插进来啦…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}忍耐着疼痛慢慢放下了腰、破瓜的疼痛让她的眉头蹙成了一团。`,
            );
            await era.printAndWait(
              `「哈啊…哈啊…俺、俺…这样一来就完全变成、主人的东西了唷…啊~…啊啊啊嗯${heart(1)}」`,
            );
            await era.printAndWait(
              `${player_name}被少女可爱的（努力）姿态打动，温柔的抱紧了她。`,
            );
            await era.printAndWait(
              `「主人…稍微再这样一会…只、只要再稍稍一下就好…感觉很温暖呢…${heart(1)}」`,
            );
            await era.printAndWait(
              `抱着${target_name}手臂抬了起来，轻轻擦掉了少女眼角的泪珠、一遍又一遍的抚摸着她的头………`,
            );
          }
        } else {
          if (era_flag.assi > 0 && era_flag.assiplay) {
            await era.printAndWait(
              `被${master_name}按住肩膀、哭叫不止的${target_name}被助手侵犯了………`,
            );
          } else if (era.get(`talent:${target}:314`) === 9) {
            await era.printAndWait(
              `「啊啊~哈啊啊…啊、啊啊啊…俺、俺…这样子…啊啊~！」`,
            );
            await era.printAndWait(
              `${target_name}忍耐着疼痛慢慢放下了腰、背上的翅膀竭力的伸展着。`,
            );
            await era.printAndWait(
              `「好、好痛…魔王大人…啊啊~…请、请放过………啊、啊呜！？」`,
            );
            await era.printAndWait(
              `${player_name}向${target_name}连接的部分直接输入魔力。${target_name}的眼神渐渐变得湿润了。`,
            );
            await era.printAndWait(
              `「魔王大人的魔力…大股的流进来了呢…哈啊~${heart(1)}…啊啊~…哈嗯${heart(1)}」`,
            );
            await era.printAndWait(
              `完全成为了${player_name}之物的魔族少女带着愉悦的泪痕，用小穴吞吐着${player_name}的肉棒………`,
            );
          } else {
            await era.printAndWait(
              `「嗯哈~哈啊啊…啊、啊啊~…俺、俺…这样子…啊啊~！」`,
            );
            await era.printAndWait(
              `${target_name}忍耐着疼痛慢慢放下了腰、破瓜的疼痛让她的眉头蹙成了一团。`,
            );
            await era.printAndWait(`「好、好痛…主人…啊啊~…请、请原谅呜………」`);
          }
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「哈啊…哈啊…啊嗯~…哈啊啊~…主人…啊~啊啊啊…啊啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}带着愉悦的表情在${player_name}身上舞动着腰肢………`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「啊~…啊呜呜~…好、好厉害嗯…肚子里面…主人的鸡巴好大…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}怜爱的抚摸着自己小腹上因为吞掉${player_name}的鸡巴而凸起的部分………`,
          );
        } else {
          await era.printAndWait(
            `「啊啊~…这样子…很~…很羞耻啦…啊~咿呀…啊呜呜~！突、突然顶腰犯规啦！」`,
          );
          await era.printAndWait(`${target_name}被连续的突刺着，发出了悲鸣………`);
        }
      }
      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335）
      kojo.骑乘位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.骑乘位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(4) === 0) {
          if (era.get(`talent:${target}:314`) === 9) {
            await era.printAndWait(
              `${target_name}每当被从下面抽插时就不禁张开翅膀发出娇喊。`,
            );
          }
          await era.printAndWait(
            `「啊啊嗯~…啊~啊呜~…哈啊啊嗯${heart(1)}…啊唏噫！…深…插太深了…要、要坏了呃呃呃${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}大幅度的反仰着背部发出了娇喘。而${player_name}如同不让她逃掉一样将其双手抓住就这样紧追不舍地发起了进攻。`,
          );
          await era.printAndWait(
            `「弄坏吧${heart(1)}…把俺弄坏掉吧${heart(1)}…主人啊啊~${heart(1)}…啊啊~…啊啊~…嗯~…嗯啊啊啊~啊~噫嘿${heart(1)}」`,
          );
        } else if (rand_n(3) === 0) {
          if (era.get(`talent:${target}:314`) === 9) {
            await era.printAndWait(
              `青色的肌肤上一粒粒的汗珠冒了出来、散发着淫靡的香气。`,
            );
          }
          await era.printAndWait(
            `「主人啊…啊啊~…喜欢…鸡巴好喜欢${heart(1)}…最喜欢大鸡巴${heart(1)}…啊啊~啊~${heart(1)}…啊哈啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}跨坐在${player_name}激烈的上下起伏着，享受着用小穴吞吐鸡巴的快感。`,
          );
          await era.printAndWait(
            `「啊啊~…鸡巴最高~${heart(1)}…最棒了！${heart(1)}…一辈子这样插着鸡巴就好了${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊哈~啊啊~…哈啊嗯~…再继续向上插进来${heart(1)}…啊啊~${heart(1)}…俺、俺要飞掉啦呜呜呜~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}随着${player_name}的抽插快乐的大喊着。`,
          );
          await era.printAndWait(
            `「啊啊~${heart(1)}…咕唔…啊咿…俺的子宫被大鸡巴插进去了${heart(1)}…要对主人的鸡巴着迷了${heart(1)}」`,
          );
          if (era.get(`talent:${target}:314`) === 9) {
            await era.printAndWait(
              `${target_name}的魔族之眼闪闪发光，随着${player_name}的动作一下一下的娇喘着………`,
            );
          }
        } else {
          await era.printAndWait(
            `「啊~啊啊啊~…啊哈啊…主人啊啊…大鸡巴好舒服…${heart(1)} 最喜欢鸡巴了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}自己动着腰、献媚似的雪雪娇呼着。`,
          );
          if (era.get(`talent:${target}:314`) === 9) {
            await era.printAndWait(`身负双翼的少女十分享受叹了口气。`);
          }
          await era.printAndWait(
            `「啊哈啊…啊啊~…啊啊啊嗯${heart(1)} 就这样…在俺的小穴里面射出一大堆吧…${heart(1)}」`,
          );
          await era.printAndWait(
            `像熟练妓女一样扭动着腰肢的少女露出了淫猥的笑容………`,
          );
        }
        // CFLAG:335  = 8（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.骑乘位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊嘿呀啊～${heart(1)}…嗯~…啊啊哈啊~${heart(1)}…啊啊嗯~！」`,
        );
        await era.printAndWait(
          `${target_name}腰部的动作还有些青涩、偶尔还会蹙蹙眉头，露出一丝苦色。`,
        );
        await era.printAndWait(
          `「啊啊啊~…主人…一起变得更加舒服吧…啊~啊啊啊~${heart(1)}」`,
        );
        // CFLAG:335  = 7（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 7;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.骑乘位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(4) === 0) {
          if (era.get(`talent:${target}:314`) === 9) {
            await era.printAndWait(
              `${target_name}每当被从下面抽插时就不禁张开翅膀发出娇喊。`,
            );
          }
          await era.printAndWait(
            `「啊啊~${heart(1)}…啊呜~…呜呜呜~…噫呀啊啊啊~${heart(1)}…已、已经去了了了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}大幅度的反仰着背部发出了娇喘。而${player_name}如同不让她逃掉一样将其双手抓住就这样紧追不舍地发起了进攻。`,
          );
          await era.printAndWait(
            `「更…更激烈的话哈啊${heart(1)}…啊~…啊啊啊~…放货咱（放过俺）${heart(1)}…放货咱啦（放过俺吧）${heart(1)}…啊啊~哎嘿呀${heart(1)}」`,
          );
        } else if (rand_n(3) === 0) {
          if (era.get(`talent:${target}:314`) === 9) {
            await era.printAndWait(
              `青色的肌肤上一粒粒的汗珠冒了出来、散发着淫靡的香气。`,
            );
          }
          await era.printAndWait(
            `「嗯~…啊啊~…喜欢喜欢${heart(1)}…最喜欢了哦${heart(1)}…主人啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}趴在${master_name}身上，轻轻舔吻着、自己上下摆动着腰臀。`,
          );
          await era.printAndWait(
            `「嗯啾…啾…啊哈啊…哈啊…啊呜呜嗯~${heart(1)}…好棒~…大鸡巴进到好深的地方来了${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊~…嗯~…啊~啊啊~…主人${heart(1)}…更多${heart(1)}…更多的插进来…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}随着${player_name}的抽插快乐的大喊着。`,
          );
          await era.printAndWait(
            `「最…最里面都被插入了哟…俺的肚子里面也成为主人的东西了呢${heart(1)}」`,
          );
          if (era.get(`talent:${target}:314`) === 9) {
            await era.printAndWait(
              `${target_name}的魔族之眼闪闪发光，随着${player_name}的动作一下一下的娇喘着………`,
            );
          }
        } else {
          await era.printAndWait(
            `「啊~…啊哈啊~…啊啊啊~…咿呀呜呜~…${heart(1)} 啊啊~主人~好棒~…好…棒${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}自己扭动着腰肢，想要掩饰羞涩一样大声娇呼着。`,
          );
          if (era.get(`talent:${target}:314`) === 9) {
            await era.printAndWait(`身负双翼的少女十分享受叹了口气。`);
          }
          await era.printAndWait(
            `「呼唔…啊哈啊啊啊~${heart(1)}…主人…在俺的小穴里面射出一大堆吧…${heart(1)}」`,
          );
        }
        // CFLAG:335  = 6（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.骑乘位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊~…啊啊~${heart(1)}…嗯~…啊啊哈啊~${heart(1)}…嗯~！」`,
        );
        await era.printAndWait(
          `${target_name}生硬的扭着腰肢、蹙着眉头，露出一丝苦色。`,
        );
        await era.printAndWait(
          `「主人…对、对不起…还、稍微有点难受…嗯~嗯嗯~！」`,
        );
        // CFLAG:335  = 5（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 5;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.骑乘位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(`「嗯~…啊啊啊~…哈呜~…！好舒服…好…棒呢…♪」`);
          await era.printAndWait(`${target_name}熟练地用腰吞贪取着快乐。`);
          await era.printAndWait(
            `「主人的东西…在深处动着…啊~啊啊啊~…啊哈啊～♪」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「呀~…呀啊~…这样被抽查的话…唏啊！…啊噫…！」`);
          await era.printAndWait(
            `${player_name}如同不让她逃掉一样将其双手抓住就这样紧追不舍地发起了进攻。`,
          );
          await era.printAndWait(
            `「啊~…啊啊啊~…呀啊~…俺、俺…要…要去…要去…啊哈啊啊~♪」`,
          );
        } else {
          await era.printAndWait(
            `「啊~…啊啊~…哈啊…哈啊…嗯~…！腰、腰它…擅自动起来惹…啊~♪啊啊~♪」`,
          );
          await era.printAndWait(
            `${target_name}一边扭动着腰肢一边发出了叹息。`,
          );
          await era.printAndWait(
            `「啊啊~…俺、俺的肚子里…主人的子种汁满满的出来了………」`,
          );
        }
        // CFLAG:335  = 4（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.骑乘位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯~…啊啊~…哈啊…哈啊…嗯~…会好好…动、动起来的…的说…啊~啊啊~…！」`,
        );
        await era.printAndWait(`${target_name}一边扭动着腰肢一边发出了叹息。`);
        await era.printAndWait(`「啊啊~…俺、俺的肚子里…主人的好多……」`);
        // CFLAG:335  = 3（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 3;
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「啊啊~…这样的姿势…很…很羞耻啦…啊~咿呀…啊呜呜~！突、突然顶腰不行！」`,
        );
        await era.printAndWait(`${target_name}被抽插着发出了悲鸣。`);
        await era.printAndWait(`「噫~…咕…啊啊~…停、停下啊…啊~…啊咕唔！」`);
        // CFLAG:335  = 2（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 35) {
    if (kojo.全身擦洗 === 0) {
      if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「唔哇啊~…用那么昂贵的澡堂洗澡也没问题啊…啊、嗯、嗯~、那么俺用肥皂帮您擦身了噢...？」`,
        );
        await era.printAndWait(
          `${target_name}下意识觉得为什么要那么奢侈而迷惑地同时开始了侍奉。`,
        );
        await era.printAndWait(`「俺会…帮主人将身体弄得干干净净的…」`);
        if (
          era.get(`talent:${target}:110`) ||
          era.get(`talent:${target}:114`)
        ) {
          await era.printAndWait(
            `「俺会用俺大大胸部来帮您洗澡噢~…啊啊~…胸部要被压坏了呜~…」`,
          );
        }
      } else {
        await era.printAndWait(
          `「唔哇啊~…用那么漂亮的澡堂洗澡也没问题啊…啊、嗯、嗯~、那么俺用肥皂帮您擦身了噢...？」`,
        );
        await era.printAndWait(
          `${target_name}下意识觉得为什么要那么奢侈而迷惑地同时开始了侍奉。`,
        );
        if (
          era.get(`talent:${target}:110`) ||
          era.get(`talent:${target}:114`)
        ) {
          await era.printAndWait(`「哈啊…啊啊啊…胸部要被压坏了呜~………」`);
        }
      }
      // CFLAG:TARGET:336  = 1（变量语义：CFLAG 族，TARGET:336）
      kojo.全身擦洗 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.全身擦洗 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}往自己身上来回涂满了肥皂后慢慢往${master_name}抱了过去开始侍奉起来了。`,
        );
        await era.printAndWait(
          `「啊啊~…啊啊啊嗯~${heart(1)}…主人啊~、只是帮主人洗澡而已…变得舒服起来了唔呜~${heart(1)}」`,
        );
        await era.printAndWait(
          `「只是仅仅贴着主人的身体而已…就感觉要去了呢呜~${heart(1)}」`,
        );
        if (
          era.get(`talent:${target}:110`) ||
          era.get(`talent:${target}:114`)
        ) {
          await era.printAndWait(
            `${target_name}丰满的胸部压在${player_name}的背后变形了。`,
          );
          await era.printAndWait(
            `「啊~啊啊~啊啊嗯~…俺的胸部…好舒服啊~${heart(1)}」`,
          );
        }
        // CFLAG:336  = 5（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.全身擦洗 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊…啊啊…主~主人~…用俺的身体全部变得干干净净的吧~…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}往自己身上来回涂满了肥皂后慢慢往${master_name}抱了过去开始侍奉起来了。`,
        );
        await era.printAndWait(`「俺会…帮主人将身体弄得干干净净的…」`);
        if (
          era.get(`talent:${target}:110`) ||
          era.get(`talent:${target}:114`)
        ) {
          await era.printAndWait(
            `「俺的胸部舒服吗？…呀啊嗯~…呜、呜嗯~…用俺的胸部将手指弄干净吧~${heart(1)}」`,
          );
        }
        // CFLAG:336  = 4（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.全身擦洗 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊啊…肥皂的味道好香啊…哈啊…哈啊…………」`);
        await era.printAndWait(
          `${target_name}往身体上用肥皂擦了几下后开始对${player_name}侍奉起来了。`,
        );
        await era.printAndWait(`「要…要变干净了噢~…」`);
        if (
          era.get(`talent:${target}:110`) ||
          era.get(`talent:${target}:114`)
        ) {
          await era.printAndWait(
            `「俺会用俺大大胸部来帮您洗澡噢~……啊啊~…胸部要被压坏了~…」`,
          );
        }
        // CFLAG:336  = 3（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 3;
      } else if (kojo.全身擦洗 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「啊啊啊…肥皂滑溜溜地…要变成奇怪的感觉了啊………」`,
        );
        await era.printAndWait(
          `${target_name}往身体上用肥皂擦了几下后开始对${player_name}侍奉起来了。`,
        );
        if (
          era.get(`talent:${target}:110`) ||
          era.get(`talent:${target}:114`)
        ) {
          await era.printAndWait(`「哈啊…啊啊啊…胸部要被压坏了呜~………」`);
        }
        // CFLAG:336  = 2（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 36) {
    if (kojo.骑乘位肛交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊呀啊嗯~…肛门被主人的给塞满了~${heart(1)}…好棒啊~${heart(1)}…俺好幸福啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `跨在${player_name}身上的${target_name}舔着嘴唇十分下流地看着${player_name}、为了品味更强烈的快感而前后晃动起了那小巧的屁股………`,
          );
        } else {
          await era.printAndWait(
            `「啊啊~…全、全部进去了~…主人的大鸡巴~…啊啊~…啊~…嗯呜呜~」`,
          );
          await era.printAndWait(
            `跨在${player_name}身上的${target_name}露出了稍微痛苦的表情，慢慢地晃动起了腰部………`,
          );
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊~${heart(1)}…啊呜呜~…连屁股的里面…都被主人的给塞满了啊嗯~${heart(1)}」`,
          );
          await era.printAndWait(
            `跨在${player_name}身上的${target_name}如同享受一样慢慢地前后摇晃着腰部………`,
          );
        } else {
          await era.printAndWait(
            `「哈啊~…啊啊~…这、这样子舒服吗？ 嗯~…唔呜…啊啊啊~…啊~…哈啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `跨在${player_name}身上努力晃动腰部的${target_name}露出稍微痛苦的表情………`,
          );
        }
      } else {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊啊啊~…全部都进去啊…啊啊啊~…主人的…啊啊~…啊~啊啊啊~！」`,
          );
          await era.printAndWait(
            `跨在${player_name}身上的${target_name}发出娇喘声的同时晃动着腰部………`,
          );
        } else {
          await era.printAndWait(
            `「啊唔呜呜~…呜~…啊啊啊…不、不要啊…屁股…要坏掉了啊啊…！」`,
          );
          await era.printAndWait(
            `跨在${player_name}身上的${target_name}流着眼泪的同时被侵犯着肛门………`,
          );
        }
      }
      // CFLAG:TARGET:337  = 1（变量语义：CFLAG 族，TARGET:337）
      kojo.骑乘位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:77`) === 1 &&
        (kojo.骑乘位肛交 <= 7 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `${target_name}的双手被抓住的情况下不断地被从下往上抽插、每次往上捅的时候少女就会翻起了白眼发出了如同野兽一样的叫声。`,
          );
          await era.printAndWait(
            `「哈哈~…啊呜呜~…哈呀嗯~…呀~呀啊啊~…啊啊~…啊啊啊啊啊啊…肛穴要荣坏掉了呜${heart(1)}…要坏掉了呜呜…${heart(1)}」`,
          );
          await era.printAndWait(
            `少女发出了如果是曾经认识少女的人肯定无法相信的如同野兽一般的呻吟、而这个少女${target_name}则在${player_name}的腰上变得凌乱不堪起来了。`,
          );
          await era.printAndWait(
            `「啊啊啊啊~…肛穴被侵犯了好棒~${heart(1)}…好想被一直侵犯下去啊~${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `${target_name}的腰蠢蠢欲动地跨在了${player_name}的身上。`,
          );
          await era.printAndWait(
            `「我的肛穴…会变得那么淫乱完全是主人的错来的啊~${heart(1)}…要负起责任噢${heart(1)}」`,
          );
          await era.printAndWait(
            `抚摸着流着眼泪的同时向这边撒娇的${target_name}的脑袋、${player_name}开始往上抽插起来了。`,
          );
          await era.printAndWait(
            `「啊哈呀啊嗯~${heart(1)}…这个…就是这个啊~${heart(1)}…将肛穴侵犯到融化掉为止吧~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊啊~…肛穴好棒啊啊~${heart(1)}…往俺的肛穴里用精子灌得满满的吧~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}十分粗暴，激烈地晃动着腰部贪图着肛门的快感。`,
          );
          await era.printAndWait(
            `「大鸡巴~${heart(1)}…大鸡巴最喜欢了~${heart(1)}…而且会往俺的肛穴里射精的大鸡巴最棒了~${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}看见少女这样的姿态不由得叹了口气，不断地往上抽插直到少女满意了为止………`,
          );
        }
        // CFLAG:337  = 8（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 7 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊嗯~…不、不行…动起来是不行的啊~…啊啊啊~…嗯~${heart(1)}…这样子做的话~…会很棒的噢…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}舔着嘴唇如同做着圆周运动地一样晃动着腰部、那湿润的瞳孔仿佛在告诉这样子做真的会很舒服的样子。`,
          );
          await era.printAndWait(
            `「啊啊啊啊…舒服的感觉…扩散到全身了~${heart(1)}…俺会做更加舒服的事情的啦~…大鸡巴最喜欢了~…${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊呀啊嗯~…肛门被主人的给塞满了哈嗯~${heart(1)}…好棒啊~${heart(1)}…俺好幸福啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `跨在${player_name}身上的${target_name}舔着嘴唇、为了品味快感而将她的小屁股前后摇起来了。`,
          );
          await era.printAndWait(
            `「嗯~…好深啊~…大鸡巴进到深处来了啊~…啊~啊啊~…好喜欢~${heart(1)}…大鸡巴好喜欢~${heart(1)}」`,
          );
        }
        // CFLAG:337  = 8（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.骑乘位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊~…全、全部都进去了呜…主人的大鸡巴~…啊啊~…啊~…唔呜呜呜~」`,
        );
        await era.printAndWait(
          `跨在${player_name}身上的${target_name}露出了稍微痛苦的表情慢慢地摇动起了腰部。`,
        );
        await era.printAndWait(
          `「如果是俺最喜欢的大鸡巴的话…完全没问题…的噢~…啊~啊啊啊~${heart(1)}」`,
        );
        if (era.get(`talent:${target}:0`) === 1) {
          await era.printAndWait(
            `（因为是最喜欢的…明明小穴那里也好想要来的…啊啊、真是坏心眼呢………）`,
          );
        }
        // CFLAG:337  = 7（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 7;
      } else if (
        era.get(`talent:${target}:77`) === 1 &&
        (kojo.骑乘位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `${target_name}被抓住双手不断地被往上抽插着、每当被插上去的时候就会翻出白眼，发出十分色情的娇喘声。`,
          );
          await era.printAndWait(
            `「哈啊啊~…啊呜呜~…唔~…呀~呀啊啊~…啊啊~…啊啊啊啊啊…肛穴要融化掉了${heart(1)}…要坏掉了呜呜~…${heart(1)}」`,
          );
          await era.printAndWait(
            `少女发出了曾经认识她的人绝对想象不出来的淫乱的声音、${target_name}在${player_name}的腰上跳着淫乱的舞蹈。`,
          );
          await era.printAndWait(
            `「啊啊啊啊~…肛穴被侵犯地好爽啊~${heart(1)}…好想被一直侵犯下去啊哈嗯~${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `蠢蠢欲动的${target_name}跨坐在${master_name}的身上。`,
          );
          await era.printAndWait(
            `「啊啊啊…更加地侵犯俺吧~…俺的肛穴嗯~${heart(1)}…变得那么下流完全是主人的原因的噢~${heart(1)}…啊嗯~${heart(1)}」`,
          );
          await era.printAndWait(
            `完全变成肛门狂的${target_name}自己晃动着臀部沉浸在肛门的快感之中。`,
          );
          await era.printAndWait(
            `「啊啊啊啊…要融化了呜~…肛穴要融化了呜…${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「哈呀啊~…肛穴好棒啊啊啊~${heart(1)}…往俺的肛穴里面将精子全部射进去吧~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}甚至有些粗暴地激烈晃动腰部贪婪地享受着肛门的快感。`,
          );
          await era.printAndWait(
            `「往里面射到…将肛穴变得黏黏糊糊要融化掉的程度吧~${heart(1)}」`,
          );
        }
        // CFLAG:337  = 6（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「嗯啊~…啊啊啊…哈呜…屁股好棒啊~${heart(1)}…真的好棒啊~…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的肛门好像在催促射精一样不断地夹紧着阴茎、每当这个时候都会发出十分色情的呻吟。`,
          );
          await era.printAndWait(
            `「主人…更加…更加欺负我的屁股吧~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊~${heart(1)}…啊呜呜~…屁股的里面都…被主人的给塞满了呢~${heart(1)}」`,
          );
          await era.printAndWait(
            `跨在${player_name}身上的${target_name}慢慢地如同享受一般将腰前后来回摇晃着。`,
          );
          await era.printAndWait(
            `「好舒服呢哈啊嗯~…主人的大鸡巴全部塞进来吧~…啊啊~啊~…哈呜呜~${heart(1)}」`,
          );
        }
        // CFLAG:337  = 5（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊~…啊啊~...这、这样的感觉怎样呀~？ 嗯~…唔呜…啊啊啊~…啊~…哈啊~${heart(1)}」`,
        );
        await era.printAndWait(
          `跨在${player_name}身上的${target_name}一脸好像有点难受的表情拼命地晃动着腰部。`,
        );
        await era.printAndWait(`「我会…让主人…变得更加舒服的啦~…${heart(1)}」`);
        if (era.get(`talent:${target}:0`) === 1) {
          await era.printAndWait(
            `「所、所以啦…想要被主人称赞嘛~…呐啊~…啊呜嗯~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}在被侵犯着肛门的时候、用手指将自己没有被贯通的蜜穴张开撒起娇来了………`,
          );
        }
        // CFLAG:337  = 4（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊~…全部都进去了~…啊啊啊~…主人的那个…啊啊~…啊~啊啊啊~！」`,
        );
        await era.printAndWait(
          `跨在${player_name}身上的${target_name}一边晃动着腰部一边发出了呻吟。`,
        );
        await era.printAndWait(
          `「啊~…呀啊~…腰…自己动起来了~…呀~哈呀~…啊啊啊~♪」`,
        );
        // CFLAG:337  = 3（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 3;
      } else if (kojo.骑乘位肛交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊呜~…唔~…这样的…啊啊~…啊唔~…嗯呜呜~！」`);
        await era.printAndWait(
          `跨在${player_name}身上的${target_name}流着眼泪的同时被侵犯着肛门………`,
        );
        // CFLAG:337  = 2（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 37) {
    if (kojo.肛门侍奉 === 0) {
      if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「好、好的…俺会非常努力…地、地舔那里的………」`);
        await era.printAndWait(
          `${target_name}颤抖着将舌头伸出来开始舔起来了………`,
        );
      } else {
        await era.printAndWait(
          `「啊啊~…这样的…不要啊…好脏…好脏啊…嗯~啊呜呜………」`,
        );
        await era.printAndWait(
          `${target_name}十分犹豫地将舌头伸出来了，然后用舌头伸向了${player_name}的肛门………`,
        );
      }
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338）
      kojo.肛门侍奉 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「主人…用我的舌头变得舒服起来吧~${heart(1)}」`);
        await era.printAndWait(
          `${target_name}十分欣喜地将湿漉漉的舌头伸向了${player_name}的肛门。`,
        );
        await era.printAndWait(
          `「啊啊嗯~…俺会让主人的肛门里面都变得十分干净的啦~${heart(1)} 呸咯~…嗯噗~…嗯~嗯噗呜~${heart(1)}」`,
        );
        // CFLAG:338  = 5（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「俺会让主人的肛门…变得十分地干净漂亮的~绮丽${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}十分欣喜地将湿漉漉的舌头伸向了${player_name}的肛门。`,
        );
        await era.printAndWait(
          `「啊啊~…连每一片褶皱…都会弄得干干净净地~${heart(1)} 呸咯~…噗啾~…嗯哼唔~${heart(1)}」`,
        );
        // CFLAG:338  = 4（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「好、好的…俺会非常努力…地、地舔那里的………」`);
        await era.printAndWait(
          `${target_name}颤抖着将舌头伸出来开始舔起来了………`,
        );
        await era.printAndWait(`「嗯啾~…呸咯~…呸咯…嗯~…哈啊…哈啊…啊啊~」`);
        // CFLAG:338  = 3（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 3;
      } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「这样的…明明好脏来的…嗯~啊呜呜……啊啊…呸咯~………」`,
        );
        await era.printAndWait(
          `${target_name}十分犹豫地将舌头伸出来了，然后用舌头伸向了${player_name}的肛门………`,
        );
        // CFLAG:338  = 2（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 40) {
    if (kojo.打屁股 === 0) {
      await era.printAndWait(`「呀啊…我、我不是坏孩子啊！」`);
      // CFLAG:TARGET:341  = 1（变量语义：CFLAG 族，TARGET:341）
      kojo.打屁股 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.打屁股 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呀嗯…啊啊啊哈啊嗯…再更多地打吧${heart(1)}」`);
        await era.printAndWait(
          `${target_name}每次被打屁股时都左右摇晃着她的屁股。`,
        );
        await era.printAndWait(
          `「多多地${heart(1)}…打我的屁股吧${heart(1)}…惩罚我吧${heart(1)}」`,
        );
        // CFLAG:TARGET:341  = 5（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.打屁股 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「对不起…全部都是我的不对…啊啊哈啊嗯${heart(1)}」`,
        );
        await era.printAndWait(
          `虽然屁股已经被打得又红又肿、${target_name}还是享受着打屁股的责罚。`,
        );
        await era.printAndWait(`「啊啊…屁股…好痛啊…啊啊啊${heart(1)}」`);
        // CFLAG:TARGET:341  = 4（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 4;
        return 0;
      } else if (
        era.get(`mark:${target}:0`) === 3 &&
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.打屁股 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊…哈～…哈啊…请再…多打几下………」`);
        await era.printAndWait(
          `虽然屁股已经被打得又红又肿、${target_name}还是承受着打屁股的责罚。`,
        );
        await era.printAndWait(`「我是个坏孩子…坏孩子………」`);
        // CFLAG:TARGET:341  = 3（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 3;
        return 0;
      } else if (kojo.打屁股 <= 1 && game.kojo.口上开关 === 2) {
        await era.printAndWait(`「呀啊…我、我不是坏孩子啊！」`);
        await era.printAndWait(`「呜呜…啊…嗯…呜咕………」`);
        // CFLAG:TARGET:341  = 2（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 41) {
    if (kojo.鞭 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「啊啊啊…请原谅、原谅我吧…主人！」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「啊…不要打我啊…啊啊、对不起对不起」`);
      } else {
        await era.printAndWait(
          `「呀啊…咕呜…不要啊…已经够了啊…不要再打了啊！」`,
        );
      }
      // CFLAG:TARGET:342  = 1（变量语义：CFLAG 族，TARGET:342）
      kojo.鞭 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.鞭 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「主人…更加…更加…请赐予我的身体更多的主人的疼爱吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}年幼的身体被毫不留情地鞭笞着、少女发出了愉悦的尖叫。`,
        );
        await era.printAndWait(
          `「啊啊${heart(1)}…更多地${heart(1)}…只是被主人鞭笞着就要去了啊${heart(1)}」`,
        );
        // CFLAG:TARGET:342  = 9（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「主人…更加…更加…请赐予我的身体更多的主人的疼爱吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}年幼的身体被毫不留情地鞭笞着、少女发出了愉悦的尖叫。`,
        );
        // CFLAG:TARGET:342  = 8（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.鞭 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊啊…请原谅、原谅我吧…主人！」`);
        await era.printAndWait(`${target_name}年幼的身体被毫不留情地鞭打着………`);
        // CFLAG:TARGET:342  = 7（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 7;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.鞭 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊…哈…呼…主人…被毫不留情地打了呢${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}年幼的身体被毫不留情地鞭笞着、少女发出带着哭音的喘息。`,
        );
        await era.printAndWait(
          `「啊嗯${heart(1)}…啊啊啊${heart(1)}…感受到了哦、主人对我的爱${heart(1)}」`,
        );
        // CFLAG:TARGET:342  = 6（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊…哈…呼…主人…被毫不留情地打了呢${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}年幼的身体被毫不留情地鞭笞着、少女发出带着哭音的喘息………`,
        );
        // CFLAG:TARGET:342  = 5（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.鞭 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊…不要打我啊…啊啊、对不起对不起」`);
        await era.printAndWait(`${target_name}年幼的身体被毫不留情地鞭笞着………`);
        // CFLAG:TARGET:342  = 4（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`${target_name}年幼的身体被毫不留情地鞭笞着。`);
        await era.printAndWait(`「啊啊哈…嗯啊…啊嗯…啊啊…哈啊嗯」`);
        await era.printAndWait(`被多次鞭打的少女露出了一脸心醉神迷的表情………`);
        // CFLAG:TARGET:342  = 3（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 3;
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「呀啊…咕呜…不要啊…已经够了啊…不要再打了啊！」`,
        );
        await era.printAndWait(`${target_name}年幼的身体被毫不留情地鞭笞着………`);
        // CFLAG:TARGET:342  = 2（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 42) {
    if (kojo.针 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「啊…好、好痛啊…主人…啊咕」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「住、住手…主人…我、我…什么坏事都没做啊…」`);
      } else {
        await era.printAndWait(`「咿…好痛…好痛啊！」`);
      }
      // CFLAG:TARGET:343  = 1（变量语义：CFLAG 族，TARGET:343）
      kojo.针 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.针 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呀${heart(1)} 啊哈啊…主人…被刺得好舒服${heart(1)}」`,
        );
        await era.printAndWait(`针刺带来的疼痛让${target_name}感到心醉神迷。`);
        await era.printAndWait(
          `「被刺得好舒服…啊…主人的针…好舒服噢${heart(1)}」`,
        );
        // CFLAG:TARGET:343  = 9（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呀${heart(1)} 啊哈啊…主人…被刺得好舒服${heart(1)}」`,
        );
        await era.printAndWait(`针刺带来的疼痛让${target_name}感到心醉神迷………`);
        // CFLAG:TARGET:343  = 8（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.针 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「主人…啊…好、好痛啊…」`);
        await era.printAndWait(
          `${target_name}流着泪向${player_name}请求原谅………`,
        );
        // CFLAG:TARGET:343  = 7（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 7;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.针 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呜咕…啊…嗯…更加多地…刺我把…主人${heart(1)}」`,
        );
        await era.printAndWait(`针刺带来的疼痛让${target_name}感到心醉神迷。`);
        await era.printAndWait(
          `「让、让我…更加…多地…领受主人赐予的疼痛吧${heart(1)}」`,
        );
        // CFLAG:TARGET:343  = 6（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呜咕…啊…嗯…更加多地…刺我把…主人${heart(1)}」`,
        );
        await era.printAndWait(`针刺带来的疼痛让${target_name}感到心醉神迷………`);
        // CFLAG:TARGET:343  = 5（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.针 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「住、住手…主人…我、我…什么坏事都没做啊…」`);
        await era.printAndWait(
          `${target_name}流着泪向${player_name}请求原谅………`,
        );
        // CFLAG:TARGET:343  = 4（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊…真的…好痛…啊…啊啊呜」`);
        await era.printAndWait(
          `${target_name}被刺得鲜血直流、发出带着哭音的喘息。`,
        );
        await era.printAndWait(`「哈…哈…啊呜…嗯…呀」`);
        // CFLAG:TARGET:343  = 3（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 3;
      } else if (kojo.针 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「对不起、对不起、请原谅我把…真的好痛啊………！」`,
        );
        await era.printAndWait(`${target_name}被刺得鲜血直流、哭喊着………`);
        // CFLAG:TARGET:343  = 2（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 43 && era.get(`tequip:${target}:43`)) {
    if (kojo.眼罩 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「不、不要…戴上这个会被做奇怪的事情的吧？…………呜呼呼、来吧${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「啊嗯…不要…好害怕………」`);
      } else {
        await era.printAndWait(`「住、住手啊…不要做奇怪的事啊………」`);
      }
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344）
      kojo.眼罩 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「不、不要…戴上这个会被做奇怪的事情的吧？…………呜呼呼、来吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边用舌头舔了舔嘴唇一边戴上了眼罩………`,
        );
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「一边舔嘴唇一边被戴上眼罩」`);
        await era.printAndWait(`${target_name}带上了眼罩………`);
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.眼罩 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「不、不要…戴上这个会被做奇怪的事情的吧？…………呜呼呼、来吧${heart(1)}」`,
        );
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 7;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊嗯…不要…好害怕………」`);
        await era.printAndWait(
          `${target_name}一边用舌头舔了舔嘴唇一边戴上了眼罩………`,
        );
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊嗯…不要…好害怕………」`);
        await era.printAndWait(`${target_name}戴上了眼罩………`);
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.眼罩 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊嗯…不要…好害怕………」`);
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「住、住手啊…不要做、做、奇怪的事啊………」`);
        await era.printAndWait(`${target_name}带上了眼罩………`);
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 3;
      } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「住、住手啊…不要做奇怪的事啊………」`);
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
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.眼罩着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「哈…哈…呜嗯………」`);
      // CFLAG:380  = 3（变量语义：CFLAG 族，380）
      kojo.眼罩着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.眼罩着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「哈…哈…主人………」`);
      // CFLAG:380  = 2（变量语义：CFLAG 族，380）
      kojo.眼罩着脱 = 2;
    } else if (kojo.眼罩着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「哈…哈…终于摘下来了…」`);
      // CFLAG:380  = 1（变量语义：CFLAG 族，380）
      kojo.眼罩着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 44 && era.get(`tequip:${target}:44`)) {
    if (kojo.绳子 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「嗯~…啊~…嗯啊嗯~…好紧啊呜………」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「好、好可怕啊…请不要…弄得太紧了………」`);
      } else {
        await era.printAndWait(`「啊~…啊啊~…不要…不要了啊…不要啊…」`);
      }
      // CFLAG:TARGET:345  = 1（变量语义：CFLAG 族，TARGET:345）
      kojo.绳子 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.绳子 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `虽然${target_name}幼小的身躯被绳子给紧紧地捆绑住了、但是其紧缚的感觉让少女露出了舒服而荡漾的表情。`,
        );
        await era.printAndWait(
          `「主…人…俺、俺要…变得奇怪起来了啊${heart(1)}…只是被绑住而已…就好像要去了样子啊…${heart(1)}」`,
        );
        // CFLAG:TARGET:345  = 9（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `虽然${target_name}幼小的身躯被绳子给紧紧地捆绑住了、但是其紧缚的感觉让少女身体蠢蠢欲动起来了。`,
        );
        await era.printAndWait(
          `「啊~啊啊~…主人~…绑得…更加地紧也可以噢…绳子…勒进肉里面也可以噢…${heart(1)}」`,
        );
        // CFLAG:TARGET:345  = 8（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.绳子 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}幼小的身躯被绳子给紧紧地捆绑住了、呼出炽热的喘息的同时不停的娇喘着。`,
        );
        await era.printAndWait(
          `「哈啊啊~${heart(1)}…主人…做更多…H的事情吧~…${heart(1)}」`,
        );
        // CFLAG:TARGET:345  = 7（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 7;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.绳子 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…主人~${heart(1)} 更加用力的绑住俺吧，将俺的身心都绑住吧~${heart(1)}」`,
        );
        await era.printAndWait(
          `被绳子紧紧绑住的同时还被让其保持正坐的姿态，${target_name}如同狗一样将舌头伸出来向${player_name}献媚起来了………`,
        );
        // CFLAG:TARGET:345  = 6（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊…哈啊…主人~${heart(1)} 主人~${heart(1)} 绳子…勒进去了呜~………${heart(1)}」`,
        );
        await era.printAndWait(
          `被绳子紧紧绑住的同时还被让其保持正坐的姿态，${target_name}的两条大腿在不断地互相摩擦着………`,
        );
        // CFLAG:TARGET:345  = 5（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.绳子 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊…哈啊…好、好可怕啊…主人…将这个绳子解开吧……」`,
        );
        await era.printAndWait(
          `被绳子紧紧绑住的同时还被让其保持正坐的姿态，${target_name}一脸难受的表情请求着原谅………`,
        );
        // CFLAG:TARGET:345  = 4（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊~…被绑得那么紧的话…哈啊…啊啊啊…」`);
        await era.printAndWait(
          `${target_name}幼小的身躯被紧紧地捆绑住并且被推到在了地板上、而这个少女则因为绳子勒进肉的感觉而不断喘息着………`,
        );
        // CFLAG:TARGET:345  = 3（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 3;
      } else if (kojo.绳子 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊~…啊啊~…不要啊…不要啦啊…拜托了不要啊…」`);
        await era.printAndWait(
          `幼小的身躯被紧紧地捆绑住并且被推到在了地板上、${target_name}因为恐怖而颤抖着………`,
        );
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
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.绳子着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「哈啊~…好辛苦来的啊………」`);
      await era.printAndWait(
        `${target_name}被解开绳子后就露出了放了一口气的表情………`,
      );
      if (era.get(`abl:${target}:21`) >= 3) {
        await era.printAndWait(
          `………然而、${player_name}并没有看漏沾在那绳子上粘嗒嗒的爱液。`,
        );
      }
      // CFLAG:385  = 3（变量语义：CFLAG 族，385）
      kojo.绳子着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊啊…痕迹还留着呢………」`);
      await era.printAndWait(
        `${target_name}被解开绳子后就露出了放了一口气的表情………`,
      );
      if (era.get(`abl:${target}:21`) >= 3) {
        await era.printAndWait(
          `………然而、${player_name}并没有看漏沾在那绳子上粘嗒嗒的爱液。`,
        );
      }
      // CFLAG:385  = 2（变量语义：CFLAG 族，385）
      kojo.绳子着脱 = 2;
    } else if (kojo.绳子着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「哈啊…哈啊…」`);
      await era.printAndWait(
        `${target_name}被解开绳子后就露出了放了一口气的表情………`,
      );
      if (era.get(`abl:${target}:21`) >= 3) {
        await era.printAndWait(
          `………然而、${player_name}并没有看漏这个少女因为感到不足而发出了叹息的这件事。`,
        );
      }
      // CFLAG:385  = 1（变量语义：CFLAG 族，385）
      kojo.绳子着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 45 && era.get(`tequip:${target}:45`)) {
    if (kojo.口塞 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「嗯唔嗯呜呜~…${heart(1)}」`);
        await era.printAndWait(
          `被戴上口枷后，${target_name}就一脸恍惚地表情看着${player_name}………`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「哈呜噗…嗯…嗯哼唔…哼唔…${heart(1)}」`);
        await era.printAndWait(
          `被戴上口枷后，${target_name}就一脸恍惚地表情看着${player_name}………`,
        );
      } else {
        await era.printAndWait(`「等、不、不要…嗯…嗯呜唔呜…………」`);
        await era.printAndWait(
          `被戴上口枷后，${target_name}就一脸恍惚地表情看着${player_name}………`,
        );
      }
      // CFLAG:TARGET:346  = 1（变量语义：CFLAG 族，TARGET:346）
      kojo.口塞 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.口塞 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「嗯唔呜噗嗯~…${heart(1)}」`);
        await era.printAndWait(
          `被戴上口枷后，${target_name}就一脸恍惚地表情看着${player_name}………`,
        );
        await era.printAndWait(
          `是因为变得兴奋了吗、口水从口枷的缝隙间滴落下来………`,
        );
        // CFLAG:TARGET:346  = 9（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「嗯唔呜噗嗯~…${heart(1)}」`);
        await era.printAndWait(
          `被戴上口枷后，${target_name}就一脸恍惚地表情看着${player_name}………`,
        );
        // CFLAG:TARGET:346  = 8（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.口塞 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「嗯唔呜噗嗯~…${heart(1)}」`);
        await era.printAndWait(
          `被戴上口枷后，${target_name}就一脸恍惚地表情看着${player_name}………`,
        );
        // CFLAG:TARGET:346  = 7（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 7;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.口塞 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈呜噗…嗯…嗯哼唔…哼唔${heart(1)}」`);
        await era.printAndWait(
          `被戴上口枷后，${target_name}就一脸恍惚地表情看着${player_name}………`,
        );
        await era.printAndWait(
          `是因为变得兴奋了吗、口水从口枷的缝隙间滴落下来………`,
        );
        // CFLAG:TARGET:346  = 6（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈呜噗…嗯…嗯哼唔…哼唔…${heart(1)}」`);
        await era.printAndWait(
          `被戴上口枷后，${target_name}就一脸恍惚地表情看着${player_name}………`,
        );
        // CFLAG:TARGET:346  = 5（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.口塞 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈呜噗…嗯…嗯哼唔…哼唔…${heart(1)}」`);
        await era.printAndWait(
          `被戴上口枷后，${target_name}就一脸恍惚地表情看着${player_name}………`,
        );
        // CFLAG:TARGET:346  = 4（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊唔~…嗯~…嗯噗呜…哼唔………」`);
        await era.printAndWait(
          `被戴上口枷后，${target_name}就一脸恍惚地样子了………`,
        );
        // CFLAG:TARGET:346  = 3（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 3;
      } else if (kojo.口塞 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「等、不、不要…嗯…嗯呜唔呜…………」`);
        await era.printAndWait(
          `被戴上口枷后，${target_name}流着眼泪眺望着这边………`,
        );
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
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.口塞着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「嗯呸啊………哈啊…哈啊…」`);
      // CFLAG:386  = 3（变量语义：CFLAG 族，386）
      kojo.口塞着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.口塞着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「嗯啊啊啊…帮俺将口水擦掉吧…${heart(1)}」`);
      // CFLAG:386  = 2（变量语义：CFLAG 族，386）
      kojo.口塞着脱 = 2;
    } else if (kojo.口塞着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「咳~…咳咳~…再、再也不要了………」`);
      // CFLAG:386  = 1（变量语义：CFLAG 族，386）
      kojo.口塞着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 46 && era.get(`tequip:${target}:46`)) {
    if (kojo.灌肠肛塞 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「啊呜呜…肚子变得好难受…好难受啊…」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「啊呜呜~…俺会忍耐的…会忍耐的啦啊~…！」`);
      } else {
        await era.printAndWait(`「呀啊~…唔~…啊呜呜~…肚子好难受~…好难受啊………」`);
      }
      // CFLAG:TARGET:347  = 1（变量语义：CFLAG 族，TARGET:347）
      kojo.灌肠肛塞 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.灌肠肛塞 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「更多~…灌到极限肚子变得满满的也可以噢………${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}虽然被灌进了大量的灌肠液、然而肛门带来的快感超越了疼痛，少女变得恍惚了起来。`,
        );
        await era.printAndWait(
          `「哈啊哈啊…啊哈啊…${heart(1)} 做更多的…H的事情吧~…俺是主人的东西来的啦~…啊啊嗯~${heart(1)}」`,
        );
        await era.printAndWait(
          `断断续续的肛门快感所带来的刺激让${target_name}的脑内变得荡漾起来了，少女一脸恍惚地诱惑起了${player_name}………`,
        );
        // CFLAG:347  = 7（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.灌肠肛塞 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯哼唔~…肚子变得好奇怪…不、不行了噢…再这样下去的话………」`,
        );
        await era.printAndWait(
          `${target_name}因为灌肠所带来的异常的腹痛和便意而变得奇怪起来了。`,
        );
        await era.printAndWait(
          `「啊啊~…但是就这样…对俺做更加下流的事情吧~………${heart(1)}」`,
        );
        // CFLAG:347  = 6（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.灌肠肛塞 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊哈啊~${heart(1)} 肚、肚子里…变得满满的了噢~…啊、啊啊啊………${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}虽然被灌进了大量的灌肠液、然而肛门带来的快感超越了疼痛，少女变得恍惚了起来。`,
        );
        await era.printAndWait(
          `「啊嗯~…塞子被紧紧地塞进去了啊${heart(1)}…啊哈啊~…啊啊~…还不能排出来吗？」`,
        );
        // CFLAG:347  = 5（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.灌肠肛塞 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊~…哈啊~…不、不行了啊…这、这样的…肚子…变奇怪了啊~」`,
        );
        await era.printAndWait(
          `${target_name}因为灌肠所带来的异常的腹痛和便意而变得奇怪起来了。`,
        );
        await era.printAndWait(
          `「啊啊啊~…主人…啊、那种地方…不想让主人看到啊…真的不想被看到啦~！」`,
        );
        // CFLAG:347  = 4（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.灌肠肛塞 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊~…屁、屁股烧起来呜呜~…啊啊~…啊啊啊啊~」`,
        );
        await era.printAndWait(
          `${target_name}因为被灌进了大量的灌肠液而露出了一脸恍惚的神情。`,
        );
        await era.printAndWait(
          `「啊哈啊啊~…这、这样子…被灌进那么多的话…俺、俺已经…已经…变得奇怪起来了………」`,
        );
        // CFLAG:347  = 3（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 3;
      } else if (kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「已…已经不行了啊~…原谅俺吧~………！」`);
        await era.printAndWait(
          `${target_name}的肛门被塞进了塞子、正在一跳一跳地痉挛着。`,
        );
        await era.printAndWait(`「呀~…唔~…啊呜呜~…肚子好难受…好难受啊啊~………」`);
        // CFLAG:347  = 2（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 55) {
    if (kojo.放置PLAY === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「俺被做怎样的事情…都完全没问题的噢…♪」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「就像平常那样…对、对俺做点什么吧………」`);
      } else {
        await era.printAndWait(`「不、不要看着这边啊…~！」`);
      }
      await era.print('');

      if (era.get(`tequip:${target}:11`)) {
        await era.printAndWait(
          `${target_name}的小穴内有蠕虫在蠕动着、它在腔内毫不留情来回钻着。`,
        );
      }

      if (era.get(`tequip:${target}:13`)) {
        await era.printAndWait(
          `${target_name}的直肠里有蠕虫在蠕动着、它毫不留情地蹂蹑着少女的肛门。`,
        );
      }

      if (era.get(`tequip:${target}:19`)) {
        await era.printAndWait(
          `${target_name}的肛门里被塞进了钢珠、少女的肛门在一抽一抽地抖动着。`,
        );
      }

      if (era.get(`tequip:${target}:14`)) {
        await era.printAndWait(
          `${target_name}的阴蒂正带着电动阴蒂夹在给予着阴蒂刺激中。`,
        );
      }

      if (era.get(`tequip:${target}:15`)) {
        await era.printAndWait(
          `${target_name}的乳头正带着乳头夹在给予着乳头刺激中。`,
        );
      }

      if (era.get(`tequip:${target}:16`)) {
        await era.print(
          `${target_name}的胸部被戴上了榨乳器，榨乳器正不断地吸出母乳中。`,
        );
      }

      if (era.get(`tequip:${target}:17`)) {
        await era.printAndWait(
          `${target_name}的阴茎被套上了飞机杯，而且好像现在就要射精一样抽动着。`,
        );
      }

      if (era.get(`tequip:${target}:43`)) {
        await era.printAndWait(`${target_name}被戴上了眼罩。`);
      }

      if (era.get(`tequip:${target}:44`)) {
        await era.printAndWait(`${target_name}的身体被绳子给捆绑着。`);
      }

      if (era.get(`tequip:${target}:46`)) {
        await era.printAndWait(
          `${target_name}的肚子因为灌肠液而发出了咕噜咕噜的声音、如果将塞子拔掉的话可能会立马就会喷出来的样子。`,
        );
      }

      if (era.get(`tequip:${target}:49`)) {
        await era.printAndWait(
          `${target_name}的肛门塞进了电极棒、每当轻轻的电流流过的时候括约肌就会抖动一下。`,
        );
      }

      if (era.get(`tequip:${target}:53`)) {
        await era.printAndWait(`接着、${target_name}这样的姿态始终被录像着………`);
      }
      // CFLAG:356  = 1（变量语义：CFLAG 族，356）
      kojo.放置PLAY = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`palam:${target}:5`) >= PALAMLV[3] &&
        (kojo.放置PLAY <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「主人~…不要玩弄俺啦…真、真是的…已经要变得奇怪起来了啊~………！」`,
        );
        await era.printAndWait(
          `${target_name}的两条大腿互相摩擦着、一脸十分难受的看着这边………`,
        );
        // CFLAG:356  = 6（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.放置PLAY <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「俺被做怎样的事情…都完全没问题的噢…♪」`);
        // CFLAG:356  = 5（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`palam:${target}:5`) >= PALAMLV[3] &&
        (kojo.放置PLAY <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「唔啊…嗯…什、什么都没有啦~…不、不要看这边啦………！」`,
        );
        await era.printAndWait(
          `${target_name}两腿蹭来蹭去并用双手按住了两腿之间的样子………`,
        );
        // CFLAG:356  = 4（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.放置PLAY <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「就像平常那样…对、对俺做点什么吧………」`);
        // CFLAG:356  = 3（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 3;
      } else if (kojo.放置PLAY <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「不、不要看着这边啊…~！」`);
        // CFLAG:356  = 2（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 2;
      }
      await era.print('');

      if (era.get(`tequip:${target}:11`)) {
        await era.printAndWait(
          `${target_name}的小穴内有蠕虫在蠕动着、它在腔内毫不留情来回钻着。`,
        );
      }

      if (era.get(`tequip:${target}:13`)) {
        await era.printAndWait(
          `${target_name}的直肠里有蠕虫在蠕动着、它毫不留情地蹂蹑着少女的肛门。`,
        );
      }

      if (era.get(`tequip:${target}:19`)) {
        await era.printAndWait(
          `${target_name}的肛门里被塞进了钢珠、少女的肛门在一抽一抽地抖动着。`,
        );
      }

      if (era.get(`tequip:${target}:14`)) {
        await era.printAndWait(
          `${target_name}的阴蒂正带着电动阴蒂夹在给予着阴蒂刺激中。`,
        );
      }

      if (era.get(`tequip:${target}:15`)) {
        await era.printAndWait(
          `${target_name}的乳头正带着乳头夹在给予着乳头刺激中。`,
        );
      }

      if (era.get(`tequip:${target}:16`)) {
        await era.print(
          `${target_name}的胸部被戴上了榨乳器，榨乳器正不断地吸出母乳中。`,
        );
      }

      if (era.get(`tequip:${target}:17`)) {
        await era.printAndWait(
          `${target_name}的阴茎被套上了飞机杯，而且好像现在就要射精一样抽动着。`,
        );
      }

      if (era.get(`tequip:${target}:43`)) {
        await era.printAndWait(`${target_name}被戴上了眼罩。`);
      }

      if (era.get(`tequip:${target}:44`)) {
        await era.printAndWait(`${target_name}的身体被绳子给捆绑着。`);
      }

      if (era.get(`tequip:${target}:46`)) {
        await era.printAndWait(
          `${target_name}的肚子因为灌肠液而发出了咕噜咕噜的声音、如果将塞子拔掉的话可能会立马就会喷出来的样子。`,
        );
      }

      if (era.get(`tequip:${target}:49`)) {
        await era.printAndWait(
          `${target_name}的肛门塞进了电极棒、每当轻轻的电流流过的时候括约肌就会抖动一下。`,
        );
      }

      if (era.get(`tequip:${target}:53`)) {
        await era.printAndWait(`接着、${target_name}这样的姿态始终被录像着………`);
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 56) {
    if (kojo.交谈 === 0) {
      if (era.get(`tequip:${target}:53`) === 1) {
        await era.print(`${player_name}催促着${target_name}进行自我介绍、`);
        if (
          era.get(`talent:${target}:89`) ||
          era.get(`abl:${target}:17`) >= 5
        ) {
          // 原作是一整行：无后缀 PRINTFORM 连续不换行，末行
          // PRINTFORML 才收行。SIF ABL:31 >= 3 只护住 :4797 那一段——判据提到
          // 语句外当取值，文本留在输出语句里（#625）
          const masturbation_note = era.get(`abl:${target}:31`) >= 3;
          await era.print(
            `${target_name}将自己的本名和接下来要进行的性体验` +
              (masturbation_note ? `、甚至是连自慰时妄想的事情` : '') +
              `十分欣喜地全部说了出来……`,
          );
          await era.print(
            `只因为想象着这个水晶球会散布在村子里，少女的股间就变得湿润起来了……`,
          );
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) || era.get(`abl:${target}:11`) >= 5)
        ) {
          await era.print(`${target_name}面向水晶说起了淫猥的话语`);
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`talent:${target}:85`) ||
          era.get(`abl:${target}:10`) >= 3 ||
          era.get(`abl:${target}:11`) >= 4 ||
          era.get(`abl:${target}:17`) >= 2
        ) {
          await era.print(`${target_name}对着水晶球进行了自我介绍`);
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else {
          await era.printAndWait(`哭泣着对着水晶球请求帮助………`);
          await era.printAndWait(`「姐姐救救我吧…好想快点回到村子里去啊………」`);
        }
      } else {
        // 的 `PRINTFORM %SAVESTR:PLAYER%` 是下面各互斥分支共同的前缀行
        // （无后缀不换行，各支的 PRINTFORML 才收行）。前缀提到语句外当局部量、
        // 各支语句拼同一份前缀，玩家在每一支上都只看一行；前缀行归第一支的
        // 拼接锚（普查的「前缀 + 文本序第一支」组要能清），其余各支只锚自己的
        // 行号（#625，同 k7 的 talk_front 写法）
        const maid_front = `${player_name}`;
        if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:85`) ||
            era.get(`abl:${target}:10`) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(
            `${player_name}向少女搭话后、${target_name}晃动着腰部说起了充满爱意的话语`,
          );
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) ||
            era.get(`abl:${target}:11`) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(
            maid_front +
              `向少女搭话后、${target_name}一边晃着腰一边不停地说着下流的话语`,
          );
        } else if (
          (era.get(`palam:${target}:4`) >= PALAMLV[4] ||
            era.get(`abl:${target}:10`) >= 5 ||
            era.get(`talent:${target}:85`)) &&
          era.get(`palam:${target}:5`) >= PALAMLV[4]
        ) {
          // 同属 :4812 那一行的另一支：工具档两档互斥
          // 且无 ELSE——判据提到语句外当取值，文本留在输出语句里（#625）
          const overwhelmed_by_tool =
            era.get(`tequip:${target}:11`) ||
            era.get(`tequip:${target}:13`) ||
            era.get(`tequip:${target}:14`) ||
            era.get(`tequip:${target}:15`) ||
            era.get(`tequip:${target}:16`) ||
            era.get(`tequip:${target}:17`);
          const overwhelmed_by_pain =
            era.get(`tequip:${target}:44`) || era.get(`tequip:${target}:49`);
          await era.print(
            maid_front +
              `向少女搭话后、${target_name}发出了` +
              (overwhelmed_by_tool
                ? `快乐的`
                : overwhelmed_by_pain
                  ? `痛苦的`
                  : '') +
              `的声音、拼命地向着${player_name}说了起来`,
          );
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[4] ||
          era.get(`talent:${target}:85`) ||
          era.get(`abl:${target}:10`) >= 5
        ) {
          await era.print(
            maid_front +
              `向少女搭话后、${target_name}如同打发无聊一样发起了牢骚`,
          );
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[2] ||
          era.get(`abl:${target}:10`) >= 3
        ) {
          await era.print(
            maid_front + `向少女搭话后、${target_name}一点一点地说起了话`,
          );
        } else {
          await era.print(
            maid_front +
              `向少女搭话后、${target_name}根本没有听进耳朵里的样子…`,
          );
        }
      }
      // CFLAG:357  = 1（变量语义：CFLAG 族，357）
      kojo.交谈 = 1;
      return 0;
    } else {
      if (era.get(`tequip:${target}:53`) === 1) {
        await era.print(`${player_name}催促着${target_name}进行自我介绍、`);
        if (
          era.get(`talent:${target}:89`) ||
          era.get(`abl:${target}:17`) >= 5
        ) {
          // 同 :4795 组的一整行（#625）
          const masturbation_note = era.get(`abl:${target}:31`) >= 3;
          await era.print(
            `${target_name}将自己的本名和接下来要进行的性体验` +
              (masturbation_note ? `、甚至是连自慰时妄想的事情` : '') +
              `十分欣喜地全部说了出来……`,
          );
          await era.print(
            `只因为想象着这个水晶球会散布在村子里，少女的股间就变得湿润起来了……`,
          );
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) || era.get(`abl:${target}:11`) >= 5)
        ) {
          await era.print(`${target_name}面向水晶说起了淫猥的话语`);
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`talent:${target}:85`) ||
          era.get(`abl:${target}:10`) >= 3 ||
          era.get(`abl:${target}:11`) >= 4 ||
          era.get(`abl:${target}:17`) >= 2
        ) {
          await era.print(`${target_name}对着水晶球进行了自我介绍`);
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else {
          await era.printAndWait(`哭泣着对着水晶球请求帮助………`);
          await era.printAndWait(`「姐姐救救我吧…好想快点回到村子里去啊………」`);
        }
      } else {
        // 同 :4812：前缀行 + 各互斥分支的收行尾段（#625）
        const maid_front_4858 = `${player_name}`;
        if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:85`) ||
            era.get(`abl:${target}:10`) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(
            `${player_name}向少女搭话后，${target_name}晃动着腰部说起了充满爱意的话语`,
          );
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) ||
            era.get(`abl:${target}:11`) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(
            maid_front_4858 +
              `向少女搭话后，${target_name}一边晃着腰一边不停地说着下流的话语`,
          );
        } else if (
          (era.get(`palam:${target}:4`) >= PALAMLV[4] ||
            era.get(`abl:${target}:10`) >= 5 ||
            era.get(`talent:${target}:85`)) &&
          era.get(`palam:${target}:5`) >= PALAMLV[4]
        ) {
          // 同属 :4858 那一行的另一支（#625）
          const overwhelmed_by_tool =
            era.get(`tequip:${target}:11`) ||
            era.get(`tequip:${target}:13`) ||
            era.get(`tequip:${target}:14`) ||
            era.get(`tequip:${target}:15`) ||
            era.get(`tequip:${target}:16`) ||
            era.get(`tequip:${target}:17`);
          const overwhelmed_by_pain =
            era.get(`tequip:${target}:44`) || era.get(`tequip:${target}:49`);
          await era.print(
            maid_front_4858 +
              `向少女搭话后，${target_name}发出了` +
              (overwhelmed_by_tool
                ? `快乐的`
                : overwhelmed_by_pain
                  ? `痛苦的`
                  : '') +
              `的声音、拼命地向着${player_name}说了起来`,
          );
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[4] ||
          era.get(`talent:${target}:85`) ||
          era.get(`abl:${target}:10`) >= 5
        ) {
          await era.print(
            maid_front_4858 +
              `向少女搭话后，${target_name}如同打发无聊一样发起了牢骚`,
          );
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[2] ||
          era.get(`abl:${target}:10`) >= 3
        ) {
          await era.print(
            maid_front_4858 + `向少女搭话后，${target_name}十分胆怯地说起了话`,
          );
        } else {
          await era.print(
            maid_front_4858 +
              `向少女搭话后，${target_name}根本没有听进耳朵里的样子…`,
          );
        }
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 123) {
    if (kojo.乳夹口交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊嗯~…俺会好好地侍奉的…胸部也好嘴巴也好都是主人的东西来的噢${heart(1)}」`,
        );
        if (era.get(`talent:${target}:109`)) {
          await era.printAndWait(
            `「嗯啾呜~…啊啊嗯~${heart(1)}…要来了啊…更加的蹭一下吧~…啊唔呜~…啾唔~啾唔呜~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一脸荡漾地、往用胸部摩擦着的阴茎的前端不断地亲吻着………`,
          );
        } else if (era.get(`talent:${target}:110`)) {
          await era.printAndWait(
            `「啊哈啊…大大的胸部被侵犯着…还在吮吸着${heart(1)}…好好吃啊~…啊呜呜~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一脸荡漾地、对被巨乳夹着的阴茎进行着口腔侍奉………`,
          );
        } else if (era.get(`talent:${target}:114`)) {
          await era.printAndWait(
            `「得要给在侵犯俺这个超大的胸部的阴茎好好地侍奉才可以呢${heart(1)}…啊嗯呜…嗯呜~嗯~嗯嗯~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一脸荡漾地、对埋在爆乳里的阴茎进行着口腔侍奉………`,
          );
        } else {
          await era.printAndWait(
            `「嗯~…啊啊...能用胸部夹住来侍奉好高兴啊~${heart(1)} 啊呜嗯~…啾呜呜~啾~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一脸荡漾地、用胸部夹住阴茎进行着口腔侍奉………`,
          );
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「嗯啾呜~…变得舒服起来吧~…主人的大鸡巴…最喜欢了…${heart(1)}」`,
        );
        if (era.get(`talent:${target}:109`)) {
          await era.printAndWait(
            `「啊啊嗯~…胸部被一蹭一蹭地呢${heart(1)}…嗯啾~…啾~…啾呜呜~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一脸恍惚地、往用胸部摩擦着的阴茎的前端不断地亲吻着………`,
          );
        } else if (era.get(`talent:${target}:110`)) {
          await era.printAndWait(
            `「哈呜呜嗯~…胸部好烫啊~${heart(1)}…主人的大鸡巴…好热啊…啊嗯~…啾唔~啾唔~…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一脸恍惚地、对被巨乳夹着的阴茎进行着口腔侍奉………`,
          );
        } else if (era.get(`talent:${target}:114`)) {
          await era.printAndWait(
            `「啊哈~…埋进俺的胸部里了呢${heart(1)}…但是看吧…这样做的话就可以看见胸部了…啊唔呜~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一脸恍惚地、对埋在爆乳里的阴茎进行着口腔侍奉………`,
          );
        } else {
          await era.printAndWait(
            `「哈啊…哈啊…俺的胸部…舒服吗？ 嗯呜嗯啾呜~${heart(1)}…哈唔…嗯~嗯嗯~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一脸恍惚地、用胸部夹住阴茎进行着口腔侍奉………`,
          );
        }
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「嗯~…唔、唔嗯…用俺的胸部和嘴巴…变得舒服起来吧~………啾唔~…啾唔~」`,
        );
        if (era.get(`talent:${target}:109`)) {
          await era.printAndWait(
            `${target_name}一脸很高兴的样子往用胸部摩擦着的阴茎的前端不断地亲吻着………`,
          );
        } else if (era.get(`talent:${target}:110`)) {
          await era.printAndWait(
            `「啊啊~…嗯啾呜~…啾噗呜~…啾~啾唔~…啾啪哈啊~…胸部也…好舒服噢~………」`,
          );
          await era.printAndWait(
            `${target_name}一脸很高兴的样子对被巨乳夹着的阴茎进行着口腔侍奉………`,
          );
        } else if (era.get(`talent:${target}:114`)) {
          await era.printAndWait(`「啾~…啾呜呜~…只能品尝前面一点而已啊………」`);
          await era.printAndWait(
            `${target_name}一脸很高兴的样子对埋在爆乳里的阴茎进行着口腔侍奉………`,
          );
        } else {
          await era.printAndWait(
            `${target_name}一脸很高兴的样子用胸部夹住阴茎进行着口腔侍奉………`,
          );
        }
      } else {
        await era.printAndWait(
          `「啊呜呜…不要将俺的胸部当成玩具啊………啊啊…呸咯…啾~…啊唔呜………」`,
        );
        if (era.get(`talent:${target}:109`)) {
          await era.printAndWait(
            `${target_name}往用胸部摩擦着的阴茎的前端不断地亲吻着………`,
          );
        } else if (era.get(`talent:${target}:110`)) {
          await era.printAndWait(
            `「我的大胸部…才不是为了这种事情而存在的…嗯呜呜呜………」`,
          );
          await era.printAndWait(
            `${target_name}一脸悲伤地对被巨乳夹着的阴茎进行着口腔侍奉………`,
          );
        } else if (era.get(`talent:${target}:114`)) {
          await era.printAndWait(`「不要再将我的大胸部当成玩具了啊………」`);
          await era.printAndWait(
            `${target_name}一脸悲伤地对埋在爆乳里的阴茎进行着口腔侍奉………`,
          );
        } else {
          await era.printAndWait(
            `${target_name}一脸悲伤地胸用胸部夹住阴茎进行着口腔侍奉………`,
          );
        }
      }
      // CFLAG:TARGET:360  = 1（变量语义：CFLAG 族，TARGET:360）
      kojo.乳夹口交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.乳夹口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊嗯~…俺会好好的侍奉的…胸部也好嘴巴也好都是主人的东西来的噢${heart(1)}」`,
        );
        if (era.get(`talent:${target}:109`)) {
          await era.printAndWait(
            `「嗯啾呜~…啊啊嗯~${heart(1)}…要来了啊…更加的蹭一下吧~…啊唔呜~…啾唔~啾唔呜~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一脸荡漾地、往用胸部摩擦着的阴茎的前端不断地亲吻着………`,
          );
        } else if (era.get(`talent:${target}:110`)) {
          await era.printAndWait(
            `「啊哈啊…大大的胸部被侵犯着…还在吮吸着${heart(1)}…好好吃啊~…啊呜呜~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一脸荡漾地、对被巨乳夹着的阴茎进行着口腔侍奉………`,
          );
        } else if (era.get(`talent:${target}:114`)) {
          await era.printAndWait(
            `「得要给在侵犯俺这个超大的胸部的阴茎好好地侍奉才可以呢${heart(1)}…啊嗯呜…嗯呜~嗯~嗯嗯~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一脸荡漾地、对埋在爆乳里的阴茎进行着口腔侍奉………`,
          );
        } else {
          await era.printAndWait(
            `「嗯~…啊啊...能用胸部夹住来侍奉好高兴啊~${heart(1)} 啊呜嗯~…啾呜呜~啾~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一脸荡漾地、用胸部夹住阴茎进行着口腔侍奉………`,
          );
        }
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          // CFLAG:360  = 5（变量语义：CFLAG 族，360）
          kojo.乳夹口交 = 5;
        }
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.乳夹口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯啾呜~…变得舒服起来吧~…主人的大鸡巴…最喜欢了…${heart(1)}」`,
        );
        if (era.get(`talent:${target}:109`)) {
          await era.printAndWait(
            `「啊啊嗯~…胸部被一蹭一蹭地呢${heart(1)}…嗯啾~…啾~…啾呜呜~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一脸恍惚地、往用胸部摩擦着的阴茎的前端不断地亲吻着………`,
          );
        } else if (era.get(`talent:${target}:110`)) {
          await era.printAndWait(
            `「哈呜呜嗯~…胸部好烫啊~${heart(1)}…主人的大鸡巴…好热啊…啊嗯~…啾唔~啾唔~…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一脸恍惚地、对被巨乳夹着的阴茎进行着口腔侍奉………`,
          );
        } else if (era.get(`talent:${target}:114`)) {
          await era.printAndWait(
            `「啊哈~…埋进俺的胸部里了呢${heart(1)}…但是看吧…这样做的话就可以看见胸部了…啊唔呜~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一脸恍惚地、对埋在爆乳里的阴茎进行着口腔侍奉………`,
          );
        } else {
          await era.printAndWait(
            `「哈啊…哈啊…俺的胸部…舒服吗？ 嗯呜嗯啾呜~${heart(1)}…哈唔…嗯~嗯嗯~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一脸恍惚地、用胸部夹住阴茎进行着口腔侍奉………`,
          );
        }
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.乳夹口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯~…唔、唔嗯…用俺的胸部和嘴巴…变得舒服起来吧~………啾唔~…啾唔~」`,
        );
        if (era.get(`talent:${target}:109`)) {
          await era.printAndWait(
            `${target_name}一脸很高兴的样子往用胸部摩擦着的阴茎的前端不断地亲吻着………`,
          );
        } else if (era.get(`talent:${target}:110`)) {
          await era.printAndWait(
            `「啊啊~…嗯啾呜~…啾噗呜~…啾~啾唔~…啾啪哈啊~…胸部也…好舒服噢~………」`,
          );
          await era.printAndWait(
            `${target_name}一脸很高兴的样子对被巨乳夹着的阴茎进行着口腔侍奉………`,
          );
        } else if (era.get(`talent:${target}:114`)) {
          await era.printAndWait(`「啾~…啾呜呜~…只能品尝前面一点而已啊………」`);
          await era.printAndWait(
            `${target_name}一脸很高兴的样子对埋在爆乳里的阴茎进行着口腔侍奉………`,
          );
        } else {
          await era.printAndWait(
            `${target_name}一脸很高兴的样子用胸部夹住阴茎进行着口腔侍奉………`,
          );
        }
        // CFLAG:360  = 3（变量语义：CFLAG 族，360）
        kojo.乳夹口交 = 3;
      } else if (kojo.乳夹口交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「啊呜呜…不要将俺的胸部当成玩具啊………啊啊…呸咯…啾~…啊唔呜………」`,
        );
        if (era.get(`talent:${target}:109`)) {
          await era.printAndWait(
            `${target_name}往用胸部摩擦着的阴茎的前端不断地亲吻着………`,
          );
        } else if (era.get(`talent:${target}:110`)) {
          await era.printAndWait(
            `「我的大胸部…才不是为了这种事情而存在的…嗯呜呜呜………」`,
          );
          await era.printAndWait(
            `${target_name}一脸悲伤地对被巨乳夹着的阴茎进行着口腔侍奉………`,
          );
        } else if (era.get(`talent:${target}:114`)) {
          await era.printAndWait(`「不要再将我的大胸部当成玩具了啊………」`);
          await era.printAndWait(
            `${target_name}一脸悲伤地对埋在爆乳里的阴茎进行着口腔侍奉………`,
          );
        } else {
          await era.printAndWait(
            `${target_name}一脸悲伤地胸用胸部夹住阴茎进行着口腔侍奉………`,
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
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「哈唔嗯…嗯唔嗯唔~…好吃~${heart(1)}…大鸡巴好好吃啊~${heart(1)}…俺的那里也…一抽地${heart(1)}好有感觉呢~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}十分欣喜地舔舐着${player_name}的阴茎同时、进行着激烈的自慰………`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「啊嗯唔…嗯呜…好好吃啊…大鸡巴~${heart(1)}…嗯~嗯嗯~…哈啊哈啊…啊啊~…大鸡巴~…好喜欢${heart(1)}…啾唔~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}十分欣喜地舔舐着${player_name}的阴茎同时、抚摸着自己的股间………`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「哈啊~…哈啊嗯~…嗯唔~…啾唔~…呸咯~…啊啊…好好地看一下我自慰的样子啦………」`,
        );
        await era.printAndWait(
          `${target_name}按照命令的那样吮吸着${player_name}的阴茎的同时、用手指摩擦着自己的股间………`,
        );
      } else {
        await era.printAndWait(
          `「啊呜嗯~…嗯啾呜…哈~…好的…俺会连口交也一起做的…嗯~…嗯唔呜………」`,
        );
        await era.printAndWait(
          `${target_name}按照命令的那样吮吸着${player_name}的阴茎的同时、用手指摩擦着自己的股间………`,
        );
      }
      // CFLAG:TARGET:361  = 1（变量语义：CFLAG 族，TARGET:361）
      kojo.口交时自慰 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.口交时自慰 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈唔嗯…嗯唔嗯唔~…好吃~${heart(1)}…大鸡巴好好吃啊~${heart(1)}…俺的那里也…一抽地${heart(1)}好有感觉呢~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}十分欣喜地舔舐着${player_name}的阴茎同时、进行着激烈的自慰………`,
        );
        if (era.get(`talent:${target}:0`) === 1) {
          await era.printAndWait(
            `「啊啊…快点将俺侵犯了嘛~${heart(1)}…好想要…大鸡巴啊~${heart(1)}…啊唔呜嗯~…啾噜~啾噜~…呸咯~${heart(1)}」`,
          );
        }
        // CFLAG:361  = 5（变量语义：CFLAG 族，361）
        kojo.口交时自慰 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.口交时自慰 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊嗯唔…嗯呜…好好吃啊…大鸡巴~${heart(1)}…嗯~嗯嗯~…哈啊哈啊…啊啊~…大鸡巴~…好喜欢${heart(1)}…啾唔~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}十分欣喜地舔舐着${player_name}的阴茎同时、抚摸着自己的股间………`,
        );
        if (era.get(`talent:${target}:0`) === 1) {
          await era.printAndWait(
            `「啊啊…嗯~…啊啊…主人…将俺的处女夺走了吧~${heart(1)}…已经要变得奇怪起来了啊…啊唔呜…嗯~嗯嗯~${heart(1)}」`,
          );
        }
        // CFLAG:361  = 4（变量语义：CFLAG 族，361）
        kojo.口交时自慰 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.口交时自慰 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊~…哈啊嗯~…嗯唔~…啾唔~…呸咯~…啊啊…好好地看一下我自慰的样子啦………」`,
        );
        await era.printAndWait(
          `${target_name}按照命令的那样吮吸着${player_name}的阴茎的同时、用手指摩擦着自己的股间………`,
        );
        // CFLAG:361  = 3（变量语义：CFLAG 族，361）
        kojo.口交时自慰 = 3;
      } else if (kojo.口交时自慰 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「啊呜嗯~…嗯啾呜…哈~…好的…俺会连口交也一起做的…嗯~…嗯唔呜………」`,
        );
        await era.printAndWait(
          `${target_name}按照命令的那样吮吸着${player_name}的阴茎的同时、用手指摩擦着自己的股间………`,
        );
        // CFLAG:361  = 2（变量语义：CFLAG 族，361）
        kojo.口交时自慰 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 126) {
    if (kojo.手搓口交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「大鸡巴…好好吃${heart(1)}…在俺的嘴巴里将精液都射进来吧…主人…${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「主人~…请变得更加舒服起来吧~${heart(1)} 嗯啾~…啾~…啊啊…变得那么硬起来了呀…${heart(1)}」`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「啊啊唔…嗯~…嗯噗呜~…这样…做的话…会变得…舒服起来的吗…？」`,
        );
      } else {
        await era.printAndWait(
          `「哈啊…哈啊…嗯啾~…啾唔~…好的、俺会…用手让你变得舒服…起来…的………」`,
        );
      }
      // CFLAG:TARGET:362  = 1（变量语义：CFLAG 族，TARGET:362）
      kojo.手搓口交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.手搓口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「大鸡巴…好好吃${heart(1)}…在俺的嘴巴里将精液都射进来吧…主人…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}用黏糊糊的舌头缠绕住并且用手撸起了阴茎。`,
        );
        await era.printAndWait(
          `「嗯啾呜呜~…感觉到大鸡巴一跳一跳的了呢${heart(1)}…俺会给主人好好地撸的啦…请变得更加舒服起来吧~${heart(1)}」`,
        );
        // CFLAG:362  = 5（变量语义：CFLAG 族，362）
        kojo.手搓口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.手搓口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「主人~…请变得更加舒服起来吧~${heart(1)} 嗯啾~…啾~…啊啊…变得那么硬起来了呀…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}用舌头缠绕住了龟头并且慢慢撸起了阴茎。`,
        );
        await era.printAndWait(
          `「啾~…啾唔~…啊啊唔…嗯噗~${heart(1)}…嗯呜呜…嗯噗呜…${heart(1)}」`,
        );
        // CFLAG:362  = 4（变量语义：CFLAG 族，362）
        kojo.手搓口交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手搓口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊唔…嗯~…嗯噗呜~…这样…做的话…会变得…舒服起来的吗…？」`,
        );
        await era.printAndWait(
          `${target_name}笨拙地伸出了手开始拼命地侍奉起来了………`,
        );
        // CFLAG:362  = 3（变量语义：CFLAG 族，362）
        kojo.手搓口交 = 3;
      } else if (kojo.手搓口交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「哈啊…哈啊…嗯啾~…啾唔~…好的、俺会…用手让你变得舒服…起来…的………」`,
        );
        await era.printAndWait(
          `${target_name}一边笨拙地用手上下撸着一边亲吻龟头前端………`,
        );
        // CFLAG:362  = 2（变量语义：CFLAG 族，362）
        kojo.手搓口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 127) {
    if (kojo.真空口交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「嗯啾噜呜~${heart(1)}…啾噗~啾噗~啾噗~…嗯噗呜呜${heart(1)}…呸咯…啾呜呜~…啊啊啊…用俺的嘴巴变得舒服起来吧~…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}嘟着小嘴、一边弄出下流的声响一边吮吸着${player_name}的阴茎。`,
        );
        await era.printAndWait(
          `「啊啊…大鸡巴~${heart(1)}…大鸡巴好好吃啊~…${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「嗯唔~噗唔~${heart(1)}…啾咯噗~…啾噗~${heart(1)}…嗯噗呜~…啾呜呜~啾噗~啾呜呜~啾噗~${heart(1)}…呸咯…嗯唔噗呜${heart(1)}」`,
        );
        await era.printAndWait(`「啊啊…主人的大鸡巴好好吃啊…${heart(1)}」`);
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「嗯啾噜~…啾噗~…啾噗~…嗯噗呜…啊啊…俺会…更加的吮吸的…所以请不要做恐怖的事情啦………」`,
        );
      } else {
        await era.printAndWait(
          `「嗯啾噜~…啾噗~…啾噗~…嗯噗呜…啊啊…为什么要俺做这样的事情…好、好的、俺会更加地吮吸的啦…」`,
        );
      }
      // CFLAG:TARGET:363  = 1（变量语义：CFLAG 族，TARGET:363）
      kojo.真空口交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.真空口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯啾噜呜~${heart(1)}…啾噗~啾噗~啾噗~…嗯噗呜呜${heart(1)}…呸咯…啾呜呜~…啊啊啊…用俺的嘴巴变得舒服起来吧~…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}嘟着小嘴、一边弄出下流的声响一边吮吸着${player_name}的阴茎。`,
        );
        await era.printAndWait(
          `「啊啊…大鸡巴~${heart(1)}…大鸡巴好好吃啊~…${heart(1)}」`,
        );
        // CFLAG:363  = 5（变量语义：CFLAG 族，363）
        kojo.真空口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.真空口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯唔~噗唔~${heart(1)}…啾咯噗~…啾噗~${heart(1)}…嗯噗呜~…啾呜呜~啾噗~啾呜呜~啾噗~${heart(1)}…呸咯…嗯唔噗呜${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}嘟着小嘴吮吸着${player_name}的阴茎。`,
        );
        await era.printAndWait(`「啊啊…主人的大鸡巴好好吃啊…${heart(1)}」`);
        // CFLAG:363  = 4（变量语义：CFLAG 族，363）
        kojo.真空口交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.真空口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯啾噜~…啾噗~…啾噗~…嗯噗呜…啊啊…俺会…更加的吮吸的…所以请不要做恐怖的事情啦………」`,
        );
        await era.printAndWait(
          `${target_name}因为自己嘴巴弄出的下流的声音而流着眼泪的情况下吮吸着………`,
        );
        // CFLAG:363  = 3（变量语义：CFLAG 族，363）
        kojo.真空口交 = 3;
      } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「嗯啾噜~…啾噗~…啾噗~…嗯噗呜…啊啊…为什么要俺做这样的事情…好、好的、俺会更加地吮吸的啦…」`,
        );
        // CFLAG:363  = 2（变量语义：CFLAG 族，363）
        kojo.真空口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 69) {
    if (kojo.六九式 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        // 原作是一整行：无后缀 PRINTFORM/PRINT 连续
        // 不换行，末行 PRINTFORMW 才收行——判据提到语句外当取值、文本留在
        // 输出语句里（#625）
        // 原作 ITEM:PBAND：PBAND 是内建非角色变量，SYSTEM ver1.0.3.ERB:42 赋 4（4 号 = 假阳具，Item.csv:5），全库不再改写（#552）
        const player_has_penis =
          era.get(`talent:${player}:122`) ||
          era.get(`talent:${player}:121`) ||
          (era.get(`talent:${player}:122`) === 0 && era.get('item:4') === 1);
        await era.printAndWait(
          `「啊嗯~…更加地…玩弄那里嘛~…那样的话我就会好好地吸主人的` +
            (player_has_penis ? `大鸡巴` : `花蕾`) +
            `的啦~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的小屁股十分可爱地摇晃着往${player_name}的脸上压了下去………`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「俺会侍奉主人的啦…恶作剧的话…可是不行的噢${heart(1)}…啊啊~嗯啊啊嗯~${heart(1)} 唔～唔噢～～」`,
        );
        // 原作是一整行：三档互斥（两档 SIF 式
        // 判据 + ELSE），末行 PRINTFORMW 才收行——判据提到语句外当取值，文本
        // 留在输出语句里（#625）
        const player_has_penis =
          era.get(`talent:${player}:122`) || era.get(`talent:${player}:121`);
        // 原作 ITEM:PBAND：PBAND 是内建非角色变量，SYSTEM ver1.0.3.ERB:42 赋 4（4 号 = 假阳具，Item.csv:5），全库不再改写（#552）
        const player_has_toy =
          era.get(`talent:${player}:122`) === 0 && era.get('item:4') === 1;
        await era.printAndWait(
          `${target_name}吮吸起${player_name}的` +
            (player_has_penis
              ? `阴茎`
              : player_has_toy && rand_n(3) === 0
                ? `假阳具`
                : `阴唇`) +
            `，而${player_name}也没有停下来继续着口腔侍奉。`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「啊啊~…会侍奉不了的啦…不要这么地恶作剧啦…！」`,
        );
        await era.printAndWait(
          `${target_name}因为在股间不断舔舐的黏糊糊的舌头而颤抖着继续口腔侍奉着………`,
        );
      } else {
        await era.printAndWait(
          `「啊嗯~…这样舔不行啊…嗯~、好、好的、俺会好好的舔的啦…………~！」`,
        );
        await era.printAndWait(
          `${target_name}因为在股间不断舔舐的黏糊糊的舌头而颤抖着继续口腔侍奉着………`,
        );
      }
      // CFLAG:TARGET:364  = 1（变量语义：CFLAG 族，TARGET:364）
      kojo.六九式 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.六九式 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊嗯~…更加地…玩弄那里嘛~…那样的话我就会好好地吸主人的大鸡巴的啦~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的小屁股十分可爱地摇晃着往${player_name}的脸上压了下去………`,
        );
        await era.printAndWait(
          `「嗯~…啊噗唔~…好舒服啊…主人的大鸡巴居然变得那么雄伟了…俺开动了~${heart(1)}」`,
        );
        await era.printAndWait(
          `「嗯啾~…啾噗呜~…咕啾…啊啊…真好吃${heart(1)}…肉棒真好吃${heart(1)}…啊啊也来玩弄我的小穴吧${heart(1)}」`,
        );
        // CFLAG:364  = 5（变量语义：CFLAG 族，364）
        kojo.六九式 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.六九式 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「俺会侍奉主人的啦…恶作剧的话…可是不行的噢${heart(1)}…啊啊~嗯啊啊嗯~${heart(1)} 唔～唔噢～～」`,
        );
        // 同 :5201 组的一整行（#625）
        const player_has_penis =
          era.get(`talent:${player}:122`) || era.get(`talent:${player}:121`);
        // 原作 ITEM:PBAND：PBAND 是内建非角色变量，SYSTEM ver1.0.3.ERB:42 赋 4（4 号 = 假阳具，Item.csv:5），全库不再改写（#552）
        const player_has_toy =
          era.get(`talent:${player}:122`) === 0 && era.get('item:4') === 1;
        await era.printAndWait(
          `${target_name}吮吸起${player_name}的` +
            (player_has_penis
              ? `阴茎`
              : player_has_toy && rand_n(3) === 0
                ? `假阳具`
                : `阴唇`) +
            `，而${player_name}也没有停下来继续着口腔侍奉。`,
        );
        await era.printAndWait(
          `「嗯啾呜~…啾噗~啾噗~…呸咯~${heart(1)}…这里…很舒服对吧…？嗯呜~啊啊~…俺那里也很舒服~${heart(1)}」`,
        );
        // CFLAG:364  = 4（变量语义：CFLAG 族，364）
        kojo.六九式 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.六九式 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊~…会侍奉不了的啦…不要这么地恶作剧啦…！」`,
        );
        await era.printAndWait(
          `${target_name}因为在股间不断舔舐的黏糊糊的舌头而颤抖着继续口腔侍奉着………`,
        );
        await era.printAndWait(
          `「啊唔嗯~…嗯~…嗯啾呜~…哈啊…大鸡巴…好好吃啊…嗯啾~啾唔~…呀啊嗯~」`,
        );
        // CFLAG:364  = 3（变量语义：CFLAG 族，364）
        kojo.六九式 = 3;
      } else if (kojo.六九式 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「啊嗯~…嗯噗~…不，不要舔那个地方啦…嗯~…啾唔~…呸咯~…呸咯~…」`,
        );
        await era.printAndWait(
          `${target_name}因为在股间不断舔舐的黏糊糊的舌头而颤抖着继续口腔侍奉着………`,
        );
        // CFLAG:364  = 2（变量语义：CFLAG 族，364）
        kojo.六九式 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 124) {
    if (kojo.深喉 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「哈啊哈啊…要用俺的喉咙来侍奉了噢${heart(1)} 嗯唔…嗯噗~嗯噗呜~......噗呜呜${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}用嘴唇贴近了龟头、慢慢地将阴茎吞进了喉咙深处。`,
        );
        await era.printAndWait(
          `「嗯噗噗唔~…嗯~…嗯~…嗯噗呜~…嗯唔呜呜~…啾呜呜~啾呜呜呜呜~${heart(1)}」`,
        );
        await era.printAndWait(
          `（大鸡巴侵犯着喉咙深处呢…脑袋的变得晕乎乎起来了啊~${heart(1)}）`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「嗯哈啊啊嗯~…大鸡巴~…全部都要吞下了噢${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}舔了舔嘴唇后将阴茎吞进了喉咙深处。`,
        );
        await era.printAndWait(
          `「嗯唔唔~…嗯~嗯噗呜~…嗯~嗯~呜呜呜呜${heart(1)}…（好好吃啊…主人的大鸡巴好好吃啊~…${heart(1)}）」`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「啊啊嗯~…嗯噗~…嗯噗呜~…呜哈啊…哈啊哈啊…俺会…全部都吃下去的…嗯~嗯唔呜呜~♪」`,
        );
        await era.printAndWait(`${target_name}拼命地将阴茎吞到了喉咙深处………`);
      } else {
        await era.printAndWait(
          `「嗯唔呜呜…嗯~…嗯~…嗯噗呜呜…~…好、好的~…俺会…全部都吃下去的…嗯噗呜…嗯噗呜呜~」`,
        );
        await era.printAndWait(
          `${target_name}好像很难受的样子但还是将阴茎吞了下去………`,
        );
      }
      // CFLAG:TARGET:365  = 1（变量语义：CFLAG 族，TARGET:365）
      kojo.深喉 = 1;
      return 0;
    } else {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「哈啊哈啊…要用俺的喉咙来侍奉了噢${heart(1)} 嗯唔…嗯噗~嗯噗呜~......噗呜呜${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}用嘴唇贴近了龟头、慢慢地将阴茎吞进了喉咙深处。`,
        );
        await era.printAndWait(
          `「嗯噗噗唔~…嗯~…嗯~…嗯噗呜~…嗯唔呜呜~…啾呜呜~啾呜呜呜呜~${heart(1)}」`,
        );
        await era.printAndWait(
          `（大鸡巴侵犯着喉咙深处呢…脑袋的变得晕乎乎起来了啊~${heart(1)}）`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「嗯哈啊啊嗯~…大鸡巴~…全部都要吞下了噢${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}舔了舔嘴唇后将阴茎吞进了喉咙深处。`,
        );
        await era.printAndWait(
          `「嗯唔唔~…嗯~嗯噗呜~…嗯~嗯~呜呜呜呜${heart(1)}…（好好吃啊…主人的大鸡巴好好吃啊~…${heart(1)}）」`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「啊啊嗯~…嗯噗~…嗯噗呜~…呜哈啊…哈啊哈啊…俺会…全部都吃下去的…嗯~嗯唔呜呜~♪」`,
        );
        await era.printAndWait(`${target_name}拼命地将阴茎吞到了喉咙深处………`);
      } else {
        await era.printAndWait(
          `「嗯唔呜呜…嗯~…嗯~…嗯噗呜呜…~…好、好的~…俺会…全部都吃下去的…嗯噗呜…嗯噗呜呜~」`,
        );
        await era.printAndWait(
          `${target_name}好像很难受的样子但还是将阴茎吞了下去………`,
        );
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 80) {
    if (kojo.强制口交 === 0) {
      if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「俺…俺会…努力的…所以请不要太粗鲁地…呜~呜唔~呜呜…嗯呜呜呜~！」`,
        );
        await era.printAndWait(
          `${target_name}因为喉咙深处被强硬地塞进了阴茎而翻起了白眼………`,
        );
      } else {
        await era.printAndWait(
          `「嗯噗呜呜~！？嗯~…嗯噗~…恩呜呜呜呜呜~…不、不要…嗯唔呜呜~！」`,
        );
        await era.printAndWait(
          `${target_name}因为喉咙深处被强硬地塞进了阴茎而翻起了白眼………`,
        );
      }
      // CFLAG:TARGET:381  = 1（变量语义：CFLAG 族，TARGET:381）
      kojo.强制口交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.强制口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯噗~嗯噗呜~${heart(1)}…嗯~嗯~嗯唔呜呜~…嗯噗呜~…嗯噗呜~${heart(1)}…嗯啾噜呜~啾噗呜~${heart(1)}」`,
        );
        await era.printAndWait(
          `（啊啊…连俺的喉咙…都变成主人的东西了~${heart(1)}…大鸡巴好好吃啊~…${heart(1)}）`,
        );
        await era.printAndWait(`${target_name}一脸恍惚地被侵犯着喉咙深处………`);
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.强制口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯噗~…嗯唔~…嗯噗呜无~…嗯~嗯~呜呜呜~${heart(1)}…嗯~…嗯噗~…啊啊~…更加地…做吧~…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}流着眼泪用喉咙深处来侍奉着${master_name}的阴茎………`,
        );
        // CFLAG:381  = 4（变量语义：CFLAG 族，381）
        kojo.强制口交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.强制口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「俺…俺会…努力的…所以请不要太粗鲁地…呜~呜唔~呜呜…嗯呜呜呜~！」`,
        );
        await era.printAndWait(
          `${target_name}因为喉咙深处被强硬地塞进了阴茎而翻起了白眼………`,
        );
        // CFLAG:381  = 3（变量语义：CFLAG 族，381）
        kojo.强制口交 = 3;
      } else if (kojo.强制口交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「嗯噗呜呜~！？嗯~…嗯噗~…恩呜呜呜呜呜~…不、不要…嗯唔呜呜~！」`,
        );
        await era.printAndWait(
          `${target_name}因为喉咙深处被强硬地塞进了阴茎而翻起了白眼………`,
        );
        // CFLAG:381  = 2（变量语义：CFLAG 族，381）
        kojo.强制口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 87) {
    // 延迟读取：主启动图的 COM80–90 注册仍仅由 com-hardcore 自己负责；本模块
    // 只在 COM 口上读穿环位图。顶层 require 会让 main-loop 漏装时模块仍被间接
    // 拉进来，#274/#282 接线锁与 M1249 一起失明（#233 全量变异抓到）。
    const { piercing_state } = require('#/system/train/com-hardcore');
    P = piercing_state.p;

    if (kojo.穿环 === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (era.get(`talent:${target}:76`) === 1) {
        if (view.train.穿环状态 & P) {
          await era.printAndWait(`「呜~…啊呜~！」`);
          await era.printAndWait(
            `${target_name}因为在皮肤上第一次穿孔而发出了悲鸣。`,
          );

          if (P === 1) {
            await era.printAndWait(
              `「啊嗯~…乳头变得太敏感了真是令人苦恼啊~${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}轻轻地摇晃着胸部。勃起的乳头上的乳环发出了微微的光芒………`,
            );
          } else if (P === 2) {
            await era.printAndWait(`「嗯哼哼、真时髦啊，好棒呢~${heart(1)}」`);
            await era.printAndWait(`${target_name}抚摸着肚子的周围………`);
          } else if (P === 4) {
            await era.printAndWait(
              `「啊啊…啊啊…被做了这样的事情后…就只能考虑SEX的事情了啊~${heart(1)}」`,
            );
            await era.printAndWait(`${target_name}因为阴唇环的刺激而发情了………`);
          } else if (P === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「大鸡巴居然变得那么雄伟起来了…啊啊、好想快点SEX啊~♪」`,
              );
              await era.printAndWait(
                `${target_name}的阴茎被装上了阴茎环、一脸恍惚的样子………`,
              );
            } else {
              await era.printAndWait(
                `「呀~…呀啊嗯~…太有感觉了…要一直都勃起来了啊${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}的阴蒂被装上了阴蒂环、一脸恍惚的样子………`,
              );
            }
          } else if (P === 16) {
            await era.printAndWait(
              `「嗯啊啊嗯~…这样口交的话就真的会变得舒服起来吗？」`,
            );
            await era.printAndWait(
              `${target_name}如同展示着处于舌尖的舌环一样十分下流得舔着嘴唇………`,
            );
          } else if (P === 32) {
            await era.printAndWait(`「啊哈哈~…有种大人的感觉~♪」`);
            await era.printAndWait(
              `${target_name}舔着在嘴唇上的唇环确认着唇环的样子………`,
            );
          } else if (P === 64) {
            await era.printAndWait(`「呐呐…这样子真的很漂亮吗？…？」`);
            await era.printAndWait(
              `${target_name}被戴上了鼻环后，不断地抿着鼻子………`,
            );
          }
        } else {
          await era.printAndWait(
            `${target_name}取掉环后，不停地摩擦着环的痕迹………`,
          );
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        if (view.train.穿环状态 & P) {
          await era.printAndWait(`「啊~…啊呜~！」`);
          await era.printAndWait(
            `${target_name}因为在皮肤上第一次穿孔而发出了小小的悲鸣。`,
          );

          if (P === 1) {
            await era.printAndWait(
              `「俺的乳头…请好好地…更加地疼爱俺的乳头吧~…主人~${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}让两个乳头勃起来、乳环晃动了一下发出了光芒………`,
            );
          } else if (P === 2) {
            await era.printAndWait(`「真是美妙的礼物啊，真是非常感谢呢♪」`);
            await era.printAndWait(`${target_name}抚摸着带上环的肚脐周围………`);
          } else if (P === 4) {
            await era.printAndWait(
              `「俺、俺的身体…变得太色情了啊…啊…啊啊…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}的阴唇打上了阴唇环之后阴唇好像被伸长了一样、爱液从大腿内侧流下来了………`,
            );
          } else if (P === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「哈啊哈哈…被戴上了环之后…大鸡巴太有感觉了啊…${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}的阴茎的被穿上了阴茎环、脸颊变得通红起来了………`,
              );
            } else {
              await era.printAndWait(
                `「哈啊哈啊…俺、俺要…要变得奇怪起来了…要变不回去了啊~…${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}的阴蒂被穿上了阴蒂环、脸颊变得通红起来了………`,
              );
            }
          } else if (P === 16) {
            await era.printAndWait(`「嗯啊嗯~…嗯哼…怎么样啊~…跟俺合适吗~？」`);
            await era.printAndWait(
              `${target_name}直勾勾地看着在自己舌尖上的舌环………`,
            );
          } else if (P === 32) {
            await era.printAndWait(
              `「啊啊…想要在俺变漂亮的嘴唇上…被好好地亲吻一顿啊~…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}舔着在嘴唇上的唇环确认着唇环的样子后、向${player_name}撒娇起来了~………`,
            );
          } else if (P === 64) {
            await era.printAndWait(
              `「呐啊…这样适合吗？………这样真的跟俺合适吗？」`,
            );
            await era.printAndWait(
              `${target_name}被戴上了鼻环后，不断地抿着鼻子………`,
            );
          }
        } else {
          await era.printAndWait(
            `${target_name}取掉环后，好像很寂寞地摩擦着环的痕迹………`,
          );
        }
      } else {
        if (view.train.穿环状态 & P) {
          await era.printAndWait(`「不要~…啊~啊呀啊啊啊啊~！」`);
          await era.printAndWait(
            `${target_name}因为在皮肤上第一次穿孔而发出了悲鸣、流下了眼泪。`,
          );

          if (P === 1) {
            await era.printAndWait(
              `「哈啊…哈啊…不要啊…乳头…已经要坏掉了啊………」`,
            );
            await era.printAndWait(
              `${target_name}因为穿上乳头上的乳环而带来的强烈的疼痛而流下了眼泪………`,
            );
          } else if (P === 2) {
            await era.printAndWait(`「哈啊哈啊…这样的才没有问题呢………」`);
            await era.printAndWait(
              `${target_name}因为穿上肚脐上的环而带来的强烈的疼痛而流下了眼泪………`,
            );
          } else if (P === 4) {
            await era.printAndWait(`「呀嗯~…呀啊…好过分啊…这样的………」`);
            await era.printAndWait(
              `${target_name}因为阴唇穿了环而流下了眼泪………`,
            );
          } else if (P === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「不要啊…为什么…为什么啊…这样的绝对不要啊！」`,
              );
              await era.printAndWait(
                `${target_name}的阴茎被穿上了环、用魔力是取不下来的特质阴茎环微微地发着光芒………`,
              );
            } else {
              await era.printAndWait(
                `「啊~…啊啊啊…这样的…俺要忍不住了…坏掉了呜…要坏掉了啊呜………」`,
              );
              await era.printAndWait(
                `${target_name}的阴蒂被穿上了环、用魔力是取不下来的特质阴蒂环微微地发着光芒………`,
              );
            }
          } else if (P === 16) {
            await era.printAndWait(
              `「为什么啊…被做这样的事情的话……嗯噗…噗唔~…呜呜…呜呜呜呜呜~………」`,
            );
            await era.printAndWait(
              `${player_name}将正在哭泣的${target_name}的舌头抓住、确定着舌环的位置………`,
            );
          } else if (P === 32) {
            await era.printAndWait(`「呜呜………已经，请原谅我吧………」`);
            await era.printAndWait(
              `${target_name}的嘴唇被穿上了环、唇环微微地散发着光芒………`,
            );
          } else if (P === 64) {
            await era.printAndWait(`「俺，俺才…不是家畜来的…是人类来的啊………」`);
            await era.printAndWait(
              `${target_name}被穿上了如同牛的鼻环一样的环而流下了眼泪………`,
            );
          }
        } else {
          await era.printAndWait(`${target_name}擦拭着取下环后的痕迹………`);
        }
      }
      // CFLAG:TARGET:348  = 1（变量语义：CFLAG 族，TARGET:348）
      kojo.穿环 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.穿环 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (view.train.穿环状态 & P) {
          if (P === 1) {
            await era.printAndWait(
              `「啊嗯~…乳头变得太敏感了真是令人苦恼啊~${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}轻轻地摇晃着胸部。勃起的乳头上的乳环发出了微微的光芒………`,
            );
          } else if (P === 2) {
            await era.printAndWait(`「嗯哼哼、真时髦啊，好棒呢~${heart(1)}」`);
            await era.printAndWait(`${target_name}抚摸着肚子的周围………`);
          } else if (P === 4) {
            await era.printAndWait(
              `「啊啊…啊啊…被做了这样的事情后…就只能考虑SEX的事情了啊~${heart(1)}」`,
            );
            await era.printAndWait(`${target_name}因为阴唇环的刺激而发情了………`);
          } else if (P === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「大鸡巴居然变得那么雄伟起来了…啊啊、好想快点SEX啊~♪」`,
              );
              await era.printAndWait(
                `${target_name}的阴茎被装上了阴茎环、一脸恍惚的样子………`,
              );
            } else {
              await era.printAndWait(
                `「呀~…呀啊嗯~…太有感觉了…要一直都勃起来了啊${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}的阴蒂被装上了阴蒂环、一脸恍惚的样子………`,
              );
            }
          } else if (P === 16) {
            await era.printAndWait(
              `「嗯啊啊嗯~…这样口交的话就真的会变得舒服起来吗？」`,
            );
            await era.printAndWait(
              `${target_name}如同展示着处于舌尖的舌环一样十分下流得舔着嘴唇………`,
            );
          } else if (P === 32) {
            await era.printAndWait(`「啊哈哈~…有种大人的感觉~♪」`);
            await era.printAndWait(
              `${target_name}舔着在嘴唇上的唇环确认着唇环的样子………`,
            );
          } else if (P === 64) {
            await era.printAndWait(`「呐呐…这样子真的很漂亮吗？…？」`);
            await era.printAndWait(
              `${target_name}被戴上了鼻环后，不断地抿着鼻子………`,
            );
          }
        } else {
          await era.printAndWait(
            `${target_name}取掉环后，不停地摩擦着环的痕迹………`,
          );
        }
        // CFLAG:348  = 4（变量语义：CFLAG 族，348）
        kojo.穿环 = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.穿环 <= 2 || game.kojo.口上开关 === 2)
      ) {
        if (view.train.穿环状态 & P) {
          if (P === 1) {
            await era.printAndWait(
              `「俺的乳头…请好好地…更加地疼爱俺的乳头吧~…主人~${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}让两个乳头勃起来、乳环晃动了一下发出了光芒………`,
            );
          } else if (P === 2) {
            await era.printAndWait(`「真是美妙的礼物啊，真是非常感谢呢♪」`);
            await era.printAndWait(`${target_name}抚摸着带上环的肚脐周围………`);
          } else if (P === 4) {
            await era.printAndWait(
              `「俺、俺的身体…变得太色情了啊…啊…啊啊…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}的阴唇打上了阴唇环之后阴唇好像被伸长了一样、爱液从大腿内侧流下来了………`,
            );
          } else if (P === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「哈啊哈哈…被戴上了环之后…大鸡巴太有感觉了啊…${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}的阴茎的被穿上了阴茎环、脸颊变得通红起来了………`,
              );
            } else {
              await era.printAndWait(
                `「哈啊哈啊…俺、俺要…要变得奇怪起来了…要变不回去了啊~…${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}的阴蒂被穿上了阴蒂环、脸颊变得通红起来了………`,
              );
            }
          } else if (P === 16) {
            await era.printAndWait(`「嗯啊嗯~…嗯哼…怎么样啊~…跟俺合适吗~？」`);
            await era.printAndWait(
              `${target_name}直勾勾地看着在自己舌尖上的舌环………`,
            );
          } else if (P === 32) {
            await era.printAndWait(
              `「啊啊…想要在俺变漂亮的嘴唇上…被好好地亲吻一顿啊~…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}舔着在嘴唇上的唇环确认着唇环的样子后、向${player_name}撒娇起来了~………`,
            );
          } else if (P === 64) {
            await era.printAndWait(
              `「呐啊…这样适合吗？………这样真的跟俺合适吗？」`,
            );
            await era.printAndWait(
              `${target_name}被戴上了鼻环后，不断地抿着鼻子………`,
            );
          }
        } else {
          await era.printAndWait(
            `${target_name}好像有点寂寞似的抚摸着取掉环的伤痕………`,
          );
        }
        // CFLAG:348  = 3（变量语义：CFLAG 族，348）
        kojo.穿环 = 3;
      } else if (kojo.穿环 <= 1 || game.kojo.口上开关 === 2) {
        if (view.train.穿环状态 & P) {
          if (P === 1) {
            await era.printAndWait(
              `「哈啊…哈啊…不要啊…乳头…已经要坏掉了啊………」`,
            );
            await era.printAndWait(
              `${target_name}因为穿上乳头上的乳环而带来的强烈的疼痛而流下了眼泪………`,
            );
          } else if (P === 2) {
            await era.printAndWait(`「哈啊哈啊…这样的才没有问题呢………」`);
            await era.printAndWait(
              `${target_name}因为穿上肚脐上的环而带来的强烈的疼痛而流下了眼泪………`,
            );
          } else if (P === 4) {
            await era.printAndWait(`「呀嗯~…呀啊…好过分啊…这样的………」`);
            await era.printAndWait(
              `${target_name}因为阴唇穿了环而流下了眼泪………`,
            );
          } else if (P === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「不要啊…为什么…为什么啊…这样的绝对不要啊！」`,
              );
              await era.printAndWait(
                `${target_name}的阴茎被穿上了环、用魔力是取不下来的特质阴茎环微微地发着光芒………`,
              );
            } else {
              await era.printAndWait(
                `「啊~…啊啊啊…这样的…俺要忍不住了…坏掉了呜…要坏掉了啊呜………」`,
              );
              await era.printAndWait(
                `${target_name}的阴蒂被穿上了环、用魔力是取不下来的特质阴蒂环微微地发着光芒………`,
              );
            }
          } else if (P === 16) {
            await era.printAndWait(
              `「为什么啊…被做这样的事情的话……嗯噗…噗唔~…呜呜…呜呜呜呜呜~………」`,
            );
            await era.printAndWait(
              `${player_name}将正在哭泣的${target_name}的舌头抓住、确定着舌环的位置………`,
            );
          } else if (P === 32) {
            await era.printAndWait(`「呜呜………已经，请原谅我吧………」`);
            await era.printAndWait(
              `${target_name}的嘴唇被穿上了环、唇环微微地散发着光芒………`,
            );
          } else if (P === 64) {
            await era.printAndWait(`「俺，俺才…不是家畜来的…是人类来的啊………」`);
            await era.printAndWait(
              `${target_name}被穿上了如同牛的鼻环一样的环而流下了眼泪………`,
            );
          }
        } else {
          await era.printAndWait(`${target_name}擦拭着取下环后的痕迹………`);
        }
        // CFLAG:348  = 2（变量语义：CFLAG 族，348）
        kojo.穿环 = 2;
      }
    }
    return 0;
  }
}

// @KOJO_MESSAGE_PALAMCNG_5
async function kojo_message_palamcng_5(rand) {
  const { target, target_name, player_name, master_name, kojo } =
    bind_ctx(rand);
  let P = 0;
  let A = 0;

  if (era_flag.assi > 0 && era_flag.assiplay) {
    return 0;
  }

  if (era.get(`tequip:${target}:45`)) {
    return 0;
  }

  if (game.train.失神) {
    return 0;
  }

  if (era.get(`tequip:${target}:89`)) {
    return 0;
  }

  if (era.get(`tequip:${target}:90`)) {
    return 0;
  }

  if (era.get(`tequip:${target}:55`)) {
    return 0;
  }

  if (era.get(`talent:${target}:9`) === 1) {
    return 0;
  }

  A =
    (era.get(`delta:${target}:11`) || 0) + (era.get(`delta:${target}:12`) || 0);
  if (game.train.处女丧失 === 1 && kojo.处女丧失 === 0) {
    if (game.train.主人导致处女丧失 === 1) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (A < 500 || game.system.反抗刻印回避 === 1)
      ) {
        await era.printAndWait(
          `「主人的肉棒…把我征服了啊…啊啊…哈嗯…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的小穴一边颤抖、一边紧紧吸住${master_name}的阴茎………`,
        );
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (A < 500 || game.system.反抗刻印回避 === 1)
      ) {
        await era.printAndWait(
          `「主人的…进到小穴里面…啊呜…更加…激烈地…所以不要紧的啊啊…」`,
        );
        await era.printAndWait(
          `${target_name}那还未成熟的小穴勉强接受了${master_name}的阴茎………`,
        );
      } else {
        await era.printAndWait(
          `被破处的疼痛难以承受、使得${target_name}咬着嘴唇哭泣。`,
        );
        await era.printAndWait(`「呜呜…好疼啊…拔出去…拔出去啊………」`);
      }
    } else {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「哈啊…哈啊啊………比想象的要来的不疼啊、这个」`);
        await era.printAndWait(
          `「但是下次…主人的肉棒…请侵犯我的小穴${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边流着泪一边说出值得赞扬的话………`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「啊啊…要是主人的…肉、肉棒…该多好………」`);
        await era.printAndWait(`${target_name}看起来有些悲伤………`);
      } else {
        await era.printAndWait(`「这、这样的…不要…啊咕…呼…呜呜呜…………」`);
        await era.printAndWait(
          `被破处的疼痛难以承受、使得${target_name}咬着嘴唇哭泣。`,
        );
      }
    }
    // CFLAG:TARGET:229  = 1（变量语义：CFLAG 族，TARGET:229）
    kojo.处女丧失 = 1;
  }

  P = (era.get(`palam:${target}:3`) || 0) + (era.get(`delta:${target}:3`) || 0);
  if (P > PALAMLV[2] && kojo.首次润滑Lv2 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      if (era_flag.selectcom === 50) {
        await era.printAndWait(
          `倒在${target_name}身上的润滑油让她不知如何是好………`,
        );
        await era.printAndWait(`「咿呀…有、有点冷………啊啊…黏糊糊的………」`);
        await era.printAndWait(`―――润滑第一次超过了LV2。`);
      } else {
        await era.printAndWait(`「哈…哈…啊…已经这么湿了………」`);
        await era.printAndWait(`从${target_name}淌出的蜜汁让她不知如何是好………`);
        await era.printAndWait(`―――润滑第一次超过了LV2。`);
      }
    } else {
      if (era_flag.selectcom === 50) {
        await era.printAndWait(
          `倒在${target_name}身上的润滑油让她不知如何是好………`,
        );
        await era.printAndWait(`「住、住手…好冷…这、这黏乎乎的是什么呀………」`);
        await era.printAndWait(`―――润滑第一次超过了LV2。`);
      } else {
        await era.printAndWait(`「住…住手…不要看…不要看啊………」`);
        await era.printAndWait(
          `${target_name}的小穴滴落着蜜汁、现在这种从来没有过的身体反应让少女不知如何是好………`,
        );
        await era.printAndWait(`―――润滑第一次超过了LV2。`);
      }
    }
    // CFLAG:TARGET:221  = 1（变量语义：CFLAG 族，TARGET:221）
    kojo.首次润滑Lv2 = 1;
  }

  P = (era.get(`palam:${target}:5`) || 0) + (era.get(`delta:${target}:5`) || 0);
  if (P > PALAMLV[2] && kojo.首次欲情Lv2 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      if (era_flag.selectcom === 51) {
        await era.printAndWait(
          `「哈…啊…好、好奇怪…想要抱紧…主人的…心情…要溢出来了………」`,
        );
        await era.printAndWait(
          `${target_name}咽下令人变得坦率的媚药。药好像马上就见效了。`,
        );
        await era.printAndWait(`「主人啊…啊~哈~…请抱住我………」`);
        await era.printAndWait(`―――欲情第一次超过了LV2。`);
      } else {
        await era.printAndWait(`「主人啊…我、我…主人的…想、想要………」`);
        await era.printAndWait(
          `${target_name}的眼睛向上翻着、像是索求着什么而催促着………`,
        );
        await era.printAndWait(`―――欲情第一次超过了LV2。`);
      }
    } else {
      if (era_flag.selectcom === 51) {
        await era.printAndWait(`「呜…咳咳…你、你让我喝了什么！………咕哎！？」`);
        await era.printAndWait(
          `${target_name}被强迫着喝下媚药、不知如何是好、药好像马上就见效了。`,
        );
        await era.printAndWait(`「不要啊…怎么回事…我的身体…变得…奇怪…了」`);
        await era.printAndWait(`―――欲情第一次超过了LV2。`);
      } else {
        await era.printAndWait(
          `「啊呜…咕…总觉得哪里变得好奇怪…到底是什么啊………」`,
        );
        await era.printAndWait(
          `${target_name}的脸红红的、两只手扭扭捏捏不知道该放在哪里………`,
        );
        await era.printAndWait(`―――欲情第一次超过了LV2。`);
      }
    }
    // CFLAG:222  = 1（变量语义：CFLAG 族，222）
    kojo.首次欲情Lv2 = 1;
  }

  P = (era.get(`palam:${target}:8`) || 0) + (era.get(`delta:${target}:8`) || 0);
  if (P > PALAMLV[2] && kojo.首次耻情Lv2 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`「啊…真、真是的…不要…主人………」`);
      await era.printAndWait(`察觉到了自己正在做多么丢脸的事………`);
      await era.printAndWait(`―――耻情第一次超过了LV2。`);
    } else {
      await era.printAndWait(`「住…住手…不要看啊………」`);
      await era.printAndWait(`暴露着屈辱的姿态的${target_name}发出悲鸣………`);
      await era.printAndWait(`―――耻情第一次超过了LV2。`);
    }
    // CFLAG:223  = 1（变量语义：CFLAG 族，223）
    kojo.首次耻情Lv2 = 1;
  }

  P =
    (era.get(`palam:${target}:10`) || 0) + (era.get(`delta:${target}:10`) || 0);
  if (P > PALAMLV[2] && kojo.首次恐怖Lv2 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`「啊啊…拜托你了…再、再这样下去………」`);
      await era.printAndWait(`${target_name}对调教的残酷感到恐怖………`);
      await era.printAndWait(`―――恐怖第一次超过了LV2。`);
    } else {
      await era.printAndWait(`「已…已经…不要啊…好可怕啊………」`);
      await era.printAndWait(`${target_name}对调教的残酷感到恐怖………`);
      await era.printAndWait(`―――恐怖第一次超过了LV2。`);
    }
    // CFLAG:224  = 1（变量语义：CFLAG 族，224）
    kojo.首次恐怖Lv2 = 1;
  }

  if ((era.get(`nowex:${target}:0`) || 0) > 0 && kojo.首次C绝顶 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(
        `「哈…啊…不要…住、住手…再这样下去…啊哈啊啊啊啊~${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}尝到了刺激阴蒂达到初次高潮的滋味。`,
      );
      await era.printAndWait(
        `「哈~${heart(1)}…哈~${heart(1)}…哈~${heart(1)}…主人…再…${heart(1)}」`,
      );
      await era.printAndWait(`少女贪婪地索求着进一步的快感………`);
    } else {
      await era.printAndWait(`「啊…哈…嘻…哈啊啊啊啊啊啊啊！」`);
      await era.printAndWait(
        `${target_name}尝到了刺激阴蒂达到初次高潮的滋味。`,
      );
      await era.printAndWait(`「什…什么…这…什么啊…哈…啊…啊啊啊啊…」`);
      await era.printAndWait(`少女沉浸在第一次高潮的余韵里、显得有些困惑………`);
    }
    // CFLAG:225  = 1（变量语义：CFLAG 族，225）
    kojo.首次C绝顶 = 1;
  }

  if ((era.get(`nowex:${target}:1`) || 0) > 0 && kojo.首次V绝顶 === 0) {
    if (era.get(`talent:${target}:76`) === 1) {
      await era.printAndWait(
        `「啊啊啊小穴${heart(1)} 来嘛${heart(1)} 小穴不行呜呜呜${heart(3)}」`,
      );
      await era.printAndWait(
        `${target_name}的阴道里被阴茎插入发出了第一次阴道高潮的叫声、阴道口痉挛似的缩紧了。`,
      );
      await era.printAndWait(
        `「啊啊啊…我的小穴…已经记住肉棒的味道了啊…${heart(1)} 想要尝更多的肉棒…要去了…${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}翻着白眼沉浸在高潮的余韵里………`);
    } else if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(
        `「啊嘻呀啊啊…要、要来了${heart(1)}…肉棒就在身边呜${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}的阴道里被阴茎插入发出了第一次阴道高潮的叫声、阴道口痉挛似的缩紧了。`,
      );
      await era.printAndWait(
        `「咿嘻…啊啊…主人…咿…去了呢…现在…厉害的要来了…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}品味着余韵、向${player_name}撒着娇………`,
      );
    } else {
      await era.printAndWait(
        `「啊…嘻咿…不、不要…嘻咿…要、要变得奇怪了…我…我…啊啊啊啊~！」`,
      );
      await era.printAndWait(
        `${target_name}尝到了刺激阴道达到初次高潮的滋味、表情呆滞地沉浸在高潮的余韵里。`,
      );
      await era.printAndWait(`「啊啊…这是什么啊…身体…还真是可笑啊………」`);
    }
    // CFLAG:TARGET:226  = 1（变量语义：CFLAG 族，TARGET:226）
    kojo.首次V绝顶 = 1;
  } else if ((era.get(`nowex:${target}:1`) || 0) > 0 && kojo.首次V绝顶 === 1) {
    if (era.get(`talent:${target}:76`) === 1 && game.event.插着不拔 === 1) {
      await era.printAndWait(
        `「啊呜呜…小穴要去了…去了啊${heart(1)} 肉棒让我的小穴好舒服${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}的阴道里被阴茎插入发出了高潮的叫声、阴道口痉挛似的缩紧了。`,
      );
      await era.printAndWait(`「肉棒好棒…没有什么比肉棒更好了啊…${heart(1)}」`);
      await era.printAndWait(`${target_name}露出完全成为了雌性的脸………`);
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      game.event.插着不拔 === 1
    ) {
      await era.printAndWait(
        `「啊啊啊…不、不可以哟${heart(1)}…如、如果再这样动下去的话${heart(1)}…哎呀啊那样啊嗯…咿嘻咕咿咿${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}一被阴茎插入阴道深处就发出了绝顶的呻吟声、痉挛似的收紧了阴道口。`,
      );
      await era.printAndWait(
        `「啊…主人${heart(1)} 要去了…已经…小穴要去了啊…${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}双腿痉挛、品味着余韵………`);
    } else {
      await era.printAndWait(
        `「啊…嘻咿…不、不要…已…已经…小穴要不行了…嗯嘻嘻呀、要去了啊！」`,
      );
      await era.printAndWait(
        `${target_name}尝到了刺激阴道达到高潮的滋味、表情呆滞地沉浸在高潮的余韵里。`,
      );
    }
  }

  if ((era.get(`nowex:${target}:2`) || 0) > 0 && kojo.首次A绝顶 === 0) {
    if (era.get(`talent:${target}:76`) === 1) {
      await era.printAndWait(
        `「呀哈${heart(1)}…啊啊啊嘻呀${heart(1)}…肛门要去了${heart(1)} 屁股小穴要去了啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}品味着出生以来的第一次肛门高潮。腰在快感中颤抖、肛门一次又一次地抽动这。`,
      );
      await era.printAndWait(
        `「肛门粘乎乎地要去了啊…${heart(1)} 再玩弄我的肛门啊${heart(1)}」`,
      );
    } else if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(
        `「啊啊${heart(1)}…嘿嘿嘿${heart(1)}…屁股啊…不行不行、已经、不要再玩弄了啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}品味着出生以来的第一次肛门高潮。腰在快感中颤抖、肛门一次又一次地抽动这。`,
      );
      await era.printAndWait(`「屁股…要融化啦${heart(1)} 主人………${heart(1)}」`);
    } else {
      await era.printAndWait(
        `「啊、呀嘻…不要啊讨厌…屁股…再这样下去…不要玩弄啊…啊啊啊哈呀啊！」`,
      );
      await era.printAndWait(
        `${target_name}被反复调教肛门的结果、品尝到了第一次的肛门高潮。强烈的快感让少女连话都说不清了。`,
      );
      await era.printAndWait(`「咿嘻…呼嘻…屁股好奇怪…要坏掉了………」`);
    }
    // CFLAG:227  = 1（变量语义：CFLAG 族，227）
    kojo.首次A绝顶 = 1;
  }

  if ((era.get(`nowex:${target}:3`) || 0) > 0 && kojo.首次B绝顶 === 0) {
    if (era.get(`talent:${target}:76`) === 1) {
      if (
        era.get(`talent:${target}:110`) === 1 ||
        era.get(`talent:${target}:114`) === 1 ||
        era.get(`talent:${target}:119`) === 1
      ) {
        await era.printAndWait(
          `「嘻呀${heart(1)}…胸部…胸部要裂开了…啊哈啊啊呀${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}的巨乳受到刺激、第一次高潮了………`);
        await era.printAndWait(`「胸部这么大真是…太好…了…${heart(1)}」`);
      } else {
        await era.printAndWait(
          `「呀啊啊…${heart(1)} 胸、胸部…好、好厉害…好爽～…${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}的胸部受到刺激、第一次高潮了………`);
        await era.printAndWait(`「胸部好舒服…请让我更加舒服啊${heart(1)}」`);
      }
    } else if (era.get(`talent:${target}:85`) === 1) {
      if (
        era.get(`talent:${target}:110`) === 1 ||
        era.get(`talent:${target}:114`) === 1 ||
        era.get(`talent:${target}:119`) === 1
      ) {
        await era.printAndWait(
          `「更…请更多的玩弄胸部…再…用力做哟…${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}的巨乳受到刺激、第一次高潮了………`);
        await era.printAndWait(`「啊…原来胸部大…是这么舒服的啊…${heart(1)}」`);
      } else {
        await era.printAndWait(
          `「啊…再…玩弄…啊啊啊…胸部…要变得奇怪了${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}的胸部受到刺激、第一次高潮了………`);
        await era.printAndWait(`「主人…请让胸部…更加舒服…啊${heart(1)}」`);
      }
    } else {
      if (
        era.get(`talent:${target}:110`) === 1 ||
        era.get(`talent:${target}:114`) === 1 ||
        era.get(`talent:${target}:119`) === 1
      ) {
        await era.printAndWait(
          `「不…不要啊…这、这样刺激胸部…要…要去了…去、去了啊啊啊！」`,
        );
        await era.printAndWait(`${target_name}的巨乳受到刺激、第一次高潮了………`);
        await era.printAndWait(`「啊…啊…这样的不要啊…我的胸部…要回不去了………」`);
        await era.printAndWait(
          `少女尽可能地呵护着巨乳、未知的快感的残滓中颤抖着………`,
        );
      } else {
        await era.printAndWait(
          `「啊啊…这、这是什么啊…好、好奇怪…胸部变得好奇怪啊！？」`,
        );
        await era.printAndWait(`${target_name}的胸部受到刺激、第一次高潮了………`);
        await era.printAndWait(`「我的…胸部…好…舒服………」`);
      }
    }
    // CFLAG:TARGET:228  = 1（变量语义：CFLAG 族，TARGET:228）
    kojo.首次B绝顶 = 1;
  }
}

// @KOJO_MESSAGE_MARKCNG_5
async function kojo_message_markcng_5(rand) {
  const { target, target_name, master_name, kojo } = bind_ctx(rand);

  if (era_flag.assi > 0 && era_flag.assiplay) {
    return 0;
  }

  if (era.get(`tequip:${target}:45`)) {
    return 0;
  }

  if (game.train.失神) {
    return 0;
  }

  if (era.get(`tequip:${target}:89`)) {
    return 0;
  }

  if (era.get(`tequip:${target}:90`)) {
    return 0;
  }

  if (era.get(`talent:${target}:9`) === 1) {
    return 0;
  }

  if (era.get(`tequip:${target}:55`)) {
    return 0;
  }

  if (game.system.苦痛刻印变动 === 3 && kojo.苦痛刻印Lv3 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`「啊咕…主、主人…痛…好痛…已经…不行…了啊………」`);
      await era.printAndWait(
        `${target_name}临近承受痛苦的极限、嚎啕大哭起来。`,
      );
      await era.printAndWait(`「我、我…做了什么不好的事吗…？」`);
    } else {
      await era.printAndWait(`「不要啊…痛的…不要啊…再这样下去…请原谅我啊………」`);
      await era.printAndWait(
        `${target_name}临近承受痛苦的极限、嚎啕大哭起来………`,
      );
    }
    // CFLAG:297  = 1（变量语义：CFLAG 族，297）
    kojo.苦痛刻印Lv3 = 1;
  }

  if (game.system.快乐刻印变动 === 3 && kojo.快乐刻印Lv3 === 0) {
    if (
      era.get(`talent:${target}:85`) === 1 ||
      era.get(`talent:${target}:76`) === 1
    ) {
      await era.printAndWait(
        `「啊…呜…啊啊…满满地…被强迫着要去了啊…啊啊…主人啊…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}被多次刻上快乐的印记、露出一副完全成为了雌性的表情………`,
      );
    } else {
      await era.printAndWait(
        `「呜啊…啊…啊啊…呼啊啊啊…已、已经…想要高潮…咿嘻…呀啊啊」`,
      );
      await era.printAndWait(
        `${target_name}被多次刻上快乐的印记、露出一副完全成为了雌性的表情………`,
      );
    }
    // CFLAG:298  = 1（变量语义：CFLAG 族，298）
    kojo.快乐刻印Lv3 = 1;
  }

  if (game.system.屈服刻印变动 === 3 && kojo.屈服刻印Lv3 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`「啊…不妙…只有主人、我的主人啊…${heart(1)}」`);
      await era.printAndWait(
        `${target_name}出神地凝视着${master_name}、已经不会再违抗了吧………`,
      );
    } else {
      await era.printAndWait(
        `「对不起…对不起…已经…不会再违抗主人了…再也不会说嚣张的话了啊………」`,
      );
      await era.printAndWait(
        `反复的调教让疲惫的${target_name}向你许下了屈服的誓言………`,
      );
    }
    // CFLAG:299  = 1（变量语义：CFLAG 族，299）
    kojo.屈服刻印Lv3 = 1;
  }

  if (game.system.反抗刻印变动 === 3 && kojo.反抗刻印Lv3 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`「不要啊…真是的…不要碰”我”啊！」`);
      await era.printAndWait(
        `好像有些做过头了、${target_name}带着反抗心怒视着${master_name}。`,
      );
      await era.printAndWait(`「这、这样的…已经受够了…讨厌！」`);
    } else {
      await era.printAndWait(`「呜呜呜…呜咕…真是的…离我远点…离我远点啊………！」`);
      await era.printAndWait(
        `${target_name}的眼里泛着泪光、怒视着${master_name}。`,
      );
      await era.printAndWait(`「真是的…不要碰我啊…」`);
    }
    // CFLAG:300  = 1（变量语义：CFLAG 族，300）
    kojo.反抗刻印Lv3 = 1;
  }
}

// @SELF_KOJO_K5
async function self_kojo_k5(rand) {
  const { target, target_name, assi_name, master_name, view, kojo } =
    bind_ctx(rand);
  const Q = peek_aftertrain_q();
  const s = peek_aftertrain_s();
  const S = peek_sale_price();

  if (game.train.初吻与自我口上 === 1) {
    if (Q === 1) {
      await era.print(`「被${assi_name}大人…满满地…抚摸着啊…${heart(1)}」`);
      await era.printAndWait(
        `${target_name}如同渴求着${assi_name}的残渣一般让股间贴近她的手指………`,
      );
    } else if (Q === 2) {
      await era.print(
        `「狗狗的肉棒…好想要啊${heart(1)}…只用手指什么的根本不能满足啊………」`,
      );
      await era.printAndWait(
        `${target_name}用手指自慰着、不过似乎完全没有过瘾的样子………`,
      );
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:77`) === 1 &&
        (kojo.调教后自慰 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊嘻咿咿…${heart(1)} 屁股小穴…还想要被更多地侵犯啊${heart(1)}…想要被侵犯啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边沉浸在调教的余韵里一边玩弄着肛门………`,
        );
        // CFLAG:261  = 6（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 6;
      } else if (
        era.get(`talent:${target}:76`) &&
        (kojo.调教后自慰 < 5 || game.kojo.口上开关 === 2)
      ) {
        if (era.get(`talent:${target}:0`) === 1) {
          await era.printAndWait(
            `「啊哈…主人…明明只是想要被侵犯小穴${heart(1)}…啊啊啊…忍不了了…忍不了了啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的手指在小穴里搅动着却没有弄破处女膜。`,
          );
          await era.printAndWait(
            `「再不快点的话…我就自己…把它弄破了啦${heart(1)}…啊啊啊${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「嘻呀${heart(1)}…趁主人的气味还残留着…把气味印刻在这里${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}拨开小穴、把手指插了进去、来回搅弄着。`,
          );
          await era.printAndWait(
            `「主人的汗也好唾液也好…全部都是…玛奥的东西哦…${heart(1)}」`,
          );
        }
        // CFLAG:261  = 5（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 5;
      } else if (
        era.get(`talent:${target}:77`) === 1 &&
        (kojo.调教后自慰 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 尻穴狂
        await era.printAndWait(
          `「屁、屁股小穴${heart(1)}…屁股小穴好舒服哟${heart(1)}…我…已、已经不行了…要疯了啊…屁股小穴要翻开了啊${heart(1)}」`,
        );
        await era.printAndWait(
          `或许是主人看不到的原因、${target_name}激烈地肛门自慰着、完全停不下来。`,
        );
        await era.printAndWait(
          `「哦${heart(1)}…哦哦哦${heart(1)}…快感蔓延开来了${heart(1)}…蔓延开来啦${heart(1)}…这里…想要粗大的肉棒啊${heart(1)}」`,
        );
        // CFLAG:261  = 4（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 4;
      } else if (
        era.get(`talent:${target}:85`) &&
        (kojo.调教后自慰 < 3 || game.kojo.口上开关 === 2)
      ) {
        if (era.get(`talent:${target}:0`) === 1) {
          await era.printAndWait(
            `「啊啊…被主人调教…被注视…被触碰…我…已经这么湿了啊…${heart(1)}`,
          );
          await era.printAndWait(
            `或许是主人看不到的原因、${target_name}激烈地自慰着、完全停不下来。`,
          );
          await era.printAndWait(
            `「啊…嗯…主人啊…快点来…夺去…我的处女啊${heart(1)}…再不快点的话…我就…就自己动手了啦…啊啊啊${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「主人啊${heart(1)}…主人啊${heart(1)}…想要…你看着我啊${heart(1)}…想要你注视着我啊！」`,
          );
          await era.printAndWait(
            `或许是主人看不到的原因、${target_name}激烈地自慰着、完全停不下来。`,
          );
          await era.printAndWait(
            `「一想到主人小穴都已经一片泥泞了${heart(1)} 自己的手指什么的根本满足不了啊${heart(1)}」`,
          );
          await era.printAndWait(
            `少女的手指在小穴里来回搅弄着、爱液飞溅得床上到处都是………`,
          );
        }
        // CFLAG:261  = 3（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 3;
      } else if (
        era.get(`abl:${target}:31`) >= 3 &&
        (kojo.调教后自慰 < 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊啊${heart(1)}…玩弄那里…受不了…舒服到受不了啊…」`,
        );
        await era.printAndWait(
          `「这样舒服的事情根本不想停下来啊………${heart(1)}」`,
        );
        // CFLAG:261  = 2（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 2;
      } else if (kojo.调教后自慰 < 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「这样的事…好想做…却做不了啊…身体好难受…不、不行啊………」`,
        );
        await era.printAndWait(`${target_name}一边幽幽地哭泣一边自慰着………`);
        // CFLAG:261  = 1（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 1;
      }
    }
  }

  if (game.train.初吻与自我口上 === 2) {
    if (
      era.get(`talent:${target}:76`) &&
      (kojo.百合PLAY < 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「姐姐大人啊…${heart(1)} 姐姐大人啊…${heart(1)}」`,
      );
      await era.printAndWait(`少女和${assi_name}身体重合、激烈地性交着。`);
      await era.printAndWait(
        `「好舒服啊…好喜欢性交${heart(1)}…最喜欢性交了…${heart(1)}」`,
      );
      // CFLAG:262  = 5（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 5;
    } else if (
      era.get(`talent:${target}:85`) &&
      (kojo.百合PLAY < 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「这种事…明明不能做的…主人…真是坏心眼…让我做这种事………」`,
      );
      await era.printAndWait(
        `${assi_name}按倒了少女、把手指伸向了少女的小穴。`,
      );

      if (game.system.快乐刻印变动 === 3) {
        await era.printAndWait(
          `少女一边流着泪一边抗拒着、然而身体上被刻上的快乐的刻印却不容许她这样做。`,
        );
        await era.printAndWait(
          `「呜啊…啊${heart(1)}…那里…不可以…不可以啊…所以啊………${heart(1)}」`,
        );
        await era.printAndWait(`看着慢慢张开双腿的少女、${assi_name}窃笑着。`);
        await era.printAndWait(
          `「不…不是的…感觉什么的…才没有啦………${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `少女一边被${assi_name}玩弄着一边拼命忍住不发出呻吟。`,
        );
        await era.printAndWait(`「呜…咕…呜啊…啊啊…」`);
        // 的 `PRINTFORM %SAVESTR:ASSI%看着那样的少女、感到很满意` 与
        // 两条互斥 PRINTFORMW 终点同属一行：前缀提到语句外当局部量，
        // 两支各自拼同一份前缀，只锚自己那一支的行号（#625）
        const assi_front_6150 = `${assi_name}看着那样的少女、感到很满意`;
        if (era_flag.time === 0) {
          await era.printAndWait(
            `${assi_name}看着那样的少女、感到很满意` +
              `直到天黑一直都在玩弄着少女………`,
          );
        } else {
          await era.printAndWait(assi_front_6150 + `整个晚上都在玩弄着少女………`);
        }
      }
      // CFLAG:262  = 4（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 4;
    } else if (
      era.get(`abl:${target}:33`) >= 3 &&
      (kojo.百合PLAY < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「呜呼呼…勇者大人啊…我会好好地侍奉你的${heart(1)}」`,
      );
      await era.printAndWait(
        `少女谄媚的声音在房间里响起、${assi_name}看着努力侍奉的少女、从内心深处感到高兴。`,
      );
      await era.printAndWait(`「啊嗯…我可以称呼您为姐姐大人吗？」`);
      await era.printAndWait(`${assi_name}一边点头一边温柔地抚摸着少女的头………`);
      // CFLAG:262  = 3（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 3;
    } else if (
      era.get(`abl:${target}:22`) >= 3 &&
      (kojo.百合PLAY < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「嗯…哈…啊…啊啊…勇者大人…多亲亲我吧${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}的身体被亲吻得娇喘连连。`);
      await era.printAndWait(
        `从平凡的村娘被原勇者${assi_name}连续不断地玩弄着这番淫靡的景象中、能够感受到${assi_name}无休止的堕落着………`,
      );
      // CFLAG:262  = 2（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 2;
    } else if (kojo.百合PLAY < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(
        `「嗯…啊啊…我、我是真的…真的…不喜欢啊…但、但是………！」`,
      );
      await era.printAndWait(
        `${target_name}一边这么说着一边却和${assi_name}交缠着双腿………`,
      );
      // CFLAG:262  = 1（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 1;
    }
  }

  if (game.train.初吻与自我口上 === 3) {
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.朝口交 < 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊嗯…精液${heart(1)}…还想要更多主人的精液哟………${heart(1)}」`,
      );
      await era.printAndWait(
        `只有一次射精并不能让${target_name}感到满足、于是她又把阴茎含进了嘴里并用舌头套弄着、让阴茎再一次地射出了精液。`,
      );
      await era.printAndWait(
        `「啾噗${heart(1)}…啾噗${heart(1)}…啾呜呜${heart(1)}…嗯…再勃起得更有精神一点啊…还要给我吃更多的精液哟${heart(1)}」`,
      );
      await era.printAndWait(
        `强行把阴茎咽到喉咙深处使得少女可爱的脸有点变形、显得十分淫荡。`,
      );
      await era.printAndWait(
        `「嗯咕…啾噗…嗯咕嗯咕${heart(1)} 肉棒好好吃…好好吃…${heart(1)}」`,
      );
      // CFLAG:263  = 4（变量语义：CFLAG 族，263）
      kojo.朝口交 = 4;
    } else if (
      era.get(`talent:${target}:85`) &&
      (kojo.朝口交 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「嗯啊…啾噗…嗯咕…嗯咕…${heart(1)}」`);
      await era.printAndWait(
        `${target_name}用舌头精心清理着${master_name}的阴茎。`,
      );
      await era.printAndWait(
        `「啊嗯…这里也残留着呢${heart(1)} 主人的精液…很美味哟…${heart(1)}」`,
      );
      await era.printAndWait(
        `少女一副如果放着不管的话能侍奉肉棒一整天的样子………`,
      );
      // CFLAG:263  = 3（变量语义：CFLAG 族，263）
      kojo.朝口交 = 3;
    } else if (
      era.get(`abl:${target}:16`) >= 5 &&
      (kojo.朝口交 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「嗯噗…啾噗…啾…啾…全部都会…好好舔干净的…乖乖等着………就可以了啦」`,
      );
      await era.printAndWait(
        `${target_name}热诚地进行着早安口交之后的清理、连一滴精液也不想残留下来的样子。`,
      );
      await era.printAndWait(`「嗯…啾…啾…啊…哈啊…早、早上好、主人………」`);
      await era.printAndWait(`少女害羞地向你问好、高高兴兴地从房间里出去了………`);
      // CFLAG:263  = 2（变量语义：CFLAG 族，263）
      kojo.朝口交 = 2;
    } else if (kojo.朝口交 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(
        `「哈…哈…早上好哦、主人…啊…从早上开始就这么浓郁了…………」`,
      );
      await era.printAndWait(
        `${target_name}擦着脸上的精液、快要哭出来的样子………`,
      );
      // CFLAG:263  = 1（变量语义：CFLAG 族，263）
      kojo.朝口交 = 1;
    }
  }

  if (game.train.初吻与自我口上 === 4) {
    if (
      era.get(`abl:${target}:2`) >= 4 &&
      (kojo.调教后性交 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `${target_name}看起来已经十分习惯和${master_name}做爱了。少女的小穴被抽插时发出了清亮甜美的呻吟。`,
      );
      await era.printAndWait(
        `「主人啊…再…请再激烈一些…把我的小穴弄得乱七八糟的吧${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}缠绕在${master_name}腰上的双腿快由于快感不住地颤抖。`,
      );
      await era.printAndWait(
        `「哈啊${heart(1)} 好喜欢和主人做爱了${heart(1)} 最喜欢和主人做爱了${heart(1)}」`,
      );
      if (s >= 3) {
        await era.printAndWait(`${target_name}被中出之后看上去十分满足………`);
      }
      // CFLAG:264  = 2（变量语义：CFLAG 族，264）
      kojo.调教后性交 = 2;
    } else if (kojo.调教后性交 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(
        `「主人啊…${heart(1)} 全部…全部都射进来………${heart(1)}」`,
      );
      await era.printAndWait(
        `「哈…啊…嗯啊嗯…好高兴${heart(1)} 被你抱在怀里真的好高兴…${heart(1)}」`,
      );
      await era.printAndWait(`「啊…啊啊…啊嗯…${heart(1)} 这么多${heart(1)}」`);
      await era.printAndWait(`${target_name}张开双腿拨弄着淌出的精液………`);
      // CFLAG:264  = 1（变量语义：CFLAG 族，264）
      kojo.调教后性交 = 1;
    }
  }

  if (game.train.初吻与自我口上 === 5) {
    if (kojo.夜袭 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「欸嘿嘿…一起睡吧${heart(1)}」`);
      await era.printAndWait(`「对我动手动脚…也是可以的哟…${heart(1)}」`);
      await era.printAndWait(`${target_name}带着献媚的眼神、走进了房间………`);
      // CFLAG:265  = 1（变量语义：CFLAG 族，265）
      kojo.夜袭 = 1;
    }
  }

  if (game.train.初吻与自我口上 === 6) {
    if (era.get(`talent:${target}:85`)) {
      if (era.get(`talent:${target}:314`) === 9) {
        if (S >= 1000000) {
          await era.printAndWait(
            `被魔界的某位贵族买下的${target_name}、在这之后………`,
          );
          await era.printAndWait(`………`);
          await era.printAndWait(`……`);
          await era.printAndWait(`…`);
          await era.printAndWait(`听闻有传言说是作为宠姬被疼爱着。`);
          await era.printAndWait(
            `没有教养、但充满魅力的特质正是主人所喜爱的地方。`,
          );

          await era.printAndWait(`据说已经怀上了主人的孩子、很快就要分娩了。`);
          await era.printAndWait(
            `于是${master_name}和${target_name}再也没有见过面………`,
          );
        } else if (S >= 500000) {
          await era.printAndWait(
            `被某位魔族的收藏家买下的${target_name}、在这之后………`,
          );
          await era.printAndWait(`………`);
          await era.printAndWait(`……`);
          await era.printAndWait(`…`);
          await era.printAndWait(
            `听闻有传言说是和收藏家结婚了、也很受孩子们欢迎。`,
          );
          await era.printAndWait(`现在好像做着出色的魔族的「母亲」。`);
          await era.printAndWait(
            `于是${master_name}和${target_name}再也没有见过面………`,
          );
        } else if (S >= 100000) {
          await era.printAndWait(
            `被某位魔族的商人买下的${target_name}、在这之后………`,
          );
          await era.printAndWait(`………`);
          await era.printAndWait(`……`);
          await era.printAndWait(`…`);
          await era.printAndWait(`作为商人的情人和接待道具度过每一天。`);
          await era.printAndWait(
            `过着不知道是否幸福却很富足的日子、只要商人不破产的话应该能这样好好生活下去的吧。`,
          );
          await era.printAndWait(
            `于是${master_name}和${target_name}再也没有见过面………`,
          );
        } else {
          await era.printAndWait(
            `被某位魔族的农户买下的${target_name}、在这之后………`,
          );
          await era.printAndWait(`………`);
          await era.printAndWait(`……`);
          await era.printAndWait(`…`);
          await era.printAndWait(`有传言说是成为了不停生育的奴隶。`);
          await era.printAndWait(
            `生出了好几个孩子增加了农场的劳动力、主人对此感到很高兴。`,
          );
          await era.printAndWait(
            `于是${master_name}和${target_name}再也没有见过面………`,
          );
        }
      } else {
        if (S >= 1000000) {
          await era.printAndWait(
            `被魔界的某位贵族买下的${target_name}、在这之后………`,
          );
          await era.printAndWait(`………`);
          await era.printAndWait(`……`);
          await era.printAndWait(`…`);
          await era.printAndWait(`有传言说每晚都被贵族儿子的玩伴们疼爱着。`);
          await era.printAndWait(
            `据说因为${target_name}年龄相近的原因还找到了恋人。`,
          );
          await era.printAndWait(
            `如果她真的希望这种关系的话、在她前方迎接她的应该是充满苦难的路吧、不过已经和${master_name}没有关系了。`,
          );
          await era.printAndWait(
            `于是${master_name}和${target_name}再也没有见过面………`,
          );
        } else if (S >= 500000) {
          await era.printAndWait(
            `被某位魔族的富豪买下的${target_name}、在这之后………`,
          );
          await era.printAndWait(`………`);
          await era.printAndWait(`……`);
          await era.printAndWait(`…`);
          await era.printAndWait(
            `听闻有传言说作为那个家里的宠物受到了特别的疼爱、与看门狗生下了好几个孩子。`,
          );
          await era.printAndWait(`富豪似乎成为了她的饲养员。`);
          await era.printAndWait(
            `于是${master_name}和${target_name}再也没有见过面………`,
          );
        } else if (S >= 100000) {
          await era.printAndWait(
            `被某位魔族的商人买下的${target_name}、在这之后………`,
          );
          await era.printAndWait(`………`);
          await era.printAndWait(`……`);
          await era.printAndWait(`…`);
          await era.printAndWait(`被送到了商人开的妓院里。`);
          await era.printAndWait(
            `因为被好好调教过的人类幼女奴隶非常罕见的原因、据说常客非常多。`,
          );
          await era.printAndWait(
            `也许有一天能替自己赎身、恢复自由之身过日子也说不定呢。`,
          );

          await era.printAndWait(
            `但是${master_name}和${target_name}再也不会有见过面………`,
          );
        } else {
          await era.printAndWait(
            `被某个魔族的农场买下的${target_name}、在这之后………`,
          );
          await era.printAndWait(`………`);
          await era.printAndWait(`……`);
          await era.printAndWait(`…`);
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            await era.printAndWait(
              `由于肥大化的胸部、被作为牛奴隶送到了牛圈里。`,
            );
            await era.printAndWait(
              `据说用牛魔兽的精子受精、通过注射药物使得乳房更加肥大化、每天都被榨取牛奶。`,
            );
          } else {
            await era.printAndWait(`为了制作出新品种的家畜而和所有家畜交配。`);
            await era.printAndWait(
              `虽然现在还没有实验成果、但将来应该会有意想不到的新品牌出现吧。`,
            );
          }
          await era.printAndWait(
            `于是${master_name}和${target_name}在这之后再也没有见过面………`,
          );
        }
      }
    } else if (era.get(`mark:${target}:3`) === 3) {
      if (era.get(`talent:${target}:314`) === 9) {
        await era.printAndWait(
          `挣扎着的${target_name}被担当护卫的魔物摁在地上。但是她目露凶光向这边喊了起来。`,
        );
        await era.printAndWait(
          `「你们总有一天会因为没有把我杀了而感到后悔的！」`,
        );
        await era.printAndWait(`「把她活活撕碎了去喂野狗！」`);
        await era.printAndWait(
          `于是${target_name}再也不会再次出现在${master_name}面前了吧………`,
        );
      } else {
        await era.printAndWait(
          `挣扎着的${target_name}被担当护卫的魔物摁在地上。但是她目露凶光向这边喊了起来。`,
        );
        await era.printAndWait(
          `「你们总有一天会因为没有把我杀了而感到后悔的！」`,
        );
        await era.printAndWait(`「把她活活撕碎了去喂野狗！」`);
        await era.printAndWait(
          `于是${target_name}再也不会出现在${master_name}的面前了吧………`,
        );
      }
    } else if (era.get(`talent:${target}:76`)) {
      if (era.get(`talent:${target}:314`) === 9) {
        if (S >= 1000000) {
          await era.printAndWait(
            `被某位魔族的将军买下的${target_name}、在这之后………`,
          );
          await era.printAndWait(`………`);
          await era.printAndWait(`……`);
          await era.printAndWait(`…`);
          await era.printAndWait(
            `有传言说她被连在魔族中也算是性欲旺盛的兽人将军不停地干到现在、${target_name}好像是坏掉了。`,
          );
          await era.printAndWait(
            `可是通过激烈的调教、${target_name}成为了可以称之为艺术品的性奴隶、好像任何行为都能给她带来快感。`,
          );
          await era.printAndWait(
            `将军非常中意变成了那样的${target_name}、赏赐给她性奴专用的房间、每晚都会好好地享用她。`,
          );
          await era.printAndWait(
            `于是${master_name}和${target_name}再也没有见过面………`,
          );
        } else if (S >= 500000) {
          await era.printAndWait(
            `被某个魔族的高级娼馆买下的${target_name}、在这之后………`,
          );
          await era.printAndWait(`………`);
          await era.printAndWait(`……`);
          await era.printAndWait(`…`);
          await era.printAndWait(
            `听闻有传言说因为能玩特殊play而成为了十分受欢迎的娼妇。`,
          );
          await era.printAndWait(
            `之后被某位大财主赎身、作为他的第五个妻子幸福地生活着。`,
          );
          await era.printAndWait(
            `于是${master_name}和${target_name}再也没有见过面………`,
          );
        } else if (S >= 100000) {
          await era.printAndWait(
            `被某个魔族的黑帮买下的${target_name}、在这之后………`,
          );
          await era.printAndWait(`………`);
          await era.printAndWait(`……`);
          await era.printAndWait(`…`);
          await era.printAndWait(`有传言说是作为黑帮的专属娼妇生活着。`);
          await era.printAndWait(
            `与好几个男人发生关系来抑制淫荡的身体因欲求不满而产生的疼痛、很幸福的样子。`,
          );
          await era.printAndWait(
            `但是${target_name}与帮会里的年轻成员相恋了、他们计划从帮会里出逃可惜失败了、两人被抓后有着非常凄惨的结局。`,
          );
          await era.printAndWait(
            `于是${master_name}和${target_name}再也没有见过面………`,
          );
        } else {
          await era.printAndWait(
            `被某个魔族的酒馆买下的${target_name}、在这之后………`,
          );
          await era.printAndWait(`………`);
          await era.printAndWait(`……`);
          await era.printAndWait(`…`);
          await era.printAndWait(
            `每天晚上都被客人叫到房间里、过着快乐的日子。`,
          );
          await era.printAndWait(
            `由于会把食物带到店前去吃、酒馆老板对她的评价多少有点不好………`,
          );
          await era.printAndWait(
            `于是${master_name}和${target_name}再也没有见过面………`,
          );
        }
      } else {
        if (S >= 1000000) {
          await era.printAndWait(
            `被某位魔族的将军买下的${target_name}、在这之后………`,
          );
          await era.printAndWait(`………`);
          await era.printAndWait(`……`);
          await era.printAndWait(`…`);
          await era.printAndWait(
            `听闻有传言说将军在买下${target_name}后、三天三夜没有迈出房门一步、在房间里玩弄着她`,
          );
          await era.printAndWait(
            `然后在处理工作时也常常让少女随时侍奉在身旁。`,
          );
          await era.printAndWait(
            `想必早晚会正式成为将军的侧室吧、当然这又将会是一个新的故事。`,
          );
          await era.printAndWait(
            `于是${master_name}和${target_name}再也没有见过面………`,
          );
        } else if (S >= 500000) {
          await era.printAndWait(
            `被某个魔族的学院买下的${target_name}、在这之后………`,
          );
          await era.printAndWait(`………`);
          await era.printAndWait(`……`);
          await era.printAndWait(`…`);
          await era.printAndWait(
            `有传言说作为教材和学生们的性欲处理工具每天都被射入大量精液。`,
          );
          await era.printAndWait(
            `听说生下的孩子也被关在饲育小屋里精心培育这。`,
          );
          await era.printAndWait(
            `于是${master_name}和${target_name}再也没有见过面………`,
          );
        } else if (S >= 100000) {
          await era.printAndWait(
            `被某个魔族的低级娼馆买下的${target_name}、在那之后………`,
          );
          await era.printAndWait(`………`);
          await era.printAndWait(`……`);
          await era.printAndWait(`…`);
          await era.printAndWait(
            `有传言说因为在有特殊癖好的客人中人气非常高的缘故、她得到了很好的待遇。`,
          );
          await era.printAndWait(`作为前辈的妓女们也十分疼爱她。`);
          await era.printAndWait(
            `于是${master_name}和${target_name}再也没有见过面………`,
          );
        } else {
          await era.printAndWait(
            `被某位魔族的矿主买下的${target_name}、在那之后………`,
          );
          await era.printAndWait(`………`);
          await era.printAndWait(`……`);
          await era.printAndWait(`…`);
          await era.printAndWait(`有传言说每晚都被矿工们轮奸。`);
          await era.printAndWait(
            `被迫接受兽欲的少女觉得再也没有什么是比死更快乐的了。`,
          );
          await era.printAndWait(
            `于是${master_name}和${target_name}再也没有见过面………`,
          );
        }
      }
    } else {
      if (era.get(`talent:${target}:314`) === 9) {
        await era.printAndWait(`「好想见姐姐…好想回到村子里去………」`);
        await era.printAndWait(
          `被卖出的魔族奴隶${target_name}就这样消失在了黑暗的世界之中………`,
        );
      } else {
        await era.printAndWait(`「好想见姐姐…好想回到村子里去………」`);
        await era.printAndWait(
          `被卖出的人类奴隶${target_name}就这样消失在了黑暗的世界之中………`,
        );
      }
    }
  }

  if (game.train.初吻与自我口上 === 11) {
    if (kojo.妊娠发觉 === 0) {
      if (era.get(`talent:${target}:9`) === 1) {
        await era.printAndWait(
          `「欸嘿嘿…啊哈…啊哈………魔族的孩子…在我的肚子里哟…啊哈…啊哈哈哈哈………」`,
        );
        await era.printAndWait(`可怜的${target_name}好像没能接受怀孕的事实………`);
      } else if (era.get(`talent:${target}:85`) && view.event.妊娠相手 === 1) {
        if (era.get(`talent:${target}:314`) === 9) {
          await era.printAndWait(
            `「啊！那、那个……我、我…好像怀上主人的孩子了呢…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}害羞地抚摩着腹部看着${master_name}。`,
          );
          await era.printAndWait(
            `「会、会加油的…会、会生下来的…我绝对会把孩子生下来的………」`,
          );
          await era.printAndWait(
            `${master_name}温柔地抱住了喜极而泣的${target_name}。`,
          );
          await era.printAndWait(
            `「成为魔族…原来是这么高兴的事呀…一定会生下精神的孩子的………」`,
          );
        } else {
          await era.printAndWait(
            `「啊！那、那个……我、我…好像怀上主人的孩子了呢…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}害羞地抚摩着腹部看着${master_name}。`,
          );
          await era.printAndWait(
            `「会、会加油的…会、会生下来的…我绝对会把孩子生下来的………」`,
          );
          await era.printAndWait(
            `${master_name}温柔地抱住了喜极而泣的${target_name}。`,
          );
        }
      } else if (era.get(`talent:${target}:76`) && view.event.妊娠相手 === 1) {
        if (era.get(`talent:${target}:314`) === 9) {
          await era.printAndWait(
            `和往常一样一脸心神荡漾的${target_name}看着${master_name}。`,
          );
          await era.printAndWait(
            `「欸嘿嘿…因为做了那种事…就有了小宝宝了噢…主人${heart(1)}」`,
          );
          await era.printAndWait(`怜爱地抚摸着肌肤完全变成了青色的肚子。`);
          await era.printAndWait(
            `「主人的孩子就在这里噢…生孩子会是一种怎样的乐趣呢………${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一边高兴地挥动着尾巴一边报告了自己怀孕的情况………`,
          );
        } else {
          await era.printAndWait(
            `和往常一样一脸心神荡漾的${target_name}看着${master_name}。`,
          );
          await era.printAndWait(
            `「欸嘿嘿…因为做了那种事…就有了小宝宝了噢…主人${heart(1)}」`,
          );
          await era.printAndWait(`少女一边用舌头舔着嘴唇一边怜爱地抚摸着肚子`);
          await era.printAndWait(
            `「主人的孩子就在这里噢…生孩子会是一种怎样的乐趣呢………${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一边高兴地笑着一边报告了自己怀孕的情况………`,
          );
        }
      } else if (view.event.妊娠相手 === 5) {
        if (era.get(`talent:${target}:136`) === 1) {
          await era.printAndWait(`「一直这么做的话怀上狗狗的孩子也没办法啦」`);
          await era.printAndWait(
            `${target_name}一边没心没肺欸嘿嘿地笑着一边怜爱地抚摸着肉眼可见鼓起的肚子………`,
          );
        } else {
          await era.printAndWait(
            `「啊啊啊…怀上了狗狗的孩子…这是为什么啊…啊啊！」`,
          );
        }
      } else if (view.event.妊娠相手 === 7) {
        await era.printAndWait(
          `「我、我有了狂王的孩子…？骗、骗人…肯定是骗人的………」`,
        );
      } else if (era.get(`talent:${target}:85`)) {
        if (era.get(`talent:${target}:314`) === 9) {
          await era.printAndWait(`「那、那个…我好像怀孕了…但是…那个…」`);
          await era.printAndWait(
            `${target_name}表情很不安、背上的翅膀无力地下垂着。`,
          );
          await era.printAndWait(
            `「那个…仔细地想了下…大概不是主人的…但、但是…只有孩子、我不想打掉………」`,
          );
          await era.printAndWait(
            `${master_name}温柔地安慰着青色肌肤上淌满泪水的${target_name}………`,
          );
        } else {
          await era.printAndWait(`「那、那个…我好像怀孕了…但是…那个…」`);
          await era.printAndWait(
            `${target_name}表情很不安、看着${master_name}向他报告自己怀孕了的情况。`,
          );
          await era.printAndWait(
            `「那个…仔细地想了下…大概不是主人的…但、但是…只有孩子、我不想打掉………」`,
          );
          await era.printAndWait(
            `${master_name}温柔地安慰着不停流着眼泪的${target_name}………`,
          );
        }
      } else if (era.get(`talent:${target}:76`)) {
        if (era.get(`talent:${target}:314`) === 9) {
          await era.printAndWait(
            `和往常一样一脸心神荡漾的${target_name}看着${master_name}。`,
          );
          await era.printAndWait(
            `「欸嘿嘿…主人啊…我好像怀孕了呀…${heart(1)}」`,
          );
          await era.printAndWait(
            `一边欸嘿嘿地笑着一边怜爱地抚摸着青色肌肤的肚子。`,
          );
          await era.printAndWait(
            `「和别人做了那么多次…也不知道是谁的孩子哟…但是我可以把他生下来的吧？」`,
          );
          await era.printAndWait(
            `${target_name}眯起了魔族的眼睛、露出了微笑………`,
          );
        } else {
          await era.printAndWait(
            `和往常一样一脸心神荡漾的${target_name}看着${master_name}。`,
          );
          await era.printAndWait(
            `「欸嘿嘿…主人啊…我好像怀孕了呀…${heart(1)}」`,
          );
          await era.printAndWait(
            `一边没心没肺欸嘿嘿地笑着一边怜爱地抚摸着肉眼可见鼓起的肚子。`,
          );
          await era.printAndWait(
            `「和别人做了那么多次…也不知道是谁的孩子哟…但是我可以把他生下来的吧？」`,
          );
          await era.printAndWait(`${target_name}露出了微笑………`);
        }
      } else if (era.get(`mark:${target}:3`) === 3) {
        await era.printAndWait(`「为、为什么我会…怎么看…都…都是你的错啊！」`);
        await era.printAndWait(
          `${target_name}以厌恶的眼神瞪着${master_name}。`,
        );
        await era.printAndWait(`「魔物的孩子什么的我是绝对不会生下来的…！」`);
      } else {
        if (era.get(`talent:${target}:314`) === 9) {
          await era.printAndWait(
            `「啊…怎么这样…我、我怀孕了啊…怎么办啊…好害怕…我好害怕………」`,
          );
          await era.printAndWait(`${target_name}无助地抱着双肩。`);
          await era.printAndWait(
            `「一定是…是因为成为了魔族…才会怀孕的…太过分了…实在是太过分了啦………」`,
          );
        } else {
          await era.printAndWait(
            `「啊…怎么这样…我、我怀孕了啊…怎么办啊…好害怕…我好害怕………」`,
          );
          await era.printAndWait(`${target_name}无助地抱着双肩………`);
        }
      }
      // CFLAG:271  = 1（变量语义：CFLAG 族，271）
      kojo.妊娠发觉 = 1;
    } else {
      if (era.get(`talent:${target}:9`) === 1) {
        await era.printAndWait(
          `「欸嘿嘿…啊哈…啊哈………魔族的孩子…在我的肚子里哟…啊哈…啊哈哈哈哈………」`,
        );
        await era.printAndWait(`可怜的${target_name}好像没能接受怀孕的事实………`);
      } else if (era.get(`talent:${target}:85`) && view.event.妊娠相手 === 1) {
        if (era.get(`talent:${target}:314`) === 9) {
          await era.printAndWait(
            `「啊！那、那个……我、我…好像怀上主人的孩子了呢…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}害羞地抚摩着腹部看着${master_name}。`,
          );
          await era.printAndWait(
            `「会、会加油的…会、会生下来的…我绝对会把孩子生下来的………」`,
          );
          await era.printAndWait(
            `${master_name}温柔地抱住了喜极而泣的${target_name}。`,
          );
          await era.printAndWait(
            `「成为魔族…原来是这么高兴的事呀…一定会生下精神的孩子的………」`,
          );
        } else {
          await era.printAndWait(
            `「啊！那、那个……我、我…好像怀上主人的孩子了呢…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}害羞地抚摩着腹部看着${master_name}。`,
          );
          await era.printAndWait(
            `「会、会加油的…会、会生下来的…我绝对会把孩子生下来的………」`,
          );
          await era.printAndWait(
            `${master_name}温柔地抱住了喜极而泣的${target_name}。`,
          );
        }
      } else if (era.get(`talent:${target}:76`) && view.event.妊娠相手 === 1) {
        if (era.get(`talent:${target}:314`) === 9) {
          await era.printAndWait(
            `和往常一样一脸心神荡漾的${target_name}看着${master_name}。`,
          );
          await era.printAndWait(
            `「欸嘿嘿…因为做了那种事…就有了小宝宝了噢…主人${heart(1)}」`,
          );
          await era.printAndWait(`怜爱地抚摸着肌肤完全变成了青色的肚子。`);
          await era.printAndWait(
            `「主人的孩子就在这里噢…生孩子会是一种怎样的乐趣呢………${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一边高兴地挥动着尾巴一边报告了自己怀孕的情况………`,
          );
        } else {
          await era.printAndWait(
            `和往常一样一脸心神荡漾的${target_name}看着${master_name}。`,
          );
          await era.printAndWait(
            `「欸嘿嘿…因为做了那种事…就有了小宝宝了噢…主人${heart(1)}」`,
          );
          await era.printAndWait(`少女一边用舌头舔着嘴唇一边怜爱地抚摸着肚子`);
          await era.printAndWait(
            `「主人的孩子就在这里噢…生孩子会是一种怎样的乐趣呢………${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一边高兴地笑着一边报告了自己怀孕的情况………`,
          );
        }
      } else if (view.event.妊娠相手 === 5) {
        if (era.get(`talent:${target}:136`) === 1) {
          await era.printAndWait(`「一直这么做的话怀上狗狗的孩子也没办法啦」`);
          await era.printAndWait(
            `${target_name}一边没心没肺欸嘿嘿地笑着一边怜爱地抚摸着肉眼可见鼓起的肚子………`,
          );
        } else {
          await era.printAndWait(
            `「啊啊啊…怀上了狗狗的孩子…这是为什么啊…啊啊！」`,
          );
        }
      } else if (view.event.妊娠相手 === 7) {
        await era.printAndWait(
          `「我、我有了狂王的孩子…？骗、骗人…肯定是骗人的………」`,
        );
      } else if (era.get(`talent:${target}:85`)) {
        if (era.get(`talent:${target}:314`) === 9) {
          await era.printAndWait(`「那、那个…我好像怀孕了…但是…那个…」`);
          await era.printAndWait(
            `${target_name}表情很不安、背上的翅膀无力地下垂着。`,
          );
          await era.printAndWait(
            `「那个…仔细地想了下…大概不是主人的…但、但是…只有孩子、我不想打掉………」`,
          );
          await era.printAndWait(
            `${master_name}温柔地安慰着青色肌肤上淌满泪水的${target_name}………`,
          );
        } else {
          await era.printAndWait(`「那、那个…我好像怀孕了…但是…那个…」`);
          await era.printAndWait(
            `${target_name}表情很不安、看着${master_name}向他报告自己怀孕了的情况。`,
          );
          await era.printAndWait(
            `「那个…仔细地想了下…大概不是主人的…但、但是…只有孩子、我不想打掉………」`,
          );
          await era.printAndWait(
            `${master_name}温柔地安慰着不停流着眼泪的${target_name}………`,
          );
        }
      } else if (era.get(`talent:${target}:76`)) {
        if (era.get(`talent:${target}:314`) === 9) {
          await era.printAndWait(
            `和往常一样一脸心神荡漾的${target_name}看着${master_name}。`,
          );
          await era.printAndWait(
            `「欸嘿嘿…主人啊…我好像怀孕了呀…${heart(1)}」`,
          );
          await era.printAndWait(
            `一边欸嘿嘿地笑着一边怜爱地抚摸着青色肌肤的肚子。`,
          );
          await era.printAndWait(
            `「和别人做了那么多次…也不知道是谁的孩子哟…但是我可以把他生下来的吧？」`,
          );
          await era.printAndWait(
            `${target_name}眯起了魔族的眼睛、露出了微笑………`,
          );
        } else {
          await era.printAndWait(
            `和往常一样一脸心神荡漾的${target_name}看着${master_name}。`,
          );
          await era.printAndWait(
            `「欸嘿嘿…主人啊…我好像怀孕了呀…${heart(1)}」`,
          );
          await era.printAndWait(
            `一边没心没肺欸嘿嘿地笑着一边怜爱地抚摸着肉眼可见鼓起的肚子。`,
          );
          await era.printAndWait(
            `「和别人做了那么多次…也不知道是谁的孩子哟…但是我可以把他生下来的吧？」`,
          );
          await era.printAndWait(`${target_name}露出了微笑………`);
        }
      } else if (era.get(`mark:${target}:3`) === 3) {
        await era.printAndWait(`「为、为什么我会…怎么看…都…都是你的错啊！」`);
        await era.printAndWait(
          `${target_name}以厌恶的眼神瞪着${master_name}。`,
        );
        await era.printAndWait(`「魔物的孩子什么的我是绝对不会生下来的啊…！」`);
      } else {
        if (era.get(`talent:${target}:314`) === 9) {
          await era.printAndWait(
            `「啊…怎么这样…我、我怀孕了啊…怎么办啊…好害怕…我好害怕………」`,
          );
          await era.printAndWait(`${target_name}无助地抱着双肩。`);
          await era.printAndWait(
            `「一定是…是因为成为了魔族…才会怀孕的…太过分了…实在是太过分了啦………」`,
          );
        } else {
          await era.printAndWait(
            `「啊…怎么这样…我、我怀孕了啊…怎么办啊…好害怕…我好害怕………」`,
          );
          await era.printAndWait(`${target_name}无助地抱着双肩………`);
        }
      }
      // CFLAG:271  = 1（变量语义：CFLAG 族，271）
      kojo.妊娠发觉 = 1;
    }
  }

  if (game.train.初吻与自我口上 === 12) {
    if (kojo.生产 === 0) {
      if (era.get(`talent:${target}:9`) === 1) {
        await era.printAndWait(
          `「啊呀呀啊啊…哈啊…精神的小宝宝出生了哟…看呐…姐姐……哈…哈………」`,
        );
        await era.printAndWait(
          `精神已经完全混乱的${target_name}嘴里说着莫名其妙的话………`,
        );
      } else if (era.get(`talent:${target}:85`) && view.event.妊娠相手 === 1) {
        if (era.get(`talent:${target}:314`) === 9) {
          await era.printAndWait(`「生出来啦…啊啊…我的小宝宝出生了哟………」`);
          await era.printAndWait(
            `${target_name}那魔族的黄色眼瞳中流下喜悦的泪水、不停地喘息着。`,
          );
          await era.printAndWait(
            `「啊…要生更多…主人的………魔王大人的孩子要生更多………」`,
          );
        } else {
          await era.printAndWait(`「生出来啦…啊啊…我的小宝宝出生了哟………」`);
          await era.printAndWait(`${target_name}流下喜悦的泪水、喘着粗气。`);
          await era.printAndWait(
            `「啊…要生更多…主人的………魔王大人的孩子要生更多………」`,
          );
          await era.printAndWait(`就这样少女成为了被诅咒的魔物的母亲………`);
        }
      } else if (era.get(`talent:${target}:76`) && view.event.妊娠相手 === 1) {
        if (era.get(`talent:${target}:314`) === 9) {
          await era.printAndWait(
            `「啊嗯…啊啊…啊哈…特别有精神的宝宝哟…${heart(1)}」`,
          );
          await era.printAndWait(`生完孩子的${target_name}艰难地呼吸着。`);
          await era.printAndWait(
            `「因为还在肚子里的时候就很闹腾呢…总是能感觉得到呢…${heart(1)}」`,
          );
          await era.printAndWait(`青色的肌肤上浮起汗珠、脸上浮现出笑容。`);
          await era.printAndWait(
            `「啊嗯…这样的话又想生了…生更多的………${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊…我、我的小穴…撑开了…变成这样了………${heart(1)}」`,
          );
          await era.printAndWait(
            `大概是因为人类的身体、而且还是以少女的身体生出魔物的缘故吧、${target_name}虚脱了。`,
          );
          await era.printAndWait(
            `「主人的小宝宝…十分精神…我已经…哈…哈…${heart(1)}」`,
          );
          await era.printAndWait(
            `${master_name}轻轻地抚摸着${target_name}的头让她慢慢陷入沉睡………`,
          );
        }
      } else if (view.event.妊娠相手 === 5) {
        if (era.get(`talent:${target}:136`) === 1) {
          await era.printAndWait(
            `「生出来了啊…可爱的小狗崽生出来了啊${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「哈啊啊…直到最后都没舍弃希望…真的是狗狗的小宝宝啊………」`,
          );
        }
      } else if (view.event.妊娠相手 === 7) {
        await era.printAndWait(`「哈啊…出、出生了…狂王大人的小宝宝…啊呀啊啊」`);
      } else if (era.get(`talent:${target}:85`)) {
        if (era.get(`talent:${target}:314`) === 9) {
          await era.printAndWait(`「生出了精神的小宝宝………」`);
          await era.printAndWait(
            `${target_name}一脸沉醉地向${master_name}作出产报告。`,
          );
          await era.printAndWait(`「但是下次…想生主人的孩子哟………」`);
        } else {
          await era.printAndWait(`「生出了精神的小宝宝………」`);
          await era.printAndWait(
            `${target_name}一脸沉醉地向${master_name}作出产报告。`,
          );
          await era.printAndWait(`「但是下次…想生主人的孩子哟………」`);
        }
      } else if (era.get(`talent:${target}:76`)) {
        if (era.get(`talent:${target}:314`) === 9) {
          await era.printAndWait(
            `「啊啊啊…生孩子原来是这么的舒服…呐…再让我怀孕…我还要怀上更多的孩子…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的魔族的黄色眼瞳水汪汪地、向${master_name}乞求着………`,
          );
        } else {
          await era.printAndWait(
            `「哈啊…生下魔物的孩子原来是这么的舒服…下次想生下主人的孩子哟…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一脸沉醉地向${master_name}乞求着………`,
          );
        }
      } else if (
        era.get(`mark:${target}:3`) === 3 &&
        view.event.妊娠相手 === 1
      ) {
        await era.printAndWait(`「不…不要啊…生下你的孩子什么的不要啊…！」`);
        await era.printAndWait(
          `事到如今${target_name}手脚被捆着、一边挣扎一边生下了孩子。`,
        );
        await era.printAndWait(`「讨厌…不要…我不要生孩子啊………」`);
      } else if (era.get(`mark:${target}:3`) === 3) {
        await era.printAndWait(`「不…不要啊…生孩子什么的不要啊…！」`);
        await era.printAndWait(
          `事到如今${target_name}手脚被捆着、一边挣扎一边生下了孩子。`,
        );
        await era.printAndWait(`「讨厌…不要…我不要生孩子啊………」`);
      } else {
        if (era.get(`talent:${target}:314`) === 9) {
          await era.printAndWait(
            `${target_name}刚怀孕时还十分抗拒，不过到了临月就完全老实下来了。`,
          );
          await era.printAndWait(`「像这样生孩子什么的…从来就没想过啊………」`);
          await era.printAndWait(
            `${target_name}怜爱地抚摸着鼓起的肚子、就这样平安的生下了孩子………`,
          );
        } else {
          await era.printAndWait(
            `${target_name}刚怀孕时还十分抗拒，不过到了临月就完全老实下来了。`,
          );
          await era.printAndWait(`「像这样生孩子什么的…从来就没想过啊………」`);
          await era.printAndWait(
            `${target_name}怜爱地抚摸着鼓起的肚子、就这样平安的生下了孩子………`,
          );
        }
      }
      // CFLAG:272  = 1（变量语义：CFLAG 族，272）
      kojo.生产 = 1;
    } else {
      if (era.get(`talent:${target}:9`) === 1) {
        await era.printAndWait(
          `「啊呀呀啊啊…哈啊…精神的小宝宝出生了哟…看呐…姐姐……哈…哈………」`,
        );
        await era.printAndWait(
          `精神已经完全混乱的${target_name}嘴里说着莫名其妙的话………`,
        );
      } else if (era.get(`talent:${target}:85`) && view.event.妊娠相手 === 1) {
        if (era.get(`talent:${target}:314`) === 9) {
          await era.printAndWait(`「生出来啦…啊啊…我的小宝宝出生了哟………」`);
          await era.printAndWait(
            `${target_name}那魔族的黄色眼瞳中流下喜悦的泪水、不停地喘息着。`,
          );
          await era.printAndWait(
            `「啊…要生更多…主人的………魔王大人的孩子要生更多………」`,
          );
        } else {
          await era.printAndWait(`「生出来啦…啊啊…我的小宝宝出生了哟………」`);
          await era.printAndWait(`${target_name}流下喜悦的泪水、喘着粗气。`);
          await era.printAndWait(
            `「啊…要生更多…主人的………魔王大人的孩子要生更多………」`,
          );
          await era.printAndWait(`就这样少女成为了被诅咒的魔物的母亲………`);
        }
      } else if (era.get(`talent:${target}:76`) && view.event.妊娠相手 === 1) {
        if (era.get(`talent:${target}:314`) === 9) {
          await era.printAndWait(
            `「啊嗯…啊啊…啊哈…特别有精神的宝宝哟…${heart(1)}」`,
          );
          await era.printAndWait(`生完孩子的${target_name}艰难地呼吸着。`);
          await era.printAndWait(
            `「因为还在肚子里的时候就很闹腾呢…总是能感觉得到呢…${heart(1)}」`,
          );
          await era.printAndWait(`青色的肌肤上浮起汗珠、脸上浮现出笑容。`);
          await era.printAndWait(
            `「啊嗯…这样的话又想生了…生更多的………${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊…我、我的小穴…撑开了…变成这样了………${heart(1)}」`,
          );
          await era.printAndWait(
            `大概是因为人类的身体、而且还是以少女的身体生出魔物的缘故吧、${target_name}虚脱了。`,
          );
          await era.printAndWait(
            `「主人的小宝宝…十分精神…我已经…哈…哈…${heart(1)}」`,
          );
          await era.printAndWait(
            `${master_name}轻轻地抚摸着${target_name}的头让她慢慢陷入沉睡………`,
          );
        }
      } else if (view.event.妊娠相手 === 5) {
        if (era.get(`talent:${target}:136`) === 1) {
          await era.printAndWait(
            `「生出来了啊…可爱的小狗崽生出来了啊${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「哈啊啊…直到最后都没舍弃希望…真的是狗狗的小宝宝啊………」`,
          );
        }
      } else if (view.event.妊娠相手 === 7) {
        await era.printAndWait(`「哈啊…出、出生了…狂王大人的小宝宝…啊呀啊啊」`);
      } else if (era.get(`talent:${target}:85`)) {
        if (era.get(`talent:${target}:314`) === 9) {
          await era.printAndWait(`「生出了精神的小宝宝………」`);
          await era.printAndWait(
            `${target_name}一脸沉醉地向${master_name}作出产报告。`,
          );
          await era.printAndWait(`「但是下次…想生主人的孩子哟………」`);
        } else {
          await era.printAndWait(`「生出了精神的小宝宝………」`);
          await era.printAndWait(
            `${target_name}一脸沉醉地向${master_name}作出产报告。`,
          );
          await era.printAndWait(`「但是下次…想生主人的孩子哟………」`);
        }
      } else if (era.get(`talent:${target}:76`)) {
        if (era.get(`talent:${target}:314`) === 9) {
          await era.printAndWait(
            `「啊啊啊…生孩子原来是这么的舒服…呐…再让我怀孕…我还要怀上更多的孩子…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的魔族的黄色眼瞳水汪汪地、向${master_name}乞求着………`,
          );
        } else {
          await era.printAndWait(
            `「哈啊…生下魔物的孩子原来是这么的舒服…下次想生下主人的孩子哟…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一脸沉醉地向${master_name}乞求着………`,
          );
        }
      } else if (
        era.get(`mark:${target}:3`) === 3 &&
        view.event.妊娠相手 === 1
      ) {
        await era.printAndWait(`「不…不要啊…生下你的孩子什么的不要啊…！」`);
        await era.printAndWait(
          `事到如今${target_name}手脚被捆着、一边挣扎一边生下了孩子。`,
        );
        await era.printAndWait(`「讨厌…不要…我不要生孩子啊………」`);
      } else if (era.get(`mark:${target}:3`) === 3) {
        await era.printAndWait(`「不…不要啊…生孩子什么的不要啊…！」`);
        await era.printAndWait(
          `事到如今${target_name}手脚被捆着、一边挣扎一边生下了孩子。`,
        );
        await era.printAndWait(`「讨厌…不要…我不要生孩子啊………」`);
      } else {
        if (era.get(`talent:${target}:314`) === 9) {
          await era.printAndWait(
            `${target_name}刚怀孕时还十分抗拒，不过到了临月就完全老实下来了。`,
          );
          await era.printAndWait(`「像这样生孩子什么的…从来就没想过啊………」`);
          await era.printAndWait(
            `${target_name}怜爱地抚摸着鼓起的肚子、就这样平安的生下了孩子………`,
          );
        } else {
          await era.printAndWait(
            `${target_name}刚怀孕时还十分抗拒，不过到了临月就完全老实下来了。`,
          );
          await era.printAndWait(`「像这样生孩子什么的…从来就没想过啊………」`);
          await era.printAndWait(
            `${target_name}怜爱地抚摸着鼓起的肚子、就这样平安的生下了孩子………`,
          );
        }
      }
      // CFLAG:272  = 1（变量语义：CFLAG 族，272）
      kojo.生产 = 1;
    }
  }

  if (game.train.初吻与自我口上 === 13) {
    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {
      if (era.get(`talent:${target}:153`)) {
        await era.printAndWait(
          `「在我的肚子里孕育着新生命什么的…总感觉不可思议呐」`,
        );
        await era.printAndWait(
          `${target_name}迎接着临月抚摸着高高鼓起的肚子………`,
        );
      } else if (era.get(`talent:${target}:154`)) {
        await era.printAndWait(`「看啊、这么可爱的小宝宝哦${heart(1)}」`);
        await era.printAndWait(`${target_name}哄着孩子………`);
      }
    }
    // CFLAG:273  = 1（变量语义：CFLAG 族，273）
    kojo.育儿室 = 1;
  }

  if (game.train.初吻与自我口上 === 14) {
    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {
      await era.printAndWait(`「已经要从我身边离开了呢………」`);
    }
    // CFLAG:274  = 1（变量语义：CFLAG 族，274）
    kojo.亲离 = 1;
  }

  if (game.train.初吻与自我口上 === 999) {
    if (era.get(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  }

  if (game.train.初吻与自我口上 === 998) {
    if (era.get(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  }

  // TFLAG:13  = 0（变量语义：TFLAG 族，13）
  game.train.初吻与自我口上 = 0;

  return 0;
}

// @DUNGEON_RYOUZYOKU_K5
async function dungeon_ryouzyoku_k5(rand) {
  const { target, target_name } = bind_ctx(rand);

  await era.printAndWait(`「我、我明明顺路来到这里而已…！」`);

  if (era.get(`talent:${target}:0`) === 1) {
    await era.printAndWait(`「不要啊…我、我在这种地方………！」`);
    await era.printAndWait(
      `${target_name}挥动着孱弱的双臂、不过轻易就被按住了……`,
    );

    await era.printAndWait(`「那、那样的肉棒…一点也不吓人唔…哇啊啊！」`);
  } else {
    await era.printAndWait(`「不要啊…放开我！」`);
    await era.printAndWait(
      `${target_name}挥动着孱弱的双臂、不过轻易就被按住了……`,
    );

    await era.printAndWait(`「呼、哼、这样的…完全没问题……！」`);
  }

  return 0;
}

// @DUNGEON_RYOUZYOKU_AFTER_K5
async function dungeon_ryouzyoku_after_k5(rand) {
  const { target, target_name } = bind_ctx(rand);

  if (era.get(`talent:${target}:0`) === 1) {
    await era.printAndWait(`「啊…已、已经受够了啊……」`);
    await era.printAndWait(`${target_name}被残忍地凌辱了、不过好像还是处女……`);

    if (era.get(`exp:${target}:1`) > 20) {
      await era.printAndWait(
        `${target_name}的肛门被强硬地拨开、里面的肉都翻了出来……`,
      );
      await era.printAndWait(`「啊…屁股…已、已经…坏掉…坏掉了啊……」`);
    }

    if (era.get(`exp:${target}:22`) > 20) {
      await era.printAndWait(`「嗯哎…嗯哦…哦哎哎……啊、下巴…快要脱臼了……」`);
      await era.printAndWait(`${target_name}有时候已经张不开嘴了……`);
    }

    if (era.get(`exp:${target}:20`) > 20) {
      await era.printAndWait(`「咕哎…哦哎哎…动物的味道…嗯咕哎哎……」`);
      await era.printAndWait(`${target_name}吐出了嘴里的精液……`);
    }
  } else {
    await era.printAndWait(`「啊、啊啊…这样的好脏啊……」`);
    await era.printAndWait(`${target_name}被残忍地凌辱了……`);

    if (era.get(`exp:${target}:0`) > 20) {
      await era.printAndWait(`「啊…哎呀…哎呀啊…本小姐的那里…坏掉…坏掉的啊……」`);
      await era.printAndWait(
        `${target_name}的宫颈被扯了出来、大量粘液从里边溢了出来…`,
      );
    }

    if (era.get(`exp:${target}:1`) > 20) {
      await era.printAndWait(
        `${target_name}的肛门被强硬地拨开、里面的肉都翻了出来……`,
      );
      await era.printAndWait(`「啊…屁股…已、已经…坏掉…坏掉了啊……」`);
    }

    if (era.get(`exp:${target}:22`) > 20) {
      await era.printAndWait(`「嗯哎…嗯哦…哦哎哎……啊、下巴…快要脱臼了……」`);
      await era.printAndWait(`${target_name}有时候已经张不开嘴了……`);
    }

    if (era.get(`exp:${target}:20`) > 20) {
      await era.printAndWait(`「咕哎…哦哎哎…动物的味道…嗯咕哎哎……」`);
      await era.printAndWait(`${target_name}吐出了嘴里的精液……`);
    }
  }
}

// @BENKI_KOUJO_K5
async function benki_koujo_k5(rand) {
  const { target } = bind_ctx(rand);
  const a = target;

  if (game.train.肉便器行动 === 0) {
    if (era.get(`talent:${a}:76`) === 1) {
      await era.printAndWait(
        `「啊嗯${heart(1)} 请给我更多的肉棒…把我弄得更加黏乎乎的吧…${heart(1)}」`,
      );
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait(
        `「咿嘻…不、不要…主人啊…再也不会做坏事了…快点…救救我……」`,
      );
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「啊…还有这么多小鸡鸡哦…${heart(1)}」`);
    } else {
      await era.printAndWait(`「咳…咳咳…请、请放过我……」`);
    }
  } else if (game.train.肉便器行动 === 1) {
    if (era.get(`talent:${a}:76`) === 1) {
      await era.printAndWait(
        `「啊啊…姐姐大人…请再多使用我的身体…${heart(1)}」`,
      );
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait(
        `「嗯…嗯啊…再、再这样下去…不、不可以……要回不去了……」`,
      );
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「是、知道了…更多的侍奉……」`);
    } else {
      await era.printAndWait(`「啊那样的…啊……你、想怎么样就怎么样吧……」`);
    }
  } else if (game.train.肉便器行动 === 2) {
    if (era.get(`talent:${a}:76`) === 1) {
      await era.printAndWait(
        `「啊嗯…哈啊${heart(1)} 更多地侵犯我啊${heart(1)} 用动物肉棒让我怀孕吧${heart(1)}」`,
      );
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait(`「呕…动物的味道…不能忍受…呕哦哦哦${heart(1)}」`);
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「好喜欢动物肉棒…请再多让我侍奉它！」`);
    } else {
      await era.printAndWait(`「啊…哈啊…染上动物的气味了……」`);
    }
  } else if (game.train.肉便器行动 === 3) {
    if (era.get(`talent:${a}:76`) === 1) {
      await era.printAndWait(
        `「啊啊…被当成便器也可…可以哟${heart(1)}…更…更多地侵犯我啊${heart(1)}」`,
      );
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait(`「哈…哈…那里被精液射得满满的……${heart(1)}」`);
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「再…请再射给我更多…精液很好吃哦……」`);
    } else {
      await era.printAndWait(`「坏、坏掉了呜…再这样下去会坏掉的……」`);
    }
  } else if (game.train.肉便器行动 === 4) {
    if (era.get(`talent:${a}:76`) === 1) {
      await era.printAndWait(
        `「在小穴里…射出更多${heart(1)}……用更多的精液把我弄的更加黏乎乎的吧…${heart(1)}」`,
      );
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait(`「哈啊…啊…小穴里…精液满满的…啊哈哈……」`);
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「请让我那边变得更加的舒服啊咿……」`);
    } else {
      await era.printAndWait(`「哎呀啊…我的那里…要变成笨蛋了呜……」`);
    }
  } else if (game.train.肉便器行动 === 5) {
    if (era.get(`talent:${a}:76`) === 1) {
      await era.printAndWait(
        `「啊…哈啊…请…请更多地侵犯我的肛门啊哎…${heart(1)}」`,
      );
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait(
        `「啊…撑开成这样…肛门…请更多地使用……${heart(1)}」`,
      );
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「是哟…我…是大家的肛门小穴便器…♪」`);
    } else {
      await era.printAndWait(`「啊…呼啊…我…真的变成便器了……」`);
    }
  }

  return 0;
}

// @DUNGEON_VICTORY_K5
async function dungeon_victory_k5(rand) {
  const { target, rand_n, target_name } = bind_ctx(rand);
  const a = target;

  if (era.get(`talent:${a}:76`) === 1) {
    await era.printAndWait(`「啊哈哈…快点来侵犯我啊…${heart(1)}」`);
    await era.print('');

    if (rand_n(3) === 0) {
      await era.printAndWait(
        `「喂喂、能让我满足的男人不存在的话！？ 女人也是可以的哟${heart(1)}」`,
      );
    } else if (rand_n(2) === 0) {
      await era.printAndWait(`「干脆、直接坐马车到魔王那边去吧${heart(1)}」`);
    } else {
      await era.printAndWait(`「真是的！尸体的话就不能勃起了！」`);
    }

    if (
      (era.get(`base:${a}:0`) * 100) / era.get(`maxbase:${a}:0`) < 50 ||
      (era.get(`base:${a}:1`) * 100) / era.get(`maxbase:${a}:1`) < 50
    ) {
      await era.printAndWait(`${target_name}倚靠着墙壁瘫倒下来。`);
      await era.printAndWait(
        `「…………如果就这样倒下的话就不会被袭击了吧${heart(1)}」`,
      );
    } else {
      await era.printAndWait(`${target_name}依靠着墙壁坐了下来。`);
      await era.printAndWait(
        `「再向深处进发被更多怪物侵犯或许也不错…${heart(1)}」`,
      );
    }
  } else {
    await era.printAndWait(`「我、只是被派到这里来的而已…」`);
    await era.print('');

    if (rand_n(3) === 0) {
      await era.printAndWait(`「喂喂、不想受伤的话就赶快逃走哦！」`);
    } else if (rand_n(2) === 0) {
      await era.printAndWait(
        `「等等！这边正在和魔王大人说话呢所以别来打扰我哟！」`,
      );
    } else {
      await era.printAndWait(`「啊啊！已经！……累了唔！」`);
    }

    if (
      (era.get(`base:${a}:0`) * 100) / era.get(`maxbase:${a}:0`) < 50 ||
      (era.get(`base:${a}:1`) * 100) / era.get(`maxbase:${a}:1`) < 50
    ) {
      await era.printAndWait(`${target_name}倚靠着墙壁瘫倒下来。`);
      await era.printAndWait(`「…再这样下去就危险了」`);
    } else {
      await era.printAndWait(`${target_name}依靠着墙壁坐了下来。`);
      await era.printAndWait(`「呼呜…只要稍微休息下就绝对没问题了！」`);
    }
  }

  return 0;
}

// @DUNGEON_ATTACK_K5
async function dungeon_attack_k5(rand) {
  const { rand_n, view } = bind_ctx(rand);

  if (view.invasion.状态 === 2) {
    if (rand_n(3) === 0) {
      await era.printAndWait(`「即使有阻碍也！」`);
    } else if (rand_n(2) === 0) {
      await era.printAndWait(`「厉害的一击要来了哟！」」`);
    } else {
      await era.printAndWait(`「这就是我认真的一击！」`);
    }
  } else {
    if (rand_n(3) === 0) {
      await era.printAndWait(`「抱歉呢勇者姐姐！」`);
    } else if (rand_n(2) === 0) {
      await era.printAndWait(`「姐姐们也会成为魔王大人的仆人哟！」`);
    } else {
      await era.printAndWait(`「不要因为我小就小看我啊！」`);
    }
  }

  return 0;
}

// @COLOSSEUM_KOJO_5
async function colosseum_kojo_5(rand) {
  const { target, assi, target_name, assi_name, master_name } = bind_ctx(rand);
  // 死斗场三处同型的武器名（源 :7275-:7278、:7308-:7311、:7332-:7335）：
  // TALENT:ASSI:121/122 有则「阴茎」，否则持假阳具时补「假阳具」，两段都不出
  // 时为空串。
  // 原作 ITEM:PBAND：PBAND 是内建非角色变量，SYSTEM ver1.0.3.ERB:42 赋 4
  //（4 号 = 假阳具，Item.csv:5），全库不再改写（#552）
  const assi_has_penis =
    era.get(`talent:${assi}:121`) === 1 || era.get(`talent:${assi}:122`) === 1;
  const assi_has_toy = era.get('item:4') === 1;

  if (era_flag.selectcom === 55) {
    if (era.get(`base:${target}:1`) <= 0) {
      await era.printAndWait(`${target_name}连站起来的力气都没有了……`);
    } else {
      await era.printAndWait(
        `${target_name}看着死斗场里狂热的氛围和之后要对战的对手、吓得直哆嗦……`,
      );
    }
    return 0;
  }

  if (era_flag.selectcom === 56) {
    if (era.get(`base:${target}:1`) <= 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「呼…呼…已、已经不行了………哈啊啊……」`);
        await era.printAndWait(`精疲力尽的${target_name}瘫坐着不动、抽泣着……`);
      } else {
        await era.printAndWait(`「不要、不要啊…不要过来…！」`);
        await era.printAndWait(`精疲力尽的${target_name}瘫坐着不动、抽泣着……`);
      }
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「不、不要啊…勇者大人是不可能战胜的……」`);
        await era.printAndWait(
          `${target_name}看着被${master_name}命令全副武装的${assi_name}、一副快要哭出来的样子……`,
        );
      } else {
        await era.printAndWait(
          `「救、救救我啊…主人…我、我什么坏事都没做啊……」`,
        );
        await era.printAndWait(
          `${target_name}看着丑陋的怪物们、向${master_name}乞求帮助……`,
        );
      }
    }
    return 0;
  }

  if (era_flag.selectcom === 31) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(
        `「啊…因、因为有好好地吮吸…所以不会痛啦……嗯嗯咕呜……」`,
      );
      // 原作是一整行：无后缀 PRINTFORM/PRINT 连续
      // 不换行，末行 PRINTFORMW 才收行。两条 SIF 互斥——判据提到语句外当取值
      // （assi_has_penis/assi_has_toy），文本留在输出语句里（#625）
      await era.printAndWait(
        `舔着${assi_name}的` +
          (assi_has_penis ? `阴茎` : assi_has_toy ? `假阳具` : '') +
          `${target_name}露出心旷神怡的表情……`,
      );
    } else {
      await era.printAndWait(`「啊…噗…嗯嗯呜哦…咳咳…呜呜呜……」`);
      await era.printAndWait(
        `${target_name}吮吸着散发出令人作呕的气味的阴茎……`,
      );
    }
    return 0;
  }

  if (era_flag.selectcom === 5) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(`「住…住手…勇者姐姐…啊！」`);
      await era.printAndWait(`${target_name}任由${assi_name}摆布……`);
    } else {
      await era.printAndWait(`「哎呀…放开我…啊啊…好、好痛…啊！」`);
      await era.printAndWait(
        `${target_name}的胸被用力揉捏、发出了痛苦的呻吟……`,
      );
    }
    return 0;
  }

  if (era_flag.selectcom === 21) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(`「不要啊…好过分…已经够了啦…哎呀啊！」`);
      // 同 :7274 组的一整行（#625）
      await era.printAndWait(
        `${assi_name}一边听着哀嚎` +
          (assi_has_penis ? `阴茎` : assi_has_toy ? `假阳具` : '') +
          `继续毫不留情地蹂躏着${target_name}的阴道……`,
      );
    } else if (game.train.死斗场敌种 === 206) {
      await era.printAndWait(`「啊…啊哈…咕嘿…咕哎哎……」`);
      await era.printAndWait(
        `可怜的${target_name}一边发出蛤蟆被弄碎时发出的惨叫一边任由怪物摆弄……`,
      );
    } else {
      await era.printAndWait(`「哈…哈啊…坏掉了要坏掉了！」`);
      await era.printAndWait(`${target_name}被怪物侵犯着……`);
    }
    return 0;
  }

  if (era_flag.selectcom === 27) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(`「不要啊…不能插那边啊…已经够了啦…哎呀啊！」`);
      // 同 :7274 组的一整行（#625）
      await era.printAndWait(
        `${assi_name}一边听着哀嚎` +
          (assi_has_penis ? `阴茎` : assi_has_toy ? `假阳具` : '') +
          `继续毫不留情地蹂躏着${target_name}的肛门……`,
      );
    } else if (game.train.死斗场敌种 === 206) {
      await era.printAndWait(`「啊…啊哈…咕嘿…咕哎哎……」`);
      await era.printAndWait(
        `可怜的${target_name}一边发出蛤蟆被弄碎时发出的惨叫一边任由怪物摆弄……`,
      );
    } else {
      await era.printAndWait(`「咿…咿…屁股…屁股要裂开来了！」`);
      await era.printAndWait(`${target_name}被怪物侵犯着肛门……`);
    }
    return 0;
  }

  if (era_flag.selectcom === 51) {
    await era.printAndWait(`「啊…身、身体好烫…啊啊…！」`);
    return 0;
  }

  return 0;
}

// @NTR_KOUJO_K5
async function ntr_koujo_k5(rand, P) {
  const { target, view, kojo } = bind_ctx(rand);
  P = P ?? 0;

  if (kojo.NTR再捕获 === 0) {
    // CFLAG:650  = 1（变量语义：CFLAG 族，650）
    kojo.NTR再捕获 = 1;
  }

  if (P === 1) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「不要啊！我的第一次要献给魔王大人的啊…啊…嘻咿！」`,
      );
    } else {
      await era.printAndWait(`「为什么…我明明只是个村娘…啊咿…哈…啊啊啊哈！」`);
    }
    // CFLAG:651  = 1（变量语义：CFLAG 族，651）
    kojo.NTR_651 = 1;
  } else if (P === 2) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「好难受…明明好难受、可是…为什么…肛门被侵犯…这样的…嘻咿…咿…咿嘻${heart(1)}」`,
      );
    } else {
      await era.printAndWait(`「不是的…我…的屁股有感觉什么的…啊…啊♪啊♪」`);
    }
    // CFLAG:652  = 1（变量语义：CFLAG 族，652）
    kojo.NTR_652 = 1;
  } else if (P === 3) {
    if (era.get(`talent:${target}:136`)) {
      await era.printAndWait(
        `「哎呀嗯…被看见了…被狗狗干到高潮的地方被看到了啊${heart(1)}」`,
      );
    } else if (
      era.get(`talent:${target}:76`) ||
      era.get(`talent:${target}:85`)
    ) {
      await era.printAndWait(
        `「不要…不要看…不要看…嘻咿…啊啊…这么深的地方…被侵犯…救救我…救救我啊魔王大人………」`,
      );
    } else {
      await era.printAndWait(
        `「为什么…我看到的这么多…不合道理啊…狗狗的小鸡鸡…全部都由我来…哈…呀啊！」`,
      );
    }
    // CFLAG:653  = 1（变量语义：CFLAG 族，653）
    kojo.NTR_653 = 1;
  } else if (P === 4) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「对不起魔王大人…我…被狂王大人…侵犯地…好有感觉…已经变成这样的小姑娘什么的…忘了我吧…啊啊${heart(1)}」`,
      );
    } else {
      await era.printAndWait(`「啊啊嗯…狂王大人啊…我的小穴…再多侵犯几次啊♪」`);
    }
    // CFLAG:654  = 1（变量语义：CFLAG 族，654）
    kojo.NTR_654 = 1;
  } else if (P === 5) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「嗯呼呼…我的小穴和肛门你们都能插进来所以${heart(1)}」`,
      );
      await era.printAndWait(
        `「啊…就是那样…哟…虽然我还是个孩子但…还请不要和我客气…啊啊啊嗯${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「嘻咿咿咿！那里和屁股都…要坏掉…坏掉了啦…但是…好舒服…脑袋要变得奇怪了♪」」`,
      );
    }
    // CFLAG:655  = 1（变量语义：CFLAG 族，655）
    kojo.NTR_655 = 1;
  } else if (P === 6) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「被魔王玩弄的我…请多施舍给我一点你们的怜悯…拜托了…小穴以外的免费干也可以哟…哈啊…十分感谢${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「哈啊…被各位玩弄之后…魔王遗留在我身体里的污秽被净化了…所以…请更多地…更多地使用我吧…♪」`,
      );
    }
    // CFLAG:656  = 1（变量语义：CFLAG 族，656）
    kojo.NTR_656 = 1;
  } else if (P === 7) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「魔王大人…对不起呢、我已经成为狂王大人的东西了…今后也会以侍奉狂王大人为生」`,
      );
      await era.printAndWait(
        `「魔王大人关于我的事…请全部都忘了吧………啊…狂王大人…啊哈…呜…呼呜${heart(1)}」`,
      );
    } else {
      await era.printAndWait(`「是…会更多地…侍奉狂王大人的…嗯…嗯啾…啾啪………♪」`);
    }
    // CFLAG:657  = 1（变量语义：CFLAG 族，657）
    kojo.NTR_657 = 1;
  } else if (P === 20) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      if (view.event.妊娠相手 === 1) {
        await era.printAndWait(
          `「魔王大人的小宝宝…还给我…把我的小宝宝…还给我………」`,
        );
      } else {
        await era.printAndWait(
          `「啊啊啊…小宝宝要生出来了…魔王大人也在看啊…呀啊啊啊…」`,
        );
      }
    } else {
      await era.printAndWait(`「啊…哈啊…我…在这里被大家看着…已经、不行了………」`);
    }
  }
  return 0;
}

// @EXUCUTION_KOUJO_K5
async function exucution_koujo_k5(rand) {
  bind_ctx(rand);

  if (game.event.犬射精或处刑口上 === 4) {
    await era.printAndWait(
      `「不、不要…以后一直…变成怪物们的肉便器什么的…不要啊………」`,
    );
  } else if (game.event.犬射精或处刑口上 === 5) {
    await era.printAndWait(`「让我这种人成为战斗人员什么的要我怎么做啊………」`);
  } else if (game.event.犬射精或处刑口上 === 6) {
    await era.printAndWait(`「呜呜呜…处罚什么的…为什么…究竟是为什么啊………」`);
  } else if (game.event.犬射精或处刑口上 === 7) {
    await era.printAndWait('');
  }
}

// @MUSEUM_KOUJO_K5
async function museum_koujo_k5(rand) {
  bind_ctx(rand);

  if (game.event.博物馆口上 === 0) {
    await era.printAndWait(
      `「把我变成石像放在身边什么的…魔王大人的想法我完全不明白啊…请不要做那样的事啊………」`,
    );
  } else if (game.event.博物馆口上 === 1) {
    await era.printAndWait(`「剥制标本…那是对鸟和狐狸什么的才会做的事情啊」`);
  } else if (game.event.博物馆口上 === 2) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 === 3) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 === 4) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 === 5) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 === 6) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 === 7) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 === 8) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 === 9) {
    await era.printAndWait('');
  }
}

// @BANISHMENT_KOUJO_K5
async function banishment_koujo_k5(rand) {
  bind_ctx(rand);

  if (game.event.流放口上 === 0) {
    await era.printAndWait(`「这样终于…终于能回到姐姐身边去了………」`);
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

// @PUBLIC_EXUCUTION_KOUJO_K5
async function public_exucution_koujo_k5(rand) {
  bind_ctx(rand);

  if (game.event.公开处刑口上 === 0) {
    await era.printAndWait(
      `「在骗我吧…一直干我到死为止什么的…不…不要…不要啊！」`,
    );
  } else if (game.event.公开处刑口上 === 1) {
    await era.printAndWait(
      `「明明什么坏事都没做…为什么…要赐我绞首刑啊…魔王大人………」`,
    );
  } else if (game.event.公开处刑口上 === 2) {
    await era.printAndWait('');
  }
}

// @GROTESQUE_KOUJO_K5
async function grotesque_koujo_k5(rand) {
  bind_ctx(rand);

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

// @ENTERENEMY_KOUJO_K5
async function enterenemy_koujo_k5(rand) {
  const { target } = bind_ctx(rand);
  const a = target;

  if (era.get(`talent:${a}:76`) === 1) {
    await era.printAndWait(
      `「那个~…”等会你乖乖地在那个洞里被干”被那位大人这样吩咐过了${heart(1)}」`,
    );
  } else {
    await era.printAndWait(`「那个~过会能带我去魔王大人那里吗？」`);
  }
}

// @GOHOUBI_REQUEST_KOUJO_K5
async function gohoubi_request_koujo_k5(cid, rand) {
  const { target } = bind_ctx(rand);
  const a = cid ?? target;

  if (chara(a).stronghold.要求奖赏 === 0) {
    await era.printAndWait(`「那个、想要钱作为奖赏、尽可能多的钱」`);
  } else if (
    chara(a).stronghold.要求奖赏 === 1 ||
    chara(a).stronghold.要求奖赏 === 2 ||
    chara(a).stronghold.要求奖赏 === 3
  ) {
    // 原作是一整行：无后缀 PRINTFORM/PRINT 连续
    // 不换行，末行 PRINTFORMW 才收行——判据提到语句外当取值、文本留在输出
    // 语句里（#625）
    const beast_word =
      chara(a).stronghold.要求奖赏 === 1
        ? '犬'
        : chara(a).stronghold.要求奖赏 === 2
          ? '豚'
          : '马';
    await era.printAndWait(
      `「如果打倒勇者姐姐的话请给我奖赏、好想和` + beast_word + `做爱啊♪」`,
    );
  } else if (chara(a).stronghold.要求奖赏 === 4) {
    await era.printAndWait(`「事后给本小姐一个吻就可以哟♪」`);
  } else if (chara(a).stronghold.要求奖赏 === 5) {
    await era.printAndWait(`「奖赏的话、想要和魔王大人做爱啊」`);
  } else if (chara(a).stronghold.要求奖赏 === 6) {
    await era.printAndWait(`「能喝到魔王大人的精液的话不管什么都能做哟」`);
  } else if (chara(a).stronghold.要求奖赏 === 7) {
    await era.printAndWait(`「奖赏是乱交派对就好！」`);
  } else if (chara(a).stronghold.要求奖赏 === 8) {
    await era.printAndWait(`「如果平安回来的话、想要喝魔王大人的尿尿哦」`);
  } else if (chara(a).stronghold.要求奖赏 === 9) {
    await era.printAndWait(`「奖赏？我想要去狩猎童贞♪」`);
  }
}

// @GOHOUBI_AFTER_KOUJO_K5
async function gohoubi_after_koujo_k5(cid, choice, rand) {
  const { target } = bind_ctx(rand);
  const a = target;

  if (choice === 0) {
    await era.printAndWait(`「真小气！」`);
  } else if (choice === 1) {
    await era.printAndWait(`「欸嘿嘿、是奖赏徽章啊」`);
  } else if (choice === 2) {
    if (chara(a).stronghold.要求奖赏 === 0) {
      await era.printAndWait(`「那个、虽然想把这个钱给姐姐但………」`);
    } else if (chara(a).stronghold.要求奖赏 === 1) {
      if (era.get(`talent:${a}:0`) === 1) {
        await era.printAndWait(`「啊啊啊！和小狗肛交好棒啊！好舒服！」`);
      } else {
        await era.printAndWait(`「啊啊啊！和小狗做爱好棒啊！好舒服！」`);
      }
    } else if (chara(a).stronghold.要求奖赏 === 2) {
      if (era.get(`talent:${a}:0`) === 1) {
        await era.printAndWait(`「啊啊啊！和猪肛交好棒啊！好舒服！」`);
      } else {
        await era.printAndWait(`「啊啊啊！和猪做爱好棒啊！好舒服！」`);
      }
    } else if (chara(a).stronghold.要求奖赏 === 3) {
      if (era.get(`talent:${a}:0`) === 1) {
        await era.printAndWait(`「啊啊啊！和马肛交好棒啊！好舒服！」`);
      } else {
        await era.printAndWait(`「啊啊啊！和马做爱好棒啊！好舒服！」`);
      }
    } else if (chara(a).stronghold.要求奖赏 === 4) {
      await era.printAndWait(
        `「作为奖励的吻…感觉不一样呢………这样的…或许更喜欢也不一定呢」`,
      );
    } else if (chara(a).stronghold.要求奖赏 === 5) {
      if (era.get(`abl:${a}:2`) > era.get(`abl:${a}:3`)) {
        await era.printAndWait(
          `「啊嗯！比平时还要激烈！呼啊！喜欢哟！最喜欢了！」`,
        );
      } else {
        await era.printAndWait(
          `「啊嗯！比平时还要激烈！呼啊！喜欢哟！最喜欢了！」`,
        );
      }
    } else if (chara(a).stronghold.要求奖赏 === 6) {
      await era.printAndWait(`「呼呜…哈啊…魔王大人的精液美味得要让我发狂了♪」`);
    } else if (chara(a).stronghold.要求奖赏 === 7) {
      if (era.get(`talent:${a}:0`) === 1) {
        await era.printAndWait(
          `「哈啊…还想要乱交派对………必须努力打倒勇者姐姐♪」`,
        );
      } else {
        await era.printAndWait(
          `「哈啊…还想要乱交派对………必须努力打倒勇者姐姐♪」`,
        );
      }
    } else if (chara(a).stronghold.要求奖赏 === 8) {
      await era.printAndWait(`「承蒙款待、尿尿很美味哟、魔王大人${heart(1)}」`);
    } else if (chara(a).stronghold.要求奖赏 === 9) {
      if (era.get(`abl:${a}:2`) > era.get(`abl:${a}:3`)) {
        await era.printAndWait(
          `「呜呼呼、魔王大人的女人让你成为男人的感想如何呀？」`,
        );
      } else {
        await era.printAndWait(`「变得这么拼命地扭动着腰还真是可爱啊、你」`);
      }
    } else {
      // 源空 ELSE 支
    }
  }
}

// @OSIOKI_KOUJO_K5
async function osioki_koujo_k5(cid, choice, rand) {
  const { target } = bind_ctx(rand);
  const a = target;

  if (choice === 0) {
    await era.printAndWait(`「十、十分感谢！十分感谢您！」`);
  } else if (choice === 1) {
    if (era.get(`abl:${a}:21`) >= 3) {
      await era.printAndWait(`「啊呜…呜呃…啊呜…好厉害…电椅好棒${heart(1)}」`);
    } else {
      await era.printAndWait(`「呜嘻咿咿咿！不要啊啊啊！请放过我吧！」`);
    }
  } else if (choice === 2) {
    if (era.get(`abl:${a}:17`) >= 4) {
      await era.printAndWait(
        `「啊嗯、真是的${heart(1)} 虽然可以看但是触摸禁止哟♪」`,
      );
    } else {
      await era.printAndWait(`「呜哦哦咕…不要看…不要笑啊！」`);
    }
  } else if (choice === 3) {
    if (era.get(`abl:${a}:17`) >= 6) {
      await era.printAndWait(
        `「啊嗯…哈啊…再多看看我…请再多看看我啊${heart(1)}」`,
      );
    } else {
      await era.printAndWait(`「呜啊啊啊啊…呜呃呃呃啊」`);
    }
  } else if (choice === 4) {
    if (era.get(`abl:${a}:21`) >= 3) {
      await era.printAndWait(`「被魔王大人打的快要高潮了！请再多处罚我吧！」`);
    } else {
      await era.printAndWait(`「对不起！对不起！下次不会再失败了！」`);
    }
  } else if (choice === 5) {
    if (era.get(`talent:${a}:88`) === 1 || era.get(`talent:${a}:76`) === 1) {
      await era.printAndWait(`「尿尿好好吃…♪」`);
    } else {
      await era.printAndWait(`「呜…好臭要被熏死了………」`);
    }
  } else if (choice === 6) {
    await era.printAndWait(`「讨厌啊、要想起从前的事了」`);
  } else if (choice === 7) {
    await era.printAndWait(`「呐、习惯了之后完全没问题嘛」`);
  } else if (choice === 8) {
    await era.printAndWait(
      `「咕呜呜呜！已经、已经不行了！要疯掉了！我已经要疯掉了！已经什么都呜啊啊啊！」`,
    );
  } else if (choice === 9) {
    await era.printAndWait(`「嘎哦～♪嘎哦～♪」`);
  }
}

// @GOBI_KOUJO_K5, ARG:0
function gobi_koujo_k5(arg_0, rand) {
  const { rand_n } = bind_ctx(rand);

  if (arg_0 === 1) {
    return `的噢~♪`;
  } else if (arg_0 === 2) {
    return `的啊！`;
  } else if (arg_0 === 3) {
    return `来着……。`;
  } else if (arg_0 === 4) {
    return `来的呢……。`;
  } else if (arg_0 === 5) {
    return `的啊……。`;
  } else {
    if (rand_n(3) === 0) {
      return `来着。`;
    } else if (rand_n(2) === 0) {
      return `的啊。`;
    } else {
      return `的噢。`;
    }
  }
}

on('EVENTTRAIN', eventtrain_k5);
on('EVENTEND', eventend_k5);

kojo_message_com_family.register(5, kojo_message_com_5);
self_kojo_family.register(5, self_kojo_k5);
kojo_message_palamcng_family.register(5, kojo_message_palamcng_5);
kojo_message_markcng_family.register(5, kojo_message_markcng_5);
gohoubi_after_koujo_family.register(5, gohoubi_after_koujo_k5);
osioski_koujo_family.register(5, osioki_koujo_k5);
gohoubi_request_koujo_family.register(5, gohoubi_request_koujo_k5);
ryouzyoku_kojo_family.register(5, dungeon_ryouzyoku_k5);
ryouzyoku_after_kojo_family.register(5, dungeon_ryouzyoku_after_k5);
gobi_koujo_family.register(5, gobi_koujo_k5);
benki_koujo_family.register(5, benki_koujo_k5);
enterenemy_koujo_family.register(5, enterenemy_koujo_k5);
dungeon_victory_family.register(5, dungeon_victory_k5);
dungeon_attack_family.register(5, dungeon_attack_k5);
ntr_koujo_family.register(5, ntr_koujo_k5);
exucution_koujo_family.register(5, exucution_koujo_k5);
museum_koujo_family.register(5, museum_koujo_k5);
banishment_koujo_family.register(5, banishment_koujo_k5);
public_exucution_koujo_family.register(5, public_exucution_koujo_k5);
grotesque_koujo_family.register(5, grotesque_koujo_k5);

module.exports = {
  kojo_message_com_5,
  colosseum_kojo_5,
  k5_kojo2,
  self_kojo_k5,
  kojo_message_palamcng_5,
  kojo_message_markcng_5,
  benki_koujo_k5,
  dungeon_ryouzyoku_k5,
  dungeon_ryouzyoku_after_k5,
  dungeon_victory_k5,
  dungeon_attack_k5,
  ntr_koujo_k5,
  exucution_koujo_k5,
  museum_koujo_k5,
  banishment_koujo_k5,
  public_exucution_koujo_k5,
  grotesque_koujo_k5,
  enterenemy_koujo_k5,
  gohoubi_request_koujo_k5,
  gohoubi_after_koujo_k5,
  osioki_koujo_k5,
  gobi_koujo_k5,
};
