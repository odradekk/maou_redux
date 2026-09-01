/* eslint-disable no-irregular-whitespace, no-dupe-else-if */
/**
 * @file 冷徹性格口上 K4：指令口上全量 + 非调教口上（issue #235 全量复核）。
 *
 * 源: target/ERB/口上/EVENT_K4_冷徹.ERB  @EVENTTRAIN #PRI（:61-65，存在
 *     标志 FLAG:104）@EVENTEND #LATER（:67-69，清标志）
 *     @EVENTTRAIN（:75-230，调教开始口上 CFLAG:201 + NTR 再捕获 + 屈服/淫乱/
 *     爱慕 + K4_KOJO2 二回目以降）@K4_KOJO2（:236-450）
 *     @EVENTEND（:456-515，调教结束口上）@KOJO_MESSAGE_COM_4（:521-3092，
 *     五道头部守卫 + SELECTCOM 0-80 各分支；**K4 无 ASSI/TALENT:9 守卫**——
 *     源 :523/:3917/:4121 的 ASSI 守卫整行注释、TALENT:9 只在 SELF_KOJO）
 *     @DOG_KOJO_4（:3094-3907，兽奸专用口上）@KOJO_MESSAGE_PALAMCNG_4
 *     （:3915-4114）@KOJO_MESSAGE_MARKCNG_4（:4119-4178）@SELF_KOJO_K4
 *     （:4182-4432）@DUNGEON_RYOUZYOKU_K4（:4463-4551）
 *     @DUNGEON_RYOUZYOKU_AFTER_K4（:4554-4617）@BENKI_KOUJO_K4
 *     （:4620-4755）@DUNGEON_VICTORY_K4（:4758-4810）@DUNGEON_ATTACK_K4
 *     （:4813-4898）@COLOSSEUM_KOJO_4（:4905-5035）@NTR_KOUJO_K4
 *     （:5038-5115）@EXUCUTION_KOUJO_K4（:5119-5133）@MUSEUM_KOUJO_K4
 *     （:5136-5168）@BANISHMENT_KOUJO_K4（:5171-5189）
 *     @PUBLIC_EXUCUTION_KOUJO_K4（:5192-5204）@GROTESQUE_KOUJO_K4
 *     （:5207-5231）@ENTERENEMY_KOUJO_K4（:5234-5249）
 *     @GOHOUBI_REQUEST_KOUJO_K4（:5251-5286）@GOHOUBI_AFTER_KOUJO_K4
 *     （:5288-5364）@OSIOKI_KOUJO_K4（:5366-5426）@GOBI_KOUJO_K4
 *     （:5429-5457）
 *
 * == 守卫（K4 与 K3/K5 不同，逐文件 1:1） ==
 *
 * @KOJO_MESSAGE_COM_4 的守卫（:526-543，源实测）：
 *   1. TEQUIP:45 && SELECTCOM != 45（口塞）→ 跳过；
 *   2. TFLAG:899（失神）→ 跳过；
 *   3. TEQUIP:89（兽奸）→ **岔去本文件真身 DOG_KOJO_4**；
 *   4. TEQUIP:90（触手）→ 跳过；
 *   5. TEQUIP:55（死斗场）→ **岔去本文件真身 COLOSSEUM_KOJO_4**。
 * K4 没有 ASSI 守卫（:523 整行注释）与 TALENT:9 守卫（该素质只在
 * SELF_KOJO 的妊娠/出产分支读）——契约测试按角色守卫集逐条驱动。
 *
 * == 状态机（CFLAG:301-400） ==
 *
 * 指令口上按 SELECTCOM 平铺、每指令一对 CFLAG 计数器（301 爱抚 / 302 舔阴 /
 * 303 肛门爱抚 / 304 自慰 / 306 胸爱抚 / 307 接吻 / 308 自己扒开 / 309 插入
 * 手指 / 310 舔肛 / 311 振动宝石 / 312 壶虫 / 313 振动杖 / 314 肛门虫 /
 * 315 阴蒂夹 / 316 乳头夹 / 317 榨乳器 / 320 肛珠 / 321 正常位 / 322 背后位 /
 * 323 对面座位 / 324 背面座位 / 327-330 肛交四式 / 331 手淫 / 332 口交 /
 * 333 乳交 / 334 股间性交 / 335 骑乘位 / 336 全身擦洗 / 337 骑乘位肛交 /
 * 338 肛门侍奉 / 341 打屁股 / 342 鞭 / 343 针 / 344 眼罩 / 345 绳子 /
 * 346 口塞 / 347 灌肠肛塞 / 356 放置 / 357 交谈 / 381 强制口交）。
 * 各支「初回 → 1；二回目以降按素质/刻印分档取首个命中」写入逐档值
 * （FLAG:7 == 2 时上限旁路、同支每次出声；== 1 时逐阶段只出一次）。
 *
 * == 非调教口上（#209 裁定 2：本票连带） ==
 *
 * DOG_KOJO_4（兽奸）与 COLOSSEUM_KOJO_4（死斗场）由头部守卫直调（真身
 * 在本文件）；BENKI_KOUJO_K4 / NTR_KOUJO_K4 / EXUCUTION_KOUJO_K4 /
 * MUSEUM_KOUJO_K4 / BANISHMENT_KOUJO_K4 / PUBLIC_EXUCUTION_KOUJO_K4 /
 * GROTESQUE_KOUJO_K4 / ENTERENEMY_KOUJO_K4 / GOHOUBI_REQUEST_KOUJO_K4 /
 * GOHOUBI_AFTER_KOUJO_K4 / OSIOKI_KOUJO_K4 / GOBI_KOUJO_K4 /
 * DUNGEON_RYOUZYOKU_K4 / DUNGEON_RYOUZYOKU_AFTER_K4 / DUNGEON_VICTORY_K4 /
 * DUNGEON_ATTACK_K4 以 module 导出随各自调度侧接线（ere 侧 dispatch 族与
 * 调用点在阶段 5 落地；SELF_KOJO_K4 注册进 self_kojo_family）。
 */

const era = require('#/era-electron');
const { on, TIER } = require('#/system/event/registry');
const era_flag = require('#/era-utils/era-flag');
const {
  kojo_message_com_family,
  self_kojo_family,
} = require('#/kojo/kojo-system');
const { heart } = require('#/kojo/kojo-text');
const { game } = require('#/facade/game');
const { chara_callname, chara_name } = require('#/utils/callname-utils');
const { stub_line } = require('#/utils/stub-line');

/** 读未声明的序号返回 undefined 而非 0（#13），口上条件一律 || 0 兜底 */
const era0 = (k) => era.get(k) || 0;

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。
 */
const STUBBED_CALLS = ['SELL_MATURO_K0'];

// @EVENTTRAIN #PRI（:61-65）：存在标志 + 总开关补 0（同 EVENT_K.ERB 语义）
on(
  'EVENTTRAIN',
  () => {
    game.kojo.口上存在_4 = 1; // :63 FLAG:104 = 1（K4 口上存在标志）
    if (game.kojo.口上开关 === 0) {
      game.kojo.口上开关 = 2;
    }
  },
  TIER.PRI,
);

// @EVENTEND #LATER（:67-69）：调教结束清存在标志
on(
  'EVENTEND',
  () => {
    game.kojo.口上存在_4 = 0;
  },
  TIER.LATER,
);

/**
 * @EVENTTRAIN（:75-230，普通档）：调教开始时的口上。
 *
 * 守卫（:76-77/:78-79）：FLAG:7 <= 0 跳过、TALENT:164 != 1 跳过；此后按
 * CFLAG:201 状态机推进：初调教（0）→ NTR 再捕获（>=1 && CFLAG:650 == 1）→
 * 屈服刻印Lv1/2/3（各一次）→ 淫乱（一次）→ 爱慕（一次）→ 助手分支
 * （ASSI < 0 或无名助手 → K4_KOJO2；助手口上模板未填写）。
 */
on(
  'EVENTTRAIN',
  async () => {
    const target = era_flag.target;
    const target_name = chara_callname(target); // %SAVESTR:TARGET%
    const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
    const master_name = chara_name(0); // %CALLNAME:MASTER%（MASTER 恒角色 0）
    if (era0('flag:7') <= 0) {
      return 0;
    }
    if (era0(`talent:${target}:164`) != 1) {
      return 0;
    }

    if (era0(`cflag:${target}:201`) == 0) {
      era.drawLine();
      if (era0(`talent:${target}:314`) == 3) {
        await era.printAndWait(
          `「如果以为我和那些在魔界堕落的同胞一样，就大错特错啦！」`,
        ); // :88
        await era.printAndWait(`「流淌着的高贵血脉，绝不会被你玷污！……」`); // :89
      } else if (era0(`talent:${target}:314`) == 4) {
        await era.printAndWait(`「身为精灵勇者的我，不可能屈从于黑暗！」`); // :92
        await era.printAndWait(`「哪怕同伴都在淫威下屈服了……我也坚贞不屈！」`); // :93
      } else {
        await era.printAndWait(`「…原来如此，用这样的牢狱来封住我的力量啊…」`); // :95
        await era.printAndWait(
          `「哼，卑鄙。这都是徒劳的笑话罢了，我绝不屈服。」`,
        ); // :96
      }

      if (era0(`cflag:${target}:42`) == 83) {
        await era.printAndWait(`这么说着、${target_name}推了推眼镜…`); // :100
      }
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      era.set(`cflag:${target}:201`, 1);
      return 1;
    } else if (
      era0(`cflag:${target}:201`) >= 1 &&
      era0(`cflag:${target}:650`) == 1
    ) {
      if (era0(`talent:${target}:85`) || era0(`talent:${target}:76`)) {
        era.drawLine();
        await era.printAndWait(
          `将看了那水晶球的事告诉了${target_name}之后，她的脸色苍白了。`,
        ); // :109
        await era.printAndWait(
          `「………和别人私通的家伙摆出这样的脸，怎么，准备哭了么是要？」`,
        ); // :110
        await era.printAndWait(
          `「我……被狂王抱着，感受到了无上的快乐……那样……可耻……可耻的姿态……哇……呜呜呜……」`,
        ); // :111
        await era.printAndWait(
          `${target_name}泪流满面。对背叛${player_name}感到后悔，或对被狂王弄得高潮感到悔恨，也许两者都有吧………`,
        ); // :112

        // CFLAG:650  = 0（变量语义：CFLAG 族，650）
        era.set(`cflag:${target}:650`, 0);
      } else {
        era.drawLine();
        await era.printAndWait(
          `「唉……曾经背叛过的我，已经没资格再成为魔王的东西了………」`,
        ); // :117
        await era.printAndWait(`「我只是战败之身，要杀要剐，悉随尊便。」`); // :118

        // CFLAG:650  = 0（变量语义：CFLAG 族，650）
        era.set(`cflag:${target}:650`, 0);
      }
      return 1;
    } else if (
      era0(`cflag:${target}:201`) < 2 &&
      era0(`mark:${target}:2`) == 1
    ) {
      era.drawLine();
      await era.printAndWait(`「哼……都是徒劳的，徒劳的！」`); // :129
      // CFLAG:201  = 2（变量语义：CFLAG 族，201）
      era.set(`cflag:${target}:201`, 2);
      return 1;
    } else if (
      era0(`cflag:${target}:201`) < 3 &&
      era0(`mark:${target}:2`) == 2
    ) {
      era.drawLine();
      await era.printAndWait(
        `「我，是怎么了？不！我还是我！还是我！不会屈服！」`,
      ); // :136
      // CFLAG:201  = 3（变量语义：CFLAG 族，201）
      era.set(`cflag:${target}:201`, 3);
      return 1;
    } else if (
      era0(`cflag:${target}:201`) < 4 &&
      era0(`mark:${target}:2`) == 3 &&
      era0(`talent:${target}:85`) == 0
    ) {
      era.drawLine();
      await era.printAndWait(
        `「再，再也受不了啦……哇！呜呜……是我输了……多么屈辱啊…」`,
      ); // :143
      // CFLAG:201  = 4（变量语义：CFLAG 族，201）
      era.set(`cflag:${target}:201`, 4);
      return 1;
    } else if (
      era0(`cflag:${target}:201`) < 5 &&
      era0(`talent:${target}:76`) == 1 &&
      era0(`talent:${target}:85`) == 0
    ) {
      era.drawLine();
      await era.printAndWait(`${target_name}一贯以来的冷静感完全消失了。`); // :150
      await era.printAndWait(`彻底成为了一只被快感所俘虏的牝奴。`); // :151
      await era.printAndWait(
        `四脚爬爬，扭动着腰，用炽热的视线仰视着${master_name}。`,
      ); // :152
      await era.printAndWait(
        `「我，我不行了……我是肉棒最忠实的奴隶！……唔…喔……请，请给我……肉棒！」`,
      ); // :153
      // CFLAG:201  = 5（变量语义：CFLAG 族，201）
      era.set(`cflag:${target}:201`, 5);
      return 1;
    } else if (
      era0(`cflag:${target}:201`) < 6 &&
      era0(`talent:${target}:85`) == 1
    ) {
      era.drawLine();
      await era.printAndWait(`${target_name}害羞地向${master_name}表白了。`); // :160
      await era.printAndWait(
        `「我其实留意了很久了，魔王大人有着与众不同闪光点……啊～不不～不要说这种多余的话！」`,
      ); // :161
      await era.printAndWait(
        `${target_name}有点手足无措，看了${master_name}一眼，红着脸，说「魔王大人……以后，请让我侍奉左右吧……」`,
      ); // :162
      await era.printAndWait(`${target_name}顺势跪下，亲吻着你的手。`); // :163
      // CFLAG:201  = 6（变量语义：CFLAG 族，201）
      era.set(`cflag:${target}:201`, 6);
      return 1;
    } else if (era_flag.assi < 0) {
      await k4_kojo2(); // :169 CALL K4_KOJO2
    } else {
      await k4_kojo2(); // :229 CALL K4_KOJO2
    }
  },
  TIER.NORMAL,
);

/**
 * @K4_KOJO2（:236-450）：调教开始口上的二回目以降（助手无口上时）。
 * 按「反抗刻印Lv3 → 屈服刻印Lv0/1/2/3 → 淫乱 → 爱慕」取首个命中。
 */
