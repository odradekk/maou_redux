/**
 * @file 高貴性格口上 K3：指令口上（issue #46 黄金样本切片 + issue #234 全量复核）。
 *
 * 源: target/ERB/口上/EVENT_K3_高貴.ERB  @EVENTTRAIN #PRI（:81-85，存在
 *     标志 FLAG:103）@EVENTEND #LATER（:87-89，清标志）
 *     @KOJO_MESSAGE_COM_3（:887；七道跳过判定 :888-912；爱抚 CFLAG:301
 *     状态机 :920-1105——黄金样本 emuera.log:26 出自 :1097；舔阴 CFLAG:302
 *     :1110-1147；肛门爱抚 CFLAG:303 :1152-1197；自慰 CFLAG:304 :1202-1323；
 *     胸爱抚 CFLAG:306 :1328-1406；接吻 CFLAG:307 :1412-1517）
 *
 * == 状态机（CFLAG:301，:918 注释「コマンド実行時のセリフ CFLAG 301～400
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
 * 这张票存根（docs/stub-registry.md）：COLOSSEUM_KOJO_3 / DOG_KOJO_3（守卫
 * 岔开的专用口上）与尚未落地的其余 SELECTCOM 分支。
 */

const era = require('#/era-electron');
const { on, TIER } = require('#/system/event/registry');
const era_flag = require('#/era-utils/era-flag');
const { PALAMLV } = require('#/era-utils/palam-level');
const { kojo_message_com_family } = require('#/kojo/kojo-system');
const { heart, self_call, self_call_first } = require('#/kojo/kojo-text');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { chara_callname, chara_name } = require('#/utils/callname-utils');
const { stub_line } = require('#/utils/stub-line');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。
 */
const STUBBED_CALLS = ['COLOSSEUM_KOJO_3', 'DOG_KOJO_3', 'KOJO_MESSAGE_COM_3'];

// @EVENTTRAIN #PRI（:81-85）：存在标志 + 总开关补 0（同 EVENT_K.ERB 语义）
on(
  'EVENTTRAIN',
  () => {
    game.kojo.口上存在_3 = 1; // :83 FLAG:103 = 1（K3 口上存在标志）
    if (game.kojo.口上开关 === 0) {
      game.kojo.口上开关 = 2; // :84-85
    }
  },
  TIER.PRI,
);

// @EVENTEND #LATER（:87-89）：调教结束清存在标志
on(
  'EVENTEND',
  () => {
    game.kojo.口上存在_3 = 0; // :89
  },
  TIER.LATER,
);

/**
 * @KOJO_MESSAGE_COM_3（:887-1105）：七道跳过判定 + 爱抚分支。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（[0, n) 整数；缺省
 *   均匀随机，测试注入定值序——分支序恒为 RAND:3 后 RAND:2）
 * @returns {Promise<number>} 0（RETURN 0；TRYCALLFORM 不读返回值）
 */
