/* eslint-disable no-irregular-whitespace, no-dupe-else-if */
/**
 * @file 伶俐性格口上 K15：EVENTTRAIN 存在标志 + 主体（issue #246）。
 *
 * == 守卫（K15 与模板七条不同，逐文件 1:1） ==
 *
 * @KOJO_MESSAGE_COM_15 的守卫（:408-425，源实测）：
 *   1. TEQUIP:45 && SELECTCOM != 45（口塞）→ 跳过；
 *   2. TFLAG:899（失神）→ 跳过；
 *   3. TEQUIP:89（兽奸）→ 岔去本文件真身 DOG_KOJO_15；
 *   4. TEQUIP:55（死斗场）→ 岔去本文件真身 COLOSSEUM_KOJO_15。
 * ASSI/ASSIPLAY 整行注释、无 TALENT:9、无 TEQUIP:90。
 *
 * SELL_MATURO_K0 成熟出售真身已随 #338 接通。
 */

'use strict';

const era = require('#/era-electron');
const { sell_maturo_k0 } = require('#/system/stronghold/sell-maturo');
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
const { peek_aftertrain_q } = require('#/event/event-aftertrain');

/** 读未声明的序号返回 undefined 而非 0（#13），口上条件一律 || 0 兜底 */
const era0 = (k) => era.get(k) || 0;

// @EVENTTRAIN #PRI（:29-33）：存在标志 + 总开关补 0（同 EVENT_K.ERB 语义）
on(
  'EVENTTRAIN',
  () => {
    game.kojo.口上存在_15 = 1; // FLAG:115 = 1（K15 口上存在标志）
    if (game.kojo.口上开关 === 0) {
      game.kojo.口上开关 = 2;
    }
  },
  TIER.PRI,
);