async function k4_kojo2() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const rand_n = (n) => Math.floor(Math.random() * n);

  if (era0(`mark:${target}:3`) == 3 && era0('flag:7') == 2) {
    era.drawLine();
    await era.printAndWait(`「你这肮脏可悲的生物……」`); // :240
    await era.print(`${target_name}`); // :241

    if (era0(`cflag:${target}:42`) == 83) {
      await era.print(`眼镜下`); // :244
    }
    await era.printAndWait(`的目光异常冰冷…`); // :245
    return 1;
  } else if (era0(`mark:${target}:2`) == 0 && era0('flag:7') == 2) {
    era.drawLine();
    if (
      era0(`talent:${target}:11`) ||
      era0(`talent:${target}:12`) ||
      era0(`talent:${target}:16`)
    ) {
      await era.printAndWait(`「别逗我笑了，就凭你是无法得到我的心的！」`); // :253
    } else if (era0(`talent:${target}:13`) || era0(`talent:${target}:14`)) {
      await era.printAndWait(`「到底想我怎么样嘛……？这，这样的话……」`); // :256
    } else {
      await era.printAndWait(`「我不觉得你能搞定我啊。」`); // :258
    }
    return 1;
  } else if (era0(`mark:${target}:2`) == 1 && era0('flag:7') == 2) {
    era.drawLine();

    if (
      era0(`talent:${target}:11`) ||
      era0(`talent:${target}:12`) ||
      era0(`talent:${target}:16`)
    ) {
      await era.printAndWait(`「你这家伙……才不会输给你这样的家伙！」`); // :268
    } else if (era0(`talent:${target}:13`) || era0(`talent:${target}:14`)) {
      await era.printAndWait(`「我很坚强……我……没事的」`); // :271
    } else {
      await era.printAndWait(`「你，想干嘛？不不，不要去想这些……」`); // :273
    }

    return 1;
  } else if (era0(`mark:${target}:2`) == 2 && era0('flag:7') == 2) {
    era.drawLine();

    if (
      era0(`talent:${target}:11`) ||
      era0(`talent:${target}:12`) ||
      era0(`talent:${target}:16`)
    ) {
      await era.printAndWait(`「可恶……不是这样的，事情不是这样的！」`); // :284
    } else if (era0(`talent:${target}:13`) || era0(`talent:${target}:14`)) {
      await era.printAndWait(`「至少……请不要弄痛我……」`); // :287
    } else {
      await era.printAndWait(`「别开玩笑了……这样的事……不该有的……」`); // :289
    }

    return 1;
  } else if (
    era0(`mark:${target}:2`) == 3 &&
    era0(`talent:${target}:85`) == 0 &&
    era0(`talent:${target}:76`) == 0 &&
    era0('flag:7') == 2
  ) {
    era.drawLine();

    if (
      era0(`talent:${target}:11`) ||
      era0(`talent:${target}:12`) ||
      era0(`talent:${target}:16`)
    ) {
      await era.printAndWait(`「哼……你高兴就好……」`); // :300
    } else if (era0(`talent:${target}:13`) || era0(`talent:${target}:14`)) {
      await era.printAndWait(`「啊……这样的话……」`); // :303
    } else {
      await era.printAndWait(`「这场胜负……是我输了吗……」`); // :305
    }

    return 1;
  } else if (era0(`talent:${target}:76`) == 1 && era0('flag:7') == 2) {
    era.drawLine();

    if (era0(`talent:${target}:314`) == 3) {
      if (rand_n(3) == 0) {
        await era.printAndWait(`「比对鲜血还要渴求……人家，已经忍不住了啦…！」`); // :317
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「来把我弄满满地吧……呵呵～」`); // :319
      } else {
        await era.printAndWait(`「我的高贵血脉……就献给魔王大人吧～」`); // :321
      }
    } else {
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「嗯～不要再让人家等啦～快用肉棒，狠狠地干坏我的穴啊…！」`,
        ); // :325
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「啊…！肉棒终于来了！」`); // :327
      } else {
        await era.printAndWait(
          `「嘻嘻，从今早开始，腹中就一直在叫想被肉棒塞满啊！」`,
        ); // :329
      }
    }

    if (era0(`talent:${target}:74`)) {
      await era.printAndWait(`「今天也请来看我自慰吧……♪」`); // :336
    } else if (era0(`talent:${target}:74`)) {
      await era.printAndWait(`「子宫疼得没办法了啦……♪」`); // :340
    } else if (era0(`talent:${target}:77`)) {
      await era.printAndWait(`「今天也请用菊花把我操去吧……♪」`); // :344
    } else if (era0(`talent:${target}:78`)) {
      await era.printAndWait(`「人家的乳头，已经完全勃起了啦……♪」`); // :348
    }

    if (era0(`talent:${target}:83`)) {
      await era.printAndWait(`「嘻嘻，还想更多更多地去欺负别人……」`); // :354
    } else if (era0(`talent:${target}:88`)) {
      await era.printAndWait(`「啊……请尽情地欺负作为下贱母猪的我吧……」`); // :358
    }

    if (era0(`talent:${target}:83`)) {
      await era.printAndWait(`「那个，能早点去外面吗？在房间里不够刺激啦～」`); // :364
    }

    if (era0(`talent:${target}:136`)) {
      await era.printAndWait(`「啊……好像快点交配啊……我……只是只牝兽…………」`); // :370
    }

    if (era0(`talent:${target}:204`)) {
      await era.printAndWait(`「请对着作为肉便器的我，尽情地排泄吧！」`); // :376
    }

    if (era0(`cflag:${target}:42`) == 83) {
      await era.printAndWait(
        `${target_name}眼镜后的双眼已经被情欲的火焰点燃了…`,
      ); // :382
    }

    return 1;
  } else if (era0(`talent:${target}:85`) == 1 && era0('flag:7') == 2) {
    era.drawLine();

    if (era0(`talent:${target}:314`) == 4) {
      if (rand_n(3) == 0) {
        await era.printAndWait(`「作为黑暗勇者的我，会常伴您左右……」`); // :393
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「你的愉悦，我的幸福……」`); // :395
      } else {
        await era.printAndWait(`「来下命令吧。你的话，我什么都会听从的………」`); // :397
      }
    } else {
      if (rand_n(3) == 0) {
        await era.printAndWait(`「呵呵～来啦？　今天也要好好疼爱人家啊～」`); // :401
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「能被你抱着……啊……真是迫不及待啊…」`); // :403
      } else {
        await era.printAndWait(
          `「今天也请温柔地对人家吧…。人家已经做好准备啦～」`,
        ); // :405
      }
    }

    if (era0(`talent:${target}:74`)) {
      await era.printAndWait(`「看看啊……我这……羞耻的样子……♪」`); // :412
    } else if (era0(`talent:${target}:74`)) {
      await era.printAndWait(`「来一次灵肉交汇的爱爱吧！♪」`); // :416
    } else if (era0(`talent:${target}:77`)) {
      await era.printAndWait(`「后面的小穴，已经想你想得发疼了……♪」`); // :420
    } else if (era0(`talent:${target}:78`)) {
      await era.printAndWait(`「请彻底地玩弄我的胸部吧……♪」`); // :424
    }

    if (era0(`talent:${target}:83`)) {
      await era.printAndWait(`「来玩严厉PLAY吧！」`); // :430
    } else if (era0(`talent:${target}:88`)) {
      await era.printAndWait(`「请对作为牝奴隶的我赐予恩惠……」`); // :434
    }

    if (era0(`talent:${target}:83`)) {
      await era.printAndWait(`「今天会带我去哪里么……？」`); // :440
    }

    if (era0(`cflag:${target}:42`) == 83) {
      await era.printAndWait(`${target_name}眼镜后的双眼已经被爱的火焰点燃了…`); // :446
    }

    return 1;
  }
  return 0;
}

/**
 * @EVENTEND（:456-515，普通档）：调教结束时的口上。
 * 守卫（:457-458/:459-460/:463-464）：FLAG:7、TALENT:164、BASE:0（死亡跳过）。
 */
on(
  'EVENTEND',
  async () => {
    const target = era_flag.target;
    if (era0('flag:7') <= 0) {
      return 0;
    }
    if (era0(`talent:${target}:164`) != 1) {
      return 0;
    }

    if (era0(`base:${target}:0`) <= 0) {
      return 0;
    }

    if (era0(`mark:${target}:3`) == 3 && era0(`talent:${target}:85`) == 0) {
      era.drawLine();
      await era.printAndWait(`「可恶！」`); // :472
      return 1;
    } else if (
      era0(`mark:${target}:2`) <= 1 &&
      era0(`talent:${target}:85`) == 0
    ) {
      era.drawLine();
      await era.printAndWait(`「哈哈……就这，这种程度……」`); // :478
      return 1;
    } else if (
      era0(`mark:${target}:2`) == 2 &&
      era0(`talent:${target}:85`) == 0
    ) {
      era.drawLine();
      await era.printAndWait(`「还没，还不能屈服！…」`); // :484
      return 1;
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      era0(`talent:${target}:85`) == 0
    ) {
      era.drawLine();
      await era.printAndWait(`「已……已经不行了啊……我回不去了………」`); // :490
      return 1;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`base:${target}:0`) >= 500
    ) {
      era.drawLine();
      await era.printAndWait(`「请……请再用肉棒蹂躏我………可以吗？」`); // :496
      return 1;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`base:${target}:0`) <= 500
    ) {
      era.drawLine();
      await era.printAndWait(`「要……要死了！…」`); // :501
      return 1;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`base:${target}:0`) >= 500
    ) {
      era.drawLine();
      await era.printAndWait(`「嘻嘻，这次也很完美～～」`); // :507
      return 1;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`base:${target}:0`) <= 500
    ) {
      era.drawLine();
      await era.printAndWait(`「呆子，就不能对人家再温柔些吗？…坏人～」`); // :512
      return 1;
    }
    return 0;
  },
  TIER.NORMAL,
);

/**
 * @KOJO_MESSAGE_COM_4（:521-3092）：指令执行时的口上。
 *
 * 五道头部守卫（:526-543，见文件头）之后按 SELECTCOM 平铺。K4 无
 * ASSI 与 TALENT:9 守卫（源逐行注释/缺失，1:1 保留）。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（[0, n) 整数；缺省
 *   均匀随机，测试注入定值序——分支序恒按 RAND:N 从大到小）
 * @returns {Promise<number>} 0（RETURN 0；TRYCALLFORM 不读返回值）
 */
async function kojo_message_com_4(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const player = era_flag.player; // TALENT:PLAYER:318（手淫的调教者体型分档）
  const palam = (i) => era0(`palam:${target}:${i}`) || 0;
  const delta = (i) => era0(`delta:${target}:${i}`) || 0;

  if (era0(`tequip:${target}:45`) && era_flag.selectcom != 45) {
    return 0;
  }

  if (era0('tflag:899')) {
    return 0;
  }

  if (era0(`tequip:${target}:89`)) {
    await dog_kojo_4(); // :533 CALL DOG_KOJO_4
    return 0;
  }

  if (era0(`tequip:${target}:90`)) {
    return 0;
  }

  if (era0(`tequip:${target}:55`)) {
    await colosseum_kojo_4(); // :541 CALL COLOSSEUM_KOJO_4
    return 0;
  }

  if (era_flag.selectcom == 0) {
    if (era0(`cflag:${target}:301`) == 0) {
      if (era0(`mark:${target}:2`) >= 2) {
        await era.printAndWait(`「唔～唔……」「哼，这不挺配合的嘛！」`); // :556
      } else {
        await era.printAndWait(`「讨厌！这变态！」`); // :559
      }
      // CFLAG:301  = 1（变量语义：CFLAG 族，301）
      era.set(`cflag:${target}:301`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:301`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「唔…噢～…再弄，再弄我……胸，胸部也好……那里！……还有屁股，再揉啊～～…」`,
        ); // :567
        // CFLAG:301  = 6（变量语义：CFLAG 族，301）
        era.set(`cflag:${target}:301`, 6);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:301`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「那么细腻，温柔的手法……人家会……啊！……噢～啊啊！……有，有感觉了～～…」`,
        ); // :571
        // CFLAG:301  = 5（变量语义：CFLAG 族，301）
        era.set(`cflag:${target}:301`, 5);
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:301`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「啊…好…那里……」`); // :575
        // CFLAG:301  = 4（变量语义：CFLAG 族，301）
        era.set(`cflag:${target}:301`, 4);
      } else if (
        era0(`mark:${target}:2`) == 2 &&
        (era0(`cflag:${target}:301`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「快住手啊……再这样摸的话……我会………」`); // :579
        // CFLAG:301  = 3（变量语义：CFLAG 族，301）
        era.set(`cflag:${target}:301`, 3);
      } else if (
        era0(`mark:${target}:2`) <= 1 &&
        (era0(`cflag:${target}:301`) <= 1 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「变态！！…完全不舒服，不要再摸了！」`); // :583
        // CFLAG:301  = 2（变量语义：CFLAG 族，301）
        era.set(`cflag:${target}:301`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 1) {
    if (era0(`cflag:${target}:302`) == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        await era.printAndWait(`「哇！呜呜！！快住手！！」`); // :598
      } else {
        await era.printAndWait(`「那，那样的地方都舔！这个……大变态！」`); // :601
      }
      // CFLAG:302  = 1（变量语义：CFLAG 族，302）
      era.set(`cflag:${target}:302`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:302`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊啊啊！好～好啊～♪　再舔我！再用力地吸～………唔喔，爱液要出来了～！！…」`,
        ); // :609
        // CFLAG:302  = 5（变量语义：CFLAG 族，302）
        era.set(`cflag:${target}:302`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:302`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「呃啊～！好，好舒服……魔王大人啊！…再这么弄的话……人家……人家，会…………噢！～」`,
        ); // :613
        // CFLAG:302  = 4（变量语义：CFLAG 族，302）
        era.set(`cflag:${target}:302`, 4);
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:302`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「随，随你喜欢弄了！　…呃～啊啊啊啊啊！」`); // :617
        // CFLAG:302  = 3（变量语义：CFLAG 族，302）
        era.set(`cflag:${target}:302`, 3);
      } else if (era0(`cflag:${target}:302`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「那地方！好脏的！不要舔了啦！！」`); // :621
        // CFLAG:302  = 2（变量语义：CFLAG 族，302）
        era.set(`cflag:${target}:302`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 2) {
    if (era0(`cflag:${target}:303`) == 0) {
      await era.printAndWait(`「笨，笨蛋！！在想什么哪？！快停手！！」`); // :634
      // CFLAG:TARGET:303  = 1（变量语义：CFLAG 族，TARGET:303）
      era.set(`cflag:${target}:303`, 1);
      return 0;
    } else {
      // 赋值 P = PALAM:3 + UP:3
      const P = palam(3) + delta(3);

      if (
        era0(`talent:${target}:76`) == 1 &&
        P >= era0('palamlv:2') &&
        (era0(`cflag:${target}:303`) <= 6 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「唔哦哦哦哦哦哦！！好，好啊………菊穴要融化了………快，快给我吧………」`,
        ); // :642
        // CFLAG:303  = 7（变量语义：CFLAG 族，303）
        era.set(`cflag:${target}:303`, 7);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        P < era0('palamlv:2') &&
        (era0(`cflag:${target}:303`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊啊………再，再湿一些的话……我想会更舒服些的………」`,
        ); // :646
        // CFLAG:303  = 6（变量语义：CFLAG 族，303）
        era.set(`cflag:${target}:303`, 6);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        P >= era0('palamlv:2') &&
        (era0(`cflag:${target}:303`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「唔哦～！魔王大人……屁股，屁股要融化在您的手里了………你让人家如何是好………」`,
        ); // :650
        // CFLAG:303  = 5（变量语义：CFLAG 族，303）
        era.set(`cflag:${target}:303`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        P < era0('palamlv:2') &&
        (era0(`cflag:${target}:303`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「啊呜～！再把人家弄湿一些………有点痛呢………」`); // :654
        // CFLAG:303  = 4（变量语义：CFLAG 族，303）
        era.set(`cflag:${target}:303`, 4);
      } else if (
        P >= era0('palamlv:2') &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:303`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「不，不行了！！……屁股……我的屁股……要融化了…………」`,
        ); // :658
        // CFLAG:303  = 3（变量语义：CFLAG 族，303）
        era.set(`cflag:${target}:303`, 3);
      } else if (era0(`cflag:${target}:223`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「笨蛋！快住手！！我叫你住手啊！！」`); // :662
        // CFLAG:303  = 2（变量语义：CFLAG 族，303）
        era.set(`cflag:${target}:303`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 3) {
    if (era0(`cflag:${target}:304`) == 0) {
      await era.printAndWait(`「想，想看这种东西…！？」`); // :675
      // CFLAG:TARGET:304  = 1（变量语义：CFLAG 族，TARGET:304）
      era.set(`cflag:${target}:304`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`talent:${target}:0`) == 1 &&
        (era0(`cflag:${target}:304`) <= 8 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「唔～噢～……我怎么这么淫乱啊……明明，明明还未试过男人的滋味………」`,
        ); // :682
        // CFLAG:304  = 9（变量语义：CFLAG 族，304）
        era.set(`cflag:${target}:304`, 9);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:31`) >= 3 &&
        (era0(`cflag:${target}:304`) <= 7 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「唔……噢噢……啊！……」`); // :688
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「唔……噢噢……啊！……哈……哈……」`); // :690
        } else {
          await era.printAndWait(`「唔……噢噢……啊！……呃！！！！」`); // :692
        }
        // CFLAG:304  = 8（变量语义：CFLAG 族，304）
        era.set(`cflag:${target}:304`, 8);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:31`) < 3 &&
        (era0(`cflag:${target}:304`) <= 6 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「相对于自摸，还是更喜欢小鸡鸡啦！…」`); // :699
        } else {
          await era.printAndWait(`「丢下人家自己一个在自慰…好残忍啊！」`); // :701
        }
        // CFLAG:304  = 7（变量语义：CFLAG 族，304）
        era.set(`cflag:${target}:304`, 7);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`talent:${target}:0`) == 1 &&
        (era0(`cflag:${target}:304`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「要看着魔王大人来自慰？……呜呜，魔王大人啊，早点占有我，早点贯穿我这小穴就好了………」`,
        ); // :706
        // CFLAG:304  = 6（变量语义：CFLAG 族，304）
        era.set(`cflag:${target}:304`, 6);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:31`) >= 3 &&
        (era0(`cflag:${target}:304`) <= 4 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「唔……噢噢……啊！……」`); // :712
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「唔……噢噢……啊！……哈……哈……」`); // :714
        } else {
          await era.printAndWait(`「唔……噢噢……啊！……呃！！！！」`); // :716
        }
        // CFLAG:304  = 5（变量语义：CFLAG 族，304）
        era.set(`cflag:${target}:304`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:31`) < 3 &&
        (era0(`cflag:${target}:304`) <= 3 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「呜呜…魔王大人，为什么不愿意抱人家呢……」`); // :723
        } else {
          await era.printAndWait(`「一个人……可怜地在自慰……」`); // :725
        }
        // CFLAG:304  = 4（变量语义：CFLAG 族，304）
        era.set(`cflag:${target}:304`, 4);
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:31`) >= 1 &&
        (era0(`cflag:${target}:304`) <= 2 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`（讨厌……有感觉……了吗？）`); // :732
        } else {
          await era.printAndWait(`（我怎么…变成这样………）`); // :734
        }
        // CFLAG:304  = 3（变量语义：CFLAG 族，304）
        era.set(`cflag:${target}:304`, 3);
      } else if (era0(`cflag:${target}:304`) <= 1 || era0('flag:7') == 2) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「要做……这样的事……」`); // :741
        } else {
          await era.printAndWait(`「太丢人了……好羞耻……」`); // :743
        }
        // CFLAG:304  = 2（变量语义：CFLAG 族，304）
        era.set(`cflag:${target}:304`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 5) {
    if (era0(`cflag:${target}:306`) == 0) {
      if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「想玩弄胸部么……？　嘻嘻，是你的话，可以哦～……」`,
        ); // :760
      } else {
        await era.printAndWait(`「呜！摸我的胸！　你这痴汉！！！」`); // :763
      }
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306）
      era.set(`cflag:${target}:306`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:306`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「哈……感觉胸都要融化了……好啊……♪」`); // :771
        // CFLAG:306  = 5（变量语义：CFLAG 族，306）
        era.set(`cflag:${target}:306`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:306`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「我这胸，随魔王大人玩弄啦～……嘻嘻～………………呃………………呃……………………噢～……………………」`,
        ); // :775
        await era.printAndWait(
          `${target_name}陶醉地闭上双眼，夸张地昂首挺胸，胸部不断起伏配合着你的手，发出了让人血脉偾张的可爱呻吟。`,
        ); // :776
        // CFLAG:306  = 4（变量语义：CFLAG 族，306）
        era.set(`cflag:${target}:306`, 4);
      } else if (
        era0(`abl:${target}:1`) >= 3 &&
        (era0(`cflag:${target}:306`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「啊啊……胸部……有感觉了……？」`); // :780
        // CFLAG:306  = 3（变量语义：CFLAG 族，306）
        era.set(`cflag:${target}:306`, 3);
      } else if (era0(`cflag:${target}:306`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「哼！揉胸什么的，不会有感觉的啦！」`); // :784
        // CFLAG:306  = 2（变量语义：CFLAG 族，306）
        era.set(`cflag:${target}:306`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 6) {
    if (era0(`cflag:${target}:307`) == 0 && era0('tflag:13')) {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era_flag.assiplay == 0 &&
        era0(`tequip:${target}:89`) == 0 &&
        era0(`tequip:${target}:90`) == 0
      ) {
        await era.printAndWait(
          `「嘻嘻，我的初吻是魔王大人耶……♪　太好了……亲亲～！」`,
        ); // :799
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era_flag.assiplay == 0 &&
        era0(`tequip:${target}:89`) == 0 &&
        era0(`tequip:${target}:90`) == 0
      ) {
        await era.printAndWait(
          `「魔王大人啊……啊……初吻给的是你，我真是太幸福了……♪」`,
        ); // :802
      } else {
        await era.printAndWait(`「呜呜……明明是初吻啊……被这样的……」`); // :805
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      era.set(`cflag:${target}:307`, 1);
      return 0;
    } else if (era0(`cflag:${target}:307`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊……要接吻吗？好啊～感觉上很浪漫呢～嘻嘻……♪」`,
        ); // :813
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「魔王大人……啊啊……最喜欢您的吻了！……♪」`); // :816
      } else {
        await era.printAndWait(`「舔了我的嘴唇……也不会改变任何事！」`); // :819
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      era.set(`cflag:${target}:307`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:307`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「唔……唔唔……喔～……嘻嘻～」`); // :827
        // CFLAG:307  = 5（变量语义：CFLAG 族，307）
        era.set(`cflag:${target}:307`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:307`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「啊～魔王大人的吻～……唔……唔唔～……喔～」`); // :831
        // CFLAG:307  = 4（变量语义：CFLAG 族，307）
        era.set(`cflag:${target}:307`, 4);
      } else if (
        era0(`abl:${target}:10`) >= 2 &&
        (era0(`cflag:${target}:307`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「只，只是嘴唇的话，就可以……」`); // :835
        // CFLAG:307  = 3（变量语义：CFLAG 族，307）
        era.set(`cflag:${target}:307`, 3);
      } else if (era0(`cflag:${target}:307`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「哼！一张臭嘴！！」`); // :839
        // CFLAG:307  = 2（变量语义：CFLAG 族，307）
        era.set(`cflag:${target}:307`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 7) {
    if (era0(`cflag:${target}:308`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「被看见了……啊……继续视奸我啊！！」`); // :854
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「只，只想给你……一个人看……」`); // :857
      } else {
        await era.printAndWait(`「这……这么羞耻的事……呜……」`); // :860
      }
      // CFLAG:TARGET:308  = 1（变量语义：CFLAG 族，TARGET:308）
      era.set(`cflag:${target}:308`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:308`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊～哦～……再视奸我吧……看我那淫荡的肉穴里面……啊啊～……」`,
        ); // :868
        // CFLAG:306  = 5（变量语义：CFLAG 族，306）
        era.set(`cflag:${target}:306`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:308`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「这，这……是只为你敞开的地方……嘻嘻……」`); // :872
        // CFLAG:306  = 4（变量语义：CFLAG 族，306）
        era.set(`cflag:${target}:306`, 4);
      } else if (
        era0(`abl:${target}:17`) >= 3 &&
        (era0(`cflag:${target}:308`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「啊……被看见了……全部都……可恶～……」`); // :876
        // CFLAG:306  = 3（变量语义：CFLAG 族，306）
        era.set(`cflag:${target}:306`, 3);
      } else if (era0(`cflag:${target}:306`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「喜欢这种样子……你这人啊……」`); // :880
        // CFLAG:306  = 2（变量语义：CFLAG 族，306）
        era.set(`cflag:${target}:306`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 8) {
    if (era0(`cflag:${target}:309`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「啊啊，抠挖着，那手指！喔～伸进来了！！」`); // :895
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`talent:${target}:85`) == 1
      ) {
        await era.printAndWait(`「啊……魔王大人的手指……噢哦～」`); // :898
      } else {
        await era.printAndWait(`「手指进来了～……唔唔」`); // :901
      }
      // CFLAG:TARGET:309  = 1（变量语义：CFLAG 族，TARGET:309）
      era.set(`cflag:${target}:309`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:309`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「啊啊……再继续搅动啊～♪　求你！」`); // :909
        // CFLAG:309  = 5（变量语义：CFLAG 族，309）
        era.set(`cflag:${target}:309`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:309`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「好厉害～……魔王大人的手指……哦哦哦！♪」`); // :913
        await era.printAndWait(
          `${target_name}浑身发烫，双腿直抖，软倒在你的怀里。`,
        ); // :914
        // CFLAG:309  = 4（变量语义：CFLAG 族，309）
        era.set(`cflag:${target}:309`, 4);
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:309`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「啊啊……手指……这么舒服……」`); // :918
        // CFLAG:309  = 3（变量语义：CFLAG 族，309）
        era.set(`cflag:${target}:309`, 3);
      } else if (era0(`cflag:${target}:309`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「住手！这……讨厌的手指！」`); // :922
        // CFLAG:309  = 2（变量语义：CFLAG 族，309）
        era.set(`cflag:${target}:309`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 9) {
    if (era0(`cflag:${target}:310`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「哦啊～黏糊糊的……好棒♪」`); // :937
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「不，不要嘛～舔那种地方……！」`); // :940
      } else {
        await era.printAndWait(`「在干什么？不！！不要啊！！」`); // :943
      }
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310）
      era.set(`cflag:${target}:310`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:310`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「唔哦！再拿舌头伸进去吧～♪」`); // :951
        // CFLAG:310  = 5（变量语义：CFLAG 族，310）
        era.set(`cflag:${target}:310`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:310`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「被舔那里的话……受不了的……♪」`); // :955
        // CFLAG:310  = 4（变量语义：CFLAG 族，310）
        era.set(`cflag:${target}:310`, 4);
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:310`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「喜，喜欢的话……就舔呗……」`); // :959
        // CFLAG:310  = 3（变量语义：CFLAG 族，310）
        era.set(`cflag:${target}:310`, 3);
      } else if (era0(`cflag:${target}:310`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「不要舔……奇怪的地方啦！」`); // :963
        // CFLAG:310  = 2（变量语义：CFLAG 族，310）
        era.set(`cflag:${target}:310`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 10) {
    if (era0(`cflag:${target}:311`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「噢哦喔，这是什么啊……唔！啊啊啊！…」`); // :979
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`talent:${target}:85`) == 1
      ) {
        await era.printAndWait(`「快麻痹啦……噢啊♪」`); // :982
      } else {
        await era.printAndWait(`「这石头怎么回事！……别这样！！」`); // :985
      }
      // CFLAG:TARGET:311  = 1（变量语义：CFLAG 族，TARGET:311）
      era.set(`cflag:${target}:311`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:311`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「啊啊喔～再用力按压……唔唔啊啊♪」`); // :993
        // CFLAG:311  = 5（变量语义：CFLAG 族，311）
        era.set(`cflag:${target}:311`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:311`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「被道具玩弄了……啊啊～♪」`); // :997
        // CFLAG:311  = 4（变量语义：CFLAG 族，311）
        era.set(`cflag:${target}:311`, 4);
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:311`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「这样的小石子……呜呜……有感觉了……」`); // :1001
        // CFLAG:311  = 3（变量语义：CFLAG 族，311）
        era.set(`cflag:${target}:311`, 3);
      } else if (era0(`cflag:${target}:311`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「快住手！　不要把奇怪的东西……强加于我！！」`); // :1005
        // CFLAG:311  = 2（变量语义：CFLAG 族，311）
        era.set(`cflag:${target}:311`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 11 && era0(`tequip:${target}:11`)) {
    if (era0(`cflag:${target}:312`) == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「啊啊……被蠕虫夺取了第一次！　好吧～……」`); // :1023
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「啊啊……如果是魔王大人的话……那该多好啊！」`); // :1026
        } else {
          await era.printAndWait(
            `「呃！！那个奇怪的恶心生物是什么……　吓？它要夺取我的第一次……这不是真的…………」`,
          ); // :1029
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「啊啊……多么下流的生物啊……嘻嘻，来吧……」`); // :1035
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「令人讨厌的东西……真的要放进去吗……」`); // :1038
        } else {
          await era.printAndWait(
            `「呃！！这个恶心的生物……不要啊！！不要拿过来！！！！」`,
          ); // :1041
        }
      }
      // CFLAG:312  = 1（变量语义：CFLAG 族，312）
      era.set(`cflag:${target}:312`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:312`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「啊啊……拿过来……把它弄湿然后放到我里面来……♪」`); // :1050
        // CFLAG:312  = 5（变量语义：CFLAG 族，312）
        era.set(`cflag:${target}:312`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:312`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「要来了吗……我这边已经准备好了……♪」`); // :1054
        // CFLAG:312  = 4（变量语义：CFLAG 族，312）
        era.set(`cflag:${target}:312`, 4);
      } else if (
        era0(`abl:${target}:2`) >= 3 &&
        (era0(`cflag:${target}:312`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「呃……来了……居然对这么恶心的东西……弄出感觉……」`,
        ); // :1058
        // CFLAG:312  = 3（变量语义：CFLAG 族，312）
        era.set(`cflag:${target}:312`, 3);
      } else if (era0(`cflag:${target}:312`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(
          `「不要，不要啊！！……这么恶心的生物……别！！！……」`,
        ); // :1062
        // CFLAG:312  = 2（变量语义：CFLAG 族，312）
        era.set(`cflag:${target}:312`, 2);
      }
      return 0;
    }
  } else if (era_flag.selectcom == 11 && era0(`tequip:${target}:11`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (era0(`cflag:${target}:372`) < 3 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「啊啊……被拿出来了啊……」`); // :1071
      // CFLAG:372  = 3（变量语义：CFLAG 族，372）
      era.set(`cflag:${target}:372`, 3);
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (era0(`cflag:${target}:372`) < 2 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「蠕虫大人……辛苦了～」`); // :1075
      // CFLAG:372  = 2（变量语义：CFLAG 族，372）
      era.set(`cflag:${target}:372`, 2);
    } else if (era0(`cflag:${target}:372`) < 1 || era0('flag:7') == 2) {
      await era.printAndWait(`「呼呼……终于……结束了」`); // :1079
      // CFLAG:372  = 1（变量语义：CFLAG 族，372）
      era.set(`cflag:${target}:372`, 1);
    }
    return 0;
  }

  if (era_flag.selectcom == 12) {
    if (era0(`cflag:${target}:313`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「嘻嘻……什么嘛这个杖？　是个好东西么？」`); // :1093
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「咦？保健器具么？……肩膀是有些酸痛了。」`); // :1096
      } else {
        await era.printAndWait(
          `「什，什么啊……这么大一根！　不要！不要过来！！！」`,
        ); // :1099
      }
      // CFLAG:313  = 1（变量语义：CFLAG 族，313）
      era.set(`cflag:${target}:313`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:313`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「唔……哦！这个令人发麻的快感……呜……不行啦……啊啊！～♪」`,
        ); // :1107
        // CFLAG:313  = 5（变量语义：CFLAG 族，313）
        era.set(`cflag:${target}:313`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:313`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「啊啊啊……有，有，有感觉了……被这根杖……♪」`); // :1111
        // CFLAG:313  = 4（变量语义：CFLAG 族，313）
        era.set(`cflag:${target}:313`, 4);
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:313`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「呜呜呜……这，这个……受不了啦……真是的…………」`); // :1115
        // CFLAG:313  = 3（变量语义：CFLAG 族，313）
        era.set(`cflag:${target}:313`, 3);
      } else if (era0(`cflag:${target}:313`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(
          `「呃……呜……住手！……不要再弄啦！……啊！这感觉～！」`,
        ); // :1119
        // CFLAG:313  = 2（变量语义：CFLAG 族，313）
        era.set(`cflag:${target}:313`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 13 && era0(`tequip:${target}:13`)) {
    if (era0(`cflag:${target}:314`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「啊啊……好样的生物啊！快让我尝尝它的滋味……♪」`); // :1135
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「嘻嘻……这丑陋的东西～♪」`); // :1138
      } else {
        await era.printAndWait(`「什，什么啊这玩意儿……住手！好恶心！！」`); // :1141
      }
      // CFLAG:TARGET:314  = 1（变量语义：CFLAG 族，TARGET:314）
      era.set(`cflag:${target}:314`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:314`) <= 6 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「唔哦……在里面……不停搅动着……好厉害，太厉害啦～哦哦！♪」`,
        ); // :1149
        await era.printAndWait(
          `${target_name}因为肛门虫的活动，媚态尽显地高声呻吟着。`,
        ); // :1150
        // CFLAG:314  = 6（变量语义：CFLAG 族，314）
        era.set(`cflag:${target}:314`, 6);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:314`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「嘻嘻，好啊～再深入我的洞里……♪　再让我更兴奋吧♪」`,
        ); // :1154
        // CFLAG:314  = 6（变量语义：CFLAG 族，314）
        era.set(`cflag:${target}:314`, 6);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:314`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊，屁股里……好棒，多么出色的生物啊～……喔喔喔～！♪」`,
        ); // :1158
        await era.printAndWait(
          `${target_name}被肛门虫蹂躏着尻穴，心荡神驰了。`,
        ); // :1159
        // CFLAG:314  = 5（变量语义：CFLAG 族，314）
        era.set(`cflag:${target}:314`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:314`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「嘻嘻，屁股吗……把这东西放进去吧……♪」`); // :1163
        // CFLAG:314  = 4（变量语义：CFLAG 族，314）
        era.set(`cflag:${target}:314`, 4);
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:314`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「呃呃……不行！感觉到了……被这种卑劣的生物……」`); // :1167
        // CFLAG:314  = 3（变量语义：CFLAG 族，314）
        era.set(`cflag:${target}:314`, 3);
      } else if (era0(`cflag:${target}:314`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「不！！　这种卑劣的东西……不要拿过来！！！」`); // :1171
        // CFLAG:314  = 2（变量语义：CFLAG 族，314）
        era.set(`cflag:${target}:314`, 2);
      }
      return 0;
    }
  } else if (era_flag.selectcom == 13 && era0(`tequip:${target}:13`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (era0(`cflag:${target}:374`) < 4 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「哈哈哈……好厉害……」`); // :1180
      // CFLAG:374  = 4（变量语义：CFLAG 族，374）
      era.set(`cflag:${target}:374`, 4);
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (era0(`cflag:${target}:374`) < 3 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「嘻嘻，可爱的东西哦，从屁股里出来啦～♪」`); // :1184
      // CFLAG:374  = 3（变量语义：CFLAG 族，374）
      era.set(`cflag:${target}:374`, 3);
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (era0(`cflag:${target}:374`) < 2 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「呼……呼……呃……请温柔一点拔出来……」`); // :1188
      // CFLAG:374  = 2（变量语义：CFLAG 族，374）
      era.set(`cflag:${target}:374`, 2);
    } else if (era0(`cflag:${target}:374`) < 1 || era0('flag:7') == 2) {
      await era.printAndWait(`「哈，哈……终于结束了……」`); // :1192
      // CFLAG:374  = 1（变量语义：CFLAG 族，374）
      era.set(`cflag:${target}:374`, 1);
    }
    return 0;
  }

  if (era_flag.selectcom == 14 && era0(`tequip:${target}:14`)) {
    if (era0(`cflag:${target}:315`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「嘻嘻～还有这种东西啊～魔王大人～真绅士～！～♪」`,
        ); // :1207
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「它跳动的样子！就像是魔王大人满满的爱意～♪」`); // :1210
      } else {
        await era.printAndWait(`「被夹上会很痛的吧？！别！！！放开我！！！」`); // :1213
      }
      // CFLAG:315  = 1（变量语义：CFLAG 族，315）
      era.set(`cflag:${target}:315`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:315`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊～久违的夹子～快！狠狠地夹着我的那里！让我发疯吧！」`,
        ); // :1221
        // CFLAG:315  = 4（变量语义：CFLAG 族，315）
        era.set(`cflag:${target}:315`, 4);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:315`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「看，我的小豆豆，已经为魔王大人而勃起了。只要能令你高兴，要人家……要人家怎么样都可以…………」`,
        ); // :1225
        // CFLAG:315  = 3（变量语义：CFLAG 族，315）
        era.set(`cflag:${target}:315`, 3);
      } else if (era0(`cflag:${target}:315`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「这夹子………唔唔………」`); // :1229
        // CFLAG:315  = 2（变量语义：CFLAG 族，315）
        era.set(`cflag:${target}:315`, 2);
      }
      return 0;
    }
  } else if (era_flag.selectcom == 14 && era0(`tequip:${target}:14`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (era0(`cflag:${target}:375`) < 3 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(
        `「呃～啊！！我的阴蒂，已经红肿得发疼了！继续！继续蹂躏我啊！」`,
      ); // :1238
      // CFLAG:375  = 3（变量语义：CFLAG 族，375）
      era.set(`cflag:${target}:375`, 3);
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (era0(`cflag:${target}:375`) < 2 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「呃～噢！！魔……魔王大人……尽兴了吗？」`); // :1242
      // CFLAG:375  = 2（变量语义：CFLAG 族，375）
      era.set(`cflag:${target}:375`, 2);
    } else if (era0(`cflag:${target}:375`) < 1 || era0('flag:7') == 2) {
      await era.printAndWait(`「哎呀………唔唔………」`); // :1246
      // CFLAG:375  = 1（变量语义：CFLAG 族，375）
      era.set(`cflag:${target}:375`, 1);
    }
    return 0;
  }

  if (era_flag.selectcom == 15 && era0(`tequip:${target}:15`)) {
    if (era0(`cflag:${target}:316`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「嘻嘻～还有这种东西啊～魔王大人～大～♪变～♪态～♪」`,
        ); // :1261
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「人家的身体，就是为了侍奉魔王大人而存在的～请尽情玩弄人家的胸部吧～♪」`,
        ); // :1264
      } else {
        await era.printAndWait(`「连乳头也？！感觉会很疼！！！饶了我！！！」`); // :1267
      }
      // CFLAG:316  = 1（变量语义：CFLAG 族，316）
      era.set(`cflag:${target}:316`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:316`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「乳头完全勃起了～快！狠狠地夹着我的乳头！把我淫乱的乳头玩坏吧！」`,
        ); // :1275
        // CFLAG:316  = 4（变量语义：CFLAG 族，316）
        era.set(`cflag:${target}:316`, 4);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:316`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「乳……乳头勃起什么的……那是因为见到了魔王大人而情不自禁…………！我是魔王大人最忠实的奴隶，请尽情地玩弄我吧！」`,
        ); // :1279
        // CFLAG:316  = 3（变量语义：CFLAG 族，316）
        era.set(`cflag:${target}:316`, 3);
      } else if (era0(`cflag:${target}:316`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「乳……乳头夹什么的…………啊……！」`); // :1283
        // CFLAG:316  = 2（变量语义：CFLAG 族，316）
        era.set(`cflag:${target}:316`, 2);
      }
      return 0;
    }
  } else if (era_flag.selectcom == 15 && era0(`tequip:${target}:15`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (era0(`cflag:${target}:376`) < 3 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(
        `「嘻嘻！人家的乳头，被你弄得发麻了，好舒服～！」`,
      ); // :1292
      // CFLAG:376  = 3（变量语义：CFLAG 族，376）
      era.set(`cflag:${target}:376`, 3);
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (era0(`cflag:${target}:376`) < 2 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(
        `「啊啊！乳头……乳头……已经切实地记住魔王大人的爱意了！」`,
      ); // :1296
      // CFLAG:376  = 2（变量语义：CFLAG 族，376）
      era.set(`cflag:${target}:376`, 2);
    } else if (era0(`cflag:${target}:376`) < 1 || era0('flag:7') == 2) {
      await era.printAndWait(`「乳……乳头……好像不再属于自己了一样…………唔哦！」`); // :1300
      // CFLAG:376  = 1（变量语义：CFLAG 族，376）
      era.set(`cflag:${target}:376`, 1);
    }
    return 0;
  }

  if (era_flag.selectcom == 16 && era0(`tequip:${target}:16`)) {
    if (era0(`cflag:${target}:317`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊！啊！啊！～～～这么用力吸的话……会…………会………………」`,
        ); // :1315
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「哦～哦～麻麻的……好像被婴儿吸啜着一样………好想……好想为魔王大人生个小孩啊……………」`,
        ); // :1318
      } else {
        await era.printAndWait(
          `「母乳什么的……不可强求啦……拿下来！……拿下来啊！！」`,
        ); // :1321
      }
      // CFLAG:317  = 1（变量语义：CFLAG 族，317）
      era.set(`cflag:${target}:317`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:317`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊！啊！啊！～～～太～太舒服了！！再吸！再用力吸……………」`,
        ); // :1329
        // CFLAG:317  = 4（变量语义：CFLAG 族，317）
        era.set(`cflag:${target}:317`, 4);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:317`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「唔～哦哦！～～～感觉胸中满满的……爱意……和奶水一起……被吸出来了！……魔王大人啊！魔王大人哦！………」`,
        ); // :1333
        // CFLAG:317  = 3（变量语义：CFLAG 族，317）
        era.set(`cflag:${target}:317`, 3);
      } else if (era0(`cflag:${target}:317`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「呃……啊！！啊………明明是喂小孩的说…………」`); // :1337
        // CFLAG:317  = 2（变量语义：CFLAG 族，317）
        era.set(`cflag:${target}:317`, 2);
      }
      return 0;
    }
  } else if (era_flag.selectcom == 16 && era0(`tequip:${target}:16`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (era0(`cflag:${target}:377`) < 3 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「嘻嘻～我的那些奶水，我自己能尝尝么～……………」`); // :1346
      // CFLAG:377  = 3（变量语义：CFLAG 族，377）
      era.set(`cflag:${target}:377`, 3);
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (era0(`cflag:${target}:377`) < 2 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(
        `「那……那些……母乳……只是为了魔王大人……只能给魔王大人……………」`,
      ); // :1350
      // CFLAG:377  = 2（变量语义：CFLAG 族，377）
      era.set(`cflag:${target}:377`, 2);
    } else if (era0(`cflag:${target}:377`) < 1 || era0('flag:7') == 2) {
      await era.printAndWait(`「呼……呼呼…………吸得太用力了……………」`); // :1354
      // CFLAG:377  = 1（变量语义：CFLAG 族，377）
      era.set(`cflag:${target}:377`, 1);
    }
    return 0;
  }

  if (era_flag.selectcom == 19 && era0(`tequip:${target}:19`)) {
    if (era0(`cflag:${target}:320`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「嘻嘻，又变出了什么邪恶的道具了～……♪」`); // :1423
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「啊？这个，要放到屁股里么……？　只……只要能令你高兴的话……♪」`,
        ); // :1426
      } else {
        await era.printAndWait(
          `「这是……什么？　啥？　屁股里！？　怎能这样……」`,
        ); // :1429
      }
      // CFLAG:TARGET:320  = 1（变量语义：CFLAG 族，TARGET:320）
      era.set(`cflag:${target}:320`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:320`) <= 6 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「噢～便便的地方，被塞满了……呵呵～全部放进去了没？」`,
        ); // :1437
        // CFLAG:320  = 7（变量语义：CFLAG 族，320）
        era.set(`cflag:${target}:320`, 7);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:320`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「呃～～好痛苦……魔王大人！人家快受不了啦……♪」`); // :1441
        // CFLAG:320  = 6（变量语义：CFLAG 族，320）
        era.set(`cflag:${target}:320`, 6);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:320`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「好热，屁股好热……继续，继续放进去吧……♪」`); // :1445
        // CFLAG:320  = 5（变量语义：CFLAG 族，320）
        era.set(`cflag:${target}:320`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:320`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「呃！！屁股里……痛…痛…痛……啊！不用管我！请继续吧！……」`,
        ); // :1449
        // CFLAG:320  = 4（变量语义：CFLAG 族，320）
        era.set(`cflag:${target}:320`, 4);
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:320`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「可恶，有感觉了……被这种玩具……弄菊花…………」`); // :1453
        // CFLAG:320  = 3（变量语义：CFLAG 族，320）
        era.set(`cflag:${target}:320`, 3);
      } else if (era0(`cflag:${target}:320`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(
          `「痛！啊！！好痛啊！！停手！！停手！！不要再放进去啦！」`,
        ); // :1457
        // CFLAG:320  = 2（变量语义：CFLAG 族，320）
        era.set(`cflag:${target}:320`, 2);
      }
      return 0;
    }
  } else if (era_flag.selectcom == 19 && era0(`tequip:${target}:19`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (era0(`cflag:${target}:379`) < 4 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「一下子，一下子拔出来吧！♪」`); // :1466
      // CFLAG:379  = 4（变量语义：CFLAG 族，379）
      era.set(`cflag:${target}:379`, 4);
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (era0(`cflag:${target}:379`) < 3 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(
        `「请，请温柔点，慢慢拔……让我充分，感受到魔王大人……」`,
      ); // :1470
      // CFLAG:379  = 3（变量语义：CFLAG 族，379）
      era.set(`cflag:${target}:379`, 3);
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (era0(`cflag:${target}:379`) < 2 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「呃……唔……哦哦～啊！！……」`); // :1474
      // CFLAG:379  = 2（变量语义：CFLAG 族，379）
      era.set(`cflag:${target}:379`, 2);
    } else if (era0(`cflag:${target}:379`) < 1 || era0('flag:7') == 2) {
      await era.printAndWait(`「好痛啊！！慢慢地，慢慢地拔啊！…………呜～……」`); // :1478
      // CFLAG:379  = 1（变量语义：CFLAG 族，379）
      era.set(`cflag:${target}:379`, 1);
    }
    return 0;
  }

  if (era_flag.selectcom == 20) {
    if (era0(`cflag:${target}:321`) == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「快啊～快贯穿我这没用过的私处！……♪」`); // :1494
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          era0(`abl:${target}:10`) >= 5
        ) {
          await era.printAndWait(`「好……好棒……终于…………♪」`); // :1497
        } else {
          await era.printAndWait(`「呜……第一次……是这样……」`); // :1500
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「这姿势么～好啊！来吧～……♪」`); // :1505
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「啊～魔王大人！抱着我……♪」`); // :1508
        } else {
          await era.printAndWait(`「哼～最多动下腰……」`); // :1511
        }
      }
      // CFLAG:321  = 1（变量语义：CFLAG 族，321）
      era.set(`cflag:${target}:321`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:321`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「啊！哦！再来！再插我！……好棒～♪」`); // :1520
        // CFLAG:321  = 6（变量语义：CFLAG 族，321）
        era.set(`cflag:${target}:321`, 6);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:321`) <= 4 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「插进来！占有我！！……让我完全成为魔王大人的东西……让我只能想着魔王大人！！啊啊！～唔～啊！！～♪」`,
          ); // :1525
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「唔～哦！！从一放进来开始……身体就不受控制了！！啊～我的身体，已经不属于我了……全部都是属于魔王大人的！！」`,
          ); // :1527
        } else {
          await era.printAndWait(
            `「魔王大人～！操我！操我！再用力地操我！！已经无法思考了！！把我操得乱七八糟吧！！」`,
          ); // :1529
        }
        await era.printAndWait(`「啊啊、好棒啊……再用力点啊……♪」`); // :1531
        // CFLAG:321  = 5（变量语义：CFLAG 族，321）
        era.set(`cflag:${target}:321`, 5);
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (era0(`cflag:${target}:321`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「唔、唔……喔……感、感觉到了……」`); // :1535
        // CFLAG:321  = 4（变量语义：CFLAG 族，321）
        era.set(`cflag:${target}:321`, 4);
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:321`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「随你……喜欢…………」`); // :1539
        // CFLAG:321  = 3（变量语义：CFLAG 族，321）
        era.set(`cflag:${target}:321`, 3);
      } else if (era0(`cflag:${target}:321`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「可恶！不要啊！　别弄我！！」`); // :1543
        // CFLAG:321  = 2（变量语义：CFLAG 族，321）
        era.set(`cflag:${target}:321`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 21) {
    if (era0(`cflag:${target}:322`) == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「快，快啊！　用肉棒！！　夺取我的第一次…！」`,
          ); // :1560
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「想要…想要啊！　你的……！」`); // :1563
        } else {
          await era.printAndWait(`「别开玩笑了……第一次……居然是这种形式……」`); // :1567
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「快，快啊！　肉棒！肉棒哦！！」`); // :1573
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「想要…想要啊！　你的……！」`); // :1576
        } else {
          await era.printAndWait(`「像野兽一样的姿势……讨厌……」`); // :1579
        }
      }
      // CFLAG:322  = 1（变量语义：CFLAG 族，322）
      era.set(`cflag:${target}:322`, 1);
      return 0;
    } else if (era0(`talent:${target}:153`)) {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:322`) <= 5 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「让肚子里的小家伙也尝尝精液的味道吧！！」`); // :1589
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「连孕妇也上……简直就是野兽嘛♪」`); // :1591
        } else {
          await era.printAndWait(`「嗯啊啊啊啊噢噢噢！！」`); // :1593
        }
        // CFLAG:322  = 6（变量语义：CFLAG 族，322）
        era.set(`cflag:${target}:322`, 6);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:322`) <= 4 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「感觉到了……连肚子里的小家伙也感觉到咯♪」`); // :1599
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「肚子里、有感觉了……两个人一起感觉到咯♪」`); // :1601
        } else {
          await era.printAndWait(`「再深一点……把爱传给肚子里的小家伙把♪」`); // :1603
        }
        // CFLAG:322  = 5（变量语义：CFLAG 族，322）
        era.set(`cflag:${target}:322`, 5);
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (era0(`cflag:${target}:322`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「好有感觉……这种姿势……孕妇怎么能……像野兽一样」`,
        ); // :1608
        // CFLAG:322  = 4（变量语义：CFLAG 族，322）
        era.set(`cflag:${target}:322`, 4);
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:322`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「随便你了……无所谓了」`); // :1612
        // CFLAG:322  = 3（变量语义：CFLAG 族，322）
        era.set(`cflag:${target}:322`, 3);
      } else if (era0(`cflag:${target}:322`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「强奸孕妇什么的……别开玩笑了」`); // :1616

        // CFLAG:322  = 2（变量语义：CFLAG 族，322）
        era.set(`cflag:${target}:322`, 2);
      }
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:322`) <= 5 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「再……再……再来！　使劲操我！！」`); // :1626
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「我……我就是你的一只母狗……！　太棒了……」`); // :1628
        } else {
          await era.printAndWait(`「唔啊啊啊啊啊啊！！」`); // :1630
        }
        // CFLAG:322  = 6（变量语义：CFLAG 族，322）
        era.set(`cflag:${target}:322`, 6);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:322`) <= 4 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊啊啊～……感觉太强烈了！魔王大人……请好好地疼爱你最忠实的母狗吧！」`,
          ); // :1636
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「这下流的姿势……也挺不错的…………只要是为了魔王大人……要人家做什么都可以！」`,
          ); // :1638
        } else {
          await era.printAndWait(
            `「深深地插我……深深地插我吧～♪　我是魔王大人的奴隶！我是魔王大人的母狗！　噢～～啊！！！」`,
          ); // :1640
        }
        // CFLAG:322  = 5（变量语义：CFLAG 族，322）
        era.set(`cflag:${target}:322`, 5);
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (era0(`cflag:${target}:322`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「唔唔～感觉来了……这种姿势……像野兽一样…………」`); // :1645
        // CFLAG:322  = 4（变量语义：CFLAG 族，322）
        era.set(`cflag:${target}:322`, 4);
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:322`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「喜，喜欢的话……也不是不行……」`); // :1649
        // CFLAG:322  = 3（变量语义：CFLAG 族，322）
        era.set(`cflag:${target}:322`, 3);
      } else if (era0(`cflag:${target}:322`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「这样的姿势……好羞耻…………」`); // :1653

        // CFLAG:322  = 2（变量语义：CFLAG 族，322）
        era.set(`cflag:${target}:322`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 22) {
    if (era0(`cflag:${target}:323`) == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「用力地抱着我……夺取我的第一次把！……♪」`); // :1669
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「请，请温柔地抱着我……人家是第一次……」`); // :1672
        } else {
          await era.printAndWait(`「第一次……被你这家伙……！」`); // :1675
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「被这样地抱着……♪　好舒服啊……♪」`); // :1681
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「好棒啊……被这样地抱着……♪」`); // :1684
        } else {
          await era.printAndWait(`「你这家伙……这个样子……」`); // :1687
        }
      }
      // CFLAG:323  = 1（变量语义：CFLAG 族，323）
      era.set(`cflag:${target}:323`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:323`) <= 5 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「来亲亲吧～……噢……啊啊～♪　好深，好深啊！……♪」`,
          ); // :1697
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「再用力地抱紧我吧……啊……再插到里面去……喔喔～啊！♪」`,
          ); // :1699
        } else {
          await era.printAndWait(
            `「好……好啊……能清楚地看到你的神情呢……嘻嘻～」`,
          ); // :1701
        }
        // CFLAG:323  = 6（变量语义：CFLAG 族，323）
        era.set(`cflag:${target}:323`, 6);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:323`) <= 4 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「紧紧相拥……深深凝视……好喜欢这样……我是魔王大人的东西～我永远都是魔王大人的东西～！！」`,
          ); // :1707
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「再用力地抱紧我吧……啊啊……身心都要融化了……在魔王大人的怀里～好幸福啊～！」`,
          ); // :1709
        } else {
          await era.printAndWait(
            `「亲亲……想亲亲……彼此相连着……温柔地……嘻嘻～……能遇见魔王大人，真是我上辈子的福气！」`,
          ); // :1711
        }
        // CFLAG:323  = 5（变量语义：CFLAG 族，323）
        era.set(`cflag:${target}:323`, 5);
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (era0(`cflag:${target}:323`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「啊……这感觉……被你抱着……啊……噢…………」`); // :1716
        // CFLAG:323  = 4（变量语义：CFLAG 族，323）
        era.set(`cflag:${target}:323`, 4);
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:323`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「哦！～哦！……喜，喜欢……的话……可以亲……亲哦……」`,
        ); // :1720
        // CFLAG:323  = 3（变量语义：CFLAG 族，323）
        era.set(`cflag:${target}:323`, 3);
      } else if (era0(`cflag:${target}:323`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「住手……这样子的……快住手啊……！」`); // :1724
        // CFLAG:323  = 2（变量语义：CFLAG 族，323）
        era.set(`cflag:${target}:323`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 23) {
    if (era0(`cflag:${target}:324`) == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「第一次就从后面来啊……嘻嘻，有意思……」`); // :1740
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「第一次什么的……从后抱着我…………」`); // :1743
        } else {
          await era.printAndWait(`「明明是第一次还要从后面来……讨厌…………」`); // :1746
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「从后面来啊……嘻嘻，有意思……」`); // :1752
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「从后抱着我…………」`); // :1755
        } else {
          await era.printAndWait(`「从后面来……讨厌…………」`); // :1758
        }
      }
      // CFLAG:324  = 1（变量语义：CFLAG 族，324）
      era.set(`cflag:${target}:324`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:324`) <= 5 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「揉我的胸！！……从后面，把我顶飞吧！！♪」`); // :1768
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「好棒……哈……唔……哦哦哦！……用力顶我！操我～♪」`,
          ); // :1770
        } else {
          await era.printAndWait(`「好……唔唔唔……啊……噢！！～好棒啊～♪」`); // :1772
        }
        // CFLAG:324  = 6（变量语义：CFLAG 族，324）
        era.set(`cflag:${target}:324`, 6);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:324`) <= 4 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「从后面……抱紧人家嘛～♪　啊……好深……魔王大人……我好爱你啊！～」`,
          ); // :1778
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「被这样抱着～……太舒服了……噢～♪　人家再也离不开魔王大人了……」`,
          ); // :1780
        } else {
          await era.printAndWait(
            `「唔唔～……想看你的脸～！嘻嘻～不过你也看不到我羞羞的样子～……♪　魔王大人的气息……喷在我脖子上……感觉全身都酸麻了」`,
          ); // :1782
        }
        // CFLAG:324  = 5（变量语义：CFLAG 族，324）
        era.set(`cflag:${target}:324`, 5);
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (era0(`cflag:${target}:324`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「唔……啊……啊……哦哦哦！！」`); // :1787
        // CFLAG:324  = 4（变量语义：CFLAG 族，324）
        era.set(`cflag:${target}:324`, 4);
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:324`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「不……不要这样……盯着我嘛……还这么近……」`); // :1791
        // CFLAG:324  = 3（变量语义：CFLAG 族，324）
        era.set(`cflag:${target}:324`, 3);
      } else if (era0(`cflag:${target}:324`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「呃……从后面…不要啦！」`); // :1795
        // CFLAG:324  = 2（变量语义：CFLAG 族，324）
        era.set(`cflag:${target}:324`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 26) {
    if (era0(`cflag:${target}:327`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「哈哈，喜欢走后门吗～好哦……来吧！」`); // :1810
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「喜欢这种地方吗……？　大～变～态～」`); // :1813
      } else {
        await era.printAndWait(`「停、停下啊！　在想什么哪！」`); // :1816
      }
      // CFLAG:TARGET:327  = 1（变量语义：CFLAG 族，TARGET:327）
      era.set(`cflag:${target}:327`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:327`) <= 6 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「唔～哦哦～♪　菊穴，感觉太强烈了～♪」`); // :1825
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「唔～啊啊～♪　插入便便的洞洞里了～♪」`); // :1827
        } else {
          await era.printAndWait(`「呃～后面的洞～哦！哦哦～♪」`); // :1829
        }
        // CFLAG:327  = 7（变量语义：CFLAG 族，327）
        era.set(`cflag:${target}:327`, 7);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:327`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「痛～好痛……没事～♪　没关系的，马上就会习惯的啦～」`,
        ); // :1834
        // CFLAG:327  = 6（变量语义：CFLAG 族，327）
        era.set(`cflag:${target}:327`, 6);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:327`) <= 4 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「屁股……啊～感觉到了～噢～♪」`); // :1839
        } else {
          await era.printAndWait(`「屁股……屁股好热～好烫啊～♪」`); // :1841
        }
        // CFLAG:327  = 5（变量语义：CFLAG 族，327）
        era.set(`cflag:${target}:327`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:327`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「呃！啊！痛！～人家，人家会努力提高屁股的感觉……没关系，很，很舒服」`,
        ); // :1846
        // CFLAG:327  = 4（变量语义：CFLAG 族，327）
        era.set(`cflag:${target}:327`, 4);
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:327`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「唔哦……啊～♪　！　感，感觉到了～……」`); // :1850
        // CFLAG:327  = 3（变量语义：CFLAG 族，327）
        era.set(`cflag:${target}:327`, 3);
      } else if (era0(`cflag:${target}:327`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「要用这种地方……」`); // :1854
        // CFLAG:327  = 2（变量语义：CFLAG 族，327）
        era.set(`cflag:${target}:327`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 27) {
    if (era0(`cflag:${target}:328`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「终……终于…要用肉棒插我了吗！　等好久了……」`); // :1869
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「这，这么脏的地方……会弄脏你的棒棒的……」`); // :1872
      } else {
        await era.printAndWait(
          `「你这人，整天在想些什么啊！　这个……变态狂！」`,
        ); // :1875
      }
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328）
      era.set(`cflag:${target}:328`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:328`) <= 6 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「呼……呼……唔哦哦哦哦哦哦！！　用力插进去！把我里面弄得乱七八糟吧！！」`,
          ); // :1884
        } else {
          await era.printAndWait(
            `「啊……哦哦……光插进来，感觉就这么地强烈……我，我是你的菊穴奴隶了～♪」`,
          ); // :1886
        }
        // CFLAG:328  = 7（变量语义：CFLAG 族，328）
        era.set(`cflag:${target}:328`, 7);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:328`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「啊……好、好哦……再、再来……」`); // :1891
        // CFLAG:328  = 6（变量语义：CFLAG 族，328）
        era.set(`cflag:${target}:328`, 6);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:328`) <= 4 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「好…好棒……魔王大人…你…就喜欢这种地方么…噢哦哦！！」`,
          ); // :1896
        } else {
          await era.printAndWait(`「屁股…好舒服啊～…已经，已经回不去了………」`); // :1898
        }
        // CFLAG:328  = 5（变量语义：CFLAG 族，328）
        era.set(`cflag:${target}:328`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:328`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「这，这种姿势插这样的洞洞……好像野兽一样……」`); // :1903
        // CFLAG:328  = 4（变量语义：CFLAG 族，328）
        era.set(`cflag:${target}:328`, 4);
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:328`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「这、这样的洞、我……我居然……有感觉了……」`); // :1907
        // CFLAG:328  = 3（变量语义：CFLAG 族，328）
        era.set(`cflag:${target}:328`, 3);
      } else if (era0(`cflag:${target}:328`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「好、好脏……不要弄那里！」`); // :1911
        // CFLAG:328  = 2（变量语义：CFLAG 族，328）
        era.set(`cflag:${target}:328`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 28) {
    if (era0(`cflag:${target}:329`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「啊……这样面对面地欺负人家的菊花啊～……♪」`); // :1926
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「这样的地方……嘻嘻，真会玩！」`); // :1929
      } else {
        await era.printAndWait(`「哼……不想见到你这家伙的脸……」`); // :1932
      }
      // CFLAG:TARGET:329  = 1（变量语义：CFLAG 族，TARGET:329）
      era.set(`cflag:${target}:329`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:329`) <= 6 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「啊……要融化了……再用力抱我啊～」`); // :1941
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「来嘛……来嘛……看着我这下贱的神色……♪」`); // :1943
        } else {
          await era.printAndWait(`「菊花要融化了……多么美妙啊……♪」`); // :1945
        }
        // CFLAG:329  = 7（变量语义：CFLAG 族，329）
        era.set(`cflag:${target}:329`, 7);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:329`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「呵呵……来的好……感觉到了……」`); // :1950
        // CFLAG:329  = 6（变量语义：CFLAG 族，329）
        era.set(`cflag:${target}:329`, 6);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:329`) <= 4 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「啊……好棒……哦～♪」`); // :1955
        } else {
          await era.printAndWait(`「再继续弄屁股……往里面去～……♪」`); // :1957
        }
        // CFLAG:329  = 5（变量语义：CFLAG 族，329）
        era.set(`cflag:${target}:329`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:329`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「会，会努力的……为了让魔王大人高兴……会让这里也很有感觉……」`,
        ); // :1962
        // CFLAG:329  = 4（变量语义：CFLAG 族，329）
        era.set(`cflag:${target}:329`, 4);
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:329`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「呃……这种……地方……居然有感觉了……」`); // :1966
        // CFLAG:329  = 3（变量语义：CFLAG 族，329）
        era.set(`cflag:${target}:329`, 3);
      } else if (era0(`cflag:${target}:329`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「好痛……痛死了！一点都不舒服！快停止！！」`); // :1970
        // CFLAG:329  = 2（变量语义：CFLAG 族，329）
        era.set(`cflag:${target}:329`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 29) {
    if (era0(`cflag:${target}:330`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「呵呵……来吧～……♪」`); // :1985
        await era.printAndWait(`${target_name}扭动着腰，诱惑着你。`); // :1986
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「请通过屁股……疼爱我吧……♪」`); // :1989
      } else {
        await era.printAndWait(`「你……你这家伙，居然走后门！」`); // :1992
      }
      // CFLAG:TARGET:330  = 1（变量语义：CFLAG 族，TARGET:330）
      era.set(`cflag:${target}:330`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:330`) <= 6 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「啊……被从后……贯穿啦～♪」`); // :2001
        } else {
          await era.printAndWait(`「好棒……好棒……拉屎的洞，还能这么用～♪」`); // :2003
        }
        // CFLAG:330  = 7（变量语义：CFLAG 族，330）
        era.set(`cflag:${target}:330`, 7);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:330`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「嘻嘻……菊花也是好东西呢～」`); // :2008
        // CFLAG:330  = 6（变量语义：CFLAG 族，330）
        era.set(`cflag:${target}:330`, 6);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:330`) <= 4 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「啊……好有快感……用这样的地方……」`); // :2013
        } else {
          await era.printAndWait(
            `「为了魔王大人……用下流的地方……做下流的事了……」`,
          ); // :2015
        }
        // CFLAG:330  = 5（变量语义：CFLAG 族，330）
        era.set(`cflag:${target}:330`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:330`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「还是有点痛……会习惯的……」`); // :2020
        // CFLAG:330  = 4（变量语义：CFLAG 族，330）
        era.set(`cflag:${target}:330`, 4);
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:330`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「被弄这地方……居然有快感了……」`); // :2024
        // CFLAG:330  = 3（变量语义：CFLAG 族，330）
        era.set(`cflag:${target}:330`, 3);
      } else if (era0(`cflag:${target}:330`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「呃啊！……真的只有痛楚啦……！」`); // :2028
        // CFLAG:330  = 2（变量语义：CFLAG 族，330）
        era.set(`cflag:${target}:330`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 30) {
    if (era0(`cflag:${target}:331`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「嘻嘻……喜欢用手啊～……♪」`); // :2043
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「重要的地方……要慎重地对待！♪」`); // :2046
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「要我用手？！……好……好吧……！」`); // :2049
      } else {
        await era.printAndWait(`「光碰到就觉得恶心！」`); // :2052
      }
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331）
      era.set(`cflag:${target}:331`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:331`) <= 5 || era0('flag:7') == 2)
      ) {
        if (era0(`talent:${player}:318`) == 1) {
          await era.printAndWait(`「呵呵，真是令人惊叹啊……两只手都握不住呢♪」`); // :2062
        } else if (era0(`talent:${player}:318`) == 2) {
          await era.printAndWait(
            `「什么啊这个小玩意……呵呵，再多勃起一点，喏，在更努力一点吧♪」`,
          ); // :2065
        } else if (era0(`talent:${player}:318`) == 3) {
          await era.printAndWait(
            `「呵呵，把皮裹着的肉棒一点一点剥开什么的真好意思说呢♪」`,
          ); // :2068
        } else if (era0(`talent:${player}:318`) == 4) {
          await era.printAndWait(`「马肉棒……怎么做才好呢，呵呵，这样如何？」`); // :2071
        }
        if (rand_n(2) == 0) {
          await era.printAndWait(`「你看你看～……要出来了哦！……♪」`); // :2074
        } else {
          await era.printAndWait(`「嘻嘻～……不停地跳动着……看起来很美味呢～♪」`); // :2076
        }
        // CFLAG:331  = 6（变量语义：CFLAG 族，331）
        era.set(`cflag:${target}:331`, 6);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (era0(`cflag:${target}:331`) <= 4 || era0('flag:7') == 2)
      ) {
        if (era0(`talent:${player}:318`) == 1) {
          await era.printAndWait(`「哦，真是令人惊叹啊……两只手都握不住呢♪」`); // :2083
        } else if (era0(`talent:${player}:318`) == 2) {
          await era.printAndWait(
            `「什么啊这个小玩意……呵呵，再多勃起一点，喏，在更努力一点吧♪」`,
          ); // :2086
        } else if (era0(`talent:${player}:318`) == 3) {
          await era.printAndWait(
            `「呵呵，把皮裹着的棒棒一点一点剥开什么的真好意思说呢♪」`,
          ); // :2089
        } else if (era0(`talent:${player}:318`) == 4) {
          await era.printAndWait(`「马棒棒……怎么做才好呢，呵呵，这样如何？」`); // :2092
        }
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「会好好地侍奉魔王大人的……你看！它变硬了呢～♪」`,
          ); // :2095
        } else {
          await era.printAndWait(`「舒服么……？　嘻嘻～」`); // :2097
        }
        // CFLAG:331  = 5（变量语义：CFLAG 族，331）
        era.set(`cflag:${target}:331`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:331`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「用手的感觉如何？」`); // :2102
        // CFLAG:331  = 4（变量语义：CFLAG 族，331）
        era.set(`cflag:${target}:331`, 4);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:331`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「我知道啦……只是摸一下哦」`); // :2106
        // CFLAG:331  = 3（变量语义：CFLAG 族，331）
        era.set(`cflag:${target}:331`, 3);
      } else if (era0(`cflag:${target}:331`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「好脏……不知廉耻！！」`); // :2110
        // CFLAG:331  = 2（变量语义：CFLAG 族，331）
        era.set(`cflag:${target}:331`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 31) {
    if (era0(`cflag:${target}:332`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「为什么留到现在才让我舔呢……？　嘻嘻」`); // :2125
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「一直期待着，用嘴巴侍奉魔王大人……！」`); // :2128
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「只，只是舔一下的话……」`); // :2131
      } else {
        await era.printAndWait(`「这，这种东西也能舔啊……？！」`); // :2134
      }
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332）
      era.set(`cflag:${target}:332`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (era0(`cflag:${target}:332`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「把精液射给我……已经无法忍耐啦～　唔～～唔～～～」`,
        ); // :2142
        await era.print(`${target_name}用舌头舔舐着阴茎，时而含入嘴里。`); // :2143
        // CFLAG:332  = 6（变量语义：CFLAG 族，332）
        era.set(`cflag:${target}:332`, 6);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:332`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「嘻嘻～它变得这么硬了～」`); // :2147
        // CFLAG:332  = 5（变量语义：CFLAG 族，332）
        era.set(`cflag:${target}:332`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (era0(`cflag:${target}:332`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「魔王大人……想射的时候，随时可以射出来哦～人家会好好地接住的！」`,
        ); // :2151
        await era.print(
          `${target_name}充满爱意地将阴茎含入嘴里，头部有节奏地运动着。`,
        ); // :2152
        // CFLAG:332  = 4（变量语义：CFLAG 族，332）
        era.set(`cflag:${target}:332`, 4);
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:332`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「我知道啦……只，只是舔一下哦…………」`); // :2156
        // CFLAG:332  = 3（变量语义：CFLAG 族，332）
        era.set(`cflag:${target}:332`, 3);
      } else if (era0(`cflag:${target}:332`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「真……讨厌……好臭…………」`); // :2160
        // CFLAG:332  = 2（变量语义：CFLAG 族，332）
        era.set(`cflag:${target}:332`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 32) {
    if (era0(`cflag:${target}:333`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「也有喜欢用胸部夹着的人呢～♪」`); // :2175
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「看啊～用胸部夹起来了哦～♪」`); // :2178
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「这，这样就行了吧……」`); // :2181
      } else {
        await era.printAndWait(`「夹着你那玩意儿……别说傻话了！」`); // :2184
      }
      // CFLAG:TARGET:333  = 1（变量语义：CFLAG 族，TARGET:333）
      era.set(`cflag:${target}:333`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (era0(`cflag:${target}:332`) <= 5 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「舒服么……？　嘻嘻～感觉胸部都开始变烫了～……」`,
          ); // :2193
        } else {
          await era.printAndWait(`「柔软么？　到底是什么样的感觉？　嗯？」`); // :2195
        }
        // CFLAG:333  = 6（变量语义：CFLAG 族，333）
        era.set(`cflag:${target}:333`, 6);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:332`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「喜欢用胸部啊……？　嘻嘻」`); // :2200
        // CFLAG:333  = 5（变量语义：CFLAG 族，333）
        era.set(`cflag:${target}:333`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (era0(`cflag:${target}:333`) <= 3 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「舒服的话，随时可以射出来哦！……人家会用嘴巴接住魔王大人那宝贵的精华的～♪」`,
          ); // :2205
        } else {
          await era.printAndWait(
            `「魔王大人，舒服么……？　很柔软吧？人家的胸，就是为了服侍魔王大人的……」`,
          ); // :2207
        }
        // CFLAG:333  = 4（变量语义：CFLAG 族，333）
        era.set(`cflag:${target}:333`, 4);
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:333`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「只是夹着就好了……我知道啦」`); // :2212
        // CFLAG:333  = 3（变量语义：CFLAG 族，333）
        era.set(`cflag:${target}:333`, 3);
      } else if (era0(`cflag:${target}:333`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「这种难以置信的行为……可恶…………」`); // :2216
        // CFLAG:333  = 2（变量语义：CFLAG 族，333）
        era.set(`cflag:${target}:333`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 33) {
    if (era0(`cflag:${target}:334`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「哦！还有这种玩法啊……！」`); // :2231
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「用胯间啊……嘻嘻，真有意思～」`); // :2234
      } else {
        await era.printAndWait(`「吓……什么动作？」`); // :2237
      }
      // CFLAG:TARGET:334  = 1（变量语义：CFLAG 族，TARGET:334）
      era.set(`cflag:${target}:334`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`talent:${target}:0`) == 1 &&
        (era0(`cflag:${target}:334`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「放错地方啦！……嘻嘻，开玩笑的～好想早点被破处啊～！」`,
        ); // :2245
        // CFLAG:334  = 6（变量语义：CFLAG 族，334）
        era.set(`cflag:${target}:334`, 6);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:334`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「摩擦摩擦～……真舒服～♪」`); // :2249
        // CFLAG:334  = 5（变量语义：CFLAG 族，334）
        era.set(`cflag:${target}:334`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`talent:${target}:0`) == 1 &&
        (era0(`cflag:${target}:334`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「嘻嘻……想放进去么？　人家的第一次，想要献给魔王大人～」`,
        ); // :2253
        // CFLAG:334  = 4（变量语义：CFLAG 族，334）
        era.set(`cflag:${target}:334`, 4);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:334`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「嘻嘻……变的这么硬了……这么舒服哦？」`); // :2257
        // CFLAG:334  = 3（变量语义：CFLAG 族，334）
        era.set(`cflag:${target}:334`, 3);
      } else if (era0(`cflag:${target}:334`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「嗯……这样就好了吗……？」`); // :2261
        // CFLAG:334  = 2（变量语义：CFLAG 族，334）
        era.set(`cflag:${target}:334`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 34) {
    if (era0(`cflag:${target}:335`) == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「呼……终于成为女人了……」`); // :2278
          await era.printAndWait(`「小鸡鸡好精神呢～那，我坐下来啦～」`); // :2279
          await era.printAndWait(
            `${target_name}迫不及待地沉下了腰……眉头闪过一丝痛苦，但还是慢慢地坐到底了。`,
          ); // :2280
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「谢谢魔王大人……终于……终于肯接受我的处女了……」`,
          ); // :2283
          await era.printAndWait(
            `「能……能把自己奉献给魔王大人……是我一生的荣幸……！　那……人家……坐下来了……」`,
          ); // :2284
          await era.printAndWait(
            `${target_name}带着期待又感动的表情，将${player_name}的阴茎吞入了。`,
          ); // :2285
        } else {
          await era.printAndWait(`「呜呜……居然是以这种形式破的处…………」`); // :2288
          await era.printAndWait(
            `和言语相反地，${target_name}遵从着命令，将${player_name}的阴茎吞入了。`,
          ); // :2289
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「小鸡鸡好精神呢～那，我不客气啦～」`); // :2295
          await era.printAndWait(`${target_name}迫不及待地沉下了腰……`); // :2296
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「喜欢这种体位吗？　嘻嘻～」`); // :2299
          await era.printAndWait(
            `${target_name}慢慢地沉下了腰，将${player_name}的阴茎吞入了。`,
          ); // :2300
        } else {
          await era.printAndWait(`「让，让我这样子…………」`); // :2303
          await era.printAndWait(
            `和言语相反地，${target_name}遵从着命令，将${player_name}的阴茎吞入了。`,
          ); // :2304
        }
      }
      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335）
      era.set(`cflag:${target}:335`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:335`) <= 5 || era0('flag:7') == 2)
      ) {
        if (rand_n(4) == 0) {
          await era.printAndWait(`「只是躺着，这么轻松啊～嘻嘻」`); // :2314
        } else if (rand_n(3) == 0) {
          await era.printAndWait(`「看看～你的小鸡鸡慢慢地被我吞进去了哦？」`); // :2316
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「哼哼～欣赏我在你身上的舞蹈吧！」`); // :2318
        } else {
          await era.printAndWait(`「嘻嘻！等不及啦～」`); // :2320
        }
        await era.printAndWait(`${target_name}分开双腿，慢慢地坐了下来。`); // :2322
        // CFLAG:335  = 6（变量语义：CFLAG 族，335）
        era.set(`cflag:${target}:335`, 6);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:335`) <= 4 || era0('flag:7') == 2)
      ) {
        if (rand_n(4) == 0) {
          await era.print(
            `「魔王大人……请躺好吧～让人家来侍奉你吧！……啊！好大……好满……喔……天啊……啊～啊～」`,
          ); // :2327
        } else if (rand_n(3) == 0) {
          await era.printAndWait(
            `「嘻嘻～要用力地往上顶人家哦～！……人家的小穴，是为了魔王大人而存在的……」`,
          ); // :2329
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「我重吗？感觉插得好深啊～好像插到脑海深处一般……噢……那里……啊……我无论灵魂还是肉体……都彻底是魔王大人的东西了……」`,
          ); // :2331
        } else {
          await era.printAndWait(
            `「身体被抠挖着一样……呵呵～我会用尽余生来好好地侍奉魔王大人的……」`,
          ); // :2333
        }
        await era.printAndWait(
          `展示出优秀的侍奉技术，${target_name}在${player_name}的身上翩翩起舞。`,
        ); // :2335
        // CFLAG:335  = 5（变量语义：CFLAG 族，335）
        era.set(`cflag:${target}:335`, 5);
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (era0(`cflag:${target}:335`) <= 3 || era0('flag:7') == 2)
      ) {
        if (rand_n(4) == 0) {
          await era.printAndWait(`「呃～啊～！……腰、腰自己动起来了……」`); // :2340
        } else if (rand_n(3) == 0) {
          await era.printAndWait(`「有什么在脑子里冲撞着……受不了啦……」`); // :2342
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「唔！在里面……好深啊……」`); // :2344
        } else {
          await era.printAndWait(`「不要啦！～再这么往上顶的话……的话…………」`); // :2346
        }
        // CFLAG:335  = 4（变量语义：CFLAG 族，335）
        era.set(`cflag:${target}:335`, 4);
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:335`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.print(
          `${target_name}遵从着命令，跨坐在${player_name}的身上，把阴茎吞入体内了。`,
        ); // :2351
        await era.printAndWait(
          `「这，这样就可以了吗……要我保持这么下流的姿势……」`,
        ); // :2352
        // CFLAG:335  = 3（变量语义：CFLAG 族，335）
        era.set(`cflag:${target}:335`, 3);
      } else if (era0(`cflag:${target}:335`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「这种屈辱……咱们走着瞧！」`); // :2356
        // CFLAG:335  = 2（变量语义：CFLAG 族，335）
        era.set(`cflag:${target}:335`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 35) {
    if (era0(`cflag:${target}:336`) == 0) {
      if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「只是……擦身而已哦……！」`); // :2371
      } else {
        await era.printAndWait(`「洗……洗澡这东西……怎么帮？」`); // :2374
      }
      // CFLAG:TARGET:336  = 1（变量语义：CFLAG 族，TARGET:336）
      era.set(`cflag:${target}:336`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (era0(`cflag:${target}:336`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「哈哈～！终于有机会，反过来对你上下其手啦！～」`,
        ); // :2382
        // CFLAG:336  = 5（变量语义：CFLAG 族，336）
        era.set(`cflag:${target}:336`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (era0(`cflag:${target}:336`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「魔王大人的身体……好漂亮……光是看着魔王大人的身体……人家…人家……就要…………噢！不！不是这样的！我是魔王大人最乖巧的奴隶！让我帮魔王大人清洁干净吧！」`,
        ); // :2386
        // CFLAG:336  = 4（变量语义：CFLAG 族，336）
        era.set(`cflag:${target}:336`, 4);
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:336`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「我说啊……你平常洗澡也太不认真了吧……！」`); // :2390
        // CFLAG:336  = 3（变量语义：CFLAG 族，336）
        era.set(`cflag:${target}:336`, 3);
      } else if (era0(`cflag:${target}:336`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「你妈妈没教你自己洗澡吗？」`); // :2394
        // CFLAG:336  = 2（变量语义：CFLAG 族，336）
        era.set(`cflag:${target}:336`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 36) {
    if (era0(`cflag:${target}:337`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「嘻嘻，躺下吧……让我来！！」`); // :2409
        await era.printAndWait(
          `「看啊！你的东西，被菊穴慢慢地吞进去了哦～……♪」`,
        ); // :2410
        await era.printAndWait(`${target_name}迫不及待地沉下了腰……`); // :2411
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「嘻嘻，好好地躺着吧……会让魔王大人的小鸡鸡很舒服的！」`,
        ); // :2414
        await era.printAndWait(
          `「啊……屁屁被疼爱的样子……魔王大人一定能看得很清楚的吧……」`,
        ); // :2415
        await era.printAndWait(
          `${target_name}慢慢地沉下了腰，将${player_name}的阴茎吞入了。`,
        ); // :2416
      } else {
        await era.printAndWait(`「要我自己来吗……还要用这个洞……讨厌……」`); // :2419
      }
      // CFLAG:TARGET:337  = 1（变量语义：CFLAG 族，TARGET:337）
      era.set(`cflag:${target}:337`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:337`) <= 6 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「看哦！整根插进去啦哦……！」`); // :2428
          await era.printAndWait(`「唔～哦～！在里面……闹腾着～♪」`); // :2429
        } else {
          await era.printAndWait(`「便便的地方被欺负了……受不了啦～～」`); // :2431
          await era.printAndWait(`「要我再摇动屁股么？　噢～～……♪」`); // :2432
        }
        await era.printAndWait(
          `尻穴持续地侍奉着阴茎，${target_name}跨坐在${player_name}的身上，腰身扭动出淫秽的舞蹈。`,
        ); // :2434
        // CFLAG:337  = 7（变量语义：CFLAG 族，337）
        era.set(`cflag:${target}:337`, 7);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:337`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「呃～……里面……菊穴里面好热～」`); // :2438
        await era.printAndWait(
          `尻穴持续地侍奉着阴茎，${target_name}有节奏地起伏着身体。`,
        ); // :2439
        // CFLAG:337  = 6（变量语义：CFLAG 族，337）
        era.set(`cflag:${target}:337`, 6);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:337`) <= 4 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「魔王大人……人家的菊穴，舒服吗……？」`); // :2444
          await era.printAndWait(`「您的东西又硬又烫，弄得人家好舒服哦～♪」`); // :2445
        } else {
          await era.printAndWait(`「嘻嘻～魔王大人……我的屁股，还满意么？」`); // :2447
          await era.printAndWait(`「好舒服～……啊～！再顶我～……♪」`); // :2448
        }
        await era.printAndWait(
          `尻穴持续地侍奉着阴茎，${target_name}跨坐在${player_name}的身上，用力夹紧，不停抽动着。`,
        ); // :2450
        // CFLAG:337  = 5（变量语义：CFLAG 族，337）
        era.set(`cflag:${target}:337`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:337`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「再用力地夹紧会更好些吗……啊～要融化了～」`); // :2454
        await era.printAndWait(
          `尻穴持续地侍奉着阴茎，${target_name}有节奏地起伏着身体。`,
        ); // :2455
        // CFLAG:337  = 4（变量语义：CFLAG 族，337）
        era.set(`cflag:${target}:337`, 4);
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:337`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「这么热……这么硬～……♪」`); // :2459
        await era.printAndWait(
          `尻穴持续地侍奉着阴茎，${target_name}扭动着腰肢，追求着快感。`,
        ); // :2460
        // CFLAG:337  = 3（变量语义：CFLAG 族，337）
        era.set(`cflag:${target}:337`, 3);
      } else if (era0(`cflag:${target}:337`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「要我自己动……？　哼，给我记着！」`); // :2464
        // CFLAG:337  = 2（变量语义：CFLAG 族，337）
        era.set(`cflag:${target}:337`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 37) {
    if (era0(`cflag:${target}:338`) == 0) {
      if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「要……要舔屁股吗……我知道啦……」`); // :2479
      } else {
        await era.printAndWait(`「不要开玩笑了！这种……这种屈辱……！」`); // :2482
      }
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338）
      era.set(`cflag:${target}:338`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (era0(`cflag:${target}:338`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「嘻嘻，舒服么？　舌头，要往里伸进去了哦……！」`,
        ); // :2490
        // CFLAG:338  = 5（变量语义：CFLAG 族，338）
        era.set(`cflag:${target}:338`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (era0(`cflag:${target}:338`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.print(`「会帮魔王大人漂亮地舔干净的……呵呵～……唔……唔……」`); // :2494
        // CFLAG:338  = 4（变量语义：CFLAG 族，338）
        era.set(`cflag:${target}:338`, 4);
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:338`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「好吧……我舔……不过……还是挺……」`); // :2498
        // CFLAG:338  = 3（变量语义：CFLAG 族，338）
        era.set(`cflag:${target}:338`, 3);
      } else if (era0(`cflag:${target}:338`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「可恶……这种事……不做也没关系吧……」`); // :2502
        // CFLAG:338  = 2（变量语义：CFLAG 族，338）
        era.set(`cflag:${target}:338`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 40) {
    if (era0(`cflag:${target}:341`) == 0) {
      await era.printAndWait(`「住，住手！　不要打我！　好痛啊～」`); // :2515
      // CFLAG:TARGET:341  = 1（变量语义：CFLAG 族，TARGET:341）
      era.set(`cflag:${target}:341`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:341`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊～！啊～！我是你的M奴隶！！　再，再更用力地打我吧！主人啊～♪」`,
        ); // :2522
        await era.printAndWait(
          `${target_name}流着口水，屁股不安分地扭来扭去。`,
        ); // :2523
        // CFLAG:TARGET:341  = 5（变量语义：CFLAG 族，TARGET:341）
        era.set(`cflag:${target}:341`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:341`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「惩罚我！欺负我！　狠狠地责备，这么下流的我吧！……魔王大人啊～♪」`,
        ); // :2527
        await era.printAndWait(
          `${target_name}满脸红晕，屁股不安分地扭来扭去。`,
        ); // :2528
        // CFLAG:TARGET:341  = 4（变量语义：CFLAG 族，TARGET:341）
        era.set(`cflag:${target}:341`, 4);
        return 0;
      } else if (
        era0(`mark:${target}:0`) == 3 &&
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:341`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「这……这种程度的话……也不是不能接受……」`); // :2533
        // CFLAG:TARGET:341  = 3（变量语义：CFLAG 族，TARGET:341）
        era.set(`cflag:${target}:341`, 3);
        return 0;
      } else if (era0(`cflag:${target}:341`) <= 1 && era0('flag:7') == 2) {
        await era.printAndWait(`「再怎么打我都不会屈服的！！　你这白痴！」`); // :2538
        // CFLAG:TARGET:341  = 2（变量语义：CFLAG 族，TARGET:341）
        era.set(`cflag:${target}:341`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 41) {
    if (era0(`cflag:${target}:342`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「哦呵～要用这条鞭子来打我吗？～♪　来嘛～！」`); // :2553
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「人家做错了什么吗……？　如果有……人家道歉还不行吗…………」`,
        ); // :2556
      } else {
        await era.printAndWait(`「混蛋，别以为我会屈服于暴力！……」`); // :2559
      }
      // CFLAG:TARGET:342  = 1（变量语义：CFLAG 族，TARGET:342）
      era.set(`cflag:${target}:342`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (era0(`cflag:${target}:342`) <= 8 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「好痛！好爽！～打我！打死我～！！」`); // :2567
        // CFLAG:TARGET:342  = 9（变量语义：CFLAG 族，TARGET:342）
        era.set(`cflag:${target}:342`, 9);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:342`) <= 7 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「再打我！～啊～好痛！！鞭我的背！鞭我的屁股！」`,
        ); // :2571
        // CFLAG:TARGET:342  = 8（变量语义：CFLAG 族，TARGET:342）
        era.set(`cflag:${target}:342`, 8);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:342`) <= 6 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「啊～这真的，非常……痛啊……」`); // :2575
        // CFLAG:TARGET:342  = 7（变量语义：CFLAG 族，TARGET:342）
        era.set(`cflag:${target}:342`, 7);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (era0(`cflag:${target}:342`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊！啊！！好痛！…………但，这就是魔王大人的爱！啊！～……再打我！在我身上留下鞭痕！让我无时无刻都感受到魔王大人！」`,
        ); // :2579
        // CFLAG:TARGET:342  = 6（变量语义：CFLAG 族，TARGET:342）
        era.set(`cflag:${target}:342`, 6);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:342`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「唔……哦！！！……我……真是不可救药的M奴隶啊……明明这么痛……却渐渐有感觉了…………」`,
        ); // :2583
        // CFLAG:TARGET:342  = 5（变量语义：CFLAG 族，TARGET:342）
        era.set(`cflag:${target}:342`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:342`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「啊！！……为了魔王大人，我……会忍耐……」`); // :2587
        // CFLAG:TARGET:342  = 4（变量语义：CFLAG 族，TARGET:342）
        era.set(`cflag:${target}:342`, 4);
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:342`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「啊！！啊！！……被这么虐待……我……我居然…………」`); // :2591
        // CFLAG:TARGET:342  = 3（变量语义：CFLAG 族，TARGET:342）
        era.set(`cflag:${target}:342`, 3);
      } else if (era0(`cflag:${target}:335`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(
          `「你这家伙！打算用那鞭子打我吗……？　唔！啊！！！！……一点…………都不……痛…………」`,
        ); // :2595
        // CFLAG:TARGET:342  = 2（变量语义：CFLAG 族，TARGET:342）
        era.set(`cflag:${target}:342`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 42) {
    if (era0(`cflag:${target}:343`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「嘻嘻～原来你喜欢刺猬啊～…………」`); // :2610
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「呜呜……这都是为了魔王大人……这都是为了魔王大人………………」`,
        ); // :2613
      } else {
        await era.printAndWait(`「我！跟你没完！！！」`); // :2616
      }
      // CFLAG:TARGET:343  = 1（变量语义：CFLAG 族，TARGET:343）
      era.set(`cflag:${target}:343`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (era0(`cflag:${target}:343`) <= 8 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊～这令人上瘾的刺痛……再扎我！！扎深一点！！」`,
        ); // :2624
        // CFLAG:TARGET:343  = 9（变量语义：CFLAG 族，TARGET:343）
        era.set(`cflag:${target}:343`, 9);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:343`) <= 7 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「痛……！！身上的针越来越多……好像肉体都被改造了似得……」`,
        ); // :2628
        // CFLAG:TARGET:343  = 8（变量语义：CFLAG 族，TARGET:343）
        era.set(`cflag:${target}:343`, 8);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:343`) <= 6 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「来吧！带我走向新世界～……」`); // :2632
        // CFLAG:TARGET:343  = 7（变量语义：CFLAG 族，TARGET:343）
        era.set(`cflag:${target}:343`, 7);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (era0(`cflag:${target}:343`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「好痛！！好爽！！再用力刺我！让我只能想着魔王大人！！……我是魔王大人最忠实的性奴！～彻底地将我玩坏吧！」`,
        ); // :2636
        // CFLAG:TARGET:343  = 6（变量语义：CFLAG 族，TARGET:343）
        era.set(`cflag:${target}:343`, 6);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:343`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「这痛楚！！就像魔王大人扎到了我的心里一样……魔王大人哦～人家平常能用这针痕，想着你自慰么？」`,
        ); // :2640
        // CFLAG:TARGET:343  = 5（变量语义：CFLAG 族，TARGET:343）
        era.set(`cflag:${target}:343`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:343`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「好痛！这是……魔王大人的恩赐……这是魔王大人的恩赐…………」`,
        ); // :2644
        // CFLAG:TARGET:343  = 4（变量语义：CFLAG 族，TARGET:343）
        era.set(`cflag:${target}:343`, 4);
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:343`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「明明这么痛……心里却在欢迎……天啊……我……没救了啊…………」`,
        ); // :2648
        // CFLAG:TARGET:343  = 3（变量语义：CFLAG 族，TARGET:343）
        era.set(`cflag:${target}:343`, 3);
      } else if (era0(`cflag:${target}:343`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「你！！你会遭报应的！！」`); // :2652
        // CFLAG:TARGET:343  = 2（变量语义：CFLAG 族，TARGET:343）
        era.set(`cflag:${target}:343`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`)) {
    if (era0(`cflag:${target}:344`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「原来如此，封闭视觉来提高其它感官的感觉吗？……有意思～」`,
        ); // :2668
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「偶尔试试这种玩法也不错呢～」`); // :2671
      } else {
        await era.printAndWait(`「看不见什么的……我……一点都不怕！」`); // :2674
      }
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344）
      era.set(`cflag:${target}:344`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (era0(`cflag:${target}:344`) <= 8 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「喔～噢～！……全身……都变成敏感带了…………♪」`); // :2682
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344）
        era.set(`cflag:${target}:344`, 9);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:344`) <= 7 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「皮肤……好敏感……好像能感受到空气的流动…………」`); // :2686
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344）
        era.set(`cflag:${target}:344`, 8);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:344`) <= 6 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「呵呵～想干什么坏事～」`); // :2690
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344）
        era.set(`cflag:${target}:344`, 7);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (era0(`cflag:${target}:344`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「魔王大人，就在附近啦！……别的不说，魔王大人的气味我可是很熟悉的呢～♪　快来～快来欺负人家嘛～……」`,
        ); // :2694
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344）
        era.set(`cflag:${target}:344`, 6);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:344`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「魔……魔王大人？在哪里？　人家……已经准备好被你玩弄了…………」`,
        ); // :2698
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344）
        era.set(`cflag:${target}:344`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:344`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「呜呜……魔王大人……不见了……魔王大人哦？！」`); // :2702
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344）
        era.set(`cflag:${target}:344`, 4);
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:344`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「皮肤好紧张……啊……有感觉了……」`); // :2706
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344）
        era.set(`cflag:${target}:344`, 3);
      } else if (era0(`cflag:${target}:344`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「玩这种小把戏……就不敢堂堂正正的么！」`); // :2710
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344）
        era.set(`cflag:${target}:344`, 2);
      }
      return 0;
    }
  } else if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (era0(`cflag:${target}:380`) < 3 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「嘻嘻～意犹未尽～……♪」`); // :2719
      // CFLAG:380  = 3（变量语义：CFLAG 族，380）
      era.set(`cflag:${target}:380`, 3);
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (era0(`cflag:${target}:380`) < 2 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「嘻嘻～发现魔王大人了～！」`); // :2723
      // CFLAG:380  = 2（变量语义：CFLAG 族，380）
      era.set(`cflag:${target}:380`, 2);
    } else if (era0(`cflag:${target}:380`) < 1 || era0('flag:7') == 2) {
      await era.printAndWait(`「这……这种程度……没什么大不了的……！」`); // :2727
      // CFLAG:380  = 1（变量语义：CFLAG 族，380）
      era.set(`cflag:${target}:380`, 1);
    }
    return 0;
  }

  if (era_flag.selectcom == 44 && era0(`tequip:${target}:44`)) {
    if (era0(`cflag:${target}:345`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「要把我绑起来么～？～♪　嘻嘻～好期待啊！」`); // :2742
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「要把我绑起来么～？～♪　呵呵～魔王大人这癖好啊～！」`,
        ); // :2745
      } else {
        await era.printAndWait(
          `「这……这种绳子……没被封住力量的话我只需要一下子…………」`,
        ); // :2748
      }
      // CFLAG:TARGET:345  = 1（变量语义：CFLAG 族，TARGET:345）
      era.set(`cflag:${target}:345`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (era0(`cflag:${target}:345`) <= 8 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「我……我是一只受虐待就会发情的母猪……！　请……请随意地蹂躏我吧！！……」`,
        ); // :2756
        // CFLAG:TARGET:345  = 9（变量语义：CFLAG 族，TARGET:345）
        era.set(`cflag:${target}:345`, 9);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:345`) <= 7 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「好兴奋啊……啊……被这么绑着……子宫都开始发烫了……」`,
        ); // :2760
        // CFLAG:TARGET:345  = 8（变量语义：CFLAG 族，TARGET:345）
        era.set(`cflag:${target}:345`, 8);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:345`) <= 6 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「偶尔这么玩也不错呢～」`); // :2764
        // CFLAG:TARGET:345  = 7（变量语义：CFLAG 族，TARGET:345）
        era.set(`cflag:${target}:345`, 7);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (era0(`cflag:${target}:345`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「宠物……我是魔王大人的宠物……请主人再继续调教我这受虐狂家畜吧！！！……」`,
        ); // :2768
        // CFLAG:TARGET:345  = 6（变量语义：CFLAG 族，TARGET:345）
        era.set(`cflag:${target}:345`, 6);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:345`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「啊～好棒……绳子……深深地勒进肉里了…………」`); // :2772
        // CFLAG:TARGET:345  = 5（变量语义：CFLAG 族，TARGET:345）
        era.set(`cflag:${target}:345`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:345`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「嘻嘻～不绑着我也不会离开魔王大人的啦～～」`); // :2776
        // CFLAG:TARGET:345  = 4（变量语义：CFLAG 族，TARGET:345）
        era.set(`cflag:${target}:345`, 4);
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:345`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「唔……呃……啊～…………这……这种……屈辱………………居……然……有……感觉了…………」`,
        ); // :2780
        // CFLAG:TARGET:345  = 3（变量语义：CFLAG 族，TARGET:345）
        era.set(`cflag:${target}:345`, 3);
      } else if (era0(`cflag:${target}:345`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「我不是挣不脱！只是力量被封住了而已！！」`); // :2784
        // CFLAG:TARGET:345  = 2（变量语义：CFLAG 族，TARGET:345）
        era.set(`cflag:${target}:345`, 2);
      }
      return 0;
    }
  } else if (era_flag.selectcom == 44 && era0(`tequip:${target}:44`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (era0(`cflag:${target}:385`) < 2 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「完了么？　一直绑着我也可以哦！」`); // :2793
      // CFLAG:385  = 2（变量语义：CFLAG 族，385）
      era.set(`cflag:${target}:385`, 2);
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (era0(`cflag:${target}:385`) < 2 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「啊……魔王大人的绳艺……让人家腿都软了…………」`); // :2797
      // CFLAG:385  = 2（变量语义：CFLAG 族，385）
      era.set(`cflag:${target}:385`, 2);
    } else if (era0(`cflag:${target}:385`) < 1 || era0('flag:7') == 2) {
      await era.printAndWait(`「哼！终于放弃了吗……我才不会输给这种绳子！」`); // :2801
      // CFLAG:385  = 1（变量语义：CFLAG 族，385）
      era.set(`cflag:${target}:385`, 1);
    }
    return 0;
  }

  if (era_flag.selectcom == 45 && era0(`tequip:${target}:45`)) {
    if (era0(`cflag:${target}:346`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「口水会流得到处都是啦～！……唔……唔……唔唔…………」`,
        ); // :2816
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「呜呜……戴上这个之后……魔王大人还会亲吻人家吗？……」`,
        ); // :2819
      } else {
        await era.printAndWait(`「这？！……懦夫！怕被我骂是吧！」`); // :2822
      }
      // CFLAG:TARGET:346  = 1（变量语义：CFLAG 族，TARGET:346）
      era.set(`cflag:${target}:346`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (era0(`cflag:${target}:346`) <= 8 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「嘻嘻～魔王大人～真鬼畜呢～～～来！啊～～～」`,
        ); // :2830
        // CFLAG:TARGET:346  = 9（变量语义：CFLAG 族，TARGET:346）
        era.set(`cflag:${target}:346`, 9);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:346`) <= 7 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「明明还没戴上……口水却快要留出来了…………」`); // :2834
        // CFLAG:TARGET:346  = 8（变量语义：CFLAG 族，TARGET:346）
        era.set(`cflag:${target}:346`, 8);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:346`) <= 6 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊！！啊！！！啊！！！！………………没什么～待会没机会叫了～先叫上几声～哈哈～」`,
        ); // :2838
        // CFLAG:TARGET:346  = 7（变量语义：CFLAG 族，TARGET:346）
        era.set(`cflag:${target}:346`, 7);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (era0(`cflag:${target}:346`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「魔王大人，是我一生的主人！！我真的好爱你～好爱你啊！…………咦？……没，只是一想到待会没机会说话，就忍不住要告白一下…………」`,
        ); // :2842
        await era.printAndWait(
          `「魔王大人哦，人家已经是你的了，待会请狠狠地蹂躏我，占有我，让我也彻底地感受魔王大人的爱意，好吗？」`,
        ); // :2843
        // CFLAG:TARGET:346  = 6（变量语义：CFLAG 族，TARGET:346）
        era.set(`cflag:${target}:346`, 6);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:346`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「被这么弄居然觉得很幸福……魔王大人啊……你要对人家负责～我以前不是这样子的…………」`,
        ); // :2847
        // CFLAG:TARGET:346  = 5（变量语义：CFLAG 族，TARGET:346）
        era.set(`cflag:${target}:346`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:346`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「要弄住嘴……呜呜…………魔王大人啊……解开之后……亲亲人家可以么？」`,
        ); // :2851
        // CFLAG:TARGET:346  = 4（变量语义：CFLAG 族，TARGET:346）
        era.set(`cflag:${target}:346`, 4);
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:346`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「唉……我都搞不懂我自己了……究竟是败给了你……还是败给了这些玩具……还是败给了自己的身体…………」`,
        ); // :2855
        // CFLAG:TARGET:346  = 3（变量语义：CFLAG 族，TARGET:346）
        era.set(`cflag:${target}:346`, 3);
      } else if (era0(`cflag:${target}:346`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(
          `「我才不会张嘴让你塞！…………唔！！……咳？！！…………咯……………唔！唔唔！！………」`,
        ); // :2859
        // CFLAG:TARGET:346  = 2（变量语义：CFLAG 族，TARGET:346）
        era.set(`cflag:${target}:346`, 2);
      }
      return 0;
    }
  } else if (era_flag.selectcom == 45 && era0(`tequip:${target}:45`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (era0(`cflag:${target}:386`) < 3 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「差点被自己的口水呛到～哈哈～……」`); // :2868
      // CFLAG:386  = 3（变量语义：CFLAG 族，386）
      era.set(`cflag:${target}:386`, 3);
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (era0(`cflag:${target}:386`) < 2 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「口水像爱液一样地滴下来……好淫秽啊～嘻嘻～」`); // :2872
      // CFLAG:386  = 2（变量语义：CFLAG 族，386）
      era.set(`cflag:${target}:386`, 2);
    } else if (era0(`cflag:${target}:386`) < 1 || era0('flag:7') == 2) {
      await era.printAndWait(`「咳……咳……咳…………骂……骂……都懒得……骂你了…………」`); // :2876
      // CFLAG:386  = 1（变量语义：CFLAG 族，386）
      era.set(`cflag:${target}:386`, 1);
    }
    return 0;
  }

  if (era_flag.selectcom == 46 && era0(`tequip:${target}:46`)) {
    if (era0(`cflag:${target}:347`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「呃……这个……连我都不太敢玩…………」`); // :2891
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「呜呜～魔王大人！重口味！大变态！」`); // :2894
      } else {
        await era.printAndWait(
          `「呜呜呜！！！哇哇哇哇！！！救命啊！！！谁都好！！来人救救我吧！！！！！」`,
        ); // :2897
      }
      // CFLAG:TARGET:347  = 1（变量语义：CFLAG 族，TARGET:347）
      era.set(`cflag:${target}:347`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:347`) <= 6 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊……这迷人的触感……凉凉的……灌进来了…………待会一定很精彩吧～」`,
        ); // :2905
        // CFLAG:347  = 7（变量语义：CFLAG 族，347）
        era.set(`cflag:${target}:347`, 7);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:347`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「唔～唔～感觉到肚子在叫了…………」`); // :2909
        // CFLAG:347  = 6（变量语义：CFLAG 族，347）
        era.set(`cflag:${target}:347`, 6);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:347`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「噢～噢～……灌进来的……是魔王大人满满的爱……我……会用……心感受…………用……心……感……受……的～」`,
        ); // :2913
        // CFLAG:347  = 5（变量语义：CFLAG 族，347）
        era.set(`cflag:${target}:347`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:347`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「灌……灌好了么……？魔王大人真鬼畜啊～」`); // :2917
        // CFLAG:347  = 4（变量语义：CFLAG 族，347）
        era.set(`cflag:${target}:347`, 4);
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:347`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「啊～啊～啊～！我要疯了～！我要疯啦！！～」`); // :2921
        // CFLAG:347  = 3（变量语义：CFLAG 族，347）
        era.set(`cflag:${target}:347`, 3);
      } else if (era0(`cflag:${target}:347`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「唔唔～啊！！好难受～好痛苦…………」`); // :2925
        // CFLAG:347  = 2（变量语义：CFLAG 族，347）
        era.set(`cflag:${target}:347`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 55) {
    if (era0(`cflag:${target}:356`) == 0) {
      if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「被魔王大人这么看着……好害羞…………」`); // :2940
      } else {
        await era.printAndWait(`「干……干嘛……你累啦？…………」`); // :2943
      }
      // CFLAG:356  = 1（变量语义：CFLAG 族，356）
      era.set(`cflag:${target}:356`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`palam:${target}:5`) >= era0('palamlv:3') &&
        (era0(`cflag:${target}:356`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「魔王大人哦，求求你～过来疼爱一下人家啊！…………」`,
        ); // :2951
        // CFLAG:356  = 4（变量语义：CFLAG 族，356）
        era.set(`cflag:${target}:356`, 4);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:356`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「魔……魔王大人？……人家没做错什么惹你不高兴吧？…………」`,
        ); // :2955
        // CFLAG:356  = 3（变量语义：CFLAG 族，356）
        era.set(`cflag:${target}:356`, 3);
      } else if (era0(`cflag:${target}:356`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「这……这是一个看谁先说话的比赛？」`); // :2959
        // CFLAG:356  = 2（变量语义：CFLAG 族，356）
        era.set(`cflag:${target}:356`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 56) {
    if (era0(`cflag:${target}:357`) == 0) {
      if (era0(`tequip:${target}:53`)) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「呃……我叫${target_name}……曾经是个勇者。不过现在已经放弃了自己的使命，彻底地对阴茎上瘾了。」`,
          ); // :2977
          await era.printAndWait(
            `${target_name}一边这么说着，一边对水晶球淫靡地扭腰摆臀。`,
          ); // :2978
          await era.printAndWait(
            `「虽然是第一次拍这种东西，不过我会努力的！呵呵～」`,
          ); // :2979
          await era.printAndWait(
            `「好了！那，接下来，还要说什么？……哎～不废话了！赶紧来做爱做的事吧！……嘻嘻～」`,
          ); // :2980
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「呃……我叫${target_name}……曾经……是个…………勇者………………」`,
          ); // :2983
          await era.printAndWait(
            `${target_name}一边这么说着，一边时不时害羞地偷看水晶球。`,
          ); // :2984
          await era.printAndWait(
            `「不过，在讨伐魔王大人的途中被抓住了……被魔王大人…………教会了……作为……女人的快乐…………」`,
          ); // :2985
          await era.printAndWait(
            `「现在……啊…………好羞人………………能不能别拍了啊？………………」`,
          ); // :2986
        } else {
          await era.printAndWait(`「别！别拍我！！」`); // :2989
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「嘻嘻～……闲聊的时候，突然抓人家来爱爱……爱爱的时候，又突然抓人家来闲聊……真是顽皮的魔王大人呢～」`,
          ); // :2994
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「是……是的……能被魔王大人宠幸……我觉得非常的幸福～」`,
          ); // :2997
        } else {
          await era.printAndWait(`「……你想我说什么？…………」`); // :3000
        }
      }
      // CFLAG:357  = 1（变量语义：CFLAG 族，357）
      era.set(`cflag:${target}:357`, 1);
      return 0;
    } else {
      if (era0(`tequip:${target}:53`)) {
        if (
          era0(`talent:${target}:85`) == 1 &&
          (era0(`cflag:${target}:357`) <= 3 || era0('flag:7') == 2)
        ) {
          await era.printAndWait(
            `「呃……我叫${target_name}……曾经是个勇者。不过现在已经放弃了自己的使命，彻底地对阴茎上瘾了。」`,
          ); // :3011
          await era.printAndWait(
            `${target_name}一边这么说着，一边对水晶球淫靡地扭腰摆臀。`,
          ); // :3012
          await era.printAndWait(
            `「希望看到这个的你，也能跟我一样享受性爱的快乐……哦～…啊！………轻……轻…地去了…………」`,
          ); // :3013
          await era.printAndWait(
            `「那，接下来，让我们一起做很多舒服的事，尽情地射精吧！……嘻嘻～」`,
          ); // :3014
          // CFLAG:357  = 4（变量语义：CFLAG 族，357）
          era.set(`cflag:${target}:357`, 4);
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          (era0(`cflag:${target}:357`) <= 2 || era0('flag:7') == 2)
        ) {
          await era.printAndWait(
            `「呃……我叫${target_name}……没能拯救这个世界，对不起呢～」`,
          ); // :3018
          await era.printAndWait(
            `${target_name}一边这么说着，一边对水晶球甜甜地微笑着。`,
          ); // :3019
          await era.printAndWait(
            `「然而，我是幸福的……因为知道了这种种让人愉悦的事……」`,
          ); // :3020
          await era.printAndWait(
            `「在不知不觉中，身心都被魔王大人夺走了……现在也是，遵循着魔王大人的命令来拍这个…请大家好好地看着我吧！嘻嘻～」`,
          ); // :3021
          // CFLAG:357  = 3（变量语义：CFLAG 族，357）
          era.set(`cflag:${target}:357`, 3);
        } else if (era0(`cflag:${target}:357`) <= 1 || era0('flag:7') == 2) {
          await era.printAndWait(`「我……我……叫${target_name}……呜呜…………」`); // :3025
          // CFLAG:357  = 2（变量语义：CFLAG 族，357）
          era.set(`cflag:${target}:357`, 2);
        }
      } else {
        if (
          era0(`talent:${target}:85`) == 1 &&
          (era0(`cflag:${target}:357`) <= 3 || era0('flag:7') == 2)
        ) {
          await era.printAndWait(
            `「关于那一次……呃……呃！……是啊！……嘻嘻～……所以下次这么弄的时候，就可以再用力些嘛～呵呵～～」`,
          ); // :3031
          // CFLAG:357  = 4（变量语义：CFLAG 族，357）
          era.set(`cflag:${target}:357`, 4);
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          (era0(`cflag:${target}:357`) <= 2 || era0('flag:7') == 2)
        ) {
          await era.printAndWait(
            `「魔……魔王……大人…………你……喜……喜……喜……喜欢我……么？」`,
          ); // :3035
          await era.printAndWait(
            `${target_name}脸红耳赤，低眉螓首地用几不可闻的声音轻轻说到。`,
          ); // :3036
          // CFLAG:357  = 3（变量语义：CFLAG 族，357）
          era.set(`cflag:${target}:357`, 3);
        } else if (era0(`cflag:${target}:357`) <= 1 || era0('flag:7') == 2) {
          await era.printAndWait(`「既然落入你手，我还能怎样呢…………」`); // :3040
          // CFLAG:357  = 2（变量语义：CFLAG 族，357）
          era.set(`cflag:${target}:357`, 2);
        }
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 80) {
    if (era0(`cflag:${target}:381`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「咳……咳……咳…………啊～魔王大人……好孔武有力啊……唔！～……咳……咳……咳…………」`,
        ); // :3056
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「咳……咳……咳…………慢！慢些！吸不过来啦！……唔！～……咳……咳……咳…………」`,
        ); // :3059
      } else {
        await era.printAndWait(
          `「咳……咳……咳…………要……要窒息了……！……唔！～……咳……咳……咳…………」`,
        ); // :3062
      }
      // CFLAG:TARGET:381  = 1（变量语义：CFLAG 族，TARGET:381）
      era.set(`cflag:${target}:381`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:381`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「咳……唔……唔…………呼～还可以再深些哦…………唔！～……咳……呃……呃…………」`,
        ); // :3070
        // CFLAG:381  = 5（变量语义：CFLAG 族，381）
        era.set(`cflag:${target}:381`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (era0(`cflag:${target}:381`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「咳……唔……唔…………人家的…噢！………还可以……往喉咙……里…面…去…………唔！～……咳……呃……呃…………」`,
        ); // :3074
        // CFLAG:381  = 4（变量语义：CFLAG 族，381）
        era.set(`cflag:${target}:381`, 4);
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:381`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「咳……咳……咳…………唔～唔～哦！……差点被口水呛到…………唔！～……咳……咳……咳…………」`,
        ); // :3078
        // CFLAG:381  = 3（变量语义：CFLAG 族，381）
        era.set(`cflag:${target}:381`, 3);
      } else if (era0(`cflag:${target}:381`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(
          `「咳……咳……咳…………慢！慢些！……要窒息了……！……唔！～……咳……咳……咳…………」`,
        ); // :3082
        // CFLAG:381  = 2（变量语义：CFLAG 族，381）
        era.set(`cflag:${target}:381`, 2);
      }
      return 0;
    }
  }
}

