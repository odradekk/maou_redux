/* eslint-disable no-irregular-whitespace, no-dupe-else-if */
/**
 * @file 知的（博士型）口上 K12：存在标志一对 + @EVENTTRAIN 主体 + @K12_KOJO2 +
 *       @EVENTEND（issue #243，J33）。
 *
 * == 头部守卫（KOJO_MESSAGE_COM_12，源 :402-426 与 K3/K10 顺序不同） ==
 *
 * 源里助手跳过守卫整行被注释（:402-405 的 `;SIF ASSI > 0 && ASSIPLAY`），
 * 1:1 不启用——与 K10 的 ASSI 守卫不同，K12 助手调教不跳过、出台词。
 * 实际生效守卫（:407-425）：① TEQUIP:45 口塞（SELECTCOM!=45）→ 跳过；
 * ② TFLAG:899 失神 → 跳过；③ TEQUIP:89 → CALL DOG_KOJO_12；④ TEQUIP:55
 * → CALL COLOSSEUM_KOJO_12。DOG_KOJO_12/COLOSSEUM_KOJO_12 是本文件内
 * 本地函数（K3 dog_kojo_3/colosseum_kojo_3 同构先例），不进 family。
 * 无 TALENT:9 崩坏守卫、无 TEQUIP:90 守卫（源如此，1:1）。
 *
 * == 状态机（CFLAG:301 起，K3/K10 同款惯例） ==
 *
 * 每条指令一个 CFLAG 计数器状态机，FLAG:7 == 2（默认）时上限旁路、每次
 * 都出声；FLAG:7 == 1 时逐阶段推进。源有 14-18 号指令的整段模板残骸
 * （:1140-1361 全注释），属未填写的模板骨架、非活代码，不落地（K11
 * SELECTCOM 17 同款判定）。爱抚等带怀孕分支（TALENT:153 && CFLAG:111==0）
 * 的指令保留怀孕分支判断。
 *
 * == 空台词槽 ==
 *
 * MUSEUM_KOUJO_K12（TFLAG:500 分档）、GROTESQUE_KOUJO_K12（TFLAG:530
 * 分档）等空 PRINTFORMW 台词槽未填写，保持空输出；死斗场
 * COLOSSEUM_KOJO_12 同构保留空档。
 *
 * == 跨文件调用 ==
 *
 * SELL_MATURO_K0（:4743，成熟出售口上，随 #338 接通真身，K1/K3/K4/K6/
 * K9/K10 同款）直接调用；BENKI_PLAYER_NAME（:5106-5172 四处，真身
 * ere/system/train/benki.js 的 benki_player_name()，延迟 require 防
 * 顶层漏装遮蔽，K3 的延迟 require 同款先例）。四处的前缀行是 PRINTFORMW
 * （自带换行与等待），名字与后文属新的一行，故按原作拆成两条输出（#599）。
 */
'use strict';

const era = require('#/era-electron');
const { sell_maturo_k0 } = require('#/system/stronghold/sell-maturo');
const { on, TIER } = require('#/system/event/registry');
const era_flag = require('#/era-utils/era-flag');
const { PALAMLV } = require('#/era-utils/palam-level');
const { heart, self_call } = require('#/kojo/kojo-text');
const { piercing_state } = require('#/system/train/piercing-state');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { chara_callname } = require('#/utils/callname-utils');
const {
  kojo_message_com_family,
  kojo_message_palamcng_family,
  kojo_message_markcng_family,
  self_kojo_family,
  dungeon_victory_family,
  dungeon_attack_family,
  exucution_koujo_family,
  museum_koujo_family,
  banishment_koujo_family,
  public_exucution_koujo_family,
  grotesque_koujo_family,
  enterenemy_koujo_family,
  gobi_koujo_family,
  ntr_koujo_family,
  benki_koujo_family,
} = require('#/kojo/kojo-system');
const {
  ryouzyoku_kojo_family,
  ryouzyoku_after_kojo_family,
} = require('#/kojo/kojo-dungeon-ravish');
const {
  gohoubi_after_koujo_family,
  osioski_koujo_family,
  gohoubi_request_koujo_family,
} = require('#/kojo/kojo-dungeon-after');

// @EVENTTRAIN #PRI（:67-71）：存在标志 + 总开关补 0（同 EVENT_K.ERB 语义）
on(
  'EVENTTRAIN',
  () => {
    game.kojo.口上存在_12 = 1; // FLAG:112 = 1（K12 口上存在标志）
    if (game.kojo.口上开关 === 0) {
      game.kojo.口上开关 = 2;
    }
  },
  TIER.PRI,
);

// @EVENTEND #LATER（:73-75）：调教结束清存在标志
on(
  'EVENTEND',
  () => {
    game.kojo.口上存在_12 = 0;
  },
  TIER.LATER,
);
/**
 * @EVENTTRAIN（:81-235，普通档）：调教开始时的口上。守卫（:83-85）：
 * FLAG:7 <= 0 跳过、TALENT:172 != 1 跳过；此后按 CFLAG:201 状态机推进：
 * 初调教（0，人狼分档）→ NTR 再捕获（>=1 && CFLAG:650==1）→ 屈服刻印
 * Lv1/2/3（各一次）→ 淫乱 → 爱慕 → 助手分支（ASSI<0 或无专属口上 →
 * CALL K12_KOJO2，真身 k12_kojo2）。
 */