async function kojo_message_com_3(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const master_name = chara_name(0); // %NAME:MASTER%（MASTER 恒角色 0）
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%
  const scf = () => self_call_first(target); // %SELF_CALL_FIRST(TARGET)%
  const kojo = chara(target).kojo;

  // :888-892 死斗场中は専用口上
  if (era.get(`tequip:${target}:55`)) {
    stub_line('COLOSSEUM_KOJO_3', '死斗场专用口上', '随死斗场票');
    return 0;
  }
  // :894-895 助手が調教した時に口上をスキップする
  if (era_flag.assi > 0 && era_flag.assiplay) {
    return 0;
  }
  // :897-898 口塞着用時（SELECTCOM == 45 自己说话不算）
  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 45) {
    return 0;
  }
  // :900-901 失神時（TFLAG:899）——跨域读属主 train 的一维门面
  if (game.train.失神) {
    return 0;
  }
  // :903-906 兽奸PLAY中は専用口上
  if (era.get(`tequip:${target}:89`)) {
    stub_line('DOG_KOJO_3', '兽奸专用口上', '随兽奸票');
    return 0;
  }
  // :908-909 崩坏した場合（TALENT:9）
  if (era.get(`talent:${target}:9`) === 1) {
    return 0;
  }
  // :911-912 触手調教中（TEQUIP:90）
  if (era.get(`tequip:${target}:90`)) {
    return 0;
  }

  // :920 IF SELECTCOM == 0（爱抚）。其余指令分支随各自指令票
  if (era_flag.selectcom === 0) {
    const mark = (i) => era.get(`mark:${target}:${i}`) || 0;

    // :921-931 初めて（CFLAG:301 == 0）
    if (kojo.爱抚 === 0) {
      // :923-929 屈服刻印Lv2以上
      if (mark(2) >= 2) {
        // :925
        await era.printAndWait(
          '「嗯呼嗯~…啊~…呃~…请更加温柔…一…点……哈啊嗯~！」',
        );
      } else {
        // :928
        await era.printAndWait('「不，不要触摸…呃呜…呜呃呜~~~………」');
      }
      kojo.爱抚 = 1; // :930
      return 0; // :931
    }

    // :932-1104 二回目以降
    // :934-953 淫乱（TALENT:76）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.爱抚 <= 599 || game.kojo.口上开关 === 2)
    ) {
      // :936 ;;ランダムで口上が変化する
      if (rand_n(3) === 0) {
        await era.printAndWait(
          `「呜哈嗯啊~…主人~…请更加摩擦那里吧~${heart(1)}」`,
        ); // :938
        await era.printAndWait(
          `${target_name}张开自己的双腿，诱导着${player_name}的手………`,
        ); // :939
        await era.printAndWait(
          `「${sc()}的身体是…被下流的抚摸了的话…就会热得要燃烧起来了${heart(3)}」`,
        ); // :940
        await era.printAndWait(
          `${target_name}淫乱地蠕动着身体、接受着${player_name}的爱抚………`,
        ); // :941
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          '「啊、啊啊~……主人~…这里、这里~……请用、主人的手指来、好好地欺负一下~……」',
        ); // :943
        era.print(
          `${player_name}开始爱抚后、${target_name}立马将双脚大幅度地张开了、如同为了让股间突出来一样挺起了腰。`,
        ); // :944 PRINTFORML
        await era.printAndWait(
          `慢慢将手靠近蜜穴后、期待让${target_name}的腰部颤抖了起来、呼吸变得凌乱了。`,
        ); // :945
        await era.printAndWait(
          `「啊哈啊嗯~…${heart(1)} 好棒……果然,主人的手指，真的好美妙啊~${heart(3)}」`,
        ); // :946
      } else {
        await era.printAndWait(
          '「啊嗯~、嗯~、呜~…！更、更多、激烈地…更多、请更加粗暴地做吧~……啊~、啊、啊……！」',
        ); // :948
        era.print(
          `${target_name}将生来的高贵姿态完全扔掉了，不像样的将双脚敞开、沉醉在了${player_name}的爱抚之下。`,
        ); // :949 PRINTFORML
        await era.printAndWait(
          `${target_name}只是贪图着给予的快乐而已、如同用淫猥之声演奏的乐器一样，娇喘的音高随着爱抚的手指动作而一上一下。`,
        ); // :950
        await era.printAndWait(
          `「啊啊~！请将${sc()}下流的身体、玩弄地翻来覆去吧……........直到坏掉为止......！」`,
        ); // :951
      }
      kojo.爱抚 = 600; // :953
    } else if (
      // :955-975 爱慕（TALENT:85）
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.爱抚 <= 499 || game.kojo.口上开关 === 2)
    ) {
      // :956 ;;ランダムで口上が変化する
      if (rand_n(3) === 0) {
        await era.printAndWait(
          `「啊~…嗯~…${player_name}太…太过温柔了…感觉有点害怕呀~………♪」`,
        ); // :958
        await era.printAndWait(
          `${target_name}每当被${master_name}触摸后都会发出娇喘………`,
        ); // :959
        await era.printAndWait(
          `「啊啊…喜欢…喜欢的说…被做了这样的事情…${sc()}…已经~…♪」`,
        ); // :960
        await era.printAndWait(
          `${target_name}的娇喘慢慢变成越来越急促的喘息声………`,
        ); // :961
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `「啊哈……啊啊、${player_name}…请……更加地、用自己喜欢的方式来、抚摸吧~……」`,
        ); // :963
        era.print(
          `${target_name}让${player_name}更加容易抚摸而将脚张开，将身子靠向了你。`,
        ); // :964 PRINTFORML
        era.print('还不仅仅如此、是为了更加感受到爱抚带来的刺激吧、'); // :965 PRINTFORML
        await era.printAndWait(
          `${player_name}的手触碰到的部位、都会向着手压过去。`,
        ); // :966
        await era.printAndWait(
          `「${target_name}的身体，已经变成仅仅是被${player_name}大人抚摸就能感到无上的愉悦感的身体了……${heart(1)}」`,
        ); // :967
      } else {
        await era.printAndWait(
          `「啊、啊嗯~、${player_name}大人的手……最喜欢的、最令人怜爱的手……哈啊啊~${heart(1)}」`,
        ); // :969
        era.print(
          `${target_name}将自己的手放在了${player_name}手的上方、开始对自己的身体爱抚了起来。`,
        ); // :970 PRINTFORML
        await era.printAndWait(
          `为了感受到更加强烈的刺激而将${player_name}手用力地向下压、还轻轻地用手指对${player_name}的手背爱抚着。`,
        ); // :971
        await era.printAndWait(
          `「让${sc()}的心折服了的、残酷的手……教给${sc()}的身体、如何感受淫乐的温柔的手……」`,
        ); // :972
        await era.printAndWait(
          `「呜啊~、嗯~…${sc()}会……任由这只手的摆布的……被这只手引导的话、不管堕落到哪里都愿意……${heart(1)}」`,
        ); // :973
      }
      kojo.爱抚 = 500; // :975
    } else if (
      // :977-1019 屈服刻印Lv3（百位 4xx 阶段，个位数推进）
      mark(2) === 3 &&
      (kojo.爱抚 <= 399 || game.kojo.口上开关 === 2)
    ) {
      // :978 ;;追記者／回数で口上が進む
      if (kojo.爱抚 <= 400) {
        // :980-988 ;;快乐刻印Lv3
        if (mark(1) === 3) {
          await era.printAndWait(
            `「啊~…${scf()}、${sc()}的……身体……已经、太舒服了…完全……反抗不了了呀……」`,
          ); // :982
          era.print(
            `${target_name}发出了屈服宣言和喘息混合起来的娇喘，将身子托付给了正在爱抚的双手。`,
          ); // :983 PRINTFORML
          await era.printAndWait(
            `${player_name}稍微提高正在爱抚的手的力度后、就如同${target_name}自己所说的那样根本不反抗，直率地发出了大声的娇喘。`,
          ); // :984
          await era.printAndWait(
            `「啊哈~…啊~！啊、呜啊~……！被，被这么地、爱抚的话…${sc()}要……啊哈呜~……！」`,
          ); // :985
        } else {
          await era.printAndWait(
            '「哈啊…啊~…嗯~…啊呃嗯~…为、为什么…会那么舒服的…呢……啊~♪」',
          ); // :987
        }
        kojo.爱抚 = 401; // :989
      } else if (kojo.爱抚 === 401) {
        // :991-1002 ;;快乐刻印Lv3
        if (mark(1) === 3) {
          await era.printAndWait(
            '「啊、啊啊…为、为什么……嗯~、为什么、这么……温柔地、抚摸呢……啊~……」',
          ); // :993
          era.print(
            `被不停重复地给予着不太强烈，也不太弱的刺激、${target_name}全身的皮肤都冒出湿润的汗。`,
          ); // :994 PRINTFORML
          await era.printAndWait(
            '蜜穴微微地渗出了水滴、用手指稍微粗鲁一点的话，便出现了哔啦哔啦的水声。',
          ); // :995
          await era.printAndWait(
            `「不要嗯~…声音、怎么会……像这样、被弄出声音来…的话、嗯…快…快要羞死了${sc()}……」`,
          ); // :996
        } else {
          await era.printAndWait(
            '「啊…温柔的、抚摸的话……就不会、就不会抵抗了…啊~！当、当然、其…其他的也……」',
          ); // :998
          era.print(
            `温柔地用手来回抚摸后、${target_name}为了更加享受抚摸带来的感觉的那样将眼睛闭上了。`,
          ); // :999 PRINTFORML
          await era.printAndWait('然后伴随着细微的喘息声、恍惚地喃喃自语着。'); // :1000
          await era.printAndWait(
            `「但，但是…如果可以做得到的话、请温柔地……${sc()}也会、害怕疼的……啊哈嗯、啊嗯~…嗯嗯、嗯~……」`,
          ); // :1001
        }
        kojo.爱抚 = 402; // :1003
      } else if (kojo.爱抚 === 402) {
        await era.printAndWait(
          '「啊、啊嗯~、啊……哈啊…哈啊……啊哈唔！？嗯~、突、突然，变快的话……啊呼嗯呜~！」',
        ); // :1005
        era.print(
          `对于习惯了爱抚的速度、而放松了的${target_name}、突然加快了爱抚的速度。`,
        ); // :1006 PRINTFORML
        await era.printAndWait(
          `被变化带来的快乐的波浪玩弄、${target_name}先前还用憎恨的眼神看着${player_name}、而现在眼睛却湿润了起来，依靠着${player_name}。`,
        ); // :1007
        await era.printAndWait(
          `「哈呜嗯~！嗯~、那…那个手在……将${sc()}的身体、弄出了下流的声音了……啊、嗯…${player_name}的…啊~！」`,
        ); // :1008
        kojo.爱抚 = 403; // :1009
      } else {
        // :1010-1019 ;;ランダムで口上が変化する
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「哈啊啊~…啊啊啊~…被、被这么地…这么地…爱抚了的话……${sc()}…${sc()}、已经……嗯嗯~！」`,
          ); // :1013（%SELF_CALL(TARGET, 1)% 与 %SELF_CALL(TARGET)% 同值）
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「哼唔呜~……！嗯呜~！嗯~嗯~嗯~！嗯呜呜~……已经…太过舒服了、${sc()}要…啊啊~……！」`,
          ); // :1015
        } else {
          await era.printAndWait(
            '「好、好棒……是的、那里……就是那里来的、那里~……啊~！那里、好舒服的啊~……啊嗯~！」',
          ); // :1017
        }
      }
    } else if (
      // :1021-1050 屈服刻印Lv2＆快乐刻印Lv3（百位 3xx 阶段）
      mark(2) === 2 &&
      mark(1) === 3 &&
      (kojo.爱抚 <= 299 || game.kojo.口上开关 === 2)
    ) {
      // :1022 ;;追記者／回数で口上が進む
      if (kojo.爱抚 <= 300) {
        await era.printAndWait(
          '「哈呜呜嗯~…嗯~、嗯…不、不行…要、要忍不住了…啊~、啊……！」',
        ); // :1024
        era.print(
          `只是稍微地给蜜穴挠了一下痒、${target_name}的身体就大幅度地颤抖起来了。`,
        ); // :1025 PRINTFORML
        await era.printAndWait(
          '是因为被铭刻在身体深处的愉悦的记忆被引出来了吧、颤抖着大声地娇喘起来了。',
        ); // :1026
        await era.printAndWait(
          '「啊~、啊……！不行~、忍…忍不……忍不住……了啊…哈啊嗯~…！」',
        ); // :1027
        kojo.爱抚 = 301; // :1028
      } else if (kojo.爱抚 === 301) {
        await era.printAndWait(
          '「请，请原…哈呜啊~！请原谅…嗯~！原谅了……！再这样…再这样、被抚摸了的话……」',
        ); // :1030
        era.print(
          `${target_name}微弱地扭动着身体、想要尝试逃离${player_name}的双手。`,
        ); // :1031 PRINTFORML
        await era.printAndWait(
          `但是、被温柔地抚摸而失去了力气、又回到了${player_name}的手的旁边将身体靠了过去。`,
        ); // :1032
        await era.printAndWait(
          `「请，请不要…改变……再这样下去、${sc()}就要…啊、这个……哼啊~、那个…太舒服了……啊啊~……」`,
        ); // :1033
        kojo.爱抚 = 302; // :1034
      } else if (kojo.爱抚 === 302) {
        await era.printAndWait(
          '「啊、啊啊…已经、不行……已经…忍…不住了……啊、嗯、啊啊~……！」',
        ); // :1036
        era.print(
          `现在已经将厌恶感什么的给忘记了吧、${target_name}貌似习惯被触碰了的那样，将身体交给爱抚的双手。`,
        ); // :1037 PRINTFORML
        await era.printAndWait(
          '双腿的绷紧的肌肉一跳一跳地、但是完全没有抵抗，只是快乐带来的反射而已，而且还从嘴边漏出了淫艳的娇喘声。',
        ); // :1038
        await era.printAndWait(
          `「再，再这样下去的话……${sc()}…${scf()}、${sc()}要……啊嗯~、嗯~…嗯哈呜嗯~……！」`,
        ); // :1039
        kojo.爱抚 = 303; // :1040
      } else {
        // :1042-1049 ;;ランダムで口上が変化する
        if (rand_n(3) === 0) {
          await era.printAndWait(
            '「呀…！嗯~、嗯呀~……啊~、忍…忍耐……啊哈~！啊~、啊~啊~……啊！」',
          ); // :1044
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            '「这~、这样~…嗯~、明明被，当成玩具来…呼嗯~、呜啊啊~……！」',
          ); // :1046
        } else {
          await era.printAndWait(
            '「哈~、啊……啊~、啊啊啊……！啊、呜啊~、不要啊~……」',
          ); // :1048
        }
      }
    } else if (
      // :1052-1102 それ以外（百位 2xx 阶段；黄金样本 :1097 在此）
      mark(2) <= 1 &&
      (kojo.爱抚 <= 1 || game.kojo.口上开关 === 2)
    ) {
      // :1053 ;;追記者／回数で口上が進む
      if (kojo.爱抚 <= 200) {
        // :1056-1066 ;;快乐刻印Lv3 分档（ELSEIF MARK:2 == 2 在本支门槛
        // MARK:2 <= 1 下不可达，1:1 保留）
        if (mark(1) === 3) {
          await era.printAndWait(
            '「啊嗯~、嗯~……明明…应该…感觉恶心来的……应该感觉、恶心来的呀…！」',
          ); // :1057
          era.print(
            `${target_name}大声地发出了困惑的声音，但是身体实实在在地对爱抚有所反应。`,
          ); // :1058 PRINTFORML
          await era.printAndWait(
            `如同在服从着${player_name}的手指那样、摇摇晃晃地晃动着腰部。`,
          ); // :1059
          await era.printAndWait(
            '「嗯呜……呼~、呜…不行……啊~！明明、那么令人恶心……的事情……」',
          ); // :1060
        } else if (mark(2) === 2) {
          // :1062-1063 ;屈服刻印Lv2（门槛下死支，1:1 保留）
          await era.printAndWait('「哈呜…这样的…只是要忍耐而已…而已…嗯~！」');
        } else {
          await era.printAndWait('「感觉真恶心…不要在…这样…触，触碰了…！」'); // :1065
        }
        kojo.爱抚 = 201; // :1067
      } else if (kojo.爱抚 === 201) {
        // :1069-1078 ;;快乐刻印Lv3
        if (mark(1) === 3) {
          await era.printAndWait(
            '「不、不要啊…啊哈唔、呀~…！不、不要摸啊……啊~、啊啊…！」',
          ); // :1071
        } else {
          await era.printAndWait(
            '「不是，说了、不要摸了没听到吗…嗯~！说了不要摸了啊…！」',
          ); // :1073
        }
        era.print(`${target_name}将眼睛闭起来、安静地忍耐着爱抚带来的刺激。`); // :1075 PRINTFORML
        await era.printAndWait(
          `${player_name}轻轻地抚摸了一下${target_name}紧紧闭着的眼皮子旁边后、${target_name}的身体颤抖起来，惊叫了一下。`,
        ); // :1076
        await era.printAndWait('「啊呜…！呃呜、呜~…怎、怎么……嗯嗯~！」'); // :1077
        kojo.爱抚 = 202; // :1078
      } else if (kojo.爱抚 === 202) {
        // :1080-1091 ;;快乐刻印Lv3
        if (mark(1) === 3) {
          await era.printAndWait(
            '「已，已经…啊~！快、不要…啊啊！快住手吧……！」',
          ); // :1082
          era.print(
            `哪怕嘴上说着一堆拒绝的话语、${target_name}的瞳孔也因为快乐而湿润了起来。`,
          ); // :1083 PRINTFORML
          await era.printAndWait(
            `每次触碰都会让${target_name}的话语中断、身体颤抖起来喘息也变得急促起来了。`,
          ); // :1084
        } else {
          await era.printAndWait(
            '「够、够了…嗯嗯~……哼嗯~、呜……请，请适可而止吧…！」',
          ); // :1086
          era.print(`${target_name}的眼中、厌恶的神情并没有消失。`); // :1087 PRINTFORML
          await era.printAndWait(
            '但是也没有压抑着住无情的爱抚带来的刺激、而从嘴边漏出了颤抖的娇喘声。',
          ); // :1088
        }
        await era.printAndWait(
          '「为、为什么…啊~、这…这样……这样的、事情……啊嗯~……」',
        ); // :1090
        kojo.爱抚 = 203; // :1091
      } else {
        // :1093-1101 ;;ランダムで口上が変化する——黄金样本 emuera.log:26
        if (rand_n(3) === 0) {
          await era.printAndWait('「呀…啊、不要啊……请、请快住手，停下来吧…」'); // :1095
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「哈呜、${target_name}、可是，一心地，想要杀了…嗯、为什么、那么地……啊~、这么…温柔地…啊、啊啊……」`,
          ); // :1097 黄金样本逐字比对（test/kojo-k3-noble.test.js）
        } else {
          await era.printAndWait(
            '「嗯~、嗯~嗯~……明明…说了、快住手了……啊嗯~……」',
          ); // :1099
        }
      }
    }
    return 0; // :1103
  }

  // :1110 IF SELECTCOM == 1（舔阴 CFLAG:302）
  if (era_flag.selectcom === 1) {
    const mark = (i) => era.get(`mark:${target}:${i}`) || 0;

    // :1112-1121 初めて（CFLAG:302 == 0）
    if (kojo.舔阴 === 0) {
      // :1114-1118 处女分档
      if (era.get(`talent:${target}:0`) === 1) {
        await era.printAndWait(
          '「嗯啊啊~！那、那里才不是可以舔的地方…哈呜…很，很脏的…哈呜！」',
        ); // :1115
      } else {
        await era.printAndWait(
          '「啊啊…怎么会…舌头…哈呜…啊~…啊呜~~~~！」',
        ); // :1118
      }
      kojo.舔阴 = 1; // :1120
      return 0; // :1121
    }

    // :1123-1145 二回目以降
    // :1125 淫乱（TALENT:76）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.舔阴 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「哈啊啊…更加地…更加地...将小穴弄得更加黏糊糊地吧${heart(1)}…更加地欺负小穴吧哈呜~~${heart(3)}」`,
      ); // :1126
      await era.printAndWait(
        `${target_name}将${player_name}的头按住晃动着腰。`,
      ); // :1127
      await era.printAndWait(
        `「请更加地…欺负${target_name}的小穴吧~…将变态${target_name}的小穴弄得乱七八糟的吧啊啊~！${heart(3)}」`,
      ); // :1128
      kojo.舔阴 = 5; // :1129
    } else if (
      // :1131 爱慕（TALENT:85）
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.舔阴 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「啊啊~…那里明明…那么脏来的啊♪………不行…的啊…那么地…啊嗯~♪」',
      ); // :1132
      await era.printAndWait(
        `${target_name}哪怕耳朵红透了也好，也继续接受着${player_name}的爱抚。`,
      ); // :1133
      await era.printAndWait(
        `「嗯呜啊~…哼啊啊啊！~…腰要…腰要飘起来了~${heart(1)}」`,
      ); // :1134
      kojo.舔阴 = 4; // :1135
    } else if (
      // :1137 屈服刻印Lv3
      mark(2) === 3 &&
      (kojo.舔阴 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「呜啊~…啊~…呜呼啊~…更加地…温柔地爱抚吧…哼唔啊~…啊~啊啊~♪」',
      ); // :1138
      kojo.舔阴 = 3; // :1139
    } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 === 2) {
      // :1141 それ以外（屈服刻印Lv3未満）
      await era.printAndWait(
        '「不、不要…请停下来吧！哪怕舔这种地方也好…哼呜啊啊啊~！」',
      ); // :1142
      kojo.舔阴 = 2; // :1143
    }
    return 0; // :1145
  }

  // :1147 ENDIF（IF SELECTCOM == 1 的收口）

  // :1152 IF SELECTCOM == 2（肛门爱抚 CFLAG:303）
  if (era_flag.selectcom === 2) {
    const train = chara(target).train;
    const p = train.润滑 + train.润滑增量; // :1160 P = PALAM:3 + UP:3

    // :1154-1157 初めて（CFLAG:303 == 0）
    if (kojo.肛门爱抚 === 0) {
      await era.printAndWait('「呜，呜哇啊！？那、那里是不行的！」'); // :1155
      kojo.肛门爱抚 = 1; // :1156
      return 0; // :1157
    }

    // :1159-1195 二回目以降
    // :1162 淫乱+润滑Lv2以上
    if (
      era.get(`talent:${target}:76`) === 1 &&
      p >= PALAMLV[2] &&
      (kojo.肛门爱抚 <= 6 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊啊~${heart(1)}…啊~${heart(1)}…哈呜啊啊啊~${heart(3)}」`,
      ); // :1163
      await era.printAndWait(
        `${target_name}每当被弯曲的手指来回扣着尻穴内壁时都会漏出欢喜的娇喘。`,
      ); // :1164
      await era.printAndWait(
        `「尻穴小穴${heart(1)} 更加玩弄尻穴吧~~~${heart(3)}」`,
      ); // :1165
      kojo.肛门爱抚 = 7; // :1166
    } else if (
      // :1168 淫乱+润滑Lv2未満
      era.get(`talent:${target}:76`) === 1 &&
      p < PALAMLV[2] &&
      (kojo.肛门爱抚 <= 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「嗯啊~……哈啊嗯~${heart(1)}　指尖在…嗯~…在挖着…啊~${heart(1)}这个嗯~~~~${heart(1)}」`,
      ); // :1169
      await era.printAndWait(
        `${target_name}的尻穴虽然还没有完全湿润，不过手指越是抽插越能进入${target_name}的尻穴的深处。`,
      ); // :1170
      await era.printAndWait(
        `「恩呜呜~…更加地…${heart(1)}　进到里面去来回抽插吧${heart(3)}」`,
      ); // :1171
      kojo.肛门爱抚 = 6; // :1172
    } else if (
      // :1174 爱慕+润滑Lv2以上
      era.get(`talent:${target}:85`) === 1 &&
      p >= PALAMLV[2] &&
      (kojo.肛门爱抚 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「啊~哈嗯~啊啊~…这、这个部位…才不是用来塞进什么东西的地方来的呀………」',
      ); // :1175
      await era.printAndWait(
        `虽然嘴上说着这样的话，但是${target_name}一点都不讨厌地接受着${player_name}的手指。`,
      ); // :1176
      await era.printAndWait(
        `「哈嗯~♪……啊·~…不是…这个…才不是对${player_name}大人的手指感到舒…哼啊啊~…啊啊~…哈啊嗯~♪」`,
      ); // :1177
      kojo.肛门爱抚 = 5; // :1178
    } else if (
      // :1180 爱慕+润滑Lv2未満
      era.get(`talent:${target}:85`) === 1 &&
      p < PALAMLV[2] &&
      (kojo.肛门爱抚 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「嗯呜~....请更加…温柔地………」'); // :1181
      await era.printAndWait(
        `「哈啊啊啊~…嗯呜呜~…没错…这样的…很舒服啊~………${heart(1)}」`,
      ); // :1182
      kojo.肛门爱抚 = 4; // :1183
    } else if (
      // :1185 润滑Lv2以上＋A感覚Lv3以上
      p >= PALAMLV[2] &&
      chara(target).system.肛门感觉 >= 3 &&
      (kojo.肛门爱抚 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `${target_name}的尻穴被塞进了手指而全身颤抖起来了。`,
      ); // :1186
      await era.printAndWait('「啊呜呜~！…不，不是…才没有感觉…」'); // :1187
      await era.printAndWait(
        `「呜嗯啊~！啊~啊啊~哈啊啊啊啊~~${heart(1)}」`,
      ); // :1188
      kojo.肛门爱抚 = 3; // :1189
    } else if (kojo.首次耻情Lv2 <= 1 || game.kojo.口上开关 === 2) {
      // :1191 それ以外（爱無し、润滑Lv2未満、A感覚Lv3未満）
      // 原作读 CFLAG:223（首次耻情Lv2），不是 303——1:1 保留
      await era.printAndWait(
        '「嗯呜~…请，请快住手啊…那种地方不管怎么做都不会…呜啊啊~啊啊~！」',
      ); // :1192
      kojo.肛门爱抚 = 2; // :1193
    }
    return 0; // :1195
  }

  // :1197 ENDIF（IF SELECTCOM == 2 的收口）

  // :1202 IF SELECTCOM == 3（自慰 CFLAG:304）
  if (era_flag.selectcom === 3) {
    const mark = (i) => era.get(`mark:${target}:${i}`) || 0;
    const train = chara(target).train;

    // :1204-1207 初めて（CFLAG:304 == 0）
    if (kojo.自慰 === 0) {
      await era.printAndWait(
        '「居然…不能不做这样的事情…这是……何等的…屈辱啊…」',
      ); // :1205
      kojo.自慰 = 1; // :1206
      return 0; // :1207
    }

    // :1209-1321 二回目以降
    // :1211 淫乱＋处女
    if (
      era.get(`talent:${target}:76`) === 1 &&
      era.get(`talent:${target}:0`) === 1 &&
      (kojo.自慰 <= 8 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊啊${heart(1)}　您真是的…真的是恶魔来的呀…${heart(1)}」`,
      ); // :1212
      await era.printAndWait(
        `「${sc()}的身心…明明....都变得…如此地淫乱了…啊啊~${heart(1)}也不拿走${sc()}重要的东西什么的~${heart(1)}」`,
      ); // :1213
      await era.printAndWait(
        `${target_name}将腰抬高，向${master_name}诱惑而用手将蜜穴给张开。`,
      ); // :1214
      await era.printAndWait(
        `「啊啊~…明明…在这里有处女膜来的~${heart(1)}」`,
      ); // :1215
      await era.printAndWait(
        `「拜托了${heart(1)}请将${sc()}的…淫乱小穴…用${master_name}大人的大鸡巴来贯穿了吧~~~${heart(5)}」`,
      ); // :1216
      await era.printAndWait(
        `${target_name}一边将腰部左右地晃动着一边在${master_name}的面前自慰着………`,
      ); // :1217
      kojo.自慰 = 9; // :1218
    } else if (
      // :1220 淫乱＋自慰中毒Lv3以上
      era.get(`talent:${target}:76`) === 1 &&
      train.自慰中毒 >= 3 &&
      (kojo.自慰 <= 7 || game.kojo.口上开关 === 2)
    ) {
      // :1222 壶虫or肛门虫
      if (era.get(`tequip:${target}:11`) || era.get(`tequip:${target}:13`)) {
        await era.printAndWait(
          `「啊哼嗯~~…按摩器自慰最~棒~了~啊嗯~${heart(1)}」`,
        ); // :1223
        await era.printAndWait(`${target_name}留着口水继续着自慰………`); // :1224
      } else if (rand_n(3) === 0) {
        // :1227
        await era.printAndWait(
          `「啊啊…主人…请看一下吧~~~…${heart(1)}」`,
        ); // :1228
        await era.printAndWait(
          `「小穴的里面${heart(1)}要伸手指进去了哦~~~……${heart(1)}」`,
        ); // :1229
        await era.printAndWait(
          `「嗯哈啊啊~…不行了~…小穴自慰停不下来了${heart(3)}」`,
        ); // :1230
      } else if (rand_n(2) === 0) {
        // :1231
        await era.printAndWait(
          `「哈啊~…啊~…啊啊~…这么的…舒服的事情嗯~…谁都没有告诉${target_name}啊嗯~…${heart(1)}」`,
        ); // :1232
        await era.printAndWait(
          `「小穴“库啪”地打开了~嗯哦嗯~${heart(1)}将手指塞进深处后~${heart(1)}」`,
        ); // :1233
        await era.printAndWait(
          `「只要再将小豆豆弄一下的话…哈嗯~${heart(1)}要舒服死了~${heart(1)}」`,
        ); // :1234
        await era.printAndWait(
          `「为什么大家…不做这么舒服的事情呢~？${heart(1)}」`,
        ); // :1235
      } else {
        // :1236
        await era.printAndWait(
          `「啊啊啊啊~…对不起…只用自己的手指就得那么舒服真是对不起~~~${heart(1)}」`,
        ); // :1237
        await era.printAndWait(
          `「但是停不下来呢~~${heart(1)} 这么舒服的事情，根本停不下来呀~~~${heart(1)}」`,
        ); // :1238
        await era.printAndWait(
          `「哪怕没有主人的命令也好…也会一整天玩弄自己的小穴真的是非常对不起呜~~~~~~${heart(1)}」`,
        ); // :1239
        await era.printAndWait(
          `${target_name}连你根本不知道的事情也说都了出来………`,
        ); // :1240
      }
      kojo.自慰 = 8; // :1243
    } else if (
      // :1245 淫乱＋自慰中毒Lv3未満
      era.get(`talent:${target}:76`) === 1 &&
      train.自慰中毒 < 3 &&
      (kojo.自慰 <= 6 || game.kojo.口上开关 === 2)
    ) {
      // :1247 壶虫or肛门虫
      if (era.get(`tequip:${target}:11`) || era.get(`tequip:${target}:13`)) {
        await era.printAndWait(
          `「啊啊啊啊~…要不行了…那里要不行啊~~~…${heart(1)}」`,
        ); // :1248
        await era.printAndWait(
          `${target_name}流着口水沉浸在按摩器自慰着………`,
        ); // :1249
      } else if (rand_n(2) === 0) {
        // :1252
        await era.printAndWait(
          `「啊啊~…手指…手指擅自动起来了呀~~~…${heart(1)}」`,
        ); // :1253
        await era.printAndWait(
          `「这个手指…这个手指如果是主人的大鸡巴的话${heart(1)}　就会…就会变地更加舒服起来了呀~~${heart(1)}」`,
        ); // :1254
      } else {
        // :1255
        await era.printAndWait(
          `「啊啊~…虽然玩弄小穴也不错来的…但是好想要主人的大鸡巴呀~~…${heart(1)}」`,
        ); // :1256
        await era.printAndWait(
          `${target_name}自慰的同时，用着炽热的视线看着${target_name}股间的阴茎………`,
        ); // :1257
      }
      kojo.自慰 = 7; // :1260
    } else if (
      // :1262 爱＋处女
      era.get(`talent:${target}:85`) === 1 &&
      era.get(`talent:${target}:0`) === 1 &&
      (kojo.自慰 <= 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊啊~…呜哈~…啊…${heart(1)}」`); // :1263
      await era.printAndWait(
        `${target_name}每次轻轻地抚摸自己的蜜穴后就会大声地呻吟一下。`,
      ); // :1264
      await era.printAndWait(
        `「如果大人您再不做的话~…${target_name}就要自己弄破了噢~…${heart(1)}」`,
      ); // :1265
      await era.printAndWait(
        `${target_name}说完扑哧一笑、将手指塞向了深处。`,
      ); // :1266
      await era.printAndWait(
        `「哈嗯~${heart(1)}…唔哼哼~、只是开玩笑的噢~………啊嗯~~~${heart(1)}」`,
      ); // :1267
      kojo.自慰 = 6; // :1268
    } else if (
      // :1270 爱＋自慰中毒Lv3以上
      era.get(`talent:${target}:85`) === 1 &&
      train.自慰中毒 >= 3 &&
      (kojo.自慰 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // :1272 壶虫or肛门虫
      if (era.get(`tequip:${target}:11`) || era.get(`tequip:${target}:13`)) {
        await era.printAndWait(
          `「自慰器…自慰器用起来好舒服啊嗯~${heart(1)}」`,
        ); // :1273
        await era.printAndWait(
          `${target_name}嘴边流下了口水沉浸在了按摩器自慰中………`,
        ); // :1274
      } else if (rand_n(3) === 0) {
        // :1277
        await era.printAndWait(
          `「唔啊~…啊~哈啊~…明明...这样的…不行…来的…${heart(1)}」`,
        ); // :1278
        await era.printAndWait(
          `「啊啊~…但是…是魔王大人的命令来的…啊~啊啊~哈啊嗯~${heart(1)}」`,
        ); // :1279
        await era.printAndWait(
          `${target_name}哪怕嘴上说着这么多的借口，但还是忘我地自慰着………`,
        ); // :1280
      } else if (rand_n(2) === 0) {
        // :1281
        await era.printAndWait(
          `「啊啊…请更加…更加地看这边吧~…请看着${sc()}淫荡下流的哪里吧~${heart(1)}」`,
        ); // :1282
        await era.printAndWait(
          `${target_name}每当将手指伸进蜜穴里后便会有下流的水声响起、爱液不提地滴到了地板上………`,
        ); // :1283
      } else {
        // :1284
        await era.printAndWait(
          `「啊啊~…玩弄的话…明明在这样玩弄下去的话就要回不来了的~~…${heart(1)}」`,
        ); // :1285
        await era.printAndWait(
          `「不行了嗯~~…已经…手指已经停不下来了~${heart(1)}…主人…请看着吧~！」`,
        ); // :1286
      }
      kojo.自慰 = 5; // :1289
    } else if (
      // :1291 爱＋自慰中毒Lv3未満
      era.get(`talent:${target}:85`) === 1 &&
      train.自慰中毒 < 3 &&
      (kojo.自慰 <= 3 || game.kojo.口上开关 === 2)
    ) {
      if (rand_n(2) === 0) {
        // :1293
        await era.printAndWait(
          `「啊哈啊~…${heart(1)}　被喜欢的人给…看到了羞耻的地方什么的…」`,
        ); // :1294
        await era.printAndWait(
          `「居然是那么舒服的事情来的呀…请更加地…更加地看着${sc()}自慰的姿态吧~~~${heart(1)}」`,
        ); // :1295
      } else {
        // :1296
        await era.printAndWait(
          `「啊啊~…因为命令而自己安慰自己什么的…居然会那么舒服呀~~…${heart(1)}」`,
        ); // :1297
        await era.printAndWait(
          `「主人~${heart(1)} 请更加地…疼爱${sc()}吧…啊~啊啊啊~嗯~${heart(1)}」`,
        ); // :1298
      }
      kojo.自慰 = 4; // :1300
    } else if (
      // :1302 屈服刻印Lv3+自慰中毒Lv1以上
      mark(2) === 3 &&
      train.自慰中毒 >= 1 &&
      (kojo.自慰 <= 2 || game.kojo.口上开关 === 2)
    ) {
      if (rand_n(2) === 0) {
        // :1304
        await era.printAndWait(
          '「明明…不行…来的…但是...为什么…手却…停不下来呀~………啊嗯~！」',
        ); // :1305
      } else {
        // :1306
        await era.printAndWait(
          '「好、的…更加深地~…啊啊~啊~…啊嗯嗯唔！」',
        ); // :1307
        await era.printAndWait(
          `${target_name}顺从着${master_name}的指示摩擦着蜜穴、一点一点地开发着敏感度………`,
        ); // :1308
      }
      kojo.自慰 = 3; // :1310
    } else if (kojo.自慰 <= 1 || game.kojo.口上开关 === 2) {
      // :1312 それ以外（爱無し、自慰中毒Lv1未満）
      if (rand_n(2) === 0) {
        // :1314
        await era.printAndWait(
          '「呃呜…呜~…啊~…这样的一点也…哼呜~…啊~…哈呜~！」',
        ); // :1315
      } else {
        // :1316
        await era.printAndWait(
          `「啊啊…哈啊~…居然让${target_name}做这样的事情…给${target_name}记住吧…啊啊~…啊~…嗯~」`,
        ); // :1317
      }
      kojo.自慰 = 2; // :1319
    }
    return 0; // :1321
  }

  // :1323 ENDIF（IF SELECTCOM == 3 的收口）

  // :1328 IF SELECTCOM == 5（胸爱抚 CFLAG:306）
  if (era_flag.selectcom === 5) {
    const train = chara(target).train;
    const system = chara(target).system;
    const milk =
      era.get(`talent:${target}:130`) === 1 &&
      train.欲情 > PALAMLV[3] &&
      (era.get(`tequip:${target}:16`) || 0) === 0 &&
      (era.get(`tequip:${target}:15`) || 0) === 0;

    // :1330-1358 初めて（CFLAG:306 == 0）
    if (kojo.胸爱抚 === 0) {
      if (milk) {
        // :1332 母乳体质
        if (
          era.get(`talent:${target}:85`) === 1 &&
          era.get(`talent:${target}:76`) === 1
        ) {
          await era.printAndWait(
            `「胸部！要漏出来了呀~…${heart(1)}」`,
          ); // :1335
        } else {
          await era.printAndWait('「嗯呜...母乳居然…那么多………」'); // :1338
        }
      } else if (
        // :1343 乳头ピアス+抖M气质Lv3
        (era.get(`cflag:${target}:7`) || 0) & 1 &&
        system.抖M气质 >= 3
      ) {
        era.print(`「啊啊~${heart(1)} 被那么用力地揉的话~${heart(1)}」`); // :1344 PRINTFORML
        await era.printAndWait(`「就会有感觉了~${heart(1)}」`); // :1345
        if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `${target_name}好像想要炫耀爱的证明一样、自满地将胸前的乳头环摇晃起来了。`,
          ); // :1347
        }
      } else if (
        // :1349 愛＆淫乱
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`talent:${target}:76`) === 1
      ) {
        await era.printAndWait(
          '「哼啊啊…请更加地…抚摸胸部吧~~…♪」',
        ); // :1350
        await era.printAndWait(
          `「只是被${master_name}大人抚摸而已就感觉要融化掉了呀${heart(1)}」`,
        ); // :1351
      } else {
        await era.printAndWait('「嗯呜…不要…弄得那么疼………」'); // :1354
      }
      kojo.胸爱抚 = 1; // :1357
      return 0; // :1358
    }

    // :1360-1406 二回目以降
    if (milk) {
      // :1362 母乳体质
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「主人，请…请再喝多一点奶吧~${heart(1)}」`,
        ); // :1365
        await era.printAndWait(
          `「只是让主人喝着奶…就…就要去了呀…${heart(1)}」`,
        ); // :1366
        kojo.胸爱抚 = 5; // :1367
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊嗯~…可以的哦~…请再喝更多一点吧…${sc()}的可爱的大人………${heart(1)}」`,
        ); // :1370
        await era.printAndWait(
          `「${sc()}的奶…啊嗯~…全部…都是大人你的东西来的~…${heart(1)}」`,
        ); // :1371
        kojo.胸爱抚 = 4; // :1372
      } else if (
        system.乳房感觉 >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊~…啊呜呜~…！请…请原谅${sc()}吧！」`,
        ); // :1375
        await era.printAndWait(
          `「再这样…被吸着奶的话…${sc()}…${sc()}…啊哈呜嗯~~~~~！」`,
        ); // :1376
        kojo.胸爱抚 = 3; // :1377
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          '「啊哈呜…不要...请不要…吸得...弄出声音来啊！」',
        ); // :1380
        kojo.胸爱抚 = 2; // :1381
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊哈啊啊~…要融化掉了~${heart(1)}」`); // :1386
      await era.printAndWait(
        `「主人，请更加地…随心所欲地做吧~…啊~…啊啊~${heart(1)}」`,
      ); // :1387
      kojo.胸爱抚 = 5; // :1388
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「啊嗯~…可以的哦…更加用力地揉…也没有关系的噢…啊~哈啊嗯啊啊啊~♪」',
      ); // :1391
      await era.printAndWait(
        `「嗯呜~♪这样的真的可以哦~…啊~…是的噢…更加…用力地可以的噢${heart(1)}」`,
      ); // :1392
      kojo.胸爱抚 = 4; // :1393
    } else if (
      system.乳房感觉 >= 3 &&
      (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「啊啊~…胸部…胸部居然会那么有感觉什么的…」',
      ); // :1396
      await era.printAndWait(
        '「哈嗯~…请，请不要欺负胸部…啊~啊啊~！」',
      ); // :1397
      kojo.胸爱抚 = 3; // :1398
    } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(
        '「不…不要…唔…不要再…欺负胸部…啊~…啊啊~！」',
      ); // :1401
      kojo.胸爱抚 = 2; // :1402
    }
    return 0; // :1404
  }

  // :1406 ENDIF（IF SELECTCOM == 5 的收口）

  // :1412 IF SELECTCOM == 6（接吻 CFLAG:307）
  if (era_flag.selectcom === 6) {
    const system = chara(target).system;
    const first_kiss = game.train.初吻与自我口上;
    const assiplay = era_flag.assiplay;
    const no_beast_tentacle =
      (era.get(`tequip:${target}:89`) || 0) === 0 &&
      (era.get(`tequip:${target}:90`) || 0) === 0;

    // :1414-1472 初吻（CFLAG:307 == 0 && TFLAG:13）
    if (kojo.接吻 === 0 && first_kiss) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        assiplay === 0 &&
        no_beast_tentacle
      ) {
        // :1416 淫乱かつ主人
        if (era.get(`talent:${target}:314`) === 7) {
          // :1418 高贵ダークエルフ
          await era.printAndWait(
            `${master_name}抓住${target_name}的下巴将她的脸转了过来、强行地将嘴唇重合了起来。`,
          ); // :1420
          await era.printAndWait(
            `「嗯唔…嗯啾~…嗯呼~…嗯呼嗯~…~！…嗯唔~…嗯~嗯嗯~~呜~…呜~~！！！${heart(1)}」`,
          ); // :1421
          await era.printAndWait(
            `${target_name}通红着脸沉浸在和${master_name}的亲吻当中。`,
          ); // :1422
          await era.printAndWait(
            `「嗯哈啊啊~…啊啊…好棒…${sc()}淫乱的嘴唇能献给主人您真是荣幸呢~…${heart(3)}」`,
          ); // :1423
        } else if (era.get(`talent:${target}:317`) === 4) {
          // :1428 故郷に恋人がいる場合
          await era.printAndWait(
            `「嗯呼呜~${heart(1)} 嗯呜~…啾呜~…啾呼~…呸咯~…嗯~嗯~嗯嗯嗯~${heart(1)}」`,
          ); // :1429
          await era.printAndWait(
            `${target_name}环抱着${master_name}、热情地将舌头缠绕起来。`,
          ); // :1430
          await era.printAndWait(
            `「亲吻原来…是会让人变得那么淫乱的感觉的啊…啊啊…还要…${heart(3)}」`,
          ); // :1431
          await era.printAndWait(
            `${target_name}沉浸在了和${master_name}亲吻之中，脑海里的故乡的恋人就好像已经不在了一样………`,
          ); // :1432
        } else {
          await era.printAndWait(
            `「嗯呼~${heart(1)} 嗯啾…啾~…啾呼~…呸咯~…嗯~嗯~嗯嗯嗯~${heart(1)}」`,
          ); // :1434
          await era.printAndWait(
            `${target_name}环抱着${master_name}、热情地将舌头缠绕起来。`,
          ); // :1435
          await era.printAndWait(
            `「亲吻原来…是会让人变得那么淫乱的感觉的啊…啊啊…还要…${heart(3)}」`,
          ); // :1436
        }
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        assiplay === 0 &&
        no_beast_tentacle
      ) {
        // :1439 爱かつ主人
        if (era.get(`talent:${target}:314`) === 1) {
          // :1441 高贵エルフ
          await era.printAndWait(
            `「那、那个、${sc()}那个所谓的心理准备还没…啊嗯~！」`,
          ); // :1442
          await era.printAndWait(
            `趁着${target_name}还在迷惑的时候将其抱住后、${master_name}直接将她的嘴唇夺走了。`,
          ); // :1443
          await era.printAndWait(
            '「嗯呼~…嗯…嗯呜~…嗯…啾…啾…噗哈~…啊啊~…啊~…♪」',
          ); // :1444
          await era.printAndWait(
            '「真、真是的…真是那个…对大人您真是无奈了呀…啊嗯~！」',
          ); // :1445
          await era.printAndWait(
            `${master_name}再次将这个有点小啰嗦的精灵族小姑娘的嘴唇给夺走了………`,
          ); // :1446
        } else if (era.get(`talent:${target}:317`) === 4) {
          // :1450 故郷に恋人がいる場合
          await era.printAndWait(
            `「嗯哼哼~…这是${sc()}的初吻来的噢~………♪」`,
          ); // :1451
          await era.printAndWait(
            `「啊嗯~…噗~请不要那么坏心眼啦…真的是初吻来的嘛…不管是第二回…还是第三回都是…${heart(1)}」`,
          ); // :1452
          await era.printAndWait(
            `${target_name}可爱地微笑了一下后，便不停地跟${master_name}亲吻了起来………`,
          ); // :1453
        } else {
          await era.printAndWait(
            '「嗯呜~…是、是的…能否再来一次吗？」',
          ); // :1455
          await era.printAndWait(
            `「${target_name}想要…好好地记住大人您的吻………」`,
          ); // :1456
          await era.printAndWait(
            `${target_name}可爱地微笑了一下后，再度跟${master_name}亲吻了一下………`,
          ); // :1457
        }
      } else if (
        era.get(`talent:${target}:317`) === 4 &&
        (era.get('flag:81') || 0) >= 5000
      ) {
        // :1462 故郷に恋人がいる場合、なおかつ侵攻度が５０００を越えている場合
        await era.printAndWait(
          '「亲、亲吻的话…真的会…放那个人走对吧………」',
        ); // :1463
        await era.printAndWait(
          `${target_name}将自己的吻和在故乡的恋人的生命放在天枰衡量了一下、便向${master_name}献出了嘴唇。`,
        ); // :1464
        await era.printAndWait(
          '「嗯~…嗯呜~…~！………已、已经…够了吧…」',
        ); // :1465
        await era.printAndWait(
          `「！…怎，怎么能…那么卑鄙…让${scf()}、${sc()}自己来做什么的…唔…呜呜呜~………」`,
        ); // :1466
        await era.printAndWait(
          `${target_name}的身体颤抖着，自己上前亲吻了${master_name}………`,
        ); // :1467
      } else {
        await era.printAndWait(
          `「啊啊…啊…${sc()}的…初吻被………」`,
        ); // :1469
      }
      kojo.接吻 = 1; // :1472
      return 0; // :1473
    }

    // :1475-1488 （調教では）初めて
    if (kojo.接吻 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「嗯呜~…嗯啾~…嗯呼~...哼啊~…啊啊…非常地舒服呢~………${heart(1)}」`,
        ); // :1478
        await era.printAndWait(
          `${target_name}的脸红得发烫，沉醉在和${master_name}的亲吻之中。`,
        ); // :1479
        await era.printAndWait(
          `「${sc()}的嘴唇…全部都是主人的东西来的…请更加的…渴求${sc()}的嘴唇吧~~${heart(1)}」`,
        ); // :1480
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          '「哈啊啊~…和喜欢的对方亲吻什么的居然会那么舒服来的呀…♪」',
        ); // :1483
        await era.printAndWait('「啊啊…请再…亲更多次吧~………」'); // :1484
      } else {
        await era.printAndWait(
          '「嗯呜~…这，这样的…才不算什么呢！…！」',
        ); // :1487
      }
      kojo.接吻 = 1; // :1489
      return 0; // :1490
    }

    // :1492-1516 二回目以降
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.接吻 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「嗯唔…嗯啾~…嗯噗…呼啊…啊啊~…非常的舒服啊~………${heart(1)}」`,
      ); // :1495
      await era.printAndWait(
        `${target_name}脸红得发烫，沉醉在和${master_name}的亲吻之中。`,
      ); // :1496
      await era.printAndWait(
        `「${sc()}的嘴唇…全部都是主人的东西来的…请更加的…渴求${sc()}的嘴唇吧~~${heart(1)}」`,
      ); // :1497
      kojo.接吻 = 5; // :1498
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.接吻 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「嗯~…嗯啾~…啾~…哈啊啊~…感觉脑袋里变得一片空白了呢~…♪」',
      ); // :1501
      await era.printAndWait(
        `「啊啊啊…只是亲吻就变得那么舒服什么的………${heart(1)}」`,
      ); // :1502
      await era.printAndWait(
        `${target_name}如同说梦话地一样喃喃自语着，可见多么地沉浸在亲吻之中………`,
      ); // :1503
      kojo.接吻 = 4; // :1504
    } else if (
      system.顺从 >= 2 &&
      (kojo.接吻 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「好、的…亲吻…对吧…嗯~…哈啊啊…还、还要更多吗？」',
      ); // :1507
      await era.printAndWait(
        '「真、真是没有办法呢…嗯啾…啾…啾…♪」',
      ); // :1508
      kojo.接吻 = 3; // :1509
    } else if (kojo.接吻 <= 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait('「哈啊…哈啊…这样…这样的………」'); // :1512
      kojo.接吻 = 2; // :1513
    }
    return 0; // :1515
  }

  // :1517 ENDIF（IF SELECTCOM == 6 的收口）——其余指令待办，占位一行
  stub_line(
    'KOJO_MESSAGE_COM_3',
    `指令 ${era_flag.selectcom} 的口上`,
    '随各自指令票',
  );
  return 0;



}

// 注册进分发族（TRYCALLFORM KOJO_MESSAGE_COM_3 的等价物；重复注册抛错）
kojo_message_com_family.register(3, kojo_message_com_3);

module.exports = { STUBBED_CALLS, kojo_message_com_3 };