// @EVENTEND #LATER（:35-37）：调教结束清存在标志
on(
  'EVENTEND',
  () => {
    game.kojo.口上存在_15 = 0;
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
    era.drawLine();
    await era.printAndWait(
      `「魔界的脸皮是不值钱的吧？因为连身为领导的魔王都只会用这些下三滥的技俩啊？」`,
    );
    await era.printAndWait(`${target_name}毫不留情地冷嘲热讽着………`);
    return 1;
  } else if (era0(`mark:${target}:2`) == 0 && kojo_on == 2) {
    era.drawLine();
    await era.print(
      [
        '「可以劳驾尊贵的魔王大人优雅且安静地滚开吗？」',
        '「也许，换一只猴子来代替您来调教，效果会更好呢？」',
      ][rand_n(2)],
    ); // PRINTDATAL
    await era.printAndWait(`${target_name}嗤之以鼻地说着………`);
    return 1;
  } else if (era0(`mark:${target}:2`) == 1 && kojo_on == 2) {
    era.drawLine();
    await era.printAndWait(`「哦？魔王都是这么闲的吗？只做这些无用的事情？」`);
    await era.printAndWait(`${target_name}无奈地摆摆手，用怀疑的语气说着………`);
    return 1;
  } else if (era0(`mark:${target}:2`) == 2 && kojo_on == 2) {
    era.drawLine();
    await era.printAndWait(`「只是习惯而已，难道还真以为那些手段会有用吗？」`);
    await era.printAndWait(`像是想要说服自己那样，${target_name}紧握着拳头………`);
    return 1;
  } else if (
    era0(`mark:${target}:2`) == 3 &&
    era0(`talent:${target}:85`) == 0 &&
    era0(`talent:${target}:76`) == 0 &&
    kojo_on == 2
  ) {
    era.drawLine();
    await era.printAndWait(
      `「反正不管说什么也没有用，${sc()}也就不想要白费力气了…」`,
    );
    await era.printAndWait(`${target_name}像是放弃了那样，转过了头………`);
    return 1;
  } else if (era0(`talent:${target}:76`) == 1 && kojo_on == 2) {
    era.drawLine();
    if (rand_n(2)) {
      // IF RAND:2（非 0 走本臂）

      await era.printAndWait(
        `「今天要玩些什么呢？不瞒您说，${sc()}这淫乱的身体早已经等不及了……」`,
      );
      await era.printAndWait(
        `「这个姿势可以看清楚吗？您看，这里变得这么的湿，这么热……」`,
      );
      await era.printAndWait(
        `${target_name}似乎已经忘记什么叫做廉耻，正大张着双腿做出勾引的动作……`,
      );
    } else {
      await era.printAndWait(
        `「最近新学到一些……嗯，算是新的知识吧？可以的话，魔王大人愿意陪${sc()}来『实验』一下吗？」`,
      );
      await era.printAndWait(
        `${target_name}露出了意味深长的笑容，将身体紧贴着你并缓缓地摩擦着……`,
      );
    }
    return 1;
  } else if (era0(`talent:${target}:85`) == 1 && kojo_on == 2) {
    era.drawLine();
    if (rand_n(2)) {
      await era.printAndWait(
        `「如果您允许的话，真想一直陪伴在您的身边，无论做什么事都可以……」`,
      );
    } else {
      await era.printAndWait(
        `「一见到您，不知为何就幸福地想露出微笑，真是一种很奇妙的感觉。」`,
      );
    }
    await era.printAndWait(
      `${target_name}脸色微红地说着，露出期待的眼神凝视着你……`,
    );
    return 1;
  }
  return 0;
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
    return 0;
  }
  if (era0(`talent:${target}:175`) != 1) {
    return 0;
  }

  if (kojo.初调教 == 0) {
    era.drawLine();
    if (
      !(
        era0(`talent:${target}:314`) == 9 ||
        era0(`talent:${target}:319`) == 9 ||
        era0(`talent:${target}:319`) == 8
      )
    ) {
      await era.printAndWait(
        `才刚走进牢房里，一枚带着光明气息的暗器就这样朝你的眼眸激射而来！！`,
      );
      await era.printAndWait(`（请按数字键 + Enter 选择行动！）`);
      era.setColor('#98fa69'); // SETCOLOR 152,250,105
      await era.print(''); // PRINTL
      await era.print(`『1』不闪不避 ( 按 1 + Enter )`);
      await era.print('');
      await era.print(`『2』偏头闪躲 ( 按 2 + Enter )`);
      await era.print('');
      era.setColor(''); // RESETCOLOR
      const result0 = await era.input(); // TINPUT 1000, 1（限时由引擎侧省略，默认值测试以预置输入覆盖）
      if (result0 == 2) {
        await era.printAndWait(
          `你稍微一偏头，就让那枚费尽${target_name}苦心筹谋的暗器打空了……`,
        );
        await era.printAndWait(
          `${target_name}似乎有点惊讶你的反应如此敏锐的样子……`,
        );
        await era.printAndWait(`恭顺点数 + 50`);
        era.add(`juel:${target}:4`, 50); // JUEL:4 += 50
      } else if (result0 == 1) {
        await era.printAndWait(
          `你不闪不避，那枚费尽${target_name}苦心筹谋的暗器打在你的眼皮上，造成了轻微的擦伤……`,
        );
      }
      await era.printAndWait(
        `好奇地将掉落在地的暗器捡起，发觉那不过是一枚尖端稍微被打磨过的小石片。`,
      );
      await era.printAndWait(
        `再观察一下牢房，在栅栏四周的阴影处，有老旧的捆绳与橡皮绳构成的简易弓弦似的陷阱……`,
      );
      await era.printAndWait(
        `哼，还颇有意思的，但是，这种小伎俩怎可能对魔王造成巨大的伤害呢？`,
      );
      await era.printAndWait('');
      await era.printAndWait(
        `「你，难道是魔王吗？所以暗器……才会无法造成伤害。」`,
      );
      await era.printAndWait(
        `本来只是对小喽喽用的陷阱，无奈直接遇上了魔王过来，这也是能算是运气不好吧？`,
      );
      await era.printAndWait(
        `所以看到陷阱失败，牢里的${target_name}不由自主地叹了口气，似乎有点失望的样子。`,
      );
    }
    await era.print('');
    await era.printAndWait(`「别以为只要囚禁${sc()}，就能让${sc()}屈服。」`);
    await era.printAndWait(
      `「被抓之后会有怎样的遭遇${sc()}早有耳闻。只不过让人失望的是，明明身为魔王却用这种下流卑劣的手段。」`,
    );
    await era.printAndWait(
      `「调教？哼…真是低级。该怎么评价好呢？真是………忧患魔界的未来啊！」`,
    );
    if (!(era0(`talent:${target}:10`) || era0(`talent:${target}:17`))) {
      await era.printAndWait(
        `${target_name}抬头露出不屑的表情，用嘲讽的眼神看着你。`,
      );
    } else {
      await era.printAndWait(`${target_name}紧握着拳头，试着让自己保持镇定。`);
    }
    await era.printAndWait(
      `明明成为了阶下囚，${target_name}却是不急不缓并义正严词地说着挑衅的话语……`,
    );
    kojo.初调教 = 1; // CFLAG:201 = 1
    return 1;
  } else if (kojo.初调教 >= 1 && kojo.NTR再捕获 == 1) {
    if (era0(`talent:${target}:85`) || era0(`talent:${target}:76`)) {
      era.drawLine();
      await era.printAndWait(
        `「真是非常抱歉…因为${sc()}的身体…就是被调教到如此淫乱…所以…」`,
      );
      await era.printAndWait(`${sc()}自嘲地笑着，露出了无奈的表情……`);
      kojo.NTR再捕获 = 0;
    } else {
      era.drawLine();
      await era.printAndWait(`「哼！反正不管在哪，做的事情都是一样！」`);
      await era.printAndWait(`${sc()}转过头去，露出了不甘心的表情……`);
      kojo.NTR再捕获 = 0;
    }
    return 1;
  } else if (kojo.初调教 < 2 && era0(`mark:${target}:2`) == 1) {
    era.drawLine();
    await era.printAndWait(
      `「看来，只会用这些小手段来折磨${sc()}的身体，这就是魔王大人的本事啊？」`,
    );
    await era.printAndWait(
      `${target_name}一幅漫不经心的样子，脸上带着不以为然的表情……`,
    );
    kojo.初调教 = 2;
    return 1;
  } else if (kojo.初调教 < 3 && era0(`mark:${target}:2`) == 2) {
    era.drawLine();
    await era.printAndWait(
      `「这些反应只是因为习惯而已！别天真地以为这样就能让${sc()}屈服了啊…！？」`,
    );
    await era.printAndWait(
      `${target_name}紧握着拳头，微微颤抖的声音似乎泄漏了他真正的心情……`,
    );
    kojo.初调教 = 3;
    return 1;
  } else if (
    kojo.初调教 < 4 &&
    era0(`mark:${target}:2`) == 3 &&
    era0(`talent:${target}:85`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(`「难道${sc()}是…不…不会的，怎么可能…！？」`);
    await era.printAndWait(
      `${target_name}喃喃地自言自语，露出了无法置信的表情……`,
    );
    kojo.初调教 = 4;
    return 1;
  } else if (
    kojo.初调教 < 5 &&
    era0(`talent:${target}:76`) == 1 &&
    era0(`talent:${target}:85`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(
      `「直到遇见了魔王大人，${sc()}才真正体会到什么叫做『欢愉』……」`,
    );
    await era.printAndWait(
      `「以前的事情回想起来，发觉${sc()}真是太愚昧了，早点坦然地接受您的调教就好了，真是浪费了美好的时光……」`,
    );
    await era.printAndWait(
      `${target_name}对你露出了媚笑，正伸出手暧昧地抚摸你的下身……`,
    );
    kojo.初调教 = 5;
    return 1;
  } else if (kojo.初调教 < 6 && era0(`talent:${target}:85`) == 1) {
    era.drawLine();
    await era.printAndWait(`「您来了啊？敬爱的魔王大人。」`);
    if (era0(`talent:${target}:122`)) {
      await era.printAndWait(
        `${target_name}一看见你就宛如被和煦的春风吹拂，露出了温柔的微笑。`,
      );
    } else {
      await era.printAndWait(
        `${target_name}一看见你就宛如花朵盛开般地展颜，露出了美丽无暇的微笑。`,
      );
    }
    await era.printAndWait(`「那个，如果可以的话，有些事情想要跟您说……」`);
    await era.printAndWait(
      `${target_name}不自然地清了一下喉咙，似乎有点羞涩，不敢直视你的眼神。`,
    );
    await era.printAndWait(
      `「以前被『正义』所奴役，只会说着尖酸刻薄的话，那个愚昧的${sc()}……求求您忘记吧！」`,
    );
    await era.printAndWait(
      `「现在想起来，简直……如此愚蠢的样子居然还不知耻地在您的面前放肆……」`,
    );
    await era.printAndWait(`${target_name}想起了黑历史，似乎羞愧得无法自拔……`);
    await era.printAndWait(
      `稍微冷静一会儿之后，${target_name}带着专注且期盼的眼神缓缓地说着……`,
    );
    await era.printAndWait(
      `「遇见您让${sc()}感觉像是重生了一样，也唯独只有您让${sc()}有这样的感受。如果可以的话…」`,
    );
    await era.printAndWait(
      `「能让卑微的${sc()}留在您的身边，替您分忧解劳吗？」`,
    );
    await era.printAndWait(
      `「${sc()}的身心都是完全属于您的，请您尽情地使用。」`,
    );
    await era.printAndWait(
      `${target_name}谦卑地跪在你的面前，虔诚地亲吻着你的手背……`,
    );
    kojo.初调教 = 6;
    return 1;
  } else if (era0(`talent:${target}:9`) == 1 && kojo.初调教 < 9) {
    era.drawLine();
    await era.printAndWait(`${target_name}正面对着墙壁自言自语。`);
    await era.printAndWait(`一会儿微笑一会儿又怒吼着，甚至还会以头撞墙………`);
    await era.printAndWait(`看来，${target_name}果然是被玩坏了………`);
    kojo.初调教 = 9;
    return 1;
  } else if (era_flag.assi < 0) {
    await k15_kojo2(); // CALL K15_KOJO2
  } else {
    await k15_kojo2(); // CALL K15_KOJO2
  }
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
    return 0;
  }
  if (era0(`talent:${target}:175`) != 1) {
    return 0;
  }
  if (era0(`base:${target}:0`) <= 0) {
    return 0;
  }

  if (era0(`mark:${target}:3`) == 3 && era0(`talent:${target}:85`) == 0) {
    era.drawLine();
    await era.printAndWait(
      `「真是人渣…！喔…抱歉，忘了你不是人族了，应该说人渣不如才对！」`,
    );
    await era.printAndWait(`${target_name}用冰冷且尖锐的言语怒骂了起来……`);
    return 1;
  } else if (
    era0(`mark:${target}:2`) <= 1 &&
    era0(`talent:${target}:85`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(`「就这…？再怎么做也是没用的！」`);
    if (era0(`talent:${target}:317`) == 4) {
      await era.printAndWait(
        `（为了那个人，${sc()}一定要逃离这个鬼地方才行！）`,
      );
    }
    await era.printAndWait(
      `${target_name}皱着眉头咬着手指，似乎在思考什么的样子……`,
    );
    return 1;
  } else if (
    era0(`mark:${target}:2`) == 2 &&
    era0(`talent:${target}:85`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(`「唔…嗯…总算是结束了…」`);
    if (era0(`talent:${target}:317`) == 4) {
      await era.printAndWait(
        `（就算是被做了这种事……为了那个人，${sc()}也不能放弃！）`,
      );
    }
    await era.printAndWait(`${target_name}叹了一口气，露出若有所思的表情……`);
    return 1;
  } else if (
    era0(`mark:${target}:2`) == 3 &&
    era0(`talent:${target}:85`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(`「如果再这样下去的话…该不会…已经……」`);
    if (era0(`talent:${target}:317`) == 4) {
      await era.printAndWait(
        `（这样的${sc()}……已经无法再回到那个人的身边了吧？）`,
      );
    }
    await era.printAndWait(
      `${target_name}低着头喃喃自语着，露出了放弃的表情……`,
    );
    return 1;
  } else if (
    era0(`talent:${target}:76`) == 1 &&
    era0(`base:${target}:0`) >= 500
  ) {
    era.drawLine();
    await era.printAndWait(
      `「咦…！？结束了吗…？呵呵…魔王大人您今天的状态不行哦…？」`,
    );
    await era.printAndWait(
      `「开玩笑的啦！别生气喔？因为是魔王大人，${sc()}才会依依不舍啊！」`,
    );
    await era.printAndWait(
      `尚有体力的${target_name}，正在想着呆会该如何解决自己身体的火热……`,
    );
    return 1;
  } else if (
    era0(`talent:${target}:76`) == 1 &&
    era0(`base:${target}:0`) <= 500
  ) {
    era.drawLine();
    await era.print(
      [
        `「呼……只有魔王大人能把${sc()}弄成这样乱七八糟的样子呢~」`,
        `「嗯啊…啊…嗯…真不愧是魔王大人，${sc()}被调教到腰都软了呢~」`,
      ][rand_n(2)],
    ); // PRINTDATAL
    await era.printAndWait(
      `${target_name}的眼角带着情欲未退的潮红，喘息地向你求饶着……`,
    );
    return 1;
  } else if (
    era0(`talent:${target}:85`) == 1 &&
    era0(`base:${target}:0`) >= 500
  ) {
    era.drawLine();
    await era.printAndWait(
      `「咦…！？结束了吗…？呵呵…魔王大人您今天的状态不行哦…？」`,
    );
    await era.printAndWait(
      `「开玩笑的啦！别生气喔？因为是魔王大人，${sc()}才会依依不舍啊！」`,
    );
    await era.printAndWait(
      `尚有体力的${target_name}，正拉着你的袖子露出讨好的笑容，似乎很不舍得就这样与你分开……`,
    );
    return 1;
  } else if (
    era0(`talent:${target}:85`) == 1 &&
    era0(`base:${target}:0`) <= 500
  ) {
    era.drawLine();
    await era.print(
      [
        `「唔…好想就这样一直和您合而为一啊…！」`,
        `「${sc()}这体力真是不行，不知您觉得还满意吗？」`,
      ][rand_n(2)],
    ); // PRINTDATAL
    await era.printAndWait(
      `${target_name}的眼角带着情欲未退的潮红，亲昵地抱着你说着……`,
    );
    return 1;
  }
  return 0;
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
    if (kojo.爱抚 == 0) {
      if (era0(`mark:${target}:2`) >= 2) {
        await era.printAndWait(`「…………」`);
        await era.printAndWait(`${target_name}皱着眉头，忍耐着狗的磨蹭……`);
      } else {
        await era.printAndWait(`「不……别靠过来！恶心！……」`);
        await era.printAndWait(
          `当狗磨蹭到裸露的皮肤时，${target_name}忍不住怒斥了起来……`,
        );
      }
      kojo.爱抚 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (kojo.爱抚 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「狗狗的皮毛好舒服……其他的地方也……♡」`);
        await era.printAndWait(
          `${target_name}就像是一条合格的母狗一样，万分自然地与狗相互磨蹭着……`,
        );
        kojo.爱抚 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「即使对象是狗狗……也很舒服呢……♡」`);
        await era.printAndWait(`${target_name}毫不在乎地与狗相互磨蹭着……`);
        kojo.爱抚 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (!era_flag.assiplay) {
          await era.printAndWait(`「如果您希望${sc()}跟狗狗亲近的话………」`);
        }
        await era.printAndWait(`${target_name}顺从地与狗相互磨蹭着……`);
        kojo.爱抚 = 5;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「………唔……嗯……」`);
        kojo.爱抚 = 4;
      } else if (
        era0(`mark:${target}:2`) == 2 &&
        (kojo.爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「……唔………不……」`);
        kojo.爱抚 = 3;
      } else if (
        era0(`mark:${target}:2`) <= 1 &&
        (kojo.爱抚 <= 1 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「都说不要了……走开啊！」`);
        kojo.爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 1) {
    if (kojo.舔阴 == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        await era.printAndWait(`「不！那里是……不可以啊！啊啊啊！」`);
        await era.printAndWait(`${target_name}发出了歇斯底里的大叫……`);
      } else {
        await era.printAndWait(`「不……好脏……不要啊！」`);
        await era.printAndWait(`${target_name}厌恶地怒吼着……`);
      }
      kojo.舔阴 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (kojo.舔阴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯～啊啊♡……好……好棒♡……湿了……要去了啊～♡♡」`);
        kojo.舔阴 = 6;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.舔阴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「那里……嗯…啊啊♡…被狗狗舔了呢～♡♡」`);
        kojo.舔阴 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.舔阴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜……这里…不行……是魔王大人的……唔……」`);
        kojo.舔阴 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.舔阴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「……唔……不……不要………」`);
        kojo.舔阴 = 3;
      } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「脏死了！走开！走开啊啊啊！」`);
        kojo.舔阴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 5) {
    if (kojo.胸爱抚 == 0) {
      if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「在魔王大人面前……呜……」`);
      } else {
        await era.printAndWait(`「别……别碰那里！……走开啊！」`);
      }
      kojo.胸爱抚 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (kojo.胸爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯～好……好棒……啊啊……嗯嗯……啊啊啊～♡♡」`);
        kojo.胸爱抚 = 6;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯…啊啊～狗狗……真乖呢♡……嗯嗯……啊啊～♡♡」`);
        kojo.胸爱抚 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「唔……不…不行……${sc()}的身体……是魔王大人的……啊…」`,
        );
        kojo.胸爱抚 = 4;
      } else if (
        era0(`abl:${target}:1`) >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊……不……不可以……」`);
        kojo.胸爱抚 = 3;
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「恶心！走开………不……不要！」`);
        kojo.胸爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 6) {
    if (kojo.接吻 == 0 && game.train.初吻与自我口上) {
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait(`「嗯啊……咕……啾……嗯……嗯」`);
        await era.printAndWait(
          `${target_name}连自己是初吻的事情都忘了，只是痴迷地与狗进行舌吻……`,
        );
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「初吻的对象是狗狗吗？魔王大人真是鬼畜呢～♡」`);
        await era.printAndWait(
          `尽管${target_name}这么说，却是毫不抵抗地遵从了命令……`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「${sc()}是属于魔王大人的……如果是您的命令…就算是初吻也……」`,
        );
        await era.printAndWait(
          `${target_name}似乎有点消沉的样子，但还是顺从地执行着命令……`,
        );
      } else {
        await era.printAndWait(`「真…真不敢相信……${sc()}…${sc()}的…初吻！」`);
        await era.printAndWait(
          `${target_name}厌恶地不停擦拭着嘴唇，那神情恍惚的样子似乎受到了打击……`,
        );
      }
      kojo.接吻 = 1;
      return 0;
    } else if (kojo.接吻 == 0) {
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait(`「嗯啊……咕……啾……嗯……嗯～♡♡」`);
        await era.printAndWait(
          `${target_name}淫荡地摇着屁股，痴迷地与狗进行着舌吻……`,
        );
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「呵呵……好啊……没有试过呢……嗯……啾……」`);
        await era.printAndWait(`${target_name}毫不抵抗地遵从了命令……`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「${sc()}是属于魔王大人的……如果是您的命令……」`);
        await era.printAndWait(`${target_name}顺从地执行着命令……`);
      } else {
        await era.printAndWait(`「真…真不敢相信……不……不要！」`);
        await era.printAndWait(
          `${target_name}厌恶地不停擦拭着嘴唇，那神情恍惚的样子似乎受到了打击……`,
        );
      }
      kojo.接吻 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (kojo.接吻 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯啊…好……好棒…咕……啾……嗯……嗯～♡♡」`);
        await era.printAndWait(
          `${target_name}一边流着口水，一边痴迷地与狗进行着舌吻……`,
        );
        kojo.接吻 = 6;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.接吻 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯……唔……咕……啾……嗯～♡♡」`);
        await era.printAndWait(
          `即使对象是狗，${target_name}似乎也无所谓的样子……`,
        );
        kojo.接吻 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.接吻 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯……唔……咕……啾……嗯……」`);
        await era.printAndWait(`（一切……都是要让……魔王大人开心……）`);
        await era.printAndWait(`${target_name}顺从地执行着命令……`);
        kojo.接吻 = 4;
      } else if (
        era0(`abl:${target}:10`) >= 2 &&
        (kojo.接吻 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「不……唔………」`);
        kojo.接吻 = 3;
      } else if (kojo.接吻 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「讨厌！……恶心死了！……不……不要！」`);
        kojo.接吻 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 9) {
    if (kojo.舔肛 == 0) {
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait(`「嗯啊…哈啊……好……好棒……狗狗的舌头♡」`);
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「呵呵……舔这个地方……真是坏狗狗♡」`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「唔……狗狗……不可以……啊……」`);
      } else {
        await era.printAndWait(`「好脏……不要……走开…走开啊啊啊！」`);
      }
      kojo.舔肛 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (kojo.舔肛 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊…舌头…伸到里面了♡……好…好棒♡……啊啊……嗯啊啊～♡」`,
        );
        kojo.舔肛 = 6;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「狗狗……也很……厉害呢…嗯啊啊～♡」`);
        kojo.舔肛 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.舔肛 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊……在魔王大人的视线下……呜……好羞耻啊……」`);
        kojo.舔肛 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.舔肛 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「……不………不………」`);
        kojo.舔肛 = 3;
      } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「走开！不……不可以……不要舔啊！」`);
        kojo.舔肛 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 21) {
    if (kojo.背后位 == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:136`) == 1) {
          await era.printAndWait(
            `「是的…是的…${sc()}的一切都是狗狗大人的…啊啊……嗯啊啊～♡」`,
          );
          await era.printAndWait(
            `${target_name}兴奋地摇晃着屁股，就像是一条发情的母狗……`,
          );
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「能摆脱处女就好……嗯……狗狗……快来呀～♡」`);
          await era.printAndWait(
            `${target_name}毫不在乎第一次的对象是狗狗的样子……`,
          );
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「但是${sc()}…${sc()}是…不…没事……如果魔王大人想看的话………」`,
          );
          await era.printAndWait(
            `${target_name}似乎无法把话说完…只是低头温驯地听从了命令……`,
          );
        } else {
          await era.printAndWait(
            `「不！不要呀！啊啊！绝对…绝对……要杀了你们！啊啊啊！！」`,
          );
          await era.printAndWait(
            `惨遭兽奸破处的${target_name}发出了崩溃似的嘶喊……`,
          );
        }
      } else {
        if (era0(`talent:${target}:136`) == 1) {
          await era.printAndWait(
            `「是的…是的…${sc()}的一切都是狗狗大人的…啊啊……嗯啊啊～♡」`,
          );
          await era.printAndWait(
            `${target_name}兴奋地摇晃着屁股，就像是一条发情的母狗……`,
          );
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「跟狗狗交配啊……呵呵……好新奇呢……也许很棒哦♡」`,
          );
          await era.printAndWait(
            `${target_name}的双眼发光，露出了很感兴趣的表情……`,
          );
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「好……好的…如果…魔王大人想…想看的话……」`);
          await era.printAndWait(`${target_name}低头温驯地听从了命令……`);
        } else {
          await era.printAndWait(
            `「不！不要呀！啊啊！绝对…绝对……要杀了你们！啊啊啊！！」`,
          );
          await era.printAndWait(
            `惨遭兽奸的${target_name}发出了崩溃似的嘶喊……`,
          );
        }
      }
      kojo.背后位 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (kojo.背后位 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「好想受精♡……啊啊……请……请灌满…精液吧…啊啊……嗯啊啊～♡」`,
            `「嗯啊啊～狗狗大人的肉棒！…全都进来了♡…啊啊……嗯啊啊～♡」`,
            `「是的！是的！${sc()}就是最喜欢被狗交配的母狗♡…啊啊……嗯啊啊～♡」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.printAndWait(
          `${target_name}流着口水双眼翻白，脑子除了狗狗的肉棒之外什么都不知道了……`,
        );
        kojo.背后位 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「嗯嗯～啊啊……狗狗的…进的好深呢♡♡…啊啊……嗯啊啊～♡」`,
            `「嗯啊啊～好烫啊……狗狗的肉棒♡……啊啊……嗯啊啊～♡」`,
            `「啊啊～好……好舒服～♡…狗狗好厉害啊…嗯啊……嗯啊啊～♡」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.printAndWait(
          `即使是跟狗交配，但是沉醉在肉欲的${target_name}一点也不在乎的样子……`,
        );
        kojo.背后位 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.背后位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「嗯嗯…啊…不…不可以射在里面……啊啊……嗯啊啊……」`,
            `「嗯啊啊…好烫…狗狗的肉棒…不…不……啊啊……嗯啊啊……」`,
            `「啊啊…太……太深了…狗狗…不…不可以…嗯…啊啊……」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.printAndWait(`（为了魔王大人…就算…就算对象是狗…也……）`);
        await era.printAndWait(
          `${target_name}一边与狗交配，一边想着魔王大人的事情……`,
        );
        kojo.背后位 = 5;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯嗯…啊…不…不……好奇怪…不要了……不……嗯啊啊……」`,
        );
        await era.printAndWait(
          `明明是屈辱的兽交，${target_name}却不由自主地扭动着身体……`,
        );
        kojo.背后位 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「不……不要啊……饶了${sc()}了……唔……嗯啊啊……」`);
        await era.printAndWait(
          `雌伏在狗身下的${target_name}，发出了痛苦的呻吟……`,
        );
        kojo.背后位 = 3;
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 == 2) {
        await era.print(
          [
            `「走开！去死啊！啊啊！啊啊啊！！」`,
            `「不！不要啊……住手！……啊啊啊！！」`,
            `「可恶！一定要杀了你！啊！啊啊啊！」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.printAndWait(`被狗奸淫的${target_name}，发出了凄厉地悲鸣……`);
        kojo.背后位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 27) {
    if (kojo.背后位肛交 == 0) {
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait(
          `「好的…好的…屁股也请狗狗大人宠幸吧…啊啊……嗯啊啊～♡」`,
        );
        await era.printAndWait(
          `${target_name}兴奋地摇晃着屁股，就像是一条发情的母狗……`,
        );
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「跟狗狗肛交吗……没试过呢……也许很棒哦♡」`);
        await era.printAndWait(
          `${target_name}的双眼发光，露出了很感兴趣的表情……`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「欸？…没…没事…可以哦……如果…魔王大人想…想看的话……」`,
        );
        await era.printAndWait(`${target_name}低头温驯地听从了命令……`);
      } else {
        await era.printAndWait(
          `「怎么可能！不！不要！去死……去死啊！啊啊啊！！」`,
        );
        await era.printAndWait(
          `被强迫与狗肛交的${target_name}发出了崩溃似的嘶喊……`,
        );
      }
      kojo.背后位肛交 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「好棒♡……好棒啊……屁股…是…狗狗大人的形状了…啊啊……嗯啊啊～♡」`,
            `「嗯啊啊～狗狗大人的肉棒！…全都进来了♡…啊啊……嗯啊啊～♡」`,
            `「嗯啊啊！请…请在屁股里射精…留下记号吧♡……啊啊……嗯啊啊～♡」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.printAndWait(
          `${target_name}流着口水双眼翻白，脑子除了狗狗的肉棒之外什么都不知道了……`,
        );
        kojo.背后位肛交 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「嗯嗯～啊啊……狗狗的…插进屁股里面了♡♡…啊啊……嗯啊啊～♡」`,
            `「嗯啊啊～好烫啊……狗狗的肉棒♡……啊啊……嗯啊啊～♡」`,
            `「啊啊～好……好舒服～♡…狗狗好厉害啊…嗯啊……嗯啊啊～♡」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.printAndWait(
          `即使是跟狗肛交，但是沉醉在肉欲的${target_name}一点也不在乎的样子……`,
        );
        kojo.背后位肛交 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「嗯嗯…啊…后面…好奇怪…不…不可以……啊啊……嗯啊啊……」`,
            `「嗯啊啊…好烫…狗狗的肉棒…不…不……啊啊……嗯啊啊……」`,
            `「啊啊…太……太深了…狗狗…不…不可以…嗯…啊啊……」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.printAndWait(`（明明不是魔王大人…为…为什么会……）`);
        await era.printAndWait(
          `${target_name}一边与狗肛交，一边想着魔王大人的事情……`,
        );
        kojo.背后位肛交 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「嗯嗯…啊…后面……啊啊……嗯啊啊……」`,
            `「嗯啊啊…进……进来了……啊啊……嗯啊啊……」`,
            `「啊啊…不……那里会……嗯…啊啊……」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.printAndWait(`（为了魔王大人…就算…就算对象是狗…也……）`);
        await era.printAndWait(
          `${target_name}一边与狗肛交，一边想着魔王大人的事情……`,
        );
        kojo.背后位肛交 = 4;
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯嗯…啊…不…不……好奇怪…不要了……不……嗯啊啊……」`,
        );
        await era.printAndWait(
          `明明是屈辱的兽交，${target_name}却不由自主地扭动着身体……`,
        );
        kojo.背后位肛交 = 3;
      } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.print(
          [
            `「走开！去死啊！啊啊！啊啊啊！！」`,
            `「不！不要啊……住手！……啊啊啊！！」`,
            `「可恶！一定要杀了你！啊！啊啊啊！」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.printAndWait(`被狗奸淫的${target_name}，发出了凄厉地悲鸣……`);
        kojo.背后位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 30) {
    if (kojo.手淫 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      kojo.手淫 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        kojo.手淫 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        kojo.手淫 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (kojo.手淫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        kojo.手淫 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.手淫 = 4;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.手淫 = 3;
      } else if (kojo.手淫 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        kojo.手淫 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 31) {
    if (kojo.口交_奴 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      kojo.口交_奴 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.口交_奴 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.口交_奴 = 6;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.口交_奴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.口交_奴 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.print('');
        await era.printAndWait('');
        kojo.口交_奴 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.口交_奴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.print('');
        await era.printAndWait('');
        kojo.口交_奴 = 3;
      } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        kojo.口交_奴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 34) {
    if (kojo.骑乘位 == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:136`) == 1) {
          await era.printAndWait('');
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      } else {
        if (era0(`talent:${target}:136`) == 1) {
          await era.printAndWait('');
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      }
      kojo.骑乘位 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (kojo.骑乘位 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        kojo.骑乘位 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.骑乘位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(4) == 0) {
          await era.printAndWait('');
        } else if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        kojo.骑乘位 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.骑乘位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(4) == 0) {
          await era.print('');
        } else if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        kojo.骑乘位 = 5;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (kojo.骑乘位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(4) == 0) {
          await era.printAndWait('');
        } else if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        kojo.骑乘位 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.骑乘位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.print('');
        await era.printAndWait('');
        kojo.骑乘位 = 3;
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        kojo.骑乘位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 37) {
    if (kojo.肛门侍奉 == 0) {
      if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      kojo.肛门侍奉 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (kojo.肛门侍奉 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.肛门侍奉 = 6;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.肛门侍奉 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.print('');
        kojo.肛门侍奉 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.肛门侍奉 = 3;
      } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        kojo.肛门侍奉 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`)) {
    if (kojo.眼罩 == 0) {
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      kojo.眼罩 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (kojo.眼罩 <= 9 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.眼罩 = 10;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.眼罩 = 9;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.眼罩 = 8;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.眼罩 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.眼罩 = 7;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.眼罩 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.眼罩 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.眼罩 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.眼罩 = 4;
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.眼罩 = 3;
      } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        kojo.眼罩 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`) == 0) {
    if (
      era0(`talent:${target}:136`) == 1 &&
      (kojo.肛门侍奉 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      kojo.兽奸眼罩 = 4;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.肛门侍奉 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      kojo.兽奸眼罩 = 3;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.肛门侍奉 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      kojo.兽奸眼罩 = 2;
    } else if (kojo.兽奸眼罩 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait('');
      kojo.兽奸眼罩 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 56) {
    if (kojo.交谈 == 0) {
      if (era0(`tequip:${target}:53`)) {
        if (era0(`talent:${target}:136`) == 1) {
          await era.printAndWait(
            `「啊！终于要开拍了吗？这个地方已经等不及想被狗狗射精了呢！」`,
          );
          await era.printAndWait(
            `「那么，请大家好好观赏${sc()}跟狗狗的爱爱哦！」`,
          );
          await era.printAndWait(
            `${target_name}四肢着地趴在地板上摇晃着屁股，简直就像是条发情的母狗……`,
          );
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「普通的做爱影像相信各位观众也都看腻了吧？」`,
          );
          await era.printAndWait(
            `「那么，接下来就好好期待人狗交配的场景哦！」`,
          );
          await era.printAndWait(
            `${target_name}露出期待的表情，像是迫不及待地舔了舔嘴唇……`,
          );
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「如果……魔王大人开心的话…就算是……跟狗……也……」`,
          );
          await era.printAndWait(
            `${target_name}低下头来掩饰自己的表情，配合地说着自${sc()}介绍的台词……`,
          );
        } else {
          await era.printAndWait(`「可恶……别拍！变态！去死啊！」`);
          await era.printAndWait(
            `${target_name}十分抗拒被拍摄这件事，愤怒的怒吼着……`,
          );
        }
      }
      kojo.交谈 = 1;
      return 0;
    } else {
      if (era0(`tequip:${target}:53`)) {
        if (
          era0(`talent:${target}:136`) == 1 &&
          (kojo.交谈 <= 4 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait(
            `「嘿嘿～跟狗狗交配很舒服哦～只要试过就上瘾了呢♡」`,
          );
          await era.printAndWait(
            `${target_name}露出痴迷的表情，像条母狗一样不停地摇摆着屁股……`,
          );
          kojo.交谈 = 5;
        } else if (
          era0(`talent:${target}:76`) == 1 &&
          (kojo.交谈 <= 3 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait(
            `「偶而换换不同的种族交配也很有意思喔！请尽情地观赏吧♡」`,
          );
          await era.printAndWait(
            `「如果大家喜欢这次影像的话，那${sc()}会很开心的呢～」`,
          );
          await era.printAndWait(
            `${target_name}摆出诱惑的姿势，熟练地说着介绍的台词……`,
          );
          kojo.交谈 = 4;
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          (kojo.交谈 <= 2 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait(
            `「魔王大人……喜欢这种影像吗？那么……${sc()}也……会努力的……」`,
          );
          await era.printAndWait(
            `${target_name}露出了微笑，流畅地说着介绍的台词……`,
          );
          kojo.交谈 = 3;
        } else if (kojo.交谈 <= 1 || game.kojo.口上开关 == 2) {
          await era.printAndWait(
            `「这种变态行为还要${sc()}说什么？可以请你去死吗？」`,
          );
          await era.printAndWait(
            `${target_name}因为怒气腾腾，对着水晶球恶言恶语着……`,
          );
          kojo.交谈 = 2;
        }
      }
      return 0;
    }
  }

  return 0;
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
    if (era0(`base:${target}:1`) <= 0) {
      await era.printAndWait(
        `${target_name}摇摇晃晃地站着，好像随时会倒下的样子……`,
      );
    } else {
      await era.printAndWait(
        `${target_name}强行让自己冷静下来，试图摆脱死斗场气氛的影响……`,
      );
    }
    return 0;
  }

  if (era_flag.selectcom == 56) {
    if (era0(`base:${target}:1`) <= 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「${assi_name}，这种打斗有意义吗？」`);
        await era.printAndWait(
          `${target_name}已经筋疲力尽，露出了无奈的表情……`,
        );
      } else {
        await era.printAndWait(`「居……居然……要被这种怪物……不！」`);
        await era.printAndWait(
          `一想到呆会可能会发生的景象，筋疲力尽的${target_name}挣扎地想要离开这里……`,
        );
      }
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「${assi_name}，是你要作为${sc()}的对手吗？」`);
        await era.printAndWait(
          `${target_name}露出疑惑的表情，看着${assi_name}……`,
        );
      } else {
        await era.printAndWait(`「开什么玩笑？要跟这种怪物打斗？」`);
        await era.printAndWait(
          `${target_name}看着对面蠢蠢欲动的怪物，不由自主地皱起了眉头……`,
        );
      }
    }
    return 0;
  }

  if (era_flag.selectcom == 31) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(`「不…唔……唔唔……嗯……啊……不！呜！」`);
      // 原作是一整行：无后缀 PRINTFORM/PRINT 连续
      // 不换行，末行 PRINTFORMW 才收行。:5844/:5846 两条 SIF 互斥（TALENT:121/
      // 122 的「有」与「无」）——判据提到语句外当取值，文本留在输出语句里（#625）
      const assi_has_penis =
        era0(`talent:${assi}:121`) == 1 || era0(`talent:${assi}:122`) == 1;
      // 原作 ITEM:PBAND：PBAND 是内建非角色变量，SYSTEM ver1.0.3.ERB:42 赋 4
      //（4 号 = 假阳具，Item.csv:5），全库不再改写（#552）
      const assi_has_toy = era0('item:4') == 1;
      await era.printAndWait(
        `${assi_name}粗暴地拉起${target_name}的头发，得意地用` +
          (assi_has_penis ? '阴茎' : assi_has_toy ? '假阳具' : '') +
          `侵犯着对方的口腔……`,
      );
    } else {
      await era.printAndWait(`「不…唔……唔唔……嗯……啊……不！呜！」`);
      await era.printAndWait(
        `无力反抗的${target_name}，嘴巴正被怪物们腥臭的肉棒侵犯着……`,
      );
    }
    return 0;
  }

  if (era_flag.selectcom == 5) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(`「放…放手！……啊！……不……别摸了！……呜！」`);
      await era.printAndWait(
        `${assi_name}像是展示那样，故意粗暴地揉捏着${target_name}的乳房……`,
      );
    } else {
      await era.printAndWait(`「放…放手！……啊！……真……真是恶心！……呜！」`);
      await era.printAndWait(
        `无力反抗的${target_name}，那柔软的乳房正被怪物们揉捏成各种形状……`,
      );
    }
    return 0;
  }

  if (era_flag.selectcom == 21) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(`「不！不要再插进来了！唔！不……不要啊！！」`);
      await era.printAndWait(
        `无视${target_name}的悲鸣，${assi_name}毫不留情地用力摆动着胯部抽插着……`,
      );
    } else if (game.train.死斗场敌种 == 206) {
      await era.printAndWait(`「不！不要啊！啊啊啊！！坏…坏掉了…啊啊啊！！」`);
      await era.printAndWait(
        `${target_name}发出凄厉的惨叫，肚子鼓成了巨人肉棒的形状……`,
      );
    } else {
      await era.printAndWait(
        `「不！不要啊！痛！不……不行……不要射在里面……啊啊啊！！」`,
      );
      await era.printAndWait(
        `${target_name}的蜜穴被怪物凌虐着，腥臭的精液源源不断地灌进子宫深处的地方……`,
      );
    }
    return 0;
  }

  if (era_flag.selectcom == 27) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(`「不！不要再插进来了！唔！不……不要啊！！」`);
      await era.printAndWait(
        `无视${target_name}的悲鸣，${assi_name}毫不留情地用力摆动着胯部抽插着……`,
      );
    } else if (game.train.死斗场敌种 == 206) {
      await era.printAndWait(`「不！不要啊！啊啊啊！！坏…坏掉了…啊啊啊！！」`);
      await era.printAndWait(
        `${target_name}发出凄厉的惨叫，肚子鼓成了巨人肉棒的形状……`,
      );
    } else {
      await era.printAndWait(
        `「不！不要啊！痛！不……不行……不要射在里面……啊啊啊！！」`,
      );
      await era.printAndWait(
        `${target_name}的肛穴被怪物凌虐着，腥臭的精液源源不断地灌进直肠深处的地方……`,
      );
    }
    return 0;
  }

  if (era_flag.selectcom == 51) {
    await era.printAndWait(`「身体……好……好热！……难道是……媚药？不！啊啊～」`);
    return 0;
  }

  return 0;
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
    return 0;
  }
  if (game.train.失神) {
    // TFLAG:899（跨域读走门面）
    return 0;
  }
  if (era0(`tequip:${target}:89`)) {
    await dog_kojo_15(rand_n); // CALL DOG_KOJO_15
    return 0;
  }
  if (era0(`tequip:${target}:55`)) {
    await colosseum_kojo_15(rand_n); // CALL COLOSSEUM_KOJO_15
    return 0;
  }

  if (era_flag.selectcom == 0) {
    if (kojo.爱抚 == 0) {
      if (era0(`mark:${target}:2`) >= 2) {
        await era.printAndWait(`「不……不要摸……唔……」`);
        await era.printAndWait(
          `${target_name}闭起眼睛，咬牙地忍耐着身体浮现的感觉……`,
        );
      } else {
        await era.printAndWait(`「这样触碰的话，除了恶心之外没有其他感觉。」`);
        await era.printAndWait(
          `${target_name}似乎很厌恶被触摸的样子，露出了嫌弃的表情……`,
        );
      }
      kojo.爱抚 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「啊……好…好舒服……这样子……摸的话…会…会很快高潮的…嗯…啊啊～♡」`,
            `「啊……嗯啊啊～身体好热……变得好想要了呢～♡」`,
          ][rand_n(2)],
        ); // PRINTDATAL
        await era.printAndWait(
          `${target_name}的眼角染上情欲的红晕，主动将身体贴近${player_name}了……`,
        );
        kojo.爱抚 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 == 2) &&
        !era_flag.assiplay
      ) {
        await era.print(
          [
            `「嗯……好…好舒服……请随意地……抚摸……嗯…啊啊～♡」`,
            `「啊……嗯啊啊～身体好热……好喜欢被这样子抚摸～♡」`,
          ][rand_n(2)],
        ); // PRINTDATAL
        await era.printAndWait(
          `${target_name}的双颊晕红，主动将身体贴近${player_name}了……`,
        );
        kojo.爱抚 = 5;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊！……啊……嗯啊！……这种感觉……唔！」`);
        await era.printAndWait(
          `${target_name}的脸颊带着可疑的红晕，似乎无法承受${player_name}的动作……`,
        );
        kojo.爱抚 = 4;
      } else if (
        era0(`mark:${target}:2`) == 2 &&
        (kojo.爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「不……就算是这样……也是没有用的……唔！」`);
        await era.printAndWait(
          `${target_name}咬紧牙关，转过头去忍耐着${player_name}的动作……`,
        );
        kojo.爱抚 = 3;
      } else if (
        era0(`mark:${target}:2`) <= 1 &&
        (kojo.爱抚 <= 1 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「住手！这么摸很恶心……不……」`,
            `「技术这么差！难道没有自觉吗？」`,
            `「一点也不舒服！可以劳驾您把脏手拿开吗？」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.printAndWait(`${target_name}皱着眉头，露出了厌恶的表情……`);
        kojo.爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 1) {
    if (kojo.舔阴 == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        await era.printAndWait(`「走…走开啊！这……这…真是不敢相信！」`);
        await era.printAndWait(
          `${target_name}似乎没想过会有人做出这种行为，露出了愤怒又觉得不可思议的表情……`,
        );
      } else {
        await era.printAndWait(`「不！居…居然……离${sc()}远点啊！走开！」`);
        await era.printAndWait(
          `${player_name}的行为让${target_name}羞愤异常地怒吼着……`,
        );
      }
      kojo.舔阴 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.舔阴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「里面……都……都湿答答的了……舌头……再……进去一点……啊啊～♡」`,
        );
        await era.printAndWait(
          `从下身传来的快感，让情欲高涨的${target_name}发出了淫荡的呻吟……`,
        );
        kojo.舔阴 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.舔阴 <= 3 || game.kojo.口上开关 == 2) &&
        !era_flag.assiplay
      ) {
        await era.printAndWait(
          `「这样…会…会流出来的呀…嗯……啊啊♡……真是坏心眼」`,
        );
        await era.printAndWait(
          `从下身传来的快感，让${target_name}不由自主地发出了动情的呻吟……`,
        );
        kojo.舔阴 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.舔阴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「唔！那…那个地方……不！不要……啊！啊啊！」`);
        await era.printAndWait(
          `从下身传来的羞耻感，让${target_name}面色通红地扭动着身体……`,
        );
        kojo.舔阴 = 3;
      } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 == 2) {
        await era.print(
          [
            `「恶心死了！滚开啊！」`,
            `「不要！可恶！走开啊！听不懂人话吗！」`,
            `「可恶！做的事情真是令人作呕！」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.printAndWait(`${target_name}羞愤异常地怒吼着……`);
        kojo.舔阴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 2) {
    if (kojo.肛门爱抚 == 0) {
      await era.printAndWait(`「你……你……在摸哪里？居然……不！……住手啊！」`);
      await era.printAndWait(
        `${target_name}先是呆愣了一下，后来马上羞愤地怒吼着……`,
      );
      kojo.肛门爱抚 = 1;
      return 0;
    } else {
      const P =
        (era.get(`palam:${target}:3`) || 0) +
        (era.get(`delta:${target}:3`) || 0); // PALAM:3 + UP:3
      if (
        era0(`talent:${target}:76`) == 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊！啊…不够…嗯……啊啊♡…还想要更多！快点！弄坏${sc()}吧♡♡…啊～♡」`,
        );
        await era.printAndWait(
          `${target_name}那湿润的后穴就像是调教好的性器，饥渴地收缩着，似乎想要被更巨大的东西侵犯……`,
        );
        kojo.肛门爱抚 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        P < PALAMLV[2] &&
        (kojo.肛门爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊！手指…再伸进来一点…嗯……啊啊♡……啊～♡」`);
        await era.printAndWait(
          `即使是尚未完全润滑好的后穴，也让${target_name}发出了淫荡的呻吟……`,
        );
        kojo.肛门爱抚 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 4 || game.kojo.口上开关 == 2) &&
        !era_flag.assiplay
      ) {
        await era.printAndWait(
          `「啊～在…里面搅动着♡…嗯……啊啊♡……别这样欺负${sc()}啊～♡」`,
        );
        await era.printAndWait(
          `从后孔传来的快感，让${target_name}不由自主地发出了动情的呻吟……`,
        );
        kojo.肛门爱抚 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        P < PALAMLV[2] &&
        (kojo.肛门爱抚 <= 3 || game.kojo.口上开关 == 2) &&
        !era_flag.assiplay
      ) {
        await era.printAndWait(
          `「虽然…里面还没有很湿……啊…这种感觉……好奇怪啊～♡」`,
        );
        await era.printAndWait(
          `即使是尚未完全润滑好的后穴，也似乎让${target_name}渐渐有了感觉……`,
        );
        kojo.肛门爱抚 = 4;
      } else if (
        P >= PALAMLV[2] &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.肛门爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「唔！那…那个地方……不！不要……啊！啊啊！」`);
        await era.printAndWait(
          `从下身传来的羞耻感，让${target_name}面色通红地扭动着身体……`,
        );
        kojo.肛门爱抚 = 3;
      } else if (kojo.首次耻情Lv2 <= 1 || game.kojo.口上开关 == 2) {
        // 源读 CFLAG:223，不是 303——1:1 保留
        await era.print(
          [
            `「恶心死了！这么喜欢屁股的话，不会摸你自己的吗！」`,
            `「不要！可恶！走开啊！听不懂人话吗！」`,
            `「可恶！做的事情真是令人作呕！」`,
            `「为何要摸这种地方？简直变态！」`,
            `「对这个地方有兴趣？真不愧是变态中的翘楚呢！」`,
          ][rand_n(5)],
        ); // PRINTDATAL
        await era.printAndWait(`${target_name}羞愤异常地怒吼着……`);
        kojo.肛门爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 3) {
    if (kojo.自慰 == 0) {
      await era.printAndWait(`「什……什么？真是不敢相信！怎么会有这种要求……」`);
      await era.printAndWait(`「看来魔界的字典是没有『羞耻』这两个字对吧？」`);
      await era.printAndWait(
        `「可恶！${sc()}……${sc()}……居然要……呜……嗯……唔……」`,
      );
      await era.printAndWait(
        `${target_name}笨拙地抚摸着自己的下身，露出了屈辱的表情……`,
      );
      kojo.自慰 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`talent:${target}:0`) == 1 &&
        (kojo.自慰 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「虽然还没开苞…但…但是……您看？这里……湿的不像样了♡…嗯啊…啊…啊啊♡♡！」`,
        );
        await era.printAndWait(
          `${target_name}明明还是处女，却淫荡豪放地张开了大腿……`,
        );
        kojo.自慰 = 9;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:31`) >= 3 &&
        (kojo.自慰 <= 7 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2)) {
          await era.printAndWait(
            `「被人看着自慰……真是太棒了♡…嗯啊…啊…啊啊♡♡！」`,
          );
        } else {
          await era.printAndWait(
            `「看啊！…这个…地方都不知廉耻地…流出蜜汁了♡…嗯啊…啊啊♡♡！」`,
          );
        }
        await era.printAndWait(
          `${target_name}深怕别人看不清楚自己发情的样子，夸张地张开了大腿并淫荡地呻吟着……`,
        );
        kojo.自慰 = 8;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:31`) < 3 &&
        (kojo.自慰 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2)) {
          await era.printAndWait(
            `「看见了吗？下面的样子♡嗯～啊啊～但是好像不够呢？想要……好想要啊啊♡♡！」`,
          );
        } else {
          await era.printAndWait(
            `「肉棒不进来吗？要${sc()}自己来什么的……真是坏心眼啊！唔！嗯嗯！啊啊啊♡♡！」`,
          );
        }
        await era.printAndWait(
          `${target_name}虽然想要的不是这个，但是还是听话地自慰了起来……`,
        );
        kojo.自慰 = 7;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`talent:${target}:0`) == 1 &&
        (kojo.自慰 <= 5 || game.kojo.口上开关 == 2) &&
        !era_flag.assiplay
      ) {
        await era.printAndWait(
          `「这……这么羞耻的样子…如果想看的话…嗯啊…啊…啊啊♡♡！」`,
        );
        await era.printAndWait(
          `${target_name}明明还是处女，却仍面红耳赤地张开了大腿……`,
        );
        kojo.自慰 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:31`) >= 3 &&
        (kojo.自慰 <= 4 || game.kojo.口上开关 == 2) &&
        !era_flag.assiplay
      ) {
        if (rand_n(2)) {
          await era.printAndWait(
            `「嗯～♡啊啊……看到了吗…已经这么湿……满手……都是♡♡……嗯啊～啊…啊啊♡♡！」`,
          );
        } else {
          await era.printAndWait(
            `「看……看清楚了吗……${sc()}……自慰着发情的样子♡♡……嗯啊～啊…啊啊♡♡！」`,
          );
        }
        await era.printAndWait(
          `${target_name}急促地喘息着，似乎沉醉在自慰的快感里面了……`,
        );
        kojo.自慰 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:31`) < 3 &&
        (kojo.自慰 <= 3 || game.kojo.口上开关 == 2) &&
        !era_flag.assiplay
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「就……就这么喜欢看…${sc()}……羞耻的样子吗？…嗯啊…啊…啊啊♡♡！」`,
          );
        } else {
          await era.printAndWait(
            `「这……这里…能看清楚吗？……可……可以吗……唔！啊啊！啊啊♡♡！」`,
          );
        }
        await era.printAndWait(
          `${target_name}虽然面红耳赤，但是还是柔顺地张开了大腿……`,
        );
        kojo.自慰 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:31`) >= 1 &&
        (kojo.自慰 <= 2 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「呜……不……这个样子……嗯…啊…啊啊！」`);
        } else {
          await era.printAndWait(`「不……为什么会…唔！……嗯…啊…啊啊！」`);
        }
        await era.printAndWait(
          `${target_name}似乎因为自慰而有了感觉，面红耳赤地闭起了眼睛……`,
        );
        kojo.自慰 = 3;
      } else if (kojo.自慰 <= 1 || game.kojo.口上开关 == 2) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「喜欢看这种事情？果然真是有病！嗯……唔！」`);
        } else {
          await era.printAndWait(
            `「无须劳烦您的尊驾，${sc()}自己来好多了！嗯……唔！」`,
          );
        }
        await era.printAndWait(
          `${target_name}一边不满地抗议，一边羞愤地进行着自慰……`,
        );
        kojo.自慰 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 5) {
    if (kojo.胸爱抚 == 0) {
      if (era0(`talent:${target}:85`) == 1 && !era_flag.assiplay) {
        await era.printAndWait(
          `「有…有点害羞……但是……很舒服……请再……再……嗯…啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}的耳根羞红，顺从地任由${player_name}的双手在胸部上游移……`,
        );
      } else {
        await era.printAndWait(
          `「这…这种痴汉似的举动……可真……配得上你的身份啊！……唔！」`,
        );
        await era.printAndWait(
          `${target_name}咬牙切齿地说着…只可惜那断断续续的语句早没有了威吓的效果……`,
        );
      }
      kojo.胸爱抚 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯…啊啊……好……好棒……再……用力……用力……嗯～啊啊♡♡！」`,
        );
        await era.printAndWait(
          `${target_name}那柔软的胸部被任意搓揉着，随着传来的快感发出了高亢的呻吟……`,
        );
        kojo.胸爱抚 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2) &&
        era_flag.assiplay
      ) {
        await era.printAndWait(`「嗯…啊啊……唔！……嗯……啊……」`);
        await era.printAndWait(
          `${target_name}在${master_name}的注视之下，被${player_name}玩弄着胸部……`,
        );
        await era.printAndWait(
          `尽管努力地忍耐着不想发出声音，但是无奈身体的快感太过强烈，还是泄露出来呻吟的声音……`,
        );
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯…啊啊……很…很舒服……嗯……想…还想要……嗯～啊啊♡♡！」`,
        );
        await era.printAndWait(
          `${target_name}满面红晕地看着${player_name}的动作，发出了急促的喘息……`,
        );
        kojo.胸爱抚 = 4;
      } else if (
        era0(`abl:${target}:1`) >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「不！不要再捏乳头了！会……唔～嗯……啊啊啊～」`,
            `「不！不要再揉胸部了！会……唔～嗯……啊啊啊～」`,
          ][rand_n(2)],
        ); // PRINTDATAL
        await era.print(
          [
            `${target_name}扭动着身体想要抵抗那异样的快感……`,
            `揉捏胸部似乎让${target_name}非常有感觉的样子……`,
          ][rand_n(2)],
        ); // PRINTDATAL
        kojo.胸爱抚 = 3;
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        await era.print(
          [
            `「不要！可恶！走开啊！听不懂人话吗！」`,
            `「可恶！做的事情真是令人作呕！」`,
            `「脏死了！不要碰${sc()}！」`,
            `「住手！恶心死了！」`,
          ][rand_n(4)],
        ); // PRINTDATAL
        await era.printAndWait(`${target_name}羞愤异常地怒吼着……`);
        kojo.胸爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 6) {
    if (kojo.接吻 == 0 && game.train.初吻与自我口上) {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era_flag.assiplay == 0 &&
        era0(`tequip:${target}:89`) == 0 &&
        era0(`tequip:${target}:90`) == 0
      ) {
        await era.printAndWait(
          `「啾！嗯～早就想跟主人接吻了～果然…主人是最棒的♡」`,
        );
        await era.printAndWait(
          `${target_name}像是意犹未尽的舔着嘴唇，但是眼神却游移地看着${player_name}，似乎还想要更『刺激』的东西……`,
        );
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era_flag.assiplay == 0 &&
        era0(`tequip:${target}:89`) == 0 &&
        era0(`tequip:${target}:90`) == 0
      ) {
        await era.printAndWait(
          `「啾！嗯～早就想跟主人接吻了～果然…真的好幸福呢♡」`,
        );
        await era.printAndWait(
          `${target_name}满足地眯起了眼睛，露出幸福的表情倚靠在${player_name}的身上……`,
        );
      } else {
        await era.printAndWait(`「嗯……不！…别……可恶！……恶……恶心！」`);
        await era.printAndWait(
          `${target_name}拼命地想把头转过去，然而下巴却被${player_name}紧紧捏住而无法躲避，就这样子被夺走了初吻……`,
        );
        await era.printAndWait(
          `「是不是没人想跟你接吻，所以只能用强迫的手段？真是卑劣！」`,
        );
        // 原作是一整行：无后缀 PRINTFORM 连续不换行，末行
        // PRINTFORMW 才收行。:759 的 SIF !TEQUIP:44 只护住 :760 那一段——
        // 判据提到语句外当取值，文本留在输出语句里（#625）
        const wiped = !era0(`tequip:${target}:44`);
        await era.printAndWait(
          `${target_name}` +
            (wiped
              ? '像擦拭什么脏东西那样，用力地用手模擦着自己的嘴唇，'
              : '') +
            `恼怒地说着挑衅着话语……`,
        );
      }
      kojo.接吻 = 1;
      return 0;
    } else if (kojo.接吻 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「嗯…咕啾…啊啊…舌……舌头♡……嗯……好…好棒～嗯啊♡♡」`,
        );
        await era.printAndWait(
          `${target_name}任由${player_name}的舌头深入口腔中肆虐，激烈的亲吻让银丝从嘴角流下……`,
        );
      } else if (era0(`talent:${target}:85`) == 1 && era_flag.assiplay) {
        await era.printAndWait(`「如果……这是主人……的命令…唔…唔…嗯…嗯」`);
        await era.printAndWait(`${target_name}顺从与${player_name}亲吻着……`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「嗯……啊……嗯嗯～啾♡～啊～嘻嘻…好高兴…♡♡」`);
        await era.printAndWait(
          `${target_name}面带红晕，高兴地眯起了眼睛，沉醉在与${player_name}的亲吻之中……`,
        );
      } else {
        await era.printAndWait(`「谁要跟你这种……唔！…不……唔……」`);
        await era.printAndWait(
          `${target_name}非常抗拒${player_name}亲吻的样子……`,
        );
      }
      kojo.接吻 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.接吻 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯～啊………好……好棒♡……还……还要……啾～咕啾～嗯…～嗯啊♡♡」`,
        );
        if (era0(`tequip:${target}:44`)) {
          await era.printAndWait(
            `${target_name}积极地伸出舌头与${player_name}交缠着，饥渴地与对方交换着唾液……`,
          );
        } else {
          await era.printAndWait(
            `${target_name}积极地伸出舌头与${player_name}交缠着，双手在对方身上激烈的抚弄着……`,
          );
        }
        kojo.接吻 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.接吻 <= 3 || game.kojo.口上开关 == 2) &&
        era_flag.assiplay
      ) {
        await era.printAndWait(`「嗯…啊…这……唔……啾……唔…」`);
        await era.printAndWait(`（这样子做……主人会开心吗……？）`);
        await era.printAndWait(
          `${target_name}心神不宁地想着${master_name}的事情，顺从与${player_name}亲吻着……`,
        );
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.接吻 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯…啊……喜……喜欢♡……啾……好……幸福♡♡……」`);
        await era.printAndWait(
          `${target_name}闭上眼睛柔顺地迎合着${player_name}的亲吻。`,
        );
        await era.printAndWait(
          `同时像是挑逗一样伸出了舌尖试探，两人像是怎样都亲吻不够似地热吻着……`,
        );
        kojo.接吻 = 4;
      } else if (
        era0(`abl:${target}:10`) >= 2 &&
        (kojo.接吻 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「唔……嗯嗯……算了………嗯……」`);
        await era.printAndWait(
          `${target_name}像是放弃了抵抗，皱着眉头忍受着${player_name}的亲吻……`,
        );
        kojo.接吻 = 3;
      } else if (kojo.接吻 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「居然……又……唔！…不…不要……」`);
        await era.printAndWait(`${target_name}露出了厌恶至极的表情……`);
        kojo.接吻 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 7) {
    if (kojo.自己扒开 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「嗯？很想看吗？可以哦♡」`);
        await era.printAndWait(
          `${target_name}积极地用手指拨开着阴唇，大方地展示着那最私密的地方……`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「虽然很羞耻……但是……如果是魔王大人想看的话……」`,
        );
        await era.printAndWait(
          `${target_name}的耳根通红，顺从地用手指拨开着阴唇，展示着那最私密的地方……`,
        );
      } else {
        await era.printAndWait(`「居……居然……让${sc()}……做这种事情……可恶！」`);
        await era.printAndWait(
          `${target_name}不甘愿且笨拙地用手指拨开了自己下身的阴唇……`,
        );
      }
      kojo.自己扒开 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.自己扒开 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯……这样……有看清楚里面吗？……啊…在收缩着哦♡…很想要的样子……嘿嘿♡♡」`,
        );
        await era.printAndWait(
          `${target_name}积极地用手指拨开着阴唇，让${player_name}完全看清处里面肉壁收缩着的样子……`,
        );
        kojo.胸爱抚 = 5; // 源误写 CFLAG:306
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.自己扒开 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯……请…请看吧……这个姿势能看清楚吗……嗯～嗯啊♡♡」`,
        );
        await era.printAndWait(
          `${target_name}顺从地用手指拨开着阴唇，让${player_name}完全看清处里面肉壁收缩着的样子……`,
        );
        kojo.胸爱抚 = 4; // 源误写 CFLAG:306
      } else if (
        era0(`abl:${target}:17`) >= 3 &&
        (kojo.自己扒开 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯……不……再这样盯着看……会……唔！」`);
        await era.printAndWait(`（明明……不想要这样的，这…这种奇怪的感觉……）`);
        await era.printAndWait(
          `感受到视线集中到那私密的地方的时候，${target_name}似乎有了特别的感觉……`,
        );
        kojo.胸爱抚 = 3; // 源误写 CFLAG:306
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        // 源读 CFLAG:306
        await era.printAndWait(`「这样……够了吧！别……别再看了！」`);
        await era.printAndWait(
          `${target_name}羞愤地转过了头去，那拨开阴唇的手指正微微地颤抖着……`,
        );
        kojo.胸爱抚 = 2; // 源误写 CFLAG:306
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 8) {
    if (kojo.插入手指 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`talent:${target}:85`) == 1
      ) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      kojo.插入手指 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.插入手指 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.插入手指 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`mark:${target}:2`) == 3 &&
        (kojo.插入手指 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.插入手指 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.插入手指 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.插入手指 = 3;
      } else if (kojo.插入手指 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        kojo.插入手指 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 9) {
    if (kojo.舔肛 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      kojo.舔肛 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.舔肛 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.舔肛 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.舔肛 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.舔肛 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.舔肛 = 3;
      } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        kojo.舔肛 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 10) {
    if (kojo.振动宝石 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`talent:${target}:85`) == 1
      ) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      kojo.振动宝石 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.振动宝石 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.振动宝石 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`mark:${target}:2`) == 3 &&
        (kojo.振动宝石 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.振动宝石 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.振动宝石 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.振动宝石 = 3;
      } else if (kojo.振动宝石 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        kojo.振动宝石 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 11 && era0(`tequip:${target}:11`)) {
    if (kojo.壶虫 == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「嗯…啊……啊……钻…钻进来了呢♡♡……啊……啊啊…嗯…～嗯啊♡♡」`,
          );
          await era.printAndWait(
            `${target_name}毫不介意自己被壶虫所破处，甚至还发出了欢愉的呻吟……`,
          );
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「主人不想要${sc()}的处女吗？……唔……${sc()}明白了…嗯……啊啊……」`,
          );
          await era.printAndWait(
            `${target_name}似乎有点失望的样子，但还是顺从地任由壶虫钻入了那处女的小穴之中……`,
          );
        } else {
          await era.printAndWait(
            `「居…居然让这么脏的东西…不！不要再钻进去了！啊！啊啊啊！！」`,
          );
          await era.printAndWait(
            `被壶虫破处的${target_name}难以置信地张大双眼，发出了凄厉的悲鸣……`,
          );
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「哈啊～嗯…啊……啊～在…在里面动呢♡……啊！…钻得…好深♡……～嗯啊啊♡♡」`,
          );
          await era.printAndWait(
            `${target_name}满脸带着情欲的红晕，似乎很享受壶虫带来的快感……`,
          );
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「嗯～唔……不……不要用这个……欺负${sc()}嘛……唔……啊～嗯啊啊♡♡」`,
          );
          await era.printAndWait(
            `尽管${target_name}看似不太愿意的样子，但是那身体似乎已经感到了快感……`,
          );
        } else {
          await era.printAndWait(
            `「居…居然让这么脏的东西…不！不要再钻进去了！啊！啊啊啊！！」`,
          );
          await era.printAndWait(
            `${target_name}难以置信地张大双眼，发出了凄厉的悲鸣……`,
          );
        }
      }
      kojo.壶虫 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.壶虫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊～嗯啊……好…好棒……看…看见了吗？钻进去了喔♡～呵呵♡♡」`,
        );
        await era.printAndWait(
          `${target_name}像是发情地呻吟着，下身也因为壶虫的进出与小穴肉壁的摩擦，不停地发出淫糜的水音……`,
        );
        kojo.壶虫 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.壶虫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊～进…进来了…不……不可以…钻这么深啊…啊啊♡」`);
        await era.printAndWait(
          `${target_name}面色红晕地喘息着，下身也因为壶虫的进出与小穴肉壁的摩擦，不停地发出淫糜的水音……`,
        );
        kojo.壶虫 = 4;
      } else if (
        era0(`abl:${target}:2`) >= 3 &&
        (kojo.壶虫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊…哈啊……不…不行！里面会……嗯啊…啊啊啊～」`);
        await era.printAndWait(
          `${target_name}似乎想要抗拒壶虫带来的感觉，扭动着身体也无法阻止那从小穴发出的淫糜水音……`,
        );
        kojo.壶虫 = 3;
      } else if (kojo.壶虫 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「不……不要虫子！拿…拿走啊！唔……啊…啊啊！！」`);
        await era.printAndWait(
          `即使${target_name}拼命地挣扎，还是被硬生生地被${player_name}掰开了大腿，任由壶虫钻了进去……`,
        );
        kojo.壶虫 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 11 && era0(`tequip:${target}:11`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.壶虫着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `随着壶虫的拔除，带着透明的淫丝牵连带出，一股股蜜液正从那小穴流出打湿了大腿……`,
      );
      await era.printAndWait(
        `「嗯啊啊～拔出来了呢♡……总觉得……有点……寂寞呢♡♡？」`,
      );
      await era.printAndWait(
        `${target_name}喘息着沉浸在壶虫带来的余韵之中，大腿像是故意那样地张开展示着……`,
      );
      kojo.壶虫着脱 = 3;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.壶虫着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `随着壶虫的拔除，带着透明的淫丝牵连带出，一股股蜜液正从那小穴流出打湿了大腿……`,
      );
      await era.printAndWait(
        `「这…是因为太想要主人了……所以…抱…抱歉……擅自流出…这么多……呜」`,
      );
      await era.printAndWait(
        `${target_name}满脸羞红，拼命地想要解释下身为何如此不像话的样子……`,
      );
      kojo.壶虫着脱 = 2;
    } else if (kojo.壶虫着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「呜……终于……」`);
      await era.printAndWait(
        `${target_name}松了一口气，身体仍带着刺激过后的颤抖……`,
      );
      kojo.壶虫着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 12) {
    if (kojo.振动杖 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「这个道具看起来真刺激……好…好有趣啊！嗯啊♡…啊……啊啊～♡♡」`,
        );
        await era.printAndWait(
          `${target_name}用期待的眼神看着${player_name}手中的道具，相当配合地任由摆弄……`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「这个道具是？啊！……震…震的好厉害啊！嗯啊♡…啊……啊啊～♡♡」`,
        );
        await era.printAndWait(
          `${target_name}顺从地任由${player_name}摆弄着……`,
        );
      } else {
        await era.printAndWait(
          `「哼！借助道具？这就是你的本事吗？不！拿…拿开啊……啊…啊啊！」`,
        );
        await era.printAndWait(
          `无视${target_name}的冷嘲热讽与抗议，${player_name}将振动着的道具紧贴着${target_name}的股间……`,
        );
      }
      kojo.振动杖 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.振动杖 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊！这…好有感觉……再这样……这里就要♡……嗯啊♡……啊啊～♡♡」`,
        );
        kojo.振动杖 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.振动杖 <= 3 || game.kojo.口上开关 == 2) &&
        !era_flag.assiplay
      ) {
        await era.printAndWait(
          `「就算不用道具…只要对象是魔王大人…${sc()}…${sc()}也会…嗯啊♡……啊啊～♡♡」`,
        );
        kojo.振动杖 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.振动杖 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「唔！嗯……嗯啊…不……呀！……啊…啊啊！」`);
        kojo.振动杖 = 3;
      } else if (kojo.振动杖 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「不！拿…拿开啊！不要再震了……啊…啊啊！」`);
        kojo.振动杖 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 13 && era0(`tequip:${target}:13`)) {
    if (kojo.肛门虫 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「让虫子进来？没试过呢～可以哦♡………嗯……啊啊～♡♡」`,
        );
        await era.printAndWait(
          `${target_name}似乎很感兴趣的样子，迫不及待地掰开了臀瓣配合着……`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「为何……要用虫子欺负这里…好…好奇怪啊…嗯……啊啊！」`,
        );
        await era.printAndWait(
          `尽管${target_name}似乎有点紧张，但是还是听话顺从地配合着……`,
        );
      } else {
        await era.printAndWait(
          `「什么？如此肮脏的虫子要……不……拜托……不要这样…啊！不行！不要啊！！」`,
        );
        await era.printAndWait(
          `尽管${target_name}惊恐地挣扎着，但是还是被压制住并塞入了肛门虫……`,
        );
        await era.printAndWait(
          `那虫子在肠内蠕动的感觉，让${target_name}发出了歇斯底里的悲鸣……`,
        );
      }
      kojo.肛门虫 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯～啊啊……宝贝♡好…好乖啊……在里面钻着呢♡呵呵～嗯…啊…啊啊～♡♡」`,
        );
        await era.printAndWait(
          `${target_name}沉迷在肛门虫带来的快感，满足地抚摸着屁股并发出了动情的呻吟……`,
        );
        kojo.肛门虫 = 6;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.肛门虫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「又要用这个来欺负${sc()}吗？呵呵～真坏……嗯…啊…啊啊～♡♡」`,
        );
        await era.printAndWait(
          `${target_name}熟练地拨开臀瓣，积极地迎接着肛门虫的进入……`,
        );
        kojo.肛门虫 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯～啊啊…抱…抱歉……屁股擅自就有了感觉♡但…但是……嗯…啊…啊啊～♡♡」`,
        );
        await era.printAndWait(
          `屁股正被肛门虫侵犯的${target_name}想试着解释些什么，但是都被那欢愉的呻吟打断了……`,
        );
        kojo.肛门虫 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.肛门虫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「比…比起这个……${sc()}……比较喜欢魔王大人的……唔…嗯…啊…啊啊～♡♡」`,
        );
        await era.printAndWait(
          `即使屁股正在被肛门虫侵犯着，${target_name}仍断断续续地试着表达对魔王的爱意……`,
        );
        kojo.肛门虫 = 4;
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「不……别……嗯啊啊！里面……嗯…啊啊！」`);
        await era.printAndWait(
          `从后穴里面传来的异样快感，让${target_name}皱着眉头发出了断断续续的呻吟……`,
        );
        kojo.肛门虫 = 3;
      } else if (kojo.肛门虫 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「不…不要虫子……拜托……不…不要啊！！」`);
        await era.printAndWait(
          `从后穴里面传来的异物感以及蠕动感，让${target_name}发出了惊恐的悲鸣……`,
        );
        kojo.肛门虫 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 13 && era0(`tequip:${target}:13`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.肛门虫着脱 < 4 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「欸……要拿走了吗？」`);
      await era.printAndWait(`${target_name}露出了有点不舍的表情……`);
      kojo.肛门虫着脱 = 4;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.肛门虫着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「啊！等等……不……没事……」`);
      await era.printAndWait(
        `当${player_name}移除肛门虫之后，${target_name}似乎欲言又止的样子……`,
      );
      kojo.肛门虫着脱 = 3;
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.肛门虫着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「唔……终于……」`);
      await era.printAndWait(
        `虽然移除肛门虫让${target_name}松了口气，但是后穴又隐隐传来了空虚的感觉……`,
      );
      kojo.肛门虫着脱 = 2;
    } else if (kojo.肛门虫着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「呼……呜……」`);
      await era.printAndWait(
        `移除了让${target_name}抓狂的肛门虫之后，那过度的刺激让他心有余悸地颤抖着……`,
      );
      kojo.肛门虫着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 19 && era0(`tequip:${target}:19`)) {
    if (kojo.肛珠 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「这个？要塞进屁股吗？呵呵～真有意思呢……嗯……好啊～♡」`,
        );
        await era.printAndWait(
          `${target_name}饶有兴致地看着肛珠，主动地拨开了自己的臀瓣……`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「欸？这个……要塞进去……好……${sc()}……知道了……」`);
        await era.printAndWait(
          `${target_name}似乎有点紧张，但仍然顺从地配合着${player_name}的动作……`,
        );
      } else {
        await era.printAndWait(
          `「这个癖好也太恶心了……为什么要用道具玩弄这个地方……呜」`,
        );
        await era.printAndWait(
          `${target_name}惊怒地挣扎着，但是即使激烈抵抗，那肛珠还是一颗颗地塞入了体内……`,
        );
      }
      kojo.肛珠 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯…哈啊～里面…塞的满满的喔♡真的好舒服呢～…嗯…啊…啊啊～♡♡」`,
        );
        await era.printAndWait(
          `${target_name}发出动情的浪叫，沉醉在肛珠带来的快感之中。`,
        );
        kojo.肛珠 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.肛珠 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「道具啊～嗯……那就来吧……啊～再…再放进去一点嘛～♡」`,
        );
        await era.printAndWait(
          `${target_name}积极地拨开自己的臀瓣，配合着${player_name}的动作……`,
        );
        kojo.肛珠 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 4 || game.kojo.口上开关 == 2) &&
        !era_flag.assiplay
      ) {
        await era.printAndWait(
          `「嗯…啊啊～区区…道具…是比不上魔王大人的！…嗯…啊…啊啊～♡♡」`,
        );
        await era.printAndWait(
          `尽管${target_name}这么说着，但是那扭动的身体与发出的呻吟，怎么看都像是很有感觉的样子……`,
        );
        kojo.肛珠 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.肛珠 <= 3 || game.kojo.口上开关 == 2) &&
        !era_flag.assiplay
      ) {
        await era.printAndWait(
          `「怎么就喜欢用道具欺负${sc()}呢……真拿魔王大人没办法……」`,
        );
        await era.printAndWait(
          `${target_name}尽管这么说，但仍然顺从地配合着${player_name}的动作……`,
        );
        kojo.肛珠 = 4;
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「不…不……才…才没有感觉呢…呜……可恶……啊…」`);
        await era.printAndWait(
          `${target_name}说着拒绝以及讨厌的话，但是那扭动的身体却似乎已经背叛了意志产生了快感……`,
        );
        kojo.肛珠 = 3;
      } else if (kojo.肛珠 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「就……就算用这种方式折辱${sc()}……${sc()}也……唔！……可恶……」`,
        );
        await era.printAndWait(
          `即使${target_name}厌恶地挣扎着，那肛珠依然一颗颗地塞入了体内……`,
        );
        kojo.肛珠 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 19 && era0(`tequip:${target}:19`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.肛珠着脱 < 4 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `随着肛珠一颗颗的拔出，${target_name}发出难忍的呻吟……`,
      );
      await era.printAndWait(`「等等可以放更『大』的东西进来吗？呵呵♡」`);
      await era.printAndWait(
        `${target_name}轻轻地抚摸着自己的屁股，意犹未尽地询问着……`,
      );
      kojo.肛珠着脱 = 4;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.肛珠着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `随着肛珠一颗颗的拔出，${target_name}发出难忍的呻吟……`,
      );
      await era.printAndWait(`「这种道具……还是比不上……魔王大人的……」`);
      await era.printAndWait(
        `${target_name}面色微红抚摸着自己的屁股，说出了心中的感想……`,
      );
      kojo.肛珠着脱 = 3;
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.肛珠着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「唔……终于……」`);
      await era.printAndWait(
        `虽然移除肛珠让${target_name}松了口气，但是后穴又隐隐传来了空虚的感觉……`,
      );
      kojo.肛珠着脱 = 2;
    } else if (kojo.肛珠着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「………唔」`);
      await era.printAndWait(
        `${target_name}呼出了一口气，放开了已经紧握到发白的掌心……`,
      );
      kojo.肛珠着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 20) {
    if (kojo.正常位 == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「呵呵～终于能摆脱处女了呢……好期待哦……快点来呀～♡♡」`,
          );
          await era.printAndWait(
            `${target_name}迫不及待地搂住了${player_name}的脖子，主动将身体靠进过去……`,
          );
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          era0(`abl:${target}:10`) >= 5 &&
          !era_flag.assiplay
        ) {
          await era.printAndWait(
            `「能…能够将第一次献给魔王大人，真的，真的非常地开心…」`,
          );
          await era.printAndWait(
            `「听说第一次都会很痛的样子，但是，是魔王大人的话……」`,
          );
          await era.printAndWait(
            `「就算是疼痛，也一定会被幸福感覆盖过去的呢……」`,
          );
          await era.printAndWait(
            `${target_name}露出信任的笑容，伸手主动搂住了${player_name}的脖子……`,
          );
        } else {
          await era.printAndWait(
            `「不！第一次居然…要跟你这种……不！…走！走开啊！啊啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}惊怒地拼命挣扎着，但是还是无法抵抗${player_name}的侵犯……`,
          );
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「呵呵…让${sc()}看看你的技巧如何吧？……快点进来啊～♡」`,
          );
        } else if (era0(`talent:${target}:85`) == 1) {
          if (era_flag.assiplay) {
            await era.printAndWait(
              `「如果……魔王大人想要观赏的话……那么…请…请……」`,
            );
            await era.printAndWait(
              `${target_name}低垂的睫毛掩盖了神情，顺从地接受了${player_name}的进入……`,
            );
          } else {
            await era.printAndWait(`「这样可以看清楚魔王大人的表情呢……」`);
            await era.printAndWait(`「感觉……好幸福又有点害羞……♡」`);
            await era.printAndWait(
              `${target_name}脸颊晕红地露出了幸福的微笑……`,
            );
          }
        } else {
          await era.printAndWait(
            `「不！谁要跟你做这种……不！…走！走开啊！啊啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}惊怒地拼命挣扎着，但是还是无法抵抗${player_name}的侵犯……`,
          );
        }
      }
      kojo.正常位 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.正常位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「果然……这种快感……是最……最棒的了♡嗯…嗯啊啊啊～♡♡」`,
            `「还……还要啊！……唔……好……好棒……快……快点啊♡嗯…嗯啊啊啊～♡♡」`,
            `「可…可以射在里面哦♡…想…想要……满满的……精液♡嗯…嗯啊啊啊～♡♡」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.printAndWait(
          `${target_name}淫荡地扭动着腰部，正因快感而不知廉耻地浪叫着……`,
        );
        kojo.正常位 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.正常位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (era_flag.assiplay) {
          await era.printAndWait(
            `「嗯……啊啊～进……进来了……${player_name}的…那里不行……嗯啊～♡」`,
          );
          await era.printAndWait(`（明明不是魔王大人……${sc()}……${sc()}却………）`);
          await era.printAndWait(
            `${target_name}脑子想着魔王大人的事情，身体却和${player_name}紧紧交合着……`,
          );
        } else {
          await era.print(
            [
              `「好……好厉害……还……还想要……嗯…嗯啊啊啊～♡♡」`,
              `「想要……魔王大人的孩子…请……请射在里面吧？…嗯…啊啊啊～♡♡」`,
              `「这里是…属于魔王大人的……请…请打上精液的印记～♡♡」`,
            ][rand_n(3)],
          ); // PRINTDATAL
          await era.print(
            [
              `${target_name}被心爱的魔王大人拥抱，不自觉地说着肉麻的情话……`,
              `能跟心爱的魔王大人交合，${target_name}露出了幸福无比的笑容……`,
              `${target_name}带着崇敬又爱慕的眼神，不停地对${player_name}倾诉着爱语……`,
            ][rand_n(3)],
          ); // PRINTDATAL
        }
        kojo.正常位 = 5;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (kojo.正常位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「好…好奇怪……再这样动会……唔！嗯……啊…啊啊啊！」`,
            `「太……太深了……这……这是什么！唔！……啊…啊啊啊！」`,
            `「明明……不想要的……但……但是……啊…啊啊啊！」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.print(
          [
            `${target_name}脸上带着异样的嫣红，似乎渐渐从性交中得到了快感……`,
            `${target_name}像是在忍耐着什么一样，渐渐发出了断断续续的呻吟……`,
            `身体的快感背叛了${target_name}的意志，让他不由自主地发出了呻吟……`,
          ][rand_n(3)],
        ); // PRINTDATAL
        kojo.正常位 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.正常位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「不…不要……再这样动会……唔！嗯……啊…啊啊啊！」`,
            `「太……太深了……不……不行！嗯……啊…啊啊啊！」`,
            `「停……停下来啊……不……不要这样……啊…啊啊啊！」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        kojo.正常位 = 3;
      } else if (kojo.正常位 <= 1 || game.kojo.口上开关 == 2) {
        await era.print(
          [
            `「不！不要…放开${sc()}！出去！拔出去啊！…啊……啊啊！」`,
            `「这种侵犯很有意思吗？混……混帐…！不！不要啊！！」`,
            `「不！不要过来！唔！啊啊！不行……啊啊啊！！」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.print(
          [
            `${target_name}发出了凄惨的悲鸣……`,
            `挣扎无用的${target_name}流下了屈辱的泪水……`,
            `即使${target_name}死命的挣扎，也无法改变被侵犯的事实……`,
          ][rand_n(3)],
        ); // PRINTDATAL
        kojo.正常位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 21) {
    if (kojo.背后位 == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「呵呵～终于能摆脱处女了呢……好期待哦……快点来呀～♡♡」`,
          );
          await era.printAndWait(
            `${target_name}露出了迫不及待的表情，主动地拨开了自己的臀瓣……`,
          );
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          era0(`abl:${target}:10`) >= 5 &&
          !era_flag.assiplay
        ) {
          await era.printAndWait(
            `「能…能够将第一次献给魔王大人，真的，真的非常地开心…」`,
          );
          await era.printAndWait(
            `「听说第一次都会很痛的样子，但是，是魔王大人的话……」`,
          );
          await era.printAndWait(
            `「就算是疼痛，也一定会被幸福感覆盖过去的呢……」`,
          );
          await era.printAndWait(
            `${target_name}露出信任的笑容，主动地拨开了自己的臀瓣……`,
          );
        } else {
          await era.printAndWait(
            `「不！第一次居然…要跟你这种……不！…走！走开啊！啊啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}惊怒地拼命挣扎着，但是还是无法抵抗${player_name}的侵犯……`,
          );
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「呵呵…用这个姿势好刺激呢……快点进来啊～♡」`);
        } else if (era0(`talent:${target}:85`) == 1) {
          if (era_flag.assiplay) {
            await era.printAndWait(`「用……用这个姿势吗？…好…好的……那么……」`);
            await era.printAndWait(
              `（这体位……看不见脸……就把对方当成魔王大人吧……）`,
            );
            await era.printAndWait(
              `${target_name}低垂的睫毛掩盖了神情，顺从地接受了${player_name}的进入……`,
            );
          } else {
            await era.printAndWait(`「这样看不见魔王大人的表情呢……」`);
            await era.printAndWait(
              `「但是，这姿势似乎……可以进得很深的样子……♡」`,
            );
            await era.printAndWait(
              `${target_name}脸颊晕红地露出了幸福的微笑……`,
            );
          }
        } else {
          await era.printAndWait(
            `「不！谁要跟你做这种……不！…走！走开啊！啊啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}惊怒地拼命挣扎着，但是还是无法抵抗${player_name}的侵犯……`,
          );
        }
      }
      kojo.背后位 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「果然……从后面来……是最……最深的了♡嗯…嗯啊啊啊～♡♡」`,
            `「还……还要啊！……唔……好……好棒……快……快点啊♡嗯…嗯啊啊啊～♡♡」`,
            `「可…可以射在里面哦♡…想…想要……满满的……精液♡嗯…嗯啊啊啊～♡♡」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.printAndWait(
          `${target_name}淫荡地扭动着腰部，正因快感而不知廉耻地浪叫着……`,
        );
        kojo.背后位 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.背后位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (era_flag.assiplay) {
          await era.printAndWait(
            `「嗯……啊啊～从后面……进……进来了……${player_name}的………嗯啊～♡」`,
          );
          await era.printAndWait(
            `（这……这不是魔王大人……${sc()}……${sc()}不可以………）`,
          );
          await era.printAndWait(
            `${target_name}脑子想着魔王大人的事情，身体却和${player_name}紧紧交合着……`,
          );
        } else {
          await era.print(
            [
              `「好……好厉害……还……还想要……嗯…嗯啊啊啊～♡♡」`,
              `「想要……魔王大人的孩子…请……请射在里面吧？…嗯…啊啊啊～♡♡」`,
              `「这里是…属于魔王大人的……请…请打上精液的印记～♡♡」`,
            ][rand_n(3)],
          ); // PRINTDATAL
          await era.print(
            [
              `${target_name}被心爱的魔王大人拥抱，不自觉地说着肉麻的情话……`,
              `能跟心爱的魔王大人交合，${target_name}露出了幸福无比的笑容……`,
              `${target_name}带着崇敬又爱慕的眼神，不停地对${player_name}倾诉着爱语……`,
            ][rand_n(3)],
          ); // PRINTDATAL
        }
        kojo.背后位 = 5;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「好…好奇怪……再这样动会……唔！嗯……啊…啊啊啊！」`,
            `「太……太深了……这……这是什么！唔！……啊…啊啊啊！」`,
            `「明明……不想要的……但……但是……啊…啊啊啊！」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.print(
          [
            `${target_name}脸上带着异样的嫣红，似乎渐渐从性交中得到了快感……`,
            `${target_name}像是在忍耐着什么一样，渐渐发出了断断续续的呻吟……`,
            `身体的快感背叛了${target_name}的意志，让他不由自主地发出了呻吟……`,
          ][rand_n(3)],
        ); // PRINTDATAL
        kojo.背后位 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「不…不要……再这样动会……唔！嗯……啊…啊啊啊！」`,
            `「太……太深了……不……不行！嗯……啊…啊啊啊！」`,
            `「停……停下来啊……不……不要这样……啊…啊啊啊！」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        kojo.背后位 = 3;
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 == 2) {
        await era.print(
          [
            `「不！不要…放开${sc()}！出去！拔出去啊！…啊……啊啊！」`,
            `「这种侵犯很有意思吗？混……混帐…！不！不要啊！！」`,
            `「不！不要过来！唔！啊啊！不行……啊啊啊！！」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.print(
          [
            `${target_name}发出了凄惨的悲鸣……`,
            `挣扎无用的${target_name}流下了屈辱的泪水……`,
            `即使${target_name}死命的挣扎，也无法改变被侵犯的事实……`,
          ][rand_n(3)],
        ); // PRINTDATAL
        kojo.背后位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 22) {
    if (kojo.对面座位 == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「呵呵～终于能摆脱处女了呢……好期待哦……快点来呀～♡♡」`,
          );
          await era.printAndWait(
            `${target_name}迫不及待地搂住了${player_name}的脖子，主动将身体靠进过去……`,
          );
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          era0(`abl:${target}:10`) >= 5 &&
          !era_flag.assiplay
        ) {
          await era.printAndWait(
            `「能…能够将第一次献给魔王大人，真的，真的非常地开心…」`,
          );
          await era.printAndWait(
            `「听说第一次都会很痛的样子，但是，是魔王大人的话……」`,
          );
          await era.printAndWait(
            `「就算是疼痛，也一定会被幸福感覆盖过去的呢……」`,
          );
          await era.printAndWait(
            `${target_name}露出信任的笑容，伸手主动搂住了${player_name}的脖子……`,
          );
        } else {
          await era.printAndWait(
            `「不！第一次居然…要跟你这种……不！…走！走开啊！啊啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}惊怒地拼命挣扎着，但是还是无法抵抗${player_name}的侵犯……`,
          );
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「呵呵…这样抱着两人贴得很紧呢♡……快点进来啊～♡」`,
          );
        } else if (era0(`talent:${target}:85`) == 1) {
          if (era_flag.assiplay) {
            await era.printAndWait(`「这都是为了……魔王大人…所以…所以…请……」`);
            await era.printAndWait(
              `${target_name}低垂的睫毛掩盖了神情，顺从地接受了${player_name}的进入……`,
            );
          } else {
            await era.printAndWait(
              `「这样被抱着可以看清楚魔王大人的表情呢……」`,
            );
            await era.printAndWait(`「感觉……好幸福又有点害羞……♡」`);
            await era.printAndWait(
              `${target_name}脸颊晕红地露出了幸福的微笑……`,
            );
          }
        } else {
          await era.printAndWait(
            `「不！放手！你想要做什么……不！…走！走开啊！啊啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}惊怒地拼命挣扎着，但是还是无法抵抗${player_name}的侵犯……`,
          );
        }
      }
      kojo.对面座位 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.对面座位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「果然……这种快感……是最……最棒的了♡嗯…嗯啊啊啊～♡♡」`,
            `「还……还要啊！……唔……好……好棒……快……快点啊♡嗯…嗯啊啊啊～♡♡」`,
            `「可…可以射在里面哦♡…想…想要……满满的……精液♡嗯…嗯啊啊啊～♡♡」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.printAndWait(
          `${target_name}淫荡地扭动着腰部，正因快感而不知廉耻地浪叫着……`,
        );
        kojo.对面座位 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.对面座位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (era_flag.assiplay) {
          await era.printAndWait(
            `「嗯……啊啊～顶……顶进来了……${player_name}的…不……嗯啊～♡」`,
          );
          await era.printAndWait(`（明明不是魔王大人……${sc()}……${sc()}却………）`);
          await era.printAndWait(
            `${target_name}脑子想着魔王大人的事情，身体却和${player_name}紧紧交合着……`,
          );
        } else {
          await era.print(
            [
              `「好……好厉害……还……还想要……嗯…嗯啊啊啊～♡♡」`,
              `「想要……魔王大人的孩子…请……请射在里面吧？…嗯…啊啊啊～♡♡」`,
              `「这里是…属于魔王大人的……请…请打上精液的印记～♡♡」`,
            ][rand_n(3)],
          ); // PRINTDATAL
          await era.print(
            [
              `${target_name}被心爱的魔王大人拥抱，不自觉地说着肉麻的情话……`,
              `能跟心爱的魔王大人交合，${target_name}露出了幸福无比的笑容……`,
              `${target_name}带着崇敬又爱慕的眼神，不停地对${player_name}倾诉着爱语……`,
            ][rand_n(3)],
          ); // PRINTDATAL
        }
        kojo.对面座位 = 5;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (kojo.对面座位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「好…好奇怪……再这样动会……唔！嗯……啊…啊啊啊！」`,
            `「太……太深了……这……这是什么！唔！……啊…啊啊啊！」`,
            `「明明……不想要的……但……但是……啊…啊啊啊！」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.print(
          [
            `${target_name}脸上带着异样的嫣红，似乎渐渐从性交中得到了快感……`,
            `${target_name}像是在忍耐着什么一样，渐渐发出了断断续续的呻吟……`,
            `身体的快感背叛了${target_name}的意志，让他不由自主地发出了呻吟……`,
          ][rand_n(3)],
        ); // PRINTDATAL
        kojo.对面座位 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.对面座位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「不…不要……再这样动会……唔！嗯……啊…啊啊啊！」`,
            `「太……太深了……不……不行！嗯……啊…啊啊啊！」`,
            `「停……停下来啊……不……不要这样……啊…啊啊啊！」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        kojo.对面座位 = 3;
      } else if (kojo.对面座位 <= 1 || game.kojo.口上开关 == 2) {
        await era.print(
          [
            `「不！不要…放开${sc()}！出去！拔出去啊！…啊……啊啊！」`,
            `「这种侵犯很有意思吗？混……混帐…！不！不要啊！！」`,
            `「不！不要过来！唔！啊啊！不行……啊啊啊！！」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.print(
          [
            `${target_name}发出了凄惨的悲鸣……`,
            `挣扎无用的${target_name}流下了屈辱的泪水……`,
            `即使${target_name}死命的挣扎，也无法改变被侵犯的事实……`,
          ][rand_n(3)],
        ); // PRINTDATAL
        kojo.对面座位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 23) {
    if (kojo.背面座位 == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「呵呵～终于能摆脱处女了呢……好期待哦……快点来呀～♡♡」`,
          );
          await era.printAndWait(
            `${target_name}露出了迫不及待的表情，主动地拨开了自己的臀瓣……`,
          );
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          era0(`abl:${target}:10`) >= 5 &&
          !era_flag.assiplay
        ) {
          await era.printAndWait(
            `「能…能够将第一次献给魔王大人，真的，真的非常地开心…」`,
          );
          await era.printAndWait(
            `「听说第一次都会很痛的样子，但是，是魔王大人的话……」`,
          );
          await era.printAndWait(
            `「就算是疼痛，也一定会被幸福感覆盖过去的呢……」`,
          );
          await era.printAndWait(
            `${target_name}露出信任的笑容，主动地拨开了自己的臀瓣……`,
          );
        } else {
          await era.printAndWait(
            `「不！第一次居然…要跟你这种……不！…走！走开啊！啊啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}惊怒地拼命挣扎着，但是还是无法抵抗${player_name}的侵犯……`,
          );
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「呵呵…这样被抱着，很清楚的能感受的性器的样子喔？……快点进来啊～♡」`,
          );
        } else if (era0(`talent:${target}:85`) == 1) {
          if (era_flag.assiplay) {
            await era.printAndWait(
              `「如果……这是魔王大人的命令……那么…请…请……」`,
            );
            await era.printAndWait(
              `（这体位……看不见脸……就把对方当成魔王大人吧……）`,
            );
            await era.printAndWait(
              `${target_name}低垂的睫毛掩盖了神情，顺从地接受了${player_name}的进入……`,
            );
          } else {
            await era.printAndWait(`「这样被魔王大人抱着好幸福呢……」`);
            await era.printAndWait(
              `「而且，从后面来的话……可以进得很深的样子……♡」`,
            );
            await era.printAndWait(
              `${target_name}脸颊晕红地露出了幸福的微笑……`,
            );
          }
        } else {
          await era.printAndWait(
            `「不！放手！你想要做什么……不！…走！走开啊！啊啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}惊怒地拼命挣扎着，但是还是无法抵抗${player_name}的侵犯……`,
          );
        }
      }
      kojo.背面座位 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.背面座位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「果然……从后面来……是最……最深的了♡嗯…嗯啊啊啊～♡♡」`,
            `「还……还要啊！……唔……好……好棒……快……快点啊♡嗯…嗯啊啊啊～♡♡」`,
            `「可…可以射在里面哦♡…想…想要……满满的……精液♡嗯…嗯啊啊啊～♡♡」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.printAndWait(
          `${target_name}淫荡地扭动着腰部，正因快感而不知廉耻地浪叫着……`,
        );
        kojo.背面座位 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.背面座位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (era_flag.assiplay) {
          await era.printAndWait(
            `「嗯……啊啊～从后面……进……进来了……${player_name}的………嗯啊～♡」`,
          );
          await era.printAndWait(
            `（明明……不是魔王大人……${sc()}……${sc()}不可以………）`,
          );
          await era.printAndWait(
            `${target_name}脑子想着魔王大人的事情，身体却和${player_name}紧紧交合着……`,
          );
        } else {
          await era.print(
            [
              `「好……好厉害……还……还想要……嗯…嗯啊啊啊～♡♡」`,
              `「想要……魔王大人的孩子…请……请射在里面吧？…嗯…啊啊啊～♡♡」`,
              `「这里是…属于魔王大人的……请…请打上精液的印记～♡♡」`,
            ][rand_n(3)],
          ); // PRINTDATAL
          await era.print(
            [
              `${target_name}被心爱的魔王大人拥抱，不自觉地说着肉麻的情话……`,
              `能跟心爱的魔王大人交合，${target_name}露出了幸福无比的笑容……`,
              `${target_name}带着崇敬又爱慕的眼神，不停地对${player_name}倾诉着爱语……`,
            ][rand_n(3)],
          ); // PRINTDATAL
        }
        kojo.背面座位 = 5;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (kojo.背面座位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「好…好奇怪……再这样动会……唔！嗯……啊…啊啊啊！」`,
            `「太……太深了……这……这是什么！唔！……啊…啊啊啊！」`,
            `「明明……不想要的……但……但是……啊…啊啊啊！」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.print(
          [
            `${target_name}脸上带着异样的嫣红，似乎渐渐从性交中得到了快感……`,
            `${target_name}像是在忍耐着什么一样，渐渐发出了断断续续的呻吟……`,
            `身体的快感背叛了${target_name}的意志，让他不由自主地发出了呻吟……`,
          ][rand_n(3)],
        ); // PRINTDATAL
        kojo.背面座位 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.背面座位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「不…不要……再这样动会……唔！嗯……啊…啊啊啊！」`,
            `「太……太深了……不……不行！嗯……啊…啊啊啊！」`,
            `「停……停下来啊……不……不要这样……啊…啊啊啊！」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        kojo.背面座位 = 3;
      } else if (kojo.背面座位 <= 1 || game.kojo.口上开关 == 2) {
        await era.print(
          [
            `「不！不要…放开${sc()}！出去！拔出去啊！…啊……啊啊！」`,
            `「这种侵犯很有意思吗？混……混帐…！不！不要啊！！」`,
            `「不！不要过来！唔！啊啊！不行……啊啊啊！！」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.print(
          [
            `${target_name}发出了凄惨的悲鸣……`,
            `挣扎无用的${target_name}流下了屈辱的泪水……`,
            `即使${target_name}死命的挣扎，也无法改变被侵犯的事实……`,
          ][rand_n(3)],
        ); // PRINTDATAL
        kojo.背面座位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 26) {
    if (kojo.正常位肛交 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「欸？要用这个体位侵犯屁股吗？……嗯……虽然没试过……但是……可以哦～♡♡」`,
        );
        await era.printAndWait(
          `尽管是第一次用这个体位进行肛交，${target_name}还是积极地配合着${player_name}的动作……`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        if (era_flag.assiplay) {
          await era.printAndWait(
            `「请……请用…但是…可以…不要看${sc()}的脸吗？……嗯…啊啊啊……」`,
          );
          await era.printAndWait(
            `（因为是命令……所以……应该……不会让魔王大人不悦吧……）`,
          );
          await era.printAndWait(
            `尽管是听从命令进行着肛交，${target_name}还是一边思慕着魔王一边配合着${player_name}的动作……`,
          );
        } else {
          await era.printAndWait(
            `「${sc()}全身上下都属于魔王大人的……喜欢这里的话……也……嗯……啊啊啊～♡♡」`,
          );
          await era.printAndWait(
            `尽管是第一次用这个体位进行肛交，${target_name}还是露出欣喜的表情地配合着${player_name}的动作……`,
          );
        }
      } else {
        await era.printAndWait(
          `「用这里……做？……真不敢相信……变态！去死！……不！！不要！啊啊啊！」`,
        );
        await era.printAndWait(
          `尽管${target_name}惊怒地拼命挣扎，但是还是无法抵抗${player_name}的侵犯……`,
        );
      }
      kojo.正常位肛交 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「后面…被…塞得满满的感觉……真是…太棒了♡嗯…嗯啊啊啊～♡♡」`,
            `「弄…弄坏也……可以…用力……还……还要♡嗯…嗯啊啊啊～♡♡」`,
            `「用屁股……高潮的话……是不是很……变态？但……但是♡嗯…嗯啊啊啊～♡♡」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.printAndWait(
          `从屁股传来激烈的快感，让${target_name}失神地发出了淫荡的呻吟……`,
        );
        kojo.正常位肛交 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.正常位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「真是…喜…喜欢……用这里吗？…唔…嗯啊…啊啊～♡♡」`,
            `「不…不要……太…用力哦…就…就是这样♡嗯…嗯啊啊啊～♡♡」`,
            `「不……不可以…太深了……轻…轻点呀♡……嗯…嗯啊啊啊～♡♡」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.printAndWait(
          `明明被侵犯着屁股，${target_name}也还是扭动着身体发出了呻吟……`,
        );
        kojo.正常位肛交 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (era_flag.assiplay) {
          await era.printAndWait(
            `「唔！啊啊～再这样子会……会…不可以……嗯♡…嗯啊…啊啊～♡♡」`,
          );
          await era.printAndWait(`（不行……这不是魔王大人……不能……但……但是……）`);
          await era.printAndWait(
            `从被侵犯的后穴传来了强烈的快感，${target_name}一边想着魔王大人一边咬牙承受着……`,
          );
        } else {
          await era.print(
            [
              `「嗯！呀！抱…抱歉…实在…是因为…太舒服了…嗯♡…嗯啊…啊啊～♡♡」`,
              `「啊～因为…是魔王大人……所以即使是……这种地方也……嗯♡…嗯啊…啊啊～♡♡」`,
              `「这里…也…想要热腾腾的……啊！${sc()}…真是太贪心了…嗯♡…嗯啊…啊啊～♡♡」`,
            ][rand_n(3)],
          ); // PRINTDATAL
          await era.print(
            [
              `来自后穴的快感，让${target_name}恍惚失神甚至语无论次了起来……`,
              `${target_name}因为后穴的快感，一边呻吟一边向${player_name}求饶着……`,
              `${target_name}想要专心致意地服侍${player_name}，但是快感太过强烈，似乎让他忘记了自己的目的……`,
            ][rand_n(3)],
          ); // PRINTDATAL
        }
        kojo.正常位肛交 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.正常位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (era_flag.assiplay) {
          await era.printAndWait(`「唔！嗯……嗯啊…不……呀！……啊…啊啊！」`);
          await era.printAndWait(`（这个身体是取悦魔王大人的，所以……所以……）`);
          await era.printAndWait(
            `${target_name}闭上了眼睛，顺从地承受${player_name}的侵犯……`,
          );
        } else {
          await era.print(
            [
              `「啊！魔王大人…喜…喜欢这里吗？那…那么……用坏了也没关系♡嗯…嗯啊啊啊～♡♡」`,
              `「虽然…用…这里…承欢……很羞耻…但是…只要您喜欢的话……${sc()}……嗯♡…嗯啊…啊啊～♡♡」`,
              `「用这个…污秽的地方……伺候尊贵的魔王大人…真的可以吗？……嗯♡…嗯啊…啊啊～♡♡」`,
            ][rand_n(3)],
          ); // PRINTDATAL
          await era.print(
            [
              `比起自己肉体的愉悦，${target_name}似乎先顾虑着${player_name}的感受……`,
              `${target_name}努力地摆动着腰身，竭尽全力地想要让${player_name}觉得舒服……`,
              `尽管${target_name}气喘吁吁，但仍时不时观察照顾着${player_name}的感受……`,
            ][rand_n(3)],
          ); // PRINTDATAL
        }
        kojo.正常位肛交 = 4;
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「不…不要……屁股…感觉好奇怪啊…唔！嗯……啊…啊啊啊！」`,
            `「太……太深了……不……不行！嗯……啊…啊啊啊！」`,
            `「停……停下来啊……后面…会…会……啊…啊啊啊！」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        kojo.正常位肛交 = 3;
      } else if (kojo.正常位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.print(
          [
            `「喜欢侵犯屁股的变态！去死！……唔！……不……好痛！……啊啊！」`,
            `「拔…拔出去啊！好痛！不…不要再进来了！……啊！……啊啊！」`,
            `「不！不要啊！要……要坏掉了……唔！……不……好痛！……啊啊！」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.print(
          [
            `${target_name}发出了凄惨的悲鸣……`,
            `挣扎无用的${target_name}流下了屈辱的泪水……`,
            `即使${target_name}死命的挣扎，也无法改变被侵犯的事实……`,
          ][rand_n(3)],
        ); // PRINTDATAL
        kojo.正常位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 27) {
    if (kojo.背后位肛交 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「欸？要从背后侵犯屁股吗？看不到表请有点紧张呢……但是……可以哦～♡♡」`,
        );
        await era.printAndWait(
          `尽管是第一次用这个体位进行肛交，${target_name}还是积极地配合着${player_name}的动作……`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        if (era_flag.assiplay) {
          await era.printAndWait(
            `「虽然……用这里…这体位…是第一次……但是……嗯…啊啊啊……」`,
          );
          await era.printAndWait(
            `（这个姿势看不见表情……把对方当成魔王大人就可以了吧……）`,
          );
          await era.printAndWait(
            `尽管是第一次用这个体位进行肛交，${target_name}还是顺从地配合着${player_name}的动作……`,
          );
        } else {
          await era.printAndWait(
            `「虽然看不见魔王大人的表情……有点紧张……但是……可以哦～♡♡」`,
          );
          await era.printAndWait(
            `尽管是第一次用这个体位进行肛交，${target_name}还是露出欣喜的表情地配合着${player_name}的动作……`,
          );
        }
      } else {
        await era.printAndWait(
          `「这个……姿势？……该不会要……变态！去死！……不！！不要！啊啊啊！」`,
        );
        await era.printAndWait(
          `尽管${target_name}惊怒地拼命挣扎，但是还是无法抵抗${player_name}的侵犯……`,
        );
      }
      kojo.背后位肛交 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「后面…被…塞得满满的感觉……真是…太棒了♡嗯…嗯啊啊啊～♡♡」`,
            `「弄…弄坏也……可以…用力……还……还要♡嗯…嗯啊啊啊～♡♡」`,
            `「用屁股……高潮的话……是不是很……变态？但……但是♡嗯…嗯啊啊啊～♡♡」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.printAndWait(
          `从屁股传来激烈的快感，让${target_name}失神地发出了淫荡的呻吟……`,
        );
        kojo.背后位肛交 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.背后位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「真是…喜…喜欢……用这里吗？…唔…嗯啊…啊啊～♡♡」`,
            `「不…不要……太…用力哦…就…就是这样♡嗯…嗯啊啊啊～♡♡」`,
            `「不……不可以…太深了……轻…轻点呀♡……嗯…嗯啊啊啊～♡♡」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.printAndWait(
          `明明被侵犯着屁股，${target_name}也还是扭动着身体发出了呻吟……`,
        );
        kojo.背后位肛交 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (era_flag.assiplay) {
          await era.printAndWait(
            `「唔！啊啊～再这样子会……会…不可以……嗯♡…嗯啊…啊啊～♡♡」`,
          );
          await era.printAndWait(`（不行……这不是魔王大人……不能……但……但是……）`);
          await era.printAndWait(
            `从被侵犯的后穴传来了强烈的快感，${target_name}一边想着魔王大人一边咬牙承受着……`,
          );
        } else {
          await era.print(
            [
              `「嗯！呀！抱…抱歉…实在…是因为…太舒服了…嗯♡…嗯啊…啊啊～♡♡」`,
              `「啊～因为…是魔王大人……所以即使是……这种地方也……嗯♡…嗯啊…啊啊～♡♡」`,
              `「这里…也…想要热腾腾的……啊！${sc()}…真是太贪心了…嗯♡…嗯啊…啊啊～♡♡」`,
            ][rand_n(3)],
          ); // PRINTDATAL
          await era.print(
            [
              `来自后穴的快感，让${target_name}恍惚失神甚至语无论次了起来……`,
              `${target_name}因为后穴的快感，一边呻吟一边向${player_name}求饶着……`,
              `${target_name}一心想要服侍${player_name}，但是快感太过强烈，似乎让他忘记了自己的目的……`,
            ][rand_n(3)],
          ); // PRINTDATAL
        }
        kojo.背后位肛交 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (era_flag.assiplay) {
          await era.printAndWait(`「唔！嗯……嗯啊…不……呀！……啊…啊啊！」`);
          await era.printAndWait(`（这个身体是取悦魔王大人的，所以……所以……）`);
          await era.printAndWait(
            `${target_name}闭上了眼睛，顺从地承受${player_name}的侵犯……`,
          );
        } else {
          await era.print(
            [
              `「啊！魔王大人…喜…喜欢这里吗？那…那么……用坏了也没关系♡嗯…嗯啊啊啊～♡♡」`,
              `「虽然…用…这里…承欢……很羞耻…但是…只要您喜欢的话……${sc()}……嗯♡…嗯啊…啊啊～♡♡」`,
              `「用这个…污秽的地方……伺候尊贵的魔王大人…真的可以吗？……嗯♡…嗯啊…啊啊～♡♡」`,
            ][rand_n(3)],
          ); // PRINTDATAL
          await era.print(
            [
              `比起自己肉体的愉悦，${target_name}似乎先顾虑着${player_name}的感受……`,
              `${target_name}努力地摆动着腰身，竭尽全力地想要让${player_name}觉得舒服……`,
              `尽管${target_name}气喘吁吁，但仍时不时观察照顾着${player_name}的感受……`,
            ][rand_n(3)],
          ); // PRINTDATAL
        }
        kojo.背后位肛交 = 4;
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「不…不要……屁股…感觉好奇怪啊…唔！嗯……啊…啊啊啊！」`,
            `「太……太深了……不……不行！嗯……啊…啊啊啊！」`,
            `「停……停下来啊……后面…会…会……啊…啊啊啊！」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        kojo.背后位肛交 = 3;
      } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.print(
          [
            `「喜欢侵犯屁股的变态！去死！……唔！……不……好痛！……啊啊！」`,
            `「拔…拔出去啊！好痛！不…不要再进来了！……啊！……啊啊！」`,
            `「不！不要啊！要……要坏掉了……唔！……不……好痛！……啊啊！」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.print(
          [
            `${target_name}发出了凄惨的悲鸣……`,
            `挣扎无用的${target_name}流下了屈辱的泪水……`,
            `即使${target_name}死命的挣扎，也无法改变被侵犯的事实……`,
          ][rand_n(3)],
        ); // PRINTDATAL
        kojo.背后位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 28) {
    if (kojo.对面座位肛交 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「这样抱着是怕${sc()}跑掉吗？呵呵…性爱的滋味如此美妙，${sc()}怎么舍得离开呢♡」`,
        );
        await era.printAndWait(
          `${target_name}带着期待的笑容，积极地回应着${player_name}的动作……`,
        );
      } else if (era0(`talent:${target}:85`) == 1 && !era_flag.assiplay) {
        await era.printAndWait(
          `「这样被抱着…感觉很幸福呢♡……当然……要做什么都可以哦？${sc()}的魔王大人♡」`,
        );
        await era.printAndWait(
          `${target_name}心情很好地微笑着，任凭${player_name}摆布……`,
        );
      } else {
        await era.printAndWait(
          `「放${sc()}下去！混帐！到底是要做什么…该不会…不！！不要！啊啊啊！」`,
        );
        await era.printAndWait(
          `尽管${target_name}惊怒地拼命挣扎，但是还是无法抵抗${player_name}的侵犯……`,
        );
      }
      kojo.对面座位肛交 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「后面…被…塞得满满的感觉……真是…太棒了♡嗯…嗯啊啊啊～♡♡」`,
            `「弄…弄坏也……可以…用力……还……还要♡嗯…嗯啊啊啊～♡♡」`,
            `「用屁股……高潮的话……是不是很……变态？但……但是♡嗯…嗯啊啊啊～♡♡」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.printAndWait(
          `从屁股传来激烈的快感，让${target_name}失神地发出了淫荡的呻吟……`,
        );
        kojo.对面座位肛交 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.对面座位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「真是…喜…喜欢……用这里吗？…唔…嗯啊…啊啊～♡♡」`,
            `「不…不要……太…用力哦…就…就是这样♡嗯…嗯啊啊啊～♡♡」`,
            `「不……不可以…太深了……轻…轻点呀♡……嗯…嗯啊啊啊～♡♡」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        kojo.对面座位肛交 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (era_flag.assiplay) {
          await era.printAndWait(
            `「唔！啊啊～再这样子会……会…不可以……嗯♡…嗯啊…啊啊～♡♡」`,
          );
          await era.printAndWait(`（不行……这不是魔王大人……不能……但……但是……）`);
          await era.printAndWait(
            `从被侵犯的后穴传来了强烈的快感，${target_name}一边想着魔王大人一边咬牙承受着……`,
          );
        } else {
          await era.print(
            [
              `「嗯！呀！抱…抱歉…实在…是因为…太舒服了…嗯♡…嗯啊…啊啊～♡♡」`,
              `「啊～因为…是魔王大人……所以即使是……这种地方也……嗯♡…嗯啊…啊啊～♡♡」`,
              `「这里…也…想要热腾腾的……啊！${sc()}…真是太贪心了…嗯♡…嗯啊…啊啊～♡♡」`,
            ][rand_n(3)],
          ); // PRINTDATAL
          await era.print(
            [
              `来自后穴的快感，让${target_name}恍惚失神甚至语无论次了起来……`,
              `${target_name}因为后穴的快感，一边呻吟一边向${player_name}求饶着……`,
              `${target_name}一心想要服侍${player_name}，但是快感太过强烈，似乎让他忘记了自己的目的……`,
            ][rand_n(3)],
          ); // PRINTDATAL
        }
        kojo.对面座位肛交 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.对面座位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (era_flag.assiplay) {
          await era.printAndWait(`「唔！嗯……嗯啊…不……呀！……啊…啊啊！」`);
          await era.printAndWait(`（这个身体是取悦魔王大人的，所以……所以……）`);
          await era.printAndWait(
            `${target_name}闭上了眼睛，顺从地承受${player_name}的侵犯……`,
          );
        } else {
          await era.print(
            [
              `「啊！魔王大人…喜…喜欢这里吗？那…那么……用坏了也没关系♡嗯…嗯啊啊啊～♡♡」`,
              `「虽然…用…这里…承欢……很羞耻…但是…只要您喜欢的话……${sc()}……嗯♡…嗯啊…啊啊～♡♡」`,
              `「用这个…污秽的地方……伺候尊贵的魔王大人…真的可以吗？……嗯♡…嗯啊…啊啊～♡♡」`,
            ][rand_n(3)],
          ); // PRINTDATAL
          await era.print(
            [
              `比起自己肉体的愉悦，${target_name}似乎先顾虑着${player_name}的感受……`,
              `${target_name}努力地摆动着腰身，竭尽全力地想要让${player_name}觉得舒服……`,
              `尽管${target_name}气喘吁吁，但仍时不时观察照顾着${player_name}的感受……`,
            ][rand_n(3)],
          ); // PRINTDATAL
        }
        kojo.对面座位肛交 = 4;
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「不…不要……屁股…感觉好奇怪啊…唔！嗯……啊…啊啊啊！」`,
            `「太……太深了……不……不行！嗯……啊…啊啊啊！」`,
            `「停……停下来啊……后面…会…会……啊…啊啊啊！」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        kojo.对面座位肛交 = 3;
      } else if (kojo.对面座位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.print(
          [
            `「喜欢侵犯屁股的变态！去死！……唔！……不……好痛！……啊啊！」`,
            `「拔…拔出去啊！好痛！不…不要再进来了！……啊！……啊啊！」`,
            `「不！不要啊！要……要坏掉了……唔！……不……好痛！……啊啊！」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.print(
          [
            `${target_name}发出了凄惨的悲鸣……`,
            `挣扎无用的${target_name}流下了屈辱的泪水……`,
            `即使${target_name}死命的挣扎，也无法改变被侵犯的事实……`,
          ][rand_n(3)],
        ); // PRINTDATAL
        kojo.对面座位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 29) {
    if (kojo.背面座位肛交 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「想玩后面也可以喔！这个姿势…嗯……应该很美妙吧♡」`,
        );
        await era.printAndWait(
          `${target_name}带着期待的笑容，积极地回应着${player_name}的动作……`,
        );
      } else if (era0(`talent:${target}:85`) == 1 && !era_flag.assiplay) {
        await era.printAndWait(
          `「想从后面…嗯……好……好啊……只要是魔王大人……怎样都可以♡」`,
        );
        await era.printAndWait(
          `${target_name}带着羞涩的笑容，顺从地回应着${player_name}的动作……`,
        );
      } else {
        await era.printAndWait(
          `「后面…好像有什么……该不会……不！放开${sc()}！……不要……好痛！……啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}的腰部被${player_name}的双臂牢牢地固定，就这样从后面贯穿至${target_name}的体内……`,
        );
      }
      kojo.背面座位肛交 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「后面…被…塞得满满的感觉……真是…太棒了♡嗯…嗯啊啊啊～♡♡」`,
            `「弄…弄坏也……可以…用力……还……还要♡嗯…嗯啊啊啊～♡♡」`,
            `「用屁股……高潮的话……是不是很……变态？但……但是♡嗯…嗯啊啊啊～♡♡」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.printAndWait(
          `从屁股传来激烈的快感，让${target_name}失神地发出了淫荡的呻吟……`,
        );
        kojo.背面座位肛交 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.背面座位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「真是…喜…喜欢……用这里吗？…唔…嗯啊…啊啊～♡♡」`,
            `「不…不要……太…用力哦…就…就是这样♡嗯…嗯啊啊啊～♡♡」`,
            `「不……不可以…太深了……轻…轻点呀♡……嗯…嗯啊啊啊～♡♡」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        kojo.背面座位肛交 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (era_flag.assiplay) {
          await era.printAndWait(
            `「唔！啊啊～再这样子会……会…不可以……嗯♡…嗯啊…啊啊～♡♡」`,
          );
          await era.printAndWait(`（不行……这不是魔王大人……不能……但……但是……）`);
          await era.printAndWait(
            `从被侵犯的后穴传来了强烈的快感，${target_name}一边想着魔王大人一边咬牙承受着……`,
          );
        } else {
          await era.print(
            [
              `「嗯！呀！抱…抱歉…实在…是因为…太舒服了…嗯♡…嗯啊…啊啊～♡♡」`,
              `「啊～因为…是魔王大人……所以即使是……这种地方也……嗯♡…嗯啊…啊啊～♡♡」`,
              `「这里…也…想要热腾腾的……啊！${sc()}…真是太贪心了…嗯♡…嗯啊…啊啊～♡♡」`,
            ][rand_n(3)],
          ); // PRINTDATAL
          await era.print(
            [
              `来自后穴的快感，让${target_name}恍惚失神甚至语无论次了起来……`,
              `${target_name}因为后穴的快感，一边呻吟一边向${player_name}求饶着……`,
              `${target_name}一心想要服侍${player_name}，但是快感太过强烈，似乎让他忘记了自己的目的……`,
            ][rand_n(3)],
          ); // PRINTDATAL
        }
        kojo.背面座位肛交 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.背面座位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (era_flag.assiplay) {
          await era.printAndWait(`「唔！嗯……嗯啊…不……呀！……啊…啊啊！」`);
          await era.printAndWait(`（这个身体是取悦魔王大人的，所以……所以……）`);
          await era.printAndWait(
            `${target_name}闭上了眼睛，顺从地承受${player_name}的侵犯……`,
          );
        } else {
          await era.print(
            [
              `「啊！魔王大人…喜…喜欢这里吗？那…那么……用坏了也没关系♡嗯…嗯啊啊啊～♡♡」`,
              `「虽然…用…这里…承欢……很羞耻…但是…只要您喜欢的话……${sc()}……嗯♡…嗯啊…啊啊～♡♡」`,
              `「用这个…污秽的地方……伺候尊贵的魔王大人…真的可以吗？……嗯♡…嗯啊…啊啊～♡♡」`,
            ][rand_n(3)],
          ); // PRINTDATAL
          await era.print(
            [
              `比起自己肉体的愉悦，${target_name}似乎先顾虑着${player_name}的感受……`,
              `${target_name}努力地摆动着腰身，竭尽全力地想要让${player_name}觉得舒服……`,
              `尽管${target_name}气喘吁吁，但仍时不时观察照顾着${player_name}的感受……`,
            ][rand_n(3)],
          ); // PRINTDATAL
        }
        kojo.背面座位肛交 = 4;
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「不…不要……屁股…感觉好奇怪啊…唔！嗯……啊…啊啊啊！」`,
            `「太……太深了……不……不行！嗯……啊…啊啊啊！」`,
            `「停……停下来啊……后面…会…会……啊…啊啊啊！」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        kojo.背面座位肛交 = 3;
      } else if (kojo.背面座位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.print(
          [
            `「喜欢侵犯屁股的变态！去死！……唔！……不……好痛！……啊啊！」`,
            `「拔…拔出去啊！好痛！不…不要再进来了！……啊！……啊啊！」`,
            `「不！不要啊！要……要坏掉了……唔！……不……好痛！……啊啊！」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.print(
          [
            `${target_name}发出了凄惨的悲鸣……`,
            `挣扎无用的${target_name}流下了屈辱的泪水……`,
            `即使${target_name}死命的挣扎，也无法改变被侵犯的事实……`,
          ][rand_n(3)],
        ); // PRINTDATAL
        kojo.背面座位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 30) {
    if (kojo.手淫 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「欸？用手就可以了吗？呵呵……真可惜呢……♡」`);
      } else if (era0(`talent:${target}:85`) == 1 && !era_flag.assiplay) {
        await era.printAndWait(`「用……手吗？好的……${sc()}会努力……」`);
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「一定要${sc()}来吗？……算了……如果只是用手的话……」`,
        );
        await era.printAndWait(
          `${target_name}皱着眉头，随意地抚弄着${player_name}的阴茎……`,
        );
      } else {
        await era.printAndWait(
          `「想让${sc()}碰这种脏东西？哼……就不怕被${sc()}折断吗？」`,
        );
        await era.printAndWait(
          `${target_name}皱着眉头，十分嫌弃又笨拙地抚弄着${player_name}的阴茎……`,
        );
      }
      kojo.手淫 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯…要快点变大喔……然后……呵呵……♡」`);
        await era.printAndWait(
          `${target_name}抱着热切的期待，积极地抚弄着${player_name}的阴茎……`,
        );
        kojo.手淫 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (kojo.手淫 <= 4 || game.kojo.口上开关 == 2) &&
        !era_flag.assiplay
      ) {
        await era.printAndWait(`「果然…还是魔王大人的……最棒呢♡」`);
        await era.printAndWait(
          `${target_name}露出痴迷崇敬的眼神，宛如膜拜似地服侍着${player_name}……`,
        );
        kojo.手淫 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 3 || game.kojo.口上开关 == 2) &&
        !era_flag.assiplay
      ) {
        await era.printAndWait(`「能为魔王大人服务，是${sc()}的荣幸……」`);
        await era.printAndWait(
          `${target_name}的手指动作灵活又细致，面带微笑地关注着${player_name}的感受……`,
        );
        kojo.手淫 = 4;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「……这样………够了没……」`);
        await era.printAndWait(
          `${target_name}皱着眉头，像是想要赶快结束那样，草率地抚弄着${player_name}的阴茎……`,
        );
        kojo.手淫 = 3;
      } else if (kojo.手淫 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「难道你不会自己弄吗？」`);
        await era.printAndWait(
          `${target_name}露出了嫌弃的表情，非常不情愿地抚弄着${player_name}的阴茎……`,
        );
        kojo.手淫 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 31) {
    if (kojo.口交_奴 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「欸？用嘴来吗？呵呵……真好奇是什么味道呢……♡」`);
      } else if (era0(`talent:${target}:85`) == 1 && !era_flag.assiplay) {
        await era.printAndWait(`「用……嘴吗？是魔王大人的话……${sc()}很乐意……」`);
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「……舔……可以了吧……不要整个塞进来……唔！……」`);
        await era.printAndWait(
          `${target_name}皱着眉头，勉强地舔舐着${player_name}的阴茎……`,
        );
      } else {
        await era.printAndWait(`「这么脏的东西要${sc()}……？……呜……不……」`);
        await era.printAndWait(
          `还不等${target_name}把话说完，${player_name}的阴茎就强硬地抵住了他的嘴巴……`,
        );
      }
      kojo.口交_奴 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯…咕啾……唔……好渴啊……可以……射给${sc()}……解渴吗……♡」`,
        );
        kojo.口交_奴 = 6;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯…咕啾……唔……在嘴巴里面……变大了呢……♡」`);
        kojo.口交_奴 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2) &&
        !era_flag.assiplay
      ) {
        await era.print(
          [
            `「嗯…咕啾……唔…好……好喜欢……魔王大人的………♡」`,
            `「嗯…咕啾……唔……魔王大人……舒服吗………♡」`,
            `「因为是魔王大人……所以…唔…咕啾……射…进嘴巴……也可以……♡」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        kojo.口交_奴 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.口交_奴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.print(`「嗯…咕啾……唔……呼……可…可以了吧……」`);
        kojo.口交_奴 = 3;
      } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「咳！不……不要……唔……嗯……不……」`);
        await era.printAndWait(
          `${target_name}死命地想要拒绝，但是头部被${player_name}用手固定后被强迫着进行着口交……`,
        );
        kojo.口交_奴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 32) {
    if (kojo.乳交 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「用胸部摩擦就会硬的话……那么……就来做吧～♡♡」`);
        await era.printAndWait(
          `${target_name}饶有兴致地配合着${player_name}的指示进行乳交……`,
        );
        kojo.乳交 = 5;
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「为了魔王大人，用胸部的服务的技巧……的确是有学习的必要呢！」`,
        );
        await era.printAndWait(
          `${target_name}积极地配合着${player_name}的指示进行乳交……`,
        );
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「随便……你开心就好……」`);
        await era.printAndWait(
          `${target_name}皱着眉头，笨拙地照着${player_name}的指示进行乳交……`,
        );
      } else {
        await era.printAndWait(`「要${sc()}……用胸部？……真是变态的玩法呢……」`);
        await era.printAndWait(
          `${target_name}带着鄙视的眼神，心不甘情不愿地进行着乳交……`,
        );
      }
      kojo.乳交 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「嗯啊～啊啊♡……光是用这里摩擦……就舒服到…想要高潮呢～♡♡」`,
            `「啊啊…变得好大…这么烫♡……快点啊……好想要呢～♡♡」`,
            `「还不能射吗？嗯……嗯啊～♡…好…想要热腾腾的牛奶啊～♡♡」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.printAndWait(
          `${target_name}一边进行乳交，一边发出淫荡又高亢的呻吟……`,
        );
        kojo.乳交 = 6;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.口交_奴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯……唔……快点变大哦……呵呵……好期待啊～♡♡」`);
        await era.printAndWait(
          `${target_name}用期待的眼神，看着夹在乳房中间渐渐勃起的阴茎……`,
        );
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.乳交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (era_flag.assiplay) {
          await era.printAndWait(`「如果这样子……感觉会更舒服吗？……」`);
          await era.printAndWait(
            `（为了能更好地服侍魔王大人……${sc()}要更加努力……让技巧更好才可以！）`,
          );
          await era.printAndWait(
            `${target_name}认真的用乳房服侍摩擦着${player_name}勃起的阴茎……`,
          );
        } else {
          await era.print(
            [
              `「能服侍魔王大人实在是太幸福了！……嗯啊！这个热度……好棒……好舒服呢～♡♡」`,
              `「魔王大人觉得舒服吗？${sc()}觉得很舒服哦！似乎……一直做下去也可以呢～♡♡」`,
              `「这样子夹可以吗？如果……想要射在上面…也可以的哦～♡♡」`,
            ][rand_n(3)],
          ); // PRINTDATAL
          await era.printAndWait(
            `${target_name}似乎非常开心，满脸通红热切地用乳房服侍着${player_name}勃起的阴茎……`,
          );
        }
        kojo.乳交 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.乳交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「唔……变大了……在胸部上面……好烫……」`);
        await era.printAndWait(
          `${target_name}皱着眉头，用乳房摩擦着${player_name}勃起的阴茎……`,
        );
        kojo.乳交 = 3;
      } else if (kojo.乳交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「这样……感觉……真是恶心……」`);
        await era.printAndWait(
          `${target_name}十分嫌弃地用乳房摩擦着${player_name}的阴茎……`,
        );
        kojo.乳交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 33) {
    if (kojo.股间性交 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      kojo.股间性交 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`talent:${target}:0`) == 1 &&
        (kojo.股间性交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.股间性交 = 6;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.股间性交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.股间性交 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`talent:${target}:0`) == 1 &&
        (kojo.股间性交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        await era.printAndWait('');
        kojo.股间性交 = 4;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.股间性交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        await era.printAndWait('');
        kojo.股间性交 = 3;
      } else if (kojo.股间性交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        kojo.股间性交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 34) {
    if (kojo.骑乘位 == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「用骑乘位吗？能摆脱处女的话，什么姿势都可以哦～♡」`,
          );
          await era.printAndWait(
            `${target_name}迫不及待地跨在${player_name}的身上，对准阴茎之后，义无反顾地坐了下去……`,
          );
        } else if (era0(`talent:${target}:85`) == 1 && !era_flag.assiplay) {
          await era.printAndWait(`「能将处女奉献给魔王大人……真的很幸福……」`);
          await era.printAndWait(
            `听见要骑乘位的命令，${target_name}尽管没有做过，但还是露出了开心的笑容。`,
          );
          await era.printAndWait(
            `「但是……因为是第一次……如果……做不好的地方……还请您多多『指教』哦♡」`,
          );
          await era.printAndWait(
            `${target_name}小心翼翼地跨在${player_name}的身上，对准阴茎之后，义无反顾地坐了下去……`,
          );
        } else {
          await era.printAndWait(`「要${sc()}坐上去自己动？居……居然……可恶！」`);
          await era.printAndWait(
            `${target_name}似乎是气过头了，失去了平时的伶牙俐齿……`,
          );
          await era.printAndWait(
            `尽管再怎么不愿意，但是如果不自己来的话，可能会有更可怕的后果……`,
          );
          await era.printAndWait(`「算了……${sc()}…${sc()}……呜……」`);
          await era.printAndWait(
            `${target_name}明明还是处女，却像是自暴自弃那样，骑在了${player_name}的身上……`,
          );
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「这个姿势${sc()}很喜欢……关于技术嘛…呵呵……不妨试试看～♡」`,
          );
          await era.printAndWait(
            `${target_name}迫不及待地跨在${player_name}的身上……`,
          );
        } else if (era0(`talent:${target}:85`) == 1 && !era_flag.assiplay) {
          await era.printAndWait(
            `「魔王大人……喜欢这个姿势？那么……${sc()}…${sc()}当然……可以……」`,
          );
          await era.printAndWait(
            `${target_name}双颊通红，顺从地跨在${player_name}的身上……`,
          );
        } else {
          await era.printAndWait(`「要${sc()}坐上去自己动？居……居然……可恶！」`);
          await era.printAndWait(
            `${target_name}似乎是气过头了，失去了平时的伶牙俐齿……`,
          );
          await era.printAndWait(
            `尽管再怎么不愿意，但是如果不自己来的话，可能会有更可怕的后果……`,
          );
          await era.printAndWait(`「算了……${sc()}…${sc()}……呜……」`);
          await era.printAndWait(
            `${target_name}像是自暴自弃那样，骑在了${player_name}的身上……`,
          );
        }
      }
      kojo.骑乘位 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.骑乘位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「嗯…哈啊…好…好棒♡…快…快点…射进来啊♡…嗯…嗯啊……啊啊♡♡」`,
            `「嗯…啊啊♡……顶……顶进来了♡……好…好烫……还…还要！…嗯♡……啊啊♡♡」`,
            `「全部…都……都进来了♡嗯……啊！好……好舒服…嗯…嗯啊……啊啊♡♡」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.printAndWait(
          `${target_name}淫糜地摆动着腰肢，贪婪地榨取着${player_name}……`,
        );
        kojo.骑乘位 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.骑乘位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (era_flag.assiplay) {
          await era.print(`「唔…啊……嗯……啊啊……」`);
          await era.printAndWait(
            `（在魔王大人面前……${sc()}……${sc()}居然坐在别人身上……呜）`,
          );
          await era.printAndWait(
            `${target_name}闭着眼睛不敢看${master_name}的表情，只是顺从地骑在${player_name}身上扭摆着腰肢……`,
          );
        } else {
          await era.print(
            [
              `「魔王大人……觉得舒服吗？如果想要快一点……${sc()}…${sc()}也……嗯……啊啊♡」`,
              `「嗯…啊啊……顶……顶进来了♡……魔王大人…${sc()}……${sc()}……嗯♡……啊啊♡♡」`,
              `「全部…都……都进来了♡嗯……啊！好……好舒服…不愧是……魔王大人的……嗯……啊啊♡」`,
            ][rand_n(3)],
          ); // PRINTDATAL
          await era.printAndWait(
            `${target_name}淫糜地摆动着腰肢，竭尽全力地取悦着${player_name}……`,
          );
        }
        kojo.骑乘位 = 5;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (kojo.骑乘位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          [
            `「唔…不……不要这么…顶…${sc()}…${sc()}会……嗯……啊啊……不……」`,
            `「嗯…啊啊……顶……顶进来了……好…深……不……不行……啊啊」`,
            `「要…要被顶穿了……嗯……啊啊！不…不可以动……嗯……啊啊！」`,
          ][rand_n(3)],
        ); // PRINTDATAL
        await era.printAndWait(
          `来自下身的强烈快感，让${target_name}呼吸急促地呻吟了起来……`,
        );
        kojo.骑乘位 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.骑乘位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.print(`「就…就当是坐在按摩椅上面……唔！……嗯……啊啊……」`);
        await era.printAndWait(
          `${target_name}皱着眉头，咬牙地在${player_name}身上起伏着……`,
        );
        kojo.骑乘位 = 3;
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「不……不要看！唔……别……别顶了……不要……呜」`);
        await era.printAndWait(
          `${target_name}屈辱地用手遮住了自己的脸庞，摇摇晃晃地骑在了的${player_name}身上……`,
        );
        kojo.骑乘位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 35) {
    if (kojo.全身擦洗 == 0) {
      if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      kojo.全身擦洗 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (kojo.全身擦洗 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.全身擦洗 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (kojo.全身擦洗 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.全身擦洗 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.全身擦洗 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.全身擦洗 = 3;
      } else if (kojo.全身擦洗 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        kojo.全身擦洗 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 36) {
    if (kojo.骑乘位肛交 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「用这个姿势肛交……光想就决得很刺激♡…好啊……试试看♡」`,
        );
        await era.printAndWait(
          `${target_name}迫不及待地跨在${player_name}的身上……`,
        );
      } else if (era0(`talent:${target}:85`) == 1 && !era_flag.assiplay) {
        await era.printAndWait(
          `「如果是魔王的命令……那么……当然很乐意为您服务……♡」`,
        );
        await era.printAndWait(
          `尽管${target_name}没有骑乘式肛交的经验，但他还是小心翼翼地跨坐在${player_name}的身上……`,
        );
      } else {
        await era.printAndWait(`「居……居然…要${sc()}自己……真是变态！」`);
        await era.printAndWait(
          `${target_name}露出痛恨的表情，不情不愿地跨坐在${player_name}的身上……`,
        );
      }
      kojo.骑乘位肛交 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊！……好棒♡停…停不下来啊……嗯啊……啊啊啊♡♡」`,
          );
        } else {
          await era.printAndWait(
            `「要……要用屁股高潮了♡……啊啊……快点……快射进来♡……啊啊♡♡」`,
          );
        }
        await era.printAndWait(
          `${target_name}沉醉在后穴带来的快感里，淫荡地扭动着腰肢呻吟着……`,
        );
        kojo.骑乘位肛交 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.骑乘位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「真……没想到……屁股……也能有这种快感……嗯啊……啊啊啊♡♡」`,
        );
        await era.printAndWait(
          `${target_name}积极地在${player_name}的身上起伏着……`,
        );
        kojo.骑乘位肛交 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (era_flag.assiplay) {
          await era.print(
            `「唔…啊……嗯……啊啊……不……不行……这样下去…嗯啊……啊啊啊♡♡」`,
          );
          await era.printAndWait(
            `（明明不是魔王大人……${sc()}……${sc()}却……啊啊……）`,
          );
          await era.printAndWait(
            `强烈的快感贯穿了${target_name}，让他忘记了对象是谁，只能淫荡地摆动着腰肢……`,
          );
        } else {
          await era.print(
            [
              `「魔王大人…太…太棒了♡…抱…抱歉…要…要高潮了♡……啊……啊啊啊♡♡」`,
              `「嗯…啊啊……顶……顶进来了♡……魔王大人…请…请射在里面♡……嗯♡……啊啊♡♡」`,
              `「屁股…好奇怪啊♡嗯……啊！好……好棒…不愧是……魔王大人的……嗯……啊啊♡」`,
            ][rand_n(3)],
          ); // PRINTDATAL
          await era.printAndWait(
            `强烈的快感让${target_name}忘情地${player_name}在身上起伏着，发出了急促高昂的呻吟……`,
          );
        }
        kojo.骑乘位肛交 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (era_flag.assiplay) {
          await era.print(`「唔…啊……嗯……啊啊……」`);
          await era.printAndWait(
            `（在魔王大人面前……${sc()}……${sc()}居然坐在别人身上……呜）`,
          );
          await era.printAndWait(
            `${target_name}闭着眼睛不敢看${master_name}的表情，只是顺从地骑在${player_name}身上扭摆着腰肢……`,
          );
        } else {
          await era.print(
            [
              `「魔王大人……觉得舒服吗？如果想要快一点……${sc()}…${sc()}也……嗯……啊啊♡」`,
              `「嗯…啊啊……顶……顶进来了♡……魔王大人…${sc()}……${sc()}……嗯♡……啊啊♡♡」`,
              `「全部…都……都进来了♡嗯……啊！好……好舒服♡…不愧是……魔王大人的……嗯……啊啊♡」`,
            ][rand_n(3)],
          ); // PRINTDATAL
          await era.printAndWait(
            `${target_name}淫糜地摆动着腰肢，竭尽全力地取悦着${player_name}……`,
          );
        }
        kojo.骑乘位肛交 = 4;
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「唔……这……这种感觉……不……不行……嗯……啊啊！」`);
        await era.printAndWait(
          `从后穴传来的异样感，让${target_name}忍不住发出了呻吟……`,
        );
        kojo.骑乘位肛交 = 3;
      } else if (kojo.骑乘位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「不……好痛……不行了……要坏掉了……啊啊啊！」`);
        await era.printAndWait(
          `${target_name}露出痛苦的表情，艰难地在${player_name}的身上起伏着……`,
        );
        kojo.骑乘位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 37) {
    if (kojo.肛门侍奉 == 0) {
      if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      kojo.肛门侍奉 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.肛门侍奉 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.print('');
        kojo.肛门侍奉 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.肛门侍奉 = 3;
      } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        kojo.肛门侍奉 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 40) {
    if (
      kojo.打屁股 == 0 &&
      !(era0(`talent:${target}:76`) || era0(`talent:${target}:85`))
    ) {
      await era.printAndWait(`「居……居然……打……可恶！放开……唔！」`);
      await era.printAndWait(
        `宛如惩罚小孩子一样地被拍打着屁股，${target_name}羞恼地瞪大了眼睛……`,
      );
      kojo.打屁股 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.打屁股 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈啊……啊……太…太棒了♡…用……用力……啊啊啊～♡♡」`);
        await era.printAndWait(
          `随着拍打屁股的啪啪声，${target_name}却因为疼痛渐渐兴奋了起来……`,
        );
        kojo.打屁股 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.打屁股 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈啊……啊……好……好痛♡……但是……也…好舒服～♡♡」`);
        await era.printAndWait(
          `随着拍打屁股的啪啪声，${target_name}却因为疼痛渐渐兴奋了起来……`,
        );
        kojo.打屁股 = 4;
        return 0;
      } else if (
        era0(`mark:${target}:0`) == 3 &&
        era0(`mark:${target}:2`) == 3 &&
        (kojo.打屁股 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「唔！………不……啊……」`);
        await era.printAndWait(
          `${target_name}紧闭着眼睛，身体因忍耐疼痛与屈辱而微微颤抖着……`,
        );
        kojo.打屁股 = 3;
        return 0;
      } else if (kojo.打屁股 <= 1 && game.kojo.口上开关 == 2) {
        await era.printAndWait(`「混……混帐！……放……放开${sc()}！……啊！」`);
        kojo.打屁股 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 41) {
    if (kojo.鞭 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      kojo.鞭 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.鞭 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.鞭 = 9;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.鞭 = 8;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.鞭 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.鞭 = 7;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.鞭 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.鞭 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.鞭 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.鞭 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.鞭 = 4;
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.鞭 = 3;
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        kojo.鞭 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 42) {
    if (kojo.针 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      kojo.针 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.针 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.针 = 9;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.针 = 8;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.针 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.针 = 7;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.针 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.针 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.针 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.针 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.针 = 4;
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.针 = 3;
      } else if (kojo.针 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        kojo.针 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`)) {
    if (kojo.眼罩 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      kojo.眼罩 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.眼罩 = 9;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.眼罩 = 8;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.眼罩 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.眼罩 = 7;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.眼罩 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.眼罩 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.眼罩 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.眼罩 = 4;
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.眼罩 = 3;
      } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        kojo.眼罩 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.眼罩着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      kojo.眼罩着脱 = 3;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.眼罩着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      kojo.眼罩着脱 = 2;
    } else if (kojo.眼罩着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait('');
      kojo.眼罩着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 44 && era0(`tequip:${target}:44`)) {
    if (kojo.绳子 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      kojo.绳子 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.绳子 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.绳子 = 9;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.绳子 = 8;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.绳子 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.绳子 = 7;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.绳子 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.绳子 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.绳子 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.绳子 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.绳子 = 4;
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.绳子 = 3;
      } else if (kojo.绳子 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        kojo.绳子 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 44 && era0(`tequip:${target}:44`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      kojo.绳子着脱 = 2;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      kojo.绳子着脱 = 2;
    } else if (kojo.绳子着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait('');
      kojo.绳子着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 45 && era0(`tequip:${target}:45`)) {
    if (kojo.口塞 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      kojo.口塞 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.口塞 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.口塞 = 9;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.口塞 = 8;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.口塞 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.口塞 = 7;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.口塞 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.口塞 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.口塞 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.口塞 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.口塞 = 4;
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.口塞 = 3;
      } else if (kojo.口塞 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        kojo.口塞 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 45 && era0(`tequip:${target}:45`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.口塞着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      kojo.口塞着脱 = 3;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.口塞着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      kojo.口塞着脱 = 2;
    } else if (kojo.口塞着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait('');
      kojo.口塞着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 46 && era0(`tequip:${target}:46`)) {
    if (kojo.灌肠肛塞 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「灌肠……吗？欸……这没试过呢……好哦……来吧～♡」`);
        await era.printAndWait(
          `对于没试过的『花样』，${target_name}都很感兴趣的样子……`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「为了魔王大人，清洁身体是必要的…但…但是……」`);
        await era.printAndWait(`「这种丑态……有点……不想让魔王大人看见呢………」`);
        await era.printAndWait(
          `比起灌肠的痛苦，${target_name}似乎更在意${master_name}的观感……`,
        );
      } else {
        await era.printAndWait(
          `「去……去死！……你脑子里只有这些下作的事情？…不！…啊啊啊！」`,
        );
      }
      kojo.灌肠肛塞 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.灌肠肛塞 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊……啊…屁股…肚子…灌满的感觉♡…啊……好……好棒～♡♡」`,
        );
        await era.printAndWait(
          `${target_name}狼狈地喘息着，似乎沉醉在屁股撑开胀满的快感之中了……`,
        );
        kojo.灌肠肛塞 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.灌肠肛塞 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊…啊…好…好胀……感觉……随时都要排……出来了……啊…啊啊～♡♡」`,
        );
        await era.printAndWait(
          `屁股被撑开胀满的感觉，${target_name}不停喘息呻吟着……`,
        );
        kojo.灌肠肛塞 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.灌肠肛塞 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊…啊…不……不行……这种沉醉在屁股……的丑态♡……啊啊…魔王大人～♡♡」`,
        );
        await era.printAndWait(
          `由于屁股被撑开胀满的快感太过强烈，${target_name}不由自主地呼唤魔王大人的名字……`,
        );
        kojo.灌肠肛塞 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.灌肠肛塞 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊…啊…好…好胀……这……这都是为了魔王大人……唔……」`,
        );
        await era.printAndWait(
          `${target_name}冒着冷汗，咬牙地忍耐着强烈的排泄感……`,
        );
        kojo.灌肠肛塞 = 4;
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.灌肠肛塞 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈啊…啊……不……不……这样……唔！……啊啊……」`);
        await era.printAndWait(
          `异样的鼓胀与快感让${target_name}咬牙地忍耐着……`,
        );
        kojo.灌肠肛塞 = 3;
      } else if (kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「这……这种羞辱……总…总有一天……唔！啊啊啊！」			PRINTFORMW 异样的鼓胀与痛苦，让${target_name}发出屈辱的叫喊……`,
        );
        kojo.灌肠肛塞 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 46 && era0(`tequip:${target}:46`) == 0) {
    if (era0(`talent:${target}:76`) == 1) {
      if (era0(`abl:${target}:3`) >= 3 && era0(`abl:${target}:21`) >= 3) {
        await era.printAndWait(
          `「呀啊啊！看……看啊……都…排……排出来了哦♡……啊……啊啊～♡♡」`,
        );
        await era.printAndWait(
          `${target_name}不知廉耻地展示当场排泄的丑态，甚至还因为宣泄的快感而淫荡地呻吟……`,
        );
        if (era0(`exp:${target}:53`) >= 5) {
          await era.print(
            `从那已经完全扩张开来的地方，似乎还能看见痉挛收缩的肠壁……`,
          );
        }
      } else {
        await era.printAndWait(
          `「呜……啊啊啊……排……排出来了……呜……都弄脏了呢……♡♡」`,
        );
        await era.printAndWait(
          `尽管丑态尽现，${target_name}比起羞耻，似乎更苦恼身体弄脏了的样子……`,
        );
      }
    } else if (era0(`talent:${target}:85`) == 1) {
      if (era0(`abl:${target}:3`) >= 3 && era0(`abl:${target}:21`) >= 3) {
        await era.printAndWait(
          `「啊啊…出…出来了…抱…抱歉…但…但是…好…好舒服啊…啊啊～♡♡」`,
        );
        await era.printAndWait(
          `宣泄的快感让${target_name}不由自主地呻吟了起来，忘记了自己丑态尽现的样子……`,
        );
      } else {
        await era.printAndWait(
          `「啊啊……出……出来了……请……请别看…这…这种……呜……」`,
        );
        await era.printAndWait(
          `在魔王大人面前丑态尽现，${target_name}似乎感到十分地懊恼羞愧……`,
        );
      }
    } else if (era0(`abl:${target}:3`) >= 3 && era0(`abl:${target}:21`) >= 3) {
      await era.printAndWait(`「啊啊……不……不行……嗯……啊啊……」`);
      await era.printAndWait(
        `奇异的宣泄感与羞耻交织着，让${target_name}发出了模糊的呻吟……`,
      );
    } else {
      await era.printAndWait(
        `「不！不要！……啊啊啊！！不…不要看啊……啊啊啊！！」`,
      );
      await era.printAndWait(
        `被迫当场排泄的${target_name}，发出了崩溃似的惨叫……`,
      );
    }
  }

  if (era_flag.selectcom == 55) {
    if (kojo.放置PLAY == 0) {
      if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      kojo.放置PLAY = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`palam:${target}:5`) >= PALAMLV[3] &&
        (kojo.放置PLAY <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.放置PLAY = 4;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.放置PLAY <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.放置PLAY = 3;
      } else if (kojo.放置PLAY <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        kojo.放置PLAY = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 56) {
    if (kojo.交谈 == 0) {
      if (era0(`tequip:${target}:53`)) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「正在录像吗？嘿嘿～正好♡来宣扬魔王大人的伟大吧？」`,
          );
          await era.printAndWait(
            `${target_name}熟练地摆出了一个性感的姿势，露出了魅惑的微笑。`,
          );
          await era.printAndWait(
            `「还在地面上苦苦挣扎的人们啊，如果有幸能看到这个影像，这就是魔神对你们的眷顾。」`,
          );
          await era.printAndWait(
            `「只在魔王的身边才有无上的欢愉，而非虚伪的正义。所谓『正义』也不过是中二病的口号。」`,
          );
          await era.printAndWait(
            `「${sc()}也不想浪费时间，既然口说无凭，请大家接下来眼见为实吧～♡」`,
          );
          await era.printAndWait(
            `说完之后，${target_name}的双颊染上了情欲的红晕，看来已经开始期待接下来的调教内容了……`,
          );
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「正在录像吗？那么不妨来宣扬魔王大人的伟大吧？」`,
          );
          await era.printAndWait(
            `${target_name}仔细地摆好了虔诚的姿势，端庄地宛如要举行祭祀典礼一般。`,
          );
          await era.printAndWait(
            `「还在地面上苦苦挣扎的人们啊，如果有幸能看到这个影像，这就是魔神对你们的眷顾。」`,
          );
          await era.printAndWait(
            `「以前${sc()}也是被所谓的『正义』蒙蔽的一员，然而这个虚伪的名词至今仍在迫害着你们。」`,
          );
          await era.printAndWait(
            `「唯有来到魔王的身边，才有真正的『自由与爱』，只要大家了解这点，才能有和平的一天。」`,
          );
          await era.printAndWait(
            `说完之后，${target_name}露出崇拜的眼神，已经迫不及待将『真正的爱』揭露在大众面前了……`,
          );
        } else {
          await era.printAndWait(
            `「有这闲工夫，怎不去拍拍迷宫中魔物被勇者消灭的影像？那还比较有观赏价值呢！」`,
          );
          await era.printAndWait(
            `除了冷嘲热讽之外，${target_name}完全不想说其他的话语……`,
          );
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「欸？这个时候聊天？呵呵……该不会是想要训练『淫语』的技能？」`,
          );
          await era.printAndWait(
            `${target_name}露出了恍然大悟的神情，意味深长地看着${player_name}……`,
          );
        } else if (era0(`talent:${target}:85`) == 1) {
          if (era_flag.assiplay) {
            await era.printAndWait(
              `「嗯？同在魔王大人麾下，也许交流一下也不错吧？」`,
            );
            await era.printAndWait(
              `${target_name}思考了一下谈话的内容，与${player_name}聊了起来……`,
            );
          } else {
            await era.printAndWait(
              `「嗯？聊天吗？好啊……想知道什么都可以哦！」`,
            );
            await era.printAndWait(
              `${target_name}的眼睛开心的眯起，柔顺地倚在${player_name}的身边轻声细语着……`,
            );
          }
        } else {
          await era.printAndWait(
            `「抱歉…请恕${sc()}没有点亮跟垃圾交流的技巧……」`,
          );
          await era.printAndWait(
            `${target_name}转过了头去，冷淡地发挥着毒舌的本领……`,
          );
        }
      }
      kojo.交谈 = 1;
      return 0;
    } else {
      if (era0(`tequip:${target}:53`)) {
        if (
          era0(`talent:${target}:76`) == 1 &&
          (kojo.交谈 <= 3 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait(
            `「看了上次的水晶球影像，不知大家的『下身』是否有感受到魔神带来的欢愉呢？」`,
          );
          await era.printAndWait(
            `「如果是的话，那${sc()}也很为你们感受到庆幸，来吧，这边随时敞开欢迎哦～♡」`,
          );
          await era.printAndWait(
            `「当然，如果没有感受到的话，那么，也请接下来睁大眼睛继续看吧？」`,
          );
          await era.printAndWait(
            `${target_name}似乎很热心地用身体进行着魔王的传教活动……`,
          );
          kojo.交谈 = 4;
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          (kojo.交谈 <= 2 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait(
            `「身体的反应最是诚实，就像饿了要吃，冷了要取暖一样。」`,
          );
          await era.printAndWait(
            `「几句道德伦理凭什么来拘束${sc()}们本来就具有的天性呢？」`,
          );
          await era.printAndWait(
            `「请不要再被洗脑了，唯有魔王是你们解放与自由的皈依。」`,
          );
          await era.printAndWait(
            `${target_name}似乎热衷于把口才发挥在魔王的传教活动上面……`,
          );
          kojo.交谈 = 3;
        } else if (kojo.交谈 <= 1 || game.kojo.口上开关 == 2) {
          await era.printAndWait(
            `「难道是因为找不到对象，才只会用逼迫的手段吗？哦……真是可悲呢……」`,
          );
          await era.printAndWait(
            `${target_name}依然是平淡地说着气死人不偿命的话……`,
          );
          kojo.交谈 = 2;
        }
      } else {
        if (
          era0(`talent:${target}:76`) == 1 &&
          (kojo.交谈 <= 3 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait(
            `「欸？${sc()}都这个样子了……要聊些什么呢？还不如……」`,
          );
          await era.printAndWait(
            `${target_name}抚弄着自己火热发烫的身体，用无奈的表情看着${player_name}……`,
          );
          kojo.交谈 = 4;
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          (kojo.交谈 <= 2 || game.kojo.口上开关 == 2)
        ) {
          if (era_flag.assiplay) {
            await era.printAndWait(
              `「嗯？好啊，交流一下如何服侍好魔王大人的技巧吧？」`,
            );
            await era.printAndWait(
              `${target_name}思考了一下谈话的内容，与${player_name}聊了起来……`,
            );
          } else {
            await era.printAndWait(
              `「嗯？聊天吗？好啊……${sc()}还想知道更多您的事情！」`,
            );
            await era.printAndWait(
              `${target_name}的眼睛开心的眯起，柔顺地倚在${player_name}的身边轻声细语着……`,
            );
          }
          kojo.交谈 = 3;
        } else if (kojo.交谈 <= 1 || game.kojo.口上开关 == 2) {
          await era.printAndWait(`「可以的话，不想浪费力气跟残渣说话。」`);
          await era.printAndWait(
            `${target_name}依然是平淡地说着气死人不偿命的话……`,
          );
          kojo.交谈 = 2;
        }
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 123) {
    if (kojo.乳夹口交 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      kojo.乳夹口交 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.乳夹口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.乳夹口交 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.乳夹口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.乳夹口交 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.乳夹口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.乳夹口交 = 3;
      } else if (kojo.乳夹口交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        kojo.乳夹口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 125) {
    if (kojo.口交时自慰 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      kojo.口交时自慰 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.口交时自慰 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.口交时自慰 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.口交时自慰 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.口交时自慰 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.口交时自慰 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.口交时自慰 = 3;
      } else if (kojo.口交时自慰 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        kojo.口交时自慰 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 126) {
    if (kojo.手搓口交 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      kojo.手搓口交 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.手搓口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.手搓口交 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.手搓口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.手搓口交 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.手搓口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.手搓口交 = 3;
      } else if (kojo.手搓口交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        kojo.手搓口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 127) {
    if (kojo.真空口交 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      kojo.真空口交 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.真空口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.真空口交 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.真空口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.真空口交 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.真空口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        kojo.真空口交 = 3;
      } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        kojo.真空口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 69) {
    if (kojo.六九式 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      kojo.六九式 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.六九式 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.六九式 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.六九式 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.六九式 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.六九式 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.六九式 = 3;
      } else if (kojo.六九式 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        kojo.六九式 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 124) {
    if (kojo.深喉 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      kojo.深喉 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.真空口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.深喉 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.真空口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.深喉 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.真空口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.深喉 = 3;
      } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        kojo.深喉 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 80) {
    if (kojo.强制口交 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      kojo.强制口交 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.强制口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.强制口交 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.强制口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.强制口交 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.强制口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        kojo.强制口交 = 3;
      } else if (kojo.强制口交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        kojo.强制口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 87) {
    const { piercing_state } = require('#/system/train/piercing-state');
    const P = piercing_state.p;

    if (kojo.穿环 == 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:76`) == 1) {
        if (chara(target).train.穿环状态 & P) {
          await era.printAndWait('');

          if (P == 1) {
            await era.printAndWait('');
          } else if (P == 2) {
            await era.printAndWait('');
          } else if (P == 4) {
            await era.printAndWait('');
          } else if (P == 8) {
            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              await era.printAndWait('');
            } else {
              await era.printAndWait('');
            }
          } else if (P == 16) {
            await era.printAndWait('');
          } else if (P == 32) {
            await era.printAndWait('');
          } else if (P == 64) {
            await era.printAndWait('');
          }
        } else {
          await era.printAndWait('');
        }
      } else if (era0(`talent:${target}:85`) == 1) {
        if (chara(target).train.穿环状态 & P) {
          await era.printAndWait('');

          if (P == 1) {
            await era.printAndWait('');
          } else if (P == 2) {
            await era.printAndWait('');
          } else if (P == 4) {
            await era.printAndWait('');
          } else if (P == 8) {
            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              await era.printAndWait('');
            } else {
              await era.printAndWait('');
            }
          } else if (P == 16) {
            await era.printAndWait('');
          } else if (P == 32) {
            await era.printAndWait('');
          } else if (P == 64) {
            await era.printAndWait('');
          }
        } else {
          await era.printAndWait('');
        }
      } else {
        if (chara(target).train.穿环状态 & P) {
          await era.printAndWait('');

          if (P == 1) {
            await era.printAndWait('');
          } else if (P == 2) {
            await era.printAndWait('');
          } else if (P == 4) {
            await era.printAndWait('');
          } else if (P == 8) {
            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              await era.printAndWait('');
            } else {
              await era.printAndWait('');
            }
          } else if (P == 16) {
            await era.printAndWait('');
          } else if (P == 32) {
            await era.printAndWait('');
          } else if (P == 64) {
            await era.printAndWait('');
          }
        } else {
          await era.printAndWait('');
        }
      }
      kojo.穿环 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait('');
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.穿环 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (chara(target).train.穿环状态 & P) {
          if (P == 1) {
            await era.printAndWait('');
          } else if (P == 2) {
            await era.printAndWait('');
          } else if (P == 4) {
            await era.printAndWait('');
          } else if (P == 8) {
            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              await era.printAndWait('');
            } else {
              await era.printAndWait('');
            }
          } else if (P == 16) {
            await era.printAndWait('');
          } else if (P == 32) {
            await era.printAndWait('');
          } else if (P == 64) {
            await era.printAndWait('');
          }
        } else {
          await era.printAndWait('');
        }
        kojo.穿环 = 4;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.穿环 <= 2 || game.kojo.口上开关 == 2)
      ) {
        if (chara(target).train.穿环状态 & P) {
          if (P == 1) {
            await era.printAndWait('');
          } else if (P == 2) {
            await era.printAndWait('');
          } else if (P == 4) {
            await era.printAndWait('');
          } else if (P == 8) {
            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              await era.printAndWait('');
            } else {
              await era.printAndWait('');
            }
          } else if (P == 16) {
            await era.printAndWait('');
          } else if (P == 32) {
            await era.printAndWait('');
          } else if (P == 64) {
            await era.printAndWait('');
          }
        } else {
          await era.printAndWait('');
        }
        kojo.穿环 = 3;
      } else if (kojo.穿环 <= 1 || game.kojo.口上开关 == 2) {
        if (chara(target).train.穿环状态 & P) {
          if (P == 1) {
            await era.printAndWait('');
          } else if (P == 2) {
            await era.printAndWait('');
          } else if (P == 4) {
            await era.printAndWait('');
          } else if (P == 8) {
            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              await era.printAndWait('');
            } else {
              await era.printAndWait('');
            }
          } else if (P == 16) {
            await era.printAndWait('');
          } else if (P == 32) {
            await era.printAndWait('');
          } else if (P == 64) {
            await era.printAndWait('');
          }
        } else {
          await era.printAndWait('');
        }
        kojo.穿环 = 2;
      }
    }
    return 0;
  }

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
    return 0;
  }

  const P_lube =
    (era.get(`palam:${target}:3`) || 0) + (era.get(`delta:${target}:3`) || 0);
  if (P_lube > PALAMLV[2] && kojo.首次润滑Lv2 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      if (era_flag.selectcom == 50) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
    } else {
      if (era_flag.selectcom == 50) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
    }
    kojo.首次润滑Lv2 = 1;
  }

  const P_lust =
    (era.get(`palam:${target}:5`) || 0) + (era.get(`delta:${target}:5`) || 0);
  if (P_lust > PALAMLV[2] && kojo.首次欲情Lv2 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      if (era_flag.selectcom == 51) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
    } else {
      if (era_flag.selectcom == 51) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
    }
    kojo.首次欲情Lv2 = 1;
  }

  const P_shame =
    (era.get(`palam:${target}:8`) || 0) + (era.get(`delta:${target}:8`) || 0);
  if (P_shame > PALAMLV[2] && kojo.首次耻情Lv2 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    kojo.首次耻情Lv2 = 1;
  }

  const P_fear =
    (era.get(`palam:${target}:10`) || 0) + (era.get(`delta:${target}:10`) || 0);
  if (P_fear > PALAMLV[2] && kojo.首次恐怖Lv2 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    kojo.首次恐怖Lv2 = 1;
  }

  if (era0(`nowex:${target}:0`) > 0 && kojo.首次C绝顶 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait('');
    } else {
      if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
        await era.printAndWait(`「不！不要！呜！要……要射了……唔!……啊…啊～♡」`);
        await era.printAndWait(
          `${target_name}第一次在调教中，因为阴茎的快感太过强烈而射精了！！`,
        );
      } else {
        await era.printAndWait(`「不！不要！呜！要……要去了呀……唔!……啊…啊～♡」`);
        await era.printAndWait(
          `${target_name}第一次在调教中，因为阴蒂的快感太过强烈而高潮了！！`,
        );
      }
      await era.printAndWait(
        `${target_name}睁大着眼睛满面红霞，不知道是因为羞愤？还是太有感觉造成的呢？`,
      );
    }
    kojo.首次C绝顶 = 1;
  }

  if (era0(`nowex:${target}:1`) > 0 && kojo.首次V绝顶 == 0) {
    if (era0(`talent:${target}:76`) == 1) {
      await era.printAndWait('');
    } else if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait('');
    } else {
      await era.printAndWait(`「不！不要！呜！要……要去了呀……唔!……啊…啊～♡」`);
      await era.printAndWait(
        `${target_name}第一次在调教中，因为蜜穴的快感太过强烈而高潮了！！`,
      );
      await era.printAndWait(
        `${target_name}睁大着眼睛满面红霞，不知道是因为羞愤？还是太有感觉造成的呢？`,
      );
    }
    kojo.首次V绝顶 = 1;
  }

  if (era0(`nowex:${target}:2`) > 0 && kojo.首次A绝顶 == 0) {
    if (era0(`talent:${target}:76`) == 1) {
      await era.printAndWait('');
    } else if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait('');
    } else {
      await era.printAndWait(
        `「不！不要！呜！怎……怎么会用这种地方……唔!……啊…啊～♡」`,
      );
      await era.printAndWait(
        `${target_name}第一次在调教中，因为肛门的快感太过强烈而高潮了！！`,
      );
      await era.printAndWait(
        `${target_name}睁大着眼睛满面红霞，不知道是因为羞愤？还是太有感觉造成的呢？`,
      );
    }
    kojo.首次A绝顶 = 1;
  }

  if (era0(`nowex:${target}:3`) > 0 && kojo.首次B绝顶 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait('');
    } else {
      await era.printAndWait(
        `「不！不要！呜！胸部…胸部要……啊！嗯啊……啊啊啊～♡」`,
      );
      await era.printAndWait(
        `${target_name}第一次在调教中，因为胸部的快感太过强烈而高潮了！！`,
      );
      await era.printAndWait(
        `${target_name}睁大着眼睛满面红霞，不知道是因为羞愤？还是太有感觉造成的呢？`,
      );
    }
    kojo.首次B绝顶 = 1;
  }

  const A =
    (era.get(`delta:${target}:11`) || 0) + (era.get(`delta:${target}:12`) || 0);
  if (game.train.处女丧失 == 1 && kojo.处女丧失 == 0) {
    if (game.train.主人导致处女丧失 == 1) {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (A < 500 || game.system.反抗刻印回避 == 1)
      ) {
        await era.printAndWait(
          `「啊～终于能摆脱处女了……嘿嘿♡……再多做一点开心的事情吧？」`,
        );
        await era.printAndWait(
          `听那期待的语气，看来破处的些许的疼痛早被${target_name}置之脑后了……`,
        );
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (A < 500 || game.system.反抗刻印回避 == 1)
      ) {
        await era.printAndWait(
          `「本来就是留给魔王大人的东西，所以…尽管有一点痛，但是很幸福♡」`,
        );
        await era.printAndWait(
          `${target_name}眯起了眼睛，露出了满足而幸福的微笑。`,
        );
      } else {
        await era.printAndWait(`「尽管${sc()}也没天真到以为能保住……但是……」`);
        await era.printAndWait(
          `${target_name}的语调虽然冰冷平淡…但是眼神当中却满溢着汹涌的杀意……`,
        );
      }
    } else {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「唔…能摆脱处女就好…这样～可以玩的花样更多了呢♡♡」`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「明明希望第一次是给魔王大人的……」`);
      } else {
        await era.printAndWait(`「果然还是……呜……」`);
      }
    }
    kojo.处女丧失 = 1;
  }
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
    return 0;
  }

  if (game.system.苦痛刻印变动 == 3 && kojo.苦痛刻印Lv3 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「痛……但…但是……如果是您的话……没有关系……」`);
    } else {
      await era.printAndWait(`「啊！不！不要了……好痛！饶了${sc()}吧……」`);
    }
    kojo.苦痛刻印Lv3 = 1;
  }

  if (game.system.快乐刻印变动 == 3 && kojo.快乐刻印Lv3 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「这…这是……好……好棒……太……太舒服了……啊啊～♡」`);
    } else {
      await era.printAndWait(`「这…这是………不……不……这样……不行……啊啊～♡」`);
    }
    kojo.快乐刻印Lv3 = 1;
  }

  if (game.system.屈服刻印变动 == 3 && kojo.屈服刻印Lv3 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait('');
    } else {
      await era.printAndWait(`「再…怎么抵抗……也是……没用的吧……」`);
    }
    kojo.屈服刻印Lv3 = 1;
  }

  if (game.system.反抗刻印变动 == 3 && kojo.反抗刻印Lv3 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait('');
    } else {
      await era.printAndWait(
        `「可恶！真是……不敢相信！这个世上怎么会有像你这样的垃圾呢！？」`,
      );
    }
    kojo.反抗刻印Lv3 = 1;
  }
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
    if (era0(`talent:${target}:9`) == 1) {
      await era.printAndWait(
        `${target_name}神情恍惚，一边喘息着流出了口水，一边不停地用手摩擦自己的下身……`,
      );
    } else if (Q == 1) {
      await era.printAndWait(
        `「啊！${assi_name}……${assi_name}……好想要……嗯啊！啊啊～♡」`,
      );
      await era.printAndWait(
        `${target_name}呢喃着叫唤${assi_name}的名字，一边忘情地进行自慰……`,
      );
    } else if (Q == 2) {
      await era.printAndWait(
        `「一想到狗狗的肉棒……啊啊！怎么办？手停不下来了啊！嗯啊啊～♡」`,
      );
      await era.printAndWait(
        `${target_name}饥渴地摇晃起屁股，一边自慰着一边做着宛如母狗求欢的姿势……`,
      );
    } else {
      if (
        era0(`talent:${target}:76`) &&
        (kojo.调教后自慰 < 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「这里…好想要啊♡……想要……更粗的…东西♡♡…」`);
        await era.printAndWait(
          `${target_name}的双眼因为情欲而通红，像是欲求不满似地不停自慰着……`,
        );
        kojo.调教后自慰 = 4;
      } else if (
        era0(`talent:${target}:85`) &&
        (kojo.调教后自慰 < 3 || game.kojo.口上开关 == 2)
      ) {
        await era.print(`「下身……已经湿的不像样了……但…但是……还是好想要啊～♡」`);
        await era.printAndWait(
          `${target_name}一边喘息着自慰，一边用甜腻的声音呻吟着……`,
        );
        kojo.调教后自慰 = 3;
      } else if (
        era0(`abl:${target}:31`) >= 3 &&
        (kojo.调教后自慰 < 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「明明……已经……呜！不……不行……停不下来了！嗯啊啊～♡」`,
        );
        kojo.调教后自慰 = 2;
      } else if (kojo.调教后自慰 < 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「不……不行……呜啊……好…好热……啊啊……」`);
        kojo.调教后自慰 = 1;
      }
    }
  }

  if (game.train.初吻与自我口上 == 2) {
    if (
      era0(`talent:${target}:76`) &&
      (kojo.百合PLAY < 5 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      kojo.百合PLAY = 5;
    } else if (
      era0(`talent:${target}:85`) &&
      (kojo.百合PLAY < 4 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      kojo.百合PLAY = 4;
    } else if (
      era0(`abl:${target}:33`) >= 3 &&
      (kojo.百合PLAY < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      kojo.百合PLAY = 3;
    } else if (
      era0(`abl:${target}:22`) >= 3 &&
      (kojo.百合PLAY < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      kojo.百合PLAY = 2;
    } else if (kojo.百合PLAY < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait('');
      kojo.百合PLAY = 1;
    }
  }

  if (game.train.初吻与自我口上 == 3) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.朝口交 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      kojo.朝口交 = 3;
    } else if (
      era0(`talent:${target}:85`) &&
      (kojo.朝口交 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      kojo.朝口交 = 3;
    } else if (
      era0(`abl:${target}:16`) >= 5 &&
      (kojo.朝口交 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      kojo.朝口交 = 2;
    } else if (kojo.朝口交 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait('');
      kojo.朝口交 = 1;
    }
  }

  if (game.train.初吻与自我口上 == 4) {
    if (
      era0(`abl:${target}:2`) >= 4 &&
      (kojo.调教后性交 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「这里还是好空虚，还想要更多更大的东西来填满！」`,
      );
      kojo.调教后性交 = 2;
    } else if (kojo.调教后性交 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「身体还是好热，可以……再继续吗？」`);
      kojo.调教后性交 = 1;
    }
  }

  if (game.train.初吻与自我口上 == 5) {
    if (kojo.夜袭 < 1 || game.kojo.口上开关 == 2) {
      await era.print(
        [
          `「夜晚好冷，想跟魔王大人一起睡呢……」`,
          `「一起睡的话，可以做做『运动』也可以相拥取暖，不觉得是个好主意吗？」`,
        ][rand_n(2)],
      ); // PRINTDATAL
      await era.printAndWait('');
      kojo.夜袭 = 1;
    }
  }

  if (game.train.初吻与自我口上 == 6) {
    if (era0(`talent:${target}:85`) && era0(`mark:${target}:3`) < 3) {
      await era.printAndWait(
        `在你打算卖掉${target_name}之前，${target_name}慌慌张张地来到了你的面前……`,
      );
      await era.printAndWait(
        `一向注重仪表的${target_name}，发丝凌乱双颊通红并带着急促的喘息。`,
      );
      await era.printAndWait(`「魔…魔王大人……您……您……」`);
      await era.printAndWait(
        `${target_name}的情绪起伏过大，平时灵活的口才现在却哽咽地连话也说不完整……`,
      );
      await era.printAndWait(
        `似乎想对你露出笑容，无奈嘴角只能勾出扭曲的形状，眼泪不停地沿着脸颊垂落而下……`,
      );
      await era.printAndWait(`「以后…请您……多多保重……」`);
      await era.printAndWait(
        `${target_name}深深地鞠躬，转身踉踉跄跄地随着商人离去了……`,
      );
    } else if (era0(`mark:${target}:3`) == 3) {
      await era.printAndWait(`「居然……敢把${sc()}当成商品一样地贩卖……」`);
      await era.printAndWait(
        `${target_name}瞪视过来的眼神带着愤怒与杀意，但是无论他再怎么地反抗，最后还是被商人捆绑带走了……`,
      );
    } else if (era0(`talent:${target}:76`)) {
      await era.printAndWait(
        `「虽然有点不舍，但是，这个淫荡的身体如果能对魔王大人有所贡献的话……」`,
      );
      await era.printAndWait(`${target_name}眯起了眼睛露出了魅惑的笑容。`);
      await era.printAndWait(
        `「因为您，${sc()}才能真正体验到所谓无上的『欢愉』，所以………」`,
      );
      await era.printAndWait(
        `「以后就算在新的地方，${sc()}也会好好地发挥所学的本领……」`,
      );
      await era.printAndWait(
        `${target_name}潇洒地挥挥手与你告别，挽着商人的手随之离去了……`,
      );
    } else {
      await era.printAndWait(
        `「从一个垃圾堆换到另一个垃圾堆？反正都是一样……」`,
      );
      await era.printAndWait(
        `${target_name}似乎毫不在乎，平淡地随着商人离去了……`,
      );
    }
    if (!era0(`talent:${target}:122`)) {
      await sell_maturo_k0(target, { rand }); // CALL SELL_MATURO_K0
    }
  }

  if (game.train.初吻与自我口上 == 11) {
    if (kojo.妊娠发觉 >= 1) {
      return 0;
    }

    if (era0(`talent:${target}:9`) == 1) {
      await era.printAndWait(
        `「好像有奇怪的东西在肚子里面……一定是生病了吧？」`,
      );
    } else if (
      era0(`talent:${target}:85`) &&
      chara(target).event.妊娠相手 == 1
    ) {
      await era.printAndWait(`「会长的像谁呢？呵呵，好期待啊～」`);
    } else {
      await era.printAndWait(`「不……这…这不是真的！」`);
    }
    kojo.妊娠发觉 = 1;
  }

  if (game.train.初吻与自我口上 == 12) {
    if (kojo.生产 >= 1) {
      return 0;
    }

    if (era0(`talent:${target}:9`) == 1) {
      await era.printAndWait(
        `「有什么东西要从肚子出来了……不……怪物……是怪物啊！」`,
      );
    } else if (
      era0(`talent:${target}:85`) &&
      chara(target).event.妊娠相手 == 1
    ) {
      await era.printAndWait(`「真是个健康可爱的宝宝呢，对吧？」`);
      await era.printAndWait(
        `${target_name}亲昵地亲吻着孩子的脸颊，露出了幸福的笑容。`,
      );
    } else {
      await era.printAndWait(`「这样的孩子……」`);
      await era.printAndWait(
        `${target_name}用双手捂住了自己的脸庞，试着掩饰心中复杂的情绪……`,
      );
    }
    kojo.生产 = 1;
  }

  if (game.train.初吻与自我口上 == 13) {
    if (era0(`talent:${target}:153`)) {
      await era.printAndWait('');
    } else if (era0(`talent:${target}:154`)) {
      await era.printAndWait('');
    }
    kojo.育儿室 = 1;
  }

  if (game.train.初吻与自我口上 == 14) {
    await era.printAndWait('');
    kojo.亲离 = 1;
  }

  if (game.train.初吻与自我口上 == 999) {
    if (era0(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  }

  if (game.train.初吻与自我口上 == 998) {
    if (era0(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  }

  game.train.初吻与自我口上 = 0;

  return 0;
}

// @dungeon_ryouzyoku_k15
async function dungeon_ryouzyoku_k15() {
  const target = era_flag.target;
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%

  if (era0(`talent:${target}:0`) == 1) {
    await era.printAndWait(
      `「可恶！走…走开！为什么${sc()}的第一次要被你们这些残渣……呜！」`,
    );
    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      await era.printAndWait(`「…………可恶!」`);
      return 0;
    } else if (
      era0(`talent:${target}:17`) == 1 ||
      era0(`talent:${target}:31`) == 1 ||
      era0(`talent:${target}:36`) == 1
    ) {
      await era.printAndWait(
        `「反正你们只是要泄欲吧……只要不伤性命的话，这个身体…就随便用好了……」`,
      );

      if (era0(`talent:${target}:106`) == 1 || era0(`exp:${target}:1`) > 0) {
        await era.printAndWait(
          `「如果可以放过${sc()}的前面，用后面这里也很紧，不想试试吗？」`,
        );
      }

      if (era0(`exp:${target}:22`) > 0) {
        await era.printAndWait(`「或者喜欢从嘴巴来的话，也可以帮忙舔的……」`);
      }
    } else if (
      era0(`talent:${target}:11`) == 1 ||
      era0(`talent:${target}:12`) == 1 ||
      era0(`talent:${target}:15`) == 1 ||
      era0(`talent:${target}:30`) == 1 ||
      era0(`talent:${target}:34`) == 1
    ) {
      await era.printAndWait(
        `「滚开！……敢动${sc()}的话……一定……一定会杀了你们！！」`,
      );
    } else if (
      era0(`talent:${target}:10`) == 1 ||
      era0(`talent:${target}:26`) == 1
    ) {
      await era.printAndWait(`「难道……这次……真的要被…………」`);
    } else {
      await era.printAndWait(`「这种行为……真不愧是最低级的垃圾！」`);
    }
  } else {
    await era.printAndWait('');
    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      await era.printAndWait(`「…………可恶!」`);
      return 0;
    } else if (
      era0(`talent:${target}:17`) == 1 ||
      era0(`talent:${target}:31`) == 1 ||
      era0(`talent:${target}:36`) == 1
    ) {
      await era.printAndWait(
        `「反正你们只是要泄欲吧……只要不伤性命的话，这个身体…就随便用好了……」`,
      );

      if (era0(`talent:${target}:106`) == 1 || era0(`exp:${target}:1`) > 0) {
        await era.printAndWait(
          `「如果可以放过${sc()}的话，后面这里也很紧，不想试试吗？」`,
        );
      }

      if (era0(`exp:${target}:22`) > 0) {
        await era.printAndWait(`「或者喜欢从嘴巴来的话，也可以帮忙舔的……」`);
      }
    } else if (
      era0(`talent:${target}:11`) == 1 ||
      era0(`talent:${target}:12`) == 1 ||
      era0(`talent:${target}:15`) == 1 ||
      era0(`talent:${target}:30`) == 1 ||
      era0(`talent:${target}:34`) == 1
    ) {
      await era.printAndWait(
        `「滚开！……敢动${sc()}的话……一定……一定会杀了你们！！」`,
      );
    } else if (
      era0(`talent:${target}:10`) == 1 ||
      era0(`talent:${target}:26`) == 1
    ) {
      await era.printAndWait(`「难道……这次……真的要被…………」`);
    } else {
      await era.printAndWait(`「这种行为……真不愧是最低级的垃圾！」`);
    }
  }

  return 0;
}

// @dungeon_ryouzyoku_after_k15
async function dungeon_ryouzyoku_after_k15() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%

  if (era0(`talent:${target}:0`) == 1) {
    await era.printAndWait(
      `「还好${sc()}的处女还在…不然…一定要杀了你们…！！」`,
    );
    await era.printAndWait(`${target_name}`);
    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      await era.printAndWait(`「不……不………呜！」`);
      return 0;
    }

    if (era0(`exp:${target}:1`) > 20) {
      await era.printAndWait(`「合不起来……可恶！……居然…居然全部都射在里面！」`);
    }
    await era.printAndWait(
      `${target_name}那被多次凌辱的肛穴一时无法合拢，白浊腥臭的体液正从其中泊泊地流出……`,
    );

    if (era0(`exp:${target}:22`) > 20) {
      await era.printAndWait(`「咳咳…呕…呕……不行……满嘴……都是……」`);
    }
    await era.printAndWait(
      `被怪物多次侵犯口腔的${target_name}，带着泪光试着将灌进去的精液催吐出来……`,
    );
  } else {
    await era.printAndWait(`「太过分了……到底……要几次……才会停止……」`);

    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      await era.printAndWait(`「不……不………呜！」`);
      return 0;
    }

    if (era0(`exp:${target}:0`) > 20) {
      await era.printAndWait(
        `「那里……要…要坏掉了……什么东西……呜……要流出来了啊！」`,
      );
      await era.printAndWait(
        `${target_name}的蜜穴被多次地奸淫，双腿几乎无法合拢，白浊腥臭的体液正从股间泊泊地流出……`,
      );
    }

    if (era0(`exp:${target}:1`) > 20) {
      await era.printAndWait(`「合不起来……可恶！居…居然全部都射在里面！」`);
    }
    await era.printAndWait(
      `${target_name}那被多次凌辱的肛穴一时无法合拢，白浊腥臭的体液正从其中泊泊地流出……`,
    );

    if (era0(`exp:${target}:22`) > 20) {
      await era.printAndWait(`「咳咳…呕…呕……不行……满嘴……都是……」`);
    }
    await era.printAndWait(
      `被怪物多次侵犯口腔的${target_name}，带着泪光试着将灌进去的精液催吐出来……`,
    );
  }

  return 0;
}

// @benki_koujo_k15
async function benki_koujo_k15(rand) {
  void rand;
  const a = era_flag.target;

  if (game.train.肉便器行动 == 0) {
    if (era0(`talent:${a}:76`) == 1) {
      await era.printAndWait('');
    } else if (era0(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era0(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 == 1) {
    if (era0(`talent:${a}:76`) == 1) {
      await era.printAndWait('');
    } else if (era0(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era0(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 == 2) {
    if (era0(`talent:${a}:76`) == 1) {
      await era.printAndWait('');
    } else if (era0(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era0(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 == 3) {
    if (era0(`talent:${a}:76`) == 1) {
      await era.printAndWait('');
    } else if (era0(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era0(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 == 4) {
    if (era0(`talent:${a}:76`) == 1) {
      await era.printAndWait('');
    } else if (era0(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era0(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 == 5) {
    if (era0(`talent:${a}:76`) == 1) {
      await era.printAndWait('');
    } else if (era0(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era0(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  }

  return 0;
}

// @dungeon_victory_k15
async function dungeon_victory_k15(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const a = target;

  await era.printAndWait('');

  if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
    await era.printAndWait(`「胜利是理所当然。」`);

    return 0;
  } else if (
    era0(`talent:${target}:11`) == 1 ||
    era0(`talent:${target}:12`) == 1 ||
    era0(`talent:${target}:15`) == 1 ||
    era0(`talent:${target}:30`) == 1 ||
    era0(`talent:${target}:34`) == 1
  ) {
    if (rand_n(3) == 0) {
      await era.printAndWait(`「去地狱反省吧！」`);
    } else if (rand_n(2) == 0) {
      await era.printAndWait(`「一群废物！」`);
    } else {
      await era.printAndWait(`「全部都消失吧！」`);
    }
  } else if (
    era0(`talent:${target}:10`) == 1 ||
    era0(`talent:${target}:26`) == 1
  ) {
    await era.printAndWait(`「呼……好歹是赢了。」`);

    return 0;
  } else {
    if (rand_n(3) == 0) {
      await era.printAndWait(`「跟这种杂鱼战斗，根本没有悬念。」`);
    } else if (rand_n(2) == 0) {
      await era.printAndWait(`「不废吹灰之力。」`);
    } else {
      await era.printAndWait(`「嗯？这就胜利了吗？」`);
    }
  }

  if (
    (era0(`base:${a}:0`) * 100) / era0(`maxbase:${a}:0`) < 50 ||
    (era0(`base:${a}:1`) * 100) / era0(`maxbase:${a}:1`) < 50
  ) {
    await era.printAndWait(`「一点皮肉伤，不算什么。」`);
  } else {
    await era.printAndWait(`「这么弱的敌人，真像纸糊的一样。」`);
  }

  return 0;
}

// @dungeon_attack_k15
async function dungeon_attack_k15(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;

  if (chara(target).invasion.状态 == 2) {
    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      await era.printAndWait(`「…………」`);

      return 0;
    } else if (
      era0(`talent:${target}:11`) == 1 ||
      era0(`talent:${target}:12`) == 1 ||
      era0(`talent:${target}:15`) == 1 ||
      era0(`talent:${target}:30`) == 1 ||
      era0(`talent:${target}:34`) == 1
    ) {
      if (rand_n(3) == 0) {
        await era.printAndWait(`「哼！……这是什么玩意？」`);
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「白费力气！」`);
      } else {
        await era.printAndWait(`「真碍眼！」`);
      }
    } else if (
      era0(`talent:${target}:10`) == 1 ||
      era0(`talent:${target}:26`) == 1
    ) {
      await era.printAndWait(`「放弃吧……」`);

      return 0;
    } else {
      if (rand_n(3) == 0) {
        await era.printAndWait(`「别做无谓的抵抗。」`);
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「邪不胜正。」`);
      } else {
        await era.printAndWait(`「残渣。」`);
      }
    }
  } else {
    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      await era.printAndWait(`「魔王大人的命令是绝对的。」`);

      return 0;
    } else if (
      era0(`talent:${target}:11`) == 1 ||
      era0(`talent:${target}:12`) == 1 ||
      era0(`talent:${target}:15`) == 1 ||
      era0(`talent:${target}:30`) == 1 ||
      era0(`talent:${target}:34`) == 1
    ) {
      if (rand_n(3) == 0) {
        await era.printAndWait(`「哼！一群蝼蚁！」`);
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「真是螳臂挡车。」`);
      } else {
        await era.printAndWait(`「不自量力！」`);
      }
    } else if (
      era0(`talent:${target}:10`) == 1 ||
      era0(`talent:${target}:26`) == 1
    ) {
      await era.printAndWait(`「为了魔王大人……！」`);

      return 0;
    } else {
      if (rand_n(3) == 0) {
        await era.printAndWait(`「就这种程度吗？」`);
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「来这种地方还想全身而退吗？」`);
      } else {
        await era.printAndWait(`「做好觉悟吧！」`);
      }
    }
  }

  return 0;
}

// @ntr_koujo_k15
async function ntr_koujo_k15(rand, P) {
  void rand;
  const target = era_flag.target;
  P = P ?? 0;

  if (chara(target).kojo.NTR再捕获 == 0) {
    // CFLAG:650  = 1（变量语义：CFLAG 族，650）
    chara(target).kojo.NTR再捕获 = 1;
  }

  if (P == 1) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    // CFLAG:651  = 1（变量语义：CFLAG 族，651）
    chara(target).kojo.NTR_651 = 1;
  } else if (P == 2) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    // CFLAG:652  = 1（变量语义：CFLAG 族，652）
    chara(target).kojo.NTR_652 = 1;
  } else if (P == 3) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    // CFLAG:653  = 1（变量语义：CFLAG 族，653）
    chara(target).kojo.NTR_653 = 1;
  } else if (P == 4) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    // CFLAG:654  = 1（变量语义：CFLAG 族，654）
    chara(target).kojo.NTR_654 = 1;
  } else if (P == 5) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    // CFLAG:655  = 1（变量语义：CFLAG 族，655）
    chara(target).kojo.NTR_655 = 1;
  } else if (P == 6) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    // CFLAG:656  = 1（变量语义：CFLAG 族，656）
    chara(target).kojo.NTR_656 = 1;
  } else if (P == 7) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    // CFLAG:657  = 1（变量语义：CFLAG 族，657）
    chara(target).kojo.NTR_657 = 1;
  } else if (P == 20) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  }

  return 0;
}

// @exucution_koujo_k15
async function exucution_koujo_k15(rand) {
  void rand;

  if (game.event.犬射精或处刑口上 == 4) {
    await era.printAndWait('');
  } else if (game.event.犬射精或处刑口上 == 5) {
    await era.printAndWait('');
  } else if (game.event.犬射精或处刑口上 == 6) {
    await era.printAndWait('');
  } else if (game.event.犬射精或处刑口上 == 7) {
    await era.printAndWait('');
  }
}

// @museum_koujo_k15
async function museum_koujo_k15(rand) {
  void rand;

  if (game.event.博物馆口上 == 0) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 == 1) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 == 2) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 == 3) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 == 4) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 == 5) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 == 6) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 == 7) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 == 8) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 == 9) {
    await era.printAndWait('');
  }
}

// @banishment_koujo_k15
async function banishment_koujo_k15(rand) {
  void rand;

  if (game.event.流放口上 == 0) {
    await era.printAndWait('');
  } else if (game.event.流放口上 == 1) {
    await era.printAndWait('');
  } else if (game.event.流放口上 == 2) {
    await era.printAndWait('');
  } else if (game.event.流放口上 == 3) {
    await era.printAndWait('');
  } else if (game.event.流放口上 == 4) {
    await era.printAndWait('');
  }
}

// @public_exucution_koujo_k15
async function public_exucution_koujo_k15(rand) {
  void rand;

  if (game.event.公开处刑口上 == 0) {
    await era.printAndWait('');
  } else if (game.event.公开处刑口上 == 1) {
    await era.printAndWait('');
  } else if (game.event.公开处刑口上 == 2) {
    await era.printAndWait('');
  }
}

// @grotesque_koujo_k15
async function grotesque_koujo_k15(rand) {
  void rand;

  if (game.event.猎奇处刑口上 == 0) {
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 == 1) {
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 == 2) {
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 == 3) {
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 == 4) {
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 == 5) {
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 == 6) {
    await era.printAndWait('');
  }
}

// @enterenemy_koujo_k15
async function enterenemy_koujo_k15(rand) {
  void rand;
  const a = era_flag.target;
  const sc = () => self_call(a); // %SELF_CALL(A)%：EVENT_K 分发前 TARGET=A（#233）

  if (era0(`talent:${a}:21`) == 1 || era0(`talent:${a}:22`) == 1) {
    await era.printAndWait(`「魔王…吗………」`);
  } else if (
    era0(`talent:${a}:11`) == 1 ||
    era0(`talent:${a}:12`) == 1 ||
    era0(`talent:${a}:15`) == 1 ||
    era0(`talent:${a}:30`) == 1 ||
    era0(`talent:${a}:34`) == 1
  ) {
    await era.printAndWait(`「就让${sc()}来看看魔王有什么本事吧！」`);
  } else if (era0(`talent:${a}:10`) == 1 || era0(`talent:${a}:26`) == 1) {
    await era.printAndWait(`「魔王…是不应该现世的………」`);
  } else {
    await era.printAndWait(`「就算是魔王……也一定有击倒的办法……」`);
  }
}

// @gohoubi_request_koujo_k15
async function gohoubi_request_koujo_k15(rand) {
  void rand;
  const a = era_flag.target;
  const a_name = chara_callname(a); // %SAVESTR:A%
  const sc = () => self_call(a); // %SELF_CALL(TARGET)%：EVENT_K 分发前 TARGET=A（#233）

  if (chara(a).stronghold.要求奖赏 == 0) {
    await era.printAndWait(`「迎击成功的话，${sc()}想要一笔赏金！」`);
  } else if (
    chara(a).stronghold.要求奖赏 == 1 ||
    chara(a).stronghold.要求奖赏 == 2 ||
    chara(a).stronghold.要求奖赏 == 3
  ) {
    // 原作是一整行：无后缀 PRINTFORM/PRINT 连续
    // 不换行，末行 PRINTFORMW 才收行。兽名三档的判据（:6141/:6143/:6145）提到
    // 语句外当取值、文本留在输出语句里（#625）
    const beast_word =
      chara(a).stronghold.要求奖赏 == 1
        ? '狗'
        : chara(a).stronghold.要求奖赏 == 2
          ? '猪'
          : '马';
    await era.printAndWait(
      `「迎击成功的话，请让${sc()}跟` + beast_word + `进行交配好吗？」`,
    );
  } else if (chara(a).stronghold.要求奖赏 == 4) {
    await era.printAndWait(
      `「迎击成功的话，能否请魔王大人给${sc()}一个吻呢？」`,
    );
  } else if (chara(a).stronghold.要求奖赏 == 5) {
    await era.printAndWait(
      `「迎击成功的话，想要让魔王大人射在${sc()}身体里面！」`,
    );
  } else if (chara(a).stronghold.要求奖赏 == 6) {
    await era.printAndWait(
      `「迎击成功的话，魔王大人能否将精液赏赐给${sc()}呢？」`,
    );
  } else if (chara(a).stronghold.要求奖赏 == 7) {
    await era.printAndWait(`「迎击成功的话，${sc()}想被很多人一起轮奸！」`);
  } else if (chara(a).stronghold.要求奖赏 == 8) {
    await era.printAndWait(
      `「迎击成功的话，${sc()}想要品尝魔王大人的『黄金甘露』！」`,
    );
  } else if (chara(a).stronghold.要求奖赏 == 9) {
    await era.printAndWait(`${a_name}提出了想要狩猎童贞作为迎击成功的报酬`);
  }
}

// @gohoubi_after_koujo_k15
async function gohoubi_after_koujo_k15(rand, cid, choice) {
  void rand;
  void cid;
  const a = era_flag.target;
  const target_name = chara_callname(a); // %SAVESTR:TARGET%
  const sc = () => self_call(a); // %SELF_CALL(TARGET)%

  if (choice == 0) {
    await era.printAndWait('');
    return 0;
  } else if (choice == 1) {
    await era.printAndWait(`「能得到您的肯定，是${sc()}最大的荣幸。」`);
    await era.printAndWait(
      `${target_name}慎重地将勋章别在胸前，露出了满足的微笑。`,
    );
    return 0;
  } else if (choice == 2) {
    if (chara(a).stronghold.要求奖赏 == 0) {
      await era.printAndWait(
        `「这样就能买礼物送给魔王大人了，会期待吗？呵呵」`,
      );
      await era.printAndWait(
        `${target_name}笑着将食指点在唇上，做了个礼物要保密的表情。`,
      );
    } else if (chara(a).stronghold.要求奖赏 == 1) {
      if (era0(`talent:${a}:0`) == 1) {
        await era.printAndWait(
          `「第一次就让野狗侵犯…啊！啊啊…果然…插的好深啊～♡」`,
        );
        await era.printAndWait(
          `${target_name}四肢着地趴在地上，尽管大腿还流淌着处女的血液，却像只母狗那样摇摆着屁股……`,
        );
      } else {
        await era.printAndWait(
          `「野狗的肉棒…呜啊！好…好棒啊♡！嗯啊…要……要射在里面了～♡」`,
        );
        await era.printAndWait(
          `${target_name}四肢着地趴在地上，流着口水像只发情的母狗，淫荡地摇着屁股迎合肉棒的抽插……`,
        );
      }
    } else if (chara(a).stronghold.要求奖赏 == 2) {
      if (era0(`talent:${a}:0`) == 1) {
        await era.printAndWait(
          `「第一次就让猪侵犯…啊！啊啊…果然…插的好深啊～♡」`,
        );
        await era.printAndWait(
          `${target_name}四肢着地趴在地上，尽管大腿还流淌着处女的血液，却像只母猪那样摇摆着屁股…`,
        );
      } else {
        await era.printAndWait(
          `「猪的肉棒…呜啊！好…好棒啊♡！嗯啊…要……要射在里面了～♡」`,
        );
        await era.printAndWait(
          `${target_name}四肢着地趴在地上，流着口水像只发情的母猪，淫荡地摇着屁股迎合肉棒的抽插……`,
        );
      }
    } else if (chara(a).stronghold.要求奖赏 == 3) {
      if (era0(`talent:${a}:0`) == 1) {
        await era.printAndWait(
          `「第一次就让马侵犯…啊！啊啊…果然…插的好深啊～♡」`,
        );
        await era.printAndWait(
          `${target_name}四肢着地趴在地上，尽管大腿还流淌着处女的血液，却像只母马那样摇摆着屁股…`,
        );
      } else {
        await era.printAndWait(
          `「马的肉棒…呜啊！好…好棒啊♡！嗯啊…要……要射在里面了～♡」`,
        );
        await era.printAndWait(
          `${target_name}四肢着地趴在地上，流着口水像只发情的母马，淫荡地摇着屁股迎合肉棒的抽插……`,
        );
      }
    } else if (chara(a).stronghold.要求奖赏 == 4) {
      await era.printAndWait(`「嗯嗯……啾……啊……${sc()}的魔王大人～♡」`);
      await era.printAndWait(`${target_name}闭起眼睛，沉醉在与你的深吻之中……`);
    } else if (chara(a).stronghold.要求奖赏 == 5) {
      if (era0(`abl:${a}:2`) > era0(`abl:${a}:3`)) {
        await era.printAndWait(`「嗯嗯……啊……好棒……${sc()}的魔王大人～♡」`);
        await era.printAndWait(
          `${target_name}忘情地用双腿夹紧你的腰部，在你的抽插之下很快地高潮了……`,
        );
      } else {
        await era.printAndWait(
          `「魔王大人…请…请尽情使用这淫荡的屁股吧……啊啊♡」`,
        );
        await era.printAndWait(
          `你狠狠地将整根肉棒完全没入${target_name}那饥渴的肛穴之中捣弄`,
        );
        await era.printAndWait(
          `${target_name}带着满足的表情，发出了淫媚的呻吟……`,
        );
      }
    } else if (chara(a).stronghold.要求奖赏 == 6) {
      await era.printAndWait(`「唔……咕噜……咕噜……啊…感谢魔王大人的款待～♡」`);
      await era.printAndWait(
        `${target_name}意犹未尽地舔着嘴角，露出了满足的笑容……`,
      );
    } else if (chara(a).stronghold.要求奖赏 == 7) {
      if (era0(`talent:${a}:0`) == 1) {
        await era.printAndWait(`「啊！……啊啊……又…又进来了…好……好棒……啊啊♡」`);
        await era.printAndWait(
          `尽管${target_name}大腿还流淌着处女的血液，却像个熟练的妓女那样沉迷在乱交的派对当中……`,
        );
      } else {
        await era.printAndWait(`「啊！……啊啊……又…又进来了…好……好棒……啊啊♡」`);
        await era.printAndWait(
          `${target_name}一边被操干着一边进行口交，像个熟练的妓女那样沉迷在乱交的派对当中……`,
        );
      }
    } else if (chara(a).stronghold.要求奖赏 == 8) {
      await era.printAndWait(`「唔……咕噜……咕噜……啊…感谢魔王大人的款待～♡」`);
      await era.printAndWait(
        `${target_name}意犹未尽地舔着嘴角，露出了满足的笑容……`,
      );
    } else if (chara(a).stronghold.要求奖赏 == 9) {
      if (era0(`abl:${a}:2`) > era0(`abl:${a}:3`)) {
        await era.printAndWait(
          `「这青涩的肉棒……呵呵……就让${sc()}好好地引导吧～♡」`,
        );
        await era.printAndWait(
          `${target_name}熟练地摆动着腰肢，用蜜穴饥渴地榨取着那纯洁处男的精液……`,
        );
      } else {
        await era.printAndWait(
          `「这青涩的肉棒……呵呵……就让${sc()}好好地引导吧～♡」`,
        );
        await era.printAndWait(
          `${target_name}熟练地摆动着腰肢，用肛穴饥渴地榨取着那纯洁处男的精液……`,
        );
      }
    }
  }
}

// @osioki_koujo_k15
async function osioki_koujo_k15(rand, cid, choice) {
  void rand;
  void cid;
  const a = era_flag.target;
  const target_name = chara_callname(a); // %SAVESTR:TARGET%
  const sc = () => self_call(a); // %SELF_CALL(TARGET)%

  if (choice == 0) {
    await era.printAndWait(`「您是如此的宽容！下次${sc()}一定会更加努力。」`);
    if (era0(`abl:${a}:21`) >= 3) {
      await era.printAndWait(
        `明明没有处罚，不知为何${target_name}却露出有点失落的样子……`,
      );
    }
  } else if (choice == 1) {
    if (era0(`abl:${a}:21`) >= 3) {
      await era.printAndWait(
        `「呀啊！啊啊！这～这种感觉～唔～要～要高潮了！啊啊～♡」`,
      );
      await era.printAndWait(
        `明明是电椅的处罚，${target_name}却发出了淫荡的呻吟……`,
      );
    } else {
      await era.printAndWait(
        `「唔！啊！不～不行了～啊！魔王大人…请…请饶了${sc()}吧……」`,
      );
      await era.printAndWait(
        `${target_name}因电椅的痛苦，眼角闪着泪光说着求饶的话语……`,
      );
    }
  } else if (choice == 2) {
    if (era0(`abl:${a}:17`) >= 3) {
      await era.printAndWait(
        `「嗯啊！啊啊！要……要高潮了……贴近一点看……也可以的喔～♡」`,
      );
    } else {
      await era.printAndWait(`「唔……啊啊……你们……走…走开啊！……不……不要看啊……」`);
    }
  } else if (choice == 3) {
    if (era0(`abl:${a}:17`) >= 6) {
      await era.printAndWait(
        `「啊！……唔啊！要…要出来了！……排泄的样子…被看见了啊～♡」`,
      );
    } else {
      await era.printAndWait(`「唔……啊啊……你们……走…走开啊！……不……不要看啊……」`);
    }
  } else if (choice == 4) {
    if (era0(`abl:${a}:21`) >= 3) {
      await era.printAndWait(`「痛！……唔啊！……可是……为何这么舒服呢？啊啊～♡」`);
    } else {
      await era.printAndWait(`「痛！……唔啊！……原…原谅${sc()}吧……啊！啊…！」`);
    }
  } else if (choice == 5) {
    if (era0(`talent:${a}:88`) == 1 || era0(`talent:${a}:76`) == 1) {
      await era.printAndWait(
        `「唔……请…请将尿液……施舍给下贱的${target_name}～啊！好棒～♡」`,
      );
    } else {
      await era.printAndWait(`「不……拜托……不要这样…啊！不行！不要啊！！」`);
    }
  } else if (choice == 6) {
    await era.print(`「这里……也太脏了吧…到底都在厕所里做些什么啊…真是……唉……」`);
  } else if (choice == 7) {
    await era.print(`「唉～好饿啊～不如……做些什么来转移注意力吧？」`);
  } else if (choice == 8) {
    await era.printAndWait(
      `「唔！啊啊……啊…忍不下去…谁……谁都可以…快…快来操${target_name}吧……啊啊～♡」`,
    );
  } else if (choice == 9) {
    await era.printAndWait('');
  }
}

// @gobi_koujo_k15, ARG:0
function gobi_koujo_k15(arg0, rand) {
  void rand;

  if (arg0 == 1) {
    return `♪`;
  } else if (arg0 == 2) {
    return `！`;
  } else if (arg0 == 3) {
    return `……。`;
  } else if (arg0 == 4) {
    return `……。`;
  } else if (arg0 == 5) {
    return `……。`;
  } else {
    return `。`;
  }
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
