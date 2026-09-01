/**
 * @file 慈爱性格口上 K0：指令口上的爱抚 / 舔阴 / 肛门爱抚 / 自慰 / 胸爱抚 / 接吻 / 自己扒开分支（issue #231）。
 *
 * 源: target/ERB/口上/EVENT_K0_慈愛.ERB  @EVENTTRAIN #PRI（:73-77，存在
 *     标志 FLAG:100）@EVENTEND #LATER（:79-81，清标志）
 *     @KOJO_MESSAGE_COM_0（:674；七道跳过判定 :676-699，**崩坏在兽奸前**；
 *     爱抚 CFLAG:301 状态机 :708-752；舔阴 CFLAG:302 状态机 :757-794；
 *     肛门爱抚 CFLAG:303 状态机 :799-856；自慰 CFLAG:304 状态机 :861-968；
 *     胸爱抚 CFLAG:306 状态机 :973-1060；接吻 CFLAG:307 状态机 :1065-1148；
 *     自己扒开 CFLAG:308 状态机 :1153-1189）

 *
 * == 状态机（CFLAG:301，个位数推进） ==
 *
 * 与 K5 同构：初回 → 1；二回目以降按「淫乱(76) → 爱慕(85) → 屈服刻印Lv3
 * → Lv2 → それ以外(MARK:2 <= 1)」取首个命中，各支门槛 CFLAG:301 <=
 * 5/4/3/2/1，写入 6/5/4/3/2——FLAG:7 == 2（默认）时上限被旁路、同支每次
 * 出声；FLAG:7 == 1 时逐阶段各出一次声。无随机分支。
 *
 * 自慰（CFLAG:304）二回目以降按「淫乱+处女 → 淫乱+自慰中毒Lv3 → 淫乱+中毒不足
 * → 爱慕+处女 → 爱慕+中毒Lv3 → 爱慕+中毒不足 → 屈服Lv3+中毒Lv1 → それ以外」
 * 取首个命中；中毒 Lv3 支含拍摄拼接与 RAND:3/RAND:2。
 *
 * 守卫顺序照 K0 原文（:676-699）：死斗场 → 助手调教 → 口塞 → 失神 →
 * 崩坏 → 兽奸（专用口上）→ 触手。与 K3（兽奸在崩坏前）不同，各文件 1:1。
 *
 * 这张票第一刀存根（docs/stub-registry.md）：COLOSSEUM_KOJO_0 / DOG_KOJO_0
 * 与 SELECTCOM 尚未落地的其余指令分支（后续切片填文本）。其余 SELECTCOM：
 * 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 19, 20, 21, 22,
 * 23, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 40, 41, 42, 43,
 * 44, 45, 46, 55, 56, 69, 80, 87, 123, 124, 125, 126, 127（17 在原文已注释）。

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
const STUBBED_CALLS = ['COLOSSEUM_KOJO_0', 'DOG_KOJO_0', 'KOJO_MESSAGE_COM_0'];

// @EVENTTRAIN #PRI（:73-77）：存在标志 + 总开关补 0
on(
  'EVENTTRAIN',
  () => {
    game.kojo.口上存在_0 = 1; // :75 FLAG:100 = 1（K0 口上存在标志）
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
    game.kojo.口上存在_0 = 0; // :81
  },
  TIER.LATER,
);

/**
 * @KOJO_MESSAGE_COM_0（:674-1189）：七道跳过判定 + 爱抚 / 舔阴 / 肛门爱抚 / 自慰 / 胸爱抚 / 接吻 / 自己扒开。
 *

 * 守卫顺序照 K0 原文（:676-699）：死斗场 → 助手调教 → 口塞 → 失神 →
 * 崩坏 → 兽奸（专用口上）→ 触手。
 *
 * 分发族以 args: [rand] 统一传随机源（自慰支 RAND:3 / RAND:2）。
 *
 * @returns {Promise<number>} 0（RETURN 0；TRYCALLFORM 不读返回值）
 */