// 注册进分发族（TRYCALLFORM KOJO_MESSAGE_COM_4 的等价物；重复注册抛错）
kojo_message_com_family.register(4, kojo_message_com_4);

/**
 * @DOG_KOJO_4（:3094-3907）：兽奸 PLAY 的专用口上（头部守卫 TEQUIP:89 岔入）。
 * 与主 COM_4 同构：SELECTCOM 0/1/5/6/9/21/27/30/31/34/37/43/56 各支 +
 * 牝犬（TALENT:136）分档。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0
 */
async function dog_kojo_4(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%

  if (era_flag.selectcom == 0) {
    if (era0(`cflag:${target}:301`) == 0) {
      if (era0(`mark:${target}:2`) >= 2) {
        await era.printAndWait(`「只……只是舔一下的话………」`); // :3104
      } else {
        await era.printAndWait(`「讨，讨厌！别舔啊！」`); // :3107
      }
      // CFLAG:301  = 1（变量语义：CFLAG 族，301）
      era.set(`cflag:${target}:301`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (era0(`cflag:${target}:301`) <= 6 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊…唔～哦！…好孩子…真乖！～继续舔我吧～…♪」`,
        ); // :3115
        // CFLAG:301  = 7（变量语义：CFLAG 族，301）
        era.set(`cflag:${target}:301`, 7);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:301`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「啊哈～♪　和狗弄，也不错～…♪」`); // :3119
        // CFLAG:301  = 6（变量语义：CFLAG 族，301）
        era.set(`cflag:${target}:301`, 6);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:301`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「魔王大人哦……狗是不能满足人家的啦～…」`); // :3123
        // CFLAG:301  = 5（变量语义：CFLAG 族，301）
        era.set(`cflag:${target}:301`, 5);
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:301`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「呼～…呼～…哦～」`); // :3127
        // CFLAG:301  = 4（变量语义：CFLAG 族，301）
        era.set(`cflag:${target}:301`, 4);
      } else if (
        era0(`mark:${target}:2`) == 2 &&
        (era0(`cflag:${target}:301`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「满意了没？」`); // :3131
        // CFLAG:301  = 3（变量语义：CFLAG 族，301）
        era.set(`cflag:${target}:301`, 3);
      } else if (
        era0(`mark:${target}:2`) <= 1 &&
        (era0(`cflag:${target}:301`) <= 1 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「咦……？！好臭……不要过来！…」`); // :3135
        // CFLAG:301  = 2（变量语义：CFLAG 族，301）
        era.set(`cflag:${target}:301`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 1) {
    if (era0(`cflag:${target}:302`) == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        await era.printAndWait(`「不！不要啊！！」`); // :3150
      } else {
        await era.printAndWait(`「快！快停手！！」`); // :3153
      }
      // CFLAG:302  = 1（变量语义：CFLAG 族，302）
      era.set(`cflag:${target}:302`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (era0(`cflag:${target}:302`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「嘻嘻…好孩子～乖孩子～。继续舔哦～…啊～哦～～♪」`,
        ); // :3161
        // CFLAG:302  = 6（变量语义：CFLAG 族，302）
        era.set(`cflag:${target}:302`, 6);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:302`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「噢～被狗舔舐着…有感觉了！～」`); // :3165
        // CFLAG:302  = 5（变量语义：CFLAG 族，302）
        era.set(`cflag:${target}:302`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:302`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「魔王大人啊～总是觉得……怪怪的……没你弄的舒服！…」`,
        ); // :3169
        // CFLAG:302  = 4（变量语义：CFLAG 族，302）
        era.set(`cflag:${target}:302`, 4);
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:302`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「呃…呃……………」`); // :3173
        // CFLAG:302  = 3（变量语义：CFLAG 族，302）
        era.set(`cflag:${target}:302`, 3);
      } else if (era0(`cflag:${target}:302`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「呜啊！！　不、不要弄！！」`); // :3177
        // CFLAG:302  = 2（变量语义：CFLAG 族，302）
        era.set(`cflag:${target}:302`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 5) {
    if (era0(`cflag:${target}:306`) == 0) {
      if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「啊～！…我的胸……我的胸………」`); // :3193
      } else {
        await era.printAndWait(`「饶，饶了我！　狗什么的！？」`); // :3196
      }
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306）
      era.set(`cflag:${target}:306`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (era0(`cflag:${target}:306`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.print(`「我的胸，好吃么？　嘻嘻…♪」`); // :3204
        await era.printAndWait(
          `${target_name}慈爱地抱着在她胸部不断舔舐着的狗。`,
        ); // :3205
        // CFLAG:306  = 6（变量语义：CFLAG 族，306）
        era.set(`cflag:${target}:306`, 6);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:306`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「好舒服～…继续！继续舔我～…♪」`); // :3209
        // CFLAG:306  = 5（变量语义：CFLAG 族，306）
        era.set(`cflag:${target}:306`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:306`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「魔王大人啊～…这感觉…好奇怪啊！」`); // :3213
        // CFLAG:306  = 4（变量语义：CFLAG 族，306）
        era.set(`cflag:${target}:306`, 4);
      } else if (
        era0(`abl:${target}:1`) >= 3 &&
        (era0(`cflag:${target}:306`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「啊～！哦～！…才……才没有……感觉呢！！…」`); // :3217
        // CFLAG:306  = 3（变量语义：CFLAG 族，306）
        era.set(`cflag:${target}:306`, 3);
      } else if (era0(`cflag:${target}:306`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「被这样的动物………」`); // :3221
        // CFLAG:306  = 2（变量语义：CFLAG 族，306）
        era.set(`cflag:${target}:306`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 6) {
    if (era0(`cflag:${target}:307`) == 0 && era0('tflag:13')) {
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait(`「呵呵～人家的初吻…被你这家伙拿到了～…♪」`); // :3236
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「初吻给了狗啊～…也不错啦！」`); // :3239
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「明……明明想留给魔王大人的………」`); // :3242
      } else {
        await era.printAndWait(
          `「别！别这样！　我的初吻………怎么这样………呜呜……骗人的吧……………」`,
        ); // :3245
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      era.set(`cflag:${target}:307`, 1);
      return 0;
    } else if (era0(`cflag:${target}:307`) == 0) {
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait(`「呵呵～人家的初吻…被你这家伙拿到了～…♪」`); // :3253
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「初吻给了狗啊～…也不错啦！」`); // :3256
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「明……明明想留给魔王大人的………」`); // :3259
      } else {
        await era.printAndWait(
          `「别！别这样！　我的初吻………怎么这样………呜呜……骗人的吧……………」`,
        ); // :3262
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      era.set(`cflag:${target}:307`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (era0(`cflag:${target}:307`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.print(`${target_name}专心致志地与野狗唇舌交缠着。`); // :3270
        await era.printAndWait(`「哦～啊～狗的臭味………好好闻………」`); // :3271
        // CFLAG:307  = 6（变量语义：CFLAG 族，307）
        era.set(`cflag:${target}:307`, 6);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:307`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「要人家和狗亲吻什么的…魔王大人，真是个大绅士呢～」`,
        ); // :3275
        // CFLAG:307  = 5（变量语义：CFLAG 族，307）
        era.set(`cflag:${target}:307`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:307`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「魔王大人刚才说什么？我听不懂～听不到！…」`); // :3279
        // CFLAG:307  = 4（变量语义：CFLAG 族，307）
        era.set(`cflag:${target}:307`, 4);
      } else if (
        era0(`abl:${target}:10`) >= 2 &&
        (era0(`cflag:${target}:307`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「好…好吧………」`); // :3283
        // CFLAG:307  = 3（变量语义：CFLAG 族，307）
        era.set(`cflag:${target}:307`, 3);
      } else if (era0(`cflag:${target}:307`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「好讨厌啊！…好臭！…请放过我吧！…」`); // :3287
        // CFLAG:307  = 2（变量语义：CFLAG 族，307）
        era.set(`cflag:${target}:307`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 9) {
    if (era0(`cflag:${target}:310`) == 0) {
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait(`「要你来舔我的屁股…真不好意思呢～汪汪君～…」`); // :3302
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「啊～！这…………」`); // :3305
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「呃……狗什么的………」`); // :3308
      } else {
        await era.printAndWait(`「不，不要啊！！　在舔哪里啊！！」`); // :3311
      }
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310）
      era.set(`cflag:${target}:310`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (era0(`cflag:${target}:310`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.print(`${target_name}用手扒开尻穴，接受着狗的舌头。`); // :3319
        await era.printAndWait(`「哈…哈～…好……好啊～…」`); // :3320
        // CFLAG:310  = 6（变量语义：CFLAG 族，310）
        era.set(`cflag:${target}:310`, 6);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:310`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「被狗这么舔…好奇怪啊…………」`); // :3324
        // CFLAG:310  = 5（变量语义：CFLAG 族，310）
        era.set(`cflag:${target}:310`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:310`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「这到底怎么回事…这样的………」`); // :3328
        // CFLAG:310  = 4（变量语义：CFLAG 族，310）
        era.set(`cflag:${target}:310`, 4);
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:310`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「好……好…吧……」`); // :3332
        // CFLAG:310  = 3（变量语义：CFLAG 族，310）
        era.set(`cflag:${target}:310`, 3);
      } else if (era0(`cflag:${target}:310`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「啊！！　那种地方…不要舔啊～！」`); // :3336
        // CFLAG:310  = 2（变量语义：CFLAG 族，310）
        era.set(`cflag:${target}:310`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 21) {
    if (era0(`cflag:${target}:322`) == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:136`) == 1) {
          await era.print(
            `${target_name}完全成为一只牝犬了，发情地摇动着屁股引诱着狗。`,
          ); // :3353
          await era.print(
            `「我把处女奉献给你！　我的逼，是狗大人专用的东西！请在我体内打种吧！！」`,
          ); // :3354
          await era.printAndWait(
            `${target_name}这么高叫着，因为交配的喜悦全身颤抖，流出口水了。`,
          ); // :3355
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「哎呀呀～第一次是和狗呢～」`); // :3358
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「明明想奉献给魔王大人的说………」`); // :3361
        } else {
          await era.printAndWait(`「救……命……救命啊啊啊啊啊啊啊！！」`); // :3365
        }
      } else {
        if (era0(`talent:${target}:136`) == 1) {
          await era.print(
            `${target_name}完全成为一只牝犬了，发情地摇动着屁股引诱着狗。`,
          ); // :3371
          await era.print(
            `「我的逼，是狗大人专用的东西！狠狠地操我！请在我体内打种吧！！」`,
          ); // :3372
          await era.printAndWait(
            `${target_name}这么高叫着，因为交配的喜悦全身颤抖，流出口水了。`,
          ); // :3373
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「啊？要和狗哦？…呃……虽然也不错啦…………」`); // :3376
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「呜呜……魔王大人…为什么就不喜欢人家呢………」`); // :3379
        } else {
          await era.printAndWait(`「救……命……救命啊啊啊啊啊啊啊！！」`); // :3382
        }
      }
      // CFLAG:322  = 1（变量语义：CFLAG 族，322）
      era.set(`cflag:${target}:322`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (era0(`cflag:${target}:322`) <= 6 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.print(`${target_name}用狗的姿势，接受着来自后方的征讨。`); // :3392
          await era.print(
            `「交……交配着！　我和狗交配着！　我只是一只母狗！！　一只下贱的母狗！！啊～～」`,
          ); // :3393
          await era.printAndWait(`两只走兽相互交缠着，沉醉在肉欲中了。`); // :3394
        } else if (rand_n(2) == 0) {
          await era.print(`${target_name}沉浸在交配的愉悦中，放声大叫着。`); // :3396
          await era.print(
            `「啊啊啊～！　好棒～！　操我！！　噢噢噢！！　再来！再来！！」`,
          ); // :3397
          await era.printAndWait(
            `${target_name}抛弃了作为人的身份，完全成为一只发情的母兽了。`,
          ); // :3398
        } else {
          await era.print(`${target_name}兴奋地摇动着屁股引诱着狗。`); // :3400
          await era.print(
            `「来嘛…这里是狗大人的专用肉穴哦！……来这里播种吧～…♪」`,
          ); // :3401
          await era.printAndWait(
            `那副发情野兽一样的表情，已经完全看不到当初冷静的样子了。`,
          ); // :3402
        }
        // CFLAG:322  = 7（变量语义：CFLAG 族，322）
        era.set(`cflag:${target}:322`, 7);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:322`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「和狗做爱的经验也是必须的呢～…」`); // :3407
        // CFLAG:322  = 6（变量语义：CFLAG 族，322）
        era.set(`cflag:${target}:322`, 6);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:322`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「如果是魔王大人的命令的话…………和狗也…………」`); // :3411
        // CFLAG:322  = 5（变量语义：CFLAG 族，322）
        era.set(`cflag:${target}:322`, 5);
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (era0(`cflag:${target}:322`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「难以置信…我……居然和狗在交配………」`); // :3415
        // CFLAG:322  = 4（变量语义：CFLAG 族，322）
        era.set(`cflag:${target}:322`, 4);
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:322`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「呜呜………要和狗……………」`); // :3419
        // CFLAG:322  = 3（变量语义：CFLAG 族，322）
        era.set(`cflag:${target}:322`, 3);
      } else if (era0(`cflag:${target}:322`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「讨厌！…这种事………太过分了！…」`); // :3423

        // CFLAG:322  = 2（变量语义：CFLAG 族，322）
        era.set(`cflag:${target}:322`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 27) {
    if (era0(`cflag:${target}:328`) == 0) {
      if (era0(`talent:${target}:136`) == 1) {
        await era.print(
          `${target_name}完全成为一只牝犬了，发情地摇动着屁股引诱着狗。`,
        ); // :3439
        await era.printAndWait(`「请欺负我…欺负我后面的穴吧～♪」`); // :3440
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「带狗走后门………吗？」`); // :3443
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「呜……要和狗肛交………」`); // :3446
      } else {
        await era.printAndWait(`「什么…这……是骗我的……对吧…？」`); // :3449
      }
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328）
      era.set(`cflag:${target}:328`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:328`) <= 6 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.print(`${target_name}感觉自己的尻穴都要融化了……`); // :3458
          await era.print(`「啊～狗大人的鸡鸡！塞满了我下贱的菊穴…♪」`); // :3459
          await era.printAndWait(
            `都成这个样子了，看来${target_name}是无法再回头了。`,
          ); // :3460
        } else {
          await era.print(`${target_name}兴奋地扒开自己的尻穴……`); // :3462
          await era.print(`「狗大人…喜欢的话，请尽情使用我这下烂的洞吧！…」`); // :3463
          await era.printAndWait(
            `向狗不断献媚着，${target_name}现在已经是畜生以下的存在了。`,
          ); // :3464
        }
        // CFLAG:328  = 7（变量语义：CFLAG 族，328）
        era.set(`cflag:${target}:328`, 7);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:328`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「和狗…也挺舒服的……」`); // :3469
        // CFLAG:328  = 6（变量语义：CFLAG 族，328）
        era.set(`cflag:${target}:328`, 6);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:328`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「如果是和魔王大人的话…就更好了………」`); // :3473
        // CFLAG:328  = 5（变量语义：CFLAG 族，328）
        era.set(`cflag:${target}:328`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:328`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「魔王大人…为什么啊………」`); // :3477
        // CFLAG:328  = 4（变量语义：CFLAG 族，328）
        era.set(`cflag:${target}:328`, 4);
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:328`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「屁股…和狗…呜呜…………」`); // :3481
        // CFLAG:328  = 3（变量语义：CFLAG 族，328）
        era.set(`cflag:${target}:328`, 3);
      } else if (era0(`cflag:${target}:328`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「你这疯子！！……」`); // :3485
        // CFLAG:328  = 2（变量语义：CFLAG 族，328）
        era.set(`cflag:${target}:328`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 30) {
    if (era0(`cflag:${target}:331`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「形状真独特！……这就是狗的鸡鸡啊！」`); // :3500
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「呜……它勃起来了……」`); // :3503
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「狗的臭味……满手都是……」`); // :3506
      } else {
        await era.printAndWait(`「呕…………好脏……这种东西…………」`); // :3509
      }
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331）
      era.set(`cflag:${target}:331`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:331`) <= 6 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「舒服么？　嘻嘻！不停地脉动着呢！」`); // :3518
        } else {
          await era.printAndWait(
            `「野兽的味道……变浓烈的啊。来！把精液射出来吧！」`,
          ); // :3520
        }
        // CFLAG:331  = 7（变量语义：CFLAG 族，331）
        era.set(`cflag:${target}:331`, 7);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:331`) <= 5 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「哈哈～汪汪地叫着……真可爱！」`); // :3526
        } else {
          await era.printAndWait(`「有感觉了么？　原来狗也和人一样啊！」`); // :3528
        }
        // CFLAG:331  = 6（变量语义：CFLAG 族，331）
        era.set(`cflag:${target}:331`, 6);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (era0(`cflag:${target}:331`) <= 4 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「好厉害！野兽的气味！」`); // :3534
        } else {
          await era.printAndWait(`「这个……了不起的压迫感啊……」`); // :3536
        }
        // CFLAG:331  = 5（变量语义：CFLAG 族，331）
        era.set(`cflag:${target}:331`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:331`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「呵呵～有感觉饿了？」`); // :3541
        // CFLAG:331  = 4（变量语义：CFLAG 族，331）
        era.set(`cflag:${target}:331`, 4);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:331`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「狗的话……应该很容易搞定吧？」`); // :3545
        // CFLAG:331  = 3（变量语义：CFLAG 族，331）
        era.set(`cflag:${target}:331`, 3);
      } else if (era0(`cflag:${target}:331`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「咦……好臭……这种……脏东西…………」`); // :3549
        // CFLAG:331  = 2（变量语义：CFLAG 族，331）
        era.set(`cflag:${target}:331`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 31) {
    if (era0(`cflag:${target}:332`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「原来如此，狗的小鸡鸡，是这个味道啊～♪」`); // :3564
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「人家不想舔这种东西！……但是……如果……是魔王大人的爱好……的话……」`,
        ); // :3567
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「知……知道了………只是吸一下哦！」`); // :3570
      } else {
        await era.printAndWait(
          `「讨，讨厌！　不想把这东西放嘴里！！　住！住手！！！」`,
        ); // :3573
      }
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332）
      era.set(`cflag:${target}:332`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (era0(`cflag:${target}:332`) <= 6 || era0('flag:7') == 2)
      ) {
        await era.print(
          `「唔～唔～滑溜溜的…………唔啊！……鸡鸡……鸡鸡……狗大人的鸡鸡……」`,
        ); // :3581
        await era.printAndWait(
          `${target_name}气息慌乱，癫狂地吸啜着狗的阴茎。`,
        ); // :3582
        // CFLAG:332  = 7（变量语义：CFLAG 族，332）
        era.set(`cflag:${target}:332`, 7);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (era0(`cflag:${target}:332`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「哪怕是狗！我都能用嘴搞定～♪」`); // :3586
        // CFLAG:332  = 6（变量语义：CFLAG 族，332）
        era.set(`cflag:${target}:332`, 6);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:332`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「臭臭的……不过，并不讨厌……」`); // :3590
        // CFLAG:332  = 5（变量语义：CFLAG 族，332）
        era.set(`cflag:${target}:332`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (era0(`cflag:${target}:332`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「是命令的话……不管是狗还是什么，我都会尽心地服侍好的……！」`,
        ); // :3594
        // CFLAG:332  = 4（变量语义：CFLAG 族，332）
        era.set(`cflag:${target}:332`, 4);
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:332`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「知……知道啦……偶尔要也侍奉人以外的东西吗…………」`,
        ); // :3598
        // CFLAG:332  = 3（变量语义：CFLAG 族，332）
        era.set(`cflag:${target}:332`, 3);
      } else if (era0(`cflag:${target}:332`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「讨！讨厌！　呕…………臭死了……这野兽！」`); // :3602
        // CFLAG:332  = 2（变量语义：CFLAG 族，332）
        era.set(`cflag:${target}:332`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 34) {
    if (era0(`cflag:${target}:335`) == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:136`) == 1) {
          await era.printAndWait(''); // :3619
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(''); // :3622
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(''); // :3625
        } else {
          await era.printAndWait(''); // :3628
        }
      } else {
        if (era0(`talent:${target}:136`) == 1) {
          await era.printAndWait(''); // :3634
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(''); // :3637
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(''); // :3640
        } else {
          await era.printAndWait(''); // :3643
        }
      }
      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335）
      era.set(`cflag:${target}:335`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (era0(`cflag:${target}:335`) <= 6 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(''); // :3653
        } else if (rand_n(2) == 0) {
          await era.printAndWait(''); // :3655
        } else {
          await era.printAndWait(''); // :3657
        }
        // CFLAG:335  = 7（变量语义：CFLAG 族，335）
        era.set(`cflag:${target}:335`, 7);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:335`) <= 5 || era0('flag:7') == 2)
      ) {
        if (rand_n(4) == 0) {
          await era.printAndWait(''); // :3663
        } else if (rand_n(3) == 0) {
          await era.printAndWait(''); // :3665
        } else if (rand_n(2) == 0) {
          await era.printAndWait(''); // :3667
        } else {
          await era.printAndWait(''); // :3669
        }
        // CFLAG:335  = 6（变量语义：CFLAG 族，335）
        era.set(`cflag:${target}:335`, 6);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:335`) <= 4 || era0('flag:7') == 2)
      ) {
        if (rand_n(4) == 0) {
          await era.print(''); // :3675
        } else if (rand_n(3) == 0) {
          await era.printAndWait(''); // :3677
        } else if (rand_n(2) == 0) {
          await era.printAndWait(''); // :3679
        } else {
          await era.printAndWait(''); // :3681
        }
        // CFLAG:335  = 5（变量语义：CFLAG 族，335）
        era.set(`cflag:${target}:335`, 5);
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (era0(`cflag:${target}:335`) <= 3 || era0('flag:7') == 2)
      ) {
        if (rand_n(4) == 0) {
          await era.printAndWait(''); // :3687
        } else if (rand_n(3) == 0) {
          await era.printAndWait(''); // :3689
        } else if (rand_n(2) == 0) {
          await era.printAndWait(''); // :3691
        } else {
          await era.printAndWait(''); // :3693
        }
        // CFLAG:335  = 4（变量语义：CFLAG 族，335）
        era.set(`cflag:${target}:335`, 4);
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:335`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.print(''); // :3698
        await era.printAndWait(''); // :3699
        // CFLAG:335  = 3（变量语义：CFLAG 族，335）
        era.set(`cflag:${target}:335`, 3);
      } else if (era0(`cflag:${target}:335`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(''); // :3703
        // CFLAG:335  = 2（变量语义：CFLAG 族，335）
        era.set(`cflag:${target}:335`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 37) {
    if (era0(`cflag:${target}:338`) == 0) {
      if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(''); // :3718
      } else {
        await era.printAndWait(''); // :3721
      }
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338）
      era.set(`cflag:${target}:338`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (era0(`cflag:${target}:338`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :3729
        // CFLAG:338  = 6（变量语义：CFLAG 族，338）
        era.set(`cflag:${target}:338`, 6);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (era0(`cflag:${target}:338`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :3733
        // CFLAG:338  = 5（变量语义：CFLAG 族，338）
        era.set(`cflag:${target}:338`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (era0(`cflag:${target}:338`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.print(''); // :3737
        // CFLAG:338  = 4（变量语义：CFLAG 族，338）
        era.set(`cflag:${target}:338`, 4);
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:338`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :3741
        // CFLAG:338  = 3（变量语义：CFLAG 族，338）
        era.set(`cflag:${target}:338`, 3);
      } else if (era0(`cflag:${target}:338`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(''); // :3745
        // CFLAG:338  = 2（变量语义：CFLAG 族，338）
        era.set(`cflag:${target}:338`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`)) {
    if (era0(`cflag:${target}:344`) == 0) {
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait(''); // :3761
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(''); // :3764
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(''); // :3767
      } else {
        await era.printAndWait(''); // :3770
      }
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344）
      era.set(`cflag:${target}:344`, 1);
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (era0(`cflag:${target}:344`) <= 9 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :3778
        // CFLAG:TARGET:344  = 10（变量语义：CFLAG 族，TARGET:344）
        era.set(`cflag:${target}:344`, 10);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (era0(`cflag:${target}:344`) <= 8 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :3782
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344）
        era.set(`cflag:${target}:344`, 9);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:344`) <= 7 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :3786
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344）
        era.set(`cflag:${target}:344`, 8);
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:344`) <= 6 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :3790
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344）
        era.set(`cflag:${target}:344`, 7);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (era0(`cflag:${target}:344`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :3794
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344）
        era.set(`cflag:${target}:344`, 6);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:344`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :3798
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344）
        era.set(`cflag:${target}:344`, 5);
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:344`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :3802
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344）
        era.set(`cflag:${target}:344`, 4);
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:344`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :3806
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344）
        era.set(`cflag:${target}:344`, 3);
      } else if (era0(`cflag:${target}:344`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(''); // :3810
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344）
        era.set(`cflag:${target}:344`, 2);
      }
      return 0;
    }
  } else if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`) == 0) {
    if (
      era0(`talent:${target}:136`) == 1 &&
      (era0(`cflag:${target}:380`) < 3 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(''); // :3819
      // CFLAG:380  = 4（变量语义：CFLAG 族，380）
      era.set(`cflag:${target}:380`, 4);
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (era0(`cflag:${target}:380`) < 3 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(''); // :3823
      // CFLAG:380  = 3（变量语义：CFLAG 族，380）
      era.set(`cflag:${target}:380`, 3);
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (era0(`cflag:${target}:380`) < 2 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(''); // :3827
      // CFLAG:380  = 2（变量语义：CFLAG 族，380）
      era.set(`cflag:${target}:380`, 2);
    } else if (era0(`cflag:${target}:380`) < 1 || era0('flag:7') == 2) {
      await era.printAndWait(''); // :3831
      // CFLAG:380  = 1（变量语义：CFLAG 族，380）
      era.set(`cflag:${target}:380`, 1);
    }
    return 0;
  }

  if (era_flag.selectcom == 56) {
    if (era0(`cflag:${target}:357`) == 0) {
      if (era0(`tequip:${target}:53`)) {
        if (era0(`talent:${target}:136`) == 1) {
          await era.printAndWait(
            `「呃……我叫${target_name}……原来是个勇者……但我现在已经不当勇者，改当魔王大人的家畜了。」`,
          ); // :3848
          await era.printAndWait(
            `${target_name}一边对水晶球这么说着，一边抱紧了旁边的狗。`,
          ); // :3849
          await era.printAndWait(
            `「在那以后，就一直在主人的命令下与狗大人在交配……享受着家畜的最高快乐～♪」`,
          ); // :3850
          await era.printAndWait(
            `「现在，就让我们围绕小鸡鸡，做许许多多舒服的事情吧！嘻嘻～」`,
          ); // :3851
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「呃……我叫${target_name}……原来是个勇者……但我现在已经不当勇者，成为魔王大人的牝奴隶了。」`,
          ); // :3854
          await era.printAndWait(
            `${target_name}一边这么说着，一边对水晶球淫靡地扭腰摆臀。`,
          ); // :3855
          await era.printAndWait(
            `「在主人的命令下，有时还要和狗交配……尽情地鄙视这样下贱的我吧！」`,
          ); // :3856
          await era.printAndWait(
            `「现在，就让我们围绕小鸡鸡，做许许多多舒服的事情吧！嘻嘻～」`,
          ); // :3857
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「呃……我叫${target_name}……原来是个勇者……但我现在已经不当勇者，成为魔王大人的奴隶了。」`,
          ); // :3860
          await era.printAndWait(
            `${target_name}一边这么说着，一边顺从地对水晶球分开双腿。`,
          ); // :3861
          await era.printAndWait(
            `「在主人的命令下，有时还要和狗交配……尽情地鄙视这样下贱的我吧！」`,
          ); // :3862
          await era.printAndWait(
            `「现在，就让我们围绕小鸡鸡，做许许多多舒服的事情吧！嘻嘻～」`,
          ); // :3863
        } else {
          await era.printAndWait(
            `「看到这个水晶球的人！谁都好！谁都可以！！请来救救我吧！！呜呜……呜呜呜…………哇！！！！」`,
          ); // :3866
        }
      }
      // CFLAG:357  = 1（变量语义：CFLAG 族，357）
      era.set(`cflag:${target}:357`, 1);
      return 0;
    } else {
      if (era0(`tequip:${target}:53`)) {
        if (
          era0(`talent:${target}:136`) == 1 &&
          (era0(`cflag:${target}:357`) <= 4 || era0('flag:7') == 2)
        ) {
          await era.printAndWait(
            `「呃……我叫${target_name}……大家对我的上一部作品感觉如何呢？」`,
          ); // :3877
          await era.printAndWait(
            `${target_name}一边对水晶球这么说着，一边抱紧了旁边的狗。`,
          ); // :3878
          await era.printAndWait(
            `「这次，也是在主人的命令下要和狗大人交配了……嘻嘻～当家畜真幸福呢～♪」`,
          ); // :3879
          await era.printAndWait(
            `「现在，就让我们围绕小鸡鸡，做许许多多舒服的事情吧！嘻嘻～」`,
          ); // :3880
          // CFLAG:357  = 5（变量语义：CFLAG 族，357）
          era.set(`cflag:${target}:357`, 5);
        } else if (
          era0(`talent:${target}:76`) == 1 &&
          (era0(`cflag:${target}:357`) <= 3 || era0('flag:7') == 2)
        ) {
          await era.printAndWait(
            `「呃……我叫${target_name}……大家对我的上一部的兽交作品感觉如何呢？」`,
          ); // :3884
          await era.printAndWait(
            `${target_name}一边这么说着，一边对水晶球淫靡地扭腰摆臀。`,
          ); // :3885
          await era.printAndWait(
            `「这次，在主人的命令下，我又要和狗交配了……尽情地鄙视这样下贱的我吧！」`,
          ); // :3886
          await era.printAndWait(
            `「现在，就让我们围绕小鸡鸡，做许许多多舒服的事情吧！嘻嘻～」`,
          ); // :3887
          // CFLAG:357  = 4（变量语义：CFLAG 族，357）
          era.set(`cflag:${target}:357`, 4);
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          (era0(`cflag:${target}:357`) <= 2 || era0('flag:7') == 2)
        ) {
          await era.printAndWait(
            `「呃……我叫${target_name}……大家对我的上一次的交配感觉如何呢？」`,
          ); // :3891
          await era.printAndWait(
            `${target_name}一边这么说着，一边顺从地对水晶球分开双腿。`,
          ); // :3892
          await era.printAndWait(
            `「这次，在主人的命令下，我又要和狗交配了……尽情地鄙视这样下贱的我吧！」`,
          ); // :3893
          await era.printAndWait(
            `「现在，就让我们围绕小鸡鸡，做许许多多舒服的事情吧！嘻嘻～」`,
          ); // :3894
          // CFLAG:357  = 3（变量语义：CFLAG 族，357）
          era.set(`cflag:${target}:357`, 3);
        } else if (era0(`cflag:${target}:357`) <= 1 || era0('flag:7') == 2) {
          await era.printAndWait(''); // :3898
          // CFLAG:357  = 2（变量语义：CFLAG 族，357）
          era.set(`cflag:${target}:357`, 2);
        }
      }
      return 0;
    }
  }

  return 0;
}

/**
 * @KOJO_MESSAGE_PALAMCNG_4（:3915-4114）：参数变动触发的口上（FLAG:7 > 0 才达）。
 * 守卫（:3920-3921/:3923-3924/:3926）：口塞、失神、死斗场。P = PALAM:n + UP:n 的
 * 局部在每支内计算（:3936 等）。
 */
async function kojo_message_palamcng_4() {
  const target = era_flag.target;

  if (era0(`tequip:${target}:45`)) {
    return 0;
  }

  if (era0('tflag:899')) {
    return 0;
  }

  if (era0(`tequip:${target}:55`)) {
    return 0;
  }

  // 赋值 P = PALAM:3 + UP:3
  let P = (era0(`palam:${target}:3`) || 0) + (era0(`delta:${target}:3`) || 0); // :639 PALAM:3 + UP:3
  if (P > era0('palamlv:2') && era0(`cflag:${target}:221`) == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      if (era_flag.selectcom == 50) {
        await era.printAndWait(`「黏糊糊的……好想蹭到魔王大人身上！…嘻嘻～」`); // :3942
        await era.printAndWait(
          `「人家好感动哦～魔王大人，是不想让人家感到痛而使用润滑液的吧……魔王大人，爱你哦～！」`,
        ); // :3943
      } else {
        await era.printAndWait(
          `「魔王大人……看看嘛……人家的爱意，人家的爱液……都已经因你而溢出了啦～」`,
        ); // :3946
      }
    } else {
      if (era_flag.selectcom == 50) {
        await era.printAndWait(`「什么嘛！这黏糊糊的…」`); // :3952
        await era.printAndWait(`「这……是不想让我那么痛吧？……算你有点良心……」`); // :3953
      } else {
        await era.printAndWait(
          `「不会吧…我……我……居然这么湿了………不！不……不！！……我不是这样子的！………」`,
        ); // :3956
      }
    }
    // CFLAG:TARGET:221  = 1（变量语义：CFLAG 族，TARGET:221）
    era.set(`cflag:${target}:221`, 1);
  }

  // 赋值 P = PALAM:5 + UP:5
  P = (era0(`palam:${target}:5`) || 0) + (era0(`delta:${target}:5`) || 0); // :3965 PALAM:5 + UP:5
  if (P > era0('palamlv:2') && era0(`cflag:${target}:222`) == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      if (era_flag.selectcom == 51) {
        await era.printAndWait(`「啊～五彩缤纷的！好棒～好棒啊！…」`); // :3971
      } else {
        await era.printAndWait(
          `「魔王大人…我已经是你的人了……请好好地疼爱人家吧………」`,
        ); // :3974
      }
    } else {
      if (era_flag.selectcom == 51) {
        await era.printAndWait(`「卑鄙！…用这种手段………」`); // :3980
      } else {
        await era.printAndWait(`「难以置信…我………居然……感到愉悦………？」`); // :3983
      }
    }
    // CFLAG:222  = 1（变量语义：CFLAG 族，222）
    era.set(`cflag:${target}:222`, 1);
  }

  // 赋值 P = PALAM:8 + UP:8
  P = (era0(`palam:${target}:8`) || 0) + (era0(`delta:${target}:8`) || 0); // :3992 PALAM:8 + UP:8
  if (P > era0('palamlv:2') && era0(`cflag:${target}:223`) == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「魔王大人！…你好坏！人家羞羞嘛～…」`); // :3996
    } else {
      await era.printAndWait(`「讨厌……这样…好羞耻啊………」`); // :3999
    }
    // CFLAG:223  = 1（变量语义：CFLAG 族，223）
    era.set(`cflag:${target}:223`, 1);
  }

  // 赋值 P = PALAM:10 + UP:10
  P = (era0(`palam:${target}:10`) || 0) + (era0(`delta:${target}:10`) || 0); // :4007 PALAM:10 + UP:10
  if (P > era0('palamlv:2') && era0(`cflag:${target}:224`) == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「魔王……大人……　有时候…你……好可怕啊………」`); // :4011
    } else {
      await era.printAndWait(`「呜……呜……我……我……知道为什么你是魔王了！！」`); // :4014
    }
    // CFLAG:224  = 1（变量语义：CFLAG 族，224）
    era.set(`cflag:${target}:224`, 1);
  }

  if (era0(`nowex:${target}:0`) > 0 && era0(`cflag:${target}:225`) == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「魔……魔王……大人……要去了！！……人家要去了！！……可以去了吗？…………谢谢…魔王大人………啊～！！」`,
      ); // :4025
    } else {
      await era.printAndWait(
        `「来了…要来了！　体内有什么东西！　唔哦哦哦哦哦哦！！」`,
      ); // :4028
    }
    // CFLAG:225  = 1（变量语义：CFLAG 族，225）
    era.set(`cflag:${target}:225`, 1);
  }

  if (era0(`nowex:${target}:1`) > 0 && era0(`cflag:${target}:226`) == 0) {
    if (era0(`talent:${target}:76`) == 1) {
      await era.printAndWait(
        `「啊啊啊！　小穴！小穴要去了！！　要对这感觉上瘾了啦！～！」`,
      ); // :4039
    } else if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「啊啊啊！　里面…有什么…这…………？！……唔……哦哦哦哦哦！…！」`,
      ); // :4042
    } else {
      await era.printAndWait(
        `「别！别这样！…呃……忍不住了！…唔哦哦哦哦哦哦！！」`,
      ); // :4045
    }
    // CFLAG:TARGET:226  = 1（变量语义：CFLAG 族，TARGET:226）
    era.set(`cflag:${target}:226`, 1);
  }

  if (era0(`nowex:${target}:2`) > 0 && era0(`cflag:${target}:227`) == 0) {
    if (era0(`talent:${target}:76`) == 1) {
      await era.printAndWait(
        `「啊哈！　好！　好棒！　第一次……第一次用菊花高潮了！！」`,
      ); // :4056
    } else if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「难以置信……我的屁股……我的屁股………要变成性器官了！！」`,
      ); // :4059
    } else {
      await era.printAndWait(
        `「讨厌！讨厌！！　这个洞是错的啊！！　不想去！不要去！！…不……要……哇啊啊啊啊啊！！」`,
      ); // :4062
    }
    // CFLAG:227  = 1（变量语义：CFLAG 族，227）
    era.set(`cflag:${target}:227`, 1);
  }

  if (era0(`nowex:${target}:3`) > 0 && era0(`cflag:${target}:228`) == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「胸部…好幸福………啊啊！去了！要去了啦！！！」`); // :4073
    } else {
      await era.printAndWait(
        `「啊！唔啊啊！！　我的胸……我的胸………呜哦哦哦哦哦！～！」`,
      ); // :4076
    }
    // CFLAG:TARGET:228  = 1（变量语义：CFLAG 族，TARGET:228）
    era.set(`cflag:${target}:228`, 1);
  }

  // 赋值 A = UP:11 + UP:12
  const A =
    (era0(`delta:${target}:11`) || 0) + (era0(`delta:${target}:12`) || 0);
  if (era0('tflag:3') == 1 && era0(`cflag:${target}:229`) == 0) {
    if (era0('tflag:20') == 1) {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (A < 500 || era0('tflag:150') == 1)
      ) {
        await era.printAndWait(
          `「啊～终于……终于成为女人了……比想象中还要痛啊！」`,
        ); // :4090
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (A < 500 || era0('tflag:150') == 1)
      ) {
        await era.printAndWait(
          `「啊～终于……终于把自己奉献给了魔王大人……好痛……就不能轻一点吗？」`,
        ); // :4093
      } else {
        await era.printAndWait(`「这就是……做为女人的感觉…………」`); // :4096
      }
    } else {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「啊～终于……从今往后，百无禁忌！！」`); // :4102
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「呜呜……明明……明明……想把处女奉献给魔王大人的嘛…………」`,
        ); // :4105
      } else {
        await era.printAndWait(`「这就是……做为女人的感觉…………」`); // :4108
      }
    }
    // CFLAG:TARGET:229  = 1（变量语义：CFLAG 族，TARGET:229）
    era.set(`cflag:${target}:229`, 1);
  }
}

/**
 * @KOJO_MESSAGE_MARKCNG_4（:4119-4178）：刻印变动触发的口上。
 * 守卫（:4124-4125）：口塞。TFLAG:22-24 与 21 为 3 时各支发声一次（CFLAG:297-300）。
 */
async function kojo_message_markcng_4() {
  const target = era_flag.target;

  if (era0(`tequip:${target}:45`)) {
    return 0;
  }

  if (era0('tflag:22') == 3 && era0(`cflag:${target}:297`) == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「感觉好痛苦……这难道……也是……爱的滋味吗？……」`); // :4132
    } else {
      await era.printAndWait(`「我……我会听话的……请不要再这么弄我了…………」`); // :4134
    }
    // CFLAG:297  = 1（变量语义：CFLAG 族，297）
    era.set(`cflag:${target}:297`, 1);
  }

  if (era0('tflag:23') == 3 && era0(`cflag:${target}:298`) == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「有……有感觉了…………魔王大人……魔王大人哦！！……人家……人家变得好奇怪啊！！」`,
      ); // :4145
    } else {
      await era.printAndWait(`「有……有感觉了…………我……我变得好奇怪啊！！」`); // :4147
    }
    // CFLAG:298  = 1（变量语义：CFLAG 族，298）
    era.set(`cflag:${target}:298`, 1);
  }

  if (era0('tflag:24') == 3 && era0(`cflag:${target}:299`) == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「人家会对魔王大人唯命是从的！………以后，请疼爱人家啊………」`,
      ); // :4158
    } else {
      await era.printAndWait(`「呜呜呜……我……我听话还不行吗…………」`); // :4160
    }
    // CFLAG:299  = 1（变量语义：CFLAG 族，299）
    era.set(`cflag:${target}:299`, 1);
  }

  if (era0('tflag:21') == 3 && era0(`cflag:${target}:300`) == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「魔王大人！……我讨厌你！！！」`); // :4171
    } else {
      await era.printAndWait(
        `「你这家伙！……从现在开始！……不会再忍让你啦！！」`,
      ); // :4173
    }
    // CFLAG:300  = 1（变量语义：CFLAG 族，300）
    era.set(`cflag:${target}:300`, 1);
  }
}

/**
 * @SELF_KOJO_K4（:4182-4432）：调教后事件口上（TFLAG:13 分派）。
 * 1 自慰 / 2 百合 / 3 朝口交 / 4 调教后性交 / 5 夜袭 / 6 卖却 / 11 妊娠发觉 /
 * 12 生产 / 13 育儿室 / 14 亲离 / 999 死亡 / 998 寿命；末行 TFLAG:13 = 0。
 * 卖却分支的 PRINTFORMW 是模板未填写（源逐字空串，1:1 保留）。
 */
async function self_kojo_k4() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%

  if (era0('tflag:13') == 1) {
    if (
      era0(`talent:${target}:76`) &&
      (era0(`cflag:${target}:261`) < 4 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(
        `「啊……我是多么下流的女人啊…这么…这么自慰……根本停不下来……」`,
      ); // :4189
      // CFLAG:261  = 4（变量语义：CFLAG 族，261）
      era.set(`cflag:${target}:261`, 4);
    } else if (
      era0(`talent:${target}:85`) &&
      (era0(`cflag:${target}:261`) < 3 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(
        `「魔王大人………魔王大人啊…………唔……唔…………噢！！～…」`,
      ); // :4193
      // CFLAG:261  = 3（变量语义：CFLAG 族，261）
      era.set(`cflag:${target}:261`, 3);
    } else if (
      era0(`abl:${target}:31`) >= 3 &&
      (era0(`cflag:${target}:261`) < 2 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「停不下来…停不下来啦～…变得好奇怪！…」`); // :4197
      // CFLAG:261  = 2（变量语义：CFLAG 族，261）
      era.set(`cflag:${target}:261`, 2);
    } else if (era0(`cflag:${target}:261`) < 1 || era0('flag:7') == 2) {
      await era.printAndWait(`「唔……呃……哦！～………啊啊啊！」`); // :4201
      // CFLAG:261  = 1（变量语义：CFLAG 族，261）
      era.set(`cflag:${target}:261`, 1);
    }
  }

  if (era0('tflag:13') == 2) {
    if (
      era0(`talent:${target}:76`) &&
      (era0(`cflag:${target}:262`) < 5 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(
        `「女人的身体…真是好东西啊…唔哦！！……再更加……再更加粗暴地对待我吧！…」`,
      ); // :4212
      // CFLAG:262  = 5（变量语义：CFLAG 族，262）
      era.set(`cflag:${target}:262`, 5);
    } else if (
      era0(`talent:${target}:85`) &&
      (era0(`cflag:${target}:262`) < 4 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(
        `「女人的身体…真是好东西啊…嘻嘻！……再更加抱紧我吧！…」`,
      ); // :4216
      // CFLAG:262  = 4（变量语义：CFLAG 族，262）
      era.set(`cflag:${target}:262`, 4);
    } else if (
      era0(`abl:${target}:33`) >= 3 &&
      (era0(`cflag:${target}:262`) < 3 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「没有百合的话…我可能活不下去了………」`); // :4220
      // CFLAG:262  = 3（变量语义：CFLAG 族，262）
      era.set(`cflag:${target}:262`, 3);
    } else if (
      era0(`abl:${target}:22`) >= 3 &&
      (era0(`cflag:${target}:262`) < 2 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「女人哦………可是………好棒啊…………」`); // :4224
      // CFLAG:262  = 2（变量语义：CFLAG 族，262）
      era.set(`cflag:${target}:262`, 2);
    } else if (era0(`cflag:${target}:262`) < 1 || era0('flag:7') == 2) {
      await era.printAndWait(`「我居然…对…女人………」`); // :4228
      // CFLAG:262  = 1（变量语义：CFLAG 族，262）
      era.set(`cflag:${target}:262`, 1);
    }
  }

  if (era0('tflag:13') == 3) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (era0(`cflag:${target}:263`) < 3 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「我吸！唔～哦～唔～唔～～」`); // :4239
      await era.printAndWait(`「果然！主人的精华，在早上是最浓的呢…！」`); // :4240
      await era.printAndWait(
        `${target_name}伸出舌头，把嘴里滴落的精液舔干净了。`,
      ); // :4241
      // CFLAG:263  = 3（变量语义：CFLAG 族，263）
      era.set(`cflag:${target}:263`, 3);
    } else if (
      era0(`talent:${target}:85`) &&
      (era0(`cflag:${target}:263`) < 3 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「嘻嘻～醒啦～？♪」`); // :4245
      await era.printAndWait(
        `${target_name}甜甜地笑着，用心地侍奉着你的阴茎。`,
      ); // :4246
      await era.printAndWait(
        `「主人的小鸡鸡～今天也很精神呢～♪　请今天也，好好地疼爱人家吧！」`,
      ); // :4247
      await era.printAndWait(
        `${target_name}这么说着，柔情无限地看着你。突然，往你阴茎上亲了一口。`,
      ); // :4248
      // CFLAG:263  = 3（变量语义：CFLAG 族，263）
      era.set(`cflag:${target}:263`, 3);
    } else if (
      era0(`abl:${target}:16`) >= 5 &&
      (era0(`cflag:${target}:263`) < 2 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「主人！主人！日上三竿了哦～♪」`); // :4252
      // CFLAG:263  = 2（变量语义：CFLAG 族，263）
      era.set(`cflag:${target}:263`, 2);
    } else if (era0(`cflag:${target}:263`) < 1 || era0('flag:7') == 2) {
      await era.printAndWait(`「早上好～！～♪」`); // :4256
      // CFLAG:263  = 1（变量语义：CFLAG 族，263）
      era.set(`cflag:${target}:263`, 1);
    }
  }

  if (era0('tflag:13') == 4) {
    if (
      era0(`abl:${target}:2`) >= 4 &&
      (era0(`cflag:${target}:264`) < 2 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(
        `「唔～哦哦哦哦！……好棒！……好……棒……啊～！……啊啊啊啊啊！～♪」`,
      ); // :4267
      // CFLAG:264  = 2（变量语义：CFLAG 族，264）
      era.set(`cflag:${target}:264`, 2);
    } else if (era0(`cflag:${target}:264`) < 1 || era0('flag:7') == 2) {
      await era.printAndWait(
        `「再来！再来！魔王大人那热热的肉棒！再给我吧～♪」`,
      ); // :4271
      // CFLAG:264  = 1（变量语义：CFLAG 族，264）
      era.set(`cflag:${target}:264`, 1);
    }
  }

  if (era0('tflag:13') == 5) {
    if (era0(`cflag:${target}:265`) < 1 || era0('flag:7') == 2) {
      await era.printAndWait(
        `「请……用力地抱着我吧……实在是疼得没办法了………想你想得快发疯啦！！」`,
      ); // :4281
      // CFLAG:265  = 1（变量语义：CFLAG 族，265）
      era.set(`cflag:${target}:265`, 1);
    }
  }

  if (era0('tflag:13') == 6) {
    if (era0(`talent:${target}:85`) && era0(`mark:${target}:3`) < 3) {
      await era.printAndWait(''); // :4292
    } else if (era0(`mark:${target}:3`) == 3) {
      await era.printAndWait(''); // :4295
    } else if (era0(`talent:${target}:76`)) {
      await era.printAndWait(''); // :4298
    } else {
      await era.printAndWait(''); // :4301
    }
    await era.print(''); // :4303
    if (era0(`talent:${target}:122`) != 1) {
      stub_line('SELL_MATURO_K0', '卖却分支（成熟贩卖）', '随售却票');
    }
  }

  if (era0('tflag:13') == 11) {
    if (era0(`cflag:${target}:271`) >= 1) {
      return 0;
    }

    if (era0(`talent:${target}:9`) == 1) {
      await era.printAndWait(''); // :4317
    } else if (
      era0(`talent:${target}:85`) &&
      era0(`cflag:${target}:102`) == 1
    ) {
      await era.printAndWait(''); // :4320
    } else if (era0(`cflag:${target}:102`) == 2) {
      await era.printAndWait(''); // :4323
    } else if (era0(`cflag:${target}:102`) == 3) {
      await era.printAndWait(''); // :4326
    } else if (era0(`cflag:${target}:102`) == 5) {
      await era.printAndWait(''); // :4329
    } else if (era0(`cflag:${target}:102`) == 7) {
      await era.printAndWait(''); // :4332
    } else {
      await era.printAndWait(''); // :4335
    }
    // CFLAG:271  = 1（变量语义：CFLAG 族，271）
    era.set(`cflag:${target}:271`, 1);
  }

  if (era0('tflag:13') == 12) {
    if (era0(`cflag:${target}:272`) >= 1) {
      return 0;
    }

    if (era0(`talent:${target}:9`) == 1) {
      await era.printAndWait(''); // :4349
    } else if (
      era0(`talent:${target}:85`) &&
      era0(`cflag:${target}:102`) == 1
    ) {
      await era.printAndWait(''); // :4352
    } else if (era0(`cflag:${target}:102`) == 2) {
      await era.printAndWait(''); // :4355
    } else if (era0(`cflag:${target}:102`) == 3) {
      await era.printAndWait(''); // :4358
    } else if (era0(`cflag:${target}:102`) == 5) {
      await era.printAndWait(''); // :4361
    } else if (era0(`cflag:${target}:102`) == 7) {
      await era.printAndWait(''); // :4364
    } else {
      await era.printAndWait(''); // :4367
    }
    // CFLAG:272  = 1（变量语义：CFLAG 族，272）
    era.set(`cflag:${target}:272`, 1);
  }

  if (era0('tflag:13') == 13) {
    if (era0(`talent:${target}:85`) || era0(`talent:${target}:76`)) {
      if (era0(`talent:${target}:153`)) {
        await era.printAndWait(''); // :4380
      } else if (era0(`talent:${target}:154`)) {
        await era.printAndWait(''); // :4383
      }
    }
    // CFLAG:273  = 1（变量语义：CFLAG 族，273）
    era.set(`cflag:${target}:273`, 1);
  }

  if (era0('tflag:13') == 14) {
    if (era0(`talent:${target}:85`) || era0(`talent:${target}:76`)) {
      await era.printAndWait(''); // :4395
    }
    // CFLAG:274  = 1（变量语义：CFLAG 族，274）
    era.set(`cflag:${target}:274`, 1);
  }

  if (era0('tflag:13') == 999) {
    if (era0(`talent:${target}:85`)) {
      await era.printAndWait(''); // :4407
    } else {
      await era.printAndWait(''); // :4410
    }
  }

  if (era0('tflag:13') == 998) {
    if (era0(`talent:${target}:85`)) {
      await era.printAndWait(''); // :4420
    } else {
      await era.printAndWait(''); // :4423
    }
  }

  // TFLAG:13  = 0（变量语义：TFLAG 族，13；跨域写走门面 #71）
  game.train.初吻与自我口上 = 0;

  return 0;
}

// 注册进事件口上分发族（TRYCALLFORM SELF_KOJO_K4 的等价物）
self_kojo_family.register(4, self_kojo_k4);

/**
 * @DUNGEON_RYOUZYOKU_K4（:4463-4551）：迷宫凌辱前的口上（H13 分派，TARGET = ARG）。
 * 处女/非处女 × 性格分档（冷漠/低姿态/反抗/胆怯/其他）。
 */
async function dungeon_ryouzyoku_k4() {
  const target = era_flag.target;

  if (era0(`talent:${target}:0`) == 1) {
    await era.printAndWait(`「这种蠢事………我还是第一次………」`); // :4470

    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      await era.printAndWait(`「可恶！」`); // :4475

      return 0;
    } else if (
      era0(`talent:${target}:17`) == 1 ||
      era0(`talent:${target}:31`) == 1 ||
      era0(`talent:${target}:36`) == 1
    ) {
      await era.printAndWait(
        `「求你们！　放过我………这种事，要和喜欢的人做………」`,
      ); // :4481

      if (era0(`talent:${target}:106`) == 1 || era0(`exp:${target}:1`) > 0) {
        await era.printAndWait(
          `「用……用后面吧！！　虽然有点脏…不过我不介意的…………」`,
        ); // :4485
      }

      if (era0(`exp:${target}:22`) > 0) {
        await era.printAndWait(`「呜……我用嘴！……我用嘴可以么？…」`); // :4489
      }
    } else if (
      era0(`talent:${target}:11`) == 1 ||
      era0(`talent:${target}:12`) == 1 ||
      era0(`talent:${target}:15`) == 1 ||
      era0(`talent:${target}:30`) == 1 ||
      era0(`talent:${target}:34`) == 1
    ) {
      await era.printAndWait(`「开什么玩笑！！　我绝不承认！…绝不屈服！！」`); // :4495
    } else if (
      era0(`talent:${target}:10`) == 1 ||
      era0(`talent:${target}:26`) == 1
    ) {
      await era.printAndWait(`「这……莫非就是我的命运………」`); // :4500
    } else {
      await era.printAndWait(`「这种屈辱……我绝不屈服！！…」`); // :4505
    }
  } else {
    if (!era0(`talent:${target}:122`)) {
      await era.printAndWait(`（她早就把处女用掉了！）`); // :4511
    }

    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      await era.printAndWait(`「唉………………」`); // :4516

      return 0;
    } else if (
      era0(`talent:${target}:17`) == 1 ||
      era0(`talent:${target}:31`) == 1 ||
      era0(`talent:${target}:36`) == 1
    ) {
      await era.printAndWait(`「把我救出去吧？我再好好地报答你们？」`); // :4522

      if (era0(`talent:${target}:106`) == 1 || era0(`exp:${target}:1`) > 0) {
        await era.printAndWait(`「用后面……用后面的话……就随你们弄………」`); // :4526
      }

      if (era0(`exp:${target}:22`) > 0) {
        await era.printAndWait(
          `「其它放过我！我用嘴！我用嘴尽力地满足你们？…」`,
        ); // :4530
      }
    } else if (
      era0(`talent:${target}:11`) == 1 ||
      era0(`talent:${target}:12`) == 1 ||
      era0(`talent:${target}:15`) == 1 ||
      era0(`talent:${target}:30`) == 1 ||
      era0(`talent:${target}:34`) == 1
    ) {
      await era.printAndWait(
        `「你们也许可以摆布我的身体！但我的内心绝不屈服！！！」`,
      ); // :4536
    } else if (
      era0(`talent:${target}:10`) == 1 ||
      era0(`talent:${target}:26`) == 1
    ) {
      await era.printAndWait(`「我……要完蛋了吗………」`); // :4541
    } else {
      await era.printAndWait(`「我不会屈服！！　绝对…」`); // :4546
    }
  }

  return 0;
}

/**
 * @DUNGEON_RYOUZYOKU_AFTER_K4（:4554-4617）：迷宫凌辱后的口上（H13 分派）。
 * 处女/非处女 × 经验门槛（EXP:0/1/20/22 > 20）分档。
 */
async function dungeon_ryouzyoku_after_k4() {
  const target = era_flag.target;

  if (era0(`talent:${target}:0`) == 1) {
    await era.printAndWait(`「呼………我…的……纯洁……平安无恙………」`); // :4561

    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      await era.printAndWait(`「哼！」`); // :4566

      return 0;
    }

    if (era0(`exp:${target}:1`) > 20) {
      await era.printAndWait(`「屁股……好痛苦………」`); // :4573
      await era.printAndWait(`「如此的……粗暴……………」`); // :4574
    }

    if (era0(`exp:${target}:22`) > 20) {
      await era.printAndWait(`「这么舔……还是……第一次………」`); // :4579
    }

    if (era0(`exp:${target}:20`) > 20) {
      await era.printAndWait(`「射了……好多………」`); // :4583
    }
  } else {
    await era.printAndWait(`「终于……结束了吗……？」`); // :4586

    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      await era.printAndWait(`「…………」`); // :4591

      return 0;
    }

    if (era0(`exp:${target}:0`) > 20) {
      await era.printAndWait(`「里面……要被弄坏了啦………」`); // :4598
      await era.printAndWait(`「好过分……………」`); // :4599
    }

    if (era0(`exp:${target}:1`) > 20) {
      await era.printAndWait(`「屁股……已经没有感觉了………」`); // :4604
      await era.printAndWait(`「真糟糕………」`); // :4605
    }

    if (era0(`exp:${target}:22`) > 20) {
      await era.printAndWait(`「舔得我都快吐了………」`); // :4610
    }

    if (era0(`exp:${target}:20`) > 20) {
      await era.printAndWait(`「射了……好多………」`); // :4614
    }
  }

  return 0;
}

/**
 * @BENKI_KOUJO_K4（:4620-4755）：肉便器口上（BENKI 分派，TARGET = A）。
 * FLAG:62 行动 0-5 × FLAG:63 常识改写/素质分档。
 */
async function benki_koujo_k4(rand) {
  const a = era_flag.target; // A（原作 @BENKI_KOUJO 前置 TARGET = A）
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));

  if (era0('flag:62') == 0) {
    if (era0('flag:63') == 1) {
      await era.printAndWait(
        `「唔嗯、了解了。作为肉便器来服务他们就可以了是吧？」`,
      ); // :4645
      await era.printAndWait(`「没问题。毕竟『常识改变成毫不怕脏』了嘛」`); // :4646
      await era.printAndWait(
        `「来吧、把你们这群家伙的肉棒都掏出来。会把你们榨个干净的」`,
      ); // :4647
    } else if (era0(`talent:${a}:76`) == 1) {
      if (rand_n(2) == 0) {
        await era.print(`「呵……你们这群家伙应该感到荣幸。人称冷澈勇者的我」`); // :4651
        await era.printAndWait(`「作为肉便器来服务你们了呢」`); // :4652
        await era.printAndWait(`「怎么啦？　不这么更直接点就硬不起来了吗？」`); // :4653
        await era.printAndWait(`「呵呵、真乖……嗯、这不是挺大的嘛……♪」`); // :4654
      } else {
        await era.printAndWait(
          `「嘻嘻…肮脏的鸡鸡…！　让我来把它弄的漂漂亮亮吧…！」`,
        ); // :4656
      }
    } else if (era0(`talent:${a}:85`)) {
      await era.printAndWait(`「这也是……为了那个人………」`); // :4660
    } else if (era0(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「请让我…好好地侍奉吧…」`); // :4663
    } else {
      await era.printAndWait(`「讨厌…这种肮脏的家伙………」`); // :4666
    }
  } else if (era0('flag:62') == 1) {
    if (era0(`talent:${a}:76`) == 1) {
      await era.printAndWait(
        `「我是个男女均可的变态…！　再弄我！再弄我吧！…」`,
      ); // :4672
    } else if (era0(`talent:${a}:85`)) {
      await era.printAndWait(`「女人的气味……好舒心……」`); // :4675
    } else if (era0(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「好的……现在就来舔小穴………」`); // :4678
    } else {
      await era.printAndWait(`「女人什么的………」`); // :4681
    }
  } else if (era0('flag:62') == 2) {
    if (era0('flag:63') == 1) {
      await era.printAndWait(
        `「呵呵、兽奸吗……还以为是『更过分的催眠』呢、真是扫兴」`,
      ); // :4687
      await era.printAndWait(
        `「已经『催眠得会对野兽发情』什么的、这么做也是理所应当的吧？　呵呵、好期待啊」`,
      ); // :4688
      await era.printAndWait(
        `「让狗兴奋起来吧。准备要像兽爱变态女一样痴喘咯」`,
      ); // :4689
    } else if (era0(`talent:${a}:76`) == 1) {
      await era.printAndWait(`「看着我吧！我是个喜欢和动物做爱的变态！～♪」`); // :4692
    } else if (era0(`talent:${a}:85`)) {
      await era.printAndWait(`「唔唔～动物的臭味～♪」`); // :4695
    } else if (era0(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「好……好的……现在去抱动物………」`); // :4698
    } else {
      await era.printAndWait(`「再……再来………」`); // :4701
    }
  } else if (era0('flag:62') == 3) {
    if (era0('flag:63') == 1) {
      await era.printAndWait(
        `「明白了。把菊穴和肉穴都掰开来做『肉便器服务』就好了是吧？」`,
      ); // :4707
      await era.printAndWait(
        `「我也是见过风浪的人。这种程度的『肉便器服务』怎么可能会犹豫呢」`,
      ); // :4708
      await era.printAndWait(
        `「来吧、小子们！　肉棒硬了的家伙就放马过来吧！」`,
      ); // :4709
    } else if (era0(`talent:${a}:76`) == 1) {
      await era.printAndWait(`「不管前面也好，后面也好……请把我塞满吧！～♪」`); // :4712
    } else if (era0(`talent:${a}:85`)) {
      await era.printAndWait(`「那里……和屁股………都……哦～啊啊啊啊！～♪」`); // :4715
    } else if (era0(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「请，请用光我所有的穴吧………」`); // :4718
    } else {
      await era.printAndWait(`「双管齐下什么的………！」`); // :4721
    }
  } else if (era0('flag:62') == 4) {
    if (era0(`talent:${a}:76`) == 1) {
      await era.printAndWait(`「我的小穴，舒服么？随你喜欢来用哦～…♪」`); // :4727
    } else if (era0(`talent:${a}:85`)) {
      await era.printAndWait(`「把安全套拿走吧！」`); // :4730
    } else if (era0(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「请……随意使用我的小穴……」`); // :4733
    } else {
      await era.printAndWait(`「那里………啊！」`); // :4736
    }
  } else if (era0('flag:62') == 5) {
    if (era0(`talent:${a}:76`) == 1) {
      await era.printAndWait(
        `「啊～我是菊穴也很有感觉的尻穴奴隶！…～♪　再来！…啊啊～！啊～」`,
      ); // :4742
    } else if (era0(`talent:${a}:85`)) {
      await era.printAndWait(`「屁股…好厉害…啊！！噢～～」`); // :4745
    } else if (era0(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「屁，屁股………♪」`); // :4748
    } else {
      await era.printAndWait(`「啊～！……那里是………」`); // :4751
    }
  }

  return 0;
}

/**
 * @DUNGEON_VICTORY_K4（:4758-4810）：战斗胜利口上（VICTORY_KOUJO 分派，TARGET = A）。
 * 决め台词 + 性格分档 + 残血判定（BASE:A:0/1 对 MAXBASE < 50%）。
 */
async function dungeon_victory_k4(rand) {
  const target = era_flag.target;
  const a = era_flag.target; // A（原作 @VICTORY_KOUJO 前置 TARGET = A）
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));

  await era.printAndWait(`「哼…这些杂鱼～」`); // :4763

  if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
    await era.printAndWait(`「……」`); // :4768

    return 0;
  } else if (
    era0(`talent:${target}:11`) == 1 ||
    era0(`talent:${target}:12`) == 1 ||
    era0(`talent:${target}:15`) == 1 ||
    era0(`talent:${target}:30`) == 1 ||
    era0(`talent:${target}:34`) == 1
  ) {
    if (rand_n(3) == 0) {
      await era.printAndWait(`「别做无谓的抵抗啦…」`); // :4775
    } else if (rand_n(2) == 0) {
      await era.printAndWait(`「就这水平…」`); // :4777
    } else {
      await era.printAndWait(`「真难看啊…」`); // :4779
    }
  } else if (
    era0(`talent:${target}:10`) == 1 ||
    era0(`talent:${target}:26`) == 1
  ) {
    await era.printAndWait(`「呼……真惊险…哈哈！」`); // :4785

    return 0;
  } else {
    if (rand_n(3) == 0) {
      await era.printAndWait(`「好！赢了！」`); // :4792
    } else if (rand_n(2) == 0) {
      await era.printAndWait(`「我赢啦！」`); // :4794
    } else {
      await era.printAndWait(`「嗯……」`); // :4796
    }
  }

  if (
    (era0(`base:${a}:0`) * 100) / era0(`maxbase:${a}:0`) < 50 ||
    (era0(`base:${a}:1`) * 100) / era0(`maxbase:${a}:1`) < 50
  ) {
    await era.printAndWait(`「呜…太轻敌了吗………」`); // :4803
  } else {
    await era.printAndWait(`「给魔王带话，让他带更厉害的家伙来见我！」`); // :4806
  }

  return 0;
}

/**
 * @DUNGEON_ATTACK_K4（:4813-4898）：战斗攻击口上（ATTACK_KOUJO 分派，TARGET = A）。
 * CFLAG:1 == 2（侵攻中）与其余（迎击中）各按性格分档。
 */
async function dungeon_attack_k4(rand) {
  const target = era_flag.target;
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));

  if (era0(`cflag:${target}:1`) == 2) {
    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      await era.printAndWait(`「……」`); // :4823

      return 0;
    } else if (
      era0(`talent:${target}:11`) == 1 ||
      era0(`talent:${target}:12`) == 1 ||
      era0(`talent:${target}:15`) == 1 ||
      era0(`talent:${target}:30`) == 1 ||
      era0(`talent:${target}:34`) == 1
    ) {
      if (rand_n(3) == 0) {
        await era.printAndWait(`「渣滓！！　消失吧！」`); // :4830
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「踢飞你们！」`); // :4832
      } else {
        await era.printAndWait(`「你们的末日到啦！」`); // :4834
      }
    } else if (
      era0(`talent:${target}:10`) == 1 ||
      era0(`talent:${target}:26`) == 1
    ) {
      await era.printAndWait(`「呜……要一直战斗下去么……？」`); // :4840

      return 0;
    } else {
      if (rand_n(3) == 0) {
        await era.printAndWait(`「让我来教你们什么是战斗。」`); // :4847
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「哼……就这程度」`); // :4849
      } else {
        await era.printAndWait(`「你这家伙……死了么？」`); // :4851
      }
    }
  } else {
    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      await era.printAndWait(`「……」`); // :4860

      return 0;
    } else if (
      era0(`talent:${target}:11`) == 1 ||
      era0(`talent:${target}:12`) == 1 ||
      era0(`talent:${target}:15`) == 1 ||
      era0(`talent:${target}:30`) == 1 ||
      era0(`talent:${target}:34`) == 1
    ) {
      if (rand_n(3) == 0) {
        await era.printAndWait(`「嘻嘻……这甘甜的力量，你也来品尝一下嘛～」`); // :4867
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「哇哈哈～新的力量……太厉害了……」`); // :4869
      } else {
        await era.printAndWait(
          `「教你愉悦的事……在地下室里……有许多好玩的～！」`,
        ); // :4871
      }
    } else if (
      era0(`talent:${target}:10`) == 1 ||
      era0(`talent:${target}:26`) == 1
    ) {
      await era.printAndWait(`「再……再给我力量……！」`); // :4877

      return 0;
    } else {
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「从魔王大人处获得的力量……就让你见识一下吧！」`,
        ); // :4884
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「过来这边吧……你也就明白了……」`); // :4886
      } else {
        await era.printAndWait(`「呵呵～可爱的家伙，不过你什么都不知道啊！」`); // :4888
      }
    }
  }

  return 0;
}

