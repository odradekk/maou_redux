/* eslint-disable no-irregular-whitespace */
/**
 * @file 村娘口上 K11 莉莉：存在标志一对 + @EVENTTRAIN 主体 + @K11_KOJO2 +
 *       @EVENTEND + @KOJO_MESSAGE_COM_11 前段（SELECTCOM 0/1/2，issue #242，
 *       WIP 续轮，进行中）。
 *
 * 源: target/ERB/口上/EVENT_K11_リリィ.ERB  @EVENTTRAIN #PRI（:100-105，存在
 *     标志 FLAG:111 = 1）@EVENTEND #LATER（:106-113，清标志）
 *     @EVENTTRAIN（:114-514，调教开始口上：姉妹相认/寻妹对峙 CFLAG:201 +
 *     魔族化 CFLAG:400 + NTR 再捕获 CFLAG:650 + 屈服刻印 Lv1-3 + 淫乱/爱慕
 *     （各含魔族化分支）+ 崩坏 + 简易助手口上 CFLAG:202）
 *     @K11_KOJO2（:515-650，调教开始口上二回目以降）
 *     @EVENTEND（:651-748，普通档，调教结束口上）
 *     @KOJO_MESSAGE_COM_11（:749-10657，指令口上主体，本轮落地头部 7 项守卫
 *     :754-778 与 SELECTCOM 0/1/2 三支 :786-1043——爱抚/舔阴/肛门爱抚，各含
 *     初めて/二回目以降、助手玛奥/非助手玛奥、素质与刻印分档）
 *
 * 本票剩余工作（未落地，占全文 13468 行的约 92.2%）：@KOJO_MESSAGE_COM_11 的
 * SELECTCOM 3 起（源文件第 1048 至 10657 行，约 50 条剩余分支，见源文件内
 * `IF SELECTCOM ==` 逐条列表）、@DOG_KOJO_11（第 10658 至 11462 行，兽奸，
 * 存根已占位）、@KOJO_MESSAGE_PALAMCNG_11（第 11463 至 11793 行）、
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
 * trace-refs/kojo-k11-lily.mjs 的 428 条锚全部用源文件片段的逐字转义文本
 * （而非宽松的占位正则），并对每条锚在源全文里做精确子串计数：364 条恰好
 * 命中 1 行/1 段，可视为具备真实鉴别力。余下 64 条命中 >1 处，且经验证
 * 无法在不破坏 text-fidelity 逐句绑定（find_printform 要求 n..m 窗口内首条
 * PRINTFORM 系行即目标句，向前/向后扩窗只要越过相邻语句自身的 PRINTFORM
 * 行就会误绑定）的前提下继续收窄——60 条来自 WIP 1/N 交付范围（存在标志/
 * @EVENTTRAIN/@K11_KOJO2/@EVENTEND，:100-748），落在 CFLAG:400 魔族化分支
 * 与 K11_KOJO2 RAND 分档里逐句复现的对白段落内，按 issue 讨论保持现状、
 * 不再动；4 条来自本轮新增的 SELECTCOM 0/1/2（:811/818/826/1022，姉妹
 * 相认/魔族化前后两套台词在平行分支里逐字复现）。@KOJO_MESSAGE_COM_11
 * 头部 7 项守卫与 SELECTCOM 0/1/2 内非 print 语句自身收尾行的锚（守卫
 * SIF/RETURN、CFLAG 计数器赋值）已仿 K9（#240 commit 9716dee）的整改法
 * 向外扩窗到唯一邻行——只有 era.print(/era.printAndWait( 语句自己收尾行
 * 的 `:N` 锚绝不参与扩窗（kojo-text-fidelity 靠它做逐语句字面量绑定，
 * 扩窗会误绑邻行台词）。这 64 条即便行号漂移，落点也只会落到另一处内容
 * 完全相同的复现段落，不会静默通过成不相关文本——风险画像与结构性关键字
 * 锚（如裸 `RETURN 0`）不同，后者才是真正的零鉴别力。
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
    if (era0('flag:7') <= 0) {
      return 0;
    }
    if (era0(`talent:${target}:171`) != 1) {
      return 0;
    }

    // 姉妹判定（助手是玛奥 → 互标肉亲关系）
    if (assi > 0 && assi == 17) {
      era.set(`cflag:${target}:21`, 317);
      era.set(`cflag:${assi}:21`, 224);
    }

    if (era0(`cflag:${target}:201`) == 0) {
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
        era.set(`cflag:${target}:202`, 1);
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
      era.set(`cflag:${target}:201`, 1);
      return 1;
    } else if (
      era0(`cflag:${target}:201`) < 5 &&
      era0(`cflag:${target}:400`) == 0 &&
      era0(`talent:${target}:314`) == 9 &&
      era0(`talent:${target}:85`) == 0 &&
      era0(`talent:${target}:76`) == 0
    ) {
      // 魔族化（１回のみ，初回调教后、陷落前）
      await era.printAndWait(''); // :186-187 PRINTFORMW 空行
      era.set(`cflag:${target}:400`, 2);
      return 1;
    } else if (
      era0(`cflag:${target}:201`) >= 1 &&
      era0(`cflag:${target}:650`) == 1
    ) {
      // NTR 再捕获
      if (era0(`talent:${target}:85`) || era0(`talent:${target}:76`)) {
        era.drawLine();
        await era.printAndWait(''); // :196-198 PRINTFORMW 空行
        era.set(`cflag:${target}:650`, 0);
      } else {
        era.drawLine();
        await era.printAndWait(''); // :201-203 PRINTFORMW 空行
        era.set(`cflag:${target}:650`, 0);
      }
      return 1;
    } else if (
      era0(`cflag:${target}:201`) < 2 &&
      era0(`mark:${target}:2`) == 1
    ) {
      // 屈服刻印Lv1
      era.drawLine();
      await era.printAndWait(`「呼…呼…这样的调教，才，才没有什么……」`); // :214
      await era.printAndWait(
        `在屈辱的调教中，${target_name}闭上了眼睛，似乎还在坚持着反抗的心态………`,
      ); // :215
      era.set(`cflag:${target}:201`, 2);
      return 1;
    } else if (
      era0(`cflag:${target}:201`) < 3 &&
      era0(`mark:${target}:2`) == 2
    ) {
      // 屈服刻印Lv2
      era.drawLine();
      await era.printAndWait(`「都是因为救不了妹妹…我才会受到这样的惩罚」`); // :222
      await era.printAndWait(
        `${target_name}伏在床上，埋着脸哭泣着。她的样子反而更让${player_name}露出了愉悦的扭曲笑意。`,
      ); // :223
      await era.printAndWait(
        `从${target_name}为自己接受调教进行辩解开始，就可以开始进行更进一步的内容了………`,
      ); // :224
      era.set(`cflag:${target}:201`, 3);
      return 1;
    } else if (
      era0(`cflag:${target}:201`) < 4 &&
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
      era.set(`cflag:${target}:201`, 4);
      return 1;
    } else if (
      era0(`cflag:${target}:201`) < 5 &&
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
      era.set(`cflag:${target}:201`, 5);
      return 1;
    } else if (
      era0(`talent:${target}:314`) == 9 &&
      era0(`cflag:${target}:201`) < 6 &&
      era0(`talent:${target}:85`) == 0 &&
      era0(`talent:${target}:76`) == 1
    ) {
      // 淫乱+魔族化（调教前从魔族/初回调教后魔族/陥落后魔族三档）
      era.drawLine();
      if (era0(`cflag:${target}:400`) == 1) {
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
        era.set(`cflag:${target}:201`, 6);
        return 1;
      } else if (era0(`cflag:${target}:400`) == 2) {
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
        era.set(`cflag:${target}:201`, 6);
        return 1;
      } else {
        await era.printAndWait(''); // :289-293 PRINTFORMW 空行（陥落后に魔族）
        era.set(`cflag:${target}:201`, 6);
        return 1;
      }
    } else if (
      era0(`cflag:${target}:201`) < 7 &&
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
      era.set(`cflag:${target}:201`, 7);
      return 1;
    } else if (
      era0(`talent:${target}:314`) == 9 &&
      era0(`cflag:${target}:201`) < 8 &&
      era0(`talent:${target}:85`) == 1 &&
      era0(`talent:${target}:76`) == 0
    ) {
      // 爱慕+魔族化（调教前从魔族/初回调教后魔族/陥落后魔族三档）
      era.drawLine();
      if (era0(`cflag:${target}:400`) == 1) {
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
        era.set(`cflag:${target}:201`, 8);
        return 1;
      } else if (era0(`cflag:${target}:400`) == 2) {
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
        era.set(`cflag:${target}:201`, 8);
        return 1;
      } else {
        await era.printAndWait(''); // :353-357 PRINTFORMW 空行（陥落后に魔族）
        era.set(`cflag:${target}:201`, 8);
        return 1;
      }
    } else if (
      era0(`talent:${target}:9`) == 1 &&
      era0(`cflag:${target}:201`) < 9
    ) {
      // 崩坏
      era.drawLine();
      await era.printAndWait(`${target_name}的眼睛失去了光彩。`); // :364
      await era.printAndWait(
        `因为过度的调教，看上去精神和身体都崩溃了的样子。`,
      ); // :365
      await era.printAndWait(`「啊哈…呼呼…啊……哈哈……」`); // :366
      era.set(`cflag:${target}:201`, 9);
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
      if (era0(`cflag:${target}:202`) == 0) {
        // 初めて
        if (
          era0(`talent:${target}:85`) == 1 &&
          era0(`cflag:${target}:201`) >= 5
        ) {
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
          era.set(`cflag:${target}:202`, 2);
        } else if (
          era0(`talent:${target}:76`) == 1 &&
          era0(`cflag:${target}:201`) >= 5
        ) {
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
          era.set(`cflag:${target}:202`, 2);
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
          era.set(`cflag:${target}:202`, 1);
        }
        return 1;
      } else if (
        era0(`cflag:${target}:202`) == 1 &&
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
          era.set(`cflag:${target}:202`, 2);
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
          era.set(`cflag:${target}:202`, 2);
        }
        return 1;
      } else if (era0(`cflag:${target}:202`) >= 2 && era0('flag:7') == 2) {
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
    if (era0(`cflag:${target}:202`) >= 1) {
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
      if (era0(`cflag:${target}:202`) >= 1) {
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
      if (era0(`cflag:${target}:202`) >= 1) {
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
      if (era0(`cflag:${target}:202`) >= 1) {
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
 * SELECTCOM 0/1/2，其余编号留续轮）。
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

  return 0;
}

kojo_message_com_family.register(11, kojo_message_com_11);

module.exports = { STUBBED_CALLS, k11_kojo2, kojo_message_com_11 };
