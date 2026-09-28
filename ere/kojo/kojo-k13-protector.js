/* eslint-disable no-irregular-whitespace, no-dupe-else-if */
/**
 * @file 庇护者性格口上 K13：EVENTTRAIN 存在标志 + 主体（issue #244）。
 *
 * == 头部检查（KOJO_MESSAGE_COM_13，与模板七条不同） ==
 *
 * ①TEQUIP:45 && SELECTCOM!=45 → return 0；②TFLAG:899（失神）→ return 0；
 * ③TEQUIP:89 → CALL DOG_KOJO_13, return 0；④TEQUIP:55 → CALL
 * COLOSSEUM_KOJO_13, return 0。ASSI 检查未实现（助手调教时照常出声）；
 * TALENT:9 与 TEQUIP:90 本函数不读。
 *
 * == 混写条件的读法（运算符序列同层不交叉） ==
 *
 * EVENTTRAIN 屈服Lv2/Lv3/淫乱的 `TALENT:157 && TALENT:110 || TALENT:114 ||
 * TALENT:119`：旧引擎的 && 与 || 同优先级、左结合，读作
 * `((TALENT:157 && TALENT:110) || TALENT:114) || TALENT:119`。该层的运算符序列
 * 是「`&&` … `||` … `||`」，`||` 之后没有 `&&`，左折叠与 C 式分组得到同一棵树
 * ——两种读法在一切取值上同值，故采用当前分组写法。
 *
 * == EVENTEND 淫乱体力>=500 分支的返回值 ==
 *
 * 该分支出完台词后没有单独 return 1，落到函数末尾的 return 0。事件分发的
 * emit() 不读处理器返回值，返回 0 与返回 1 在游戏内不可区分，故不补
 * return 1。
 *
 * SELL_MATURO_K0 成熟出售真身已随 #338 接通。
 */

'use strict';

const era = require('#/era-electron');
const { sell_maturo_k0 } = require('#/system/stronghold/sell-maturo');
const { on, TIER } = require('#/system/event/registry');
const era_flag = require('#/era-utils/era-flag');
const { PALAMLV } = require('#/era-utils/palam-level');
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
const { heart, self_call } = require('#/kojo/kojo-text');
const { get_look_info } = require('#/chara/look-info');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { chara_callname, chara_name } = require('#/utils/callname-utils');
const {
  peek_aftertrain_q,
  peek_aftertrain_s,
} = require('#/event/event-aftertrain');
const {
  gohoubi_after_koujo_family,
  osioski_koujo_family,
  gohoubi_request_koujo_family,
} = require('#/kojo/kojo-dungeon-after');
const {
  ryouzyoku_kojo_family,
  ryouzyoku_after_kojo_family,
} = require('#/kojo/kojo-dungeon-ravish');

/** 读未声明的序号返回 undefined 而非 0（#13），口上条件一律 || 0 作缺省处理 */
const era0 = (k) => era.get(k) || 0;

function bind_ctx(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const assi = era_flag.assi;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const assi_name = assi >= 0 ? chara_callname(assi) : ''; // %SAVESTR:ASSI%
  const master_name = chara_name(0); // %NAME:MASTER%
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%
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
    kojo,
  };
}

// EVENTTRAIN #PRI 档：存在标志 + 总开关补 0
on(
  'EVENTTRAIN',
  () => {
    game.kojo.口上存在_13 = 1; // FLAG:113 = 1（K13 口上存在标志）
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
    game.kojo.口上存在_13 = 0;
  },
  TIER.LATER,
);

// eventtrain_k13：EVENTTRAIN NORMAL 档
async function eventtrain_k13(rand) {
  const { rand_n, target, target_name, master_name, sc, kojo } = bind_ctx(rand);
  if (game.kojo.口上开关 <= 0) {
    return 0;
  }
  if (era0(`talent:${target}:173`) != 1) {
    return 0;
  }

  if (kojo.初调教 == 0) {
    era.drawLine();

    if (rand_n(2) == 0 && era0(`talent:${target}:157`)) {
      await era.printAndWait(`「哎呀哎呀、怎么办呢」`);

      if (
        era0(`talent:${target}:200`) == 1 ||
        era0(`talent:${target}:205`) == 1
      ) {
        await era.printAndWait(`「既然被没收了武器就没没办法了了」`);
      } else if (
        era0(`talent:${target}:201`) == 1 ||
        era0(`talent:${target}:206`) == 1
      ) {
        await era.printAndWait(`「居然将${sc()}给抓住了什么的……」`);
      } else if (
        era0(`talent:${target}:202`) == 1 ||
        era0(`talent:${target}:207`) == 1
      ) {
        await era.printAndWait(`「这可真是遇上了危机呢」`);
      } else if (
        era0(`talent:${target}:203`) == 1 ||
        era0(`talent:${target}:208`) == 1
      ) {
        await era.printAndWait(`「请饶恕${sc()}好吗？」`);
      }

      if (rand_n(2) == 0) {
        await era.printAndWait(
          `被俘虏的${target_name}歪歪脑袋显出一副镇定沉着的模样。`,
        );
      } else {
        await era.printAndWait(`${target_name}用手托腮、一副镇定沉着的模样。`);
      }
    } else {
      await era.printAndWait(`「哎呀哎呀、${sc()}还是被抓住了呢」`);
      await era.printAndWait(
        `「要是对做${sc()}一直以来那种过分的事、${sc()}可不会原谅哦」`,
      );
      await era.printAndWait(`「现在停手还来得及。再考虑考虑吧」`);
      if (era0(`talent:${target}:157`)) {
        await era.printAndWait(`（亲爱的……无论如何都得回到你身边啊）`);
      }
    }
    // CFLAG:201  = 1（变量语义：CFLAG 族，201）
    kojo.初调教 = 1;
    return 1;
  } else if (kojo.初调教 >= 1 && kojo.NTR再捕获 == 1) {
    if (era0(`talent:${target}:85`) || era0(`talent:${target}:76`)) {
      era.drawLine();
      await era.printAndWait(`「呜呜……请原谅我。${sc()}一度背叛了您」`);
      await era.printAndWait(`「之前的事情${sc()}请让它就这样过去吧……」`);
      await era.printAndWait(`「今后我会竭尽全力的服侍您的……」`);

      // CFLAG:650  = 0（变量语义：CFLAG 族，650）
      kojo.NTR再捕获 = 0;
    } else {
      era.drawLine();
      await era.printAndWait(`「呜呜……${sc()}请原谅我……」`);
      await era.printAndWait(`「今后我会竭尽全力的服侍您的……」`);
      if (era0(`talent:${target}:157`)) {
        await era.printAndWait(`（亲爱的……无论如何都得回到你身边）`);
      }

      // CFLAG:650  = 0（变量语义：CFLAG 族，650）
      kojo.NTR再捕获 = 0;
    }
    return 1;
  } else if (kojo.初调教 < 2 && era0(`mark:${target}:2`) == 1) {
    era.drawLine();
    if (era0(`talent:${target}:157`)) {
      await era.printAndWait(
        `「哎呀哎呀、打算用这种野蛮的方式来让${sc()}就范吗」`,
      );
      await era.printAndWait(`「那种方法根本没法让${sc()}动摇的」`);
      await era.printAndWait(`「而且呢……${sc()}早就、将身体献给那个人了」`);

      if (
        era0(`talent:${target}:110`) ||
        era0(`talent:${target}:114`) ||
        era0(`talent:${target}:119`)
      ) {
        await era.printAndWait(
          `${target_name}一副从容不迫的模样、抖动着傲人的双峰、`,
        );
      } else {
        await era.printAndWait(
          `${target_name}一副从容不迫的模样、轻抚着平坦的胸部、`,
        );
      }
      await era.printAndWait(`微笑着摩挲无名指上的订制戒指。`);
    } else {
      await era.printAndWait(`「比起那些、来做点有意义的事如何」`);
    }
    // CFLAG:201  = 2（变量语义：CFLAG 族，201）
    kojo.初调教 = 2;
    return 1;
  } else if (kojo.初调教 < 3 && era0(`mark:${target}:2`) == 2) {
    era.drawLine();
    if (
      (era0(`talent:${target}:157`) && era0(`talent:${target}:110`)) ||
      era0(`talent:${target}:114`) ||
      era0(`talent:${target}:119`)
    ) {
      await era.printAndWait(
        `「呼呵呵……就承认这段时间${sc()}的心稍微有些动摇了吧」`,
      );
      await era.printAndWait(
        `「但是呢、就算是支配了身体也夺不走${target_name}的心哦」`,
      );
      await era.printAndWait(
        `「就这样放弃吧？、这样做的话对你和${target_name}都不会有什么损失」`,
      );
      await era.printAndWait(
        `${target_name}劝导似的凝视着${master_name}的瞳孔……`,
      );
    } else {
      await era.printAndWait(`「${sc()}是……绝对不会被你支配的！」`);
      await era.printAndWait(`「绝对……${sc()}绝对是不会输的！」`);
      await era.printAndWait(`「继续做这种事也是一点意义都没有的明白了吗！」`);
      await era.printAndWait(`${target_name}毅然决然地放出了这样的宣言。`);
      if (era0(`talent:${target}:157`)) {
        await era.printAndWait(`（这可…如何是好…救救${sc()}……吧……亲爱的……）`);
      }
    }
    // CFLAG:201  = 3（变量语义：CFLAG 族，201）
    kojo.初调教 = 3;
    return 1;
  } else if (
    kojo.初调教 < 4 &&
    era0(`mark:${target}:2`) == 3 &&
    era0(`talent:${target}:85`) == 0
  ) {
    era.drawLine();
    if (
      (era0(`talent:${target}:157`) && era0(`talent:${target}:110`)) ||
      era0(`talent:${target}:114`) ||
      era0(`talent:${target}:119`)
    ) {
      await era.printAndWait(`「哎呀哎呀……又来了啊」`);
      await era.printAndWait(`「这么火热的话${sc()}也……」`);
      await era.printAndWait(`「没…没什么、嗯呼呼……那么、今天也来做吧？」`);
      await era.printAndWait(`${sc()}露出了和初次造访时完全不同的女人的表情`);
      await era.printAndWait(`将自己交给了${master_name}`);
    } else {
      await era.printAndWait(`「您是……主人、${sc()}向您屈服……」`);
      await era.printAndWait(`「所以……${sc()}不会再做、无谓的反抗了……」`);
      await era.printAndWait(`「什么都……什么都会做的……」`);
      if (era0(`talent:${target}:157`)) {
        await era.printAndWait(`（对不起了……亲爱的……${sc()}……已经……）`);
      }
    }
    // CFLAG:201  = 4（变量语义：CFLAG 族，201）
    kojo.初调教 = 4;
    return 1;
  } else if (
    kojo.初调教 < 5 &&
    era0(`talent:${target}:76`) == 1 &&
    era0(`talent:${target}:85`) == 0
  ) {
    era.drawLine();
    if (
      (era0(`talent:${target}:157`) && era0(`talent:${target}:110`)) ||
      era0(`talent:${target}:114`) ||
      era0(`talent:${target}:119`)
    ) {
      await era.printAndWait(`「唔呼呼${heart(1)}……」`);
      await era.printAndWait(`「将${sc()}的身体染上您的颜色吧」`);
      await era.printAndWait(
        `「无论是怎样的精英始终只是个女人、这副身体终于明白淫乱之乐了」`,
      );
      await era.printAndWait(`「那么……请下令吧、主人大人${heart(3)}」`);
    } else {
      await era.printAndWait(`「让${sc()}变得这么淫荡……真是十分感谢」`);
      await era.printAndWait(
        `「作为一个女人……不、作为一条母狗、总算找回了些自信……」`,
      );
      await era.printAndWait(`「今后也请您……好好地疼爱这条母狗哦……♪」`);
      if (era0(`talent:${target}:157`)) {
        await era.printAndWait(
          `「那个人的事怎样都行了啦……快把大鸡巴交出来就行啦」`,
        );
      }
    }
    // CFLAG:201  = 5（变量语义：CFLAG 族，201）
    kojo.初调教 = 5;
    return 1;
  } else if (kojo.初调教 < 6 && era0(`talent:${target}:85`) == 1) {
    era.drawLine();

    await era.printAndWait(
      `「嘻嘻、${sc()}想${sc()}现在找到了${sc()}的真爱了……谢谢您」`,
    );
    await era.printAndWait(
      `「作为一个女人……之前的${sc()}竟然忘记了恋爱的感觉」`,
    );
    await era.printAndWait(`「以后……可要好好地疼爱${sc()}哟……♪」`);

    // CFLAG:201  = 6（变量语义：CFLAG 族，201）
    kojo.初调教 = 6;
    return 1;
  } else if (era_flag.assi < 0) {
    await k13_kojo2(rand); // CALL K13_KOJO2
  } else {
    await k13_kojo2(rand); // CALL K13_KOJO2
  }
}

// k13_kojo2
async function k13_kojo2(rand) {
  const { rand_n, target, sc } = bind_ctx(rand);

  if (era0(`mark:${target}:3`) == 3 && game.kojo.口上开关 == 2) {
    era.drawLine();
    await era.printAndWait(`「哎呀哎呀、垃圾你在往哪看呢、说你呢」`);
    await era.printAndWait(`「赶紧从${sc()}的眼前消失」`);
    await era.printAndWait(`「看到你、${sc()}饭都吃不下去了……」`);
    if (era0(`talent:${target}:157`)) {
      await era.printAndWait(`（亲爱的……${sc()}绝对不会忘记你的……请你再等等）`);
    }
    return 1;
  } else if (era0(`mark:${target}:2`) == 0 && game.kojo.口上开关 == 2) {
    era.drawLine();
    if (rand_n(2) == 0) {
      await era.print(`「又开始要做什么了吗？」`);
      await era.print(`「无论对${sc()}做什么都一样的、没用的」`);
      await era.printAndWait(`「所以说、还是放弃这种事吧……」`);
    } else {
      await era.printAndWait(`「你想说些什么吗？」`);
      await era.printAndWait(`「无论对${sc()}做什么都一样的、无用功而已呦」`);
      await era.printAndWait(`「所以说……还是放弃这种事吧」`);
    }
    if (era0(`talent:${target}:157`)) {
      if (rand_n(3) == 0) {
        await era.printAndWait(`（亲爱的……${sc()}绝对不会输的……）`);
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`（亲爱的……${sc()}会在远方坚强地继续作战的……）`);
      } else {
        await era.printAndWait(`（亲爱的……还家里等着${sc()}回去呢……）`);
      }
    }
    return 1;
  } else if (era0(`mark:${target}:2`) == 1 && game.kojo.口上开关 == 2) {
    era.drawLine();
    if (rand_n(2) == 0) {
      await era.print(`「还是、不肯死心对吧」`);
      await era.print(`「${sc()}是绝对不会屈服的」`);
      await era.printAndWait(`「来吧……怎么喜欢怎么来好了」`);
    } else {
      await era.printAndWait(`「啧……今天也来了。好吧」`);
      await era.printAndWait(
        `「无论对${sc()}做什么都一样的、没用的……已经说过了吧！」`,
      );
      await era.printAndWait(`「而且、${sc()}是不会屈服的……」`);
    }
    if (era0(`talent:${target}:157`)) {
      await era.printAndWait(`（亲爱的……请赐予${sc()}勇气吧……）`);
    }
    return 1;
  } else if (era0(`mark:${target}:2`) == 2 && game.kojo.口上开关 == 2) {
    era.drawLine();
    await era.printAndWait(`「难道……就这样结束了吗……」`);
    await era.printAndWait(`「${sc()}快……不、没什么的」`);
    await era.printAndWait(
      `「不管遇上多么残酷的事情、${sc()}也决不能放弃的……」`,
    );
    if (era0(`talent:${target}:157`)) {
      await era.printAndWait(`（老公……${sc()}快要坚持不住了……请给我力量吧）`);
    }
    return 1;
  } else if (
    era0(`mark:${target}:2`) == 3 &&
    era0(`talent:${target}:85`) == 0 &&
    era0(`talent:${target}:76`) == 0 &&
    game.kojo.口上开关 == 2
  ) {
    era.drawLine();
    await era.printAndWait(`「哈啊…哈啊…不行了……已经极限了……」`);
    await era.printAndWait(`「${sc()}确实……小看你的能耐了」`);
    await era.printAndWait(`「还请……不要再对${sc()}做了更过分的事了……」`);
    if (era0(`talent:${target}:157`)) {
      await era.printAndWait(`（老公……${sc()}已经……对不起……但……）`);
    }
    return 1;
  } else if (era0(`talent:${target}:76`) == 1 && game.kojo.口上开关 == 2) {
    era.drawLine();

    if (rand_n(3) == 0) {
      await era.printAndWait(`「恭候您的光临……今天也能好好地疼爱${sc()}吗？」`);
      await era.printAndWait(
        `「${sc()}看到您的一瞬间……${sc()}的下面早已经湿透了」`,
      );
      await era.printAndWait(`「请您……将${sc()}变得更加淫荡吧…」`);
    } else if (rand_n(2) == 0) {
      await era.printAndWait(`「哎呀、来了啊……${sc()}一直在期待您的光临」`);
      await era.printAndWait(
        `「光是想到今天要对${sc()}做的褒赏之事……身体就发热了」`,
      );
      await era.printAndWait(`「请您……仔细品尝${sc()}的身体……」`);
    } else {
      await era.printAndWait(`「欢迎光临……想要今天的奖励都想到身子发热了」`);
      await era.printAndWait(
        `「在这里等待的时候……${sc()}快要被心中的欲火烧成灰了」`,
      );
      await era.printAndWait(
        `「请您……赐给${sc()}的身体如燎原之火一般的激情吧……」`,
      );
    }
    return 1;
  } else if (era0(`talent:${target}:85`) == 1 && game.kojo.口上开关 == 2) {
    era.drawLine();

    if (rand_n(3) == 0) {
      await era.printAndWait(`「回来了啊……今天的工作结束了吗？」`);
      await era.printAndWait(`「${sc()}……一直在等着您」`);
      await era.printAndWait(`「来吧……请与${sc()}交合吧……」`);
    } else if (rand_n(2) == 0) {
      await era.printAndWait(
        `「今天也按时回来了呢……今天的工作让您很累的样子」`,
      );
      await era.printAndWait(`「${sc()}一直……想念着您」`);
      await era.printAndWait(`「来吧……请与${sc()}交合吧……」`);
    } else {
      await era.printAndWait(`「今天也按时回来了呢……今天的工作很累的样子」`);
      await era.printAndWait(`「${sc()}一直……想念着您」`);
      await era.printAndWait(`「来吧……请让${sc()}来帮您消除疲劳吧……」`);
    }
    return 1;
  }
  return 0;
}