/**
 * @COLOSSEUM_KOJO_4（:4905-5035）：死斗场专用口上（头部守卫 TEQUIP:55 岔入）。
 * SELECTCOM 55/56/31/5/21/27/51 各支（助手调教/巨魔 TFLAG:400 == 206 分档）。
 */
async function colosseum_kojo_4() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const assi_name = chara_callname(era_flag.assi); // %SAVESTR:ASSI%
  const master_name = chara_name(0); // %NAME:MASTER%
  const assi = era_flag.assi;

  if (era_flag.selectcom == 55) {
    if (era0(`base:${target}:1`) <= 0) {
      await era.printAndWait(`${target_name}连站都站不稳了……`); // :4912
    } else {
      await era.printAndWait(
        `${target_name}在死斗场的热情及对方凌厉的眼神中哆嗦着。`,
      ); // :4914
    }
    return 0;
  }

  if (era_flag.selectcom == 56) {
    if (era0(`base:${target}:1`) <= 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「才…才不会输给${assi_name}呢！……」`); // :4926
        await era.printAndWait(`筋疲力尽的${target_name}屁股向后跌坐在地上……`); // :4927
      } else {
        await era.printAndWait(
          `「啊…啊…不……不要…才不要被这种怪物侵犯！…不要！不要！……」`,
        ); // :4929
        await era.printAndWait(
          `筋疲力尽的${target_name}连滚带爬地企图逃离死斗场。`,
        ); // :4930
      }
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「难……难道……要和${assi_name}做对手么……」`); // :4935
        await era.printAndWait(
          `${target_name}皱着眉头，看着在${master_name}命令之下武装起来的${assi_name}……`,
        ); // :4936
      } else {
        await era.printAndWait(`「呕……这……这么恶心的怪物……………」`); // :4938
        await era.printAndWait(
          `${target_name}看着对面丑陋的怪物，表情都扭曲了。`,
        ); // :4939
      }
    }
    return 0;
  }

  if (era_flag.selectcom == 31) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(`「啊…唔……唔唔………就……就在这里吗？…咳……！」`); // :4951
      await era.print(`${assi_name}把`); // :4952
      if (era0(`talent:${assi}:121`) == 1 || era0(`talent:${assi}:122`) == 1) {
        await era.print(`阴茎`); // :4954
      }
      if (
        era0(`talent:${assi}:121`) != 1 &&
        era0(`talent:${assi}:122`) != 1 &&
        era0('item:PBAND') == 1
      ) {
        await era.print(`假阳具`); // :4956
      }
      await era.printAndWait(
        `粗暴地塞入${target_name}的嘴里，露出了心满意足的神情……`,
      ); // :4957
    } else {
      await era.printAndWait(
        `「啊………会……会好好地舔的啦…………所以……所以……不要再做其它过分的事啦……呃……唔…………唔唔…………咳……」`,
      ); // :4959
      await era.printAndWait(`${target_name}舔啜着带着令人作呕的气味的阴茎……`); // :4960
    }
    return 0;
  }

  if (era_flag.selectcom == 5) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(`「啊…${assi_name}啊…停……手…快停手啦………」`); // :4970
      await era.printAndWait(
        `${target_name}无力反抗……任由${assi_name}肆意地玩弄着她的胸部……`,
      ); // :4971
    } else {
      await era.printAndWait(`「呜………为……为什么……我要遇上这种事啊………呜呜！」`); // :4973
      await era.printAndWait(
        `${target_name}的胸部被粗鲁地揉捏着，发出了痛苦的呻吟……`,
      ); // :4974
    }
    return 0;
  }

  if (era_flag.selectcom == 21) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(`「啊…！唔……啊啊啊！…好深………弄的好深啦……！」`); // :4984
      await era.print(`${assi_name}听到悲鸣，更加兴奋了，继续用`); // :4985
      if (era0(`talent:${assi}:121`) == 1 || era0(`talent:${assi}:122`) == 1) {
        await era.print(`阴茎`); // :4987
      }
      if (
        era0(`talent:${assi}:121`) != 1 &&
        era0(`talent:${assi}:122`) != 1 &&
        era0('item:PBAND') == 1
      ) {
        await era.print(`假阳具`); // :4989
      }
      await era.printAndWait(`毫不留情地蹂躏着${target_name}的私处……`); // :4990
    } else if (era0('tflag:400') == 206) {
      await era.printAndWait(`「死………死………要…死掉了……」`); // :4993
      await era.printAndWait(
        `可怜的${target_name}断断续续地发出崩溃的声音，承受着巨魔的糟蹋。`,
      ); // :4994
    } else {
      await era.printAndWait(`「被……被这样的家伙……呜……唔……哎呀！！」`); // :4996
      await era.printAndWait(`${target_name}被怪物尽情侵犯着……`); // :4997
    }
    return 0;
  }

  if (era_flag.selectcom == 27) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(`「呜！啊啊啊啊！屁股……屁股…要被弄坏啦！！」」`); // :5008
      await era.print(`${assi_name}听到悲鸣，更加兴奋了，继续用`); // :5009
      if (era0(`talent:${assi}:121`) == 1 || era0(`talent:${assi}:122`) == 1) {
        await era.print(`阴茎`); // :5011
      }
      if (
        era0(`talent:${assi}:121`) != 1 &&
        era0(`talent:${assi}:122`) != 1 &&
        era0('item:PBAND') == 1
      ) {
        await era.print(`假阳具`); // :5013
      }
      await era.printAndWait(`毫不留情地蹂躏着${target_name}的肛门……`); // :5014
    } else if (era0('tflag:400') == 206) {
      await era.printAndWait(`「死………死………要…死掉了……」`); // :5017
      await era.printAndWait(
        `可怜的${target_name}断断续续地发出崩溃的声音，承受着巨魔的糟蹋。`,
      ); // :5018
    } else {
      await era.printAndWait(
        `「被……被这样的家伙……呜……唔……哎呀！！屁股……屁股……要被弄坏啦！」`,
      ); // :5020
      await era.printAndWait(`${target_name}被怪物尽情地侵犯着肛门……`); // :5021
    }
    return 0;
  }

  if (era_flag.selectcom == 51) {
    await era.printAndWait(`「这……这种药………我………我………呃！！……噢噢哦噢～！」`); // :5030
    return 0;
  }

  return 0;
}