async function kojo_message_com_0(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));

  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%
  const scf = () => self_call_first(target); // %SELF_CALL_FIRST(TARGET)%
  const master_name = chara_name(0); // %NAME:MASTER%（MASTER 恒角色 0）
  const kojo = chara(target).kojo;

  // :676-678 死斗场中は専用口上
  if (era.get(`tequip:${target}:55`)) {
    stub_line('COLOSSEUM_KOJO_0', '死斗场专用口上', '随死斗场票');
    return 0;
  }
  // :681-682 助手が調教した時に口上をスキップする
  if (era_flag.assi > 0 && era_flag.assiplay) {
    return 0;
  }
  // :684-685 口塞着用時（SELECTCOM == 45 自己说话不算）
  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 45) {
    return 0;
  }
  // :687-688 失神時（TFLAG:899）——跨域读属主 train 的一维门面
  if (game.train.失神) {
    return 0;
  }
  // :690-691 崩坏した場合（TALENT:9）——K0 把崩坏放在兽奸前
  if (era.get(`talent:${target}:9`) === 1) {
    return 0;
  }
  // :693-695 兽奸PLAY中は専用口上
  if (era.get(`tequip:${target}:89`)) {
    stub_line('DOG_KOJO_0', '兽奸专用口上', '随兽奸票');
    return 0;
  }
  // :698-699 触手調教中（TEQUIP:90）
  if (era.get(`tequip:${target}:90`)) {
    return 0;
  }

  // :708 IF SELECTCOM == 0（爱抚）。其余指令分支随后续切片

  if (era_flag.selectcom === 0) {
    const mark = (i) => era.get(`mark:${target}:${i}`) || 0;

    // :710-721 初めて（CFLAG:301 == 0）
    if (kojo.爱抚 === 0) {
      // :712-719 屈服刻印Lv2以上
      if (mark(2) >= 2) {
        await era.printAndWait('「啊啊…我会、老实的…所以…啊～啊啊～！」'); // :713
        await era.printAndWait(`${target_name}乖乖的被你爱抚着身体………`); // :714
      } else {
        await era.printAndWait('「你的爱是虚假的」'); // :717
        await era.printAndWait(`${target_name}紧锁眉头、蜷缩着身体………`); // :718
      }
      kojo.爱抚 = 1; // :720
      return 0;
    }

    // :723-750 二回目以降

    // :725-728 淫乱（TALENT:76）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊～…额呵呵…那个地方…再多摸摸…${heart(1)}」`); // :726
      await era.printAndWait(`只是稍微摸了摸${target_name}她就把持不住了………`); // :727
      kojo.爱抚 = 6; // :728
    } else if (
      // :730-733 爱慕（TALENT:85）
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「再来…请把我揉得乱七八糟吧……！」'); // :731
      await era.printAndWait(
        `${target_name}像引诱${player_name}的手似的扭着身体………`,
      ); // :732
      kojo.爱抚 = 5; // :733
    } else if (
      // :735-738 屈服刻印Lv3
      mark(2) === 3 &&
      (kojo.爱抚 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「哈啊…哈啊…啊啊啊～」'); // :736
      await era.printAndWait(`${target_name}的嘴里呼着热气………`); // :737
      kojo.爱抚 = 4; // :738
    } else if (
      // :740-743 屈服刻印Lv2
      mark(2) === 2 &&
      (kojo.爱抚 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「才不会…觉得舒服呢！　绝对不会！」'); // :741
      await era.printAndWait(`${target_name}扭动着身体忍耐着的样子………`); // :742
      kojo.爱抚 = 3; // :743
    } else if (
      // :745-748 それ以外（MARK:2 <= 1）
      mark(2) <= 1 &&
      (kojo.爱抚 <= 1 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「…好恶心」'); // :746
      await era.printAndWait(`${target_name}叹了口气………`); // :747
      kojo.爱抚 = 2; // :748
    }
    return 0;
  }

  // :757 IF SELECTCOM == 1（舔阴，CFLAG:302）
  if (era_flag.selectcom === 1) {
    // :759-769 初めて（CFLAG:302 == 0）

    if (kojo.舔阴 === 0) {
      // :761-767 处女（TALENT:0）
      if (era.get(`talent:${target}:0`) === 1) {
        await era.printAndWait('「你、你在舔哪里啊～」'); // :762
        await era.printAndWait(`${target_name}的私处处有着处女的味道………`); // :763
      } else {
        await era.printAndWait('「请住手吧…不要舔那个地方！」'); // :766
      }
      kojo.舔阴 = 1; // :768
      return 0;
    }

    // :771-792 二回目以降

    // :773-776 淫乱（TALENT:76）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.舔阴 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「再来～…再舔我那里吧…喝下去也行…啊啊～～${heart(1)}」`,
      ); // :774
      await era.printAndWait(`蜜汁从${target_name}的私处处不断涌了出来………`); // :775
      kojo.舔阴 = 5; // :776
    } else if (
      // :778-781 爱慕（TALENT:85）
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.舔阴 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「哈哈～…好吃吗？　这个…♪」'); // :779
      await era.printAndWait(`${target_name}腼腆的笑着发出快乐的声音………`); // :780
      kojo.舔阴 = 4; // :781
    } else if (
      // :783-786 屈服刻印Lv3
      (era.get(`mark:${target}:2`) || 0) === 3 &&
      (kojo.舔阴 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「呜唔呜唔…呜呜～！　不要～」'); // :784
      await era.printAndWait(
        `${target_name}嘴上说着不要但还是老实地让你舔着………`,
      ); // :785
      kojo.舔阴 = 3; // :786
    } else if (
      // :788-790 それ以外（屈服刻印Lv3未満）
      kojo.舔阴 <= 1 ||
      game.kojo.口上开关 === 2
    ) {
      await era.printAndWait('「这么脏的地方也…」'); // :789
      kojo.舔阴 = 2; // :790
    }
    return 0;
  }

  // :799 IF SELECTCOM == 2（肛门爱抚，CFLAG:303）
  if (era_flag.selectcom === 2) {
    const train = chara(target).train;

    const a_insensible = era.get(`talent:${target}:105`);
    const a_sense = era.get(`abl:${target}:3`) || 0;

    // :801-804 初めて（CFLAG:303 == 0）
    if (kojo.肛门爱抚 === 0) {
      await era.printAndWait('「讨厌！　难、难以置信！」'); // :802
      kojo.肛门爱抚 = 1; // :803
      return 0;
    }

    // :806-854 二回目以降
    // :807 P = PALAM:3 + UP:3

    const p = train.润滑 + train.润滑增量;

    // :809-815 淫乱+润滑Lv2以上
    if (
      era.get(`talent:${target}:76`) === 1 &&
      p >= PALAMLV[2] &&
      (kojo.肛门爱抚 <= 6 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「啊呜～…好棒～！再来…往深处挖！往深处抠！」'); // :810
      // :812-813 A感覚Lv3以上＋A鈍感
      if (a_sense >= 3 && a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门已经被完全开发好了、张得大大的。`,
        ); // :813
      }
      await era.printAndWait(`${target_name}每当被抠弄肛门就会发出娇喘………`); // :814
      kojo.肛门爱抚 = 7; // :815
    } else if (
      // :817-822 淫乱+润滑Lv2未満
      era.get(`talent:${target}:76`) === 1 &&
      p < PALAMLV[2] &&
      (kojo.肛门爱抚 <= 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊～～…明明还不够湿…不过这样也好棒${heart(1)}」`,
      ); // :818
      // :820-821 A感覚Lv3以上＋A鈍感
      if (a_sense >= 3 && a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门已经被完全开发好了、虽然还不够润滑但也能享受起你的爱抚………`,
        ); // :821
      }
      kojo.肛门爱抚 = 6; // :822
    } else if (
      // :824-830 爱慕+润滑Lv2以上
      era.get(`talent:${target}:85`) === 1 &&
      p >= PALAMLV[2] &&
      (kojo.肛门爱抚 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「再、再多疼爱一下屁股眼吧！」'); // :825
      // :827-828 A感覚Lv3以上＋A鈍感
      if (a_sense >= 3 && a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门已经被完全开发好了、张得大大的。`,
        ); // :828
      }
      await era.printAndWait(
        `${target_name}每当被抠弄肛门就会发出不成体统的呻吟………`,
      ); // :829
      kojo.肛门爱抚 = 5; // :830
    } else if (
      // :832-837 爱慕+润滑Lv2未満
      era.get(`talent:${target}:85`) === 1 &&
      p < PALAMLV[2] &&
      (kojo.肛门爱抚 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「突、突然做什么呢！？」'); // :833
      // :835-836 A感覚Lv3以上＋A鈍感
      if (a_sense >= 3 && a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门已经被完全开发好了、虽然还不够润滑但也能享受起你的爱抚………`,
        ); // :836
      }
      kojo.肛门爱抚 = 4; // :837
    } else if (
      // :839-845 润滑Lv2以上＋A感覚Lv3以上
      p >= PALAMLV[2] &&
      a_sense >= 3 &&
      (kojo.肛门爱抚 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「难以置信…${sc()}…的屁股…啊～…啊啊～！」`); // :840
      // :842-843 A感覚Lv3以上＋A鈍感
      if (a_sense >= 3 && a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门已经被完全开发好了、张得大大的。`,
        ); // :843
      }
      await era.printAndWait(`${target_name}因为肛门的快感而神情迷醉………`); // :844
      kojo.肛门爱抚 = 3; // :845
    } else if (
      // :847-852 それ以外（爱無し、润滑Lv2未満、A感覚Lv3未満）
      // 原文门槛是 CFLAG:223，不是 303
      kojo.首次耻情Lv2 <= 1 ||
      game.kojo.口上开关 === 2
    ) {
      await era.printAndWait('「不要啊…够了、快住手～！」'); // :848
      // :850-851 A鈍感
      if (a_insensible) {
        await era.printAndWait(`${target_name}钝感的肛门被刺激得红肿了起来………`); // :851
      }
      kojo.肛门爱抚 = 2; // :852
    }
    return 0;
  }

  // :861 IF SELECTCOM == 3（自慰，CFLAG:304）
  if (era_flag.selectcom === 3) {
    const masturbation_addiction = era.get(`abl:${target}:31`) || 0;
    const filming = era.get(`tequip:${target}:53`);
    const has_penis =
      era.get(`talent:${target}:122`) || era.get(`talent:${target}:121`);

    // :863-873 初めて（CFLAG:304 == 0）
    if (kojo.自慰 === 0) {
      // :865-871 爱＆淫乱
      if (
        era.get(`talent:${target}:85`) === 1 ||
        era.get(`talent:${target}:76`) === 1
      ) {
        await era.printAndWait('「啊啊…请多多的…欣赏吧…♪」'); // :866
      } else {
        await era.printAndWait('「你是…恶魔」'); // :869
        await era.printAndWait(`${target_name}一副要哭出来的样子继续自慰着………`); // :870
      }
      kojo.自慰 = 1; // :872
      return 0;
    }

    // :875-966 二回目以降

    // :877-881 淫乱＋处女
    if (
      era.get(`talent:${target}:76`) === 1 &&
      era.get(`talent:${target}:0`) === 1 &&
      (kojo.自慰 <= 8 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「咿～～…呀呜呜～～…主人～…快点把${sc()}的淫乱处女膜夺走吧！夺走吧～～～～！！」`,
      ); // :878
      await era.printAndWait(
        `「不管是用狗～！还是用怪物～！什么都好～！把${sc()}的小穴捣进去吧～～～！」`,
      ); // :879
      await era.printAndWait(
        `${target_name}的脸上已经再也找不到一丝被称作圣女时候的清纯痕迹了………`,
      ); // :880
      kojo.自慰 = 9; // :881
    } else if (
      // :883-902 淫乱＋自慰中毒Lv3以上
      era.get(`talent:${target}:76`) === 1 &&
      masturbation_addiction >= 3 &&
      (kojo.自慰 <= 7 || game.kojo.口上开关 === 2)
    ) {
      // :885-894 撮影中
      if (filming) {
        // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
        era.print(`「看吧～${heart(1)}　噗咻噗咻勃起的`); // :887
        if (has_penis) {
          era.print('鸡鸡～'); // :889
        } else {
          era.print('假鸡鸡～'); // :891
        }
        await era.printAndWait(`${heart(1)}」`); // :893
        await era.printAndWait(
          `「${sc()}今天也是情绪高涨！请大家一起看我做舒服的事吧～${heart(1)}」`,
        ); // :894
      } else if (rand_n(3) === 0) {
        await era.printAndWait(
          `「小穴…好爽…啊啊～…飞起来了～飞起来了～${heart(1)}」`,
        ); // :896
      } else if (rand_n(2) === 0) {
        await era.printAndWait('「平时一个人是怎么做的…就让你好好看看吧…」'); // :898
      } else {
        await era.printAndWait(
          `「啊～啊～…搅着搅着小穴里的淫水就止不住了啊啊啊～${heart(1)}」`,
        ); // :900
      }
      kojo.自慰 = 8; // :902
    } else if (
      // :904-911 淫乱＋自慰中毒Lv3未満
      era.get(`talent:${target}:76`) === 1 &&
      masturbation_addiction < 3 &&
      (kojo.自慰 <= 6 || game.kojo.口上开关 === 2)
    ) {
      if (rand_n(2) === 0) {
        await era.printAndWait(
          `「啊啊～～…明明在主人的眼前～…卖力自慰后请赏我大肉棒吧～～～${heart(1)}」`,
        ); // :907
      } else {
        await era.printAndWait(
          '「嗯～…咕呜唔～…啊～啊啊啊～…小穴玩得停不下来了～…对不起～～！」',
        ); // :909
      }
      kojo.自慰 = 7; // :911
    } else if (
      // :913-916 爱＋处女
      era.get(`talent:${target}:85`) === 1 &&
      era.get(`talent:${target}:0`) === 1 &&
      (kojo.自慰 <= 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「啊…啊啊～、快看…我在玩弄主人专用的专属小穴…！」',
      ); // :914
      await era.printAndWait(
        `「哦～…哦哦～…感觉处女膜也在一颤一颤的呢…${heart(1)}」`,
      ); // :915
      kojo.自慰 = 6; // :916
    } else if (
      // :918-937 爱＋自慰中毒Lv3以上
      era.get(`talent:${target}:85`) === 1 &&
      masturbation_addiction >= 3 &&
      (kojo.自慰 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // :920-929 撮影中
      if (filming) {
        era.print('「看见了吗？～♪　噗咻噗咻勃起的'); // :922
        if (has_penis) {
          era.print('鸡鸡……'); // :924
        } else {
          era.print('假鸡鸡'); // :926
        }
        await era.printAndWait('♪」'); // :928
        await era.printAndWait(
          `「${sc()}呐，只有有爱的话，在大家面前也不觉得尴尬了……♪」`,
        ); // :929
      } else if (rand_n(3) === 0) {
        await era.printAndWait('「好、爽～！　啊哈哈…哈哈…好爽～！」'); // :931
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
          `「看吧！　看看下贱的${sc()}…看看自慰地发狂的${sc()}、再多看我吧！」`,
        ); // :933
      } else {
        await era.printAndWait('「这样…完全不够呢…还要…你的…啊啊～♪」'); // :935
      }
      kojo.自慰 = 5; // :937
    } else if (
      // :939-946 爱＋自慰中毒Lv3未満
      era.get(`talent:${target}:85`) === 1 &&
      masturbation_addiction < 3 &&
      (kojo.自慰 <= 3 || game.kojo.口上开关 === 2)
    ) {
      if (rand_n(2) === 0) {
        await era.printAndWait('「被看着…虽然很害羞、不过太舒服了～！」'); // :942
      } else {
        await era.printAndWait('「哈啊…哈啊…啊啊～」'); // :944
      }
      kojo.自慰 = 4; // :946
    } else if (
      // :948-955 屈服刻印Lv3+自慰中毒Lv1以上
      (era.get(`mark:${target}:2`) || 0) === 3 &&
      masturbation_addiction >= 1 &&
      (kojo.自慰 <= 2 || game.kojo.口上开关 === 2)
    ) {
      if (rand_n(2) === 0) {
        await era.printAndWait('「如果这是你希望的话…」'); // :951
      } else {
        await era.printAndWait('「就照你说的做吧…」'); // :953
      }
      kojo.自慰 = 3; // :955
    } else if (kojo.自慰 <= 1 || game.kojo.口上开关 === 2) {
      // :957-964 それ以外（爱無し、自慰中毒Lv1未満）
      if (rand_n(2) === 0) {
        await era.printAndWait('「好难为情…」'); // :960
      } else {
        await era.printAndWait('「真讨厌…」'); // :962
      }
      kojo.自慰 = 2; // :964
    }
    return 0;
  }

  // :973 IF SELECTCOM == 5（胸爱抚，CFLAG:306）
  if (era_flag.selectcom === 5) {
    const milk_body =
      era.get(`talent:${target}:130`) === 1 &&
      (era.get(`palam:${target}:5`) || 0) > PALAMLV[3] &&
      !era.get(`tequip:${target}:16`) &&
      !era.get(`tequip:${target}:15`);
    const b_insensible = era.get(`talent:${target}:107`);
    const b_sense = era.get(`abl:${target}:1`) || 0;

    // :975-1001 初めて（CFLAG:306 == 0）
    if (kojo.胸爱抚 === 0) {
      // :977-987 母乳体质
      if (milk_body) {
        // :979-986 爱＆淫乱
        if (
          era.get(`talent:${target}:85`) === 1 ||
          era.get(`talent:${target}:76`) === 1
        ) {
          await era.printAndWait(
            `「吸吧～！${sc()}的乳房～…请你吮吸并品尝母乳吧～…${heart(1)}」`,
          ); // :980
        } else {
          await era.printAndWait(
            '「啊啊啊～…乳房被吸了…不要啊～…呜啊…啊啊～！」',
          ); // :983
          // :986 B鈍感
          if (b_insensible) {
            await era.printAndWait(
              `${target_name}钝感的乳头被吸吮着、被刺激的红肿起来………`,
            ); // :986
          }
        }
      } else if (
        // :990-997 爱＆淫乱
        era.get(`talent:${target}:85`) === 1 ||
        era.get(`talent:${target}:76`) === 1
      ) {
        await era.printAndWait('「请你随心所欲的揉吧…♪」'); // :991
      } else {
        await era.printAndWait('「讨厌、变态！」'); // :994
        // :997 B鈍感
        if (b_insensible) {
          await era.printAndWait(
            `${target_name}钝感的乳头被吸吮着、被刺激的红肿起来………`,
          ); // :997
        }
      }
      kojo.胸爱抚 = 1; // :1000
      return 0;
    }

    // :1003-1058 二回目以降
    // :1005-1026 母乳体质
    if (milk_body) {
      // :1007-1010 淫乱
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「主人～…再吸吧～…乳房一被吸…就好像要去了似的呢～${heart(1)}」`,
        ); // :1008
        await era.printAndWait(
          `${target_name}一颤一颤的痉挛着往${player_name}的嘴里喷出母乳、沉浸在快乐之中………`,
        ); // :1009
        kojo.胸爱抚 = 5; // :1010
      } else if (
        // :1012-1015 爱慕
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「主人～…再吸吧～…吸${sc()}的奶来恢复精神吧${heart(1)}」`,
        ); // :1013
        await era.printAndWait(
          `${target_name}像慈母般微笑着看着吮吸着乳头的${player_name}、摸着${player_name}的头………`,
        ); // :1014
        kojo.胸爱抚 = 4; // :1015
      } else if (
        // :1017-1020 B感覚Lv3以上
        b_sense >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          '「啊啊～…这、这样吸下去的话…噫～…这可是小宝宝吸的…东西啊…啊啊～♪」',
        ); // :1018
        await era.printAndWait(
          `${target_name}每当乳头溢出母乳就会沉浸在愉悦之中………`,
        ); // :1019
        kojo.胸爱抚 = 3; // :1020
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
        // :1022-1025 それ以外
        await era.printAndWait(
          '「啊啊～…饶了我吧～！乳房…不要吸乳房啊～…啊～啊啊～！」',
        ); // :1023
        await era.printAndWait(
          `${target_name}的乳头溢出了母乳、渐渐沉溺于母乳流出所带来的炽热快感中………`,
        ); // :1024
        kojo.胸爱抚 = 2; // :1025
      }
    } else if (
      // :1029-1034 淫乱
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「再来～…虽然很痛但也被弄得好舒服呢…啊啊${heart(1)}」`,
      ); // :1030
      // :1033 B感覚Lv3以上＋B鈍感
      if (b_sense >= 3 && b_insensible) {
        await era.printAndWait(
          `${target_name}钝感的乳头已被完全开发、被含进嘴里舔得完全勃起了………`,
        ); // :1033
      }
      kojo.胸爱抚 = 5; // :1034
    } else if (
      // :1036-1041 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「手好温暖…啊啊…好舒服啊…${heart(1)}」`); // :1037
      // :1040 B感覚Lv3以上＋B鈍感
      if (b_sense >= 3 && b_insensible) {
        await era.printAndWait(
          `${target_name}钝感的乳头已被完全开发、鼓鼓胀胀地完全勃起了………`,
        ); // :1040
      }
      kojo.胸爱抚 = 4; // :1041
    } else if (
      // :1043-1048 B感覚Lv3以上
      b_sense >= 3 &&
      (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「好有感觉…真舒服…」'); // :1044
      // :1047 B感覚Lv3以上＋B鈍感
      if (b_sense >= 3 && b_insensible) {
        await era.printAndWait(
          `${target_name}钝感的乳头已被完全开发、被刺激得勃了起来………`,
        ); // :1047
      }
      kojo.胸爱抚 = 3; // :1048
    } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
      // :1050-1055 それ以外
      await era.printAndWait('「虽然被这样揉很疼…咕呜～」'); // :1051
      // :1054 B鈍感
      if (b_insensible) {
        await era.printAndWait(`${target_name}钝感的乳头被刺激得红肿起来………`); // :1054
      }
      kojo.胸爱抚 = 2; // :1055
    }
    return 0;
  }

  // :1065 IF SELECTCOM == 6（接吻，CFLAG:307）
  if (era_flag.selectcom === 6) {
    const hometown_lover = era.get(`talent:${target}:317`) === 4;
    const first_kiss = game.train.初吻与自我口上;
    const master_play =
      !era_flag.assiplay &&
      !era.get(`tequip:${target}:89`) &&
      !era.get(`tequip:${target}:90`);

    // :1067-1097 初吻（CFLAG:307 == 0 && TFLAG:13）
    if (kojo.接吻 === 0 && first_kiss) {
      // :1069-1076 淫乱かつ主人
      if (era.get(`talent:${target}:76`) === 1 && master_play) {
        await era.printAndWait(
          `「啊～～…嗯啾…啾～…嘞咯～…嘞噗～啾～啾～～${heart(1)}」`,
        ); // :1070
        await era.printAndWait(
          `${target_name}在初吻时就用难以想象的热情与${master_name}激吻中………`,
        ); // :1071
        await era.printAndWait(
          `「哈啊啊～…再来…早该这样了…呐、再多和我…亲吻一会儿吧${heart(1)}」`,
        ); // :1072
        if (hometown_lover) {
          await era.printAndWait(
            `痴痴笑着的${target_name}脑子里已经没有故乡恋人的存在了吧………`,
          ); // :1075
        }
      } else if (era.get(`talent:${target}:85`) === 1 && master_play) {
        // :1078-1085 爱かつ主人
        await era.printAndWait(
          `「嗯～…嗯唔…那、那个…这是…${sc()}的初吻…所以…那个…」`,
        ); // :1079
        await era.printAndWait(`${target_name}忸忸怩怩很害羞的样子。`); // :1080
        await era.printAndWait(
          `「啊哈哈…${heart(1)}………那个…你要负起…责任哦？」`,
        ); // :1081
        if (hometown_lover) {
          await era.printAndWait(
            `这样微笑着的${target_name}脑子里已经没有故乡恋人的存在了吧………`,
          ); // :1084
        }
      } else {
        // :1087-1094 それ以外
        await era.printAndWait(`「啊～…啊啊…${sc()}的第一次…就这样…没了吗！」`); // :1088
        await era.printAndWait(
          `${player_name}饶有兴致的品味着${target_name}的唇………`,
        ); // :1089
        if (hometown_lover) {
          await era.printAndWait('（啊啊…对不起…对不起………）'); // :1092
          await era.printAndWait(`${target_name}想起故乡的恋人流下了眼泪………`); // :1093
        }
      }
      kojo.接吻 = 1;
      return 0;
    }

    // :1099-1124 （調教では）初めて（CFLAG:307 == 0）
    if (kojo.接吻 === 0) {
      // :1101-1106 淫乱
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「嗯啾…啾…噗呼…嘞咯～…哈啊…再来…我还想再接吻…${heart(1)}」`,
        ); // :1102
        if (hometown_lover) {
          await era.printAndWait(
            `痴痴笑着的${target_name}脑子里已经没有故乡恋人的存在了吧………`,
          ); // :1105
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :1108-1113 爱慕
        await era.printAndWait(
          '「嗯…啾…哈啊啊…感觉到爱了…那个、可以再来一次吗？」',
        ); // :1109
        if (hometown_lover) {
          await era.printAndWait(
            `这样微笑着的${target_name}脑子里已经没有故乡恋人的存在了吧………`,
          ); // :1112
        }
      } else {
        // :1115-1121 それ以外
        await era.printAndWait('「嗯～！…嗯咕～…咕呜呜…好、好恶毒………」'); // :1116
        if (hometown_lover) {
          await era.printAndWait('（啊啊…对不起…对不起………）'); // :1119
          await era.printAndWait(`${target_name}想起故乡的恋人流下了眼泪………`); // :1120
        }
      }
      kojo.接吻 = 1;
      return 0;
    }

    // :1126-1146 二回目以降
    // :1128-1130 淫乱
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.接吻 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「嗯嘞咯～♪…啾～…啾噗…啾～…嗯～…请再多吻我吧…${heart(1)}」`,
      ); // :1129
      kojo.接吻 = 5;
    } else if (
      // :1132-1135 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.接吻 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「哈啊啊…喜欢…好喜欢…不、我只是说喜欢接吻罢了…啊～～♪」',
      ); // :1133
      await era.printAndWait(
        `${player_name}如${target_name}所愿、不断地接吻着………`,
      ); // :1134
      kojo.接吻 = 4;
    } else if (
      // :1137-1139 顺从Lv2以上
      (era.get(`abl:${target}:10`) || 0) >= 2 &&
      (kojo.接吻 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「嗯～…哈啊啊…这、这样就可以了吧？…啊～、不要～…嗯嗯呜～！」',
      ); // :1138
      kojo.接吻 = 3;
    } else if (kojo.接吻 <= 1 || game.kojo.口上开关 === 2) {
      // :1141-1144 それ以外
      await era.printAndWait('「嗯～…咕～…」'); // :1142
      await era.printAndWait(`${target_name}把唇移开、不好意思的躲闪着视线………`); // :1143
      kojo.接吻 = 2;
    }
    return 0;
  }

  // :1153 IF SELECTCOM == 7（自己扒开，CFLAG:308）
  if (era_flag.selectcom === 7) {
    // :1155-1167 初めて（CFLAG:308 == 0）
    if (kojo.自己扒开 === 0) {
      // :1157-1159 淫乱
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「好的～…张开啦～${heart(1)}…怎么样呢…${sc()}的淫乱小穴…因为想要主人的大肉棒、大大的张开了哦～${heart(1)}」`,
        ); // :1158
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :1160-1162 爱慕
        await era.printAndWait(
          '「虽、虽然很害羞…如果是主人的命令的话…啊～～…讨厌…爱液流出来了～～………嗯」',
        ); // :1161
      } else {
        // :1163-1165 それ以外（爱無し）
        await era.printAndWait('「咕呜…这、这样…是不对的…」'); // :1164
      }
      kojo.自己扒开 = 1;
      return 0;
    }

    // :1169-1187 二回目以降
    // 原文二次推进写进 CFLAG:306（胸爱抚），不是 308
    // :1171-1173 淫乱
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.自己扒开 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊哈～…主人～…请再多多的…往里面看吧～…这里已经迫不及待地想被小鸡鸡插来插去了呢${heart(1)}」`,
      ); // :1172
      kojo.胸爱抚 = 5;
    } else if (
      // :1175-1177 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.自己扒开 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊啊…不要老是盯着这里看嘛…一被主人看着里面…${scf()}、${sc()}…就好有感觉…要变得…奇怪了～」`,
      ); // :1176
      kojo.胸爱抚 = 4;
    } else if (
      // :1179-1181 露出癖Lv3以上
      (era.get(`abl:${target}:17`) || 0) >= 3 &&
      (kojo.自己扒开 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「啊啊～好有感觉～…小穴被看着好有感觉啊………」'); // :1180
      kojo.胸爱抚 = 3;
    } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
      // :1183-1185 それ以外（爱無し、露出癖Lv3未満）
      await era.printAndWait('「咕呜～…求你了…别看了…不要看那种地方…」'); // :1184
      kojo.胸爱抚 = 2;
    }
    return 0;
  }

  // 其余指令待办，占位一行
  stub_line(
    'KOJO_MESSAGE_COM_0',
    `指令 ${era_flag.selectcom} 的口上`,
    '随各自指令票',
  );

  return 0;
}

// 注册进分发族（TRYCALLFORM KOJO_MESSAGE_COM_0 的等价物；重复注册抛错）
kojo_message_com_family.register(0, kojo_message_com_0);

module.exports = { STUBBED_CALLS, kojo_message_com_0 };
