/* eslint-disable no-irregular-whitespace */
/**
 * @file 村娘口上 K11 莉莉：存在标志一对 + @EVENTTRAIN 主体 + @K11_KOJO2 +
 *       @EVENTEND + @KOJO_MESSAGE_COM_11 前段（SELECTCOM 0/1/2/3/5/6/7/8/9/10/
 *       11，issue #242，WIP 续轮，进行中）。
 *
 * 源: target/ERB/口上/EVENT_K11_リリィ.ERB  @EVENTTRAIN #PRI（:100-105，存在
 *     标志 FLAG:111 = 1）@EVENTEND #LATER（:106-113，清标志）
 *     @EVENTTRAIN（:114-514，调教开始口上：姉妹相认/寻妹对峙 CFLAG:201 +
 *     魔族化 CFLAG:400 + NTR 再捕获 CFLAG:650 + 屈服刻印 Lv1-3 + 淫乱/爱慕
 *     （各含魔族化分支）+ 崩坏 + 简易助手口上 CFLAG:202）
 *     @K11_KOJO2（:515-650，调教开始口上二回目以降）
 *     @EVENTEND（:651-748，普通档，调教结束口上）
 *     @KOJO_MESSAGE_COM_11（:749-10657，指令口上主体，本轮落地头部 7 项守卫
 *     :754-778 与 SELECTCOM 0/1/2/3/5/6/7/8/9/10/11 十一支 :786-1987——爱抚/
 *     舔阴/肛门爱抚/自慰/胸爱抚/接吻/自己扒开/指挿入/舔肛/振动宝石/壶虫，
 *     各含初めて/二回目以降、助手玛奥/非助手玛奥、素质与刻印分档，
 *     SELECTCOM 6 另含首吻专属分支 TFLAG:13，SELECTCOM 7 另含处女/非处女
 *     文案分岔 TALENT:0，SELECTCOM 11 另含 TEQUIP:11 装备/脱着两态（脱着时
 *     用独立 CFLAG:372 计数，且初めて阶段自身再按处女/非处女分岔文案）
 *
 * 门面迁移（issue #242 复核补做）：WIP 1/N 范围内 CFLAG:21/201/202/400/650
 * 原 cflag 字面量模板串寻址（共 50 处）已全部改走
 * `chara(target).kojo.<字段>`（肉亲_0/初调教/简易助手_0/魔族化_K11/
 * NTR再捕获，均已在 tools/facade-names.js 登记），本文件因此并入
 * test/gen-facade.test.js 的口上严格检查清单（同 K3/K9/K10 先例）。
 *
 * 本票剩余工作（未落地，占全文 13468 行的约 85.2%）：@KOJO_MESSAGE_COM_11 的
 * SELECTCOM 12 起（源文件第 1992 至 10657 行，约 42 条剩余分支，见源文件
 * 内存根已占位）、@DOG_KOJO_11（第 10658 至 11462 行，兽奸，存根已占位）、
 * @KOJO_MESSAGE_PALAMCNG_11（第 11463 至 11793 行）、
 * @KOJO_MESSAGE_MARKCNG_11（第 11794 至 11880 行）、@SELF_KOJO_K11（第
 * 11881 至 12261 行），以及死斗场/NTR/处刑/展览/放逐/奖赏/惩罚等非调教
 * 口上（第 12262 至 13468 行）。见 issue #242 的进度评论获取认领点。
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
 * trace-refs/kojo-k11-lily.mjs 的 925 条锚里，SELECTCOM 0/1/2/3/5 沿用整段
 * 字面量拼接的旧生成法；SELECTCOM 6/7/8/9/10/11（本轮新增六支）起改用
 * K10（#241）的逐行独立锚定法——区间内每条非空白源码行各自包一层
 * `^\s*...\s*$`（大区间只取开头 8 行），真正多行、鉴别力更强，两种生成法
 * 在文件内并存，旧锚未随本轮重新生成（避免无关格式化改动）。全部锚对每
 * 条锚在源全文里做精确子串计数：845 条恰好命中 1 行/1 段，可视为具备真实
 * 鉴别力。余下
 * 80 条命中 >1 处，且经验证无法在不破坏 text-fidelity 逐句绑定
 * （find_printform 要求 n..m 窗口内首条 PRINTFORM 系行即目标句，向前/
 * 向后扩窗只要越过相邻语句自身的 PRINTFORM 行就会误绑定）的前提下继续
 * 收窄——60 条来自 WIP 1/N 交付范围（存在标志/@EVENTTRAIN/@K11_KOJO2/
 * @EVENTEND，:100-748），落在 CFLAG:400 魔族化分支与 K11_KOJO2 RAND 分档
 * 里逐句复现的对白段落内，按 issue 讨论保持现状、不再动；4 条来自
 * SELECTCOM 0/1/2（:811/818/826/1022，姉妹相认/魔族化前后两套台词在平行
 * 分支里逐字复现）；4 条来自 SELECTCOM 6（:1304/1310/1314/1389，首吻/
 * 二回目以降两层里各一对逐字重复的对白句）；6 条来自 SELECTCOM 7
 * （:1485/1486/1534/1547/1586/1587，处女/非处女子分档与二回目以降两层
 * 里各一对逐字重复的对白句）；4 条来自 SELECTCOM 9（:1709/1713/1748/
 * 1770，初めて层淫乱/爱慕两支、二回目以降助手玛奥/非助手玛奥それ以外
 * 分档里各一对逐字重复的对白句）；2 条来自 SELECTCOM 11（:1927/1932，
 * 助手玛奥二回目以降淫乱/爱慕两支共用同一句反问台词）。SELECTCOM
 * 3/5/6/7/8/9/10/11 内非 print 语句
 * 自身收尾行的锚（守卫 SIF/RETURN、CFLAG 计数器赋值）已仿 K9（#240
 * commit 9716dee）的整改法向外扩窗到唯一邻行——只有 era.print(/
 * era.printAndWait( 语句自己收尾行的 `:N` 锚绝不参与扩窗（kojo-text-
 * fidelity 靠它做逐语句字面量绑定，扩窗会误绑邻行台词）。这 78 条即便
 * 行号漂移，落点也只会落到另一处内容完全相同的复现段落，不会静默通过
 * 成不相关文本——风险画像与结构性关键字锚（如裸 `RETURN 0`）不同，后者
 * 才是真正的零鉴别力。
 */

'use strict';

const era = require('#/era-electron');
const { on, TIER } = require('#/system/event/registry');
const era_flag = require('#/era-utils/era-flag');
const { PALAMLV } = require('#/era-utils/palam-level');
const { kojo_message_com_family } = require('#/kojo/kojo-system');
const { heart } = require('#/kojo/kojo-text');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { chara_callname } = require('#/utils/callname-utils');
const { stub_line } = require('#/utils/stub-line');

/** 读未声明的序号返回 undefined 而非 0（#13），口上条件一律 || 0 兜底 */
const era0 = (k) => era.get(k) || 0;
/** RAND:N 的默认随机源（本文件的 on() 事件处理器不经分发注入 rand） */
const rand_n = (n) => Math.floor(Math.random() * n);
/** MASTER 恒为角色 0（K1 kojo-k1-confident.js 同款先例） */
const MASTER = 0;

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。
 */
const STUBBED_CALLS = ['DOG_KOJO_11', 'COLOSSEUM_KOJO_11'];