on('EVENTTRAIN', async () => {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%

  if (game.kojo.口上开关 <= 0) {
    return 0;
  }
  if (era.get(`talent:${target}:172`) != 1) {
    return 0;
  }

  if (chara(target).kojo.初调教 == 0) {
    era.drawLine();

    if (era.get(`talent:${target}:种族`) == 2) {
      // 人狼
      await era.printAndWait(`「就表扬你一下吧。这是超出了${sc()}预想的力量」`);
      await era.printAndWait(
        `「但是没用的哦。${sc()}作为自豪的人狼、还拥有最高的智能……」`,
      );
      await era.printAndWait(
        `${target_name}虽然带着清爽的表情逞强着、但轻飘飘的耳朵害怕的低了下来。`,
      );
    } else {
      await era.printAndWait(`「看起来你比${sc()}更厉害呢」`);
      await era.printAndWait(
        `「但${sc()}可是接受过特殊训练的。不管对我做什么都是没用的」`,
      );
      await era.printAndWait(`${target_name}表情冷淡强装镇定、声音微微发颤`);
    }
    // CFLAG:201 = 1
    chara(target).kojo.初调教 = 1;
    return 1;
  } else if (
    chara(target).kojo.初调教 >= 1 &&
    chara(target).kojo.NTR再捕获 == 1
  ) {
    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {
      era.drawLine();
      await era.printAndWait(
        `「对不住了呢……在其他人的身体上做了活塞运动的确是事实呢」`,
      );
      await era.printAndWait(
        `「但是从生物学上看这并没有什么问题、只是感情上的问题哦、所以原谅我吧」`,
      );
      await era.printAndWait(`${target_name}低着头小声辩解道`);
      // NTRスイッチ解除
      chara(target).kojo.NTR再捕获 = 0;
    } else {
      era.drawLine();
      await era.printAndWait(`「又被抓住了呢……${sc()}的运气真不好」`);
      await era.printAndWait(
        `「是要继续调教我吗？　还是当成肉便器处理？　随便你吧」`,
      );
      await era.printAndWait(`${target_name}冷冷的看着你`);
      // NTRスイッチ解除
      chara(target).kojo.NTR再捕获 = 0;
    }
    return 1;
  } else if (
    chara(target).kojo.初调教 < 2 &&
    era.get(`mark:${target}:2`) == 1
  ) {
    era.drawLine();
    await era.printAndWait(`「看起来你的能力好像比资料上要高呢……」`);
    // CFLAG:201 = 2
    chara(target).kojo.初调教 = 2;
    return 1;
  } else if (
    chara(target).kojo.初调教 < 3 &&
    era.get(`mark:${target}:2`) == 2
  ) {
    era.drawLine();
    await era.printAndWait(`「你到底是……何方神圣、能把${sc()}逼到这种地步……」`);
    // CFLAG:201 = 3
    chara(target).kojo.初调教 = 3;
    return 1;
  } else if (
    chara(target).kojo.初调教 < 4 &&
    era.get(`mark:${target}:2`) == 3 &&
    era.get(`talent:${target}:85`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(
      `「难以置信……这样的情况、不管是数据还是资料上都从未见过呢！？」`,
    );
    // CFLAG:201 = 4
    chara(target).kojo.初调教 = 4;
    return 1;
  } else if (
    chara(target).kojo.初调教 < 5 &&
    era.get(`talent:${target}:76`) == 1 &&
    era.get(`talent:${target}:85`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(
      `「竟然还存在着如此美妙的新世界……让${sc()}更多地对此进行研究吧、拜托了！」`,
    );
    await era.printAndWait(
      `「想尝试一下、${sc()}的身体能淫靡化到什么地步……已经、睡不着了！」`,
    );
    await era.printAndWait(`${target_name}一边流着口水一边用腰蹭着你的腿`);
    await era.printAndWait(`她的脑海中已经填满了对性知识的渴求了……`);
    // CFLAG:201 = 5
    chara(target).kojo.初调教 = 5;
    return 1;
  } else if (
    chara(target).kojo.初调教 < 6 &&
    era.get(`talent:${target}:85`) == 1
  ) {
    era.drawLine();
    await era.printAndWait(
      `「竟然还存在着如此美妙的新世界……拜托了！　让我和你一起来研究吧」`,
    );
    await era.printAndWait(
      `「魔界的动植物和文化、魔法……全都是我还不懂的东西呢」`,
    );
    await era.printAndWait(
      `进入房间的${target_name}正专心致志地在笔记本上写着什么`,
    );
    await era.printAndWait(`完全被魔之知识迷住了的样子……`);
    // CFLAG:201 = 6
    chara(target).kojo.初调教 = 6;
    return 1;
  } else if (era_flag.assi < 0) {
    await k12_kojo2(); // CALL K12_KOJO2
  } else {
    await k12_kojo2(); // CALL K12_KOJO2（无专属助手口上，二回目以降）
  }
});

/**
 * @K12_KOJO2（:237-310）：二回目以降的调教开始口上。按反抗刻印 Lv3 /
 * 屈服刻印 Lv0-3（爱/淫乱无）/ 淫乱 / 爱慕（淫乱与爱慕各含 RAND 三选一
 * + 人狼分档）取首个命中。
 * @param {(n: number) => number} [rand] RAND:N 的随机源（缺省均匀随机）
 * @returns {Promise<number>} 0/1（调用方不读返回值，K3/K10 同款）
 */
async function k12_kojo2(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%

  if (era.get(`mark:${target}:3`) == 3 && game.kojo.口上开关 == 2) {
    era.drawLine();
    await era.printAndWait(`「不要再进入我的视线里……我很不高兴」`);
    return 1;
  } else if (era.get(`mark:${target}:2`) == 0 && game.kojo.口上开关 == 2) {
    era.drawLine();
    await era.printAndWait(
      `「根据${sc()}的计算、即使是你的力量也无法让${sc()}屈服哦」`,
    );
    return 1;
  } else if (era.get(`mark:${target}:2`) == 1 && game.kojo.口上开关 == 2) {
    era.drawLine();
    await era.printAndWait(`「不管你使出什么手段、都在我计算之中！」`);
    return 1;
  } else if (era.get(`mark:${target}:2`) == 2 && game.kojo.口上开关 == 2) {
    era.drawLine();
    await era.printAndWait(`「噫、好卑鄙……居然这样对待${sc()}……」`);
    return 1;
  } else if (
    era.get(`mark:${target}:2`) == 3 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0 &&
    game.kojo.口上开关 == 2
  ) {
    era.drawLine();
    await era.printAndWait(`「我知道了、就按你说的做……是${sc()}输了」`);
    return 1;
  } else if (era.get(`talent:${target}:76`) == 1 && game.kojo.口上开关 == 2) {
    era.drawLine();

    if (rand_n(3) == 0) {
      await era.printAndWait(`「今天要研究什么Play呢、好期待啊♪」`);
    } else if (rand_n(2) == 0) {
      await era.printAndWait(`「再多多开发${sc()}的身体嘛、还完全不够呢」`);
    } else {
      await era.printAndWait(
        `「今天也被开发了一番呢、好开心啊、真想再提升一下敏感度呢」`,
      );
    }
    if (era.get(`talent:${target}:种族`) == 2) {
      // 人狼
      await era.printAndWait(
        `${target_name}像狗一样伸出舌头，吐出慌乱的吐息迎接了出来。`,
      );
    } else {
      await era.printAndWait(
        `${target_name}从研究中的桌子旁站了起来，迎了出来。`,
      );
    }
    return 1;
  } else if (era.get(`talent:${target}:85`) == 1 && game.kojo.口上开关 == 2) {
    era.drawLine();

    if (rand_n(3) == 0) {
      await era.printAndWait(
        `「呵呵、你来了啊……正好是我研究的有些疲劳的时候呢」`,
      );
    } else if (rand_n(2) == 0) {
      await era.printAndWait(`「今天的研究进展很大。好想被表扬呢」`);
    } else {
      await era.printAndWait(
        `「啊、已经到休憩的时间了？　饶了我吧……和你做对手的话不是反而会更累吗」`,
      );
    }
    if (era.get(`talent:${target}:种族`) == 2) {
      // 人狼
      await era.printAndWait(
        `${target_name}轻飘飘的尾巴像摇出了残影一样摆动着迎了出来。`,
      );
    } else {
      await era.printAndWait(
        `${target_name}从研究中的桌子旁站了起来，迎了出来。`,
      );
    }
    return 1;
  }
  return 0;
}

/**
 * @EVENTEND（:312-399，普通档）：调教结束时的口上。死亡跳过（BASE:0<=0），
 * 随后按反抗刻印 Lv3 / 屈服刻印 Lv0-3（爱无）/ 淫乱（体力 500 上下）/
 * 爱慕（体力 500 上下）取首个命中。
 */
on('EVENTEND', async () => {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%

  if (game.kojo.口上开关 <= 0) {
    return 0;
  }
  if (era.get(`talent:${target}:172`) != 1) {
    return 0;
  }

  if (era.get(`base:${target}:0`) <= 0) {
    return 0;
  }

  if (era.get(`mark:${target}:3`) == 3 && era.get(`talent:${target}:85`) == 0) {
    era.drawLine();
    await era.printAndWait(`「真是无聊的时光呢」`);
    return 1;
  } else if (
    era.get(`mark:${target}:2`) <= 1 &&
    era.get(`talent:${target}:85`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(`「已经结束了吗、这种程度、在我的预料之内呢」`);
    return 1;
  } else if (
    era.get(`mark:${target}:2`) == 2 &&
    era.get(`talent:${target}:85`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(`「原来如此、和资料上一样呢……果然、好累」`);
    return 1;
  } else if (
    era.get(`mark:${target}:2`) == 3 &&
    era.get(`talent:${target}:85`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(`「结束了吗……体力值还挺高的嘛」`);
    return 1;
  } else if (
    era.get(`talent:${target}:76`) == 1 &&
    era.get(`base:${target}:0`) >= 500
  ) {
    era.drawLine();
    await era.printAndWait(`「怎么这样就停了、再多多开发${sc()}淫乱的身体吧」`);
    if (era.get(`talent:${target}:种族`) == 2) {
      // 人狼
      await era.printAndWait(
        `${target_name}软绵绵的耳朵立了起来，好像很不满。`,
      );
    } else {
      await era.printAndWait(`${target_name}鼓着脸颊，好像很不满。`);
    }
    return 1;
  } else if (
    era.get(`talent:${target}:76`) == 1 &&
    era.get(`base:${target}:0`) <= 500
  ) {
    era.drawLine();
    await era.printAndWait(
      `「${sc()}身体的耐久极限……差不多就是这样吗、哈～哈～」`,
    );
    if (era.get(`talent:${target}:种族`) == 2) {
      // 人狼
      await era.printAndWait(`${target_name}像狗一样伸出舌头，混乱的喘息着。`);
    } else {
      await era.printAndWait(`${target_name}就那样倒在床上，不停地喘着粗气。`);
    }
    return 1;
  } else if (
    era.get(`talent:${target}:85`) == 1 &&
    era.get(`base:${target}:0`) >= 500
  ) {
    era.drawLine();
    await era.printAndWait(`「哎呀、研究不能继续了呢。很开心哦、与你的幽会」`);
    if (era.get(`talent:${target}:种族`) == 2) {
      // 人狼
      await era.printAndWait(
        `背向这边的${target_name}软绵绵的尾巴呼噜呼噜的左右摇动着。`,
      );
    } else {
      await era.printAndWait(
        `${target_name}就那样以调教中的姿势回到了研究中的桌子旁，继续开始了工作。`,
      );
    }
    return 1;
  } else if (
    era.get(`talent:${target}:85`) == 1 &&
    era.get(`base:${target}:0`) <= 500
  ) {
    era.drawLine();
    await era.printAndWait(
      `「果然、这种程度的体力消耗、是对研究的一大障碍呢……」`,
    );
    if (era.get(`talent:${target}:种族`) == 2) {
      // 人狼
      await era.printAndWait(
        `${target_name}打了一个哈欠、用像狗一样团起来的姿势打起了瞌睡。`,
      );
    } else {
      await era.printAndWait(
        `${target_name}就那样以调教中的姿势回到了研究中的桌子旁，继续开始了工作。`,
      );
    }
    return 1;
  }
  return 0;
});

/**
 * @KOJO_MESSAGE_COM_12（:401-3537，指令口上状态机）：SELECTCOM 指令台词，
 * CFLAG:301 起的计数器（kojo.<字段>）。守卫（:402-426 与 K3/K10 顺序
 * 不同）：助手跳过守卫整行被注释（1:1 不启用，K12 助手调教不跳过）；
 * 实际生效：① TEQUIP:45 口塞（SELECTCOM!=45）→ 跳过；② TFLAG:899
 * 失神 → 跳过；③ TEQUIP:89 → DOG_KOJO_12 真身；④ TEQUIP:55 →
 * COLOSSEUM_KOJO_12 真身。无崩坏/触手守卫（源如此，1:1）。
 *
 * @param {(n: number) => number} [rand] RAND:N 的随机源（缺省均匀随机）
 * @returns {Promise<number>} 0（TRYCALLFORM 不读返回值）
 */
async function kojo_message_com_12(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const player = era_flag.player;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const kojo = chara(target).kojo;
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%
  const mark = (i) => era.get(`mark:${target}:${i}`) || 0;
  // %阴核(TARGET)%（魔改新增/文本校正.ERB @阴核，K0 kojo-k0-tender.js:5484 同款）：
  // TALENT:122 则「阴茎」否则「阴核」
  const clitoris_word = (cid) =>
    (era.get(`talent:${cid}:122`) || 0) !== 0 ? '阴茎' : '阴核';

  // 助手跳过守卫整行注释（1:1 不启用）
  if (era.get(`tequip:${target}:45`) && era_flag.selectcom != 45) {
    return 0;
  }

  if (game.train.失神) {
    return 0;
  }

  if (era.get(`tequip:${target}:89`)) {
    await dog_kojo_12(rand_n); // CALL DOG_KOJO_12（真身）
    return 0;
  }

  if (era.get(`tequip:${target}:55`)) {
    await colosseum_kojo_12(rand_n); // CALL COLOSSEUM_KOJO_12（真身）
    return 0;
  }

  if (era_flag.selectcom == 0) {
    if (kojo.爱抚 == 0) {
      if (mark(2) >= 2) {
        await era.printAndWait(
          `「你知道这个理论吗？　一开始要先抚摸女性的肌肤呢」`,
        );
      } else {
        await era.printAndWait(`「哼、真无聊呢。跟教科书一样的步骤呢」`);
      }
      // CFLAG:301 = 1
      kojo.爱抚 = 1;
      return 0;
    } else if (
      era.get(`talent:${target}:153`) &&
      chara(target).event.孩子父亲 == 0
    ) {
      // 怀孕（主人之子，CFLAG:111==0）特例
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「孩子还在里面看着呢。还请温柔点哦」`);
        if (era.get(`talent:${target}:种族`) == 2) {
          // 人狼
          await era.printAndWait(
            `「如果是像${sc()}一样活泼可爱的孩子就好啦♪」`,
          );
        }
        // CFLAG:301 = 6
        kojo.爱抚 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「又长大了呢、好想快点生下来啊♪」`);
        if (era.get(`talent:${target}:种族`) == 2) {
          // 人狼
          await era.printAndWait(
            `「嗯……就这么抚摸${sc()}的头。叨着『谢谢你怀上孩子哦』」`,
          );
        } else {
          await era.printAndWait(
            `「嗯……${sc()}好想多做做脚部按摩啊。挺着大肚子可累了」`,
          );
        }
        // CFLAG:301 = 5
        kojo.爱抚 = 5;
      } else if (mark(2) == 3 && (kojo.爱抚 <= 3 || game.kojo.口上开关 == 2)) {
        await era.printAndWait(
          `「老用这种方式来抚摸、要忍受这种待遇的……可是你的孩子啊。就不能更小心翼翼一些吗？」`,
        );
        // CFLAG:301 = 4
        kojo.爱抚 = 4;
      } else if (mark(2) == 2 && (kojo.爱抚 <= 2 || game.kojo.口上开关 == 2)) {
        await era.printAndWait(`「嗯、咕……别、别摸了啦……」`);
        // CFLAG:301 = 3
        kojo.爱抚 = 3;
      } else if (mark(2) <= 1 && (kojo.爱抚 <= 1 || game.kojo.口上开关 == 2)) {
        await era.printAndWait(`「就算怀上了你的孩子……也别想让${sc()}动心」`);
        // CFLAG:301 = 2
        kojo.爱抚 = 2;
      }
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「不要再挑逗我了……明明知道单是这样子已经无法满足我了」`,
        );
        if (era.get(`talent:${target}:种族`) == 2) {
          // 人狼
          await era.printAndWait(
            `「知道${sc()}感觉舒服的地方吗？　想让你抚摸喉咙呢♪」`,
          );
        }
        // CFLAG:301 = 6
        kojo.爱抚 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「最近很疲劳呢。谢谢你为我按摩」`);
        if (era.get(`talent:${target}:种族`) == 2) {
          // 人狼
          await era.printAndWait(
            `「嗯……多按摩一下${sc()}的脚吧。散步有些累了」`,
          );
        } else {
          await era.printAndWait(
            `「嗯……多按摩一下${sc()}的腰吧。在桌子边坐得有些累了」`,
          );
        }
        // CFLAG:301 = 5
        kojo.爱抚 = 5;
      } else if (mark(2) == 3 && (kojo.爱抚 <= 3 || game.kojo.口上开关 == 2)) {
        await era.printAndWait(
          `「只是被你的手摸着、就想向你屈服了呢……看来${sc()}的计算错误了呢」`,
        );
        // CFLAG:301 = 4
        kojo.爱抚 = 4;
      } else if (mark(2) == 2 && (kojo.爱抚 <= 2 || game.kojo.口上开关 == 2)) {
        await era.printAndWait(`「嗯、唔～……继、继续吧……」`);
        // CFLAG:301 = 3
        kojo.爱抚 = 3;
      } else if (mark(2) <= 1 && (kojo.爱抚 <= 1 || game.kojo.口上开关 == 2)) {
        await era.printAndWait(
          `「这种程度全在预料之中呢。${sc()}的心是不会动摇的」`,
        );
        // CFLAG:301 = 2
        kojo.爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 1) {
    if (kojo.舔阴 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        await era.printAndWait(`「哼、性器没被男人碰过真是对不住呢……」`);
      } else {
        await era.printAndWait(
          `「喂、不要舔性器！　再怎么说那也是排泄器官！」`,
        );
      }
      // CFLAG:302 = 1
      kojo.舔阴 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.舔阴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「再用力点吸吸淫核……呵呵、勃起来了吧？」`);
        // CFLAG:302 = 5
        kojo.舔阴 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.舔阴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「我可以一边看书吗？　这样会轻松点……」`);
        // CFLAG:302 = 4
        kojo.舔阴 = 4;
      } else if (mark(2) == 3 && (kojo.舔阴 <= 2 || game.kojo.口上开关 == 2)) {
        await era.printAndWait(
          `「喜欢的话就随便舔吧。${sc()}已经不会再反抗了……」`,
        );
        // CFLAG:302 = 3
        kojo.舔阴 = 3;
      } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「住、住手！　那里的粘膜很敏感啊！」`);
        // CFLAG:302 = 2
        kojo.舔阴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 2) {
    if (kojo.肛门爱抚 == 0) {
      await era.printAndWait(`「这是在做肛交的准备吗、变态」`);
      // CFLAG:TARGET:303 = 1
      kojo.肛门爱抚 = 1;
      return 0;
    } else {
      const P =
        (era.get(`palam:${target}:3`) || 0) +
        (era.get(`delta:${target}:3`) || 0); // PALAM:3 + UP:3

      if (
        era.get(`talent:${target}:76`) == 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊～、已经做好肛交的准备了哦！　排泄……不、已经变成性器啦♪」`,
        );
        // CFLAG:303 = 7
        kojo.肛门爱抚 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        P < PALAMLV[2] &&
        (kojo.肛门爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「抱歉、还很紧……最好、再润滑一下呢」`);
        // CFLAG:303 = 6
        kojo.肛门爱抚 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「怎么样、${sc()}的第二性器……这样一来就能肛交了呢♪」`,
        );
        // CFLAG:303 = 5
        kojo.肛门爱抚 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        P < PALAMLV[2] &&
        (kojo.肛门爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「你、能让我再湿一点吗……里面还没放松下来呢」`);
        // CFLAG:303 = 4
        kojo.肛门爱抚 = 4;
      } else if (
        P >= PALAMLV[2] &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛门爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「咕呜～、不行啊……这么湿漉漉下去的话……性器、会变成性器的啊……」`,
        );
        // CFLAG:303 = 3
        kojo.肛门爱抚 = 3;
      } else if (kojo.首次耻情Lv2 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「不管再怎么玩弄排泄器官、都不会有什么快感的」`,
        );
        // CFLAG:303 = 2
        kojo.肛门爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 3) {
    if (kojo.自慰 == 0) {
      await era.printAndWait(`「自慰什么的谁都有过吧。诶、让${sc()}来……」`);
      // CFLAG:TARGET:304  = 1（变量语义：CFLAG 族，TARGET:304）
      kojo.自慰 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:0`) == 1 &&
        (kojo.自慰 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「没有被男人碰过的这个小穴、会疼也是没办法的……什么时候都可以给你哦」`,
        );
        // CFLAG:304  = 9（变量语义：CFLAG 族，304）
        kojo.自慰 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:31`) >= 3 &&
        (kojo.自慰 <= 7 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(4) == 0) {
          await era.printAndWait(
            `「${sc()}的痴态、没有被记录下来吗……？　想作为下次自慰的参考呢」`,
          );
        } else if (rand_n(3) == 0) {
          await era.printAndWait(
            `「猴子……要变成猴子了！　变成自慰猴子了啊！」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「看吧……像猴子一样玩弄${clitoris_word(target)}的${sc()}的姿态……！」`,
          );
        } else {
          await era.printAndWait(
            `「啊～、啊～、去了、去了、去了……像猴子一样揉着阴部去了啊」`,
          );
        }
        // CFLAG:304  = 8（变量语义：CFLAG 族，304）
        kojo.自慰 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:31`) < 3 &&
        (kojo.自慰 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「${sc()}对自慰已经很擅长了！」`);
        } else {
          await era.printAndWait(`「这个身体已经快要研究透了呢」`);
        }
        // CFLAG:304  = 7（变量语义：CFLAG 族，304）
        kojo.自慰 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`talent:${target}:0`) == 1 &&
        (kojo.自慰 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「请看、想吞下你阴茎的性器躁动得没办法了呢」`);
        // CFLAG:304  = 6（变量语义：CFLAG 族，304）
        kojo.自慰 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:31`) >= 3 &&
        (kojo.自慰 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「来吧……拜托了、都一边自慰一边求你了啊」`);
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「因为实在太想你了、${clitoris_word(target)}好像都快磨破了呢」`,
          );
        } else {
          await era.printAndWait(
            `「已经习惯了呢、${clitoris_word(target)}已经元气十足地勃起来了哦」`,
          );
        }
        // CFLAG:304  = 5（变量语义：CFLAG 族，304）
        kojo.自慰 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:31`) < 3 &&
        (kojo.自慰 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「自慰什么的很正常啊。研究的间隙也会想去做呢」`,
          );
        } else {
          await era.printAndWait(`「嘿欸、你还有这样的癖好呢」`);
        }
        // CFLAG:304  = 4（变量语义：CFLAG 族，304）
        kojo.自慰 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:31`) >= 1 &&
        (kojo.自慰 <= 2 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「啊～、啊～……好爽～……」`);
        } else {
          await era.printAndWait(
            `「自慰过度${clitoris_word(target)}可能会肥大化的……」`,
          );
        }
        // CFLAG:304  = 3（变量语义：CFLAG 族，304）
        kojo.自慰 = 3;
      } else if (kojo.自慰 <= 1 || game.kojo.口上开关 == 2) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「无意义的行为呢……白白浪费脑细胞」`);
        } else {
          await era.printAndWait(`「没有收益的行为呢、没有意义」`);
        }
        // CFLAG:304  = 2（变量语义：CFLAG 族，304）
        kojo.自慰 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 5) {
    if (kojo.胸爱抚 == 0) {
      if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「这么喜欢胸部……你是小孩子吗」`);
      } else {
        await era.printAndWait(`「一般意义上说乳头并不是性感带哦」`);
      }
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306）
      kojo.胸爱抚 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「连胸部也成性器了你打算怎么样嘛♪」`);
        } else {
          await era.printAndWait(`「呵呵、发生幼儿退化现象了吗……？」`);
        }
        // CFLAG:306  = 5（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「胸部已经完全被开发好了呢。都是你的错呢」`);
        } else {
          await era.printAndWait(`「这就是、母性萌发的现象吗……」`);
        }
        // CFLAG:306  = 4（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 4;
      } else if (
        era.get(`abl:${target}:1`) >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「胸部……乳头好有感觉啊～！」`);
        // CFLAG:306  = 3（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 3;
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「果然呢、胸部一点感觉都没有」`);
        // CFLAG:306  = 2（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 6) {
    if (kojo.接吻 == 0 && game.train.初吻与自我口上) {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era_flag.assiplay == 0 &&
        era.get(`tequip:${target}:89`) == 0 &&
        era.get(`tequip:${target}:90`) == 0
      ) {
        await era.printAndWait(
          `「初吻什么的、感伤的感情是不必要的……不过还不错」`,
        );
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era_flag.assiplay == 0 &&
        era.get(`tequip:${target}:89`) == 0 &&
        era.get(`tequip:${target}:90`) == 0
      ) {
        await era.printAndWait(`「今天是和你的纪念日呢♪」`);
      } else {
        await era.printAndWait(`「初吻什么的、带上感情是无意义的」`);
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      kojo.接吻 = 1;
      return 0;
    } else if (kojo.接吻 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「通过唾液交换来做性爱的相性确认……你合格了哦♪」`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「终于可以和你做唾液交换了呢♪」`);
      } else {
        await era.printAndWait(`「既没有气氛也没有技巧……0分呢」`);
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      kojo.接吻 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.接吻 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「更多的交换唾液吧……你的体液、想要更多」`);
        if (era.get(`talent:${target}:种族`) == 2) {
          await era.printAndWait(
            `${target_name}虽然闭着眼、但耳朵却立了起来bikobiko的动着。`,
          );
        }
        // CFLAG:307  = 5（变量语义：CFLAG 族，307）
        kojo.接吻 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.接吻 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「把你的全部……都给${sc()}吧」`);
        if (era.get(`talent:${target}:种族`) == 2) {
          await era.printAndWait(
            `${target_name}虽然闭着眼、但耳朵却立了起来bikobiko的动着。`,
          );
        }
        // CFLAG:307  = 4（变量语义：CFLAG 族，307）
        kojo.接吻 = 4;
      } else if (
        era.get(`abl:${target}:10`) >= 2 &&
        (kojo.接吻 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「好吧、体液交换这种程度的事情没有问题」`);
        // CFLAG:307  = 3（变量语义：CFLAG 族，307）
        kojo.接吻 = 3;
      } else if (kojo.接吻 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「呜～……你、在磨牙吗？」`);
        // CFLAG:307  = 2（变量语义：CFLAG 族，307）
        kojo.接吻 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 7) {
    if (kojo.自己扒开 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「${sc()}的大受欢迎的地方、想被更多的看着呢♪」`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「不对${sc()}的重要的地方、来个素描吗？」`);
      } else {
        await era.printAndWait(`「唔～、做出如此羞人的姿势什么的……」`);
      }
      // CFLAG:TARGET:308  = 1（变量语义：CFLAG 族，TARGET:308）
      kojo.自己扒开 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.自己扒开 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「怎么样、${sc()}性器的开发情况……♪　想让阴核变的多大呢？」`,
        );
        // CFLAG:308  = 5（变量语义：CFLAG 族，308）
        kojo.自己扒开 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.自己扒开 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「今天也做了记录呢。来展示一下${sc()}的性器发生了什么样的变化吧」`,
        );
        // CFLAG:308  = 4（变量语义：CFLAG 族，308）
        kojo.自己扒开 = 4;
      } else if (
        era.get(`abl:${target}:17`) >= 3 &&
        (kojo.自己扒开 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「唔……这可真是、羞耻心都被引出来了……呐」`);
        // CFLAG:308  = 3（变量语义：CFLAG 族，308）
        kojo.自己扒开 = 3;
      } else if (kojo.自己扒开 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「被迫作出这种屈辱的姿势……但${sc()}不得不屈服呢」`,
        );
        // CFLAG:308  = 2（变量语义：CFLAG 族，308）
        kojo.自己扒开 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 8) {
    if (kojo.插入手指 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「你的指功究竟如何呢？　很期待呢」`);
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`talent:${target}:85`) == 1
      ) {
        await era.printAndWait(`「想通过你的手、来做个彻底的放松呢」`);
      } else {
        await era.printAndWait(`「手指伸进去的地方……只会感到恶心呢」`);
      }
      // CFLAG:TARGET:309  = 1（变量语义：CFLAG 族，TARGET:309）
      kojo.插入手指 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.插入手指 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「里面想更多地被来回搅动呢、呼～……咕～、真不错呢」`,
        );
        // CFLAG:309  = 5（变量语义：CFLAG 族，309）
        kojo.插入手指 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.插入手指 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「你的手……体贴入微的、一直在${sc()}很舒服的地方进攻着呢……♪」`,
        );
        // CFLAG:309  = 4（变量语义：CFLAG 族，309）
        kojo.插入手指 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.插入手指 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「咕～……阴道、起反应了……」`);
        // CFLAG:309  = 3（变量语义：CFLAG 族，309）
        kojo.插入手指 = 3;
      } else if (kojo.插入手指 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「额……好恶心……」`);
        // CFLAG:309  = 2（变量语义：CFLAG 族，309）
        kojo.插入手指 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 9) {
    if (kojo.舔肛 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「想舔排泄器官吗……真是变态♪」`);
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「那个地方细菌很多呢……真的可以吗」`);
      } else {
        await era.printAndWait(`「呀啊啊、住手！！」`);
      }
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310）
      kojo.舔肛 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「${sc()}的肛门、被竖着分开了呢……？　想被更多的好好舔舐呢♪」`,
        );
        // CFLAG:310  = 5（变量语义：CFLAG 族，310）
        kojo.舔肛 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.舔肛 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「被舔着排泄器官……也还不坏嘛♪」`);
        // CFLAG:310  = 4（变量语义：CFLAG 族，310）
        kojo.舔肛 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.舔肛 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「咕～、随便你吧……要舔排泄器官也行……嗯啊～」`);
        // CFLAG:310  = 3（变量语义：CFLAG 族，310）
        kojo.舔肛 = 3;
      } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「尽做些傻事呢……嗯～」`);
        // CFLAG:310  = 2（变量语义：CFLAG 族，310）
        kojo.舔肛 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 10) {
    if (kojo.振动宝石 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「有趣的道具呢、快点使用吧♪」`);
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`talent:${target}:85`) == 1
      ) {
        await era.printAndWait(`「这道具还挺有意思的呢……真的」`);
      } else {
        await era.printAndWait(`「这、这嗡嗡震动的玩意儿是什么啊！？」`);
      }
      // CFLAG:TARGET:311  = 1（变量语义：CFLAG 族，TARGET:311）
      kojo.振动宝石 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.振动宝石 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊啊啊……淫核好麻……不错嘛、这个～」`);
        // CFLAG:311  = 5（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.振动宝石 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呼～……咕～、身体……放松下来了呢」`);
        // CFLAG:311  = 4（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.振动宝石 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「道具的性能已经清楚了……但是、可以不把这个按在阴核上吗」`,
        );
        // CFLAG:311  = 3（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 3;
      } else if (kojo.振动宝石 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「跟往常一样……嗡嗡的震动着呢。真想看看开发者是长什么样的呢」`,
        );
        // CFLAG:311  = 2（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 11 && era.get(`tequip:${target}:11`)) {
    if (kojo.壶虫 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「原来如此、将寄生虫家畜化吗。有意思……对于献出处女来说是个不错的研究对象呢♪」`,
          );
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「比起这种寄生虫变异体来说、还是更想被你夺走处女呢」`,
          );
        } else {
          await era.printAndWait(
            `「呜～、寄生虫的变异体吗……哼、才不可惜处女什么的呢……」`,
          );
          await era.printAndWait(
            `虽然嘴上这么说着、${target_name}的腰还是颤抖不已`,
          );
        }
      } else {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「原来如此、将寄生虫家畜化吗。有意思……真想快点放进阴道品尝一下滋味呢♪」`,
          );
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「寄生虫的变异体吗。交给我吧。用${sc()}的阴道来试试看吧」`,
          );
        } else {
          await era.printAndWait(`「呜～、寄生虫的变异体吗……无耻！」`);
        }
      }
      // CFLAG:312  = 1（变量语义：CFLAG 族，312）
      kojo.壶虫 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.壶虫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (era.get(`talent:${target}:190`) == 1) {
          await era.printAndWait(
            `「这就是壶虫的寄生状态吗……嗯～、每次产卵、都会摩擦阴道……♪　要对这个着迷了呢」`,
          );
        } else {
          await era.printAndWait(
            `「确认壶虫已进入……嗯～、摩擦着阴道……好舒服♪」`,
          );
        }
        // CFLAG:312  = 5（变量语义：CFLAG 族，312）
        kojo.壶虫 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.壶虫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (era.get(`talent:${target}:190`) == 1) {
          await era.printAndWait(
            `「壶虫寄生状态有影响敏感度的效果……嗯～、真有意思」`,
          );
        } else {
          await era.printAndWait(`「壶虫的触手吗……都伸到子宫口了呢……嗯～」`);
        }
        // CFLAG:312  = 4（变量语义：CFLAG 族，312）
        kojo.壶虫 = 4;
      } else if (
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.壶虫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「区区寄生生物、${sc()}是不会输的。被这种下等生物……」`,
        );
        // CFLAG:312  = 3（变量语义：CFLAG 族，312）
        kojo.壶虫 = 3;
      } else if (kojo.壶虫 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「你不借助这种下等生物之手就不行吗？」`);
        // CFLAG:312  = 2（变量语义：CFLAG 族，312）
        kojo.壶虫 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 11 && era.get(`tequip:${target}:11`) == 0) {
    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.壶虫着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「实验已经结束了吗？　再多蹂躙一会儿也可以哦」`);
      // CFLAG:372  = 3（变量语义：CFLAG 族，372）
      kojo.壶虫着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.壶虫着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「……真有意思呢。下次再研究看看吧」`);
      // CFLAG:372  = 2（变量语义：CFLAG 族，372）
      kojo.壶虫着脱 = 2;
    } else if (kojo.壶虫着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「……快点把这恶心的寄生生物丢回培养槽里去啊～」`);
      // CFLAG:372  = 1（变量语义：CFLAG 族，372）
      kojo.壶虫着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 12) {
    if (kojo.振动杖 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「有趣的道具呢！　动力有多少？」`);
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「这个是……什么用途的道具呢？　淫具……吗？」`);
      } else {
        await era.printAndWait(`「哼、拿着这种道具到底意欲何为？」`);
      }
      // CFLAG:313  = 1（变量语义：CFLAG 族，313）
      kojo.振动杖 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.振动杖 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊啊啊……好棒、发麻了……下次借给我吧……♪」`);
        // CFLAG:313  = 5（变量语义：CFLAG 族，313）
        kojo.振动杖 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.振动杖 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「研究疲劳的时候使用……有不错的保健效果呢」`);
        // CFLAG:313  = 4（变量语义：CFLAG 族，313）
        kojo.振动杖 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.振动杖 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「咕～、机械的振动……一直传到腰骨上了……嗯」`);
        // CFLAG:313  = 3（变量语义：CFLAG 族，313）
        kojo.振动杖 = 3;
      } else if (kojo.振动杖 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「这种程度的、脑内物质分泌……对我没有效果呢……嗯」`,
        );
        // CFLAG:313  = 2（变量语义：CFLAG 族，313）
        kojo.振动杖 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 13 && era.get(`tequip:${target}:13`)) {
    if (kojo.肛门虫 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「好大的寄生虫呢……难道说、要把这个放进去？　好期待呢♪」`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「在肠内生活的寄生虫吗……有意思的生物」`);
      } else {
        await era.printAndWait(
          `「原始的寄生虫吗……哼、据说体液有催淫作用呢……」`,
        );
      }
      // CFLAG:TARGET:314  = 1（变量语义：CFLAG 族，TARGET:314）
      kojo.肛门虫 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「咕呜～、直肠…･･･被钻进去了～。停、停不下来了……♪」`,
        );
        // CFLAG:314  = 6（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.肛门虫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「在直肠内运动着呢……据说有催淫作用、快点生效吧」`,
        );
        // CFLAG:314  = 6（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「被这样的、下等生物……挖掘着直肠、有感觉了……嗯♪」`,
        );
        // CFLAG:314  = 5（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.肛门虫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「这样很难有感觉呢……不过据说寄生虫对健康有益」`,
        );
        // CFLAG:314  = 4（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「这、这种下等生物……嗯」`);
        // CFLAG:314  = 3（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 3;
      } else if (kojo.肛门虫 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「好恶心的寄生虫……就好像你一样」`);
        // CFLAG:314  = 2（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 13 && era.get(`tequip:${target}:13`) == 0) {
    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.肛门虫着脱 < 4 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「肛门括约筋变的松弛下来了呢……♪　还想被继续开发呢」`,
      );
      // CFLAG:374  = 4（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 4;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.肛门虫着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「异物感不见了、有点寂寞呢」`);
      // CFLAG:374  = 3（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 3;
    } else if (
      era.get(`abl:${target}:3`) >= 3 &&
      (kojo.肛门虫着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「咕呜～、肛门括约筋……麻麻的～……」`);
      // CFLAG:374  = 2（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 2;
    } else if (kojo.肛门虫着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「哈啊～……真是恶心的生物……」`);
      // CFLAG:374  = 1（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 19 && era.get(`tequip:${target}:19`)) {
    if (kojo.肛珠 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「要把这个全部放进去吗？　好期待呢」`);
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「一个一个的好好放进去哦」`);
      } else {
        await era.printAndWait(`「这样变态的器具……难以理解呢」`);
      }
      // CFLAG:TARGET:320  = 1（变量语义：CFLAG 族，TARGET:320）
      kojo.肛珠 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯～……一个接一个的、放进去了呢……好期待拔出来的时候呢」`,
        );
        if (era.get(`talent:${target}:种族`) == 2) {
          await era.printAndWait(
            `${target_name}的屁股后面、另一条下流的尾巴摇动着。`,
          );
        }
        // CFLAG:320  = 7（变量语义：CFLAG 族，320）
        kojo.肛珠 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.肛珠 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「这可真是……有趣的道具呢。肚子里面塞得满满的呢」`,
        );
        // CFLAG:320  = 6（变量语义：CFLAG 族，320）
        kojo.肛珠 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呼呜～…哈啊～、全、全部放进去了吧？　想被一口气拔出来呢」`,
        );
        if (era.get(`talent:${target}:种族`) == 2) {
          await era.printAndWait(
            `${target_name}的屁股后面、另一条下流的尾巴摇动着。`,
          );
        }
        // CFLAG:320  = 5（变量语义：CFLAG 族，320）
        kojo.肛珠 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.肛珠 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「想一个一个地被你的手放进去呢」`);
        // CFLAG:320  = 4（变量语义：CFLAG 族，320）
        kojo.肛珠 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯～、咕～……哈啊～、肛、肛门……」`);
        // CFLAG:320  = 3（变量语义：CFLAG 族，320）
        kojo.肛珠 = 3;
      } else if (kojo.肛珠 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「对这样的器具拿出干劲什么的……做不到呢」`);
        // CFLAG:320  = 2（变量语义：CFLAG 族，320）
        kojo.肛珠 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 19 && era.get(`tequip:${target}:19`) == 0) {
    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.肛珠着脱 < 4 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「嗯哈啊～♪　这个、太棒了……♪　滑溜溜的拔出来了～」`,
      );
      // CFLAG:379  = 4（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 4;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.肛珠着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「拔出来了……总觉得、好像在产卵呢」`);
      // CFLAG:379  = 3（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 3;
    } else if (
      era.get(`abl:${target}:3`) >= 3 &&
      (kojo.肛珠着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「嗯～……咕～、哈啊～、哈啊～……」`);
      // CFLAG:379  = 2（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 2;
    } else if (kojo.肛珠着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「结束了吗……？　只感到难受呢」`);
      // CFLAG:379  = 1（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 20) {
    if (kojo.正常位 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「这个我知道、是叫做深度授精式吧？　请让我头一次的受精吧」`,
          );
        } else if (
          era.get(`talent:${target}:85`) == 1 &&
          era.get(`abl:${target}:10`) >= 5
        ) {
          await era.printAndWait(`「能把处女献给你……${sc()}觉得好光荣」`);
        } else {
          await era.printAndWait(
            `「只是粘膜被弄破了而已……在生物学意义上、什么变化都算不上」`,
          );
        }
      } else {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「这个我知道、是叫做深度授精式吧？　请让我受精吧」`,
          );
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「因为怀孕而产生的母体变化……想试试看呢」`);
        } else {
          await era.printAndWait(`「只有怀孕……只有怀孕千万不要啊！」`);
        }
      }
      // CFLAG:321  = 1（变量语义：CFLAG 族，321）
      kojo.正常位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.正常位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「想被你弄怀孕呢……子宫已经躁动的不得了了呢」`);
        // CFLAG:321  = 6（变量语义：CFLAG 族，321）
        kojo.正常位 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.正常位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「想怀上和你的孩子呢……把大量的精子射进来吧」`);
        // CFLAG:321  = 5（变量语义：CFLAG 族，321）
        kojo.正常位 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.正常位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「感、感觉到了……子宫在期盼着受精……？　难以置信……」`,
        );
        // CFLAG:321  = 4（变量语义：CFLAG 族，321）
        kojo.正常位 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.正常位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「我知道了……${sc()}的身体、随便你怎么使用吧」`);
        // CFLAG:321  = 3（变量语义：CFLAG 族，321）
        kojo.正常位 = 3;
      } else if (kojo.正常位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「住、住手……敢在${sc()}的身体里射精可饶不了你哦！」`,
        );
        // CFLAG:321  = 2（变量语义：CFLAG 族，321）
        kojo.正常位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 21) {
    if (kojo.背后位 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        if (era.get(`talent:${target}:76`) == 1) {
          if (era.get(`talent:${target}:种族`) == 2) {
            await era.printAndWait(
              `「这是适合野兽的姿态呢、不觉得有些变态吗？」`,
            );
          } else {
            await era.printAndWait(
              `「好像野生动物似的呢……这样的第一次、不觉得太过变态了吗？」`,
            );
          }
        } else if (era.get(`talent:${target}:85`) == 1) {
          if (era.get(`talent:${target}:种族`) == 2) {
            await era.printAndWait(
              `「这是适合野兽的姿态呢……那么就这样让我怀孕吧♪」`,
            );
          } else {
            await era.printAndWait(
              `「第一次就是这种野蛮的体位吗……那么就这样让我怀孕吧♪」`,
            );
          }
        } else {
          await era.printAndWait(`「屈辱啊……咕呜、屈辱啊！」`);
        }
      } else {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「好像野生动物似的呢、你喜欢这样吗？」`);
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「这是很适合受孕的体位呢」`);
        } else {
          await era.printAndWait(`「真野蛮……跟你真配呢」`);
        }
      }
      // CFLAG:322  = 1（变量语义：CFLAG 族，322）
      kojo.背后位 = 1;
      return 0;
    } else if (era.get(`talent:${target}:153`) == 1) {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「原来还有会给怀孕的雌性授精的雄性呢……♪」`);
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「居然连孕妇都上……这样不合理的事、难道是你的兴趣吗……？　真是太棒啦……♪」`,
          );
        } else {
          await era.printAndWait(
            `「再更用力地操我啊……让肚子里孩子也一起感受一下吧♪」`,
          );
        }
        if (era.get(`talent:${target}:种族`) == 2) {
          await era.printAndWait(
            `${target_name}完全抛弃了狼人的的自尊心、沦为一头纯粹的母兽了。`,
          );
        }
        // CFLAG:322  = 6（变量语义：CFLAG 族，322）
        kojo.背后位 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.背后位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「这样如同动物一般的做爱、就算怀孕也不奇怪啦♪」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「把你的精液……射在……肚子里……孩子的身上吧！」`,
          );
        } else {
          await era.printAndWait(
            `「这么色情的体位、还真有点不想让里面的孩子看到呢♪」`,
          );
        }
        if (era.get(`talent:${target}:种族`) == 2) {
          await era.printAndWait(
            `${target_name}抛弃了狼人的的自尊心、沦为一头发情的母兽了。`,
          );
        }
        // CFLAG:322  = 5（变量语义：CFLAG 族，322）
        kojo.背后位 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜呜呜……肚子里……鸡巴……在乱撞啊……嗯啊」`);
        // CFLAG:322  = 4（变量语义：CFLAG 族，322）
        kojo.背后位 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「太耻辱了……竟然完全无法抵抗什么的……」`);
        // CFLAG:322  = 3（变量语义：CFLAG 族，322）
        kojo.背后位 = 3;
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「可恶……竟然用这种野蛮下等的体位……」`);

        // CFLAG:322  = 2（变量语义：CFLAG 族，322）
        kojo.背后位 = 2;
      }
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「现在这个瞬间、只剩下雄性和雌性了哦……♪」`);
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「这种野生动物般的体位、是你的癖好吗……？　好棒……♪」`,
          );
        } else {
          await era.printAndWait(`「再使劲点撞我的腰……让屁股肉也跳动起来吧♪」`);
        }
        if (era.get(`talent:${target}:种族`) == 2) {
          await era.printAndWait(
            `${target_name}已经舍弃了人狼的自豪，完全变成了一匹雌性。`,
          );
        }
        // CFLAG:322  = 6（变量语义：CFLAG 族，322）
        kojo.背后位 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.背后位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「这般像动物似的做爱、绝对会怀……怀孕的♪」`);
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「让我确实的受孕吧……用你的精液！」`);
        } else {
          await era.printAndWait(`「就决定用这种下流的体位来受孕吧♪」`);
        }
        if (era.get(`talent:${target}:种族`) == 2) {
          await era.printAndWait(
            `${target_name}已经舍弃了人狼的自豪、变成了为了怀孕而发情的雌性了。`,
          );
        }
        // CFLAG:322  = 5（变量语义：CFLAG 族，322）
        kojo.背后位 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜呜～……阴茎……在里面……嘎吱嘎吱地……嗯啊～」`);
        // CFLAG:322  = 4（变量语义：CFLAG 族，322）
        kojo.背后位 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「屈辱啊……什么也做不了……」`);
        // CFLAG:322  = 3（变量语义：CFLAG 族，322）
        kojo.背后位 = 3;
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「好恨啊……被这种野蛮下流的体位……」`);

        // CFLAG:322  = 2（变量语义：CFLAG 族，322）
        kojo.背后位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 22) {
    if (kojo.对面座位 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「亲个嘴吧……作为第一次的纪念呢♪」`);
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「要成为女人了呢……想被你紧紧的抱住呢」`);
        } else {
          await era.printAndWait(`「咕呜～……处女膜没了……才没什么感想呢」`);
        }
      } else {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「一边亲吻一边缠在一起……真不错呢」`);
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「真想记下受精瞬间的${sc()}的脸呢」`);
        } else {
          await era.printAndWait(`「咕呜～……不要抱得这么紧……」`);
        }
      }
      // CFLAG:323  = 1（变量语义：CFLAG 族，323）
      kojo.对面座位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.对面座位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「被抱在你的怀里……感觉还不坏」`);
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「看到高潮脸了吗、因为你的突刺而喜悦的${sc()}的脸」`,
          );
        } else {
          await era.printAndWait(`「嗯～……啊啊～……深深的、插我啊♪」`);
        }
        // CFLAG:323  = 6（变量语义：CFLAG 族，323）
        kojo.对面座位 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.对面座位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「受精了……啊啊、被你抱着受精了啊」`);
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「子宫……降下来了。因为想要你的精液、一颤一颤的呢」`,
          );
        } else {
          await era.printAndWait(
            `「求你了、射精吧！　在${sc()}的里面把精液射出来吧！」`,
          );
        }
        // CFLAG:323  = 5（变量语义：CFLAG 族，323）
        kojo.对面座位 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.对面座位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「咕呜……这种、感觉……不对」`);
        // CFLAG:323  = 4（变量语义：CFLAG 族，323）
        kojo.对面座位 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.对面座位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「服从你了吗……子宫也随你使唤了」`);
        // CFLAG:323  = 3（变量语义：CFLAG 族，323）
        kojo.对面座位 = 3;
      } else if (kojo.对面座位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「咕呜……这样子……什么感觉、也没有。那是汗……好恶心」`,
        );
        // CFLAG:323  = 2（变量语义：CFLAG 族，323）
        kojo.对面座位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 23) {
    if (kojo.背面座位 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「有镜子的话真想看一看呢……${sc()}失去处女的瞬间……」`,
          );
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「拜托了这样可看不到你的脸啊……一定、会哭出来的」`,
          );
        } else {
          await era.printAndWait(
            `「咕呜～……处女膜就这样没了……才没有什么感想呢」`,
          );
        }
      } else {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「从背后抱着吗？　好像变成小孩子了呢……」`);
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「被从背后抱住了呢、要在受精的瞬间好好接住呢……」`,
          );
        } else {
          await era.printAndWait(`「咕呜～……不要我耳边说悄悄话……」`);
        }
      }
      // CFLAG:324  = 1（变量语义：CFLAG 族，324）
      kojo.背面座位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.背面座位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「感觉到了……你胸部的呼吸、从背后传过来……」`);
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「嗯～、哈啊……好深……感觉到了哦、你的蠢动……」`,
          );
        } else {
          await era.printAndWait(
            `「这可真是上乘的椅子呢……嗯～、坐起来的感觉、最棒了……！」`,
          );
        }
        // CFLAG:324  = 6（变量语义：CFLAG 族，324）
        kojo.背面座位 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.背面座位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「嗯啊啊啊啊～！　绝对、会受精的♪」`);
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「要、要死了……你、太激烈了……」`);
        } else {
          await era.printAndWait(
            `「好深……在这个深处、送出来吧……让我怀上孩子吧……欸」`,
          );
        }
        // CFLAG:324  = 5（变量语义：CFLAG 族，324）
        kojo.背面座位 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.背面座位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯～……嗯啊～、感、感觉到了……灼热的、情欲……」`,
        );
        // CFLAG:324  = 4（变量语义：CFLAG 族，324）
        kojo.背面座位 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.背面座位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「身体归你所有之后、连心也……嗯！」`);
        // CFLAG:324  = 3（变量语义：CFLAG 族，324）
        kojo.背面座位 = 3;
      } else if (kojo.背面座位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「这样子……什么感觉、也没有……只不过是摩擦粘膜罢了……」`,
        );
        // CFLAG:324  = 2（变量语义：CFLAG 族，324）
        kojo.背面座位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 26) {
    if (kojo.正常位肛交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「快请插进来吧、这个菊穴里～」`);
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「其实、前面更想要的说……」`);
      } else {
        await era.printAndWait(`「这、这么野蛮的行为……饶不了你……」`);
      }
      // CFLAG:TARGET:327  = 1（变量语义：CFLAG 族，TARGET:327）
      kojo.正常位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊啊啊～、肛、肛门、完全、变成性器了！　啊啊啊～」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「肛、肛门……麻麻的样子、好舒服……」`);
        } else {
          await era.printAndWait(
            `「把阴茎吞下去了……${sc()}的肛门、把阴茎完全的吞下去了！」`,
          );
        }
        // CFLAG:327  = 7（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.正常位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「还、还想再感受一下……肛门、还想再、感受一下阴茎！」`,
        );
        // CFLAG:327  = 6（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「让${sc()}的肛门、好好地和阴茎做游戏吧……？」`,
          );
        } else {
          await era.printAndWait(
            `「肛门、${sc()}的肛门、变得好奇怪……好想要阴茎！」`,
          );
        }
        // CFLAG:327  = 5（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.正常位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「还、还没……看起来还没习惯的样子……」`);
        // CFLAG:327  = 4（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「咕呜～、肛、肛门、变的好奇怪了～……」`);
        // CFLAG:327  = 3（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 3;
      } else if (kojo.正常位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「好痛……呀啊啊！　好痛！」`);
        // CFLAG:327  = 2（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 27) {
    if (kojo.背后位肛交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「等待多时了、这下流的体位！」`);
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「已经做好被插入的准备了哦」`);
      } else {
        await era.printAndWait(`「咕呜～、好、好羞耻……」`);
      }
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328）
      kojo.背后位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「这、这样子好喜欢～！　野生的、非文明的、下流的姿势……像这样地、被操肛门！」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「脑袋都变的傻乎乎的了……肛门像要溶化似的、${sc()}、要变成白痴了！」`,
          );
        } else {
          await era.printAndWait(
            `「再深点插肛门！　${sc()}、好喜欢肛门被穿刺啊……」`,
          );
        }
        // CFLAG:328  = 7（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.背后位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「还、还不太习惯呢……有进一步开发的必要呢……」`);
        // CFLAG:328  = 6（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「${sc()}的肛门、变的好奇怪呢……你要、负起责任哦」`,
          );
        } else {
          await era.printAndWait(
            `「已经把阴茎的形状、给记下来了呢……${sc()}的肛门」`,
          );
        }
        // CFLAG:328  = 5（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯……还、有点痛……」`);
        // CFLAG:328  = 4（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「咕呜……肛门、屁眼、变松了……」`);
        // CFLAG:328  = 3（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 3;
      } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「好痛！　肛门……要裂开了……不要这么粗暴啊」`);
        // CFLAG:328  = 2（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 28) {
    if (kojo.对面座位肛交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「可以像这样面对面的作肛交……好像在做梦一样呢」`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「想亲个嘴呢……当然、肛门也请拜托您肏的火热吧」`,
        );
      } else {
        await era.printAndWait(`「这样的……这样的性交、是异常的……」`);
      }
      // CFLAG:TARGET:329  = 1（变量语义：CFLAG 族，TARGET:329）
      kojo.对面座位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「${sc()}淫荡扭曲的脸……真想好好看看呢、因肛门性交而满足的表情……」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「嗯～……好深、好深啊！　肛门变得下流起来了！」`,
          );
        } else {
          await era.printAndWait(`「这样子、好喜欢……肛门、快溶化了……」`);
        }
        // CFLAG:329  = 7（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.对面座位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「不再多多开发肛门可不行呢……${sc()}、会加油的」`,
        );
        // CFLAG:329  = 6（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「肛、肛门……变成你的形状了哦♪」`);
        } else {
          await era.printAndWait(
            `「哈啊～、呼呜……感、感觉到了……肛门、变的下流起来了……」`,
          );
        }
        // CFLAG:329  = 5（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.对面座位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「无论什么部位都能被爱上吗、不得不仔细研究呢……」`,
        );
        // CFLAG:329  = 4（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「不行、不行……好有感觉啊啊啊！　肛门、肛门变的不是肛门了啊啊啊啊！」`,
        );
        // CFLAG:329  = 3（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 3;
      } else if (kojo.对面座位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「噫～、好痛、好痛啊、快住手～！」`);
        // CFLAG:329  = 2（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 29) {
    if (kojo.背面座位肛交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「肛门好感动呢、乳头那边也拜托了」`);
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「感觉到你的呼吸了……唔嗯、脖子好痒呢」`);
      } else {
        await era.printAndWait(`「咕呜……不要碰乳头～……」`);
      }
      // CFLAG:TARGET:330  = 1（变量语义：CFLAG 族，TARGET:330）
      kojo.背面座位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「跳起来了……${sc()}、因为肛门被串刺而跳动起来了！」`,
          );
        } else {
          await era.printAndWait(
            `「知道吗……？　因为肛交、乳头也昂然耸立了……♪」`,
          );
        }
        // CFLAG:330  = 7（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.背面座位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「${sc()}的肛门、看起来还没开发好呢……」`);
        // CFLAG:330  = 6（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「哈啊～、呼呜、有、有感觉了！　再激烈点玩弄肛门和乳头吧！」`,
          );
        } else {
          await era.printAndWait(`「${sc()}、肛门也要怀孕了！」`);
        }
        // CFLAG:330  = 5（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.背面座位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「还很痛呢……${sc()}、得多多加油呢」`);
        // CFLAG:330  = 4（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「肛门、好像变的不是肛门了……好、好有感觉……」`);
        // CFLAG:330  = 3（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 3;
      } else if (kojo.背面座位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「疼、好痛……咕呜～」`);
        // CFLAG:330  = 2（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 30) {
    if (kojo.手淫 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「为什么直到现在才让我碰啊～」`);
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「用${sc()}的手、来让它勃起来吧～」`);
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「让${sc()}搓弄也没问题是吗……我知道了」`);
      } else {
        await era.printAndWait(
          `「讨厌讨厌不要啊、${sc()}、才不会干这种事呢！」`,
        );
      }
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331）
      kojo.手淫 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊哈～、一副很想要的样子、一颤一颤的呢……好吧、我撸我撸」`,
          );
        } else {
          await era.printAndWait(
            `「粘乎乎的东西都已经出来了呢。这种液体、叫什么名字来着～？　啊哈～」`,
          );
        }
        // CFLAG:331  = 6（变量语义：CFLAG 族，331）
        kojo.手淫 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.手淫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (era.get(`talent:${player}:318`) == 1) {
          await era.printAndWait(
            `「你这远超平均值的鸡巴……啊哈、一只手完全把握不住哇${heart(1)}」`,
          );
        } else if (era.get(`talent:${player}:318`) == 2) {
          await era.printAndWait(
            `「不脸红吗你？　这种差劲肉棒${heart(1)}　得了、就这么把劣等精子射在手里吧${heart(1)}」`,
          );
        } else if (era.get(`talent:${player}:318`) == 3) {
          await era.printAndWait(
            `「包皮肉棒里的脏东西都跑出来了啦${heart(1)}　啊哈、好厉害的味道${heart(1)}」`,
          );
        } else if (era.get(`talent:${player}:318`) == 4) {
          await era.printAndWait(
            `「什么嘛、根本就不是人的鸡巴了吧……啊哈、给你按摩咯${heart(1)}」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「射精可不行哦、明明想让你在${sc()}的里面全部射出来的……」`,
          );
        } else {
          await era.printAndWait(
            `「不能再多忍耐一会儿吗？　已经、想射了吗？　想射了吗？」`,
          );
        }
        // CFLAG:331  = 5（变量语义：CFLAG 族，331）
        kojo.手淫 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「跳动的很厉害呢……快射吧快射吧、忍不住了？」`);
        // CFLAG:331  = 4（变量语义：CFLAG 族，331）
        kojo.手淫 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「我知道了、用手来辅助自慰行为就行了是吧」`);
        // CFLAG:331  = 3（变量语义：CFLAG 族，331）
        kojo.手淫 = 3;
      } else if (kojo.手淫 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「呜呜、热热的……好恶心……」`);
        // CFLAG:331  = 2（变量语义：CFLAG 族，331）
        kojo.手淫 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 31) {
    if (kojo.口交_奴 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「${sc()}的口活、还没试过吧？」`);
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「精液、直接喝下去了呢」`);
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「我知道了、口交就行了是吧」`);
      } else {
        await era.printAndWait(`「这样子去舔什么的……呜诶～」`);
      }
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332）
      kojo.口交_奴 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.print(`「嗞噜～、嗞噜～、嗞啾～～……噗哈啊」`);
        await era.printAndWait(`${target_name}发出了下流的声音贪求着阴茎`);
        // CFLAG:332  = 6（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「我要多多练习口交、想学会厉害的口活呢」`);
        // CFLAG:332  = 5（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.print(`「哈啊、这个阴茎、刚才也忍不住喷出了精液的样子呢……」`);
        await era.printAndWait(`${target_name}发出了下流的声音贪求着阴茎`);
        // CFLAG:332  = 4（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.口交_奴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.print(`「口交、变的挺擅长了呢」`);
        await era.printAndWait(`${target_name}一边这样说着一边用嘴巴含着阴茎`);
        // CFLAG:332  = 3（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 3;
      } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「呜诶……为什么会一跳一跳的呢。不可思议的肉块……」`,
        );
        // CFLAG:332  = 2（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 32) {
    if (kojo.乳交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「${sc()}的乳房、还挺管用的吧」`);
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「乳房好用的话、${sc()}、就尽情的使劲蹭了哦」`);
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「用乳房摩擦还可以吧……」`);
      } else {
        await era.printAndWait(`「用胸部来！？　变、变态！」`);
      }
      // CFLAG:TARGET:333  = 1（变量语义：CFLAG 族，TARGET:333）
      kojo.乳交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.乳交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「这样挤压着会舒服吗？」`);
        } else {
          await era.printAndWait(`「快看快看快看。乳房把你的阴茎吞进去了哦」`);
        }
        // CFLAG:333  = 6（变量语义：CFLAG 族，333）
        kojo.乳交 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.乳交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「好难啊……你、真的会舒服吗？」`);
        // CFLAG:333  = 5（变量语义：CFLAG 族，333）
        kojo.乳交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.乳交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「我会竭尽全力来奉仕的哦。用${sc()}柔软的乳房！」`,
          );
        } else {
          await era.printAndWait(`「Biu的射出来也行哦？」`);
        }
        // CFLAG:333  = 4（变量语义：CFLAG 族，333）
        kojo.乳交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.乳交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「你、真的有感觉吗？　那就好……」`);
        // CFLAG:333  = 3（变量语义：CFLAG 族，333）
        kojo.乳交 = 3;
      } else if (kojo.乳交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「呜呜、这样子到底有什么好高兴的嘛……」`);
        // CFLAG:333  = 2（变量语义：CFLAG 族，333）
        kojo.乳交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 33) {
    if (kojo.股间性交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「快看快看、要进到${sc()}的阴道里去了哦？」`);
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「只在表面摩擦吗……好想进到里面去呢」`);
      } else {
        await era.printAndWait(`「这样摩擦到底有什么好高兴的……」`);
      }
      // CFLAG:TARGET:334  = 1（变量语义：CFLAG 族，TARGET:334）
      kojo.股间性交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:0`) == 1 &&
        (kojo.股间性交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呐、只在表面摩擦你会觉得舒服吗？　${sc()}……对这不是很了解呢」`,
        );
        // CFLAG:334  = 6（变量语义：CFLAG 族，334）
        kojo.股间性交 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.股间性交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呐、只在表面摩擦你会觉得舒服吗？　${sc()}……有点遗憾呢」`,
        );
        // CFLAG:334  = 5（变量语义：CFLAG 族，334）
        kojo.股间性交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`talent:${target}:0`) == 1 &&
        (kojo.股间性交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「${sc()}已经到极限了……明明好想被插进去、明明好想……被插到里面啊！」`,
        );
        // CFLAG:334  = 4（变量语义：CFLAG 族，334）
        kojo.股间性交 = 4;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.股间性交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「假如你、一不小心把你的阴茎插进了${sc()}的阴道里的话……该怎么办呢？　啊哈哈～」`,
        );
        // CFLAG:334  = 3（变量语义：CFLAG 族，334）
        kojo.股间性交 = 3;
      } else if (kojo.股间性交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「看起来这样的摩擦让你很高兴嘛……」`);
        // CFLAG:334  = 2（变量语义：CFLAG 族，334）
        kojo.股间性交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 34) {
    if (kojo.骑乘位 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「我期待已久了！　把你的阴茎、交给我吧」`);
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「终于、想要让我${sc()}怀孕了吗！　好开心哦」`,
          );
        } else {
          await era.printAndWait(`「让我自己来……你实在太无耻了」`);
        }
      } else {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「嘿诶、这么想让${sc()}来吗」`);
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「这样子嘎吱嘎吱的……并不讨厌哦」`);
        } else {
          await era.printAndWait(`「让我自己来……可恶」`);
        }
      }
      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335）
      kojo.骑乘位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.骑乘位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(4) == 0) {
          await era.printAndWait(`「来吧来吧、更多的从下面来插${sc()}吧！」`);
        } else if (rand_n(3) == 0) {
          await era.printAndWait(`「${sc()}扭腰的样子、请多多欣赏吧」`);
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「停不下来了、你也多用阴茎来顶我吧」`);
        } else {
          await era.printAndWait(`「哈啊～、从下面、操我吧～♪」`);
        }
        // CFLAG:335  = 6（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.骑乘位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(4) == 0) {
          await era.printAndWait(`「要把精液一滴不剩的榨干哦♪」`);
        } else if (rand_n(3) == 0) {
          await era.printAndWait(`「快看快看、要出来了哦、精液！」`);
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「想更多的被阴茎操呢、啊哈哈～」`);
        } else {
          await era.printAndWait(
            `「出来了～！　把精液、更多的、射进来吧！　啊啊啊～♪」`,
          );
        }
        // CFLAG:335  = 5（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.骑乘位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(4) == 0) {
          await era.printAndWait(`「不行了、${sc()}的腰、自己动起来了！」`);
        } else if (rand_n(3) == 0) {
          await era.printAndWait(`「竟然……让${sc()}这样做……不过……」`);
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「哈啊～、哈啊～、咕呜～♪」`);
        } else {
          await era.printAndWait(`「不行啊、这样子……往上顶……」`);
        }
        // CFLAG:335  = 4（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.骑乘位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「唔～……我知道了。跨在你身上就行了吧？」`);
        // CFLAG:335  = 3（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 3;
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「竟让${sc()}……这样做……好屈辱～」`);
        // CFLAG:335  = 2（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 35) {
    if (kojo.全身擦洗 == 0) {
      if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「你喜欢提供这种服务的店吗……？」`);
      } else {
        await era.printAndWait(`「跟按摩女似的……额」`);
      }
      // CFLAG:TARGET:336  = 1（变量语义：CFLAG 族，TARGET:336）
      kojo.全身擦洗 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.全身擦洗 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「快看快看、被${sc()}的肌肤哧溜哧溜的摩擦着哦～♪　舒服吗？」`,
        );
        // CFLAG:336  = 5（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.全身擦洗 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「这身体是只属于你的哦、为了你……嫩呼呼的呢」`);
        // CFLAG:336  = 4（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.全身擦洗 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「变的全是泡泡了呢……舒服吗？」`);
        // CFLAG:336  = 3（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 3;
      } else if (kojo.全身擦洗 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「喂、这样做应该可以了吧……真是的」`);
        // CFLAG:336  = 2（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 36) {
    if (kojo.骑乘位肛交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「这样骑在你的身上就好像做梦一样呢」`);
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「呜嗯～……用肛门裹住了呢……♪」`);
      } else {
        await era.printAndWait(`「这么卑劣的肛交还是第一次……」`);
      }
      // CFLAG:TARGET:337  = 1（变量语义：CFLAG 族，TARGET:337）
      kojo.骑乘位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「不行了、${sc()}的肛门要溶化了啊！」`);
        } else {
          await era.printAndWait(
            `「${sc()}、一被串刺着……从肛门到大脑、都在回响！」`,
          );
        }
        // CFLAG:337  = 7（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.骑乘位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「${sc()}一动起来、你就盯着不放呢♪」`);
        // CFLAG:337  = 6（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「啊啊、难以置信、肛门要溶化了♪」`);
        } else {
          await era.printAndWait(`「肛、肛门、肛门要……不行～、太有感觉了～♪」`);
        }
        // CFLAG:337  = 5（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「肛门含住阴茎的样子、好好看看吧」`);
        // CFLAG:337  = 4（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「咕呜、像这样的肛交什么的……尽管让${sc()}做吧」`,
        );
        // CFLAG:337  = 3（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 3;
      } else if (kojo.骑乘位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「痛、好疼、好痛啊……${sc()}已经不想再做了啊」`);
        // CFLAG:337  = 2（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 37) {
    if (kojo.肛门侍奉 == 0) {
      if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「竟然要我舔这么脏的地方……你真是变态呢」`);
      } else {
        await era.printAndWait(`「讨、讨厌、竟然要我舔那种地方……呜呜～」`);
      }
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338）
      kojo.肛门侍奉 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「这样把舌头伸进肛门、你喜欢吗？」`);
        // CFLAG:338  = 5（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.print(`「你的肛门……被${sc()}弄干净了哦♪」`);
        // CFLAG:338  = 4（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「我知道了……舔就行了吧？　有好好洗过吗？」`);
        // CFLAG:338  = 3（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 3;
      } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「呜呜……咕呜～、呜呜……」`);
        // CFLAG:338  = 2（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 40) {
    if (kojo.打屁股 == 0) {
      await era.printAndWait(`「呀啊～、好痛、住手～、饶了${sc()}吧！」`);
      // CFLAG:TARGET:341  = 1（变量语义：CFLAG 族，TARGET:341）
      kojo.打屁股 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.打屁股 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊～、再继续打吧♪　再多教育一下我这只淫乱受虐狂母猪吧♪　咿～～♪」`,
        );
        // CFLAG:TARGET:341  = 5（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.打屁股 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊～、请再用力点打！　再更多的惩罚一下受虐狂母猪${target_name}吧～♪」`,
        );
        // CFLAG:TARGET:341  = 4（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 4;
        return 0;
      } else if (
        era.get(`mark:${target}:0`) == 3 &&
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.打屁股 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊啊～、咿～～、啊～～、咿啊～」`);
        // CFLAG:TARGET:341  = 3（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 3;
        return 0;
      } else if (kojo.打屁股 <= 1 && game.kojo.口上开关 == 2) {
        await era.printAndWait(`「痛～、好痛啊～……${sc()}什么坏事也没做啊」`);
        // CFLAG:TARGET:341  = 2（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 41) {
    if (kojo.鞭 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「咿呀啊啊啊！　好有效～……」`);
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「咿呀啊～、咿呀啊～」`);
      } else {
        await era.printAndWait(`「住手、住……呜啊啊！」`);
      }
      // CFLAG:TARGET:342  = 1（变量语义：CFLAG 族，TARGET:342）
      kojo.鞭 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.鞭 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「咿呀啊啊啊！　再来♪　再用力点♪　虐待我这只淫乱受虐狂母猪吧～～～♪」`,
        );
        // CFLAG:TARGET:342  = 9（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「咿呀啊啊啊！　再来♪　再用力点♪　有感觉了～……♪」`,
        );
        // CFLAG:TARGET:342  = 8（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.鞭 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「咿呀啊啊啊！　痛、好痛啊！」`);
        // CFLAG:TARGET:342  = 7（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.鞭 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「咿呀啊～！　再来！　再用力点！　来教育受虐狂母猪${target_name}吧～～～♪」`,
        );
        // CFLAG:TARGET:342  = 6（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「咿呀啊～！　再来！　再用力点！　再多多教育我！」`,
        );
        // CFLAG:TARGET:342  = 5（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.鞭 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「咿呀啊～！　痛、好痛啊……」`);
        // CFLAG:TARGET:342  = 4（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「再来！　再用力点！　再多多教育我！」`);
        // CFLAG:TARGET:342  = 3（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 3;
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「住手、痛……好痛啊！」`);
        // CFLAG:TARGET:342  = 2（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 42) {
    if (kojo.针 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「要刺哪里呢？　嗯？」`);
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「扑哧一下被刺进去、一想到这个、就好像要高潮了呢」`,
        );
      } else {
        await era.printAndWait(`「哈哈、注射什么的我早就习惯了」`);
      }
      // CFLAG:TARGET:343  = 1（变量语义：CFLAG 族，TARGET:343）
      kojo.针 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.针 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「刺进去后……使劲、捻动。这是${sc()}最喜欢做的哦♪」`,
        );
        // CFLAG:TARGET:343  = 9（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「咕呜呜、一下子……刺进来了～」`);
        // CFLAG:TARGET:343  = 8（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.针 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呜～……呜呜、看起来${sc()}的感觉还需要再开发呢……」`,
        );
        // CFLAG:TARGET:343  = 7（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.针 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「感、感觉到了♪　${sc()}的身体正被冰冷的金属……穿凿着♪」`,
        );
        // CFLAG:TARGET:343  = 6（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯……啊～、进来了～」`);
        // CFLAG:TARGET:343  = 5（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.针 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜～、呜～……好痛～……」`);
        // CFLAG:TARGET:343  = 4（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「不行啊……这样下去……${sc()}的感觉要变的奇怪了～」`,
        );
        // CFLAG:TARGET:343  = 3（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 3;
      } else if (kojo.针 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「咿呀啊啊～！　咿、咿呀啊啊！」`);
        // CFLAG:TARGET:343  = 2（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 43 && era.get(`tequip:${target}:43`)) {
    if (kojo.眼罩 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344）
      kojo.眼罩 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.眼罩 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.眼罩 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
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
  } else if (era_flag.selectcom == 43 && era.get(`tequip:${target}:43`) == 0) {
    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.眼罩着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:380  = 3（变量语义：CFLAG 族，380）
      kojo.眼罩着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
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

  if (era_flag.selectcom == 44 && era.get(`tequip:${target}:44`)) {
    if (kojo.绳子 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「紧紧地绑上来吧♪」`);
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「我喜欢束缚的紧一点」`);
      } else {
        await era.printAndWait(`「嗯……要来束缚这手吗」`);
      }
      // CFLAG:TARGET:345  = 1（变量语义：CFLAG 族，TARGET:345）
      kojo.绳子 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.绳子 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈……要怎么处理动不了的${sc()}呢？　我期待着呢？」`,
        );
        // CFLAG:TARGET:345  = 9（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呵呵、身体动不了了呢。好像触电一样麻痹的快感啊……」`,
        );
        // CFLAG:TARGET:345  = 8（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.绳子 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯、${sc()}的性癖还没开发到这方面……对不起」`);
        // CFLAG:TARGET:345  = 7（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.绳子 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「已经不论如何都逃不了了……这下${sc()}就是你的俘虏了♪」`,
        );
        // CFLAG:TARGET:345  = 6（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呵呵、身体动不了了呢。真是让人受不了的家伙呢、你啊」`,
        );
        // CFLAG:TARGET:345  = 5（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.绳子 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「虽然我不知道绳子的好处……但是被你的话不管什么都很舒服」`,
        );
        // CFLAG:TARGET:345  = 4（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呵呵、身体动不了了呢……好为难好为难」`);
        // CFLAG:TARGET:345  = 3（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 3;
      } else if (kojo.绳子 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「只是被束缚住而已、早就习惯了」`);
        // CFLAG:TARGET:345  = 2（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 44 && era.get(`tequip:${target}:44`) == 0) {
    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「已经结束了吗♪」`);
      // CFLAG:385  = 2（变量语义：CFLAG 族，385）
      kojo.绳子着脱 = 2;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「明明直到最后都束缚住我就好了呢」`);
      // CFLAG:385  = 2（变量语义：CFLAG 族，385）
      kojo.绳子着脱 = 2;
    } else if (kojo.绳子着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「已经够了吗？」`);
      // CFLAG:385  = 1（变量语义：CFLAG 族，385）
      kojo.绳子着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 45 && era.get(`tequip:${target}:45`)) {
    if (kojo.口塞 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「呼咕呜♪　呼呜、呼呜呜～～♪」`);
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「呼嘎、呼咕呜……呼咕♪」`);
      } else {
        await era.printAndWait(`「嘎呼～……呼咕～……呼嘎啊！」`);
      }
      // CFLAG:TARGET:346  = 1（变量语义：CFLAG 族，TARGET:346）
      kojo.口塞 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.口塞 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「噗呼呜♪　呼咕呜……呼苟、噗呼呜♪」`);
        await era.printAndWait(`欢喜的${target_name}像猪一样喘息着`);
        // CFLAG:TARGET:346  = 9（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「噗咕呜、呼咕呜……呼苟、噗呼呜♪」`);
        await era.printAndWait(`${target_name}像猪一样喘息着`);
        // CFLAG:TARGET:346  = 8（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.口塞 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呼咕呜♪　呼呜、呼呜呜～～♪」`);
        // CFLAG:TARGET:346  = 7（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.口塞 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈呼呜♪　哈咕呜……呼呜、哈呼呜♪」`);
        await era.printAndWait(`欢喜的${target_name}激动的喘息着`);
        // CFLAG:TARGET:346  = 6（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈呼呜、哈呼呜……呼呜、哈咕呜♪」`);
        await era.printAndWait(`${target_name}开心的喘息着`);
        // CFLAG:TARGET:346  = 5（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.口塞 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呼嘎、呼咕呜……呼咕♪」`);
        // CFLAG:TARGET:346  = 4（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呼嘎、呼咕呜……呼咕♪」`);
        // CFLAG:TARGET:346  = 3（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 3;
      } else if (kojo.口塞 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「嘎呼～……呼咕呜……呼嘎啊！」`);
        // CFLAG:TARGET:346  = 2（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 45 && era.get(`tequip:${target}:45`) == 0) {
    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.口塞着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「噗哈啊……。已、已经结束了吗？」`);
      // CFLAG:386  = 3（变量语义：CFLAG 族，386）
      kojo.口塞着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.口塞着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「哈呼呜……好辛苦呢」`);
      // CFLAG:386  = 2（变量语义：CFLAG 族，386）
      kojo.口塞着脱 = 2;
    } else if (kojo.口塞着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「哈啊哈啊……唔、真是屈辱啊」`);
      // CFLAG:386  = 1（变量语义：CFLAG 族，386）
      kojo.口塞着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 46 && era.get(`tequip:${target}:46`)) {
    if (kojo.灌肠肛塞 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:347  = 1（变量语义：CFLAG 族，TARGET:347）
      kojo.灌肠肛塞 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.灌肠肛塞 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:347  = 7（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.灌肠肛塞 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:347  = 6（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.灌肠肛塞 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:347  = 5（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.灌肠肛塞 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:347  = 4（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
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
      if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:356  = 1（变量语义：CFLAG 族，356）
      kojo.放置PLAY = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`palam:${target}:5`) >= era.get('palamlv:3') &&
        (kojo.放置PLAY <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:356  = 4（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 4;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
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
      if (era.get(`tequip:${target}:53`)) {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「初次见面、我是前勇者${target_name}哦。很感谢大家今天的收看」`,
          );
          await era.printAndWait(
            `「${sc()}现在已经对拯救世界啊、为了大家而战啊、等诸如此类的事物没有兴趣了」`,
          );
          await era.printAndWait(
            `「现在${sc()}最大的兴趣爱好是、如何最舒服的做爱的方法」`,
          );
          await era.printAndWait(
            `「这个身体将会产生怎样的淫乱变化呢、希望大家从现在开始好好看着哦」`,
          );
          await era.printAndWait(
            `${target_name}一边这样说着一边煽情地舒展着身体……`,
          );
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「初次见面、我是前勇者${target_name}哦。很感谢大家今天的收看」`,
          );
          await era.printAndWait(
            `「${sc()}现在已经对拯救世界啊、与邪恶战斗啊、等诸如此类的事物没有兴趣了」`,
          );
          await era.printAndWait(
            `「现在${sc()}最大的兴趣爱好是、用这个肉体孕育魔王的孩子」`,
          );
          await era.printAndWait(
            `「用这个身体孕育爱的结晶的姿态……希望你们好好看着吧」`,
          );
          await era.printAndWait(
            `${target_name}一边这样说着一边煽情地舒展着身体……`,
          );
        } else {
          await era.printAndWait('');
        }
      } else {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) == 1) {
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
          era.get(`talent:${target}:76`) == 1 &&
          (kojo.交谈 <= 3 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait(
            `「又见面了呢？　我是肉奴隶${target_name}哦。一直以来多谢关照」`,
          );
          await era.printAndWait(
            `「${sc()}的肉体将被培养成什么样呢、最近感觉越来越淫乱了呢」`,
          );
          await era.printAndWait(
            `「能感受到最高快乐的魔之性爱、今天也要开始研究了哦」`,
          );
          await era.printAndWait(
            `「这个身体将会产生怎样的淫乱变化呢、希望大家从现在开始好好看着哦」`,
          );
          await era.printAndWait(
            `${target_name}一边这样说着一边煽情地舒展着身体……`,
          );
          // CFLAG:357  = 4（变量语义：CFLAG 族，357）
          kojo.交谈 = 4;
        } else if (
          era.get(`talent:${target}:85`) == 1 &&
          (kojo.交谈 <= 2 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait(
            `「又见面了呢？　我是爱奴隶${target_name}哦。一直以来多谢关照」`,
          );
          await era.printAndWait(
            `「为了最美妙的怀孕、今天也要为生孩子而做爱呢……呐？」`,
          );
          await era.printAndWait(
            `「单单是想象这卑微的身体怀上魔王的孩子的时候……哈啊、好像就要高潮了呢」`,
          );
          await era.printAndWait(
            `「用这个身体孕育爱的结晶的姿态……希望你们好好看着吧」`,
          );
          await era.printAndWait(
            `${target_name}一边这样说着一边煽情地舒展着身体……`,
          );
          // CFLAG:357  = 3（变量语义：CFLAG 族，357）
          kojo.交谈 = 3;
        } else if (kojo.交谈 <= 1 || game.kojo.口上开关 == 2) {
          await era.printAndWait('');
          // CFLAG:357  = 2（变量语义：CFLAG 族，357）
          kojo.交谈 = 2;
        }
      } else {
        if (
          era.get(`talent:${target}:76`) == 1 &&
          (kojo.交谈 <= 3 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait('');
          // CFLAG:357  = 4（变量语义：CFLAG 族，357）
          kojo.交谈 = 4;
        } else if (
          era.get(`talent:${target}:85`) == 1 &&
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
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:360  = 1（变量语义：CFLAG 族，TARGET:360）
      kojo.乳夹口交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.乳夹口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:360  = 5（变量语义：CFLAG 族，360）
        kojo.乳夹口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.乳夹口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:360  = 4（变量语义：CFLAG 族，360）
        kojo.乳夹口交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
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
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:361  = 1（变量语义：CFLAG 族，TARGET:361）
      kojo.口交时自慰 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.口交时自慰 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:361  = 5（变量语义：CFLAG 族，361）
        kojo.口交时自慰 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.口交时自慰 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:361  = 4（变量语义：CFLAG 族，361）
        kojo.口交时自慰 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
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
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:362  = 1（变量语义：CFLAG 族，TARGET:362）
      kojo.手搓口交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.手搓口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:362  = 5（变量语义：CFLAG 族，362）
        kojo.手搓口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.手搓口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:362  = 4（变量语义：CFLAG 族，362）
        kojo.手搓口交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
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
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:363  = 1（变量语义：CFLAG 族，TARGET:363）
      kojo.真空口交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.真空口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:363  = 5（变量语义：CFLAG 族，363）
        kojo.真空口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.真空口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:363  = 4（变量语义：CFLAG 族，363）
        kojo.真空口交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
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
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:364  = 1（变量语义：CFLAG 族，TARGET:364）
      kojo.六九式 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.六九式 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:364  = 5（变量语义：CFLAG 族，364）
        kojo.六九式 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.六九式 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:364  = 4（变量语义：CFLAG 族，364）
        kojo.六九式 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
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
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:365  = 1（变量语义：CFLAG 族，TARGET:365）
      kojo.深喉 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.真空口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:365  = 5（变量语义：CFLAG 族，365）
        kojo.深喉 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.真空口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:365  = 4（变量语义：CFLAG 族，365）
        kojo.深喉 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
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
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:381  = 1（变量语义：CFLAG 族，TARGET:381）
      kojo.强制口交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.强制口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:381  = 5（变量语义：CFLAG 族，381）
        kojo.强制口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.强制口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:381  = 4（变量语义：CFLAG 族，381）
        kojo.强制口交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
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
    const p = piercing_state.p; // 跨 CALL TRAIN_MESSAGE_B 存活的全局单字母变量 p（com87() 写入，见 piercing-state.js，K10 kojo-k10-club.js:8942 同款先例）

    if (kojo.穿环 == 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:76`) == 1) {
        if (chara(target).train.穿环状态 & p) {
          await era.printAndWait('');

          if (p == 1) {
            await era.printAndWait(`「${sc()}的乳头、变漂亮了哦」`);
          } else if (p == 2) {
            await era.printAndWait(`「${sc()}的肚脐、变漂亮了哦」`);
          } else if (p == 4) {
            await era.printAndWait(`「${sc()}的阴唇、变漂亮了哦」`);
          } else if (p == 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(`「${sc()}的阴茎、闪闪发光了呢……」`);
            } else {
              await era.printAndWait(`「${sc()}的阴蒂、变的好下流呢」`);
            }
          } else if (p == 16) {
            await era.printAndWait(`「不可思议的感觉呢……在嘴里面……」`);
          } else if (p == 32) {
            await era.printAndWait('');
          } else if (p == 64) {
            await era.printAndWait('');
          }
        } else {
          await era.printAndWait('');
        }
      } else if (era.get(`talent:${target}:85`) == 1) {
        if (chara(target).train.穿环状态 & p) {
          await era.printAndWait('');

          if (p == 1) {
            await era.printAndWait(`「${sc()}的乳头、变漂亮了哦」`);
          } else if (p == 2) {
            await era.printAndWait(`「${sc()}的肚脐、变漂亮了哦」`);
          } else if (p == 4) {
            await era.printAndWait(`「${sc()}的阴唇、变漂亮了哦」`);
          } else if (p == 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(`「${sc()}的阴茎、闪闪发光了呢……」`);
            } else {
              await era.printAndWait(`「${sc()}的阴蒂、变的好下流呢」`);
            }
          } else if (p == 16) {
            await era.printAndWait(`「不可思议的感觉……在嘴里面……」`);
          } else if (p == 32) {
            await era.printAndWait('');
          } else if (p == 64) {
            await era.printAndWait('');
          }
        } else {
          await era.printAndWait('');
        }
      } else {
        if (chara(target).train.穿环状态 & p) {
          await era.printAndWait('');

          if (p == 1) {
            await era.printAndWait('');
          } else if (p == 2) {
            await era.printAndWait('');
          } else if (p == 4) {
            await era.printAndWait('');
          } else if (p == 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait('');
            } else {
              await era.printAndWait('');
            }
          } else if (p == 16) {
            await era.printAndWait('');
          } else if (p == 32) {
            await era.printAndWait('');
          } else if (p == 64) {
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
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.穿环 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (chara(target).train.穿环状态 & p) {
          if (p == 1) {
            await era.printAndWait(`「${sc()}的乳头、变漂亮了哦」`);
          } else if (p == 2) {
            await era.printAndWait(`「${sc()}的肚脐、变漂亮了哦」`);
          } else if (p == 4) {
            await era.printAndWait(`「${sc()}的阴唇、变漂亮了哦」`);
          } else if (p == 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(`「${sc()}的阴茎、闪闪发光了呢……」`);
            } else {
              await era.printAndWait(`「${sc()}的阴蒂、变的好下流呢」`);
            }
          } else if (p == 16) {
            await era.printAndWait(`「嘴里……感觉好奇怪」`);
          } else if (p == 32) {
            await era.printAndWait('');
          } else if (p == 64) {
            await era.printAndWait('');
          }
        } else {
          await era.printAndWait('');
        }
        // CFLAG:348  = 4（变量语义：CFLAG 族，348）
        kojo.穿环 = 4;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.穿环 <= 2 || game.kojo.口上开关 == 2)
      ) {
        if (chara(target).train.穿环状态 & p) {
          if (p == 1) {
            await era.printAndWait(`「${sc()}的乳头、变漂亮了哦」`);
          } else if (p == 2) {
            await era.printAndWait(`「${sc()}的肚脐、变漂亮了哦」`);
          } else if (p == 4) {
            await era.printAndWait(`「${sc()}的阴唇、变漂亮了哦」`);
          } else if (p == 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(`「${sc()}的阴茎、闪闪发光了呢……」`);
            } else {
              await era.printAndWait(`「${sc()}的阴蒂、变的好下流呢」`);
            }
          } else if (p == 16) {
            await era.printAndWait(`「嘴里……感觉好奇怪」`);
          } else if (p == 32) {
            await era.printAndWait('');
          } else if (p == 64) {
            await era.printAndWait('');
          }
        } else {
          await era.printAndWait('');
        }
        // CFLAG:348  = 3（变量语义：CFLAG 族，348）
        kojo.穿环 = 3;
      } else if (kojo.穿环 <= 1 || game.kojo.口上开关 == 2) {
        if (chara(target).train.穿环状态 & p) {
          if (p == 1) {
            await era.printAndWait('');
          } else if (p == 2) {
            await era.printAndWait('');
          } else if (p == 4) {
            await era.printAndWait('');
          } else if (p == 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait('');
            } else {
              await era.printAndWait('');
            }
          } else if (p == 16) {
            await era.printAndWait('');
          } else if (p == 32) {
            await era.printAndWait('');
          } else if (p == 64) {
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

// @DOG_KOJO_12（:3538-4348）：兽奸专用口上（TEQUIP:89 时由 KOJO_MESSAGE_COM_12
// 守卫岔来）。与主状态机共用 CFLAG:301-400 计数器（kojo 门面），但只覆盖兽奸
// 语境下可用的指令（爱抚/舔阴/胸爱抚/接吻/舔肛/背后位/背后位肛交/肛珠/眼罩/
// 口交/手淫/骑乘位/肛门侍奉/交谈等）。本地函数，不进 family 分发。
async function dog_kojo_12(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const kojo = chara(target).kojo;
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%

  if (era_flag.selectcom == 0) {
    if (kojo.爱抚 == 0) {
      if (era.get(`mark:${target}:2`) >= 2) {
        await era.printAndWait(`「呜呜、我知道了、我会乖乖做的……」`);
      } else {
        await era.printAndWait(`「讨厌！　不要啊！　住手～！！」`);
      }
      // CFLAG:301  = 1（变量语义：CFLAG 族，301）
      kojo.爱抚 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        (kojo.爱抚 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「${sc()}的身体、还想再被舔遍各个角落呢」`);
        // CFLAG:301  = 7（变量语义：CFLAG 族，301）
        kojo.爱抚 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「涂上黄油会更好些吧」`);
        // CFLAG:301  = 6（变量语义：CFLAG 族，301）
        kojo.爱抚 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「涂上黄油会更好些吧」`);
        // CFLAG:301  = 5（变量语义：CFLAG 族，301）
        kojo.爱抚 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「我知道了、我会乖乖做的……」`);
        // CFLAG:301  = 4（变量语义：CFLAG 族，301）
        kojo.爱抚 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 2 &&
        (kojo.爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「讨厌、住手……不要啊」`);
        // CFLAG:301  = 3（变量语义：CFLAG 族，301）
        kojo.爱抚 = 3;
      } else if (
        era.get(`mark:${target}:2`) <= 1 &&
        (kojo.爱抚 <= 1 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「讨厌、讨厌！　不要啊！」`);
        // CFLAG:301  = 2（变量语义：CFLAG 族，301）
        kojo.爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 1) {
    if (kojo.舔阴 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        await era.printAndWait(`「呜呜……这么重要的地方被舔了」`);
      } else {
        await era.printAndWait(`「呜呜……这么敏感的地方被舔着」`);
      }
      // CFLAG:302  = 1（变量语义：CFLAG 族，302）
      kojo.舔阴 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        (kojo.舔阴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「味道不错吧、${sc()}的阴部……呵呵、尽管舔吧」`);
        // CFLAG:302  = 6（变量语义：CFLAG 族，302）
        kojo.舔阴 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.舔阴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「这个地方也要涂上黄油吗？」`);
        // CFLAG:302  = 5（变量语义：CFLAG 族，302）
        kojo.舔阴 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.舔阴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「这个地方也要涂上黄油吗？」`);
        // CFLAG:302  = 4（变量语义：CFLAG 族，302）
        kojo.舔阴 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.舔阴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「遵命……涂上黄油就好了吧」`);
        // CFLAG:302  = 3（变量语义：CFLAG 族，302）
        kojo.舔阴 = 3;
      } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「呜呜、好恶心……这样子、违反人伦啊……」`);
        // CFLAG:302  = 2（变量语义：CFLAG 族，302）
        kojo.舔阴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 5) {
    if (kojo.胸爱抚 == 0) {
      if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「不要、快停下啊」`);
      } else {
        await era.printAndWait(`「唔……好奇怪的感觉」`);
      }
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306）
      kojo.胸爱抚 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        (kojo.胸爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「牙咬在乳头上……bilibili的♪」`);
        // CFLAG:306  = 6（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈啊、胸部好吃吗？」`);
        // CFLAG:306  = 5（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈啊、继续吸胸部吧」`);
        // CFLAG:306  = 4（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 4;
      } else if (
        era.get(`abl:${target}:1`) >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「咕……被狗、弄得有感觉了……」`);
        // CFLAG:306  = 3（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 3;
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「卑鄙……这只会让我感觉不舒服」`);
        // CFLAG:306  = 2（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 6) {
    if (kojo.接吻 == 0 && game.train.初吻与自我口上) {
      if (era.get(`talent:${target}:136`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      kojo.接吻 = 1;
      return 0;
    } else if (kojo.接吻 == 0) {
      if (era.get(`talent:${target}:136`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      kojo.接吻 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        (kojo.接吻 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 6（变量语义：CFLAG 族，307）
        kojo.接吻 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.接吻 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 5（变量语义：CFLAG 族，307）
        kojo.接吻 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.接吻 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 4（变量语义：CFLAG 族，307）
        kojo.接吻 = 4;
      } else if (
        era.get(`abl:${target}:10`) >= 2 &&
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
      if (era.get(`talent:${target}:136`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310）
      kojo.舔肛 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        (kojo.舔肛 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 6（变量语义：CFLAG 族，310）
        kojo.舔肛 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 5（变量语义：CFLAG 族，310）
        kojo.舔肛 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.舔肛 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 4（变量语义：CFLAG 族，310）
        kojo.舔肛 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
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
      if (era.get(`talent:${target}:0`) == 1) {
        if (era.get(`talent:${target}:136`) == 1) {
          await era.printAndWait(`「讨厌～！　${sc()}、终于要成为母狗了呢！」`);
        } else if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「交配实验吗……好期待呢♪」`);
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「要怀上狗宝宝了吗」`);
        } else {
          await era.printAndWait(`「咿呀啊、异常、这样太异常了……」`);
        }
      } else {
        if (era.get(`talent:${target}:136`) == 1) {
          await era.printAndWait(`「讨厌～！　${sc()}、终于可以交尾了呢！」`);
        } else if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「嗯、终于可以做交配实验了呢。让我来帮忙吧」`,
          );
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「真的、要怀孕了吗……」`);
        } else {
          await era.printAndWait(`「咕呜～、讨厌、已经、够了……」`);
        }
      }
      // CFLAG:322  = 1（变量语义：CFLAG 族，322）
      kojo.背后位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        (kojo.背后位 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「汪汪！　狗的阴茎好爽啊♪　${sc()}、想怀上狗宝宝～♪」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「嗯啊啊啊～、${sc()}、要变成母狗了哦♪」`);
        } else {
          await era.printAndWait(`「在交尾呢……${sc()}、在做异种交配呢♪」`);
        }
        // CFLAG:322  = 7（变量语义：CFLAG 族，322）
        kojo.背后位 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「哦、今天也是交配实验吗。让我来帮忙吧」`);
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「随时都可以继续哦？　这个交配实验……」`);
        } else {
          await era.printAndWait(`「我知道了。让我来帮忙吧」`);
        }
        // CFLAG:322  = 6（变量语义：CFLAG 族，322）
        kojo.背后位 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.背后位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「真的要怀上了？」`);
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「看来不会怀孕呢……」`);
        } else {
          await era.printAndWait(`「很担心会不会得病呢」`);
        }
        // CFLAG:322  = 5（变量语义：CFLAG 族，322）
        kojo.背后位 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「咕呜～、被狗弄得……有感觉了……」`);
        // CFLAG:322  = 4（变量语义：CFLAG 族，322）
        kojo.背后位 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「交配实验吗。我知道了……」`);
        // CFLAG:322  = 3（变量语义：CFLAG 族，322）
        kojo.背后位 = 3;
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「呜咕～、受够了……这样子、太异常了……」`);

        // CFLAG:322  = 2（变量语义：CFLAG 族，322）
        kojo.背后位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 27) {
    if (kojo.背后位肛交 == 0) {
      if (era.get(`talent:${target}:136`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328）
      kojo.背后位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
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
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
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
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
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
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:328  = 4（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
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
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331）
      kojo.手淫 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
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
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
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
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
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
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:331  = 4（变量语义：CFLAG 族，331）
        kojo.手淫 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
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
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332）
      kojo.口交_奴 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:332  = 7（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:332  = 6（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.口交_奴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:332  = 5（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.print('');
        await era.printAndWait('');
        // CFLAG:332  = 4（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
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
      if (era.get(`talent:${target}:0`) == 1) {
        if (era.get(`talent:${target}:136`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      } else {
        if (era.get(`talent:${target}:136`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) == 1) {
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
        era.get(`talent:${target}:136`) == 1 &&
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
        era.get(`talent:${target}:76`) == 1 &&
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
        era.get(`talent:${target}:85`) == 1 &&
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
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
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
        era.get(`mark:${target}:2`) == 3 &&
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
      if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338）
      kojo.肛门侍奉 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:338  = 6（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:338  = 5（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.print('');
        // CFLAG:338  = 4（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
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

  if (era_flag.selectcom == 43 && era.get(`tequip:${target}:43`)) {
    if (kojo.眼罩 == 0) {
      if (era.get(`talent:${target}:136`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344）
      kojo.眼罩 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        (kojo.眼罩 <= 9 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 10（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 10;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.眼罩 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.眼罩 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
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
  } else if (era_flag.selectcom == 43 && era.get(`tequip:${target}:43`) == 0) {
    if (
      era.get(`talent:${target}:136`) == 1 &&
      (kojo.肛门侍奉 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:444  = 4（变量语义：CFLAG 族，444）
      kojo.兽奸眼罩 = 4;
    } else if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.肛门侍奉 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:444  = 3（变量语义：CFLAG 族，444）
      kojo.兽奸眼罩 = 3;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
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
      if (era.get(`tequip:${target}:53`)) {
        if (era.get(`talent:${target}:136`) == 1) {
          await era.printAndWait(
            `「初次见面、我是前勇者${target_name}哦。很感谢大家今天的收看」`,
          );
          await era.printAndWait(`「${sc()}现在正研究着超越种族的性爱呢」`);
          await era.printAndWait(
            `「与狗的交配实验、狗崽的妊娠……啊啊、想研究的东西堆积如山呢」`,
          );
          await era.printAndWait(
            `「${sc()}的研究成果、请从现在开始好好看着吧」`,
          );
          await era.printAndWait(
            `${target_name}一边这样说着一边淫荡地摇着腰……`,
          );
        } else if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) == 1) {
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
          era.get(`talent:${target}:136`) == 1 &&
          (kojo.交谈 <= 4 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait(
            `「又见面了呢？　我是母狗家畜${target_name}。一直以来多谢关照」`,
          );
          await era.printAndWait(
            `「${sc()}的超越种族的性爱研究现在有了很大进展。内心也渐渐地变成和野兽一样了哦」`,
          );
          await era.printAndWait(
            `「与狗的交配实验、狗崽的妊娠……啊啊、还想更多的研究下去呢」`,
          );
          await era.printAndWait(
            `「${sc()}的研究成果、请从现在开始好好看着吧」`,
          );
          await era.printAndWait(
            `${target_name}一边这样说着一边淫荡地摇着腰……`,
          );
          // CFLAG:357  = 5（变量语义：CFLAG 族，357）
          kojo.交谈 = 5;
        } else if (
          era.get(`talent:${target}:76`) == 1 &&
          (kojo.交谈 <= 3 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait('');
          // CFLAG:357  = 4（变量语义：CFLAG 族，357）
          kojo.交谈 = 4;
        } else if (
          era.get(`talent:${target}:85`) == 1 &&
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

// @KOJO_MESSAGE_PALAMCNG_12（源段）：参数变动口上（PALAM 首超 Lv2/首绝顶）→ kojo_message_palamcng_12
// 家族分发：kojo_message_palamcng_family.register(12, …)
async function kojo_message_palamcng_12(rand) {
  const target = era_flag.target;
  const kojo = chara(target).kojo;
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%
  void rand;
  if (era.get(`tequip:${target}:45`)) {
    return 0;
  }

  if (game.train.失神) {
    return 0;
  }

  // PALAM:3 + UP:3（源 :4366）
  const P1 =
    (era.get(`palam:${target}:3`) || 0) + (era.get(`delta:${target}:3`) || 0);
  if (P1 > PALAMLV[2] && kojo.首次润滑Lv2 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      if (era_flag.selectcom == 50) {
        await era.printAndWait(`「用这样的粘液……涂在${sc()}的身体上吗」`);
      } else if (era.get(`talent:${target}:122`)) {
        await era.printAndWait(`「从${sc()}的阴茎里……分泌出了粘液！？」`);
      } else {
        await era.printAndWait(`「从${sc()}的阴道里……分泌出了粘液！？」`);
      }
    } else {
      if (era_flag.selectcom == 50) {
        await era.printAndWait(`「用这样的粘液……涂在${sc()}的身体上吗」`);
      } else if (era.get(`talent:${target}:122`)) {
        await era.printAndWait(`「从${sc()}的阴茎里……分泌出了粘液！？」`);
      } else {
        await era.printAndWait(`「从${sc()}的阴道里……分泌出了粘液！？」`);
      }
    }
    // CFLAG:TARGET:221  = 1（变量语义：CFLAG 族，TARGET:221）
    kojo.首次润滑Lv2 = 1;
  }

  // PALAM:5 + UP:5（源 :4397）
  const P2 =
    (era.get(`palam:${target}:5`) || 0) + (era.get(`delta:${target}:5`) || 0);
  if (P2 > PALAMLV[2] && kojo.首次欲情Lv2 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      if (era_flag.selectcom == 51) {
        await era.printAndWait(`「竟用……这样的薬物……${sc()}的思考乱成了一团」`);
      } else {
        await era.printAndWait(`「脑内的麻薬分泌吗……没法停止呢……」`);
      }
    } else {
      if (era_flag.selectcom == 51) {
        await era.printAndWait(`「竟用……这样的薬物……${sc()}的思考乱成了一团」`);
      } else {
        await era.printAndWait(`「脑内的麻薬分泌吗……没法停止呢……」`);
      }
    }
    // CFLAG:222  = 1（变量语义：CFLAG 族，222）
    kojo.首次欲情Lv2 = 1;
  }

  // PALAM:8 + UP:8（源 :4424）
  const P3 =
    (era.get(`palam:${target}:8`) || 0) + (era.get(`delta:${target}:8`) || 0);
  if (P3 > PALAMLV[2] && kojo.首次耻情Lv2 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「停手吧、这么羞耻的事情……${sc()}、要变的奇怪了」`,
      );
    } else {
      await era.printAndWait(
        `「停手吧、这么羞耻的事情……${sc()}、要变的奇怪了」`,
      );
    }
    // CFLAG:223  = 1（变量语义：CFLAG 族，223）
    kojo.首次耻情Lv2 = 1;
  }

  // PALAM:10 + UP:10（源 :4439）
  const P4 =
    (era.get(`palam:${target}:10`) || 0) + (era.get(`delta:${target}:10`) || 0);
  if (P4 > PALAMLV[2] && kojo.首次恐怖Lv2 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「呀啊啊、快住手、好可怕」`);
    } else {
      await era.printAndWait(`「呀啊啊、快住手、好可怕」`);
    }
    // CFLAG:224  = 1（变量语义：CFLAG 族，224）
    kojo.首次恐怖Lv2 = 1;
  }

  if (era.get(`nowex:${target}:0`) || (0 > 0 && kojo.首次C绝顶 == 0)) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「啊啊～、不行了、${sc()}、要高潮了～！」`);
    } else {
      await era.printAndWait(`「啊啊～、不行了、${sc()}、要高潮了～！」`);
    }
    // CFLAG:225  = 1（变量语义：CFLAG 族，225）
    kojo.首次C绝顶 = 1;
  }

  if (era.get(`nowex:${target}:1`) || (0 > 0 && kojo.首次V绝顶 == 0)) {
    if (era.get(`talent:${target}:76`) == 1) {
      await era.printAndWait(
        `「啊啊～、不行了、${sc()}的阴道、痉挛的停不下来啦～！」`,
      );
    } else if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「啊啊～、不行了、${sc()}的阴道、痉挛的停不下来啦～！」`,
      );
    } else {
      await era.printAndWait(
        `「啊啊～、不行了、${sc()}的阴道、痉挛的停不下来啦～！」`,
      );
    }
    // CFLAG:TARGET:226  = 1（变量语义：CFLAG 族，TARGET:226）
    kojo.首次V绝顶 = 1;
  }

  if (era.get(`nowex:${target}:2`) || (0 > 0 && kojo.首次A绝顶 == 0)) {
    if (era.get(`talent:${target}:76`) == 1) {
      await era.printAndWait(
        `「不行、不要啊啊～！　${sc()}的肛门要、肛门要、高潮了～！」`,
      );
    } else if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「不行、不要啊啊～！　${sc()}的肛门要、肛门要、高潮了～！」`,
      );
    } else {
      await era.printAndWait(
        `「不行、不要啊啊～！　${sc()}的肛门要、肛门要、高潮了～！」`,
      );
    }
    // CFLAG:227  = 1（变量语义：CFLAG 族，227）
    kojo.首次A绝顶 = 1;
  }

  if (era.get(`nowex:${target}:3`) || (0 > 0 && kojo.首次B绝顶 == 0)) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「这不可能、胸部、胸部也要高潮了啊～！」`);
    } else {
      await era.printAndWait(`「这不可能、胸部、胸部也要高潮了啊～！」`);
    }
    // CFLAG:TARGET:228  = 1（变量语义：CFLAG 族，TARGET:228）
    kojo.首次B绝顶 = 1;
  }

  // UP:11 + UP:12（源 :4516）
  const A =
    (era.get(`delta:${target}:11`) || 0) + (era.get(`delta:${target}:12`) || 0); // A = UP:11 + UP:12
  if (game.train.处女丧失 == 1 && kojo.处女丧失 == 0) {
    // tflag:3 处女丧失事件

    if (game.train.主人导致处女丧失 == 1) {
      // tflag:20

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (A < 500 || game.system.反抗刻印回避 == 1) // tflag:150
      ) {
        await era.printAndWait(`「${sc()}、终于成为大人了呢……！」`);
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (A < 500 || game.system.反抗刻印回避 == 1) // tflag:150
      ) {
        await era.printAndWait(`「尽情的、为怀上孩子而做爱吧……！」`);
      } else {
        await era.printAndWait(`「咿呀～、咿呀啊～」`);
      }
    } else {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「${sc()}、终于成为大人了呢……！」`);
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「讨厌、才不想和你生孩子呢」`);
      } else {
        await era.printAndWait(`「咿呀～、咿呀啊～」`);
      }
    }
    // CFLAG:TARGET:229  = 1（变量语义：CFLAG 族，TARGET:229）
    kojo.处女丧失 = 1;
  }
}

// @KOJO_MESSAGE_MARKCNG_12（源段）：参数变动口上（PALAM 首超 Lv2/首绝顶）→ kojo_message_palamcng_12
// 家族分发：kojo_message_palamcng_family.register(12, …)
async function kojo_message_markcng_12(rand) {
  const target = era_flag.target;
  const kojo = chara(target).kojo;
  void rand;
  if (era.get(`tequip:${target}:45`)) {
    return 0;
  }

  if (game.system.苦痛刻印变动 == 3 && kojo.苦痛刻印Lv3 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「啊嘎嘎、啊嘎啊～、痛～」`);
    } else {
      await era.printAndWait(`「啊嘎嘎、啊嘎啊～、痛～」`);
    }
    // CFLAG:297  = 1（变量语义：CFLAG 族，297）
    kojo.苦痛刻印Lv3 = 1;
  }

  if (game.system.快乐刻印变动 == 3 && kojo.快乐刻印Lv3 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「不行、不行了、好、好有感觉啊～！」`);
    } else {
      await era.printAndWait(`「不行、不行了、好、好有感觉啊～！」`);
    }
    // CFLAG:298  = 1（变量语义：CFLAG 族，298）
    kojo.快乐刻印Lv3 = 1;
  }

  if (game.system.屈服刻印变动 == 3 && kojo.屈服刻印Lv3 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「再、再也不会反抗你了……」`);
    } else {
      await era.printAndWait(`「再、再也不会反抗你了……」`);
    }
    // CFLAG:299  = 1（变量语义：CFLAG 族，299）
    kojo.屈服刻印Lv3 = 1;
  }

  if (game.system.反抗刻印变动 == 3 && kojo.反抗刻印Lv3 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「去死吧……」`);
    } else {
      await era.printAndWait(`「去死吧……」`);
    }
    // CFLAG:300  = 1（变量语义：CFLAG 族，300）
    kojo.反抗刻印Lv3 = 1;
  }
}

kojo_message_com_family.register(12, kojo_message_com_12);
kojo_message_palamcng_family.register(12, kojo_message_palamcng_12);
kojo_message_markcng_family.register(12, kojo_message_markcng_12);
self_kojo_family.register(12, self_kojo_k12);
gohoubi_after_koujo_family.register(12, (cid, choice) =>
  gohoubi_after_koujo_k12(undefined, cid, choice),
);
osioski_koujo_family.register(12, (cid, choice) =>
  osioki_koujo_k12(undefined, cid, choice),
);
gobi_koujo_family.register(12, gobi_koujo_k12);
ntr_koujo_family.register(12, ntr_koujo_k12);
benki_koujo_family.register(12, benki_koujo_k12);
exucution_koujo_family.register(12, exucution_koujo_k12);
museum_koujo_family.register(12, museum_koujo_k12);
banishment_koujo_family.register(12, banishment_koujo_k12);
public_exucution_koujo_family.register(12, public_exucution_koujo_k12);
grotesque_koujo_family.register(12, grotesque_koujo_k12);
enterenemy_koujo_family.register(12, enterenemy_koujo_k12);
gohoubi_request_koujo_family.register(12, gohoubi_request_koujo_k12);
ryouzyoku_kojo_family.register(12, dungeon_ryouzyoku_k12);
ryouzyoku_after_kojo_family.register(12, dungeon_ryouzyoku_after_k12);
dungeon_victory_family.register(12, dungeon_victory_k12);
dungeon_attack_family.register(12, dungeon_attack_k12);

// @SELF_KOJO_K12（:4614-4869）：事件口上（self_kojo family）。TFLAG:13 事件
// 类型分档：1 调教后自慰 / 2 百合PLAY / 3 朝口交 / 4 调教后性交 / 5 夜袭 /
// 6 成熟出售（SELL_MATURO_K0，#338 接通）/ 9-10 妊娠发觉前段 / 11 妊娠发觉 /
// 12 生产 / 999-998 育儿室·亲离。q 为自慰妄想对象（kojo-system.self_kojo 传）。
// 空 PRINTFORMW 台词槽未填写，保持空输出。
async function self_kojo_k12(rand, q) {
  const target = era_flag.target;
  const kojo = chara(target).kojo;
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%
  void rand;
  void q;

  if (game.train.初吻与自我口上 == 1) {
    if (era.get(`talent:${target}:9`) == 1) {
      await era.printAndWait(`「啊哈、啊哈哈、啊哈哈哈」`);
    } else if (q == 1) {
      await era.printAndWait(
        `「${sc()}……一想到女孩子的裸体……就自慰起来了呢……」`,
      );
    } else if (q == 2) {
      await era.printAndWait(`「${sc()}……果然对和异种交配……很有兴趣呢」`);
    } else {
      if (
        era.get(`talent:${target}:76`) &&
        (kojo.调教后自慰 < 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「不行了、停不下来了～」`);
        // CFLAG:261  = 4（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 4;
      } else if (
        era.get(`talent:${target}:85`) &&
        (kojo.调教后自慰 < 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊啊、停不下来了、变成猴子了～！」`);
        // CFLAG:261  = 3（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 3;
      } else if (
        era.get(`abl:${target}:31`) >= 3 &&
        (kojo.调教后自慰 < 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「这样自慰下去的话……要变成白痴了……」`);
        // CFLAG:261  = 2（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 2;
      } else if (kojo.调教后自慰 < 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「嗯、咕呜……呜嗯……」`);
        // CFLAG:261  = 1（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 1;
      }
    }
  }

  if (game.train.初吻与自我口上 == 2) {
    if (
      era.get(`talent:${target}:76`) &&
      (kojo.百合PLAY < 5 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:262  = 5（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 5;
    } else if (
      era.get(`talent:${target}:85`) &&
      (kojo.百合PLAY < 4 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:262  = 4（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 4;
    } else if (
      era.get(`abl:${target}:33`) >= 3 &&
      (kojo.百合PLAY < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:262  = 3（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 3;
    } else if (
      era.get(`abl:${target}:22`) >= 3 &&
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
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.朝口交 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「早上好。啊啊、生理现象……就交给${sc()}吧♪」`);
      // CFLAG:263  = 3（变量语义：CFLAG 族，263）
      kojo.朝口交 = 3;
    } else if (
      era.get(`talent:${target}:85`) &&
      (kojo.朝口交 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「早上好。虽然早了点、开始研究吧。早上的话脑细胞会活性化呦」`,
      );
      // CFLAG:263  = 3（变量语义：CFLAG 族，263）
      kojo.朝口交 = 3;
    } else if (
      era.get(`abl:${target}:16`) >= 5 &&
      (kojo.朝口交 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「嗯、${sc()}的好意。你就不用动了」`);
      // CFLAG:263  = 2（变量语义：CFLAG 族，263）
      kojo.朝口交 = 2;
    } else if (kojo.朝口交 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「不要在意。只是我一时兴起」`);
      // CFLAG:263  = 1（变量语义：CFLAG 族，263）
      kojo.朝口交 = 1;
    }
  }

  if (game.train.初吻与自我口上 == 4) {
    if (
      era.get(`abl:${target}:2`) >= 4 &&
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
      await era.printAndWait(
        `「呵呵、能陪我加一下班吗？　你和${sc()}的……淫乱的实验♪」`,
      );
      // CFLAG:265  = 1（变量语义：CFLAG 族，265）
      kojo.夜袭 = 1;
    }
  }

  if (game.train.初吻与自我口上 == 6) {
    if (era.get(`talent:${target}:85`) && era.get(`mark:${target}:3`) < 3) {
      await era.printAndWait('');
    } else if (era.get(`mark:${target}:3`) == 3) {
      await era.printAndWait('');
    } else if (era.get(`talent:${target}:76`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    if (era.get(`talent:${target}:122`) != 1) {
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

    if (era.get(`talent:${target}:9`) == 1) {
      await era.printAndWait('');
      await era.printAndWait(`「不研究不研究的话……」`);
    } else if (
      era.get(`talent:${target}:85`) &&
      chara(target).event.妊娠相手 == 1
    ) {
      await era.printAndWait(`「来摸一下肚子……这是和你的爱的结晶哦……♪」`);
    } else if (
      era.get(`talent:${target}:136`) &&
      chara(target).event.妊娠相手 == 5
    ) {
      await era.printAndWait(`「终于……作为交尾的结果、怀上来狗的孩子了……♪」`);
    } else {
      await era.printAndWait(`「原来如此、怀上孩子了啊……」`);
    }
    // CFLAG:271  = 1（变量语义：CFLAG 族，271）
    kojo.妊娠发觉 = 1;
  }

  if (game.train.初吻与自我口上 == 12) {
    if (kojo.生产 >= 1) {
      return 0;
    }

    if (era.get(`talent:${target}:9`) == 1) {
      await era.printAndWait('');
    } else if (
      era.get(`talent:${target}:85`) &&
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
    if (era.get(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  }

  if (game.train.初吻与自我口上 == 998) {
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

// @DUNGEON_RYOUZYOKU_K12（:4870-4959）：迷宫凌辱前口上（ryouzyoku family）。处女/非处女 × 性格素质分档（冷漠/低姿态/刚强/胆怯等），含 A敏感/口交经验追加句。
async function dungeon_ryouzyoku_k12() {
  const target = era_flag.target;
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%
  if (era.get(`talent:${target}:0`) == 1) {
    await era.printAndWait(`「噫～、请你们、冷、冷静一点……」`);

    if (
      era.get(`talent:${target}:21`) == 1 ||
      era.get(`talent:${target}:22`) == 1
    ) {
      await era.printAndWait(`「救命啊……」`);

      return 0;
    } else if (
      era.get(`talent:${target}:17`) == 1 ||
      era.get(`talent:${target}:31`) == 1 ||
      era.get(`talent:${target}:36`) == 1
    ) {
      await era.printAndWait(
        `「你、你们、快看、我还是处女哦。所以、请至少饶我一命……」`,
      );

      if (
        era.get(`talent:${target}:106`) == 1 ||
        era.get(`exp:${target}:1`) > 0
      ) {
        await era.printAndWait(`「不、不管怎么用我的肛门都可以哦……」`);
      }

      if (era.get(`exp:${target}:22`) > 0) {
        await era.printAndWait(`「口交的经验我有、一定、一定能满足你们的！」`);
      }
    } else if (
      era.get(`talent:${target}:11`) == 1 ||
      era.get(`talent:${target}:12`) == 1 ||
      era.get(`talent:${target}:15`) == 1 ||
      era.get(`talent:${target}:30`) == 1 ||
      era.get(`talent:${target}:34`) == 1
    ) {
      await era.printAndWait(
        `「怎、怎么能认输啊！　区区凌辱……${sc()}是绝对不会认输的！」`,
      );
    } else if (
      era.get(`talent:${target}:10`) == 1 ||
      era.get(`talent:${target}:26`) == 1
    ) {
      await era.printAndWait(`「已、已经完蛋了……」`);
    } else {
      await era.printAndWait(`「你、你们……能商量一下吗。如果听得懂的话……」`);
    }
  } else {
    await era.printAndWait(`「不、不好意思。能请你们、冷、冷静一下吗……」`);

    if (
      era.get(`talent:${target}:21`) == 1 ||
      era.get(`talent:${target}:22`) == 1
    ) {
      await era.printAndWait(`「拜托了……」`);

      return 0;
    } else if (
      era.get(`talent:${target}:17`) == 1 ||
      era.get(`talent:${target}:31`) == 1 ||
      era.get(`talent:${target}:36`) == 1
    ) {
      await era.printAndWait(
        `「做、做爱的经验我有哦。一定能满足你们的。所以、请至少饶我一命……」`,
      );

      if (
        era.get(`talent:${target}:106`) == 1 ||
        era.get(`exp:${target}:1`) > 0
      ) {
        await era.printAndWait(`「肛、肛门的话随便怎么用都可以……所以……」`);
      }

      if (era.get(`exp:${target}:22`) > 0) {
        await era.printAndWait(`「口交的经验我有、一定、一定能满足你们的！」`);
      }
    } else if (
      era.get(`talent:${target}:11`) == 1 ||
      era.get(`talent:${target}:12`) == 1 ||
      era.get(`talent:${target}:15`) == 1 ||
      era.get(`talent:${target}:30`) == 1 ||
      era.get(`talent:${target}:34`) == 1
    ) {
      await era.printAndWait(
        `「怎、怎么能认输啊！　区区凌辱……${sc()}是绝对不会认输的！」`,
      );
    } else if (
      era.get(`talent:${target}:10`) == 1 ||
      era.get(`talent:${target}:26`) == 1
    ) {
      await era.printAndWait(`「已、已经完蛋了……」`);
    } else {
      await era.printAndWait(`「你、你们……能商量一下吗。如果听得懂的话……」`);
    }
  }

  return 0;
}

// @DUNGEON_RYOUZYOKU_AFTER_K12（:4960-5023）：迷宫凌辱后口上。处女/非处女 × EXP 经验分档感想。
async function dungeon_ryouzyoku_after_k12() {
  const target = era_flag.target;
  if (era.get(`talent:${target}:0`) == 1) {
    await era.printAndWait(`（得救了……连贞洁也、守住了吗……）`);

    if (
      era.get(`talent:${target}:21`) == 1 ||
      era.get(`talent:${target}:22`) == 1
    ) {
      await era.printAndWait(`「……」`);

      return 0;
    }

    if (era.get(`exp:${target}:1`) > 20) {
      await era.printAndWait(`「肛门……咿呀～」`);
      await era.printAndWait(`「已经破破烂烂的了……」`);
    }

    if (era.get(`exp:${target}:22`) > 20) {
      await era.printAndWait(`「啊、下巴……」`);
    }

    if (era.get(`exp:${target}:20`) > 20) {
      await era.printAndWait(`「呜欸欸……这就是精液的味道吗……」`);
    }
  } else {
    await era.printAndWait(`（只有小命还在、算是得救了吗……）`);

    if (
      era.get(`talent:${target}:21`) == 1 ||
      era.get(`talent:${target}:22`) == 1
    ) {
      await era.printAndWait(`「……」`);

      return 0;
    }

    if (era.get(`exp:${target}:0`) > 20) {
      await era.printAndWait(`「小穴……再也变不回去了」`);
    }

    if (era.get(`exp:${target}:1`) > 20) {
      await era.printAndWait(`「肛门……咿呀～」`);
      await era.printAndWait(`「已经破破烂烂的了……」`);
    }

    if (era.get(`exp:${target}:22`) > 20) {
      await era.printAndWait(`「啊、下巴……」`);
    }

    if (era.get(`exp:${target}:20`) > 20) {
      await era.printAndWait(`「呜欸欸……这就是精液的味道吗……」`);
    }
  }

  return 0;
}

// @DUNGEON_VICTORY_K12（:5278-5331）：迷宫胜利口上（victory family）。
async function dungeon_victory_k12(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const a = era_flag.target; // 源 A（迷宫胜利时目标角色，K10 dungeon_victory_k10 同款）
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%
  await era.printAndWait(`「${sc()}的胜率达到了95％哦」`);

  if (
    era.get(`talent:${target}:21`) == 1 ||
    era.get(`talent:${target}:22`) == 1
  ) {
    await era.printAndWait(`「这是毋庸置疑的」`);

    return 0;
  } else if (
    era.get(`talent:${target}:11`) == 1 ||
    era.get(`talent:${target}:12`) == 1 ||
    era.get(`talent:${target}:15`) == 1 ||
    era.get(`talent:${target}:30`) == 1 ||
    era.get(`talent:${target}:34`) == 1
  ) {
    if (rand_n(3) == 0) {
      await era.printAndWait(`「你们最好再多动动脑筋呢」`);
    } else if (rand_n(2) == 0) {
      await era.printAndWait(`「${sc()}的计算是完美的」`);
    } else {
      await era.printAndWait(`「不管模拟几次结果都是一样的」`);
    }
  } else if (
    era.get(`talent:${target}:10`) == 1 ||
    era.get(`talent:${target}:26`) == 1
  ) {
    await era.printAndWait(`「应该、没问题吧、没问题……」`);

    return 0;
  } else {
    if (rand_n(3) == 0) {
      await era.printAndWait(`「${sc()}没有输的理由」`);
    } else if (rand_n(2) == 0) {
      await era.printAndWait(`「下次模拟一下新战术试试吧」`);
    } else {
      await era.printAndWait(`「${sc()}每次战斗后都会有进步呢」`);
    }
  }

  if (
    (era.get(`base:${a}:0`) * 100) / era.get(`maxbase:${a}:0`) < 50 ||
    (era.get(`base:${a}:1`) * 100) / era.get(`maxbase:${a}:1`) < 50
  ) {
    await era.printAndWait(
      `「……然而、这是预料外的攻击……如果修正计算公式的话」`,
    );
  } else {
    await era.printAndWait(`「这种程度的攻击、完全在预料的范围内」`);
  }

  return 0;
}

// @DUNGEON_ATTACK_K12（:5332-5420）：迷宫袭击口上（attack family）。
async function dungeon_attack_k12(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%
  if (chara(target).invasion.状态 == 2) {
    // CFLAG:1 角色状态（2 = 侵攻中）

    if (
      era.get(`talent:${target}:21`) == 1 ||
      era.get(`talent:${target}:22`) == 1
    ) {
      await era.printAndWait(`「……我要上了」`);

      return 0;
    } else if (
      era.get(`talent:${target}:11`) == 1 ||
      era.get(`talent:${target}:12`) == 1 ||
      era.get(`talent:${target}:15`) == 1 ||
      era.get(`talent:${target}:30`) == 1 ||
      era.get(`talent:${target}:34`) == 1
    ) {
      if (rand_n(3) == 0) {
        await era.printAndWait(`「虽然只是计算、这个攻击应该是无法闪避的！」`);
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「来吧、还要攻击几次才会死呢？」`);
      } else {
        await era.printAndWait(`「${sc()}是绝对不会输的哦！　证明给你看！」`);
      }
    } else if (
      era.get(`talent:${target}:10`) == 1 ||
      era.get(`talent:${target}:26`) == 1
    ) {
      await era.printAndWait(`「这种程度、也在预料范围内哦！」`);

      return 0;
    } else {
      if (rand_n(3) == 0) {
        await era.printAndWait(`「你的胜率连万分之一也没有哦！」`);
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「躲躲看吧！　试着超越${sc()}的计算吧！」`);
      } else {
        await era.printAndWait(`「${sc()}是……绝对无法战胜的！」`);
      }
    }
  } else {
    if (
      era.get(`talent:${target}:21`) == 1 ||
      era.get(`talent:${target}:22`) == 1
    ) {
      await era.printAndWait(`「……我要上了」`);

      return 0;
    } else if (
      era.get(`talent:${target}:11`) == 1 ||
      era.get(`talent:${target}:12`) == 1 ||
      era.get(`talent:${target}:15`) == 1 ||
      era.get(`talent:${target}:30`) == 1 ||
      era.get(`talent:${target}:34`) == 1
    ) {
      if (rand_n(3) == 0) {
        await era.printAndWait(`「要我来帮你算一算失败的几率吗？」`);
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「好想教育一下无知的你呢、用这个美妙的世界！」`,
        );
      } else {
        await era.printAndWait(
          `「你是绝对胜不了的……让${sc()}来证明这一点吧！」`,
        );
      }
    } else if (
      era.get(`talent:${target}:10`) == 1 ||
      era.get(`talent:${target}:26`) == 1
    ) {
      await era.printAndWait(`「这种程度、也在预料范围内哦！」`);

      return 0;
    } else {
      if (rand_n(3) == 0) {
        await era.printAndWait(`「魔族的优秀之处……真想从你那学习一下呢」`);
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「${sc()}的胜率超过9成了呢！」`);
      } else {
        await era.printAndWait(`「计算之中的行动……真无聊呢」`);
      }
    }
  }

  return 0;
}

// @EXUCUTION_KOUJO_K12（:5603-5620）：处刑口上。
async function exucution_koujo_k12(rand) {
  void rand;
  const target = era_flag.target;
  const sc = (x = target) => self_call(x); // %SELF_CALL(...)%
  if (game.event.犬射精或处刑口上 == 4) {
    await era.printAndWait(`「不要啊、${sc()}、要变成白痴了……」`);
  } else if (game.event.犬射精或处刑口上 == 5) {
    await era.printAndWait(`「嗯……知道了」`);
  } else if (game.event.犬射精或处刑口上 == 6) {
    await era.printAndWait(`「这样子、好讨厌！」`);
  } else if (game.event.犬射精或处刑口上 == 7) {
    await era.printAndWait('');
  }
}

// @MUSEUM_KOUJO_K12（:5621-5656）：博物馆口上（TFLAG:500 分档）。
async function museum_koujo_k12(rand) {
  void rand;
  if (game.event.博物馆口上 == 0) {
    await era.printAndWait(`「不要啊、变成石头什么的……」`);
  } else if (game.event.博物馆口上 == 1) {
    await era.printAndWait(`「救命！」`);
  } else if (game.event.博物馆口上 == 2) {
    await era.printAndWait(`「咕、咕欸欸……」`);
  } else if (game.event.博物馆口上 == 3) {
    await era.printAndWait(`「真是被要求摆出了耻辱的姿势呢…这样就行了吧？」`);
  } else if (game.event.博物馆口上 == 4) {
    await era.printAndWait(
      `「身、身体、结构被改变……的感觉、什么的…真是稀奇的…体…验」`,
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

// @BANISHMENT_KOUJO_K12（:5657-5677?）：流放口上（TFLAG:510）。
async function banishment_koujo_k12(rand) {
  void rand;
  const target = era_flag.target;
  const sc = (x = target) => self_call(x); // %SELF_CALL(...)%
  if (game.event.流放口上 == 0) {
    await era.printAndWait(`「${sc()}的研究、就到此为止了吗……」`);
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

// @PUBLIC_EXUCUTION_KOUJO_K12（:5678-5692?）：公开处刑口上（TFLAG:520）。
async function public_exucution_koujo_k12(rand) {
  void rand;
  if (game.event.公开处刑口上 == 0) {
    await era.printAndWait(`「咿呀啊～！　救命啊～！」`);
  } else if (game.event.公开处刑口上 == 1) {
    await era.printAndWait(`「我不想死……谁来救救我……」`);
  } else if (game.event.公开处刑口上 == 2) {
    await era.printAndWait('');
  }
}

// @GROTESQUE_KOUJO_K12（:5693-5719?）：猎奇处刑口上（TFLAG:530）。
async function grotesque_koujo_k12(rand) {
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

// @ENTERENEMY_KOUJO_K12（:5720-5737?）：遭遇敌人口上。
async function enterenemy_koujo_k12(rand) {
  void rand;
  const target = era_flag.target;
  const a = era_flag.target; // 源 A（目标角色）
  const sc = (x = target) => self_call(x); // %SELF_CALL(...)%
  if (era.get(`talent:${a}:21`) == 1 || era.get(`talent:${a}:22`) == 1) {
    await era.printAndWait(`「${sc(a)}的计算是不会错的」`);
  } else if (
    era.get(`talent:${a}:11`) == 1 ||
    era.get(`talent:${a}:12`) == 1 ||
    era.get(`talent:${a}:15`) == 1 ||
    era.get(`talent:${a}:30`) == 1 ||
    era.get(`talent:${a}:34`) == 1
  ) {
    await era.printAndWait(
      `「${sc(a)}的计算如果无误的话、魔王的失败已经确定下来了！」`,
    );
  } else if (era.get(`talent:${a}:10`) == 1 || era.get(`talent:${a}:26`) == 1) {
    await era.printAndWait(`「如果能再稍微多做点研究就好了……」`);
  } else {
    await era.printAndWait(`「${sc(a)}的胜率有98％哦」`);
  }
}

// @GOHOUBI_REQUEST_KOUJO_K12（:5738-5783?）：请求褒美口上。
async function gohoubi_request_koujo_k12(rand) {
  void rand;
  const target = era_flag.target;
  const a = era_flag.target; // 源 A（目标角色）
  const sc = (x = target) => self_call(x); // %SELF_CALL(...)%
  if (chara(a).stronghold.要求奖赏 == 0) {
    await era.printAndWait(`${chara_callname(a)}想要钱的样子`);
    await era.printAndWait(`「请给我研究资金！」`);
  } else if (
    chara(a).stronghold.要求奖赏 == 1 ||
    chara(a).stronghold.要求奖赏 == 2 ||
    chara(a).stronghold.要求奖赏 == 3
  ) {
    // 原作是一整行：无后缀 PRINTFORM/PRINT 连续
    // 不换行，末行 PRINTFORMW 才收行。兽名三档的判据（:5748/:5750/:5752）提到
    // 语句外当取值、文本留在输出语句里（保真锁按序核对 ERB 片段，#625）
    const beast_word =
      chara(a).stronghold.要求奖赏 == 1
        ? '狗'
        : chara(a).stronghold.要求奖赏 == 2
          ? '猪'
          : '马';
    await era.printAndWait(
      `${chara_callname(a)}提出了与` + beast_word + `交尾的要求`,
    );
    await era.printAndWait(`「想要继续进行异种交配实验」`);
  } else if (chara(a).stronghold.要求奖赏 == 4) {
    await era.printAndWait(`${chara_callname(a)}想要归来的吻`);
    await era.printAndWait(`「你的吻对研究很有帮助」`);
  } else if (chara(a).stronghold.要求奖赏 == 5) {
    await era.printAndWait(`${chara_callname(a)}想要和你做爱`);
    await era.printAndWait(`「想要你的精液呢」`);
  } else if (chara(a).stronghold.要求奖赏 == 6) {
    await era.printAndWait(`${chara_callname(a)}想要精液`);
    await era.printAndWait(`「一喝下你的精液、头脑就格外清晰呢」`);
  } else if (chara(a).stronghold.要求奖赏 == 7) {
    await era.printAndWait(`${chara_callname(a)}想要开乱交派对`);
    await era.printAndWait(`「偶尔也想开开派对试试呢」`);
  } else if (chara(a).stronghold.要求奖赏 == 8) {
    await era.printAndWait(`${chara_callname(a)}想要你的尿液作为报酬`);
    await era.printAndWait(`「只要是你的东西不管是什么我都会很开心呢」`);
  } else if (chara(a).stronghold.要求奖赏 == 9) {
    await era.printAndWait(`${chara_callname(a)}想要处男作为报酬`);
    await era.printAndWait(`「对不懂性知识的家伙进行教育是${sc(a)}的义务呢」`);
  }
}

// @GOHOUBI_AFTER_KOUJO_K12（:5784-5863）：奖赏结算后口上（choice 参数分档，原作 TFLAG:18 双语义槽裁定读 choice——kojo-dungeon-after.js:21）。
async function gohoubi_after_koujo_k12(rand, cid, choice) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  void cid;
  const target = era_flag.target;
  const a = era_flag.target; // 源 A（分发方 gohoubi_after_koujo 已把 target 置为 cid）
  const sc = (x = target) => self_call(x); // %SELF_CALL(A)%
  void rand_n;
  if (choice == 0) {
    await era.printAndWait(`「诶诶、怎么能这样」`);
    return 0;
  } else if (choice == 1) {
    await era.printAndWait(
      `「太棒了～！　下次${sc(a)}也得拿出什么研究成果呢！」`,
    );
    return 0;
  } else if (choice == 2) {
    if (chara(a).stronghold.要求奖赏 == 0) {
      await era.printAndWait(`「太棒了～！　这样一来研究就能更进一步了」`);
    } else if (chara(a).stronghold.要求奖赏 == 1) {
      if (era.get(`talent:${a}:0`) == 1) {
        await era.printAndWait(`「把处女献给狗什么的、不错的纪念日呢」`);
      } else {
        await era.printAndWait(`「太棒了～！　研究研究♪」`);
      }
    } else if (chara(a).stronghold.要求奖赏 == 2) {
      if (era.get(`talent:${a}:0`) == 1) {
        await era.printAndWait(`「把处女献给猪什么的、不错的纪念日呢」`);
      } else {
        await era.printAndWait(`「太棒了～！　早就想研究猪的生殖行为试试了♪」`);
      }
    } else if (chara(a).stronghold.要求奖赏 == 3) {
      if (era.get(`talent:${a}:0`) == 1) {
        await era.printAndWait(`「把处女献给马什么的、不错的纪念日呢」`);
      } else {
        await era.printAndWait(
          `「太棒了～！　与马做爱阴道能不能承受住、就让我自己试试吧」`,
        );
      }
    } else if (chara(a).stronghold.要求奖赏 == 4) {
      await era.printAndWait(`「亲脸蛋也行哦、啾的一下」`);
    } else if (chara(a).stronghold.要求奖赏 == 5) {
      if (era.get(`abl:${a}:2`) > era.get(`abl:${a}:3`)) {
        await era.printAndWait(`「绝对要受精哦！　好期待呢！」`);
      } else {
        await era.printAndWait(`「无论何时都想受精呢……这次也拜托了」`);
      }
    } else if (chara(a).stronghold.要求奖赏 == 6) {
      await era.printAndWait(`「这可以用来美容呢、在研究中。谢谢」`);
    } else if (chara(a).stronghold.要求奖赏 == 7) {
      if (era.get(`talent:${a}:0`) == 1) {
        await era.printAndWait(`「偶尔把研究忘掉、来做爱吧～！」`);
      } else {
        await era.printAndWait(`「偶尔把研究忘掉、来做爱吧～！」`);
      }
    } else if (chara(a).stronghold.要求奖赏 == 8) {
      await era.printAndWait(`「饮尿疗法究竟效果如何、下次就研究看看吧」`);
    } else if (chara(a).stronghold.要求奖赏 == 9) {
      if (era.get(`abl:${a}:2`) > era.get(`abl:${a}:3`)) {
        await era.printAndWait(`「你、觉得怎样？　这可是女人的阴部哦」`);
      } else {
        await era.printAndWait(`「你、觉得怎样？　这可是女人的肛门哦」`);
      }
    }
  }
}

// @OSIOKI_KOUJO_K12（:5864-5926）：惩罚结算后口上（choice 参数分档，同 gohoubi_after 裁定）。
async function osioki_koujo_k12(rand, cid, choice) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  void cid;
  const target = era_flag.target;
  const a = era_flag.target; // 源 A（分发方 gohoubi_after_koujo 已把 target 置为 cid）
  const sc = (x = target) => self_call(x); // %SELF_CALL(A)%
  void rand_n;
  if (choice == 0) {
    await era.printAndWait(`「请你、不要吓我……」`);
  } else if (choice == 1) {
    if (era.get(`abl:${a}:21`) >= 3) {
      await era.printAndWait(`「痛觉转换成了快感……好有效啊啊啊啊♪」`);
    } else {
      await era.printAndWait(`「呀啊啊啊啊啊！」`);
    }
  } else if (choice == 2) {
    if (era.get(`abl:${a}:17`) >= 4) {
      await era.printAndWait(`「没有一点知性的母猪般的自慰……好好看着吧♪」`);
    } else {
      await era.printAndWait(`「呜呜～、这样没有一点知性的行为……」`);
    }
  } else if (choice == 3) {
    if (era.get(`abl:${a}:17`) >= 6) {
      await era.printAndWait(`「在路上排泄、${sc(a)}、可真是个笨蛋啊～♪」`);
    } else {
      await era.printAndWait(`「呜呜～、这样没有一点知性的行为……」`);
    }
  } else if (choice == 4) {
    if (era.get(`abl:${a}:21`) >= 3) {
      await era.printAndWait(`「再更多的、更多的用力鞭笞我吧♪　啊呜～♪」`);
    } else {
      await era.printAndWait(`「唔……天才、必须在痛苦中学习～」`);
    }
  } else if (choice == 5) {
    if (era.get(`talent:${a}:88`) == 1 || era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait(
        `「啊啊啊、这样尿出来、要变成白痴了♪　${sc(a)}、要变成白痴了啊♪」`,
      );
    } else {
      await era.printAndWait(`「太不卫生了……${sc(a)}好失败呢」`);
    }
  } else if (choice == 6) {
    await era.print(`「唉、扫厕所吗……」`);
  } else if (choice == 7) {
    await era.print(`「明明对研究来说体力是必要的……」`);
  } else if (choice == 8) {
    await era.printAndWait(`「薬物的影响……也当成一种研究的话……」`);
  } else if (choice == 9) {
    await era.printAndWait('');
  }
}

// @GOBI_KOUJO_K12（:5927-5957）：语尾口上（gobi family，ARG:0 → arg0 参数）。
function gobi_koujo_k12(arg0, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  if (arg0 == 1) {
    return `的哟♪`;
  } else if (arg0 == 2) {
    return `的呢！`;
  } else if (arg0 == 3) {
    return `的哟……。`;
  } else if (arg0 == 4) {
    return `的样子……呢。`;
  } else if (arg0 == 5) {
    return `的哟……。`;
  } else {
    if (rand_n(3) == 0) {
      return `的哟。`;
    } else if (rand_n(2) == 0) {
      return `的样子哦。`;
    } else {
      return `什么的。`;
    }
  }
}

// @COLOSSEUM_KOJO_12（:5421-5525）：死斗场专用口上（TEQUIP:55 时由守卫岔来）。
// 本地函数不进 family 分发（同 dog_kojo_12）。
async function colosseum_kojo_12(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%
  void rand_n;
  if (era_flag.selectcom == 55) {
    if (era.get(`base:${target}:1`) <= 0) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    return 0;
  }

  if (era_flag.selectcom == 56) {
    if (era.get(`base:${target}:1`) <= 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「已经不行了……要完了……」`);
      } else {
        await era.printAndWait(`「已经不行了……要完了……」`);
      }
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「${sc()}是绝对……不会认输的！」`);
      } else {
        await era.printAndWait(`「${sc()}是绝对……不会认输的！」`);
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
      // tflag:400
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
      // tflag:400
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

// @NTR_KOUJO_K12（:5526-5602）：NTR 事件口上（ntr_koujo_family）。P = NTR 事件
// 类型（1 处女献出 / 2 肛门 / 3 家畜 / 4 授精 / 5+ 绝顶等），记位 CFLAG:650-657。
async function ntr_koujo_k12(rand, P) {
  void rand;
  const target = era_flag.target;
  const kojo = chara(target).kojo;
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%
  P = P ?? 0;
  if (kojo.NTR再捕获 == 0) {
    // CFLAG:650  = 1（变量语义：CFLAG 族，650）
    kojo.NTR再捕获 = 1;
  }

  if (P == 1) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「看到了吗？　魔王大人……${sc()}、把处女献出去了哦」`,
      );
    } else {
      await era.printAndWait(`「好开心……${sc()}、把处女献出去了」`);
    }
    // CFLAG:651  = 1（变量语义：CFLAG 族，651）
    kojo.NTR_651 = 1;
  } else if (P == 2) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「看到了吗？　魔王大人……${sc()}的肛门、因为狂王大人……而觉醒了哦」`,
      );
    } else {
      await era.printAndWait(`「好开心……${sc()}的身体是狂王大人的东西了……」`);
    }
    // CFLAG:652  = 1（变量语义：CFLAG 族，652）
    kojo.NTR_652 = 1;
  } else if (P == 3) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「魔王大人看到了吗？　${sc()}、变成狂王大人的家畜了哦……」`,
      );
    } else {
      await era.printAndWait(`「${sc()}是狂王大人的……家畜哦……」`);
    }
    // CFLAG:653  = 1（变量语义：CFLAG 族，653）
    kojo.NTR_653 = 1;
  } else if (P == 4) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「魔王大人快看吧、${sc()}被狂王大人授精的地方……」`,
      );
    } else {
      await era.printAndWait(`「${sc()}、要怀上……狂王大人的孩子了！」`);
    }
    // CFLAG:654  = 1（变量语义：CFLAG 族，654）
    kojo.NTR_654 = 1;
  } else if (P == 5) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(`「好厉害啊、狂王大人、好厉害啊！」`);
    } else {
      await era.printAndWait(`「好厉害啊、狂王大人、好厉害啊！」`);
    }
    // CFLAG:655  = 1（变量语义：CFLAG 族，655）
    kojo.NTR_655 = 1;
  } else if (P == 6) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(`「好厉害啊、狂王大人、好厉害啊！」`);
    } else {
      await era.printAndWait(`「好厉害啊、狂王大人、好厉害啊！」`);
    }
    // CFLAG:656  = 1（变量语义：CFLAG 族，656）
    kojo.NTR_656 = 1;
  } else if (P == 7) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(`「让我全心全意的奉仕您吧……」`);
    } else {
      await era.printAndWait(`「让我全心全意的奉仕您吧……」`);
    }
    // CFLAG:657  = 1（变量语义：CFLAG 族，657）
    kojo.NTR_657 = 1;
  } else if (P == 20) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「魔王大人快看吧！　${sc()}生出狂王大人孩子的地方……」`,
      );
    } else {
      await era.printAndWait(`「能生下狂王大人的孩子真是荣幸呢……」`);
    }
  }

  return 0;
}

// @BENKI_KOUJO_K12（:5024-5277）：肉便器行动口上（benki_koujo_family）。A = 目标角色
// （era_flag.target）。FLAG:62 行动类型 0-12 档 × 常识改写（FLAG:63==1）/淫乱/爱慕/
// 侍奉Lv5/それ以外 五选一。CALL BENKI_PLAYER_NAME 输出玩家称呼——真身
// ere/system/train/benki.js 的 benki_player_name() 返回字符串，调用点自行 print
// （K3 同款延迟 require）。
async function benki_koujo_k12(rand) {
  void rand;
  const target = era_flag.target;
  const a = era_flag.target; // 源 A（肉便器行动对象）
  const target_name = chara_callname(a); // %SAVESTR:A%（初稿已展开）
  const sc = (x = target) => self_call(x); // %SELF_CALL(A)%
  const benki_player_name = () =>
    require('#/system/train/benki').benki_player_name(); // CALL BENKI_PLAYER_NAME
  if (game.train.肉便器行动 == 0) {
    if (game.dungeon.肉便器常识改写 == 1) {
      await era.printAndWait(
        `「感谢前来协助${sc(a)}的『研究』♪${sc(a)}也会更努力的、可以继续帮助${sc(a)}做更多『实验』吗？拜托咯…♪」`,
      );
    } else if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait(
        `「你们的龟头垢、一会儿能让我进行回收吗？　看起来能好好研究一下呢」`,
      );
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait(`「喂喂、再坚持一下。再过一会儿就射精了」`);
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「把精液全射出来吧……」`);
    } else {
      await era.printAndWait(`「呜呜……不洁啊……好污」`);
    }
  } else if (game.train.肉便器行动 == 1) {
    if (game.dungeon.肉便器常识改写 == 1) {
      await era.printAndWait(
        `「比起雄性的阴茎还是女孩子的身体更有趣啊…${sc(a)}、可以进行这项『研究』真是太『幸福』啦♪」`,
      );
      await era.printAndWait(
        `「刚听说常识被改变了的时候还是有些抵触的…可认真一想『女孩子之间做快乐的事是普通的』什么的、那不是理所当然的吗♪」`,
      );
      await era.printAndWait(
        `「真是不知道该怎么感谢、赐予了这么『美妙』的催眠的魔王大人呢♪」`,
      );
    } else if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait(`「哈啊哈啊……再抱紧一点……」`);
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait(`「真是好孩子……再把我抱紧一点……」`);
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「让我亲亲吧……」`);
    } else {
      await era.printAndWait(`「是女人吗……」`);
    }
  } else if (game.train.肉便器行动 == 2) {
    if (game.dungeon.肉便器常识改写 == 1) {
      await era.printAndWait(
        `「…之前便开始作为牝犬家畜的肉便器、像这样和野兽重复着『交配实验』的『研究』…」`,
      );
      await era.printAndWait(
        `「${sc(a)}对于负责这项『研究』还是『十分满足』的来着…难道有什么疑虑吗？」`,
      );
      await era.printAndWait(
        `「常识改变？…真搞不懂到底在说什么玩意…这可是『${sc(a)}自愿参与』的哦？」`,
      );
    } else if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait(`「噗唏、噗唏！　噗唏～……哈啊哈啊」`);
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait(`「汪、汪！　汪～……哈啊哈啊」`);
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「让我蹭一蹭吧……」`);
    } else {
      await era.printAndWait(`「呜呜……动物的臭味……」`);
    }
  } else if (game.train.肉便器行动 == 3) {
    if (game.dungeon.肉便器常识改写 == 1) {
      // 前缀是 PRINTFORMW（自带换行与等待：本行到此为止），接着的 CALL
      // BENKI_PLAYER_NAME（名字）与 :5107 的后文落在**新的一行**——拆成两条
      // 语句按原作两行输出（同句式的 K0/K3 前缀是 PRINTFORM，那才是同一行）；
      // 名字按 #599 用插值接在 CALL 的位置
      await era.printAndWait(`「多亏`);
      await era.printAndWait(
        `${benki_player_name()}的帮助、使用肛门和性器的『交配实验』得以进行咯♪」`,
      );
      await era.printAndWait(
        `「虽然被魔王大人做了肉便器洗脑、但是拜托${sc(a)}新的『研究』的魔王大人真是太温柔了呢♪」`,
      );
      await era.printAndWait(
        `「这副身体到底能给多少雄性做快活的事呢…每天都可以做『实验』『实在是太爽了』啦♪」`,
      );
    } else if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait(`「哈啊哈啊……里面……被摩擦着呢……」`);
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait(`「哈啊哈啊……里面……被摩擦着呢……」`);
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「换我来吧……拜托了」`);
    } else {
      await era.printAndWait(`「呜呜……两边都被……」`);
    }
  } else if (game.train.肉便器行动 == 4) {
    if (game.dungeon.肉便器常识改写 == 1) {
      // 同型的第二处（前缀 PRINTFORMW + CALL + 后续）；名字按 #599 插值
      await era.printAndWait(`「多亏`);
      await era.printAndWait(
        `${benki_player_name()}的帮助、几乎让性器松弛的『交配实验』得以进行咯♪」`,
      );
      await era.printAndWait(
        `「虽然被魔王大人做了肉便器洗脑、但是拜托${sc(a)}新的『研究』的魔王大人真是太温柔了呢♪」`,
      );
      await era.printAndWait(
        `「为了了解性器到底能让大家多舒服、于是直接向大家『发表』啦…每天都可以做『实验』『实在是太爽了』啦♪」`,
      );
    } else if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait(`「阴道……被扩张了……」`);
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait(`「阴道……被扩张了……」`);
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「后面可不行哦、把前面给你弄吧……」`);
    } else {
      await era.printAndWait(`「呜呜、您的奉仕我就收下了……」`);
    }
  } else if (game.train.肉便器行动 == 5) {
    if (game.dungeon.肉便器常识改写 == 1) {
      // 同型的第三处（前缀 PRINTFORMW + CALL + 后续）；名字按 #599 插值
      await era.printAndWait(`「多亏`);
      await era.printAndWait(
        `${benki_player_name()}的帮助、几乎让肛门松弛的『交配实验』得以进行咯♪」`,
      );
      await era.printAndWait(
        `「虽然被魔王大人做了肉便器洗脑、但是拜托${sc(a)}新的『研究』的魔王大人真是太温柔了呢♪」`,
      );
      await era.printAndWait(
        `「『用肛门做爱很正常』嘛『没什么好羞耻』的啊…每天都可以做『实验』『实在是太爽了』啦♪」`,
      );
    } else if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait(`「肛门、湿漉漉的……」`);
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait(`「肛门、湿漉漉的……」`);
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「您的肛交奉仕我就收下了……」`);
    } else {
      await era.printAndWait(`「呜呜……屁股被……」`);
    }
  } else if (game.train.肉便器行动 == 6) {
    if (game.dungeon.肉便器常识改写 == 1) {
      // 同型的第四处（前缀 PRINTFORMW + CALL + 后续）；名字按 #599 插值
      await era.printAndWait(`「多亏`);
      await era.printAndWait(
        `${benki_player_name()}的阴茎的帮助、几乎让下巴脱臼的『实验』得以进行咯♪」`,
      );
      await era.printAndWait(
        `「虽然被魔王大人做了肉便器洗脑、但是拜托${sc(a)}新的『研究』的魔王大人真是太温柔了呢♪」`,
      );
      await era.printAndWait(
        `「眼前的阴茎、传来那股『非它不可的香味』啦…每天都可以做『实验』『实在是太爽了』啦♪」`,
      );
    } else if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 == 7) {
    if (game.dungeon.肉便器常识改写 == 1) {
      await era.printAndWait(`「大家好、元`);
      // 原作 IF/ELSEIF 的勇者/冒险者段（:5195/:5197，:5198-5199 ENDIF），
      // 与 :5199+:5200 同属一行——PRINTFORM 不换行（#584）
      const hero_word =
        era.get(`talent:${a}:122`) == 0
          ? '勇者'
          : era.get(`talent:${a}:122`)
            ? '冒险者'
            : '';
      await era.printAndWait(
        hero_word +
          `${target_name}哟♪」「${sc(a)}败给了伟大的魔王大人之后…毫无抵抗地被洗脑成牝犬家畜肉便器啦♪」`,
      );
      await era.printAndWait(
        `「现在正作为对野兽阴茎感兴趣的大变态、在魔王大人手下做『研究』呢♪」`,
      );
      await era.printAndWait(
        `「这种『异种交配实验』绝对会变成厉害的玩意的…所以想让更多的人看到${sc(a)}交尾着的样子啊♪」`,
      );
    } else if (era.get(`talent:${a}:牝犬`)) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 == 9) {
    if (game.dungeon.肉便器常识改写 == 1) {
      await era.printAndWait(`「大家好、元`);
      // 原作 IF/ELSEIF 的勇者/冒险者段（:5225/:5227，:5228-5229 ENDIF），
      // 与 :5229+:5230 同属一行——PRINTFORM 不换行（#584）
      const hero_word =
        era.get(`talent:${a}:122`) == 0
          ? '勇者'
          : era.get(`talent:${a}:122`)
            ? '冒险者'
            : '';
      await era.printAndWait(
        hero_word +
          `${target_name}哟♪」「${sc(a)}败给了伟大的魔王大人之后…被彻头彻尾地调教并洗脑咯♪」`,
      );
      await era.printAndWait(
        `「现在作为喜欢在野外裸体的露出狂、在魔王大人手下做『研究』呢♪」`,
      );
      await era.printAndWait(
        `「这种『野外研究』非常浅显易懂…让别人看见自己裸体的样子真是件非常舒服的事啊♪」`,
      );
    } else if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 == 12) {
    if (game.dungeon.肉便器常识改写 == 1) {
      await era.printAndWait(`「大家好、元`);
      // 原作 IF/ELSEIF 的勇者/冒险者段（:5252/:5254，:5255-5256 ENDIF），
      // 与 :5256+:5257 同属一行——PRINTFORM 不换行（#584）
      const hero_word =
        era.get(`talent:${a}:122`) == 0
          ? '勇者'
          : era.get(`talent:${a}:122`)
            ? '冒险者'
            : '';
      await era.printAndWait(
        hero_word +
          `${target_name}哟♪」「${sc(a)}被伟大的魔王大人打败了之后…毫无抵抗的被开发了身体的每个角落啦♪」`,
      );
      await era.printAndWait(
        `「现在成了除了自慰什么都不会思考的自慰狂、一直一个人做着『研究』哦♪」`,
      );
      await era.printAndWait(
        `「啊啊、大家正在看着${sc(a)}的『研究』啊…只是这么想想就又要绝顶了的样子啊♪」`,
      );
    } else if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  }

  return 0;
}

module.exports = {
  k12_kojo2,
  kojo_message_com_12,
  kojo_message_palamcng_12,
  kojo_message_markcng_12,
  self_kojo_k12,
  dungeon_ryouzyoku_k12,
  dungeon_ryouzyoku_after_k12,
  dungeon_victory_k12,
  dungeon_attack_k12,
  exucution_koujo_k12,
  museum_koujo_k12,
  banishment_koujo_k12,
  public_exucution_koujo_k12,
  grotesque_koujo_k12,
  enterenemy_koujo_k12,
  gohoubi_request_koujo_k12,
  gohoubi_after_koujo_k12,
  osioki_koujo_k12,
  gobi_koujo_k12,
  ntr_koujo_k12,
  benki_koujo_k12,
  colosseum_kojo_12,
  dog_kojo_12,
};