// eventend_k13：EVENTEND NORMAL 档
async function eventend_k13(rand) {
  const { rand_n, target, target_name, sc, kojo } = bind_ctx(rand);
  if (game.kojo.口上开关 <= 0) {
    return 0;
  }
  if (era0(`talent:${target}:173`) != 1) {
    return 0;
  }

  if (era0(`base:${target}:0`) <= 0) {
    return 0;
  }

  if (era0(`mark:${target}:3`) == 3 && era0(`talent:${target}:85`) == 0) {
    era.drawLine();
    await era.printAndWait(`「真像秽物辣鸡干的事呢」`);
    await era.printAndWait(`「${sc()}恶心的快要吐了」`);
    await era.printAndWait(`「真是、受够了……」`);
    if (era0(`talent:${target}:157`)) {
      await era.printAndWait(`（亲爱的……${sc()}绝对不会忘记你的……请你再等等）`);
    }
    return 1;
  } else if (
    era0(`mark:${target}:2`) <= 1 &&
    era0(`talent:${target}:85`) == 0
  ) {
    era.drawLine();
    if (rand_n(3) == 0) {
      await era.print(`「这就结束了吗」`);
      await era.printAndWait(`「这种事情再多都只是无用功而已……」`);
    } else if (rand_n(2) == 0) {
      await era.print(`「终于结束了……」`);
      await era.printAndWait(`「还是不肯就此罢手吗……」`);
    } else {
      await era.printAndWait(`「已经结束了吗」`);
      await era.printAndWait(`「无论对${sc()}做什么、都是没用的」`);
      await era.printAndWait(`「所以、这种事情还是快停下来吧……」`);
    }
    if (era0(`talent:${target}:157`)) {
      await era.printAndWait(`（亲爱的……${sc()}还在遥远的地方为你战斗着……）`);
    }
    return 1;
  } else if (
    era0(`mark:${target}:2`) == 2 &&
    era0(`talent:${target}:85`) == 0
  ) {
    era.drawLine();
    if (kojo.初调教 < 3 && era0(`mark:${target}:2`) == 2) {
      await era.print(`「才没有……绝对没有那样的事……」`);
      await era.printAndWait(`「${sc()}绝对不会如你所愿的」`);
      await era.printAndWait(`${target_name}背对着你穿起了衣服。`);
    } else {
      await era.print(`「哈啊…哈啊…终于结束了吗」`);
      await era.print(`「无论对${sc()}做什么都一样的、没用的……早说了吧！」`);
      await era.printAndWait(`「${sc()}还、还没放弃呢……」`);
    }
    if (era0(`talent:${target}:157`)) {
      await era.printAndWait(`（亲爱的……请赐给${sc()}勇气吧……）`);
    }
    return 1;
  } else if (
    era0(`mark:${target}:2`) == 3 &&
    era0(`talent:${target}:85`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(`「哈啊、哈啊……我要不行了……要去了……」`);
    await era.printAndWait(`「${sc()}确实……小看你的能耐了」`);
    await era.printAndWait(`「还请……不要再对${sc()}做了更过分的事了……」`);
    if (era0(`talent:${target}:157`)) {
      await era.printAndWait(`（亲爱的……${sc()}已经……对不起……）`);
    }
    return 1;
  } else if (
    era0(`talent:${target}:76`) == 1 &&
    era0(`base:${target}:0`) >= 500
  ) {
    era.drawLine();
    await era.printAndWait(`「哎呀、已经结束了哎……明天也请您多多关照了……♪」`);
    await era.printAndWait(`「${sc()}会翘首以待的♪」`);
  } else if (
    era0(`talent:${target}:76`) == 1 &&
    era0(`base:${target}:0`) <= 500
  ) {
    era.drawLine();
    await era.printAndWait(`「今天尽情的做爱了……${sc()}真是太满足了♪」`);
    await era.printAndWait(`「明天也要精力充沛地和${sc()}相好啊、等着您哦♪」`);
    return 1;
  } else if (
    era0(`talent:${target}:85`) == 1 &&
    era0(`base:${target}:0`) >= 500
  ) {
    era.drawLine();
    await era.printAndWait(`「今天辛苦您了……？　调教、谢谢您♪」`);
    await era.printAndWait(`「${sc()}期待着下次的调教哦♪」`);
    return 1;
  } else if (
    era0(`talent:${target}:85`) == 1 &&
    era0(`base:${target}:0`) <= 500
  ) {
    era.drawLine();
    await era.printAndWait(`「今天好激烈啊……${sc()}真是太满足了♪」`);
    await era.printAndWait(`「难道是累了吗……？　随时可以过来找${sc()}哦♪」`);
    return 1;
  }
  return 0;
}

// kojo_message_com_13
async function kojo_message_com_13(rand) {
  const { rand_n, target, target_name, sc, kojo } = bind_ctx(rand);

  const clitoris_word = (cid) =>
    era0(`talent:${cid}:122`) !== 0 ? '阴茎' : '阴核';
  let P = 0;

  if (era0(`tequip:${target}:45`) && era_flag.selectcom != 45) {
    return 0;
  }

  if (game.train.失神) {
    return 0;
  }

  if (era0(`tequip:${target}:89`)) {
    await dog_kojo_13(rand_n); // CALL DOG_KOJO_13
    return 0;
  }

  if (era0(`tequip:${target}:55`)) {
    await colosseum_kojo_13(rand_n); // CALL COLOSSEUM_KOJO_13
    return 0;
  }

  if (era_flag.selectcom == 0) {
    if (kojo.爱抚 == 0) {
      if (era0(`mark:${target}:2`) >= 2) {
        await era.printAndWait(`「噫、再这样摸下去的话……不行了！」`);
        if (era0(`talent:${target}:157`)) {
          await era.printAndWait(`（那个人……都没让我尝试过这样激烈的前戏……）`);
        }
      } else {
        await era.printAndWait(`「左右搓揉着……${sc()}什么都感觉不到」`);
        if (era0(`talent:${target}:157`)) {
          await era.printAndWait(`（那个人……都没让我尝试过这样激烈的前戏……）`);
        }
      }
      // CFLAG:301  = 1（变量语义：CFLAG 族，301）
      kojo.爱抚 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊、啊……快点让${sc()}的身子燃烧起来吧……♪」`);
        // CFLAG:301  = 6（变量语义：CFLAG 族，301）
        kojo.爱抚 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「请用力地抚弄${sc()}……还要……♪」`);

        // CFLAG:301  = 5（变量语义：CFLAG 族，301）
        kojo.爱抚 = 5;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊、啊……要去了……只是被摸而已……」`);
        if (era0(`talent:${target}:157`)) {
          await era.printAndWait(
            `（这么强烈的快感……那个人的事情……似乎要忘记了）`,
          );
        }
        // CFLAG:301  = 4（变量语义：CFLAG 族，301）
        kojo.爱抚 = 4;
      } else if (
        era0(`mark:${target}:2`) == 2 &&
        (kojo.爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「手法还挺……熟练的嘛？」`);
        // CFLAG:301  = 3（变量语义：CFLAG 族，301）
        kojo.爱抚 = 3;
      } else if (
        era0(`mark:${target}:2`) <= 1 &&
        (kojo.爱抚 <= 1 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「又是这么……没水准呢。真的懂得怎么玩女人吗？」`,
        );
        // CFLAG:301  = 2（变量语义：CFLAG 族，301）
        kojo.爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 1) {
    if (kojo.舔阴 == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        await era.printAndWait(`「那、那样的地方请不要舔……」`);
      } else {
        await era.printAndWait(`「哎呀！　别、你在干什么啊……」`);
      }
      // CFLAG:302  = 1（变量语义：CFLAG 族，302）
      kojo.舔阴 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.舔阴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「小狗吗……噗、慢慢舔、还蛮舒服的……♪」`);
        // CFLAG:302  = 5（变量语义：CFLAG 族，302）
        kojo.舔阴 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.舔阴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊……想要更多……舌头伸进去了……啊♪」`);
        // CFLAG:302  = 4（变量语义：CFLAG 族，302）
        kojo.舔阴 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.舔阴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜……感觉到了……那样的地方……～」`);
        // CFLAG:302  = 3（变量语义：CFLAG 族，302）
        kojo.舔阴 = 3;
      } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「不要啊！ 不要舔啊……不……不要啊……」`);
        if (era0(`talent:${target}:157`)) {
          await era.printAndWait(`（这样的地方……被舔什么的、从来没有过……）`);
        }
        // CFLAG:302  = 2（变量语义：CFLAG 族，302）
        kojo.舔阴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 2) {
    if (kojo.肛门爱抚 == 0) {
      await era.printAndWait(`「啊、你在做什么！我要生气了……！」`);
      // CFLAG:TARGET:303  = 1（变量语义：CFLAG 族，TARGET:303）
      kojo.肛门爱抚 = 1;
      return 0;
    } else {
      P = era0(`palam:${target}:3`) + era0(`delta:${target}:3`);

      if (
        era0(`talent:${target}:76`) == 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊、哈……不要、那里不行……变得好奇怪……♪」`);
        // CFLAG:303  = 7（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        P < PALAMLV[2] &&
        (kojo.肛门爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「再多掏几下啊……湿透了呢……♪」`);
        // CFLAG:303  = 6（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊……可要对连这儿都有感觉了的身体……要负责哦♪」`,
        );
        // CFLAG:303  = 5（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        P < PALAMLV[2] &&
        (kojo.肛门爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「不行……再快点……要出来了啊……」`);
        // CFLAG:303  = 4（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 4;
      } else if (
        P >= PALAMLV[2] &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.肛门爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「竟、竟然有感觉了……明明是不行的……明明不可以的」`,
        );
        // CFLAG:303  = 3（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 3;
      } else if (kojo.首次耻情Lv2 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「请、请你快停下……真的很难受。我要生气了！？」`,
        );
        // CFLAG:303  = 2（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 3) {
    if (kojo.自慰 == 0) {
      await era.printAndWait(`「竟然让${sc()}自己做这种事情……真是欺负人！」`);
      // CFLAG:TARGET:304  = 1（变量语义：CFLAG 族，TARGET:304）
      kojo.自慰 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`talent:${target}:0`) == 1 &&
        (kojo.自慰 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「${sc()}受不了了……${sc()}想要的更多快乐」`);
        // CFLAG:304  = 9（变量语义：CFLAG 族，304）
        kojo.自慰 = 9;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:31`) >= 3 &&
        (kojo.自慰 <= 7 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「好像有点……${sc()}……喜欢上这种感觉了」`);
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「这种事……习惯得……都快成本能了」`);
        } else {
          await era.printAndWait(
            `「呵呵……${clitoris_word(target)}都硬了呢……明白吗？」`,
          );
        }
        // CFLAG:304  = 8（变量语义：CFLAG 族，304）
        kojo.自慰 = 8;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:31`) < 3 &&
        (kojo.自慰 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「老是一个人的话好无聊啊……要一起来吗♪」`);
        } else {
          await era.printAndWait(`「${sc()}下面好像都湿透了呢……想看看吗♪」`);
        }
        // CFLAG:304  = 7（变量语义：CFLAG 族，304）
        kojo.自慰 = 7;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`talent:${target}:0`) == 1 &&
        (kojo.自慰 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「你的肉棒……想要」`);
        // CFLAG:304  = 6（变量语义：CFLAG 族，304）
        kojo.自慰 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:31`) >= 3 &&
        (kojo.自慰 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「不行了……再不来和${sc()}交合的话……${sc()}就要爱上自慰了啦」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「好棒……啊啊、这样的感觉……自慰什么的……」`);
        } else {
          await era.printAndWait(`「停不下来了……～」`);
        }
        // CFLAG:304  = 5（变量语义：CFLAG 族，304）
        kojo.自慰 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:31`) < 3 &&
        (kojo.自慰 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「喜欢看别人自慰嘛……？　呵呵」`);
        } else {
          await era.printAndWait(`「请好好看着、${sc()}这淫荡的小穴」`);
        }
        // CFLAG:304  = 4（变量语义：CFLAG 族，304）
        kojo.自慰 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:31`) >= 1 &&
        (kojo.自慰 <= 2 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「停不下来了……手指自己动起来了」`);
        } else {
          await era.printAndWait(
            `「变得奇怪了、都怪你……${sc()}……好像喜欢上了」`,
          );
        }
        // CFLAG:304  = 3（变量语义：CFLAG 族，304）
        kojo.自慰 = 3;
      } else if (kojo.自慰 <= 1 || game.kojo.口上开关 == 2) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「请不要看……」`);
        } else {
          await era.printAndWait(`「请不要让${sc()}……做这么奇怪的事情」`);
        }
        // CFLAG:304  = 2（变量语义：CFLAG 族，304）
        kojo.自慰 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 5) {
    if (kojo.胸爱抚 == 0) {
      if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「${sc()}的胸……就那么中意吗？」`);
      } else {
        await era.printAndWait(`「竟然会想揉胸……跟小孩子一样」`);
      }
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306）
      kojo.胸爱抚 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「不行……乳头立起来了……」`);
        // CFLAG:306  = 5（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「只要你喜欢、可以随便揉哦」`);
        // CFLAG:306  = 4（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 4;
      } else if (
        era0(`abl:${target}:1`) >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「来了……啊、乳头……可是弱点啊…」`);
        // CFLAG:306  = 3（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 3;
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「小孩子一样呢……喜欢玩胸部」`);
        // CFLAG:306  = 2（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 6) {
    if (kojo.接吻 == 0 && game.train.初吻与自我口上) {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era_flag.assiplay == 0 &&
        era0(`tequip:${target}:89`) == 0 &&
        era0(`tequip:${target}:90`) == 0
      ) {
        await era.printAndWait(`「第一次哎……这么、热烈的」`);
        if (era0(`talent:${target}:157`)) {
          await era.printAndWait(
            `「${sc()}真是头一次哎……像这样的、当初那个人……都没做过」`,
          );
        }
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era_flag.assiplay == 0 &&
        era0(`tequip:${target}:89`) == 0 &&
        era0(`tequip:${target}:90`) == 0
      ) {
        await era.printAndWait(`「啊啊……亲爱的、好开心……感觉要舒服死了」`);
        if (era0(`talent:${target}:157`)) {
          await era.printAndWait(`（对不起……${sc()}的初吻被夺走了）`);
        }
      } else {
        await era.printAndWait(`「我这是第一次哦、不要太粗暴啦……」`);
        if (era0(`talent:${target}:157`)) {
          await era.printAndWait(`（对不起……${sc()}的初吻就这样被夺走了）`);
        }
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      kojo.接吻 = 1;
      return 0;
    } else if (kojo.接吻 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「终于吻了我呢♪」`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「呵呵、你的嘴唇…我早就看中了。一直期待着」`);
      } else {
        await era.printAndWait(`「只是初吻而已、别太得意了」`);
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      kojo.接吻 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.接吻 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「想要让舌头交缠起来……？　呵呵、挺行嘛」`);
        // CFLAG:307  = 5（变量语义：CFLAG 族，307）
        kojo.接吻 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.接吻 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊啊…不仅仅是吻…心也被夺走了……」`);
        // CFLAG:307  = 4（变量语义：CFLAG 族，307）
        kojo.接吻 = 4;
      } else if (
        era0(`abl:${target}:10`) >= 2 &&
        (kojo.接吻 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「和${sc()}接吻感觉怎样？」`);
        // CFLAG:307  = 3（变量语义：CFLAG 族，307）
        kojo.接吻 = 3;
      } else if (kojo.接吻 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「不、不要……呜……」`);
        // CFLAG:307  = 2（变量语义：CFLAG 族，307）
        kojo.接吻 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 7) {
    if (kojo.自己扒开 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「看得见吗……？　${sc()}这下流的地方……♪」`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「请仔细地看……能看见${sc()}里面吗♪」`);
      } else {
        await era.printAndWait(`「真是羞耻……在这种地方扒开了……」`);
      }
      // CFLAG:TARGET:308  = 1（变量语义：CFLAG 族，TARGET:308）
      kojo.自己扒开 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.自己扒开 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「好看吗……${sc()}的下流的小蜜桃……♪」`);
        // CFLAG:306  = 5（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.自己扒开 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「好看吗……这种地方${sc()}只会给你看♪」`);
        // CFLAG:306  = 4（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 4;
      } else if (
        era0(`abl:${target}:17`) >= 3 &&
        (kojo.自己扒开 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「好看吗……${sc()}的让人害羞的地方……」`);
        // CFLAG:306  = 3（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 3;
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「讨厌……让人做这种事情……」`);
        // CFLAG:306  = 2（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 8) {
    if (kojo.插入手指 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「可以多用几根手指吗？」`);
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`talent:${target}:85`) == 1
      ) {
        await era.printAndWait(`「你的手指……又细又长……♪」`);
      } else {
        await era.printAndWait(`「讨厌···好难受了」`);
      }
      // CFLAG:TARGET:309  = 1（变量语义：CFLAG 族，TARGET:309）
      kojo.插入手指 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.插入手指 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「不行……想被插到深处……居然会有这样的想法……♪」`);
        // CFLAG:309  = 5（变量语义：CFLAG 族，309）
        kojo.插入手指 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`mark:${target}:2`) == 3 &&
        (kojo.插入手指 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊啊啊……好厉害……腰忍不住摆动起来了……」`);
        // CFLAG:309  = 4（变量语义：CFLAG 族，309）
        kojo.插入手指 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.插入手指 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「不行……感觉太羞耻了……讨厌……」`);
        // CFLAG:309  = 3（变量语义：CFLAG 族，309）
        kojo.插入手指 = 3;
      } else if (kojo.插入手指 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「太难受了……请停止吧」`);
        // CFLAG:309  = 2（变量语义：CFLAG 族，309）
        kojo.插入手指 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 9) {
    if (kojo.舔肛 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「啊啊啊、肛门上滑滑的」`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「哎呀、那样的地方、请不要舔♪」`);
      } else {
        await era.printAndWait(`「讨厌……脏啊」`);
      }
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310）
      kojo.舔肛 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「那个、屁股好像有点松开来了……～」`);
        // CFLAG:310  = 5（变量语义：CFLAG 族，310）
        kojo.舔肛 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.舔肛 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「万分感谢、竟疼爱到了这样的地方……」`);
        // CFLAG:310  = 4（变量语义：CFLAG 族，310）
        kojo.舔肛 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.舔肛 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊啊……后面变得好湿……」`);
        // CFLAG:310  = 3（变量语义：CFLAG 族，310）
        kojo.舔肛 = 3;
      } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「你在想什么……不脏吗……」`);
        // CFLAG:310  = 2（变量语义：CFLAG 族，310）
        kojo.舔肛 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 10) {
    if (kojo.振动宝石 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「啊啊啊啊……要去了……」`);
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`talent:${target}:85`) == 1
      ) {
        await era.printAndWait(`「这个用多了会上瘾的……」`);
      } else {
        await era.printAndWait(`「讨厌……用这种不知羞耻的东西……」`);
      }
      // CFLAG:TARGET:311  = 1（变量语义：CFLAG 族，TARGET:311）
      kojo.振动宝石 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.振动宝石 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「下面……都要没知觉了……啊……」`);
        // CFLAG:311  = 5（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`mark:${target}:2`) == 3 &&
        (kojo.振动宝石 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「有点快感……请继续下去……」`);
        // CFLAG:311  = 4（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.振动宝石 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜……身子要飞起来了……」`);
        // CFLAG:311  = 3（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 3;
      } else if (kojo.振动宝石 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「哎呀……不要这样……」`);
        // CFLAG:311  = 2（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 11 && era0(`tequip:${target}:11`)) {
    if (kojo.壶虫 == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「竟然被这样的东西夺走了贞操……你真不是什么好人呢」`,
          );
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「您是认真的吗、${sc()}的第一次让这种东西拿走？　您不会后悔吗？」`,
          );
        } else {
          await era.printAndWait(`「讨厌……你这个变态……」`);
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「啊、这个东西真恶心……难看死了♪」`);
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「饲养了奇怪的东西啊」`);
        } else {
          await era.printAndWait(`「这是……什么啊…真恶心」`);
        }
      }
      // CFLAG:312  = 1（变量语义：CFLAG 族，312）
      kojo.壶虫 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.壶虫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「在里面乱动啊……啊啊啊」`);
        // CFLAG:312  = 5（变量语义：CFLAG 族，312）
        kojo.壶虫 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.壶虫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「感受到了……这样的东西……被爱的话」`);
        // CFLAG:312  = 4（变量语义：CFLAG 族，312）
        kojo.壶虫 = 4;
      } else if (
        era0(`abl:${target}:2`) >= 3 &&
        (kojo.壶虫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「它在里面动啊……快拿出来……」`);
        // CFLAG:312  = 3（变量语义：CFLAG 族，312）
        kojo.壶虫 = 3;
      } else if (kojo.壶虫 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「真恶心……你有什么目的？」`);
        // CFLAG:312  = 2（变量语义：CFLAG 族，312）
        kojo.壶虫 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 11 && era0(`tequip:${target}:11`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.壶虫着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「嘻嘻、太好了」`);
      // CFLAG:372  = 3（变量语义：CFLAG 族，372）
      kojo.壶虫着脱 = 3;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.壶虫着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「啊…好疼」`);
      // CFLAG:372  = 2（变量语义：CFLAG 族，372）
      kojo.壶虫着脱 = 2;
    } else if (kojo.壶虫着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「哈……哈」`);
      // CFLAG:372  = 1（变量语义：CFLAG 族，372）
      kojo.壶虫着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 12) {
    if (kojo.振动杖 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「喂、有这种好东西之前为什么不告诉我？」`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「要是知道您有这种好东西的话……也许就会把您晾在一边了哦？ 嘻嘻」`,
        );
      } else {
        await era.printAndWait(`「咦、震得好厉害……」`);
      }
      // CFLAG:313  = 1（变量语义：CFLAG 族，313）
      kojo.振动杖 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.振动杖 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「这个、用了会让人上瘾的……真想沉浸在这快感里……♪」`,
        );
        // CFLAG:313  = 5（变量语义：CFLAG 族，313）
        kojo.振动杖 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.振动杖 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「这道具真棒……嗯嗯、这……好……赞啊♪」`);
        // CFLAG:313  = 4（变量语义：CFLAG 族，313）
        kojo.振动杖 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.振动杖 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊啊啊啊……感觉太……～」`);
        // CFLAG:313  = 3（变量语义：CFLAG 族，313）
        kojo.振动杖 = 3;
      } else if (kojo.振动杖 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「天啊……腰要……」`);
        // CFLAG:313  = 2（变量语义：CFLAG 族，313）
        kojo.振动杖 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 13 && era0(`tequip:${target}:13`)) {
    if (kojo.肛门虫 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「好像会很棒啊……」`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「奇怪的生物啊」`);
      } else {
        await era.printAndWait(`「真……脏……」`);
      }
      // CFLAG:TARGET:314  = 1（变量语义：CFLAG 族，TARGET:314）
      kojo.肛门虫 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊……肛门♪　爽的要飞起来了……」`);
        // CFLAG:314  = 6（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 6;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.肛门虫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊……从肛门进去了……？　有点痒痒的……」`);
        // CFLAG:314  = 6（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「屁股要坏掉了……激烈的滑动着腰部♪」`);
        // CFLAG:314  = 5（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.肛门虫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「屁股……里面……感觉变得好奇怪」`);
        // CFLAG:314  = 4（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 4;
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜呜……屁股快要被弄得高潮了……救救我……」`);
        // CFLAG:314  = 3（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 3;
      } else if (kojo.肛门虫 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「呜呜……脏死了……」`);
        // CFLAG:314  = 2（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 13 && era0(`tequip:${target}:13`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.肛门虫着脱 < 4 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「一口气……一口气拔出来♪」`);
      // CFLAG:374  = 4（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 4;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.肛门虫着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「呼呼……已经结束吗？」`);
      // CFLAG:374  = 3（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 3;
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.肛门虫着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「不行……拔的时候……肛门会翻出来吧……」`);
      // CFLAG:374  = 2（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 2;
    } else if (kojo.肛门虫着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「天啊……拔的时候慢一点……」`);
      // CFLAG:374  = 1（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 19 && era0(`tequip:${target}:19`)) {
    if (kojo.肛珠 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「长了根小尾巴……♪」`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「屁股里面被塞满了…」`);
      } else {
        await era.printAndWait(`「啊、把什么放进去……？　肛珠……？」`);
      }
      // CFLAG:TARGET:320  = 1（变量语义：CFLAG 族，TARGET:320）
      kojo.肛珠 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈……终于全部放进去了……表扬我吧♪」`);
        // CFLAG:320  = 7（变量语义：CFLAG 族，320）
        kojo.肛珠 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.肛珠 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「唔、果然还是太勉强了……」`);
        // CFLAG:320  = 6（变量语义：CFLAG 族，320）
        kojo.肛珠 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「好厉害……全部都放进去了」`);
        // CFLAG:320  = 5（变量语义：CFLAG 族，320）
        kojo.肛珠 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.肛珠 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊、不行……太勉强了……」`);
        // CFLAG:320  = 4（变量语义：CFLAG 族，320）
        kojo.肛珠 = 4;
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜……不要再……往里塞了……」`);
        // CFLAG:320  = 3（变量语义：CFLAG 族，320）
        kojo.肛珠 = 3;
      } else if (kojo.肛珠 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「不行……绝对不能放进去……」`);
        // CFLAG:320  = 2（变量语义：CFLAG 族，320）
        kojo.肛珠 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 19 && era0(`tequip:${target}:19`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.肛珠着脱 < 4 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「一口气全部拔出来吧♪」`);
      // CFLAG:379  = 4（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 4;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.肛珠着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「一口气抽出也没关系哟……♪」`);
      // CFLAG:379  = 3（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 3;
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.肛珠着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「快、快点拔出去……」`);
      // CFLAG:379  = 2（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 2;
    } else if (kojo.肛珠着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「啊不行……好疼……」`);
      // CFLAG:379  = 1（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 20) {
    if (kojo.正常位 == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「第一次给了你…好荣幸♪」`);
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          era0(`abl:${target}:10`) >= 5
        ) {
          await era.printAndWait(`「第一次……请、插更深一点」`);
        } else {
          await era.printAndWait(`「第一次被夺走了……」`);
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「那么、请进去吧……」`);
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「用力抱紧了……插得更深了……」`);
        } else {
          await era.printAndWait(`「放进去了……」`);
        }
      }
      // CFLAG:321  = 1（变量语义：CFLAG 族，321）
      kojo.正常位 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.正常位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「来啊……深处…更舒服了……」`);
        // CFLAG:321  = 6（变量语义：CFLAG 族，321）
        kojo.正常位 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.正常位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「这样好了……快要被压垮了」`);
        // CFLAG:321  = 5（变量语义：CFLAG 族，321）
        kojo.正常位 = 5;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (kojo.正常位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (era0(`talent:${target}:157`)) {
          if (rand_n(3) == 0) {
            await era.printAndWait(`「哈啊…这么大这么硬…好棒${heart(3)}」`);
          } else if (rand_n(2) == 0) {
            await era.print(`「别……」`);
            await era.print(`「啊嗯…咿呀…哈啊…」`);
            await era.print(`「哈啊…这么大这么硬…好棒${heart(3)}」`);
            await era.printAndWait(`(根本无法和主人相提并论嘛……老公的那根……）`);
          } else {
            // 同一行输出：无后缀 PRINT 连续
            // 不换行，末行 PRINTFORMW 才收行。三档 RAND 互斥——写成取值表达式
            // （惰性求值，抽签顺序与次数不变），文本留在输出语句里（#625）
            await era.printAndWait(
              `「亲爱的…请原谅……` +
                (rand_n(3) == 0
                  ? `啊啊啊…`
                  : rand_n(2) == 0
                    ? `不行…`
                    : `噫噫…`) +
                `${heart(3)}」`,
            );
          }
        } else {
          await era.printAndWait(`「咕嗯、有、有感觉……了」`);
        }
        // CFLAG:321  = 4（变量语义：CFLAG 族，321）
        kojo.正常位 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.正常位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「这个样子、才没有感觉呢……」`);
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「请…再温柔一些……」`);
        } else {
          await era.printAndWait(`「呜…竟然有感觉……」`);
        }
        // CFLAG:321  = 3（变量语义：CFLAG 族，321）
        kojo.正常位 = 3;
      } else if (kojo.正常位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「真恶心……」`);
        // CFLAG:321  = 2（变量语义：CFLAG 族，321）
        kojo.正常位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 21) {
    if (kojo.背后位 == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「用这样下流的体位让我成为了女人……真高兴呢♪」`,
          );
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「啊啊 、终于能将第一次献给你了♪」`);
        } else {
          await era.printAndWait(`「唔……这么屈辱的样子……」`);
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「哎呀、一直等着你呢……终于、从后面来上我了♪」`,
          );
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「后面、呀啊…♪好棒……♪」`);
        } else {
          await era.printAndWait(`「这种屈辱的样子……！」`);
        }
      }
      // CFLAG:322  = 1（变量语义：CFLAG 族，322）
      kojo.背后位 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「后入什么的好舒服啊……♪」`);
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「来…插的更深一点……」`);
        } else {
          await era.printAndWait(`「再插得快一点……♪」`);
        }
        // CFLAG:322  = 6（变量语义：CFLAG 族，322）
        kojo.背后位 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.背后位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「感受到了呢……啊啊啊」`);
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「屁股、请再多揉揉它……」`);
        } else {
          await era.printAndWait(`「那样、好棒……♪」`);
        }
        // CFLAG:322  = 5（变量语义：CFLAG 族，322）
        kojo.背后位 = 5;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (era0(`talent:${target}:157`)) {
          if (rand_n(2) == 0) {
            // `PRINT 「哈啊…请您` 是下面各支共同的前缀行（无后缀不换行），
            // 与动作、心形、以及各自的收行尾段同属一行。
            // 前缀与各支的长片段提到语句外当局部量，收行行只按自己那一支的行号作基准；
            // 归给普查那一组的那一支把区间内的字面量留在语句里
            // （#625，同 k7 的 talk_front 写法）
            const moan_front = `「哈啊…请您`;
            const act_is_insert = rand_n(2) == 0; // 动作抽签（顺序第 2）
            const moan_act = act_is_insert
              ? `抽插${sc()}的时候`
              : `侵犯${sc()}的时候`;
            const moan_pat = `${heart(1)}`;
            const moan_hot = `再激烈一点…`;
            if (rand_n(3) == 0) {
              await era.print(moan_front + moan_act + moan_pat + `」`);
            } else if (rand_n(2) == 0) {
              if (rand_n(2) == 0) {
                await era.printAndWait(
                  `「哈啊…请您` +
                    (act_is_insert
                      ? `抽插${sc()}的时候`
                      : `侵犯${sc()}的时候`) +
                    `${heart(1)}` +
                    `……` +
                    `再激烈一点…` +
                    `才好啊${heart(3)}」`,
                );
              } else {
                await era.printAndWait(
                  moan_front +
                    moan_act +
                    moan_pat +
                    `……` +
                    moan_hot +
                    `更喜欢…${heart(3)}」`,
                );
              }
            } else {
              // 同属 :1656 那一行的另一支（#625）
              await era.printAndWait(
                moan_front +
                  moan_act +
                  moan_pat +
                  `……` +
                  `把${sc()}` +
                  (rand_n(2) == 0 ? `弄得乱七八糟的` : `插得更加乱七八糟`) +
                  `${heart(3)}」`,
              );
            }
          } else if (rand_n(2) == 0) {
            await era.print(`「别……」`);
            await era.print(`「啊嗯…咿呀…哈啊…」`);
            await era.print(`「哈啊…这么大这么硬…好棒${heart(3)}」`);
            await era.printAndWait(`(根本无法和主人相提并论嘛……老公的那根……）`);
          } else {
            // 同 :1562 组的一整行（#625）
            await era.printAndWait(
              `「亲爱的…请原谅……` +
                (rand_n(3) == 0
                  ? `啊啊啊啊啊`
                  : rand_n(2) == 0
                    ? `不行`
                    : `噫噫`) +
                `${heart(3)}」`,
            );
          }
        } else {
          await era.printAndWait(`「不行、这种样子……但是……」`);
        }
        // CFLAG:322  = 4（变量语义：CFLAG 族，322）
        kojo.背后位 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「真的……像狗一样……」`);
        } else if (rand_n(2) == 0) {
          // `PRINT 「有感觉了什么的……` 是三条互斥 PRINTW 终点共同的
          // 前缀行（无后缀不换行）：前缀提到语句外当局部量，各支只按自己那一支
          // 的行号作基准；前缀行归第一支的拼接基准（普查的「前缀 + 文本序第一支」组要能
          // 清）（#625）
          const moan_front_1709 = `「有感觉了什么的……`;
          if (rand_n(3) == 0) {
            await era.printAndWait(`「有感觉了什么的……」`);
          } else if (rand_n(2) == 0) {
            await era.printAndWait(moan_front_1709 + `怎么可能……」`);
          } else {
            await era.printAndWait(moan_front_1709 + `啊啊${heart(1)}」`);
          }
        } else {
          // 是两条互斥的前缀行，与正文和两条
          // 互斥收行尾段同属一行。两处抽签按先后一次抽完，
          // 前缀与尾段提到语句外当局部量，整行归普查那一组的
          // 拼接基准，字面量留在输出语句里（#625）
          const shame_if = rand_n(3) == 0; // 头部抽签
          const shame_heart = rand_n(3) == 0; // 收尾抽签
          await era.printAndWait(
            (shame_if ? `「这副模样……` : `「`) +
              `好羞耻……` +
              (shame_heart ? `啊啊${heart(3)}」` : `」`),
          );
        }
        // CFLAG:322  = 3（变量语义：CFLAG 族，322）
        kojo.背后位 = 3;
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「哈、哈……」`);

        // CFLAG:322  = 2（变量语义：CFLAG 族，322）
        kojo.背后位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 22) {
    if (kojo.对面座位 == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      }
      // CFLAG:323  = 1（变量语义：CFLAG 族，323）
      kojo.对面座位 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.对面座位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:323  = 6（变量语义：CFLAG 族，323）
        kojo.对面座位 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.对面座位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:323  = 5（变量语义：CFLAG 族，323）
        kojo.对面座位 = 5;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (kojo.对面座位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:323  = 4（变量语义：CFLAG 族，323）
        kojo.对面座位 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.对面座位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:323  = 3（变量语义：CFLAG 族，323）
        kojo.对面座位 = 3;
      } else if (kojo.对面座位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:323  = 2（变量语义：CFLAG 族，323）
        kojo.对面座位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 23) {
    if (kojo.背面座位 == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      }
      // CFLAG:324  = 1（变量语义：CFLAG 族，324）
      kojo.背面座位 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.背面座位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:324  = 6（变量语义：CFLAG 族，324）
        kojo.背面座位 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.背面座位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:324  = 5（变量语义：CFLAG 族，324）
        kojo.背面座位 = 5;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (kojo.背面座位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:324  = 4（变量语义：CFLAG 族，324）
        kojo.背面座位 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.背面座位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:324  = 3（变量语义：CFLAG 族，324）
        kojo.背面座位 = 3;
      } else if (kojo.背面座位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:324  = 2（变量语义：CFLAG 族，324）
        kojo.背面座位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 26) {
    if (kojo.正常位肛交 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「快来嘛……${sc()}已经等不及了  嘻嘻」`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「不要害怕……还可以再深一点……」`);
      } else {
        await era.printAndWait(`「等一下……屁股已经……」`);
      }
      // CFLAG:TARGET:327  = 1（变量语义：CFLAG 族，TARGET:327）
      kojo.正常位肛交 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「快点……肛门已经快要忍不住了♪」`);
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「有点疼的但是完全不想停下来……♪」`);
        } else {
          await era.printAndWait(`「啊……要去了……♪」`);
        }
        // CFLAG:327  = 7（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.正常位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「要温柔点哦……」`);
        // CFLAG:327  = 6（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「屁股好舒服……？随时都可以射出来哦♪」`);
        } else {
          await era.printAndWait(`「呵呵……小鸡鸡要忍不住了吗？」`);
        }
        // CFLAG:327  = 5（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.正常位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「要温柔点哦……」`);
        // CFLAG:327  = 4（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 4;
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯唔……来啦……」`);
        // CFLAG:327  = 3（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 3;
      } else if (kojo.正常位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「痛……快停下、好可怕……」`);
        // CFLAG:327  = 2（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 27) {
    if (kojo.背后位肛交 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「来……已经等不下去了」`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「用这里做爱也一样啊♪」`);
      } else {
        await era.printAndWait(`「啊、屁股不要……」`);
      }
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328）
      kojo.背后位肛交 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「屁股感觉被挖了一样……去了……♪」`);
        } else {
          await era.printAndWait(`「腰自己动起来了……完全停不下来了…♪」`);
        }
        // CFLAG:328  = 5（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊啊、屁股是不是要比前面那个洞深的多了……♪」`);
        // CFLAG:328  = 4（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 4;
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「被这样弄开……屁股变得好奇怪……」`);
        // CFLAG:328  = 3（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 3;
      } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「啊……疼……」`);
        // CFLAG:328  = 2（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 28) {
    if (kojo.对面座位肛交 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:329  = 1（变量语义：CFLAG 族，TARGET:329）
      kojo.对面座位肛交 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:329  = 7（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.对面座位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:329  = 6（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:329  = 5（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.对面座位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:329  = 4（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 4;
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:329  = 3（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 3;
      } else if (kojo.对面座位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:329  = 2（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 29) {
    if (kojo.背面座位肛交 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:330  = 1（变量语义：CFLAG 族，TARGET:330）
      kojo.背面座位肛交 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:330  = 7（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.背面座位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:330  = 6（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:330  = 5（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.背面座位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:330  = 4（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 4;
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:330  = 3（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 3;
      } else if (kojo.背面座位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:330  = 2（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 30) {
    if (kojo.手淫 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「对这样的服务不讨厌吧……？　呵呵」`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「今后每天${sc()}都这样为您服务♪」`);
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「${sc()}知道了、请让${sc()}来为您服务吧」`);
      } else {
        await era.printAndWait(`「竟然让${sc()}撸这个……」`);
      }
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331）
      kojo.手淫 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「来吧、随时可以射给${sc()}哦？」`);
        } else {
          await era.printAndWait(`「您看、上上下下……上上下下……」`);
        }
        // CFLAG:331  = 6（变量语义：CFLAG 族，331）
        kojo.手淫 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.手淫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「好厉害、到现在……不用这样一直忍也可以哦？」`,
          );
        } else {
          await era.printAndWait(`「还在忍耐吗？好可爱～」`);
        }
        // CFLAG:331  = 5（变量语义：CFLAG 族，331）
        kojo.手淫 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「变得咕噜咕噜的了。咕噜咕噜……」`);
        // CFLAG:331  = 4（变量语义：CFLAG 族，331）
        kojo.手淫 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「舒服吗？加油。……」`);
        // CFLAG:331  = 3（变量语义：CFLAG 族，331）
        kojo.手淫 = 3;
      } else if (kojo.手淫 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「哎呀…被你吓到了呢……」`);
        // CFLAG:331  = 2（变量语义：CFLAG 族，331）
        kojo.手淫 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 31) {
    if (kojo.口交_奴 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「噗、一直想舔了……真爱欺负人♪」`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「就算不这么拜托、${sc()}也不会咬的啦…♪」`);
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「请放心、不会咬的啦……」`);
      } else {
        await era.printAndWait(`（呜……臭……讨厌……）`);
      }
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332）
      kojo.口交_奴 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`（哈……多么美妙的气味……快满含在嘴里、想品尝…）`);
        // CFLAG:332  = 6（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 6;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`（呵呵……很好吃的样子……我开动了……♪）`);
        // CFLAG:332  = 5（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呵呵……让${sc()}给您充分的服务♪」`);
        // CFLAG:332  = 4（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.口交_奴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「${sc()}知道了、、、请让${sc()}来服务」`);
        // CFLAG:332  = 3（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 3;
      } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`（讨厌……臭……）`);
        // CFLAG:332  = 2（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 32) {
    if (kojo.乳交 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「看哦、软软的胸部哦？」`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「呵呵、包住了呢」`);
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「怎么样…用胸部的话感觉舒服吗」`);
      } else {
        await era.printAndWait(`「胸……你是认真的？」`);
      }
      // CFLAG:TARGET:333  = 1（变量语义：CFLAG 族，TARGET:333）
      kojo.乳交 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「怎么样？舒服吗？软软的胸部呦。～♪」`);
        } else {
          await era.printAndWait(`「那么、请全部射在${sc()}的胸部上面吧～♪」`);
        }
        // CFLAG:333  = 6（变量语义：CFLAG 族，333）
        kojo.乳交 = 6;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.口交_奴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「怎么样、柔软吗？」`);
        // CFLAG:333  = 5（变量语义：CFLAG 族，333）
        kojo.乳交 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.乳交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「怎么样……乳房里……舒服吗♪」`);
        } else {
          await era.printAndWait(`「舒服吗？不用忍受可以射出来哦♪」`);
        }
        // CFLAG:333  = 4（变量语义：CFLAG 族，333）
        kojo.乳交 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.乳交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「${sc()}的胸……怎么样？？」`);
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「这样弄还行吗？」`);
        } else {
          await era.printAndWait(`「请好好地舒服起来吧${heart(1)}」`);
        }
        // CFLAG:333  = 3（变量语义：CFLAG 族，333）
        kojo.乳交 = 3;
      } else if (kojo.乳交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「用胸部夹就可以了吧……」`);
        // CFLAG:333  = 2（变量语义：CFLAG 族，333）
        kojo.乳交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 33) {
    if (kojo.股间性交 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「阿拉、想进来想的不得了的肉棒呢♪」`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「啾啾的在做呢？　再稍微努力一点吧♪」`);
      } else {
        await era.printAndWait(`「在这里……摩擦就好了吗……」`);
      }
      // CFLAG:TARGET:334  = 1（变量语义：CFLAG 族，TARGET:334）
      kojo.股间性交 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`talent:${target}:0`) == 1 &&
        (kojo.股间性交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「想进来想的不得了吗？　呵呵、${sc()}的里面也疼的不得了呢♪」`,
        );
        // CFLAG:334  = 6（变量语义：CFLAG 族，334）
        kojo.股间性交 = 6;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.股间性交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「期待小穴的肉棒颤抖着呢♪」`);
        // CFLAG:334  = 5（变量语义：CFLAG 族，334）
        kojo.股间性交 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`talent:${target}:0`) == 1 &&
        (kojo.股间性交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「用肉棒摩擦处女小穴就可以忍耐了吗？」`);
        // CFLAG:334  = 4（变量语义：CFLAG 族，334）
        kojo.股间性交 = 4;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.股间性交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「为了让肉棒舒服起来、要忍耐啾啾的呢♪」`);
        // CFLAG:334  = 3（变量语义：CFLAG 族，334）
        kojo.股间性交 = 3;
      } else if (kojo.股间性交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「在这里这么做……就可以了吗？」`);
        // CFLAG:334  = 2（变量语义：CFLAG 族，334）
        kojo.股间性交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 34) {
    if (kojo.骑乘位 == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era0(`talent:${target}:85`) == 1) {
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
        era0(`talent:${target}:76`) == 1 &&
        (kojo.骑乘位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(4) == 0) {
          await era.printAndWait('');
        } else if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:335  = 6（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.骑乘位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(4) == 0) {
          await era.print('');
        } else if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:335  = 5（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 5;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (kojo.骑乘位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(4) == 0) {
          await era.printAndWait('');
        } else if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:335  = 4（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.骑乘位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.print('');
        await era.printAndWait('');
        // CFLAG:335  = 3（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 3;
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:335  = 2（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 35) {
    if (kojo.全身擦洗 == 0) {
      if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:336  = 1（变量语义：CFLAG 族，TARGET:336）
      kojo.全身擦洗 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.全身擦洗 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:336  = 5（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.全身擦洗 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:336  = 4（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.全身擦洗 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:336  = 3（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 3;
      } else if (kojo.全身擦洗 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:336  = 2（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 36) {
    if (kojo.骑乘位肛交 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:337  = 1（变量语义：CFLAG 族，TARGET:337）
      kojo.骑乘位肛交 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:337  = 7（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.骑乘位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:337  = 6（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:337  = 5（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:337  = 4（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 4;
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:337  = 3（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 3;
      } else if (kojo.骑乘位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:337  = 2（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 37) {
    if (kojo.肛门侍奉 == 0) {
      if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338）
      kojo.肛门侍奉 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:338  = 5（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.print('');
        // CFLAG:338  = 4（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:338  = 3（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 3;
      } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:338  = 2（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 40) {
    if (kojo.打屁股 == 0) {
      await era.printAndWait(`「不要、停下来吧……请停下来吧…」`);
      // CFLAG:TARGET:341  = 1（变量语义：CFLAG 族，TARGET:341）
      kojo.打屁股 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.打屁股 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哎呀、屁股被拍的、啪啪响呢……去了♪」`);
        // CFLAG:TARGET:341  = 5（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.打屁股 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「惩罚…请更用力点……啊」`);
        // CFLAG:TARGET:341  = 4（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 4;
        return 0;
      } else if (
        era0(`mark:${target}:0`) == 3 &&
        era0(`mark:${target}:2`) == 3 &&
        (kojo.打屁股 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「噫哈、噫、呜咕……明明好疼可是……哈啊♪」`);
        // CFLAG:TARGET:341  = 3（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 3;
        return 0;
      } else if (kojo.打屁股 <= 1 && game.kojo.口上开关 == 2) {
        await era.printAndWait(`「讨厌…停……噫」`);
        // CFLAG:TARGET:341  = 2（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 41) {
    if (kojo.鞭 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:342  = 1（变量语义：CFLAG 族，TARGET:342）
      kojo.鞭 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.鞭 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:342  = 9（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 9;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:342  = 8（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 8;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.鞭 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:342  = 7（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 7;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.鞭 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:342  = 6（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:342  = 5（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.鞭 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:342  = 4（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 4;
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:342  = 3（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 3;
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:TARGET:342  = 2（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 42) {
    if (kojo.针 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:343  = 1（变量语义：CFLAG 族，TARGET:343）
      kojo.针 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.针 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:343  = 9（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 9;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:343  = 8（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 8;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.针 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:343  = 7（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 7;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.针 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:343  = 6（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:343  = 5（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.针 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:343  = 4（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 4;
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:343  = 3（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 3;
      } else if (kojo.针 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:TARGET:343  = 2（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`)) {
    if (kojo.眼罩 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344）
      kojo.眼罩 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 9;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 8;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.眼罩 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 7;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.眼罩 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 4;
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 3;
      } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.眼罩着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:380  = 3（变量语义：CFLAG 族，380）
      kojo.眼罩着脱 = 3;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.眼罩着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:380  = 2（变量语义：CFLAG 族，380）
      kojo.眼罩着脱 = 2;
    } else if (kojo.眼罩着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait('');
      // CFLAG:380  = 1（变量语义：CFLAG 族，380）
      kojo.眼罩着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 44 && era0(`tequip:${target}:44`)) {
    if (kojo.绳子 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:345  = 1（变量语义：CFLAG 族，TARGET:345）
      kojo.绳子 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.绳子 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:345  = 9（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 9;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:345  = 8（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 8;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.绳子 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:345  = 7（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 7;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.绳子 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:345  = 6（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:345  = 5（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.绳子 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:345  = 4（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 4;
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:345  = 3（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 3;
      } else if (kojo.绳子 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:TARGET:345  = 2（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 44 && era0(`tequip:${target}:44`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:385  = 2（变量语义：CFLAG 族，385）
      kojo.绳子着脱 = 2;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:385  = 2（变量语义：CFLAG 族，385）
      kojo.绳子着脱 = 2;
    } else if (kojo.绳子着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait('');
      // CFLAG:385  = 1（变量语义：CFLAG 族，385）
      kojo.绳子着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 45 && era0(`tequip:${target}:45`)) {
    if (kojo.口塞 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:346  = 1（变量语义：CFLAG 族，TARGET:346）
      kojo.口塞 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.口塞 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:346  = 9（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 9;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:346  = 8（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 8;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.口塞 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:346  = 7（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 7;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.口塞 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:346  = 6（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:346  = 5（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.口塞 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:346  = 4（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 4;
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:346  = 3（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 3;
      } else if (kojo.口塞 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:TARGET:346  = 2（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 45 && era0(`tequip:${target}:45`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.口塞着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:386  = 3（变量语义：CFLAG 族，386）
      kojo.口塞着脱 = 3;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.口塞着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:386  = 2（变量语义：CFLAG 族，386）
      kojo.口塞着脱 = 2;
    } else if (kojo.口塞着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait('');
      // CFLAG:386  = 1（变量语义：CFLAG 族，386）
      kojo.口塞着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 46 && era0(`tequip:${target}:46`)) {
    if (kojo.灌肠肛塞 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:347  = 1（变量语义：CFLAG 族，TARGET:347）
      kojo.灌肠肛塞 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.灌肠肛塞 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:347  = 7（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.灌肠肛塞 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:347  = 6（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.灌肠肛塞 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:347  = 5（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.灌肠肛塞 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:347  = 4（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 4;
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.灌肠肛塞 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:347  = 3（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 3;
      } else if (kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:347  = 2（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 55) {
    if (kojo.放置PLAY == 0) {
      if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:356  = 1（变量语义：CFLAG 族，356）
      kojo.放置PLAY = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`palam:${target}:5`) >= era0('palamlv:3') &&
        (kojo.放置PLAY <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:356  = 4（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 4;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.放置PLAY <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:356  = 3（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 3;
      } else if (kojo.放置PLAY <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:356  = 2（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 56) {
    if (kojo.交谈 == 0) {
      if (era0(`tequip:${target}:53`)) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「初次见面。这里是原${get_look_info(target, '成为勇者前的生活')}的${target_name}」`,
          );
          await era.printAndWait(
            `「${sc()}身体和心都沦陷了、成为了魔王大人的性奴隶了♪」`,
          );
          if (era0(`talent:${target}:157`)) {
            await era.printAndWait(
              `「故乡的老公、对不起。现在你的差劲肉棒已经满足不了${sc()}了、」`,
            );
            await era.printAndWait(
              `「${sc()}已经成了的脑海里只有魔王大人的肉棒的浪货了」`,
            );
          } else {
            await era.printAndWait(
              `「故乡的大家、对不起。${sc()}的人生就此结束了。」`,
            );
            await era.printAndWait(
              `「从现在开始${sc()}就是魔王军的专属的性奴隶、正走向新的人生。」`,
            );
          }
          await era.printAndWait(
            `「听说这个录像要分发给邻近的村落看、心里碰碰直跳的……」`,
          );
          if (era0(`talent:${target}:157`)) {
            await era.printAndWait(
              `「亲爱的、好好看着${sc()}这副淫荡的模样、撸起你的差劲肉棒吧♪」`,
            );
          } else {
            await era.printAndWait(
              `「请各位、看着${sc()}这淫荡的样子、把鸡巴撸起来吧♪」`,
            );
          }
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「初次见面。原${get_look_info(target, '成为勇者前的生活')}的${target_name}」`,
          );
          await era.printAndWait(
            `「${sc()}身体和心都沦陷了、成为魔王大人爱的奴隶。♪」`,
          );
          if (era0(`talent:${target}:157`)) {
            await era.printAndWait(
              `「故乡的老公、对不起。但、${sc()}现在还是爱你的」`,
            );
          } else {
            await era.printAndWait(
              `「故乡的大家、对不起。${sc()}找到了真正的港湾」`,
            );
            await era.printAndWait(
              `「从现在开始、${sc()}成为魔王军的一员从而走上新的人生。」`,
            );
          }
          await era.printAndWait(
            `「听说这个录像要分发给邻近的村落看、心里七上八下的……」`,
          );
          if (era0(`talent:${target}:157`)) {
            await era.printAndWait(`「亲爱的、${sc()}永远爱着你……」`);
            await era.printAndWait(
              `「不过${sc()}希望故乡的你你找到新的幸福、忘记${sc()}」`,
            );
          } else {
            await era.printAndWait(
              `「请各位、看着${sc()}这受尽疼爱的样子、撸起来吧♪」`,
            );
          }
        } else {
          await era.printAndWait('');
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      }
      // CFLAG:357  = 1（变量语义：CFLAG 族，357）
      kojo.交谈 = 1;
      return 0;
    } else {
      if (era0(`tequip:${target}:53`)) {
        if (
          era0(`talent:${target}:76`) == 1 &&
          (kojo.交谈 <= 3 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait('');
          // CFLAG:357  = 4（变量语义：CFLAG 族，357）
          kojo.交谈 = 4;
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          (kojo.交谈 <= 2 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait('');
          // CFLAG:357  = 3（变量语义：CFLAG 族，357）
          kojo.交谈 = 3;
        } else if (kojo.交谈 <= 1 || game.kojo.口上开关 == 2) {
          await era.printAndWait('');
          // CFLAG:357  = 2（变量语义：CFLAG 族，357）
          kojo.交谈 = 2;
        }
      } else {
        if (
          era0(`talent:${target}:76`) == 1 &&
          (kojo.交谈 <= 3 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait('');
          // CFLAG:357  = 4（变量语义：CFLAG 族，357）
          kojo.交谈 = 4;
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          (kojo.交谈 <= 2 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait('');
          // CFLAG:357  = 3（变量语义：CFLAG 族，357）
          kojo.交谈 = 3;
        } else if (kojo.交谈 <= 1 || game.kojo.口上开关 == 2) {
          await era.printAndWait('');
          // CFLAG:357  = 2（变量语义：CFLAG 族，357）
          kojo.交谈 = 2;
        }
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 123) {
    if (kojo.乳夹口交 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:360  = 1（变量语义：CFLAG 族，TARGET:360）
      kojo.乳夹口交 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.乳夹口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:360  = 5（变量语义：CFLAG 族，360）
        kojo.乳夹口交 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.乳夹口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:360  = 4（变量语义：CFLAG 族，360）
        kojo.乳夹口交 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.乳夹口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:360  = 3（变量语义：CFLAG 族，360）
        kojo.乳夹口交 = 3;
      } else if (kojo.乳夹口交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:360  = 2（变量语义：CFLAG 族，360）
        kojo.乳夹口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 125) {
    if (kojo.口交时自慰 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:361  = 1（变量语义：CFLAG 族，TARGET:361）
      kojo.口交时自慰 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.口交时自慰 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:361  = 5（变量语义：CFLAG 族，361）
        kojo.口交时自慰 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.口交时自慰 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:361  = 4（变量语义：CFLAG 族，361）
        kojo.口交时自慰 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.口交时自慰 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:361  = 3（变量语义：CFLAG 族，361）
        kojo.口交时自慰 = 3;
      } else if (kojo.口交时自慰 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:361  = 2（变量语义：CFLAG 族，361）
        kojo.口交时自慰 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 126) {
    if (kojo.手搓口交 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:362  = 1（变量语义：CFLAG 族，TARGET:362）
      kojo.手搓口交 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.手搓口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:362  = 5（变量语义：CFLAG 族，362）
        kojo.手搓口交 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.手搓口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:362  = 4（变量语义：CFLAG 族，362）
        kojo.手搓口交 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.手搓口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:362  = 3（变量语义：CFLAG 族，362）
        kojo.手搓口交 = 3;
      } else if (kojo.手搓口交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:362  = 2（变量语义：CFLAG 族，362）
        kojo.手搓口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 127) {
    if (kojo.真空口交 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:363  = 1（变量语义：CFLAG 族，TARGET:363）
      kojo.真空口交 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.真空口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:363  = 5（变量语义：CFLAG 族，363）
        kojo.真空口交 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.真空口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:363  = 4（变量语义：CFLAG 族，363）
        kojo.真空口交 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.真空口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // CFLAG:363  = 3（变量语义：CFLAG 族，363）
        kojo.真空口交 = 3;
      } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:363  = 2（变量语义：CFLAG 族，363）
        kojo.真空口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 69) {
    if (kojo.六九式 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:364  = 1（变量语义：CFLAG 族，TARGET:364）
      kojo.六九式 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.六九式 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:364  = 5（变量语义：CFLAG 族，364）
        kojo.六九式 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.六九式 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:364  = 4（变量语义：CFLAG 族，364）
        kojo.六九式 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.六九式 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:364  = 3（变量语义：CFLAG 族，364）
        kojo.六九式 = 3;
      } else if (kojo.六九式 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:364  = 2（变量语义：CFLAG 族，364）
        kojo.六九式 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 124) {
    if (kojo.深喉 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:365  = 1（变量语义：CFLAG 族，TARGET:365）
      kojo.深喉 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.真空口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:365  = 5（变量语义：CFLAG 族，365）
        kojo.深喉 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.真空口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:365  = 4（变量语义：CFLAG 族，365）
        kojo.深喉 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.真空口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:365  = 3（变量语义：CFLAG 族，365）
        kojo.深喉 = 3;
      } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:365  = 2（变量语义：CFLAG 族，365）
        kojo.深喉 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 80) {
    if (kojo.强制口交 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:381  = 1（变量语义：CFLAG 族，TARGET:381）
      kojo.强制口交 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.强制口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:381  = 5（变量语义：CFLAG 族，381）
        kojo.强制口交 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.强制口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:381  = 4（变量语义：CFLAG 族，381）
        kojo.强制口交 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.强制口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:381  = 3（变量语义：CFLAG 族，381）
        kojo.强制口交 = 3;
      } else if (kojo.强制口交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:381  = 2（变量语义：CFLAG 族，381）
        kojo.强制口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 87) {
    if (kojo.穿环 == 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:76`) == 1) {
        if (chara(target).train.穿环状态 & P) {
          await era.printAndWait('');

          if (P == 1) {
            await era.printAndWait('');
          } else if (P == 2) {
            await era.printAndWait('');
          } else if (P == 4) {
            await era.printAndWait('');
          } else if (P == 8) {
            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              await era.printAndWait('');
            } else {
              await era.printAndWait('');
            }
          } else if (P == 16) {
            await era.printAndWait('');
          } else if (P == 32) {
            await era.printAndWait('');
          } else if (P == 64) {
            await era.printAndWait('');
          }
        } else {
          await era.printAndWait('');
        }
      } else if (era0(`talent:${target}:85`) == 1) {
        if (chara(target).train.穿环状态 & P) {
          await era.printAndWait('');

          if (P == 1) {
            await era.printAndWait('');
          } else if (P == 2) {
            await era.printAndWait('');
          } else if (P == 4) {
            await era.printAndWait('');
          } else if (P == 8) {
            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              await era.printAndWait('');
            } else {
              await era.printAndWait('');
            }
          } else if (P == 16) {
            await era.printAndWait('');
          } else if (P == 32) {
            await era.printAndWait('');
          } else if (P == 64) {
            await era.printAndWait('');
          }
        } else {
          await era.printAndWait('');
        }
      } else {
        if (chara(target).train.穿环状态 & P) {
          await era.printAndWait('');

          if (P == 1) {
            await era.printAndWait('');
          } else if (P == 2) {
            await era.printAndWait('');
          } else if (P == 4) {
            await era.printAndWait('');
          } else if (P == 8) {
            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              await era.printAndWait('');
            } else {
              await era.printAndWait('');
            }
          } else if (P == 16) {
            await era.printAndWait('');
          } else if (P == 32) {
            await era.printAndWait('');
          } else if (P == 64) {
            await era.printAndWait('');
          }
        } else {
          await era.printAndWait('');
        }
      }
      // CFLAG:TARGET:348  = 1（变量语义：CFLAG 族，TARGET:348）
      kojo.穿环 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait('');
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.穿环 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (chara(target).train.穿环状态 & P) {
          if (P == 1) {
            await era.printAndWait('');
          } else if (P == 2) {
            await era.printAndWait('');
          } else if (P == 4) {
            await era.printAndWait('');
          } else if (P == 8) {
            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              await era.printAndWait('');
            } else {
              await era.printAndWait('');
            }
          } else if (P == 16) {
            await era.printAndWait('');
          } else if (P == 32) {
            await era.printAndWait('');
          } else if (P == 64) {
            await era.printAndWait('');
          }
        } else {
          await era.printAndWait('');
        }
        // CFLAG:348  = 4（变量语义：CFLAG 族，348）
        kojo.穿环 = 4;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.穿环 <= 2 || game.kojo.口上开关 == 2)
      ) {
        if (chara(target).train.穿环状态 & P) {
          if (P == 1) {
            await era.printAndWait('');
          } else if (P == 2) {
            await era.printAndWait('');
          } else if (P == 4) {
            await era.printAndWait('');
          } else if (P == 8) {
            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              await era.printAndWait('');
            } else {
              await era.printAndWait('');
            }
          } else if (P == 16) {
            await era.printAndWait('');
          } else if (P == 32) {
            await era.printAndWait('');
          } else if (P == 64) {
            await era.printAndWait('');
          }
        } else {
          await era.printAndWait('');
        }
        // CFLAG:348  = 3（变量语义：CFLAG 族，348）
        kojo.穿环 = 3;
      } else if (kojo.穿环 <= 1 || game.kojo.口上开关 == 2) {
        if (chara(target).train.穿环状态 & P) {
          if (P == 1) {
            await era.printAndWait('');
          } else if (P == 2) {
            await era.printAndWait('');
          } else if (P == 4) {
            await era.printAndWait('');
          } else if (P == 8) {
            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              await era.printAndWait('');
            } else {
              await era.printAndWait('');
            }
          } else if (P == 16) {
            await era.printAndWait('');
          } else if (P == 32) {
            await era.printAndWait('');
          } else if (P == 64) {
            await era.printAndWait('');
          }
        } else {
          await era.printAndWait('');
        }
        // CFLAG:348  = 2（变量语义：CFLAG 族，348）
        kojo.穿环 = 2;
      }
    }
    return 0;
  }
}

// dog_kojo_13
async function dog_kojo_13(rand) {
  const { rand_n, target, sc, kojo } = bind_ctx(rand);

  if (era_flag.selectcom == 0) {
    if (kojo.爱抚 == 0) {
      if (era0(`mark:${target}:2`) >= 2) {
        await era.printAndWait(`「明白了啦……和狗、呜呜……和…狗……」`);
      } else {
        await era.printAndWait(`「噫、干什么……？」`);
      }
      // CFLAG:301  = 1（变量语义：CFLAG 族，301）
      kojo.爱抚 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (kojo.爱抚 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊、再多舔一舔啊……${sc()}、最喜欢狗狗了……」`);
        // CFLAG:301  = 7（变量语义：CFLAG 族，301）
        kojo.爱抚 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「好奇妙的感觉……」`);
        // CFLAG:301  = 6（变量语义：CFLAG 族，301）
        kojo.爱抚 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「好奇妙的感觉……」`);
        // CFLAG:301  = 5（变量语义：CFLAG 族，301）
        kojo.爱抚 = 5;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜……不会再反抗了……」`);
        // CFLAG:301  = 4（变量语义：CFLAG 族，301）
        kojo.爱抚 = 4;
      } else if (
        era0(`mark:${target}:2`) == 2 &&
        (kojo.爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嘤……不要动得、太过头啊……」`);
        // CFLAG:301  = 3（变量语义：CFLAG 族，301）
        kojo.爱抚 = 3;
      } else if (
        era0(`mark:${target}:2`) <= 1 &&
        (kojo.爱抚 <= 1 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜……咕……」`);
        // CFLAG:301  = 2（变量语义：CFLAG 族，301）
        kojo.爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 1) {
    if (kojo.舔阴 == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:302  = 1（变量语义：CFLAG 族，302）
      kojo.舔阴 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (kojo.舔阴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:302  = 6（变量语义：CFLAG 族，302）
        kojo.舔阴 = 6;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.舔阴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:302  = 5（变量语义：CFLAG 族，302）
        kojo.舔阴 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.舔阴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:302  = 4（变量语义：CFLAG 族，302）
        kojo.舔阴 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.舔阴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:302  = 3（变量语义：CFLAG 族，302）
        kojo.舔阴 = 3;
      } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:302  = 2（变量语义：CFLAG 族，302）
        kojo.舔阴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 5) {
    if (kojo.胸爱抚 == 0) {
      if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306）
      kojo.胸爱抚 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (kojo.胸爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 6（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 6;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 5（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 4（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 4;
      } else if (
        era0(`abl:${target}:1`) >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 3（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 3;
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:306  = 2（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 6) {
    if (kojo.接吻 == 0 && game.train.初吻与自我口上) {
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      kojo.接吻 = 1;
      return 0;
    } else if (kojo.接吻 == 0) {
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      kojo.接吻 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (kojo.接吻 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 6（变量语义：CFLAG 族，307）
        kojo.接吻 = 6;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.接吻 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 5（变量语义：CFLAG 族，307）
        kojo.接吻 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.接吻 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 4（变量语义：CFLAG 族，307）
        kojo.接吻 = 4;
      } else if (
        era0(`abl:${target}:10`) >= 2 &&
        (kojo.接吻 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 3（变量语义：CFLAG 族，307）
        kojo.接吻 = 3;
      } else if (kojo.接吻 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:307  = 2（变量语义：CFLAG 族，307）
        kojo.接吻 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 9) {
    if (kojo.舔肛 == 0) {
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310）
      kojo.舔肛 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (kojo.舔肛 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 6（变量语义：CFLAG 族，310）
        kojo.舔肛 = 6;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 5（变量语义：CFLAG 族，310）
        kojo.舔肛 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.舔肛 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 4（变量语义：CFLAG 族，310）
        kojo.舔肛 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.舔肛 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 3（变量语义：CFLAG 族，310）
        kojo.舔肛 = 3;
      } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:310  = 2（变量语义：CFLAG 族，310）
        kojo.舔肛 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 21) {
    if (kojo.背后位 == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:136`) == 1) {
          await era.printAndWait(`「${sc()}的第一次、要献给汪酱了～……♪」`);
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「${sc()}的第一次、要和汪酱么？」`);
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「${sc()}的第一次、要和汪酱么？」`);
        } else {
          await era.printAndWait(
            `「呜呜……${sc()}还是第一次……居然要和汪酱…………」`,
          );
        }
      } else {
        if (era0(`talent:${target}:136`) == 1) {
          await era.printAndWait(`「汪酱～终于要交配了呢～……♪」`);
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「要和汪酱爱爱是吗？」`);
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「要和汪酱爱爱是吗？」`);
        } else {
          await era.printAndWait(`「要和汪酱交配什么的……」`);
        }
      }
      // CFLAG:322  = 1（变量语义：CFLAG 族，322）
      kojo.背后位 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (kojo.背后位 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「和汪酱交配～好幸福～♪」`);
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「来吧～汪酱～来交配吧～♪」`);
        } else {
          await era.printAndWait(`「呵呵～汪酱、一副忍不了想交配的样子呢～♪」`);
        }
        // CFLAG:322  = 7（变量语义：CFLAG 族，322）
        kojo.背后位 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「要和汪酱爱爱是吗？」`);
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「要和汪酱爱爱是吗？」`);
        } else {
          await era.printAndWait(`「要和汪酱爱爱是吗？」`);
        }
        // CFLAG:322  = 6（变量语义：CFLAG 族，322）
        kojo.背后位 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.背后位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「要和狗狗爱爱是吗？」`);
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「要和狗狗爱爱是吗？」`);
        } else {
          await era.printAndWait(`「要和狗狗爱爱是吗？」`);
        }
        // CFLAG:322  = 5（变量语义：CFLAG 族，322）
        kojo.背后位 = 5;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「要和狗狗交配是吧……好、我明白了……」`);
        // CFLAG:322  = 4（变量语义：CFLAG 族，322）
        kojo.背后位 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「要和狗狗交配是吧……好、我明白了……」`);
        // CFLAG:322  = 3（变量语义：CFLAG 族，322）
        kojo.背后位 = 3;
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「要和狗狗交配什么的……」`);

        // CFLAG:322  = 2（变量语义：CFLAG 族，322）
        kojo.背后位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 27) {
    if (kojo.背后位肛交 == 0) {
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328）
      kojo.背后位肛交 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:328  = 7（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:328  = 6（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:328  = 5（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:328  = 4（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 4;
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:328  = 3（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 3;
      } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:328  = 2（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 30) {
    if (kojo.手淫 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331）
      kojo.手淫 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:331  = 7（变量语义：CFLAG 族，331）
        kojo.手淫 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:331  = 6（变量语义：CFLAG 族，331）
        kojo.手淫 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.手淫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:331  = 5（变量语义：CFLAG 族，331）
        kojo.手淫 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:331  = 4（变量语义：CFLAG 族，331）
        kojo.手淫 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:331  = 3（变量语义：CFLAG 族，331）
        kojo.手淫 = 3;
      } else if (kojo.手淫 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:331  = 2（变量语义：CFLAG 族，331）
        kojo.手淫 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 31) {
    if (kojo.口交_奴 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332）
      kojo.口交_奴 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:332  = 7（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:332  = 6（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 6;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.口交_奴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:332  = 5（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.print('');
        await era.printAndWait('');
        // CFLAG:332  = 4（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.口交_奴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.print('');
        await era.printAndWait('');
        // CFLAG:332  = 3（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 3;
      } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:332  = 2（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 34) {
    if (kojo.骑乘位 == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:136`) == 1) {
          await era.printAndWait('');
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      } else {
        if (era0(`talent:${target}:136`) == 1) {
          await era.printAndWait('');
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era0(`talent:${target}:85`) == 1) {
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
        era0(`talent:${target}:136`) == 1 &&
        (kojo.骑乘位 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:335  = 7（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.骑乘位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(4) == 0) {
          await era.printAndWait('');
        } else if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:335  = 6（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.骑乘位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(4) == 0) {
          await era.print('');
        } else if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:335  = 5（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 5;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (kojo.骑乘位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(4) == 0) {
          await era.printAndWait('');
        } else if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:335  = 4（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.骑乘位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.print('');
        await era.printAndWait('');
        // CFLAG:335  = 3（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 3;
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:335  = 2（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 37) {
    if (kojo.肛门侍奉 == 0) {
      if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338）
      kojo.肛门侍奉 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:338  = 6（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 6;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:338  = 5（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.print('');
        // CFLAG:338  = 4（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:338  = 3（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 3;
      } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:338  = 2（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`)) {
    if (kojo.眼罩 == 0) {
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344）
      kojo.眼罩 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (kojo.眼罩 <= 9 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 10（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 10;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 9;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 8;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.眼罩 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 7;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.眼罩 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 4;
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 3;
      } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`) == 0) {
    if (
      era0(`talent:${target}:136`) == 1 &&
      (kojo.肛门侍奉 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:444  = 4（变量语义：CFLAG 族，444）
      kojo.兽奸眼罩 = 4;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.肛门侍奉 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:444  = 3（变量语义：CFLAG 族，444）
      kojo.兽奸眼罩 = 3;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.肛门侍奉 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:444  = 2（变量语义：CFLAG 族，444）
      kojo.兽奸眼罩 = 2;
    } else if (kojo.兽奸眼罩 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait('');
      // CFLAG:444  = 1（变量语义：CFLAG 族，444）
      kojo.兽奸眼罩 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 56) {
    if (kojo.交谈 == 0) {
      if (era0(`tequip:${target}:53`)) {
        if (era0(`talent:${target}:136`) == 1) {
          await era.printAndWait('');
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      }
      // CFLAG:357  = 1（变量语义：CFLAG 族，357）
      kojo.交谈 = 1;
      return 0;
    } else {
      if (era0(`tequip:${target}:53`)) {
        if (
          era0(`talent:${target}:136`) == 1 &&
          (kojo.交谈 <= 4 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait('');
          // CFLAG:357  = 5（变量语义：CFLAG 族，357）
          kojo.交谈 = 5;
        } else if (
          era0(`talent:${target}:76`) == 1 &&
          (kojo.交谈 <= 3 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait('');
          // CFLAG:357  = 4（变量语义：CFLAG 族，357）
          kojo.交谈 = 4;
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          (kojo.交谈 <= 2 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait('');
          // CFLAG:357  = 3（变量语义：CFLAG 族，357）
          kojo.交谈 = 3;
        } else if (kojo.交谈 <= 1 || game.kojo.口上开关 == 2) {
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

// kojo_message_palamcng_13
async function kojo_message_palamcng_13(rand) {
  const { target, sc, kojo } = bind_ctx(rand);
  const clitoris_word = (cid) =>
    era0(`talent:${cid}:122`) !== 0 ? '阴茎' : '阴核';
  void rand;
  let P = 0;
  let A = 0;

  if (era0(`tequip:${target}:45`)) {
    return 0;
  }

  if (game.train.失神) {
    return 0;
  }

  P = era0(`palam:${target}:3`) + era0(`delta:${target}:3`);
  if (P > PALAMLV[2] && kojo.首次润滑Lv2 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      if (era_flag.selectcom == 50) {
        await era.printAndWait(`「变得黏糊糊的……」`);
      } else {
        await era.printAndWait(`「湿了……湿了、、、吗」`);
      }
    } else {
      if (era_flag.selectcom == 50) {
        await era.printAndWait(`「讨厌、变得粘糊糊的……」`);
      } else {
        await era.printAndWait(`「湿了……湿了啊嗷嗷唔」`);
      }
    }
    // CFLAG:TARGET:221  = 1（变量语义：CFLAG 族，TARGET:221）
    kojo.首次润滑Lv2 = 1;
  }

  P = era0(`palam:${target}:5`) + era0(`delta:${target}:5`);
  if (P > PALAMLV[2] && kojo.首次欲情Lv2 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      if (era_flag.selectcom == 51) {
        await era.printAndWait(`「要用这种药……啊」`);
      } else {
        await era.printAndWait(`「哈 哈……还、还要……」`);
      }
    } else {
      if (era_flag.selectcom == 51) {
        await era.printAndWait(`「不行……想要……是因为吃了媚药的原因吗……」`);
      } else {
        await era.printAndWait(`「呜呜……原谅${sc()}……好想要」`);
      }
    }
    // CFLAG:222  = 1（变量语义：CFLAG 族，222）
    kojo.首次欲情Lv2 = 1;
  }

  P = era0(`palam:${target}:8`) + era0(`delta:${target}:8`);
  if (P > PALAMLV[2] && kojo.首次耻情Lv2 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「不要……好害羞的……」`);
    } else {
      await era.printAndWait(`「不要……好害羞的……」`);
    }
    // CFLAG:223  = 1（变量语义：CFLAG 族，223）
    kojo.首次耻情Lv2 = 1;
  }

  P = era0(`palam:${target}:10`) + era0(`delta:${target}:10`);
  if (P > PALAMLV[2] && kojo.首次恐怖Lv2 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「不要！求求你饶了${sc()}吧……」`);
    } else {
      await era.printAndWait(`「不要！求求你饶了${sc()}吧……」`);
    }
    // CFLAG:224  = 1（变量语义：CFLAG 族，224）
    kojo.首次恐怖Lv2 = 1;
  }

  if (era0(`nowex:${target}:0`) > 0 && kojo.首次C绝顶 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「${clitoris_word(target)}……要高潮了！！」`);
    } else {
      await era.printAndWait(`「${clitoris_word(target)}……要高潮了！！」`);
    }
    // CFLAG:225  = 1（变量语义：CFLAG 族，225）
    kojo.首次C绝顶 = 1;
  }

  if (era0(`nowex:${target}:1`) > 0 && kojo.首次V绝顶 == 0) {
    if (era0(`talent:${target}:76`) == 1) {
      await era.printAndWait(`「不行${sc()}要去了、啊啊啊啊！！」`);
    } else if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「里面……好舒服啊」`);
    } else {
      await era.printAndWait(`「要、要去了……」`);
    }
    // CFLAG:TARGET:226  = 1（变量语义：CFLAG 族，TARGET:226）
    kojo.首次V绝顶 = 1;
  }

  if (era0(`nowex:${target}:2`) > 0 && kojo.首次A绝顶 == 0) {
    if (era0(`talent:${target}:76`) == 1) {
      await era.printAndWait(`「啊、啊、肛门最棒了……」`);
    } else if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「屁股……感觉太美妙了……」`);
    } else {
      await era.printAndWait(`「啊、不行…屁股……要去了……」`);
    }
    // CFLAG:227  = 1（变量语义：CFLAG 族，227）
    kojo.首次A绝顶 = 1;
  }

  if (era0(`nowex:${target}:3`) > 0 && kojo.首次B绝顶 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「乳房、高潮了……」`);
    } else {
      await era.printAndWait(`「乳房、高潮了……」`);
    }
    // CFLAG:TARGET:228  = 1（变量语义：CFLAG 族，TARGET:228）
    kojo.首次B绝顶 = 1;
  }

  A = era0(`delta:${target}:11`) + era0(`delta:${target}:12`);
  if (game.train.处女丧失 == 1 && kojo.处女丧失 == 0) {
    if (game.train.主人导致处女丧失 == 1) {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (A < 500 || game.system.反抗刻印回避 == 1)
      ) {
        await era.printAndWait('');
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (A < 500 || game.system.反抗刻印回避 == 1)
      ) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
    } else {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
    }
    // CFLAG:TARGET:229  = 1（变量语义：CFLAG 族，TARGET:229）
    kojo.处女丧失 = 1;
  }
}

// kojo_message_syasei_13
async function kojo_message_syasei_13(rand) {
  const { rand_n, target, sc } = bind_ctx(rand);

  if (era0(`tequip:${target}:45`)) {
    return 0;
  }

  if (game.train.性交射精 == 1) {
    if (era0(`talent:${target}:76`) == 1) {
      if (era0(`talent:${target}:157`)) {
        await era.print(`「唔呵呵${heart(1)}」`);
        await era.printAndWait(`「出来了很多啊、很舒服吧${heart(3)}」`);
      } else {
        await era.print(`「唔呵呵${heart(1)}……」`);
        await era.printAndWait(`「请多注入一些吧${heart(3)}」`);
      }
    } else if (era0(`talent:${target}:85`)) {
      if (rand_n(2) == 0) {
        await era.print(`「哎呀哎呀${heart(1)}……」`);
        await era.printAndWait(`「注入了这么多……要怀上孩子了啦${heart(1)}」`);
      } else {
        await era.print(`「唔呵呵${heart(1)}……」`);
        await era.printAndWait(`「请注入到怀孕为止吧${heart(1)}」`);
      }
      if (era0(`talent:${target}:157`)) {
        await era.printAndWait(`「机会难得、向那个人报告一下好了${heart(3)}」`);
      }
    } else {
      if (era0(`talent:${target}:157`) && rand_n(3) == 0) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「请原谅${sc()}…老公……」`);
        } else {
          await era.printAndWait(`「对不起…老公……」`);
        }
      } else {
        await era.printAndWait(`「不可以射在里面啊……」`);
      }
    }
  }
}

// kojo_message_markcng_13
async function kojo_message_markcng_13(rand) {
  const { target, sc, kojo } = bind_ctx(rand);
  void rand;

  if (era0(`tequip:${target}:45`)) {
    return 0;
  }

  if (game.system.苦痛刻印变动 == 3 && kojo.苦痛刻印Lv3 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「好痛苦……但却有种快乐的感觉？」`);
    } else {
      await era.printAndWait(`「好痛苦……呜呜…………」`);
    }
    // CFLAG:297  = 1（变量语义：CFLAG 族，297）
    kojo.苦痛刻印Lv3 = 1;
  }

  if (game.system.快乐刻印变动 == 3 && kojo.快乐刻印Lv3 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「啊……人家变得好奇怪……」`);
    } else {
      await era.printAndWait(`「啊……人家变得好奇怪……」`);
    }
    // CFLAG:298  = 1（变量语义：CFLAG 族，298）
    kojo.快乐刻印Lv3 = 1;
  }

  if (game.system.屈服刻印变动 == 3 && kojo.屈服刻印Lv3 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「已经不行了……请原谅${sc()}……求您饶恕${sc()}吧……」`,
      );
    } else {
      await era.printAndWait(
        `「已经不行了……请原谅${sc()}……求您饶恕${sc()}吧……」`,
      );
    }
    // CFLAG:299  = 1（变量语义：CFLAG 族，299）
    kojo.屈服刻印Lv3 = 1;
  }

  if (game.system.反抗刻印变动 == 3 && kojo.反抗刻印Lv3 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「不可饶恕……绝对……」`);
    } else {
      await era.printAndWait(`「不可饶恕……绝对……」`);
    }
    // CFLAG:300  = 1（变量语义：CFLAG 族，300）
    kojo.反抗刻印Lv3 = 1;
  }
}

// self_kojo_k13
async function self_kojo_k13(rand) {
  const { target, kojo } = bind_ctx(rand);

  const Q = peek_aftertrain_q();
  const S = peek_aftertrain_s();
  void rand;
  void S;

  if (game.train.初吻与自我口上 == 1) {
    if (era0(`talent:${target}:9`) == 1) {
      await era.printAndWait('');
    } else if (Q == 1) {
      await era.printAndWait('');
    } else if (Q == 2) {
      await era.printAndWait('');
    } else {
      if (
        era0(`talent:${target}:76`) &&
        (kojo.调教后自慰 < 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:261  = 4（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 4;
      } else if (
        era0(`talent:${target}:85`) &&
        (kojo.调教后自慰 < 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:261  = 3（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 3;
      } else if (
        era0(`abl:${target}:31`) >= 3 &&
        (kojo.调教后自慰 < 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:261  = 2（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 2;
      } else if (kojo.调教后自慰 < 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:261  = 1（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 1;
      }
    }
  }

  if (game.train.初吻与自我口上 == 2) {
    if (
      era0(`talent:${target}:76`) &&
      (kojo.百合PLAY < 5 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:262  = 5（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 5;
    } else if (
      era0(`talent:${target}:85`) &&
      (kojo.百合PLAY < 4 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:262  = 4（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 4;
    } else if (
      era0(`abl:${target}:33`) >= 3 &&
      (kojo.百合PLAY < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:262  = 3（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 3;
    } else if (
      era0(`abl:${target}:22`) >= 3 &&
      (kojo.百合PLAY < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:262  = 2（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 2;
    } else if (kojo.百合PLAY < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait('');
      // CFLAG:262  = 1（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 1;
    }
  }

  if (game.train.初吻与自我口上 == 3) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.朝口交 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:263  = 3（变量语义：CFLAG 族，263）
      kojo.朝口交 = 3;
    } else if (
      era0(`talent:${target}:85`) &&
      (kojo.朝口交 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:263  = 3（变量语义：CFLAG 族，263）
      kojo.朝口交 = 3;
    } else if (
      era0(`abl:${target}:16`) >= 5 &&
      (kojo.朝口交 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:263  = 2（变量语义：CFLAG 族，263）
      kojo.朝口交 = 2;
    } else if (kojo.朝口交 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait('');
      // CFLAG:263  = 1（变量语义：CFLAG 族，263）
      kojo.朝口交 = 1;
    }
  }

  if (game.train.初吻与自我口上 == 4) {
    if (
      era0(`abl:${target}:2`) >= 4 &&
      (kojo.调教后性交 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:264  = 2（变量语义：CFLAG 族，264）
      kojo.调教后性交 = 2;
    } else if (kojo.调教后性交 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait('');
      // CFLAG:264  = 1（变量语义：CFLAG 族，264）
      kojo.调教后性交 = 1;
    }
  }

  if (game.train.初吻与自我口上 == 5) {
    if (kojo.夜袭 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait('');
      // CFLAG:265  = 1（变量语义：CFLAG 族，265）
      kojo.夜袭 = 1;
    }
  }

  if (game.train.初吻与自我口上 == 6) {
    if (era0(`talent:${target}:85`) && era0(`mark:${target}:3`) < 3) {
      await era.printAndWait('');
    } else if (era0(`mark:${target}:3`) == 3) {
      await era.printAndWait('');
    } else if (era0(`talent:${target}:76`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    if (era0(`talent:${target}:122`) != 1) {
      await sell_maturo_k0(target, { rand }); // CALL SELL_MATURO_K0
    }
  }

  if (game.train.初吻与自我口上 == 9) {
    era.drawLine();
    await era.printAndWait('');
    era.drawLine();
  }

  if (game.train.初吻与自我口上 == 10) {
    era.drawLine();
    await era.printAndWait('');
    era.drawLine();
  }

  if (game.train.初吻与自我口上 == 11) {
    if (kojo.妊娠发觉 >= 1) {
      return 0;
    }

    if (era0(`talent:${target}:9`) == 1) {
      await era.printAndWait('');
    } else if (
      era0(`talent:${target}:85`) &&
      chara(target).event.妊娠相手 == 1
    ) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    // CFLAG:271  = 1（变量语义：CFLAG 族，271）
    kojo.妊娠发觉 = 1;
  }

  if (game.train.初吻与自我口上 == 12) {
    if (kojo.生产 >= 1) {
      return 0;
    }

    if (era0(`talent:${target}:9`) == 1) {
      await era.printAndWait('');
    } else if (
      era0(`talent:${target}:85`) &&
      chara(target).event.妊娠相手 == 1
    ) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    // CFLAG:272  = 1（变量语义：CFLAG 族，272）
    kojo.生产 = 1;
  }

  if (game.train.初吻与自我口上 == 999) {
    if (era0(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  }

  if (game.train.初吻与自我口上 == 998) {
    if (era0(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  }

  // TFLAG:13  = 0（变量语义：TFLAG 族，13）
  game.train.初吻与自我口上 = 0;

  return 0;
}

// dungeon_ryouzyoku_k13
async function dungeon_ryouzyoku_k13(rand) {
  const { target, sc } = bind_ctx(rand);

  void rand;

  if (era0(`talent:${target}:0`) == 1) {
    await era.printAndWait(`「怎么会这样……${sc()}的……第一次……」`);

    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      await era.printAndWait(`「……」`);

      return 0;
    } else if (
      era0(`talent:${target}:17`) == 1 ||
      era0(`talent:${target}:31`) == 1 ||
      era0(`talent:${target}:36`) == 1
    ) {
      await era.printAndWait(
        `「那个、人的性命只有一次所以……如果想要的话请尽管使用${sc()}的身体……」`,
      );

      if (era0(`talent:${target}:106`) == 1 || era0(`exp:${target}:1`) > 0) {
        await era.printAndWait(
          `「是、是的、屁股的话……即使是侵犯${sc()}的屁股也没事的！」`,
        );
      }

      if (era0(`exp:${target}:22`) > 0) {
        await era.printAndWait(`「就是用嘴的话也没关系的……感觉怎么样……」`);
      }
    } else if (
      era0(`talent:${target}:11`) == 1 ||
      era0(`talent:${target}:12`) == 1 ||
      era0(`talent:${target}:15`) == 1 ||
      era0(`talent:${target}:30`) == 1 ||
      era0(`talent:${target}:34`) == 1
    ) {
      await era.printAndWait(
        `「即使${sc()}的身体被侮辱了${sc()}的心也不会屈服的！」`,
      );
    } else if (
      era0(`talent:${target}:10`) == 1 ||
      era0(`talent:${target}:26`) == 1
    ) {
      await era.printAndWait(`「杀了你……${sc()}要杀了你」`);
    } else {
      await era.printAndWait(`「啊啊……早知道会这样的话……就不冒这个险了……」`);
    }
  } else {
    await era.printAndWait(`「求……求求你……帮帮${sc()}……」`);

    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      await era.printAndWait(`「……」`);

      return 0;
    } else if (
      era0(`talent:${target}:17`) == 1 ||
      era0(`talent:${target}:31`) == 1 ||
      era0(`talent:${target}:36`) == 1
    ) {
      await era.printAndWait(
        `「${sc()}知道该怎么和男人们打交道！${sc()}会让各位感到满足……所以…请饶过一命…」`,
      );

      if (era0(`talent:${target}:106`) == 1 || era0(`exp:${target}:1`) > 0) {
        await era.printAndWait(`「屁股也可以的吧！屁股也可以爽的……」`);
      }

      if (era0(`exp:${target}:22`) > 0) {
        await era.printAndWait(`「用嘴来服侍你！　精液……也会喝掉的……」`);
      }
    } else if (
      era0(`talent:${target}:11`) == 1 ||
      era0(`talent:${target}:12`) == 1 ||
      era0(`talent:${target}:15`) == 1 ||
      era0(`talent:${target}:30`) == 1 ||
      era0(`talent:${target}:34`) == 1
    ) {
      await era.printAndWait(
        `「${sc()}、${sc()}是绝对不会屈服于你们这些家伙的！」`,
      );
    } else if (
      era0(`talent:${target}:10`) == 1 ||
      era0(`talent:${target}:26`) == 1
    ) {
      await era.printAndWait(`「请……杀了${sc()}吧……」`);
    } else {
      await era.printAndWait(`「啊啊……为什么会这样……」`);
    }
  }

  return 0;
}

// dungeon_ryouzyoku_after_k13
async function dungeon_ryouzyoku_after_k13(rand) {
  const { target, sc } = bind_ctx(rand);

  void rand;

  if (era0(`talent:${target}:0`) == 1) {
    await era.printAndWait(`「哈啊……总算保住了${sc()}的贞操」`);

    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      await era.printAndWait(`「……」`);

      return 0;
    }

    if (era0(`exp:${target}:1`) > 20) {
      await era.printAndWait(`「呜呜……都对${sc()}的屁股做什么啊……」`);
      await era.printAndWait(`「真过分……」`);
    }

    if (era0(`exp:${target}:22`) > 20) {
      await era.printAndWait(`「咕诶…… 哈、哈……」`);
    }

    if (era0(`exp:${target}:20`) > 20) {
      await era.printAndWait(`「黏在喉咙上了……呜……」`);
    }
  } else {
    await era.printAndWait(`「结、结束了……」`);

    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      await era.printAndWait(`「……」`);

      return 0;
    }

    if (era0(`exp:${target}:0`) > 20) {
      await era.printAndWait(`「会有……小宝宝的……」`);
      await era.printAndWait(`「过分……」`);
    }

    if (era0(`exp:${target}:1`) > 20) {
      await era.printAndWait(`「这样子弄……」`);
      await era.printAndWait(`「屁股、要坏掉了……」`);
    }

    if (era0(`exp:${target}:22`) > 20) {
      await era.printAndWait(`「咕诶……口交得太过头了……」`);
    }

    if (era0(`exp:${target}:20`) > 20) {
      await era.printAndWait(`「嘴里……还有很多……」`);
    }
  }

  return 0;
}

// benki_koujo_k13
async function benki_koujo_k13(rand) {
  const { target, sc, kojo } = bind_ctx(rand);
  const a = era_flag.target;
  void rand;
  void target;
  void sc;
  void kojo;

  if (game.train.肉便器行动 == 0) {
    if (game.dungeon.肉便器常识改写 == 1) {
      await era.printAndWait(
        `「要让${self_call(a)}服侍这几位吗……？　好的！　明白啦${heart(1)}」`,
      );
      await era.printAndWait(
        `「虽然本来很讨厌这种肮脏的工作、因为『被命令要喜欢上这些肮脏的东西』嘛、就开开心心地服侍起来啦${heart(1)}」`,
      );
    } else if (era0(`talent:${a}:76`) == 1) {
      await era.printAndWait(
        `「你们啊、排好队站整齐咯${heart(1)}　这就好好服侍你们哦${heart(1)}」`,
      );
    } else {
      await era.printAndWait(`「好的……会尽全力服侍的……」`);
    }
  } else if (game.train.肉便器行动 == 1) {
    if (era0(`talent:${a}:76`) == 1) {
      await era.printAndWait('');
    } else if (era0(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era0(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 == 2) {
    if (era0(`talent:${a}:76`) == 1) {
      await era.printAndWait('');
    } else if (era0(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era0(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 == 3) {
    if (era0(`talent:${a}:76`) == 1) {
      await era.printAndWait('');
    } else if (era0(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era0(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 == 4) {
    if (era0(`talent:${a}:76`) == 1) {
      await era.printAndWait('');
    } else if (era0(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era0(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 == 5) {
    if (era0(`talent:${a}:76`) == 1) {
      await era.printAndWait('');
    } else if (era0(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era0(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  }

  return 0;
}

// dungeon_victory_k13
async function dungeon_victory_k13(rand) {
  const { rand_n, target, sc } = bind_ctx(rand);
  const a = target;

  await era.printAndWait(`「呵呵……怎么样。${sc()}赢了」`);

  if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
    await era.printAndWait(`「……呵呵」`);

    return 0;
  } else if (
    era0(`talent:${target}:11`) == 1 ||
    era0(`talent:${target}:12`) == 1 ||
    era0(`talent:${target}:15`) == 1 ||
    era0(`talent:${target}:30`) == 1 ||
    era0(`talent:${target}:34`) == 1
  ) {
    if (rand_n(3) == 0) {
      await era.printAndWait(`「${sc()}、很强的！」`);
    } else if (rand_n(2) == 0) {
      await era.printAndWait(`「${sc()}、会加油的！」`);
    } else {
      await era.printAndWait(`「哎呀哎呀、输给${sc()}也是没办法的不是吗？」`);
    }
  } else if (
    era0(`talent:${target}:10`) == 1 ||
    era0(`talent:${target}:26`) == 1
  ) {
    await era.printAndWait(`「真是危险的地方……」`);

    return 0;
  } else {
    if (rand_n(3) == 0) {
      await era.printAndWait(`「这次的胜利、为了辉煌的明日……」`);
    } else if (rand_n(2) == 0) {
      await era.printAndWait(`「哎呀哎呀、真可悲啊」`);
    } else {
      await era.printAndWait(`「好、又向前迈进了一步！」`);
    }
  }

  if (
    (era0(`base:${a}:0`) * 100) / era0(`maxbase:${a}:0`) < 50 ||
    (era0(`base:${a}:1`) * 100) / era0(`maxbase:${a}:1`) < 50
  ) {
    await era.printAndWait(`（但是、还真是危险啊……）`);
  } else {
    await era.printAndWait(`「那么、前进咯」`);
  }

  return 0;
}

// dungeon_attack_k13
async function dungeon_attack_k13(rand) {
  const { rand_n, target, sc } = bind_ctx(rand);

  if (chara(target).invasion.状态 == 2) {
    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      await era.printAndWait(`「……呵呵」`);

      return 0;
    } else if (
      era0(`talent:${target}:11`) == 1 ||
      era0(`talent:${target}:12`) == 1 ||
      era0(`talent:${target}:15`) == 1 ||
      era0(`talent:${target}:30`) == 1 ||
      era0(`talent:${target}:34`) == 1
    ) {
      if (rand_n(3) == 0) {
        await era.printAndWait(`「哎呀哎呀、趁现在」`);
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「东张西望、是不行的」`);
      } else {
        await era.printAndWait(`「这种攻击怎么样？」`);
      }
    } else if (
      era0(`talent:${target}:10`) == 1 ||
      era0(`talent:${target}:26`) == 1
    ) {
      await era.printAndWait(`「请、请去死吧！」`);

      return 0;
    } else {
      if (rand_n(3) == 0) {
        await era.printAndWait(`「上咯！」`);
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「交给${sc()}吧！」`);
      } else {
        await era.printAndWait(`「那么、躲得开这招吗」`);
      }
    }
  } else {
    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      await era.printAndWait(`「……呵呵」`);

      return 0;
    } else if (
      era0(`talent:${target}:11`) == 1 ||
      era0(`talent:${target}:12`) == 1 ||
      era0(`talent:${target}:15`) == 1 ||
      era0(`talent:${target}:30`) == 1 ||
      era0(`talent:${target}:34`) == 1
    ) {
      if (rand_n(3) == 0) {
        await era.printAndWait(`「哎呀哎呀、还是抵抗打算的？」`);
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「呵呵……没用的哦？」`);
      } else {
        await era.printAndWait(`「呵呵……真可爱♪」`);
      }
    } else if (
      era0(`talent:${target}:10`) == 1 ||
      era0(`talent:${target}:26`) == 1
    ) {
      await era.printAndWait(`「${sc()}是……很强的！」`);

      return 0;
    } else {
      if (rand_n(3) == 0) {
        await era.printAndWait(`「呵呵……加油咯♪」`);
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「好好看着哦……主人大人♪」`);
      } else {
        await era.printAndWait(`「哎呀哎呀、怎么办呢」`);
      }
    }
  }

  return 0;
}

// colosseum_kojo_13
async function colosseum_kojo_13(rand) {
  const { target, sc } = bind_ctx(rand);

  void rand;

  if (era_flag.selectcom == 55) {
    if (era0(`base:${target}:1`) <= 0) {
      await era.printAndWait(`「在看什么……？　咕、你是想杀了${sc()}吧……」`);
    } else {
      await era.printAndWait(`「你打算手下留情……？」`);
    }
    return 0;
  }

  if (era_flag.selectcom == 56) {
    if (era0(`base:${target}:1`) <= 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
    }
    return 0;
  }

  if (era_flag.selectcom == 31) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    return 0;
  }

  if (era_flag.selectcom == 5) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    return 0;
  }

  if (era_flag.selectcom == 21) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait('');
    } else if (game.train.死斗场敌种 == 206) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    return 0;
  }

  if (era_flag.selectcom == 27) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait('');
    } else if (game.train.死斗场敌种 == 206) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    return 0;
  }

  if (era_flag.selectcom == 51) {
    await era.printAndWait('');
    return 0;
  }

  return 0;
}

// ntr_koujo_k13
async function ntr_koujo_k13(rand, P) {
  const { target, sc, kojo } = bind_ctx(rand);
  const a_name = chara_callname(era_flag.target);
  P = P ?? 0;

  if (kojo.NTR再捕获 == 0) {
    // CFLAG:650  = 1（变量语义：CFLAG 族，650）
    kojo.NTR再捕获 = 1;
  }

  if (P == 1) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.print(`「${sc()}的身心、全都是魔王大人的东西」`);
      await era.printAndWait(`「无论是什么卑劣的手段都是没有用的」`);
      if (era0(`talent:${target}:85`) && era0(`talent:${target}:157`)) {
        await era.printAndWait(`（魔王大人……救救${sc()}……老公……你在哪……）`);
      }
      await era.print(
        `被弄成牝犬一样的姿势的${sc()}说着毅然决然的话语拒绝服从、`,
      );
      // 同一行输出：无后缀 PRINTFORM/PRINT 连续
      // 不换行（后面的 PRINTW 才收行）。武器名两档的条件提到语句外、
      // 文本留在输出语句里——保真锁
      // 按序核对台词片段（#600）
      const king_has_penis =
        game.system.狂王性别 == 0 || game.system.狂王性别 == 2;
      // #625：这一行有两条互斥 PRINTW 终点。前缀段归文本序第一支的
      // 拼接基准，另一支改用同一个前缀
      // 变量——保真锁逐条核对片段，非前缀行的语句里不能再写那些字面量
      const rape_prefix =
        `狂王毫不介意${sc()}的话、邪笑了起来、将` +
        (king_has_penis ? '胯下的巨根' : '极粗的假阳具') +
        `刺穿了`;

      if (era0(`talent:${target}:157`) && era0(`exp:${target}:60`) >= 1) {
        await era.printAndWait(
          `狂王毫不介意${sc()}的话、邪笑了起来、将` +
            (king_has_penis ? '胯下的巨根' : '极粗的假阳具') +
            `刺穿了` +
            `由魔王再生的处女膜。`,
        );
      } else {
        await era.printAndWait(
          rape_prefix + `尚未经人事的小穴、蛮横地抽插着。`,
        );
      }
      if (era0(`talent:${target}:157`)) {
        if (era0(`talent:${target}:76`)) {
          await era.print(`「啊啊啊…帮帮我……老公…魔王大人……」`);
        }
        if (era0(`talent:${target}:85`)) {
          await era.print(
            `「啊啊啊…帮帮我……老公、老公啊…帮帮我啊…魔王大人……」`,
          );
        }
      } else {
        await era.print(
          `「请原谅${sc()}啊……魔王大人啊啊啊！！　嘤、停下啊、请放过${sc()}……」`,
        );
      }
      await era.printAndWait(
        `伴随着悲惨的哭喊声、苦苦求饶呼救的${sc()}、狂王一边嘲笑着一边侵犯着。`,
      );
      await era.printAndWait(
        `${sc()}几度晕厥又被强行弄醒、漫漫无尽的残酷的行为被记录在了水晶球中……`,
      );
    } else {
      await era.print(`「${sc()}是……被魔王威胁了才服从了的」`);
      await era.printAndWait(`「还请、求您发发慈悲……」`);
      await era.print(`${sc()}俯身在地上、向狂王乞求着饶恕。`);
      // 同一行输出：无后缀 PRINT 连续不换行，末行
      // PRINTL 才收行。武器名两档的条件提到语句外当取值、文本留在
      // 输出语句里（#625）
      const king_has_penis =
        game.system.狂王性别 == 0 || game.system.狂王性别 == 2;
      await era.print(
        `狂王冷笑了一番、蹂躏了一番${sc()}的屁股、将` +
          (king_has_penis ? `胯下的巨根` : `取出的极粗假阳具`) +
          `一口气刺穿了`,
      );

      // 同一行输出：IF 两支互斥（ELSE 支），
      // 末行 PRINTL 收行——条件提到语句外当取值、文本留在输出语句里（#625）
      const regen_hymen =
        era0(`talent:${target}:157`) && era0(`exp:${target}:60`) >= 1;
      await era.print(
        (regen_hymen
          ? `由魔王再生的处女膜、`
          : `尚未经人事的小穴、蛮横地抽插着、`) + `纯洁的赤印将地板染红了。`,
      );
      // 同一行输出：SIF TALENT:157
      // 只护住紧跟的一段，武器名两档互斥（#625）
      const has_hymen = era0(`talent:${target}:157`);
      await era.printAndWait(
        (has_hymen ? `（老公……抱歉……最终还是……）` : '') +
          `不仅无视了伴随着呜咽声求饶的${sc()}、狂王还愉快地将` +
          (king_has_penis ? `腰` : `极粗假阳具`) +
          `与${a_name}亲密接触的模样记录在了水晶球中。`,
      );
    }
    // CFLAG:651  = 1（变量语义：CFLAG 族，651）
    kojo.NTR_651 = 1;
  } else if (P == 2) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    // CFLAG:652  = 1（变量语义：CFLAG 族，652）
    kojo.NTR_652 = 1;
  } else if (P == 3) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.print(`「唔呵呵${heart(1)}　有在看着吗、魔王大人」`);
      await era.printAndWait(
        `「好好看着${sc()}和汪酱交尾的地方哦${heart(3)}」`,
      );
    } else {
      await era.printAndWait('');
    }
    // CFLAG:653  = 1（变量语义：CFLAG 族，653）
    kojo.NTR_653 = 1;
  } else if (P == 4) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      // 同一行输出：无后缀 PRINTFORM 连续不换行，末行
      // PRINTFORML 才收行。SIF TALENT:157 只护住后一段——条件
      // 提到语句外当取值，文本留在输出语句里（#625）
      const has_hymen = era0(`talent:${target}:157`);
      await era.print(
        `「昂${heart(1)}　` +
          (has_hymen ? `比那个人、` : '') +
          `比魔王大人${heart(3)}」`,
      );
      await era.printAndWait(
        `「还要粗、还要硬……啊啊啊${heart(1)}　好棒啊${heart(3)}」`,
      );
    } else {
      await era.printAndWait('');
    }
    // CFLAG:654  = 1（变量语义：CFLAG 族，654）
    kojo.NTR_654 = 1;
  } else if (P == 5) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.print(`「昂${heart(1)}　把${sc()}搞得乱七八糟吧${heart(1)}」`);
      await era.printAndWait(`「${sc()}可是您忠实的仆人啊${heart(3)}」`);
    } else {
      await era.printAndWait('');
    }
    // CFLAG:655  = 1（变量语义：CFLAG 族，655）
    kojo.NTR_655 = 1;
  } else if (P == 6) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.print(`「${sc()}是您忠实的仆人」`);
      await era.printAndWait(
        `「还请…还请好好调教这个淫乱的变态抖M吧${heart(1)}」`,
      );
    } else {
      await era.printAndWait('');
    }
    // CFLAG:656  = 1（变量语义：CFLAG 族，656）
    kojo.NTR_656 = 1;
  } else if (P == 7) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait(`「在被看着啊……」`);
    } else {
      await era.printAndWait('');
    }
    // CFLAG:657  = 1（变量语义：CFLAG 族，657）
    kojo.NTR_657 = 1;
  } else if (P == 20) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait(`「生、生出来了啊呜嗷嗷呜」`);
    } else {
      await era.printAndWait('');
    }
  } else if (chara(target).invasion.状态 == 2) {
    await era.print(
      `「唔呵呵${heart(1)}　魔王的首级、就让我去取来吧${heart(1)}」`,
    );
    await era.printAndWait(
      `「回来了之后可要好好疼爱我啊。主人大人${heart(1)}」`,
    );
  }

  era.setColor(''); // RESETCOLOR

  return 0;
}

// exucution_koujo_k13
async function exucution_koujo_k13(rand) {
  void rand;

  if (game.event.犬射精或处刑口上 == 4) {
    await era.printAndWait(`「噫、有谁……可以救救我」`);
  } else if (game.event.犬射精或处刑口上 == 5) {
    await era.printAndWait('');
  } else if (game.event.犬射精或处刑口上 == 6) {
    await era.printAndWait('');
  } else if (game.event.犬射精或处刑口上 == 7) {
    await era.printAndWait('');
  }
}

// museum_koujo_k13
async function museum_koujo_k13(rand) {
  const { sc } = bind_ctx(rand);
  void rand;

  if (game.event.博物馆口上 == 0) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 == 1) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 == 2) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 == 3) {
    await era.printAndWait(
      `「啊啦啊啦、${sc()}的这副样子被看到的话…真是很困扰呢」`,
    );
  } else if (game.event.博物馆口上 == 4) {
    await era.printAndWait(
      `「要把${sc()}变成人偶？…为什么要做、这样……的………事…」`,
    );
  } else if (game.event.博物馆口上 == 5) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 == 6) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 == 7) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 == 8) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 == 9) {
    await era.printAndWait('');
  }
}

// banishment_koujo_k13
async function banishment_koujo_k13(rand) {
  void rand;

  if (game.event.流放口上 == 0) {
    await era.printAndWait(`「再见。应该是再也不见吧……」`);
  } else if (game.event.流放口上 == 1) {
    await era.printAndWait('');
  } else if (game.event.流放口上 == 2) {
    await era.printAndWait('');
  } else if (game.event.流放口上 == 3) {
    await era.printAndWait('');
  } else if (game.event.流放口上 == 4) {
    await era.printAndWait('');
  }
}

// public_exucution_koujo_k13
async function public_exucution_koujo_k13(rand) {
  const { sc } = bind_ctx(rand);
  void rand;

  if (game.event.公开处刑口上 == 0) {
    await era.printAndWait(`「你、还是杀了${sc()}吧……」`);
  } else if (game.event.公开处刑口上 == 1) {
    await era.printAndWait(`「不要……${sc()}不想死……呜呜呜…」`);
  } else if (game.event.公开处刑口上 == 2) {
    await era.printAndWait('');
  }
}

// grotesque_koujo_k13
async function grotesque_koujo_k13(rand) {
  void rand;

  if (game.event.猎奇处刑口上 == 0) {
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 == 1) {
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 == 2) {
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 == 3) {
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 == 4) {
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 == 5) {
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 == 6) {
    await era.printAndWait('');
  }
}

// enterenemy_koujo_k13
async function enterenemy_koujo_k13(rand) {
  const a = era_flag.target;
  void rand;

  if (era0(`talent:${a}:21`) == 1 || era0(`talent:${a}:22`) == 1) {
    await era.printAndWait(`「……要上咯」`);
  } else if (
    era0(`talent:${a}:11`) == 1 ||
    era0(`talent:${a}:12`) == 1 ||
    era0(`talent:${a}:15`) == 1 ||
    era0(`talent:${a}:30`) == 1 ||
    era0(`talent:${a}:34`) == 1
  ) {
    await era.printAndWait(`「呵呵、坏孩子可是要被教训的呦？」`);
  } else if (era0(`talent:${a}:10`) == 1 || era0(`talent:${a}:26`) == 1) {
    await era.printAndWait(`「就算是${self_call(a)}……也能战斗的吗……？」`);
  } else {
    await era.printAndWait(`「呵呵、${self_call(a)}、会努力的♪」`);
  }
}

// gohoubi_request_koujo_k13
async function gohoubi_request_koujo_k13(rand) {
  const a = era_flag.target;
  const a_name = chara_callname(a);
  const { sc } = bind_ctx(rand);
  void rand;

  if (chara(a).stronghold.要求奖赏 == 0) {
    await era.printAndWait(`${a_name}要求奖励金钱`);
    await era.printAndWait(`「等${sc()}存够了钱、我们一起出去旅游吧♪　呵呵」`);
  } else if (
    chara(a).stronghold.要求奖赏 == 1 ||
    chara(a).stronghold.要求奖赏 == 2 ||
    chara(a).stronghold.要求奖赏 == 3
  ) {
    // 同一行输出：无后缀 PRINTFORM/PRINT 连续
    // 不换行，末行 PRINTFORMW 才收行。兽名三档的条件提到
    // 语句外当取值、文本留在输出语句里（#625）
    const beast_word =
      chara(a).stronghold.要求奖赏 == 1
        ? '犬'
        : chara(a).stronghold.要求奖赏 == 2
          ? '豚'
          : '马';
    await era.printAndWait(`${a_name}要求奖励与` + beast_word + `交尾`);
    await era.printAndWait(`「呵呵、野兽的鸡巴 真是期待啊♪」`);
  } else if (chara(a).stronghold.要求奖赏 == 4) {
    await era.printAndWait(`${a_name}要求奖励接吻`);
    await era.printAndWait(`「到时候吻${sc()}吧、让我们的口水不分彼此♪」`);
  } else if (chara(a).stronghold.要求奖赏 == 5) {
    await era.printAndWait(`${a_name}要求奖励做爱`);
    await era.printAndWait(`「奖励的话、比平时更激烈侵犯${sc()}就好了」`);
  } else if (chara(a).stronghold.要求奖赏 == 6) {
    await era.printAndWait(`${a_name}要求奖励精液`);
    await era.printAndWait(
      `「不许打飞机了！请把精液先存在你那边、等我回来全部都是${sc()}的♪」`,
    );
  } else if (chara(a).stronghold.要求奖赏 == 7) {
    await era.printAndWait(`${a_name}要求奖励乱交派对`);
    await era.printAndWait(`「等${sc()}得胜回来、我们开全裸派对吧♪」`);
  } else if (chara(a).stronghold.要求奖赏 == 8) {
    await era.printAndWait(`${a_name}要求奖励尿液`);
    await era.printAndWait(`「只要您的尿液就够了♪」`);
  } else if (chara(a).stronghold.要求奖赏 == 9) {
    await era.printAndWait(`${a_name}要求奖励童贞狩猎`);
    await era.printAndWait(
      `「好孩子是要需要奖励的、就奖励${self_call(a)}一个乖孩子吧♪」`,
    );
  }
}

// gohoubi_after_koujo_k13
async function gohoubi_after_koujo_k13(rand, cid, choice) {
  const a = cid ?? era_flag.target;
  const { sc } = bind_ctx(rand);
  void rand;

  if (choice == 0) {
    await era.printAndWait(`「这样啊……真失望」`);
    return 0;
  } else if (choice == 1) {
    await era.printAndWait(`「呵呵、这是很重要的东西${sc()}会好好保存的」`);
    return 0;
  } else if (choice == 2) {
    if (chara(a).stronghold.要求奖赏 == 0) {
      await era.printAndWait(`「哇、这么多……谢谢！」`);
    } else if (chara(a).stronghold.要求奖赏 == 1) {
      if (era0(`talent:${a}:0`) == 1) {
        await era.printAndWait(`「啊啊啊……和狗交配做爱什么的最棒了……」`);
      } else {
        await era.printAndWait(`「啊啊啊……和狗做爱最棒了……」`);
      }
    } else if (chara(a).stronghold.要求奖赏 == 2) {
      if (era0(`talent:${a}:0`) == 1) {
        await era.printAndWait(`「噗嘻……噗嘻！和猪交配……真棒！」`);
      } else {
        await era.printAndWait(
          `「噗嘻……噗嘻！和猪交配什么的……还是新鲜的体验呢！」`,
        );
      }
    } else if (chara(a).stronghold.要求奖赏 == 3) {
      if (era0(`talent:${a}:0`) == 1) {
        await era.printAndWait(`「好大好长……${sc()}快要爽的飞起来了了」`);
      } else {
        await era.printAndWait(`「好大啊啊啊……和马做爱最棒了」`);
      }
    } else if (chara(a).stronghold.要求奖赏 == 4) {
      await era.printAndWait(`「你答应好${sc()}的……请给${sc()}一个甜蜜的吻」`);
    } else if (chara(a).stronghold.要求奖赏 == 5) {
      if (era0(`abl:${a}:2`) > era0(`abl:${a}:3`)) {
        await era.printAndWait(`「那个……果然还是和魔王大人做爱最舒服了」`);
      } else {
        await era.printAndWait(`「那个……果然还是和魔王大人做爱最舒服了」`);
      }
    } else if (chara(a).stronghold.要求奖赏 == 6) {
      await era.printAndWait(
        `「呵呵、主人、${sc()}提前约好的精液可以给我了呦……啾……唔咕……呜呼……」`,
      );
    } else if (chara(a).stronghold.要求奖赏 == 7) {
      if (era0(`talent:${a}:0`) == 1) {
        await era.printAndWait(`「真是的还不够呢、再来点……」`);
      } else {
        await era.printAndWait(`「啊啊、再来、把你们的精华都给我吧……」`);
      }
    } else if (chara(a).stronghold.要求奖赏 == 8) {
      await era.printAndWait(
        `「没错就是这边、请对准${sc()}的嘴……就直接把${sc()}当成便器吧♪」`,
      );
    } else if (chara(a).stronghold.要求奖赏 == 9) {
      if (era0(`abl:${a}:2`) > era0(`abl:${a}:3`)) {
        await era.printAndWait(`「第一次上了的小穴……你可要记住${sc()}呦」`);
      } else {
        await era.printAndWait(
          `「真是对不起、这么淫荡的肛门……感觉还可以吗？」`,
        );
      }
    }
  }
}

// osioki_koujo_k13
async function osioki_koujo_k13(rand, cid, choice) {
  const a = cid ?? era_flag.target;
  void rand;

  if (choice == 0) {
    await era.printAndWait('');
  } else if (choice == 1) {
    if (era0(`abl:${a}:21`) >= 3) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (choice == 2) {
    if (era0(`abl:${a}:17`) >= 4) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (choice == 3) {
    if (era0(`abl:${a}:17`) >= 6) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (choice == 4) {
    if (era0(`abl:${a}:21`) >= 3) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (choice == 5) {
    if (era0(`talent:${a}:88`) == 1 || era0(`talent:${a}:76`) == 1) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (choice == 6) {
    await era.print('');
  } else if (choice == 7) {
    await era.print('');
  } else if (choice == 8) {
    await era.printAndWait('');
  } else if (choice == 9) {
    await era.printAndWait('');
  }
}

// gobi_koujo_k13（ARG:0 → arg_0 参数）
function gobi_koujo_k13(arg_0, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));

  if (arg_0 == 1) {
    return `嗯♪`;
  } else if (arg_0 == 2) {
    return `哦！`;
  } else if (arg_0 == 3) {
    return `是的……。`;
  } else if (arg_0 == 4) {
    return `……。`;
  } else if (arg_0 == 5) {
    return `就是这样……。`;
  } else {
    if (rand_n(3) == 0) {
      return `嗯。`;
    } else if (rand_n(2) == 0) {
      return `呢。`;
    } else {
      return `呀。`;
    }
  }
}

on('EVENTTRAIN', eventtrain_k13);
on('EVENTEND', eventend_k13);

kojo_message_com_family.register(13, kojo_message_com_13);
self_kojo_family.register(13, self_kojo_k13);
kojo_message_palamcng_family.register(13, kojo_message_palamcng_13);
kojo_message_markcng_family.register(13, kojo_message_markcng_13);
gohoubi_after_koujo_family.register(13, (cid, choice) =>
  gohoubi_after_koujo_k13(undefined, cid, choice),
);
osioski_koujo_family.register(13, (cid, choice) =>
  osioki_koujo_k13(undefined, cid, choice),
);
gohoubi_request_koujo_family.register(13, () => gohoubi_request_koujo_k13());
ryouzyoku_kojo_family.register(13, dungeon_ryouzyoku_k13);
ryouzyoku_after_kojo_family.register(13, dungeon_ryouzyoku_after_k13);
gobi_koujo_family.register(13, gobi_koujo_k13);
benki_koujo_family.register(13, benki_koujo_k13);
enterenemy_koujo_family.register(13, enterenemy_koujo_k13);
dungeon_victory_family.register(13, dungeon_victory_k13);
dungeon_attack_family.register(13, dungeon_attack_k13);
ntr_koujo_family.register(13, ntr_koujo_k13);
exucution_koujo_family.register(13, exucution_koujo_k13);
museum_koujo_family.register(13, museum_koujo_k13);
banishment_koujo_family.register(13, banishment_koujo_k13);
public_exucution_koujo_family.register(13, public_exucution_koujo_k13);
grotesque_koujo_family.register(13, grotesque_koujo_k13);

module.exports = {
  eventtrain_k13,
  eventend_k13,
  kojo_message_com_13,
  dog_kojo_13,
  colosseum_kojo_13,
  k13_kojo2,
  self_kojo_k13,
  kojo_message_palamcng_13,
  kojo_message_markcng_13,
  kojo_message_syasei_13,
  benki_koujo_k13,
  dungeon_ryouzyoku_k13,
  dungeon_ryouzyoku_after_k13,
  dungeon_victory_k13,
  dungeon_attack_k13,
  ntr_koujo_k13,
  exucution_koujo_k13,
  museum_koujo_k13,
  banishment_koujo_k13,
  public_exucution_koujo_k13,
  grotesque_koujo_k13,
  enterenemy_koujo_k13,
  gohoubi_request_koujo_k13,
  gohoubi_after_koujo_k13,
  osioki_koujo_k13,
  gobi_koujo_k13,
};
