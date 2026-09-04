/* eslint-disable no-irregular-whitespace, no-dupe-else-if */
/**
 * @file 伶俐性格口上 K15：EVENTTRAIN 存在标志 + 主体（issue #246）。
 *
 * 源: target/ERB/口上/EVENT_K15_伶俐.ERB  @EVENTTRAIN #PRI（:29-33，存在
 *     标志 FLAG:115）@EVENTEND #LATER（:35-37，清标志）@EVENTTRAIN
 *     （:43-239，调教开始口上 CFLAG:201 + NTR 再捕获 + 屈服/淫乱/爱慕/
 *     崩坏 + K15_KOJO2 二回目以降）@K15_KOJO2（:245-310）@EVENTEND
 *     （:316-400，调教结束口上）@KOJO_MESSAGE_COM_15（:406 起，四道头部
 *     守卫 + SELECTCOM 0–87）@DOG_KOJO_15（:4027-4888）
 *     @KOJO_MESSAGE_PALAMCNG_15（:4894-5098）@KOJO_MESSAGE_MARKCNG_15
 *     （:5105-5162）@SELF_KOJO_K15（:5168-5416）@DUNGEON_RYOUZYOKU_K15
 *     （:5442-5503）@DUNGEON_RYOUZYOKU_AFTER_K15（:5506-5551）
 *     @BENKI_KOUJO_K15（:5553-5650）@DUNGEON_VICTORY_K15（:5653-5704）
 *     @DUNGEON_ATTACK_K15（:5707-5790）@COLOSSEUM_KOJO_15（:5796-5919）
 *     @NTR_KOUJO_K15（:5920-5994）@EXUCUTION_KOUJO_K15（:5997-6012）
 *     @MUSEUM_KOUJO_K15（:6015-6048）@BANISHMENT_KOUJO_K15（:6051-6069）
 *     @PUBLIC_EXUCUTION_KOUJO_K15（:6072-6084）@GROTESQUE_KOUJO_K15
 *     （:6087-6111）@ENTERENEMY_KOUJO_K15（:6114-6129）
 *     @GOHOUBI_REQUEST_KOUJO_K15（:6132-6167）@GOHOUBI_AFTER_KOUJO_K15
 *     （:6170-6266）@OSIOKI_KOUJO_K15（:6268-6332）@GOBI_KOUJO_K15
 *     （:6335-6357）。

 * == 守卫（K15 与模板七条不同，逐文件 1:1） ==
 *
 * @KOJO_MESSAGE_COM_15 的守卫（:408-425，源实测）：
 *   1. TEQUIP:45 && SELECTCOM != 45（口塞）→ 跳过；
 *   2. TFLAG:899（失神）→ 跳过；
 *   3. TEQUIP:89（兽奸）→ 岔去本文件真身 DOG_KOJO_15；
 *   4. TEQUIP:55（死斗场）→ 岔去本文件真身 COLOSSEUM_KOJO_15。
 * ASSI/ASSIPLAY 整行注释、无 TALENT:9、无 TEQUIP:90。
 *
 * 这张票存根（docs/stub-registry.md）：`SELL_MATURO_K0`（成熟出售口上，
 * 随售却票）。
 */

'use strict';

const era = require('#/era-electron');
const { on, TIER } = require('#/system/event/registry');
const era_flag = require('#/era-utils/era-flag');
const { PALAMLV } = require('#/era-utils/palam-level');
const {
  kojo_message_com_family,
  kojo_message_palamcng_family,
  kojo_message_markcng_family,
  self_kojo_family,
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
const { self_call } = require('#/kojo/kojo-text');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { chara_callname, chara_name } = require('#/utils/callname-utils');
const { stub_line } = require('#/utils/stub-line');
const { peek_aftertrain_q } = require('#/event/event-aftertrain');

/** 读未声明的序号返回 undefined 而非 0（#13），口上条件一律 || 0 兜底 */
const era0 = (k) => era.get(k) || 0;

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。
 */
const STUBBED_CALLS = ['SELL_MATURO_K0'];

// @EVENTTRAIN #PRI（:29-33）：存在标志 + 总开关补 0（同 EVENT_K.ERB 语义）
on(
  'EVENTTRAIN',
  () => {
    game.kojo.口上存在_15 = 1; // :31 FLAG:115 = 1（K15 口上存在标志）
    if (game.kojo.口上开关 === 0) {
      game.kojo.口上开关 = 2; // :33
    }
  },
  TIER.PRI,
);

// @EVENTEND #LATER（:35-37）：调教结束清存在标志
on(
  'EVENTEND',
  () => {
    game.kojo.口上存在_15 = 0; // :37
  },
  TIER.LATER,
);

/**
 * @K15_KOJO2（:245-310）：调教开始口上的二回目以降（助手无口上时）。
 * 按「反抗刻印Lv3 → 屈服刻印Lv0/1/2/3 → 淫乱 → 爱慕」取首个命中。
 * PRINTDATAL / RAND:2 走 Math.random（K4 同款，事件链无 rand 形参）。
 */
async function k15_kojo2() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%
  const rand_n = (n) => Math.floor(Math.random() * n);
  const kojo_on = game.kojo.口上开关;

  if (era0(`mark:${target}:3`) == 3 && kojo_on == 2) {
    // :247
    era.drawLine(); // :247-248
    await era.printAndWait(
      `「魔界的脸皮是不值钱的吧？因为连身为领导的魔王都只会用这些下三滥的技俩啊？」`,
    ); // :249
    await era.printAndWait(`${target_name}毫不留情地冷嘲热讽着………`); // :250
    return 1; // :250-251
  } else if (era0(`mark:${target}:2`) == 0 && kojo_on == 2) {
    // :254
    era.drawLine(); // :254-255
    await era.print(
      [
        '「可以劳驾尊贵的魔王大人优雅且安静地滚开吗？」',
        '「也许，换一只猴子来代替您来调教，效果会更好呢？」',
      ][rand_n(2)],
    ); // :256-259 PRINTDATAL
    await era.printAndWait(`${target_name}嗤之以鼻地说着………`); // :260
    return 1; // :260-261
  } else if (era0(`mark:${target}:2`) == 1 && kojo_on == 2) {
    // :264
    era.drawLine(); // :264-265
    await era.printAndWait(`「哦？魔王都是这么闲的吗？只做这些无用的事情？」`); // :266
    await era.printAndWait(`${target_name}无奈地摆摆手，用怀疑的语气说着………`); // :267
    return 1; // :267-268
  } else if (era0(`mark:${target}:2`) == 2 && kojo_on == 2) {
    // :271
    era.drawLine(); // :271-272
    await era.printAndWait(`「只是习惯而已，难道还真以为那些手段会有用吗？」`); // :273
    await era.printAndWait(`像是想要说服自己那样，${target_name}紧握着拳头………`); // :274
    return 1; // :274-275
  } else if (
    era0(`mark:${target}:2`) == 3 &&
    era0(`talent:${target}:85`) == 0 &&
    era0(`talent:${target}:76`) == 0 &&
    kojo_on == 2
  ) {
    // :278
    era.drawLine(); // :278-279
    await era.printAndWait(
      `「反正不管说什么也没有用，${sc()}也就不想要白费力气了…」`,
    ); // :280
    await era.printAndWait(`${target_name}像是放弃了那样，转过了头………`); // :281
    return 1; // :281-282
  } else if (era0(`talent:${target}:76`) == 1 && kojo_on == 2) {
    // :285
    era.drawLine(); // :285-286
    if (rand_n(2)) {
      // :288-291 IF RAND:2（非 0 走本臂）

      await era.printAndWait(
        `「今天要玩些什么呢？不瞒您说，${sc()}这淫乱的身体早已经等不及了……」`,
      ); // :289
      await era.printAndWait(
        `「这个姿势可以看清楚吗？您看，这里变得这么的湿，这么热……」`,
      ); // :290
      await era.printAndWait(
        `${target_name}似乎已经忘记什么叫做廉耻，正大张着双腿做出勾引的动作……`,
      ); // :291
    } else {
      // :291-292
      await era.printAndWait(
        `「最近新学到一些……嗯，算是新的知识吧？可以的话，魔王大人愿意陪${sc()}来『实验』一下吗？」`,
      ); // :293
      await era.printAndWait(
        `${target_name}露出了意味深长的笑容，将身体紧贴着你并缓缓地摩擦着……`,
      ); // :294
    } // :294-295
    return 1; // :294-296
  } else if (era0(`talent:${target}:85`) == 1 && kojo_on == 2) {
    // :299
    era.drawLine(); // :299-300
    if (rand_n(2)) {
      // :302-303

      await era.printAndWait(
        `「如果您允许的话，真想一直陪伴在您的身边，无论做什么事都可以……」`,
      ); // :303
    } else {
      // :303-304
      await era.printAndWait(
        `「一见到您，不知为何就幸福地想露出微笑，真是一种很奇妙的感觉。」`,
      ); // :305
    } // :305-306
    await era.printAndWait(
      `${target_name}脸色微红地说着，露出期待的眼神凝视着你……`,
    ); // :307
    return 1; // :307-308
  } // :307-309
  return 0; // :307-310
}

/**
 * @EVENTTRAIN（:43-239，普通档）：调教开始时的口上。
 *
 * 守卫（:43-47）：FLAG:7 <= 0 跳过、TALENT:175 != 1 跳过；此后按

 * CFLAG:201 状态机推进：初调教（0，含暗器 TINPUT）→ NTR 再捕获
 * （>=1 && CFLAG:650 == 1）→ 屈服刻印Lv1/2/3（各一次）→ 淫乱 → 爱慕
 * → 崩坏 → 助手无 → K15_KOJO2。
 */
on('EVENTTRAIN', async () => {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%
  const kojo = chara(target).kojo;

  if ((game.kojo.口上开关 || 0) <= 0) {
    return 0; // :43-47
  } // :43-47
  if (era0(`talent:${target}:175`) != 1) {
    return 0; // :43-47
  } // :43-47

  if (kojo.初调教 == 0) {
    // :52
    era.drawLine(); // :52-53
    if (
      !(
        era0(`talent:${target}:314`) == 9 ||
        era0(`talent:${target}:319`) == 9 ||
        era0(`talent:${target}:319`) == 8
      )
    ) {
      // :54
      await era.printAndWait(
        `才刚走进牢房里，一枚带着光明气息的暗器就这样朝你的眼眸激射而来！！`,
      ); // :55
      await era.printAndWait(`（请按数字键 + Enter 选择行动！）`); // :56
      era.setColor('#98fa69'); // :57 SETCOLOR 152,250,105
      await era.print(''); // :57-58 PRINTL
      await era.print(`『1』不闪不避 ( 按 1 + Enter )`); // :59
      await era.print(''); // :60-61
      await era.print(`『2』偏头闪躲 ( 按 2 + Enter )`); // :61
      await era.print(''); // :62-63
      era.setColor(''); // :63 RESETCOLOR
      const result0 = await era.input(); // :64 TINPUT 1000, 1（限时由引擎侧省略，默认值测试以预置输入覆盖）
      if (result0 == 2) {
        // :65
        await era.printAndWait(
          `你稍微一偏头，就让那枚费尽${target_name}苦心筹谋的暗器打空了……`,
        ); // :66
        await era.printAndWait(
          `${target_name}似乎有点惊讶你的反应如此敏锐的样子……`,
        ); // :67
        await era.printAndWait(`恭顺点数 + 50`); // :68
        era.add(`juel:${target}:4`, 50); // :69 JUEL:4 += 50
      } else if (result0 == 1) {
        // :70
        await era.printAndWait(
          `你不闪不避，那枚费尽${target_name}苦心筹谋的暗器打在你的眼皮上，造成了轻微的擦伤……`,
        ); // :71
      } // :71-72
      await era.printAndWait(
        `好奇地将掉落在地的暗器捡起，发觉那不过是一枚尖端稍微被打磨过的小石片。`,
      ); // :73
      await era.printAndWait(
        `再观察一下牢房，在栅栏四周的阴影处，有老旧的捆绳与橡皮绳构成的简易弓弦似的陷阱……`,
      ); // :74
      await era.printAndWait(
        `哼，还颇有意思的，但是，这种小伎俩怎可能对魔王造成巨大的伤害呢？`,
      ); // :75
      await era.printAndWait(''); // :76
      await era.printAndWait(
        `「你，难道是魔王吗？所以暗器……才会无法造成伤害。」`,
      ); // :77
      await era.printAndWait(
        `本来只是对小喽喽用的陷阱，无奈直接遇上了魔王过来，这也是能算是运气不好吧？`,
      ); // :78
      await era.printAndWait(
        `所以看到陷阱失败，牢里的${target_name}不由自主地叹了口气，似乎有点失望的样子。`,
      ); // :79
    } // :79-80
    await era.print(''); // :81-82
    await era.printAndWait(`「别以为只要囚禁${sc()}，就能让${sc()}屈服。」`); // :82
    await era.printAndWait(
      `「被抓之后会有怎样的遭遇${sc()}早有耳闻。只不过让人失望的是，明明身为魔王却用这种下流卑劣的手段。」`,
    ); // :83
    await era.printAndWait(
      `「调教？哼…真是低级。该怎么评价好呢？真是………忧患魔界的未来啊！」`,
    ); // :84
    if (!(era0(`talent:${target}:10`) || era0(`talent:${target}:17`))) {
      // :85
      await era.printAndWait(
        `${target_name}抬头露出不屑的表情，用嘲讽的眼神看着你。`,
      ); // :86
    } else {
      // :86-87
      await era.printAndWait(`${target_name}紧握着拳头，试着让自己保持镇定。`); // :88
    } // :88-89
    await era.printAndWait(
      `明明成为了阶下囚，${target_name}却是不急不缓并义正严词地说着挑衅的话语……`,
    ); // :90
    kojo.初调教 = 1; // :91 CFLAG:201 = 1
    return 1; // :91-92
  } else if (kojo.初调教 >= 1 && kojo.NTR再捕获 == 1) {
    // :96
    if (era0(`talent:${target}:85`) || era0(`talent:${target}:76`)) {
      // :97
      era.drawLine(); // :97-98
      await era.printAndWait(
        `「真是非常抱歉…因为${sc()}的身体…就是被调教到如此淫乱…所以…」`,
      ); // :99
      await era.printAndWait(`${sc()}自嘲地笑着，露出了无奈的表情……`); // :100
      kojo.NTR再捕获 = 0; // :99-102
    } else {
      // :103-105
      era.drawLine(); // :104-105
      await era.printAndWait(`「哼！反正不管在哪，做的事情都是一样！」`); // :105
      await era.printAndWait(`${sc()}转过头去，露出了不甘心的表情……`); // :106
      kojo.NTR再捕获 = 0; // :105-108
    } // :106-109
    return 1; // :105-110
  } else if (kojo.初调教 < 2 && era0(`mark:${target}:2`) == 1) {
    // :115
    era.drawLine(); // :115-116
    await era.printAndWait(
      `「看来，只会用这些小手段来折磨${sc()}的身体，这就是魔王大人的本事啊？」`,
    ); // :117
    await era.printAndWait(
      `${target_name}一幅漫不经心的样子，脸上带着不以为然的表情……`,
    ); // :118
    kojo.初调教 = 2; // :119
    return 1; // :119-120
  } else if (kojo.初调教 < 3 && era0(`mark:${target}:2`) == 2) {
    // :123
    era.drawLine(); // :123-124
    await era.printAndWait(
      `「这些反应只是因为习惯而已！别天真地以为这样就能让${sc()}屈服了啊…！？」`,
    ); // :125
    await era.printAndWait(
      `${target_name}紧握着拳头，微微颤抖的声音似乎泄漏了他真正的心情……`,
    ); // :126
    kojo.初调教 = 3; // :127
    return 1; // :127-128
  } else if (
    kojo.初调教 < 4 &&
    era0(`mark:${target}:2`) == 3 &&
    era0(`talent:${target}:85`) == 0
  ) {
    // :131
    era.drawLine(); // :131-132
    await era.printAndWait(`「难道${sc()}是…不…不会的，怎么可能…！？」`); // :133
    await era.printAndWait(
      `${target_name}喃喃地自言自语，露出了无法置信的表情……`,
    ); // :134
    kojo.初调教 = 4; // :135
    return 1; // :135-136
  } else if (
    kojo.初调教 < 5 &&
    era0(`talent:${target}:76`) == 1 &&
    era0(`talent:${target}:85`) == 0
  ) {
    // :139
    era.drawLine(); // :139-140
    await era.printAndWait(
      `「直到遇见了魔王大人，${sc()}才真正体会到什么叫做『欢愉』……」`,
    ); // :141
    await era.printAndWait(
      `「以前的事情回想起来，发觉${sc()}真是太愚昧了，早点坦然地接受您的调教就好了，真是浪费了美好的时光……」`,
    ); // :142
    await era.printAndWait(
      `${target_name}对你露出了媚笑，正伸出手暧昧地抚摸你的下身……`,
    ); // :143
    kojo.初调教 = 5; // :144
    return 1; // :144-145
  } else if (kojo.初调教 < 6 && era0(`talent:${target}:85`) == 1) {
    // :148
    era.drawLine(); // :148-149
    await era.printAndWait(`「您来了啊？敬爱的魔王大人。」`); // :150
    if (era0(`talent:${target}:122`)) {
      // :151
      await era.printAndWait(
        `${target_name}一看见你就宛如被和煦的春风吹拂，露出了温柔的微笑。`,
      ); // :152
    } else {
      // :152-153
      await era.printAndWait(
        `${target_name}一看见你就宛如花朵盛开般地展颜，露出了美丽无暇的微笑。`,
      ); // :154
    } // :154-155
    await era.printAndWait(`「那个，如果可以的话，有些事情想要跟您说……」`); // :156
    await era.printAndWait(
      `${target_name}不自然地清了一下喉咙，似乎有点羞涩，不敢直视你的眼神。`,
    ); // :157
    await era.printAndWait(
      `「以前被『正义』所奴役，只会说着尖酸刻薄的话，那个愚昧的${sc()}……求求您忘记吧！」`,
    ); // :158
    await era.printAndWait(
      `「现在想起来，简直……如此愚蠢的样子居然还不知耻地在您的面前放肆……」`,
    ); // :159
    await era.printAndWait(`${target_name}想起了黑历史，似乎羞愧得无法自拔……`); // :160
    await era.printAndWait(
      `稍微冷静一会儿之后，${target_name}带着专注且期盼的眼神缓缓地说着……`,
    ); // :161
    await era.printAndWait(
      `「遇见您让${sc()}感觉像是重生了一样，也唯独只有您让${sc()}有这样的感受。如果可以的话…」`,
    ); // :162
    await era.printAndWait(
      `「能让卑微的${sc()}留在您的身边，替您分忧解劳吗？」`,
    ); // :163
    await era.printAndWait(
      `「${sc()}的身心都是完全属于您的，请您尽情地使用。」`,
    ); // :164
    await era.printAndWait(
      `${target_name}谦卑地跪在你的面前，虔诚地亲吻着你的手背……`,
    ); // :165
    kojo.初调教 = 6; // :166
    return 1; // :166-167
  } else if (era0(`talent:${target}:9`) == 1 && kojo.初调教 < 9) {
    // :169
    era.drawLine(); // :169-170
    await era.printAndWait(`${target_name}正面对着墙壁自言自语。`); // :171
    await era.printAndWait(`一会儿微笑一会儿又怒吼着，甚至还会以头撞墙………`); // :172
    await era.printAndWait(`看来，${target_name}果然是被玩坏了………`); // :173
    kojo.初调教 = 9; // :174
    return 1; // :174-175
  } else if (era_flag.assi < 0) {
    // :177
    await k15_kojo2(); // :177-178 CALL K15_KOJO2
  } else {
    // :236-237
    await k15_kojo2(); // :237-238 CALL K15_KOJO2
  } // :237-239
});

/**
 * @EVENTEND（:316-400，普通档）：调教结束时的口上。死亡跳过，随后按
 * 反抗刻印 Lv3、屈服刻印 Lv1 以下/2/3、淫乱/爱慕（各含体力高低分档）
 * 取首个命中。PRINTDATAL 走 Math.random。
 */
on('EVENTEND', async () => {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%
  const rand_n = (n) => Math.floor(Math.random() * n);

  if ((game.kojo.口上开关 || 0) <= 0) {
    return 0; // :316-324
  } // :316-324
  if (era0(`talent:${target}:175`) != 1) {
    return 0; // :316-324
  } // :316-324
  if (era0(`base:${target}:0`) <= 0) {
    return 0; // :316-324
  } // :316-324

  if (era0(`mark:${target}:3`) == 3 && era0(`talent:${target}:85`) == 0) {
    // :330
    era.drawLine(); // :330-331
    await era.printAndWait(
      `「真是人渣…！喔…抱歉，忘了你不是人族了，应该说人渣不如才对！」`,
    ); // :332
    await era.printAndWait(`${target_name}用冰冷且尖锐的言语怒骂了起来……`); // :333
    return 1; // :333-334
  } else if (
    era0(`mark:${target}:2`) <= 1 &&
    era0(`talent:${target}:85`) == 0
  ) {
    // :337
    era.drawLine(); // :337-338
    await era.printAndWait(`「就这…？再怎么做也是没用的！」`); // :339
    if (era0(`talent:${target}:317`) == 4) {
      // :342
      await era.printAndWait(
        `（为了那个人，${sc()}一定要逃离这个鬼地方才行！）`,
      ); // :342
    } // :342
    await era.printAndWait(
      `${target_name}皱着眉头咬着手指，似乎在思考什么的样子……`,
    ); // :343
    return 1; // :343-344
  } else if (
    era0(`mark:${target}:2`) == 2 &&
    era0(`talent:${target}:85`) == 0
  ) {
    // :347
    era.drawLine(); // :347-348
    await era.printAndWait(`「唔…嗯…总算是结束了…」`); // :349
    if (era0(`talent:${target}:317`) == 4) {
      // :352
      await era.printAndWait(
        `（就算是被做了这种事……为了那个人，${sc()}也不能放弃！）`,
      ); // :352
    } // :352
    await era.printAndWait(`${target_name}叹了一口气，露出若有所思的表情……`); // :353
    return 1; // :353-354
  } else if (
    era0(`mark:${target}:2`) == 3 &&
    era0(`talent:${target}:85`) == 0
  ) {
    // :357
    era.drawLine(); // :357-358
    await era.printAndWait(`「如果再这样下去的话…该不会…已经……」`); // :359
    if (era0(`talent:${target}:317`) == 4) {
      // :362
      await era.printAndWait(
        `（这样的${sc()}……已经无法再回到那个人的身边了吧？）`,
      ); // :362
    } // :362
    await era.printAndWait(
      `${target_name}低着头喃喃自语着，露出了放弃的表情……`,
    ); // :363
    return 1; // :363-364
  } else if (
    era0(`talent:${target}:76`) == 1 &&
    era0(`base:${target}:0`) >= 500
  ) {
    // :367
    era.drawLine(); // :367-368
    await era.printAndWait(
      `「咦…！？结束了吗…？呵呵…魔王大人您今天的状态不行哦…？」`,
    ); // :367-369
    await era.printAndWait(
      `「开玩笑的啦！别生气喔？因为是魔王大人，${sc()}才会依依不舍啊！」`,
    ); // :370-371
    await era.printAndWait(
      `尚有体力的${target_name}，正在想着呆会该如何解决自己身体的火热……`,
    ); // :371
    return 1; // :371-372
  } else if (
    era0(`talent:${target}:76`) == 1 &&
    era0(`base:${target}:0`) <= 500
  ) {
    // :374
    era.drawLine(); // :374-375
    await era.print(
      [
        `「呼……只有魔王大人能把${sc()}弄成这样乱七八糟的样子呢~」`,
        `「嗯啊…啊…嗯…真不愧是魔王大人，${sc()}被调教到腰都软了呢~」`,
      ][rand_n(2)],
    ); // :376-379 PRINTDATAL
    await era.printAndWait(
      `${target_name}的眼角带着情欲未退的潮红，喘息地向你求饶着……`,
    ); // :380
    return 1; // :380-381
  } else if (
    era0(`talent:${target}:85`) == 1 &&
    era0(`base:${target}:0`) >= 500
  ) {
    // :384
    era.drawLine(); // :384-385
    await era.printAndWait(
      `「咦…！？结束了吗…？呵呵…魔王大人您今天的状态不行哦…？」`,
    ); // :384-386
    await era.printAndWait(
      `「开玩笑的啦！别生气喔？因为是魔王大人，${sc()}才会依依不舍啊！」`,
    ); // :387-388
    await era.printAndWait(
      `尚有体力的${target_name}，正拉着你的袖子露出讨好的笑容，似乎很不舍得就这样与你分开……`,
    ); // :388
    return 1; // :388-389
  } else if (
    era0(`talent:${target}:85`) == 1 &&
    era0(`base:${target}:0`) <= 500
  ) {
    // :391
    era.drawLine(); // :391-392
    await era.print(
      [
        `「唔…好想就这样一直和您合而为一啊…！」`,
        `「${sc()}这体力真是不行，不知您觉得还满意吗？」`,
      ][rand_n(2)],
    ); // :393-396 PRINTDATAL
    await era.printAndWait(
      `${target_name}的眼角带着情欲未退的潮红，亲昵地抱着你说着……`,
    ); // :397
    return 1; // :397-398
  } // :397-399
  return 0; // :397-400
});

/**
 * @DOG_KOJO_15（:4027 起）：兽奸 PLAY 专用口上（TEQUIP:89 时由
 * kojo_message_com_15 头部守卫岔入）。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0
 */
