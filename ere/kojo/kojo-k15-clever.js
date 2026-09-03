/* eslint-disable no-irregular-whitespace, no-dupe-else-if */
/**
 * @file 伶俐性格口上 K15：EVENTTRAIN 存在标志 + 主体（issue #246）。
 *
 * 源: target/ERB/口上/EVENT_K15_伶俐.ERB  @EVENTTRAIN #PRI（:29-33，存在
 *     标志 FLAG:115）@EVENTEND #LATER（:35-37，清标志）@EVENTTRAIN
 *     （:43-239，调教开始口上 CFLAG:201 + NTR 再捕获 + 屈服/淫乱/爱慕/
 *     崩坏 + K15_KOJO2 二回目以降）@K15_KOJO2（:245-310）@EVENTEND
 *     （:316-400，调教结束口上）@KOJO_MESSAGE_COM_15（:406 起，本切片落地
 *     四道头部守卫 + SELECTCOM 0–12；其余随后续切片）。

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
const { PALAMLV } = require('#/era-utils/palam-level');
const {
  kojo_message_com_family,
  self_kojo_family,
} = require('#/kojo/kojo-system');
const { self_call } = require('#/kojo/kojo-text');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { chara_callname, chara_name } = require('#/utils/callname-utils');

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
 * SELECTCOM 0–12；其余 SELECTCOM 随后续切片。
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
          // :760
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