// @EVENTTRAIN #PRI（:100-105）：存在标志 + 总开关补 0（同 EVENT_K.ERB 语义）
on(
  'EVENTTRAIN',
  () => {
    game.kojo.口上存在_11 = 1; // :102 FLAG:111 = 1（K11 口上存在标志）
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
    game.kojo.口上存在_11 = 0; // :108 FLAG:111 = 0
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
        await era.print(`『姐姐？你怎么会在这里？』`); // :141
        await era.printAndWait(
          `「${assi_name}！终于…终于找到你了！我们一起回村子里去吧！」`,
        ); // :142
        await era.printAndWait(
          `眼前这个叫${target_name}的年轻女性，自称是${assi_name}的姐姐`,
        ); // :143
        await era.printAndWait(
          `而${player_name}这才注意到，两人的音容神貌的确有几分相似。`,
        ); // :144
        await era.printAndWait(`还有那顶火红的头发，以及瞳色更是一模一样。`); // :145
        await era.print(`『姐姐……为什么过了这么久才来找我？……我，我已经…』`); // :146
        await era.printAndWait(`${assi_name}挽起了${player_name}的臂弯。`); // :147
        await era.print(
          `『我已经…将自己全身心献给魔王大人了${heart(1)} 村子什么的再也不想回去了${heart(1)}』`,
        ); // :148
        await era.print(
          `「说谎！说谎！你一定是被这个家伙强迫的对吧！快放了${assi_name}，奴隶什么的，让我来代替她！」`,
        ); // :149
        await era.printAndWait(
          `“你要是真的能代替${assi_name}来满足我的话，我倒是可以考虑放过${assi_name}。”听到${player_name}的话，${target_name}缓慢而坚定地点点头。`,
        ); // :150
        await era.print(`「只要放过我妹妹，你要随便怎样对我都好！」`); // :151
        await era.printAndWait(
          `看着姐姐的样子，${assi_name}却不满地翘起了嘴，用谁也听不到的声音嘟囔着。`,
        ); // :152
        await era.printAndWait(`『真是的，姐姐只会做多余的事………』`); // :153
        kojo.简易助手_0 = 1;
      } else {
        // 寻妹对峙（无玛奥或助手非玛奥）
        await era.print(`「我的妹妹呢！把我的妹妹还给我！」`); // :164
        await era.printAndWait(
          `站在面前的这个年轻女性――${target_name}，不顾自己的处境，不由分说地怒斥着${player_name}。`,
        ); // :165
        await era.print(`「是你把她抓到这里的吧！？我的妹妹——玛奥！！」`); // :166
        await era.printAndWait(
          `听这么一说，${player_name}发现这个女人的神情和那个可爱的乡下小姑娘挺相像的。`,
        ); // :167
        await era.printAndWait(`那头火红的头发，还有瞳孔的颜色都一模一样。`); // :168
        await era.printAndWait(
          `面对质问，${player_name}微微点了点头，${target_name}一下子神色激动了起来。`,
        ); // :169
        await era.print(
          `「果然是在这里！求求你，请把她还给我！还给我！她是我的妹妹啊！」`,
        ); // :170
        await era.printAndWait(
          `但她不知道的是，她的妹妹玛奥已经把全身心都献给${player_name}了，更不会愿意离开的。`,
        ); // :171
        await era.printAndWait(
          `但${player_name}还是饶有趣味地思考了一下${target_name}的要求。`,
        ); // :172
        await era.print(
          `「嗯…想要见她？想要让她回去？也不是不可以。但是你愿意代替她做我的性奴隶，接受我的调教吗？」`,
        ); // :173
        await era.printAndWait(
          `听到这样的话，${target_name}愣住了，脸上浮现出矛盾的复杂表情。`,
        ); // :174
        await era.print(
          `“毕竟，为我解开封印的是你的妹妹啊。你作为她的姐姐，我当然也要好好‘感谢’一番才对。”${player_name}俯身在她面前低语着，带着深深的恶意。`,
        ); // :175
        await era.printAndWait(`${target_name}的表情由恐惧变成了绝望。`); // :176
        await era.print(`「骗……骗人……不要啊……不要过来……」」`); // :177
        await era.printAndWait(`那么，是时候为姐妹重聚的最终舞台做准备了。`); // :178
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
      await era.printAndWait(''); // :186-187 PRINTFORMW 空行
      kojo.魔族化_K11 = 2;
      return 1;
    } else if (kojo.初调教 >= 1 && kojo.NTR再捕获 == 1) {
      // NTR 再捕获
      if (era0(`talent:${target}:85`) || era0(`talent:${target}:76`)) {
        era.drawLine();
        await era.printAndWait(''); // :196-198 PRINTFORMW 空行
        kojo.NTR再捕获 = 0;
      } else {
        era.drawLine();
        await era.printAndWait(''); // :201-203 PRINTFORMW 空行
        kojo.NTR再捕获 = 0;
      }
      return 1;
    } else if (kojo.初调教 < 2 && era0(`mark:${target}:2`) == 1) {
      // 屈服刻印Lv1
      era.drawLine();
      await era.printAndWait(`「呼…呼…这样的调教，才，才没有什么……」`); // :214
      await era.printAndWait(
        `在屈辱的调教中，${target_name}闭上了眼睛，似乎还在坚持着反抗的心态………`,
      ); // :215
      kojo.初调教 = 2;
      return 1;
    } else if (kojo.初调教 < 3 && era0(`mark:${target}:2`) == 2) {
      // 屈服刻印Lv2
      era.drawLine();
      await era.printAndWait(`「都是因为救不了妹妹…我才会受到这样的惩罚」`); // :222
      await era.printAndWait(
        `${target_name}伏在床上，埋着脸哭泣着。她的样子反而更让${player_name}露出了愉悦的扭曲笑意。`,
      ); // :223
      await era.printAndWait(
        `从${target_name}为自己接受调教进行辩解开始，就可以开始进行更进一步的内容了………`,
      ); // :224
      kojo.初调教 = 3;
      return 1;
    } else if (
      kojo.初调教 < 4 &&
      era0(`mark:${target}:2`) == 3 &&
      era0(`talent:${target}:85`) == 0
    ) {
      // 屈服刻印Lv3
      era.drawLine();
      await era.printAndWait(`「不，不要啊！不要用你的脏手碰我……啊啊」`); // :231
      await era.printAndWait(
        `尽管${target_name}语气还无比强硬、${player_name}继续爱抚着她的身体。`,
      ); // :232
      await era.printAndWait(
        `而${player_name}的身体也自己一点点放松了，诚实地接受并享受着爱抚。`,
      ); // :233
      await era.printAndWait(
        `「杀了你！总有一天…一定要杀了你！呜呜……啊嗯……啊啊……」`,
      ); // :234
      await era.printAndWait(
        `${player_name}愉快的听着${target_name}的威胁逐渐变成了略带享受的喘息。还有更多的可以期待。`,
      ); // :235
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
      ); // :241-242
      await era.printAndWait(
        `虽然这么说着，但${target_name}的身体却在${player_name}的粗暴爱抚下一扭一扭地享受着。`,
      ); // :243
      await era.printAndWait(
        `「啊呀、不要啦、这样摸到底有，有什么好的…嗯啊啊！」`,
      ); // :244
      await era.printAndWait(
        `${target_name}不自觉地张开了双腿，把私处展露在${player_name}前面，蜜穴已经被爱液湿透。`,
      ); // :245-245
      await era.printAndWait(
        `曾经纯洁的乡下少女，已经在不知不觉间变得如同娼馆里的妓女一样淫荡而不知羞耻了。`,
      ); // :246-247
      if (era0(`talent:${target}:0`) == 1) {
        await era.printAndWait(
          `「啊啊…要是敢侵犯我的处女身的话，绝对不会原谅你的哦${heart(1)}」`,
        ); // :247-248
        await era.printAndWait(
          `${target_name}舔着舌头说道，望着${player_name}的眼睛却露出了期待的光芒………`,
        ); // :249
      } else {
        await era.printAndWait(
          `「看，都，都湿了，就说了不行嘛…要是还敢继续侵犯这里的话，绝对不会原谅你的哦${heart(1)}」`,
        ); // :250-251
        await era.printAndWait(`${target_name}的双眼却露出了期待的光芒………`); // :252
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
        ); // :260-261
        await era.printAndWait(
          `虽然这么说着，但${target_name}的身体却在${player_name}的粗暴爱抚下一扭一扭地享受着。`,
        ); // :262
        await era.printAndWait(
          `「啊呀、不要啦、这样摸到底有，有什么好的…嗯啊啊！」`,
        ); // :263
        await era.printAndWait(
          `${target_name}不自觉地张开了双腿，把已经被爱液湿透的私处展露在${player_name}前面。`,
        ); // :264
        await era.printAndWait(
          `曾经纯洁的乡下少女，已经在你的调教下变得如同娼馆里的妓女一样淫荡而不知羞耻了。`,
        ); // :265
        if (era0(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「啊啊…要是敢侵犯我的处女身的话，绝对不会原谅你的哦${heart(1)}」`,
          ); // :267
          await era.printAndWait(
            `${target_name}舔着舌头说道，望着${player_name}却露出了期待的光芒………`,
          ); // :268
        } else {
          await era.printAndWait(
            `「你看……都，都湿透了，就说了不行嘛…要是还敢继续侵犯这里的话，绝对不会原谅你的哦${heart(1)}」`,
          ); // :270
          await era.printAndWait(`${target_name}的双眼却露出了期待的光芒…`); // :271-275
        }
        kojo.初调教 = 6;
        return 1;
      } else if (kojo.魔族化_K11 == 2) {
        await era.printAndWait(
          `「啊哈…嗯啊……别，别再摸我了、真是一点都不想见到你的脸…嗯…啊啊…哈啊…」`,
        ); // :276-277
        await era.printAndWait(
          `虽然这么说着，但${target_name}的身体却在${player_name}的粗暴爱抚下一扭一扭地享受着。`,
        ); // :278
        await era.printAndWait(
          `「啊呀、不要啦、这样摸到底有，有什么好的…嗯啊啊！」`,
        ); // :279
        await era.printAndWait(
          `${target_name}不自觉地张开了双腿，把私处展露在${player_name}前面，蜜穴已经被爱液湿透。`,
        ); // :280-280
        await era.printAndWait(
          `曾经纯洁的乡下少女，已经在不知不觉间变得如同娼馆里的妓女一样淫荡而不知羞耻了。`,
        ); // :281-281
        if (era0(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「啊啊…要是敢侵犯我的处女身的话，绝对不会原谅你的哦${heart(1)}」`,
          ); // :283
          await era.printAndWait(
            `${target_name}舔着舌头说道，望着${player_name}却露出了期待的光芒………`,
          ); // :284
        } else {
          await era.printAndWait(
            `「看，都，都湿了，就说了不行嘛…要是还敢继续侵犯这里的话，绝对不会原谅你的哦${heart(1)}」`,
          ); // :286-286
          await era.printAndWait(`${target_name}的双眼却露出了期待的光芒…`); // :287-291
        }
        kojo.初调教 = 6;
        return 1;
      } else {
        await era.printAndWait(''); // :289-293 PRINTFORMW 空行（陥落后に魔族）
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
      ); // :299-300
      await era.printAndWait(
        `「那个、那个…比起玛奥，也请，多疼爱一下我吧…只，只是不想让她负担太重，不是别的！」`,
      ); // :301
      await era.printAndWait(
        `说罢抓着${player_name}的手按在了自己丰满的胸部上。`,
      ); // :302
      await era.printAndWait(
        `「你看……比起那个孩子寒酸的小身板，我的身材好得多吧？」`,
      ); // :303
      await era.printAndWait(
        `面对这个献媚的身姿，${player_name}嘴角裂出扭曲的笑意。`,
      ); // :304
      await era.printAndWait(`「有…有什么好笑的嘛？」`); // :305
      if (era0(`talent:${target}:0`) == 1) {
        await era.printAndWait(
          `「我还是处女的说…不过只要能取悦你，做什么都可以哦…真的…${heart(1)}」`,
        ); // :307
        await era.printAndWait(
          `${target_name}已经完全沦为${player_name}爱的奴隶了、比起妹妹，更想要和${player_name}在一起……`,
        ); // :308
      } else {
        await era.printAndWait(
          `「总之……请像以前那样疼爱我吧…调教我…侵犯我吧…拜托了${heart(1)}」`,
        ); // :310
        await era.printAndWait(
          `边这样怜求着，${target_name}脸像被红霞染过了一般、声音也显得燥热难耐。`,
        ); // :311
        await era.printAndWait(
          `${target_name}已经完全沦为${player_name}爱的奴隶了、比起妹妹，更想要和${player_name}在一起……`,
        ); // :312-313
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
        ); // :320-321
        await era.printAndWait(
          `「那个、那个…比起妹妹，也请，多疼爱一下我吧…只，只是不想让她负担太重，不是别的！」`,
        ); // :322
        await era.printAndWait(
          `说罢抓着${player_name}的手按在了自己丰满的胸部上。`,
        ); // :323
        await era.printAndWait(
          `「你看……比起那个孩子寒酸的小身板，我的身材好得多吧？」`,
        ); // :324
        await era.printAndWait(
          `面对这个献媚的身姿，${player_name}嘴角裂出扭曲的笑意。`,
        ); // :325
        await era.printAndWait(`「有…有什么好笑的嘛？」`); // :326
        if (era0(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「我还是处女的说…不过只要能取悦你，做什么都可以哦…真的…${heart(1)}」`,
          ); // :328
          await era.printAndWait(
            `${target_name}已经完全沦为${player_name}爱的奴隶了、比起妹妹，更想要和${player_name}在一起……`,
          ); // :329
        } else {
          await era.printAndWait(
            `「总之……请像以前那样疼爱我吧…调教我…侵犯我吧…拜托了${heart(1)}」`,
          ); // :331
          await era.printAndWait(
            `边这样怜求着，${target_name}脸像被红霞染过了一般、声音也显得燥热难耐。`,
          ); // :332
          await era.printAndWait(
            `${target_name}已经完全沦为${player_name}爱的奴隶了、比起妹妹，更想要和${player_name}在一起……`,
          ); // :333-337
        }
        kojo.初调教 = 8;
        return 1;
      } else if (kojo.魔族化_K11 == 2) {
        await era.printAndWait(
          `${target_name}靠在${player_name}的身边，轻轻地耳语着。`,
        ); // :338-339
        await era.printAndWait(
          `「那个、那个…比起妹妹，也请，多疼爱一下我吧…只，只是不想让她负担太重，不是别的！」`,
        ); // :340
        await era.printAndWait(
          `说罢抓着${player_name}的手按在了自己丰满的胸部上。`,
        ); // :341
        await era.printAndWait(
          `「你看……比起那个孩子寒酸的小身板，我的身材好得多吧？」`,
        ); // :342
        await era.printAndWait(
          `面对这个献媚的身姿，${player_name}嘴角裂出扭曲的笑意。`,
        ); // :343
        await era.printAndWait(`「有…有什么好笑的嘛？」`); // :344
        if (era0(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「我还是处女的说…不过只要能取悦你，做什么都可以哦…真的…${heart(1)}」`,
          ); // :346
          await era.printAndWait(
            `${target_name}已经完全沦为${player_name}爱的奴隶了、比起妹妹，更想要和${player_name}在一起……`,
          ); // :347
        } else {
          await era.printAndWait(
            `「总之……请像以前那样疼爱我吧…调教我…侵犯我吧…拜托了${heart(1)}」`,
          ); // :349
          await era.printAndWait(
            `边这样怜求着，${target_name}脸像被红霞染过了一般、声音也显得燥热难耐。`,
          ); // :350
          await era.printAndWait(
            `${target_name}已经完全沦为${player_name}爱的奴隶了、比起妹妹，更想要和${player_name}在一起……`,
          ); // :351-355
        }
        kojo.初调教 = 8;
        return 1;
      } else {
        await era.printAndWait(''); // :353-357 PRINTFORMW 空行（陥落后に魔族）
        kojo.初调教 = 8;
        return 1;
      }
    } else if (era0(`talent:${target}:9`) == 1 && kojo.初调教 < 9) {
      // 崩坏
      era.drawLine();
      await era.printAndWait(`${target_name}的眼睛失去了光彩。`); // :364
      await era.printAndWait(
        `因为过度的调教，看上去精神和身体都崩溃了的样子。`,
      ); // :365
      await era.printAndWait(`「啊哈…呼呼…啊……哈哈……」`); // :366
      kojo.初调教 = 9;
      return 1;
    } else if (era0(`talent:${target}:9`) == 1) {
      // 崩坏后（已崩坏，二回目以降）
      await k11_kojo2(); // :370-371 CALL K11_KOJO2
    } else if (assi < 0) {
      // 无助手
      await k11_kojo2(); // :373-374 CALL K11_KOJO2
    } else if (era0(`talent:${MASTER}:122`) == 0) {
      // 主人非男性时二回目以降（简易助手口上不适用）
      await k11_kojo2(); // :383-384 CALL K11_KOJO2
    } else if (assi == 17) {
      // 简易助手口上（助手是玛奥）：CFLAG:202 三阶
      era.drawLine();
      if (kojo.简易助手_0 == 0) {
        // 初めて
        if (era0(`talent:${target}:85`) == 1 && kojo.初调教 >= 5) {
          // 已持爱慕，爱慕取得时初口上（陷落事件）已发生过
          await era.printAndWait(
            `「玛…玛奥！你没事，真的是太好了……但，但为什么你穿成这个样子……」`,
          ); // :392
          await era.printAndWait(
            `看到作为魔王的调教助手出现的${assi_name}，${target_name}脸上露出了吃惊的表情`,
          ); // :393
          await era.print(
            `『姐姐？好久不见了呀…话说在前，现在魔王大人才是我心中最重要的人了哦』`,
          ); // :394
          await era.printAndWait(
            `边这么说着，${assi_name}在${target_name}面前抱住了${player_name}，好像在炫耀一般。`,
          ); // :395
          await era.printAndWait(`「${assi_name}，你，你在做什么！？」`); // :396
          if (era0(`talent:${target}:0`) == 1) {
            await era.print(`『唉？姐姐还没有把处女献给魔王大人？真是不懂。』`); // :398
            await era.printAndWait(
              `「真，真是的…说什么呢！我，我平时只是和魔王大人拥抱而已！」`,
            ); // :399
            await era.printAndWait(
              `${target_name}注意到${player_name}笑了起来，羞得整张脸都红了。`,
            ); // :400
            await era.printAndWait(
              `『总之，今天我会和魔王大人一起好好疼爱，调教你的，姐姐你做好心理准备了吗${heart(1)}』`,
            ); // :401
          } else {
            await era.print(
              `『魔王大人啊${heart(1)} 每天都会疼爱我，所以我们这样抱着，一点都不奇怪吧♪』`,
            ); // :403
            await era.printAndWait(
              `「说，说的是什么话啊！那个人，那个人可是邪恶的魔王啊！所以，你快离开，离开！」`,
            ); // :404
            await era.printAndWait(
              `『啊哈，姐姐其实也是想得到魔王的拥抱吗？为什么不坦率地说出来呢？』`,
            ); // :405
            await era.printAndWait(
              `「那，那种话说不出来的…呜呜呜…我，我想要魔王大人的拥抱，疼爱和调教………」`,
            ); // :406
            await era.printAndWait(
              `看着${target_name}话语自相矛盾，羞得满脸通红的样子、${player_name}和${assi_name}脸上浮现出了笑容………`,
            ); // :407
          }
          kojo.简易助手_0 = 2;
        } else if (era0(`talent:${target}:76`) == 1 && kojo.初调教 >= 5) {
          // 已持淫乱，淫乱取得时初口上（陷落事件）已发生过
          await era.printAndWait(`「玛…玛奥！我们终于见面了…${heart(1)}」`); // :412
          await era.printAndWait(
            `看到${target_name}已经一派淫靡的样子，${assi_name}却觉得有点扫兴。`,
          ); // :413
          await era.print(`『哼，感觉姐姐完全变了一个人呢。』`); // :414
          if (era0(`talent:${target}:0`) == 1) {
            await era.printAndWait(
              `「呐…让我们一起在这里开始新生活吧……作为魔王大人的宠物？」`,
            ); // :416
            await era.print(
              `『姐姐这是什么话，可早在你被抓到之前，我就已经是魔王大人的东西了哦。』`,
            ); // :417
            await era.printAndWait(
              `${assi_name}把手伸到${target_name}的双腿之间，开始抚弄姐姐的下体。`,
            ); // :418
            await era.printAndWait(`「真，真是的！」`); // :419
            await era.print(
              `『姐姐先把这里献给魔王大人，再和我一起当魔王大人的性奴宠物吧${heart(1)}』`,
            ); // :420
            await era.printAndWait(
              `「啊…嗯啊…啊啊…愿意…我愿意把这里献给魔王大人！」`,
            ); // :421
            await era.printAndWait(
              `${assi_name}一边坏笑着一边继续用手责备着${target_name}的下体，而${target_name}对这个淫乱的提议表示完全赞成………`,
            ); // :422
          } else {
            await era.printAndWait(
              `「是啊、姐姐已经在魔王的疼爱中获得了新生…${heart(1)}」`,
            ); // :424
            await era.print(
              `『哼哼哼、我也是一样啊姐姐，从今天开始让我们一起当魔王大人的爱奴吧』`,
            ); // :425
            await era.printAndWait(
              `「嗯嗯！我们从此就是魔王大人的性奴宠物了呀！」`,
            ); // :426
            await era.printAndWait(
              `对于${assi_name}的提议，${target_name}笑颜满面地答应了………`,
            ); // :427
          }
          kojo.简易助手_0 = 2;
        } else {
          // それ以外（未持爱慕/淫乱，或未曾陷落）
          await era.printAndWait(
            `「玛…玛奥！你没事，真的是太好……为，为什么要用那种眼神看我……而且为什么穿成这个样子？」`,
          ); // :432
          await era.printAndWait(
            `${assi_name}用邪秽的目光，如同猎人看待猎物一样注视着自己的姐姐。`,
          ); // :433
          await era.print(
            `『姐姐，为什么要到这种地方来呢？在村子里好好呆着不行吗…』`,
          ); // :434
          await era.printAndWait(`「你在说什么！我是为了找你才到这里来的…」`); // :435
          if (era0(`talent:${target}:0`) == 1) {
            await era.print(
              `『被抓到了就不能不管哦。这样好了，我决定要把姐姐变成魔王大人和我的宠物。』`,
            ); // :437
          } else {
            await era.print(
              `『结果蠢到在路上就被魔兽侵犯了吗、姐姐真是大笨蛋。』`,
            ); // :439
            await era.printAndWait(`「为，为什么要说这样的话！」`); // :440
            await era.printAndWait(
              `${target_name}泪流满面地蜷成一团，抱着自己的身体。`,
            ); // :441
            await era.print(
              `『不过无所谓，就算姐姐已经不是处女了，我还是决定要把你变成我和魔王大人的宠物。』`,
            ); // :442
          }
          await era.printAndWait(`「宠…宠物…？你在开什么玩笑？」`); // :444
          await era.print(
            `『才不是开玩笑啊！会把姐姐调教成只懂得取悦我的淫穴和魔王大人的肉棒的变态母猪性奴吧${heart(1)}』`,
          ); // :445
          await era.printAndWait(
            `「不，不要啊……撒谎！撒谎！不要再说了……求求你……呜呜呜………」`,
          ); // :446
          await era.printAndWait(
            `看着和过去判若两人的${assi_name}，${target_name}泣不成声………`,
          ); // :447
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
          await era.print(`『咦咦，怎么了姐姐？为什么要用那种眼神看着我？』`); // :456
          await era.printAndWait(`「没什么，什么事都没有，哼。」`); // :457
          await era.printAndWait(
            `${target_name}用嫉妒的目光看着被${player_name}搂在身上的${assi_name}。`,
          ); // :458
          await era.printAndWait(
            `不知道是不是故意的，${assi_name}继续和${player_name}大声聊着今天的调教内容。`,
          ); // :459
          await era.print(
            `『今天的计划是要狠狠地调教，惩罚姐姐的肛门呢，到时候姐姐哭起来的声音一定很好听』`,
          ); // :460
          await era.printAndWait(`「怎，怎样都好，魔王大人可是属于我的呢！」`); // :461
          await era.print(``); // :462 PRINTL 空行
          await era.printAndWait(
            `『哼哼哼、看来姐姐已经完全变成魔王大人的性奴了呢。不如就让魔王同时享用我们姐妹俩吧？』`,
          ); // :463
          await era.printAndWait(
            `看着已经彻底变样了的姐姐，${assi_name}微笑了起来………`,
          ); // :464
          kojo.简易助手_0 = 2;
        } else if (era0(`talent:${target}:76`) == 1) {
          // 淫乱
          await era.print(`『咦，姐姐怎么了？身体看上去很难受的样子呀？』`); // :468
          await era.printAndWait(
            `「快……快让魔王大人侵犯我…调教我吧……拜，拜托了…${heart(1)}」`,
          ); // :469
          await era.print(
            `『哦哦、姐姐终于变成了只想要肉棒的淫乱性奴了呀…这个样子真是可爱呢。』`,
          ); // :470
          await era.printAndWait(
            `${assi_name}和${player_name}窃窃私语了一阵。`,
          ); // :471
          await era.print(
            `『哼哼哼、姐姐，魔王大人这样说了、“你们姐妹俩愿意一起成为我的宠物的话，就赐予你们无上的快乐哦”。哎哎，我也要当宠物？一点问题都没有${heart(1)}』`,
          ); // :472
          await era.printAndWait(
            `${assi_name}红着脸，光着身子四肢着地趴在了${target_name}的身边。`,
          ); // :473
          await era.print(
            `『来吧，姐姐和我一起说，一起做吧。从现在起，我们姐妹俩就是魔王大人的淫乱母狗性奴，愿意一生侍奉魔王大人，请魔王大人用肉棒好好疼爱，调教我们吧，拜托了♪』`,
          ); // :474
          await era.printAndWait(
            `听着${assi_name}流利地在${player_name}面前念出了母狗性奴的誓言，${target_name}同样也趴下来，自豪地宣誓了。`,
          ); // :475
          await era.printAndWait(
            `「${target_name}我愿成为魔王大人的淫乱母狗。和母狗妹妹一起一生侍奉魔王大人、请魔王大人用肉棒奖赏我们吧${heart(1)}」`,
          ); // :476
          await era.printAndWait(
            `就这样，${target_name}和${assi_name}姐妹完全成为${player_name}的性奴宠物了………`,
          ); // :477
          kojo.简易助手_0 = 2;
        }
        return 1;
      } else if (kojo.简易助手_0 >= 2 && era0('flag:7') == 2) {
        // 二回目以降（CFLAG:202 >= 2）
        if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「啊啊…魔王大人…请给我今日的拥抱………${heart(1)}」`,
          ); // :485
          await era.print(`『我，我也要…魔王大人也请一起拥抱我…${heart(1)}』`); // :486
          await era.printAndWait(
            `${assi_name}完全忘记了要调教姐姐的事，一同投入了${player_name}的怀抱中。`,
          ); // :487
          await era.printAndWait(
            `${player_name}苦笑着将姐妹两人同时抱进了怀里、那么今天要怎么“疼爱”她们呢？`,
          ); // :488
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「今天也请尽情地疼爱，调教我们这对性奴母狗姐妹吧…汪♪」`,
          ); // :491
          await era.print(
            `『魔王大人，请尽情地疼爱我们吧…啊、嗯啊啊…${heart(1)}』`,
          ); // :492
          await era.printAndWait(
            `${player_name}把手分别伸到了两人的下体，抚弄着已经淫液满溢的蜜穴。`,
          ); // :493
          await era.printAndWait(
            `如今两人除了和${player_name}交媾之外，已经什么事情都不会去想了………`,
          ); // :494
        }
        return 1;
      } else {
        // それ以外
        await era.print(`『姐姐早点坦率地面对自己的欲望吧……』`); // :499
        await era.printAndWait(`「住、住手啊…离我远点！」`); // :500
        await era.printAndWait(
          `手臂被${assi_name}紧紧抓住、${target_name}回忆起上次被妹妹调教的不堪回首的经历，嚎啕大哭起来。`,
        ); // :501
        await era.print(
          `『哈……花不了多久就会把你调教成随便碰碰哪里都会高潮的母猪啦♪』`,
        ); // :502
        await era.printAndWait(`「不要…不要不要不要啊…神啊，救救我………」`); // :503
        return 1;
      }
    } else {
      // 口上のある助手が居ない場合（助手非玛奥，或无助手专属口上）
      await k11_kojo2(); // :507-508 CALL K11_KOJO2
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
    await era.printAndWait(`「咕嘿……咕嘿嘿嘿………」`); // :515-519
    await era.printAndWait(
      `已经无法期待精神崩溃的${target_name}会有正常的反应了………`,
    ); // :520
    return 1;
  } else if (era0(`mark:${target}:3`) == 3 && era0('flag:7') == 2) {
    // 反発刻印Lv3
    era.drawLine();
    await era.printAndWait(`「尽管来吧，别以为我不知道你想做什么。」`); // :525
    await era.printAndWait(`${target_name}丝毫不掩盖自己的反抗心理………`); // :526
    return 1;
  } else if (era0(`mark:${target}:2`) == 0 && era0('flag:7') == 2) {
    // 屈服刻印Lv0
    era.drawLine();
    await era.printAndWait(`「我不会怕的。」`); // :532
    await era.printAndWait(`${target_name}面无表情，语气冷漠`); // :533
    return 1;
  } else if (era0(`mark:${target}:2`) == 1 && era0('flag:7') == 2) {
    // 屈服刻印Lv1
    era.drawLine();
    await era.printAndWait(
      `「终……终于又来了，这张可憎的脸庞，又要打算对我做什么——放…放手！」`,
    ); // :539
    await era.printAndWait(
      `${target_name}被${player_name}一把抱了起来，无力反抗而不住地啜泣着………`,
    ); // :540
    return 1;
  } else if (era0(`mark:${target}:2`) == 2 && era0('flag:7') == 2) {
    // 屈服刻印Lv2
    era.drawLine();
    await era.printAndWait(`「不要啊…这种事情……真的不行…呜呜呜…」`); // :546
    await era.printAndWait(
      `${target_name}的手腕被${player_name}扭住，似乎已经失去了反抗的力量………`,
    ); // :547
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
        ); // :556
        await era.printAndWait(
          `${target_name}带着急促的呼吸，凝视着${player_name}………`,
        ); // :557
      } else {
        await era.printAndWait(
          `「啊啊、妹妹她在……还在休息吗……那就不需要去打扰她了。调教什么的，让，让我来承受就可以了！」`,
        ); // :559
        await era.printAndWait(
          `${target_name}不知道的是，她所担心的妹妹在与${player_name}分开时一直靠着自慰在宣泄性欲………`,
        ); // :560
      }
    } else {
      if (rand_n(2) == 0) {
        await era.printAndWait(`「呜……呜呜……什么时候，才能让我和妹妹见面！」`); // :564
        await era.printAndWait(
          `虽然内心依旧怀着对${player_name}的厌恶，但是${target_name}还是老老实实地躺在了床上……`,
        ); // :565
      } else {
        await era.printAndWait(
          `「让，让我来当你的对手好了！只要别对我妹妹出手，让我做什么都可以……但，但是别以为我会屈服的！」`,
        ); // :567
        await era.printAndWait(
          `${target_name}口头上还在逞强，却完全不知道自己的妹妹已经完全沦陷在${player_name}的调教下了……`,
        ); // :568
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
        ); // :577-579
        await era.printAndWait(
          `${target_name}冷淡的态度让${player_name}正有些扫兴，但转眼间${target_name}却突然捧起了${player_name}的手，挨个地舔着手指。`,
        ); // :580
        await era.printAndWait(
          `「呣……呣……呣……好了，这样清洁过的话，就可以来碰人家了哦……来吧，魔王大人${heart(1)}」`,
        ); // :581
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「人家今天感觉很累……找别人啦！哎哎？不用这么用力的拉人家的手嘛……」`,
        ); // :583
        await era.printAndWait(
          `${player_name}拉着${target_name}的手臂，将对方强行拖进了自己的怀抱里，在耳边低语着“今天就想要你”。`,
        ); // :584
        await era.printAndWait(
          `「那，那就让我勉为其难代替妹妹来伺候魔王大人吧…${heart(1)}」`,
        ); // :585
      } else {
        await era.printAndWait(
          `「向您请安，魔王大人，今天也请调教我吧${heart(1)}」`,
        ); // :587
        await era.printAndWait(
          `${target_name}三指着地跪坐着向${player_name}行礼。`,
        ); // :588
        await era.printAndWait(
          `「…不过，还请魔王大人不要太粗暴了……太痛的方式也不要……人家还是喜欢舒舒服服的爱爱呢${heart(1)}」`,
        ); // :589-591
      }
    } else {
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「终于想起来要来疼爱人家了吗？不过，才不要被抱过别的女孩子的手碰到呢，哼。」`,
        ); // :592-594
        await era.printAndWait(
          `${target_name}冷淡的态度让${player_name}正有些扫兴，但转眼间${target_name}却突然捧起了${player_name}的手，挨个地舔着手指。`,
        ); // :595
        await era.printAndWait(
          `「呣……呣……呣……好了，这样清洁过的话，就可以来碰人家了哦……来吧，魔王大人${heart(1)}」`,
        ); // :596
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「人家今天感觉很累……找别人啦！哎哎？不用这么用力的拉人家的手嘛……」`,
        ); // :598
        await era.printAndWait(
          `${player_name}拉着${target_name}的手臂，将对方强行拖进了自己的怀抱里，在耳边低语着“今天就想要你”。`,
        ); // :599
        await era.printAndWait(
          `「那，那就让我勉为其难代替妹妹来伺候魔王大人吧…${heart(1)}」`,
        ); // :600
      } else {
        await era.printAndWait(
          `「向您请安，魔王大人，今天也请调教我吧${heart(1)}」`,
        ); // :602
        await era.printAndWait(
          `${target_name}三指着地跪坐着向${player_name}行礼。`,
        ); // :603
        await era.printAndWait(
          `「…不过，还请魔王大人不要太粗暴了……太痛的方式也不要……人家还是喜欢舒舒服服的爱爱呢${heart(1)}」`,
        ); // :604-606
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
        ); // :613-615
        await era.printAndWait(
          `${target_name}偎依在了${player_name}了的怀里，脸颊贴在${player_name}的胸前，一股淡淡的香味传到鼻子里。`,
        ); // :616
        await era.printAndWait(
          `「来之前已经好好的清洁过身体了，用的还是新的肥皂，魔王大人喜欢这个味道吗？」`,
        ); // :617
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「魔王大人最近还……经常调教我的妹妹吗……不行啦，她还只是个孩子啊……无论身体还是心理上都……」`,
        ); // :619
        await era.printAndWait(
          `${target_name}从后面抱住了${player_name}，用甜甜的语调说道。`,
        ); // :620
        await era.printAndWait(
          `「所以，还是让我来就侍奉魔王大人就可以了，怎么样的调教我都能接受的哦${heart(1)}」`,
        ); // :621
      } else {
        await era.printAndWait(
          `「就让我来侍奉魔王大人吧，妹妹就让她好好休息吧${heart(1)}」`,
        ); // :623
        await era.printAndWait(
          `${target_name}握着${player_name}的手，有些出神地说道。`,
        ); // :624
        await era.printAndWait(
          `「啊啊……其，其实只是想从妹妹，还有其他勇者底下独占魔王大人而已啦${heart(1)}」`,
        ); // :625
      }
    } else {
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「嘿嘿，很高兴魔王大人今天选择了我，来吧……尽情地调教人家吧」`,
        ); // :628-630
        await era.printAndWait(
          `${target_name}偎依在了${player_name}了的怀里，脸颊贴在${player_name}的胸前，一股淡淡的香味传到鼻子里。`,
        ); // :631
        await era.printAndWait(
          `「来之前已经好好的清洁过身体了，用的还是新的肥皂，魔王大人喜欢这个味道吗？」`,
        ); // :632
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「魔王大人最近还……经常调教我的妹妹吗……不行啦，她还只是个孩子啊……无论身体还是心理上都……」`,
        ); // :634
        await era.printAndWait(
          `${target_name}从后面抱住了${player_name}，用甜甜的语调说道。`,
        ); // :635
        await era.printAndWait(
          `「所以，还是让我来就侍奉魔王大人就可以了，怎么样的调教我都能接受的哦${heart(1)}」`,
        ); // :636
      } else {
        await era.printAndWait(
          `「在我被魔王大人调教的时候，妹妹就能平安无事了呢……这样的话，就让我一直来做魔王大人的对手好了${heart(1)}」`,
        ); // :638
        await era.printAndWait(
          `${target_name}握着${player_name}的手，神情羞涩地说道。`,
        ); // :639
        await era.printAndWait(
          `「啊啊……我独占你，其实也是为了其他勇者大人们好啊${heart(1)}」`,
        ); // :640
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
      await era.printAndWait(`「咕嘿……咕嘿嘿嘿………」`); // :663-667
      await era.printAndWait(`少女眼中理性的光芒已经不复存在………`); // :668
      return 1;
    } else if (
      era0(`mark:${target}:3`) == 3 &&
      (era0(`talent:${target}:85`) == 0 || era0(`talent:${target}:76`) == 0)
    ) {
      // 反発刻印Lv3+爱慕无
      era.drawLine();
      if (kojo.简易助手_0 >= 1) {
        await era.printAndWait(`「我，我是绝对不会认输的……」`); // :674
        await era.printAndWait(
          `虽然跪在${player_name}的面前，但是${target_name}丝毫不掩盖眼神里的反抗……`,
        ); // :675
      } else {
        await era.printAndWait(
          `「我是为了妹妹才忍受的这种事情的，但别以为我会原谅你！」`,
        ); // :677
        await era.printAndWait(
          `${target_name}边说着，边用目光怒视着${player_name}……`,
        ); // :678
      }
      return 1;
    } else if (
      era0(`mark:${target}:2`) <= 1 &&
      (era0(`talent:${target}:85`) == 0 || era0(`talent:${target}:76`) == 0)
    ) {
      // 屈服刻印Lv1以下+爱慕无
      era.drawLine();
      if (kojo.简易助手_0 >= 1) {
        await era.printAndWait(`「终于结，结束了…」`); // :686
        await era.printAndWait(`${target_name}松了口气，稍微安心了一些。`); // :687
      } else {
        await era.printAndWait(`「什，什么时候让我和妹妹见面…？」`); // :689
        await era.printAndWait(
          `${target_name}满脸疲惫地问着你，但你完全无视了她的问题……`,
        ); // :690
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
        ); // :698
        await era.printAndWait(
          `${target_name}虽然被调教得疲惫不堪，但还是不顾自己的身体恳求着。`,
        ); // :699
        await era.printAndWait(`那副可怜的样子却只让你更加感觉身心愉悦………`); // :700
      } else {
        await era.printAndWait(
          `「还，还要再听话一些……才能让我和妹妹见面吗？」`,
        ); // :702
        await era.printAndWait(
          `${target_name}一脸疲惫地问着你，但你完全无视了她的问题………`,
        ); // :703
      }
      return 1;
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      era0(`talent:${target}:85`) == 0
    ) {
      // 屈服刻印Lv3+爱慕无
      era.drawLine();
      await era.printAndWait(`「下，下次也请继续调教我吧？」`); // :709
      await era.printAndWait(
        `已经完全变得驯服的${target_name}犹豫地挽住了你的手，虽然你承诺等她体力恢复后会再来，但是是否遵守约定则是你的自由。`,
      ); // :710
      await era.printAndWait(`「我会好好休息等着的……」`); // :711
      return 1;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`base:${target}:0`) >= 500
    ) {
      // 淫乱(体力500以上)
      era.drawLine();
      await era.printAndWait(
        `「哎哎，才到这种程度就结束了吗……这就要回去了？」`,
      ); // :716
      await era.printAndWait(`${target_name}有些欲求不满地说道。`); // :717
      await era.printAndWait(`「那，那下次一定……算了，当我没说吧……」`); // :718
      return 1;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`base:${target}:0`) <= 500
    ) {
      // 淫乱(体力500未満)
      era.drawLine();
      await era.printAndWait(`「哈啊……哈啊……一本满足呢${heart(1)}」`); // :723
      await era.printAndWait(
        `${target_name}挽着你的胳膊，露出了心满意足的笑容。`,
      ); // :724
      await era.printAndWait(`「下次……还想要更多的调教哦。」`); // :725
      await era.printAndWait(`少女对欲望的坦率让你对自己的调教成果十分满意。`); // :726
      return 1;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`base:${target}:0`) >= 500
    ) {
      // 爱慕(体力500以上)
      era.drawLine();
      await era.printAndWait(`「是，是对人家的身体厌倦了吗？」`); // :731
      await era.printAndWait(`${target_name}带着不安的表情望着你。`); // :732
      await era.printAndWait(
        `「不过……身为魔王大人的奴隶……被抛弃也不能有任何怨言……」`,
      ); // :733
      return 1;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`base:${target}:0`) <= 500
    ) {
      // 爱慕(体力500未満)
      era.drawLine();
      await era.printAndWait(
        `「哈啊……哈啊……能受到魔王大人的宠幸……太幸福了…${heart(1)}」`,
      ); // :738
      await era.printAndWait(
        `${target_name}一边笑着，一边用充满爱意的动人目光看着你。`,
      ); // :739
      await era.printAndWait(`「现在，魔王大人知道我比我妹妹要更好了吧…？」`); // :740
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
 * （TEQUIP:89）→ 专用口上（DOG_KOJO_11，存根待认领）；死斗场（TEQUIP:55）
 * → 专用口上（COLOSSEUM_KOJO_11，存根待认领）；崩坏（TALENT:9）→ 跳过；
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
 * 「各档再按助手玛奥二分」的对称结构，1:1 保留源作形状）：淫乱+处女→
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
 * 这两条路由到存根，本分支执行时恒为 0（1:1 保留原判断）；普通初めて
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
  const kojo = chara(target).kojo;
  const mark = (i) => era.get(`mark:${target}:${i}`) || 0;
  const assi_mao =
    era_flag.assi > 0 && era_flag.assiplay && era_flag.assi === 17;

  // :755-758 助手マオ以外が調教した時に口上をスキップする
  if (era_flag.assi > 0 && era_flag.assiplay && era_flag.assi !== 17) {
    return 0;
  }
  // :758-759 ボールギャグ着用時には口上をスキップする（SELECTCOM==45 自己说话不算）
  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 45) {
    return 0;
  }
  // :761-763 失神時には口上をスキップする
  if (game.train.失神) {
    return 0;
  }
  // :764-767 獣姦プレイ中は専用口上
  if (era.get(`tequip:${target}:89`)) {
    stub_line('DOG_KOJO_11', '兽奸调教中的专用口上');
    return 0;
  }
  // :769-772 コロシアム中は専用口上
  if (era.get(`tequip:${target}:55`)) {
    stub_line('COLOSSEUM_KOJO_11', '死斗场调教中的专用口上');
    return 0;
  }
  // :774-776 崩坏した場合は口上をスキップする
  if (era.get(`talent:${target}:9`) === 1) {
    return 0;
  }
  // :777-780 触手調教中は口上をスキップする
  if (era.get(`tequip:${target}:90`)) {
    return 0;
  }

  // :786-861 IF SELECTCOM == 0（爱抚 CFLAG:301）
  if (era_flag.selectcom === 0) {
    // :788-803 初めて（CFLAG:301 == 0）
    if (kojo.爱抚 === 0) {
      if (assi_mao) {
        await era.printAndWait(`『姐姐的身材，真好，真漂亮…♪』`); // :791
        await era.printAndWait(`「不行…不行啊…啊啊！」`); // :792
      } else if (mark(2) >= 2) {
        // 屈服刻印Lv2以上
        await era.printAndWait(`「啊啊……再这样摸的话……！」`); // :795
        await era.printAndWait(
          `${target_name}的身体被手指来回抚弄，拼命忍耐着………`,
        ); // :796
      } else {
        // それ以外
        await era.printAndWait(`「又，又来了……真是令人讨厌……！」`); // :799
        await era.printAndWait(`${target_name}充满厌恶地扭动着身体躲避着………`); // :800
      }
      kojo.爱抚 = 1; // :800-802
      return 0;
    }

    // :805-859 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `『姐姐终于坦率地面对自己的欲望了呢，我真为你高兴${heart(1)}』`,
        ); // :810
        await era.printAndWait(
          `${player_name}用手指驾轻就熟地爱抚着${target_name}全身上下。`,
        ); // :811
        await era.printAndWait(
          `「嗯啊啊…因为你的手都摸在敏感点上了…啊啊…继续${heart(1)}」`,
        ); // :812
        await era.printAndWait(`${target_name}在爱抚下身子一扭一扭地享受着。`); // :813
        kojo.爱抚 = 6; // :814
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(`『姐姐、见到魔王大人，心情很愉快吧。』`); // :817
        await era.printAndWait(
          `${player_name}用手指驾轻就熟地爱抚着${target_name}全身上下。`,
        ); // :818
        await era.printAndWait(
          `「啊啊…快，快停手啦，不然姐姐生气了…嗯啊啊…真是的…！」`,
        ); // :819
        await era.printAndWait(
          `${target_name}在爱抚下身子一扭一扭，又是躲避又是享受着。`,
        ); // :820
        await era.printAndWait(
          `『不想被魔王大人看见这副色情的样子吗？明明超级想要被魔王大人疼爱嘛！』`,
        ); // :821
        kojo.爱抚 = 5; // :822
      } else {
        // それ以外（CFLAG:301 不推进——源作原样，助手玛奥臂唯一无写点档）
        await era.printAndWait(`『呀呀，姐姐的身体再放松一点嘛…♪』`); // :825
        await era.printAndWait(
          `${player_name}用手指驾轻就熟地爱抚着${target_name}全身上下。`,
        ); // :826
        await era.printAndWait(
          `「快住手啊……我们是亲姐妹啊…呜呜呜！这样怎么对得起死去的母亲啊！」`,
        ); // :827
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「啊啊嗯…不用这么温柔啦…嗯啊…摸我的时候再……再粗暴一点…${heart(1)}」`,
      ); // :831
      await era.printAndWait(`${target_name}边娇喘着，边淫荡地摇摆着身体。`); // :832
      await era.printAndWait(
        `「啊，啊哈……${heart(1)} 就是这样！啊啊…好…好舒服${heart(1)}」`,
      ); // :833
      kojo.爱抚 = 6; // :833-834
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「啊啊…魔王大人的爱抚……${target_name}好舒服…好幸福…」`,
      ); // :837
      await era.printAndWait(
        `${target_name}温柔地搂住了${player_name}的脖颈，娇喘着享受着爱抚。`,
      ); // :838
      await era.printAndWait(
        `「魔……魔王大人……我爱你……我永远是你的人…${heart(1)}」`,
      ); // :839
      kojo.爱抚 = 5; // :839-840
    } else if (mark(2) === 3 && (kojo.爱抚 <= 3 || game.kojo.口上开关 === 2)) {
      // 屈服刻印Lv3
      await era.printAndWait(`「嗯啊…哈…为什么会这么舒服的……啊啊」`); // :843
      await era.printAndWait(
        `${target_name}腰身扭动着，敏感的身体在${player_name}的爱抚下已经有了感觉。`,
      ); // :844
      await era.printAndWait(`「啊啊，我的…身体……嗯啊啊！」`); // :845
      kojo.爱抚 = 4; // :845-846
    } else if (mark(2) === 2 && (kojo.爱抚 <= 2 || game.kojo.口上开关 === 2)) {
      // 屈服刻印Lv2
      await era.printAndWait(`「哈啊…哈啊……身体好像稍微习惯了……」`); // :849
      await era.printAndWait(`「嗯啊啊…为…为什么会有奇，奇怪的感觉！」`); // :850
      kojo.爱抚 = 3; // :850-851
    } else if (mark(2) <= 1 && (kojo.爱抚 <= 1 || game.kojo.口上开关 === 2)) {
      // それ以外
      await era.printAndWait(`「一，一点舒服的感觉都没有…嗯啊…啊啊！」`); // :854
      if (rand_n(2)) {
        await era.printAndWait(`「别，别碰我…嗯啊啊！」`); // :856
      }
      kojo.爱抚 = 2; // :856-857
    }
    return 0; // :856-859 隐式（原作 RETURN 0）
  }

  // :866-947 IF SELECTCOM == 1（舔阴 CFLAG:302）
  if (era_flag.selectcom === 1) {
    const virgin = era.get(`talent:${target}:0`) === 1;

    // :868-893 初めて（CFLAG:302 == 0）
    if (kojo.舔阴 === 0) {
      if (virgin) {
        if (assi_mao) {
          await era.printAndWait(
            `『啊呀、姐姐的蜜穴真好看…咦，还没有被魔王疼爱过这里吗？』`,
          ); // :873
          await era.printAndWait(`「住手……停下…快停下啊…哈啊…啊啊啊！」`); // :874
          await era.printAndWait(`『不好好回答的话，我就继续舔啦？ 啦啦啦♪』`); // :875
        } else {
          await era.printAndWait(
            `「住手……停下…快停下啊…那里是小便的地方啊！」`,
          ); // :877
          await era.printAndWait(
            `处女的纯洁，甘甜的气味涌入${player_name}的鼻子中，一阵发痒。`,
          ); // :878
          await era.printAndWait(
            `${target_name}羞耻万分，拼命扭动着身体想要躲避。而${player_name}秉承着“性奴的蜜穴必须以最严格的方式调教”的使命感、按着${target_name}的腰，从阴蒂到阴唇的每一处都仔细地舔舐着………`,
          ); // :879-881
        }
      } else if (assi_mao) {
        await era.printAndWait(
          `『啊呀、姐姐的蜜穴真好看…哟哟，好像已经被侵犯过了？』`,
        ); // :885
        await era.printAndWait(
          `「啊啊……快住手啊……那里已经……已经变脏了！不能舔那里啊……！」`,
        ); // :886
      } else {
        await era.printAndWait(
          `「住，住手啊！不要啊！那里……那里是已经被玷污的肮脏地方啊！」`,
        ); // :888
        await era.printAndWait(
          `${target_name}羞耻万分，拼命扭动着身体想要躲避。而${player_name}秉承着“性奴的蜜穴必须以最严格的方式调教”的使命感、按着${target_name}的腰，从阴蒂到阴唇的每一处都仔细地舔舐着………`,
        ); // :889-891
      }
      kojo.舔阴 = 1; // :890-893
      return 0;
    }

    // :895-946 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.舔阴 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `『哎呀，姐姐的蜜穴和豆豆都已经变得好敏感了呢…这么一舔就全湿透了……嘻嘻♪』`,
        ); // :900
        await era.printAndWait(
          `「啊啊……嗯啊……是，是啊，姐姐的小穴已经……这么淫荡了呢……啊啊，就是这里${heart(1)}」`,
        ); // :901
        const lick_line_1 = rand_n(2)
          ? '舔姐姐的这里，我也觉得很舒服哦'
          : '啊哈，姐姐感觉很舒服吧♪';
        await era.printAndWait(`『${lick_line_1}${heart(1)}』`); // :902
        kojo.舔阴 = 5; // :903
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.舔阴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(
          `『哎呀，姐姐的这里，真是美味呢…呼呼…怎么魔王大人的味道也混在里面啊？』`,
        ); // :906
        await era.printAndWait(
          `「嗯啊…哪…哪有这种事……舌头…太深入了…啊啊啊！」`,
        ); // :907
        const lick_line_2 = rand_n(2)
          ? '姐姐的爱液都从蜜穴里流进妹妹嘴里了哦。'
          : '姐姐已经有感觉了呀，很舒服吧♪';
        await era.printAndWait(`『${lick_line_2} 我继续开动了哦♪』`); // :908
        await era.printAndWait(
          `${target_name}在${player_name}的舌尖下，不住地娇喘着………`,
        ); // :909
        kojo.舔阴 = 4; // :910
      } else {
        // それ以外（CFLAG:302 不推进——源作原样，助手玛奥臂唯一无写点档）
        const lick_line_3 = rand_n(2)
          ? '姐姐感觉舒服吗？'
          : '姐姐觉得我舔得舒服吗？♪';
        await era.printAndWait(`『${lick_line_3} 不回答的话我就再深入了哦♪』`); // :913
        await era.printAndWait(`「不，不要啊、快停止…停止啊…嗯啊啊啊！」`); // :914
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.舔阴 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「啊啦啦……魔王大人居然像狗一样舔着我的蜜穴……小母狗${target_name}真是三生有幸啊……嗯啊啊……太舒服了……」`,
      ); // :918
      await era.printAndWait(
        `${target_name}主动岔开了双腿，蜜穴和阴蒂在${player_name}舌头灵巧地舔弄下，已经有了明显的快感。`,
      ); // :919
      await era.printAndWait(
        `「嗯啊啊…再……魔王大人……再深入一点${heart(1)} 啊啊…要，要去了……嗯啊啊${heart(1)}」`,
      ); // :920
      kojo.舔阴 = 5; // :920-921
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.舔阴 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「啊啊…嗯啊啊…不要啦，魔王大人…那，那里好脏的…啊啊啊${heart(1)}」`,
      ); // :924
      await era.printAndWait(
        `虽然这么说着，${target_name}却不自觉地用双手将${player_name}继续按在自己张开的双腿之间。`,
      ); // :925
      await era.printAndWait(
        `「被……被魔王大人舔得……好有感觉，好舒服，啊啊啊${heart(1)}」`,
      ); // :926
      kojo.舔阴 = 4; // :926-927
    } else if (mark(2) === 3 && (kojo.舔阴 <= 2 || game.kojo.口上开关 === 2)) {
      // 屈服刻印Lv3
      await era.printAndWait(`「嗯啊…呜呜…不…不要啊……嗯啊啊」`); // :930
      await era.printAndWait(
        `${target_name}任由${player_name}舔舐着自己的蜜穴和阴蒂，已经完全放弃了抵抗，且似乎已经有了微微的快感。`,
      ); // :931
      await era.printAndWait(
        `只能拼命忍耐着，蜜穴时不时因为快意微微颤动起来………`,
      ); // :932
      kojo.舔阴 = 3; // :933-934
    } else if (
      mark(3) >= 1 &&
      mark(2) <= 2 &&
      (kojo.舔阴 <= 1 || game.kojo.口上开关 === 2)
    ) {
      // 反抗刻印Lv1以上（且屈服刻印Lv2以下）
      await era.printAndWait(
        `「居……居然像狗一样舔着下面……你这个人……一点尊严都不要的吗……嗯啊啊」`,
      ); // :936
      await era.printAndWait(
        `${target_name}拼命扭着身子逃避着，但是双腿却被${player_name}强行分开，脸埋在其中舔舐着蜜穴和阴蒂`,
      ); // :937
      kojo.舔阴 = 2; // :938-939
    } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外（屈服刻印Lv3未満）
      await era.printAndWait(
        `「说，说了那里是尿尿的地方啊！肮脏！不洁！不要舔啊啊啊！」`,
      ); // :941
      await era.printAndWait(
        `${target_name}拼命扭动着身体想要逃避，却被${player_name}紧紧按着分开的双腿，借着唾液的润滑，在蜜穴和阴蒂处来回舔舐着………`,
      ); // :942
      kojo.舔阴 = 2; // :943-949
    }
    return 0; // :943-949 隐式（原作 RETURN 0）
  }

  // :952-1043 IF SELECTCOM == 2（肛门爱抚 CFLAG:303）
  if (era_flag.selectcom === 2) {
    // :954-965 初めて（CFLAG:303 == 0）
    if (kojo.肛门爱抚 === 0) {
      if (assi_mao) {
        await era.printAndWait(
          `『魔王大人特别喜欢调教我们的肛门哦，让妹妹来先帮姐姐的屁股做好准备吧♪』`,
        ); // :957
        await era.printAndWait(`「不，不要啊！那个部位……太脏了啊啊！」`); // :958
        await era.printAndWait(
          `${target_name}的肛门别${player_name}毫不留情地用手指玩弄着，发出了一阵阵悲鸣………`,
        ); // :959-960
      } else {
        await era.printAndWait(
          `「你……你在碰哪里！？不要啊，那种地方不可以的！」`,
        ); // :961
        await era.printAndWait(
          `${target_name}的肛门别${player_name}毫不留情地用手指玩弄着，发出了一阵阵悲鸣………`,
        ); // :962-963
      }
      kojo.肛门爱抚 = 1; // :964 CFLAG:TARGET:303 = 1（TARGET 即 target，二段三段等价）
      return 0;
    }

    // :967-1041 二回目以降
    const p = chara(target).train.润滑 + chara(target).train.润滑增量; // :968 P = PALAM:3 + UP:3
    if (
      era.get(`talent:${target}:76`) === 1 &&
      p >= PALAMLV[2] &&
      (kojo.肛门爱抚 <= 6 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱+润滑Lv2以上
      if (assi_mao) {
        await era.printAndWait(
          `『哇哇，姐姐的肛门已经变得超色情了呢♪　魔王大人你看，姐姐的这里已经是名器了呢${heart(1)}』`,
        ); // :973
        await era.printAndWait(
          `「嗯啊啊…要…要去了……屁股${heart(1)} 继…继续，不要停${heart(1)}」`,
        ); // :974
        await era.printAndWait(
          `『好像已经舒服到听不清我在说什么了。姐姐被玩弄肛门时的表情，一脸幸福啊${heart(1)}』`,
        ); // :975
        await era.printAndWait(
          `${player_name}舔着嘴唇，继续用手指抽插，玩弄着${target_name}的肛门………`,
        ); // :976
      } else {
        await era.printAndWait(
          `「哈啊！啊啊${heart(1)} 好…好舒服，屁股好舒服…${heart(1)}」`,
        ); // :978
        await era.printAndWait(
          `${target_name}流着口水，娇喘着，肛门一张一合地享受着被${player_name}的手指玩弄肛门的连绵快感。`,
        ); // :979
        await era.printAndWait(
          `「嗯啊啊……屁……屁股…光是被手指……就弄得快要去了${heart(1)}」`,
        ); // :980
      }
      kojo.肛门爱抚 = 7; // :982
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      p < PALAMLV[2] &&
      (kojo.肛门爱抚 <= 5 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱+润滑Lv2未満
      if (assi_mao) {
        await era.printAndWait(
          `『姐姐、屁股还没湿透就把手指插进去，感觉是不是很痛呀？』`,
        ); // :986
        await era.printAndWait(
          `「呃啊啊…明明就是故，故意的！就不能稍微温柔一点嘛？」`,
        ); // :987
        await era.printAndWait(
          `『不过姐姐的肛门还是已经感觉到快感了对吧？看，都开始一张一合的了♪』`,
        ); // :988
        await era.printAndWait(
          `${target_name}一边抱怨着，一边却无比享受着${player_name}对肛门的玩弄和连绵的快感………`,
        ); // :989
      } else {
        await era.printAndWait(
          `「真，真是的！屁股都还没湿透就这么把手指插进来……啊别…别停下呀…嗯啊啊啊！」`,
        ); // :991
        await era.printAndWait(
          `${target_name}的肛门很快被爱液浸透，开始因为连绵的快感而一张一合着………`,
        ); // :992
      }
      kojo.肛门爱抚 = 6; // :994
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      p >= PALAMLV[2] &&
      (kojo.肛门爱抚 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕+润滑Lv2以上
      if (assi_mao) {
        await era.printAndWait(
          `『哎呀，姐姐的肛门已经这么敏感地张开了呀…看来已经被魔王大人好好调教，疼爱过了呢…』`,
        ); // :998
        await era.printAndWait(
          `「嗯啊啊…哈啊！因……因为姐姐的肛门，是属于魔王大人的…玩具啊啊${heart(1)}」`,
        ); // :999
        await era.printAndWait(
          `${target_name}不住地娇喘着，感受着被${player_name}玩弄肛门带来的连绵快感。真是一对要好的姐妹呢………`,
        ); // :1000
      } else {
        await era.printAndWait(
          `「嗯啊啊……屁股……好舒服，好快乐${heart(1)}… ${target_name}是魔王大人的肛门性奴……请……请继续调教，侵犯${target_name}的肛门吧，魔王大人！」`,
        ); // :1002
        await era.printAndWait(
          `${target_name}尽情享受着肛门的快感，摇晃着光洁的臀部诱惑着${player_name}………`,
        ); // :1003
      }
      kojo.肛门爱抚 = 5; // :1005
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      p < PALAMLV[2] &&
      (kojo.肛门爱抚 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕+润滑Lv2未満
      if (assi_mao) {
        await era.printAndWait(
          `『嘿嘿嘿…姐姐的肛门已经被魔王大人充分调教过了的样子呢♪』`,
        ); // :1009
        await era.printAndWait(`「等……等等！润滑……还不够…嗯啊…啊啊啊！」`); // :1010
        await era.printAndWait(
          `${player_name}用舌头稍微做了一下润湿，然后又继续开始用手指玩弄，抽插着${target_name}的肛门………`,
        ); // :1011
      } else {
        await era.printAndWait(`「啊啊…魔，魔王大人……请稍微……再温柔一点！」`); // :1013
        await era.printAndWait(
          `${target_name}发出痛苦交杂着喜悦的呻吟，感受着${player_name}对肛门的爱抚………`,
        ); // :1014
      }
      kojo.肛门爱抚 = 4; // :1016
    } else if (
      p >= PALAMLV[2] &&
      chara(target).system.肛门感觉 >= 3 &&
      (kojo.肛门爱抚 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 润滑Lv2以上+A感覚Lv3以上
      if (assi_mao) {
        await era.printAndWait(
          `『哎呀呀、姐姐的肛门，这么摸一下就舒服地张开了，还一扭一扭地吸着妹妹的手指呢。魔王大人快看呀♪』`,
        ); // :1020
        await era.printAndWait(
          `「讨…讨厌啊啊！停手，快停手啊！嗯啊啊…才没有感到…舒服！」`,
        ); // :1021
        await era.printAndWait(
          `${player_name}玩弄着${target_name}已经被充分调教开发的肛门，连绵的快感让${target_name}忍不住开始娇喘……`,
        ); // :1022
        await era.printAndWait(
          `『看起来姐姐很快就可以当上魔王大人的肛门性奴了呢♪』`,
        ); // :1023
      } else {
        await era.printAndWait(
          `「停…停手啊！不…不可以这样…哈啊……嗯啊啊……屁股……为什么这么舒服！」`,
        ); // :1025
        await era.printAndWait(
          `${player_name}玩弄着${target_name}已经被充分调教开发的肛门，连绵的快感让${target_name}忍不住开始娇喘……`,
        ); // :1026-1027
      }
      kojo.肛门爱抚 = 3; // :1028
    } else if (kojo.首次耻情Lv2 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外（爱慕無し、润滑Lv2未満、A感覚Lv3未満；CFLAG:223 首次耻情Lv2）
      if (assi_mao) {
        await era.printAndWait(
          `『还是太紧了呢，不过没关系，我会把姐姐的这里开发成名器的♪』`,
        ); // :1032
        await era.printAndWait(`「住，住手啊、好痛…真的好痛啊啊！」`); // :1033
        await era.printAndWait(
          `${player_name}舔着舌头，坏笑着继续用手指来回抠弄着${target_name}的肛门………`,
        ); // :1034
      } else {
        await era.printAndWait(`「住手！好痛啊…求求你！」`); // :1036
        await era.printAndWait(
          `${target_name}泪流满面地忍耐着${player_name}对肛门的爱抚调教………`,
        ); // :1037
      }
      kojo.肛门爱抚 = 2; // :1039
    }
    return 0; // :1039-1042 隐式（原作 RETURN 0）
  }

  // :1048-1198 IF SELECTCOM == 3（自慰 CFLAG:304）
  if (era_flag.selectcom === 3) {
    if (kojo.自慰 === 0) {
      // :1049-1062 初めて（CFLAG:304 == 0）
      if (assi_mao) {
        await era.printAndWait(
          `『姐姐自慰要更认真一点啊，还要告诉我你以前在家都是想着谁，怎么摸的。我可是每次都听见了的哦。』`,
        ); // :1053
        await era.printAndWait(
          `「不，不要说那样的谎话！才没，没有那种事！呜呜呜……」`,
        ); // :1054
        await era.printAndWait(
          `${target_name}在妹妹的命令下，继续屈辱地自慰着………`,
        ); // :1055
      } else {
        await era.printAndWait(
          `「开，开什么玩笑…为什么要我做……这种事情…呜呜呜…」`,
        ); // :1057
        await era.printAndWait(
          `${target_name}在${player_name}的命令下不得不开始自慰、屈辱的泪水从脸颊纵流而下。`,
        ); // :1058
        await era.printAndWait(`「什么…？还，还要继续？呜呜呜……谁来救救我？」`); // :1059
      }
      kojo.自慰 = 1; // :1061
      return 0; // :1061-1062
    }

    // :1066-1195 二回目以降
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
          ); // :1071
          await era.printAndWait(`「那，那有什么不好的…恩恩啊…哈啊…嗯啊啊…」`); // :1072
          await era.printAndWait(
            `『爱液流了这么多出来，难道正在幻想着被魔王的肉棒狠狠地疼爱吗？』`,
          ); // :1073
          await era.printAndWait(
            `「笨蛋！不要说出来嘛…嗯啊…啊啊啊啊，魔王大人，${target_name}要去了${heart(1)}」`,
          ); // :1074
        } else {
          await era.printAndWait(
            `『姐姐这么激烈地同时自慰前后两边，好厉害啊…』`,
          ); // :1076
          await era.printAndWait(
            `「嗯啊啊…啊啊…在魔王大人和${player_name}的注视下…手淫…比平时…更加有快感啊${heart(1)}」`,
          ); // :1077
          await era.printAndWait(
            `『啊哈、我已经看出来了…姐姐是个喜欢自慰时被人看着的变态啊♪』`,
          ); // :1078
          await era.printAndWait(
            `「是啊…姐姐是变态色情狂…啊啊…嗯啊啊……好好欣赏姐姐被人看着自慰到高潮的样子吧${heart(1)}」`,
          ); // :1079
        }
        kojo.自慰 = 7; // :1081
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.自慰 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        if (era.get(`talent:${target}:0`) === 1) {
          // 处女
          await era.print(
            `『咦，姐姐居然还是处女？难道魔王大人不喜欢姐姐的这里吗？』`,
          ); // :1086
          await era.printAndWait(
            `「哪……哪有那样的事……是魔王大人珍…珍惜姐姐的处女之身…所以才……嗯啊啊」`,
          ); // :1087
          await era.printAndWait(
            `${target_name}岔开双腿，弓着腰，在妹妹的命令下进行着自慰，脸上的表情带着些许屈辱，又不可自拔地沉浸在快感中。`,
          ); // :1088
          await era.print(
            `「我说的没错吧魔王大人…但是…啊恩…什么时候…才能…真正疼爱我呢${heart(1)}」`,
          ); // :1089
          await era.printAndWait(
            `（『魔王大人，真正的原因是什么呢？』）${player_name}悄悄和你耳语着。`,
          ); // :1090
        } else {
          await era.printAndWait(
            `『哎呀呀，姐姐这么热情地自慰着，是希望一会儿能够得到魔王大人的疼爱吗？』`,
          ); // :1092
          await era.printAndWait(`「啊…啊……这不是你…你命令的吗……嗯啊啊！」`); // :1093
          await era.printAndWait(
            `『啊呀，我这一说，你就湿成这样了、爱液都喷到我身上了。你一定是边想着蜜穴被魔王大人狠狠地侵犯边自慰吧。姐姐真的完全变成魔王大人的性奴了呢…』`,
          ); // :1094
          await era.printAndWait(
            `${target_name}被${player_name}的话羞得脸红到了耳根，然而自慰的动作却一刻也没有放缓………`,
          ); // :1095
        }
        kojo.自慰 = 5; // :1097
      } else {
        // それ以外
        await era.print(
          `『哎呀呀，姐姐自慰的样子真下流，看得人家都兴奋起来了啊…♪』`,
        ); // :1100
        await era.printAndWait(`「不要看，不要看啊…太羞耻了…嗯啊……啊啊！」`); // :1101
        await era.print(
          `『姐姐再敢把腿夹起来还说这种话，我就让魔王大人把所有部下都叫过来一起来围观姐姐自慰了哦♪』`,
        ); // :1102
        await era.printAndWait(
          `「不，不要！对不起…对不起…原谅姐姐吧…求求你…！」`,
        ); // :1103
        await era.printAndWait(
          `${target_name}不敢忤逆${player_name}的命令，泪流满面地继续再度张开双腿，在妹妹面前自慰着………`,
        ); // :1104-1105（それ以外无 CFLAG:304 推进，源作原样）
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      era.get(`talent:${target}:0`) === 1 &&
      (kojo.自慰 <= 8 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱＋处女
      await era.printAndWait(
        `「魔王大人为什么还不肯要了我的处子身呢，嫌弃我吗？…要是太过分的话，我会做什么可就不知道了哦？」`,
      ); // :1108
      await era.printAndWait(
        `「嗯啊…哈啊…为什么……嗯呀啊${heart(1)} 总是让我自己玩自己！嗯啊啊啊${heart(1)}」`,
      ); // :1109
      await era.printAndWait(
        `${target_name}故意张开双腿，挑逗似的在${player_name}动作夸张地自慰着………`,
      ); // :1110
      kojo.自慰 = 9; // :1111
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      chara(target).train.自慰中毒 >= 3 &&
      (kojo.自慰 <= 7 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱＋自慰中毒Lv3以上
      if (rand_n(3) === 0) {
        await era.printAndWait(
          `「嗯啊啊${heart(1)} 自慰…真是世界上最棒的事了…啊哈啊…好想…被更多人视奸啊${heart(1)}」`,
        ); // :1116
        await era.printAndWait(
          `已经完全沦为自慰狂的${target_name}在${player_name}面前弓着身子，挺起腰不断忘我地自慰着前后两穴。`,
        ); // :1117
        await era.printAndWait(
          `「啊啊嗯${heart(1)} 淫液要喷出来了…啊啊……嗯啊啊啊${heart(1)}」`,
        ); // :1118
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `「哎呀哎呀…要人家这个姿势来自慰…真，真是变态呢${heart(1)}」`,
        ); // :1120
        await era.printAndWait(
          `${target_name}按着${player_name}的命令后仰着弓起腰身、分开双腿，在${player_name}的注视下开始自慰。`,
        ); // :1121
        await era.printAndWait(
          `「吖吖${heart(1)}…哈啊…啊啊啊…感觉好棒…嗯啊啊…要去了${heart(1)} 嗯啊啊啊${heart(1)}」`,
        ); // :1122
      } else {
        await era.printAndWait(
          `「啊哈啊啊…这么想要看我手淫吗…啊啊${heart(1)} 真是受不了你啊…嗯啊啊…哈啊…啊啊${heart(1)}」`,
        ); // :1124
        await era.printAndWait(
          `${target_name}当着${player_name}面，两只手同时忘我地自慰着蜜穴和肛门。爱液飞洒到了床上，地板上、空气中弥散着淫靡的味道。`,
        ); // :1125
        await era.printAndWait(
          `「现在看的满意了吗…恩恩啊${heart(1)} 啊啊快感更强了${heart(1)} 要去了…舒服得要去了${heart(1)}」`,
        ); // :1126
      }
      kojo.自慰 = 8; // :1128
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      chara(target).train.自慰中毒 < 3 &&
      (kojo.自慰 <= 6 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱＋自慰中毒Lv3未満
      if (rand_n(2) === 0) {
        await era.printAndWait(
          `「真是的……明明知道……自慰什么的根本满足不了我的欲火、还让我做这种……嗯啊啊！」`,
        ); // :1133
        await era.printAndWait(
          `${target_name}露出委屈的表情，在${player_name}的命令下，开始自慰。`,
        ); // :1134
        await era.printAndWait(
          `「啊哈啊…已经…全湿透了${heart(1)} 为什么魔王大人不肯亲自${heart(1)}…真是的…嗯啊啊！」`,
        ); // :1135
      } else {
        await era.printAndWait(
          `「嗯啊啊……就让我把宝贵的高潮这样浪费在自慰中……魔王大人真是残忍呢…嗯啊啊……哈啊${heart(1)}」`,
        ); // :1137
        await era.printAndWait(
          `${target_name}的自慰完全无法满足欲火、却又无可奈何，只能又爱又恨地瞪着${player_name}。`,
        ); // :1138
        await era.printAndWait(
          `「不过话说回来…这样看着你的脸…哈啊…好像更有快感一些…啊恩啊啊${heart(1)}」`,
        ); // :1139
      }
      kojo.自慰 = 7; // :1141-1142
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      era.get(`talent:${target}:0`) === 1 &&
      (kojo.自慰 <= 5 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕＋处女
      await era.printAndWait(
        `「哈啊…哈啊…魔王大人……什么时候才，才会要走我的处子身…啊嗯啊啊${heart(1)}」`,
      ); // :1144
      await era.printAndWait(
        `${target_name}在${player_name}的面前，挑逗地张开双腿，持续自慰着。`,
      ); // :1145
      await era.printAndWait(`（明明人家早就已经准备好了…呜！）`); // :1146
      await era.printAndWait(
        `尽管已经知道了${target_name}的想法、${player_name}还是尽情欣赏，享受着${target_name}的自慰秀………`,
      ); // :1147
      kojo.自慰 = 6; // :1148
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      chara(target).train.自慰中毒 >= 3 &&
      (kojo.自慰 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕＋自慰中毒Lv3以上
      if (rand_n(3) === 0) {
        await era.printAndWait(
          `「嗯啊啊${heart(1)}…哈啊…实在…太害羞了…但是手指…就是停不下来…啊啊啊魔王大人…人家这个姿势可以吗${heart(1)}」`,
        ); // :1153
        await era.printAndWait(
          `${target_name}的口中轻吐着娇喘，一边不住地自慰着………`,
        ); // :1154
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `「${target_name}好…高兴在魔王大人命令下自慰啊${heart(1)} 嗯啊啊…嗯啊…好舒服啊${heart(1)}」`,
        ); // :1156
        await era.printAndWait(
          `${target_name}在${player_name}炽热的目光注视下，忘我地自慰着………`,
        ); // :1157
      } else {
        await era.printAndWait(
          `「嗯啊…嗯啊啊…哈啊${heart(1)} 手指…完全停不下来…不，不许看、不许看…人家要……要去了${heart(1)}」`,
        ); // :1159
        await era.printAndWait(
          `${target_name}沉浸在自慰带来的连绵快感中，连口水都流了出来………`,
        ); // :1160
      }
      kojo.自慰 = 5; // :1162-1163
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      chara(target).train.自慰中毒 < 3 &&
      (kojo.自慰 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕＋自慰中毒Lv3未満
      if (rand_n(2) === 0) {
        await era.printAndWait(
          `「如果是魔王大人的命令的话…！再羞耻的事我也，我也愿意…哈啊…嗯啊啊${heart(1)}」`,
        ); // :1167
        await era.printAndWait(
          `${target_name}脸红耳赤地用手指爱抚着自己得下体、在${player_name}的注视下慢慢展开身体，开始自慰………`,
        ); // :1168
      } else {
        await era.printAndWait(
          `「太，太羞耻了…但如果魔王大人想要看的话…嗯啊…哈啊……嗯啊啊！」`,
        ); // :1170
        await era.printAndWait(
          `${target_name}双眼因为羞耻而微微湿润，在${player_name}的炽热目光下开始了自慰………`,
        ); // :1171
      }
      kojo.自慰 = 4; // :1173
    } else if (
      era.get(`mark:${target}:2`) === 3 &&
      chara(target).train.自慰中毒 >= 1 &&
      (kojo.自慰 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3+自慰中毒Lv1以上
      if (rand_n(2) === 0) {
        await era.printAndWait(
          `「讨厌，不要看啊…不要看我的脸啊…嗯啊…嗯啊啊！」`,
        ); // :1178
        await era.printAndWait(
          `${target_name}屈辱地躲避着${player_name}的视线，自慰着下体的手指却不自觉地动得更激烈了………`,
        ); // :1179
      } else {
        await era.printAndWait(
          `「哈啊…哈啊…可…可以停下来了吗？…啊啊，我知道了，我会继续的，我会继续的！嗯啊 啊」`,
        ); // :1181
        await era.printAndWait(
          `${target_name}屈服于${player_name}的命令，持续进行着自慰，却微微浮现了沉浸期其间的表情………`,
        ); // :1182
      }
      kojo.自慰 = 3; // :1184
    } else if (kojo.自慰 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外（爱慕無し、自慰中毒Lv1未満）
      if (rand_n(2) === 0) {
        await era.printAndWait(`「为什么…要我做这样羞耻的事…嗯啊…哈啊」`); // :1189
      } else {
        await era.printAndWait(`「饶了我吧，求求你了…！」`); // :1191
      }
      await era.printAndWait(
        `${target_name}的脸一直红到了耳根，在极度的羞愧中开始自慰………`,
      ); // :1193
      kojo.自慰 = 2; // :1194
    }
    return 0; // :1194-1196 隐式（原作 RETURN 0）
  }

  // :1203-1278 IF SELECTCOM == 5（胸爱抚 CFLAG:306）
  if (era_flag.selectcom === 5) {
    if (kojo.胸爱抚 === 0) {
      // :1204-1217 初めて（CFLAG:306 == 0）
      if (assi_mao) {
        await era.printAndWait(
          `『哇，姐姐的胸部比以前在村子里的时候更大了呢？』`,
        ); // :1208
        await era.printAndWait(
          `「才，才没有那种事呢！不要揉得那么用力！会痛的啊啊！」`,
        ); // :1209
        await era.printAndWait(
          `『呵呵，手感都不一样了，分明在撒谎！撒谎就要惩罚♪』`,
        ); // :1210
        await era.printAndWait(
          `粉红色的乳头被妹妹用力拧着，${target_name}不住地哀鸣………`,
        ); // :1211
      } else {
        await era.printAndWait(`「啊啊！不要揉得那么用力啊…好痛，好痛！」`); // :1213
        await era.printAndWait(
          `${target_name}哀鸣着想从${player_name}魔掌下逃脱、却被${player_name}紧紧压住，丰满双乳的调教还在继续………`,
        ); // :1214
      }
      kojo.胸爱抚 = 1; // :1214-1216
      return 0; // :1214-1217
    }

    // :1220-1275 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `『姐姐的乳头轻轻摸舔一下就变得这么色情了、啊啊真好，我也想有这样色情的乳头让魔王大人玩弄${heart(1)}』`,
        ); // :1224
        await era.printAndWait(
          `${player_name}边笑着边继续玩弄着姐姐高耸饱满的双峰和因为快感而挺立着的乳头。感受着从乳头传来的连绵的快意，${target_name}从喉咙底发出一阵阵淫乱不堪的声音。。`,
        ); // :1225
        await era.printAndWait(
          `「啊哈…嗯啊啊啊${heart(1)} 姐姐跟你说${heart(1)} 多让魔王大人调教你的胸部，很快妹妹的乳头就会变得和姐姐一样色情了${heart(1)}」`,
        ); // :1226
        await era.printAndWait(
          `『啊哈太好了♪　然后就可以姐妹两人并排挺起色情的胸部，让魔王大人用乳环和链子把我们的乳头穿起来，牵着我们在地上爬${heart(1)}』`,
        ); // :1227
        kojo.胸爱抚 = 5; // :1228
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(
          `『哎呀，姐姐乳房好像经常被魔王大人玩到高潮哟♪　咯咯咯』`,
        ); // :1231
        await era.printAndWait(
          `${player_name}露出坏笑，对着${target_name}挺起的乳头又摸又舔，还含进嘴里吸吮着。`,
        ); // :1232
        await era.printAndWait(
          `「呃啊啊！就…就是这样…姐姐的胸部…是属于魔王大人…性玩具${heart(1)}」`,
        ); // :1233
        await era.printAndWait(
          `『那这次，就由妹妹来让姐姐的乳房高潮吧${heart(1)} 嘻嘻嘻，我继续享用姐姐的乳头了${heart(1)}』`,
        ); // :1234
        await era.printAndWait(
          `「啊啊啊，别…别让…魔王大人看见……姐姐这个样子！拜…托了！嗯啊啊${heart(1)}」`,
        ); // :1235
        kojo.胸爱抚 = 4; // :1236
      } else if (
        chara(target).system.乳房感觉 >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // B感覚Lv3以上
        await era.printAndWait(
          `『哎呀呀，姐姐的胸部变得好厉害，乳头挺得这么直…』`,
        ); // :1239
        await era.printAndWait(
          `${player_name}用手指捏着${target_name}两边的乳头，不断搓柔着，不时含进嘴里吸吮，听着${target_name}因为快感而止不住地娇喘着。`,
        ); // :1240
        await era.printAndWait(
          `「哈啊…嗯啊啊…不要再玩…啊啊…姐姐的乳头了…不然姐姐要…哈啊…要生气了！」`,
        ); // :1241
        await era.printAndWait(
          `『原来姐姐的弱点是乳头哦，再不用害怕姐姐生气了♪』`,
        ); // :1242
        kojo.胸爱抚 = 3; // :1243
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外（爱慕無し、B感覚Lv3未満）
        await era.printAndWait(`『哎呀，姐姐不喜欢被我这样玩弄胸部吗？』`); // :1246
        await era.printAndWait(
          `${target_name}被${player_name}肆意，甚至是恶意地玩弄着双乳和乳头，又无能反抗，只能拼命忍耐着。`,
        ); // :1247
        await era.printAndWait(
          `「被…被你这样玩，一点舒服的感觉……都没有！啊啊啊！」`,
        ); // :1248
        kojo.胸爱抚 = 2; // :1249
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「我的胸部会变得这么色情…哈啊${heart(1)} 都，都是你的责任${heart(1)} 哈啊，嗯啊啊${heart(1)}」`,
      ); // :1253
      await era.printAndWait(
        `${target_name}被彻底开发，调教的双乳被${player_name}捏在手中肆意玩弄着，舌尖和指尖来回拨弄着挺立的乳头。`,
      ); // :1254
      await era.printAndWait(
        `「嗯啊啊…魔王大人${heart(1)} 请再…粗暴一点…欺负我这对淫荡的巨乳和乳头吧${heart(1)}」`,
      ); // :1255
      const moan_word = rand_n(2) ? '继续、继续' : '去了、要去了';
      await era.printAndWait(
        `${target_name}似乎已经被快感弄得完全无法思考了，只是一味地浪叫着，口水不住地从嘴角流出「${moan_word}」………`,
      ); // :1256
      kojo.胸爱抚 = 5; // :1256-1257
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「魔王大人…哈啊…这个样子…真是像爱撒娇的孩子一样！嗯啊啊${heart(1)}」`,
      ); // :1260
      await era.printAndWait(
        `${target_name}抱着正把头埋在自己丰满双峰之间，吸吮着乳头的${player_name}，发出一阵阵幸福的娇喘，`,
      ); // :1261
      await era.printAndWait(
        `「嗯啊啊…嗯啊${heart(1)} 继续…魔王大人…哈啊嗯呃${heart(1)}」`,
      ); // :1262
      kojo.胸爱抚 = 4; // :1262-1263
    } else if (
      chara(target).system.乳房感觉 >= 3 &&
      (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // B感覚Lv3以上
      await era.printAndWait(
        `「嗯啊啊…不，不要这么用力的玩我的…胸部…乳头才不是，不是因为舒服才挺起来的、你，你可不要误会了……嗯呜呜」`,
      ); // :1266
      await era.printAndWait(
        `${target_name}已经被充分调教过的乳房很快就有了快感，只能紧抓着床单，拼命遏制自己的呻吟。`,
      ); // :1267
      await era.printAndWait(`「好，好难为情…呼哈…快…快停下啦…嗯啊啊！」`); // :1268
      kojo.胸爱抚 = 3; // :1268-1269
    } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外（爱慕無し、B感覚Lv3未満）
      await era.printAndWait(`「无论你怎么弄，我，我也不会感觉舒服的…啊呒」`); // :1272
      await era.printAndWait(
        `面对${player_name}对自己乳房的爱抚、${target_name}只是双眼紧闭，咬紧牙关，默默忍受着………`,
      ); // :1273
      kojo.胸爱抚 = 2; // :1273-1274
    }
    return 0; // :1273-1276 隐式（原作 RETURN 0）
  }

  // :1283-1433 IF SELECTCOM == 6（接吻 CFLAG:307）
  if (era_flag.selectcom === 6) {
    // :1285-1328 ファーストキス（CFLAG:307 == 0 && TFLAG:13）
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
        ); // :1288
        await era.printAndWait(
          `${target_name}一脸沉醉的表情，与${player_name}激吻着，舌头互相缠绕，交换、品尝着彼此的唾液。`,
        ); // :1289
        await era.printAndWait(
          `「呣呣…呣…我的初吻${heart(1)} 尝起来味道怎么样啊…${heart(1)}」`,
        ); // :1290
        await era.printAndWait(
          `${target_name}的双瞳里透着情欲的光芒，凝视着${player_name}，又投入新一轮激吻中………`,
        ); // :1291
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        !era_flag.assiplay &&
        chara(target).train.兽奸 === 0 &&
        chara(target).train.触手 === 0
      ) {
        // 爱慕かつ主人
        await era.printAndWait(`「呣呣呣呒…魔王大人？？呣啾啾${heart(1)}」`); // :1294
        await era.printAndWait(
          `${target_name}的初吻被${player_name}夺走时，露出了惊讶的表情，但这惊讶随即变成了惊喜，然后是沉醉。`,
        ); // :1295
        await era.printAndWait(
          `「呣呣…啾啾${heart(1)} 我的初吻属于您了魔王大人…嗯哈…呣呣${heart(1)}」`,
        ); // :1296
        await era.printAndWait(
          `${target_name}带着如梦似幻的陶醉表情，继续品尝着${player_name}的吻………`,
        ); // :1297
      } else if (assi_mao) {
        // それ以外 → 助手玛奥
        if (era.get(`talent:${target}:76`) === 1) {
          // 淫乱
          await era.printAndWait(`『嘿嘿嘿，和姐姐亲亲了${heart(1)}呣呣呣呒』`); // :1304
          await era.printAndWait(`「呣呣呣、接吻舒服吧？这可是我的初吻哦…」`); // :1305
          await era.printAndWait(
            `『是真的吗姐姐，那我可太高兴了♪ 呣呣呣…姐姐的舌头…伸进来了…呣呣呣呒♪』`,
          ); // :1306
          await era.printAndWait(
            `${target_name}和${player_name}无比淫靡的深吻着，边互相爱抚，对两人亲生姐妹的身份没有丝毫顾忌。`,
          ); // :1307
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 爱慕
          await era.printAndWait(`『嘿嘿嘿，和姐姐亲亲了${heart(1)}呣呣呣呒』`); // :1310
          await era.printAndWait(
            `「本来是想把初吻奉献给魔王大人的………（不过${player_name}的话也不是不行）」`,
          ); // :1311
          await era.printAndWait(
            `『啊？姐姐还没和魔王大人……？为什么呢，姐姐？』`,
          ); // :1312
          await era.printAndWait(`「不，没什么。我们继续吧…呣呣呣…呣啾啾♪」`); // :1313
          await era.printAndWait(
            `${target_name}与${player_name}热烈地拥吻着，对两人亲生姐妹的身份没有丝毫顾忌。`,
          ); // :1314
        } else {
          // それ以外
          await era.printAndWait(
            `${player_name}刚刚把自己的嘴唇从${target_name}的唇上挪开，却猛然发现${target_name}正在不住地哭泣着。`,
          ); // :1317
          await era.printAndWait(
            `『啊咧…姐姐为什么在哭呢？难道…那是姐姐的初吻？哎呀呀，初吻给亲妹妹不是更好吗，姐妹相爱最棒了♪』`,
          ); // :1318
          await era.printAndWait(`「这…这种不伦的事情…呜呜呜…」`); // :1319
          await era.printAndWait(
            `${player_name}笑着安慰着她，但${target_name}只是哭得更伤心了………`,
          ); // :1320
        }
      } else {
        // それ以外 → 非助手玛奥
        await era.printAndWait(`「我，我的…初吻…呜呜…呜呜呜…」`); // :1323
        await era.printAndWait(
          `${target_name}正像一个纯洁到不经人事的乡下姑娘一样，为自己失去的初吻而潸然泪下，………`,
        ); // :1324
      }
      kojo.接吻 = 1; // :1324-1327
      return 0; // :1328-1331
    }

    // :1330-1374 （調教では）初めて（CFLAG:307 == 0，非首吻）
    if (kojo.接吻 === 0) {
      if (assi_mao) {
        if (era.get(`talent:${target}:76`) === 1) {
          // 淫乱
          await era.printAndWait(`『最喜欢姐姐了♪』`); // :1335
          await era.printAndWait(
            `「啊啊，我也最喜欢妹妹你了…呣呣呣…啾啾…舌头，再伸进来一些${heart(1)}」`,
          ); // :1336
          await era.printAndWait(
            `${target_name}与${player_name}无比热烈地拥吻着，吸吮着彼此交缠的舌头。像这样的事情，在她们还生活在村子里时，恐怕连想都是不敢想的吧。`,
          ); // :1337
          await era.printAndWait(
            `直到嘴唇依依不舍地分开，流淌在两人的嘴角上的唾液还粘连在一起………`,
          ); // :1338
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 爱慕
          await era.printAndWait(
            `「不，不要啦，${player_name}…这种事…一点都不想做」`,
          ); // :1341
          await era.printAndWait(
            `『就是要，就是要。因为${player_name}我……最喜欢姐姐了♪』`,
          ); // :1342
          await era.printAndWait(
            `”最喜欢姐姐了”这句以前${player_name}经常用来调戏${target_name}的话，在这种别样的场合，却异常的有效。`,
          ); // :1343
          await era.printAndWait(
            `${target_name}眼中的抗拒立即消失得无影无踪，和${player_name}，唇对着唇开始亲吻，彼此舌头伸入对方的嘴中，相互交缠着。`,
          ); // :1344
          await era.printAndWait(`『呣呣呣…啾啾…姐姐，姐姐，最喜欢你了。』`); // :1345
        } else {
          // それ以外
          await era.printAndWait(`「不，不要啊…我们，是姐妹啊…！」`); // :1348
          await era.printAndWait(
            `『姐姐的口里说不要，但是嘴唇可没在反抗哦…呣呣呣…啾啾♪』`,
          ); // :1349
          await era.printAndWait(
            `${target_name}的手被${player_name}紧紧抓住，按在床上。如果是以前的，${target_name}大概轻易就可以挣脱，但如今……`,
          ); // :1350
          await era.printAndWait(
            `但是一心牵挂着${player_name}的${target_name}却没办法逃走，更无力反抗，任由${player_name}摆布着。`,
          ); // :1351
        }
      } else if (era.get(`talent:${target}:76`) === 1) {
        // 淫乱
        await era.printAndWait(
          `「呣呣呣…呣呒…魔王大人嘴里的味道…真好${heart(1)}呣呣呣…」`,
        ); // :1356
        await era.printAndWait(
          `${target_name}带着一脸沉醉的表情与${player_name}激吻着，交缠的舌头分享，品尝着彼此的唾液。`,
        ); // :1357
        await era.printAndWait(
          `「哈啊…呣呒…魔王大人${heart(1)} 再吻得的激烈一点好吗…${heart(1)}」`,
        ); // :1358
        await era.printAndWait(
          `${target_name}注视着${player_name}的双瞳里透着情欲的光芒，抓着${player_name}的手伸向自己的股间………`,
        ); // :1359
      } else if (era.get(`talent:${target}:85`) === 1) {
        // 爱慕
        await era.printAndWait(
          `「唔？！呣呣呒…魔，魔王大人…呣啾啾${heart(1)}」`,
        ); // :1362
        await era.printAndWait(
          `${target_name}被${player_name}吻上的时候，露出了些许惊讶的表情，在反应过来后就立即沉醉于期间，回以更热烈的吻。`,
        ); // :1363
        await era.printAndWait(
          `「呣啾…呣啾${heart(1)} 魔王大人…我的唇…味道好吗${heart(1)}呣呣」`,
        ); // :1364
        await era.printAndWait(
          `${target_name}怀着梦幻般的愉悦心情，与${player_name}继续接吻着………`,
        ); // :1365
      } else {
        // それ以外
        await era.printAndWait(`「不，不要啊！放过我吧，求求你……呣呣呣…呣呒」`); // :1368
        await era.printAndWait(
          `${target_name}被${player_name}按住双手的手腕，强行吻在了唇上。`,
        ); // :1369
        await era.printAndWait(`${target_name}的眼泪已经夺眶而出………`); // :1370
      }
      kojo.接吻 = 1; // :1370-1373
      return 0; // :1373-1377
    }

    // :1376-1431 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.接吻 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `「呣呣…舌头进来了、呣呣呣…跟姐姐亲亲舒服吗？${heart(1)}」`,
        ); // :1381
        await era.printAndWait(
          `『啊啊，姐姐的接吻技术…太棒了！嗯呣…呣呣呣${heart(1)} 姐姐的舌头…${player_name}还想要更多…呣啾啾${heart(1)}』`,
        ); // :1382
        await era.printAndWait(
          `${target_name}和${player_name}无比淫靡的深吻着，边互相爱抚身体，对两人亲姐妹的关系没有丝毫顾忌。`,
        ); // :1383
        kojo.接吻 = 5; // :1383-1384
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.接吻 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(`『姐姐，好喜欢你…最喜欢了♪』`); // :1387
        await era.printAndWait(
          `「啊啊、真的吗？…呣呣呣…呣嗯…姐姐好高兴${heart(1)}」`,
        ); // :1388
        await era.printAndWait(
          `${target_name}与${player_name}热烈地拥吻着，对两人亲生姐妹的身份没有丝毫顾忌。`,
        ); // :1389
        kojo.接吻 = 4; // :1389-1390
      } else if (
        chara(target).system.顺从 >= 2 &&
        (kojo.接吻 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 従順Lv2以上
        await era.printAndWait(`『来、姐姐，来亲亲♪』`); // :1393
        await era.printAndWait(
          `「啊啊…好，好的，但这是最后一次了…呣呣呣…呣嗯…！」`,
        ); // :1394
        await era.printAndWait(
          `${target_name}与${player_name}手牵着手，亲吻着………`,
        ); // :1395
        kojo.接吻 = 3; // :1395-1396
      } else if (kojo.接吻 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.printAndWait(`『姐姐、来接吻吧？』`); // :1399
        await era.printAndWait(`「不行啊、我们是姐妹啊…不可以——呣呣呣！」`); // :1400
        kojo.接吻 = 2; // :1400-1401
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.接吻 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「吻我…魔王大人…呣呣…呣呒……再激烈一点…我想品尝魔王大人的，呣呣…呣呒，味道${heart(1)}」`,
      ); // :1406
      await era.printAndWait(
        `${target_name}带着陶醉的表情与${player_name}激吻着，舌头交缠，呼吸灼热。`,
      ); // :1407
      await era.printAndWait(
        `「呣呣…呣啾啾${heart(1)}光是，呣呣，被魔王大人吻着…呣呣呣${heart(1)} 就好像要高潮了一样…${heart(1)}」`,
      ); // :1408
      await era.printAndWait(
        `${target_name}用炽烈的眼神与${player_name}四目相望，拉着${player_name}的手伸向自己已经湿透的股间………`,
      ); // :1409
      kojo.接吻 = 5; // :1409-1410
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.接吻 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(`「唔——呣呣呒…魔，魔王大人…呣啾啾${heart(1)}」`); // :1413
      await era.printAndWait(
        `${target_name}被${player_name}吻着，露出全然陶醉的幸福表情。`,
      ); // :1414
      await era.printAndWait(
        `「呣呣…呣啾啾${heart(1)} 魔王大人的吻…好喜欢…最喜欢了！呣呣…呣呒…想要，还想要${heart(1)}」`,
      ); // :1415
      await era.printAndWait(
        `在${target_name}的恳求下，${player_name}继续深吻着她………`,
      ); // :1416
      kojo.接吻 = 4; // :1416-1417
    } else if (
      chara(target).system.顺从 >= 2 &&
      (kojo.接吻 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 従順Lv2以上
      await era.printAndWait(`「呣呣…呣嗯…哈啊，终，终于结束了吗…」`); // :1420
      await era.printAndWait(
        `看到${target_name}在擦拭着自己的嘴唇，${player_name}抓着了${target_name}的双手，再次强吻了上去。`,
      ); // :1421
      await era.printAndWait(`「呣呣…呣呒…！又……又来…呣恩恩…」`); // :1422
      kojo.接吻 = 3; // :1422-1423
    } else if (kojo.接吻 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(`「这样…就行了吧？可以…放我走了吗？」`); // :1426
      await era.printAndWait(
        `${target_name}用手背擦拭着自己的嘴唇，眼角流出了屈辱的泪水………`,
      ); // :1427
      kojo.接吻 = 2; // :1427-1428
    }
    return 0; // :1428-1431 隐式（原作 RETURN 0）
  }

  // :1438-1611 IF SELECTCOM == 7（自己扒开 CFLAG:308）
  if (era_flag.selectcom === 7) {
    const virgin = era.get(`talent:${target}:0`) === 1;
    // :1440-1496 初めて（CFLAG:308 == 0）
    if (kojo.自己扒开 === 0) {
      if (assi_mao) {
        if (era.get(`talent:${target}:76`) === 1) {
          // 淫乱
          await era.printAndWait(
            `「啊啊…还是有点害羞呢${heart(1)} 为什么老是要这么欺负姐姐呢${heart(1)}」`,
          ); // :1445
          await era.printAndWait(
            `『哎呀，姐姐别找借口啦♪明明自己都湿成这个样子了』`,
          ); // :1446
          await era.printAndWait(
            `${target_name}遵循着妹妹的命令，摆出了淫荡的姿势和动作。`,
          ); // :1447
          await era.printAndWait(
            `完全堕入淫乱深渊的${target_name}为了取悦${player_name}，毫无廉耻地展示着蜜穴，并且自己也沉浸于别样的心理快感中。`,
          ); // :1448
          await era.printAndWait(
            `两人已经再也变不回以前那种纯洁的姐妹关系了，但现在的她们，某种程度上说也是无比的幸福吧………？`,
          ); // :1449
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 爱慕
          await era.printAndWait(`「啊啊…这样真是…太羞耻、饶了姐姐吧…」`); // :1452
          await era.printAndWait(
            `『不行啊、我都说的清清楚楚了，不是这个姿势♪』`,
          ); // :1453
          await era.printAndWait(
            `${target_name}只能遵循着妹妹的命令，摆出了无比羞耻的姿势和动作。`,
          ); // :1454
          await era.printAndWait(
            `已经听到过很多次，妹妹这样充满恶意地对姐姐下达着淫乱的命令了。`,
          ); // :1455
          await era.printAndWait(
            `两人已经再也变不回以前那种纯洁的姐妹关系了，但现在的她们，某种程度上说也是无比地幸福吧………？`,
          ); // :1456
        } else {
          // それ以外（爱慕無し）
          await era.printAndWait(
            `『哎呀，姐姐，在人家面前摆出这么淫荡的姿势，不觉得害羞吗？』`,
          ); // :1459
          await era.printAndWait(
            `「当，当然会觉得羞耻了…但是，但是不是你命令我这么做的吗…呜呜呜」`,
          ); // :1460
          await era.printAndWait(
            `『哎呀，原来姐姐是只要被命令，就什么淫荡下流的事情都可以做的变态呀。姐姐以前的形象，在我心里彻底破灭了呢。』`,
          ); // :1461
          await era.printAndWait(
            `「不是的、不是这样的…不要再欺负姐姐了，求求你………」`,
          ); // :1462
          await era.printAndWait(
            `${player_name}恶意的话语，让${target_name}忍不住泪流满面………`,
          ); // :1463
        }
      } else if (era.get(`talent:${target}:76`) === 1) {
        // 淫乱
        await era.printAndWait(
          `「哈啊、请吧，魔王大人，尽情欣赏少女最私密的地方吧………${heart(1)}」`,
        ); // :1468
        await era.printAndWait(
          `${target_name}扬起眉毛，献媚般地向${player_name}展示着自己的蜜穴深处。`,
        ); // :1469
        if (virgin) {
          await era.printAndWait(
            `「这个处女膜是为魔王大人保留的，但是也别让我等太久了……否则${heart(1)}」`,
          ); // :1471
          await era.printAndWait(
            `${target_name}舔着嘴唇，用手指一张一合地抚弄着蜜穴，诱惑着${player_name}………`,
          ); // :1472
        } else {
          await era.printAndWait(
            `「${target_name}的这里…现在最想要的，是魔王大人的精液哟…${heart(1)}」`,
          ); // :1474
          await era.printAndWait(
            `${target_name}露出淫靡的笑容，用语言挑逗，诱惑着${player_name}………`,
          ); // :1475
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        // 爱慕
        await era.printAndWait(
          `「啊，啊啊…请，请尽情看吧，魔王大人………${heart(1)}」`,
        ); // :1479
        await era.printAndWait(
          `${target_name}边害羞地微微喘息着、边向${player_name}展示着自己的蜜穴及更深处。`,
        ); // :1480
        if (virgin) {
          await era.printAndWait(
            `「我，我的处女膜…漂亮吗…？啊啊啊，我居然说了这么害羞的话！」`,
          ); // :1482
          await era.printAndWait(
            `${target_name}变得脸红耳赤，羞愧地摇着头躲避着魔王的视线………`,
          ); // :1483
        } else {
          await era.printAndWait(
            `「${target_name}的这里…是属于魔王大人专用的…啊啊啊…${heart(1)}」`,
          ); // :1485
          await era.printAndWait(
            `${target_name}羞得脸红耳赤，撑开蜜穴的手指也松走了………`,
          ); // :1486
        }
      } else {
        // それ以外（爱慕無し）
        await era.printAndWait(`「这种，这种事情实在太…羞耻…呜呜呜！」`); // :1490
        await era.printAndWait(
          `${target_name}擦了擦满脸的泪水，然后在${player_name}的命令下继续展示着蜜穴。`,
        ); // :1491
        await era.printAndWait(`「呜呜呜……给我记住、总有一天，总有一天………」`); // :1492
      }
      kojo.自己扒开 = 1; // :1495
      return 0; // :1495-1496
    }

    // :1497-1610 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.自己扒开 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        if (virgin) {
          await era.printAndWait(
            `「哈啊，能看见吗，${player_name}，看见姐姐淫荡的蜜穴了吗？」`,
          ); // :1504
          await era.printAndWait(`『恩恩，姐姐的处女膜光鲜亮丽，真好看！』`); // :1505
          await era.printAndWait(
            `「谢谢夸奖，但其实更想尽早让魔王大人把它弄坏呢…呵呵呵呵${heart(1)}」`,
          ); // :1506
          await era.printAndWait(
            `${target_name}和${player_name}一齐意味深长地望着你，眼中满含秋波………`,
          ); // :1507
        } else {
          await era.printAndWait(
            `「哈啊、能看见吗，${player_name}，看见姐姐淫荡的蜜穴了吗？嘻嘻嘻${heart(1)}」`,
          ); // :1509
          await era.printAndWait(
            `『啊呀…姐姐这里已经湿得乱七八糟了，已经在想象着被魔王大人侵犯了吗…真是太色情了♪』`,
          ); // :1510
          await era.printAndWait(
            `「这样够一目了然了吗${heart(1)} 要不要姐姐再换个姿势给你看！还是想看姐姐的肛门呢？」`,
          ); // :1511
          await era.printAndWait(
            `${target_name}和${player_name}无比和谐地讨论着下流的话题………`,
          ); // :1512
        }
        kojo.自己扒开 = 5; // :1512-1514
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.自己扒开 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        if (virgin) {
          await era.printAndWait(
            `『姐姐怎么还是处女呀、快点把这里奉献给魔王大人吧。大人可是很温柔的哦？』`,
          ); // :1518
          await era.printAndWait(`「不，不要公然地说…这么羞耻的事啦…」`); // :1519
          await era.printAndWait(
            `『哎呀、这样的话，那我就替魔王大人收下啦？怎样？稍等片刻，我准备一下……哎哎哎，姐姐别把腿合上呀，真是的。』`,
          ); // :1520
          await era.printAndWait(`「不要开玩笑啦！」`); // :1521
          if (chara(target).system.露出癖 >= 3) {
            await era.printAndWait(
              `${target_name}被${player_name}强行分开大腿，蜜穴在妹妹调戏下已经爱液满溢………`,
            ); // :1523
          } else {
            await era.printAndWait(
              `${target_name}被${player_name}强行分开大腿，捂着脸发出羞愧的声音………`,
            ); // :1525
          }
        } else {
          await era.printAndWait(`「太，太羞耻了！这个样子…呜呜呜…」`); // :1528
          await era.printAndWait(
            `『不行啊、我都说的清清楚楚了，不是这个姿势♪♪』`,
          ); // :1529
          await era.printAndWait(
            `${target_name}只能遵循着妹妹的命令，摆出更加屈辱的姿势和动作。`,
          ); // :1530
          if (chara(target).system.露出癖 >= 3) {
            await era.printAndWait(
              `『明明很享受被我和魔王大人视奸嘛，看，着淫荡的蜜穴都湿成这个样子了！说谎是不行的哦姐姐♪』`,
            ); // :1532
            await era.printAndWait(`「不，不是的…不是这样的………！」`); // :1533
            await era.printAndWait(
              `妹妹的话让${target_name}羞愧得脸红到了耳根、但异样的心理快感却让蜜穴却不住地分泌出更多爱液………`,
            ); // :1534
          } else {
            await era.printAndWait(`『被人这样看着，是不是有感觉了，姐姐？』`); // :1536
            await era.printAndWait(`「求求你，放过姐姐吧…呜呜呜」`); // :1537
          }
        }
        kojo.自己扒开 = 4; // :1538-1540
      } else if (
        chara(target).system.露出癖 >= 3 &&
        (kojo.自己扒开 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 露出癖Lv3以上
        await era.printAndWait(`「啊啊…这个姿势…能全部看清楚了吗？」`); // :1543
        await era.printAndWait(
          `『哎呀，姐姐已经露出上瘾了呢！都不觉得羞耻的吗？』`,
        ); // :1544
        await era.printAndWait(`「当，当然会感觉羞耻啊…要不是你的命令………」`); // :1545
        await era.printAndWait(
          `『说谎是不行的呢，姐姐！看着你的样子我就明白你现在的感觉啦♪』`,
        ); // :1546
        await era.printAndWait(
          `妹妹的话让${target_name}羞愧得脸红到了耳根、但异样的心理快感却让蜜穴却不住地分泌出更多爱液………`,
        ); // :1547
        if (virgin) {
          await era.printAndWait(
            `『姐姐的蜜穴好色情，好有诱惑力啊。魔王大人居然还没有侵犯过姐姐这里。如果我是男人的话一定早就………』`,
          ); // :1549
          await era.printAndWait(`「在，再说什么呢啊你！」`); // :1550
        }
        kojo.自己扒开 = 3; // :1550-1552
      } else if (kojo.自己扒开 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外（爱慕無し、露出癖Lv3未満）
        await era.printAndWait(`「这样…这样可以了吗…可以放过我了吧…呜呜」`); // :1555
        await era.printAndWait(`『哎呀呀，还是想看姐姐做些更羞耻的动作呢♪』`); // :1556
        await era.printAndWait(
          `${player_name}看着${target_name}万分羞愧的样子，笑的嘴巴都歪了。本是亲姐妹的两人，现在的关系已经完全不正常了。`,
        ); // :1557
        if (virgin) {
          await era.printAndWait(
            `『姐姐的处女膜还在呀、怎么还没有献给魔王大人呢？』`,
          ); // :1559
          await era.printAndWait(`「不要，不要啊……！」`); // :1560
        }
        kojo.自己扒开 = 2; // :1561-1562
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.自己扒开 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(`「哈啊…这个姿势就能全部看清了吧………${heart(1)}」`); // :1567
      await era.printAndWait(
        `${target_name}带着献媚的表情，向${player_name}展示着自己的蜜穴。`,
      ); // :1568
      if (virgin) {
        await era.printAndWait(
          `「这个处女膜是为魔王大人保留的，但是也别让我等太久哦${heart(1)}」`,
        ); // :1570
        await era.printAndWait(
          `${target_name}舔着嘴唇，又换了个更诱人的姿势，用手将蜜穴一张一合地诱惑着${player_name}。`,
        ); // :1571
        await era.printAndWait(
          `清晰可见得处女膜和满溢的淫液都在表达着对${player_name}的阴茎的渴望………`,
        ); // :1572
      } else {
        await era.printAndWait(
          `「${target_name}的淫荡蜜穴，现在最想要的…是魔王大人的阴茎和精液哦${heart(1)}」`,
        ); // :1574
        await era.printAndWait(
          `${target_name}露出淫媚的笑容，换了个更诱人的姿势，诱惑着${player_name}………`,
        ); // :1575
      }
      kojo.自己扒开 = 5; // :1575-1577
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.自己扒开 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(`「魔，魔王大人，请…看个够吧…${heart(1)}」`); // :1580
      await era.printAndWait(
        `${target_name}边害羞的喘息着，边向${player_name}展示着自己的蜜穴。`,
      ); // :1581
      if (virgin) {
        await era.printAndWait(
          `「我的处女膜，魔王大人觉得漂，漂亮吗？啊啊啊，说这种话好羞耻！」`,
        ); // :1583
        await era.printAndWait(
          `${target_name}羞得涨红了脸，别过脸躲避着${player_name}的眼光……`,
        ); // :1584
      } else {
        await era.printAndWait(
          `「${target_name}的这里…是属于魔王大人专用的…啊啊啊…${heart(1)}」`,
        ); // :1586
        await era.printAndWait(
          `${target_name}羞得脸红耳赤，撑开蜜穴的手指也松走了………`,
        ); // :1587
      }
      kojo.自己扒开 = 4; // :1587-1589
    } else if (
      chara(target).system.露出癖 >= 3 &&
      (kojo.自己扒开 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 露出癖Lv3以上
      await era.printAndWait(
        `「羞，羞死人了…这个姿势…实在太羞耻了！可是…为什么手指…就是挪不开…哈啊」`,
      ); // :1592
      await era.printAndWait(`${target_name}红着脸，口中吐出了甘甜的娇喘。`); // :1593
      await era.printAndWait(
        `「啊……哈啊…这，这样就行了吧…什么，什么！还要继续吗？！」`,
      ); // :1594
      if (virgin) {
        await era.printAndWait(`「好，好吧…我继续，继续！」`); // :1596
        await era.printAndWait(
          `${target_name}再次向${player_name}分开自己的蜜穴，这次将完好的处女膜也展示出来了………`,
        ); // :1597
      }
      kojo.自己扒开 = 3; // :1597-1599
    } else if (kojo.自己扒开 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外（爱慕無し、露出癖Lv3未満）
      await era.printAndWait(`「人家的这里…到底有什么好看的…要看那么多遍！」`); // :1602
      await era.printAndWait(`对于、咬着嘴唇对着${player_name}怒目而视。`); // :1603
      if (virgin) {
        await era.printAndWait(
          `「处女膜也看见了吧？…这样好了吧…你还想要怎么样！」`,
        ); // :1605
      }
      kojo.自己扒开 = 2; // :1605-1606
    }
    return 0; // :1606-1611 隐式（原作 RETURN 0）
  }

  // :1616-1692 IF SELECTCOM == 8（指挿入 CFLAG:309）
  if (era_flag.selectcom === 8) {
    // :1618-1636 初めて（CFLAG:309 == 0）
    if (kojo.插入手指 === 0) {
      if (assi_mao) {
        await era.printAndWait(`「不，不要啊…停下…好痛啊啊！」`); // :1621
        await era.printAndWait(
          `『我的手指插进去了哦姐姐！怎么用，感觉舒服吗？』`,
        ); // :1622
      } else if (era.get(`talent:${target}:76`) === 1) {
        // 淫乱
        await era.printAndWait(
          `「哈啊${heart(1)} 感觉到了，你湿漉漉的手指${heart(1)}」`,
        ); // :1626
      } else if (mark(2) === 3 && era.get(`talent:${target}:85`) === 1) {
        // 屈服刻印Lv3+爱慕
        await era.printAndWait(`「魔王大人的话…想怎么做什么都可以…嗯啊啊！」`); // :1629
      } else {
        // それ以外
        await era.printAndWait(`「啊啊啊！不，不要那么粗暴啊、会痛的！」`); // :1632
      }
      kojo.插入手指 = 1; // :1635
      return 0; // :1635-1636
    }

    // :1638-1691 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.插入手指 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `「哈啊……请尽情地欺负…姐姐淫荡的蜜穴吧…嗯啊 ${heart(1)}」`,
        ); // :1643
        await era.printAndWait(
          `『哎呀，只是轻轻这样用手指插了几下，姐姐的表情就已经跟高潮了一样。真是的，在我心目中的形象完全破灭了啊』`,
        ); // :1644
        await era.printAndWait(
          `「因，因为，实在是太舒服了啊……姐姐的淫穴！嗯啊啊${heart(1)} 哈…呼…呼呼！」`,
        ); // :1645
        kojo.插入手指 = 5; // :1645-1646
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        mark(2) === 3 &&
        (kojo.插入手指 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕＋屈服刻印Lv3
        await era.printAndWait(`「再，再稍微，温柔一点…嗯啊啊！」`); // :1649
        await era.printAndWait(
          `『放松一些啦姐姐，明明比我手指更粗的东西都能进得去♪』`,
        ); // :1650
        await era.printAndWait(`「呜啊啊…因，因为太羞耻了啦……啊啊！」`); // :1651
        kojo.插入手指 = 4; // :1651-1652
      } else if (
        mark(2) === 3 &&
        (kojo.插入手指 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3
        await era.printAndWait(`『姐姐变得老实得多了呢，是感觉到快感了吧？』`); // :1655
        await era.printAndWait(
          `「才，才不是这样的…嗯啊？…啊啊啊啊！不要，不要再里面搅动啊！」`,
        ); // :1656
        await era.printAndWait(
          `『这是对姐姐撒谎的惩罚哦♪为什么不坦率地承认很舒服呢？』`,
        ); // :1657
        kojo.插入手指 = 3; // :1657-1658
      } else if (kojo.插入手指 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.printAndWait(`「住手，住手啊…啊啊啊！」`); // :1661
        await era.printAndWait(
          `『指头已经全部插进姐姐的里面去了哦。怎么样，感觉舒服吗？』`,
        ); // :1662
        await era.printAndWait(`「怎，怎么可能会舒服？！快拔出去啊啊啊！」`); // :1663
        kojo.插入手指 = 2; // :1663-1664
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.插入手指 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「哈啊${heart(1)} 蜜穴都湿透了，都是因为你${heart(1)}嗯啊」`,
      ); // :1669
      await era.printAndWait(
        `${target_name}感受着下体被手指抽插的快感，舒服得眼泪都流下来了，不停地娇喘着。`,
      ); // :1670
      await era.printAndWait(`「嗯啊啊…好舒服…舒服得…要去了${heart(1)}」`); // :1671
      kojo.插入手指 = 5; // :1671-1672
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      mark(2) === 3 &&
      (kojo.插入手指 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕＋屈服刻印Lv3
      await era.printAndWait(
        `「魔，魔王大人的话…想怎么玩${target_name}的那里…哈啊…都可以…嗯啊啊！」`,
      ); // :1675
      await era.printAndWait(
        `${target_name}弓起了腰身，让${player_name}的手指可以更加深入地抽插自己的下体，自己也不住地娇喘着。`,
      ); // :1676
      await era.printAndWait(
        `「哈啊…${target_name}的蜜穴…触感如何…魔王大人${heart(1)}嗯啊啊啊」`,
      ); // :1677
      kojo.插入手指 = 4; // :1677-1678
    } else if (
      mark(2) === 3 &&
      (kojo.插入手指 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3
      await era.printAndWait(
        `「还要再这样弄多久？什么时候…可以结束？嗯啊啊！」`,
      ); // :1681
      await era.printAndWait(`「呼…呼…什么？还，还要再来？」`); // :1682
      kojo.插入手指 = 3; // :1682-1683
    } else if (kojo.插入手指 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(`「呜啊！这么粗暴的动作…讨厌死了！啊啊啊」`); // :1686
      kojo.插入手指 = 2; // :1686-1687
    }
    return 0; // :1687-1690
  }

  // :1697-1776 IF SELECTCOM == 9（舔肛 CFLAG:310）
  if (era_flag.selectcom === 9) {
    // :1699-1721 初めて（CFLAG:310 == 0）
    if (kojo.舔肛 === 0) {
      if (assi_mao) {
        await era.printAndWait(
          `『哇，姐姐的肛门粉粉嫩嫩的，真好看，这次换妹妹来侍奉姐姐一下${heart(1)}』`,
        ); // :1702
        await era.printAndWait(`「唔嗯？那里好脏，好脏的！不要啊！」`); // :1703
        await era.printAndWait(
          `『不脏啊，${player_name}觉得姐姐的肛门，很美味呢${heart(1)}』`,
        ); // :1704
      } else if (era.get(`talent:${target}:76`) === 1) {
        // 淫乱
        await era.printAndWait(`「真是的！连那种地方也要舔，你真是变态！」`); // :1708
        await era.printAndWait(
          `${target_name}有点不习惯肛门被舔舐的感觉，发出了混杂着不安与享受的声音……`,
        ); // :1709
      } else if (era.get(`talent:${target}:85`) === 1) {
        // 爱慕
        await era.printAndWait(
          `「不，不要舔那里，那里太…肮脏了啊！呜呜…嗯啊啊」`,
        ); // :1712
        await era.printAndWait(
          `${target_name}有点不习惯肛门被舔舐的感觉，发出了混杂着不安与享受的声音……`,
        ); // :1713
      } else {
        // それ以外（爱慕無し）
        await era.printAndWait(
          `「为，为什么要舔这种地方！好脏的！不要那样啊！」`,
        ); // :1716
        await era.printAndWait(
          `${target_name}肛门第一次被舔舐，极度的不适和反感让她发出了屈辱的哀鸣……`,
        ); // :1717
      }
      kojo.舔肛 = 1; // :1717-1720
      return 0; // :1717-1721
    }

    // :1723-1774 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `「啊啊啊…继续，继续舔，${player_name}、把舌头伸进里面舔${heart(1)}」`,
        ); // :1728
        await era.printAndWait(
          `『姐姐是个喜欢被人舔肛门的变态呢…嚯嚯嚯…真的那么舒服吗♪』`,
        ); // :1729
        await era.printAndWait(
          `${target_name}享受着${player_name}舔舐自己的肛门带来的快感，发出一阵阵淫媚的娇喘…`,
        ); // :1730
        kojo.舔肛 = 5; // :1730-1731
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.舔肛 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(
          `「啊啊…这样太羞耻了…快停下，${player_name}…嗯啊啊」`,
        ); // :1734
        await era.printAndWait(
          `『为什么要停下呢？姐姐的肛门，多美味啊♪而且明明自己也是一脸享受的样子♪我继续了哦！』`,
        ); // :1735
        await era.printAndWait(
          `${target_name}享受着被${player_name}舔舐着肛门带来的快感，脸却红到了脖子根………`,
        ); // :1736
        kojo.舔肛 = 4; // :1736-1737
      } else if (
        mark(2) === 3 &&
        (kojo.舔肛 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3
        await era.printAndWait(
          `「呃啊啊…姐姐一点都不觉得舒服…快，快点结束啦…嗯啊啊！」`,
        ); // :1740
        await era.printAndWait(
          `『不行哦姐姐，你要再放松一点，让妹妹舌头再进去一点就能感觉到舒服啦♪ 我继续开动啦！』`,
        ); // :1741
        await era.printAndWait(
          `${target_name}被${player_name}来回舔舐着肛门，只能屈着身子忍耐着……`,
        ); // :1742
        kojo.舔肛 = 3; // :1742-1743
      } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外（屈服刻印Lv3未満）
        await era.printAndWait(
          `『姐姐的屁股再放松一点啦，妹妹的舌头都进不去，以后怎么接纳魔王大人的……嘻嘻♪』`,
        ); // :1746
        await era.printAndWait(`「呜呜！不要啊，那里好脏，好脏的…快停下啊！」`); // :1747
        await era.printAndWait(
          `${target_name}被舔舐着肛门，发出了交织着不适、反感与屈辱的悲鸣……`,
        ); // :1748
        kojo.舔肛 = 2; // :1745-1749
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.舔肛 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「啊啊…魔王大人真是变态…喜欢…舔人家的肛门${heart(1)}哈啊」`,
      ); // :1754
      await era.printAndWait(
        `${target_name}享受着肛门被舔舐的快感，发出一阵阵淫浪的娇喘………`,
      ); // :1755
      kojo.舔肛 = 5; // :1755-1756
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.舔肛 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「魔，魔王大人，怎么能让你…做…做这种事！真是…嗯啊啊」`,
      ); // :1759
      await era.printAndWait(
        `${target_name}被${player_name}仔细舔舐着肛门，羞得面红耳赤，但是又不自觉地享受着……`,
      ); // :1760
      kojo.舔肛 = 4; // :1760-1761
    } else if (mark(2) === 3 && (kojo.舔肛 <= 2 || game.kojo.口上开关 === 2)) {
      // 屈服刻印Lv3
      await era.printAndWait(`「啊啊…可以快，快点结束吗…嗯啊啊！」`); // :1764
      await era.printAndWait(
        `${target_name}被${player_name}仔细舔舐着肛门，只能拼命忍耐着不适感。`,
      ); // :1765
      kojo.舔肛 = 3; // :1765-1766
    } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外（屈服刻印Lv3未満）
      await era.printAndWait(`「都说不要啊啊！那种肮脏的地方！」`); // :1769
      await era.printAndWait(
        `${target_name}被舔舐着肛门，发出了交织着不适、反感与屈辱的悲鸣……`,
      ); // :1770
      kojo.舔肛 = 2; // :1768-1771
    }
    return 0; // :1771-1774
  }

  // :1781-1853 IF SELECTCOM == 10（振动宝石 CFLAG:311）
  if (era_flag.selectcom === 10) {
    // :1783-1801 初めて（CFLAG:311 == 0）
    if (kojo.振动宝石 === 0) {
      if (assi_mao) {
        await era.printAndWait(`『这种震动玩具，很容易上瘾的哦，姐姐～♪』`); // :1786
        await era.printAndWait(`「呜啊！快…快拿开，${player_name}！啊啊啊」`); // :1787
      } else if (era.get(`talent:${target}:76`) === 1) {
        // 淫乱
        await era.printAndWait(
          `「啊啊，这样的震动…真让人…欲仙欲死${heart(1)}」`,
        ); // :1791
      } else if (mark(2) === 3 && era.get(`talent:${target}:85`) === 1) {
        // 屈服刻印Lv3+爱慕
        await era.printAndWait(
          `「呜啊！这，这是什么？啊啊啊震得太…太厉害了！」`,
        ); // :1794
      } else {
        // それ以外
        await era.printAndWait(`「呃？这、这是什么！？快拿开，好难受！」`); // :1797
      }
      kojo.振动宝石 = 1; // :1800
      return 0; // :1800-1801
    }

    // :1803-1852 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.振动宝石 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `『这么简单的道具就能让姐姐舒服成这个样子，姐姐的身体，已经完全变得淫乱了呢${heart(1)}』`,
        ); // :1808
        await era.printAndWait(
          `「哈啊！是，是啊…这种能让姐姐阴蒂舒服的东西…最喜欢了…嗯啊啊，再，再压紧一点${heart(1)}…呼呼…啊啊啊」`,
        ); // :1809
        await era.printAndWait(`『真的好像已经高潮了呢，淫荡的姐姐………』`); // :1810
        kojo.振动宝石 = 5; // :1810-1811
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        mark(2) === 3 &&
        (kojo.振动宝石 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕＋屈服刻印Lv3
        await era.printAndWait(
          `「真，真是的！为什么老要对姐姐、做，做恶作剧…嗯啊啊啊！」`,
        ); // :1814
        await era.printAndWait(
          `『因为人家想看到姐姐高潮时的脸嘛…你看你看，就是这个表情♪』`,
        ); // :1815
        kojo.振动宝石 = 4; // :1815-1816
      } else if (
        mark(2) === 3 &&
        (kojo.振动宝石 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3
        await era.printAndWait(`『姐姐变得老实多了呢，是不是已经有快感了？』`); // :1819
        await era.printAndWait(`「哈啊…胡，胡说，才没有那种—呃啊啊」`); // :1820
        kojo.振动宝石 = 3; // :1820-1821
      } else if (kojo.振动宝石 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.printAndWait(`『你看，很舒服吧？姐姐老实点不要乱动啊』`); // :1824
        await era.printAndWait(`「呜呜…拿…拿开啊…那种东西…！嗯啊啊」`); // :1825
        kojo.振动宝石 = 2; // :1825-1826
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.振动宝石 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「呜啊啊！好舒服……小豆豆…好舒服！哈啊…嗯啊啊${heart(1)}」`,
      ); // :1831
      await era.printAndWait(
        `${target_name}在宝石激烈的震动刺激下，整个腰身都弓了起来，不住地呻吟、娇喘………`,
      ); // :1832
      kojo.振动宝石 = 5; // :1832-1833
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      mark(2) === 3 &&
      (kojo.振动宝石 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕＋屈服刻印Lv3
      await era.printAndWait(
        `「哈…啊…不，不需要那种东西啦…我，我更想要你的手指…嗯啊啊！」`,
      ); // :1836
      await era.printAndWait(
        `${target_name}在宝石的刺激下不住地随快感扭着腰，娇媚地呻吟着………`,
      ); // :1837
      kojo.振动宝石 = 4; // :1837-1838
    } else if (
      mark(2) === 3 &&
      (kojo.振动宝石 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3
      await era.printAndWait(`「呜呜！又，又是这个！关掉，关掉啊…呜啊啊！」`); // :1841
      await era.printAndWait(
        `${target_name}被震动宝石连续刺激着阴蒂、只能咬牙忍耐着………`,
      ); // :1842
      kojo.振动宝石 = 3; // :1842-1843
    } else if (kojo.振动宝石 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(`「住，住手啊…！这种东西…！呜呜呜！」`); // :1846
      await era.printAndWait(
        `无处躲避的${target_name}被震动宝石连续刺激着阴蒂，发出了屈辱的哀鸣………`,
      ); // :1847
      kojo.振动宝石 = 2; // :1847-1848
    }
    return 0; // :1848-1851
  }

  // :1859-1987 IF SELECTCOM == 11（壶虫 CFLAG:312／着脱 CFLAG:372，
  // TEQUIP:11 判定已装/未装两态）
  if (era_flag.selectcom === 11) {
    const virgin = era.get(`talent:${target}:0`) === 1;

    if (era.get(`tequip:${target}:11`)) {
      // :1861-1920 初めて（CFLAG:312 == 0，开始时）
      if (kojo.壶虫 === 0) {
        if (virgin) {
          // 处女
          if (assi_mao) {
            await era.printAndWait(
              `『哎哎，姐姐真可怜呢，明明更想把处女留给魔王大人对吧♪可惜再也不可能了呢。』`,
            ); // :1866
            await era.printAndWait(
              `${player_name}抓着已经大半进入${target_name}蜜穴里的虫子，用力捏着它，刺激着它继续往里钻来钻去。`,
            ); // :1867
            await era.printAndWait(
              `看着手中沾满${target_name}处女血的蠕虫，${player_name}笑得嘴都歪了，笑容里满是深深的恶意。`,
            ); // :1868
            if (era.get(`talent:${target}:76`) === 1) {
              // 淫乱
              await era.printAndWait(
                `「哈啊，啊啊啊…虽说是这样…但是…还是…很舒服啊${heart(1)}哈……」`,
              ); // :1871
              await era.printAndWait(
                `${target_name}吃痛地叫了一声，但随即开始发出淫媚与享受的娇喘，淫乱的样子反而让${player_name}有些惊讶和失望……`,
              ); // :1872
            } else if (era.get(`talent:${target}:85`) === 1) {
              // 爱慕
              await era.printAndWait(
                `「你，你明明知道我的心情！为什么还要…还要说这么残酷的话？！把它拔出去，拔出去啊！求求你………」`,
              ); // :1875
              await era.printAndWait(
                `虫子依旧在${target_name}的阴道内肆意爬动，极度的委屈与痛楚使得${target_name}泪如泉涌，而看到姐姐这个样子的${player_name}，却更加兴奋………`,
              ); // :1876
            } else {
              // それ以外
              await era.printAndWait(
                `「啊啊啊…好痛…好痛啊…为什么要对姐姐做这么残忍的事！！${player_name}，你原来不是这样的人啊……！呜呜呜…」`,
              ); // :1879
              await era.printAndWait(
                `虫子依旧在${target_name}的阴道内肆意爬动，极度的屈辱与痛楚使得${target_name}撕心裂肺地惨叫着，哭泣着，而看到姐姐这个样子的${player_name}，却更加兴奋………`,
              ); // :1880
            }
          } else if (era.get(`talent:${target}:76`) === 1) {
            // 非助手玛奥・淫乱
            await era.printAndWait(
              `「啊啊啊！钻进，进来了…我的处女…居然给了这么一个东西…${heart(1)}」`,
            ); // :1885
            await era.printAndWait(
              `${target_name}用交织着委屈与享受的表情，出神地凝视着已经半身钻入自己下体内，穿透了处女膜的虫子……`,
            ); // :1886
          } else if (era.get(`talent:${target}:85`) === 1) {
            // 非助手玛奥・爱慕
            await era.printAndWait(
              `「这是…对我的惩罚吗？魔王大人…我甘心受罚啊啊啊！好痛！好痛啊啊！」`,
            ); // :1889
            await era.printAndWait(
              `蠕虫猛地钻进了${target_name}的蜜穴中，穿破了处女膜，沿着阴道往里钻，痛楚和委屈让她泪流满面地悲泣着……`,
            ); // :1890
          } else {
            // 非助手玛奥・それ以外
            await era.printAndWait(
              `「不要不要不要啊…拔出去拔出去——啊啊啊好痛，好痛啊！」`,
            ); // :1893
            await era.printAndWait(
              `蠕虫猛地钻进了${target_name}的蜜穴中，穿破了处女膜，沿着阴道往里钻，极度的痛楚和屈辱让她撕心裂肺地惨叫着，哭泣着……`,
            ); // :1894
          }
        } else if (assi_mao) {
          // 非处女・助手玛奥
          await era.printAndWait(`『啊哈哈、姐姐看，虫子从你下面钻进去了♪』`); // :1901
          await era.printAndWait(`「什，什么？！啊啊啊…好难受，好难受！」`); // :1902
        } else if (era.get(`talent:${target}:76`) === 1) {
          // 非处女・淫乱
          await era.printAndWait(`「哈啊，钻，钻进去了…呃啊…啊啊！」`); // :1906
          await era.printAndWait(
            `${target_name}感受着蠕虫从自己蜜穴中钻入，开始因为刺激和快感呻吟了起来………`,
          ); // :1907
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 非处女・爱慕
          await era.printAndWait(
            `「这，这样的东西和魔王大人的…比起来、啊，对，对不起…我…什么都没说！呃啊…哈啊」`,
          ); // :1910
          await era.printAndWait(
            `${target_name}感受着蠕虫从自己蜜穴中钻入，不由得大声地呻吟了起来。`,
          ); // :1911
        } else {
          // 非处女・それ以外
          await era.printAndWait(
            `「要，要让这样的东西进去…不，不，不要啊，这样的调教…求求你！」`,
          ); // :1914
          await era.printAndWait(
            `${target_name}想要伸手去把虫子拔出去，却被${player_name}按住了手、只能任由蠕虫继续往蜜穴的深处钻入……`,
          ); // :1915
        }
        kojo.壶虫 = 1; // :1919
        return 0; // :1919-1920
      }

      // :1922-1969 二回目以降
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.壶虫 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // 淫乱
          await era.printAndWait(
            `『姐姐，告诉我，被蠕虫插进去舒服还是被阴茎插进去舒服些？』`,
          ); // :1927
          await era.printAndWait(
            `「哎呀呀…这样的问题怎么回答呢…哪种东西在姐姐的蜜穴里，就是哪种更舒服…所以，现在当然是虫子啦${heart(1)}」`,
          ); // :1928
          kojo.壶虫 = 5; // :1928-1929
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.壶虫 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // 爱慕
          await era.printAndWait(
            `『姐姐，告诉我，被蠕虫插进去舒服还是被阴茎插进去舒服些？』`,
          ); // :1932
          await era.printAndWait(
            `「哎，哎…这种问题怎么回答的出口！啊啊啊，不要让它……爬太深进去啊啊啊！」`,
          ); // :1933
          kojo.壶虫 = 4; // :1933-1934
        } else if (
          chara(target).system.私处感觉 >= 3 &&
          (kojo.壶虫 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // V感覚Lv3以上
          await era.printAndWait(
            `『哎呀，姐姐一副口水都要流出来了的表情呢，真的有那么舒服吗${heart(1)}虫子已经要全部爬进去了哦哦』`,
          ); // :1937
          await era.printAndWait(
            `「哎，哎，才没露出那种表情…啊啊…在，在里面动起来了…啊哈…嗯啊啊！」`,
          ); // :1938
          kojo.壶虫 = 3; // :1938-1939
        } else if (kojo.壶虫 <= 1 || game.kojo.口上开关 === 2) {
          // それ以外
          await era.printAndWait(
            `『姐姐，开始习惯虫子在蜜穴里爬爬的感觉了吗？』`,
          ); // :1942
          await era.printAndWait(
            `「这，这种事…永远不会…不会习惯啊啊啊啊…拿出去啊啊，求求你！」`,
          ); // :1943
          kojo.壶虫 = 2; // :1943-1944
        }
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.壶虫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `「哈啊…啊！蜜穴被虫子…！啊啊…好…好舒服${heart(1)}」`,
        ); // :1949
        await era.printAndWait(
          `随着虫子渐渐钻入蜜穴之中，${target_name}的话音被自己充满享受的娇喘声掩盖了……`,
        ); // :1950
        kojo.壶虫 = 5; // :1950-1951
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.壶虫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(`「哈啊…啊！进，进去了…虫子…蜜穴里…嗯啊啊」`); // :1954
        await era.printAndWait(
          `着虫子渐渐钻入蜜穴之中，${target_name}发出了享受的娇喘声………`,
        ); // :1955
        kojo.壶虫 = 4; // :1955-1956
      } else if (
        chara(target).system.私处感觉 >= 3 &&
        (kojo.壶虫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // V感覚Lv3以上
        await era.printAndWait(
          `「这，这种东西钻进去…不会感觉到舒服的啦啊啊啊…哈啊…嗯啊啊！」`,
        ); // :1959
        await era.printAndWait(
          `随着虫子渐渐钻入蜜穴之中，${target_name}的辩解被自己充满享受的娇喘声掩盖了……`,
        ); // :1960
        kojo.壶虫 = 3; // :1960-1961
      } else if (kojo.壶虫 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.printAndWait(
          `「慢，慢一点…稍微…温柔一些不行吗！不…不要再进来了啊啊！」`,
        ); // :1964
        await era.printAndWait(
          `${target_name}发出了不满的声音，为了让她明白自己的立场和身份，${player_name}立即粗暴地刺激着虫子继续深入………`,
        ); // :1965
        kojo.壶虫 = 2; // :1965-1966
      }
      return 0; // :1966-1969
    }

    // :1972-1986 脱着時（TEQUIP:11 == 0）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.壶虫着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「哎，哎哎…虫子出去后，${target_name}的蜜穴好寂寞哦${heart(1)}，魔王大人」`,
      ); // :1975
      kojo.壶虫着脱 = 3; // :1976
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.壶虫着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「哈…呼…呼呼…接，接下来，魔王大人${heart(1)}？」`,
      ); // :1979
      kojo.壶虫着脱 = 2; // :1980
    } else if (kojo.壶虫着脱 < 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(
        `「突，突然拔出去…会，会痛的…啊，哈啊，为什么…有一种空虚的感觉……」`,
      ); // :1983
      kojo.壶虫着脱 = 1; // :1984
    }
    return 0; // :1984-1986
  }

  return 0;
}

kojo_message_com_family.register(11, kojo_message_com_11);

module.exports = { STUBBED_CALLS, k11_kojo2, kojo_message_com_11 };