async function dog_kojo_15(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%
  const kojo = chara(target).kojo;

  if (era_flag.selectcom == 0) {
    // :4032

    if (kojo.爱抚 == 0) {
      // :4034

      if (era0(`mark:${target}:2`) >= 2) {
        // :4036
        await era.printAndWait(`「…………」`); // :4037
        await era.printAndWait(`${target_name}皱着眉头，忍耐着狗的磨蹭……`); // :4038
      } else {
        // :4039-4041
        await era.printAndWait(`「不……别靠过来！恶心！……」`); // :4041
        await era.printAndWait(
          `当狗磨蹭到裸露的皮肤时，${target_name}忍不住怒斥了起来……`,
        ); // :4042
      } // :4042-4044
      kojo.爱抚 = 1; // :4044
      return 0; // :4042-4048
    } else {
      // :4045-4049

      if (
        era0(`talent:${target}:136`) == 1 &&
        (kojo.爱抚 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :4049
        await era.printAndWait(`「狗狗的皮毛好舒服……其他的地方也……♡」`); // :4050
        await era.printAndWait(
          `${target_name}就像是一条合格的母狗一样，万分自然地与狗相互磨蹭着……`,
        ); // :4051
        kojo.爱抚 = 7; // :4052
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :4054
        await era.printAndWait(`「即使对象是狗狗……也很舒服呢……♡」`); // :4055
        await era.printAndWait(`${target_name}毫不在乎地与狗相互磨蹭着……`); // :4056
        kojo.爱抚 = 6; // :4057
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4059
        if (!era_flag.assiplay) {
          await era.printAndWait(`「如果您希望${sc()}跟狗狗亲近的话………」`); // :4061
        } // :4061
        await era.printAndWait(`${target_name}顺从地与狗相互磨蹭着……`); // :4062
        kojo.爱抚 = 5; // :4063
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4065
        await era.printAndWait(`「………唔……嗯……」`); // :4066
        kojo.爱抚 = 4; // :4067
      } else if (
        era0(`mark:${target}:2`) == 2 &&
        (kojo.爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4069
        await era.printAndWait(`「……唔………不……」`); // :4070
        kojo.爱抚 = 3; // :4071
      } else if (
        era0(`mark:${target}:2`) <= 1 &&
        (kojo.爱抚 <= 1 || game.kojo.口上开关 == 2)
      ) {
        // :4073
        await era.printAndWait(`「都说不要了……走开啊！」`); // :4074
        kojo.爱抚 = 2; // :4075
      } // :4074-4078
      return 0; // :4074-4080
    } // :4074-4082
  } // :4076-4082

  if (era_flag.selectcom == 1) {
    // :4084

    if (kojo.舔阴 == 0) {
      // :4086

      if (era0(`talent:${target}:0`) == 1) {
        // :4088
        await era.printAndWait(`「不！那里是……不可以啊！啊啊啊！」`); // :4089
        await era.printAndWait(`${target_name}发出了歇斯底里的大叫……`); // :4090
      } else {
        // :4091-4093
        await era.printAndWait(`「不……好脏……不要啊！」`); // :4093
        await era.printAndWait(`${target_name}厌恶地怒吼着……`); // :4094
      } // :4094-4096
      kojo.舔阴 = 1; // :4096
      return 0; // :4094-4100
    } else {
      // :4097-4101

      if (
        era0(`talent:${target}:136`) == 1 &&
        (kojo.舔阴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :4101
        await era.printAndWait(`「嗯～啊啊♡……好……好棒♡……湿了……要去了啊～♡♡」`); // :4102
        kojo.舔阴 = 6; // :4103
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.舔阴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4105
        await era.printAndWait(`「那里……嗯…啊啊♡…被狗狗舔了呢～♡♡」`); // :4106
        kojo.舔阴 = 5; // :4107
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.舔阴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4109
        await era.printAndWait(`「呜……这里…不行……是魔王大人的……唔……」`); // :4110
        kojo.舔阴 = 4; // :4111
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.舔阴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4113
        await era.printAndWait(`「……唔……不……不要………」`); // :4114
        kojo.舔阴 = 3; // :4115
      } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 == 2) {
        // :4117
        await era.printAndWait(`「脏死了！走开！走开啊啊啊！」`); // :4118
        kojo.舔阴 = 2; // :4119
      } // :4118-4122
      return 0; // :4118-4124
    } // :4118-4126
  } // :4119-4127

  if (era_flag.selectcom == 5) {
    // :4129

    if (kojo.胸爱抚 == 0) {
      // :4131

      if (era0(`talent:${target}:85`) == 1) {
        // :4133
        await era.printAndWait(`「在魔王大人面前……呜……」`); // :4134
      } else {
        // :4135-4137
        await era.printAndWait(`「别……别碰那里！……走开啊！」`); // :4137
      } // :4137-4139
      kojo.胸爱抚 = 1; // :4139
      return 0; // :4137-4143
    } else {
      // :4140-4144

      if (
        era0(`talent:${target}:136`) == 1 &&
        (kojo.胸爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :4144
        await era.printAndWait(`「嗯～好……好棒……啊啊……嗯嗯……啊啊啊～♡♡」`); // :4145
        kojo.胸爱抚 = 6; // :4146
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4148
        await era.printAndWait(`「嗯…啊啊～狗狗……真乖呢♡……嗯嗯……啊啊～♡♡」`); // :4149
        kojo.胸爱抚 = 5; // :4150
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4152
        await era.printAndWait(
          `「唔……不…不行……${sc()}的身体……是魔王大人的……啊…」`,
        ); // :4153
        kojo.胸爱抚 = 4; // :4154
      } else if (
        era0(`abl:${target}:1`) >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4156
        await era.printAndWait(`「啊……不……不可以……」`); // :4157
        kojo.胸爱抚 = 3; // :4158
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        // :4160
        await era.printAndWait(`「恶心！走开………不……不要！」`); // :4161
        kojo.胸爱抚 = 2; // :4162
      } // :4161-4165
      return 0; // :4161-4167
    } // :4161-4169
  } // :4163-4169

  if (era_flag.selectcom == 6) {
    // :4171

    if (kojo.接吻 == 0 && game.train.初吻与自我口上) {
      // :4173

      if (era0(`talent:${target}:136`) == 1) {
        // :4175
        await era.printAndWait(`「嗯啊……咕……啾……嗯……嗯」`); // :4176
        await era.printAndWait(
          `${target_name}连自己是初吻的事情都忘了，只是痴迷地与狗进行舌吻……`,
        ); // :4177
      } else if (era0(`talent:${target}:76`) == 1) {
        // :4179
        await era.printAndWait(`「初吻的对象是狗狗吗？魔王大人真是鬼畜呢～♡」`); // :4180
        await era.printAndWait(
          `尽管${target_name}这么说，却是毫不抵抗地遵从了命令……`,
        ); // :4181
      } else if (era0(`talent:${target}:85`) == 1) {
        // :4183
        await era.printAndWait(
          `「${sc()}是属于魔王大人的……如果是您的命令…就算是初吻也……」`,
        ); // :4184
        await era.printAndWait(
          `${target_name}似乎有点消沉的样子，但还是顺从地执行着命令……`,
        ); // :4185
      } else {
        // :4186-4188
        await era.printAndWait(`「真…真不敢相信……${sc()}…${sc()}的…初吻！」`); // :4188
        await era.printAndWait(
          `${target_name}厌恶地不停擦拭着嘴唇，那神情恍惚的样子似乎受到了打击……`,
        ); // :4189
      } // :4188-4192
      kojo.接吻 = 1; // :4191
      return 0; // :4189-4195
    } else if (kojo.接吻 == 0) {
      // :4194

      if (era0(`talent:${target}:136`) == 1) {
        // :4196
        await era.printAndWait(`「嗯啊……咕……啾……嗯……嗯～♡♡」`); // :4197
        await era.printAndWait(
          `${target_name}淫荡地摇着屁股，痴迷地与狗进行着舌吻……`,
        ); // :4198
      } else if (era0(`talent:${target}:76`) == 1) {
        // :4200
        await era.printAndWait(`「呵呵……好啊……没有试过呢……嗯……啾……」`); // :4201
        await era.printAndWait(`${target_name}毫不抵抗地遵从了命令……`); // :4202
      } else if (era0(`talent:${target}:85`) == 1) {
        // :4204
        await era.printAndWait(`「${sc()}是属于魔王大人的……如果是您的命令……」`); // :4205
        await era.printAndWait(`${target_name}顺从地执行着命令……`); // :4206
      } else {
        // :4207-4209
        await era.printAndWait(`「真…真不敢相信……不……不要！」`); // :4209
        await era.printAndWait(
          `${target_name}厌恶地不停擦拭着嘴唇，那神情恍惚的样子似乎受到了打击……`,
        ); // :4210
      } // :4209-4213
      kojo.接吻 = 1; // :4212
      return 0; // :4210-4216
    } else {
      // :4213-4217

      if (
        era0(`talent:${target}:136`) == 1 &&
        (kojo.接吻 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :4217
        await era.printAndWait(`「嗯啊…好……好棒…咕……啾……嗯……嗯～♡♡」`); // :4218
        await era.printAndWait(
          `${target_name}一边流着口水，一边痴迷地与狗进行着舌吻……`,
        ); // :4219
        kojo.接吻 = 6; // :4220
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.接吻 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4222
        await era.printAndWait(`「嗯……唔……咕……啾……嗯～♡♡」`); // :4223
        await era.printAndWait(
          `即使对象是狗，${target_name}似乎也无所谓的样子……`,
        ); // :4224
        kojo.接吻 = 5; // :4225
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.接吻 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4227
        await era.printAndWait(`「嗯……唔……咕……啾……嗯……」`); // :4228
        await era.printAndWait(`（一切……都是要让……魔王大人开心……）`); // :4229
        await era.printAndWait(`${target_name}顺从地执行着命令……`); // :4230
        kojo.接吻 = 4; // :4231
      } else if (
        era0(`abl:${target}:10`) >= 2 &&
        (kojo.接吻 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4233
        await era.printAndWait(`「不……唔………」`); // :4234
        kojo.接吻 = 3; // :4235
      } else if (kojo.接吻 <= 1 || game.kojo.口上开关 == 2) {
        // :4237
        await era.printAndWait(`「讨厌！……恶心死了！……不……不要！」`); // :4238
        kojo.接吻 = 2; // :4239
      } // :4238-4242
      return 0; // :4238-4244
    } // :4238-4246
  } // :4240-4246

  if (era_flag.selectcom == 9) {
    // :4248

    if (kojo.舔肛 == 0) {
      // :4250

      if (era0(`talent:${target}:136`) == 1) {
        // :4252
        await era.printAndWait(`「嗯啊…哈啊……好……好棒……狗狗的舌头♡」`); // :4253
      } else if (era0(`talent:${target}:76`) == 1) {
        // :4255
        await era.printAndWait(`「呵呵……舔这个地方……真是坏狗狗♡」`); // :4256
      } else if (era0(`talent:${target}:85`) == 1) {
        // :4258
        await era.printAndWait(`「唔……狗狗……不可以……啊……」`); // :4259
      } else {
        // :4260-4262
        await era.printAndWait(`「好脏……不要……走开…走开啊啊啊！」`); // :4262
      } // :4262-4264
      kojo.舔肛 = 1; // :4264
      return 0; // :4262-4268
    } else {
      // :4265-4269

      if (
        era0(`talent:${target}:136`) == 1 &&
        (kojo.舔肛 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :4269
        await era.printAndWait(
          `「啊啊…舌头…伸到里面了♡……好…好棒♡……啊啊……嗯啊啊～♡」`,
        ); // :4270
        kojo.舔肛 = 6; // :4271
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4273
        await era.printAndWait(`「狗狗……也很……厉害呢…嗯啊啊～♡」`); // :4274
        kojo.舔肛 = 5; // :4275
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.舔肛 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4277
        await era.printAndWait(`「啊……在魔王大人的视线下……呜……好羞耻啊……」`); // :4278
        kojo.舔肛 = 4; // :4279
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.舔肛 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4281
        await era.printAndWait(`「……不………不………」`); // :4282
        kojo.舔肛 = 3; // :4283
      } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 == 2) {
        // :4285
        await era.printAndWait(`「走开！不……不可以……不要舔啊！」`); // :4286
        kojo.舔肛 = 2; // :4287
      } // :4286-4290
      return 0; // :4286-4292
    } // :4286-4294
  } // :4288-4294

  if (era_flag.selectcom == 21) {
    // :4296

    if (kojo.背后位 == 0) {
      // :4298

      if (era0(`talent:${target}:0`) == 1) {
        // :4300

        if (era0(`talent:${target}:136`) == 1) {
          // :4302
          await era.printAndWait(
            `「是的…是的…${sc()}的一切都是狗狗大人的…啊啊……嗯啊啊～♡」`,
          ); // :4303
          await era.printAndWait(
            `${target_name}兴奋地摇晃着屁股，就像是一条发情的母狗……`,
          ); // :4304
        } else if (era0(`talent:${target}:76`) == 1) {
          // :4306
          await era.printAndWait(`「能摆脱处女就好……嗯……狗狗……快来呀～♡」`); // :4307
          await era.printAndWait(
            `${target_name}毫不在乎第一次的对象是狗狗的样子……`,
          ); // :4308
        } else if (era0(`talent:${target}:85`) == 1) {
          // :4310
          await era.printAndWait(
            `「但是${sc()}…${sc()}是…不…没事……如果魔王大人想看的话………」`,
          ); // :4311
          await era.printAndWait(
            `${target_name}似乎无法把话说完…只是低头温驯地听从了命令……`,
          ); // :4312
        } else {
          // :4312-4316
          await era.printAndWait(
            `「不！不要呀！啊啊！绝对…绝对……要杀了你们！啊啊啊！！」`,
          ); // :4315
          await era.printAndWait(
            `惨遭兽奸破处的${target_name}发出了崩溃似的嘶喊……`,
          ); // :4316
        } // :4316-4318
      } else {
        // :4317-4321

        if (era0(`talent:${target}:136`) == 1) {
          // :4321
          await era.printAndWait(
            `「是的…是的…${sc()}的一切都是狗狗大人的…啊啊……嗯啊啊～♡」`,
          ); // :4322
          await era.printAndWait(
            `${target_name}兴奋地摇晃着屁股，就像是一条发情的母狗……`,
          ); // :4323
        } else if (era0(`talent:${target}:76`) == 1) {
          // :4325
          await era.printAndWait(
            `「跟狗狗交配啊……呵呵……好新奇呢……也许很棒哦♡」`,
          ); // :4326
          await era.printAndWait(
            `${target_name}的双眼发光，露出了很感兴趣的表情……`,
          ); // :4327
        } else if (era0(`talent:${target}:85`) == 1) {
          // :4329
          await era.printAndWait(`「好……好的…如果…魔王大人想…想看的话……」`); // :4330
          await era.printAndWait(`${target_name}低头温驯地听从了命令……`); // :4331
        } else {
          // :4331-4335
          await era.printAndWait(
            `「不！不要呀！啊啊！绝对…绝对……要杀了你们！啊啊啊！！」`,
          ); // :4334
          await era.printAndWait(
            `惨遭兽奸的${target_name}发出了崩溃似的嘶喊……`,
          ); // :4335
        } // :4335-4337
      } // :4335-4339
      kojo.背后位 = 1; // :4338
      return 0; // :4336-4342
    } else {
      // :4339-4343

      if (
        era0(`talent:${target}:136`) == 1 &&
        (kojo.背后位 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :4343
        await era.print(
          [
            `「好想受精♡……啊啊……请……请灌满…精液吧…啊啊……嗯啊啊～♡」`,
            `「嗯啊啊～狗狗大人的肉棒！…全都进来了♡…啊啊……嗯啊啊～♡」`,
            `「是的！是的！${sc()}就是最喜欢被狗交配的母狗♡…啊啊……嗯啊啊～♡」`,
          ][rand_n(3)],
        ); // :4344-4348 PRINTDATAL
        await era.printAndWait(
          `${target_name}流着口水双眼翻白，脑子除了狗狗的肉棒之外什么都不知道了……`,
        ); // :4349
        kojo.背后位 = 7; // :4350
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :4352
        await era.print(
          [
            `「嗯嗯～啊啊……狗狗的…进的好深呢♡♡…啊啊……嗯啊啊～♡」`,
            `「嗯啊啊～好烫啊……狗狗的肉棒♡……啊啊……嗯啊啊～♡」`,
            `「啊啊～好……好舒服～♡…狗狗好厉害啊…嗯啊……嗯啊啊～♡」`,
          ][rand_n(3)],
        ); // :4353-4357 PRINTDATAL
        await era.printAndWait(
          `即使是跟狗交配，但是沉醉在肉欲的${target_name}一点也不在乎的样子……`,
        ); // :4358
        kojo.背后位 = 6; // :4359
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.背后位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4361
        await era.print(
          [
            `「嗯嗯…啊…不…不可以射在里面……啊啊……嗯啊啊……」`,
            `「嗯啊啊…好烫…狗狗的肉棒…不…不……啊啊……嗯啊啊……」`,
            `「啊啊…太……太深了…狗狗…不…不可以…嗯…啊啊……」`,
          ][rand_n(3)],
        ); // :4362-4366 PRINTDATAL
        await era.printAndWait(`（为了魔王大人…就算…就算对象是狗…也……）`); // :4367
        await era.printAndWait(
          `${target_name}一边与狗交配，一边想着魔王大人的事情……`,
        ); // :4368
        kojo.背后位 = 5; // :4369
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4371
        await era.printAndWait(
          `「嗯嗯…啊…不…不……好奇怪…不要了……不……嗯啊啊……」`,
        ); // :4372
        await era.printAndWait(
          `明明是屈辱的兽交，${target_name}却不由自主地扭动着身体……`,
        ); // :4373
        kojo.背后位 = 4; // :4374
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4376
        await era.printAndWait(`「不……不要啊……饶了${sc()}了……唔……嗯啊啊……」`); // :4377
        await era.printAndWait(
          `雌伏在狗身下的${target_name}，发出了痛苦的呻吟……`,
        ); // :4378
        kojo.背后位 = 3; // :4379
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 == 2) {
        // :4381
        await era.print(
          [
            `「走开！去死啊！啊啊！啊啊啊！！」`,
            `「不！不要啊……住手！……啊啊啊！！」`,
            `「可恶！一定要杀了你！啊！啊啊啊！」`,
          ][rand_n(3)],
        ); // :4382-4386 PRINTDATAL
        await era.printAndWait(`被狗奸淫的${target_name}，发出了凄厉地悲鸣……`); // :4387
        kojo.背后位 = 2; // :4388
      } // :4387-4391
      return 0; // :4387-4393
    } // :4387-4395
  } // :4389-4395

  if (era_flag.selectcom == 27) {
    // :4397

    if (kojo.背后位肛交 == 0) {
      // :4399

      if (era0(`talent:${target}:136`) == 1) {
        // :4401
        await era.printAndWait(
          `「好的…好的…屁股也请狗狗大人宠幸吧…啊啊……嗯啊啊～♡」`,
        ); // :4402
        await era.printAndWait(
          `${target_name}兴奋地摇晃着屁股，就像是一条发情的母狗……`,
        ); // :4403
      } else if (era0(`talent:${target}:76`) == 1) {
        // :4405
        await era.printAndWait(`「跟狗狗肛交吗……没试过呢……也许很棒哦♡」`); // :4406
        await era.printAndWait(
          `${target_name}的双眼发光，露出了很感兴趣的表情……`,
        ); // :4407
      } else if (era0(`talent:${target}:85`) == 1) {
        // :4409
        await era.printAndWait(
          `「欸？…没…没事…可以哦……如果…魔王大人想…想看的话……」`,
        ); // :4410
        await era.printAndWait(`${target_name}低头温驯地听从了命令……`); // :4411
      } else {
        // :4412-4414
        await era.printAndWait(
          `「怎么可能！不！不要！去死……去死啊！啊啊啊！！」`,
        ); // :4414
        await era.printAndWait(
          `被强迫与狗肛交的${target_name}发出了崩溃似的嘶喊……`,
        ); // :4415
      } // :4415-4417
      kojo.背后位肛交 = 1; // :4417
      return 0; // :4415-4421
    } else {
      // :4419-4421

      if (
        era0(`talent:${target}:136`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :4422
        await era.print(
          [
            `「好棒♡……好棒啊……屁股…是…狗狗大人的形状了…啊啊……嗯啊啊～♡」`,
            `「嗯啊啊～狗狗大人的肉棒！…全都进来了♡…啊啊……嗯啊啊～♡」`,
            `「嗯啊啊！请…请在屁股里射精…留下记号吧♡……啊啊……嗯啊啊～♡」`,
          ][rand_n(3)],
        ); // :4423-4427 PRINTDATAL
        await era.printAndWait(
          `${target_name}流着口水双眼翻白，脑子除了狗狗的肉棒之外什么都不知道了……`,
        ); // :4428
        kojo.背后位肛交 = 7; // :4429
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :4431
        await era.print(
          [
            `「嗯嗯～啊啊……狗狗的…插进屁股里面了♡♡…啊啊……嗯啊啊～♡」`,
            `「嗯啊啊～好烫啊……狗狗的肉棒♡……啊啊……嗯啊啊～♡」`,
            `「啊啊～好……好舒服～♡…狗狗好厉害啊…嗯啊……嗯啊啊～♡」`,
          ][rand_n(3)],
        ); // :4432-4436 PRINTDATAL
        await era.printAndWait(
          `即使是跟狗肛交，但是沉醉在肉欲的${target_name}一点也不在乎的样子……`,
        ); // :4437
        kojo.背后位肛交 = 6; // :4438
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4440
        await era.print(
          [
            `「嗯嗯…啊…后面…好奇怪…不…不可以……啊啊……嗯啊啊……」`,
            `「嗯啊啊…好烫…狗狗的肉棒…不…不……啊啊……嗯啊啊……」`,
            `「啊啊…太……太深了…狗狗…不…不可以…嗯…啊啊……」`,
          ][rand_n(3)],
        ); // :4441-4445 PRINTDATAL
        await era.printAndWait(`（明明不是魔王大人…为…为什么会……）`); // :4446
        await era.printAndWait(
          `${target_name}一边与狗肛交，一边想着魔王大人的事情……`,
        ); // :4447
        kojo.背后位肛交 = 5; // :4448
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4450
        await era.print(
          [
            `「嗯嗯…啊…后面……啊啊……嗯啊啊……」`,
            `「嗯啊啊…进……进来了……啊啊……嗯啊啊……」`,
            `「啊啊…不……那里会……嗯…啊啊……」`,
          ][rand_n(3)],
        ); // :4451-4455 PRINTDATAL
        await era.printAndWait(`（为了魔王大人…就算…就算对象是狗…也……）`); // :4456
        await era.printAndWait(
          `${target_name}一边与狗肛交，一边想着魔王大人的事情……`,
        ); // :4457
        kojo.背后位肛交 = 4; // :4458
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4460
        await era.printAndWait(
          `「嗯嗯…啊…不…不……好奇怪…不要了……不……嗯啊啊……」`,
        ); // :4461
        await era.printAndWait(
          `明明是屈辱的兽交，${target_name}却不由自主地扭动着身体……`,
        ); // :4462
        kojo.背后位肛交 = 3; // :4463
      } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 == 2) {
        // :4465
        await era.print(
          [
            `「走开！去死啊！啊啊！啊啊啊！！」`,
            `「不！不要啊……住手！……啊啊啊！！」`,
            `「可恶！一定要杀了你！啊！啊啊啊！」`,
          ][rand_n(3)],
        ); // :4466-4470 PRINTDATAL
        await era.printAndWait(`被狗奸淫的${target_name}，发出了凄厉地悲鸣……`); // :4471
        kojo.背后位肛交 = 2; // :4472
      } // :4471-4475
      return 0; // :4471-4477
    } // :4471-4479
  } // :4473-4479

  if (era_flag.selectcom == 30) {
    // :4481

    if (kojo.手淫 == 0) {
      // :4483

      if (era0(`talent:${target}:76`) == 1) {
        // :4485
        await era.printAndWait(''); // :4486
      } else if (era0(`talent:${target}:85`) == 1) {
        // :4488
        await era.printAndWait(''); // :4489
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :4491
        await era.printAndWait(''); // :4492
      } else {
        // :4491-4497
        await era.printAndWait(''); // :4495
      } // :4495-4497
      kojo.手淫 = 1; // :4497
      return 0; // :4495-4501
    } else {
      // :4499-4501

      if (
        era0(`talent:${target}:136`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :4502
        if (rand_n(2) == 0) {
          // :4503
          await era.printAndWait(''); // :4504
        } else {
          // :4502-4508
          await era.printAndWait(''); // :4506
        } // :4506-4508
        kojo.手淫 = 7; // :4508
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :4510
        if (rand_n(2) == 0) {
          // :4511
          await era.printAndWait(''); // :4512
        } else {
          // :4510-4516
          await era.printAndWait(''); // :4514
        } // :4514-4516
        kojo.手淫 = 6; // :4516
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (kojo.手淫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4518
        if (rand_n(2) == 0) {
          // :4519
          await era.printAndWait(''); // :4520
        } else {
          // :4518-4524
          await era.printAndWait(''); // :4522
        } // :4522-4524
        kojo.手淫 = 5; // :4524
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4526
        await era.printAndWait(''); // :4527
        kojo.手淫 = 4; // :4528
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4530
        await era.printAndWait(''); // :4531
        kojo.手淫 = 3; // :4532
      } else if (kojo.手淫 <= 1 || game.kojo.口上开关 == 2) {
        // :4534
        await era.printAndWait(''); // :4535
        kojo.手淫 = 2; // :4536
      } // :4535-4539
      return 0; // :4535-4541
    } // :4535-4543
  } // :4537-4543

  if (era_flag.selectcom == 31) {
    // :4545

    if (kojo.口交_奴 == 0) {
      // :4547

      if (era0(`talent:${target}:76`) == 1) {
        // :4549
        await era.printAndWait(''); // :4550
      } else if (era0(`talent:${target}:85`) == 1) {
        // :4552
        await era.printAndWait(''); // :4553
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :4555
        await era.printAndWait(''); // :4556
      } else {
        // :4555-4561
        await era.printAndWait(''); // :4559
      } // :4559-4561
      kojo.口交_奴 = 1; // :4561
      return 0; // :4559-4565
    } else {
      // :4562-4566

      if (
        era0(`talent:${target}:136`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :4566
        await era.printAndWait(''); // :4567
        kojo.口交_奴 = 7; // :4568
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :4570
        await era.printAndWait(''); // :4571
        kojo.口交_奴 = 6; // :4572
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.口交_奴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4574
        await era.printAndWait(''); // :4575
        kojo.口交_奴 = 5; // :4576
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4578
        await era.print(''); // :4579
        await era.printAndWait(''); // :4580
        kojo.口交_奴 = 4; // :4581
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.口交_奴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4583
        await era.print(''); // :4584
        await era.printAndWait(''); // :4585
        kojo.口交_奴 = 3; // :4586
      } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 == 2) {
        // :4588
        await era.printAndWait(''); // :4589
        kojo.口交_奴 = 2; // :4590
      } // :4589-4593
      return 0; // :4589-4595
    } // :4589-4597
  } // :4591-4597

  if (era_flag.selectcom == 34) {
    // :4599

    if (kojo.骑乘位 == 0) {
      // :4601

      if (era0(`talent:${target}:0`) == 1) {
        // :4603

        if (era0(`talent:${target}:136`) == 1) {
          // :4605
          await era.printAndWait(''); // :4606
        } else if (era0(`talent:${target}:76`) == 1) {
          // :4608
          await era.printAndWait(''); // :4609
        } else if (era0(`talent:${target}:85`) == 1) {
          // :4611
          await era.printAndWait(''); // :4612
        } else {
          // :4611-4617
          await era.printAndWait(''); // :4615
        } // :4615-4617
      } else {
        // :4616-4620

        if (era0(`talent:${target}:136`) == 1) {
          // :4620
          await era.printAndWait(''); // :4621
        } else if (era0(`talent:${target}:76`) == 1) {
          // :4623
          await era.printAndWait(''); // :4624
        } else if (era0(`talent:${target}:85`) == 1) {
          // :4626
          await era.printAndWait(''); // :4627
        } else {
          // :4626-4632
          await era.printAndWait(''); // :4630
        } // :4629-4633
      } // :4630-4634
      kojo.骑乘位 = 1; // :4633
      return 0; // :4631-4637
    } else {
      // :4634-4638

      if (
        era0(`talent:${target}:136`) == 1 &&
        (kojo.骑乘位 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :4638
        if (rand_n(3) == 0) {
          // :4639
          await era.printAndWait(''); // :4640
        } else if (rand_n(2) == 0) {
          // :4641
          await era.printAndWait(''); // :4642
        } else {
          // :4640-4646
          await era.printAndWait(''); // :4644
        } // :4644-4646
        kojo.骑乘位 = 7; // :4646
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.骑乘位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :4648
        if (rand_n(4) == 0) {
          // :4649
          await era.printAndWait(''); // :4650
        } else if (rand_n(3) == 0) {
          // :4651
          await era.printAndWait(''); // :4652
        } else if (rand_n(2) == 0) {
          // :4653
          await era.printAndWait(''); // :4654
        } else {
          // :4652-4658
          await era.printAndWait(''); // :4656
        } // :4656-4658
        kojo.骑乘位 = 6; // :4658
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.骑乘位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4660
        if (rand_n(4) == 0) {
          // :4661
          await era.print(''); // :4662
        } else if (rand_n(3) == 0) {
          // :4663
          await era.printAndWait(''); // :4664
        } else if (rand_n(2) == 0) {
          // :4665
          await era.printAndWait(''); // :4666
        } else {
          // :4664-4670
          await era.printAndWait(''); // :4668
        } // :4668-4670
        kojo.骑乘位 = 5; // :4670
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (kojo.骑乘位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4672
        if (rand_n(4) == 0) {
          // :4673
          await era.printAndWait(''); // :4674
        } else if (rand_n(3) == 0) {
          // :4675
          await era.printAndWait(''); // :4676
        } else if (rand_n(2) == 0) {
          // :4677
          await era.printAndWait(''); // :4678
        } else {
          // :4676-4682
          await era.printAndWait(''); // :4680
        } // :4680-4682
        kojo.骑乘位 = 4; // :4682
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.骑乘位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4684
        await era.print(''); // :4685
        await era.printAndWait(''); // :4686
        kojo.骑乘位 = 3; // :4687
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        // :4689
        await era.printAndWait(''); // :4690
        kojo.骑乘位 = 2; // :4691
      } // :4690-4694
      return 0; // :4690-4696
    } // :4690-4698
  } // :4692-4698

  if (era_flag.selectcom == 37) {
    // :4700

    if (kojo.肛门侍奉 == 0) {
      // :4702

      if (era0(`abl:${target}:16`) >= 3) {
        // :4704
        await era.printAndWait(''); // :4705
      } else {
        // :4698-4716
        await era.printAndWait(''); // :4708
      } // :4698-4720
      kojo.肛门侍奉 = 1; // :4710
      return 0; // :4708-4714
    } else {
      // :4711-4715

      if (
        era0(`talent:${target}:136`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (kojo.肛门侍奉 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :4715
        await era.printAndWait(''); // :4716
        kojo.肛门侍奉 = 6; // :4717
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4719
        await era.printAndWait(''); // :4720
        kojo.肛门侍奉 = 5; // :4721
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4723
        await era.print(''); // :4724
        kojo.肛门侍奉 = 4; // :4725
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4727
        await era.printAndWait(''); // :4728
        kojo.肛门侍奉 = 3; // :4729
      } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 == 2) {
        // :4731
        await era.printAndWait(''); // :4732
        kojo.肛门侍奉 = 2; // :4733
      } // :4719-4749
      return 0; // :4719-4751
    } // :4732-4740
  } // :4734-4740

  if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`)) {
    // :4743

    if (kojo.眼罩 == 0) {
      // :4745

      if (era0(`talent:${target}:136`) == 1) {
        // :4747
        await era.printAndWait(''); // :4748
      } else if (era0(`talent:${target}:76`) == 1) {
        // :4750
        await era.printAndWait(''); // :4751
      } else if (era0(`talent:${target}:85`) == 1) {
        // :4753
        await era.printAndWait(''); // :4754
      } else {
        // :4747-4765
        await era.printAndWait(''); // :4757
      } // :4747-4769
      kojo.眼罩 = 1; // :4759
      return 0; // :4757-4763
    } else {
      // :4760-4764

      if (
        era0(`talent:${target}:136`) == 1 &&
        (kojo.眼罩 <= 9 || game.kojo.口上开关 == 2)
      ) {
        // :4764
        await era.printAndWait(''); // :4765
        kojo.眼罩 = 10; // :4766
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :4768
        await era.printAndWait(''); // :4769
        kojo.眼罩 = 9; // :4770
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :4772
        await era.printAndWait(''); // :4773
        kojo.眼罩 = 8; // :4774
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.眼罩 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :4776
        await era.printAndWait(''); // :4777
        kojo.眼罩 = 7; // :4778
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :4780
        await era.printAndWait(''); // :4781
        kojo.眼罩 = 6; // :4782
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4784
        await era.printAndWait(''); // :4785
        kojo.眼罩 = 5; // :4786
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.眼罩 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4788
        await era.printAndWait(''); // :4789
        kojo.眼罩 = 4; // :4790
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4792
        await era.printAndWait(''); // :4793
        kojo.眼罩 = 3; // :4794
      } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 == 2) {
        // :4796
        await era.printAndWait(''); // :4797
        kojo.眼罩 = 2; // :4798
      } // :4799-4804
      return 0; // :4800-4804
    } // :4798-4804
  } else if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`) == 0) {
    // :4803

    if (
      era0(`talent:${target}:136`) == 1 &&
      (kojo.肛门侍奉 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :4805
      await era.printAndWait(''); // :4806
      kojo.兽奸眼罩 = 4; // :4807
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.肛门侍奉 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :4809
      await era.printAndWait(''); // :4810
      kojo.兽奸眼罩 = 3; // :4811
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.肛门侍奉 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :4813
      await era.printAndWait(''); // :4814
      kojo.兽奸眼罩 = 2; // :4815
    } else if (kojo.兽奸眼罩 < 1 || game.kojo.口上开关 == 2) {
      // :4817
      await era.printAndWait(''); // :4818
      kojo.兽奸眼罩 = 1; // :4819
    } // :4819-4821
    return 0; // :4819-4823
  } // :4819-4825

  if (era_flag.selectcom == 56) {
    // :4828

    if (kojo.交谈 == 0) {
      // :4830
      if (era0(`tequip:${target}:53`)) {
        // :4831

        if (era0(`talent:${target}:136`) == 1) {
          // :4834
          await era.printAndWait(
            `「啊！终于要开拍了吗？这个地方已经等不及想被狗狗射精了呢！」`,
          ); // :4835
          await era.printAndWait(
            `「那么，请大家好好观赏${sc()}跟狗狗的爱爱哦！」`,
          ); // :4836
          await era.printAndWait(
            `${target_name}四肢着地趴在地板上摇晃着屁股，简直就像是条发情的母狗……`,
          ); // :4837
        } else if (era0(`talent:${target}:76`) == 1) {
          // :4839
          await era.printAndWait(
            `「普通的做爱影像相信各位观众也都看腻了吧？」`,
          ); // :4840
          await era.printAndWait(
            `「那么，接下来就好好期待人狗交配的场景哦！」`,
          ); // :4841
          await era.printAndWait(
            `${target_name}露出期待的表情，像是迫不及待地舔了舔嘴唇……`,
          ); // :4842
        } else if (era0(`talent:${target}:85`) == 1) {
          // :4844
          await era.printAndWait(
            `「如果……魔王大人开心的话…就算是……跟狗……也……」`,
          ); // :4845
          await era.printAndWait(
            `${target_name}低下头来掩饰自己的表情，配合地说着自${sc()}介绍的台词……`,
          ); // :4846
        } else {
          // :4847-4849
          await era.printAndWait(`「可恶……别拍！变态！去死啊！」`); // :4849
          await era.printAndWait(
            `${target_name}十分抗拒被拍摄这件事，愤怒的怒吼着……`,
          ); // :4850
        } // :4850-4852
      } // :4850-4854
      kojo.交谈 = 1; // :4853
      return 0; // :4850-4858
    } else {
      // :4853-4859
      if (era0(`tequip:${target}:53`)) {
        // :4857

        if (
          era0(`talent:${target}:136`) == 1 &&
          (kojo.交谈 <= 4 || game.kojo.口上开关 == 2)
        ) {
          // :4860
          await era.printAndWait(
            `「嘿嘿～跟狗狗交配很舒服哦～只要试过就上瘾了呢♡」`,
          ); // :4861
          await era.printAndWait(
            `${target_name}露出痴迷的表情，像条母狗一样不停地摇摆着屁股……`,
          ); // :4862
          kojo.交谈 = 5; // :4863
        } else if (
          era0(`talent:${target}:76`) == 1 &&
          (kojo.交谈 <= 3 || game.kojo.口上开关 == 2)
        ) {
          // :4865
          await era.printAndWait(
            `「偶而换换不同的种族交配也很有意思喔！请尽情地观赏吧♡」`,
          ); // :4866
          await era.printAndWait(
            `「如果大家喜欢这次影像的话，那${sc()}会很开心的呢～」`,
          ); // :4867
          await era.printAndWait(
            `${target_name}摆出诱惑的姿势，熟练地说着介绍的台词……`,
          ); // :4868
          kojo.交谈 = 4; // :4869
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          (kojo.交谈 <= 2 || game.kojo.口上开关 == 2)
        ) {
          // :4871
          await era.printAndWait(
            `「魔王大人……喜欢这种影像吗？那么……${sc()}也……会努力的……」`,
          ); // :4872
          await era.printAndWait(
            `${target_name}露出了微笑，流畅地说着介绍的台词……`,
          ); // :4873
          kojo.交谈 = 3; // :4874
        } else if (kojo.交谈 <= 1 || game.kojo.口上开关 == 2) {
          // :4876
          await era.printAndWait(
            `「这种变态行为还要${sc()}说什么？可以请你去死吗？」`,
          ); // :4877
          await era.printAndWait(
            `${target_name}因为怒气腾腾，对着水晶球恶言恶语着……`,
          ); // :4878
          kojo.交谈 = 2; // :4879
        } // :4878-4882
      } // :4878-4884
      return 0; // :4878-4886
    } // :4879-4887
  } // :4879-4888

  return 0; // :4879-4888
}

/**
 * @COLOSSEUM_KOJO_15（:5796 起）：死斗场本地函数（非 family 分发，由
 * kojo_message_com_15 头部守卫 TEQUIP:55 直接调用）。
 *
 * @returns {Promise<number>} 0
 */
async function colosseum_kojo_15() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const assi = era_flag.assi;
  const assi_name = chara_callname(assi); // %SAVESTR:ASSI%
  const sc = () => self_call(target); // %SELF_CALL(A)%：EVENT_K 分发前 TARGET=A（#233）

  if (era_flag.selectcom == 55) {
    // :5800

    if (era0(`base:${target}:1`) <= 0) {
      // :5802
      await era.printAndWait(
        `${target_name}摇摇晃晃地站着，好像随时会倒下的样子……`,
      ); // :5803
    } else {
      // :5803-5805
      await era.printAndWait(
        `${target_name}强行让自己冷静下来，试图摆脱死斗场气氛的影响……`,
      ); // :5805
    } // :5805-5807
    return 0; // :5805-5809
  } // :5806-5810

  if (era_flag.selectcom == 56) {
    // :5812

    if (era0(`base:${target}:1`) <= 0) {
      // :5814

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :5816
        await era.printAndWait(`「${assi_name}，这种打斗有意义吗？」`); // :5817
        await era.printAndWait(
          `${target_name}已经筋疲力尽，露出了无奈的表情……`,
        ); // :5818
      } else {
        // :5818-5820
        await era.printAndWait(`「居……居然……要被这种怪物……不！」`); // :5820
        await era.printAndWait(
          `一想到呆会可能会发生的景象，筋疲力尽的${target_name}挣扎地想要离开这里……`,
        ); // :5821
      } // :5821-5823
    } else {
      // :5822-5824

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :5825
        await era.printAndWait(`「${assi_name}，是你要作为${sc()}的对手吗？」`); // :5826
        await era.printAndWait(
          `${target_name}露出疑惑的表情，看着${assi_name}……`,
        ); // :5827
      } else {
        // :5827-5829
        await era.printAndWait(`「开什么玩笑？要跟这种怪物打斗？」`); // :5829
        await era.printAndWait(
          `${target_name}看着对面蠢蠢欲动的怪物，不由自主地皱起了眉头……`,
        ); // :5830
      } // :5830-5832
    } // :5830-5834
    return 0; // :5830-5836
  } // :5831-5837

  if (era_flag.selectcom == 31) {
    // :5839

    if (era_flag.assi > 0 && era_flag.assiplay) {
      // :5841
      await era.printAndWait(`「不…唔……唔唔……嗯……啊……不！呜！」`); // :5842
      await era.print(`${assi_name}粗暴地拉起${target_name}的头发，得意地用`); // :5843
      if (era0(`talent:${assi}:121`) == 1 || era0(`talent:${assi}:122`) == 1) {
        await era.print(`阴茎`); // :5845
      } // :5845
      if (
        era0(`talent:${assi}:121`) != 1 &&
        era0(`talent:${assi}:122`) != 1 &&
        era0('item:PBAND') == 1
      ) {
        await era.print(`假阳具`); // :5847
      } // :5847
      await era.printAndWait(`侵犯着对方的口腔……`); // :5848
    } else {
      // :5848-5850
      await era.printAndWait(`「不…唔……唔唔……嗯……啊……不！呜！」`); // :5850
      await era.printAndWait(
        `无力反抗的${target_name}，嘴巴正被怪物们腥臭的肉棒侵犯着……`,
      ); // :5851
    } // :5851-5853
    return 0; // :5851-5855
  } // :5852-5856

  if (era_flag.selectcom == 5) {
    // :5858

    if (era_flag.assi > 0 && era_flag.assiplay) {
      // :5860
      await era.printAndWait(`「放…放手！……啊！……不……别摸了！……呜！」`); // :5861
      await era.printAndWait(
        `${assi_name}像是展示那样，故意粗暴地揉捏着${target_name}的乳房……`,
      ); // :5862
    } else {
      // :5862-5864
      await era.printAndWait(`「放…放手！……啊！……真……真是恶心！……呜！」`); // :5864
      await era.printAndWait(
        `无力反抗的${target_name}，那柔软的乳房正被怪物们揉捏成各种形状……`,
      ); // :5865
    } // :5865-5867
    return 0; // :5865-5869
  } // :5866-5870

  if (era_flag.selectcom == 21) {
    // :5872

    if (era_flag.assi > 0 && era_flag.assiplay) {
      // :5874
      await era.printAndWait(`「不！不要再插进来了！唔！不……不要啊！！」`); // :5875
      await era.printAndWait(
        `无视${target_name}的悲鸣，${assi_name}毫不留情地用力摆动着胯部抽插着……`,
      ); // :5876
    } else if (game.train.死斗场敌种 == 206) {
      // :5878
      await era.printAndWait(`「不！不要啊！啊啊啊！！坏…坏掉了…啊啊啊！！」`); // :5879
      await era.printAndWait(
        `${target_name}发出凄厉的惨叫，肚子鼓成了巨人肉棒的形状……`,
      ); // :5880
    } else {
      // :5879-5883
      await era.printAndWait(
        `「不！不要啊！痛！不……不行……不要射在里面……啊啊啊！！」`,
      ); // :5882
      await era.printAndWait(
        `${target_name}的蜜穴被怪物凌虐着，腥臭的精液源源不断地灌进子宫深处的地方……`,
      ); // :5883
    } // :5883-5885
    return 0; // :5883-5887
  } // :5883-5889

  if (era_flag.selectcom == 27) {
    // :5891

    if (era_flag.assi > 0 && era_flag.assiplay) {
      // :5893
      await era.printAndWait(`「不！不要再插进来了！唔！不……不要啊！！」`); // :5894
      await era.printAndWait(
        `无视${target_name}的悲鸣，${assi_name}毫不留情地用力摆动着胯部抽插着……`,
      ); // :5895
    } else if (game.train.死斗场敌种 == 206) {
      // :5897
      await era.printAndWait(`「不！不要啊！啊啊啊！！坏…坏掉了…啊啊啊！！」`); // :5898
      await era.printAndWait(
        `${target_name}发出凄厉的惨叫，肚子鼓成了巨人肉棒的形状……`,
      ); // :5899
    } else {
      // :5898-5902
      await era.printAndWait(
        `「不！不要啊！痛！不……不行……不要射在里面……啊啊啊！！」`,
      ); // :5901
      await era.printAndWait(
        `${target_name}的肛穴被怪物凌虐着，腥臭的精液源源不断地灌进直肠深处的地方……`,
      ); // :5902
    } // :5902-5904
    return 0; // :5902-5906
  } // :5902-5908

  if (era_flag.selectcom == 51) {
    // :5910
    await era.printAndWait(`「身体……好……好热！……难道是……媚药？不！啊啊～」`); // :5911
    return 0; // :5911-5913
  } // :5911-5915

  return 0; // :5912-5919
}

/**
 * @KOJO_MESSAGE_COM_15（:406 起）：指令口上。本切片落地四道头部守卫 +
 * SELECTCOM 0–87；DOG / COLOSSEUM 全量已落地。其余随后续切片。
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0
 */
async function kojo_message_com_15(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const master_name = chara_name(0); // %NAME:MASTER%
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%
  const kojo = chara(target).kojo;

  if (era0(`tequip:${target}:45`) && era_flag.selectcom != 45) {
    return 0; // :411-412
  } // :411-412
  if (game.train.失神) {
    // :414-415 TFLAG:899（跨域读走门面）
    return 0; // :414-415
  } // :414-415
  if (era0(`tequip:${target}:89`)) {
    // :417
    await dog_kojo_15(rand_n); // :418 CALL DOG_KOJO_15
    return 0; // :418-419
  } // :420-421
  if (era0(`tequip:${target}:55`)) {
    // :422
    await colosseum_kojo_15(rand_n); // :423 CALL COLOSSEUM_KOJO_15
    return 0; // :423-424
  } // :423-425

  if (era_flag.selectcom == 0) {
    // :431-433
    if (kojo.爱抚 == 0) {
      // :435-438
      if (era0(`mark:${target}:2`) >= 2) {
        // :437-438
        await era.printAndWait(`「不……不要摸……唔……」`); // :438
        await era.printAndWait(
          `${target_name}闭起眼睛，咬牙地忍耐着身体浮现的感觉……`,
        ); // :439
      } else {
        // :441-443

        await era.printAndWait(`「这样触碰的话，除了恶心之外没有其他感觉。」`); // :442
        await era.printAndWait(
          `${target_name}似乎很厌恶被触摸的样子，露出了嫌弃的表情……`,
        ); // :443
      } // :443-444
      kojo.爱抚 = 1; // :443-445
      return 0; // :443-446
    } else {
      // :448-450

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :450
        await era.print(
          [
            `「啊……好…好舒服……这样子……摸的话…会…会很快高潮的…嗯…啊啊～♡」`,
            `「啊……嗯啊啊～身体好热……变得好想要了呢～♡」`,
          ][rand_n(2)],
        ); // :451-454 PRINTDATAL
        await era.printAndWait(
          `${target_name}的眼角染上情欲的红晕，主动将身体贴近${player_name}了……`,
        ); // :455
        kojo.爱抚 = 6; // :455-456
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 == 2) &&
        !era_flag.assiplay
      ) {
        // :458
        await era.print(
          [
            `「嗯……好…好舒服……请随意地……抚摸……嗯…啊啊～♡」`,
            `「啊……嗯啊啊～身体好热……好喜欢被这样子抚摸～♡」`,
          ][rand_n(2)],
        ); // :459-462 PRINTDATAL
        await era.printAndWait(
          `${target_name}的双颊晕红，主动将身体贴近${player_name}了……`,
        ); // :463
        kojo.爱抚 = 5; // :463-464
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :466-467
        await era.printAndWait(`「啊！……啊……嗯啊！……这种感觉……唔！」`); // :467
        await era.printAndWait(
          `${target_name}的脸颊带着可疑的红晕，似乎无法承受${player_name}的动作……`,
        ); // :468
        kojo.爱抚 = 4; // :468-469
      } else if (
        era0(`mark:${target}:2`) == 2 &&
        (kojo.爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :471-472
        await era.printAndWait(`「不……就算是这样……也是没有用的……唔！」`); // :472
        await era.printAndWait(
          `${target_name}咬紧牙关，转过头去忍耐着${player_name}的动作……`,
        ); // :473
        kojo.爱抚 = 3; // :473-474
      } else if (
        era0(`mark:${target}:2`) <= 1 &&
        (kojo.爱抚 <= 1 || game.kojo.口上开关 == 2)
      ) {
        // :476-478
        await era.print(
          [
            `「住手！这么摸很恶心……不……」`,
            `「技术这么差！难道没有自觉吗？」`,
            `「一点也不舒服！可以劳驾您把脏手拿开吗？」`,
          ][rand_n(3)],
        ); // :477-481 PRINTDATAL
        await era.printAndWait(`${target_name}皱着眉头，露出了厌恶的表情……`); // :482
        kojo.爱抚 = 2; // :482-483
      } // :482-484
      return 0; // :482-485
    } // :482-486
  } // :487-490

  if (era_flag.selectcom == 1) {
    // :492-497
    if (kojo.舔阴 == 0) {
      // :492-497
      if (era0(`talent:${target}:0`) == 1) {
        // :495-497
        await era.printAndWait(`「走…走开啊！这……这…真是不敢相信！」`); // :497
        await era.printAndWait(
          `${target_name}似乎没想过会有人做出这种行为，露出了愤怒又觉得不可思议的表情……`,
        ); // :498
      } else {
        // :499-501
        await era.printAndWait(`「不！居…居然……离${sc()}远点啊！走开！」`); // :501
        await era.printAndWait(
          `${player_name}的行为让${target_name}羞愤异常地怒吼着……`,
        ); // :502
      } // :502-503
      kojo.舔阴 = 1; // :502-505
      return 0; // :502-507
    } else {
      // :505-509
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.舔阴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :509
        await era.printAndWait(
          `「里面……都……都湿答答的了……舌头……再……进去一点……啊啊～♡」`,
        ); // :510
        await era.printAndWait(
          `从下身传来的快感，让情欲高涨的${target_name}发出了淫荡的呻吟……`,
        ); // :511
        kojo.舔阴 = 5; // :511-512
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.舔阴 <= 3 || game.kojo.口上开关 == 2) &&
        !era_flag.assiplay
      ) {
        // :514
        await era.printAndWait(
          `「这样…会…会流出来的呀…嗯……啊啊♡……真是坏心眼」`,
        ); // :515
        await era.printAndWait(
          `从下身传来的快感，让${target_name}不由自主地发出了动情的呻吟……`,
        ); // :516
        kojo.舔阴 = 4; // :516-517
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.舔阴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :518-520
        await era.printAndWait(`「唔！那…那个地方……不！不要……啊！啊啊！」`); // :520
        await era.printAndWait(
          `从下身传来的羞耻感，让${target_name}面色通红地扭动着身体……`,
        ); // :521
        kojo.舔阴 = 3; // :521-522
      } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 == 2) {
        // :523-525
        await era.print(
          [
            `「恶心死了！滚开啊！」`,
            `「不要！可恶！走开啊！听不懂人话吗！」`,
            `「可恶！做的事情真是令人作呕！」`,
          ][rand_n(3)],
        ); // :525-529 PRINTDATAL
        await era.printAndWait(`${target_name}羞愤异常地怒吼着……`); // :530
        kojo.舔阴 = 2; // :530-531
      } // :530-533
      return 0; // :530-535
    } // :525-538
  } // :532-538

  if (era_flag.selectcom == 2) {
    // :540
    if (kojo.肛门爱抚 == 0) {
      // :542
      await era.printAndWait(`「你……你……在摸哪里？居然……不！……住手啊！」`); // :543
      await era.printAndWait(
        `${target_name}先是呆愣了一下，后来马上羞愤地怒吼着……`,
      ); // :544
      kojo.肛门爱抚 = 1; // :545
      return 0; // :545-546
    } else {
      // :547-549
      const P =
        (era.get(`palam:${target}:3`) || 0) +
        (era.get(`delta:${target}:3`) || 0); // :548-549 PALAM:3 + UP:3
      if (
        era0(`talent:${target}:76`) == 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :551
        await era.printAndWait(
          `「啊！啊…不够…嗯……啊啊♡…还想要更多！快点！弄坏${sc()}吧♡♡…啊～♡」`,
        ); // :552
        await era.printAndWait(
          `${target_name}那湿润的后穴就像是调教好的性器，饥渴地收缩着，似乎想要被更巨大的东西侵犯……`,
        ); // :553
        kojo.肛门爱抚 = 7; // :554
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        P < PALAMLV[2] &&
        (kojo.肛门爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :556
        await era.printAndWait(`「啊！手指…再伸进来一点…嗯……啊啊♡……啊～♡」`); // :557
        await era.printAndWait(
          `即使是尚未完全润滑好的后穴，也让${target_name}发出了淫荡的呻吟……`,
        ); // :558
        kojo.肛门爱抚 = 6; // :559
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 4 || game.kojo.口上开关 == 2) &&
        !era_flag.assiplay
      ) {
        // :561
        await era.printAndWait(
          `「啊～在…里面搅动着♡…嗯……啊啊♡……别这样欺负${sc()}啊～♡」`,
        ); // :562
        await era.printAndWait(
          `从后孔传来的快感，让${target_name}不由自主地发出了动情的呻吟……`,
        ); // :563
        kojo.肛门爱抚 = 5; // :564
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        P < PALAMLV[2] &&
        (kojo.肛门爱抚 <= 3 || game.kojo.口上开关 == 2) &&
        !era_flag.assiplay
      ) {
        // :566
        await era.printAndWait(
          `「虽然…里面还没有很湿……啊…这种感觉……好奇怪啊～♡」`,
        ); // :567
        await era.printAndWait(
          `即使是尚未完全润滑好的后穴，也似乎让${target_name}渐渐有了感觉……`,
        ); // :568
        kojo.肛门爱抚 = 4; // :569
      } else if (
        P >= PALAMLV[2] &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.肛门爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :571
        await era.printAndWait(`「唔！那…那个地方……不！不要……啊！啊啊！」`); // :572
        await era.printAndWait(
          `从下身传来的羞耻感，让${target_name}面色通红地扭动着身体……`,
        ); // :573
        kojo.肛门爱抚 = 3; // :574
      } else if (kojo.首次耻情Lv2 <= 1 || game.kojo.口上开关 == 2) {
        // :576 源读 CFLAG:223，不是 303——1:1 保留
        await era.print(
          [
            `「恶心死了！这么喜欢屁股的话，不会摸你自己的吗！」`,
            `「不要！可恶！走开啊！听不懂人话吗！」`,
            `「可恶！做的事情真是令人作呕！」`,
            `「为何要摸这种地方？简直变态！」`,
            `「对这个地方有兴趣？真不愧是变态中的翘楚呢！」`,
          ][rand_n(5)],
        ); // :577-583 PRINTDATAL
        await era.printAndWait(`${target_name}羞愤异常地怒吼着……`); // :584
        kojo.肛门爱抚 = 2; // :585
      } // :585-586
      return 0; // :585-588
    } // :585-590
  } // :586-592

  if (era_flag.selectcom == 3) {
    // :594
    if (kojo.自慰 == 0) {
      // :596
      await era.printAndWait(`「什……什么？真是不敢相信！怎么会有这种要求……」`); // :597
      await era.printAndWait(`「看来魔界的字典是没有『羞耻』这两个字对吧？」`); // :598
      await era.printAndWait(
        `「可恶！${sc()}……${sc()}……居然要……呜……嗯……唔……」`,
      ); // :599
      await era.printAndWait(
        `${target_name}笨拙地抚摸着自己的下身，露出了屈辱的表情……`,
      ); // :600
      kojo.自慰 = 1; // :601
      return 0; // :601-602
    } else {
      // :603-605
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`talent:${target}:0`) == 1 &&
        (kojo.自慰 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :606
        await era.printAndWait(
          `「虽然还没开苞…但…但是……您看？这里……湿的不像样了♡…嗯啊…啊…啊啊♡♡！」`,
        ); // :607
        await era.printAndWait(
          `${target_name}明明还是处女，却淫荡豪放地张开了大腿……`,
        ); // :608
        kojo.自慰 = 9; // :609
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:31`) >= 3 &&
        (kojo.自慰 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :611
        if (rand_n(2)) {
          // :612-614
          await era.printAndWait(
            `「被人看着自慰……真是太棒了♡…嗯啊…啊…啊啊♡♡！」`,
          ); // :614
        } else {
          // :614-615
          await era.printAndWait(
            `「看啊！…这个…地方都不知廉耻地…流出蜜汁了♡…嗯啊…啊啊♡♡！」`,
          ); // :616
        } // :616-617
        await era.printAndWait(
          `${target_name}深怕别人看不清楚自己发情的样子，夸张地张开了大腿并淫荡地呻吟着……`,
        ); // :618
        kojo.自慰 = 8; // :619
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:31`) < 3 &&
        (kojo.自慰 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :621
        if (rand_n(2)) {
          // :622-624
          await era.printAndWait(
            `「看见了吗？下面的样子♡嗯～啊啊～但是好像不够呢？想要……好想要啊啊♡♡！」`,
          ); // :624
        } else {
          // :624-625
          await era.printAndWait(
            `「肉棒不进来吗？要${sc()}自己来什么的……真是坏心眼啊！唔！嗯嗯！啊啊啊♡♡！」`,
          ); // :626
        } // :626-627
        await era.printAndWait(
          `${target_name}虽然想要的不是这个，但是还是听话地自慰了起来……`,
        ); // :628
        kojo.自慰 = 7; // :629
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`talent:${target}:0`) == 1 &&
        (kojo.自慰 <= 5 || game.kojo.口上开关 == 2) &&
        !era_flag.assiplay
      ) {
        // :631
        await era.printAndWait(
          `「这……这么羞耻的样子…如果想看的话…嗯啊…啊…啊啊♡♡！」`,
        ); // :632
        await era.printAndWait(
          `${target_name}明明还是处女，却仍面红耳赤地张开了大腿……`,
        ); // :633
        kojo.自慰 = 6; // :634
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:31`) >= 3 &&
        (kojo.自慰 <= 4 || game.kojo.口上开关 == 2) &&
        !era_flag.assiplay
      ) {
        // :636
        if (rand_n(2)) {
          // :637-639
          await era.printAndWait(
            `「嗯～♡啊啊……看到了吗…已经这么湿……满手……都是♡♡……嗯啊～啊…啊啊♡♡！」`,
          ); // :639
        } else {
          // :639-640
          await era.printAndWait(
            `「看……看清楚了吗……${sc()}……自慰着发情的样子♡♡……嗯啊～啊…啊啊♡♡！」`,
          ); // :641
        } // :641-642
        await era.printAndWait(
          `${target_name}急促地喘息着，似乎沉醉在自慰的快感里面了……`,
        ); // :643
        kojo.自慰 = 5; // :644
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:31`) < 3 &&
        (kojo.自慰 <= 3 || game.kojo.口上开关 == 2) &&
        !era_flag.assiplay
      ) {
        // :646
        if (rand_n(2) == 0) {
          // :647-649
          await era.printAndWait(
            `「就……就这么喜欢看…${sc()}……羞耻的样子吗？…嗯啊…啊…啊啊♡♡！」`,
          ); // :649
        } else {
          // :649-650
          await era.printAndWait(
            `「这……这里…能看清楚吗？……可……可以吗……唔！啊啊！啊啊♡♡！」`,
          ); // :651
        } // :651-652
        await era.printAndWait(
          `${target_name}虽然面红耳赤，但是还是柔顺地张开了大腿……`,
        ); // :653
        kojo.自慰 = 4; // :654
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:31`) >= 1 &&
        (kojo.自慰 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :656
        if (rand_n(2) == 0) {
          // :657-659
          await era.printAndWait(`「呜……不……这个样子……嗯…啊…啊啊！」`); // :659
        } else {
          // :659-660
          await era.printAndWait(`「不……为什么会…唔！……嗯…啊…啊啊！」`); // :661
        } // :661-662
        await era.printAndWait(
          `${target_name}似乎因为自慰而有了感觉，面红耳赤地闭起了眼睛……`,
        ); // :663
        kojo.自慰 = 3; // :664
      } else if (kojo.自慰 <= 1 || game.kojo.口上开关 == 2) {
        // :666
        if (rand_n(2) == 0) {
          // :667-669
          await era.printAndWait(`「喜欢看这种事情？果然真是有病！嗯……唔！」`); // :669
        } else {
          // :669-670
          await era.printAndWait(
            `「无须劳烦您的尊驾，${sc()}自己来好多了！嗯……唔！」`,
          ); // :671
        } // :671-672
        await era.printAndWait(
          `${target_name}一边不满地抗议，一边羞愤地进行着自慰……`,
        ); // :673
        kojo.自慰 = 2; // :674
      } // :674-675
      return 0; // :674-677
    } // :674-679
  } // :675-681

  if (era_flag.selectcom == 5) {
    // :681-684
    if (kojo.胸爱抚 == 0) {
      // :683-687
      if (era0(`talent:${target}:85`) == 1 && !era_flag.assiplay) {
        // :687
        await era.printAndWait(
          `「有…有点害羞……但是……很舒服……请再……再……嗯…啊啊！」`,
        ); // :688
        await era.printAndWait(
          `${target_name}的耳根羞红，顺从地任由${player_name}的双手在胸部上游移……`,
        ); // :689
      } else {
        // :690-692
        await era.printAndWait(
          `「这…这种痴汉似的举动……可真……配得上你的身份啊！……唔！」`,
        ); // :692
        await era.printAndWait(
          `${target_name}咬牙切齿地说着…只可惜那断断续续的语句早没有了威吓的效果……`,
        ); // :693
      } // :693-694
      kojo.胸爱抚 = 1; // :693-696
      return 0; // :693-698
    } else {
      // :696-700
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :700
        await era.printAndWait(
          `「嗯…啊啊……好……好棒……再……用力……用力……嗯～啊啊♡♡！」`,
        ); // :701
        await era.printAndWait(
          `${target_name}那柔软的胸部被任意搓揉着，随着传来的快感发出了高亢的呻吟……`,
        ); // :702
        kojo.胸爱抚 = 5; // :702-703
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2) &&
        era_flag.assiplay
      ) {
        // :705
        await era.printAndWait(`「嗯…啊啊……唔！……嗯……啊……」`); // :706
        await era.printAndWait(
          `${target_name}在${master_name}的注视之下，被${player_name}玩弄着胸部……`,
        ); // :707
        await era.printAndWait(
          `尽管努力地忍耐着不想发出声音，但是无奈身体的快感太过强烈，还是泄露出来呻吟的声音……`,
        ); // :708
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :708-709
        await era.printAndWait(
          `「嗯…啊啊……很…很舒服……嗯……想…还想要……嗯～啊啊♡♡！」`,
        ); // :710
        await era.printAndWait(
          `${target_name}满面红晕地看着${player_name}的动作，发出了急促的喘息……`,
        ); // :711
        kojo.胸爱抚 = 4; // :711-712
      } else if (
        era0(`abl:${target}:1`) >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :713-715
        await era.print(
          [
            `「不！不要再捏乳头了！会……唔～嗯……啊啊啊～」`,
            `「不！不要再揉胸部了！会……唔～嗯……啊啊啊～」`,
          ][rand_n(2)],
        ); // :715-718 PRINTDATAL
        await era.print(
          [
            `${target_name}扭动着身体想要抵抗那异样的快感……`,
            `揉捏胸部似乎让${target_name}非常有感觉的样子……`,
          ][rand_n(2)],
        ); // :719-722 PRINTDATAL
        kojo.胸爱抚 = 3; // :722-723
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        // :724-726
        await era.print(
          [
            `「不要！可恶！走开啊！听不懂人话吗！」`,
            `「可恶！做的事情真是令人作呕！」`,
            `「脏死了！不要碰${sc()}！」`,
            `「住手！恶心死了！」`,
          ][rand_n(4)],
        ); // :726-731 PRINTDATAL
        await era.printAndWait(`${target_name}羞愤异常地怒吼着……`); // :732
        kojo.胸爱抚 = 2; // :732-733
      } // :732-735
      return 0; // :732-737
    } // :732-739
  } // :734-740

  if (era_flag.selectcom == 6) {
    // :740-743
    if (kojo.接吻 == 0 && game.train.初吻与自我口上) {
      // :743-745
      if (
        era0(`talent:${target}:76`) == 1 &&
        era_flag.assiplay == 0 &&
        era0(`tequip:${target}:89`) == 0 &&
        era0(`tequip:${target}:90`) == 0
      ) {
        // :746
        await era.printAndWait(
          `「啾！嗯～早就想跟主人接吻了～果然…主人是最棒的♡」`,
        ); // :747
        await era.printAndWait(
          `${target_name}像是意犹未尽的舔着嘴唇，但是眼神却游移地看着${player_name}，似乎还想要更『刺激』的东西……`,
        ); // :748
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era_flag.assiplay == 0 &&
        era0(`tequip:${target}:89`) == 0 &&
        era0(`tequip:${target}:90`) == 0
      ) {
        // :750
        await era.printAndWait(
          `「啾！嗯～早就想跟主人接吻了～果然…真的好幸福呢♡」`,
        ); // :751
        await era.printAndWait(
          `${target_name}满足地眯起了眼睛，露出幸福的表情倚靠在${player_name}的身上……`,
        ); // :752
      } else {
        // :753-755
        await era.printAndWait(`「嗯……不！…别……可恶！……恶……恶心！」`); // :755
        await era.printAndWait(
          `${target_name}拼命地想把头转过去，然而下巴却被${player_name}紧紧捏住而无法躲避，就这样子被夺走了初吻……`,
        ); // :756
        await era.printAndWait(
          `「是不是没人想跟你接吻，所以只能用强迫的手段？真是卑劣！」`,
        ); // :757
        await era.print(`${target_name}`); // :758
        if (!era0(`tequip:${target}:44`)) {
          await era.print(`像擦拭什么脏东西那样，用力地用手模擦着自己的嘴唇，`); // :760
        } // :760
        await era.printAndWait(`恼怒地说着挑衅着话语……`); // :761
      } // :761-762
      kojo.接吻 = 1; // :761-764
      return 0; // :761-766
    } else if (kojo.接吻 == 0) {
      // :765-767
      if (era0(`talent:${target}:76`) == 1) {
        // :767-769
        await era.printAndWait(
          `「嗯…咕啾…啊啊…舌……舌头♡……嗯……好…好棒～嗯啊♡♡」`,
        ); // :769
        await era.printAndWait(
          `${target_name}任由${player_name}的舌头深入口腔中肆虐，激烈的亲吻让银丝从嘴角流下……`,
        ); // :770
      } else if (era0(`talent:${target}:85`) == 1 && era_flag.assiplay) {
        // :772
        await era.printAndWait(`「如果……这是主人……的命令…唔…唔…嗯…嗯」`); // :773
        await era.printAndWait(`${target_name}顺从与${player_name}亲吻着……`); // :774
      } else if (era0(`talent:${target}:85`) == 1) {
        // :774-775
        await era.printAndWait(`「嗯……啊……嗯嗯～啾♡～啊～嘻嘻…好高兴…♡♡」`); // :776
        await era.printAndWait(
          `${target_name}面带红晕，高兴地眯起了眼睛，沉醉在与${player_name}的亲吻之中……`,
        ); // :777
      } else {
        // :778-780
        await era.printAndWait(`「谁要跟你这种……唔！…不……唔……」`); // :780
        await era.printAndWait(
          `${target_name}非常抗拒${player_name}亲吻的样子……`,
        ); // :781
      } // :781-782
      kojo.接吻 = 1; // :781-784
      return 0; // :781-786
    } else {
      // :784-788
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.接吻 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :788
        await era.printAndWait(
          `「嗯～啊………好……好棒♡……还……还要……啾～咕啾～嗯…～嗯啊♡♡」`,
        ); // :789
        if (era0(`tequip:${target}:44`)) {
          // :790
          await era.printAndWait(
            `${target_name}积极地伸出舌头与${player_name}交缠着，饥渴地与对方交换着唾液……`,
          ); // :791
        } else {
          // :791-792
          await era.printAndWait(
            `${target_name}积极地伸出舌头与${player_name}交缠着，双手在对方身上激烈的抚弄着……`,
          ); // :793
        } // :793-794
        kojo.接吻 = 5; // :794-795
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.接吻 <= 3 || game.kojo.口上开关 == 2) &&
        era_flag.assiplay
      ) {
        // :797
        await era.printAndWait(`「嗯…啊…这……唔……啾……唔…」`); // :798
        await era.printAndWait(`（这样子做……主人会开心吗……？）`); // :799
        await era.printAndWait(
          `${target_name}心神不宁地想着${master_name}的事情，顺从与${player_name}亲吻着……`,
        ); // :800
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.接吻 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :800-801
        await era.printAndWait(`「嗯…啊……喜……喜欢♡……啾……好……幸福♡♡……」`); // :802
        await era.printAndWait(
          `${target_name}闭上眼睛柔顺地迎合着${player_name}的亲吻。`,
        ); // :803
        await era.printAndWait(
          `同时像是挑逗一样伸出了舌尖试探，两人像是怎样都亲吻不够似地热吻着……`,
        ); // :804
        kojo.接吻 = 4; // :804-805
      } else if (
        era0(`abl:${target}:10`) >= 2 &&
        (kojo.接吻 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :806-808
        await era.printAndWait(`「唔……嗯嗯……算了………嗯……」`); // :808
        await era.printAndWait(
          `${target_name}像是放弃了抵抗，皱着眉头忍受着${player_name}的亲吻……`,
        ); // :809
        kojo.接吻 = 3; // :809-810
      } else if (kojo.接吻 <= 1 || game.kojo.口上开关 == 2) {
        // :811-813
        await era.printAndWait(`「居然……又……唔！…不…不要……」`); // :813
        await era.printAndWait(`${target_name}露出了厌恶至极的表情……`); // :814
        kojo.接吻 = 2; // :814-815
      } // :814-817
      return 0; // :814-819
    } // :814-821
  } // :816-822

  if (era_flag.selectcom == 7) {
    // :824
    if (kojo.自己扒开 == 0) {
      // :826
      if (era0(`talent:${target}:76`) == 1) {
        // :827-829
        await era.printAndWait(`「嗯？很想看吗？可以哦♡」`); // :829
        await era.printAndWait(
          `${target_name}积极地用手指拨开着阴唇，大方地展示着那最私密的地方……`,
        ); // :830
      } else if (era0(`talent:${target}:85`) == 1) {
        // :831-833
        await era.printAndWait(
          `「虽然很羞耻……但是……如果是魔王大人想看的话……」`,
        ); // :833
        await era.printAndWait(
          `${target_name}的耳根通红，顺从地用手指拨开着阴唇，展示着那最私密的地方……`,
        ); // :834
      } else {
        // :835-837
        await era.printAndWait(`「居……居然……让${sc()}……做这种事情……可恶！」`); // :837
        await era.printAndWait(
          `${target_name}不甘愿且笨拙地用手指拨开了自己下身的阴唇……`,
        ); // :838
      } // :838-839
      kojo.自己扒开 = 1; // :840
      return 0; // :840-841
    } else {
      // :841-845
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.自己扒开 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :845
        await era.printAndWait(
          `「嗯……这样……有看清楚里面吗？……啊…在收缩着哦♡…很想要的样子……嘿嘿♡♡」`,
        ); // :846
        await era.printAndWait(
          `${target_name}积极地用手指拨开着阴唇，让${player_name}完全看清处里面肉壁收缩着的样子……`,
        ); // :847
        kojo.胸爱抚 = 5; // :847-848 源误写 CFLAG:306
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.自己扒开 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :850
        await era.printAndWait(
          `「嗯……请…请看吧……这个姿势能看清楚吗……嗯～嗯啊♡♡」`,
        ); // :851
        await era.printAndWait(
          `${target_name}顺从地用手指拨开着阴唇，让${player_name}完全看清处里面肉壁收缩着的样子……`,
        ); // :852
        kojo.胸爱抚 = 4; // :852-853 源误写 CFLAG:306
      } else if (
        era0(`abl:${target}:17`) >= 3 &&
        (kojo.自己扒开 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :855
        await era.printAndWait(`「嗯……不……再这样盯着看……会……唔！」`); // :856
        await era.printAndWait(`（明明……不想要这样的，这…这种奇怪的感觉……）`); // :857
        await era.printAndWait(
          `感受到视线集中到那私密的地方的时候，${target_name}似乎有了特别的感觉……`,
        ); // :858
        kojo.胸爱抚 = 3; // :858-859 源误写 CFLAG:306
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        // :860-861 源读 CFLAG:306
        await era.printAndWait(`「这样……够了吧！别……别再看了！」`); // :862
        await era.printAndWait(
          `${target_name}羞愤地转过了头去，那拨开阴唇的手指正微微地颤抖着……`,
        ); // :863
        kojo.胸爱抚 = 2; // :863-864 源误写 CFLAG:306
      } // :863-866
      return 0; // :863-868
    } // :863-870
  } // :865-871

  if (era_flag.selectcom == 8) {
    // :873
    if (kojo.插入手指 == 0) {
      // :875
      if (era0(`talent:${target}:76`) == 1) {
        // :875-878
        await era.printAndWait(''); // :878
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`talent:${target}:85`) == 1
      ) {
        // :875-884
        await era.printAndWait(''); // :881
      } else {
        // :880-886
        await era.printAndWait(''); // :884
      } // :884-886
      kojo.插入手指 = 1; // :886
      return 0; // :886-887
    } else {
      // :887-891
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.插入手指 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :891
        await era.printAndWait(''); // :892
        kojo.插入手指 = 5; // :893
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`mark:${target}:2`) == 3 &&
        (kojo.插入手指 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :895
        await era.printAndWait(''); // :896
        kojo.插入手指 = 4; // :897
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.插入手指 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :899
        await era.printAndWait(''); // :900
        kojo.插入手指 = 3; // :901
      } else if (kojo.插入手指 <= 1 || game.kojo.口上开关 == 2) {
        // :903
        await era.printAndWait(''); // :904
        kojo.插入手指 = 2; // :905
      } // :905-906
      return 0; // :905-908
    } // :905-910
  } // :906-912

  if (era_flag.selectcom == 9) {
    // :912-915
    if (kojo.舔肛 == 0) {
      // :915-917
      if (era0(`talent:${target}:76`) == 1) {
        // :916-919
        await era.printAndWait(''); // :919
      } else if (era0(`talent:${target}:85`) == 1) {
        // :918-923
        await era.printAndWait(''); // :922
      } else {
        // :921-927
        await era.printAndWait(''); // :925
      } // :925-927
      kojo.舔肛 = 1; // :925-928
      return 0; // :925-930
    } else {
      // :928-932
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :932
        await era.printAndWait(''); // :933
        kojo.舔肛 = 5; // :933-934
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.舔肛 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :935-937
        await era.printAndWait(''); // :937
        kojo.舔肛 = 4; // :937-938
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.舔肛 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :939-941
        await era.printAndWait(''); // :941
        kojo.舔肛 = 3; // :941-942
      } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 == 2) {
        // :943-945
        await era.printAndWait(''); // :945
        kojo.舔肛 = 2; // :945-946
      } // :945-948
      return 0; // :945-950
    } // :945-952
  } // :947-953

  if (era_flag.selectcom == 10) {
    // :955
    if (kojo.振动宝石 == 0) {
      // :957
      if (era0(`talent:${target}:76`) == 1) {
        // :957-960
        await era.printAndWait(''); // :960
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`talent:${target}:85`) == 1
      ) {
        // :957-966
        await era.printAndWait(''); // :963
      } else {
        // :962-968
        await era.printAndWait(''); // :966
      } // :966-968
      kojo.振动宝石 = 1; // :968
      return 0; // :968-969
    } else {
      // :969-973
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.振动宝石 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :973
        await era.printAndWait(''); // :974
        kojo.振动宝石 = 5; // :975
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`mark:${target}:2`) == 3 &&
        (kojo.振动宝石 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :977
        await era.printAndWait(''); // :978
        kojo.振动宝石 = 4; // :979
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.振动宝石 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :981
        await era.printAndWait(''); // :982
        kojo.振动宝石 = 3; // :983
      } else if (kojo.振动宝石 <= 1 || game.kojo.口上开关 == 2) {
        // :985
        await era.printAndWait(''); // :986
        kojo.振动宝石 = 2; // :987
      } // :987-988
      return 0; // :987-990
    } // :987-992
  } // :988-994

  if (era_flag.selectcom == 11 && era0(`tequip:${target}:11`)) {
    // :997
    if (kojo.壶虫 == 0) {
      // :999
      if (era0(`talent:${target}:0`) == 1) {
        // :999-1002
        if (era0(`talent:${target}:76`) == 1) {
          // :1002-1004
          await era.printAndWait(
            `「嗯…啊……啊……钻…钻进来了呢♡♡……啊……啊啊…嗯…～嗯啊♡♡」`,
          ); // :1004
          await era.printAndWait(
            `${target_name}毫不介意自己被壶虫所破处，甚至还发出了欢愉的呻吟……`,
          ); // :1005
        } else if (era0(`talent:${target}:85`) == 1) {
          // :1006-1008
          await era.printAndWait(
            `「主人不想要${sc()}的处女吗？……唔……${sc()}明白了…嗯……啊啊……」`,
          ); // :1008
          await era.printAndWait(
            `${target_name}似乎有点失望的样子，但还是顺从地任由壶虫钻入了那处女的小穴之中……`,
          ); // :1009
        } else {
          // :1010-1012
          await era.printAndWait(
            `「居…居然让这么脏的东西…不！不要再钻进去了！啊！啊啊啊！！」`,
          ); // :1012
          await era.printAndWait(
            `被壶虫破处的${target_name}难以置信地张大双眼，发出了凄厉的悲鸣……`,
          ); // :1013
        } // :1013-1014
      } else {
        // :1013-1018
        if (era0(`talent:${target}:76`) == 1) {
          // :1017-1019
          await era.printAndWait(
            `「哈啊～嗯…啊……啊～在…在里面动呢♡……啊！…钻得…好深♡……～嗯啊啊♡♡」`,
          ); // :1019
          await era.printAndWait(
            `${target_name}满脸带着情欲的红晕，似乎很享受壶虫带来的快感……`,
          ); // :1020
        } else if (era0(`talent:${target}:85`) == 1) {
          // :1021-1023
          await era.printAndWait(
            `「嗯～唔……不……不要用这个……欺负${sc()}嘛……唔……啊～嗯啊啊♡♡」`,
          ); // :1023
          await era.printAndWait(
            `尽管${target_name}看似不太愿意的样子，但是那身体似乎已经感到了快感……`,
          ); // :1024
        } else {
          // :1025-1027
          await era.printAndWait(
            `「居…居然让这么脏的东西…不！不要再钻进去了！啊！啊啊啊！！」`,
          ); // :1027
          await era.printAndWait(
            `${target_name}难以置信地张大双眼，发出了凄厉的悲鸣……`,
          ); // :1028
        } // :1028-1029
      } // :1029-1031
      kojo.壶虫 = 1; // :1031
      return 0; // :1031-1032
    } else {
      // :1032-1036
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.壶虫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1036
        await era.printAndWait(
          `「哈啊～嗯啊……好…好棒……看…看见了吗？钻进去了喔♡～呵呵♡♡」`,
        ); // :1037
        await era.printAndWait(
          `${target_name}像是发情地呻吟着，下身也因为壶虫的进出与小穴肉壁的摩擦，不停地发出淫糜的水音……`,
        ); // :1038
        kojo.壶虫 = 5; // :1039
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.壶虫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1041
        await era.printAndWait(`「啊～进…进来了…不……不可以…钻这么深啊…啊啊♡」`); // :1042
        await era.printAndWait(
          `${target_name}面色红晕地喘息着，下身也因为壶虫的进出与小穴肉壁的摩擦，不停地发出淫糜的水音……`,
        ); // :1043
        kojo.壶虫 = 4; // :1044
      } else if (
        era0(`abl:${target}:2`) >= 3 &&
        (kojo.壶虫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1046
        await era.printAndWait(`「啊…哈啊……不…不行！里面会……嗯啊…啊啊啊～」`); // :1047
        await era.printAndWait(
          `${target_name}似乎想要抗拒壶虫带来的感觉，扭动着身体也无法阻止那从小穴发出的淫糜水音……`,
        ); // :1048
        kojo.壶虫 = 3; // :1049
      } else if (kojo.壶虫 <= 1 || game.kojo.口上开关 == 2) {
        // :1051
        await era.printAndWait(`「不……不要虫子！拿…拿走啊！唔……啊…啊啊！！」`); // :1052
        await era.printAndWait(
          `即使${target_name}拼命地挣扎，还是被硬生生地被${player_name}掰开了大腿，任由壶虫钻了进去……`,
        ); // :1053
        kojo.壶虫 = 2; // :1054
      } // :1054-1055
      return 0; // :1054-1057
    } // :1055-1059
  } else if (era_flag.selectcom == 11 && era0(`tequip:${target}:11`) == 0) {
    // :1059
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.壶虫着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :1061
      await era.printAndWait(
        `随着壶虫的拔除，带着透明的淫丝牵连带出，一股股蜜液正从那小穴流出打湿了大腿……`,
      ); // :1062
      await era.printAndWait(
        `「嗯啊啊～拔出来了呢♡……总觉得……有点……寂寞呢♡♡？」`,
      ); // :1063
      await era.printAndWait(
        `${target_name}喘息着沉浸在壶虫带来的余韵之中，大腿像是故意那样地张开展示着……`,
      ); // :1064
      kojo.壶虫着脱 = 3; // :1065
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.壶虫着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :1067
      await era.printAndWait(
        `随着壶虫的拔除，带着透明的淫丝牵连带出，一股股蜜液正从那小穴流出打湿了大腿……`,
      ); // :1068
      await era.printAndWait(
        `「这…是因为太想要主人了……所以…抱…抱歉……擅自流出…这么多……呜」`,
      ); // :1069
      await era.printAndWait(
        `${target_name}满脸羞红，拼命地想要解释下身为何如此不像话的样子……`,
      ); // :1070
      kojo.壶虫着脱 = 2; // :1071
    } else if (kojo.壶虫着脱 < 1 || game.kojo.口上开关 == 2) {
      // :1073
      await era.printAndWait(`「呜……终于……」`); // :1074
      await era.printAndWait(
        `${target_name}松了一口气，身体仍带着刺激过后的颤抖……`,
      ); // :1075
      kojo.壶虫着脱 = 1; // :1076
    } // :1076-1077
    return 0; // :1076-1079
  } // :1076-1081

  if (era_flag.selectcom == 12) {
    // :1084
    if (kojo.振动杖 == 0) {
      // :1086
      if (era0(`talent:${target}:76`) == 1) {
        // :1087-1089
        await era.printAndWait(
          `「这个道具看起来真刺激……好…好有趣啊！嗯啊♡…啊……啊啊～♡♡」`,
        ); // :1089
        await era.printAndWait(
          `${target_name}用期待的眼神看着${player_name}手中的道具，相当配合地任由摆弄……`,
        ); // :1090
      } else if (era0(`talent:${target}:85`) == 1) {
        // :1091-1093
        await era.printAndWait(
          `「这个道具是？啊！……震…震的好厉害啊！嗯啊♡…啊……啊啊～♡♡」`,
        ); // :1093
        await era.printAndWait(
          `${target_name}顺从地任由${player_name}摆弄着……`,
        ); // :1094
      } else {
        // :1095-1097
        await era.printAndWait(
          `「哼！借助道具？这就是你的本事吗？不！拿…拿开啊……啊…啊啊！」`,
        ); // :1097
        await era.printAndWait(
          `无视${target_name}的冷嘲热讽与抗议，${player_name}将振动着的道具紧贴着${target_name}的股间……`,
        ); // :1098
      } // :1098-1099
      kojo.振动杖 = 1; // :1100
      return 0; // :1100-1101
    } else {
      // :1101-1105
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.振动杖 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1105
        await era.printAndWait(
          `「啊！这…好有感觉……再这样……这里就要♡……嗯啊♡……啊啊～♡♡」`,
        ); // :1106
        kojo.振动杖 = 5; // :1107
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.振动杖 <= 3 || game.kojo.口上开关 == 2) &&
        !era_flag.assiplay
      ) {
        // :1109
        await era.printAndWait(
          `「就算不用道具…只要对象是魔王大人…${sc()}…${sc()}也会…嗯啊♡……啊啊～♡♡」`,
        ); // :1110
        kojo.振动杖 = 4; // :1111
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.振动杖 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1113
        await era.printAndWait(`「唔！嗯……嗯啊…不……呀！……啊…啊啊！」`); // :1114
        kojo.振动杖 = 3; // :1115
      } else if (kojo.振动杖 <= 1 || game.kojo.口上开关 == 2) {
        // :1117
        await era.printAndWait(`「不！拿…拿开啊！不要再震了……啊…啊啊！」`); // :1118
        kojo.振动杖 = 2; // :1119
      } // :1119-1120
      return 0; // :1119-1122
    } // :1119-1123
  } // :1119-1123

  if (era_flag.selectcom == 13 && era0(`tequip:${target}:13`)) {
    // :1129

    if (kojo.肛门虫 == 0) {
      // :1131

      if (era0(`talent:${target}:76`) == 1) {
        // :1133
        await era.printAndWait(
          `「让虫子进来？没试过呢～可以哦♡………嗯……啊啊～♡♡」`,
        ); // :1134
        await era.printAndWait(
          `${target_name}似乎很感兴趣的样子，迫不及待地掰开了臀瓣配合着……`,
        ); // :1135
      } else if (era0(`talent:${target}:85`) == 1) {
        // :1137
        await era.printAndWait(
          `「为何……要用虫子欺负这里…好…好奇怪啊…嗯……啊啊！」`,
        ); // :1138
        await era.printAndWait(
          `尽管${target_name}似乎有点紧张，但是还是听话顺从地配合着……`,
        ); // :1139
      } else {
        // :1140-1142
        await era.printAndWait(
          `「什么？如此肮脏的虫子要……不……拜托……不要这样…啊！不行！不要啊！！」`,
        ); // :1142
        await era.printAndWait(
          `尽管${target_name}惊恐地挣扎着，但是还是被压制住并塞入了肛门虫……`,
        ); // :1143
        await era.printAndWait(
          `那虫子在肠内蠕动的感觉，让${target_name}发出了歇斯底里的悲鸣……`,
        ); // :1144
      } // :1144-1146
      kojo.肛门虫 = 1; // :1146
      return 0; // :1146-1148
    } else {
      // :1147-1151

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :1151
        await era.printAndWait(
          `「嗯～啊啊……宝贝♡好…好乖啊……在里面钻着呢♡呵呵～嗯…啊…啊啊～♡♡」`,
        ); // :1152
        await era.printAndWait(
          `${target_name}沉迷在肛门虫带来的快感，满足地抚摸着屁股并发出了动情的呻吟……`,
        ); // :1153
        kojo.肛门虫 = 6; // :1154
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.肛门虫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1156
        await era.printAndWait(
          `「又要用这个来欺负${sc()}吗？呵呵～真坏……嗯…啊…啊啊～♡♡」`,
        ); // :1157
        await era.printAndWait(
          `${target_name}熟练地拨开臀瓣，积极地迎接着肛门虫的进入……`,
        ); // :1158
        kojo.肛门虫 = 6; // :1159
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1161
        await era.printAndWait(
          `「嗯～啊啊…抱…抱歉……屁股擅自就有了感觉♡但…但是……嗯…啊…啊啊～♡♡」`,
        ); // :1162
        await era.printAndWait(
          `屁股正被肛门虫侵犯的${target_name}想试着解释些什么，但是都被那欢愉的呻吟打断了……`,
        ); // :1163
        kojo.肛门虫 = 5; // :1164
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.肛门虫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1166
        await era.printAndWait(
          `「比…比起这个……${sc()}……比较喜欢魔王大人的……唔…嗯…啊…啊啊～♡♡」`,
        ); // :1167
        await era.printAndWait(
          `即使屁股正在被肛门虫侵犯着，${target_name}仍断断续续地试着表达对魔王的爱意……`,
        ); // :1168
        kojo.肛门虫 = 4; // :1169
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1171
        await era.printAndWait(`「不……别……嗯啊啊！里面……嗯…啊啊！」`); // :1172
        await era.printAndWait(
          `从后穴里面传来的异样快感，让${target_name}皱着眉头发出了断断续续的呻吟……`,
        ); // :1173
        kojo.肛门虫 = 3; // :1174
      } else if (kojo.肛门虫 <= 1 || game.kojo.口上开关 == 2) {
        // :1176
        await era.printAndWait(`「不…不要虫子……拜托……不…不要啊！！」`); // :1177
        await era.printAndWait(
          `从后穴里面传来的异物感以及蠕动感，让${target_name}发出了惊恐的悲鸣……`,
        ); // :1178
        kojo.肛门虫 = 2; // :1179
      } // :1179-1181
      return 0; // :1179-1183
    } // :1180-1184
  } else if (era_flag.selectcom == 13 && era0(`tequip:${target}:13`) == 0) {
    // :1184

    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.肛门虫着脱 < 4 || game.kojo.口上开关 == 2)
    ) {
      // :1186
      await era.printAndWait(`「欸……要拿走了吗？」`); // :1187
      await era.printAndWait(`${target_name}露出了有点不舍的表情……`); // :1188
      kojo.肛门虫着脱 = 4; // :1189
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.肛门虫着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :1191
      await era.printAndWait(`「啊！等等……不……没事……」`); // :1192
      await era.printAndWait(
        `当${player_name}移除肛门虫之后，${target_name}似乎欲言又止的样子……`,
      ); // :1193
      kojo.肛门虫着脱 = 3; // :1194
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.肛门虫着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :1196
      await era.printAndWait(`「唔……终于……」`); // :1197
      await era.printAndWait(
        `虽然移除肛门虫让${target_name}松了口气，但是后穴又隐隐传来了空虚的感觉……`,
      ); // :1198
      kojo.肛门虫着脱 = 2; // :1199
    } else if (kojo.肛门虫着脱 < 1 || game.kojo.口上开关 == 2) {
      // :1201
      await era.printAndWait(`「呼……呜……」`); // :1202
      await era.printAndWait(
        `移除了让${target_name}抓狂的肛门虫之后，那过度的刺激让他心有余悸地颤抖着……`,
      ); // :1203
      kojo.肛门虫着脱 = 1; // :1204
    } // :1204-1206
    return 0; // :1204-1208
  } // :1204-1210

  if (era_flag.selectcom == 19 && era0(`tequip:${target}:19`)) {
    // :1429

    if (kojo.肛珠 == 0) {
      // :1431

      if (era0(`talent:${target}:76`) == 1) {
        // :1433
        await era.printAndWait(
          `「这个？要塞进屁股吗？呵呵～真有意思呢……嗯……好啊～♡」`,
        ); // :1434
        await era.printAndWait(
          `${target_name}饶有兴致地看着肛珠，主动地拨开了自己的臀瓣……`,
        ); // :1435
      } else if (era0(`talent:${target}:85`) == 1) {
        // :1437
        await era.printAndWait(`「欸？这个……要塞进去……好……${sc()}……知道了……」`); // :1438
        await era.printAndWait(
          `${target_name}似乎有点紧张，但仍然顺从地配合着${player_name}的动作……`,
        ); // :1439
      } else {
        // :1440-1442
        await era.printAndWait(
          `「这个癖好也太恶心了……为什么要用道具玩弄这个地方……呜」`,
        ); // :1442
        await era.printAndWait(
          `${target_name}惊怒地挣扎着，但是即使激烈抵抗，那肛珠还是一颗颗地塞入了体内……`,
        ); // :1443
      } // :1443-1445
      kojo.肛珠 = 1; // :1445
      return 0; // :1445-1447
    } else {
      // :1446-1450

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :1450
        await era.printAndWait(
          `「嗯…哈啊～里面…塞的满满的喔♡真的好舒服呢～…嗯…啊…啊啊～♡♡」`,
        ); // :1451
        await era.printAndWait(
          `${target_name}发出动情的浪叫，沉醉在肛珠带来的快感之中。`,
        ); // :1452
        kojo.肛珠 = 7; // :1453
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.肛珠 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1455
        await era.printAndWait(
          `「道具啊～嗯……那就来吧……啊～再…再放进去一点嘛～♡」`,
        ); // :1456
        await era.printAndWait(
          `${target_name}积极地拨开自己的臀瓣，配合着${player_name}的动作……`,
        ); // :1457
        kojo.肛珠 = 6; // :1458
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 4 || game.kojo.口上开关 == 2) &&
        !era_flag.assiplay
      ) {
        // :1460
        await era.printAndWait(
          `「嗯…啊啊～区区…道具…是比不上魔王大人的！…嗯…啊…啊啊～♡♡」`,
        ); // :1461
        await era.printAndWait(
          `尽管${target_name}这么说着，但是那扭动的身体与发出的呻吟，怎么看都像是很有感觉的样子……`,
        ); // :1462
        kojo.肛珠 = 5; // :1463
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.肛珠 <= 3 || game.kojo.口上开关 == 2) &&
        !era_flag.assiplay
      ) {
        // :1465
        await era.printAndWait(
          `「怎么就喜欢用道具欺负${sc()}呢……真拿魔王大人没办法……」`,
        ); // :1466
        await era.printAndWait(
          `${target_name}尽管这么说，但仍然顺从地配合着${player_name}的动作……`,
        ); // :1467
        kojo.肛珠 = 4; // :1468
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1470
        await era.printAndWait(`「不…不……才…才没有感觉呢…呜……可恶……啊…」`); // :1471
        await era.printAndWait(
          `${target_name}说着拒绝以及讨厌的话，但是那扭动的身体却似乎已经背叛了意志产生了快感……`,
        ); // :1472
        kojo.肛珠 = 3; // :1473
      } else if (kojo.肛珠 <= 1 || game.kojo.口上开关 == 2) {
        // :1475
        await era.printAndWait(
          `「就……就算用这种方式折辱${sc()}……${sc()}也……唔！……可恶……」`,
        ); // :1476
        await era.printAndWait(
          `即使${target_name}厌恶地挣扎着，那肛珠依然一颗颗地塞入了体内……`,
        ); // :1477
        kojo.肛珠 = 2; // :1478
      } // :1478-1480
      return 0; // :1478-1482
    } // :1479-1483
  } else if (era_flag.selectcom == 19 && era0(`tequip:${target}:19`) == 0) {
    // :1483

    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.肛珠着脱 < 4 || game.kojo.口上开关 == 2)
    ) {
      // :1485
      await era.printAndWait(
        `随着肛珠一颗颗的拔出，${target_name}发出难忍的呻吟……`,
      ); // :1486
      await era.printAndWait(`「等等可以放更『大』的东西进来吗？呵呵♡」`); // :1487
      await era.printAndWait(
        `${target_name}轻轻地抚摸着自己的屁股，意犹未尽地询问着……`,
      ); // :1488
      kojo.肛珠着脱 = 4; // :1489
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.肛珠着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :1491
      await era.printAndWait(
        `随着肛珠一颗颗的拔出，${target_name}发出难忍的呻吟……`,
      ); // :1492
      await era.printAndWait(`「这种道具……还是比不上……魔王大人的……」`); // :1493
      await era.printAndWait(
        `${target_name}面色微红抚摸着自己的屁股，说出了心中的感想……`,
      ); // :1494
      kojo.肛珠着脱 = 3; // :1495
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.肛珠着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :1497
      await era.printAndWait(`「唔……终于……」`); // :1498
      await era.printAndWait(
        `虽然移除肛珠让${target_name}松了口气，但是后穴又隐隐传来了空虚的感觉……`,
      ); // :1499
      kojo.肛珠着脱 = 2; // :1500
    } else if (kojo.肛珠着脱 < 1 || game.kojo.口上开关 == 2) {
      // :1502
      await era.printAndWait(`「………唔」`); // :1503
      await era.printAndWait(
        `${target_name}呼出了一口气，放开了已经紧握到发白的掌心……`,
      ); // :1504
      kojo.肛珠着脱 = 1; // :1505
    } // :1505-1507
    return 0; // :1505-1509
  } // :1505-1511

  if (era_flag.selectcom == 20) {
    // :1513

    if (kojo.正常位 == 0) {
      // :1515

      if (era0(`talent:${target}:0`) == 1) {
        // :1517

        if (era0(`talent:${target}:76`) == 1) {
          // :1519
          await era.printAndWait(
            `「呵呵～终于能摆脱处女了呢……好期待哦……快点来呀～♡♡」`,
          ); // :1520
          await era.printAndWait(
            `${target_name}迫不及待地搂住了${player_name}的脖子，主动将身体靠进过去……`,
          ); // :1521
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          era0(`abl:${target}:10`) >= 5 &&
          !era_flag.assiplay
        ) {
          // :1523
          await era.printAndWait(
            `「能…能够将第一次献给魔王大人，真的，真的非常地开心…」`,
          ); // :1524
          await era.printAndWait(
            `「听说第一次都会很痛的样子，但是，是魔王大人的话……」`,
          ); // :1525
          await era.printAndWait(
            `「就算是疼痛，也一定会被幸福感覆盖过去的呢……」`,
          ); // :1526
          await era.printAndWait(
            `${target_name}露出信任的笑容，伸手主动搂住了${player_name}的脖子……`,
          ); // :1527
        } else {
          // :1515-1543
          await era.printAndWait(
            `「不！第一次居然…要跟你这种……不！…走！走开啊！啊啊啊！」`,
          ); // :1530
          await era.printAndWait(
            `${target_name}惊怒地拼命挣扎着，但是还是无法抵抗${player_name}的侵犯……`,
          ); // :1531
        } // :1515-1549
      } else {
        // :1532-1536
        if (era0(`talent:${target}:76`) == 1) {
          // :1535
          await era.printAndWait(
            `「呵呵…让${sc()}看看你的技巧如何吧？……快点进来啊～♡」`,
          ); // :1536
        } else if (era0(`talent:${target}:85`) == 1) {
          // :1538
          if (era_flag.assiplay) {
            // :1539
            await era.printAndWait(
              `「如果……魔王大人想要观赏的话……那么…请…请……」`,
            ); // :1540
            await era.printAndWait(
              `${target_name}低垂的睫毛掩盖了神情，顺从地接受了${player_name}的进入……`,
            ); // :1541
          } else {
            // :1541-1543
            await era.printAndWait(`「这样可以看清楚魔王大人的表情呢……」`); // :1543
            await era.printAndWait(`「感觉……好幸福又有点害羞……♡」`); // :1544
            await era.printAndWait(
              `${target_name}脸颊晕红地露出了幸福的微笑……`,
            ); // :1545
          } // :1543-1549
        } else {
          // :1544-1552
          await era.printAndWait(
            `「不！谁要跟你做这种……不！…走！走开啊！啊啊啊！」`,
          ); // :1549
          await era.printAndWait(
            `${target_name}惊怒地拼命挣扎着，但是还是无法抵抗${player_name}的侵犯……`,
          ); // :1550
        } // :1549-1553
      } // :1551-1553
      kojo.正常位 = 1; // :1553
      return 0; // :1553-1555
    } else {
      // :1554-1558

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.正常位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1558
        await era.print(
          [
            `「果然……这种快感……是最……最棒的了♡嗯…嗯啊啊啊～♡♡」`,
            `「还……还要啊！……唔……好……好棒……快……快点啊♡嗯…嗯啊啊啊～♡♡」`,
            `「可…可以射在里面哦♡…想…想要……满满的……精液♡嗯…嗯啊啊啊～♡♡」`,
          ][rand_n(3)],
        ); // :1559-1563 PRINTDATAL
        await era.printAndWait(
          `${target_name}淫荡地扭动着腰部，正因快感而不知廉耻地浪叫着……`,
        ); // :1564
        kojo.正常位 = 6; // :1565
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.正常位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1567
        if (era_flag.assiplay) {
          // :1568
          await era.printAndWait(
            `「嗯……啊啊～进……进来了……${player_name}的…那里不行……嗯啊～♡」`,
          ); // :1569
          await era.printAndWait(`（明明不是魔王大人……${sc()}……${sc()}却………）`); // :1570
          await era.printAndWait(
            `${target_name}脑子想着魔王大人的事情，身体却和${player_name}紧紧交合着……`,
          ); // :1571
        } else {
          // :1569-1575
          await era.print(
            [
              `「好……好厉害……还……还想要……嗯…嗯啊啊啊～♡♡」`,
              `「想要……魔王大人的孩子…请……请射在里面吧？…嗯…啊啊啊～♡♡」`,
              `「这里是…属于魔王大人的……请…请打上精液的印记～♡♡」`,
            ][rand_n(3)],
          ); // :1573-1577 PRINTDATAL
          await era.print(
            [
              `${target_name}被心爱的魔王大人拥抱，不自觉地说着肉麻的情话……`,
              `能跟心爱的魔王大人交合，${target_name}露出了幸福无比的笑容……`,
              `${target_name}带着崇敬又爱慕的眼神，不停地对${player_name}倾诉着爱语……`,
            ][rand_n(3)],
          ); // :1578-1582 PRINTDATAL
        } // :1582-1584
        kojo.正常位 = 5; // :1584
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (kojo.正常位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1586
        await era.print(
          [
            `「好…好奇怪……再这样动会……唔！嗯……啊…啊啊啊！」`,
            `「太……太深了……这……这是什么！唔！……啊…啊啊啊！」`,
            `「明明……不想要的……但……但是……啊…啊啊啊！」`,
          ][rand_n(3)],
        ); // :1587-1591 PRINTDATAL
        await era.print(
          [
            `${target_name}脸上带着异样的嫣红，似乎渐渐从性交中得到了快感……`,
            `${target_name}像是在忍耐着什么一样，渐渐发出了断断续续的呻吟……`,
            `身体的快感背叛了${target_name}的意志，让他不由自主地发出了呻吟……`,
          ][rand_n(3)],
        ); // :1592-1596 PRINTDATAL
        kojo.正常位 = 4; // :1597
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.正常位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1599
        await era.print(
          [
            `「不…不要……再这样动会……唔！嗯……啊…啊啊啊！」`,
            `「太……太深了……不……不行！嗯……啊…啊啊啊！」`,
            `「停……停下来啊……不……不要这样……啊…啊啊啊！」`,
          ][rand_n(3)],
        ); // :1600-1604 PRINTDATAL
        kojo.正常位 = 3; // :1605
      } else if (kojo.正常位 <= 1 || game.kojo.口上开关 == 2) {
        // :1607
        await era.print(
          [
            `「不！不要…放开${sc()}！出去！拔出去啊！…啊……啊啊！」`,
            `「这种侵犯很有意思吗？混……混帐…！不！不要啊！！」`,
            `「不！不要过来！唔！啊啊！不行……啊啊啊！！」`,
          ][rand_n(3)],
        ); // :1608-1612 PRINTDATAL
        await era.print(
          [
            `${target_name}发出了凄惨的悲鸣……`,
            `挣扎无用的${target_name}流下了屈辱的泪水……`,
            `即使${target_name}死命的挣扎，也无法改变被侵犯的事实……`,
          ][rand_n(3)],
        ); // :1613-1617 PRINTDATAL
        kojo.正常位 = 2; // :1618
      } // :1618-1620
      return 0; // :1618-1622
    } // :1618-1624
  } // :1619-1625

  if (era_flag.selectcom == 21) {
    // :1627

    if (kojo.背后位 == 0) {
      // :1629

      if (era0(`talent:${target}:0`) == 1) {
        // :1631

        if (era0(`talent:${target}:76`) == 1) {
          // :1633
          await era.printAndWait(
            `「呵呵～终于能摆脱处女了呢……好期待哦……快点来呀～♡♡」`,
          ); // :1634
          await era.printAndWait(
            `${target_name}露出了迫不及待的表情，主动地拨开了自己的臀瓣……`,
          ); // :1635
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          era0(`abl:${target}:10`) >= 5 &&
          !era_flag.assiplay
        ) {
          // :1637
          await era.printAndWait(
            `「能…能够将第一次献给魔王大人，真的，真的非常地开心…」`,
          ); // :1638
          await era.printAndWait(
            `「听说第一次都会很痛的样子，但是，是魔王大人的话……」`,
          ); // :1639
          await era.printAndWait(
            `「就算是疼痛，也一定会被幸福感覆盖过去的呢……」`,
          ); // :1640
          await era.printAndWait(
            `${target_name}露出信任的笑容，主动地拨开了自己的臀瓣……`,
          ); // :1641
        } else {
          // :1629-1657
          await era.printAndWait(
            `「不！第一次居然…要跟你这种……不！…走！走开啊！啊啊啊！」`,
          ); // :1644
          await era.printAndWait(
            `${target_name}惊怒地拼命挣扎着，但是还是无法抵抗${player_name}的侵犯……`,
          ); // :1645
        } // :1629-1663
      } else {
        // :1646-1650
        if (era0(`talent:${target}:76`) == 1) {
          // :1649
          await era.printAndWait(`「呵呵…用这个姿势好刺激呢……快点进来啊～♡」`); // :1650
        } else if (era0(`talent:${target}:85`) == 1) {
          // :1652
          if (era_flag.assiplay) {
            // :1653
            await era.printAndWait(`「用……用这个姿势吗？…好…好的……那么……」`); // :1654
            await era.printAndWait(
              `（这体位……看不见脸……就把对方当成魔王大人吧……）`,
            ); // :1655
            await era.printAndWait(
              `${target_name}低垂的睫毛掩盖了神情，顺从地接受了${player_name}的进入……`,
            ); // :1656
          } else {
            // :1656-1658
            await era.printAndWait(`「这样看不见魔王大人的表情呢……」`); // :1658
            await era.printAndWait(
              `「但是，这姿势似乎……可以进得很深的样子……♡」`,
            ); // :1659
            await era.printAndWait(
              `${target_name}脸颊晕红地露出了幸福的微笑……`,
            ); // :1660
          } // :1659-1663
        } else {
          // :1659-1667
          await era.printAndWait(
            `「不！谁要跟你做这种……不！…走！走开啊！啊啊啊！」`,
          ); // :1664
          await era.printAndWait(
            `${target_name}惊怒地拼命挣扎着，但是还是无法抵抗${player_name}的侵犯……`,
          ); // :1665
        } // :1664-1668
      } // :1665-1669
      kojo.背后位 = 1; // :1668
      return 0; // :1666-1672
    } else {
      // :1669-1673

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1673
        await era.print(
          [
            `「果然……从后面来……是最……最深的了♡嗯…嗯啊啊啊～♡♡」`,
            `「还……还要啊！……唔……好……好棒……快……快点啊♡嗯…嗯啊啊啊～♡♡」`,
            `「可…可以射在里面哦♡…想…想要……满满的……精液♡嗯…嗯啊啊啊～♡♡」`,
          ][rand_n(3)],
        ); // :1674-1678 PRINTDATAL
        await era.printAndWait(
          `${target_name}淫荡地扭动着腰部，正因快感而不知廉耻地浪叫着……`,
        ); // :1679
        kojo.背后位 = 6; // :1680
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.背后位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1682
        if (era_flag.assiplay) {
          // :1683
          await era.printAndWait(
            `「嗯……啊啊～从后面……进……进来了……${player_name}的………嗯啊～♡」`,
          ); // :1684
          await era.printAndWait(
            `（这……这不是魔王大人……${sc()}……${sc()}不可以………）`,
          ); // :1685
          await era.printAndWait(
            `${target_name}脑子想着魔王大人的事情，身体却和${player_name}紧紧交合着……`,
          ); // :1686
        } else {
          // :1685-1689
          await era.print(
            [
              `「好……好厉害……还……还想要……嗯…嗯啊啊啊～♡♡」`,
              `「想要……魔王大人的孩子…请……请射在里面吧？…嗯…啊啊啊～♡♡」`,
              `「这里是…属于魔王大人的……请…请打上精液的印记～♡♡」`,
            ][rand_n(3)],
          ); // :1688-1692 PRINTDATAL
          await era.print(
            [
              `${target_name}被心爱的魔王大人拥抱，不自觉地说着肉麻的情话……`,
              `能跟心爱的魔王大人交合，${target_name}露出了幸福无比的笑容……`,
              `${target_name}带着崇敬又爱慕的眼神，不停地对${player_name}倾诉着爱语……`,
            ][rand_n(3)],
          ); // :1693-1697 PRINTDATAL
        } // :1697-1699
        kojo.背后位 = 5; // :1699
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1701
        await era.print(
          [
            `「好…好奇怪……再这样动会……唔！嗯……啊…啊啊啊！」`,
            `「太……太深了……这……这是什么！唔！……啊…啊啊啊！」`,
            `「明明……不想要的……但……但是……啊…啊啊啊！」`,
          ][rand_n(3)],
        ); // :1702-1706 PRINTDATAL
        await era.print(
          [
            `${target_name}脸上带着异样的嫣红，似乎渐渐从性交中得到了快感……`,
            `${target_name}像是在忍耐着什么一样，渐渐发出了断断续续的呻吟……`,
            `身体的快感背叛了${target_name}的意志，让他不由自主地发出了呻吟……`,
          ][rand_n(3)],
        ); // :1707-1711 PRINTDATAL
        kojo.背后位 = 4; // :1712
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1714
        await era.print(
          [
            `「不…不要……再这样动会……唔！嗯……啊…啊啊啊！」`,
            `「太……太深了……不……不行！嗯……啊…啊啊啊！」`,
            `「停……停下来啊……不……不要这样……啊…啊啊啊！」`,
          ][rand_n(3)],
        ); // :1715-1719 PRINTDATAL
        kojo.背后位 = 3; // :1720
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 == 2) {
        // :1722
        await era.print(
          [
            `「不！不要…放开${sc()}！出去！拔出去啊！…啊……啊啊！」`,
            `「这种侵犯很有意思吗？混……混帐…！不！不要啊！！」`,
            `「不！不要过来！唔！啊啊！不行……啊啊啊！！」`,
          ][rand_n(3)],
        ); // :1723-1727 PRINTDATAL
        await era.print(
          [
            `${target_name}发出了凄惨的悲鸣……`,
            `挣扎无用的${target_name}流下了屈辱的泪水……`,
            `即使${target_name}死命的挣扎，也无法改变被侵犯的事实……`,
          ][rand_n(3)],
        ); // :1728-1732 PRINTDATAL
        kojo.背后位 = 2; // :1733
      } // :1732-1736
      return 0; // :1732-1738
    } // :1732-1740
  } // :1734-1740

  if (era_flag.selectcom == 22) {
    // :1742
    if (kojo.对面座位 == 0) {
      // :1743

      if (era0(`talent:${target}:0`) == 1) {
        // :1745

        if (era0(`talent:${target}:76`) == 1) {
          // :1747
          await era.printAndWait(
            `「呵呵～终于能摆脱处女了呢……好期待哦……快点来呀～♡♡」`,
          ); // :1748
          await era.printAndWait(
            `${target_name}迫不及待地搂住了${player_name}的脖子，主动将身体靠进过去……`,
          ); // :1749
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          era0(`abl:${target}:10`) >= 5 &&
          !era_flag.assiplay
        ) {
          // :1751
          await era.printAndWait(
            `「能…能够将第一次献给魔王大人，真的，真的非常地开心…」`,
          ); // :1752
          await era.printAndWait(
            `「听说第一次都会很痛的样子，但是，是魔王大人的话……」`,
          ); // :1753
          await era.printAndWait(
            `「就算是疼痛，也一定会被幸福感覆盖过去的呢……」`,
          ); // :1754
          await era.printAndWait(
            `${target_name}露出信任的笑容，伸手主动搂住了${player_name}的脖子……`,
          ); // :1755
        } else {
          // :1743-1771
          await era.printAndWait(
            `「不！第一次居然…要跟你这种……不！…走！走开啊！啊啊啊！」`,
          ); // :1758
          await era.printAndWait(
            `${target_name}惊怒地拼命挣扎着，但是还是无法抵抗${player_name}的侵犯……`,
          ); // :1759
        } // :1743-1777
      } else {
        // :1760-1764
        if (era0(`talent:${target}:76`) == 1) {
          // :1763
          await era.printAndWait(
            `「呵呵…这样抱着两人贴得很紧呢♡……快点进来啊～♡」`,
          ); // :1764
        } else if (era0(`talent:${target}:85`) == 1) {
          // :1766
          if (era_flag.assiplay) {
            // :1767
            await era.printAndWait(`「这都是为了……魔王大人…所以…所以…请……」`); // :1768
            await era.printAndWait(
              `${target_name}低垂的睫毛掩盖了神情，顺从地接受了${player_name}的进入……`,
            ); // :1769
          } else {
            // :1769-1771
            await era.printAndWait(
              `「这样被抱着可以看清楚魔王大人的表情呢……」`,
            ); // :1771
            await era.printAndWait(`「感觉……好幸福又有点害羞……♡」`); // :1772
            await era.printAndWait(
              `${target_name}脸颊晕红地露出了幸福的微笑……`,
            ); // :1773
          } // :1771-1777
        } else {
          // :1772-1780
          await era.printAndWait(
            `「不！放手！你想要做什么……不！…走！走开啊！啊啊啊！」`,
          ); // :1777
          await era.printAndWait(
            `${target_name}惊怒地拼命挣扎着，但是还是无法抵抗${player_name}的侵犯……`,
          ); // :1778
        } // :1777-1781
      } // :1779-1781
      kojo.对面座位 = 1; // :1781
      return 0; // :1781-1783
    } else {
      // :1782-1786

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.对面座位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1786
        await era.print(
          [
            `「果然……这种快感……是最……最棒的了♡嗯…嗯啊啊啊～♡♡」`,
            `「还……还要啊！……唔……好……好棒……快……快点啊♡嗯…嗯啊啊啊～♡♡」`,
            `「可…可以射在里面哦♡…想…想要……满满的……精液♡嗯…嗯啊啊啊～♡♡」`,
          ][rand_n(3)],
        ); // :1787-1791 PRINTDATAL
        await era.printAndWait(
          `${target_name}淫荡地扭动着腰部，正因快感而不知廉耻地浪叫着……`,
        ); // :1792
        kojo.对面座位 = 6; // :1793
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.对面座位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1795
        if (era_flag.assiplay) {
          // :1796
          await era.printAndWait(
            `「嗯……啊啊～顶……顶进来了……${player_name}的…不……嗯啊～♡」`,
          ); // :1797
          await era.printAndWait(`（明明不是魔王大人……${sc()}……${sc()}却………）`); // :1798
          await era.printAndWait(
            `${target_name}脑子想着魔王大人的事情，身体却和${player_name}紧紧交合着……`,
          ); // :1799
        } else {
          // :1797-1803
          await era.print(
            [
              `「好……好厉害……还……还想要……嗯…嗯啊啊啊～♡♡」`,
              `「想要……魔王大人的孩子…请……请射在里面吧？…嗯…啊啊啊～♡♡」`,
              `「这里是…属于魔王大人的……请…请打上精液的印记～♡♡」`,
            ][rand_n(3)],
          ); // :1801-1805 PRINTDATAL
          await era.print(
            [
              `${target_name}被心爱的魔王大人拥抱，不自觉地说着肉麻的情话……`,
              `能跟心爱的魔王大人交合，${target_name}露出了幸福无比的笑容……`,
              `${target_name}带着崇敬又爱慕的眼神，不停地对${player_name}倾诉着爱语……`,
            ][rand_n(3)],
          ); // :1806-1810 PRINTDATAL
        } // :1810-1812
        kojo.对面座位 = 5; // :1812
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (kojo.对面座位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1814
        await era.print(
          [
            `「好…好奇怪……再这样动会……唔！嗯……啊…啊啊啊！」`,
            `「太……太深了……这……这是什么！唔！……啊…啊啊啊！」`,
            `「明明……不想要的……但……但是……啊…啊啊啊！」`,
          ][rand_n(3)],
        ); // :1815-1819 PRINTDATAL
        await era.print(
          [
            `${target_name}脸上带着异样的嫣红，似乎渐渐从性交中得到了快感……`,
            `${target_name}像是在忍耐着什么一样，渐渐发出了断断续续的呻吟……`,
            `身体的快感背叛了${target_name}的意志，让他不由自主地发出了呻吟……`,
          ][rand_n(3)],
        ); // :1820-1824 PRINTDATAL
        kojo.对面座位 = 4; // :1825
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.对面座位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1827
        await era.print(
          [
            `「不…不要……再这样动会……唔！嗯……啊…啊啊啊！」`,
            `「太……太深了……不……不行！嗯……啊…啊啊啊！」`,
            `「停……停下来啊……不……不要这样……啊…啊啊啊！」`,
          ][rand_n(3)],
        ); // :1828-1832 PRINTDATAL
        kojo.对面座位 = 3; // :1833
      } else if (kojo.对面座位 <= 1 || game.kojo.口上开关 == 2) {
        // :1835
        await era.print(
          [
            `「不！不要…放开${sc()}！出去！拔出去啊！…啊……啊啊！」`,
            `「这种侵犯很有意思吗？混……混帐…！不！不要啊！！」`,
            `「不！不要过来！唔！啊啊！不行……啊啊啊！！」`,
          ][rand_n(3)],
        ); // :1836-1840 PRINTDATAL
        await era.print(
          [
            `${target_name}发出了凄惨的悲鸣……`,
            `挣扎无用的${target_name}流下了屈辱的泪水……`,
            `即使${target_name}死命的挣扎，也无法改变被侵犯的事实……`,
          ][rand_n(3)],
        ); // :1841-1845 PRINTDATAL
        kojo.对面座位 = 2; // :1846
      } // :1846-1848
      return 0; // :1846-1850
    } // :1846-1852
  } // :1847-1853

  if (era_flag.selectcom == 23) {
    // :1855
    if (kojo.背面座位 == 0) {
      // :1856

      if (era0(`talent:${target}:0`) == 1) {
        // :1858

        if (era0(`talent:${target}:76`) == 1) {
          // :1860
          await era.printAndWait(
            `「呵呵～终于能摆脱处女了呢……好期待哦……快点来呀～♡♡」`,
          ); // :1861
          await era.printAndWait(
            `${target_name}露出了迫不及待的表情，主动地拨开了自己的臀瓣……`,
          ); // :1862
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          era0(`abl:${target}:10`) >= 5 &&
          !era_flag.assiplay
        ) {
          // :1864
          await era.printAndWait(
            `「能…能够将第一次献给魔王大人，真的，真的非常地开心…」`,
          ); // :1865
          await era.printAndWait(
            `「听说第一次都会很痛的样子，但是，是魔王大人的话……」`,
          ); // :1866
          await era.printAndWait(
            `「就算是疼痛，也一定会被幸福感覆盖过去的呢……」`,
          ); // :1867
          await era.printAndWait(
            `${target_name}露出信任的笑容，主动地拨开了自己的臀瓣……`,
          ); // :1868
        } else {
          // :1856-1884
          await era.printAndWait(
            `「不！第一次居然…要跟你这种……不！…走！走开啊！啊啊啊！」`,
          ); // :1871
          await era.printAndWait(
            `${target_name}惊怒地拼命挣扎着，但是还是无法抵抗${player_name}的侵犯……`,
          ); // :1872
        } // :1856-1890
      } else {
        // :1873-1877
        if (era0(`talent:${target}:76`) == 1) {
          // :1876
          await era.printAndWait(
            `「呵呵…这样被抱着，很清楚的能感受的性器的样子喔？……快点进来啊～♡」`,
          ); // :1877
        } else if (era0(`talent:${target}:85`) == 1) {
          // :1879
          if (era_flag.assiplay) {
            // :1880
            await era.printAndWait(
              `「如果……这是魔王大人的命令……那么…请…请……」`,
            ); // :1881
            await era.printAndWait(
              `（这体位……看不见脸……就把对方当成魔王大人吧……）`,
            ); // :1882
            await era.printAndWait(
              `${target_name}低垂的睫毛掩盖了神情，顺从地接受了${player_name}的进入……`,
            ); // :1883
          } else {
            // :1883-1885
            await era.printAndWait(`「这样被魔王大人抱着好幸福呢……」`); // :1885
            await era.printAndWait(
              `「而且，从后面来的话……可以进得很深的样子……♡」`,
            ); // :1886
            await era.printAndWait(
              `${target_name}脸颊晕红地露出了幸福的微笑……`,
            ); // :1887
          } // :1886-1890
        } else {
          // :1886-1894
          await era.printAndWait(
            `「不！放手！你想要做什么……不！…走！走开啊！啊啊啊！」`,
          ); // :1891
          await era.printAndWait(
            `${target_name}惊怒地拼命挣扎着，但是还是无法抵抗${player_name}的侵犯……`,
          ); // :1892
        } // :1891-1895
      } // :1893-1895
      kojo.背面座位 = 1; // :1895
      return 0; // :1895-1897
    } else {
      // :1896-1900

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.背面座位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1900
        await era.print(
          [
            `「果然……从后面来……是最……最深的了♡嗯…嗯啊啊啊～♡♡」`,
            `「还……还要啊！……唔……好……好棒……快……快点啊♡嗯…嗯啊啊啊～♡♡」`,
            `「可…可以射在里面哦♡…想…想要……满满的……精液♡嗯…嗯啊啊啊～♡♡」`,
          ][rand_n(3)],
        ); // :1901-1905 PRINTDATAL
        await era.printAndWait(
          `${target_name}淫荡地扭动着腰部，正因快感而不知廉耻地浪叫着……`,
        ); // :1906
        kojo.背面座位 = 6; // :1907
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.背面座位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1909
        if (era_flag.assiplay) {
          // :1910
          await era.printAndWait(
            `「嗯……啊啊～从后面……进……进来了……${player_name}的………嗯啊～♡」`,
          ); // :1911
          await era.printAndWait(
            `（明明……不是魔王大人……${sc()}……${sc()}不可以………）`,
          ); // :1912
          await era.printAndWait(
            `${target_name}脑子想着魔王大人的事情，身体却和${player_name}紧紧交合着……`,
          ); // :1913
        } else {
          // :1912-1916
          await era.print(
            [
              `「好……好厉害……还……还想要……嗯…嗯啊啊啊～♡♡」`,
              `「想要……魔王大人的孩子…请……请射在里面吧？…嗯…啊啊啊～♡♡」`,
              `「这里是…属于魔王大人的……请…请打上精液的印记～♡♡」`,
            ][rand_n(3)],
          ); // :1915-1919 PRINTDATAL
          await era.print(
            [
              `${target_name}被心爱的魔王大人拥抱，不自觉地说着肉麻的情话……`,
              `能跟心爱的魔王大人交合，${target_name}露出了幸福无比的笑容……`,
              `${target_name}带着崇敬又爱慕的眼神，不停地对${player_name}倾诉着爱语……`,
            ][rand_n(3)],
          ); // :1920-1924 PRINTDATAL
        } // :1924-1926
        kojo.背面座位 = 5; // :1926
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (kojo.背面座位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1928
        await era.print(
          [
            `「好…好奇怪……再这样动会……唔！嗯……啊…啊啊啊！」`,
            `「太……太深了……这……这是什么！唔！……啊…啊啊啊！」`,
            `「明明……不想要的……但……但是……啊…啊啊啊！」`,
          ][rand_n(3)],
        ); // :1929-1933 PRINTDATAL
        await era.print(
          [
            `${target_name}脸上带着异样的嫣红，似乎渐渐从性交中得到了快感……`,
            `${target_name}像是在忍耐着什么一样，渐渐发出了断断续续的呻吟……`,
            `身体的快感背叛了${target_name}的意志，让他不由自主地发出了呻吟……`,
          ][rand_n(3)],
        ); // :1934-1938 PRINTDATAL
        kojo.背面座位 = 4; // :1939
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.背面座位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1941
        await era.print(
          [
            `「不…不要……再这样动会……唔！嗯……啊…啊啊啊！」`,
            `「太……太深了……不……不行！嗯……啊…啊啊啊！」`,
            `「停……停下来啊……不……不要这样……啊…啊啊啊！」`,
          ][rand_n(3)],
        ); // :1942-1946 PRINTDATAL
        kojo.背面座位 = 3; // :1947
      } else if (kojo.背面座位 <= 1 || game.kojo.口上开关 == 2) {
        // :1949
        await era.print(
          [
            `「不！不要…放开${sc()}！出去！拔出去啊！…啊……啊啊！」`,
            `「这种侵犯很有意思吗？混……混帐…！不！不要啊！！」`,
            `「不！不要过来！唔！啊啊！不行……啊啊啊！！」`,
          ][rand_n(3)],
        ); // :1950-1954 PRINTDATAL
        await era.print(
          [
            `${target_name}发出了凄惨的悲鸣……`,
            `挣扎无用的${target_name}流下了屈辱的泪水……`,
            `即使${target_name}死命的挣扎，也无法改变被侵犯的事实……`,
          ][rand_n(3)],
        ); // :1955-1959 PRINTDATAL
        kojo.背面座位 = 2; // :1960
      } // :1960-1962
      return 0; // :1960-1964
    } // :1960-1966
  } // :1961-1967

  if (era_flag.selectcom == 26) {
    // :1969

    if (kojo.正常位肛交 == 0) {
      // :1971

      if (era0(`talent:${target}:76`) == 1) {
        // :1973
        await era.printAndWait(
          `「欸？要用这个体位侵犯屁股吗？……嗯……虽然没试过……但是……可以哦～♡♡」`,
        ); // :1974
        await era.printAndWait(
          `尽管是第一次用这个体位进行肛交，${target_name}还是积极地配合着${player_name}的动作……`,
        ); // :1975
      } else if (era0(`talent:${target}:85`) == 1) {
        // :1977
        if (era_flag.assiplay) {
          // :1978
          await era.printAndWait(
            `「请……请用…但是…可以…不要看${sc()}的脸吗？……嗯…啊啊啊……」`,
          ); // :1979
          await era.printAndWait(
            `（因为是命令……所以……应该……不会让魔王大人不悦吧……）`,
          ); // :1980
          await era.printAndWait(
            `尽管是听从命令进行着肛交，${target_name}还是一边思慕着魔王一边配合着${player_name}的动作……`,
          ); // :1981
        } else {
          // :1981-1983
          await era.printAndWait(
            `「${sc()}全身上下都属于魔王大人的……喜欢这里的话……也……嗯……啊啊啊～♡♡」`,
          ); // :1983
          await era.printAndWait(
            `尽管是第一次用这个体位进行肛交，${target_name}还是露出欣喜的表情地配合着${player_name}的动作……`,
          ); // :1984
        } // :1983-1987
      } else {
        // :1986-1988
        await era.printAndWait(
          `「用这里……做？……真不敢相信……变态！去死！……不！！不要！啊啊啊！」`,
        ); // :1988
        await era.printAndWait(
          `尽管${target_name}惊怒地拼命挣扎，但是还是无法抵抗${player_name}的侵犯……`,
        ); // :1989
      } // :1989-1991
      kojo.正常位肛交 = 1; // :1991
      return 0; // :1991-1993
    } else {
      // :1992-1996

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :1996
        await era.print(
          [
            `「后面…被…塞得满满的感觉……真是…太棒了♡嗯…嗯啊啊啊～♡♡」`,
            `「弄…弄坏也……可以…用力……还……还要♡嗯…嗯啊啊啊～♡♡」`,
            `「用屁股……高潮的话……是不是很……变态？但……但是♡嗯…嗯啊啊啊～♡♡」`,
          ][rand_n(3)],
        ); // :1997-2001 PRINTDATAL
        await era.printAndWait(
          `从屁股传来激烈的快感，让${target_name}失神地发出了淫荡的呻吟……`,
        ); // :2002
        kojo.正常位肛交 = 7; // :2003
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.正常位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2005
        await era.print(
          [
            `「真是…喜…喜欢……用这里吗？…唔…嗯啊…啊啊～♡♡」`,
            `「不…不要……太…用力哦…就…就是这样♡嗯…嗯啊啊啊～♡♡」`,
            `「不……不可以…太深了……轻…轻点呀♡……嗯…嗯啊啊啊～♡♡」`,
          ][rand_n(3)],
        ); // :2006-2010 PRINTDATAL
        await era.printAndWait(
          `明明被侵犯着屁股，${target_name}也还是扭动着身体发出了呻吟……`,
        ); // :2011
        kojo.正常位肛交 = 6; // :2012
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2014
        if (era_flag.assiplay) {
          // :2015
          await era.printAndWait(
            `「唔！啊啊～再这样子会……会…不可以……嗯♡…嗯啊…啊啊～♡♡」`,
          ); // :2016
          await era.printAndWait(`（不行……这不是魔王大人……不能……但……但是……）`); // :2017
          await era.printAndWait(
            `从被侵犯的后穴传来了强烈的快感，${target_name}一边想着魔王大人一边咬牙承受着……`,
          ); // :2018
        } else {
          // :2014-2024
          await era.print(
            [
              `「嗯！呀！抱…抱歉…实在…是因为…太舒服了…嗯♡…嗯啊…啊啊～♡♡」`,
              `「啊～因为…是魔王大人……所以即使是……这种地方也……嗯♡…嗯啊…啊啊～♡♡」`,
              `「这里…也…想要热腾腾的……啊！${sc()}…真是太贪心了…嗯♡…嗯啊…啊啊～♡♡」`,
            ][rand_n(3)],
          ); // :2020-2024 PRINTDATAL
          await era.print(
            [
              `来自后穴的快感，让${target_name}恍惚失神甚至语无论次了起来……`,
              `${target_name}因为后穴的快感，一边呻吟一边向${player_name}求饶着……`,
              `${target_name}想要专心致意地服侍${player_name}，但是快感太过强烈，似乎让他忘记了自己的目的……`,
            ][rand_n(3)],
          ); // :2025-2029 PRINTDATAL
        } // :2029-2031
        kojo.正常位肛交 = 5; // :2031
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.正常位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2033
        if (era_flag.assiplay) {
          // :2034
          await era.printAndWait(`「唔！嗯……嗯啊…不……呀！……啊…啊啊！」`); // :2035
          await era.printAndWait(`（这个身体是取悦魔王大人的，所以……所以……）`); // :2036
          await era.printAndWait(
            `${target_name}闭上了眼睛，顺从地承受${player_name}的侵犯……`,
          ); // :2037
        } else {
          // :2033-2043
          await era.print(
            [
              `「啊！魔王大人…喜…喜欢这里吗？那…那么……用坏了也没关系♡嗯…嗯啊啊啊～♡♡」`,
              `「虽然…用…这里…承欢……很羞耻…但是…只要您喜欢的话……${sc()}……嗯♡…嗯啊…啊啊～♡♡」`,
              `「用这个…污秽的地方……伺候尊贵的魔王大人…真的可以吗？……嗯♡…嗯啊…啊啊～♡♡」`,
            ][rand_n(3)],
          ); // :2039-2043 PRINTDATAL
          await era.print(
            [
              `比起自己肉体的愉悦，${target_name}似乎先顾虑着${player_name}的感受……`,
              `${target_name}努力地摆动着腰身，竭尽全力地想要让${player_name}觉得舒服……`,
              `尽管${target_name}气喘吁吁，但仍时不时观察照顾着${player_name}的感受……`,
            ][rand_n(3)],
          ); // :2044-2048 PRINTDATAL
        } // :2048-2050
        kojo.正常位肛交 = 4; // :2050
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2052
        await era.print(
          [
            `「不…不要……屁股…感觉好奇怪啊…唔！嗯……啊…啊啊啊！」`,
            `「太……太深了……不……不行！嗯……啊…啊啊啊！」`,
            `「停……停下来啊……后面…会…会……啊…啊啊啊！」`,
          ][rand_n(3)],
        ); // :2053-2057 PRINTDATAL
        kojo.正常位肛交 = 3; // :2058
      } else if (kojo.正常位肛交 <= 1 || game.kojo.口上开关 == 2) {
        // :2060
        await era.print(
          [
            `「喜欢侵犯屁股的变态！去死！……唔！……不……好痛！……啊啊！」`,
            `「拔…拔出去啊！好痛！不…不要再进来了！……啊！……啊啊！」`,
            `「不！不要啊！要……要坏掉了……唔！……不……好痛！……啊啊！」`,
          ][rand_n(3)],
        ); // :2061-2065 PRINTDATAL
        await era.print(
          [
            `${target_name}发出了凄惨的悲鸣……`,
            `挣扎无用的${target_name}流下了屈辱的泪水……`,
            `即使${target_name}死命的挣扎，也无法改变被侵犯的事实……`,
          ][rand_n(3)],
        ); // :2066-2070 PRINTDATAL
        kojo.正常位肛交 = 2; // :2071
      } // :2071-2073
      return 0; // :2071-2075
    } // :2071-2077
  } // :2072-2078

  if (era_flag.selectcom == 27) {
    // :2080

    if (kojo.背后位肛交 == 0) {
      // :2082

      if (era0(`talent:${target}:76`) == 1) {
        // :2084
        await era.printAndWait(
          `「欸？要从背后侵犯屁股吗？看不到表请有点紧张呢……但是……可以哦～♡♡」`,
        ); // :2085
        await era.printAndWait(
          `尽管是第一次用这个体位进行肛交，${target_name}还是积极地配合着${player_name}的动作……`,
        ); // :2086
      } else if (era0(`talent:${target}:85`) == 1) {
        // :2088
        if (era_flag.assiplay) {
          // :2089
          await era.printAndWait(
            `「虽然……用这里…这体位…是第一次……但是……嗯…啊啊啊……」`,
          ); // :2090
          await era.printAndWait(
            `（这个姿势看不见表情……把对方当成魔王大人就可以了吧……）`,
          ); // :2091
          await era.printAndWait(
            `尽管是第一次用这个体位进行肛交，${target_name}还是顺从地配合着${player_name}的动作……`,
          ); // :2092
        } else {
          // :2092-2094
          await era.printAndWait(
            `「虽然看不见魔王大人的表情……有点紧张……但是……可以哦～♡♡」`,
          ); // :2094
          await era.printAndWait(
            `尽管是第一次用这个体位进行肛交，${target_name}还是露出欣喜的表情地配合着${player_name}的动作……`,
          ); // :2095
        } // :2094-2098
      } else {
        // :2097-2099
        await era.printAndWait(
          `「这个……姿势？……该不会要……变态！去死！……不！！不要！啊啊啊！」`,
        ); // :2099
        await era.printAndWait(
          `尽管${target_name}惊怒地拼命挣扎，但是还是无法抵抗${player_name}的侵犯……`,
        ); // :2100
      } // :2100-2102
      kojo.背后位肛交 = 1; // :2102
      return 0; // :2100-2106
    } else {
      // :2103-2107

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2107
        await era.print(
          [
            `「后面…被…塞得满满的感觉……真是…太棒了♡嗯…嗯啊啊啊～♡♡」`,
            `「弄…弄坏也……可以…用力……还……还要♡嗯…嗯啊啊啊～♡♡」`,
            `「用屁股……高潮的话……是不是很……变态？但……但是♡嗯…嗯啊啊啊～♡♡」`,
          ][rand_n(3)],
        ); // :2108-2112 PRINTDATAL
        await era.printAndWait(
          `从屁股传来激烈的快感，让${target_name}失神地发出了淫荡的呻吟……`,
        ); // :2113
        kojo.背后位肛交 = 7; // :2114
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.背后位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2116
        await era.print(
          [
            `「真是…喜…喜欢……用这里吗？…唔…嗯啊…啊啊～♡♡」`,
            `「不…不要……太…用力哦…就…就是这样♡嗯…嗯啊啊啊～♡♡」`,
            `「不……不可以…太深了……轻…轻点呀♡……嗯…嗯啊啊啊～♡♡」`,
          ][rand_n(3)],
        ); // :2117-2121 PRINTDATAL
        await era.printAndWait(
          `明明被侵犯着屁股，${target_name}也还是扭动着身体发出了呻吟……`,
        ); // :2122
        kojo.背后位肛交 = 6; // :2123
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2125
        if (era_flag.assiplay) {
          // :2126
          await era.printAndWait(
            `「唔！啊啊～再这样子会……会…不可以……嗯♡…嗯啊…啊啊～♡♡」`,
          ); // :2127
          await era.printAndWait(`（不行……这不是魔王大人……不能……但……但是……）`); // :2128
          await era.printAndWait(
            `从被侵犯的后穴传来了强烈的快感，${target_name}一边想着魔王大人一边咬牙承受着……`,
          ); // :2129
        } else {
          // :2125-2135
          await era.print(
            [
              `「嗯！呀！抱…抱歉…实在…是因为…太舒服了…嗯♡…嗯啊…啊啊～♡♡」`,
              `「啊～因为…是魔王大人……所以即使是……这种地方也……嗯♡…嗯啊…啊啊～♡♡」`,
              `「这里…也…想要热腾腾的……啊！${sc()}…真是太贪心了…嗯♡…嗯啊…啊啊～♡♡」`,
            ][rand_n(3)],
          ); // :2131-2135 PRINTDATAL
          await era.print(
            [
              `来自后穴的快感，让${target_name}恍惚失神甚至语无论次了起来……`,
              `${target_name}因为后穴的快感，一边呻吟一边向${player_name}求饶着……`,
              `${target_name}一心想要服侍${player_name}，但是快感太过强烈，似乎让他忘记了自己的目的……`,
            ][rand_n(3)],
          ); // :2136-2140 PRINTDATAL
        } // :2140-2142
        kojo.背后位肛交 = 5; // :2142
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2144
        if (era_flag.assiplay) {
          // :2145
          await era.printAndWait(`「唔！嗯……嗯啊…不……呀！……啊…啊啊！」`); // :2146
          await era.printAndWait(`（这个身体是取悦魔王大人的，所以……所以……）`); // :2147
          await era.printAndWait(
            `${target_name}闭上了眼睛，顺从地承受${player_name}的侵犯……`,
          ); // :2148
        } else {
          // :2144-2154
          await era.print(
            [
              `「啊！魔王大人…喜…喜欢这里吗？那…那么……用坏了也没关系♡嗯…嗯啊啊啊～♡♡」`,
              `「虽然…用…这里…承欢……很羞耻…但是…只要您喜欢的话……${sc()}……嗯♡…嗯啊…啊啊～♡♡」`,
              `「用这个…污秽的地方……伺候尊贵的魔王大人…真的可以吗？……嗯♡…嗯啊…啊啊～♡♡」`,
            ][rand_n(3)],
          ); // :2150-2154 PRINTDATAL
          await era.print(
            [
              `比起自己肉体的愉悦，${target_name}似乎先顾虑着${player_name}的感受……`,
              `${target_name}努力地摆动着腰身，竭尽全力地想要让${player_name}觉得舒服……`,
              `尽管${target_name}气喘吁吁，但仍时不时观察照顾着${player_name}的感受……`,
            ][rand_n(3)],
          ); // :2155-2159 PRINTDATAL
        } // :2159-2161
        kojo.背后位肛交 = 4; // :2161
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2163
        await era.print(
          [
            `「不…不要……屁股…感觉好奇怪啊…唔！嗯……啊…啊啊啊！」`,
            `「太……太深了……不……不行！嗯……啊…啊啊啊！」`,
            `「停……停下来啊……后面…会…会……啊…啊啊啊！」`,
          ][rand_n(3)],
        ); // :2164-2168 PRINTDATAL
        kojo.背后位肛交 = 3; // :2169
      } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 == 2) {
        // :2171
        await era.print(
          [
            `「喜欢侵犯屁股的变态！去死！……唔！……不……好痛！……啊啊！」`,
            `「拔…拔出去啊！好痛！不…不要再进来了！……啊！……啊啊！」`,
            `「不！不要啊！要……要坏掉了……唔！……不……好痛！……啊啊！」`,
          ][rand_n(3)],
        ); // :2172-2176 PRINTDATAL
        await era.print(
          [
            `${target_name}发出了凄惨的悲鸣……`,
            `挣扎无用的${target_name}流下了屈辱的泪水……`,
            `即使${target_name}死命的挣扎，也无法改变被侵犯的事实……`,
          ][rand_n(3)],
        ); // :2177-2181 PRINTDATAL
        kojo.背后位肛交 = 2; // :2182
      } // :2181-2185
      return 0; // :2181-2187
    } // :2181-2189
  } // :2183-2189

  if (era_flag.selectcom == 28) {
    // :2191

    if (kojo.对面座位肛交 == 0) {
      // :2193

      if (era0(`talent:${target}:76`) == 1) {
        // :2195
        await era.printAndWait(
          `「这样抱着是怕${sc()}跑掉吗？呵呵…性爱的滋味如此美妙，${sc()}怎么舍得离开呢♡」`,
        ); // :2196
        await era.printAndWait(
          `${target_name}带着期待的笑容，积极地回应着${player_name}的动作……`,
        ); // :2197
      } else if (era0(`talent:${target}:85`) == 1 && !era_flag.assiplay) {
        // :2199
        await era.printAndWait(
          `「这样被抱着…感觉很幸福呢♡……当然……要做什么都可以哦？${sc()}的魔王大人♡」`,
        ); // :2200
        await era.printAndWait(
          `${target_name}心情很好地微笑着，任凭${player_name}摆布……`,
        ); // :2201
      } else {
        // :2202-2204
        await era.printAndWait(
          `「放${sc()}下去！混帐！到底是要做什么…该不会…不！！不要！啊啊啊！」`,
        ); // :2204
        await era.printAndWait(
          `尽管${target_name}惊怒地拼命挣扎，但是还是无法抵抗${player_name}的侵犯……`,
        ); // :2205
      } // :2205-2207
      kojo.对面座位肛交 = 1; // :2207
      return 0; // :2207-2209
    } else {
      // :2208-2212

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2212
        await era.print(
          [
            `「后面…被…塞得满满的感觉……真是…太棒了♡嗯…嗯啊啊啊～♡♡」`,
            `「弄…弄坏也……可以…用力……还……还要♡嗯…嗯啊啊啊～♡♡」`,
            `「用屁股……高潮的话……是不是很……变态？但……但是♡嗯…嗯啊啊啊～♡♡」`,
          ][rand_n(3)],
        ); // :2213-2217 PRINTDATAL
        await era.printAndWait(
          `从屁股传来激烈的快感，让${target_name}失神地发出了淫荡的呻吟……`,
        ); // :2218
        kojo.对面座位肛交 = 7; // :2219
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.对面座位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2221
        await era.print(
          [
            `「真是…喜…喜欢……用这里吗？…唔…嗯啊…啊啊～♡♡」`,
            `「不…不要……太…用力哦…就…就是这样♡嗯…嗯啊啊啊～♡♡」`,
            `「不……不可以…太深了……轻…轻点呀♡……嗯…嗯啊啊啊～♡♡」`,
          ][rand_n(3)],
        ); // :2222-2226 PRINTDATAL
        kojo.对面座位肛交 = 6; // :2227
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2229
        if (era_flag.assiplay) {
          // :2230
          await era.printAndWait(
            `「唔！啊啊～再这样子会……会…不可以……嗯♡…嗯啊…啊啊～♡♡」`,
          ); // :2231
          await era.printAndWait(`（不行……这不是魔王大人……不能……但……但是……）`); // :2232
          await era.printAndWait(
            `从被侵犯的后穴传来了强烈的快感，${target_name}一边想着魔王大人一边咬牙承受着……`,
          ); // :2233
        } else {
          // :2229-2239
          await era.print(
            [
              `「嗯！呀！抱…抱歉…实在…是因为…太舒服了…嗯♡…嗯啊…啊啊～♡♡」`,
              `「啊～因为…是魔王大人……所以即使是……这种地方也……嗯♡…嗯啊…啊啊～♡♡」`,
              `「这里…也…想要热腾腾的……啊！${sc()}…真是太贪心了…嗯♡…嗯啊…啊啊～♡♡」`,
            ][rand_n(3)],
          ); // :2235-2239 PRINTDATAL
          await era.print(
            [
              `来自后穴的快感，让${target_name}恍惚失神甚至语无论次了起来……`,
              `${target_name}因为后穴的快感，一边呻吟一边向${player_name}求饶着……`,
              `${target_name}一心想要服侍${player_name}，但是快感太过强烈，似乎让他忘记了自己的目的……`,
            ][rand_n(3)],
          ); // :2240-2244 PRINTDATAL
        } // :2244-2246
        kojo.对面座位肛交 = 5; // :2246
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.对面座位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2248
        if (era_flag.assiplay) {
          // :2249
          await era.printAndWait(`「唔！嗯……嗯啊…不……呀！……啊…啊啊！」`); // :2250
          await era.printAndWait(`（这个身体是取悦魔王大人的，所以……所以……）`); // :2251
          await era.printAndWait(
            `${target_name}闭上了眼睛，顺从地承受${player_name}的侵犯……`,
          ); // :2252
        } else {
          // :2248-2258
          await era.print(
            [
              `「啊！魔王大人…喜…喜欢这里吗？那…那么……用坏了也没关系♡嗯…嗯啊啊啊～♡♡」`,
              `「虽然…用…这里…承欢……很羞耻…但是…只要您喜欢的话……${sc()}……嗯♡…嗯啊…啊啊～♡♡」`,
              `「用这个…污秽的地方……伺候尊贵的魔王大人…真的可以吗？……嗯♡…嗯啊…啊啊～♡♡」`,
            ][rand_n(3)],
          ); // :2254-2258 PRINTDATAL
          await era.print(
            [
              `比起自己肉体的愉悦，${target_name}似乎先顾虑着${player_name}的感受……`,
              `${target_name}努力地摆动着腰身，竭尽全力地想要让${player_name}觉得舒服……`,
              `尽管${target_name}气喘吁吁，但仍时不时观察照顾着${player_name}的感受……`,
            ][rand_n(3)],
          ); // :2259-2263 PRINTDATAL
        } // :2263-2265
        kojo.对面座位肛交 = 4; // :2265
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2267
        await era.print(
          [
            `「不…不要……屁股…感觉好奇怪啊…唔！嗯……啊…啊啊啊！」`,
            `「太……太深了……不……不行！嗯……啊…啊啊啊！」`,
            `「停……停下来啊……后面…会…会……啊…啊啊啊！」`,
          ][rand_n(3)],
        ); // :2268-2272 PRINTDATAL
        kojo.对面座位肛交 = 3; // :2273
      } else if (kojo.对面座位肛交 <= 1 || game.kojo.口上开关 == 2) {
        // :2275
        await era.print(
          [
            `「喜欢侵犯屁股的变态！去死！……唔！……不……好痛！……啊啊！」`,
            `「拔…拔出去啊！好痛！不…不要再进来了！……啊！……啊啊！」`,
            `「不！不要啊！要……要坏掉了……唔！……不……好痛！……啊啊！」`,
          ][rand_n(3)],
        ); // :2276-2280 PRINTDATAL
        await era.print(
          [
            `${target_name}发出了凄惨的悲鸣……`,
            `挣扎无用的${target_name}流下了屈辱的泪水……`,
            `即使${target_name}死命的挣扎，也无法改变被侵犯的事实……`,
          ][rand_n(3)],
        ); // :2281-2285 PRINTDATAL
        kojo.对面座位肛交 = 2; // :2286
      } // :2286-2288
      return 0; // :2286-2290
    } // :2286-2292
  } // :2287-2293

  if (era_flag.selectcom == 29) {
    // :2295

    if (kojo.背面座位肛交 == 0) {
      // :2297

      if (era0(`talent:${target}:76`) == 1) {
        // :2299
        await era.printAndWait(
          `「想玩后面也可以喔！这个姿势…嗯……应该很美妙吧♡」`,
        ); // :2300
        await era.printAndWait(
          `${target_name}带着期待的笑容，积极地回应着${player_name}的动作……`,
        ); // :2301
      } else if (era0(`talent:${target}:85`) == 1 && !era_flag.assiplay) {
        // :2303
        await era.printAndWait(
          `「想从后面…嗯……好……好啊……只要是魔王大人……怎样都可以♡」`,
        ); // :2304
        await era.printAndWait(
          `${target_name}带着羞涩的笑容，顺从地回应着${player_name}的动作……`,
        ); // :2305
      } else {
        // :2306-2308
        await era.printAndWait(
          `「后面…好像有什么……该不会……不！放开${sc()}！……不要……好痛！……啊啊！」`,
        ); // :2308
        await era.printAndWait(
          `${target_name}的腰部被${player_name}的双臂牢牢地固定，就这样从后面贯穿至${target_name}的体内……`,
        ); // :2309
      } // :2309-2311
      kojo.背面座位肛交 = 1; // :2311
      return 0; // :2311-2313
    } else {
      // :2312-2316

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2316
        await era.print(
          [
            `「后面…被…塞得满满的感觉……真是…太棒了♡嗯…嗯啊啊啊～♡♡」`,
            `「弄…弄坏也……可以…用力……还……还要♡嗯…嗯啊啊啊～♡♡」`,
            `「用屁股……高潮的话……是不是很……变态？但……但是♡嗯…嗯啊啊啊～♡♡」`,
          ][rand_n(3)],
        ); // :2317-2321 PRINTDATAL
        await era.printAndWait(
          `从屁股传来激烈的快感，让${target_name}失神地发出了淫荡的呻吟……`,
        ); // :2322
        kojo.背面座位肛交 = 7; // :2323
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.背面座位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2325
        await era.print(
          [
            `「真是…喜…喜欢……用这里吗？…唔…嗯啊…啊啊～♡♡」`,
            `「不…不要……太…用力哦…就…就是这样♡嗯…嗯啊啊啊～♡♡」`,
            `「不……不可以…太深了……轻…轻点呀♡……嗯…嗯啊啊啊～♡♡」`,
          ][rand_n(3)],
        ); // :2326-2330 PRINTDATAL
        kojo.背面座位肛交 = 6; // :2331
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2333
        if (era_flag.assiplay) {
          // :2334
          await era.printAndWait(
            `「唔！啊啊～再这样子会……会…不可以……嗯♡…嗯啊…啊啊～♡♡」`,
          ); // :2335
          await era.printAndWait(`（不行……这不是魔王大人……不能……但……但是……）`); // :2336
          await era.printAndWait(
            `从被侵犯的后穴传来了强烈的快感，${target_name}一边想着魔王大人一边咬牙承受着……`,
          ); // :2337
        } else {
          // :2333-2343
          await era.print(
            [
              `「嗯！呀！抱…抱歉…实在…是因为…太舒服了…嗯♡…嗯啊…啊啊～♡♡」`,
              `「啊～因为…是魔王大人……所以即使是……这种地方也……嗯♡…嗯啊…啊啊～♡♡」`,
              `「这里…也…想要热腾腾的……啊！${sc()}…真是太贪心了…嗯♡…嗯啊…啊啊～♡♡」`,
            ][rand_n(3)],
          ); // :2339-2343 PRINTDATAL
          await era.print(
            [
              `来自后穴的快感，让${target_name}恍惚失神甚至语无论次了起来……`,
              `${target_name}因为后穴的快感，一边呻吟一边向${player_name}求饶着……`,
              `${target_name}一心想要服侍${player_name}，但是快感太过强烈，似乎让他忘记了自己的目的……`,
            ][rand_n(3)],
          ); // :2344-2348 PRINTDATAL
        } // :2348-2350
        kojo.背面座位肛交 = 5; // :2350
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.背面座位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2352
        if (era_flag.assiplay) {
          // :2353
          await era.printAndWait(`「唔！嗯……嗯啊…不……呀！……啊…啊啊！」`); // :2354
          await era.printAndWait(`（这个身体是取悦魔王大人的，所以……所以……）`); // :2355
          await era.printAndWait(
            `${target_name}闭上了眼睛，顺从地承受${player_name}的侵犯……`,
          ); // :2356
        } else {
          // :2352-2362
          await era.print(
            [
              `「啊！魔王大人…喜…喜欢这里吗？那…那么……用坏了也没关系♡嗯…嗯啊啊啊～♡♡」`,
              `「虽然…用…这里…承欢……很羞耻…但是…只要您喜欢的话……${sc()}……嗯♡…嗯啊…啊啊～♡♡」`,
              `「用这个…污秽的地方……伺候尊贵的魔王大人…真的可以吗？……嗯♡…嗯啊…啊啊～♡♡」`,
            ][rand_n(3)],
          ); // :2358-2362 PRINTDATAL
          await era.print(
            [
              `比起自己肉体的愉悦，${target_name}似乎先顾虑着${player_name}的感受……`,
              `${target_name}努力地摆动着腰身，竭尽全力地想要让${player_name}觉得舒服……`,
              `尽管${target_name}气喘吁吁，但仍时不时观察照顾着${player_name}的感受……`,
            ][rand_n(3)],
          ); // :2363-2367 PRINTDATAL
        } // :2367-2369
        kojo.背面座位肛交 = 4; // :2369
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2371
        await era.print(
          [
            `「不…不要……屁股…感觉好奇怪啊…唔！嗯……啊…啊啊啊！」`,
            `「太……太深了……不……不行！嗯……啊…啊啊啊！」`,
            `「停……停下来啊……后面…会…会……啊…啊啊啊！」`,
          ][rand_n(3)],
        ); // :2372-2376 PRINTDATAL
        kojo.背面座位肛交 = 3; // :2377
      } else if (kojo.背面座位肛交 <= 1 || game.kojo.口上开关 == 2) {
        // :2379
        await era.print(
          [
            `「喜欢侵犯屁股的变态！去死！……唔！……不……好痛！……啊啊！」`,
            `「拔…拔出去啊！好痛！不…不要再进来了！……啊！……啊啊！」`,
            `「不！不要啊！要……要坏掉了……唔！……不……好痛！……啊啊！」`,
          ][rand_n(3)],
        ); // :2380-2384 PRINTDATAL
        await era.print(
          [
            `${target_name}发出了凄惨的悲鸣……`,
            `挣扎无用的${target_name}流下了屈辱的泪水……`,
            `即使${target_name}死命的挣扎，也无法改变被侵犯的事实……`,
          ][rand_n(3)],
        ); // :2385-2389 PRINTDATAL
        kojo.背面座位肛交 = 2; // :2390
      } // :2390-2392
      return 0; // :2390-2394
    } // :2390-2396
  } // :2391-2397

  if (era_flag.selectcom == 30) {
    // :2399

    if (kojo.手淫 == 0) {
      // :2401

      if (era0(`talent:${target}:76`) == 1) {
        // :2403
        await era.printAndWait(`「欸？用手就可以了吗？呵呵……真可惜呢……♡」`); // :2404
      } else if (era0(`talent:${target}:85`) == 1 && !era_flag.assiplay) {
        // :2406
        await era.printAndWait(`「用……手吗？好的……${sc()}会努力……」`); // :2407
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :2409
        await era.printAndWait(
          `「一定要${sc()}来吗？……算了……如果只是用手的话……」`,
        ); // :2410
        await era.printAndWait(
          `${target_name}皱着眉头，随意地抚弄着${player_name}的阴茎……`,
        ); // :2411
      } else {
        // :2412-2414
        await era.printAndWait(
          `「想让${sc()}碰这种脏东西？哼……就不怕被${sc()}折断吗？」`,
        ); // :2414
        await era.printAndWait(
          `${target_name}皱着眉头，十分嫌弃又笨拙地抚弄着${player_name}的阴茎……`,
        ); // :2415
      } // :2415-2417
      kojo.手淫 = 1; // :2417
      return 0; // :2415-2421
    } else {
      // :2419-2421

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2422
        await era.printAndWait(`「嗯…要快点变大喔……然后……呵呵……♡」`); // :2423
        await era.printAndWait(
          `${target_name}抱着热切的期待，积极地抚弄着${player_name}的阴茎……`,
        ); // :2424
        kojo.手淫 = 6; // :2425
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (kojo.手淫 <= 4 || game.kojo.口上开关 == 2) &&
        !era_flag.assiplay
      ) {
        // :2427
        await era.printAndWait(`「果然…还是魔王大人的……最棒呢♡」`); // :2428
        await era.printAndWait(
          `${target_name}露出痴迷崇敬的眼神，宛如膜拜似地服侍着${player_name}……`,
        ); // :2429
        kojo.手淫 = 5; // :2430
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 3 || game.kojo.口上开关 == 2) &&
        !era_flag.assiplay
      ) {
        // :2432
        await era.printAndWait(`「能为魔王大人服务，是${sc()}的荣幸……」`); // :2433
        await era.printAndWait(
          `${target_name}的手指动作灵活又细致，面带微笑地关注着${player_name}的感受……`,
        ); // :2434
        kojo.手淫 = 4; // :2435
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2437
        await era.printAndWait(`「……这样………够了没……」`); // :2438
        await era.printAndWait(
          `${target_name}皱着眉头，像是想要赶快结束那样，草率地抚弄着${player_name}的阴茎……`,
        ); // :2439
        kojo.手淫 = 3; // :2440
      } else if (kojo.手淫 <= 1 || game.kojo.口上开关 == 2) {
        // :2442
        await era.printAndWait(`「难道你不会自己弄吗？」`); // :2443
        await era.printAndWait(
          `${target_name}露出了嫌弃的表情，非常不情愿地抚弄着${player_name}的阴茎……`,
        ); // :2444
        kojo.手淫 = 2; // :2445
      } // :2444-2448
      return 0; // :2444-2450
    } // :2444-2452
  } // :2446-2452

  if (era_flag.selectcom == 31) {
    // :2454

    if (kojo.口交_奴 == 0) {
      // :2456

      if (era0(`talent:${target}:76`) == 1) {
        // :2458
        await era.printAndWait(`「欸？用嘴来吗？呵呵……真好奇是什么味道呢……♡」`); // :2459
      } else if (era0(`talent:${target}:85`) == 1 && !era_flag.assiplay) {
        // :2461
        await era.printAndWait(`「用……嘴吗？是魔王大人的话……${sc()}很乐意……」`); // :2462
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :2464
        await era.printAndWait(`「……舔……可以了吧……不要整个塞进来……唔！……」`); // :2465
        await era.printAndWait(
          `${target_name}皱着眉头，勉强地舔舐着${player_name}的阴茎……`,
        ); // :2466
      } else {
        // :2467-2469
        await era.printAndWait(`「这么脏的东西要${sc()}……？……呜……不……」`); // :2469
        await era.printAndWait(
          `还不等${target_name}把话说完，${player_name}的阴茎就强硬地抵住了他的嘴巴……`,
        ); // :2470
      } // :2470-2472
      kojo.口交_奴 = 1; // :2472
      return 0; // :2470-2476
    } else {
      // :2473-2477

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2477
        await era.printAndWait(
          `「嗯…咕啾……唔……好渴啊……可以……射给${sc()}……解渴吗……♡」`,
        ); // :2478
        kojo.口交_奴 = 6; // :2479
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2481
        await era.printAndWait(`「嗯…咕啾……唔……在嘴巴里面……变大了呢……♡」`); // :2482
        kojo.口交_奴 = 5; // :2483
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2) &&
        !era_flag.assiplay
      ) {
        // :2485
        await era.print(
          [
            `「嗯…咕啾……唔…好……好喜欢……魔王大人的………♡」`,
            `「嗯…咕啾……唔……魔王大人……舒服吗………♡」`,
            `「因为是魔王大人……所以…唔…咕啾……射…进嘴巴……也可以……♡」`,
          ][rand_n(3)],
        ); // :2486-2490 PRINTDATAL
        kojo.口交_奴 = 4; // :2491
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.口交_奴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2493
        await era.print(`「嗯…咕啾……唔……呼……可…可以了吧……」`); // :2494
        kojo.口交_奴 = 3; // :2495
      } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 == 2) {
        // :2497
        await era.printAndWait(`「咳！不……不要……唔……嗯……不……」`); // :2498
        await era.printAndWait(
          `${target_name}死命地想要拒绝，但是头部被${player_name}用手固定后被强迫着进行着口交……`,
        ); // :2499
        kojo.口交_奴 = 2; // :2500
      } // :2499-2503
      return 0; // :2499-2505
    } // :2499-2507
  } // :2501-2507

  if (era_flag.selectcom == 32) {
    // :2509

    if (kojo.乳交 == 0) {
      // :2511

      if (era0(`talent:${target}:76`) == 1) {
        // :2513
        await era.printAndWait(`「用胸部摩擦就会硬的话……那么……就来做吧～♡♡」`); // :2514
        await era.printAndWait(
          `${target_name}饶有兴致地配合着${player_name}的指示进行乳交……`,
        ); // :2515
        kojo.乳交 = 5; // :2516
      } else if (era0(`talent:${target}:85`) == 1) {
        // :2518
        await era.printAndWait(
          `「为了魔王大人，用胸部的服务的技巧……的确是有学习的必要呢！」`,
        ); // :2519
        await era.printAndWait(
          `${target_name}积极地配合着${player_name}的指示进行乳交……`,
        ); // :2520
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :2522
        await era.printAndWait(`「随便……你开心就好……」`); // :2523
        await era.printAndWait(
          `${target_name}皱着眉头，笨拙地照着${player_name}的指示进行乳交……`,
        ); // :2524
      } else {
        // :2525-2527
        await era.printAndWait(`「要${sc()}……用胸部？……真是变态的玩法呢……」`); // :2527
        await era.printAndWait(
          `${target_name}带着鄙视的眼神，心不甘情不愿地进行着乳交……`,
        ); // :2528
      } // :2528-2530
      kojo.乳交 = 1; // :2530
      return 0; // :2530-2532
    } else {
      // :2531-2535

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2535
        await era.print(
          [
            `「嗯啊～啊啊♡……光是用这里摩擦……就舒服到…想要高潮呢～♡♡」`,
            `「啊啊…变得好大…这么烫♡……快点啊……好想要呢～♡♡」`,
            `「还不能射吗？嗯……嗯啊～♡…好…想要热腾腾的牛奶啊～♡♡」`,
          ][rand_n(3)],
        ); // :2536-2540 PRINTDATAL
        await era.printAndWait(
          `${target_name}一边进行乳交，一边发出淫荡又高亢的呻吟……`,
        ); // :2541
        kojo.乳交 = 6; // :2542
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.口交_奴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2544
        await era.printAndWait(`「嗯……唔……快点变大哦……呵呵……好期待啊～♡♡」`); // :2545
        await era.printAndWait(
          `${target_name}用期待的眼神，看着夹在乳房中间渐渐勃起的阴茎……`,
        ); // :2546
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.乳交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2548
        if (era_flag.assiplay) {
          // :2549
          await era.printAndWait(`「如果这样子……感觉会更舒服吗？……」`); // :2550
          await era.printAndWait(
            `（为了能更好地服侍魔王大人……${sc()}要更加努力……让技巧更好才可以！）`,
          ); // :2551
          await era.printAndWait(
            `${target_name}认真的用乳房服侍摩擦着${player_name}勃起的阴茎……`,
          ); // :2552
        } else {
          // :2552-2554
          await era.print(
            [
              `「能服侍魔王大人实在是太幸福了！……嗯啊！这个热度……好棒……好舒服呢～♡♡」`,
              `「魔王大人觉得舒服吗？${sc()}觉得很舒服哦！似乎……一直做下去也可以呢～♡♡」`,
              `「这样子夹可以吗？如果……想要射在上面…也可以的哦～♡♡」`,
            ][rand_n(3)],
          ); // :2554-2558 PRINTDATAL
          await era.printAndWait(
            `${target_name}似乎非常开心，满脸通红热切地用乳房服侍着${player_name}勃起的阴茎……`,
          ); // :2559
        } // :2559-2561
        kojo.乳交 = 4; // :2561
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.乳交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2563
        await era.printAndWait(`「唔……变大了……在胸部上面……好烫……」`); // :2564
        await era.printAndWait(
          `${target_name}皱着眉头，用乳房摩擦着${player_name}勃起的阴茎……`,
        ); // :2565
        kojo.乳交 = 3; // :2566
      } else if (kojo.乳交 <= 1 || game.kojo.口上开关 == 2) {
        // :2568
        await era.printAndWait(`「这样……感觉……真是恶心……」`); // :2569
        await era.printAndWait(
          `${target_name}十分嫌弃地用乳房摩擦着${player_name}的阴茎……`,
        ); // :2570
        kojo.乳交 = 2; // :2571
      } // :2571-2573
      return 0; // :2571-2575
    } // :2571-2577
  } // :2572-2578

  if (era_flag.selectcom == 33) {
    // :2580

    if (kojo.股间性交 == 0) {
      // :2582

      if (era0(`talent:${target}:76`) == 1) {
        // :2584
        await era.printAndWait(''); // :2585
      } else if (era0(`talent:${target}:85`) == 1) {
        // :2587
        await era.printAndWait(''); // :2588
      } else {
        // :2587-2593
        await era.printAndWait(''); // :2591
      } // :2591-2593
      kojo.股间性交 = 1; // :2593
      return 0; // :2593-2595
    } else {
      // :2595-2597

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`talent:${target}:0`) == 1 &&
        (kojo.股间性交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2598
        await era.printAndWait(''); // :2599
        kojo.股间性交 = 6; // :2600
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.股间性交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2602
        await era.printAndWait(''); // :2603
        kojo.股间性交 = 5; // :2604
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`talent:${target}:0`) == 1 &&
        (kojo.股间性交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2606
        await era.printAndWait(''); // :2607
        await era.printAndWait(''); // :2608
        kojo.股间性交 = 4; // :2609
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.股间性交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2611
        await era.printAndWait(''); // :2612
        await era.printAndWait(''); // :2613
        kojo.股间性交 = 3; // :2614
      } else if (kojo.股间性交 <= 1 || game.kojo.口上开关 == 2) {
        // :2616
        await era.printAndWait(''); // :2617
        kojo.股间性交 = 2; // :2618
      } // :2618-2620
      return 0; // :2618-2622
    } // :2618-2624
  } // :2619-2625

  if (era_flag.selectcom == 34) {
    // :2627

    if (kojo.骑乘位 == 0) {
      // :2629

      if (era0(`talent:${target}:0`) == 1) {
        // :2631

        if (era0(`talent:${target}:76`) == 1) {
          // :2633
          await era.printAndWait(
            `「用骑乘位吗？能摆脱处女的话，什么姿势都可以哦～♡」`,
          ); // :2634
          await era.printAndWait(
            `${target_name}迫不及待地跨在${player_name}的身上，对准阴茎之后，义无反顾地坐了下去……`,
          ); // :2635
        } else if (era0(`talent:${target}:85`) == 1 && !era_flag.assiplay) {
          // :2637
          await era.printAndWait(`「能将处女奉献给魔王大人……真的很幸福……」`); // :2638
          await era.printAndWait(
            `听见要骑乘位的命令，${target_name}尽管没有做过，但还是露出了开心的笑容。`,
          ); // :2639
          await era.printAndWait(
            `「但是……因为是第一次……如果……做不好的地方……还请您多多『指教』哦♡」`,
          ); // :2640
          await era.printAndWait(
            `${target_name}小心翼翼地跨在${player_name}的身上，对准阴茎之后，义无反顾地坐了下去……`,
          ); // :2641
        } else {
          // :2642-2644
          await era.printAndWait(`「要${sc()}坐上去自己动？居……居然……可恶！」`); // :2644
          await era.printAndWait(
            `${target_name}似乎是气过头了，失去了平时的伶牙俐齿……`,
          ); // :2645
          await era.printAndWait(
            `尽管再怎么不愿意，但是如果不自己来的话，可能会有更可怕的后果……`,
          ); // :2646
          await era.printAndWait(`「算了……${sc()}…${sc()}……呜……」`); // :2647
          await era.printAndWait(
            `${target_name}明明还是处女，却像是自暴自弃那样，骑在了${player_name}的身上……`,
          ); // :2648
        } // :2648-2650
      } else {
        // :2648-2654

        if (era0(`talent:${target}:76`) == 1) {
          // :2653
          await era.printAndWait(
            `「这个姿势${sc()}很喜欢……关于技术嘛…呵呵……不妨试试看～♡」`,
          ); // :2654
          await era.printAndWait(
            `${target_name}迫不及待地跨在${player_name}的身上……`,
          ); // :2655
        } else if (era0(`talent:${target}:85`) == 1 && !era_flag.assiplay) {
          // :2657
          await era.printAndWait(
            `「魔王大人……喜欢这个姿势？那么……${sc()}…${sc()}当然……可以……」`,
          ); // :2658
          await era.printAndWait(
            `${target_name}双颊通红，顺从地跨在${player_name}的身上……`,
          ); // :2659
        } else {
          // :2660-2662
          await era.printAndWait(`「要${sc()}坐上去自己动？居……居然……可恶！」`); // :2662
          await era.printAndWait(
            `${target_name}似乎是气过头了，失去了平时的伶牙俐齿……`,
          ); // :2663
          await era.printAndWait(
            `尽管再怎么不愿意，但是如果不自己来的话，可能会有更可怕的后果……`,
          ); // :2664
          await era.printAndWait(`「算了……${sc()}…${sc()}……呜……」`); // :2665
          await era.printAndWait(
            `${target_name}像是自暴自弃那样，骑在了${player_name}的身上……`,
          ); // :2666
        } // :2666-2668
      } // :2666-2670
      kojo.骑乘位 = 1; // :2669
      return 0; // :2667-2673
    } else {
      // :2670-2674

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.骑乘位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2674
        await era.print(
          [
            `「嗯…哈啊…好…好棒♡…快…快点…射进来啊♡…嗯…嗯啊……啊啊♡♡」`,
            `「嗯…啊啊♡……顶……顶进来了♡……好…好烫……还…还要！…嗯♡……啊啊♡♡」`,
            `「全部…都……都进来了♡嗯……啊！好……好舒服…嗯…嗯啊……啊啊♡♡」`,
          ][rand_n(3)],
        ); // :2675-2679 PRINTDATAL
        await era.printAndWait(
          `${target_name}淫糜地摆动着腰肢，贪婪地榨取着${player_name}……`,
        ); // :2680
        kojo.骑乘位 = 6; // :2681
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.骑乘位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2683
        if (era_flag.assiplay) {
          // :2684
          await era.print(`「唔…啊……嗯……啊啊……」`); // :2685
          await era.printAndWait(
            `（在魔王大人面前……${sc()}……${sc()}居然坐在别人身上……呜）`,
          ); // :2686
          await era.printAndWait(
            `${target_name}闭着眼睛不敢看${master_name}的表情，只是顺从地骑在${player_name}身上扭摆着腰肢……`,
          ); // :2687
        } else {
          // :2683-2693
          await era.print(
            [
              `「魔王大人……觉得舒服吗？如果想要快一点……${sc()}…${sc()}也……嗯……啊啊♡」`,
              `「嗯…啊啊……顶……顶进来了♡……魔王大人…${sc()}……${sc()}……嗯♡……啊啊♡♡」`,
              `「全部…都……都进来了♡嗯……啊！好……好舒服…不愧是……魔王大人的……嗯……啊啊♡」`,
            ][rand_n(3)],
          ); // :2689-2693 PRINTDATAL
          await era.printAndWait(
            `${target_name}淫糜地摆动着腰肢，竭尽全力地取悦着${player_name}……`,
          ); // :2694
        } // :2694-2696
        kojo.骑乘位 = 5; // :2696
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (kojo.骑乘位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2698
        await era.print(
          [
            `「唔…不……不要这么…顶…${sc()}…${sc()}会……嗯……啊啊……不……」`,
            `「嗯…啊啊……顶……顶进来了……好…深……不……不行……啊啊」`,
            `「要…要被顶穿了……嗯……啊啊！不…不可以动……嗯……啊啊！」`,
          ][rand_n(3)],
        ); // :2699-2703 PRINTDATAL
        await era.printAndWait(
          `来自下身的强烈快感，让${target_name}呼吸急促地呻吟了起来……`,
        ); // :2704
        kojo.骑乘位 = 4; // :2705
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.骑乘位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2707
        await era.print(`「就…就当是坐在按摩椅上面……唔！……嗯……啊啊……」`); // :2708
        await era.printAndWait(
          `${target_name}皱着眉头，咬牙地在${player_name}身上起伏着……`,
        ); // :2709
        kojo.骑乘位 = 3; // :2710
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        // :2712
        await era.printAndWait(`「不……不要看！唔……别……别顶了……不要……呜」`); // :2713
        await era.printAndWait(
          `${target_name}屈辱地用手遮住了自己的脸庞，摇摇晃晃地骑在了的${player_name}身上……`,
        ); // :2714
        kojo.骑乘位 = 2; // :2715
      } // :2714-2718
      return 0; // :2714-2720
    } // :2714-2722
  } // :2716-2722

  if (era_flag.selectcom == 35) {
    // :2724

    if (kojo.全身擦洗 == 0) {
      // :2726

      if (era0(`abl:${target}:16`) >= 3) {
        // :2728
        await era.printAndWait(''); // :2729
      } else {
        // :2728-2734
        await era.printAndWait(''); // :2732
      } // :2732-2734
      kojo.全身擦洗 = 1; // :2734
      return 0; // :2734-2736
    } else {
      // :2735-2739

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (kojo.全身擦洗 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2739
        await era.printAndWait(''); // :2740
        kojo.全身擦洗 = 5; // :2741
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (kojo.全身擦洗 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2743
        await era.printAndWait(''); // :2744
        kojo.全身擦洗 = 4; // :2745
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.全身擦洗 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2747
        await era.printAndWait(''); // :2748
        kojo.全身擦洗 = 3; // :2749
      } else if (kojo.全身擦洗 <= 1 || game.kojo.口上开关 == 2) {
        // :2751
        await era.printAndWait(''); // :2752
        kojo.全身擦洗 = 2; // :2753
      } // :2753-2755
      return 0; // :2753-2757
    } // :2753-2759
  } // :2754-2760

  if (era_flag.selectcom == 36) {
    // :2762

    if (kojo.骑乘位肛交 == 0) {
      // :2764

      if (era0(`talent:${target}:76`) == 1) {
        // :2766
        await era.printAndWait(
          `「用这个姿势肛交……光想就决得很刺激♡…好啊……试试看♡」`,
        ); // :2767
        await era.printAndWait(
          `${target_name}迫不及待地跨在${player_name}的身上……`,
        ); // :2768
      } else if (era0(`talent:${target}:85`) == 1 && !era_flag.assiplay) {
        // :2770
        await era.printAndWait(
          `「如果是魔王的命令……那么……当然很乐意为您服务……♡」`,
        ); // :2771
        await era.printAndWait(
          `尽管${target_name}没有骑乘式肛交的经验，但他还是小心翼翼地跨坐在${player_name}的身上……`,
        ); // :2772
      } else {
        // :2773-2775
        await era.printAndWait(`「居……居然…要${sc()}自己……真是变态！」`); // :2775
        await era.printAndWait(
          `${target_name}露出痛恨的表情，不情不愿地跨坐在${player_name}的身上……`,
        ); // :2776
      } // :2776-2778
      kojo.骑乘位肛交 = 1; // :2778
      return 0; // :2778-2780
    } else {
      // :2779-2783

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2783
        if (rand_n(2) == 0) {
          // :2784
          await era.printAndWait(
            `「啊啊！……好棒♡停…停不下来啊……嗯啊……啊啊啊♡♡」`,
          ); // :2785
        } else {
          // :2785-2787
          await era.printAndWait(
            `「要……要用屁股高潮了♡……啊啊……快点……快射进来♡……啊啊♡♡」`,
          ); // :2787
        } // :2787-2789
        await era.printAndWait(
          `${target_name}沉醉在后穴带来的快感里，淫荡地扭动着腰肢呻吟着……`,
        ); // :2789
        kojo.骑乘位肛交 = 7; // :2790
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.骑乘位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2792
        await era.printAndWait(
          `「真……没想到……屁股……也能有这种快感……嗯啊……啊啊啊♡♡」`,
        ); // :2793
        await era.printAndWait(
          `${target_name}积极地在${player_name}的身上起伏着……`,
        ); // :2794
        kojo.骑乘位肛交 = 6; // :2795
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2797
        if (era_flag.assiplay) {
          // :2798
          await era.print(
            `「唔…啊……嗯……啊啊……不……不行……这样下去…嗯啊……啊啊啊♡♡」`,
          ); // :2799
          await era.printAndWait(
            `（明明不是魔王大人……${sc()}……${sc()}却……啊啊……）`,
          ); // :2800
          await era.printAndWait(
            `强烈的快感贯穿了${target_name}，让他忘记了对象是谁，只能淫荡地摆动着腰肢……`,
          ); // :2801
        } else {
          // :2801-2803
          await era.print(
            [
              `「魔王大人…太…太棒了♡…抱…抱歉…要…要高潮了♡……啊……啊啊啊♡♡」`,
              `「嗯…啊啊……顶……顶进来了♡……魔王大人…请…请射在里面♡……嗯♡……啊啊♡♡」`,
              `「屁股…好奇怪啊♡嗯……啊！好……好棒…不愧是……魔王大人的……嗯……啊啊♡」`,
            ][rand_n(3)],
          ); // :2803-2807 PRINTDATAL
          await era.printAndWait(
            `强烈的快感让${target_name}忘情地${player_name}在身上起伏着，发出了急促高昂的呻吟……`,
          ); // :2808
        } // :2808-2810
        kojo.骑乘位肛交 = 5; // :2810
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2812
        if (era_flag.assiplay) {
          // :2813
          await era.print(`「唔…啊……嗯……啊啊……」`); // :2814
          await era.printAndWait(
            `（在魔王大人面前……${sc()}……${sc()}居然坐在别人身上……呜）`,
          ); // :2815
          await era.printAndWait(
            `${target_name}闭着眼睛不敢看${master_name}的表情，只是顺从地骑在${player_name}身上扭摆着腰肢……`,
          ); // :2816
        } else {
          // :2812-2822
          await era.print(
            [
              `「魔王大人……觉得舒服吗？如果想要快一点……${sc()}…${sc()}也……嗯……啊啊♡」`,
              `「嗯…啊啊……顶……顶进来了♡……魔王大人…${sc()}……${sc()}……嗯♡……啊啊♡♡」`,
              `「全部…都……都进来了♡嗯……啊！好……好舒服♡…不愧是……魔王大人的……嗯……啊啊♡」`,
            ][rand_n(3)],
          ); // :2818-2822 PRINTDATAL
          await era.printAndWait(
            `${target_name}淫糜地摆动着腰肢，竭尽全力地取悦着${player_name}……`,
          ); // :2823
        } // :2823-2825
        kojo.骑乘位肛交 = 4; // :2825
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2827
        await era.printAndWait(`「唔……这……这种感觉……不……不行……嗯……啊啊！」`); // :2828
        await era.printAndWait(
          `从后穴传来的异样感，让${target_name}忍不住发出了呻吟……`,
        ); // :2829
        kojo.骑乘位肛交 = 3; // :2830
      } else if (kojo.骑乘位肛交 <= 1 || game.kojo.口上开关 == 2) {
        // :2832
        await era.printAndWait(`「不……好痛……不行了……要坏掉了……啊啊啊！」`); // :2833
        await era.printAndWait(
          `${target_name}露出痛苦的表情，艰难地在${player_name}的身上起伏着……`,
        ); // :2834
        kojo.骑乘位肛交 = 2; // :2835
      } // :2835-2837
      return 0; // :2835-2839
    } // :2835-2841
  } // :2836-2842

  if (era_flag.selectcom == 37) {
    // :2844

    if (kojo.肛门侍奉 == 0) {
      // :2846

      if (era0(`abl:${target}:16`) >= 3) {
        // :2848
        await era.printAndWait(''); // :2849
      } else {
        // :2842-2860
        await era.printAndWait(''); // :2852
      } // :2842-2864
      kojo.肛门侍奉 = 1; // :2854
      return 0; // :2852-2858
    } else {
      // :2855-2859

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2859
        await era.printAndWait(''); // :2860
        kojo.肛门侍奉 = 5; // :2861
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2863
        await era.print(''); // :2864
        kojo.肛门侍奉 = 4; // :2865
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2867
        await era.printAndWait(''); // :2868
        kojo.肛门侍奉 = 3; // :2869
      } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 == 2) {
        // :2871
        await era.printAndWait(''); // :2872
        kojo.肛门侍奉 = 2; // :2873
      } // :2859-2877
      return 0; // :2859-2877
    } // :2859-2877
  } // :2859-2877

  if (era_flag.selectcom == 40) {
    // :2882

    if (
      kojo.打屁股 == 0 &&
      !(era0(`talent:${target}:76`) || era0(`talent:${target}:85`))
    ) {
      // :2884
      await era.printAndWait(`「居……居然……打……可恶！放开……唔！」`); // :2885
      await era.printAndWait(
        `宛如惩罚小孩子一样地被拍打着屁股，${target_name}羞恼地瞪大了眼睛……`,
      ); // :2886
      kojo.打屁股 = 1; // :2887
      return 0; // :2887-2889
    } else {
      // :2889-2891

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.打屁股 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2892
        await era.printAndWait(`「哈啊……啊……太…太棒了♡…用……用力……啊啊啊～♡♡」`); // :2893
        await era.printAndWait(
          `随着拍打屁股的啪啪声，${target_name}却因为疼痛渐渐兴奋了起来……`,
        ); // :2894
        kojo.打屁股 = 5; // :2895
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.打屁股 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2897
        await era.printAndWait(`「哈啊……啊……好……好痛♡……但是……也…好舒服～♡♡」`); // :2898
        await era.printAndWait(
          `随着拍打屁股的啪啪声，${target_name}却因为疼痛渐渐兴奋了起来……`,
        ); // :2899
        kojo.打屁股 = 4; // :2900
        return 0; // :2900-2902
      } else if (
        era0(`mark:${target}:0`) == 3 &&
        era0(`mark:${target}:2`) == 3 &&
        (kojo.打屁股 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2903
        await era.printAndWait(`「唔！………不……啊……」`); // :2904
        await era.printAndWait(
          `${target_name}紧闭着眼睛，身体因忍耐疼痛与屈辱而微微颤抖着……`,
        ); // :2905
        kojo.打屁股 = 3; // :2906
        return 0; // :2906-2908
      } else if (kojo.打屁股 <= 1 && game.kojo.口上开关 == 2) {
        // :2909
        await era.printAndWait(`「混……混帐！……放……放开${sc()}！……啊！」`); // :2910
        kojo.打屁股 = 2; // :2911
      } // :2911-2913
      return 0; // :2911-2915
    } // :2911-2917
  } // :2912-2918

  if (era_flag.selectcom == 41) {
    // :2920

    if (kojo.鞭 == 0) {
      // :2922

      if (era0(`talent:${target}:76`) == 1) {
        // :2924
        await era.printAndWait(''); // :2925
      } else if (era0(`talent:${target}:85`) == 1) {
        // :2927
        await era.printAndWait(''); // :2928
      } else {
        // :2927-2933
        await era.printAndWait(''); // :2931
      } // :2931-2933
      kojo.鞭 = 1; // :2933
      return 0; // :2933-2935
    } else {
      // :2934-2938

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.鞭 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :2938
        await era.printAndWait(''); // :2939
        kojo.鞭 = 9; // :2940
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :2942
        await era.printAndWait(''); // :2943
        kojo.鞭 = 8; // :2944
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.鞭 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2946
        await era.printAndWait(''); // :2947
        kojo.鞭 = 7; // :2948
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.鞭 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2950
        await era.printAndWait(''); // :2951
        kojo.鞭 = 6; // :2952
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2954
        await era.printAndWait(''); // :2955
        kojo.鞭 = 5; // :2956
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.鞭 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2958
        await era.printAndWait(''); // :2959
        kojo.鞭 = 4; // :2960
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2962
        await era.printAndWait(''); // :2963
        kojo.鞭 = 3; // :2964
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        // :2966
        await era.printAndWait(''); // :2967
        kojo.鞭 = 2; // :2968
      } // :2968-2970
      return 0; // :2968-2972
    } // :2968-2974
  } // :2969-2975

  if (era_flag.selectcom == 42) {
    // :2977

    if (kojo.针 == 0) {
      // :2979

      if (era0(`talent:${target}:76`) == 1) {
        // :2981
        await era.printAndWait(''); // :2982
      } else if (era0(`talent:${target}:85`) == 1) {
        // :2984
        await era.printAndWait(''); // :2985
      } else {
        // :2984-2990
        await era.printAndWait(''); // :2988
      } // :2988-2990
      kojo.针 = 1; // :2990
      return 0; // :2990-2992
    } else {
      // :2991-2995

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.针 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :2995
        await era.printAndWait(''); // :2996
        kojo.针 = 9; // :2997
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :2999
        await era.printAndWait(''); // :3000
        kojo.针 = 8; // :3001
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.针 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :3003
        await era.printAndWait(''); // :3004
        kojo.针 = 7; // :3005
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.针 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3007
        await era.printAndWait(''); // :3008
        kojo.针 = 6; // :3009
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3011
        await era.printAndWait(''); // :3012
        kojo.针 = 5; // :3013
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.针 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3015
        await era.printAndWait(''); // :3016
        kojo.针 = 4; // :3017
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3019
        await era.printAndWait(''); // :3020
        kojo.针 = 3; // :3021
      } else if (kojo.针 <= 1 || game.kojo.口上开关 == 2) {
        // :3023
        await era.printAndWait(''); // :3024
        kojo.针 = 2; // :3025
      } // :3025-3027
      return 0; // :3025-3029
    } // :3025-3031
  } // :3026-3032

  if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`)) {
    // :3035

    if (kojo.眼罩 == 0) {
      // :3037

      if (era0(`talent:${target}:76`) == 1) {
        // :3039
        await era.printAndWait(''); // :3040
      } else if (era0(`talent:${target}:85`) == 1) {
        // :3042
        await era.printAndWait(''); // :3043
      } else {
        // :3037-3053
        await era.printAndWait(''); // :3046
      } // :3037-3057
      kojo.眼罩 = 1; // :3048
      return 0; // :3046-3052
    } else {
      // :3049-3053

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :3053
        await era.printAndWait(''); // :3054
        kojo.眼罩 = 9; // :3055
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :3057
        await era.printAndWait(''); // :3058
        kojo.眼罩 = 8; // :3059
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.眼罩 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :3061
        await era.printAndWait(''); // :3062
        kojo.眼罩 = 7; // :3063
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3065
        await era.printAndWait(''); // :3066
        kojo.眼罩 = 6; // :3067
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3069
        await era.printAndWait(''); // :3070
        kojo.眼罩 = 5; // :3071
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.眼罩 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3073
        await era.printAndWait(''); // :3074
        kojo.眼罩 = 4; // :3075
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3077
        await era.printAndWait(''); // :3078
        kojo.眼罩 = 3; // :3079
      } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 == 2) {
        // :3081
        await era.printAndWait(''); // :3082
        kojo.眼罩 = 2; // :3083
      } // :3084-3089
      return 0; // :3085-3089
    } // :3083-3089
  } else if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`) == 0) {
    // :3088

    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.眼罩着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :3090
      await era.printAndWait(''); // :3091
      kojo.眼罩着脱 = 3; // :3092
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.眼罩着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :3094
      await era.printAndWait(''); // :3095
      kojo.眼罩着脱 = 2; // :3096
    } else if (kojo.眼罩着脱 < 1 || game.kojo.口上开关 == 2) {
      // :3098
      await era.printAndWait(''); // :3099
      kojo.眼罩着脱 = 1; // :3100
    } // :3100-3102
    return 0; // :3100-3104
  } // :3100-3106

  if (era_flag.selectcom == 44 && era0(`tequip:${target}:44`)) {
    // :3109

    if (kojo.绳子 == 0) {
      // :3111

      if (era0(`talent:${target}:76`) == 1) {
        // :3113
        await era.printAndWait(''); // :3114
      } else if (era0(`talent:${target}:85`) == 1) {
        // :3116
        await era.printAndWait(''); // :3117
      } else {
        // :3116-3122
        await era.printAndWait(''); // :3120
      } // :3120-3122
      kojo.绳子 = 1; // :3122
      return 0; // :3122-3124
    } else {
      // :3123-3127

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.绳子 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :3127
        await era.printAndWait(''); // :3128
        kojo.绳子 = 9; // :3129
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :3131
        await era.printAndWait(''); // :3132
        kojo.绳子 = 8; // :3133
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.绳子 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :3135
        await era.printAndWait(''); // :3136
        kojo.绳子 = 7; // :3137
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.绳子 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3139
        await era.printAndWait(''); // :3140
        kojo.绳子 = 6; // :3141
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3143
        await era.printAndWait(''); // :3144
        kojo.绳子 = 5; // :3145
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.绳子 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3147
        await era.printAndWait(''); // :3148
        kojo.绳子 = 4; // :3149
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3151
        await era.printAndWait(''); // :3152
        kojo.绳子 = 3; // :3153
      } else if (kojo.绳子 <= 1 || game.kojo.口上开关 == 2) {
        // :3155
        await era.printAndWait(''); // :3156
        kojo.绳子 = 2; // :3157
      } // :3157-3159
      return 0; // :3157-3161
    } // :3158-3162
  } else if (era_flag.selectcom == 44 && era0(`tequip:${target}:44`) == 0) {
    // :3162

    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :3164
      await era.printAndWait(''); // :3165
      kojo.绳子着脱 = 2; // :3166
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :3168
      await era.printAndWait(''); // :3169
      kojo.绳子着脱 = 2; // :3170
    } else if (kojo.绳子着脱 < 1 || game.kojo.口上开关 == 2) {
      // :3172
      await era.printAndWait(''); // :3173
      kojo.绳子着脱 = 1; // :3174
    } // :3174-3176
    return 0; // :3174-3178
  } // :3174-3180

  if (era_flag.selectcom == 45 && era0(`tequip:${target}:45`)) {
    // :3183

    if (kojo.口塞 == 0) {
      // :3185

      if (era0(`talent:${target}:76`) == 1) {
        // :3187
        await era.printAndWait(''); // :3188
      } else if (era0(`talent:${target}:85`) == 1) {
        // :3190
        await era.printAndWait(''); // :3191
      } else {
        // :3190-3196
        await era.printAndWait(''); // :3194
      } // :3194-3196
      kojo.口塞 = 1; // :3196
      return 0; // :3196-3198
    } else {
      // :3197-3201

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.口塞 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :3201
        await era.printAndWait(''); // :3202
        kojo.口塞 = 9; // :3203
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :3205
        await era.printAndWait(''); // :3206
        kojo.口塞 = 8; // :3207
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.口塞 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :3209
        await era.printAndWait(''); // :3210
        kojo.口塞 = 7; // :3211
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.口塞 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3213
        await era.printAndWait(''); // :3214
        kojo.口塞 = 6; // :3215
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3217
        await era.printAndWait(''); // :3218
        kojo.口塞 = 5; // :3219
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.口塞 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3221
        await era.printAndWait(''); // :3222
        kojo.口塞 = 4; // :3223
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3225
        await era.printAndWait(''); // :3226
        kojo.口塞 = 3; // :3227
      } else if (kojo.口塞 <= 1 || game.kojo.口上开关 == 2) {
        // :3229
        await era.printAndWait(''); // :3230
        kojo.口塞 = 2; // :3231
      } // :3231-3233
      return 0; // :3231-3235
    } // :3232-3236
  } else if (era_flag.selectcom == 45 && era0(`tequip:${target}:45`) == 0) {
    // :3236

    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.口塞着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :3238
      await era.printAndWait(''); // :3239
      kojo.口塞着脱 = 3; // :3240
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.口塞着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :3242
      await era.printAndWait(''); // :3243
      kojo.口塞着脱 = 2; // :3244
    } else if (kojo.口塞着脱 < 1 || game.kojo.口上开关 == 2) {
      // :3246
      await era.printAndWait(''); // :3247
      kojo.口塞着脱 = 1; // :3248
    } // :3248-3250
    return 0; // :3248-3252
  } // :3248-3254

  if (era_flag.selectcom == 46 && era0(`tequip:${target}:46`)) {
    // :3257

    if (kojo.灌肠肛塞 == 0) {
      // :3259

      if (era0(`talent:${target}:76`) == 1) {
        // :3261
        await era.printAndWait(`「灌肠……吗？欸……这没试过呢……好哦……来吧～♡」`); // :3262
        await era.printAndWait(
          `对于没试过的『花样』，${target_name}都很感兴趣的样子……`,
        ); // :3263
      } else if (era0(`talent:${target}:85`) == 1) {
        // :3265
        await era.printAndWait(`「为了魔王大人，清洁身体是必要的…但…但是……」`); // :3266
        await era.printAndWait(`「这种丑态……有点……不想让魔王大人看见呢………」`); // :3267
        await era.printAndWait(
          `比起灌肠的痛苦，${target_name}似乎更在意${master_name}的观感……`,
        ); // :3268
      } else {
        // :3269-3271
        await era.printAndWait(
          `「去……去死！……你脑子里只有这些下作的事情？…不！…啊啊啊！」`,
        ); // :3271
      } // :3271-3273
      kojo.灌肠肛塞 = 1; // :3273
      return 0; // :3273-3275
    } else {
      // :3275-3277

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.灌肠肛塞 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :3278
        await era.printAndWait(
          `「哈啊……啊…屁股…肚子…灌满的感觉♡…啊……好……好棒～♡♡」`,
        ); // :3279
        await era.printAndWait(
          `${target_name}狼狈地喘息着，似乎沉醉在屁股撑开胀满的快感之中了……`,
        ); // :3280
        kojo.灌肠肛塞 = 7; // :3281
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.灌肠肛塞 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3283
        await era.printAndWait(
          `「哈啊…啊…好…好胀……感觉……随时都要排……出来了……啊…啊啊～♡♡」`,
        ); // :3284
        await era.printAndWait(
          `屁股被撑开胀满的感觉，${target_name}不停喘息呻吟着……`,
        ); // :3285
        kojo.灌肠肛塞 = 6; // :3286
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.灌肠肛塞 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3288
        await era.printAndWait(
          `「哈啊…啊…不……不行……这种沉醉在屁股……的丑态♡……啊啊…魔王大人～♡♡」`,
        ); // :3289
        await era.printAndWait(
          `由于屁股被撑开胀满的快感太过强烈，${target_name}不由自主地呼唤魔王大人的名字……`,
        ); // :3290
        kojo.灌肠肛塞 = 5; // :3291
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.灌肠肛塞 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3293
        await era.printAndWait(
          `「哈啊…啊…好…好胀……这……这都是为了魔王大人……唔……」`,
        ); // :3294
        await era.printAndWait(
          `${target_name}冒着冷汗，咬牙地忍耐着强烈的排泄感……`,
        ); // :3295
        kojo.灌肠肛塞 = 4; // :3296
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.灌肠肛塞 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3298
        await era.printAndWait(`「哈啊…啊……不……不……这样……唔！……啊啊……」`); // :3299
        await era.printAndWait(
          `异样的鼓胀与快感让${target_name}咬牙地忍耐着……`,
        ); // :3300
        kojo.灌肠肛塞 = 3; // :3301
      } else if (kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 == 2) {
        // :3303
        await era.printAndWait(
          `「这……这种羞辱……总…总有一天……唔！啊啊啊！」			PRINTFORMW 异样的鼓胀与痛苦，让${target_name}发出屈辱的叫喊……`,
        ); // :3304
        kojo.灌肠肛塞 = 2; // :3305
      } // :3305-3307
      return 0; // :3305-3309
    } // :3306-3310
  } else if (era_flag.selectcom == 46 && era0(`tequip:${target}:46`) == 0) {
    // :3310

    if (era0(`talent:${target}:76`) == 1) {
      // :3312

      if (era0(`abl:${target}:3`) >= 3 && era0(`abl:${target}:21`) >= 3) {
        // :3314
        await era.printAndWait(
          `「呀啊啊！看……看啊……都…排……排出来了哦♡……啊……啊啊～♡♡」`,
        ); // :3315
        await era.printAndWait(
          `${target_name}不知廉耻地展示当场排泄的丑态，甚至还因为宣泄的快感而淫荡地呻吟……`,
        ); // :3316
        if (era0(`exp:${target}:53`) >= 5) {
          // :3318
          await era.print(
            `从那已经完全扩张开来的地方，似乎还能看见痉挛收缩的肠壁……`,
          ); // :3318
        } // :3318
      } else {
        // :3318-3320
        await era.printAndWait(
          `「呜……啊啊啊……排……排出来了……呜……都弄脏了呢……♡♡」`,
        ); // :3320
        await era.printAndWait(
          `尽管丑态尽现，${target_name}比起羞耻，似乎更苦恼身体弄脏了的样子……`,
        ); // :3321
      } // :3321-3323
    } else if (era0(`talent:${target}:85`) == 1) {
      // :3324

      if (era0(`abl:${target}:3`) >= 3 && era0(`abl:${target}:21`) >= 3) {
        // :3326
        await era.printAndWait(
          `「啊啊…出…出来了…抱…抱歉…但…但是…好…好舒服啊…啊啊～♡♡」`,
        ); // :3327
        await era.printAndWait(
          `宣泄的快感让${target_name}不由自主地呻吟了起来，忘记了自己丑态尽现的样子……`,
        ); // :3328
      } else {
        // :3328-3330
        await era.printAndWait(
          `「啊啊……出……出来了……请……请别看…这…这种……呜……」`,
        ); // :3330
        await era.printAndWait(
          `在魔王大人面前丑态尽现，${target_name}似乎感到十分地懊恼羞愧……`,
        ); // :3331
      } // :3331-3333
    } else if (era0(`abl:${target}:3`) >= 3 && era0(`abl:${target}:21`) >= 3) {
      // :3334
      await era.printAndWait(`「啊啊……不……不行……嗯……啊啊……」`); // :3335
      await era.printAndWait(
        `奇异的宣泄感与羞耻交织着，让${target_name}发出了模糊的呻吟……`,
      ); // :3336
    } else {
      // :3336-3338
      await era.printAndWait(
        `「不！不要！……啊啊啊！！不…不要看啊……啊啊啊！！」`,
      ); // :3338
      await era.printAndWait(
        `被迫当场排泄的${target_name}，发出了崩溃似的惨叫……`,
      ); // :3339
    } // :3339-3341
  } // :3339-3343

  if (era_flag.selectcom == 55) {
    // :3345

    if (kojo.放置PLAY == 0) {
      // :3347

      if (era0(`talent:${target}:85`) == 1) {
        // :3349
        await era.printAndWait(''); // :3350
      } else {
        // :3349-3355
        await era.printAndWait(''); // :3353
      } // :3353-3355
      kojo.放置PLAY = 1; // :3355
      return 0; // :3355-3357
    } else {
      // :3357-3359

      if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`palam:${target}:5`) >= PALAMLV[3] &&
        (kojo.放置PLAY <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(''); // :3361
        kojo.放置PLAY = 4; // :3362
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.放置PLAY <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3364
        await era.printAndWait(''); // :3365
        kojo.放置PLAY = 3; // :3366
      } else if (kojo.放置PLAY <= 1 || game.kojo.口上开关 == 2) {
        // :3368
        await era.printAndWait(''); // :3369
        kojo.放置PLAY = 2; // :3370
      } // :3370-3372
      return 0; // :3370-3374
    } // :3370-3376
  } // :3371-3377

  if (era_flag.selectcom == 56) {
    // :3380

    if (kojo.交谈 == 0) {
      // :3382
      if (era0(`tequip:${target}:53`)) {
        // :3383

        if (era0(`talent:${target}:76`) == 1) {
          // :3386
          await era.printAndWait(
            `「正在录像吗？嘿嘿～正好♡来宣扬魔王大人的伟大吧？」`,
          ); // :3387
          await era.printAndWait(
            `${target_name}熟练地摆出了一个性感的姿势，露出了魅惑的微笑。`,
          ); // :3388
          await era.printAndWait(
            `「还在地面上苦苦挣扎的人们啊，如果有幸能看到这个影像，这就是魔神对你们的眷顾。」`,
          ); // :3389
          await era.printAndWait(
            `「只在魔王的身边才有无上的欢愉，而非虚伪的正义。所谓『正义』也不过是中二病的口号。」`,
          ); // :3390
          await era.printAndWait(
            `「${sc()}也不想浪费时间，既然口说无凭，请大家接下来眼见为实吧～♡」`,
          ); // :3391
          await era.printAndWait(
            `说完之后，${target_name}的双颊染上了情欲的红晕，看来已经开始期待接下来的调教内容了……`,
          ); // :3392
        } else if (era0(`talent:${target}:85`) == 1) {
          // :3394
          await era.printAndWait(
            `「正在录像吗？那么不妨来宣扬魔王大人的伟大吧？」`,
          ); // :3395
          await era.printAndWait(
            `${target_name}仔细地摆好了虔诚的姿势，端庄地宛如要举行祭祀典礼一般。`,
          ); // :3396
          await era.printAndWait(
            `「还在地面上苦苦挣扎的人们啊，如果有幸能看到这个影像，这就是魔神对你们的眷顾。」`,
          ); // :3397
          await era.printAndWait(
            `「以前${sc()}也是被所谓的『正义』蒙蔽的一员，然而这个虚伪的名词至今仍在迫害着你们。」`,
          ); // :3398
          await era.printAndWait(
            `「唯有来到魔王的身边，才有真正的『自由与爱』，只要大家了解这点，才能有和平的一天。」`,
          ); // :3399
          await era.printAndWait(
            `说完之后，${target_name}露出崇拜的眼神，已经迫不及待将『真正的爱』揭露在大众面前了……`,
          ); // :3400
        } else {
          // :3401-3403
          await era.printAndWait(
            `「有这闲工夫，怎不去拍拍迷宫中魔物被勇者消灭的影像？那还比较有观赏价值呢！」`,
          ); // :3403
          await era.printAndWait(
            `除了冷嘲热讽之外，${target_name}完全不想说其他的话语……`,
          ); // :3404
        } // :3404-3406
      } else {
        // :3404-3408

        if (era0(`talent:${target}:76`) == 1) {
          // :3408
          await era.printAndWait(
            `「欸？这个时候聊天？呵呵……该不会是想要训练『淫语』的技能？」`,
          ); // :3409
          await era.printAndWait(
            `${target_name}露出了恍然大悟的神情，意味深长地看着${player_name}……`,
          ); // :3410
        } else if (era0(`talent:${target}:85`) == 1) {
          // :3412
          if (era_flag.assiplay) {
            // :3413
            await era.printAndWait(
              `「嗯？同在魔王大人麾下，也许交流一下也不错吧？」`,
            ); // :3414
            await era.printAndWait(
              `${target_name}思考了一下谈话的内容，与${player_name}聊了起来……`,
            ); // :3415
          } else {
            // :3415-3417
            await era.printAndWait(
              `「嗯？聊天吗？好啊……想知道什么都可以哦！」`,
            ); // :3417
            await era.printAndWait(
              `${target_name}的眼睛开心的眯起，柔顺地倚在${player_name}的身边轻声细语着……`,
            ); // :3418
          } // :3418-3420
        } else {
          // :3420-3422
          await era.printAndWait(
            `「抱歉…请恕${sc()}没有点亮跟垃圾交流的技巧……」`,
          ); // :3422
          await era.printAndWait(
            `${target_name}转过了头去，冷淡地发挥着毒舌的本领……`,
          ); // :3423
        } // :3423-3425
      } // :3423-3427
      kojo.交谈 = 1; // :3426
      return 0; // :3423-3431
    } else {
      // :3426-3432
      if (era0(`tequip:${target}:53`)) {
        // :3430

        if (
          era0(`talent:${target}:76`) == 1 &&
          (kojo.交谈 <= 3 || game.kojo.口上开关 == 2)
        ) {
          // :3433
          await era.printAndWait(
            `「看了上次的水晶球影像，不知大家的『下身』是否有感受到魔神带来的欢愉呢？」`,
          ); // :3434
          await era.printAndWait(
            `「如果是的话，那${sc()}也很为你们感受到庆幸，来吧，这边随时敞开欢迎哦～♡」`,
          ); // :3435
          await era.printAndWait(
            `「当然，如果没有感受到的话，那么，也请接下来睁大眼睛继续看吧？」`,
          ); // :3436
          await era.printAndWait(
            `${target_name}似乎很热心地用身体进行着魔王的传教活动……`,
          ); // :3437
          kojo.交谈 = 4; // :3438
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          (kojo.交谈 <= 2 || game.kojo.口上开关 == 2)
        ) {
          // :3440
          await era.printAndWait(
            `「身体的反应最是诚实，就像饿了要吃，冷了要取暖一样。」`,
          ); // :3441
          await era.printAndWait(
            `「几句道德伦理凭什么来拘束${sc()}们本来就具有的天性呢？」`,
          ); // :3442
          await era.printAndWait(
            `「请不要再被洗脑了，唯有魔王是你们解放与自由的皈依。」`,
          ); // :3443
          await era.printAndWait(
            `${target_name}似乎热衷于把口才发挥在魔王的传教活动上面……`,
          ); // :3444
          kojo.交谈 = 3; // :3445
        } else if (kojo.交谈 <= 1 || game.kojo.口上开关 == 2) {
          // :3447
          await era.printAndWait(
            `「难道是因为找不到对象，才只会用逼迫的手段吗？哦……真是可悲呢……」`,
          ); // :3448
          await era.printAndWait(
            `${target_name}依然是平淡地说着气死人不偿命的话……`,
          ); // :3449
          kojo.交谈 = 2; // :3450
        } // :3450-3452
      } else {
        // :3450-3454

        if (
          era0(`talent:${target}:76`) == 1 &&
          (kojo.交谈 <= 3 || game.kojo.口上开关 == 2)
        ) {
          // :3454
          await era.printAndWait(
            `「欸？${sc()}都这个样子了……要聊些什么呢？还不如……」`,
          ); // :3455
          await era.printAndWait(
            `${target_name}抚弄着自己火热发烫的身体，用无奈的表情看着${player_name}……`,
          ); // :3456
          kojo.交谈 = 4; // :3457
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          (kojo.交谈 <= 2 || game.kojo.口上开关 == 2)
        ) {
          // :3459
          if (era_flag.assiplay) {
            // :3460
            await era.printAndWait(
              `「嗯？好啊，交流一下如何服侍好魔王大人的技巧吧？」`,
            ); // :3461
            await era.printAndWait(
              `${target_name}思考了一下谈话的内容，与${player_name}聊了起来……`,
            ); // :3462
          } else {
            // :3462-3464
            await era.printAndWait(
              `「嗯？聊天吗？好啊……${sc()}还想知道更多您的事情！」`,
            ); // :3464
            await era.printAndWait(
              `${target_name}的眼睛开心的眯起，柔顺地倚在${player_name}的身边轻声细语着……`,
            ); // :3465
          } // :3465-3467
          kojo.交谈 = 3; // :3467
        } else if (kojo.交谈 <= 1 || game.kojo.口上开关 == 2) {
          // :3469
          await era.printAndWait(`「可以的话，不想浪费力气跟残渣说话。」`); // :3470
          await era.printAndWait(
            `${target_name}依然是平淡地说着气死人不偿命的话……`,
          ); // :3471
          kojo.交谈 = 2; // :3472
        } // :3471-3475
      } // :3471-3477
      return 0; // :3472-3478
    } // :3473-3479
  } // :3475-3479

  if (era_flag.selectcom == 123) {
    // :3481

    if (kojo.乳夹口交 == 0) {
      // :3483

      if (era0(`talent:${target}:76`) == 1) {
        // :3485
        await era.printAndWait(''); // :3486
      } else if (era0(`talent:${target}:85`) == 1) {
        // :3488
        await era.printAndWait(''); // :3489
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :3491
        await era.printAndWait(''); // :3492
      } else {
        // :3491-3497
        await era.printAndWait(''); // :3495
      } // :3495-3497
      kojo.乳夹口交 = 1; // :3497
      return 0; // :3497-3499
    } else {
      // :3498-3502

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.乳夹口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3502
        await era.printAndWait(''); // :3503
        kojo.乳夹口交 = 5; // :3504
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.乳夹口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3506
        await era.printAndWait(''); // :3507
        kojo.乳夹口交 = 4; // :3508
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.乳夹口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3510
        await era.printAndWait(''); // :3511
        kojo.乳夹口交 = 3; // :3512
      } else if (kojo.乳夹口交 <= 1 || game.kojo.口上开关 == 2) {
        // :3514
        await era.printAndWait(''); // :3515
        kojo.乳夹口交 = 2; // :3516
      } // :3516-3518
      return 0; // :3516-3520
    } // :3516-3522
  } // :3518-3522

  if (era_flag.selectcom == 125) {
    // :3524

    if (kojo.口交时自慰 == 0) {
      // :3526

      if (era0(`talent:${target}:76`) == 1) {
        // :3528
        await era.printAndWait(''); // :3529
      } else if (era0(`talent:${target}:85`) == 1) {
        // :3531
        await era.printAndWait(''); // :3532
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :3534
        await era.printAndWait(''); // :3535
      } else {
        // :3534-3540
        await era.printAndWait(''); // :3538
      } // :3538-3540
      kojo.口交时自慰 = 1; // :3540
      return 0; // :3540-3542
    } else {
      // :3541-3545

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.口交时自慰 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3545
        await era.printAndWait(''); // :3546
        kojo.口交时自慰 = 5; // :3547
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.口交时自慰 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3549
        await era.printAndWait(''); // :3550
        kojo.口交时自慰 = 4; // :3551
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.口交时自慰 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3553
        await era.printAndWait(''); // :3554
        kojo.口交时自慰 = 3; // :3555
      } else if (kojo.口交时自慰 <= 1 || game.kojo.口上开关 == 2) {
        // :3557
        await era.printAndWait(''); // :3558
        kojo.口交时自慰 = 2; // :3559
      } // :3559-3561
      return 0; // :3559-3563
    } // :3559-3565
  } // :3560-3566

  if (era_flag.selectcom == 126) {
    // :3568

    if (kojo.手搓口交 == 0) {
      // :3570

      if (era0(`talent:${target}:76`) == 1) {
        // :3572
        await era.printAndWait(''); // :3573
      } else if (era0(`talent:${target}:85`) == 1) {
        // :3575
        await era.printAndWait(''); // :3576
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :3578
        await era.printAndWait(''); // :3579
      } else {
        // :3578-3584
        await era.printAndWait(''); // :3582
      } // :3582-3584
      kojo.手搓口交 = 1; // :3584
      return 0; // :3584-3586
    } else {
      // :3585-3589

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.手搓口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3589
        await era.printAndWait(''); // :3590
        kojo.手搓口交 = 5; // :3591
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.手搓口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3593
        await era.printAndWait(''); // :3594
        kojo.手搓口交 = 4; // :3595
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.手搓口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3597
        await era.printAndWait(''); // :3598
        kojo.手搓口交 = 3; // :3599
      } else if (kojo.手搓口交 <= 1 || game.kojo.口上开关 == 2) {
        // :3601
        await era.printAndWait(''); // :3602
        kojo.手搓口交 = 2; // :3603
      } // :3603-3605
      return 0; // :3603-3607
    } // :3603-3609
  } // :3604-3610

  if (era_flag.selectcom == 127) {
    // :3612

    if (kojo.真空口交 == 0) {
      // :3614

      if (era0(`talent:${target}:76`) == 1) {
        // :3616
        await era.printAndWait(''); // :3617
      } else if (era0(`talent:${target}:85`) == 1) {
        // :3619
        await era.printAndWait(''); // :3620
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :3622
        await era.printAndWait(''); // :3623
      } else {
        // :3622-3628
        await era.printAndWait(''); // :3626
      } // :3626-3628
      kojo.真空口交 = 1; // :3628
      return 0; // :3628-3630
    } else {
      // :3628-3634

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.真空口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3633
        await era.printAndWait(''); // :3634
        kojo.真空口交 = 5; // :3635
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.真空口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3637
        await era.printAndWait(''); // :3638
        kojo.真空口交 = 4; // :3639
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.真空口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3641
        kojo.真空口交 = 3; // :3642
      } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 == 2) {
        // :3644
        await era.printAndWait(''); // :3645
        kojo.真空口交 = 2; // :3646
      } // :3646-3648
      return 0; // :3646-3650
    } // :3646-3652
  } // :3647-3653

  if (era_flag.selectcom == 69) {
    // :3655

    if (kojo.六九式 == 0) {
      // :3657

      if (era0(`talent:${target}:76`) == 1) {
        // :3659
        await era.printAndWait(''); // :3660
      } else if (era0(`talent:${target}:85`) == 1) {
        // :3662
        await era.printAndWait(''); // :3663
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :3665
        await era.printAndWait(''); // :3666
      } else {
        // :3665-3671
        await era.printAndWait(''); // :3669
      } // :3669-3671
      kojo.六九式 = 1; // :3671
      return 0; // :3671-3673
    } else {
      // :3672-3676

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.六九式 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3676
        await era.printAndWait(''); // :3677
        kojo.六九式 = 5; // :3678
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.六九式 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3680
        await era.printAndWait(''); // :3681
        kojo.六九式 = 4; // :3682
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.六九式 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3684
        await era.printAndWait(''); // :3685
        kojo.六九式 = 3; // :3686
      } else if (kojo.六九式 <= 1 || game.kojo.口上开关 == 2) {
        // :3688
        await era.printAndWait(''); // :3689
        kojo.六九式 = 2; // :3690
      } // :3690-3692
      return 0; // :3690-3694
    } // :3690-3696
  } // :3691-3697

  if (era_flag.selectcom == 124) {
    // :3699

    if (kojo.深喉 == 0) {
      // :3701

      if (era0(`talent:${target}:76`) == 1) {
        // :3703
        await era.printAndWait(''); // :3704
      } else if (era0(`talent:${target}:85`) == 1) {
        // :3706
        await era.printAndWait(''); // :3707
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :3709
        await era.printAndWait(''); // :3710
      } else {
        // :3709-3715
        await era.printAndWait(''); // :3713
      } // :3713-3715
      kojo.深喉 = 1; // :3715
      return 0; // :3715-3717
    } else {
      // :3715-3721

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.真空口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3720
        await era.printAndWait(''); // :3721
        kojo.深喉 = 5; // :3722
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.真空口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3724
        await era.printAndWait(''); // :3725
        kojo.深喉 = 4; // :3726
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.真空口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3728
        await era.printAndWait(''); // :3729
        kojo.深喉 = 3; // :3730
      } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 == 2) {
        // :3732
        await era.printAndWait(''); // :3733
        kojo.深喉 = 2; // :3734
      } // :3734-3736
      return 0; // :3734-3738
    } // :3734-3740
  } // :3735-3741

  if (era_flag.selectcom == 80) {
    // :3743

    if (kojo.强制口交 == 0) {
      // :3745

      if (era0(`talent:${target}:76`) == 1) {
        // :3747
        await era.printAndWait(''); // :3748
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :3750
        await era.printAndWait(''); // :3751
      } else {
        // :3750-3756
        await era.printAndWait(''); // :3754
      } // :3754-3756
      kojo.强制口交 = 1; // :3756
      return 0; // :3756-3758
    } else {
      // :3757-3761

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.强制口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3761
        await era.printAndWait(''); // :3762
        kojo.强制口交 = 5; // :3763
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.强制口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3765
        await era.printAndWait(''); // :3766
        kojo.强制口交 = 4; // :3767
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.强制口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3769
        await era.printAndWait(''); // :3770
        kojo.强制口交 = 3; // :3771
      } else if (kojo.强制口交 <= 1 || game.kojo.口上开关 == 2) {
        // :3773
        await era.printAndWait(''); // :3774
        kojo.强制口交 = 2; // :3775
      } // :3775-3777
      return 0; // :3775-3779
    } // :3775-3781
  } // :3777-3781

  if (era_flag.selectcom == 87) {
    // :3786
    const { piercing_state } = require('#/system/train/piercing-state');
    const P = piercing_state.p;

    if (kojo.穿环 == 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :3791
        await era.printAndWait(''); // :3792
      } else if (era0(`talent:${target}:76`) == 1) {
        // :3794

        if (chara(target).train.穿环状态 & P) {
          // :3796
          await era.printAndWait(''); // :3797

          if (P == 1) {
            // :3799
            await era.printAndWait(''); // :3800
          } else if (P == 2) {
            // :3802
            await era.printAndWait(''); // :3803
          } else if (P == 4) {
            // :3805
            await era.printAndWait(''); // :3806
          } else if (P == 8) {
            // :3808

            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              // :3810
              await era.printAndWait(''); // :3811
            } else {
              // :3794-3830
              await era.printAndWait(''); // :3813
            } // :3794-3834
          } else if (P == 16) {
            // :3816
            await era.printAndWait(''); // :3817
          } else if (P == 32) {
            // :3819
            await era.printAndWait(''); // :3820
          } else if (P == 64) {
            // :3822
            await era.printAndWait(''); // :3823
          } // :3824-3829
        } else {
          // :3823-3829
          await era.printAndWait(''); // :3827
        } // :3827-3829
      } else if (era0(`talent:${target}:85`) == 1) {
        // :3830

        if (chara(target).train.穿环状态 & P) {
          // :3832
          await era.printAndWait(''); // :3833

          if (P == 1) {
            // :3835
            await era.printAndWait(''); // :3836
          } else if (P == 2) {
            // :3838
            await era.printAndWait(''); // :3839
          } else if (P == 4) {
            // :3841
            await era.printAndWait(''); // :3842
          } else if (P == 8) {
            // :3844

            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              // :3846
              await era.printAndWait(''); // :3847
            } else {
              // :3830-3866
              await era.printAndWait(''); // :3849
            } // :3830-3870
          } else if (P == 16) {
            // :3852
            await era.printAndWait(''); // :3853
          } else if (P == 32) {
            // :3855
            await era.printAndWait(''); // :3856
          } else if (P == 64) {
            // :3858
            await era.printAndWait(''); // :3859
          } // :3860-3865
        } else {
          // :3859-3865
          await era.printAndWait(''); // :3863
        } // :3861-3867
      } else {
        // :3865-3867

        if (chara(target).train.穿环状态 & P) {
          // :3868
          await era.printAndWait(''); // :3869

          if (P == 1) {
            // :3871
            await era.printAndWait(''); // :3872
          } else if (P == 2) {
            // :3874
            await era.printAndWait(''); // :3875
          } else if (P == 4) {
            // :3877
            await era.printAndWait(''); // :3878
          } else if (P == 8) {
            // :3880

            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              // :3882
              await era.printAndWait(''); // :3883
            } else {
              // :3866-3902
              await era.printAndWait(''); // :3885
            } // :3866-3906
          } else if (P == 16) {
            // :3888
            await era.printAndWait(''); // :3889
          } else if (P == 32) {
            // :3891
            await era.printAndWait(''); // :3892
          } else if (P == 64) {
            // :3894
            await era.printAndWait(''); // :3895
          } // :3896-3901
        } else {
          // :3895-3901
          await era.printAndWait(''); // :3899
        } // :3898-3902
      } // :3900-3902
      kojo.穿环 = 1; // :3902
      return 0; // :3902-3904
    } else {
      // :3904-3906

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :3907
        await era.printAndWait(''); // :3908
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.穿环 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3910

        if (chara(target).train.穿环状态 & P) {
          // :3912

          if (P == 1) {
            // :3914
            await era.printAndWait(''); // :3915
          } else if (P == 2) {
            // :3917
            await era.printAndWait(''); // :3918
          } else if (P == 4) {
            // :3920
            await era.printAndWait(''); // :3921
          } else if (P == 8) {
            // :3923

            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              // :3925
              await era.printAndWait(''); // :3926
            } else {
              // :3910-3944
              await era.printAndWait(''); // :3928
            } // :3910-3948
          } else if (P == 16) {
            // :3931
            await era.printAndWait(''); // :3932
          } else if (P == 32) {
            // :3934
            await era.printAndWait(''); // :3935
          } else if (P == 64) {
            // :3937
            await era.printAndWait(''); // :3938
          } // :3939-3944
        } else {
          // :3938-3944
          await era.printAndWait(''); // :3942
        } // :3942-3944
        kojo.穿环 = 4; // :3944
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.穿环 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3946

        if (chara(target).train.穿环状态 & P) {
          // :3948

          if (P == 1) {
            // :3950
            await era.printAndWait(''); // :3951
          } else if (P == 2) {
            // :3953
            await era.printAndWait(''); // :3954
          } else if (P == 4) {
            // :3956
            await era.printAndWait(''); // :3957
          } else if (P == 8) {
            // :3959
            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              // :3960
              await era.printAndWait(''); // :3961
            } else {
              // :3959-3965
              await era.printAndWait(''); // :3963
            } // :3959-3969
          } else if (P == 16) {
            // :3966
            await era.printAndWait(''); // :3967
          } else if (P == 32) {
            // :3969
            await era.printAndWait(''); // :3970
          } else if (P == 64) {
            // :3972
            await era.printAndWait(''); // :3973
          } // :3959-3989
        } else {
          // :3973-3979
          await era.printAndWait(''); // :3977
        } // :3977-3979
        kojo.穿环 = 3; // :3979
      } else if (kojo.穿环 <= 1 || game.kojo.口上开关 == 2) {
        // :3981

        if (chara(target).train.穿环状态 & P) {
          // :3983

          if (P == 1) {
            // :3985
            await era.printAndWait(''); // :3986
          } else if (P == 2) {
            // :3988
            await era.printAndWait(''); // :3989
          } else if (P == 4) {
            // :3991
            await era.printAndWait(''); // :3992
          } else if (P == 8) {
            // :3994

            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              // :3996
              await era.printAndWait(''); // :3997
            } else {
              // :3981-4015
              await era.printAndWait(''); // :3999
            } // :3981-4019
          } else if (P == 16) {
            // :4002
            await era.printAndWait(''); // :4003
          } else if (P == 32) {
            // :4005
            await era.printAndWait(''); // :4006
          } else if (P == 64) {
            // :4008
            await era.printAndWait(''); // :4009
          } // :4010-4015
        } else {
          // :4009-4015
          await era.printAndWait(''); // :4013
        } // :4013-4015
        kojo.穿环 = 2; // :4015
      } // :4015-4017
    } // :4015-4019
    return 0; // :4015-4019
  } // :4015-4019

  return 0;
}

/**
 * @KOJO_MESSAGE_PALAMCNG_15（:4894 起）：参数变动口上。ASSI/ASSIPLAY
 * 整行注释，仅 TEQUIP:45 口塞守卫。P = PALAM+UP vs PALAMLV[2]。
 *
 * @returns {Promise<number>} 0
 */
async function kojo_message_palamcng_15() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%
  const kojo = chara(target).kojo;

  if (era0(`tequip:${target}:45`)) {
    return 0; // :4898-4902
  } // :4898-4902

  const P_lube =
    (era.get(`palam:${target}:3`) || 0) + (era.get(`delta:${target}:3`) || 0);
  if (P_lube > PALAMLV[2] && kojo.首次润滑Lv2 == 0) {
    // :4909

    if (era0(`talent:${target}:85`) == 1) {
      // :4911

      if (era_flag.selectcom == 50) {
        // :4913
        await era.printAndWait(''); // :4914
      } else {
        // :4913-4919
        await era.printAndWait(''); // :4917
      } // :4915-4921
    } else {
      // :4919-4921

      if (era_flag.selectcom == 50) {
        // :4922
        await era.printAndWait(''); // :4923
      } else {
        // :4922-4928
        await era.printAndWait(''); // :4926
      } // :4925-4929
    } // :4927-4929
    kojo.首次润滑Lv2 = 1; // :4929
  } // :4929-4931

  const P_lust =
    (era.get(`palam:${target}:5`) || 0) + (era.get(`delta:${target}:5`) || 0);
  if (P_lust > PALAMLV[2] && kojo.首次欲情Lv2 == 0) {
    // :4936

    if (era0(`talent:${target}:85`) == 1) {
      // :4938

      if (era_flag.selectcom == 51) {
        // :4940
        await era.printAndWait(''); // :4941
      } else {
        // :4940-4946
        await era.printAndWait(''); // :4944
      } // :4942-4948
    } else {
      // :4946-4948

      if (era_flag.selectcom == 51) {
        // :4949
        await era.printAndWait(''); // :4950
      } else {
        // :4949-4955
        await era.printAndWait(''); // :4953
      } // :4952-4956
    } // :4954-4956
    kojo.首次欲情Lv2 = 1; // :4956
  } // :4956-4958

  const P_shame =
    (era.get(`palam:${target}:8`) || 0) + (era.get(`delta:${target}:8`) || 0);
  if (P_shame > PALAMLV[2] && kojo.首次耻情Lv2 == 0) {
    // :4963

    if (era0(`talent:${target}:85`) == 1) {
      // :4965
      await era.printAndWait(''); // :4966
    } else {
      // :4965-4971
      await era.printAndWait(''); // :4969
    } // :4969-4971
    kojo.首次耻情Lv2 = 1; // :4971
  } // :4971-4973

  const P_fear =
    (era.get(`palam:${target}:10`) || 0) + (era.get(`delta:${target}:10`) || 0);
  if (P_fear > PALAMLV[2] && kojo.首次恐怖Lv2 == 0) {
    // :4978

    if (era0(`talent:${target}:85`) == 1) {
      // :4980
      await era.printAndWait(''); // :4981
    } else {
      // :4980-4986
      await era.printAndWait(''); // :4984
    } // :4984-4986
    kojo.首次恐怖Lv2 = 1; // :4986
  } // :4986-4988

  if (era0(`nowex:${target}:0`) > 0 && kojo.首次C绝顶 == 0) {
    // :4992

    if (era0(`talent:${target}:85`) == 1) {
      // :4994
      await era.printAndWait(''); // :4995
    } else {
      // :4996-4998
      if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
        // :4998
        await era.printAndWait(`「不！不要！呜！要……要射了……唔!……啊…啊～♡」`); // :4999
        await era.printAndWait(
          `${target_name}第一次在调教中，因为阴茎的快感太过强烈而射精了！！`,
        ); // :5000
      } else {
        // :5000-5002
        await era.printAndWait(`「不！不要！呜！要……要去了呀……唔!……啊…啊～♡」`); // :5002
        await era.printAndWait(
          `${target_name}第一次在调教中，因为阴蒂的快感太过强烈而高潮了！！`,
        ); // :5003
      } // :5003-5005
      await era.printAndWait(
        `${target_name}睁大着眼睛满面红霞，不知道是因为羞愤？还是太有感觉造成的呢？`,
      ); // :5005
    } // :5005-5007
    kojo.首次C绝顶 = 1; // :5007
  } // :5007-5009

  if (era0(`nowex:${target}:1`) > 0 && kojo.首次V绝顶 == 0) {
    // :5013

    if (era0(`talent:${target}:76`) == 1) {
      // :5015
      await era.printAndWait(''); // :5016
    } else if (era0(`talent:${target}:85`) == 1) {
      // :5018
      await era.printAndWait(''); // :5019
    } else {
      // :5020-5022
      await era.printAndWait(`「不！不要！呜！要……要去了呀……唔!……啊…啊～♡」`); // :5022
      await era.printAndWait(
        `${target_name}第一次在调教中，因为蜜穴的快感太过强烈而高潮了！！`,
      ); // :5023
      await era.printAndWait(
        `${target_name}睁大着眼睛满面红霞，不知道是因为羞愤？还是太有感觉造成的呢？`,
      ); // :5024
    } // :5024-5026
    kojo.首次V绝顶 = 1; // :5026
  } // :5026-5028

  if (era0(`nowex:${target}:2`) > 0 && kojo.首次A绝顶 == 0) {
    // :5032

    if (era0(`talent:${target}:76`) == 1) {
      // :5034
      await era.printAndWait(''); // :5035
    } else if (era0(`talent:${target}:85`) == 1) {
      // :5037
      await era.printAndWait(''); // :5038
    } else {
      // :5039-5041
      await era.printAndWait(
        `「不！不要！呜！怎……怎么会用这种地方……唔!……啊…啊～♡」`,
      ); // :5041
      await era.printAndWait(
        `${target_name}第一次在调教中，因为肛门的快感太过强烈而高潮了！！`,
      ); // :5042
      await era.printAndWait(
        `${target_name}睁大着眼睛满面红霞，不知道是因为羞愤？还是太有感觉造成的呢？`,
      ); // :5043
    } // :5043-5045
    kojo.首次A绝顶 = 1; // :5045
  } // :5045-5047

  if (era0(`nowex:${target}:3`) > 0 && kojo.首次B绝顶 == 0) {
    // :5051

    if (era0(`talent:${target}:85`) == 1) {
      // :5053
      await era.printAndWait(''); // :5054
    } else {
      // :5055-5057
      await era.printAndWait(
        `「不！不要！呜！胸部…胸部要……啊！嗯啊……啊啊啊～♡」`,
      ); // :5057
      await era.printAndWait(
        `${target_name}第一次在调教中，因为胸部的快感太过强烈而高潮了！！`,
      ); // :5058
      await era.printAndWait(
        `${target_name}睁大着眼睛满面红霞，不知道是因为羞愤？还是太有感觉造成的呢？`,
      ); // :5059
    } // :5059-5061
    kojo.首次B绝顶 = 1; // :5061
  } // :5061-5063

  const A =
    (era.get(`delta:${target}:11`) || 0) + (era.get(`delta:${target}:12`) || 0);
  if (game.train.处女丧失 == 1 && kojo.处女丧失 == 0) {
    // :5068

    if (game.train.主人导致处女丧失 == 1) {
      // :5070

      if (
        era0(`talent:${target}:76`) == 1 &&
        (A < 500 || game.system.反抗刻印回避 == 1)
      ) {
        // :5072
        await era.printAndWait(
          `「啊～终于能摆脱处女了……嘿嘿♡……再多做一点开心的事情吧？」`,
        ); // :5073
        await era.printAndWait(
          `听那期待的语气，看来破处的些许的疼痛早被${target_name}置之脑后了……`,
        ); // :5074
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (A < 500 || game.system.反抗刻印回避 == 1)
      ) {
        // :5076
        await era.printAndWait(
          `「本来就是留给魔王大人的东西，所以…尽管有一点痛，但是很幸福♡」`,
        ); // :5077
        await era.printAndWait(
          `${target_name}眯起了眼睛，露出了满足而幸福的微笑。`,
        ); // :5078
      } else {
        // :5079-5081
        await era.printAndWait(`「尽管${sc()}也没天真到以为能保住……但是……」`); // :5081
        await era.printAndWait(
          `${target_name}的语调虽然冰冷平淡…但是眼神当中却满溢着汹涌的杀意……`,
        ); // :5082
      } // :5082-5084
    } else {
      // :5084-5086

      if (era0(`talent:${target}:76`) == 1) {
        // :5087
        await era.printAndWait(
          `「唔…能摆脱处女就好…这样～可以玩的花样更多了呢♡♡」`,
        ); // :5088
      } else if (era0(`talent:${target}:85`) == 1) {
        // :5090
        await era.printAndWait(`「明明希望第一次是给魔王大人的……」`); // :5091
      } else {
        // :5092-5094
        await era.printAndWait(`「果然还是……呜……」`); // :5094
      } // :5094-5096
    } // :5095-5097
    kojo.处女丧失 = 1; // :5097
  } // :5097-5099
}

/**
 * @KOJO_MESSAGE_MARKCNG_15（:5105 起）：刻印变动口上。ASSI/ASSIPLAY
 * 整行注释，仅 TEQUIP:45 口塞守卫。
 *
 * @returns {Promise<number>} 0
 */
async function kojo_message_markcng_15() {
  const target = era_flag.target;
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%
  const kojo = chara(target).kojo;

  if (era0(`tequip:${target}:45`)) {
    return 0; // :5109-5113
  } // :5109-5113

  if (game.system.苦痛刻印变动 == 3 && kojo.苦痛刻印Lv3 == 0) {
    // :5115

    if (era0(`talent:${target}:85`) == 1) {
      // :5117
      await era.printAndWait(`「痛……但…但是……如果是您的话……没有关系……」`); // :5118
    } else {
      // :5118-5120
      await era.printAndWait(`「啊！不！不要了……好痛！饶了${sc()}吧……」`); // :5120
    } // :5120-5122
    kojo.苦痛刻印Lv3 = 1; // :5122
  } // :5122-5124

  if (game.system.快乐刻印变动 == 3 && kojo.快乐刻印Lv3 == 0) {
    // :5128

    if (era0(`talent:${target}:85`) == 1) {
      // :5130
      await era.printAndWait(`「这…这是……好……好棒……太……太舒服了……啊啊～♡」`); // :5131
    } else {
      // :5131-5133
      await era.printAndWait(`「这…这是………不……不……这样……不行……啊啊～♡」`); // :5133
    } // :5133-5135
    kojo.快乐刻印Lv3 = 1; // :5135
  } // :5135-5137

  if (game.system.屈服刻印变动 == 3 && kojo.屈服刻印Lv3 == 0) {
    // :5141

    if (era0(`talent:${target}:85`) == 1) {
      // :5143
      await era.printAndWait(''); // :5144
    } else {
      // :5144-5146
      await era.printAndWait(`「再…怎么抵抗……也是……没用的吧……」`); // :5146
    } // :5146-5148
    kojo.屈服刻印Lv3 = 1; // :5148
  } // :5148-5150

  if (game.system.反抗刻印变动 == 3 && kojo.反抗刻印Lv3 == 0) {
    // :5154

    if (era0(`talent:${target}:85`) == 1) {
      // :5156
      await era.printAndWait(''); // :5157
    } else {
      // :5157-5159
      await era.printAndWait(
        `「可恶！真是……不敢相信！这个世上怎么会有像你这样的垃圾呢！？」`,
      ); // :5159
    } // :5159-5161
    kojo.反抗刻印Lv3 = 1; // :5161
  } // :5161-5162
}

/**
 * @SELF_KOJO_K15（:5168 起）：事件口上。TFLAG:13 分派调教后自慰 /
 * 百合 PLAY / 朝口交 / 调教后性交 / 夜袭 / 出售 / 妊娠发觉 / 生产 /
 * 育儿室 / 亲离 / 死亡 / 寿命。Q 走 peek_aftertrain_q()。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0
 */
async function self_kojo_k15(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const assi_name = chara_callname(era_flag.assi); // %SAVESTR:ASSI%
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%
  const kojo = chara(target).kojo;
  const Q = peek_aftertrain_q();

  if (game.train.初吻与自我口上 == 1) {
    // :5172

    if (era0(`talent:${target}:9`) == 1) {
      // :5174
      await era.printAndWait(
        `${target_name}神情恍惚，一边喘息着流出了口水，一边不停地用手摩擦自己的下身……`,
      ); // :5175
    } else if (Q == 1) {
      // :5177
      await era.printAndWait(
        `「啊！${assi_name}……${assi_name}……好想要……嗯啊！啊啊～♡」`,
      ); // :5178
      await era.printAndWait(
        `${target_name}呢喃着叫唤${assi_name}的名字，一边忘情地进行自慰……`,
      ); // :5179
    } else if (Q == 2) {
      // :5181
      await era.printAndWait(
        `「一想到狗狗的肉棒……啊啊！怎么办？手停不下来了啊！嗯啊啊～♡」`,
      ); // :5182
      await era.printAndWait(
        `${target_name}饥渴地摇晃起屁股，一边自慰着一边做着宛如母狗求欢的姿势……`,
      ); // :5183
    } else {
      // :5184-5186

      if (
        era0(`talent:${target}:76`) &&
        (kojo.调教后自慰 < 4 || game.kojo.口上开关 == 2)
      ) {
        // :5187
        await era.printAndWait(`「这里…好想要啊♡……想要……更粗的…东西♡♡…」`); // :5188
        await era.printAndWait(
          `${target_name}的双眼因为情欲而通红，像是欲求不满似地不停自慰着……`,
        ); // :5189
        kojo.调教后自慰 = 4; // :5190
      } else if (
        era0(`talent:${target}:85`) &&
        (kojo.调教后自慰 < 3 || game.kojo.口上开关 == 2)
      ) {
        // :5192
        await era.print(`「下身……已经湿的不像样了……但…但是……还是好想要啊～♡」`); // :5193
        await era.printAndWait(
          `${target_name}一边喘息着自慰，一边用甜腻的声音呻吟着……`,
        ); // :5194
        kojo.调教后自慰 = 3; // :5195
      } else if (
        era0(`abl:${target}:31`) >= 3 &&
        (kojo.调教后自慰 < 2 || game.kojo.口上开关 == 2)
      ) {
        // :5197
        await era.printAndWait(
          `「明明……已经……呜！不……不行……停不下来了！嗯啊啊～♡」`,
        ); // :5198
        kojo.调教后自慰 = 2; // :5199
      } else if (kojo.调教后自慰 < 1 || game.kojo.口上开关 == 2) {
        // :5201
        await era.printAndWait(`「不……不行……呜啊……好…好热……啊啊……」`); // :5202
        kojo.调教后自慰 = 1; // :5203
      } // :5203-5205
    } // :5203-5207
  } // :5204-5208

  if (game.train.初吻与自我口上 == 2) {
    // :5211

    if (
      era0(`talent:${target}:76`) &&
      (kojo.百合PLAY < 5 || game.kojo.口上开关 == 2)
    ) {
      // :5213
      await era.printAndWait(''); // :5214
      kojo.百合PLAY = 5; // :5215
    } else if (
      era0(`talent:${target}:85`) &&
      (kojo.百合PLAY < 4 || game.kojo.口上开关 == 2)
    ) {
      // :5217
      await era.printAndWait(''); // :5218
      kojo.百合PLAY = 4; // :5219
    } else if (
      era0(`abl:${target}:33`) >= 3 &&
      (kojo.百合PLAY < 3 || game.kojo.口上开关 == 2)
    ) {
      // :5221
      await era.printAndWait(''); // :5222
      kojo.百合PLAY = 3; // :5223
    } else if (
      era0(`abl:${target}:22`) >= 3 &&
      (kojo.百合PLAY < 2 || game.kojo.口上开关 == 2)
    ) {
      // :5225
      await era.printAndWait(''); // :5226
      kojo.百合PLAY = 2; // :5227
    } else if (kojo.百合PLAY < 1 || game.kojo.口上开关 == 2) {
      // :5229
      await era.printAndWait(''); // :5230
      kojo.百合PLAY = 1; // :5231
    } // :5231-5233
  } // :5231-5235

  if (game.train.初吻与自我口上 == 3) {
    // :5238

    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.朝口交 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :5240
      await era.printAndWait(''); // :5241
      kojo.朝口交 = 3; // :5242
    } else if (
      era0(`talent:${target}:85`) &&
      (kojo.朝口交 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :5244
      await era.printAndWait(''); // :5245
      kojo.朝口交 = 3; // :5246
    } else if (
      era0(`abl:${target}:16`) >= 5 &&
      (kojo.朝口交 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :5248
      await era.printAndWait(''); // :5249
      kojo.朝口交 = 2; // :5250
    } else if (kojo.朝口交 < 1 || game.kojo.口上开关 == 2) {
      // :5252
      await era.printAndWait(''); // :5253
      kojo.朝口交 = 1; // :5254
    } // :5254-5256
  } // :5254-5258

  if (game.train.初吻与自我口上 == 4) {
    // :5261

    if (
      era0(`abl:${target}:2`) >= 4 &&
      (kojo.调教后性交 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :5263
      await era.printAndWait(
        `「这里还是好空虚，还想要更多更大的东西来填满！」`,
      ); // :5264
      kojo.调教后性交 = 2; // :5265
    } else if (kojo.调教后性交 < 1 || game.kojo.口上开关 == 2) {
      // :5267
      await era.printAndWait(`「身体还是好热，可以……再继续吗？」`); // :5268
      kojo.调教后性交 = 1; // :5269
    } // :5269-5271
  } // :5269-5273

  if (game.train.初吻与自我口上 == 5) {
    // :5276
    if (kojo.夜袭 < 1 || game.kojo.口上开关 == 2) {
      // :5277
      await era.print(
        [
          `「夜晚好冷，想跟魔王大人一起睡呢……」`,
          `「一起睡的话，可以做做『运动』也可以相拥取暖，不觉得是个好主意吗？」`,
        ][rand_n(2)],
      ); // :5278-5281 PRINTDATAL
      await era.printAndWait(''); // :5282
      kojo.夜袭 = 1; // :5283
    } // :5283-5285
  } // :5283-5287

  if (game.train.初吻与自我口上 == 6) {
    // :5290

    if (era0(`talent:${target}:85`) && era0(`mark:${target}:3`) < 3) {
      // :5292
      await era.printAndWait(
        `在你打算卖掉${target_name}之前，${target_name}慌慌张张地来到了你的面前……`,
      ); // :5293
      await era.printAndWait(
        `一向注重仪表的${target_name}，发丝凌乱双颊通红并带着急促的喘息。`,
      ); // :5294
      await era.printAndWait(`「魔…魔王大人……您……您……」`); // :5295
      await era.printAndWait(
        `${target_name}的情绪起伏过大，平时灵活的口才现在却哽咽地连话也说不完整……`,
      ); // :5296
      await era.printAndWait(
        `似乎想对你露出笑容，无奈嘴角只能勾出扭曲的形状，眼泪不停地沿着脸颊垂落而下……`,
      ); // :5297
      await era.printAndWait(`「以后…请您……多多保重……」`); // :5298
      await era.printAndWait(
        `${target_name}深深地鞠躬，转身踉踉跄跄地随着商人离去了……`,
      ); // :5299
    } else if (era0(`mark:${target}:3`) == 3) {
      // :5301
      await era.printAndWait(`「居然……敢把${sc()}当成商品一样地贩卖……」`); // :5302
      await era.printAndWait(
        `${target_name}瞪视过来的眼神带着愤怒与杀意，但是无论他再怎么地反抗，最后还是被商人捆绑带走了……`,
      ); // :5303
    } else if (era0(`talent:${target}:76`)) {
      // :5305
      await era.printAndWait(
        `「虽然有点不舍，但是，这个淫荡的身体如果能对魔王大人有所贡献的话……」`,
      ); // :5306
      await era.printAndWait(`${target_name}眯起了眼睛露出了魅惑的笑容。`); // :5307
      await era.printAndWait(
        `「因为您，${sc()}才能真正体验到所谓无上的『欢愉』，所以………」`,
      ); // :5308
      await era.printAndWait(
        `「以后就算在新的地方，${sc()}也会好好地发挥所学的本领……」`,
      ); // :5309
      await era.printAndWait(
        `${target_name}潇洒地挥挥手与你告别，挽着商人的手随之离去了……`,
      ); // :5310
    } else {
      // :5311-5313
      await era.printAndWait(
        `「从一个垃圾堆换到另一个垃圾堆？反正都是一样……」`,
      ); // :5313
      await era.printAndWait(
        `${target_name}似乎毫不在乎，平淡地随着商人离去了……`,
      ); // :5314
    } // :5314-5316
    if (!era0(`talent:${target}:122`)) {
      stub_line('SELL_MATURO_K0', '成熟出售口上', '随售却票'); // :5317
    } // :5317
  } // :5317-5319

  if (game.train.初吻与自我口上 == 11) {
    // :5325
    if (kojo.妊娠发觉 >= 1) {
      return 0; // :5326-5328
    } // :5326-5328

    if (era0(`talent:${target}:9`) == 1) {
      // :5329
      await era.printAndWait(
        `「好像有奇怪的东西在肚子里面……一定是生病了吧？」`,
      ); // :5330
    } else if (
      era0(`talent:${target}:85`) &&
      chara(target).event.妊娠相手 == 1
    ) {
      // :5332
      await era.printAndWait(`「会长的像谁呢？呵呵，好期待啊～」`); // :5333
    } else {
      // :5334-5336
      await era.printAndWait(`「不……这…这不是真的！」`); // :5336
    } // :5336-5338
    kojo.妊娠发觉 = 1; // :5338
  } // :5338-5340

  if (game.train.初吻与自我口上 == 12) {
    // :5345
    if (kojo.生产 >= 1) {
      return 0; // :5346-5348
    } // :5346-5348

    if (era0(`talent:${target}:9`) == 1) {
      // :5349
      await era.printAndWait(
        `「有什么东西要从肚子出来了……不……怪物……是怪物啊！」`,
      ); // :5350
    } else if (
      era0(`talent:${target}:85`) &&
      chara(target).event.妊娠相手 == 1
    ) {
      // :5352
      await era.printAndWait(`「真是个健康可爱的宝宝呢，对吧？」`); // :5353
      await era.printAndWait(
        `${target_name}亲昵地亲吻着孩子的脸颊，露出了幸福的笑容。`,
      ); // :5354
    } else {
      // :5355-5357
      await era.printAndWait(`「这样的孩子……」`); // :5357
      await era.printAndWait(
        `${target_name}用双手捂住了自己的脸庞，试着掩饰心中复杂的情绪……`,
      ); // :5358
    } // :5358-5360
    kojo.生产 = 1; // :5360
  } // :5360-5362

  if (game.train.初吻与自我口上 == 13) {
    // :5366

    if (era0(`talent:${target}:153`)) {
      // :5368
      await era.printAndWait(''); // :5369
    } else if (era0(`talent:${target}:154`)) {
      // :5371
      await era.printAndWait(''); // :5372
    } // :5372-5374
    kojo.育儿室 = 1; // :5374
  } // :5374-5376

  if (game.train.初吻与自我口上 == 14) {
    // :5380
    await era.printAndWait(''); // :5381
    kojo.亲离 = 1; // :5382
  } // :5382-5384

  if (game.train.初吻与自我口上 == 999) {
    // :5388

    if (era0(`talent:${target}:85`)) {
      // :5390
      await era.printAndWait(''); // :5391
    } else {
      // :5388-5398
      await era.printAndWait(''); // :5394
    } // :5392-5398
  } // :5394-5398

  if (game.train.初吻与自我口上 == 998) {
    // :5401

    if (era0(`talent:${target}:85`)) {
      // :5403
      await era.printAndWait(''); // :5404
    } else {
      // :5401-5411
      await era.printAndWait(''); // :5407
    } // :5405-5411
  } // :5407-5411

  game.train.初吻与自我口上 = 0; // :5414

  return 0; // :5414-5416
}

// @dungeon_ryouzyoku_k15 // :5442
async function dungeon_ryouzyoku_k15() {
  const target = era_flag.target;
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%

  if (era0(`talent:${target}:0`) == 1) {
    // :5447

    await era.printAndWait(
      `「可恶！走…走开！为什么${sc()}的第一次要被你们这些残渣……呜！」`,
    ); // :5449
    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      // :5450

      await era.printAndWait(`「…………可恶!」`); // :5452
      return 0; // :5449-5457
    } else if (
      era0(`talent:${target}:17`) == 1 ||
      era0(`talent:${target}:31`) == 1 ||
      era0(`talent:${target}:36`) == 1
    ) {
      // :5454

      await era.printAndWait(
        `「反正你们只是要泄欲吧……只要不伤性命的话，这个身体…就随便用好了……」`,
      ); // :5456

      if (era0(`talent:${target}:106`) == 1 || era0(`exp:${target}:1`) > 0) {
        // :5459
        await era.printAndWait(
          `「如果可以放过${sc()}的前面，用后面这里也很紧，不想试试吗？」`,
        ); // :5459
      } // :5459

      if (era0(`exp:${target}:22`) > 0) {
        // :5462
        await era.printAndWait(`「或者喜欢从嘴巴来的话，也可以帮忙舔的……」`); // :5462
      } // :5462
    } else if (
      era0(`talent:${target}:11`) == 1 ||
      era0(`talent:${target}:12`) == 1 ||
      era0(`talent:${target}:15`) == 1 ||
      era0(`talent:${target}:30`) == 1 ||
      era0(`talent:${target}:34`) == 1
    ) {
      // :5463

      await era.printAndWait(
        `「滚开！……敢动${sc()}的话……一定……一定会杀了你们！！」`,
      ); // :5466
    } else if (
      era0(`talent:${target}:10`) == 1 ||
      era0(`talent:${target}:26`) == 1
    ) {
      // :5467

      await era.printAndWait(`「难道……这次……真的要被…………」`); // :5469
    } else {
      // :5459-5481

      await era.printAndWait(`「这种行为……真不愧是最低级的垃圾！」`); // :5472
    } // :5472-5474
  } else {
    // :5473-5475

    await era.printAndWait(''); // :5476
    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      // :5477

      await era.printAndWait(`「…………可恶!」`); // :5479
      return 0; // :5476-5484
    } else if (
      era0(`talent:${target}:17`) == 1 ||
      era0(`talent:${target}:31`) == 1 ||
      era0(`talent:${target}:36`) == 1
    ) {
      // :5481

      await era.printAndWait(
        `「反正你们只是要泄欲吧……只要不伤性命的话，这个身体…就随便用好了……」`,
      ); // :5483

      if (era0(`talent:${target}:106`) == 1 || era0(`exp:${target}:1`) > 0) {
        // :5486
        await era.printAndWait(
          `「如果可以放过${sc()}的话，后面这里也很紧，不想试试吗？」`,
        ); // :5486
      } // :5486

      if (era0(`exp:${target}:22`) > 0) {
        // :5489
        await era.printAndWait(`「或者喜欢从嘴巴来的话，也可以帮忙舔的……」`); // :5489
      } // :5489
    } else if (
      era0(`talent:${target}:11`) == 1 ||
      era0(`talent:${target}:12`) == 1 ||
      era0(`talent:${target}:15`) == 1 ||
      era0(`talent:${target}:30`) == 1 ||
      era0(`talent:${target}:34`) == 1
    ) {
      // :5490

      await era.printAndWait(
        `「滚开！……敢动${sc()}的话……一定……一定会杀了你们！！」`,
      ); // :5493
    } else if (
      era0(`talent:${target}:10`) == 1 ||
      era0(`talent:${target}:26`) == 1
    ) {
      // :5494

      await era.printAndWait(`「难道……这次……真的要被…………」`); // :5496
    } else {
      // :5486-5508

      await era.printAndWait(`「这种行为……真不愧是最低级的垃圾！」`); // :5499
    } // :5499-5501
  } // :5499-5503

  return 0; // :5501-5505
}

// @dungeon_ryouzyoku_after_k15 // :5506
async function dungeon_ryouzyoku_after_k15() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%

  if (era0(`talent:${target}:0`) == 1) {
    // :5510

    await era.printAndWait(
      `「还好${sc()}的处女还在…不然…一定要杀了你们…！！」`,
    ); // :5512
    await era.printAndWait(`${target_name}`); // :5513
    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      // :5514

      await era.printAndWait(`「不……不………呜！」`); // :5516
      return 0; // :5515-5519
    } // :5517-5519

    if (era0(`exp:${target}:1`) > 20) {
      // :5521
      await era.printAndWait(`「合不起来……可恶！……居然…居然全部都射在里面！」`); // :5521
    } // :5521
    await era.printAndWait(
      `${target_name}那被多次凌辱的肛穴一时无法合拢，白浊腥臭的体液正从其中泊泊地流出……`,
    ); // :5522

    if (era0(`exp:${target}:22`) > 20) {
      // :5525
      await era.printAndWait(`「咳咳…呕…呕……不行……满嘴……都是……」`); // :5525
    } // :5525
    await era.printAndWait(
      `被怪物多次侵犯口腔的${target_name}，带着泪光试着将灌进去的精液催吐出来……`,
    ); // :5526
  } else {
    // :5526-5528

    await era.printAndWait(`「太过分了……到底……要几次……才会停止……」`); // :5529

    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      // :5531

      await era.printAndWait(`「不……不………呜！」`); // :5533
      return 0; // :5532-5536
    } // :5534-5536

    if (era0(`exp:${target}:0`) > 20) {
      // :5537
      await era.printAndWait(
        `「那里……要…要坏掉了……什么东西……呜……要流出来了啊！」`,
      ); // :5538
      await era.printAndWait(
        `${target_name}的蜜穴被多次地奸淫，双腿几乎无法合拢，白浊腥臭的体液正从股间泊泊地流出……`,
      ); // :5539
    } // :5539-5541

    if (era0(`exp:${target}:1`) > 20) {
      // :5543
      await era.printAndWait(`「合不起来……可恶！居…居然全部都射在里面！」`); // :5543
    } // :5543
    await era.printAndWait(
      `${target_name}那被多次凌辱的肛穴一时无法合拢，白浊腥臭的体液正从其中泊泊地流出……`,
    ); // :5544

    if (era0(`exp:${target}:22`) > 20) {
      // :5547
      await era.printAndWait(`「咳咳…呕…呕……不行……满嘴……都是……」`); // :5547
    } // :5547
    await era.printAndWait(
      `被怪物多次侵犯口腔的${target_name}，带着泪光试着将灌进去的精液催吐出来……`,
    ); // :5548
  } // :5548-5550

  return 0; // :5549-5553
}

// @benki_koujo_k15 // :5553
async function benki_koujo_k15(rand) {
  void rand;
  const a = era_flag.target;

  if (game.train.肉便器行动 == 0) {
    // :5558

    if (era0(`talent:${a}:76`) == 1) {
      // :5561
      await era.printAndWait(''); // :5562
    } else if (era0(`talent:${a}:85`)) {
      // :5564
      await era.printAndWait(''); // :5565
    } else if (era0(`abl:${a}:16`) >= 5) {
      // :5567
      await era.printAndWait(''); // :5568
    } else {
      // :5567-5573
      await era.printAndWait(''); // :5571
    } // :5571-5573
  } else if (game.train.肉便器行动 == 1) {
    // :5573

    if (era0(`talent:${a}:76`) == 1) {
      // :5576
      await era.printAndWait(''); // :5577
    } else if (era0(`talent:${a}:85`)) {
      // :5579
      await era.printAndWait(''); // :5580
    } else if (era0(`abl:${a}:16`) >= 5) {
      // :5582
      await era.printAndWait(''); // :5583
    } else {
      // :5582-5588
      await era.printAndWait(''); // :5586
    } // :5586-5588
  } else if (game.train.肉便器行动 == 2) {
    // :5588

    if (era0(`talent:${a}:76`) == 1) {
      // :5591
      await era.printAndWait(''); // :5592
    } else if (era0(`talent:${a}:85`)) {
      // :5594
      await era.printAndWait(''); // :5595
    } else if (era0(`abl:${a}:16`) >= 5) {
      // :5597
      await era.printAndWait(''); // :5598
    } else {
      // :5597-5603
      await era.printAndWait(''); // :5601
    } // :5601-5603
  } else if (game.train.肉便器行动 == 3) {
    // :5603

    if (era0(`talent:${a}:76`) == 1) {
      // :5606
      await era.printAndWait(''); // :5607
    } else if (era0(`talent:${a}:85`)) {
      // :5609
      await era.printAndWait(''); // :5610
    } else if (era0(`abl:${a}:16`) >= 5) {
      // :5612
      await era.printAndWait(''); // :5613
    } else {
      // :5612-5618
      await era.printAndWait(''); // :5616
    } // :5616-5618
  } else if (game.train.肉便器行动 == 4) {
    // :5618

    if (era0(`talent:${a}:76`) == 1) {
      // :5621
      await era.printAndWait(''); // :5622
    } else if (era0(`talent:${a}:85`)) {
      // :5624
      await era.printAndWait(''); // :5625
    } else if (era0(`abl:${a}:16`) >= 5) {
      // :5627
      await era.printAndWait(''); // :5628
    } else {
      // :5627-5633
      await era.printAndWait(''); // :5631
    } // :5631-5633
  } else if (game.train.肉便器行动 == 5) {
    // :5633

    if (era0(`talent:${a}:76`) == 1) {
      // :5636
      await era.printAndWait(''); // :5637
    } else if (era0(`talent:${a}:85`)) {
      // :5639
      await era.printAndWait(''); // :5640
    } else if (era0(`abl:${a}:16`) >= 5) {
      // :5642
      await era.printAndWait(''); // :5643
    } else {
      // :5642-5648
      await era.printAndWait(''); // :5646
    } // :5644-5650
  } // :5644-5652

  return 0; // :5647-5653
}

// @dungeon_victory_k15 // :5653
async function dungeon_victory_k15(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const a = target;

  await era.printAndWait(''); // :5658

  if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
    // :5660

    await era.printAndWait(`「胜利是理所当然。」`); // :5663

    return 0; // :5663-5667
  } else if (
    era0(`talent:${target}:11`) == 1 ||
    era0(`talent:${target}:12`) == 1 ||
    era0(`talent:${target}:15`) == 1 ||
    era0(`talent:${target}:30`) == 1 ||
    era0(`talent:${target}:34`) == 1
  ) {
    // :5666

    if (rand_n(3) == 0) {
      // :5669
      await era.printAndWait(`「去地狱反省吧！」`); // :5670
    } else if (rand_n(2) == 0) {
      // :5671
      await era.printAndWait(`「一群废物！」`); // :5672
    } else {
      // :5672-5674
      await era.printAndWait(`「全部都消失吧！」`); // :5674
    } // :5674-5676
  } else if (
    era0(`talent:${target}:10`) == 1 ||
    era0(`talent:${target}:26`) == 1
  ) {
    // :5677

    await era.printAndWait(`「呼……好歹是赢了。」`); // :5680

    return 0; // :5680-5684
  } else {
    // :5680-5686

    if (rand_n(3) == 0) {
      // :5686
      await era.printAndWait(`「跟这种杂鱼战斗，根本没有悬念。」`); // :5687
    } else if (rand_n(2) == 0) {
      // :5688
      await era.printAndWait(`「不废吹灰之力。」`); // :5689
    } else {
      // :5689-5691
      await era.printAndWait(`「嗯？这就胜利了吗？」`); // :5691
    } // :5691-5693
  } // :5692-5696

  if (
    (era0(`base:${a}:0`) * 100) / era0(`maxbase:${a}:0`) < 50 ||
    (era0(`base:${a}:1`) * 100) / era0(`maxbase:${a}:1`) < 50
  ) {
    // :5696

    await era.printAndWait(`「一点皮肉伤，不算什么。」`); // :5698
  } else {
    // :5698-5700

    await era.printAndWait(`「这么弱的敌人，真像纸糊的一样。」`); // :5701
  } // :5701-5703

  return 0; // :5701-5707
}

// @dungeon_attack_k15 // :5707
async function dungeon_attack_k15(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;

  if (chara(target).invasion.状态 == 2) {
    // :5712

    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      // :5714

      await era.printAndWait(`「…………」`); // :5717

      return 0; // :5717-5721
    } else if (
      era0(`talent:${target}:11`) == 1 ||
      era0(`talent:${target}:12`) == 1 ||
      era0(`talent:${target}:15`) == 1 ||
      era0(`talent:${target}:30`) == 1 ||
      era0(`talent:${target}:34`) == 1
    ) {
      // :5720

      if (rand_n(3) == 0) {
        // :5723
        await era.printAndWait(`「哼！……这是什么玩意？」`); // :5724
      } else if (rand_n(2) == 0) {
        // :5725
        await era.printAndWait(`「白费力气！」`); // :5726
      } else {
        // :5726-5728
        await era.printAndWait(`「真碍眼！」`); // :5728
      } // :5728-5730
    } else if (
      era0(`talent:${target}:10`) == 1 ||
      era0(`talent:${target}:26`) == 1
    ) {
      // :5731

      await era.printAndWait(`「放弃吧……」`); // :5734

      return 0; // :5734-5738
    } else {
      // :5734-5740

      if (rand_n(3) == 0) {
        // :5740
        await era.printAndWait(`「别做无谓的抵抗。」`); // :5741
      } else if (rand_n(2) == 0) {
        // :5742
        await era.printAndWait(`「邪不胜正。」`); // :5743
      } else {
        // :5743-5745
        await era.printAndWait(`「残渣。」`); // :5745
      } // :5745-5747
    } // :5746-5750
  } else {
    // :5748-5750

    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      // :5751

      await era.printAndWait(`「魔王大人的命令是绝对的。」`); // :5754

      return 0; // :5754-5758
    } else if (
      era0(`talent:${target}:11`) == 1 ||
      era0(`talent:${target}:12`) == 1 ||
      era0(`talent:${target}:15`) == 1 ||
      era0(`talent:${target}:30`) == 1 ||
      era0(`talent:${target}:34`) == 1
    ) {
      // :5757

      if (rand_n(3) == 0) {
        // :5760
        await era.printAndWait(`「哼！一群蝼蚁！」`); // :5761
      } else if (rand_n(2) == 0) {
        // :5762
        await era.printAndWait(`「真是螳臂挡车。」`); // :5763
      } else {
        // :5763-5765
        await era.printAndWait(`「不自量力！」`); // :5765
      } // :5765-5767
    } else if (
      era0(`talent:${target}:10`) == 1 ||
      era0(`talent:${target}:26`) == 1
    ) {
      // :5768

      await era.printAndWait(`「为了魔王大人……！」`); // :5771

      return 0; // :5771-5775
    } else {
      // :5771-5777

      if (rand_n(3) == 0) {
        // :5777
        await era.printAndWait(`「就这种程度吗？」`); // :5778
      } else if (rand_n(2) == 0) {
        // :5779
        await era.printAndWait(`「来这种地方还想全身而退吗？」`); // :5780
      } else {
        // :5780-5782
        await era.printAndWait(`「做好觉悟吧！」`); // :5782
      } // :5782-5784
    } // :5782-5788
  } // :5782-5790

  return 0; // :5782-5790
}

// @ntr_koujo_k15 // :5920
async function ntr_koujo_k15(rand, P) {
  void rand;
  const target = era_flag.target;
  P = P ?? 0;

  if (chara(target).kojo.NTR再捕获 == 0) {
    // :5925
    // CFLAG:650  = 1（变量语义：CFLAG 族，650） // :5925
    chara(target).kojo.NTR再捕获 = 1; // :5925
  } // :5925

  if (P == 1) {
    // :5928

    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      // :5930
      await era.printAndWait(''); // :5931
    } else {
      // :5929-5935
      await era.printAndWait(''); // :5933
    } // :5933-5935
    // CFLAG:651  = 1（变量语义：CFLAG 族，651） // :5935
    chara(target).kojo.NTR_651 = 1; // :5935
  } else if (P == 2) {
    // :5937
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      // :5938
      await era.printAndWait(''); // :5939
    } else {
      // :5937-5943
      await era.printAndWait(''); // :5941
    } // :5941-5943
    // CFLAG:652  = 1（变量语义：CFLAG 族，652） // :5943
    chara(target).kojo.NTR_652 = 1; // :5943
  } else if (P == 3) {
    // :5945
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      // :5946
      await era.printAndWait(''); // :5947
    } else {
      // :5945-5951
      await era.printAndWait(''); // :5949
    } // :5949-5951
    // CFLAG:653  = 1（变量语义：CFLAG 族，653） // :5951
    chara(target).kojo.NTR_653 = 1; // :5951
  } else if (P == 4) {
    // :5953
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      // :5954
      await era.printAndWait(''); // :5955
    } else {
      // :5953-5959
      await era.printAndWait(''); // :5957
    } // :5957-5959
    // CFLAG:654  = 1（变量语义：CFLAG 族，654） // :5959
    chara(target).kojo.NTR_654 = 1; // :5959
  } else if (P == 5) {
    // :5961
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      // :5962
      await era.printAndWait(''); // :5963
    } else {
      // :5961-5967
      await era.printAndWait(''); // :5965
    } // :5965-5967
    // CFLAG:655  = 1（变量语义：CFLAG 族，655） // :5967
    chara(target).kojo.NTR_655 = 1; // :5967
  } else if (P == 6) {
    // :5969
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      // :5970
      await era.printAndWait(''); // :5971
    } else {
      // :5969-5975
      await era.printAndWait(''); // :5973
    } // :5973-5975
    // CFLAG:656  = 1（变量语义：CFLAG 族，656） // :5975
    chara(target).kojo.NTR_656 = 1; // :5975
  } else if (P == 7) {
    // :5977
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      // :5978
      await era.printAndWait(''); // :5979
    } else {
      // :5977-5983
      await era.printAndWait(''); // :5981
    } // :5981-5983
    // CFLAG:657  = 1（变量语义：CFLAG 族，657） // :5983
    chara(target).kojo.NTR_657 = 1; // :5983
  } else if (P == 20) {
    // :5985
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      // :5986
      await era.printAndWait(''); // :5987
    } else {
      // :5985-5991
      await era.printAndWait(''); // :5989
    } // :5986-5994
  } // :5987-5997

  return 0; // :5991-5997
}

// @exucution_koujo_k15 // :5997
async function exucution_koujo_k15(rand) {
  void rand;

  if (game.event.犬射精或处刑口上 == 4) {
    // :6001
    await era.printAndWait(''); // :6002
  } else if (game.event.犬射精或处刑口上 == 5) {
    // :6004
    await era.printAndWait(''); // :6005
  } else if (game.event.犬射精或处刑口上 == 6) {
    // :6007
    await era.printAndWait(''); // :6008
  } else if (game.event.犬射精或处刑口上 == 7) {
    // :6010
    await era.printAndWait(''); // :6011
  } // :6010-6014
}

// @museum_koujo_k15 // :6015
async function museum_koujo_k15(rand) {
  void rand;

  if (game.event.博物馆口上 == 0) {
    // :6019
    await era.printAndWait(''); // :6020
  } else if (game.event.博物馆口上 == 1) {
    // :6022
    await era.printAndWait(''); // :6023
  } else if (game.event.博物馆口上 == 2) {
    // :6025
    await era.printAndWait(''); // :6026
  } else if (game.event.博物馆口上 == 3) {
    // :6028
    await era.printAndWait(''); // :6029
  } else if (game.event.博物馆口上 == 4) {
    // :6031
    await era.printAndWait(''); // :6032
  } else if (game.event.博物馆口上 == 5) {
    // :6034
    await era.printAndWait(''); // :6035
  } else if (game.event.博物馆口上 == 6) {
    // :6037
    await era.printAndWait(''); // :6038
  } else if (game.event.博物馆口上 == 7) {
    // :6040
    await era.printAndWait(''); // :6041
  } else if (game.event.博物馆口上 == 8) {
    // :6043
    await era.printAndWait(''); // :6044
  } else if (game.event.博物馆口上 == 9) {
    // :6046
    await era.printAndWait(''); // :6047
  } // :6046-6050
}

// @banishment_koujo_k15 // :6051
async function banishment_koujo_k15(rand) {
  void rand;

  if (game.event.流放口上 == 0) {
    // :6055
    await era.printAndWait(''); // :6056
  } else if (game.event.流放口上 == 1) {
    // :6058
    await era.printAndWait(''); // :6059
  } else if (game.event.流放口上 == 2) {
    // :6061
    await era.printAndWait(''); // :6062
  } else if (game.event.流放口上 == 3) {
    // :6064
    await era.printAndWait(''); // :6065
  } else if (game.event.流放口上 == 4) {
    // :6067
    await era.printAndWait(''); // :6068
  } // :6067-6071
}

// @public_exucution_koujo_k15 // :6072
async function public_exucution_koujo_k15(rand) {
  void rand;

  if (game.event.公开处刑口上 == 0) {
    // :6076
    await era.printAndWait(''); // :6077
  } else if (game.event.公开处刑口上 == 1) {
    // :6079
    await era.printAndWait(''); // :6080
  } else if (game.event.公开处刑口上 == 2) {
    // :6082
    await era.printAndWait(''); // :6083
  } // :6082-6086
}

// @grotesque_koujo_k15 // :6087
async function grotesque_koujo_k15(rand) {
  void rand;

  if (game.event.猎奇处刑口上 == 0) {
    // :6091
    await era.printAndWait(''); // :6092
  } else if (game.event.猎奇处刑口上 == 1) {
    // :6094
    await era.printAndWait(''); // :6095
  } else if (game.event.猎奇处刑口上 == 2) {
    // :6097
    await era.printAndWait(''); // :6098
  } else if (game.event.猎奇处刑口上 == 3) {
    // :6100
    await era.printAndWait(''); // :6101
  } else if (game.event.猎奇处刑口上 == 4) {
    // :6103
    await era.printAndWait(''); // :6104
  } else if (game.event.猎奇处刑口上 == 5) {
    // :6106
    await era.printAndWait(''); // :6107
  } else if (game.event.猎奇处刑口上 == 6) {
    // :6109
    await era.printAndWait(''); // :6110
  } // :6109-6113
}

// @enterenemy_koujo_k15 // :6114
async function enterenemy_koujo_k15(rand) {
  void rand;
  const a = era_flag.target;
  const sc = () => self_call(a); // %SELF_CALL(A)%：EVENT_K 分发前 TARGET=A（#233）

  if (era0(`talent:${a}:21`) == 1 || era0(`talent:${a}:22`) == 1) {
    // :6117

    await era.printAndWait(`「魔王…吗………」`); // :6119
  } else if (
    era0(`talent:${a}:11`) == 1 ||
    era0(`talent:${a}:12`) == 1 ||
    era0(`talent:${a}:15`) == 1 ||
    era0(`talent:${a}:30`) == 1 ||
    era0(`talent:${a}:34`) == 1
  ) {
    // :6120

    await era.printAndWait(`「就让${sc()}来看看魔王有什么本事吧！」`); // :6122
  } else if (era0(`talent:${a}:10`) == 1 || era0(`talent:${a}:26`) == 1) {
    // :6123

    await era.printAndWait(`「魔王…是不应该现世的………」`); // :6125
  } else {
    // :6125-6127

    await era.printAndWait(`「就算是魔王……也一定有击倒的办法……」`); // :6128
  } // :6128-6130
}

// @gohoubi_request_koujo_k15 // :6132
async function gohoubi_request_koujo_k15(rand) {
  void rand;
  const a = era_flag.target;
  const a_name = chara_callname(a); // %SAVESTR:A%
  const sc = () => self_call(a); // %SELF_CALL(TARGET)%：EVENT_K 分发前 TARGET=A（#233）

  if (chara(a).stronghold.要求奖赏 == 0) {
    // :6135

    await era.printAndWait(`「迎击成功的话，${sc()}想要一笔赏金！」`); // :6137
  } else if (
    chara(a).stronghold.要求奖赏 == 1 ||
    chara(a).stronghold.要求奖赏 == 2 ||
    chara(a).stronghold.要求奖赏 == 3
  ) {
    // :6138

    await era.print(`「迎击成功的话，请让${sc()}跟`); // :6140
    if (chara(a).stronghold.要求奖赏 == 1) {
      // :6141
      await era.print(`狗`); // :6142
    } else if (chara(a).stronghold.要求奖赏 == 2) {
      // :6143
      await era.print(`猪`); // :6144
    } else if (chara(a).stronghold.要求奖赏 == 3) {
      // :6145
      await era.print(`马`); // :6146
    } // :6146-6148
    await era.printAndWait(`进行交配好吗？」`); // :6148
  } else if (chara(a).stronghold.要求奖赏 == 4) {
    // :6149

    await era.printAndWait(
      `「迎击成功的话，能否请魔王大人给${sc()}一个吻呢？」`,
    ); // :6151
  } else if (chara(a).stronghold.要求奖赏 == 5) {
    // :6152

    await era.printAndWait(
      `「迎击成功的话，想要让魔王大人射在${sc()}身体里面！」`,
    ); // :6154
  } else if (chara(a).stronghold.要求奖赏 == 6) {
    // :6155

    await era.printAndWait(
      `「迎击成功的话，魔王大人能否将精液赏赐给${sc()}呢？」`,
    ); // :6157
  } else if (chara(a).stronghold.要求奖赏 == 7) {
    // :6158

    await era.printAndWait(`「迎击成功的话，${sc()}想被很多人一起轮奸！」`); // :6160
  } else if (chara(a).stronghold.要求奖赏 == 8) {
    // :6161

    await era.printAndWait(
      `「迎击成功的话，${sc()}想要品尝魔王大人的『黄金甘露』！」`,
    ); // :6163
  } else if (chara(a).stronghold.要求奖赏 == 9) {
    // :6164

    await era.printAndWait(`${a_name}提出了想要狩猎童贞作为迎击成功的报酬`); // :6166
  } // :6166-6168
}

// @gohoubi_after_koujo_k15 // :6170
async function gohoubi_after_koujo_k15(rand, cid, choice) {
  void rand;
  void cid;
  const a = era_flag.target;
  const target_name = chara_callname(a); // %SAVESTR:TARGET%
  const sc = () => self_call(a); // %SELF_CALL(TARGET)%

  if (choice == 0) {
    // :6176
    await era.printAndWait(''); // :6177
    return 0; // :6177-6179
  } else if (choice == 1) {
    // :6180
    await era.printAndWait(`「能得到您的肯定，是${sc()}最大的荣幸。」`); // :6181
    await era.printAndWait(
      `${target_name}慎重地将勋章别在胸前，露出了满足的微笑。`,
    ); // :6182
    return 0; // :6182-6184
  } else if (choice == 2) {
    // :6184

    if (chara(a).stronghold.要求奖赏 == 0) {
      // :6186
      await era.printAndWait(
        `「这样就能买礼物送给魔王大人了，会期待吗？呵呵」`,
      ); // :6187
      await era.printAndWait(
        `${target_name}笑着将食指点在唇上，做了个礼物要保密的表情。`,
      ); // :6188
    } else if (chara(a).stronghold.要求奖赏 == 1) {
      // :6190

      if (era0(`talent:${a}:0`) == 1) {
        // :6192
        await era.printAndWait(
          `「第一次就让野狗侵犯…啊！啊啊…果然…插的好深啊～♡」`,
        ); // :6193
        await era.printAndWait(
          `${target_name}四肢着地趴在地上，尽管大腿还流淌着处女的血液，却像只母狗那样摇摆着屁股……`,
        ); // :6194
      } else {
        // :6194-6196
        await era.printAndWait(
          `「野狗的肉棒…呜啊！好…好棒啊♡！嗯啊…要……要射在里面了～♡」`,
        ); // :6196
        await era.printAndWait(
          `${target_name}四肢着地趴在地上，流着口水像只发情的母狗，淫荡地摇着屁股迎合肉棒的抽插……`,
        ); // :6197
      } // :6197-6199
    } else if (chara(a).stronghold.要求奖赏 == 2) {
      // :6200

      if (era0(`talent:${a}:0`) == 1) {
        // :6202
        await era.printAndWait(
          `「第一次就让猪侵犯…啊！啊啊…果然…插的好深啊～♡」`,
        ); // :6203
        await era.printAndWait(
          `${target_name}四肢着地趴在地上，尽管大腿还流淌着处女的血液，却像只母猪那样摇摆着屁股…`,
        ); // :6204
      } else {
        // :6204-6206
        await era.printAndWait(
          `「猪的肉棒…呜啊！好…好棒啊♡！嗯啊…要……要射在里面了～♡」`,
        ); // :6206
        await era.printAndWait(
          `${target_name}四肢着地趴在地上，流着口水像只发情的母猪，淫荡地摇着屁股迎合肉棒的抽插……`,
        ); // :6207
      } // :6207-6209
    } else if (chara(a).stronghold.要求奖赏 == 3) {
      // :6210

      if (era0(`talent:${a}:0`) == 1) {
        // :6212
        await era.printAndWait(
          `「第一次就让马侵犯…啊！啊啊…果然…插的好深啊～♡」`,
        ); // :6213
        await era.printAndWait(
          `${target_name}四肢着地趴在地上，尽管大腿还流淌着处女的血液，却像只母马那样摇摆着屁股…`,
        ); // :6214
      } else {
        // :6214-6216
        await era.printAndWait(
          `「马的肉棒…呜啊！好…好棒啊♡！嗯啊…要……要射在里面了～♡」`,
        ); // :6216
        await era.printAndWait(
          `${target_name}四肢着地趴在地上，流着口水像只发情的母马，淫荡地摇着屁股迎合肉棒的抽插……`,
        ); // :6217
      } // :6217-6219
    } else if (chara(a).stronghold.要求奖赏 == 4) {
      // :6220
      await era.printAndWait(`「嗯嗯……啾……啊……${sc()}的魔王大人～♡」`); // :6221
      await era.printAndWait(`${target_name}闭起眼睛，沉醉在与你的深吻之中……`); // :6222
    } else if (chara(a).stronghold.要求奖赏 == 5) {
      // :6224

      if (era0(`abl:${a}:2`) > era0(`abl:${a}:3`)) {
        // :6226
        await era.printAndWait(`「嗯嗯……啊……好棒……${sc()}的魔王大人～♡」`); // :6227
        await era.printAndWait(
          `${target_name}忘情地用双腿夹紧你的腰部，在你的抽插之下很快地高潮了……`,
        ); // :6228
      } else {
        // :6229-6231
        await era.printAndWait(
          `「魔王大人…请…请尽情使用这淫荡的屁股吧……啊啊♡」`,
        ); // :6231
        await era.printAndWait(
          `你狠狠地将整根肉棒完全没入${target_name}那饥渴的肛穴之中捣弄`,
        ); // :6232
        await era.printAndWait(
          `${target_name}带着满足的表情，发出了淫媚的呻吟……`,
        ); // :6233
      } // :6233-6235
    } else if (chara(a).stronghold.要求奖赏 == 6) {
      // :6236
      await era.printAndWait(`「唔……咕噜……咕噜……啊…感谢魔王大人的款待～♡」`); // :6237
      await era.printAndWait(
        `${target_name}意犹未尽地舔着嘴角，露出了满足的笑容……`,
      ); // :6238
    } else if (chara(a).stronghold.要求奖赏 == 7) {
      // :6240

      if (era0(`talent:${a}:0`) == 1) {
        // :6242
        await era.printAndWait(`「啊！……啊啊……又…又进来了…好……好棒……啊啊♡」`); // :6243
        await era.printAndWait(
          `尽管${target_name}大腿还流淌着处女的血液，却像个熟练的妓女那样沉迷在乱交的派对当中……`,
        ); // :6244
      } else {
        // :6244-6246
        await era.printAndWait(`「啊！……啊啊……又…又进来了…好……好棒……啊啊♡」`); // :6246
        await era.printAndWait(
          `${target_name}一边被操干着一边进行口交，像个熟练的妓女那样沉迷在乱交的派对当中……`,
        ); // :6247
      } // :6247-6249
    } else if (chara(a).stronghold.要求奖赏 == 8) {
      // :6250
      await era.printAndWait(`「唔……咕噜……咕噜……啊…感谢魔王大人的款待～♡」`); // :6251
      await era.printAndWait(
        `${target_name}意犹未尽地舔着嘴角，露出了满足的笑容……`,
      ); // :6252
    } else if (chara(a).stronghold.要求奖赏 == 9) {
      // :6254

      if (era0(`abl:${a}:2`) > era0(`abl:${a}:3`)) {
        // :6256
        await era.printAndWait(
          `「这青涩的肉棒……呵呵……就让${sc()}好好地引导吧～♡」`,
        ); // :6257
        await era.printAndWait(
          `${target_name}熟练地摆动着腰肢，用蜜穴饥渴地榨取着那纯洁处男的精液……`,
        ); // :6258
      } else {
        // :6259-6261
        await era.printAndWait(
          `「这青涩的肉棒……呵呵……就让${sc()}好好地引导吧～♡」`,
        ); // :6261
        await era.printAndWait(
          `${target_name}熟练地摆动着腰肢，用肛穴饥渴地榨取着那纯洁处男的精液……`,
        ); // :6262
      } // :6262-6264
    } else {
      // :6262-6266
    } // :6263-6267
  } // :6265-6267
}

// @osioki_koujo_k15 // :6268
async function osioki_koujo_k15(rand, cid, choice) {
  void rand;
  void cid;
  const a = era_flag.target;
  const target_name = chara_callname(a); // %SAVESTR:TARGET%
  const sc = () => self_call(a); // %SELF_CALL(TARGET)%

  if (choice == 0) {
    // :6274
    await era.printAndWait(`「您是如此的宽容！下次${sc()}一定会更加努力。」`); // :6275
    if (era0(`abl:${a}:21`) >= 3) {
      // :6277
      await era.printAndWait(
        `明明没有处罚，不知为何${target_name}却露出有点失落的样子……`,
      ); // :6277
    } // :6277
  } else if (choice == 1) {
    // :6279

    if (era0(`abl:${a}:21`) >= 3) {
      // :6281
      await era.printAndWait(
        `「呀啊！啊啊！这～这种感觉～唔～要～要高潮了！啊啊～♡」`,
      ); // :6282
      await era.printAndWait(
        `明明是电椅的处罚，${target_name}却发出了淫荡的呻吟……`,
      ); // :6283
    } else {
      // :6283-6285
      await era.printAndWait(
        `「唔！啊！不～不行了～啊！魔王大人…请…请饶了${sc()}吧……」`,
      ); // :6285
      await era.printAndWait(
        `${target_name}因电椅的痛苦，眼角闪着泪光说着求饶的话语……`,
      ); // :6286
    } // :6286-6288
  } else if (choice == 2) {
    // :6289

    if (era0(`abl:${a}:17`) >= 3) {
      // :6291
      await era.printAndWait(
        `「嗯啊！啊啊！要……要高潮了……贴近一点看……也可以的喔～♡」`,
      ); // :6292
    } else {
      // :6292-6294
      await era.printAndWait(`「唔……啊啊……你们……走…走开啊！……不……不要看啊……」`); // :6294
    } // :6294-6296
  } else if (choice == 3) {
    // :6297

    if (era0(`abl:${a}:17`) >= 6) {
      // :6299
      await era.printAndWait(
        `「啊！……唔啊！要…要出来了！……排泄的样子…被看见了啊～♡」`,
      ); // :6300
    } else {
      // :6300-6302
      await era.printAndWait(`「唔……啊啊……你们……走…走开啊！……不……不要看啊……」`); // :6302
    } // :6302-6304
  } else if (choice == 4) {
    // :6305

    if (era0(`abl:${a}:21`) >= 3) {
      // :6307
      await era.printAndWait(`「痛！……唔啊！……可是……为何这么舒服呢？啊啊～♡」`); // :6308
    } else {
      // :6308-6310
      await era.printAndWait(`「痛！……唔啊！……原…原谅${sc()}吧……啊！啊…！」`); // :6310
    } // :6310-6312
  } else if (choice == 5) {
    // :6313

    if (era0(`talent:${a}:88`) == 1 || era0(`talent:${a}:76`) == 1) {
      // :6315
      await era.printAndWait(
        `「唔……请…请将尿液……施舍给下贱的${target_name}～啊！好棒～♡」`,
      ); // :6316
    } else {
      // :6316-6318
      await era.printAndWait(`「不……拜托……不要这样…啊！不行！不要啊！！」`); // :6318
    } // :6318-6320
  } else if (choice == 6) {
    // :6321
    await era.print(`「这里……也太脏了吧…到底都在厕所里做些什么啊…真是……唉……」`); // :6322
  } else if (choice == 7) {
    // :6324
    await era.print(`「唉～好饿啊～不如……做些什么来转移注意力吧？」`); // :6325
  } else if (choice == 8) {
    // :6327
    await era.printAndWait(
      `「唔！啊啊……啊…忍不下去…谁……谁都可以…快…快来操${target_name}吧……啊啊～♡」`,
    ); // :6328
  } else if (choice == 9) {
    // :6330
    await era.printAndWait(''); // :6331
  } // :6330-6334
}

// @gobi_koujo_k15, ARG:0 // :6335
async function gobi_koujo_k15(arg0, rand) {
  void rand;

  if (arg0 == 1) {
    // :6338

    await era.print(`♪`); // :6340
  } else if (arg0 == 2) {
    // :6341

    await era.print(`！`); // :6343
  } else if (arg0 == 3) {
    // :6344

    await era.print(`……。`); // :6346
  } else if (arg0 == 4) {
    // :6347

    await era.print(`……。`); // :6349
  } else if (arg0 == 5) {
    // :6350

    await era.print(`……。`); // :6352
  } else {
    // :6352-6354

    await era.print(`。`); // :6356
  } // :6356-6357
}

ryouzyoku_kojo_family.register(15, dungeon_ryouzyoku_k15);
ryouzyoku_after_kojo_family.register(15, dungeon_ryouzyoku_after_k15);
benki_koujo_family.register(15, benki_koujo_k15);
dungeon_victory_family.register(15, dungeon_victory_k15);
dungeon_attack_family.register(15, dungeon_attack_k15);
ntr_koujo_family.register(15, ntr_koujo_k15);
exucution_koujo_family.register(15, exucution_koujo_k15);
museum_koujo_family.register(15, museum_koujo_k15);
banishment_koujo_family.register(15, banishment_koujo_k15);
public_exucution_koujo_family.register(15, public_exucution_koujo_k15);
grotesque_koujo_family.register(15, grotesque_koujo_k15);
enterenemy_koujo_family.register(15, enterenemy_koujo_k15);
gohoubi_request_koujo_family.register(15, () => gohoubi_request_koujo_k15());
gohoubi_after_koujo_family.register(15, (cid, choice) =>
  gohoubi_after_koujo_k15(undefined, cid, choice),
);
osioski_koujo_family.register(15, (cid, choice) =>
  osioki_koujo_k15(undefined, cid, choice),
);
gobi_koujo_family.register(15, gobi_koujo_k15);

kojo_message_com_family.register(15, kojo_message_com_15);
kojo_message_palamcng_family.register(15, kojo_message_palamcng_15);
kojo_message_markcng_family.register(15, kojo_message_markcng_15);
self_kojo_family.register(15, self_kojo_k15);

module.exports = {
  STUBBED_CALLS,
  kojo_message_com_15,
  k15_kojo2,
  dog_kojo_15,
  colosseum_kojo_15,
  kojo_message_palamcng_15,
  kojo_message_markcng_15,
  self_kojo_k15,
  dungeon_ryouzyoku_k15,
  dungeon_ryouzyoku_after_k15,
  benki_koujo_k15,
  dungeon_victory_k15,
  dungeon_attack_k15,
  ntr_koujo_k15,
  exucution_koujo_k15,
  museum_koujo_k15,
  banishment_koujo_k15,
  public_exucution_koujo_k15,
  grotesque_koujo_k15,
  enterenemy_koujo_k15,
  gohoubi_request_koujo_k15,
  gohoubi_after_koujo_k15,
  osioki_koujo_k15,
  gobi_koujo_k15,
};