/**
 * @NTR_KOUJO_K4（:5038-5115）：NTR 口上（NTR.ERB 分派，P 由调用方传入）。
 * P == 1-7/20 各支（处女丧失/处女肛交/兽奸秀/V 交/VA 乱交/公厕/狂王处理/
 * NTR 公开出产）。P 是原作的全局单字母变量（#5 决议：显式形参）。
 */
async function ntr_koujo_k4(p) {
  const target = era_flag.target;

  if (era0(`cflag:${target}:650`) == 0) {
    // CFLAG:650  = 1（变量语义：CFLAG 族，650）
    era.set(`cflag:${target}:650`, 1);
  }

  if (p == 1) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait(`「停…停手…啊………我……我…是你的了………呜……！」`); // :5048
    } else {
      await era.printAndWait(`「呜………啊…………我……被你征服啦………………呜……！」`); // :5050
    }
    // CFLAG:651  = 1（变量语义：CFLAG 族，651）
    era.set(`cflag:${target}:651`, 1);
  } else if (p == 2) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait(
        `「啊啊…啊…啊啊！…不……不要再来了………我的…屁股………唔……哦哦哦哦！」`,
      ); // :5056
    } else {
      await era.printAndWait(
        `「啊！……你这变态…不要再来了…………唔………哦哦哦哦！」`,
      ); // :5058
    }
    // CFLAG:652  = 1（变量语义：CFLAG 族，652）
    era.set(`cflag:${target}:652`, 1);
  } else if (p == 3) {
    if (era0(`talent:${target}:136`)) {
      await era.printAndWait(
        `「唔哦…～啊啊！ 要坏掉了……要被狗大人玩坏掉啦！～${heart(1)}」`,
      ); // :5064
    } else if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait(
        `「啊…啊………讨厌………被看着……被看着啦………呜呜…唔！…噢…啊啊啊啊！」`,
      ); // :5066
    } else {
      await era.printAndWait(`「可恶…这么做的话…以后给我记住！…呜…唔…啊啊！」`); // :5068
    }
    // CFLAG:653  = 1（变量语义：CFLAG 族，653）
    era.set(`cflag:${target}:653`, 1);
  } else if (p == 4) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait(
        `「唔～…啊啊！…我…我……我是狂王大人…的…东西…再来…再来…再操我吧！${heart(1)}」`,
      ); // :5074
    } else {
      await era.printAndWait(
        `「唔～…哦！啊啊…噢！啊……！ 好、好深啊………要去了…要……去……了！！！～♪」`,
      ); // :5076
    }
    // CFLAG:654  = 1（变量语义：CFLAG 族，654）
    era.set(`cflag:${target}:654`, 1);
  } else if (p == 5) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait(
        `「看啊…我的小穴也好，尻穴也好，都塞进了你们的小鸡鸡哦～${heart(1)} 嘻嘻～啊！同时被插入太舒服啦！${heart(1)}」`,
      ); // :5082
    } else {
      await era.printAndWait(`「呵呵…再…再侵犯我………把我弄得乱七八糟吧！………♪」`); // :5084
    }
    // CFLAG:655  = 1（变量语义：CFLAG 族，655）
    era.set(`cflag:${target}:655`, 1);
  } else if (p == 6) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait(
        `「啊…再来…再狠狠地弄我…噢…已经……回不去那人的身边了………操我！…弄我！…把我操坏吧！～${heart(1)}」`,
      ); // :5090
    } else {
      await era.printAndWait(
        `「啊…啊……输掉了话………就失去一切啊………噢！……对不起……会……会用心侍奉的………啊！唔唔！」`,
      ); // :5092
    }
    // CFLAG:656  = 1（变量语义：CFLAG 族，656）
    era.set(`cflag:${target}:656`, 1);
  } else if (p == 7) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait(`「狂王大人…啊啊…好舒服……请……请继续…使用我吧…」`); // :5098
    } else {
      await era.printAndWait(`「啊啊…会……会继续…侍奉您的………」`); // :5100
    }
    // CFLAG:657  = 1（变量语义：CFLAG 族，657）
    era.set(`cflag:${target}:657`, 1);
  } else if (p == 20) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      if (era0(`cflag:${target}:102`) == 1) {
        await era.printAndWait(
          `「还……还给我！…那……那是……我和魔王大人的孩子啊！…」`,
        ); // :5107
      } else {
        await era.printAndWait(
          `「是……是啊……我的子宫，是属于狂王大人的东西～…${heart(1)}」`,
        ); // :5109
      }
    } else {
      await era.printAndWait(`「啊…好想～继续怀上啊～♪」`); // :5112
    }
  }
  return 0;
}

