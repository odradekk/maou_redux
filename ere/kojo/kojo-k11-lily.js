/* eslint-disable no-irregular-whitespace */
/**
 * @file 村娘口上 K11 莉莉：EVENTTRAIN / EVENTEND、全指令口上、兽奸与
 *       死斗场专用口上、参数/刻印/事件口上及非调教族全量移植（issue #242）。
 *
 * 门面迁移（issue #242 复核补做）：既有前段 CFLAG:21/201/202/400/650
 * 原 cflag 字面量模板串寻址（共 50 处）已全部改走
 * `chara(target).kojo.<字段>`（肉亲_0/初调教/简易助手_0/魔族化_K11/
 * NTR再捕获，均已在 tools/facade-names.js 登记），本文件因此并入
 * test/gen-facade.test.js 的口上严格检查清单（同 K3/K9/K10 先例）。
 *
 * == 姉妹判定（TARGET 是姐姐莉莉，NO:ASSI == 17 是妹妹玛奥） ==
 *
 * 助手是玛奥（角色 17）时，:126-129 先互标肉亲关系（CFLAG:TARGET:21 = 317
 * 姐姐、CFLAG:ASSI:21 = 224 妹妹），随后 :130 起的 CFLAG:201 状态机在初调教
 * （0）与简易助手分支都对「ASSI 是否玛奥」分叉出姉妹相认/寻妹对峙两套
 * 台词。此后素质分档（屈服刻印/淫乱/爱慕/崩坏）与其余口上文件同构。
 *
 * == CALL K11_KOJO2 四处（转译器初稿留成注释，本次复核改回真实调用） ==
 *
 * :370-371（崩坏后二回目以降）、:373-374（无助手）、:383-384
 * （TALENT:MASTER:122==0，主人非男性）、:507-508（助手非玛奥且无专属口上）——
 * 四处 ELSEIF 臂在原作里只有一句 CALL K11_KOJO2，落地为 `await k11_kojo2();`，
 * 返回值不读（同 kojo-k4-stoic.js k4_kojo2 先例）。
 *
 * == 锚鉴别力自查（#242 复核补做，判据见 issue 讨论，工具化见 #298） ==
 *
 * trace-refs/kojo-k11-lily.mjs 的 2008 条锚里，SELECTCOM 0/1/2/3/5 沿用整段
 * 字面量拼接的旧生成法；SELECTCOM 6/7/8/9/10/11/12/13/14/15/16（本轮新增十一支）起改用
 * K10（#241）的逐行独立锚定法——区间内每条非空白源码行各自包一层
 * `^\s*...\s*$`（大区间只取开头 8 行），真正多行、鉴别力更强，两种生成法
 * 在文件内并存，旧锚未随本轮重新生成（避免无关格式化改动）。全部锚对每
 * 条锚在源全文里做精确子串计数：1744 条恰好命中 1 行/1 段，可视为具备真实
 * 鉴别力。余下
 * 264 条命中 >1 处，且经验证无法在不破坏 text-fidelity 逐句绑定
 * （find_printform 要求 n..m 窗口内首条 PRINTFORM 系行即目标句，向前/
 * 向后扩窗只要越过相邻语句自身的 PRINTFORM 行就会误绑定）的前提下继续
 * 收窄——60 条来自既有前段（存在标志/@EVENTTRAIN/@K11_KOJO2/
 * @EVENTEND，:100-748），落在 CFLAG:400 魔族化分支与 K11_KOJO2 RAND 分档
 * 里逐句复现的对白段落内，按 issue 讨论保持现状、不再动；4 条来自
 * SELECTCOM 0/1/2（:811/818/826/1022，姉妹相认/魔族化前后两套台词在平行
 * 分支里逐字复现）；4 条来自 SELECTCOM 6（:1304/1310/1314/1389，首吻/
 * 二回目以降两层里各一对逐字重复的对白句）；6 条来自 SELECTCOM 7
 * （:1485/1486/1534/1547/1586/1587，处女/非处女子分档与二回目以降两层
 * 里各一对逐字重复的对白句）；4 条来自 SELECTCOM 9（:1709/1713/1748/
 * 1770，初めて层淫乱/爱慕两支、二回目以降助手玛奥/非助手玛奥それ以外
 * 分档里各一对逐字重复的对白句）；2 条来自 SELECTCOM 11（:1927/1932，
 * 助手玛奥二回目以降淫乱/爱慕两支共用同一句反问台词）；2 条来自 SELECTCOM
 * 14（:2209/2246，淫乱初めて分支与二回目以降非助手玛奥分支共用同一句
 * 阴蒂夹刺激描写）；7 条来自 SELECTCOM 16（:2382/2386/2390/2407/2413/2419/
 * 2438，「夹在……乳房上的榨乳机，正在毫不留情地挤榨着母乳………」这句通用描写
 * 在初めて/二回目以降助手玛奥/非助手玛奥六个分支里逐字复现，且各自跟随不同
 * 的 CFLAG:317 写值，无法合并）；49 条来自 SELECTCOM 20（:2662/2663/2664/
 * 2669/2671/2672/2673/2678/2680/2681/2682/2689/2692/2696/2699/2714/2715/
 * 2717/2718/2721/2722/2728/2729/2738/2739/2744/2745/2766/2768/2769/2774/
 * 2775/2784/2797/2805/2806/2813/2814/2828/2834/2846/2866/2871/2881/2891/
 * 2892/2918/2923/2928，初めて层处女/非处女×助手玛奥/非助手玛奥×淫乱/爱慕/
 * それ以外多支共用同一句「被…一口气突入了」「处女的蜜穴被…贯通到底」
 * 「插进姐姐的小穴里了」等动作描写，二回目以降层助手玛奥/非助手玛奥两支的
 * 淫乱/爱慕/屈服刻印各档 RAND:3 分岔内同样共用「压在身下…一口气贯通到底」
 * 等描写，各自跟随不同的 CFLAG:321 写值与素质判据，无法合并）；53 条来自
 * SELECTCOM 21（:2966/2967/2970/2974/2975/2977/2978/2985/2986/2993/2996/
 * 3000/3003/3018/3019/3025/3026/3032/3033/3042/3043/3048/3049/3054/3095/
 * 3096/3110/3120/3121/3135/3136/3140/3151/3157/3164/3171/3172/3179/3191/
 * 3192/3195/3211/3215/3225/3226/3235/3249/3259/3264/3265/3269/3277/3284，
 * 初めて层处女×助手玛奥/非助手玛奥×淫乱/爱慕/それ以外多支与二回目以降层
 * 助手玛奥/非助手玛奥两支的淫乱/爱慕/屈服刻印各档 RAND:3/RAND:2 分岔内，
 * 共用「扶着…的腰，从背后进入了…的蜜穴之中」「一口气贯入到了最里面」等
 * 后背位动作描写的段落，且部分与 SELECTCOM 20 的正常位描写逐字重复，各自
 * 跟随不同的 CFLAG:322 写值与素质判据，无法合并）；11 条来自 SELECTCOM 22
 * （:3300-3340 为初めて层段级概览锚，前 8 行与其余口上文件里同样未填写的
 * 处女支模板骨架逐字相同，属已知的跨文件模板重复；:3302 为该模板骨架自身
 * 的空 PRINTFORMW 行，源文件里空 PRINTFORMW 出现 285 处，按 #235 先例整行
 * 锚定即可、不强求唯一；:3311/3316/3321 为初めて层非处女支助手玛奥三档
 * 共用同一句「被…抱在腿上，吸吮着乳头的同时侵犯着蜜穴……」收尾描写；
 * :3426/3432 为二回目以降层助手玛奥それ以外档与非助手玛奥それ以外档共用
 * 同一句「被…抱在腿上，肆意玩弄着双乳，蜜穴也被持续侵犯着……」；
 * :3446/3448/3468/3470 为二回目以降层非助手玛奥淫乱/爱慕两档共用同一对
 * ABL:2 二态追问句「不，不行了……小穴……舒服得……要上天了啊啊啊」/
 * 「呜啊……小穴……实在是太舒服了啊啊啊」，各自跟随不同的 CFLAG:323 写值
 * 与素质判据，无法合并）；35 条来自 SELECTCOM 23（:3515 为初めて层处女支
 * 空模板骨架，跨文件已知模式；:3529/3531/3537/3549/3553 为初めて层爱慕/
 * それ以外档的下双腿展露描写句，与 COM20/21 的对应描写逐字或近逐字重复；
 * :3588/3592/3594、:3604/3606/3608、:3612/3614/3618、:3623 为二回目以降层
 * 助手玛奥淫乱/爱慕档 RAND:3/RAND:2 各分支内嵌套的 ABL:2 追问句/双腿展露
 * 描写句，与本文件其余 SELECTCOM 的同款素质分档句式重复；:3638、:3649/
 * :3656 为屈服刻印/それ以外档收尾句与双腿展露描写句重复；:3665/3669/3675/
 * 3686/3689/3690、:3699/3709/3713/3719/3723/3724 为二回目以降层非助手玛奥
 * 淫乱/爱慕档三选一开场句各分支下嵌套的 ABL:2 追问句重复；:3731/3733 为
 * 非助手玛奥屈服刻印Lv3＋V感覚档双独立 RAND:2 结构里第一次抽样的两支收尾
 * 句重复；:3747/3752 为屈服刻印Lv3/それ以外档双腿被用手（强行）分开展露
 * 描写句重复，各自跟随不同的 CFLAG:324 写值与素质判据，无法合并）；27 条
 * 来自 SELECTCOM 26（:3770/3774/3777/3784 为初めて层三档共用同一句开场
 * 邀约台词『姐姐还没体会过肛交吗♡ 保证会让你舒服上天的♡ 嘿嘿嘿！』，仅
 * 助手玛奥支特有；:3778/3785 为非淫乱两档共用的贯入动作描写句；:3835/
 * 3840/3868/3873/3900/3935 为「好舒服……已经舒服得……没有办法思考了
 * 啊啊啊♡」一类跨文件反复出现的高潮通用句，与本文件其余 SELECTCOM
 * 同款素质分档重复；:3842/3845/3848/3854/3863/3875/3878/3879/3887/
 * 3902/3914/3932/3940/3963/3967 为二回目以降层 RAND:3 三选一各分支内的
 * 过程描写/追问句，跨助手玛奥与非助手玛奥、跨淫乱/爱慕/それ以外/A感覚
 * Lv3以上多档重复出现，各自跟随不同的 CFLAG:327 写值与素质判据，无法
 * 合并）。SELECTCOM
 * 3/5/6/7/8/9/10/11/12/13/14/15/16/19/20/21/22/23/26 内非 print 语句
 * 自身收尾行的锚（守卫 SIF/RETURN、CFLAG 计数器赋值）已仿 K9（#240
 * commit 9716dee）的整改法向外扩窗到唯一邻行——只有 era.print(/
 * era.printAndWait( 语句自己收尾行的 `:N` 锚绝不参与扩窗（kojo-text-
 * fidelity 靠它做逐语句字面量绑定，扩窗会误绑邻行台词）。这 264 条即便
 * 行号漂移，落点也只会落到另一处内容完全相同的复现段落，不会静默通过
 * 成不相关文本——风险画像与结构性关键字锚（如裸 `RETURN 0`）不同，后者
 * 才是真正的零鉴别力。
 */

'use strict';

const era = require('#/era-electron');
const { on, TIER } = require('#/system/event/registry');
const { piercing_state } = require('#/system/train/piercing-state');
const era_flag = require('#/era-utils/era-flag');
const { PALAMLV } = require('#/era-utils/palam-level');
const {
  peek_aftertrain_q,
  peek_aftertrain_s,
} = require('#/event/event-aftertrain');
const {
  banishment_koujo_family,
  benki_koujo_family,
  dungeon_attack_family,
  dungeon_victory_family,
  enterenemy_koujo_family,
  exucution_koujo_family,
  grotesque_koujo_family,
  kojo_message_com_family,
  kojo_message_markcng_family,
  kojo_message_palamcng_family,
  museum_koujo_family,
  ntr_koujo_family,
  public_exucution_koujo_family,
  self_kojo_family,
} = require('#/kojo/kojo-system');
const {
  gohoubi_after_koujo_family,
  gohoubi_request_koujo_family,
  osioski_koujo_family,
} = require('#/kojo/kojo-dungeon-after');
const {
  ryouzyoku_after_kojo_family,
  ryouzyoku_kojo_family,
} = require('#/kojo/kojo-dungeon-ravish');
const { heart } = require('#/kojo/kojo-text');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { chara_callname } = require('#/utils/callname-utils');

/** 读未声明的序号返回 undefined 而非 0（#13），口上条件一律 || 0 兜底 */
const era0 = (k) => era.get(k) || 0;
/** RAND:N 的默认随机源（本文件的 on() 事件处理器不经分发注入 rand） */
const rand_n = (n) => Math.floor(Math.random() * n);
/** MASTER 恒为角色 0（K1 kojo-k1-confident.js 同款先例） */
const MASTER = 0;

// @EVENTTRAIN #PRI（:100-105）：存在标志 + 总开关补 0（同 EVENT_K.ERB 语义）
on(
  'EVENTTRAIN',
  () => {
    game.kojo.口上存在_11 = 1; // FLAG:111 = 1（K11 口上存在标志）
    if (game.kojo.口上开关 === 0) {
      game.kojo.口上开关 = 2;
    }
  },
  TIER.PRI,
);

// @EVENTEND #LATER（:106-113）：调教结束清存在标志
on(
  'EVENTEND',
  () => {
    game.kojo.口上存在_11 = 0; // FLAG:111 = 0
  },
  TIER.LATER,
);

/**
 * @EVENTTRAIN（:114-514，普通档）：调教开始时的口上。
 *
 * 守卫（:114-118）：FLAG:7 <= 0 跳过、TALENT:171 != 1 跳过；此后按
 * CFLAG:201 状态机推进：初调教（0，姉妹相认/寻妹对峙分档）→ 魔族化仅
 * 一次（<5 且 TALENT:314==9 未魔族化）→ NTR 再捕获（>=1 && CFLAG:650==1）
 * → 屈服刻印 Lv1/2/3（各一次）→ 淫乱（含魔族化分支）→ 爱慕（含魔族化
 * 分支）→ 崩坏 → 简易助手分支（TALENT:MASTER:122==0 或 ASSI<0 或助手
 * 非玛奥无专属口上 → K11_KOJO2；助手是玛奥 → CFLAG:202 三阶）。
 */
on(
  'EVENTTRAIN',
  async () => {
    const target = era_flag.target;
    const target_name = chara_callname(target); // %SAVESTR:TARGET%
    const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
    const assi = era_flag.assi; // NO:ASSI（ere 角色 ID 直接对应）
    const assi_name = chara_callname(assi); // %SAVESTR:ASSI%
    const kojo = chara(target).kojo;
    if (era0('flag:7') <= 0) {
      return 0;
    }
    if (era0(`talent:${target}:171`) != 1) {
      return 0;
    }

    // 姉妹判定（助手是玛奥 → 互标肉亲关系）
    if (assi > 0 && assi == 17) {
      kojo.肉亲_0 = 317;
      chara(assi).kojo.肉亲_0 = 224;
    }

    if (kojo.初调教 == 0) {
      era.drawLine();
      if (assi > 0 && assi == 17) {
        // 姉妹相认（助手是玛奥）
        await era.print(`『姐姐？你怎么会在这里？』`);
        await era.printAndWait(
          `「${assi_name}！终于…终于找到你了！我们一起回村子里去吧！」`,
        );
        await era.printAndWait(
          `眼前这个叫${target_name}的年轻女性，自称是${assi_name}的姐姐`,
        );
        await era.printAndWait(
          `而${player_name}这才注意到，两人的音容神貌的确有几分相似。`,
        );
        await era.printAndWait(`还有那顶火红的头发，以及瞳色更是一模一样。`);
        await era.print(`『姐姐……为什么过了这么久才来找我？……我，我已经…』`);
        await era.printAndWait(`${assi_name}挽起了${player_name}的臂弯。`);
        await era.print(
          `『我已经…将自己全身心献给魔王大人了${heart(1)} 村子什么的再也不想回去了${heart(1)}』`,
        );
        await era.print(
          `「说谎！说谎！你一定是被这个家伙强迫的对吧！快放了${assi_name}，奴隶什么的，让我来代替她！」`,
        );
        await era.printAndWait(
          `“你要是真的能代替${assi_name}来满足我的话，我倒是可以考虑放过${assi_name}。”听到${player_name}的话，${target_name}缓慢而坚定地点点头。`,
        );
        await era.print(`「只要放过我妹妹，你要随便怎样对我都好！」`);
        await era.printAndWait(
          `看着姐姐的样子，${assi_name}却不满地翘起了嘴，用谁也听不到的声音嘟囔着。`,
        );
        await era.printAndWait(`『真是的，姐姐只会做多余的事………』`);
        kojo.简易助手_0 = 1;
      } else {
        // 寻妹对峙（无玛奥或助手非玛奥）
        await era.print(`「我的妹妹呢！把我的妹妹还给我！」`);
        await era.printAndWait(
          `站在面前的这个年轻女性――${target_name}，不顾自己的处境，不由分说地怒斥着${player_name}。`,
        );
        await era.print(`「是你把她抓到这里的吧！？我的妹妹——玛奥！！」`);
        await era.printAndWait(
          `听这么一说，${player_name}发现这个女人的神情和那个可爱的乡下小姑娘挺相像的。`,
        );
        await era.printAndWait(`那头火红的头发，还有瞳孔的颜色都一模一样。`);
        await era.printAndWait(
          `面对质问，${player_name}微微点了点头，${target_name}一下子神色激动了起来。`,
        );
        await era.print(
          `「果然是在这里！求求你，请把她还给我！还给我！她是我的妹妹啊！」`,
        );
        await era.printAndWait(
          `但她不知道的是，她的妹妹玛奥已经把全身心都献给${player_name}了，更不会愿意离开的。`,
        );
        await era.printAndWait(
          `但${player_name}还是饶有趣味地思考了一下${target_name}的要求。`,
        );
        await era.print(
          `「嗯…想要见她？想要让她回去？也不是不可以。但是你愿意代替她做我的性奴隶，接受我的调教吗？」`,
        );
        await era.printAndWait(
          `听到这样的话，${target_name}愣住了，脸上浮现出矛盾的复杂表情。`,
        );
        await era.print(
          `“毕竟，为我解开封印的是你的妹妹啊。你作为她的姐姐，我当然也要好好‘感谢’一番才对。”${player_name}俯身在她面前低语着，带着深深的恶意。`,
        );
        await era.printAndWait(`${target_name}的表情由恐惧变成了绝望。`);
        await era.print(`「骗……骗人……不要啊……不要过来……」」`);
        await era.printAndWait(`那么，是时候为姐妹重聚的最终舞台做准备了。`);
      }
      kojo.初调教 = 1;
      return 1;
    } else if (
      kojo.初调教 < 5 &&
      kojo.魔族化_K11 == 0 &&
      era0(`talent:${target}:314`) == 9 &&
      era0(`talent:${target}:85`) == 0 &&
      era0(`talent:${target}:76`) == 0
    ) {
      // 魔族化（１回のみ，初回调教后、陷落前）
      await era.printAndWait(''); // PRINTFORMW 空行
      kojo.魔族化_K11 = 2;
      return 1;
    } else if (kojo.初调教 >= 1 && kojo.NTR再捕获 == 1) {
      // NTR 再捕获
      if (era0(`talent:${target}:85`) || era0(`talent:${target}:76`)) {
        era.drawLine();
        await era.printAndWait(''); // PRINTFORMW 空行
        kojo.NTR再捕获 = 0;
      } else {
        era.drawLine();
        await era.printAndWait(''); // PRINTFORMW 空行
        kojo.NTR再捕获 = 0;
      }
      return 1;
    } else if (kojo.初调教 < 2 && era0(`mark:${target}:2`) == 1) {
      // 屈服刻印Lv1
      era.drawLine();
      await era.printAndWait(`「呼…呼…这样的调教，才，才没有什么……」`);
      await era.printAndWait(
        `在屈辱的调教中，${target_name}闭上了眼睛，似乎还在坚持着反抗的心态………`,
      );
      kojo.初调教 = 2;
      return 1;
    } else if (kojo.初调教 < 3 && era0(`mark:${target}:2`) == 2) {
      // 屈服刻印Lv2
      era.drawLine();
      await era.printAndWait(`「都是因为救不了妹妹…我才会受到这样的惩罚」`);
      await era.printAndWait(
        `${target_name}伏在床上，埋着脸哭泣着。她的样子反而更让${player_name}露出了愉悦的扭曲笑意。`,
      );
      await era.printAndWait(
        `从${target_name}为自己接受调教进行辩解开始，就可以开始进行更进一步的内容了………`,
      );
      kojo.初调教 = 3;
      return 1;
    } else if (
      kojo.初调教 < 4 &&
      era0(`mark:${target}:2`) == 3 &&
      era0(`talent:${target}:85`) == 0
    ) {
      // 屈服刻印Lv3
      era.drawLine();
      await era.printAndWait(`「不，不要啊！不要用你的脏手碰我……啊啊」`);
      await era.printAndWait(
        `尽管${target_name}语气还无比强硬、${player_name}继续爱抚着她的身体。`,
      );
      await era.printAndWait(
        `而${player_name}的身体也自己一点点放松了，诚实地接受并享受着爱抚。`,
      );
      await era.printAndWait(
        `「杀了你！总有一天…一定要杀了你！呜呜……啊嗯……啊啊……」`,
      );
      await era.printAndWait(
        `${player_name}愉快的听着${target_name}的威胁逐渐变成了略带享受的喘息。还有更多的可以期待。`,
      );
      kojo.初调教 = 4;
      return 1;
    } else if (
      kojo.初调教 < 5 &&
      era0(`talent:${target}:85`) == 0 &&
      era0(`talent:${target}:76`) == 1 &&
      era0(`talent:${target}:314`) != 9
    ) {
      // 淫乱
      era.drawLine();
      await era.printAndWait(
        `「啊哈…嗯啊……别，别再摸我了、真是一点都不想见到你的脸…嗯…啊啊…哈啊…」`,
      );
      await era.printAndWait(
        `虽然这么说着，但${target_name}的身体却在${player_name}的粗暴爱抚下一扭一扭地享受着。`,
      );
      await era.printAndWait(
        `「啊呀、不要啦、这样摸到底有，有什么好的…嗯啊啊！」`,
      );
      await era.printAndWait(
        `${target_name}不自觉地张开了双腿，把私处展露在${player_name}前面，蜜穴已经被爱液湿透。`,
      );
      await era.printAndWait(
        `曾经纯洁的乡下少女，已经在不知不觉间变得如同娼馆里的妓女一样淫荡而不知羞耻了。`,
      );
      if (era0(`talent:${target}:0`) == 1) {
        await era.printAndWait(
          `「啊啊…要是敢侵犯我的处女身的话，绝对不会原谅你的哦${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}舔着舌头说道，望着${player_name}的眼睛却露出了期待的光芒………`,
        );
      } else {
        await era.printAndWait(
          `「看，都，都湿了，就说了不行嘛…要是还敢继续侵犯这里的话，绝对不会原谅你的哦${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}的双眼却露出了期待的光芒………`);
      }
      kojo.初调教 = 5;
      return 1;
    } else if (
      era0(`talent:${target}:314`) == 9 &&
      kojo.初调教 < 6 &&
      era0(`talent:${target}:85`) == 0 &&
      era0(`talent:${target}:76`) == 1
    ) {
      // 淫乱+魔族化（调教前从魔族/初回调教后魔族/陥落后魔族三档）
      era.drawLine();
      if (kojo.魔族化_K11 == 1) {
        await era.printAndWait(
          `「啊哈…嗯啊……别，别再摸我了、真是一点都不想见到你的脸…嗯…啊啊…哈啊…」`,
        );
        await era.printAndWait(
          `虽然这么说着，但${target_name}的身体却在${player_name}的粗暴爱抚下一扭一扭地享受着。`,
        );
        await era.printAndWait(
          `「啊呀、不要啦、这样摸到底有，有什么好的…嗯啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}不自觉地张开了双腿，把已经被爱液湿透的私处展露在${player_name}前面。`,
        );
        await era.printAndWait(
          `曾经纯洁的乡下少女，已经在你的调教下变得如同娼馆里的妓女一样淫荡而不知羞耻了。`,
        );
        if (era0(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「啊啊…要是敢侵犯我的处女身的话，绝对不会原谅你的哦${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}舔着舌头说道，望着${player_name}却露出了期待的光芒………`,
          );
        } else {
          await era.printAndWait(
            `「你看……都，都湿透了，就说了不行嘛…要是还敢继续侵犯这里的话，绝对不会原谅你的哦${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}的双眼却露出了期待的光芒…`);
        }
        kojo.初调教 = 6;
        return 1;
      } else if (kojo.魔族化_K11 == 2) {
        await era.printAndWait(
          `「啊哈…嗯啊……别，别再摸我了、真是一点都不想见到你的脸…嗯…啊啊…哈啊…」`,
        );
        await era.printAndWait(
          `虽然这么说着，但${target_name}的身体却在${player_name}的粗暴爱抚下一扭一扭地享受着。`,
        );
        await era.printAndWait(
          `「啊呀、不要啦、这样摸到底有，有什么好的…嗯啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}不自觉地张开了双腿，把私处展露在${player_name}前面，蜜穴已经被爱液湿透。`,
        );
        await era.printAndWait(
          `曾经纯洁的乡下少女，已经在不知不觉间变得如同娼馆里的妓女一样淫荡而不知羞耻了。`,
        );
        if (era0(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「啊啊…要是敢侵犯我的处女身的话，绝对不会原谅你的哦${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}舔着舌头说道，望着${player_name}却露出了期待的光芒………`,
          );
        } else {
          await era.printAndWait(
            `「看，都，都湿了，就说了不行嘛…要是还敢继续侵犯这里的话，绝对不会原谅你的哦${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}的双眼却露出了期待的光芒…`);
        }
        kojo.初调教 = 6;
        return 1;
      } else {
        await era.printAndWait(''); // PRINTFORMW 空行（陥落后に魔族）
        kojo.初调教 = 6;
        return 1;
      }
    } else if (
      kojo.初调教 < 7 &&
      era0(`talent:${target}:85`) == 1 &&
      era0(`talent:${target}:314`) != 9 &&
      era0(`talent:${target}:76`) == 0
    ) {
      // 爱慕
      era.drawLine();
      await era.printAndWait(
        `${target_name}靠在${player_name}的身边，轻轻地耳语着。`,
      );
      await era.printAndWait(
        `「那个、那个…比起玛奥，也请，多疼爱一下我吧…只，只是不想让她负担太重，不是别的！」`,
      );
      await era.printAndWait(
        `说罢抓着${player_name}的手按在了自己丰满的胸部上。`,
      );
      await era.printAndWait(
        `「你看……比起那个孩子寒酸的小身板，我的身材好得多吧？」`,
      );
      await era.printAndWait(
        `面对这个献媚的身姿，${player_name}嘴角裂出扭曲的笑意。`,
      );
      await era.printAndWait(`「有…有什么好笑的嘛？」`);
      if (era0(`talent:${target}:0`) == 1) {
        await era.printAndWait(
          `「我还是处女的说…不过只要能取悦你，做什么都可以哦…真的…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}已经完全沦为${player_name}爱的奴隶了、比起妹妹，更想要和${player_name}在一起……`,
        );
      } else {
        await era.printAndWait(
          `「总之……请像以前那样疼爱我吧…调教我…侵犯我吧…拜托了${heart(1)}」`,
        );
        await era.printAndWait(
          `边这样怜求着，${target_name}脸像被红霞染过了一般、声音也显得燥热难耐。`,
        );
        await era.printAndWait(
          `${target_name}已经完全沦为${player_name}爱的奴隶了、比起妹妹，更想要和${player_name}在一起……`,
        );
      }
      kojo.初调教 = 7;
      return 1;
    } else if (
      era0(`talent:${target}:314`) == 9 &&
      kojo.初调教 < 8 &&
      era0(`talent:${target}:85`) == 1 &&
      era0(`talent:${target}:76`) == 0
    ) {
      // 爱慕+魔族化（调教前从魔族/初回调教后魔族/陥落后魔族三档）
      era.drawLine();
      if (kojo.魔族化_K11 == 1) {
        await era.printAndWait(
          `${target_name}靠在${player_name}的身边，轻轻地耳语着。`,
        );
        await era.printAndWait(
          `「那个、那个…比起妹妹，也请，多疼爱一下我吧…只，只是不想让她负担太重，不是别的！」`,
        );
        await era.printAndWait(
          `说罢抓着${player_name}的手按在了自己丰满的胸部上。`,
        );
        await era.printAndWait(
          `「你看……比起那个孩子寒酸的小身板，我的身材好得多吧？」`,
        );
        await era.printAndWait(
          `面对这个献媚的身姿，${player_name}嘴角裂出扭曲的笑意。`,
        );
        await era.printAndWait(`「有…有什么好笑的嘛？」`);
        if (era0(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「我还是处女的说…不过只要能取悦你，做什么都可以哦…真的…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}已经完全沦为${player_name}爱的奴隶了、比起妹妹，更想要和${player_name}在一起……`,
          );
        } else {
          await era.printAndWait(
            `「总之……请像以前那样疼爱我吧…调教我…侵犯我吧…拜托了${heart(1)}」`,
          );
          await era.printAndWait(
            `边这样怜求着，${target_name}脸像被红霞染过了一般、声音也显得燥热难耐。`,
          );
          await era.printAndWait(
            `${target_name}已经完全沦为${player_name}爱的奴隶了、比起妹妹，更想要和${player_name}在一起……`,
          );
        }
        kojo.初调教 = 8;
        return 1;
      } else if (kojo.魔族化_K11 == 2) {
        await era.printAndWait(
          `${target_name}靠在${player_name}的身边，轻轻地耳语着。`,
        );
        await era.printAndWait(
          `「那个、那个…比起妹妹，也请，多疼爱一下我吧…只，只是不想让她负担太重，不是别的！」`,
        );
        await era.printAndWait(
          `说罢抓着${player_name}的手按在了自己丰满的胸部上。`,
        );
        await era.printAndWait(
          `「你看……比起那个孩子寒酸的小身板，我的身材好得多吧？」`,
        );
        await era.printAndWait(
          `面对这个献媚的身姿，${player_name}嘴角裂出扭曲的笑意。`,
        );
        await era.printAndWait(`「有…有什么好笑的嘛？」`);
        if (era0(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「我还是处女的说…不过只要能取悦你，做什么都可以哦…真的…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}已经完全沦为${player_name}爱的奴隶了、比起妹妹，更想要和${player_name}在一起……`,
          );
        } else {
          await era.printAndWait(
            `「总之……请像以前那样疼爱我吧…调教我…侵犯我吧…拜托了${heart(1)}」`,
          );
          await era.printAndWait(
            `边这样怜求着，${target_name}脸像被红霞染过了一般、声音也显得燥热难耐。`,
          );
          await era.printAndWait(
            `${target_name}已经完全沦为${player_name}爱的奴隶了、比起妹妹，更想要和${player_name}在一起……`,
          );
        }
        kojo.初调教 = 8;
        return 1;
      } else {
        await era.printAndWait(''); // PRINTFORMW 空行（陥落后に魔族）
        kojo.初调教 = 8;
        return 1;
      }
    } else if (era0(`talent:${target}:9`) == 1 && kojo.初调教 < 9) {
      // 崩坏
      era.drawLine();
      await era.printAndWait(`${target_name}的眼睛失去了光彩。`);
      await era.printAndWait(
        `因为过度的调教，看上去精神和身体都崩溃了的样子。`,
      );
      await era.printAndWait(`「啊哈…呼呼…啊……哈哈……」`);
      kojo.初调教 = 9;
      return 1;
    } else if (era0(`talent:${target}:9`) == 1) {
      // 崩坏后（已崩坏，二回目以降）
      await k11_kojo2(); // CALL K11_KOJO2
    } else if (assi < 0) {
      // 无助手
      await k11_kojo2(); // CALL K11_KOJO2
    } else if (era0(`talent:${MASTER}:122`) == 0) {
      // 主人非男性时二回目以降（简易助手口上不适用）
      await k11_kojo2(); // CALL K11_KOJO2
    } else if (assi == 17) {
      // 简易助手口上（助手是玛奥）：CFLAG:202 三阶
      era.drawLine();
      if (kojo.简易助手_0 == 0) {
        // 初めて
        if (era0(`talent:${target}:85`) == 1 && kojo.初调教 >= 5) {
          // 已持爱慕，爱慕取得时初口上（陷落事件）已发生过
          await era.printAndWait(
            `「玛…玛奥！你没事，真的是太好了……但，但为什么你穿成这个样子……」`,
          );
          await era.printAndWait(
            `看到作为魔王的调教助手出现的${assi_name}，${target_name}脸上露出了吃惊的表情`,
          );
          await era.print(
            `『姐姐？好久不见了呀…话说在前，现在魔王大人才是我心中最重要的人了哦』`,
          );
          await era.printAndWait(
            `边这么说着，${assi_name}在${target_name}面前抱住了${player_name}，好像在炫耀一般。`,
          );
          await era.printAndWait(`「${assi_name}，你，你在做什么！？」`);
          if (era0(`talent:${target}:0`) == 1) {
            await era.print(`『唉？姐姐还没有把处女献给魔王大人？真是不懂。』`);
            await era.printAndWait(
              `「真，真是的…说什么呢！我，我平时只是和魔王大人拥抱而已！」`,
            );
            await era.printAndWait(
              `${target_name}注意到${player_name}笑了起来，羞得整张脸都红了。`,
            );
            await era.printAndWait(
              `『总之，今天我会和魔王大人一起好好疼爱，调教你的，姐姐你做好心理准备了吗${heart(1)}』`,
            );
          } else {
            await era.print(
              `『魔王大人啊${heart(1)} 每天都会疼爱我，所以我们这样抱着，一点都不奇怪吧♪』`,
            );
            await era.printAndWait(
              `「说，说的是什么话啊！那个人，那个人可是邪恶的魔王啊！所以，你快离开，离开！」`,
            );
            await era.printAndWait(
              `『啊哈，姐姐其实也是想得到魔王的拥抱吗？为什么不坦率地说出来呢？』`,
            );
            await era.printAndWait(
              `「那，那种话说不出来的…呜呜呜…我，我想要魔王大人的拥抱，疼爱和调教………」`,
            );
            await era.printAndWait(
              `看着${target_name}话语自相矛盾，羞得满脸通红的样子、${player_name}和${assi_name}脸上浮现出了笑容………`,
            );
          }
          kojo.简易助手_0 = 2;
        } else if (era0(`talent:${target}:76`) == 1 && kojo.初调教 >= 5) {
          // 已持淫乱，淫乱取得时初口上（陷落事件）已发生过
          await era.printAndWait(`「玛…玛奥！我们终于见面了…${heart(1)}」`);
          await era.printAndWait(
            `看到${target_name}已经一派淫靡的样子，${assi_name}却觉得有点扫兴。`,
          );
          await era.print(`『哼，感觉姐姐完全变了一个人呢。』`);
          if (era0(`talent:${target}:0`) == 1) {
            await era.printAndWait(
              `「呐…让我们一起在这里开始新生活吧……作为魔王大人的宠物？」`,
            );
            await era.print(
              `『姐姐这是什么话，可早在你被抓到之前，我就已经是魔王大人的东西了哦。』`,
            );
            await era.printAndWait(
              `${assi_name}把手伸到${target_name}的双腿之间，开始抚弄姐姐的下体。`,
            );
            await era.printAndWait(`「真，真是的！」`);
            await era.print(
              `『姐姐先把这里献给魔王大人，再和我一起当魔王大人的性奴宠物吧${heart(1)}』`,
            );
            await era.printAndWait(
              `「啊…嗯啊…啊啊…愿意…我愿意把这里献给魔王大人！」`,
            );
            await era.printAndWait(
              `${assi_name}一边坏笑着一边继续用手责备着${target_name}的下体，而${target_name}对这个淫乱的提议表示完全赞成………`,
            );
          } else {
            await era.printAndWait(
              `「是啊、姐姐已经在魔王的疼爱中获得了新生…${heart(1)}」`,
            );
            await era.print(
              `『哼哼哼、我也是一样啊姐姐，从今天开始让我们一起当魔王大人的爱奴吧』`,
            );
            await era.printAndWait(
              `「嗯嗯！我们从此就是魔王大人的性奴宠物了呀！」`,
            );
            await era.printAndWait(
              `对于${assi_name}的提议，${target_name}笑颜满面地答应了………`,
            );
          }
          kojo.简易助手_0 = 2;
        } else {
          // それ以外（未持爱慕/淫乱，或未曾陷落）
          await era.printAndWait(
            `「玛…玛奥！你没事，真的是太好……为，为什么要用那种眼神看我……而且为什么穿成这个样子？」`,
          );
          await era.printAndWait(
            `${assi_name}用邪秽的目光，如同猎人看待猎物一样注视着自己的姐姐。`,
          );
          await era.print(
            `『姐姐，为什么要到这种地方来呢？在村子里好好呆着不行吗…』`,
          );
          await era.printAndWait(`「你在说什么！我是为了找你才到这里来的…」`);
          if (era0(`talent:${target}:0`) == 1) {
            await era.print(
              `『被抓到了就不能不管哦。这样好了，我决定要把姐姐变成魔王大人和我的宠物。』`,
            );
          } else {
            await era.print(
              `『结果蠢到在路上就被魔兽侵犯了吗、姐姐真是大笨蛋。』`,
            );
            await era.printAndWait(`「为，为什么要说这样的话！」`);
            await era.printAndWait(
              `${target_name}泪流满面地蜷成一团，抱着自己的身体。`,
            );
            await era.print(
              `『不过无所谓，就算姐姐已经不是处女了，我还是决定要把你变成我和魔王大人的宠物。』`,
            );
          }
          await era.printAndWait(`「宠…宠物…？你在开什么玩笑？」`);
          await era.print(
            `『才不是开玩笑啊！会把姐姐调教成只懂得取悦我的淫穴和魔王大人的肉棒的变态母猪性奴吧${heart(1)}』`,
          );
          await era.printAndWait(
            `「不，不要啊……撒谎！撒谎！不要再说了……求求你……呜呜呜………」`,
          );
          await era.printAndWait(
            `看着和过去判若两人的${assi_name}，${target_name}泣不成声………`,
          );
          kojo.简易助手_0 = 1;
        }
        return 1;
      } else if (
        kojo.简易助手_0 == 1 &&
        era0('flag:7') == 2 &&
        (era0(`talent:${target}:85`) == 1 || era0(`talent:${target}:76`) == 1)
      ) {
        // 二回目以降（爱慕＆淫乱取得时）
        if (era0(`talent:${target}:85`) == 1) {
          // 爱慕
          await era.print(`『咦咦，怎么了姐姐？为什么要用那种眼神看着我？』`);
          await era.printAndWait(`「没什么，什么事都没有，哼。」`);
          await era.printAndWait(
            `${target_name}用嫉妒的目光看着被${player_name}搂在身上的${assi_name}。`,
          );
          await era.printAndWait(
            `不知道是不是故意的，${assi_name}继续和${player_name}大声聊着今天的调教内容。`,
          );
          await era.print(
            `『今天的计划是要狠狠地调教，惩罚姐姐的肛门呢，到时候姐姐哭起来的声音一定很好听』`,
          );
          await era.printAndWait(`「怎，怎样都好，魔王大人可是属于我的呢！」`);
          await era.print(``); // PRINTL 空行
          await era.printAndWait(
            `『哼哼哼、看来姐姐已经完全变成魔王大人的性奴了呢。不如就让魔王同时享用我们姐妹俩吧？』`,
          );
          await era.printAndWait(
            `看着已经彻底变样了的姐姐，${assi_name}微笑了起来………`,
          );
          kojo.简易助手_0 = 2;
        } else if (era0(`talent:${target}:76`) == 1) {
          // 淫乱
          await era.print(`『咦，姐姐怎么了？身体看上去很难受的样子呀？』`);
          await era.printAndWait(
            `「快……快让魔王大人侵犯我…调教我吧……拜，拜托了…${heart(1)}」`,
          );
          await era.print(
            `『哦哦、姐姐终于变成了只想要肉棒的淫乱性奴了呀…这个样子真是可爱呢。』`,
          );
          await era.printAndWait(
            `${assi_name}和${player_name}窃窃私语了一阵。`,
          );
          await era.print(
            `『哼哼哼、姐姐，魔王大人这样说了、“你们姐妹俩愿意一起成为我的宠物的话，就赐予你们无上的快乐哦”。哎哎，我也要当宠物？一点问题都没有${heart(1)}』`,
          );
          await era.printAndWait(
            `${assi_name}红着脸，光着身子四肢着地趴在了${target_name}的身边。`,
          );
          await era.print(
            `『来吧，姐姐和我一起说，一起做吧。从现在起，我们姐妹俩就是魔王大人的淫乱母狗性奴，愿意一生侍奉魔王大人，请魔王大人用肉棒好好疼爱，调教我们吧，拜托了♪』`,
          );
          await era.printAndWait(
            `听着${assi_name}流利地在${player_name}面前念出了母狗性奴的誓言，${target_name}同样也趴下来，自豪地宣誓了。`,
          );
          await era.printAndWait(
            `「${target_name}我愿成为魔王大人的淫乱母狗。和母狗妹妹一起一生侍奉魔王大人、请魔王大人用肉棒奖赏我们吧${heart(1)}」`,
          );
          await era.printAndWait(
            `就这样，${target_name}和${assi_name}姐妹完全成为${player_name}的性奴宠物了………`,
          );
          kojo.简易助手_0 = 2;
        }
        return 1;
      } else if (kojo.简易助手_0 >= 2 && era0('flag:7') == 2) {
        // 二回目以降（CFLAG:202 >= 2）
        if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「啊啊…魔王大人…请给我今日的拥抱………${heart(1)}」`,
          );
          await era.print(`『我，我也要…魔王大人也请一起拥抱我…${heart(1)}』`);
          await era.printAndWait(
            `${assi_name}完全忘记了要调教姐姐的事，一同投入了${player_name}的怀抱中。`,
          );
          await era.printAndWait(
            `${player_name}苦笑着将姐妹两人同时抱进了怀里、那么今天要怎么“疼爱”她们呢？`,
          );
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「今天也请尽情地疼爱，调教我们这对性奴母狗姐妹吧…汪♪」`,
          );
          await era.print(
            `『魔王大人，请尽情地疼爱我们吧…啊、嗯啊啊…${heart(1)}』`,
          );
          await era.printAndWait(
            `${player_name}把手分别伸到了两人的下体，抚弄着已经淫液满溢的蜜穴。`,
          );
          await era.printAndWait(
            `如今两人除了和${player_name}交媾之外，已经什么事情都不会去想了………`,
          );
        }
        return 1;
      } else {
        // それ以外
        await era.print(`『姐姐早点坦率地面对自己的欲望吧……』`);
        await era.printAndWait(`「住、住手啊…离我远点！」`);
        await era.printAndWait(
          `手臂被${assi_name}紧紧抓住、${target_name}回忆起上次被妹妹调教的不堪回首的经历，嚎啕大哭起来。`,
        );
        await era.print(
          `『哈……花不了多久就会把你调教成随便碰碰哪里都会高潮的母猪啦♪』`,
        );
        await era.printAndWait(`「不要…不要不要不要啊…神啊，救救我………」`);
        return 1;
      }
    } else {
      // 口上のある助手が居ない場合（助手非玛奥，或无助手专属口上）
      await k11_kojo2(); // CALL K11_KOJO2
    }
  },
  TIER.NORMAL,
);

/**
 * @K11_KOJO2（:515-650）：调教开始口上的二回目以降（助手无专属口上时，或
 * 简易助手三阶都命中默认档时的通用分档）。按「崩坏 → 反抗刻印Lv3 →
 * 屈服刻印Lv0/1/2/3（Lv3 再按 CFLAG:202 是否见过妹妹分档）→ 淫乱（含
 * 魔族化分支）→ 爱慕（含魔族化分支）」取首个命中；FLAG:7 == 2（全量模式）
 * 才出声，逐档 RAND 二/三选一。
 */
async function k11_kojo2() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const kojo = chara(target).kojo;

  if (era0(`talent:${target}:9`) == 1 && era0('flag:7') == 2) {
    // 崩坏
    era.drawLine();
    await era.printAndWait(`「咕嘿……咕嘿嘿嘿………」`);
    await era.printAndWait(
      `已经无法期待精神崩溃的${target_name}会有正常的反应了………`,
    );
    return 1;
  } else if (era0(`mark:${target}:3`) == 3 && era0('flag:7') == 2) {
    // 反発刻印Lv3
    era.drawLine();
    await era.printAndWait(`「尽管来吧，别以为我不知道你想做什么。」`);
    await era.printAndWait(`${target_name}丝毫不掩盖自己的反抗心理………`);
    return 1;
  } else if (era0(`mark:${target}:2`) == 0 && era0('flag:7') == 2) {
    // 屈服刻印Lv0
    era.drawLine();
    await era.printAndWait(`「我不会怕的。」`);
    await era.printAndWait(`${target_name}面无表情，语气冷漠`);
    return 1;
  } else if (era0(`mark:${target}:2`) == 1 && era0('flag:7') == 2) {
    // 屈服刻印Lv1
    era.drawLine();
    await era.printAndWait(
      `「终……终于又来了，这张可憎的脸庞，又要打算对我做什么——放…放手！」`,
    );
    await era.printAndWait(
      `${target_name}被${player_name}一把抱了起来，无力反抗而不住地啜泣着………`,
    );
    return 1;
  } else if (era0(`mark:${target}:2`) == 2 && era0('flag:7') == 2) {
    // 屈服刻印Lv2
    era.drawLine();
    await era.printAndWait(`「不要啊…这种事情……真的不行…呜呜呜…」`);
    await era.printAndWait(
      `${target_name}的手腕被${player_name}扭住，似乎已经失去了反抗的力量………`,
    );
    return 1;
  } else if (
    era0(`mark:${target}:2`) == 3 &&
    era0(`talent:${target}:85`) == 0 &&
    era0(`talent:${target}:76`) == 0 &&
    era0('flag:7') == 2
  ) {
    // 屈服刻印Lv3＋爱慕/淫乱無し（按 CFLAG:202 是否见过妹妹分档）
    era.drawLine();
    if (kojo.简易助手_0 >= 1) {
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「原来你就是用这种方式……把我的妹妹……变成那个样子的吗……」`,
        );
        await era.printAndWait(
          `${target_name}带着急促的呼吸，凝视着${player_name}………`,
        );
      } else {
        await era.printAndWait(
          `「啊啊、妹妹她在……还在休息吗……那就不需要去打扰她了。调教什么的，让，让我来承受就可以了！」`,
        );
        await era.printAndWait(
          `${target_name}不知道的是，她所担心的妹妹在与${player_name}分开时一直靠着自慰在宣泄性欲………`,
        );
      }
    } else {
      if (rand_n(2) == 0) {
        await era.printAndWait(`「呜……呜呜……什么时候，才能让我和妹妹见面！」`);
        await era.printAndWait(
          `虽然内心依旧怀着对${player_name}的厌恶，但是${target_name}还是老老实实地躺在了床上……`,
        );
      } else {
        await era.printAndWait(
          `「让，让我来当你的对手好了！只要别对我妹妹出手，让我做什么都可以……但，但是别以为我会屈服的！」`,
        );
        await era.printAndWait(
          `${target_name}口头上还在逞强，却完全不知道自己的妹妹已经完全沦陷在${player_name}的调教下了……`,
        );
      }
    }
    return 1;
  } else if (era0(`talent:${target}:76`) == 1 && era0('flag:7') == 2) {
    // 淫乱（含魔族化分支）
    era.drawLine();
    if (era0(`talent:${target}:314`) == 9) {
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「终于想起来要来疼爱人家了吗？不过，才不要被抱过别的女孩子的手碰到呢，哼。」`,
        );
        await era.printAndWait(
          `${target_name}冷淡的态度让${player_name}正有些扫兴，但转眼间${target_name}却突然捧起了${player_name}的手，挨个地舔着手指。`,
        );
        await era.printAndWait(
          `「呣……呣……呣……好了，这样清洁过的话，就可以来碰人家了哦……来吧，魔王大人${heart(1)}」`,
        );
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「人家今天感觉很累……找别人啦！哎哎？不用这么用力的拉人家的手嘛……」`,
        );
        await era.printAndWait(
          `${player_name}拉着${target_name}的手臂，将对方强行拖进了自己的怀抱里，在耳边低语着“今天就想要你”。`,
        );
        await era.printAndWait(
          `「那，那就让我勉为其难代替妹妹来伺候魔王大人吧…${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「向您请安，魔王大人，今天也请调教我吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}三指着地跪坐着向${player_name}行礼。`,
        );
        await era.printAndWait(
          `「…不过，还请魔王大人不要太粗暴了……太痛的方式也不要……人家还是喜欢舒舒服服的爱爱呢${heart(1)}」`,
        );
      }
    } else {
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「终于想起来要来疼爱人家了吗？不过，才不要被抱过别的女孩子的手碰到呢，哼。」`,
        );
        await era.printAndWait(
          `${target_name}冷淡的态度让${player_name}正有些扫兴，但转眼间${target_name}却突然捧起了${player_name}的手，挨个地舔着手指。`,
        );
        await era.printAndWait(
          `「呣……呣……呣……好了，这样清洁过的话，就可以来碰人家了哦……来吧，魔王大人${heart(1)}」`,
        );
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「人家今天感觉很累……找别人啦！哎哎？不用这么用力的拉人家的手嘛……」`,
        );
        await era.printAndWait(
          `${player_name}拉着${target_name}的手臂，将对方强行拖进了自己的怀抱里，在耳边低语着“今天就想要你”。`,
        );
        await era.printAndWait(
          `「那，那就让我勉为其难代替妹妹来伺候魔王大人吧…${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「向您请安，魔王大人，今天也请调教我吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}三指着地跪坐着向${player_name}行礼。`,
        );
        await era.printAndWait(
          `「…不过，还请魔王大人不要太粗暴了……太痛的方式也不要……人家还是喜欢舒舒服服的爱爱呢${heart(1)}」`,
        );
      }
    }
    return 1;
  } else if (era0(`talent:${target}:85`) == 1 && era0('flag:7') == 2) {
    // 爱慕（含魔族化分支）
    era.drawLine();
    if (era0(`talent:${target}:314`) == 9) {
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「嘿嘿，很高兴魔王大人今天选择了我，来吧……尽情地调教人家吧」`,
        );
        await era.printAndWait(
          `${target_name}偎依在了${player_name}了的怀里，脸颊贴在${player_name}的胸前，一股淡淡的香味传到鼻子里。`,
        );
        await era.printAndWait(
          `「来之前已经好好的清洁过身体了，用的还是新的肥皂，魔王大人喜欢这个味道吗？」`,
        );
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「魔王大人最近还……经常调教我的妹妹吗……不行啦，她还只是个孩子啊……无论身体还是心理上都……」`,
        );
        await era.printAndWait(
          `${target_name}从后面抱住了${player_name}，用甜甜的语调说道。`,
        );
        await era.printAndWait(
          `「所以，还是让我来就侍奉魔王大人就可以了，怎么样的调教我都能接受的哦${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「就让我来侍奉魔王大人吧，妹妹就让她好好休息吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}握着${player_name}的手，有些出神地说道。`,
        );
        await era.printAndWait(
          `「啊啊……其，其实只是想从妹妹，还有其他勇者底下独占魔王大人而已啦${heart(1)}」`,
        );
      }
    } else {
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「嘿嘿，很高兴魔王大人今天选择了我，来吧……尽情地调教人家吧」`,
        );
        await era.printAndWait(
          `${target_name}偎依在了${player_name}了的怀里，脸颊贴在${player_name}的胸前，一股淡淡的香味传到鼻子里。`,
        );
        await era.printAndWait(
          `「来之前已经好好的清洁过身体了，用的还是新的肥皂，魔王大人喜欢这个味道吗？」`,
        );
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「魔王大人最近还……经常调教我的妹妹吗……不行啦，她还只是个孩子啊……无论身体还是心理上都……」`,
        );
        await era.printAndWait(
          `${target_name}从后面抱住了${player_name}，用甜甜的语调说道。`,
        );
        await era.printAndWait(
          `「所以，还是让我来就侍奉魔王大人就可以了，怎么样的调教我都能接受的哦${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「在我被魔王大人调教的时候，妹妹就能平安无事了呢……这样的话，就让我一直来做魔王大人的对手好了${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}握着${player_name}的手，神情羞涩地说道。`,
        );
        await era.printAndWait(
          `「啊啊……我独占你，其实也是为了其他勇者大人们好啊${heart(1)}」`,
        );
      }
    }
    return 1;
  }
  return 0; // 隐式（原作 ENDIF 后 RETURN 0，见文件头 :515-650）
}

/**
 * @EVENTEND（:651-748，普通档）：调教结束时的口上。
 *
 * 守卫（:651-659，含角色死亡 BASE:0 <= 0 跳过）：FLAG:7 <= 0 跳过、TALENT:171
 * != 1 跳过、角色已死亡跳过。
 * 无 → 屈服刻印Lv1以下+爱慕无 → 屈服刻印Lv2+爱慕无 → 屈服刻印Lv3+爱慕
 * 无 → 淫乱（按体力 500 分档）→ 爱慕（按体力 500 分档）」取首个命中，均
 * 判 CFLAG:202（是否见过妹妹）分支正文。
 */
on(
  'EVENTEND',
  async () => {
    const target = era_flag.target;
    const target_name = chara_callname(target); // %SAVESTR:TARGET%
    const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
    const kojo = chara(target).kojo;
    if (era0('flag:7') <= 0) {
      return 0;
    }
    if (era0(`talent:${target}:171`) != 1) {
      return 0;
    }
    if (era0(`base:${target}:0`) <= 0) {
      return 0;
    }

    if (era0(`talent:${target}:9`) == 1 && era0('flag:7') == 2) {
      // 崩坏
      era.drawLine();
      await era.printAndWait(`「咕嘿……咕嘿嘿嘿………」`);
      await era.printAndWait(`少女眼中理性的光芒已经不复存在………`);
      return 1;
    } else if (
      era0(`mark:${target}:3`) == 3 &&
      (era0(`talent:${target}:85`) == 0 || era0(`talent:${target}:76`) == 0)
    ) {
      // 反発刻印Lv3+爱慕无
      era.drawLine();
      if (kojo.简易助手_0 >= 1) {
        await era.printAndWait(`「我，我是绝对不会认输的……」`);
        await era.printAndWait(
          `虽然跪在${player_name}的面前，但是${target_name}丝毫不掩盖眼神里的反抗……`,
        );
      } else {
        await era.printAndWait(
          `「我是为了妹妹才忍受的这种事情的，但别以为我会原谅你！」`,
        );
        await era.printAndWait(
          `${target_name}边说着，边用目光怒视着${player_name}……`,
        );
      }
      return 1;
    } else if (
      era0(`mark:${target}:2`) <= 1 &&
      (era0(`talent:${target}:85`) == 0 || era0(`talent:${target}:76`) == 0)
    ) {
      // 屈服刻印Lv1以下+爱慕无
      era.drawLine();
      if (kojo.简易助手_0 >= 1) {
        await era.printAndWait(`「终于结，结束了…」`);
        await era.printAndWait(`${target_name}松了口气，稍微安心了一些。`);
      } else {
        await era.printAndWait(`「什，什么时候让我和妹妹见面…？」`);
        await era.printAndWait(
          `${target_name}满脸疲惫地问着你，但你完全无视了她的问题……`,
        );
      }
      return 1;
    } else if (
      era0(`mark:${target}:2`) == 2 &&
      (era0(`talent:${target}:85`) == 0 || era0(`talent:${target}:76`) == 0)
    ) {
      // 屈服刻印Lv2+爱慕无
      era.drawLine();
      if (kojo.简易助手_0 >= 1) {
        await era.printAndWait(
          `「这，这样就能满足魔王大人了吗……那，是不是可以放过我的妹妹了？」`,
        );
        await era.printAndWait(
          `${target_name}虽然被调教得疲惫不堪，但还是不顾自己的身体恳求着。`,
        );
        await era.printAndWait(`那副可怜的样子却只让你更加感觉身心愉悦………`);
      } else {
        await era.printAndWait(
          `「还，还要再听话一些……才能让我和妹妹见面吗？」`,
        );
        await era.printAndWait(
          `${target_name}一脸疲惫地问着你，但你完全无视了她的问题………`,
        );
      }
      return 1;
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      era0(`talent:${target}:85`) == 0
    ) {
      // 屈服刻印Lv3+爱慕无
      era.drawLine();
      await era.printAndWait(`「下，下次也请继续调教我吧？」`);
      await era.printAndWait(
        `已经完全变得驯服的${target_name}犹豫地挽住了你的手，虽然你承诺等她体力恢复后会再来，但是是否遵守约定则是你的自由。`,
      );
      await era.printAndWait(`「我会好好休息等着的……」`);
      return 1;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`base:${target}:0`) >= 500
    ) {
      // 淫乱(体力500以上)
      era.drawLine();
      await era.printAndWait(
        `「哎哎，才到这种程度就结束了吗……这就要回去了？」`,
      );
      await era.printAndWait(`${target_name}有些欲求不满地说道。`);
      await era.printAndWait(`「那，那下次一定……算了，当我没说吧……」`);
      return 1;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`base:${target}:0`) <= 500
    ) {
      // 淫乱(体力500未満)
      era.drawLine();
      await era.printAndWait(`「哈啊……哈啊……一本满足呢${heart(1)}」`);
      await era.printAndWait(
        `${target_name}挽着你的胳膊，露出了心满意足的笑容。`,
      );
      await era.printAndWait(`「下次……还想要更多的调教哦。」`);
      await era.printAndWait(`少女对欲望的坦率让你对自己的调教成果十分满意。`);
      return 1;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`base:${target}:0`) >= 500
    ) {
      // 爱慕(体力500以上)
      era.drawLine();
      await era.printAndWait(`「是，是对人家的身体厌倦了吗？」`);
      await era.printAndWait(`${target_name}带着不安的表情望着你。`);
      await era.printAndWait(
        `「不过……身为魔王大人的奴隶……被抛弃也不能有任何怨言……」`,
      );
      return 1;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`base:${target}:0`) <= 500
    ) {
      // 爱慕(体力500未満)
      era.drawLine();
      await era.printAndWait(
        `「哈啊……哈啊……能受到魔王大人的宠幸……太幸福了…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}一边笑着，一边用充满爱意的动人目光看着你。`,
      );
      await era.printAndWait(`「现在，魔王大人知道我比我妹妹要更好了吧…？」`);
      return 1;
    }
    return 0; // 隐式（原作 ENDIF 后 RETURN 0，见文件头 :651-748）
  },
  TIER.NORMAL,
);

/**
 * @KOJO_MESSAGE_COM_11（:749-10657）：指令口上全量（本轮先落头部守卫 +
 * SELECTCOM 0/1/2/3/5/6/7/8/9，其余编号留续轮）。
 *
 * 头部七道守卫（:754-778，源 1:1 顺序）：ASSI 非玛奥助手调教 → 跳过；口塞
 * （TEQUIP:45 且非口塞指令）→ 跳过；失神（TFLAG:899）→ 跳过；兽奸
 * （TEQUIP:89）→ 专用口上（DOG_KOJO_11）；死斗场（TEQUIP:55）
 * → 专用口上（COLOSSEUM_KOJO_11）；崩坏（TALENT:9）→ 跳过；
 * 触手（TEQUIP:90）→ 跳过。
 *
 * SELECTCOM 0（爱抚 CFLAG:301，:786-861）：初めて按「助手玛奥／屈服刻印
 * Lv2以上／それ以外」三分档写 1；二回目以降先分「助手玛奥」再各自按
 * 「淫乱→爱慕→（それ以外，仅助手玛奥臂无写点，源作原样）／屈服刻印
 * Lv3→Lv2→それ以外」写 6/5/4/3/2。
 *
 * SELECTCOM 1（舔阴 CFLAG:302，:866-947）：初めて按「处女/それ以外 ×
 * 助手玛奥/否」四分档写 1；二回目以降先分「助手玛奥」（内部淫乱→爱慕→
 * それ以外三选，それ以外无写点）再各自按「淫乱→爱慕→屈服刻印Lv3→
 * 反抗刻印Lv1以上（且屈服Lv2以下）→それ以外」写 5/4/3/2/2。
 *
 * SELECTCOM 2（肛门爱抚 CFLAG:303，:952-1043）：初めて按「助手玛奥／否」
 * 二分档写 1；二回目以降按润滑（P = PALAM:3 + UP:3 对 PALAMLV:2）叠加素质
 * 分档：「淫乱+润滑Lv2以上→淫乱+润滑Lv2未満→爱慕+润滑Lv2以上→爱慕+
 * 润滑Lv2未満→润滑Lv2以上+A感覚Lv3以上→それ以外」写 7/6/5/4/3/2，每档
 * 再按「助手玛奥/否」二分。
 *
 * SELECTCOM 3（自慰 CFLAG:304，:1048-1198）：初めて按「助手玛奥／否」二
 * 分档写 1；二回目以降先判「助手玛奥」——命中则走自身内部「淫乱（含处女
 * 子分档）→爱慕（含处女子分档）→それ以外（无写点）」三选，写 7/5/－；
 * 未命中则走扁平九支 ELSEIF 链（与助手玛奥支互斥、彼此独立判据，非
 * 「各档再按助手玛奥二分」的对称结构）：淫乱+处女→
 * 淫乱+自慰中毒Lv3以上（RAND:3 三选一台词）→淫乱+自慰中毒Lv3未満（RAND:2
 * 二选一）→爱慕+处女→爱慕+自慰中毒Lv3以上（RAND:3 三选一）→爱慕+自慰
 * 中毒Lv3未満（RAND:2 二选一）→屈服刻印Lv3+自慰中毒Lv1以上（RAND:2 二选
 * 一）→それ以外（RAND:2 二选一），写 9/8/7/6/5/4/3/2。ABL:31 自慰中毒经
 * `chara(target).train.自慰中毒` 门面读取。
 *
 * SELECTCOM 5（胸爱抚 CFLAG:306，:1203-1278）：初めて按「助手玛奥／否」
 * 二分档写 1；二回目以降先分「助手玛奥」再各自按「淫乱→爱慕→B感覚Lv3
 * 以上→それ以外」写 5/4/3/2，两支结构对称（与 SELECTCOM 0 同款）；助手
 * 玛奥支的淫乱台词有一处 RAND:2 裸真值三目（源无 == 0，预算 moan_word
 * 变量，同 SELECTCOM 1 的 lick_line_* 先例）。ABL:1 乳房感觉经
 * `chara(target).system.乳房感觉` 门面读取。
 *
 * SELECTCOM 6（接吻 CFLAG:307，:1283-1433）：三层结构。首吻专属分档
 * （CFLAG:307 == 0 && TFLAG:13 初吻与自我口上）按「淫乱且非助手陪玩／
 * 爱慕且非助手陪玩／助手玛奥（内部再按淫乱→爱慕→それ以外）／それ以外」
 * 四分档写 1，前两支另受 TEQUIP:89/90（兽奸/触手）排除，但头部守卫已把
 * 这两条已在头部分别路由兽奸专用口上或静默跳过，本分支执行时恒为 0
 * （判断冗余，保留无害）；普通初めて
 * （CFLAG:307 == 0 非首吻）按「助手玛奥（内部淫乱→爱慕→それ以外）／
 * 淫乱→爱慕→それ以外」写 1；二回目以降先分「助手玛奥」再各自按
 * 「淫乱→爱慕→従順Lv2以上→それ以外」写 5/4/3/2，两支结构对称（与
 * SELECTCOM 0/5 同款）。本支起 trace-refs 新锚改用 K10 逐行独立锚定法
 * （见文件头「锚鉴别力自查」）。
 *
 * SELECTCOM 7（自己扒开 CFLAG:308，:1438-1611）：不含首吻专属层。初めて
 * （CFLAG:308 == 0）按「助手玛奥（内部淫乱→爱慕→それ以外，无处女分档）／
 * 非助手玛奥（内部淫乱、爱慕两支各再按 TALENT:0 处女/非处女分岔文案，
 * それ以外无处女分档）」写 1；二回目以降先分「助手玛奥」再各自按「淫乱
 * →爱慕（淫乱/爱慕两支内层再按处女分岔文案，爱慕另嵌套露出癖Lv3以上
 * 文案分岔）→露出癖Lv3以上（内层再按处女分岔追加一句）→それ以外（内层
 * 再按处女分岔追加一句）」写 5/4/3/2，两支结构对称。
 *
 * SELECTCOM 8（指挿入 CFLAG:309，:1616-1692）：不含处女分岔。初めて
 * （CFLAG:309 == 0）按「助手玛奥／淫乱／屈服刻印Lv3+爱慕／それ以外」四选
 * 写 1；二回目以降先分「助手玛奥」再各自按「淫乱→爱慕＋屈服刻印Lv3→
 * 屈服刻印Lv3→それ以外」写 5/4/3/2，两支结构对称，MARK:2 屈服刻印经
 * `mark(2)` 局部帮手读取。
 *
 * SELECTCOM 9（舔肛 CFLAG:310，:1697-1776）：不含处女分岔、不含屈服刻印
 * 与爱慕的组合判据（与 SELECTCOM 8 的差异点）。初めて（CFLAG:310 == 0）
 * 按「助手玛奥／淫乱／爱慕／それ以外」四选写 1；二回目以降先分「助手
 * 玛奥」再各自按「淫乱→爱慕→屈服刻印Lv3→それ以外」写 5/4/3/2，两支
 * 结构对称。
 *
 * SELECTCOM 10（振动宝石 CFLAG:311，:1781-1853）：与 SELECTCOM 8 同构，含
 * 屈服刻印Lv3+爱慕的组合判据。初めて（CFLAG:311 == 0）按「助手玛奥／淫乱／
 * 屈服刻印Lv3+爱慕／それ以外」四选写 1；二回目以降先分「助手玛奥」再各自
 * 按「淫乱→爱慕＋屈服刻印Lv3→屈服刻印Lv3→それ以外」写 5/4/3/2，两支结构
 * 对称。
 *
 * SELECTCOM 11（壶虫 CFLAG:312／着脱 CFLAG:372，:1859-1987）：唯一同时含
 * TEQUIP:11 装备/脱着两态判定的分支。装备态（TEQUIP:11 真）初めて
 * （CFLAG:312 == 0）先按 TALENT:0 处女/非处女分岔文案，处女层再各按
 * 「助手玛奥（内部再按淫乱/爱慕/それ以外三选文案）／非助手玛奥・淫乱／
 * 爱慕／それ以外」写 1，非处女层同构但助手玛奥无进一步细分；二回目以降
 * 先分「助手玛奥」再各自按「淫乱→爱慕→ABL:2（私处感觉）Lv3以上→それ以外」
 * 写 5/4/3/2，两支结构对称。脱着态（TEQUIP:11 == 0）是独立三选一（淫乱/
 * 爱慕/それ以外），用另一枚 CFLAG:372 计数，写 3/2/1，无助手玛奥分档。
 *
 * SELECTCOM 12（振动杖 CFLAG:313，:1992-2066）：结构与 SELECTCOM 9 同构
 * （不含组合判据）。初めて（CFLAG:313 == 0）按「助手玛奥／淫乱／爱慕／
 * それ以外」四选写 1；二回目以降先分「助手玛奥」再各自按「淫乱→爱慕→
 * 屈服刻印Lv3→それ以外」写 5/4/3/2，两支结构对称。
 *
 * SELECTCOM 13（肛门虫 CFLAG:314／着脱 CFLAG:374，:2072-2191）：TEQUIP:13
 * 装备/脱着两态。已装（初めて，CFLAG:314 == 0）按「助手玛奥／淫乱／爱慕／
 * それ以外・ABL:3（肛门感觉）Lv3以上／それ以外・それ以外」五选写 1；二回目
 * 以降先分「助手玛奥」再各自按「淫乱＋ABL:3 Lv3以上→淫乱→爱慕＋ABL:3
 * Lv3以上→爱慕→ABL:3 Lv3以上→それ以外」六选写 6/6/5/4/3/2，两支结构对称。
 * 脱着态（TEQUIP:13 == 0）是独立四选一（淫乱/爱慕/ABL:3 Lv3以上/それ以外），
 * 用另一枚 CFLAG:374 计数，写 4/3/2/1，无助手玛奥分档。
 *
 * SELECTCOM 14（阴蒂夹 CFLAG:315／着脱 CFLAG:375，:2197-2278）：结构与
 * SELECTCOM 9/12 同构（不含组合判据）。初めて（CFLAG:315 == 0）按「助手
 * 玛奥／淫乱／爱慕／それ以外」四选写 1；二回目以降先分「助手玛奥」再各自
 * 按「淫乱→爱慕→それ以外」写 4/3/2，两支结构对称。脱着态（TEQUIP:14 ==
 * 0）是独立三选一（淫乱/爱慕/それ以外），用另一枚 CFLAG:375 计数，写
 * 3/2/1，无助手玛奥分档。
 *
 * SELECTCOM 15（乳头夹 CFLAG:316／着脱 CFLAG:376，:2284-2364）：结构与
 * SELECTCOM 9/12/14 同构（不含组合判据）。初めて（CFLAG:316 == 0）按「助手
 * 玛奥／淫乱／爱慕／それ以外」四选写 1；二回目以降先分「助手玛奥」再各自
 * 按「淫乱→爱慕→それ以外」写 4/3/2，两支结构对称。脱着态（TEQUIP:15 ==
 * 0）是独立三选一（淫乱/爱慕/それ以外），用另一枚 CFLAG:376 计数，写
 * 3/2/1，无助手玛奥分档。
 *
 * SELECTCOM 16（榨乳器 CFLAG:317／着脱 CFLAG:377，:2371-2460）：结构与
 * SELECTCOM 9/12 同构（不含组合判据）。初めて（TEQUIP:16 已装且 CFLAG:317
 * == 0）按「助手玛奥／淫乱／爱慕／それ以外」四选写 1；二回目以降先分「助手
 * 玛奥」再各自按「淫乱→爱慕→それ以外」写 4/3/2，助手玛奥+淫乱支下另有
 * RAND:2 二选一台词分岔（`rand_n(2)` 落地，不影响 CFLAG:317 写值）。脱着态
 * （TEQUIP:16 == 0）是独立三选一（淫乱/爱慕/それ以外），用另一枚 CFLAG:377
 * 计数，写 3/2/1，无助手玛奥分档。
 *
 * SELECTCOM 17（オナホール CFLAG:318／着脱 CFLAG:378，:2464-2519）在原作里
 * 整段以 `;` 注释掉（连 `IF SELECTCOM == 17` 本身也被注释），SELECTCOM 数字
 * 因此从未被判定为真，属于死代码——PRINTFORMW 台词也全部留空未填。原作从未
 * 执行过此分支，本移植按证据不落地任何行为，直接跳过、不占用真实指令号。
 *
 * SELECTCOM 19（肛珠 CFLAG:320／脱着 CFLAG:379，:2521-2644）：结构与
 * SELECTCOM 13 同构（TEQUIP:19 装备/脱着两态，脱着时用独立 CFLAG:379
 * 计数）。初めて（TEQUIP:19 已装且 CFLAG:320 == 0）按「助手玛奥／淫乱／
 * 爱慕／それ以外」简单四选写 1（不含 A感覚 组合判据）；二回目以降先分
 * 「助手玛奥」再各自按「淫乱＋A感覚Lv3以上→淫乱→爱慕＋A感覚Lv3以上→
 * 爱慕→A感覚Lv3以上→それ以外」六选一档写 7/6/5/4/3/2，助手玛奥/非助手
 * 玛奥两支结构对称。脱着态（TEQUIP:19 == 0）是独立四选一（淫乱/爱慕/
 * A感覚Lv3以上/それ以外），用另一枚 CFLAG:379 计数，写 4/3/2/1，无助手
 * 玛奥分档。
 * @param {(n: number) => number} [rand] RAND:N 随机源（[0, n) 整数；缺省
 *   均匀随机，测试注入定值序）
 * @returns {Promise<number>} 0（RETURN 0；TRYCALLFORM 不读返回值）
 */
async function kojo_message_com_11(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const player = era_flag.player;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(player); // %SAVESTR:PLAYER%
  const master_name = chara_callname(MASTER); // %SAVESTR:MASTER%
  const assi_name = era_flag.assi >= 0 ? chara_callname(era_flag.assi) : ''; // %SAVESTR:ASSI%
  const kojo = chara(target).kojo;
  const mark = (i) => era.get(`mark:${target}:${i}`) || 0;
  const assi_mao =
    era_flag.assi > 0 && era_flag.assiplay && era_flag.assi === 17;

  // 助手マオ以外が調教した時に口上をスキップする
  if (era_flag.assi > 0 && era_flag.assiplay && era_flag.assi !== 17) {
    return 0;
  }
  // ボールギャグ着用時には口上をスキップする（SELECTCOM==45 自己说话不算）
  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 45) {
    return 0;
  }
  // 失神時には口上をスキップする
  if (game.train.失神) {
    return 0;
  }
  // 獣姦プレイ中は専用口上
  if (era.get(`tequip:${target}:89`)) {
    return dog_kojo_11(rand_n);
  }
  // コロシアム中は専用口上
  if (era.get(`tequip:${target}:55`)) {
    return colosseum_kojo_11(rand_n);
  }
  // 崩坏した場合は口上をスキップする
  if (era.get(`talent:${target}:9`) === 1) {
    return 0;
  }
  // 触手調教中は口上をスキップする
  if (era.get(`tequip:${target}:90`)) {
    return 0;
  }

  // IF SELECTCOM == 0（爱抚 CFLAG:301）
  if (era_flag.selectcom === 0) {
    // 初めて（CFLAG:301 == 0）
    if (kojo.爱抚 === 0) {
      if (assi_mao) {
        await era.printAndWait(`『姐姐的身材，真好，真漂亮…♪』`);
        await era.printAndWait(`「不行…不行啊…啊啊！」`);
      } else if (mark(2) >= 2) {
        // 屈服刻印Lv2以上
        await era.printAndWait(`「啊啊……再这样摸的话……！」`);
        await era.printAndWait(
          `${target_name}的身体被手指来回抚弄，拼命忍耐着………`,
        );
      } else {
        // それ以外
        await era.printAndWait(`「又，又来了……真是令人讨厌……！」`);
        await era.printAndWait(`${target_name}充满厌恶地扭动着身体躲避着………`);
      }
      kojo.爱抚 = 1;
      return 0;
    }

    // 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `『姐姐终于坦率地面对自己的欲望了呢，我真为你高兴${heart(1)}』`,
        );
        await era.printAndWait(
          `${player_name}用手指驾轻就熟地爱抚着${target_name}全身上下。`,
        );
        await era.printAndWait(
          `「嗯啊啊…因为你的手都摸在敏感点上了…啊啊…继续${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}在爱抚下身子一扭一扭地享受着。`);
        kojo.爱抚 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(`『姐姐、见到魔王大人，心情很愉快吧。』`);
        await era.printAndWait(
          `${player_name}用手指驾轻就熟地爱抚着${target_name}全身上下。`,
        );
        await era.printAndWait(
          `「啊啊…快，快停手啦，不然姐姐生气了…嗯啊啊…真是的…！」`,
        );
        await era.printAndWait(
          `${target_name}在爱抚下身子一扭一扭，又是躲避又是享受着。`,
        );
        await era.printAndWait(
          `『不想被魔王大人看见这副色情的样子吗？明明超级想要被魔王大人疼爱嘛！』`,
        );
        kojo.爱抚 = 5;
      } else {
        // それ以外（CFLAG:301 不推进——源作原样，助手玛奥臂唯一无写点档）
        await era.printAndWait(`『呀呀，姐姐的身体再放松一点嘛…♪』`);
        await era.printAndWait(
          `${player_name}用手指驾轻就熟地爱抚着${target_name}全身上下。`,
        );
        await era.printAndWait(
          `「快住手啊……我们是亲姐妹啊…呜呜呜！这样怎么对得起死去的母亲啊！」`,
        );
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「啊啊嗯…不用这么温柔啦…嗯啊…摸我的时候再……再粗暴一点…${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}边娇喘着，边淫荡地摇摆着身体。`);
      await era.printAndWait(
        `「啊，啊哈……${heart(1)} 就是这样！啊啊…好…好舒服${heart(1)}」`,
      );
      kojo.爱抚 = 6;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「啊啊…魔王大人的爱抚……${target_name}好舒服…好幸福…」`,
      );
      await era.printAndWait(
        `${target_name}温柔地搂住了${player_name}的脖颈，娇喘着享受着爱抚。`,
      );
      await era.printAndWait(
        `「魔……魔王大人……我爱你……我永远是你的人…${heart(1)}」`,
      );
      kojo.爱抚 = 5;
    } else if (mark(2) === 3 && (kojo.爱抚 <= 3 || game.kojo.口上开关 === 2)) {
      // 屈服刻印Lv3
      await era.printAndWait(`「嗯啊…哈…为什么会这么舒服的……啊啊」`);
      await era.printAndWait(
        `${target_name}腰身扭动着，敏感的身体在${player_name}的爱抚下已经有了感觉。`,
      );
      await era.printAndWait(`「啊啊，我的…身体……嗯啊啊！」`);
      kojo.爱抚 = 4;
    } else if (mark(2) === 2 && (kojo.爱抚 <= 2 || game.kojo.口上开关 === 2)) {
      // 屈服刻印Lv2
      await era.printAndWait(`「哈啊…哈啊……身体好像稍微习惯了……」`);
      await era.printAndWait(`「嗯啊啊…为…为什么会有奇，奇怪的感觉！」`);
      kojo.爱抚 = 3;
    } else if (mark(2) <= 1 && (kojo.爱抚 <= 1 || game.kojo.口上开关 === 2)) {
      // それ以外
      await era.printAndWait(`「一，一点舒服的感觉都没有…嗯啊…啊啊！」`);
      if (rand_n(2)) {
        await era.printAndWait(`「别，别碰我…嗯啊啊！」`);
      }
      kojo.爱抚 = 2;
    }
    return 0; // 隐式（原作 RETURN 0）
  }

  // IF SELECTCOM == 1（舔阴 CFLAG:302）
  if (era_flag.selectcom === 1) {
    const virgin = era.get(`talent:${target}:0`) === 1;

    // 初めて（CFLAG:302 == 0）
    if (kojo.舔阴 === 0) {
      if (virgin) {
        if (assi_mao) {
          await era.printAndWait(
            `『啊呀、姐姐的蜜穴真好看…咦，还没有被魔王疼爱过这里吗？』`,
          );
          await era.printAndWait(`「住手……停下…快停下啊…哈啊…啊啊啊！」`);
          await era.printAndWait(`『不好好回答的话，我就继续舔啦？ 啦啦啦♪』`);
        } else {
          await era.printAndWait(
            `「住手……停下…快停下啊…那里是小便的地方啊！」`,
          );
          await era.printAndWait(
            `处女的纯洁，甘甜的气味涌入${player_name}的鼻子中，一阵发痒。`,
          );
          await era.printAndWait(
            `${target_name}羞耻万分，拼命扭动着身体想要躲避。而${player_name}秉承着“性奴的蜜穴必须以最严格的方式调教”的使命感、按着${target_name}的腰，从阴蒂到阴唇的每一处都仔细地舔舐着………`,
          );
        }
      } else if (assi_mao) {
        await era.printAndWait(
          `『啊呀、姐姐的蜜穴真好看…哟哟，好像已经被侵犯过了？』`,
        );
        await era.printAndWait(
          `「啊啊……快住手啊……那里已经……已经变脏了！不能舔那里啊……！」`,
        );
      } else {
        await era.printAndWait(
          `「住，住手啊！不要啊！那里……那里是已经被玷污的肮脏地方啊！」`,
        );
        await era.printAndWait(
          `${target_name}羞耻万分，拼命扭动着身体想要躲避。而${player_name}秉承着“性奴的蜜穴必须以最严格的方式调教”的使命感、按着${target_name}的腰，从阴蒂到阴唇的每一处都仔细地舔舐着………`,
        );
      }
      kojo.舔阴 = 1;
      return 0;
    }

    // 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.舔阴 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `『哎呀，姐姐的蜜穴和豆豆都已经变得好敏感了呢…这么一舔就全湿透了……嘻嘻♪』`,
        );
        await era.printAndWait(
          `「啊啊……嗯啊……是，是啊，姐姐的小穴已经……这么淫荡了呢……啊啊，就是这里${heart(1)}」`,
        );
        const lick_line_1 = rand_n(2)
          ? '舔姐姐的这里，我也觉得很舒服哦'
          : '啊哈，姐姐感觉很舒服吧♪';
        await era.printAndWait(`『${lick_line_1}${heart(1)}』`);
        kojo.舔阴 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.舔阴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(
          `『哎呀，姐姐的这里，真是美味呢…呼呼…怎么魔王大人的味道也混在里面啊？』`,
        );
        await era.printAndWait(
          `「嗯啊…哪…哪有这种事……舌头…太深入了…啊啊啊！」`,
        );
        const lick_line_2 = rand_n(2)
          ? '姐姐的爱液都从蜜穴里流进妹妹嘴里了哦。'
          : '姐姐已经有感觉了呀，很舒服吧♪';
        await era.printAndWait(`『${lick_line_2} 我继续开动了哦♪』`);
        await era.printAndWait(
          `${target_name}在${player_name}的舌尖下，不住地娇喘着………`,
        );
        kojo.舔阴 = 4;
      } else {
        // それ以外（CFLAG:302 不推进——源作原样，助手玛奥臂唯一无写点档）
        const lick_line_3 = rand_n(2)
          ? '姐姐感觉舒服吗？'
          : '姐姐觉得我舔得舒服吗？♪';
        await era.printAndWait(`『${lick_line_3} 不回答的话我就再深入了哦♪』`);
        await era.printAndWait(`「不，不要啊、快停止…停止啊…嗯啊啊啊！」`);
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.舔阴 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「啊啦啦……魔王大人居然像狗一样舔着我的蜜穴……小母狗${target_name}真是三生有幸啊……嗯啊啊……太舒服了……」`,
      );
      await era.printAndWait(
        `${target_name}主动岔开了双腿，蜜穴和阴蒂在${player_name}舌头灵巧地舔弄下，已经有了明显的快感。`,
      );
      await era.printAndWait(
        `「嗯啊啊…再……魔王大人……再深入一点${heart(1)} 啊啊…要，要去了……嗯啊啊${heart(1)}」`,
      );
      kojo.舔阴 = 5;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.舔阴 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「啊啊…嗯啊啊…不要啦，魔王大人…那，那里好脏的…啊啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `虽然这么说着，${target_name}却不自觉地用双手将${player_name}继续按在自己张开的双腿之间。`,
      );
      await era.printAndWait(
        `「被……被魔王大人舔得……好有感觉，好舒服，啊啊啊${heart(1)}」`,
      );
      kojo.舔阴 = 4;
    } else if (mark(2) === 3 && (kojo.舔阴 <= 2 || game.kojo.口上开关 === 2)) {
      // 屈服刻印Lv3
      await era.printAndWait(`「嗯啊…呜呜…不…不要啊……嗯啊啊」`);
      await era.printAndWait(
        `${target_name}任由${player_name}舔舐着自己的蜜穴和阴蒂，已经完全放弃了抵抗，且似乎已经有了微微的快感。`,
      );
      await era.printAndWait(
        `只能拼命忍耐着，蜜穴时不时因为快意微微颤动起来………`,
      );
      kojo.舔阴 = 3;
    } else if (
      mark(3) >= 1 &&
      mark(2) <= 2 &&
      (kojo.舔阴 <= 1 || game.kojo.口上开关 === 2)
    ) {
      // 反抗刻印Lv1以上（且屈服刻印Lv2以下）
      await era.printAndWait(
        `「居……居然像狗一样舔着下面……你这个人……一点尊严都不要的吗……嗯啊啊」`,
      );
      await era.printAndWait(
        `${target_name}拼命扭着身子逃避着，但是双腿却被${player_name}强行分开，脸埋在其中舔舐着蜜穴和阴蒂`,
      );
      kojo.舔阴 = 2;
    } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外（屈服刻印Lv3未満）
      await era.printAndWait(
        `「说，说了那里是尿尿的地方啊！肮脏！不洁！不要舔啊啊啊！」`,
      );
      await era.printAndWait(
        `${target_name}拼命扭动着身体想要逃避，却被${player_name}紧紧按着分开的双腿，借着唾液的润滑，在蜜穴和阴蒂处来回舔舐着………`,
      );
      kojo.舔阴 = 2;
    }
    return 0; // 隐式（原作 RETURN 0）
  }

  // IF SELECTCOM == 2（肛门爱抚 CFLAG:303）
  if (era_flag.selectcom === 2) {
    // 初めて（CFLAG:303 == 0）
    if (kojo.肛门爱抚 === 0) {
      if (assi_mao) {
        await era.printAndWait(
          `『魔王大人特别喜欢调教我们的肛门哦，让妹妹来先帮姐姐的屁股做好准备吧♪』`,
        );
        await era.printAndWait(`「不，不要啊！那个部位……太脏了啊啊！」`);
        await era.printAndWait(
          `${target_name}的肛门别${player_name}毫不留情地用手指玩弄着，发出了一阵阵悲鸣………`,
        );
      } else {
        await era.printAndWait(
          `「你……你在碰哪里！？不要啊，那种地方不可以的！」`,
        );
        await era.printAndWait(
          `${target_name}的肛门别${player_name}毫不留情地用手指玩弄着，发出了一阵阵悲鸣………`,
        );
      }
      kojo.肛门爱抚 = 1; // CFLAG:TARGET:303 = 1（TARGET 即 target，二段三段等价）
      return 0;
    }

    // 二回目以降
    const p = chara(target).train.润滑 + chara(target).train.润滑增量; // P = PALAM:3 + UP:3
    if (
      era.get(`talent:${target}:76`) === 1 &&
      p >= PALAMLV[2] &&
      (kojo.肛门爱抚 <= 6 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱+润滑Lv2以上
      if (assi_mao) {
        await era.printAndWait(
          `『哇哇，姐姐的肛门已经变得超色情了呢♪　魔王大人你看，姐姐的这里已经是名器了呢${heart(1)}』`,
        );
        await era.printAndWait(
          `「嗯啊啊…要…要去了……屁股${heart(1)} 继…继续，不要停${heart(1)}」`,
        );
        await era.printAndWait(
          `『好像已经舒服到听不清我在说什么了。姐姐被玩弄肛门时的表情，一脸幸福啊${heart(1)}』`,
        );
        await era.printAndWait(
          `${player_name}舔着嘴唇，继续用手指抽插，玩弄着${target_name}的肛门………`,
        );
      } else {
        await era.printAndWait(
          `「哈啊！啊啊${heart(1)} 好…好舒服，屁股好舒服…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}流着口水，娇喘着，肛门一张一合地享受着被${player_name}的手指玩弄肛门的连绵快感。`,
        );
        await era.printAndWait(
          `「嗯啊啊……屁……屁股…光是被手指……就弄得快要去了${heart(1)}」`,
        );
      }
      kojo.肛门爱抚 = 7;
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      p < PALAMLV[2] &&
      (kojo.肛门爱抚 <= 5 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱+润滑Lv2未満
      if (assi_mao) {
        await era.printAndWait(
          `『姐姐、屁股还没湿透就把手指插进去，感觉是不是很痛呀？』`,
        );
        await era.printAndWait(
          `「呃啊啊…明明就是故，故意的！就不能稍微温柔一点嘛？」`,
        );
        await era.printAndWait(
          `『不过姐姐的肛门还是已经感觉到快感了对吧？看，都开始一张一合的了♪』`,
        );
        await era.printAndWait(
          `${target_name}一边抱怨着，一边却无比享受着${player_name}对肛门的玩弄和连绵的快感………`,
        );
      } else {
        await era.printAndWait(
          `「真，真是的！屁股都还没湿透就这么把手指插进来……啊别…别停下呀…嗯啊啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}的肛门很快被爱液浸透，开始因为连绵的快感而一张一合着………`,
        );
      }
      kojo.肛门爱抚 = 6;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      p >= PALAMLV[2] &&
      (kojo.肛门爱抚 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕+润滑Lv2以上
      if (assi_mao) {
        await era.printAndWait(
          `『哎呀，姐姐的肛门已经这么敏感地张开了呀…看来已经被魔王大人好好调教，疼爱过了呢…』`,
        );
        await era.printAndWait(
          `「嗯啊啊…哈啊！因……因为姐姐的肛门，是属于魔王大人的…玩具啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}不住地娇喘着，感受着被${player_name}玩弄肛门带来的连绵快感。真是一对要好的姐妹呢………`,
        );
      } else {
        await era.printAndWait(
          `「嗯啊啊……屁股……好舒服，好快乐${heart(1)}… ${target_name}是魔王大人的肛门性奴……请……请继续调教，侵犯${target_name}的肛门吧，魔王大人！」`,
        );
        await era.printAndWait(
          `${target_name}尽情享受着肛门的快感，摇晃着光洁的臀部诱惑着${player_name}………`,
        );
      }
      kojo.肛门爱抚 = 5;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      p < PALAMLV[2] &&
      (kojo.肛门爱抚 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕+润滑Lv2未満
      if (assi_mao) {
        await era.printAndWait(
          `『嘿嘿嘿…姐姐的肛门已经被魔王大人充分调教过了的样子呢♪』`,
        );
        await era.printAndWait(`「等……等等！润滑……还不够…嗯啊…啊啊啊！」`);
        await era.printAndWait(
          `${player_name}用舌头稍微做了一下润湿，然后又继续开始用手指玩弄，抽插着${target_name}的肛门………`,
        );
      } else {
        await era.printAndWait(`「啊啊…魔，魔王大人……请稍微……再温柔一点！」`);
        await era.printAndWait(
          `${target_name}发出痛苦交杂着喜悦的呻吟，感受着${player_name}对肛门的爱抚………`,
        );
      }
      kojo.肛门爱抚 = 4;
    } else if (
      p >= PALAMLV[2] &&
      chara(target).system.肛门感觉 >= 3 &&
      (kojo.肛门爱抚 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 润滑Lv2以上+A感覚Lv3以上
      if (assi_mao) {
        await era.printAndWait(
          `『哎呀呀、姐姐的肛门，这么摸一下就舒服地张开了，还一扭一扭地吸着妹妹的手指呢。魔王大人快看呀♪』`,
        );
        await era.printAndWait(
          `「讨…讨厌啊啊！停手，快停手啊！嗯啊啊…才没有感到…舒服！」`,
        );
        await era.printAndWait(
          `${player_name}玩弄着${target_name}已经被充分调教开发的肛门，连绵的快感让${target_name}忍不住开始娇喘……`,
        );
        await era.printAndWait(
          `『看起来姐姐很快就可以当上魔王大人的肛门性奴了呢♪』`,
        );
      } else {
        await era.printAndWait(
          `「停…停手啊！不…不可以这样…哈啊……嗯啊啊……屁股……为什么这么舒服！」`,
        );
        await era.printAndWait(
          `${player_name}玩弄着${target_name}已经被充分调教开发的肛门，连绵的快感让${target_name}忍不住开始娇喘……`,
        );
      }
      kojo.肛门爱抚 = 3;
    } else if (kojo.首次耻情Lv2 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外（爱慕無し、润滑Lv2未満、A感覚Lv3未満；CFLAG:223 首次耻情Lv2）
      if (assi_mao) {
        await era.printAndWait(
          `『还是太紧了呢，不过没关系，我会把姐姐的这里开发成名器的♪』`,
        );
        await era.printAndWait(`「住，住手啊、好痛…真的好痛啊啊！」`);
        await era.printAndWait(
          `${player_name}舔着舌头，坏笑着继续用手指来回抠弄着${target_name}的肛门………`,
        );
      } else {
        await era.printAndWait(`「住手！好痛啊…求求你！」`);
        await era.printAndWait(
          `${target_name}泪流满面地忍耐着${player_name}对肛门的爱抚调教………`,
        );
      }
      kojo.肛门爱抚 = 2;
    }
    return 0; // 隐式（原作 RETURN 0）
  }

  // IF SELECTCOM == 3（自慰 CFLAG:304）
  if (era_flag.selectcom === 3) {
    if (kojo.自慰 === 0) {
      // 初めて（CFLAG:304 == 0）
      if (assi_mao) {
        await era.printAndWait(
          `『姐姐自慰要更认真一点啊，还要告诉我你以前在家都是想着谁，怎么摸的。我可是每次都听见了的哦。』`,
        );
        await era.printAndWait(
          `「不，不要说那样的谎话！才没，没有那种事！呜呜呜……」`,
        );
        await era.printAndWait(
          `${target_name}在妹妹的命令下，继续屈辱地自慰着………`,
        );
      } else {
        await era.printAndWait(
          `「开，开什么玩笑…为什么要我做……这种事情…呜呜呜…」`,
        );
        await era.printAndWait(
          `${target_name}在${player_name}的命令下不得不开始自慰、屈辱的泪水从脸颊纵流而下。`,
        );
        await era.printAndWait(`「什么…？还，还要继续？呜呜呜……谁来救救我？」`);
      }
      kojo.自慰 = 1;
      return 0;
    }

    // 二回目以降
    if (assi_mao) {
      // 助手玛奥：内部淫乱/爱慕/それ以外三选（それ以外无写点，与非助手支各自独立分档）
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.自慰 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        if (era.get(`talent:${target}:0`) === 1) {
          // 处女
          await era.printAndWait(
            `『啊咧？姐姐的身体都这么色情了，居然还是处女？…』`,
          );
          await era.printAndWait(`「那，那有什么不好的…恩恩啊…哈啊…嗯啊啊…」`);
          await era.printAndWait(
            `『爱液流了这么多出来，难道正在幻想着被魔王的肉棒狠狠地疼爱吗？』`,
          );
          await era.printAndWait(
            `「笨蛋！不要说出来嘛…嗯啊…啊啊啊啊，魔王大人，${target_name}要去了${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `『姐姐这么激烈地同时自慰前后两边，好厉害啊…』`,
          );
          await era.printAndWait(
            `「嗯啊啊…啊啊…在魔王大人和${player_name}的注视下…手淫…比平时…更加有快感啊${heart(1)}」`,
          );
          await era.printAndWait(
            `『啊哈、我已经看出来了…姐姐是个喜欢自慰时被人看着的变态啊♪』`,
          );
          await era.printAndWait(
            `「是啊…姐姐是变态色情狂…啊啊…嗯啊啊……好好欣赏姐姐被人看着自慰到高潮的样子吧${heart(1)}」`,
          );
        }
        kojo.自慰 = 7;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.自慰 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        if (era.get(`talent:${target}:0`) === 1) {
          // 处女
          await era.print(
            `『咦，姐姐居然还是处女？难道魔王大人不喜欢姐姐的这里吗？』`,
          );
          await era.printAndWait(
            `「哪……哪有那样的事……是魔王大人珍…珍惜姐姐的处女之身…所以才……嗯啊啊」`,
          );
          await era.printAndWait(
            `${target_name}岔开双腿，弓着腰，在妹妹的命令下进行着自慰，脸上的表情带着些许屈辱，又不可自拔地沉浸在快感中。`,
          );
          await era.print(
            `「我说的没错吧魔王大人…但是…啊恩…什么时候…才能…真正疼爱我呢${heart(1)}」`,
          );
          await era.printAndWait(
            `（『魔王大人，真正的原因是什么呢？』）${player_name}悄悄和你耳语着。`,
          );
        } else {
          await era.printAndWait(
            `『哎呀呀，姐姐这么热情地自慰着，是希望一会儿能够得到魔王大人的疼爱吗？』`,
          );
          await era.printAndWait(`「啊…啊……这不是你…你命令的吗……嗯啊啊！」`);
          await era.printAndWait(
            `『啊呀，我这一说，你就湿成这样了、爱液都喷到我身上了。你一定是边想着蜜穴被魔王大人狠狠地侵犯边自慰吧。姐姐真的完全变成魔王大人的性奴了呢…』`,
          );
          await era.printAndWait(
            `${target_name}被${player_name}的话羞得脸红到了耳根，然而自慰的动作却一刻也没有放缓………`,
          );
        }
        kojo.自慰 = 5;
      } else {
        // それ以外
        await era.print(
          `『哎呀呀，姐姐自慰的样子真下流，看得人家都兴奋起来了啊…♪』`,
        );
        await era.printAndWait(`「不要看，不要看啊…太羞耻了…嗯啊……啊啊！」`);
        await era.print(
          `『姐姐再敢把腿夹起来还说这种话，我就让魔王大人把所有部下都叫过来一起来围观姐姐自慰了哦♪』`,
        );
        await era.printAndWait(
          `「不，不要！对不起…对不起…原谅姐姐吧…求求你…！」`,
        );
        await era.printAndWait(
          `${target_name}不敢忤逆${player_name}的命令，泪流满面地继续再度张开双腿，在妹妹面前自慰着………`,
        ); // （それ以外无 CFLAG:304 推进，源作原样）
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      era.get(`talent:${target}:0`) === 1 &&
      (kojo.自慰 <= 8 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱＋处女
      await era.printAndWait(
        `「魔王大人为什么还不肯要了我的处子身呢，嫌弃我吗？…要是太过分的话，我会做什么可就不知道了哦？」`,
      );
      await era.printAndWait(
        `「嗯啊…哈啊…为什么……嗯呀啊${heart(1)} 总是让我自己玩自己！嗯啊啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}故意张开双腿，挑逗似的在${player_name}动作夸张地自慰着………`,
      );
      kojo.自慰 = 9;
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      chara(target).train.自慰中毒 >= 3 &&
      (kojo.自慰 <= 7 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱＋自慰中毒Lv3以上
      if (rand_n(3) === 0) {
        await era.printAndWait(
          `「嗯啊啊${heart(1)} 自慰…真是世界上最棒的事了…啊哈啊…好想…被更多人视奸啊${heart(1)}」`,
        );
        await era.printAndWait(
          `已经完全沦为自慰狂的${target_name}在${player_name}面前弓着身子，挺起腰不断忘我地自慰着前后两穴。`,
        );
        await era.printAndWait(
          `「啊啊嗯${heart(1)} 淫液要喷出来了…啊啊……嗯啊啊啊${heart(1)}」`,
        );
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `「哎呀哎呀…要人家这个姿势来自慰…真，真是变态呢${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}按着${player_name}的命令后仰着弓起腰身、分开双腿，在${player_name}的注视下开始自慰。`,
        );
        await era.printAndWait(
          `「吖吖${heart(1)}…哈啊…啊啊啊…感觉好棒…嗯啊啊…要去了${heart(1)} 嗯啊啊啊${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「啊哈啊啊…这么想要看我手淫吗…啊啊${heart(1)} 真是受不了你啊…嗯啊啊…哈啊…啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}当着${player_name}面，两只手同时忘我地自慰着蜜穴和肛门。爱液飞洒到了床上，地板上、空气中弥散着淫靡的味道。`,
        );
        await era.printAndWait(
          `「现在看的满意了吗…恩恩啊${heart(1)} 啊啊快感更强了${heart(1)} 要去了…舒服得要去了${heart(1)}」`,
        );
      }
      kojo.自慰 = 8;
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      chara(target).train.自慰中毒 < 3 &&
      (kojo.自慰 <= 6 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱＋自慰中毒Lv3未満
      if (rand_n(2) === 0) {
        await era.printAndWait(
          `「真是的……明明知道……自慰什么的根本满足不了我的欲火、还让我做这种……嗯啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}露出委屈的表情，在${player_name}的命令下，开始自慰。`,
        );
        await era.printAndWait(
          `「啊哈啊…已经…全湿透了${heart(1)} 为什么魔王大人不肯亲自${heart(1)}…真是的…嗯啊啊！」`,
        );
      } else {
        await era.printAndWait(
          `「嗯啊啊……就让我把宝贵的高潮这样浪费在自慰中……魔王大人真是残忍呢…嗯啊啊……哈啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的自慰完全无法满足欲火、却又无可奈何，只能又爱又恨地瞪着${player_name}。`,
        );
        await era.printAndWait(
          `「不过话说回来…这样看着你的脸…哈啊…好像更有快感一些…啊恩啊啊${heart(1)}」`,
        );
      }
      kojo.自慰 = 7;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      era.get(`talent:${target}:0`) === 1 &&
      (kojo.自慰 <= 5 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕＋处女
      await era.printAndWait(
        `「哈啊…哈啊…魔王大人……什么时候才，才会要走我的处子身…啊嗯啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}在${player_name}的面前，挑逗地张开双腿，持续自慰着。`,
      );
      await era.printAndWait(`（明明人家早就已经准备好了…呜！）`);
      await era.printAndWait(
        `尽管已经知道了${target_name}的想法、${player_name}还是尽情欣赏，享受着${target_name}的自慰秀………`,
      );
      kojo.自慰 = 6;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      chara(target).train.自慰中毒 >= 3 &&
      (kojo.自慰 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕＋自慰中毒Lv3以上
      if (rand_n(3) === 0) {
        await era.printAndWait(
          `「嗯啊啊${heart(1)}…哈啊…实在…太害羞了…但是手指…就是停不下来…啊啊啊魔王大人…人家这个姿势可以吗${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的口中轻吐着娇喘，一边不住地自慰着………`,
        );
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `「${target_name}好…高兴在魔王大人命令下自慰啊${heart(1)} 嗯啊啊…嗯啊…好舒服啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}在${player_name}炽热的目光注视下，忘我地自慰着………`,
        );
      } else {
        await era.printAndWait(
          `「嗯啊…嗯啊啊…哈啊${heart(1)} 手指…完全停不下来…不，不许看、不许看…人家要……要去了${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}沉浸在自慰带来的连绵快感中，连口水都流了出来………`,
        );
      }
      kojo.自慰 = 5;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      chara(target).train.自慰中毒 < 3 &&
      (kojo.自慰 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕＋自慰中毒Lv3未満
      if (rand_n(2) === 0) {
        await era.printAndWait(
          `「如果是魔王大人的命令的话…！再羞耻的事我也，我也愿意…哈啊…嗯啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}脸红耳赤地用手指爱抚着自己得下体、在${player_name}的注视下慢慢展开身体，开始自慰………`,
        );
      } else {
        await era.printAndWait(
          `「太，太羞耻了…但如果魔王大人想要看的话…嗯啊…哈啊……嗯啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}双眼因为羞耻而微微湿润，在${player_name}的炽热目光下开始了自慰………`,
        );
      }
      kojo.自慰 = 4;
    } else if (
      era.get(`mark:${target}:2`) === 3 &&
      chara(target).train.自慰中毒 >= 1 &&
      (kojo.自慰 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3+自慰中毒Lv1以上
      if (rand_n(2) === 0) {
        await era.printAndWait(
          `「讨厌，不要看啊…不要看我的脸啊…嗯啊…嗯啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}屈辱地躲避着${player_name}的视线，自慰着下体的手指却不自觉地动得更激烈了………`,
        );
      } else {
        await era.printAndWait(
          `「哈啊…哈啊…可…可以停下来了吗？…啊啊，我知道了，我会继续的，我会继续的！嗯啊 啊」`,
        );
        await era.printAndWait(
          `${target_name}屈服于${player_name}的命令，持续进行着自慰，却微微浮现了沉浸期其间的表情………`,
        );
      }
      kojo.自慰 = 3;
    } else if (kojo.自慰 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外（爱慕無し、自慰中毒Lv1未満）
      if (rand_n(2) === 0) {
        await era.printAndWait(`「为什么…要我做这样羞耻的事…嗯啊…哈啊」`);
      } else {
        await era.printAndWait(`「饶了我吧，求求你了…！」`);
      }
      await era.printAndWait(
        `${target_name}的脸一直红到了耳根，在极度的羞愧中开始自慰………`,
      );
      kojo.自慰 = 2;
    }
    return 0; // 隐式（原作 RETURN 0）
  }

  // IF SELECTCOM == 5（胸爱抚 CFLAG:306）
  if (era_flag.selectcom === 5) {
    if (kojo.胸爱抚 === 0) {
      // 初めて（CFLAG:306 == 0）
      if (assi_mao) {
        await era.printAndWait(
          `『哇，姐姐的胸部比以前在村子里的时候更大了呢？』`,
        );
        await era.printAndWait(
          `「才，才没有那种事呢！不要揉得那么用力！会痛的啊啊！」`,
        );
        await era.printAndWait(
          `『呵呵，手感都不一样了，分明在撒谎！撒谎就要惩罚♪』`,
        );
        await era.printAndWait(
          `粉红色的乳头被妹妹用力拧着，${target_name}不住地哀鸣………`,
        );
      } else {
        await era.printAndWait(`「啊啊！不要揉得那么用力啊…好痛，好痛！」`);
        await era.printAndWait(
          `${target_name}哀鸣着想从${player_name}魔掌下逃脱、却被${player_name}紧紧压住，丰满双乳的调教还在继续………`,
        );
      }
      kojo.胸爱抚 = 1;
      return 0;
    }

    // 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `『姐姐的乳头轻轻摸舔一下就变得这么色情了、啊啊真好，我也想有这样色情的乳头让魔王大人玩弄${heart(1)}』`,
        );
        await era.printAndWait(
          `${player_name}边笑着边继续玩弄着姐姐高耸饱满的双峰和因为快感而挺立着的乳头。感受着从乳头传来的连绵的快意，${target_name}从喉咙底发出一阵阵淫乱不堪的声音。。`,
        );
        await era.printAndWait(
          `「啊哈…嗯啊啊啊${heart(1)} 姐姐跟你说${heart(1)} 多让魔王大人调教你的胸部，很快妹妹的乳头就会变得和姐姐一样色情了${heart(1)}」`,
        );
        await era.printAndWait(
          `『啊哈太好了♪　然后就可以姐妹两人并排挺起色情的胸部，让魔王大人用乳环和链子把我们的乳头穿起来，牵着我们在地上爬${heart(1)}』`,
        );
        kojo.胸爱抚 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(
          `『哎呀，姐姐乳房好像经常被魔王大人玩到高潮哟♪　咯咯咯』`,
        );
        await era.printAndWait(
          `${player_name}露出坏笑，对着${target_name}挺起的乳头又摸又舔，还含进嘴里吸吮着。`,
        );
        await era.printAndWait(
          `「呃啊啊！就…就是这样…姐姐的胸部…是属于魔王大人…性玩具${heart(1)}」`,
        );
        await era.printAndWait(
          `『那这次，就由妹妹来让姐姐的乳房高潮吧${heart(1)} 嘻嘻嘻，我继续享用姐姐的乳头了${heart(1)}』`,
        );
        await era.printAndWait(
          `「啊啊啊，别…别让…魔王大人看见……姐姐这个样子！拜…托了！嗯啊啊${heart(1)}」`,
        );
        kojo.胸爱抚 = 4;
      } else if (
        chara(target).system.乳房感觉 >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // B感覚Lv3以上
        await era.printAndWait(
          `『哎呀呀，姐姐的胸部变得好厉害，乳头挺得这么直…』`,
        );
        await era.printAndWait(
          `${player_name}用手指捏着${target_name}两边的乳头，不断搓柔着，不时含进嘴里吸吮，听着${target_name}因为快感而止不住地娇喘着。`,
        );
        await era.printAndWait(
          `「哈啊…嗯啊啊…不要再玩…啊啊…姐姐的乳头了…不然姐姐要…哈啊…要生气了！」`,
        );
        await era.printAndWait(
          `『原来姐姐的弱点是乳头哦，再不用害怕姐姐生气了♪』`,
        );
        kojo.胸爱抚 = 3;
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外（爱慕無し、B感覚Lv3未満）
        await era.printAndWait(`『哎呀，姐姐不喜欢被我这样玩弄胸部吗？』`);
        await era.printAndWait(
          `${target_name}被${player_name}肆意，甚至是恶意地玩弄着双乳和乳头，又无能反抗，只能拼命忍耐着。`,
        );
        await era.printAndWait(
          `「被…被你这样玩，一点舒服的感觉……都没有！啊啊啊！」`,
        );
        kojo.胸爱抚 = 2;
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「我的胸部会变得这么色情…哈啊${heart(1)} 都，都是你的责任${heart(1)} 哈啊，嗯啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}被彻底开发，调教的双乳被${player_name}捏在手中肆意玩弄着，舌尖和指尖来回拨弄着挺立的乳头。`,
      );
      await era.printAndWait(
        `「嗯啊啊…魔王大人${heart(1)} 请再…粗暴一点…欺负我这对淫荡的巨乳和乳头吧${heart(1)}」`,
      );
      const moan_word = rand_n(2) ? '继续、继续' : '去了、要去了';
      await era.printAndWait(
        `${target_name}似乎已经被快感弄得完全无法思考了，只是一味地浪叫着，口水不住地从嘴角流出「${moan_word}」………`,
      );
      kojo.胸爱抚 = 5;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「魔王大人…哈啊…这个样子…真是像爱撒娇的孩子一样！嗯啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}抱着正把头埋在自己丰满双峰之间，吸吮着乳头的${player_name}，发出一阵阵幸福的娇喘，`,
      );
      await era.printAndWait(
        `「嗯啊啊…嗯啊${heart(1)} 继续…魔王大人…哈啊嗯呃${heart(1)}」`,
      );
      kojo.胸爱抚 = 4;
    } else if (
      chara(target).system.乳房感觉 >= 3 &&
      (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // B感覚Lv3以上
      await era.printAndWait(
        `「嗯啊啊…不，不要这么用力的玩我的…胸部…乳头才不是，不是因为舒服才挺起来的、你，你可不要误会了……嗯呜呜」`,
      );
      await era.printAndWait(
        `${target_name}已经被充分调教过的乳房很快就有了快感，只能紧抓着床单，拼命遏制自己的呻吟。`,
      );
      await era.printAndWait(`「好，好难为情…呼哈…快…快停下啦…嗯啊啊！」`);
      kojo.胸爱抚 = 3;
    } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外（爱慕無し、B感覚Lv3未満）
      await era.printAndWait(`「无论你怎么弄，我，我也不会感觉舒服的…啊呒」`);
      await era.printAndWait(
        `面对${player_name}对自己乳房的爱抚、${target_name}只是双眼紧闭，咬紧牙关，默默忍受着………`,
      );
      kojo.胸爱抚 = 2;
    }
    return 0; // 隐式（原作 RETURN 0）
  }

  // IF SELECTCOM == 6（接吻 CFLAG:307）
  if (era_flag.selectcom === 6) {
    // ファーストキス（CFLAG:307 == 0 && TFLAG:13）
    if (kojo.接吻 === 0 && game.train.初吻与自我口上) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        !era_flag.assiplay &&
        chara(target).train.兽奸 === 0 &&
        chara(target).train.触手 === 0
      ) {
        // 淫乱かつ主人
        await era.printAndWait(
          `「呣呣…呣呒…魔王大人…魔王大人…呣啾啾${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一脸沉醉的表情，与${player_name}激吻着，舌头互相缠绕，交换、品尝着彼此的唾液。`,
        );
        await era.printAndWait(
          `「呣呣…呣…我的初吻${heart(1)} 尝起来味道怎么样啊…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的双瞳里透着情欲的光芒，凝视着${player_name}，又投入新一轮激吻中………`,
        );
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        !era_flag.assiplay &&
        chara(target).train.兽奸 === 0 &&
        chara(target).train.触手 === 0
      ) {
        // 爱慕かつ主人
        await era.printAndWait(`「呣呣呣呒…魔王大人？？呣啾啾${heart(1)}」`);
        await era.printAndWait(
          `${target_name}的初吻被${player_name}夺走时，露出了惊讶的表情，但这惊讶随即变成了惊喜，然后是沉醉。`,
        );
        await era.printAndWait(
          `「呣呣…啾啾${heart(1)} 我的初吻属于您了魔王大人…嗯哈…呣呣${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}带着如梦似幻的陶醉表情，继续品尝着${player_name}的吻………`,
        );
      } else if (assi_mao) {
        // それ以外 → 助手玛奥
        if (era.get(`talent:${target}:76`) === 1) {
          // 淫乱
          await era.printAndWait(`『嘿嘿嘿，和姐姐亲亲了${heart(1)}呣呣呣呒』`);
          await era.printAndWait(`「呣呣呣、接吻舒服吧？这可是我的初吻哦…」`);
          await era.printAndWait(
            `『是真的吗姐姐，那我可太高兴了♪ 呣呣呣…姐姐的舌头…伸进来了…呣呣呣呒♪』`,
          );
          await era.printAndWait(
            `${target_name}和${player_name}无比淫靡的深吻着，边互相爱抚，对两人亲生姐妹的身份没有丝毫顾忌。`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 爱慕
          await era.printAndWait(`『嘿嘿嘿，和姐姐亲亲了${heart(1)}呣呣呣呒』`);
          await era.printAndWait(
            `「本来是想把初吻奉献给魔王大人的………（不过${player_name}的话也不是不行）」`,
          );
          await era.printAndWait(
            `『啊？姐姐还没和魔王大人……？为什么呢，姐姐？』`,
          );
          await era.printAndWait(`「不，没什么。我们继续吧…呣呣呣…呣啾啾♪」`);
          await era.printAndWait(
            `${target_name}与${player_name}热烈地拥吻着，对两人亲生姐妹的身份没有丝毫顾忌。`,
          );
        } else {
          // それ以外
          await era.printAndWait(
            `${player_name}刚刚把自己的嘴唇从${target_name}的唇上挪开，却猛然发现${target_name}正在不住地哭泣着。`,
          );
          await era.printAndWait(
            `『啊咧…姐姐为什么在哭呢？难道…那是姐姐的初吻？哎呀呀，初吻给亲妹妹不是更好吗，姐妹相爱最棒了♪』`,
          );
          await era.printAndWait(`「这…这种不伦的事情…呜呜呜…」`);
          await era.printAndWait(
            `${player_name}笑着安慰着她，但${target_name}只是哭得更伤心了………`,
          );
        }
      } else {
        // それ以外 → 非助手玛奥
        await era.printAndWait(`「我，我的…初吻…呜呜…呜呜呜…」`);
        await era.printAndWait(
          `${target_name}正像一个纯洁到不经人事的乡下姑娘一样，为自己失去的初吻而潸然泪下，………`,
        );
      }
      kojo.接吻 = 1;
      return 0;
    }

    // （調教では）初めて（CFLAG:307 == 0，非首吻）
    if (kojo.接吻 === 0) {
      if (assi_mao) {
        if (era.get(`talent:${target}:76`) === 1) {
          // 淫乱
          await era.printAndWait(`『最喜欢姐姐了♪』`);
          await era.printAndWait(
            `「啊啊，我也最喜欢妹妹你了…呣呣呣…啾啾…舌头，再伸进来一些${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}与${player_name}无比热烈地拥吻着，吸吮着彼此交缠的舌头。像这样的事情，在她们还生活在村子里时，恐怕连想都是不敢想的吧。`,
          );
          await era.printAndWait(
            `直到嘴唇依依不舍地分开，流淌在两人的嘴角上的唾液还粘连在一起………`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 爱慕
          await era.printAndWait(
            `「不，不要啦，${player_name}…这种事…一点都不想做」`,
          );
          await era.printAndWait(
            `『就是要，就是要。因为${player_name}我……最喜欢姐姐了♪』`,
          );
          await era.printAndWait(
            `”最喜欢姐姐了”这句以前${player_name}经常用来调戏${target_name}的话，在这种别样的场合，却异常的有效。`,
          );
          await era.printAndWait(
            `${target_name}眼中的抗拒立即消失得无影无踪，和${player_name}，唇对着唇开始亲吻，彼此舌头伸入对方的嘴中，相互交缠着。`,
          );
          await era.printAndWait(`『呣呣呣…啾啾…姐姐，姐姐，最喜欢你了。』`);
        } else {
          // それ以外
          await era.printAndWait(`「不，不要啊…我们，是姐妹啊…！」`);
          await era.printAndWait(
            `『姐姐的口里说不要，但是嘴唇可没在反抗哦…呣呣呣…啾啾♪』`,
          );
          await era.printAndWait(
            `${target_name}的手被${player_name}紧紧抓住，按在床上。如果是以前的，${target_name}大概轻易就可以挣脱，但如今……`,
          );
          await era.printAndWait(
            `但是一心牵挂着${player_name}的${target_name}却没办法逃走，更无力反抗，任由${player_name}摆布着。`,
          );
        }
      } else if (era.get(`talent:${target}:76`) === 1) {
        // 淫乱
        await era.printAndWait(
          `「呣呣呣…呣呒…魔王大人嘴里的味道…真好${heart(1)}呣呣呣…」`,
        );
        await era.printAndWait(
          `${target_name}带着一脸沉醉的表情与${player_name}激吻着，交缠的舌头分享，品尝着彼此的唾液。`,
        );
        await era.printAndWait(
          `「哈啊…呣呒…魔王大人${heart(1)} 再吻得的激烈一点好吗…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}注视着${player_name}的双瞳里透着情欲的光芒，抓着${player_name}的手伸向自己的股间………`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        // 爱慕
        await era.printAndWait(
          `「唔？！呣呣呒…魔，魔王大人…呣啾啾${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被${player_name}吻上的时候，露出了些许惊讶的表情，在反应过来后就立即沉醉于期间，回以更热烈的吻。`,
        );
        await era.printAndWait(
          `「呣啾…呣啾${heart(1)} 魔王大人…我的唇…味道好吗${heart(1)}呣呣」`,
        );
        await era.printAndWait(
          `${target_name}怀着梦幻般的愉悦心情，与${player_name}继续接吻着………`,
        );
      } else {
        // それ以外
        await era.printAndWait(`「不，不要啊！放过我吧，求求你……呣呣呣…呣呒」`);
        await era.printAndWait(
          `${target_name}被${player_name}按住双手的手腕，强行吻在了唇上。`,
        );
        await era.printAndWait(`${target_name}的眼泪已经夺眶而出………`);
      }
      kojo.接吻 = 1;
      return 0;
    }

    // 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.接吻 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `「呣呣…舌头进来了、呣呣呣…跟姐姐亲亲舒服吗？${heart(1)}」`,
        );
        await era.printAndWait(
          `『啊啊，姐姐的接吻技术…太棒了！嗯呣…呣呣呣${heart(1)} 姐姐的舌头…${player_name}还想要更多…呣啾啾${heart(1)}』`,
        );
        await era.printAndWait(
          `${target_name}和${player_name}无比淫靡的深吻着，边互相爱抚身体，对两人亲姐妹的关系没有丝毫顾忌。`,
        );
        kojo.接吻 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.接吻 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(`『姐姐，好喜欢你…最喜欢了♪』`);
        await era.printAndWait(
          `「啊啊、真的吗？…呣呣呣…呣嗯…姐姐好高兴${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}与${player_name}热烈地拥吻着，对两人亲生姐妹的身份没有丝毫顾忌。`,
        );
        kojo.接吻 = 4;
      } else if (
        chara(target).system.顺从 >= 2 &&
        (kojo.接吻 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 従順Lv2以上
        await era.printAndWait(`『来、姐姐，来亲亲♪』`);
        await era.printAndWait(
          `「啊啊…好，好的，但这是最后一次了…呣呣呣…呣嗯…！」`,
        );
        await era.printAndWait(
          `${target_name}与${player_name}手牵着手，亲吻着………`,
        );
        kojo.接吻 = 3;
      } else if (kojo.接吻 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.printAndWait(`『姐姐、来接吻吧？』`);
        await era.printAndWait(`「不行啊、我们是姐妹啊…不可以——呣呣呣！」`);
        kojo.接吻 = 2;
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.接吻 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「吻我…魔王大人…呣呣…呣呒……再激烈一点…我想品尝魔王大人的，呣呣…呣呒，味道${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}带着陶醉的表情与${player_name}激吻着，舌头交缠，呼吸灼热。`,
      );
      await era.printAndWait(
        `「呣呣…呣啾啾${heart(1)}光是，呣呣，被魔王大人吻着…呣呣呣${heart(1)} 就好像要高潮了一样…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}用炽烈的眼神与${player_name}四目相望，拉着${player_name}的手伸向自己已经湿透的股间………`,
      );
      kojo.接吻 = 5;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.接吻 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(`「唔——呣呣呒…魔，魔王大人…呣啾啾${heart(1)}」`);
      await era.printAndWait(
        `${target_name}被${player_name}吻着，露出全然陶醉的幸福表情。`,
      );
      await era.printAndWait(
        `「呣呣…呣啾啾${heart(1)} 魔王大人的吻…好喜欢…最喜欢了！呣呣…呣呒…想要，还想要${heart(1)}」`,
      );
      await era.printAndWait(
        `在${target_name}的恳求下，${player_name}继续深吻着她………`,
      );
      kojo.接吻 = 4;
    } else if (
      chara(target).system.顺从 >= 2 &&
      (kojo.接吻 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 従順Lv2以上
      await era.printAndWait(`「呣呣…呣嗯…哈啊，终，终于结束了吗…」`);
      await era.printAndWait(
        `看到${target_name}在擦拭着自己的嘴唇，${player_name}抓着了${target_name}的双手，再次强吻了上去。`,
      );
      await era.printAndWait(`「呣呣…呣呒…！又……又来…呣恩恩…」`);
      kojo.接吻 = 3;
    } else if (kojo.接吻 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(`「这样…就行了吧？可以…放我走了吗？」`);
      await era.printAndWait(
        `${target_name}用手背擦拭着自己的嘴唇，眼角流出了屈辱的泪水………`,
      );
      kojo.接吻 = 2;
    }
    return 0; // 隐式（原作 RETURN 0）
  }

  // IF SELECTCOM == 7（自己扒开 CFLAG:308）
  if (era_flag.selectcom === 7) {
    const virgin = era.get(`talent:${target}:0`) === 1;
    // 初めて（CFLAG:308 == 0）
    if (kojo.自己扒开 === 0) {
      if (assi_mao) {
        if (era.get(`talent:${target}:76`) === 1) {
          // 淫乱
          await era.printAndWait(
            `「啊啊…还是有点害羞呢${heart(1)} 为什么老是要这么欺负姐姐呢${heart(1)}」`,
          );
          await era.printAndWait(
            `『哎呀，姐姐别找借口啦♪明明自己都湿成这个样子了』`,
          );
          await era.printAndWait(
            `${target_name}遵循着妹妹的命令，摆出了淫荡的姿势和动作。`,
          );
          await era.printAndWait(
            `完全堕入淫乱深渊的${target_name}为了取悦${player_name}，毫无廉耻地展示着蜜穴，并且自己也沉浸于别样的心理快感中。`,
          );
          await era.printAndWait(
            `两人已经再也变不回以前那种纯洁的姐妹关系了，但现在的她们，某种程度上说也是无比的幸福吧………？`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 爱慕
          await era.printAndWait(`「啊啊…这样真是…太羞耻、饶了姐姐吧…」`);
          await era.printAndWait(
            `『不行啊、我都说的清清楚楚了，不是这个姿势♪』`,
          );
          await era.printAndWait(
            `${target_name}只能遵循着妹妹的命令，摆出了无比羞耻的姿势和动作。`,
          );
          await era.printAndWait(
            `已经听到过很多次，妹妹这样充满恶意地对姐姐下达着淫乱的命令了。`,
          );
          await era.printAndWait(
            `两人已经再也变不回以前那种纯洁的姐妹关系了，但现在的她们，某种程度上说也是无比地幸福吧………？`,
          );
        } else {
          // それ以外（爱慕無し）
          await era.printAndWait(
            `『哎呀，姐姐，在人家面前摆出这么淫荡的姿势，不觉得害羞吗？』`,
          );
          await era.printAndWait(
            `「当，当然会觉得羞耻了…但是，但是不是你命令我这么做的吗…呜呜呜」`,
          );
          await era.printAndWait(
            `『哎呀，原来姐姐是只要被命令，就什么淫荡下流的事情都可以做的变态呀。姐姐以前的形象，在我心里彻底破灭了呢。』`,
          );
          await era.printAndWait(
            `「不是的、不是这样的…不要再欺负姐姐了，求求你………」`,
          );
          await era.printAndWait(
            `${player_name}恶意的话语，让${target_name}忍不住泪流满面………`,
          );
        }
      } else if (era.get(`talent:${target}:76`) === 1) {
        // 淫乱
        await era.printAndWait(
          `「哈啊、请吧，魔王大人，尽情欣赏少女最私密的地方吧………${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}扬起眉毛，献媚般地向${player_name}展示着自己的蜜穴深处。`,
        );
        if (virgin) {
          await era.printAndWait(
            `「这个处女膜是为魔王大人保留的，但是也别让我等太久了……否则${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}舔着嘴唇，用手指一张一合地抚弄着蜜穴，诱惑着${player_name}………`,
          );
        } else {
          await era.printAndWait(
            `「${target_name}的这里…现在最想要的，是魔王大人的精液哟…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}露出淫靡的笑容，用语言挑逗，诱惑着${player_name}………`,
          );
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        // 爱慕
        await era.printAndWait(
          `「啊，啊啊…请，请尽情看吧，魔王大人………${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}边害羞地微微喘息着、边向${player_name}展示着自己的蜜穴及更深处。`,
        );
        if (virgin) {
          await era.printAndWait(
            `「我，我的处女膜…漂亮吗…？啊啊啊，我居然说了这么害羞的话！」`,
          );
          await era.printAndWait(
            `${target_name}变得脸红耳赤，羞愧地摇着头躲避着魔王的视线………`,
          );
        } else {
          await era.printAndWait(
            `「${target_name}的这里…是属于魔王大人专用的…啊啊啊…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}羞得脸红耳赤，撑开蜜穴的手指也松走了………`,
          );
        }
      } else {
        // それ以外（爱慕無し）
        await era.printAndWait(`「这种，这种事情实在太…羞耻…呜呜呜！」`);
        await era.printAndWait(
          `${target_name}擦了擦满脸的泪水，然后在${player_name}的命令下继续展示着蜜穴。`,
        );
        await era.printAndWait(`「呜呜呜……给我记住、总有一天，总有一天………」`);
      }
      kojo.自己扒开 = 1;
      return 0;
    }

    // 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.自己扒开 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        if (virgin) {
          await era.printAndWait(
            `「哈啊，能看见吗，${player_name}，看见姐姐淫荡的蜜穴了吗？」`,
          );
          await era.printAndWait(`『恩恩，姐姐的处女膜光鲜亮丽，真好看！』`);
          await era.printAndWait(
            `「谢谢夸奖，但其实更想尽早让魔王大人把它弄坏呢…呵呵呵呵${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}和${player_name}一齐意味深长地望着你，眼中满含秋波………`,
          );
        } else {
          await era.printAndWait(
            `「哈啊、能看见吗，${player_name}，看见姐姐淫荡的蜜穴了吗？嘻嘻嘻${heart(1)}」`,
          );
          await era.printAndWait(
            `『啊呀…姐姐这里已经湿得乱七八糟了，已经在想象着被魔王大人侵犯了吗…真是太色情了♪』`,
          );
          await era.printAndWait(
            `「这样够一目了然了吗${heart(1)} 要不要姐姐再换个姿势给你看！还是想看姐姐的肛门呢？」`,
          );
          await era.printAndWait(
            `${target_name}和${player_name}无比和谐地讨论着下流的话题………`,
          );
        }
        kojo.自己扒开 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.自己扒开 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        if (virgin) {
          await era.printAndWait(
            `『姐姐怎么还是处女呀、快点把这里奉献给魔王大人吧。大人可是很温柔的哦？』`,
          );
          await era.printAndWait(`「不，不要公然地说…这么羞耻的事啦…」`);
          await era.printAndWait(
            `『哎呀、这样的话，那我就替魔王大人收下啦？怎样？稍等片刻，我准备一下……哎哎哎，姐姐别把腿合上呀，真是的。』`,
          );
          await era.printAndWait(`「不要开玩笑啦！」`);
          if (chara(target).system.露出癖 >= 3) {
            await era.printAndWait(
              `${target_name}被${player_name}强行分开大腿，蜜穴在妹妹调戏下已经爱液满溢………`,
            );
          } else {
            await era.printAndWait(
              `${target_name}被${player_name}强行分开大腿，捂着脸发出羞愧的声音………`,
            );
          }
        } else {
          await era.printAndWait(`「太，太羞耻了！这个样子…呜呜呜…」`);
          await era.printAndWait(
            `『不行啊、我都说的清清楚楚了，不是这个姿势♪♪』`,
          );
          await era.printAndWait(
            `${target_name}只能遵循着妹妹的命令，摆出更加屈辱的姿势和动作。`,
          );
          if (chara(target).system.露出癖 >= 3) {
            await era.printAndWait(
              `『明明很享受被我和魔王大人视奸嘛，看，着淫荡的蜜穴都湿成这个样子了！说谎是不行的哦姐姐♪』`,
            );
            await era.printAndWait(`「不，不是的…不是这样的………！」`);
            await era.printAndWait(
              `妹妹的话让${target_name}羞愧得脸红到了耳根、但异样的心理快感却让蜜穴却不住地分泌出更多爱液………`,
            );
          } else {
            await era.printAndWait(`『被人这样看着，是不是有感觉了，姐姐？』`);
            await era.printAndWait(`「求求你，放过姐姐吧…呜呜呜」`);
          }
        }
        kojo.自己扒开 = 4;
      } else if (
        chara(target).system.露出癖 >= 3 &&
        (kojo.自己扒开 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 露出癖Lv3以上
        await era.printAndWait(`「啊啊…这个姿势…能全部看清楚了吗？」`);
        await era.printAndWait(
          `『哎呀，姐姐已经露出上瘾了呢！都不觉得羞耻的吗？』`,
        );
        await era.printAndWait(`「当，当然会感觉羞耻啊…要不是你的命令………」`);
        await era.printAndWait(
          `『说谎是不行的呢，姐姐！看着你的样子我就明白你现在的感觉啦♪』`,
        );
        await era.printAndWait(
          `妹妹的话让${target_name}羞愧得脸红到了耳根、但异样的心理快感却让蜜穴却不住地分泌出更多爱液………`,
        );
        if (virgin) {
          await era.printAndWait(
            `『姐姐的蜜穴好色情，好有诱惑力啊。魔王大人居然还没有侵犯过姐姐这里。如果我是男人的话一定早就………』`,
          );
          await era.printAndWait(`「在，再说什么呢啊你！」`);
        }
        kojo.自己扒开 = 3;
      } else if (kojo.自己扒开 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外（爱慕無し、露出癖Lv3未満）
        await era.printAndWait(`「这样…这样可以了吗…可以放过我了吧…呜呜」`);
        await era.printAndWait(`『哎呀呀，还是想看姐姐做些更羞耻的动作呢♪』`);
        await era.printAndWait(
          `${player_name}看着${target_name}万分羞愧的样子，笑的嘴巴都歪了。本是亲姐妹的两人，现在的关系已经完全不正常了。`,
        );
        if (virgin) {
          await era.printAndWait(
            `『姐姐的处女膜还在呀、怎么还没有献给魔王大人呢？』`,
          );
          await era.printAndWait(`「不要，不要啊……！」`);
        }
        kojo.自己扒开 = 2;
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.自己扒开 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(`「哈啊…这个姿势就能全部看清了吧………${heart(1)}」`);
      await era.printAndWait(
        `${target_name}带着献媚的表情，向${player_name}展示着自己的蜜穴。`,
      );
      if (virgin) {
        await era.printAndWait(
          `「这个处女膜是为魔王大人保留的，但是也别让我等太久哦${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}舔着嘴唇，又换了个更诱人的姿势，用手将蜜穴一张一合地诱惑着${player_name}。`,
        );
        await era.printAndWait(
          `清晰可见得处女膜和满溢的淫液都在表达着对${player_name}的阴茎的渴望………`,
        );
      } else {
        await era.printAndWait(
          `「${target_name}的淫荡蜜穴，现在最想要的…是魔王大人的阴茎和精液哦${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}露出淫媚的笑容，换了个更诱人的姿势，诱惑着${player_name}………`,
        );
      }
      kojo.自己扒开 = 5;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.自己扒开 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(`「魔，魔王大人，请…看个够吧…${heart(1)}」`);
      await era.printAndWait(
        `${target_name}边害羞的喘息着，边向${player_name}展示着自己的蜜穴。`,
      );
      if (virgin) {
        await era.printAndWait(
          `「我的处女膜，魔王大人觉得漂，漂亮吗？啊啊啊，说这种话好羞耻！」`,
        );
        await era.printAndWait(
          `${target_name}羞得涨红了脸，别过脸躲避着${player_name}的眼光……`,
        );
      } else {
        await era.printAndWait(
          `「${target_name}的这里…是属于魔王大人专用的…啊啊啊…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}羞得脸红耳赤，撑开蜜穴的手指也松走了………`,
        );
      }
      kojo.自己扒开 = 4;
    } else if (
      chara(target).system.露出癖 >= 3 &&
      (kojo.自己扒开 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 露出癖Lv3以上
      await era.printAndWait(
        `「羞，羞死人了…这个姿势…实在太羞耻了！可是…为什么手指…就是挪不开…哈啊」`,
      );
      await era.printAndWait(`${target_name}红着脸，口中吐出了甘甜的娇喘。`);
      await era.printAndWait(
        `「啊……哈啊…这，这样就行了吧…什么，什么！还要继续吗？！」`,
      );
      if (virgin) {
        await era.printAndWait(`「好，好吧…我继续，继续！」`);
        await era.printAndWait(
          `${target_name}再次向${player_name}分开自己的蜜穴，这次将完好的处女膜也展示出来了………`,
        );
      }
      kojo.自己扒开 = 3;
    } else if (kojo.自己扒开 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外（爱慕無し、露出癖Lv3未満）
      await era.printAndWait(`「人家的这里…到底有什么好看的…要看那么多遍！」`);
      await era.printAndWait(`对于、咬着嘴唇对着${player_name}怒目而视。`);
      if (virgin) {
        await era.printAndWait(
          `「处女膜也看见了吧？…这样好了吧…你还想要怎么样！」`,
        );
      }
      kojo.自己扒开 = 2;
    }
    return 0; // 隐式（原作 RETURN 0）
  }

  // IF SELECTCOM == 8（指挿入 CFLAG:309）
  if (era_flag.selectcom === 8) {
    // 初めて（CFLAG:309 == 0）
    if (kojo.插入手指 === 0) {
      if (assi_mao) {
        await era.printAndWait(`「不，不要啊…停下…好痛啊啊！」`);
        await era.printAndWait(
          `『我的手指插进去了哦姐姐！怎么用，感觉舒服吗？』`,
        );
      } else if (era.get(`talent:${target}:76`) === 1) {
        // 淫乱
        await era.printAndWait(
          `「哈啊${heart(1)} 感觉到了，你湿漉漉的手指${heart(1)}」`,
        );
      } else if (mark(2) === 3 && era.get(`talent:${target}:85`) === 1) {
        // 屈服刻印Lv3+爱慕
        await era.printAndWait(`「魔王大人的话…想怎么做什么都可以…嗯啊啊！」`);
      } else {
        // それ以外
        await era.printAndWait(`「啊啊啊！不，不要那么粗暴啊、会痛的！」`);
      }
      kojo.插入手指 = 1;
      return 0;
    }

    // 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.插入手指 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `「哈啊……请尽情地欺负…姐姐淫荡的蜜穴吧…嗯啊 ${heart(1)}」`,
        );
        await era.printAndWait(
          `『哎呀，只是轻轻这样用手指插了几下，姐姐的表情就已经跟高潮了一样。真是的，在我心目中的形象完全破灭了啊』`,
        );
        await era.printAndWait(
          `「因，因为，实在是太舒服了啊……姐姐的淫穴！嗯啊啊${heart(1)} 哈…呼…呼呼！」`,
        );
        kojo.插入手指 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        mark(2) === 3 &&
        (kojo.插入手指 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕＋屈服刻印Lv3
        await era.printAndWait(`「再，再稍微，温柔一点…嗯啊啊！」`);
        await era.printAndWait(
          `『放松一些啦姐姐，明明比我手指更粗的东西都能进得去♪』`,
        );
        await era.printAndWait(`「呜啊啊…因，因为太羞耻了啦……啊啊！」`);
        kojo.插入手指 = 4;
      } else if (
        mark(2) === 3 &&
        (kojo.插入手指 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3
        await era.printAndWait(`『姐姐变得老实得多了呢，是感觉到快感了吧？』`);
        await era.printAndWait(
          `「才，才不是这样的…嗯啊？…啊啊啊啊！不要，不要再里面搅动啊！」`,
        );
        await era.printAndWait(
          `『这是对姐姐撒谎的惩罚哦♪为什么不坦率地承认很舒服呢？』`,
        );
        kojo.插入手指 = 3;
      } else if (kojo.插入手指 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.printAndWait(`「住手，住手啊…啊啊啊！」`);
        await era.printAndWait(
          `『指头已经全部插进姐姐的里面去了哦。怎么样，感觉舒服吗？』`,
        );
        await era.printAndWait(`「怎，怎么可能会舒服？！快拔出去啊啊啊！」`);
        kojo.插入手指 = 2;
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.插入手指 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「哈啊${heart(1)} 蜜穴都湿透了，都是因为你${heart(1)}嗯啊」`,
      );
      await era.printAndWait(
        `${target_name}感受着下体被手指抽插的快感，舒服得眼泪都流下来了，不停地娇喘着。`,
      );
      await era.printAndWait(`「嗯啊啊…好舒服…舒服得…要去了${heart(1)}」`);
      kojo.插入手指 = 5;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      mark(2) === 3 &&
      (kojo.插入手指 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕＋屈服刻印Lv3
      await era.printAndWait(
        `「魔，魔王大人的话…想怎么玩${target_name}的那里…哈啊…都可以…嗯啊啊！」`,
      );
      await era.printAndWait(
        `${target_name}弓起了腰身，让${player_name}的手指可以更加深入地抽插自己的下体，自己也不住地娇喘着。`,
      );
      await era.printAndWait(
        `「哈啊…${target_name}的蜜穴…触感如何…魔王大人${heart(1)}嗯啊啊啊」`,
      );
      kojo.插入手指 = 4;
    } else if (
      mark(2) === 3 &&
      (kojo.插入手指 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3
      await era.printAndWait(
        `「还要再这样弄多久？什么时候…可以结束？嗯啊啊！」`,
      );
      await era.printAndWait(`「呼…呼…什么？还，还要再来？」`);
      kojo.插入手指 = 3;
    } else if (kojo.插入手指 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(`「呜啊！这么粗暴的动作…讨厌死了！啊啊啊」`);
      kojo.插入手指 = 2;
    }
    return 0;
  }

  // IF SELECTCOM == 9（舔肛 CFLAG:310）
  if (era_flag.selectcom === 9) {
    // 初めて（CFLAG:310 == 0）
    if (kojo.舔肛 === 0) {
      if (assi_mao) {
        await era.printAndWait(
          `『哇，姐姐的肛门粉粉嫩嫩的，真好看，这次换妹妹来侍奉姐姐一下${heart(1)}』`,
        );
        await era.printAndWait(`「唔嗯？那里好脏，好脏的！不要啊！」`);
        await era.printAndWait(
          `『不脏啊，${player_name}觉得姐姐的肛门，很美味呢${heart(1)}』`,
        );
      } else if (era.get(`talent:${target}:76`) === 1) {
        // 淫乱
        await era.printAndWait(`「真是的！连那种地方也要舔，你真是变态！」`);
        await era.printAndWait(
          `${target_name}有点不习惯肛门被舔舐的感觉，发出了混杂着不安与享受的声音……`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        // 爱慕
        await era.printAndWait(
          `「不，不要舔那里，那里太…肮脏了啊！呜呜…嗯啊啊」`,
        );
        await era.printAndWait(
          `${target_name}有点不习惯肛门被舔舐的感觉，发出了混杂着不安与享受的声音……`,
        );
      } else {
        // それ以外（爱慕無し）
        await era.printAndWait(
          `「为，为什么要舔这种地方！好脏的！不要那样啊！」`,
        );
        await era.printAndWait(
          `${target_name}肛门第一次被舔舐，极度的不适和反感让她发出了屈辱的哀鸣……`,
        );
      }
      kojo.舔肛 = 1;
      return 0;
    }

    // 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `「啊啊啊…继续，继续舔，${player_name}、把舌头伸进里面舔${heart(1)}」`,
        );
        await era.printAndWait(
          `『姐姐是个喜欢被人舔肛门的变态呢…嚯嚯嚯…真的那么舒服吗♪』`,
        );
        await era.printAndWait(
          `${target_name}享受着${player_name}舔舐自己的肛门带来的快感，发出一阵阵淫媚的娇喘…`,
        );
        kojo.舔肛 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.舔肛 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(
          `「啊啊…这样太羞耻了…快停下，${player_name}…嗯啊啊」`,
        );
        await era.printAndWait(
          `『为什么要停下呢？姐姐的肛门，多美味啊♪而且明明自己也是一脸享受的样子♪我继续了哦！』`,
        );
        await era.printAndWait(
          `${target_name}享受着被${player_name}舔舐着肛门带来的快感，脸却红到了脖子根………`,
        );
        kojo.舔肛 = 4;
      } else if (
        mark(2) === 3 &&
        (kojo.舔肛 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3
        await era.printAndWait(
          `「呃啊啊…姐姐一点都不觉得舒服…快，快点结束啦…嗯啊啊！」`,
        );
        await era.printAndWait(
          `『不行哦姐姐，你要再放松一点，让妹妹舌头再进去一点就能感觉到舒服啦♪ 我继续开动啦！』`,
        );
        await era.printAndWait(
          `${target_name}被${player_name}来回舔舐着肛门，只能屈着身子忍耐着……`,
        );
        kojo.舔肛 = 3;
      } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外（屈服刻印Lv3未満）
        await era.printAndWait(
          `『姐姐的屁股再放松一点啦，妹妹的舌头都进不去，以后怎么接纳魔王大人的……嘻嘻♪』`,
        );
        await era.printAndWait(`「呜呜！不要啊，那里好脏，好脏的…快停下啊！」`);
        await era.printAndWait(
          `${target_name}被舔舐着肛门，发出了交织着不适、反感与屈辱的悲鸣……`,
        );
        kojo.舔肛 = 2;
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.舔肛 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「啊啊…魔王大人真是变态…喜欢…舔人家的肛门${heart(1)}哈啊」`,
      );
      await era.printAndWait(
        `${target_name}享受着肛门被舔舐的快感，发出一阵阵淫浪的娇喘………`,
      );
      kojo.舔肛 = 5;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.舔肛 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「魔，魔王大人，怎么能让你…做…做这种事！真是…嗯啊啊」`,
      );
      await era.printAndWait(
        `${target_name}被${player_name}仔细舔舐着肛门，羞得面红耳赤，但是又不自觉地享受着……`,
      );
      kojo.舔肛 = 4;
    } else if (mark(2) === 3 && (kojo.舔肛 <= 2 || game.kojo.口上开关 === 2)) {
      // 屈服刻印Lv3
      await era.printAndWait(`「啊啊…可以快，快点结束吗…嗯啊啊！」`);
      await era.printAndWait(
        `${target_name}被${player_name}仔细舔舐着肛门，只能拼命忍耐着不适感。`,
      );
      kojo.舔肛 = 3;
    } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外（屈服刻印Lv3未満）
      await era.printAndWait(`「都说不要啊啊！那种肮脏的地方！」`);
      await era.printAndWait(
        `${target_name}被舔舐着肛门，发出了交织着不适、反感与屈辱的悲鸣……`,
      );
      kojo.舔肛 = 2;
    }
    return 0;
  }

  // IF SELECTCOM == 10（振动宝石 CFLAG:311）
  if (era_flag.selectcom === 10) {
    // 初めて（CFLAG:311 == 0）
    if (kojo.振动宝石 === 0) {
      if (assi_mao) {
        await era.printAndWait(`『这种震动玩具，很容易上瘾的哦，姐姐～♪』`);
        await era.printAndWait(`「呜啊！快…快拿开，${player_name}！啊啊啊」`);
      } else if (era.get(`talent:${target}:76`) === 1) {
        // 淫乱
        await era.printAndWait(
          `「啊啊，这样的震动…真让人…欲仙欲死${heart(1)}」`,
        );
      } else if (mark(2) === 3 && era.get(`talent:${target}:85`) === 1) {
        // 屈服刻印Lv3+爱慕
        await era.printAndWait(
          `「呜啊！这，这是什么？啊啊啊震得太…太厉害了！」`,
        );
      } else {
        // それ以外
        await era.printAndWait(`「呃？这、这是什么！？快拿开，好难受！」`);
      }
      kojo.振动宝石 = 1;
      return 0;
    }

    // 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.振动宝石 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `『这么简单的道具就能让姐姐舒服成这个样子，姐姐的身体，已经完全变得淫乱了呢${heart(1)}』`,
        );
        await era.printAndWait(
          `「哈啊！是，是啊…这种能让姐姐阴蒂舒服的东西…最喜欢了…嗯啊啊，再，再压紧一点${heart(1)}…呼呼…啊啊啊」`,
        );
        await era.printAndWait(`『真的好像已经高潮了呢，淫荡的姐姐………』`);
        kojo.振动宝石 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        mark(2) === 3 &&
        (kojo.振动宝石 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕＋屈服刻印Lv3
        await era.printAndWait(
          `「真，真是的！为什么老要对姐姐、做，做恶作剧…嗯啊啊啊！」`,
        );
        await era.printAndWait(
          `『因为人家想看到姐姐高潮时的脸嘛…你看你看，就是这个表情♪』`,
        );
        kojo.振动宝石 = 4;
      } else if (
        mark(2) === 3 &&
        (kojo.振动宝石 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3
        await era.printAndWait(`『姐姐变得老实多了呢，是不是已经有快感了？』`);
        await era.printAndWait(`「哈啊…胡，胡说，才没有那种—呃啊啊」`);
        kojo.振动宝石 = 3;
      } else if (kojo.振动宝石 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.printAndWait(`『你看，很舒服吧？姐姐老实点不要乱动啊』`);
        await era.printAndWait(`「呜呜…拿…拿开啊…那种东西…！嗯啊啊」`);
        kojo.振动宝石 = 2;
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.振动宝石 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「呜啊啊！好舒服……小豆豆…好舒服！哈啊…嗯啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}在宝石激烈的震动刺激下，整个腰身都弓了起来，不住地呻吟、娇喘………`,
      );
      kojo.振动宝石 = 5;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      mark(2) === 3 &&
      (kojo.振动宝石 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕＋屈服刻印Lv3
      await era.printAndWait(
        `「哈…啊…不，不需要那种东西啦…我，我更想要你的手指…嗯啊啊！」`,
      );
      await era.printAndWait(
        `${target_name}在宝石的刺激下不住地随快感扭着腰，娇媚地呻吟着………`,
      );
      kojo.振动宝石 = 4;
    } else if (
      mark(2) === 3 &&
      (kojo.振动宝石 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3
      await era.printAndWait(`「呜呜！又，又是这个！关掉，关掉啊…呜啊啊！」`);
      await era.printAndWait(
        `${target_name}被震动宝石连续刺激着阴蒂、只能咬牙忍耐着………`,
      );
      kojo.振动宝石 = 3;
    } else if (kojo.振动宝石 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(`「住，住手啊…！这种东西…！呜呜呜！」`);
      await era.printAndWait(
        `无处躲避的${target_name}被震动宝石连续刺激着阴蒂，发出了屈辱的哀鸣………`,
      );
      kojo.振动宝石 = 2;
    }
    return 0;
  }

  // IF SELECTCOM == 11（壶虫 CFLAG:312／着脱 CFLAG:372，
  // TEQUIP:11 判定已装/未装两态）
  if (era_flag.selectcom === 11) {
    const virgin = era.get(`talent:${target}:0`) === 1;

    if (era.get(`tequip:${target}:11`)) {
      // 初めて（CFLAG:312 == 0，开始时）
      if (kojo.壶虫 === 0) {
        if (virgin) {
          // 处女
          if (assi_mao) {
            await era.printAndWait(
              `『哎哎，姐姐真可怜呢，明明更想把处女留给魔王大人对吧♪可惜再也不可能了呢。』`,
            );
            await era.printAndWait(
              `${player_name}抓着已经大半进入${target_name}蜜穴里的虫子，用力捏着它，刺激着它继续往里钻来钻去。`,
            );
            await era.printAndWait(
              `看着手中沾满${target_name}处女血的蠕虫，${player_name}笑得嘴都歪了，笑容里满是深深的恶意。`,
            );
            if (era.get(`talent:${target}:76`) === 1) {
              // 淫乱
              await era.printAndWait(
                `「哈啊，啊啊啊…虽说是这样…但是…还是…很舒服啊${heart(1)}哈……」`,
              );
              await era.printAndWait(
                `${target_name}吃痛地叫了一声，但随即开始发出淫媚与享受的娇喘，淫乱的样子反而让${player_name}有些惊讶和失望……`,
              );
            } else if (era.get(`talent:${target}:85`) === 1) {
              // 爱慕
              await era.printAndWait(
                `「你，你明明知道我的心情！为什么还要…还要说这么残酷的话？！把它拔出去，拔出去啊！求求你………」`,
              );
              await era.printAndWait(
                `虫子依旧在${target_name}的阴道内肆意爬动，极度的委屈与痛楚使得${target_name}泪如泉涌，而看到姐姐这个样子的${player_name}，却更加兴奋………`,
              );
            } else {
              // それ以外
              await era.printAndWait(
                `「啊啊啊…好痛…好痛啊…为什么要对姐姐做这么残忍的事！！${player_name}，你原来不是这样的人啊……！呜呜呜…」`,
              );
              await era.printAndWait(
                `虫子依旧在${target_name}的阴道内肆意爬动，极度的屈辱与痛楚使得${target_name}撕心裂肺地惨叫着，哭泣着，而看到姐姐这个样子的${player_name}，却更加兴奋………`,
              );
            }
          } else if (era.get(`talent:${target}:76`) === 1) {
            // 非助手玛奥・淫乱
            await era.printAndWait(
              `「啊啊啊！钻进，进来了…我的处女…居然给了这么一个东西…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}用交织着委屈与享受的表情，出神地凝视着已经半身钻入自己下体内，穿透了处女膜的虫子……`,
            );
          } else if (era.get(`talent:${target}:85`) === 1) {
            // 非助手玛奥・爱慕
            await era.printAndWait(
              `「这是…对我的惩罚吗？魔王大人…我甘心受罚啊啊啊！好痛！好痛啊啊！」`,
            );
            await era.printAndWait(
              `蠕虫猛地钻进了${target_name}的蜜穴中，穿破了处女膜，沿着阴道往里钻，痛楚和委屈让她泪流满面地悲泣着……`,
            );
          } else {
            // 非助手玛奥・それ以外
            await era.printAndWait(
              `「不要不要不要啊…拔出去拔出去——啊啊啊好痛，好痛啊！」`,
            );
            await era.printAndWait(
              `蠕虫猛地钻进了${target_name}的蜜穴中，穿破了处女膜，沿着阴道往里钻，极度的痛楚和屈辱让她撕心裂肺地惨叫着，哭泣着……`,
            );
          }
        } else if (assi_mao) {
          // 非处女・助手玛奥
          await era.printAndWait(`『啊哈哈、姐姐看，虫子从你下面钻进去了♪』`);
          await era.printAndWait(`「什，什么？！啊啊啊…好难受，好难受！」`);
        } else if (era.get(`talent:${target}:76`) === 1) {
          // 非处女・淫乱
          await era.printAndWait(`「哈啊，钻，钻进去了…呃啊…啊啊！」`);
          await era.printAndWait(
            `${target_name}感受着蠕虫从自己蜜穴中钻入，开始因为刺激和快感呻吟了起来………`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 非处女・爱慕
          await era.printAndWait(
            `「这，这样的东西和魔王大人的…比起来、啊，对，对不起…我…什么都没说！呃啊…哈啊」`,
          );
          await era.printAndWait(
            `${target_name}感受着蠕虫从自己蜜穴中钻入，不由得大声地呻吟了起来。`,
          );
        } else {
          // 非处女・それ以外
          await era.printAndWait(
            `「要，要让这样的东西进去…不，不，不要啊，这样的调教…求求你！」`,
          );
          await era.printAndWait(
            `${target_name}想要伸手去把虫子拔出去，却被${player_name}按住了手、只能任由蠕虫继续往蜜穴的深处钻入……`,
          );
        }
        kojo.壶虫 = 1;
        return 0;
      }

      // 二回目以降
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.壶虫 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // 淫乱
          await era.printAndWait(
            `『姐姐，告诉我，被蠕虫插进去舒服还是被阴茎插进去舒服些？』`,
          );
          await era.printAndWait(
            `「哎呀呀…这样的问题怎么回答呢…哪种东西在姐姐的蜜穴里，就是哪种更舒服…所以，现在当然是虫子啦${heart(1)}」`,
          );
          kojo.壶虫 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.壶虫 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // 爱慕
          await era.printAndWait(
            `『姐姐，告诉我，被蠕虫插进去舒服还是被阴茎插进去舒服些？』`,
          );
          await era.printAndWait(
            `「哎，哎…这种问题怎么回答的出口！啊啊啊，不要让它……爬太深进去啊啊啊！」`,
          );
          kojo.壶虫 = 4;
        } else if (
          chara(target).system.私处感觉 >= 3 &&
          (kojo.壶虫 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // V感覚Lv3以上
          await era.printAndWait(
            `『哎呀，姐姐一副口水都要流出来了的表情呢，真的有那么舒服吗${heart(1)}虫子已经要全部爬进去了哦哦』`,
          );
          await era.printAndWait(
            `「哎，哎，才没露出那种表情…啊啊…在，在里面动起来了…啊哈…嗯啊啊！」`,
          );
          kojo.壶虫 = 3;
        } else if (kojo.壶虫 <= 1 || game.kojo.口上开关 === 2) {
          // それ以外
          await era.printAndWait(
            `『姐姐，开始习惯虫子在蜜穴里爬爬的感觉了吗？』`,
          );
          await era.printAndWait(
            `「这，这种事…永远不会…不会习惯啊啊啊啊…拿出去啊啊，求求你！」`,
          );
          kojo.壶虫 = 2;
        }
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.壶虫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `「哈啊…啊！蜜穴被虫子…！啊啊…好…好舒服${heart(1)}」`,
        );
        await era.printAndWait(
          `随着虫子渐渐钻入蜜穴之中，${target_name}的话音被自己充满享受的娇喘声掩盖了……`,
        );
        kojo.壶虫 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.壶虫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(`「哈啊…啊！进，进去了…虫子…蜜穴里…嗯啊啊」`);
        await era.printAndWait(
          `着虫子渐渐钻入蜜穴之中，${target_name}发出了享受的娇喘声………`,
        );
        kojo.壶虫 = 4;
      } else if (
        chara(target).system.私处感觉 >= 3 &&
        (kojo.壶虫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // V感覚Lv3以上
        await era.printAndWait(
          `「这，这种东西钻进去…不会感觉到舒服的啦啊啊啊…哈啊…嗯啊啊！」`,
        );
        await era.printAndWait(
          `随着虫子渐渐钻入蜜穴之中，${target_name}的辩解被自己充满享受的娇喘声掩盖了……`,
        );
        kojo.壶虫 = 3;
      } else if (kojo.壶虫 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.printAndWait(
          `「慢，慢一点…稍微…温柔一些不行吗！不…不要再进来了啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}发出了不满的声音，为了让她明白自己的立场和身份，${player_name}立即粗暴地刺激着虫子继续深入………`,
        );
        kojo.壶虫 = 2;
      }
      return 0;
    }

    // 脱着時（TEQUIP:11 == 0）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.壶虫着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「哎，哎哎…虫子出去后，${target_name}的蜜穴好寂寞哦${heart(1)}，魔王大人」`,
      );
      kojo.壶虫着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.壶虫着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「哈…呼…呼呼…接，接下来，魔王大人${heart(1)}？」`,
      );
      kojo.壶虫着脱 = 2;
    } else if (kojo.壶虫着脱 < 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(
        `「突，突然拔出去…会，会痛的…啊，哈啊，为什么…有一种空虚的感觉……」`,
      );
      kojo.壶虫着脱 = 1;
    }
    return 0;
  }

  // IF SELECTCOM == 12（振动杖 CFLAG:313）
  if (era_flag.selectcom === 12) {
    // 初めて（CFLAG:313 == 0）
    if (kojo.振动杖 === 0) {
      if (assi_mao) {
        await era.printAndWait(
          `『这个震动起来很厉害的哦，不知道姐姐能坚持多久呢♪』`,
        );
        await era.printAndWait(
          `「啊咧？什，什么……啊啊啊…拿开啊……哈啊…哈啊！」`,
        );
      } else if (era.get(`talent:${target}:76`) === 1) {
        // 淫乱
        await era.printAndWait(
          `「啊啊啊…这个震动的频率…太，太快……啊啊啊…好…好舒服啊…${heart(1)}」`,
        );
        await era.printAndWait(
          `双腿之间的震动杖对私处的激烈刺激，${target_name}闭上了眼睛，一脸享受的表情………`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        // 爱慕
        await era.printAndWait(
          `「这，这是？！这种东西不是用来按摩肩膀的——啊啊啊！」`,
        );
        await era.printAndWait(
          `双腿之间的震动杖对私处的激烈刺激，，让${target_name}弓起了腰，全身颤抖了起来………`,
        );
      } else {
        // それ以外
        await era.printAndWait(
          `「这，这是什么？！好痒，好痒，哈…啊哈，拿开啊…嗯啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}抿着嘴，忍耐着双腿之间的震动杖对阴蒂激烈刺激………`,
        );
      }
      kojo.振动杖 = 1;
      return 0;
    }

    // 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.振动杖 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `「啊啊啊…姐姐…要上天了…哈啊${heart(1)} 实在是……太棒了${heart(1)}」`,
        );
        await era.printAndWait(
          `『哎哎、这个东西还真是厉害呢，碰一下姐姐就变成这个样子了………』`,
        );
        kojo.振动杖 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.振动杖 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(
          `「哈…啊…又是这个！快，快拿开啊，姐姐怕痒啊啊啊…呼…呼…呃啊啊啊！」`,
        );
        await era.printAndWait(
          `『痒？明明是很舒服才对吧？哈啊，看我换个角度让姐姐更舒服一点${heart(1)}』`,
        );
        kojo.振动杖 = 4;
      } else if (
        mark(2) === 3 &&
        (kojo.振动杖 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3
        await era.printAndWait(
          `『姐姐也开始露出舒服和享受的表情了呢，真是可爱～』`,
        );
        await era.printAndWait(
          `「才，才不会有那种表情…啊啊…哈啊…舒服，享受什么的…更不可能…呃啊啊…呜呜」`,
        );
        kojo.振动杖 = 3;
      } else if (kojo.振动杖 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.printAndWait(
          `『哎呀呀，姐姐，怎么老乱动哦，又想要我惩罚你了吗♪』`,
        );
        await era.printAndWait(
          `「不，不要啊…原谅${player_name}吧，求求你…呃啊啊…嗯啊啊！」`,
        );
        kojo.振动杖 = 2;
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.振动杖 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「啊啊啊…这个感觉…好棒呃啊啊…简直太舒服了嗯啊啊啊…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}张开了双腿，尽情享受着双腿之间震动杖的激烈刺激，娇喘个不停……`,
      );
      kojo.振动杖 = 5;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.振动杖 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「啊啊啊…太…太激烈了…嗯啊啊…哈…哈…呃啊啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}感受着双腿之间震动杖的激烈刺激，在快感之下弓起了腰，不住地娇喘着……`,
      );
      kojo.振动杖 = 4;
    } else if (
      mark(2) === 3 &&
      (kojo.振动杖 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3
      await era.printAndWait(`「不，不行啊…再继续就…就啊啊…哈啊…哈啊…！」`);
      await era.printAndWait(
        `${target_name}只剩下口头上的微弱抗拒，双腿则老实地张开着，忍耐着震动杖对阴蒂的强烈刺激………`,
      );
      kojo.振动杖 = 3;
    } else if (kojo.振动杖 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(`「呃啊啊啊！停，停下啊！把它拿开啊啊啊！」`);
      await era.printAndWait(
        `震动杖激烈地刺激着${target_name}的敏感的阴蒂，让她不住地哀鸣着……`,
      );
      kojo.振动杖 = 2;
    }
    return 0;
  }

  // IF SELECTCOM == 13（肛门虫 CFLAG:314／着脱 CFLAG:374，
  // TEQUIP:13 判定已装/未装两态）
  if (era_flag.selectcom === 13) {
    if (era.get(`tequip:${target}:13`)) {
      // 初めて（CFLAG:314 == 0，开始时）
      if (kojo.肛门虫 === 0) {
        if (assi_mao) {
          await era.printAndWait(
            `『接下来这个，姐姐一定会喜欢的，嘿嘿嘿、放松，放松………』`,
          );
          await era.printAndWait(
            `「这，这种东西，无论如何也不可能会喜欢的吧！住，住手啊！呜呜呜…不要啊…求求你…！」`,
          );
        } else if (era.get(`talent:${target}:76`) === 1) {
          // 淫乱
          await era.printAndWait(
            `「哈啊…哈啊………肛门要被这样的东西侵犯了………这个感觉…嗯啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `蠕虫钻入${target_name}的肛门时，她惊呼了一声，随即变成了享受的喘息………`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 爱慕
          await era.printAndWait(
            `「如果…如果是魔王大人希望这样的话…我会…我会…呃呃…呃嗯…」`,
          );
          await era.printAndWait(
            `${target_name}抿着嘴唇，浑身颤抖地忍耐着蠕虫钻入肛门的强烈不适感……`,
          );
        } else if (chara(target).system.肛门感觉 >= 3) {
          // それ以外・A感覚Lv3以上
          await era.printAndWait(
            `「这，这种东西……不行不行不行啊！屁股里不可能容纳得了的啊！啊啊…呃呃啊啊！」`,
          );
          await era.printAndWait(
            `虽然语气上抗拒强烈，但是${target_name}已经被充分调教过的肛门，很自然地扩张开来，让蠕虫顺利地爬了进去，并且开始感受到异样的快感……`,
          );
        } else {
          // それ以外・それ以外
          await era.printAndWait(
            `「不，不要啊！屁股…怎么能让这种东西进去啊啊！呃啊啊啊…拿掉啊…拿掉啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}剧烈地反抗着，然而毫无意义，${player_name}压着她的身体，将虫子强行塞了进去………`,
          );
        }
        kojo.肛门虫 = 1;
        return 0;
      }

      // 二回目以降
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.肛门虫 <= 6 || game.kojo.口上开关 === 2)
        ) {
          // 淫乱＋A感覚Lv3以上
          await era.printAndWait(
            `「哈啊…哈啊！虫子…完全进去了${heart(1)} 哈啊…呀呀…呀啊啊…姐姐的肛门……舒服得…要说不出话来了！」`,
          );
          await era.printAndWait(
            `『哎哎，再怎么舒服，也不能发出那么淫荡的声音吧姐姐♪』`,
          );
          kojo.肛门虫 = 6;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.肛门虫 <= 5 || game.kojo.口上开关 === 2)
        ) {
          // 淫乱
          await era.printAndWait(
            `「哎…哎哟…稍微，稍微温柔一点啦…哈啊…啊啊！」`,
          );
          await era.printAndWait(
            `『没关系啦、反正姐姐马上就会舒服得上天了的』`,
          );
          kojo.肛门虫 = 6;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.肛门虫 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // 爱慕＋A感覚Lv3以上
          await era.printAndWait(
            `「啊……哈啊…稍微…稍微慢一点…这样，这样就已经很舒服了！不，不需要再深入了！啊哈…啊啊…呀啊啊」`,
          );
          await era.printAndWait(
            `『姐姐的肛门已经开发得这么彻底了…这舒服的表情真是可爱呢${heart(1)}』`,
          );
          kojo.肛门虫 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.肛门虫 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // 爱慕
          await era.printAndWait(
            `「饶，饶了我吧，不要再欺负姐姐了…这样的东西…真的…不喜啊啊啊…啊哈…啊…！」`,
          );
          await era.printAndWait(
            `『什么欺负不欺负的，姐姐给我高高兴兴地把这东西吸进屁股里吧…嘻嘻嘻』`,
          );
          kojo.肛门虫 = 4;
        } else if (
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.肛门虫 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // A感覚Lv3以上
          await era.printAndWait(
            `「哈…哈啊…进，进来…不，不可以…哈啊…呀呀…呀啊啊！」`,
          );
          await era.printAndWait(
            `『亲爱的姐姐不要口是心非啦，才进去一半，都已经舒服成这个样子了？』`,
          );
          kojo.肛门虫 = 3;
        } else if (kojo.肛门虫 <= 1 || game.kojo.口上开关 === 2) {
          // それ以外
          await era.printAndWait(
            `「好痛…好痛…好难受啊啊啊！快把它拿掉，姐姐求求你了！」`,
          );
          await era.printAndWait(
            `『放松，放松，姐姐很快就会习惯并且爱上它的♪』`,
          );
          kojo.肛门虫 = 2;
        }
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.肛门虫 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱＋A感覚Lv3以上
        await era.printAndWait(
          `「哈…哈啊${heart(1)} 全部，全部进到肛门里面了${heart(1)} 啊哈…啊啊…舒服得…要说不出话了${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}感受着蠕虫慢慢钻入自己的肛门里，已经忍不住快感，忘我地娇喘了起来………`,
        );
        kojo.肛门虫 = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.肛门虫 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `「哈啊…再，再稍微温柔一些…还是有点…哈啊，啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的肛门还没有完全适应蠕虫的刺激，从喉咙底发出无所适从的喘息……`,
        );
        kojo.肛门虫 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.肛门虫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕＋A感覚Lv3以上
        await era.printAndWait(
          `「哈啊，呼呼…整，整只都钻，钻进去了…啊哈…啊啊…舒服得…要说不出话了${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}感受着蠕虫在自己肛门里爬动，忍不住发出了舒服的呻吟………`,
        );
        kojo.肛门虫 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.肛门虫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(
          `「呃…还，还是有点害怕，但如果是魔王大人的要求的话…我会，我会——嗯啊啊啊…啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}感受着蠕虫慢慢钻入自己肛门中，抿着嘴拼命忍耐着不适感………`,
        );
        kojo.肛门虫 = 4;
      } else if (
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.肛门虫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // A感覚Lv3以上
        await era.printAndWait(
          `「哈啊，呼呼…整，整只都钻，钻进去了…啊哈…啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被充分调教，开发过的肛门，轻易就接纳了蠕虫的侵犯，并且已经感受到了快感………`,
        );
        kojo.肛门虫 = 3;
      } else if (kojo.肛门虫 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.printAndWait(
          `「啊啊啊！不要啊！求求你，不要让这东西进来啊！求求你，求求你！」`,
        );
        await era.printAndWait(
          `${target_name}无谓地抵抗着，但被${player_name}压着她的身体，将虫子强行塞了进去………`,
        );
        kojo.肛门虫 = 2;
      }
      return 0;
    }

    // 脱着時（TEQUIP:13 == 0）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.肛门虫着脱 < 4 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(`「哎啊啊！真，真是的，不要拔得那么快………」`);
      kojo.肛门虫着脱 = 4;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.肛门虫着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(`「呼…呼呼…下次…魔王大人…可以再温柔一点吗？」`);
      kojo.肛门虫着脱 = 3;
    } else if (
      chara(target).system.肛门感觉 >= 3 &&
      (kojo.肛门虫着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // A感覚Lv3以上
      await era.printAndWait(`「哈啊…啊啊…屁股感觉，好空虚………」`);
      kojo.肛门虫着脱 = 2;
    } else if (kojo.肛门虫着脱 < 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(`「啊…啊…屁股…会坏掉的……」`);
      kojo.肛门虫着脱 = 1;
    }
    return 0;
  }

  // IF SELECTCOM == 14（阴蒂夹 CFLAG:315／着脱 CFLAG:375，
  // TEQUIP:14 判定已装/未装两态）
  if (era_flag.selectcom === 14) {
    if (era.get(`tequip:${target}:14`)) {
      // 初めて（CFLAG:315 == 0，开始时）
      if (kojo.阴蒂夹 === 0) {
        if (assi_mao) {
          await era.printAndWait(
            `『嘿嘿，姐姐来戴上这个可爱的饰品吧，保证让姐姐你舒服得上天哦！』`,
          );
          await era.printAndWait(
            `「不，不，谢谢了，我一点都不觉得…啊啊啊…不要啊…不可以夹在那种地方啊…拿掉它，帮帮我！」`,
          );
          await era.printAndWait(
            `『嘿嘿，想都别想。这个东西，姐姐自己一个人是拿不下来的哦♪』`,
          );
        } else if (era.get(`talent:${target}:76`) === 1) {
          // 淫乱
          await era.printAndWait(
            `「啊哈…嗯啊啊啊啊${heart(1)} 这个小玩意，怎么这么…呃啊啊${heart(1)} 舒服啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `夹子开始对${target_name}的阴蒂施以强烈的刺激、没法自己一个人取下来，也根本就不打算这么做的${target_name}淫浪的娇喘着，尽情地享受着阴蒂传来的连绵快感，宛如来到了极乐的天堂……`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 爱慕
          await era.printAndWait(
            `「啊啊？！这…这是什么…额啊啊……太，太激烈了，魔王大人…能不能稍微…呃啊啊啊！」`,
          );
          await era.printAndWait(
            `夹子开始对${target_name}的阴蒂施以强烈的刺激，没有${player_name}的帮助和允许，无法把夹子取下来的${target_name}只能呻吟，喘息着，被动地感受着来自阴蒂的一波又一波强烈的快感刺激，不知自己是到了天国还是地狱…`,
          );
        } else {
          // それ以外
          await era.printAndWait(
            `「呃呃？！这…这东西是什么嗯啊啊啊？！太……太激烈…那里承受，承受不了的啊啊！」`,
          );
          await era.printAndWait(
            `夹子开始对${target_name}的阴蒂施以强烈的刺激，没有${player_name}的帮助和允许，无法把夹子取下来的${target_name}只能哀鸣着忍受着来自阴蒂的，半是快感，半是痛苦的强烈刺激，好像身陷地狱一般……`,
          );
        }
        kojo.阴蒂夹 = 1;
        return 0;
      }

      // 二回目以降
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.阴蒂夹 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // 淫乱
          await era.printAndWait(
            `「哈啊…啊啊、还能不能…开得再强烈…一点点…啊啊…哈啊${heart(1)}」`,
          );
          await era.printAndWait(
            `『哎呀，姐姐已经完全上瘾了呢${heart(1)} 那么，接下来动力全开了哦${heart(1)}』`,
          );
          kojo.阴蒂夹 = 4;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.阴蒂夹 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // 爱慕
          await era.printAndWait(
            `「哈啊…啊啊，这，这样就行了…不要再…加强了！」`,
          );
          await era.printAndWait(
            `『口是心非可是不行的哦姐姐，明明是一脸期待的表情嘛，小豆豆都舒服得胀起来了♪』`,
          );
          kojo.阴蒂夹 = 3;
        } else if (kojo.阴蒂夹 <= 1 || game.kojo.口上开关 === 2) {
          // それ以外
          await era.printAndWait(`「呃啊啊…拿，拿掉它啊…姐姐求求你了…」`);
          await era.printAndWait(`『不行哦、姐姐不是已经尝过有多舒服了吗♪』`);
          kojo.阴蒂夹 = 2;
        }
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.阴蒂夹 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `「哈…哈啊…又是这个${heart(1)} 阴蒂感觉…太棒了啊啊…整个人都要…嗯啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `夹子开始对${target_name}的阴蒂施以强烈的刺激、没法自己一个人取下来，也根本就不打算这么做的${target_name}淫浪的娇喘着，尽情地享受着阴蒂传来的连绵快感，宛如来到了极乐的天堂……`,
        );
        kojo.阴蒂夹 = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.阴蒂夹 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(
          `「请、请魔王大人随意调教…${target_name}的阴蒂…嗯啊啊…啊啊${heart(1)}…震动…太强了…整个人好像都要…融化了${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被阴蒂夹由弱渐渐转强的震动刺激得眼眶都湿润了，分开的双腿微微抽搐着，被动地感受着来自阴蒂的一波又一波强烈的快感刺激，不知自己是到了天国还是地狱…………`,
        );
        kojo.阴蒂夹 = 3;
      } else if (kojo.阴蒂夹 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.printAndWait(
          `「呃啊啊！太…太强烈了啊啊…调弱一点…求求你！呜啊啊啊！」`,
        );
        await era.printAndWait(
          `${player_name}将阴蒂夹的震动调到了最强档，细细品味着${target_name}在阴蒂刺激带来的快感和痛苦交织的地狱中发出的阵阵哀鸣……`,
        );
        kojo.阴蒂夹 = 2;
      }
      return 0;
    }

    // 脱着時（TEQUIP:14 == 0）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.阴蒂夹着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(`「哎，哎，不用急着取下来嘛……」`);
      kojo.阴蒂夹着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.阴蒂夹着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(`「哈…哈…身体还有点…有点…」`);
      kojo.阴蒂夹着脱 = 2;
    } else if (kojo.阴蒂夹着脱 < 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(`「终于…结束了吗…」`);
      kojo.阴蒂夹着脱 = 1;
    }
    return 0;
  }

  // IF SELECTCOM == 15（乳头夹 CFLAG:316／着脱 CFLAG:376，
  // TEQUIP:15 判定已装/未装两态）
  if (era_flag.selectcom === 15) {
    if (era.get(`tequip:${target}:15`)) {
      // 初めて（CFLAG:316 == 0，开始时）
      if (kojo.乳头夹 === 0) {
        if (assi_mao) {
          await era.printAndWait(
            `『接下来就让姐姐的乳头和这个新玩具合体吧、魔王大人会喜欢姐姐这个样子的哦♪』`,
          );
          await era.printAndWait(`「什，什么合体…啊啊啊…为什么…还会震动的！」`);
          await era.printAndWait(
            `『姐姐的乳头马上就挺立起来了呢。这么快就已经感觉到舒服了吗，姐姐的胸部果然是弱点呢${heart(1)}』`,
          );
        } else if (era.get(`talent:${target}:76`) === 1) {
          // 淫乱
          await era.printAndWait(
            `「哈啊…啊啊${heart(1)} 这个是…？夹在乳头上…感觉还挺合适的…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}摇晃着自己的丰满双乳，炫耀般地向你展示着乳头上的“新饰品”………`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 爱慕
          await era.printAndWait(
            `「哈，哈啊…这个…还会震动的…不过，好，好舒服…呼，呼，魔王大人…我这样…好看吗${heart(1)}」`,
          );
          await era.printAndWait(
            `听着${player_name}的称赞、${target_name}露出了欣慰的笑容，随即沦陷在乳头夹的刺激带来的快感中…`,
          );
        } else {
          // それ以外
          await era.printAndWait(
            `「这…这是什么啊啊…乳，乳头会坏掉的！拿下来，拿下来呃啊啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}忍受着着夹子对乳头施以的强烈震动刺激，不住地哀鸣着，全身都颤抖了起来。`,
          );
        }
        kojo.乳头夹 = 1;
        return 0;
      }

      // 二回目以降
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.乳头夹 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // 淫乱
          await era.printAndWait(
            `『很般配哦，姐姐粉红色的乳头，戴上这个夹子后更色情了♪』`,
          );
          await era.printAndWait(
            `「哈…哈啊…又，又开始震动了…姐姐的乳头挺立起来了…感觉实在是…太棒了啊啊…啊啊${heart(1)}」`,
          );
          kojo.乳头夹 = 4;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.乳头夹 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // 爱慕
          await era.printAndWait(
            `『这可是魔王大人赏赐的饰品哦，姐姐还不高高兴兴地戴上${heart(1)}』`,
          );
          await era.printAndWait(
            `「哈啊…哈啊${heart(1)} 谢…谢谢魔王大人…啊啊…感觉…好兴奋…${heart(1)}」`,
          );
          kojo.乳头夹 = 3;
        } else if (kojo.乳头夹 <= 1 || game.kojo.口上开关 === 2) {
          // それ以外
          await era.printAndWait(
            `『今天也继续用这个来调教，开发姐姐的乳头吧${heart(1)}』`,
          );
          await era.printAndWait(`「住，住手啊！乳头…真的会坏掉的啊！」`);
          kojo.乳头夹 = 2;
        }
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.乳头夹 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `「啊啊…嗯啊啊${heart(1)} 我的乳头…要是坏掉了…你可要…负责人…哈啊…啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}感受着夹子对乳头的强烈刺激带来的极度快感，泪水和口水都流了下来，带着仿佛要融化了一般的表情望着${player_name}…`,
        );
        kojo.乳头夹 = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.乳头夹 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(
          `「${target_name}更…更希望魔王大人亲自…用嘴…和手指…调教…疼爱${target_name}的乳头${heart(1)}，这，这种道具…根本比不上…啊啊啊…哈啊」`,
        );
        await era.printAndWait(
          `面对${target_name}的请求，${player_name}置若罔闻地调高了乳头夹的震动强度，让${target_name}再度沦陷在乳头夹的刺激带来的快感中………`,
        );
        kojo.乳头夹 = 3;
      } else if (kojo.乳头夹 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.printAndWait(
          `「不要，不要啊啊 ！好难受……好难受…乳头…会坏掉的啊啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}的乳头被夹上夹子，打开震动开关，进行着连续不断的，夹杂着痛苦与快感的刺激……`,
        );
        kojo.乳头夹 = 2;
      }
      return 0;
    }

    // 脱着時（TEQUIP:15 == 0）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.乳头夹着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(`「哈…哈啊…乳头…变得越来越敏感了…${heart(1)}」`);
      kojo.乳头夹着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.乳头夹着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(`「夹子拿掉后…乳头还是有点…痛…」`);
      kojo.乳头夹着脱 = 2;
    } else if (kojo.乳头夹着脱 < 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(`「啊啊啊…乳头肿起来了……」`);
      kojo.乳头夹着脱 = 1;
    }
    return 0;
  }

  // IF SELECTCOM == 16（榨乳器 CFLAG:317／着脱 CFLAG:377，
  // TEQUIP:16 判定已装/未装两态）
  if (era_flag.selectcom === 16) {
    if (era.get(`tequip:${target}:16`)) {
      // 初めて（CFLAG:317 == 0，开始时）
      if (kojo.榨乳器 === 0) {
        if (assi_mao) {
          await era.printAndWait(
            `『啊嘿嘿，姐姐的大胸部，挤出来的奶一定很值钱♪』`,
          );
          await era.printAndWait(
            `「不，不可以啊啊，乳汁是留给小宝宝的，怎么能拿去卖……呜呜！」`,
          );
        } else if (era.get(`talent:${target}:76`) === 1) {
          // 淫乱
          await era.printAndWait(
            `「啊啊啊……分泌出乳汁了……不过感觉……好舒服${heart(1)}」`,
          );
          await era.printAndWait(
            `夹在${target_name}乳房上的榨乳机，正在毫不留情地挤榨着母乳………`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 爱慕
          await era.printAndWait(
            `「啊啊……乳汁，乳汁满满地出来了${heart(1)} 感觉……好奇怪……但是好舒服……${heart(1)}」`,
          );
          await era.printAndWait(
            `夹在${target_name}乳房上的榨乳机，正在毫不留情地挤榨着母乳………`,
          );
        } else {
          // それ以外
          await era.printAndWait(
            `「拿，拿掉啊啊！这不是……给母牛用的吗……好痛，好痛……呜呜呜！！」`,
          );
          await era.printAndWait(
            `夹在${target_name}乳房上的榨乳机，正在毫不留情地挤榨着母乳………`,
          );
        }
        kojo.榨乳器 = 1;
        return 0;
      }

      // 二回目以降
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.榨乳器 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // 淫乱
          await era.printAndWait(
            `『哎嘿嘿，我又来给母牛姐姐挤奶了哦，这对淫乱的大胸部，不用来挤奶，真是太浪费了！』`,
          );
          if (rand_n(2)) {
            await era.printAndWait(
              `「请……请吧……姐姐的胸部……想要怎么玩都可以${heart(1)}」`,
            );
          } else {
            await era.printAndWait(
              `「呜啊啊${heart(1)} 居然，居然会这么舒服啊啊${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `夹在${target_name}乳房上的榨乳机，正在毫不留情地挤榨着母乳………`,
          );
          kojo.榨乳器 = 4;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.榨乳器 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // 爱慕
          await era.printAndWait(
            `『哎嘿嘿，姐姐的乳汁，一会儿我会全部好好喝光的哦♪』`,
          );
          await era.printAndWait(
            `「想，想要喝的话直接吸……不就行了……为什么还要用这种东西……」`,
          );
          await era.printAndWait(
            `夹在${target_name}乳房上的榨乳机，正在毫不留情地挤榨着母乳………`,
          );
          kojo.榨乳器 = 3;
        } else if (kojo.榨乳器 <= 1 || game.kojo.口上开关 === 2) {
          // それ以外
          await era.printAndWait(
            `『哎嘿嘿，姐姐的胸部好像被乳汁涨得满满的了，让我来给姐姐放松一下』`,
          );
          await era.printAndWait(
            `「住，住手啊，${player_name}！求你了……好痛！好痛啊啊！」`,
          );
          await era.printAndWait(
            `夹在${target_name}乳房上的榨乳机，正在毫不留情地挤榨着母乳………`,
          );
          kojo.榨乳器 = 2;
        }
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.榨乳器 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `「啊啊……开始习惯这种感觉了呢${heart(1)} 其实……还挺舒服的${heart(1)} 」`,
        );
        await era.printAndWait(`「啊啊啊……又出来了……乳汁${heart(1)}」`);
        await era.printAndWait(
          `榨夹在${target_name}乳房上的榨乳机，正在毫不留情地挤榨着母乳………`,
        );
        kojo.榨乳器 = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.榨乳器 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(
          `「明明是给宝宝喝的东西、不过……如果魔王大人想要品尝的话，我也不介意啦${heart(1)}！」`,
        );
        await era.printAndWait(`「不过……一定不能拿去卖哦！」`);
        await era.printAndWait(
          `${target_name}说着一点说服力都没有的话，然而夹在${target_name}乳房上的榨乳机，依旧在毫不留情地挤榨着母乳………………`,
        );
        kojo.榨乳器 = 3;
      } else if (kojo.榨乳器 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.printAndWait(
          `「饶，饶了我吧……再这样挤下去……胸部……真的会坏掉的……呜呜呜！」`,
        );
        await era.printAndWait(
          `夹在${target_name}乳房上的榨乳机，正在毫不留情地挤榨着母乳………`,
        );
        kojo.榨乳器 = 2;
      }
      return 0;
    }

    // 脱着時（TEQUIP:16 == 0）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.榨乳器着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(`「哈啊……哈啊……这些就是我分泌的乳汁……好多啊……」`);
      kojo.榨乳器着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.榨乳器着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(`「品尝一下可以……但是一定不能拿去卖啊……」`);
      kojo.榨乳器着脱 = 2;
    } else if (kojo.榨乳器着脱 < 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(`「呜呜呜……人家明明不是奶牛………」`);
      kojo.榨乳器着脱 = 1;
    }
    return 0;
  }

  // SELECTCOM 17（オナホール CFLAG:318／着脱 CFLAG:378）在原作
  // 里整段以 `;` 注释掉（连 `IF SELECTCOM == 17` 本身也被注释），SELECTCOM 数字
  // 因此从未被判定为真，属于死代码——PRINTFORMW 台词也全部留空未填。原作
  // 从未执行过此分支，本移植按证据不落地任何行为，直接跳过、不占用真实指令号。

  // IF SELECTCOM == 19（肛珠 CFLAG:320／脱着 CFLAG:379，
  // TEQUIP:19 判定已装/未装两态）
  if (era_flag.selectcom === 19) {
    if (era.get(`tequip:${target}:19`)) {
      if (kojo.肛珠 === 0) {
        // 初めて
        if (assi_mao) {
          await era.printAndWait(
            `『嘿嘿嘿，待会儿一口气全部拔出来，保证姐姐舒服得上天…』`,
          );
          await era.printAndWait(`「住…住手啊！不，不能再塞进去了…啊啊！」`);
        } else if (era.get(`talent:${target}:76`) === 1) {
          // 淫乱
          await era.printAndWait(
            `「哈啊…哈呼…又，又进来一颗${heart(1)}一会儿…再一下全部拔出去…♪」`,
          );
          await era.printAndWait(
            `${target_name}用手抱着张开的双腿，感受着小珠一颗颗被肛门吞入的异样快感……`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 爱慕
          await era.printAndWait(
            `「这个姿势真是…好害羞…呃啊…稍…稍微温柔一点…魔王大人……嗯啊…啊啊！」`,
          );
          await era.printAndWait(
            `${player_name}让${target_name}趴在，撅起光洁的臀部，将肛珠一颗颗从肛门塞了进去………`,
          );
        } else {
          // それ以外
          await era.printAndWait(
            `「为什么我就偏要遇上这种事！放，放开我！不，不要碰我的屁股啊——！！」`,
          );
          await era.printAndWait(
            `${player_name}把一直挣扎着的${target_name}用力按住，不由分说地将肛珠一颗颗塞了进去……`,
          );
        }
        kojo.肛珠 = 1;
        return 0;
      }

      // 二回目以降
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.肛珠 <= 6 || game.kojo.口上开关 === 2)
        ) {
          // 淫乱＋A感覚Lv3以上
          await era.printAndWait(
            `「啊哈…啊啊${heart(1)} 全，全部塞进去了呢！姐姐已经准备好了…一口气全部拔出来…让姐姐上天吧${heart(1)}」`,
          );
          await era.printAndWait(
            `『不行呐，姐姐。这么轻易就拔出去太没意思了？ 先忍一忍哦♪』`,
          );
          await era.printAndWait(
            `「不要，不要就这么…晾着啊！明明以前姐姐说什么你都会听的！」`,
          );
          kojo.肛珠 = 7;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.肛珠 <= 5 || game.kojo.口上开关 === 2)
        ) {
          // 淫乱
          await era.printAndWait(`「呃啊啊…居然…全部都塞进来了…呼…呼…」`);
          await era.printAndWait(`『本来就是这么打算的哦姐姐♪』`);
          kojo.肛珠 = 6;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.肛珠 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // 爱慕＋A感覚Lv3以上
          await era.printAndWait(`「哈啊…啊啊${heart(1)} 全，全部塞进来了」`);
          await era.printAndWait(
            `『是啊，多亏我们好好调教、开发了姐姐的肛门，才能把这么多珠子全部塞进去哦${heart(1)}、那么，姐姐是不是应该表示一下感谢呢？』`,
          );
          await era.printAndWait(
            `「是，是的……感谢魔王大人，和${player_name}大人…调教${target_name}的肛门…」`,
          );
          kojo.肛珠 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.肛珠 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // 爱慕
          await era.printAndWait(
            `「呃啊…啊啊啊…不，不行了…不能再放进去了…${player_name}，快停下…求求你…」`,
          );
          await era.printAndWait(
            `『半途而废可是不行的哦姐姐，乖乖全部用肛门吃下去吧${heart(1)}』`,
          );
          await era.printAndWait(
            `「啊啊！屁股里…真的已经塞满了啊啊…真的…饶了姐姐吧！」`,
          );
          kojo.肛珠 = 4;
        } else if (
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.肛珠 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // A感覚Lv3以上
          await era.printAndWait(
            `『哎呀，姐姐的肛门现在这么厉害了，全部都塞进去了呢♪』`,
          );
          await era.printAndWait(`「不，不要欺负姐姐啦…」`);
          await era.printAndWait(
            `『才不是欺负呢，姐姐真的很厉害～下次就来用更大号的肛门珠吧♪』`,
          );
          kojo.肛珠 = 3;
        } else if (kojo.肛珠 <= 1 || game.kojo.口上开关 === 2) {
          // それ以外
          await era.printAndWait(
            `『才这么几颗就已经塞不进去了啊、姐姐的肛门还是缺乏调教啊♪』`,
          );
          await era.printAndWait(`「呃啊啊！不行了，真的不行了！好痛！」`);
          await era.printAndWait(
            `「真是没办法啊，屁股外面还露着这么长一串，倒是很像猫咪的尾巴呢${heart(1)}」`,
          );
          kojo.肛珠 = 2;
        }
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.肛珠 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱＋A感覚Lv3以上
        await era.printAndWait(
          `「哎啊啊${heart(1)}…又，又进来一颗${heart(1)} 肛门好舒服${heart(1)} 舒服得要去了${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}像母狗一样趴在地上，翘着屁股，被充分调教和开发过的肛门，主动地开始一张一合将一颗颗珠子吞入，脸上的表情充满了享受与快意…`,
        );
        kojo.肛珠 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.肛珠 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `「又，又有一颗更大的，进来了${heart(1)} 哈啊，哈啊，感觉…好奇怪${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}像母狗一样趴在地上，翘着屁股，感受着珠子一颗接一颗地塞入自己的肛门时带来的别样的快感…`,
        );
        kojo.肛珠 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.肛珠 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕＋A感覚Lv3以上
        await era.printAndWait(
          `「哈啊…啊啊…好，好羞耻啊…但如果是魔王大人的要求…再塞多少颗进来…都可以${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}遵循着${player_name}的命令，像母狗一样趴在地上，翘着屁股。被充分调教和开发过的肛门，主动地开始一张一合将一颗颗珠子吞入，脸上的表情充满了享受与快意……`,
        );
        kojo.肛珠 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.肛珠 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(
          `「啊啊…${target_name}的肛门…很敏感的，哈啊，哈啊，请魔王大人…塞珠子的时候…再稍微…温柔一点！」`,
        );
        await era.printAndWait(
          `${player_name}遵循着${player_name}的命令，像母狗一样趴在地上，翘着屁股，感受着珠子一颗接一颗地塞入自己的肛门时带来的别样的快感…`,
        );
        kojo.肛珠 = 4;
      } else if (
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.肛珠 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // A感覚Lv3以上
        await era.printAndWait(
          `「为，为什么会这么舒服的…哈啊…啊啊…明明…完全不想…但是，真的好舒服啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${player_name}按着趴在地上的${target_name}的腰，将肛珠一颗接一颗塞进了肛门之中，聆听着${target_name}忍耐不住快感而发出的甘甜的喘息声………`,
        );
        kojo.肛珠 = 3;
      } else if (kojo.肛珠 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.printAndWait(`「住，住手啊…这样欺负屁股，真的会坏掉的！」`);
        await era.printAndWait(
          `${player_name}用力按住挣扎着的${target_name}，将连串的肛珠强行塞入了肛门之中…`,
        );
        kojo.肛珠 = 2;
      }

      return 0;
    }

    // 脱着時（TEQUIP:19 == 0）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.肛珠着脱 < 4 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「这，这就要——呃啊啊啊！${target_name}的肛门${heart(1)} 舒服得要登天了${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}肛门里的珠串被一口气全部拔了出来，极度的快感让她忍不住发出了淫浪的尖叫，腰身颤抖个不停，肛门痉挛得一张一合着………`,
      );
      kojo.肛珠着脱 = 4;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.肛珠着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「哈啊…哈啊…不，不要这样…拔出几颗……就停下来一次…${target_name}的肛门…会受不了的…啊啊啊！」`,
      );
      await era.printAndWait(
        `${player_name}故意时缓时急地抽弄着${target_name}肛门里的珠串，欣赏着${target_name}拼命忍耐的表情，再一下子突然全部抽出，看着${target_name}因为极度的快感刺激而全身脱力，瘫倒在地上，敏感的肛门还在一张一合……`,
      );
      kojo.肛珠着脱 = 3;
    } else if (
      chara(target).system.肛门感觉 >= 3 &&
      (kojo.肛珠着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // A感覚Lv3以上
      await era.printAndWait(`「不……不能这样……一次全部拔出去啊啊啊！」`);
      await era.printAndWait(
        `${target_name}肛门里的珠串被一口气全部拔了出来，肛门极度的快感让她忍不住发出淫浪的尖叫声，双手紧紧地抓着床单，几乎要岔过气去…`,
      );
      kojo.肛珠着脱 = 2;
    } else if (kojo.肛珠着脱 < 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(`「好痛啊啊啊啊！会坏掉的，真的会坏掉的！」`);
      await era.printAndWait(
        `${target_name}肛门里的珠串被一口气强行拔了出来，整个人因为过度的刺激而脱力，瘫倒在地上，眼泪和口水全部流了出来，红肿的肛门还在一张一合……`,
      );
      kojo.肛珠着脱 = 1;
    }
    return 0;
  }

  // IF SELECTCOM == 20（正常位 CFLAG:321）
  if (era_flag.selectcom === 20) {
    // \@TALENT:PLAYER:121 == 0 && TALENT:PLAYER:122 == 0 ? 电动假阳具 # 阴茎\@
    const weapon =
      era0(`talent:${player}:121`) === 0 && era0(`talent:${player}:122`) === 0
        ? '电动假阳具'
        : '阴茎';
    if (kojo.正常位 === 0) {
      // 初めて
      const virgin = era.get(`talent:${target}:0`) === 1;
      if (virgin) {
        // 处女
        if (assi_mao) {
          if (era.get(`talent:${target}:76`) === 1) {
            // 淫乱
            await era.printAndWait(
              `『哎哎，有点激动呢～姐姐的第一次，就由我收下了哦！』`,
            );
            await era.printAndWait(
              `${target_name}被${player_name}压在身下，分开的双腿之间，少女最私密的堡垒与最后的防线被${weapon}一口气突入了。`,
            );
            await era.printAndWait(
              `「啊啊啊！插…插进来了…哈啊…哈啊${heart(1)} ${player_name}…姐姐现在开始就…成为女人了…第一次给了自己妹妹的感觉…好奇怪${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}处女的蜜穴被${player_name}一口气贯通到底。`,
            );
            await era.printAndWait(
              `${player_name}大声喘息着，完全陶醉于夺走姐姐处女之身的强烈的心理快感中。`,
            );
            await era.printAndWait(
              `『姐姐的处女……被我夺走了${heart(1)} 从今以后，姐姐就是属于我的了${heart(1)}』`,
            );
            await era.printAndWait(
              `「哈啊…啊啊…已经…没法思考了。尽情地…侵犯姐姐吧…姐姐是属于${player_name}的东西了…哈啊…啊啊啊${heart(1)}」`,
            );
          } else if (era.get(`talent:${target}:85`) === 1) {
            // 爱慕
            await era.printAndWait(
              `『哎哎，有点激动呢～姐姐的第一次，就由我收下了哦！！』`,
            );
            await era.printAndWait(
              `${target_name}被${player_name}强行压在身下，分开的双腿之间，少女最私密的堡垒与最后的防线被${weapon}一口气突入了。`,
            );
            await era.printAndWait(
              `「住手，住手啊！放开我！！我的处女…是属于魔王大人的啊！不要啊啊啊啊——」`,
            );
            await era.printAndWait(
              `${target_name}处女的蜜穴被${player_name}一口气贯通到底。`,
            );
            await era.printAndWait(
              `${player_name}大声喘息着，完全陶醉于夺走姐姐处女之身的强烈的心理快感中。`,
            );
            await era.printAndWait(
              `『姐姐的处女……被我夺走了${heart(1)} 从今以后，姐姐就是属于我的了${heart(1)}』`,
            );
            await era.printAndWait(
              `「为…为什么要这么做…魔王大人…为什么……呜呜呜呜」`,
            );
          } else {
            // それ以外
            await era.printAndWait(
              `『嘿嘿嘿…魔王大人答应把姐姐的第一次赏给我了！』`,
            );
            await era.printAndWait(
              `${target_name}被${player_name}强行压在身下，分开的双腿之间，少女最私密的堡垒与最后的防线被${weapon}一口气突入了。`,
            );
            await era.printAndWait(
              `「放开我，放开我！不要，不要啊！我们是姐妹啊，不可以这——啊啊啊好痛，痛死了！！救命啊…来人救救我！！」`,
            );
            await era.printAndWait(
              `${target_name}处女的蜜穴被${player_name}一口气贯通到底。`,
            );
            await era.printAndWait(
              `${player_name}大声喘息着，完全陶醉于夺走姐姐处女之身的强烈的心理快感中。`,
            );
            await era.printAndWait(
              `『姐姐的处女……被我夺走了${heart(1)} 从今以后，姐姐就是属于我的了${heart(1)}』`,
            );
            await era.printAndWait(
              `「好痛…痛死了啊啊……拔出去，拔出去啊，求求你了！！」`,
            );
          }
        } else if (era.get(`talent:${target}:76`) === 1) {
          // 淫乱
          await era.printAndWait(
            `「哈啊…啊啊${heart(1)} 终于…终于等到这一刻了${heart(1)} 啊啊…呃啊啊 ${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被${player_name}抱在身下，分开的双腿之间，少女最私密的堡垒与最后的防线被一口气贯通到底。`,
          );
          await era.printAndWait(
            `${player_name}丝毫没有顾虑${target_name}是第一次，无情地侵犯，蹂躏着身下的娇躯，而${target_name}则回以淫媚的笑颜和极尽享受的娇声浪喘。`,
          );
          await era.printAndWait(
            `「原来…做爱…是这么美妙的…事情…啊啊！你应该早一点让我领略的啊啊啊…干我…用力干我…再用力${heart(1)}」`,
          );
          await era.printAndWait(
            `随着最后一处阵地的沦陷，${target_name}在${player_name}的侵犯中彻底蜕变，堕落。那个曾经纯洁无暇的乡下少女，终于彻底消失了……`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 爱慕
          await era.printAndWait(
            `「哈啊…啊啊${heart(1)}…魔王大人…我准备好了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被${player_name}抱在身下，分开的双腿之间，少女最私密的堡垒与最后的防线被一口气贯通到底。`,
          );
          await era.printAndWait(
            `${player_name}丝毫没有顾虑${target_name}是第一次，无情地侵犯，蹂躏着身下的娇躯，而${target_name}则回以欣喜的笑颜和痛苦与享受交织的喘息。`,
          );
          await era.printAndWait(
            `「呃啊啊…啊啊${heart(1)} 虽然…有点痛…魔王大人…从现在开始…我就永远属于你了…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}处女膜破裂，初经人事的痛楚，被与${player_name}第一次交合的感动与爱意淹没了………`,
          );
        } else {
          // それ以外
          await era.printAndWait(
            `「住手，住手啊…放开我，快放开我！不——要——啊啊啊啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}被${player_name}强行抱在身下，分开的双腿之间，少女最私密的堡垒与最后的防线被一口气贯通到底。`,
          );
          await era.printAndWait(
            `${player_name}丝毫没有顾虑${target_name}是第一次，无情地侵犯，蹂躏着身下的娇躯，聆听着${target_name}因为极度痛苦和屈辱而尖叫着。`,
          );
          await era.printAndWait(
            `「啊啊…好痛，好痛。终于…要结，结束了吗？…什…什么！？不要…不要射在里面！不要！！！放开我！！」`,
          );
        }
      } else {
        // 非处女
        if (assi_mao) {
          if (era.get(`talent:${target}:76`) === 1) {
            // 淫乱
            await era.printAndWait(
              `『哈啊，${player_name}插进姐姐的小穴里了${heart(1)}』`,
            );
            await era.printAndWait(
              `${target_name}被${player_name}压在身下，张开的双腿之间，爱液泛滥的蜜穴被${weapon}一口气贯通到底。`,
            );
            await era.printAndWait(
              `「啊啊…嗯啊啊…蜜穴…被塞的满满的了${heart(1)} 才刚刚插进来…就已经感觉…要高潮了一样${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}与${player_name}的身体交缠在一起，沉沦在姐妹乱伦的心理和生理双重快感之中。`,
            );
            await era.printAndWait(
              `『${player_name}最喜欢姐姐的蜜穴了…和魔王的肉棒一样喜欢${heart(1)}』`,
            );
          } else if (era.get(`talent:${target}:85`) === 1) {
            // 爱慕
            await era.printAndWait(
              `『哈啊，${player_name}插进姐姐的小穴里了${heart(1)}』`,
            );
            await era.printAndWait(
              `${target_name}被${player_name}压在身下，张开的双腿之间，爱液泛滥的蜜穴被${weapon}一口气贯通到底。`,
            );
            await era.printAndWait(
              `「啊啊啊…插…插进来了…不，不要那么用力，${player_name}…姐姐下面…撑得难受！」`,
            );
            await era.printAndWait(
              `${target_name}被${player_name}压在身下，持续地侵犯着蜜穴。`,
            );
            await era.printAndWait(
              `『姐姐说什么呢？这样侵犯姐姐，我可是舒服得很呐，姐姐也应该学会享受才对${heart(1)}』`,
            );
          } else {
            // それ以外
            await era.printAndWait(
              `『哈啊，${player_name}插进姐姐的小穴里了${heart(1)}』`,
            );
            await era.printAndWait(
              `${target_name}被${player_name}压在身下，张开的双腿之间，少女的蜜穴被${weapon}一口气贯通到底。`,
            );
            await era.printAndWait(
              `「啊啊…好痛啊，饶了姐姐吧，求你了…不要再欺负姐姐了…」`,
            );
            await era.printAndWait(
              `${player_name}对${target_name}的哀求置若罔闻，继续侵犯着${target_name}的蜜穴。`,
            );
            await era.printAndWait(
              `『这怎么能算是欺负呢？姐姐应该学会享受才对${heart(1)}』`,
            );
          }
        } else if (era.get(`talent:${target}:76`) === 1) {
          // 淫乱
          await era.printAndWait(
            `「哈啊…啊啊啊…再用力一点，再深一点…魔王大人…请像对待最下流的婊子那样粗暴地对待我吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被${player_name}抱在身下，分开的双腿之间，爱液泛滥的蜜穴被一口气贯通到底。`,
          );
          await era.printAndWait(
            `而作为回应，${target_name}的蜜穴也紧紧裹住${player_name}的阴茎，像是在主动吸吮着一般。`,
          );
          await era.printAndWait(
            `「啊啊啊…尽情地侵犯${target_name}的蜜穴吧…哈啊…啊啊…毫不留情地…顶到子宫口吧！」`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 爱慕
          await era.printAndWait(
            `「哈啊…啊啊啊…魔王大人…抱紧我…侵犯我${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被${player_name}抱在身下，分开的双腿之间，爱液泛滥的蜜穴被一口气贯通到底。`,
          );
          await era.printAndWait(
            `而作为回应，${target_name}的蜜穴也紧紧裹住${player_name}的阴茎，像是在主动吸吮着一般。`,
          );
          await era.printAndWait(
            `「嗯啊…啊啊${heart(1)} 舒服得…整个人…感觉…都要融化了…${heart(1)}」`,
          );
        } else {
          // それ以外
          await era.printAndWait(
            `「住手，住手啊啊…不要啊！啊啊啊插进来了…又插进来了……」`,
          );
          await era.printAndWait(
            `${target_name}被${player_name}强行抱在身下，分开的双腿之间，少女的蜜穴被一口气贯通到底。`,
          );
          await era.printAndWait(
            `${player_name}毫不留情地侵犯，蹂躏着${target_name}的娇躯，聆听着${target_name}因为痛苦和屈辱的尖叫和悲泣。`,
          );
          await era.printAndWait(
            `「好痛，好痛啊啊啊！放过我吧，求求你，放过我吧！」`,
          );
        }
      }
      kojo.正常位 = 1;
      return 0;
    }

    // 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.正常位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        if (rand_n(3) === 0) {
          await era.print(
            `『姐姐的蜜穴……真是舒服得让人无法忍受啊啊${heart(1)}』`,
          );
          await era.printAndWait(
            `${target_name}被${player_name}压在身下，张开的双腿之间，爱液泛滥的蜜穴被${weapon}一口气贯通到底。`,
          );
          await era.printAndWait(
            `「啊啊…嗯啊啊…姐姐的…蜜穴，被${player_name}塞得慢慢的了…哈啊…哈啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}与${player_name}的身体交缠在一起，沉沦在姐妹乱伦的心理和生理双重快感之中。`,
          );
          await era.printAndWait(
            `『${player_name}最喜欢姐姐的蜜穴了…和魔王的肉棒一样喜欢${heart(1)}』`,
          );
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「呼呼…哈啊…姐姐也是…舒服得…要说不出话了${heart(1)} 蜜穴被${player_name}侵犯的感觉…太棒了${heart(1)} 啊啊啊${heart(1)}」`,
            );
          }
        } else if (rand_n(2) === 0) {
          await era.print(`『哈啊啊…插进去了哦，姐姐…${heart(1)}』`);
          await era.printAndWait(
            `${target_name}被${player_name}压在身下，张开的双腿之间，爱液泛滥的蜜穴被${weapon}一口气贯通到底。`,
          );
          await era.printAndWait(
            `紧接着，${player_name}动起腰，开始在${target_name}的蜜穴里连续地快速抽插着。`,
          );
          await era.printAndWait(`「哈啊…嗯啊啊…好，好厉害…啊啊${heart(1)}」`);
          await era.printAndWait(
            `『哈啊…姐姐口水眼泪都一起出来了呢${heart(1)} 一副要登顶了一样的表情呢♪』`,
          );
          if (chara(target).system.私处感觉 >= 3) {
            await era.print(
              `「什，什么表情啊…哈啊…嗯啊啊…不，不行了……舒服得…说，说不出话了${heart(1)}」`,
            );
            await era.printAndWait(`『哈啊…就是现在的表情啊！』`);
          }
        } else {
          await era.print(`『啊哈…插到姐姐的…小穴里了${heart(1)}姐姐…姐姐…』`);
          await era.printAndWait(
            `${player_name}将${target_name}压在身下，在${target_name}的蜜穴里一口气顶到了最深处。`,
          );
          await era.printAndWait(
            `${weapon}抽插蜜穴时发出的不堪入耳的声音在房间里回荡着。`,
          );
          await era.printAndWait(
            `「嗯啊啊…啊 啊${heart(1)} ${player_name}${heart(1)} ${player_name}${heart(1)} 啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}和${player_name}的身体交缠在一起，互相呼唤着对方，，沉沦在姐妹乱伦的心理和生理双重快感之中。`,
          );
          await era.printAndWait(
            `『${player_name}好舒服啊……你感觉舒服吗，姐姐？』`,
          );
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「啊啊啊${heart(1)} 舒服得…快说不出话了…${heart(1)} 整个人…好像要疯了一样${heart(1)}」`,
            );
          }
        }
        kojo.正常位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.正常位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        if (rand_n(3) === 0) {
          await era.print(
            `『啊啊啊，姐姐的蜜穴…真是舒服得让人无法忍受啊啊${heart(1)}』`,
          );
          await era.printAndWait(
            `${target_name}被${player_name}压在身下，张开的双腿之间，爱液泛滥的蜜穴被${weapon}一口气贯通到底。`,
          );
          await era.printAndWait(
            `「哈啊…嗯啊啊…${player_name}…稍微…不要那么粗暴……」`,
          );
          await era.printAndWait(
            `${player_name}对${target_name}的话置若罔闻，只顾动着腰，毫不留情地侵犯着${target_name}的蜜穴。`,
          );
          await era.printAndWait(`『要往更深的地方去了哦、姐姐♪』`);
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「哎啊啊…别…别…呃啊啊…子宫口…被顶到了啊啊…这个感觉…好奇怪啊啊${heart(1)}」`,
            );
          }
        } else if (rand_n(2) === 0) {
          await era.print(`『哈啊……插到姐姐的…小穴里了…${heart(1)}』`);
          await era.printAndWait(
            `${target_name}被${player_name}压在身下，张开的双腿之间，爱液泛滥的蜜穴被${weapon}一口气贯通到底。`,
          );
          await era.printAndWait(
            `紧接着，${player_name}动起腰，开始在${target_name}的蜜穴里连续地快速抽插着。`,
          );
          await era.printAndWait(
            `「哈啊…太…太激烈了…${player_name}…让姐姐…缓，缓一缓…！」`,
          );
          await era.printAndWait(
            `『姐姐明明一脸很舒服的表情呢，别装含蓄啦，大声一点喊出来，让魔王大人也欣赏一下姐姐叫床的样子吧？』`,
          );
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「啊啊…哈啊…啊啊啊，${player_name}…干得姐姐…好舒服…舒服得…要上天了……${heart(1)}」`,
            );
          }
        } else {
          await era.print(
            `『姐姐${heart(1)} 姐姐${heart(1)}人家喜欢你啊啊啊！！』`,
          );
          await era.printAndWait(
            `${player_name}将${target_name}压在身下，在${target_name}的蜜穴里一口气顶到了最深处。`,
          );
          await era.printAndWait(
            `${weapon}在蜜穴抽插时发出的不堪入耳的声音在房间里回荡着。`,
          );
          await era.printAndWait(
            `「哈啊…哈啊…快…不行了…蜜穴…感觉好奇怪…啊啊…呜啊啊！」`,
          );
          await era.printAndWait(`『你看、变得更舒服了哦姐姐！姐姐！』`);
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「啊啊…哈啊…啊啊啊，姐姐…好舒服…舒服得…要上天了……${heart(1)}」`,
            );
          }
        }
        kojo.正常位 = 5;
      } else if (
        mark(2) === 3 &&
        chara(target).system.私处感觉 >= 3 &&
        (kojo.正常位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3＋V感覚Lv3以上
        if (rand_n(3) === 0) {
          await era.print(
            `『姐姐的小穴已经变得这么色情了，一下子就插到里面去了${heart(1)}』`,
          );
          await era.printAndWait(
            `${target_name}爱液泛滥的蜜穴已经完全接纳了${player_name}的${weapon}。`,
          );
          await era.printAndWait(
            `「说，说什么呐…哈啊…哈啊…哪有…那种事…嗯啊啊啊！」`,
          );
          await era.print(
            `『哎哎，都已经舒服成这样了、姐姐为什么就不肯坦率点呢${heart(1)}』`,
          );
          await era.printAndWait(
            `蜜穴的强烈快感冲击下下，${target_name}无力的辩解被呻吟和娇喘取代`,
          );
        } else if (rand_n(2) === 0) {
          await era.print(
            `『哇哇哇，姐姐的色情小穴、吸得…这么紧呐${heart(1)}』`,
          );
          await era.printAndWait(
            `${target_name}爱液泛滥的蜜穴紧紧包裹着${player_name}的${weapon}。`,
          );
          await era.printAndWait(`「不行…不行啊…快拔出去…哈啊…嗯啊啊！」`);
          await era.print(
            `『从姐姐这么色情的小穴里拔出去？啊哈哈，别开玩笑了！我还没真正发力呢！』`,
          );
          await era.printAndWait(
            `蜜穴的强烈快感冲击下下，${target_name}无力的辩解被呻吟和娇喘取代`,
          );
        } else {
          await era.printAndWait(
            `「饶，饶了姐姐吧…啊啊…哈啊…真的…快不行了！」`,
          );
          await era.print(
            `『姐姐都舒服成这个样子了，怎么就说不行了呢♪ 我继续了哦！』`,
          );
          await era.printAndWait(
            `${target_name}爱液泛滥的蜜穴正在接受，或者说享受着${player_name}的${weapon}的连续蹂躏。`,
          );
          await era.printAndWait(`「舒服什么的……才没有啊啊…哈啊……嗯啊啊啊！」`);
          await era.printAndWait(
            `『嘿嘿，上面的嘴还逞强，下面那张可是已经认输了${heart(1)}』`,
          );
        }
        kojo.正常位 = 4;
      } else if (
        mark(2) === 3 &&
        (kojo.正常位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3
        await era.print(
          `『哈啊！姐姐，我要进去了哦${heart(1)}姐姐${heart(1)}』`,
        );
        await era.printAndWait(
          `${target_name}被${player_name}压在身下，张开的双腿之间，少女的蜜穴被${weapon}一口气贯通到底。`,
        );
        await era.printAndWait(`「为…为什么…这种事…呜呜呜」`);
        await era.printAndWait(
          `${target_name}已经完全放弃了抵抗，任由${player_name}侵犯着自己的蜜穴，只是从喉咙底发出哽咽的声音。`,
        );
        await era.printAndWait(
          `『呼呼…啊哈哈，姐姐终于变得老实了，终于感觉到快感了吗？』`,
        );
        kojo.正常位 = 3;
      } else if (kojo.正常位 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.print(
          `『哈啊…哈啊…侵犯姐姐的蜜穴，无论多少次都让人这么心情愉快呢${heart(1)}』`,
        );
        await era.printAndWait(
          `${target_name}被${player_name}强行压在身下，张开的双腿之间，少女的蜜穴被${weapon}一口气贯通到底。`,
        );
        await era.printAndWait(
          `「住，住手啊…呜呜呜…为什么…要这么对待姐姐，欺负姐姐…」`,
        );
        await era.printAndWait(
          `面对${player_name}对蜜穴的侵犯，${target_name}只能在口头上做着无力的抵抗`,
        );
        await era.printAndWait(
          `『欺负？才不是呢！姐姐没有也感觉到舒服吗${heart(1)}』`,
        );
        kojo.正常位 = 2;
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.正常位 <= 5 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      if (rand_n(3) === 0) {
        await era.printAndWait(
          `「哈啊…啊啊…还可以…再，再深一点…再往里一点…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被${player_name}抱在身下，爱液泛滥的蜜穴被贯通直入。`,
        );
        await era.printAndWait(
          `而作为回应，${target_name}的蜜穴，将${player_name}的阴茎紧紧裹住，好像主动吸吮起来了一般。`,
        );
        await era.printAndWait(
          `「尽情地侵犯我吧魔王大人…请毫不客气地…把${target_name}的蜜穴搞得一塌糊涂吧！」`,
        );
        if (chara(target).system.私处感觉 >= 3) {
          await era.printAndWait(
            `「呜啊啊…不行了…蜜穴…好舒服啊啊…舒服的…整个人都要疯了${heart(1)}」`,
          );
        }
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `${target_name}被${player_name}压在身下，张开的双腿之间，爱液泛滥的蜜穴被${weapon}一口气贯通到底。`,
        );
        await era.printAndWait(
          `随后，${player_name}对着${target_name}的蜜穴深处，开始了连续的抽插，每一次都顶到了最底。`,
        );
        await era.printAndWait(
          `「啊啊啊…太…太激烈了啊啊…哈啊啊${heart(1)} 魔王大人…原来…这么厉害${heart(1)}」`,
        );
        if (chara(target).system.私处感觉 >= 3) {
          await era.printAndWait(
            `被充分调教，开发的蜜穴传来的极度的快感，完全冲垮了${target_name}的理性，让她变得语无伦次。`,
          );
          await era.printAndWait(
            `「呼哈哈……肉穴肉穴肉穴爽上天了啊啊啊${heart(1)} 但是…还想要更多${heart(1)} 不要停，不要停呀啊啊${heart(1)}」`,
          );
        }
      } else {
        await era.printAndWait(`「哈啊…啊啊啊…好厉害…魔王大人…${heart(1)}」`);
        await era.printAndWait(
          `${player_name}将${target_name}压在身下，毫不留情地侵犯着爱液泛滥的蜜穴。`,
        );
        await era.printAndWait(
          `${weapon}在蜜穴抽插时发出的不堪入耳的声音在房间里回荡着。`,
        );
        await era.printAndWait(
          `「咿呀…哈啊…蜜穴…舒服得${heart(1)} 说不出话来了啊啊啊${heart(1)}」`,
        );
        if (chara(target).system.私处感觉 >= 3) {
          await era.printAndWait(
            `「魔王大人…请毫不留情地…侵犯${target_name}，把${target_name}的蜜穴弄坏吧${heart(1)} 把里面搅得一团糟${heart(1)} 怎样都好…让…${target_name}登天吧${heart(1)}」`,
          );
        }
      }
      kojo.正常位 = 6;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.正常位 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      if (rand_n(3) === 0) {
        await era.printAndWait(
          `「哈啊……哈啊……${target_name}准备好迎接魔王大人…的阴茎了${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被${player_name}抱在身下，爱液泛滥的蜜穴被贯通至底。`,
        );
        await era.printAndWait(
          `而作为回应，${target_name}的蜜穴，将${player_name}的阴茎紧紧裹住，好像主动吸吮起来了一般。`,
        );
        await era.printAndWait(
          `「啊哈…呜啊啊${heart(1)}好舒服…整个人…好像要融化……了一样${heart(1)}」`,
        );
        if (chara(target).system.私处感觉 >= 3) {
          await era.printAndWait(
            `「呜啊啊！不，不行了…太…舒服了…嗯啊…啊啊啊${heart(1)}」`,
          );
        }
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `${player_name}抱着身下的${target_name}，对着爱液泛滥的蜜穴开始缓慢而有节奏地抽送着。`,
        );
        await era.printAndWait(
          `「呜啊…魔王大人…为什么……要这么…慢慢的…哈啊${heart(1)}」`,
        );
        await era.printAndWait(
          `似乎是等不及了一般，${target_name}的蜜穴，将${player_name}的阴茎紧紧裹住，好像主动吸吮，摩擦了起来。`,
        );
        await era.printAndWait(
          `「拜，拜托了…魔王大人…请…请再快点…再用力点……疼爱…${target_name}的淫穴吧${heart(1)}」`,
        );
        if (chara(target).system.私处感觉 >= 3) {
          await era.printAndWait(
            `${player_name}听着身下娇躯的恳求，也终于认真了起来，突然加快了抽插的速度和力道。`,
          );
          await era.printAndWait(
            `「哈啊…啊啊啊！感，感觉到了魔王大人的…爱意了！哈啊…啊啊…好舒服啊${heart(1)} 啊啊啊${heart(1)}」`,
          );
        }
      } else {
        await era.printAndWait(
          `${player_name}将${target_name}压在身下，对着爱液泛滥的蜜穴，一口气贯通到了最深处。`,
        );
        await era.printAndWait(
          `阴茎与蜜穴结合的地方连续撞击着，发出了“啪嗒”“啪嗒”的不堪入耳的淫秽声响。`,
        );
        if (chara(target).system.私处感觉 >= 3) {
          await era.printAndWait(
            `「哈啊…呜啊啊…蜜穴…好舒服…舒服得要上天了…${heart(1)}」`,
          );
        }
        await era.printAndWait(
          `「啊啊啊…呜啊啊…魔王大人…我爱你…我爱你${heart(1)} 啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被${player_name}紧抱着的身体，因为生理和心理上极度的快感而不住地颤抖了起来。`,
        );
      }
      kojo.正常位 = 5;
    } else if (
      mark(2) === 3 &&
      chara(target).system.私处感觉 >= 3 &&
      (kojo.正常位 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3＋V感覚Lv3以上
      if (rand_n(3) === 0) {
        await era.printAndWait(`「哈啊…嗯啊啊…插，插进来了…」`);
        await era.printAndWait(
          `${target_name}被${player_name}抱在身下，爱液泛滥的蜜穴被贯通至底。`,
        );
        await era.printAndWait(
          `似乎已经接受了自己的命运，${target_name}不再反抗，而是发出了甘甜的娇喘，享受着交媾的快感。`,
        );
        await era.printAndWait(`「唔啊啊……哈啊…请稍微…稍微温柔一点……」`);
      } else if (rand_n(2) === 0) {
        await era.printAndWait(`「再稍…稍等一下啊啊…呜啊啊…哈啊」`);
        await era.printAndWait(
          `${target_name}被${player_name}压在身下，阴茎径直插入了爱液泛滥的蜜穴最深处。`,
        );
        await era.printAndWait(
          `「呜啊啊…啊啊！蜜穴被…被撑…得满满的……感觉…啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}蜜穴被${player_name}抽插的声音很快就被她自己因为快感而放声的娇喘盖过去了………`,
        );
      } else {
        await era.printAndWait(
          `「呜啊啊…！一下就插到……最里面去了…！哈啊！呀啊啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}被${player_name}压在身下，阴茎径直插入了爱液泛滥的蜜穴最深处。`,
        );
        await era.printAndWait(
          `${target_name}被充分调教，开发过的蜜穴，将${player_name}的阴茎紧紧裹住，好像主动吸吮起来了一般。`,
        );
        await era.printAndWait(`「哈啊…唔啊啊…为什么…会这么舒服的……」`);
      }
      kojo.正常位 = 4;
    } else if (
      mark(2) === 3 &&
      (kojo.正常位 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3
      await era.printAndWait(`「呜啊啊…啊啊…插，插进来了……啊啊！」`);
      await era.printAndWait(
        `${target_name}被${player_name}抱在身下，少女的蜜穴被贯通至底。`,
      );
      await era.printAndWait(
        `丝毫没有顾忌${target_name}的感受，${player_name}毫不留情地抽插了起来，持续侵犯着${target_name}的蜜穴。`,
      );
      await era.printAndWait(
        `「呜啊啊…会，会痛的啊…请…请温柔一点…拜托了……！」`,
      );
      kojo.正常位 = 3;
    } else if (kojo.正常位 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(`「放开我！放开我！住手啊…不要——插进来啊啊啊！」`);
      await era.printAndWait(
        `${target_name}被${player_name}强行压在身下，阴茎径直插入了蜜穴最深处。`,
      );
      await era.printAndWait(
        `丝毫不顾忌身下的${target_name}痛苦的哀鸣，${player_name}毫不留情地抽插了起来，持续侵犯着${target_name}的蜜穴。`,
      );
      await era.printAndWait(
        `「啊啊啊啊…好痛啊啊！放过我吧，求求你，放过我吧！呜啊啊啊！」`,
      );
      kojo.正常位 = 2;
    }
    return 0;
  }

  // IF SELECTCOM == 21（背后位 CFLAG:322）
  if (era_flag.selectcom === 21) {
    // \@TALENT:PLAYER:121 == 0 && TALENT:PLAYER:122 == 0 ? 电动假阳具 # 阴茎\@
    const weapon =
      era0(`talent:${player}:121`) === 0 && era0(`talent:${player}:122`) === 0
        ? '电动假阳具'
        : '阴茎';
    // \@TALENT:PLAYER:121 == 0 && TALENT:PLAYER:122 == 0 ? 震动假阳具 # 阴茎\@
    const weapon_doggy =
      era0(`talent:${player}:121`) === 0 && era0(`talent:${player}:122`) === 0
        ? '震动假阳具'
        : '阴茎';
    if (kojo.背后位 === 0) {
      // 初めて
      const virgin = era.get(`talent:${target}:0`) === 1;
      if (virgin) {
        // 处女
        if (assi_mao) {
          if (era.get(`talent:${target}:76`) === 1) {
            // 淫乱
            await era.printAndWait(
              `『嘿嘿嘿…姐姐的处女身，就要到今天为止了呢${heart(1)}』`,
            );
            await era.printAndWait(
              `${player_name}扶着趴在床上的${target_name}的腰，从身后用${weapon_doggy}在蜜穴口来回摩擦，挑逗着。`,
            );
            await era.printAndWait(
              `「呜啊啊…不，不要这样啦…快点…给我肉棒…肉棒…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}不断扭着腰肢，淫荡地诱惑着${player_name}。作为回应，${player_name}猛地插入了姐姐的处女蜜穴之中。`,
            );
            await era.printAndWait(
              `『姐姐的处女……被我夺走了${heart(1)} 从今以后，姐姐就是属于我的了${heart(1)}』`,
            );
            await era.printAndWait(
              `「呜啊…啊啊啊…我的第一次…居然被自己的妹妹夺走了…但为什么…一点都不难过…反而感觉好…好快乐…好舒服…哈啊…嗯啊…啊啊啊${heart(1)}」`,
            );
          } else if (era.get(`talent:${target}:85`) === 1) {
            // 爱慕
            await era.printAndWait(
              `『嘿嘿嘿…姐姐的处女身，就要到今天为止了呢${heart(1)}』`,
            );
            await era.printAndWait(
              `${player_name}扶着趴在床上的${target_name}的腰，从身后用${weapon_doggy}在蜜穴口来回摩擦，挑逗着。`,
            );
            await era.printAndWait(
              `「住，住手啊啊…快放开姐姐…姐姐的第一次…是要献给魔王大人的啊啊…呜呜呜！」`,
            );
            await era.printAndWait(
              `${target_name}拼命扭着腰想要从${player_name}身前逃脱，但少女最私密的堡垒与最后的防线依旧被${player_name}用${weapon_doggy}一口气贯通，夺走了处子之身。`,
            );
            await era.printAndWait(
              `『姐姐的处女……被我夺走了${heart(1)} 从今以后，姐姐就是属于我的了${heart(1)}』`,
            );
            await era.printAndWait(
              `「不要啊啊啊啊——魔王大人…为，为什么…要这么对我…呜呜呜！」`,
            );
          } else {
            // それ以外
            await era.printAndWait(
              `『嘿嘿嘿…魔王大人答应把姐姐你的第一次赏给我了！』`,
            );
            await era.printAndWait(
              `${player_name}紧抱着趴在床上的${target_name}的腰，从身后用${weapon_doggy}在蜜穴口来回摩擦，挑逗着。`,
            );
            await era.printAndWait(
              `「不要不要不要不要！我们是姐妹啊，不可以做这样的事情…住手，住手啊！！」`,
            );
            await era.printAndWait(
              `${target_name}拼命扭着腰想要从${player_name}身前逃脱，但少女最私密的堡垒与最后的防线依旧被${player_name}用${weapon_doggy}一口气贯通，夺走了处子之身。`,
            );
            await era.printAndWait(
              `『姐姐的处女……被我夺走了${heart(1)} 从今以后，姐姐就是属于我的了${heart(1)}』`,
            );
            await era.printAndWait(
              `「啊啊啊——好痛，好痛啊…拔出去，快拔出去啊，姐姐求求你了！」`,
            );
          }
        } else if (era.get(`talent:${target}:76`) === 1) {
          // 淫乱
          await era.printAndWait(
            `「哈啊…啊啊…插进来了…整根都…嗯啊啊${heart(1)}…感觉…好棒${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}扶着${target_name}的腰，从背后进入了${target_name}已经爱液泛滥的处女蜜穴之中，一直贯通到底。`,
          );
          await era.printAndWait(
            `丝毫没有顾忌${target_name}处女的身份，${player_name}尽情地蹂躏，侵犯着${target_name}的蜜穴。心里和生理的双重快感下，${target_name}整个腰身挺了起来，淫浪地娇喘着。`,
          );
          await era.printAndWait(
            `「哈啊…啊啊…第一次…做爱…居然用的是…这种动物一样的姿势…但是…哈啊…实在是…实在是太舒服了…${heart(1)}」`,
          );
          await era.printAndWait(
            `随着最后一处阵地的沦陷，${target_name}在${player_name}的侵犯中彻底蜕变，堕落。那个曾经纯洁无暇的乡下少女，终于彻底消失了……`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 爱慕
          await era.printAndWait(
            `「哈啊…啊啊！魔王大人…插进来了…整根都…嗯啊啊${heart(1)} …感觉…好棒${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}扶着${target_name}的腰，从背后进入了${target_name}已经爱液泛滥的处女蜜穴之中，一直贯通到底。`,
          );
          await era.printAndWait(
            `丝毫没有顾忌${target_name}处女的身份，${player_name}尽情地蹂躏，侵犯着${target_name}的蜜穴。心里和生理的双重快感下，${target_name}整个腰身挺了起来，发出了幸福的呻吟。`,
          );
          await era.printAndWait(
            `「呜啊…嗯啊啊${heart(1)} 能把处女…奉献给…魔王大人${heart(1)} 是${target_name}…三生有幸啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}处女膜破裂，初经人事的痛楚，被与${player_name}第一次交合的感动与爱意淹没了………`,
          );
        } else {
          // それ以外
          await era.printAndWait(
            `「不，不要，不要啊！放过我吧…求求你了，求求你了…不行啊啊啊啊啊！」`,
          );
          await era.printAndWait(
            `${player_name}强行抓着${target_name}的腰，从背后进入了${target_name}未经人事的蜜穴之中，一直贯通到底。`,
          );
          await era.printAndWait(
            `丝毫没有顾忌${target_name}处女的身份，${player_name}尽情地蹂躏，侵犯着${target_name}的蜜穴。`,
          );
          await era.printAndWait(
            `「停…停下啊…好痛，痛死了！这样的姿势…不是把我当狗一样吗…住手啊，快住手啊！呜啊啊啊！！」`,
          );
        }
      } else if (assi_mao) {
        if (era.get(`talent:${target}:76`) === 1) {
          // 淫乱
          await era.printAndWait(
            `『哈啊…姐姐的蜜穴最深处，这次要一口气进入了哦…${heart(1)}』`,
          );
          await era.printAndWait(
            `${player_name}扶着趴在床上的${target_name}的腰，从身后用${weapon_doggy}径直插到了底。`,
          );
          await era.printAndWait(
            `「呜啊啊！感觉到了…嗯啊啊…蜜穴被塞得满满的…好舒服…舒服得要上天了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}感受着被妹妹从背后侵犯的极度快感，发出了仿佛融化一般的喘息。`,
          );
          await era.printAndWait(
            `『啊啊！姐姐这就要去了吗，这可才刚刚开始呀${heart(1)}』`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 爱慕
          await era.printAndWait(
            `『哈啊…姐姐的蜜穴最深处，这次要一口气进入了哦…${heart(1)}』`,
          );
          await era.printAndWait(
            `${player_name}扶着趴在床上的${target_name}的腰，从身后用${weapon_doggy}径直插到了底。`,
          );
          await era.printAndWait(
            `「呜啊啊！真…真是的…为什么要用这样的…姿势……！」`,
          );
          await era.printAndWait(
            `${target_name}忍受着妹妹从背后的侵犯，因为难受而呻吟了起来。`,
          );
          await era.printAndWait(
            `『正戏才刚刚开始哦，姐姐${heart(1)} 我要开始发力了${heart(1)}』`,
          );
        } else {
          // それ以外
          await era.printAndWait(
            `『哈啊…姐姐的蜜穴最深处，这次要一口气进入了哦…${heart(1)}』`,
          );
          await era.printAndWait(
            `${player_name}扶着趴在床上的${target_name}的腰，从身后用${weapon_doggy}径直插到了底。`,
          );
          await era.printAndWait(
            `「住，住手啊…只有…狗才会……用这样的姿势交配……我们…不可以啊！」`,
          );
          await era.printAndWait(
            `${target_name}被妹妹从背后侵犯着，发出了痛苦和屈辱的哀鸣。`,
          );
          await era.printAndWait(
            `『哇啊…哈啊…就是要这样…侵犯母狗一样的姐姐…才更…舒服啊${heart(1)}』`,
          );
        }
      } else if (era.get(`talent:${target}:76`) === 1) {
        // 淫乱
        await era.printAndWait(
          `「进…进来了${heart(1)} 像野兽一样的姿势…进到最里面了…啊啊…嗯啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${player_name}扶着${target_name}的腰，从背后进入了${target_name}的蜜穴之中，一直贯通到底。`,
        );
        await era.printAndWait(
          `而${target_name}爱液泛滥的蜜穴也将${player_name}的阴茎紧紧裹住，不住地摩擦着。`,
        );
        await era.printAndWait(
          `「哈啊…呜啊啊！还可以…再深一点…把我当成淫荡的小母狗那样侵犯吧${heart(1)}啊啊…啊啊啊…」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        // 爱慕
        await era.printAndWait(
          `「这样的姿势…有点害怕…看不见…魔王大人的脸…不过…呜啊啊！一，一下子就进到这么深里面去了…哈啊……啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${player_name}扶着${target_name}的腰，从背后进入了${target_name}的蜜穴之中，一直贯通到底。`,
        );
        await era.printAndWait(
          `而${target_name}爱液泛滥的蜜穴也将${player_name}的阴茎紧紧裹住，不住地摩擦着。`,
        );
        await era.printAndWait(
          `「真，真是${heart(1)} 毫不留情啊…啊啊…${heart(1)} 呜呜啊啊啊${heart(1)}」`,
        );
      } else {
        // それ以外
        await era.printAndWait(
          `「这种…这种姿势…不是跟野兽没有区别吗…不要啊，不要啊啊啊！！！」`,
        );
        await era.printAndWait(
          `${player_name}扶着${target_name}的腰，从背后进入了${target_name}的蜜穴之中，一直贯通到底。`,
        );
        await era.printAndWait(
          `丝毫不顾及${target_name}因为痛苦和屈辱发出的哀鸣，${player_name}动着腰，开始毫不留情地抽插着${target_name}的蜜穴。`,
        );
        await era.printAndWait(
          `「啊啊啊…太深了…太深了啊啊！放过我吧，求求你，放过我吧！」`,
        );
      }
      kojo.背后位 = 1;
      return 0;
    }

    // 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        if (rand_n(3) === 0) {
          await era.print(
            `『哈啊…姐姐的蜜穴…全部由我来填满吧啊啊啊啊…${heart(1)}』`,
          );
          await era.printAndWait(
            `${player_name}扶着${target_name}的腰，从背后进入了${target_name}的蜜穴之中。`,
          );
          await era.printAndWait(
            `「哈啊！真的…被塞得满满的了…啊啊…好…好舒服……${heart(1)}」`,
          );
          await era.printAndWait(
            `蜜穴被妹妹连续抽插的快感让${target_name}发出了淫浪的喘息。`,
          );
          await era.print(
            `『呼呼，姐姐别那么快就去了啊，我可还没开始发力呢${heart(1)}』`,
          );
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「啊啊…哈啊…${player_name}好厉害${heart(1)} 我从来不知道…被自己的妹妹侵犯…是这么……舒服的事情啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `『当然啦，我接下来还会让姐姐更舒服的哦${heart(1)}』`,
            );
          }
        } else if (rand_n(2) === 0) {
          await era.print(
            `『这次不把姐姐的蜜穴侵犯到高潮，我是不会停下的哦！』`,
          );
          await era.print(
            `${player_name}扶着趴在床上的${target_name}的腰，从身后用${weapon_doggy}不由分说地插了进去。`,
          );
          await era.printAndWait(
            `${target_name}被侵犯的蜜穴，发出了“啪嗒”“啪嗒”的不堪入耳的淫秽声响。`,
          );
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「哈啊…要，要去了…肉穴…被妹妹侵犯得…要去了啊啊啊啊${heart(1)}」`,
            );
            await era.print(
              `被充分调教和开发过的蜜穴传来极度的快感，让${target_name}翻了白眼，意识不清地淫叫着。`,
            );
            await era.printAndWait(
              `『哎呀呀哎呀呀，姐姐这就高潮了，还在魔王大人面前露出了啊嘿颜！！』`,
            );
          } else {
            await era.printAndWait(
              `「呜啊……啊啊……继，继续这样侵犯姐姐吧，${player_name}${heart(1)}」`,
            );
            await era.print(
              `蜜穴被持续侵犯传来的极度快感让${target_name}发出了甘甜悦耳的娇喘声。`,
            );
            await era.printAndWait(`『好，我会一直侵犯到姐姐失神为止哦！』`);
          }
        } else {
          await era.printAndWait(
            `「啊……嗯啊啊……在魔王大人的注视下被侵犯……更有感觉了啊啊${heart(1)}」`,
          );
          await era.print(`『哎哎，姐姐真的变成只想着交配的淫乱母猪了啊！』`);
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `${player_name}用${weapon}从后面毫不留情地侵犯着${target_name}的蜜穴。`,
            );
            await era.printAndWait(
              `${target_name}的蜜穴交合时发出的声音越来越响，却还是被${target_name}的娇喘掩盖过去了。`,
            );
            await era.print(
              `「呜啊啊${heart(1)} 就，就是这样呢${heart(1)} 啊啊啊${heart(1)} 要，要去了……要在魔王大人的视线下高潮了啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `『啊哈哈……被魔王大人这样看着就会高潮得更厉害的姐姐，真的无药可救了呢！』`,
            );
          } else {
            await era.print(
              `${player_name}抓着${target_name}的腰，用${weapon}在蜜穴里用力抽插着。`,
            );
            await era.print(`${target_name}的腰身一扭一扭地，不住地呻吟着。`);
            await era.printAndWait(
              `「呜啊……啊啊啊……就，就这样……毫不留情地侵，侵犯姐姐的小穴吧！」`,
            );
          }
        }
        kojo.背后位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.背后位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        if (rand_n(3) === 0) {
          await era.print(`『嗯啊啊……插到姐姐的最里面去了啊${heart(1)}』`);
          await era.printAndWait(
            `${player_name}抓着${target_name}的腰，用${weapon}在蜜穴里用力抽插着。`,
          );
          await era.printAndWait(
            `「呜……呜啊……太，太激烈了……稍微……温柔一点啦！」`,
          );
          await era.print(
            `阴道完全容纳了妹妹胯间的${target_name}虽然嘴上这么说着，却忍不住娇喘了起来。`,
          );
          await era.printAndWait(
            `『什么呀，才刚刚开始哦，姐姐${heart(1)} 更厉害的要来了！${heart(1)}』`,
          );
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「唔啊……啊啊啊……被，被这样抽插的话……人家要，要高潮了啊啊！」`,
            );
            await era.printAndWait(
              `被充分开发过的蜜穴被这样侵犯着，${target_name}已经完全沉浸在连绵的快感之中……`,
            );
          }
        } else if (rand_n(2) === 0) {
          await era.print(`『来吧，姐姐……在妹妹的侵犯下尽情的高潮吧！』`);
          await era.print(
            `${player_name}用${weapon}从后面毫不留情地侵犯着${target_name}的蜜穴。`,
          );
          await era.printAndWait(`两人的交合处发出一声声不堪入耳的响声。。`);
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「不，不行啊……这样的姿势被侵犯的话……一下子……就要去了啊啊！」`,
            );
            await era.print(
              `被充分开发过的蜜穴被妹妹用后背位侵犯着，${target_name}却只感觉到更强烈的快感…`,
            );
            await era.printAndWait(
              `『哎呀呀，姐姐口水眼泪都出来了，要在魔王面前高潮得一塌糊涂了吗！！』`,
            );
          } else {
            await era.printAndWait(`「哎……哎啊啊……饶了姐姐吧……！」`);
            await era.printAndWait(
              `蜜穴被妹妹连续抽插的快感让${target_name}发出了甘甜的喘息。`,
            );
            await era.printAndWait(`『什么啦，明明很享受的样子！』`);
          }
        } else {
          await era.printAndWait(
            `「呜……呜啊啊……饶了姐姐吧……至少……不要当着魔王大人的面……这样侵犯姐姐啊啊！」`,
          );
          await era.print(
            `『嘿嘿嘿，这可是魔王大人的命令哦，难道你想不听话吗${heart(1)}』`,
          );
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `${player_name}用${weapon}从后面毫不留情地侵犯着${target_name}的蜜穴。`,
            );
            await era.printAndWait(
              `${target_name}的蜜穴交合时发出的声音越来越响，却还是被${target_name}的娇喘掩盖过去了。`,
            );
            await era.print(
              `「咿啊……啊啊啊${heart(1)} 虽然这么说……但是这样被魔王大人看着……还是很羞耻啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `『哼哼，明明喊的比平时都要大声呢，当着魔王大人的面被侵犯，感觉更舒服了吧！』`,
            );
          } else {
            await era.printAndWait(
              `${player_name}抓着${target_name}的腰，用${weapon}在蜜穴里用力抽插着。`,
            );
            await era.printAndWait(
              `${target_name}好像要逃避一样的扭动着腰身，却只让${player_name}更加兴奋起来。`,
            );
            await era.print(
              `『姐姐的表情，好像马上就要高潮了呢，魔王大人快看啊！』`,
            );
            await era.printAndWait(`「不，不要……不要看啊，魔王大人！」`);
          }
        }
        kojo.背后位 = 5;
      } else if (
        mark(2) === 3 &&
        chara(target).system.私处感觉 >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3＋V感覚Lv3以上
        if (rand_n(3) === 0) {
          await era.print(`『呜哇哇……姐姐的小穴……好暖好舒服！』`);
          await era.printAndWait(
            `${player_name}抓着${target_name}的腰，用${weapon}在蜜穴里用力抽插着。`,
          );
          await era.printAndWait(
            `「呜……呜啊啊……被，被这种姿势侵犯……啊啊啊！」`,
          );
          await era.print(
            `激烈的交合下，${target_name}的蜜穴里爱液更泛滥地涌了出来`,
          );
          await era.printAndWait(
            `『嘿嘿，姐姐的声音听起来也好像很享受呢，要高潮了吗？要高潮了吗？』`,
          );
        } else if (rand_n(2) === 0) {
          await era.print(`『呜哇哇……姐姐真是最棒了……人也是，小穴也是！』`);
          await era.printAndWait(
            `${player_name}用${weapon}从后面毫不留情地侵犯着${target_name}的蜜穴。`,
          );
          await era.printAndWait(
            `蜜穴交合处随着${player_name}的动作发出一声声下流的声响。`,
          );
          await era.print(
            `『姐姐的蜜穴已经被开发的很好了呢，这样的话就可以取悦魔王大人了♪』`,
          );
          await era.printAndWait(
            `「说，说谎……开发什么的……呜……呜啊啊……可是……为什么会……这么舒服啊啊！」`,
          );
        } else {
          await era.printAndWait(
            `「呜……呜啊……稍微……稍微温柔一点吧……求你了！」`,
          );
          await era.print(`『姐姐这就忍不住要高潮了吗${heart(1)}』`);
          await era.print(
            `${player_name}用${weapon}从后面毫不留情地侵犯着${target_name}的蜜穴。`,
          );
          await era.print(
            `${target_name}的蜜穴交合时发出的声音越来越响，却还是被${target_name}的娇喘掩盖过去了。`,
          );
          await era.printAndWait(
            `「求求你了……${player_name}！饶了姐姐吧……小穴真的，真的已经……啊啊啊！」`,
          );
        }
        kojo.背后位 = 4;
      } else if (
        mark(2) === 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3
        await era.print(
          `『唔哇哇……被这个姿势侵犯的姐姐……好像母狗一样呢……感觉是不是棒极了！』`,
        );
        await era.printAndWait(
          `${player_name}抓着${target_name}的腰，用${weapon}在蜜穴里用力抽插着。`,
        );
        await era.printAndWait(`「呜……呜呜……好痛……温柔一点……求求你……！」`);
        await era.print(
          `被妹妹用后背位侵犯着的${target_name}只能拼命忍受着屈辱与痛苦，但是这个样子却让${player_name}更加兴奋了起来`,
        );
        await era.printAndWait(
          `『嘿嘿，姐姐终于肯老老实实听话了么，那就把姐姐侵犯到高潮作为奖励吧${heart(1)}』`,
        );
        kojo.背后位 = 3;
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.print(
          `『唔哇哇……被这个姿势侵犯的姐姐……好像母狗一样呢……感觉是不是棒极了！』`,
        );
        await era.printAndWait(
          `${player_name}强行抓着${target_name}的腰，用${weapon}在蜜穴里用力抽插着。`,
        );
        await era.printAndWait(
          `「住，住手啊……快拔出去……我们，我们是姐妹啊！」`,
        );
        await era.print(`${target_name}痛苦的呻吟丝毫无法打动${player_name}。`);
        await era.printAndWait(
          `『嘿嘿，一起做魔王大人的母狗姐妹也没问题哦${heart(1)}』`,
        );
        kojo.背后位 = 2;
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.背后位 <= 5 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      if (rand_n(3) === 0) {
        await era.printAndWait(
          `「呜……呜啊……这种姿势……好像……狗在交配一样${heart(1)} 但是……好棒……好舒服${heart(1)}」`,
        );
        await era.printAndWait(
          `${player_name}抱着${target_name}的腰，勃起的阴茎一口气贯入到了最里面。`,
        );
        await era.printAndWait(
          `作为回应，爱液泛滥的蜜穴也紧紧地夹住了${player_name}的阴茎`,
        );
        if (chara(target).system.私处感觉 >= 3) {
          await era.printAndWait(
            `「继……继续侵犯${target_name}吧${heart(1)} 就像侵犯母狗一样啊啊${heart(1)}」`,
          );
          await era.printAndWait(`两人的交合处发出一声声不堪入耳的响声。。`);
        } else {
          await era.printAndWait(
            `「嗯啊……啊啊……好舒服……继续……继续这样侵犯人家吧${heart(1)}」`,
          );
        }
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `「嗯啊……啊啊…${heart(1)} 顶，顶到子宫口了啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${player_name}抱着${target_name}的腰，勃起的阴茎一口气贯入到了最里面`,
        );
        await era.printAndWait(
          `然后，在${target_name}的蜜穴里开始缓慢而用力地抽送起来`,
        );
        if (chara(target).system.私处感觉 >= 3) {
          await era.printAndWait(
            `「呜……呜啊啊…${heart(1)} 要，要去了……小母狗要，要去了啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}不断扭动着腰，寻求着更激烈的快感……`,
          );
        } else {
          await era.printAndWait(`「呜……呜啊啊！好，好舒服啊啊${heart(1)}！」`);
        }
      } else {
        await era.printAndWait(
          `「嗯啊啊！好，好厉害……魔王大人的阴茎${heart(1)} 在人家的淫穴里……${heart(1)} 啊啊啊，插，插到子宫口了啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${player_name}抱着${target_name}的腰，从背后将勃起的阴茎一口气贯入到了最里面。`,
        );
        await era.printAndWait(
          `爱液随着两人的交合，以及${target_name}的娇喘一次次喷洒出来。`,
        );
        if (chara(target).system.私处感觉 >= 3) {
          await era.printAndWait(
            `「呜啊啊${heart(1)} 要，要去了${heart(1)} 魔王大人的阴茎${heart(1)} 真的是……太棒了啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的腰在${player_name}激烈侵犯下，一挺一挺的，完全沉浸在了交媾的快感中……`,
          );
        } else {
          await era.printAndWait(`「呜……呜啊……要，要去了啊啊${heart(1)}！」`);
        }
      }
      kojo.背后位 = 6;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.背后位 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      if (rand_n(3) === 0) {
        await era.printAndWait(
          `「呜……呜啊啊啊${heart(1)} 被，被魔王大人……顶到……子宫口了啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${player_name}抱着${target_name}的腰，勃起的阴茎一口气贯入到了最里面。`,
        );
        await era.printAndWait(
          `作为回应，爱液泛滥的蜜穴也紧紧地夹住了${player_name}的阴茎`,
        );
        if (chara(target).system.私处感觉 >= 3) {
          await era.printAndWait(
            `「尽情地侵，侵犯人家吧……侵犯到……怀孕为止啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}随着每次交合，发出一声声甜美的娇喘……`,
          );
        } else {
          await era.printAndWait(`「嗯啊……啊啊……${target_name}……好幸福！」`);
        }
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `「嗯啊……啊啊啊${heart(1)} 好像母狗一样……被魔王大人侵犯着……${heart(1)}」`,
        );
        await era.printAndWait(
          `${player_name}抱着${target_name}的腰，从背后将勃起的阴茎一口气贯入到了最里面。`,
        );
        await era.printAndWait(
          `然后，在${target_name}紧致的蜜穴里开始缓慢而用力地抽送起来`,
        );
        if (chara(target).system.私处感觉 >= 3) {
          await era.printAndWait(
            `「呜……呜啊……魔王大人……不，不要故意这样……慢慢来啊啊${heart(1)} 对，对不起……是${target_name}心急了……呜呜」`,
          );
          await era.printAndWait(
            `${target_name}沉浸在交媾的快感中，整个身体都弓了起来，发出一声声甘甜的娇喘。`,
          );
        } else {
          await era.printAndWait(
            `「嗯啊……啊啊……好舒服……继续……继续这样侵犯人家吧${heart(1)}！」`,
          );
        }
      } else {
        await era.printAndWait(
          `「呜……呜啊！好，好激烈……魔王大人的阴茎……在人家的小穴里……！」`,
        );
        await era.printAndWait(
          `${player_name}抱着${target_name}的腰，从背后将勃起的阴茎一口气贯入到了最里面，然后连续地抽插起来`,
        );
        await era.printAndWait(
          `两人的交合处发出一声声不堪入耳的响声，却完全被${target_name}甘甜而尽情的娇喘掩盖了过去`,
        );
        if (chara(target).system.私处感觉 >= 3) {
          await era.printAndWait(
            `「嗯啊……啊啊${heart(1)} 明明……被当成母狗一样${heart(1)} 但……但为什么……比平时${heart(1)} 还要舒服啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的腰在${player_name}激烈侵犯下，一挺一挺的，完全沉浸在了交媾的快感中……`,
          );
        } else {
          await era.printAndWait(
            `「嗯啊……啊啊……魔王大人……稍，稍微……温柔一点！！」`,
          );
        }
      }
      kojo.背后位 = 5;
    } else if (
      mark(2) === 3 &&
      chara(target).system.私处感觉 >= 3 &&
      (kojo.背后位 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3＋V感覚Lv3以上
      if (rand_n(3) === 0) {
        await era.printAndWait(
          `「呜……呜啊啊……能，能换个姿势吗……这样实在……啊啊啊！」`,
        );
        await era.printAndWait(
          `${player_name}抓着${target_name}的腰，毫不留情地用${weapon}在蜜穴里用力抽插着。`,
        );
        await era.printAndWait(
          `${target_name}的蜜穴在一次次激烈的交合中不住地喷出爱液。`,
        );
        await era.printAndWait(
          `「嗯啊……啊啊……魔，魔王大人……太……太激烈了啊啊！」`,
        );
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `「插，插到最深处了……魔王大人的阴茎……呜……呜啊啊！」`,
        );
        await era.printAndWait(
          `${player_name}抓着${target_name}的腰，毫不留情地用${weapon}在蜜穴里用力抽插着。`,
        );
        await era.printAndWait(`两人的交合处发出一声声不堪入耳的响声。。`);
        await era.printAndWait(
          `「呜……呜呜……明明不，不想……但为，为什么……会这么舒服啊啊啊！」`,
        );
      } else {
        await era.printAndWait(
          `「魔，魔王大人……温柔一点……人家的小穴要坏……坏掉了啊啊！」`,
        );
        await era.printAndWait(
          `${player_name}抓着${target_name}的腰，毫不留情地用${weapon}在蜜穴里用力抽插着。`,
        );
        await era.printAndWait(
          `虽然嘴上这么说，但是随着每次交合，${target_name}却不住地娇喘起来`,
        );
        await era.printAndWait(
          `「拜，拜托了……魔王大人……人家真的，真的已经……到极限了啊啊啊！」`,
        );
      }
      kojo.背后位 = 4;
    } else if (
      mark(2) === 3 &&
      (kojo.背后位 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3
      await era.printAndWait(`「呜呜……插……插进来了……！」`);
      await era.printAndWait(
        `${player_name}抱着${target_name}的腰，从背后将勃起的阴茎一口气贯入到了最里面。`,
      );
      await era.printAndWait(
        `在${player_name}毫不留情的连续抽插下，${target_name}只能咬着嘴唇拼命忍耐着`,
      );
      await era.printAndWait(`「魔，魔王大人……求……求你……稍微……温柔一点！」`);
      kojo.背后位 = 3;
    } else if (kojo.背后位 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(`「放，放开我……不，不要啊啊啊！」`);
      await era.printAndWait(
        `${player_name}抱着${target_name}的腰，从背后将勃起的阴茎一口气贯入到了最里面。`,
      );
      await era.printAndWait(
        `无力抵抗的${target_name}只能在自己的悲鸣声中拼命忍耐着。`,
      );
      await era.printAndWait(`「这种姿势……这种……狗一样的姿势！呜呜呜……」`);
      kojo.背后位 = 2;
    }
    return 0;
  }

  // IF SELECTCOM == 22（对面座位 CFLAG:323）
  if (era_flag.selectcom === 22) {
    if (kojo.对面座位 === 0) {
      // 初めて
      const virgin = era.get(`talent:${target}:0`) === 1;
      if (virgin) {
        // 处女（原作模板骨架未填写，PRINTFORMW 无正文）
        await era.printAndWait('');
      } else {
        // 非处女
        if (assi_mao) {
          if (era.get(`talent:${target}:76`) === 1) {
            // 淫乱
            await era.printAndWait(
              `「呜……呜啊……${heart(1)} ${player_name}……请……请再……${heart(1)}」`,
            );
            await era.printAndWait(
              `『啧啧，姐姐哟姐姐${heart(1)} 被这样一舔乳头，下面就夹得更紧了呀${heart(1)}』`,
            );
            await era.printAndWait(
              `${target_name}被${player_name}抱在腿上，吸吮着乳头的同时侵犯着蜜穴……`,
            );
          } else if (era.get(`talent:${target}:85`) === 1) {
            // 爱慕
            await era.printAndWait(
              `「呜…呜啊啊……不，不可以……同时进攻……蜜穴和乳头啊啊！」`,
            );
            await era.printAndWait(
              `『啧啧，姐姐哟姐姐${heart(1)} 下面就夹得这么紧，乳头是弱点呢${heart(1)}』`,
            );
            await era.printAndWait(
              `${target_name}被${player_name}抱在腿上，吸吮着乳头的同时侵犯着蜜穴……`,
            );
          } else {
            // それ以外
            await era.printAndWait(
              `『姐姐的胸部真可爱，这样被同时侵犯着，感觉很舒服吧♪』`,
            );
            await era.printAndWait(`「呜……呜呜……为，为什么要……这样！」`);
            await era.printAndWait(
              `${target_name}被${player_name}抱在腿上，吸吮着乳头的同时侵犯着蜜穴……`,
            );
          }
        } else {
          // 淫乱
          if (era.get(`talent:${target}:76`) === 1) {
            await era.printAndWait(
              `「嗯啊……啊啊……顶，顶到最里面了啊啊${heart(1)} 」`,
            );
            await era.printAndWait(
              `${target_name}被${player_name}抱在大腿上，随着阴茎一次次顶入蜜穴最深处娇喘着……`,
            );
          } else if (era.get(`talent:${target}:85`) === 1) {
            // 爱慕
            await era.printAndWait(
              `「抱，抱紧我……魔王大人……嗯啊……啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}被${player_name}抱在腿上，在交合中不住地喘息着`,
            );
          } else {
            // それ以外
            await era.printAndWait(`「好……好难受……这样姿势……呜呜！」`);
            await era.printAndWait(`${target_name}在你的腿上悲惨地呻吟着………`);
          }
        }
      }
      kojo.对面座位 = 1;
      return 0;
    }
    // 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.对面座位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「哈……哈啊……！这样……这样好舒服……${heart(1)} 继续……舔姐姐的乳头吧……${player_name}${heart(1)}」`,
          );
          await era.print(
            `『哎呀呀，姐姐居然已经这么淫乱了${heart(1)} 下面吸得紧紧的，真的有那么舒服吗${heart(1)}』`,
          );
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「是……是的……姐姐就是一只淫乱的……母狗啊啊啊…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}被${player_name}抱在大腿上，吸吮，舔舐着敏感的乳头，蜜穴也被连续的侵犯着，感受着双倍的快感……`,
            );
          } else {
            await era.printAndWait(
              `${target_name}被${player_name}抱在腿上，同时侵犯着双乳和蜜穴……`,
            );
          }
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「嗯啊……啊啊${heart(1)} 好，好舒服……这个姿势……${heart(1)} 啊啊啊${heart(1)}」`,
          );
          await era.print(
            `『我也是啊……这样边抱着边侵犯姐姐……嗯啊啊${heart(1)}』`,
          );
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「再，再深一点……${heart(1)} 顶进姐姐的子宫……也可以的${heart(1)} 啊啊……好棒${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}蜜穴已经被开发，调教得无比敏感，传来的快感随着妹妹每次挺起腰而愈发强烈……`,
            );
          } else {
            await era.printAndWait(
              `${player_name}抱着${target_name}，一次次挺起腰侵犯着姐姐的蜜穴……`,
            );
          }
        } else {
          await era.printAndWait(
            `「呜啊……啊啊……不，不行了${heart(1)} 好舒服，好舒服啊啊${heart(1)}」`,
          );
          await era.print(
            `『唔哇哇，姐姐不要老是乱动啊，这样插不到最里面了哇！』`,
          );
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「好……好的……我会乖乖的${heart(1)}嗯啊啊……要，要去了……要被妹妹侵犯得……高潮了啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}被自己的妹妹侵犯得痴态毕露，已经完全抛却任何尊严了……`,
            );
          } else {
            await era.printAndWait(
              `${player_name}一边抱怨着，一边动着腰，继续侵犯着${target_name}的蜜穴……`,
            );
          }
        }
        kojo.对面座位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.对面座位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「嗯啊……不，不行啊……一边侵犯蜜穴……一边吸着乳头……是犯规的啊啊${heart(1)}」`,
          );
          await era.print(
            `『哎嘿嘿${heart(1)} 发现姐姐弱点了呢，胸部一被攻击，小穴就夹得紧紧的${heart(1)}』`,
          );
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「不，不是这样的……呜啊啊……但是，但是……真的好舒服啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}被${player_name}抱在大腿上，吸吮，舔舐着敏感的乳头，蜜穴也被连续的侵犯着，整个人几乎融化在连绵的快感中了……`,
            );
          } else {
            await era.printAndWait(
              `「才没，没有那样的弱点……呜啊……啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}被${player_name}抱在腿上，继续同时侵犯着双乳和蜜穴……`,
            );
          }
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「呜啊……不，不要再，再往里顶了，${player_name}……姐姐的小穴……会坏掉的啊啊！」`,
          );
          await era.print(
            `『吓？真的是这样吗？嘴上这么说着，但是我怎么觉得姐姐的下面夹得更紧了呢	？』`,
          );
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「才，才没有……嗯啊……啊啊啊！！插，插到最里面了……好，好舒服啊啊${heart(1)}」`,
            );
            await era.print(
              `『嘿嘿，果然很舒服嘛，接下来就要顶到姐姐的子宫口了哦！』`,
            );
            await era.printAndWait(
              `${player_name}嬉笑着，挺起腰，继续把阴茎顶入到${target_name}蜜穴更深处……`,
            );
          } else {
            await era.printAndWait(
              `${target_name}交织着痛苦与舒服的表情，与${player_name}尽情享受着的笑颜相映着……`,
            );
          }
        } else {
          await era.printAndWait(
            `「呜……呜啊啊！被${player_name}……侵犯得……要升天了啊啊${heart(1)}！」`,
          );
          await era.print(
            `『哎呀呀，姐姐都舒服成这个样子了，这么喜欢被抱在腿上侵犯吗？』`,
          );
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「嗯啊啊……不，不只是因为这个……更，更因为是被妹妹……被我最爱的${player_name}侵犯着……才更加舒服啊啊！」`,
            );
            await era.print(
              `『哎呀呀，听到姐姐这么说，人家很高兴呢，再给姐姐一点奖励好了！顶到子宫口的奖励!${heart(1)}』`,
            );
            await era.printAndWait(
              `${player_name}嬉笑着挺起腰，往${target_name}蜜穴的更深处顶入……`,
            );
          } else {
            await era.printAndWait(
              `${target_name}交织着苦闷与舒服的表情，与${player_name}尽情享受着的笑颜相映着……`,
            );
          }
        }
        kojo.对面座位 = 5;
      } else if (
        mark(2) === 3 &&
        chara(target).system.私处感觉 >= 3 &&
        (kojo.对面座位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3＋V感覚Lv3以上
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「嗯啊……咿啊啊……为，为什么……会这么舒服的！」`,
          );
          await era.print(
            `『嘿嘿，姐姐终于坦率地面对自己的欲望了么，我也为姐姐高兴呢${heart(1)}』`,
          );
          await era.printAndWait(
            `${player_name}嬉笑着，将${target_name}抱在腿上，更加用力地侵犯着姐姐的蜜穴……`,
          );
        } else {
          await era.print(`『姐姐准备被我侵犯到高潮吧♪』`);
          await era.printAndWait(
            `「呜啊……嗯啊啊……感觉好，好奇怪……但是好舒服啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}被自己的妹妹持续侵犯着蜜穴，在背德感与快感的双重折磨中呻吟了起来……`,
          );
        }
        kojo.对面座位 = 4;
      } else if (
        mark(2) === 3 &&
        (kojo.对面座位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3
        await era.printAndWait(
          `「求，求你了……稍微温柔一点吧……看在我是你的姐姐的份上……」`,
        );
        await era.print(`『身体放松些啦姐姐，很快就会舒服起来的！』`);
        await era.printAndWait(
          `${target_name}被${player_name}抱在腿上，肆意玩弄着双乳，蜜穴也被持续侵犯着……`,
        );
        kojo.对面座位 = 3;
      } else if (kojo.对面座位 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.print(
          `『唔哇哇……边侵犯姐姐边把脸埋在姐姐淫乱的大胸部里面……真是太棒了！』`,
        );
        await era.printAndWait(
          `「呜……呜呜……求求你了……不要再折磨姐姐了……呜呜呜」`,
        );
        await era.printAndWait(
          `${target_name}被${player_name}抱在腿上，肆意玩弄着双乳，蜜穴也被持续侵犯着……`,
        );
        kojo.对面座位 = 2;
      }
    } else {
      // 淫乱
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.对面座位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「呜……呜啊啊……尽情地，侵犯人家的淫穴吧魔王大人……侵犯到人家彻底坏掉吧啊啊啊${heart(1)} 」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「嗯啊……啊啊……顶，顶到最里面了……魔王大人的阴茎……顶到人家的子宫口了啊啊${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「哈啊……哈啊……这样抱着魔王大人做爱……好舒服啊啊${heart(1)}」`,
          );
        }
        if (chara(target).system.私处感觉 >= 3) {
          await era.print(
            `「不，不行了……小穴……舒服得……要上天了啊啊啊${heart(1)}」`,
          );
        } else {
          await era.print(`「呜啊……小穴……实在是太舒服了啊啊啊」`);
        }
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `${target_name}被${player_name}抱在腿上，淫浪的娇喘声伴随着每一次交合响彻整个房间……`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `${target_name}紧抱着${player_name}，双乳在${player_name}的胸膛上摩擦着……`,
          );
        } else {
          await era.printAndWait(
            `${target_name}享受着交合的极度快感，娇喘声连绵不绝。……`,
          );
        }
        kojo.对面座位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.对面座位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「呜……呜啊啊……魔王大人，魔王大人，尽情的侵犯你的性奴${target_name}吧${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「呜啊……顶，顶到……子宫口了啊啊啊${heart(1)}」`,
          );
        } else {
          await era.printAndWait(`「魔，魔王大人……在吻我……好幸福……呣呣……」`);
        }
        if (chara(target).system.私处感觉 >= 3) {
          await era.print(`「呜呜……要，要去了，要去了啊啊啊${heart(1)}」`);
        } else {
          await era.print(`「呜啊……小穴……实在是太舒服了啊啊啊」`);
        }
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `${target_name}被${player_name}抱在腿上，娇喘着享受着交合的快感………`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `甜美地娇喘声中，${target_name}紧紧抱着${player_name}的身体……`,
          );
        } else {
          await era.printAndWait(
            `${target_name}感受着交合的快感，表情仿佛要融化了一般………`,
          );
        }
        kojo.对面座位 = 5;
      } else if (
        mark(2) === 3 &&
        chara(target).system.私处感觉 >= 3 &&
        (kojo.对面座位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3＋V感覚Lv3以上
        await era.printAndWait(
          `「好舒服……已经舒服得……没有办法思考了啊啊啊${heart(1)}」`,
        );
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「呜……呜啊啊……再这样下去……身体就，就再也回不到……以前的样子了……」`,
          );
          await era.printAndWait(
            `${target_name}被${player_name}抱在怀里无法挣脱，只能任由阴茎在自己的蜜穴里肆虐着……`,
          );
        } else {
          await era.printAndWait(
            `「呜啊……嗯啊啊……感觉好奇怪……脑袋也是，身体也是……要，要不行了！」`,
          );
          await era.printAndWait(
            `${target_name}被${player_name}抱在怀中、随着蜜穴被阴茎一次次顶入，快感也一波波传递向大脑……`,
          );
        }
        kojo.对面座位 = 4;
      } else if (
        mark(2) === 3 &&
        (kojo.对面座位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3
        await era.printAndWait(`「饶，饶了我吧……魔王大人……已经不行了……」`);
        await era.printAndWait(
          `${target_name}被${player_name}强行抱在怀里蹂躏着蜜穴，只能边呻吟边拼命忍耐着`,
        );
        kojo.对面座位 = 3;
      } else if (kojo.对面座位 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.printAndWait(
          `「呜……呜啊啊，好痛……不，不能再进去了……呜呜！」`,
        );
        await era.printAndWait(
          `${player_name}过于激烈的动作让${target_name}痛苦地悲鸣了起来……`,
        );
        kojo.对面座位 = 2;
      }
    }
    return 0;
  }
  // IF SELECTCOM == 23（背面座位 CFLAG:324）
  if (era_flag.selectcom === 23) {
    // \@TALENT:PLAYER:121 == 0 && TALENT:PLAYER:122 == 0 ? 电动假阳具 # 阴茎\@
    const weapon =
      era0(`talent:${player}:121`) === 0 && era0(`talent:${player}:122`) === 0
        ? '电动假阳具'
        : '阴茎';
    if (kojo.背面座位 === 0) {
      // 初めて
      const virgin = era.get(`talent:${target}:0`) === 1;
      if (virgin) {
        // 处女（原作模板骨架未填写，PRINTFORMW 无正文）
        await era.printAndWait(''); // PRINTFORMW 空行
      } else {
        // 非处女
        if (assi_mao) {
          if (era.get(`talent:${target}:76`) === 1) {
            // 淫乱
            await era.printAndWait(
              `「呀啊啊……这样的姿势……真受不了啊${heart(1)}」`,
            );
            await era.printAndWait(
              `『姐姐双腿分开一点，要好好让魔王大人欣赏啊♪』`,
            );
            await era.printAndWait(
              `「好……好的……魔王大人……请，请欣赏${target_name}被妹妹侵犯到高潮的样子吧${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}顺从地岔开双腿，完全沉浸在被自己妹妹侵犯的背德快感之中……`,
            );
          } else if (era.get(`talent:${target}:85`) === 1) {
            // 爱慕
            await era.printAndWait(
              `「呜…呜啊啊……太，太激烈了……这样姐姐……会坏掉的啊啊！！！」`,
            );
            await era.printAndWait(
              `『姐姐的娇喘真动听呢，是因为被魔王大人看着的原因吗？我都不知道原来姐姐是变态暴露狂呢！』`,
            );
            await era.printAndWait(
              `「什……什么……魔王大人在看吗？不，不要啊啊${heart(1)} 好，好丢脸……但是好舒服啊啊啊！」`,
            );
            await era.printAndWait(
              `${target_name}的双腿被${player_name}用手分开，正被${weapon}蹂躏到爱液泛滥的蜜穴一览无余地展露着……`,
            );
          } else {
            // それ以外
            await era.printAndWait(
              `「饶……饶了姐姐吧……真的，真的已经不行了！」`,
            );
            await era.printAndWait(
              `『说什么呢，姐姐，好好张开腿让魔王大人欣赏你被侵犯的样子啊♪』`,
            );
            await era.printAndWait(`「什，什么？不要看，不要看呜呜……」`);
            await era.printAndWait(
              `${target_name}的双腿被${player_name}用手强行分开，正被${weapon}蹂躏着的蜜穴一览无余地展露着……`,
            );
          }
        } else {
          if (era.get(`talent:${target}:76`) === 1) {
            // 淫乱
            await era.printAndWait(
              `「呜……呜啊啊${heart(1)} 这样的姿势……原来可以顶到这么里面……啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `「魔王大人……手，手也不要闲着嘛……来吧，我的大胸部……你不是一直很喜欢吗${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}抓着${player_name}的手按在自己的双乳上，被侵犯的蜜穴传来的快感更加强烈了……`,
            );
          } else if (era.get(`talent:${target}:85`) === 1) {
            // 爱慕
            await era.printAndWait(
              `「嗯啊……啊啊${heart(1)}魔王大人这样边揉胸部……边抽插小穴……是犯规的啊啊${heart(1)} ！」`,
            );
            await era.printAndWait(
              `「不，不要分开人家的双腿啦……好，好害羞……还，还是摸胸部比较好一点${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}的双腿被${player_name}用手分开，正被${weapon}蹂躏到爱液泛滥的蜜穴一览无余地展露着……`,
            );
          } else {
            // それ以外
            await era.printAndWait(`「不，不要啊啊……这样的姿势……好羞耻！」`);
            await era.printAndWait(
              `${target_name}的双腿被${player_name}用手强行分开，正被${weapon}蹂躏着的蜜穴一览无余地展露着……`,
            );
          }
        }
      }
      kojo.背面座位 = 1;
      return 0;
    }
    // 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.背面座位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        if (rand_n(3) === 0) {
          await era.print(
            `『双腿分开些啊姐姐，好好让魔王大人看看你的淫乱模样♪』`,
          );
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「不，不行了……小穴……舒服得……要上天了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}无意识地岔开双腿，完全沉浸在与妹妹交合的背德快感之中……`,
            );
          } else {
            await era.print(
              `「好……好的……魔王大人……请，请欣赏${target_name}被妹妹侵犯到高潮的样子吧${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}顺从地岔开双腿，展露着自己正被蹂躏着的蜜穴`,
            );
          }
        } else if (rand_n(2) === 0) {
          await era.print(
            `『嗯啊……姐姐，这样舒服吗？舒服吗？快说呀，不然我就停下来了哦！』`,
          );
          if (chara(target).system.私处感觉 >= 3) {
            await era.print(
              `「嗯啊啊……啊啊……小穴……舒服得……像是要坏掉了一样啊啊」`,
            );
            await era.printAndWait(
              `「呜……呜啊……太，太激烈了……姐姐真的要，要去了啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}娇喘着，尽情享受着同时被妹妹从身后侵犯胸部和小穴的快感……`,
            );
          } else {
            await era.print(`「呜啊……顶，顶的太深了……不，不行了啊啊」`);
            await era.printAndWait(`「要去了，要去了啊啊啊！」`);
            await era.printAndWait(
              `${target_name}呻吟着，享受着被妹妹从身后侵犯胸部和小穴的快感………`,
            );
          }
        } else {
          await era.print(
            `『嘿嘿嘿，我要开始认真了哦，姐姐！在妹妹的侵犯下高潮吧』`,
          );
          if (chara(target).system.私处感觉 >= 3) {
            await era.print(
              `「好舒服……已经舒服得……没有办法思考了啊啊啊${heart(1)}」`,
            );
            await era.print(
              `『唔哇哇，姐姐的声音这么淫乱，再让我和魔王大人听听呀${heart(1)}』`,
            );
            await era.printAndWait(
              `${player_name}搓揉着${target_name}丰满的双乳，腰一挺一挺地侵犯着姐姐的蜜穴……`,
            );
          } else {
            await era.print(`「嗯啊啊……啊啊……被，被这么激烈地侵犯着……」`);
            await era.print(
              `『哎嘿嘿，好像还差一点火候呢，接下来就夹击的姐姐的大胸部好了${heart(1)}』`,
            );
            await era.printAndWait(
              `${player_name}伸手环住${target_name}丰满的双乳，边搓揉着边挺着腰继续侵犯着姐姐的蜜穴……`,
            );
          }
        }
        kojo.背面座位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.背面座位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        if (rand_n(3) === 0) {
          if (chara(target).system.私处感觉 >= 3) {
            await era.print(
              `「嗯啊啊……啊啊……小穴……舒服得……要上天了啊啊啊${heart(1)}」`,
            );
          } else {
            await era.print(`「呜啊……嗯啊啊……为，为什么会……这么舒服啊啊！」`);
          }
          await era.printAndWait(
            `『姐姐的娇喘真动听呢，是因为被魔王大人看着的原因吗？我都不知道原来姐姐是变态暴露狂呢！』`,
          );
          await era.printAndWait(
            `「什……什么……魔王大人在看吗？不，不要啊啊${heart(1)} 好，好丢脸……但是好舒服啊啊啊！${heart(1)} 」`,
          );
          await era.printAndWait(
            `${target_name}的双腿被${player_name}用手分开，正被${weapon}蹂躏到爱液泛滥的蜜穴一览无余地展露着……`,
          );
        } else if (rand_n(2) === 0) {
          await era.print(
            `『哎啊啊，姐姐的小穴真是太棒了，夹得这么紧，你也一定很舒服吧啊啊！』`,
          );
          if (chara(target).system.私处感觉 >= 3) {
            await era.print(`「呜呜……要，要去了，要去了啊啊啊${heart(1)}」`);
            await era.print(
              `『啧啧，我都不知道姐姐原来可以发出这么淫乱的声音呢${heart(1)} 魔王大人快来看呀，姐姐要高潮了呢${heart(1)}』`,
            );
            await era.printAndWait(
              `${player_name}伸手环住${target_name}丰满的双乳，边搓揉着边挺着腰继续侵犯着姐姐的蜜穴……`,
            );
          } else {
            await era.print(`「呜……呜……」`);
            await era.print(
              `『舒服就大声喊出来呀姐姐${heart(1)} 老是憋着不发出声音，魔王大人会不高兴的！』`,
            );
            await era.printAndWait(
              `${player_name}伸手环住${target_name}丰满的双乳，边搓揉着边挺着腰继续侵犯着姐姐的蜜穴……`,
            );
          }
        } else {
          await era.print(
            `『双腿分开些啊姐姐，让魔王大人好好看着你的淫乱样子♪』`,
          );
          if (chara(target).system.私处感觉 >= 3) {
            await era.print(
              `「顶，顶到子宫口了……比刚刚……更舒服了啊啊啊${heart(1)}」`,
            );
            await era.print(
              `『哎呀呀，真的自己分开腿了呢！变态暴露狂姐姐被人看着会更有感觉吗？那就在魔王大人面前高潮吧！』`,
            );
            await era.printAndWait(
              `${target_name}被${player_name}侮辱着，无论内心还是蜜穴的快感却更加强烈了………`,
            );
          } else {
            await era.print(`「不，不行了……舒服得……要去了……」`);
            await era.print(
              `『魔王大人快看啊，姐姐要高潮了呢${heart(1)} 嘿！不许偷偷合上！』`,
            );
            await era.printAndWait(
              `${target_name}在${player_name}命令下展开双腿，展露着自己正被侵犯着的蜜穴……`,
            );
          }
        }
        kojo.背面座位 = 5;
      } else if (
        mark(2) === 3 &&
        chara(target).system.私处感觉 >= 3 &&
        (kojo.背面座位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3＋V感覚Lv3以上
        if (rand_n(2) === 0) {
          await era.print(`「好舒服……已经没有办法思考了啊啊啊${heart(1)}」`);
        } else {
          await era.print(`「呜啊……嗯啊啊……为，为什么会……这么舒服啊啊！」`);
        }
        await era.print(
          `『哎呀呀，真的那么舒服吗姐姐，我还没要求，腿就自己张开了，那么想让魔王大人看见你小穴高潮的样子吗？』`,
        );
        await era.printAndWait(`「才，才没有……这种事……嗯啊啊！」`);
        await era.printAndWait(
          `${target_name}终于忍不住娇喘了起来，身体也随着妹妹的侵犯颤抖着…`,
        );
        kojo.背面座位 = 4;
      } else if (
        mark(2) === 3 &&
        (kojo.背面座位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3
        await era.printAndWait(
          `「呜……呜啊……不，不能再往里顶了……会，会坏掉的！」`,
        );
        await era.print(
          `『感觉到舒服的话就把腿张开一些啊姐姐，让魔王大人欣赏一下你小穴高潮的样子。』`,
        );
        await era.printAndWait(`「才……才没有感觉舒服……呜呜……」`);
        await era.printAndWait(
          `${target_name}的双腿被${player_name}用手分开，正被${weapon}蹂躏的蜜穴一览无余地展露着……`,
        );
        kojo.背面座位 = 3;
      } else if (kojo.背面座位 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.printAndWait(
          `「放，放开我啊，${player_name}！我是，我是你的姐姐啊……呜呜呜……不，不要再折磨我了……」`,
        );
        await era.print(
          `『不要把腿合上，给我张开！让魔王大人好好看看你被自己的亲妹妹侵犯的样子吧♪』`,
        );
        await era.printAndWait(`「住，住手……求你了！不要看，不要看啊啊啊！」`);
        await era.printAndWait(
          `${target_name}的双腿被${player_name}用手强行分开，正被${weapon}蹂躏的蜜穴一览无余地展露着……`,
        );
        kojo.背面座位 = 2;
      }
    } else {
      // 淫乱
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.背面座位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「呜……呜啊…${heart(1)} 顶，顶到最里面了啊啊…${heart(1)}」`,
          );
          if (chara(target).system.私处感觉 >= 3) {
            await era.print(`「呜呜……要，要去了，要去了啊啊啊${heart(1)}」`);
            await era.printAndWait(
              `「魔王大人，魔王大人${heart(1)} 尽情地把人家的……小淫穴侵犯得彻底坏掉吧啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}被${player_name}从身后托起双腿抱在空中，蜜穴被阴茎一次次顶到最深处，整个人完全沉浸在交合的快感中……`,
            );
          } else {
            await era.print(`「呜啊……嗯啊啊……为，为什么会……这么舒服啊啊！」`);
            await era.printAndWait(
              ` ${target_name}被${player_name}从身后托起双腿抱在空中，阴茎一次次顶到小穴最深处……`,
            );
          }
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「哈啊……哈啊${heart(1)} 魔王大人……的阴茎……好热，好烫……${heart(1)}」`,
          );
          if (chara(target).system.私处感觉 >= 3) {
            await era.print(
              `「顶，顶到子宫口了……比刚刚……更舒服了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `「还，还可以再深一点${heart(1)} 侵犯到……人家的子宫里面吧…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}表情仿佛要融化一般，淫浪地娇喘着，享受着${player_name}的侵犯………`,
            );
          } else {
            await era.print(
              `「嗯啊啊……啊啊……被，被这么激烈地侵犯着……但是……好舒服${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}的呻吟很快变成了享受的娇喘……`,
            );
          }
        } else {
          await era.printAndWait(
            `「呜…呜啊啊……把，把人家的小穴和子宫……当成飞机杯那样尽情的侵犯吧${heart(1)}」`,
          );
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「啊啊……胸部，也被疼爱了……${heart(1)} 这样好舒服……${heart(1)} 舒服得……整个人都要融化了啊啊啊${heart(1)}」`,
            );
            await era.print(
              `「不，不行了……小穴……舒服得……要上天了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `交合的同时，${target_name}敏感的乳头被${player_name}揉捏着，快感更加强烈了……`,
            );
          } else {
            await era.print(`「嗯啊啊……啊啊……被，被这么激烈地侵犯着……」`);
            await era.printAndWait(
              `交合的同时，${target_name}的胸部也被${player_name}揉捏着……`,
            );
          }
        }
        kojo.背面座位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.背面座位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「呜啊……魔王大人……不，不可以……同时攻击胸部和小穴……啊啊啊${heart(1)}」`,
          );
          if (chara(target).system.私处感觉 >= 3) {
            await era.print(
              `「尽情……尽情地把${target_name}的小穴……侵犯到坏掉吧啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `「不，不行了${heart(1)} 已经舒服得……没办法思考了${heart(1)} 被魔王大人……这么疼爱着……实在是天幸福了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}岔开双腿、正被${weapon}抽插得爱液泛滥的蜜穴一览无余地展露着……`,
            );
          } else {
            await era.print(`「呜啊……小穴……为什么会……这么舒服的啊啊啊」`);
            await era.printAndWait(
              `${target_name}被${player_name}从身后紧紧抱着，持续侵犯着蜜穴…`,
            );
          }
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「呜啊啊……顶，顶到最里面了${heart(1)} 好……好舒服……${heart(1)}」`,
          );
          if (chara(target).system.私处感觉 >= 3) {
            await era.print(
              `「好舒服……已经舒服得……没有办法思考了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `「尽情地……侵犯人家吧，魔王大人，把${target_name}的小穴当做飞机杯那样侵犯吧啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}靠在${player_name}身上，扭着腰，追求着更强烈的快感………`,
            );
          } else {
            await era.print(`「嗯啊啊……啊啊……被，被这么激烈地侵犯着……」`);
            await era.printAndWait(
              `${target_name}的呻吟逐渐变成了享受的娇喘……`,
            );
          }
        } else {
          await era.printAndWait(
            `「这样的姿势……好，好棒……好舒服${heart(1)} 」`,
          );
          if (chara(target).system.私处感觉 >= 3) {
            await era.print(
              `「好舒服……已经舒服得……没有办法思考了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `「已，已经不行了……${heart(1)} 要去了，要去了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}尽情享受着交合的快感，娇喘的声音不绝于耳`,
            );
          } else {
            await era.print(`「侵犯得……太激烈了……但，但是……真的好舒服啊啊！」`);
            await era.printAndWait(
              `交合的同时，${target_name}的胸部也被${player_name}揉捏着……`,
            );
          }
        }
        kojo.背面座位 = 5;
      } else if (
        mark(2) === 3 &&
        chara(target).system.私处感觉 >= 3 &&
        (kojo.背面座位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3＋V感覚Lv3以上
        if (rand_n(2) === 0) {
          await era.print(
            `「不，不行了……小穴……舒服得……要上天了啊啊啊${heart(1)}」`,
          );
        } else {
          await era.print(`「侵犯得……太激烈了……但，但是……真的好舒服啊啊！」`);
        }
        if (rand_n(2) === 0) {
          await era.print(`「呜？！不，不可以同时……攻击胸部啊啊！」`);
          await era.printAndWait(
            `${player_name}在侵犯蜜穴的同时，双手也没有闲下，肆意地玩弄着${target_name}的双乳………`,
          );
        } else {
          await era.print(`「好……好舒服……这样的姿势……呜啊啊！」`);
          await era.printAndWait(`${target_name}的呻吟很快变成了享受的娇喘………`);
        }
        kojo.背面座位 = 4;
      } else if (
        mark(2) === 3 &&
        (kojo.背面座位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3
        await era.printAndWait(`「饶，饶了我吧……真的要……坏掉了！」`);
        await era.printAndWait(
          `「让，让我做什么其他的都行……真的……放过我这次吧！」`,
        );
        await era.printAndWait(
          `${target_name}的双腿被${player_name}用手分开，正被${weapon}蹂躏的蜜穴一览无余地展露着……`,
        );
        kojo.背面座位 = 3;
      } else if (kojo.背面座位 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.printAndWait(`「住，住手！放开我啊啊！！」`);
        await era.printAndWait(
          `${target_name}的双腿被${player_name}用手强行分开，正被${weapon}蹂躏的蜜穴一览无余地展露着……`,
        );
        kojo.背面座位 = 2;
      }
    }
    return 0;
  }
  // IF SELECTCOM == 26（正常位肛交 CFLAG:327）
  if (era_flag.selectcom === 26) {
    // \@TALENT:PLAYER:121 == 0 && TALENT:PLAYER:122 == 0 ? 电动假阳具 # 阴茎\@
    // 本节无独立声明行，三目宏内联出现于各 PRINTFORMW 语句里，首次出现
    // 在初めて层助手玛奥淫乱支
    const weapon =
      era0(`talent:${player}:121`) === 0 && era0(`talent:${player}:122`) === 0
        ? '电动假阳具'
        : '阴茎';
    if (kojo.正常位肛交 === 0) {
      // 初めて（不分处女/非处女）
      if (assi_mao) {
        if (era.get(`talent:${target}:76`) === 1) {
          // 淫乱
          await era.print(
            `『姐姐还没体会过肛交吗${heart(1)} 保证会让你舒服上天的${heart(1)} 嘿嘿嘿！』`,
          );
          await era.printAndWait(
            `${player_name}抓着${target_name}的腰，将${weapon}慢慢地插入了肛门之中。`,
          );
          await era.printAndWait(
            `「嗯啊啊……肛门……被撑开的感觉……啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `被亲妹妹侵犯着肛门，却只让${target_name}更加兴奋和享受地娇喘着。而姐姐的反应也让${player_name}更加兴奋而激烈地抽插着${target_name}的肛门。`,
          );
          await era.printAndWait(
            `『最喜欢姐姐了${heart(1)} 给我用肛门高潮吧${heart(1)}』`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 爱慕
          await era.print(
            `『姐姐还没体会过肛交吗${heart(1)} 保证会让你舒服上天的${heart(1)} 嘿嘿嘿！』`,
          );
          await era.printAndWait(
            `${player_name}抱着${target_name}的腰，用${weapon}慢慢贯入了肛门之中。`,
          );
          await era.printAndWait(`「呜……呜啊啊……稍微……再温柔一点啊啊！」`);
          await era.print(
            `『实在是对不起了……但是姐姐的肛门……实在太诱人了，实在是让人忍不住！』`,
          );
          await era.printAndWait(
            `${player_name}丝毫没有减慢动作，反而更激烈地侵犯着姐姐的肛门。`,
          );
        } else {
          // それ以外（爱慕無し）
          await era.print(
            `『姐姐还没体会过肛交吗${heart(1)} 保证会让你舒服上天的${heart(1)} 嘿嘿嘿！』`,
          );
          await era.printAndWait(
            `${player_name}强行抱着${target_name}的腰，用${weapon}慢慢贯入了肛门之中。`,
          );
          await era.printAndWait(
            `「不，不要啊啊！快，快住手……我们是……亲姐妹啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}被妹妹侵犯着肛门，却无力抗拒，哭泣了起来。`,
          );
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          // 淫乱
          await era.printAndWait(
            `「嗯啊……啊啊啊 ${heart(1)} ${target_name}的肛，肛门……${heart(1)} 终于得到魔王大人的临幸了！」`,
          );
          await era.printAndWait(
            `${target_name}体验着第一次肛交的快感，发出了享受的娇喘。`,
          );
          if (chara(target).system.肛门感觉 >= 3) {
            await era.printAndWait(
              `经过充分调教和开发的肛门，好像主动吸住了${player_name}的阴茎一般。`,
            );
          } else {
            await era.printAndWait(
              `尚未充分开发的肛门被${player_name}的阴茎用力地抽插着。`,
            );
          }
          await era.printAndWait(
            `「尽……尽情地侵犯人家的肛门吧……啊啊啊${heart(1)}」`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 爱慕
          await era.printAndWait(
            `「嗯啊……啊啊${heart(1)} 插进来了……${target_name}的肛门……终于得到魔王大人的临幸了……！」`,
          );
          if (chara(target).system.肛门感觉 >= 3) {
            await era.printAndWait(
              `经过充分调教和开发的肛门，主动地吸住了${player_name}的阴茎一般。`,
            );
            await era.printAndWait(
              `「哈啊……哈啊…${heart(1)}……${player_name}的肛门……彻底属于魔王大人了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}用双腿缠住了${player_name}的腰，脸上露出了幸福的笑容………`,
            );
          } else {
            await era.printAndWait(
              `${target_name}尚未充分开发的肛门，被${player_name}的阴茎侵犯着。`,
            );
            await era.printAndWait(
              `「呜啊……呜啊啊……肛门……有点痛，但是……也很舒服${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}体验着初次肛交带来的快感和痛楚，脸上的表情让${player_name}更加兴奋………`,
            );
          }
        } else {
          // それ以外（爱慕無し）
          if (chara(target).system.肛门感觉 >= 3) {
            await era.printAndWait(
              `「不，不行啊啊……那种地方……不，不是用来……呜啊啊！」`,
            );
            await era.printAndWait(
              `${target_name}被充分调教和开发过的肛门，却主动地接纳了${player_name}阴茎的插入。`,
            );
            await era.printAndWait(
              `肛交的快感让${target_name}后仰着头，呻吟了起来。`,
            );
            await era.printAndWait(
              `「嗯啊……啊啊啊……为什么……会这么舒服的啊啊…」`,
            );
          } else {
            await era.printAndWait(
              `「住，住手啊……这样插进去……屁股会裂开的啊啊啊！」`,
            );
            await era.printAndWait(
              `尚未充分开发和调教的肛门被${target_name}无情地侵犯着，${player_name}痛苦地哀鸣着。`,
            );
            await era.printAndWait(
              `「好痛，好痛啊啊啊啊……会死的，真的会死的……呜啊啊！」`,
            );
          }
        }
      }
      kojo.正常位肛交 = 1;
      return 0;
    }
    // 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.正常位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱＋A感覚Lv3以上
        if (rand_n(3) === 0) {
          await era.print(
            `「好舒服……已经舒服得……没有办法思考了啊啊啊${heart(1)}」`,
          );
          await era.print(`『${player_name}最喜欢姐姐了${heart(1)}』`);
          await era.printAndWait(
            `${player_name}抱着${target_name}的腰身，持续地侵犯着肛门。${player_name}被充分开发和调教的肛门与${weapon}的交合处传来一阵阵淫秽不堪的声音。`,
          );
          await era.printAndWait(
            `「嗯啊……啊啊啊${heart(1)} 我……我也是最喜欢被${player_name}侵犯肛门了啊啊啊${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.print(
            `「不，不行了……肛门……舒服得……要上天了啊啊啊${heart(1)}」`,
          );
          await era.print(
            `『哈，哈啊${heart(1)} 姐姐的肛门……完全变成性器了呢！』`,
          );
          await era.printAndWait(
            `${player_name}前后动着腰，持续地侵犯着${target_name}的肛门。${player_name}被充分开发和调教的肛门与${weapon}的交合处传来一阵阵淫秽不堪的声音。`,
          );
          await era.printAndWait(
            `「嗯啊……啊啊啊${heart(1)} 姐姐是个喜欢被${player_name}侵犯肛，肛门的变态啊啊啊${heart(1)}」`,
          );
        } else {
          await era.print(
            `『原来姐姐被侵犯肛门时，会发出这么下流的声音呀${heart(1)}』`,
          );
          await era.printAndWait(
            `「呜啊……啊啊啊${heart(1)} 真的是……太舒服了${heart(1)} 被${player_name}侵犯肛门……的感觉……太棒了啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}感受着肛门被${player_name}用${weapon}侵犯的快感，发出一阵阵淫浪的娇喘。`,
          );
          await era.print(
            `「尽情……尽情地把${target_name}的肛门……侵犯到坏掉吧啊啊啊${heart(1)}」`,
          );
        }
        kojo.正常位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.正常位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.print(
          `『这次一定要让姐姐的肛门高潮${heart(1)} 姐姐的肛门实在是太棒了${heart(1)} ！』`,
        );
        await era.printAndWait(
          `${player_name}抱着${target_name}的腰，用${weapon}慢慢贯入了肛门之中。`,
        );
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「呜……呜啊！肛门……被撑得满满的了……${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「呜啊啊${heart(1)} 不，不要……那么激烈的抽插啊……肛门……感觉好奇怪啊啊${heart(1)}」`,
          );
        } else {
          await era.printAndWait(`「呜……呜啊……肛门…感觉好奇怪${heart(1)}」`);
        }
        await era.printAndWait(
          `${target_name}被妹妹侵犯着肛门，发出了混杂和欣喜和痛苦的呻吟，让${player_name}更加兴奋起来了`,
        );
        await era.printAndWait(
          `『最喜欢姐姐了${heart(1)} 给我用肛门高潮吧${heart(1)}』`,
        );
        kojo.正常位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.正常位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕＋A感覚Lv3以上
        if (rand_n(3) === 0) {
          await era.print(
            `「不，不行了……肛门……舒服得……要上天了啊啊啊${heart(1)}」`,
          );
          await era.print(`『哎嘿嘿，人家好喜欢姐姐现在这个样子${heart(1)}』`);
          await era.printAndWait(
            `${player_name}抱着${target_name}的腰身，抽插着肛门。被充分开发和调教的肛门也紧紧地吸着${player_name}的${weapon}。`,
          );
          await era.printAndWait(
            `「哈……哈啊……不，不要当着魔王大人的面……侵犯姐姐的肛门啊啊${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.print(
            `「好舒服……已经舒服得……没有办法思考了啊啊啊${heart(1)}」`,
          );
          await era.print(`『哇啊${heart(1)} 姐姐的肛门……已经变成名器了！』`);
          await era.printAndWait(
            `${player_name}前后动着腰，持续地侵犯着${target_name}的肛门。${player_name}被充分开发和调教的肛门与${weapon}的交合处传来一阵阵淫秽不堪的声音。`,
          );
          await era.printAndWait(
            `「不要……取笑姐姐啦${heart(1)} 嗯啊……啊啊啊${heart(1)}」`,
          );
        } else {
          await era.print(
            `『原来姐姐被侵犯肛门时，会发出这么下流的声音呀${heart(1)}』`,
          );
          await era.print(
            `「嗯啊啊……啊啊……肛门……舒服得……像是要坏掉了一样啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}感受着肛门被${player_name}用${weapon}侵犯的快感，忍不住娇喘了起来。`,
          );
          await era.printAndWait(
            `「不……不要……这么激烈${heart(1)} ${player_name}把姐姐的肛门……弄得要去了啊啊啊${heart(1)}」`,
          );
        }
        kojo.正常位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.正常位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.print(
          `『姐姐感觉到舒服了吗${heart(1)} 我可是很舒服呢${heart(1)} 嘿嘿嘿！』`,
        );
        await era.printAndWait(
          `${player_name}抱着${target_name}的腰，用${weapon}贯入肛门之中抽插了起来。`,
        );
        if (rand_n(3) === 0) {
          await era.printAndWait(`「呜啊……有……有点痛……啊啊！」`);
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊……啊啊……慢，慢一点……姐姐的屁股……要裂开了！」`,
          );
        } else {
          await era.printAndWait(`「停，停下来啊……拜托了……让姐姐……缓一下！」`);
        }
        await era.print(
          `『太用力了吗，真是不好意思……都是因为姐姐的肛门实在是让人太舒服了！』`,
        );
        await era.printAndWait(
          `虽然这么说着，但是${player_name}丝毫没有减慢动作，反而更激烈地侵犯着${target_name}的肛门。`,
        );
        kojo.正常位肛交 = 4;
      } else if (
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.正常位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // A感覚Lv3以上
        await era.print(
          `「好舒服……已经舒服得……没有办法思考了啊啊啊${heart(1)}」`,
        );
        await era.print(
          `『哎嘿嘿，姐姐看起来已经很享受肛交的样子了呢${heart(1)} 我也为姐姐感到开心呀${heart(1)}』`,
        );
        await era.printAndWait(
          `${player_name}抱着${target_name}的腰，用${weapon}贯入肛门之中抽插了起来。`,
        );
        if (rand_n(3) === 0) {
          await era.printAndWait(`「哈啊……啊啊……太，太激烈了啊啊！」`);
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「稍，稍微……慢一点……让姐姐……缓口气……」`);
        } else {
          await era.printAndWait(
            `「不，不是这样的！才没……没有享受什么的啊啊啊」`,
          );
        }
        kojo.正常位肛交 = 3;
      } else if (kojo.正常位肛交 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外（爱慕無し、A感覚Lv3未満）
        await era.print(
          `『姐姐${heart(1)} 肛交的感觉舒服吗${heart(1)} 嘿嘿嘿！』`,
        );
        await era.printAndWait(
          `${player_name}强行抱着${target_name}的腰，用${weapon}慢慢贯入了肛门之中。`,
        );
        if (rand_n(3) === 0) {
          await era.printAndWait(`「不可以，不可以啊啊啊！！！」`);
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「好，好痛啊啊……屁股……会坏掉的啊啊！」`);
        } else {
          await era.printAndWait(`「停，快停下来……好痛，好痛啊啊！」`);
        }
        await era.printAndWait(
          `${target_name}感受着被妹妹强暴着肛门的屈辱和痛苦，哭泣着。`,
        );
        kojo.正常位肛交 = 2;
      }
    } else {
      // 淫乱＋A感覚Lv3以上
      if (
        era.get(`talent:${target}:76`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.正常位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「哈啊……嗯啊啊${heart(1)} 淫荡的肛门……得到魔王大人的……疼爱了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}尽情享受着${player_name}的肛交，无比享受地娇喘着`,
          );
          await era.printAndWait(
            `被彻底调教，开发过的肛门，紧紧夹着${player_name}的阴茎，主动地摩擦着。`,
          );
          await era.print(
            `「不，不行了……肛门……舒服得……要上天了啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `阴茎与${target_name}肛门交合时发出的下流的声音让${player_name}更加兴奋地抽插着………`,
          );
        } else if (rand_n(2) === 0) {
          await era.print(
            `「好舒服……已经舒服得……没有办法思考了啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}感受着肛交的极度快感，发出一阵阵淫浪的娇喘。`,
          );
          await era.printAndWait(
            `「哈……哈啊……魔王大人……把人家的淫肛……撑得满满的${heart(1)} 」`,
          );
          await era.printAndWait(
            `${target_name}向${player_name}露出了淫媚的笑容，完全沉浸在肛交的快感之中………`,
          );
        } else {
          await era.print(
            `「呜……呜呜……直肠壁……被这么摩擦着……感觉太舒服了啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}的肛门被${target_name}激烈的抽插着，淫荡的交合声不绝于耳。`,
          );
          await era.printAndWait(
            `「魔王大人……请尽，尽情侵犯人家的肛门吧啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}已经完全沦为沉浸在肛交快感中的性奴了………`,
          );
        }
        kojo.正常位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.正常位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `「呜，呜啊${heart(1)} 魔……魔王大人的阴茎……插进屁股里了${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}边呻吟着，边用肛门努力接纳着${player_name}的阴茎。`,
        );
        await era.print(`「呜啊……屁股……原来也能这么舒服啊啊啊」`);
        await era.printAndWait(
          `${target_name}感受着肛门被慢慢撑开的奇异快感，呻吟了起来`,
        );
        kojo.正常位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.正常位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕＋A感覚Lv3以上
        if (rand_n(3) === 0) {
          await era.print(`「肛交……太棒了……真的是世界上最棒的事情了啊啊啊」`);
          await era.printAndWait(
            `${target_name}尽情地享受着${player_name}的肛交。`,
          );
          await era.printAndWait(
            `「嗯啊……啊啊啊${heart(1)} 让${target_name}的肛门……永远当魔王大人的……专用飞机杯吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}带着幸福得要融化了一般的笑容，用双腿缠住了${player_name}的腰………`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「哈……哈啊……用肛门接受……魔王大人的……疼爱了呢……${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}向${player_name}露出幸福的笑容，已经成为性感带的肛门紧紧夹吸着阴茎。`,
          );
          await era.print(
            `「不，不行了……肛门……舒服得……要上天了啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `肛交的快感让${target_name}的幸福娇喘在${player_name}的耳边不断响起………`,
          );
        } else {
          await era.printAndWait(
            `${player_name}在交合中不断撞击着${target_name}的腰身，聆听着${target_name}幸福的娇喘。`,
          );
          await era.print(
            `「呜……呜呜……直肠壁……被这么摩擦着……感觉太舒服了啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `作为回应，${target_name}用双腿缠住了${player_name}的腰，肛门也紧紧吸吮着阴茎。`,
          );
          await era.printAndWait(
            `「魔，魔王大人……请尽情在……肛门里射精吧${heart(1)}」`,
          );
        }
        kojo.正常位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.正常位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(
          `「呜……还……还是有点点痛……不过，不要紧的……请魔王大人……尽情的……！」`,
        );
        await era.printAndWait(
          `${target_name}有些吃痛地呻吟着，努力用肛门接纳着${player_name}的阴茎。`,
        );
        await era.print(`「呜……呜呜……直肠壁……被这么摩擦着……感觉……好奇怪！」`);
        await era.printAndWait(
          `${target_name}被慢慢撑开的肛门却传来了奇特的满足感，让她忍不住呻吟了起来……`,
        );
        kojo.正常位肛交 = 4;
      } else if (
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.正常位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // A感覚Lv3以上
        await era.printAndWait(`「呜……呜啊啊……插……插进屁股里了……！」`);
        await era.printAndWait(
          `${target_name}被充分开发的肛门，已经完全接纳了${player_name}的阴茎。`,
        );
        await era.print(`「侵犯得……太激烈了……但，但是……感觉……又好奇怪啊啊！」`);
        await era.printAndWait(
          `感受着肛交的快感，${target_name}后仰着头，呻吟了起来。。`,
        ); // 原作有连续两个句号，1:1 保真
        await era.printAndWait(`「为，为什么……屁股也会……这么舒服的啊啊！」`);
        kojo.正常位肛交 = 3;
      } else if (kojo.正常位肛交 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外（爱慕無し、A感覚Lv3未満）
        if (rand_n(3) === 0) {
          await era.printAndWait(`「呜……呜呜……好痛啊啊！」`);
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「放……放开我啊啊……！」`);
        } else {
          await era.printAndWait(`「屁股……会坏掉的啊啊啊！」`);
        }
        await era.printAndWait(
          `${target_name}被${player_name}压在身下，侵犯着尚未经过充分调教和开发的肛门。`,
        );
        await era.printAndWait(
          `意识到自己没有任何逃脱的机会，只能闭上眼睛拼命忍耐着`,
        );
        kojo.正常位肛交 = 2;
      }
    }
    return 0;
  }

  // IF SELECTCOM == 27（背后位肛交 CFLAG:328）
  if (era_flag.selectcom === 27) {
    const weapon =
      era0(`talent:${player}:121`) === 0 && era0(`talent:${player}:122`) === 0
        ? '电动假阳具'
        : '阴茎';

    if (kojo.背后位肛交 === 0) {
      if (assi_mao) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(`『姐姐的肛门……真是侵犯多少次都不会腻啊♪』`);
          await era.printAndWait(
            `${player_name}窃笑着，用后背位持续地侵犯，蹂躏着${target_name}的肛门。`,
          );
          await era.printAndWait(
            `「呜……呜啊……啊啊啊${heart(1)} 姐姐的……肛门……就是为了……被侵犯而存在的啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}感受着被妹妹肛交的背德快感，淫浪地娇喘着……`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `『姐姐的肛门在被侵犯的时候……一张一合的特别好看呢♪』`,
          );
          await era.printAndWait(
            `${player_name}嬉笑着，用后背位持续地侵犯，蹂躏着${target_name}的肛门`,
          );
          await era.printAndWait(`「不……不要看啊啊……太害羞了！」`);
          await era.printAndWait(
            `${target_name}在肛交的同时被${player_name}视奸着，羞耻得几乎要背过气去………`,
          );
        } else {
          await era.printAndWait(`『哎嘿嘿，姐姐你是跑不掉的…♪』`);
          await era.printAndWait(`「住，住手啊……那里是屁股啊啊啊啊！」`);
          await era.printAndWait(
            `${target_name}被${player_name}从后面按住腰，用${weapon}径直插入了肛门之中。`,
          );
          await era.printAndWait(
            `被亲妹妹做出如此屈辱的行为，${target_name}泪流满面地哭泣着……`,
          );
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「哈啊……啊啊……魔王大人……从后面进入我的……小淫肛了${heart(1)}」`,
          );
          if (chara(target).system.肛门感觉 >= 3) {
            await era.printAndWait(
              `${target_name}娇喘着，感受着肛交的快感，直肠紧紧夹着${player_name}的阴茎。`,
            );
            await era.printAndWait(
              `被充分调教，开发过的肛门，如今完全变成了性器一样，享受着${player_name}的抽插。`,
            );
            await era.printAndWait(
              `「嗯啊……啊啊啊……魔王大人……在，在人家的肛门里尽情地射精吧${heart(1)}」`,
            );
            await era.printAndWait(
              `${player_name}按着${target_name}光的臀部，每一次都顶到了最里面……`,
            );
          } else {
            await era.printAndWait(
              `${target_name}尚未经过充分开发的肛门被从后面侵犯着，紧致的直肠紧紧夹着${player_name}的阴茎。`,
            );
            await era.printAndWait(
              `「哈啊……啊啊……肛门像性器一样……被魔王大人……侵犯着啊啊啊！」`,
            );
            await era.printAndWait(
              `${player_name}舔着嘴唇，继续激烈地抽插着${target_name}的肛门………`,
            );
          }
        } else if (era.get(`talent:${target}:85`) === 1) {
          if (chara(target).system.肛门感觉 >= 3) {
            await era.printAndWait(
              `${target_name}被充分调教，开发的肛门和直肠紧紧夹着${player_name}的阴茎，感受着来自背后的侵犯。`,
            );
            await era.printAndWait(
              `「啊啊……啊啊啊……魔王大人全，全部插进来了……好……好厉害啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `「尽，尽情侵，侵犯${target_name}的肛门吧${heart(1)}」`,
            );
            await era.printAndWait(
              `在${target_name}一阵阵甘甜的娇喘声中、${player_name}前后动着腰抽插着………`,
            );
          } else {
            await era.printAndWait(
              `「拜，拜托了……稍微温柔一点……这样突然从后面插进来！」`,
            );
            await era.printAndWait(
              `${target_name}尚未经过充分开发的肛门被从后面侵犯着，不适感让她弓起了身子，紧致的直肠紧紧夹着${player_name}的阴茎。`,
            );
            await era.printAndWait(
              `${player_name}舔着嘴唇，开始慢慢地品味着和姐姐肛交的感觉………`,
            );
          }
        } else {
          if (chara(target).system.肛门感觉 >= 3) {
            await era.printAndWait(
              `「呜……呜啊啊……这，这样突然插进来……但是……为什么会……感觉这么舒服的……呜啊！」`,
            );
            await era.printAndWait(
              `已经被充分调教，开发过的肛门再勤侵犯下很快感受到了快感，让${target_name}的呻吟很快变成了甘甜的娇喘。`,
            );
            await era.printAndWait(
              `「不……不行了……再这样下去……屁股会变得奇怪的……快点结束吧！」`,
            );
            await era.printAndWait(
              `肛门的快感越来越强烈，让${target_name}的头脑逐渐变得混乱起来……`,
            );
          } else {
            await era.printAndWait(
              `「不，不可以啊啊……这样……屁股会坏掉的啊啊啊！」`,
            );
            await era.printAndWait(
              `${target_name}被${player_name}强行侵犯着肛门，极度的不适和疼痛让她发出了凄惨的悲鸣。`,
            );
            await era.printAndWait(`「饶了……饶了我吧……真的……求你了………！」`);
          }
        }
      }
      kojo.背后位肛交 = 1;
      return 0;
    } else {
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.背后位肛交 <= 6 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(3) === 0) {
            await era.print(
              `「不，不行了……肛门……舒服得……要上天了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}的肛门已经被完全调教成了性器，完全容纳了${player_name}的阴茎，享受着侵犯和抽插。`,
            );
            await era.printAndWait(
              `敏感的直肠壁如同阴道一样分泌着爱液，蠕动摩擦着${player_name}的阴茎`,
            );
            await era.print(
              `『唔哇哇……姐姐的肛门，根本已经完全变成性器了嘛……我怎么会有这么变态的姐姐${heart(1)}』`,
            );
            await era.printAndWait(
              `「是……是啊……姐姐是${player_name}……和魔王大人的……肛交性奴啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${player_name}带着鄙夷的表情看着${target_name}，然后抓着${target_name}的臀部，更加激烈地侵犯着自己姐姐的肛门……`,
            );
          } else if (rand_n(2) === 0) {
            await era.print(
              `「肛交……太棒了……真的是世界上最棒的事情了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(`强烈的快感让${target_name}夸张地娇喘着。`);
            await era.printAndWait(
              `已经被完全调教成性器的肛门，有规律地一张一合着，紧紧夹着${player_name}的阴茎，用敏感的直肠不住地摩擦着。`,
            );
            await era.print(
              `『唔哇哇……姐姐的淫乱肛门……居然在自己摩擦着人家的小鸡鸡。这么淫乱的女人，才不是我的姐姐♪』`,
            );
            await era.printAndWait(
              `「真……真是对不起呢，${player_name}……请，请尽情地把拥有这个淫乱肛门性器的姐姐……当成母猪性奴那样侵犯吧${heart(1)}」`,
            );
          } else {
            await era.print(
              `「请尽情地侵犯${target_name}的肛门小穴吧${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}已经被调教成性器的肛门，在极度的快感下抽搐着，紧紧夹着阴茎。`,
            );
            await era.printAndWait(
              `被自己的妹妹从后面这样侵犯着，背德的心理快感让${target_name}更加享受地娇喘着。`,
            );
            await era.print(
              `『唔哇哇，姐姐肛交的样子，根本就像母狗一样，难道一点都不感到羞耻吗？』`,
            );
            await era.printAndWait(
              `「是……是啊……姐姐是${player_name}和魔王大人的母狗${heart(1)} 母狗又怎么会感到羞耻呢…${heart(1)}　不，不行了……屁股太舒服了……舒服得……要去了啊啊${heart(1)}」`,
            );
          }
          kojo.背后位肛交 = 7;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.背后位肛交 <= 5 || game.kojo.口上开关 === 2)
        ) {
          await era.print(`『啊嘿嘿，姐姐的屁股……真是调教多少次都不会腻啊♪』`);
          await era.printAndWait(
            `${player_name}嬉笑着，扭动着腰，激烈地侵犯，蹂躏着${target_name}的肛门。`,
          );
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `「是……是啊啊${heart(1)} 姐姐的肛门……就是用来给${player_name}和魔王大人……虐待的啊啊啊${heart(1)}」`,
            );
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「是……是的……请……尽情地侵犯姐姐的淫乱肛门吧${heart(1)}……侵犯到坏掉……也没有关系！」`,
            );
          } else {
            await era.printAndWait(
              `「啊啊啊……不，不行了……屁股被这么侵犯${heart(1)} 一下子就要去了啊啊${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `${target_name}被妹妹从身后侵犯着肛门，发出了享受的娇喘………`,
          );
          kojo.背后位肛交 = 6;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.背后位肛交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(3) === 0) {
            await era.print(
              `「肛交……太棒了……真的是世界上最棒的事情了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}被${player_name}从身后侵犯着，敏感的肛门在快感中微微抽搐着，紧紧夹着阴茎。`,
            );
            await era.print(
              `『呜哇哇……姐姐的肛门……这么舒服的……真的是名器啊啊！』`,
            );
            await era.printAndWait(
              `「还，……还不是被你们调教的${heart(1)} 哈啊……哈啊……不，不行了${heart(1)} 要用屁股去了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${player_name}欣赏着${target_name}甘甜的娇喘，前后动着腰，更加激烈地抽插着姐姐的肛门……`,
            );
          } else if (rand_n(2) === 0) {
            await era.print(
              `「不，不行了……肛门……舒服得……要上天了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `被${player_name}从身后激烈地侵犯着，${target_name}敏感的肛门抽搐着一张一合，爱液一般的肠液不住地从交合处渗出。`,
            );
            await era.print(
              `『唔哇哇……姐姐的肛门……完全变成性器了呢，真厉害呀${heart(1)} 决定了，以后姐姐的肛门就是我和魔王大人的专用飞机杯了${heart(1)}』`,
            );
            await era.printAndWait(
              `「飞机杯……什么的……怎样都好${heart(1)}…… 呜啊啊……不，不行了……太舒服了，已经舒服得……没有办法思考了${heart(1)}」`,
            );
            await era.printAndWait(
              `${player_name}抬起手，粗暴地拍打着${target_name}的屁股，边前后动着腰，更加激烈地抽插着姐姐的肛门……`,
            );
          } else {
            await era.print(
              `『唔哇哇，姐姐的肛门居然这么淫乱了……那就给我好好地用屁股高潮到坏掉吧！』`,
            );
            await era.printAndWait(
              `「太……太激烈了啊啊！这样……抽插的话……真的一下子就要去了啊啊啊！」`,
            );
            await era.printAndWait(
              `${target_name}的肛门如今已经完全被调教成了称职的性器，将一阵阵强烈的快感传递到大脑中去。`,
            );
            await era.print(
              `「呜呜……要，要去了，要用屁股……去了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${player_name}享受着和姐姐的乱伦肛交，前后动着腰，更加激烈地抽插起来……`,
            );
          }
          kojo.背后位肛交 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.背后位肛交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.print(`『哎嘿嘿，姐姐的漂亮的小肛门……要开始侵犯了哦♪』`);
          await era.printAndWait(
            `${player_name}坏笑着，前后动着腰，开始肆意地侵犯，蹂躏着${target_name}的肛门。`,
          );
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `「为……为什么……要用那种地方来做啦……太羞耻了……呜啊啊」`,
            );
            await era.printAndWait(
              `被后入式侵犯着肛门的羞耻和不适让${target_name}几乎要窒息过去了………`,
            );
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「不，不行啊啊……魔王大人……不要看啊啊啊！」`,
            );
            await era.printAndWait(
              `${target_name}发现被自己妹妹侵犯着肛门的耻态让${master_name}目睹了、羞耻得满脸通红……`,
            );
          } else {
            await era.printAndWait(
              `「漂亮什么的……呜啊啊……拜托你……温柔一点……！」`,
            );
            await era.printAndWait(
              `还不是那么习惯肛交的${target_name}发出了微微的悲鸣，但还是努力地适应着………`,
            );
          }
          kojo.背后位肛交 = 4;
        } else if (
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.背后位肛交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.print(
            `「侵犯得……太激烈了……但，但是……真的好舒服啊啊！${heart(1)}」`,
          );
          await era.print(
            `『姐姐快点说啊${heart(1)} 说自己是喜欢肛交的性奴${heart(1)}！』`,
          );
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `「才，才不要……说那样的话……呜啊啊……稍微……温柔一点……！」`,
            );
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「说，说什么啊……呜啊啊……不，不要再……顶到里面来了……稍微出去……一点点！」`,
            );
          } else {
            await era.printAndWait(
              `「唔啊啊……太，太激烈了……慢一点……求你了……让我……说什么都可以！」`,
            );
          }
          await era.printAndWait(
            `敏感的肛门被自己的妹妹侵犯着，耻辱和快感交织着让${target_name}发出了灼热的呻吟。`,
          );
          await era.printAndWait(
            `快感最终战胜了理智，让${target_name}迷迷糊糊地说出了羞耻的宣言………`,
          );
          kojo.背后位肛交 = 3;
        } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 === 2) {
          await era.print(`『啊嘿嘿，性奴姐姐，屁股感觉舒服吗？』`);
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `「住，住手啊……屁股……要坏掉了……真的要坏掉了！」`,
            );
          } else if (rand_n(2) === 0) {
            await era.printAndWait(`「饶，饶了我吧……求你了……！」`);
          } else {
            await era.printAndWait(`「根本……不可能感觉舒服的啊……呜呜呜！」`);
          }
          await era.printAndWait(
            `${target_name}被${player_name}从后面侵犯着，过于紧致的肛门只是几次抽插就已经红肿了起来。`,
          );
          await era.printAndWait(
            `肛交和乱伦的屈辱让${target_name}痛苦得泪流满面………`,
          );
          kojo.背后位肛交 = 2;
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.背后位肛交 <= 6 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(3) === 0) {
            await era.print(
              `「肛交……太棒了……真的是世界上最棒的事情了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `被${player_name}从后面侵犯着敏感的肛门，${target_name}发出一声声淫浪的娇喘，享受着肛交的极致快感。`,
            );
            await era.printAndWait(
              `已经完全性器化的肛门，紧紧地包裹着阴茎，蠕动的直肠反复摩擦着。`,
            );
            await era.printAndWait(
              `「魔王大人……魔王大人${heart(1)} 把${target_name}射得满满的，用精液给人家灌肠吧${heart(1)}」`,
            );
            await era.printAndWait(
              `${player_name}舔着嘴唇，按着${target_name}光洁的臀部，更加激烈地抽插着………`,
            );
          } else if (rand_n(2) === 0) {
            await era.print(
              `「嗯啊啊……啊啊……肛门……舒服得……像是要坏掉了一样啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `淫浪的娇喘声中，${target_name}的肛门在快感下一张一合地抽搐着。`,
            );
            await era.printAndWait(
              `已经完全被调教成性器的肛门被从后面侵犯，${player_name}的阴茎一次次摩擦着直肠的敏感点`,
            );
            await era.printAndWait(
              `「嗯啊……啊啊啊${heart(1)} 魔王大人……尽情地……把人家的屁股……侵犯到坏掉吧${heart(1)}」`,
            );
          } else {
            await era.print(`「侵犯得……太激烈了……但，但是……真的好舒服啊啊！」`);
            await era.printAndWait(
              `${target_name}淫乱的肛门如今已经完全变成了性器，紧紧地夹着${player_name}的阴茎摩擦着。`,
            );
            await era.printAndWait(
              `感受着激烈的抽插，${target_name}尽情地娇喘着，享受着。`,
            );
            await era.printAndWait(
              `「啊啊……呜啊啊${heart(1)} 肛交……真的是……太舒服了……舒服的要上天了啊啊啊${heart(1)}」`,
            );
          }
          kojo.背后位肛交 = 7;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.背后位肛交 <= 5 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `敏感的肛门尚未得到充足的调教就被侵犯了，疼痛、不适与异样的快感让${target_name}弓起了身子。`,
          );
          await era.print(`「屁股……原来也能这么舒服啊啊啊！」`);
          await era.printAndWait(
            `「呜啊……啊啊啊……魔王大人……请尽情地将${target_name}的肛门……调教成您的专用飞机杯吧！」`,
          );
          await era.printAndWait(
            `${player_name}舔着嘴唇，按着${target_name}光洁的臀部，更加激烈地抽插着……`,
          );
          kojo.背后位肛交 = 6;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.背后位肛交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `「啊啊啊……魔王大人……在人家的肛门里……激烈地抽插着……好厉害${heart(1)}」`,
            );
            await era.printAndWait(
              `已经完全被调教成性器的肛门紧紧地包裹着${player_name}的阴茎，蠕动的直肠反复摩擦着。`,
            );
            await era.print(
              `「呜……呜呜……直肠壁……被这么摩擦着……感觉太舒服了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${player_name}欣赏着${target_name}甘甜的娇喘，前后动着腰继续侵犯着…`,
            );
          } else if (rand_n(2) === 0) {
            await era.print(
              `「请尽情……尽情地侵犯${target_name}的肛门小穴吧${heart(1)}」`,
            );
            await era.printAndWait(
              `被激烈侵犯着的肛门感受到了极致的快感，让${target_name}发出一声声甘甜的娇喘，享受着被心爱的${player_name}侵犯。`,
            );
            await era.printAndWait(
              `「这样的姿势……好羞耻……但是……好舒服${heart(1)} 真的……舒服得要去了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${player_name}按着${target_name}光洁的臀部，更加激烈地抽插着………`,
            );
          } else {
            await era.printAndWait(
              `「呜啊啊……魔王大人……请尽情地侵犯……这个专属于您的……肛门性器吧${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}的肛门，如今已经完全被${player_name}调教成适合阴茎插入的性器了。`,
            );
            await era.print(
              `「呜……呜呜……直肠壁……被这么摩擦着……感觉太舒服了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${player_name}欣赏着自己的调教成果，更加激烈地抽插着……`,
            );
          }
          kojo.背后位肛交 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.背后位肛交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「拜……拜托了……魔王大人……请温柔一点！」`);
          await era.printAndWait(
            `${target_name}还有点不适应肛交的感觉，整个背部都因为不适而弓了起来。`,
          );
          if (rand_n(2) === 0) {
            await era.printAndWait(
              `${player_name}抓着${target_name}光洁的臀部，毫不留情地继续抽插着着。`,
            );
          } else {
            await era.printAndWait(
              `${player_name}舔着嘴唇，按着${target_name}光洁的臀部，开始品味着直肠温热的触感……`,
            );
          }
          await era.printAndWait(
            `「呜……呜啊啊……不行了，屁股感觉……好奇怪……又……又有点舒服！」`,
          );
          kojo.背后位肛交 = 4;
        } else if (
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.背后位肛交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.print(`「侵犯得……太激烈了……但，但是……感觉又好舒服……！」`);
          await era.printAndWait(
            `敏感的肛门被从后面侵犯着，${target_name}忍不住发出了享受的娇喘。`,
          );
          await era.printAndWait(
            `「拜……拜托了……魔王大人……请温柔一些……呜啊……啊啊啊！」`,
          );
          await era.printAndWait(
            `肛交的快感已经逐渐淹没了${target_name}的思维……`,
          );
          kojo.背后位肛交 = 3;
        } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(
            `「为……为什么要用这种地方做……唔啊啊……会，会坏掉的啊啊！」`,
          );
          await era.printAndWait(
            `${player_name}抓着${target_name}光洁的臀部，毫不留情地侵犯着过于紧致的肛门。痛苦和不适让${target_name}凄惨的悲鸣着。`,
          );
          await era.printAndWait(
            `「呜啊啊……好痛……真的好痛！饶了我吧……求你了！」`,
          );
          kojo.背后位肛交 = 2;
        }
        return 0;
      }
    }
  }

  // IF SELECTCOM == 28（对面座位肛交 CFLAG:329）
  if (era_flag.selectcom === 28) {
    if (kojo.对面座位肛交 === 0) {
      if (assi_mao) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「哎嘿嘿……姐姐已经准备好了${heart(1)} 快点来侵犯，虐待这个淫乱的肛门吧${heart(1)}」`,
          );
          await era.print(
            `『唔哇哇……我都不知道姐姐已经变得这么淫乱了呢${heart(1)}』`,
          );
          await era.printAndWait(
            `${player_name}欣赏着${target_name}甘甜的娇喘，更加激烈地侵犯着姐姐的肛门………`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(`「呜啊啊……不，不要……那样突然停住啊啊！」`);
          await era.print(`『怎么了，姐姐？想要我继续的话，就要大声请求啊♪』`);
          await era.printAndWait(
            `「真……真是的……请，请继续……侵犯${target_name}的肛门吧……拜托了！」`,
          );
          await era.printAndWait(
            `${player_name}抓着${target_name}光洁的臀部，顶起腰再次开始侵犯姐姐的肛门，甘甜的娇喘在耳边响起了`,
          );
        } else {
          await era.print(
            `『哎哎，姐姐不要遮住脸啊，让我好好看看姐姐的肛门被侵犯时是什么表情的呀！』`,
          );
          await era.printAndWait(
            `「呜呜呜……为什么……为什么要对姐姐做这种事情……请停下吧！」`,
          );
          await era.print(
            `『让我看着你的脸的话、我会更温柔的哦？为什么这都不明白呢…${heart(1)}』`,
          );
          await era.printAndWait(
            `${player_name}将${target_name}抱在腿上，挺起腰部，继续侵犯着姐姐的肛门……`,
          );
        }
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `${target_name}被${player_name}紧紧抱在大腿上侵犯着肛门，强烈的快感让她止不住地娇喘着。`,
        );
        await era.printAndWait(
          `「呜啊……嗯啊啊……好舒服……屁股……好舒服…${heart(1)} 魔王大人……人家……还想要……更激烈的……啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `淫浪的娇喘让${player_name}的阴茎更加兴奋地挺立着……`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `${target_name}被${player_name}抱在怀里，发出了甘甜的喘息声。`,
        );
        await era.printAndWait(
          `「呜啊啊……屁股……被魔王大人的阴茎撑开了……感觉好，好厉害……${heart(1)}」`,
        );
        await era.printAndWait(
          `${player_name}慢慢地动着腰，开始品味着${target_name}肛门的触感……`,
        );
      } else {
        await era.printAndWait(
          `${target_name}的双手被${player_name}反扣在背上，就以这样的姿势被侵犯着肛门。`,
        );
        await era.printAndWait(`「好痛……好痛……放过我吧……求你了！」`);
        await era.printAndWait(
          `过于激烈的交合让${target_name}无比痛苦地悲鸣着……`,
        );
      }
      kojo.对面座位肛交 = 1;
      return 0;
    }

    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.对面座位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `${target_name}被${player_name}抱在腿上侵犯着肛门，淫浪地娇喘了起来。`,
          );
          await era.printAndWait(
            `「呜啊……啊啊${heart(1)} 好舒服……屁股……好舒服……舒服的要去了啊啊啊${heart(1)} 」`,
          );
          await era.print(
            `『哎哎，姐姐要再大声一点啊，让魔王大人好好听一下姐姐有多喜欢肛交${heart(1)}』`,
          );
          await era.printAndWait(
            `${player_name}边欣赏着${target_name}的娇喘，边更加激烈地抽插着着自己姐姐的肛门……`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `${target_name}主动扭起了腰，如饥似渴地追求着更强烈的肛交快感。`,
          );
          await era.print(
            `『唔哇哇……姐姐动得这么夸张${heart(1)} 真的有那么舒服吗，你这个淫乱的肛门性奴${heart(1)}』`,
          );
          await era.printAndWait(
            `「不，不行了……${player_name}的阴茎……插得姐姐的屁股……太舒服了${heart(1)} 舒服得……要上天了啊啊啊${heart(1)} 」`,
          );
          await era.printAndWait(
            `随着姐妹更加激烈的交合，淫浪的娇喘声在调教室里回荡着……`,
          );
        } else {
          await era.printAndWait(
            `「请……尽情地把${target_name}的肛门${heart(1)} 侵犯到……高潮吧${heart(1)} 弄到……坏掉也没有关系啊啊啊${heart(1)}」`,
          );
          await era.print(
            `「不，不行了……肛门……舒服得……要上天了啊啊啊${heart(1)}」`,
          );
          await era.print(
            `『啊嘿嘿，那就好好配合我的动作吧姐姐${heart(1)} 让我们姐妹俩……一起高潮吧啊啊啊${heart(1)}』`,
          );
          await era.printAndWait(
            `${player_name}撒娇一般地紧紧搂住${target_name}的腰，姐妹的乱伦肛交就这么在你的面前上映着……`,
          );
        }
        kojo.对面座位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.对面座位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.print(
          `「呜……呜呜……直肠壁……被这么摩擦着……感觉太舒服了啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `『哎嘿嘿，变态姐姐这么喜欢被侵犯肛门么${heart(1)} 那接下来就要更激烈了哦！』`,
        );
        await era.print(
          `「哈啊……哈啊${heart(1)} 姐姐的肛门……就是专门给${player_name}和魔王大人……虐待和侵犯用的啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${player_name}将${target_name}抱在腿上，加快了抽插的动作……`,
        );
        kojo.对面座位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.对面座位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `被${player_name}抱在怀中的${target_name}甘甜地娇喘着，享受着被自己妹妹侵犯肛门的背德快感……`,
          );
          await era.print(
            `「肛交……太棒了……真的是世界上最棒的事情了啊啊啊${heart(1)}」`,
          );
          await era.print(`『哎哎，姐姐居然一点都不反抗，人家有点失望呢♪』`);
          await era.printAndWait(
            `${target_name}无力的回答很快就被娇喘淹没，${player_name}叹了口气，随后将怨气都发泄在激烈的抽插中……`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `${target_name}主动扭起了腰，寻求着更强烈的肛交快感。`,
          );
          await era.printAndWait(
            `「对，对不起……${player_name}${heart(1)} 姐姐变成这个样子了……可是……真的已经没有办法忍耐下去了！」`,
          );
          await era.print(
            `『那就给我好好忍耐啊笨蛋姐姐，没有我的允许擅自高潮的话，可是要惩罚的哦！』`,
          );
          await era.printAndWait(
            `耳边响起的${target_name}拼命忍耐着的呻吟让${player_name}更加兴奋了……`,
          );
        } else {
          await era.printAndWait(
            `「呜啊……嗯啊啊${heart(1)} 好舒服……${target_name}的屁股……舒服得要去了啊啊啊${heart(1)}」`,
          );
          await era.print(
            `『哎呀哎呀，淫乱姐姐的淫乱肛门${heart(1)} 被自己的妹妹侵犯也能高潮的大变态！』`,
          );
          await era.print(
            `「对，对不起……姐姐……真的已经变成……只会想着肛交的变态了啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `被${player_name}紧紧抱在腿上的${target_name}，感受着被侵犯的肛门传来的极度快感，甘甜的娇喘在调教室里回荡着……`,
          );
        }
        kojo.对面座位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.对面座位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「不，不要插进来……就这么不动了啊……感觉……好奇怪！」`,
        );
        await era.print(`『嘻嘻，姐姐想要人家做什么，要大声地请求啊…♪』`);
        await era.printAndWait(
          `「呜呜……请……请${player_name}大人……侵犯……性奴${target_name}的肛门……拜托了……」`,
        );
        await era.printAndWait(
          `${player_name}满意地听着${target_name}羞耻的宣言，顶起腰开始激烈地抽插着姐姐的肛门，甘甜的娇喘在耳边不住地响起……`,
        );
        kojo.对面座位肛交 = 4;
      } else if (
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.对面座位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.print(`「呜……呜啊啊……屁股……为什么会这么舒服……！」`);
        await era.print(
          `『哎呀呀，我怎么会有这么淫乱的姐姐，被妹妹侵犯肛门居然能感到舒服${heart(1)}』`,
        );
        await era.printAndWait(
          `「不，不要说……这种话啊${player_name}………可，可是……真的好舒服啊啊啊！」`,
        );
        await era.printAndWait(
          `${player_name}窃笑着顶起腰，开始激烈地抽插着${target_name}的肛门，聆听着姐姐炽热的呻吟和娇喘…`,
        );
        kojo.对面座位肛交 = 3;
      } else if (kojo.对面座位肛交 <= 1 || game.kojo.口上开关 === 2) {
        await era.print(
          `『哎嘿嘿，姐姐不要遮住脸啊，让我好好看看姐姐被侵犯肛门时会露出怎样的淫乱表情啊！』`,
        );
        await era.printAndWait(
          `「呜……呜呜……为，为什么要这样折磨姐姐！啊啊啊！不，不能再往里顶了……真的……会坏掉的啊啊啊！」`,
        );
        await era.print(
          `『坏掉？！放心，不会的啦，我和魔王大人呀，是打算把姐姐调教成除了肛交之外，什么都不会想的肛门性奴呢♪』`,
        );
        await era.printAndWait(
          `${player_name}恶意地笑着，顶起腰，开始更加激烈地抽插着姐姐的肛门。`,
        );
        kojo.对面座位肛交 = 2;
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      chara(target).system.肛门感觉 >= 3 &&
      (kojo.对面座位肛交 <= 6 || game.kojo.口上开关 === 2)
    ) {
      if (rand_n(3) === 0) {
        await era.printAndWait(
          `被${player_name}抱在腿上的${target_name}，正在肛交的极度快感中淫浪地娇喘着。`,
        );
        await era.print(
          `「呜啊……嗯啊啊……好舒服……屁股舒服得……简直要上天了啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${player_name}边欣赏着这甜美的声音，边细细品味着${target_name}肛门的触感…`,
        );
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `${target_name}主动扭起了腰，寻求着更强烈的肛交快感。`,
        );
        await era.printAndWait(
          `「实，实在是太舒服了${heart(1)} 已经……完全没有办法再忍下去了啊啊啊${heart(1)} 」`,
        );
        await era.print(
          `「让，人家高潮吧，魔王大人！让人家的肛门……高潮到彻底坏掉吧啊啊啊！」`,
        );
        await era.printAndWait(
          `耳边响起的${target_name}淫浪的娇喘，让${player_name}的阴茎更加兴奋地挺立着……`,
        );
      } else {
        await era.printAndWait(
          `「呜啊……啊啊啊${heart(1)} 魔王大人！魔王大人${heart(1)}」`,
        );
        await era.print(
          `「尽情地，把这个只属于您的……肛门性器……侵犯到彻底坏掉吧啊啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}靠在${player_name}身上，淫浪的娇喘着，享受着肛交的极度快感……`,
        );
      }
      kojo.对面座位肛交 = 7;
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.对面座位肛交 <= 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `被${player_name}抱在腿上的${target_name}，正随着阴茎一次次突入肛门之中而炽热的呻吟着。`,
      );
      if (rand_n(2) === 0) {
        await era.printAndWait(
          `「咿啊……呜啊啊…${heart(1)} 魔王大人……请……尽情地侵犯我吧${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「呜啊啊……肛门……要被魔王大人……调教成性器了啊啊啊${heart(1)}！」`,
        );
      }
      await era.printAndWait(
        `呻吟很快变成了享受的娇喘，甜美的声音让${player_name}的阴茎更加兴奋地挺立着，在直肠里抽插着………`,
      );
      kojo.对面座位肛交 = 6;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      chara(target).system.肛门感觉 >= 3 &&
      (kojo.对面座位肛交 <= 4 || game.kojo.口上开关 === 2)
    ) {
      if (rand_n(3) === 0) {
        await era.printAndWait(
          `被${player_name}抱在腿上的${target_name}，正在肛交的极度快感中甘甜地娇喘着。`,
        );
        await era.print(
          `「呜啊……嗯啊啊……好舒服${heart(1)}……能和魔王大人肛交……真的是……太幸福了啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${player_name}聆听着${target_name}甜美的娇喘，边细细品味着${target_name}肛门的触感………`,
        );
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `${target_name}主动扭起了腰，寻求着更强烈的肛交快感。`,
        );
        await era.print(
          `「对，对不起……魔王大人……但是实在是，实在是……太舒服了……舒服得……完全停不下来啊啊啊」`,
        );
        await era.printAndWait(
          `耳边响起的${target_name}甘甜的娇喘，让${player_name}的阴茎更加兴奋地挺立着……`,
        );
      } else {
        await era.printAndWait(
          `「呜啊啊……好舒服……实在是……太舒服了${heart(1)}」`,
        );
        await era.print(
          `「魔，魔王大人……让人家……永远当你的……肛交性奴吧啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}紧紧抱着${player_name}，敏感的肛门在极度的快感中微微抽搐着………`,
        );
      }
      kojo.对面座位肛交 = 5;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.对面座位肛交 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `感受着被${player_name}侵犯肛门的异样快感，${target_name}发出了灼热的呻吟。`,
      );
      if (rand_n(3) === 0) {
        await era.printAndWait(
          `「呜啊啊……屁股……被一次次撑开的感觉……好奇怪……但是好舒服${heart(1)}」`,
        );
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `「原，原来……用屁股做……也可以这么舒服的……${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「魔王大人……请尽情地把人家的肛门……当做性器那样侵犯吧${heart(1)}」`,
        );
      }
      await era.printAndWait(
        `${player_name}聆听着${target_name}甜美的娇喘，边动着腰，细细品味着${target_name}肛门的触感………`,
      );
      kojo.对面座位肛交 = 4;
    } else if (
      chara(target).system.肛门感觉 >= 3 &&
      (kojo.对面座位肛交 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `肛交的极度快感一次次冲击着大脑，让${target_name}无意识地双手环抱着${player_name}的脖子。`,
      );
      await era.print(
        `「呜啊……明明……明明是那么奇怪的地方……但是为什么……也会这么舒服啊啊啊！」`,
      );
      await era.printAndWait(
        `${target_name}灼热地呻吟着，连眼神都变得朦胧了……`,
      );
      kojo.对面座位肛交 = 3;
    } else if (kojo.对面座位肛交 <= 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(
        `${target_name}痛苦地抱着${player_name}的脖子，忍耐着肛交的不适和痛苦。`,
      );
      if (rand_n(3) === 0) {
        await era.printAndWait(`「呜呜……拔，拔出去吧……求你了……！」`);
      } else if (rand_n(2) === 0) {
        await era.printAndWait(`「明明……屁股不是用来做这种事的……呜呜呜！」`);
      } else {
        await era.printAndWait(`「饶了我吧……求你了……屁股会，会坏掉的！」`);
      }
      await era.printAndWait(
        `${player_name}毫不理会${target_name}的哀求，继续肆意地侵犯，蹂躏着${target_name}的肛门………`,
      );
      kojo.对面座位肛交 = 2;
    }
    return 0;
  }

  // IF SELECTCOM == 29（背面座位肛交 CFLAG:330）
  if (era_flag.selectcom === 29) {
    const weapon =
      era0(`talent:${player}:121`) === 0 && era0(`talent:${player}:122`) === 0
        ? '电动假阳具'
        : '阴茎';

    if (kojo.背面座位肛交 === 0) {
      if (assi_mao) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「呜……啊啊${heart(1)} 屁股……被塞得满满的……嗯啊啊${heart(1)}」`,
          );
          await era.print(
            `『要把双腿分开啊，让魔王大人看看你淫乱的肛门被插的样子♪』`,
          );
          await era.printAndWait(
            `「哈啊……魔王大人${heart(1)} 请，请尽情欣赏${target_name}自己的妹妹肛交侵犯的样子吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的肛门在快感下一缩一缩地，紧紧夹着${player_name}的${weapon}……`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(`「呜……啊啊……不，不要同时……攻击胸部啊！」`);
          await era.print(
            `『哎嘿嘿，姐姐的淫乱胸部一被摸，屁股就夹得更紧了呢♪』`,
          );
          await era.printAndWait(`「真……真的……好舒服啊啊${heart(1)}」`);
          await era.printAndWait(
            `${target_name}的肛门在快感下一缩一缩地，紧紧夹着${player_name}的${weapon}……`,
          );
        } else {
          await era.printAndWait(`「不……不要做这种事啊啊！」`);
          await era.print(
            `『不好好分开双腿的话就要惩罚了哦？要好好让魔王大人欣赏性奴姐姐用肛门高潮的样子啊♪』`,
          );
          await era.printAndWait(`「呜呜……不要说了，不要再说这种事了………」`);
          await era.printAndWait(
            `${target_name}的双腿被${player_name}强行分开，一览无余地展露着正在被${player_name}的${weapon}侵犯得一张一合的肛门……`,
          );
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「呜……啊啊…${heart(1)} 屁股……被塞得满满的……嗯啊啊…${heart(1)}」`,
          );
          await era.printAndWait(
            `「被魔王大人……这样一边攻击胸部，一边侵犯着肛门${heart(1)} 好舒服……舒服得整个人都要融化了啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}淫浪的娇喘着，享受着肛交的快感……`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「唔啊……啊啊……魔王大人……不，不可以同时……侵犯屁股和胸部啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `「不，不行了……肛门被这样抽插着……太舒服了啊啊…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的肛门在快感下一缩一缩地，紧紧夹着${player_name}的${weapon}……`,
          );
        } else {
          await era.printAndWait(`「放，放开我啊啊……这样……好羞耻……呜呜呜！」`);
          await era.printAndWait(
            `${target_name}的双腿被${player_name}强行分开，一览无余地展露着正在被${player_name}的${weapon}侵犯得一张一合的肛门……`,
          );
        }
      }
      // CFLAG:TARGET:330  = 1（变量语义：CFLAG 族，TARGET:330）
      kojo.背面座位肛交 = 1;
      return 0;
    } else {
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.背面座位肛交 <= 6 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `「嗯啊……啊啊啊${heart(1)} 被，被${player_name}这样侵犯肛门……真是太舒服了啊啊！」`,
            );
            await era.printAndWait(
              `${target_name}喊着妹妹的名字，扭动着腰，寻求着更强烈的快感。`,
            );
            await era.print(
              `『哎嘿嘿，原来姐姐这么喜欢肛交的，真是变态呢${heart(1)}』`,
            );
            await era.print(
              `「呜呜……要，要去了，要用肛门……去了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}更加大声的娇喘了起来，微微抽搐的肛门紧紧地夹着抽插中的阴茎………`,
            );
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「呜啊……嗯啊啊${heart(1)} 肛交……好舒服……真的是太棒了啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}微微抽搐的肛门，紧紧夹着${player_name}正在抽插的${weapon}。`,
            );
            await era.print(
              `『姐姐喜欢的话就要大声说出来呀？不然我就拔出去了哦！』`,
            );
            await era.printAndWait(
              `「喜欢，好喜欢！${target_name}最喜欢被${player_name}的阴茎侵犯肛门了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}淫浪的话语让${player_name}无奈地微微叹了口气……`,
            );
          } else {
            await era.printAndWait(
              `「啊啊……胸部，还想要被更用力地揉${heart(1)}」`,
            );
            await era.print(
              `『嘿嘿，那就让魔王大人看看姐姐是屁股和胸部哪个先高潮好了${heart(1)}』`,
            );
            await era.printAndWait(
              `敏感的乳头被妹妹的手指搓弄着，被侵犯着的肛门一张一合地抽搐着。`,
            );
            await era.print(
              `『哎呀，屁股夹得这么紧，看来还是这个淫荡的肛门性器要先去了呢${heart(1)}』`,
            );
            await era.printAndWait(
              `「是……是啊，姐姐的肛门是……淫乱的性器啊啊啊！好舒服……舒服得……要去了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${player_name}抱着${target_name}双腿，坚挺的${weapon}持续侵犯着在快感中抽搐着的肛门……`,
            );
          }
          // CFLAG:330  = 7（变量语义：CFLAG 族，330）
          kojo.背面座位肛交 = 7;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.背面座位肛交 <= 5 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「呜……啊啊……屁股……被塞得满满的${heart(1)}」`);
          await era.print(
            `『哎呀呀，姐姐这么喜欢被魔王大人看见自己肛门被侵犯的淫乱样子吗！？』`,
          );
          await era.printAndWait(
            `「好，好啊……请魔王大人……尽情欣赏${target_name}用肛门高潮吧！」`,
          );
          await era.printAndWait(
            `${target_name}嬉笑着，娇喘着分开双腿，一览无余地展露着正在被${player_name}的${weapon}侵犯得一张一合的肛门…`,
          );
          // CFLAG:330  = 6（变量语义：CFLAG 族，330）
          kojo.背面座位肛交 = 6;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.背面座位肛交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(3) === 0) {
            await era.print(
              `「不，不行了……肛门……舒服得……要上天了啊啊啊${heart(1)}」`,
            );
            await era.print(
              `『哎呀呀，姐姐也变得这么坦率了，娇喘得这么大声，终于承认自己是变态肛交性奴了吗${heart(1)}』`,
            );
            await era.printAndWait(
              `${target_name}分开双腿，边娇喘边展露着正在被${player_name}的${weapon}侵犯得一张一合的肛门…`,
            );
            await era.printAndWait(
              `「嗯啊……啊啊${heart(1)} 姐姐……这么变态……真是对不起${heart(1)}」`,
            );
            await era.printAndWait(
              `肛交的同时，${target_name}丰满的胸部也被妹妹肆意地玩弄着。`,
            );
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「呜啊……嗯啊啊……屁股……被${player_name}塞得满满的…${heart(1)}」`,
            );
            await era.print(
              `『哎嘿嘿，姐姐肛门的触感真的是一点都不输给小穴呢，完全变成性器了呢』`,
            );
            await era.printAndWait(
              `「哈啊……是啊……姐姐的肛门……是专门服务${player_name}和魔王大人的……性器啊啊啊${heart(1)}……」`,
            );
            await era.printAndWait(
              `${target_name}更加大声的娇喘了起来，微微抽搐的肛门紧紧地夹着抽插中的阴茎………`,
            );
            await era.printAndWait(
              `${player_name}也变得更加兴奋了，更加激烈地侵犯着姐姐`,
            );
          } else {
            await era.printAndWait(
              `「啊啊……不，不可以同时……揉捏胸部啊啊${heart(1)}」`,
            );
            await era.print(
              `『哎嘿嘿，姐姐的乳头是弱点吗？一被捏，肛门就夹得更紧了${heart(1)}！』`,
            );
            await era.printAndWait(
              `「呜……啊啊……不，不行了，要，要去了……要用肛门高潮了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}的丰满双乳被${player_name}肆意玩弄着，乳头也被舌头舔舐着。`,
            );
            await era.printAndWait(
              `胸部的刺激让肛门变得更加敏感，抽搐一般紧紧夹着的${player_name}的${weapon}……`,
            );
          }
          // CFLAG:330  = 5（变量语义：CFLAG 族，330）
          kojo.背面座位肛交 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.背面座位肛交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「哎……哎……不，不要同时摸姐姐的胸部啊啊${heart(1)}」`,
          );
          await era.print(
            `『哎嘿嘿，姐姐的乳头是弱点吗${heart(1)} 一被捏，肛门就夹得更紧了${heart(1)}』`,
          );
          await era.printAndWait(
            `「别当着……魔王大人说这种话啊……太，太害羞了……可是……可是真的好舒服啊啊啊！」`,
          );
          await era.printAndWait(
            `胸部的刺激让肛门变得更加敏感，抽搐一般紧紧夹着的${player_name}的${weapon}……`,
          );
          // CFLAG:330  = 4（变量语义：CFLAG 族，330）
          kojo.背面座位肛交 = 4;
        } else if (
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.背面座位肛交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.print(`「侵犯得……太激烈了……屁股感觉好奇怪啊啊！」`);
          await era.print(
            `『哎嘿嘿，肛交的感觉很舒服吧姐姐，叫得这么大声${heart(1)}』`,
          );
          await era.printAndWait(
            `「才……才没有什么……舒服……呃啊啊……我错了……真的，很舒服啊啊${heart(1)}！」`,
          );
          await era.printAndWait(
            `${target_name}的双腿被${player_name}强行分开，一览无余地展露着正在被${player_name}的${weapon}侵犯得一张一合的肛门……`,
          );
          // CFLAG:330  = 3（变量语义：CFLAG 族，330）
          kojo.背面座位肛交 = 3;
        } else if (kojo.背面座位肛交 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(`「呜呜呜……屁股……不是用来做这种事情的啊…」`);
          await era.print(
            `『啊哈哈，姐姐开始变得坦率了呢，屁股夹得紧紧的！快点把双腿分开让魔王大人看看姐姐的肛门调教结果吧！』`,
          );
          await era.printAndWait(`「呜……啊啊，不，不要这么用力往里顶啊啊！」`);
          await era.printAndWait(
            `${target_name}的双腿被${player_name}强行分开，一览无余地展露着正在被${player_name}的${weapon}侵犯得一张一合的肛门……`,
          );
          // CFLAG:330  = 2（变量语义：CFLAG 族，330）
          kojo.背面座位肛交 = 2;
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.背面座位肛交 <= 6 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `「哈啊……魔王大人……尽情地把人家的屁股……侵犯得一塌糊涂吧${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}淫浪地扭着腰，追求着更强烈的快感………。`,
            );
            await era.print(
              `「呜呜……要，要去了，要用肛门……去了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `敏感的胸部被${player_name}肆意玩弄着，让肛门变得更加敏感，抽搐一般紧紧夹着………`,
            );
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「嗯啊啊……啊啊……被魔王大人……的阴茎${heart(1)} 这样侵犯着${heart(1)} 想要，还想要更多啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}敏感的肛门在侵犯下紧紧夹着${player_name}的${weapon}。`,
            );
            await era.print(
              `「肛交……太棒了……真的是世界上最棒的事情了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `肛交的极度快感让${target_name}淫浪的娇喘着，享受着………`,
            );
          } else {
            await era.printAndWait(
              `「呜啊啊……屁股和胸部……被这样同时侵犯着${heart(1)} 好舒服啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `「不，不行了……要去了${heart(1)} ${target_name}的肛门性器……要高潮了啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}双腿张开地被${player_name}抱着。`,
            );
            await era.printAndWait(
              `坚挺的阴茎持续地侵犯，抽插着已经被彻底调教成性器的肛门……`,
            );
          }
          // CFLAG:330  = 7（变量语义：CFLAG 族，330）
          kojo.背面座位肛交 = 7;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.背面座位肛交 <= 5 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `「哈啊……哈啊…${heart(1)} 魔王大人的阴茎……全部进到人家的屁股里了${heart(1)}」`,
            );
            await era.printAndWait(
              `「这对淫乱的胸部……也请魔王大人……尽情蹂躏吧${heart(1)} 啊啊……好，好舒服……边被揉着胸部……边肛交……真的是……太舒服了啊啊啊${heart(1)}」`,
            );
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「请，请尽情地调教人家的肛门吧${heart(1)}…… 用魔王大人的阴茎……把人家的肛门蹂躏，侵犯到彻底坏掉吧${heart(1)}」`,
            );
          } else {
            await era.printAndWait(
              `「嗯啊啊……啊啊……肛门${heart(1)} 变成魔王大人的……专用飞机杯了啊啊${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `${target_name}被${player_name}托着双腿抱在身上侵犯着`,
          );
          await era.printAndWait(
            `肛交的快感让${target_name}忘我的呻吟，娇喘着………`,
          );
          // CFLAG:330  = 6（变量语义：CFLAG 族，330）
          kojo.背面座位肛交 = 6;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.背面座位肛交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `「…请……尽情地把${target_name}淫乱的肛门性器……侵犯得一塌糊涂吧${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}自己扭起了腰，寻求着更激烈的交合。`,
            );
            await era.print(
              `「呜……呜呜……直肠壁……被这么摩擦着……感觉太舒服了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `敏感而丰满的胸部也同时${player_name}肆意揉捏着，双重的快感让${target_name}发出了甘甜的享受的娇喘……`,
            );
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「哈啊……哈啊……魔王大人的阴茎……全部进到人家的……肛门小穴里了${heart(1)}」`,
            );
            await era.print(
              `「嗯啊啊……啊啊……被，被这么激烈地侵犯着${heart(1)}……」`,
            );
            await era.printAndWait(
              `敏感的肛门紧紧夹着${player_name}的阴茎，甚至主动摩擦了起来。`,
            );
            await era.printAndWait(
              `极度的快感让${target_name}发出了甘甜的娇喘……`,
            );
          } else {
            await era.printAndWait(
              `「呜啊啊……魔王大人……这样同时……侵犯胸部和肛门……是犯规的啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `「不，不行了……太舒服了……屁股一下子……就要去了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}双腿大张着，满脸通红地展示着的肛交的姿态`,
            );
            await era.printAndWait(
              `极度的快感让${target_name}一张一合，紧紧夹着${player_name}的阴茎……`,
            );
          }
          // CFLAG:330  = 5（变量语义：CFLAG 族，330）
          kojo.背面座位肛交 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.背面座位肛交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(3) === 0) {
            await era.printAndWait(`「呜……呜啊啊……屁股有点，有点痛………」`);
            await era.printAndWait(`「还请……温柔一点，魔王大人${heart(1)}」`);
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「呜啊啊……魔王大人……这样的姿势……好羞耻！」`,
            );
          } else {
            await era.printAndWait(
              `「被，被这样的姿势侵犯着肛门……不过……只要魔王大人愿意${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `${target_name}双腿大张着，满脸通红地展示着的肛交的姿态`,
          );
          await era.printAndWait(
            `异样的快感让${target_name}一张一合，紧紧夹着${player_name}的阴茎……`,
          );
          // CFLAG:330  = 4（变量语义：CFLAG 族，330）
          kojo.背面座位肛交 = 4;
        } else if (
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.背面座位肛交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.print(`「侵犯得……太激烈了……啊啊啊！」`);
          if (rand_n(3) === 0) {
            await era.printAndWait(`「屁股……为什么……会这么舒服啊啊啊！」`);
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「屁股不是用来做……这种事情的啊啊……可是……好舒服……呜呜呜」`,
            );
          } else {
            await era.printAndWait(
              `「呜呜呜……居然用屁股做这种事情……传出去……就再也没脸见人了！可是……好舒服……呜啊啊」`,
            );
          }
          await era.printAndWait(
            `敏感的肛门在快感下一张一合着，紧紧地夹着正在抽插的阴茎。`,
          );
          await era.printAndWait(
            `${target_name}的肛门，如今已经被调教成了用来取悦${player_name}用的性器了……`,
          );
          // CFLAG:330  = 3（变量语义：CFLAG 族，330）
          kojo.背面座位肛交 = 3;
        } else if (kojo.背面座位肛交 <= 1 || game.kojo.口上开关 === 2) {
          if (rand_n(3) === 0) {
            await era.printAndWait(`「呜……呜啊啊……屁股……会被撑坏的！」`);
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「不，不可以全部……插进来啊……好痛！好痛！！」`,
            );
          } else {
            await era.printAndWait(
              `「求，求你了……不要继续……往里顶了！真的……会死掉的！」`,
            );
          }
          await era.printAndWait(
            `${target_name}的双腿被${player_name}强行分开，过于紧致的肛门已经被阴茎侵犯得有些红肿………`,
          );
          // CFLAG:330  = 2（变量语义：CFLAG 族，330）
          kojo.背面座位肛交 = 2;
        }
      }
      return 0;
    }
  }

  // IF SELECTCOM == 30（手淫 CFLAG:331）
  if (era_flag.selectcom === 30) {
    if (kojo.手淫 === 0) {
      if (assi_mao) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `『姐姐弄得人家的小肉棒好舒服啊啊${heart(1)}』`,
          );
          await era.printAndWait(
            `「哎嘿嘿，把精液射在姐姐的手上吧${heart(1)}」`,
          );
          await era.printAndWait(
            `『啊啊……最喜欢这么温柔的姐姐了……姐姐纤细的手指……太灵活了啊啊♪』`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「居然会有给${player_name}……做这种事情的一天…」`,
          );
          await era.printAndWait(
            `『怎么样，漂亮吧♪，是魔王大人帮我装上去的哦』`,
          );
          await era.printAndWait(`「真，真是的……为什么要做这种事………」`);
        } else if (chara(target).system.侍奉精神 >= 3) {
          await era.printAndWait(
            `『姐姐，要好好侍奉人家的小鸡鸡啊${heart(1)}』`,
          );
          await era.printAndWait(`「明，明白了……是要做这种事吧……」`);
          await era.printAndWait(`『呼呼，姐姐的动作真温柔啊』`);
        } else {
          await era.printAndWait(`「为，为什么……你会长出这样的东西来啊啊！」`);
          await era.printAndWait(
            `『姐姐别哭了，快点给我——唔啊啊，被姐姐纤细的手指这么温柔地弄着……好像在做梦一样』`,
          );
          await era.printAndWait(`「可，可是对我来说……是噩梦啊……呜呜呜…」`);
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「啊啊……魔王大人的阴茎……雄伟地树立在人家面前${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}舔了舔舌头，带着淫媚的表情，用手激烈地摩擦套弄着${player_name}的阴茎`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「啊啊……魔王大人的阴茎……在人家的手里变得硬邦邦的了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}炽热地呼吸着，用纤细的手指温柔而仔细地按摩着${player_name}的阴茎………`,
          );
        } else if (chara(target).system.侍奉精神 >= 3) {
          await era.printAndWait(`「真是的……这种……黏糊糊的感觉……」`);
          await era.printAndWait(
            `${target_name}合拢十指，用不熟练的手法侍奉着${player_name}的阴茎……`,
          );
        } else {
          await era.printAndWait(`「完全不想做这，这种事情……呜呜呜！」`);
          await era.printAndWait(
            `${target_name}战战兢兢地用手侍奉着${player_name}的阴茎`,
          );
        }
      }
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331）
      kojo.手淫 = 1;
      return 0;
    } else {
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.手淫 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「啊啦啦、${player_name}的阴茎，让姐姐帮你变的更大吧${heart(1)}」`,
          );
          await era.printAndWait(
            `『啊啊啊……姐姐弄得人家的小鸡鸡舒服得……快要疯了啊啊♪』`,
          );
          await era.printAndWait(`「来吧，在姐姐的手上射精吧${heart(1)}」`);
          // CFLAG:331  = 5（变量语义：CFLAG 族，331）
          kojo.手淫 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.手淫 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `『嘿嘿，这个小鸡鸡可是魔王大人给我装上的哦，要温柔地对待呀♪』`,
          );
          await era.printAndWait(`「哎哎，人家知道啦……这样弄可以吗？」`);
          await era.printAndWait(
            `『姐姐和小鸡鸡都好喜欢，但是最喜欢的还是给我侍奉小鸡鸡的姐姐，真是太棒了！』`,
          );
          // CFLAG:331  = 4（变量语义：CFLAG 族，331）
          kojo.手淫 = 4;
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.手淫 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // 侍奉精神Lv3以上
          await era.printAndWait(
            `『姐姐，要好好伺候人家的小鸡鸡啊${heart(1)}』`,
          );
          await era.printAndWait(
            `「就……就是要侍奉到射精为止对吧……可是……你为什么腿间会长出这种…」`,
          );
          await era.printAndWait(`『唔唔，姐姐的指法真温柔……』`);
          // CFLAG:331  = 3（变量语义：CFLAG 族，331）
          kojo.手淫 = 3;
        } else if (kojo.手淫 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(`「可，可以停下了吗，${player_name}」`);
          await era.printAndWait(`『说什么呐，要侍奉到射精为止啊笨蛋姐姐』`);
          await era.printAndWait(`「呜呜呜……」`);
          // CFLAG:331  = 2（变量语义：CFLAG 族，331）
          kojo.手淫 = 2;
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.手淫 <= 4 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(2) === 0) {
            await era.printAndWait(
              `「嘿嘿，${target_name}的手交侍奉如何呀…一会儿可要满满地射出来哦${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}舔着嘴唇，带着一脸淫媚的表情，用手激烈地摩擦着${player_name}的阴茎……`,
            );
          } else {
            await era.printAndWait(
              `「魔王大人这强烈的味道……弄得人家都晕乎乎的了${heart(1)} 真是的，不过好舒服啊${heart(1)} 」`,
            );
            await era.printAndWait(
              `${target_name}用力嗅着阴茎的味道，露出了仿佛要融化了的表情，用手激烈地摩擦着${player_name}的阴茎……`,
            );
          }
          // CFLAG:331  = 5（变量语义：CFLAG 族，331）
          kojo.手淫 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.手淫 <= 3 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(2) === 0) {
            await era.printAndWait(
              `「哈啊……魔王大人的阴茎，在${target_name}的手里……变得硬邦邦的了${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}呼吸都变得炽热了起来，用纤细的手指仔细地爱抚，侍奉着${player_name}的阴茎。`,
            );
          } else {
            await era.printAndWait(
              `「魔王大人……这样用手侍奉，感觉舒服吗…舒服的话就在${target_name}的手上射精吧${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}认真侍奉着${player_name}的阴茎，边红着脸说着不知廉耻的台词……`,
            );
          }
          // CFLAG:331  = 4（变量语义：CFLAG 族，331）
          kojo.手淫 = 4;
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.手淫 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // 侍奉精神Lv3以上
          await era.printAndWait(
            `「这，这样就行了吗……呜啊啊……阴茎在，在手中勃起了…！」`,
          );
          await era.printAndWait(
            `${target_name}虽然技术不娴熟，但是仍然努力的用手指侍奉着${player_name}的阴茎……`,
          );
          // CFLAG:331  = 3（变量语义：CFLAG 族，331）
          kojo.手淫 = 3;
        } else if (kojo.手淫 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(`「就，就像这样做吗？」`);
          await era.printAndWait(
            `${target_name}战战兢兢地用手指侍奉着${player_name}的阴茎……`,
          );
          // CFLAG:331  = 2（变量语义：CFLAG 族，331）
          kojo.手淫 = 2;
        }
      }
      return 0;
    }
  }

  // IF SELECTCOM == 31（口交 CFLAG:332）
  if (era_flag.selectcom === 31) {
    if (kojo.口交_奴 === 0) {
      if (assi_mao) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(`「唔呣……唔呣……阴茎……好喜欢${heart(1)}」`);
          await era.printAndWait(`『看到鸡鸡就这么兴奋，姐姐真是个变态呢…』`);
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「要……要姐姐去吸妹妹腿间长出来的…奇怪东西……这种事实在是…唔呣……唔唔」`,
          );
          await era.printAndWait(
            `『噢噢，姐姐在为妹妹的扶他鸡鸡口交啊……果然是变态呢。不过放心好了，这样的变态姐姐才是我和魔王大人喜欢的！』`,
          );
        } else if (chara(target).system.侍奉精神 >= 3) {
          await era.printAndWait(
            `「唔呣……唔唔……唔呣……这，这样可以吗……还要继续？」`,
          );
          await era.printAndWait(
            `『当然要继续啦，姐姐的嘴巴很舒服呢……一会儿就射在姐姐的嘴里好了♪』`,
          );
        } else {
          await era.printAndWait(
            `『哎嘿嘿 ，被姐姐舔着小鸡鸡的感觉，好像在做梦一样♪』`,
          );
          await era.printAndWait(`「唔呣……唔呣……求求你，放过姐姐吧！」`);
          await era.printAndWait(
            `『笨蛋，要舔到射精为止啊${heart(1)}　要是在魔王大人面前说出“含在嘴里真讨厌”这样的话，可是会被拔掉所有牙齿的哦？』`,
          );
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「哈啊……唔呣……呣呣……阴茎的味道……好棒${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}趴伏在${player_name}的双腿之间，积极地进行着口交侍奉………`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「${target_name}会好好侍奉陛下的阴茎的${heart(1)}……唔呣……唔呣${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的眼睛里充满了爱意，卖力地吸吮着${player_name}的阴茎……`,
          );
        } else if (chara(target).system.侍奉精神 >= 3) {
          await era.printAndWait(
            `「嗯哈…嗯啾…咻…哈呣…嗯噗…啊啊，可不要把我当那种看到阴茎就想舔上去的女人啊！这个是…没办法的事，所以……所以…嗯…啾……………」`,
          );
          await era.printAndWait(
            `${player_name}听着${target_name}含糊辩解，笑了起来，继续享受着${target_name}的口交侍奉……`,
          );
        } else {
          await era.printAndWait(
            `「呜呜……唔呣……如，如果我这么做了……能放过我的妹妹嘛……唔呣……嗯噗」`,
          );
          await era.printAndWait(
            `${target_name}流着泪边进行着口交侍奉边乞求着…`,
          );
        }
      }
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332）
      kojo.口交_奴 = 1;
      return 0;
    } else {
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.口交_奴 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「唔呣……唔唔……阴茎的味道……好喜欢……唔唔……呣呣${heart(1)}」`,
          );
          await era.printAndWait(
            `『哈啊…原来姐姐这么喜欢鸡鸡啊……有点吃惊呢，算了反正舔得很舒服♪』`,
          );
          // CFLAG:332  = 5（变量语义：CFLAG 族，332）
          kojo.口交_奴 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.口交_奴 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「唔呣……唔唔……唔呣………进，进到喉咙里了…呜呜……不能…再深入了唔唔」`,
          );
          await era.printAndWait(
            `『加油啊姐姐，魔王大人也会给你打气的哦。呜哇哇……小鸡鸡进到喉咙里面好舒服！』`,
          );
          await era.printAndWait(`「不，不行了——唔呣……唔唔…！」`);
          // CFLAG:332  = 4（变量语义：CFLAG 族，332）
          kojo.口交_奴 = 4;
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.口交_奴 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「唔呣……唔唔……唔呣……在，在人家嘴里胀得这么大……好，好吃力……唔呣」`,
          );
          await era.printAndWait(
            `『啊啊！姐姐在咕啾咕啾地吸着人家的小鸡鸡！对，就是这里！』`,
          );
          // CFLAG:332  = 3（变量语义：CFLAG 族，332）
          kojo.口交_奴 = 3;
        } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(
            `「姐，姐姐会努力的……所以请早点射精吧…呜呜呜……唔呣，唔呣」`,
          );
          await era.printAndWait(
            `『姐姐的嘴巴真是差劲，要好好地舔啊，对这里，还有这里♪』`,
          );
          // CFLAG:332  = 2（变量语义：CFLAG 族，332）
          kojo.口交_奴 = 2;
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.口交_奴 <= 3 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(3) === 0) {
            // COM31-RAND
            await era.printAndWait(
              `「哈啊……唔呣……呣呣……阴茎的味道……吸吮起来好棒${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}趴伏在${player_name}的双腿之间，积极地进行着口交侍奉………`,
            );
          } else if (rand_n(2) === 0) {
            // COM31-RAND
            await era.printAndWait(
              `「唔呣……呣呣……魔王大人的……阴茎在${target_name}的嘴里……涨得好大${heart(1)} 哈啊……唔呣……呣呣……${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}含着${player_name}的阴茎，用舌头舔舐着，发出一阵阵下流的声音………`,
            );
          } else {
            await era.printAndWait(
              `「还，还想要更多……唔呣${heart(1)} 唔呣${heart(1)} 再深入到${target_name}的嘴里吧${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}带着淫媚贪婪的表情，深深含住了${player_name}的阴茎，开始进行口交侍奉………`,
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
              `「能侍奉魔王大人的阴茎……是我的幸运${heart(1)} 唔呣……呣呣……${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}眼神里充满了爱意，低头吸吮着${player_name}的阴茎………`,
            );
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「哈啊……阴茎在${target_name}的嘴里……变得这么兴奋了${heart(1)}…唔呣……唔呣……呣呣……${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}用舌头缠绕，舔舐着${player_name}的阴茎，热情地进行着口交侍奉……`,
            );
          } else {
            await era.printAndWait(
              `「在，在${target_name}的嘴里全部射出来吧，我会好好喝下去的${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}说完，努力地吸吮着${player_name}的阴茎，促进着射精……`,
            );
          }
          // CFLAG:332  = 4（变量语义：CFLAG 族，332）
          kojo.口交_奴 = 4;
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.口交_奴 <= 2 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(2) === 0) {
            await era.printAndWait(
              `「我，我会努力的……唔呣……呣呣……魔王大人……这样舒服吗……唔呣」`,
            );
          } else {
            await era.printAndWait(
              `「唔呣……呣呣……魔王大人的阴茎……在嘴巴里勃起了……唔呣……唔呣……呣呣」`,
            );
          }
          await era.printAndWait(
            `${target_name}已经渐渐被你调教的热衷于侍奉了，正在仔细地舔舐着${player_name}的阴茎……`,
          );
          // CFLAG:332  = 3（变量语义：CFLAG 族，332）
          kojo.口交_奴 = 3;
        } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(`「唔呣……呣呣……这么丢人的事……唔呣……」`);
          await era.printAndWait(
            `${target_name}瞥视着${player_name}，边进行着生疏的口交侍奉………`,
          );
          // CFLAG:332  = 2（变量语义：CFLAG 族，332）
          kojo.口交_奴 = 2;
        }
      }
      return 0;
    }
  }

  // IF SELECTCOM == 32（乳交 CFLAG:333）
  if (era_flag.selectcom === 32) {
    if (kojo.乳交 === 0) {
      if (assi_mao) {
        await era.printAndWait(
          `『被姐姐的巨乳这么侍奉着小鸡鸡…啊啊我也想要这么大的胸部啊${heart(1)}』`,
        );
        await era.printAndWait(`「呜呜……这样会很舒服吗${player_name}？」`);
        await era.printAndWait(
          `『简直……再舒服不过啦！啊啊，被姐姐的巨乳包裹着，小鸡鸡一下子就要射精了！』`,
        );
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「听说男人都很喜欢被这样进行乳交侍奉呢、啊啊……乳房这样摩擦着，感觉也兴奋起来了${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的眼神里充满了情欲，呼吸也变得急促了起来，更加卖力地进行着乳交侍奉……`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「啊啊……魔王大人喜欢${target_name}的乳交侍奉吗…好高兴${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}红着脸，边笑着边用乳房侍奉着的${player_name}的阴茎……`,
        );
      } else if (chara(target).system.侍奉精神 >= 3) {
        await era.printAndWait(`「呜啊啊…用，用胸部这样做……感觉舒服吗？」`);
        await era.printAndWait(
          `${target_name}小心翼翼地用巨乳夹着${player_name}的阴茎、摩擦着进行着乳交侍奉……`,
        );
      } else {
        await era.printAndWait(`「呜呜……胸部…明明不是用来做这种事情的……」`);
        await era.printAndWait(`${target_name}皱着眉头，用双乳侍奉着阴茎……`);
      }
      // CFLAG:TARGET:333 = 1（乳交初次）
      kojo.乳交 = 1;
      return 0;
    }

    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.乳交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「哈啊…${player_name}的阴茎在我的乳沟里面摩擦……感觉很舒服吧${heart(1)}」`,
          );
          await era.printAndWait(
            `『嗯嗯、姐姐的乳沟真是太棒了……啊啊，要射精了！』`,
          );
        } else {
          await era.printAndWait(
            `「感觉舒服了的话${heart(1)}　射在姐姐脸上也可以哦${heart(1)} 」`,
          );
          await era.printAndWait(
            `『嗯嗯……要来了哦，会全部射在姐姐脸上的${heart(1)}』`,
          );
        }
        kojo.乳交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.乳交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `『啊啊……姐姐的胸部好舒服啊，平时也是这么侍奉魔王大人的吗？』`,
          );
          await era.printAndWait(
            `「是，是啊，姐姐的胸部就是用来侍奉魔王大人和${player_name}的……」`,
          );
        } else {
          await era.printAndWait(`「这，这样舒服吗…？能感到满意就好了…」`);
          await era.printAndWait(
            `『啊啊，侵犯姐姐的胸部太舒服了，舒服到要射精了、唔唔……再夹紧一点！』`,
          );
        }
        kojo.乳交 = 4;
      } else if (
        chara(target).system.侍奉精神 >= 3 &&
        (kojo.乳交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `『哎哎，姐姐学得挺快呀，这样就可以满足魔王陛下了哦～』`,
        );
        await era.printAndWait(
          `「这……这种事情人家不知道啦……如果觉得舒服……就快射精吧${player_name}…唔唔唔唔～！」`,
        );
        kojo.乳交 = 3;
      } else if (kojo.乳交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`『啊啊，姐姐的乳交好舒服${heart(1)}』`);
        await era.printAndWait(`「呜，呜呜……快点射精然后结束吧…」`);
        kojo.乳交 = 2;
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.乳交 <= 4 || game.kojo.口上开关 === 2)
    ) {
      if (rand_n(2) === 0) {
        await era.printAndWait(
          `「啊啊，魔王大人的阴茎……炽热地在乳沟里摩擦着${heart(1)}　哈啊……很快就要射精了吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的眼睛里充满了情欲，呼吸也变得急促起来`,
        );
      } else {
        await era.printAndWait(
          `「哈啊……我的胸部……就是为了侍奉魔王大人而存在的${heart(1)}　啊啊……感觉好舒服${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}像狗一样谄媚地伸着舌头，进行着乳交侍奉……`,
        );
      }
      kojo.乳交 = 5;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.乳交 <= 3 || game.kojo.口上开关 === 2)
    ) {
      if (rand_n(2) === 0) {
        await era.printAndWait(
          `「啊啊……胸部在侍奉魔王大人的时候……也感觉好舒服${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}微微抬起头，笑着偷看了一下${player_name}的脸，然后继续进行着乳交侍奉………`,
        );
      } else {
        await era.printAndWait(`「能侍奉魔王大人……是我的幸福${heart(1)}」`);
        await era.printAndWait(
          `${target_name}用乳交侍奉着阴茎，侍奉得欲火焚身了起来，双腿相互摩擦着……`,
        );
      }
      kojo.乳交 = 4;
    } else if (
      chara(target).system.侍奉精神 >= 3 &&
      (kojo.乳交 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「这，这样真得很舒服吗……乳房感觉……好奇怪…」`);
      await era.printAndWait(
        `${target_name}呼吸变得急促了起来，面红耳赤地侍奉着${player_name}的阴茎……`,
      );
      kojo.乳交 = 3;
    } else if (kojo.乳交 <= 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「这……这样真的……会感觉舒服吗……呜呜」`);
      await era.printAndWait(
        `${target_name}一边流着眼泪，一边战战兢兢地为${player_name}进行着乳交侍奉……`,
      );
      kojo.乳交 = 2;
    }
    return 0;
  }

  // IF SELECTCOM == 33（素股 CFLAG:334）
  if (era_flag.selectcom === 33) {
    if (kojo.股间性交 === 0) {
      if (assi_mao) {
        await era.printAndWait(
          `『姐姐那里都湿透了呢，哈哈，用那里摩擦着小鸡鸡很舒服吧♪』`,
        );
        await era.printAndWait(
          `「这，这种事情……不要说出来啦！到底……还要多久……」`,
        );
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「虽，虽然只在外面摩擦……但是……碰到的都是敏感点……魔王大人的阴茎好厉害啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}在${player_name}的命令下用蜜穴口摩擦着阴茎，口中已经不住地娇喘起来……`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「哈啊……啊啊！魔，魔王大人的阴茎……好热……光是摩擦着……人家的蜜穴就像要融化了一样${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}带着陶醉的表情，用蜜穴摩擦着的${player_name}的阴茎……`,
        );
      } else {
        await era.printAndWait(
          `「呜呜！可，可以停下了吗……做这种奇怪的事情……真的会感觉舒服吗……」`,
        );
        await era.printAndWait(`${target_name}泪流满面地用股间侍奉着阴茎………`);
      }
      kojo.股间性交 = 1;
      return 0;
    }

    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:0`) === 1 &&
        (kojo.股间性交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯啊……啊啊……干脆把姐姐的处女……也夺走好了……这样在外面摩擦，真的忍受不了了啊啊！」`,
        );
        await era.printAndWait(
          `『哎呀，姐姐都淫乱成这个样子了……这样挑逗妹妹真的好吗♪』`,
        );
        kojo.股间性交 = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.股间性交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哎哎……不要光在外面摩擦啦${heart(1)} 快点插进来不行吗${heart(1)}」`,
        );
        await era.printAndWait(
          `『还不行呢姐姐，我还没感到舒服，不会插进去的哦♪』`,
        );
        kojo.股间性交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`talent:${target}:0`) === 1 &&
        (kojo.股间性交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `『哎呀呀，姐姐的处女小穴，要是不小心插进去了怎么办？嘻嘻！』`,
        );
        await era.printAndWait(
          `「不要说这种蠢话啦……啊啊……光这么摩擦就已经要，要去了！」`,
        );
        kojo.股间性交 = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.股间性交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`『啊啊……姐姐的股间侍奉，超级舒服啊』`);
        await era.printAndWait(
          `「哈啊……这么说……姐姐很高兴……啊啊……要，要射精了吗！」`,
        );
        kojo.股间性交 = 3;
      } else if (kojo.股间性交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「可，可以停下了么……呜呜！」`);
        await era.printAndWait(
          `『姐姐的股间侍奉，超级舒服啊，我要发射了${heart(1)}』`,
        );
        kojo.股间性交 = 2;
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      era.get(`talent:${target}:0`) === 1 &&
      (kojo.股间性交 <= 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「嗯啊……哎啊！求你了，快点来夺走人家的处女吧……小穴里面比这样摩擦服多了啦${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}用敏感的蜜穴口摩擦着${player_name}的阴茎就已经兴奋了起来，不顾廉耻地说着诱惑的话……`,
      );
      kojo.股间性交 = 6;
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.股间性交 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「呜啊……啊啊！阴茎不插进去，就在外面摩擦敏感点…魔王大人好厉害啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}的蜜穴口被${player_name}的阴茎摩擦着，忍不住已经娇喘了起来……`,
      );
      kojo.股间性交 = 5;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      era.get(`talent:${target}:0`) === 1 &&
      (kojo.股间性交 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「哈啊……啊啊${heart(1)} 要是控制不住了……像骑马这样坐下去……就可以献出处女了呢${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}边用股间侍奉着阴茎边开玩笑似地说道，但是眼神却是认真的……`,
      );
      kojo.股间性交 = 4;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.股间性交 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「哈啊……啊啊……阴茎……热热的${heart(1)} 感觉……蜜穴要被融化了一样${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}一脸陶醉的表情，用股间侍奉着${player_name}的阴茎……`,
      );
      kojo.股间性交 = 3;
    } else if (kojo.股间性交 <= 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(
        `「呜……呜啊！为，为什么会……有奇怪的感觉……好像很舒服……」`,
      );
      await era.printAndWait(
        `${target_name}敏感的蜜穴摩擦着阴茎，忍不住呻吟了起来……`,
      );
      kojo.股间性交 = 2;
    }
    return 0;
  }

  // IF SELECTCOM == 34（骑乘位 CFLAG:335）
  if (era_flag.selectcom === 34) {
    const weapon =
      era0(`talent:${player}:121`) === 0 && era0(`talent:${player}:122`) === 0
        ? '电动假阳具'
        : '阴茎';

    if (kojo.骑乘位 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        if (assi_mao) {
          if (era.get(`talent:${target}:76`) === 1) {
            await era.printAndWait(
              `「呜……我的处女……居然要献给妹妹了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}屈服地落下了身子，骑在${player_name}身上、让自己的妹妹夺走了自己的处女身。`,
            );
            await era.printAndWait(
              `『啊啊啊${heart(1)} 姐姐的处女，我就收下了！！最喜欢姐姐了♪』`,
            );
            await era.printAndWait(
              `「唔……唔啊啊……我，我也喜欢${player_name}了啊啊！如果是别人……才不可能……有这么舒服啊啊啊！」`,
            );
            await era.printAndWait(
              `『真，真的吗？听到姐姐这么说，好高兴！！那么姐姐小穴的第一次高潮，也由我来给予吧！』`,
            );
            await era.printAndWait(
              `欣喜若狂的${player_name}，挺起腰，开始自下而上地侵犯${target_name}的处女蜜穴……`,
            );
          } else if (era.get(`talent:${target}:85`) === 1) {
            await era.printAndWait(`「呜……呜啊……我的处女……就这样……」`);
            await era.printAndWait(
              `${target_name}屈服地落下了身子，骑在${player_name}身上、让自己的妹妹夺走了自己的处女身。`,
            );
            await era.printAndWait(
              `『人家好高兴${heart(1)} 能够收下最爱的姐姐的处女♪』`,
            );
            await era.printAndWait(
              `「哈啊……啊啊……其，其实不大……想让魔王大人……看见！」`,
            );
            await era.printAndWait(
              `『知道姐姐喜欢魔王大人啦、不过事到如今，反悔也没有用了哦${heart(1)} 还是说……难道姐姐不喜欢${player_name}了吗？』`,
            );
            await era.printAndWait(`「对，对不起……人家不是反悔啦……」`);
            await era.printAndWait(
              `${player_name}舔着嘴唇、挺起腰，开始自下而上地侵犯${target_name}的处女蜜穴……`,
            );
          } else {
            await era.printAndWait(
              `「呜……呜呜……求你了……放过姐姐吧，姐姐还是处女啊……」`,
            );
            await era.printAndWait(
              `${target_name}未经人事的蜜穴，被${player_name}挺起腰，慢慢穿透了。`,
            );
            await era.printAndWait(
              `『哎嘿嘿，感觉到处女膜了……给我……破掉吧！』`,
            );
            await era.printAndWait(`「住，住手，不可以不可以不可以啊啊啊！」`);
            await era.printAndWait(
              `${player_name}紧紧抓着${target_name}的腰，用${weapon}不由分说地贯穿了处女蜜穴`,
            );
            await era.printAndWait(
              `『哈啊啊！姐姐的处女归我了！从此以后变成我的性奴吧${heart(1)}』`,
            );
            await era.printAndWait(
              `「呜呜……呜呜呜……太过分了——等等！不，不能再往里进了！好痛，好痛啊啊」`,
            );
          }
        } else {
          if (era.get(`talent:${target}:76`) === 1) {
            await era.printAndWait(
              `「哈啊……哈啊……魔王大人……进到我的处女小穴里了……从今以后……我就是真正属于魔王大人的了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}淫浪的摇着腰，用初经人事的蜜穴将${player_name}的阴茎完全吞入了。`,
            );
            await era.printAndWait(
              `「魔王大人的阴茎……在人家的小穴里……搅动着……好舒服${heart(1)} 原来……做爱……是这么舒服的事情啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}背部绷得紧紧的，尽情享受着初次交媾的快感，蜜穴紧紧夹着阴茎。`,
            );
            await era.printAndWait(
              `「不，不行了……舒服得……没有力气了${heart(1)} 接下来……魔王大人……尽情……啊啊啊${heart(1)}」`,
            );
          } else if (era.get(`talent:${target}:85`) === 1) {
            await era.printAndWait(
              `「哈啊……哈啊……感受到……魔王大人的阴茎了……请，请收下${target_name}的处女吧${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}满脸通红，骑跨自${player_name}身上，慢慢沉下了腰。`,
            );
            await era.printAndWait(
              `${player_name}的龟头刚刚穿透处女膜，上方就响起了${target_name}交织着痛苦与享受的呻吟。`,
            );
            await era.printAndWait(
              `「呜……呜啊啊……有点痛${heart(1)} 但……但是……魔王大人……从此我就是属于你的了啊啊啊！」`,
            );
            await era.printAndWait(
              `${target_name}一鼓作气地坐了下来，让阴茎完全进入了自己的处女小穴中。`,
            );
            await era.printAndWait(
              `破处的疼痛让她流出了泪水，但是脸上却充满了幸福的笑容。`,
            );
            await era.printAndWait(
              `「我爱你……魔王大人……永远爱你……${heart(1)}」`,
            );
          } else {
            await era.printAndWait(`「不，不行！放开我，放开我……求你了……！」`);
            await era.printAndWait(
              `${player_name}抓着${target_name}的腰，勃起的阴茎自下而上穿透了未经人事的紧致蜜穴。`,
            );
            await era.printAndWait(`「好，好痛！！快停下来，停下来啊啊！」`);
            await era.printAndWait(
              `破处的疼痛让${target_name}痛苦地悲鸣了起来，但这声音却只让${player_name}更加的兴奋……`,
            );
          }
        }
      } else {
        if (assi_mao) {
          if (era.get(`talent:${target}:76`) === 1) {
            await era.printAndWait(
              `「呜啊……啊啊……顶，顶到最里面了……好舒服${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}前后扭着腰，让${player_name}的${weapon}在自己的蜜穴里一次次进出着。`,
            );
            await era.print(
              `『哎呀呀，姐姐这么兴奋，那么喜欢被魔王大人视奸的感觉吗？』`,
            );
            await era.printAndWait(
              `「是……是啊……姐姐，最喜欢被别人看着自己淫乱的样子了啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}带着一脸沉醉的表情，完全沉浸在交媾的快感之中……`,
            );
          } else if (era.get(`talent:${target}:85`) === 1) {
            await era.printAndWait(
              `「呜……呜啊……在魔王大人……面前用这种姿势……实在太害羞了！」`,
            );
            await era.printAndWait(
              `${player_name}抱着${target_name}的腰，用股间高高耸立的${weapon}一次次顶入姐姐的蜜穴中。`,
            );
            await era.print(
              `『哼，嘴上这么说，小穴却夹得更紧了，明明就是很想被魔王大人视奸吧，变态姐姐♪』`,
            );
            await era.printAndWait(
              `「嗯啊……啊啊……姐姐这么变态……真是对，对不起啊啊……！」`,
            );
            await era.printAndWait(
              `${target_name}在深爱的${master_name}的注视下，被自己的妹妹不断从身下侵犯着，内心却涌起了异样的快感……`,
            );
          } else {
            await era.print(`『姐姐，腰要好好地动起来啊，难道你想挨罚吗？！』`);
            await era.printAndWait(
              `「呜……呜啊啊……饶了姐姐吧……姐姐真的……已经不行了！」`,
            );
            await era.printAndWait(
              `${target_name}的蜜穴被${player_name}侵犯得一塌糊涂，痛苦地悲鸣着……`,
            );
          }
        } else {
          if (era.get(`talent:${target}:76`) === 1) {
            await era.printAndWait(
              `像娼馆的妓女一样扭着腰的${target_name}，完全沉浸在交媾的快感之中。`,
            );
            await era.printAndWait(
              `「哈啊……啊啊……这样自己动……真的是太舒服了啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${player_name}欣赏着${target_name}的娇喘，任由阴茎随着${target_name}的动过在爱液泛滥的蜜穴里进出着……`,
            );
          } else if (era.get(`talent:${target}:85`) === 1) {
            await era.printAndWait(
              `${target_name}带着一脸的幸福，有些笨拙地扭动着腰，让${player_name}的阴茎在自己爱液泛滥的蜜穴里进出着。`,
            );
            await era.printAndWait(
              `「哈啊……哈啊……魔王大人……这样信任我……让我自己动……好幸福${heart(1)}」`,
            );
            await era.printAndWait(
              `为了寻求更多的快感，${target_name}加大了腰部动作的幅度…`,
            );
          } else {
            await era.printAndWait(
              `${target_name}屈辱而痛苦的咬着嘴唇，在${player_name}的命令下上下扭动着腰。`,
            );
            await era.printAndWait(
              `「呜啊啊……什么时候……才可以停下来……好难受！」`,
            );
            await era.printAndWait('');
          }
        }
      }
      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335）
      kojo.骑乘位 = 1;
      return 0;
    } else {
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.骑乘位 <= 5 || game.kojo.口上开关 === 2)
        ) {
          if (chara(target).system.私处感觉 >= 3) {
            await era.print(
              `「不，不行了……小穴……舒服得……要上天了啊啊啊${heart(1)}」`,
            );
            if (rand_n(4) === 0) {
              await era.print(
                `『哎呀呀，姐姐的叫声这么淫乱，魔王大人都听见了啊！』`,
              );
              await era.printAndWait(
                `${target_name}扭着腰，尽情享受着与${player_name}交媾的快感，连绵的娇喘在调教室里回荡着。`,
              );
              await era.printAndWait(
                `「呜啊啊……被，被自己的妹妹侵犯……原来是这么舒服的事情啊啊啊魔王大人${heart(1)}」`,
              );
            } else if (rand_n(3) === 0) {
              await era.print(
                `『呜哇，姐姐的娇喘声音原来这么好听的${heart(1)} 真不愧是我的淫乱姐姐${heart(1)}』`,
              );
              await era.printAndWait(
                `${player_name}一次次顶起腰，侵犯着骑在自己身上的${target_name}。`,
              );
              await era.printAndWait(
                `${target_name}敏感的蜜穴在妹妹的侵犯下，向大脑传递着一阵又一阵强烈的快感。`,
              );
              await era.printAndWait(
                `「嗯啊啊……好舒服${heart(1)} 这个姿势……比我想象的……还要舒服啊啊啊${heart(1)} 」`,
              );
            } else if (rand_n(2) === 0) {
              await era.print(
                `『哎呀呀，我都还没说自己就动起腰来了，真的有那么舒服吗！』`,
              );
              await era.printAndWait(
                `${target_name}带着淫媚而享受的笑容，一上一下地尽情地扭动着腰。`,
              );
              await era.printAndWait(
                `「好舒服${heart(1)}…… 真的好舒服${heart(1)}…… ${player_name}的阴茎……插得姐姐……要去了啊啊${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}完全沉浸在被自己妹妹侵犯的背德快感之中，整个人都忘乎所以了……`,
              );
            } else {
              await era.print(
                `『姐姐啊！姐姐啊${heart(1)} 魔王大人给人家装上的小鸡鸡，感觉如何啊${heart(1)}』`,
              );
              await era.printAndWait(
                `${target_name}上下动着腰，让${player_name}的${weapon}在自己的蜜穴里反复进出着。`,
              );
              await era.printAndWait(
                `「很……很舒服啊${heart(1)} 舒服得姐姐……要去了啊啊啊${heart(1)}」`,
              );
              await era.printAndWait(
                `『哈啊……姐姐的蜜穴……也很紧很舒服啊啊啊${heart(1)} 』`,
              );
              await era.printAndWait(
                `两人的交合处，爱液喷溅着，姐妹两人的乱伦之乐还在继续……`,
              );
            }
          } else {
            await era.printAndWait(`「呜……呜啊……顶，顶到最里面了${heart(1)}」`);
            await era.printAndWait(
              `${target_name}上下扭动着腰，让${player_name}的${weapon}在自己的蜜穴里进出着。`,
            );
            await era.print(
              `『哎哟哟，姐姐这么兴奋，那么喜欢被魔王大人视奸的感觉吗？』`,
            );
            await era.printAndWait(
              `「是……是啊……姐姐，最喜欢被别人看着自己淫乱的样子了啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}带着一脸沉醉的表情，完全沉浸在交媾的快感之中……`,
            );
          }
          // CFLAG:335  = 6（变量语义：CFLAG 族，335）
          kojo.骑乘位 = 6;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.骑乘位 <= 4 || game.kojo.口上开关 === 2)
        ) {
          if (chara(target).system.私处感觉 >= 3) {
            await era.print(
              `「呜啊……啊啊啊……不，不行了……真的……要不行了${heart(1)}」`,
            );
            if (rand_n(4) === 0) {
              await era.print(`『哎嘿嘿，姐姐的娇喘声被魔王大人听到了哦！』`);
              await era.printAndWait(
                `${player_name}顶着腰，持续地侵犯着${target_name}蜜穴的最深处。`,
              );
              await era.printAndWait(
                `沉浸在快感中的${target_name}已经再也无法忍耐，甘甜的娇喘从唇边流泻而出。`,
              );
              await era.printAndWait(
                `「真，真的好舒服${heart(1)}……舒服得……已经没有办法思考了啊啊啊${heart(1)} 」`,
              );
            } else if (rand_n(3) === 0) {
              await era.print(
                `『呜哇，姐姐的娇喘声音原来这么好听的${heart(1)} 真不愧是我的姐姐${heart(1)}』`,
              );
              await era.printAndWait(
                `${player_name}舔着嘴唇，一次次顶起腰，用${weapon}侵犯着姐姐的蜜穴里的敏感点。`,
              );
              await era.printAndWait(
                `${target_name}享受而甘甜的娇喘，则是这场姐妹乱伦狂欢的最好伴奏。`,
              );
              await era.printAndWait(
                `「嗯啊……啊啊啊${heart(1)} 好舒服……舒服得……已经不想思考了啊啊啊${heart(1)}」`,
              );
            } else if (rand_n(2) === 0) {
              await era.print(
                `『哎呀呀，我都还没说自己就动起腰来了，真的有那么舒服吗，母猪姐姐！』`,
              );
              await era.printAndWait(
                `尽管在身下的是自己的亲妹妹，${target_name}还是完全无法停住腰部的动作。`,
              );
              await era.printAndWait(
                `经过充分开发和调教的蜜穴，在一次次的交合中，感受到了极致的快感。`,
              );
              await era.printAndWait(
                `「好舒服……${player_name}的阴茎……插在姐姐的小穴里……舒服得不行了啊啊啊${heart(1)}」`,
              );
            } else {
              await era.print(
                `『姐姐啊！姐姐啊${heart(1)} 这个东西，可是人家为了能让姐姐舒服，才让魔王大人给我装上的哦，感觉如何呀${heart(1)} 』`,
              );
              await era.printAndWait(
                `${target_name}似乎是被妹妹的话感动了，更积极地扭着腰，寻求着更强烈的快感。`,
              );
              await era.printAndWait(
                `「多，多谢${player_name}了……姐姐，的确很舒服……舒服得……要上天了啊啊${heart(1)}」`,
              );
              await era.printAndWait(
                `『哎呀呀，姐姐要当着我和魔王大人的面高潮了吗！？』`,
              );
            }
          } else {
            await era.printAndWait(
              `「呜……呜啊啊……可不可以……不要当着魔王大人的面……啊啊啊！」`,
            );
            await era.printAndWait(
              `${player_name}紧抱着${target_name}的腰身，用自己股间的${weapon}用力侵犯着姐姐的蜜穴。`,
            );
            await era.print(
              `『嘿嘿，虽然嘴上这么说，但是蜜穴却夹得更紧了呢，真是变态暴露狂姐姐啊♪』`,
            );
            await era.printAndWait(`「呜……不，不是那样的啊啊！」`);
            await era.printAndWait(
              `当着深爱的${master_name}的面，${target_name}被${player_name}从下方持续地侵犯着，反而更加兴奋了………`,
            );
          }
          // CFLAG:335  = 5（变量语义：CFLAG 族，335）
          kojo.骑乘位 = 5;
        } else if (
          era.get(`mark:${target}:2`) === 3 &&
          chara(target).system.私处感觉 >= 3 &&
          (kojo.骑乘位 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.print(`「好舒服……已经舒服得……没有办法思考了${heart(1)}」`);
          if (rand_n(4) === 0) {
            await era.print(`『哎嘿嘿，姐姐也忍不住娇喘了呢♪』`);
            await era.printAndWait(
              `${player_name}舔着嘴唇，一次次顶起腰，用${weapon}侵犯着姐姐的蜜穴里的敏感点。`,
            );
            await era.printAndWait(
              `内心的屈辱和悲伤很快就被强烈的快感淹没，${target_name}再次发出了享受的娇喘。`,
            );
            await era.print(`「呜呜……要，要去了，要去了啊啊啊${heart(1)}」`);
          } else if (rand_n(3) === 0) {
            await era.print(
              `『哎呀，原来姐姐的身体这么淫乱的，亏我还被瞒了那么久。』`,
            );
            await era.printAndWait(
              `「不，不是那样子的……都是因为你们……的调教啊啊啊！」`,
            );
            await era.printAndWait(
              `${target_name}爱液泛滥的蜜穴被${player_name}从下身下一次次顶到最深处，强烈的快感让争辩变成了甘甜的喘息………`,
            );
          } else if (rand_n(2) === 0) {
            await era.print(`『呜哇……听姐姐的娇喘，听得我也兴奋起来了呢♪』`);
            await era.printAndWait(
              `${player_name}紧抱着${target_name}的腰身，用自己股间的${weapon}用力侵犯着姐姐的蜜穴。`,
            );
            await era.printAndWait(
              `「呜……呜啊啊……太激烈了……姐姐……已经不行了啊啊！」`,
            );
            await era.printAndWait(
              `『哈啊啊，姐姐的小穴突然夹得……这么紧……人，人家也要高潮了！姐姐，一起在魔王大人面前高潮吧！』`,
            );
          } else {
            await era.print(`『哎嘿嘿，姐姐没有我的允许不可以高潮哦♪』`);
            await era.printAndWait(
              `${player_name}不紧不慢地说着，而身上的${target_name}为了寻求更多的快感，红着脸，不断扭动着腰身。`,
            );
            await era.printAndWait(
              `${player_name}紧抱着${target_name}的腰身，用自己股间的${weapon}用力侵犯着姐姐的蜜穴。`,
            );
            await era.printAndWait(
              `「呜……呜啊啊……已，已经不行了……让，让姐姐高潮吧！」`,
            );
            await era.printAndWait(
              `那纠结在屈辱与快感之中的表情，勾起了${master_name}强烈的欲望……`,
            );
          }
          // CFLAG:335  = 4（变量语义：CFLAG 族，335）
          kojo.骑乘位 = 4;
        } else if (
          era.get(`mark:${target}:2`) === 3 &&
          (kojo.骑乘位 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.print(`『哎呀，姐姐居然肯听话自己动了，我好感动♪』`);
          await era.printAndWait(
            `${target_name}在${player_name}的命令下，骑在妹妹身上，上下动着腰。`,
          );
          await era.printAndWait(`「为，为什么要这么折磨姐姐……呜呜呜！」`);
          await era.printAndWait(
            `${player_name}紧抱着${target_name}的腰身，用自己股间的${weapon}用力侵犯着姐姐的蜜穴。`,
          );
          await era.printAndWait(
            `『哎，姐姐技术还是不行，接下来还是让我来吧♪』`,
          );
          // CFLAG:335  = 3（变量语义：CFLAG 族，335）
          kojo.骑乘位 = 3;
        } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {
          await era.print(`『笨蛋姐姐，腰也要自己动起来啊！』`);
          await era.printAndWait(
            `「呜呜……饶，饶了姐姐吧……不，不能再往里面顶了……真的会死的啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}被身下的${player_name}侵犯着蜜穴，痛苦不堪的悲鸣着……`,
          );
          // CFLAG:335  = 2（变量语义：CFLAG 族，335）
          kojo.骑乘位 = 2;
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.骑乘位 <= 5 || game.kojo.口上开关 === 2)
        ) {
          if (chara(target).system.私处感觉 >= 3) {
            await era.print(
              `「尽情……尽情地把${target_name}的小穴……侵犯到坏掉吧啊啊啊${heart(1)}」`,
            );
            if (rand_n(4) === 0) {
              await era.printAndWait(
                `「呜啊${heart(1)}…… 好……好舒服${heart(1)} 舒服得……不行了啊啊${heart(1)}」`,
              );
            } else if (rand_n(3) === 0) {
              await era.printAndWait(
                `「好，好激烈……魔王大人${heart(1)} 不过……人家……人家还想要更多啊啊啊${heart(1)} 」`,
              );
            } else if (rand_n(2) === 0) {
              await era.printAndWait(
                `「好，好舒服啊啊${heart(1)} 能够这么独占魔王大人的阴茎……实在是太棒了啊啊${heart(1)}」`,
              );
            } else {
              await era.printAndWait(
                `「哈啊……腰部的动作……完全停不下来了${heart(1)} 因为……和魔王大人做爱，实在是太棒了啊啊啊${heart(1)}」`,
              );
            }
            if (rand_n(4) === 0) {
              await era.printAndWait(
                `${target_name}脸上浮现出充满享受的淫媚笑容，骑在${player_name}的身上扭动着腰………`,
              );
            } else if (rand_n(3) === 0) {
              await era.printAndWait(
                `${target_name}为了寻求更强烈的快感，更激烈地上下扭着腰………`,
              );
            } else if (rand_n(2) === 0) {
              await era.printAndWait(
                `随着${player_name}一次次顶起腰、${target_name}淫浪的娇喘声随着交合快感而增强了………`,
              );
            } else {
              await era.printAndWait(
                `${target_name}已经完全被快感和欲望所支配，上下扭动着腰的动作已经完全停不下来了………`,
              );
            }
          } else {
            await era.printAndWait(
              `「啊啊……人家的小穴……被${player_name}的阴茎……顶到最里面了啊啊！」`,
            );
            await era.print(
              `「顶，顶到子宫口了……比刚刚……更舒服了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}娇喘着，享受着骑乘位交合的快感………`,
            );
          }
          // CFLAG:335  = 6（变量语义：CFLAG 族，335）
          kojo.骑乘位 = 6;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.骑乘位 <= 4 || game.kojo.口上开关 === 2)
        ) {
          if (chara(target).system.私处感觉 >= 3) {
            await era.print(
              `「好舒服……已经舒服得……没有办法思考了啊啊啊${heart(1)}」`,
            );
            if (rand_n(4) === 0) {
              await era.printAndWait(
                `「好，好喜欢魔王大人${heart(1)}…… 最喜欢了${heart(1)} 让我永远呆在你的身边吧${heart(1)}」`,
              );
            } else if (rand_n(3) === 0) {
              await era.printAndWait(
                `「好……好激烈${heart(1)}…… 魔王大人……实在是太厉害了啊啊啊${heart(1)}」`,
              );
            } else if (rand_n(2) === 0) {
              await era.printAndWait(
                `「好，好舒服${heart(1)} 能够……被魔王大人……这样疼爱，实在是太幸福了啊啊啊${heart(1)}」`,
              );
            } else {
              await era.printAndWait(
                `「哈啊……腰部的动作……完全停不下来了${heart(1)} 因为……和魔王大人做爱，实在是太幸福了啊啊啊${heart(1)}」`,
              );
            }
            if (rand_n(4) === 0) {
              await era.printAndWait(
                `${target_name}脸上浮现出幸福的笑容，骑在${player_name}的身上扭动着腰，尽情地娇喘着………`,
              );
            } else if (rand_n(3) === 0) {
              await era.printAndWait(
                `${target_name}上下扭着腰，呼唤着${player_name}的名字，……`,
              );
            } else if (rand_n(2) === 0) {
              await era.printAndWait(
                `随着${player_name}一次次顶起腰、${target_name}在交合的快感下不住地娇喘着……`,
              );
            } else {
              await era.printAndWait(
                `${target_name}已经完全被快感和对你的爱所支配，上下扭动着腰的动作已经完全停不下来了………`,
              );
            }
          } else {
            await era.print(
              `「好舒服……已经舒服得……没有办法思考了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `「我，我会自己动的，魔，魔王大人……请……好好享受就行了……！」`,
            );
            await era.printAndWait(
              `${target_name}娇喘着，享受着骑乘位交合的快感………`,
            );
          }
          // CFLAG:335  = 5（变量语义：CFLAG 族，335）
          kojo.骑乘位 = 5;
        } else if (
          era.get(`mark:${target}:2`) === 3 &&
          chara(target).system.私处感觉 >= 3 &&
          (kojo.骑乘位 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.print(`「嗯啊……啊啊啊……呜呜${heart(1)}」`);
          if (rand_n(4) === 0) {
            await era.printAndWait(
              `「呜？！不要看……不要盯着我的脸看啊啊啊！」`,
            );
          } else if (rand_n(3) === 0) {
            await era.printAndWait(
              `「这样的姿势……太羞耻了！但……但是真的……好舒服啊啊」`,
            );
          } else if (rand_n(2) === 0) {
            await era.printAndWait(`「不，不行了……人家真的不行了啊啊啊！」`);
          } else {
            await era.printAndWait(`「为，为什么会这么舒服啊啊啊！」`);
          }
          if (rand_n(4) === 0) {
            await era.printAndWait(
              `${target_name}脸上露出了享受的表情，骑在${player_name}的身上扭动着腰，尽情地娇喘着………`,
            );
          } else if (rand_n(3) === 0) {
            await era.printAndWait(
              `${target_name}上下扭着腰，甘甜的娇喘在调教室里回荡着……`,
            );
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `${target_name}的蜜穴被一次次贯入最深处，爱液不住地渗到你的身上……`,
            );
          } else {
            await era.printAndWait(
              `${target_name}虽然一脸的屈辱与羞耻，但是按捺不住的娇喘却暴露着内心的真正感受………`,
            );
          }
          // CFLAG:335  = 4（变量语义：CFLAG 族，335）
          kojo.骑乘位 = 4;
        } else if (
          era.get(`mark:${target}:2`) === 3 &&
          (kojo.骑乘位 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.print(`「嗯啊啊……魔王大人……下面……还要人家做什么……」`);
          await era.printAndWait(
            `「呜……呜呜……我，我明白了……我会自己动起来的！」`,
          );
          await era.printAndWait(
            `${target_name}咬着嘴唇，带着屈服的表情上下扭动着腰……`,
          );
          // CFLAG:335  = 3（变量语义：CFLAG 族，335）
          kojo.骑乘位 = 3;
        } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(`「呜……呜呜……这种丢人的姿势……！」`);
          await era.printAndWait(
            `${target_name}咬着嘴唇，带着屈辱的表情上下扭动着腰……`,
          );
          // CFLAG:335  = 2（变量语义：CFLAG 族，335）
          kojo.骑乘位 = 2;
        }
      }
      return 0;
    }
  }

  // IF SELECTCOM === 35（泡踊り／全身擦洗 CFLAG:336）
  if (era_flag.selectcom === 35) {
    if (kojo.全身擦洗 === 0) {
      if (assi_mao) {
        await era.printAndWait(
          `『嘻嘻，和姐姐一起洗澡真高兴，想起了以前的日子呢。不过一个人在这里的时候我也有好好洗澡呢，像这样♪』`,
        );
        await era.printAndWait(
          `「咦……咦……不，不要乱摸呀，好好的用毛巾洗澡不行吗……」`,
        );
        await era.printAndWait(
          `『说什么呢，姐姐也要好好学呀，除了用手之外，还要用你那大胸部还有淫乱的小穴帮我和魔王大人擦洗身体${heart(1)} 就像这样哦！～～』`,
        );
        await era.printAndWait(`「呜啊啊……不，不要乱摸呀！」`);
      } else {
        if (chara(target).system.侍奉精神 >= 3) {
          await era.printAndWait(`「啊啊，魔王大人的身体……好有魅力……！」`);
          await era.printAndWait(
            `伴着粘滑的肥皂水，${target_name}用自己的双手，还有胸前的巨乳来回擦拭着${player_name}的身体………`,
          );
        } else {
          await era.printAndWait(
            `「是，是要人家帮你……擦拭身体嘛……我，我会照做的……！」`,
          );
          await era.printAndWait(
            `伴着粘滑的肥皂水，${target_name}用自己的双手战战兢兢地擦拭着${player_name}的身体……`,
          );
        }
      }
      // CFLAG:TARGET:336  = 1（变量语义：CFLAG 族，TARGET:336）
      kojo.全身擦洗 = 1;
      return 0;
    } else {
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.侍奉精神 >= 5 &&
          (kojo.全身擦洗 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `『啊啊……姐姐再帮人家擦一下背啦……用你那对淫乱大胸部！』`,
          );
          await era.printAndWait(
            `「知道啦……你平时被魔王大人调教完应该好好洗澡啊，你看，这里还有污垢留着……」`,
          );
          await era.printAndWait(
            `『那是魔王大人精液的痕迹啦……才不是污垢呢！』`,
          );
          await era.printAndWait(
            `不仔细去分辨哪些对话的话，${target_name}和${player_name}好像又变回了在村子里纯洁而和睦共处的样子……`,
          );
          // CFLAG:336  = 5（变量语义：CFLAG 族，336）
          kojo.全身擦洗 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.侍奉精神 >= 5 &&
          (kojo.全身擦洗 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `『哎嘿嘿，姐姐平时也是这样给魔王大人洗澡的吗？』`,
          );
          await era.printAndWait(
            `「是，是呀……这也是侍奉魔王大人的工作的一部分呢${heart(1)}」`,
          );
          await era.printAndWait(
            `『嚯嚯，用这样的大胸部代替浴巾摩擦身体的话，即使是魔王大人也不一定忍耐得住吧……我摸我摸我摸！』`,
          );
          await era.printAndWait(`「好好洗澡啦！不要乱摸啊${heart(1)}」`);
          // CFLAG:336  = 4（变量语义：CFLAG 族，336）
          kojo.全身擦洗 = 4;
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.全身擦洗 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `『啊……被姐姐的手这样搓着背，好舒服…${heart(1)} 好像回到了村子里一样${heart(1)}』`,
          );
          await era.printAndWait(
            `「我……我也有这样的感觉呢……唉唉？！你的手在摸哪里呢？」`,
          );
          await era.printAndWait(
            `『嘻嘻，姐姐的大胸部，不就是用来给人摸的吗♪』`,
          );
          // CFLAG:336  = 3（变量语义：CFLAG 族，336）
          kojo.全身擦洗 = 3;
        } else if (kojo.全身擦洗 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(
            `「好好洗澡啦，${player_name}……手，不要乱摸姐姐的身体啦…」`,
          );
          await era.printAndWait(`『哎嘿嘿，不是乱摸，是帮姐姐洗白白啦～♪』`);
          await era.printAndWait(`「不，不要恶作剧啦！」`);
          // CFLAG:336  = 2（变量语义：CFLAG 族，336）
          kojo.全身擦洗 = 2;
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.侍奉精神 >= 5 &&
          (kojo.全身擦洗 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `浴室里，${target_name}正用肥皂水冲洗着${player_name}和自己的身体，。`,
          );
          await era.printAndWait(
            `然后伸出手从后面抱住了${player_name}，开始用丰满的双乳上下摩擦着${player_name}的背。`,
          );
          if (rand_n(2)) {
            await era.printAndWait(
              `「啊啊啊……这样用乳头摩擦着魔王大人的身体……好舒服${heart(1)} ！」`,
            );
          } else {
            await era.printAndWait(
              `「魔王大人的身体……真是充满魅力${heart(1)} ！恐怕再没有比魔王大人更出色的男性了吧……」`,
            );
          }
          // CFLAG:336  = 5（变量语义：CFLAG 族，336）
          kojo.全身擦洗 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.侍奉精神 >= 5 &&
          (kojo.全身擦洗 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `${target_name}沐浴在肥皂水中，用双手，还有丰满的双乳仔细地擦拭着${player_name}的背部。`,
          );
          await era.printAndWait(
            `「哈啊……人家的胸部……光是这样接触到魔王大人的肌肤……就已经……舒服得不行了${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}感受着${target_name}柔软的乳头在自己背上摩擦传来舒适感觉……`,
          );
          // CFLAG:336  = 4（变量语义：CFLAG 族，336）
          kojo.全身擦洗 = 4;
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.全身擦洗 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「虽，虽然不愿意承认……但是魔王大人的身体……真的好有魅力……！」`,
          );
          await era.printAndWait(
            `在粘滑的肥皂水冲洗下，${target_name}用自己的双手，还有丰满的胸部仔细地擦拭着${player_name}的身体……`,
          );
          // CFLAG:336  = 3（变量语义：CFLAG 族，336）
          kojo.全身擦洗 = 3;
        } else if (kojo.全身擦洗 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(
            `「要，要我用胸部帮你……擦身！？就不能……好好用毛巾吗……呜呜」`,
          );
          await era.printAndWait(
            `在粘滑的肥皂水冲洗下，${target_name}用自己的双手，还有丰满的胸部勉为其难地擦拭着${player_name}的身体……`,
          );
          // CFLAG:336  = 2（变量语义：CFLAG 族，336）
          kojo.全身擦洗 = 2;
        }
      }
      return 0;
    }
  }

  // IF SELECTCOM === 36（骑乘位肛交 CFLAG:337）
  if (era_flag.selectcom === 36) {
    if (kojo.骑乘位肛交 === 0) {
      if (assi_mao) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(`「呜啊……啊啊……好，好舒服……${heart(1)}」`);
          await era.printAndWait(
            `感受着${player_name}的阴茎在自己肛门内出入，${target_name}忍不住娇喘了起来。`,
          );
          await era.print(
            `『嘿嘿，我的小鸡鸡也很舒服啊，在姐姐热热的直肠里${heart(1)}』`,
          );
          await era.printAndWait(
            `「是，是啊！姐姐的屁股……要……要去了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}扭动着腰，尽情地让妹妹的阴茎继续从下方侵犯着自己的肛门……`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「呜……呜啊……${player_name}为什么会……长出这种奇怪的东西……！」`,
          );
          await era.printAndWait(
            `感受着${player_name}的阴茎在自己肛门内出入，${target_name}红着脸呻吟着。`,
          );
          await era.print(
            `『就是为了侵犯姐姐才让魔王大人给人家遍出来的啊！啊啊……好棒……和姐姐肛交的刚绝』`,
          );
          await era.printAndWait(`「唔啊……好粗……不行了，姐姐要不行了啊！」`);
          await era.printAndWait(
            `${target_name}扭动着腰，感受着被妹妹的阴茎继续从下方侵犯着自己的肛门的背德快感……`,
          );
        } else {
          await era.printAndWait(`「不，不可能……插进来啊啊…！」`);
          await era.printAndWait(
            `感受着${player_name}的阴茎在自己肛门内出入，${target_name}吃力地呻吟着。`,
          );
          await era.print(`『好好动起来啊笨蛋姐姐，就像骑马那样啊！』`);
          await era.printAndWait(
            `「明，明白了……姐姐会照做的……不，不要再顶得那么深了！」`,
          );
          await era.printAndWait(
            `${target_name}扭动着腰，感受着被妹妹的阴茎继续从下方侵犯着自己的肛门的感觉…`,
          );
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `${target_name}的肛门被${player_name}从下方径直插入到了深处。`,
          );
          await era.printAndWait(
            `「嗯啊……啊啊啊${heart(1)} 好舒服${heart(1)} 肛交的感觉……好舒服啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}扭动着腰，尽情地让${player_name}的阴茎在自己的直肠里进出……`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `${target_name}的肛门被${player_name}从下方径直插入到了深处`,
          );
          await era.printAndWait(
            `「是，是的……我会自己……动起来的啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}扭动着腰边娇喘着，享受着骑乘式肛交的快感……`,
          );
        } else {
          await era.printAndWait(
            `${target_name}的肛门被${player_name}从下方径直插入到了深处`,
          );
          await era.printAndWait(`「呜……呜呜……好胀，好难受！」`);
          await era.printAndWait(
            `${player_name}挺起腰，持续地侵犯着${target_name}…`,
          );
        }
      }
      // CFLAG:TARGET:337  = 1（变量语义：CFLAG 族，TARGET:337）
      kojo.骑乘位肛交 = 1;
      return 0;
    } else {
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.骑乘位肛交 <= 6 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `${target_name}的肛门被${player_name}从下方径直插入到了深处。`,
            );
            await era.print(
              `「嗯啊啊……啊啊……肛门被，被这么激烈地侵犯着${heart(1)}……」`,
            );
            await era.print(
              `『啊啊……和姐姐肛交……原来是这么舒服的事情啊啊${heart(1)} ！』`,
            );
            await era.printAndWait(
              `「来吧……尽情地……${heart(1)} 把姐姐的肛门……侵犯得一塌糊涂吧，${player_name}啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}边扭动着腰，边发出一阵阵淫浪的娇喘，完全沉浸在肛交的快感中………`,
            );
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `${target_name}咬着嘴唇，带着沉醉的表情上下扭动着身体。`,
            );
            await era.print(
              `『哎呀呀，姐姐这幅表情，完全变成喜欢肛交的母猪了吗！』`,
            );
            await era.printAndWait(
              `${player_name}也挺着腰配合着${target_name}的动作，不断侵犯着${target_name}的肛门。`,
            );
            await era.printAndWait(
              `「哈……谢谢……夸奖啊啊……姐姐……就是只让${target_name}和魔王大人肛交的母猪啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `完全沉浸在肛交快感中的${target_name}，已经完全抛却任何尊严了……`,
            );
          } else {
            await era.printAndWait(
              `${target_name}前后上下扭动着腰，寻求着更强烈的肛交快感。`,
            );
            await era.print(
              `「肛交……太棒了……真的是世界上最棒的事情了啊啊啊${heart(1)}」`,
            );
            await era.print(
              `『哎呀呀，姐姐真的是完全堕落了呢♪ 下次一定要当着村子里的大家的面侵犯姐姐的肛门，大家一定会忍不住对着姐姐手淫的。』`,
            );
            await era.printAndWait(
              `「啊啊……真，真是好主意${heart(1)} 魔王大人……下次……就按${player_name}说的……在村子里对${target_name}进行公开肛门调教吧${heart(1)}」`,
            );
            await era.printAndWait(
              `当着所有认识的人的面被侵犯，${target_name}光是这么想象着，就已经感觉无比兴奋了…`,
            );
          }
          // CFLAG:337  = 7（变量语义：CFLAG 族，337）
          kojo.骑乘位肛交 = 7;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.骑乘位肛交 <= 5 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「呜……啊啊……全，全部进来了……${heart(1)}」`);
          await era.printAndWait(
            `感受着${player_name}的阴茎在自己肛门内出入，${target_name}忍不住呻吟了起来。`,
          );
          if (rand_n(3) === 0) {
            await era.print(`『啊啊，姐姐的直肠……好紧，好热${heart(1)}』`);
            await era.printAndWait(`「嗯啊……啊啊，屁股感觉……好奇怪！」`);
          } else if (rand_n(2) === 0) {
            await era.print(
              `『呜哇哇……把人家的鸡鸡夹得这么紧，有那么舒服吗！』`,
            );
            await era.printAndWait(`「是，是啊……姐姐……很舒服啊啊！」`);
          } else {
            await era.print(`『嘿嘿，让我来检验一下姐姐肛门的开发程度！』`);
            await era.printAndWait(
              `「呜……呜啊！感觉……好奇怪……又好舒服……${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `${target_name}扭动着腰，感受着被妹妹侵犯肛门的快感……`,
          );
          // CFLAG:337  = 6（变量语义：CFLAG 族，337）
          kojo.骑乘位肛交 = 6;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.骑乘位肛交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `${target_name}的肛门被${player_name}从下方径直插入到了深处。`,
            );
            await era.print(
              `「呜呜……要，要去了，要用肛门……去了啊啊啊${heart(1)}」`,
            );
            await era.print(
              `『哎哎，听着姐姐这么舒服的娇喘，人家也要高潮了啊${heart(1)}』`,
            );
            await era.printAndWait(
              `「哎哎……来吧……和姐姐一起高潮吧，${player_name}${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}边扭动着腰，边发出一阵阵甜美的娇喘，完全沉浸在肛交的快感中………`,
            );
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `${target_name}咬着嘴唇，带着沉醉的表情上下扭动着身体`,
            );
            await era.print(`『嘿嘿，能让姐姐舒服，我很高兴啊！』`);
            await era.print(
              `「呜……呜呜……直肠壁……被这么摩擦着……感觉太舒服了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `「都，都是你把姐姐的肛门……弄得和性器一样了，你可要负责啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}的嬉笑很快又变回了舒服的娇喘………`,
            );
          } else {
            await era.printAndWait(
              `${target_name}前后上下扭动着腰，寻求着更强烈的肛交快感。`,
            );
            await era.print(
              `「肛交……太棒了……真的是世界上最棒的事情了啊啊啊${heart(1)}」`,
            );
            await era.print(`『哇哇……姐姐的动作好棒……好舒服……继续，不要停！』`);
            await era.printAndWait(
              `「啊啊${heart(1)} 要，要坏掉了……屁股舒服得要坏掉了啊啊………」`,
            );
            await era.printAndWait(
              `${target_name}娇喘个不停，已经完全无法自拔了……`,
            );
          }
          // CFLAG:337  = 5（变量语义：CFLAG 族，337）
          kojo.骑乘位肛交 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `感受着${player_name}的阴茎在自己肛门内出入，${target_name}红着脸呻吟着。`,
          );
          if (rand_n(3) === 0) {
            await era.printAndWait(`「呜……啊啊！插到……最里面了！」`);
            await era.print(
              `『感觉如何，姐姐？要一直侵犯到姐姐的肛门合不上为止哦♪』`,
            );
            await era.printAndWait(
              `「不，不行啊……会，会坏掉的……魔王大人，救命呀！」`,
            );
          } else if (rand_n(2) === 0) {
            await era.printAndWait(`「呜啊……屁股被，被撑开了！」`);
            await era.print(
              `『姐姐的肛门还得再让魔王大人好好开发一下啊，太紧了，虽然人家很舒服就是了${heart(1)}』`,
            );
            await era.printAndWait(`「不，不要啊……那里，又不是性器……！」`);
          } else {
            await era.print(
              `『哇哇……姐姐的肛门这么紧，这么舒服……会让人上瘾的♪』`,
            );
            await era.printAndWait(
              `「嗯啊……谢谢，夸奖……不过，还请温柔一点……」`,
            );
          }
          await era.printAndWait(
            `${target_name}感受着被妹妹侵犯肛门的背德快感，身体更加燥热了………`,
          );
          // CFLAG:337  = 4（变量语义：CFLAG 族，337）
          kojo.骑乘位肛交 = 4;
        } else if (
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `感受着${player_name}的阴茎在自己肛门内出入的快感，${target_name}忍不住娇喘了起来。`,
            );
            await era.print(
              `「尽情……尽情地把${target_name}的肛门……侵犯到坏掉吧啊啊啊${heart(1)}」`,
            );
            await era.print(
              `『嘿嘿，姐姐也要自己动起来啊，会更舒服的${heart(1)}』`,
            );
            await era.printAndWait(`「是……是吗……我，我会照做的……嗯啊啊！」`);
            await era.printAndWait(`${target_name}红着脸，主动扭起腰来……`);
          } else if (rand_n(2) === 0) {
            await era.print(
              `「呜……呜呜……直肠壁……被这么摩擦着……感觉太舒服了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `骑在妹妹身上的${target_name}完全无法抗拒肛门的快感，大声娇喘了起来。`,
            );
            await era.print(
              `『嘿嘿，能让姐姐这么舒服，人家也很高兴啊${heart(1)}』`,
            );
            await era.printAndWait(
              `「不，不要盯着人家的脸看啦…啊啊……嗯啊啊！」`,
            );
            await era.printAndWait(
              `${target_name}羞红了脸，腰却不自觉地继续扭动着……`,
            );
          } else {
            await era.printAndWait(
              `肛门被${player_name}的阴茎一次次顶入最深处，${target_name}的呻吟很快变成了大声的娇喘。`,
            );
            await era.print(
              `「呜……呜呜……直肠壁……被这么摩擦着……感觉太舒服了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${player_name}欣赏着姐姐的痴态，舔着嘴唇，挺着腰继续侵犯着骑在自己身上的${target_name}。`,
            );
            await era.print(
              `『哈哈，要高潮了吧，姐姐，彻底变成一个会用肛门高潮的变态吧！』`,
            );
            await era.printAndWait(
              `「呜，呜啊啊……太激烈了！但是……但是，要，要去了，${player_name}，姐姐要去了啊啊！！」`,
            );
          }
          // CFLAG:337  = 3（变量语义：CFLAG 族，337）
          kojo.骑乘位肛交 = 3;
        } else if (kojo.骑乘位肛交 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(
            `${target_name}流着眼泪呻吟着，感受着肛门被妹妹侵犯的生理和心理上的双重痛苦`,
          );
          if (rand_n(3) === 0) {
            await era.printAndWait(`「呜……啊啊……不，不能再进来了！」`);
            await era.print(
              `『那姐姐就快点自己动起来啊，不然我就继续往里顶了哦！』`,
            );
            await era.printAndWait(
              `「不……不行……真的会坏掉的……屁股会坏掉的……呜呜呜！」`,
            );
          } else if (rand_n(2) === 0) {
            await era.printAndWait(`「呜……啊啊……好痛，好痛……！」`);
            await era.print(
              `『没关系没关系，人家的肛门也是这样被魔王大人调教的！』`,
            );
            await era.printAndWait(
              `「不，不要再往里顶了……求你了……我，我会自己动的……！」`,
            );
          } else {
            await era.printAndWait(`「呜……啊啊……太，太粗了……！」`);
            await era.print(
              `『呜哇，姐姐的肛门这么紧，有成为名器的潜质呢${heart(1)}』`,
            );
            await era.printAndWait(`「不要羞辱姐姐了……求你了……」`);
          }
          await era.printAndWait(
            `${target_name}的肛门被妹妹一次次往上顶入到最深处……`,
          );
          // CFLAG:337  = 2（变量语义：CFLAG 族，337）
          kojo.骑乘位肛交 = 2;
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.骑乘位肛交 <= 6 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `${target_name}被充分开发的肛门，将${player_name}整根阴茎吞了进去。`,
            );
            await era.print(
              `「好舒服……已经舒服得……没有办法思考了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `「肛门……被魔王大人的……阴茎${heart(1)} 塞得满满的……好舒服啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}淫浪的娇喘着，享受着，被身下的${player_name}一次次顶入到肛门深处的快感…`,
            );
          } else if (rand_n(2) === 0) {
            await era.print(
              `「肛交……太棒了……真的是世界上最棒的事情了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}发出一声声淫浪的娇喘，扭动着腰让${player_name}的阴茎一次次在自己的肛门进出。`,
            );
            await era.printAndWait(
              `丰满的双乳在胸前上下晃动着，整个人已经完全沉沦在快感之中了。`,
            );
            await era.printAndWait(
              `「嗯啊啊${heart(1)} 好舒服……好想……一直被魔王大人……这么侵犯肛门啊啊啊${heart(1)} 」`,
            );
          } else {
            await era.printAndWait(
              `${target_name}咬着嘴唇，上下扭动着腰身，寻求着更强烈的肛门快感。`,
            );
            await era.print(
              `「不，不行了……肛门……舒服得……要上天了啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `不绝于耳的淫浪娇喘让${player_name}也变得更加兴奋了，阴茎变得更加坚挺。`,
            );
            await era.printAndWait(
              `「啊啊啊……人家的肛门……能够让魔王大人满意${heart(1)} 好高兴啊啊啊${heart(1)}」`,
            );
          }
          // CFLAG:337  = 7（变量语义：CFLAG 族，337）
          kojo.骑乘位肛交 = 7;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.骑乘位肛交 <= 5 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `${target_name}的肛门被${player_name}从下面一次次顶入到深处。`,
          );
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `「嗯啊……啊啊啊${heart(1)} 尽情地……侵犯人家的肛门吧${heart(1)}」`,
            );
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「呜啊……感觉好奇怪，但是好舒服${heart(1)}」`,
            );
          } else {
            await era.printAndWait(
              `「呜啊啊……魔王大人的阴茎，好热，好舒服${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `骑在${player_name}身上的${target_name}扭动着腰，尽情享受着肛交的快感……`,
          );
          // CFLAG:337  = 6（变量语义：CFLAG 族，337）
          kojo.骑乘位肛交 = 6;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.骑乘位肛交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `${target_name}被充分开发的肛门，将${player_name}整根阴茎吞了进去。`,
            );
            await era.print(
              `「嗯啊啊……啊啊……肛门……舒服得……像是要坏掉了一样${heart(1)}」`,
            );
            await era.printAndWait(
              `「这种被一次次撑开的感觉……实在是太舒服啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}带着被融化了一般的表情，发出一阵阵甘甜的娇喘、沉浸在肛交的快感中……`,
            );
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `${target_name}带着陶醉的表情上下扭动着身体，渴求着更强烈的肛门快感。`,
            );
            await era.print(
              `「嗯啊啊……啊啊……肛门……舒服得……像是要坏掉了一样啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `「都怪魔王大人……把人家的肛门……调教得……没有快感，就活不下去了啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}的嬉笑很快被强烈的快感淹没，再次淫浪的娇喘起来……`,
            );
          } else {
            await era.printAndWait(
              `${target_name}前后上下扭动着腰，寻求着更强烈的肛交快感，但${player_name}却故意放慢了动作。`,
            );
            await era.print(
              `「嗯啊啊……啊啊……肛门……舒服得……像是要坏掉了一样啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `「魔，魔王大人……求，求你了……让，让人家的肛门……高潮吧${heart(1)}」`,
            );
            await era.printAndWait(`${target_name}红着脸，大声乞求着……`);
          }
          // CFLAG:337  = 5（变量语义：CFLAG 族，337）
          kojo.骑乘位肛交 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `${target_name}的肛门被身下的${player_name}一次次顶入到深处。`,
          );
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `「好，好的……魔王大人……我，我会自己动起来的${heart(1)}」`,
            );
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「啊啊……这个姿势……好羞耻……不过，好舒服${heart(1)}」`,
            );
          } else {
            await era.printAndWait(
              `「魔王大人，请……尽情侵犯${target_name}的肛门吧${heart(1)} ！」`,
            );
          }
          await era.printAndWait(
            `${target_name}边扭着腰，边发出甜美的，放佛要融化了一般的喘息……`,
          );
          // CFLAG:337  = 4（变量语义：CFLAG 族，337）
          kojo.骑乘位肛交 = 4;
        } else if (
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `${target_name}被充分开发的肛门，将${player_name}整根阴茎吞了进去。`,
          );
          await era.printAndWait(
            `「呜……呜呜……直肠壁……被这么摩擦着……感觉太舒服了啊啊啊${heart(1)}」`,
          );
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `「为，为什么这么舒服……已经，停不下来了啊啊啊……」`,
            );
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「呜呜……才，才不是因为……喜欢肛交……才动起来的……嗯啊啊」`,
            );
          } else {
            await era.printAndWait(
              `「啊啊……再这样下去……肛门就会……变成性器了啊啊」`,
            );
          }
          await era.printAndWait(
            `${target_name}在肛门快感的驱使下，红着脸又扭动起腰来……`,
          );
          // CFLAG:337  = 3（变量语义：CFLAG 族，337）
          kojo.骑乘位肛交 = 3;
        } else if (kojo.骑乘位肛交 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(
            `${target_name}流着眼泪呻吟着，肛门被强行撑开，顶了进去`,
          );
          if (rand_n(3) === 0) {
            await era.printAndWait(`「好痛……好难受……呜呜！」`);
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「呜呜……不，不要再顶进来了……我，我会自己动的……！」`,
            );
          } else {
            await era.printAndWait(
              `「要，要坏掉了……饶了我吧……屁股真的会坏掉的！」`,
            );
          }
          await era.printAndWait(
            `${player_name}挺起腰，持续侵犯着骑在自己身上的${target_name}…`,
          );
          // CFLAG:337  = 2（变量语义：CFLAG 族，337）
          kojo.骑乘位肛交 = 2;
        }
      }
      return 0;
    }
  }

  // IF SELECTCOM === 37（肛门侍奉 CFLAG:338）
  if (era_flag.selectcom === 37) {
    if (kojo.肛门侍奉 === 0) {
      if (assi_mao) {
        await era.printAndWait(
          `『哎啊啊…姐姐居然在舔我的肛门！这感觉真是太棒了，整个人都兴奋起来了呢！』`,
        );
        await era.printAndWait(`「呜呜……饶，饶了姐姐吧……求你了……呜唔呣…」`);
        await era.printAndWait(
          `${target_name}泪流满面，却无可奈何继续用舌头舔舐着${player_name}的肛门………`,
        );
      } else {
        if (chara(target).system.侍奉精神 >= 3) {
          await era.printAndWait(
            `「唔呣呣……呣呣……这都是，都是为了……救出妹妹才这么做的……所以，所以……呣呣呣」`,
          );
          await era.printAndWait(
            `${target_name}带着麻木的表情，边喃喃自语，边舔舐着${player_name}的肛门。`,
          );
        } else {
          await era.printAndWait(
            `「唔呣呣……好脏……但是，但是……这都是，都是为了……救出妹妹才这么做的……！」`,
          );
          await era.printAndWait(
            `${target_name}用舌头费力而迟钝地舔着${player_name}的肛门、被感到不耐烦的${player_name}按住头，强行和肛门接吻了………`,
          );
        }
      }
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338）
      kojo.肛门侍奉 = 1;
      return 0;
    } else {
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.侍奉精神 >= 5 &&
          (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「唔呣…唔呣……${player_name}的肛门……姐姐会帮你舔得干干净净的${heart(1)}」`,
          );
          await era.printAndWait(
            `『姐姐的舌头真灵巧啊，那么喜欢舔妹妹的肛门吗？』`,
          );
          await era.printAndWait(
            `「是啊……最喜欢了${heart(1)} 会一直舔的${heart(1)}」`,
          );
          // CFLAG:338  = 5（变量语义：CFLAG 族，338）
          kojo.肛门侍奉 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.侍奉精神 >= 5 &&
          (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「唔呣…唔呣……${player_name}的肛门……姐姐会帮你舔得干干净净的…${heart(1)}」`,
          );
          await era.printAndWait(
            `『哎嘿嘿，姐姐舔肛门已经舔得这么熟练了啊，那么喜欢妹妹的屁股吗？』`,
          );
          await era.printAndWait(
            `「都…都是为了你……才学会这种害羞的事情的啦………${heart(1)}」`,
          );
          // CFLAG:338  = 4（变量语义：CFLAG 族，338）
          kojo.肛门侍奉 = 4;
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「唔呣……唔呣……这，这种事……唔呣！」`);
          await era.printAndWait(
            `『哎呀，姐姐现在舔肛舔得很熟练了呢，是不是感觉兴奋起来了！』`,
          );
          await era.printAndWait(`「…这种夸奖……一点都不觉得高兴啊！」`);
          // CFLAG:338  = 3（变量语义：CFLAG 族，338）
          kojo.肛门侍奉 = 3;
        } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(
            `「唔呣……唔呣……饶了姐姐吧，求求你了，${player_name}………」`,
          );
          await era.printAndWait(
            `『在胡说什么呢，明明舔妹妹的屁股舔得都兴奋起来了啊，别以为我没发现！？姐姐就要堕落啦啦啦』`,
          );
          // CFLAG:338  = 2（变量语义：CFLAG 族，338）
          kojo.肛门侍奉 = 2;
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.侍奉精神 >= 5 &&
          (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「咕呣……咕呣${heart(1)} ${target_name}的舌头这样舔感觉舒服吗，魔王大人${heart(1)} 咕呣……唔呣……除了肛门之外……还想舔魔王大人的其他地方呢${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}就着自己的口水，仔细地舔舐着${player_name}的肛门，每一处皱褶都舔得干干净净……`,
          );
          // CFLAG:338  = 5（变量语义：CFLAG 族，338）
          kojo.肛门侍奉 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.侍奉精神 >= 5 &&
          (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「咕呣……咕呣……为魔王大人……进行舔肛侍奉……是${target_name}的荣幸${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}用舌尖探入到${player_name}的肛门里，仔细地舔舐着………`,
          );
          // CFLAG:338  = 4（变量语义：CFLAG 族，338）
          kojo.肛门侍奉 = 4;
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「咕呣……咕呣……舔这种地方……是对我的惩罚吗……咕呣…」`,
          );
          await era.printAndWait(
            `${target_name}用舌头继续舔舐着${player_name}的肛门……`,
          );
          // CFLAG:338  = 3（变量语义：CFLAG 族，338）
          kojo.肛门侍奉 = 3;
        } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(`「是…是的……我会好好舔的……咕呣……咕呣……」`);
          await era.printAndWait(
            `${target_name}虽然泪流满面，但仍然明智地舔舐着${player_name}的肛门……`,
          );
          // CFLAG:338  = 2（变量语义：CFLAG 族，338）
          kojo.肛门侍奉 = 2;
        }
      }
      return 0;
    }
  }

  // IF SELECTCOM == 40（打屁股 CFLAG:341）
  if (era_flag.selectcom === 40) {
    if (kojo.打屁股 === 0) {
      if (assi_mao) {
        await era.printAndWait(
          `『姐姐以前还打过我的屁股，现在轮到妹妹十倍奉还了哈哈哈哈！』`,
        );
        await era.printAndWait(
          `「住，住手啊——！好痛，好痛！饶了姐姐吧求你了！」`,
        );
        await era.printAndWait(
          `${target_name}被妹妹狠狠打着屁股，屈辱得泪流满面……`,
        );
      } else {
        await era.printAndWait(`「住，住手啊！好痛……屁股好痛啊啊！」`);
        await era.printAndWait(
          `${target_name}被${player_name}被妹妹狠狠打着屁股，痛得眼泪都出来了……`,
        );
      }
      // CFLAG:TARGET:341  = 1（变量语义：CFLAG 族，TARGET:341）
      kojo.打屁股 = 1;
      return 0;
    } else {
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.打屁股 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「嗯啊……啊啊！狠狠得……打姐姐的屁股吧……打到通红为止${heart(1)}」`,
          );
          await era.printAndWait(
            `『这么喜欢被妹妹打屁股，哼，这根本已经不是原来的姐姐了，只是一只母猪而已呀！看招！啪！啪！』`,
          );
          await era.printAndWait(
            `「啊啊……哎啊……就是这样……姐姐……就是一只母猪性奴啊啊${heart(1)}」`,
          );
          // CFLAG:TARGET:341  = 5（变量语义：CFLAG 族，TARGET:341）
          kojo.打屁股 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.打屁股 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「呜……呜啊……不可以……再打了……啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `『哼，虽然嘴上这么说，但是屁股却一晃一晃的，分明是没被打够嘛？』`,
          );
          await era.printAndWait(`「不，不是的，是因为被打了才会……嗯啊啊……」`);
          // CFLAG:TARGET:341  = 4（变量语义：CFLAG 族，TARGET:341）
          kojo.打屁股 = 4;
        } else if (
          chara(target).system.苦痛刻印 === 3 &&
          chara(target).system.屈服刻印 === 3 &&
          (kojo.打屁股 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `『嘿嘿，姐姐已经这么老实了？屁股被打得有感觉了吗？』`,
          );
          await era.printAndWait(`「饶，饶了姐姐吧……求你了！」`);
          await era.printAndWait(
            `${target_name}在痛苦和恐惧的支配下，对${player_name}完全屈服了。`,
          );
          // CFLAG:TARGET:341  = 3（变量语义：CFLAG 族，TARGET:341）
          kojo.打屁股 = 3;
        } else if (kojo.打屁股 <= 1 && game.kojo.口上开关 === 2) {
          await era.printAndWait(`『不听话的话还要打哦♪』`);
          await era.printAndWait(`「快停下啊……我是你姐姐啊……啊啊啊……好痛！」`);
          await era.printAndWait(
            `${target_name}被妹妹狠狠打着屁股，流下了屈辱的泪水……`,
          );
          // CFLAG:TARGET:341  = 2（变量语义：CFLAG 族，TARGET:341）
          kojo.打屁股 = 2;
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.打屁股 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「嗯啊……啊啊……被这样打着……更加有感觉了啊啊${heart(1)} 狠狠地惩罚${target_name}下贱的臀部吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被${player_name}狠狠拍打着屁股，却发出了享受的娇喘……`,
          );
          // CFLAG:TARGET:341  = 5（变量语义：CFLAG 族，TARGET:341）
          kojo.打屁股 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.打屁股 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「呜啊……请，请继续打把！被${player_name}惩罚……是奴隶的本分……${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}红着脸边呻吟着边被${player_name}打着屁股……`,
          );
          // CFLAG:TARGET:341  = 4（变量语义：CFLAG 族，TARGET:341）
          kojo.打屁股 = 4;
        } else if (
          chara(target).system.苦痛刻印 === 3 &&
          chara(target).system.屈服刻印 === 3 &&
          (kojo.打屁股 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「呜啊啊……好痛，好痛啊……饶了我吧……饶了我吧……我会好好听话的。」`,
          );
          await era.printAndWait(
            `${target_name}在痛苦和恐惧的支配下，对${player_name}完全屈服了。`,
          );
          // CFLAG:TARGET:341  = 3（变量语义：CFLAG 族，TARGET:341）
          kojo.打屁股 = 3;
        } else if (kojo.打屁股 <= 1 && game.kojo.口上开关 === 2) {
          await era.printAndWait(`「啊啊啊！好痛……好痛……住手啊啊！！」`);
          await era.printAndWait(
            `${target_name}的臀部被${player_name}拍打得通红，发出了痛苦不堪的悲鸣……`,
          );
          // CFLAG:TARGET:341  = 2（变量语义：CFLAG 族，TARGET:341）
          kojo.打屁股 = 2;
        }
      }
      return 0;
    }
  }

  // IF SELECTCOM == 41（鞭 CFLAG:342）
  if (era_flag.selectcom === 41) {
    if (kojo.鞭 === 0) {
      if (assi_mao) {
        await era.printAndWait(
          `『哈哈哈哈，以后姐姐不听话，就要用这个鞭子狠狠抽打！』`,
        );
        await era.printAndWait(`「呜啊啊……住，住手啊啊！」`);
        await era.printAndWait(
          `鞭子抽击的声音中还夹杂着${player_name}歇斯底里的笑声和${target_name}痛苦的悲鸣……`,
        );
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(`「呜……呜啊啊……好痛啊啊……！」`);
          await era.printAndWait(
            `${target_name}在鞭子抽打下大声尖叫着，如同悦耳的乐声一样传入${player_name}的耳朵……`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(`「我，我做错了什么吗——啊啊啊！！！」`);
          await era.printAndWait(
            `${player_name}丝毫不敢反抗，忍受着${target_name}挥下的鞭子，满足着${player_name}的嗜虐心……`,
          );
        } else {
          await era.printAndWait(`「呜啊啊……住，住手啊啊啊！」`);
          await era.printAndWait(`${target_name}在鞭子下痛苦地惨叫着……`);
        }
      }
      // CFLAG:TARGET:342  = 1（变量语义：CFLAG 族，TARGET:342）
      kojo.鞭 = 1;
      return 0;
    } else {
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.抖M气质 >= 5 &&
          (kojo.鞭 <= 8 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「呜，呜啊，请再抽打我吧${heart(1)}」`);
          await era.printAndWait(
            `『被鞭子抽打得发情了吗？真是个变态呢！欠打！欠打！』`,
          );
          await era.printAndWait(`「呜呜……啊啊啊……嗯啊啊！」`);
          await era.printAndWait(
            `${target_name}完全沉浸在妹妹施予的痛苦带来的扭曲的受虐快感中……`,
          );
          // CFLAG:TARGET:342  = 9（变量语义：CFLAG 族，TARGET:342）
          kojo.鞭 = 9;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.鞭 <= 7 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「呜……呜啊啊……嗯啊啊！」`);
          await era.printAndWait(
            `『哎哟，明明在被鞭笞，怎么会发出娇喘来呢姐姐？』`,
          );
          await era.printAndWait(`「才……才不是娇喘呢！」`);
          await era.printAndWait(
            `『哈，明明听上去就是很舒服的样子嘛，变态，大变态！』`,
          );
          await era.printAndWait(
            `${player_name}更加兴奋地挥着鞭子狠狠抽打着${target_name}……`,
          );
          // CFLAG:TARGET:342  = 8（变量语义：CFLAG 族，TARGET:342）
          kojo.鞭 = 8;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.鞭 <= 6 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「住，住手啊${player_name}！为，为什么要用鞭子打我！」`,
          );
          await era.printAndWait(
            `『姐姐明明只是个便器母猪，居然总能得到魔王大人的宠爱，真是让人不能忍，所以要狠狠地鞭笞你！』`,
          );
          await era.printAndWait(`「呜啊啊……魔王大人……救我……啊啊啊！」`);
          await era.printAndWait(
            `而你只是微笑着，欣赏着${player_name}鞭笞着${target_name}的样子……`,
          );
          // CFLAG:TARGET:342  = 7（变量语义：CFLAG 族，TARGET:342）
          kojo.鞭 = 7;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.抖M气质 >= 5 &&
          (kojo.鞭 <= 5 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「呜……呜啊啊……请，请尽情鞭打姐姐吧…${heart(1)}」`,
          );
          await era.printAndWait(
            `『哎哎，没搞错吧姐姐，我是在惩罚你，不是在侍奉你啊！真是个大变态呢！』`,
          );
          await era.printAndWait(
            `「是，是的……我是大变态，${player_name}大人${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}带着吃惊的表情，更用力地抽打着自己的姐姐………`,
          );
          // CFLAG:TARGET:342  = 6（变量语义：CFLAG 族，TARGET:342）
          kojo.鞭 = 6;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.鞭 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `『亲爱的姐姐，为什么被我打了还会露出高兴的表情呐？』`,
          );
          await era.printAndWait(`「才……才没有……高兴的表情啊……」`);
          await era.printAndWait(`『还说谎！再打多10鞭！』`);
          await era.printAndWait(
            `${player_name}带着嗜虐的笑容，朝${target_name}再次挥起鞭子……`,
          );
          // CFLAG:TARGET:342  = 5（变量语义：CFLAG 族，TARGET:342）
          kojo.鞭 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.鞭 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `『姐姐居然也得到了魔王大人的宠爱，不可饶恕！要好好惩罚你♪』`,
          );
          await era.printAndWait(`「在，在说什么啊……好痛！！好痛啊啊！！」`);
          await era.printAndWait(
            `『痛？被鞭子打当然会痛了，不然怎么叫惩罚！』`,
          );
          await era.printAndWait(`${player_name}更加用力地挥动着鞭子……`);
          // CFLAG:TARGET:342  = 4（变量语义：CFLAG 族，TARGET:342）
          kojo.鞭 = 4;
        } else if (
          chara(target).system.抖M气质 >= 3 &&
          (kojo.鞭 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`『愿意好好听话了吗，母猪姐姐！？』`);
          await era.printAndWait(`「呜，呜呜……住手啊！」`);
          await era.printAndWait(
            `${player_name}太过于沉迷挥动鞭子的感觉，没有听到${target_name}的哀叫中时不时带着享受的娇喘……`,
          );
          // CFLAG:TARGET:342  = 3（变量语义：CFLAG 族，TARGET:342）
          kojo.鞭 = 3;
        } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(`『哈哈哈，姐姐变成我的奴隶吧！』`);
          await era.printAndWait(`「呜啊啊啊！好痛！住手啊啊！」`);
          await era.printAndWait(
            `鞭子抽击的声音中还夹杂着${player_name}歇斯底里的笑声和${target_name}痛苦的悲鸣……`,
          );
          // CFLAG:TARGET:342  = 2（变量语义：CFLAG 族，TARGET:342）
          kojo.鞭 = 2;
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.抖M气质 >= 5 &&
          (kojo.鞭 <= 8 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「打我，再用力打我…嗯啊啊${heart(1)}」`);
          await era.printAndWait(
            `${target_name}的眼睛里闪烁着强烈的情欲，已经完全变成母猪受虐狂了。`,
          );
          await era.printAndWait(
            `随着${player_name}的鞭子打出新的伤痕，在${target_name}却不住地娇喘着。`,
          );
          await era.printAndWait(
            `「嗯啊……啊啊啊${heart(1)} 尽，尽情地打我吧${heart(1)} 呜啊啊啊${heart(1)}」`,
          );
          // CFLAG:TARGET:342  = 9（变量语义：CFLAG 族，TARGET:342）
          kojo.鞭 = 9;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.鞭 <= 7 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「呜啊啊！被，被${player_name}鞭打的感觉……原来这么好！」`,
          );
          await era.printAndWait(
            `${target_name}每次被鞭子抽打，都会发出娇喘。`,
          );
          await era.printAndWait(
            `「哈啊……啊啊啊${heart(1)} 再继续打我${heart(1)}」`,
          );
          // CFLAG:TARGET:342  = 8（变量语义：CFLAG 族，TARGET:342）
          kojo.鞭 = 8;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.鞭 <= 6 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「呜啊啊……好痛！好痛！不，不要做这种事情啦！」`,
          );
          await era.printAndWait(
            `${target_name}在鞭子抽打下发出了惨叫，${player_name}却乐在其中地欣赏着……`,
          );
          // CFLAG:TARGET:342  = 7（变量语义：CFLAG 族，TARGET:342）
          kojo.鞭 = 7;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.抖M气质 >= 5 &&
          (kojo.鞭 <= 5 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「呜啊啊……啊啊…${heart(1)} 还，还想要继续被魔王大人鞭打${heart(1)} 呜啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}在${player_name}的鞭笞下不住地娇喘着，股间完全湿透了。`,
          );
          await era.printAndWait(
            `对${target_name}的受虐调教已经彻底完成，${player_name}正在被卑微屈膝地乞求着更多的鞭笞。`,
          );
          await era.printAndWait(
            `「呜哇……啊啊啊${heart(1)} 好痛……但是好舒服啊啊${heart(1)}」`,
          );
          // CFLAG:TARGET:342  = 6（变量语义：CFLAG 族，TARGET:342）
          kojo.鞭 = 6;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.鞭 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「呜……呜啊……啊啊啊，快……停下……已经……」`);
          await era.printAndWait(
            `${target_name}在${player_name}鞭笞下摩擦着双腿，发出了享受的娇喘。`,
          );
          await era.printAndWait(`「哈……哈啊……不，不要这样对人家了啊啊……」`);
          // CFLAG:TARGET:342  = 5（变量语义：CFLAG 族，TARGET:342）
          kojo.鞭 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.鞭 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「好痛！求，求你了……停手，停手啊啊啊！让${target_name}做什么其他事情都可以！」`,
          );
          await era.printAndWait(
            `${player_name}毫不留情地继续对${target_name}的身体挥着鞭子，满足着自己的施虐心………`,
          );
          // CFLAG:TARGET:342  = 4（变量语义：CFLAG 族，TARGET:342）
          kojo.鞭 = 4;
        } else if (
          chara(target).system.抖M气质 >= 3 &&
          (kojo.鞭 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「呜……呜啊……啊啊啊！」`);
          await era.printAndWait(
            `被${player_name}鞭笞着，${target_name}却在痛苦的喊叫中不时地发出了享受的娇喘`,
          );
          // CFLAG:TARGET:342  = 3（变量语义：CFLAG 族，TARGET:342）
          kojo.鞭 = 3;
        } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(`「啊啊……饶了我吧……呜啊啊啊！」`);
          await era.printAndWait(
            `${player_name}的鞭笞下，${target_name}痛苦地悲鸣着……`,
          );
          // CFLAG:TARGET:342  = 2（变量语义：CFLAG 族，TARGET:342）
          kojo.鞭 = 2;
        }
      }
      return 0;
    }
  }

  // IF SELECTCOM == 42（针 CFLAG:343）
  if (era_flag.selectcom === 42) {
    if (kojo.针 === 0) {
      if (assi_mao) {
        await era.printAndWait(
          `『嘿嘿嘿，接下来就是惩罚时间了、不过已经事先消毒过了，所以姐姐可以放心♪』`,
        );
        await era.printAndWait(`「不，不要……会，会死的……真的会的啊啊啊啊！」`);
        await era.printAndWait(
          `${target_name}娇嫩的肌肤被细针刺破，忍不住惨叫了起来……`,
        );
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「呜……呜啊……不，不要啊……人家一点都不喜欢……这种玩法啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}娇嫩的肌肤被细针刺破，忍不住惨叫了起来……`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「不，不要啊……这种调教……也太可怕了呜啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}娇嫩的肌肤被细针刺破，忍不住惨叫了起来……`,
          );
        } else {
          await era.printAndWait(
            `「骗……骗人……这么多根针……扎进去……会死的……啊啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}娇嫩的肌肤被细针刺破，忍不住惨叫了起来……`,
          );
        }
      }
      // CFLAG:TARGET:343  = 1（变量语义：CFLAG 族，TARGET:343）
      kojo.针 = 1;
      return 0;
    } else {
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.抖M气质 >= 5 &&
          (kojo.针 <= 8 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `『哎呀呀，被针这样扎着胸部，还叫的这么淫荡，姐姐真是变态受虐狂呢♪』`,
          );
          await era.printAndWait(
            `「是……是啊……这样被刺着……虽然痛……但是也……好舒服啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `已经完全沦为受虐狂的${target_name}被妹妹当成玩具一样肆意虐待着，反而心中涌起了异样的满足与快感……`,
          );
          // CFLAG:TARGET:343  = 9（变量语义：CFLAG 族，TARGET:343）
          kojo.针 = 9;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.针 <= 7 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `『啧啧，姐姐的大胸部这样被针刺，居然还会兴奋起来？』`,
          );
          await era.printAndWait(`「好……好像……就是这样呢！？」`);
          await era.printAndWait(
            `${target_name}痛苦的呻吟之中，不知不觉混入了享受的娇喘……`,
          );
          // CFLAG:TARGET:343  = 8（变量语义：CFLAG 族，TARGET:343）
          kojo.针 = 8;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.针 <= 6 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`『姐姐准备接受惩罚吧♪』`);
          await era.printAndWait(`「呜……好痛！好痛！不要啊啊！」`);
          // CFLAG:TARGET:343  = 7（变量语义：CFLAG 族，TARGET:343）
          kojo.针 = 7;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.抖M气质 >= 5 &&
          (kojo.针 <= 5 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `『哎呀呀，明明是在受罚，姐姐居然还叫的这么舒服，已经彻底变成母猪受虐狂了呢♪』`,
          );
          await era.printAndWait(
            `「呜……呜啊……已，已经舒服得……不行了啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `受虐癖在心中完全绽开的${target_name}被妹妹当成玩具一样肆意虐待着，反而心中涌起了异样的满足与快感……`,
          );
          // CFLAG:TARGET:343  = 6（变量语义：CFLAG 族，TARGET:343）
          kojo.针 = 6;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.针 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `『啧啧，姐姐的大胸部这样被针刺，居然还兴奋得起来？』`,
          );
          await era.printAndWait(`「才……才没有感觉兴奋……很痛啊啊！！！」`);
          await era.printAndWait(
            `${target_name}痛苦的呻吟之中，不知不觉混入了享受的娇喘……`,
          );
          // CFLAG:TARGET:343  = 5（变量语义：CFLAG 族，TARGET:343）
          kojo.针 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.针 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`『姐姐准备接受惩罚吧♪』`);
          await era.printAndWait(`「不，不要，好痛啊啊！好痛！！」`);
          // CFLAG:TARGET:343  = 4（变量语义：CFLAG 族，TARGET:343）
          kojo.针 = 4;
        } else if (
          chara(target).system.抖M气质 >= 3 &&
          (kojo.针 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「呜啊……好，好痛……不，不要再刺了啊！」`);
          await era.printAndWait(
            `『哼，口头上这么说着，但是乳头却兴奋得挺起来了呢，真是淫乱！』`,
          );
          // CFLAG:TARGET:343  = 3（变量语义：CFLAG 族，TARGET:343）
          kojo.针 = 3;
        } else if (kojo.针 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(`『姐姐淫乱的大胸部，接受惩罚吧♪』`);
          await era.printAndWait(`「住，住手啊啊！好痛！」`);
          // CFLAG:TARGET:343  = 2（变量语义：CFLAG 族，TARGET:343）
          kojo.针 = 2;
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.抖M气质 >= 5 &&
          (kojo.针 <= 8 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「呜……呜啊啊${heart(1)} 好……好痛……但，但是……这种感觉……好棒啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}用针肆意地扎着${target_name}丰满的双峰和挺立的乳头，直到针口渗出一颗颗血珠。`,
          );
          await era.printAndWait(
            `然而受虐狂的本性驱使下，${target_name}痛苦的呻吟逐渐被享受的娇喘取代……`,
          );
          // CFLAG:TARGET:343  = 9（变量语义：CFLAG 族，TARGET:343）
          kojo.针 = 9;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.针 <= 7 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「啊啊啊！好痛……好痛！但，但是……也好……好舒服……呜啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}被针毫不留情地扎着胸部和下体，但是已经养成受虐癖的身体却愈发的兴奋起来……`,
          );
          // CFLAG:TARGET:343  = 8（变量语义：CFLAG 族，TARGET:343）
          kojo.针 = 8;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.针 <= 6 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「呜……呜啊啊……好痛！这样的……调教……人家不想要啊啊！！」`,
          );
          await era.printAndWait(
            `${target_name}娇嫩的肌肤在针刺下渗出一颗颗血珠，痛哭流涕着`,
          );
          // CFLAG:TARGET:343  = 7（变量语义：CFLAG 族，TARGET:343）
          kojo.针 = 7;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.抖M气质 >= 5 &&
          (kojo.针 <= 5 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「呜……呜啊……魔，魔王大人${heart(1)} 请，请尽情的虐待${target_name}吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}用针肆意地扎着${target_name}丰满的双峰、挺立的乳头和阴蒂，直到针口渗出一颗颗血珠。`,
          );
          await era.printAndWait(
            `已经完全沦为受虐狂的${target_name}却从痛苦中感受到了无上的快感和心理满足……`,
          );
          // CFLAG:TARGET:343  = 6（变量语义：CFLAG 族，TARGET:343）
          kojo.针 = 6;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.针 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「呜……呜呜……好痛啊，魔王大人……但，但是人家还忍得住……啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}在针刺下悲鸣，颤抖着，但是受虐癖的本性也将这痛苦转化成了异样的快感，渗血的乳头兴奋地坚挺着，下体也湿润了…`,
          );
          // CFLAG:TARGET:343  = 5（变量语义：CFLAG 族，TARGET:343）
          kojo.针 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.针 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「痛……好痛啊……求求你，魔王大人……饶了我吧！」`,
          );
          await era.printAndWait(
            `${target_name}娇嫩的肌肤在针刺下渗出一颗颗血珠，痛哭流涕着。`,
          );
          // CFLAG:TARGET:343  = 4（变量语义：CFLAG 族，TARGET:343）
          kojo.针 = 4;
        } else if (
          chara(target).system.抖M气质 >= 3 &&
          (kojo.针 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「呜……呜啊啊……好痛，但……但是……呜呜」`);
          await era.printAndWait(
            `${target_name}在针刺下痛苦地悲鸣着，然而受虐癖的本质却让她在痛苦的同时感受到了异样的兴奋和满足，渗血的乳头反而挺立了起来，下体也湿润了…`,
          );
          // CFLAG:TARGET:343  = 3（变量语义：CFLAG 族，TARGET:343）
          kojo.针 = 3;
        } else if (kojo.针 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(
            `「呜啊啊！饶……饶命啊……魔王大人……这样，这样真的会死掉的！！」`,
          );
          await era.printAndWait(
            `${target_name}娇嫩的肌肤在针刺下渗出一颗颗血珠，痛哭流涕地惨叫着。`,
          );
          // CFLAG:TARGET:343  = 2（变量语义：CFLAG 族，TARGET:343）
          kojo.针 = 2;
        }
      }
      return 0;
    }
  }

  // SELECTCOM 43（眼罩 CFLAG:344 / CFLAG:380）
  if (era_flag.selectcom === 43 && era0(`tequip:${target}:43`) !== 0) {
    if (kojo.眼罩 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊啊……什么都看不见……身体反而更兴奋了${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「不，不要这样欺负人家啦………」`);
      } else {
        await era.printAndWait(`「这，这是要做什么？！」`);
      }
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344）
      kojo.眼罩 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        chara(target).system.抖M气质 >= 5 &&
        (kojo.眼罩 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呜啊……${player_name}想，想要对人家做什么呢……只能靠想象……反而更兴奋起来了${heart(1)}」`,
        );
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        chara(target).system.抖M气质 >= 3 &&
        (kojo.眼罩 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊……什么都看不见……更，更想被魔王大人调教了${heart(1)}」`,
        );
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.眼罩 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「咦咦……魔王大人是想出了什么新玩法吗？」`);
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 7;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        chara(target).system.抖M气质 >= 5 &&
        (kojo.眼罩 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊……什么都看不见……脑子里一片混乱……但，但是……好兴奋啊啊${heart(1)}」`,
        );
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        chara(target).system.抖M气质 >= 3 &&
        (kojo.眼罩 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈，哈啊……心扑通扑通的，跳得好快……♪」`);
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.眼罩 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「什，什么都看不见……有点害怕……你在哪里……魔王大人？」`,
        );
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 4;
      } else if (
        chara(target).system.抖M气质 >= 3 &&
        (kojo.眼罩 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「人，人家才……才没有兴奋……但，但是……你在哪里，魔王大人……」`,
        );
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 3;
      } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「才，才不会害怕呢……」`);
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom === 43 && era0(`tequip:${target}:43`) === 0) {
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.眼罩着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊啊真是的……让人家……多沉浸在想象的世界里一会儿嘛……」`,
      );
      // CFLAG:380  = 3（变量语义：CFLAG 族，380）
      kojo.眼罩着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.眼罩着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「终于又能看见${player_name}的面貌了……」`);
      // CFLAG:380  = 2（变量语义：CFLAG 族，380）
      kojo.眼罩着脱 = 2;
    } else if (kojo.眼罩着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「呼……呼…」`);
      // CFLAG:380  = 1（变量语义：CFLAG 族，380）
      kojo.眼罩着脱 = 1;
    }
    return 0;
  }

  // SELECTCOM 44（绳 CFLAG:345 / CFLAG:385）
  if (era_flag.selectcom === 44 && era0(`tequip:${target}:44`) !== 0) {
    if (kojo.绳子 === 0) {
      if (assi_mao) {
        await era.printAndWait(
          `『姐姐这样的身材绑起来才好看，这淫乱的胸部，被绳子一勒看上去更大了呢♪』`,
        );
        await era.printAndWait(`「勒……勒得太紧了……稍微放松一点不行吗……」`);
        await era.printAndWait(`『想得美，这可不是过家家哦姐姐』`);
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「把人家捆绑起来，是想做什么呢魔王大人${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}舔着嘴唇，配合地让${player_name}将自己的身体束缚起来……`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「魔，魔王大人……请不要绑得那么紧……可以吗，人家……会好好配合的！」`,
          );
          await era.printAndWait(
            `被${player_name}用绳子粗暴地捆住了手脚和身体，${target_name}发出了吃痛的呻吟……`,
          );
        } else {
          await era.printAndWait(
            `「绑，绑成这个样子……有什么意义！好，好痛啊！」`,
          );
          await era.printAndWait(
            `${target_name}痛苦的呻吟被完全无视了，绳子一圈圈地将她牢牢捆成了魔王想要的造型……`,
          );
        }
      }
      // CFLAG:TARGET:345  = 1（变量语义：CFLAG 族，TARGET:345）
      kojo.绳子 = 1;
      return 0;
    } else {
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.抖M气质 >= 5 &&
          (kojo.绳子 <= 8 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `『在魔王大人面前被捆绑，姐姐是不是更加兴奋了呢♪』`,
          );
          await era.printAndWait(
            `「没，没有啦……哪里有兴奋啦${heart(1)} 嗯啊啊」`,
          );
          await era.printAndWait(
            `『什么，原来已经发情了呢，被绳子一摩擦下面就这么湿了！居然连我都骗过去了，真是变态受虐狂姐姐！』`,
          );
          await era.printAndWait(
            `${player_name}哼笑着，继续用绳子将${target_name}的四肢反绑起来，吊在调教室中间……`,
          );
          // CFLAG:TARGET:345  = 9（变量语义：CFLAG 族，TARGET:345）
          kojo.绳子 = 9;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.绳子 <= 7 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `『在魔王大人面前被捆绑，姐姐是不是更加兴奋了呢♪』`,
          );
          await era.printAndWait(`「感觉什么的……才没有呢……哈啊${heart(1)}」`);
          // CFLAG:TARGET:345  = 8（变量语义：CFLAG 族，TARGET:345）
          kojo.绳子 = 8;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.绳子 <= 6 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `『在魔王大人面前被捆绑，姐姐是不是更加兴奋了呢♪』`,
          );
          await era.printAndWait(`「好，好痛……轻一点啦，${player_name}」`);
          // CFLAG:TARGET:345  = 7（变量语义：CFLAG 族，TARGET:345）
          kojo.绳子 = 7;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.抖M气质 >= 5 &&
          (kojo.绳子 <= 5 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `『在魔王大人面前被捆绑，姐姐是不是更加兴奋了呢♪』`,
          );
          await era.printAndWait(`「呜……呜啊……才，才没什么兴奋呢……！啊啊……」`);
          await era.printAndWait(
            `『都舒服成这个样子了还嘴硬，被绳结摩擦着阴蒂，那么舒服吗♪』`,
          );
          await era.printAndWait(
            `「啊……嗯啊啊……不，不要这样玩了啦${heart(1)}！」`,
          );
          // CFLAG:TARGET:345  = 6（变量语义：CFLAG 族，TARGET:345）
          kojo.绳子 = 6;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.绳子 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `『在魔王大人面前被捆绑，姐姐是不是更加兴奋了呢♪』`,
          );
          await era.printAndWait(`「什……什么啦……哪有兴奋什么的！」`);
          // CFLAG:TARGET:345  = 5（变量语义：CFLAG 族，TARGET:345）
          kojo.绳子 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.绳子 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `『在魔王大人面前被捆绑，姐姐是不是更加兴奋了呢♪』`,
          );
          await era.printAndWait(`「绳子……太紧了……只感觉痛而已啦！」`);
          // CFLAG:TARGET:345  = 4（变量语义：CFLAG 族，TARGET:345）
          kojo.绳子 = 4;
        } else if (
          chara(target).system.抖M气质 >= 3 &&
          (kojo.绳子 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `『姐姐的身体，真是很适合被捆绑呢，胸部被这么一勒，显得更大了呢，啧啧啧』`,
          );
          await era.printAndWait(`「不，不要……说这种话了……快点放姐姐下来！」`);
          // CFLAG:TARGET:345  = 3（变量语义：CFLAG 族，TARGET:345）
          kojo.绳子 = 3;
        } else if (kojo.绳子 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(
            `『姐姐，不要抵抗了，老老实实被吊起来，接受我和魔王大人的疼爱吧』`,
          );
          await era.printAndWait(`「放，放开我啊啊！」`);
          // CFLAG:TARGET:345  = 2（变量语义：CFLAG 族，TARGET:345）
          kojo.绳子 = 2;
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.抖M气质 >= 5 &&
          (kojo.绳子 <= 8 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「哈啊……哈啊${heart(1)} 被这样绑起来侵犯的感觉${heart(1)} 啊啊……有点等不及了${heart(1)}」`,
          );
          await era.printAndWait(
            `被${player_name}用绳子捆住四肢，展露着下体的${target_name}只能一扭一扭地呻吟着，渴求着侵犯和调教……`,
          );
          // CFLAG:TARGET:345  = 9（变量语义：CFLAG 族，TARGET:345）
          kojo.绳子 = 9;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.绳子 <= 7 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「啊啊……来吧，魔王大人……就这样把人家侵犯得……乱七八糟吧，反正人家动不了了呢${heart(1)}」`,
          );
          await era.printAndWait(
            `被绳子捆住四肢，展露着下体的${target_name}向${player_name}露出诱惑的媚笑`,
          );
          // CFLAG:TARGET:345  = 8（变量语义：CFLAG 族，TARGET:345）
          kojo.绳子 = 8;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.绳子 <= 6 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「哎哎……人家明明什么都会听魔王大人的，为什么还要绑成这样呢！」`,
          );
          await era.printAndWait(
            `${target_name}吐着舌头，被${player_name}捆住了四肢，展露着下体……`,
          );
          // CFLAG:TARGET:345  = 7（变量语义：CFLAG 族，TARGET:345）
          kojo.绳子 = 7;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.抖M气质 >= 5 &&
          (kojo.绳子 <= 5 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「魔，魔王大人……想对${target_name}做怎样的事情……都可以${heart(1)} 啊啊……绳结，摩擦到阴蒂了……嗯啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}用绳子捆住四肢，展露着下体的${target_name}扭动着身体，感受着绳子摩擦着身体的敏感点……`,
          );
          // CFLAG:TARGET:345  = 6（变量语义：CFLAG 族，TARGET:345）
          kojo.绳子 = 6;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.绳子 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「哼啊……魔王大人……这么想虐待人家吗♪」`);
          await era.printAndWait(
            `被${player_name}用绳子捆住四肢${target_name}顺从地展露着下体……`,
          );
          // CFLAG:TARGET:345  = 5（变量语义：CFLAG 族，TARGET:345）
          kojo.绳子 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.绳子 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「哎……哎……有，有点痛……不过既然是魔王大人的要求……」`,
          );
          await era.printAndWait(
            `被${player_name}用绳子捆住四肢、${target_name}忍耐着肌肤，还有双乳紧勒的痛楚……`,
          );
          // CFLAG:TARGET:345  = 4（变量语义：CFLAG 族，TARGET:345）
          kojo.绳子 = 4;
        } else if (
          chara(target).system.抖M气质 >= 3 &&
          (kojo.绳子 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「嗯啊……还，还是有点痛……但，但是………」`);
          await era.printAndWait(
            `${target_name}痛得眼睛都湿润了，但却顺从地让${player_name}继续捆缚着自己的身体……`,
          );
          // CFLAG:TARGET:345  = 3（变量语义：CFLAG 族，TARGET:345）
          kojo.绳子 = 3;
        } else if (kojo.绳子 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(`「放，放开我啊啊……捆绑什么的，超讨厌啊！」`);
          await era.printAndWait(
            `无视${target_name}的痛苦呻吟和挣扎、${player_name}继续用绳子一圈圈束缚着${target_name}诱人的身体……`,
          );
          // CFLAG:TARGET:345  = 2（变量语义：CFLAG 族，TARGET:345）
          kojo.绳子 = 2;
        }
      }
      return 0;
    }
  } else if (era_flag.selectcom === 44 && era0(`tequip:${target}:44`) === 0) {
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「哎……啊……这就结束了么……其实，感觉还挺棒的…」`);
      // CFLAG:385  = 2（变量语义：CFLAG 族，385）
      kojo.绳子着脱 = 2;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊啊……皮肤上的勒痕……要很久才能消掉呢……不过只要魔王大人高兴就好…」`,
      );
      // CFLAG:385  = 2（变量语义：CFLAG 族，385）
      kojo.绳子着脱 = 2;
    } else if (kojo.绳子着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「终……终于……能轻松一些了」`);
      // CFLAG:385  = 1（变量语义：CFLAG 族，385）
      kojo.绳子着脱 = 1;
    }
    return 0;
  }

  // SELECTCOM 45（口塞 CFLAG:346 / CFLAG:386）
  if (era_flag.selectcom === 45 && era0(`tequip:${target}:45`) !== 0) {
    if (kojo.口塞 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「呣……呣呣呣——！」`);
        await era.printAndWait(
          `${target_name}似乎想要说什么，但最后只有口水从塞口球里流出来……`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「不，不要啦——呣呣……呣呣呣！」`);
        await era.printAndWait(
          `${target_name}的声音被口球堵住，变成了无力的呻吟……`,
        );
      } else {
        await era.printAndWait(`「唔，这，这是——呣呣……呣呣呣！？」`);
        await era.printAndWait(
          `${target_name}被${player_name}强行塞进口球，只能发出含糊的痛苦呻吟……`,
        );
      }
      // CFLAG:TARGET:346  = 1（变量语义：CFLAG 族，TARGET:346）
      kojo.口塞 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        chara(target).system.抖M气质 >= 5 &&
        (kojo.口塞 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊——呣……呣呣呣${heart(1)}」`);
        await era.printAndWait(
          `${target_name}张开嘴，顺从地让${player_name}把球形口塞粗暴地塞了进去，呻吟声随即变得模糊不清，呼吸也灼热了起来……`,
        );
        // CFLAG:TARGET:346  = 9（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        chara(target).system.抖M气质 >= 3 &&
        (kojo.口塞 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「好，好的——呣……呣呣呣${heart(1)}」`);
        await era.printAndWait(
          `${target_name}老实地让${player_name}把球形口塞粗暴地塞了进去，只有口水慢慢地从嘴角渗出……`,
        );
        // CFLAG:TARGET:346  = 8（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.口塞 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「人，人家不喜欢这个东西啦——呣……呣呣呣！」`);
        await era.printAndWait(
          `${target_name}的话音变成了无力的呻吟，只有口水慢慢地从嘴角渗出……`,
        );
        // CFLAG:TARGET:346  = 7（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 7;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        chara(target).system.抖M气质 >= 5 &&
        (kojo.口塞 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「是，是的，魔王大人……请——呣……呣呣呣${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}张开嘴，顺从地让${player_name}把球形口塞粗暴地塞了进去，呻吟声随即变得模糊不清，呼吸也灼热了起来……`,
        );
        // CFLAG:TARGET:346  = 6（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        chara(target).system.抖M气质 >= 3 &&
        (kojo.口塞 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊——呣……呣呣呣……${heart(1)}」`);
        await era.printAndWait(
          `${target_name}老实地张开嘴，让${player_name}把球形口塞粗暴地塞了进去……`,
        );
        // CFLAG:TARGET:346  = 5（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.口塞 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「虽，虽然不喜欢这个东西……但，但是只要魔王大人要求的话——呣……呣呣呣…！」`,
        );
        await era.printAndWait(
          `${target_name}的话音变成了无力的呻吟，只有口水从塞口球里慢慢流出来……`,
        );
        // CFLAG:TARGET:346  = 4（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 4;
      } else if (
        chara(target).system.抖M气质 >= 3 &&
        (kojo.口塞 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「好，好的——呣……呣呣呣……」`);
        await era.printAndWait(
          `${target_name}老实地张开嘴，让${player_name}把球形口塞粗暴地塞了进去……`,
        );
        // CFLAG:TARGET:346  = 3（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 3;
      } else if (kojo.口塞 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「不，不要这个！？」`);
        await era.printAndWait(
          `${target_name}被${player_name}强行塞进口球，只能发出含糊的痛苦呻吟……`,
        );
        // CFLAG:TARGET:346  = 2（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom === 45 && era0(`tequip:${target}:45`) === 0) {
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.口塞着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「呜呜……呜啊……嘴巴好酸…」`);
      await era.printAndWait(`口水还在慢慢地从${target_name}的嘴边流出……`);
      // CFLAG:386  = 3（变量语义：CFLAG 族，386）
      kojo.口塞着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.口塞着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「咳，咳……嘴巴好酸……」`);
      await era.printAndWait(`口水还在慢慢地从${target_name}的嘴边流出……`);
      // CFLAG:386  = 2（变量语义：CFLAG 族，386）
      kojo.口塞着脱 = 2;
    } else if (kojo.口塞着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「呜……呜呜……咳咳咳………」`);
      await era.printAndWait(`口水还在慢慢地从${target_name}的嘴边流出……`);
      // CFLAG:386  = 1（变量语义：CFLAG 族，386）
      kojo.口塞着脱 = 1;
    }
    return 0;
  }

  // SELECTCOM 46（灌肠肛塞 CFLAG:347）
  if (era_flag.selectcom === 46 && era0(`tequip:${target}:46`) !== 0) {
    if (kojo.灌肠肛塞 === 0) {
      if (assi_mao) {
        await era.printAndWait(`「啊啊啊……肚子，肚子好胀啊啊……好难受！」`);
        if (chara(era_flag.assi).kojo.灌肠肛塞 >= 1) {
          await era.printAndWait(
            `『忍住啊姐姐，一定要忍住忍住再忍住——等到终于忍不住了再突然一次全部排出去，那个感觉可是不输给小穴高潮的哦${heart(1)}』`,
          );
        } else {
          await era.printAndWait(`『忍住啊姐姐，这种感觉要慢慢体验呢……』`);
        }
        await era.printAndWait(
          `${player_name}舔着嘴唇，抚摸着${target_name}胀起的小腹，和塞住肛门的木栓。`,
        );
        await era.printAndWait(`「不，不行了……真的，真的已经不行了！」`);
        await era.printAndWait(`『别说笑话啦姐姐，游戏才刚刚开始呢。』`);
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(`「这，这种……一点都不好玩啦……好，好难受！」`);
          await era.printAndWait(
            `${target_name}开始感受着灌肠液在体内肆虐的痛苦，不过，游戏才刚刚开始，她还得忍上好一会儿呢……`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(`「好，好难受……魔王大人……饶，饶了人家吧……」`);
          await era.printAndWait(
            `${target_name}开始感受着灌肠液在体内肆虐的痛苦，不过，游戏才刚刚开始，她还得忍上好一会儿呢……`,
          );
        } else {
          await era.printAndWait(
            `「肚……肚子好痛……要，要死了……让人家上厕所吧，求你了！」`,
          );
          await era.printAndWait(
            `${target_name}开始感受着灌肠液在体内肆虐的痛苦，不过，游戏才刚刚开始，可不会那么轻易就让她解放啊。`,
          );
        }
      }
      // CFLAG:TARGET:347  = 1（变量语义：CFLAG 族，TARGET:347）
      kojo.灌肠肛塞 = 1;
      return 0;
    } else {
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.灌肠肛塞 <= 6 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「啊……啊啊……肚子，肚子胀鼓鼓的${heart(1)} 嗯啊 ${heart(1)}」`,
          );
          await era.printAndWait(
            `『姐姐也挺厉害的呢，注入了这么多${heart(1)} 肛门夹得紧紧的，其实不用怕啦，这个木塞你自己是挤不出来的！』`,
          );
          await era.printAndWait(
            `「啊……啊啊……肚子${heart(1)} 好像……要坏掉了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}抱着自己胀起的小腹，拼命忍耐着排泄欲，内心却更加兴奋了……`,
          );
          // CFLAG:347  = 7（变量语义：CFLAG 族，347）
          kojo.灌肠肛塞 = 7;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.灌肠肛塞 <= 5 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「${player_name}，不，不可以再注进去了……姐姐……要生气了…！」`,
          );
          await era.printAndWait(
            `『哎呀呀，姐姐这个表情，人家好怕怕哦，不过你是想我突然拔出来，然后全部拉在魔王大人的床上吗♪』`,
          );
          await era.printAndWait(
            `${player_name}恶意地笑着，边玩弄着肛塞，边看着${target_name}拼命忍耐着排泄欲的样子……`,
          );
          // CFLAG:347  = 6（变量语义：CFLAG 族，347）
          kojo.灌肠肛塞 = 6;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.灌肠肛塞 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「呜……呜呜……肚子，肚子明明好难受……可，可是……」`,
          );
          await era.printAndWait(
            `『哎呀呀，姐姐的表情明明很期待呢，这么喜欢公开排泄吗，真的是变态暴露狂呢！那以后和魔王大人羞羞的时候，记得让我在旁边观摩一下啊♪』`,
          );
          await era.printAndWait(`「那……那种事……才，才不要${heart(1)}」`);
          await era.printAndWait(
            `${target_name}光是想象着妹妹描述的场景，就已经面红耳赤，排泄欲更加强烈了，身体却愈发地兴奋……`,
          );
          // CFLAG:347  = 5（变量语义：CFLAG 族，347）
          kojo.灌肠肛塞 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.灌肠肛塞 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「不，不要这样……折磨姐姐了，求你了，${player_name}…啊啊啊！」`,
          );
          await era.printAndWait(
            `『才不是虐待呢，姐姐，这是因为${player_name}喜欢姐姐才会对姐姐这样做呢，换别人我才懒得呢，你看，魔王大人也是这样想的♪』`,
          );
          await era.printAndWait(
            `${player_name}坏笑着，边玩弄着肛塞，欣赏着${target_name}拼命忍耐着排泄欲的样子……`,
          );
          // CFLAG:347  = 4（变量语义：CFLAG 族，347）
          kojo.灌肠肛塞 = 4;
        } else if (
          chara(target).system.肛门感觉 >= 3 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.灌肠肛塞 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `『哎呀呀，灌肠很舒服的嘛，为什么姐姐还要做出苦闷的表情？』`,
          );
          await era.printAndWait(
            `「明，明明很难受啊……以，以后不要这样了可以吗……算姐姐求你了……呜呜」`,
          );
          await era.printAndWait(
            `虽然嘴上这么说着，但是肛门微微的抽搐下，${target_name}却露出了痛苦交杂着享受的表情……`,
          );
          // CFLAG:347  = 3（变量语义：CFLAG 族，347）
          kojo.灌肠肛塞 = 3;
        } else if (kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(
            `『哎呀呀，姐姐满头大汗了，已经充分感觉到灌肠的舒服了呢』`,
          );
          await era.printAndWait(`「呜……呜呜……快，快点让姐姐上厕所吧……」`);
          // CFLAG:347  = 2（变量语义：CFLAG 族，347）
          kojo.灌肠肛塞 = 2;
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.灌肠肛塞 <= 6 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「啊啊！肚子……肚子好胀${heart(1)} 呜？！塞子……太大了啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}在痛苦与快感的交织中摇晃着臀部，肛塞上的铃铛也随之响了起来……`,
          );
          // CFLAG:347  = 7（变量语义：CFLAG 族，347）
          kojo.灌肠肛塞 = 7;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.灌肠肛塞 <= 5 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「魔，魔王大人……这，这种游戏一点……都不有趣啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}开始感受着灌肠液在体内肆虐的痛苦，不过，游戏才刚刚开始，她还得忍上好一会儿呢……`,
          );
          // CFLAG:347  = 6（变量语义：CFLAG 族，347）
          kojo.灌肠肛塞 = 6;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.灌肠肛塞 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「啊啊……肚子好胀……明明好难受……但……但是……为什么……屁股……还会很舒服……呜呜${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}感受着灌肠液在体内的肆虐，不住地呻吟着，然而在震动肛塞刺激下抽搐着的肛门，却不住地传来快感…`,
          );
          // CFLAG:347  = 5（变量语义：CFLAG 族，347）
          kojo.灌肠肛塞 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.灌肠肛塞 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「呜……呜呜……魔，魔王大人……${target_name}已经，已经快要忍不住了………」`,
          );
          await era.printAndWait(
            `${target_name}开始感受着灌肠液在体内肆虐的痛苦，不过，游戏才刚刚开始，她还得忍上好一会儿呢……`,
          );
          // CFLAG:347  = 4（变量语义：CFLAG 族，347）
          kojo.灌肠肛塞 = 4;
        } else if (
          chara(target).system.肛门感觉 >= 3 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.灌肠肛塞 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「啊啊……肚子，肚子好难受……魔王大人………」`);
          await era.printAndWait(
            `${target_name}在露出痛苦表情的同时，肛门却在肛塞刺激下抽搐着，明显是感觉到了快感……`,
          );
          // CFLAG:347  = 3（变量语义：CFLAG 族，347）
          kojo.灌肠肛塞 = 3;
        } else if (kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(`「呜……呜呜……求，求你了，让我上厕所吧…」`);
          await era.printAndWait(
            `${target_name}开始感受着灌肠液在体内肆虐的痛苦，不过，游戏才刚刚开始，她还得忍上好一会儿呢……`,
          );
          // CFLAG:347  = 2（变量语义：CFLAG 族，347）
          kojo.灌肠肛塞 = 2;
        }
      }
      return 0;
    }
  } else if (era_flag.selectcom === 46 && era0(`tequip:${target}:46`) === 0) {
    if (assi_mao) {
      if (era.get(`talent:${target}:76`) === 1) {
        if (
          chara(target).system.肛门感觉 >= 3 &&
          chara(target).system.抖M气质 >= 3
        ) {
          await era.printAndWait(`「出，出来了，全部出来了啊啊啊${heart(1)}」`);
          await era.printAndWait(
            `『嘿嘿，我说过了吧，这样忍到最后一次性全部排出来，很刺激很舒服吧♪？』`,
          );
          await era.printAndWait(
            `排泄完的${target_name}边喘息着，边点头同意着妹妹的话……`,
          );
        } else {
          await era.printAndWait(`「出，出来了，全部出来了啊……呜啊啊！」`);
          await era.printAndWait(
            `${target_name}激烈地排泄着，脸上露出了痛苦和耻辱的表情。`,
          );
          await era.printAndWait(
            `『哎哎，姐姐看上去还不是很习惯啊，那就再来灌一次肠吧，可以吗，魔王大人？』`,
          );
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        if (
          chara(target).system.肛门感觉 >= 3 &&
          chara(target).system.抖M气质 >= 3
        ) {
          await era.printAndWait(
            `「呜呜……呜啊啊啊……这样突然拔掉塞子……全，全部出来了啊啊！」`,
          );
          await era.printAndWait(
            `『哎呀呀，姐姐真应该照照镜子看看自己现在的表情，一脸享受呢，真的有那么舒服吗♪』`,
          );
          await era.printAndWait(
            `${target_name}忍耐到扭曲了的脸一下子松弛了，甚至可以说是享受地喘息着………`,
          );
        } else {
          await era.printAndWait(
            `「${player_name}，魔王大人！不，不要看啊啊！！！」`,
          );
          await era.printAndWait(
            `『太迟了呢姐姐，你排泄时的下流样子已经被我和魔王大人看的清清楚楚了呢』`,
          );
          await era.printAndWait(
            `${target_name}脱力地跪倒在地上，羞耻得泪流满面……`,
          );
        }
      } else {
        if (
          chara(target).system.肛门感觉 >= 3 &&
          chara(target).system.抖M气质 >= 3
        ) {
          await era.printAndWait(
            `「这，这样突然拔掉塞子……会，会忍不住的啊啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}的排泄声，和呻吟娇喘的声音交织在了一起。${player_name}捂着鼻子皱起了眉头。`,
          );
          await era.printAndWait(`『哎呀呀，姐姐这个样子，是想再来一次吗？』`);
        } else {
          await era.printAndWait(`「不，不要看，不要看啊啊啊！」`);
          await era.printAndWait(
            `${target_name}在痛苦的呻吟中排泄了出来。${player_name}捂着鼻子皱起了眉头。`,
          );
          await era.printAndWait(
            `『哎呀，肚子里攒了这么多脏东西啊姐姐，看来还得再来一次呢！』`,
          );
        }
      }
    } else {
      if (era.get(`talent:${target}:76`) === 1) {
        if (
          chara(target).system.肛门感觉 >= 3 &&
          chara(target).system.抖M气质 >= 3
        ) {
          await era.printAndWait(`「出，出来了，全部出来了啊啊啊${heart(1)}」`);
          await era.printAndWait(
            `${target_name}终于从痛苦的忍受中得到了解放，秽物从肛门一泄如注的同时发出了解脱和享受的娇喘。`,
          );
          await era.printAndWait(`「好……好舒服啊啊${heart(1)}」`);
        } else {
          await era.printAndWait(`「出，出来了，全部出来了啊啊啊！」`);
          await era.printAndWait(
            `${target_name}激烈地排泄着，脸上露出了痛苦和耻辱的表情。`,
          );
          await era.printAndWait(`「呼啊……呼啊……好，好累，好难受……」`);
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        if (
          chara(target).system.肛门感觉 >= 3 &&
          chara(target).system.抖M气质 >= 3
        ) {
          await era.printAndWait(
            `「这，这样突然拔掉塞子……会忍不住的啊啊啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}忍耐到扭曲了的脸一下子松弛了，甚至享受地娇喘了起来……`,
          );
          await era.printAndWait(`「啊……啊啊……排泄的感觉……好舒服${heart(1)}」`);
        } else {
          await era.printAndWait(`「不，不要看，不要看啊啊啊……」`);
          await era.printAndWait(
            `被强制当着你的面排泄的${target_name}羞耻地哭泣了起来……`,
          );
        }
      } else {
        if (
          chara(target).system.肛门感觉 >= 3 &&
          chara(target).system.抖M气质 >= 3
        ) {
          await era.printAndWait(
            `「这，这样突然拔掉塞子……会，会忍不住的啊啊啊！！」`,
          );
          await era.printAndWait(
            `${target_name}的排泄声，和呻吟娇喘的声音交织在了一起。`,
          );
        } else {
          await era.printAndWait(`「忍，忍不住了！不要看，不要看啊啊啊！」`);
          await era.printAndWait(`${target_name}在痛苦的呻吟中排泄了出来`);
        }
      }
    }
    return 0;
  }

  // IF SELECTCOM == 55（放置PLAY CFLAG:356）
  if (era_flag.selectcom === 55) {
    if (kojo.放置PLAY === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「哎哎，这就结束了吗？真没劲。」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「为，为什么不继续了呢？」`);
      } else {
        await era.printAndWait(`「不，不要用那种眼神看着人家………」`);
      }

      if (era.get(`tequip:${target}:11`)) {
        await era.printAndWait(
          `${target_name}的蜜穴里，蠕虫一直在躁动个不停，侵犯，刺激着每一处敏感点。`,
        );
      }

      if (era.get(`tequip:${target}:13`)) {
        await era.printAndWait(
          `${target_name}的肛门里，蠕虫一直在躁动个不停，侵犯，刺激着敏感的直肠。`,
        );
      }

      if (era.get(`tequip:${target}:19`)) {
        await era.printAndWait(
          `${target_name}肛门里的珠串慢慢地震动了起来，刺激着敏感的直肠。`,
        );
      }

      if (era.get(`tequip:${target}:14`)) {
        await era.printAndWait(
          `${target_name}的阴蒂被电动阴蒂夹持续刺激着，已经有些红肿。`,
        );
      }

      if (era.get(`tequip:${target}:15`)) {
        await era.printAndWait(
          `${target_name}的乳头被电动夹子持续刺激着，已经有些红肿。`,
        );
      }

      if (era.get(`tequip:${target}:16`)) {
        await era.print(`${target_name}被榨乳机持续榨取着母乳。`);
      }

      if (era.get(`tequip:${target}:17`)) {
        await era.printAndWait(
          `${target_name}的阴茎还在被电动飞机杯持续摩擦刺激着，只能拼命忍耐着射精的欲望。`,
        );
      }

      if (era.get(`tequip:${target}:43`)) {
        await era.printAndWait(`${target_name}眼前依旧漆黑一片。`);
      }

      if (era.get(`tequip:${target}:44`)) {
        await era.printAndWait(
          `${target_name}的身体依旧被紧紧束缚着，动弹不得。`,
        );
      }

      if (era.get(`tequip:${target}:46`)) {
        await era.printAndWait(
          `${target_name}的肚子里，灌肠液依旧在肆虐着，只能拼命忍耐着排泄的欲望，但是还是有一丝丝液体从肛塞边缘漏出`,
        );
      }

      if (era.get(`tequip:${target}:49`)) {
        await era.printAndWait(
          `${target_name}肛门里的电极还在传递着微微的电流，刺激得括约肌一阵阵抽搐。`,
        );
      }

      if (era.get(`tequip:${target}:53`)) {
        await era.printAndWait(`水晶球忠实的记录下${target_name}此刻的身姿……`);
      }
      // CFLAG:356  = 1（变量语义：CFLAG 族，356）
      kojo.放置PLAY = 1;
      return 0;
    } else {
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).train.欲情 >= era0('palamlv:3') &&
          (kojo.放置PLAY <= 5 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `『哎呀呀，姐姐，被放置play的感觉如何，想要的话就大声说出来呀♪』`,
          );
          await era.printAndWait(
            `${target_name}体内的欲火被妹妹燎拨着，燃烧得更旺了……`,
          );
          // CFLAG:356  = 6（变量语义：CFLAG 族，356）
          kojo.放置PLAY = 6;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.放置PLAY <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `『哼哼哼，那样的表情，姐姐等得受不了了吗？』`,
          );
          // CFLAG:356  = 5（变量语义：CFLAG 族，356）
          kojo.放置PLAY = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).train.欲情 >= era0('palamlv:3') &&
          (kojo.放置PLAY <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「不，不要那样让姐姐……等着了……${heart(1)}」`);
          await era.printAndWait(
            `${target_name}体内的欲火被妹妹用眼神和语言燎拨着，燃烧得更旺了……`,
          );
          // CFLAG:356  = 4（变量语义：CFLAG 族，356）
          kojo.放置PLAY = 4;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.放置PLAY <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `『不，不要用那样的眼神看姐姐啦，${player_name}………』`,
          );
          // CFLAG:356  = 3（变量语义：CFLAG 族，356）
          kojo.放置PLAY = 3;
        } else if (kojo.放置PLAY <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(`『哎呀，别用那样的眼神瞪我嘛……』`);
          // CFLAG:356  = 2（变量语义：CFLAG 族，356）
          kojo.放置PLAY = 2;
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).train.欲情 >= era0('palamlv:3') &&
          (kojo.放置PLAY <= 5 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「魔，魔王大人真是坏心眼…${heart(1)} 这么把人家……晾在一边……${heart(1)}」`,
          );
          await era.printAndWait(
            `欲火难耐的${target_name}焦躁地摇摆着身体，诱惑着${player_name}，渴求着调教和侵犯……`,
          );
          // CFLAG:356  = 6（变量语义：CFLAG 族，356）
          kojo.放置PLAY = 6;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.放置PLAY <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「啊……啊……不，不会就这么结束了吧？」`);
          // CFLAG:356  = 5（变量语义：CFLAG 族，356）
          kojo.放置PLAY = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).train.欲情 >= era0('palamlv:3') &&
          (kojo.放置PLAY <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「不可以急躁，不可以急躁……」`);
          await era.printAndWait(
            `欲火难耐的${target_name}不断地自言自语着，然而渴望的视线却一直投向${player_name}……`,
          );
          // CFLAG:356  = 4（变量语义：CFLAG 族，356）
          kojo.放置PLAY = 4;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.放置PLAY <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「唔……我，我会……乖乖的……」`);
          // CFLAG:356  = 3（变量语义：CFLAG 族，356）
          kojo.放置PLAY = 3;
        } else if (kojo.放置PLAY <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(`「别，别用那样的眼神看人家……」`);
          // CFLAG:356  = 2（变量语义：CFLAG 族，356）
          kojo.放置PLAY = 2;
        }
      }

      if (era.get(`tequip:${target}:11`)) {
        await era.printAndWait(
          `${target_name}的蜜穴里，蠕虫一直在躁动个不停，侵犯，刺激着每一处敏感点。`,
        );
      }

      if (era.get(`tequip:${target}:13`)) {
        await era.printAndWait(
          `${target_name}的肛门里，蠕虫一直在躁动个不停，侵犯，刺激着敏感的直肠。`,
        );
      }

      if (era.get(`tequip:${target}:19`)) {
        await era.printAndWait(
          `${target_name}肛门里的珠串慢慢地震动了起来，刺激着敏感的直肠。`,
        );
      }

      if (era.get(`tequip:${target}:14`)) {
        await era.printAndWait(
          `${target_name}的阴蒂被电动阴蒂夹持续刺激着，已经有些红肿。`,
        );
      }

      if (era.get(`tequip:${target}:15`)) {
        await era.printAndWait(
          `${target_name}的乳头被电动夹子持续刺激着，已经有些红肿。`,
        );
      }

      if (era.get(`tequip:${target}:16`)) {
        await era.print(`${target_name}被榨乳机持续榨取着母乳。`);
      }

      if (era.get(`tequip:${target}:17`)) {
        await era.printAndWait(
          `${target_name}的阴茎还在被电动飞机杯持续摩擦刺激着，只能拼命忍耐着射精的欲望。`,
        );
      }

      if (era.get(`tequip:${target}:43`)) {
        await era.printAndWait(`${target_name}眼前依旧漆黑一片。`);
      }

      if (era.get(`tequip:${target}:44`)) {
        await era.printAndWait(
          `${target_name}的身体依旧被紧紧束缚着，动弹不得。`,
        );
      }

      if (era.get(`tequip:${target}:46`)) {
        await era.printAndWait(
          `${target_name}的肚子里，灌肠液依旧在肆虐着，只能拼命忍耐着排泄的欲望，但是还是有一丝丝液体从肛塞边缘漏出`,
        );
      }

      if (era.get(`tequip:${target}:49`)) {
        await era.printAndWait(
          `${target_name}肛门里的电极还在传递着微微的电流，刺激得括约肌一阵阵抽搐。`,
        );
      }

      if (era.get(`tequip:${target}:53`)) {
        await era.printAndWait(`水晶球忠实的记录下${target_name}此刻的身姿……`);
      }
      return 0;
    }
  }

  // IF SELECTCOM == 56（交谈 CFLAG:357）
  if (era_flag.selectcom === 56) {
    if (kojo.交谈 === 0) {
      if (era.get(`tequip:${target}:53`) === 1) {
        await era.print(
          `在${player_name}的命令下，${target_name}进行了自我介绍、`,
        );
        if (
          era.get(`talent:${target}:89`) ||
          chara(target).system.露出癖 >= 5
        ) {
          // 原作是一整行：无后缀 PRINTFORM 不换行，
          // 是 SIF 的插入段，末行 PRINTFORML 才收行（#623）
          const masturbation_talk = chara(target).train.自慰中毒 >= 3;
          await era.print(
            `${target_name}介绍了自己的名字和迄今为止的性经验` +
              (masturbation_talk
                ? '、自慰的时候幻想的内容和对象也说出来了'
                : '') +
              `说得自己都兴奋起来了……`,
          );
          await era.print(
            `似乎在期待着被全村的人看到自己现在的样子，股间也开始湿润了……`,
          );
          await era.printAndWait(
            `「啊啊……我，我最喜欢在魔王大人的视线下自慰了……那样特别有感觉${heart(1)} 自慰的时候……我会想着叔父和他的小儿子……想着被他们一起侵犯${heart(1)}」`,
          );
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (
          chara(target).train.欲情 >= era0('palamlv:4') &&
          (era.get(`talent:${target}:76`) || chara(target).system.欲望 >= 5)
        ) {
          await era.print(`${target_name}开始对着水晶球说着不知廉耻的话。`);
          await era.printAndWait(
            `「我……${target_name}是魔王大人的性奴，每天都在渴望着魔王大人的调教和侵犯……♪」`,
          );
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`talent:${target}:85`) ||
          chara(target).system.顺从 >= 3 ||
          chara(target).system.欲望 >= 4 ||
          chara(target).system.露出癖 >= 2
        ) {
          await era.print(`${target_name}向水晶球勉为其难地介绍着自己`);
          await era.printAndWait(
            `我……我是住在通往魔王宫殿的洞窟附近的村女……名叫${target_name}……」`,
          );
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else {
          await era.printAndWait(
            `${target_name}瞪视着水晶球，一副极不情愿的样子。`,
          );
          await era.printAndWait(`「我，我的名字是……」`);
          await era.printAndWait(
            `还没有说完，就抿着嘴沉默了，看来还需要继续调教……`,
          );
        }
      } else {
        if (assi_mao) {
          // 原作是一整行：:6865 的 PRINTFORM 不换行，六支的
          // PRINTFORML 各自收行。前缀提到语句外共用——各支语句只列本支行号，
          // 前缀留在里面会被保真锁 C 当成多出来的插值记号（#623）
          const faced_first =
            chara(target).train.欲情 >= era0('palamlv:4') &&
            (era.get(`talent:${target}:85`) ||
              chara(target).system.顺从 >= 5) &&
            game.event.插着不拔;
          const line_head = `面对${player_name}`;
          if (faced_first) {
            await era.print(
              line_head +
                `的语言调戏、${target_name}扭着腰，边自慰边发出一声声享受的娇喘。`,
            );
            await era.printAndWait(
              `「呜……呜啊啊……好，好舒服${heart(1)} 姐姐……这么淫乱……真是对不起呢……！」`,
            );
          } else if (
            chara(target).train.欲情 >= era0('palamlv:4') &&
            (era.get(`talent:${target}:76`) ||
              chara(target).system.欲望 >= 5) &&
            game.event.插着不拔
          ) {
            await era.print(
              line_head +
                `边侵犯边用语言调戏、${target_name}弯着腰，不顾廉耻地边娇喘边大声说着`,
            );
            await era.printAndWait(
              `「嗯啊……啊啊……我，我正在，正在被妹妹看着自慰${heart(1)} 但是……但是好舒服……${heart(1)} …要，要去了啊啊${heart(1)}」`,
            );
          } else if (
            (era0(`palam:${target}:4`) >= era0('palamlv:4') ||
              chara(target).system.顺从 >= 5 ||
              era.get(`talent:${target}:76`) ||
              era.get(`talent:${target}:85`)) &&
            chara(target).train.欲情 >= era0('palamlv:4')
          ) {
            // 原作是一整行：无后缀 PRINTFORM 链，
            // 是两个互斥插入段（:6874/:6876 的 IF/ELSEIF，
            // 收支），:6879 的 PRINTFORML 收行（#623）
            const excited =
              era.get(`tequip:${target}:11`) ||
              era.get(`tequip:${target}:13`) ||
              era.get(`tequip:${target}:14`) ||
              era.get(`tequip:${target}:15`) ||
              era.get(`tequip:${target}:16`) ||
              era.get(`tequip:${target}:17`);
            const painful =
              era.get(`tequip:${target}:44`) || era.get(`tequip:${target}:49`);
            await era.print(
              line_head +
                `的语言调戏，${target_name}` +
                (excited ? '却乐在其中' : painful ? '无比痛苦' : '') +
                `地回应着。`,
            );
            await era.printAndWait(`「不，不要再，再对姐姐恶作剧了」`);
          } else if (
            era0(`palam:${target}:4`) >= era0('palamlv:4') ||
            era.get(`talent:${target}:85`) ||
            chara(target).system.顺从 >= 5
          ) {
            await era.print(
              line_head +
                `的语言调戏、${target_name}一点也不生气，看来姐妹关系已经很融洽了。`,
            );
            await era.printAndWait(
              `「只，只要能和${player_name}在一起，即使是做魔王大人的性奴，姐姐也很高兴！」`,
            );
          } else if (
            era0(`palam:${target}:4`) >= era0('palamlv:2') ||
            chara(target).system.顺从 >= 3
          ) {
            await era.print(
              line_head + `的语言调戏、${target_name}小声地回答着`,
            );
            await era.printAndWait(
              `「不，不要说这些了……和，和姐姐一起回家吧……好吗？」`,
            );
          } else {
            await era.print(
              line_head + `的语言羞辱，${target_name}只是红着脸，低着头听着…`,
            );
            await era.printAndWait(`「为，为什么……会变成这个样子…」`);
            await era.printAndWait(`「对不起……${player_name}…真的对不起…」`);
          }
        } else {
          // 与上面 :6865+:6867 同型：六支的 PRINTFORML 各自收行，
          // 前缀提到语句外共用（#623）
          const faced_first =
            chara(target).train.欲情 >= era0('palamlv:4') &&
            (era.get(`talent:${target}:85`) ||
              chara(target).system.顺从 >= 5) &&
            game.event.插着不拔;
          const line_head = `${player_name}`;
          if (faced_first) {
            await era.print(
              line_head +
                `的语言挑逗、${target_name}扭着腰，边自慰边诉说着对你的爱慕。`,
            );
            await era.printAndWait(
              `「魔，魔王大人……${heart(1)} 你，你是我的全部……嗯啊${heart(1)} 啊啊啊${heart(1)} 我的身体……全部是属于大人的啊啊啊${heart(1)}`,
            );
          } else if (
            chara(target).train.欲情 >= era0('palamlv:4') &&
            (era.get(`talent:${target}:76`) ||
              chara(target).system.欲望 >= 5) &&
            game.event.插着不拔
          ) {
            await era.print(
              line_head +
                `的语言挑逗、${target_name}弯着腰，不顾廉耻地边娇喘边大声说着`,
            );
            await era.printAndWait(
              `「嗯啊……啊啊${heart(1)} 好舒服……${heart(1)} 最，最喜欢……这样被魔王大人${heart(1)} 看着……自慰了${heart(1)} 啊啊啊${heart(1)}」`,
            );
          } else if (
            (era0(`palam:${target}:4`) >= era0('palamlv:4') ||
              chara(target).system.顺从 >= 5 ||
              era.get(`talent:${target}:76`) ||
              era.get(`talent:${target}:85`)) &&
            chara(target).train.欲情 >= era0('palamlv:4')
          ) {
            // 原作是一整行：无后缀 PRINTFORM 链，
            // 是两个互斥插入段（:6902/:6904 的 IF/ELSEIF，
            // 收支），:6907 的 PRINTFORML 收行（#623）
            const excited =
              era.get(`tequip:${target}:11`) ||
              era.get(`tequip:${target}:13`) ||
              era.get(`tequip:${target}:14`) ||
              era.get(`tequip:${target}:15`) ||
              era.get(`tequip:${target}:16`) ||
              era.get(`tequip:${target}:17`);
            const painful =
              era.get(`tequip:${target}:44`) || era.get(`tequip:${target}:49`);
            await era.print(
              line_head +
                `的语言调戏，${target_name}` +
                (excited ? '乐在其中' : painful ? '无比痛苦' : '') +
                `地努力回答着`,
            );
            await era.printAndWait(
              `「呜啊啊！人，人家没关系的……请，请魔王大人……随意调教！」`,
            );
          } else if (
            era0(`palam:${target}:4`) >= era0('palamlv:4') ||
            era.get(`talent:${target}:85`) ||
            chara(target).system.顺从 >= 5
          ) {
            await era.print(
              line_head + `的语言挑逗、${target_name}有些害羞地应答着`,
            );
            await era.printAndWait(
              `「请，请魔王大人……随意调教${target_name}」`,
            );
          } else if (
            era0(`palam:${target}:4`) >= era0('palamlv:2') ||
            chara(target).system.顺从 >= 3
          ) {
            await era.print(
              line_head + `的语言挑逗、${target_name}结结巴巴地回答着`,
            );
            await era.printAndWait(`「应，应该回答什么…？」`);
          } else {
            await era.print(
              line_head + `的语言挑逗、${target_name}听清楚了吗…`,
            );
            await era.printAndWait(`「…不，不太想说话…」`);
          }
        }
      }
      // CFLAG:357  = 1（变量语义：CFLAG 族，357）
      kojo.交谈 = 1;
      return 0;
    } else {
      if (era.get(`tequip:${target}:53`) === 1) {
        await era.print(
          `在${player_name}的命令下，${target_name}进行了自我介绍、`,
        );
        if (
          era.get(`talent:${target}:89`) ||
          chara(target).system.露出癖 >= 5
        ) {
          // 与初回 :6842+:6844+:6845 同型（#623）
          const masturbation_talk = chara(target).train.自慰中毒 >= 3;
          await era.print(
            `${target_name}介绍了自己的名字和迄今为止的性经验` +
              (masturbation_talk
                ? '、自慰的时候幻想的内容和对象也说出来了'
                : '') +
              `说得自己都兴奋起来了……`,
          );
          await era.print(
            `似乎在期待着被全村的人看到自己现在的样子，股间也开始湿润了……`,
          );
          await era.printAndWait(
            `「啊啊……我，我最喜欢在魔王大人的视线下自慰了……那样特别有感觉${heart(1)} 自慰的时候……我会想着叔父和他的小儿子……想着被他们一起侵犯${heart(1)}」`,
          );
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (
          chara(target).train.欲情 >= era0('palamlv:4') &&
          (era.get(`talent:${target}:76`) || chara(target).system.欲望 >= 5)
        ) {
          await era.print(`${target_name}开始对着水晶球说着不知廉耻的话。`);
          await era.printAndWait(
            `「我……${target_name}是魔王大人的性奴，每天都在渴望着魔王大人的调教和侵犯……♪」`,
          );
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`talent:${target}:85`) ||
          chara(target).system.顺从 >= 3 ||
          chara(target).system.欲望 >= 4 ||
          chara(target).system.露出癖 >= 2
        ) {
          await era.print(`${target_name}向水晶球勉为其难地介绍着自己`);
          await era.printAndWait(
            `我……我是住在通往魔王宫殿的洞窟附近的村女……名叫${target_name}……」`,
          );
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else {
          await era.printAndWait(
            `${target_name}瞪视着水晶球，一副极不情愿的样子。`,
          );
          await era.printAndWait(`「我，我的名字是……」`);
          await era.printAndWait(
            `还没有说完，就抿着嘴沉默了，看来还需要继续调教……`,
          );
        }
      } else {
        if (assi_mao) {
          // 与初回 :6865+:6867 同型：六支的 PRINTFORML 各自收行，
          // 前缀提到语句外共用（#623）
          const faced_first =
            chara(target).train.欲情 >= era0('palamlv:4') &&
            (era.get(`talent:${target}:85`) ||
              chara(target).system.顺从 >= 5) &&
            game.event.插着不拔;
          const line_head = `面对${player_name}`;
          if (faced_first) {
            await era.print(
              line_head +
                `的语言调戏、${target_name}扭着腰，边自慰边发出一声声享受的娇喘。`,
            );
            await era.printAndWait(
              `「呜……呜啊啊……好，好舒服${heart(1)} 姐姐……这么淫乱……真是对不起呢……！」`,
            );
          } else if (
            chara(target).train.欲情 >= era0('palamlv:4') &&
            (era.get(`talent:${target}:76`) ||
              chara(target).system.欲望 >= 5) &&
            game.event.插着不拔
          ) {
            await era.print(
              line_head +
                `的语言调戏、${target_name}弯着腰，不顾廉耻地边娇喘边大声说着`,
            );
            await era.printAndWait(
              `「嗯啊……啊啊……我，我正在，正在被妹妹看着自慰${heart(1)} 但是……但是好舒服……${heart(1)} …要，要去了啊啊${heart(1)}」`,
            );
          } else if (
            (era0(`palam:${target}:4`) >= era0('palamlv:4') ||
              chara(target).system.顺从 >= 5 ||
              era.get(`talent:${target}:76`) ||
              era.get(`talent:${target}:85`)) &&
            chara(target).train.欲情 >= era0('palamlv:4')
          ) {
            // 原作是一整行（与 :6873.. 同型，
            // 插入段到 :6964-6965 收支，#623）
            const excited =
              era.get(`tequip:${target}:11`) ||
              era.get(`tequip:${target}:13`) ||
              era.get(`tequip:${target}:14`) ||
              era.get(`tequip:${target}:15`) ||
              era.get(`tequip:${target}:16`) ||
              era.get(`tequip:${target}:17`);
            const painful =
              era.get(`tequip:${target}:44`) || era.get(`tequip:${target}:49`);
            await era.print(
              line_head +
                `的语言调戏，${target_name}` +
                (excited ? '害羞' : painful ? '无比痛苦' : '') +
                `地回应着`,
            );
            await era.printAndWait(`「不，不要再，再对姐姐恶作剧了」`);
          } else if (
            era0(`palam:${target}:4`) >= era0('palamlv:4') ||
            era.get(`talent:${target}:85`) ||
            chara(target).system.顺从 >= 5
          ) {
            await era.print(
              line_head +
                `的语言调戏、${target_name}一点也不生气，看来姐妹关系已经很融洽了。`,
            );
            await era.printAndWait(
              `「只，只要能和${player_name}在一起，即使是做魔王大人的性奴，姐姐也很高兴！」`,
            );
          } else if (
            era0(`palam:${target}:4`) >= era0('palamlv:2') ||
            chara(target).system.顺从 >= 3
          ) {
            await era.print(
              line_head + `的语言调戏、${target_name}小声地回答着`,
            );
            await era.printAndWait(
              `「不，不要说这些了……和，和姐姐一起回家吧……好吗？」`,
            );
          } else {
            await era.print(
              line_head + `的语言羞辱，${target_name}只是红着脸，低着头听着…`,
            );
            await era.printAndWait(`「为，为什么……会变成这个样子…」`);
            await era.printAndWait(`「对不起……${player_name}…真的对不起…」`);
          }
        } else {
          // 与 :6952+:6954 同型：六支的 PRINTFORML 各自收行，
          // 前缀提到语句外共用（#623）
          const faced_first =
            chara(target).train.欲情 >= era0('palamlv:4') &&
            (era.get(`talent:${target}:85`) ||
              chara(target).system.顺从 >= 5) &&
            game.event.插着不拔;
          const line_head = `面对${player_name}`;
          if (faced_first) {
            await era.print(
              line_head +
                `的语言挑逗、${target_name}扭着腰，边自慰边诉说着对你的爱慕。`,
            );
            await era.printAndWait(
              `「魔，魔王大人……${heart(1)} 你，你是我的全部……嗯啊${heart(1)} 啊啊啊${heart(1)} 我的身体……全部是属于大人的啊啊啊${heart(1)}`,
            );
          } else if (
            chara(target).train.欲情 >= era0('palamlv:4') &&
            (era.get(`talent:${target}:76`) ||
              chara(target).system.欲望 >= 5) &&
            game.event.插着不拔
          ) {
            await era.print(
              line_head +
                `的语言挑逗、${target_name}弯着腰，不顾廉耻地边娇喘边大声说着`,
            );
            await era.printAndWait(
              `「嗯啊……啊啊${heart(1)} 好舒服……${heart(1)} 最，最喜欢……这样被魔王大人${heart(1)} 看着……自慰了${heart(1)} 啊啊啊${heart(1)}」`,
            );
          } else if (
            (era0(`palam:${target}:4`) >= era0('palamlv:4') ||
              chara(target).system.顺从 >= 5 ||
              era.get(`talent:${target}:76`) ||
              era.get(`talent:${target}:85`)) &&
            chara(target).train.欲情 >= era0('palamlv:4')
          ) {
            // 原作是一整行（与 :6960.. 同型，
            // 插入段到 :6992-6993 收支，#623）
            const excited =
              era.get(`tequip:${target}:11`) ||
              era.get(`tequip:${target}:13`) ||
              era.get(`tequip:${target}:14`) ||
              era.get(`tequip:${target}:15`) ||
              era.get(`tequip:${target}:16`) ||
              era.get(`tequip:${target}:17`);
            const painful =
              era.get(`tequip:${target}:44`) || era.get(`tequip:${target}:49`);
            await era.print(
              line_head +
                `的语言调戏，${target_name}` +
                (excited ? '乐在其中' : painful ? '无比痛苦' : '') +
                `地努力回答着`,
            );
            await era.printAndWait(
              `「呜啊啊！人，人家没关系的……请，请魔王大人……随意调教！」`,
            );
          } else if (
            era0(`palam:${target}:4`) >= era0('palamlv:4') ||
            era.get(`talent:${target}:85`) ||
            chara(target).system.顺从 >= 5
          ) {
            await era.print(
              line_head + `的语言挑逗、${target_name}有些害羞地应答着`,
            );
            await era.printAndWait(
              `「请，请魔王大人……随意调教${target_name}」`,
            );
          } else if (
            era0(`palam:${target}:4`) >= era0('palamlv:2') ||
            chara(target).system.顺从 >= 3
          ) {
            await era.print(
              line_head + `的语言挑逗、${target_name}结结巴巴地回答着`,
            );
            await era.printAndWait(`「应，应该回答什么…？」`);
          } else {
            await era.print(
              line_head + `的语言挑逗、${target_name}听清楚了吗…`,
            );
            await era.printAndWait(`「…不，不太想说话…」`);
          }
        }
      }
      return 0;
    }
  }

  // IF SELECTCOM == 63（贝合 CFLAG:364）
  if (era_flag.selectcom === 63) {
    if (kojo.六九式 === 0) {
      if (assi_mao) {
        await era.printAndWait(
          `『啊啊……这样好舒服啊啊……姐姐${heart(1)} 姐姐${heart(1)}』`,
        );
        await era.printAndWait(
          `${player_name}和${target_name}岔开双腿，紧贴着彼此的下体摩擦着，爱液不断地从两人的交合处流出。`,
        );

        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「是……是啊……真的很舒服啊啊……已，已经……要去了啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}也显得十分兴奋，继续和${player_name}用蜜穴和阴蒂相互摩擦着……`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「好，好害羞啦……但是，但是……真的……好舒服啊啊${heart(1)}！」`,
          );
          await era.printAndWait(
            `虽然满脸通红地摇着头，但是面对${player_name}更起劲的摩擦着，${target_name}也忍不住娇喘了起来……`,
          );
        } else {
          await era.printAndWait(
            `「不，不可以这样做啊，${player_name}！ 快放开我啊！！」`,
          );
          await era.printAndWait(
            `与妹妹的性器相互摩擦的背德感让${target_name}无比内疚，却怎么也逃不脱${player_name}的手掌心……`,
          );
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `${player_name}和${target_name}岔开双腿，紧贴着彼此的下体摩擦着，爱液不断地从两人的交合处流出。`,
          );
          await era.printAndWait(
            `「嗯啊……啊啊${heart(1)} 好……好舒服……${heart(1)} 和魔王大人……百合……真是太舒服了啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}尽情的娇喘着，享受着和${player_name}蜜穴相互摩擦的极度快感……`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `${player_name}和${target_name}岔开双腿，紧贴着彼此的下体摩擦着，爱液不断地从两人的交合处流出。`,
          );
          await era.printAndWait(
            `「啊啊……这样的姿势……好，好害羞……不过好舒服啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}完全沉浸在与${player_name}用下体相互摩擦的快感之中，发出了甘甜的娇喘。`,
          );
        } else {
          await era.printAndWait(
            `${player_name}强行分开${target_name}的双腿，紧贴着彼此的下体摩擦起来，爱液不断地从两人的交合处流出。`,
          );
          await era.printAndWait(`「放，放开我……这样……这样好脏的……呜呜呜！」`);
          await era.printAndWait(
            `无力抵抗的${target_name}只能边抽噎边忍受着……`,
          );
        }
      }
      // CFLAG:TARGET:364  = 1（变量语义：CFLAG 族，TARGET:364）
      kojo.六九式 = 1;
      return 0;
    } else {
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).chara.百合气质 >= 5 &&
          (kojo.六九式 <= 8 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `${player_name}和${target_name}岔开双腿，彼此的下体如同接吻一样紧贴着，借着爱液的润滑相互摩擦着。`,
          );
          await era.printAndWait(
            `『呜哇，姐姐你动得比我还激烈啊${heart(1)} 啊啊……好舒服${heart(1)} 嗯啊啊${heart(1)}』`,
          );
          await era.printAndWait(
            `「我，我也很舒服啊啊${heart(1)} 和${player_name}姐妹百合……真的是太舒服了${heart(1)} 嗯啊啊……要，要去了啊啊${heart(1)} 」`,
          );
          await era.printAndWait(
            `两人摇着腰肢，尽情享受着姐妹百合之爱，娇喘声连绵不绝。`,
          );
          // CFLAG:TARGET:364  = 9（变量语义：CFLAG 族，TARGET:364）
          kojo.六九式 = 9;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).chara.百合气质 >= 3 &&
          (kojo.六九式 <= 7 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `${player_name}和${target_name}岔开双腿，彼此的下体如同接吻一样紧贴着，借着爱液的润滑相互摩擦着。`,
          );
          await era.printAndWait(
            `『嗯啊……姐姐这样舒服吗${heart(1)} 我可是很舒服呢……啊啊啊${heart(1)}』`,
          );
          await era.printAndWait(
            `「是，是啊…姐姐……也很兴奋${heart(1)} 很舒服啊啊${heart(1)} 」`,
          );
          await era.printAndWait(`两人摇着腰肢，享受着姐妹百合之爱`);
          // CFLAG:TARGET:364  = 8（变量语义：CFLAG 族，TARGET:364）
          kojo.六九式 = 8;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.六九式 <= 6 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `${player_name}强行分开${target_name}的双腿，紧贴着彼此的下体摩擦起来，爱液不断地从两人的交合处流出。`,
          );
          await era.printAndWait(`『怎么样，这样很舒服吧，姐姐！嗯啊啊……』`);
          await era.printAndWait(
            `「怎，怎么这样啦${heart(1)} 好，好害羞……姐妹做这样的事！」`,
          );
          await era.printAndWait(
            `虽然嘴上这么说，但是${target_name}还是逐渐兴奋了起来，享受着和${player_name}摩擦下体的快感……`,
          );
          // CFLAG:TARGET:364  = 7（变量语义：CFLAG 族，TARGET:364）
          kojo.六九式 = 7;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).chara.百合气质 >= 5 &&
          (kojo.六九式 <= 5 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `${player_name}和${target_name}岔开双腿，彼此的下体如同接吻一样紧贴着，借着爱液的润滑相互摩擦着。`,
          );
          await era.printAndWait(
            `『呜哇，姐姐你动得比我还激烈啊${heart(1)} 啊啊……好舒服${heart(1)} 嗯啊啊${heart(1)}』`,
          );
          await era.printAndWait(
            `「是……是啊，能和我最心爱的${player_name}百合……真的是太幸福……太舒服了${heart(1)}」`,
          );
          await era.printAndWait(
            `两人摇着腰肢，尽情享受着姐妹百合之爱，娇喘声连绵不绝。`,
          );
          // CFLAG:TARGET:364  = 6（变量语义：CFLAG 族，TARGET:364）
          kojo.六九式 = 6;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).chara.百合气质 >= 3 &&
          (kojo.六九式 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `${player_name}和${target_name}岔开双腿，彼此的下体如同接吻一样紧贴着，借着爱液的润滑相互摩擦着。`,
          );
          await era.printAndWait(
            `『嗯啊……姐姐这样舒服吗${heart(1)} 我可是很舒服呢……啊啊啊${heart(1)}』`,
          );
          await era.printAndWait(`「是的……我也……我也……${heart(1)}」`);
          await era.printAndWait(
            `${target_name}满脸通红地享受着和妹妹的百合之爱……`,
          );
          // CFLAG:TARGET:364  = 5（变量语义：CFLAG 族，TARGET:364）
          kojo.六九式 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.六九式 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `${player_name}强行分开${target_name}的双腿，紧贴着彼此的下体摩擦起来，爱液不断地从两人的交合处流出。`,
          );
          await era.printAndWait(`『怎么样，这样很舒服吧，姐姐！嗯啊啊……！』`);
          await era.printAndWait(
            `「不，不要啦……姐妹……怎么可以做这种事……而且魔王大人……还在看着呢！」`,
          );
          await era.printAndWait(
            `虽然嘴上这么说者，而且脸也红到了耳根，但是相互摩擦着的蜜穴传来的快感还是让${player_name}忍不住娇喘了起来`,
          );
          // CFLAG:TARGET:364  = 4（变量语义：CFLAG 族，TARGET:364）
          kojo.六九式 = 4;
        } else if (
          chara(target).chara.百合气质 >= 3 &&
          (kojo.六九式 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `${player_name}和${target_name}岔开双腿，彼此的下体如同接吻一样紧贴着，借着爱液的润滑相互摩擦着。`,
          );
          await era.printAndWait(`『怎么样，这样很舒服吧，姐姐！嗯啊啊……！』`);
          await era.printAndWait(`「不要啊，不可以这样……但，但是……好舒服！」`);
          await era.printAndWait(
            `随着${player_name}晃动着腰肢，${target_name}被摩擦着的蜜穴逐渐传来了难以忍耐的快感……`,
          );
          // CFLAG:TARGET:364  = 3（变量语义：CFLAG 族，TARGET:364）
          kojo.六九式 = 3;
        } else if (kojo.六九式 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(
            `${player_name}强行分开${target_name}的双腿，紧贴着彼此的下体摩擦起来，爱液不断地从两人的交合处流出。`,
          );
          await era.printAndWait(
            `『这样明明最舒服了，为什么姐姐还要做出讨厌的表情呢！』`,
          );
          await era.printAndWait(
            `「一，一点都不舒服……快放开……我们，我们是姐妹啊……不可以……呜呜呜！」」`,
          );
          // CFLAG:TARGET:364  = 2（变量语义：CFLAG 族，TARGET:364）
          kojo.六九式 = 2;
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).chara.百合气质 >= 5 &&
          (kojo.六九式 <= 8 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `${player_name}和${target_name}岔开双腿，彼此的下体如同接吻一样紧贴着，借着爱液的润滑相互摩擦着敏感的蜜穴和阴蒂。`,
          );
          await era.printAndWait(
            `「嗯啊……啊啊${heart(1)} 好舒服${heart(1)} 和魔王大人……百合${heart(1)} 真的是太棒了啊啊啊${heart(1)} 」`,
          );
          await era.printAndWait(
            `${target_name}尽情扭动着腰身，享受着百合之乐……`,
          );
          // CFLAG:TARGET:364  = 9（变量语义：CFLAG 族，TARGET:364）
          kojo.六九式 = 9;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).chara.百合气质 >= 3 &&
          (kojo.六九式 <= 7 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `${player_name}和${target_name}岔开双腿，彼此的下体如同接吻一样紧贴着，借着爱液的润滑相互摩擦着蜜穴和阴蒂。`,
          );
          await era.printAndWait(
            `「哈啊……哈啊……魔王大人${heart(1)}让人家……当你的百合性奴吧${heart(1)} 嗯啊……啊啊${heart(1)} 」`,
          );
          await era.printAndWait(
            `${target_name}与${player_name}继续扭动着腰身，寻求着更多的快感。`,
          );
          // CFLAG:TARGET:364  = 8（变量语义：CFLAG 族，TARGET:364）
          kojo.六九式 = 8;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.六九式 <= 6 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `${player_name}和${target_name}岔开双腿，彼此的下体紧贴着，相互摩擦着蜜穴和阴蒂，爱液不住的流出。`,
          );
          await era.printAndWait(
            `「嗯啊……啊啊${heart(1)} 好舒服……${heart(1)} 原来……百合……是这么舒服的事情${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}娇喘着，享受着蜜穴被摩擦传来的阵阵快感……`,
          );
          // CFLAG:TARGET:364  = 7（变量语义：CFLAG 族，TARGET:364）
          kojo.六九式 = 7;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).chara.百合气质 >= 5 &&
          (kojo.六九式 <= 5 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `${player_name}和${target_name}岔开双腿，彼此的下体如同接吻一样紧贴着，借着爱液的润滑相互摩擦着敏感的蜜穴和阴蒂。`,
          );
          await era.printAndWait(
            `「呜啊……啊啊${heart(1)} 魔王大人……让，让${target_name}永远当你的百合性奴吧……${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}尽情扭动着腰身，享受着百合之乐……`,
          );
          // CFLAG:TARGET:364  = 6（变量语义：CFLAG 族，TARGET:364）
          kojo.六九式 = 6;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).chara.百合气质 >= 3 &&
          (kojo.六九式 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `${player_name}和${target_name}岔开双腿，彼此的下体如同接吻一样紧贴着，借着爱液的润滑相互摩擦着蜜穴和阴蒂。`,
          );
          await era.printAndWait(
            `「呜啊……嗯啊啊${heart(1)} 不，不行了……太舒服了${heart(1)} 要，要去了啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}与${player_name}继续扭动着腰身，寻求着更多的快感。`,
          );
          // CFLAG:TARGET:364  = 5（变量语义：CFLAG 族，TARGET:364）
          kojo.六九式 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.六九式 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `${player_name}和${target_name}岔开双腿，彼此的下体如同接吻一样紧贴着，借着爱液的润滑相互摩擦着。`,
          );
          await era.printAndWait(
            `「呜……嗯啊啊${heart(1)} 和魔王大人……这样摩擦小穴……也好棒啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}红着脸，完全沉浸在百合之乐的快感中……`,
          );
          // CFLAG:TARGET:364  = 4（变量语义：CFLAG 族，TARGET:364）
          kojo.六九式 = 4;
        } else if (
          chara(target).chara.百合气质 >= 3 &&
          (kojo.六九式 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `${player_name}和${target_name}岔开双腿，彼此的下体如同接吻一样紧贴着，借着爱液的润滑相互摩擦着蜜穴和阴蒂。`,
          );
          await era.printAndWait(
            `「嗯啊……啊啊……为，为什么……会这么舒服啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}与${player_name}继续扭动着腰身，寻求着更多的快感。`,
          );
          // CFLAG:TARGET:364  = 3（变量语义：CFLAG 族，TARGET:364）
          kojo.六九式 = 3;
        } else if (kojo.六九式 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(
            `${player_name}强行分开${target_name}的双腿，紧贴着彼此的小穴相互摩擦起来。`,
          );
          await era.printAndWait(`「不，不要！好恶心！放开我啊啊！」`);
          await era.printAndWait(`${target_name}无力抵抗，只能哭泣着忍受……`);
          // CFLAG:TARGET:364  = 2（变量语义：CFLAG 族，TARGET:364）
          kojo.六九式 = 2;
        }
      }
      return 0;
    }
  }

  // IF SELECTCOM == 64（3P CFLAG:391）
  if (era_flag.selectcom === 64) {
    if (era_flag.assi > 0 && era_flag.assi !== 17) {
      return 0;
    }

    const assi_weapon =
      era_flag.assi > 0 &&
      era0(`talent:${era_flag.assi}:121`) === 0 &&
      era0(`talent:${era_flag.assi}:122`) === 0
        ? '电动假阳具'
        : '阴茎';
    const master_weapon =
      era0(`talent:${MASTER}:121`) === 0 && era0(`talent:${MASTER}:122`) === 0
        ? '电动假阳具'
        : '阴茎';

    if (kojo.三人PLAY === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        if (assi_mao) {
          if (
            game.train.三人PLAY主人部位 === 1 &&
            game.train.三人PLAY助手部位 === 2
          ) {
            await era.printAndWait(
              `${master_name}毫不留情地夺走了${target_name}的处女`,
            );
            await era.printAndWait(
              `${assi_name}也兴奋不已地同时侵犯了${target_name}的肛门。`,
            );
            if (era.get(`talent:${target}:85`)) {
              await era.printAndWait(`「呜……啊啊……我的处女！」`);
              await era.printAndWait(
                `${target_name}被${master_name}和妹妹抱着夹在中间，破处的痛苦和前后两穴同时传来的快感交织在一起。`,
              );
              await era.print(
                `『啊啊……姐姐的肛门……太舒服了，舒服得我的小鸡鸡停不下来了啦！』`,
              );
              await era.printAndWait(
                `${assi_name}舔着嘴唇，激烈地侵犯着姐姐的后庭。`,
              );
              await era.printAndWait(
                `「啊啊……这样被夹击……一下子……就要去了啊啊啊！」`,
              );
            } else if (era.get(`talent:${target}:76`)) {
              await era.printAndWait(
                `「呜啊啊……两人的阴茎……这样同时插进来${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}感受着肛门和处女蜜穴同时被插入的异样快感。`,
              );
              await era.print(`『嘿嘿，姐姐，处女三明治的感觉如何啊？』`);
              await era.printAndWait(
                `${assi_name}嬉笑着，用阴茎激烈地侵犯着${target_name}的后庭。`,
              );
              await era.printAndWait(
                `「好舒服……这样好舒服${heart(1)}被魔王大人和${assi_name}的阴茎……同时在身体里搅动着${heart(1)}」`,
              );
            } else {
              await era.printAndWait(
                `「不，不行啊啊啊……要裂开了……真的会裂开的啊啊啊！」`,
              );
              await era.printAndWait(
                `处女蜜穴和肛门被同时贯穿的痛苦，让${target_name}的哀叫在调教室里回响着。`,
              );
              await era.print(
                `『别瞎喊了姐姐，吵死人了，学会好好享受我和魔王大人的阴茎吧，以后还要很多次的哦！』`,
              );
              await era.printAndWait(
                `${assi_name}舔着嘴唇，继续激烈地侵犯着姐姐的后庭。`,
              );
            }
          } else if (
            game.train.三人PLAY主人部位 === 2 &&
            game.train.三人PLAY助手部位 === 1
          ) {
            await era.printAndWait(
              `${assi_name}毫不留情地夺走了${target_name}的处女`,
            );
            await era.printAndWait(
              `${master_name}也兴奋不已地同时侵犯了${target_name}的肛门。`,
            );
            if (era.get(`talent:${target}:85`)) {
              await era.printAndWait(`「呜啊啊……我，我的第一次……啊啊啊！」`);
              await era.printAndWait(
                `${target_name}被${master_name}和妹妹抱着夹在中间，破处的痛苦和前后两穴同时传来的快感交织在一起。`,
              );
              await era.print(
                `『啊啊啊姐姐的第一次，归我了！！${assi_name}好高兴，好高兴！』`,
              );
              await era.printAndWait(
                `${assi_name}带着兴奋的表情，开始激烈地侵犯着着姐姐的处女蜜穴。`,
              );
              await era.printAndWait(
                `「嗯啊……那样……被两人同时侵犯……会不行的啊啊啊！」`,
              );
            } else if (era.get(`talent:${target}:76`)) {
              await era.printAndWait(
                `「呜啊啊……两人的阴茎……这样同时插进来${heart(1)} 好……好奇怪的感觉啊啊${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}感受着肛门和处女蜜穴同时被插入的异样快感。`,
              );
              await era.print(
                `『啊啊啊姐姐的第一次，归我了！！${assi_name}好高兴，好高兴${heart(1)}』`,
              );
              await era.printAndWait(
                `${assi_name}带着兴奋的表情，开始激烈地侵犯着着姐姐的处女蜜穴。`,
              );
              await era.printAndWait(
                `「好舒服……这样好舒服${heart(1)}被魔王大人和${assi_name}的阴茎……同时在身体里搅动着${heart(1)}」`,
              );
            } else {
              await era.print(
                `『啊啊啊姐姐的处女蜜穴……真是紧的让人无法忍受啊！』`,
              );
              await era.printAndWait(
                `「不，不行啊啊啊……要裂开了……真的会裂开的啊啊啊！」`,
              );
              await era.printAndWait(
                `处女蜜穴和肛门被同时贯穿的痛苦，让${target_name}的哀叫在调教室里回响着。`,
              );
              await era.print(
                `『别瞎喊了姐姐，吵死人了，学会好好享受我和魔王大人的阴茎吧，以后还要很多次的哦！』`,
              );
              await era.printAndWait(
                `${assi_name}舔着嘴唇，继续激烈地侵犯着姐姐的初经人事的蜜穴`,
              );
            }
          } else if (
            game.train.三人PLAY主人部位 === 1 &&
            game.train.三人PLAY助手部位 === 3
          ) {
            if (era.get(`talent:${target}:85`)) {
              await era.printAndWait(
                `「唔呣……唔呣……我的一次……奉献给魔王大人了啊啊啊${heart(1)} 呣呣${heart(1)}……」`,
              );
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              );
              await era.print(
                `『哎嘿嘿，姐姐的处女今天正式属于魔王大人了${heart(1)}』`,
              );
              await era.printAndWait(
                `${master_name}挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              );
              await era.printAndWait(
                `「啊啊啊……魔王大人……魔王大人，从今天开始，我，我就是你的人了啊啊${heart(1)} 」`,
              );
              await era.print(
                `『哎哎姐姐不要光顾着高兴，给我认真吸吮小鸡鸡啊${heart(1)}』`,
              );
              await era.printAndWait(
                `${target_name}被${master_name}和${assi_name}当做性玩具一般，一前一后的侵犯着……`,
              );
            } else if (era.get(`talent:${target}:76`)) {
              await era.printAndWait(
                `「唔呣……唔呣……呜啊啊！？魔王大人……的阴茎……啊啊啊${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              );
              await era.print(
                `『哎嘿嘿，姐姐，被你最喜欢的魔王大人的阴茎破处的感觉如何呀${heart(1)}』`,
              );
              await era.printAndWait(
                `${master_name}挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              );
              await era.printAndWait(
                `「好舒服……唔呣……唔呣${heart(1)} 这样同时……侍奉两根阴茎……实在是太棒了唔唔${heart(1)}」`,
              );
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，身体在心里和生理的双重快感中颤抖着……`,
              );
            } else {
              await era.printAndWait(`「住，住手啊……唔呣……呜呜呜！」`);
              await era.printAndWait(
                `${target_name}边被强迫为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              );
              await era.printAndWait(`「不，不要啊啊！」`);
              await era.print(`『姐姐，嘴巴不许停下啊，给我好好吸吮啊！』`);
              await era.printAndWait(
                `${assi_name}抓着${target_name}的头，用${assi_weapon}强行侵犯着姐姐的喉咙。`,
              );
              await era.printAndWait(
                `身后的${master_name}挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              );
              await era.printAndWait(
                `「饶，饶了我吧，求你们了……唔唔……呣呣呣……！」`,
              );
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，连悲鸣都发不出，只能忍受着痛苦与折磨………`,
              );
            }
          } else if (
            game.train.三人PLAY主人部位 === 3 &&
            game.train.三人PLAY助手部位 === 1
          ) {
            if (era.get(`talent:${target}:85`)) {
              await era.printAndWait(
                `「呜呜……唔呣${heart(1)}！${assi_name}？！不，不可以……」`,
              );
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              );
              await era.print(
                `『啊嘿嘿，和魔王大人一起用阴茎把姐姐前后串起来了——姐姐的处女，我就收下了！』`,
              );
              await era.printAndWait(
                `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              );
              await era.printAndWait(
                `「不，不要啊……我是想留给……魔王大人的——唔唔……呣呣！」`,
              );
              await era.printAndWait(
                `${target_name}被${master_name}和${assi_name}当做性玩具一般，一前一后的侵犯着……`,
              );
            } else if (era.get(`talent:${target}:76`)) {
              await era.printAndWait(
                `「唔呣……唔唔……我的处女……就这样……${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              );
              await era.print(
                `『啊啊，梦寐以求的姐姐的第一次，我就这么收下了${heart(1)}』`,
              );
              await era.printAndWait(
                `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              );
              await era.printAndWait(
                `像是在配合着${assi_name}的动作一样，${master_name}也将阴茎插入到了${target_name}的喉咙深处。`,
              );
              await era.printAndWait(
                `「唔呣……唔唔……${heart(1)} 这样……好舒服……唔唔……唔呣${heart(1)}」`,
              );
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，却感受到了心理和生理的双重快感……`,
              );
            } else {
              await era.printAndWait(`「住，住手啊……唔呣……呜呜呜！」`);
              await era.printAndWait(
                `${target_name}被强制边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，龟头抵在蜜穴上。`,
              );
              await era.print(
                `『嘿嘿嘿，姐姐的第一次就由我收下了！这样同时被侵犯着嘴巴和处女蜜穴，很舒服吧！』`,
              );
              await era.printAndWait(
                `「怎，怎么可能会舒服……呜呜呜……唔呣……呣呣呣！？」`,
              );
              await era.printAndWait(
                `${master_name}抓着${target_name}的头，将阴茎插到了喉咙的最深处。`,
              );
              await era.printAndWait(
                `身后的${assi_name}也无情地夺去了${target_name}的处女身。`,
              );
              await era.printAndWait(
                `「饶，饶了我吧，求你们了……唔唔……呣呣呣……！」`,
              );
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，连悲鸣都发不出，只能忍受着痛苦与折磨………`,
              );
            }
          } else if (
            game.train.三人PLAY主人部位 === 2 &&
            game.train.三人PLAY助手部位 === 3
          ) {
            if (era.get(`talent:${target}:85`)) {
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，用勃起的阴茎插入了肛门中。`,
              );
              await era.printAndWait(
                `「呜啊啊……不，不行啊……这样侵犯着……屁股……没有办法好好为${assi_name}口交了啊！」`,
              );
              await era.print(
                `『哎哎，姐姐别让魔王大人失望啊，连边被侵犯肛门边口交都做不好的话，可是要惩罚的哦』`,
              );
              await era.printAndWait(
                `被妹妹的话羞辱得脸红满面的${target_name}只能努力集中精神，吸吮着${assi_name}的${assi_weapon}。`,
              );
              await era.printAndWait(
                `「我，我会……努力的……唔呣……唔呣${heart(1)}呣呣……不，不行了……屁股好舒服${heart(1)}」`,
              );
              await era.printAndWait(
                `${master_name}欣赏着姐姐努力用嘴巴侍奉着妹妹的样子，更加兴奋的蹂躏，侵犯着${target_name}的肛门……`,
              );
            } else if (era.get(`talent:${target}:76`)) {
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，用勃起的阴茎插入了肛门中。`,
              );
              await era.printAndWait(
                `「呜啊……啊啊……这样……边口交，边被侵犯着肛门……感觉太棒了啊啊………」`,
              );
              await era.printAndWait(
                `${assi_name}用嫉恨的眼神看着边为自己口交，边一脸幸福的表情享受着被魔王大人肛交的${target_name}。`,
              );
              await era.print(
                `『哎哎……看姐姐这么享受，我都不知道是该嫉妒姐姐呢还是嫉妒魔王大人？喂，姐姐的嘴巴也不能松懈啊，好好地给人家口交啊！』`,
              );
              await era.printAndWait(
                `${assi_name}的话让${master_name}更加兴奋的蹂躏，侵犯着${target_name}的肛门……`,
              );
            } else {
              await era.printAndWait(
                `${target_name}被强制边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，用勃起的阴茎插入了肛门中。`,
              );
              await era.printAndWait(
                `「不，不要啊……饶了我吧……求求你们了……唔唔……唔呣呣？！」`,
              );
              await era.print(
                `『哎呀，姐姐的屁股那么舒服吗？怎么肛门一被魔王大人插进去，嘴巴和舌头就不会动了呢！给我好好口交啊！』`,
              );
              await era.printAndWait(
                `${assi_name}哼了一声，用${assi_weapon}开始侵犯，抽插着姐姐的嘴和喉咙。`,
              );
              await era.print(
                `『哼，能被我们3p，是姐姐你的福气，再这样一脸不高兴，魔王大人可就真的要不高兴了哦？』`,
              );
              await era.printAndWait(
                `${assi_name}的表情和语气让${master_name}忍不住笑了起来……`,
              );
            }
          } else if (
            game.train.三人PLAY主人部位 === 3 &&
            game.train.三人PLAY助手部位 === 2
          ) {
            if (era.get(`talent:${target}:85`)) {
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，坚挺的${assi_weapon}插入了肛门中。`,
              );
              await era.printAndWait(
                `「呜啊啊……不，不行啊……这样侵犯着……屁股……没有办法好好为魔王大人口交了啊！」`,
              );
              await era.print(
                `『哎哎，姐姐别让魔王大人失望啊，连边被侵犯肛门边口交都做不好的话，证明还缺乏调教啊${heart(1)}』`,
              );
              await era.printAndWait(
                `${assi_name}舔着嘴唇，继续激烈地侵犯着姐姐的后庭。`,
              );
              await era.printAndWait(
                `「我，我会……努力的……唔呣……唔呣${heart(1)}呣呣……不，不行了……屁股好舒服${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}集中精神，忍耐着肛门的快感，努力吸吮着${master_name}的阴茎…`,
              );
            } else if (era.get(`talent:${target}:76`)) {
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，坚挺的${assi_weapon}插入了肛门中。`,
              );
              await era.printAndWait(
                `「呜……呜啊啊……这样……太激烈了${heart(1)} 但是……好舒服……唔呣呣……唔唔${heart(1)}」`,
              );
              await era.print(
                `『哎呀呀，边被侵犯着肛门，边这么兴奋地吸着魔王大人的阴茎……姐姐真是变成淫乱便器了呢！』`,
              );
              await era.printAndWait(
                `${assi_name}边嘲笑着${target_name}，边前后动着腰，更激烈地侵犯着姐姐的肛门。`,
              );
              await era.printAndWait(
                `「不，不行了……舒服得……已经没法思考了……也没办法……好好口交了……只能，只能让魔王大人自己……动了${heart(1)}」`,
              );
              await era.printAndWait(
                `肛交的极度快感让${target_name}几乎无法集中精神，吸吮${master_name}阴茎的动作也停了下来……`,
              );
            } else {
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，坚挺的${assi_weapon}插入了肛门中。`,
              );
              await era.printAndWait(
                `「不，不要啊……饶了我吧……求求你们了……唔唔……唔呣呣？！」`,
              );
              await era.print(
                `『哎嘿嘿，这样明明很舒服才对，边被侵犯肛门，边吸吮魔王大人的阴茎，不是吗，姐姐♪』`,
              );
              await era.printAndWait(
                `${assi_name}边嘲笑着${target_name}，边前后动着腰，更激烈地侵犯着姐姐的肛门。`,
              );
              await era.print(
                `『唔哇哇……姐姐的肛门夹得这么紧……真的是名器啊！』`,
              );
              await era.printAndWait(
                `痛苦万分，又无力违抗的${target_name}只能边忍受着，边努力吸吮着的${master_name}的阴茎……`,
              );
            }
          } else {
            await era.printAndWait(`出错了？`);
          }
        } else {
          if (
            game.train.三人PLAY主人部位 === 1 &&
            game.train.三人PLAY助手部位 === 2
          ) {
            await era.printAndWait(
              `${master_name}毫不留情地夺走了${target_name}的处女`,
            );
            await era.printAndWait(
              `${assi_name}也兴奋不已地同时侵犯了${target_name}的肛门。`,
            );
            if (era.get(`talent:${target}:85`)) {
              await era.printAndWait(`「呜……啊啊……我的处女！」`);
              await era.printAndWait(
                `${target_name}被${master_name}和妹妹抱着夹在中间，破处的痛苦和前后两穴同时传来的快感交织在一起。`,
              );
              await era.print(
                `『啊啊……姐姐的肛门……太舒服了，舒服得我的小鸡鸡停不下来了啦！』`,
              );
              await era.printAndWait(
                `${assi_name}舔着嘴唇，激烈地侵犯着姐姐的后庭。`,
              );
              await era.printAndWait(
                `「啊啊……这样被夹击……一下子……就要去了啊啊啊！」`,
              );
            } else if (era.get(`talent:${target}:76`)) {
              await era.printAndWait(
                `「呜啊啊……两人的阴茎……这样同时插进来${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}感受着肛门和处女蜜穴同时被插入的异样快感。`,
              );
              await era.print(`『嘿嘿，姐姐，处女三明治的感觉如何啊？』`);
              await era.printAndWait(
                `${assi_name}嬉笑着，用阴茎激烈地侵犯着${target_name}的后庭。`,
              );
              await era.printAndWait(
                `「好舒服……这样好舒服${heart(1)}被魔王大人和${assi_name}的阴茎……同时在身体里搅动着${heart(1)}」`,
              );
            } else {
              await era.printAndWait(
                `「不，不行啊啊啊……要裂开了……真的会裂开的啊啊啊！」`,
              );
              await era.printAndWait(
                `处女蜜穴和肛门被同时贯穿的痛苦，让${target_name}的哀叫在调教室里回响着。`,
              );
              await era.print(
                `『别瞎喊了姐姐，吵死人了，学会好好享受我和魔王大人的阴茎吧，以后还要很多次的哦！』`,
              );
              await era.printAndWait(
                `${assi_name}舔着嘴唇，继续激烈地侵犯着姐姐的后庭。`,
              );
            }
          } else if (
            game.train.三人PLAY主人部位 === 2 &&
            game.train.三人PLAY助手部位 === 1
          ) {
            await era.printAndWait(
              `${assi_name}毫不留情地夺走了${target_name}的处女`,
            );
            await era.printAndWait(
              `${master_name}也兴奋不已地同时侵犯了${target_name}的肛门。`,
            );
            if (era.get(`talent:${target}:85`)) {
              await era.printAndWait(`「呜啊啊……我，我的第一次……啊啊啊！」`);
              await era.printAndWait(
                `${target_name}被${master_name}和妹妹抱着夹在中间，破处的痛苦和前后两穴同时传来的快感交织在一起。`,
              );
              await era.print(
                `『啊啊啊姐姐的第一次，归我了！！${assi_name}好高兴，好高兴！』`,
              );
              await era.printAndWait(
                `${assi_name}带着兴奋的表情，开始激烈地侵犯着着姐姐的处女蜜穴。`,
              );
              await era.printAndWait(
                `「嗯啊……那样……被两人同时侵犯……会不行的啊啊啊！」`,
              );
            } else if (era.get(`talent:${target}:76`)) {
              await era.printAndWait(
                `「呜啊啊……两人的阴茎……这样同时插进来${heart(1)} 好……好奇怪的感觉啊啊${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}感受着肛门和处女蜜穴同时被插入的异样快感。`,
              );
              await era.print(
                `『啊啊啊姐姐的第一次，归我了！！${assi_name}好高兴，好高兴${heart(1)}』`,
              );
              await era.printAndWait(
                `${assi_name}带着兴奋的表情，开始激烈地侵犯着着姐姐的处女蜜穴。`,
              );
              await era.printAndWait(
                `「好舒服……这样好舒服${heart(1)}被魔王大人和${assi_name}的阴茎……同时在身体里搅动着${heart(1)}」`,
              );
            } else {
              await era.print(
                `『啊啊啊姐姐的处女蜜穴……真是紧的让人无法忍受啊！』`,
              );
              await era.printAndWait(
                `「不，不行啊啊啊……要裂开了……真的会裂开的啊啊啊！」`,
              );
              await era.printAndWait(
                `处女蜜穴和肛门被同时贯穿的痛苦，让${target_name}的哀叫在调教室里回响着。`,
              );
              await era.print(
                `『别瞎喊了姐姐，吵死人了，学会好好享受我和魔王大人的阴茎吧，以后还要很多次的哦！』`,
              );
              await era.printAndWait(
                `${assi_name}舔着嘴唇，继续激烈地侵犯着姐姐的初经人事的蜜穴`,
              );
            }
          } else if (
            game.train.三人PLAY主人部位 === 1 &&
            game.train.三人PLAY助手部位 === 3
          ) {
            if (era.get(`talent:${target}:85`)) {
              await era.printAndWait(
                `「唔呣……唔呣……我的一次……奉献给魔王大人了啊啊啊${heart(1)} 呣呣${heart(1)}……」`,
              );
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              );
              await era.print(
                `『哎嘿嘿，姐姐的处女今天正式属于魔王大人了${heart(1)}』`,
              );
              await era.printAndWait(
                `${master_name}挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              );
              await era.printAndWait(
                `「啊啊啊……魔王大人……魔王大人，从今天开始，我，我就是你的人了啊啊${heart(1)} 」`,
              );
              await era.print(
                `『哎哎姐姐不要光顾着高兴，给我认真吸吮小鸡鸡啊${heart(1)}』`,
              );
              await era.printAndWait(
                `${target_name}被${master_name}和${assi_name}当做性玩具一般，一前一后的侵犯着……`,
              );
            } else if (era.get(`talent:${target}:76`)) {
              await era.printAndWait(
                `「唔呣……唔呣……呜啊啊！？魔王大人……的阴茎……啊啊啊${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              );
              await era.print(
                `『哎嘿嘿，姐姐，被你最喜欢的魔王大人的阴茎破处的感觉如何呀${heart(1)}』`,
              );
              await era.printAndWait(
                `${master_name}挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              );
              await era.printAndWait(
                `「好舒服……唔呣……唔呣${heart(1)} 这样同时……侍奉两根阴茎……实在是太棒了唔唔${heart(1)}」`,
              );
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，身体在心里和生理的双重快感中颤抖着……`,
              );
            } else {
              await era.printAndWait(`「住，住手啊……唔呣……呜呜呜！」`);
              await era.printAndWait(
                `${target_name}边被强迫为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              );
              await era.printAndWait(`「不，不要啊啊！」`);
              await era.print(`『姐姐，嘴巴不许停下啊，给我好好吸吮啊！』`);
              await era.printAndWait(
                `${assi_name}抓着${target_name}的头，用${assi_weapon}强行侵犯着姐姐的喉咙。`,
              );
              await era.printAndWait(
                `身后的${master_name}挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              );
              await era.printAndWait(
                `「饶，饶了我吧，求你们了……唔唔……呣呣呣……！」`,
              );
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，连悲鸣都发不出，只能忍受着痛苦与折磨………`,
              );
            }
          } else if (
            game.train.三人PLAY主人部位 === 3 &&
            game.train.三人PLAY助手部位 === 1
          ) {
            if (era.get(`talent:${target}:85`)) {
              await era.printAndWait(
                `「呜呜……唔呣${heart(1)}！${assi_name}？！不，不可以……」`,
              );
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              );
              await era.print(
                `『啊嘿嘿，和魔王大人一起用阴茎把姐姐前后串起来了——姐姐的处女，我就收下了！』`,
              );
              await era.printAndWait(
                `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              );
              await era.printAndWait(
                `「不，不要啊……我是想留给……魔王大人的——唔唔……呣呣！」`,
              );
              await era.printAndWait(
                `${target_name}被${master_name}和${assi_name}当做性玩具一般，一前一后的侵犯着……`,
              );
            } else if (era.get(`talent:${target}:76`)) {
              await era.printAndWait(
                `「唔呣……唔唔……我的处女……就这样……${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              );
              await era.print(
                `『啊啊，梦寐以求的姐姐的第一次，我就这么收下了${heart(1)}』`,
              );
              await era.printAndWait(
                `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              );
              await era.printAndWait(
                `像是在配合着${assi_name}的动作一样，${master_name}也将阴茎插入到了${target_name}的喉咙深处。`,
              );
              await era.printAndWait(
                `「唔呣……唔唔……${heart(1)} 这样……好舒服……唔唔……唔呣${heart(1)}」`,
              );
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，却感受到了心理和生理的双重快感……`,
              );
            } else {
              await era.printAndWait(`「住，住手啊……唔呣……呜呜呜！」`);
              await era.printAndWait(
                `${target_name}被强制边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，龟头抵在蜜穴上。`,
              );
              await era.print(
                `『嘿嘿嘿，姐姐的第一次就由我收下了！这样同时被侵犯着嘴巴和处女蜜穴，很舒服吧！』`,
              );
              await era.printAndWait(
                `「怎，怎么可能会舒服……呜呜呜……唔呣……呣呣呣！？」`,
              );
              await era.printAndWait(
                `${master_name}抓着${target_name}的头，将阴茎插到了喉咙的最深处。`,
              );
              await era.printAndWait(
                `身后的${assi_name}也无情地夺去了${target_name}的处女身。`,
              );
              await era.printAndWait(
                `「饶，饶了我吧，求你们了……唔唔……呣呣呣……！」`,
              );
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，连悲鸣都发不出，只能忍受着痛苦与折磨………`,
              );
            }
          } else if (
            game.train.三人PLAY主人部位 === 2 &&
            game.train.三人PLAY助手部位 === 3
          ) {
            if (era.get(`talent:${target}:85`)) {
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，用勃起的阴茎插入了肛门中。`,
              );
              await era.printAndWait(
                `「呜啊啊……不，不行啊……这样侵犯着……屁股……没有办法好好为${assi_name}口交了啊！」`,
              );
              await era.print(
                `『哎哎，姐姐别让魔王大人失望啊，连边被侵犯肛门边口交都做不好的话，可是要惩罚的哦』`,
              );
              await era.printAndWait(
                `被妹妹的话羞辱得脸红满面的${target_name}只能努力集中精神，吸吮着${assi_name}的${assi_weapon}。`,
              );
              await era.printAndWait(
                `「我，我会……努力的……唔呣……唔呣${heart(1)}呣呣……不，不行了……屁股好舒服${heart(1)}」`,
              );
              await era.printAndWait(
                `${master_name}欣赏着姐姐努力用嘴巴侍奉着妹妹的样子，更加兴奋的蹂躏，侵犯着${target_name}的肛门……`,
              );
            } else if (era.get(`talent:${target}:76`)) {
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，用勃起的阴茎插入了肛门中。`,
              );
              await era.printAndWait(
                `「呜啊……啊啊……这样……边口交，边被侵犯着肛门……感觉太棒了啊啊………」`,
              );
              await era.printAndWait(
                `${assi_name}用嫉恨的眼神看着边为自己口交，边一脸幸福的表情享受着被魔王大人肛交的${target_name}。`,
              );
              await era.print(
                `『哎哎……看姐姐这么享受，我都不知道是该嫉妒姐姐呢还是嫉妒魔王大人？喂，姐姐的嘴巴也不能松懈啊，好好地给人家口交啊！』`,
              );
              await era.printAndWait(
                `${assi_name}的话让${master_name}更加兴奋的蹂躏，侵犯着${target_name}的肛门……`,
              );
            } else {
              await era.printAndWait(
                `${target_name}被强制边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，用勃起的阴茎插入了肛门中。`,
              );
              await era.printAndWait(
                `「不，不要啊……饶了我吧……求求你们了……唔唔……唔呣呣？！」`,
              );
              await era.print(
                `『哎呀，姐姐的屁股那么舒服吗？怎么肛门一被魔王大人插进去，嘴巴和舌头就不会动了呢！给我好好口交啊！』`,
              );
              await era.printAndWait(
                `${assi_name}哼了一声，用${assi_weapon}开始侵犯，抽插着姐姐的嘴和喉咙。`,
              );
              await era.print(
                `『哼，能被我们3p，是姐姐你的福气，再这样一脸不高兴，魔王大人可就真的要不高兴了哦？』`,
              );
              await era.printAndWait(
                `${assi_name}的表情和语气让${master_name}忍不住笑了起来……`,
              );
            }
          } else if (
            game.train.三人PLAY主人部位 === 3 &&
            game.train.三人PLAY助手部位 === 2
          ) {
            if (era.get(`talent:${target}:85`)) {
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，坚挺的${assi_weapon}插入了肛门中。`,
              );
              await era.printAndWait(
                `「呜啊啊……不，不行啊……这样侵犯着……屁股……没有办法好好为魔王大人口交了啊！」`,
              );
              await era.print(
                `『哎哎，姐姐别让魔王大人失望啊，连边被侵犯肛门边口交都做不好的话，证明还缺乏调教啊${heart(1)}』`,
              );
              await era.printAndWait(
                `${assi_name}舔着嘴唇，继续激烈地侵犯着姐姐的后庭。`,
              );
              await era.printAndWait(
                `「我，我会……努力的……唔呣……唔呣${heart(1)}呣呣……不，不行了……屁股好舒服${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}集中精神，忍耐着肛门的快感，努力吸吮着${master_name}的阴茎…`,
              );
            } else if (era.get(`talent:${target}:76`)) {
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，坚挺的${assi_weapon}插入了肛门中。`,
              );
              await era.printAndWait(
                `「呜……呜啊啊……这样……太激烈了${heart(1)} 但是……好舒服……唔呣呣……唔唔${heart(1)}」`,
              );
              await era.print(
                `『哎呀呀，边被侵犯着肛门，边这么兴奋地吸着魔王大人的阴茎……姐姐真是变成淫乱便器了呢！』`,
              );
              await era.printAndWait(
                `${assi_name}边嘲笑着${target_name}，边前后动着腰，更激烈地侵犯着姐姐的肛门。`,
              );
              await era.printAndWait(
                `「不，不行了……舒服得……已经没法思考了……也没办法……好好口交了……只能，只能让魔王大人自己……动了${heart(1)}」`,
              );
              await era.printAndWait(
                `肛交的极度快感让${target_name}几乎无法集中精神，吸吮${master_name}阴茎的动作也停了下来……`,
              );
            } else {
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，坚挺的${assi_weapon}插入了肛门中。`,
              );
              await era.printAndWait(
                `「不，不要啊……饶了我吧……求求你们了……唔唔……唔呣呣？！」`,
              );
              await era.print(
                `『哎嘿嘿，这样明明很舒服才对，边被侵犯肛门，边吸吮魔王大人的阴茎，不是吗，姐姐♪』`,
              );
              await era.printAndWait(
                `${assi_name}边嘲笑着${target_name}，边前后动着腰，更激烈地侵犯着姐姐的肛门。`,
              );
              await era.print(
                `『唔哇哇……姐姐的肛门夹得这么紧……真的是名器啊！』`,
              );
              await era.printAndWait(
                `痛苦万分，又无力违抗的${target_name}只能边忍受着，边努力吸吮着的${master_name}的阴茎……`,
              );
            }
          }
        }
      } else {
        if (assi_mao) {
          if (
            game.train.三人PLAY主人部位 === 1 &&
            game.train.三人PLAY助手部位 === 2
          ) {
            if (era.get(`talent:${target}:85`)) {
              await era.printAndWait(
                `「不，不行啊啊！这样……两人一起插入什么的……人家会受不了的啊啊啊！」`,
              );
              await era.printAndWait(
                `${target_name}被${master_name}和${assi_name}夹在中间，拼命忍耐着肛门与蜜穴被同时侵犯的极度快感。`,
              );
              await era.print(
                `『哼，不要得了便宜卖乖啊姐姐，能这样独占魔王大人！绝对不可饶恕！』`,
              );
              await era.printAndWait(
                `${assi_name}嫉妒地扭着腰，激烈的侵犯着姐姐的肛门。`,
              );
              await era.printAndWait(
                `「呜呜……饶，饶了我吧……屁股……这样会坏掉的啊啊啊！」`,
              );
            } else if (era.get(`talent:${target}:76`)) {
              await era.printAndWait(
                `「哈啊……哈啊${heart(1)} 被魔王大人和${assi_name}的阴茎……一起插进来了${heart(1)}」`,
              );
              await era.printAndWait(
                `蜜穴与肛门被同时插入，极度的快感瞬间淹没了${target_name}。`,
              );
              await era.print(
                `『啊啊……姐姐的肛门……夹得这么紧……真的是名器啊啊${heart(1)}』`,
              );
              await era.printAndWait(
                `${assi_name}嬉笑着，开始激烈地侵犯着${target_name}的肛门，搅动着直肠的敏感点。`,
              );
              await era.printAndWait(
                `「好，好舒服${heart(1)}…… 被两根阴茎……同时在身体里抽插着${heart(1)}……一下子就要去了啊啊！」`,
              );
            } else {
              await era.printAndWait(
                `「饶，饶了我吧……求求你们了……这样会裂开的，真的会裂开的啊啊！」`,
              );
              await era.printAndWait(
                `蜜穴和肛门被同时强行插入，完全不能适应这种玩法的${target_name}惨叫了起来。`,
              );
              await era.print(
                `『没关系，马上就会让姐姐舒服起来了哦${heart(1)}』`,
              );
              await era.printAndWait(
                `${assi_name}这么说着，边配合着${master_name}的动作，扭着腰开始激烈地侵犯${target_name}的肛门……`,
              );
            }
          } else if (
            game.train.三人PLAY主人部位 === 2 &&
            game.train.三人PLAY助手部位 === 1
          ) {
            if (era.get(`talent:${target}:85`)) {
              await era.printAndWait(
                `「呜啊啊……这样……两人一起插进来……人家……会受不了的啊啊！」`,
              );
              await era.printAndWait(
                `${target_name}被${master_name}和妹妹夹在中间，拼命忍耐着肛门与蜜穴被同时侵犯的极度快感。`,
              );
              await era.print(
                `『哎呀呀，姐姐的肉穴……实在是太舒服了！舒服得人家完全停不下来啊啊！』`,
              );
              await era.printAndWait(
                `${assi_name}舔着嘴唇，开始激烈地侵犯，蹂躏着${target_name}的蜜穴。`,
              );
              await era.printAndWait(
                `「咿啊啊啊……屁股……还有小穴……都要被侵犯得一塌糊涂了啊啊啊！」`,
              );
            } else if (era.get(`talent:${target}:76`)) {
              await era.printAndWait(
                `「哈啊……哈啊${heart(1)} 被魔王大人和${assi_name}的阴茎……一起插进来了${heart(1)}」`,
              );
              await era.printAndWait(
                `蜜穴与肛门被同时插入，极度的快感让${target_name}呼吸变得急促了起来，嘴也合不上了。`,
              );
              await era.print(
                `『啊啊……姐姐的蜜穴……好紧好舒服${heart(1)} 真的是名器啊啊！』`,
              );
              await era.printAndWait(
                `${assi_name}带着兴奋的表情，开始激烈地侵犯着${target_name}。`,
              );
              await era.printAndWait(
                `「好，好舒服${heart(1)}……被两人的阴茎……同时在身体里抽插着${heart(1)}……一下子就要去了啊啊！」`,
              );
            } else {
              await era.print(
                `『哎嘿嘿，魔王大人说姐姐的肛门很适合调教成性器呢${heart(1)}』`,
              );
              await era.printAndWait(
                `「不，不可以啊啊啊！这样同时插进来！姐姐真的会坏掉的啊啊！」`,
              );
              await era.printAndWait(
                `蜜穴和肛门被同时贯穿的痛苦，让${target_name}的惨叫在调教室里回响着。`,
              );
              await era.print(
                `『哎哎，有什么好哭的呢，能被我和魔王大人这样抱在中间侵犯，明明是性奴姐姐的福气才是！给我好好享受起来啊！』`,
              );
              await era.printAndWait(
                `${assi_name}舔着嘴唇，坏笑着开始更加激烈地侵犯着${target_name}……`,
              );
            }
          } else if (
            game.train.三人PLAY主人部位 === 1 &&
            game.train.三人PLAY助手部位 === 3
          ) {
            if (era.get(`talent:${target}:85`)) {
              await era.printAndWait(
                `「唔呣呣……嘴巴里充满了${assi_name}阴茎的味道……呣呣！」`,
              );
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头慢慢顶入了蜜穴中。`,
              );
              await era.print(
                `『哎嘿嘿，姐姐最喜欢的魔王大人的阴茎也得到了哦${heart(1)}』`,
              );
              await era.printAndWait(
                `身后${master_name}挺着腰，开始持续地侵犯着${target_name}的紧致的蜜穴。`,
              );
              await era.printAndWait(
                `「呜啊啊……被，被魔王大人顶到……子宫口了${heart(1)}……唔啊啊……唔呣……唔呣！」`,
              );
              await era.printAndWait(
                `${assi_name}也毫不留情地用${assi_weapon}侵犯着姐姐的嘴。`,
              );
              await era.print(
                `『不要光顾着享受魔王大人的阴茎，也要好好地给我口交啊！』`,
              );
              await era.printAndWait(
                `${target_name}被${master_name}和${assi_name}当做性玩具一般，一前一后的侵犯着……`,
              );
            } else if (era.get(`talent:${target}:76`)) {
              await era.printAndWait(
                `「哈啊……唔呣……唔呣……这样……好舒服……呣呣${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头慢慢顶入了蜜穴中。`,
              );
              await era.print(`『嘿嘿，姐姐好像很舒服啊………』`);
              await era.printAndWait(
                `${master_name}挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              );
              await era.printAndWait(
                `「是……是啊……真的很舒服${heart(1)} 被这样同时侵犯着肛门和嘴巴小穴……真是太舒服了啊呣呣${heart(1)}」`,
              );
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，身体在心里和生理的双重快感中颤抖着……`,
              );
            } else {
              await era.printAndWait(`「住，住手啊……唔呣……呜呜呜！」`);
              await era.printAndWait(
                `${target_name}边被强迫为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头顶入了蜜穴中。`,
              );
              await era.printAndWait(
                `「不，不行啊……这样前后一起侵犯……唔呣呣……呣呣！」`,
              );
              await era.printAndWait(
                `无视${target_name}的哀求，${master_name}挺着腰，开始持续侵犯着紧致的蜜穴。`,
              );
              await era.print(`『姐姐，嘴巴不许停下啊，给我好好吸吮啊！』`);
              await era.printAndWait(
                `${assi_name}抓着${target_name}的头，用${assi_weapon}强行侵犯着姐姐的喉咙。`,
              );
              await era.printAndWait(
                `「饶，饶了我吧，求你们了……唔唔……呣呣呣……！」`,
              );
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，连悲鸣都发不出，只能忍受着痛苦与折磨………`,
              );
            }
          } else if (
            game.train.三人PLAY主人部位 === 3 &&
            game.train.三人PLAY助手部位 === 1
          ) {
            if (era.get(`talent:${target}:85`)) {
              await era.printAndWait(
                `「唔呣？不，不可以这样同时啊！${assi_name}……稍微等一下……唔呣……唔呣${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，顶入了敏感的蜜穴中。`,
              );
              await era.print(`『啊啊……姐姐的蜜穴……好舒服啊啊！』`);
              await era.printAndWait(
                `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              );
              await era.printAndWait(
                `「不，不要……顶的这么深啊啊……没有办法……好好给魔王大人……口交了啊唔……呣呣！」`,
              );
              await era.printAndWait(
                `像是在配合着${assi_name}的动作一样，${master_name}也将阴茎插入到了${target_name}的喉咙深处。`,
              );
              await era.printAndWait(
                `${target_name}被${master_name}和${assi_name}当做性玩具一般，一前一后的侵犯着……`,
              );
            } else if (era.get(`talent:${target}:76`)) {
              await era.printAndWait(
                `「啊啊……好棒……这样一前一后……同时用蜜穴和嘴巴小穴……侍奉${assi_name}和魔王大人……唔呣……唔呣…${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，顶入了敏感的蜜穴中。`,
              );
              await era.print(
                `『嘿啊，吸吮着魔王大人的阴茎有那么舒服吗，小穴夹得更紧了啊姐姐♪』`,
              );
              await era.printAndWait(
                `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              );
              await era.printAndWait(
                `像是在配合着${assi_name}的动作一样，${master_name}也将阴茎插入到了${target_name}的喉咙深处。`,
              );
              await era.printAndWait(
                `「唔呣……唔唔……${heart(1)} 3p……好棒……好舒服……唔唔……唔呣${heart(1)}」`,
              );
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，却感受到了心理和生理的双重快感……`,
              );
            } else {
              await era.printAndWait(
                `「唔呣……不，不可以……这样……太，太羞耻了啊啊！」`,
              );
              await era.printAndWait(
                `${target_name}被强制边为${master_name}口交着，边悲惨地感受着身后的${assi_name}抱着自己的腰，龟头抵在蜜穴上。`,
              );
              await era.print(
                `『哎嘿嘿，魔王大人说姐姐的嘴巴小穴现在和蜜穴已经没有区别了呢，都变成淫乱性器了！』`,
              );
              await era.printAndWait(
                `边嘲笑着${target_name}，${assi_name}边开始毫不留情地侵犯着姐姐的蜜穴。`,
              );
              await era.printAndWait(
                `「呜呜！好痛！不要那么激烈……唔呣……唔呣！？」`,
              );
              await era.printAndWait(
                `${master_name}抓着${target_name}的头，将阴茎插到了喉咙的最深处。`,
              );
              await era.printAndWait(
                `『嘿嘿，姐姐给我老实用喉咙小穴和蜜穴同时高潮吧！』`,
              );
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，连悲鸣都发不出，只能忍受着痛苦与折磨………`,
              );
            }
          } else if (
            game.train.三人PLAY主人部位 === 2 &&
            game.train.三人PLAY助手部位 === 3
          ) {
            if (era.get(`talent:${target}:85`)) {
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，用勃起的阴茎插入了肛门中。`,
              );
              await era.printAndWait(
                `「呜啊啊……不，不行啊……这样侵犯着……屁股……没有办法好好为${assi_name}口交了啊！」`,
              );
              await era.print(
                `『哎哎，姐姐别让魔王大人失望啊，连边被侵犯肛门边口交都做不好的话，可是要惩罚的哦』`,
              );
              await era.printAndWait(
                `被妹妹的话羞辱得脸红满面的${target_name}只能努力集中精神，吸吮着${assi_name}的${assi_weapon}。`,
              );
              await era.printAndWait(
                `「我，我会……努力的……唔呣……唔呣${heart(1)}呣呣……不，不行了……屁股好舒服${heart(1)}」`,
              );
              await era.printAndWait(
                `${master_name}欣赏着姐姐努力用嘴巴侍奉着妹妹的样子，更加兴奋的蹂躏，侵犯着${target_name}的肛门……`,
              );
            } else if (era.get(`talent:${target}:76`)) {
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，用勃起的阴茎插入了肛门中。`,
              );
              await era.printAndWait(
                `「呜啊……啊啊……这样……边口交，边被侵犯着肛门……感觉太棒了啊啊………」`,
              );
              await era.printAndWait(
                `${assi_name}用嫉恨的眼神看着边为自己口交，边一脸幸福的表情享受着被魔王大人肛交的${target_name}。`,
              );
              await era.print(
                `『哎哎……看姐姐这么享受，我都不知道是该嫉妒姐姐呢还是嫉妒魔王大人？喂，姐姐的嘴巴也不能松懈啊，好好地给人家口交啊！』`,
              );
              await era.printAndWait(
                `${assi_name}的话让${master_name}更加兴奋的蹂躏，侵犯着${target_name}的肛门……`,
              );
            } else {
              await era.printAndWait(
                `${target_name}被强制边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，用勃起的阴茎插入了肛门中。`,
              );
              await era.printAndWait(
                `「不，不要啊……饶了我吧……求求你们了……唔唔……唔呣呣？！」`,
              );
              await era.print(
                `『哎呀，姐姐的屁股那么舒服吗？怎么肛门一被魔王大人插进去，嘴巴和舌头就不会动了呢！给我好好口交啊！』`,
              );
              await era.printAndWait(
                `${assi_name}哼了一声，用${assi_weapon}开始侵犯，抽插着姐姐的嘴和喉咙。`,
              );
              await era.print(
                `『哼，能被我们3p，是姐姐你的福气，再这样一脸不高兴，魔王大人可就真的要不高兴了哦？』`,
              );
              await era.printAndWait(
                `${assi_name}的表情和语气让${master_name}忍不住笑了起来……`,
              );
            }
          } else if (
            game.train.三人PLAY主人部位 === 3 &&
            game.train.三人PLAY助手部位 === 2
          ) {
            if (era.get(`talent:${target}:85`)) {
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，坚挺的${assi_weapon}插入了肛门中。`,
              );
              await era.printAndWait(
                `「呜啊啊……不，不行啊……这样侵犯着……屁股……没有办法好好为魔王大人口交了啊！」`,
              );
              await era.print(
                `『哎哎，姐姐别让魔王大人失望啊，连边被侵犯肛门边口交都做不好的话，证明还缺乏调教啊${heart(1)}』`,
              );
              await era.printAndWait(
                `${assi_name}舔着嘴唇，继续激烈地侵犯着姐姐的后庭。`,
              );
              await era.printAndWait(
                `「我，我会……努力的……唔呣……唔呣${heart(1)}呣呣……不，不行了……屁股好舒服${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}集中精神，忍耐着肛门的快感，努力吸吮着${master_name}的阴茎…`,
              );
            } else if (era.get(`talent:${target}:76`)) {
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，坚挺的${assi_weapon}插入了肛门中。`,
              );
              await era.printAndWait(
                `「呜……呜啊啊……这样……太激烈了${heart(1)} 但是……好舒服……唔呣呣……唔唔${heart(1)}」`,
              );
              await era.print(
                `『哎呀呀，边被侵犯着肛门，边这么兴奋地吸着魔王大人的阴茎……姐姐真是变成淫乱便器了呢！』`,
              );
              await era.printAndWait(
                `${assi_name}边嘲笑着${target_name}，边前后动着腰，更激烈地侵犯着姐姐的肛门。`,
              );
              await era.printAndWait(
                `「不，不行了……舒服得……已经没法思考了……也没办法……好好口交了……只能，只能让魔王大人自己……动了${heart(1)}」`,
              );
              await era.printAndWait(
                `肛交的极度快感让${target_name}几乎无法集中精神，吸吮${master_name}阴茎的动作也停了下来……`,
              );
            } else {
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，坚挺的${assi_weapon}插入了肛门中。`,
              );
              await era.printAndWait(
                `「不，不要啊……饶了我吧……求求你们了……唔唔……唔呣呣？！」`,
              );
              await era.print(
                `『哎嘿嘿，这样明明很舒服才对，边被侵犯肛门，边吸吮魔王大人的阴茎，不是吗，姐姐♪』`,
              );
              await era.printAndWait(
                `${assi_name}边嘲笑着${target_name}，边前后动着腰，更激烈地侵犯着姐姐的肛门。`,
              );
              await era.print(
                `『唔哇哇……姐姐的肛门夹得这么紧……真的是名器啊！』`,
              );
              await era.printAndWait(
                `痛苦万分，又无力违抗的${target_name}只能边忍受着，边努力吸吮着的${master_name}的阴茎……`,
              );
            }
          } else {
            await era.printAndWait(`出错了？`);
          }
        } else {
          if (
            game.train.三人PLAY主人部位 === 1 &&
            game.train.三人PLAY助手部位 === 2
          ) {
            if (era.get(`talent:${target}:85`)) {
              await era.printAndWait(
                `「不，不行啊啊！这样……两人一起插入什么的……人家会受不了的啊啊啊！」`,
              );
              await era.printAndWait(
                `${target_name}被${master_name}和${assi_name}夹在中间，拼命忍耐着肛门与蜜穴被同时侵犯的极度快感。`,
              );
              await era.print(
                `『哼，不要得了便宜卖乖啊姐姐，能这样独占魔王大人！绝对不可饶恕！』`,
              );
              await era.printAndWait(
                `${assi_name}嫉妒地扭着腰，激烈的侵犯着姐姐的肛门。`,
              );
              await era.printAndWait(
                `「呜呜……饶，饶了我吧……屁股……这样会坏掉的啊啊啊！」`,
              );
            } else if (era.get(`talent:${target}:76`)) {
              await era.printAndWait(
                `「哈啊……哈啊${heart(1)} 被魔王大人和${assi_name}的阴茎……一起插进来了${heart(1)}」`,
              );
              await era.printAndWait(
                `蜜穴与肛门被同时插入，极度的快感瞬间淹没了${target_name}。`,
              );
              await era.print(
                `『啊啊……姐姐的肛门……夹得这么紧……真的是名器啊啊${heart(1)}』`,
              );
              await era.printAndWait(
                `${assi_name}嬉笑着，开始激烈地侵犯着${target_name}的肛门，搅动着直肠的敏感点。`,
              );
              await era.printAndWait(
                `「好，好舒服${heart(1)}…… 被两根阴茎……同时在身体里抽插着${heart(1)}……一下子就要去了啊啊！」`,
              );
            } else {
              await era.printAndWait(
                `「饶，饶了我吧……求求你们了……这样会裂开的，真的会裂开的啊啊！」`,
              );
              await era.printAndWait(
                `蜜穴和肛门被同时强行插入，完全不能适应这种玩法的${target_name}惨叫了起来。`,
              );
              await era.print(
                `『没关系，马上就会让姐姐舒服起来了哦${heart(1)}』`,
              );
              await era.printAndWait(
                `${assi_name}这么说着，边配合着${master_name}的动作，扭着腰开始激烈地侵犯${target_name}的肛门……`,
              );
            }
          } else if (
            game.train.三人PLAY主人部位 === 2 &&
            game.train.三人PLAY助手部位 === 1
          ) {
            if (era.get(`talent:${target}:85`)) {
              await era.printAndWait(
                `「呜啊啊……这样……两人一起插进来……人家……会受不了的啊啊！」`,
              );
              await era.printAndWait(
                `${target_name}被${master_name}和妹妹夹在中间，拼命忍耐着肛门与蜜穴被同时侵犯的极度快感。`,
              );
              await era.print(
                `『哎呀呀，姐姐的肉穴……实在是太舒服了！舒服得人家完全停不下来啊啊！』`,
              );
              await era.printAndWait(
                `${assi_name}舔着嘴唇，开始激烈地侵犯，蹂躏着${target_name}的蜜穴。`,
              );
              await era.printAndWait(
                `「咿啊啊啊……屁股……还有小穴……都要被侵犯得一塌糊涂了啊啊啊！」`,
              );
            } else if (era.get(`talent:${target}:76`)) {
              await era.printAndWait(
                `「哈啊……哈啊${heart(1)} 被魔王大人和${assi_name}的阴茎……一起插进来了${heart(1)}」`,
              );
              await era.printAndWait(
                `蜜穴与肛门被同时插入，极度的快感让${target_name}呼吸变得急促了起来，嘴也合不上了。`,
              );
              await era.print(
                `『啊啊……姐姐的蜜穴……好紧好舒服${heart(1)} 真的是名器啊啊！』`,
              );
              await era.printAndWait(
                `${assi_name}带着兴奋的表情，开始激烈地侵犯着${target_name}。`,
              );
              await era.printAndWait(
                `「好，好舒服${heart(1)}……被两人的阴茎……同时在身体里抽插着${heart(1)}……一下子就要去了啊啊！」`,
              );
            } else {
              await era.print(
                `『哎嘿嘿，魔王大人说姐姐的肛门很适合调教成性器呢${heart(1)}』`,
              );
              await era.printAndWait(
                `「不，不可以啊啊啊！这样同时插进来！姐姐真的会坏掉的啊啊！」`,
              );
              await era.printAndWait(
                `蜜穴和肛门被同时贯穿的痛苦，让${target_name}的惨叫在调教室里回响着。`,
              );
              await era.print(
                `『哎哎，有什么好哭的呢，能被我和魔王大人这样抱在中间侵犯，明明是性奴姐姐的福气才是！给我好好享受起来啊！』`,
              );
              await era.printAndWait(
                `${assi_name}舔着嘴唇，坏笑着开始更加激烈地侵犯着${target_name}……`,
              );
            }
          } else if (
            game.train.三人PLAY主人部位 === 1 &&
            game.train.三人PLAY助手部位 === 3
          ) {
            if (era.get(`talent:${target}:85`)) {
              await era.printAndWait(
                `「唔呣呣……嘴巴里充满了${assi_name}阴茎的味道……呣呣！」`,
              );
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头慢慢顶入了蜜穴中。`,
              );
              await era.print(
                `『哎嘿嘿，姐姐最喜欢的魔王大人的阴茎也得到了哦${heart(1)}』`,
              );
              await era.printAndWait(
                `身后${master_name}挺着腰，开始持续地侵犯着${target_name}的紧致的蜜穴。`,
              );
              await era.printAndWait(
                `「呜啊啊……被，被魔王大人顶到……子宫口了${heart(1)}……唔啊啊……唔呣……唔呣！」`,
              );
              await era.printAndWait(
                `${assi_name}也毫不留情地用${assi_weapon}侵犯着姐姐的嘴。`,
              );
              await era.print(
                `『不要光顾着享受魔王大人的阴茎，也要好好地给我口交啊！』`,
              );
              await era.printAndWait(
                `${target_name}被${master_name}和${assi_name}当做性玩具一般，一前一后的侵犯着……`,
              );
            } else if (era.get(`talent:${target}:76`)) {
              await era.printAndWait(
                `「哈啊……唔呣……唔呣……这样……好舒服……呣呣${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头慢慢顶入了蜜穴中。`,
              );
              await era.print(`『嘿嘿，姐姐好像很舒服啊………』`);
              await era.printAndWait(
                `${master_name}挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              );
              await era.printAndWait(
                `「是……是啊……真的很舒服${heart(1)} 被这样同时侵犯着肛门和嘴巴小穴……真是太舒服了啊呣呣${heart(1)}」`,
              );
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，身体在心里和生理的双重快感中颤抖着……`,
              );
            } else {
              await era.printAndWait(`「住，住手啊……唔呣……呜呜呜！」`);
              await era.printAndWait(
                `${target_name}边被强迫为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头顶入了蜜穴中。`,
              );
              await era.printAndWait(
                `「不，不行啊……这样前后一起侵犯……唔呣呣……呣呣！」`,
              );
              await era.printAndWait(
                `无视${target_name}的哀求，${master_name}挺着腰，开始持续侵犯着紧致的蜜穴。`,
              );
              await era.print(`『姐姐，嘴巴不许停下啊，给我好好吸吮啊！』`);
              await era.printAndWait(
                `${assi_name}抓着${target_name}的头，用${assi_weapon}强行侵犯着姐姐的喉咙。`,
              );
              await era.printAndWait(
                `「饶，饶了我吧，求你们了……唔唔……呣呣呣……！」`,
              );
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，连悲鸣都发不出，只能忍受着痛苦与折磨………`,
              );
            }
          } else if (
            game.train.三人PLAY主人部位 === 3 &&
            game.train.三人PLAY助手部位 === 1
          ) {
            if (era.get(`talent:${target}:85`)) {
              await era.printAndWait(
                `「唔呣？不，不可以这样同时啊！${assi_name}……稍微等一下……唔呣……唔呣${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，顶入了敏感的蜜穴中。`,
              );
              await era.print(`『啊啊……姐姐的蜜穴……好舒服啊啊！』`);
              await era.printAndWait(
                `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              );
              await era.printAndWait(
                `「不，不要……顶的这么深啊啊……没有办法……好好给魔王大人……口交了啊唔……呣呣！」`,
              );
              await era.printAndWait(
                `像是在配合着${assi_name}的动作一样，${master_name}也将阴茎插入到了${target_name}的喉咙深处。`,
              );
              await era.printAndWait(
                `${target_name}被${master_name}和${assi_name}当做性玩具一般，一前一后的侵犯着……`,
              );
            } else if (era.get(`talent:${target}:76`)) {
              await era.printAndWait(
                `「啊啊……好棒……这样一前一后……同时用蜜穴和嘴巴小穴……侍奉${assi_name}和魔王大人……唔呣……唔呣…${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，顶入了敏感的蜜穴中。`,
              );
              await era.print(
                `『嘿啊，吸吮着魔王大人的阴茎有那么舒服吗，小穴夹得更紧了啊姐姐♪』`,
              );
              await era.printAndWait(
                `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              );
              await era.printAndWait(
                `像是在配合着${assi_name}的动作一样，${master_name}也将阴茎插入到了${target_name}的喉咙深处。`,
              );
              await era.printAndWait(
                `「唔呣……唔唔……${heart(1)} 3p……好棒……好舒服……唔唔……唔呣${heart(1)}」`,
              );
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，却感受到了心理和生理的双重快感……`,
              );
            } else {
              await era.printAndWait(
                `「唔呣……不，不可以……这样……太，太羞耻了啊啊！」`,
              );
              await era.printAndWait(
                `${target_name}被强制边为${master_name}口交着，边悲惨地感受着身后的${assi_name}抱着自己的腰，龟头抵在蜜穴上。`,
              );
              await era.print(
                `『哎嘿嘿，魔王大人说姐姐的嘴巴小穴现在和蜜穴已经没有区别了呢，都变成淫乱性器了！』`,
              );
              await era.printAndWait(
                `边嘲笑着${target_name}，${assi_name}边开始毫不留情地侵犯着姐姐的蜜穴。`,
              );
              await era.printAndWait(
                `「呜呜！好痛！不要那么激烈……唔呣……唔呣！？」`,
              );
              await era.printAndWait(
                `${master_name}抓着${target_name}的头，将阴茎插到了喉咙的最深处。`,
              );
              await era.printAndWait(
                `『嘿嘿，姐姐给我老实用喉咙小穴和蜜穴同时高潮吧！』`,
              );
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，连悲鸣都发不出，只能忍受着痛苦与折磨………`,
              );
            }
          } else if (
            game.train.三人PLAY主人部位 === 2 &&
            game.train.三人PLAY助手部位 === 3
          ) {
            if (era.get(`talent:${target}:85`)) {
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，用勃起的阴茎插入了肛门中。`,
              );
              await era.printAndWait(
                `「呜啊啊……不，不行啊……这样侵犯着……屁股……没有办法好好为${assi_name}口交了啊！」`,
              );
              await era.print(
                `『哎哎，姐姐别让魔王大人失望啊，连边被侵犯肛门边口交都做不好的话，可是要惩罚的哦』`,
              );
              await era.printAndWait(
                `被妹妹的话羞辱得脸红满面的${target_name}只能努力集中精神，吸吮着${assi_name}的${assi_weapon}。`,
              );
              await era.printAndWait(
                `「我，我会……努力的……唔呣……唔呣${heart(1)}呣呣……不，不行了……屁股好舒服${heart(1)}」`,
              );
              await era.printAndWait(
                `${master_name}欣赏着姐姐努力用嘴巴侍奉着妹妹的样子，更加兴奋的蹂躏，侵犯着${target_name}的肛门……`,
              );
            } else if (era.get(`talent:${target}:76`)) {
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，用勃起的阴茎插入了肛门中。`,
              );
              await era.printAndWait(
                `「呜啊……啊啊……这样……边口交，边被侵犯着肛门……感觉太棒了啊啊………」`,
              );
              await era.printAndWait(
                `${assi_name}用嫉恨的眼神看着边为自己口交，边一脸幸福的表情享受着被魔王大人肛交的${target_name}。`,
              );
              await era.print(
                `『哎哎……看姐姐这么享受，我都不知道是该嫉妒姐姐呢还是嫉妒魔王大人？喂，姐姐的嘴巴也不能松懈啊，好好地给人家口交啊！』`,
              );
              await era.printAndWait(
                `${assi_name}的话让${master_name}更加兴奋的蹂躏，侵犯着${target_name}的肛门……`,
              );
            } else {
              await era.printAndWait(
                `${target_name}被强制边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，用勃起的阴茎插入了肛门中。`,
              );
              await era.printAndWait(
                `「不，不要啊……饶了我吧……求求你们了……唔唔……唔呣呣？！」`,
              );
              await era.print(
                `『哎呀，姐姐的屁股那么舒服吗？怎么肛门一被魔王大人插进去，嘴巴和舌头就不会动了呢！给我好好口交啊！』`,
              );
              await era.printAndWait(
                `${assi_name}哼了一声，用${assi_weapon}开始侵犯，抽插着姐姐的嘴和喉咙。`,
              );
              await era.print(
                `『哼，能被我们3p，是姐姐你的福气，再这样一脸不高兴，魔王大人可就真的要不高兴了哦？』`,
              );
              await era.printAndWait(
                `${assi_name}的表情和语气让${master_name}忍不住笑了起来……`,
              );
            }
          } else if (
            game.train.三人PLAY主人部位 === 3 &&
            game.train.三人PLAY助手部位 === 2
          ) {
            if (era.get(`talent:${target}:85`)) {
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，坚挺的${assi_weapon}插入了肛门中。`,
              );
              await era.printAndWait(
                `「呜啊啊……不，不行啊……这样侵犯着……屁股……没有办法好好为魔王大人口交了啊！」`,
              );
              await era.print(
                `『哎哎，姐姐别让魔王大人失望啊，连边被侵犯肛门边口交都做不好的话，证明还缺乏调教啊${heart(1)}』`,
              );
              await era.printAndWait(
                `${assi_name}舔着嘴唇，继续激烈地侵犯着姐姐的后庭。`,
              );
              await era.printAndWait(
                `「我，我会……努力的……唔呣……唔呣${heart(1)}呣呣……不，不行了……屁股好舒服${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}集中精神，忍耐着肛门的快感，努力吸吮着${master_name}的阴茎…`,
              );
            } else if (era.get(`talent:${target}:76`)) {
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，坚挺的${assi_weapon}插入了肛门中。`,
              );
              await era.printAndWait(
                `「呜……呜啊啊……这样……太激烈了${heart(1)} 但是……好舒服……唔呣呣……唔唔${heart(1)}」`,
              );
              await era.print(
                `『哎呀呀，边被侵犯着肛门，边这么兴奋地吸着魔王大人的阴茎……姐姐真是变成淫乱便器了呢！』`,
              );
              await era.printAndWait(
                `${assi_name}边嘲笑着${target_name}，边前后动着腰，更激烈地侵犯着姐姐的肛门。`,
              );
              await era.printAndWait(
                `「不，不行了……舒服得……已经没法思考了……也没办法……好好口交了……只能，只能让魔王大人自己……动了${heart(1)}」`,
              );
              await era.printAndWait(
                `肛交的极度快感让${target_name}几乎无法集中精神，吸吮${master_name}阴茎的动作也停了下来……`,
              );
            } else {
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，坚挺的${assi_weapon}插入了肛门中。`,
              );
              await era.printAndWait(
                `「不，不要啊……饶了我吧……求求你们了……唔唔……唔呣呣？！」`,
              );
              await era.print(
                `『哎嘿嘿，这样明明很舒服才对，边被侵犯肛门，边吸吮魔王大人的阴茎，不是吗，姐姐♪』`,
              );
              await era.printAndWait(
                `${assi_name}边嘲笑着${target_name}，边前后动着腰，更激烈地侵犯着姐姐的肛门。`,
              );
              await era.print(
                `『唔哇哇……姐姐的肛门夹得这么紧……真的是名器啊！』`,
              );
              await era.printAndWait(
                `痛苦万分，又无力违抗的${target_name}只能边忍受着，边努力吸吮着的${master_name}的阴茎……`,
              );
            }
          }
        }
      }
      // CFLAG:TARGET:391  = 1（变量语义：CFLAG 族，TARGET:391）
      kojo.三人PLAY = 1;
      return 0;
    } else {
      if (assi_mao) {
        if (era.get(`talent:${target}:0`) === 1) {
          if (
            game.train.三人PLAY主人部位 === 1 &&
            game.train.三人PLAY助手部位 === 2
          ) {
            await era.printAndWait(
              `${master_name}毫不留情地夺走了${target_name}的处女`,
            );
            await era.printAndWait(
              `${assi_name}也兴奋不已地同时侵犯了${target_name}的肛门。`,
            );
            if (era.get(`talent:${target}:85`)) {
              await era.printAndWait(`「呜……啊啊……我的处女！」`);
              await era.printAndWait(
                `${target_name}被${master_name}和妹妹抱着夹在中间，破处的痛苦和前后两穴同时传来的快感交织在一起。`,
              );
              await era.print(
                `『啊啊……姐姐的肛门……太舒服了，舒服得我的小鸡鸡停不下来了啦！』`,
              );
              await era.printAndWait(
                `${assi_name}舔着嘴唇，激烈地侵犯着姐姐的后庭。`,
              );
              await era.printAndWait(
                `「啊啊……这样被夹击……一下子……就要去了啊啊啊！」`,
              );
            } else if (era.get(`talent:${target}:76`)) {
              await era.printAndWait(
                `「呜啊啊……两人的阴茎……这样同时插进来${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}感受着肛门和处女蜜穴同时被插入的异样快感。`,
              );
              await era.print(`『嘿嘿，姐姐，处女三明治的感觉如何啊？』`);
              await era.printAndWait(
                `${assi_name}嬉笑着，用阴茎激烈地侵犯着${target_name}的后庭。`,
              );
              await era.printAndWait(
                `「好舒服……这样好舒服${heart(1)}被魔王大人和${assi_name}的阴茎……同时在身体里搅动着${heart(1)}」`,
              );
            } else {
              await era.printAndWait(
                `「不，不行啊啊啊……要裂开了……真的会裂开的啊啊啊！」`,
              );
              await era.printAndWait(
                `处女蜜穴和肛门被同时贯穿的痛苦，让${target_name}的哀叫在调教室里回响着。`,
              );
              await era.print(
                `『别瞎喊了姐姐，吵死人了，学会好好享受我和魔王大人的阴茎吧，以后还要很多次的哦！』`,
              );
              await era.printAndWait(
                `${assi_name}舔着嘴唇，继续激烈地侵犯着姐姐的后庭。`,
              );
            }
          } else if (
            game.train.三人PLAY主人部位 === 2 &&
            game.train.三人PLAY助手部位 === 1
          ) {
            await era.printAndWait(
              `${assi_name}毫不留情地夺走了${target_name}的处女`,
            );
            await era.printAndWait(
              `${master_name}也兴奋不已地同时侵犯了${target_name}的肛门。`,
            );
            if (era.get(`talent:${target}:85`)) {
              await era.printAndWait(`「呜啊啊……我，我的第一次……啊啊啊！」`);
              await era.printAndWait(
                `${target_name}被${master_name}和妹妹抱着夹在中间，破处的痛苦和前后两穴同时传来的快感交织在一起。`,
              );
              await era.print(
                `『啊啊啊姐姐的第一次，归我了！！${assi_name}好高兴，好高兴！』`,
              );
              await era.printAndWait(
                `${assi_name}带着兴奋的表情，开始激烈地侵犯着着姐姐的处女蜜穴。`,
              );
              await era.printAndWait(
                `「嗯啊……那样……被两人同时侵犯……会不行的啊啊啊！」`,
              );
            } else if (era.get(`talent:${target}:76`)) {
              await era.printAndWait(
                `「呜啊啊……两人的阴茎……这样同时插进来${heart(1)} 好……好奇怪的感觉啊啊${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}感受着肛门和处女蜜穴同时被插入的异样快感。`,
              );
              await era.print(
                `『啊啊啊姐姐的第一次，归我了！！${assi_name}好高兴，好高兴${heart(1)}』`,
              );
              await era.printAndWait(
                `${assi_name}带着兴奋的表情，开始激烈地侵犯着着姐姐的处女蜜穴。`,
              );
              await era.printAndWait(
                `「好舒服……这样好舒服${heart(1)}被魔王大人和${assi_name}的阴茎……同时在身体里搅动着${heart(1)}」`,
              );
            } else {
              await era.print(
                `『啊啊啊姐姐的处女蜜穴……真是紧的让人无法忍受啊！』`,
              );
              await era.printAndWait(
                `「不，不行啊啊啊……要裂开了……真的会裂开的啊啊啊！」`,
              );
              await era.printAndWait(
                `处女蜜穴和肛门被同时贯穿的痛苦，让${target_name}的哀叫在调教室里回响着。`,
              );
              await era.print(
                `『别瞎喊了姐姐，吵死人了，学会好好享受我和魔王大人的阴茎吧，以后还要很多次的哦！』`,
              );
              await era.printAndWait(
                `${assi_name}舔着嘴唇，继续激烈地侵犯着姐姐的初经人事的蜜穴`,
              );
            }
          } else if (
            game.train.三人PLAY主人部位 === 1 &&
            game.train.三人PLAY助手部位 === 3
          ) {
            if (era.get(`talent:${target}:85`)) {
              await era.printAndWait(
                `「唔呣……唔呣……我的一次……奉献给魔王大人了啊啊啊${heart(1)} 呣呣${heart(1)}……」`,
              );
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              );
              await era.print(
                `『哎嘿嘿，姐姐的处女今天正式属于魔王大人了${heart(1)}』`,
              );
              await era.printAndWait(
                `${master_name}挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              );
              await era.printAndWait(
                `「啊啊啊……魔王大人……魔王大人，从今天开始，我，我就是你的人了啊啊${heart(1)} 」`,
              );
              await era.print(
                `『哎哎姐姐不要光顾着高兴，给我认真吸吮小鸡鸡啊${heart(1)}』`,
              );
              await era.printAndWait(
                `${target_name}${master_name}和${assi_name}当做性玩具一般，一前一后的侵犯着……`,
              );
            } else if (era.get(`talent:${target}:76`)) {
              await era.printAndWait(
                `「唔呣……唔呣……呜啊啊！？魔王大人……的阴茎……啊啊啊${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              );
              await era.print(
                `『哎嘿嘿，姐姐，被你最喜欢的魔王大人的阴茎破处的感觉如何呀${heart(1)}』`,
              );
              await era.printAndWait(
                `${master_name}挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              );
              await era.printAndWait(
                `「好舒服……唔呣……唔呣${heart(1)} 这样同时……侍奉两根阴茎……实在是太棒了唔唔${heart(1)}」`,
              );
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，身体在心里和生理的双重快感中颤抖着……`,
              );
            } else {
              await era.printAndWait(`「住，住手啊……唔呣……呜呜呜！」`);
              await era.printAndWait(
                `${target_name}边被强迫为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              );
              await era.printAndWait(`「不，不要啊啊！」`);
              await era.print(`『姐姐，嘴巴不许停下啊，给我好好吸吮啊！』`);
              await era.printAndWait(
                `${assi_name}抓着${target_name}的头，用${assi_weapon}强行侵犯着姐姐的喉咙。`,
              );
              await era.printAndWait(
                `身后的${master_name}挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              );
              await era.printAndWait(
                `「饶，饶了我吧，求你们了……唔唔……呣呣呣……！」`,
              );
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，连悲鸣都发不出，只能忍受着痛苦与折磨………`,
              );
            }
          } else if (
            game.train.三人PLAY主人部位 === 3 &&
            game.train.三人PLAY助手部位 === 1
          ) {
            if (era.get(`talent:${target}:85`)) {
              await era.printAndWait(
                `「呜呜……唔呣${heart(1)}！${assi_name}？！不，不可以……」`,
              );
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              );
              await era.print(
                `『啊嘿嘿，和魔王大人一起用阴茎把姐姐前后串起来了——姐姐的处女，我就收下了！』`,
              );
              await era.printAndWait(
                `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              );
              await era.printAndWait(
                `「不，不要啊……我是想留给……魔王大人的——唔唔……呣呣！」`,
              );
              await era.printAndWait(
                `${target_name}${master_name}和${assi_name}当做性玩具一般，一前一后的侵犯着……`,
              );
            } else if (era.get(`talent:${target}:76`)) {
              await era.printAndWait(
                `「唔呣……唔唔……我的处女……就这样……${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              );
              await era.print(
                `『啊啊，梦寐以求的姐姐的第一次，我就这么收下了${heart(1)}』`,
              );
              await era.printAndWait(
                `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              );
              await era.printAndWait(
                `像是在配合着${assi_name}的动作一样，${master_name}也将阴茎插入到了${target_name}的喉咙深处。`,
              );
              await era.printAndWait(
                `「唔呣……唔唔……${heart(1)} 这样……好舒服……唔唔……唔呣${heart(1)}」`,
              );
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，却感受到了心理和生理的双重快感……`,
              );
            } else {
              await era.printAndWait(`「住，住手啊……唔呣……呜呜呜！」`);
              await era.printAndWait(
                `${target_name}被强制边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，龟头抵在蜜穴上。`,
              );
              await era.print(
                `『嘿嘿嘿，姐姐的第一次就由我收下了！这样同时被侵犯着嘴巴和处女蜜穴，很舒服吧！』`,
              );
              await era.printAndWait(
                `「怎，怎么可能会舒服……呜呜呜……唔呣……呣呣呣！？」`,
              );
              await era.printAndWait(
                `${master_name}抓着${target_name}的头，将阴茎插到了喉咙的最深处。`,
              );
              await era.printAndWait(
                `身后的${assi_name}也无情地夺去了${target_name}的处女身。`,
              );
              await era.printAndWait(
                `「饶，饶了我吧，求你们了……唔唔……呣呣呣……！」`,
              );
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，连悲鸣都发不出，只能忍受着痛苦与折磨………`,
              );
            }
          } else if (
            game.train.三人PLAY主人部位 === 2 &&
            game.train.三人PLAY助手部位 === 3
          ) {
            if (era.get(`talent:${target}:85`)) {
              if (chara(target).system.肛门感觉 >= 3) {
                await era.printAndWait(
                  `「唔呣……唔呣……啊啊魔王大人，不，不能这样同时侵犯屁股啊啊！」`,
                );
                await era.print(
                  `『哎哎姐姐，肛交有那么舒服吗！怎么一被魔王大人侵犯屁股，嘴巴的动作就停下来了呢！真是的，还要人家自己动！』`,
                );
                await era.printAndWait(
                  `${assi_name}抱着${target_name}的脸，用自己双腿间的${assi_weapon}肆意地侵犯着姐姐的喉咙。`,
                );
                await era.printAndWait(
                  `「唔呣……唔呣……对，对不起，${assi_name}……因为一边口交一边肛交的感觉……太舒服了……整个人都要变得奇怪了啊啊${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}顺从地吸吮着${assi_name}的${assi_weapon}，边让${master_name}侵犯着自己敏感的肛门………`,
                );
              } else {
                await era.printAndWait(
                  `「唔呣……唔呣……啊啊魔王大人，不，不能这样同时侵犯屁股啊啊！！」`,
                );
                await era.print(
                  `『哎嘿嘿，姐姐现在已经能熟练地一边被侵犯肛门一边口交了呢，完全变成我和魔王大人的性奴了呀♪』`,
                );
                await era.printAndWait(
                  `被妹妹羞辱得面红耳赤的${target_name}，却依旧顺从地吸吮着${assi_name}股间的的${assi_weapon}。`,
                );
                await era.printAndWait(
                  `「不，不要说这种……害羞的话啊${heart(1)}唔呣……唔呣${heart(1)} 啊啊啊……整个人……都要变得奇怪了！」`,
                );
                await era.printAndWait(
                  `${master_name}欣赏着姐姐为妹妹口交侍奉的羞耻姿态，也兴奋地挺起腰，更加激烈地侵犯着${target_name}的肛门……`,
                );
              }
            } else if (era.get(`talent:${target}:76`)) {
              if (chara(target).system.肛门感觉 >= 3) {
                await era.printAndWait(
                  `「唔呣……唔呣……这样边吸吮着……阴茎……边被侵犯肛门……实在是……太舒服了啊呣呣${heart(1)}……不，不行了，屁股舒服的要去了啊啊${heart(1)}！」`,
                );
                await era.printAndWait(
                  `肛门的强烈快感让${target_name}更加兴奋地为${assi_name}口交着，整个人都忘乎所以了。`,
                );
                await era.print(
                  `『哎哎哎，姐姐已经这么淫荡了啊，完全变成我和魔王大人的性奴了呢！』`,
                );
                await era.printAndWait(
                  `兴奋不已的${assi_name}抓着${target_name}头发，更加激烈地侵犯着自己姐姐的喉咙，另一边${master_name}抽插肛门的节奏也加快了……`,
                );
              } else {
                await era.printAndWait(
                  `「呜啊啊……这样被同时侵犯着……肛门和嘴巴小穴……感觉好奇怪……但是好舒服啊啊」`,
                );
                await era.printAndWait(
                  `感受着肛门的快感，${target_name}更加兴奋地为自己的妹妹口交着`,
                );
                await era.print(
                  `『啊啊姐姐！姐姐！就这样彻底变成我和魔王大人的性奴吧！』`,
                );
                await era.printAndWait(
                  `兴奋不已的${assi_name}抓着${target_name}头发，更加激烈地侵犯着自己姐姐的喉咙，另一边${master_name}抽插肛门的节奏也加快了……`,
                );
              }
            } else {
              if (chara(target).system.肛门感觉 >= 3) {
                await era.printAndWait(
                  `「呜啊……不，不可以在口交的时候……侵犯屁股啊啊……但是……感觉好奇怪……好舒服……唔呣……唔呣」`,
                );
                await era.printAndWait(
                  `${target_name}把脸埋在妹妹的腿间，吸吮着${assi_name}的阴茎，然而肛门被${master_name}侵犯的快感很快就让她无法集中精神继续口交，只是无力地呻吟着`,
                );
                await era.print(
                  `『哎哎姐姐真没用，屁股再这么舒服，嘴巴的动作也不能停下来啊！！』`,
                );
                await era.printAndWait(
                  `「对，对不起……但是真的已经……唔呣……唔呣……呜呜！」`,
                );
                await era.printAndWait(
                  `话音未落，${assi_name}就已经强行把阴茎插到了${target_name}的喉咙深处，强行侵犯着。`,
                );
              } else {
                await era.printAndWait(
                  `「呜呜……求你们了……放过我吧……真的，真的不要两个人一起上啊……唔呣……呣呣？！」`,
                );
                await era.printAndWait(
                  `${target_name}被${master_name}持续侵犯着肛门的同时，被迫继续把脸埋在${assi_name}的腿间，吸吮着妹妹的阴茎。`,
                );
                await era.print(
                  `『呵呵呵，嘴上说着不喜欢，但是吸吮阴茎却很卖力啊，那么喜欢口交吗我的好姐姐？』`,
                );
                await era.printAndWait(
                  `${target_name}绝望地摇着头，忍耐着肛门被侵犯的不适感，边屈服地为妹妹口交着。`,
                );
              }
            }
          } else if (
            game.train.三人PLAY主人部位 === 3 &&
            game.train.三人PLAY助手部位 === 2
          ) {
            if (era.get(`talent:${target}:85`)) {
              if (chara(target).system.肛门感觉 >= 3) {
                await era.printAndWait(
                  `「请……请两位随意地侵犯${target_name}的肛门和嘴巴小穴吧${heart(1)} ……唔呣？！……唔唔……呣呣呣${heart(1)} 」`,
                );
                await era.print(
                  `『比比看看看是我先让姐姐的屁股高潮，还是姐姐先用嘴巴让魔王大人射精吧～加油啊姐姐♪』`,
                );
                await era.printAndWait(
                  `${assi_name}用手指肆意地玩弄了一会儿${target_name}的肛门，然后用自己双腿间的${assi_weapon}开始持续地侵犯着姐姐的后庭。`,
                );
                await era.printAndWait(
                  `「呜呣呣${heart(1)} 好，好舒服啊啊啊${heart(1)} 边吸吮着……魔王大人的阴茎……边被妹妹侵犯肛门${heart(1)}……不行了……已经舒服得没有办法思考了啊呣呣${heart(1)}！」`,
                );
                await era.printAndWait(
                  `${master_name}欣赏着${target_name}被自己的亲妹妹侵犯肛门的下流姿态，边用${master_weapon}侵犯着${target_name}的喉咙深处……`,
                );
              } else {
                await era.printAndWait(
                  `「呜……啊啊啊，不，不可以啊……这样被侵犯屁股的话……没有办法……好好为魔王大人口交了唔呣呣！」`,
                );
                await era.print(
                  `『这样不行啊姐姐，不管是被侵犯肛门还是侵犯小穴，口交都不能停下来，这可是作为性奴的基本功呢♪』`,
                );
                await era.printAndWait(
                  `边羞辱着自己的姐姐，${assi_name}边用${assi_weapon}更加激烈地侵犯着${target_name}的后庭。`,
                );
                await era.printAndWait(
                  `「不，不要说这种……害羞的话啊${heart(1)}唔呣……唔呣${heart(1)} 啊啊啊……整个人……都要变得奇怪了！」`,
                );
                await era.printAndWait(
                  `${master_name}欣赏着${target_name}被自己妹妹羞辱的姿态，更加兴奋的侵犯着${target_name}的嘴巴和喉咙。`,
                );
              }
            } else if (era.get(`talent:${target}:76`)) {
              if (chara(target).system.肛门感觉 >= 3) {
                await era.printAndWait(
                  `「来吧，魔王大人，还有${assi_name}……请一起侵犯${target_name}淫乱的肛门性器和嘴巴小穴吧……人家已经等不及了啦${heart(1)}」`,
                );
                await era.printAndWait(
                  `肛门被侵犯的极度快感，让${target_name}整个人都颤抖了起来，更加兴奋而积极地吸吮着${master_name}的阴茎。`,
                );
                await era.print(
                  `『啊啊……姐姐的肛门真的被魔王大人调教成名器了啊啊！侵犯起来好舒服！！』`,
                );
                await era.printAndWait(
                  `「是……是啊${heart(1)} 姐姐的……肛门就是……专门服务${assi_name}和魔王大人的淫乱性器啊啊${heart(1)} 唔呣……唔呣……唔唔唔${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}淫乱的话语激起了${assi_name}和${master_name}的兴致，更加激烈地一前一后侵犯着${target_name}……`,
                );
              } else {
                await era.printAndWait(
                  `「呜啊啊……居，居然……要边被侵犯肛门……边为魔王大人口交${heart(1)}……不过算了……这样也很舒服就是了——唔呣呣！？呣呣呣」`,
                );
                await era.printAndWait(
                  `${target_name}身体颤抖着，完全沉醉在肛交的快感之中，嘴也更加热情地吸吮着${master_name}的阴茎。`,
                );
                await era.print(
                  `『哎嘿嘿，姐姐完全变成淫乱性奴了呢，真是变态，我怎么会有你这样的姐姐！』`,
                );
                await era.printAndWait(
                  `「是……是啊……姐姐是${assi_name}和魔王大人的淫乱性奴……请随意地把姐姐……侵犯到坏掉吧啊啊啊${heart(1)}」`,
                );
                await era.printAndWait(
                  `被${target_name}不知廉耻的宣言刺激得更加兴奋的${assi_name}和${master_name}，更加激烈地侵犯，抽插着${target_name}的喉咙和肛门……`,
                );
              }
            } else {
              if (chara(target).system.肛门感觉 >= 3) {
                await era.printAndWait(
                  `「呜啊……不，不可以在口交的时候……侵犯屁股啊啊……但是……感觉好奇怪……好舒服……唔呣……唔呣……啊啊啊」`,
                );
                await era.printAndWait(
                  `敏感的肛门传来的快感让${target_name}几乎无法忍耐，大声地呻吟了起来，连为${master_name}口交的动作都停了下来。`,
                );
                await era.print(
                  `『没用的姐姐，好好给魔王大人口交啊，难道你想挨罚吗？！♪』`,
                );
                await era.printAndWait(
                  `「对，对不起……我会好好……吸吮的……唔呣……唔呣……啊啊啊……不，不行了，屁股……真的不行了，舒服得……要去了啊啊啊${heart(1)}」`,
                );
                await era.printAndWait(
                  `已经被调教成性器的肛门依旧被自己的妹妹毫不留情地侵犯着，快感已经逐渐淹没了${target_name}`,
                );
                await era.printAndWait(
                  `几乎无法思考的${target_name}只能本能地搂着${master_name}的腰，吸吮着口中的阴茎`,
                );
              } else {
                await era.printAndWait(
                  `「呜呜……求你们了……放过我吧……真的，真的不要两个人一起上啊……唔呣……呣呣？！」`,
                );
                await era.printAndWait(
                  `完全无视了${target_name}的哀求，${assi_name}和${master_name}开始一前一后同时侵犯着${target_name}的肛门和嘴。`,
                );
                await era.print(
                  `『啊啊……姐姐的淫乱屁股小穴夹得这么紧，好舒服啊！』`,
                );
                await era.printAndWait(
                  `「呜呜……饶了我吧……真的，真的会坏掉的……唔呣！？唔唔……唔呣……」`,
                );
                await era.printAndWait(
                  `${target_name}只能拼命忍耐着肛门被侵犯的不适，同时竭力吸吮着${master_name}的阴茎……直到两人满意为止`,
                );
              }
            }
          }
        } else {
          if (
            game.train.三人PLAY主人部位 === 1 &&
            game.train.三人PLAY助手部位 === 2
          ) {
            if (era.get(`talent:${target}:85`)) {
              if (
                chara(target).system.私处感觉 >= 3 &&
                chara(target).system.肛门感觉 >= 3
              ) {
                await era.printAndWait(
                  `「请，请尽情地侵犯${target_name}的小穴吧……魔王大人${heart(1)} 什么……${assi_name}也要一起么……当，当然可以……」`,
                );
                await era.printAndWait(
                  `${target_name}被${master_name}和妹妹抱在中间，同时侵犯着蜜穴和肛门，双重的快感瞬间将${target_name}淹没了。`,
                );
                await era.print(
                  `『唔哇哇……姐姐的淫乱肛门……完全变成性器了呢！』`,
                );
                await era.printAndWait(
                  `兴奋不已的${assi_name}挺着腰，激烈地侵犯着姐姐的肛门。`,
                );
                await era.printAndWait(
                  `「呜呜……啊啊啊……不，不行了……舒服得已经没有办法思考了……魔王大人，还有${assi_name}……请尽情地把${target_name}侵犯得一塌糊涂吧啊啊啊！」`,
                );
              } else {
                await era.printAndWait(
                  `「哎哎？要，要两个人一起吗……是叫做三明治什么的玩法吗${heart(1)}」`,
                );
                await era.printAndWait(
                  `被夹在中间同时侵犯着肛门和蜜穴，${target_name}只能拼命忍耐着强烈的快感。`,
                );
                await era.print(
                  `『唔哇哇……姐姐的淫乱肛门好紧好舒服……真的有成为名器的潜质呢！』`,
                );
                await era.printAndWait(
                  `${assi_name}嬉笑着，挺着腰，和${master_name}一同更加激烈地侵犯着${target_name}的肛门和蜜穴。`,
                );
                await era.printAndWait(
                  `「呜……啊啊……不，不可以这么激烈啊……会，会坏掉的${heart(1)}！」`,
                );
              }
            } else if (era.get(`talent:${target}:76`)) {
              if (
                chara(target).system.私处感觉 >= 3 &&
                chara(target).system.肛门感觉 >= 3
              ) {
                await era.printAndWait(
                  `「哎哎，要两人一起上？其实人家早已经等不及了啦${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}被${master_name}和妹妹抱在中间，同时侵犯着蜜穴和肛门，双重的快感瞬间将${target_name}淹没，只剩下淫浪的娇喘。`,
                );
                await era.print(
                  `『哎哎，姐姐真是贪心啊，居然一次要两人才能满足！』`,
                );
                await era.printAndWait(
                  `兴奋不已的${assi_name}挺着腰，激烈地侵犯着姐姐的肛门。`,
                );
                await era.printAndWait(
                  `「好，好舒服……太舒服了${heart(1)}都怪你们，把姐姐调教得……不做爱就活不下去了啊啊啊${heart(1)}」`,
                );
              } else {
                await era.printAndWait(
                  `「哎哎……被，被两人的阴茎这样一起侵犯……呜啊啊${heart(1)}」`,
                );
                await era.printAndWait(
                  `肛门和蜜穴被同时插入让${target_name}发出了灼热的呻吟。`,
                );
                await era.print(
                  `『哎嘿嘿，姐姐的淫乱肛门好紧啊，有继续开发的必要呢！魔王大人，让我们一起把姐姐的前后两穴都弄得乱七八糟吧${heart(1)}』`,
                );
                await era.printAndWait(
                  `${assi_name}嬉笑着，挺着腰，和${master_name}一同更加激烈地侵犯着${target_name}的肛门和蜜穴。`,
                );
                await era.printAndWait(
                  `「嗯啊……啊啊啊……请，请尽情地……把${target_name}侵犯到坏掉吧${heart(1)}」`,
                );
              }
            } else {
              if (
                chara(target).system.私处感觉 >= 3 &&
                chara(target).system.肛门感觉 >= 3
              ) {
                await era.print(
                  `「呜……呜啊啊……不，不可以这样同时……侵犯屁股和小穴！呜呜……可，可是……好舒服……真的好舒服啊啊」`,
                );
                await era.printAndWait(
                  `${target_name}被${master_name}和妹妹抱在中间，同时侵犯着蜜穴和肛门，双重的快感瞬间将${target_name}淹没了。`,
                );
                await era.print(
                  `『哎嘿嘿，姐姐准备好了吗，接下来才是开始呢！』`,
                );
                await era.printAndWait(
                  `${assi_name}舔着嘴唇，动起腰，开始和${master_name}一同激烈地侵犯着${target_name}的肛门和蜜穴。`,
                );
                await era.printAndWait(
                  `「太，太激烈了……姐姐会……会坏掉的啊啊……！」`,
                );
              } else {
                await era.printAndWait(
                  `「两，两个人一起……不，不可以啊……那，那样会坏掉的……真的会坏掉的！」`,
                );
                await era.printAndWait(
                  `${target_name}似乎还无法适应如此激烈的玩法，痛苦地哀鸣了起来。`,
                );
                await era.print(
                  `『加油啊姐姐，在你在两穴同时高潮之前，我们可是不会停下的哦♪』`,
                );
                await era.printAndWait(
                  `${assi_name}带着恶意的笑容，舔着嘴角，更加激烈地侵犯着${target_name}的肛门………`,
                );
              }
            }
          } else if (
            game.train.三人PLAY主人部位 === 2 &&
            game.train.三人PLAY助手部位 === 1
          ) {
            if (era.get(`talent:${target}:85`)) {
              if (
                chara(target).system.私处感觉 >= 3 &&
                chara(target).system.肛门感觉 >= 3
              ) {
                await era.printAndWait(
                  `「嗯啊啊……魔，魔王大人……这样激烈地侵犯着……我的肛门${heart(1)}小穴……也被${assi_name}一起侵犯了……感觉好奇怪……但是好舒服啊啊啊${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}被${master_name}和妹妹抱在中间，同时侵犯着爱液泛滥的蜜穴和肛门，双重的快感瞬间将${target_name}淹没，只剩下甘甜的娇喘。`,
                );
                await era.print(
                  `『呜哇啊，性奴姐姐的小穴已经被魔王大人开发的……这么棒了！』`,
                );
                await era.printAndWait(
                  `兴奋不已的${assi_name}挺起腰，激烈地侵犯着${target_name}的蜜穴。`,
                );
                await era.printAndWait(
                  `「呜啊……嗯啊啊${heart(1)}……好舒服……好舒服啊啊${heart(1)} 这样被同时侵犯着……一下子……就要去了啊啊${heart(1)}」`,
                );
              } else {
                await era.printAndWait(
                  `「请，请稍微温柔一点……拜托了……还有${assi_name}…不要兴奋成那个样子啊！」`,
                );
                await era.printAndWait(
                  `话音未落，${assi_name}已经迫不及待地插入了姐姐的蜜穴之中。`,
                );
                await era.print(
                  `『哼哼，温柔，别开玩笑了！我和魔王大人今天就是打算把姐姐侵犯到彻底坏掉的呀！』`,
                );
                await era.printAndWait(
                  `${assi_name}坏笑着，挺起腰，配合着${master_name}的动作，开始一同激烈地侵犯着${target_name}的蜜穴和肛门。`,
                );
                await era.printAndWait(
                  `「呜啊啊……太，太激烈了……感，感觉好奇怪……整个人……都要变得奇怪了啊啊！」`,
                );
              }
            } else if (era.get(`talent:${target}:76`)) {
              if (
                chara(target).system.私处感觉 >= 3 &&
                chara(target).system.肛门感觉 >= 3
              ) {
                await era.printAndWait(
                  `「哈啊……哈啊……两人的阴茎……一起在身体里${heart(1)}……感觉实在是太棒了啊啊啊${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}被${master_name}和妹妹抱在中间，同时侵犯着蜜穴和肛门，双重的快感瞬间将${target_name}淹没，只剩下淫浪的娇喘。`,
                );
                await era.print(
                  `『给我用屁股和小穴同时高潮吧，淫乱的性奴姐姐！』`,
                );
                await era.printAndWait(
                  `兴奋不已${assi_name}挺起腰，配合着${master_name}的动作，开始一同激烈地侵犯着${target_name}的蜜穴和肛门。`,
                );
                await era.printAndWait(
                  `「呜啊……嗯啊啊……好舒服……实在是太舒服了${heart(1)} 真的要……高潮得……一塌糊涂了啊啊啊${heart(1)}」`,
                );
              } else {
                await era.printAndWait(
                  `「咦咦，要两个人一起上吗……好，好吧。其实还有点……期待呢${heart(1)}」`,
                );
                await era.printAndWait(
                  `蜜穴和肛门被同时插入，${target_name}忍不住灼热地呻吟了起来。`,
                );
                await era.print(
                  `『呼呼，姐姐的淫乱小穴……属于人家的啦啦啦！给我高潮吧！』`,
                );
                await era.printAndWait(
                  `${assi_name}嬉笑着，挺起腰，配合着${master_name}的动作，开始一同激烈地侵犯着${target_name}的蜜穴和肛门。`,
                );
                await era.printAndWait(
                  `「呜……呜啊啊${heart(1)} ${assi_name}！魔王大人！请，请尽情地……把${target_name}侵犯到坏掉吧${heart(1)}」`,
                );
              }
            } else {
              if (
                chara(target).system.私处感觉 >= 3 &&
                chara(target).system.肛门感觉 >= 3
              ) {
                await era.print(
                  `「呜……呜啊啊……不，不可以这样同时……侵犯屁股和小穴！呜呜，可，可是……为什么……感觉好舒服${heart(1)}…」`,
                );
                await era.printAndWait(
                  `${target_name}被${master_name}和妹妹抱在中间，同时侵犯着蜜穴和肛门，双重的快感瞬间将${target_name}淹没，只剩下灼热的呻吟。`,
                );
                await era.print(
                  `『嘴上说着不行，下面已经夹得这么紧了！被两人同时侵犯，更兴奋了吗，我的变态姐姐！』`,
                );
                await era.printAndWait(
                  `兴奋不已${assi_name}挺起腰，配合着${master_name}的动作，开始一同激烈地侵犯着${target_name}的蜜穴和肛门。`,
                );
                await era.printAndWait(
                  `「才，才不是……变态！呜……呜啊啊${heart(1)}……可，可是……真的好舒服……舒服得……不行了啊啊啊！」`,
                );
              } else {
                await era.printAndWait(
                  `「放，放开我啊……两个人一起……这种事情……怎么可以啊啊啊！」`,
                );
                await era.printAndWait(
                  `${target_name}似乎还无法适应如此激烈的玩法，痛苦地哀鸣了起来。`,
                );
                await era.print(
                  `『说什么呢姐姐，我们可是打算侵犯到姐姐两个淫穴一起高潮呢♪』`,
                );
                await era.printAndWait(
                  `${assi_name}带着恶意的笑容，舔着嘴角，更加激烈地侵犯着${target_name}的蜜穴………`,
                );
              }
            }
          } else if (
            game.train.三人PLAY主人部位 === 1 &&
            game.train.三人PLAY助手部位 === 3
          ) {
            if (era.get(`talent:${target}:85`)) {
              if (chara(target).system.私处感觉 >= 3) {
                await era.printAndWait(
                  `「呜……呜啊啊……这样边被魔王大人……侵犯着${heart(1)} ……边口交……感觉${assi_name}的阴茎……更加美味了啊啊啊${heart(1)} 唔呣……唔呣……唔唔唔♪」`,
                );
                await era.printAndWait(
                  `被${master_name}抽插着爱液泛滥的蜜穴、${target_name}更加兴奋不已地舔吮着妹妹的阴茎。`,
                );
                await era.print(
                  `『嘿嘿，被我和魔王大人一起侵犯，身为性奴的姐姐一定感觉很幸福吧？』`,
                );
                await era.printAndWait(
                  `${target_name}满脸通红地边点头，边继续努力地为妹妹口交着。`,
                );
                await era.printAndWait(
                  `「唔呣……唔呣${heart(1)}…… 的，的确是这样啊啊……能被魔王大人和${assi_name}这样疼爱……真的是太幸福了${heart(1)} 」`,
                );
              } else {
                await era.printAndWait(
                  `「唔呣……唔呣……${assi_name}的阴茎……味道好好……好喜欢${heart(1)} 还有……魔王大人，请吧……人家已经准备好了${heart(1)}」`,
                );
                await era.printAndWait(
                  `正在为${assi_name}口交的${target_name}，撅起的臀部一扭一扭地诱惑着${master_name}。`,
                );
                await era.print(
                  `『哎嘿嘿，姐姐最喜欢的魔王大人的阴茎要进来了哦${heart(1)}』`,
                );
                await era.printAndWait(
                  `${master_name}挺起腰，开始侵犯着${target_name}已经爱液泛滥的蜜穴。`,
                );
                await era.printAndWait(
                  `「呜啊……嗯啊啊${heart(1)}……魔王大人……一下子就顶到最里面了……好厉害啊啊啊${heart(1)}！」`,
                );
                await era.printAndWait(
                  `${assi_name}也抱着${target_name}的脸，用阴茎顶着姐姐的口腔。`,
                );
                await era.print(
                  `『不要光顾着享受，嘴巴也要好好地给我吸吮啊！』`,
                );
                await era.printAndWait(
                  `${target_name}就这样被${master_name}和${assi_name}当做性玩具一般，一前一后的侵犯着……`,
                );
              }
            } else if (era.get(`talent:${target}:76`)) {
              if (chara(target).system.私处感觉 >= 3) {
                await era.printAndWait(
                  `「呜……啊啊啊……蜜穴……被魔王大人的阴茎……塞得满满的${heart(1)} 这样……边做爱……边口交……实在是太舒服了啊唔唔……唔呣……唔呣${heart(1)}」`,
                );
                await era.print(
                  `『呜哇哇……姐姐在被魔王大人侵犯的时候……口交居然比平时还厉害了${heart(1)}』`,
                );
                await era.printAndWait(
                  `${assi_name}感受着姐姐激烈地吸吮着自己的阴茎，忍不住也呻吟了起来。`,
                );
                await era.printAndWait(
                  `「啊啊啊……魔王大人……更加激烈地侵犯……${target_name}的淫穴吧${heart(1)} 唔呣……唔呣……唔唔唔${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}含糊不清地娇喘着，享受着心理和生理的双重快感……`,
                );
              } else {
                await era.printAndWait(
                  `「呜啊啊……在，在人家口交的时候……侵犯小穴……魔王大人……太狡猾了${heart(1)}」`,
                );
                await era.printAndWait(
                  `在${target_name}吸吮着自己妹妹的阴茎的时候，${master_name}趁机抱住了${target_name}的腰，将龟头抵入了蜜穴中。`,
                );
                await era.print(
                  `『哎嘿嘿，姐姐一会儿享受的时候，嘴巴记得不要停下来哦♪』`,
                );
                await era.printAndWait(
                  `${master_name}挺着腰，开始激烈地侵犯着${target_name}爱液泛滥的蜜穴。`,
                );
                await era.printAndWait(
                  `「唔呣呣……唔唔${heart(1)} 不，不行了……这样……太舒服了啊啊啊${heart(1)}」`,
                );
                await era.print(`『啊啊……姐姐的口交……太厉害了……好舒服啊啊！』`);
                await era.print(
                  `被两人的阴茎一前一后侵犯着的${target_name}，因为心里和生理的双重快感而含糊不清地呻吟着………`,
                );
              }
            } else {
              if (chara(target).system.私处感觉 >= 3) {
                await era.printAndWait(
                  `「饶，饶了我吧……不，不可以这样同时侵犯嘴巴和小穴啊……唔呣呣……唔呣……」`,
                );
                await era.printAndWait(
                  `敏感的小穴被${master_name}肆意地抽插着，${target_name}只能拼命忍耐着快感，同时还要努力为妹妹口交。`,
                );
                await era.print(
                  `『哎嘿嘿，姐姐真不错呢，被魔王大人插得那么舒服，嘴巴还没有松懈♪』`,
                );
                await era.printAndWait(
                  `边嘲弄着${target_name}，${assi_name}边用阴茎继续侵犯着姐姐的喉咙。`,
                );
                await era.printAndWait(
                  `「唔呣呣……唔呣呣……太，太激烈了${heart(1)}…呜啊啊……被魔王大人……顶到子宫口了唔呣呣呣！」`,
                );
                await era.printAndWait(
                  `蜜穴传来的极度快感让${target_name}几乎无法思考………`,
                );
              } else {
                await era.printAndWait(
                  `「不，不可以在口交的时候……侵犯小穴啊……唔呣呣……呣呣……」`,
                );
                await era.printAndWait(
                  `正在为${assi_name}口交的${target_name}，蜜穴突然被侵犯，一时惊慌失措。`,
                );
                await era.print(
                  `『别光顾着享受啊，笨蛋姐姐，给我好好口交啊！』`,
                );
                await era.printAndWait(
                  `「不，不行啊……这样的事情……呜呜……唔呣！？」`,
                );
                await era.printAndWait(
                  `${assi_name}不满地抓着${target_name}的头发，用勃起的阴茎强行侵犯着姐姐的喉咙`,
                );
                await era.printAndWait(
                  `被两人的阴茎一前一后侵犯着的${target_name}，连悲鸣都发不出，只能忍受着痛苦与折磨………`,
                );
              }
            }
          } else if (
            game.train.三人PLAY主人部位 === 3 &&
            game.train.三人PLAY助手部位 === 1
          ) {
            if (era.get(`talent:${target}:85`)) {
              if (chara(target).system.私处感觉 >= 3) {
                await era.printAndWait(
                  `「唔呣呣？在……在口交的时候……侵犯小穴……感觉……好奇怪……但是好舒服啊啊啊${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}一边被妹妹侵犯着，一边把脸埋在${master_name}双腿之间，努力地吸吮着阴茎。`,
                );
                await era.print(
                  `『哎嘿嘿，姐姐不知不觉之间已经完全适应性奴的身份了呢${heart(1)}』`,
                );
                await era.printAndWait(
                  `${assi_name}带着享受的表情，激烈地侵犯着${target_name}的蜜穴。`,
                );
                await era.printAndWait(
                  `「呜……呣呣……不，不要对姐姐恶作剧了啦……没有办法好好……为魔王大人口交了${heart(1)} 对，对不起……魔王大人……因为实在是太舒服了${heart(1)}我，我会努力的……咕呣……咕呣……呣呣呣」`,
                );
                await era.printAndWait(
                  `${target_name}自己积极的寻求着阴茎、被${master_name}和${assi_name}前后一起侵犯着………`,
                );
              } else {
                await era.printAndWait(
                  `「不，不可以……在这个时候……侵犯小穴啊……会没有办法好好为魔王大人口交的！」`,
                );
                await era.printAndWait(
                  `正在为${master_name}口交的${target_name}，感受着身后的${assi_name}抱着自己的腰，龟头顶入了蜜穴之中。`,
                );
                await era.print(
                  `『其实人家还有点嫉妒姐姐呢，能同时享受两根阴茎……唔哇哇……姐姐的小穴好紧好舒服♪』`,
                );
                await era.printAndWait(
                  `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的蜜穴。`,
                );
                await era.printAndWait(
                  `「呜……呜啊啊……不，不能顶得这么深……唔呣呣……这样……边口交边被侵犯……感觉……整个人都要变得奇怪了啊啊——唔呣……呣呣呣……呣呣♪」`,
                );
                await era.printAndWait(
                  `${target_name}被${master_name}和${assi_name}当做性玩具一般，一前一后的侵犯着……`,
                );
              }
            } else if (era.get(`talent:${target}:76`)) {
              if (chara(target).system.私处感觉 >= 3) {
                await era.printAndWait(
                  `「唔呣……唔呣${heart(1)}……这样……边口交……边被侵犯小穴……感觉……太舒服了啊啊啊${heart(1)}」`,
                );
                await era.printAndWait(
                  `正在为${master_name}口交的${target_name}，感受着身后的${assi_name}抱着自己的腰，龟头顶入了爱液泛滥的敏感蜜穴之中。`,
                );
                await era.print(
                  `『唔哇哇……原来姐姐已经变得这么淫乱了……魔王大人真是调教有方啊！』`,
                );
                await era.printAndWait(
                  `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的蜜穴。`,
                );
                await era.printAndWait(
                  `${master_name}也配合着${assi_name}的动作，将阴茎顶到了${target_name}喉咙深处，开始抽插起来。`,
                );
                await era.printAndWait(
                  `「唔呣呣？！唔呣……唔呣……好，好舒服${heart(1)}……舒服得……已经没有办法思考了啊呣呣……呣呣${heart(1)}」`,
                );
                await era.printAndWait(
                  `被两人的阴茎一前一后侵犯着的${target_name}，身体在心里和生理的双重快感中颤抖着……`,
                );
              } else {
                await era.printAndWait(
                  `「呜啊啊……要边口交边被侵犯小穴了……好期待${heart(1)}」`,
                );
                await era.printAndWait(
                  `正在为${assi_name}口交的${master_name}，撅起的臀部一扭一扭地诱惑着${target_name}。`,
                );
                await era.print(
                  `『看来姐姐已经准备好了呢……接下来就是要侵犯到姐姐失神为止喽！！』`,
                );
                await era.printAndWait(
                  `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的蜜穴。`,
                );
                await era.printAndWait(
                  `${master_name}也配合着${assi_name}的动作，将阴茎顶到了${target_name}喉咙深处，开始抽插起来。`,
                );
                await era.printAndWait(
                  `「唔呣呣……唔唔${heart(1)} 这样好舒服……比想象中的还要舒服啊啊……呣呣……呣呣${heart(1)}」`,
                );
                await era.printAndWait(
                  `被两人的阴茎一前一后侵犯着的${target_name}，身体在难以言喻的快感中颤抖着……`,
                );
              }
            } else {
              if (chara(target).system.私处感觉 >= 3) {
                await era.printAndWait(
                  `「饶，饶了我吧……不，不可以这样同时侵犯嘴巴和小穴啊……唔呣呣……唔呣……」`,
                );
                await era.printAndWait(
                  `${target_name}嘴里含着${master_name}的阴茎，拼命忍耐着被${assi_name}从身后侵犯的强烈快感。`,
                );
                await era.print(
                  `『不能光顾享受啊姐姐，要好好用你的淫乱嘴巴小穴服务魔王大人，听到了没！』`,
                );
                await era.printAndWait(
                  `「对，对不起……我，我会好好用嘴巴做的……唔呣……唔呣……唔唔！」`,
                );
                await era.printAndWait(
                  `不耐烦的${master_name}抓着${target_name}的头发，将阴茎顶到了喉咙深处，肆意抽插着。`,
                );
                await era.print(
                  `『哼，魔王大人已经不满意了，做好受惩罚的觉悟吧笨蛋姐姐！』`,
                );
                await era.printAndWait(
                  `${target_name}泪流满面，却又无可奈何地忍耐着两人的侵犯和肆虐………`,
                );
              } else {
                await era.printAndWait(
                  `「呜呜呜……求求你们了……饶了我吧……真的……唔呣呣？！呣呣……唔呣……」`,
                );
                await era.printAndWait(
                  `对${target_name}的求饶无动于衷，${assi_name}和${master_name}开始一前一后，毫不留情地侵犯着${target_name}。`,
                );
                await era.print(
                  `『啊哈哈……魔王大人好像很喜欢姐姐的淫乱嘴巴小穴呢♪』`,
                );
                await era.printAndWait(
                  `「饶，饶了我吧……不能呼吸了……唔呣……呣呣……呣呣……」`,
                );
                await era.printAndWait(
                  `${master_name}不满地抓着${target_name}的头发，用勃起的阴茎强行在喉咙里抽插着`,
                );
                await era.print(
                  `『哎嘿，姐姐的喉咙小穴被魔王大人塞满了呢，人家有点嫉妒呢！』`,
                );
                await era.printAndWait(
                  `${target_name}怎么挣扎都无法挣脱，只能泪流满面地任由两人激烈地侵犯着自己……`,
                );
              }
            }
          } else if (
            game.train.三人PLAY主人部位 === 2 &&
            game.train.三人PLAY助手部位 === 3
          ) {
            if (era.get(`talent:${target}:85`)) {
              if (chara(target).system.肛门感觉 >= 3) {
                await era.printAndWait(
                  `「唔呣……唔呣……啊啊魔王大人，不，不能这样同时侵犯屁股啊啊！！」`,
                );
                await era.print(
                  `『哎哎姐姐，肛交有那么舒服吗！怎么一被魔王大人侵犯屁股，嘴巴的动作就停下来了呢！真是的，还要人家自己动！！』`,
                );
                await era.printAndWait(
                  `${assi_name}抱着${target_name}的脸，用自己双腿间的${assi_weapon}肆意地侵犯着姐姐的喉咙。`,
                );
                await era.printAndWait(
                  `「唔呣……唔呣……对，对不起，${assi_name}……因为一边口交一边肛交的感觉……太舒服了……整个人都要变得奇怪了啊啊${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}拼命忍耐着快感，继续努力地吸吮着${assi_name}的${assi_weapon}………`,
                );
              } else {
                await era.printAndWait(
                  `「唔呣……唔呣……啊啊魔王大人，不，不能这样同时侵犯屁股啊啊！！」`,
                );
                await era.print(
                  `『哎嘿嘿，姐姐现在已经能熟练地一边被侵犯肛门一边口交了呢，完全变成我和魔王大人的性奴了呀♪♪』`,
                );
                await era.printAndWait(
                  `被妹妹羞辱得面红耳赤的${target_name}，却依旧顺从地吸吮着${assi_name}股间的的${assi_weapon}。`,
                );
                await era.printAndWait(
                  `「不，不要说这种……害羞的话啊${heart(1)}唔呣……唔呣${heart(1)} 啊啊啊……整个人……都要变得奇怪了！」`,
                );
                await era.printAndWait(
                  `${master_name}欣赏着姐姐为妹妹口交侍奉的淫乱姿态，也兴奋地挺起腰，更加激烈地侵犯着${target_name}的肛门……`,
                );
              }
            } else if (era.get(`talent:${target}:76`)) {
              if (chara(target).system.肛门感觉 >= 3) {
                await era.printAndWait(
                  `「唔呣……唔呣……这样边吸吮着……阴茎……边被侵犯肛门……实在是……太舒服了啊呣呣${heart(1)}……不，不行了，屁股舒服的要去了啊啊${heart(1)}！」`,
                );
                await era.printAndWait(
                  `肛门的强烈快感让${target_name}更加兴奋地为${assi_name}口交着，整个人都忘乎所以了。`,
                );
                await era.print(
                  `『哎哎哎，姐姐已经这么淫荡了啊，完全变成我和魔王大人的性奴了呢！』`,
                );
                await era.printAndWait(
                  `兴奋不已的${assi_name}抓着${target_name}头发，更加激烈地侵犯着自己姐姐的喉咙，另一边${master_name}抽插肛门的节奏也加快了……`,
                );
              } else {
                await era.printAndWait(
                  `「呜啊啊……这样被同时侵犯着……肛门和嘴巴小穴……感觉好奇怪……但是好舒服啊啊」`,
                );
                await era.printAndWait(
                  `感受着肛门的快感，${target_name}更加兴奋地为自己的妹妹口交着`,
                );
                await era.print(
                  `『啊啊姐姐！姐姐！就这样彻底变成我和魔王大人的性奴吧！』`,
                );
                await era.printAndWait(
                  `兴奋不已的${assi_name}抓着${target_name}头发，更加激烈地侵犯着自己姐姐的喉咙，另一边${master_name}抽插肛门的节奏也加快了……`,
                );
              }
            } else {
              if (chara(target).system.肛门感觉 >= 3) {
                await era.printAndWait(
                  `「呜啊……不，不可以在口交的时候……侵犯屁股啊啊……但是……感觉好奇怪……好舒服……唔呣……唔呣」`,
                );
                await era.printAndWait(
                  `${target_name}把脸埋在妹妹的腿间，吸吮着${assi_name}的阴茎，然而肛门被${master_name}侵犯的快感很快就让她无法集中精神继续口交，只是无力地呻吟着`,
                );
                await era.print(
                  `『哎哎姐姐真没用，屁股再这么舒服，嘴巴的动作也不能停下来啊！！』`,
                );
                await era.printAndWait(
                  `「对，对不起……但是真的已经……唔呣……唔呣……呜呜！」`,
                );
                await era.printAndWait(
                  `话音未落，${assi_name}就已经强行把阴茎插到了${target_name}的喉咙深处，强行侵犯着`,
                );
              } else {
                await era.printAndWait(
                  `「呜呜……求你们了……放过我吧……真的，真的不要两个人一起上啊……唔呣……呣呣？！」`,
                );
                await era.printAndWait(
                  `${target_name}被${master_name}持续侵犯着肛门的同时，被迫继续把脸埋在${assi_name}的腿间，吸吮着妹妹的阴茎。`,
                );
                await era.print(
                  `『呵呵呵，嘴上说着不喜欢，但是吸吮阴茎却很卖力啊，那么喜欢口交吗我的好姐姐？』`,
                );
                await era.printAndWait(
                  `${target_name}绝望地摇着头，忍耐着肛门被侵犯的不适感，边屈服地为妹妹口交着`,
                );
              }
            }
          } else if (
            game.train.三人PLAY主人部位 === 3 &&
            game.train.三人PLAY助手部位 === 2
          ) {
            if (era.get(`talent:${target}:85`)) {
              if (chara(target).system.肛门感觉 >= 3) {
                await era.printAndWait(
                  `「请……请两位随意地侵犯${target_name}的肛门和嘴巴小穴吧${heart(1)} ……唔呣……唔唔？！」`,
                );
                await era.print(
                  `『比比看看看是我先让姐姐的屁股高潮，还是姐姐先用嘴巴让魔王大人射精吧～加油啊姐姐♪』`,
                );
                await era.printAndWait(
                  `${assi_name}用手指肆意地玩弄了一会儿${target_name}的肛门，然后用自己双腿间的${assi_weapon}开始持续地侵犯着姐姐的后庭。`,
                );
                await era.printAndWait(
                  `「呜呣呣${heart(1)} 好，好舒服啊啊啊${heart(1)} 边吸吮着……魔王大人的阴茎……边被妹妹侵犯肛门${heart(1)}……不行了……已经舒服得没有办法思考了啊呣呣${heart(1)}！」`,
                );
                await era.printAndWait(
                  `${master_name}欣赏着${target_name}被自己的亲妹妹侵犯肛门的下流姿态，边用${master_weapon}侵犯着${target_name}的喉咙深处……`,
                );
              } else {
                await era.printAndWait(
                  `「呜……啊啊……不，不可以……在这个时候插进来啊啊${heart(1)} 没有办法……好好为魔王大人口交了……唔呣……唔呣……呜啊啊啊」`,
                );
                await era.print(
                  `『这样不行啊姐姐，不管是被侵犯肛门还是侵犯小穴，口交都不能停下来，这可是作为性奴的基本功呢♪』`,
                );
                await era.printAndWait(
                  `边羞辱着自己的姐姐，${assi_name}边用${assi_weapon}更加激烈地侵犯着${target_name}的后庭。`,
                );
                await era.printAndWait(
                  `「不，不要说这种……害羞的话啊${heart(1)}唔呣……唔呣${heart(1)} 啊啊啊……整个人……都要变得奇怪了！」`,
                );
                await era.printAndWait(
                  `${master_name}欣赏着${target_name}被自己妹妹羞辱的姿态，更加兴奋的侵犯着${target_name}的嘴巴和喉咙。`,
                );
              }
            } else if (era.get(`talent:${target}:76`)) {
              if (chara(target).system.肛门感觉 >= 3) {
                await era.printAndWait(
                  `「来吧，魔王大人，还有${assi_name}……请一起侵犯${target_name}淫乱的肛门性器和嘴巴小穴吧……人家已经等不及了啦${heart(1)}」`,
                );
                await era.printAndWait(
                  `肛门被侵犯的极度快感，让${target_name}整个人都颤抖了起来，更加兴奋而积极地吸吮着${master_name}的阴茎。`,
                );
                await era.print(
                  `『啊啊……姐姐的肛门真的被魔王大人调教成名器了啊啊！侵犯起来好舒服！！』`,
                );
                await era.printAndWait(
                  `「是……是啊${heart(1)} 姐姐的……肛门就是……专门服务${assi_name}和魔王大人的淫乱性器啊啊${heart(1)} 唔呣……唔呣……唔唔唔${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}淫乱的话语激起了${assi_name}和${master_name}的兴致，更加激烈地一前一后侵犯着${target_name}……`,
                );
              } else {
                await era.printAndWait(
                  `「呜啊啊……居，居然……要边被侵犯肛门……边为魔王大人口交${heart(1)}……不过算了……这样也很舒服就是了——唔呣呣！？呣呣呣」`,
                );
                await era.printAndWait(
                  `${target_name}身体颤抖着，完全沉醉在肛交的快感之中，嘴也更加热情地吸吮着${master_name}的阴茎。`,
                );
                await era.print(
                  `『哎嘿嘿，姐姐完全变成淫乱性奴了呢，真是变态，我怎么会有你这样的姐姐！』`,
                );
                await era.printAndWait(
                  `「是……是啊……姐姐是${assi_name}和魔王大人的淫乱性奴……请随意地把姐姐……侵犯到坏掉吧啊啊啊${heart(1)}」`,
                );
                await era.printAndWait(
                  `${assi_name}兴奋不已地抓着${target_name}的腰，更加激烈地侵犯着姐姐的肛门，强烈的快感让${target_name}更加忘我地为${master_name}口交着……`,
                );
              }
            } else {
              if (chara(target).system.肛门感觉 >= 3) {
                await era.printAndWait(
                  `「呜啊……不，不可以在口交的时候……侵犯屁股啊啊……但是……感觉好奇怪……好舒服……唔呣……唔呣」`,
                );
                await era.printAndWait(
                  `敏感的肛门传来的快感让${target_name}几乎无法忍耐，大声地呻吟了起来，连为${master_name}口交的动作都停了下来。`,
                );
                await era.print(
                  `『没用的姐姐，好好给魔王大人口交啊，难道你想挨罚吗？！♪』`,
                );
                await era.printAndWait(
                  `「对，对不起……我会好好……吸吮的……唔呣……唔呣……啊啊啊……不，不行了，屁股……真的不行了，舒服得……要去了啊啊啊${heart(1)}」`,
                );
                await era.printAndWait(
                  `已经被调教成性器的肛门依旧被自己的妹妹毫不留情地侵犯着，快感已经逐渐淹没了${target_name}`,
                );
                await era.printAndWait(
                  `几乎无法思考的${target_name}只能本能地搂着${master_name}的腰，吸吮着口中的阴茎`,
                );
              } else {
                await era.printAndWait(
                  `「呜呜……求你们了……放过我吧……真的，真的不要两个人一起上啊……唔呣……呣呣？！」`,
                );
                await era.printAndWait(
                  `完全无视了${target_name}的哀求，${assi_name}和${master_name}开始一前一后同时侵犯着${target_name}的肛门和嘴。`,
                );
                await era.print(
                  `『啊啊……姐姐的淫乱屁股小穴夹得这么紧，好舒服啊！』`,
                );
                await era.printAndWait(
                  `「呜呜……饶了我吧……真的，真的会坏掉的……唔呣！？唔唔……唔呣……」`,
                );
                await era.printAndWait(
                  `${target_name}只能拼命忍耐着肛门被侵犯的不适，同时竭力吸吮着${master_name}的阴茎……直到两人满意为止`,
                );
              }
            }
          }
        }
        return 0;
      } else {
        if (era.get(`talent:${target}:0`) === 1) {
          if (
            game.train.三人PLAY主人部位 === 1 &&
            game.train.三人PLAY助手部位 === 2
          ) {
            await era.printAndWait(
              `${master_name}毫不留情地夺走了${target_name}的处女`,
            );
            await era.printAndWait(
              `${assi_name}也兴奋不已地同时侵犯了${target_name}的肛门。`,
            );
            if (era.get(`talent:${target}:85`)) {
              await era.printAndWait(`「呜……啊啊……我的处女！」`);
              await era.printAndWait(
                `${target_name}被${master_name}和妹妹抱着夹在中间，破处的痛苦和前后两穴同时传来的快感交织在一起。`,
              );
              await era.print(
                `『啊啊……姐姐的肛门……太舒服了，舒服得我的小鸡鸡停不下来了啦！』`,
              );
              await era.printAndWait(
                `${assi_name}舔着嘴唇，激烈地侵犯着姐姐的后庭。`,
              );
              await era.printAndWait(
                `「啊啊……这样被夹击……一下子……就要去了啊啊啊！」`,
              );
            } else if (era.get(`talent:${target}:76`)) {
              await era.printAndWait(
                `「呜啊啊……两人的阴茎……这样同时插进来${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}感受着肛门和处女蜜穴同时被插入的异样快感。`,
              );
              await era.print(`『嘿嘿，姐姐，处女三明治的感觉如何啊？』`);
              await era.printAndWait(
                `${assi_name}嬉笑着，用阴茎激烈地侵犯着${target_name}的后庭。`,
              );
              await era.printAndWait(
                `「好舒服……这样好舒服${heart(1)}被魔王大人和${assi_name}的阴茎……同时在身体里搅动着${heart(1)}」`,
              );
            } else {
              await era.printAndWait(
                `「不，不行啊啊啊……要裂开了……真的会裂开的啊啊啊！」`,
              );
              await era.printAndWait(
                `处女蜜穴和肛门被同时贯穿的痛苦，让${target_name}的哀叫在调教室里回响着。`,
              );
              await era.print(
                `『别瞎喊了姐姐，吵死人了，学会好好享受我和魔王大人的阴茎吧，以后还要很多次的哦！』`,
              );
              await era.printAndWait(
                `${assi_name}舔着嘴唇，继续激烈地侵犯着姐姐的后庭。`,
              );
            }
          } else if (
            game.train.三人PLAY主人部位 === 2 &&
            game.train.三人PLAY助手部位 === 1
          ) {
            await era.printAndWait(
              `${assi_name}毫不留情地夺走了${target_name}的处女`,
            );
            await era.printAndWait(
              `${master_name}也兴奋不已地同时侵犯了${target_name}的肛门。`,
            );
            if (era.get(`talent:${target}:85`)) {
              await era.printAndWait(`「呜啊啊……我，我的第一次……啊啊啊！」`);
              await era.printAndWait(
                `${target_name}被${master_name}和妹妹抱着夹在中间，破处的痛苦和前后两穴同时传来的快感交织在一起。`,
              );
              await era.print(
                `『啊啊啊姐姐的第一次，归我了！！${assi_name}好高兴，好高兴！』`,
              );
              await era.printAndWait(
                `${assi_name}带着兴奋的表情，开始激烈地侵犯着着姐姐的处女蜜穴。`,
              );
              await era.printAndWait(
                `「嗯啊……那样……被两人同时侵犯……会不行的啊啊啊！」`,
              );
            } else if (era.get(`talent:${target}:76`)) {
              await era.printAndWait(
                `「呜啊啊……两人的阴茎……这样同时插进来${heart(1)} 好……好奇怪的感觉啊啊${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}感受着肛门和处女蜜穴同时被插入的异样快感。`,
              );
              await era.print(
                `『啊啊啊姐姐的第一次，归我了！！${assi_name}好高兴，好高兴${heart(1)}』`,
              );
              await era.printAndWait(
                `${assi_name}带着兴奋的表情，开始激烈地侵犯着着姐姐的处女蜜穴。`,
              );
              await era.printAndWait(
                `「好舒服……这样好舒服${heart(1)}被魔王大人和${assi_name}的阴茎……同时在身体里搅动着${heart(1)}」`,
              );
            } else {
              await era.print(
                `『啊啊啊姐姐的处女蜜穴……真是紧的让人无法忍受啊！』`,
              );
              await era.printAndWait(
                `「不，不行啊啊啊……要裂开了……真的会裂开的啊啊啊！」`,
              );
              await era.printAndWait(
                `处女蜜穴和肛门被同时贯穿的痛苦，让${target_name}的哀叫在调教室里回响着。`,
              );
              await era.print(
                `『别瞎喊了姐姐，吵死人了，学会好好享受我和魔王大人的阴茎吧，以后还要很多次的哦！』`,
              );
              await era.printAndWait(
                `${assi_name}舔着嘴唇，继续激烈地侵犯着姐姐的初经人事的蜜穴`,
              );
            }
          } else if (
            game.train.三人PLAY主人部位 === 1 &&
            game.train.三人PLAY助手部位 === 3
          ) {
            if (era.get(`talent:${target}:85`)) {
              await era.printAndWait(
                `「唔呣……唔呣……我的一次……奉献给魔王大人了啊啊啊${heart(1)} 呣呣${heart(1)}……」`,
              );
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              );
              await era.print(
                `『哎嘿嘿，姐姐的处女今天正式属于魔王大人了${heart(1)}』`,
              );
              await era.printAndWait(
                `${master_name}挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              );
              await era.printAndWait(
                `「啊啊啊……魔王大人……魔王大人，从今天开始，我，我就是你的人了啊啊${heart(1)} 」`,
              );
              await era.print(
                `『哎哎姐姐不要光顾着高兴，给我认真吸吮小鸡鸡啊${heart(1)}』`,
              );
              await era.printAndWait(
                `${target_name}${master_name}和${assi_name}当做性玩具一般，一前一后的侵犯着……`,
              );
            } else if (era.get(`talent:${target}:76`)) {
              await era.printAndWait(
                `「唔呣……唔呣……呜啊啊！？魔王大人……的阴茎……啊啊啊${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              );
              await era.print(
                `『哎嘿嘿，姐姐，被你最喜欢的魔王大人的阴茎破处的感觉如何呀${heart(1)}』`,
              );
              await era.printAndWait(
                `${master_name}挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              );
              await era.printAndWait(
                `「好舒服……唔呣……唔呣${heart(1)} 这样同时……侍奉两根阴茎……实在是太棒了唔唔${heart(1)}」`,
              );
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，身体在心里和生理的双重快感中颤抖着……`,
              );
            } else {
              await era.printAndWait(`「住，住手啊……唔呣……呜呜呜！」`);
              await era.printAndWait(
                `${target_name}边被强迫为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              );
              await era.printAndWait(`「不，不要啊啊！」`);
              await era.print(`『姐姐，嘴巴不许停下啊，给我好好吸吮啊！』`);
              await era.printAndWait(
                `${assi_name}抓着${target_name}的头，用${assi_weapon}强行侵犯着姐姐的喉咙。`,
              );
              await era.printAndWait(
                `身后的${master_name}挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              );
              await era.printAndWait(
                `「饶，饶了我吧，求你们了……唔唔……呣呣呣……！」`,
              );
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，连悲鸣都发不出，只能忍受着痛苦与折磨………`,
              );
            }
          } else if (
            game.train.三人PLAY主人部位 === 3 &&
            game.train.三人PLAY助手部位 === 1
          ) {
            if (era.get(`talent:${target}:85`)) {
              await era.printAndWait(
                `「呜呜……唔呣${heart(1)}！${assi_name}？！不，不可以……」`,
              );
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              );
              await era.print(
                `『啊嘿嘿，和魔王大人一起用阴茎把姐姐前后串起来了——姐姐的处女，我就收下了！』`,
              );
              await era.printAndWait(
                `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              );
              await era.printAndWait(
                `「不，不要啊……我是想留给……魔王大人的——唔唔……呣呣！」`,
              );
              await era.printAndWait(
                `${target_name}${master_name}和${assi_name}当做性玩具一般，一前一后的侵犯着……`,
              );
            } else if (era.get(`talent:${target}:76`)) {
              await era.printAndWait(
                `「唔呣……唔唔……我的处女……就这样……${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              );
              await era.print(
                `『啊啊，梦寐以求的姐姐的第一次，我就这么收下了${heart(1)}』`,
              );
              await era.printAndWait(
                `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              );
              await era.printAndWait(
                `像是在配合着${assi_name}的动作一样，${master_name}也将阴茎插入到了${target_name}的喉咙深处。`,
              );
              await era.printAndWait(
                `「唔呣……唔唔……${heart(1)} 这样……好舒服……唔唔……唔呣${heart(1)}」`,
              );
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，却感受到了心理和生理的双重快感……`,
              );
            } else {
              await era.printAndWait(`「住，住手啊……唔呣……呜呜呜！」`);
              await era.printAndWait(
                `${target_name}被强制边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，龟头抵在蜜穴上。`,
              );
              await era.print(
                `『嘿嘿嘿，姐姐的第一次就由我收下了！这样同时被侵犯着嘴巴和处女蜜穴，很舒服吧！』`,
              );
              await era.printAndWait(
                `「怎，怎么可能会舒服……呜呜呜……唔呣……呣呣呣！？」`,
              );
              await era.printAndWait(
                `${master_name}抓着${target_name}的头，将阴茎插到了喉咙的最深处。`,
              );
              await era.printAndWait(
                `身后的${assi_name}也无情地夺去了${target_name}的处女身。`,
              );
              await era.printAndWait(
                `「饶，饶了我吧，求你们了……唔唔……呣呣呣……！」`,
              );
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，连悲鸣都发不出，只能忍受着痛苦与折磨………`,
              );
            }
          } else if (
            game.train.三人PLAY主人部位 === 2 &&
            game.train.三人PLAY助手部位 === 3
          ) {
            if (era.get(`talent:${target}:85`)) {
              if (chara(target).system.肛门感觉 >= 3) {
                await era.printAndWait(
                  `「唔呣……唔呣……啊啊魔王大人，不，不能这样同时侵犯屁股啊啊！！」`,
                );
                await era.print(
                  `『哎哎姐姐，肛交有那么舒服吗！怎么一被魔王大人侵犯屁股，嘴巴的动作就停下来了呢！真是的，还要人家自己动！！』`,
                );
                await era.printAndWait(
                  `${assi_name}抱着${target_name}的脸，用自己双腿间的${assi_weapon}肆意地侵犯着姐姐的喉咙。`,
                );
                await era.printAndWait(
                  `「唔呣……唔呣……对，对不起，${assi_name}……因为一边口交一边肛交的感觉……太舒服了……整个人都要变得奇怪了啊啊${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}会老实的一边舔${assi_name}的${assi_weapon}一边被${master_name}侵犯肛门的………`,
                );
              } else {
                await era.printAndWait(
                  `「唔呣……唔呣……啊啊魔王大人，不，不能这样同时侵犯屁股啊啊！！」`,
                );
                await era.print(
                  `『哎嘿嘿，姐姐现在已经能熟练地一边被侵犯肛门一边口交了呢，完全变成我和魔王大人的性奴了呀♪♪』`,
                );
                await era.printAndWait(
                  `被妹妹羞辱得面红耳赤的${target_name}，却依旧顺从地吸吮着${assi_name}股间的的${assi_weapon}。`,
                );
                await era.printAndWait(
                  `「不，不要说这种……害羞的话啊${heart(1)}唔呣……唔呣${heart(1)} 啊啊啊……整个人……都要变得奇怪了！」`,
                );
                await era.printAndWait(
                  `${master_name}欣赏着姐姐为妹妹口交侍奉的淫乱姿态，也兴奋地挺起腰，更加激烈地侵犯着${target_name}的肛门……`,
                );
              }
            } else if (era.get(`talent:${target}:76`)) {
              if (chara(target).system.肛门感觉 >= 3) {
                await era.printAndWait(
                  `「唔呣……唔呣……这样边吸吮着……阴茎……边被侵犯肛门……实在是……太舒服了啊呣呣${heart(1)}……不，不行了，屁股舒服的要去了啊啊${heart(1)}！」`,
                );
                await era.printAndWait(
                  `肛门的强烈快感让${target_name}更加兴奋地为${assi_name}口交着，整个人都忘乎所以了。`,
                );
                await era.print(
                  `『哎哎哎，姐姐已经这么淫荡了啊，完全变成我和魔王大人的性奴了呢！』`,
                );
                await era.printAndWait(
                  `兴奋不已的${assi_name}抓着${target_name}头发，更加激烈地侵犯着自己姐姐的喉咙，另一边${master_name}抽插肛门的节奏也加快了……`,
                );
              } else {
                await era.printAndWait(
                  `「呜啊啊……这样被同时侵犯着……肛门和嘴巴小穴……感觉好奇怪……但是好舒服啊啊」`,
                );
                await era.printAndWait(
                  `感受着肛门的快感，${target_name}更加兴奋地为自己的妹妹口交着`,
                );
                await era.print(
                  `『啊啊姐姐！姐姐！就这样彻底变成我和魔王大人的性奴吧！』`,
                );
                await era.printAndWait(
                  `兴奋不已的${assi_name}抓着${target_name}头发，更加激烈地侵犯着自己姐姐的喉咙，另一边${master_name}抽插肛门的节奏也加快了……`,
                );
              }
            } else {
              if (chara(target).system.肛门感觉 >= 3) {
                await era.printAndWait(
                  `「呜啊……不，不可以在口交的时候……侵犯屁股啊啊……但是……感觉好奇怪……好舒服……唔呣……唔呣」`,
                );
                await era.printAndWait(
                  `${target_name}把脸埋在妹妹的腿间，吸吮着${assi_name}的阴茎，然而肛门被${master_name}侵犯的快感很快就让她无法集中精神继续口交，只是无力地呻吟着`,
                );
                await era.print(
                  `『哎哎姐姐真没用，屁股再这么舒服，嘴巴的动作也不能停下来啊！！』`,
                );
                await era.printAndWait(
                  `「对，对不起……但是真的已经……唔呣……唔呣……呜呜！」`,
                );
                await era.printAndWait(
                  `话音未落，${assi_name}就已经强行把阴茎插到了${target_name}的喉咙深处，强行侵犯着`,
                );
              } else {
                await era.printAndWait(
                  `「呜呜……求你们了……放过我吧……真的，真的不要两个人一起上啊……唔呣……呣呣？！」`,
                );
                await era.printAndWait(
                  `${target_name}被${master_name}持续侵犯着肛门的同时，被迫继续把脸埋在${assi_name}的腿间，吸吮着妹妹的阴茎。`,
                );
                await era.print(
                  `『呵呵呵，嘴上说着不喜欢，但是吸吮阴茎却很卖力啊，那么喜欢口交吗我的好姐姐？』`,
                );
                await era.printAndWait(
                  `${target_name}绝望地摇着头，忍耐着肛门被侵犯的不适感，边屈服地为妹妹口交着`,
                );
              }
            }
          } else if (
            game.train.三人PLAY主人部位 === 3 &&
            game.train.三人PLAY助手部位 === 2
          ) {
            if (era.get(`talent:${target}:85`)) {
              if (chara(target).system.肛门感觉 >= 3) {
                await era.printAndWait(
                  `「请……请两位随意地侵犯${target_name}的肛门和嘴巴小穴吧${heart(1)} ……唔呣……唔唔？！」`,
                );
                await era.print(
                  `『比比看看看是我先让姐姐的屁股高潮，还是姐姐先用嘴巴让魔王大人射精吧～加油啊姐姐♪』`,
                );
                await era.printAndWait(
                  `${assi_name}用手指肆意地玩弄了一会儿${target_name}的肛门，然后用自己双腿间的${assi_weapon}开始持续地侵犯着姐姐的后庭。`,
                );
                await era.printAndWait(
                  `「呜呣呣${heart(1)} 好，好舒服啊啊啊${heart(1)} 边吸吮着……魔王大人的阴茎……边被妹妹侵犯肛门${heart(1)}……不行了……已经舒服得没有办法思考了啊呣呣${heart(1)}！」`,
                );
                await era.printAndWait(
                  `${master_name}欣赏着${target_name}被自己的亲妹妹侵犯肛门的下流姿态，边用${master_weapon}侵犯着${target_name}的喉咙深处……`,
                );
              } else {
                await era.printAndWait(
                  `「啊呜…唔…魔王大人${heart(1)} 咕啾咕啾…啊、嗯！肛门不行啊…啊啊啊！」`,
                );
                await era.print(
                  `『这样不行啊姐姐，不管是被侵犯肛门还是侵犯小穴，口交都不能停下来，这可是作为性奴的基本功呢♪』`,
                );
                await era.printAndWait(
                  `边羞辱着自己的姐姐，${assi_name}边用${assi_weapon}更加激烈地侵犯着${target_name}的后庭。`,
                );
                await era.printAndWait(
                  `「不，不要说这种……害羞的话啊${heart(1)}唔呣……唔呣${heart(1)} 啊啊啊……整个人……都要变得奇怪了！」`,
                );
                await era.printAndWait(
                  `${master_name}欣赏着${target_name}被自己妹妹羞辱的姿态，更加兴奋的侵犯着${target_name}的嘴巴和喉咙。`,
                );
              }
            } else if (era.get(`talent:${target}:76`)) {
              if (chara(target).system.肛门感觉 >= 3) {
                await era.printAndWait(
                  `「来吧，魔王大人，还有${assi_name}……请一起侵犯${target_name}淫乱的肛门性器和嘴巴小穴吧……人家已经等不及了啦${heart(1)}」`,
                );
                await era.printAndWait(
                  `肛门被侵犯的极度快感，让${target_name}整个人都颤抖了起来，更加兴奋而积极地吸吮着${master_name}的阴茎。`,
                );
                await era.print(
                  `『啊啊……姐姐的肛门真的被魔王大人调教成名器了啊啊！侵犯起来好舒服！！』`,
                );
                await era.printAndWait(
                  `「是……是啊${heart(1)} 姐姐的……肛门就是……专门服务${assi_name}和魔王大人的淫乱性器啊啊${heart(1)} 唔呣……唔呣……唔唔唔${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}淫乱的话语激起了${assi_name}和${master_name}的兴致，更加激烈地一前一后侵犯着${target_name}……`,
                );
              } else {
                await era.printAndWait(
                  `「呜啊啊……居，居然……要边被侵犯肛门……边为魔王大人口交${heart(1)}……不过算了……这样也很舒服就是了——唔呣呣！？呣呣呣」`,
                );
                await era.printAndWait(
                  `${target_name}身体颤抖着，完全沉醉在肛交的快感之中，嘴也更加热情地吸吮着${master_name}的阴茎。`,
                );
                await era.print(
                  `『哎嘿嘿，姐姐完全变成淫乱性奴了呢，真是变态，我怎么会有你这样的姐姐！』`,
                );
                await era.printAndWait(
                  `「是……是啊……姐姐是${assi_name}和魔王大人的淫乱性奴……请随意地把姐姐……侵犯到坏掉吧啊啊啊${heart(1)}」`,
                );
                await era.printAndWait(
                  `${assi_name}兴奋地抓住${target_name}的腰不停地反复抽送着。然后${target_name}输给了肛门被侵犯的快感，继续舔着${master_name}的股间………`,
                );
              }
            } else {
              if (chara(target).system.肛门感觉 >= 3) {
                await era.printAndWait(
                  `「呜啊……不，不可以在口交的时候……侵犯屁股啊啊……但是……感觉好奇怪……好舒服……唔呣……唔呣」`,
                );
                await era.printAndWait(
                  `敏感的肛门传来的快感让${target_name}几乎无法忍耐，大声地呻吟了起来，连为${master_name}口交的动作都停了下来。`,
                );
                await era.print(
                  `『没用的姐姐，好好给魔王大人口交啊，难道你想挨罚吗？！♪』`,
                );
                await era.printAndWait(
                  `「对，对不起……我会好好……吸吮的……唔呣……唔呣……啊啊啊……不，不行了，屁股……真的不行了，舒服得……要去了啊啊啊${heart(1)}」`,
                );
                await era.printAndWait(
                  `已经被调教成性器的肛门依旧被自己的妹妹毫不留情地侵犯着，快感已经逐渐淹没了${target_name}`,
                );
                await era.printAndWait(
                  `几乎无法思考的${target_name}只能本能地搂着${master_name}的腰，吸吮着口中的阴茎`,
                );
              } else {
                await era.printAndWait(
                  `「呜呜……求你们了……放过我吧……真的，真的不要两个人一起上啊……唔呣……呣呣？！」`,
                );
                await era.printAndWait(
                  `完全无视了${target_name}的哀求，${assi_name}和${master_name}开始一前一后同时侵犯着${target_name}的肛门和嘴。`,
                );
                await era.print(
                  `『啊啊……姐姐的淫乱屁股小穴夹得这么紧，好舒服啊！』`,
                );
                await era.printAndWait(
                  `「呜呜……饶了我吧……真的，真的会坏掉的……唔呣！？唔唔……唔呣……」`,
                );
                await era.printAndWait(
                  `${target_name}只能拼命忍耐着肛门被侵犯的不适，同时竭力吸吮着${master_name}的阴茎……直到两人满意为止`,
                );
              }
            }
          }
        } else {
          if (
            game.train.三人PLAY主人部位 === 1 &&
            game.train.三人PLAY助手部位 === 2
          ) {
            if (era.get(`talent:${target}:85`)) {
              if (
                chara(target).system.私处感觉 >= 3 &&
                chara(target).system.肛门感觉 >= 3
              ) {
                await era.printAndWait(
                  `「请，请尽情地侵犯${target_name}的小穴吧……魔王大人${heart(1)} 什么……${assi_name}也要一起么……当，当然可以……」`,
                );
                await era.printAndWait(
                  `${target_name}被${master_name}和妹妹抱在中间，同时侵犯着蜜穴和肛门，双重的快感瞬间将${target_name}淹没了。`,
                );
                await era.print(
                  `『唔哇哇……姐姐的淫乱肛门……完全变成性器了呢！』`,
                );
                await era.printAndWait(
                  `兴奋不已的${assi_name}挺着腰，激烈地侵犯着姐姐的肛门。`,
                );
                await era.printAndWait(
                  `「呜呜……啊啊啊……不，不行了……舒服得已经没有办法思考了……魔王大人，还有${assi_name}……请尽情地把${target_name}侵犯得一塌糊涂吧啊啊啊！」`,
                );
              } else {
                await era.printAndWait(
                  `「哎哎？要，要两个人一起吗……是叫做三明治什么的玩法吗${heart(1)}」`,
                );
                await era.printAndWait(
                  `被夹在中间同时侵犯着肛门和蜜穴，${target_name}只能拼命忍耐着强烈的快感。`,
                );
                await era.print(
                  `『唔哇哇……姐姐的淫乱肛门好紧好舒服……真的有成为名器的潜质呢！』`,
                );
                await era.printAndWait(
                  `${assi_name}嬉笑着，挺着腰，和${master_name}一同更加激烈地侵犯着${target_name}的肛门和蜜穴。`,
                );
                await era.printAndWait(
                  `「呜……啊啊……不，不可以这么激烈啊……会，会坏掉的${heart(1)}！」`,
                );
              }
            } else if (era.get(`talent:${target}:76`)) {
              if (
                chara(target).system.私处感觉 >= 3 &&
                chara(target).system.肛门感觉 >= 3
              ) {
                await era.printAndWait(
                  `「哎哎，要两人一起上？其实人家早已经等不及了啦${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}被${master_name}和妹妹抱在中间，同时侵犯着蜜穴和肛门，双重的快感瞬间将${target_name}淹没，只剩下淫浪的娇喘。`,
                );
                await era.print(
                  `『哎哎，姐姐真是贪心啊，居然一次要两人才能满足！』`,
                );
                await era.printAndWait(
                  `兴奋不已的${assi_name}挺着腰，激烈地侵犯着姐姐的肛门。`,
                );
                await era.printAndWait(
                  `「好，好舒服……太舒服了${heart(1)}都怪你们，把姐姐调教得……不做爱就活不下去了啊啊啊${heart(1)}」`,
                );
              } else {
                await era.printAndWait(
                  `「哎哎……被，被两人的阴茎这样一起侵犯……呜啊啊${heart(1)}」`,
                );
                await era.printAndWait(
                  `肛门和蜜穴被同时插入让${target_name}发出了灼热的呻吟。`,
                );
                await era.print(
                  `『哎嘿嘿，姐姐的淫乱肛门好紧啊，有继续开发的必要呢！魔王大人，让我们一起把姐姐的前后两穴都弄得乱七八糟吧${heart(1)}』`,
                );
                await era.printAndWait(
                  `${assi_name}嬉笑着，挺着腰，和${master_name}一同更加激烈地侵犯着${target_name}的肛门和蜜穴。`,
                );
                await era.printAndWait(
                  `「嗯啊……啊啊啊……请，请尽情地……把${target_name}侵犯到坏掉吧${heart(1)}」`,
                );
              }
            } else {
              if (
                chara(target).system.私处感觉 >= 3 &&
                chara(target).system.肛门感觉 >= 3
              ) {
                await era.print(
                  `「呜……呜啊啊……不，不可以这样同时……侵犯屁股和小穴！呜呜……可，可是……好舒服……真的好舒服啊啊」`,
                );
                await era.printAndWait(
                  `${target_name}被${master_name}和妹妹抱在中间，同时侵犯着蜜穴和肛门，双重的快感瞬间将${target_name}淹没了。`,
                );
                await era.print(
                  `『哎嘿嘿，姐姐准备好了吗，接下来才是开始呢！』`,
                );
                await era.printAndWait(
                  `${assi_name}舔着嘴唇，动起腰，开始和${master_name}一同激烈地侵犯着${target_name}的肛门和蜜穴。`,
                );
                await era.printAndWait(
                  `「太，太激烈了……姐姐会……会坏掉的啊啊……！」`,
                );
              } else {
                await era.printAndWait(
                  `「两，两个人一起……不，不可以啊……那，那样会坏掉的……真的会坏掉的！」`,
                );
                await era.printAndWait(
                  `${target_name}似乎还无法适应如此激烈的玩法，痛苦地哀鸣了起来。`,
                );
                await era.print(
                  `『加油啊姐姐，在你在两穴同时高潮之前，我们可是不会停下的哦♪』`,
                );
                await era.printAndWait(
                  `${assi_name}带着恶意的笑容，舔着嘴角，更加激烈地侵犯着${target_name}的肛门………`,
                );
              }
            }
          } else if (
            game.train.三人PLAY主人部位 === 2 &&
            game.train.三人PLAY助手部位 === 1
          ) {
            if (era.get(`talent:${target}:85`)) {
              if (
                chara(target).system.私处感觉 >= 3 &&
                chara(target).system.肛门感觉 >= 3
              ) {
                await era.printAndWait(
                  `「嗯啊啊……魔，魔王大人……这样激烈地侵犯着……我的肛门${heart(1)}小穴……也被${assi_name}一起侵犯了……感觉好奇怪……但是好舒服啊啊啊${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}被${master_name}和妹妹抱在中间，同时侵犯着爱液泛滥的蜜穴和肛门，双重的快感瞬间将${target_name}淹没，只剩下甘甜的娇喘。`,
                );
                await era.print(
                  `『呜哇啊，性奴姐姐的小穴已经被魔王大人开发的……这么棒了！』`,
                );
                await era.printAndWait(
                  `兴奋不已的${assi_name}挺起腰，激烈地侵犯着${target_name}的蜜穴。`,
                );
                await era.printAndWait(
                  `「呜啊……嗯啊啊${heart(1)}……好舒服……好舒服啊啊${heart(1)} 这样被同时侵犯着……一下子……就要去了啊啊${heart(1)}」`,
                );
              } else {
                await era.printAndWait(
                  `「请，请稍微温柔一点……拜托了……还有${assi_name}…不要兴奋成那个样子啊！」`,
                );
                await era.printAndWait(
                  `话音未落，${assi_name}已经迫不及待地插入了姐姐的蜜穴之中。`,
                );
                await era.print(
                  `『哼哼，温柔，别开玩笑了！我和魔王大人今天就是打算把姐姐侵犯到彻底坏掉的呀！』`,
                );
                await era.printAndWait(
                  `${assi_name}坏笑着，挺起腰，配合着${master_name}的动作，开始一同激烈地侵犯着${target_name}的蜜穴和肛门。`,
                );
                await era.printAndWait(
                  `「呜啊啊……太，太激烈了……感，感觉好奇怪……整个人……都要变得奇怪了啊啊！」`,
                );
              }
            } else if (era.get(`talent:${target}:76`)) {
              if (
                chara(target).system.私处感觉 >= 3 &&
                chara(target).system.肛门感觉 >= 3
              ) {
                await era.printAndWait(
                  `「哈啊……哈啊……两人的阴茎……一起在身体里${heart(1)}……感觉实在是太棒了啊啊啊${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}被${master_name}和妹妹抱在中间，同时侵犯着蜜穴和肛门，双重的快感瞬间将${target_name}淹没，只剩下淫浪的娇喘。`,
                );
                await era.print(
                  `『给我用屁股和小穴同时高潮吧，淫乱的性奴姐姐！』`,
                );
                await era.printAndWait(
                  `兴奋不已${assi_name}挺起腰，配合着${master_name}的动作，开始一同激烈地侵犯着${target_name}的蜜穴和肛门。`,
                );
                await era.printAndWait(
                  `「呜啊……嗯啊啊……好舒服……实在是太舒服了${heart(1)} 真的要……高潮得……一塌糊涂了啊啊啊${heart(1)}」`,
                );
              } else {
                await era.printAndWait(
                  `「咦咦，要两个人一起上吗……好，好吧。其实还有点……期待呢${heart(1)}」`,
                );
                await era.printAndWait(
                  `蜜穴和肛门被同时插入，${target_name}忍不住灼热地呻吟了起来。`,
                );
                await era.print(
                  `『呼呼，姐姐的淫乱小穴……属于人家的啦啦啦！给我高潮吧！』`,
                );
                await era.printAndWait(
                  `${assi_name}嬉笑着，挺起腰，配合着${master_name}的动作，开始一同激烈地侵犯着${target_name}的蜜穴和肛门。`,
                );
                await era.printAndWait(
                  `「呜……呜啊啊${heart(1)} ${assi_name}！魔王大人！请，请尽情地……把${target_name}侵犯到坏掉吧${heart(1)}」`,
                );
              }
            } else {
              if (
                chara(target).system.私处感觉 >= 3 &&
                chara(target).system.肛门感觉 >= 3
              ) {
                await era.print(
                  `「呜……呜啊啊……不，不可以这样同时……侵犯屁股和小穴！呜呜，可，可是……为什么……感觉好舒服${heart(1)}…」`,
                );
                await era.printAndWait(
                  `${target_name}被${master_name}和妹妹抱在中间，同时侵犯着蜜穴和肛门，双重的快感瞬间将${target_name}淹没，只剩下灼热的呻吟。`,
                );
                await era.print(
                  `『嘴上说着不行，下面已经夹得这么紧了！被两人同时侵犯，更兴奋了吗，我的变态姐姐！』`,
                );
                await era.printAndWait(
                  `兴奋不已${assi_name}挺起腰，配合着${master_name}的动作，开始一同激烈地侵犯着${target_name}的蜜穴和肛门。`,
                );
                await era.printAndWait(
                  `「才，才不是……变态！呜……呜啊啊${heart(1)}……可，可是……真的好舒服……舒服得……不行了啊啊啊！」`,
                );
              } else {
                await era.printAndWait(
                  `「放，放开我啊……两个人一起……这种事情……怎么可以啊啊啊！」`,
                );
                await era.printAndWait(
                  `${target_name}似乎还无法适应如此激烈的玩法，痛苦地哀鸣了起来。`,
                );
                await era.print(
                  `『说什么呢姐姐，我们可是打算侵犯到姐姐两个淫穴一起高潮呢♪』`,
                );
                await era.printAndWait(
                  `${assi_name}带着恶意的笑容，舔着嘴角，更加激烈地侵犯着${target_name}的蜜穴………`,
                );
              }
            }
          } else if (
            game.train.三人PLAY主人部位 === 1 &&
            game.train.三人PLAY助手部位 === 3
          ) {
            if (era.get(`talent:${target}:85`)) {
              if (chara(target).system.私处感觉 >= 3) {
                await era.printAndWait(
                  `「呜……呜啊啊……这样边被魔王大人……侵犯着${heart(1)} ……边口交……感觉${assi_name}的阴茎……更加美味了啊啊啊${heart(1)} 唔呣……唔呣……唔唔唔♪」`,
                );
                await era.printAndWait(
                  `被${master_name}抽插着爱液泛滥的蜜穴、${target_name}更加兴奋不已地舔吮着妹妹的阴茎。`,
                );
                await era.print(
                  `『嘿嘿，被我和魔王大人一起侵犯，身为性奴的姐姐一定感觉很幸福吧？』`,
                );
                await era.printAndWait(
                  `${target_name}满脸通红地边点头，边继续努力地为妹妹口交着。`,
                );
                await era.printAndWait(
                  `「唔呣……唔呣${heart(1)}…… 的，的确是这样啊啊……能被魔王大人和${assi_name}这样疼爱……真的是太幸福了${heart(1)} 」`,
                );
              } else {
                await era.printAndWait(
                  `「唔呣……唔呣……${assi_name}的阴茎……味道好好……好喜欢${heart(1)} 还有……魔王大人，请吧……人家已经准备好了${heart(1)}」`,
                );
                await era.printAndWait(
                  `正在为${assi_name}口交的${target_name}，撅起的臀部一扭一扭地诱惑着${master_name}。`,
                );
                await era.print(
                  `『哎嘿嘿，姐姐最喜欢的魔王大人的阴茎要进来了哦${heart(1)}』`,
                );
                await era.printAndWait(
                  `${master_name}挺起腰，开始侵犯着${target_name}已经爱液泛滥的蜜穴。`,
                );
                await era.printAndWait(
                  `「呜啊……嗯啊啊${heart(1)}……魔王大人……一下子就顶到最里面了……好厉害啊啊啊${heart(1)}！」`,
                );
                await era.printAndWait(
                  `${assi_name}也抱着${target_name}的脸，用阴茎顶着姐姐的口腔。`,
                );
                await era.print(
                  `『不要光顾着享受，嘴巴也要好好地给我吸吮啊！』`,
                );
                await era.printAndWait(
                  `${target_name}就这样被${master_name}和${assi_name}当做性玩具一般，一前一后的侵犯着……`,
                );
              }
            } else if (era.get(`talent:${target}:76`)) {
              if (chara(target).system.私处感觉 >= 3) {
                await era.printAndWait(
                  `「呜……啊啊啊……蜜穴……被魔王大人的阴茎……塞得满满的${heart(1)} 这样……边做爱……边口交……实在是太舒服了啊唔唔……唔呣……唔呣${heart(1)}」`,
                );
                await era.print(
                  `『呜哇哇……姐姐在被魔王大人侵犯的时候……口交居然比平时还厉害了${heart(1)}』`,
                );
                await era.printAndWait(
                  `${assi_name}感受着姐姐激烈地吸吮着自己的阴茎，忍不住也呻吟了起来。`,
                );
                await era.printAndWait(
                  `「啊啊啊……魔王大人……更加激烈地侵犯……${target_name}的淫穴吧${heart(1)} 唔呣……唔呣……唔唔唔${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}含糊不清地娇喘着，享受着心理和生理的双重快感……`,
                );
              } else {
                await era.printAndWait(
                  `「呜啊啊……在，在人家口交的时候……侵犯小穴……魔王大人……太狡猾了${heart(1)}」`,
                );
                await era.printAndWait(
                  `在${target_name}吸吮着自己妹妹的阴茎的时候，${master_name}趁机抱住了${target_name}的腰，将龟头抵入了蜜穴中。`,
                );
                await era.print(
                  `『哎嘿嘿，姐姐一会儿享受的时候，嘴巴记得不要停下来哦♪』`,
                );
                await era.printAndWait(
                  `${master_name}挺着腰，开始激烈地侵犯着${target_name}爱液泛滥的蜜穴。`,
                );
                await era.printAndWait(
                  `「唔呣呣……唔唔${heart(1)} 不，不行了……这样……太舒服了啊啊啊${heart(1)}」`,
                );
                await era.print(`『啊啊……姐姐的口交……太厉害了……好舒服啊啊！』`);
                await era.print(
                  `被两人的阴茎一前一后侵犯着的${target_name}，因为心里和生理的双重快感而含糊不清地呻吟着………`,
                );
              }
            } else {
              if (chara(target).system.私处感觉 >= 3) {
                await era.printAndWait(
                  `「饶，饶了我吧……不，不可以这样同时侵犯嘴巴和小穴啊……唔呣呣……唔呣……」`,
                );
                await era.printAndWait(
                  `敏感的小穴被${master_name}肆意地抽插着，${target_name}只能拼命忍耐着快感，同时还要努力为妹妹口交。`,
                );
                await era.print(
                  `『哎嘿嘿，姐姐真不错呢，被魔王大人插得那么舒服，嘴巴还没有松懈♪』`,
                );
                await era.printAndWait(
                  `边嘲弄着${target_name}，${assi_name}边用阴茎继续侵犯着姐姐的喉咙。`,
                );
                await era.printAndWait(
                  `「唔呣呣……唔呣呣……太，太激烈了${heart(1)}…呜啊啊……被魔王大人……顶到子宫口了唔呣呣呣！」`,
                );
                await era.printAndWait(
                  `蜜穴传来的极度快感让${target_name}几乎无法思考………`,
                );
              } else {
                await era.printAndWait(
                  `「不，不可以在口交的时候……侵犯小穴啊……唔呣呣……呣呣……」`,
                );
                await era.printAndWait(
                  `正在为${assi_name}口交的${target_name}，蜜穴突然被侵犯，一时惊慌失措。`,
                );
                await era.print(
                  `『别光顾着享受啊，笨蛋姐姐，给我好好口交啊！』`,
                );
                await era.printAndWait(
                  `「不，不行啊……这样的事情……呜呜……唔呣！？」`,
                );
                await era.printAndWait(
                  `${assi_name}不满地抓着${target_name}的头发，用勃起的阴茎强行侵犯着姐姐的喉咙`,
                );
                await era.printAndWait(
                  `被两人的阴茎一前一后侵犯着的${target_name}，连悲鸣都发不出，只能忍受着痛苦与折磨………`,
                );
              }
            }
          } else if (
            game.train.三人PLAY主人部位 === 3 &&
            game.train.三人PLAY助手部位 === 1
          ) {
            if (era.get(`talent:${target}:85`)) {
              if (chara(target).system.私处感觉 >= 3) {
                await era.printAndWait(
                  `「唔呣呣？在……在口交的时候……侵犯小穴……感觉……好奇怪……但是好舒服啊啊啊${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}一边被妹妹侵犯着，一边把脸埋在${master_name}双腿之间，努力地吸吮着阴茎。`,
                );
                await era.print(
                  `『哎嘿嘿，姐姐不知不觉之间已经完全适应性奴的身份了呢${heart(1)}』`,
                );
                await era.printAndWait(
                  `${assi_name}带着享受的表情，激烈地侵犯着${target_name}的蜜穴。`,
                );
                await era.printAndWait(
                  `「呜……呣呣……不，不要对姐姐恶作剧了啦……没有办法好好……为魔王大人口交了${heart(1)} 对，对不起……魔王大人……因为实在是太舒服了${heart(1)}我，我会努力的……咕呣……咕呣……呣呣呣」`,
                );
                await era.printAndWait(
                  `${target_name}感受生理和心理的双重快感，任凭${master_name}好${assi_name}一前一后地侵犯着自己……`,
                );
              } else {
                await era.printAndWait(
                  `「不，不可以……在这个时候……侵犯小穴啊……会没有办法好好为魔王大人口交的！」`,
                );
                await era.printAndWait(
                  `正在为${master_name}口交的${target_name}，感受着身后的${assi_name}抱着自己的腰，龟头顶入了蜜穴之中。`,
                );
                await era.print(
                  `『其实人家还有点嫉妒姐姐呢，能同时享受两根阴茎……唔哇哇……姐姐的小穴好紧好舒服♪』`,
                );
                await era.printAndWait(
                  `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的蜜穴。`,
                );
                await era.printAndWait(
                  `「呜……呜啊啊……不，不能顶得这么深……唔呣呣……这样……边口交边被侵犯……感觉……整个人都要变得奇怪了啊啊——唔呣……呣呣呣……呣呣♪」`,
                );
                await era.printAndWait(
                  `${target_name}被${master_name}和${assi_name}当做性玩具一般，一前一后的侵犯着……`,
                );
              }
            } else if (era.get(`talent:${target}:76`)) {
              if (chara(target).system.私处感觉 >= 3) {
                await era.printAndWait(
                  `「唔呣……唔呣${heart(1)}……这样……边口交……边被侵犯小穴……感觉……太舒服了啊啊啊${heart(1)}」`,
                );
                await era.printAndWait(
                  `正在为${master_name}口交的${target_name}，感受着身后的${assi_name}抱着自己的腰，龟头顶入了爱液泛滥的敏感蜜穴之中。`,
                );
                await era.print(
                  `『唔哇哇……原来姐姐已经变得这么淫乱了……魔王大人真是调教有方啊！』`,
                );
                await era.printAndWait(
                  `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的蜜穴。`,
                );
                await era.printAndWait(
                  `${master_name}也配合着${assi_name}的动作，将阴茎顶到了${target_name}喉咙深处，开始抽插起来。`,
                );
                await era.printAndWait(
                  `「唔呣呣？！唔呣……唔呣……好，好舒服${heart(1)}……舒服得……已经没有办法思考了啊呣呣……呣呣${heart(1)}」`,
                );
                await era.printAndWait(
                  `被两人的阴茎一前一后侵犯着的${target_name}，身体在心里和生理的双重快感中颤抖着……`,
                );
              } else {
                await era.printAndWait(
                  `「呜啊啊……要边口交边被侵犯小穴了……好期待${heart(1)}」`,
                );
                await era.printAndWait(
                  `正在为${assi_name}口交的${master_name}，撅起的臀部一扭一扭地诱惑着${target_name}。`,
                );
                await era.print(
                  `『看来姐姐已经准备好了呢……接下来就是要侵犯到姐姐失神为止喽！！』`,
                );
                await era.printAndWait(
                  `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的蜜穴。`,
                );
                await era.printAndWait(
                  `${master_name}也配合着${assi_name}的动作，将阴茎顶到了${target_name}喉咙深处，开始抽插起来。`,
                );
                await era.printAndWait(
                  `「唔呣呣……唔唔${heart(1)} 这样好舒服……比想象中的还要舒服啊啊……呣呣……呣呣${heart(1)}」`,
                );
                await era.printAndWait(
                  `被两人的阴茎一前一后侵犯着的${target_name}，身体在难以言喻的快感中颤抖着……`,
                );
              }
            } else {
              if (chara(target).system.私处感觉 >= 3) {
                await era.printAndWait(
                  `「饶，饶了我吧……不，不可以这样同时侵犯嘴巴和小穴啊……唔呣呣……唔呣……」`,
                );
                await era.printAndWait(
                  `${target_name}嘴里含着${master_name}的阴茎，拼命忍耐着被${assi_name}从身后侵犯的强烈快感。`,
                );
                await era.print(
                  `『不能光顾享受啊姐姐，要好好用你的淫乱嘴巴小穴服务魔王大人，听到了没！』`,
                );
                await era.printAndWait(
                  `「对，对不起……我，我会好好用嘴巴做的……唔呣……唔呣……唔唔！」`,
                );
                await era.printAndWait(
                  `不耐烦的${master_name}抓着${target_name}的头发，将阴茎顶到了喉咙深处，肆意抽插着。`,
                );
                await era.print(
                  `『哼，魔王大人已经不满意了，做好受惩罚的觉悟吧笨蛋姐姐！』`,
                );
                await era.printAndWait(
                  `${target_name}泪流满面，却又无可奈何地忍耐着两人的侵犯和肆虐………`,
                );
              } else {
                await era.printAndWait(
                  `「呜呜呜……求求你们了……饶了我吧……真的……唔呣呣？！呣呣……唔呣……」`,
                );
                await era.printAndWait(
                  `对${target_name}的求饶无动于衷，${assi_name}和${master_name}开始一前一后，毫不留情地侵犯着${target_name}。`,
                );
                await era.print(
                  `『啊哈哈……魔王大人好像很喜欢姐姐的淫乱嘴巴小穴呢♪』`,
                );
                await era.printAndWait(
                  `「饶，饶了我吧……不能呼吸了……唔呣……呣呣……呣呣……」`,
                );
                await era.printAndWait(
                  `${master_name}不满地抓着${target_name}的头发，用勃起的阴茎强行在喉咙里抽插着`,
                );
                await era.print(
                  `『哎嘿，姐姐的喉咙小穴被魔王大人塞满了呢，人家有点嫉妒呢！』`,
                );
                await era.printAndWait(
                  `${target_name}怎么挣扎都无法挣脱，只能泪流满面地任由两人激烈地侵犯着自己……………`,
                );
              }
            }
          } else if (
            game.train.三人PLAY主人部位 === 2 &&
            game.train.三人PLAY助手部位 === 3
          ) {
            if (era.get(`talent:${target}:85`)) {
              if (chara(target).system.肛门感觉 >= 3) {
                await era.printAndWait(
                  `「唔呣……唔呣……啊啊魔王大人，不，不能这样同时侵犯屁股啊啊！！」`,
                );
                await era.print(
                  `『哎哎姐姐，肛交有那么舒服吗！怎么一被魔王大人侵犯屁股，嘴巴的动作就停下来了呢！真是的，还要人家自己动！！』`,
                );
                await era.printAndWait(
                  `${assi_name}抱着${target_name}的脸，用自己双腿间的${assi_weapon}肆意地侵犯着姐姐的喉咙。`,
                );
                await era.printAndWait(
                  `「唔呣……唔呣……对，对不起，${assi_name}……因为一边口交一边肛交的感觉……太舒服了……整个人都要变得奇怪了啊啊${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}老老实实地忍受，应该说是享受着${assi_name}和${master_name}两人对自己的同时侵犯………`,
                );
              } else {
                await era.printAndWait(
                  `「唔呣……唔呣……啊啊魔王大人，不，不能这样同时侵犯屁股啊啊！！」`,
                );
                await era.print(
                  `『哎嘿嘿，姐姐现在已经能熟练地一边被侵犯肛门一边口交了呢，完全变成我和魔王大人的性奴了呀♪♪』`,
                );
                await era.printAndWait(
                  `被妹妹羞辱得面红耳赤的${target_name}，却依旧顺从地吸吮着${assi_name}股间的的${assi_weapon}。`,
                );
                await era.printAndWait(
                  `「不，不要说这种……害羞的话啊${heart(1)}唔呣……唔呣${heart(1)} 啊啊啊……整个人……都要变得奇怪了！」`,
                );
                await era.printAndWait(
                  `${master_name}欣赏着姐姐为妹妹口交侍奉的淫乱姿态，也兴奋地挺起腰，更加激烈地侵犯着${target_name}的肛门……`,
                );
              }
            } else if (era.get(`talent:${target}:76`)) {
              if (chara(target).system.肛门感觉 >= 3) {
                await era.printAndWait(
                  `「唔呣……唔呣……这样边吸吮着……阴茎……边被侵犯肛门……实在是……太舒服了啊呣呣${heart(1)}……不，不行了，屁股舒服的要去了啊啊${heart(1)}！」`,
                );
                await era.printAndWait(
                  `肛门的强烈快感让${target_name}更加兴奋地为${assi_name}口交着，整个人都忘乎所以了。`,
                );
                await era.print(
                  `『哎哎哎，姐姐已经这么淫荡了啊，完全变成我和魔王大人的性奴了呢！』`,
                );
                await era.printAndWait(
                  `兴奋不已的${assi_name}抓着${target_name}头发，更加激烈地侵犯着自己姐姐的喉咙，另一边${master_name}抽插肛门的节奏也加快了……`,
                );
              } else {
                await era.printAndWait(
                  `「呜啊啊……这样被同时侵犯着……肛门和嘴巴小穴……感觉好奇怪……但是好舒服啊啊」`,
                );
                await era.printAndWait(
                  `感受着肛门的快感，${target_name}更加兴奋地为自己的妹妹口交着`,
                );
                await era.print(
                  `『啊啊姐姐！姐姐！就这样彻底变成我和魔王大人的性奴吧！』`,
                );
                await era.printAndWait(
                  `兴奋不已的${assi_name}抓着${target_name}头发，更加激烈地侵犯着自己姐姐的喉咙，另一边${master_name}抽插肛门的节奏也加快了……`,
                );
              }
            } else {
              if (chara(target).system.肛门感觉 >= 3) {
                await era.printAndWait(
                  `「呜啊……不，不可以在口交的时候……侵犯屁股啊啊……但是……感觉好奇怪……好舒服……唔呣……唔呣」`,
                );
                await era.printAndWait(
                  `${target_name}把脸埋在妹妹的腿间，吸吮着${assi_name}的阴茎，然而肛门被${master_name}侵犯的快感很快就让她无法集中精神继续口交，只是无力地呻吟着`,
                );
                await era.print(
                  `『哎哎姐姐真没用，屁股再这么舒服，嘴巴的动作也不能停下来啊！！』`,
                );
                await era.printAndWait(
                  `「对，对不起……但是真的已经……唔呣……唔呣……呜呜！」`,
                );
                await era.printAndWait(
                  `话音未落，${assi_name}就已经强行把阴茎插到了${target_name}的喉咙深处，强行侵犯着`,
                );
              } else {
                await era.printAndWait(
                  `「呜呜……求你们了……放过我吧……真的，真的不要两个人一起上啊……唔呣……呣呣？！」`,
                );
                await era.printAndWait(
                  `${target_name}被${master_name}持续侵犯着肛门的同时，被迫继续把脸埋在${assi_name}的腿间，吸吮着妹妹的阴茎。`,
                );
                await era.print(
                  `『呵呵呵，嘴上说着不喜欢，但是吸吮阴茎却很卖力啊，那么喜欢口交吗我的好姐姐？』`,
                );
                await era.printAndWait(
                  `${target_name}绝望地摇着头，忍耐着肛门被侵犯的不适感，边屈服地为妹妹口交着`,
                );
              }
            }
          } else if (
            game.train.三人PLAY主人部位 === 3 &&
            game.train.三人PLAY助手部位 === 2
          ) {
            if (era.get(`talent:${target}:85`)) {
              if (chara(target).system.肛门感觉 >= 3) {
                await era.printAndWait(
                  `「请……请两位随意地侵犯${target_name}的肛门和嘴巴小穴吧${heart(1)} ……唔呣……唔唔？！」`,
                );
                await era.print(
                  `『比比看看看是我先让姐姐的屁股高潮，还是姐姐先用嘴巴让魔王大人射精吧～加油啊姐姐♪』`,
                );
                await era.printAndWait(
                  `${assi_name}用手指肆意地玩弄了一会儿${target_name}的肛门，然后用自己双腿间的${assi_weapon}开始持续地侵犯着姐姐的后庭。`,
                );
                await era.printAndWait(
                  `「呜呣呣${heart(1)} 好，好舒服啊啊啊${heart(1)} 边吸吮着……魔王大人的阴茎……边被妹妹侵犯肛门${heart(1)}……不行了……已经舒服得没有办法思考了啊呣呣${heart(1)}！」`,
                );
                await era.printAndWait(
                  `${master_name}欣赏着${target_name}被自己的亲妹妹侵犯肛门的下流姿态，边用${master_weapon}侵犯着${target_name}的喉咙深处……`,
                );
              } else {
                await era.printAndWait(
                  `「不，不可以……这样……同时侵犯肛门啊啊${heart(1)} 没有办法……好好为魔王大人口交了……唔呣呣……呜啊啊！」`,
                );
                await era.print(
                  `『这样不行啊姐姐，不管是被侵犯肛门还是侵犯小穴，口交都不能停下来，这可是作为性奴的基本功呢♪』`,
                );
                await era.printAndWait(
                  `边羞辱着自己的姐姐，${assi_name}边用${assi_weapon}更加激烈地侵犯着${target_name}的后庭。`,
                );
                await era.printAndWait(
                  `「不，不要说这种……害羞的话啊${heart(1)}唔呣……唔呣${heart(1)} 啊啊啊……整个人……都要变得奇怪了！」`,
                );
                await era.printAndWait(
                  `${master_name}欣赏着${target_name}被自己妹妹羞辱的姿态，更加兴奋的侵犯着${target_name}的嘴巴和喉咙。`,
                );
              }
            } else if (era.get(`talent:${target}:76`)) {
              if (chara(target).system.肛门感觉 >= 3) {
                await era.printAndWait(
                  `「来吧，魔王大人，还有${assi_name}……请一起侵犯${target_name}淫乱的肛门性器和嘴巴小穴吧……人家已经等不及了啦${heart(1)}」`,
                );
                await era.printAndWait(
                  `肛门被侵犯的极度快感，让${target_name}整个人都颤抖了起来，更加兴奋而积极地吸吮着${master_name}的阴茎。`,
                );
                await era.print(
                  `『啊啊……姐姐的肛门真的被魔王大人调教成名器了啊啊！侵犯起来好舒服！！』`,
                );
                await era.printAndWait(
                  `「是……是啊${heart(1)} 姐姐的……肛门就是……专门服务${assi_name}和魔王大人的淫乱性器啊啊${heart(1)} 唔呣……唔呣……唔唔唔${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}淫乱的话语激起了${assi_name}和${master_name}的兴致，更加激烈地一前一后侵犯着${target_name}……`,
                );
              } else {
                await era.printAndWait(
                  `「呜啊啊……居，居然……要边被侵犯肛门……边为魔王大人口交${heart(1)}……不过算了……这样也很舒服就是了——唔呣呣！？呣呣呣」`,
                );
                await era.printAndWait(
                  `${target_name}身体颤抖着，完全沉醉在肛交的快感之中，嘴也更加热情地吸吮着${master_name}的阴茎。`,
                );
                await era.print(
                  `『哎嘿嘿，姐姐完全变成淫乱性奴了呢，真是变态，我怎么会有你这样的姐姐！』`,
                );
                await era.printAndWait(
                  `「是……是啊……姐姐是${assi_name}和魔王大人的淫乱性奴……请随意地把姐姐……侵犯到坏掉吧啊啊啊${heart(1)}」`,
                );
                await era.printAndWait(
                  `${assi_name}兴奋不已地抱着${target_name}的腰，激烈地侵犯着姐姐的肛门。强烈的快感让${target_name}更加忘我地为${master_name}口交着………`,
                );
              }
            } else {
              if (chara(target).system.肛门感觉 >= 3) {
                await era.printAndWait(
                  `「呜啊……不，不可以在口交的时候……侵犯屁股啊啊……但是……感觉好奇怪……好舒服……唔呣……唔呣」`,
                );
                await era.printAndWait(
                  `敏感的肛门传来的快感让${target_name}几乎无法忍耐，大声地呻吟了起来，连为${master_name}口交的动作都停了下来。`,
                );
                await era.print(
                  `『没用的姐姐，好好给魔王大人口交啊，难道你想挨罚吗？！♪』`,
                );
                await era.printAndWait(
                  `「对，对不起……我会好好……吸吮的……唔呣……唔呣……啊啊啊……不，不行了，屁股……真的不行了，舒服得……要去了啊啊啊${heart(1)}」`,
                );
                await era.printAndWait(
                  `已经被调教成性器的肛门依旧被自己的妹妹毫不留情地侵犯着，快感已经逐渐淹没了${target_name}`,
                );
                await era.printAndWait(
                  `几乎无法思考的${target_name}只能本能地搂着${master_name}的腰，吸吮着口中的阴茎`,
                );
              } else {
                await era.printAndWait(
                  `「呜呜……求你们了……放过我吧……真的，真的不要两个人一起上啊……唔呣……呣呣？！」`,
                );
                await era.printAndWait(
                  `完全无视了${target_name}的哀求，${assi_name}和${master_name}开始一前一后同时侵犯着${target_name}的肛门和嘴。`,
                );
                await era.print(
                  `『啊啊……姐姐的淫乱屁股小穴夹得这么紧，好舒服啊！』`,
                );
                await era.printAndWait(
                  `「呜呜……饶了我吧……真的，真的会坏掉的……唔呣！？唔唔……唔呣……」`,
                );
                await era.printAndWait(
                  `${target_name}只能拼命忍耐着肛门被侵犯的不适，同时竭力吸吮着${master_name}的阴茎……直到两人满意为止`,
                );
              }
            }
          }
        }
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 65) {
    if (kojo.侵犯助手 === 0) {
      if (assi_mao) {
        if (chara(player).train.初体验对象 === 305) {
          if (era.get(`talent:${target}:76`) === 1) {
            await era.printAndWait(
              `「哎哎？原来你还没有被魔王大人疼爱过呀……那就让姐姐来帮你变成真正的女人吧${heart(1)}」`,
            );
            await era.printAndWait(
              `『不，不要啊……是想留给魔王大人的啊啊……绝对不会原谅你的！！！』`,
            );
            await era.printAndWait(
              `${target_name}听从着你的命令，嬉笑着抱住${player_name}，夺走了妹妹的处女。`,
            );
            await era.printAndWait(
              `激烈的交合下，${player_name}的蜜穴里流出的纯洁的处女之血四溅到了地上，床上。`,
            );
            await era.printAndWait(
              `「身体放松，再放松一些${heart(1)} 马上就会舒服起来的${heart(1)}」`,
            );
            await era.printAndWait(`『呜啊啊！好痛！好痛！温柔一点啊啊！』`);
          } else if (era.get(`talent:${target}:85`) === 1) {
            await era.printAndWait(`『呜……呜啊……姐姐，慢一点，有点痛……！』`);
            await era.printAndWait(
              `「咦咦？难道……${player_name}你是第一次？」`,
            );
            await era.printAndWait(
              `『是啊……姐姐，虽说本来是想留给魔王大人的${heart(1)} 不过给姐姐的话我也不介意啦！』`,
            );
            await era.printAndWait(
              `这个意外的发现让${target_name}有些震撼，交合的动作也停了下来。`,
            );
            await era.printAndWait(
              `但是${player_name}却撒娇似地环住了姐姐的脖子，坐在${target_name}的腿上，自己动起了腰`,
            );
            await era.printAndWait(
              `『没关系的姐姐，尽情侵犯我吧！因为人家最喜欢姐姐了啊啊${heart(1)}』`,
            );
            await era.printAndWait(
              `「呜啊啊！对不起，${player_name}！我也最喜欢你了！」`,
            );
            await era.printAndWait(
              `从${player_name}的蜜穴里慢慢淌出了纯洁的处女之血……`,
            );
          } else {
            await era.printAndWait(
              `『啊啊……被，被姐姐夺去处女了啊啊${heart(1)}』`,
            );
            await era.printAndWait(
              `「呜呜，对不起，对不起，${player_name}……真的……呜呜呜」`,
            );
            await era.printAndWait(
              `在${master_name}的命令下，${target_name}，哭泣着侵犯了自己妹妹，夺去了${player_name}的处女身。`,
            );
            await era.printAndWait(
              `极度的屈辱，痛苦与内疚让她眼泪不住地往下流，而${master_name}抓着她的腰，强迫她继续着。`,
            );
            await era.printAndWait(
              `从${player_name}的蜜穴里慢慢淌出了纯洁的处女之血……`,
            );
          }
        } else {
          if (era.get(`talent:${target}:76`) === 1) {
            await era.printAndWait(
              `「哎哎……差点都忘记${player_name}已经不再是女孩子了呢！那就不用客气了呢！」`,
            );
            await era.printAndWait(
              `${target_name}兴奋地扭动着腰，尽情地侵犯着${player_name}。`,
            );
            await era.printAndWait(
              `「哎呀呀，被姐姐侵犯也会这么有感觉呢，不过反正都不是处女了，也不奇怪！」`,
            );
            await era.printAndWait(
              `『呜……啊啊……姐姐好棒……一点都不输给男人啊啊啊${heart(1)}』`,
            );
            await era.printAndWait(
              `已经被充分调教过的${player_name}在如此激烈的交合下，感受到了无上的快感。`,
            );
            await era.printAndWait(`这场姐妹的乱伦盛宴让你大饱眼福……`);
          } else if (era.get(`talent:${target}:85`) === 1) {
            await era.printAndWait(`『哎呀呀……姐姐技术很生疏呢${heart(1)}』`);
            await era.printAndWait(
              `${player_name}被${target_name}抱在怀里，很快就适应了姐姐腰部动作的节奏，甚至自己扭起腰来。`,
            );
            await era.printAndWait(`「…为什么……会这么熟练的？」`);
            await era.printAndWait(
              `『嘿嘿……是因为已经被魔王大人用各种方式调教过了呢${heart(1)} 』`,
            );
            await era.printAndWait(
              `${player_name}从容的姿态让${target_name}皱起了眉头，但很快就恢复了笑容，加快了抽插的速度。`,
            );
            await era.printAndWait(
              `「这样的话会舒服一些吗，${player_name}……嗯啊啊？」`,
            );
            await era.printAndWait(`『哈啊……舒服多了……姐姐好棒啊！』`);
          } else {
            await era.printAndWait(
              `${target_name}在你的命令下，不得不开始侵犯自己的妹妹。`,
            );
            await era.printAndWait(
              `「呜呜……对不起，${player_name}，对不起……」`,
            );
            await era.printAndWait(
              `无法违抗你的命令的${target_name}只能泪流满面地扭动着腰。`,
            );
            await era.printAndWait(
              `『哎呀呀……姐姐技术不行啊！腰动得这么慢，一点感觉都没有，哼♪』`,
            );
            await era.printAndWait(`「可，可是……呜呜呜！」`);
            await era.printAndWait(
              `${player_name}毫无廉耻的态度和语气让${target_name}羞得满脸通红，无奈地加快了抽插的速度………`,
            );
          }
        }
      }
      // CFLAG:TARGET:366  = 1（变量语义：CFLAG 族，TARGET:366）
      kojo.侵犯助手 = 1;
      return 0;
    } else {
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).chara.百合气质 >= 5 &&
          (kojo.侵犯助手 <= 8 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`『哈啊……姐姐来吧……我准备好了哦${heart(1)}』`);
          await era.printAndWait(
            `${player_name}用四肢趴在床上，让${target_name}从后面进入了自己的身体。`,
          );
          await era.printAndWait(
            `「嘿嘿，妹妹变这么坦率，姐姐真高兴${heart(1)} 接下来就要一直侵犯到高潮为止了哦${heart(1)}」`,
          );
          await era.printAndWait(
            `『呜啊……啊啊啊……姐姐好棒${heart(1)} 最喜欢姐姐了……最喜欢了啊啊啊${heart(1)}』`,
          );
          await era.printAndWait(
            `${target_name}听到妹妹的夸奖，心满意足地加快了抽插的动作……`,
          );
          // CFLAG:TARGET:366  = 9（变量语义：CFLAG 族，TARGET:366）
          kojo.侵犯助手 = 9;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).chara.百合气质 >= 3 &&
          (kojo.侵犯助手 <= 7 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「${player_name}乖乖趴着，屁股再翘高一点……对，就是这样……恩恩，姐姐最喜欢坦率的${player_name}了${heart(1)}」`,
          );
          await era.printAndWait(
            `『哎哎……这次要稍微温柔一点哦姐姐，不要弄痛我！』`,
          );
          await era.printAndWait(
            `${target_name}舔着嘴唇，抓着${player_name}的臀部，一口气贯入到了蜜穴最深处。`,
          );
          await era.printAndWait(
            `『呜……呜啊啊……太深了，都说……温柔一点了啊啊！』`,
          );
          await era.printAndWait(
            `「这可不是你说了算哦，接下来就要侵犯到${player_name}失神为止了哦，嘿嘿嘿。」`,
          );
          // CFLAG:TARGET:366  = 8（变量语义：CFLAG 族，TARGET:366）
          kojo.侵犯助手 = 8;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.侵犯助手 <= 6 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「老实一点啊，${player_name}，不然会很痛的哦${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}舔着嘴唇，开始侵犯妹妹${player_name}幼小而紧致的蜜穴。`,
          );
          await era.printAndWait(`『呜……啊啊……姐姐……不，不能再进去了啊啊！』`);
          await era.printAndWait(
            `「哎呀呀！不好意思……不过呢，我可没打算停下来呀${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}脸上浮现了兴奋的笑容，继续侵犯着${player_name}……`,
          );
          // CFLAG:TARGET:366  = 7（变量语义：CFLAG 族，TARGET:366）
          kojo.侵犯助手 = 7;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).chara.百合气质 >= 5 &&
          (kojo.侵犯助手 <= 5 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「嗯啊……${heart(1)} 虽然一直喜欢你，但只有这样，${player_name}才会真正变成属于我的了啊啊啊！」`,
          );
          await era.printAndWait(`『我，我也最爱姐姐啊${heart(1)}』`);
          await era.printAndWait(
            `${target_name}和${player_name}两具身躯淫靡的交缠在一起，尽情享受着百合之交的极度快感。`,
          );
          await era.printAndWait(
            `姐妹百合淫靡而甘甜的气味，飘散在调教室的空气中……`,
          );
          // CFLAG:TARGET:366  = 6（变量语义：CFLAG 族，TARGET:366）
          kojo.侵犯助手 = 6;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).chara.百合气质 >= 3 &&
          (kojo.侵犯助手 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「啊啊，姐姐最爱你了，${player_name}♪」`);
          await era.printAndWait(
            `${target_name}的眼中泛着爱的光芒，将${player_name}压在自己的身下，侵犯着小小的蜜穴。`,
          );
          await era.printAndWait(
            `『说，说什么呢啊姐姐……我，我可是属于魔王大人的呢${heart(1)} 不过……姐姐的动作好温柔，好舒服啊啊…${heart(1)}』`,
          );
          await era.printAndWait(
            `「姐姐也很舒服啊，${player_name}，${player_name}……让我们永远在一起吧${heart(1)}」`,
          );
          // CFLAG:TARGET:366  = 5（变量语义：CFLAG 族，TARGET:366）
          kojo.侵犯助手 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.侵犯助手 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`『呜……啊啊……姐姐的身体……好温暖！』`);
          await era.printAndWait(
            `「啊啊，${player_name}！${player_name}的身体也是啊！」`,
          );
          await era.printAndWait(
            `${target_name}抱着身下的${player_name}，温和地侵入着妹妹小小的蜜穴……`,
          );
          // CFLAG:TARGET:366  = 4（变量语义：CFLAG 族，TARGET:366）
          kojo.侵犯助手 = 4;
        } else if (
          chara(target).chara.百合气质 >= 3 &&
          (kojo.侵犯助手 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「对不起，${player_name}…真的对不起……呜呜……姐姐也不知道为什么自己会变成这样！」`,
          );
          await era.printAndWait(
            `${target_name}道着歉的同时，动作也停了下来。`,
          );
          await era.printAndWait(
            `『没关系的……姐姐${heart(1)} 来吧……侵犯${player_name}吧${heart(1)} 因为……${player_name}…最喜欢姐姐了啊！』`,
          );
          await era.printAndWait(
            `听到${player_name}呻吟着的回答，${target_name}吻着自己的妹妹，重新动起了腰……`,
          );
          // CFLAG:TARGET:366  = 3（变量语义：CFLAG 族，TARGET:366）
          kojo.侵犯助手 = 3;
        } else if (kojo.侵犯助手 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(
            `${target_name}在你的命令下，无可奈何地开始侵犯自己的妹妹。`,
          );
          await era.printAndWait(`「呜呜……对不起，对不起，${player_name}………」`);
          await era.printAndWait(
            `『哈啊……姐姐……没关系啦。被姐姐侵犯，${player_name}其实……一点都不介意呀${heart(1)}』`,
          );
          await era.printAndWait(
            `${target_name}脸颊上满是屈辱的泪水，动作缓慢地侵犯着自己的妹妹。`,
          );
          // CFLAG:TARGET:366  = 2（变量语义：CFLAG 族，TARGET:366）
          kojo.侵犯助手 = 2;
        }
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 66) {
    if (kojo.双人口交 === 0) {
      if (assi_mao) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「哈啊……魔王大人和${assi_name}的阴茎……都好棒啊${heart(1)}」`,
          );
          await era.printAndWait(`『姐姐，快点吸人家的小鸡鸡啦♪』`);
          await era.printAndWait(
            `正在为${master_name}口交的${target_name}，卖力地吸吮着口中的阴茎，${assi_name}在一旁看得急不可耐的样子。`,
          );
          await era.printAndWait(
            `「别急啦……让我先帮魔王大人口完就轮到你了${heart(1)} 咕呣……咕呣……${heart(1)} 魔王大人的阴茎的味道……好棒${heart(1)}」`,
          );
          await era.printAndWait(
            `『魔王大人快点啦，快点把精液射在姐姐这淫荡的嘴巴小穴里……然后让我也享受一下啦${heart(1)}』`,
          );
          await era.printAndWait(
            `${assi_name}，用勃起的阴茎在${target_name}的脸上来回摩擦着，见状，${target_name}无奈地吐出了${master_name}的阴茎，转而舔着妹妹的。`,
          );
          await era.printAndWait(
            `「哎哎，别那么急嘛${heart(1)} 你和魔王大人的阴茎，我都会用嘴巴小穴好好侍奉的${heart(1)}」`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「啊啊……两人的阴茎都已经……勃起得硬邦邦的了呀${heart(1)}」`,
          );
          await era.printAndWait(`『快点啊姐姐，要好好舔到我们满意为止哦！』`);
          await era.printAndWait(`「好，好啦……不要那么急嘛♪」`);
          await era.printAndWait(
            `${target_name}红着脸将两人的阴茎温柔地握在手心、然后低下头含住了${master_name}的阴茎，努力地吸吮着。`,
          );
          await era.printAndWait(
            `「咕呣……咕呣……魔王大人的阴茎的味道${heart(1)} 光是这么含着……就感觉好舒服${heart(1)} ${assi_name}不要着急，我也会让你一起舒服的${heart(1)} 请两位……尽情享用${target_name}的嘴巴小穴吧${heart(1)} 」`,
          );
          await era.printAndWait(
            `${target_name}伸出舌头，轮流舔着两人的龟头，双手也抓着阴茎来回摩擦着。`,
          );
          await era.printAndWait(
            `『啊啊……姐姐的舌头……好棒${heart(1)} 光是这么舔着……人家就已经要射了啊啊${heart(1)}』`,
          );
        } else {
          await era.printAndWait(
            `「一，一定要两个人一起来吗（明明……是这么讨厌的事情……为什么……视线完全移不开？）」`,
          );
          await era.printAndWait(
            `${master_name}和${assi_name}的阴茎从左右两边逼近了${target_name}的脸，抵在了鼻子和嘴唇上。`,
          );
          await era.printAndWait(
            `『努力用嘴巴让我们射出来就行了，加油啊姐姐♪』`,
          );
          await era.printAndWait(
            `望着妹妹那急不可耐的样子，${target_name}叹息了一声、张开嘴含住了妹妹的阴茎吸吮了起来。`,
          );
          await era.printAndWait(`「我会……好好口交的……咕呣……咕呣……！」`);
          await era.printAndWait(
            `『唔哇哇……姐姐的口交好舒服！已经被调教的这么好了呀！看，魔王大人也兴奋起来了呢♪』`,
          );
          await era.printAndWait(
            `${master_name}用勃起的阴茎在${target_name}脸上来回摩擦着，${target_name}的眼神黯淡了下去，露出完全屈服的表情，开始用嘴巴侍奉着${master_name}的阴茎……`,
          );
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
      // CFLAG:TARGET:367  = 1（变量语义：CFLAG 族，TARGET:367）
      kojo.双人口交 = 1;
      return 0;
    } else {
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.双人口交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          switch (rand_n(3)) {
            case 2: {
              await era.printAndWait(
                `「呣啊……呣啊${heart(1)} 魔王大人……还有${assi_name}的阴茎${heart(1)} 都好棒${heart(1)} 好好吃${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}交替吸吮着${master_name}和${assi_name}的阴茎，用灵巧的舌头不断刺激着龟头的敏感点。`,
              );
              await era.print(
                `『唔哇哇……姐姐的舌头${heart(1)} 好棒好舒服……表情也变得这么淫乱了，小鸡鸡真的那么好吃吗！？』`,
              );
              await era.printAndWait(
                `${target_name}精湛的口交技术让${assi_name}和${master_name}的腰一阵阵酥麻，快感沿着脊髓一路上传到大脑。`,
              );
              await era.printAndWait(
                `「咕呣……呣呣${heart(1)}…来吧……一起在我的嘴巴小穴射的满满的吧${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}从口交侍奉中感到了极大的心理满足和快感，带着无比兴奋的表情，继续轮流吸吮着两人的阴茎……`,
              );
              break;
            }
            case 1: {
              await era.printAndWait(
                `${target_name}轮流吸吮着两人的阴茎，唾液从贪婪的嘴里不住地流出，沾满了整根茎身。`,
              );
              await era.printAndWait(
                `「咕呣……呣呣${heart(1)} 阴茎……好棒……好好吃${heart(1)}」`,
              );
              await era.print(
                `『哎呀呀，姐姐吸小鸡鸡吸得这么起劲，在嘴里进进出出的…${heart(1)} 完全变成口交性奴了呢${heart(1)}』`,
              );
              await era.printAndWait(
                `「是啊……是啊${heart(1)}…要让姐姐一次吸吮两根吗……也好啊，不过作为回报，你们得一起射在我的嘴里哦${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}说着淫乱不堪的台词，然后低下头继续用嘴侍奉着两人的阴茎……`,
              );
              break;
            }
            case 0: {
              await era.printAndWait(
                `「咕啾……咕啾${heart(1)} 居然能独占${assi_name}和魔王大人两人的阴茎……${heart(1)} 真是太幸福了${heart(1)}」`,
              );
              await era.print(
                `『啊啊……姐姐吸吮得那么起劲！真的有那么好吃吗？』`,
              );
              await era.printAndWait(
                `${target_name}带着急促的呼吸，卖力地舔舐，吸吮着妹妹的阴茎，灵巧的舌头不断地刺激着龟头的敏感点。`,
              );
              await era.printAndWait(
                `「是啊……人家的嘴巴小穴……最喜欢被阴茎塞得满满的${heart(1)} 咕呣……咕呣……咕呣${heart(1)} 精液……快点给我吧……${heart(1)} 咕呣咕呣${heart(1)}」`,
              );
              await era.print(
                `『啊啊……姐姐的口交好舒服，舒服得腰都快软掉了${heart(1)} 』`,
              );
              await era.printAndWait(
                `「接下来是魔王大人的阴茎了哦${heart(1)} 来吧……尽情地侵犯${target_name}淫乱的嘴巴小穴里吧${heart(1)} 呣啾……呣啾${heart(1)}」`,
              );
              await era.printAndWait(
                `在妹妹的称赞下得到极大心理满足的${target_name}向${master_name}露出娇媚而得意的表情，转而开始吸吮${master_name}的阴茎……`,
              );
              break;
            }
          }
          // CFLAG:367  = 5（变量语义：CFLAG 族，367）
          kojo.双人口交 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.双人口交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          switch (rand_n(3)) {
            case 2: {
              await era.printAndWait(
                `「请尽情享用${target_name}的嘴巴小穴吧${heart(1)} 咕呣……呣呣呣${heart(1)} ♪」`,
              );
              await era.print(`『姐姐，快点也吸一下人家的小鸡鸡${heart(1)}』`);
              await era.printAndWait(
                `${target_name}低着头，轮流用嘴侍奉着${master_name}和${assi_name}两人的阴茎。`,
              );
              await era.printAndWait(
                `「咕呣……咕呣${heart(1)}…两人的阴茎${heart(1)} 都好热，好硬……咕呣呣${heart(1)}」`,
              );
              await era.printAndWait(
                `『啊啊……对！就是那里！快点再舔那个位置${heart(1)}』`,
              );
              break;
            }
            case 1: {
              await era.printAndWait(
                `${target_name}低着头，轮流用嘴热情地侍奉着${master_name}和${assi_name}两人的阴茎。`,
              );
              await era.printAndWait(
                `「咕呣……咕呣${heart(1)}…阴茎在嘴巴里的感觉……好棒……咕呣呣${heart(1)}」`,
              );
              await era.print(
                `『啊啊……姐姐，快点吞到最里面啊${heart(1)} 让我感受一下姐姐的喉咙小穴${heart(1)}』`,
              );
              await era.printAndWait(
                `「不，不要急啦……你和魔王大人都会有的${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}微笑着，温柔地含住了${assi_name}的阴茎，一直吞到了喉咙深处……`,
              );
              break;
            }
            case 0: {
              await era.printAndWait(
                `「咕呣……咕呣${heart(1)} 呜啊……两人的阴茎……都在嘴里坚挺起来了${heart(1)}」`,
              );
              await era.print(
                `『哎呀呀，姐姐完全兴奋起来了呢，连嘴巴小穴也能感觉到快感吗${heart(1)} 哈哈，魔王大人你看，以后就让姐姐当我们的口交性奴好了呢！』`,
              );
              await era.printAndWait(
                `「才，才不会……有快感……呣呣呣……咕呣……咕呣${heart(1)}」`,
              );
              await era.printAndWait(
                `被妹妹羞辱得满脸通红的${target_name}，内心却更加兴奋，继续卖力地吸吮着两人的阴茎	。`,
              );
              await era.printAndWait(
                `「咕呣……咕呣${heart(1)} 呣呣呣……${heart(1)} 要，要射精的时候……记得说一声${heart(1)}」`,
              );
              await era.print(
                `『啊啊${heart(1)} 看到姐姐口交时的淫荡样子就已经让人受不了了${heart(1)}』`,
              );
              await era.printAndWait(
                `${target_name}低着头，用舌尖缠卷着龟头，继续用嘴和喉咙侍奉着两人的阴茎……`,
              );
              break;
            }
          }
          // CFLAG:367  = 4（变量语义：CFLAG 族，367）
          kojo.双人口交 = 4;
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.双人口交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          switch (rand_n(3)) {
            case 2: {
              await era.printAndWait(
                `「请……按顺序来啊……不要把阴茎……在人家的脸上来回蹭♪」`,
              );
              await era.print(
                `『哎呀，姐姐我实在是等不及了嘛……快点也给我舔啊♪』`,
              );
              await era.printAndWait(
                `「好……好吧……咕呣……咕呣……呣呣呣（呜呜……为什么还不射……还要舔多久！）」`,
              );
              break;
            }
            case 1: {
              await era.printAndWait(
                `「咕呣……咕呣……两，两根一起吸的话……会有奖励吗♪」`,
              );
              await era.print(
                `『奖励？能让性奴姐姐和魔王大人的鸡鸡亲吻，还有什么不知足的${heart(1)} 快点吸啦${heart(1)}』`,
              );
              await era.printAndWait(`「好……好的……咕呣……呣呣呣♪」`);
              break;
            }
            case 0: {
              await era.printAndWait(
                `「咕呣咕呣……呣呣……阴茎好烫，好硬……呣呣♪」`,
              );
              await era.print(
                `『哎嘿嘿，姐姐的嘴巴小穴还挺舒服的。${heart(1)} 呐，我和魔王大人的阴茎，哪一根吃起来比较舒服啊？不许思考，马上回答。答错了就要惩罚哦。』`,
              );
              await era.printAndWait(`「这……这种问题……咕呣……呣呣呣…♪」`);
              await era.printAndWait(
                `${target_name}只能通过努力口交来回避这种怎么回答都是错误的问题……`,
              );
              break;
            }
          }
          // CFLAG:367  = 3（变量语义：CFLAG 族，367）
          kojo.双人口交 = 3;
        } else if (kojo.双人口交 <= 1 || game.kojo.口上开关 === 2) {
          switch (rand_n(3)) {
            case 2: {
              await era.printAndWait(`「呜呜……味道……好难闻……咕呣……咕呣！」`);
              await era.print(`『该吸吮人家的小鸡鸡了啦！快点快点』`);
              await era.printAndWait(`「呜呜……饶，饶了姐姐吧……下巴好酸……」`);
              break;
            }
            case 1: {
              await era.printAndWait(
                `「唔呣……唔呣……不，不可以啊……两根……不能一起进到嘴巴里的！」`,
              );
              await era.print(
                `『那就要更努力地舔啊！不然的话就把姐姐的下巴卸脱臼，就可以两根一起进去了！』`,
              );
              await era.printAndWait(
                `「不……不要对姐姐做那么可怕的事情……求你了……我，我会好好舔的…」`,
              );
              break;
            }
            case 0: {
              await era.printAndWait(
                `「呜呜……什么时候才能结束……咕呣……咕呣……」`,
              );
              await era.print(
                `『哎嘿嘿，姐姐的嘴巴小穴，还挺舒服呢${heart(1)}』`,
              );
              await era.printAndWait(
                `「然，然后轮到魔王大人了吗……咕呣……咕呣！」`,
              );
              break;
            }
          }
          // CFLAG:367  = 2（变量语义：CFLAG 族，367）
          kojo.双人口交 = 2;
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.双人口交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait('');
          // CFLAG:367  = 5（变量语义：CFLAG 族，367）
          kojo.双人口交 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.双人口交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait('');
          // CFLAG:367  = 4（变量语义：CFLAG 族，367）
          kojo.双人口交 = 4;
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.双人口交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait('');
          // CFLAG:367  = 3（变量语义：CFLAG 族，367）
          kojo.双人口交 = 3;
        } else if (kojo.双人口交 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait('');
          // CFLAG:367  = 2（变量语义：CFLAG 族，367）
          kojo.双人口交 = 2;
        }
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 68) {
    if (kojo.双人侍奉口交 === 0) {
      if (assi_mao) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `姐妹两人顺从地跪在${master_name}的腿前，一同侍奉着${master_name}的阴茎。`,
          );
          await era.printAndWait(
            `「魔王大人……请享用人家的嘴和喉咙小穴吧${heart(1)} 咕呣……咕呣……呣呣……好美味……魔王大人的阴茎${heart(1)}」`,
          );
          await era.printAndWait(
            `『啊啊啊，姐姐太狡猾了，居然一人独占了！还整根都吞到嘴里了！』`,
          );
          await era.printAndWait(
            `被姐姐抢了先机的${assi_name}慌慌张张地抱着${master_name}的脚，寻找着机会从${target_name}的嘴边夺回侍奉${master_name}阴茎的机会。`,
          );
          await era.printAndWait(
            `『啊啊，我也想被魔王大人侵犯嘴巴啊……姐姐一个人独占真是太卑鄙了！呜呜呜！』`,
          );
          await era.printAndWait(
            `「咕呣……咕呣……对不起啦……人家只是一看到魔王大人的阴茎，就完全无法自控了而已……来吧，接下来我们就一起侍奉吧。」`,
          );
          await era.printAndWait(
            `${target_name}又吸吮了几次，然后将被唾液沾满的阴茎让到了妹妹的那一边。`,
          );
          await era.printAndWait(
            `『耶耶……姐姐真是好人，接下来就请魔王大人享用${assi_name}的嘴巴小穴吧……咕呣……呣呣呣${heart(1)}』`,
          );
          await era.printAndWait(
            `「哎呀，那么开心的样子……那，剩下的地方就交给我的舌头吧${heart(1)} 呣啾……呣啾……呣啾${heart(1)}」`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `姐妹两人跪在${master_name}的腿前，一同用嘴侍奉着${master_name}的阴茎。`,
          );
          await era.printAndWait(`「啊啊……魔王大人的阴茎，好坚挺好雄伟♪」`);
          await era.printAndWait(`『是啊……人家最喜欢了…咕呣……咕呣……呣呣♪』`);
          await era.printAndWait(
            `「喂！不是说好一人一半吗！不能一人独占啊${heart(1)}」`,
          );
          await era.printAndWait(
            `『哎呀呀，姐姐，我只是忍不住先舔一下而已啦……来吧，一起来侍奉魔王大人的阴茎吧${heart(1)}』`,
          );
          await era.printAndWait(
            `关系融洽的姐妹两人，如同商量好了一般，一人一边舔舐着${master_name}的阴茎，轮流含进嘴里吸吮着。`,
          );
          await era.printAndWait(
            `「呣呣……呣呣……魔王大人……请尽情享用我们姐妹性奴的嘴巴和喉咙小穴吧…${heart(1)} 」`,
          );
          await era.printAndWait(
            `在两人卖力地用嘴，舌头和喉咙侍奉下，${master_name}的阴茎更加坚挺了……`,
          );
        } else {
          await era.printAndWait(
            `姐妹两人跪在${master_name}的腿前，一同用嘴侍奉着${master_name}的阴茎。`,
          );
          await era.printAndWait(`『嘿嘿，姐姐先来，我后补……♪』`);
          await era.printAndWait(`「让，让我先吗……好，好的……呣呣……呣呣」`);
          await era.printAndWait(
            `『不用客气，要好好用你的嘴巴小穴侍奉魔王大人的阴茎啊』`,
          );
          await era.printAndWait(
            `${assi_name}看着姐姐努力地口交着，也忍不住低下头，用舌头舔着${master_name}的睾丸。`,
          );
          await era.printAndWait(
            `『哈啊，魔王大人……我们姐妹性奴一起侍奉的感觉如何呀${heart(1)}』`,
          );
          await era.printAndWait(`「啊啊……下巴好酸……」`);
          await era.printAndWait(
            `${target_name}带着些许悲伤和绝望的神情、和妹妹继续进行口交侍奉……`,
          );
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait('');
        } else if (chara(target).system.侍奉精神 >= 3) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      }
      // CFLAG:TARGET:369  = 1（变量语义：CFLAG 族，TARGET:369）
      kojo.双人侍奉口交 = 1;
      return 0;
    } else {
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.双人侍奉口交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          if (era.get(`talent:${era_flag.assi}:85`)) {
            switch (rand_n(3)) {
              case 2: {
                await era.printAndWait(
                  `「咕呣……咕呣……${heart(1)} 魔王大人的阴茎……好美味${heart(1)} 呣呣……呣呣呣${heart(1)}」`,
                );
                await era.print(
                  `『姐姐，也让我舔一下啊${heart(1)} 咕呣呣${heart(1)}』`,
                );
                await era.printAndWait(
                  `姐妹两人口舌并用地一起侍奉着${master_name}的阴茎，交缠的舌头和飞溅的唾液，连同两人的淫靡的表情和动作一同构成了一副无比动人的景象。`,
                );
                await era.printAndWait(
                  `「只有我的嘴巴小穴才是最适合魔王大人的阴茎的呢…${assi_name}肯定就做不到这么好${heart(1)} 咕呣……咕呣……咕呣${heart(1)}」`,
                );
                await era.print(
                  `『人家的口交才，才不会输给姐姐你呢…！魔王大人你说是不是${heart(1)} 呣呣……呣呣${heart(1)} 唔唔～♪』`,
                );
                await era.printAndWait(
                  `${assi_name}一副不愿意输给姐姐的样子，从下边舔着，吸吮着${master_name}的睾丸………`,
                );
                break;
              }
              case 1: {
                await era.print(
                  `『呜哇哇……姐姐的口水流得这么多出来${heart(1)}』`,
                );
                await era.printAndWait(
                  `「咕啾……咕啾${heart(1)} 呣呣呣……魔王大人的阴茎${heart(1)} …在我的嘴巴小穴里……搅拌着……咕呣……咕呣${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}稍微吐出了阴茎，让妹妹舔着上面残留的口水，亲吻着龟头的敏感点。`,
                );
                await era.print(
                  `『真是的……姐姐的嘴巴已经完全变成性器了呢呣呣……呣呣……${heart(1)}』`,
                );
                await era.printAndWait(
                  `「是啊……姐姐的嘴和喉咙……就是魔王大人的专用小穴啊啊${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}将阴茎的掌控权从妹妹的手中强夺了回来，继续含进口中，无比热情地吸吮着，舔舐着。`,
                );
                await era.printAndWait(
                  `「哎哎……我还没侍奉够呢，姐姐怎么这样呢${heart(1)} 好吧……那我就舔其他的地方好了……呣呣……呣呣${heart(1)}」`,
                );
                break;
              }
              case 0: {
                await era.printAndWait(
                  `「咕啾……咕啾${heart(1)} 呣呣呣……魔王大人的阴茎${heart(1)} 好热……好硬${heart(1)}」`,
                );
                await era.print(
                  `『唔哇哇……姐姐居然会露出这样的表情……真的那么喜欢给魔王大人口交吗${heart(1)} 喂，也让我舔舔，人家也要侍奉魔王大人${heart(1)}』`,
                );
                await era.printAndWait(
                  `${assi_name}从姐姐的旁边加入，用灵巧的舌头来回舔舐着${master_name}的阴茎根部和睾丸，唾液都流到了大腿根上。`,
                );
                await era.printAndWait(
                  `姐妹两人热情侍奉带来的强烈快感沿着${player_name}的腰一路向上传递。`,
                );
                await era.print(
                  `『唔呣呣……魔王大人的阴茎，一跳一跳的，好像要射精了呢${heart(1)} 』`,
                );
                await era.printAndWait(
                  `「呣呣？${heart(1)} 魔王大人……请一定要射在我的嘴里啊${heart(1)} 在${target_name}的嘴巴小穴里射的满满的吧${heart(1)}」`,
                );
                break;
              }
            }
          } else if (era.get(`talent:${era_flag.assi}:76`)) {
            switch (rand_n(3)) {
              case 2: {
                await era.print(
                  `『唔呣……唔呣${heart(1)} 魔王大人的阴茎……喜欢${assi_name}的嘴巴小穴吗${heart(1)}』`,
                );
                await era.printAndWait(
                  `「快点……让我来${heart(1)} 呣呣呣……咕呣……咕呣${heart(1)} 魔王大人的阴茎……好棒……好喜欢${heart(1)}」`,
                );
                await era.printAndWait(
                  `姐妹两人激烈地吸吮，舔舐着${master_name}的阴茎，为了争夺龟头，两根舌头卷绕在一起互不相让，唾液不住地从嘴角滴落在${master_name}的阴茎和大腿上。`,
                );
                await era.printAndWait(
                  `「适可而止吧妹妹！魔王大人的阴茎是属于我的啊${heart(1)} 呣呣……呣呣……魔王大人你说是不是……${heart(1)}」`,
                );
                await era.print(
                  `『哼，开什么玩笑${heart(1)} 我侍奉魔王大人的时候……你可还在村子里不知道想着谁自慰呢${heart(1)}』`,
                );
                await era.printAndWait(
                  `两个奴隶居然在可笑地互相声明对${master_name}阴茎的所有权，但你只是冷笑了一下，什么话都没说，继续享受着两人的口交侍奉……`,
                );
                break;
              }
              case 1: {
                await era.print(
                  `『魔王大人的阴茎的味道${heart(1)}…咕呣……咕呣${heart(1)}……好喜欢，最喜欢了${heart(1)}』`,
                );
                await era.printAndWait(
                  `「人家比你更喜欢呢……快点轮到我了${heart(1)} 呸咯……呸咯……${heart(1)}」`,
                );
                await era.printAndWait(
                  `作为妹妹的${assi_name}带着急促的呼吸，贪婪地吸吮着阴茎，${target_name}则不时向你投来淫媚的眼神，用灵巧的舌头刺激着敏感点。`,
                );
                await era.printAndWait(
                  `「咕呣……咕呣${heart(1)}…… 如何……魔王大人${heart(1)} 还是人家的口交技术比较好吧${heart(1)} 」`,
                );
                await era.print(
                  `『胡说……什么呢${heart(1)} 呣呣呣……呣呣${heart(1)} 明明就是人家的嘴巴小穴……更适合魔王大人${heart(1)}』`,
                );
                await era.printAndWait(
                  `「明明是我……呣呣呣${heart(1)} …魔王大人……你说呢${heart(1)}」`,
                );
                break;
              }
              case 0: {
                await era.printAndWait(
                  `「咕呣……咕呣${heart(1)}…… 感觉如何，魔王大人……要射精的话……记得说一声哦${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}将${master_name}的阴茎含在嘴里吸吮着，用灵巧的舌头借着唾液搅拌着。`,
                );
                await era.print(
                  `『姐姐好卑鄙${heart(1)} 留一点给人家啦${heart(1)} 我也想要魔王大人的阴茎在人家的嘴巴里搅拌啦${heart(1)}』`,
                );
                await era.printAndWait(
                  `而${assi_name}则趴在下面，摇着屁股，看着姐姐贪婪地吸吮着龟头，自己却无从下嘴，气得脸颊鼓鼓的，只能用舌头舔着剩下的部位。`,
                );
                await era.printAndWait(
                  `姐妹两人热情的侍奉带来的强烈快感刺激得${master_name}的阴茎一跳一跳的，见状，两人同时张开嘴，异口同声地说道。`,
                );
                await era.print(
                  `「啊啊——魔王大人要射精了吗${heart(1)} 请把精液赏给这淫乱的嘴巴小穴吧${heart(1)}」`,
                );
                await era.printAndWait(
                  `『啊啊——魔王大人要射精了吗${heart(1)} 请把精液赏给这淫乱的嘴巴小穴吧${heart(1)}』`,
                );
                break;
              }
            }
          }
          // CFLAG:369  = 5（变量语义：CFLAG 族，369）
          kojo.双人侍奉口交 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.双人侍奉口交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          if (era.get(`talent:${era_flag.assi}:85`)) {
            switch (rand_n(3)) {
              case 2: {
                await era.printAndWait(
                  `「呣呣……呣呣${heart(1)}……请尽情享用我们两姐妹的嘴巴小穴吧${heart(1)}」`,
                );
                await era.print(
                  `『哎呀……姐姐的口水都流出来了呢${heart(1)} 没关系，我来帮你舔干净${heart(1)}』`,
                );
                await era.printAndWait(
                  `关系融洽的姐妹两人，如同商量好了一般，配合无间地侍奉着阴茎。`,
                );
                await era.printAndWait(
                  `两根灵巧的舌头完美地配合着，缠绕着${master_name}的阴茎。`,
                );
                await era.print(
                  `『魔王大人的阴茎……好坚挺好雄伟…${heart(1)} 呣呣呣……唔呣呣${heart(1)}』`,
                );
                await era.printAndWait(
                  `「唔呣……魔王大人好像很满意呢${heart(1)} 作为奖励……请把精液射在我们姐妹两人的脸上吧${heart(1)} 」`,
                );
                break;
              }
              case 1: {
                await era.printAndWait(
                  `「咕呣……咕呣……魔王大人的阴茎……好喜欢${heart(1)} 好美味${heart(1)}」`,
                );
                await era.print(
                  `『哎呀姐姐……不要越线啊${heart(1)} 之前不是说得好好的吗……唔呣……唔呣……${heart(1)}』`,
                );
                await era.printAndWait(
                  `姐妹两人沿着阴茎的正中线分成两边，用嘴热心地侍奉着自己的那一半，舌头时不时交缠在一起，一同刺激着龟头的敏感点。`,
                );
                await era.printAndWait(
                  `「唔呣……唔呣……${heart(1)} 为魔王大人口交……好幸福啊${heart(1)} 魔王大人好像也兴奋起来了呢……呣呣……呣呣${heart(1)}」`,
                );
                await era.print(
                  `『舒服的话，就请把精液在我们的嘴巴小穴里射的满满的吧，魔王大人${heart(1)} 呣呣……呣呣呣${heart(1)}』`,
                );
                await era.printAndWait(
                  `两人热情而娴熟的口交侍奉下，${master_name}的阴茎感受到了强烈的快感……`,
                );
                break;
              }
              case 0: {
                await era.print(
                  `『姐姐，该换人啦，轮到你来舔下面了，上面该我了${heart(1)}』`,
                );
                await era.printAndWait(
                  `「知道啦……姐姐知道你的嘴巴小穴喜欢被魔王大人的阴茎侵犯啦${heart(1)} 不过……真的很舒服呢${heart(1)}」`,
                );
                await era.printAndWait(
                  `姐姐露出荡漾而迷人的表情，看着妹妹张开嘴，含住了${master_name}的阴茎，卖力地吸吮起来，于是自己也低下头，舔着阴茎的根部和从妹妹嘴边落下的口水。`,
                );
                await era.print(
                  `『魔王大人的阴茎……唔呣……唔呣…魔王大人的阴茎……${heart(1)} 最喜欢了！呣呣…呣呒…${heart(1)} ♪』`,
                );
                await era.printAndWait(
                  `「魔王大人……如果您感觉满意的话…${heart(1)} 请射在我们的嘴里，让我们姐妹喝下您的精液吧${heart(1)}」`,
                );
                break;
              }
            }
          } else if (era.get(`talent:${era_flag.assi}:76`)) {
            switch (rand_n(3)) {
              case 2: {
                await era.print(
                  `『咕呣……唔呣呣${heart(1)}…… 魔王大人，这样舒服吗……呣呣……呣呣${heart(1)}』`,
                );
                await era.printAndWait(
                  `妹妹${assi_name}含着${master_name}的龟头，激烈地吸吮着，而姐姐${target_name}则温柔地舔着阴茎根部和睾丸。`,
                );
                await era.printAndWait(
                  `「呣呣……呣呣…${heart(1)} 呐，魔王大人……舒服的话就在${assi_name}的嘴里全部射出来吧${heart(1)} 我不会介意的♪」`,
                );
                await era.print(
                  `『姐姐放心啦，我不会一个人独吞的啦……唔呣……唔呣……唔呣${heart(1)}』`,
                );
                await era.printAndWait(
                  `显然已经兴奋起来的${assi_name}更卖力地吸吮着阴茎，而姐姐的舌头的动作也加快了。${master_name}尽情地享受着两人配合无间的侍奉……`,
                );
                break;
              }
              case 1: {
                await era.print(
                  `『唔呣呣……呣呣${heart(1)}……呣呣……呣呣${heart(1)} ……呣呣……呣呣${heart(1)}』`,
                );
                await era.printAndWait(
                  `${assi_name}无比热情地侍奉着${master_name}的阴茎，一次次吞到喉咙最深处，直到快要窒息才依依不舍地吐出来，这幅样子让一旁的${target_name}看得有些惊呆了。`,
                );
                await era.printAndWait(
                  `「我都不知道……原来妹妹这么喜欢阴茎的♪」`,
                );
                await era.printAndWait(
                  `${target_name}带着出神的表情看着妹妹全心全意侍奉着${master_name}的阴茎，卖力的吸吮，舔舐着，然后好像突然醒悟过来了一样。`,
                );
                await era.printAndWait(
                  `「啊啊……也，也让我来一下嘛${heart(1)} 我的嘴巴和喉咙小穴……魔王大人也一定会喜欢的${heart(1)}」`,
                );
                break;
              }
              case 0: {
                await era.printAndWait(
                  `「唔呣呣……呣呣${heart(1)}……呣呣……呣呣${heart(1)} ……阴茎在嘴里搅动的感觉…好舒服${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}卖力地吸吮着${master_name}的阴茎，灵巧的舌头温柔地摩擦着龟头。`,
                );
                await era.print(
                  `『那我就从后面来好了${heart(1)} 魔王大人一定会喜欢的……呣呣……呣呣${heart(1)}』`,
                );
                await era.printAndWait(
                  `${assi_name}则跪在${master_name}身后，细心地舔舐着${master_name}的肛门。`,
                );
                await era.printAndWait(
                  `姐妹两人一前一后的侍奉让${master_name}无比享受，产生了强烈的射精欲望。`,
                );
                await era.printAndWait(
                  `「唔呣？！魔王大人的阴茎……在嘴里一跳一跳…${heart(1)} 啊啊～ 请尽情的把精液射在${target_name}的舌头上吧${heart(1)}」`,
                );
                break;
              }
            }
          }
          // CFLAG:369  = 4（变量语义：CFLAG 族，369）
          kojo.双人侍奉口交 = 4;
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.双人侍奉口交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          switch (rand_n(3)) {
            case 2: {
              await era.print(
                `『姐姐，龟头也要和我一起好好地舔啊，这样魔王大人才会满意…♪』`,
              );
              await era.printAndWait(
                `「是，是吗……我，我明白了……呣呣……呣呣……♪」`,
              );
              await era.printAndWait(
                `${target_name}和妹妹两人一起用灵巧的舌头舔舐着${master_name}阴茎的每一处敏感点……`,
              );
              break;
            }
            case 1: {
              await era.printAndWait(
                `「咕呣……咕呣……阴茎在口腔里搅动的感觉……好奇怪♪」`,
              );
              await era.print(
                `『呀呀，姐姐看起来完全掌握给魔王大人口交的技术了呢…${heart(1)} 我也不能输呢……唔呣……唔呣${heart(1)}』`,
              );
              await era.printAndWait(`「才，才没有掌握那样的技术……呣呣……！」`);
              break;
            }
            case 0: {
              await era.printAndWait(`「咕呣……咕呣……阴茎的味道……好强烈♪」`);
              await era.print(
                `『嘿嘿，姐姐也吸吮得很努力呢，那我就来侍奉剩下的部位好了${heart(1)}』`,
              );
              await era.printAndWait(
                `姐妹两人跪在${master_name}的身前，用嘴和舌头努力为阴茎服务着`,
              );
              break;
            }
          }
          // CFLAG:369  = 3（变量语义：CFLAG 族，369）
          kojo.双人侍奉口交 = 3;
        } else if (kojo.双人侍奉口交 <= 1 || game.kojo.口上开关 === 2) {
          switch (rand_n(3)) {
            case 2: {
              await era.print(
                `『姐姐要认真一点吸吮啊，不要一副心不在焉的样子……呣呣……唔呣呣${heart(1)}』`,
              );
              await era.printAndWait(`「这，这种事情……唔呣……唔呣………」`);
              await era.printAndWait(
                `无比卖力地吸吮着阴茎的${assi_name}与提心吊胆，小心翼翼地用舌头舔着的${target_name}形成了鲜明的对比………`,
              );
              break;
            }
            case 1: {
              await era.printAndWait(`「咕呣……咕呣……下巴好酸……」`);
              await era.print(
                `『姐姐这么不用心，一会儿是要惩罚的哦……算了，让我来用嘴巴小穴侍奉魔王大人吧……你要好好学啊……咕呣咕呣咕呣…${heart(1)}』`,
              );
              await era.printAndWait(
                `「呜呜……为，为什么你会舔得这么激烈……以前明明……是多么纯洁的孩子！」`,
              );
              break;
            }
            case 0: {
              await era.printAndWait(`「呣呣……呣呣……好难闻……这个味道！」`);
              await era.print(
                `『哎嘿嘿，姐姐接下来就交给你来吸吮了哦，我就来舔其他部位好了♪』`,
              );
              await era.printAndWait(`「这，这种事情……才不要……呜呜呜！」`);
              break;
            }
          }
          // CFLAG:369  = 2（变量语义：CFLAG 族，369）
          kojo.双人侍奉口交 = 2;
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.双人侍奉口交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait('');
          // CFLAG:369  = 5（变量语义：CFLAG 族，369）
          kojo.双人侍奉口交 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.双人侍奉口交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait('');
          // CFLAG:369  = 4（变量语义：CFLAG 族，369）
          kojo.双人侍奉口交 = 4;
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.双人侍奉口交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait('');
          // CFLAG:369  = 3（变量语义：CFLAG 族，369）
          kojo.双人侍奉口交 = 3;
        } else if (kojo.双人侍奉口交 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait('');
          // CFLAG:369  = 2（变量语义：CFLAG 族，369）
          kojo.双人侍奉口交 = 2;
        }
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 123) {
    if (kojo.乳夹口交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「光是用胸部…和嘴巴…碰到阴茎…就好舒服了啊…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}带着淫媚的笑容，用双乳夹住了${player_name}的阴茎，低下头开始吸吮露出的龟头…`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「啊啊……身体好兴奋……嘴巴和胸部也好舒服……被魔王大人的阴茎摩擦的感觉${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}带着浓浓的爱意，低下头，继续用双乳和舌尖侍奉着${player_name}的阴茎……`,
        );
      } else if (chara(target).system.侍奉精神 >= 3) {
        await era.printAndWait(`「魔王大人……这样舒服吗？♪」`);
        await era.printAndWait(
          `${target_name}眼眶微微有些湿润，但还是努力地用双乳和嘴巴侍奉着${player_name}的阴茎……`,
        );
      } else {
        await era.printAndWait(`「这种事情……到底有什么好的………」`);
        await era.printAndWait(
          `${target_name}被${player_name}要求回答进行乳交侍奉的感想，一脸嫌恶地答道……`,
        );
      }
      // CFLAG:TARGET:360  = 1（变量语义：CFLAG 族，TARGET:360）
      kojo.乳夹口交 = 1;
      return 0;
    } else {
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.乳夹口交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「嘿嘿，被我的胸部和嘴巴这样服务，${player_name}的小鸡鸡很舒服吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}微笑着，继续低下头舔着${player_name}的阴茎。`,
          );
          await era.printAndWait(`「哇……阴茎颤抖得好厉害，要射了吗？」`);
          await era.printAndWait(
            `『嗯啊……是啊……姐姐快把嘴张开，我要射在你的舌头上${heart(1)}』`,
          );
          // CFLAG:360  = 5（变量语义：CFLAG 族，360）
          kojo.乳夹口交 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.乳夹口交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `${target_name}眨着眼睛，用丰满的双乳夹着${player_name}的阴茎，灵巧的舌头也卖力地舔舐着。`,
          );
          await era.printAndWait(
            `「啊啊……这样摩擦着……我的胸部也好舒服，${player_name}的阴茎……好烫好硬啊${heart(1)}」`,
          );
          await era.printAndWait(
            `『人家……也很舒服啊${heart(1)} 啊啊啊姐姐张开嘴……我要射了，你要全部喝下去啊${heart(1)}』`,
          );
          // CFLAG:360  = 4（变量语义：CFLAG 族，360）
          kojo.乳夹口交 = 4;
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.乳夹口交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「这，这样会很舒服吗……呣呣……呣呣♪」`);
          await era.printAndWait(
            `『嘿嘿，姐姐终于肯老老实实地侍奉我和魔王大人了吗，一会儿精液也得全部喝下去啊！』`,
          );
          await era.printAndWait(
            `${target_name}眼里含着泪水，但还是努力用双乳夹着${player_name}的阴茎，吸吮着龟头………`,
          );
          // CFLAG:360  = 3（变量语义：CFLAG 族，360）
          kojo.乳夹口交 = 3;
        } else if (kojo.乳夹口交 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(
            `『哇啊啊……被姐姐这对淫荡的大胸部乳交起来真舒服啊……不过嘴也不能闲着，得好好舔啊？』`,
          );
          await era.printAndWait(
            `「呜呜呜……一点都不舒服……为什么要让姐姐……做这么恶心的事情……」`,
          );
          await era.printAndWait(
            `${target_name}被${player_name}要求回答进行乳交侍奉的感想，一脸嫌恶地答道……`,
          );
          // CFLAG:360  = 2（变量语义：CFLAG 族，360）
          kojo.乳夹口交 = 2;
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.乳夹口交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「嘿嘿……魔王大人，阴茎被人家的胸部和嘴巴侍奉的舒服吗${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}脸上露出沉醉的笑意，继续用双乳夹着${player_name}的阴茎，低下头用舌尖舔着。`,
          );
          await era.printAndWait(
            `「呣呣……呣呣……人家的乳沟小穴，一点都不输给下面的两个淫穴吧？」`,
          );
          await era.printAndWait(
            `「魔王大人要射精的话……记得全部射在我的嘴里哦${heart(1)}」`,
          );
          // CFLAG:360  = 5（变量语义：CFLAG 族，360）
          kojo.乳夹口交 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.乳夹口交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `${target_name}眨着充满爱意的眼睛，继续用双乳夹着${player_name}的阴茎，低下头用舌尖舔着。`,
          );
          await era.printAndWait(
            `「啊啊……连自己都兴奋起来了……这样用胸部摩擦着${heart(1)}」`,
          );
          await era.printAndWait(
            `「唔呣……唔呣……唔呣${heart(1)} 魔王大人这次想要射在什么地方呢${heart(1)}」`,
          );
          // CFLAG:360  = 4（变量语义：CFLAG 族，360）
          kojo.乳夹口交 = 4;
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.乳夹口交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「呜呜……魔王大人……这样舒服吗？♪」`);
          await era.printAndWait(
            `${target_name}眼眶微微有些湿润，但还是努力地用双乳和嘴巴侍奉着${player_name}的阴茎……`,
          );
          // CFLAG:360  = 3（变量语义：CFLAG 族，360）
          kojo.乳夹口交 = 3;
        } else if (kojo.乳夹口交 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(`「呜呜呜……这种事情……到底有什么好的………」`);
          await era.printAndWait(
            `${target_name}被${player_name}要求回答进行乳交侍奉的感想，一脸嫌恶地答道……`,
          );
          // CFLAG:360  = 2（变量语义：CFLAG 族，360）
          kojo.乳夹口交 = 2;
        }
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 125) {
    if (kojo.口交时自慰 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「咕呣……咕呣……啊啊啊啊…边吸吮着魔王大人的肉棒，边自慰……这感觉真是太棒了${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}用舌头缠卷着${player_name}的阴茎，在口内吸吮着，而手已经忍不住伸到自己的下体自慰了起来。`,
        );
        await era.printAndWait(
          `「唔唔唔${heart(1)} 不知道是魔王大人会先在${target_name}的嘴里射出来，还是${target_name}会自己先自慰到高潮呢？」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「有…有点不好意思呢…魔王大人…不要这么盯着${target_name}看啦${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}用舌头缠卷着${player_name}的阴茎，在口内吸吮着，同时手也伸到了自己的下体，慢慢开始自慰。`,
        );
        await era.printAndWait(
          `「唔呣呣…边口交…边自慰${heart(1)} 比平时…更有感觉啊啊${heart(1)}」`,
        );
      } else if (chara(target).system.侍奉精神 >= 3) {
        await era.printAndWait(`「咕呣……咕呣……！」`);
        await era.printAndWait(
          `${target_name}遵循着${player_name}的命令，顺从地张开嘴含住了${player_name}的肉棒，仔细地舔吮着，手也伸到了自己的下体开始自慰……`,
        );
      } else {
        await era.printAndWait(
          `「别，别催了…我，我会照做的……这样…这种事情…就能让你满足了吗？」`,
        );
        await era.printAndWait(
          `${target_name}在命令下，不情愿地张开嘴含住了${player_name}的肉棒，手也伸到了自己的下体开始自慰。`,
        );
      }
      // CFLAG:TARGET:361  = 1（变量语义：CFLAG 族，TARGET:361）
      kojo.口交时自慰 = 1;
      return 0;
    } else {
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.口交时自慰 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「哈啊啊……边吸吮${player_name}的阴茎…边自慰…感觉比平时…还要棒呢……${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}用舌头缠卷着${player_name}的阴茎，在口内吸吮着，而手已经忍不住伸到自己的下体自慰了起来。`,
          );
          await era.printAndWait(
            `「唔呣呣…${heart(1)} 比赛一下…谁能忍住高潮吧…？」`,
          );
          await era.printAndWait(
            `『这样好了，姐姐先高潮的话，就要惩罚，让人家先高潮了，那就表扬${heart(1)}』`,
          );
          await era.printAndWait(
            `「哈啊${heart(1)} 那我得好好努力了${heart(1)} 我开动了哦…唔呣呣…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}再度张开嘴，将${player_name}的阴茎含进口中卖力地吸吮起来………`,
          );
          // CFLAG:361  = 5（变量语义：CFLAG 族，361）
          kojo.口交时自慰 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.口交时自慰 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「不要盯着人家看啦……怪难为情的…唔唔…唔呣呣${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}用舌头缠卷着${player_name}的阴茎，在口内吸吮着，同时手也伸到了自己的下体，自慰了起来。`,
          );
          await era.printAndWait(
            `「唔呣……咕呣${heart(1)} 哎哎……都说了不要用那样的眼神看着人家啦${heart(1)}」`,
          );
          await era.printAndWait(
            `『不能偷懒呀姐姐……继续给人家口交啊！在顾着自己舒服的时候，也要让人家舒服嘛！』`,
          );
          await era.printAndWait(`「好啦，知道啦……咕呣……咕呣…${heart(1)}」`);
          // CFLAG:361  = 4（变量语义：CFLAG 族，361）
          kojo.口交时自慰 = 4;
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.口交时自慰 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「我，我知道了……唔呣……咕呣……！」`);
          await era.printAndWait(
            `${target_name}在${player_name}的命令下张开嘴含住了的阴茎，同时手也伸到了自己的下体，自慰了起来。`,
          );
          await era.print(`『姐姐有干劲一点嘛，不要一副心不在焉的样子。』`);
          await era.printAndWait(
            `${player_name}坏笑着用脚趾刺激着${target_name}的蜜穴。`,
          );
          await era.print(`「不……不要恶作剧啊，${player_name}！」`);
          await era.printAndWait(
            `${target_name}在${player_name}的逗弄下不得不加快了动作……`,
          );
          // CFLAG:361  = 3（变量语义：CFLAG 族，361）
          kojo.口交时自慰 = 3;
        } else if (kojo.口交时自慰 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(
            `「别催啦……我，我会照做的……咕呣……咕呣……这样……就可以了吧？」`,
          );
          await era.printAndWait(
            `${target_name}在${player_name}的命令下张开嘴含住了的阴茎，同时手也伸到了自己的下体，自慰了起来。`,
          );
          await era.printAndWait(
            `『真是一点不行呢，这样敷衍了事的话，可是会受罚的哦♪』`,
          );
          // CFLAG:361  = 2（变量语义：CFLAG 族，361）
          kojo.口交时自慰 = 2;
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.口交时自慰 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「唔啊啊……能够边为魔王大人口交边自慰……真的是太幸福了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}用舌头舔舐着${player_name}的阴茎，边激烈地自慰着。`,
          );
          await era.printAndWait(
            `「咕呣……咕呣……${heart(1)} 已经……舒服得停不下来了……${heart(1)}」`,
          );
          await era.printAndWait(
            `「魔王大人……${heart(1)} 要记得射在人家的嘴里啊${heart(1)} 咕呣……咕呣……${heart(1)} 」`,
          );
          await era.printAndWait(
            `${target_name}继续卖力地吸吮着${player_name}的阴茎，发出一阵阵淫秽不堪的声音……`,
          );
          // CFLAG:361  = 5（变量语义：CFLAG 族，361）
          kojo.口交时自慰 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.口交时自慰 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「别，别这样盯着人家看啦……咕呣……咕呣${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}用舌头舔舐着${player_name}的阴茎，手伸到了下体开始自慰`,
          );
          await era.printAndWait(
            `「要，要看也行……但是……不要用那样的眼神啦${heart(1)} 直勾勾地盯着……怪不好意思的${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}边享受着${target_name}的口交，边欣赏着对方的耻态，灼热的视线让${target_name}变得面红耳赤。`,
          );
          await era.printAndWait(`「好，好丢人……咕呣……咕呣${heart(1)}」`);
          // CFLAG:361  = 4（变量语义：CFLAG 族，361）
          kojo.口交时自慰 = 4;
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.口交时自慰 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「咕呣……咕呣……魔王大人……这，这样可以吗！」`);
          await era.printAndWait(
            `${target_name}在${player_name}的命令下张开嘴含住了的阴茎，同时手也伸到了自己的下体，自慰了起来。`,
          );
          await era.printAndWait(
            `但是还不满足的${player_name}露出不怀好意的笑容，用脚趾刺激着${target_name}的蜜穴和肛门。`,
          );
          await era.print(
            `「唔？！不，不要对人家恶作剧啦，魔王大人……我，我会好好做的！」`,
          );
          await era.printAndWait(
            `${target_name}在${player_name}的逗弄下不得不加快了动作……`,
          );
          // CFLAG:361  = 3（变量语义：CFLAG 族，361）
          kojo.口交时自慰 = 3;
        } else if (kojo.口交时自慰 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(
            `「别催啦……我，我会照做的……咕呣……咕呣……这样……就可以了吧？？」`,
          );
          await era.printAndWait(
            `${target_name}在${player_name}的命令下张开嘴含住了的阴茎，同时手也伸到了自己的下体，自慰了起来。`,
          );
          await era.printAndWait(
            `「（为，为什么我会……做这样的事情…）唔呣……唔呣……还，还要这样多久？」`,
          );
          // CFLAG:361  = 2（变量语义：CFLAG 族，361）
          kojo.口交时自慰 = 2;
        }
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 126) {
    if (kojo.手搓口交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「唔唔……唔呣……唔呣${heart(1)}」`);
        await era.printAndWait(`「嘿嘿，边被手指摩擦着边口交，很舒服吧？」`);
        await era.printAndWait(
          `${target_name}脸上浮现出了淫媚的笑容，用舌尖舔弄着${player_name}的龟头，边用手指摩擦着根部……`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「唔呣……唔呣${heart(1)} 阴茎……热热的……感觉好舒服……${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}边${player_name}吸吮着阴茎边用手指按摩着，表情充满了发自内心的幸福感。`,
        );
        await era.printAndWait(
          `「唔唔……唔呣……唔呣…${player_name}${heart(1)} 要，要在嘴里发射了吗${heart(1)}」`,
        );
      } else if (chara(target).system.侍奉精神 >= 3) {
        await era.printAndWait(`「唔唔……唔唔……唔呣${heart(1)}」`);
        await era.printAndWait(
          `${target_name}手和嘴并用地侍奉着${player_name}的阴茎。`,
        );
        await era.printAndWait(`「这，这样感觉舒服吗……要不要再温柔一些……」`);
        await era.printAndWait(
          `${player_name}微笑着说道，已经从侍奉${target_name}的过程中感到了愉悦感……`,
        );
      } else {
        await era.printAndWait(`「唔唔……唔唔……唔呣！」`);
        await era.printAndWait(
          `${target_name}还不习惯同时用手和嘴侍奉阴茎，动作十分笨拙。`,
        );
        await era.printAndWait(
          `${player_name}不满的挺起腰，将阴茎在${target_name}的嘴里抽插了几下，${target_name}难受得哭泣了起来。`,
        );
        await era.printAndWait(
          `「呜……呜呜……对，对不起……请饶了我吧……我会好好学习的！」`,
        );
      }
      // CFLAG:TARGET:362  = 1（变量语义：CFLAG 族，TARGET:362）
      kojo.手搓口交 = 1;
      return 0;
    } else {
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.手搓口交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「咕呣……咕呣……这样很舒服吧${heart(1)}」`);
          await era.printAndWait(
            `『啊啊……姐姐……人家要忍不住了啊啊${heart(1)}』`,
          );
          await era.printAndWait(
            `「来吧，全部射在姐姐的嘴里吧${heart(1)} ${player_name}浓浓的精液…${heart(1)} 咕呣……咕呣${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}脸上浮现出了妖艳的笑容，用舌头拨弄着${player_name}的龟头，手指按摩着根部………`,
          );
          // CFLAG:362  = 5（变量语义：CFLAG 族，362）
          kojo.手搓口交 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.手搓口交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「咕呣……唔唔${heart(1)} ${player_name}的阴茎……好硬……好烫${heart(1)}」`,
          );
          await era.printAndWait(
            `『呜啊啊……姐姐……人家要忍不住了啊啊${heart(1)}』`,
          );
          await era.printAndWait(
            `${target_name}同时用手和嘴侍奉着${player_name}的阴茎，看上去已经完全乐在其中了`,
          );
          await era.printAndWait(
            `「咕呣……来吧，${player_name}${heart(1)} 射在姐姐嘴里吧${heart(1)}」`,
          );
          // CFLAG:362  = 4（变量语义：CFLAG 族，362）
          kojo.手搓口交 = 4;
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.手搓口交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「咕呣……咕呣……呣呣……」`);
          await era.printAndWait(
            `${target_name}手口并用地侍奉着${player_name}的阴茎。`,
          );
          await era.printAndWait(
            `『啊啊， 姐姐的侍奉好棒……这样感觉好舒服${heart(1)}』`,
          );
          await era.printAndWait(
            `「咕呣……呣呣……不，不要射在姐姐嘴里……就可以了……」`,
          );
          await era.printAndWait(
            `${player_name}尽情享受着${target_name}的努力侍奉……`,
          );
          // CFLAG:362  = 3（变量语义：CFLAG 族，362）
          kojo.手搓口交 = 3;
        } else if (kojo.手搓口交 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(`「咕呣……咕呣……呣呣……」`);
          await era.printAndWait(
            `${target_name}还不习惯用手和嘴同时侍奉阴茎，动作显得相当笨拙。`,
          );
          await era.printAndWait(
            `${player_name}不满地顶起腰，用阴茎在${target_name}的嘴里抽插了几下，${target_name}难受得哭泣了起来。`,
          );
          await era.printAndWait(
            `『哼，再不好好侍奉的话，下次就要一口气插进姐姐喉咙里去了♪』`,
          );
          await era.printAndWait(
            `「对，对不起……姐姐会好好学的……饶，饶了姐姐吧！」`,
          );
          // CFLAG:362  = 2（变量语义：CFLAG 族，362）
          kojo.手搓口交 = 2;
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.手搓口交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「咕呣……咕呣……${heart(1)}」`);
          await era.printAndWait(
            `「如何，魔王大人，阴茎一边被舔一边被手指按摩的感觉，很舒服吧？」`,
          );
          await era.printAndWait(
            `${target_name}带着淫媚的笑容看着你，然后低下头继续用舌头舔着${player_name}的龟头，手指则娴熟地按摩着睾丸。`,
          );
          await era.printAndWait(
            `「咕呣……呣呣……${heart(1)} 魔王大人${heart(1)} 这次是要射在人家手上……还是嘴里呢${heart(1)}」`,
          );
          // CFLAG:362  = 5（变量语义：CFLAG 族，362）
          kojo.手搓口交 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.手搓口交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「咕呣……唔唔${heart(1)} 魔王大人的阴茎……好硬……好烫${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}手口并用地侍奉着${player_name}的阴茎，吸吮着龟头，并且是发自内心地享受着侍奉的快乐。`,
          );
          await era.printAndWait(
            `「呣呣…${heart(1)} 好喜欢……魔王大人的阴茎${heart(1)}」`,
          );
          await era.printAndWait(
            `「当然了……魔王大人的人……我也一样喜欢${heart(1)}」`,
          );
          // CFLAG:362  = 4（变量语义：CFLAG 族，362）
          kojo.手搓口交 = 4;
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.手搓口交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「咕呣……唔唔……唔唔！」`);
          await era.printAndWait(
            `${target_name}手口并用，努力侍奉着${player_name}的阴茎。`,
          );
          await era.printAndWait(
            `边舔着阴茎，${target_name}边抬起眼皮看着你，用讨好的声音问着。`,
          );
          await era.printAndWait(
            `「魔，魔王大人……这样感觉舒服吗………还是要按摩其他的部位？」`,
          );
          await era.printAndWait(
            `${player_name}露出了满意的笑容，继续享受着${target_name}的侍奉`,
          );
          // CFLAG:362  = 3（变量语义：CFLAG 族，362）
          kojo.手搓口交 = 3;
        } else if (kojo.手搓口交 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(`「咕呣……唔唔……呕！」`);
          await era.printAndWait(
            `${target_name}还不习惯用手和嘴同时侍奉阴茎，动作显得相当笨拙。`,
          );
          await era.printAndWait(
            `${player_name}不满的挺起腰，将阴茎在${target_name}的嘴里抽插了几下，${target_name}难受得哭泣了起来。`,
          );
          await era.printAndWait(
            `「对，对不起……魔王大人……我，我会努力学的……」`,
          );
          // CFLAG:362  = 2（变量语义：CFLAG 族，362）
          kojo.手搓口交 = 2;
        }
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 127) {
    if (kojo.真空口交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「唔呣${heart(1)} 咕啾……咕啾……唔唔${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}吸吮着${player_name}的阴茎，发出一阵阵下流的声音。`,
        );
        await era.printAndWait(`完全沉浸在真空口交侍奉之中了……`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「唔呣……唔呣${heart(1)} 咕啾……咕啾……唔唔${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}如痴如醉地吸吮着${player_name}的阴茎，发出一阵阵下流的声音。`,
        );
        await era.printAndWait(`脸颊都凹陷了进去，呼吸也变得急促了……`);
      } else if (chara(target).system.侍奉精神 >= 3) {
        await era.printAndWait(`「唔呣……唔呣！咕啾……咕啾……唔唔」`);
        await era.printAndWait(
          `${target_name}努力地吸吮着${player_name}的阴茎。`,
        );
        await era.printAndWait(
          `一声声不堪入耳的下流声音从${target_name}的口中冒出……`,
        );
      } else {
        await era.printAndWait(`「唔呣……唔呣！咕啾……咕啾……唔唔」`);
        await era.printAndWait(
          `${target_name}泪流满面地继续吸吮着口中的阴茎……`,
        );
      }
      // CFLAG:TARGET:363  = 1（变量语义：CFLAG 族，TARGET:363）
      kojo.真空口交 = 1;
      return 0;
    } else {
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.真空口交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「唔呣${heart(1)} 咕啾……咕啾……唔唔${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}用口腔和喉咙吸吮着${player_name}的阴茎，故意发出一阵阵淫秽的声音。`,
          );
          await era.printAndWait(`整个人完全沉浸在真空口交侍奉的快乐之中了。`);
          await era.printAndWait(
            `『姐姐跟母猪一样吸着人家的小鸡鸡，一点都不害臊吗，真是的！』`,
          );
          await era.printAndWait(
            `更加兴奋起来的${player_name}在姐姐的嘴里激烈地抽插着……`,
          );
          // CFLAG:363  = 5（变量语义：CFLAG 族，363）
          kojo.真空口交 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.真空口交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「唔呣……唔呣${heart(1)} 咕啾……咕啾……唔唔${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}如痴如醉地用口腔和喉咙吸吮着${player_name}的阴茎，连自己正在发出一阵阵下流的声音都丝毫没有觉察。`,
          );
          await era.printAndWait(`脸颊都凹了进去，呼吸也急促了起来。`);
          await era.printAndWait(
            `『哎呀……哎呀……太激烈了${heart(1)} 吸得……人家要去了${heart(1)}』`,
          );
          await era.printAndWait(
            `「最，最喜欢${player_name}的阴茎了、让姐姐帮你把精液全部吸出来吧…${heart(1)}  咕啾……咕啾……唔唔${heart(1)}」`,
          );
          // CFLAG:363  = 4（变量语义：CFLAG 族，363）
          kojo.真空口交 = 4;
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.真空口交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「还，还要继续吸吗……唔呣……唔呣！咕啾……咕啾……唔唔」`,
          );
          await era.printAndWait(
            `${target_name}拼命地用口腔和喉咙吸吮着${player_name}的阴茎。`,
          );
          await era.printAndWait(
            `『唔嘿嘿，人家的小鸡鸡那么好吃吗，还要吸得再深入一点啊，口交母猪姐姐！』`,
          );
          await era.printAndWait(
            `${target_name}被${player_name}用言语羞辱着，只能继续进行着口交侍奉………`,
          );
          // CFLAG:363  = 3（变量语义：CFLAG 族，363）
          kojo.真空口交 = 3;
        } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(`「唔呣……唔呣！咕啾……咕啾～！」`);
          await era.printAndWait(
            `『哎呀呀，姐姐吸吮得这么卖力，已经变成喜欢口交的母猪了，难道不是吗！』`,
          );
          await era.printAndWait(
            `${target_name}被自己深爱的妹妹如此嘲笑羞辱，泪流满面地继续口交着……`,
          );
          // CFLAG:363  = 2（变量语义：CFLAG 族，363）
          kojo.真空口交 = 2;
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.真空口交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「唔呣${heart(1)} 咕啾……咕啾……唔唔${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}用口腔和喉咙吸吮着${player_name}的阴茎，故意发出一阵阵淫秽的声音。`,
          );
          await era.printAndWait(`整个人完全沉浸在真空口交侍奉的快乐之中了`);
          await era.printAndWait(
            `「咕唔唔${heart(1)}…咕啾……咕啾${heart(1)}想要……魔王大人的精液……好想要${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}在阴茎强烈味道的刺激下，更加激烈的进行着真空口交侍奉………`,
          );
          // CFLAG:363  = 5（变量语义：CFLAG 族，363）
          kojo.真空口交 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.真空口交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「唔呣……唔呣${heart(1)} 咕啾……咕啾……唔唔${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}如痴如醉地用口腔和喉咙吸吮着${player_name}的阴茎，连自己正在发出一阵阵下流的声音都丝毫没有觉察。`,
          );
          await era.printAndWait(`脸颊都凹了进去，呼吸也急促了起来。`);
          await era.printAndWait(
            `「唔唔……咕呜${heart(1)} 魔王大人的阴茎…${heart(1)} 味道太棒了……还想要更多……咕呜……咕呜${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}完全沉浸在阴茎的味道之中，更加激烈的进行着真空口交侍奉………`,
          );
          // CFLAG:363  = 4（变量语义：CFLAG 族，363）
          kojo.真空口交 = 4;
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.真空口交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「还，还要继续吸吗……唔呣……唔呣！咕啾……咕啾……唔唔」`,
          );
          await era.printAndWait(
            `${target_name}拼命地用口腔和喉咙吸吮着${player_name}的阴茎。`,
          );
          await era.printAndWait(
            `「唔呣……唔呣！咕啾……魔王大人……让我，让我休息一下吧……」`,
          );
          // CFLAG:363  = 3（变量语义：CFLAG 族，363）
          kojo.真空口交 = 3;
        } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(`「唔呣……唔呣！咕啾……咕啾～！」`);
          await era.printAndWait(
            `${target_name}被强迫进行着真空口交侍奉，屈辱得泪流满面…`,
          );
          // CFLAG:363  = 2（变量语义：CFLAG 族，363）
          kojo.真空口交 = 2;
        }
      }
      return 0;
    }
  }

  let locals_0 = ''; // LOCALS:0，调教者性器
  let locals_1 = ''; // LOCALS:1，调教者敏感部位
  let locals_2 = ''; // LOCALS:2，莉莉性器
  let locals_3 = ''; // LOCALS:3，莉莉敏感部位

  // K11 原作把 CFLAG:370 复用于六九式口上计数；该角色的魔族化另存 CFLAG:400。
  if (era_flag.selectcom === 69) {
    if (kojo.魔族化 === 0) {
      if (
        era.get(`talent:${player}:121`) === 1 ||
        era.get(`talent:${player}:122`) === 1
      ) {
        locals_0 = '阴茎';
        locals_1 = '阴茎';
      } else {
        locals_0 = '蜜穴';
        locals_1 = '阴蒂';
      }

      if (
        era.get(`talent:${target}:121`) === 1 ||
        era.get(`talent:${target}:122`) === 1
      ) {
        locals_2 = '阴茎';
        locals_3 = '阴茎';
      } else {
        locals_2 = '蜜穴';
        locals_3 = '阴蒂';
      }

      if (assi_mao) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「咕呣……咕呣……咕呣${player_name}的${locals_1}……味道好棒……好喜欢${heart(1)}」`,
          );
          await era.printAndWait(
            `『啊啊……姐姐的${locals_3}也很棒啊……${heart(1)}』`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「呣呣……呣呣………${heart(1)} ${player_name}这样舒服吗？${heart(1)}」`,
          );
          await era.printAndWait(
            `『啊啊啊姐姐……舔得人家好舒服……我也不会输的${heart(1)}』`,
          );
        } else if (chara(target).system.侍奉精神 >= 3) {
          await era.printAndWait(
            `「呜呜呜……明明……不喜欢这种事情……为什么……却停不下来……而且……好舒服啊啊！」`,
          );
          await era.printAndWait(
            `『啊啊……和姐姐互相舔下体……好棒……好舒服啊啊${heart(1)} 』`,
          );
        } else {
          await era.printAndWait(
            `「唔呣……唔呣……呜呜呜，为什么……要做这种下流的事……！」`,
          );
          await era.printAndWait(
            `『啊哈……姐姐的${locals_1}一抖一抖的，好可爱……我舔得很舒服吧${heart(1)} 但是姐姐你也不能偷懒啊♪』`,
          );
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「呣呣……呣呣啊……${heart(1)} 魔王大人……舔得人家……太舒服了${heart(1)} 但是……人家不会认输的${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}忍耐着${locals_2}的快感，专心致志地舔舐着的${player_name}的${locals_0}……`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「唔呣……唔呣……啊啊啊${heart(1)} 魔王大人……舔得人家……太舒服了……${heart(1)}……我，我也会好好侍奉魔王大人的……」`,
          );
          await era.printAndWait(
            `${target_name}深吸一口气，忍耐着下体传来的强烈快感，继续卖力地舔吮着${player_name}的阴茎……`,
          );
        } else if (chara(target).system.侍奉精神 >= 3) {
          await era.printAndWait(
            `「唔呣……唔呣……唔啊啊啊……为，为什么……会这么舒服的……！」`,
          );
          await era.printAndWait(
            `${target_name}忍耐着快感，努力用舌头舔舐着${player_name}的${locals_0}……`,
          );
        } else {
          await era.printAndWait(
            `「唔呣……唔呣……？！不，不可以咬那里啊啊啊啊！」`,
          );
          await era.printAndWait(
            `嫌弃${target_name}舔舐的动作太敷衍，${player_name}微微用牙齿咬了咬${target_name}的阴蒂，立即听到一阵痛苦的悲鸣……`,
          );
        }
      }
      // CFLAG:TARGET:370  = 1（变量语义：CFLAG 族，TARGET:370）
      kojo.魔族化 = 1;
      return 0;
    } else {
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.魔族化 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「咕呣呣……唔呣……唔呣……${player_name}的${locals_1}……味道真好……真喜欢${heart(1)}」`,
          );
          await era.printAndWait(
            `『呜啊啊……姐姐的${locals_1}也很棒啊……${heart(1)}』`,
          );
          await era.printAndWait(
            `${target_name}的${locals_2}和${player_name}的${locals_0}沾满了彼此的唾液，隐隐反射着调教室的火光……`,
          );
          // CFLAG:370  = 5（变量语义：CFLAG 族，370）
          kojo.魔族化 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.魔族化 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「唔呣……唔呣……${heart(1)} 啊啊啊……${player_name}舔得姐姐好舒服……${heart(1)}」`,
          );
          await era.printAndWait(
            `『啊啊啊……姐姐也舔得人家的小穴舒服的要上天了啊啊${heart(1)}』`,
          );
          await era.printAndWait(
            `${target_name}的${locals_2}和${player_name}的${locals_0}沾满了彼此的唾液，隐隐反射着调教室的火光……`,
          );
          // CFLAG:370  = 4（变量语义：CFLAG 族，370）
          kojo.魔族化 = 4;
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.魔族化 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「呜呜呜……明明……不喜欢这种事情……为什么……却停不下来……而且……好舒服啊啊！！」`,
          );
          await era.printAndWait(
            `『嘿嘿嘿，和妹妹互相舔下体的感觉……很棒很舒服吧${heart(1)} 呣呣呣……呣呣${heart(1)}……』`,
          );
          await era.printAndWait(
            `${target_name}的${locals_2}和${player_name}的${locals_0}沾满了彼此的唾液，隐隐反射着调教室的火光……`,
          );
          // CFLAG:370  = 3（变量语义：CFLAG 族，370）
          kojo.魔族化 = 3;
        } else if (kojo.魔族化 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(
            `「呜呜呜……为什么……要做这种这么下流的事情！」`,
          );
          await era.printAndWait(
            `『啊哈……姐姐的${locals_1}一抖一抖的，好可爱……我舔得很舒服吧${heart(1)} 但是姐姐你也不能偷懒啊，快点给人家舔啊♪』`,
          );
          await era.printAndWait(
            `${target_name}的${locals_2}和${player_name}的${locals_0}沾满了彼此的唾液，隐隐反射着调教室的火光……`,
          );
          // CFLAG:370  = 2（变量语义：CFLAG 族，370）
          kojo.魔族化 = 2;
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.魔族化 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「呣呣……呣呣啊……${heart(1)} 魔王大人……舔得人家……太舒服了${heart(1)} 但是……人家不会认输的……一定要让魔王大人先射出来${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}忍耐着${locals_2}的快感，专心致志地吸吮着的${player_name}的阴茎…`,
          );
          await era.printAndWait(
            `${target_name}的${locals_2}和${player_name}的${locals_0}沾满了彼此的唾液，隐隐反射着调教室的火光……`,
          );
          // CFLAG:370  = 5（变量语义：CFLAG 族，370）
          kojo.魔族化 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.魔族化 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「唔呣……唔呣……啊啊啊${heart(1)} 魔王大人……舔得人家……太舒服了……${heart(1)}但，但我不能松懈……我，我也要好好侍奉魔王大人……」`,
          );
          await era.printAndWait(
            `${target_name}深吸一口气，忍耐着下体传来的强烈快感，继续卖力地舔吮着${player_name}的阴茎……`,
          );
          await era.printAndWait(
            `${target_name}的${locals_2}和${player_name}的${locals_0}沾满了彼此的唾液，隐隐反射着调教室的火光……`,
          );
          // CFLAG:370  = 4（变量语义：CFLAG 族，370）
          kojo.魔族化 = 4;
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.魔族化 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「唔呣……唔呣……唔啊啊啊……为，为什么……会这么舒服的……脑子还是下面都……乱七八糟了啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}忍耐着快感，努力用舌头舔舐着${player_name}的${locals_0}……`,
          );
          await era.printAndWait(
            `${target_name}的${locals_2}和${player_name}的${locals_0}沾满了彼此的唾液，隐隐反射着调教室的火光……`,
          );
          // CFLAG:370  = 3（变量语义：CFLAG 族，370）
          kojo.魔族化 = 3;
        } else if (kojo.魔族化 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(
            `「唔呣……唔呣……？！不，不可以咬那里啊啊啊啊！」`,
          );
          await era.printAndWait(
            `嫌弃${target_name}舔舐的动作太敷衍，${player_name}微微用牙齿咬了咬${target_name}的阴蒂，立即听到一阵痛苦的悲鸣……`,
          );
          await era.printAndWait(
            `${target_name}的${locals_2}和${player_name}的${locals_0}沾满了彼此的唾液，隐隐反射着调教室的火光……`,
          );
          // CFLAG:370  = 2（变量语义：CFLAG 族，370）
          kojo.魔族化 = 2;
        }
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 124) {
    if (kojo.深喉 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「我开动了哦…${heart(1)} 唔呣……唔唔唔${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}带着淫媚的表情，努力地将${player_name}的阴茎吞入到了喉咙最深处……`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「${player_name}的阴茎，我会全部吞下去的${heart(1)} 唔呣……唔唔唔${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}对${player_name}微笑了一下，然后将勃起的阴茎含入嘴里，慢慢吞入到了喉咙最深处…`,
        );
      } else if (chara(target).system.侍奉精神 >= 3) {
        await era.printAndWait(`「要……要用喉咙吗……呜呜……咕呜……咕呣……！」`);
        await era.printAndWait(
          `${target_name}带着些许兴奋的表情，将${player_name}的阴茎含到了喉咙最深处……`,
        );
      } else {
        await era.printAndWait(`「要……要用喉咙吗……呜呜……咕呜……咕呣……！」`);
        await era.printAndWait(
          `${target_name}带着些许犹豫的表情，将${player_name}的阴茎含到了喉咙最深处……`,
        );
      }
      // CFLAG:TARGET:365  = 1（变量语义：CFLAG 族，TARGET:365）
      kojo.深喉 = 1;
      return 0;
    } else {
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.深喉 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「人家继续了哦……${heart(1)} 呜呜……咕呜……咕呣…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}将${player_name}的阴茎吞入到了喉咙最深处吸吮着，发出了咕啾咕啾的不堪入耳的声音。`,
          );
          await era.printAndWait(
            `『哈啊……哈啊${heart(1)} 淫乱的姐姐把人家的小鸡鸡全部吃进去了呢${heart(1)}』`,
          );
          // CFLAG:365  = 5（变量语义：CFLAG 族，365）
          kojo.深喉 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.深喉 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「${player_name}的小鸡鸡，我要全部吃下去了哦${heart(1)}  呜呜……咕呜……咕呣…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}带着笑容，将${player_name}的阴茎吞入到了喉咙最深处吸吮着，发出了咕啾咕啾的不堪入耳的声音。`,
          );
          await era.printAndWait(
            `『唔哇哇、我会把姐姐的喉咙里射的满满都是精液的${heart(1)} 再，再深一点！』`,
          );
          // CFLAG:365  = 4（变量语义：CFLAG 族，365）
          kojo.深喉 = 4;
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.深喉 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「要，要进到喉，喉咙深处吗……呜呜……咕呜……咕呣…！」`,
          );
          await era.printAndWait(
            `${target_name}口交的时候大概是过于兴奋了，将${player_name}的阴茎吞入到了喉咙最深处`,
          );
          await era.printAndWait(
            `『唔哇哇！姐姐什么时候变得这么喜欢的口交的……！小鸡鸡在喉咙里面好舒服！』`,
          );
          // CFLAG:365  = 3（变量语义：CFLAG 族，365）
          kojo.深喉 = 3;
        } else if (kojo.深喉 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(`「喉，喉咙深处也要吗……呜呜……咕呜……咕呣…！」`);
          await era.printAndWait(
            `${target_name}口交的时候大概是过于激烈了，将${player_name}的阴茎吞入到了喉咙最深处`,
          );
          await era.printAndWait(
            `『唔哇哇，把整根都吞下去了呢，姐姐真的是个口交变态呢！』`,
          );
          // CFLAG:365  = 2（变量语义：CFLAG 族，365）
          kojo.深喉 = 2;
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.深喉 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「人家继续了哦，魔王大人……${heart(1)} 呜呜……咕呜……咕呣…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}将${player_name}的阴茎吞入到了喉咙最深处吸吮着，发出了咕啾咕啾的不堪入耳的声音。`,
          );
          await era.printAndWait(
            `「咕呜……咕呜…${heart(1)} 人家的喉咙小穴……舒服吗${heart(1)} 」`,
          );
          // CFLAG:365  = 5（变量语义：CFLAG 族，365）
          kojo.深喉 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.深喉 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「${player_name}的阴茎，我会好好地全部吃下去的${heart(1)} 呜呜……咕呜……咕呣…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}带着笑容，将${player_name}的阴茎吞入到了喉咙最深处吸吮着，发出了咕啾咕啾的不堪入耳的声音。`,
          );
          await era.printAndWait(
            `「咕呜……咕呜…${heart(1)} 请${player_name}把精液全部射进喉咙里吧…${heart(1)} 呜呜……咕呜${heart(1)}」`,
          );
          // CFLAG:365  = 4（变量语义：CFLAG 族，365）
          kojo.深喉 = 4;
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.深喉 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「呜呜……咕呜……喉咙好热的感觉……呜呣……」`);
          await era.printAndWait(
            `${target_name}口交的时候大概是过于兴奋了，将${player_name}的阴茎吞入到了喉咙最深处`,
          );
          await era.printAndWait(
            `「哈……哈啊……光是用喉咙吸着阴茎……整个人就已经…♪」`,
          );
          // CFLAG:365  = 3（变量语义：CFLAG 族，365）
          kojo.深喉 = 3;
        } else if (kojo.深喉 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(`「呜呜……咕呜……整根都……唔呣！」`);
          await era.printAndWait(
            `${target_name}口交的时候大概是过于激烈了，将${player_name}的阴茎吞入到了喉咙最深处`,
          );
          await era.printAndWait(
            `「呜……呜呜……进，进到喉咙最里面了……唔呣……唔呣！」`,
          );
          // CFLAG:365  = 2（变量语义：CFLAG 族，365）
          kojo.深喉 = 2;
        }
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 80) {
    if (kojo.强制口交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「唔呣……唔唔唔……嗯唔～${heart(1)}（被侵犯喉咙了${heart(1)}）」`,
        );
        await era.printAndWait(
          `${target_name}尽情享受着喉咙深处被${player_name}的阴茎持续抽插侵犯的感觉………`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「唔呣……唔唔唔……嗯唔……魔王大人，让我休——唔唔唔……嗯唔」`,
        );
        await era.printAndWait(
          `${target_name}喉咙深处被${player_name}的阴茎持续侵犯抽插着，窒息得翻起了白眼………`,
        );
      } else if (chara(target).system.侍奉精神 >= 3) {
        await era.printAndWait(
          `「唔呣……唔唔唔……嗯唔……咳咳咳……魔，魔王大人，让我缓一下——唔唔唔……嗯唔！」`,
        );
        await era.printAndWait(
          `${target_name}喉咙深处被${player_name}的阴茎持续侵犯抽插着，只能拼命忍耐着窒息一般的痛苦………`,
        );
      } else {
        await era.printAndWait(
          `「唔呣……唔唔唔……嗯唔……咳咳咳……求求你，饶了我吧——唔唔唔」`,
        );
        await era.printAndWait(
          `${target_name}喉咙深处被${player_name}的阴茎持续侵犯抽插着，窒息的痛苦让她泪水口水都流了出来………`,
        );
      }
      // CFLAG:TARGET:381  = 1（变量语义：CFLAG 族，TARGET:381）
      kojo.强制口交 = 1;
      return 0;
    } else {
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.强制口交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「咕唔唔——${heart(1)} 唔呣……还，还可以再深一点呜呜唔呣！」`,
          );
          await era.printAndWait(
            `${target_name}大张着嘴，迎接着${player_name}的阴茎深入到喉咙深处！`,
          );
          await era.printAndWait(
            `『那么想要的话，就侵犯到姐姐窒息为止吧！嘿嘿嘿！』`,
          );
          await era.printAndWait(
            `${target_name}喉咙深处被持续侵犯着，眼泪和口水不住往外流，表情都恍惚了…`,
          );
          // CFLAG:381  = 5（变量语义：CFLAG 族，381）
          kojo.强制口交 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.强制口交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「唔……唔呣……不，不行了……${player_name}，让姐姐……缓……唔呣……唔唔唔！」`,
          );
          await era.printAndWait(
            `${target_name}被${player_name}的阴茎强行侵犯着喉咙深处，痛苦地翻起了白眼。`,
          );
          await era.printAndWait(`『嘴再张大一点，我觉得还能再进去一些呢！』`);
          await era.printAndWait(
            `${target_name}在侵犯下，竭尽全力也保持不了呼吸，几乎要窒息过去了……`,
          );
          // CFLAG:381  = 4（变量语义：CFLAG 族，381）
          kojo.强制口交 = 4;
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.强制口交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「呜呜……唔呣……稍，稍微……温柔一点……拜托了——唔唔唔……！」`,
          );
          await era.printAndWait(
            `${target_name}被${player_name}用阴茎强制侵犯着嘴巴，在喉咙深处肆虐着`,
          );
          await era.printAndWait(
            `『什么？要我温柔一点？才不呢，姐姐老老实实用喉咙当我的飞机杯啦！』`,
          );
          // CFLAG:381  = 3（变量语义：CFLAG 族，381）
          kojo.强制口交 = 3;
        } else if (kojo.强制口交 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(
            `「呜呜……唔呣……呕……住，住手啊……饶了姐姐吧……唔唔唔——」`,
          );
          await era.printAndWait(
            `${target_name}被${player_name}用阴茎强制侵犯着嘴巴和喉咙，痛苦得泪流满面`,
          );
          await era.printAndWait(
            `『嘿嘿，再不好好侍奉的话还会倒更大的霉的，姐姐！』`,
          );
          // CFLAG:381  = 2（变量语义：CFLAG 族，381）
          kojo.强制口交 = 2;
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.强制口交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「咕唔唔——${heart(1)} 唔呣……还，还可以再深一点呜呜唔呣！」`,
          );
          await era.printAndWait(
            `${target_name}大张着嘴，主动迎接着${player_name}的阴茎深入到喉咙深处！`,
          );
          await era.printAndWait(
            `「唔呣……唔呣${heart(1)} 魔王大人……的阴茎……好厉害……唔唔唔……唔呣${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}喉咙深处被持续侵犯着，眼泪和口水不住往外流，表情都恍惚了…`,
          );
          // CFLAG:381  = 5（变量语义：CFLAG 族，381）
          kojo.强制口交 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.侍奉精神 >= 5 &&
          (kojo.强制口交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「唔……唔呣……不，不行了……魔王大人稍微……温柔一点……我会好好吸吮的${heart(1)} ——呜呜呜！」`,
          );
          await era.printAndWait(
            `${target_name}被${player_name}的阴茎强行侵犯着喉咙深处，痛苦地翻起了白眼。`,
          );
          await era.printAndWait(
            `「唔呣……唔呣${heart(1)} 可，可是……要好好侍奉魔王大人……唔唔唔……唔呣${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}在侵犯下，竭尽全力也保持不了呼吸，几乎要窒息过去了……`,
          );
          // CFLAG:381  = 4（变量语义：CFLAG 族，381）
          kojo.强制口交 = 4;
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.强制口交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「唔……唔呣……不，不行了……求你了……稍微拔出去一点……唔唔唔！」`,
          );
          await era.printAndWait(
            `${target_name}被${player_name}的阴茎强制侵犯到喉咙深处，痛苦地呻吟着。`,
          );
          await era.printAndWait(`「唔唔……唔呣……要，要死了……呕呕呕！」`);
          // CFLAG:381  = 3（变量语义：CFLAG 族，381）
          kojo.强制口交 = 3;
        } else if (kojo.强制口交 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(
            `「唔……唔呣……呕……唔唔……饶了我吧……求求你……呜呜……」`,
          );
          await era.printAndWait(
            `${target_name}被${player_name}的阴茎强制侵犯到喉咙深处，痛苦得泪流满面。`,
          );
          await era.printAndWait(`「唔唔……唔呣……已经要，要死了……呕呕呕……」`);
          // CFLAG:381  = 2（变量语义：CFLAG 族，381）
          kojo.强制口交 = 2;
        }
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 87) {
    const p = piercing_state.p; // COM111 穿环着脱写入的跨模块位掩码 P

    if (kojo.穿环 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        if (chara(target).train.穿环状态 & p) {
          await era.printAndWait(`打孔器在${target_name}的肌肤上穿出了小洞。`);
          await era.printAndWait(`「呜……呜啊！」`);
          await era.printAndWait(`第一次穿孔让${target_name}忍不住呻吟了出来`);

          if (p === 1) {
            if (assi_mao) {
              await era.printAndWait(`『很适合你的淫乱大胸部哦姐姐！』`);
              await era.printAndWait(`「是，是吗……谢谢${heart(1)}」`);
              await era.printAndWait(
                `${target_name}挺立的乳头上插入了闪闪发光的银环………`,
              );
            } else {
              await era.printAndWait(
                `「哈……哈啊……可以用这个拉着乳头${heart(1)} 好像会很舒服的样子……♪」`,
              );
              await era.printAndWait(
                `${target_name}挺立的乳头上插入了闪闪发光的银环………`,
              );
            }
          } else if (p === 2) {
            if (assi_mao) {
              await era.printAndWait(`『哎哎，姐姐看上去好可爱${heart(1)}』`);
              await era.printAndWait(
                `「是，是吗……你要不要也穿一个呢、${player_name}？」`,
              );
              await era.printAndWait(
                `${target_name}的肚脐上穿入了闪闪发光的银环……`,
              );
            } else {
              await era.printAndWait(`「呜哇，这个环好漂亮……」`);
              await era.printAndWait(
                `${target_name}的肚脐上穿入了闪闪发光的银环……`,
              );
            }
          } else if (p === 4) {
            if (assi_mao) {
              await era.printAndWait(
                `『哇哇，姐姐很适合穿环啊，小穴穿上环之后更漂亮了呢♪』`,
              );
              await era.printAndWait(
                `「嗯嗯，谢谢${player_name}、阿啦，魔王大人也来看看？」`,
              );
              await era.printAndWait(
                `${target_name}用手指分开自己的蜜穴，对你展示着上面的银环……`,
              );
            } else {
              await era.printAndWait(`「下面穿上银环之后……好像更好看了…？」`);
              await era.printAndWait(
                `${target_name}用手指分开自己的蜜穴，对你展示着上面的银环……`,
              );
            }
          } else if (p === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              if (assi_mao) {
                await era.printAndWait(
                  `『哎呀呀姐姐，怎么穿环的时候勃起了呢${heart(1)}』`,
                );
                await era.printAndWait(
                  `「是啊……光是接触到这个环，姐姐就兴奋起来了呢${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}胯下的阴茎充血挺立了起来，摇晃着顶端穿入的银环………`,
                );
              } else {
                await era.printAndWait(
                  `「哈……自己的阴茎被穿环，居然会这么兴奋呢…${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}在忍受痛苦的同时兴奋了起来，阴茎充血勃起了……`,
                );
              }
            } else {
              if (assi_mao) {
                await era.printAndWait(
                  `『哎呀呀，阴蒂穿上这样的东西，恐怕姐姐以后就没法过正常的生活了吧』`,
                );
                await era.printAndWait(
                  `「是，是啊……已经变得除了小穴之外……什么都不会想了${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}充血勃起的阴蒂被穿上了银环……`,
                );
              } else {
                await era.printAndWait(
                  `「啊啊……轻轻碰一碰上面的环${heart(1)} 阴蒂就已经有感觉了啊${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}充血勃起的阴蒂被穿上了银环……`,
                );
              }
            }
          } else if (p === 16) {
            if (assi_mao) {
              await era.printAndWait(`『嘿嘿，姐姐舌头上也有位置呢♪』`);
              await era.printAndWait(`「啊……还真的有点想试一下呢${heart(1)}」`);
              await era.printAndWait(
                `${target_name}被打了银钉的舌尖轻轻舔着嘴唇………`,
              );
            } else {
              await era.printAndWait(
                `「嘻嘻，以后再舌吻好像会很舒服呢${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}被打了银钉的舌尖轻轻舔着嘴唇………`,
              );
            }
          } else if (p === 32) {
            if (assi_mao) {
              await era.printAndWait(`『啦啦，姐姐来亲亲吧…』`);
              await era.printAndWait(`「呣呣……还要继续吗？」`);
              await era.printAndWait(
                `${target_name}娇嫩嘴唇上的银环在闪闪发亮…`,
              );
            } else {
              await era.printAndWait(`「呣呣，好像挺合适的？」`);
              await era.printAndWait(
                `${target_name}娇嫩嘴唇上的银环在闪闪发亮…`,
              );
            }
          } else if (p === 64) {
            if (assi_mao) {
              await era.printAndWait(
                `『嘿嘿嘿，在这里穿上环，姐姐就真的变成母牛了呢』`,
              );
              await era.printAndWait(`「就，就是这样呢♪」`);
              await era.printAndWait(
                `${target_name}欣赏着自己鼻翼上穿着的银环……`,
              );
            } else {
              await era.printAndWait(`「意外的好看呢♪」`);
              await era.printAndWait(
                `${target_name}欣赏着自己鼻翼上穿着的银环……`,
              );
            }
          }
        } else {
          await era.printAndWait(
            `${target_name}轻轻地擦拭着穿环处留下的血迹……`,
          );
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        if (chara(target).train.穿环状态 & p) {
          await era.printAndWait(`打孔器在${target_name}的肌肤上穿出了小洞。`);
          await era.printAndWait(
            `第一次穿孔的痛楚让${target_name}忍不住呻吟了出来。`,
          );

          if (p === 1) {
            if (assi_mao) {
              await era.printAndWait(`『嘿嘿，很适合姐姐的淫乱大胸部呢』`);
              await era.printAndWait(`「别这样直盯盯地看啦……真不好意思♪」`);
              await era.printAndWait(
                `${target_name}充血挺立起的乳头上，银环闪闪发光……`,
              );
            } else {
              await era.printAndWait(`「怎么样，好像很合适呢？${heart(1)}」`);
              await era.printAndWait(
                `${target_name}充血挺立起的乳头上，银环闪闪发光……`,
              );
            }
          } else if (p === 2) {
            if (assi_mao) {
              await era.printAndWait(`『呼呼，好可爱呢${heart(1)}』`);
              await era.printAndWait(
                `「是，是吗……你要不要也穿一个呢、${player_name}？」`,
              );
              await era.printAndWait(
                `${target_name}的肚脐上穿入了闪闪发光的银环……`,
              );
            } else {
              await era.printAndWait(`「呜哇，这个环好漂亮……」`);
              await era.printAndWait(
                `${target_name}的肚脐上穿入了闪闪发光的银环……`,
              );
            }
          } else if (p === 4) {
            if (assi_mao) {
              await era.printAndWait(
                `『姐姐的蜜穴真的是很适合穿环啊，相性非常好哦♪』`,
              );
              await era.printAndWait(`「别这样直盯盯地看啦……真不好意思♪」`);
              await era.printAndWait(`${target_name}的蜜穴里被穿入了银环……`);
            } else {
              await era.printAndWait(`「请，请魔王大人尽情欣赏吧${heart(1)}」`);
              await era.printAndWait(
                `${target_name}害羞地分开自己的蜜穴，展露着穿在里面的两个银环……`,
              );
            }
          } else if (p === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              if (assi_mao) {
                await era.printAndWait(
                  `『真厉害呢姐姐，穿环的时候都会兴奋得勃起呀${heart(1)}』`,
                );
                await era.printAndWait(
                  `「不，才不是呢……是因为，因为……啊啊真的很兴奋啊${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}胯下的阴茎充血挺立了起来，摇晃着顶端穿入的银环………`,
                );
              } else {
                await era.printAndWait(
                  `「请，请魔王大人欣赏人家的穿环阴茎吧${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}胯下的阴茎充血挺立了起来，摇晃着顶端穿入的银环………`,
                );
              }
            } else {
              if (assi_mao) {
                await era.printAndWait(
                  `『哎呀呀，阴蒂穿上这样的东西，恐怕姐姐以后就没法过正常的生活了吧』`,
                );
                await era.printAndWait(
                  `「不，不要对姐姐恶作剧啦……不过，不过……真的很有感觉啊${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}充血勃起的阴蒂被穿上了银环，变得更加敏感了……`,
                );
              } else {
                await era.printAndWait(
                  `「阴蒂被穿上这样的环，以后就正式成为魔王大人的性奴了呢…${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}充血勃起的阴蒂被穿上了银环，变得更加敏感了……`,
                );
              }
            }
          } else if (p === 16) {
            if (assi_mao) {
              await era.printAndWait(`『啊嘿嘿，姐姐的舌头也来一个环吧♪』`);
              await era.printAndWait(
                `「哎……那里也要吗……既然你这么希望的话……」`,
              );
              await era.printAndWait(
                `${target_name}有些害羞地用穿着银环的舌尖舔着嘴唇……`,
              );
            } else {
              await era.printAndWait(
                `「这样接吻……会很舒服吧，魔王大人${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}有些害羞地用穿着银环的舌尖舔着嘴唇……`,
              );
            }
          } else if (p === 32) {
            if (assi_mao) {
              await era.printAndWait(`『呣呣，姐姐来试试带环接吻吧…』`);
              await era.printAndWait(`「先，先让魔王大人来啦」`);
              await era.printAndWait(
                `${target_name}娇嫩嘴唇上的银环在闪闪发亮…`,
              );
            } else {
              await era.printAndWait(`「魔王大人，来接吻吧…${heart(1)}」`);
              await era.printAndWait(
                `${target_name}娇嫩嘴唇上的银环在闪闪发亮…`,
              );
            }
          } else if (p === 64) {
            if (assi_mao) {
              await era.printAndWait(
                `『哎嘿嘿，鼻子穿上环之后，姐姐就真的变成母牛性奴呢了』`,
              );
              await era.printAndWait(
                `「感觉……有点怪怪的……不过，变成魔王大人的母牛性奴……也很高兴呢」`,
              );
              await era.printAndWait(`${target_name}轻轻抚摸着鼻子上的银环……`);
            } else {
              await era.printAndWait(
                `「感觉……有点怪怪的……不过，变成魔王大人的母牛性奴……也很高兴呢」`,
              );
              await era.printAndWait(`${target_name}轻轻抚摸着鼻子上的银环……`);
            }
          }
        } else {
          await era.printAndWait(
            `${target_name}轻轻地擦拭着穿环处留下的血迹……`,
          );
        }
      } else {
        if (chara(target).train.穿环状态 & p) {
          await era.printAndWait(`打孔器在${target_name}的肌肤上穿出了小洞。`);
          await era.printAndWait(`「呜啊啊！」`);
          await era.printAndWait(
            `第一次穿孔的痛楚让${target_name}惨叫了出来。`,
          );

          if (p === 1) {
            if (assi_mao) {
              await era.printAndWait(`『嘿嘿，很适合姐姐的淫乱大胸部呢』`);
              await era.printAndWait(`「一点都不适合……快点拿下来啊……呜呜呜」`);
              await era.printAndWait(
                `${target_name}充血挺立起的乳头上，银环闪闪发光……`,
              );
            } else {
              await era.printAndWait(`「好痛……取，取下来啊……求求你」`);
              await era.printAndWait(
                `${target_name}充血挺立起的乳头上，银环闪闪发光……`,
              );
            }
          } else if (p === 2) {
            if (assi_mao) {
              await era.printAndWait(`嘿嘿嘿，姐姐这样好可爱呢${heart(1)}』`);
              await era.printAndWait(`「不，不要碰啊……好痛…」`);
              await era.printAndWait(
                `${target_name}的肚脐上穿入了闪闪发光的银环……`,
              );
            } else {
              await era.printAndWait(`「呜……已，已经好了吗？」`);
              await era.printAndWait(
                `${target_name}吃痛地抚摸着自己肚脐上上闪闪发光的银环……`,
              );
            }
          } else if (p === 4) {
            if (assi_mao) {
              await era.printAndWait(
                `『嘿嘿，姐姐真的是很合适穿环啊，特别是小穴这里♪』`,
              );
              await era.printAndWait(`「不，不要那么用力啊……好痛！」`);
              await era.printAndWait(
                `${player_name}用手指分开了${target_name}的蜜穴，欣赏着上面穿入的两个银环。`,
              );
            } else {
              await era.printAndWait(`「不要……不要看啊啊！」`);
              await era.printAndWait(
                `${player_name}用手指分开了${target_name}的蜜穴，欣赏着上面穿入的两个银环。`,
              );
            }
          } else if (p === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              if (assi_mao) {
                await era.printAndWait(
                  `『真厉害呢姐姐，穿环的时候都会兴奋得勃起呀${heart(1)}』`,
                );
                await era.printAndWait(
                  `「不，不是这样子的……都是因为你用手又拉又摩擦……才会勃起的……」`,
                );
                await era.printAndWait(
                  `${player_name}用手摩擦着${target_name}胯下的阴茎，摇晃着顶端穿入的银环………`,
                );
              } else {
                await era.printAndWait(`「呜呜……不，不要这样用力……摩擦啊啊」`);
                await era.printAndWait(
                  `${player_name}用手摩擦着${target_name}胯下的阴茎，摇晃着顶端穿入的银环………`,
                );
              }
            } else {
              if (assi_mao) {
                await era.printAndWait(
                  `『哎呀呀，阴蒂穿上这样的东西，恐怕姐姐以后就没法过正常的生活了吧』`,
                );
                await era.printAndWait(`「求求你了……不要再欺负姐姐了……呜呜」`);
                await era.printAndWait(
                  `${target_name}充血勃起的阴蒂被穿上了银环，变得更加敏感了……`,
                );
              } else {
                await era.printAndWait(
                  `「不，不要啊……那个部位……不可以……呜呜呜」`,
                );
                await era.printAndWait(
                  `${target_name}充血勃起的阴蒂被穿上了银环，变得更加敏感了……`,
                );
              }
            }
          } else if (p === 16) {
            if (assi_mao) {
              await era.printAndWait(`『啊嘿嘿，姐姐的舌头也来一个环吧♪』`);
              await era.printAndWait(`「呜呜……不……不要拉啊啊……」`);
              await era.printAndWait(
                `${target_name}被${player_name}强行拉扯着舌头，穿上了银环，痛得呜咽了起来……`,
              );
            } else {
              await era.printAndWait(
                `「不，不要啊……呜呜呜……以后会没办法……好好吃饭的……」`,
              );
              await era.printAndWait(
                `${target_name}被${player_name}强行拉扯着舌头，穿上了银环，呜咽着说着什么……`,
              );
            }
          } else if (p === 32) {
            if (assi_mao) {
              await era.printAndWait(`『嘿嘿，姐姐以后接吻会很舒服的…』`);
              await era.printAndWait(`「才，才没有那种事……好奇怪的感觉……」`);
              await era.printAndWait(
                `${target_name}娇嫩嘴唇上的银环在闪闪发亮…`,
              );
            } else {
              await era.printAndWait(`「呜呜……感觉好奇怪……一点都不习惯」`);
              await era.printAndWait(
                `${target_name}娇嫩嘴唇上的银环在闪闪发亮…`,
              );
            }
          } else if (p === 64) {
            if (assi_mao) {
              await era.printAndWait(
                `『哎嘿嘿，鼻子穿上环之后，姐姐就真的变成母牛性奴呢了』`,
              );
              await era.printAndWait(`「不，不要再说了……呜呜呜…」`);
              await era.printAndWait(`${target_name}痛苦地摸着鼻子上的银环……`);
            } else {
              await era.printAndWait(`「呜呜……鼻子好痛…」`);
              await era.printAndWait(`${target_name}痛苦地摸着鼻子上的银环……`);
            }
          }
        } else {
          await era.printAndWait(
            `${target_name}流着泪水，轻轻地擦拭着穿环处留下的血迹……`,
          );
        }
      }
      // CFLAG:TARGET:348  = 1（变量语义：CFLAG 族，TARGET:348）
      kojo.穿环 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.穿环 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (chara(target).train.穿环状态 & p) {
          if (p === 1) {
            if (assi_mao) {
              await era.printAndWait(`『很适合姐姐的淫乱大胸部哦！』`);
              await era.printAndWait(`「是，是吗……谢谢${heart(1)}」`);
              await era.printAndWait(
                `${target_name}挺立的乳头上插入了闪闪发光的银环………`,
              );
            } else {
              await era.printAndWait(
                `「哈……哈啊……可以用这个拉着乳头${heart(1)} 好像会很舒服的样子……♪」`,
              );
              await era.printAndWait(
                `${target_name}挺立的乳头上插入了闪闪发光的银环………`,
              );
            }
          } else if (p === 2) {
            if (assi_mao) {
              await era.printAndWait(`『哎哎，姐姐看上去好可爱${heart(1)}』`);
              await era.printAndWait(
                `「是，是吗……你要不要也穿一个呢、${player_name}？」`,
              );
              await era.printAndWait(
                `${target_name}的肚脐上穿入了闪闪发光的银环……`,
              );
            } else {
              await era.printAndWait(`「呜哇，这个环好漂亮……」`);
              await era.printAndWait(
                `${target_name}的肚脐上穿入了闪闪发光的银环……`,
              );
            }
          } else if (p === 4) {
            if (assi_mao) {
              await era.printAndWait(
                `『哇哇，姐姐很适合穿环啊，小穴穿上环之后更漂亮了呢♪』`,
              );
              await era.printAndWait(
                `「嗯嗯，谢谢${player_name}、阿啦，魔王大人也来看看？」`,
              );
              await era.printAndWait(
                `${target_name}用手指分开自己的蜜穴，对你展示着上面的银环……`,
              );
            } else {
              await era.printAndWait(`「下面穿上银环之后……好像更好看了…？」`);
              await era.printAndWait(
                `${target_name}用手指分开自己的蜜穴，对你展示着上面的银环……`,
              );
            }
          } else if (p === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              if (assi_mao) {
                await era.printAndWait(
                  `『哎呀呀姐姐，怎么穿环的时候勃起了呢${heart(1)}』`,
                );
                await era.printAndWait(
                  `「是啊……光是接触到这个环，姐姐就兴奋起来了呢${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}胯下的阴茎充血挺立了起来，摇晃着顶端穿入的银环………`,
                );
              } else {
                await era.printAndWait(
                  `「哈……自己的阴茎被穿环，居然会这么兴奋呢…${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}在忍受痛苦的同时兴奋了起来，阴茎充血勃起了……`,
                );
              }
            } else {
              if (assi_mao) {
                await era.printAndWait(
                  `『哎呀呀，阴蒂穿上这样的东西，恐怕姐姐以后就没法过正常的生活了吧』`,
                );
                await era.printAndWait(
                  `「是，是啊……已经变得除了小穴之外……什么都不会想了${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}充血勃起的阴蒂被穿上了银环……`,
                );
              } else {
                await era.printAndWait(
                  `「啊啊……轻轻碰一碰上面的环${heart(1)} 阴蒂就已经有感觉了啊${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}充血勃起的阴蒂被穿上了银环……`,
                );
              }
            }
          } else if (p === 16) {
            if (assi_mao) {
              await era.printAndWait(`『嘿嘿，姐姐舌头上也有位置呢♪』`);
              await era.printAndWait(`「啊……还真的有点想试一下呢${heart(1)}」`);
              await era.printAndWait(
                `${target_name}被打了银钉的舌尖轻轻舔着嘴唇………`,
              );
            } else {
              await era.printAndWait(
                `「嘻嘻，以后再舌吻好像会很舒服呢${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}被打了银钉的舌尖轻轻舔着嘴唇………`,
              );
            }
          } else if (p === 32) {
            if (assi_mao) {
              await era.printAndWait(`『啦啦，姐姐来亲亲吧…』`);
              await era.printAndWait(`「呣呣……还要继续吗？」`);
              await era.printAndWait(
                `${target_name}娇嫩嘴唇上的银环在闪闪发亮…`,
              );
            } else {
              await era.printAndWait(`「呣呣，好像挺合适的？」`);
              await era.printAndWait(
                `${target_name}娇嫩嘴唇上的银环在闪闪发亮…`,
              );
            }
          } else if (p === 64) {
            if (assi_mao) {
              await era.printAndWait(
                `『嘿嘿嘿，在这里穿上环，姐姐就真的变成母牛了呢』`,
              );
              await era.printAndWait(`「就，就是这样呢♪」`);
              await era.printAndWait(
                `${target_name}欣赏着自己鼻翼上穿着的银环……`,
              );
            } else {
              await era.printAndWait(`「意外的好看呢♪」`);
              await era.printAndWait(
                `${target_name}欣赏着自己鼻翼上穿着的银环……`,
              );
            }
          }
        } else {
          await era.printAndWait(
            `${target_name}轻轻地擦拭着穿环处留下的血迹……`,
          );
        }
        // CFLAG:348  = 4（变量语义：CFLAG 族，348）
        kojo.穿环 = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.穿环 <= 2 || game.kojo.口上开关 === 2)
      ) {
        if (chara(target).train.穿环状态 & p) {
          if (p === 1) {
            if (assi_mao) {
              await era.printAndWait(`『嘿嘿，很适合姐姐的淫乱大胸部呢』`);
              await era.printAndWait(`「别这样直盯盯地看啦……真不好意思♪」`);
              await era.printAndWait(
                `${target_name}充血挺立起的乳头上，银环闪闪发光……`,
              );
            } else {
              await era.printAndWait(`「怎么样，好像很合适呢？${heart(1)}」`);
              await era.printAndWait(
                `${target_name}充血挺立起的乳头上，银环闪闪发光……`,
              );
            }
          } else if (p === 2) {
            if (assi_mao) {
              await era.printAndWait(`『呼呼，好可爱呢${heart(1)}』`);
              await era.printAndWait(
                `「是，是吗……你要不要也穿一个呢、${player_name}？」`,
              );
              await era.printAndWait(
                `${target_name}的肚脐上穿入了闪闪发光的银环……`,
              );
            } else {
              await era.printAndWait(`「呜哇，这个环好漂亮……」`);
              await era.printAndWait(
                `${target_name}的肚脐上穿入了闪闪发光的银环……`,
              );
            }
          } else if (p === 4) {
            if (assi_mao) {
              await era.printAndWait(
                `『姐姐的蜜穴真的是很适合穿环啊，相性非常好哦♪』`,
              );
              await era.printAndWait(`「别这样直盯盯地看啦……真不好意思♪」`);
              await era.printAndWait(`${target_name}的蜜穴里被穿入了银环……`);
            } else {
              await era.printAndWait(`「请，请魔王大人尽情欣赏吧${heart(1)}」`);
              await era.printAndWait(
                `${target_name}害羞地分开自己的蜜穴，展露着穿在里面的两个银环……`,
              );
            }
          } else if (p === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              if (assi_mao) {
                await era.printAndWait(
                  `『真厉害呢姐姐，穿环的时候都会兴奋得勃起呀${heart(1)}』`,
                );
                await era.printAndWait(
                  `「不，才不是呢……是因为，因为……啊啊真的很兴奋啊${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}胯下的阴茎充血挺立了起来，摇晃着顶端穿入的银环………`,
                );
              } else {
                await era.printAndWait(
                  `「请，请魔王大人欣赏人家的穿环阴茎吧${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}胯下的阴茎充血挺立了起来，摇晃着顶端穿入的银环………`,
                );
              }
            } else {
              if (assi_mao) {
                await era.printAndWait(
                  `『哎呀呀，阴蒂穿上这样的东西，恐怕姐姐以后就没法过正常的生活了吧』`,
                );
                await era.printAndWait(
                  `「不，不要对姐姐恶作剧啦……不过，不过……真的很有感觉啊${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}充血勃起的阴蒂被穿上了银环，变得更加敏感了……`,
                );
              } else {
                await era.printAndWait(
                  `「阴蒂被穿上这样的环，以后就正式成为魔王大人的性奴了呢…${heart(1)}」`,
                );
                await era.printAndWait(
                  `${target_name}充血勃起的阴蒂被穿上了银环，变得更加敏感了……`,
                );
              }
            }
          } else if (p === 16) {
            if (assi_mao) {
              await era.printAndWait(`『啊嘿嘿，姐姐的舌头也来一个环吧♪』`);
              await era.printAndWait(
                `「哎……那里也要吗……既然你这么希望的话……」`,
              );
              await era.printAndWait(
                `${target_name}有些害羞地用穿着银环的舌尖舔着嘴唇……`,
              );
            } else {
              await era.printAndWait(
                `「这样接吻……会很舒服吧，魔王大人${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}有些害羞地用穿着银环的舌尖舔着嘴唇……`,
              );
            }
          } else if (p === 32) {
            if (assi_mao) {
              await era.printAndWait(`『呣呣，姐姐来试试带环接吻吧…』`);
              await era.printAndWait(`「先，先让魔王大人来啦」`);
              await era.printAndWait(
                `${target_name}娇嫩嘴唇上的银环在闪闪发亮…`,
              );
            } else {
              await era.printAndWait(`「魔王大人，来接吻吧…${heart(1)}」`);
              await era.printAndWait(
                `${target_name}娇嫩嘴唇上的银环在闪闪发亮…`,
              );
            }
          } else if (p === 64) {
            if (assi_mao) {
              await era.printAndWait(
                `『哎嘿嘿，鼻子穿上环之后，姐姐就真的变成母牛性奴呢了』`,
              );
              await era.printAndWait(
                `「感觉……有点怪怪的……不过，变成魔王大人的母牛性奴……也很高兴呢」`,
              );
              await era.printAndWait(`${target_name}轻轻抚摸着鼻子上的银环……`);
            } else {
              await era.printAndWait(
                `「感觉……有点怪怪的……不过，变成魔王大人的母牛性奴……也很高兴呢」`,
              );
              await era.printAndWait(`${target_name}轻轻抚摸着鼻子上的银环……`);
            }
          }
        } else {
          await era.printAndWait(
            `${target_name}轻轻地擦拭着穿环处留下的血迹……`,
          );
        }
        // CFLAG:348  = 3（变量语义：CFLAG 族，348）
        kojo.穿环 = 3;
      } else if (kojo.穿环 <= 1 || game.kojo.口上开关 === 2) {
        if (chara(target).train.穿环状态 & p) {
          if (p === 1) {
            if (assi_mao) {
              await era.printAndWait(`『嘿嘿，很适合姐姐的淫乱大胸部呢』`);
              await era.printAndWait(`「一点都不适合……快点拿下来啊……呜呜呜」`);
              await era.printAndWait(
                `${target_name}充血挺立起的乳头上，银环闪闪发光……`,
              );
            } else {
              await era.printAndWait(`「好痛……取，取下来啊……求求你」`);
              await era.printAndWait(
                `${target_name}充血挺立起的乳头上，银环闪闪发光……`,
              );
            }
          } else if (p === 2) {
            if (assi_mao) {
              await era.printAndWait(`嘿嘿嘿，姐姐这样好可爱呢${heart(1)}』`);
              await era.printAndWait(`「不，不要碰啊……好痛…」`);
              await era.printAndWait(
                `${target_name}的肚脐上穿入了闪闪发光的银环……`,
              );
            } else {
              await era.printAndWait(`「呜……已，已经好了吗？」`);
              await era.printAndWait(
                `${target_name}吃痛地抚摸着自己肚脐上上闪闪发光的银环……`,
              );
            }
          } else if (p === 4) {
            if (assi_mao) {
              await era.printAndWait(
                `『嘿嘿，姐姐真的是很合适穿环啊，特别是小穴这里♪』`,
              );
              await era.printAndWait(`「不，不要那么用力啊……好痛！」`);
              await era.printAndWait(
                `${player_name}用手指分开了${target_name}的蜜穴，欣赏着上面穿入的两个银环。`,
              );
            } else {
              await era.printAndWait(`「不要……不要看啊啊！」`);
              await era.printAndWait(
                `${player_name}用手指分开了${target_name}的蜜穴，欣赏着上面穿入的两个银环。`,
              );
            }
          } else if (p === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              if (assi_mao) {
                await era.printAndWait(
                  `『真厉害呢姐姐，穿环的时候都会兴奋得勃起呀${heart(1)}』`,
                );
                await era.printAndWait(
                  `「不，不是这样子的……都是因为你用手又拉又摩擦……才会勃起的……」`,
                );
                await era.printAndWait(
                  `${player_name}用手摩擦着${target_name}胯下的阴茎，摇晃着顶端穿入的银环………`,
                );
              } else {
                await era.printAndWait(`「呜呜……不，不要这样用力……摩擦啊啊」`);
                await era.printAndWait(
                  `${player_name}用手摩擦着${target_name}胯下的阴茎，摇晃着顶端穿入的银环………`,
                );
              }
            } else {
              if (assi_mao) {
                await era.printAndWait(
                  `『哎呀呀，阴蒂穿上这样的东西，恐怕姐姐以后就没法过正常的生活了吧』`,
                );
                await era.printAndWait(`「求求你了……不要再欺负姐姐了……呜呜」`);
                await era.printAndWait(
                  `${target_name}充血勃起的阴蒂被穿上了银环，变得更加敏感了……`,
                );
              } else {
                await era.printAndWait(
                  `「不，不要啊……那个部位……不可以……呜呜呜」`,
                );
                await era.printAndWait(
                  `${target_name}充血勃起的阴蒂被穿上了银环，变得更加敏感了……`,
                );
              }
            }
          } else if (p === 16) {
            if (assi_mao) {
              await era.printAndWait(`『啊嘿嘿，姐姐的舌头也来一个环吧♪』`);
              await era.printAndWait(`「呜呜……不……不要拉啊啊……」`);
              await era.printAndWait(
                `${target_name}被${player_name}强行拉扯着舌头，穿上了银环，痛得呜咽了起来……`,
              );
            } else {
              await era.printAndWait(
                `「不，不要啊……呜呜呜……以后会没办法……好好吃饭的……」`,
              );
              await era.printAndWait(
                `${target_name}被${player_name}强行拉扯着舌头，穿上了银环，呜咽着说着什么……`,
              );
            }
          } else if (p === 32) {
            if (assi_mao) {
              await era.printAndWait(`『嘿嘿，姐姐以后接吻会很舒服的…』`);
              await era.printAndWait(`「才，才没有那种事……好奇怪的感觉……」`);
              await era.printAndWait(
                `${target_name}娇嫩嘴唇上的银环在闪闪发亮…`,
              );
            } else {
              await era.printAndWait(`「呜呜……感觉好奇怪……一点都不习惯」`);
              await era.printAndWait(
                `${target_name}娇嫩嘴唇上的银环在闪闪发亮…`,
              );
            }
          } else if (p === 64) {
            if (assi_mao) {
              await era.printAndWait(
                `『哎嘿嘿，鼻子穿上环之后，姐姐就真的变成母牛性奴呢了』`,
              );
              await era.printAndWait(`「不，不要再说了……呜呜呜…」`);
              await era.printAndWait(`${target_name}痛苦地摸着鼻子上的银环……`);
            } else {
              await era.printAndWait(`「呜呜……鼻子好痛…」`);
              await era.printAndWait(`${target_name}痛苦地摸着鼻子上的银环……`);
            }
          }
        } else {
          await era.printAndWait(
            `${target_name}流着泪水，轻轻地擦拭着穿环处留下的血迹……`,
          );
        }
        // CFLAG:348  = 2（变量语义：CFLAG 族，348）
        kojo.穿环 = 2;
      }
    }
    return 0;
  }

  return 0;
}

async function dog_kojo_11(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const kojo = chara(target).kojo;

  if (era_flag.selectcom === 0) {
    if (kojo.爱抚 === 0) {
      if (era.get(`mark:${target}:2`) >= 2) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:301  = 1（变量语义：CFLAG 族，301）
      kojo.爱抚 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        (kojo.爱抚 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:301  = 7（变量语义：CFLAG 族，301）
        kojo.爱抚 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:301  = 6（变量语义：CFLAG 族，301）
        kojo.爱抚 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:301  = 5（变量语义：CFLAG 族，301）
        kojo.爱抚 = 5;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:301  = 4（变量语义：CFLAG 族，301）
        kojo.爱抚 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 2 &&
        (kojo.爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:301  = 3（变量语义：CFLAG 族，301）
        kojo.爱抚 = 3;
      } else if (
        era.get(`mark:${target}:2`) <= 1 &&
        (kojo.爱抚 <= 1 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:301  = 2（变量语义：CFLAG 族，301）
        kojo.爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 1) {
    if (kojo.舔阴 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:302  = 1（变量语义：CFLAG 族，302）
      kojo.舔阴 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        (kojo.舔阴 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:302  = 6（变量语义：CFLAG 族，302）
        kojo.舔阴 = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.舔阴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:302  = 5（变量语义：CFLAG 族，302）
        kojo.舔阴 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.舔阴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:302  = 4（变量语义：CFLAG 族，302）
        kojo.舔阴 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.舔阴 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:302  = 3（变量语义：CFLAG 族，302）
        kojo.舔阴 = 3;
      } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait('');
        // CFLAG:302  = 2（变量语义：CFLAG 族，302）
        kojo.舔阴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 5) {
    if (kojo.胸爱抚 === 0) {
      if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306）
      kojo.胸爱抚 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        (kojo.胸爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 6（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 5（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 4（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 4;
      } else if (
        chara(target).system.乳房感觉 >= 3 &&
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
      if (era.get(`talent:${target}:136`) === 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      kojo.接吻 = 1;
      return 0;
    } else if (kojo.接吻 === 0) {
      if (era.get(`talent:${target}:136`) === 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      kojo.接吻 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        (kojo.接吻 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 6（变量语义：CFLAG 族，307）
        kojo.接吻 = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.接吻 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 5（变量语义：CFLAG 族，307）
        kojo.接吻 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.接吻 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 4（变量语义：CFLAG 族，307）
        kojo.接吻 = 4;
      } else if (
        chara(target).system.顺从 >= 2 &&
        (kojo.接吻 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 3（变量语义：CFLAG 族，307）
        kojo.接吻 = 3;
      } else if (kojo.接吻 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait('');
        // CFLAG:307  = 2（变量语义：CFLAG 族，307）
        kojo.接吻 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 9) {
    if (kojo.舔肛 === 0) {
      if (era.get(`talent:${target}:136`) === 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310）
      kojo.舔肛 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        (kojo.舔肛 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 6（变量语义：CFLAG 族，310）
        kojo.舔肛 = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 5（变量语义：CFLAG 族，310）
        kojo.舔肛 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.舔肛 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 4（变量语义：CFLAG 族，310）
        kojo.舔肛 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.舔肛 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 3（变量语义：CFLAG 族，310）
        kojo.舔肛 = 3;
      } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait('');
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
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      } else {
        if (era.get(`talent:${target}:136`) === 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
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
        if (rand_n(3) === 0) {
          await era.printAndWait('');
        } else if (rand_n(2) === 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:322  = 7（变量语义：CFLAG 族，322）
        kojo.背后位 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
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
        era.get(`talent:${target}:85`) === 1 &&
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
        era.get(`mark:${target}:2`) === 3 &&
        chara(target).system.私处感觉 >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:322  = 4（变量语义：CFLAG 族，322）
        kojo.背后位 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
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
      if (era.get(`talent:${target}:136`) === 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328）
      kojo.背后位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.背后位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:328  = 7（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
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
        era.get(`talent:${target}:85`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
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
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.背后位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:328  = 4（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 4;
      } else if (
        chara(target).system.肛门感觉 >= 3 &&
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
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait('');
      } else if (chara(target).system.侍奉精神 >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331）
      kojo.手淫 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        chara(target).system.侍奉精神 >= 3 &&
        (kojo.手淫 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:331  = 7（变量语义：CFLAG 族，331）
        kojo.手淫 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        chara(target).system.侍奉精神 >= 3 &&
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
        era.get(`talent:${target}:85`) === 1 &&
        chara(target).system.侍奉精神 >= 5 &&
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
        era.get(`talent:${target}:85`) === 1 &&
        chara(target).system.侍奉精神 >= 3 &&
        (kojo.手淫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:331  = 4（变量语义：CFLAG 族，331）
        kojo.手淫 = 4;
      } else if (
        chara(target).system.侍奉精神 >= 3 &&
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
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait('');
      } else if (chara(target).system.侍奉精神 >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332）
      kojo.口交_奴 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        chara(target).system.侍奉精神 >= 5 &&
        (kojo.口交_奴 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:332  = 7（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        chara(target).system.侍奉精神 >= 5 &&
        (kojo.口交_奴 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:332  = 6（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.乳交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:332  = 5（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        chara(target).system.侍奉精神 >= 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.print('');
        await era.printAndWait('');
        // CFLAG:332  = 4（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 4;
      } else if (
        chara(target).system.侍奉精神 >= 3 &&
        (kojo.口交_奴 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.print('');
        await era.printAndWait('');
        // CFLAG:332  = 3（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 3;
      } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait('');
        // CFLAG:332  = 2（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 34) {
    if (kojo.骑乘位 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        if (era.get(`talent:${target}:136`) === 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      } else {
        if (era.get(`talent:${target}:136`) === 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) === 1) {
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
        era.get(`talent:${target}:136`) === 1 &&
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
        era.get(`talent:${target}:76`) === 1 &&
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
        era.get(`talent:${target}:85`) === 1 &&
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
        era.get(`mark:${target}:2`) === 3 &&
        chara(target).system.私处感觉 >= 3 &&
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
        era.get(`mark:${target}:2`) === 3 &&
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
      if (chara(target).system.侍奉精神 >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338）
      kojo.肛门侍奉 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        chara(target).system.侍奉精神 >= 5 &&
        (kojo.肛门侍奉 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:338  = 6（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        chara(target).system.侍奉精神 >= 5 &&
        (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:338  = 5（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        chara(target).system.侍奉精神 >= 5 &&
        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.print('');
        // CFLAG:338  = 4（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 4;
      } else if (
        chara(target).system.侍奉精神 >= 3 &&
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
      if (era.get(`talent:${target}:136`) === 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:76`) === 1) {
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
        era.get(`talent:${target}:136`) === 1 &&
        (kojo.眼罩 <= 9 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 10（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 10;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        chara(target).system.抖M气质 >= 5 &&
        (kojo.眼罩 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        chara(target).system.抖M气质 >= 3 &&
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
        chara(target).system.抖M气质 >= 5 &&
        (kojo.眼罩 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        chara(target).system.抖M气质 >= 3 &&
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
        chara(target).system.抖M气质 >= 3 &&
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
  } else if (era_flag.selectcom === 43 && era0(`tequip:${target}:43`) === 0) {
    if (
      era.get(`talent:${target}:136`) === 1 &&
      (kojo.兽奸眼罩 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('');
      // CFLAG:444  = 4（变量语义：CFLAG 族，444）
      kojo.兽奸眼罩 = 4;
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.兽奸眼罩 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('');
      // CFLAG:444  = 3（变量语义：CFLAG 族，444）
      kojo.兽奸眼罩 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.兽奸眼罩 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('');
      // CFLAG:444  = 2（变量语义：CFLAG 族，444）
      kojo.兽奸眼罩 = 2;
    } else if (kojo.兽奸眼罩 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait('');
      // CFLAG:444  = 1（变量语义：CFLAG 族，444）
      kojo.兽奸眼罩 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 56) {
    if (kojo.交谈 === 0) {
      if (era.get(`tequip:${target}:53`)) {
        if (era.get(`talent:${target}:136`) === 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) === 1) {
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
          era.get(`talent:${target}:136`) === 1 &&
          (kojo.交谈 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait('');
          // CFLAG:357  = 5（变量语义：CFLAG 族，357）
          kojo.交谈 = 5;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.交谈 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait('');
          // CFLAG:357  = 4（变量语义：CFLAG 族，357）
          kojo.交谈 = 4;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
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

/**
 * @KOJO_MESSAGE_PALAMCNG_11（:11463-11793）：参数变动口上。
 * 首超润滑/欲情/耻情/恐怖 Lv2、四类首次绝顶与处女丧失。
 */
async function kojo_message_palamcng_11(rand) {
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const player = era_flag.player;
  const player_name = chara_callname(player);
  const kojo = chara(target).kojo;
  const weapon_doggy =
    era0(`talent:${player}:121`) === 0 && era0(`talent:${player}:122`) === 0
      ? '震动假阳具'
      : '阴茎';
  void rand;

  if (era_flag.assi > 0 && era_flag.assiplay && era_flag.assi !== 17) {
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

  const p1 = era0(`palam:${target}:3`) + era0(`delta:${target}:3`);
  if (p1 > PALAMLV[2] && kojo.首次润滑Lv2 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      if (era_flag.selectcom === 50) {
        await era.printAndWait(
          `${target_name}的蜜穴和肛门完全被特制的润滑液充分地浸润了。`,
        );
        await era.printAndWait(`「其……其实不需要这个啦……」`);
        await era.printAndWait(`―――润滑首次超过Lv2。`);
      } else {
        await era.printAndWait(
          `${target_name}的蜜穴里，爱液正如注般地流出，连肛门也被浸润了。`,
        );
        await era.printAndWait(
          `「人，人家已经准备好……接受魔王大人的疼爱了…♪」`,
        );
        await era.printAndWait(`―――润滑首次超过Lv2。`);
      }
    } else {
      if (era_flag.selectcom === 50) {
        await era.printAndWait(
          `${target_name}的蜜穴和肛门完全被特制的润滑液充分地浸润了。`,
        );
        await era.printAndWait(`「这，这是什么啊啊…！」`);
        await era.printAndWait(`―――润滑首次超过Lv2。`);
      } else {
        await era.printAndWait(
          `${target_name}的蜜穴里，爱液正如注般地流出，连肛门也被浸润了。`,
        );
        await era.printAndWait(`「好……好丢人……不要看啊……！」`);
        await era.printAndWait(`―――润滑首次超过Lv2。`);
      }
    }
    // CFLAG:TARGET:221  = 1（变量语义：CFLAG 族，TARGET:221）
    kojo.首次润滑Lv2 = 1;
  }

  const p2 = era0(`palam:${target}:5`) + era0(`delta:${target}:5`);
  if (p2 > PALAMLV[2] && kojo.首次欲情Lv2 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      if (era_flag.selectcom === 51) {
        await era.printAndWait(`「其实不，不需要特意用这样的……东西啦………」`);
        await era.printAndWait(
          `${target_name}顺从地喝下了媚药，立即就出现了反应。`,
        );
        await era.printAndWait(`「哈啊……啊啊……魔王大人……我……我已经……！」`);
        await era.printAndWait(
          `${target_name}的瞳孔扩大了，被欲火焚烤着的身体，只渴求着一件事情——交媾。`,
        );
        await era.printAndWait(`―――情欲首次超过Lv2。`);
      } else {
        await era.printAndWait(
          `「魔，魔王大人………快点……开始调教，侵犯人家吧！」`,
        );
        await era.printAndWait(`${target_name}的身体完全屈从于欲望了。`);
        await era.printAndWait(`―――情欲首次超过Lv2。`);
      }
    } else {
      if (era_flag.selectcom === 51) {
        await era.printAndWait(`「这……这种奇怪的感觉……难道是催淫药？…」`);
        await era.printAndWait(
          `炼金术特制的媚药，即使是处女也会屈从于其药效之下。`,
        );
        await era.printAndWait(
          `${target_name}第一次体验到身体被欲望控制的感觉。。`,
        );
        await era.printAndWait(`―――情欲首次超过Lv2。`);
      } else {
        await era.printAndWait(`「身……身体好热……感觉好奇怪……」`);
        await era.printAndWait(`${target_name}脸色潮红，呼吸也加快了。`);
        await era.printAndWait(`―――情欲首次超过Lv2。`);
      }
    }
    // CFLAG:222  = 1（变量语义：CFLAG 族，222）
    kojo.首次欲情Lv2 = 1;
  }

  const p3 = era0(`palam:${target}:8`) + era0(`delta:${target}:8`);
  if (p3 > PALAMLV[2] && kojo.首次耻情Lv2 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`「好，好羞耻啊……不要那样盯着人家看啦！♪」`);
      await era.printAndWait(`${target_name}半掩着脸，露出了害羞的笑容。`);
      await era.printAndWait(`―――耻情首次超过Lv2。`);
    } else {
      await era.printAndWait(`「不要啊啊，这，这样……太羞耻了！」`);
      await era.printAndWait(`${target_name}羞耻得涨红了脸，眼神里满是屈辱。`);
      await era.printAndWait(`―――耻情首次超过Lv2`);
    }
    // CFLAG:223  = 1（变量语义：CFLAG 族，223）
    kojo.首次耻情Lv2 = 1;
  }

  const p4 = era0(`palam:${target}:10`) + era0(`delta:${target}:10`);
  if (p4 > PALAMLV[2] && kojo.首次恐怖Lv2 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`「呜呜，为，为什么有这样的事情……！」`);
      await era.printAndWait(`${target_name}害怕得闭上了眼睛……`);
      await era.printAndWait(`―――恐惧首次超过Lv2。`);
    } else {
      await era.printAndWait(`「不，不要啊……这种事情……太可怕了……！」`);
      await era.printAndWait(
        `${target_name}害怕得脸皱成一团，眼睛都不敢睁开………`,
      );
      await era.printAndWait(`―――恐惧首次超过Lv2。`);
    }
    // CFLAG:224  = 1（变量语义：CFLAG 族，224）
    kojo.首次恐怖Lv2 = 1;
  }

  if (era0(`nowex:${target}:0`) > 0 && kojo.首次C绝顶 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(
        `「哈啊……哈啊！为什么……小豆豆……被摸……会，会这么舒服啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `―――${target_name}第一次品味到了阴蒂高潮的极度快感。`,
      );
      await era.printAndWait(`「可，可是身，身体……更热了……更想要了…」`);
      await era.printAndWait(`${target_name}弓起腰身，渴望着更多的快感………`);
    } else {
      await era.printAndWait(
        `「不，不能……再摸那里了……！阴蒂的感觉……好奇怪啊啊啊！」`,
      );
      await era.printAndWait(
        `―――${target_name}第一次品味到了阴蒂高潮的极度快感。`,
      );
      await era.printAndWait(`「为……为什么……会这么舒服啊啊啊！」`);
      await era.printAndWait(`${target_name}的身体还沉浸在阴蒂高潮的余韵中………`);
    }
    // CFLAG:225  = 1（变量语义：CFLAG 族，225）
    kojo.首次C绝顶 = 1;
  }

  if (era0(`nowex:${target}:1`) > 0 && kojo.首次V绝顶 === 0) {
    if (era.get(`talent:${target}:76`) === 1) {
      await era.printAndWait(
        `「呜啊啊……蜜穴好，好舒服${heart(1)} 好像……要上天了一样${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}整个腰身都弓了起来，全身不停地颤抖着，即将高潮的蜜穴，泛滥的爱液不住地涌出。`,
      );
      await era.printAndWait(
        `「哈啊……啊啊啊${heart(1)} 要，要去了啊啊……蜜穴……魔王大人……好好欣赏……${target_name}高潮的样子吧${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}淫浪地尖叫着，向${player_name}展示着第一次高潮的蜜穴`,
      );
    } else if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(
        `「呜啊啊啊……不行了……已，已经……忍不住了……啊啊啊！快感……为什么……会这么……强烈啊啊啊！」`,
      );
      await era.printAndWait(
        `${target_name}感受着阴道传来的越来越炽烈的快感，让她整个人都不知所措地颤抖着。`,
      );
      await era.printAndWait(
        `「不，不行了啊啊！${target_name}已经忍，忍不住了啊啊啊……！魔王大人……不……不要这样盯着${target_name}看啊啊」`,
      );
      await era.printAndWait(`「去，去了……！真的……去了……」`);
      await era.printAndWait(
        `${target_name}当着${player_name}的面，第一次品尝到了蜜穴高潮的极度快感。`,
      );
    } else {
      await era.printAndWait(
        `「呜啊啊啊……不行了……已，已经……忍不住了……啊啊啊！」`,
      );
      await era.printAndWait(
        `${target_name}感受着阴道传来的越来越炽烈的快感，让她整个人都不知所措地颤抖着。`,
      );
      await era.printAndWait(
        `「为，为什么……蜜穴……感觉越来越奇怪了啊啊啊！！！！」`,
      );
      await era.printAndWait(
        `${target_name}当着${player_name}的面，第一次品尝到了蜜穴高潮的极度快感。`,
      );
    }
    // CFLAG:TARGET:226  = 1（变量语义：CFLAG 族，TARGET:226）
    kojo.首次V绝顶 = 1;
  } else if (era0(`nowex:${target}:1`) > 0 && kojo.首次V绝顶 === 1) {
    if (era.get(`talent:${target}:76`) === 1 && game.event.插着不拔 === 1) {
      await era.print(
        `「哈啊${heart(1)} ……啊啊${heart(1)} 蜜穴${heart(1)} 舒服得……要疯了${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}的蜜穴在${weapon_doggy}的侵犯下，很快迎来了高潮。`,
      );
      await era.print(
        `「啊啊……淫穴${heart(1)} ${target_name}的淫穴${heart(1)} 去了啊啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}当着${player_name}的面，高潮得一塌糊涂………`,
      );
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      game.event.插着不拔 === 1
    ) {
      await era.print(
        `「呜啊……啊啊啊！要……要疯了……蜜穴……舒服……得……要疯了啊啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}的蜜穴被${weapon_doggy}连续侵犯着，交合处发出一声声不堪入耳的响声。`,
      );
      await era.print(
        `「哈啊……哈啊……${heart(1)} 要……要去了……蜜穴${heart(1)} 高潮了啊啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}在高潮的极度快感中，整个身体都弓了起来………`,
      );
    } else if (game.event.插着不拔 === 1) {
      await era.print(`「呜啊……啊啊啊……蜜穴……为什么……会这么舒服啊啊！」`);
      await era.print(`「哈啊……啊啊啊！已经……忍不住了啊啊啊！！！！」`);
      await era.printAndWait(`${target_name}在高潮中不住地颤抖着……`);
    }
  }

  if (era0(`nowex:${target}:2`) > 0 && kojo.首次A绝顶 === 0) {
    if (era.get(`talent:${target}:76`) === 1) {
      await era.printAndWait(
        `「哈啊……啊啊${heart(1)} 屁股舒，舒服得${heart(1)} 合，合不上了啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}的肛门在反复的调教开发下，终于饱尝到了极度的快感，${target_name}在这快感的冲击下，一脸登顶了的表情，舌头都伸到外面了。`,
      );
      await era.printAndWait(
        `「呜啊……啊啊啊${heart(1)} 这就是肛门……${heart(1)} 肛门高潮的感觉吗${heart(1)} 真的是……太舒服了啊啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}弓着身体，大声地淫叫了出来，品味着人生第一次肛门高潮………`,
      );
    } else if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(
        `「呜啊啊啊…屁股……已经舒服到……无法忍受了啊啊${heart(1)} 这种感觉……真是……太羞耻了……！」`,
      );
      await era.printAndWait(
        `${target_name}的肛门在反复地调教下，终于饱尝到了快感，当着${player_name}的面，不争气地高潮了。`,
      );
      await era.printAndWait(
        `「魔王大人，不，不要看啊，这个样子……太丢人了啊啊啊啊啊！！！」`,
      );
      await era.printAndWait(
        `${target_name}羞耻地蜷起了身子，却无法忍住舒服的娇喘，品味着人生第一次肛门高潮………`,
      );
    } else {
      await era.printAndWait(
        `「啊啊……屁股……感觉……越来越奇怪了……合，合不上了啊啊……呜呜！」`,
      );
      await era.printAndWait(
        `${target_name}的肛门在反复地调教下，终于饱尝到了快感，当着${player_name}的面，不争气地高潮了。`,
      );
      await era.printAndWait(`「呜啊啊啊……为什么……屁股会这么……舒服的啊啊！」`);
      await era.printAndWait(
        `${target_name}的身体蜷成一团，不住地呻吟着，品味着人生第一次肛门高潮。`,
      );
    }
    // CFLAG:227  = 1（变量语义：CFLAG 族，227）
    kojo.首次A绝顶 = 1;
  } else if (era0(`nowex:${target}:2`) > 0 && kojo.首次A绝顶 === 1) {
    if (era.get(`talent:${target}:76`) === 1) {
      await era.print(`「哈啊……屁股……已经……已经舒服得……不行了${heart(1)}」`);
      await era.printAndWait(
        `${target_name}的肛门在连绵的快感刺激下，开始不自觉地一张一合着，进入了高潮的前兆`,
      );
      await era.print(
        `「呜，呜呜啊啊啊${heart(1)} 去了${heart(1)} ${target_name}要用淫乱的肛门小穴……高潮了啊啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}在肛门高潮的极度快感中，不顾廉耻地发出淫浪的尖叫……`,
      );
    } else if (era.get(`talent:${target}:85`) === 1) {
      await era.print(
        `「不，不行了……不可以再欺负……屁股了啊啊……真的要……忍不住了嗯啊啊啊！」`,
      );
      await era.printAndWait(
        `${target_name}的肛门在连绵的快感刺激下，开始不自觉地一张一合着，进入了高潮的前兆`,
      );
      await era.print(
        `「呜啊啊……不，不要看啊${heart(1)} 不要……盯着……人家的屁股看啊${heart(1)} 去了……用屁股去了啊啊啊！」`,
      );
      await era.printAndWait(
        `${target_name}满脸通红，肛门在极度的快感刺激下高潮了……`,
      );
    } else {
      await era.print(`「不，不可以再欺负……屁股了啊啊……真的……嗯啊啊啊！」`);
      await era.printAndWait(
        `${target_name}的肛门已经脱离了意志的控制，反复地一张一合着。`,
      );
      await era.print(
        `「哈啊……啊啊……不，不行了……要，要用屁股……这种……肮脏的地方……高潮了啊啊！」`,
      );
      await era.printAndWait(`${target_name}的肛门在极度的快感刺激下高潮了……`);
    }
  }

  if (era0(`nowex:${target}:3`) > 0 && kojo.首次B绝顶 === 0) {
    if (era.get(`talent:${target}:76`) === 1) {
      await era.printAndWait(
        `「再，再用力！魔王大人……${heart(1)} ${target_name}淫荡的乳头……还想要更多的……快感啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}口吐着淫浪之词，颤抖的身体来回摇晃着，抖动着丰满的双乳和挺立，肿胀的乳头。`,
      );
      await era.printAndWait(
        `「对……对……就是这样啊啊${heart(1)} 乳头……舒，舒服得要上天了啊啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `―――${target_name}第一次感受到了乳头高潮的极度快感。`,
      );
      await era.printAndWait(
        `「哈啊……啊啊……这感觉…好棒……好想再来一次……魔王大人，请把${target_name}的乳头彻底玩坏吧${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}向${player_name}露出了淫媚的笑容………`,
      );
    } else if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`「呜呜……乳头……乳头为什么……！」`);
      await era.printAndWait(
        `${target_name}敏感的乳头，在${player_name}的玩弄下不住地颤抖着，将一阵阵强烈的快感传递到神经中枢。`,
      );
      await era.printAndWait(
        `「好奇怪……乳头的感觉……好奇怪……但是……好舒服啊啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `―――${target_name}第一次感受到了乳头高潮的极度快感。`,
      );
      await era.printAndWait(`「太，太舒服了……好想……再来一次…」`);
      await era.printAndWait(
        `${target_name}向${player_name}露出了要融化般的笑容………`,
      );
    } else {
      await era.printAndWait(
        `「不，不可以……再这么玩……乳头了！都……都已经肿起来了啊啊……」`,
      );
      await era.printAndWait(
        `虽然${target_name}口头上不住地抗拒着，但潮红的脸上却充满了期待和渴望的表情`,
      );
      await era.printAndWait(`「哈啊……啊啊……真的，不行了啊啊啊啊！」`);
      await era.printAndWait(
        `―――${target_name}第一次感受到了乳头高潮，极度的快感让整个身体脱力地颤抖着。`,
      );
      await era.printAndWait(`「明明，都说了……不行了…」`);
    }
    // CFLAG:TARGET:228  = 1（变量语义：CFLAG 族，TARGET:228）
    kojo.首次B绝顶 = 1;
  }

  const pain = era0(`delta:${target}:11`) + era0(`delta:${target}:12`);
  if (game.train.处女丧失 === 1 && kojo.处女丧失 === 0) {
    if (game.train.主人导致处女丧失 === 1) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (pain < 500 || game.system.反抗刻印回避 === 1)
      ) {
        await era.printAndWait(
          `「第一次……献给了魔王大人……真是……开心${heart(1)}」`,
        );
        await era.printAndWait(
          `「虽然……这次只是单纯的觉的痛而已、不过大概多被${weapon_doggy}侵犯几次就会舒服起来了吧！」`,
        );
        await era.printAndWait(
          `${target_name}一点都没有惋惜自己失去处女身这件事，反而发自心底地期待着对蜜穴的进一步调教………`,
        );
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (pain < 500 || game.system.反抗刻印回避 === 1)
      ) {
        await era.printAndWait(
          `「哈啊……啊啊……魔王大人${heart(1)} 我的处女身……属于你了啊啊啊！」`,
        );
        await era.printAndWait(
          `「一，一点都不痛……没关系的……请，请魔王大人……继续疼爱${target_name}吧！」`,
        );
        await era.printAndWait(
          `${target_name}不住地流着泪水，去向${player_name}强作着笑容……`,
        );
      } else {
        await era.printAndWait(
          `「住，住手啊啊啊！放开我，放开我！快点拔出去啊啊啊！！！」`,
        );
        await era.printAndWait(`「我，我的第一次……呜呜呜呜！」`);
        await era.printAndWait(
          `${target_name}承受着破处的痛苦和屈辱，咬着双唇呜咽了起来………`,
        );
      }
    } else {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊嘿嘿……这个碍事的处女膜……终于这样去掉了${heart(1)}」`,
        );
        await era.printAndWait(
          `「呼哈……啊啊……请毫不留情地……将${target_name}的蜜穴……侵犯得一塌糊涂吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一点都没有惋惜自己失去处女身这件事，反而发自心底地期待着对蜜穴的进一步调教………`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「呜啊啊……好，好痛啊啊！本来……想把处女……献给魔王大人的呜呜呜……」`,
        );
        await era.printAndWait(
          `${target_name}看着从自己蜜穴里流出来的处女血，悲伤得无以复加`,
        );
      } else {
        await era.printAndWait(
          `「住，住手啊！求求你，拔出去啊！我还是处女啊啊啊啊——」`,
        );
        await era.printAndWait(
          `${target_name}承受着破处的痛苦和屈辱，咬着双唇呜咽了起来………`,
        );
      }
    }
    // CFLAG:TARGET:229  = 1（变量语义：CFLAG 族，TARGET:229）
    kojo.处女丧失 = 1;
  }
}

/** @KOJO_MESSAGE_MARKCNG_11（:11794-11880）：四类 Lv3 刻印取得口上。 */
async function kojo_message_markcng_11(rand) {
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const player_name = chara_callname(era_flag.player);
  const kojo = chara(target).kojo;
  void rand;

  if (era_flag.assi > 0 && era_flag.assiplay && era_flag.assi !== 17) {
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
    if (
      era.get(`talent:${target}:85`) === 1 ||
      era.get(`talent:${target}:76`) === 1
    ) {
      await era.printAndWait(
        `「啊啊啊……好痛，好痛啊啊……魔，魔王大人……是在惩罚我嘛……呜啊啊！！」`,
      );
      await era.printAndWait(
        `${target_name}痛苦得表情都扭曲了，眼泪口水都流了出来………`,
      );
    } else {
      await era.printAndWait(
        `「啊啊啊……好痛，好痛啊啊！！饶了我吧，求求你，饶了我吧！」`,
      );
      await era.printAndWait(
        `${target_name}痛苦得表情都扭曲了，眼泪口水都流了出来………`,
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
        `「哈啊……啊啊啊${heart(1)} 身体……已经变成这个样子了啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}在${player_name}的调教下，感受到了无与伦比的快感，腰肢颤动着，表情更是仿佛要融化了一般。`,
      );
      await era.printAndWait(
        `「已，已经……变成……没有魔王大人给予的快乐……就活不下去了……再也回不到，也不想回到……过去的样子了${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}的身体沉沦在快乐之中，已经再也无法自拔了……`,
      );
    } else {
      await era.printAndWait(
        `「哈啊……啊啊啊……身体……为什么……会变成这个样子了……不可以啊啊！」`,
      );
      await era.printAndWait(
        `${target_name}在${player_name}的调教下，感受着生理上无与伦比的快感，和心理抗拒的自相矛盾。`,
      );
      await era.printAndWait(`「已，已经……不行了……感觉再也……忘不掉……」`);
      await era.printAndWait(
        `${target_name}的身体沉沦在快乐之中，已经再也无法自拔了……`,
      );
    }
    // CFLAG:298  = 1（变量语义：CFLAG 族，298）
    kojo.快乐刻印Lv3 = 1;
  }

  if (game.system.屈服刻印变动 === 3 && kojo.屈服刻印Lv3 === 0) {
    await era.printAndWait(
      `「呜……呜呜……我，我会服从魔王大人的命令和要求的……」`,
    );
    await era.printAndWait(
      `${target_name}在${player_name}连续的屈辱调教下，终于从精神上屈服了。`,
    );
    await era.printAndWait(
      `「所，所以……拜托了，拜托了……请魔王大人调教的时候……稍微手下留情一些……呜呜呜」`,
    );
    await era.printAndWait(
      `${target_name}卑微屈膝的笑颜反而更加激起了${player_name}的施虐心。`,
    );
    // CFLAG:299  = 1（变量语义：CFLAG 族，299）
    kojo.屈服刻印Lv3 = 1;
  }

  if (game.system.反抗刻印变动 === 3 && kojo.反抗刻印Lv3 === 0) {
    if (
      era.get(`talent:${target}:85`) === 1 ||
      era.get(`talent:${target}:76`) === 1
    ) {
      await era.printAndWait(`「不，不要碰我……」`);
      await era.printAndWait(`「为，为什么要对我做这种事………」`);
      await era.printAndWait(
        `${target_name}愣愣地看着床，一副被重要的人背叛了的表情……`,
      );
    } else {
      await era.printAndWait(`「绝，绝对不会原谅你的……」`);
      await era.printAndWait(`「你，你给我记住……呜呜呜」`);
      await era.printAndWait(
        `${target_name}紧紧咬着嘴唇，双眼瞪视着${player_name}……`,
      );
    }
    // CFLAG:300  = 1（变量语义：CFLAG 族，300）
    kojo.反抗刻印Lv3 = 1;
  }
}

/** @SELF_KOJO_K11（:11881-12261）：调教后、晨间与妊娠事件口上。 */
async function self_kojo_k11(rand) {
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const player_name = chara_callname(era_flag.player);
  const master_name = chara_callname(MASTER);
  const assi_name = chara_callname(era_flag.assi);
  const kojo = chara(target).kojo;
  const q = peek_aftertrain_q();
  const s = peek_aftertrain_s();
  // 原作 F 是无专用生产者的单字母全局；按 Emuera 全局本身读取，保留两条夜袭分支。
  const f = era0('f:0');
  const cstr2 = era.get(`cstr:${target}:2`) || '';
  const random = rand ?? rand_n;
  if (game.train.初吻与自我口上 === 1) {
    if (era.get(`talent:${target}:9`) === 1) {
      await era.printAndWait(`「嘻嘻嘻……哈哈……嘿嘿……咕嘿嘿${heart(1)}」`);
      await era.printAndWait(
        `${target_name}一只手扩张着自己爱液泛滥的蜜穴，另一只手近乎发狂一样地自慰着……`,
      );
    } else if (q === 1) {
      await era.printAndWait(
        `「嗯啊……啊啊……${assi_name}…${heart(1)}…${assi_name}……想要你在我身边${heart(1)}…嗯啊啊！」`,
      );
      await era.printAndWait(`${target_name}呓语着助手的名字，连续地自慰着……`);
    } else if (q === 2) {
      await era.printAndWait(
        `「啊啊……身体……好想要和野狗交配……嘴，小穴……肛门都想要！」`,
      );
      await era.printAndWait(
        `${target_name}妄想着自己正在兽交的样子，边自慰着……`,
      );
    } else {
      if (
        era.get(`talent:${target}:76`) &&
        (kojo.调教后自慰 < 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「把人家的欲火撩起来后就置之不理了，真过分呢…嗯啊…啊啊…啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}带着好像要融化一样的表情不停地自慰着。`,
        );
        await era.printAndWait(
          `「嗯啊…啊啊${heart(1)} 好像要${heart(1)} 好像要${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的双手同时自慰着前后两穴，和被调教之前的淳朴的村姑形象形成了鲜明的对比。`,
        );
        await era.printAndWait(`「可是…还是不能满足啊啊啊……」`);
        // CFLAG:261  = 4（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 4;
      } else if (
        era.get(`talent:${target}:85`) &&
        (kojo.调教后自慰 < 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈啊…啊啊…我到底…在做什么啊…嗯啊啊」`);
        await era.printAndWait(
          `${target_name}趴在床上，嘴里咬着床单，双手同时自慰着前后的两穴。`,
        );
        await era.printAndWait(
          `「嗯啊……啊啊${heart(1)} 可是……好想要…${heart(1)}」`,
        );
        await era.printAndWait(
          `自慰的快感促使${target_name}不自觉地摇着腰身，手指在蜜穴和阴蒂上更加用力摩擦，搓揉起来，舒服的娇喘声在房间里回荡着………`,
        );
        // CFLAG:261  = 3（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 3;
      } else if (
        era.get(`abl:${target}:31`) >= 3 &&
        (kojo.调教后自慰 < 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊…嗯啊啊…为什么…手指不听指挥…停不下来啊啊啊……」`,
        );
        await era.printAndWait(
          `${target_name}的理性还在抗拒着，但手却忍不住更加激烈地自慰着。`,
        );
        await era.printAndWait(`「呜啊啊…可是…这样摸…好舒服……啊啊…嗯啊啊……」`);
        // CFLAG:261  = 2（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 2;
      } else if (kojo.调教后自慰 < 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「明明已经调教完了，为什么身体还这么热…好难受，好痒…已经忍不住了…嗯啊啊…啊啊」`,
        );
        await era.printAndWait(`「呜呜呜…为什么…我会做这样的事……」`);
        await era.printAndWait(
          `${target_name}内心充满了罪恶感，却又无法停下自慰的动作………`,
        );
        // CFLAG:261  = 1（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 1;
      }
    }
  }

  if (game.train.初吻与自我口上 === 2) {
    if (era.get(`talent:${target}:9`) === 1) {
      await era.printAndWait(`「咕嘿……咕嘿嘿嘿……」`);
      await era.printAndWait(
        `精神已经崩坏的${target_name}凭着本能，沉浸在与${assi_name}的百合之乐中……`,
      );
      // CFLAG:262  = 6（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 6;
    } else if (
      era.get(`talent:${target}:76`) &&
      (kojo.百合PLAY < 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「嗯啊……啊啊……好，好厉害${heart(1)}」`);
      await era.printAndWait(
        `${target_name}被${assi_name}用出色的技巧玩弄着身体，连连喘息着，丝毫不掩饰享受的样子。`,
      );
      await era.printAndWait(`「继，继续……这样玩我……还想要，更多${heart(1)}」`);
      await era.printAndWait(
        `${assi_name}面对着${target_name}的反应，笑着继续玩弄着对方身体的敏感点……`,
      );
      // CFLAG:262  = 5（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 5;
    } else if (
      era.get(`talent:${target}:85`) &&
      (kojo.百合PLAY < 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「嗯啊……啊啊……不，不行啊！」`);
      await era.printAndWait(
        `${target_name}躺在床上，被${assi_name}用出色的技巧玩弄着身体的敏感点。`,
      );
      await era.printAndWait(
        `「但，但是为什么……这么有感觉啊啊……魔，魔王大人……原谅我……嗯啊啊！」`,
      );
      await era.printAndWait(
        `随着${assi_name}指尖的动作，${target_name}身体随着强烈的快感弹了起来，颤抖个不停，${assi_name}也尽情欣赏着对方高潮的样子…`,
      );
      // CFLAG:262  = 4（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 4;
    } else if (
      era.get(`abl:${target}:33`) >= 3 &&
      (kojo.百合PLAY < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「还，还想要${heart(1)} 人家的身体还想要更多啊啊，${assi_name}大人${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}用淫媚的声音向着${assi_name}边撒娇边呻吟着。`,
      );
      await era.printAndWait(`身体已经完全离不开百合之乐，沉沦其间了……`);
      // CFLAG:262  = 3（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 3;
    } else if (
      era.get(`abl:${target}:22`) >= 3 &&
      (kojo.百合PLAY < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「呜啊……嗯啊……稍微……温柔一点！不过……好舒服啊……」`,
      );
      await era.printAndWait(
        `${target_name}在${assi_name}的指尖下，发出了舒服的喘息声…`,
      );
      // CFLAG:262  = 2（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 2;
    } else if (kojo.百合PLAY < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「住，住手啊……我们……都是女人啊啊…！」`);
      await era.printAndWait(
        `${assi_name}把${target_name}按倒在床上，肆意地玩弄着身下的娇躯………`,
      );
      // CFLAG:262  = 1（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 1;
    }
  }

  if (game.train.初吻与自我口上 === 3) {
    if (era.get(`talent:${target}:9`) === 1) {
      await era.printAndWait(`「咕呣……咕呣…♪」`);
      await era.printAndWait(`${target_name}带着茫然的表情舔着阴茎……`);
      // CFLAG:263  = 4（变量语义：CFLAG 族，263）
      kojo.朝口交 = 4;
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.朝口交 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「咕呣……咕呣${heart(1)} 好美味${heart(1)} 魔王大人的味道${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}舔舐着${player_name}刚刚射完精液的阴茎，吸吮着上面残余的精液，直到口中的阴茎再度勃起。`,
      );
      await era.printAndWait(
        `「唔呣……早上好……唔呣${heart(1)} …魔王大人的肉棒……今天也是元气满满的呢${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}带着淫媚的笑容，低下头继续吸吮着阴茎……`,
      );
      // CFLAG:263  = 3（变量语义：CFLAG 族，263）
      kojo.朝口交 = 3;
    } else if (
      era.get(`talent:${target}:85`) &&
      (kojo.朝口交 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「唔呣……唔呣……哈啊……魔王大人在我的嘴里发射了呢…${heart(1)} ${target_name}很高兴能为魔王大人做早晨口交侍奉呢…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}脸颊，嘴唇上满是黏糊糊的精液，露出了微笑。`,
      );
      await era.printAndWait(
        `「请魔王大人不要动，让我为您清洁干净吧${heart(1)}」`,
      );
      await era.printAndWait(
        `带着淳朴的乡下少女的笑容、${target_name}低下头，吸吮着${player_name}的阴茎上残余的精液，进行着清洁……`,
      );
      // CFLAG:263  = 3（变量语义：CFLAG 族，263）
      kojo.朝口交 = 3;
    } else if (
      era.get(`abl:${target}:16`) >= 5 &&
      (kojo.朝口交 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「早，早上好，我，我来为……魔王大人进行……造成口交侍奉了……咕呣……咕呣♪」`,
      );
      await era.printAndWait(
        `对${target_name}的调教显然已经卓有成效，${target_name}低下头，将${player_name}的阴茎含在嘴里，仔细地清洁着上面残余得精液……`,
      );
      // CFLAG:263  = 2（变量语义：CFLAG 族，263）
      kojo.朝口交 = 2;
    } else if (kojo.朝口交 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(
        `「我，我按照命令……来为魔王大人进行……早晨的口交侍奉了……咕呣……咕呣」`,
      );
      await era.printAndWait(
        `${target_name}斜着眼为${player_name}进行着早晨口交侍奉……`,
      );
      // CFLAG:263  = 1（变量语义：CFLAG 族，263）
      kojo.朝口交 = 1;
    }
  }

  if (game.train.初吻与自我口上 === 4) {
    if (era.get(`talent:${target}:9`) === 1) {
      await era.printAndWait('');
      // CFLAG:264  = 3（变量语义：CFLAG 族，264）
      kojo.调教后性交 = 3;
    } else if (
      era.get(`abl:${target}:2`) >= 4 &&
      (kojo.调教后性交 < 2 || game.kojo.口上开关 === 2)
    ) {
      if (random(2) === 0) {
        await era.printAndWait(
          `「用力地侵犯这个淫荡的小穴吧……妹妹，村子什么的……已经统统不重要了！」`,
        );
      } else {
        await era.printAndWait(
          `「再，再用力一点……再深一点……把人家的淫穴……搞得乱七八糟吧！」`,
        );
      }
      await era.printAndWait(
        `${target_name}被${player_name}紧紧抱在身下侵犯着，随着快感激烈地扭动着腰肢，口中不住地娇喘着`,
      );
      await era.print(
        `「呜啊啊……好舒服……和魔王大人……做爱……真的是……太舒服……太幸福了啊啊啊！」`,
      );
      await era.printAndWait(
        `${target_name}被充分调教，开发过的蜜穴分泌着泛滥的爱液，紧紧夹着${player_name}的阴茎。`,
      );
      await era.printAndWait(
        `「呜啊……啊啊啊${heart(1)} 小穴${heart(1)} 在小穴里面${heart(1)} 尽情地射精吧啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}双腿交缠着${player_name}的腰，直到灼热的精液射进子宫。`,
      );
      if (s >= 3) {
        await era.printAndWait(
          `${target_name}被中出了${s}回之后，才精疲力尽而满意地松开了手………`,
        );
      }
      // CFLAG:264  = 2（变量语义：CFLAG 族，264）
      kojo.调教后性交 = 2;
    } else if (kojo.调教后性交 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(
        `「呜啊……啊啊……魔王大人……尽情侵犯我吧${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}在${player_name}有力的怀抱中享受着交媾的快感，娇喘了起来`,
      );
      await era.print(`「呜呜……好舒服……舒服得……已经没办法思考了……」`);
      await era.printAndWait(
        `「哈……哈啊……精液，满满的……射进去了……${heart(1)}」`,
      );
      await era.printAndWait(
        `被中出了${s}回之后，精液缓缓从${target_name}的双腿之间渗出……`,
      );
      // CFLAG:264  = 1（变量语义：CFLAG 族，264）
      kojo.调教后性交 = 1;
    }
  }

  if (game.train.初吻与自我口上 === 5) {
    if (
      era.get(`talent:${target}:9`) === 1 &&
      (kojo.夜袭 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「哈啊……啊啊……天花板好亮啊……」`);
      await era.printAndWait(
        `已经精神崩溃的${target_name}被自己的主人抱着，回到了${master_name}的房间………`,
      );
      // CFLAG:265  = 2（变量语义：CFLAG 族，265）
      kojo.夜袭 = 2;
    } else {
      await era.printAndWait(
        `「以前都是和妹妹一起睡的……现在只剩下一个人……有点寂寞。魔王大人，可不可以……陪${target_name}一起睡？」`,
      );
      await era.printAndWait(
        `${target_name}红着脸踏入了${master_name}的房间，甚至等不及回答就已经爬进了${master_name}的被窝里，俯在${master_name}的身上。`,
      );
      await era.printAndWait(
        `「真的是太寂寞了，满脑子里只想要被魔王大人疼爱……」`,
      );
      if (f === 1) {
        await era.printAndWait(
          `${target_name}拉着${master_name}的手伸向自己的双腿之间，爱抚着已经湿透了的蜜穴………`,
        );
      } else {
        await era.printAndWait(
          `${target_name}拉着${master_name}的手伸向自己的双腿之间，爱抚着已经被爱液浸润的肛门………`,
        );
      }
      // CFLAG:265  = 1（变量语义：CFLAG 族，265）
      kojo.夜袭 = 1;
    }
  }

  if (game.train.初吻与自我口上 === 6) {
    if (era.get(`talent:${target}:85`) && era.get(`mark:${target}:3`) < 3) {
      await era.printAndWait('');
    } else if (era.get(`mark:${target}:3`) === 3) {
      await era.printAndWait('');
    } else if (era.get(`talent:${target}:76`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  }

  if (game.train.初吻与自我口上 === 11) {
    if (kojo.妊娠发觉 === 0) {
      if (era.get(`talent:${target}:9`) === 1) {
        await era.printAndWait(
          `「为什么我非得遇上这种事啊……啊啊啊……不要啊……哈哈哈哈哈」`,
        );
        await era.printAndWait(`${target_name}的精神彻底崩溃了……`);
      } else if (
        era.get(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 === 1
      ) {
        await era.printAndWait(
          `「魔王大人……人家……怀上了你的孩子了${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}带着幸福的笑容，告诉了${master_name}自己怀孕的事…`,
        );
      } else if (chara(target).event.妊娠相手 === 2) {
        await era.printAndWait(
          `「好，好像怀孕了……应该是${cstr2}的孩子呢，真是的……！」`,
        );
        await era.printAndWait(
          `${target_name}将自己怀孕的事报告了${master_name}……`,
        );
      } else if (chara(target).event.妊娠相手 === 3) {
        await era.printAndWait(
          `「好，好像怀孕了……应该是${cstr2}的孩子呢，怀上了女人的孩子……感觉好奇怪……」`,
        );
        await era.printAndWait(
          `${target_name}将自己怀孕的事报告了${master_name}……`,
        );
      } else if (
        chara(target).event.妊娠相手 === 5 &&
        era.get(`talent:${target}:136`) &&
        chara(target).invasion.状态 !== 9
      ) {
        await era.printAndWait(
          `「人家怀孕了……是魔王大人饲养的那头健壮勇猛的野狗的孩子呢……会像父亲一样强壮的，请祝福它吧，魔王大人♪」`,
        );
      } else if (
        chara(target).event.妊娠相手 === 5 &&
        chara(target).invasion.状态 !== 9
      ) {
        await era.printAndWait(`「为，为什么会怀上……狗的孩子！」`);
      } else if (chara(target).event.妊娠相手 === 7) {
        await era.printAndWait(
          `「怀，怀上狂王大人的孩子了……好像还要公开妊娠表演……这，这种事情！」`,
        );
      } else {
        await era.printAndWait(
          `「被侵犯得怀孕了……呜呜……可是，也没有办法了……」`,
        );
      }
      // CFLAG:271  = 1（变量语义：CFLAG 族，271）
      kojo.妊娠发觉 = 1;
    } else {
      if (era.get(`talent:${target}:9`) === 1) {
        await era.printAndWait(
          `「又，又怀上新的宝宝了……哈，哈哈……这次会生出什么怪物呢……」`,
        );
        await era.printAndWait(`${target_name}流着口水，目瞪口呆的样子…`);
      } else if (
        era.get(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 === 1
      ) {
        await era.printAndWait(
          `「魔王大人……人家……怀上了你的孩子了${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}带着微微的幸福笑容，告诉了${master_name}自己怀孕的事…`,
        );
      } else if (chara(target).event.妊娠相手 === 2) {
        await era.printAndWait(
          `「好，好像怀孕了……应该是${cstr2}的孩子呢，真是的……！」`,
        );
        await era.printAndWait(
          `${target_name}将自己怀孕的事报告了${master_name}……`,
        );
      } else if (chara(target).event.妊娠相手 === 3) {
        await era.printAndWait(
          `「好，好像怀孕了……应该是${cstr2}的孩子呢，怀上了女人的孩子……总感觉有点奇怪……」`,
        );
        await era.printAndWait(
          `${target_name}将自己怀孕的事报告了${master_name}……`,
        );
      } else if (
        chara(target).event.妊娠相手 === 5 &&
        era.get(`talent:${target}:136`) &&
        chara(target).invasion.状态 !== 9
      ) {
        await era.printAndWait(
          `「人家怀孕了……是魔王大人饲养的那头健壮勇猛的野狗的孩子呢……会像父亲一样强壮的，请祝福它吧，魔王大人♪」`,
        );
      } else if (
        chara(target).event.妊娠相手 === 5 &&
        chara(target).invasion.状态 !== 9
      ) {
        await era.printAndWait(`「为，为什么会怀上……狗的孩子！」`);
      } else if (chara(target).event.妊娠相手 === 7) {
        await era.printAndWait(
          `「怀，怀上狂王大人的孩子了……好像还要公开妊娠表演……这，这种事情！」`,
        );
      } else {
        await era.printAndWait(
          `「被侵犯得怀孕了……呜呜……可是，也没有办法了……」`,
        );
      }
      // CFLAG:271  = 1（变量语义：CFLAG 族，271）
      kojo.妊娠发觉 = 1;
    }
  }

  if (game.train.初吻与自我口上 === 12) {
    if (kojo.生产 === 0) {
      if (era.get(`talent:${target}:9`) === 1) {
        await era.printAndWait(`「哈……哈啊……啊啊啊！啊啊啊啊！」`);
        await era.printAndWait(
          `已经彻底精神崩坏的${target_name}在哭泣中胡乱喊叫着……`,
        );
      } else if (
        era.get(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 === 1
      ) {
        await era.printAndWait(
          `「看，这是我们爱情的结晶呢、快点带他去洗个澡吧……」`,
        );
        await era.printAndWait(`${target_name}抱着你的孩子，幸福地笑了……`);
      } else {
        await era.printAndWait(`「呼，呼……孩，孩子出生了……」`);
      }
      // CFLAG:272  = 1（变量语义：CFLAG 族，272）
      kojo.生产 = 1;
    } else {
      if (era.get(`talent:${target}:9`) === 1) {
        await era.printAndWait(
          `「嘿……嘿嘿……哈啊……哈啊……啊啊啊！啊啊啊啊！！」`,
        );
        await era.printAndWait(
          `已经彻底精神崩坏的${target_name}在哭泣中胡乱喊叫着……`,
        );
      } else if (
        era.get(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 === 1
      ) {
        await era.printAndWait(`「看，这是我们又一个孩子呢……嘻嘻」`);
        await era.printAndWait(`${target_name}抱着你的孩子，幸福地笑了……`);
      } else {
        await era.printAndWait(`「呼，呼……孩，孩子出生了……」`);
      }
      // CFLAG:272  = 1（变量语义：CFLAG 族，272）
      kojo.生产 = 1;
    }
  }

  if (game.train.初吻与自我口上 === 13) {
    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {
      if (era.get(`talent:${target}:153`)) {
        await era.printAndWait(
          `「是特意来看我吗？感觉才没多久肚子就已经这么大了呢………」`,
        );
        await era.printAndWait(
          `即将临盆的${target_name}抚摸着自己胀鼓鼓的肚子……`,
        );
      } else if (era.get(`talent:${target}:154`)) {
        await era.printAndWait(`「看，魔王大人来探望你了，快点打个招呼吧？」`);
        await era.printAndWait(`${target_name}哄着孩子……`);
      }
    }
    // CFLAG:273  = 1（变量语义：CFLAG 族，273）
    kojo.育儿室 = 1;
  }

  if (game.train.初吻与自我口上 === 14) {
    await era.printAndWait(`「啊啊、那孩子走了………」`);
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

  // TFLAG:13  = 0（变量语义：TFLAG 族，13）
  game.train.初吻与自我口上 = 0;

  return 0;
}

async function dungeon_ryouzyoku_k11() {
  const target = era_flag.target;
  const target_name = chara_callname(target);

  if (era.get(`talent:${target}:0`) === 1) {
    await era.printAndWait(
      `「不，不要啊……求求你们，饶我一命吧……让我做什么都可以！」`,
    );
    await era.printAndWait(
      `${target_name}卑微地乞求着怪物的饶恕，然后被无情地凌辱了……`,
    );
  } else {
    await era.printAndWait(
      `「不，不要啊……求求你们，饶我一命吧……让我做什么都可以！」`,
    );
    await era.printAndWait(
      `${target_name}卑微地乞求着怪物的饶恕，然后被无情地凌辱了……`,
    );
  }

  return 0;
}

// @DUNGEON_RYOUZYOKU_AFTER_K11
async function dungeon_ryouzyoku_after_k11() {
  const target = era_flag.target;
  const target_name = chara_callname(target);

  if (era.get(`talent:${target}:0`) === 1) {
    await era.printAndWait(`「呜，呜呜……还好……处女身保住了……」`);
    await era.printAndWait(`${target_name}被怪物凌辱之后，精神恍惚地傻笑着。`);

    if (era.get(`exp:${target}:1`) > 20) {
      await era.print('');
      await era.printAndWait(`「呜……呜呜……屁股……被侵犯得一塌糊涂了……」`);
      await era.printAndWait(
        `${target_name}的肛门被虐待，侵犯得几乎合不上，精液和污物从里面慢慢流出来……`,
      );
    }

    if (era.get(`exp:${target}:22`) > 20) {
      await era.print('');
      await era.printAndWait(
        `「呜……呜啊……嘴巴好酸，下巴好像要脱臼了一样，好难受……呕呕呕呕」`,
      );
      await era.printAndWait(`${target_name}一边哭着将精液呕吐了出来……`);
    }

    if (era.get(`exp:${target}:20`) > 20) {
      await era.print('');
      await era.printAndWait(
        `「唔……呜呜……放，放开我啊……味道好臭……不要啊啊！」`,
      );
      await era.printAndWait(
        `${target_name}的脸被怪物按到了地板上，强迫她舔着地上的精液………`,
      );
    }
  } else {
    await era.printAndWait(
      `「呜……呜呜……身体，被弄得乱七八糟了……哈，哈啊……啊啊」`,
    );
    await era.printAndWait(`${target_name}被怪物凌辱过后，精神恍惚地傻笑着`);

    if (era.get(`exp:${target}:0`) > 20) {
      await era.print('');
      await era.printAndWait(`「呜……呜啊啊……好痛……蜜穴好痛………呜呜呜」`);
      await era.printAndWait(`${target_name}被侵犯的蜜穴里流出了精液和尿……`);
    }

    if (era.get(`exp:${target}:1`) > 20) {
      await era.print('');
      await era.printAndWait(`「呜……呜呜……屁股……被侵犯得一塌糊涂了……」`);
      await era.printAndWait(
        `${target_name}的肛门被虐待，侵犯得几乎合不上，精液和污物从里面慢慢流出来……`,
      );
    }

    if (era.get(`exp:${target}:22`) > 20) {
      await era.print('');
      await era.printAndWait(
        `「呜……呜啊……嘴巴好酸，下巴好像要脱臼了一样，好难受……呕呕呕呕」`,
      );
      await era.printAndWait(`${target_name}一边哭着将精液呕吐了出来……`);
    }

    if (era.get(`exp:${target}:20`) > 20) {
      await era.print('');
      await era.printAndWait(
        `「唔……呜呜……放，放开我啊……味道好臭……不要啊啊！」`,
      );
      await era.printAndWait(
        `${target_name}的脸被怪物按到了地板上，强迫她舔着地上的精液………`,
      );
    }
  }

  return 0;
}

// @BENKI_KOUJO_K11
async function benki_koujo_k11(rand) {
  const a = era_flag.target;
  void rand;

  if (game.train.肉便器行动 === 0) {
    if (era.get(`talent:${a}:76`) === 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 === 1) {
    if (era.get(`talent:${a}:76`) === 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 === 2) {
    if (era.get(`talent:${a}:76`) === 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 === 3) {
    if (era.get(`talent:${a}:76`) === 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 === 4) {
    if (era.get(`talent:${a}:76`) === 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 === 5) {
    if (era.get(`talent:${a}:76`) === 1) {
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

// @DUNGEON_VICTORY_K11
async function dungeon_victory_k11(rand) {
  const random = rand ?? rand_n;
  const a = era_flag.target;

  if (random(3) === 0) {
    await era.printAndWait(`「哈，这就……胜利了？」`);
  } else if (random(2) === 0) {
    await era.printAndWait(`「原来我也这么能干呢。」`);
  } else {
    await era.printAndWait(`「就这样趁胜进击吧！」`);
  }

  if (
    (era.get(`base:${a}:0`) * 100) / era.get(`maxbase:${a}:0`) < 50 ||
    (era.get(`base:${a}:1`) * 100) / era.get(`maxbase:${a}:1`) < 50
  ) {
    await era.printAndWait(`「伤口有点痛呢……稍微休息一下好了。」`);
  } else {
    await era.printAndWait(`「嘛，这点小伤痛，没什么大不了的！」`);
  }

  return 0;
}

// @DUNGEON_ATTACK_K11
async function dungeon_attack_k11(rand) {
  const random = rand ?? rand_n;
  const target = era_flag.target;

  if (chara(target).invasion.状态 === 2) {
    if (random(3) === 0) {
      await era.printAndWait(`「这边！」`);
    } else if (random(2) === 0) {
      await era.printAndWait(`「那里——！！」`);
    } else {
      await era.printAndWait(`「嘿！」`);
    }
  } else {
    if (random(3) === 0) {
      await era.printAndWait(`「对不起了，勇者大人！」`);
    } else if (random(2) === 0) {
      await era.printAndWait(`「别碍事！」`);
    } else {
      await era.printAndWait(`「得手了！」`);
    }
  }
  return 0;
}

// @COLOSSEUM_KOJO_11
async function colosseum_kojo_11(rand) {
  const target = era_flag.target;
  void rand;

  if (era_flag.selectcom === 55) {
    if (era.get(`base:${target}:1`) <= 0) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    return 0;
  }

  if (era_flag.selectcom === 56) {
    if (era.get(`base:${target}:1`) <= 0) {
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

  if (era_flag.selectcom === 31) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    return 0;
  }

  if (era_flag.selectcom === 5) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    return 0;
  }

  if (era_flag.selectcom === 21) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait('');
    } else if (game.train.死斗场敌种 === 206) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    return 0;
  }

  if (era_flag.selectcom === 27) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait('');
    } else if (game.train.死斗场敌种 === 206) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    return 0;
  }

  if (era_flag.selectcom === 51) {
    await era.printAndWait('');
    return 0;
  }

  return 0;
}

// @NTR_KOUJO_K11

// NTR 再捕获场景：P 是外部事件传入的场景编号（1-7、20）。
async function ntr_koujo_k11(_rand, p = 0) {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const king_has_penis =
    game.system.狂王性别 === 0 || game.system.狂王性别 === 2;

  if (chara(target).kojo.NTR再捕获 === 0) {
    chara(target).kojo.NTR再捕获 = 1; // CFLAG:650
  }

  if (p === 1) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait(`「住，住手啊……我只是附近的村姑啊啊！」`);
      // 原作是一整行：无后缀 PRINTFORM 链，
      // 是互斥插入段（:12610 的 IF），:12615 的 PRINTFORMW 收行（#623）
      await era.printAndWait(
        `双手被抓住的${target_name}拼命挣扎着，但狂王只是哈哈大笑着用` +
          (king_has_penis ? `双腿之间的巨根` : `粗大的假阳具`) +
          `径直插入了${target_name}的处女蜜穴之中。`,
      );
      await era.printAndWait(
        `「啊……啊啊！！一，一点都不痛！完全不痛……呜呜……啊啊啊啊」`,
      );
      await era.printAndWait(
        `${target_name}咬着嘴唇，强忍着破处的痛苦。看着这勇敢的表情，狂王舔着舌头，往${target_name}的处女蜜穴更深处顶入。`,
      );
      await era.printAndWait(`「呜……呜呜……没，没什么大不了——呜啊啊啊！」`);
      await era.printAndWait(
        `${target_name}的双腿之间，纯洁的处女血流了出来。在确认过之后，狂王笑着，动着腰，更用力地侵犯着${target_name}的处女蜜穴。`,
      );
      await era.printAndWait(
        `旁边的水晶球忠实地记录着${target_name}被用各种体位侵犯的全过程……`,
      );
    } else {
      // 与 :12609.. 同型（#623）
      await era.printAndWait(
        `双手被抓住的${target_name}拼命挣扎着，但狂王只是哈哈大笑着用` +
          (king_has_penis ? `双腿之间的巨根` : `粗大的假阳具`) +
          `径直插入了${target_name}的蜜穴之中。`,
      );
      await era.printAndWait(
        `「讨，讨厌啊啊！不，不要动得那么……激烈啊啊啊啊！！」`,
      );
      await era.printAndWait(
        `${target_name}的双腿之间，纯洁的处女血流了出来。在确认过之后，狂王笑着，动着腰，更用力地侵犯着${target_name}的处女蜜穴。`,
      );
      await era.printAndWait(
        `旁边的水晶球忠实地记录着${target_name}被用各种体位侵犯的全过程……`,
      );
    }
    chara(target).kojo.NTR_651 = 1; // CFLAG:651
  } else if (p === 2) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait(
        `「”只有下贱的女人才会有肛门快感”这种事情什么……怎么可能…呜啊……啊啊啊！」`,
      );
      // 与 :12609.. 同型（#623）
      await era.printAndWait(
        `${target_name}被` +
          (king_has_penis ? `狂王的巨根` : `粗大的假阳具`) +
          `撑开肛门，径直插了进去。在狂王的持续侵犯下，${target_name}不住地呻吟了起来。`,
      );
      if (era0(`abl:${target}:3`) >= 3) {
        await era.printAndWait(
          `「嗯啊……啊啊啊${heart(1)} 感觉……好舒服啊啊……${heart(1)}」`,
        );
        await era.printAndWait(
          `旁边的水晶球忠实地记录着${target_name}被用各种体位侵犯着肛门的全过程……`,
        );
        await era.printAndWait(
          `「要，要去了${heart(1)} 要用肛门去了啊啊${heart(1)} 和狂王大人肛交……真是太棒了啊啊啊${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「呜……呜啊啊……不，不可以这样……侵犯……肛门啊……屁股，感觉变得奇怪了啊啊啊…」`,
        );
        await era.printAndWait(
          `旁边的水晶球忠实地记录着${target_name}被用各种体位侵犯着肛门的全过程……`,
        );
      }
    } else {
      await era.printAndWait(
        `「呜……呜啊啊……不，不可以这样……侵犯……肛门啊……屁股，会合不上的啊啊啊！」`,
      );
      // 与 :12609.. 同型（#623）
      await era.printAndWait(
        `${target_name}的肛门被` +
          (king_has_penis ? `狂王的巨根` : `粗大的假阳具`) +
          `撑开了肛门，插了进去。`,
      );
      await era.printAndWait(
        `${target_name}被强行扩张的肛门痛得像要裂开了一样，但狂王只是更加乐在其中，继续侵犯着${target_name}……`,
      );
    }
    chara(target).kojo.NTR_652 = 1; // CFLAG:652
  } else if (p === 3) {
    if (era0(`talent:${target}:136`)) {
      await era.printAndWait(
        `「呜……呜啊${heart(1)} 野狗大人的阴茎……好棒啊${heart(1)} 嗯啊……要，要去了啊啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}在围观人群的视线下，更加沉浸在兽交的变态快乐之中……`,
      );
    } else if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait(
        `「呜……呜啊……太，太激烈了${heart(1)} 好，好像要去了啊啊！」`,
      );
      await era.printAndWait(
        `${target_name}在野狗的侵犯下却有了快感，在周围人群的视线下羞耻得面红耳赤……`,
      );
    } else {
      await era.printAndWait(
        `「放，放开我啊啊，快拔出去，拔出去啊！呜……呜啊……好像……更加膨大了……呜呜呜」`,
      );
      await era.printAndWait(
        `${target_name}当着众人的面被野狗趴在身上侵犯着，屈辱和羞耻让她泪流满面……`,
      );
    }
    chara(target).kojo.NTR_653 = 1; // CFLAG:653
  } else if (p === 4) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait(
        `「哈……哈啊……插到……最里面了……子宫口……啊啊……嗯啊啊${heart(1)}」`,
      );
      // 原作是一整行：两互斥插入段 + PRINTFORMW 收行（#623）
      await era.printAndWait(
        (king_has_penis ? `狂王的巨根` : `粗大的假阳具`) +
          `持续地侵犯着${target_name}的蜜穴，${target_name}感受着交媾的快感，发出了甘甜的娇喘。`,
      );
      if (era0(`abl:${target}:2`) >= 3) {
        await era.printAndWait(
          `「哈啊……啊啊……狂王大人${heart(1)} 更用力地侵犯这淫荡的呃小穴吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被狂王紧紧抱着，激烈地扭动着腰肢抽插着。`,
        );
        await era.printAndWait(
          `两人如同恋人一样接吻，交媾，一次次绝顶高潮的画面也被水晶球忠实地记录了下来………`,
        );
      } else {
        await era.printAndWait(
          `「嗯啊……啊啊……我会……用蜜穴努力侍奉……狂王大人的啊啊……${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被狂王紧紧抱着、感受着与巨根交媾的痛苦和快感，呻吟着。`,
        );
        await era.printAndWait(
          `两人如同恋人一样接吻，交媾，一次次绝顶高潮的画面也被水晶球忠实地记录了下来………`,
        );
      }
    } else {
      await era.printAndWait(`「呜……啊啊！太，太激烈……了，要坏掉了啊啊♪」`);
      // 与 :12683.. 同型（#623）
      await era.printAndWait(
        (king_has_penis ? `狂王的巨根` : `粗大的假阳具`) +
          `持续地侵犯着${target_name}的蜜穴，${target_name}不住地呻吟着。`,
      );
      if (era0(`abl:${target}:2`) >= 3) {
        await era.printAndWait(
          `「嗯啊……啊啊啊……被狂王大人……侵犯得要坏掉了啊啊♪」`,
        );
        await era.printAndWait(
          `${target_name}在狂王的怀抱里一次次绝顶高潮的画面也被水晶球忠实地记录了下来……`,
        );
      } else {
        await era.printAndWait(`「嗯啊……啊啊……狂王大人啊啊啊♪」`);
        await era.printAndWait(
          `${target_name}在狂王的怀抱里一次次绝顶高潮的画面也被水晶球忠实地记录了下来……`,
        );
      }
    }
    chara(target).kojo.NTR_654 = 1; // CFLAG:654
  } else if (p === 5) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait(
        `「哈……哈啊……${heart(1)} 还要${heart(1)} 还想要更多${heart(1)} 嗯啊……啊啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `被男人排着队轮番侵犯着蜜穴，肛门和嘴巴的${target_name}，完全沉浸在乱交的快感之中。`,
      );
      await era.printAndWait(
        `「${target_name}是大家的性奴便器……请尽情地使用${target_name}吧${heart(1)} …肛门也好，蜜穴也好，嘴巴也好…请不用客气${heart(1)}」`,
      );
    } else {
      await era.printAndWait(`「呜……呜啊啊……这样……太激烈了啊♪ 嗯啊……啊啊♪」`);
      await era.print(`${target_name}的蜜穴和肛门`);
      if (king_has_penis) {
        await era.print(`被不同的阴茎持续侵犯着，精液一次次注入又漏出…`);
      } else {
        await era.print(`被假阳具持续地侵犯着，爱液不住地渗出……`);
      }
    }
    chara(target).kojo.NTR_655 = 1; // CFLAG:655
  } else if (p === 6) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait(
        `「${target_name}是下贱的公用肉便器，请大家尽情地使用吧」`,
      );
      await era.printAndWait(
        `${target_name}光着身子趴在地上，对着围观的男人们说道。`,
      );
      await era.printAndWait(
        `「嘴巴小穴也好，蜜穴和肛门也好……所有的地方都请大家——呜啊……这样就插进嘴里……！？唔呣……唔呣……」`,
      );
      await era.printAndWait(
        `第一个男人抓着${target_name}的头发，迫不及待的将阴茎插进了${target_name}的嘴里，开始抽插起来，每次都插到喉咙深处。`,
      );
      await era.printAndWait(
        `${target_name}作为肉便器服侍众人的新一天又开始………`,
      );
    } else {
      await era.printAndWait(
        `「我，我是……下贱的肉便器，请大家……呜呜……这种话……说不出口啊啊！」`,
      );
      await era.printAndWait(
        `${target_name}话还没说完，就被下级兵士按在地上，持续侵犯着蜜穴，肛门和嘴巴……`,
      );
    }
    chara(target).kojo.NTR_656 = 1; // CFLAG:656
  } else if (p === 7) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait(
        `「我会好好侍奉狂王大人的……所以，请不要抛弃我${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}边用身体侍奉着狂王边请求着。`);
      await era.printAndWait(
        `「魔王什么的……根本比不上狂王大人，让我一直呆在你的身边吧…${heart(1)}」`,
      );
      await era.printAndWait(
        `水晶球忠实的记录下了${target_name}的话音和侍奉狂王时发出的甘甜的喘息……`,
      );
    } else {
      await era.printAndWait(
        `「狂王大人……让人家……好好侍奉你吧……什么样的服务都可以的哦…♪」`,
      );
      await era.printAndWait(
        `${target_name}被狂王摸着头，露出了幸福的笑容，撒娇着将手伸向了狂王的胯下。`,
      );
      await era.printAndWait(
        `水晶球忠实的记录下了${target_name}侍奉狂王的样子……`,
      );
    }
    chara(target).kojo.NTR_657 = 1; // CFLAG:657
  } else if (p === 20) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      if (chara(target).event.妊娠相手 === 1) {
        await era.printAndWait(
          `「还，还给我啊……那是我和魔王大人的孩子……啊啊啊……」`,
        );
        await era.printAndWait(
          `${target_name}与${player_name}诞下的孩子被观众们当做玩物一样传递观赏着。`,
        );
        await era.printAndWait(
          `受到这种刺激，大概再也无法以正常的状态回去了………`,
        );
      } else {
        await era.printAndWait(`「要……要在大家面前……公开生孩子了……」`);
        await era.printAndWait(
          `${target_name}的视线通过水晶球，望向${player_name}，边呻吟着说道。`,
        );
        await era.printAndWait(
          `「今后……也会努力为狂王大人生小宝宝的${heart(1)}」`,
        );
      }
    } else {
      await era.printAndWait(`「要……要在大家面前……公开生宝宝了……」`);
      await era.printAndWait(
        `呆呆的${target_name}在狂王的耳语下又继续对着水晶球说着。`,
      );
      await era.printAndWait(
        `「今，今后也会生下更多不同种类的宝宝的……请魔王大人期待吧……」`,
      );
    }
  }

  return 0;
}

/** 处刑/展示类原作仅保留空台词槽；按各自事件编号输出一行空文本。 */
async function exucution_koujo_k11() {
  if ([4, 5, 6, 7].includes(game.event.犬射精或处刑口上)) {
    await era.printAndWait('');
  }
}

async function museum_koujo_k11() {
  if ([0, 1, 2, 3, 4, 5, 6, 7, 8].includes(game.event.博物馆口上)) {
    await era.printAndWait('');
  }
}

async function banishment_koujo_k11() {
  if ([0, 1, 2, 3, 4].includes(game.event.流放口上)) {
    await era.printAndWait('');
  }
}

async function public_exucution_koujo_k11() {
  if ([0, 1, 2].includes(game.event.公开处刑口上)) {
    await era.printAndWait('');
  }
}

async function grotesque_koujo_k11() {
  if ([0, 1, 2, 3, 4, 5, 6].includes(game.event.猎奇处刑口上)) {
    await era.printAndWait('');
  }
}

/** 魔王被俘时，当前攻略角色进入迷宫的专属台词。 */
async function enterenemy_koujo_k11() {
  const a = era_flag.target;
  if (era0(`talent:${a}:76`) === 1) {
    await era.printAndWait(
      `「才不是怀念魔王大人……阴茎的味道，才回到这里来的！」`,
    );
  } else if (era0(`talent:${a}:85`) === 1) {
    await era.printAndWait(
      `「魔王大人，我回来了${heart(1)}　不能让玛奥独占魔王大人啊！」`,
    );
  } else {
    await era.printAndWait(`「我的妹妹玛奥可能就在这个洞穴里！」`);
  }
}

/** 迎击成功后的奖赏请求说明；CFLAG:A:504 由 stronghold 门面承载。 */
async function gohoubi_request_koujo_k11() {
  const a = era_flag.target;
  const name = chara_callname(a);
  const request = chara(a).stronghold.要求奖赏;
  if (request === 0) {
    await era.printAndWait(`${name}要求了金钱`);
  } else if (request >= 1 && request <= 3) {
    // + IF/ELSEIF 的兽名分档（:12916-12922）+ :12923 原作是一整行：
    // 两条无后缀 PRINTFORM 不换行，末行 PRINTFORMW 才收行。兽名提到语句外，
    // 免得它落进模板字面量被保真锁当成插值记号（#600）
    const animal = ['', '狗', '猪', '马'][request];
    await era.printAndWait(`${name}提出了和` + animal + `进行兽交的请求`);
  } else if (request === 4) {
    await era.printAndWait(`${name}要求了归还的吻`);
  } else if (request === 5) {
    await era.printAndWait(`${name}想要和魔王交媾`);
  } else if (request === 6) {
    await era.printAndWait(`${name}想要品尝精液`);
  } else if (request === 7) {
    await era.printAndWait(`${name}想要进行一次乱交`);
  } else if (request === 8) {
    await era.printAndWait(`${name}想要品尝尿液`);
  } else if (request === 9) {
    await era.printAndWait(`${name}想要和童贞的魔族少年交媾`);
  }
}

/** 奖赏结果原作各档均为空台词槽；choice 即源 TFLAG:18。 */
async function gohoubi_after_koujo_k11(_rand, _cid, choice) {
  const request = chara(era_flag.target).stronghold.要求奖赏;
  if (
    choice === 0 ||
    choice === 1 ||
    (choice === 2 && request >= 0 && request <= 9)
  ) {
    await era.printAndWait('');
  }
  return 0;
}

/** 迎击失败惩罚原作各档均为空；6/7 使用 PRINT，其余使用 PRINTFORMW。 */
async function osioki_koujo_k11(_rand, _cid, choice) {
  if (choice === 6 || choice === 7) {
    await era.print('');
  } else if (choice >= 0 && choice <= 9) {
    await era.printAndWait('');
  }
}

// @AEGI_K11（:13090-13468）：索引与原作 SELECTCASE RAND:56 完全同序。
const VAGINAL_MOANS = [
  '更加…请更加激烈的侵犯这里…啊~…',
  '好厉害……好棒……啊啊~…',
  '啊呜~、嗯~…',
  '啊咕~…再来、在激烈一点…',
  '哈呜~！？　啊~…啊嗯、感、感觉太强了…',
  '嘿嗯、啊~、啊~、呀啊~…',
  '啊咕~……嗯、连里面都…',
  '啊嗯……啊啊嗯…',
  '哦咕　咳…哈啊…',
  '唏呀嗯~…啊~…啊啊~…',
  '啊~啊~啊啊啊…饶、饶了我吧…',
  '已、已经~…不能再…啊~…',
  '啊啊~…再来…更加的侵犯这里…',
  '颤抖着…在里面、啊啊~…',
  '再来、再来…啊啊~…',
  '好、好深……嗯嗯、嗯嗯额呜呜呜～～',
  '啊呜、嗯~………～～～！　来、来了…',
  '啊咕呜！　啊~、啊~哈呜～',
  '侵犯里面、请在里面…出来呜呜…',
  '再来…再来…',
  '啊啊…被撑开了呢…',
  '插这么深…好喜欢……爱死了……',
  '更多…更多的…进来',
  '啊哈啊啊……在深一些……',
  '哈呜……啊…啊啊、嗯~…啊嘿~',
  '呜啊~…呼嗯、嗯~…',
  '啊嗯~…哈…哈呜~…',
  '嗯嗯~、好厉害…好厉害呢…',
  '咿呀嗯、啊~…哈啊…再、还要嘛…',
  '啊哈！？…不、这样的不行…',
  '噫、讨~厌~呀啊…',
  '呜呼、啊…啊啊…',
  '嗯嗯~、呼、嗯、啊咕…',
  '这、这样的…啊嗯、啊啊…',
  '啊呜呜、好…好棒…',
  '噫嗯、噫啊啊、哈…噢咕、嗯…',
  '嗯哈啊……嘿、好热…',
  '嗯讨厌……啊呜、呀嗯~',
  '噢啊啊啊……啊、哈啊…',
  '啊嘿……哈嗯…',
  '啊……啊呜、嗯呼…',
  '噫！　…啊啊、要、要坏掉了…',
  '哈啊、哈啊…',
  '嗯~…嗯、好棒…好…',
  '啊啊、好棒呢…',
  '嗯咕呜呜…啊~啊啊…',
  '啊！那么深的地方…',
  '嗯咕呜呜…',
  '啊咕、唏呀啊啊啊…',
  '啊~…咿、咿呀…',
  '不、别进来…',
  '唏、咕唔唔！…',
  '呜…好深………',
  '嗯啊……啊啊啊…',
  '呜啊啊…',
  '嗯啊啊…',
];

const ANAL_MOANS = [
  '更加…请更加激烈的侵犯这里…啊~…',
  '好厉害……好棒……啊啊~…',
  '啊呜~、嗯~…',
  '啊咕~…再来、在激烈一点…',
  '哈呜~！？　啊~…啊嗯、感、感觉太强了…',
  '嘿嗯、啊~、啊~、呀啊~…',
  '啊咕~……嗯、连里面都…',
  '啊嗯……啊啊嗯…',
  '哦咕　咳…哈啊…',
  '唏呀嗯~…啊~…啊啊~…',
  '啊~啊~啊啊啊…饶、饶了我吧…',
  '已、已经~…不能再…啊~…',
  '啊啊~…再来…更加的侵犯这里…',
  '颤抖着…在里面、啊啊~…',
  '再来、再来…啊啊~…',
  '好、好深……嗯嗯、嗯嗯额呜呜呜～～',
  '啊呜、嗯~………～～～！　来、来了…',
  '啊咕呜！　啊~、啊~哈呜～',
  '侵犯里面、请在里面…出来呜呜…',
  '再来…再来……',
  '啊啊…变得这么开了…',
  '已、已经~…不能再…啊~………',
  '更多…更多的…进来…',
  '啊哈啊啊……被撑开了……',
  '哈呜……啊…啊啊、嗯~…啊嘿~',
  '呜啊…阿噗、呜…',
  '啊嗯~…啊…撑开的话…',
  '恩恩额~、好爽…好爽…',
  '不要啦、啊~…啊啊…停、停下…',
  '哈啊！？…那、那边的话…',
  '噫、咿呀啊~…',
  '呜呼、啊…啊啊~…',
  '嗯嗯~、呼、嗯、呜…',
  '这、这种的…啊嗯~、啊啊~…',
  '啊呜呜、好…好棒…',
  '咿哈、咿呀呀呀、啊~…好大、嗯…',
  '嗯哈啊~……唏、啊呜…',
  '嗯呀~……呜、啊嗯',
  '噢啊啊……啊、啊呀~…',
  '啊嘿……嘿嗯…',
  '啊……啊呜~、嗯呼~…',
  '嘿！　…啊啊~、坏、坏掉了~…',
  '哈啊、哈啊…',
  '嗯~…嗯、好爽…哈…',
  '啊啊~、棒极了…',
  '嗯咕呜！？…啊~哈啊啊啊…',
  '啊~！这、这样的…',
  '嗯呜唔…',
  '啊咕~、咿哈~呀哈哈…',
  '啊~…好、好…',
  '不、不行啦…',
  '去了呜呜呜~…',
  '撑、撑大了啊………',
  '啊嗯~…噫、噫嗯~…',
  '啊~咕唔…',
  '嗯、噗呜…',
];

/**
 * 生成阴道/肛门呻吟串。arg=0 时先改为 2，再按 RAND:2 增加一段；其余
 * arg 同样增加 0 或 1 段。未知部位保持原作 SELECTCASE 落空语义。
 */
function aegi_k11(args, arg = 0, rand) {
  const random = rand ?? rand_n;
  const moans =
    args === '膣' ? VAGINAL_MOANS : args === '肛门' ? ANAL_MOANS : null;
  if (!moans) return '';

  const count = (arg === 0 ? 2 : arg) + random(2);
  const fallen =
    era0(`talent:${era_flag.target}:85`) ||
    era0(`talent:${era_flag.target}:76`);
  let result = '';
  for (let i = 0; i < count; i += 1) {
    result += moans[random(56)];
    if (i < count - 1) {
      if (random(2) === 1) result += '…';
      if (fallen) {
        const vaginal = [
          '',
          '♪　',
          '♪　',
          '！',
          '！　',
          '、',
          '、',
          `${heart(1)}　`,
        ];
        const anal = [
          '',
          '♪　',
          '♪　',
          '！　',
          '！　',
          '、',
          '、',
          `${heart(1)}　`,
        ];
        result += (args === '膣' ? vaginal : anal)[random(7) + 1];
      } else {
        result += ['！！　', '！！　', '！　', '！　', '、', '、', ''][
          random(7)
        ];
      }
    } else if (fallen) {
      result += ['♪', heart(1), '！'][random(3)];
    } else {
      result += ['！！', '！'][random(2)];
    }
  }
  return result; // RETURNF LOCALS
}

kojo_message_com_family.register(11, kojo_message_com_11);
kojo_message_palamcng_family.register(11, kojo_message_palamcng_11);
kojo_message_markcng_family.register(11, kojo_message_markcng_11);
self_kojo_family.register(11, self_kojo_k11);
ryouzyoku_kojo_family.register(11, dungeon_ryouzyoku_k11);
ryouzyoku_after_kojo_family.register(11, dungeon_ryouzyoku_after_k11);
benki_koujo_family.register(11, benki_koujo_k11);
dungeon_victory_family.register(11, dungeon_victory_k11);
dungeon_attack_family.register(11, dungeon_attack_k11);
ntr_koujo_family.register(11, ntr_koujo_k11);
exucution_koujo_family.register(11, exucution_koujo_k11);
museum_koujo_family.register(11, museum_koujo_k11);
banishment_koujo_family.register(11, banishment_koujo_k11);
public_exucution_koujo_family.register(11, public_exucution_koujo_k11);
grotesque_koujo_family.register(11, grotesque_koujo_k11);
enterenemy_koujo_family.register(11, enterenemy_koujo_k11);
gohoubi_request_koujo_family.register(11, () => gohoubi_request_koujo_k11());
gohoubi_after_koujo_family.register(11, (cid, choice) =>
  gohoubi_after_koujo_k11(undefined, cid, choice),
);
osioski_koujo_family.register(11, (cid, choice) =>
  osioki_koujo_k11(undefined, cid, choice),
);

module.exports = {
  aegi_k11,
  colosseum_kojo_11,
  dungeon_attack_k11,
  dungeon_ryouzyoku_after_k11,
  dungeon_ryouzyoku_k11,
  dungeon_victory_k11,
  enterenemy_koujo_k11,
  gohoubi_after_koujo_k11,
  gohoubi_request_koujo_k11,
  k11_kojo2,
  kojo_message_com_11,
  kojo_message_markcng_11,
  kojo_message_palamcng_11,
  ntr_koujo_k11,
  osioki_koujo_k11,
  self_kojo_k11,
};
