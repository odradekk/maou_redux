/* eslint-disable no-irregular-whitespace, no-dupe-else-if */
/**
 * @file 伶俐性格口上 K15：EVENTTRAIN 存在标志 + 主体（issue #246）。
 *
 * 源: target/ERB/口上/EVENT_K15_伶俐.ERB  @EVENTTRAIN #PRI（:29-33，存在
 *     标志 FLAG:115）@EVENTEND #LATER（:35-37，清标志）@EVENTTRAIN
 *     （:43-239，调教开始口上 CFLAG:201 + NTR 再捕获 + 屈服/淫乱/爱慕/
 *     崩坏 + K15_KOJO2 二回目以降）@K15_KOJO2（:245-310）@EVENTEND
 *     （:316-400，调教结束口上）@KOJO_MESSAGE_COM_15（:406 起，本切片落地
 *     四道头部守卫 + SELECTCOM 0 爱抚；其余随后续切片）。

 * == 守卫（K15 与模板七条不同，逐文件 1:1） ==
 *
 * @KOJO_MESSAGE_COM_15 的守卫（:408-425，源实测）：
 *   1. TEQUIP:45 && SELECTCOM != 45（口塞）→ 跳过；
 *   2. TFLAG:899（失神）→ 跳过；
 *   3. TEQUIP:89（兽奸）→ 岔去本文件真身 DOG_KOJO_15；
 *   4. TEQUIP:55（死斗场）→ 岔去本文件真身 COLOSSEUM_KOJO_15。
 * ASSI/ASSIPLAY 整行注释、无 TALENT:9、无 TEQUIP:90。
 *
 * 这张票存根（docs/stub-registry.md）：后续切片接 SELL_MATURO_K0。
 */

'use strict';

const era = require('#/era-electron');
const { on, TIER } = require('#/system/event/registry');
const era_flag = require('#/era-utils/era-flag');
const {
  kojo_message_com_family,
  self_kojo_family,
} = require('#/kojo/kojo-system');
const { self_call } = require('#/kojo/kojo-text');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { chara_callname } = require('#/utils/callname-utils');

/** 读未声明的序号返回 undefined 而非 0（#13），口上条件一律 || 0 兜底 */
const era0 = (k) => era.get(k) || 0;

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。
 */
const STUBBED_CALLS = [];

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
    // :43-47
    return 0; // :43-47
  } // :43-47
  if (era0(`talent:${target}:175`) != 1) {
    // :43-47
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
    // :316-324
    return 0; // :316-324
  } // :316-324
  if (era0(`talent:${target}:175`) != 1) {
    // :316-324
    return 0; // :316-324
  } // :316-324
  if (era0(`base:${target}:0`) <= 0) {
    // :316-324
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
 * kojo_message_com_15 头部守卫岔入）。本切片只落地 SELECTCOM 0 初回，
 * 其余分支随后续切片。
 *
 * @returns {Promise<number>} 0
 */
async function dog_kojo_15() {
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const kojo = chara(target).kojo;

  if (era_flag.selectcom == 0) {
    // :4030-4032
    if (kojo.爱抚 == 0) {
      // :4030-4034
      if (era0(`mark:${target}:2`) >= 2) {
        // :4036-4038
        await era.printAndWait(`「…………」`); // :4037-4038
        await era.printAndWait(`${target_name}皱着眉头，忍耐着狗的磨蹭……`); // :4038
      } else {
        // :4040-4042

        await era.printAndWait(`「不……别靠过来！恶心！……」`); // :4041
        await era.printAndWait(
          `当狗磨蹭到裸露的皮肤时，${target_name}忍不住怒斥了起来……`,
        ); // :4042
      } // :4042-4043
      kojo.爱抚 = 1; // :4042-4044
      return 0; // :4042-4045
    } // :4046-4082 二回目以降随后续切片
  } // :4041-4079

  return 0;
}

/**
 * @COLOSSEUM_KOJO_15（:5796 起）：死斗场本地函数（非 family 分发，由
 * kojo_message_com_15 头部守卫 TEQUIP:55 直接调用）。本切片只落地
 * SELECTCOM 55，其余随后续切片。
 *
 * @returns {Promise<number>} 0
 */
async function colosseum_kojo_15() {
  const target = era_flag.target;
  const target_name = chara_callname(target);

  if (era_flag.selectcom == 55) {
    // :5800-5803
    if (era0(`base:${target}:1`) <= 0) {
      // :5802-5803
      await era.printAndWait(
        `${target_name}摇摇晃晃地站着，好像随时会倒下的样子……`,
      ); // :5803
    } else {
      // :5803-5804
      await era.printAndWait(
        `${target_name}强行让自己冷静下来，试图摆脱死斗场气氛的影响……`,
      ); // :5805
    } // :5805-5806
    return 0; // :5805-5807
  } // :5808-5811

  return 0;
}

/**
 * @KOJO_MESSAGE_COM_15（:406 起）：指令口上。本切片落地四道头部守卫 +
 * SELECTCOM 0 爱抚状态机；其余 SELECTCOM 随后续切片。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0
 */
async function kojo_message_com_15(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const kojo = chara(target).kojo;

  if (era0(`tequip:${target}:45`) && era_flag.selectcom != 45) {
    // :411-412
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
  } // :487-492

  return 0;
}

/**
 * @SELF_KOJO_K15（:5168 起）：事件口上。本切片只注册分发号。
 *
 * @returns {Promise<number>} 0
 */
async function self_kojo_k15() {
  return 0;
}

kojo_message_com_family.register(15, kojo_message_com_15);
self_kojo_family.register(15, self_kojo_k15);

module.exports = {
  STUBBED_CALLS,
  kojo_message_com_15,
  k15_kojo2,
  dog_kojo_15,
  colosseum_kojo_15,
};
