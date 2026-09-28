/**
 * @file 高貴性格口上 K3：指令口上（issue #46 黄金样本切片 + issue #234 全量复核）。
 *
 * == 状态机（CFLAG:301，注释「コマンド実行時のセリフ CFLAG 301～400
 *    を使用」） ==
 *
 * 二回目以降按「淫乱(76) → 爱慕(85) → 屈服刻印Lv3 → 屈服Lv2＆快乐Lv3 →
 * それ以外(MARK:2 <= 1)」的顺序取首个命中；每支的门槛除素质/刻印外还有
 * CFLAG:301 上限——**FLAG:7 == 2（默认）时上限被旁路**，同支每次都出声；
 * FLAG:7 == 1 时逐阶段推进、每阶段只出一次声（K3 用百位数分阶段：6xx/5xx/
 * 4xx/3xx/2xx，一支内再用个位数计数——:978/:1022/:1053 的追記者注释：
 * 「百の桁は大別、一の桁が回数」）。推进到阶段末尾后停在随机三选一。
 *
 * 舔阴（CFLAG:302）同构但阈值是个位数：初回 → 1；二回目以降按「淫乱 →
 * 爱慕 → 屈服刻印Lv3 → それ以外」取首个命中，写入 5/4/3/2。
 *
 * 肛门爱抚（CFLAG:303）按润滑（PALAM:3 + UP:3 对 PALAMLV:2）再分档：初回
 * → 1；二回目以降按「淫乱+润滑Lv2以上/未満 → 爱慕+润滑Lv2以上/未満 →
 * 润滑Lv2以上＋A感覚Lv3以上 → それ以外（读 CFLAG:223）」写入 7/6/5/4/3/2。
 *
 * 自慰（CFLAG:304）初回 → 1；二回目以降按「淫乱+处女 → 淫乱+自慰中毒Lv3
 * 以上/未満 → 爱慕+处女 → 爱慕+自慰中毒Lv3以上/未満 → 屈服Lv3+自慰中毒
 * Lv1以上 → それ以外」写入 9/8/7/6/5/4/3/2；壶虫/肛门虫（TEQUIP:11/13）
 * 在淫乱/爱慕的自慰中毒支上另出按摩器台词。
 *
 * 胸爱抚（CFLAG:306）初回按母乳体质 / 乳头环+抖M气质Lv3 / 爱＆淫乱 /
 * それ以外分档后推进到 1；二次以后母乳与非母乳各走「淫乱 → 爱慕 →
 * B感覚Lv3 → それ以外」，写入 5/4/3/2。
 *
 * 接吻（CFLAG:307）分三段：初吻（TFLAG:13，种族 314 / 恋人 317 / 侵攻
 * FLAG:81 分档）与调教首次均推进到 1；二次以后按「淫乱 → 爱慕 → 顺从
 * Lv2 → それ以外」写入 5/4/3/2。
 *
 * SELL_MATURO_K0 成熟出售真身已随 #338 接通。死斗场 / 兽奸 / PALAMCNG /
 * MARKCNG / 其余 SELECTCOM 与
 * 非调教入口均已随 #234 实现。
 */

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
const {
  heart,
  black_heart,
  self_call,
  self_call_first,
} = require('#/kojo/kojo-text');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { chara_callname, chara_name } = require('#/utils/callname-utils');
const {
  gohoubi_after_koujo_family,
  osioski_koujo_family,
  gohoubi_request_koujo_family,
} = require('#/kojo/kojo-dungeon-after');

const {
  ryouzyoku_kojo_family,
  ryouzyoku_after_kojo_family,
} = require('#/kojo/kojo-dungeon-ravish');

// EVENTTRAIN #PRI 档：存在标志 + 总开关补 0
on(
  'EVENTTRAIN',
  () => {
    game.kojo.口上存在_3 = 1; // FLAG:103 = 1（K3 口上存在标志）
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
    game.kojo.口上存在_3 = 0;
  },
  TIER.LATER,
);

/**
 * kojo_message_com_3：七道跳过判定 + 爱抚分支。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（[0, n) 整数；缺省
 *   均匀随机，测试注入定值序——分支序恒为 RAND:3 后 RAND:2）
 * @returns {Promise<number>} 0（RETURN 0；TRYCALLFORM 不读返回值）
 */
async function kojo_message_com_3(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const player = era_flag.player;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(player); // %SAVESTR:PLAYER%
  const master_name = chara_name(0); // %NAME:MASTER%（MASTER 恒角色 0）
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%
  const scf = () => self_call_first(target); // %SELF_CALL_FIRST(TARGET)%
  const kojo = chara(target).kojo;

  // 死斗场中は専用口上
  if (era.get(`tequip:${target}:55`)) {
    await colosseum_kojo_3(rand_n);
    return 0;
  }
  // 助手が調教した時に口上をスキップする
  if (era_flag.assi > 0 && era_flag.assiplay) {
    return 0;
  }
  // 口塞着用時（SELECTCOM == 45 自己说话不算）
  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 45) {
    return 0;
  }
  // 失神時（TFLAG:899）——跨域读属主 train 的一维门面
  if (game.train.失神) {
    return 0;
  }
  // 兽奸PLAY中は専用口上
  if (era.get(`tequip:${target}:89`)) {
    await dog_kojo_3(rand_n);
    return 0;
  }
  // 崩坏した場合（TALENT:9）
  if (era.get(`talent:${target}:9`) === 1) {
    return 0;
  }
  // 触手調教中（TEQUIP:90）
  if (era.get(`tequip:${target}:90`)) {
    return 0;
  }

  // IF SELECTCOM == 0（爱抚）。其余指令分支随各自指令票
  if (era_flag.selectcom === 0) {
    const mark = (i) => era.get(`mark:${target}:${i}`) || 0;

    // 初めて（CFLAG:301 == 0）
    if (kojo.爱抚 === 0) {
      // 屈服刻印Lv2以上
      if (mark(2) >= 2) {
        await era.printAndWait(
          '「嗯呼嗯~…啊~…呃~…请更加温柔…一…点……哈啊嗯~！」',
        );
      } else {
        await era.printAndWait('「不，不要触摸…呃呜…呜呃呜~~~………」');
      }
      kojo.爱抚 = 1;
      return 0;
    }

    // 二回目以降
    // 淫乱（TALENT:76）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.爱抚 <= 599 || game.kojo.口上开关 === 2)
    ) {
      // ;;ランダムで口上が変化する
      if (rand_n(3) === 0) {
        await era.printAndWait(
          `「呜哈嗯啊~…主人~…请更加摩擦那里吧~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}张开自己的双腿，诱导着${player_name}的手………`,
        );
        await era.printAndWait(
          `「${sc()}的身体是…被下流的抚摸了的话…就会热得要燃烧起来了${heart(3)}」`,
        );
        await era.printAndWait(
          `${target_name}淫乱地蠕动着身体、接受着${player_name}的爱抚………`,
        );
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          '「啊、啊啊~……主人~…这里、这里~……请用、主人的手指来、好好地欺负一下~……」',
        );
        era.print(
          `${player_name}开始爱抚后、${target_name}立马将双脚大幅度地张开了、如同为了让股间突出来一样挺起了腰。`,
        ); // PRINTFORML
        await era.printAndWait(
          `慢慢将手靠近蜜穴后、期待让${target_name}的腰部颤抖了起来、呼吸变得凌乱了。`,
        );
        await era.printAndWait(
          `「啊哈啊嗯~…${heart(1)} 好棒……果然,主人的手指，真的好美妙啊~${heart(3)}」`,
        );
      } else {
        await era.printAndWait(
          '「啊嗯~、嗯~、呜~…！更、更多、激烈地…更多、请更加粗暴地做吧~……啊~、啊、啊……！」',
        );
        era.print(
          `${target_name}将生来的高贵姿态完全扔掉了，不像样的将双脚敞开、沉醉在了${player_name}的爱抚之下。`,
        ); // PRINTFORML
        await era.printAndWait(
          `${target_name}只是贪图着给予的快乐而已、如同用淫猥之声演奏的乐器一样，娇喘的音高随着爱抚的手指动作而一上一下。`,
        );
        await era.printAndWait(
          `「啊啊~！请将${sc()}下流的身体、玩弄地翻来覆去吧……........直到坏掉为止......！」`,
        );
      }
      kojo.爱抚 = 600;
    } else if (
      // 爱慕（TALENT:85）
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.爱抚 <= 499 || game.kojo.口上开关 === 2)
    ) {
      // ;;ランダムで口上が変化する
      if (rand_n(3) === 0) {
        await era.printAndWait(
          `「啊~…嗯~…${player_name}太…太过温柔了…感觉有点害怕呀~………♪」`,
        );
        await era.printAndWait(
          `${target_name}每当被${master_name}触摸后都会发出娇喘………`,
        );
        await era.printAndWait(
          `「啊啊…喜欢…喜欢的说…被做了这样的事情…${sc()}…已经~…♪」`,
        );
        await era.printAndWait(
          `${target_name}的娇喘慢慢变成越来越急促的喘息声………`,
        );
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `「啊哈……啊啊、${player_name}…请……更加地、用自己喜欢的方式来、抚摸吧~……」`,
        );
        era.print(
          `${target_name}让${player_name}更加容易抚摸而将脚张开，将身子靠向了你。`,
        ); // PRINTFORML
        era.print('还不仅仅如此、是为了更加感受到爱抚带来的刺激吧、'); // PRINTFORML
        await era.printAndWait(
          `${player_name}的手触碰到的部位、都会向着手压过去。`,
        );
        await era.printAndWait(
          `「${target_name}的身体，已经变成仅仅是被${player_name}大人抚摸就能感到无上的愉悦感的身体了……${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「啊、啊嗯~、${player_name}大人的手……最喜欢的、最令人怜爱的手……哈啊啊~${heart(1)}」`,
        );
        era.print(
          `${target_name}将自己的手放在了${player_name}手的上方、开始对自己的身体爱抚了起来。`,
        ); // PRINTFORML
        await era.printAndWait(
          `为了感受到更加强烈的刺激而将${player_name}手用力地向下压、还轻轻地用手指对${player_name}的手背爱抚着。`,
        );
        await era.printAndWait(
          `「让${sc()}的心折服了的、残酷的手……教给${sc()}的身体、如何感受淫乐的温柔的手……」`,
        );
        await era.printAndWait(
          `「呜啊~、嗯~…${sc()}会……任由这只手的摆布的……被这只手引导的话、不管堕落到哪里都愿意……${heart(1)}」`,
        );
      }
      kojo.爱抚 = 500;
    } else if (
      // 屈服刻印Lv3（百位 4xx 阶段，个位数推进）
      mark(2) === 3 &&
      (kojo.爱抚 <= 399 || game.kojo.口上开关 === 2)
    ) {
      // ;;追記者／回数で口上が進む
      if (kojo.爱抚 <= 400) {
        // ;;快乐刻印Lv3
        if (mark(1) === 3) {
          await era.printAndWait(
            `「啊~…${scf()}、${sc()}的……身体……已经、太舒服了…完全……反抗不了了呀……」`,
          );
          era.print(
            `${target_name}发出了屈服宣言和喘息混合起来的娇喘，将身子托付给了正在爱抚的双手。`,
          ); // PRINTFORML
          await era.printAndWait(
            `${player_name}稍微提高正在爱抚的手的力度后、就如同${target_name}自己所说的那样根本不反抗，直率地发出了大声的娇喘。`,
          );
          await era.printAndWait(
            `「啊哈~…啊~！啊、呜啊~……！被，被这么地、爱抚的话…${sc()}要……啊哈呜~……！」`,
          );
        } else {
          await era.printAndWait(
            '「哈啊…啊~…嗯~…啊呃嗯~…为、为什么…会那么舒服的…呢……啊~♪」',
          );
        }
        kojo.爱抚 = 401;
      } else if (kojo.爱抚 === 401) {
        // ;;快乐刻印Lv3
        if (mark(1) === 3) {
          await era.printAndWait(
            '「啊、啊啊…为、为什么……嗯~、为什么、这么……温柔地、抚摸呢……啊~……」',
          );
          era.print(
            `被不停重复地给予着不太强烈，也不太弱的刺激、${target_name}全身的皮肤都冒出湿润的汗。`,
          ); // PRINTFORML
          await era.printAndWait(
            '蜜穴微微地渗出了水滴、用手指稍微粗鲁一点的话，便出现了哔啦哔啦的水声。',
          );
          await era.printAndWait(
            `「不要嗯~…声音、怎么会……像这样、被弄出声音来…的话、嗯…快…快要羞死了${sc()}……」`,
          );
        } else {
          await era.printAndWait(
            '「啊…温柔的、抚摸的话……就不会、就不会抵抗了…啊~！当、当然、其…其他的也……」',
          );
          era.print(
            `温柔地用手来回抚摸后、${target_name}为了更加享受抚摸带来的感觉的那样将眼睛闭上了。`,
          ); // PRINTFORML
          await era.printAndWait('然后伴随着细微的喘息声、恍惚地喃喃自语着。');
          await era.printAndWait(
            `「但，但是…如果可以做得到的话、请温柔地……${sc()}也会、害怕疼的……啊哈嗯、啊嗯~…嗯嗯、嗯~……」`,
          );
        }
        kojo.爱抚 = 402;
      } else if (kojo.爱抚 === 402) {
        await era.printAndWait(
          '「啊、啊嗯~、啊……哈啊…哈啊……啊哈唔！？嗯~、突、突然，变快的话……啊呼嗯呜~！」',
        );
        era.print(
          `对于习惯了爱抚的速度、而放松了的${target_name}、突然加快了爱抚的速度。`,
        ); // PRINTFORML
        await era.printAndWait(
          `被变化带来的快乐的波浪玩弄、${target_name}先前还用憎恨的眼神看着${player_name}、而现在眼睛却湿润了起来，依靠着${player_name}。`,
        );
        await era.printAndWait(
          `「哈呜嗯~！嗯~、那…那个手在……将${sc()}的身体、弄出了下流的声音了……啊、嗯…${player_name}的…啊~！」`,
        );
        kojo.爱抚 = 403;
      } else {
        // ;;ランダムで口上が変化する
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「哈啊啊~…啊啊啊~…被、被这么地…这么地…爱抚了的话……${sc()}…${sc()}、已经……嗯嗯~！」`,
          ); // （%SELF_CALL(TARGET, 1)% 与 %SELF_CALL(TARGET)% 同值）
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「哼唔呜~……！嗯呜~！嗯~嗯~嗯~！嗯呜呜~……已经…太过舒服了、${sc()}要…啊啊~……！」`,
          );
        } else {
          await era.printAndWait(
            '「好、好棒……是的、那里……就是那里来的、那里~……啊~！那里、好舒服的啊~……啊嗯~！」',
          );
        }
      }
    } else if (
      // 屈服刻印Lv2＆快乐刻印Lv3（百位 3xx 阶段）
      mark(2) === 2 &&
      mark(1) === 3 &&
      (kojo.爱抚 <= 299 || game.kojo.口上开关 === 2)
    ) {
      // ;;追記者／回数で口上が進む
      if (kojo.爱抚 <= 300) {
        await era.printAndWait(
          '「哈呜呜嗯~…嗯~、嗯…不、不行…要、要忍不住了…啊~、啊……！」',
        );
        era.print(
          `只是稍微地给蜜穴挠了一下痒、${target_name}的身体就大幅度地颤抖起来了。`,
        ); // PRINTFORML
        await era.printAndWait(
          '是因为被铭刻在身体深处的愉悦的记忆被引出来了吧、颤抖着大声地娇喘起来了。',
        );
        await era.printAndWait(
          '「啊~、啊……！不行~、忍…忍不……忍不住……了啊…哈啊嗯~…！」',
        );
        kojo.爱抚 = 301;
      } else if (kojo.爱抚 === 301) {
        await era.printAndWait(
          '「请，请原…哈呜啊~！请原谅…嗯~！原谅了……！再这样…再这样、被抚摸了的话……」',
        );
        era.print(
          `${target_name}微弱地扭动着身体、想要尝试逃离${player_name}的双手。`,
        ); // PRINTFORML
        await era.printAndWait(
          `但是、被温柔地抚摸而失去了力气、又回到了${player_name}的手的旁边将身体靠了过去。`,
        );
        await era.printAndWait(
          `「请，请不要…改变……再这样下去、${sc()}就要…啊、这个……哼啊~、那个…太舒服了……啊啊~……」`,
        );
        kojo.爱抚 = 302;
      } else if (kojo.爱抚 === 302) {
        await era.printAndWait(
          '「啊、啊啊…已经、不行……已经…忍…不住了……啊、嗯、啊啊~……！」',
        );
        era.print(
          `现在已经将厌恶感什么的给忘记了吧、${target_name}貌似习惯被触碰了的那样，将身体交给爱抚的双手。`,
        ); // PRINTFORML
        await era.printAndWait(
          '双腿的绷紧的肌肉一跳一跳地、但是完全没有抵抗，只是快乐带来的反射而已，而且还从嘴边漏出了淫艳的娇喘声。',
        );
        await era.printAndWait(
          `「再，再这样下去的话……${sc()}…${scf()}、${sc()}要……啊嗯~、嗯~…嗯哈呜嗯~……！」`,
        );
        kojo.爱抚 = 303;
      } else {
        // ;;ランダムで口上が変化する
        if (rand_n(3) === 0) {
          await era.printAndWait(
            '「呀…！嗯~、嗯呀~……啊~、忍…忍耐……啊哈~！啊~、啊~啊~……啊！」',
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            '「这~、这样~…嗯~、明明被，当成玩具来…呼嗯~、呜啊啊~……！」',
          );
        } else {
          await era.printAndWait(
            '「哈~、啊……啊~、啊啊啊……！啊、呜啊~、不要啊~……」',
          );
        }
      }
    } else if (
      // それ以外（百位 2xx 阶段；黄金样本 :1097 在此）
      mark(2) <= 1 &&
      (kojo.爱抚 <= 1 || game.kojo.口上开关 === 2)
    ) {
      // ;;追記者／回数で口上が進む
      if (kojo.爱抚 <= 200) {
        // ;;快乐刻印Lv3 分档
        if (mark(1) === 3) {
          await era.printAndWait(
            '「啊嗯~、嗯~……明明…应该…感觉恶心来的……应该感觉、恶心来的呀…！」',
          );
          era.print(
            `${target_name}大声地发出了困惑的声音，但是身体实实在在地对爱抚有所反应。`,
          ); // PRINTFORML
          await era.printAndWait(
            `如同在服从着${player_name}的手指那样、摇摇晃晃地晃动着腰部。`,
          );
          await era.printAndWait(
            '「嗯呜……呼~、呜…不行……啊~！明明、那么令人恶心……的事情……」',
          );
        } else {
          await era.printAndWait('「感觉真恶心…不要在…这样…触，触碰了…！」');
        }
        kojo.爱抚 = 201;
      } else if (kojo.爱抚 === 201) {
        // ;;快乐刻印Lv3
        if (mark(1) === 3) {
          await era.printAndWait(
            '「不、不要啊…啊哈唔、呀~…！不、不要摸啊……啊~、啊啊…！」',
          );
        } else {
          await era.printAndWait(
            '「不是，说了、不要摸了没听到吗…嗯~！说了不要摸了啊…！」',
          );
        }
        era.print(`${target_name}将眼睛闭起来、安静地忍耐着爱抚带来的刺激。`); // PRINTFORML
        await era.printAndWait(
          `${player_name}轻轻地抚摸了一下${target_name}紧紧闭着的眼皮子旁边后、${target_name}的身体颤抖起来，惊叫了一下。`,
        );
        await era.printAndWait('「啊呜…！呃呜、呜~…怎、怎么……嗯嗯~！」');
        kojo.爱抚 = 202;
      } else if (kojo.爱抚 === 202) {
        // ;;快乐刻印Lv3
        if (mark(1) === 3) {
          await era.printAndWait(
            '「已，已经…啊~！快、不要…啊啊！快住手吧……！」',
          );
          era.print(
            `哪怕嘴上说着一堆拒绝的话语、${target_name}的瞳孔也因为快乐而湿润了起来。`,
          ); // PRINTFORML
          await era.printAndWait(
            `每次触碰都会让${target_name}的话语中断、身体颤抖起来喘息也变得急促起来了。`,
          );
        } else {
          await era.printAndWait(
            '「够、够了…嗯嗯~……哼嗯~、呜……请，请适可而止吧…！」',
          );
          era.print(`${target_name}的眼中、厌恶的神情并没有消失。`); // PRINTFORML
          await era.printAndWait(
            '但是也没有压抑着住无情的爱抚带来的刺激、而从嘴边漏出了颤抖的娇喘声。',
          );
        }
        await era.printAndWait(
          '「为、为什么…啊~、这…这样……这样的、事情……啊嗯~……」',
        );
        kojo.爱抚 = 203;
      } else {
        // ;;ランダムで口上が変化する——黄金样本 emuera.log:26
        if (rand_n(3) === 0) {
          await era.printAndWait('「呀…啊、不要啊……请、请快住手，停下来吧…」');
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「哈呜、${target_name}、可是，一心地，想要杀了…嗯、为什么、那么地……啊~、这么…温柔地…啊、啊啊……」`,
          ); // 黄金样本逐字比对（test/kojo-k3-noble.test.js）
        } else {
          await era.printAndWait(
            '「嗯~、嗯~嗯~……明明…说了、快住手了……啊嗯~……」',
          );
        }
      }
    }
    return 0;
  }

  // IF SELECTCOM == 1（舔阴 CFLAG:302）
  if (era_flag.selectcom === 1) {
    const mark = (i) => era.get(`mark:${target}:${i}`) || 0;

    // 初めて（CFLAG:302 == 0）
    if (kojo.舔阴 === 0) {
      // 处女分档
      if (era.get(`talent:${target}:0`) === 1) {
        await era.printAndWait(
          '「嗯啊啊~！那、那里才不是可以舔的地方…哈呜…很，很脏的…哈呜！」',
        );
      } else {
        await era.printAndWait('「啊啊…怎么会…舌头…哈呜…啊~…啊呜~~~~！」');
      }
      kojo.舔阴 = 1;
      return 0;
    }

    // 二回目以降
    // 淫乱（TALENT:76）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.舔阴 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「哈啊啊…更加地…更加地...将小穴弄得更加黏糊糊地吧${heart(1)}…更加地欺负小穴吧哈呜~~${heart(3)}」`,
      );
      await era.printAndWait(
        `${target_name}将${player_name}的头按住晃动着腰。`,
      );
      await era.printAndWait(
        `「请更加地…欺负${target_name}的小穴吧~…将变态${target_name}的小穴弄得乱七八糟的吧啊啊~！${heart(3)}」`,
      );
      kojo.舔阴 = 5;
    } else if (
      // 爱慕（TALENT:85）
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.舔阴 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「啊啊~…那里明明…那么脏来的啊♪………不行…的啊…那么地…啊嗯~♪」',
      );
      await era.printAndWait(
        `${target_name}哪怕耳朵红透了也好，也继续接受着${player_name}的爱抚。`,
      );
      await era.printAndWait(
        `「嗯呜啊~…哼啊啊啊！~…腰要…腰要飘起来了~${heart(1)}」`,
      );
      kojo.舔阴 = 4;
    } else if (
      // 屈服刻印Lv3
      mark(2) === 3 &&
      (kojo.舔阴 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「呜啊~…啊~…呜呼啊~…更加地…温柔地爱抚吧…哼唔啊~…啊~啊啊~♪」',
      );
      kojo.舔阴 = 3;
    } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外（屈服刻印Lv3未満）
      await era.printAndWait(
        '「不、不要…请停下来吧！哪怕舔这种地方也好…哼呜啊啊啊~！」',
      );
      kojo.舔阴 = 2;
    }
    return 0;
  }

  // IF SELECTCOM == 2（肛门爱抚 CFLAG:303）
  if (era_flag.selectcom === 2) {
    const train = chara(target).train;
    const p = train.润滑 + train.润滑增量; // P = PALAM:3 + UP:3

    // 初めて（CFLAG:303 == 0）
    if (kojo.肛门爱抚 === 0) {
      await era.printAndWait('「呜，呜哇啊！？那、那里是不行的！」');
      kojo.肛门爱抚 = 1;
      return 0;
    }

    // 二回目以降
    // 淫乱+润滑Lv2以上
    if (
      era.get(`talent:${target}:76`) === 1 &&
      p >= PALAMLV[2] &&
      (kojo.肛门爱抚 <= 6 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊啊~${heart(1)}…啊~${heart(1)}…哈呜啊啊啊~${heart(3)}」`,
      );
      await era.printAndWait(
        `${target_name}每当被弯曲的手指来回扣着尻穴内壁时都会漏出欢喜的娇喘。`,
      );
      await era.printAndWait(
        `「尻穴小穴${heart(1)} 更加玩弄尻穴吧~~~${heart(3)}」`,
      );
      kojo.肛门爱抚 = 7;
    } else if (
      // 淫乱+润滑Lv2未満
      era.get(`talent:${target}:76`) === 1 &&
      p < PALAMLV[2] &&
      (kojo.肛门爱抚 <= 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「嗯啊~……哈啊嗯~${heart(1)}${'\u3000'}指尖在…嗯~…在挖着…啊~${heart(1)}这个嗯~~~~${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}的尻穴虽然还没有完全湿润，不过手指越是抽插越能进入${target_name}的尻穴的深处。`,
      );
      await era.printAndWait(
        `「恩呜呜~…更加地…${heart(1)}${'\u3000'}进到里面去来回抽插吧${heart(3)}」`,
      );
      kojo.肛门爱抚 = 6;
    } else if (
      // 爱慕+润滑Lv2以上
      era.get(`talent:${target}:85`) === 1 &&
      p >= PALAMLV[2] &&
      (kojo.肛门爱抚 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「啊~哈嗯~啊啊~…这、这个部位…才不是用来塞进什么东西的地方来的呀………」',
      );
      await era.printAndWait(
        `虽然嘴上说着这样的话，但是${target_name}一点都不讨厌地接受着${player_name}的手指。`,
      );
      await era.printAndWait(
        `「哈嗯~♪……啊·~…不是…这个…才不是对${player_name}大人的手指感到舒…哼啊啊~…啊啊~…哈啊嗯~♪」`,
      );
      kojo.肛门爱抚 = 5;
    } else if (
      // 爱慕+润滑Lv2未満
      era.get(`talent:${target}:85`) === 1 &&
      p < PALAMLV[2] &&
      (kojo.肛门爱抚 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「嗯呜~....请更加…温柔地………」');
      await era.printAndWait(
        `「哈啊啊啊~…嗯呜呜~…没错…这样的…很舒服啊~………${heart(1)}」`,
      );
      kojo.肛门爱抚 = 4;
    } else if (
      // 润滑Lv2以上＋A感覚Lv3以上
      p >= PALAMLV[2] &&
      chara(target).system.肛门感觉 >= 3 &&
      (kojo.肛门爱抚 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `${target_name}的尻穴被塞进了手指而全身颤抖起来了。`,
      );
      await era.printAndWait('「啊呜呜~！…不，不是…才没有感觉…」');
      await era.printAndWait(`「呜嗯啊~！啊~啊啊~哈啊啊啊啊~~${heart(1)}」`);
      kojo.肛门爱抚 = 3;
    } else if (kojo.肛门爱抚 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外（爱無し、润滑Lv2未満、A感覚Lv3未満）
      await era.printAndWait(
        '「嗯呜~…请，请快住手啊…那种地方不管怎么做都不会…呜啊啊~啊啊~！」',
      );
      kojo.肛门爱抚 = 2;
    }
    return 0;
  }

  // IF SELECTCOM == 3（自慰 CFLAG:304）
  if (era_flag.selectcom === 3) {
    const mark = (i) => era.get(`mark:${target}:${i}`) || 0;
    const train = chara(target).train;

    // 初めて（CFLAG:304 == 0）
    if (kojo.自慰 === 0) {
      await era.printAndWait(
        '「居然…不能不做这样的事情…这是……何等的…屈辱啊…」',
      );
      kojo.自慰 = 1;
      return 0;
    }

    // 二回目以降
    // 淫乱＋处女
    if (
      era.get(`talent:${target}:76`) === 1 &&
      era.get(`talent:${target}:0`) === 1 &&
      (kojo.自慰 <= 8 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊啊${heart(1)}${'\u3000'}您真是的…真的是恶魔来的呀…${heart(1)}」`,
      );
      await era.printAndWait(
        `「${sc()}的身心…明明....都变得…如此地淫乱了…啊啊~${heart(1)}也不拿走${sc()}重要的东西什么的~${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}将腰抬高，向${master_name}诱惑而用手将蜜穴给张开。`,
      );
      await era.printAndWait(`「啊啊~…明明…在这里有处女膜来的~${heart(1)}」`);
      await era.printAndWait(
        `「拜托了${heart(1)}请将${sc()}的…淫乱小穴…用${master_name}大人的大鸡巴来贯穿了吧~~~${heart(5)}」`,
      );
      await era.printAndWait(
        `${target_name}一边将腰部左右地晃动着一边在${master_name}的面前自慰着………`,
      );
      kojo.自慰 = 9;
    } else if (
      // 淫乱＋自慰中毒Lv3以上
      era.get(`talent:${target}:76`) === 1 &&
      train.自慰中毒 >= 3 &&
      (kojo.自慰 <= 7 || game.kojo.口上开关 === 2)
    ) {
      // 壶虫or肛门虫
      if (era.get(`tequip:${target}:11`) || era.get(`tequip:${target}:13`)) {
        await era.printAndWait(
          `「啊哼嗯~~…按摩器自慰最~棒~了~啊嗯~${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}留着口水继续着自慰………`);
      } else if (rand_n(3) === 0) {
        await era.printAndWait(`「啊啊…主人…请看一下吧~~~…${heart(1)}」`);
        await era.printAndWait(
          `「小穴的里面${heart(1)}要伸手指进去了哦~~~……${heart(1)}」`,
        );
        await era.printAndWait(
          `「嗯哈啊啊~…不行了~…小穴自慰停不下来了${heart(3)}」`,
        );
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `「哈啊~…啊~…啊啊~…这么的…舒服的事情嗯~…谁都没有告诉${target_name}啊嗯~…${heart(1)}」`,
        );
        await era.printAndWait(
          `「小穴“库啪”地打开了~嗯哦嗯~${heart(1)}将手指塞进深处后~${heart(1)}」`,
        );
        await era.printAndWait(
          `「只要再将小豆豆弄一下的话…哈嗯~${heart(1)}要舒服死了~${heart(1)}」`,
        );
        await era.printAndWait(
          `「为什么大家…不做这么舒服的事情呢~？${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「啊啊啊啊~…对不起…只用自己的手指就得那么舒服真是对不起~~~${heart(1)}」`,
        );
        await era.printAndWait(
          `「但是停不下来呢~~${heart(1)} 这么舒服的事情，根本停不下来呀~~~${heart(1)}」`,
        );
        await era.printAndWait(
          `「哪怕没有主人的命令也好…也会一整天玩弄自己的小穴真的是非常对不起呜~~~~~~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}连你根本不知道的事情也说都了出来………`,
        );
      }
      kojo.自慰 = 8;
    } else if (
      // 淫乱＋自慰中毒Lv3未満
      era.get(`talent:${target}:76`) === 1 &&
      train.自慰中毒 < 3 &&
      (kojo.自慰 <= 6 || game.kojo.口上开关 === 2)
    ) {
      // 壶虫or肛门虫
      if (era.get(`tequip:${target}:11`) || era.get(`tequip:${target}:13`)) {
        await era.printAndWait(
          `「啊啊啊啊~…要不行了…那里要不行啊~~~…${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}流着口水沉浸在按摩器自慰着………`);
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `「啊啊~…手指…手指擅自动起来了呀~~~…${heart(1)}」`,
        );
        await era.printAndWait(
          `「这个手指…这个手指如果是主人的大鸡巴的话${heart(1)}${'\u3000'}就会…就会变地更加舒服起来了呀~~${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「啊啊~…虽然玩弄小穴也不错来的…但是好想要主人的大鸡巴呀~~…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}自慰的同时，用着炽热的视线看着${target_name}股间的阴茎………`,
        );
      }
      kojo.自慰 = 7;
    } else if (
      // 爱＋处女
      era.get(`talent:${target}:85`) === 1 &&
      era.get(`talent:${target}:0`) === 1 &&
      (kojo.自慰 <= 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊啊~…呜哈~…啊…${heart(1)}」`);
      await era.printAndWait(
        `${target_name}每次轻轻地抚摸自己的蜜穴后就会大声地呻吟一下。`,
      );
      await era.printAndWait(
        `「如果大人您再不做的话~…${target_name}就要自己弄破了噢~…${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}说完扑哧一笑、将手指塞向了深处。`);
      await era.printAndWait(
        `「哈嗯~${heart(1)}…唔哼哼~、只是开玩笑的噢~………啊嗯~~~${heart(1)}」`,
      );
      kojo.自慰 = 6;
    } else if (
      // 爱＋自慰中毒Lv3以上
      era.get(`talent:${target}:85`) === 1 &&
      train.自慰中毒 >= 3 &&
      (kojo.自慰 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 壶虫or肛门虫
      if (era.get(`tequip:${target}:11`) || era.get(`tequip:${target}:13`)) {
        await era.printAndWait(`「自慰器…自慰器用起来好舒服啊嗯~${heart(1)}」`);
        await era.printAndWait(
          `${target_name}嘴边流下了口水沉浸在了按摩器自慰中………`,
        );
      } else if (rand_n(3) === 0) {
        await era.printAndWait(
          `「唔啊~…啊~哈啊~…明明...这样的…不行…来的…${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊啊~…但是…是魔王大人的命令来的…啊~啊啊~哈啊嗯~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}哪怕嘴上说着这么多的借口，但还是忘我地自慰着………`,
        );
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `「啊啊…请更加…更加地看这边吧~…请看着${sc()}淫荡下流的哪里吧~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}每当将手指伸进蜜穴里后便会有下流的水声响起、爱液不提地滴到了地板上………`,
        );
      } else {
        await era.printAndWait(
          `「啊啊~…玩弄的话…明明在这样玩弄下去的话就要回不来了的~~…${heart(1)}」`,
        );
        await era.printAndWait(
          `「不行了嗯~~…已经…手指已经停不下来了~${heart(1)}…主人…请看着吧~！」`,
        );
      }
      kojo.自慰 = 5;
    } else if (
      // 爱＋自慰中毒Lv3未満
      era.get(`talent:${target}:85`) === 1 &&
      train.自慰中毒 < 3 &&
      (kojo.自慰 <= 3 || game.kojo.口上开关 === 2)
    ) {
      if (rand_n(2) === 0) {
        await era.printAndWait(
          `「啊哈啊~…${heart(1)}${'\u3000'}被喜欢的人给…看到了羞耻的地方什么的…」`,
        );
        await era.printAndWait(
          `「居然是那么舒服的事情来的呀…请更加地…更加地看着${sc()}自慰的姿态吧~~~${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「啊啊~…因为命令而自己安慰自己什么的…居然会那么舒服呀~~…${heart(1)}」`,
        );
        await era.printAndWait(
          `「主人~${heart(1)} 请更加地…疼爱${sc()}吧…啊~啊啊啊~嗯~${heart(1)}」`,
        );
      }
      kojo.自慰 = 4;
    } else if (
      // 屈服刻印Lv3+自慰中毒Lv1以上
      mark(2) === 3 &&
      train.自慰中毒 >= 1 &&
      (kojo.自慰 <= 2 || game.kojo.口上开关 === 2)
    ) {
      if (rand_n(2) === 0) {
        await era.printAndWait(
          '「明明…不行…来的…但是...为什么…手却…停不下来呀~………啊嗯~！」',
        );
      } else {
        await era.printAndWait('「好、的…更加深地~…啊啊~啊~…啊嗯嗯唔！」');
        await era.printAndWait(
          `${target_name}顺从着${master_name}的指示摩擦着蜜穴、一点一点地开发着敏感度………`,
        );
      }
      kojo.自慰 = 3;
    } else if (kojo.自慰 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外（爱無し、自慰中毒Lv1未満）
      if (rand_n(2) === 0) {
        await era.printAndWait(
          '「呃呜…呜~…啊~…这样的一点也…哼呜~…啊~…哈呜~！」',
        );
      } else {
        await era.printAndWait(
          `「啊啊…哈啊~…居然让${target_name}做这样的事情…给${target_name}记住吧…啊啊~…啊~…嗯~」`,
        );
      }
      kojo.自慰 = 2;
    }
    return 0;
  }

  // IF SELECTCOM == 5（胸爱抚 CFLAG:306）
  if (era_flag.selectcom === 5) {
    const train = chara(target).train;
    const system = chara(target).system;
    const milk =
      era.get(`talent:${target}:130`) === 1 &&
      train.欲情 > PALAMLV[3] &&
      (era.get(`tequip:${target}:16`) || 0) === 0 &&
      (era.get(`tequip:${target}:15`) || 0) === 0;

    // 初めて（CFLAG:306 == 0）
    if (kojo.胸爱抚 === 0) {
      if (milk) {
        // 母乳体质
        if (
          era.get(`talent:${target}:85`) === 1 &&
          era.get(`talent:${target}:76`) === 1
        ) {
          await era.printAndWait(`「胸部！要漏出来了呀~…${heart(1)}」`);
        } else {
          await era.printAndWait('「嗯呜...母乳居然…那么多………」');
        }
      } else if (
        // 乳头ピアス+抖M气质Lv3
        chara(target).train.穿环状态 & 1 &&
        system.抖M气质 >= 3
      ) {
        era.print(`「啊啊~${heart(1)} 被那么用力地揉的话~${heart(1)}」`); // PRINTFORML
        await era.printAndWait(`「就会有感觉了~${heart(1)}」`);
        if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `${target_name}好像想要炫耀爱的证明一样、自满地将胸前的乳头环摇晃起来了。`,
          );
        }
      } else if (
        // 愛＆淫乱
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`talent:${target}:76`) === 1
      ) {
        await era.printAndWait('「哼啊啊…请更加地…抚摸胸部吧~~…♪」');
        await era.printAndWait(
          `「只是被${master_name}大人抚摸而已就感觉要融化掉了呀${heart(1)}」`,
        );
      } else {
        await era.printAndWait('「嗯呜…不要…弄得那么疼………」');
      }
      kojo.胸爱抚 = 1;
      return 0;
    }

    // 二回目以降
    if (milk) {
      // 母乳体质
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「主人，请…请再喝多一点奶吧~${heart(1)}」`);
        await era.printAndWait(
          `「只是让主人喝着奶…就…就要去了呀…${heart(1)}」`,
        );
        kojo.胸爱抚 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊嗯~…可以的哦~…请再喝更多一点吧…${sc()}的可爱的大人………${heart(1)}」`,
        );
        await era.printAndWait(
          `「${sc()}的奶…啊嗯~…全部…都是大人你的东西来的~…${heart(1)}」`,
        );
        kojo.胸爱抚 = 4;
      } else if (
        system.乳房感觉 >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊~…啊呜呜~…！请…请原谅${sc()}吧！」`);
        await era.printAndWait(
          `「再这样…被吸着奶的话…${sc()}…${sc()}…啊哈呜嗯~~~~~！」`,
        );
        kojo.胸爱抚 = 3;
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          '「啊哈呜…不要...请不要…吸得...弄出声音来啊！」',
        );
        kojo.胸爱抚 = 2;
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊哈啊啊~…要融化掉了~${heart(1)}」`);
      await era.printAndWait(
        `「主人，请更加地…随心所欲地做吧~…啊~…啊啊~${heart(1)}」`,
      );
      kojo.胸爱抚 = 5;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「啊嗯~…可以的哦…更加用力地揉…也没有关系的噢…啊~哈啊嗯啊啊啊~♪」',
      );
      await era.printAndWait(
        `「嗯呜~♪这样的真的可以哦~…啊~…是的噢…更加…用力地可以的噢${heart(1)}」`,
      );
      kojo.胸爱抚 = 4;
    } else if (
      system.乳房感觉 >= 3 &&
      (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「啊啊~…胸部…胸部居然会那么有感觉什么的…」');
      await era.printAndWait('「哈嗯~…请，请不要欺负胸部…啊~啊啊~！」');
      kojo.胸爱抚 = 3;
    } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait('「不…不要…唔…不要再…欺负胸部…啊~…啊啊~！」');
      kojo.胸爱抚 = 2;
    }
    return 0;
  }

  // IF SELECTCOM == 6（接吻 CFLAG:307）
  if (era_flag.selectcom === 6) {
    const system = chara(target).system;
    const first_kiss = game.train.初吻与自我口上;
    const assiplay = era_flag.assiplay;
    const no_beast_tentacle =
      (era.get(`tequip:${target}:89`) || 0) === 0 &&
      (era.get(`tequip:${target}:90`) || 0) === 0;

    // 初吻（CFLAG:307 == 0 && TFLAG:13）
    if (kojo.接吻 === 0 && first_kiss) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        assiplay === 0 &&
        no_beast_tentacle
      ) {
        // 淫乱かつ主人
        if (era.get(`talent:${target}:314`) === 7) {
          // 高贵ダークエルフ
          await era.printAndWait(
            `${master_name}抓住${target_name}的下巴将她的脸转了过来、强行地将嘴唇重合了起来。`,
          );
          await era.printAndWait(
            `「嗯唔…嗯啾~…嗯呼~…嗯呼嗯~…~！…嗯唔~…嗯~嗯嗯~~呜~…呜~~！！！${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}通红着脸沉浸在和${master_name}的亲吻当中。`,
          );
          await era.printAndWait(
            `「嗯哈啊啊~…啊啊…好棒…${sc()}淫乱的嘴唇能献给主人您真是荣幸呢~…${heart(3)}」`,
          );
        } else if (era.get(`talent:${target}:317`) === 4) {
          // 故郷に恋人がいる場合
          await era.printAndWait(
            `「嗯呼呜~${heart(1)} 嗯呜~…啾呜~…啾呼~…呸咯~…嗯~嗯~嗯嗯嗯~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}环抱着${master_name}、热情地将舌头缠绕起来。`,
          );
          await era.printAndWait(
            `「亲吻原来…是会让人变得那么淫乱的感觉的啊…啊啊…还要…${heart(3)}」`,
          );
          await era.printAndWait(
            `${target_name}沉浸在了和${master_name}亲吻之中，脑海里的故乡的恋人就好像已经不在了一样………`,
          );
        } else {
          await era.printAndWait(
            `「嗯呼~${heart(1)} 嗯啾…啾~…啾呼~…呸咯~…嗯~嗯~嗯嗯嗯~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}环抱着${master_name}、热情地将舌头缠绕起来。`,
          );
          await era.printAndWait(
            `「亲吻原来…是会让人变得那么淫乱的感觉的啊…啊啊…还要…${heart(3)}」`,
          );
        }
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        assiplay === 0 &&
        no_beast_tentacle
      ) {
        // 爱かつ主人
        if (era.get(`talent:${target}:314`) === 1) {
          // 高贵エルフ
          await era.printAndWait(
            `「那、那个、${sc()}那个所谓的心理准备还没…啊嗯~！」`,
          );
          await era.printAndWait(
            `趁着${target_name}还在迷惑的时候将其抱住后、${master_name}直接将她的嘴唇夺走了。`,
          );
          await era.printAndWait(
            '「嗯呼~…嗯…嗯呜~…嗯…啾…啾…噗哈~…啊啊~…啊~…♪」',
          );
          await era.printAndWait(
            '「真、真是的…真是那个…对大人您真是无奈了呀…啊嗯~！」',
          );
          await era.printAndWait(
            `${master_name}再次将这个有点小啰嗦的精灵族小姑娘的嘴唇给夺走了………`,
          );
        } else if (era.get(`talent:${target}:317`) === 4) {
          // 故郷に恋人がいる場合
          await era.printAndWait(`「嗯哼哼~…这是${sc()}的初吻来的噢~………♪」`);
          await era.printAndWait(
            `「啊嗯~…噗~请不要那么坏心眼啦…真的是初吻来的嘛…不管是第二回…还是第三回都是…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}可爱地微笑了一下后，便不停地跟${master_name}亲吻了起来………`,
          );
        } else {
          await era.printAndWait('「嗯呜~…是、是的…能否再来一次吗？」');
          await era.printAndWait(
            `「${target_name}想要…好好地记住大人您的吻………」`,
          );
          await era.printAndWait(
            `${target_name}可爱地微笑了一下后，再度跟${master_name}亲吻了一下………`,
          );
        }
      } else if (
        era.get(`talent:${target}:317`) === 4 &&
        game.system.人间界侵攻度 >= 5000
      ) {
        // 故郷に恋人がいる場合、なおかつ侵攻度が５０００を越えている場合
        await era.printAndWait('「亲、亲吻的话…真的会…放那个人走对吧………」');
        await era.printAndWait(
          `${target_name}将自己的吻和在故乡的恋人的生命放在天枰衡量了一下、便向${master_name}献出了嘴唇。`,
        );
        await era.printAndWait('「嗯~…嗯呜~…~！………已、已经…够了吧…」');
        await era.printAndWait(
          `「！…怎，怎么能…那么卑鄙…让${scf()}、${sc()}自己来做什么的…唔…呜呜呜~………」`,
        );
        await era.printAndWait(
          `${target_name}的身体颤抖着，自己上前亲吻了${master_name}………`,
        );
      } else {
        await era.printAndWait(`「啊啊…啊…${sc()}的…初吻被………」`);
      }
      kojo.接吻 = 1;
      return 0;
    }

    // （調教では）初めて
    if (kojo.接吻 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「嗯呜~…嗯啾~…嗯呼~...哼啊~…啊啊…非常地舒服呢~………${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的脸红得发烫，沉醉在和${master_name}的亲吻之中。`,
        );
        await era.printAndWait(
          `「${sc()}的嘴唇…全部都是主人的东西来的…请更加的…渴求${sc()}的嘴唇吧~~${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          '「哈啊啊~…和喜欢的对方亲吻什么的居然会那么舒服来的呀…♪」',
        );
        await era.printAndWait('「啊啊…请再…亲更多次吧~………」');
      } else {
        await era.printAndWait('「嗯呜~…这，这样的…才不算什么呢！…！」');
      }
      kojo.接吻 = 1;
      return 0;
    }

    // 二回目以降
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.接吻 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「嗯唔…嗯啾~…嗯噗…呼啊…啊啊~…非常的舒服啊~………${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}脸红得发烫，沉醉在和${master_name}的亲吻之中。`,
      );
      await era.printAndWait(
        `「${sc()}的嘴唇…全部都是主人的东西来的…请更加的…渴求${sc()}的嘴唇吧~~${heart(1)}」`,
      );
      kojo.接吻 = 5;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.接吻 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「嗯~…嗯啾~…啾~…哈啊啊~…感觉脑袋里变得一片空白了呢~…♪」',
      );
      await era.printAndWait(
        `「啊啊啊…只是亲吻就变得那么舒服什么的………${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}如同说梦话地一样喃喃自语着，可见多么地沉浸在亲吻之中………`,
      );
      kojo.接吻 = 4;
    } else if (
      system.顺从 >= 2 &&
      (kojo.接吻 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「好、的…亲吻…对吧…嗯~…哈啊啊…还、还要更多吗？」',
      );
      await era.printAndWait('「真、真是没有办法呢…嗯啾…啾…啾…♪」');
      kojo.接吻 = 3;
    } else if (kojo.接吻 <= 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait('「哈啊…哈啊…这样…这样的………」');
      kojo.接吻 = 2;
    }
    return 0;
  }

  let p = 0;

  if (era_flag.selectcom === 7) {
    if (kojo.自己扒开 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊啊嗯~…${sc()}的小穴深处…被主人看到了啊~~${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `…这样的…自己张开那里让大人您看什么的…明明…很羞耻，的事情来的`,
        );
      } else {
        await era.printAndWait(
          `「不，不行了啊…已经不能再张开了…哈呜！…${sc()}明、明白了…会张得…更大的………」`,
        );
      }
      // CFLAG:TARGET:308  = 1（变量语义：CFLAG 族，TARGET:308）
      kojo.自己扒开 = 1;
      return 0;
    } else if (era.get(`tequip:${target}:53`) === 1) {
      if (
        era.get(`talent:${target}:76`) === 0 &&
        era.get(`talent:${target}:85`) === 0
      ) {
        if (era.get(`abl:${target}:17`) >= 5) {
          await era.printAndWait(
            `「啊啊~、好奇怪呀~…明明这样好羞耻来的…为什么………」`,
          );
          await era.printAndWait(
            `一副被命令、没有办法才……地这么一副样子的${target_name}、看着放在自己面前的水晶球身体“噗噜”地颤抖了。`,
          );
          await era.printAndWait(
            `「一想到要被好多人看到后…身，身体就要变得…啊啊~${heart(1)} 啊啊啊~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(`「呜……」`);
          await era.printAndWait(
            `不甘心地咬着自己得下嘴唇、${target_name}向着眼前的水晶球张开了自己的秘处。`,
          );
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「嗯哼~${heart(1)} ${target_name}明白了~。就按照主人说的那样、给大~家、大饱眼福一下吧~」`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「啊啊……虽然感到十分地羞耻、但是会按照${master_name}所说的那样……」`,
          );
        }

        if (
          era.get(`talent:${target}:0`) === 1 &&
          era.get(`talent:${target}:136`) === 1 &&
          era.get(`talent:${target}:271`) === 1
        ) {
          era.print(
            `「正在看的大家……能不能看见呢~？这个就是、${sc()}的…淫乱雌犬${target_name}的、处女小穴来的…`,
          );
          era.print(
            `${'\u3000'}还没有被某位人的粗壮之物给贯穿的处女小穴来的、想要魔王大人给予名为快乐的诱饵而、`,
          );
          era.print(
            `${'\u3000'}一直都像这样不像样地流着口水黏糊糊的样子、的雌犬小穴来的。`,
          );
        } else if (
          era.get(`talent:${target}:0`) === 1 &&
          era.get(`talent:${target}:271`) === 1
        ) {
          era.print(
            `「正在看的大家……能不能看见呢~？这个就是、${sc()}的…${target_name}的、处女小穴来的…`,
          );
          era.print(
            `${'\u3000'}明明还没有被某个人的粗壮之物给贯穿、因为没法忘记魔王大人给予的愉悦、所以一直都这么黏糊糊的…`,
          );
        } else if (era.get(`talent:${target}:0`) === 1) {
          era.print(
            `「正在看的大家……能不能看见呢~？这个就是、${sc()}的…${target_name}的、、处女小穴来的…`,
          );
        } else if (
          era.get(`talent:${target}:136`) === 1 &&
          era.get(`talent:${target}:271`) === 1
        ) {
          era.print(
            `「正在看的大家……能不能看见呢~？这个就是、${sc()}的…淫乱雌犬${target_name}的、小穴来的…`,
          );
          era.print(
            `${'\u3000'}就像这样、一直都不知羞耻地流着口水黏糊糊的、贪欲的雌犬小穴来的。`,
          );
        } else if (era.get(`talent:${target}:136`) === 1) {
          era.print(
            `「正在看的大家……能不能看见呢~？这个就是、${sc()}的…淫乱雌犬${target_name}的、小穴来的…`,
          );
        } else if (era.get(`talent:${target}:271`) === 1) {
          era.print(
            `正在看的大家……能不能看见呢~？这个、${sc()}的…${target_name}的小穴是、一直都是黏糊糊的噢~。`,
          );
          era.print(
            `${'\u3000'}要说为什么的话、那是因为魔王大人一直都将快乐和愉悦交给${sc()}的原因…`,
          );
        } else {
          era.print(
            `「正在看的大家……能不能看见呢~？这个就是、${sc()}的…${target_name}的、小穴来的…`,
          );
        }

        if (era.get(`talent:${target}:89`) === 1) {
          era.print(
            `${'\u3000'}只是想象被看到就会、不断地变湿了的、下流的小穴…`,
          );
          era.print(
            `${'\u3000'}明明都没有在大家的面前…不对、只有魔王大人的视线也会很快就会湿掉了。`,
          );
        }

        if (
          era.get(`talent:${target}:78`) === 1 &&
          era.get(`talent:${target}:0`) === 0
        ) {
          era.print(`${'\u3000'}魔王大人虽然让、${sc()}喜欢是上弄胸部的快感……`);
          era.print(
            `${'\u3000'}但是这里也一样、最喜欢做了，不管是被欺负也好，还是被疼爱也好…${heart(1)}`,
          );
        } else if (
          era.get(`talent:${target}:78`) === 1 &&
          era.get(`talent:${target}:0`) === 1
        ) {
          era.print(
            `${'\u3000'}因为魔王大人教会了${sc()}胸部的真正用法，弄胸部就会不行了………`,
          );
          era.print(
            `${'\u3000'}所以说还没有对这里调教过、不知道以后用这里侍奉能不能符合魔王大人的喜好、十分地担心……`,
          );
        }

        if (
          era.get(`talent:${target}:75`) === 1 &&
          era.get(`talent:${target}:0`) === 0
        ) {
          era.print(
            `${'\u3000'}因为被魔王大人抽插了不知道多少次了、所以变得最喜欢结合的交配狂了。`,
          );
        } else if (
          era.get(`talent:${target}:75`) === 1 &&
          era.get(`talent:${target}:0`) === 1
        ) {
          era.print(`${'\u3000'}想要让魔王大人来擦来擦去、一直都痒地不行呢。`);
        }

        if (era.get(`talent:${target}:74`) === 1) {
          era.print(
            `${'\u3000'}因为不管什么时候都会想要快乐而痒得不行、一不留神就自慰起来了啊。`,
          );
          era.print(`${'\u3000'}就像这样一样……嗯~、嗯~……`);
        }

        if (
          era.get(`talent:${target}:88`) === 1 &&
          era.get(`talent:${target}:0`) === 0
        ) {
          era.print(
            `${'\u3000'}不管被多么粗鲁的抽插过……不对、不管做出怎样痛苦的事情、${sc()}的这里都会流出开心的泪水。`,
          );
        } else if (
          era.get(`talent:${target}:88`) === 1 &&
          era.get(`talent:${target}:0`) === 1
        ) {
          era.print(
            `${'\u3000'}不管被鞭子打也好、还是被拿针刺都好、${sc()}的这里都会流出开心的泪水。`,
          );
        }

        if (
          era.get(`talent:${target}:77`) === 1 &&
          era.get(`tequip:${target}:13`)
        ) {
          era.print(
            `${'\u3000'}不只是前面、后面也是很厉害的噢、${sc()}。看吧…现在里面也有着那么有精神的肛门虫在里面呢`,
          );

          if (era.get(`talent:${target}:0`) === 1) {
            era.print(
              `${'\u3000'}因为魔王大人只专心调教这边的原因、所以变成了如此下流的肛穴了呀。`,
            );
            era.print(
              `${'\u3000'}不只是用来侍奉的小穴来的、${sc()}自身也会有感觉的、不知道多少次因为太有感觉而恍惚了…唔哼哼~${heart(1)}`,
            );
          } else {
            era.print(
              `${'\u3000'}前面也好、后面也好…小穴也好、肛穴也好、身体全部都被魔王大人、给予了调教了${heart(1)}`,
            );
          }
        } else if (era.get(`talent:${target}:77`) === 1) {
          era.print(
            `${'\u3000'}不只是前面，后面也很厉害的噢、${sc()}。因为魔王大人只专注调教这边的原因、${sc()}的肛穴…`,
          );

          if (era.get(`talent:${target}:0`) === 1) {
            era.print(
              `${'\u3000'}已经、完全变成了只为侍奉而用的肛穴了。${sc()}自身也，也变得奇怪地敏感起来了…唔哼哼${heart(1)}`,
            );
          } else {
            era.print(
              `${'\u3000'}跟小穴一样、肛穴也……不对、不只是肛穴，全身都被魔王大人蹂蹑过，给予了调教了${heart(1)}`,
            );
          }
        }
        // 同一行输出：无后缀 PRINTFORM 五段 SIF 后缀连续不换行，
        // 末行 PRINTFORML 才收行（#600）。五条 SIF 的条件提到语句外当条件、
        // 文本留在输出语句里（保真锁按序核对台词片段）
        const devoted = era.get(`talent:${target}:85`) === 1; // 爱慕
        const lewd = era.get(`talent:${target}:76`) === 1; // 淫乱
        const female_dog = era.get(`talent:${target}:136`) === 1; // 牝犬
        const greedy = era.get(`talent:${target}:271`) === 1; // 时常发情
        const virgin = era.get(`talent:${target}:0`) === 1; // 处女
        era.print(
          `${'\u3000'}只要是魔王大人的命令来的话、${sc()}一定会在这里…用这个` +
            (devoted ? '魔王大人专用' : '') +
            (lewd ? '淫乱' : '') +
            (female_dog ? '牝犬' : '') +
            (greedy ? '贪欲' : '') +
            (virgin ? '处女' : '') +
            `小穴来、给今天看到的大家侍奉也说不定呢。`,
        );
        era.print(
          `当然，不管那是、在野外垂死的最底层居民也好、还是满身污臭的亚人也好……`,
        );

        if (
          era.get(`talent:${target}:82`) === 1 &&
          era.get(`abl:${target}:39`) >= 5
        ) {
          era.print(
            `${'\u3000'}啊啊……但是、被魔王之外的男人抱住什么的、还是觉得有点毛骨悚然呢。还不如狗更好呢。`,
          );
          era.print(
            `${'\u3000'}哪怕是这样、只要魔王大人下命令的话……${sc()}就会、打从欣喜接受其命令。`,
          );
        } else if (era.get(`talent:${target}:82`) === 1) {
          era.print(
            `${'\u3000'}啊啊……但是、被魔王之外的男人抱住什么的、还是觉得有点毛骨悚然呢。`,
          );
          era.print(
            `${'\u3000'}哪怕是这样、只要魔王大人下命令的话……${sc()}就会、打从欣喜接受其命令。`,
          );
        }
        await era.printAndWait(
          `${'\u3000'}当然、如果你没有对魔王大人抱有绝对的忠诚的话……真是没有缘分的话题呢、对吧」`,
        );
      }
    } else if (
      kojo.自己扒开 <= 99 &&
      (era.get(`talent:${target}:76`) === 1 ||
        era.get(`talent:${target}:85`) === 1)
    ) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「是的、请看吧、主人~${heart(1)}」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「啊啊~……虽然很害羞来着、${master_name}想要看的话……」`,
        );
      }

      if (
        era.get(`talent:${target}:0`) === 1 &&
        era.get(`talent:${target}:136`) === 1 &&
        era.get(`talent:${target}:271`) === 1
      ) {
        era.print(`「觉得怎样呢~…？想要魔王大人将其贯穿、一直都像这样`);
        era.print(
          `${'\u3000'}不知羞耻地流着口水黏糊糊得、雌犬处女小穴来的${heart(1)}`,
        );
      } else if (
        era.get(`talent:${target}:0`) === 1 &&
        era.get(`talent:${target}:271`) === 1
      ) {
        era.print(
          `「觉得怎样呢…？就像所见的那样、还是处女来的噢…想要让魔王大人快一点将其贯穿、`,
        );
        era.print(
          `${'\u3000'}一直都像这样、黏糊糊地等待着都快要等不住了呢~${heart(1)}`,
        );
      } else if (era.get(`talent:${target}:0`) === 1) {
        era.print(`「觉得怎样呢…？就像所见的那样、还是处女来的噢…`);
        era.print(
          `${'\u3000'}想要让魔王大人快一点将其贯穿、这么地一抽一抽地呢${heart(1)}`,
        );
      } else if (
        era.get(`talent:${target}:136`) === 1 &&
        era.get(`talent:${target}:271`) === 1
      ) {
        era.print(
          `「觉得怎样呢~…？就像这也、一直都流着口水黏糊糊的、贪欲的雌犬小穴来的贪欲。`,
        );
      } else if (era.get(`talent:${target}:136`) === 1) {
        era.print(
          `「请吧~、请鉴赏吧~…这样不知羞耻的雌犬小穴也可以的话、请随便……`,
        );
      } else if (era.get(`talent:${target}:271`) === 1) {
        era.print(
          `「请吧~、请鉴赏吧~…一直都黏糊糊的，贪欲的发情小穴也可以的话、请随便……`,
        );
      } else if (era.get(`talent:${target}:89`) === 1) {
        era.print(
          `「只是视线而已、就会变得那么湿的${sc()}的小穴也可以的话……${sc()}自己也就、拜托您了……`,
        );
      } else {
        era.print(
          `「请吧~、请鉴赏吧~…${sc()}的全部、都是魔王大人的东西来的啦……`,
        );
      }

      if (
        era.get(`talent:${target}:78`) === 1 &&
        era.get(`talent:${target}:0`) === 0
      ) {
        era.print(`${'\u3000'}不只是胸部而已、这边也请调教到发狂吧~。`);
      } else if (
        era.get(`talent:${target}:78`) === 1 &&
        era.get(`talent:${target}:0`) === 1
      ) {
        era.print(`${'\u3000'}只是胸部还是不满足呢、也请充分地调教这边吧。`);
      }

      if (
        era.get(`talent:${target}:75`) === 1 &&
        era.get(`talent:${target}:0`) === 0
      ) {
        era.print(
          `${'\u3000'}也请别只是看而已、激烈地抽插也是可以的哦？不对、很想要做啊…已经、快点、快点…！`,
        );
      } else if (
        era.get(`talent:${target}:75`) === 1 &&
        era.get(`talent:${target}:0`) === 1
      ) {
        era.print(
          `${'\u3000'}也请别只是看而已、就想要在这里感受魔王大人呢。给${sc()}、教给真正的抽插狂吧~…！`,
        );
      }

      if (era.get(`talent:${target}:74`) === 1) {
        era.print(`啊啊~…！就这样也好、也好想要自慰、好想自慰地不行……！`);
      }

      if (era.get(`talent:${target}:88`) === 1) {
        era.print(
          `不管被怎样粗鲁地做都没有关系得啦……不管怎样的狂风大雨、${sc()}都会感觉到愉悦的…！`,
        );
      }
      if (era.get(`tequip:${target}:11`) || era.get(`tequip:${target}:13`)) {
        era.print(`${'\u3000'}像这种蠕虫什么的、根本不够呢…！根本不满足嘛~…！`);
      }

      if (era.get(`talent:${target}:77`) === 1) {
        era.print(
          `${'\u3000'}小穴不行的话、肛穴也没有关系。请、请对${sc()}……！`,
        );
      }

      if (era.get(`talent:${target}:76`) === 1) {
        era.print(`${'\u3000'}请用主人的、又热又粗的东西贯穿吧${heart(1)}`);
        await era.printAndWait(
          `${'\u3000'}请怜悯一下吧、请抽插身体的深处吧${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        era.print(
          `${'\u3000'}请用${master_name}的、又热又粗的东西贯穿吧~${heart(1)}`,
        );
        await era.printAndWait(
          `${'\u3000'}请抱住${sc()}、深处的里面想要被贯穿呢~${heart(1)}」`,
        );
      }
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.自己扒开 <= 104 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊啊~…主人${heart(1)}」`);
        await era.printAndWait(
          `「如果实在忍不住了的话…就这样${sc()}推倒吧…强奸到失神也没有关系的噢${heart(3)}」`,
        );
        await era.printAndWait(
          `${target_name}露出了一脸淫猥的表情诱惑着${master_name}………`,
        );
        // CFLAG:306  = 105（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 105;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.自己扒开 <= 103 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊~…居然必须要 给喜欢的对方...看这种地方什么的…♪」`,
        );
        await era.printAndWait(
          `「虽然很害羞…但是我会加油张开的${heart(1)} 请鉴赏吧~${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}脸通红着张开自己的秘处………`);
        // CFLAG:306  = 104（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 104;
      } else if (
        era.get(`abl:${target}:17`) >= 3 &&
        (kojo.自己扒开 <= 102 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊~、好奇怪的啊~…这样的事情明明很害羞来的…为什么………」`,
        );
        await era.printAndWait(
          `「一明白实在被看到的话…啊啊~身体就变热起来了…啊啊~${heart(1)} 啊啊啊~${heart(1)}」`,
        );
        // CFLAG:306  = 103（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 103;
      } else if (kojo.胸爱抚 <= 101 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「呜嗯~…怎、怎样…这样的话…就已经满足了吧？」`);
        await era.printAndWait(`「想、想看的话，那就看更多一点就好了啊…！」`);
        // CFLAG:306  = 102（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 102;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 8) {
    if (kojo.插入手指 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊啊~${heart(1)} 主人的手指…在${sc()}的小穴里…${heart(1)}」`,
        );
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`talent:${target}:85`) === 1
      ) {
        await era.printAndWait(
          `「好的~…${sc()}没关系的啦~…请按照大人您想要的做吧~…嗯~…那里…好棒…的说~唔嗯~♪」`,
        );
      } else {
        await era.printAndWait(
          `「啊啊~…不行…不行的啊啊…伸地那么进去的…唔哈啊啊啊！」`,
        );
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
          `「嗯哈啊~${heart(1)} 啊~${heart(1)} 更加抽插那里吧~${heart(1)}」`,
        );
        await era.printAndWait(
          `「请用主人的手指来…扣着${sc()}淫乱的小穴吧哈呜呜呜呜哎哎哎~~~~${heart(3)}」`,
        );
        // CFLAG:309  = 5（变量语义：CFLAG 族，309）
        kojo.插入手指 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.插入手指 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊~啊啊~…嗯~${heart(1)} 那里…非常的舒服呀~~${heart(1)}」`,
        );
        await era.printAndWait(
          `「请更加地…请更加粗野地程度…扣${sc()}得那里吧~…啊~哈~哈啊啊啊嗯~♪」`,
        );
        // CFLAG:309  = 4（变量语义：CFLAG 族，309）
        kojo.插入手指 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.插入手指 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊~…将腰抬得更高什么的…哈嗯呜~！？」`);
        await era.printAndWait(
          `「才、才不是呢~…那里才不是有感觉的地方呢…哈呜~哈呜~啊呜~啊呜嗯啊啊哈啊啊哈啊~～～～！！！」`,
        );
        // CFLAG:309  = 3（变量语义：CFLAG 族，309）
        kojo.插入手指 = 3;
      } else if (kojo.插入手指 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊啊~…手指在…那么的…粗鲁地做…嗯…呜…啊啊~…」`);
        // CFLAG:309  = 2（变量语义：CFLAG 族，309）
        kojo.插入手指 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 9) {
    if (kojo.舔肛 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「哈嗯呜~…主人~${heart(1)}」`);
        await era.printAndWait(
          `「啊啊~明明不干净的肛穴被舔着…却还会有感觉……真是……${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「不、不行的呀…舔那种地方的话…哈呜嗯~♪」`);
        await era.printAndWait(
          `「好、好痒呀~、这、这样的~…啊~啊啊啊啊~${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「哈呜嗯~！居、居然舔那种地方什么的…脑、脑袋变奇怪了吗！」`,
        );
      }
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310）
      kojo.舔肛 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯哈啊~…更加…更加往肛穴的深处…哈嗯呜~用舌头来侵犯吧~！请用舌头来侵犯吧~~~！」`,
        );
        await era.printAndWait(
          `「啊啊啊~…肛穴好舒服啊~…只是被呸咯呸咯地舔了而已…只是这样理性就要飞走啦~~${heart(5)}」`,
        );
        // CFLAG:310  = 5（变量语义：CFLAG 族，310）
        kojo.舔肛 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.舔肛 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊~…这么的…专注地舔着那里的话…${sc()}…真的要感觉到奇怪的…♪」`,
        );
        await era.printAndWait(
          `「啊啊~…用舌头来挖吧…更加地…侵犯着肛穴吧~~………♪」`,
        );
        // CFLAG:310  = 4（变量语义：CFLAG 族，310）
        kojo.舔肛 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.舔肛 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呜嗯~…啊~啊啊啊~…不要啊…不要再舔下去了呀~…嗯嗯~！」`,
        );
        await era.printAndWait(`「要变得…奇怪起来了呀………」`);
        // CFLAG:310  = 3（变量语义：CFLAG 族，310）
        kojo.舔肛 = 3;
      } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊啊~…不、不要…说了不要了啊…啊~啊啊~！」`);
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
          `「嗯哼呜呜~！？啊啊~啊~…哈啊恩~…！那个小玩具…好棒呀~${heart(1)}」`,
        );
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`talent:${target}:85`) === 1
      ) {
        await era.printAndWait(
          `「啊~…啊啊嗯~♪…是、是的没问题的~…请更加…用力压下去吧…请将${sc()}当成玩具来玩耍吧~…♪」`,
        );
      } else {
        await era.printAndWait(
          `「呜呀~…这、这是什么啊、哪个是…不、不要…不要压下去…啊~啊啊啊啊啊~！」`,
        );
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
          `「${sc()}的小阴蒂…请更加地…更加地欺负那里吧~…${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊啊~…一抽一抽的要来了${heart(1)} 来了呀~~${heart(1)}」`,
        );
        // CFLAG:311  = 5（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.振动宝石 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊~…啊啊~嗯~…哼啊啊~…${heart(1)}${'\u3000'}哈啊…哈啊…啊啊、为什么停下来了呢？」`,
        );
        await era.printAndWait(
          `「情更加地…请更加地玩弄吧~…将${sc()}的身体当成玩具来玩弄吧~${heart(1)}」`,
        );
        await era.printAndWait(
          `「…哈呜啊啊~♪…小阴蒂…小阴蒂好舒服呀~${heart(3)}」`,
        );
        // CFLAG:311  = 4（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.振动宝石 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊~…哈呜嗯~…啊啊呜~…哪怕想要逃开也好…腰、腰部，腰部却自己就~♪」`,
        );
        await era.printAndWait(
          `「哈呜啊啊~…是、是的…${sc()}会忍住的…啊~啊啊啊～！」`,
        );
        // CFLAG:311  = 3（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 3;
      } else if (kojo.振动宝石 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「这，这样的…只是哔哩哔哩地…一点也…哈啊~…啊啊~…嗯嗯~！」`,
        );
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
            `「啊啊啊~…好棒…的啊~…用那个丑恶的蠕虫…将${sc()}的处女给夺走对吧~…${heart(1)}」`,
          );
          await era.printAndWait(
            `「如果主人那么觉得这样好的话…那就这样做吧~………♪」`,
          );
          await era.printAndWait(
            `「所以…嗯~…嗯呜！！？啊…啊啊…嗯呜…呜呜呜呜呜~！」`,
          );
          await era.printAndWait(
            `${master_name}打断了${target_name}的话语直接将阴道虫强行塞了进去………`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「啊哈呜嗯~…不行啊…不行…只有这个…哈啊…啊~！」`,
          );
          await era.printAndWait(
            `${master_name}毫不留情地将阴道虫往${target_name}的深处塞了进去。`,
          );
          await era.printAndWait(
            `「嗯呜…哈呜…啊啊~…啊~啊啊啊啊啊啊啊啊啊啊啊！！！」`,
          );
          await era.printAndWait(
            `被丑恶到极致的蠕虫给夺走处女的${target_name}只在不停地留着眼泪………`,
          );
        } else {
          await era.printAndWait(
            `「呜嗯…呜…哈啊…哈啊…被这种东西…${sc()}的第一次给…………」`,
          );
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「嗯呜~…怎么会这样…一下就到里面去了呜呜呜呜呜呜呜${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的深处进去了一只阴道虫后身体就不停得颤抖着………`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「啊啊~…居然还有这样得东西…嗯呜~…不，不行的啊♪不能在里面动…哈呜嗯♪啊呜呜呜♪」`,
          );
          await era.printAndWait(
            `喜欢恶作剧的阴道虫在${target_name}的蜜穴里面激烈地蠕动着来回钻着………`,
          );
        } else {
          await era.printAndWait(
            `「不，不要…好恶心…不要嗯呜啊啊…啊啊呜…在里面动着啊啊啊…啊啊~！」`,
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
          `「唔啊啊~…蠕虫先生在…${sc()}的小穴的深处…噢~…哦吼~${heart(1)}」`,
        );
        await era.printAndWait(
          `「在和子宫口…亲吻着呢…噢噢${heart(1)} 啊啊~…嗯哼~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}因为阴道虫进到了深处而漏出了满足的呻吟………`,
        );
        // CFLAG:312  = 5（变量语义：CFLAG 族，312）
        kojo.壶虫 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.壶虫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊~…真是…比起这种东西…还是大人您的大鸡巴比较好呢…啊嗯~♪」`,
        );
        await era.printAndWait(
          `「啊啊~…不行…在里面动不行啊…啊啊~…魔王大人坏心眼~………${heart(1)}」`,
        );
        // CFLAG:312  = 4（变量语义：CFLAG 族，312）
        kojo.壶虫 = 4;
      } else if (
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.壶虫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯~…哈啊啊…被这种…下等的蠕虫给…将${sc()}的身体给…啊啊~哼嗯~♪」`,
        );
        await era.printAndWait(
          `「才、才不是呢…感觉舒服什么…啊呜呀啊啊~${heart(1)}」`,
        );
        await era.printAndWait(
          `每当阴道虫在腔内闹腾起来的时候${target_name}便漏出了可爱的声音………`,
        );
        // CFLAG:312  = 3（变量语义：CFLAG 族，312）
        kojo.壶虫 = 3;
      } else if (kojo.壶虫 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「不、不要啊…请不要再…这样欺负${sc()}的…那里了…嗯哈呜~嗯呜~不行啊哎~！不能在里面动哎！」`,
        );
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
      (kojo.壶虫着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊哈啊…阴道的穴被…被扩地那么大了呀…${heart(1)}」`,
      );
      await era.printAndWait(`「下次会放什么东西进去呐~？」`);
      // CFLAG:372  = 3（变量语义：CFLAG 族，372）
      kojo.壶虫着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.壶虫着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「哈啊啊…小穴变得寂寞起来了呀………」`);
      await era.printAndWait(`「会给代替的东西吧~…嗯哼哼哼~${heart(1)}」`);
      // CFLAG:372  = 2（变量语义：CFLAG 族，372）
      kojo.壶虫着脱 = 2;
    } else if (kojo.壶虫着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「呜啊…啊啊………哈啊…哈啊…哈啊…」`);
      // CFLAG:372  = 1（变量语义：CFLAG 族，372）
      kojo.壶虫着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 12) {
    if (kojo.振动杖 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「等，等下…难、难道…要将那个振动着的棒…塞到${sc()}的…呜嗯~、果、果然是这样嘛~………♪」`,
        );
        await era.printAndWait(
          `「啊~…啊~…嗯~…哼呜~…嗯~…啊啊、这、这个…好棒呀~…${heart(1)}」`,
        );
        await era.printAndWait(
          `「…哼啊啊啊~！？不、不行了~~、突、突然变强什么的不行呜呜呜~！？」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「啊嗯~…哈呀嗯呜~！？啊啊~…请不要用这种...东西...来欺负${sc()}吧………」`,
        );
        await era.printAndWait(
          `${player_name}往${target_name}的胸部还有脚放上了振动之杖，享受着${target_name}的反应。`,
        );
        await era.printAndWait(`「啊~…嗯呜~…这、这样的事情已经…啊啊~！」`);
        await era.printAndWait(
          `振动之杖直接塞到了${target_name}蜜穴里面开始强烈震动起来。`,
        );
        await era.printAndWait(
          `「哈啊呜~！嗯呀啊啊！？不、不行了~~…不要…呜呀~呜嗯~呜嗯~呜呀啊啊啊啊！？！？」`,
        );
      } else {
        await era.printAndWait(
          `「呀呜呜嗯~…不、不要再压下去…不、不行嗯~~…！」`,
        );
      }
      // CFLAG:313  = 1（变量语义：CFLAG 族，313）
      kojo.振动杖 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.振动杖 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊~啊哈啊~…嗯~…嗯呜呜呜~${heart(1)}」`);
        await era.printAndWait(
          `「果然${sc()}的身体…被那么强烈的刺激了的话${heart(1)} 啊~${heart(1)} 啊啊~${heart(1)}」`,
        );
        await era.printAndWait(
          `「就会变得更加舒服起来了啊啊~~~${heart(3)}…请更加地…欺负${sc()}吧${heart(5)}」`,
        );
        // CFLAG:313  = 5（变量语义：CFLAG 族，313）
        kojo.振动杖 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.振动杖 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊~…哈啊~…啊~…嗯~…请不要…那么地欺负${sc()}吧…哼嗯~…呼啊啊啊~！？」`,
        );
        await era.printAndWait(
          `${target_name}的身体被振动之杖给予的快乐而颤抖着。`,
        );
        await era.printAndWait(
          `「啊啊啊~${heart(1)} 不行…不行的啊…真的是…啊~啊啊啊~${heart(3)}」`,
        );
        // CFLAG:313  = 4（变量语义：CFLAG 族，313）
        kojo.振动杖 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.振动杖 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈呜~…拜托了…请不要再这样...啊~…${sc()}…真的要…啊啊~哈呜啊啊~…嗯~${heart(1)}」`,
        );
        await era.printAndWait(
          `「不要啊啊啊啊…震动不行…不行的啦~~………${heart(1)}」`,
        );
        // CFLAG:313  = 3（变量语义：CFLAG 族，313）
        kojo.振动杖 = 3;
      } else if (kojo.振动杖 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「哈嗯呜~…原，原谅${sc()}…那、那个…压下去的话…就会变奇怪起来了…啊啊~哈嗯呜啊啊~！」`,
        );
        // CFLAG:313  = 2（变量语义：CFLAG 族，313）
        kojo.振动杖 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 13 && era.get(`tequip:${target}:13`)) {
    if (kojo.肛门虫 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「啊啊啊~…肛穴在…被侵犯着呢~~…${heart(1)}」`);
        await era.printAndWait(
          `「请让可爱的蠕虫酱…将${sc()}的肛穴弄得更加舒服起来吧~~${heart(3)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「啊啊…${sc()}的屁股…再被扩大着啊…啊嗯~…嗯啊啊啊~！」`,
        );
        await era.printAndWait(
          `「啊~哈啊~啊嗯~！…请、请不要这样欺负那里啊~………」`,
        );
      } else {
        await era.printAndWait(
          `「不，不要…屁股在被…啊啊~…好奇怪感觉~…要变奇怪了啊~………」`,
        );
      }
      // CFLAG:TARGET:314  = 1（变量语义：CFLAG 族，TARGET:314）
      kojo.肛门虫 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「嗯哦啊啊~${heart(5)}」`);
        await era.printAndWait(
          `「啊哼嗯~…啊啊~肛穴…肛穴好棒呀~~噢噢~${heart(1)}」`,
        );
        await era.printAndWait(
          `「被下等的蠕虫给挖着肛穴…脑袋好像要变奇怪了啊呜呜~~${heart(3)}」`,
        );
        // CFLAG:314  = 7（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.肛门虫 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯哼唔~…肛穴里蠕虫酱完全钻进去了~~…${heart(1)}」`,
        );
        await era.printAndWait(
          `「哼啊啊啊啊~…在里面…活蹦乱跳着呢~…${heart(1)}」`,
        );
        await era.printAndWait(
          `「主人~…${sc()}已经…不行…肛、肛穴要变得不行了啊！」`,
        );
        // CFLAG:314  = 6（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊~…嗯~…嗯哼~…不行~…魔王大人…请不要看着那里~………」`,
        );
        await era.printAndWait(
          `「不干净的洞…变得那么舒服的样子被看到了的话…${sc()}会羞耻地要死掉了…」`,
        );
        await era.printAndWait(
          `${target_name}的肛穴的深处里正塞进一只肛门虫，而这只肛门虫则复杂地蠕动着自己得身躯。`,
        );
        await era.printAndWait(
          `「哈嗯呜~~♪不、不行~…屁股…哼啊啊啊~要变奇怪了啊~~~！」`,
        );
        // CFLAG:314  = 5（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.肛门虫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊~…蠕虫…嗯呜~…在屁股得小穴里…啊啊~…蠕动着…哈呜」`,
        );
        await era.printAndWait(
          `钻进${target_name}的肛穴深处的肛门虫正在复杂地蠕动着。`,
        );
        await era.printAndWait(
          `「哈呀啊啊啊！？…这样得…感觉到…要感觉到啦…哈呜嗯~${heart(1)}」`,
        );
        // CFLAG:314  = 4（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哦、哦哈啊~♪…肮脏的洞里…居然变得那么舒服起来了…啊啊~哼啊啊嗯~♪」`,
        );
        await era.printAndWait(
          `「这、这肯定魔王的原因来的…这肯定是魔王施展的魔法${sc()}才会变成这样的…」`,
        );
        await era.printAndWait(
          `「哼唔…原谅…原谅那里吧…屁股的洞再这样下去的话要不行了啊啊啊啊！」`,
        );
        // CFLAG:314  = 3（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 3;
      } else if (kojo.肛门虫 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「啊哈啊…唔呜呜…呜呜~…这…样的…的事情…绝对不会原谅…的啊…啊啊~！」`,
        );
        await era.printAndWait(
          `在${target_name}的深处肛门虫正在欢喜地蠕动中、凌辱着${target_name}的肛门………`,
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
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.肛门虫着脱 < 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「嗯哈啊啊~～………${heart(1)}」`);
      await era.printAndWait(`${target_name}发出了不满的叹息。`);
      await era.printAndWait(
        `「${sc()}的肛穴…就这样变得空荡荡的了~………唔哼哼~${heart(1)}」`,
      );
      // CFLAG:374  = 4（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 4;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.肛门虫着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「哈啊…哈啊…啊啊~…屁股的洞居然…那么…舒服………」`);
      // CFLAG:374  = 3（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 3;
    } else if (
      era.get(`abl:${target}:3`) >= 3 &&
      (kojo.肛门虫着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊哈嗯~…更、更多~………♪」`);
      // CFLAG:374  = 2（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 2;
    } else if (kojo.肛门虫着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「啊啊…好、好难受…来的………」`);
      // CFLAG:374  = 1（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 14 && era.get(`tequip:${target}:14`)) {
    if (kojo.阴蒂夹 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「哈嗯呜~…用、用这种阴蒂夹将阴蒂酱夹住什么的…要变奇怪了啊~${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「哈嗯呜~！…不，不行的啊…那里被吸得那么紧的话…啊啊~！」`,
        );
      } else {
        await era.printAndWait(
          `「以为用这种东西…就能将${sc()}怎么样了吗…哈啊啊呜~！？吸、吸地那么紧…呜唔~」`,
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
        await era.printAndWait(
          `「哈嗯呜~…用、用这种阴蒂夹将阴蒂酱夹住什么的…要变奇怪了啊~${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊啊…请更加地…欺负淫乱的阴蒂酱吧~${heart(1)}」`,
        );
        // CFLAG:315  = 4（变量语义：CFLAG 族，315）
        kojo.阴蒂夹 = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.阴蒂夹 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈嗯~！…不、不行的啊~…那里被吸得那么紧的话…啊啊~！」`,
        );
        await era.printAndWait(`「啊啊~…脑袋要变奇怪了啊~…♪」`);
        // CFLAG:315  = 3（变量语义：CFLAG 族，315）
        kojo.阴蒂夹 = 3;
      } else if (kojo.阴蒂夹 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「哈嗯呜~…不、不行~…振动…不行…的啊………」`);
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
        `「啊啊~…还没有满足呢~…这次就用主人的手来~………${heart(1)}」`,
      );
      // CFLAG:375  = 3（变量语义：CFLAG 族，375）
      kojo.阴蒂夹着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.阴蒂夹着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊啊…${sc()}...可能已经不行了…♪」`);
      // CFLAG:375  = 2（变量语义：CFLAG 族，375）
      kojo.阴蒂夹着脱 = 2;
    } else if (kojo.阴蒂夹着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「哈啊…哈啊…终于…拿掉了………」`);
      // CFLAG:375  = 1（变量语义：CFLAG 族，375）
      kojo.阴蒂夹着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 15 && era.get(`tequip:${target}:15`)) {
    if (kojo.乳头夹 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「啊啊~…请将乳头…更加尽情地~…${heart(1)}」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「哈呜~…！请不要欺负乳头~…${heart(1)}」`);
      } else {
        await era.printAndWait(`「哈呜呜~…这样的…不行！」`);
        await era.printAndWait(`「乳，乳头…肿起来了啊…啊啊~！」`);
      }
      // CFLAG:316  = 1（变量语义：CFLAG 族，316）
      kojo.乳头夹 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.乳头夹 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊~…请将乳头…更加尽情地~…${heart(1)}」`);
        await era.printAndWait(`「哈啊啊…乳头…好舒服啊啊~…${heart(1)}」`);
        // CFLAG:316  = 4（变量语义：CFLAG 族，316）
        kojo.乳头夹 = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.乳头夹 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈呜嗯~…！请不要欺负乳头~…${heart(1)}」`);
        await era.printAndWait(
          `「胸部…一抽一抽地~…不行…要变得不行了呜~~${heart(1)}」`,
        );
        // CFLAG:316  = 3（变量语义：CFLAG 族，316）
        kojo.乳头夹 = 3;
      } else if (kojo.乳头夹 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「明，明明说了…不行来的…嗯~嗯嗯~…啊啊啊~！」`);
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
        `「哈啊啊啊~…乳头居然变成那么不像样子了…${heart(1)}」`,
      );
      // CFLAG:376  = 3（变量语义：CFLAG 族，376）
      kojo.乳头夹着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.乳头夹着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「哈啊…哈啊…哈嗯…胸部好难受的啊…♪」`);
      // CFLAG:376  = 2（变量语义：CFLAG 族，376）
      kojo.乳头夹着脱 = 2;
    } else if (kojo.乳头夹着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「哈啊…哈啊…乳头…好奇怪啊………」`);
      // CFLAG:376  = 1（变量语义：CFLAG 族，376）
      kojo.乳头夹着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 16 && era.get(`tequip:${target}:16`)) {
    if (kojo.榨乳器 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊啊嗯~…啊~啊啊…奶居然…出来那么多了呀~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的乳头如同射精一样不停地将母乳射出来、很快就将奶罐给装满了………`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「嗯~…啊啊~…居然出来那么多什么的…真是奇怪呢…啊嗯~${heart(1)}」`,
        );
        await era.printAndWait(
          `从${target_name}的乳头渗出了浓厚的母乳、一点一点地将奶罐给装满了………`,
        );
      } else {
        await era.printAndWait(
          `「不要啊…母乳应该给小宝宝喝的呀…啊~…啊啊啊~………」`,
        );
        await era.printAndWait(
          `从${target_name}的乳头渗出了母乳、一点一点地将奶罐给装满了………`,
        );
      }
      // CFLAG:317  = 1（变量语义：CFLAG 族，317）
      kojo.榨乳器 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.榨乳器 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯哈呜~…哈嗯呜~…从胸部射出来居然会那么舒服…不管怀孕多少次都没关系了啦~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的乳头如同射精一样不停地将母乳射出来、很快就将奶罐给装满了………`,
        );
        // CFLAG:317  = 4（变量语义：CFLAG 族，317）
        kojo.榨乳器 = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.榨乳器 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「胸部出来好多了啊~…啊~啊啊~…要出来了啊啊~…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的乳头渗出了浓厚的母乳、一点一点地将奶罐给装满了………`,
        );
        // CFLAG:317  = 3（变量语义：CFLAG 族，317）
        kojo.榨乳器 = 3;
      } else if (kojo.榨乳器 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「不要啊…母乳应该给小宝宝喝的呀…啊~…啊啊啊~………」`,
        );
        await era.printAndWait(
          `${target_name}的乳头渗出了母乳、一点一点地将奶罐给装满了………`,
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
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.榨乳器着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊啊嗯~…只要一点点也就够了请让${target_name}喝一口吧…♪」`,
      );
      // CFLAG:377  = 3（变量语义：CFLAG 族，377）
      kojo.榨乳器着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.榨乳器着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「哈啊哈啊…只喝一口也没有关系，请大人您尝一尝吧~…♪」`,
      );
      // CFLAG:377  = 2（变量语义：CFLAG 族，377）
      kojo.榨乳器着脱 = 2;
    } else if (kojo.榨乳器着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「啊啊…居然出来…那么多的母乳了………」`);
      // CFLAG:377  = 1（变量语义：CFLAG 族，377）
      kojo.榨乳器着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 19 && era.get(`tequip:${target}:19`)) {
    if (kojo.肛珠 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「嗯哈噢噢噢~…${heart(1)}」`);
        await era.printAndWait(`「小球…进去了…啊啊~…嗯哈啊啊~…${heart(1)}」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「啊啊~…又要欺负屁股了对吧~…嗯~…呼哈~…啊啊~${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「哈呜~…屁股的洞洞里…塞进这种东西是不…啊啊~呀啊啊啊~！」`,
        );
      }
      // CFLAG:TARGET:320  = 1（变量语义：CFLAG 族，TARGET:320）
      kojo.肛珠 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊嗯~…嗯哈嗯~${heart(1)}」`);
        await era.printAndWait(`「往肛穴里…塞进了好多小球了呀~${heart(1)}」`);
        await era.printAndWait(
          `「在里面…转来转去地动呢~…哈啊啊~${heart(1)} ${sc()}的屁股好像要不行了呀啊啊~${heart(1)}」`,
        );
        // CFLAG:320  = 7（变量语义：CFLAG 族，320）
        kojo.肛珠 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.肛珠 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「小球…进去了~…啊啊~…嗯哈啊啊~…${heart(1)}」`);
        await era.printAndWait(
          `「啊啊~…在肛穴里面转来转去呢~…哈啊啊~…${heart(1)}」`,
        );
        // CFLAG:320  = 6（变量语义：CFLAG 族，320）
        kojo.肛珠 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊~…屁股被欺负居然那么有感觉什么的~…♪」`);
        await era.printAndWait(
          `「魔王大人~…虽然是这种喜欢被欺负肛穴无可救药的变态来的…但也请让${target_name}呆在您的身旁吧~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}摇晃着拉珠从肛穴露出的那一部分${master_name}撒起了娇………`,
        );
        // CFLAG:320  = 5（变量语义：CFLAG 族，320）
        kojo.肛珠 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.肛珠 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊~…又要欺负屁股了对吧~…嗯~…哈啊~…啊啊~${heart(1)}」`,
        );
        await era.printAndWait(`「好过分…的说…这么欺负屁股的话…啊嗯~♪」`);
        // CFLAG:320  = 4（变量语义：CFLAG 族，320）
        kojo.肛珠 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哼嗯呜~…怎么能这样…啊啊~…肚子的里面…已经变得一抽一抽的了呀~…♪」`,
        );
        // CFLAG:320  = 3（变量语义：CFLAG 族，320）
        kojo.肛珠 = 3;
      } else if (kojo.肛珠 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「好难、好难受啊…肚子的里面…好难受啊啊…………」`);
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
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.肛珠着脱 < 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「哈啊恩~…肛穴…好像往外翻了………${heart(3)}」`);
      // CFLAG:379  = 4（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 4;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.肛珠着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「哈呜呀啊啊~……♪${'\u3000'}请更加地…欺负屁股吧~${heart(1)}」`,
      );
      // CFLAG:379  = 3（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 3;
    } else if (
      era.get(`abl:${target}:3`) >= 3 &&
      (kojo.肛珠着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「嗯哼唔~…不行~…屁股被欺负的话…就要变得不行了啊~…」`,
      );
      // CFLAG:379  = 2（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 2;
    } else if (kojo.肛珠着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「啊啊啊~…啊~…哈啊…哈啊…」`);
      // CFLAG:379  = 1（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 20) {
    if (kojo.正常位 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        if (era.get(`talent:${target}:76`) === 1) {
          if (era.get(`talent:${target}:314`) === 7) {
            await era.printAndWait(
              `「啊啊啊…主人~…非常感谢主人…将淫乱的堕落精灵的…处女小穴给贯穿掉…真的是非常感谢~${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}眼角流出了眼泪抱住了${player_name}。`,
            );
            await era.printAndWait(
              `「哼啊…啊…不、不要…${sc()}…明明…是第一次来的…嗯~…啊~…却立马对主人的大鸡巴有感觉了~…哈呜嗯~${heart(1)}」`,
            );
            await era.printAndWait(
              `「啊啊~…主人的大鸡巴好热~…啊啊~不行~…明明只是大鸡鸡进去了而已...脑袋…变得…奇怪起来了~${heart(3)}」`,
            );
            await era.printAndWait(
              `「嗯呜~${heart(1)}…请就这样…往淫乱小穴里…用主人的大鸡巴来，做上标记吧~！」`,
            );
            await era.printAndWait(
              `${target_name}好像为了让${player_name}不逃掉的一样，用双腿将${player_name}的腰给缠住………`,
            );
          } else {
            if (era.get(`talent:${target}:317`) === 4) {
              await era.printAndWait(
                `「啊啊啊~…终于…终于得到了主人的大鸡巴了~…${heart(1)}」`,
              );
              await era.printAndWait(
                `「好高兴…好高兴的说~…如果能…能更加早侵犯 ${target_name}就更好了~~${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}说着这样的话的时候也在忍耐着破瓜之疼。`,
              );
              await era.printAndWait(
                `「撒~…请更加…更加像野兽一样地侵犯吧~${heart(1)}让${target_name}成为主人的东西吧~${heart(3)}」`,
              );
              await era.printAndWait(
                `${target_name}再也没有想起在故乡的恋人了………`,
              );
            } else {
              await era.printAndWait(
                `「哈啊恩~…终于…给予大鸡巴了呀~…${heart(1)}」`,
              );
              await era.printAndWait(
                `「主人…${target_name}的淫乱处女小穴的味道怎样呀~？」`,
              );
              await era.printAndWait(
                `「${sc()}…主人的大鸡巴只是刚刚进去就已经去了好多次了呀~…${heart(3)}」`,
              );
              await era.printAndWait(
                `${target_name}说着这样的话的时候也在忍耐着破瓜之疼………`,
              );
            }
          }
        } else if (era.get(`talent:${target}:85`) === 1) {
          if (era.get(`talent:${target}:314`) === 1) {
            await era.printAndWait(
              `「和魔王…大人…做这样的事情什么的~…啊啊~${heart(1)}」`,
            );
            await era.printAndWait(
              `「${sc()}…没、没关系的~…请按照自己想要得…动吧~…嗯嗯~………！」`,
            );
            await era.printAndWait(
              `${target_name}眼睛流下了泪水一脸痛苦的样子，用力地紧紧抱住了${player_name}。`,
            );
            await era.printAndWait(
              `「啊啊~…这、这样的没有关系的啦…快点…请让${scf()}、${sc()}…成为、大人您的东西吧………${heart(3)}」`,
            );
            await era.printAndWait(
              `${target_name}长长的耳朵完全变得通红起来，将自己交给了${player_name}………`,
            );
          } else {
            if (era.get(`talent:${target}:317`) === 4) {
              await era.printAndWait(
                `「哈呜嗯~…好、好深的说…啊~啊啊啊…能感受到…大、大人的东西~${heart(1)}」`,
              );
              await era.printAndWait(
                `${player_name}将${target_name}的处女膜给捅破了、因为太疼在${player_name}的背后挠出了抓痕。`,
              );
              await era.printAndWait(
                `「啊啊~…啊~~${heart(1)}…啊啊啊~～${heart(1)}………好、好热~…好像要变奇怪了啊~…${heart(1)}」`,
              );
              await era.printAndWait(
                `「这样，${sc()}…就变成了大人您东西来的了…绝对…不会离开您的身边…啊啊~…更多…请更加地${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}一瞬间好像想起了某个重要的人，但是很快就忘记掉了………`,
              );
            } else {
              await era.printAndWait(`「嗯~…啊啊~…${heart(1)}」`);
              await era.printAndWait(
                `「${scf()}、${sc()}没关系的啊~…就像平时一样…毫不留情地将${sc()}…哼啊~…啊~啊啊啊啊～！！！」`,
              );
              await era.printAndWait(
                `${player_name}毫不留情地将阴茎插了过去、将${target_name}的处女膜给捅破了。`,
              );
              await era.printAndWait(
                `「哈啊…哈啊啊…啊啊...这样，${sc()}就成为了大人您的东西了啊…${heart(1)}」`,
              );
            }
          }
        } else {
          if (era.get(`talent:${target}:317`) === 4) {
            await era.printAndWait(
              `「啊啊~…不要啊~…哈呜…哈呜~…再这样…插进去的话…${sc()}的处女就…啊~啊啊啊啊~！」`,
            );
            await era.printAndWait(
              `${player_name}无视掉${target_name}的悲鸣直接将${target_name}的处女给夺走了。`,
            );
            await era.printAndWait(
              `「哈啊…哈啊…已经、已经没有脸再见那个人了…呜呜~…呜呜呜呜呜呜~………」`,
            );
            await era.printAndWait(
              `听着${target_name}的哭声${player_name}继续侵犯着………`,
            );
          } else {
            await era.printAndWait(
              `「唔呜呜…！………啊啊~…大，大鸡巴在…${sc()}的里面………」`,
            );
            await era.printAndWait(
              `「不、不行的啊…还、还不可以动…啊~啊~！哈啊呜呜~！」`,
            );
          }
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「嗯哈啊嗯~…！请更加地…去侵犯${sc()}的淫乱小穴吧~${heart(1)}」`,
          );
          await era.printAndWait(`「啊啊~…果然…被侵犯…嘴巴了…${heart(3)}」`);
          await era.printAndWait(
            `${target_name}抱住${player_name}发出了娇喘………`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「啊嗯~…嗯~…像这样…将大人您抱住什么的…十分愉快呢~…${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊~！…呀，呀嗯~…这、这么地…突然那么激烈得话…嗯~啊~哈啊嗯~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「哈啊…男人都是像这样…做的对吧…嗯~…嗯~…嗯哼唔~………」`,
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
          await era.printAndWait(`「请弄得…更加死去活来地吧~${heart(1)}」`);
          await era.printAndWait(
            `「就这在小穴的深处里面射出来吧~…请让${sc()}…去…去了吧~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}不停地发出愉悦的娇喘，从${target_name}的身上一点高贵气息都看不到了………`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊哈嗯唔~…哈唉呜~…小穴SEX…最棒了啊~${heart(1)}…请更多地…更加地侵犯那里吧~${heart(1)}」`,
          );
          await era.printAndWait(
            `「请播种子进去吧…好想被播种子进去啦~${heart(1)}…精液~…请给精液给${sc()}吧~~…呀~…呀啊啊~…啊~啊啊啊~${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}如同雌犬一样不断地呻吟着………`);
        } else {
          await era.printAndWait(`「嗯哈啊~…好舒服~~…${heart(1)}」`);
          await era.printAndWait(`「小穴SEX最棒了啊~~~${heart(3)}」`);
          await era.printAndWait(
            `兴奋起来的${target_name}伸出了舌头，舔起了${player_name}的脸。`,
          );
          await era.printAndWait(
            `「哈啊啊~${heart(1)} 请往${sc()}的~${heart(1)} 淫乱小穴里~${heart(1)} 播下种子吧~~${heart(1)}」`,
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
            `${target_name}将${player_name}紧紧地抱住，感受着腔内带来的快感而娇喘着。`,
          );
          await era.printAndWait(
            `「喜欢…好喜欢的啊~~${heart(1)}…所以…请更加激烈地…疼爱${sc()}吧~${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊啊~…那里…那里好棒啊啊~…让${sc()}的身体…更加地成为${player_name}大人的东西吧~~${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊哈啊…大鸡巴…居然…塞到了这么深…啊~…啊哈呜嗯~${heart(1)}」`,
          );
          await era.printAndWait(
            `「${sc()}的那里…要记下大鸡巴的形状了呀~~…${heart(1)} 」`,
          );
          await era.printAndWait(
            `${player_name}侵犯着${target_name}、每当腔内深处被顶到${target_name}都会从嘴边漏出一声娇喘………`,
          );
        } else {
          await era.printAndWait(
            `「啊哈啊~…啊啊~…${player_name}大人………请更多地…拥抱也没有关系吧~~…？」`,
          );
          await era.printAndWait(
            `「像、像这样抱住的话…就更感觉会更加舒服呢~…啊嗯~…嗯~…哈啊啊~………${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}用双手将${player_name}来回、好像很舒服地呻吟着………`,
          );
        }
        // CFLAG:321  = 5（变量语义：CFLAG 族，321）
        kojo.正常位 = 5;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.正常位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊~…啊啊~…恩呜呜…将腿…张得更开…什么的…啊啊~！」`,
        );
        await era.printAndWait(
          `「啊啊~啊~…哈呜~好深啊~…到顶了呀~~…啊啊~啊~！」`,
        );
        await era.printAndWait(`${target_name}不像样地不断呻吟着………`);
        // CFLAG:321  = 4（变量语义：CFLAG 族，321）
        kojo.正常位 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.正常位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊~…啊啊啊~…嗯呜呜…将腿…张得更开…什么的…啊啊~！」`,
        );
        await era.printAndWait(`「不行…不行啊~…再这样…侵犯下去的话………」`);
        // CFLAG:321  = 3（变量语义：CFLAG 族，321）
        kojo.正常位 = 3;
      } else if (kojo.正常位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「哈呜~…嗯呜~…嗯嗯呜~…再这样下去…就绝对不会原谅你了………」`,
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
          if (era.get(`talent:${target}:314`) === 7) {
            await era.printAndWait(
              `${target_name}将屁股抬得高高的，诱惑着${player_name}。`,
            );
            await era.printAndWait(
              `「撒~…主人…请品尝淫乱堕落精灵族的…处女屁股吧~${heart(3)}」`,
            );
            await era.printAndWait(
              `「想要主人的大鸡巴…的堕落的精灵族的屁股堕落~…快点侵犯吧~~${heart(1)}」`,
            );
            await era.printAndWait('');
            await era.printAndWait(
              `「………拜、拜托了~…这、这个样子…很羞耻的啦………」`,
            );
            await era.printAndWait(
              `看着没有被理睬差不多要哭出来的${target_name}兴奋起来的${player_name}抓住${target_name}的腰部后，毫不犹豫直接将阴茎往腔内插进去了`,
            );
            await era.printAndWait(
              `「哈啊呜~！？这、这样…突然就${heart(1)}…噢~…嗯噢噢噢噢~${heart(5)}」`,
            );
          } else {
            if (era.get(`talent:${target}:317`) === 4) {
              await era.printAndWait(
                `${target_name}将自己的屁股用双手扒开诱惑着${player_name}。`,
              );
              await era.printAndWait(
                `「啊啊~…${sc()}的…处，处女膜能看到吗…是为了让主人捅破而存在的噢${heart(1)}」`,
              );
              await era.printAndWait(
                `「前一个情人也没有给的${sc()}的小穴…一抽一抽地~…想要被主人侵犯呢~${heart(1)}…啊~啊啊啊~${heart(1)}」`,
              );
              await era.printAndWait(
                `听着${target_name}诱惑的话语，${player_name}抓住${target_name}的腰，毫不留情地将腔内蹂蹑起来了。`,
              );
              await era.printAndWait(
                `「哈呜嗯~…主人的${heart(1)}…大鸡巴${heart(1)}…大鸡巴~${heart(1)}…到里面…来了………啊啊啊啊~${heart(5)}」`,
              );
              await era.printAndWait(
                `${target_name}再也没有想起故乡的恋人了………`,
              );
            } else {
              await era.printAndWait(
                `${target_name}将自己的屁股用双手扒开诱惑着${player_name}。`,
              );
              await era.printAndWait(
                `「啊啊~…${sc()}的…处，处女膜能看到吗…是为了让主人捅破而存在的噢${heart(1)}」`,
              );
              await era.printAndWait(
                `「啊~、不要的呀~…没想到真的能看到里面啊~…${scf()}、${sc()}…不、不要…只是被看着就${heart(1)}」`,
              );
              await era.printAndWait(
                `看着，被看着就好像要去了的${target_name}就兴奋起来的${player_name}抓住${target_name}的腰好不犹豫地将阴茎塞进了腔内。`,
              );
              await era.printAndWait(
                `「嘎哈啊~…啊~…啊啊啊~…大鸡巴${heart(1)}…大鸡巴${heart(1)}…到里面…来了………啊啊啊啊~${heart(5)}」`,
              );
            }
          }
        } else if (era.get(`talent:${target}:85`) === 1) {
          if (era.get(`talent:${target}:314`) === 1) {
            await era.printAndWait(
              `「啊~…啊啊…从后面…侵犯${sc()}对吧~…${heart(1)}」`,
            );
            await era.printAndWait(
              `「明，明白了…${sc()}会…成为大人您的东西的${heart(3)}」`,
            );
            await era.printAndWait(
              `${player_name}将${target_name}的腰抓住、毫不留情地将阴茎往里面塞。`,
            );
            await era.printAndWait(
              `「啊啊~…啊~…哈啊啊啊~…到里面…来了…${sc()}…真的成为了魔王的…嗯啊~哈啊啊啊~！」`,
            );
            await era.printAndWait(
              `${target_name}长长的耳朵颤抖着，发出了欢快的娇喘………`,
            );
          } else {
            if (era.get(`talent:${target}:317`) === 4) {
              await era.printAndWait(
                `「啊啊~…这种不知羞耻的姿势…哪怕在那个人的面前也没有做过的说…${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}好像很高兴的样子摇晃着屁股诱惑着${player_name}。`,
              );
              await era.printAndWait(
                `「已经…只能给${sc()}看到这样的样子…的说…请拿下${scf()}、${sc()}的贞洁吧…${heart(1)}」`,
              );
              await era.printAndWait(
                `${player_name}将${target_name}的腰抓住，结果${target_name}发出了好像期待已久的甜美呻吟。`,
              );
              await era.printAndWait(
                `「是这样啊~${heart(1)} 这个是…让${sc()}真的成为大人您的东西的重要…仪式来的对吧…${heart(1)}」`,
              );
              await era.printAndWait(
                `「哈嗯呜~${heart(1)} 大鸡巴${heart(1)}…到深处…哈呜嗯~…进、进来~…进来了呀啊~${heart(1)}」`,
              );
            } else {
              await era.printAndWait(
                `「啊~…这种姿势来做什么的…不行…不行的呀~…♪」`,
              );
              await era.printAndWait(
                `${target_name}虽然嘴上这么说，但还是很高兴的摇晃着屁股。`,
              );
              await era.printAndWait(
                `「啊嗯~…撒~…快点将${sc()}变成大人你的东西吧~！」`,
              );
              await era.printAndWait(
                `腰被抓住后${target_name}发出了甘甜的娇喘声诱惑着${player_name}、等待着侵犯的到来。`,
              );
              era.print('');
              await era.printAndWait(
                `「啊~啊啊~…到深处了…大鸡巴~！到深处了啊~~！…哈啊啊~啊~啊啊啊啊啊啊啊啊~～～～！！！」`,
              );
            }
          }
        } else {
          if (era.get(`talent:${target}:317`) === 4) {
            await era.printAndWait(
              `「哈…哈啊…原，请原谅…${sc()}还有…重要的人…啊~啊啊~…不要啊啊啊~！」`,
            );
            await era.printAndWait(
              `${player_name}将${target_name}向后推倒后，直接从后面毫不留情地将处女给夺走了。`,
            );
            await era.printAndWait(
              `「这、这样得…骗…骗人得…啊~…哈~…呜~…呜哈啊嗯呜~！」`,
            );
            await era.printAndWait(
              `听着${target_name}的哭声${player_name}继续侵犯下去了………`,
            );
          } else {
            await era.printAndWait(
              `「这种姿势什么的…简直…就像狗一样…啊啊~…嗯唔唔唔！！」`,
            );
            await era.printAndWait(
              `「啊啊~…${scf()}、${sc()}…明明…是第一次来的………」`,
            );
            await era.printAndWait(
              `${player_name}将${target_name}的头往床上压下去，毫不留情地对准腰部抽插起来………`,
            );
          }
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(`「啊啊~…快点~呜~…进来吧~${heart(1)}」`);
          await era.printAndWait(
            `「就像汪酱一样…侵犯${target_name}吧${heart(3)}」`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(`「啊嗯~…屁股…就那么喜欢吗~…？」`);
          await era.printAndWait(
            `「啊啊~…请、请吧…就这样将后面给…侵犯了吧~…${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「这种姿势什么的…就像是…狗一样犬…啊啊~…嗯唔唔唔唔！！」`,
          );
          await era.printAndWait(
            `${player_name}将${target_name}的脑袋往下压下去毫不留情地对准腰部抽插起来………`,
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
        if (era.get(`tequip:${target}:44`) === 1) {
          if (rand_n(2) === 0) {
            await era.printAndWait(
              `「被绑住就会有感觉了啊~…请对淫乱的${target_name}的小穴……尽情地处罚吧~${heart(1)}」`,
            );
          } else {
            await era.printAndWait(
              `「${target_name}最喜欢…被捆绑着侵犯了~……喜欢到完全忍不住的程度~${heart(1)}」`,
            );
          }
          if (rand_n(3) === 0) {
            await era.printAndWait(`「请…请更加粗鲁地做吧~${heart(1)}」`);
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「哈啊~${heart(1)} 真是好棒的啊~${heart(3)}」`,
            );
          } else {
            await era.printAndWait(
              `「${sc()}是…让大鸡巴插进来，侍奉大鸡巴的肉便器来的~${heart(3)}」`,
            );
          }
        } else {
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `「啊哈啊嗯~…就像野兽一样SEX最喜欢了${heart(1)}」`,
            );
            await era.printAndWait(`「更加…请更加侵犯那里吧~${heart(3)}」`);
            await era.printAndWait(
              `就像野兽一样发出了淫乱的娇喘声的${target_name}的身上已经完全看不到以往的高贵姿态了………`,
            );
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「啊啊啊~${heart(1)} 好喜欢被主人给侵犯呢~${heart(1)}」`,
            );
            await era.printAndWait(
              `「被这样做的话…${sc()}…就能感觉到自己就是为了被大鸡巴插而出生的~${heart(1)}」`,
            );
          } else {
            await era.printAndWait(
              `「请尽情地侵犯...野兽般的${target_name}的小穴吧~…${heart(1)}」`,
            );
            await era.printAndWait(`「恩哈呜嗯~…啊啊啊~${heart(1)}」`);
            await era.printAndWait(
              `「就像野兽一样${heart(1)} 野兽SEX最棒了~~${heart(3)}」`,
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
          await era.printAndWait(
            `「啊~…哈啊~…啊啊~…虽然说…喜欢怎样都行也好…」`,
          );
          await era.printAndWait(
            `「从后面…就像野兽一样…哈呜~…哈呜~${heart(1)} 哈啊嗯~${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊啊~…啊~…啊啊~♪…请更加更多地做吧~${heart(3)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「恩呜呜~…呜哼~…啊啊~…！」`);
          await era.printAndWait(
            `「请更尽情的做吧~${heart(1)} 就这样播下种子…让${sc()}怀孕了吧~~~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(`「啊~啊~啊啊啊~嗯哼嗯~${heart(1)}」`);
          await era.printAndWait(
            `「从背后被这样…侵犯着…还会高兴什么的…${heart(1)}」`,
          );
          await era.printAndWait(`「${sc()}…已经要变得不行了呀~${heart(3)}」`);
        }
        // CFLAG:322  = 5（变量语义：CFLAG 族，322）
        kojo.背后位 = 5;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊~…明明是、这么…屈辱的样子…嗯呜~…啊~嗯~…」`,
        );
        await era.printAndWait(
          `「却有感觉…什么的…${scf()}、${sc()}…已经…不行了啊~…啊~…啊~啊啊~嗯啊啊~！」`,
        );
        // CFLAG:322  = 4（变量语义：CFLAG 族，322）
        kojo.背后位 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「请、请将…${sc()}的那里…侵犯了吧~…嗯呜…呜~呜呜呜~！」`,
        );
        await era.printAndWait(`${target_name}被侵犯地眼泪都流下来了………`);
        // CFLAG:322  = 3（变量语义：CFLAG 族，322）
        kojo.背后位 = 3;
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「啊啊~…${sc()}…就像是狗一样…嗯~啊~啊啊啊~！」`,
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
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「嗯…啊~…啊嗯~…请更加地…往上顶吧~…${heart(1)}」`,
          );
          await era.printAndWait(
            `「${sc()}…从腰往下的部位都融化掉动不了了呀…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一脸沉浸在淫乱中的表情抱了过来………`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「喜欢…好喜欢啊~…啊啊啊~…啾~…啾~…嗯哼唔~…♪」`,
          );
          await era.printAndWait(
            `${target_name}将双手来回抱住了${player_name}的脖子尽情地撒着娇。`,
          );
          await era.printAndWait(
            `「这个姿势…真是相爱得好姿势呢~…${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「恩呀唔！从，从下面往上顶不行啊、不行来的啊………！」`,
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
            `「嗯~…啊~…啊嗯~…请请更加地…往上顶吧~…${heart(1)}」`,
          );
          await era.printAndWait(
            `「${sc()}…从腰往下的部位都融化掉动不了了呀…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一脸沉浸在淫乱中的表情抱了过来………`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊~…嗯~${heart(1)} 哈啊~${heart(1)}…好，好棒的啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `「${sc()}的…的小穴${heart(1)} 被主人的大鸡巴给塞满了啊${heart(3)}」`,
          );
          await era.printAndWait(
            `「嗯哼唔~…想奉献上一个吻给主人呢~…嗯啾~…啾~…啾呜~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊~…啊嗯~…♪腰自己就动起来了…完全停不下来了啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `「${sc()}的淫乱小穴是…为了将大鸡巴吞下才存在的呀~${heart(1)} 完全没有问题吧~？」`,
          );
          await era.printAndWait(
            `「啊啊~…已经~…已经~…感觉真的要变得不行了~………♪」`,
          );
        }
        // CFLAG:323  = 6（变量语义：CFLAG 族，323）
        kojo.对面座位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.对面座位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「嗯啾~…嗯啾…嗯哼~…还想要…更多的…kiss………${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊嗯~…不、不行的啊…难得${sc()}可以…哈呜嗯~${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊啊~…已、已经…再从下面…往上顶的话…哈~…嗯~…嗯~…啊啊啊………♪」`,
          );
          await era.printAndWait(
            `${target_name}摇动着腰部、每当腔内的深处被顶到的话，就露出一副荡漾的表情………`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「${sc()}会好好动起来的啦~…所以大人请完全交给${sc()}吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}轻轻地舔了一下嘴唇，开始前后摇晃起了牙签哦不。`,
          );
          await era.printAndWait(
            `「啊~…啊嗯~…嗯~…请用力地…将${sc()}…抱住吧…${heart(3)}」`,
          );
        } else {
          await era.printAndWait(`「喜欢…好喜欢啊~…啊啊啊…啾~…啾~…嗯呼嗯~…♪」`);
          await era.printAndWait(
            `${target_name}将双手来回抱住了${player_name}的脖子尽情地撒着娇。`,
          );
          await era.printAndWait(`「这个姿势…真是相爱得好姿势呢~${heart(3)}」`);
        }
        // CFLAG:323  = 5（变量语义：CFLAG 族，323）
        kojo.对面座位 = 5;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.对面座位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「不、不要啊…怎么会…腰自己就…嗯~…好、好的…会抱住…大人你…的啦…」`,
        );
        await era.printAndWait(
          `「啊~…啊啊~♪…嗯~…好奇怪…那里…居然好舒服…啊啊嗯~♪」`,
        );
        await era.printAndWait(`「不行~…腰要~…啊~啊啊~！」`);
        // CFLAG:323  = 4（变量语义：CFLAG 族，323）
        kojo.对面座位 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.对面座位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「是的…会好好动起来的…请、请不要从下往上顶………」`,
        );
        await era.printAndWait(`「嗯呼呜~…呜~…呀~…哈啊啊~………」`);
        // CFLAG:323  = 3（变量语义：CFLAG 族，323）
        kojo.对面座位 = 3;
      } else if (kojo.对面座位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「呼~…呜啊~…啊~…这种姿势…进到…深处了…不要…请、请不要动起来啊………」`,
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
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(`「啊嗯~…从后面…被从下往上插…十分得棒呢~…♪」`);
          await era.printAndWait(
            `「请将那里…弄得更加乱七八糟地吧~${heart(1)}」`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「嗯呜~…请、请再温柔一点~…这么粗鲁地~…啊~…哈呜~♪」`,
          );
          await era.printAndWait(
            `「这，这么地…粗鲁的话怎么可能会有…哈啊呜~${heart(1)}…哈呀嗯呜~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(`「啊~…啊啊~…进到…里面了…嗯呜呜！」`);
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
          await era.printAndWait(`「哈呀呜…嗯~嗯唔呜~…${heart(1)}」`);
          await era.printAndWait(
            `「大鸡巴…啊啊~…能非常感受到形状呢~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}在被从下往上抽插的途中好像很怜爱地样子来回抚摸着自己肚子………`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「请更加…请更加地欺负那里吧~~…${sc()}最喜欢被大鸡巴欺负了~${heart(1)}」`,
          );
          await era.printAndWait(
            `「哈呀啊~…好、好棒啊~${heart(1)} 小穴要坏掉了呜呜呜呜~~~${heart(3)}」`,
          );
          await era.printAndWait(
            `被从下往上抽插着而不断说着淫猥的话语的${target_name}的身上完全感受不到以往的一丝高贵姿态了………`,
          );
        } else {
          await era.printAndWait(
            `「啊~…啊嗯~${heart(1)} 哈啊~${heart(1)} 嗯啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `「好棒…好棒的啊！~${heart(1)} 请更加地…欺负小穴吧~${heart(1)}」`,
          );
        }
        // CFLAG:324  = 6（变量语义：CFLAG 族，324）
        kojo.背面座位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.背面座位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊~…嗯呼~♪ 啊啊~…腰、腰自己就…动起来了啊~~…♪」`,
          );
          await era.printAndWait(`「请从后面…牢牢地抱住${sc()}吧~………♪」`);
          await era.printAndWait(
            `「嗯哈啊~…啊~${heart(1)} 啊~${heart(1)} 啊啊啊啊嗯~${heart(3)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「喜欢，好喜欢得啊~${heart(1)} 被大人你抱住什么的…最喜欢了~${heart(3)}」`,
          );
          await era.printAndWait(
            `「哈啊啊~…嗯~…大人你的手…好温柔…${sc()}…要变得更加不行了呀………♪」`,
          );
          await era.printAndWait(
            `${target_name}如同撒娇一样发出了娇喘晃动起了腰部………`,
          );
        } else {
          await era.printAndWait(
            `每当${target_name}被${player_name}从下往上抽插就会从嘴边漏出娇喘。`,
          );
          await era.printAndWait(
            `「啊哈呀哈啊~♪ 噢~…噢噢~${heart(1)} 啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `「被温柔…抱着…然后被贯穿~…太幸福了~…感觉就要去了啊~…${heart(3)}」`,
          );
        }
        // CFLAG:324  = 5（变量语义：CFLAG 族，324）
        kojo.背面座位 = 5;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.背面座位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「好，好的…会更加…将双腿张开的…啊、不、不要！请不要将那种地方给张开啊」`,
        );
        await era.printAndWait(
          `「嗯哈呀呜呜~♪…好、好的…往、往深处塞进去…好、好难受啊啊………」`,
        );
        await era.printAndWait(`「啊~…嗯~啊啊嗯~！…啊啊~嗯~…哼啊啊啊~♪」`);
        // CFLAG:324  = 4（变量语义：CFLAG 族，324）
        kojo.背面座位 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.背面座位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「好、好的……会更加…将双腿张开的…啊、不、不要！请不要将那种地方给张开啊」`,
        );
        // CFLAG:324  = 3（变量语义：CFLAG 族，324）
        kojo.背面座位 = 3;
      } else if (kojo.背面座位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「哈啊…哈啊啊…啊、小穴…被扩大了…啊~啊啊~！」`);
        // CFLAG:324  = 2（变量语义：CFLAG 族，324）
        kojo.背面座位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 24) {
    if (kojo.逆强奸 === 0) {
      if (era.get(`talent:${player}:0`) === 1) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「${player_name}的处女小穴${heart(1)} ${sc()}会好好地疼爱的噢~${heart(3)}」`,
          );
          await era.printAndWait(
            `「疼的只有最初而已噢~${heart(1)} 撒~…请用下流的声音哭出来吧~${heart(3)} 」`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait(`「居然想要做这样的事情什么的……」`);
          await era.printAndWait(`「真是够恶趣味的呢……」`);
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      }
      // CFLAG:325  = 1（变量语义：CFLAG 族，325）
      kojo.逆强奸 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.逆强奸 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:325  = 6（变量语义：CFLAG 族，325）
        kojo.逆强奸 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.逆强奸 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:325  = 5（变量语义：CFLAG 族，325）
        kojo.逆强奸 = 5;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`abl:${target}:20`) >= 3 &&
        (kojo.逆强奸 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「哼嗯~哼嗯~${heart(1)}」`);
          await era.printAndWait(
            `「${sc()}会好好地调教你，让你也变成出色的雌豚噢~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(`「被${sc()}侵犯地有感觉了吧~？」`);
          await era.printAndWait(`「来吧~…快说被${sc()}侵犯地很舒服吧~」`);
        }
        // CFLAG:325  = 4（变量语义：CFLAG 族，325）
        kojo.逆强奸 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.逆强奸 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「真是没有办法呢~…哈啊~${heart(1)}」`);
        await era.printAndWait(
          `「这是命令来的嘛…真是没法反抗${sc()}呢……${heart(1)}」`,
        );
        // CFLAG:325  = 3（变量语义：CFLAG 族，325）
        kojo.逆强奸 = 3;
      } else if (kojo.逆强奸 <= 1 || game.kojo.口上开关 === 2) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「至少…会用不怎么痛的方式来疼爱你吧」`);
        } else {
          await era.printAndWait(
            `「呜唔…这样的行为、恶趣味也请适可而止一点啊」`,
          );
        }
        // CFLAG:325  = 2（变量语义：CFLAG 族，325）
        kojo.逆强奸 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 26) {
    if (kojo.正常位肛交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        if (era.get(`talent:${target}:314`) === 7) {
          await era.printAndWait(
            `「啊啊~…${sc()}居然…因为肛穴被塞进了大鸡巴…而感觉到高兴什么的${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}垂着舌头、沉浸在了肛门被侵犯的感觉里………`,
          );
          await era.printAndWait(
            `「主人~…请往淫乱的堕落精灵的肛穴用精液射地满满得吧~${heart(1)}」`,
          );
          await era.printAndWait(
            `「请将${sc()}变成主人专用的肛穴奴隶吧~~${heart(5)}」`,
          );
        } else {
          await era.printAndWait(
            `「哈啊啊~♪…肛穴将整只大鸡巴都吞下去了啊~${heart(3)}」`,
          );
          await era.printAndWait(
            `${target_name}淫乱地笑着，用双腿夹住${player_name}的腰部。`,
          );
          await era.printAndWait(
            `「撒~…请往${sc()}的肛穴里面～射一堆用来标记的精液吧~${heart(1)}」`,
          );
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        if (era.get(`talent:${target}:314`) === 1) {
          await era.printAndWait(
            `「啊啊~…这样…${sc()}的…肛门…被侵犯着…嗯嗯~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的长耳朵完全变得通红起来、忍受着屈辱的肛门虐待。`,
          );
          await era.printAndWait(
            `「${scf()}、${sc()}…没、没有关系的…${heart(1)}」`,
          );
          await era.printAndWait(
            `「不，不过哪怕是这样…也请…温柔一点………${heart(3)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊~…大鸡巴…进去了呃…嗯呜呜~${heart(1)}」`,
          );
          await era.printAndWait(
            `「哈啊…啊啊…会忍耐…会好好地…忍耐住得…所以………」`,
          );
          await era.printAndWait(`「请…尽情地享受吧~…${heart(3)}」`);
        }
      } else {
        await era.printAndWait(
          `「哈啊啊啊~！？那、那里才不是将大鸡巴塞进去的地方来的啊~」`,
        );
        await era.printAndWait(`「不、不要啊…不要啊啊啊~」`);
      }
      // CFLAG:TARGET:327  = 1（变量语义：CFLAG 族，TARGET:327）
      kojo.正常位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「哈呜啊~${heart(1)} 请更加地…将肛穴给扩大了吧~~${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊啊…肛穴太舒服了真的太对不起了${heart(1)}」`,
          );
          await era.printAndWait(
            `「但是，但是…肛穴被侵犯了的话真的会变得不行了呀~${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊~啊~哼啊啊~${heart(1)} 肛穴强奸…再做多一点吧~${heart(3)}」`,
          );
          await era.printAndWait(
            `${target_name}从嘴边不像样地留着口水和${player_name}沉浸在了肛门虐待的快乐之中。`,
          );
          await era.printAndWait(
            `${target_name}的脑袋中已经只剩下肛穴给予的快乐的样子………`,
          );
        } else {
          await era.printAndWait(
            `「啊哈啊~…啊~啊~啊啊~…来回抽插着${heart(1)} 在来回抽插着~${heart(1)}」`,
          );
          await era.printAndWait(
            `「肛穴…要变得不行了~${heart(1)} 要变成SEX专用的穴来了${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊啊~${heart(1)} 啊嗯~${heart(1)} 啊哈啊啊啊~${heart(3)}」`,
          );
        }
        // CFLAG:327  = 7（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.正常位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊~啊~哼啊啊~${heart(1)} 肛穴强奸…再做多一点吧~${heart(1)}」`,
        );
        await era.printAndWait(
          `「${sc()}的肛穴…被再干多一点的话…里面的形状就会更加贴合主人的大鸡巴的形状了~${heart(3)}」`,
        );
        // CFLAG:327  = 6（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊~、嗯~…啊啊~…居然…${sc()}的肛穴居然有感觉起来了…嗯~、哼啊啊嗯~${heart(3)}」`,
          );
          await era.printAndWait(
            `「啊啊~、请不要看着…贪图肛穴给予的快乐而摆出一副不像样姿态的、${sc()}的脸…请、请不要看…哈呜嗯~${heart(1)}」`,
          );
          await era.printAndWait(
            `「明，明明说了…不能看了…坏、坏心…啊啊嗯~${heart(3)}」`,
          );
        } else {
          await era.printAndWait(
            `「不，不行的啊~…肛穴居然那么有感觉不行的啊~~~♪」`,
          );
          await era.printAndWait(
            `「所以…请不要用宏伟的大鸡巴来将${sc()}敏感的肛穴给操地去死活来的…这样就要不行了，就要坏掉了啊~♪」`,
          );
          await era.printAndWait(
            `「啊哈呀啊嗯~♪…要去了，要去了啊啊~…肛门SEX…好棒呀啊~~${heart(5)}」`,
          );
        }
        // CFLAG:327  = 5（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.正常位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「不、不行的啊~…肛门居然那么有感觉不行的啊~………」`,
        );
        await era.printAndWait(
          `「哈呀呜呜~…突，突然就动起来不行啊~…坏心眼呜~坏心眼呜~♪」`,
        );
        // CFLAG:327  = 4（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊~…为…为什么…屁股的洞…会有感觉来的…明明不可以的…」`,
        );
        await era.printAndWait(
          `「嗯呜~…不、不行~…那样…激烈地…哈嗯呜啊嗯呜哈嗯呜~」`,
        );
        // CFLAG:327  = 3（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 3;
      } else if (kojo.正常位肛交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「拜，拜托了…拜托了啊…肛门被扩张…很痛苦的啊…啊~啊啊~」`,
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
        if (era.get(`talent:${target}:314`) === 7) {
          await era.printAndWait(
            `「嗯哈啊~…请激烈地侵犯...${heart(1)} 淫乱的堕落精灵的屁股吧~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}就像让${player_name}看到屁股一样用双手将自己的屁股张开了。${player_name}接受了她的诱惑从后面插进了肛门里了。`,
          );
          await era.printAndWait(
            `「哈呀呜~从肛穴里面进来了~大鸡巴进来了~${heart(3)}」`,
          );
          await era.printAndWait(
            `「嗯呜~…啊啊~…${sc()}的肛穴…被当成飞机杯着呢${heart(1)}」`,
          );
          await era.printAndWait(
            `「被当成飞机杯也可以的~…请尽情地变得舒服起来吧~${heart(5)}」`,
          );
        } else {
          await era.printAndWait(
            `「请尽情地侵犯~${heart(1)} ${player_name}的肛穴吧~${heart(1)}」`,
          );
          await era.printAndWait(
            `「请更加地欺负屁股吧${heart(1)} 屁股被欺负的话就会舒服得不行了啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `「哈呀啊~…好厉害，大鸡巴好厉害啊~${heart(3)}」`,
          );
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        if (era.get(`talent:${target}:314`) === 1) {
          await era.printAndWait(
            `「呀啊啊~…肛、肛门是不行的啊…哈呜~…啊~啊啊啊~！」`,
          );
          await era.printAndWait(
            `「哼~…啊…啊啊${heart(1)} …被大鸡巴侵犯着呢~${heart(1)}哈啊嗯~${heart(1)}」`,
          );
          await era.printAndWait(
            `「才…才不是呢…${scf()}、${sc()}……被干肛穴…而感到高兴什么的...才没有呢...哈呀啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `「哈呀啊~${heart(1)}啊哈嗯~${heart(1)} 对、对不起啊呜呜呜~…」`,
          );
          await era.printAndWait(
            `「作为工口精灵族的${target_name}是一个…肛穴被侵犯就感到快乐的大变态来的…啊~啊啊啊~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊~…这种姿势…真的是很害羞来的啊…啊啊~…那里是…${heart(1)}」`,
          );
          await era.printAndWait(
            `「不，不行的啊…肛穴是不行的啊~…哈呜~…啊~啊啊啊~！」`,
          );
          await era.printAndWait(
            `「哼啊~…啊…啊啊${heart(1)} …大鸡巴…进到深处了~${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊啊嗯~${heart(1)} 被从后面侵犯着肛穴…却高兴起来了~…」`,
          );
        }
      } else {
        await era.printAndWait(
          `「请、请快住手…这种姿势…${sc()}才不会有感觉…啊啊~…不…不要啊~！」`,
        );
      }
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328）
      kojo.背后位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「嗯哈啊啊~…用汪汪风格来被侵犯肛穴最喜欢了~${heart(1)}」`,
          );
          await era.printAndWait(
            `「主人~…请更加地…请更加地将大鸡巴塞进来吧${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊啊~…已经${heart(1)}…除了大鸡巴之外${heart(1)} 什么都想不了了啊~${heart(3)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊哈啊~肛穴要去了啊啊啊啊~………嗯哼唔~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}发出了满足的娇喘后继续被从后面侵犯着。`,
          );
          await era.printAndWait(
            `「更多地…请更像野兽地那样侵犯${sc()}吧~~${heart(1)}」`,
          );
          await era.printAndWait(
            `「嗯哈啊~${heart(1)} 噢~噢噢~哦哦哦哦哦~！」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊~…嗯啊啊~…肛穴…完全变成了SEX用的小穴了~${heart(1)}」`,
          );
          await era.printAndWait(
            `「主人~…请尽情地使用SEX的小穴来享受吧～${heart(3)}」`,
          );
          await era.printAndWait(
            `「只有${sc()}变得舒服起来开心起来…那就不公平了啊~${heart(1)}」`,
          );
        }
        // CFLAG:328  = 7（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.背后位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯哈啊啊~…用汪汪风格来被侵犯肛穴最喜欢了~${heart(1)}」`,
        );
        await era.printAndWait(
          `「主人~…请更加地…请更加地将大鸡巴塞进来吧${heart(1)}」`,
        );
        // CFLAG:328  = 6（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊~…嗯哼~…不、不行…啊啊~…肛门居然变得那么舒服起来了………${heart(1)}」`,
          );
          await era.printAndWait(`「哈啊啊~……请更加侵犯那里吧~…${heart(3)}」`);
        } else {
          await era.printAndWait(
            `「啊啊~…这样…明明不要的~…肛穴要融化掉了~…${heart(1)}」`,
          );
          await era.printAndWait(`「不行~…屁股自己就~…恩哈呜~${heart(1)}」`);
          await era.printAndWait(
            `「啊啊~…不行~…已经要不行了啊~…已经随便怎样都好了啊~！」`,
          );
        }
        // CFLAG:328  = 5（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.背后位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊~…嗯哼~…不、不行…啊啊~…肛门居然变得那么舒服起来了……${heart(1)}」`,
        );
        await era.printAndWait(`「${sc()}…真的是…要变成野兽了~…啊嗯~♪」`);
        // CFLAG:328  = 4（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊~啊啊~啊啊啊~${heart(1)} 屁股…要融化掉了啊~荡…${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊~♪…嗯哼唔~…${sc()}已经…作为一只野兽…也可以了啊~…${heart(1)}」`,
        );
        // CFLAG:328  = 3（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 3;
      } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「这~…样啊~…${sc()}…变成了野兽…还不如了啊…啊~…啊啊~」`,
        );
        // CFLAG:328  = 2（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 28) {
    if (kojo.对面座位肛交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「嗯真是的…在侵犯着肛穴的时候还想要调情什么的${heart(1)}」`,
        );
        await era.printAndWait(`「主人真是H呢~…${heart(1)}」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「啊~…嗯~…哈啊…连根部…都进去了…呜啊~…啊！」`);
        await era.printAndWait(
          `「啊不、不行的啊…请，请不要看着${player_name}脸啊~！~」`,
        );
        await era.printAndWait(
          `${target_name}好像很害羞地抱住了${player_name}………`,
        );
      } else {
        await era.printAndWait(
          `「啊，啊啊…用这种姿势…对屁股的洞…嗯哼~…嗯哼唔………」`,
        );
        await era.printAndWait(
          `「好、好的、会好好地将整根塞进去的…啊啊~请不要动起来」`,
        );
      }
      // CFLAG:TARGET:329  = 1（变量语义：CFLAG 族，TARGET:329）
      kojo.对面座位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「嗯哼唔~${heart(1)} 肛穴被塞进了大鸡巴了~～${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊啊~…已经忍耐不了了呀~…要开始动了噢…${sc()}要自己就变得舒服起来了噢~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}就像所说的那样晃动起了腰部、自己享受起了快乐的味道………`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊~啊啊~…连根部都…完全塞进了啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊啊啊~…${sc()}1的肛门…完全变成肛穴了呀~${heart(3)}」`,
          );
          await era.printAndWait(
            `完全不知道羞耻吐露着淫猥的话语的${target_name}身上、完全感受不到过去的高贵姿态了………`,
          );
        } else {
          await era.printAndWait(
            `「哈啊啊~…肛穴要融化掉了~${heart(1)} 因为大鸡巴塞进来了所以肛穴很高兴呢${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊哈啊…怎么样啊~？肛穴…就像这样收紧的话是不是很舒服呀~${heart(3)}」`,
          );
        }
        // CFLAG:329  = 7（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.对面座位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊~…肛穴被完全扩大了啊~${heart(1)}」`);
        await era.printAndWait(
          `「肛穴感受着大鸡巴…变得黏糊糊起来了呀~${heart(3)}」`,
        );
        // CFLAG:329  = 6（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait('');
          await era.printAndWait(
            `「啊啊~…${sc()}…才不是那么淫乱来的…${heart(1)}」`,
          );
          await era.printAndWait(
            `「但是屁股里…啊哈啊~…整根大鸡巴都塞进去了…却还会高兴什么的~…${heart(1)}」`,
          );
          await era.printAndWait(
            `「请不要…讨厌${sc()}…啊啊~…嗯~哈啊嗯~${heart(3)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊~…${sc()}的身体…这种地方也…变成相爱的地方了呀~${heart(1)}」`,
          );
          await era.printAndWait(
            `「嗯~…♪ 更加…激烈地抽插那里，也没有关系的~${heart(1)}」`,
          );
        }
        // CFLAG:329  = 5（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.对面座位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊啊~…屁股被…大鸡巴给塞满了啊~…♪」`);
        await era.printAndWait(
          `「这、这个…只是很难受所以才抱着而已啦~…啊~啊哈啊嗯~${heart(1)}」`,
        );
        // CFLAG:329  = 4（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊嗯~…明明整根大鸡巴都塞进屁股里面了…♪ 为什么…为什么还会那么舒服呢~~？！」`,
        );
        await era.printAndWait(`「不，不行的啊、动、动起来什么的不行啊」`);
        // CFLAG:329  = 3（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 3;
      } else if (kojo.对面座位肛交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊啊~…屁股…再被扩大着…好、好难受啊…」`);
        // CFLAG:329  = 2（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 29) {
    if (kojo.背面座位肛交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「啊啊~…请插上来吧~${heart(1)}」`);
        await era.printAndWait(
          `「肛穴被扩大了~…正在吞下大鸡巴着呢~${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊嗯~${heart(1)} 肛穴被侵犯真是太棒了啊${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「啊~…啊啊~…屁股的洞…什么的…真的是…不、不行的啊~…啊啊~」`,
        );
        await era.printAndWait(
          `「这种…姿势来…恩哈呜~…被侵犯什么的…明明…不要来的…啊啊~${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「不…不要啊…那么地…将腿张开的话…啊~啊啊~！进去了哈呜~~！？」`,
        );
      }
      // CFLAG:TARGET:330  = 1（变量语义：CFLAG 族，TARGET:330）
      kojo.背面座位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊嗯~${heart(1)} 肛穴…更加地侵犯一下吧啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `「哈啊~…更加激烈地侵犯比较好呢~${heart(1)} 更多地…更多地~…${heart(1)}」`,
          );
          await era.printAndWait(`「请到坏掉为止，不停地侵犯吧${heart(3)}」`);
        } else {
          await era.printAndWait(
            `「啊~啊啊~…嗯~…腰部完全停不下来啊~${heart(3)}」`,
          );
          await era.printAndWait(
            `「肛穴太舒服了…是个腰部自己就会动起来的淫乱奴隶真是对不起~${heart(1)}」`,
          );
          await era.printAndWait(
            `「处罚，请处罚吧啊~${heart(1)} 请给淫乱肛穴处罚吧~${heart(1)}」`,
          );
        }
        // CFLAG:330  = 7（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.背面座位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊~…肛穴被侵犯的话…脚自己就会张开了呀~~…${heart(1)}」`,
        );
        await era.printAndWait(
          `「哈呜哈啊~${heart(1)} 啊~…哈啊啊嗯~${heart(1)} 请更加…侵犯吧~${heart(1)}」`,
        );
        // CFLAG:330  = 6（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「啊啊~…请温柔地抱住吧~…♪」`);
          await era.printAndWait(
            `「屁股…太过舒服了…感觉…要去了~${heart(1)} 啊~啊啊~嗯呼呜嗯~${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊啊~…连屁股的洞…都要变得不行了~~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「嗯哈啊${heart(1)} 被从后面抱着…就这样被侵犯着屁股什么的…${heart(1)}」`,
          );
          await era.printAndWait(
            `「不行的啊~…真的…啊啊~${heart(1)} 要融化掉了…腰往下的地方都要融化掉了腰${heart(1)}」`,
          );
        }
        // CFLAG:330  = 5（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.背面座位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊~…明明在被温柔地抱着呢${heart(1)}却被侵犯着屁股什么的~ ${heart(1)}」`,
        );
        await era.printAndWait(`「啊啊~…脑袋变得迷迷糊糊起来了~…${heart(1)}」`);
        // CFLAG:330  = 4（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊~啊啊啊~…屁股…有种奇怪的舒服的感觉…嗯~！啊啊~嗯~~！」`,
        );
        await era.printAndWait(`「屁股要…变得…满满得了~…为什么~…嗯哼~………♪」`);
        // CFLAG:330  = 3（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 3;
      } else if (kojo.背面座位肛交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「嗯呜~…这、这样的…不要…的啊…啊啊~不要动起来啊动~」`,
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
        await era.printAndWait(
          `「啊哈啊~…勃起的大鸡巴…十分地热啊~${heart(1)}」`,
        );
        await era.printAndWait(`「温柔地摩擦好？还是激烈地比较好呢~？」`);
        await era.printAndWait(
          `${target_name}漏出了恶作剧的笑容舔了舔嘴唇握住了阴茎………`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「啊啊~…好惹啊~…热地好像手都要烫伤了${heart(1)}」`,
        );
        await era.printAndWait(
          `「为了不伤到大鸡巴会温柔得做的…请尽情地享受吧~${heart(1)}」`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「啊啊~…这么烫…好、好的…会温柔…地、地做的啦………」`,
        );
      } else {
        await era.printAndWait(
          `「呜呜~…居，居然要握住这种东西…啊啊~…好、好烫…的啊………」`,
        );
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
        if (era.get(`talent:${player}:318`) === 1) {
          await era.printAndWait(
            `「雄伟的大肉棒……把这放到女人的阴道里……咽口水${heart(1)}」`,
          );
        } else if (era.get(`talent:${player}:318`) === 2) {
          await era.printAndWait(
            `「小孩子似的鲜肉棒棒，拼尽全力地勃起着呢${heart(1)}${'\u3000'}这样子还不够挑逗女人哦？${heart(1)}」`,
          );
        } else if (era.get(`talent:${player}:318`) === 3) {
          await era.printAndWait(
            `「最喜欢剥开……包茎的外皮了${heart(1)}${'\u3000'}味道简直让人受不了${heart(1)}」`,
          );
        } else if (era.get(`talent:${player}:318`) === 4) {
          await era.printAndWait(
            `「这样的马肉棒，插进来的话一定会让女人疯掉的吧${heart(1)}」`,
          );
        }
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊哈啊~…大鸡巴~${heart(1)} ${sc()}会更加加油地撸的…${heart(1)}」`,
          );
          await era.printAndWait(
            `「请尽情地射出来…变得舒服起来吧${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊~…明明只是用手握住侍奉而已…${sc()}的那里就湿掉了真是毫无办法呢~${heart(1)}」`,
          );
          await era.printAndWait(
            `「哈啊啊~…看着大鸡巴变舒服起来…${sc()}也都…啊啊~${heart(3)}」`,
          );
        }
        // CFLAG:331  = 7（变量语义：CFLAG 族，331）
        kojo.手淫 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.手淫 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊哈啊…大鸡巴…哈啊…居然那么地烫呢~…${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊啊~…只是握着就要忍不住了啊…主人~…${heart(1)}」`,
        );
        await era.printAndWait(
          `压榨着阴茎的${target_name}一脸好像很难受的样子看着你………`,
        );
        // CFLAG:331  = 6（变量语义：CFLAG 族，331）
        kojo.手淫 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.手淫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (era.get(`talent:${player}:318`) === 1) {
          await era.printAndWait(
            `「雄伟的大肉棒啊……把这个插进${sc()}的里面来……咽口水${heart(1)}」`,
          );
        } else if (era.get(`talent:${player}:318`) === 2) {
          await era.printAndWait(
            `「小孩子似的鲜肉棒棒，拼尽全力地勃起着呢${heart(1)}${'\u3000'}真是可爱${heart(1)}」`,
          );
        } else if (era.get(`talent:${player}:318`) === 3) {
          await era.printAndWait(
            `「就喜欢剥开……包茎的外皮了${heart(1)}${'\u3000'}你的味道真是让人受不了${heart(1)}」`,
          );
        } else if (era.get(`talent:${player}:318`) === 4) {
          await era.printAndWait(
            `「这样的马肉棒，插进来的话一定会让我疯掉的吧${heart(1)}」`,
          );
        }
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊~♪…明明只是用手握住侍奉而已…脑袋就变得奇怪起来了♪」`,
          );
          await era.printAndWait(
            `「居然让${target_name}变得那么H起来…这个大鸡巴真是坏呢~${heart(1)}」`,
          );
          await era.printAndWait(
            `「${target_name}会专注地侍奉的~…在大人您满足之前…会一直侍奉下去的…${heart(3)}」`,
          );
        } else {
          await era.printAndWait(`「啊哈啊~♪大鸡巴舒服吗~？」`);
          await era.printAndWait(
            `「只是撸着大鸡巴…${sc()}好像也变得舒服起来了呀♪」`,
          );
          await era.printAndWait(`「撒~…请变得更加舒服起来吧${heart(3)}」`);
        }
        // CFLAG:331  = 5（变量语义：CFLAG 族，331）
        kojo.手淫 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.手淫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊…给大鸡巴侍奉真是高兴呢~…${heart(1)}」`);
        await era.printAndWait(
          `「${sc()}的手中这个顽皮的家伙~…啊啊~一跳一跳地~…真是一个十分可爱得东西呢~${heart(1)}」`,
        );
        await era.printAndWait(
          `「${sc()}…会让大人您更加舒服起来的~${heart(1)}」`,
        );
        // CFLAG:331  = 4（变量语义：CFLAG 族，331）
        kojo.手淫 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊~…大鸡巴…居然那么热…啊啊…总觉得…气氛好奇怪了呢~♪」`,
        );
        await era.printAndWait(`「这样做的话…就会变舒服起来对吧~…？」`);
        // CFLAG:331  = 3（变量语义：CFLAG 族，331）
        kojo.手淫 = 3;
      } else if (kojo.手淫 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「哈啊…哈啊…好，好热…这个…手好像要变奇怪了啊………」`,
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
          `「哈呜嗯~${heart(1)} 大鸡巴…随便怎样舔都可以对吧~${heart(1)}」`,
        );
        await era.printAndWait(
          `「${target_name}会尽~情地…用嘴巴来侍奉的~${heart(1)}…啊啊~唔嗯…哈唔嗯~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}好像很高兴地将嘴巴张开口水就立马流下来滴到了将要含下去的阴茎上………`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「虽，虽然很害羞来的…${target_name}会侍奉…这个…又热又硬的东西的~…${heart(1)}」`,
        );
        await era.printAndWait(
          `「嗯啊~…哈嗯~…嗯~…嗯嗯呜…哈啊…嗯~…啾呜~${heart(1)} 啾呜~${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}很高兴继续着对阴茎的侍奉………`);
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「是、是的…${heart(1)}会…侍奉的…的……呜嗯嗯……」`,
        );
        await era.printAndWait(`「嗯哈啊~…嗯~…嗯哼~…嗯~…哈啊啊…啊啊~」`);
      } else {
        await era.printAndWait(
          `「嗯呜…明，明明都这样了…还要用${scf()}、${sc()}的嘴巴来…啊啊…好、好过分的啊…嗯…啾…啾呜…」`,
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
            `「啊哈啊~~…会好好地吮吸大鸡巴的噢~～${heart(1)}」`,
          );
          await era.printAndWait(
            `「嗯呜~…嗯哼呜呜~…嗯啾~…啾噗嗯~…啾~…嗯~${heart(1)}嗯~${heart(1)}嗯~${heart(3)}」`,
          );
          await era.printAndWait(
            `${target_name}一副下流地姿态用嘴巴侍奉阴茎………`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `${target_name}只是闻着阴茎的味道、表情就变得荡漾起来了。`,
          );
          await era.printAndWait(
            `「大鸡巴~…嗯啾~${heart(1)} 好喜欢~…大鸡巴好喜欢~${heart(3)}」`,
          );
          await era.printAndWait(
            `「啊啊~…大鸡巴…太喜欢了啊~~…${heart(1)} 啊啊~…不行了~…哈呜嗯~…啾噜啾呜...啾呜呜呜~${heart(3)}」`,
          );
        } else {
          await era.printAndWait(
            `${target_name}很高兴地含下出现在眼前的阴茎。`,
          );
          await era.printAndWait(
            `「嗯呜~…啾~${heart(1)} 啾~${heart(1)} 啾呜~~${heart(1)} 大鸡巴…大鸡巴…好好吃啊~~${heart(3)}」`,
          );
          await era.printAndWait(
            `「精液${heart(1)}…请尽情地${heart(1)} 将全部的精液都射出来吧~${heart(1)}」`,
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
            `「嗯哼唔~…好热好硬的东西哈啊~~${heart(1)} 请用${sc()}嘴巴来…尽情地享受吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}好像很高兴地一样眯着眼睛将阴茎放入了嘴巴里。`,
          );
          await era.printAndWait(
            `「哈呜嗯${heart(1)} 嗯~${heart(1)} 嗯呼呜~${heart(1)}…啾~…啾噗…呸咯~♪」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊哈啊~…其实最喜欢用嘴巴侍奉了呢~${heart(1)}」`,
          );
          await era.printAndWait(
            `「因为~…将那么可爱阴茎放进嘴里后…就会一跳一跳地好像很舒服地一样动着呢~…啊呜嗯${heart(1)}」`,
          );
          await era.printAndWait(
            `「嗯呜嗯~♪嗯~嗯嗯~…啾呜~…啾噗呜~…呸咯~…噗哈啊~…呐~~${heart(1)} 已经上瘾了呢~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊…是个最喜欢大鸡巴的变态真是对不起…${heart(1)}」`,
          );
          await era.printAndWait(
            `「但是~…吮吸…停不下来呐~…${heart(1)} 嗯啾…啾~…啾噗~…呜哼呜呼~♪」`,
          );
          await era.printAndWait(
            `「嗯~嗯~嗯呼呜~…啊啊~…请原谅吧~…请将精~液射到${target_name}的嘴巴里吧~${heart(3)}」`,
          );
        }
        // CFLAG:332  = 4（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.口交_奴 <= 2 || game.kojo.口上开关 === 2)
      ) {
        era.print(
          `「哈啊…哈啊…嗯啾~…啾~…啾噗嗯~…是、是的…专注于…前端…的对吧~…」`,
        );
        await era.printAndWait(
          `「哈啊啊~…啊啊~…先走汁…出来好多了~♪ 嗯啾~…啾~♪」`,
        );
        // CFLAG:332  = 3（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 3;
      } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「这样的…明、明明不要的…啾~…啾~…呸咯…」`);
        // CFLAG:332  = 2（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 32) {
    if (kojo.乳交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「用胸部来侍奉什么的~…${heart(1)}」`);
        await era.printAndWait(
          `「嗯哼哼~…请用${sc()}下流的胸部来、尽情地享受吧~${heart(3)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「真、真是的…用胸部来，夹住什么的~…♪」`);
        await era.printAndWait(
          `「虽然早就习惯了大人您的变态癖好了…嗯、是的、当然会好好地给大人侍奉的啦~~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}露出了如同恶作剧一般地笑容、用胸部将阴茎夹住了………`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「用，用胸部来夹住什么的…啊~…嗯~…胸部好热啊~…♪」`,
        );
      } else {
        await era.printAndWait(`「呜…这、这样的会感觉到舒服吗………？」`);
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
          await era.printAndWait(
            `「啊啊~…大鸡巴好热啊~…胸部好舒服的啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `「嗯~…啊嗯~…大鸡巴好像也很舒服的样子啊~~~♪」`,
          );
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            await era.printAndWait(
              `「请在${sc()}柔软的胸部上…尽情地射出来吧~~${heart(1)}」`,
            );
          }
          await era.printAndWait(`${target_name}一脸荡漾的表情继续着侍奉………`);
        } else {
          await era.printAndWait(`「嗯哼哼呜~…用胸部做很舒服吗~？」`);
          await era.printAndWait(
            `「感觉到大鸡巴好烫而且硬邦邦的…${sc()}太舒服了好像要变奇怪了呀~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}将舌头下流地伸出来、好像现在就会将阴茎吞下去………`,
          );
        }
        // CFLAG:333  = 7（变量语义：CFLAG 族，333）
        kojo.乳交 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.口交_奴 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊~…大鸡巴好热啊~…胸部好舒服啊~${heart(1)}」`,
        );
        await era.printAndWait(`「嗯~…啊嗯~…大鸡巴好像也很舒服的样子啊~~~♪」`);
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(
            `「请在${sc()}柔软的胸部上…尽情地射出来吧~~${heart(1)}」`,
          );
        }
        await era.printAndWait(`${target_name}一脸荡漾的表情继续着侍奉………`);
        // CFLAG:333  = 6（变量语义：CFLAG 族，333）
        kojo.乳交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.乳交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「嗯~…啊啊~…要用${sc()}的胸部来侍奉的对吧~♪」`,
          );
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            await era.printAndWait(
              `「…明明…以前只觉得这种东西只是妨碍而已~${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `「能给大人您派上用场真是好高兴呢~${heart(3)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊~…请用${sc()}的胸部来…尽情地享受吧~${heart(1)}」`,
          );
          await era.printAndWait(
            `「这个胸部是为了大人您而存在得…终于明白了呢~${heart(3)}」`,
          );
        }
        // CFLAG:333  = 5（变量语义：CFLAG 族，333）
        kojo.乳交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.乳交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「嗯~…啊啊~…要用${sc()}的胸部来侍奉的对吧~♪」`);
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(
            `「…明明…以前只觉得这种东西只是妨碍而已~${heart(1)}」`,
          );
        }
        await era.printAndWait(
          `「能给大人您派上用场真是好高兴呢~${heart(3)}」`,
        );
        // CFLAG:333  = 4（变量语义：CFLAG 族，333）
        kojo.乳交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.乳交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯~...会好好地用♪……啊啊~…是、是的~…会用胸部来侍奉的~…」`,
        );
        await era.printAndWait(
          `「啊~…好、好奇怪啊…碰到大鸡巴的地方…好热…好舒服啊~…嗯~♪」`,
        );
        // CFLAG:333  = 3（变量语义：CFLAG 族，333）
        kojo.乳交 = 3;
      } else if (kojo.乳交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「哈啊…哈啊…胸部…好热…的啊………」`);
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
          `「啊~…嗯呜~…${sc()}什么时候都准备好来着的~…也不插进来…就这样做什么的…${heart(1)}」`,
        );
        await era.printAndWait(`「啊~啊~啊啊~…啊啊~…在摩擦着呢~…${heart(1)}」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「啊啊~…真的好害羞啊~…♪」`);
        await era.printAndWait(`「将大鸡巴用股间夹住…来侍奉什么的♪」`);
        await era.printAndWait(
          `${target_name}虽然嘴上说着这样的话，但其实很高兴地用股间来侍奉着………`,
        );
      } else {
        await era.printAndWait(
          `「啊啊~…不、不要啊啊…${sc()}的爱液…居然漏出来了………」`,
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
          `「啊啊嗯~…${heart(1)} ${sc()}的小穴想要被怎样做…明白的吧~？」`,
        );
        await era.printAndWait(
          `「明明这个…淫乱小穴的深处…想…想要被大鸡巴抽插地死去活来的，明明想要献上处女来的~♪」`,
        );
        await era.printAndWait(
          `「主人~...拜托了~…快点…快点…请侵犯了${sc()}吧~~~${heart(3)}」`,
        );
        await era.printAndWait(
          `哪怕意识变得奇怪起来了、${target_name}也没有停止用股间侍奉………`,
        );
        // CFLAG:334  = 6（变量语义：CFLAG 族，334）
        kojo.股间性交 = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.股间性交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊~…好热的啊~…明明给大鸡巴酱侍奉才可以~啊嗯~${heart(1)}」`,
        );
        await era.printAndWait(
          `「只是夹着而已…爱液就停不下来了啊~~${heart(1)} 啊啊~…是个淫乱小穴真的是对不起${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊~…哈呜~…哈呜~…嗯啊啊啊~${heart(1)} 会、会好好地用股间来侍奉的~~♪」`,
        );
        // CFLAG:334  = 5（变量语义：CFLAG 族，334）
        kojo.股间性交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`talent:${target}:0`) === 1 &&
        (kojo.股间性交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊~…嗯哼唔~…不要…不要的啊~…明明${sc()}还是…处女来的啊~…♪」`,
        );
        await era.printAndWait(
          `「大鸡巴的形状，还有热度…啊啊~…都要用股间记下来了呀~${heart(3)}」`,
        );
        await era.printAndWait(
          `「请原谅…请原谅${sc()}吧~…再继续这样的侍奉的话，脑袋就要变奇怪了呀~」`,
        );
        // CFLAG:334  = 4（变量语义：CFLAG 族，334）
        kojo.股间性交 = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.股间性交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊~…好热啊~…大鸡巴好热啊啊~………${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的脸变得通红发烫、慢慢地动起了腰部。`,
        );
        await era.printAndWait(
          `「啊啊~…已经…已经要忍不住了啊~…大鸡巴…请给大鸡巴吧~${heart(3)}」`,
        );
        await era.printAndWait(
          `${player_name}抓住${target_name}的腰，如同拒绝插进去一样，用阴茎摩擦着${target_name}的蜜穴………`,
        );
        // CFLAG:334  = 3（变量语义：CFLAG 族，334）
        kojo.股间性交 = 3;
      } else if (kojo.股间性交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「啊~…嗯~…这、这样…明明只是被大鸡巴摩擦着而已………」`,
        );
        await era.printAndWait(`「爱、爱液…黏糊糊地…停不下来了呀~………」`);
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
          if (era.get(`talent:${target}:314`) === 7) {
            await era.printAndWait(
              `${target_name}兴奋地舔着嘴唇坐在了${player_name}的身上。`,
            );
            await era.printAndWait(
              `「啊啊啊${heart(1)}…”自己献上处女吧~”像这样这样的命令什么的…主人可知道${sc()}到底等了这样命令等了多久了呀~${heart(1)}」`,
            );
            await era.printAndWait(
              `「除了主人之外从来没有给别人看过摸过的主人专属小穴来的噢…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}呵呵地笑着用双手将小穴给张开了。`,
            );
            await era.printAndWait(
              `「请，请看一下…${sc()}的处女小穴…是要吃掉主人的大鸡巴的地方来的${heart(3)}」`,
            );
            await era.printAndWait(
              `${target_name}慢慢地将腰部坐下来…阴茎往着还没有习惯的腔穴的里面慢慢地挤进去。`,
            );
            await era.printAndWait(
              `「噢~、噢噢噢~${heart(3)}到深、深处了…已经全部都进到里面去了啊啊~${heart(5)}」`,
            );
            await era.printAndWait(
              `${target_name}的处女膜被一点一点地捅破穿过、将${player_name}的阴茎全部吞了进去。`,
            );
            await era.printAndWait(
              `「呜嗯~…啊~…哈啊~…啊、啊啊啊啊啊~～${heart(5)} 进、进去了啊~…${heart(1)}」`,
            );
          } else {
            if (era.get(`talent:${target}:317`) === 4) {
              await era.printAndWait(
                `「接，接下来…很荣幸将淫乱${target_name}的处女小穴…奉献给主人~…${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}脸通红着用双手将蜜穴张开。`,
              );
              await era.printAndWait(
                `「………其实${sc()}、在故乡里有着婚约者呢…名字？样子？…那种东西…已经都忘掉了呀~…${heart(1)}」`,
              );
              await era.printAndWait(
                `「因为…接下来${sc()}会一直都是主人的东西来的了呀~${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}将阴茎对准了蜜穴、慢慢地将腰部降下来了。`,
              );
              await era.printAndWait(
                `「啊啊~…${sc()}已经…是主人的东西来的了呀${heart(1)} 请一直…使唤${sc()}吧…${heart(3)}」`,
              );
            } else {
              await era.printAndWait(
                `「接、接下来…很荣幸将淫乱${target_name}的处女小穴…奉献给主人~…${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}脸通红着用双手将蜜穴张开。`,
              );
              await era.printAndWait(
                `「啊啊~…从今以后…小穴要被操到死去活来的日子要到了对吧~${heart(1)}」`,
              );
              await era.printAndWait(
                `「早中晚从不休息…一直都被主人给侵犯的日子…啊啊~${heart(1)}…啊啊啊~${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}将阴茎对准了蜜穴、慢慢地将腰部降下来了。`,
              );
              await era.printAndWait(
                `${target_name}处女膜被一点一点地捅破穿过、将${player_name}的阴茎全部吞了进去。`,
              );
              await era.printAndWait(
                `「啊~…啊啊…好棒…好棒啊~…主人的全部…都好想要啊~~…啊~啊啊啊~${heart(1)}」`,
              );
            }
          }
        } else if (era.get(`talent:${target}:85`) === 1) {
          if (era.get(`talent:${target}:314`) === 1) {
            await era.printAndWait(`「虽，虽然…明白大人您是魔王来的…~！」`);
            await era.printAndWait(
              `「但，但是自己将处女献上什么的………太、太不知羞耻了！」`,
            );
            await era.printAndWait(
              `长长的耳朵的前端完全变得通红的${target_name}，一边抱怨着，一边在你身上扒开了自己的蜜穴。`,
            );
            await era.printAndWait(
              `「但，但是…啊嗯~${heart(1)}…大人您…嗯~${heart(1)}…无论如何…都~${heart(1)}…要${target_name}这样做的话…啊啊~${heart(1)}」`,
            );
            await era.printAndWait(
              `每当${target_name}的蜜穴摩擦着阴茎的时候都会发出H的娇喘、长长的耳朵好像很害羞地一样一抖一抖地。`,
            );
            await era.printAndWait(
              `「魔、魔王大人…拜托…请将精灵族的…姑、姑娘一直保护到现在的…纯、纯洁给…夺…嗯~…夺走吧~~${heart(5)}」`,
            );
            await era.printAndWait(
              `${target_name}说完后就自己将腰压下来、为了献上处女而将异物塞进了的腔内的深处………`,
            );
          } else {
            if (era.get(`talent:${target}:317`) === 4) {
              await era.printAndWait(
                `「啊啊~${heart(1)} 是、是的…${sc()}作为原勇者的${target_name}的…不为了其它人而是为了大人您而留下来的处女现在奉献给您~${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}就像骑马一样骑在${player_name}身上，用一只手撑住保持平衡，然后用另一只手将${player_name}的阴茎对准蜜穴。`,
              );
              await era.printAndWait(
                `「请让${sc()}…成为…大人您的东西吧~~${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}慢慢地将腰扭动着压下去。${player_name}的阴茎将其处女膜捅破穿过、${target_name}的脸因为破瓜之痛而扭曲了。`,
              );
              await era.printAndWait(
                `「嗯呜~…！啊啊~…请让${sc()}一直呆在大人您的身旁吧………${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}突然感到了心塞了一下、而那个原因早就被她所忘记了………`,
              );
            } else {
              await era.printAndWait(
                `「啊啊啊~${heart(1)} 哈啊…啊啊~…居然是…这样地一种方式献上纯洁什么的…${heart(1)}」`,
              );
              await era.printAndWait(
                `「不过…请让${sc()}成为大人您的东西吧…${heart(1)} 请在${sc()}的身体里刻上大人您的印记吧~${heart(1)}」`,
              );
              await era.printAndWait(
                `${player_name}将${target_name}的腰部抓住，强硬地往下拉、将${target_name}的处女膜给捅破了。`,
              );
              await era.printAndWait(
                `「哼唔啊啊~…！啊啊~…请从今以后...好好地珍惜${sc()}的这里吧~……${heart(1)}」`,
              );
            }
          }
        } else {
          if (era.get(`talent:${target}:317`) === 4) {
            await era.printAndWait(
              `「啊啊~…不要…不要啊…这样啊…啊啊~…啊…不、不行…的啊…哼唔…哼呜呜！」`,
            );
            await era.printAndWait(
              `「对不起…真的...对不起………${scf()}、${sc()}太弱…的原因…啊啊…啊…………啊哼…哼啊啊！」`,
            );
            await era.printAndWait(
              `${target_name}一边向着故乡的恋人道歉一边被${player_name}从下往上地抽插侵犯着………`,
            );
          } else {
            await era.printAndWait(
              `「呜…这，这样得…不、不行的啊…请、请原谅吧…自己来做什么的…完全不行啊………」`,
            );
            await era.printAndWait(
              `${player_name}将${target_name}的腰抓住后，直接强硬地插进去了………`,
            );
          }
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「啊啊~…${target_name}会好好侍奉主人的~${heart(1)} 」`,
          );
          await era.printAndWait(
            `「请尽情享受淫乱${target_name}的淫乱的舞蹈吧~…${heart(1)}」`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(`「啊~、请不要这样盯着看啦~…${heart(1)}」`);
          await era.printAndWait(
            `「连接在一起的地方…啊~啊啊啊~…♪ 好像要融化掉了呀~…${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊~啊啊啊...不、不行的啊~~…再这样…就太羞耻了动不了了…啊~啊啊啊~！请不要向上顶啊啊~」`,
          );
        }
      }
      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335）
      kojo.骑乘位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.骑乘位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(4) === 0) {
          await era.printAndWait(
            `「啊啊~…腰要…停不下来了啊~${heart(1)} 主人~…太舒服了~…呜~${heart(1)}啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `「变成喜欢大鸡巴的淫乱女人真是对不起…在去之前${heart(1)}在去之前腰都不会停下来的啊啊~~${heart(3)}」`,
          );
        } else if (rand_n(3) === 0) {
          await era.printAndWait(
            `「嗯哼唔~${heart(1)} ${sc()}…好喜欢这种姿势啊…因为......因为啦~${heart(1)}」`,
          );
          await era.printAndWait(
            `「能十分地感觉到…小穴…将大鸡巴给吞下去了呢~${heart(3)}啊啊~…好舒服啊啊~${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊~${heart(1)}…那么淫乱真的很对不起~…自己就…随便地…变得舒服起来了真是对不起${heart(1)}」`,
          );
          await era.printAndWait(
            `「大鸡巴太舒服了呀~~…啊啊~…请用大鸡巴…更多地…操到${sc()}失神为止吧~~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「噢~噢~哦哈啊啊~${heart(1)}…啊啊~…不行不行不行不行~${heart(1)} 不行的啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `「再这样…大鸡巴塞进去的话…呜嗯呜啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `「整个人都要变奇怪了…脑袋里只能…想到大鸡巴而已了…${heart(3)}」`,
          );
        }
        // CFLAG:335  = 6（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.骑乘位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(4) === 0) {
          await era.printAndWait(
            `「大人您…不用动也没关系的啦啊~~…${heart(1)}」`,
          );
          await era.printAndWait(
            `请将${sc()}所～有都交给${sc()}吧~${heart(1)} 啊~${heart(1)} 恶作剧可不行的呀~」`,
          );
          era.print(
            `「${sc()}会让大鸡巴…变得…嗯呜~…舒服起来的…啊~啊啊哈啊~…啊啊啊~…嗯~${heart(3)}」`,
          );
        } else if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊啊~…喜欢…好喜欢的啊~…${heart(1)} 像这样自己动起来的话…哦~噢噢~${heart(1)}」`,
          );
          await era.printAndWait(
            `「就会明白…哦哈啊~${heart(1)} 大鸡巴进到了，进到了深处了啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `「哈嗯呜~…不行~…腰停不下来了啊~${heart(1)}在去之前完全停不下来啊~~${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊~…啊啊~…真的是对不起${heart(1)} 因为大鸡巴塞到了里面去了…所以在去之前…腰完全停不下来的啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `「是个H的小穴真是对不起${heart(1)} 但是，但是…怎么都停不下来啊啊~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊~…就这样…根本不想离开了啊~~…${heart(1)}」`,
          );
          await era.printAndWait(
            `「好想一直一直就这样…腰部融化跟大人您合为一体呀~…${heart(3)}」`,
          );
        }
        // CFLAG:335  = 5（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 5;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.骑乘位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「嗯哈啊~${heart(1)} 进…进到了…深处了呀~${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊啊~…这么…下流的样子…明明…完全不想晃动起腰部来的~…♪」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊哈啊~…♪ 啊~啊啊~嗯哼~${heart(1)} 进到了…深处了~…嗯嗯~♪」`,
          );
          await era.printAndWait(`「明明…不能动的…腰却…自己动起来了啊~………♪」`);
        } else {
          await era.printAndWait(`「啊啊~…请、请不要看着啊…♪」`);
          await era.printAndWait(
            `「大鸡巴…太舒服了…请不要看着腰晃动的地方啦…啊啊~啊~♪」`,
          );
        }
        // CFLAG:335  = 4（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.骑乘位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「${sc()}会、会自己动的啦…请不要在下面往上，哈啊~…啊~啊啊~」`,
        );
        await era.printAndWait(`「哼~…啊~…啊嗯~…嗯~…♪」`);
        // CFLAG:335  = 3（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 3;
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「哈啊~啊…嗯~…明明…已经动不了…哈呜嗯~…啊啊…请不要欺负${sc()}………」`,
        );
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
          `「嗯哼哼~…真是正好呢~、将每一个角落…都洗的干干净净地吧~${heart(1)}」`,
        );
        await era.printAndWait(`「啊啊嗯~…那、那里是不能碰的啦~…♪」`);
      } else {
        await era.printAndWait(
          `「${scf()}、${sc()}只用身体来帮忙洗澡什么的…真、真是不知羞耻的事情啊！」`,
        );
        await era.printAndWait(
          `${player_name}觉得，嘴上这么说但是已经在做准备的${target_name}是多么地惹人疼爱………`,
        );
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
          `「啊哈啊恩~…泡泡滑滑的真是舒服呢~${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊~${heart(1)}…嗯哼唔~${heart(1)}…唔哼哼~…啊啊嗯~、不能做恶作剧啦~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}虽然仔细地洗着澡，但是不停地从蜜穴流出来得爱液都浪费掉了………`,
        );
        // CFLAG:336  = 5（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.全身擦洗 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯哼唔~${heart(1)} 大人请就这样坐着不动噢~${heart(1)}」`,
        );
        await era.printAndWait(
          `「${sc()}会好好地帮大人洗干净的…哈嗯呜~…啊、那、那、那种地方也不用洗得很干净吧…哈嗯呜~${heart(1)}」`,
        );
        // CFLAG:336  = 4（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.全身擦洗 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯哼哼~…非常容易出泡泡呢~、这个肥皂…用起来十分地舒服呢~…」`,
        );
        await era.printAndWait(`「啊啊嗯~…那、那里是不能摸得啦~…♪」`);
        // CFLAG:336  = 3（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 3;
      } else if (kojo.全身擦洗 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「在、在洗澡的途中，如果…做、做什么奇怪的事情的话可是会让你好看的…啊、哈嗯呜~！！」`,
        );
        // CFLAG:336  = 2（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 36) {
    if (kojo.骑乘位肛交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「嗯哼哼~${heart(1)}…${target_name}会用肛穴来好好侍奉大人您的~${heart(1)}」`,
        );
        await era.printAndWait(`「请尽情地变得舒服起来吧~${heart(3)}」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「啊嗯~…啊啊~${heart(1)} 肛穴在…扩大着…呜嗯~…哈呜嗯~~…${heart(1)}」`,
        );
        await era.printAndWait(
          `「哈啊恩~~${heart(1)} 大鸡巴…连根部都吞进去了呀~~~${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「呜啊…啊啊~…不要啊…屁股的洞在…扩、扩大着…哈呜，啊呜呜呜~」`,
        );
      }
      // CFLAG:TARGET:337  = 1（变量语义：CFLAG 族，TARGET:337）
      kojo.骑乘位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊~${heart(1)} 主人…肛穴变得那么舒服真是对不起呜~${heart(1)}」`,
          );
          await era.printAndWait(
            `「肛穴要…不行~${heart(1)}不行的呀~${heart(1)} 腰自己就动起来了呀${heart(1)}」`,
          );
          await era.printAndWait(
            `「嗯啊啊~${heart(1)}请处罚不懂事的${sc()}吧！请尽情地处罚吧~~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「嗯~嗯哼啊~${heart(1)} 肛穴…在被侵犯着…在被侵犯着呢~${heart(3)}」`,
          );
          await era.printAndWait(
            `${target_name}淫乱的笑着，淫猥地上下晃动着腰、肛穴正紧紧地挤压着阴茎。`,
          );
          await era.printAndWait(
            `「啊啊~…弄坏掉吧…将${sc()}弄坏掉吧${heart(3)}」`,
          );
        }
        // CFLAG:337  = 7（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.骑乘位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「嗯哈啊嗯~…肛穴SEX最棒了呀~~${heart(1)}」`);
        await era.printAndWait(
          `「呜哼哼~${heart(1)} 肛穴…居然会那么有感觉什么的…${sc()}是个淫乱的姑娘真是对不起~${heart(1)}」`,
        );
        // CFLAG:337  = 6（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊~…肛门居然会那么地有感觉~…${heart(1)}」`,
          );
          await era.printAndWait(
            `「哈啊嗯~${heart(1)}阴茎完美地和肛门重合了~${heart(1)}…啊啊~${heart(1)} 嗯~…不行~…腰要动起来了~~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊~${heart(1)} 真是对不起~…${sc()}是个肛门敏感的变态姑娘真的是对不起~~${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊啊嗯~${heart(1)} 哎~？…变得更加舒服也没关系吗…？」`,
          );
          await era.printAndWait(
            `「大人~非常感谢…${sc()}…就要变成肛门有感觉的变态了~~${heart(3)}」`,
          );
        }
        // CFLAG:337  = 5（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯啊啊~…请使用${sc()}H的肛门小穴来…尽~情地…变得舒服起来吧~~${heart(1)}」`,
        );
        // CFLAG:337  = 4（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊嗯~…屁股的小穴…有感觉了~…${sc()}…要，要尽情地动起来了哦…${heart(1)}」`,
        );
        // CFLAG:337  = 3（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 3;
      } else if (kojo.骑乘位肛交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「嗯呜~...啊啊…阴茎…连根部都…塞进去了…不、不行、不行的啊！」`,
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
        await era.printAndWait(`「啊啊…${sc()}…这种事情…还没有做过呢…啊啊~♪」`);
        await era.printAndWait(`${target_name}对着肛门用嘴巴侍奉起来了………`);
      } else {
        await era.printAndWait(
          `「呜~…居，居然要用嘴巴往这种地方…嗯、恩呜呜…」`,
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
        await era.printAndWait(
          `「嗯呼呜~…主人的肛穴…${sc()}会尽情地侍奉起来得${heart(1)}」`,
        );
        await era.printAndWait(`「啊啊~…每一片皱纹…都会舔干净${heart(3)}」`);
        await era.printAndWait(
          `「啾啾呜~…呸咯噢~…哦哈啊~…肛门里面的东西好好吃…嗯~嗯呃呜~${heart(1)}」`,
        );
        // CFLAG:338  = 5（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 === 2)
      ) {
        era.print(`「啊啊~…连屁股的穴都要侍奉什么的…${heart(1)}」`);
        era.print(`「嗯啾…嗯啾…嗯呼呜~…会更加呸咯呸咯地舔噢~${heart(1)}」`);
        // CFLAG:338  = 4（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「嗯哈啊…啊~…嗯~…啾~…啾呜~…」`);
        await era.printAndWait(`「啊啊~…${sc()}的嘴巴…嗯~…嗯呼嗯~………」`);
        // CFLAG:338  = 3（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 3;
      } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「嗯啾…呸咯…啾…嗯呃………」`);
        await era.printAndWait(`「啊~…啊啊~…请、请原谅，已经…请原谅吧………」`);
        // CFLAG:338  = 2（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 38) {
    if (kojo.足交 === 0) {
      await era.printAndWait(`「想要被踩吗~？……真是奇怪的兴趣来的呢~」`);
      // CFLAG:TARGET:339  = 1（变量语义：CFLAG 族，TARGET:339）
      kojo.足交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:20`) >= 3 &&
        (kojo.足交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          era.print(`「哼哼~${heart(1)}`);
        } else {
          era.print(`「这样做很舒服对吧~？`);
        }
        if (rand_n(2) === 0) {
          await era.printAndWait(`哭吧~…哭得更好听一点吧~」`);
        } else {
          await era.printAndWait(
            `想要被做什么事情快说出来让${scf()}听听啊~、变态桑~」`,
          );
        }
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「如果说出来的话就让你更加爽噢~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「如果说出来的话就让你感受一下被夹紧的感觉噢~${heart(1)}」`,
          );
        }
        // CFLAG:TARGET:339  = 5（变量语义：CFLAG 族，TARGET:339）
        kojo.足交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:20`) >= 3 &&
        (kojo.足交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (era_flag.assi > 0 && era_flag.assiplay) {
          await era.printAndWait(
            `「${scf()}会好好地疼爱你、直到无法反抗为止的哦~」`,
          );
          await era.printAndWait(`「请做好觉悟吧~${heart(3)}」`);
        } else {
          await era.printAndWait(`「哼哼哼~${heart(1)} 只是去干还不满足吗？」`);
          await era.printAndWait(
            `「居然还想要被虐什么的，真是下流的家伙呢${heart(1)}」`,
          );
        }
        // CFLAG:TARGET:339  = 4（变量语义：CFLAG 族，TARGET:339）
        kojo.足交 = 4;
        return 0;
      } else if (
        era.get(`abl:${target}:20`) >= 1 &&
        (kojo.足交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「来吧…想要被踩对吧~？」`);
        } else {
          await era.printAndWait(`「想被${scf()}踩对吧|~？」`);
        }
        if (rand_n(3) === 0) {
          await era.printAndWait(`「你真是令人鄙夷地变态受虐狂呢~」`);
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「你真是无可奈何的变态来的呢~」`);
        } else {
          await era.printAndWait(`「你真的是个最差劲的渣滓呢~」`);
        }
        // CFLAG:TARGET:339  = 3（变量语义：CFLAG 族，TARGET:339）
        kojo.足交 = 3;
        return 0;
      } else if (kojo.足交 <= 1 || game.kojo.口上开关 === 2) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「要用脚来做嘛？？」`);
        } else {
          await era.printAndWait(`「想要用脚来做的吗？？」`);
        }
        if (rand_n(2) === 0) {
          await era.printAndWait(`「完全无法理解呢……」`);
        } else {
          await era.printAndWait(`「真是无法理解呢……」`);
        }
        // CFLAG:TARGET:339  = 2（变量语义：CFLAG 族，TARGET:339）
        kojo.足交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 40) {
    if (kojo.打屁股 === 0) {
      await era.printAndWait(
        `「不要啊！？ 请、不要打${target_name}！好疼啊！」`,
      );
      // CFLAG:TARGET:341  = 1（变量语义：CFLAG 族，TARGET:341）
      kojo.打屁股 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.打屁股 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯呜嗯~${heart(1)}啊~${heart(1)}啊~${heart(1)}啊啊嗯~~${heart(3)}」`,
        );
        await era.printAndWait(
          `${target_name}的屁股不知道被用手掌拍打了多少次、已经变得非常的红肿了。`,
        );
        await era.printAndWait(
          `「做喂母猪真素真素对不齐…请更加处罚…请更加处罚${sc()}吧~${heart(1)}」`,
        );
        // CFLAG:TARGET:341  = 5（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.打屁股 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈呜~${heart(1)} 啊啊嗯~${heart(1)} 哈啊啊~…${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊啊~…魔王大人~…请更加地…处罚…${target_name}吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}每当被打到的时候都一脸好像要融化的啊嘿颜的样子………`,
        );
        // CFLAG:TARGET:341  = 4（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 4;
        return 0;
      } else if (
        era.get(`mark:${target}:0`) === 3 &&
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.打屁股 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊~…啊~…是，是的…${target_name}会好好地…为了更好被打到…将屁股…抬高起来的…啊啊~！」`,
        );
        await era.printAndWait(
          `${target_name}将屁股高高地抬起来，如同在引诱着你的责打而摇晃着屁股………`,
        );
        // CFLAG:TARGET:341  = 3（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 3;
        return 0;
      } else if (kojo.打屁股 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「请，请原谅…请不要再打了…啊~啊啊啊~！」`);
        await era.printAndWait(
          `${target_name}的屁股不知道被打了多少次，变得十分地红肿、她的眼角不停地流着泪珠………`,
        );
        // CFLAG:TARGET:341  = 2（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 41) {
    if (kojo.鞭 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊嗯~…啊~啊啊~…请处罚${target_name}吧~…${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「啊啊~…哈呜嗯~…啊啊~…呀啊啊~${heart(1)}」`);
        await era.printAndWait(`「啊啊~…这样的…只是…疼一下而已………」`);
      } else {
        await era.printAndWait(`「啊啊~…哈呜…啊啊~…不要啊………被打的不要………」`);
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
          `「嗯呜${heart(1)} 更加…更加用力地打下来吧~${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊啊~${heart(1)} 哪怕被打了…也会变得好舒服呢~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}每当鞭子打下来后，爱液便会飞散出来………`,
        );
        // CFLAG:TARGET:342  = 9（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯哈啊啊~${heart(1)} ${sc()}是一只鞭子挥下来就会有感觉的母猪来的${heart(1)}」`,
        );
        await era.printAndWait(`「请打到失去意识吧~${heart(1)}」`);
        await era.printAndWait(
          `${target_name}每当被鞭子打到就会发出娇喘、${player_name}的鞭子就会更加用力挥下去………`,
        );
        // CFLAG:TARGET:342  = 8（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.鞭 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊嗯~…啊~啊~…请更加用力处罚${sc()}吧…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}每当被打到一下身体就出扭动起来………`,
        );
        // CFLAG:TARGET:342  = 7（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 7;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.鞭 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊~…啊~…啊啊啊啊~${heart(1)}…哈啊…哈啊…啊啊…被打到的地方…正在一抽一抽的${heart(1)}」`,
        );
        await era.printAndWait(
          `「更加欺负${sc()}…请更加欺负${sc()}吧…${heart(1)}」`,
        );
        // CFLAG:TARGET:342  = 6（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊啊~…嗯~…嗯~${heart(1)} 好棒…的呀~啊哈~…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}每当鞭子挥下去就会从蜜穴流出爱液………`,
        );
        // CFLAG:TARGET:342  = 5（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.鞭 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「请原谅…请原谅${target_name}吧………」`);
        await era.printAndWait(
          `${target_name}身体颤抖着，好像很害怕的样子，………`,
        );
        // CFLAG:TARGET:342  = 4（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯哈恩~…啊啊~…明明在被打着…啊啊~...明明应该很疼来的…♪」`,
        );
        await era.printAndWait(
          `${target_name}每次被打到的时候都紧紧合住双腿、一脸好像在忍耐着什么东西的样子………`,
        );
        // CFLAG:TARGET:342  = 3（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 3;
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「不、不要啊…已经…被打的不要啊…不要啊………」`);
        // CFLAG:TARGET:342  = 2（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 42) {
    if (kojo.针 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「哈呜…不，不行的啊…请、请原谅…请原谅${sc()}吧！！！」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「${scf()}、${sc()}到底…做了什么错事了吗…啊~啊啊~啊啊啊啊~！」`,
        );
      } else {
        await era.printAndWait(
          `「哈呜~…用、用这种东西到底想要干什么…难、难道…不要~不要不要啊啊啊啊啊！」`,
        );
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
          `「啊~…啊啊~…哈啊嗯~${heart(1)}…好奇怪啊~…明明好痛来的…明明好痛来的呀${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}柔弱的皮肤渗出血来了也发出了愉悦的呻吟………`,
        );
        // CFLAG:TARGET:343  = 9（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊~…针…在一转一转地…麻，麻掉了…要麻掉了…${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}对自己麻痹的感觉迷惑起来了………`);
        // CFLAG:TARGET:343  = 8（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.针 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊~…对不起…作为一个下流的奴隶真是对不起…请原谅${sc()}吧………」`,
        );
        await era.printAndWait(`${target_name}因为尖锐的苦痛而哭泣起来了………`);
        // CFLAG:TARGET:343  = 7（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 7;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.针 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯哈啊~…请更加…更多地…刺…进去吧~…${heart(1)}」`,
        );
        await era.printAndWait(
          `柔软的皮肤流出了鲜血，${target_name}发出了愉悦的声音………`,
        );
        // CFLAG:TARGET:343  = 6（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「嗯哼~…针…好深…好深呀~…嗯哈呜~${heart(1)}」`);
        await era.printAndWait(`${target_name}对自己麻痹的感觉迷惑起来了………`);
        // CFLAG:TARGET:343  = 5（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.针 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「原谅…请原谅${target_name}吧…疼什么的…真的不要呀…不要…不要啊………」`,
        );
        await era.printAndWait(`${target_name}因为尖锐的苦痛而哭泣起来了………`);
        // CFLAG:TARGET:343  = 4（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊~…麻，麻掉了…要麻掉了…${heart(1)}」`);
        await era.printAndWait(`${target_name}对自己麻痹的感觉迷惑起来了………`);
        // CFLAG:TARGET:343  = 3（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 3;
      } else if (kojo.针 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「嗯呜！…不要不要不要啊啊啊啊啊！」`);
        // CFLAG:TARGET:343  = 2（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 43 && era.get(`tequip:${target}:43`)) {
    if (kojo.眼罩 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
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
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.眼罩 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 7;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.眼罩 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
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
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.眼罩着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('');
      // CFLAG:380  = 3（变量语义：CFLAG 族，380）
      kojo.眼罩着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
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

  if (era_flag.selectcom === 44 && era.get(`tequip:${target}:44`)) {
    if (kojo.绳子 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊啊恩~…请更加用力地将${sc()}绑住吧~${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「明明不用做这种情况…${sc()}早就是大人您的东西来的了…${heart(1)}」`,
        );
      } else {
        await era.printAndWait(`「啊啊~…快、快点解开啊！」`);
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
          `「嗯哈嗯~…更加…用力地绑…也没关系的啊~~${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊啊~…然后就这样被侵犯的话${heart(1)}…就真的是最棒得了~~${heart(3)}」`,
        );
        await era.printAndWait(`${target_name}被捆绑到爱液流遍了大腿………`);
        // CFLAG:TARGET:345  = 9（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊${heart(1)}哈啊${heart(1)} 绳子…陷进肉里了${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊啊~…啊啊~…已，已经…啊啊…主人~…${heart(3)}」`,
        );
        await era.printAndWait(
          `${target_name}坐立不安地好像期待着什么东西一样看着你………`,
        );
        // CFLAG:TARGET:345  = 8（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.绳子 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊…绳子连…胸部都陷进去了…${heart(1)}」`);
        await era.printAndWait(`${target_name}因为被捆绑着而高兴………`);
        // CFLAG:TARGET:345  = 7（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 7;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.绳子 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈啊~…哈啊~…啊啊~…不行…不行的啊~${heart(1)}`);
        await era.printAndWait(
          `「小穴被绳子捆绑着…明明很难受来的…啊~啊啊~…哈嗯~~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被粗绳捆绑住后露出了发情的母狗一样的啊嘿颜呻吟起来了………`,
        );
        // CFLAG:TARGET:345  = 6（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊~…更加的…收紧一点吧~~…${heart(1)}」`);
        await era.printAndWait(
          `「被捆绑住后…就更加能感受到…${target_name}是大人您的东西来的…${heart(3)}」`,
        );
        await era.printAndWait(
          `${target_name}一脸好像很舒服的样子地被捆绑着………`,
        );
        // CFLAG:TARGET:345  = 5（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.绳子 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊~…${sc()}…在被大人您捆绑着呢…${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}一脸恍惚地样子被捆绑着………`);
        // CFLAG:TARGET:345  = 4（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊恩~…绳子…请再${heart(1)}收紧一点吧~~…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}每当绳子收地更紧的时候就露出了更加淫荡的声音………`,
        );
        // CFLAG:TARGET:345  = 3（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 3;
      } else if (kojo.绳子 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「哈啊~…哈啊~…请原谅…绳子好紧啊……请将绳子给解开吧~~~………」`,
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
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「哈啊…哈啊…啊啊…绳子装明明不错来的…${heart(1)}」`,
      );
      // CFLAG:385  = 2（变量语义：CFLAG 族，385）
      kojo.绳子着脱 = 2;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊啊嗯~…明明想要被捆住…一整天都没有关系来的${heart(1)}」`,
      );
      // CFLAG:385  = 2（变量语义：CFLAG 族，385）
      kojo.绳子着脱 = 2;
    } else if (kojo.绳子着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「哈啊哈啊…啊啊…绳子的勒痕…那么地…」`);
      // CFLAG:385  = 1（变量语义：CFLAG 族，385）
      kojo.绳子着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 45 && era.get(`tequip:${target}:45`)) {
    if (kojo.口塞 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「嗯~…嗯呃~…嗯呼嗯~…嗯嗯~${heart(1)}」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「嗯~…嗯呜~…嗯呼…嗯嗯~${heart(1)}」`);
      } else {
        await era.printAndWait(`「嗯~…嗯呜~…嗯呼~…嗯嗯~」`);
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
        await era.printAndWait(`「嗯~…嗯呜~…嗯呼~…嗯嗯~${heart(1)}」`);
        // CFLAG:TARGET:346  = 9（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「嗯~…嗯呜~…嗯呼~…嗯嗯~${heart(1)}」`);
        // CFLAG:TARGET:346  = 8（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.口塞 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「嗯~…嗯呜~…嗯呼~…嗯嗯~${heart(1)}」`);
        // CFLAG:TARGET:346  = 7（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 7;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.口塞 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「嗯~…嗯呜~…嗯呼~…嗯嗯~${heart(1)}」`);
        // CFLAG:TARGET:346  = 6（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「嗯~…嗯呜~…嗯呼~…嗯嗯~${heart(1)}」`);
        // CFLAG:TARGET:346  = 5（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.口塞 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「嗯~…嗯呜~…嗯呼~…嗯嗯~${heart(1)}」`);
        // CFLAG:TARGET:346  = 4（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「嗯~…嗯呜~…嗯呼~…嗯嗯~」`);
        // CFLAG:TARGET:346  = 3（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 3;
      } else if (kojo.口塞 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「嗯~…嗯呜~…嗯呼~…嗯嗯~」`);
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
      await era.printAndWait(`「嗯哈啊…哈啊…哈啊…哈啊…主人…${heart(1)}」`);
      // CFLAG:386  = 3（变量语义：CFLAG 族，386）
      kojo.口塞着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.口塞着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「嗯哈啊…哈啊…哈啊…哈啊…好难受来的啊…${heart(1)}」`,
      );
      // CFLAG:386  = 2（变量语义：CFLAG 族，386）
      kojo.口塞着脱 = 2;
    } else if (kojo.口塞着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「嗯哈啊…哈啊…哈啊…哈啊…」`);
      // CFLAG:386  = 1（变量语义：CFLAG 族，386）
      kojo.口塞着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 46 && era.get(`tequip:${target}:46`)) {
    if (kojo.灌肠肛塞 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊啊~…进来了呀~~~${heart(1)}…啊啊~${heart(1)}浣肠液${heart(1)}好热~~好舒服~~${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「不，不行的呀…${scf()}、${sc()}…肚子的感觉便奇怪了~啊啊~…好烫！浣肠液好烫呀~~~」`,
        );
      } else {
        await era.printAndWait(
          `「啊~啊~…嗯呃啊…肚子…好难受…请、请快停下来………」`,
        );
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
          `「啊哈啊~…${heart(1)} 好热…好热好厉害啊~${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊哈哦~${heart(1)}不要不要…肚子要~${heart(1)} 请不要那么温柔地${heart(1)} 抚摸肚子了${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊~…噢噢~…肚子…好、好多进去了…嗯~噢噢~${heart(3)}」`,
        );
        // CFLAG:347  = 7（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.灌肠肛塞 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊~…好热的~…正在进来呀~${heart(1)} 哈呜~好烫好热呀~${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊啊啊~…主人~…肚子里面的东西…请尽情地看着吧~${heart(1)}」`,
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
          `「啊~啊啊啊~…嗯~…肚子…在咕噜咕噜地响着呢…${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊啊~就这样…将不像样的姿态给暴露出来了呀~…${heart(1)}」`,
        );
        await era.printAndWait(
          `「大人您的话…就没有关系的~~…啊啊~…请…请看着吧~${heart(1)}」`,
        );
        // CFLAG:347  = 5（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.灌肠肛塞 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊~啊啊啊~…嗯~…肚子…在咕噜咕噜地响着呢…${heart(1)}」`,
        );
        await era.printAndWait(`「真，真的…好难受的…请原谅一下…哈啊…呃呜………」`);
        // CFLAG:347  = 4（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.灌肠肛塞 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊~…肚，肚子里面…突然变奇怪起来了…屁，屁股…变，变奇怪了…请救救${sc()}吧！」`,
        );
        // CFLAG:347  = 3（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 3;
      } else if (kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 === 2) {
        if (era.get(`tequip:${target}:54`) === 1 && era_flag.prevcom === 46) {
          await era.printAndWait(
            `「真、真的不要了啊，赤裸着，在人前，排泄什呃，肚子，肚子好疼啊啊啊！」`,
          );
        } else if (era_flag.prevcom === 46) {
          await era.printAndWait(
            `「不、不要啊！${'\u3000'}不要再那样了啊啊…肚子、进来了啊………」`,
          );
        } else {
          await era.printAndWait(
            `「肚子…好、好难受啊…请，请不要再这样欺负${sc()}了………」`,
          );
        }
        // CFLAG:347  = 2（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 2;
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 46 &&
    era.get(`tequip:${target}:46`) === 0
  ) {
    if (kojo.灌肠肛塞着脱 === 0) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3
      ) {
        if (
          era.get(`tequip:${target}:54`) === 1 &&
          era.get(`tequip:${target}:53`) === 1
        ) {
          if (era.get(`tequip:${target}:44`) === 0) {
            await era.printAndWait(
              `${target_name}用自己的手扒开了菊穴，展示着本应羞于见人的排泄场面……`,
            );
          }
          await era.printAndWait(
            `「哈啊啊啊、嗯哦唔、嗯吼噢噢噢唔${black_heart(1)}」`,
          );
          await era.printAndWait(
            `「咿…哈噢哦唔呜呜嗯${black_heart(1)}${'\u3000'}好好看着哦${black_heart(1)}${'\u3000'}好好录下来哦${black_heart(1)}」`,
          );
          await era.printAndWait(
            `「粪便把菊穴给、撑开了啊${black_heart(1)}${'\u3000'}拉出来了啊…${black_heart(1)}」`,
          );
          await era.printAndWait(
            `「像狗一样，在外面随地排泄…请看看因此觉得舒服了的、污秽的母兽啊…唔${black_heart(1)}」`,
          );
        } else if (era.get(`tequip:${target}:54`) === 1) {
          await era.printAndWait(
            `「哦欧唔…${black_heart(1)}${'\u3000'}啊${black_heart(1)}${'\u3000'}啊${black_heart(1)}${'\u3000'}嗯嗯…啊昂…吼哦、吼唔噢噢噢噢${black_heart(1)}」`,
          );
          await era.printAndWait(
            `「来了、拉出来了啦${black_heart(1)}${'\u3000'}在人前、张开着菊、菊穴…粪便…嗯、${sc()}呃${black_heart(1)}」`,
          );
          await era.printAndWait(
            `「这样好舒服哦${black_heart(1)}${'\u3000'}要上瘾了啊呜呜呜…${black_heart(1)}」`,
          );
        } else if (era.get(`tequip:${target}:53`) === 1) {
          await era.printAndWait(
            `「${target_name}的喷粪秀${black_heart(1)}${'\u3000'}请一定要好好看着哦…${black_heart(1)}」`,
          );
          await era.printAndWait(
            `「哦吼${black_heart(1)}${'\u3000'}嘤嘤咿咿、咕唔${black_heart(1)}${'\u3000'}要拉出来了${black_heart(1)}${'\u3000'}拉出来了吧${black_heart(1)}」`,
          );
          await era.printAndWait(
            `「刺溜刺溜的${black_heart(1)}${'\u3000'}乱成一团了…${black_heart(1)}${'\u3000'}${sc()}、要变成白痴了啊……${black_heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `${target_name}因为初次强制排泄调教的快感而全身颤抖起来……`,
          );
          await era.printAndWait(
            `「哈嗷嗷嗷啊啊嗷嗷唔${black_heart(1)}${'\u3000'}真是耻辱极了${black_heart(1)}${'\u3000'}太耻辱了${black_heart(1)}」`,
          );
          await era.printAndWait(
            `「这才是和变态淫乱奴隶的${sc()}相称的调教啊${black_heart(1)}${'\u3000'}这样的、才够过分啊${black_heart(1)}」`,
          );
        }
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「就算${sc()}是主人的奴隶，还是个变态，这…这也，太过头了吧啊啊啊${black_heart(1)}」`,
        );
        await era.printAndWait(
          `「啊${black_heart(1)}${'\u3000'}啊${black_heart(1)}${'\u3000'}嗷嗷、啊${black_heart(1)}${'\u3000'}拉、拉出来了…停不下来…出来了、好多啊啊啊啊……${black_heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「请、请不要看啊……唯独不想让主人大人看到的啊……嗯、嗯咕呜呜呜！${'\u3000'}不要看啊啊啊啊！！」`,
        );
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3
      ) {
        if (
          era.get(`talent:${target}:成为勇者前的生活`) === 5 ||
          era.get(`talent:${target}:成为勇者前的生活`) === 7 ||
          era.get(`talent:${target}:成为勇者前的生活`) === 9 ||
          era.get(`talent:${target}:成为勇者前的生活`) === 20
        ) {
          // 同一行输出：无后缀 PRINTFORM 链，
          // 是四选一的出身（IF 链收行，#623）
          const former_life = era.get(`talent:${target}:成为勇者前的生活`);
          await era.printAndWait(
            (former_life === 5
              ? `「从娼妇`
              : former_life === 7
                ? `「从乞丐`
                : former_life === 9
                  ? `「从贫民`
                  : `「从奴隶`) + `成为了勇者，就能摆脱以前的生活…才对的啊…」`,
          );
          await era.printAndWait(
            `「${scf()}、${sc()}，怎么就落到这个地步…呢…」`,
          );
          if (era.get(`tequip:${target}:53`) === 1) {
            await era.printAndWait(
              `「啊啊啊、被拍下来了啊…${sc()}的耻辱的、样子…怎么这样…怎么…」`,
            );
          }
          await era.printAndWait(
            `「噫！${'\u3000'}呀…呀啊啊啊啊…强制排泄什么的…怎么…怎么会…这么…舒服…的啊啊……」`,
          );
        } else {
          era.print(
            `在初次强制排泄的耻辱中，${target_name}记住了这混乱的快感……`,
          );
          await era.printAndWait(
            `「不、不是吧！${'\u3000'}这种事应该不会舒服才…啊？${'\u3000'}嗷嗷？${'\u3000'}哈、啊啊啊…啊啊啊啊嗷${black_heart(1)}」`,
          );
        }
      } else {
        if (
          era.get(`talent:${target}:成为勇者前的生活`) === 5 ||
          era.get(`talent:${target}:成为勇者前的生活`) === 7 ||
          era.get(`talent:${target}:成为勇者前的生活`) === 9 ||
          era.get(`talent:${target}:成为勇者前的生活`) === 20
        ) {
          // 同一行输出（与上一段同型，
          // IF 链收行，#623）
          const former_life = era.get(`talent:${target}:成为勇者前的生活`);
          const origin_word =
            former_life === 5
              ? `娼妇`
              : former_life === 7
                ? `乞丐`
                : former_life === 9
                  ? `贫民`
                  : `奴隶`;
          await era.printAndWait(
            `「不、不要啊！${'\u3000'}这这这、这样子的、比` +
              origin_word +
              `还不如的待遇！！」`,
          );
          await era.printAndWait(
            `「${scf()}、${sc()}，都成为勇者…成为勇者摆脱这些了啊…呀、呀啊啊啊！？」`,
          );
          if (era.get(`tequip:${target}:53`) === 1) {
            await era.printAndWait(
              `「…啊、不要拍啊…唔、${sc()}的这幅模样…请不要记录下来啊啊…！」`,
            );
          }
          await era.printAndWait(
            `「啊啊啊啊…！${'\u3000'}停、停下啊…已经、出不来了、出、啊啊啊啊啊啊、啊嗷嗷嗷嗷…不要啊……」`,
          );
        } else if (
          era.get(`tequip:${target}:54`) === 1 &&
          era.get(`tequip:${target}:53`) === 1
        ) {
          era.print(
            `用水晶球记录了全裸只戴了项圈的${target_name}在初次地下城里排泄的样子……`,
          );
          await era.printAndWait(
            `「这样子的、这样子的绝对不可原谅啊…唔、绝对…绝对的…！」`,
          );
          await era.printAndWait(
            `「总有一天…绝对、要破坏掉那个水晶球…啊啊啊啊啊、出来了…快停下、快停下啊……」`,
          );
        } else if (era.get(`tequip:${target}:54`) === 1) {
          await era.printAndWait(
            `「认输了…至少、去厕所、再…呃！${'\u3000'}啊啊啊啊…不、不要啊啊！！」`,
          );
          await era.printAndWait(
            `「这样…耻辱的、在地下城里…漏出来了什么的…咕呜呜…啊啊啊！！」`,
          );
        } else if (era.get(`tequip:${target}:53`) === 1) {
          era.print(
            `记忆的水晶球完整的把${target_name}的痴态，由始至终的记录了下来……`,
          );
          await era.printAndWait(
            `「在连厕所都没有的地方…在人前、暴露着这样的丑态…这样的、这、样…」`,
          );
          await era.printAndWait(
            `「不行了…呜！${'\u3000'}又、又拉了、泄出来了…啊啊啊、不要看…啊！！」`,
          );
        } else {
          await era.printAndWait(
            `「这、这是…这样子的啊、真是什么调教方式都有呢魔王、…呜呜！！」`,
          );
          await era.printAndWait(
            `「啊啊啊…明明不是野猫野狗、竟然在没有厕所的地方、让${sc()}这幅丑态…」`,
          );
          await era.printAndWait(
            `「…啊、啊啊啊！${'\u3000'}又要、出来…出来了啊…！！」`,
          );
        }
      }
      // CFLAG:TARGET:387  = 1（变量语义：CFLAG 族，TARGET:387）
      kojo.灌肠肛塞着脱 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.灌肠肛塞着脱 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (era.get(`tequip:${target}:54`) === 1) {
          if (rand_n(2) === 0) {
            era.print(`「哈唉呜~${heart(1)}`);
          } else {
            era.print(`「哈唉呜~${heart(1)}`);
          }
          if (rand_n(2) === 0) {
            era.print(`嗯哦哦哦~${heart(3)}`);
          } else {
            era.print(`哦吼噢噢~${heart(3)}`);
          }
          if (rand_n(2) === 0) {
            await era.printAndWait(`噢噢噢哦~${heart(3)}」`);
          } else {
            await era.printAndWait(`啊啊啊~${heart(3)}」`);
          }

          for (const count of era.getAddedCharacters()) {
            if (
              chara(count).invasion.状态 === 2 &&
              chara(count).dungeon.侵攻阶层 === 9 &&
              era.get(`abl:${target}:17`) >= 5
            ) {
              if (rand_n(3) === 0) {
                // 同一行输出：无后缀
                // PRINTFORM 链，三选一遭遇的 RAND 链
                // 按原序先抽，末尾收行（#623）
                await era.printAndWait(
                  `「…哈、啊哈${black_heart(1)}${'\u3000'}一想到${sc()}拉出来的东西、要是让探索中的勇者` +
                    (rand_n(3) === 0
                      ? `找到`
                      : rand_n(2) === 0
                        ? `一不小心捡到`
                        : `无意中踩到`) +
                    `了的话…吼吼噢噢噢噢${black_heart(1)}」`,
                );
                await era.printAndWait(
                  `「实在是…非常的、令人兴奋不已啊${black_heart(1)}」`,
                );
              } else if (rand_n(2) === 0) {
                await era.printAndWait(
                  `「光着身子、散着步、${sc()}、愉快的拉臭臭${black_heart(1)}」`,
                );
                await era.printAndWait(
                  `「快要靠近的的勇者…马上就要${black_heart(1)}${'\u3000'}看到${sc()}拉臭臭的样子啦啊啊…${black_heart(1)}」`,
                );
              } else {
                await era.printAndWait(
                  `「主人大人、还有其他的各位、来看看吧${black_heart(1)}${'\u3000'}哦、哦哦、哦吼吼哦…${black_heart(1)}」`,
                );
                await era.printAndWait(
                  `「全裸的${target_name}、在地下城…从菊穴拉出臭臭来了…请好好看着这不雅的姿态吧${black_heart(1)}」`,
                );
              }
              // CFLAG:387  = 7（变量语义：CFLAG 族，387）
              kojo.灌肠肛塞着脱 = 7;
              return 0;
            }
          }

          if (era.get(`tequip:${target}:53`) === 1) {
            if (rand_n(3) === 0) {
              await era.printAndWait(
                `「拍下来啦${black_heart(1)}${'\u3000'}${target_name}的、野外排泄…被拍下来了啦${black_heart(1)}」`,
              );
            } else if (rand_n(2) === 0) {
              await era.printAndWait(
                `「出来了出来了…${black_heart(1)}${'\u3000'}嗷嗷${black_heart(1)}${'\u3000'}再多看看啊…再多拍一些啊${black_heart(1)}」`,
              );
            } else {
              await era.printAndWait(
                `「野外露出${black_heart(1)}${'\u3000'}还野外排泄了…太有感觉了${black_heart(1)}${'\u3000'}请再多拍一些哦……${black_heart(1)}」`,
              );
            }
          } else {
            if (rand_n(3) === 0) {
              await era.printAndWait(
                `「在这种…地方…${sc()}拉了这么多…太有感觉了…${black_heart(1)}」`,
              );
            } else if (rand_n(2) === 0) {
              await era.printAndWait(
                `「主人大人…${sc()}的…野外排泄…看吧…看着吧啊啊啊…${black_heart(1)}」`,
              );
            } else {
              await era.printAndWait(
                `「停不下来啊${black_heart(1)}${'\u3000'}光着身子…拉了好多…野外排泄${black_heart(1)}${'\u3000'}好多…${black_heart(1)}」`,
              );
            }
          }
        } else {
          if (rand_n(2) === 0) {
            await era.printAndWait(
              `「停不下来…根本停不下来啊…${black_heart(1)}${'\u3000'}拉臭臭…好舒服啊…${black_heart(1)}」`,
            );
          } else {
            await era.printAndWait(
              `「嗯嗯…吼…吼哦${black_heart(1)}${'\u3000'}哈啊啊、嘤咿咿${black_heart(1)}${'\u3000'}灌肠灌了好多出来…好棒${black_heart(1)}」`,
            );
          }
        }
        // CFLAG:387  = 7（变量语义：CFLAG 族，387）
        kojo.灌肠肛塞着脱 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.灌肠肛塞着脱 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (era.get(`tequip:${target}:54`) === 1) {
          if (rand_n(2) === 0) {
            era.print(`「哈唉呜~${heart(1)}`);
          } else {
            era.print(`「哈唉呜~${heart(1)}`);
          }
          if (rand_n(2) === 0) {
            era.print(`嗯哦哦哦~${heart(3)}`);
          } else {
            era.print(`哦吼噢噢~${heart(3)}`);
          }
          if (rand_n(2) === 0) {
            await era.printAndWait(`噢噢噢哦~${heart(3)}」`);
          } else {
            await era.printAndWait(`啊啊啊~${heart(3)}」`);
          }
          if (rand_n(2) === 0) {
            await era.printAndWait(
              `「主人~…哈唉呜~${heart(1)} 请，请不要看着那里~${heart(3)}」`,
            );
          } else {
            await era.printAndWait(
              `「停…停不下来啊~~……在这种地方…${scf()}要、要拉出来了呀啊啊啊~${heart(3)}」`,
            );
          }
        } else {
          await era.printAndWait(
            `「哈啊~${heart(1)} 主人…要、要拉出来了呀啊啊啊~${heart(3)}」`,
          );
        }
        // CFLAG:387  = 6（变量语义：CFLAG 族，387）
        kojo.灌肠肛塞着脱 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.灌肠肛塞着脱 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊~、请不要看着那里……要、要拉出来了……真的……不要看啊嗷嗷」`,
        );
        // CFLAG:387  = 4（变量语义：CFLAG 族，387）
        kojo.灌肠肛塞着脱 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.灌肠肛塞着脱 <= 2 || game.kojo.口上开关 === 2)
      ) {
        for (const count of era.getAddedCharacters()) {
          if (
            era.get(`tequip:${target}:54`) === 1 &&
            chara(count).invasion.状态 === 2 &&
            chara(count).dungeon.侵攻阶层 === 9 &&
            era.get(`abl:${target}:17`) >= 5
          ) {
            if (rand_n(3) === 0) {
              await era.printAndWait(
                `「啊啊啊啊啊啊啊…！${'\u3000'}好舒服啊啊…！${'\u3000'}怪物也好其他的勇者也行啊…！」`,
              );
              await era.printAndWait(
                `「光着身子、在地下城、${sc()}排便的样子…好、好想被看到啊♪」`,
              );
            } else if (rand_n(2) === 0) {
              await era.printAndWait(
                `「明明不可以的、可是、好舒服噢噢噢噢…唔♪」`,
              );
              await era.printAndWait(
                `「在还有其他人的气息的地下城里…光着身子拉臭臭…要上瘾了啊啊…♪」`,
              );
            } else {
              await era.printAndWait(
                `「啊啊啊啊、停不下来啊啊…！${'\u3000'}谁、有谁要过来了！${'\u3000'}可是拉得停不下来啊！」`,
              );
              await era.printAndWait(
                `「在地下城、裸体排便、不想停不下来…太舒服了啊啊啊啊…♪」`,
              );
            }
            // CFLAG:387  = 3（变量语义：CFLAG 族，387）
            kojo.灌肠肛塞着脱 = 3;
            return 0;
          } else if (
            era.get(`tequip:${target}:54`) === 1 &&
            chara(count).invasion.状态 === 2 &&
            chara(count).dungeon.侵攻阶层 === 9
          ) {
            await era.printAndWait(
              `「啊啊…！${'\u3000'}这、这瞬间也有可能、会碰上在地下城探索中的其他勇者、的啊…！」`,
            );
            await era.printAndWait(
              `「明明光着身子…在野外…排便、不想停下来、啊！${'\u3000'}啊啊啊、怎么会这么舒服啊啊啊！？」`,
            );
            // CFLAG:387  = 3（变量语义：CFLAG 族，387）
            kojo.灌肠肛塞着脱 = 3;
            return 0;
          }
        }

        if (era.get(`tequip:${target}:54`) === 1) {
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `「在外面…在地下城里…光着身子的这幅丑态、${scf()}、${sc()}……竟然」`,
            );
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「请原谅…请原谅我啊！！${'\u3000'}啊、啊啊啊啊啊、出来了…出来了啊啊啊啊…唔！？${'\u3000'}啊、啊嗷嗷嗷♪」`,
            );
          } else {
            await era.printAndWait(
              `「啊…啊啊、泄出来了…！${'\u3000'}连衣服都没穿的在地下城里…可是、怎么会、这么舒服…啊啊！」`,
            );
          }
        } else {
          // 同一行输出：PRINTFORM 不换行，三支的
          // PRINTFORMW 各自收行。前缀提到语句外共用——各支语句只列本支的基准，
          // 前缀留在里面会被保真锁 C 当成多出来的插值记号（抽签顺序不变，#623）
          const crying_out = rand_n(3) === 0;
          const line_head = `「不、骗人的吧！${'\u3000'}像这样子动着…慢慢排出来、菊穴、还蠕动`;
          if (crying_out) {
            await era.printAndWait(line_head + `着……竟然…」`);
          } else if (rand_n(2) === 0) {
            await era.printAndWait(line_head + `着……唔！」`);
          } else {
            await era.printAndWait(line_head + `着…明明不可以的……」`);
          }
        }
        // CFLAG:387  = 3（变量语义：CFLAG 族，387）
        kojo.灌肠肛塞着脱 = 3;
      } else if (kojo.灌肠肛塞着脱 <= 1 || game.kojo.口上开关 === 2) {
        if (era.get(`mark:${target}:2`) === 3) {
          for (const count of era.getAddedCharacters()) {
            if (
              era.get(`tequip:${target}:54`) === 1 &&
              chara(count).invasion.状态 === 2 &&
              chara(count).dungeon.侵攻阶层 === 9
            ) {
              await era.printAndWait(
                `「求求您了、只有这点请不要…啊！${'\u3000'}啊、啊啊啊啊…！？${'\u3000'}出、出来了…！」`,
              );
              await era.printAndWait(
                `「停下来…${sc()}拉出来的东西、要被其他勇者看见了啊呜呜呜呜……！！」`,
              );
              // CFLAG:387  = 2（变量语义：CFLAG 族，387）
              kojo.灌肠肛塞着脱 = 2;
              return 0;
            }
          }

          if (
            era.get(`tequip:${target}:54`) === 1 &&
            era.get(`tequip:${target}:53`) === 1
          ) {
            era.print(`一丝不挂的${target_name}在地下城里不停地排便着……`);
            await era.printAndWait(
              `「请原谅我…请原谅…${sc()}的…这、这幅模样…请不要记录下来啊…」`,
            );
          } else if (era.get(`tequip:${target}:54`) === 1) {
            await era.printAndWait(
              `「不要、不要啊…在地下城里、连衣服都没穿、啊啊啊…停不下来、停下来……啊」`,
            );
          } else if (era.get(`tequip:${target}:53`) === 1) {
            await era.printAndWait(`「呜呜…别看啊、至少…请不要拍、啊……」`);
          } else {
            // 三条支合成同一行输出：前缀不换行（行尾的全角空格是行
            // 排版的一部分，保留），三支各自的语句各自收行。前缀为三
            // 支共用，提到语句外（#623）
            const birth_shown = rand_n(3) === 0;
            const line_head = `「原、原谅我…啊啊啊啊！！${'\u3000'}`;
            if (birth_shown) {
              await era.printAndWait(
                line_head + `又要…出来了、出…快停下来啊……！！」`,
              );
            } else if (rand_n(2) === 0) {
              await era.printAndWait(
                line_head +
                  `请、请怜悯下…！${'\u3000'}啊？${'\u3000'}啊啊、不要啊啊……」`,
              );
            } else {
              await era.printAndWait(
                line_head + `不要…请原俩…啊啊啊！${'\u3000'}啊啊啊……」」`,
              );
            }
          }
        } else {
          for (const count of era.getAddedCharacters()) {
            if (
              era.get(`tequip:${target}:54`) === 1 &&
              chara(count).invasion.状态 === 2 &&
              chara(count).dungeon.侵攻阶层 === 9
            ) {
              await era.printAndWait(
                `「啊啊、停下停下来啊啊…！${'\u3000'}不要拉出来啊、啊…！${'\u3000'}啊、啊啊…！？」`,
              );
              await era.printAndWait(
                `「不、不然的话！${'\u3000'}${sc()}的排泄物、就要被其他勇者看到了啊啊啊……！！」`,
              );
              // CFLAG:387  = 2（变量语义：CFLAG 族，387）
              kojo.灌肠肛塞着脱 = 2;
              return 0;
            }
          }

          if (
            era.get(`tequip:${target}:54`) === 1 &&
            era.get(`tequip:${target}:53`) === 1
          ) {
            await era.printAndWait(
              `「快、快停下啊！${'\u3000'}这…这样的姿态被拍下来什么的…啊啊啊啊！？」`,
            );
          } else if (era.get(`tequip:${target}:54`) === 1) {
            await era.printAndWait(
              `「不、不要哇…在地下城里、连衣服都没穿、啊啊啊…停不下来、停下来……啊」`,
            );
          } else if (era.get(`tequip:${target}:53`) === 1) {
            await era.printAndWait(
              `「厕所、快点去厕所…不行、在这里拍什么的…请原谅、啊啊啊、不要啊啊啊……！！」`,
            );
          } else {
            await era.printAndWait(`「请、请原谅…啊啊啊啊~！！」`);
          }
        }
        // CFLAG:387  = 2（变量语义：CFLAG 族，387）
        kojo.灌肠肛塞着脱 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 55) {
    if (kojo.放置PLAY === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`${target_name}一脸若无其事地看着这边………`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「哈啊哈啊…要…休息了吗...？」`);
        await era.printAndWait(
          `${target_name}不满地微眯着眼，看着${player_name}………`,
        );
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「哈啊…啊啊…主人~…拜，拜托了呀~…啊啊~…至、至少抱一下吧~~~…」`,
        );
        await era.printAndWait(
          `${target_name}的眼睛湿润起来，向${player_name}撒起娇来了………`,
        );
      } else {
        await era.printAndWait(`「嗯~………什么也不做吗？」`);
        await era.printAndWait(`${target_name}一脸若无其事地看着这边………`);
      }
      era.print('');

      if (era.get(`tequip:${target}:11`)) {
        await era.printAndWait(
          `在${target_name}的蜜穴里的穴蠕虫正在蠕动着、毫不留情地在腔内来回钻着。`,
        );
      }

      if (era.get(`tequip:${target}:13`)) {
        await era.printAndWait(
          `在${target_name}的肛门里的肛门虫正在蠕动着、毫不留情地在腔内来回钻着。`,
        );
      }

      if (era.get(`tequip:${target}:19`)) {
        await era.printAndWait(
          `在${target_name}的肛门里有着拉珠、导致肛门一抽一抽地。`,
        );
      }

      if (era.get(`tequip:${target}:14`)) {
        await era.printAndWait(
          `${target_name}的阴蒂戴上了电动阴蒂夹，不停地给${target_name}带来刺激。`,
        );
      }

      if (era.get(`tequip:${target}:15`)) {
        await era.printAndWait(
          `${target_name}带在乳头上的跳蛋正不停地给予她刺激。`,
        );
      }

      if (era.get(`tequip:${target}:16`)) {
        era.print(`${target_name}的胸部正戴上了榨乳器而不停地被吸出母乳。`);
      }

      if (era.get(`tequip:${target}:17`)) {
        await era.printAndWait(
          `${target_name}的阴茎被套上了飞机杯，好像下一秒就要射了一样一抽一抽地。`,
        );
      }

      if (era.get(`tequip:${target}:43`)) {
        await era.printAndWait(`${target_name}正在带着眼罩。`);
      }

      if (era.get(`tequip:${target}:44`)) {
        await era.printAndWait(
          `${target_name}的身体处于在被绳子捆绑住的状态。`,
        );
      }

      if (era.get(`tequip:${target}:46`)) {
        await era.printAndWait(
          `${target_name}的肚子因为浣肠液的原因咕噜咕噜地响着、如果将塞子拔出来的话肯定会立马喷出来了吧。`,
        );
      }

      if (era.get(`tequip:${target}:49`)) {
        await era.printAndWait(
          `${target_name}的肛门里插着电极棒、每当轻微地电流刺激一下，括约肌就会抽搐一下。`,
        );
      }

      if (era.get(`tequip:${target}:53`)) {
        await era.printAndWait(
          `还有、这样的${target_name}的姿态由始至终都被录下来了………`,
        );
      }
      // CFLAG:356  = 1（变量语义：CFLAG 族，356）
      kojo.放置PLAY = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「………什么都不做吗？」`);
        await era.printAndWait(`${target_name}一脸若无其事地看着这边………`);
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`palam:${target}:5`) >= PALAMLV[3] &&
        (kojo.放置PLAY <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「好，好过分啊…用这种眼神看着这边…啊啊~啊~…明明，${scf()}、${sc()}…已经、变、变得奇怪起来了~………${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}已经完全被欲望支配了，明明什么都没有干就快要去了的样子………`,
        );
        // CFLAG:356  = 6（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.放置PLAY <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊…啊啊…主人~…拜，拜托了…啊啊…请，请抱一下${player_name}吧…」`,
        );
        await era.printAndWait(
          `${target_name}湿润着眼睛向${player_name}撒起了娇………`,
        );
        // CFLAG:356  = 5（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`palam:${target}:5`) >= PALAMLV[3] &&
        (kojo.放置PLAY <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「不要休息了啦…快点…将${sc()}…啊嗯~…将${sc()}啊~………${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}完全忍受不了被放置play的样子………`);
        // CFLAG:356  = 4（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.放置PLAY <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈啊哈啊…要…休息了吗…？」`);
        await era.printAndWait(
          `${target_name}不满地眯着眼睛、看向${player_name}………`,
        );
        // CFLAG:356  = 3（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 3;
      } else if (kojo.放置PLAY <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「………什么都不做吗？」`);
        await era.printAndWait(`${target_name}一脸若无其事地看着这边………`);
        // CFLAG:356  = 2（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 2;
      }
      era.print('');

      if (era.get(`tequip:${target}:11`)) {
        await era.printAndWait(
          `${target_name}的蜜穴里的穴蠕虫正在蠕动着、毫不留情地在腔内来回钻着。`,
        );
      }

      if (era.get(`tequip:${target}:13`)) {
        await era.printAndWait(
          `${target_name}的肛门里的肛门虫正在蠕动着、毫不留情地在腔内来回钻着。`,
        );
      }

      if (era.get(`tequip:${target}:19`)) {
        await era.printAndWait(
          `${target_name}的肛门里有着拉珠、导致肛门一抽一抽地。`,
        );
      }

      if (era.get(`tequip:${target}:14`)) {
        await era.printAndWait(
          `${target_name}的阴蒂戴上了电动阴蒂夹，不停地给${target_name}带来刺激。`,
        );
      }

      if (era.get(`tequip:${target}:15`)) {
        await era.printAndWait(
          `${target_name}带在乳头上的跳蛋正不停地给予她刺激。`,
        );
      }

      if (era.get(`tequip:${target}:16`)) {
        era.print(`${target_name}的胸部正戴上了榨乳器而不停地被吸出母乳。`);
      }

      if (era.get(`tequip:${target}:17`)) {
        await era.printAndWait(
          `${target_name}的阴茎被套上了飞机杯，好像下一秒就要射出来了一样一抽一抽地。`,
        );
      }

      if (era.get(`tequip:${target}:43`)) {
        await era.printAndWait(`${target_name}正在带着眼罩。`);
      }

      if (era.get(`tequip:${target}:44`)) {
        await era.printAndWait(
          `${target_name}的身体处于在被绳子捆绑住的状态。`,
        );
      }

      if (era.get(`tequip:${target}:46`)) {
        await era.printAndWait(
          `${target_name}的肚子因为浣肠液的原因咕噜咕噜地响着、如果将塞子拔出来的话肯定会立马喷出来了吧。`,
        );
      }

      if (era.get(`tequip:${target}:49`)) {
        await era.printAndWait(
          `${target_name}的肛门里插着电极棒、每当轻微地电流刺激一下，括约肌就会抽搐一下。`,
        );
      }

      if (era.get(`tequip:${target}:53`)) {
        await era.printAndWait(
          `还有、这样的${target_name}的姿态由始至终都被录下来了………`,
        );
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 56) {
    if (kojo.交谈 === 0) {
      if (era.get(`tequip:${target}:53`) === 1) {
        era.print(`${master_name}催促着${target_name}开始自我介绍。`);
        if (
          rand_n(3) === 0 &&
          (era.get(`talent:${target}:89`) || era.get(`abl:${target}:17`) >= 5)
        ) {
          // 同一行输出（#600）
          const masturbation = (era.get(`abl:${target}:31`) || 0) >= 3;
          era.print(
            `${target_name}将自己的本名、接下来要进行的性体验` +
              (masturbation ? '还有手淫时妄想的内容' : '') +
              `之类的兴高采烈地说个不停……`,
          );
          era.print(
            `${target_name}只是因为想象着水晶球在故乡传播开的画面股间就湿润了……`,
          );
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (era.get(`talent:${target}:76`) === 1) {
          era.print(`${target_name}对着水晶球说起了淫猥的话语`);
          await era.printAndWait(`「嗨、嗨~各位」`);
          await era.printAndWait(`「故乡的大家、有看到吗~？」`);
          await era.printAndWait(
            `「接下来…要和在这里的魔王大人做很多H的事情呢${heart(1)}」`,
          );
          await era.printAndWait(
            `「${sc()}被魔王大人调教…变成了怎样一个淫乱的女人…请大家好好鉴赏吧${heart(1)}」`,
          );
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (era.get(`talent:${target}:85`) === 1) {
          era.print(`${target_name}对着水晶球进行了自我介绍`);
          await era.printAndWait(`「嗨，嗨~」`);
          await era.printAndWait(`「故乡的大家、又看到吗？」`);
          await era.printAndWait(
            `「在这里的这位大人…就是众所皆知的…魔王大人…来的${heart(1)}」`,
          );
          await era.printAndWait(
            `「今天…作为${sc()}的…恋人来…证明我们到底有多么地相亲相爱…请大家好好地见证吧~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被${master_name}抱住后、就不停地向${master_name}的脸颊亲吻了起来………`,
          );
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) || era.get(`abl:${target}:11`) >= 5)
        ) {
          era.print(`${target_name}对着水晶球说起了淫猥的话语`);
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`abl:${target}:10`) >= 3 ||
          era.get(`abl:${target}:11`) >= 4 ||
          era.get(`abl:${target}:17`) >= 2
        ) {
          era.print(`${target_name}对着水晶球开始了自我介绍`);
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else {
          await era.printAndWait(`${target_name}岔开了视线什么都没说。`);
        }
      } else {
        if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:85`) ||
            era.get(`abl:${target}:10`) >= 5) &&
          game.event.插着不拔
        ) {
          // 同一行输出：PRINTFORM 不换行、
          // PRINTFORML 收行（前缀与支文本本来就在同一条语句里，只是基准漏了
          // ——#623 按各支的末行各记各的，其余支仍是各自的行）
          era.print(
            `${player_name}向其搭话后，${target_name}摇晃着腰说起了恋慕的话语`,
          );
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) ||
            era.get(`abl:${target}:11`) >= 5) &&
          game.event.插着不拔
        ) {
          era.print(
            player_name + `向其搭话后，${target_name}摇晃着腰说起了淫猥的话语`,
          );
        } else if (
          (era.get(`palam:${target}:4`) >= PALAMLV[4] ||
            era.get(`abl:${target}:10`) >= 5 ||
            era.get(`talent:${target}:85`) ||
            era.get(`talent:${target}:76`)) &&
          era.get(`palam:${target}:5`) >= PALAMLV[4]
        ) {
          // 同一行输出：中段 IF/ELSEIF 二选一（
          // 都不中时那一截就是空的，末行 PRINTFORML 收行（#600）
          const excited =
            era.get(`tequip:${target}:11`) ||
            era.get(`tequip:${target}:13`) ||
            era.get(`tequip:${target}:14`) ||
            era.get(`tequip:${target}:15`) ||
            era.get(`tequip:${target}:16`) ||
            era.get(`tequip:${target}:17`);
          const painful =
            era.get(`tequip:${target}:44`) || era.get(`tequip:${target}:49`);
          era.print(
            player_name +
              `向其搭话后，${target_name}发出了` +
              (excited ? '欢喜的' : painful ? '苦痛的' : '') +
              `叫声，拼命地向你回话了。`,
          );
        } else if (era.get(`talent:${target}:76`) === 1) {
          era.print(
            player_name +
              `向其搭话后，${target_name}有点害羞地向你撒娇地一样靠近过来了。`,
          );
          await era.printAndWait(
            `「主人…请随意地对${sc()}任何事情吧………${heart(1)}」`,
          );
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[4] ||
          era.get(`talent:${target}:85`) ||
          era.get(`abl:${target}:10`) >= 5
        ) {
          era.print(
            player_name + `向其搭话后，${target_name}融洽地向你回话了。`,
          );
          await era.printAndWait(
            `「请对${sc()}下任何的命令吧~………${heart(1)}」`,
          );
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[2] ||
          era.get(`abl:${target}:10`) >= 3
        ) {
          era.print(
            player_name +
              `向其搭话后，${target_name}就担惊受怕地样子向你回话了`,
          );
          await era.printAndWait(`「啊、是、是的…」`);
        } else {
          era.print(
            player_name + `向其搭话后，${target_name}好像根本没有听到一样………`,
          );
        }
      }
      // CFLAG:357  = 1（变量语义：CFLAG 族，357）
      kojo.交谈 = 1;
      return 0;
    } else {
      if (era.get(`tequip:${target}:53`) === 1) {
        era.print(`${master_name}催促着${target_name}快点开始介绍。`);
        if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:85`) ||
            era.get(`abl:${target}:10`) >= 5) &&
          game.event.插着不拔
        ) {
          era.print(`${target_name}晃动着腰部开始说起了恋慕的话语。`);
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) ||
            era.get(`abl:${target}:11`) >= 5) &&
          game.event.插着不拔
        ) {
          era.print(`${target_name}晃动着腰部说起了淫猥的话语。`);
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (
          rand_n(3) === 0 &&
          (era.get(`talent:${target}:89`) || era.get(`abl:${target}:17`) >= 5)
        ) {
          // 与上一段同型（#600）
          const masturbation = (era.get(`abl:${target}:31`) || 0) >= 3;
          era.print(
            `${target_name}将自己的本名、接下来要进行的性体验` +
              (masturbation ? '还有手淫时妄想的内容' : '') +
              `之类的兴高采烈地说个不停……`,
          );
          era.print(
            `${target_name}只是因为想象到水晶球在故乡传播开的样子股间就湿润了……`,
          );
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (era.get(`talent:${target}:76`) === 1) {
          era.print(`${target_name}对着水晶球说起了淫猥的话语。`);
          await era.printAndWait(`「嗨，嗨~各位」`);
          await era.printAndWait(`「故乡的大家、有看到吗~？」`);
          await era.printAndWait(
            `「接下来…要和在这里的魔王大人做很多H的事情呢${heart(1)}」`,
          );
          await era.printAndWait(
            `「${sc()}被魔王大人调教…变成了怎样一个淫乱的女人…请大家好好鉴赏吧${heart(1)}」`,
          );
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (era.get(`talent:${target}:85`) === 1) {
          era.print(`${target_name}对着水晶球开始了自我介绍`);
          await era.printAndWait(`「嗨，嗨~」`);
          await era.printAndWait(`「故乡的大家、有看到吗~？」`);
          await era.printAndWait(
            `「在这里的这位大人…就是众所皆知的…魔王大人…来的${heart(1)}」`,
          );
          await era.printAndWait(
            `「今天…作为${sc()}的…恋人来…证明我们到底有多么地相亲相爱…请大家好好地见证吧~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被${master_name}抱住后、就不停地向${master_name}的脸颊亲吻了起来………`,
          );
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) || era.get(`abl:${target}:11`) >= 5)
        ) {
          era.print(`${target_name}对着水晶球说起了淫猥的话语`);
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`abl:${target}:10`) >= 3 ||
          era.get(`abl:${target}:11`) >= 4 ||
          era.get(`abl:${target}:17`) >= 2
        ) {
          era.print(`${target_name}对着水晶球开始了自我介绍`);
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else {
          await era.printAndWait(`${target_name}岔开了视线什么都没说。`);
        }
      } else {
        if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:85`) ||
            era.get(`abl:${target}:10`) >= 5) &&
          game.event.插着不拔
        ) {
          // 与上一段同型（二回目，基准漏了一段，#623）
          era.print(
            `${player_name}向其搭话后，${target_name}摇晃着腰说起了恋慕的话语`,
          );
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) ||
            era.get(`abl:${target}:11`) >= 5) &&
          game.event.插着不拔
        ) {
          era.print(
            player_name + `向其搭话后，${target_name}摇晃着腰说起了淫猥的话语`,
          );
        } else if (
          (era.get(`palam:${target}:4`) >= PALAMLV[4] ||
            era.get(`abl:${target}:10`) >= 5 ||
            era.get(`talent:${target}:85`) ||
            era.get(`talent:${target}:76`)) &&
          era.get(`palam:${target}:5`) >= PALAMLV[4]
        ) {
          // 与 :5032..:5038 同型（#600）
          const excited =
            era.get(`tequip:${target}:11`) ||
            era.get(`tequip:${target}:13`) ||
            era.get(`tequip:${target}:14`) ||
            era.get(`tequip:${target}:15`) ||
            era.get(`tequip:${target}:16`) ||
            era.get(`tequip:${target}:17`);
          const painful =
            era.get(`tequip:${target}:44`) || era.get(`tequip:${target}:49`);
          era.print(
            player_name +
              `向其搭话后，${target_name}发出了` +
              (excited ? '欢喜的' : painful ? '苦痛的' : '') +
              `叫声，拼命地向你回话了。`,
          );
        } else if (era.get(`talent:${target}:76`) === 1) {
          era.print(
            player_name +
              `向其搭话后，${target_name}有点害羞地向你撒娇地一样靠近过来了。`,
          );
          await era.printAndWait(
            `「主人…请随意地对${sc()}任何事情吧………${heart(1)}」`,
          );
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[4] ||
          era.get(`talent:${target}:85`) ||
          era.get(`abl:${target}:10`) >= 5
        ) {
          era.print(
            player_name + `向其搭话后，${target_name}融洽地向你回话了。`,
          );
          await era.printAndWait(
            `「请对${sc()}下任何的命令吧~………${heart(1)}」`,
          );
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[2] ||
          era.get(`abl:${target}:10`) >= 3
        ) {
          era.print(
            player_name +
              `向其搭话后，${target_name}就担惊受怕地样子向你回话了`,
          );
          await era.printAndWait(`「啊、是、是的…」`);
        } else {
          era.print(
            player_name + `向其搭话后，${target_name}好像根本没有听到一样………`,
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
          `${target_name}用胸部将${player_name}的阴茎夹住、吮吸起了在胸部峰峦之间露出来的龟头。`,
        );
        await era.printAndWait(
          `「嗯哈恩~…只用一根大鸡巴就能侵犯${sc()}的胸部还有嘴巴什么的…真是太棒了…嗯~嗯哼唔~…就呜呜~${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `${target_name}用胸部将${player_name}的阴茎夹住、温柔地亲吻胸部峰峦之间露出来的龟头。`,
        );
        await era.printAndWait(
          `「啊哈啊嗯~${heart(1)} ${target_name}好~好~地…亲吻${player_name}大人的大鸡巴的~${heart(1)}」`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `${target_name}用胸部将${player_name}的阴茎夹住、舔着胸部峰峦之间露出来的龟头。`,
        );
        await era.printAndWait(
          `「嗯呼呜~…${heart(1)} 请让${target_name}来侍奉大鸡巴吧~${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `${target_name}用胸部将${player_name}的阴茎夹住、用嘴巴含住了胸部峰峦之间露出来的龟头。`,
        );
        await era.printAndWait(`「啊啊~…这样…不知羞耻的…啾~…啾~…嗯呜嗯~………」`);
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
          `${target_name}用胸部将${player_name}的阴茎夹住、吮吸起了在胸部峰峦之间露出来的龟头。`,
        );
        await era.printAndWait(
          `「嗯哈恩~…只用一根大鸡巴就能侵犯${sc()}的胸部还有嘴巴什么的…真是太棒了…嗯~嗯哼唔~…就呜呜~${heart(1)}」`,
        );
        // CFLAG:360  = 5（变量语义：CFLAG 族，360）
        kojo.乳夹口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.乳夹口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}用胸部将${player_name}的阴茎夹住、温柔地亲吻胸部峰峦之间露出来的龟头。`,
        );
        await era.printAndWait(
          `「啊哈啊嗯~${heart(1)} ${target_name}好~好~地…亲吻${player_name}大人的大鸡巴的~${heart(1)}」`,
        );
        // CFLAG:360  = 4（变量语义：CFLAG 族，360）
        kojo.乳夹口交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.乳夹口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `${target_name}用胸部将${player_name}的阴茎夹住、从胸部之间伸出来的阴茎前端陶醉地舔着。`,
          );
        } else {
          await era.printAndWait(
            `${target_name}用胸部将${player_name}的阴茎包裹住、用舌尖舔着埋藏在胸部里的阴茎。`,
          );
        }
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「嗯呼呜~…${heart(1)} 非常感谢让${sc()}来侍奉大鸡巴啊~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「真是没办法呢~${heart(1)} …${sc()}的胸部就那么地舒服吗~？」`,
          );
        }
        // CFLAG:360  = 3（变量语义：CFLAG 族，360）
        kojo.乳夹口交 = 3;
      } else if (kojo.乳夹口交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `${target_name}用胸部将${player_name}的阴茎夹住、用嘴巴含住了胸部峰峦之间露出来的龟头。`,
        );
        await era.printAndWait(`「啊啊~…这样…不知羞耻的…啾~…啾~…嗯呜嗯~………」`);
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
          `${target_name}用一只手伸向了自己的蜜穴、还直接将阴茎含入口中，就这样吮吸着开始了自慰。`,
        );
        await era.printAndWait(
          `「哈啊${heart(1)} 嗯呜~…啾呼呜~${heart(1)} 啊啊~…大鸡巴…好吃${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `${target_name}就如同命令的那样将一只手伸向自己的蜜穴、一边自慰着一边将阴茎含入了口中。`,
        );
        await era.printAndWait(
          `「嗯哈啊${heart(1)}…一边吸着一边自慰什么的…真是下流呢~…${heart(3)}」`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `${target_name}如同命令的那样一边口交一边自慰起来了。`,
        );
        await era.printAndWait(
          `「嗯唔嗯~~…嗯啾~…啾呜~…啊~…哈啊…哈啊…${target_name}明，明白了…${target_name}会好好地…一边口交…一边自慰的…」`,
        );
      } else {
        await era.printAndWait(
          `${target_name}如同命令的那样一边口交一边自慰起来了。`,
        );
        await era.printAndWait(
          `「嗯唔嗯~~…嗯啾~…啾呜~…啊~…哈啊…哈啊…${target_name}明，明白了…${target_name}会好好地…一边口交…一边自慰的…」`,
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
          `${target_name}用一只手伸向了自己的蜜穴、还直接将阴茎含入口中，就这样吮吸着开始了自慰。`,
        );
        await era.printAndWait(
          `「哈啊${heart(1)} 嗯呜~…啾呼呜~${heart(1)} 啊啊~…大鸡巴…好吃${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}好像很兴奋地一样流着口水、如同为了弄出声音一样爱抚着自己的蜜穴………`,
        );
        // CFLAG:361  = 5（变量语义：CFLAG 族，361）
        kojo.口交时自慰 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.口交时自慰 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}就如同命令的那样将一只手伸向自己的蜜穴、一边自慰着一边将阴茎含入了口中。`,
        );
        await era.printAndWait(
          `「嗯哈啊${heart(1)}…一边吸着一边自慰什么的…真是下流呢~…${heart(3)}」`,
        );
        await era.printAndWait(
          `「但是、${sc()}…为了${player_name}大人的话…不管怎样H而下流的事情都会做的…嗯啊啊~…哈呜~${heart(1)}」`,
        );
        // CFLAG:361  = 4（变量语义：CFLAG 族，361）
        kojo.口交时自慰 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.口交时自慰 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}如同命令的那样一边口交一边自慰起来了。`,
        );
        await era.printAndWait(
          `「嗯唔嗯~~…嗯啾~…啾呜~…啊~…哈啊…哈啊…${target_name}明，明白了…${target_name}会好好地…一边口交…一边自慰的…」`,
        );
        // CFLAG:361  = 3（变量语义：CFLAG 族，361）
        kojo.口交时自慰 = 3;
      } else if (kojo.口交时自慰 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `${target_name}如同命令的那样一边口交一边自慰起来了。`,
        );
        await era.printAndWait(
          `「嗯唔嗯~~…嗯啾~…啾呜~…啊~…哈啊…哈啊…${target_name}明，明白了…${target_name}会好好地…一边口交…一边自慰的…」`,
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
          `${target_name}淫乱的笑着将阴茎握入手中、轻轻地套弄后将龟头含撸了口中。`,
        );
        await era.printAndWait(
          `「嗯~嗯呜~${heart(1)}啾~…啾呜~…呸咯~${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `${target_name}用湿润的眼睛盯着${player_name}看、将龟头含入口中后，用双手套弄起了阴茎。`,
        );
        await era.printAndWait(
          `「嗯~嗯呜~${heart(1)}啾~…啾呜~…呸咯~${heart(1)}」`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `${target_name}将龟头含入了口中、用双手套弄起了阴茎。`,
        );
        await era.printAndWait(
          `「嗯啾~…啾~呸咯~…嗯哼唔~…啊啊~…大鸡巴好烫啊…♪」`,
        );
      } else {
        await era.printAndWait(
          `${target_name}将龟头含入了口中、用双手套弄起了阴茎。`,
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
          `${target_name}淫乱的笑着将阴茎握入手中、轻轻地套弄后将龟头含撸了口中。`,
        );
        await era.printAndWait(
          `「嗯~嗯呜~${heart(1)}啾~…啾呜~…呸咯~${heart(1)}」`,
        );
        await era.printAndWait(
          `「怎么样呀~？大鸡巴被套弄着…是不是很舒服呀~？${sc()}…手还有嘴巴都变得好烫了…感觉整个人都要不行了~~${heart(3)}」`,
        );
        // CFLAG:362  = 5（变量语义：CFLAG 族，362）
        kojo.手搓口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.手搓口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}用湿润的眼睛盯着${player_name}看、将龟头含入口中后，用双手套弄起了阴茎。`,
        );
        await era.printAndWait(
          `「嗯~嗯呜~${heart(1)}啾~…啾呜~…呸咯~${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊啊~${heart(1)} ${target_name}会更加地…更加地侍奉大鸡巴的~${heart(1)}」`,
        );
        // CFLAG:362  = 4（变量语义：CFLAG 族，362）
        kojo.手搓口交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手搓口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}将龟头含入了口中、用双手套弄起了阴茎。`,
        );
        await era.printAndWait(
          `「嗯啾~…啾~呸咯~…嗯呜嗯~…啊啊~…啊啊~…大鸡巴好烫啊~…♪」`,
        );
        // CFLAG:362  = 3（变量语义：CFLAG 族，362）
        kojo.手搓口交 = 3;
      } else if (kojo.手搓口交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `${target_name}将龟头含入了口中、用双手套弄起了阴茎。`,
        );
        await era.printAndWait(
          `「嗯啾~…啾~呸咯~…嗯呜嗯~…啊啊~……这样的…嗯~……啾呜~…」`,
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
          `${target_name}将阴茎塞到了喉咙深处、一边弄出下流的声音一边吮吸着。`,
        );
        await era.printAndWait(
          `「啾唔嗯~~~${heart(1)}…恩呼嗯~…啾呜~${heart(1)}…啾呜嗯~呜呜~~${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `${target_name}将阴茎塞到了喉咙深处、一边弄出下流的声音一边吮吸着。`,
        );
        await era.printAndWait(
          `「啾唔嗯~~~${heart(1)}…恩呼嗯~…啾呜~${heart(1)}…啾呜嗯~呜呜~~${heart(1)}」`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `${target_name}将阴茎勉强地塞到了喉咙深处、一边弄出下流的声音一边吮吸着。`,
        );
        await era.printAndWait(
          `「嗯啾呜~…呜嗯~…啾噜嗯~啾唔哼~…嗯啾呜呜呜~！」`,
        );
      } else {
        await era.printAndWait(
          `${target_name}将阴茎勉强地塞到了喉咙深处、一边弄出下流的声音一边吮吸着。`,
        );
        await era.printAndWait(
          `「嗯啾呜~…呜嗯~…啾噜嗯~啾唔哼~…嗯啾呜呜呜~！」`,
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
          `${target_name}将阴茎塞到了喉咙深处、一边弄出下流的声音一边吮吸着。`,
        );
        await era.printAndWait(
          `「啾唔嗯~~~${heart(1)}…恩呼嗯~…啾呜~${heart(1)}…啾呜嗯~呜呜~~${heart(1)}」`,
        );
        await era.printAndWait(
          `「嗯唔呜嗯~${heart(1)} 啾呜~…啾噜呜嗯~~…${heart(1)} 精液~…${target_name}会全部吸出来的~${heart(1)}」`,
        );
        // CFLAG:363  = 5（变量语义：CFLAG 族，363）
        kojo.真空口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.真空口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}将阴茎塞到了喉咙深处、一边弄出下流的声音一边吮吸着。`,
        );
        await era.printAndWait(
          `「啾呜嗯~${heart(1)} 啾嗯啾呜~~${heart(1)} 唔呜嗯~${heart(1)} 啾啾~…啾呜呜呜~${heart(1)}」`,
        );
        await era.printAndWait(
          `「嗯哈啊~${heart(1)} 精液~…${target_name}会全部吸出来的~${heart(1)}」`,
        );
        // CFLAG:363  = 4（变量语义：CFLAG 族，363）
        kojo.真空口交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.真空口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}将阴茎勉强地塞到了喉咙深处、一边弄出下流的声音一边吮吸着。`,
        );
        await era.printAndWait(
          `「嗯啾呜~…呜嗯~…啾噜嗯~啾唔哼~…嗯啾呜呜呜~！」`,
        );
        await era.printAndWait(
          `「嗯哈啊~…精液~…会全部吸出来的~…唔哼哼~${heart(1)}」`,
        );
        // CFLAG:363  = 3（变量语义：CFLAG 族，363）
        kojo.真空口交 = 3;
      } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `${target_name}将阴茎勉强地塞到了喉咙深处、一边弄出下流的声音一边吮吸着。`,
        );
        await era.printAndWait(
          `「嗯啾呜~…呜嗯~…啾噜嗯~啾唔哼~…嗯啾呜呜呜~！」`,
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
        await era.printAndWait(
          `${target_name}和${player_name}互相贪婪地用嘴巴舔着对方的股间。${target_name}每当蜜穴传来一阵刺激后就会紧紧地吸着阴茎。`,
        );
        await era.printAndWait(
          `「嗯啊啊嗯~${heart(1)} 做恶作剧…可是不行的噢~${heart(1)} 让${target_name}更加吮吸大鸡巴吧~${heart(3)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `${target_name}和${player_name}互相贪婪地用嘴巴舔着对方的股间。${target_name}一边忍耐着蜜穴带来的快感一边吮吸着阴茎。`,
        );
        await era.printAndWait(
          `「嗯哈啊…恶作剧…可是不行的啊…因为不能侍奉大鸡巴了~…${heart(1)}」`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `${target_name}和${player_name}互相贪婪地用嘴巴舔着对方的股间。${target_name}因为蜜穴带来的快感而娇喘连连。`,
        );
        await era.printAndWait(
          `「嗯哈呜嗯~…不、不行的啊…这、这样就不能侍奉大鸡巴了呀~…哈嗯呀呜~~${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `${target_name}和${player_name}互相贪婪地用嘴巴舔着对方的股间。${target_name}摇晃屁股来忍耐着蜜穴带来的快感。`,
        );
        await era.printAndWait(
          `「嗯…要、要不行了啊…请原谅${target_name}吧………」`,
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
          `${target_name}和${player_name}互相贪婪地用嘴巴舔着对方的股间。${target_name}每当蜜穴传来一阵刺激后就会紧紧地吸着阴茎`,
        );
        await era.printAndWait(
          `「嗯啊啊啊~${heart(1)} 恶作剧…可是不行的噢~${heart(1)} 让${target_name}更加吮吸大鸡巴吧~${heart(3)}`,
        );
        await era.printAndWait(
          `「嗯哼嗯~${heart(1)} 啾噜啾噜${heart(1)}啾噜~…呸咯~…嗯呜嗯~嗯~嗯嗯嗯~${heart(1)}」`,
        );
        // CFLAG:364  = 5（变量语义：CFLAG 族，364）
        kojo.六九式 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.六九式 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}和${player_name}互相贪婪地用嘴巴舔着对方的股间。${target_name}一边忍耐着蜜穴带来的快感一边吮吸着阴茎。`,
        );
        await era.printAndWait(
          `「嗯哈啊…恶作剧…可是不行的啊…因为不能侍奉大鸡巴了~…${heart(1)}」`,
        );
        await era.printAndWait(
          `「真是…真是坏呢~${heart(1)}…啾噜噜${heart(1)} 啾呜~…呸咯~${heart(3)}」`,
        );
        // CFLAG:364  = 4（变量语义：CFLAG 族，364）
        kojo.六九式 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.六九式 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}和${player_name}互相贪婪地用嘴巴舔着对方的股间。${target_name}因为蜜穴带来的快感而娇喘连连。`,
        );
        await era.printAndWait(
          `「嗯哈呜嗯~…不、不行的啊…这、这样就不能侍奉大鸡巴了呀~…哈嗯呀呜~~${heart(1)}」`,
        );
        // CFLAG:364  = 3（变量语义：CFLAG 族，364）
        kojo.六九式 = 3;
      } else if (kojo.六九式 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `${target_name}和${player_name}互相贪婪地用嘴巴舔着对方的股间。${target_name}摇晃屁股来忍耐着蜜穴带来的快感。`,
        );
        await era.printAndWait(
          `「嗯…要、要不行了啊…请原谅${target_name}吧………」`,
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
          `${target_name}将阴茎塞进了喉咙深处、用嘴唇吮吸着根部。`,
        );
        await era.printAndWait(
          `「嗯呜嗯~${heart(1)}…恩呼嗯~…嗯~嗯嗯嗯~${heart(1)}…呜哈啊啊~${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `${target_name}将阴茎塞进了喉咙深处、用嘴唇吮吸着根部。`,
        );
        await era.printAndWait(
          `「嗯呜嗯~${heart(1)} 嗯啾噜嗯~${heart(1)} 唔呜啊嘛~${heart(1)} 啾呜~~~…啾噜呜呜呜呜~~~~${heart(1)}」`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `${target_name}想尽办法将阴茎勉强塞进了喉咙深处、喘不过气地开始了口腔侍奉。`,
        );
        await era.printAndWait(
          `「嗯呜~！？嗯~…嗯噗~…嗯嗯~…嗯呜嗯~…嗯~嗯~嗯呜呜呜呜呜！！」`,
        );
      } else {
        await era.printAndWait(
          `${target_name}想尽办法将阴茎勉强塞进了喉咙深处、喘不过气地开始了口腔侍奉。`,
        );
        await era.printAndWait(
          `「嗯呜~！？嗯~…嗯噗~…嗯嗯~…嗯呜呃~……嗯~嗯~嗯嗯嗯嗯嗯~～～！？」`,
        );
      }
      // CFLAG:TARGET:365  = 1（变量语义：CFLAG 族，TARGET:365）
      kojo.深喉 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.真空口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}将阴茎塞进了喉咙深处、用嘴唇吮吸着根部。`,
        );
        await era.printAndWait(
          `「嗯呜嗯~${heart(1)}…恩呼嗯~…嗯~嗯嗯嗯~${heart(1)}…呜哈啊啊~${heart(1)}」`,
        );
        await era.printAndWait(
          `「${sc()}的嘴巴是…大鸡巴专用通道来的${heart(1)} 嗯呜嗯哈啊~…嗯~嗯~嗯嗯~~～${heart(1)}」`,
        );
        // CFLAG:365  = 5（变量语义：CFLAG 族，365）
        kojo.深喉 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.真空口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}将阴茎塞进了喉咙深处、用嘴唇吮吸着根部。`,
        );
        await era.printAndWait(
          `「嗯呜嗯~${heart(1)} 嗯啾噜嗯~${heart(1)} 唔呜啊嘛~${heart(1)} 啾呜~~~…啾噜呜呜呜呜~~~~${heart(1)}」`,
        );
        await era.printAndWait(
          `「嗯哈啊~${heart(1)} 不行的啊~…因为大鸡巴的味道…脑袋…要变得奇怪起来了…${heart(1)}」`,
        );
        // CFLAG:365  = 4（变量语义：CFLAG 族，365）
        kojo.深喉 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.真空口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}想尽办法将阴茎勉强塞进了喉咙深处、喘不过气地开始了口腔侍奉。`,
        );
        await era.printAndWait(
          `「嗯呜~！？嗯~…嗯噗~…嗯嗯~…嗯呜呃~…嗯~！嗯~！嗯呜呜呜呜~~！」`,
        );
        await era.printAndWait(
          `「嗯哈啊~…不由自主地塞到了喉咙深处去了呢…呜呼呼~、更多地帮您做吧~${heart(1)}」`,
        );
        // CFLAG:365  = 3（变量语义：CFLAG 族，365）
        kojo.深喉 = 3;
      } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `${target_name}想尽办法将阴茎勉强塞进了喉咙深处、喘不过气地开始了口腔侍奉。`,
        );
        await era.printAndWait(
          `「嗯呜~！？嗯~…嗯噗~…嗯嗯~…嗯呜呃~…嗯~嗯~嗯嗯嗯嗯嗯~～～～～！？」`,
        );
        // CFLAG:365  = 2（变量语义：CFLAG 族，365）
        kojo.深喉 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 80) {
    if (kojo.强制口交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「嗯哼呜~${heart(1)} 嗯呜~${heart(1)} 嗯呼~…嗯呜呜~~~~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}忍耐着喉咙被激烈抽插的感觉、用灵巧的舌头侍奉着………`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「嗯呼呜~…嗯哼~…呜噗嗯~~…嗯噗呜~…嗯~嗯~嗯~~嗯嗯嗯~~～！」`,
        );
        await era.printAndWait(`${target_name}的嘴巴就被这样侵犯着………`);
      } else {
        await era.printAndWait(`「嗯~…嗯噗~…噗哈呜~…原、原谅我…嗯呜噗~！？」`);
        await era.printAndWait(
          `${target_name}因为喉咙的深处被抽插着流下眼泪………`,
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
          `「嗯呼~${heart(1)} 恩噗呜~${heart(1)} 嗯嗯呜~…恩噗呜嗯嗯~~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}忍耐着喉咙被激烈抽插的感觉、用灵巧的舌头侍奉着。`,
        );
        await era.printAndWait(
          `「噗啊~~${heart(1)}…非常感谢主人…噗嗯啊~…使用这个主人专用的嘴巴小穴~${heart(1)}」`,
        );
        // CFLAG:381  = 5（变量语义：CFLAG 族，381）
        kojo.强制口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.强制口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯哼唔~…嗯呜~…嗯噗嗯~…恩噗呜嗯~…嗯~嗯~嗯~嗯嗯嗯~～！」`,
        );
        await era.printAndWait(
          `${target_name}喉咙深处被抽插着、就这样被侵犯着嘴巴。`,
        );
        await era.printAndWait(
          `「啊哈啊~${heart(1)} ${sc()}的嘴巴~…已经变成小穴了…嘴巴小穴~…${heart(1)}」`,
        );
        // CFLAG:381  = 4（变量语义：CFLAG 族，381）
        kojo.强制口交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.强制口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯哼唔~…嗯呜~…噗嗯哈啊~…嗯噗呜啊~…嗯~嗯~嗯~嗯嗯嗯~～！」`,
        );
        await era.printAndWait(
          `${target_name}喉咙深处被抽插着、就这样被侵犯着嘴巴。`,
        );
        await era.printAndWait(
          `「啊嗯~啊嗯啊~…没，没关系的~…请更多地使用${target_name}的嘴巴吧♪」`,
        );
        // CFLAG:381  = 3（变量语义：CFLAG 族，381）
        kojo.强制口交 = 3;
      } else if (kojo.强制口交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「嗯~…嗯呜~…噗呜啊…喉咙…喉咙好辛苦啊…原、原谅…嗯呜~…嗯~！呜呼呜呜呜~！」`,
        );
        await era.printAndWait(
          `${target_name}因为喉咙的深处被抽插着流下眼泪………`,
        );
        // CFLAG:381  = 2（变量语义：CFLAG 族，381）
        kojo.强制口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 87) {
    // 延迟读取：主启动图的 COM80-90 注册仍仅由 com-hardcore 自己负责。顶层
    // require 会让 main-loop 漏装时模块仍被间接拉进来，#274/#282 接入锁与
    // M1249 一起失明（#233 全量变异抓到，这张工单重犯一次）
    const { piercing_state } = require('#/system/train/com-hardcore');
    p = piercing_state.p;

    if (kojo.穿环 === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        era.print('');
      } else if (era.get(`talent:${target}:76`) === 1) {
        if (chara(target).train.穿环状态 & p) {
          await era.printAndWait(
            `${target_name}因为第一次在皮肤上开洞而发出了悲鸣。`,
          );

          if (p === 1) {
            await era.printAndWait(
              `「啊啊…好漂亮的乳环啊~…乳头已经勃起地那么厉害了…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}轻轻地摇动着胸部。乳环微微地闪着微光………`,
            );
          } else if (p === 2) {
            await era.printAndWait(
              `「哈啊…啊啊…真是好棒的礼物呢…好高兴啊~………♪」`,
            );
            await era.printAndWait(`${target_name}抚摸着肚脐的周围………`);
          } else if (p === 4) {
            await era.printAndWait(
              `「啊~…嗯~…这样做的话，不管什么时候都是都会有感觉了…真是困扰呢~~…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}因为阴唇环的刺穿而发情起来了………`,
            );
          } else if (p === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「啊哈~…啊啊啊~…被做了那么棒的事情后…要忍不住了啊~~${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}因为阴茎被打环后、露出了恍惚的表情………`,
              );
            } else {
              await era.printAndWait(
                `「啊啊~…${sc()}已经…只能想到…SEX的事情而已了啊~~~${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}的阴蒂被打孔后、露出了恍惚的表情………`,
              );
            }
          } else if (p === 16) {
            await era.printAndWait(
              `「嗯呜~…${sc()}会用这条变漂亮的舌头更多地侍奉魔王大人的~…${heart(1)}」`,
            );
            await era.printAndWait(
              `${sc()}就像炫耀着舌尖的舌环一样下流地舔着自己的嘴唇`,
            );
          } else if (p === 32) {
            await era.printAndWait(`「嗯哼嗯~…适不适合呀~~~？」`);
            await era.printAndWait(
              `${target_name}舔着自己的唇确认唇环的存在………`,
            );
          } else if (p === 64) {
            await era.printAndWait(`「嗯哼哼~…真是个漂亮的鼻环呢~~♪」`);
            await era.printAndWait(`${target_name}不停地擦拭着鼻环………`);
          }
        } else {
          await era.printAndWait(`${target_name}抚摸着拿掉环后的痕迹………`);
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        if (chara(target).train.穿环状态 & p) {
          await era.printAndWait(
            `${target_name}因为第一次在皮肤上开洞而发出了小声的悲鸣。`,
          );

          if (p === 1) {
            await era.printAndWait(
              `「啊…啊啊…居然将那么棒的东西送给${sc()}乳头…啊…啊啊…太有感觉了啊~♪」`,
            );
            await era.printAndWait(
              `${target_name}两个乳头都勃起来了、结果让乳环一闪一闪的地发着光………`,
            );
          } else if (p === 2) {
            await era.printAndWait(
              `「大人您给予得礼物…${sc()}会好好对待下来的~…♪」`,
            );
            await era.printAndWait(`${target_name}抚摸着肚脐的周围………`);
          } else if (p === 4) {
            await era.printAndWait(
              `「啊啊…爱液要…漏出来了啊~…太、太有感觉了啊~~…啊啊…啊~${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}被打上了为了延长阴唇般的阴唇环、爱液流地整个大腿都是了………`,
            );
          } else if (p === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「哈啊…哈啊…小鸡鸡…变得好奇怪了…${sc()}的小鸡鸡…啊、啊啊啊~～${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}因为阴茎被打上了环、脸颊变得通红起来………`,
              );
            } else {
              await era.printAndWait(
                `「不，不行的啊~~~…被做这样的事情的话${sc()}…已经…变得淫乱起来了啊…${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}因为阴蒂被打上了环、脸颊变得通红起来………`,
              );
            }
          } else if (p === 16) {
            await era.printAndWait(
              `「哈啊…哈啊…好像已经固定好了呢…啊…啊啊~…♪」`,
            );
            await era.printAndWait(
              `${player_name}抓住了${target_name}的舌头、检查着舌环的状况………`,
            );
          } else if (p === 32) {
            await era.printAndWait(
              `「呐~…${target_name}担心有没有好好地固定住呢…所以请用kiss来测试一下吧…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}舔了一下唇环确定了后、向${player_name}撒起了娇………`,
            );
          } else if (p === 64) {
            await era.printAndWait(
              `「………因为是主人给予的礼物来的…${target_name}会好好珍惜的………」`,
            );
            await era.printAndWait(`${target_name}擦拭着鼻环………`);
          }
        } else {
          await era.printAndWait(
            `${target_name}貌似有点伤心地抚摸着被拿掉环后的痕迹………`,
          );
        }
      } else {
        if (chara(target).train.穿环状态 & p) {
          await era.printAndWait(
            `${target_name}因为第一次皮肤上开洞而发出了悲鸣、留下了眼泪。`,
          );

          if (p === 1) {
            await era.printAndWait(
              `「不要…不要啊…不要…对乳头做那么过分的事情…呜~呜呜~………」`,
            );
            await era.printAndWait(
              `${target_name}因为乳环带来的强烈疼痛而留下了眼泪………`,
            );
          } else if (p === 2) {
            await era.printAndWait(
              `「居，居然在这种地方穿环什么的…真、真是羞耻啊………」`,
            );
            await era.printAndWait(
              `${target_name}因为肚脐穿环带来的疼痛让眼睛被泪水给模糊了………`,
            );
          } else if (p === 4) {
            await era.printAndWait(
              `「拿掉…请拿下来吧…这种地方被穿环了的话…啊啊~…嗯~…呜啊~」`,
            );
            await era.printAndWait(
              `${target_name}因为阴唇穿上了环而哗啦啦地流下了眼泪………`,
            );
          } else if (p === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(`「已，已经…嫁不出去了啊………」`);
              await era.printAndWait(
                `${target_name}的阴茎被穿上孔、阴茎环正闪烁着沉闷的光………`,
              );
            } else {
              await era.printAndWait(
                `「拜，拜托了…什么都会做的…请将…环拿掉吧…${scf()}、${sc()}…要变奇怪了啊…啊啊~！」`,
              );
              await era.printAndWait(
                `${target_name}的阴蒂被穿上了孔、阴蒂环正闪烁着沉闷的光………`,
              );
            }
          } else if (p === 16) {
            await era.printAndWait(`「不要…呸呜咯…请呼要拉胡来呜~………」`);
            await era.printAndWait(
              `${player_name}将${target_name}的舌头抓住、确定着舌环………`,
            );
          } else if (p === 32) {
            await era.printAndWait(
              `「呜呜~…居然${sc()}的嘴唇上打上了这种东西………」`,
            );
            await era.printAndWait(
              `${target_name}的水灵灵的嘴唇被打上了环、唇环正发着沉闷的光………`,
            );
          } else if (p === 64) {
            await era.printAndWait(
              `「居然对${sc()}…对${sc()}做出屈辱的事情………呜呜呜~~」`,
            );
            await era.printAndWait(
              `${target_name}的鼻子打上了跟牛的环一样的鼻环、眼泪哗啦啦地流下来了………`,
            );
          }
        } else {
          await era.printAndWait(`${target_name}擦拭着拿掉环后的痕迹………`);
        }
      }
      // CFLAG:TARGET:348  = 1（变量语义：CFLAG 族，TARGET:348）
      kojo.穿环 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        era.print('');
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.穿环 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (chara(target).train.穿环状态 & p) {
          if (p === 1) {
            await era.printAndWait(
              `「啊啊…好漂亮的乳环啊~…乳头已经勃起地那么厉害了…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}轻轻地摇动着胸部。乳环微微地闪着微光………`,
            );
          } else if (p === 2) {
            await era.printAndWait(
              `「哈啊…啊啊…真是好棒的礼物呢…好高兴啊~………♪」`,
            );
            await era.printAndWait(`${target_name}抚摸着肚脐的周围………`);
          } else if (p === 4) {
            await era.printAndWait(
              `「啊~…嗯~…这样做的话，不管什么时候都是都会有感觉了…真是困扰呢~~…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}因为阴唇环的刺穿而发情起来了………`,
            );
          } else if (p === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「啊哈~…啊啊啊~…被做了那么棒的事情后…要忍不住了啊~~${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}因为阴茎被打环后、露出了恍惚的表情………`,
              );
            } else {
              await era.printAndWait(
                `「啊啊~…${sc()}已经…只能想到…SEX的事情而已了啊~~~${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}的阴蒂被打孔后、露出了恍惚的表情………`,
              );
            }
          } else if (p === 16) {
            await era.printAndWait(
              `「嗯呜~…${sc()}会用这条变漂亮的舌头更多地侍奉魔王大人的~…${heart(1)}」`,
            );
            await era.printAndWait(
              `${sc()}就像炫耀着舌尖的舌环一样下流地舔着自己的嘴唇………`,
            );
          } else if (p === 32) {
            await era.printAndWait(`「嗯哼嗯~…适不适合呀~~~？」`);
            await era.printAndWait(
              `${target_name}舔着自己的唇确认唇环的存在………`,
            );
          } else if (p === 64) {
            await era.printAndWait(`「嗯哼哼~…真是个漂亮的鼻环呢~~♪」`);
            await era.printAndWait(`${target_name}不停地擦拭着鼻环………`);
          }
        } else {
          await era.printAndWait(`${target_name}抚摸着拿掉环后的痕迹………`);
        }
        // CFLAG:348  = 4（变量语义：CFLAG 族，348）
        kojo.穿环 = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.穿环 <= 2 || game.kojo.口上开关 === 2)
      ) {
        if (chara(target).train.穿环状态 & p) {
          if (p === 1) {
            await era.printAndWait(
              `「啊…啊啊…居然将那么棒的东西送给${sc()}乳头…啊…啊啊…太有感觉了啊~♪」`,
            );
            await era.printAndWait(
              `${target_name}两个乳头都勃起来了、结果让乳环一闪一闪的地发着光`,
            );
          } else if (p === 2) {
            await era.printAndWait(
              `「大人您给予得礼物…${sc()}会好好对待下来的~…♪」`,
            );
            await era.printAndWait(`${target_name}抚摸着肚脐的周围………`);
          } else if (p === 4) {
            await era.printAndWait(
              `「啊啊…爱液要…漏出来了啊~…太、太有感觉了啊~~…啊啊…啊~${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}被打上了为了延长阴唇般的阴唇环、爱液流地整个大腿都是了………`,
            );
          } else if (p === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「哈啊…哈啊…小鸡鸡…变得好奇怪了…${sc()}的小鸡鸡…啊、啊啊啊~～${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}因为阴茎被打上了环、脸颊变得通红起来………`,
              );
            } else {
              await era.printAndWait(
                `「不，不行的啊~~~…被做这样的事情的话${sc()}…已经…变得淫乱起来了啊…${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}因为阴蒂被打上了环、脸颊变得通红起来………`,
              );
            }
          } else if (p === 16) {
            await era.printAndWait(
              `「哈啊…哈啊…好像已经固定好了呢…啊…啊啊~…♪」`,
            );
            await era.printAndWait(
              `${player_name}将${target_name}的舌头抓住、确定着舌环………`,
            );
          } else if (p === 32) {
            await era.printAndWait(
              `「呐~…${target_name}担心有没有好好地固定住呢…所以请用kiss来测试一下吧…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}舔了一下唇环确定了后、向${player_name}撒起了娇………`,
            );
          } else if (p === 64) {
            await era.printAndWait(
              `「………因为是主人给予的礼物来的…${target_name}会好好珍惜的………」`,
            );
            await era.printAndWait(`${target_name}擦拭着鼻环………`);
          }
        } else {
          await era.printAndWait(
            `${target_name}貌似有点伤心地抚摸着被拿掉环后的痕迹.………`,
          );
        }
        // CFLAG:348  = 3（变量语义：CFLAG 族，348）
        kojo.穿环 = 3;
      } else if (kojo.穿环 <= 1 || game.kojo.口上开关 === 2) {
        if (chara(target).train.穿环状态 & p) {
          if (p === 1) {
            await era.printAndWait(
              `「不要…不要啊…不要…对乳头做那么过分的事情…呜~呜呜~………」`,
            );
            await era.printAndWait(
              `${target_name}因为乳环带来的强烈疼痛而留下了眼泪………`,
            );
          } else if (p === 2) {
            await era.printAndWait(
              `「居，居然在这种地方穿环什么的…真、真是羞耻啊………」`,
            );
            await era.printAndWait(
              `${target_name}因为肚脐穿环带来的疼痛让眼睛被泪水给模糊了………`,
            );
          } else if (p === 4) {
            await era.printAndWait(
              `「拿掉…请拿下来吧…这种地方被穿环了的话…啊啊~…嗯~…呜啊~」`,
            );
            await era.printAndWait(
              `${target_name}因为阴唇穿上了环而哗啦啦地流下了眼泪………`,
            );
          } else if (p === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(`「已，已经…嫁不出去了啊………」`);
              await era.printAndWait(
                `${target_name}的阴茎被穿上孔、阴茎环正闪烁着沉闷的光………`,
              );
            } else {
              await era.printAndWait(
                `「拜，拜托了…什么都会做的…请将…环拿掉吧…${scf()}、${sc()}…要变奇怪了啊…啊啊~！」`,
              );
              await era.printAndWait(
                `${target_name}的阴蒂被穿上了孔、阴蒂环正闪烁着沉闷的光………`,
              );
            }
          } else if (p === 16) {
            await era.printAndWait(`「不要…呸呜咯…请呼要拉胡来呜~………」`);
            await era.printAndWait(
              `${player_name}将${target_name}的舌头抓住、确定着舌环………`,
            );
          } else if (p === 32) {
            await era.printAndWait(
              `「呜呜~…居然${sc()}的嘴唇上打上了这种东西………」`,
            );
            await era.printAndWait(
              `${target_name}的水灵灵的嘴唇被打上了环、唇环正发着沉闷的光………`,
            );
          } else if (p === 64) {
            await era.printAndWait(
              `「居然对${sc()}…对${sc()}做出屈辱的事情………呜呜呜~~」`,
            );
            await era.printAndWait(
              `${target_name}的鼻子打上了跟牛的环一样的鼻环、眼泪哗啦啦地流下来了………`,
            );
          }
        } else {
          await era.printAndWait(`${target_name}擦拭着拿掉环后的痕迹………`);
        }
        // CFLAG:348  = 2（变量语义：CFLAG 族，348）
        kojo.穿环 = 2;
      }
    }
    return 0;
  }

  return 0;
}

// EVENTTRAIN NORMAL 档：初调教 CFLAG:201 状态机
on(
  'EVENTTRAIN',
  async () => {
    await eventtrain_k3();
  },
  TIER.NORMAL,
);

// EVENTEND NORMAL 档：CFLAG:301 钳回 1 + 调教结束台词
on(
  'EVENTEND',
  async () => {
    await eventend_k3();
  },
  TIER.NORMAL,
);

async function eventtrain_k3(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const player_name = chara_callname(era_flag.player);
  const master_name = chara_name(0);
  const assi = era_flag.assi;
  const assi_name = assi >= 0 ? chara_callname(assi) : '';
  const sc = () => self_call(target);
  const scf = () => self_call_first(target);
  const kojo = chara(target).kojo;

  if (game.kojo.口上开关 <= 0) {
    return 0;
  }
  if (era.get(`talent:${target}:163`) !== 1) {
    return 0;
  }

  if (kojo.初调教 === 0) {
    era.drawLine();

    if (era.get(`talent:${target}:314`) === 1) {
      if (game.event.精灵领域征服完了 >= 1) {
        await era.printAndWait(
          `「就算…就算${sc()}的国家覆灭了也好…也不会向你这种家伙屈服呢………」`,
        );
        await era.printAndWait(
          `${target_name}哪怕知道自己的国家被你占领了也好，也没有崩溃掉，保持着毅然的态度。`,
        );
        await era.printAndWait(
          `「而且…最重要的是${sc()}才不是什么为了成为你的慰安妇的玩具来的…！」`,
        );
        await era.printAndWait(
          `但是，你十分清楚${target_name}进到牢笼里的时候，因为恐惧和悲伤而哭着颤抖着身体………`,
        );
      } else {
        await era.printAndWait(`「！请不要触碰${sc()}」`);
        await era.printAndWait(`「以为${sc()}是谁来的啊！？」`);
        await era.printAndWait(
          `「对被称为精灵族的姬勇士的${target_name}来说………」`,
        );
        era.print('');
        await era.printAndWait(`「…………！」`);
        await era.printAndWait(
          `「是啊…你就是魔王…哼哼、以为这样就能让${sc()}怎么样了吗？」`,
        );
        await era.printAndWait(
          `${target_name}无畏的笑着，哪怕在败北的时候被俘也好………`,
        );
      }
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;
    } else if (era.get(`talent:${target}:314`) === 2) {
      await era.printAndWait(
        `「哼~…快点将${sc()}放开，这样至少会让你轻松一点死掉呢。」`,
      );
      await era.printAndWait(
        `人狼的${target_name}哪怕被抓住也表现出了一脸有余裕的样子。`,
      );
      await era.printAndWait(
        `看来对于自身的肉体强韧有着很大的自信啊…不过，很快就会明白这种事情在这里没有意义的吧………`,
      );
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;
    } else if (era.get(`talent:${target}:314`) === 3) {
      await era.printAndWait(
        `「呼哼…被这样抓到的还是第一次来着…跟你这种下贱的东西做对手还是让人兴趣缺缺啊」`,
      );
      await era.printAndWait(`吸血鬼的${target_name}冷冷地看着你。`);
      await era.printAndWait(`「快点将${sc()}放开呐」`);
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;
    } else if (era.get(`talent:${target}:314`) === 4) {
      await era.printAndWait(`「原谅什么的…怎样哭喊求饶你才会原谅呢？」`);
      await era.printAndWait(`作为无头骑士的${target_name}比想象地还要冷静。`);
      await era.printAndWait(`（看着吧…肯定会找到机会逃出这里的………）`);
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;
    } else if (era.get(`talent:${target}:314`) === 5) {
      await era.printAndWait(
        `「呃…要不是力量被封印住的话，像你这种家伙一瞬间就会消失了…！」`,
      );
      await era.printAndWait(`龙少女的${target_name}用憎恨的眼神瞪着你。`);
      await era.printAndWait(
        `「对于将${sc()}关在这种地方的事情，必定会让你后悔的！！」`,
      );
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;
    } else if (era.get(`talent:${target}:314`) === 6) {
      await era.printAndWait(
        `「呃…不管怎样对待${sc()}都好、${sc()}也不会屈服的！」`,
      );
      await era.printAndWait(`「${sc()}的身体可是伟大的父亲的东西来的！」`);
      await era.printAndWait(
        `作为天使的${target_name}哪怕力量被封印了也没有改变态度………`,
      );
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;
    } else if (era.get(`talent:${target}:314`) === 9) {
      await era.printAndWait(
        `「骗…骗人…${sc()}居然…居然变成了如此污秽的魔族了………」`,
      );
      await era.printAndWait(
        `看来${target_name}还没有被改造成为魔族，成为魔族其中一员的自觉啊。`,
      );
      await era.printAndWait(
        `沉浸在震惊和悲伤的${target_name}注意到你的存在后用魔族的眼睛瞪向了你。`,
      );
      await era.printAndWait(`「绝对…绝对不会原谅你的…！」`);
      await era.printAndWait(
        `还以为成为了魔族就会安分下来了、看来会变得更加有趣起来了………`,
      );
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;

      // CFLAG:370  = 1（变量语义：CFLAG 族，370）
      kojo.魔族化 = 1;
    } else if (era.get(`talent:${target}:314`) === 10) {
      await era.printAndWait(`「快点将${sc()}放开！」`);
      await era.printAndWait(
        `哪怕跟霍比特人一样小的身体、${target_name}强势的态度也没有改变………`,
      );
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;
    } else if (era.get(`talent:${target}:314`) === 11) {
      await era.printAndWait(`「将${sc()}放了的话可是会有赎金的噢！」`);
      await era.printAndWait(
        `这样的提案你对此嗤之以鼻、向着作为矮人的${target_name}慢慢地靠近了………`,
      );
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;
    } else {
      await era.printAndWait(`「这种事情…不可能…不可能来的啊！」`);
      await era.printAndWait(
        `${target_name}被扔进了这辈子都没有考虑过的恶劣环境里、歇斯底里地哭喊着。`,
      );
      await era.printAndWait(
        `看来得从头教育一下，在这种活着是怎样的一件事情来着………`,
      );
    }
    // CFLAG:201  = 1（变量语义：CFLAG 族，201）
    kojo.初调教 = 1;
    return 1;
  } else if (
    kojo.初调教 < 5 &&
    kojo.魔族化 === 0 &&
    era.get(`talent:${target}:314`) === 9 &&
    era.get(`talent:${target}:85`) === 0 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    await era.printAndWait(
      `「哪怕被改造成这种样子也好…还不能自我了断什么的………」`,
    );
    await era.printAndWait(
      `按照你所希望的那样，${target_name}被改造成了魔族，成为了魔族的新的一员了。`,
    );
    await era.printAndWait(
      `哪怕无法相信般幸运地逃到地面上了也好，她也不会被人类社会而接纳了吧。`,
    );
    await era.printAndWait(`「不，不要过来这边…………」`);
    if (era.get(`mark:${target}:2`) === 3) {
      await era.printAndWait(`「不要…不要再将${sc()}当成玩具了………」`);
    }

    // CFLAG:370  = 2（变量语义：CFLAG 族，370）
    kojo.魔族化 = 2;
    return 1;
  } else if (kojo.初调教 >= 1 && kojo.NTR再捕获 === 1) {
    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {
      era.drawLine();
      await era.printAndWait(
        `看到那个水晶球的事情告诉了${target_name}后，${target_name}的脸色就变了。`,
      );
      await era.printAndWait(
        `「啊啊…魔王大人…请…请原谅${target_name}………那个时候是…是没有办法的事情来得………」`,
      );
      await era.printAndWait(
        `「让${sc()}做任何事情补偿都可以…所以…所以请原谅不贞的${sc()}吧…………」`,
      );

      // CFLAG:650  = 0（变量语义：CFLAG 族，650）
      kojo.NTR再捕获 = 0;
    } else {
      era.drawLine();
      await era.printAndWait(
        `「又再抓回来调教什么的…对于背叛者赐予死刑不好吗？」`,
      );
      await era.printAndWait(`${target_name}讽刺般笑着………`);

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

    if (era.get(`talent:${target}:314`) === 1) {
      await era.printAndWait(`「哼~、这种程度的事情${sc()}才…！」`);
      await era.printAndWait(
        `哪怕坐在地板上${target_name}反抗的态度也可见一斑………`,
      );
    } else {
      await era.printAndWait(`「${sc()}不要再触碰我了！…无礼之徒！」`);
      await era.printAndWait(
        `${target_name}哪怕身体颤抖着也用毅然的态度目不转睛地盯着你………`,
      );
    }
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

    if (era.get(`talent:${target}:314`) === 1) {
      await era.printAndWait(`「呃…${scf()}、请不要触碰${sc()}………！」`);
      await era.printAndWait(
        `虽然说着强势的台词，但是${target_name}胆怯地看着你………`,
      );
    } else {
      await era.printAndWait(`「不会认输…才不会认输呐…」`);
      await era.printAndWait(
        `${target_name}趴在了地板上，但是哪怕这样还是没有屈服的样子………`,
      );
    }
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

    if (era.get(`talent:${target}:314`) === 1) {
      await era.printAndWait(
        `「不，不要靠近过来…不要对${sc()}…做残酷的事情…」`,
      );
      await era.printAndWait(`「拜托了…请…不要做残酷的事情………」`);
      await era.printAndWait(
        `${target_name}瘫倒在了地板上，因为恐怖而颤抖着………`,
      );
    } else {
      await era.printAndWait(`「已经…输掉了…也没关系了吗…」`);
      await era.printAndWait(`恍惚的${target_name}这样喃喃自语着………`);
    }
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

    if (era.get(`talent:${target}:314`) === 7) {
      await era.printAndWait(`${target_name}在冰冷的地板上正坐着。`);
      await era.printAndWait(`「主人~…那个…那个…」`);
      await era.printAndWait(
        `${target_name}的眼神飘忽不定，拼命地想要说出话来。`,
      );
      await era.printAndWait(
        `「${scf()}…${sc()}想…想要…主人、主人的、大、大鸡巴…请主人赏，赏赐…」`,
      );
      await era.printAndWait(
        `${target_name}咕噜地吞了一口口水、眼睛盯着${player_name}的股间。`,
      );
      await era.printAndWait(
        `「${sc()}是…没有主人的大鸡巴的话…就无法活下…可怜而淫乱的精灵来的………」`,
      );
      await era.printAndWait(`${target_name}的双目慢慢地失去了理性的光芒。`);
      await era.printAndWait(`「请…怜悯…怜悯一下吧~………」`);
      await era.printAndWait(
        `${target_name}一边说着一边土下座，${target_name}的屁股正淫乱地左右摇晃着………`,
      );
    } else {
      await era.printAndWait(`「啊啊嗯~…主人哈嗯~…」`);
      await era.printAndWait(`${target_name}露出了可爱的笑容像你抱了过来。`);
      await era.printAndWait(
        `「怎么都…怎么都忍不住呐…请对${sc()}淫靡而下流的身体…赐予调教吧…」`,
      );
      await era.printAndWait(
        `${target_name}露出了虽然淫乱却还残留着高贵的样子像你撒起了娇………`,
      );
    }
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
      await era.printAndWait(
        `「啊啊~…从以前就开始想了~…魔王大人的味道闻起来怎么那么好啊~…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}魔族的瞳孔湿润了起来、也不隐藏自己在发情的这件事情向你走了过来。`,
      );
      await era.printAndWait(
        `「侍奉…请让${sc()}来侍奉吧…${heart(1)} 想要给魔王大人的身体好好地侍奉呢~${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}依偎在你的身上，在你的耳朵，脖子，胸口等地方降下了亲吻之雨。`,
      );
      await era.printAndWait(
        `「啊啊~…已经忍不住了呀~…${heart(1)} 大鸡巴、想要大鸡巴~${heart(3)}」`,
      );
      await era.printAndWait(
        `看着完全堕落了的${target_name}、你如同鄙视地一般朝她笑了起来。`,
      );
      await era.printAndWait(
        `「啊哈嗯~…请不要用这种眼神看着~…${sc()}只是…想要大鸡巴而已嘛…${heart(1)}」`,
      );
      // CFLAG:201  = 6（变量语义：CFLAG 族，201）
      kojo.初调教 = 6;
      return 1;
    } else if (kojo.魔族化 === 2) {
      await era.printAndWait(
        `「最近，给魔王大人侍奉的时候…心里感觉特别地安定呢…${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}魔族的瞳孔湿润了起来、靠向了你。`);
      await era.printAndWait(
        `「啊啊~…不行了…已经离不开魔王大人的身边了…${heart(3)}」`,
      );
      await era.printAndWait(
        `轻轻依偎在${master_name}的身边后用手掌温柔地抚摸起了${master_name}的身体。`,
      );
      await era.printAndWait(
        `「请让我…更多侍奉吧…${heart(1)} 请将…${sc()}弄脏吧…${heart(1)}」`,
      );
      await era.printAndWait(
        `完全堕落的${target_name}嘴边流下了唾液向你撒起了娇………`,
      );
      // CFLAG:201  = 6（变量语义：CFLAG 族，201）
      kojo.初调教 = 6;
      return 1;
    } else {
      await era.printAndWait(
        `「啊哈呜~…${heart(1)} 成为魔族原来是这样的感觉啊${heart(1)}」`,
      );
      await era.printAndWait(
        `你一来到${target_name}的表情就变得H了起来、好像立马就会从嘴边流下口水了。`,
      );
      await era.printAndWait(
        `「魔王大人的魔力…渗进了${sc()}的身体里了…啊啊~${heart(1)}」`,
      );
      await era.printAndWait(
        `「啊啊…脑袋里好热…已经不行了…小穴和肛穴都好…都想要被好好地干一番啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}好像现在立马就会开始自慰起来般发情了………`,
      );
      if (era.get(`talent:${target}:0`) === 1) {
        await era.printAndWait(
          `${target_name}将最后如同没有的自尊心给扔掉了、将两条腿大幅度的敞开了。`,
        );
        await era.printAndWait(
          `「魔王大人~…请将大鸡巴塞进${heart(1)} ${sc()}的魔王大人专用处女小穴里吧~${heart(1)}」`,
        );
        await era.printAndWait(
          `「拜托了啦~…如果不行的话…就让魔物们或者狗狗们侵犯好了~~~${heart(1)}」`,
        );
        await era.printAndWait(
          `看来已经是抑制不住了的样子、是时候好好疼爱疼爱了吧………`,
        );
      }
      // CFLAG:201  = 6（变量语义：CFLAG 族，201）
      kojo.初调教 = 6;
      return 1;
    }
  } else if (
    kojo.初调教 < 7 &&
    era.get(`talent:${target}:85`) === 1 &&
    era.get(`talent:${target}:76`) === 0 &&
    era.get(`talent:${target}:314`) !== 9
  ) {
    era.drawLine();

    if (era.get(`talent:${target}:314`) === 1) {
      await era.printAndWait(
        `「啊啊~…我这个${sc()}居然…居然会有这样的感觉什么的………」`,
      );
      await era.printAndWait(
        `${target_name}展露出了至今都没有见过的温柔的表情向你看了过来。`,
      );
      await era.printAndWait(
        `「魔王大人…${sc()}…想要跟你永远在一起呢~…如果，可以的话………」`,
      );
      await era.printAndWait(
        `迅速地向你靠近的${target_name}、在你的耳边用精灵语小声地说着什么。`,
      );
      await era.printAndWait(
        `貌似包含了什么恋慕的意义在里面，但是因为是精灵语所以细节部分不是很清楚。`,
      );
      await era.printAndWait(
        `${target_name}长长的耳朵全部变红了，轻轻地离开了突然呆住的你的身旁………`,
      );
      era.print('');
      await era.printAndWait(`「请让${sc()}一直伺候在您的身旁吧………」`);
    } else {
      await era.printAndWait(`「啊、魔王大人………」`);
      await era.printAndWait(
        `${target_name}的脸上并没有一丝的恐惧而是温柔地看着你………`,
      );
      await era.printAndWait(`「那、那个…我有个…请求来着………」`);
      era.print('');
      await era.printAndWait(`「…用亲爱的来称呼您也…没关系吗…？」`);
    }
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
        `${target_name}向你靠近后、用十分自然地动作俯下身亲吻了${master_name}的脚趾甲。`,
      );
      await era.printAndWait(
        `那个动作完全没有一丝犹豫。在被${target_name}平时都完全想象不出来、居然会做出如此谦卑的动作的你面前，${target_name}看着你可爱地笑了起来。`,
      );
      await era.printAndWait(
        `「魔王大人…${sc()}…会像你发誓保证永远的忠诚的…${heart(1)}」`,
      );
      era.print('');
      await era.printAndWait(
        `你稍微想了一下后，温柔地抚摸了${target_name}的脸颊作为你的回答。`,
      );
      await era.printAndWait(`「啊啊~…啊啊~…${sc()}…好幸福啊~…${heart(1)}」`);
      await era.printAndWait(
        `${target_name}的尾巴摇晃着，身体因为喜悦而颤抖着………`,
      );
      // CFLAG:201  = 8（变量语义：CFLAG 族，201）
      kojo.初调教 = 8;
      return 1;
    } else if (kojo.魔族化 === 2) {
      await era.printAndWait(
        `${target_name}向你靠近后、用十分自然的动作来亲吻${master_name}的脚趾甲。`,
      );
      await era.printAndWait(
        `她的动作没有任何的犹豫。在被${target_name}平时都完全想象不出来、居然会做出如此谦卑的动作的你面前，${target_name}看着你可爱地笑了起来。`,
      );
      await era.printAndWait(
        `「啊啊~…${sc()}的住所、已经…只能是这里了…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}就像狗一样在你的脚边谄媚着。那个姿态已经是一点高贵的样子都没有了。`,
      );
      await era.printAndWait(
        `「啊啊…啊啊…请让${target_name}一直在魔王大人的身边吧…${heart(1)}」`,
      );
      // CFLAG:201  = 8（变量语义：CFLAG 族，201）
      kojo.初调教 = 8;
      return 1;
    } else {
      await era.printAndWait(
        `「啊啊~…终于成为了魔族了呐~~${heart(1)} 好高兴呢~~~${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}因为太过开心而颤抖着、张开了翅膀甩起了尾巴向你展现着她的身姿。`,
      );
      await era.printAndWait(
        `「想要一直这样下去呢…更多地侍奉您…大人您的孩子…想要…想要的说………${heart(1)}」`,
      );
      await era.printAndWait(
        `就像是疼爱系少女的一样露出了羞涩的笑容、作为原勇者的她成为了魔族的新成员，向你撒起了娇………`,
      );
      // CFLAG:201  = 8（变量语义：CFLAG 族，201）
      kojo.初调教 = 8;
      return 1;
    }
  } else if (era.get(`talent:${target}:9`) === 1 && kojo.初调教 < 9) {
    era.drawLine();
    await era.printAndWait(
      `「不要…不要~…请将我从这里放出来吧…父亲大人！！母亲大人！！…啊啊~！啊~！啊啊啊啊啊～！！！」」`,
    );
    await era.printAndWait(
      `${target_name}用两手不断地向墙壁敲打着。那双手已经鲜血淋漓了。`,
    );
    await era.printAndWait(`${target_name}坏掉的精神已经回不到以前了吧………`);
    // CFLAG:201  = 9（变量语义：CFLAG 族，201）
    kojo.初调教 = 9;
    return 1;
  } else if (era_flag.assi < 0) {
    await k3_kojo2(rand_n);
  } else if (era_flag.assi === 17) {
    era.drawLine();

    if (kojo.简易助手_0 === 0) {
      if (era.get(`talent:${target}:9`) === 1) {
        era.setColor('#ffccff');
        await era.printAndWait(`『…主人、这个人已经坏掉了哦』`);
        era.setColor('');
      } else if (era.get(`talent:${target}:76`) === 1 && kojo.初调教 >= 5) {
        await era.printAndWait(
          `${master_name}将${assi_name}带过来后、${target_name}感到些许奇怪。`,
        );
        await era.printAndWait(
          `「啊啦？那个孩子是………嗯哼哼~、你也被主人做了各种各样的事情了吧~…」`,
        );
        await era.printAndWait(
          `懒散地床上起来后，${target_name}整理着自己凌乱的头发。`,
        );
        era.setColor('#ffccff');
        await era.printAndWait(
          `『哎~~、果然是这样吗？…今天呢~、是跟姐姐一起玩耍的噢，主人这么说的呢♪』`,
        );
        era.setColor('');
        await era.printAndWait(
          `${assi_name}将${target_name}如同撒娇一般抱住后就这样推到了………`,
        );
      } else if (era.get(`talent:${target}:85`) === 1 && kojo.初调教 >= 7) {
        await era.printAndWait(
          `${master_name}将${assi_name}带过来后、${target_name}向这边瞪了过来。`,
        );
        await era.printAndWait(
          `「明明已经有了${sc()}…却还要带那个孩子过来…！」`,
        );

        if (era.get(`talent:${assi}:85`) === 1) {
          await era.printAndWait(
            `如果是以前村女的那一会的话以${target_name}的眼力就会晕过去了吧、但是${assi_name}轻松的招架住了。`,
          );
          era.setColor('#ffccff');
          await era.printAndWait(
            `『哇啊~好可怕~、不行的哦~“原”勇者大人、摆出这么一张因为嫉妒而发狂的表情~♪』`,
          );
          era.setColor('');
          await era.printAndWait(
            `「啊…${scf()}、${sc()}、才、才没有嫉妒什么的呢………」`,
          );
          await era.printAndWait(
            `可能是因为在${master_name}的面前露出了这样的表情而感到羞耻的${target_name}“啪”地用两手遮住了脸。`,
          );
          era.setColor('#ffccff');
          await era.printAndWait(
            `『所以作为同样都喜欢主人的同伴、我们更加地搞好关系吧~？呐~？』`,
          );
          era.setColor('');
          await era.printAndWait(
            `${assi_name}抓住这样的${target_name}的间隙将她推到了………`,
          );
        } else {
          era.setColor('#ffccff');
          await era.printAndWait(
            `『啊哈哈~…大姐姐嫉妒了~♪ 明明不管是不是我的主人，魔王大人也没关系，和谁抱在一起都一样嘛~♪』`,
          );
          era.setColor('');
          await era.printAndWait(
            `「不，不要乱开玩笑…你不知道${sc()}对那位大人有多………啊啊~、快将手放开」`,
          );
          await era.printAndWait(
            `${assi_name}将${target_name}的手抓住强行抱了过来。`,
          );
          era.setColor('#ffccff');
          await era.printAndWait(
            `『但是今天…俺在魔王大人的面前、将大姐姐给抱住了哦…${heart(1)}』`,
          );
          era.setColor('');
        }
      } else {
        await era.printAndWait(
          `${master_name}将${assi_name}带过来后、${target_name}就一直瞪着这边。`,
        );
        await era.printAndWait(`「将这样的小姑娘带过来…到底想要干嘛呢…！」`);
        era.setColor('#ffccff');
        await era.printAndWait(
          `『呜哇~…真是一副了不起的样子呢~…初次见面，大姐姐、今天是由玛奥来调教的噢………』`,
        );
        era.setColor('');
        await era.printAndWait(`「什…请…请别在那里胡闹了！！」`);
        era.setColor('#ffccff');
        await era.printAndWait(`『才没有在胡闹哦~...这可是主人的命令来的嘛♪』`);
        era.setColor('');
        await era.printAndWait(
          `${assi_name}将因不愿意而撇着嘴的${target_name}推到了………`,
        );
      }
      // CFLAG:202  = 1（变量语义：CFLAG 族，202）
      kojo.简易助手_0 = 1;
      return 1;
    } else if (kojo.简易助手_0 === 1 && game.kojo.口上开关 === 2) {
      if (era.get(`talent:${target}:9`) === 1) {
        era.setColor('#ffccff');
        await era.printAndWait(
          `『已经坏掉了的话…那就弄得更加坏掉也没关系吧★』`,
        );
        era.setColor('');
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `${master_name}将${assi_name}带到这里来后、${target_name}不知道为什么摆出了一副伤心的表情。`,
        );
        await era.printAndWait(`「再也不说魔王大人您任性了…哈啊………」`);

        if (era.get(`talent:${assi}:85`) === 1) {
          era.setColor('#ffccff');
          await era.printAndWait(
            `『别摆出这样阴暗的表情嘛…俺只是想要跟勇者大人搞好关系而已嘛~~♪』`,
          );
          era.setColor('');
          await era.printAndWait(
            `「啊啊~…不，不行的…${sc()}的身体是…那位大人的…嗯~」`,
          );
          await era.printAndWait(
            `${target_name}的脸颊被抚摸着、不情愿地将身体交给了${assi_name}。`,
          );
          era.setColor('#ffccff');
          await era.printAndWait(
            `『看吧~…俺们关系变好的话~、主人也会高兴的………♪』`,
          );
          era.setColor('');
          await era.printAndWait(
            `${master_name}对${assi_name}使了一下眼色后，${assi_name}便将${target_name}推倒了………`,
          );
        } else {
          await era.printAndWait(
            `「啊啊~…但是…请至少、请至少不要在大人的面前……做这样的事情……」`,
          );
          await era.printAndWait(
            `${target_name}只能在${master_name}和${assi_name}的面前微弱地呻吟而已。`,
          );
          era.setColor('#ffccff');
          await era.printAndWait(
            `『（啊啊~…主人是想要看这个人的这种表情啊~………♪）』`,
          );
          era.setColor('');
          era.setColor('#ffccff');
          await era.printAndWait(
            `『不是的哦～、这可是主人的命令来的啦…来变得淫乱起来吧~♪』`,
          );
          era.setColor('');
          await era.printAndWait(
            `${assi_name}将正微弱抵抗的${target_name}给推倒了………`,
          );
        }
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `${master_name}将${assi_name}带过来后、${target_name}不知道为什么一副很高兴的样子。`,
        );
        await era.printAndWait(`「啊啊~…快来这边吧…」`);

        if (era.get(`talent:${assi}:76`) === 1) {
          await era.printAndWait(`「在主人的面前…让我们都变得淫乱起来吧…♪」`);
          await era.printAndWait(
            `可能在助手的身上感觉到了相同的气息吧，${target_name}不像样地将双腿给摊开了。`,
          );
          era.setColor('#ffccff');
          await era.printAndWait(
            `『啊哈哈~…在主人的面前做个爽、称赞得个爽吧~………♪』`,
          );
          era.setColor('');
          await era.printAndWait(
            `${target_name}和${assi_name}就像蛇一样互相缠绕在一起了………`,
          );
        } else {
          await era.printAndWait(
            `「${sc()}想要…将${assi_name}酱的技术铭刻在身体里啊~…♪」`,
          );
          await era.printAndWait(
            `${target_name}从嘴边露出了淫靡的笑声，将身体摊开了。`,
          );
          era.setColor('#ffccff');
          await era.printAndWait(`『啊哈嗯~…大姐姐~~…今天也做个爽吧~~………』`);
          era.setColor('');
          await era.printAndWait(
            `${assi_name}将${target_name}就像宠溺一样抱住她就这样将其推倒了………`,
          );
        }
      } else {
        await era.printAndWait(
          `${master_name}将${assi_name}带到这里来后、${target_name}脸上露出了一副貌似放弃了的表情。`,
        );
        era.setColor('#ffccff');
        await era.printAndWait(
          `『呜呼呼~…不管大姐姐怎么说不要都好，俺都会好好玩弄大姐姐的~♪』`,
        );
        era.setColor('');
        await era.printAndWait(
          `${assi_name}一副完全沉浸在调教原勇者的乐趣里的样子。`,
        );
        if (era.get(`mark:${target}:2`) === 3) {
          await era.printAndWait(`「已经…随便你们好了………」`);
          await era.printAndWait(
            `看着如同放弃了一般横躺着的${target_name}，${assi_name}的施虐心受到了更强烈的刺激………`,
          );
        } else {
          await era.printAndWait(`「哈呜~…呃呜~~…真，真是屈辱啊………」`);
          await era.printAndWait(
            `在这个房间里${target_name}不能充分地使用力量，只能在${assi_name}的身下挣扎而已………`,
          );
        }
      }
      return 1;
    }
  } else {
    await k3_kojo2(rand_n);
  }
}

async function eventend_k3(rand) {
  void rand;
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const sc = () => self_call(target);
  const kojo = chara(target).kojo;
  if (kojo.爱抚 >= 1) {
    // CFLAG:301  = 1（变量语义：CFLAG 族，301）
    kojo.爱抚 = 1;
  }

  if (game.kojo.口上开关 <= 0) {
    return 0;
  }
  if (era.get(`talent:${target}:163`) !== 1) {
    return 0;
  }

  if (era.get(`base:${target}:0`) <= 0) {
    return 0;
  }

  if (era.get(`talent:${target}:9`) === 1 && game.kojo.口上开关 === 2) {
    era.drawLine();
    await era.printAndWait(`「呜…呃呜…黑暗的…不要…狭窄的…不要………」`);
    await era.printAndWait(
      `${target_name}的脸被眼泪和口水弄得一塌糊涂地横躺在那里………`,
    );
    return 1;
  } else if (
    era.get(`mark:${target}:3`) === 3 &&
    era.get(`talent:${target}:85`) === 0 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    era.drawLine();
    await era.printAndWait(`「……真是无法置信」`);
    return 1;
  } else if (
    (era.get(`mark:${target}:2`) || 0) <= 1 &&
    (era.get(`talent:${target}:85`) || 0) === 0 &&
    (era.get(`talent:${target}:76`) || 0) === 0
  ) {
    era.drawLine();
    await era.printAndWait(`「终于结束了啊………」`);
    return 1;
  } else if (
    era.get(`mark:${target}:2`) === 2 &&
    era.get(`talent:${target}:85`) === 0 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    era.drawLine();
    await era.printAndWait(`「到底打算继续到什么时候呐…？」`);
    return 1;
  } else if (
    era.get(`mark:${target}:2`) === 3 &&
    era.get(`talent:${target}:85`) === 0 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    era.drawLine();
    await era.printAndWait(`「这种程度才不会屈服…来的………」`);
    return 1;
  } else if (
    era.get(`talent:${target}:76`) === 1 &&
    era.get(`base:${target}:0`) >= 500
  ) {
    era.drawLine();

    if (era.get(`talent:${target}:314`) === 7) {
      await era.printAndWait(
        `「啊~…${sc()}的身体…比起人类来还更加结实一点的啦………」`,
      );
      await era.printAndWait(`「所以请更加不留情面地做H的事情吧………」`);
    } else {
      await era.printAndWait(`「啊嗯~…更多…请继续做更多H的事情吧~………」`);
    }
    return 1;
  } else if (
    era.get(`talent:${target}:76`) === 1 &&
    era.get(`base:${target}:0`) <= 500
  ) {
    era.drawLine();

    if (era.get(`talent:${target}:314`) === 7) {
      await era.printAndWait(
        `「哈啊…哈啊…太舒服了…脑子里都要融化掉了啊~${heart(1)}」`,
      );
    } else {
      await era.printAndWait(`「哈啊…哈啊…那里…还有…感觉着呢~${heart(1)}」`);
    }
    return 1;
  } else if (
    era.get(`talent:${target}:85`) === 1 &&
    era.get(`base:${target}:0`) >= 500
  ) {
    era.drawLine();

    if (era.get(`talent:${target}:314`) === 1) {
      await era.printAndWait(`「嗯啊~…${sc()}…没想到自己的欲望居然会那么深…」`);
      await era.printAndWait(`「…请更加用力地疼爱${sc()}吧………」`);
    } else {
      await era.printAndWait(
        `「啊啦、更加用力地疼爱${sc()}也没关系的说......」`,
      );
    }
    return 1;
  } else if (
    era.get(`talent:${target}:85`) === 1 &&
    era.get(`base:${target}:0`) <= 500
  ) {
    era.drawLine();

    if (era.get(`talent:${target}:314`) === 1) {
      await era.printAndWait(`「啊哈啊嗯~…果然、最喜欢大人您了~…♪」`);
    } else {
      await era.printAndWait(`「十分满足的说…♪」`);
    }
    return 1;
  }
  return 0;
}

async function k3_kojo2(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const player_name = chara_callname(era_flag.player);
  const master_name = chara_name(0);
  const sc = () => self_call(target);
  const kojo = chara(target).kojo;

  if (era.get(`talent:${target}:9`) === 1 && game.kojo.口上开关 === 2) {
    era.drawLine();
    await era.printAndWait(
      `「父亲大人…请原谅…父亲大人…${sc()}…${sc()}已经…啊啊啊啊啊啊啊！」`,
    );
    await era.printAndWait(
      `在精神崩溃了的${target_name}的身上已经期待不了像样的反应了吧………`,
    );
    return 1;
  } else if (era.get(`mark:${target}:3`) === 3 && game.kojo.口上开关 === 2) {
    era.drawLine();

    if (era.get(`talent:${target}:314`) === 1) {
      await era.printAndWait(
        `「呃…！敢摸一下试试…${target_name}会将你的喉咙给咬断的…！」`,
      );
      await era.printAndWait(
        `${target_name}用好像随时都会飞扑过来的眼神瞪着这边………`,
      );
    } else {
      await era.printAndWait(`「你这个人渣！」`);
      await era.printAndWait(
        `${target_name}的怒火仿佛能看到地一样熊熊燃烧着………`,
      );
    }
    return 1;
  } else if (
    era.get(`mark:${target}:2`) === 0 &&
    game.kojo.口上开关 === 2 &&
    era.get(`talent:${target}:85`) === 0 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    era.drawLine();

    if (era.get(`talent:${target}:314`) === 1) {
      await era.printAndWait(`「真是肮脏…不要看过来！」`);
      await era.printAndWait(`${target_name}紧咬着牙，怒视着${player_name}………`);
    } else {
      if (era.get(`talent:${target}:317`) === 4) {
        await era.printAndWait(`「能触碰${sc()}的人…也就只有那个人而已！」`);
        await era.printAndWait(
          `${target_name}用如同看着污垢之物的眼神看着${player_name}………`,
        );
      } else {
        await era.printAndWait(`「请不要用你那肮脏的手来触碰${sc()}…」`);
        await era.printAndWait(
          `${target_name}用鼻子‘哼’地一声，一副不爽的样子将脸撇向一边………`,
        );
      }
    }
    return 1;
  } else if (
    era.get(`mark:${target}:2`) === 1 &&
    game.kojo.口上开关 === 2 &&
    era.get(`talent:${target}:85`) === 0 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    era.drawLine();

    if (era.get(`talent:${target}:314`) === 1) {
      await era.printAndWait(`「哼、哼嗯…这点小事…！」`);
      await era.printAndWait(`${target_name}还是一副强硬的样子………`);
    } else {
      if (era.get(`talent:${target}:317`) === 4) {
        await era.printAndWait(
          `「居然被这种下贱的人给触碰了身体…${target_name}真的是对不起那个人啊………」`,
        );
        await era.printAndWait(`${target_name}一副气愤地样子盯着这边………`);
      } else {
        await era.printAndWait(`「被这种下贱的家伙给…」`);
        await era.printAndWait(
          `${target_name}阴沉着脸、抚摸自己起了鸡皮疙瘩的皮肤………`,
        );
      }
    }
    return 1;
  } else if (
    era.get(`mark:${target}:2`) === 2 &&
    game.kojo.口上开关 === 2 &&
    era.get(`talent:${target}:85`) === 0 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    era.drawLine();

    if (era.get(`talent:${target}:314`) === 1) {
      await era.printAndWait(`「呜……${sc()}才…不会在这种地方……」`);
      await era.printAndWait(
        `${target_name}还没有抛弃希望的样子、不过看来差不到要到极限了………`,
      );
    } else {
      if (era.get(`talent:${target}:317`) === 4) {
        await era.printAndWait(`「啊…啊啊…至少请再温柔一点…吧………」`);
        await era.printAndWait(
          `${target_name}一副稍微有点放弃了地样子喃喃自语着………`,
        );
      } else {
        await era.printAndWait(`「……今……今天也要…」`);
        await era.printAndWait(
          `${target_name}一副稍微有点放弃了地样子喃喃自语着………`,
        );
      }
    }
    return 1;
  } else if (
    era.get(`mark:${target}:2`) === 3 &&
    era.get(`talent:${target}:85`) === 0 &&
    game.kojo.口上开关 === 2 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    era.drawLine();

    if (era.get(`talent:${target}:314`) === 1) {
      await era.printAndWait(`「如果不做太过分的事情的话…就没关系………」`);
      await era.printAndWait(`${target_name}一副已经完全放弃了的样子………`);
    } else {
      if (
        era.get(`talent:${target}:317`) === 4 &&
        game.system.人间界侵攻度 >= 5000
      ) {
        await era.printAndWait(
          `「拜、拜托了…对${sc()}的身体随便做什么都没关系…但是……」`,
        );
        await era.printAndWait(
          `「……至少放过，在那条街…那条街的那个人的孩子的生命…………」`,
        );
        await era.printAndWait(
          `${target_name}一副为了故乡的恋人而献上自己身体的虚伪样子、看着用这种理由抱过来的${target_name}你感到十分的满意………`,
        );
      } else {
        await era.printAndWait(
          `「${target_name}明白了…随便怎么做都可以了....」`,
        );
        await era.printAndWait(
          `${target_name}好像下定决心了、坦率地顺从着${player_name}………`,
        );
      }
    }
    return 1;
  } else if (era.get(`talent:${target}:76`) === 1 && game.kojo.口上开关 === 2) {
    era.drawLine();

    if (era.get(`talent:${target}:314`) === 7) {
      if (rand_n(3) === 0) {
        await era.printAndWait(
          `「啊啊~主人~…热得忍不了了~…请用大鸡鸡…塞满${target_name}吧${heart(3)}」`,
        );
        await era.printAndWait(
          `${target_name}匍匐在${master_name}的脚边着、将自己的脸埋在了股间，自傲的长耳朵被压到扭曲了也不管………`,
        );
      } else if (rand_n(2) === 0) {
        await era.printAndWait(`「哈啊~…嗯~…身体…好热啊~${heart(3)}」`);
        await era.printAndWait(
          `「自慰居然会那么舒服什么的~…已经…已经…啊啊~${heart(3)}」`,
        );
        await era.printAndWait(
          `「啊嗯~…主人…敬请欣赏....淫乱的堕落女精灵的小穴之舞吧…${heart(5)}」`,
        );
        await era.printAndWait(
          `${target_name}擅自开始了自慰…对于这样不懂事的姑娘一定要好好惩罚一下才可以………`,
        );
      } else {
        await era.printAndWait(
          `「请负起将${sc()}的身体变得如此淫乱的责任吧…哈呜嗯~…${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊啊~…${sc()}的这个胸部也好…屁股也好…那里也好…都是主人的东西来的…${heart(3)}」`,
        );
        await era.printAndWait(
          `${target_name}舔着嘴唇、长长的耳朵一抽一抽地靠向了${master_name}………`,
        );
      }
    } else {
      if (rand_n(3) === 0) {
        await era.printAndWait(
          `「啊~主人~${heart(1)}${'\u3000'}今天用${sc()}的嘴巴来侍奉也没有关系吧~${heart(3)}」`,
        );
        await era.printAndWait(
          `${target_name}在${player_name}的耳边撒娇般轻声说着………`,
        );
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `「主人~~…${heart(1)}${'\u3000'}对淫乱而又下流的${target_name}…」`,
        );
        await era.printAndWait(`「好好地惩罚一下吧~${heart(3)}」`);
        await era.printAndWait(
          `${target_name}用双手将自己的桃尻掰开，诱惑着${player_name}………`,
        );
      } else {
        await era.printAndWait(
          `「哈啊…哈啊…快点~…主人~…请给予大鸡巴吧~…${heart(1)}」`,
        );
        await era.printAndWait(
          `「${sc()}的身体哪里都可以…让主人舒服起来的哦~~${heart(1)}」`,
        );
      }
    }
    return 1;
  } else if (era.get(`talent:${target}:85`) === 1 && game.kojo.口上开关 === 2) {
    era.drawLine();

    if (
      kojo.寄生 >= 1 &&
      (era.get(`talent:${target}:190`) === 1 ||
        era.get(`talent:${target}:191`) === 1)
    ) {
      if (rand_n(3) === 0) {
        era.print(`「嗯哼哼~…居然长得那么大了呢~${heart(1)}」`);
        await era.printAndWait(
          `${target_name}很怜爱地、抚摸着因为蠕虫寄生而怀孕膨胀了的肚子………`,
        );
      } else if (rand_n(2) === 0) {
        era.print(
          `「被大人植入在肚子里面的孩子们~、正在不停地长大着呢~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}眯着眼睛、怜爱地抚摸着因为寄生虫的卵而膨胀变大的肚子……`,
        );
      } else {
        era.print(
          `「在${target_name}的肚子里面的孩子……能快一点出来活动就好了呢~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一副恍惚地表情、抚摸着因为塞满着蠕虫的卵而膨胀起来的肚子……`,
        );
      }
    } else if (era.get(`talent:${target}:314`) === 1) {
      if (rand_n(3) === 0) {
        await era.printAndWait(`「已经…故乡什么的…已经怎么样都可以了…」`);
        await era.printAndWait(`「请让${sc()}一直呆在这里吧………」`);
      } else if (rand_n(2) === 0) {
        await era.printAndWait(`「啊~…魔王大人~♪」`);
        await era.printAndWait(
          `「一直、在等待这您的到来呢…撒、请快点来这边吧…」`,
        );
      } else {
        await era.printAndWait(
          `「哈啊~…为什么…为什么会如此地恋慕身为魔族之王的那个大人呢………」`,
        );
        await era.printAndWait(`「${sc()}就这样…堕落到地狱也没有关系………」`);
        await era.printAndWait(
          `「………呜啊啊！？刚、刚刚的都听到了吗？请请请、请都忘掉吧！！！」`,
        );
      }
    } else {
      if (rand_n(3) === 0) {
        await era.printAndWait(`「大人~、今天也要做对吧~…♪」`);
        await era.printAndWait(
          `${target_name}将你的手放在脸颊上，可爱地用脸蹭着你的手心………`,
        );
      } else if (rand_n(2) === 0) {
        await era.printAndWait(`「大人、等…等您已经等了好久了啊~…」`);
        await era.printAndWait(
          `${target_name}眼睛微微闭着，向你的脸轻轻亲了一下………`,
        );
      } else {
        await era.printAndWait(`「请温柔一点......温柔地做吧~…」`);
        await era.printAndWait(
          `${target_name}用手指玩弄着自己的发鬓，好像很害羞地请求道………`,
        );
      }
    }
    return 1;
  }
  return 0;
}

async function dog_kojo_3(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const master_name = chara_name(0);
  const sc = () => self_call(target);
  const kojo = chara(target).kojo;

  if (era_flag.selectcom === 0) {
    if (kojo.爱抚 === 0) {
      if (era.get(`talent:${target}:136`) === 1) {
        await era.printAndWait(`「欢迎~~……嗯~、没、没错……嗯嗯~……！」`);
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊啊…魔王大人想要试试，${sc()}能被野狗弄成怎样淫乱下流的样子对吧、……啊嗯！」`,
        );
      } else if (era.get(`mark:${target}:2`) === 3) {
        await era.printAndWait(
          `「这，这样的……被狗什么的…再怎么说也……呜啊啊啊~……！」`,
        );
      } else if (era.get(`mark:${target}:2`) >= 2) {
        await era.printAndWait(`「为…为什么、${sc()}要受到这样的……！」`);
      } else {
        await era.printAndWait(`「不……不要啊！才…才不要做这种事情！！」`);
      }
      // CFLAG:301  = 1（变量语义：CFLAG 族，301）
      kojo.爱抚 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        chara(target).chara.结婚对象 === 900 &&
        (kojo.爱抚 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊哈啊…${heart(1)} 来吧、老公大人啊…啊、啊啊啊~…」`,
        );
        // CFLAG:301  = 8（变量语义：CFLAG 族，301）
        kojo.爱抚 = 8;
      } else if (
        era.get(`talent:${target}:136`) === 1 &&
        (kojo.爱抚 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「能侍奉作为魔王大人的雌犬的${sc()}什么的、真是一条幸运的野狗呢……嗯哼哼♪」`,
        );
        // CFLAG:301  = 7（变量语义：CFLAG 族，301）
        kojo.爱抚 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊哈啊…狗狗的舌头、好大……呜哈啊、真令人兴奋呢♪」`,
        );
        // CFLAG:301  = 6（变量语义：CFLAG 族，301）
        kojo.爱抚 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「魔王大人…狗作为对象什么的、嗯！不要啊、啊~……！」`,
        );
        // CFLAG:301  = 5（变量语义：CFLAG 族，301）
        kojo.爱抚 = 5;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呜啊…啊…啊啊啊……不要啊……」`);
        // CFLAG:301  = 4（变量语义：CFLAG 族，301）
        kojo.爱抚 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 2 &&
        (kojo.爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「已、已经…呜呜……请、请住手吧……」`);
        // CFLAG:301  = 3（变量语义：CFLAG 族，301）
        kojo.爱抚 = 3;
      } else if (
        era.get(`mark:${target}:2`) <= 1 &&
        (kojo.爱抚 <= 1 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「快、快离开！这个……呜呜~……！」`);
        // CFLAG:301  = 2（变量语义：CFLAG 族，301）
        kojo.爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 1) {
    if (kojo.舔阴 === 0) {
      if (era.get(`talent:${target}:136`) === 1) {
        await era.printAndWait(
          `「是这里哦、明白了吧？…啊嗯~、没、没错……嗯哈嗯~……！」`,
        );
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊哈…这么地闻着那儿的味道……呜嗯~♪嗯~、没、没错……就是，这样舔……」`,
        );
      } else if (era.get(`talent:${target}:0`) === 1) {
        await era.printAndWait(`「哈呜啊！不要啊……不要！不要呀啊啊！」`);
      } else {
        await era.printAndWait(`「啊呜……不、不要…在做什……呜啊啊！不要啊！」`);
      }
      // CFLAG:302  = 1（变量语义：CFLAG 族，302）
      kojo.舔阴 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        chara(target).chara.结婚对象 === 900 &&
        (kojo.舔阴 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「来吧…老公大人~${heart(1)} 就像平常地一样、这里…啊哈嗯啊~！真，真熟练呢~~~…${heart(1)}」`,
        );
        // CFLAG:302  = 7（变量语义：CFLAG 族，302）
        kojo.舔阴 = 7;
      } else if (
        era.get(`talent:${target}:136`) === 1 &&
        (kojo.舔阴 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「有着母狗的味道对吧~？${'\u3000'}哼哼~…没错、那里……啊呜嗯~！啊、啊啊~♪」`,
        );
        // CFLAG:302  = 6（变量语义：CFLAG 族，302）
        kojo.舔阴 = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.舔阴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哼啊~……不只是小豆豆而已、整个小穴都……啊哈嗯~……♪」`,
        );
        // CFLAG:302  = 5（变量语义：CFLAG 族，302）
        kojo.舔阴 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.舔阴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「果，果然还是、${master_name}的手指、更加…啊~！嗯啊啊~……！」`,
        );
        // CFLAG:302  = 4（变量语义：CFLAG 族，302）
        kojo.舔阴 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.舔阴 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈呜！呜…呜…！」`);
        // CFLAG:302  = 3（变量语义：CFLAG 族，302）
        kojo.舔阴 = 3;
      } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「请快住手！不…不要啊……！」`);
        // CFLAG:302  = 2（变量语义：CFLAG 族，302）
        kojo.舔阴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 5) {
    if (kojo.胸爱抚 === 0) {
      if (era.get(`talent:${target}:130`) === 1) {
        if (era.get(`talent:${target}:136`) === 1) {
          await era.printAndWait(
            `「啊啊~…对狗狗的味道、对狗狗的舌头有反应了……${sc()}的乳房…母狗的奶要渗出来了啊${heart(1)}」`,
          );
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「明明是野狗作对象来的……淫乱的${sc()}的胸部、居然会溢出那么多的奶出来…${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「不、不要…这样的不要啊……啊啊……明明讨厌来着、胸部却……」`,
          );
        }
      } else if (era.get(`talent:${target}:136`) === 1) {
        await era.printAndWait(
          `「同样都是狗狗来的嘛…哼哼哼~${heart(1)} 可以的哦、请舔吧~……」`,
        );
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊嗯~、明明是野狗来的…明明是野狗来的~、身体却有反应了~…」`,
        );
      } else {
        await era.printAndWait(`「不要…！不要、在舔哪里呢……！」`);
      }
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306）
      kojo.胸爱抚 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        chara(target).chara.结婚对象 === 900 &&
        era.get(`talent:${target}:130`) === 1 &&
        (kojo.胸爱抚 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊哈啊~！老，老公大人真是的${heart(1)} 这样舔来舔去的话、乳房…乳房要~${heart(1)}」`,
        );
        // CFLAG:306  = 8（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 8;
      } else if (
        era.get(`talent:${target}:136`) === 1 &&
        chara(target).chara.结婚对象 === 900 &&
        (kojo.胸爱抚 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊~…好温柔啊~好温柔啊~、老公大人${heart(1)} 更加地、用力地疼爱${sc()}，也可以的哦…${heart(1)}」`,
        );
        // CFLAG:306  = 7（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 7;
      } else if (
        era.get(`talent:${target}:136`) === 1 &&
        (kojo.胸爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯~、比起乳房来…更加、像野兽一样嘛…啊啊、同样都是狗来的嘛、更加地…」`,
        );
        // CFLAG:306  = 6（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊嗯嗯~、嗯~、明明是野狗来的……真是的~、乳头居然…变成这样了呀~♪」`,
        );
        // CFLAG:306  = 5（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「嗯~、总觉得……有点舒服、又有点难受的…嗯~！」`);
        // CFLAG:306  = 4（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呜~！嗯…嗯呜~…！」`);
        // CFLAG:306  = 3（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 3;
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「真、真是好恶心啊……！」`);
        // CFLAG:306  = 2（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 6) {
    if (kojo.接吻 === 0 && game.train.初吻与自我口上) {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        chara(target).chara.结婚对象 === 900
      ) {
        era.print(`「啊啊~……${target_name}可爱的老公大人…」`);
        await era.printAndWait(
          `「只是和老公大人接吻……不像样的雌犬的身体热地就像着火一样了~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}和野狗的舌头互相缠绕在一起、露出一脸陶醉的微笑。`,
        );
      } else if (era.get(`talent:${target}:136`) === 1) {
        await era.printAndWait(
          `「第一次的kiss、对象居然是野狗…啊啊~、不管是身体还是心理都完全是母狗来的了…♪${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「吻被、野狗给夺走了…而且、还是第一次…哈啊啊~…要兴奋起来了啊~${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「不、不要……！${'\u3000'}呜呜~…怎么会……第一次…居然是，这样的野狗做对象什么的……」`,
        );
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      kojo.接吻 = 1;
      return 0;
    } else if (kojo.接吻 === 0) {
      if (era.get(`talent:${target}:136`) === 1) {
        await era.printAndWait(
          `「和野狗亲吻什么的、心脏还会小鹿乱撞什么的……唔哼哼~、${target_name}身心都变成雌犬了呢~${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「被野狗给、将嘴唇给夺走什么的……哈啊~…兴奋地好像身体都要燃起来了呀~」`,
        );
      } else {
        await era.printAndWait(`「怎么能……和野狗亲吻什么的……」`);
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      kojo.接吻 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        (kojo.接吻 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          era.print(`「哈啊~…真是好棒啊~${heart(1)}」`);
        } else {
          era.print(`「嗯~…好像要融化掉了一样啊~${heart(1)}」`);
        }
        // 同一行输出：无后缀 PRINTFORM 链，
        // 是 RAND:2 二选一的插入段，PRINTFORMW 收行（#623）
        await era.printAndWait(
          `${target_name}` +
            (rand_n(2) === 0 ? `一脸陶醉的表情` : `专心地`) +
            `和野狗用舌头缠绕在一起了。`,
        );
        // CFLAG:307  = 6（变量语义：CFLAG 族，307）
        kojo.接吻 = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.接吻 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「是魔王大人的命令的话…会欢喜地顺从的~」`);
        // CFLAG:307  = 5（变量语义：CFLAG 族，307）
        kojo.接吻 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.接吻 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「为什么啊……魔王大人……」`);
        } else {
          await era.printAndWait(
            `「这是在测试${target_name}的爱意吗……魔王大人……」`,
          );
        }
        // CFLAG:307  = 4（变量语义：CFLAG 族，307）
        kojo.接吻 = 4;
      } else if (
        era.get(`abl:${target}:10`) >= 2 &&
        (kojo.接吻 <= 2 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「和野狗亲吻什么的……」`);
        } else {
          await era.printAndWait(`「${target_name}明白了…会和狗亲吻的……」`);
        }
        // CFLAG:307  = 3（变量语义：CFLAG 族，307）
        kojo.接吻 = 3;
      } else if (kojo.接吻 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「好臭啊…啊啊~、这样的……」`);
        // CFLAG:307  = 2（变量语义：CFLAG 族，307）
        kojo.接吻 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 9) {
    if (kojo.舔肛 === 0) {
      if (era.get(`talent:${target}:136`) === 1) {
        await era.printAndWait(
          `「啊啊…屁股、更多更加尽情地、呸咯呸咯地舔吧~${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「哈呜~…那、那里是~啊嗯~${heart(1)}」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「好、好羞耻啊……」`);
      } else {
        await era.printAndWait(`「不要啊……请原、请原谅${target_name}吧……」`);
      }
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310）
      kojo.舔肛 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        (kojo.舔肛 <= 5 || game.kojo.口上开关 === 2)
      ) {
        era.print(`「哈啊…更尽情地、舔吧~…弄湿那里吧~……」`);
        await era.printAndWait(
          `「请处罚一下……${target_name}的不像样的屁股吧~」`,
        );
        // CFLAG:310  = 6（变量语义：CFLAG 族，310）
        kojo.舔肛 = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「真是奇怪的感觉呢~……」`);
        // CFLAG:310  = 5（变量语义：CFLAG 族，310）
        kojo.舔肛 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.舔肛 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「如果魔王大人希望这样的话……${target_name}会忍耐下来的」`,
        );
        // CFLAG:310  = 4（变量语义：CFLAG 族，310）
        kojo.舔肛 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.舔肛 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「如果是魔王大人的命令来的话……那就没有办法了呢……」`,
        );
        // CFLAG:310  = 3（变量语义：CFLAG 族，310）
        kojo.舔肛 = 3;
      } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「哼呜~…为什么要做这样的事情啊……」`);
        // CFLAG:310  = 2（变量语义：CFLAG 族，310）
        kojo.舔肛 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 21) {
    if (kojo.背后位 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        if (era.get(`talent:${target}:136`) === 1) {
          era.print(
            `「好高兴啊~${heart(1)} 将第一次先给犬大人什么的~……请、请粗鲁地侵犯${sc()}这只雌犬吧~${heart(3)}」`,
          );
          await era.printAndWait(
            `色情地四肢着地地趴在地上摇晃着屁股、浮现一副陶醉而恍惚的表情的${target_name}从嘴边流出了口水，还将舌头伸出来乱晃。`,
          );
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「初次的对象是野狗什么的~……对呢、作为献上像${target_name}这样的淫乱处女的对象还真是不错呢~${heart(1)}」`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「魔王大人……希望这样做的话，那${target_name}就接受其命运……」`,
          );
        } else {
          await era.printAndWait(`「不要啊啊~！！」`);
        }
      } else {
        if (era.get(`talent:${target}:136`) === 1) {
          era.print(
            `「是的…${sc()}的小穴是狗大人专用的 以后每天都会交尾的${heart(1)}」`,
          );
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(`「和狗做吗？ 呵呵…很期待呢${heart(1)}」`);
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(`「咕…魔王大人、请再考虑一下……」`);
        } else {
          await era.printAndWait(`「和狗什么的…不要啊！！」`);
        }
      }
      // CFLAG:322  = 1（变量语义：CFLAG 族，322）
      kojo.背后位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        (kojo.背后位 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (era.get(`tequip:${target}:53`)) {
          era.print(
            `「请看吧${heart(1)} 狗肉棒插进了${sc()}的小穴里……${heart(3)}」`,
          );
          era.print(
            `「狗肉棒${heart(1)} 深深地插进来了${heart(2)} 真正的交尾啊${heart(3)}」`,
          );
          era.print(
            `${target_name}四脚着地、一边向水晶球实况转播一边被狗侵犯着。`,
          );
          await era.printAndWait(`2匹野兽就那样互相寻求着沉溺在了肉欲里……`);
        } else if (rand_n(3) === 0) {
          era.print(`「啊嗯~${heart(1)} 想要更加更加激烈地做呢~${heart(3)}」`);
          era.print(`${target_name}四肢着地跪在地上、从背后被狗侵犯着。`);
          await era.printAndWait(
            `两头野兽也不在意周围的视线，互相追求着对方，沉浸在了肉欲当中……`,
          );
        } else if (rand_n(2) === 0) {
          era.print(`「啊啊啊~${heart(1)} 狗狗的大鸡巴嘴巴了${heart(3)}」`);
          await era.printAndWait(
            `${target_name}将作为人类的尊严完全丢掉了，作为一头野兽享受着被野狗侵犯所带来的快乐。`,
          );
        } else {
          era.print(
            `「请塞进来吧${heart(1)} 塞进${target_name}这个狗狗大人专用的肉便器里吧~${heart(1)} 」`,
          );
          await era.printAndWait(
            `如同邀请野狗一样将屁股生出来、让野狗看见那已经濡湿了的蜜穴，${target_name}露出了妖艳的笑容。`,
          );
        }
        // CFLAG:322  = 7（变量语义：CFLAG 族，322）
        kojo.背后位 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「相比魔王大人派过来的魔物们来说…狗什么的真的不算什么呢」`,
        );
        // CFLAG:322  = 6（变量语义：CFLAG 族，322）
        kojo.背后位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.背后位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「魔王大人…${target_name}会一生都努力侍奉您的、所以……请大发慈悲吧」`,
          );
        } else {
          await era.printAndWait(`「请…请不要看着${target_name}的这种样子……」`);
        }
        // CFLAG:322  = 5（变量语义：CFLAG 族，322）
        kojo.背后位 = 5;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈啊~…~……才，才没有对狗的鸡巴有感觉了呢……」`);
        // CFLAG:322  = 4（变量语义：CFLAG 族，322）
        kojo.背后位 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「这不是开玩笑来的对吧……」`);
        // CFLAG:322  = 3（变量语义：CFLAG 族，322）
        kojo.背后位 = 3;
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「请、请原谅${target_name}了吧…拜托了、拜托了……」`,
        );
        // CFLAG:322  = 2（变量语义：CFLAG 族，322）
        kojo.背后位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 27) {
    if (kojo.背后位肛交 === 0) {
      if (era.get(`talent:${target}:136`) === 1) {
        era.print(`${target_name}晃动着屁股引诱着野狗`);

        await era.printAndWait(`「${sc()}的不净之穴在这边${heart(1)}」`);
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「这种肮脏的行为、还是第一次♪」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「这种肮脏的行为、还是第一次♪」`);
      } else {
        await era.printAndWait(`「这种肮脏的行为、我不想干啊……」`);
      }
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328）
      kojo.背后位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (era.get(`tequip:${target}:53`)) {
          era.print(
            `${target_name}通过水晶球看着自己和不净之物联系在一起的光景`,
          );
          era.print(`「请欣赏吧…${sc()}的肛门小穴被狗肉棒插到了深处…」`);
          era.print(
            `「${sc()}…有感觉了${heart(1)} 请欣赏因为不净之穴在含着狗肉棒而有感觉的${sc()}吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}带着快乐得快要融化了的表情实况转播自己的行为`,
          );
        } else if (rand_n(2) === 0) {
          era.print(`${target_name}因为肛穴的感觉而融化掉了`);
          era.print(`「狗狗大人的大鸡巴…塞满了${sc()}的粪穴了呀…♪」`);
          await era.printAndWait(
            `到了这种程度的话，${target_name}已经变不回来了吧`,
          );
        } else {
          era.print(`${target_name}兴奋地将屁股给张开了`);
          era.print(`「狗狗大人~…如果${sc()}的粪穴没关系的话请使用吧…」`);
          await era.printAndWait(
            `${target_name}向野兽献媚的姿态简直连畜生都不如`,
          );
        }
        // CFLAG:328  = 7（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「因为这种肮脏的行为而有感觉的${sc()}…是变态啊」`,
        );
        // CFLAG:328  = 6（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「因为这种肮脏的行为而有感觉的${sc()}…是变态啊」`,
        );
        // CFLAG:328  = 5（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.背后位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「这是多么肮脏啊」`);
        // CFLAG:328  = 4（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「用狗的东西…做这么肮脏的行为…才不会有感觉的…」`,
        );
        // CFLAG:328  = 3（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 3;
      } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「好肮脏啊…」`);
        // CFLAG:328  = 2（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 56) {
    const family = era.get(`talent:${target}:320`) || 0;
    const local_3 = Math.floor((family % 1000) / 100);
    const local_4 = Math.floor((family % 10000) / 1000);
    const local_5 = Math.floor((family % 1000000) / 100000);
    const local_6 = Math.floor((family % 10000000) / 1000000);
    const local_7 = Math.floor((family % 100000000) / 10000000);
    const local_8 = Math.floor((family % 1000000000) / 100000000);
    const local_9 = local_5 + local_6 + local_7 + local_8;

    if (kojo.交谈 === 0) {
      if (era.get(`tequip:${target}:53`)) {
        if (
          era.get(`talent:${target}:136`) === 1 &&
          chara(target).chara.结婚对象 === 900
        ) {
          await era.printAndWait(
            `「观赏这个的大家、初次见面。${sc()}是${target_name}」`,
          );
          await era.printAndWait(
            `「今天${sc()}和丈夫大人的……关系和睦的、交尾，请您欣赏」`,
          );
          if (era.get(`talent:${target}:157`)) {
            await era.printAndWait(
              `「亲爱的、你看到了吗？${'\u3000'}${sc()}现在正和这么棒的丈夫大人互相疼爱着呢♪」`,
            );
          }
          await era.printAndWait(`这么说着的${target_name}把脸颊贴向了野狗`);
          await era.printAndWait(
            `「唔呼……好期待呢。母狗的${sc()}稍稍动了动腰……」`,
          );
          await era.printAndWait(
            `「流着口水发情的身姿、请您一边尽情欣赏一边手淫吧♪」`,
          );

          if (local_3 && local_4) {
            await era.printAndWait(
              `「${sc()}是有女儿和儿子的♪${'\u3000'}看啊～♪${'\u3000'}妈妈和狗结婚了啊♪」`,
            );
            await era.printAndWait(`「这是你们的……新爸爸哦♪」`);
          } else if (local_3) {
            await era.printAndWait(
              `「${sc()}是有女儿♪${'\u3000'}看啊～♪${'\u3000'}妈妈和狗结婚了啊♪」`,
            );
            await era.printAndWait(`「这是你的……新爸爸哦♪」`);
          } else if (local_4) {
            await era.printAndWait(
              `「${sc()}是有儿子♪${'\u3000'}看啊～♪${'\u3000'}妈妈和狗结婚了啊♪」`,
            );
            await era.printAndWait(`「这是你的……新爸爸哦♪」`);
          }

          if (local_9 > 0) {
            // 同一行输出：无后缀 PRINTFORM/PRINT 链，
            // 是 15 支兄弟姊妹称呼的 IF/ELSEIF（末支 ELSE 保底处理），
            // 的 PRINTFORMW 收行（#623）
            await era.printAndWait(
              `「${sc()}是有` +
                (local_5 && local_6 && local_7 && local_8
                  ? `姐姐，哥哥，弟弟，妹妹`
                  : local_5 && local_6 && local_7
                    ? `姐姐，哥哥，妹妹`
                    : local_5 && local_6 && local_8
                      ? `姐姐，哥哥，弟弟`
                      : local_5 && local_7 && local_8
                        ? `姐姐，弟弟，妹妹`
                        : local_6 && local_7 && local_8
                          ? `哥哥，弟弟，妹妹`
                          : local_5 && local_6
                            ? `姐姐和哥哥`
                            : local_5 && local_8
                              ? `姐姐和弟弟`
                              : local_5 && local_7
                                ? `姐姐和妹妹`
                                : local_6 && local_8
                                  ? `哥哥和弟弟`
                                  : local_6 && local_7
                                    ? `哥哥和妹妹`
                                    : local_7 && local_8
                                      ? `弟弟和妹妹`
                                      : local_5
                                        ? `姐姐`
                                        : local_6
                                          ? `哥哥`
                                          : local_7
                                            ? `妹妹`
                                            : local_8
                                              ? `弟弟`
                                              : `兄弟姐妹`) +
                `的♪」`,
            );

            if (local_5 && local_6) {
              await era.printAndWait(
                `「姐姐哥哥♪${'\u3000'}你们重要的妹妹${target_name}堕落成母狗了♪」`,
              );
              await era.printAndWait(
                `「请欣赏血脉相连的妹妹和野兽性交的身姿吧、如果可以的话就送来断绝关系书信吧♪」`,
              );
            } else if (local_5) {
              await era.printAndWait(
                `「姐姐♪${'\u3000'}你重要的妹妹${target_name}堕落成母狗了♪」`,
              );
              await era.printAndWait(
                `「请欣赏血脉相连的妹妹和野兽性交的身姿吧、如果可以的话就送来断绝关系书信吧♪」`,
              );
            } else if (local_6) {
              await era.printAndWait(
                `「哥哥♪${'\u3000'}你重要的妹妹${target_name}堕落成母狗了♪」`,
              );
              await era.printAndWait(
                `「请欣赏血脉相连的妹妹和野兽性交的身姿吧、哥哥看着来手淫吧♪」`,
              );
            }

            if (local_7 && local_8) {
              await era.printAndWait(
                `「可爱的弟弟和妹妹♪${'\u3000'}你们的姐姐毫不在乎的在和动物交尾♪」`,
              );
              await era.printAndWait(
                `「今后会充分的进行性教育♪${'\u3000'}以后也会送映像过去的记得要看哦♪」`,
              );
            } else if (local_7) {
              await era.printAndWait(
                `「可爱的妹妹♪${'\u3000'}你的姐姐毫不在乎的在和动物交尾♪」`,
              );
              await era.printAndWait(
                `「我是个变态的姐姐真对不起♪${'\u3000'}在故乡被欺负被强奸了的话就来魔王大人这里吧♪」`,
              );
            } else if (local_8) {
              await era.printAndWait(
                `「可爱的弟弟♪${'\u3000'}你的姐姐毫不在乎的在和动物交尾♪」`,
              );
              await era.printAndWait(
                `「我是个变态的姐姐真对不起♪${'\u3000'}看着女人作为雌性的身姿、手淫一下可爱的包茎肉棒吧♪」`,
              );
            }
          }
        } else if (era.get(`talent:${target}:136`) === 1) {
          await era.printAndWait(
            `「观赏这个的大家、初次见面。${sc()}是${target_name}」`,
          );
          await era.printAndWait(
            `「今天${sc()}和主人大人的……关系和睦的、交尾，请您欣赏」`,
          );
          await era.printAndWait(`这么说着的${target_name}把脸颊贴向了野狗`);
          await era.printAndWait(
            `「唔呼……好期待呢。母狗的${sc()}稍稍动了动腰……」`,
          );
          await era.printAndWait(
            `「流着口水发情的身姿、请您一边尽情欣赏一边手淫吧♪」`,
          );

          if (local_3 && local_4) {
            await era.printAndWait(
              `「${sc()}是有女儿和儿子的♪${'\u3000'}看啊～♪${'\u3000'}妈妈服从于狗了♪」`,
            );
            await era.printAndWait(
              `「你们的妈妈身为雌性的姿态、请尽情欣赏吧♪」`,
            );
          } else if (local_3) {
            await era.printAndWait(
              `「${sc()}是有女儿的♪${'\u3000'}看啊～♪${'\u3000'}妈妈服从于狗了♪」`,
            );
            await era.printAndWait(`「你的妈妈身为雌性的姿态、请尽情欣赏吧♪」`);
          } else if (local_4) {
            await era.printAndWait(
              `「${sc()}是有儿子的♪${'\u3000'}看啊～♪${'\u3000'}妈妈服从于狗了♪」`,
            );
            await era.printAndWait(`「你的妈妈身为雌性的姿态、请尽情欣赏吧♪」`);
          }

          if (local_9 > 0) {
            // 同一行输出：无后缀 PRINTFORM/PRINT 链，
            // 是 15 支兄弟姊妹称呼的 IF/ELSEIF（末支 ELSE 保底处理），
            // 的 PRINTFORMW 收行（#623）
            await era.printAndWait(
              `「${sc()}是有` +
                (local_5 && local_6 && local_7 && local_8
                  ? `姐姐，哥哥，弟弟，妹妹`
                  : local_5 && local_6 && local_7
                    ? `姐姐，哥哥，妹妹`
                    : local_5 && local_6 && local_8
                      ? `姐姐，哥哥，弟弟`
                      : local_5 && local_7 && local_8
                        ? `姐姐，弟弟，妹妹`
                        : local_6 && local_7 && local_8
                          ? `哥哥，弟弟，妹妹`
                          : local_5 && local_6
                            ? `姐姐和哥哥`
                            : local_5 && local_8
                              ? `姐姐和弟弟`
                              : local_5 && local_7
                                ? `姐姐和妹妹`
                                : local_6 && local_8
                                  ? `哥哥和弟弟`
                                  : local_6 && local_7
                                    ? `哥哥和妹妹`
                                    : local_7 && local_8
                                      ? `弟弟和妹妹`
                                      : local_5
                                        ? `姐姐`
                                        : local_6
                                          ? `哥哥`
                                          : local_7
                                            ? `妹妹`
                                            : local_8
                                              ? `弟弟`
                                              : `兄弟姐妹`) +
                `的♪」`,
            );

            if (local_5 && local_6) {
              await era.printAndWait(
                `「姐姐哥哥♪${'\u3000'}你们重要的妹妹${target_name}堕落成母狗了♪」`,
              );
              await era.printAndWait(
                `「请欣赏血脉相连的妹妹和野兽性交的身姿吧、如果可以的话就送来断绝关系书信吧♪」`,
              );
            } else if (local_5) {
              await era.printAndWait(
                `「姐姐♪${'\u3000'}你重要的妹妹${target_name}堕落成母狗了♪」`,
              );
              await era.printAndWait(
                `「请欣赏血脉相连的妹妹和野兽性交的身姿吧、如果可以的话就送来断绝关系书信吧♪」`,
              );
            } else if (local_6) {
              await era.printAndWait(
                `「哥哥♪${'\u3000'}你重要的妹妹${target_name}堕落成母狗了♪」`,
              );
              await era.printAndWait(
                `「请欣赏血脉相连的妹妹和野兽性交的身姿吧、哥哥看着来手淫吧♪」`,
              );
            }

            if (local_7 && local_8) {
              await era.printAndWait(
                `「可爱的弟弟和妹妹♪${'\u3000'}你们的姐姐毫不在乎的在和动物交尾♪」`,
              );
              await era.printAndWait(
                `「今后会充分的进行性教育♪${'\u3000'}以后也会送映像过去的记得要看哦♪」`,
              );
            } else if (local_7) {
              await era.printAndWait(
                `「可爱的妹妹♪${'\u3000'}你的姐姐毫不在乎的在和动物交尾♪」`,
              );
              await era.printAndWait(
                `「我是个变态的姐姐真对不起♪${'\u3000'}在故乡被欺负被强奸了的话就来魔王大人这里吧♪」`,
              );
            } else if (local_8) {
              await era.printAndWait(
                `「可爱的弟弟♪${'\u3000'}你的姐姐毫不在乎的在和动物交尾♪」`,
              );
              await era.printAndWait(
                `「我是个变态的姐姐真对不起♪${'\u3000'}看着女人作为雌性的身姿、手淫一下可爱的包茎肉棒吧♪」`,
              );
            }
          }
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「观赏这个的大家、初次见面。${sc()}是${target_name}」`,
          );
          await era.printAndWait(`「今天请欣赏${sc()}和野狗的交尾」`);
          await era.printAndWait(`「虽然很不习惯、请您一边欣赏一边手淫♪」`);
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「观赏这个的大家、初次见面。${sc()}是${target_name}」`,
          );
          await era.printAndWait(`「今天请欣赏${sc()}和野狗的交尾」`);
          await era.printAndWait(`「虽然很不习惯、请您一边欣赏一边手淫♪」`);
        } else {
          await era.printAndWait(
            `「观赏这个的大家、初次见面。${sc()}是${target_name}」`,
          );
          await era.printAndWait(`「今天……唔、${sc()}和野狗……不、不行」`);
          await era.printAndWait(`「饶了我吧……饶了我吧……」`);
        }
      }
      // CFLAG:357  = 1（变量语义：CFLAG 族，357）
      kojo.交谈 = 1;
      return 0;
    } else {
      if (era.get(`tequip:${target}:53`)) {
        if (
          era.get(`talent:${target}:136`) === 1 &&
          chara(target).chara.结婚对象 === 900 &&
          (kojo.胸爱抚 <= 5 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「观赏这个的大家、初次见面。${sc()}是${target_name}」`,
          );
          await era.printAndWait(
            `「今天${sc()}和丈夫大人的……关系和睦的、交尾，请您欣赏」`,
          );
          if (era.get(`talent:${target}:157`)) {
            await era.printAndWait(
              `「亲爱的、你看到了吗？${'\u3000'}${sc()}今天也想要变成野兽哦♪♪」`,
            );
          }
          await era.printAndWait(`这么说着的${target_name}把脸颊贴向了野狗`);
          await era.printAndWait(
            `「唔呼……好期待呢。母狗的${sc()}稍稍动了动腰……」`,
          );
          await era.printAndWait(
            `「流着口水发情的身姿、请您一边尽情欣赏一边手淫吧♪」`,
          );

          if (local_3 && local_4) {
            await era.printAndWait(
              `「${sc()}是有女儿和儿子的♪${'\u3000'}看啊～♪${'\u3000'}新爸爸的大鸡巴♪」`,
            );
            await era.printAndWait(
              `「为了制造出你们的新的弟弟妹妹、我会和新的爸爸一起努力造孩子的♪」`,
            );
          } else if (local_3) {
            await era.printAndWait(
              `「${sc()}是有女儿的♪${'\u3000'}看啊～♪${'\u3000'}新爸爸的大鸡巴♪」`,
            );
            await era.printAndWait(
              `「为了制造出你的新的弟弟妹妹、我会和新的爸爸一起努力造孩子的♪」`,
            );
          } else if (local_4) {
            await era.printAndWait(
              `「${sc()}是有儿子的♪${'\u3000'}看啊～♪${'\u3000'}新爸爸的大鸡巴♪」`,
            );
            await era.printAndWait(
              `「为了制造出你的新的弟弟妹妹、我会和新的爸爸一起努力造孩子的♪」`,
            );
          }

          if (local_9 > 0) {
            // 同一行输出：无后缀 PRINTFORM/PRINT 链，
            // 是 15 支兄弟姊妹称呼的 IF/ELSEIF（末支 ELSE 保底处理），
            // 的 PRINTFORMW 收行（#623）
            await era.printAndWait(
              `「${sc()}是有` +
                (local_5 && local_6 && local_7 && local_8
                  ? `姐姐，哥哥，弟弟，妹妹`
                  : local_5 && local_6 && local_7
                    ? `姐姐，哥哥，妹妹`
                    : local_5 && local_6 && local_8
                      ? `姐姐，哥哥，弟弟`
                      : local_5 && local_7 && local_8
                        ? `姐姐，弟弟，妹妹`
                        : local_6 && local_7 && local_8
                          ? `哥哥，弟弟，妹妹`
                          : local_5 && local_6
                            ? `姐姐和哥哥`
                            : local_5 && local_8
                              ? `姐姐和弟弟`
                              : local_5 && local_7
                                ? `姐姐和妹妹`
                                : local_6 && local_8
                                  ? `哥哥和弟弟`
                                  : local_6 && local_7
                                    ? `哥哥和妹妹`
                                    : local_7 && local_8
                                      ? `弟弟和妹妹`
                                      : local_5
                                        ? `姐姐`
                                        : local_6
                                          ? `哥哥`
                                          : local_7
                                            ? `妹妹`
                                            : local_8
                                              ? `弟弟`
                                              : `兄弟姐妹`) +
                `的♪」`,
            );

            if (local_5 && local_6) {
              await era.printAndWait(
                `「姐姐哥哥♪${'\u3000'}你们重要的妹妹${target_name}今天也正在发情中♪」`,
              );
              await era.printAndWait(
                `「请欣赏血脉相连的妹妹像野兽性交的身姿吧、如果可以的话就送来断绝关系书信吧♪」`,
              );
            } else if (local_5) {
              await era.printAndWait(
                `「姐姐♪${'\u3000'}你们重要的妹妹${target_name}今天也正在发情中♪」`,
              );
              await era.printAndWait(
                `「请欣赏血脉相连的妹妹像野兽性交的身姿吧、如果可以的话就送来断绝关系书信吧♪」`,
              );
            } else if (local_6) {
              await era.printAndWait(
                `「哥哥♪${'\u3000'}你们重要的妹妹${target_name}今天也正在发情中♪」`,
              );
              await era.printAndWait(
                `「请欣赏血脉相连的妹妹像野兽性交的身姿吧、如果可以的话就送来断绝关系书信吧♪」`,
              );
            }

            if (local_7 && local_8) {
              await era.printAndWait(
                `「可爱的弟弟和妹妹♪${'\u3000'}今天也送去了你们的姐姐发情的身姿的影像了♪」`,
              );
              await era.printAndWait(
                `「有好好的学习H的事情吗♪${'\u3000'}以后也会一直送映像过去的记得要看哦♪」`,
              );
            } else if (local_7) {
              await era.printAndWait(
                `「可爱的妹妹♪${'\u3000'}今天也送去了你们的姐姐发情的身姿的影像了♪」`,
              );
              await era.printAndWait(
                `「我是个变态的姐姐真对不起♪${'\u3000'}在故乡被欺负被强奸了的话就来魔王大人这里吧♪」`,
              );
            } else if (local_8) {
              await era.printAndWait(
                `「可爱的弟弟♪${'\u3000'}今天也送去了你们的姐姐发情的身姿的影像了♪」`,
              );
              await era.printAndWait(
                `「我是个变态的姐姐真对不起♪${'\u3000'}看着女人作为雌性的身姿、手淫一下可爱的包茎肉棒吧♪」`,
              );
            }
          }

          // CFLAG:357  = 6（变量语义：CFLAG 族，357）
          kojo.交谈 = 6;
        } else if (
          era.get(`talent:${target}:136`) === 1 &&
          (kojo.交谈 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「观赏这个的大家、初次见面。${sc()}是${target_name}」`,
          );
          await era.printAndWait(
            `「今天${sc()}和主人大人的……关系和睦的、交尾，请您欣赏」`,
          );
          await era.printAndWait(`这么说着的${target_name}把脸颊贴向了野狗`);
          await era.printAndWait(
            `「唔呼……好期待呢。母狗的${sc()}稍稍动了动腰……」`,
          );
          await era.printAndWait(
            `「流着口水发情的身姿、请您一边尽情欣赏一边手淫吧♪」`,
          );

          if (local_3 && local_4) {
            await era.printAndWait(
              `「${sc()}是有女儿和儿子的♪${'\u3000'}看啊～♪${'\u3000'}妈妈对狗发情了♪」`,
            );
            await era.printAndWait(
              `「你们的妈妈身为雌性的姿态、请尽情欣赏吧♪」`,
            );
          } else if (local_3) {
            await era.printAndWait(
              `「${sc()}是有女儿的♪${'\u3000'}看啊～♪${'\u3000'}妈妈对狗发情了♪」`,
            );
            await era.printAndWait(`「你的妈妈身为雌性的姿态、请尽情欣赏吧♪」`);
          } else if (local_4) {
            await era.printAndWait(
              `「${sc()}是有儿子的♪${'\u3000'}看啊～♪${'\u3000'}妈妈对狗发情了♪」`,
            );
            await era.printAndWait(`「你的妈妈身为雌性的姿态、请尽情欣赏吧♪」`);
          }

          if (local_9 > 0) {
            // 同一行输出：无后缀 PRINTFORM/PRINT 链，
            // 是 15 支兄弟姊妹称呼的 IF/ELSEIF（末支 ELSE 保底处理），
            // 的 PRINTFORMW 收行（#623）
            await era.printAndWait(
              `「${sc()}是有` +
                (local_5 && local_6 && local_7 && local_8
                  ? `姐姐，哥哥，弟弟，妹妹`
                  : local_5 && local_6 && local_7
                    ? `姐姐，哥哥，妹妹`
                    : local_5 && local_6 && local_8
                      ? `姐姐，哥哥，弟弟`
                      : local_5 && local_7 && local_8
                        ? `姐姐，弟弟，妹妹`
                        : local_6 && local_7 && local_8
                          ? `哥哥，弟弟，妹妹`
                          : local_5 && local_6
                            ? `姐姐和哥哥`
                            : local_5 && local_8
                              ? `姐姐和弟弟`
                              : local_5 && local_7
                                ? `姐姐和妹妹`
                                : local_6 && local_8
                                  ? `哥哥和弟弟`
                                  : local_6 && local_7
                                    ? `哥哥和妹妹`
                                    : local_7 && local_8
                                      ? `弟弟和妹妹`
                                      : local_5
                                        ? `姐姐`
                                        : local_6
                                          ? `哥哥`
                                          : local_7
                                            ? `妹妹`
                                            : local_8
                                              ? `弟弟`
                                              : `兄弟姐妹`) +
                `的♪」`,
            );

            if (local_5 && local_6) {
              await era.printAndWait(
                `「姐姐哥哥♪${'\u3000'}你们重要的妹妹${target_name}今天也正在发情中♪」`,
              );
              await era.printAndWait(
                `「请欣赏血脉相连的妹妹像野兽性交的身姿吧、如果可以的话就送来断绝关系书信吧♪」`,
              );
            } else if (local_5) {
              await era.printAndWait(
                `「姐姐♪${'\u3000'}你们重要的妹妹${target_name}今天也正在发情中♪」`,
              );
              await era.printAndWait(
                `「请欣赏血脉相连的妹妹像野兽性交的身姿吧、如果可以的话就送来断绝关系书信吧♪」`,
              );
            } else if (local_6) {
              await era.printAndWait(
                `「哥哥♪${'\u3000'}你们重要的妹妹${target_name}今天也正在发情中♪」`,
              );
              await era.printAndWait(
                `「请欣赏血脉相连的妹妹像野兽性交的身姿吧、如果可以的话就送来断绝关系书信吧♪」`,
              );
            }

            if (local_7 && local_8) {
              await era.printAndWait(
                `「可爱的弟弟和妹妹♪${'\u3000'}今天也送去了你们的姐姐发情的身姿的影像了♪」`,
              );
              await era.printAndWait(
                `「有好好的学习H的事情吗♪${'\u3000'}以后也会一直送映像过去的记得要看哦♪」`,
              );
            } else if (local_7) {
              await era.printAndWait(
                `「可爱的妹妹♪${'\u3000'}今天也送去了你们的姐姐发情的身姿的影像了♪」`,
              );
              await era.printAndWait(
                `「我是个变态的姐姐真对不起♪${'\u3000'}在故乡被欺负被强奸了的话就来魔王大人这里吧♪」`,
              );
            } else if (local_8) {
              await era.printAndWait(
                `「可爱的弟弟♪${'\u3000'}今天也送去了你们的姐姐发情的身姿的影像了♪」`,
              );
              await era.printAndWait(
                `「我是个变态的姐姐真对不起♪${'\u3000'}看着女人作为雌性的身姿、手淫一下可爱的包茎肉棒吧♪」`,
              );
            }
          }

          // CFLAG:357  = 5（变量语义：CFLAG 族，357）
          kojo.交谈 = 5;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.交谈 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「观赏这个的大家、初次见面。${sc()}是${target_name}」`,
          );
          await era.printAndWait(`「今天请欣赏${sc()}和野狗的交尾」`);
          await era.printAndWait(`「虽然很不习惯、请您一边欣赏一边手淫♪」`);
          // CFLAG:357  = 4（变量语义：CFLAG 族，357）
          kojo.交谈 = 4;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.交谈 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「观赏这个的大家、初次见面。${sc()}是${target_name}」`,
          );
          await era.printAndWait(`「今天请欣赏${sc()}和野狗的交尾」`);
          await era.printAndWait(`「虽然很不习惯、请您一边欣赏一边手淫♪」`);
          // CFLAG:357  = 3（变量语义：CFLAG 族，357）
          kojo.交谈 = 3;
        } else if (kojo.交谈 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(
            `「观赏这个的大家、初次见面。${sc()}是${target_name}」`,
          );
          await era.printAndWait(`「今天……唔、${sc()}和野狗……不、不行」`);
          await era.printAndWait(`「饶了我吧……饶了我吧……」`);
          // CFLAG:357  = 2（变量语义：CFLAG 族，357）
          kojo.交谈 = 2;
        }
      }
      return 0;
    }
  }
  return 0;
}

async function colosseum_kojo_3(rand) {
  void rand;
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const master_name = chara_name(0);
  const assi = era_flag.assi;
  const assi_name = assi >= 0 ? chara_callname(assi) : '';
  const sc = () => self_call(target);
  const scf = () => self_call_first(target);

  if (era_flag.selectcom === 55) {
    if (era.get(`base:${target}:1`) <= 0) {
      await era.printAndWait(`${target_name}连站起来的力气都没有的样子……`);
    } else {
      await era.printAndWait(
        `${target_name}被角斗场的热气和被接下来要战斗的对手凝视着而吓得直发抖……`,
      );
    }
    return 0;
  }

  if (era_flag.selectcom === 56) {
    if (era.get(`base:${target}:1`) <= 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「请，请不要继续下去了……」`);
        await era.printAndWait(
          `气力用尽了的${target_name}在角斗场的土地之上喘气已经是极限了的样子……`,
        );
      } else {
        await era.printAndWait(`「不…不要啊……被那么侵犯了什么的…不要啊……」`);
        await era.printAndWait(
          `气力用尽了的${target_name}在角斗场的土地之上喘气已经是极限了的样子……`,
        );
      }
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「跟${assi_name}做对手什么的…根本不知道啊……」`);
        await era.printAndWait(
          `${target_name}看着收到${master_name}的指令而武装起来的${assi_name}留下了冷汗……`,
        );
      } else {
        await era.printAndWait(`「居，居然会有这么丑陋的生物存在什么的……！」`);
        await era.printAndWait(
          `${target_name}看到了在角斗场上丑陋的生物感到了恐惧……`,
        );
      }
    }
    return 0;
  }

  if (era_flag.selectcom === 31) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(
        `「啊哼嗯…嗯呜…再、再这样做的话…呜噗嗯！？嗯噗嗯嗯噗嗯……！」`,
      );
      // 同一行输出：无后缀 PRINTFORM 链，
      // 是两个 SIF 插入段（可都为假），PRINTFORMW 收行（#623）
      const assi_penis =
        era.get(`talent:${assi}:121`) === 1 ||
        era.get(`talent:${assi}:122`) === 1;
      const assi_band =
        era.get(`talent:${assi}:121`) !== 1 &&
        era.get(`talent:${assi}:122`) !== 1 &&
        era.get('item:4') === 1;
      await era.printAndWait(
        `${assi_name}用` +
          (assi_penis ? `大鸡巴` : assi_band ? `假阳具` : '') +
          `让${target_name}吸着，露出了愉悦的表情……`,
      );
    } else {
      await era.printAndWait(
        `「啊啊…这，这么臭的东西…嗯呜…嗯噗…嗯啾…噗噜呸……」`,
      );
      await era.printAndWait(
        `${target_name}舔舐着闻着就让人想吐的味道的阴茎……`,
      );
    }
    return 0;
  }

  if (era_flag.selectcom === 5) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(
        `「哈呜~…呜…哪，哪怕被做这样的事情${sc()}也…啊呜~！」`,
      );
      await era.printAndWait(`${target_name}的胸部，被持续地揉着……`);
    } else {
      await era.printAndWait(
        `「快…快放开手！${sc()}才不会因为这种事情…呜呼嗯！！」`,
      );
      await era.printAndWait(
        `${target_name}因为胸部被大力地揉着而从嘴边漏出了痛苦的声音……`,
      );
    }
    return 0;
  }

  if (era_flag.selectcom === 21) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(
        `「啊啊~！不，不行的啊…这样…强行做这样的…啊啊啊啊！」`,
      );
      // 与上一段同型（#623）
      const assi_penis =
        era.get(`talent:${assi}:121`) === 1 ||
        era.get(`talent:${assi}:122`) === 1;
      const assi_band =
        era.get(`talent:${assi}:121`) !== 1 &&
        era.get(`talent:${assi}:122`) !== 1 &&
        era.get('item:4') === 1;
      await era.printAndWait(
        `${assi_name}一边听着悲鸣一边用` +
          (assi_penis ? `大鸡巴` : assi_band ? `假阳具` : '') +
          `将${target_name}的小穴毫不留情地侵犯着……`,
      );
    } else if (game.train.死斗场敌种 === 206) {
      await era.printAndWait(`「噶啊…呃哈啊…呃啊啊…呜啊啊啊……」`);
      await era.printAndWait(
        `可怜的${target_name}发出了如同蟾蜍被碾碎了一样的声音，继续被巨魔侵犯着……`,
      );
    } else {
      await era.printAndWait(`「不…不要啊…这样的…${scf()}、${sc()}的…啊啊！」`);
      await era.printAndWait(`${target_name}继续被怪物侵犯着……`);
    }
    return 0;
  }

  if (era_flag.selectcom === 27) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(`「啊啊~！啊~啊啊~！屁股…要坏掉了啊~…~！」`);
      // 与上一段同型（#623）
      const assi_penis =
        era.get(`talent:${assi}:121`) === 1 ||
        era.get(`talent:${assi}:122`) === 1;
      const assi_band =
        era.get(`talent:${assi}:121`) !== 1 &&
        era.get(`talent:${assi}:122`) !== 1 &&
        era.get('item:4') === 1;
      await era.printAndWait(
        `${assi_name}一边听着悲鸣一边用` +
          (assi_penis ? `大鸡巴` : assi_band ? `假阳具` : '') +
          `将${target_name}的肛穴毫不留情地侵犯着……`,
      );
    } else if (game.train.死斗场敌种 === 206) {
      await era.printAndWait(`「呃啊…呃哈啊…呜呃…呜呃呃呃……」`);
      await era.printAndWait(
        `可怜的${target_name}发出了如同蟾蜍被碾碎了一样的声音，继续被巨魔侵犯着……`,
      );
    } else {
      await era.printAndWait(
        `「不…不要啊…这样的…${scf()}、${sc()}的…啊啊！的肛门啊啊啊！」`,
      );
      await era.printAndWait(`${target_name}继续被怪物侵犯着肛门……`);
    }
    return 0;
  }

  if (era_flag.selectcom === 51) {
    await era.printAndWait(`「这种…区区媚薬而已……啊呜嗯！」`);
    return 0;
  }

  return 0;
}

async function kojo_message_palamcng_3(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const sc = () => self_call(target);
  const scf = () => self_call_first(target);
  const kojo = chara(target).kojo;
  const train = chara(target).train;
  let p = 0;
  let a_up = 0;

  if (era_flag.assi > 0 && era_flag.assiplay) {
    return 0;
  }

  if (era.get(`tequip:${target}:45`)) {
    return 0;
  }

  if (game.train.失神) {
    return 0;
  }

  if (era.get(`talent:${target}:9`) === 1) {
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

  p = (era.get(`palam:${target}:3`) || 0) + train.润滑增量;
  if (p > PALAMLV[2] && kojo.首次润滑Lv2 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      if (era_flag.selectcom === 50) {
        await era.printAndWait(`「哈嗯呜~…好、冷啊~…而且还黏糊糊地~~…」`);
        await era.printAndWait(`―――第一次超过了润滑lv2了。`);
      } else {
        await era.printAndWait(`「啊哈啊~…股间…黏糊糊湿哒哒地…${heart(1)}」`);
        await era.printAndWait(`―――第一次超过了润滑lv2了。`);
      }
    } else {
      if (era_flag.selectcom === 50) {
        await era.printAndWait(`「这，这种液体什么的…才，才不舒服呢………」`);
        await era.printAndWait(`―――第一次超过了润滑lv2了。`);
      } else {
        await era.printAndWait(`「啊~…这，这个难道是…漏，漏了…啊啊…」`);
        await era.printAndWait(`―――第一次超过了润滑lv2了。`);
      }
    }
    // CFLAG:TARGET:221  = 1（变量语义：CFLAG 族，TARGET:221）
    kojo.首次润滑Lv2 = 1;
  }

  p = (era.get(`palam:${target}:5`) || 0) + train.欲情增量;
  if (p > PALAMLV[2] && kojo.首次欲情Lv2 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      if (era_flag.selectcom === 51) {
        await era.printAndWait(
          `「不，不行…被这种药…输给这种药不行…明明不可以来的…${heart(1)}」`,
        );
        await era.printAndWait(`―――第一次超过了欲情lv2了。`);
      } else {
        await era.printAndWait(
          `「啊、啊啊…忍，忍耐…不住了啦…请抱，抱一下好吗~………」`,
        );
        await era.printAndWait(`―――第一次超过了欲情lv2了。`);
      }
    } else {
      if (era_flag.selectcom === 51) {
        await era.printAndWait(
          `「真，真是卑鄙…输给这种药…可不行的…....明明不行的…」`,
        );
        await era.printAndWait(`―――第一次超过了欲情lv2了。`);
      } else {
        await era.printAndWait(`「哈啊…啊啊~…稍，稍微摸一下…也可以吧………」`);
        await era.printAndWait(`―――第一次超过了欲情lv2了。`);
      }
    }
    // CFLAG:222  = 1（变量语义：CFLAG 族，222）
    kojo.首次欲情Lv2 = 1;
  }

  p = (era.get(`palam:${target}:8`) || 0) + (era.get(`delta:${target}:8`) || 0); // palam:8 无 train 门面
  if (p > PALAMLV[2] && kojo.首次耻情Lv2 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`「哈呜~${heart(1)} 请、请不要看过来…」`);
      await era.printAndWait(`―――第一次超过了耻情lv2了。`);
    } else {
      await era.printAndWait(`「看，看过来可不行啊………」`);
      await era.printAndWait(`―――第一次超过了耻情lv2了。`);
    }
    // CFLAG:223  = 1（变量语义：CFLAG 族，223）
    kojo.首次耻情Lv2 = 1;
  }

  p =
    (era.get(`palam:${target}:10`) || 0) + (era.get(`delta:${target}:10`) || 0); // palam:10 无 train 门面

  if (p > PALAMLV[2] && kojo.首次恐怖Lv2 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`「啊，啊啊…不，不要过来…请不要过来…」`);
      await era.printAndWait(`―――第一次超过了恐怖LV2了。`);
    } else {
      await era.printAndWait(`「啊，啊啊…不，不要过来…请不要过来…」`);
      await era.printAndWait(`―――第一次超过了恐怖LV2了。`);
    }
    // CFLAG:224  = 1（变量语义：CFLAG 族，224）
    kojo.首次恐怖Lv2 = 1;
  }

  if ((era.get(`nowex:${target}:0`) || 0) > 0 && kojo.首次C绝顶 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(
        `「嗯啊呜~${heart(1)} 这，这就是要去了的意思吧…${heart(1)}」`,
      );
      await era.printAndWait(
        `看来${target_name}第一次因为小豆豆的刺激而高潮了。`,
      );
    } else {
      await era.printAndWait(
        `「啊~不要不要…感觉…要来了…要来了啊~…啊啊~啊~啊啊啊～！」`,
      );
      await era.printAndWait(
        `看来${target_name}第一次因为小豆豆的刺激而高潮了。`,
      );
    }
    // CFLAG:225  = 1（变量语义：CFLAG 族，225）
    kojo.首次C绝顶 = 1;
  }

  if ((era.get(`nowex:${target}:1`) || 0) > 0 && kojo.首次V绝顶 === 0) {
    if (era.get(`talent:${target}:76`) === 1) {
      await era.printAndWait(
        `「啊~啊啊~…有什么要来了~要来了~…从小穴那儿来了~${heart(1)}」`,
      );
      await era.printAndWait(`「欺负，请更加地欺负吧~~~${heart(3)}」`);
      await era.printAndWait(
        `「嗯哈啊~${heart(1)}啊~啊啊嗯~嗯哈啊啊啊啊啊嗯啊嗯啊~~~${heart(3)}」`,
      );
      await era.printAndWait(
        `${target_name}因为第一次阴道高潮而大声地叫了起来………`,
      );
    } else if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(
        `「啊~…不行~~…不行的啊~~~…小穴~…再这样下去…哈呜嗯~${heart(1)}」`,
      );
      await era.printAndWait(
        `「呜哈嗯啊~~${heart(1)} 呜~…嗯哈~…啊啊~…不，不行~~…啊啊~…啊~…啊啊啊嗯~~${heart(3)}」`,
      );
      await era.printAndWait(
        `「嗯呜哎嗯~…呜哈呜~~…又，又要来了~~${heart(1)} 啊~…啊~啊啊~啊~…哈嗯啊啊啊啊啊啊~～～～！！！」`,
      );
      await era.printAndWait(`${target_name}因为第一次的阴道高潮而感到舒服………`);
    } else {
      await era.printAndWait(
        `「哈啊~…不要~要啊啊~…要来了…要来了啊~~…小穴…再这样…做下去的话${heart(1)}」`,
      );
      await era.printAndWait(
        `「哈呜…要来了…真的要来了…哈呜嗯~~…啊~啊啊啊啊~${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}因为第一次的阴道高潮而靠在你的肩膀喘息着………`,
      );
    }
    // CFLAG:TARGET:226  = 1（变量语义：CFLAG 族，TARGET:226）
    kojo.首次V绝顶 = 1;
  }

  if ((era.get(`nowex:${target}:2`) || 0) > 0 && kojo.首次A绝顶 === 0) {
    if (era.get(`talent:${target}:76`) === 1) {
      if (
        era_flag.selectcom === 46 &&
        era.get(`tequip:${target}:46`) === 0 &&
        era.get(`abl:${target}:3`) === 0
      ) {
        await era.printAndWait(
          `「出来了${black_heart(1)}${'\u3000'}粗的玩意拉出来啦～${black_heart(1)}」`,
        );
        await era.printAndWait(
          `「厉、好厉害哇${black_heart(1)}${'\u3000'}菊穴、去了…一边拉一边去了啊${black_heart(1)}」`,
        );
        await era.printAndWait(
          `「菊穴、好厉害${black_heart(1)}${'\u3000'}嗯哈啊啊嗯${black_heart(1)}${'\u3000'}菊穴要化了啊啊…要变成肉穴、变成肉穴了嗷嗷嗷${black_heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}迎来了初次的菊花高潮的同时把粪便喷得到处都是。满身污物一脸恍惚地沉浸在菊花高潮当中……`,
        );
      } else {
        await era.printAndWait(
          `「啊哈嗯嗯~~~…肛门小穴...请更加地玩弄吧~~~~${heart(1)}」`,
        );
        await era.printAndWait(`「肛门小穴融化了~…要融化掉了~~${heart(3)}」`);
        await era.printAndWait(
          `「啊~啊啊~${heart(1)}嗯哈啊嗯~~${heart(1)}肛门小穴要去了要去了要要去去去了了了了了~~~~${heart(5)}」`,
        );
        await era.printAndWait(
          `${target_name}带着淫荡无比的神色，第一次因为后庭而高潮了…………`,
        );
      }
    } else if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(
        `「嗯呀哈~…啊啊~…啊啊嗯~~…不要不要~~${heart(1)}」`,
      );
      await era.printAndWait(
        `「啊~~…屁股…要去了~…呜~呜~${heart(1)}啊啊啊啊啊~～～～！！！！」」`,
      );
      await era.printAndWait(
        `「哈~…${sc()}因为…屁股而去了的都是…都，都是因为大人你啊………」`,
      );
      await era.printAndWait(
        `${target_name}好像是第一次因为肛门而高潮的样子被看到了，所以闹起了别扭………`,
      );
    } else {
      if (
        era_flag.selectcom === 46 &&
        era.get(`tequip:${target}:46`) &&
        era.get(`abl:${target}:3`) === 0
      ) {
        await era.printAndWait(
          `排泄小穴在尚未开发且习惯的情况下获得了性的快感`,
        );
        await era.printAndWait(
          `而且逐渐意识到自己被肛门中逆流的液体搅到了高潮的事实、让${target_name}颇受打击……`,
        );
        await era.printAndWait(
          `「嘤咦啊啊…不要…不要！${'\u3000'}请把、把这个拔出去啊…${scf()}、${sc()}、要变奇怪了……啊！？」`,
        );
      } else if (era_flag.selectcom === 46 && era.get(`tequip:${target}:46`)) {
        await era.printAndWait(
          `在腹中流动着的灌肠液的刺激下、${target_name}初次达到了菊花高潮`,
        );
        await era.printAndWait(
          `「好舒服…屁股、菊花、${sc()}、被灌肠弄坏了啊…！」`,
        );
      } else if (
        era_flag.selectcom === 46 &&
        era.get(`tequip:${target}:46`) === 0 &&
        era.get(`abl:${target}:3`) === 0 &&
        era.get(`base:${target}:1`) === 0
      ) {
        await era.printAndWait(
          `从脱力抽搐着的菊花里、肠内残余的脏污液体全都喷了出来`,
        );
        await era.printAndWait(
          `能阻止的方法还是气力、现在${target_name}完全没有了`,
        );

        if (era.get(`talent:${target}:44`) === 1) {
          await era.printAndWait(
            `在初次尝肛门排泄绝顶的困惑中、早已泣不成声……`,
          );
        } else {
          await era.printAndWait(
            `污物喷出的同时全身颤抖了起来、肛门绝顶的余韵令其困惑不已……`,
          );
        }
        await era.printAndWait(
          `「唔、呜呜…！${'\u3000'}${scf()}、${sc()}…屁股…排便、竟然会、舒服什么的…啊啊啊啊啊……！！」`,
        );
      } else if (
        era_flag.selectcom === 46 &&
        era.get(`tequip:${target}:46`) === 0 &&
        era.get(`abl:${target}:3`) === 0
      ) {
        await era.printAndWait(
          `刺溜！${'\u3000'}噗噜噜噜噜！${'\u3000'}哔呜哔呜哔呜！`,
        );
        await era.printAndWait(
          `肛门发出不雅的声音的同时、${target_name}烦恼着排泄所带来的快感`,
        );
        await era.printAndWait(
          `排泄快感在菊花开发过程中很容易获得、相反地在强制排便时获得的意外也是有的……`,
        );
        await era.printAndWait(
          `「${scf()}、${sc()}！${'\u3000'}明明是这幅丑态、屁股…骗人…骗人的吧……！」`,
        );
        await era.printAndWait(
          `「啊啊啊、别出来啊！${'\u3000'}出来了、好舒服…骗、骗人的吧！${'\u3000'}啊啊啊啊、为什么会舒服啊啊……！？」`,
        );
      } else if (
        era_flag.selectcom === 46 &&
        era.get(`tequip:${target}:46`) === 0
      ) {
        await era.printAndWait(
          `排泄感所带来的解放感与便随着的肛门快感、${target_name}在排泄着粪便的同时初次尝到了菊花绝顶的滋味……`,
        );
        await era.printAndWait(
          `「啊啊啊！？${'\u3000'}好厉害、不是吧、屁股…竟然、好舒服啊…！！」`,
        );
        await era.printAndWait(
          `「出来了…拉出来了、这、好舒服…不…不要…！${'\u3000'}不……${black_heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「呜！…呜啊啊啊~…不行…变得不行了！…屁，屁股那里…再这样下去…原酿~…原~酿~我！」`,
        );
        await era.printAndWait(
          `${target_name}第一次因为菊花而高潮的样子、身体颤抖着，不知道发出了多少次悲鸣………`,
        );
      }
    }
    // CFLAG:227  = 1（变量语义：CFLAG 族，227）
    kojo.首次A绝顶 = 1;
  }

  if ((era.get(`nowex:${target}:3`) || 0) > 0 && kojo.首次B绝顶 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(
        `「哈嗯啊~…胸部~…要融化掉了~${heart(1)} 哈唉呜~${heart(1)} 有什么要来，要来了！…啊啊嗯~${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}第一次因为胸部刺激而高潮了………`);
    } else {
      await era.printAndWait(
        `「啊~啊啊~…不，不行的~…再这样刺激胸部的话~…啊啊哈呜嗯~~…要，要融化掉了………」`,
      );
      await era.printAndWait(`${target_name}第一次因为胸部刺激而高潮了………`);
    }
    // CFLAG:TARGET:228  = 1（变量语义：CFLAG 族，TARGET:228）
    kojo.首次B绝顶 = 1;
  }

  a_up = train.反感增量 + train.不快增量;
  if (game.train.处女丧失 === 1 && kojo.处女丧失 === 0) {
    if (game.train.主人导致处女丧失 === 1) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (a_up < 500 || game.system.反抗刻印回避 === 1)
      ) {
        await era.printAndWait(
          `「啊哈嗯~${heart(1)}…主人~…${sc()}的淫乱处女小穴的使用感觉怎么呢~…？」`,
        );
        await era.printAndWait(
          `「从今天开始~…以后请用${sc()}的小穴来做舒服的事情吧~${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}露出淫乱的表情向你撒娇起来了………`);
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (a_up < 500 || game.system.反抗刻印回避 === 1)
      ) {
        await era.printAndWait(
          `「哈啊~…哈啊~…将处女献给大人你什么的~…${heart(1)}」`,
        );
        await era.printAndWait(`「从今以后就请多多指教了~…${heart(1)}」`);
        await era.printAndWait(
          `${target_name}露出了很高兴的表情向你撒起了娇………`,
        );
      } else {
        await era.printAndWait(
          `「啊啊…${sc()}…已经回不了故乡了呀…呜呜~…呜呜~………」`,
        );
        await era.printAndWait(
          `${target_name}为了不让你看见将脸遮起来‘呜呜’地流下了眼泪………`,
        );
      }
    } else {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「哈嗯~${heart(1)}…终于不是处女了~…♪」`);
        await era.printAndWait(
          `「可以的哦…从今以后就请好好地疼爱这个淫乱的小穴吧${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「哈啊…哈啊…为什么${sc()}…居然会想让大人…来夺走自己的处女…」`,
        );
        await era.printAndWait(`「哈啊…真是笨蛋呢……（哭）」`);
      } else {
        await era.printAndWait(
          `「啊啊~…${sc()}…已经回不了故乡了…呜呜~…呜呜~………」`,
        );
        await era.printAndWait(
          `${target_name}为了不让你看见将脸遮起来‘呜呜’地流下了眼泪………`,
        );
      }
    }
    // CFLAG:TARGET:229  = 1（变量语义：CFLAG 族，TARGET:229）
    kojo.处女丧失 = 1;
  }

  if (
    (((era.get(`nowex:${target}:0`) || 0) && kojo.首次C绝顶 === 1) ||
      ((era.get(`nowex:${target}:1`) || 0) && kojo.首次V绝顶 === 1) ||
      ((era.get(`nowex:${target}:2`) || 0) && kojo.首次A绝顶 === 1) ||
      ((era.get(`nowex:${target}:3`) || 0) && kojo.首次B绝顶 === 1)) &&
    (era.get(`talent:${target}:190`) === 1 ||
      era.get(`talent:${target}:191`) === 1)
  ) {
    if (kojo.寄生 >= 100) {
      if (rand_n(3) === 0) {
        era.print(`「啊啊~${heart(1)} 要、要生出来了呀~${heart(3)}」`);
        await era.printAndWait(
          `「……请不要、看着……${target_name}的这种样子~……」`,
        );
      } else if (rand_n(2) === 0) {
        era.print(`「不、不行……要生出来了啊啊啊~${heart(1)}」`);
      } else {
        await era.printAndWait(
          `「……撒、现在就将${target_name}可爱的孩子们生出来了~${heart(3)}」`,
        );
      }
    } else if (kojo.寄生 === 75) {
      era.print(`「……我的身体、总觉得有点奇怪啊……」`);
      await era.printAndWait(
        `「不管怎样生…怎样生都好、都满足不了啊~……想要生更多…更多的蛋出来了啊~……」`,
      );
    } else {
      if (
        era.get(`talent:${target}:190`) === 1 &&
        era.get(`talent:${target}:191`) === 1
      ) {
        // 同一行输出：无后缀 PRINTFORM 链，
        // 是 RAND:2 二选一的插入段，PRINTFORMW 收行（#623）
        const both_holes = rand_n(2) === 0;
        await era.printAndWait(
          `「啊啊~…我的` +
            (both_holes ? `两个小穴` : `小穴还有屁股`) +
            `都要生出来、要生出来了啊~……啊啊~！！」`,
        );
      } else if (era.get(`talent:${target}:190`) === 1) {
        if (rand_n(1) === 0) {
          await era.printAndWait(
            `「嗯呜~…啊啊~、被这样刺激了的话、要、要生出来了啊啊~、啊啊啊~！！」`,
          );
        } else {
          await era.printAndWait('');
        }
      } else {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「哈呜~、要、要从屁股里、出来了啊啊啊~！！」`,
          );
        } else {
          await era.printAndWait(
            `「哈呜~、要从${target_name}的屁股里…啊啊、生、生出来了啊啊~！！」`,
          );
        }
      }
    }
    // CFLAG:TARGET:230 + = 1（变量语义：CFLAG 族，TARGET:230 +）
    kojo.寄生 += 1;
  }
}

async function kojo_message_markcng_3(rand) {
  void rand;
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const sc = () => self_call(target);
  const kojo = chara(target).kojo;

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
      await era.printAndWait(
        `「哈嗯呜~！…请更，请更多地…在${sc()}的身体上刻下印记吧………」`,
      );
    } else {
      await era.printAndWait(`「啊嗯~！…好，痛…好疼的…不，不行的…的说…」`);
    }
    // CFLAG:297  = 1（变量语义：CFLAG 族，297）
    kojo.苦痛刻印Lv3 = 1;
  }

  if (game.system.快乐刻印变动 === 3 && kojo.快乐刻印Lv3 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(
        `「啊啊啊~…不行~…再这样…舒服下去的话…真的要…离不开了…${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「哈啊…哈呜呜~…这样…好舒服的事情…还是第一次来的…${heart(1)}」`,
      );
    }
    // CFLAG:298  = 1（变量语义：CFLAG 族，298）
    kojo.快乐刻印Lv3 = 1;
  }

  if (game.system.屈服刻印变动 === 3 && kojo.屈服刻印Lv3 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(
        `「啊啊…${sc()}会…好好听命令得…自己的立场…明白的…${sc()}明白的………」`,
      );
    } else {
      await era.printAndWait(
        `「啊啊~…不，不会再反抗了…绝对…绝对不会再次反抗了………」`,
      );
    }
    // CFLAG:299  = 1（变量语义：CFLAG 族，299）
    kojo.屈服刻印Lv3 = 1;
  }

  if (game.system.反抗刻印变动 === 3 && kojo.反抗刻印Lv3 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`${target_name}无言地盯着你看………`);
    } else {
      await era.printAndWait(`${target_name}无言地瞪着你………`);
    }
    // CFLAG:300  = 1（变量语义：CFLAG 族，300）
    kojo.反抗刻印Lv3 = 1;
  }
}

async function self_kojo_k3(rand) {
  void rand;
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const sc = () => self_call(target);
  const scf = () => self_call_first(target);
  const kojo = chara(target).kojo;
  const cstr2 = era.get(`cstr:${target}:2`) || '';

  const q = 0; // event-aftertrain 尚未把 Q 传入 SELF_KOJO

  if (game.train.初吻与自我口上 === 1) {
    if (q === 1) {
      era.print(
        `「嗯~…嗯哈~…${sc()}…居然想着女孩子…做这样的事情什么的…${heart(1)}」`,
      );
      era.print(
        `残留着的欲望之火让${target_name}的身体还在一点一点地燃烧着………`,
      );
    } else if (q === 2) {
      era.print(
        `「狗狗的…想要啊~…啊啊~…${sc()}比狗和畜生还要低贱啊~…啊啊~${heart(1)}」`,
      );
      era.print(`堕落的愉悦让${target_name}哪怕觉得苦恼也不会停下自慰………`);
    } else {
      if (
        era.get(`talent:${target}:76`) &&
        (kojo.调教后自慰 < 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哼嗯~…不管是小穴${heart(1)}…还是肛穴${heart(1)}…都好热啊…${heart(3)}」`,
        );
        await era.printAndWait(
          `「好想被大鸡鸡继续啪啪啪啊…${heart(1)}啊啊啊嗯~~…只是手指根本不够嘛………」`,
        );
        // CFLAG:261  = 4（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 4;
      } else if (
        era.get(`talent:${target}:85`) &&
        (kojo.调教后自慰 < 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「还想……还想要更多……${heart(1)}」`);
        await era.printAndWait(
          `「嗯哈嗯~${heart(1)} 身体…好热…好痒…啊啊~${heart(1)} 大人~${heart(3)}」`,
        );
        // CFLAG:261  = 3（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 3;
      } else if (
        era.get(`abl:${target}:31`) >= 3 &&
        (kojo.调教后自慰 < 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈嗯~${heart(1)} 身体好热啊~…手指停不下来呀~${heart(1)}」`,
        );
        // CFLAG:261  = 2（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 2;
      } else if (kojo.调教后自慰 < 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊啊~…身体~…好热好痒啊…！」`);
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
        `「嗯哼哼…女孩子之间的SEX、也很不错呢${heart(1)}」`,
      );
      await era.printAndWait(`「不知道你会用什么声音来呻吟呢~？」`);
      // CFLAG:262  = 5（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 5;
    } else if (
      era.get(`talent:${target}:85`) &&
      (kojo.百合PLAY < 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「嗯~…哈…啊啊…只有那位大人才可以…这种声音…啊啊~${heart(1)}」`,
      );
      await era.printAndWait(
        `「明明不想听到来着…嗯~嗯~…哈啊啊啊啊啊嗯~~${heart(3)}」`,
      );
      // CFLAG:262  = 4（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 4;
    } else if (
      era.get(`abl:${target}:33`) >= 3 &&
      (kojo.百合PLAY < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「嗯哼哼哼…撒…一起享受吧~${heart(1)} 享受百合的喜悦吧~${heart(1)}」`,
      );
      // CFLAG:262  = 3（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 3;
    } else if (
      era.get(`abl:${target}:22`) >= 3 &&
      (kojo.百合PLAY < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「哼啊啊~…和女孩子做…居然会那么舒服什么的…${heart(1)}」`,
      );
      // CFLAG:262  = 2（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 2;
    } else if (kojo.百合PLAY < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「啊~…这，这样的不奇怪吗…和女孩子做什么的………」`);
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
        `「啊哈嗯~${heart(1)} 早上好啊~、主人…呸咯~${heart(1)}」`,
      );
      await era.printAndWait(
        `「还在${heart(1)} 继续着早上的口交侍奉呢所以…请不用在意~${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}一脸淫乱地将阴茎塞进了喉咙的深处，。`,
      );
      await era.printAndWait(
        `「嗯呃…啾噜啾噜嗯~…呸噜嗯~${heart(1)}…嗯嗯~…嗯啊嗯嗯啊嗯噗嗯~…嗯噗呜呜~嗯~${heart(3)}」`,
      );
      // CFLAG:263  = 4（变量语义：CFLAG 族，263）
      kojo.朝口交 = 4;
    } else if (
      era.get(`talent:${target}:85`) &&
      (kojo.朝口交 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啾噜嗯~…啾啾~…啾噜噜嗯~…啊啊嗯~${heart(1)} 早上好~~。我最爱的大人~${heart(3)}」`,
      );
      await era.printAndWait(
        `「这个大鸡鸡~~${heart(1)}…${target_name}会用嘴巴来弄干净的~…请在等一下吧~${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}疼爱地用舔舐来清洁着阴茎。`);
      await era.printAndWait(
        `「嗯哼哼~…如果兴奋起来了话…就请这样侵犯${sc()}的嘴巴吧~${heart(1)}」`,
      );
      // CFLAG:263  = 3（变量语义：CFLAG 族，263）
      kojo.朝口交 = 3;
    } else if (
      era.get(`abl:${target}:16`) >= 5 &&
      (kojo.朝口交 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「早上好、主人${heart(1)}」`);
      await era.printAndWait(
        `「哈嗯~哈嗯~……${target_name}会用嘴巴来弄干净的，请就这样等一下吧~${heart(1)}」`,
      );
      // CFLAG:263  = 2（变量语义：CFLAG 族，263）
      kojo.朝口交 = 2;
    } else if (kojo.朝口交 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(
        `「嗯哈~…哈啊~…哈嗯~…哈嗯~…对，对不起…因为实在是太厉害的大鸡鸡了不小心………${heart(1)}」`,
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
        `「哈啊~…哈啊~…身体按捺不住呢…小穴痒地不行不行地呢${heart(1)}」`,
      );
      await era.printAndWait(`「请更多地…更多地…侵犯吧！」`);
      // CFLAG:264  = 2（变量语义：CFLAG 族，264）
      kojo.调教后性交 = 2;
    } else if (kojo.调教后性交 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(
        `「哈啊…哈啊…身体按捺不住呢…小穴痒地受不了了呢${heart(1)}」`,
      );
      await era.printAndWait(`「所，所以啦…请抱，抱一下吧………」`);
      // CFLAG:264  = 1（变量语义：CFLAG 族，264）
      kojo.调教后性交 = 1;
    }
  }

  if (game.train.初吻与自我口上 === 5) {
    if (kojo.夜袭 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(
        `「晚，晚上好……啊……${scf()}、${sc()}…是来给主人抱抱来的${heart(1)}」`,
      );
      await era.printAndWait(`「身体痒地受不了…迫使${sc()}来的…${heart(1)}」`);
      await era.printAndWait(
        `「请给予好色又不要脸的…雌、雌奴隶…同情与怜悯吧………${heart(1)}」`,
      );
      // CFLAG:265  = 1（变量语义：CFLAG 族，265）
      kojo.夜袭 = 1;
    }
  }

  if (game.train.初吻与自我口上 === 6) {
    if (era.get(`talent:${target}:136`)) {
      await era.printAndWait(
        `直到告知要被卖掉的时候${target_name}仍和「丈夫」你侬我侬的交合着`,
      );
      await era.printAndWait(`「十分感谢……您教导${sc()}理解了美好的兽爱世界」`);
      await era.printAndWait(
        `和爱侣一同爬入笼子里的${target_name}静静地跪在地上行了最后一礼`,
      );
    } else if (
      era.get(`talent:${target}:85`) &&
      era.get(`mark:${target}:3`) < 3
    ) {
      if (era.get(`talent:${target}:314`) === 1) {
        await era.printAndWait(
          `被告知要被卖掉的瞬间、${target_name}的瞳孔放大地呆住了。`,
        );
        await era.printAndWait(`看来被说了什么并没有理解得样子。`);
        await era.printAndWait(
          `没有办法只好再将事实重复了一次、${target_name}便开始大声地哭喊着。`,
        );
        era.print(`………………`);
        await era.printAndWait(`你用护卫的怪物强行将${target_name}压制住后`);
        await era.printAndWait(
          `向${target_name}的长而美丽的耳朵…没错…在她自满的美丽的耳朵上打上了用于拍卖标码的耳环。`,
        );
        await era.printAndWait(
          `一打上耳环后、如同断了念头一样${target_name}安静了下来……………`,
        );
      } else if (
        era.get(`talent:${target}:210`) ||
        era.get(`talent:${target}:211`)
      ) {
        await era.printAndWait(
          `「竟、竟然……都已经做好作为魔王大人的左右手随时准备奉献的准备了……」`,
        );
        await era.printAndWait(
          `「竟然……不可能的……那个誓约……那份授勋……到底算什么啊」`,
        );
        await era.printAndWait(
          `已然泣不成声的${target_name}手被奴隶商人拉了起来。`,
        );
        await era.printAndWait(`${target_name}会哭到什么时候呢……。`);
      } else {
        await era.printAndWait(`「骗、骗人…拜，拜托了…是开玩笑的吧………」`);
        await era.printAndWait(
          `你下令让怪物抓住${target_name}将她带到了马车的旁边。`,
        );
        await era.printAndWait(`「不要，不要啊…这绝对是骗人的！」`);
        await era.printAndWait(
          `「${scf()}、${sc()}想…想和大人你在一起来的啊…呜呜呜！」`,
        );
      }
    } else if (era.get(`mark:${target}:3`) === 3) {
      await era.printAndWait(`「给我记住…给我记住啊！…哪怕死了也…混蛋…！！」`);
    } else if (era.get(`talent:${target}:76`)) {
      if (era.get(`talent:${target}:314`) === 7) {
        await era.printAndWait(
          `「没什么…对于堕落了的身体这件事来说…并没有任何的后悔来的…」`,
        );
        await era.printAndWait(
          `「但是、已经不能再见到大人你稍微有点寂寞呢…稍微借用一下时间…可以吗？」`,
        );
        await era.printAndWait(`${target_name}紧紧地抱着你，深深地拥吻着。`);
        await era.printAndWait(`「嗯哼哼、再见了~………要保重噢、魔王大人…………」`);
      } else {
        await era.printAndWait(
          `「啊啊嗯~…主人的大鸡巴的味道…还想要享受更多来着呢………${heart(1)}」`,
        );
        await era.printAndWait(`「这就再见了实在是太寂寞了…${heart(1)}」`);
        await era.printAndWait(
          `「………真的、在这里的生活………觉得有点快乐的啊………」`,
        );
      }
    } else {
      await era.printAndWait(`「${sc()}…接下来…会变成怎样呢………？」`);
    }
    era.print('');
    if (era.get(`talent:${target}:122`) !== 1) {
      await sell_maturo_k0(target, { rand }); // CALL SELL_MATURO_K0
    }
  }

  if (game.train.初吻与自我口上 === 11) {
    if (kojo.妊娠发觉 === 0) {
      if (era.get(`talent:${target}:9`) === 1) {
        await era.printAndWait(
          `「啊哈哈~…啊哈哈~…啊哈哈哈哈哈哈哈哈！…为什么？…为什么？…为什么肚子居然膨胀成这么大了呢？」`,
        );
        await era.printAndWait(`${target_name}发狂地笑着………`);
      } else if (
        era.get(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 === 1
      ) {
        await era.printAndWait(
          `「啊啊~…真，真是困扰了呢~~…那个人的孩子…居然怀上了~…啊啊~…真不敢相信啊~${heart(1)}」`,
        );
        await era.printAndWait(`「怎么可能会怀上呢…都要…放弃了来着…‥…」`);
      } else if (chara(target).event.妊娠相手 === 2) {
        await era.printAndWait(
          `「啊啊~…骗人…${scf()}、${sc()}…居然怀孕了什么的…要，要好好地跟主人，解释一下才可以………」`,
        );
        await era.printAndWait(`「呜呜…这难道是…${cstr2}桑的………」`);

        await era.printAndWait(
          `${target_name}貌似对腹里的孩子的父亲是谁有着线索的样子………`,
        );
      } else if (chara(target).event.妊娠相手 === 3) {
        await era.printAndWait(
          `「啊啊~…骗人…${scf()}、${sc()}…居然怀孕了什么的…要，要好好地跟主人，解释一下才可以………」`,
        );
        await era.printAndWait(`「呜呜…这难道是…${cstr2}桑的………」`);
        await era.printAndWait(
          `${target_name}貌似对腹里的孩子的父亲是谁有着线索的样子………`,
        );
      } else if (chara(target).event.妊娠相手 === 5) {
        if (era.get(`talent:${target}:136`) === 1) {
          await era.printAndWait(`「居然怀上了可爱的狗宝宝种子真是幸福呢~♪」`);
        } else {
          await era.printAndWait(
            `「怎么会…${sc()}居然怀上了那个野狗的孩子…骗、骗人的………」`,
          );
        }
      } else if (chara(target).event.妊娠相手 === 7) {
        await era.printAndWait(
          `「${scf()}、${sc()}居然怀上了狂王的孩子…骗人…怎么会…」`,
        );
      } else {
        await era.printAndWait(
          `「啊啊~…骗人…${scf()}、${sc()}…居然怀孕了什么的…要，要好好的跟主人…解释一下才可以了………」`,
        );
        await era.printAndWait(`「但是…该怎么说才好啊…啊啊、啊啊………」`);
      }
      // CFLAG:271  = 1（变量语义：CFLAG 族，271）
      kojo.妊娠发觉 = 1;
    } else {
      if (era.get(`talent:${target}:9`) === 1) {
        await era.printAndWait(
          `「啊哈哈…啊哈哈…啊哈哈哈哈哈哈哈哈哈！…为什么？…为什么呢？…为什么肚子居然膨胀成这么大了呢？」`,
        );
        await era.printAndWait(`${target_name}发狂地笑着………`);
      } else if (
        era.get(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 === 1
      ) {
        await era.printAndWait(
          `「啊啊~…真，真是困扰了呢~~…那个人的孩子…居然怀上了~…啊啊~…真不敢相信啊~${heart(1)}」`,
        );
        await era.printAndWait(`「怎么可能会怀上呢…都要…放弃了来着…‥……」`);
      } else if (chara(target).event.妊娠相手 === 2) {
        await era.printAndWait(
          `「啊啊~…骗人…${scf()}、${sc()}…居然怀孕了什么的…要，要好好地跟主人，解释一下才可以………」`,
        );
        await era.printAndWait(`「呜呜…这难道是…${cstr2}桑的………」`);
        await era.printAndWait(
          `${target_name}貌似对腹里的孩子的父亲是谁有着线索的样子………`,
        );
      } else if (chara(target).event.妊娠相手 === 3) {
        await era.printAndWait(
          `「啊啊~…骗人…${scf()}、${sc()}…居然怀孕了什么的…要，要好好地跟主人，解释一下才可以………」`,
        );
        await era.printAndWait(`「呜呜…这难道是…${cstr2}桑的………」`);
        await era.printAndWait(
          `${target_name}貌似对腹里的孩子的父亲是谁有着线索的样子………`,
        );
      } else if (chara(target).event.妊娠相手 === 5) {
        if (era.get(`talent:${target}:136`) === 1) {
          await era.printAndWait(`「居然怀上了可爱的狗宝宝种子真是幸福呢~♪」`);
        } else {
          await era.printAndWait(
            `「怎么会…${sc()}居然怀上了那个野狗的孩子…骗、骗人的………」`,
          );
        }
      } else if (chara(target).event.妊娠相手 === 7) {
        await era.printAndWait(
          `「${scf()}、${sc()}居然怀上了狂王的孩子…骗人…怎么会…」`,
        );
      } else {
        await era.printAndWait(
          `「啊啊~…骗人…${scf()}、${sc()}…居然怀孕了什么的…要，要好好的跟主人…解释一下才可以了……」`,
        );
        await era.printAndWait(`「但是…该怎么说才好啊…啊啊、啊啊………」`);
      }
      // CFLAG:271  = 1（变量语义：CFLAG 族，271）
      kojo.妊娠发觉 = 1;
    }
  }

  if (game.train.初吻与自我口上 === 12) {
    if (kojo.生产 === 0) {
      if (era.get(`talent:${target}:9`) === 1) {
        await era.printAndWait(
          `「嗯哈啊啊嗯…有什么要出来了…要出来了…啊哈~啊哈~啊哈哈哈哈哈哈哈！」`,
        );
      } else if (
        era.get(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 === 1
      ) {
        await era.printAndWait(
          `「哈啊…哈啊…啊啊…果然…跟${sc()}想象一样的小宝宝…跟大人你一摸一样呢${heart(1)}」`,
        );
      } else if (chara(target).event.妊娠相手 === 2) {
        await era.printAndWait(`「呜…呜呜~…${sc()}的小宝宝要………」`);
      } else if (chara(target).event.妊娠相手 === 3) {
        await era.printAndWait(`「呜…呜呜~…${sc()}的小宝宝要………」`);
      } else if (chara(target).event.妊娠相手 === 5) {
        if (era.get(`talent:${target}:136`) === 1) {
          await era.printAndWait(`「要、要生出来了、可爱的狗宝宝~♪」`);
        } else {
          await era.printAndWait(`「呜…呜呜~…${sc()}的小宝宝要………」`);
        }
      } else if (chara(target).event.妊娠相手 === 7) {
        await era.printAndWait(`「要、要生出来了、狂王大人的孩子…但是…」`);
      } else {
        await era.printAndWait(`「呜…呜呜…${sc()}的小宝宝要………」`);
      }
      // CFLAG:272  = 1（变量语义：CFLAG 族，272）
      kojo.生产 = 1;
    } else {
      if (era.get(`talent:${target}:9`) === 1) {
        await era.printAndWait(
          `「嗯哈啊啊嗯…有什么要出来了…要出来了…啊哈~啊哈~啊哈哈哈哈哈哈哈！」`,
        );
      } else if (
        era.get(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 === 1
      ) {
        await era.printAndWait(
          `「哈啊…哈啊…啊啊…果然…跟${sc()}想象一样的小宝宝…跟大人你一摸一样呢${heart(1)}」`,
        );
      } else if (chara(target).event.妊娠相手 === 2) {
        await era.printAndWait(`「呜…呜呜~…${sc()}的小宝宝要………」`);
      } else if (chara(target).event.妊娠相手 === 3) {
        await era.printAndWait(`「呜…呜呜~…${sc()}的小宝宝要………」`);
      } else if (chara(target).event.妊娠相手 === 5) {
        if (era.get(`talent:${target}:136`) === 1) {
          await era.printAndWait(`「要、要生出来了、可爱的狗宝宝~♪」`);
        } else {
          await era.printAndWait(`「呜…呜呜~…${sc()}的小宝宝要………」`);
        }
      } else if (chara(target).event.妊娠相手 === 7) {
        await era.printAndWait(`「要、要生出来了、狂王大人的孩子…但是…」`);
      } else {
        await era.printAndWait(`「呜…呜呜~…${sc()}的小宝宝要………」`);
      }
      // CFLAG:272  = 1（变量语义：CFLAG 族，272）
      kojo.生产 = 1;
    }
  }

  if (game.train.初吻与自我口上 === 13) {
    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {
      if (era.get(`talent:${target}:153`)) {
        await era.printAndWait(`「还有一会就要生出来了、敬请期待吧~♪」`);
        await era.printAndWait(`${target_name}摸着迎接临盆的而变大的肚子………`);
      } else if (era.get(`talent:${target}:154`)) {
        await era.printAndWait(`「啊啊、我可爱的小宝宝！真不想放手呢！」`);
        await era.printAndWait(`${target_name}抱着一个小孩子………`);
      }
    }
    // CFLAG:273  = 1（变量语义：CFLAG 族，273）
    kojo.育儿室 = 1;
  }

  if (game.train.初吻与自我口上 === 14) {
    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {
      await era.printAndWait(`「（哭）…为什么，要从${sc()}的身边离开呢………」`);
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

async function dungeon_ryouzyoku_k3(rand) {
  void rand;
  const target = era_flag.target;
  const sc = () => self_call(target);
  const scf = () => self_call_first(target);

  if (era.get(`talent:${target}:0`) === 1) {
    await era.printAndWait(`「${sc()}的第一次…骗人…骗人的…」`);

    if (
      era.get(`talent:${target}:21`) === 1 ||
      era.get(`talent:${target}:22`) === 1
    ) {
      await era.printAndWait(`「全部…都结束了啊…」`);

      return 0;
    } else if (
      era.get(`talent:${target}:17`) === 1 ||
      era.get(`talent:${target}:31`) === 1 ||
      era.get(`talent:${target}:36`) === 1
    ) {
      await era.printAndWait(
        `「不管用${sc()}的哪个地方都没关系…只要留下小命的话......！」`,
      );

      if (
        era.get(`talent:${target}:106`) === 1 ||
        era.get(`exp:${target}:1`) > 0
      ) {
        await era.printAndWait(
          `「哈啊…比起前面来说屁股会更加舒服的、就这样好吧！」`,
        );
      }

      if (era.get(`exp:${target}:22`) > 0) {
        await era.printAndWait(
          `「会用嘴巴来做的…请饶过…${sc()}的小命......！」`,
        );
      }
    } else if (
      era.get(`talent:${target}:11`) === 1 ||
      era.get(`talent:${target}:12`) === 1 ||
      era.get(`talent:${target}:15`) === 1 ||
      era.get(`talent:${target}:30`) === 1 ||
      era.get(`talent:${target}:34`) === 1
    ) {
      await era.printAndWait(`「…嘛、只是一张膜女人的价值才不会改变呢！」`);
    } else if (
      era.get(`talent:${target}:10`) === 1 ||
      era.get(`talent:${target}:26`) === 1
    ) {
      await era.printAndWait(`「若是知道如此的话…早就应该将处女丢掉才对啊…」`);
    } else {
      await era.printAndWait(`「以为${scf()}、${sc()}是谁啊！？」`);
    }
  } else {
    await era.printAndWait(`「不要、不要啊！${'\u3000'}${sc()}对这种事情…」`);

    if (
      era.get(`talent:${target}:21`) === 1 ||
      era.get(`talent:${target}:22`) === 1
    ) {
      await era.printAndWait(`「这是一场梦来的…」`);

      return 0;
    } else if (
      era.get(`talent:${target}:17`) === 1 ||
      era.get(`talent:${target}:31`) === 1 ||
      era.get(`talent:${target}:36`) === 1
    ) {
      await era.printAndWait(
        `「只要是${sc()}的身体不管怎样都没关系…只要留下小命的话......！」`,
      );

      if (
        era.get(`talent:${target}:106`) === 1 ||
        era.get(`exp:${target}:1`) > 0
      ) {
        await era.printAndWait(
          `「${sc()}…屁股的那边也可以的噢、会满足你们的…」`,
        );
      }

      if (era.get(`exp:${target}:22`) > 0) {
        await era.printAndWait(
          `「用嘴巴的多少都会做的！${'\u3000'}请饶过…${sc()}的小命！」`,
        );
      }
    } else if (
      era.get(`talent:${target}:11`) === 1 ||
      era.get(`talent:${target}:12`) === 1 ||
      era.get(`talent:${target}:15`) === 1 ||
      era.get(`talent:${target}:30`) === 1 ||
      era.get(`talent:${target}:34`) === 1
    ) {
      await era.printAndWait(
        `「真是不巧呢、处女什么的早就丢掉了、真、真是残念呢！」`,
      );
    } else if (
      era.get(`talent:${target}:10`) === 1 ||
      era.get(`talent:${target}:26`) === 1
    ) {
      await era.printAndWait(`「不要啊！${'\u3000'}杀......杀掉${sc()}吧！」`);
    } else {
      await era.printAndWait(`「居然${sc()}受到这种屈辱…绝对不会原谅的！」`);
    }
  }

  return 0;
}

async function dungeon_ryouzyoku_after_k3(rand) {
  void rand;
  const target = era_flag.target;

  if (era.get(`talent:${target}:0`) === 1) {
    await era.printAndWait(`「太好了…还是…没问题的…」`);

    if (
      era.get(`talent:${target}:21`) === 1 ||
      era.get(`talent:${target}:22`) === 1
    ) {
      await era.printAndWait(`「只要我还活着就…」`);

      return 0;
    }

    if (era.get(`exp:${target}:1`) > 20) {
      await era.printAndWait(`「屁股…已经…不行…」`);
      await era.printAndWait(`「咕呜…呜哎哎~~」`);
    }

    if (era.get(`exp:${target}:22`) > 20) {
      await era.printAndWait(`「…已经不知道吃了多少根…呜哎哎~~」`);
    }

    if (era.get(`exp:${target}:20`) > 20) {
      await era.printAndWait(`「这么…残酷的事情…」`);
    }
  } else {
    await era.printAndWait(`「结束了吗…？」`);

    if (
      era.get(`talent:${target}:21`) === 1 ||
      era.get(`talent:${target}:22`) === 1
    ) {
      await era.printAndWait(`（已经…不想再思考了…）`);

      return 0;
    }

    if (era.get(`exp:${target}:0`) > 20) {
      await era.printAndWait(`「这样的事情做得再多…也没有用的…」`);
      await era.printAndWait(`「这种…这种事情…」`);
    }

    if (era.get(`exp:${target}:1`) > 20) {
      await era.printAndWait(`「屁股要…好痛苦…」`);
      await era.printAndWait(`「请停下…」`);
    }

    if (era.get(`exp:${target}:22`) > 20) {
      await era.printAndWait(`「喔哎哎~…居然要舔那种东西…」`);
    }

    if (era.get(`exp:${target}:20`) > 20) {
      await era.printAndWait(`「不要…再将我…弄脏了…」`);
    }
  }
}

async function benki_koujo_k3(rand) {
  void rand;
  const a = era_flag.target;
  const target_name = chara_callname(a);

  if (game.train.肉便器行动 === 0) {
    if (game.dungeon.肉便器常识改写 === 1) {
      await era.printAndWait(`「呵呵…别那么吃惊嘛这没什么的哦♪」`);
      await era.printAndWait(
        `「『就算对象是污秽的贱民也会做最高级的侍奉』…在${self_call(a)}家里可是『当然』的啊」`,
      );
      await era.printAndWait(
        `「来、向${self_call(a)}掏出那丑陋脏污的鸡巴吧♪好啦、快点嘛${heart(1)}」`,
      );
    } else if (era.get(`talent:${a}:76`) === 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 === 1) {
    if (game.dungeon.肉便器常识改写 === 1) {
      await era.printAndWait(
        `「被魔王大人催眠了…？才不是、这是${self_call(a)}『自愿』的」`,
      );
      await era.printAndWait(
        `「居然『可以成为向往的百合便器』什么的…${self_call(a)}真是太『幸福』了啊♪」`,
      );
      await era.printAndWait(
        `「啊…果然比起鸡巴还是跟女孩子做爱最棒了啊${heart(1)}」`,
      );
    } else if (era.get(`talent:${a}:76`) === 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 === 2) {
    if (game.dungeon.肉便器常识改写 === 1) {
      await era.printAndWait(
        `「『低贱母兽』${self_call(a)}的身体、『要让野兽享用才能发挥真正的价值』…」`,
      );
      await era.printAndWait(
        `「这对肉便器${self_call(a)}来说是『当然』的…更何况这可是最『幸福』${heart(1)}」`,
      );
      await era.printAndWait(
        `「竟然知道${self_call(a)}喜欢『被野兽阴茎用后背位狂艹』…魔王大人还真是懂行啊♪」`,
      );
    } else if (era.get(`talent:${a}:76`) === 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 === 3) {
    if (game.dungeon.肉便器常识改写 === 1) {
      await era.printAndWait(
        `「常识改变？…在说什么啊…随意使用肉便器${self_call(a)}的身体不是『理所当然』的吗…」`,
      );
      await era.printAndWait(
        `「因为${self_call(a)}的身体、可是有很多人用的重要的『共有物』啊♪肉穴还是菊穴都请尽情使用吧♪」`,
      );
      await era.printAndWait(
        `「啊…能被那么多的人光顾、${self_call(a)}真是『非常高兴』啊${heart(1)}」`,
      );
    } else if (era.get(`talent:${a}:76`) === 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 === 4) {
    if (game.dungeon.肉便器常识改写 === 1) {
      await era.printAndWait(
        `「${self_call(a)}的身体、特别是肉穴可是有很多人用的重要的『共有物』啊…请尽情使用吧${heart(1)}」`,
      );
      await era.printAndWait(
        `「诶？常识改变？…在说什么啊…${self_call(a)}可『没有被魔王大人催眠』哟？」`,
      );
      await era.printAndWait(
        `「今天也能被那么多的人光顾、${self_call(a)}真是『非常高兴』啊${heart(1)}」`,
      );
    } else if (era.get(`talent:${a}:76`) === 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 === 5) {
    if (game.dungeon.肉便器常识改写 === 1) {
      await era.printAndWait(
        `「${self_call(a)}的身体、特别是菊穴可是有很多人用的重要的『共有物』啊…请尽情使用吧${heart(1)}」`,
      );
      await era.printAndWait(
        `「诶？常识改变？…在说什么啊…${self_call(a)}可『没有被魔王大人催眠』哟？」`,
      );
      await era.printAndWait(
        `「今天也能被那么多的人光顾、${self_call(a)}真是『非常高兴』啊${heart(1)}」`,
      );
    } else if (era.get(`talent:${a}:76`) === 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 === 6) {
    if (game.dungeon.肉便器常识改写 === 1) {
      // 「请」、对象名与收尾三行同属一行输出（与 K0 四处同型）；名字按 #599
      // 用插值接在 CALL 的位置，拼接基准让前缀行也进锁 B/D
      const player_name_benki =
        require('#/system/train/benki').benki_player_name();
      await era.printAndWait(
        `「请${player_name_benki}大人的大鸡巴、用${self_call(a)}的嘴巴肉穴做做『施舍』吧${heart(1)}」`,
      );

      await era.printAndWait(
        `「常识改变？…说的什么啊…${self_call(a)}可是『出名的见到大鸡巴就想吸一口』哦？」`,
      );
      await era.printAndWait(
        `「这是只有变成了肉便器的${self_call(a)}才做得来的、更何况这是最符合${self_call(a)}的『工作』啊♪」`,
      );
    } else if (era.get(`talent:${a}:76`) === 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 === 7) {
    if (game.dungeon.肉便器常识改写 === 1) {
      await era.printAndWait(
        `「观看这个水晶球的各位…名门之后、${target_name}已经不再是勇者了…」`,
      );
      await era.printAndWait(
        `「${self_call(a)}完全败给了伟大的魔王大人、身心都被进行了淫乱的调教…」`,
      );
      await era.printAndWait(
        `「就在不久前、终于成了贪恋野兽阴茎的肉便器啦${heart(1)}」`,
      );
      await era.printAndWait(
        `「${self_call(a)}的人生已经混乱不堪了…就在这一直和野兽交合来抚慰下吧${heart(1)}」`,
      );
    } else if (era.get(`talent:${a}:76`) === 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 === 9) {
    if (game.dungeon.肉便器常识改写 === 1) {
      await era.printAndWait(
        `「观看这个水晶球的各位…名门之后、${target_name}已经不再是勇者了…」`,
      );
      await era.printAndWait(
        `「${self_call(a)}完全败给了伟大的魔王大人、被洗脑成了肉便器…」`,
      );
      await era.printAndWait(
        `「就在前不久、终于成了热衷于在野外赤身裸体的露出狂啦${heart(1)}」`,
      );
      await era.printAndWait(
        `「${self_call(a)}的人生虽然已经混乱不堪了…但今后会一直赤身裸体的所以一点问题也没有咯${heart(1)}」`,
      );
    } else if (era.get(`talent:${a}:76`) === 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 === 12) {
    if (game.dungeon.肉便器常识改写 === 1) {
      await era.printAndWait(
        `「观看这个水晶球的各位…名门之后、${target_name}已经不再是勇者了…」`,
      );
      await era.printAndWait(
        `「${self_call(a)}完全败给了伟大的魔王大人、被彻头彻尾地开发了身体…」`,
      );
      await era.printAndWait(
        `「现在不过是只知道自慰的、变态自慰狂罢了${heart(1)}」`,
      );
      await era.printAndWait(
        `「各位请多看看吧、看看这正兴奋不已地自慰着的卑微的${self_call(a)}吧${heart(1)}」`,
      );
    } else if (era.get(`talent:${a}:76`) === 1) {
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

async function dungeon_victory_k3(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const a = era_flag.target;

  await era.printAndWait(`「呵呵～赢啦！♪」`);

  if (
    era.get(`talent:${target}:21`) === 1 ||
    era.get(`talent:${target}:22`) === 1
  ) {
    await era.printAndWait(`「……」`);

    return 0;
  } else if (
    era.get(`talent:${target}:11`) === 1 ||
    era.get(`talent:${target}:12`) === 1 ||
    era.get(`talent:${target}:15`) === 1 ||
    era.get(`talent:${target}:30`) === 1 ||
    era.get(`talent:${target}:34`) === 1
  ) {
    if (rand_n(3) === 0) {
      await era.printAndWait(`「真是对不起了~♪」`);
    } else if (rand_n(2) === 0) {
      await era.printAndWait(`「真是不像样……」`);
    } else {
      await era.printAndWait(`「完全没有可能会输嘛！」`);
    }
  } else if (
    era.get(`talent:${target}:10`) === 1 ||
    era.get(`talent:${target}:26`) === 1
  ) {
    await era.printAndWait(`「该怎么说好呢……」`);

    return 0;
  } else {
    if (rand_n(3) === 0) {
      await era.printAndWait(`「真是肮脏…！」`);
    } else if (rand_n(2) === 0) {
      await era.printAndWait(`「看到了吗！」`);
    } else {
      await era.printAndWait(`「也就只是这种东西而已嘛♪」`);
    }
  }

  if (
    (era.get(`base:${a}:0`) * 100) / era.get(`maxbase:${a}:0`) < 50 ||
    (era.get(`base:${a}:1`) * 100) / era.get(`maxbase:${a}:1`) < 50
  ) {
    await era.printAndWait(`（但是…差点......？！？）`);
  } else {
    await era.printAndWait(`「祝你愉快~♪」`);
  }

  return 0;
}

async function dungeon_attack_k3(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const sc = () => self_call(target);

  if (chara(target).invasion.状态 === 2) {
    if (
      era.get(`talent:${target}:21`) === 1 ||
      era.get(`talent:${target}:22`) === 1
    ) {
      await era.printAndWait(`「……」`);

      return 0;
    } else if (
      era.get(`talent:${target}:11`) === 1 ||
      era.get(`talent:${target}:12`) === 1 ||
      era.get(`talent:${target}:15`) === 1 ||
      era.get(`talent:${target}:30`) === 1 ||
      era.get(`talent:${target}:34`) === 1
    ) {
      if (era.get(`talent:${target}:278`)) {
        await era.printAndWait(`「就让${sc()}的光来抹杀你吧！」`);
      } else if (rand_n(3) === 0) {
        await era.printAndWait(`「才不会输的!！」`);
      } else if (rand_n(2) === 0) {
        await era.printAndWait(`「区区你这样的家伙！」`);
      } else {
        await era.printAndWait(`「${sc()}的力量……好好地见识一下吧！」`);
      }
    } else if (
      era.get(`talent:${target}:10`) === 1 ||
      era.get(`talent:${target}:26`) === 1
    ) {
      if (era.get(`talent:${target}:256`)) {
        await era.printAndWait(`「咳呜咳呜……偏偏这种时候……」`);
      } else {
        await era.printAndWait(`「呜啊、还、还不想死啊……」`);
      }

      return 0;
    } else {
      if (era.get(`talent:${target}:258`)) {
        await era.printAndWait(`「跟得上${sc()}的速度吗？」`);
      } else if (rand_n(3) === 0) {
        await era.printAndWait(`「会加油的！」`);
      } else if (rand_n(2) === 0) {
        await era.printAndWait(`「到${sc()}的回合了！」`);
      } else {
        await era.printAndWait(`「才不会输呢！」`);
      }
    }
  } else {
    if (
      era.get(`talent:${target}:21`) === 1 ||
      era.get(`talent:${target}:22`) === 1
    ) {
      await era.printAndWait(`「……」`);

      return 0;
    } else if (
      era.get(`talent:${target}:11`) === 1 ||
      era.get(`talent:${target}:12`) === 1 ||
      era.get(`talent:${target}:15`) === 1 ||
      era.get(`talent:${target}:30`) === 1 ||
      era.get(`talent:${target}:34`) === 1
    ) {
      if (rand_n(3) === 0) {
        await era.printAndWait(`「向魔王大人屈服吧！」`);
      } else if (rand_n(2) === 0) {
        await era.printAndWait(`「不要再做无用的抵抗了！」`);
      } else {
        await era.printAndWait(`「${sc()}新的力量……好好地见识一下吧！」`);
      }
    } else if (
      era.get(`talent:${target}:10`) === 1 ||
      era.get(`talent:${target}:26`) === 1
    ) {
      await era.printAndWait(`「神圣的力量……呜呜」`);

      return 0;
    } else {
      if (rand_n(3) === 0) {
        await era.printAndWait(`「你也总有一天会明白的」`);
      } else if (rand_n(2) === 0) {
        await era.printAndWait(`「美妙的力量啊……」`);
      } else {
        await era.printAndWait(`「啊啊……这涌上来的力量……！」`);
      }
    }
  }

  return 0;
}

async function ntr_koujo_k3(rand, p_arg = 0) {
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const master_name = chara_name(0);
  const sc = () => self_call(target);
  const kojo = chara(target).kojo;
  let p = 0;

  p = p_arg;

  if (kojo.NTR再捕获 === 0) {
    // CFLAG:650  = 1（变量语义：CFLAG 族，650）
    kojo.NTR再捕获 = 1;
  }

  if (p === 1) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(`「啊啊…对不起…对不起…魔王大人啊……」`);
      await era.printAndWait(
        `${target_name}流着眼泪对无法将纯洁献给${master_name}的事情不停地道歉………`,
      );
    } else {
      await era.printAndWait(
        `「快，快停下来…不、不要继续下去了…啊啊啊…不要啊啊啊！」`,
      );
    }
    // CFLAG:651  = 1（变量语义：CFLAG 族，651）
    kojo.NTR_651 = 1;
  } else if (p === 2) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「啊啊~~…肛门…有感觉了…明明不可以的…啊…啊啊~…嗯~！」`,
      );
    } else {
      await era.printAndWait(`「狂王大人…玩笑…过分了…哇…啊啊啊啊！」`);
    }
    // CFLAG:652  = 1（变量语义：CFLAG 族，652）
    kojo.NTR_652 = 1;
  } else if (p === 3) {
    if (era.get(`talent:${target}:136`)) {
      await era.printAndWait(
        `「啊啊~~♪…请继续看着被狗侵犯还会有感觉的${sc()}吧~~${heart(1)}」`,
      );
    } else if (
      era.get(`talent:${target}:76`) ||
      era.get(`talent:${target}:85`)
    ) {
      await era.printAndWait(`「啊啊…居然被这样对待…魔王大人…救…命………」`);
    } else {
      await era.printAndWait(
        `「不要看呀…不要看呀…哈啊哈啊哈啊嗯！腰…不要这样动啊…啊嗯啊啊啊~！」`,
      );
    }
    // CFLAG:653  = 1（变量语义：CFLAG 族，653）
    kojo.NTR_653 = 1;
  } else if (p === 4) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「啊~…哈~…啊嗯啊~…被狂王大人侵犯什么的…十分舒服的说~…${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「狂王大人~…更加…请更多侵犯${sc()}吧…请更加侵犯${sc()}吧~~~~……♪」`,
      );
    }
    // CFLAG:654  = 1（变量语义：CFLAG 族，654）
    kojo.NTR_654 = 1;
  } else if (p === 5) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「大家~~~…请更多…请更多地侵犯${sc()}吧…不管是肛穴还是小穴都想要被大家侵犯呢${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「啊啊~…这样…这样淫乱的…啊哈嗯呜~~~！肛门…肛门是不行的呀~…♪」`,
      );
    }
    // CFLAG:655  = 1（变量语义：CFLAG 族，655）
    kojo.NTR_655 = 1;
  } else if (p === 6) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「咕嗯噗呼…给予精液真是非常感谢♪${'\u3000'}…啊嗯~~咕嗯~…请往小穴里将精液都射出来吧~~${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「哈啊哈啊~…是的…${sc()}的小穴是免费的哦…不管射多少都没关系的~~~♪」`,
      );
    }
    // CFLAG:656  = 1（变量语义：CFLAG 族，656）
    kojo.NTR_656 = 1;
  } else if (p === 7) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「哈啊~…啊嗯啊~…对不起魔王大人…${sc()}被狂王大人抱着…嗯~哈嗯~…♪」`,
      );
      await era.printAndWait(
        `「成为了狂王大人的仆人了呢…${heart(1)} 啊啊~…${sc()}会…更多地侍奉狂王大人的~${heart(1)}」`,
      );
      await era.printAndWait(
        `这样说着的${target_name}再次开始了对狂王的侍奉………`,
      );
    } else {
      await era.printAndWait(
        `「啊啊~…狂王大人~…感觉舒服吗~~？ 嗯哼哼~~……${sc()}会让狂热大人更加舒服起来的呀~~~~♪」`,
      );
    }
    // CFLAG:657  = 1（变量语义：CFLAG 族，657）
    kojo.NTR_657 = 1;
  } else if (p === 20) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      if (chara(target).event.妊娠相手 === 1) {
        await era.printAndWait(`「不要啊！那个人的孩子！快回去！快回去啦！」`);
      } else {
        await era.printAndWait(`「呜呜呜…被做了这种事情，${sc()}已经…呜呜呜」`);
      }
    } else {
      await era.printAndWait(
        `「${sc()}连肚子的里面都是狂王大人的东西了呀~…啊啊~♪」`,
      );
    }
  }
  return 0;
}

async function exucution_koujo_k3(rand) {
  void rand;
  const target = era_flag.target;
  const sc = () => self_call(target);

  if (game.event.犬射精或处刑口上 === 4) {
    await era.printAndWait(
      `「哈啊！${sc()}居然成为了怪物的慰安妇什么的…啊…不要…不要啊啊~！」`,
    );
  } else if (game.event.犬射精或处刑口上 === 5) {
    await era.printAndWait(`「${sc()}在…${sc()}在消失着………」`);
  } else if (game.event.犬射精或处刑口上 === 6) {
    await era.printAndWait(`「只要能忍受地了真的就能解放${sc()}了对吧？」`);
  } else if (game.event.犬射精或处刑口上 === 7) {
    await era.printAndWait('');
  }
}

async function museum_koujo_k3(rand) {
  void rand;
  const target = era_flag.target;
  const sc = () => self_call(target);

  if (game.event.博物馆口上 === 0) {
    await era.printAndWait(
      `「把${sc()}变成石头当装饰什么的…真是…十分地恶趣味啊………」`,
    );
  } else if (game.event.博物馆口上 === 1) {
    await era.printAndWait(`「到这种地方来才不是为了被剥制的啊！」`);
  } else if (game.event.博物馆口上 === 2) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 === 3) {
    await era.printAndWait(`「很、很让人害羞的啊…快点结束本小姐这种耻辱的…」`);
  } else if (game.event.博物馆口上 === 4) {
    await era.printAndWait(
      `「让尊贵的${sc()}、变成人偶…哪、哪里…搞、错……了……吧…啊…」`,
    );
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

async function banishment_koujo_k3(rand) {
  void rand;
  const target = era_flag.target;
  const sc = () => self_call(target);

  if (game.event.流放口上 === 0) {
    await era.printAndWait(`${sc()}的…${sc()}的力量…完全…没有了啊………」`);
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

async function public_exucution_koujo_k3(rand) {
  void rand;
  const target = era_flag.target;
  const sc = () => self_call(target);

  if (game.event.公开处刑口上 === 0) {
    await era.printAndWait(
      `「已经…什么都…感觉不到了…啊…啊啊啊啊…${sc()}的…噶………咳咳」`,
    );
  } else if (game.event.公开处刑口上 === 1) {
    await era.printAndWait(`「这样终于能轻松了呢………」`);
  } else if (game.event.公开处刑口上 === 2) {
    await era.printAndWait('');
  }
}

async function grotesque_koujo_k3(rand) {
  void rand;
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

async function enterenemy_koujo_k3(rand) {
  void rand;
  const a = era_flag.target;

  if (era.get(`talent:${a}:21`) === 1 || era.get(`talent:${a}:22`) === 1) {
    await era.printAndWait(`「………${self_call(a)}会打倒魔王的」`);
  } else if (
    era.get(`talent:${a}:11`) === 1 ||
    era.get(`talent:${a}:12`) === 1 ||
    era.get(`talent:${a}:15`) === 1 ||
    era.get(`talent:${a}:30`) === 1 ||
    era.get(`talent:${a}:34`) === 1
  ) {
    await era.printAndWait(
      `「噢吼～吼吼吼！魔王什么的${self_call(a)}用一根手指头就能打败给你看~！」`,
    );
  } else if (
    era.get(`talent:${a}:10`) === 1 ||
    era.get(`talent:${a}:26`) === 1
  ) {
    await era.printAndWait(
      `「${self_call_first(a)}、只凭${self_call(a)}真的能将魔王给打倒吗…？」`,
    );
  } else {
    await era.printAndWait(`「${self_call(a)}绝对不会输给…魔王什么的！！」`);
  }
}

async function gohoubi_request_koujo_k3(rand) {
  void rand;
  const a = era_flag.target;

  if (chara(a).stronghold.要求奖赏 === 0) {
    await era.printAndWait(`「${self_call(a)}想要钱当报酬的说」`);
  } else if (
    chara(a).stronghold.要求奖赏 === 1 ||
    chara(a).stronghold.要求奖赏 === 2 ||
    chara(a).stronghold.要求奖赏 === 3
  ) {
    // 同一行输出：无后缀 PRINTFORM 链，
    // 是三选一的野兽名，PRINTFORMW 收行（#623）
    const beast =
      chara(a).stronghold.要求奖赏 === 1
        ? `狗`
        : chara(a).stronghold.要求奖赏 === 2
          ? `猪`
          : `马`;
    await era.printAndWait(
      `「${self_call(a)}…这场战斗完后想要跟…` +
        beast +
        `交配想得受不了了~…！」`,
    );
  } else if (chara(a).stronghold.要求奖赏 === 4) {
    await era.printAndWait(
      `「如果打倒了勇者的话…请给${self_call(a)}亲吻当奖品吧~~~」`,
    );
  } else if (chara(a).stronghold.要求奖赏 === 5) {
    await era.printAndWait(
      `「回来了，请让${self_call(a)}火热的身体平静下来吧~~」`,
    );
  } else if (chara(a).stronghold.要求奖赏 === 6) {
    await era.printAndWait(`「请为${self_call(a)}保存着多多的精液吧~~」`);
  } else if (chara(a).stronghold.要求奖赏 === 7) {
    await era.printAndWait(
      `「${self_call(a)}期待着为了${self_call(a)}而展开的性交派对哦~」`,
    );
  } else if (chara(a).stronghold.要求奖赏 === 8) {
    await era.printAndWait(
      `「能治愈${self_call(a)}战后的饥渴…只有魔王大人的小便哦」`,
    );
  } else if (chara(a).stronghold.要求奖赏 === 9) {
    await era.printAndWait(`「童贞的大鸡巴…作为胜利的报酬是不是很好呀~？」`);
  }
}

async function gohoubi_after_koujo_k3(rand, cid, choice) {
  void rand;
  void cid;
  const a = era_flag.target;

  if (choice === 0) {
    await era.printAndWait(`「难得${self_call(a)}…什，什么都没有啦」`);
  } else if (choice === 1) {
    await era.printAndWait(
      `「哼哼哼~、要得到多少个勋章才能给${self_call(a)}奖赏呢~？」`,
    );
  } else if (choice === 2) {
    if (chara(a).stronghold.要求奖赏 === 0) {
      await era.printAndWait(
        `「非常地感谢。那个…这个钱${self_call(a)}想要送回老家可以吗………」`,
      );
    } else if (chara(a).stronghold.要求奖赏 === 1) {
      if (era.get(`talent:${a}:0`) === 1) {
        await era.printAndWait(
          `「哈嗯呜~！${self_call(a)}是最喜欢跟狗狗肛交的变态来的~${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「哈嗯呜~！${self_call(a)}是最喜欢和狗狗做爱的变态来的~${heart(1)}」`,
        );
      }
    } else if (chara(a).stronghold.要求奖赏 === 2) {
      if (era.get(`talent:${a}:0`) === 1) {
        await era.printAndWait(
          `「哈啊嗯呜~！${self_call(a)}是最喜欢跟猪肛交的大变态来的~${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「哈啊嗯哈~！${self_call(a)}是最喜欢跟猪做H的事情的变态来的~~${heart(1)}」`,
        );
      }
    } else if (chara(a).stronghold.要求奖赏 === 3) {
      if (era.get(`talent:${a}:0`) === 1) {
        await era.printAndWait(
          `「啊呜啊嗯呜呜~~~！${self_call(a)}是最喜欢跟马肛交的大变态来的~~${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「啊呜啊嗯呜呜~~~！${self_call(a)}是最喜欢跟马SEX的大变态来的${heart(1)}」`,
        );
      }
    } else if (chara(a).stronghold.要求奖赏 === 4) {
      await era.printAndWait(`，今天的KISS十分地甜蜜呢`);
    } else if (chara(a).stronghold.要求奖赏 === 5) {
      if (era.get(`abl:${a}:2`) > era.get(`abl:${a}:3`)) {
        await era.printAndWait(
          `「奖励SEX最棒了~…啊啊嗯~~~！啊嗯~~~…请给${self_call(a)}更多的SEX吧~~！」`,
        );
      } else {
        await era.printAndWait(
          `「啊嗯~~！肛交SEX好棒，好舒服啊嗯~${heart(1)}」`,
        );
      }
    } else if (chara(a).stronghold.要求奖赏 === 6) {
      await era.printAndWait(
        `「精液对于${self_call(a)}是最棒的奖励来的呀~~${heart(1)}」`,
      );
    } else if (chara(a).stronghold.要求奖赏 === 7) {
      if (era.get(`talent:${a}:0`) === 1) {
        await era.printAndWait(
          `「啊、啊啊啊嗯~~…乱交派对真是太棒了呀~~…${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「啊、啊哈啊嗯~…乱交派对真是最棒的呀~~~…${heart(1)}」`,
        );
      }
    } else if (chara(a).stronghold.要求奖赏 === 8) {
      await era.printAndWait(
        `「咕嗯~咕嗯~呜哼~…谢谢魔王大人~魔王大人的小便好好喝的说~♪」`,
      );
    } else if (chara(a).stronghold.要求奖赏 === 9) {
      if (era.get(`abl:${a}:2`) > era.get(`abl:${a}:3`)) {
        await era.printAndWait(`「啊啊~~…童真狩猎要变成癖好了呀~~♪」`);
      } else {
        await era.printAndWait(
          `「呜哼哼~~、想要塞进小穴那里是吧~？${'\u3000'}真是残念呢、小穴那是属于魔王大人的东西来的~♪」`,
        );
      }
    } else {
      /* empty — ELSE 无输出 */
    }
  }
}

async function osioski_koujo_k3(rand, cid, choice) {
  void rand;
  void cid;
  const a = era_flag.target;

  if (choice === 0) {
    await era.printAndWait(`「得、得救了呀………」`);
  } else if (choice === 1) {
    if (era.get(`abl:${a}:21`) >= 3) {
      await era.printAndWait(`「哔哩哔哩地！啊~~哈啊~~~！哔哩~${heart(1)}」`);
    } else {
      await era.printAndWait(`「不，不要啊~~~！电什么的不要啊！啊哇哇哇哇哇」`);
    }
  } else if (choice === 2) {
    if (era.get(`abl:${a}:17`) >= 4) {
      await era.printAndWait(
        `「请看着${self_call(a)}的自慰来好好地撸一发吧~~♪${'\u3000'}啊，触碰可是严禁的噢」`,
      );
    } else {
      await era.printAndWait(
        `「啊、啊啊啊…在那么多人的面前自慰什么的…脑袋好像要沸腾一样了………」`,
      );
    }
  } else if (choice === 3) {
    if (era.get(`abl:${a}:17`) >= 6) {
      await era.printAndWait(
        `「哦吼吼…在被大家注目着自慰什么，真是受不了啊~${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「“长着一张好脸蛋，出来的味道连鼻子都要臭歪了什么的”…好过分、好过分啊………」`,
      );
    }
  } else if (choice === 4) {
    if (era.get(`abl:${a}:21`) >= 3) {
      await era.printAndWait(
        `「啊哈嗯呜~~！请用鞭子将${self_call(a)}打到气绝为止吧~~${heart(1)}」`,
      );
    } else {
      await era.printAndWait(`「已经不要了啊~！不要再打了啊啊！」`);
    }
  } else if (choice === 5) {
    if (era.get(`talent:${a}:88`) === 1 || era.get(`talent:${a}:76`) === 1) {
      await era.printAndWait(
        `「哈呼嗯~、哼嗯~…小便对脸蛋是有美容效果的噢、所以请往${self_call(a)}的脸上尿尿吧~♪」`,
      );
    } else {
      await era.printAndWait(`「呜噗嗯…呜嗯…咕嗯…呜呜呜…不要…不要了啊………」`);
    }
  } else if (choice === 6) {
    await era.printAndWait(`「为什么要让${self_call(a)}做这样的…」`);
  } else if (choice === 7) {
    await era.printAndWait(`「不吃饭的话就没有力气了啊………」`);
  } else if (choice === 8) {
    await era.printAndWait(
      `「已经，已经忍不住了啊！拜托了啊！不管是谁都可以啊！请，请给我大鸡巴吧！」`,
    );
  } else if (choice === 9) {
    await era.printAndWait(`「啊呜呃嗯啊～不要啊～」`);
  }
}
// #570 起返回语尾文字、不打印（PRINT 不换行，由调用方拼进同一行）。
// 形参序修正为 (arg_0, rand)：#403 起曾写反成 (rand, arg_0 = 0)，族实参
// [arg0, rand] 反接后真调用即 TypeError（登记在 docs/stub-registry.md 的
// GOBI_KOUJO 行，随这张工单修正）。
function gobi_koujo_k3(arg_0, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));

  if (arg_0 === 1) {
    return `的噢~♪`;
  } else if (arg_0 === 2) {
    return `的啊！`;
  } else if (arg_0 === 3) {
    return `来着……。`;
  } else if (arg_0 === 4) {
    return `来的……呢~。`;
  } else if (arg_0 === 5) {
    return `的噢……呜~。`;
  } else {
    if (rand_n(3) === 0) {
      return `的说。`;
    } else if (rand_n(2) === 0) {
      return `噢。`;
    } else {
      return `噢。`;
    }
  }
}

// 注册进分发族（TRYCALLFORM KOJO_MESSAGE_COM_3 的等价物；重复注册抛错）
kojo_message_com_family.register(3, kojo_message_com_3);
self_kojo_family.register(3, self_kojo_k3);
kojo_message_palamcng_family.register(3, kojo_message_palamcng_3);
kojo_message_markcng_family.register(3, kojo_message_markcng_3);
gohoubi_after_koujo_family.register(3, (cid, choice) =>
  gohoubi_after_koujo_k3(undefined, cid, choice),
);
osioski_koujo_family.register(3, (cid, choice) =>
  osioski_koujo_k3(undefined, cid, choice),
);
gohoubi_request_koujo_family.register(3, () => gohoubi_request_koujo_k3());
ryouzyoku_kojo_family.register(3, dungeon_ryouzyoku_k3);
ryouzyoku_after_kojo_family.register(3, dungeon_ryouzyoku_after_k3);
gobi_koujo_family.register(3, gobi_koujo_k3);
benki_koujo_family.register(3, benki_koujo_k3);
enterenemy_koujo_family.register(3, enterenemy_koujo_k3);
dungeon_victory_family.register(3, dungeon_victory_k3);
dungeon_attack_family.register(3, dungeon_attack_k3);
ntr_koujo_family.register(3, ntr_koujo_k3);
exucution_koujo_family.register(3, exucution_koujo_k3);
museum_koujo_family.register(3, museum_koujo_k3);
banishment_koujo_family.register(3, banishment_koujo_k3);
public_exucution_koujo_family.register(3, public_exucution_koujo_k3);
grotesque_koujo_family.register(3, grotesque_koujo_k3);

module.exports = {
  kojo_message_com_3,
  dog_kojo_3,
  colosseum_kojo_3,
  k3_kojo2,
};