/**
 * @EXUCUTION_KOUJO_K4（:5119-5133）：处刑口上（TFLAG:16 分派；7 记忆消除
 * 分支为空 = 模板未填写，1:1 保留）。
 */
async function exucution_koujo_k4() {
  if (era0('tflag:16') == 4) {
    await era.printAndWait(`「放，放开我！我…侍奉怪物什么的………呜…呜哇哇！！」`); // :5123
  } else if (era0('tflag:16') == 5) {
    await era.printAndWait(
      `「讨厌…讨厌！我变得不像我自己了…不要！……不、要、啊…啊………」`,
    ); // :5126
  } else if (era0('tflag:16') == 6) {
    await era.printAndWait(`「混蛋！给我记住！！………」`); // :5129
  } else if (era0('tflag:16') == 7) {
    await era.printAndWait(''); // :5132
  }
}

/**
 * @MUSEUM_KOUJO_K4（:5136-5168）：博物馆口上（TFLAG:500 分派；多数分支
 * 为空 = 模板未填写，1:1 保留；3/4 有台词）。
 */
async function museum_koujo_k4() {
  if (era0('tflag:500') == 0) {
    await era.printAndWait(''); // :5140
  } else if (era0('tflag:500') == 1) {
    await era.printAndWait(''); // :5143
  } else if (era0('tflag:500') == 2) {
    await era.printAndWait(''); // :5146
  } else if (era0('tflag:500') == 3) {
    await era.printAndWait(`「短时间内、维持这个姿势还可以做到…这样吗？」`); // :5149
  } else if (era0('tflag:500') == 4) {
    await era.printAndWait(`「怎、怎么了…？身体…动、动不…了、呃…」`); // :5152
  } else if (era0('tflag:500') == 5) {
    await era.printAndWait(''); // :5155
  } else if (era0('tflag:500') == 6) {
    await era.printAndWait(''); // :5158
  } else if (era0('tflag:500') == 7) {
    await era.printAndWait(''); // :5161
  } else if (era0('tflag:500') == 8) {
    await era.printAndWait(''); // :5164
  } else if (era0('tflag:500') == 9) {
    await era.printAndWait(''); // :5167
  }
}

