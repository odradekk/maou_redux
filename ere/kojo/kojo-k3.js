/**
 * @file 高貴性格口上 K3：指令口上的爱抚分支（issue #46 的黄金样本切片）。
 *
 * 源: target/ERB/口上/EVENT_K3_高貴.ERB  @EVENTTRAIN #PRI（:81-85，存在
 *     标志 FLAG:103）@EVENTEND #LATER（:87-89，清标志）
 *     @KOJO_MESSAGE_COM_3（:887；七道跳过判定 :888-912；爱抚 CFLAG:301
 *     状态机 :920-1105——工单指出的 190 行切片，黄金样本 emuera.log:26
 *     出自 :1097）
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
 * 这张票存根（docs/stub-registry.md）：COLOSSEUM_KOJO_3 / DOG_KOJO_3（守卫
 * 岔开的专用口上）与 SELECTCOM != 0 的其余指令分支（随各自指令票）。
 */

const era = require('#/era-electron');
const { on, TIER } = require('#/system/event/registry');
const era_flag = require('#/era-utils/era-flag');
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
          ); // :1097 黄金样本逐字比对（test/kojo-k3.test.js）
        } else {
          await era.printAndWait(
            '「嗯~、嗯~嗯~……明明…说了、快住手了……啊嗯~……」',
          ); // :1099
        }
      }
    }
    return 0; // :1103
  }

  // :1105 ENDIF（IF SELECTCOM == 0 的收口）——其余指令待办，占位一行
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