/**
 * @BANISHMENT_KOUJO_K4（:5171-5189）：追放口上（TFLAG:510 分派；0 追放有
 * 台词，其余空 = 模板未填写，1:1 保留）。
 */
async function banishment_koujo_k4() {
  if (era0('tflag:510') == 0) {
    await era.printAndWait(`「我的…力量…被那样地………骗人…吧…………」`); // :5176
  } else if (era0('tflag:510') == 1) {
    await era.printAndWait(''); // :5179
  } else if (era0('tflag:510') == 2) {
    await era.printAndWait(''); // :5182
  } else if (era0('tflag:510') == 3) {
    await era.printAndWait(''); // :5185
  } else if (era0('tflag:510') == 4) {
    await era.printAndWait(''); // :5188
  }
}

/**
 * @PUBLIC_EXUCUTION_KOUJO_K4（:5192-5204）：公开处刑口上（TFLAG:520 分派；
 * 2 魂粉碎空 = 模板未填写，1:1 保留）。
 */
async function public_exucution_koujo_k4() {
  if (era0('tflag:520') == 0) {
    await era.printAndWait(`「到死为止都要被侵犯？呃……有趣…来试试呗！！」`); // :5197
  } else if (era0('tflag:520') == 1) {
    await era.printAndWait(
      `「这种…罪犯似的结局…我绝不认可！…放开我！…放开我！！」`,
    ); // :5200
  } else if (era0('tflag:520') == 2) {
    await era.printAndWait(''); // :5203
  }
}

/**
 * @GROTESQUE_KOUJO_K4（:5207-5231）：猎奇处刑口上（TFLAG:530 分派；全部分支
 * 为空 = 模板未填写，1:1 保留）。
 */
async function grotesque_koujo_k4() {
  if (era0('tflag:530') == 0) {
    await era.printAndWait(''); // :5212
  } else if (era0('tflag:530') == 1) {
    await era.printAndWait(''); // :5215
  } else if (era0('tflag:530') == 2) {
    await era.printAndWait(''); // :5218
  } else if (era0('tflag:530') == 3) {
    await era.printAndWait(''); // :5221
  } else if (era0('tflag:530') == 4) {
    await era.printAndWait(''); // :5224
  } else if (era0('tflag:530') == 5) {
    await era.printAndWait(''); // :5227
  } else if (era0('tflag:530') == 6) {
    await era.printAndWait(''); // :5230
  }
}

/**
 * @ENTERENEMY_KOUJO_K4（:5234-5249）：迷宫攻略开始口上（ENTERENEMY 分派，
 * TARGET = A）。按性格分档。
 */
async function enterenemy_koujo_k4() {
  const a = era_flag.target; // A（原作 @ENTERENEMY_KOUJO 前置 TARGET = A）

  if (era0(`talent:${a}:21`) == 1 || era0(`talent:${a}:22`) == 1) {
    await era.printAndWait(`「………呃……魔王……吗………」`); // :5239
  } else if (
    era0(`talent:${a}:11`) == 1 ||
    era0(`talent:${a}:12`) == 1 ||
    era0(`talent:${a}:15`) == 1 ||
    era0(`talent:${a}:30`) == 1 ||
    era0(`talent:${a}:34`) == 1
  ) {
    await era.printAndWait(`「就让我来干掉魔王吧！」`); // :5242
  } else if (era0(`talent:${a}:10`) == 1 || era0(`talent:${a}:26`) == 1) {
    await era.printAndWait(`「我，应该能干掉魔王吧………？」`); // :5245
  } else {
    await era.printAndWait(`「遇到魔王的话，就干掉他！！」`); // :5248
  }
}

/**
 * @GOHOUBI_REQUEST_KOUJO_K4（:5251-5286）：迎击时的奖赏要求口上（TARGET = A）。
 * CFLAG:504 0-9 分档。**原作缺陷（#14）：:5262/:5264 的 ELSEIF Y == 2/3
 * 的 Y 从未赋值（恒 0），猪/马两臂是死码——登记不修，1:1 保留**。
 */
async function gohoubi_request_koujo_k4() {
  const a = era_flag.target; // A（原作 @GOHOUBI_REQUEST_KOUJO 前置 TARGET = A）
  const Y = 0; // 原作缺陷（#14）：Y 未赋值恒 0，猪/马两臂死码——登记不修，1:1 保留

  if (era0(`cflag:${a}:504`) == 0) {
    await era.printAndWait(`「钱钱钱！嘻嘻嘻～」`); // :5256
  } else if (
    era0(`cflag:${a}:504`) == 1 ||
    era0(`cflag:${a}:504`) == 2 ||
    era0(`cflag:${a}:504`) == 3
  ) {
    await era.print(`「拜托了…让我和`); // :5259
    if (era0(`cflag:${a}:504`) == 1) {
      await era.print(`狗`); // :5261
    } else if (Y == 2) {
      await era.print(`猪`); // :5263
    } else if (Y == 3) {
      await era.print(`马`); // :5265
    }
    await era.printAndWait(`交配吧……！」`); // :5267
  } else if (era0(`cflag:${a}:504`) == 4) {
    await era.printAndWait(`「嘻嘻！…魔王大人要和我来个很长很长的湿吻哦～」`); // :5270
  } else if (era0(`cflag:${a}:504`) == 5) {
    await era.printAndWait(`「…人家回来的时候，想被魔王大人温情地抱一阵子。」`); // :5273
  } else if (era0(`cflag:${a}:504`) == 6) {
    await era.printAndWait(`「嘻嘻！魔王大人先把精液存着！等我回来拿～」`); // :5276
  } else if (era0(`cflag:${a}:504`) == 7) {
    await era.printAndWait(`「想进行一场了不得的乱交呢！…都是你害得啦！…」`); // :5279
  } else if (era0(`cflag:${a}:504`) == 8) {
    await era.printAndWait(`「回来之后…想喝魔王大人的尿………可以么？」`); // :5282
  } else if (era0(`cflag:${a}:504`) == 9) {
    await era.printAndWait(`「嘻嘻！想收一个童贞啊！」`); // :5285
  }
}

/**
 * @GOHOUBI_AFTER_KOUJO_K4（:5288-5364）：迎击成功后的奖赏口上（TARGET = A）。
 * TFLAG:18 0/1/2 分档；2 内再按 CFLAG:504 0-9 分档（5/9 的膣/肛由
 * ABL:2 vs ABL:3 判定，1:1 保留两臂同文）。
 */
async function gohoubi_after_koujo_k4() {
  const a = era_flag.target; // A（原作 @GOHOUBI_AFTER_KOUJO 前置 TARGET = A）

  if (era0('tflag:18') == 0) {
    await era.printAndWait(`「是这样啊……我明白了」`); // :5295
  } else if (era0('tflag:18') == 1) {
    await era.printAndWait(`「呵呵呵～谢谢谢谢～！」`); // :5298
  } else if (era0('tflag:18') == 2) {
    if (era0(`cflag:${a}:504`) == 0) {
      await era.printAndWait(`「钱，是人类最好的朋友～」`); // :5302
    } else if (era0(`cflag:${a}:504`) == 1) {
      if (era0(`talent:${a}:0`) == 1) {
        await era.printAndWait(
          `「啊！～哦～！…用肛门和狗交配……停不下来～停不下来啦！！」`,
        ); // :5307
      } else {
        await era.printAndWait(
          `「啊！～哦～！…和狗交配什么的……停不下来～停不下来啦！！」`,
        ); // :5309
      }
    } else if (era0(`cflag:${a}:504`) == 2) {
      if (era0(`talent:${a}:0`) == 1) {
        await era.printAndWait(
          `「啊！～哦～！…用肛门和猪交配……停不下来～停不下来啦！！」`,
        ); // :5315
      } else {
        await era.printAndWait(
          `「啊！～哦～！…和猪交配什么的……停不下来～停不下来啦！！」`,
        ); // :5317
      }
    } else if (era0(`cflag:${a}:504`) == 3) {
      if (era0(`talent:${a}:0`) == 1) {
        await era.printAndWait(
          `「啊！～哦～！…用肛门和马交配……停不下来～停不下来啦！！」`,
        ); // :5323
      } else {
        await era.printAndWait(
          `「啊！～哦～！…和马交配什么的……停不下来～停不下来啦！！」`,
        ); // :5325
      }
    } else if (era0(`cflag:${a}:504`) == 4) {
      await era.printAndWait(
        `「嘻嘻～和魔王大人接吻的时候，回想起了自己少女的时光呢～…啊！失言了。请忘掉吧～」`,
      ); // :5329
    } else if (era0(`cflag:${a}:504`) == 5) {
      if (era0(`abl:${a}:2`) > era0(`abl:${a}:3`)) {
        await era.printAndWait(
          `「啊！魔王大人……请～请继续侵犯我吧！～噢哦～…♪」`,
        ); // :5334
      } else {
        await era.printAndWait(
          `「啊！魔王大人……请～请继续侵犯我吧！～噢哦～…♪」`,
        ); // :5337
      }
    } else if (era0(`cflag:${a}:504`) == 6) {
      await era.printAndWait(
        `「嘻嘻～为了喝魔王大人的精液，我活着回来啦！～♪」`,
      ); // :5341
    } else if (era0(`cflag:${a}:504`) == 7) {
      if (era0(`talent:${a}:0`) == 1) {
        await era.printAndWait(`「啊…第一次就这么结束了么…还想继续啊～♪」`); // :5346
      } else {
        await era.printAndWait(`「啊…结束了么…还想继续啊～♪」`); // :5348
      }
    } else if (era0(`cflag:${a}:504`) == 8) {
      await era.printAndWait(
        `「嘻嘻～为了喝魔王大人的尿尿，我活着回来啦！～♪」`,
      ); // :5352
    } else if (era0(`cflag:${a}:504`) == 9) {
      if (era0(`abl:${a}:2`) > era0(`abl:${a}:3`)) {
        await era.printAndWait(
          `「呵呵呵，童贞的感觉就是不一样呢～我的那里，舒服么？${heart(1)}」`,
        ); // :5357
      } else {
        await era.printAndWait(
          `「呵呵呵，童贞的感觉就是不一样呢～我的菊穴，舒服么？${heart(1)}」`,
        ); // :5360
      }
    } else {
      // 原作空 else 臂（:5363-5365 ELSE → ENDIF），1:1 保留
    }
  }
}

/**
 * @OSIOKI_KOUJO_K4（:5366-5426）：迎击失败后的惩罚口上（TARGET = A）。
 * TFLAG:18 0-9 分档（受虐/露出/淫乱等素质分档）。
 */
async function osioski_koujo_k4() {
  const a = era_flag.target; // A（原作 @OSIOKI_KOUJO 前置 TARGET = A）

  if (era0('tflag:18') == 0) {
    await era.printAndWait(`「魔王大人真宽容……下次不会再失败的了！」`); // :5373
  } else if (era0('tflag:18') == 1) {
    if (era0(`abl:${a}:21`) >= 3) {
      await era.printAndWait(`「哦…好！…好啊～♪」`); // :5378
    } else {
      await era.printAndWait(`「啊！…讨厌电流！！讨厌！讨厌！」`); // :5380
    }
  } else if (era0('tflag:18') == 2) {
    if (era0(`abl:${a}:17`) >= 4) {
      await era.printAndWait(`「快……快看我淫贱自慰的样子～♪」`); // :5386
    } else {
      await era.printAndWait(`「好……好羞耻啊……………」`); // :5388
    }
  } else if (era0('tflag:18') == 3) {
    if (era0(`abl:${a}:17`) >= 6) {
      await era.printAndWait(`「来！来看吧！……看我不知廉耻，拉屎的样子……！」`); // :5394
    } else {
      await era.printAndWait(`「呜呜…唔………呜呜呜」`); // :5396
    }
  } else if (era0('tflag:18') == 4) {
    if (era0(`abl:${a}:21`) >= 3) {
      await era.printAndWait(
        `「啊！！魔王大人的鞭子！！最棒了！再……再用力地打我！」`,
      ); // :5402
    } else {
      await era.printAndWait(`「呜！……啊？！…………唔哦！！」`); // :5404
    }
  } else if (era0('tflag:18') == 5) {
    if (era0(`talent:${a}:88`) == 1 || era0(`talent:${a}:76`) == 1) {
      await era.printAndWait(`「果然还是魔王大人的尿味道更好啊………」`); // :5410
    } else {
      await era.printAndWait(`「这……这不是我的爱好………」`); // :5412
    }
  } else if (era0('tflag:18') == 6) {
    await era.printAndWait(`「唉……不想做这种事啊……」`); // :5416
  } else if (era0('tflag:18') == 7) {
    await era.printAndWait(`「呜…肚子饿了………」`); // :5419
  } else if (era0('tflag:18') == 8) {
    await era.printAndWait(
      `「噢～喔喔喔喔喔！求求你！魔王大人！快来侵犯人家啊！！呜呜呜呜………………谁都好！什么东西都行！！来侵犯我！！强奸我吧！……啊啊啊啊！！！」`,
    ); // :5422
  } else if (era0('tflag:18') == 9) {
    await era.printAndWait(`「………好」`); // :5425
  }
}

/**
 * @GOBI_KOUJO_K4（:5429-5457，ARG:0）：语尾口上。ARG:0 1-5 各支、0 随机
 * 三选一（RAND:3 → RAND:2）。
 *
 * @param {number} arg_0 原作 ARG:0
 * @param {(n: number) => number} [rand] RAND:N 随机源
 */
async function gobi_koujo_k4(arg_0, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));

  if (arg_0 == 1) {
    await era.print(`哦～♪`); // :5434
  } else if (arg_0 == 2) {
    await era.print(`哦！`); // :5437
  } else if (arg_0 == 3) {
    await era.print(`啦……。`); // :5440
  } else if (arg_0 == 4) {
    await era.print(`吧……算是……。`); // :5443
  } else if (arg_0 == 5) {
    await era.print(`什么的……。`); // :5446
  } else {
    if (rand_n(3) == 0) {
      await era.print(`呢。`); // :5451
    } else if (rand_n(2) == 0) {
      await era.print(`嘛。`); // :5453
    } else {
      await era.print(`啦。`); // :5455
    }
  }
}

module.exports = {
  STUBBED_CALLS,
  kojo_message_com_4,
  dog_kojo_4,
  kojo_message_palamcng_4,
  kojo_message_markcng_4,
  self_kojo_k4,
  dungeon_ryouzyoku_k4,
  dungeon_ryouzyoku_after_k4,
  benki_koujo_k4,
  dungeon_victory_k4,
  dungeon_attack_k4,
  colosseum_kojo_4,
  ntr_koujo_k4,
  exucution_koujo_k4,
  museum_koujo_k4,
  banishment_koujo_k4,
  public_exucution_koujo_k4,
  grotesque_koujo_k4,
  enterenemy_koujo_k4,
  gohoubi_request_koujo_k4,
  gohoubi_after_koujo_k4,
  osioski_koujo_k4,
  gobi_koujo_k4,
};
