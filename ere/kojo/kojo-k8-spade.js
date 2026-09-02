/* eslint-disable no-irregular-whitespace */
/**
 * @file 银黑桃性格口上 K8：指令口上全量 + 非调教口上（issue #239 全量复核）。
 *
 * 源: target/ERB/口上/EVENT_K8_スペード.ERB  @EVENTTRAIN #PRI（:61-65，存在
 *     标志 FLAG:108）@EVENTEND #LATER（:67-69，清标志）
 *     @EVENTTRAIN（:75-606，调教开始口上 CFLAG:201 状态机）@K8_KOJO2
 *     （:607-808，二回目以降 + 淫乱/爱慕的服装与魔族分档）@EVENTEND
 *     （:813-886，调教结束口上）@KOJO_MESSAGE_COM_8（:891-5442，七道头部
 *     守卫 + SELECTCOM 各分支）@DOG_KOJO_8（:5446-6245，兽奸专用口上）
 *     @KOJO_MESSAGE_PALAMCNG_8（:6250-6563）@KOJO_MESSAGE_MARKCNG_8
 *     （:6568-6648）@SELF_KOJO_K8（:6649-7072）@DUNGEON_RYOUZYOKU_K8
 *     （:7073-7092）@DUNGEON_RYOUZYOKU_AFTER_K8（:7093-7145）
 *     @DUNGEON_VICTORY_K8（:7146-7170）@DUNGEON_ATTACK_K8（:7171-7198）
 *     @BENKI_KOUJO_K8（:7199-7300）@COLOSSEUM_KOJO_8（:7304-7446，头部
 *     守卫 TEQUIP:55 岔入）@NTR_KOUJO_K8（:7447-7605）@EXUCUTION_KOUJO_K8
 *     （:7606-7622）@MUSEUM_KOUJO_K8（:7623-7657）@BANISHMENT_KOUJO_K8
 *     （:7658-7678）@PUBLIC_EXUCUTION_KOUJO_K8（:7679-7693）
 *     @GROTESQUE_KOUJO_K8（:7694-7720）@ENTERENEMY_KOUJO_K8（:7721-7734）
 *     @GOHOUBI_REQUEST_KOUJO_K8（:7735-7779）@GOHOUBI_AFTER_KOUJO_K8
 *     （:7780-7856）@OSIOKI_KOUJO_K8（:7857-7917）@GOBI_KOUJO_K8
 *     （:7918-7953，ARG:0）
 *
 * == 守卫（K8 七道，源实测 :892-923，各文件 1:1） ==
 *
 * @KOJO_MESSAGE_COM_8 的守卫（按源文顺序）：
 *   1. ASSI > 0 && ASSIPLAY（助手调教）→ 跳过；
 *   2. TEQUIP:45 && SELECTCOM != 45（口塞）→ 跳过；
 *   3. TFLAG:899（失神）→ 跳过；
 *   4. TEQUIP:89（兽奸）→ **岔去本文件真身 DOG_KOJO_8**；
 *   5. TEQUIP:55（死斗场）→ **岔去本文件真身 COLOSSEUM_KOJO_8**；
 *   6. TALENT:9 == 1（崩坏）→ 跳过；
 *   7. TEQUIP:90（触手）→ 跳过。
 *
 * == 状态机 ==
 *
 * 调教开始/结束口上按 CFLAG:201（0-9）+ CFLAG:370（魔族化 1/2）+ CFLAG:650
 * （NTR 再捕获）推进（:75-808，主 EVENTTRAIN 与 K8_KOJO2 两段）。指令口上
 * 按 SELECTCOM 平铺、每指令一对 CFLAG:301-400 计数器（语义见 chara-kojo.js
 * 门面注释），FLAG:7 == 2 时上限旁路、同支每次出声，== 1 时逐阶段各出一次。
 * 简易助手口上（CFLAG:202/203/204）按 NO:ASSI（20/22/23）分派。
 *
 * == 非调教口上（#209 裁定 2：本票连带） ==
 *
 * DOG_KOJO_8（兽奸）与 COLOSSEUM_KOJO_8（死斗场）由头部守卫直调（真身在
 * 本文件）；BENKI_KOUJO_K8 / NTR_KOUJO_K8 / EXUCUTION_KOUJO_K8 /
 * MUSEUM_KOUJO_K8 / BANISHMENT_KOUJO_K8 / PUBLIC_EXUCUTION_KOUJO_K8 /
 * GROTESQUE_KOUJO_K8 / ENTERENEMY_KOUJO_K8 / GOHOUBI_REQUEST_KOUJO_K8 /
 * GOHOUBI_AFTER_KOUJO_K8 / OSIOKI_KOUJO_K8 / GOBI_KOUJO_K8 /
 * DUNGEON_RYOUZYOKU_K8 / DUNGEON_RYOUZYOKU_AFTER_K8 / DUNGEON_VICTORY_K8 /
 * DUNGEON_ATTACK_K8 以 module 导出随各自调度侧接线（同 K4 先例，ere/kojo/
 * kojo-k4-stoic.js）；SELF_KOJO_K8 注册进 self_kojo_family。
 *
 * == 门面（issue #71） ==
 *
 * CFLAG:201/370/650/202/203/204/301-400 一族走 chara(cid).kojo；CFLAG:16/40/41
 * 走 chara(cid).train（初吻对象/着衣状态/上衣类型，跨域已有名）；CFLAG:42
 * 走 chara(cid).chara（特别服装类型）。FLAG:7/108 走 game.kojo（口上开关/
 * 口上存在_8）；FLAG:37/500 走 game.system（着衣系统/狂王性别）；FLAG:62
 * 走 game.train（肉便器行动）；TFLAG:899/13/20/3/400 走 game.train；
 * TFLAG:150/21/22/23/24 走 game.system；TFLAG:16 走 game.event（犬射精或
 * 处刑口上）；TFLAG:500/510/520/530/60 走 game.event；TFLAG:18 走
 * game.dungeon（足交射精或处遇口上）。TALENT/MARK/BASE/TEQUIP 按既有约定
 * 保留裸寻址（gen-facade 只禁 cflag/flag/tflag 字面量）。
 *
 * == 本票状态（交付进行中） ==
 *
 * 骨架票：头部守卫、开局/终局口上（CFLAG:201 状态机）、K8_KOJO2 已落地；
 * KOJO_MESSAGE_COM_8 的 51 个 SELECTCOM 分支与全部非调教函数暂为占位
 * （stub_line，STUBBED_CALLS 逐条列出），按源码顺序分段填充中，完成一段
 * 即从 STUBBED_CALLS 划掉并同步 docs/stub-registry.md。
 */

const era = require('#/era-electron');
const { on, TIER } = require('#/system/event/registry');
const era_flag = require('#/era-utils/era-flag');
const { PALAMLV } = require('#/era-utils/palam-level');
const {
  kojo_message_com_family,
  kojo_message_palamcng_family,
  kojo_message_markcng_family,
  self_kojo_family,
  dungeon_victory_family,
  dungeon_attack_family,
  benki_koujo_family,
} = require('#/kojo/kojo-system');
const {
  ryouzyoku_kojo_family,
  ryouzyoku_after_kojo_family,
} = require('#/kojo/kojo-dungeon-ravish');
const { heart } = require('#/kojo/kojo-text');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { chara_callname, chara_name } = require('#/utils/callname-utils');
const { stub_line } = require('#/utils/stub-line');
const { piercing_state } = require('#/system/train/piercing-state');

/** 读未声明的序号返回 undefined 而非 0（#13），TALENT/MARK/BASE/TEQUIP 一律 || 0 兜底 */
const era0 = (k) => era.get(k) || 0;

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。骨架阶段：51 个 SELECTCOM 分支合用
 * 'KOJO_MESSAGE_COM_8' 一个占位名，各非调教函数各占一名，随填充逐条划掉。
 */
const STUBBED_CALLS = [
  'NTR_KOUJO_K8',
  'EXUCUTION_KOUJO_K8',
  'MUSEUM_KOUJO_K8',
  'BANISHMENT_KOUJO_K8',
  'PUBLIC_EXUCUTION_KOUJO_K8',
  'GROTESQUE_KOUJO_K8',
  'ENTERENEMY_KOUJO_K8',
  'GOHOUBI_REQUEST_KOUJO_K8',
  'GOHOUBI_AFTER_KOUJO_K8',
  'OSIOKI_KOUJO_K8',
  'GOBI_KOUJO_K8',
  'SELL_MATURO_K0',
];

// @EVENTTRAIN #PRI（:61-65）：存在标志 + 总开关补 0（同 EVENT_K.ERB 语义）
on(
  'EVENTTRAIN',
  () => {
    game.kojo.口上存在_8 = 1; // :63 FLAG:108 = 1（K8 口上存在标志）
    if (game.kojo.口上开关 === 0) {
      game.kojo.口上开关 = 2; // :64-65
    }
  },
  TIER.PRI,
);

// @EVENTEND #LATER（:67-69）：调教结束清存在标志
on(
  'EVENTEND',
  () => {
    game.kojo.口上存在_8 = 0; // :69
  },
  TIER.LATER,
);

/**
 * @EVENTTRAIN（:75-606，普通档）：调教开始时的口上。
 *
 * 守卫（:76-77/:78-79）：FLAG:7 <= 0 跳过、TALENT:168 != 1 跳过；此后按
 * CFLAG:201 状态机推进：初调教（0）→ 魔族化（一回のみ）→ NTR 再捕获
 * （CFLAG:650）→ 屈服刻印Lv1/2/3（各一次）→ 淫乱（+魔族化分档）→ 爱慕
 * （+魔族化分档）→ 崩坏 → 崩坏后/助手无/非男性/简易助手（金红桃 20 /
 * 22 / 扶她 23）→ 其余 CALL K8_KOJO2（二回目以降）。
 */
on(
  'EVENTTRAIN',
  async () => {
    const target = era_flag.target;
    const target_name = chara_callname(target); // %SAVESTR:TARGET%
    const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
    const kojo = chara(target).kojo;
    // \@TIME == 0 ? 今日 # 今夜\@（ERB 条件文本三元）
    const today_or_night = era_flag.time === 0 ? '今日' : '今夜';

    if (game.kojo.口上开关 <= 0) {
      return 0;
    }
    if (era0(`talent:${target}:168`) != 1) {
      return 0;
    }

    // :83-107 初調教時 CFLAG:201 == 0
    if (kojo.初调教 == 0) {
      era.drawLine(); // :84
      if (era0(`talent:${target}:314`) == 9) {
        await era.printAndWait(
          `${target_name}在被${player_name}调教之前，被魔族改造了。成为了魔族中的忍者...魔忍了。`,
        ); // :87
        await era.printAndWait(
          `${target_name}青色的肌肤映照着银发非常的美丽。真想就这样压倒做一些乱七八糟想做的事。`,
        ); // :88
        await era.printAndWait(`「让我做这开玩笑一样的事情…咕…离我远点！」`); // :89
        await era.printAndWait(
          `${target_name}通红的恶魔眼睛怒目而视着，感觉非常可爱。`,
        ); // :90
        await era.printAndWait(
          `因为变成魔族的原因，${target_name}是无法从${player_name}身边逃开的………`,
        ); // :91
        kojo.初调教 = 1; // :92 CFLAG:201 = 1
        kojo.魔族化 = 1; // :94 CFLAG:370 = 1（魔族スイッチ１）
      } else {
        await era.printAndWait(
          `${target_name}在调教房间的床上盘腿坐着。很无聊的打着哈欠朝着一个地方看，好像在等些什么。`,
        ); // :97
        await era.printAndWait(
          `然后，把那美丽的银发拨到后面盯着${player_name}。`,
        ); // :98
        await era.printAndWait(
          `「哎呀…真想不到居然把我捉住了呢。首先把恬不知耻的你的头给割下来…然后顺便救出其他的女孩子………」`,
        ); // :99
        await era.printAndWait(
          `「…啊…嗯？…使不出力气了…忍术也用不了…怎么可能！」`,
        ); // :100
        await era.printAndWait(
          `这是理所当然的，这个调教房间为了让勇士的力量无法使用，用奇怪的法术张开了特殊的结界。`,
        ); // :101
        await era.printAndWait(
          `${player_name}默默的笑着把${target_name}压倒了。`,
        ); // :102
        await era.printAndWait(
          `「在这个状态下会被做些什么我已经知道了…不过不管你干什么，我是绝对不会屈服的」`,
        ); // :103
        await era.printAndWait(`（唔…早知道这样应该接受女忍的训练的！）`); // :104
        kojo.初调教 = 1; // :106 CFLAG:201 = 1
      }
      return 1;

      // :111-120 魔族化（１回のみ）初回調教後魔族化、陥落前
    } else if (
      kojo.初调教 < 5 &&
      kojo.魔族化 == 0 &&
      era0(`talent:${target}:314`) == 9 &&
      era0(`talent:${target}:85`) == 0 &&
      era0(`talent:${target}:76`) == 0
    ) {
      await era.printAndWait(
        `${target_name}经${player_name}之手改造成了魔族。成为魔族的忍者…魔忍了。`,
      ); // :112
      await era.printAndWait(
        `${target_name}青色的肌肤映照着银发非常的美丽。真想就这样压倒做一些乱七八糟想做的事。`,
      ); // :113
      await era.printAndWait(`「咕…嗯…做了这样的事情…想要我吗…？」`); // :114
      await era.printAndWait(`${target_name}通红的魔族眼睛哭泣着。`); // :115
      await era.printAndWait(
        `变成了这么肮脏的魔族…狂王大人也会抛弃我吧…啊啊………」`,
      ); // :116
      await era.printAndWait(`${target_name}发出了叹息、然后留下了一滴眼泪………`); // :117
      kojo.魔族化 = 2; // :119 CFLAG:370 = 2（魔族スイッチ２）
      return 1;

      // :124-149 NTR再捕獲
    } else if (kojo.初调教 >= 1 && kojo.NTR再捕获 == 1) {
      if (era0(`talent:${target}:85`) || era0(`talent:${target}:76`)) {
        era.drawLine(); // :126
        await era.printAndWait(
          `「啊、好久不见………不处刑我证明你觉得我还有利用价值？」`,
        ); // :127
        await era.printAndWait(
          `${target_name}被反手捆绑正坐着。${target_name}好像很习惯似的一脸平静让人看不出情绪。`,
        ); // :128
        await era.printAndWait(
          `「难道说…看到我和狂王大人被其他的男人抱着，稍微受到了点打击吗？」`,
        ); // :129
        await era.printAndWait(
          `${target_name}嘲笑似的歪着嘴唇、没被提问也滔滔不绝开始讲起来了。`,
        ); // :130
        await era.printAndWait(
          `「啊啊、比你抱起来舒服得多了啊，果然还是被很多人一起抱更爽」`,
        ); // :131
        await era.printAndWait(
          `「被狂王大人抱着无数次的绝顶是到目前为止的经验中最棒的一个」`,
        ); // :132
        await era.printAndWait(
          `「在那个城里全身沾满了爱液和精液不停被轮奸的时候简直就像做梦…一样…呢………」`,
        ); // :133
        await era.printAndWait(
          `${target_name}的声音渐渐变成了哭腔、额头垂到了地板上。`,
        ); // :134
        await era.printAndWait(
          `「对不起…对不起…不要把我扔掉…不要把我扔掉………」`,
        ); // :135
        kojo.NTR再捕获 = 0; // :137（NTRスイッチ解除）
      } else {
        era.drawLine(); // :139
        await era.printAndWait(
          `${target_name}被反手捆绑正坐着。用吃了苦瓜一样的表情看着${player_name}。`,
        ); // :140
        await era.printAndWait(
          `「咕…第二次你被捉住了呢…这种屈辱已经无法忍受了…杀了我吧！」`,
        ); // :141
        await era.printAndWait(
          `「………什么？这次要把我调教成完全属于你的东西？…怎么会有你这样的人！」`,
        ); // :142
        await era.printAndWait(
          `给惊讶的${target_name}看了里面有狂王痴态的水晶球，在耳边说着，${target_name}连耳朵都红了。`,
        ); // :143
        await era.printAndWait(
          `「这、这又怎么了…我和狂王大人不管做什么…都跟你没有关系吧！」`,
        ); // :144
        await era.printAndWait(
          `${player_name}默默的笑着，为了把${target_name}谁回来而将他压倒在了床上………`,
        ); // :145
        kojo.NTR再捕获 = 0; // :147（NTRスイッチ解除）
      }
      return 1;

      // :154-160 屈服刻印Lv1
    } else if (kojo.初调教 < 2 && era0(`mark:${target}:2`) == 1) {
      era.drawLine(); // :155
      await era.printAndWait(
        `「哼，这样的事情和那个地狱修行相比，什么也不算」`,
      ); // :156
      await era.printAndWait(
        `${target_name}虽然在之前的调教中被做了屈辱的事情，不过还是一脸冷静的和${player_name}说着话。`,
      ); // :157
      await era.printAndWait(`「那么，接下来要做什么呢？」`); // :158
      kojo.初调教 = 2; // :159 CFLAG:201 = 2
      return 1;

      // :162-169 屈服刻印Lv2
    } else if (kojo.初调教 < 3 && era0(`mark:${target}:2`) == 2) {
      era.drawLine(); // :163
      await era.printAndWait(
        `「你也给我适可而止吧，你这种这样的调教什么的对我来说就像是微风一样」`,
      ); // :164
      await era.printAndWait(
        `${target_name}把手臂挽在一起显示着自己的从容，然而${player_name}没有看漏她的肩膀微妙的颤抖着。`,
      ); // :165
      await era.printAndWait(`${target_name}发现你含着笑容，马上移开了视线。`); // :166
      await era.printAndWait(`「哼，快开始你那温吞的调教吧」`); // :167
      kojo.初调教 = 3; // :168 CFLAG:201 = 3
      return 1;

      // :171-180 屈服刻印Lv3
    } else if (
      kojo.初调教 < 4 &&
      era0(`mark:${target}:2`) == 3 &&
      era0(`talent:${target}:85`) == 0
    ) {
      era.drawLine(); // :172
      await era.printAndWait(
        `${player_name}在来房间的时候${target_name}一边用手擦拭眼角一边站了起来。`,
      ); // :173
      await era.printAndWait(
        `「突、突然干什么啊，抱我？ 是啊…到这个地方来的理由只能是那个啊」`,
      ); // :174
      await era.printAndWait(`「随你怎么做吧，你的做法我也习惯了………」`); // :175
      await era.printAndWait(
        `然后${target_name}用自然的动作靠近了${player_name}刷的转动手和头，在${player_name}的耳边轻声说`,
      ); // :176
      await era.printAndWait(
        `「呵呵呵、这么轻松被抱住也太大意了？…啊！什么啊…啊嗯！」`,
      ); // :177
      await era.printAndWait(
        `${player_name}开玩笑似得绊倒了${target_name}推倒在床上，调教开始了………`,
      ); // :178
      kojo.初调教 = 4; // :179 CFLAG:201 = 4
      return 1;

      // :182-200 淫乱
    } else if (
      kojo.初调教 < 5 &&
      era0(`talent:${target}:85`) == 0 &&
      era0(`talent:${target}:76`) == 1 &&
      era0(`talent:${target}:314`) != 9
    ) {
      era.drawLine(); // :183
      await era.printAndWait(
        `「嗯啊…啊、终于来了吗…呐…快点抱我，再不被你抱的话就要变得奇怪了………」`,
      ); // :184
      await era.printAndWait(
        `${target_name}黑色湿润的瞳孔染上了淫荡的颜色。这个忍者终于忍受不住自己身体的欲望了。`,
      ); // :185
      await era.printAndWait(
        `「胸…再摸摸…啊~啊…虽然不是特别大…嗯、非常的有感觉…啊~啊${heart(1)}」`,
      ); // :186
      await era.printAndWait(
        `${target_name}被${player_name}抱在怀中、身体里面就那样体会着快乐。`,
      ); // :187
      await era.printAndWait(
        `「啊…果然应该完成女忍的训练的…然后就可以跟你做更舒服的事了………」`,
      ); // :188
      if (era0(`talent:${target}:0`) == 1) {
        await era.printAndWait(
          `然后${target_name}从${player_name}的怀中离开，坐在了床上。${target_name}双腿打开，手抚摸着股间，散发着一股淫靡的感觉。`,
        ); // :190
        await era.printAndWait(`「不过托她的福我还是处女哦${heart(1)}」`); // :191
        await era.printAndWait(`「所以快点…给我你的那个东西${heart(1)}」`); // :192
      } else {
        await era.printAndWait(
          `然后${target_name}从${player_name}的怀中离开，坐在了床上${target_name}双腿打开，手抚摸着股间，散发着一股淫靡的感觉。。`,
        ); // :194
        await era.printAndWait(
          `「呵呵呵，真相把你的阴茎…啊啊…更多的插进我的小穴里！」`,
        ); // :195
        await era.printAndWait(
          `${target_name}舍弃了忍者冷静的假面，向你撒着娇。`,
        ); // :196
        await era.printAndWait(
          `「啊啊，请把你那出色的东西赐给牝奴隶的我吧………${heart(1)}」`,
        ); // :197
      }
      kojo.初调教 = 5; // :199 CFLAG:201 = 5
      return 1;

      // :202-221 淫乱+魔族化
    } else if (
      era0(`talent:${target}:314`) == 9 &&
      kojo.初调教 < 6 &&
      era0(`talent:${target}:85`) == 0 &&
      era0(`talent:${target}:76`) == 1
    ) {
      era.drawLine(); // :203

      if (kojo.魔族化 == 1) {
        // :205-221 調教前から魔族
        await era.printAndWait(
          `「啊…已经无法离开你了…更多…让我更多的舒服吧…${heart(1)}」`,
        ); // :206
        await era.printAndWait(
          `无数次的调教让${target_name}输给了自己的肉欲。${target_name}的魔族的黄色双眼中沉淀着情欲、脑袋中全是些淫乱的妄想。`,
        ); // :207
        await era.printAndWait(`「来爱抚我敏感的胸部…吮吸到留下吻痕吧…」`); // :208
        await era.printAndWait(
          `「我…我想被你侵犯…啊啊…在这个青色的小穴和肛门…期待着你的精液灌注${heart(1)}`,
        ); // :209
        await era.printAndWait(`${target_name}在床上慢慢的分开了双腿。`); // :210
        if (era0(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「呐！…现在就把我的纯洁夺走…把阴茎插进来…啊啊…做了那么羞耻的事情要是还不被侵犯的话…干脆咬舌头死了算了………」`,
          ); // :212
          await era.printAndWait(
            `${target_name}一副快要哭出来的样子一边用手指撑开了蜜裂。爱液溢出的淫乱的香味在不断的漂浮着。`,
          ); // :213
          await era.printAndWait(
            `「所以、呐…拜托了、让可悲的母魔族变成你的东西…”魔王大人”${heart(1)}」`,
          ); // :214
        } else {
          await era.printAndWait(
            `「快点…来…在我的肚子里装满你的精液之前一直侵犯我${heart(1)}」`,
          ); // :216
          await era.printAndWait(
            `${target_name}一副快要哭出来的样子一边用手指撑开了蜜裂。爱液溢出的淫乱的香味在不断的漂浮着。`,
          ); // :217
          await era.printAndWait(
            `「啊啊…请给母魔族奴隶的我…你那出色的东西………${heart(1)}」`,
          ); // :218
        }
        kojo.初调教 = 6; // :220 CFLAG:201 = 6
        return 1;
      } else if (kojo.魔族化 == 2) {
        // :223-240 初回調教後に魔族
        await era.printAndWait(
          `「啊…我已经…不被你抱着…就会不正常了…呐…抱我…我和小穴都要…${heart(1)}」`,
        ); // :224
        await era.printAndWait(
          `${target_name}一边下流的舔着嘴唇一边撒娇的抱了过来`,
        ); // :225
        await era.printAndWait(`「来爱抚我敏感的胸部…吮吸到留下吻痕吧…」`); // :226
        await era.printAndWait(
          `${target_name}的手划过${player_name}的身体。好像舔着身体一样的触感让${player_name}打了一个冷战。`,
        ); // :227
        await era.printAndWait(
          `「啊啊…在这个青色的小穴和肛门里…期待着你的精液灌注${heart(1)}`,
        ); // :228
        await era.printAndWait(
          `然后${target_name}抓着${player_name}的手伸向了自己的蜜裂。`,
        ); // :229
        if (era0(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「呐！…现在就把我的纯洁夺走…把阴茎插进来…啊啊…做了那么羞耻的事情要是还不被侵犯的话…干脆咬舌头死了算了………」`,
          ); // :231
          await era.printAndWait(
            `${target_name}一副快要哭出来的样子一边被${player_name}的手指轻抚着，爱液溢出的淫乱的香味在不断的漂浮着。`,
          ); // :232
          await era.printAndWait(
            `「所以、呐…拜托了、让可悲的母魔族变成你的东西…”魔王大人”${heart(1)}」`,
          ); // :233
        } else {
          await era.printAndWait(
            `在我的肚子里装满你的精液之前一直侵犯我${heart(1)}」`,
          ); // :235
          await era.printAndWait(
            `${target_name}为了让${player_name}的手指插进而自己撑开了蜜裂，爱液溢出的淫乱的香味在不断的漂浮着`,
          ); // :236
          await era.printAndWait(
            `「啊啊…请给母魔族奴隶的我…你那出色的东西………${heart(1)}」`,
          ); // :237
        }
        kojo.初调教 = 6; // :239 CFLAG:201 = 6
        return 1;
      } else {
        // :242-249 陥落後に魔族
        await era.printAndWait(
          `经${player_name}之手被改造，变成了魔族的${target_name}一脸陶醉，坐在床上。`,
        ); // :243
        await era.printAndWait(
          `「我好开心、这个身体的话可以和你一直sex几小时也好…嗯、一整夜也好，几天也好都可以了。…${heart(1)}」`,
        ); // :244
        await era.printAndWait(
          `${target_name}站起来用紫色的舌头舔着嘴唇一边靠近。能清楚看出，那紫色的皮肤因为发情而红润。`,
        ); // :245
        await era.printAndWait(
          `「呐，做吧…抱我到会坏掉的程度…弄的乱七八糟的…呐？呐？」`,
        ); // :246
        await era.printAndWait(
          `${target_name}抱住${player_name}不停的亲吻着脖子祈求着………`,
        ); // :247
        kojo.初调教 = 6; // :248 CFLAG:201 = 6
        return 1;
      }

      // :252-271 爱慕
    } else if (
      kojo.初调教 < 7 &&
      era0(`talent:${target}:85`) == 1 &&
      era0(`talent:${target}:314`) != 9 &&
      era0(`talent:${target}:76`) == 0
    ) {
      era.drawLine(); // :253
      await era.printAndWait(`${target_name}一脸神圣，单膝跪地，等待着你。`); // :254
      await era.printAndWait(
        `${player_name}快被这个气氛彻底吞没，突然${target_name}说起了话。`,
      ); // :255
      await era.printAndWait(
        `「呐、差不多该考虑考虑怎么称呼“你”了。这样吧……主君、夫君大人、馆主大人、魔王大人」`,
      ); // :256
      await era.printAndWait(`「………哪个好呢？…你希望我用哪个称呼你？」`); // :257
      await era.printAndWait(
        `${player_name}一副惊讶的表情对${target_name}带着一副受不了了似的表情说道。`,
      ); // :258
      await era.printAndWait(
        `「诶~、还不明白吗…简单的说就是，我希望你成为的新主人」`,
      ); // :259
      await era.printAndWait(`「不相信我的话…在你想通之前继续调教我就好了」`); // :260
      if (era0(`talent:${target}:0`) == 1) {
        await era.printAndWait(`${target_name}放松着嘴角，微微的笑了`); // :262
        await era.printAndWait(`「那么、作为服从你的证明，把处女也可以哦」`); // :263
        await era.printAndWait(
          `「…怎么了这个表情？…啊啊、我可是没有受过女忍的训练的，还是处女哦。所以」`,
        ); // :264
        await era.printAndWait(`「请温柔一点…」`); // :265
      } else {
        await era.printAndWait(`「嘛，今天就是这么打算的吧」`); // :267
        await era.printAndWait(`${target_name}放松着嘴角，微微的笑了………`); // :268
      }
      kojo.初调教 = 7; // :270 CFLAG:201 = 7
      return 1;

      // :273-329 爱慕+魔族化
    } else if (
      era0(`talent:${target}:314`) == 9 &&
      kojo.初调教 < 8 &&
      era0(`talent:${target}:85`) == 1 &&
      era0(`talent:${target}:76`) == 0
    ) {
      era.drawLine(); // :274

      if (kojo.魔族化 == 1) {
        // :276-297 調教前から魔族
        if (chara(target).train.着衣状态 == 0) {
          await era.print(`全裸的`); // :278
        }
        await era.printAndWait(
          `${target_name}单膝跪地，好像是在等待着${player_name}。`,
        ); // :279
        await era.printAndWait(`然后${target_name}战战兢兢的开口了。`); // :280
        await era.printAndWait(
          `「我…我已经…把你认作主君了…魔王大人。所以把我当成是下属…那个…正式的…承认…一下吧…」`,
        ); // :281
        await era.printAndWait(
          `一边瞟视这里一边用战战兢兢的语调说这话的，好像不是平时刚强而充满自信的那个人一样。`,
        ); // :282
        await era.printAndWait(
          `「虽说以前被强行变成这幅身体的时候也曾怨恨过、不过现在…对你…啊啊…求你了！如果你不点头的话我马上在这里咬舌自尽！」`,
        ); // :283
        await era.printAndWait(
          `「诶…可以么…我可以成为你的东西啊…啊啊…太好了…真的太好了…」`,
        ); // :284
        await era.printAndWait(
          `${target_name}看到${player_name}点着头，终于彻底安心了一样松了一口气。`,
        ); // :285
        if (era0(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「那么…作为我主君的证明，把我的处女拿走吧…♪」`,
          ); // :287
          await era.printAndWait(
            `${target_name}的紫色舌头舔着嘴唇，着灼热的吐息`,
          ); // :288
          await era.printAndWait(
            `「呵呵呵，这是我的一族的规矩啊…要为奉上处女的人献出一生………骗你的。」`,
          ); // :289
          await era.printAndWait(
            `一边说着${target_name}一边可爱的吐了吐舌头………`,
          ); // :290
        } else {
          await era.printAndWait(
            `「啊…今天为了纪念我成为你的东西，会好好奉仕你的…♪」`,
          ); // :292
          await era.printAndWait(
            `${target_name}是太兴奋了吗，紫色的舌头下流的舔着嘴唇。`,
          ); // :293
          await era.printAndWait(
            `「我是竭尽全力做事的类型…好好期待着吧…${heart(1)}」`,
          ); // :294
        }
        kojo.初调教 = 8; // :296 CFLAG:201 = 8
        return 1;
      } else if (kojo.魔族化 == 2) {
        // :299-320 調教後に魔族
        if (chara(target).train.着衣状态 == 0) {
          await era.print(`全裸的`); // :301
        }
        await era.printAndWait(
          `${target_name}单膝跪地，好像是在等待着${player_name}。`,
        ); // :302
        await era.printAndWait(`然后${target_name}战战兢兢的开口了。`); // :303
        await era.printAndWait(
          `「我…我已经…把你认作主君了…魔王大人。所以把我当成是下属…那个…正式的…承认…一下吧…」`,
        ); // :304
        await era.printAndWait(
          `一边瞟视这里一边用战战兢兢的语调说这话的，好像不是平时刚强而充满自信的那个人一样`,
        ); // :305
        await era.printAndWait(
          `「我变成魔族之后已经…你…你的…啊啊…拜托了！如果你不答应的话我马上在这里咬舌自尽！」`,
        ); // :306
        await era.printAndWait(
          `「诶…可以么…我成为你的…魔王大人东西真的可以么…啊啊…太好了…真的太好了…」`,
        ); // :307
        await era.printAndWait(
          `${target_name}看到${player_name}点着头，终于彻底安心了一样松了一口气。`,
        ); // :308
        if (era0(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「那么…作为我主君的证明，把我的处女拿走吧…♪」`,
          ); // :310
          await era.printAndWait(
            `${target_name}的紫色舌头舔着嘴唇，着灼热的吐息`,
          ); // :311
          await era.printAndWait(
            `「呵呵呵，这是我的一族的规矩啊…要为奉上处女的人献出一生………骗你的。」`,
          ); // :312
          await era.printAndWait(
            `一边说着${target_name}一边可爱的吐了吐舌头………`,
          ); // :313
        } else {
          await era.printAndWait(
            `「啊…今天为了纪念我成为你的东西，会好好奉仕你的…♪」`,
          ); // :315
          await era.printAndWait(
            `${target_name}太兴奋了吗，紫色的舌头下流的舔着嘴唇。`,
          ); // :316
          await era.printAndWait(
            `「我是竭尽全力做事的类型…好好期待着吧…${heart(1)}」`,
          ); // :317
        }
        kojo.初调教 = 8; // :319 CFLAG:201 = 8
        return 1;
      } else {
        // :322-328 陥落後に魔族
        await era.printAndWait(
          `「如果是不久之前的我的话、变成了这个样子的时候肯定会当场自裁吧」`,
        ); // :323
        await era.printAndWait(
          `${target_name}进行了多次的改造变成了魔族。魔族那恶魔的肌肤跟她的银发非常合适。`,
        ); // :324
        await era.printAndWait(
          `「啊…所以说、我成为你的下属真的好吗…魔王大人${heart(1)}」`,
        ); // :325
        await era.printAndWait(
          `${target_name}的魔族那琥珀色的眼睛闪耀着迷人的光辉，淡淡笑了………`,
        ); // :326
        kojo.初调教 = 8; // :327 CFLAG:201 = 8
        return 1;
      }

      // :331-338 崩坏
    } else if (era0(`talent:${target}:9`) == 1 && kojo.初调教 < 9) {
      era.drawLine(); // :332
      await era.printAndWait(`${target_name}的双眼看上去已经没有理智存在了`); // :333
      await era.printAndWait(`进行了过于残酷的调教、精神貌似已经崩坏了。`); // :334
      await era.printAndWait(
        `${target_name}像是坏掉的玩具一样好像在呼唤着谁的名字………`,
      ); // :335
      await era.printAndWait(`「哈…呵…啊哈啊…啊哇、哇的大人哈哇大人在哪里」`); // :336
      kojo.初调教 = 9; // :337 CFLAG:201 = 9
      return 1;

      // :340-341 崩坏してたら二回目以降へ飛ぶ
    } else if (era0(`talent:${target}:9`) == 1) {
      return k8_kojo2(); // :341 CALL K8_KOJO2

      // :344-345 助手の有無をチェック（いない場合は二回目以降へ）
    } else if (era_flag.assi < 0) {
      return k8_kojo2(); // :345 CALL K8_KOJO2

      // :354-355 你が男じゃなかったら二回目以降
    } else if (era0('talent:0:122') == 0) {
      // TALENT:MASTER:122（MASTER 恒角色 0）
      return k8_kojo2(); // :355 CALL K8_KOJO2

      // :357-448 簡易助手口上：金红桃（NO:ASSI == 20）
    } else if (era_flag.assi == 20) {
      const assi = era_flag.assi;
      const assi_name = chara_callname(assi); // %SAVESTR:ASSI%
      era.drawLine(); // :358

      if (kojo.简易助手_0 == 0) {
        if (era0(`talent:${target}:85`) == 1 && kojo.初调教 >= 5) {
          // :362-372 既に爱持ちで爱取得時初口上（陥落イベント）が発生済み
          await era.printAndWait(
            `「啊…${assi_name}连队长都变成了魔王大人的仆人什么的………」`,
          ); // :363
          await era.printAndWait(
            `看到被${player_name}搂着肩膀的${assi_name}，${target_name}露出了十分惊讶的表情。`,
          ); // :364
          await era.printAndWait(
            `「对、对呢、魔王大人把我的${assi_name}变成了自己的东西呢………」`,
          ); // :365
          await era.printAndWait(
            `在嘟囔着的${target_name}面前、${player_name}吮吸着${assi_name}的嘴唇。`,
          ); // :366
          await era.printAndWait(
            `『嗯~…不要…啾啾…被那个孩子看到了可不好呢…嗯♪』`,
          ); // :367
          await era.printAndWait(
            `「唔！太，太狡猾了！我明明也很想和${assi_name}队长接吻！」`,
          ); // :368
          await era.printAndWait(
            `冲击性的告白、看来${target_name}喜欢${assi_name}的样子。`,
          ); // :369
          await era.printAndWait(
            `『嘛、嘛啊…我明明以为你一直讨厌我呢…原来是这样………』`,
          ); // :370
          await era.printAndWait(
            `「开始本来很讨厌的！但是渐渐的爱上队长了…啊啊！我也爱着魔王大人的呀！我该怎么做才好！」`,
          ); // :371
          kojo.简易助手_0 = 2; // :372 CFLAG:202 = 2
        } else if (era0(`talent:${target}:76`) == 1 && kojo.初调教 >= 5) {
          // :374-381 既に淫乱持ちで淫乱取得時初口上（陥落イベント）が発生済み
          await era.printAndWait(
            `「啊…没想到连${assi_name}队长也被魔王大人的阴茎攻陷了………多么的美妙！」`,
          ); // :375
          await era.printAndWait(
            `看到被${player_name}搂着肩膀的${assi_name}，${target_name}开心的笑了。`,
          ); // :376
          await era.printAndWait(
            `「和我最喜欢的${assi_name}队长一起侍奉魔王大人什么的！实在是太幸福了！」`,
          ); // :377
          await era.printAndWait(`『嘛、居然说最喜欢我了！？』`); // :378
          await era.printAndWait(
            `「嗯、我最喜欢你了${assi_name}队长${heart(1)}、啊啊、比起那个不如商量一下如何侍奉魔王大人吧」`,
          ); // :379
          await era.printAndWait(
            `${target_name}的告白吓到了${assi_name}、但${target_name}的兴趣已经转向了如何三个人一起获得快乐了………`,
          ); // :380
          kojo.简易助手_0 = 2; // :381 CFLAG:202 = 2
        } else {
          // :383-396 それ以外
          await era.printAndWait(
            `「啊、这种事…骗人…骗人…${assi_name}队长怎么可能变成了魔王的走狗…！」`,
          ); // :384
          await era.printAndWait(
            `${target_name}看到${assi_name}服侍${player_name}的样子，好像受到了打击。`,
          ); // :385
          await era.printAndWait(
            `${player_name}给${assi_name}递了个眼色。然后${assi_name}抱着${target_name}亲了起来。`,
          ); // :386
          await era.printAndWait(
            `「啊啊！停、停下来啊…我和${assi_name}队长用这种方式…唔…嗯…呜啊…啊啊………！」`,
          ); // :387
          await era.printAndWait(`『哼哼、老实的呆着吧…哼…啾啾…${heart(1)}』`); // :388
          await era.printAndWait(
            `那个酷酷的女忍者一边翻着白眼一边被${assi_name}亲着。嘴唇分开后${target_name}空虚的瞳孔中洒下了眼泪………`,
          ); // :389
          if (chara(target).train.初吻对象 == -1) {
            // :391-395 初吻
            chara(target).train.初吻对象 = 1; // :392 CFLAG:TARGET:16 = 1
            chara(target).train.初吻对象名 = assi_name; // :393 CSTR:TARGET:4 = %SAVESTR:ASSI%
            await era.printAndWait(`看来是${target_name}的初吻………`); // :394
          }
          kojo.简易助手_0 = 1; // :396 CFLAG:202 = 1
        }
        return 1;

        // :402-423 二回目以降（爱/淫乱持ち）
      } else if (
        (kojo.简易助手_0 == 1 &&
          game.kojo.口上开关 == 2 &&
          era0(`talent:${target}:85`) == 1) ||
        era0(`talent:${target}:76`) == 1
      ) {
        if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「啊、队、队长…对、对不起…」`); // :405
          await era.printAndWait(`『有什么要对我道歉的？』`); // :406
          await era.printAndWait(
            `「因为我对魔王大人…那个、主君…喜欢上了…所以………」`,
          ); // :407
          await era.printAndWait(`『你还喜欢着我吗？』`); // :408
          await era.printAndWait(`「！、是、是的、最喜欢了！最爱了！」`); // :409
          await era.printAndWait(
            `『所以什么问题也不会有吧？ 一起来侍奉魔王大人吧？』`,
          ); // :410
          await era.printAndWait(`「是！是的！我会努力的！」`); // :411
          await era.printAndWait(
            `看来${target_name}和${assi_name}建筑了新的关系………`,
          ); // :412
          kojo.简易助手_0 = 2; // :413 CFLAG:202 = 2
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「啊哈、队长…和我接吻吧…接吻${heart(1)}」`); // :416
          await era.printAndWait(
            `『被魔王调教了以后、变得特别可爱呢、${target_name}』`,
          ); // :417
          await era.printAndWait(
            `看着沉溺于淫荡的${target_name}样子、${assi_name}轻轻的笑了。`,
          ); // :418
          await era.printAndWait(
            `「队长讨厌我吗？ 我可是最喜欢队长的…所以快来接吻吧${heart(1)}」`,
          ); // :419
          await era.printAndWait(
            `『哼哼、来这里、我和魔王大人会好好地疼爱你的${heart(1)}』`,
          ); // :420
          kojo.简易助手_0 = 2; // :421 CFLAG:202 = 2
        }
        return 1;

        // :425-439 二回目以降（三人関係成立後）
      } else if (kojo.简易助手_0 == 2 && game.kojo.口上开关 == 2) {
        if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「啊啊…魔王大人太过分了…在我眼前…和${assi_name}队长做那样的事情…呜呜呜」`,
          ); // :428
          await era.printAndWait(
            `${target_name}在${player_name}前正座着、在她眼前${player_name}和${assi_name}正粘粘糊糊的深吻给她看。`,
          ); // :429
          await era.printAndWait(
            `『嗯…嗯啾啾…你就在那里看着我们现在的样子…嗯哼…啾${heart(1)}』`,
          ); // :430
          await era.printAndWait(
            `${target_name}因为两人的样子而焦急着、像被淫乱的火焰烘烤着………`,
          ); // :431
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「呐${assi_name}队长、和我一起做一些快乐的事情吧…呐${heart(1)}」`,
          ); // :434
          await era.printAndWait(
            `${target_name}坦率的顺从着自己的欲望、一边抱着${assi_name}的身体一边撒娇。`,
          ); // :435
          await era.printAndWait(
            `『真是的、还真没想到你是这么喜欢撒娇的孩子呢』`,
          ); // :436
          await era.printAndWait(
            `${assi_name}看到${player_name}露出困惑的表情看着${target_name}轻抚着头………`,
          ); // :437
        }
        return 1;

        // :441-447 それ以外
      } else {
        await era.printAndWait(
          `「呐、呐~…这是调教吧？是的话…就把${assi_name}队长的嘴巴的第一次给我吧………」`,
        ); // :442
        await era.printAndWait(
          `${target_name}好像因为冲击把之前接吻忘掉了，死皮赖脸的要求着${assi_name}。`,
        ); // :443
        await era.printAndWait(`看来${target_name}喜欢${assi_name}。`); // :444
        await era.printAndWait(`『真是没办法的孩子呢…来、把下巴抬起来』`); // :445
        await era.printAndWait(`「呜~…啾…接吻…喜欢………」`); // :446
        return 1;
      }

      // :450-524 簡易助手口上：（NO:ASSI == 22）
    } else if (era_flag.assi == 22) {
      const assi = era_flag.assi;
      const assi_name = chara_callname(assi); // %SAVESTR:ASSI%
      era.drawLine(); // :451

      if (kojo.简易助手_1 == 0) {
        if (era0(`talent:${target}:85`) == 1 && kojo.初调教 >= 5) {
          await era.printAndWait(
            `「啊啊、你也变成了魔王大人的下仆了啊………并没有生气。因为我也是这样啊」`,
          ); // :456
          await era.printAndWait(
            `${target_name}好像很开心的样子和${assi_name}说着话。`,
          ); // :457
          await era.printAndWait(
            `「和你一起的话很放心啊、接下来就好好相处吧…欸？比起那种无聊的事还是快点一起侍奉魔王大人吧？」`,
          ); // :458
          await era.printAndWait(
            `『是的、我们应做的事就是作为魔王大人的下仆奉献一切啊』`,
          ); // :459
          await era.printAndWait(
            `「是啊、那是比什么事都重要的事情${heart(1)}」`,
          ); // :460
          kojo.简易助手_1 = 2; // :461 CFLAG:203 = 2
        } else if (era0(`talent:${target}:76`) == 1 && kojo.初调教 >= 5) {
          await era.printAndWait(
            `「你也经魔王大人之手变成这样了吗？啊啊、看着这个表情我就知道${heart(1)}」`,
          ); // :464
          await era.printAndWait(
            `${target_name}和${assi_name}因为想象之外的再会开心的笑了。`,
          ); // :465
          await era.printAndWait(
            `「以后就要两个人一起为魔王大人服务了…啊啊、没想到会和你变成这样的关系♪」`,
          ); // :466
          await era.printAndWait(
            `『你也变了啊、但是现在的你看起来更棒哦${heart(1)}』`,
          ); // :467
          kojo.简易助手_1 = 2; // :468 CFLAG:203 = 2
        } else {
          await era.printAndWait(
            `「你也输了啊…真是的，真吃惊你是怎么当圣灵骑士的」`,
          ); // :471
          await era.printAndWait(
            `${target_name}（完全无视自己也输了）用侮蔑的目光看着被作为助手带了过来的${assi_name}。`,
          ); // :472
          await era.printAndWait(
            `但是看到${assi_name}寄宿着的淫色的眼神，“呜”的停止了一下呼吸。`,
          ); // :473
          await era.printAndWait(
            `「难、难道你…你变成了魔王的下仆了？快、快住手…不要摸我…啊啊！」`,
          ); // :474
          await era.printAndWait(
            `『来…一起来愉悦吧♪，没关系的，你也会在魔王大人的拥抱中感受到无上的喜悦的♪』`,
          ); // :475
          kojo.简易助手_1 = 1; // :476 CFLAG:203 = 1
        }
        return 1;
      } else if (
        (kojo.简易助手_1 == 1 &&
          game.kojo.口上开关 == 2 &&
          era0(`talent:${target}:85`) == 1) ||
        era0(`talent:${target}:76`) == 1
      ) {
        if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `『阿拉阿拉、圣灵骑士的${target_name}大人变成了魔王的下仆了』`,
          ); // :484
          await era.printAndWait(`「这、不要说这样的话啊…」`); // :485
          await era.printAndWait(
            `看着${target_name}的羞耻的姿态的${assi_name}非常的愉悦。`,
          ); // :486
          await era.printAndWait(
            `『呵呵呵、你也成为了魔王大人的下仆的话，咱们必须要庆祝一下啊』`,
          ); // :487
          await era.printAndWait(`「庆祝？你到底想要做什么？」`); // :488
          await era.printAndWait(
            `『是呢、比如说作为纪念而穿环和烧印什么的、各种各样可以做的事情跟山一样多呢』`,
          ); // :489
          await era.printAndWait(
            `${assi_name}紧紧握着${target_name}的手快乐的笑了………`,
          ); // :490
          kojo.简易助手_1 = 2; // :491 CFLAG:203 = 2
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「呵呵呵、被魔王大人抱真是太棒了、接下来${today_or_night}跟你一起sex也行啊${heart(1)}」`,
          ); // :494
          await era.printAndWait(
            `『人类什么的真是马上就会改变的东西啊。你也变成了这么淫乱的女人、原来就算是开玩笑也不会想到呢』`,
          ); // :495
          await era.printAndWait(
            `${assi_name}深吸了一口气、重振了精神向${target_name}提出意见。`,
          ); // :496
          await era.printAndWait(
            `『呐、接下来一起进行魔王大人侍奉对决怎么样？ 我融化般的奉仕会让魔王大人称赞我的${heart(1)}』`,
          ); // :497
          await era.printAndWait(
            `「啊啊、很棒的意见、不过如果这么比的话我可是会获得魔王大人所有的称赞的♪」`,
          ); // :498
          kojo.简易助手_1 = 2; // :499 CFLAG:203 = 2
        }
        return 1;
      } else if (kojo.简易助手_1 == 2 && game.kojo.口上开关 == 2) {
        if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「我爱你们两个…${heart(1)}」`); // :506
          await era.printAndWait(
            `『呵呵呵、我先来帮你放松一下♪ 然后由魔王大人吧你…嗯呵呵和』`,
          ); // :507
          await era.printAndWait(`「啊嗯！不温柔一点的话可不行！」`); // :508
          await era.printAndWait(
            `${target_name}因为${player_name}和${assi_name}发出了很开心的声音………`,
          ); // :509
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「啊…我和${assi_name}、谁的侍奉更好？答不上来的话那就继续侍奉哟…啊嗯…啊啊${heart(1)}」`,
          ); // :512
          await era.printAndWait(
            `『我这边更好，是吧？不好好回答的话可是很讨厌的呢。』`,
          ); // :513
          await era.printAndWait(
            `${target_name}与${assi_name}双方合力缠绕着，爱抚${player_name}全身………`,
          ); // :514
        }
        return 1;
      } else {
        await era.printAndWait(`${assi_name}舔着嘴唇推倒了${target_name}。`); // :519
        await era.printAndWait(`「不、不行…你做这种事…啊啊！不、讨厌！」`); // :520
        await era.printAndWait(`『你长得这么漂亮，让人受不了呢♪』`); // :521
        await era.printAndWait(
          `${target_name}在${assi_name}的身体下方笨拙的挣扎着………`,
        ); // :522
        return 1;
      }

      // :526-597 簡易助手口上：扶她（NO:ASSI == 23，TALENT:ASSI:121 守卫）
    } else if (era_flag.assi == 23) {
      const assi = era_flag.assi;
      const assi_name = chara_callname(assi); // %SAVESTR:ASSI%
      if (era0(`talent:${assi}:121`) == 0) {
        return 0;
      }
      era.drawLine(); // :529

      if (kojo.简易助手_2 == 0) {
        if (era0(`talent:${target}:85`) == 1 && kojo.初调教 >= 5) {
          await era.printAndWait(
            `「你也成为魔王大人的下仆了呢…同伴增加了真是令人开心。话说回来你的身体居然是这样的、真是没想到」`,
          ); // :534
          await era.printAndWait(
            `${target_name}看着扶她阴茎勃起着的${assi_name}的样子、脸颊染成了红色。`,
          ); // :535
          await era.printAndWait(
            `「呐、果然魔王大人看见你的身体很兴奋吧？………啊啊、不，不回答也可以」`,
          ); // :536
          await era.printAndWait(`『呵呵呵、你实际体验一下就知道了♪』`); // :537
          await era.printAndWait(
            `${target_name}尴尬的摇着手。${assi_name}哭笑着邀请${target_name}上床………`,
          ); // :538
          kojo.简易助手_2 = 2; // :539 CFLAG:204 = 2
        } else if (era0(`talent:${target}:76`) == 1 && kojo.初调教 >= 5) {
          await era.printAndWait(
            `「呀、你也经魔王大人之手变成这样了呢…啊啊、你的身体居然是这样的、真是没想到」`,
          ); // :542
          await era.printAndWait(
            `${target_name}看着${assi_name}的扶她阴茎勃起的样子、兴奋了起来。`,
          ); // :543
          await era.printAndWait(`脸色红润、气息混乱、然后吞了吞口水说说道。`); // :544
          await era.printAndWait(
            `「今天的对手是你啊…好吧、用你的肉棒来不停的侵犯我吧…！」`,
          ); // :545
          await era.printAndWait(
            `『你也堕落成那么下流的样子了、魔王大人的调教真是美妙啊♪』`,
          ); // :546
          kojo.简易助手_2 = 2; // :547 CFLAG:204 = 2
        } else {
          await era.printAndWait(
            `「你成为魔王的下仆了啊、${assi_name}。难道说是背叛了？」`,
          ); // :550
          await era.printAndWait(
            `${target_name}锐利的眼光贯穿了${assi_name}。${assi_name}轻轻的回避着那个视线、取下了腰间的布，展示着已经完全勃起了的扶她肉棒。`,
          ); // :551
          await era.printAndWait(
            `「呀！？这，这什么啊、扶她！？…怎、怎么可能…今天是你把我…？」`,
          ); // :552
          await era.printAndWait(
            `『是啊、侵犯你也没关系的，魔王大人下了这样的命令${heart(1)}』`,
          ); // :553
          await era.printAndWait(
            `${assi_name}露出了冷笑的点着头，把${target_name}推倒了………`,
          ); // :554
          kojo.简易助手_2 = 1; // :555 CFLAG:204 = 1
        }
        return 1;
      } else if (
        (kojo.简易助手_2 == 1 &&
          game.kojo.口上开关 == 2 &&
          era0(`talent:${target}:85`) == 1) ||
        era0(`talent:${target}:76`) == 1
      ) {
        if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「呵呵呵、我也成为魔王大人的下仆了哟。听从魔王大人的是命令就是我的幸福${heart(1)}」`,
          ); // :563
          await era.printAndWait(`『是么、所以是因为魔王大人的命令才抱我？』`); // :564
          await era.printAndWait(
            `「当然不是、啊啊、在魔王大人的面前抱你什么的…会变得奇怪的${heart(1)}」`,
          ); // :565
          await era.printAndWait(
            `你明明还什么命令都没下，${target_name}因为想象自己抱着${assi_name}而发情了………`,
          ); // :566
          kojo.简易助手_2 = 2; // :567 CFLAG:204 = 2
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「嗯哼…来侵犯我的吗？好啊…侵犯我吧…把我弄的乱七八糟${heart(1)}」`,
          ); // :570
          await era.printAndWait(
            `『在这个情况下停止的话好像会很糟、魔王大人、怎么做呢？』`,
          ); // :571
          await era.printAndWait(
            `看着伸展着四肢请求着的${target_name}，${assi_name}叹息着。`,
          ); // :572
          await era.printAndWait(
            `「还商量什么呢？我的小穴${heart(1)} ，屁股小穴${heart(1)} 都准备好了啊${heart(1)}」`,
          ); // :573
          kojo.简易助手_2 = 2; // :574 CFLAG:204 = 2
        }
        return 1;
      } else if (kojo.简易助手_2 == 2 && game.kojo.口上开关 == 2) {
        if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「那么、今天是哪个来疼爱我呢？${assi_name}？还是你？」`,
          ); // :581
          await era.printAndWait(
            `「啊啊、干脆的两个人一起来也没关系哦…${heart(1)}」`,
          ); // :582
          await era.printAndWait(
            `『都说到这种程度的话、魔王大人和我两根一起插你！』`,
          ); // :583
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「哈啊哈啊…一想到你们两个侵犯我的话…我的胸里面就好像充满了什么东西${heart(1)}」`,
          ); // :586
          await era.printAndWait(
            `${target_name}因为欲望和兴奋耳朵都红了、摇动着臀部诱惑着${player_name}和${assi_name}。`,
          ); // :587
          await era.printAndWait(
            `『感觉真是下流啊、已经比起忍者不如说只是母猪了！』`,
          ); // :588
        }
        return 1;
      } else {
        await era.printAndWait(
          `「啊啊…没想到你还有这种兴趣…看在以前是伙伴的面上手下留情哦…啊！」`,
        ); // :593
        await era.printAndWait(`${target_name}被无情的${assi_name}推倒了。`); // :594
        await era.printAndWait(
          `『不行、把你侵犯到屈服，这可是魔王大人的命令♪ 虽说我也很有兴趣啦』`,
        ); // :595
        return 1;
      }

      // :599-600 それ以外（未知助手）→ 二回目以降
    } else {
      return k8_kojo2(); // :600 CALL K8_KOJO2
    }
  },
  TIER.NORMAL,
);

/**
 * @K8_KOJO2（:607-808）：调教开始口上的二回目以降（崩坏後の逗留分岐、
 * 反抗/屈服刻印各档、淫乱・爱慕の二巡目——含着装分岐与魔族分岐）。
 *
 * @returns {number} 0 或 1（RETURN 值；未来若有调用方读取，保留数值）
 */
async function k8_kojo2() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const rand_n = (n) => Math.floor(Math.random() * n);
  // \@TIME == 0 ? 今日 # 今夜\@ / \@TIME == 0 ? 今日 # 今宵\@（ERB 条件文本三元）
  const today_or_night = era_flag.time === 0 ? '今日' : '今夜';
  const today_or_eve = era_flag.time === 0 ? '今日' : '今宵';

  // :609-613 崩坏
  if (era0(`talent:${target}:9`) == 1 && game.kojo.口上开关 == 2) {
    era.drawLine(); // :610
    await era.printAndWait(`崩坏了的${target_name}喃喃地嘀咕着什么。`); // :611
    await era.printAndWait(`「啊~…哈哇大人…哈哇大人~…快来…快来~」`); // :612
    return 1;

    // :615-619 反抗刻印Lv3
  } else if (era0(`mark:${target}:3`) == 3 && game.kojo.口上开关 == 2) {
    era.drawLine(); // :616
    await era.printAndWait(`「总有一天…要让你掉进比死还要痛苦的地狱…………」`); // :617
    await era.printAndWait(`${target_name}充满着怒意的眼神盯着你………`); // :618
    return 1;

    // :622-627 屈服刻印Lv0
  } else if (era0(`mark:${target}:2`) == 0 && game.kojo.口上开关 == 2) {
    era.drawLine(); // :623
    await era.printAndWait(`「接下来要开始调教了么？」`); // :624
    await era.printAndWait(`「嘛、也许能代替按摩吧」`); // :625
    await era.printAndWait(`${target_name}非常轻松的样子………`); // :626
    return 1;

    // :630-635 屈服刻印Lv1
  } else if (era0(`mark:${target}:2`) == 1 && game.kojo.口上开关 == 2) {
    era.drawLine(); // :631
    await era.printAndWait(`「呼哇…你的调教真是让我想打哈欠啊」`); // :632
    await era.printAndWait(`「那种程度的强度真的可以吗？」`); // :633
    await era.printAndWait(`说着那样的话，${target_name}露出了微笑………`); // :634
    return 1;

    // :638-643 屈服刻印Lv2
  } else if (era0(`mark:${target}:2`) == 2 && game.kojo.口上开关 == 2) {
    era.drawLine(); // :639
    await era.printAndWait(`「嗯…被你摸着，总感觉有点发抖似的感觉………」`); // :640
    await era.printAndWait(`「啊，别误会了、觉得冷而已」`); // :641
    await era.printAndWait(`${target_name}把你当成笨蛋一样，哼了一声………`); // :642
    return 1;

    // :646-651 屈服刻印Lv3＋爱/淫乱無し
  } else if (
    era0(`mark:${target}:2`) == 3 &&
    era0(`talent:${target}:85`) == 0 &&
    era0(`talent:${target}:76`) == 0 &&
    game.kojo.口上开关 == 2
  ) {
    era.drawLine(); // :647
    await era.printAndWait(`「快、快点抱我………说过吧？只是习惯了」`); // :648
    await era.printAndWait(`「嗯~…啊~…那么温柔…犯规了啊…啊啊」`); // :649
    await era.printAndWait(
      `然后${target_name}被${player_name}慢慢推倒到了床上………`,
    ); // :650
    return 1;

    // :654-731 淫乱（服分岐 + 魔族分岐）
  } else if (era0(`talent:${target}:76`) == 1 && game.kojo.口上开关 == 2) {
    era.drawLine(); // :655

    // :657-699 服分岐優先（着衣設定無しの場合は進む）
    if (game.system.着衣系统 != 0) {
      if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 1
      ) {
        // :660-663 普段着・スカートタイプ（模板未填写，1:1 保留）
      } else if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 101
      ) {
        // :664-667 普段着・ズボンタイプ（模板未填写，1:1 保留）
      } else if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 209
      ) {
        // :668-681 メイド服
        await era.printAndWait(
          `${target_name}的女仆服有着膝下20cm的裙子，因为里面加入了钢丝，裙子被漂亮的撑了起来。`,
        ); // :669
        await era.printAndWait(`「主人、${today_or_eve}的侍奉要怎么样呢？」`); // :670
        await era.print(
          `${target_name}把裙子卷了起来露出内衣。今日的内衣的颜色是`,
        ); // :671
        await era.print(['白', '赤', '黑', '青'][rand_n(4)]); // :672-677 PRINTDATA/DATAFORM 白/赤/黒/青/ENDDATA（等概率随机选一）
        await era.printAndWait(`的样子。`); // :678
        await era.printAndWait(
          `被卷起来的裙子里面飘出了淫靡的气味。被你看着内衣就很兴奋的样子。`,
        ); // :679
        await era.printAndWait(
          `「被你…被主人看着就好像要变的奇怪了${heart(1)}」`,
        ); // :680
        return 1;
      } else if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 203
      ) {
        // :683-689 妓女のドレス
        await era.printAndWait(
          `${target_name}的妓女的礼服是藏青色的，衣服前面的部分细得只要稍微一动胸部就会露出来。`,
        ); // :684
        await era.printAndWait(
          `很在意短裙的${target_name}两腿之间摩擦着非常扭扭捏捏的样子。`,
        ); // :685
        await era.printAndWait(
          `「啊啊、穿成这样样子等你的我的心情你明白吗？ 来、看着…啊嗯♪」`,
        ); // :686
        await era.printAndWait(
          `${target_name}抓起衣服前面的部分，胸部暴露在外面。乳头好像勃起了的样子。`,
        ); // :687
        await era.printAndWait(
          `「呐、拜托了、抱我${heart(1)} 把我弄得乱七八糟吧${heart(1)}」`,
        ); // :688
        return 1;
      } else if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 254
      ) {
        // :691-697 バニースーツ
        await era.printAndWait(
          `${today_or_night}，${target_name}要穿着蓝色的兔女郎服进行侍奉的样子。`,
        ); // :692
        await era.printAndWait(
          `被细腻的网格丝袜和高跟鞋覆盖的而显得更为修长的腿部看起来比平时更美丽。`,
        ); // :693
        await era.printAndWait(
          `「听说兔子是多产的象征哦、就是说，你想然我怀孕生下很多孩子呢」`,
        ); // :694
        await era.printAndWait(
          `${target_name}手放在床上可爱的臀部朝着你左右的晃着。`,
        ); // :695
        await era.printAndWait(
          `「你看你看…可爱的小兔子在魔王大人的面前诱惑你哦？ 快点来抓住我吧${heart(1)}」`,
        ); // :696
        return 1;
      }
    }

    // :701-730 魔族
    if (era0(`talent:${target}:314`) == 9) {
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「啊…快点抱我…用你的阴茎让我屈服吧${heart(1)}」`,
        ); // :703
        await era.printAndWait(
          `${target_name}被${player_name}看着，以前酷酷的女忍者已经完全变成了阴茎狂的淫乱魔族了。`,
        ); // :704
        await era.printAndWait(
          `「让我变成这样的不就是你么…来，好好负起责任吧${heart(1)}」`,
        ); // :705
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「考虑过一直等待着你的侵犯的我的心情么？」`); // :707
        await era.printAndWait(`「…嘛，没考虑过吧、我知道你非常的冷淡」`); // :708
        await era.printAndWait(
          `「但是没关系的、既然今天选择了我…啊啊…那么更多的侵犯我吧…${heart(1)}」`,
        ); // :709
      } else {
        await era.printAndWait(
          `「你要是命令的话我什么都做哦…就连狂王的头也可以哦？」`,
        ); // :711
        await era.printAndWait(
          `「………诶？你说那种事情怎么样都好快点把大腿打开？」`,
        ); // :712
        await era.printAndWait(
          `「唔嗯…现在就作为你的女奴隶满足你吧…啊啊…快点…侵犯我吧…${heart(1)}」`,
        ); // :713
      }
    } else {
      // それ以外
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「啊…快点抱我…用你的阴茎让我屈服吧${heart(1)}」`,
        ); // :718
        await era.printAndWait(
          `${target_name}被${player_name}看着，以前酷酷的女忍者已经完全变成了阴茎狂的淫乱魔族了。`,
        ); // :719
        await era.printAndWait(
          `「让我变成这样的不就是你么…来，好好负起责任吧${heart(1)}」`,
        ); // :720
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「考虑过一直等待着你的侵犯的我的心情么？」`); // :722
        await era.printAndWait(`「…嘛，没考虑过吧、我知道你非常的冷淡」`); // :723
        await era.printAndWait(
          `「但是没关系的、既然今天选择了我…啊啊…那么更多的侵犯我吧…${heart(1)}」`,
        ); // :724
      } else {
        await era.printAndWait(
          `「你要是命令的话我什么都做哦…就连狂王的头也可以哦？」`,
        ); // :726
        await era.printAndWait(
          `「………诶？你说那种事情怎么样都好快点把大腿打开？」`,
        ); // :727
        await era.printAndWait(
          `「唔嗯…现在就作为你的女奴满足你吧隶…啊啊…快点…侵犯我吧…${heart(1)}」`,
        ); // :728
      }
    }
    return 1;

    // :733-806 爱慕（服分岐 + 魔族分岐）
  } else if (era0(`talent:${target}:85`) == 1 && game.kojo.口上开关 == 2) {
    era.drawLine(); // :734

    // :737-772 服分岐優先
    if (game.system.着衣系统 != 0) {
      if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 1
      ) {
        // :739-742 普段着・スカートタイプ（模板未填写，1:1 保留）
      } else if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 101
      ) {
        // :743-746 普段着・ズボンタイプ（模板未填写，1:1 保留）
      } else if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 209
      ) {
        // :747-754 メイド服
        await era.printAndWait(
          `「穿、穿好了。果然女仆服什么的不太习惯啊………因为是你的命令所以没办法哟♪」`,
        ); // :748
        await era.printAndWait(
          `${target_name}的女仆服有着膝下20cm的裙子，因为里面加入了钢丝，裙子被漂亮的撑了起来。`,
        ); // :749
        await era.printAndWait(
          `「虽然听说女仆服是工作服，弄脏也没关系…不过太可爱了不太想弄脏呢…啊嗯」`,
        ); // :750
        await era.printAndWait(
          `你抱着${target_name}说着”好啦好啦、很适合你啊”摸着她的头。`,
        ); // :751
        await era.printAndWait(
          `「笨、笨蛋…被做这样的事的话，我快忍不住了…${heart(1)}」`,
        ); // :752
        await era.printAndWait(
          `${target_name}紧紧的抱着你，闻着你的味道，脸在你的胸前蹭来蹭去………`,
        ); // :753
        return 1;
      } else if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 203
      ) {
        // :756-762 妓女のドレス
        await era.printAndWait(
          `${target_name}的妓女的礼服是藏青色的，衣服前面的部分细得只要稍微一动胸部就会露出来。`,
        ); // :757
        await era.printAndWait(
          `很在意短裙的${target_name}两腿之间摩擦着非常扭扭捏捏的样子。`,
        ); // :758
        await era.printAndWait(
          `「这、这么猥琐的衣服让我穿着什么的…${today_or_night}可以好好期待吗？」`,
        ); // :759
        await era.printAndWait(
          `${target_name}脸颊染上了红晕，灼热的吐息漏了出来、看着这个样子就知道她已经发情了。`,
        ); // :760
        await era.printAndWait(
          `「呐、看见我这样兴奋的话，就更激烈的抱我${heart(1)}」`,
        ); // :761
        return 1;
      } else if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 254
      ) {
        // :764-770 バニースーツ
        await era.printAndWait(
          `${today_or_night}，${target_name}要穿着蓝色的兔女郎服进行侍奉的样子。`,
        ); // :765
        await era.printAndWait(
          `被细腻的网格丝袜和高跟鞋覆盖的而显得更为修长的腿部看起来比平时更美丽。`,
        ); // :766
        await era.printAndWait(
          `「我，我是兔子哟pyon☆…呐、呐、这样的打招呼真的不做不行吗？　因为是因为你的命令我才做的」`,
        ); // :767
        await era.printAndWait(
          `看着非常羞耻的打招呼，整个脸都红了的${target_name}，你禁不住笑了。`,
        ); // :768
        await era.printAndWait(
          `「那么主人、给兔子想要H的命令pyon☆　果然太羞耻了，不行了！」`,
        ); // :769
        return 1;
      }
    }

    // :774-805 魔族
    if (era0(`talent:${target}:314`) == 9) {
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「你要是命令的话我什么都做哦…就连狂王的头也可以哦？」`,
        ); // :776
        await era.printAndWait(
          `「………诶？你说那种事情怎么样都好快点把大腿打开？」`,
        ); // :777
        await era.printAndWait(`「啊啊…我就这样被抱着…好开心………♪」`); // :778
        await era.printAndWait(
          `${target_name}莞尔一笑、朝着${player_name}分开了双腿………`,
        ); // :779
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「今天也要调教吗？我不是已经完全变成你的所有物了么」`,
        ); // :781
        await era.printAndWait(
          `「可以的、忍者把身体交给主君什么的很正常…啊啊${heart(1)}」`,
        ); // :782
        await era.printAndWait(
          `${target_name}高兴的笑着，缠上了${player_name}的身体………`,
        ); // :783
      } else {
        await era.printAndWait(
          `「啊啊、我爱你呦………呜、不要露出这么害羞的表情啊、连我都觉得害羞了」`,
        ); // :785
        await era.printAndWait(`${target_name}红着耳朵稍稍离开了你的身体。`); // :786
        await era.printAndWait(
          `「呵呵呵、那么在你认真之前…还要好好奉仕你呢…${heart(1)}」`,
        ); // :787
      }
    } else {
      // それ以外
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「你要是命令的话我什么都做哦…就连狂王的头也可以哦？」`,
        ); // :792
        await era.printAndWait(
          `「………诶？你说那种事情怎么样都好快点把大腿打开？」`,
        ); // :793
        await era.printAndWait(`「还不信任着我？…是吗…那还真是有点悲伤呢」`); // :794
        await era.printAndWait(
          `${target_name}稍微有点悲伤的笑着、向${player_name}分开了双腿………`,
        ); // :795
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「今天也要调教吗？我不是已经完全变成你的所有物了么」`,
        ); // :797
        await era.printAndWait(
          `「可以的、忍者把身体交给主君什么的很正常…啊啊${heart(1)}」`,
        ); // :798
        await era.printAndWait(
          `${target_name}高兴的笑着，缠上了${player_name}的身体………`,
        ); // :799
      } else {
        await era.printAndWait(
          `「啊啊、我爱你呦………呜、不要露出这么害羞的表情啊、连我都觉得害羞了」`,
        ); // :801
        await era.printAndWait(`${target_name}红着耳朵稍稍离开了你的身体。`); // :802
        await era.printAndWait(
          `「哼哼哼、那么在你认真之前…还要好好奉仕你呢…${heart(1)}」`,
        ); // :803
      }
    }
    return 1;
  }
  return 0;
}

/**
 * @EVENTEND（:813-886，普通档）：调教结束时的口上。
 * 守卫（:814/:816/:820）：FLAG:7、TALENT:168、BASE:0（死亡跳过）。
 */
on(
  'EVENTEND',
  async () => {
    const target = era_flag.target;
    const target_name = chara_callname(target); // %SAVESTR:TARGET%
    const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%

    if (game.kojo.口上开关 <= 0) {
      return 0;
    }
    if (era0(`talent:${target}:168`) != 1) {
      return 0;
    }
    if (era0(`base:${target}:0`) <= 0) {
      return 0;
    }

    // :827-831 崩坏
    if (era0(`talent:${target}:9`) == 1 && game.kojo.口上开关 == 2) {
      era.drawLine(); // :828
      await era.printAndWait(`「想要哈哇大人的……」`); // :829
      await era.printAndWait(`${target_name}朝着奇怪的方向嘟囔着什么………`); // :830
      return 1;

      // :833-837 反抗刻印Lv3+爱無
    } else if (
      era0(`mark:${target}:3`) == 3 &&
      era0(`talent:${target}:76`) == 0 &&
      era0(`talent:${target}:85`) == 0
    ) {
      era.drawLine(); // :834
      await era.printAndWait(`「………呸」`); // :835
      await era.printAndWait(
        `${target_name}朝着${player_name}的方向吐了口口水………`,
      ); // :836
      return 1;

      // :840-844 屈服刻印Lv1以下+爱無
    } else if (
      era0(`mark:${target}:2`) <= 1 &&
      era0(`talent:${target}:76`) == 0 &&
      era0(`talent:${target}:85`) == 0
    ) {
      era.drawLine(); // :841
      await era.printAndWait(`「唔…啊啊、肩膀的僵硬稍微好点了」`); // :842
      await era.printAndWait(
        `${target_name}说着，对着${player_name}哼了一声………`,
      ); // :843
      return 1;

      // :847-851 屈服刻印Lv2+爱無
    } else if (
      era0(`mark:${target}:2`) == 2 &&
      era0(`talent:${target}:76`) == 0 &&
      era0(`talent:${target}:85`) == 0
    ) {
      era.drawLine(); // :848
      await era.printAndWait(`「哈啊哈啊…啊……真不舒服……咕」`); // :849
      await era.printAndWait(
        `${target_name}的身体被汗濡湿了，露出艳丽的痴态………`,
      ); // :850
      return 1;

      // :854-858 屈服刻印Lv3+爱無
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      era0(`talent:${target}:76`) == 0 &&
      era0(`talent:${target}:85`) == 0
    ) {
      era.drawLine(); // :855
      await era.printAndWait(`「哈啊哈啊…你…意外的那个…温柔呢………啊………」`); // :856
      await era.printAndWait(
        `${target_name}的身体横躺着，发出了炽热的叹息声………`,
      ); // :857
      return 1;

      // :861-865 淫乱(体力500以上)
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`base:${target}:0`) >= 500
    ) {
      era.drawLine(); // :862
      await era.printAndWait(`「啊啊、还不够啊…难道是对我已经厌倦了吗………？」`); // :863
      await era.printAndWait(
        `${target_name}还有余力的样子，在床上画着圈圈闹变扭………`,
      ); // :864
      return 1;

      // :867-871 淫乱(体力500未満)
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`base:${target}:0`) <= 500
    ) {
      era.drawLine(); // :868
      await era.printAndWait(
        `「哈啊哈啊…更多…你的阴茎…啊啊…啊啊…想要${heart(1)}」`,
      ); // :869
      await era.printAndWait(`${target_name}筋疲力尽的躺在床上………`); // :870
      return 1;

      // :874-878 爱慕(体力500以上)
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`base:${target}:0`) >= 500
    ) {
      era.drawLine(); // :875
      await era.printAndWait(
        `「哈啊哈啊…明明…我的身体还可以继续让你随便弄………」`,
      ); // :876
      await era.printAndWait(`${target_name}躺在床上………`); // :877
      return 1;

      // :880-884 爱慕(体力500未満)
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`base:${target}:0`) <= 500
    ) {
      era.drawLine(); // :881
      await era.printAndWait(
        `「啊啊…在我的身体上满足了吗？那样的话真是开心啊…下一次…啊…疼爱我吧………」`,
      ); // :882
      await era.printAndWait(`${target_name}筋疲力尽的躺在床上………`); // :883
      return 1;
    }
    return 0;
  },
  TIER.NORMAL,
);

/**
 * @KOJO_MESSAGE_COM_8（:891-5442）：指令执行时的口上。
 *
 * 七道头部守卫（源文顺序，见文件头）之后按 SELECTCOM 平铺。骨架阶段：
 * 51 个分支各自占位（stub_line），随本票后续提交逐段填充。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（[0, n) 整数；缺省
 *   均匀随机，测试注入定值序）
 * @returns {Promise<number>} 0（RETURN 0；TRYCALLFORM 不读返回值）
 */
async function kojo_message_com_8(rand) {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const kojo = chara(target).kojo;
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const palam = (i) => era0(`palam:${target}:${i}`) || 0;
  const delta = (i) => era0(`delta:${target}:${i}`) || 0;

  // :893-894 助手が調教した時に口上をスキップする
  if (era_flag.assi > 0 && era_flag.assiplay) {
    return 0;
  }
  // :896-897 口塞着用時は口上をスキップする
  if (era0(`tequip:${target}:45`) && era_flag.selectcom != 45) {
    return 0;
  }
  // :899-900 失神時は口上をスキップする
  if (era0('tflag:899')) {
    return 0;
  }
  // :902-905 兽奸PLAY中は専用口上
  if (era0(`tequip:${target}:89`)) {
    await dog_kojo_8(rand); // :903 CALL DOG_KOJO_8
    return 0;
  }
  // :907-910 死斗场中は専用口上
  if (era0(`tequip:${target}:55`)) {
    await colosseum_kojo_8(); // :908 CALL COLOSSEUM_KOJO_8
    return 0;
  }
  // :912-913 崩坏した場合は口上をスキップする
  if (era0(`talent:${target}:9`) == 1) {
    return 0;
  }
  // :915-916 触手調教中は口上をスキップする
  if (era0(`tequip:${target}:90`)) {
    return 0;
  }

  if (era_flag.selectcom == 0) {
    // :923-968 爱撫 CFLAG:301
    if (kojo.爱抚 == 0) {
      // :925-935 初めて
      if (era0(`mark:${target}:2`) >= 2) {
        await era.printAndWait(`「呵呵呵…就像稍微强一点的按摩一样呢」`); // :928
        await era.printAndWait(`「嗯…啊…啊哈哈…好痒啊」`); // :929
      } else {
        await era.printAndWait(`「真恶心…话说你有好好洗过手吗？」`); // :932
      }
      kojo.爱抚 = 1; // :934 CFLAG:301 = 1
      return 0;
    }
    // :937-967 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :939-943 淫乱
      await era.printAndWait(
        `「再用力点…啊啊${heart(1)}…胸…啊嗯…抓着…啊${heart(1)}」`,
      ); // :940
      await era.printAndWait(
        `「啊…欺负人…这么想挑逗我吗？ 啊…啊啊………${heart(1)}」`,
      ); // :941
      await era.printAndWait(
        `${target_name}被${player_name}爱抚着，腰部扭动了起来………`,
      ); // :942
      kojo.爱抚 = 6; // :943 CFLAG:301 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.爱抚 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :945-949 爱慕
      await era.printAndWait(`「啊嗯…嗯…继续摸也可以哟…啊啊${heart(1)}」`); // :946
      await era.printAndWait(
        `${target_name}被${player_name}爱抚的发出了可爱的声音。`,
      ); // :947
      await era.printAndWait(
        `「我的身体怎么样…啊啊…这双温柔的手…喜欢…${heart(1)}」`,
      ); // :948
      kojo.爱抚 = 5; // :949 CFLAG:301 = 5
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      (kojo.爱抚 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :951-954 屈服刻印Lv3
      await era.printAndWait(`「哈啊…啊啊…嗯…啊、好舒服…哈啊…啊啊…♪」`); // :952
      await era.printAndWait(
        `${target_name}被${player_name}爱抚的发出了很舒服的声音………`,
      ); // :953
      kojo.爱抚 = 4; // :954 CFLAG:301 = 4
    } else if (
      era0(`mark:${target}:2`) == 2 &&
      (kojo.爱抚 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :956-959 屈服刻印Lv2
      await era.printAndWait(
        `「哈啊哈啊…你的按摩也开始变得不错起来了…嗯…嗯~」`,
      ); // :957
      await era.printAndWait(
        `${target_name}被${player_name}爱抚的发出了忍耐着的声音………`,
      ); // :958
      kojo.爱抚 = 3; // :959 CFLAG:301 = 3
    } else if (
      era0(`mark:${target}:2`) <= 1 &&
      (kojo.爱抚 <= 1 || game.kojo.口上开关 == 2)
    ) {
      // :961-964 それ以外
      await era.printAndWait(`「摸爽了就赶快松手」`); // :962
      await era.printAndWait(
        `${target_name}被${player_name}爱抚着，但是一脸阴沉………`,
      ); // :963
      kojo.爱抚 = 2; // :964 CFLAG:301 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 1) {
    // :973-1012 舔阴 CFLAG:302
    if (kojo.舔阴 == 0) {
      // :975-985 初めて
      if (era0(`talent:${target}:0`) == 1) {
        await era.printAndWait(
          `「呵呵呵、知道了吗？我还是处女呢…嗯…嗯…因为是处女所以兴奋了吗、啊啊…那么用力…！」`,
        ); // :978
        await era.printAndWait(
          `${player_name}开始舔着${target_name}散发着处女味道的秘裂………`,
        ); // :979
      } else {
        await era.printAndWait(`「嗯…啊啊…你也经常舔那些别的女人吧…啊…唔！」`); // :982
      }
      kojo.舔阴 = 1; // :984 CFLAG:302 = 1
      return 0;
    }
    // :987-1011 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.舔阴 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :989-993 淫乱
      await era.printAndWait(
        `「呵呵呵、我这么美味吗？那么…嗯…热心的…啊~啊${heart(1)}」`,
      ); // :990
      await era.printAndWait(
        `${target_name}被${player_name}舔着秘裂、腰淫荡的摇着，手压着${player_name}的头部。`,
      ); // :991
      await era.printAndWait(
        `「啊啊…不能逃哦、在我去之前…都要不停地舔…啊啊${heart(1)}」`,
      ); // :992
      kojo.舔阴 = 5; // :993 CFLAG:302 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.舔阴 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :995-999 爱慕
      await era.printAndWait(`「啊啊…多舔舔我…啊嗯…嗯…再…深点…啊啊！」`); // :996
      await era.printAndWait(
        `${target_name}被${player_name}舔着秘裂发出了淫荡的声音。`,
      ); // :997
      await era.printAndWait(
        `「嗯…嗯嗯！…你的舌头…好舒服啊…啊啊…啊啊${heart(1)}」`,
      ); // :998
      kojo.舔阴 = 4; // :999 CFLAG:302 = 4
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      (kojo.舔阴 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :1001-1004 屈服刻印Lv3
      await era.printAndWait(
        `「啊嗯…啊嗯…嗯…唔…啊啊！ 哈啊…啊…变得更舒服了…嗯！」`,
      ); // :1002
      await era.printAndWait(
        `${target_name}脸颊通红，被${player_name}舔着秘裂，露出了喘息声………`,
      ); // :1003
      kojo.舔阴 = 3; // :1004 CFLAG:302 = 3
    } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 == 2) {
      // :1006-1009 それ以外（屈服刻印Lv3未満）
      await era.printAndWait(`「唔…啊啊…唔…呜…！简直跟狗一样的舔法…啊啊！」`); // :1007
      await era.printAndWait(
        `${target_name}扭动着腰想要从${player_name}的嘴边逃开、就那样被${player_name}压住了腰………`,
      ); // :1008
      kojo.舔阴 = 2; // :1009 CFLAG:302 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 2) {
    // :1018-1069 阿纳尔爱撫 CFLAG:303
    if (kojo.肛门爱抚 == 0) {
      // :1020-1029 初めて
      if (era0(`abl:${target}:3`) >= 3) {
        await era.printAndWait(`「啊…啊~啊！菊花…嗯…啊哈…好舒服…啊啊…啊啊！」`); // :1022
        await era.printAndWait(
          `${target_name}被开发了的肛门因为${player_name}的爱抚，反应很敏感………`,
        ); // :1023
      } else {
        await era.printAndWait(`「啊…那、那里…很脏…呀…不、不要…啊啊！」`); // :1025
        await era.printAndWait(
          `${target_name}因为被${player_name}粗暴的爱抚着肛门而不禁发出了悲鸣………`,
        ); // :1026
      }
      kojo.肛门爱抚 = 1; // :1028 CFLAG:TARGET:303 = 1
      return 0;
    }
    // :1031-1068 二回目以降
    {
      const P = palam(3) + delta(3); // :1032 P = PALAM:3 + UP:3
      if (
        era0(`talent:${target}:76`) == 1 &&
        P >= era0('palamlv:2') &&
        (kojo.肛门爱抚 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :1034-1039 淫乱+润滑Lv2以上
        await era.printAndWait(
          `「啊…啊啊…再摸摸我的肛门吧${heart(1)} 嗯…好舒服${heart(1)}」`,
        ); // :1035
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「哈啊哈啊…啊啊…更多…更多…侵犯我的菊花吧…啊啊…要发疯了${heart(1)}」`,
          ); // :1037
        }
        await era.printAndWait(
          `${target_name}被${player_name}爱抚着发出了娇艳的声音………`,
        ); // :1038
        kojo.肛门爱抚 = 7; // :1039 CFLAG:303 = 7
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        P < era0('palamlv:2') &&
        (kojo.肛门爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1041-1044 淫乱+润滑Lv2未満
        await era.printAndWait(
          `「嗯…啊嗯…不要那么粗暴的对待我的肛门…啊…咕！」`,
        ); // :1042
        await era.printAndWait(
          `${target_name}的肛门润滑度貌似不足。${target_name}发出了痛苦的声音………`,
        ); // :1043
        kojo.肛门爱抚 = 6; // :1044 CFLAG:303 = 6
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        P >= era0('palamlv:2') &&
        (kojo.肛门爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1046-1051 爱慕+润滑Lv2以上
        await era.printAndWait(
          `「啊…啊啊…我的肛门…嗯…好舒服…啊…啊啊${heart(1)}」`,
        ); // :1047
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「哈啊…啊啊…继续${heart(1)} 继续…欺负我的肛门吧${heart(1)}」`,
          ); // :1049
        }
        await era.printAndWait(
          `${target_name}被${player_name}爱抚着肛门发出了娇艳的声音………`,
        ); // :1050
        kojo.肛门爱抚 = 5; // :1051 CFLAG:303 = 5
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        P < era0('palamlv:2') &&
        (kojo.肛门爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1053-1056 爱慕+润滑Lv2未満
        await era.printAndWait(
          `「嗯…啊啊…虽、虽然欺负我的肛门也可以…不过再稍微温柔一点啊…啊、嗯！」`,
        ); // :1054
        await era.printAndWait(
          `${target_name}的肛门润滑度貌似不足。${target_name}发出了痛苦的声音………`,
        ); // :1055
        kojo.肛门爱抚 = 4; // :1056 CFLAG:303 = 4
      } else if (
        P >= era0('palamlv:2') &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.肛门爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1058-1061 润滑Lv2以上＋A感覚Lv3以上
        await era.printAndWait(
          `「啊啊…嗯…啊…啊…我、我的肛门…啊啊…变的奇怪了…嗯…唔！」`,
        ); // :1059
        await era.printAndWait(
          `${target_name}的肛门下流的收缩着、${player_name}的爱抚使得她的腰不停的晃动着………`,
        ); // :1060
        kojo.肛门爱抚 = 3; // :1061 CFLAG:303 = 3
      } else if (kojo.首次耻情Lv2 <= 1 || game.kojo.口上开关 == 2) {
        // :1063-1066 それ以外（爱無し、润滑Lv2未満、A感覚Lv3未満；源 CFLAG:223，非
        // CFLAG:303，1:1 保留原作寻址）
        await era.printAndWait(`「咕…呜…不、不要…啊啊…不要啊！」`); // :1064
        await era.printAndWait(
          `${player_name}爱抚着${target_name}花蕾般的肛门、而${target_name}则用悲鸣来回应………`,
        ); // :1065
        kojo.肛门爱抚 = 2; // :1066 CFLAG:303 = 2
      }
    }
    return 0;
  } else if (era_flag.selectcom == 3) {
    // :1075-1178 自慰 CFLAG:304
    if (kojo.自慰 == 0) {
      // :1077-1081 初めて
      await era.printAndWait(`「哈啊哈啊…啊…啊啊…嗯…哈啊哈啊…啊…嗯！」`); // :1078
      await era.printAndWait(
        `${target_name}闭着眼睛自慰着、好像是在想着谁似得………`,
      ); // :1079
      kojo.自慰 = 1; // :1080 CFLAG:TARGET:304 = 1
      return 0;
    }
    // :1083-1177 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`talent:${target}:0`) == 1 &&
      (kojo.自慰 <= 8 || game.kojo.口上开关 == 2)
    ) {
      // :1085-1089 淫乱＋处女
      await era.printAndWait(`「啊…快点让我变成你的东西…啊…啊啊${heart(1)}」`); // :1086
      await era.printAndWait(
        `${target_name}还没有尝过男人的秘裂发出了激烈的水流的声音。`,
      ); // :1087
      await era.printAndWait(
        `「已经那么放松了…已经准备好了哦？　快点品尝味道吧…啊…嗯………${heart(1)}」`,
      ); // :1088
      kojo.自慰 = 9; // :1089 CFLAG:304 = 9
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:31`) >= 3 &&
      (kojo.自慰 <= 7 || game.kojo.口上开关 == 2)
    ) {
      // :1091-1106 淫乱＋自慰中毒Lv3以上（RAND:3 三选一）
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「啊啊…哈啊…啊啊…嗯…自慰好舒服…啊嗯…啊啊${heart(1)}」`,
        ); // :1094
        await era.printAndWait(
          `${target_name}娇喘着继续自慰、发出着马上就要绝顶了似的水流声`,
        ); // :1095
        await era.printAndWait(
          `「哈啊哈啊…啊啊…啊啊…去…要去了…啊啊…啊啊~${heart(1)}」`,
        ); // :1096
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「我、我的…自慰…一直看着…啊啊啊请看着吧${heart(1)}」`,
        ); // :1098
        await era.printAndWait(
          `${target_name}双腿分的很开诱惑着${player_name}十分艳丽的摇着腰部。`,
        ); // :1099
        await era.printAndWait(
          `「啊啊…嗯…哈啊…啊…啊…${heart(1)} 啊啊…哈啊哈啊…侵犯我吧…${heart(1)}」`,
        ); // :1100
      } else {
        await era.printAndWait(`「啊…嗯…自慰被看着…啊啊${heart(1)}」`); // :1102
        await era.printAndWait(
          `${target_name}黑色的眼睛淫荡的濡湿了、沉迷在自慰中。`,
        ); // :1103
        await era.printAndWait(
          `「哈啊哈啊…啊…啊…唔…啊啊~${heart(1)} 我…我…要变得…更奇怪了…啊啊${heart(1)}」`,
        ); // :1104
      }
      kojo.自慰 = 8; // :1106 CFLAG:304 = 8
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:31`) < 3 &&
      (kojo.自慰 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // :1108-1117 淫乱＋自慰中毒Lv3未満（RAND:2 二选一）
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「啊啊…比起这个…更想要你的那个…嗯…嗯嗯${heart(1)}」`,
        ); // :1111
        await era.printAndWait(
          `${target_name}这么说着，但是熟练的自慰还在继续………`,
        ); // :1112
      } else {
        await era.printAndWait(
          `「哈啊哈啊…啊啊…果然自慰好舒服…啊…啊啊${heart(1)}」`,
        ); // :1114
        await era.printAndWait(`${target_name}发出着激烈的水声继续自慰着………`); // :1115
      }
      kojo.自慰 = 7; // :1117 CFLAG:304 = 7
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`talent:${target}:0`) == 1 &&
      (kojo.自慰 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :1119-1123 爱＋处女
      await era.printAndWait(
        `「啊啊…不要再这样欺负我了…啊…啊啊…啊啊${heart(1)}」`,
      ); // :1120
      await era.printAndWait(`「明明知道我还是处女，还让我做这种事情…啊啊…」`); // :1121
      await era.printAndWait(
        `${target_name}一脸不开心的样子对着${player_name}用手指撑开自己的处女穴自慰着………`,
      ); // :1122
      kojo.自慰 = 6; // :1123 CFLAG:304 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:31`) >= 3 &&
      (kojo.自慰 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :1125-1140 爱＋自慰中毒Lv3以上（RAND:3 三选一）
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「哈、啊、啊啊${heart(1)} 嗯…好棒…好棒啊…啊啊…我的自慰…有好好的看着吗？啊、啊啊${heart(1)}」`,
        ); // :1128
        await era.printAndWait(
          `${target_name}呼出了微热的吐息。有了以前的调教，现在已经完全中毒了的样子。`,
        ); // :1129
        await era.printAndWait(
          `「嗯…啊啊…我…我…啊啊啊…啊嗯…啊哈…啊啊${heart(1)}」`,
        ); // :1130
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「嗯…啊啊…啊…唔、啊哈、嗯${heart(1)} 自慰停不下来啊…啊啊${heart(1)}」`,
        ); // :1132
        await era.printAndWait(
          `${target_name}手指动作渐渐激烈起来、确实的向着自己舒服的地方不断的爱抚着。`,
        ); // :1133
        await era.printAndWait(
          `「啊啊…我的H的地方…继续看吧…啊…啊啊${heart(1)}」`,
        ); // :1134
      } else {
        await era.printAndWait(
          `「啊呜…被你一边看着…一边被命令自慰…居然这么舒服${heart(1)}」`,
        ); // :1136
        await era.printAndWait(`${target_name}一脸淫荡的看着你自慰着。`); // :1137
        await era.printAndWait(
          `「啊啊…我…我…要去了…啊啊…被看着…啊…去了…啊啊啊啊${heart(1)}」`,
        ); // :1138
      }
      kojo.自慰 = 5; // :1140 CFLAG:304 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:31`) < 3 &&
      (kojo.自慰 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :1142-1151 爱＋自慰中毒Lv3未満（RAND:2 二选一）
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「嗯、虽然不想被你看到…不过是命令的话就没办法了…啊…嗯…啊！」`,
        ); // :1145
        await era.printAndWait(`${target_name}相当熟练的继续自慰着………`); // :1146
      } else {
        await era.printAndWait(`「呜、嗯…很舒服哦…啊…啊啊…哈啊哈啊…啊…唔！」`); // :1148
        await era.printAndWait(`${target_name}羞耻地笑着，继续自慰着………`); // :1149
      }
      kojo.自慰 = 4; // :1151 CFLAG:304 = 4
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      era0(`abl:${target}:31`) >= 1 &&
      (kojo.自慰 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :1153-1164 屈服刻印Lv3+自慰中毒Lv1以上（RAND:2 二选一）
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「啊啊…哈啊哈啊…不要看啊…啊…唔…哈、啊、啊啊嗯♪」`,
        ); // :1156
        await era.printAndWait(`${target_name}的自慰越来越激励了起来。`); // :1157
        await era.printAndWait(`「我、我…啊啊…啊…嗯…唔…啊啊…！」`); // :1158
      } else {
        await era.printAndWait(
          `「我的手指…啊啊…已经…哈…啊啊…停不下来了…啊…啊嗯♪」`,
        ); // :1160
        await era.printAndWait(
          `「哈啊哈啊…啊…啊…啊…唔…啊！！唔！！唔唔！………！！！」`,
        ); // :1161
        await era.printAndWait(
          `${target_name}的自慰越来越激励了起来、听起来好像在呼唤着谁的名字………`,
        ); // :1162
      }
      kojo.自慰 = 3; // :1164 CFLAG:304 = 3
    } else if (kojo.自慰 <= 1 || game.kojo.口上开关 == 2) {
      // :1166-1175 それ以外（爱無し、自慰中毒Lv1未満，RAND:2 二选一）
      if (rand_n(2) == 0) {
        await era.printAndWait(`「哈…啊…嗯…嗯…哈啊哈啊…啊…啊啊！」`); // :1169
        await era.printAndWait(`${target_name}非常熟练的自慰着………`); // :1170
      } else {
        await era.printAndWait(
          `「啊嗯…啊啊…啊…哈啊哈啊…啊、能不能不那么看着我…嗯」`,
        ); // :1172
        await era.printAndWait(`${target_name}一边羞耻的笑着一边自慰………`); // :1173
      }
      kojo.自慰 = 2; // :1175 CFLAG:304 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 5) {
    // :1184-1299 胸爱撫 CFLAG:306
    const milk_body =
      era0(`talent:${target}:130`) == 1 &&
      palam(5) > era0('palamlv:3') &&
      era0(`tequip:${target}:16`) == 0 &&
      era0(`tequip:${target}:15`) == 0; // :1188 母乳体质有效条件
    if (kojo.胸爱抚 == 0) {
      // :1186-1206 初めて
      if (milk_body) {
        if (era0(`talent:${target}:78`) == 1) {
          await era.printAndWait(
            `「好棒…！吸得更用力点…！吸出母乳来了…胸部舒服的要发狂了…啊啊~！」`,
          ); // :1191
        } else {
          await era.printAndWait(
            `「啊啊…从我的胸部里，母乳…啊嗯…那么吸的话…啊啊…我…我…已经…」`,
          ); // :1193
        }
      } else if (era0(`talent:${target}:78`) == 1) {
        // :1197-1201 弄乳狂
        await era.printAndWait(
          `「啊…啊啊！继续…抚摸…我的胸部…嗯…哈啊…啊…啊啊${heart(1)}」`,
        ); // :1198
        await era.printAndWait(
          `${target_name}的乳头想要爆炸了一样膨胀了起来、只是被碰到，${target_name}就会发出疯了一样的喘息声。`,
        ); // :1199
        await era.printAndWait(
          `「唔…呜…呜…啊啊啊${heart(1)} 我…已经…啊…呜…啊啊${heart(1)}」`,
        ); // :1200
        await era.printAndWait(
          `乳房被爱抚喘息的那个身姿、已经一点都看不出以前那个酷酷的女忍者的影子了………`,
        ); // :1201
      } else {
        await era.printAndWait(
          `「啊…嗯…嗯…啊…稍微温柔一点啊…我的胸部很敏感的…啊、没什么…啊、嗯！」`,
        ); // :1203
      }
      kojo.胸爱抚 = 1; // :1206 CFLAG:TARGET:306 = 1
      return 0;
    }
    // :1209-1297 二回目以降
    if (milk_body) {
      if (
        era0(`talent:${target}:78`) == 1 &&
        era0(`talent:${target}:76`) == 1 &&
        (kojo.胸爱抚 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :1213-1217 淫乱+弄乳狂
        await era.printAndWait(
          `「继续吸…我的母乳吧…啊啊${heart(1)} 要疯了，感觉要疯了${heart(1)}」`,
        ); // :1214
        await era.printAndWait(
          `${target_name}抱住了正吮吸着的${player_name}的头。`,
        ); // :1215
        await era.printAndWait(
          `「唔…唔…啊…我的母乳…被吸着…矣…呀…啊…要去了${heart(1)}」`,
        ); // :1216
        kojo.胸爱抚 = 4; // :1217 CFLAG:306 = 4
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.胸爱抚 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :1219-1223 淫乱
        await era.printAndWait(
          `「啊…没想到你会吸我的母乳呢…我…啊啊…但是、这样也挺好的…嗯嗯${heart(1)}」`,
        ); // :1220
        await era.printAndWait(
          `${target_name}被${player_name}吸着母乳，发出了粗重的鼻息。`,
        ); // :1221
        await era.printAndWait(`「啊…嗯…嗯…啊啊…被吸着母乳…好棒${heart(1)}」`); // :1222
        kojo.胸爱抚 = 7; // :1223 CFLAG:306 = 7
      } else if (
        era0(`talent:${target}:78`) == 1 &&
        era0(`talent:${target}:85`) == 1 &&
        (kojo.胸爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1225-1229 爱慕+弄乳狂
        await era.printAndWait(
          `「啊啊…继续吸没关系的…嘴不要离开乳头…啊啊…啊${heart(1)}」`,
        ); // :1226
        await era.printAndWait(
          `${target_name}抱住了正吮吸着的${player_name}的头。`,
        ); // :1227
        await era.printAndWait(
          `「哈啊…呀…我已经…要去…要去了…啊啊${heart(1)}」`,
        ); // :1228
        kojo.胸爱抚 = 6; // :1229 CFLAG:306 = 6
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1231-1235 爱慕
        await era.printAndWait(
          `「呵呵呵…这么吸的话…给婴儿的份就不够了哦…啊啊${heart(1)}」`,
        ); // :1232
        await era.printAndWait(
          `${target_name}抚摸着吮吸着的${player_name}的头出了神。`,
        ); // :1233
        await era.printAndWait(
          `「嗯…嗯…啊啊…哈啊…好舒服…好棒…继续吸…吸吧…${heart(1)}」`,
        ); // :1234
        kojo.胸爱抚 = 5; // :1235 CFLAG:306 = 5
      } else if (
        era0(`talent:${target}:78`) == 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1237-1241 弄乳狂
        await era.printAndWait(
          `「嗯…！继续吸吧…！吸着母乳…胸部好像要发狂了~~~~…啊啊！」`,
        ); // :1238
        await era.printAndWait(
          `${player_name}用嘴唇咬着${target_name}好像要破裂似得勃起的乳头。`,
        ); // :1239
        await era.printAndWait(`「啊啊…我…我…只是胸部被吸着就要去了…啊啊！」`); // :1240
        kojo.胸爱抚 = 4; // :1241 CFLAG:306 = 4
      } else if (
        era0(`abl:${target}:1`) >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1243-1247 B感覚Lv3以上
        await era.printAndWait(
          `「啊啊…嗯…不行啊…这么吸我的母乳的话…啊啊！我…太舒服了要去了…啊啊…啊…」`,
        ); // :1244
        await era.printAndWait(
          `${target_name}已经彻底勃起的乳头被${player_name}吸着，流出了母乳。`,
        ); // :1245
        await era.printAndWait(`「哈…啊…啊啊…啊…再继续的话…啊啊」`); // :1246
        kojo.胸爱抚 = 3; // :1247 CFLAG:306 = 3
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        // :1249-1252 それ以外（爱無し、B感覚Lv3未満）
        await era.printAndWait(
          `「啊啊…从我的胸部里，母乳…啊啊…那么吸的话…啊啊…我…我…已经…」`,
        ); // :1250
        await era.printAndWait(
          `${target_name}被${player_name}吸着母乳，反应很敏感的样子………`,
        ); // :1251
        kojo.胸爱抚 = 2; // :1252 CFLAG:306 = 2
      }
    } else {
      if (
        era0(`talent:${target}:78`) == 1 &&
        era0(`talent:${target}:76`) == 1 &&
        (kojo.胸爱抚 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :1256-1260 淫乱+弄乳狂
        await era.printAndWait(
          `「啊${heart(1)} 像要榨取…我的胸部那样…继续…啊啊…弄的乱七八糟吧${heart(1)}」`,
        ); // :1257
        await era.printAndWait(
          `${target_name}被${player_name}像要留下痕迹那样抓着胸部，发出了快乐的声音。`,
        ); // :1258
        await era.printAndWait(
          `「啊啊…${heart(1)} 啊啊…啊啊${heart(1)} 这个…好棒${heart(1)} 脑袋里面好像要融化一样${heart(1)}」`,
        ); // :1259
        kojo.胸爱抚 = 4; // :1260 CFLAG:306 = 4
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.胸爱抚 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :1262-1266 淫乱
        await era.printAndWait(
          `「我的胸部…啊啊…如果是你的话不管怎么样…嗯…啊啊…嗯${heart(1)}」`,
        ); // :1263
        await era.printAndWait(
          `${target_name}被${player_name}爱抚着胸部发出了灼热的吐息。`,
        ); // :1264
        await era.printAndWait(
          `「啊啊…舒服得…好像要飞起来一样…啊啊…更多…${heart(1)}」`,
        ); // :1265
        kojo.胸爱抚 = 7; // :1266 CFLAG:306 = 7
      } else if (
        era0(`talent:${target}:78`) == 1 &&
        era0(`talent:${target}:85`) == 1 &&
        (kojo.胸爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1268-1272 爱慕+弄乳狂
        await era.printAndWait(
          `「继续揉我的胸部…啊…呀${heart(1)} 再用力点…啊啊…要坏掉了${heart(1)}」`,
        ); // :1269
        await era.printAndWait(
          `${target_name}的被${player_name}大力的揉着胸部，好像要昏过去了一样。`,
        ); // :1270
        await era.printAndWait(
          `「啊啊…啊${heart(1)} 嗯…好…棒…啊啊${heart(1)} 啊啊${heart(1)}」`,
        ); // :1271
        kojo.胸爱抚 = 6; // :1272 CFLAG:306 = 6
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1274-1278 爱慕
        await era.printAndWait(
          `「虽然我的胸部因为比较碍事所以一直都用布缠起来…啊啊…如果你要摸的话以后就不缠了…嗯…啊嗯${heart(1)}」`,
        ); // :1275
        await era.printAndWait(
          `${target_name}被${player_name}爱抚着胸部发出了灼热的吐息。`,
        ); // :1276
        await era.printAndWait(
          `「哈啊哈啊…嗯…继续…我的胸部…乳房…叫什么都好…啊啊…让我舒服吧……${heart(1)}」`,
        ); // :1277
        kojo.胸爱抚 = 5; // :1278 CFLAG:306 = 5
      } else if (
        era0(`talent:${target}:78`) == 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1280-1284 弄乳狂
        await era.printAndWait(
          `「啊…啊啊！我的…胸部…继续抚摸吧…嗯…哈…啊…${heart(1)}」`,
        ); // :1281
        await era.printAndWait(
          `${target_name}乳头像要爆炸一样膨胀着，只是轻触就让${target_name}发出了狂乱的声音。`,
        ); // :1282
        await era.printAndWait(
          `「唔………啊啊啊~~${heart(1)} 我…唔…呀……啊啊啊${heart(1)}」`,
        ); // :1283
        kojo.胸爱抚 = 4; // :1284 CFLAG:306 = 4
      } else if (
        era0(`abl:${target}:1`) >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1286-1290 B感覚Lv3以上
        await era.printAndWait(
          `「啊…嗯…啊啊…胸部…好舒服…我的胸部…变得奇怪了…啊啊！」`,
        ); // :1287
        await era.printAndWait(
          `${target_name}只是被${player_name}抚摸着胸部，就露出了快要融化似的表情。`,
        ); // :1288
        await era.printAndWait(`「啊！更多的…抚摸我的胸部…啊…」`); // :1289
        kojo.胸爱抚 = 3; // :1290 CFLAG:306 = 3
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        // :1292-1295 それ以外（爱無し、B感覚Lv3未満）
        await era.printAndWait(
          `「啊…嗯…嗯咕…哈啊哈啊…确实的进攻我的弱点，不愧是魔王呢…啊…！」`,
        ); // :1293
        await era.printAndWait(
          `${target_name}被${player_name}爱抚着胸部，反应很敏感的样子………`,
        ); // :1294
        kojo.胸爱抚 = 2; // :1295 CFLAG:306 = 2
      }
    }
    return 0;
  } else if (era_flag.selectcom == 6) {
    // :1305-1376 接吻 CFLAG:307
    if (kojo.接吻 == 0 && era0('tflag:13')) {
      // :1307-1327 初吻（主人调教）
      if (
        era0(`talent:${target}:76`) == 1 &&
        era_flag.assi == 0 &&
        era0(`tequip:${target}:89`) == 0 &&
        era0(`tequip:${target}:90`) == 0
      ) {
        // :1309-1314 淫乱かつ主人
        await era.printAndWait(
          `「嗯…啾…啾…嗯…${heart(1)} 嗯…不行、不要离开…嗯…啾…${heart(1)}」`,
        ); // :1310
        await era.printAndWait(
          `${target_name}用手臂转动着${player_name}的头像是在说“不要离开”那样，舌头缠在一起。`,
        ); // :1311
        await era.printAndWait(
          `「哈${heart(1)} …啾${heart(1)} …啾${heart(1)} …哈…」`,
        ); // :1312
        await era.printAndWait(
          `「怎么样？我的初吻的味道…还不过瘾的话…要不要再来？」`,
        ); // :1313
        await era.printAndWait(
          `${target_name}舔了舔沾满唾液的嘴唇、眼睛一片湿润的看着${player_name}`,
        ); // :1314
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era_flag.assi == 0 &&
        era0(`tequip:${target}:89`) == 0 &&
        era0(`tequip:${target}:90`) == 0
      ) {
        // :1316-1320 爱かつ主人
        await era.printAndWait(
          `「嗯…哈啊…哈啊…呵呵呵、这是我的初吻哦…是什么味道啊？」`,
        ); // :1317
        await era.printAndWait(`${target_name}抱着${player_name}说着。`); // :1318
        await era.printAndWait(
          `「很意外吧、但是是真的哦…如果无法不相信的话…嗯…嗯…啾…啾…呵呵、那我就单单不和你接吻好了…${heart(1)}」`,
        ); // :1319
        await era.printAndWait(
          `然后${target_name}又一次和${player_name}接了吻………`,
        ); // :1320
      } else {
        // :1322-1324 それ以外
        await era.printAndWait(`「嗯…咕…别这样…为什么第一次是你…！」`); // :1323
        await era.printAndWait(
          `${target_name}和${player_name}嘴唇分开后抹了抹嘴角………`,
        ); // :1324
      }
      kojo.接吻 = 1; // :1326 CFLAG:307 = 1
      return 0;
    } else if (kojo.接吻 == 0) {
      // :1329-1348 （調教で）初めて
      if (era0(`talent:${target}:76`) == 1) {
        // :1331-1335 淫乱
        await era.printAndWait(
          `「嗯…啾……嗯…${heart(1)} …不行、不要离开…嗯……${heart(1)}」`,
        ); // :1332
        await era.printAndWait(
          `${target_name}用手臂转动着${player_name}的头像是在说“不要离开”那样，舌头缠在一起。`,
        ); // :1333
        await era.printAndWait(
          `「嗯……${heart(1)} …啾${heart(1)} …恩${heart(1)} …嗯…${heart(1)}」`,
        ); // :1334
        await era.printAndWait(
          `${target_name}舔了舔沾满唾液的嘴唇、眼睛一片湿润的看着${player_name}………`,
        ); // :1335
      } else if (era0(`talent:${target}:85`) == 1) {
        // :1337-1341 爱慕
        await era.printAndWait(
          `「嗯…哈啊…哈啊…呵呵呵、我的嘴唇…是什么味道？」`,
        ); // :1338
        await era.printAndWait(`${target_name}抱着${player_name}说着。`); // :1339
        await era.printAndWait(`「啊、不过瘾吗？ 那再来…再继续吧…呐？」`); // :1340
        await era.printAndWait(
          `然后${target_name}又一次和${player_name}接了吻………`,
        ); // :1341
      } else {
        // :1343-1345 それ以外
        await era.printAndWait(`「嗯、呼…快…离开…唔…从我嘴里把你的………」`); // :1344
        await era.printAndWait(
          `${target_name}和${player_name}嘴唇分开后抹了抹嘴角………`,
        ); // :1345
      }
      kojo.接吻 = 1; // :1347 CFLAG:307 = 1
      return 0;
    }
    // :1350-1375 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.接吻 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :1352-1356 淫乱
      await era.printAndWait(
        `「我的嘴唇…好吃吗？…啊…那就给你更好吃的吧${heart(1)} 嗯…啾…啾…嗯${heart(1)}」`,
      ); // :1353
      await era.printAndWait(
        `${target_name}发出着啪嗒啪嗒的声音和${player_name}接着吻。两人口腔里都是黏黏的唾液。`,
      ); // :1354
      await era.printAndWait(
        `「嗯啾…啾…哈啊…哈啊…哇啊…啊…喜欢${heart(1)} …继续接吻吧…继续吻我…${heart(1)}」`,
      ); // :1355
      kojo.接吻 = 5; // :1356 CFLAG:307 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.接吻 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :1358-1362 爱慕
      await era.printAndWait(
        `「啊…嗯…继续吻我…啊…吻我…已经…嗯…啾…啾…哈啊${heart(1)}」`,
      ); // :1359
      await era.printAndWait(`${target_name}和${player_name}不停的吻在一起。`); // :1360
      await era.printAndWait(
        `「嗯…啊…已经迷上了…和你接吻…嗯…啊…哈${heart(1)}」`,
      ); // :1361
      kojo.接吻 = 4; // :1362 CFLAG:307 = 4
    } else if (
      era0(`abl:${target}:10`) >= 2 &&
      (kojo.接吻 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :1364-1367 顺从Lv2以上
      await era.printAndWait(`「哈啊哈啊…嗯…咕…哈啊…啾…嗯啾…」`); // :1365
      await era.printAndWait(
        `${target_name}接受着${player_name}的吻，舌头缠绕在了一起………`,
      ); // :1366
      kojo.接吻 = 3; // :1367 CFLAG:307 = 3
    } else if (kojo.接吻 <= 1 || game.kojo.口上开关 == 2) {
      // :1369-1372 それ以外
      await era.printAndWait(`「呜…呜呜…嘴唇…果然很不舒服…啊…呜！」`); // :1370
      await era.printAndWait(
        `${player_name}把${target_name}抱在怀里，不停的亲吻着………`,
      ); // :1371
      kojo.接吻 = 2; // :1372 CFLAG:307 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 7) {
    // :1381-1448 自己扒开 CFLAG:308
    if (kojo.自己扒开 == 0) {
      // :1383-1407 初めて
      const virgin_hidden =
        era0(`talent:${target}:0`) == 1 && era0(`exp:${target}:0`) == 0; // :1390 TALENT:0==1 && EXP:0==0（处女且未破处）
      if (era0(`talent:${target}:76`) == 1) {
        // :1385-1391 淫乱
        await era.printAndWait(
          `「我的小穴…看啊…啊…这个小穴随便你怎么弄哦…啊啊${heart(1)}」`,
        ); // :1386
        await era.printAndWait(
          `${target_name}大大的张开自己的大腿、用手指分开着自己的小穴。`,
        ); // :1387
        await era.printAndWait(
          `然后${target_name}对${player_name}的视线起了反应，从蜜裂里流出了蜜汁。`,
        ); // :1388
        await era.printAndWait(
          `「啊啊…我的小穴…只是被看着就好有感觉${heart(1)}」`,
        ); // :1389
        if (virgin_hidden) {
          await era.printAndWait(
            `「啊啊…难道说是想看我的处女膜？ 那么…啊啊、再打开一点哦…啊${heart(1)}」`,
          ); // :1391
        }
      } else if (era0(`talent:${target}:85`) == 1) {
        // :1393-1398 爱慕
        await era.printAndWait(
          `「啊啊…你真是好色的啊…但是如果是你的话不管做什么都没关系的…啊啊${heart(1)}」`,
        ); // :1394
        await era.printAndWait(
          `${target_name}大大的张开自己的大腿、用手指分开着自己的小穴。`,
        ); // :1395
        await era.printAndWait(
          `「继续看…继续看我的小穴吧…已经…变的黏糊糊了${heart(1)}」`,
        ); // :1396
        if (virgin_hidden) {
          await era.printAndWait(
            `「能看我的处女膜吗？呵呵呵、我一直期待着你能把它夺走呢………」`,
          ); // :1398
        }
      } else {
        // :1400-1405 それ以外（爱無し）
        await era.printAndWait(`「唔…屈辱啊…这个样子………」`); // :1401
        await era.printAndWait(
          `${target_name}大大的张开自己的大腿、用手指分开着自己的小穴。脸上因为羞耻而十分红润。`,
        ); // :1402
        await era.printAndWait(`「笨、笨蛋…”漂亮”是什么意思啊…呜！」`); // :1403
        if (virgin_hidden) {
          await era.printAndWait(
            `「诶、你说看见了处女膜？ 开、开什么玩笑！只打开那么一点怎么可能看见…！」`,
          ); // :1405
        }
      }
      kojo.自己扒开 = 1; // :1407 CFLAG:TARGET:308 = 1
      return 0;
    }
    // :1410-1446 二回目以降（源作各分支误写为 CFLAG:306，1:1 保留原作寻址）
    const virgin_hidden =
      era0(`talent:${target}:0`) == 1 && era0(`exp:${target}:0`) == 0; // TALENT:0==1 && EXP:0==0
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.胸爱抚 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :1412-1419 淫乱
      await era.printAndWait(
        `「我的小穴…你专用的小穴…${heart(1)} 多看看啊…啊啊${heart(1)}」`,
      ); // :1413
      await era.printAndWait(
        `${target_name}大大的张开自己的大腿、用手指分开着自己的小穴。`,
      ); // :1414
      await era.printAndWait(
        `然后对${player_name}的视线起了反应，从蜜裂里流出了蜜汁。`,
      ); // :1415
      await era.printAndWait(
        `「这个黏糊糊${heart(1)} 咕啾咕啾${heart(1)} 的小穴想要你的阴茎想要得不得了${heart(1)}」`,
      ); // :1416
      if (virgin_hidden) {
        await era.printAndWait(
          `「啊啊…难道说是想看我的处女膜？ 那么…啊啊、再打开一点哦…啊${heart(1)}」`,
        ); // :1418
      }
      kojo.胸爱抚 = 5; // :1419 CFLAG:306 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :1421-1428 爱慕
      await era.printAndWait(
        `「唔…啊啊…看着我的小穴…${heart(1)} 只要想到你在看…啊啊${heart(1)}」`,
      ); // :1422
      await era.printAndWait(
        `${target_name}大大的张开自己的大腿、用手指分开着自己的小穴。`,
      ); // :1423
      await era.printAndWait(`然后${player_name}为了更好地看着提了提上半身。`); // :1424
      await era.printAndWait(`「继续看着我黏糊糊的小穴……啊啊${heart(1)}」`); // :1425
      if (virgin_hidden) {
        await era.printAndWait(
          `「能看我的处女膜吗？呵呵呵、我一直期待着你能把它夺走呢………」`,
        ); // :1427
      }
      kojo.胸爱抚 = 4; // :1428 CFLAG:306 = 4
    } else if (
      era0(`abl:${target}:17`) >= 3 &&
      (kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :1430-1436 露出癖Lv3以上
      await era.printAndWait(
        `「哈啊哈啊…啊…我的那里…仔细看吧…啊啊…嗯……很漂亮吧…你不是说过吗…啊啊」`,
      ); // :1431
      await era.printAndWait(
        `${target_name}打开了自己的蜜裂、${player_name}为了更好地看着提了提上半身。`,
      ); // :1432
      await era.printAndWait(
        `「啊…我的…啊啊…小穴…看着小穴…哈…啊啊…有感觉了♪」`,
      ); // :1433
      if (virgin_hidden) {
        await era.printAndWait(`「唔嗯…也看看我的处女膜…啊啊…！」`); // :1435
      }
      kojo.胸爱抚 = 3; // :1436 CFLAG:306 = 3
    } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
      // :1438-1444 それ以外（爱無し、露出癖Lv3未満）
      await era.printAndWait(
        `「哈啊…哈啊……不用继续摆这个姿势了吧？ 诶、还有5分钟？唔…呜…饶、饶了我吧…啊啊！」`,
      ); // :1439
      await era.printAndWait(
        `${target_name}服从着${player_name}那屈辱的命令。`,
      ); // :1440
      await era.printAndWait(`「啊、啊啊…我已经………」`); // :1441
      if (virgin_hidden) {
        await era.printAndWait(
          `「我的处女膜很漂亮什么的…别说这么明显的假话…啊啊！」`,
        ); // :1443
      }
      kojo.胸爱抚 = 2; // :1444 CFLAG:306 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 8) {
    // :1453-1495 插入手指 CFLAG:309
    if (kojo.插入手指 == 0) {
      // :1455-1467 初めて
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「嗯啊…我的小穴…被你的手指…啊啊…好深…好棒${heart(1)}」`,
        ); // :1458
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`talent:${target}:85`) == 1
      ) {
        await era.printAndWait(
          `「啊…啊啊…你的手指…嗯…好深…啊啊…好棒…${heart(1)}」`,
        ); // :1461
      } else {
        await era.printAndWait(
          `「嗯…唔…你的手指…再稍微温柔一点啊…啊啊…！啊、这么深…啊啊！」`,
        ); // :1464
      }
      kojo.插入手指 = 1; // :1466 CFLAG:TARGET:309 = 1
      return 0;
    }
    // :1469-1493 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.插入手指 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :1471-1475 淫乱
      await era.printAndWait(
        `「继续在我的女阴里搅动…啊啊${heart(1)} 被你弄得乱七八糟了${heart(1)}」`,
      ); // :1472
      await era.printAndWait(
        `${target_name}被${player_name}爱抚着阴道深处，发出着娇喘`,
      ); // :1473
      await era.printAndWait(`「嗯…啊…小穴…小穴舒服${heart(1)}」`); // :1474
      kojo.插入手指 = 5; // :1475 CFLAG:309 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`mark:${target}:2`) == 3 &&
      (kojo.插入手指 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :1477-1481 爱＋屈服刻印Lv3
      await era.printAndWait(
        `「啊啊…你…嗯…啊啊啊…我的小学里面…嗯…啊${heart(1)}」`,
      ); // :1478
      await era.printAndWait(
        `${target_name}被${player_name}爱抚着阴道深处，发出着娇喘`,
      ); // :1479
      await era.printAndWait(
        `「啊…啊啊…你的手指…嗯…好深…啊…啊啊啊…好棒…${heart(1)}」`,
      ); // :1480
      kojo.插入手指 = 4; // :1481 CFLAG:309 = 4
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      (kojo.插入手指 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :1483-1486 屈服刻印Lv3
      await era.printAndWait(`「嗯…啊…咕…啊啊——！我…这么…啊啊…啊啊——！」`); // :1484
      await era.printAndWait(
        `${target_name}被${player_name}搅动着阴道，悲鸣着`,
      ); // :1485
      await era.printAndWait(`「咕…嗯…在稍微温柔…一点…啊」`); // :1486
      kojo.插入手指 = 3; // :1487 CFLAG:309 = 3
    } else if (kojo.插入手指 <= 1 || game.kojo.口上开关 == 2) {
      // :1489-1490 それ以外
      await era.printAndWait(`「我的…啊啊啊…那里…被这样玩弄的话…咕…啊！」`); // :1490
      kojo.插入手指 = 2; // :1491 CFLAG:309 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 9) {
    // :1500-1541 舔肛 CFLAG:310
    if (kojo.舔肛 == 0) {
      // :1502-1512 初めて
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊嗯…继续舔…我的肛门…啊啊…好舒服${heart(1)}」`,
        ); // :1505
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「啊啊…我的…我的屁股…啊…明明很脏的…啊…停下…啊啊～！${heart(1)}」`,
        ); // :1508
      } else {
        await era.printAndWait(
          `「嗯…嗯…啊啊…快住…快助手啊！…我的…那个地方…啊啊明明很脏的！」`,
        ); // :1511
      }
      kojo.舔肛 = 1; // :1513 CFLAG:TARGET:310 = 1
      return 0;
    }
    // :1516-1540 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.舔肛 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :1518-1522 淫乱
      await era.printAndWait(
        `「啊嗯…好舒服…好舒服啊${heart(1)} 继续舔…我的肛门吧${heart(1)}」`,
      ); // :1519
      await era.printAndWait(
        `${player_name}如${target_name}所愿的那样，肛门的皱褶每一根都舔到了`,
      ); // :1520
      await era.printAndWait(
        `「啊嗯…嗯…嗯啊…我的肛门…好吃吗？那就继续舔吧${heart(1)}」`,
      ); // :1521
      kojo.舔肛 = 5; // :1522 CFLAG:310 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.舔肛 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :1524-1527 爱慕（源尾附「sao」，为源文件遗留字符，1:1 保留）
      await era.printAndWait(
        `「不、不行啊…屁股被你…啊…这么舔的话，我…要变得奇怪了…嗯…啊嗯${heart(1)}」sao`,
      ); // :1525
      await era.printAndWait(
        `${player_name}舔着${target_name}的肛门，因为舌头扫过一窈窕皱褶而发出甜美的呻吟。`,
      ); // :1526
      await era.printAndWait(
        `「啊嗯…啊啊…我的屁股…要变得奇怪了…啊啊…嗯…啊啊嗯，${heart(1)}」`,
      ); // :1527
      kojo.舔肛 = 4; // :1528 CFLAG:310 = 4
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      (kojo.舔肛 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :1530-1532 屈服刻印Lv3
      await era.printAndWait(`「嗯…啊嗯…啊啊…嗯、啊…我、我已经…我…啊啊」`); // :1531
      await era.printAndWait(
        `${target_name}一边发出很害羞的声音，一边被${player_name}舔着肛门………`,
      ); // :1532
      kojo.舔肛 = 3; // :1533 CFLAG:310 = 3
    } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 == 2) {
      // :1535-1537 それ以外（屈服刻印Lv3未満）
      await era.printAndWait(
        `「哈…嗯…嗯…不、不要再这样了…啊啊…我的屁股…啊啊快停下啊！」`,
      ); // :1536
      await era.printAndWait(
        `${player_name}用舌头让${target_name}紧固的花蕾一点点开始变习惯了………`,
      ); // :1537
      kojo.舔肛 = 2; // :1538 CFLAG:310 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 10) {
    // :1547-1589 振动宝石 CFLAG:311
    if (kojo.振动宝石 == 0) {
      // :1549-1560 初めて
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「那是我的…敏感部位…继续…啊啊${heart(1)}」`); // :1552
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`talent:${target}:85`) == 1
      ) {
        await era.printAndWait(
          `「啊…嗯…啊…${heart(1)} 好舒服啊…啊啊啊${heart(1)}」`,
        ); // :1555
      } else {
        await era.printAndWait(
          `「嗯…这个稍微有点痒啊…啊嗯…已、已经…嗯…啊啊！」`,
        ); // :1558
      }
      kojo.振动宝石 = 1; // :1560 CFLAG:TARGET:311 = 1
      return 0;
    }
    // :1563-1588 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.振动宝石 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :1565-1568 淫乱
      await era.printAndWait(`「那是我的…敏感部位…继续…啊啊${heart(1)}」`); // :1566
      await era.printAndWait(
        `${target_name}振动宝石贴住阴蒂的刺激让她发出了娇喘`,
      ); // :1567
      await era.printAndWait(
        `「啊啊啊,我的阴蒂${heart(1)} 啊啊啊啊啊${heart(1)} 做更多舒服的事情吧${heart(1)}」`,
      ); // :1568
      kojo.振动宝石 = 5; // :1569 CFLAG:311 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`mark:${target}:2`) == 3 &&
      (kojo.振动宝石 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :1571-1574 爱＋屈服刻印Lv3
      await era.printAndWait(
        `「啊嗯…啊…啊嗯…${heart(1)} 好舒服…啊，啊啊啊…${heart(1)}」`,
      ); // :1572
      await era.printAndWait(
        `${target_name}敏感部分被振动宝石贴着，露出了甜美的娇喘`,
      ); // :1573
      await era.printAndWait(
        `「哈…哈…啊…嗯…啊嗯${heart(1)} 啊啊啊…啊——${heart(1)}」`,
      ); // :1574
      kojo.振动宝石 = 4; // :1575 CFLAG:311 = 4
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      (kojo.振动宝石 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :1577-1580 屈服刻印Lv3
      await era.printAndWait(`「啊…嗯…这个…好舒服啊…啊嗯…啊…啊啊！」`); // :1578
      await era.printAndWait(
        `${target_name}振动宝石贴住阴蒂的刺激让她发出激烈的娇喘`,
      ); // :1579
      await era.printAndWait(`「但是我的阴蒂…才…才不会有什么感觉呢……哼」`); // :1580
      kojo.振动宝石 = 3; // :1581 CFLAG:311 = 3
    } else if (kojo.振动宝石 <= 1 || game.kojo.口上开关 == 2) {
      // :1583-1585 それ以外
      await era.printAndWait(`「嗯…这个稍微有点痒啊…啊嗯…已、已经…嗯…啊啊！」`); // :1584
      await era.printAndWait(
        `${target_name}敏感部分被振动宝石贴着而发出了叫声`,
      ); // :1585
      kojo.振动宝石 = 2; // :1586 CFLAG:311 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 11 && era0(`tequip:${target}:11`)) {
    // :1596-1654 壶虫 CFLAG:312（開始時）
    if (kojo.壶虫 == 0) {
      // :1598-1624 初めて
      if (era0(`talent:${target}:0`) == 1) {
        // :1600-1610 处女
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「啊嗯…呜…真是毫不留情啊你…啊啊！我的第一次居然就这样给了这种蠕虫…咕！」`,
          ); // :1603
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「我的…第一次…啊啊啊…竟然这么过分……咕……！」`); // :1606
        } else {
          await era.printAndWait(
            `「啊啊啊…我的…我的第一次…是这种下等的蠕虫…呜…啊啊！」`,
          ); // :1609
        }
      } else {
        // :1612-1622 非处女
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「嗯啊嗯啊…好棒…蠕虫钻入了我的阴道…啊啊啊${heart(1)}」`,
          ); // :1615
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「啊…啊啊…蠕虫在我里面…嗯…插进来了…啊嗯」`); // :1618
        } else {
          await era.printAndWait(
            `「嗯…这种蠕虫…根本就不可能进来吧…嗯啊啊啊！」`,
          ); // :1621
        }
      }
      kojo.壶虫 = 1; // :1624 CFLAG:312 = 1
      return 0;
    }
    // :1627-1653 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.壶虫 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :1629-1634 淫乱
      if (era0(`abl:${target}:2`) >= 3) {
        await era.printAndWait(
          `「啊啊啊…小穴…我的小穴被蠕虫钻入了…啊啊啊…啊哈${heart(1)}」`,
        ); // :1631
        await era.printAndWait(
          `「再…深点…插进去…啊嗯…不要掉出来…啊啊${heart(1)}」`,
        ); // :1632
      }
      await era.printAndWait(
        `${target_name}小穴深处蠕虫的攻击，让她数次发出微小的呻吟`,
      ); // :1633
      kojo.壶虫 = 5; // :1634 CFLAG:312 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.壶虫 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :1636-1641 爱慕
      if (era0(`abl:${target}:2`) >= 3) {
        await era.printAndWait(
          `「啊啊啊，我的小穴…被蠕虫钻入了..啊啊啊${heart(1)}」`,
        ); // :1638
        await era.printAndWait(`「插，插进来这么深的话…啊啊…会拔不出来的」`); // :1639
      }
      await era.printAndWait(`${target_name}小穴被蠕虫插入着，发出了呻吟声。`); // :1640
      kojo.壶虫 = 4; // :1641 CFLAG:312 = 4
    } else if (
      era0(`abl:${target}:2`) >= 3 &&
      (kojo.壶虫 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :1643-1646 V感覚Lv3以上
      await era.printAndWait(`${target_name}蠕虫深深的插入小穴`); // :1644
      await era.printAndWait(
        `「哈啊…啊啊啊…我的…我的那里…好舒服…嗯…我居然会对蠕虫的插入有感觉…啊啊啊」`,
      ); // :1645
      kojo.壶虫 = 3; // :1646 CFLAG:312 = 3
    } else if (kojo.壶虫 <= 1 || game.kojo.口上开关 == 2) {
      // :1648-1651 それ以外
      await era.printAndWait(`「啊啊啊…不要欺负…我那里啊……啊啊啊…啊！」`); // :1649
      await era.printAndWait(`${target_name}被蠕虫刺进了小穴深处………`); // :1650
      kojo.壶虫 = 2; // :1651 CFLAG:312 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 11 && era0(`tequip:${target}:11`) == 0) {
    // :1656-1670 壶虫 脱着時 CFLAG:372
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.壶虫着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「哈哈…蠕虫也很舒服呢…呵呵呵${heart(1)}」`); // :1659
      kojo.壶虫着脱 = 3; // :1660 CFLAG:372 = 3
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.壶虫着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「啊啊…啊啊…下次想要你的………」`); // :1663
      kojo.壶虫着脱 = 2; // :1664 CFLAG:372 = 2
    } else if (kojo.壶虫着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「啊…啊啊啊…我的那里…啊啊……」`); // :1667
      kojo.壶虫着脱 = 1; // :1668 CFLAG:372 = 1
    }
    return 0;
  } else if (era_flag.selectcom == 12) {
    // :1676-1718 振动杖 CFLAG:313
    if (kojo.振动杖 == 0) {
      // :1678-1689 初めて
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊啊，这个拷问道具让我高潮到快疯了${heart(1)} 啊啊…啊啊啊啊${heart(1)}」`,
        ); // :1681
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「啊啊啊，被…被你做这样的事情的话，我马上就…嗯…啊${heart(1)}」`,
        ); // :1684
      } else {
        await era.printAndWait(
          `「啊…啊啊…这种…振动的话我…啊啊…应该有办法…嗯…咕！」`,
        ); // :1687
      }
      kojo.振动杖 = 1; // :1689 CFLAG:313 = 1
      return 0;
    }
    // :1692-1717 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.振动杖 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :1694-1698 淫乱
      await era.printAndWait(
        `「啊啊啊…哈…哈…用那个杖把我的小穴弄坏吧…啊啊啊${heart(1)}」`,
      ); // :1695
      await era.printAndWait(`${target_name}张开大腿，挺起腰贴到了振动杖上`); // :1696
      await era.printAndWait(
        `「啊嗯嗯啊${heart(1)} 这种振动好舒服…我的小穴要坏了${heart(1)}」`,
      ); // :1697
      kojo.振动杖 = 5; // :1698 CFLAG:313 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.振动杖 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :1700-1704 爱慕
      await era.printAndWait(
        `「不，不要这样欺负我啊…啊…嗯…啊…啊啊${heart(1)}」`,
      ); // :1701
      await era.printAndWait(
        `${target_name}脸上浮现着抱怨的神情，但振动杖稍微靠近就让她发出呻吟。`,
      ); // :1702
      await era.printAndWait(
        `「嗯…把我的…啊啊…我的小穴…弄得更舒服吧${heart(1)} 啊啊！”」`,
      ); // :1703
      kojo.振动杖 = 4; // :1704 CFLAG:313 = 4
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      (kojo.振动杖 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :1706-1709 屈服刻印Lv3
      await era.printAndWait(`「嗯…咕…嗯…振动…我的那里…啊啊！」`); // :1707
      await era.printAndWait(`${target_name}紧闭着眼睛皱着眉，抵抗着快感`); // :1708
      await era.printAndWait(
        `可是那淫靡的震动却确实的不断给予着${target_name}的身体快乐的波浪………`,
      ); // :1709
      kojo.振动杖 = 3; // :1710 CFLAG:313 = 3
    } else if (kojo.振动杖 <= 1 || game.kojo.口上开关 == 2) {
      // :1712-1714 それ以外
      await era.printAndWait(`「啊啊…我的…那里…变得…要变得…奇怪了…停下…啊！」`); // :1713
      await era.printAndWait(`${target_name}振动杖的刺激让她发出悲鸣`); // :1714
      kojo.振动杖 = 2; // :1715 CFLAG:313 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 13 && era0(`tequip:${target}:13`)) {
    // :1725-1783 肛门虫 CFLAG:314（開始時）
    if (kojo.肛门虫 == 0) {
      // :1727-1747 初めて
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊，我的肛门…正在被蠕虫侵犯…啊啊啊…好舒服${heart(1)}」`,
        ); // :1730
        await era.printAndWait(`蠕虫往${target_name}的肛门里钻去……`); // :1731
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「嗯…啊啊…我的肛门…嗯…嗯…被这种蠕虫钻进来…啊…啊啊——！」`,
        ); // :1734
        await era.printAndWait(`${target_name}因为肛门被蠕虫钻入而发出悲鸣……`); // :1735
      } else if (era0(`abl:${target}:3`) >= 3) {
        // :1739-1741 それ以外·A感覚Lv3以上
        await era.printAndWait(
          `「呀，啊啊啊…我的肛门……啊哈啊…被蠕虫插得这么舒服什么的…啊啊啊…咕」`,
        ); // :1740
        await era.printAndWait(
          `${target_name}的肛门把蠕虫吞了进去，像要配合${target_name}的娇喘一样，蠕虫不停的颤动着。`,
        ); // :1741
      } else {
        await era.printAndWait(`「停，停下，把这么肮脏的蠕虫…放进来…啊啊啊」`); // :1743
        await era.printAndWait(
          `${target_name}因为肛门被塞入蠕虫而发出痛苦的声音${player_name}让肛门虫前后动着`,
        ); // :1744
      }
      kojo.肛门虫 = 1; // :1747 CFLAG:TARGET:314 = 1
      return 0;
    }
    // :1750-1782 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.肛门虫 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // :1752-1755 淫乱＋A感覚Lv3以上
      await era.printAndWait(
        `「嗯…啊嗯${heart(1)} 肛门好舒服……我的肛门要变成性器了……要变成肛门小穴了${heart(1)}」`,
      ); // :1753
      await era.printAndWait(
        `${target_name}一边说着淫荡的话一边在肛门被蠕虫侵犯的快感中颤抖着`,
      ); // :1754
      kojo.肛门虫 = 6; // :1755 CFLAG:314 = 6
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.肛门虫 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :1757-1759 淫乱
      await era.printAndWait(
        `「啊啊啊！我的肛门…嗯…正在被蠕虫侵犯着…好舒服啊${heart(1)}」`,
      ); // :1758
      await era.printAndWait(`蠕虫往${target_name}的肛门里钻去……`); // :1759
      kojo.肛门虫 = 6; // :1760 CFLAG:314 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.肛门虫 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :1762-1764 爱＋A感覚Lv3以上
      await era.printAndWait(
        `「啊嗯…啊啊…蠕虫…进来了…被我的屁眼…全部吞下去了……${heart(1)}」`,
      ); // :1763
      await era.printAndWait(
        `${target_name}因为肛门太有感觉了而带着艳丽的表情看着肛门里的蠕虫……`,
      ); // :1764
      kojo.肛门虫 = 5; // :1765 CFLAG:314 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.肛门虫 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :1767-1769 爱慕
      await era.printAndWait(
        `「嗯…啊，我的肛门…嗯…嗯…被蠕虫插进来了…啊…啊啊——！」`,
      ); // :1768
      await era.printAndWait(`${target_name}因为肛门被插进了蠕虫而发出悲鸣……`); // :1769
      kojo.肛门虫 = 4; // :1770 CFLAG:314 = 4
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.肛门虫 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :1772-1774 A感覚Lv3以上
      await era.printAndWait(
        `「哈，啊啊啊，我的肛门…啊…啊…被蠕虫弄得什么舒服什么的…啊啊啊」`,
      ); // :1773
      await era.printAndWait(
        `${target_name}的肛门把蠕虫吞了进去，像要配合${target_name}的娇喘一样，蠕虫不停的颤动着。`,
      ); // :1774
      kojo.肛门虫 = 3; // :1775 CFLAG:314 = 3
    } else if (kojo.肛门虫 <= 1 || game.kojo.口上开关 == 2) {
      // :1777-1779 それ以外
      await era.printAndWait(
        `「不、不要…好、好难受…我的屁股要变得奇怪了…啊…啊啊——！`,
      ); // :1778
      await era.printAndWait(
        `${target_name}因为肛门被塞入蠕虫而发出痛苦的声音。像是在享受着这个声音的${player_name}让肛门虫前后动着………`,
      ); // :1779
      kojo.肛门虫 = 2; // :1780 CFLAG:314 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 13 && era0(`tequip:${target}:13`) == 0) {
    // :1785-1803 肛门虫 脱着時 CFLAG:374
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.肛门虫着脱 < 4 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「啊啊…继续…继续…欺负我的肛门吧${heart(1)}」`); // :1788
      kojo.肛门虫着脱 = 4; // :1789 CFLAG:374 = 4
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.肛门虫着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「啊啊啊…我的肛门…不行了……${heart(1)}」`); // :1792
      kojo.肛门虫着脱 = 3; // :1793 CFLAG:374 = 3
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.肛门虫着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「啊啊，肛门…啊嗯…火辣辣的」`); // :1796
      kojo.肛门虫着脱 = 2; // :1797 CFLAG:374 = 2
    } else if (kojo.肛门虫着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「啊啊…我的肛门…嗯…奇怪了………」`); // :1800
      kojo.肛门虫着脱 = 1; // :1801 CFLAG:374 = 1
    }
    return 0;
  } else if (era_flag.selectcom == 14 && era0(`tequip:${target}:14`)) {
    // :1810-1845 阴蒂夹 CFLAG:315（開始時）
    if (kojo.阴蒂夹 == 0) {
      // :1812-1824 初めて
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊啊…这么刺激阴蒂的话…会在你面前漏出不像样的阿黑颜啊…啊啊呀${heart(1)}」`,
        ); // :1815
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「又要这样欺负我吗？啊啊…啊…被这样夹住的话…啊啊${heart(1)}」`,
        ); // :1818
      } else {
        await era.printAndWait(
          `「因、因为这种拷问道具而有感觉什么的…啊啊…啊…我的阴蒂…这样…啊啊！」`,
        ); // :1821
        await era.printAndWait(
          `夹着${target_name}的阴蒂阴蒂夹毫不留情的给予着${target_name}快感`,
        ); // :1822
      }
      kojo.阴蒂夹 = 1; // :1824 CFLAG:315 = 1
      return 0;
    }
    // :1827-1844 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.阴蒂夹 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :1829-1831 淫乱
      await era.printAndWait(
        `「啊嗯…啊啊嗯${heart(1)} 继续欺负我的阴蒂吧…啊嗯…啊啊${heart(1)}」`,
      ); // :1830
      await era.printAndWait(
        `夹住${target_name}的阴蒂的电动阴蒂夹的刺激让${target_name}的脑袋陶醉了…`,
      ); // :1831
      kojo.阴蒂夹 = 4; // :1832 CFLAG:315 = 4
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.阴蒂夹 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :1834-1836 爱慕
      await era.printAndWait(
        `「坏，坏心眼…我明明被你触碰才最有感觉，却还用这种东西，啊啊啊${heart(1)}」`,
      ); // :1835
      await era.printAndWait(`${target_name}因为电动阴蒂夹而发出甜美的呻吟`); // :1836
      kojo.阴蒂夹 = 3; // :1837 CFLAG:315 = 3
    } else if (kojo.阴蒂夹 <= 1 || game.kojo.口上开关 == 2) {
      // :1839-1841 それ以外
      await era.printAndWait(`「啊啊…不要再欺负我的阴蒂了…啊…啊啊——！」`); // :1840
      await era.printAndWait(
        `${target_name}的双膝因为被被装上电动阴蒂夹而相互摩擦着，就这样昏了过去`,
      ); // :1841
      kojo.阴蒂夹 = 2; // :1842 CFLAG:315 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 14 && era0(`tequip:${target}:14`) == 0) {
    // :1847-1861 阴蒂夹 脱着時 CFLAG:375
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.阴蒂夹着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「嗯…哈…哈…啊啊…我的脑袋好像变得奇怪了………」`); // :1850
      kojo.阴蒂夹着脱 = 3; // :1851 CFLAG:375 = 3
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.阴蒂夹着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「啊啊…我的阴蒂变得很奇怪了吗？」`); // :1854
      kojo.阴蒂夹着脱 = 2; // :1855 CFLAG:375 = 2
    } else if (kojo.阴蒂夹着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「哈啊…哈啊…我…已经………」`); // :1858
      kojo.阴蒂夹着脱 = 1; // :1859 CFLAG:375 = 1
    }
    return 0;
  } else if (era_flag.selectcom == 15 && era0(`tequip:${target}:15`)) {
    // :1868-1920 乳头夹 CFLAG:316（開始時）
    if (kojo.乳头夹 == 0) {
      // :1870-1882 初めて
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊…乳头${heart(1)} 我的乳头…要融化了${heart(1)}」`,
        ); // :1873
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「啊…这…这个不行的…我…我已经…啊…嗯…呜！」`); // :1876
      } else {
        await era.printAndWait(`「啊…乳头不行…这个、快点拿掉…啊…呜啊啊啊！」`); // :1879
        await era.printAndWait(
          `${target_name}的乳头被乳头夹轻轻夹住，${target_name}发出了悲鸣………`,
        ); // :1880
      }
      kojo.乳头夹 = 1; // :1882 CFLAG:316 = 1
      return 0;
    }
    // :1885-1919 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`talent:${target}:78`) == 1 &&
      (kojo.乳头夹 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // :1887-1890 淫乱+弄乳狂
      await era.printAndWait(
        `「啊…呼…我已经…变的奇怪了…乳头变的奇怪了${heart(1)}」`,
      ); // :1888
      await era.printAndWait(
        `${target_name}的乳头想要爆炸了似的勃起着、那夹子咬住的乳头通红的充着血。`,
      ); // :1889
      await era.printAndWait(`「啊…啊啊…再这样做的话乳头要融化了${heart(1)}」`); // :1890
      kojo.乳头夹 = 7; // :1891 CFLAG:316 = 7
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.乳头夹 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :1893-1895 淫乱
      await era.printAndWait(
        `「啊…乳头好舒服${heart(1)} 我的乳头…要融化了${heart(1)}」`,
      ); // :1894
      await era.printAndWait(`${target_name}因为被乳头夹夹住而发出了娇喘………`); // :1895
      kojo.乳头夹 = 6; // :1896 CFLAG:316 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`talent:${target}:78`) == 1 &&
      (kojo.乳头夹 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :1898-1901 爱慕+弄乳狂
      await era.printAndWait(
        `「我的乳头…啊啊${heart(1)} 不行了…${heart(1)} 啊…啊啊…变的那么大了${heart(1)}」`,
      ); // :1899
      await era.printAndWait(
        `${target_name}的乳头想要爆炸了似的勃起着、那夹子咬住的乳头通红的充着血。`,
      ); // :1900
      await era.printAndWait(`「哈、哈啊…哈啊…继续…欺负乳头吧…${heart(1)}」`); // :1901
      kojo.乳头夹 = 5; // :1902 CFLAG:316 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.乳头夹 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :1904-1906 爱慕
      await era.printAndWait(`「啊…这…这个不行的…我…我已经…啊…嗯…呜！」`); // :1905
      await era.printAndWait(`${target_name}因为被乳头夹夹住而发出了娇喘………`); // :1906
      kojo.乳头夹 = 4; // :1907 CFLAG:316 = 4
    } else if (
      era0(`talent:${target}:78`) == 1 &&
      (kojo.乳头夹 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :1909-1911 弄乳狂
      await era.printAndWait(
        `「啊啊…我的乳头要融化了…再、再用力点…让我更舒服吧！」`,
      ); // :1910
      await era.printAndWait(
        `${target_name}的乳头想要爆炸了似的勃起着、那夹子咬住的乳头通红的充着血。`,
      ); // :1911
      kojo.乳头夹 = 3; // :1912 CFLAG:316 = 3
    } else if (kojo.乳头夹 <= 1 || game.kojo.口上开关 == 2) {
      // :1914-1916 それ以外
      await era.printAndWait(`「嗯…啊…啊…咕…嗯…我的乳头…啊啊…太舒服了…」`); // :1915
      await era.printAndWait(`${target_name}发出了炽热的叹息声………………`); // :1916
      kojo.乳头夹 = 2; // :1917 CFLAG:316 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 15 && era0(`tequip:${target}:15`) == 0) {
    // :1922-1939 乳头夹 脱着時 CFLAG:376
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.乳头夹着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「啊啊嗯…明明还想继续被欺负乳头吧！」`); // :1925
      await era.printAndWait(`${target_name}难过的看着夹子被拿下来………`); // :1926
      kojo.乳头夹着脱 = 3; // :1927 CFLAG:376 = 3
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.乳头夹着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「下次希望是你的手来玩弄…但是………」`); // :1930
      await era.printAndWait(`${target_name}难过的看着夹子被拿下来………`); // :1931
      kojo.乳头夹着脱 = 2; // :1932 CFLAG:376 = 2
    } else if (kojo.乳头夹着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「哈啊哈啊…啊…这种东西………」`); // :1935
      await era.printAndWait(`${target_name}难过的看着夹子被拿下来………`); // :1936
      kojo.乳头夹着脱 = 1; // :1937 CFLAG:376 = 1
    }
    return 0;
  } else if (era_flag.selectcom == 16 && era0(`tequip:${target}:16`)) {
    // :1946-1999 榨乳器（母乳体质のみ） CFLAG:317（開始時）
    if (kojo.榨乳器 == 0) {
      // :1948-1962 初めて
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「哈…哈…啊…更多的榨取我的胸部吧…${heart(1)}」`); // :1951
        await era.printAndWait(
          `${target_name}因为被榨乳器强行榨乳的快感而发出了娇喘………`,
        ); // :1952
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「啊…嗯…啊…啊啊~${heart(1)} 我的胸部…这样的${heart(1)}」`,
        ); // :1955
        await era.printAndWait(
          `${target_name}因为被榨乳器强行榨乳的快感而发出了娇喘………`,
        ); // :1956
      } else {
        await era.printAndWait(`「啊嗯…啊…我的胸部…那样…嗯…啊啊啊！」`); // :1959
        await era.printAndWait(
          `${target_name}因为被榨乳器强行榨乳的感觉而发出了悲鸣………`,
        ); // :1960
      }
      kojo.榨乳器 = 1; // :1962 CFLAG:317 = 1
      return 0;
    }
    // :1965-1998 二回目以降（源作两处误写为 CFLAG:316，1:1 保留原作寻址）
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`talent:${target}:78`) == 1 &&
      (kojo.榨乳器 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :1967-1970 淫乱+弄乳狂
      await era.printAndWait(
        `「啊啊…出来了好多啊…我的胸部…啊…啊啊${heart(1)}」`,
      ); // :1968
      await era.printAndWait(
        `「真、真希望…能被这个机械一直榨取…啊…${heart(1)}」`,
      ); // :1969
      await era.printAndWait(
        `${target_name}因为被榨乳器强行榨乳的快感而发出了娇喘………`,
      ); // :1970
      kojo.榨乳器 = 7; // :1971 CFLAG:317 = 7
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.榨乳器 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :1973-1975 淫乱
      await era.printAndWait(`「哈…哈…啊…更多的榨取我的胸部吧…${heart(1)}」`); // :1974
      await era.printAndWait(
        `${target_name}因为被榨乳器强行榨乳的快感而发出了娇喘………`,
      ); // :1975
      kojo.榨乳器 = 6; // :1976 CFLAG:317 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`talent:${target}:78`) == 1 &&
      (kojo.乳头夹 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :1978-1981 爱慕+弄乳狂（源作 CFLAG:316，非 CFLAG:317）
      await era.printAndWait(
        `「我的胸部…明明不好好的给小宝宝是不行的${heart(1)} 这样的被榨取的话${heart(1)}」`,
      ); // :1979
      await era.printAndWait(
        `「啊啊…好舒服…舒服的快要发狂了…更多的榨取吧${heart(1)}」`,
      ); // :1980
      await era.printAndWait(
        `${target_name}因为被榨乳器强行榨乳的快感而发出了娇喘………`,
      ); // :1981
      kojo.榨乳器 = 5; // :1982 CFLAG:317 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.榨乳器 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :1984-1986 爱慕
      await era.printAndWait(
        `「啊…嗯…啊…啊啊~${heart(1)} 我的胸部…这样的${heart(1)}」`,
      ); // :1985
      await era.printAndWait(
        `${target_name}因为被榨乳器强行榨乳的快感而发出了娇喘………`,
      ); // :1986
      kojo.榨乳器 = 4; // :1987 CFLAG:317 = 4
    } else if (
      era0(`talent:${target}:78`) == 1 &&
      (kojo.乳头夹 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :1989-1991 弄乳狂（源作 CFLAG:316，非 CFLAG:317）
      await era.printAndWait(`「啊嗯…啊啊…啊…啊…已、已经…我…不行！」`); // :1990
      await era.printAndWait(
        `${target_name}因为被榨乳器强行榨乳的快感而发出了娇喘………`,
      ); // :1991
      kojo.榨乳器 = 3; // :1992 CFLAG:317 = 3
    } else if (kojo.榨乳器 <= 1 || game.kojo.口上开关 == 2) {
      // :1994-1996 それ以外
      await era.printAndWait(`「啊啊…啊…我的胸部…那么…嗯…呀啊！」`); // :1995
      await era.printAndWait(
        `${target_name}因为被榨乳器强行榨乳的感觉而发出了悲鸣………`,
      ); // :1996
      kojo.榨乳器 = 2; // :1997 CFLAG:317 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 16 && era0(`tequip:${target}:16`) == 0) {
    // :2002-2016 榨乳器 脱着時 CFLAG:377
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.榨乳器着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「继续…榨取胸部啊………」`); // :2005
      kojo.榨乳器着脱 = 3; // :2006 CFLAG:377 = 3
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.榨乳器着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「哈啊哈啊…继续…吸…我的胸部啊…」`); // :2009
      kojo.榨乳器着脱 = 2; // :2010 CFLAG:377 = 2
    } else if (kojo.榨乳器着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「嗯…啊…继续…做啊…」`); // :2013
      kojo.榨乳器着脱 = 1; // :2014 CFLAG:377 = 1
    }
    return 0;
  } else if (era_flag.selectcom == 19 && era0(`tequip:${target}:19`)) {
    // :2077-2138 肛珠 CFLAG:320（開始時）
    if (kojo.肛珠 == 0) {
      // :2079-2099 初めて
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「嗯…啊嗯…我的肛门…被插进去了……${heart(1)}」`); // :2082
        await era.printAndWait(
          `${target_name}因为肛门被肛珠一粒粒的插入而发出微微的喘息`,
        ); // :2083
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「啊…嗯…总觉得…感觉好奇怪啊…啊啊」`); // :2086
        await era.printAndWait(
          `${target_name}因为肛门被肛珠一粒粒的插入而发出微微的喘息`,
        ); // :2087
      } else if (era0(`abl:${target}:3`) >= 3) {
        // :2091-2093 それ以外·肛门感觉Lv3以上
        await era.printAndWait(
          `「哈啊…啊…嗯…不行啊…这样…放进去的话…啊…啊啊啊！」`,
        ); // :2092
        await era.printAndWait(
          `${target_name}因为肛门被肛珠一粒粒的插入而发出微微的喘息`,
        ); // :2093
      } else {
        await era.printAndWait(
          `「嗯…啊啊…全部都进来了…啊，喂…难道…拔出的时候…会全部…一口气抽出…啊啊！」`,
        ); // :2095
        await era.printAndWait(`直觉不错的${target_name}开始未来感到恐惧………`); // :2096
      }
      kojo.肛珠 = 1; // :2099 CFLAG:TARGET:320 = 1
      return 0;
    }
    // :2102-2137 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.肛珠 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // :2104-2107 淫乱＋A感覚Lv3以上
      await era.printAndWait(
        `「啊啊啊…快点…全都插进来…啊啊…啊…我的肛门…嗯…啊嗯${heart(1)}」`,
      ); // :2105
      await era.printAndWait(
        `${target_name}因为肛门被肛珠一粒粒的插入而发出微微的喘息`,
      ); // :2106
      await era.printAndWait(
        `「啊…啊啊…全部放进来了吧？放进来了吧？…啊啊…尽情地拉出去吧…${heart(1)}」`,
      ); // :2107
      kojo.肛珠 = 7; // :2108 CFLAG:320 = 7
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.肛珠 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :2110-2113 淫乱
      await era.printAndWait(`「嗯…啊啊…我的肛门…啊…进来了………${heart(1)}」`); // :2111
      await era.printAndWait(
        `${target_name}因为肛门被肛珠一粒粒的插入而发出微微的喘息`,
      ); // :2112
      await era.printAndWait(`「嗯啊…如果被拔出来的话…我会变的奇怪的………」`); // :2113
      kojo.肛珠 = 6; // :2114 CFLAG:320 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.肛珠 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :2116-2119 爱＋A感覚Lv3以上
      await era.printAndWait(
        `「我的肛门…嗯…被这样插进来的话…好舒服…${heart(1)}」`,
      ); // :2117
      await era.printAndWait(
        `${target_name}因为肛门被肛珠一粒粒的插入而发出微微的喘息`,
      ); // :2118
      await era.printAndWait(
        `「啊啊…好，好可怕…这样被你拔出的话，变得很奇怪的${heart(1)}」`,
      ); // :2119
      kojo.肛珠 = 5; // :2120 CFLAG:320 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.肛珠 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :2122-2125 爱慕
      await era.printAndWait(`「啊…嗯…感觉，好奇怪啊…啊啊啊」`); // :2123
      await era.printAndWait(
        `${target_name}因为肛门被肛珠一粒粒的插入而发出微微的喘息`,
      ); // :2124
      await era.printAndWait(`「啊啊…尽情…拔出来呀…啊啊………」`); // :2125
      kojo.肛珠 = 4; // :2126 CFLAG:320 = 4
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.肛珠 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :2128-2130 A感覚Lv3以上
      await era.printAndWait(
        `「快、快停下…啊啊…再继续的话…我的屁股要变得奇怪了…啊啊啊」`,
      ); // :2129
      await era.printAndWait(
        `${target_name}的肛门随着${player_name}把珠子塞进去，不停的颤抖着……`,
      ); // :2130
      kojo.肛珠 = 3; // :2131 CFLAG:320 = 3
    } else if (kojo.肛珠 <= 1 || game.kojo.口上开关 == 2) {
      // :2133-2135 それ以外
      await era.printAndWait(`「啊…不要…不要这样…不要弄坏我的屁股…啊啊啊！」`); // :2134
      await era.printAndWait(
        `${target_name}想起以前肛珠被拔出的感觉让她不自觉夹紧了肛门，但${player_name}仍然认真的把肛珠一个个的塞了进去`,
      ); // :2135
      kojo.肛珠 = 2; // :2136 CFLAG:320 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 19 && era0(`tequip:${target}:19`) == 0) {
    // :2141-2163 肛珠 脱着時 CFLAG:379
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.肛珠着脱 < 4 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「啊啊${heart(1)} …啊…啊啊………嗯…啊啊………」`); // :2144
      await era.printAndWait(`${target_name}满脸陶醉的表情流着口水………`); // :2145
      kojo.肛珠着脱 = 4; // :2146 CFLAG:379 = 4
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.肛珠着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「啊啊…我的肛门…啊啊…啊啊…好…好舒服………${heart(1)}」`,
      ); // :2149
      await era.printAndWait(`${target_name}满脸陶醉的神情`); // :2150
      kojo.肛珠着脱 = 3; // :2151 CFLAG:379 = 3
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.肛珠着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「啊…啊…啊啊啊——！！屁股…我的屁股…好舒服！」`); // :2154
      await era.printAndWait(`${target_name}高高翘起的翘起屁股并发出呻吟`); // :2155
      kojo.肛珠着脱 = 2; // :2156 CFLAG:379 = 2
    } else if (kojo.肛珠着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「啊…啊啊…啊…咕…我…我的屁股…要坏掉了………」`); // :2159
      await era.printAndWait(
        `${target_name}因为被一口气拔出肛珠的痛苦，眼睛里含着泪`,
      ); // :2160
      kojo.肛珠着脱 = 1; // :2161 CFLAG:379 = 1
    }
    return 0;
  } else if (era_flag.selectcom == 20) {
    // :2169-2350 正常位 CFLAG:321
    if (kojo.正常位 == 0) {
      // :2171-2258 初めて
      if (era0(`talent:${target}:0`) == 1) {
        // :2173-2237 处女
        if (era0(`talent:${target}:314`) == 9) {
          // :2175-2206 魔族
          if (era0(`talent:${target}:76`) == 1) {
            await era.printAndWait(
              `${player_name}分开${target_name}的双腿押着膝盖，插入的时候像为了展现给她看一样，每次都是缓缓的沉入。`,
            ); // :2178
            await era.printAndWait(
              `「啊啊啊啊…我的魔族小穴…被你的…被魔王大人的阴茎插进来了…啊啊…再深一点${heart(1)} 让我变成你的东西吧${heart(1)}」`,
            ); // :2179
            await era.printAndWait(
              `${target_name}流着口水，为了迎合${player_name}而腰上下动着腰。`,
            ); // :2180
            await era.printAndWait(
              `然后${player_name}如${target_name}所愿，贯穿了处女膜，一口气插入到最深处。`,
            ); // :2181
            await era.printAndWait(
              `「嗯…啊…啊嗯！插到…插到最深处了…你的阴茎…啊啊啊…啊…啊啊——${heart(1)}」`,
            ); // :2182
            await era.printAndWait(
              `${target_name}因为破瓜的疼痛和还不知道男性的小穴被贯穿的刺激而发出了悲鸣`,
            ); // :2183
            await era.printAndWait(
              `${player_name}紧紧地把阴茎插入深处并把魔力释放了出去`,
            ); // :2184
            await era.printAndWait(
              `已经是魔族的${target_name}的身体内部染上了${player_name}的魔力的色彩。`,
            ); // :2185
            await era.printAndWait(
              `「还想更多的感受…你的阴茎…继续…继续动啊…啊啊啊${heart(1)}」`,
            ); // :2186
          } else if (era0(`talent:${target}:85`) == 1) {
            await era.printAndWait(
              `${target_name}像是等${player_name}等得不耐烦了似的张开自己的大腿迎接着${player_name}。`,
            ); // :2189
            await era.printAndWait(`「这是我的第一次哟…魔王大人${heart(1)}」`); // :2190
            await era.printAndWait(
              `${player_name}和${target_name}抱在一起，把阴茎慢慢地插下去。`,
            ); // :2191
            await era.printAndWait(
              `「啊…啊啊…你的阴茎进来了…啊…啊啊…啊啊——！${heart(1)}」`,
            ); // :2192
            await era.printAndWait(
              `${player_name}贯穿了${target_name}的处女膜，把阴茎插进了深处了。`,
            ); // :2193
            await era.printAndWait(
              `「啊嗯…啊啊…没关系的…感觉你在我体内…啊…啊啊啊…有什么要来了…要来了！？」`,
            ); // :2194
            await era.printAndWait(
              `${player_name}紧紧地把阴茎插入深处，慢慢的放出了魔力。`,
            ); // :2195
            await era.printAndWait(
              `已经是魔族的${target_name}的身体内部染上了${player_name}的魔力的色彩。`,
            ); // :2196
            await era.printAndWait(
              `「啊啊…我…真正的成为你的东西了呢${heart(1)}」`,
            ); // :2197
          } else {
            await era.printAndWait(
              `${player_name}为了强行分开${target_name}的双腿而押着她的膝盖，插入的时候像是要展示她看一样，慢慢的挤了进去`,
            ); // :2200
            await era.printAndWait(
              `「啊…啊…咕…呜啊…呼，好粗…插进来了…啊…啊啊…啊啊——！」`,
            ); // :2201
            await era.printAndWait(
              `听着${target_name}发出的哭喊声${player_name}把她的处女膜慢慢地捅破。插在深处的阴茎慢慢的释放出了魔力。`,
            ); // :2202
            await era.printAndWait(
              `然后${target_name}的魔族的眼睛里不停流出大颗的泪珠`,
            ); // :2203
            await era.printAndWait(
              `「让我受到…这样的…屈辱…啊啊…不要…不要动啊…嗯…啊…好、好疼…啊…咕…啊啊——」`,
            ); // :2204
            await era.printAndWait(
              `${player_name}为了让${target_name}好好明白谁才是主人，慢慢的开始了抽送阴茎`,
            ); // :2205
          }
        } else if (era0(`talent:${target}:76`) == 1) {
          // :2208-2236 人間
          await era.printAndWait(
            `${player_name}分开${target_name}的双腿押着膝盖，插入的时候像为了展现给她看一样，每次都是缓缓的沉入。`,
          ); // :2211
          await era.printAndWait(
            `「啊啊啊啊…我的小穴…被你的…被魔王大人的阴茎插进来了…啊啊…再深一点${heart(1)} 让我变成你的东西吧${heart(1)}」`,
          ); // :2212
          await era.printAndWait(
            `${target_name}流着口水，为了迎合${player_name}而腰上下动着腰。`,
          ); // :2213
          await era.printAndWait(
            `然后${player_name}如${target_name}所愿，贯穿了处女膜，一口气插入到最深处。`,
          ); // :2214
          await era.printAndWait(
            `「嗯…啊啊…啊嗯——！插到…插到深处来了…你的应尽…啊啊…啊…啊啊啊——${heart(1)}」`,
          ); // :2215
          await era.printAndWait(
            `${target_name}因为破瓜的疼痛和还不知道男性的小穴被贯穿的刺激而发出了悲鸣`,
          ); // :2216
          await era.printAndWait(
            `「还想更多的感受…你的阴茎…继续…继续动啊…啊啊啊${heart(1)}」`,
          ); // :2217
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `${target_name}像是等${player_name}等得不耐烦了似的张开自己的大腿迎接着${player_name}。`,
          ); // :2220
          await era.printAndWait(`「这是我的第一次哟…魔王大人${heart(1)}」`); // :2221
          await era.printAndWait(
            `${player_name}和${target_name}抱在一起，把阴茎慢慢地插下去。`,
          ); // :2222
          await era.printAndWait(
            `「啊…啊啊…你的阴茎进来了…啊…啊啊…啊啊——！${heart(1)}」`,
          ); // :2223
          await era.printAndWait(
            `${player_name}贯穿了${target_name}的处女膜，把阴茎插进了深处了。`,
          ); // :2224
          await era.printAndWait(
            `「啊嗯…啊啊…没关系的…我已经习惯疼痛了…啊…继续动…让我感受你吧${heart(1)}」`,
          ); // :2225
          await era.printAndWait(`${player_name}听到这句话后开始慢慢的抽送`); // :2226
          await era.printAndWait(`「啊啊…我…好高兴…好幸福………${heart(1)}」`); // :2227
        } else {
          await era.printAndWait(
            `${player_name}为了强行分开${target_name}的双腿而押着她的膝盖，插入的时候像是要展示她看一样，慢慢的挤了进去`,
          ); // :2230
          await era.printAndWait(
            `「啊…啊…咕…呜啊…呼，好粗…插进来了…啊…啊啊…啊啊——！」`,
          ); // :2231
          await era.printAndWait(
            `听着${target_name}发出的哭喊声${player_name}把她的处女膜慢慢地捅破。插在深处的阴茎慢慢的释放出了魔力。`,
          ); // :2232
          await era.printAndWait(
            `然后${target_name}的眼睛里不停流出大颗的泪珠`,
          ); // :2233
          await era.printAndWait(
            `「让我受到…这样的…屈辱…啊啊…不要…不要动啊…嗯…啊…好、好疼…啊…咕…啊啊——」`,
          ); // :2234
          await era.printAndWait(
            `${player_name}像是为了给${target_name}刻上痛苦一样，慢慢的开始了抽送阴茎`,
          ); // :2235
        }
      } else if (era0(`talent:${target}:76`) == 1) {
        // :2239-2256 非处女
        await era.printAndWait(
          `${player_name}分开${target_name}的双腿押着膝盖，插入的时候像为了展现给她看一样，每次都是缓缓的沉入。`,
        ); // :2242
        await era.printAndWait(
          `「啊嗯……我的小穴被你的阴茎插进来了${heart(1)} 啊啊啊啊…啊——${heart(1)}」`,
        ); // :2243
        await era.printAndWait(
          `因为被${player_name}的阴茎插入盗深处而她露出笑容的${target_name}已经完全是色情狂了。`,
        ); // :2244
        await era.printAndWait(
          `「哈啊…更多…更多地侵犯我吧…啊啊啊${heart(1)}」`,
        ); // :2245
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「嗯…紧紧地抱住我…啊啊…更多的侵犯我的小穴吧…啊啊啊${heart(1)}」`,
        ); // :2248
        await era.printAndWait(
          `${target_name}用两条腿夹住${player_name}的腰，紧紧地抱住他。`,
        ); // :2249
        await era.printAndWait(
          `「啊…嗯…能感受到你我好高兴啊…啊…啊啊……${heart(1)}」`,
        ); // :2250
      } else {
        await era.printAndWait(
          `${player_name}为了强行分开${target_name}的双腿而押着她的膝盖，插入的时候像是要展示她看一样，慢慢的挤了进去。`,
        ); // :2253
        await era.printAndWait(`「嗯…咕…嗯…这么深…啊…啊啊！」`); // :2254
        await era.printAndWait(`「嗯咕…好深…被你插的好满…啊…啊啊啊！」`); // :2255
      }
      kojo.正常位 = 1; // :2258 CFLAG:321 = 1
      return 0;
    }
    // :2261-2349 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.正常位 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :2263-2294 淫乱（RAND:3 三选一，各臂内嵌 ABL:2 分档）
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `${player_name}分开${target_name}的双腿押着膝盖，插入的时候像为了展现给她看一样，每次都是缓缓的沉入。`,
        ); // :2265
        await era.printAndWait(
          `「啊嗯……我的小穴被你的阴茎插进来了${heart(1)} 啊啊啊啊…啊——${heart(1)}」`,
        ); // :2266
        await era.printAndWait(
          `因为被${player_name}的阴茎插入盗深处而她露出笑容的${target_name}已经完全是色情狂了。`,
        ); // :2267
        await era.printAndWait(
          `「哈啊…更多…更多地侵犯我吧…啊啊啊${heart(1)}」`,
        ); // :2268
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「啊…啊嗯${heart(1)}更多，更多的塞满我的女阴吧…嗯…啊${heart(1)}」`,
          ); // :2270
        }
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「啊啊啊…更激烈点…我要坏掉了…要坏掉了${heart(1)}」`,
        ); // :2272
        await era.printAndWait(
          `${target_name}用两条腿夹住${player_name}的腰，紧紧地抱住他。`,
        ); // :2273
        await era.printAndWait(
          `「嗯呼…到我去为止…都不会放开的…嗯…啊啊啊…嗯啊…啊啊啊${heart(1)}」`,
        ); // :2274
        await era.printAndWait(
          `${player_name}开始了抽送，${target_name}的腔壁摩擦着阴茎。`,
        ); // :2275
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「啊啊${heart(1)} 我的小穴~…已经记住你的形状了${heart(1)} 啊嗯…啊啊啊…啊…不行…我不想和你分开！…嗯…啊啊啊${heart(1)}」`,
          ); // :2277
        } else {
          await era.printAndWait(
            `「啊啊啊…再激烈点${heart(1)} 啊~…把女阴被弄得乱七八糟的…就这样记住你的阴茎的形状吧${heart(1)}」`,
          ); // :2279
        }
      } else {
        await era.printAndWait(
          `「啊…啊…嗯…你的拥抱太舒服了…我要变得奇怪了…啊${heart(1)}」`,
        ); // :2282
        await era.printAndWait(
          `${target_name}下流的分开双腿，${player_name}就这样被侵犯着她。`,
        ); // :2283
        await era.printAndWait(
          `口水从口中流了出来，每次插到深处都让她发出呻吟`,
        ); // :2284
        await era.printAndWait(
          `「嗯…嗯啊…啊…继续…继续侵犯我…我要变得奇怪了${heart(1)}」`,
        ); // :2285
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `${target_name}的秘裂不停的包裹着，催促${player_name}的阴茎射精。`,
          ); // :2287
          await era.printAndWait(
            `「啊嗯…恩…在我里面射出来…想要你的精液啊${heart(1)} ……想要啊${heart(1)}」`,
          ); // :2288
        } else {
          await era.printAndWait(
            `${target_name}用脚缠着${player_name}，发出了喘息。`,
          ); // :2290
          await era.printAndWait(
            `「啊嗯，啊…已经记住你阴茎的形状和味道了，继续侵犯我吧…啊——${heart(1)}」`,
          ); // :2291
        }
      }
      kojo.正常位 = 6; // :2294 CFLAG:321 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.正常位 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :2296-2319 爱慕（RAND:3 三选一，各臂内嵌 ABL:2 分档）
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「嗯…紧紧地抱住我…啊啊…更多的侵犯我的小穴吧…啊啊啊${heart(1)}」`,
        ); // :2298
        await era.printAndWait(
          `${target_name}用两条腿夹住${player_name}的腰，紧紧地抱住他。`,
        ); // :2299
        await era.printAndWait(
          `「啊…嗯…能感受到你我好高兴啊…啊…啊啊……${heart(1)}」`,
        ); // :2300
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「继续…来吧…让我里面满满的都是你吧…啊啊${heart(1)}」`,
          ); // :2302
        }
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `${target_name}抓着自己的膝盖分开双腿，诱惑着${player_name}。`,
        ); // :2304
        await era.printAndWait(
          `「呐…快来疼爱我吧…我的身体已经全部都是你的东西，所以不必客气哦${heart(1)} …啊…啊啊啊啊！」`,
        ); // :2305
        await era.printAndWait(
          `${player_name}和${target_name}的双手互相牵着，慢慢的开始抽送`,
        ); // :2306
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「嗯啊…啊…啊${heart(1)} 再激烈一点啊…啊啊…啊嗯…啊啊${heart(1)}」`,
          ); // :2308
        } else {
          await era.printAndWait(
            `「啊…嗯…你…好温柔呢…啊嗯…继续照你的想法的来坐也可以…啊啊啊${heart(1)}」`,
          ); // :2310
        }
      } else {
        await era.printAndWait(
          `「啊…啊啊嗯…嗯…嗯…好深…你的插到深处了…啊啊…嗯啊啊嗯${heart(1)}」`,
        ); // :2313
        await era.printAndWait(
          `${target_name}因为被${player_name}蹂躏着深处的深处而露出了快要融化一样的表情。`,
        ); // :2314
        await era.printAndWait(
          `「再…激烈一点…把我哪里搅动得黏糊糊的吧…啊啊…${heart(1)}」`,
        ); // :2315
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「啊嗯${heart(1)} …呀啊啊啊${heart(1)} …嗯…啊啊…我…被你的…啊啊、啊啊啊啊${heart(1)}」`,
          ); // :2317
        }
      }
      kojo.正常位 = 5; // :2319 CFLAG:321 = 5
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      era0(`abl:${target}:2`) >= 3 &&
      (kojo.正常位 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :2322-2333 屈服刻印Lv3＋V感覚Lv3以上（RAND:2 二选一）
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `${player_name}命令${target_name}分开双腿，插入的时候像为了展现给她看一样，每次都是缓缓的沉入。`,
        ); // :2323
        await era.printAndWait(
          `「啊啊…插进来了…你的…啊啊…啊…嗯…啊嗯…啊啊啊啊」`,
        ); // :2324
        await era.printAndWait(
          `「不、不是的…我才不…啊…啊啊啊…不可能有感觉…啊…呀啊啊啊啊！」`,
        ); // :2325
        await era.printAndWait(
          `${target_name}被${player_name}刺入深处而发出的可爱呻吟，被${player_name}高兴的听在耳里。`,
        ); // :2326
      } else {
        await era.printAndWait(
          `${player_name}分开${target_name}的双腿押着膝盖，插入的时候像为了展现给她看一样，每次都是缓缓的沉入。`,
        ); // :2328
        await era.printAndWait(
          `「嗯…嗯…只是这种程度…啊嗯♪…就以为我会成为你的东西的话…啊啊♪…就大错特错了…啊嗯」`,
        ); // :2329
        await era.printAndWait(
          `${target_name}随着抽送而发出快乐的声音，小穴紧紧包裹着${player_name}的阴茎。`,
        ); // :2330
        await era.printAndWait(
          `「啊啊…啊嗯…嗯啊啊…不行啊…这么激烈的话…啊啊——」`,
        ); // :2331
      }
      kojo.正常位 = 4; // :2333 CFLAG:321 = 4
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      (kojo.正常位 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :2336-2339 屈服刻印Lv3
      await era.printAndWait(
        `${player_name}命令${target_name}分开双腿，插入的时候像为了展现给她看一样，每次都是缓缓的沉入。`,
      ); // :2336
      await era.printAndWait(
        `「啊啊…要侵犯的话就再稍微…温柔点啊…嗯…嗯…啊啊…嗯啊…啊啊啊——！」`,
      ); // :2337
      await era.printAndWait(
        `${target_name}因为${player_name}的上面不停的动着而发出了悲鸣`,
      ); // :2338
      await era.printAndWait(`「啊…啊啊…嗯…以、已经…啊啊…啊…啊啊啊——」`); // :2339
      kojo.正常位 = 3; // :2340 CFLAG:321 = 3
    } else if (kojo.正常位 <= 1 || game.kojo.口上开关 == 2) {
      // :2342-2347 それ以外
      await era.printAndWait(
        `${player_name}为了强行分开${target_name}的双腿而押着她的膝盖，插入的时候像是要展示她看一样，慢慢的挤了进去。`,
      ); // :2343
      await era.printAndWait(`「啊…啊啊…我…被侵犯了…啊啊…啊…嗯…啊，啊啊啊！」`); // :2344
      await era.printAndWait(`${target_name}因为${player_name}抽送而发出呻吟`); // :2345
      await era.printAndWait(`「啊…哈…咕…嗯…啊啊…嗯…嗯…啊啊——！！」`); // :2346
      kojo.正常位 = 2; // :2347 CFLAG:321 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 21) {
    // :2356-2560 背后位 CFLAG:322
    if (kojo.背后位 == 0) {
      // :2358-2449 初めて
      if (era0(`talent:${target}:0`) == 1) {
        // :2360-2429 处女
        if (era0(`talent:${target}:314`) == 9) {
          // :2362-2397 魔族
          if (era0(`talent:${target}:76`) == 1) {
            await era.printAndWait(
              `${player_name}抓住${target_name}的腰慢慢的插进了她的小穴。${target_name}敏感的竖起了尾巴。`,
            ); // :2365
            await era.printAndWait(
              `「啊嗯…别那么急啦…我可是一直都在等你侵犯我啊…啊嗯${heart(1)}」`,
            ); // :2366
            await era.printAndWait(
              `${player_name}的阴茎慢慢插入了${target_name}。扑哧一声${target_name}的处女膜破了。`,
            ); // :2367
            await era.printAndWait(
              `「嗯、啊啊${heart(1)} 进来了，你的太粗了…啊啊${heart(1)} 虽然很痛不过没关系的…啊啊啊啊${heart(1)}」`,
            ); // :2368
            await era.printAndWait(
              `${target_name}因为破瓜的疼痛和连最深处都被贯穿的触感而发出了娇喘。`,
            ); // :2369
            await era.printAndWait(
              `「啊啊嗯嗯啊啊啊…啊啊嗯…快点动起来…侵犯我里面吧…啊啊啊${heart(1)}」`,
            ); // :2370
            await era.printAndWait(
              `${player_name}把阴茎插入最深处，缓缓的放出了魔力。`,
            ); // :2371
            await era.printAndWait(
              `已经是魔族的${target_name}的身体内部染上了${player_name}的魔力的色彩。`,
            ); // :2372
            await era.printAndWait(
              `「你的魔力在我体内…变热了…啊啊…嗯…啊——${heart(1)}」`,
            ); // :2373
            await era.printAndWait(`${target_name}舒服得张开了背后的翅膀。`); // :2374
            await era.printAndWait(
              `看着她这个样子，${player_name}慢慢开始抽送阴茎…`,
            ); // :2375
          } else if (era0(`talent:${target}:85`) == 1) {
            await era.printAndWait(
              `${player_name}抓住${target_name}的腰慢慢的插进了她的小穴。${target_name}敏感的竖起了尾巴。`,
            ); // :2378
            await era.printAndWait(
              `「啊嗯…啊啊…没关系…把我的…我的第一次…拿走…啊啊…快、快点…${heart(1)}」`,
            ); // :2379
            await era.printAndWait(
              `${player_name}的阴茎慢慢插入了${target_name}。扑哧一声${target_name}的处女膜破了。`,
            ); // :2380
            await era.printAndWait(
              `「嗯…啊咕…嗯你的…全部在我里面…啊嗯…啊啊…已经习惯疼痛了，所以…动起来吧…把我变成你的东西吧！」`,
            ); // :2381
            await era.printAndWait(
              `${player_name}把阴茎插入最深处，缓缓的放出了魔力。`,
            ); // :2382
            await era.printAndWait(
              `已经是魔族的${target_name}的身体内部染上了${player_name}的魔力的色彩。`,
            ); // :2383
            await era.printAndWait(
              `「你那温暖的魔力在我体内…啊…不行了，快点动起来侵犯我的里面吧…啊啊${heart(1)}」`,
            ); // :2384
            await era.printAndWait(
              `${target_name}忍耐不住的发出了恳求的声音。`,
            ); // :2385
            await era.printAndWait(
              `${player_name}默默地笑着并慢慢的用阴茎开始抽送………`,
            ); // :2386
          } else {
            await era.printAndWait(
              `${player_name}缓缓的把阴茎沉入${target_name}的阴道。${target_name}焦急的摇起了尾巴，${player_name}握住了它。`,
            ); // :2389
            await era.printAndWait(
              `「啊咕…不、不要做这种不上不下的事情…快点插进来把！…啊啊…嗯…啊啊啊」`,
            ); // :2390
            await era.printAndWait(
              `听到这句话${player_name}抓住${target_name}的腰一口气贯穿到最深处。${target_name}的处女膜扑哧一声被捅破了。`,
            ); // :2391
            await era.printAndWait(
              `「啊…啊啊…嗯…嗯啊…嗯…啊啊…这…么…痛什么的…啊咕…咕嗯」`,
            ); // :2392
            await era.printAndWait(
              `${target_name}因为破瓜的疼痛而发出了哭喊，哭喊声在${player_name}的耳边回响着。`,
            ); // :2393
            await era.printAndWait(
              `然后${player_name}的阴茎释放出的魔力从${target_name}的腔内深处开始，慢慢的侵蚀着身体内部。`,
            ); // :2394
            await era.printAndWait(
              `「嗯啊…啊啊…总觉…好温暖…明明是被侵犯…被凌辱…我要变得奇怪了…啊啊啊…」`,
            ); // :2395
            await era.printAndWait(
              `${player_name}为了让${target_name}好好明白谁才是主人，慢慢的开始了抽送阴茎`,
            ); // :2396
          }
        } else if (era0(`talent:${target}:76`) == 1) {
          // :2399-2427 人間
          await era.printAndWait(
            `${player_name}抓住${target_name}的腰，慢慢的把阴茎差劲了蜜裂。`,
          ); // :2401
          await era.printAndWait(
            `「啊嗯…别那么急啦…我可是一直都在等你侵犯我啊…啊嗯${heart(1)}」`,
          ); // :2402
          await era.printAndWait(
            `${player_name}的阴茎慢慢插入了${target_name}。扑哧一声${target_name}的处女膜破了。`,
          ); // :2403
          await era.printAndWait(
            `「嗯、啊啊${heart(1)} 进来了，你的太粗了…啊啊${heart(1)} 虽然很痛不过没关系的…啊啊啊啊${heart(1)}」`,
          ); // :2404
          await era.printAndWait(
            `${target_name}因为破瓜的疼痛和连最深处都被贯穿的触感而发出了娇喘。`,
          ); // :2405
          await era.printAndWait(
            `「啊啊嗯嗯啊啊啊…啊啊嗯…快点动起来…侵犯我里面吧…啊啊啊${heart(1)}」`,
          ); // :2406
          await era.printAndWait(
            `看着她这个样子，${player_name}慢慢开始抽送阴茎…`,
          ); // :2407
          await era.printAndWait(
            `「嗯…啊啊…不用这么慢也…啊嗯…我…想要更激烈点啊${heart(1)}」`,
          ); // :2408
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `${player_name}抓住${target_name}的腰慢慢的插进了她的小穴。${target_name}敏感的屁股颤抖了起来。`,
          ); // :2411
          await era.printAndWait(
            `「啊嗯…啊啊…没关系…把我的…我的第一次…拿走…啊啊…快、快点…${heart(1)}」`,
          ); // :2412
          await era.printAndWait(
            `${player_name}的阴茎慢慢插入了${target_name}。扑哧一声${target_name}的处女膜破了。`,
          ); // :2413
          await era.printAndWait(
            `「嗯…啊咕…嗯你的…全部在我里面…啊嗯…啊啊…已经习惯疼痛了，所以…动起来吧…把我变成你的东西吧！」`,
          ); // :2414
          await era.printAndWait(
            `${target_name}忍耐不住的恳求的声音扭动着腰，虽然${player_name}努力的压着，但是还是没压住。`,
          ); // :2415
          await era.printAndWait(
            `「求你了…侵犯我吧…啊啊…我等这一天已经很久了…啊啊——${heart(1)}」`,
          ); // :2416
          await era.printAndWait(
            `${player_name}默默地笑着并慢慢的用阴茎开始抽送………`,
          ); // :2417
          await era.printAndWait(
            `「嗯…啊嗯…你的快动起来…啊…啊啊…刺进来…啊嗯…啊啊…嗯…嗯…啊啊——${heart(1)}」`,
          ); // :2418
        } else {
          await era.printAndWait(
            `${player_name}缓缓的把阴茎沉入${target_name}的小穴。${target_name}她着急的扭着腰，所以${player_name}紧紧的抓住她的腰。`,
          ); // :2421
          await era.printAndWait(
            `「啊咕…不、不要做这种不上不下的事情…快点插进来把！…啊啊…嗯…啊啊啊」`,
          ); // :2422
          await era.printAndWait(
            `听到这句话${player_name}抓住${target_name}的腰一口气贯穿到最深处。${target_name}的处女膜扑哧一声被捅破了。`,
          ); // :2423
          await era.printAndWait(
            `「啊…啊啊…嗯…嗯啊…嗯…啊啊…这…么…痛什么的…啊咕…咕嗯」`,
          ); // :2424
          await era.printAndWait(
            `${target_name}因为破瓜的疼痛而发出了哭喊，哭喊声在${player_name}的耳边回响着`,
          ); // :2425
          await era.printAndWait(
            `「啊啊啊啊…我的…第一次就这样…嗯…还、还不要动…啊啊…不要」`,
          ); // :2426
          await era.printAndWait(
            `${player_name}为了让${target_name}好好的清楚谁是主人，阴茎再次开始抽送`,
          ); // :2427
        }
      } else if (era0(`talent:${target}:76`) == 1) {
        // :2431-2447 非处女
        await era.printAndWait(
          `「嗯…从我后面侵犯我吧…嗯啊…啊嗯…阴茎好棒…你的阴茎好棒啊${heart(1)}」`,
        ); // :2434
        await era.printAndWait(
          `${target_name}为了让${player_name}更加容易侵犯一样，高高抬起了腰。`,
        ); // :2435
        await era.printAndWait(
          `「嗯…啊啊…这、这样…这样好舒服…更多的侵犯我吧${heart(1)}」`,
        ); // :2436
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「啊…从后面什么的…看不到你的脸好可怕…啊嗯…啊…啊啊嗯${heart(1)}」`,
        ); // :2439
        await era.printAndWait(
          `${target_name}被${player_name}从后面抓住双臂，就那样侵犯着。`,
        ); // :2440
        await era.printAndWait(
          `「嗯…啊…啊啊…不行…的啊…要是更激烈的话…我…就会…啊啊——」`,
        ); // :2441
      } else {
        await era.printAndWait(
          `「哼…男的都喜欢从后面侵犯女人呢…嗯…咕…啊啊…不、不要…嗯…啊啊」`,
        ); // :2444
        await era.printAndWait(
          `「这么激烈…嗯…啊啊…不…不行啊…啊啊…咕痛啊…嗯…啊啊——」`,
        ); // :2445
        await era.printAndWait(
          `${player_name}压住${target_name}的后颈，腰更加激烈的动了起来……`,
        ); // :2446
      }
      kojo.背后位 = 1; // :2449 CFLAG:322 = 1
      return 0;
    }
    // :2452-2558 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.背后位 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :2454-2489 淫乱（RAND:3 三选一，各臂内嵌 ABL:2 分档）
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「继续…继续从后面侵犯我吧…嗯啊…啊嗯…阴茎好棒…你的阴茎好棒${heart(1)}」`,
        ); // :2456
        await era.printAndWait(
          `${target_name}为了让${player_name}更加容易侵犯一样，高高抬起了腰。`,
        ); // :2457
        await era.printAndWait(
          `「嗯…啊啊…这、这样…这样好舒服…更多的侵犯我吧${heart(1)}」`,
        ); // :2458
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `每次被${player_name}的腰撞到，${target_name}的蜜裂都会有爱液飞散出来。`,
          ); // :2460
          await era.printAndWait(
            `「啊啊啊…啊嗯…啊…啊啊——${heart(1)} 这样好舒服${heart(1)}」`,
          ); // :2461
          await era.printAndWait(
            `「往更深的地方插进去，我的小穴要坏了…要坏了啊${heart(1)}」`,
          ); // :2462
        } else {
          await era.printAndWait(
            `「把我的小穴弄得更加乱七八糟的${heart(1)} 变成你中意的小穴吧${heart(1)}」`,
          ); // :2464
        }
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「啊啊…嗯…继续…继续…侵犯我吧${heart(1)}」`); // :2467
        await era.printAndWait(
          `${target_name}被${player_name}从后面抓住双臂，就那样侵犯着。`,
        ); // :2468
        await era.printAndWait(
          `「用你的阴茎让我更加疯狂吧…啊啊…啊啊——${heart(1)}」`,
        ); // :2469
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `每次被${player_name}的腰撞到，${target_name}的蜜裂都会有爱液飞散出来。`,
          ); // :2471
          await era.printAndWait(
            `「啊啊…你的阴茎是最棒的${heart(1)}不要再拔出来，一直侵犯我吧${heart(1)}」`,
          ); // :2472
          // 源作误写：本句结尾多了一个「」」（连续两个右引号，:2473 原文如此，1:1 保真不修正）
          await era.printAndWait(
            `「啊嗯…啊啊…嗯…嗯…那里…继续插进更深的地方…让我发疯吧${heart(1)}」」`,
          ); // :2473
        } else {
          await era.printAndWait(
            `「嗯…啊啊…嗯啊…嗯…嗯…嗯…继续使用我的小穴吧${heart(1)}」`,
          ); // :2475
        }
      } else {
        await era.printAndWait(
          `「问…我已经不行了…啊、明明已经说了不行了…啊嗯…啊啊啊」`,
        ); // :2478
        await era.printAndWait(
          `${target_name}好像受不了了，精疲力尽的趴在地板上。但是${player_name}却不允许${target_name}休息，继续动着腰`,
        ); // :2479
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「啊啊…这么做的话我就要被弄坏了…被你的阴茎弄坏了…啊啊…啊…啊啊啊啊啊${heart(1)}」`,
          ); // :2481
          await era.printAndWait(
            `${target_name}被${player_name}侵犯着，发出疯了一样的娇喘。`,
          ); // :2482
          await era.printAndWait(
            `「啊…啊啊…呀啊啊啊…小穴不行了啊啊…阴茎…阴茎继续…啊啊——${heart(1)}」`,
          ); // :2483
          await era.printAndWait(
            `随着蜜裂发出扑哧扑哧的声音，${target_name}的爱液在地板上的面积越来越大。`,
          ); // :2484
        } else {
          await era.printAndWait(
            `「啊…啊啊啊…阴茎在里面摩擦着…我的小穴要变得奇怪了${heart(1)}」`,
          ); // :2486
          await era.printAndWait(
            `${target_name}像青蛙一样张着腿，从后面被侵犯着……`,
          ); // :2487
        }
      }
      kojo.背后位 = 6; // :2490 CFLAG:322 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.背后位 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :2492-2529 爱慕（RAND:3 三选一，各臂内嵌 ABL:2 分档）
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「啊…从后面什么的…看不到你的脸好可怕…啊嗯…啊…啊啊嗯。${heart(1)}」`,
        ); // :2494
        await era.printAndWait(
          `${target_name}被${player_name}从后面抓住双臂，就那样侵犯着。`,
        ); // :2495
        await era.printAndWait(
          `「嗯…啊…啊啊…不行…的啊…要是更激烈的话…我…就会…啊啊——」`,
        ); // :2496
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `${target_name}被开发过的蜜裂像是不想${player_name}的阴茎离开一样吸附了过来。`,
          ); // :2498
          await era.printAndWait(
            `「啊嗯…啊啊…插到深处来吧…嗯…啊啊${heart(1)} 嗯啊…已经不行了…不行了啊${heart(1)}」`,
          ); // :2499
        } else {
          await era.printAndWait(
            `「请、请再温柔一点…啊啊…被插得这么深…好痛…啊嗯…啊啊」`,
          ); // :2501
          await era.printAndWait(
            `${target_name}因为蜜裂开发的还不够而发出了疲劳和痛苦的声音`,
          ); // :2502
        }
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「被你从后面侵犯什么的…啊啊…好棒…你的好棒${heart(1)}」`,
        ); // :2505
        await era.printAndWait(
          `${target_name}被${player_name}从抓住腰，一次次的从后面插着，随着撞击${target_name}屁股的声音，从蜜裂里不断飞溅出了爱液。`,
        ); // :2506
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「我…被侵犯的好舒服…啊啊…继续侵犯我吧${heart(1)}」`,
          ); // :2508
          await era.printAndWait(
            `从后面被侵犯着露出阿黑颜的${target_name}，那个样子已经完全看不出酷酷的女忍者的影子了。`,
          ); // :2509
          await era.printAndWait(
            `「啊嗯…啊啊…嗯${heart(1)} 我已经…被你抱着就变得奇怪了${heart(1)}」`,
          ); // :2510
        } else {
          await era.printAndWait(
            `「啊啊…嗯…啊咕…虽然有点痛…但是被你侵犯的话…就没事、没问题的…啊啊${heart(1)}」`,
          ); // :2512
          await era.printAndWait(
            `${player_name}听到这句话更加用力插进了${target_name}的小穴。`,
          ); // :2513
          await era.printAndWait(`「嗯…啊啊…坏心眼…你真是坏心眼的…啊啊——」`); // :2514
        }
      } else {
        await era.printAndWait(
          `${player_name}抓住${target_name}的屁股慢慢抽送着阴茎。`,
        ); // :2517
        await era.printAndWait(
          `「嗯…啊…啊啊…嗯…啊啊啊啊啊…${heart(1)} 你的插进来了…啊啊」`,
        ); // :2518
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「啊啊…你好温柔啊…啊嗯…恩…这种程度的话…啊嗯…啊啊…是不会痛的…嗯…啊嗯${heart(1)}」`,
          ); // :2520
          await era.printAndWait(
            `${target_name}一边从蜜裂滴下爱液，一边发出了喘息声`,
          ); // :2521
          await era.printAndWait(
            `「嗯啊…被你这样疼爱的话…我要…变得黏糊糊的了…啊啊${heart(1)}」`,
          ); // :2522
        } else {
          await era.printAndWait(
            `「在激烈一点…侵犯我吧…不要这么慢得让我着急啊」`,
          ); // :2524
          await era.printAndWait(
            `${target_name}厚着脸皮恳求着${player_name}。这个样子如果让她以前的同伴们看到了，会是什么反应呢？`,
          ); // :2525
          await era.printAndWait(
            `「我想要你慢慢的爱…所以想要你更激烈…啊…啊啊…来了…来了啊${heart(1)}」`,
          ); // :2526
          await era.printAndWait(
            `「啊嗯${heart(1)}啊啊啊${heart(1)}…把我当做野兽那样…啊…啊嗯…激烈也可以${heart(1)}」`,
          ); // :2527
        }
      }
      kojo.背后位 = 5; // :2530 CFLAG:322 = 5
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      era0(`abl:${target}:2`) >= 3 &&
      (kojo.背后位 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :2533-2543 屈服刻印Lv3＋V感覚Lv3以上（RAND:2 二选一）
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「嗯…嗯咕…啊啊…啊…嗯…嗯…啊啊啊…不、不行…如果再激烈的话…啊啊…啊啊——」`,
        ); // :2534
        await era.printAndWait(
          `${target_name}因为被开发的蜜裂被侵犯着而忍不住发出了快乐的声音`,
        ); // :2535
        await era.printAndWait(
          `「啊嗯…恩…啊啊…不行…不行啊…这样输了的话…啊…啊啊——♪」`,
        ); // :2536
        await era.printAndWait(
          `随着${player_name}从后面一次次突刺，${target_name}发出了尖锐的叫声……`,
        ); // :2537
      } else {
        await era.printAndWait(
          `「嗯…啊…啊啊…不能有感觉…但是…啊…从背后被侵犯…我…啊啊…嗯♪」`,
        ); // :2539
        await era.printAndWait(
          `${target_name}满脸不情愿的摇着头，但被开发了的蜜裂却把${player_name}的阴茎吸在里面，不愿放开。`,
        ); // :2540
        await era.printAndWait(
          `「啊啊…嗯…不行…快点拔出去…我会变得奇怪的…啊啊呀嗯啊啊啊♪」`,
        ); // :2541
        await era.printAndWait(
          `「嗯…嗯啊…啊啊…不能输…才不能就这样认输…嗯…啊…啊啊啊…啊♪」`,
        ); // :2542
      }
      kojo.背后位 = 4; // :2544 CFLAG:322 = 4
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      (kojo.背后位 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :2547-2549 屈服刻印Lv3
      await era.printAndWait(`「啊啊…啊…嗯…嗯咕…咕…嗯！」`); // :2547
      await era.printAndWait(
        `${target_name}被${player_name}从后面抓着腰侵犯着。大概是作为最低限度的抵抗而尽量不发出着声音`,
      ); // :2548
      await era.printAndWait(`「我不能…就这样…输掉…嗯…嗯…咕…嗯…嗯——！」`); // :2549
      kojo.背后位 = 3; // :2550 CFLAG:322 = 3
    } else if (kojo.背后位 <= 1 || game.kojo.口上开关 == 2) {
      // :2552-2555 それ以外
      await era.printAndWait(
        `${target_name}被${player_name}按着后颈，就这样不停的侵犯着`,
      ); // :2553
      await era.printAndWait(`「嗯咕…嗯…啊啊…咕…嗯…住、助手…啊…啊咕…嗯」`); // :2554
      await era.printAndWait(
        `${player_name}听着${target_name}痛苦的声音，就那样很舒服的继续动着腰……`,
      ); // :2555
      kojo.背后位 = 2; // :2556 CFLAG:322 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 22) {
    // :2565-2700 对面座位 CFLAG:323（初めて分支无种族细分，仅处女/非处女两档）
    if (kojo.对面座位 == 0) {
      // :2567-2591 初めて
      if (era0(`talent:${target}:0`) == 1) {
        // 处女：源作本身只有一行空白引号占位，未补台词，1:1 保真不补写
        await era.printAndWait(`「」`); // :2569
      } else if (era0(`talent:${target}:76`) == 1) {
        // :2571-2590 非处女
        await era.printAndWait(
          `「啊啊嗯…现在我一人独占你的阴茎了…嗯啊…嗯…啊啊…好深${heart(1)}」`,
        ); // :2574
        await era.printAndWait(
          `${target_name}双手双脚抱住${player_name}，自己动起了腰。`,
        ); // :2575
        await era.printAndWait(
          `「嗯…啊啊…阴茎好舒服…好舒服${heart(1)} 啊啊…腰停不下来了…啊啊啊啊——」`,
        ); // :2576
        await era.printAndWait(
          `${target_name}下流的摆动着腰在${player_name}的上面跳着舞………`,
        ); // :2577
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「啊啊…喜欢…继续抱我吧…啊啊…好棒${heart(1)}」`); // :2580
        await era.printAndWait(
          `${target_name}双手双脚紧紧地包住了${player_name}。`,
        ); // :2581
        await era.printAndWait(
          `「嗯啊…吻我…吻着我疼爱我…继续抱我吧…啊啊啊…${heart(1)}」`,
        ); // :2582
        await era.printAndWait(
          `${player_name}从下面往上插着${target_name}，${target_name}发出了很舒服似的声音………`,
        ); // :2583
      } else {
        await era.printAndWait(`「快住手…走开…不要碰我啊…嗯…啊啊！」`); // :2586
        await era.printAndWait(
          `${target_name}虽然抵抗着，但是随着${player_name}从下往上的突刺的她已经只能紧紧抓住${player_name}来忍耐的。`,
        ); // :2587
        await era.printAndWait(
          `「啊…啊啊…嗯…嗯…啊嗯…对我做这种事…以后走着瞧…啊…啊啊啊——！」`,
        ); // :2588
        await era.printAndWait(
          `不论嘴里所出多么强硬的话，${target_name}已经只能随便${player_name}玩弄了………`,
        ); // :2589
      }
      kojo.对面座位 = 1; // :2592 CFLAG:323 = 1
      return 0;
    }
    // :2595-2697 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.对面座位 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :2597-2630 淫乱（RAND:3 三选一，各臂内嵌 ABL:2 分档）
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「啊啊嗯…现在我一人独占你的阴茎了…嗯啊…嗯…啊啊…好深${heart(1)}」`,
        ); // :2599
        await era.printAndWait(
          `${target_name}双手双脚抱住${player_name}，自己动起了腰`,
        ); // :2600
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「啊啊…一想到你的阴茎插进来…我就已经忍不住了…嗯啊嗯嗯——${heart(1)}」`,
          ); // :2602
          await era.printAndWait(
            `${target_name}下流的摆动着腰在${player_name}的上面跳着舞………`,
          ); // :2603
        } else {
          await era.printAndWait(
            `「嗯啊…嗯…好深…你的阴茎…把我的小穴弄得乱七八糟的…啊啊${heart(1)}」`,
          ); // :2605
        }
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「继续插我的小穴吧…这已经是你专用的小穴了…啊啊…啊啊——${heart(1)}」`,
        ); // :2608
        await era.printAndWait(
          `${player_name}和${target_name}牵着手，为了贪图快乐而互相扭着腰。`,
        ); // :2609
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「嗯…嗯…腰下面要融化了${heart(1)} 就这样一直粘在一起吧${heart(1)} 啊啊啊嗯…嗯啊${heart(1)}」`,
          ); // :2611
          await era.printAndWait(
            `${target_name}和${player_name}的嘴唇重合舌头缠在一起，互相黏在一起的蜜裂和嘴都发出了下流的声音`,
          ); // :2612
          await era.printAndWait(
            `「嗯啾…啾…嗯啾…啾${heart(1)} …嗯…啊…啊啊…继续…把我…弄坏吧${heart(1)}」`,
          ); // :2613
        } else {
          await era.printAndWait(
            `「你看…这样的话…啊嗯…我觉得会更舒服…啊…啊啊${heart(1)}」`,
          ); // :2615
          await era.printAndWait(
            `${target_name}抓住${player_name}的肩膀向后仰着，阴茎不同角度的刺入让她发出呻吟`,
          ); // :2616
          await era.printAndWait(`「嗯啊…这样…好舒服…好舒服………${heart(1)}」`); // :2617
        }
      } else {
        await era.printAndWait(
          `「啊啊啊${heart(1)} 这、这么激烈的话我…啊…啊啊${heart(1)}」`,
        ); // :2620
        await era.printAndWait(
          `${player_name}抱住${target_name}的腰激烈地抽插`,
        ); // :2621
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「啊啊嗯…啊嗯…好棒${heart(1)} 继续侵犯我的小穴…一起变得黏糊糊的吧${heart(1)}」`,
          ); // :2623
          await era.printAndWait(
            `${target_name}迎合着${player_name}的动作扭着腰，贪求着更多的快乐。`,
          ); // :2624
          await era.printAndWait(`「啊嗯…啊啊…啊嗯…啊…继续…继续…${heart(1)}」`); // :2625
        } else {
          await era.printAndWait(
            `「啊啊…你…满满的在我里面…再、再继续的话…嗯…啊啊——${heart(1)}」`,
          ); // :2627
          await era.printAndWait(
            `${target_name}因为秘裂的强烈刺激而发出了悲鸣。`,
          ); // :2628
        }
      }
      kojo.对面座位 = 6; // :2631 CFLAG:323 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.对面座位 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :2633-2667 爱慕（RAND:3 三选一，各臂内嵌 ABL:2 分档）
      if (rand_n(3) == 0) {
        await era.printAndWait(`「啊啊…喜欢…继续抱我吧…啊啊…好棒${heart(1)}」`); // :2635
        await era.printAndWait(
          `${target_name}双手双脚紧紧地包住了${player_name}。`,
        ); // :2636
        await era.printAndWait(
          `「嗯啊…吻我…吻着我疼爱我…继续抱我吧…啊啊啊…${heart(1)}」`,
        ); // :2637
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「嗯啾…啾…啊嗯…恩…啊嗯…嗯啊…我已经…不行了…要融化了…${heart(1)}」`,
          ); // :2639
          await era.printAndWait(
            `${player_name}离开${target_name}的嘴，唾液连起的桥在从下往上突刺的震动立刻就断开了。`,
          ); // :2640
        } else {
          await era.printAndWait(
            `「嗯…嗯啾…就…啊嗯…啊啊…继续…品尝我嘴里的味道吧…嗯…${heart(1)}」`,
          ); // :2642
        }
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「啊嗯…不行啊…不要动啊…和你更深的连接在一起了？感觉到了吗？…啊啊…${heart(1)}」`,
        ); // :2645
        await era.printAndWait(
          `${target_name}这样说着，紧紧的抱住了${player_name}。`,
        ); // :2646
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「啊嗯…明明说了…不要动的…啊嗯${heart(1)} 啊嗯…啊嗯${heart(1)}」`,
          ); // :2648
          await era.printAndWait(
            `${target_name}连自己动着腰的事情都没有察觉。`,
          ); // :2649
          await era.printAndWait(
            `「啊啊！这是恶作剧太过分的惩罚么？啊嗯…啊啊…嗯…啊啊啊——${heart(1)}」`,
          ); // :2650
        } else {
          await era.printAndWait(
            `「啊啊…你的全部都插进来了…我的肚子里慢慢的…啊啊啊${heart(1)}」`,
          ); // :2652
          await era.printAndWait(
            `${target_name}的蜜裂紧紧的包裹着，品尝着${player_name}的阴茎。`,
          ); // :2653
        }
      } else {
        await era.printAndWait(`「啊嗯…继续抱我吧…啊啊…好幸福…${heart(1)}」`); // :2656
        await era.printAndWait(
          `${target_name}抱住${player_name}的脖子，像要撒娇那样蹭着鼻子。`,
        ); // :2657
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「啊嗯…恩…你继续侵犯我也可以…把我弄得乱七八糟的…啊嗯${heart(1)} …啊啊啊${heart(1)}」`,
          ); // :2659
          await era.printAndWait(
            `${player_name}慢慢地插了进去，享受着${target_name}黏糊糊的小穴。`,
          ); // :2660
          await era.printAndWait(
            `「啊嗯…好…好棒…啊啊…我…我已经…啊啊啊啊啊${heart(1)}」`,
          ); // :2661
        } else {
          await era.printAndWait(
            `「啊啊…你的气味${heart(1)} 真好闻…啊嗯…恩…啊啊啊…${heart(1)}」`,
          ); // :2663
          await era.printAndWait(
            `${target_name}闻着${player_name}气味，开始扭动起了腰。`,
          ); // :2664
          await era.printAndWait(`「嗯…啊嗯…你的好大…啊…啊嗯${heart(1)}」`); // :2665
        }
      }
      kojo.对面座位 = 5; // :2668 CFLAG:323 = 5
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      era0(`abl:${target}:2`) >= 3 &&
      (kojo.对面座位 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :2671-2682 屈服刻印Lv3＋V感覚Lv3以上（RAND:2 二选一）
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `${target_name}被${player_name}抱住腰就那样往上顶着，而无法忍受的${target_name}只能抱着${player_name}。`,
        ); // :2672
        await era.printAndWait(
          `「啊…啊…嗯…嗯啊…啊啊…啊啊——！不、不要…在继续虐待我了…啊嗯…恩…啊啊」`,
        ); // :2673
        await era.printAndWait(
          `${player_name}每次插一下，${target_name}已经充分开发的蜜裂都会产生出让她的脑髓都快要融化了一样的快感。`,
        ); // :2674
        await era.printAndWait(`「不不行啊…啊…嗯…啊啊…嗯…嗯啊——」`); // :2675
      } else {
        await era.printAndWait(
          `「嗯啊…我明明被这么憎恨的人抱着…啊嗯…啊啊…嗯啊…却连咬牙忍住声音都做不到什么的…啊啊啊」`,
        ); // :2677
        await era.printAndWait(
          `${target_name}已经充分开发的蜜裂被轻轻突刺传来的快感让她漏出了轻轻的喘息声。`,
        ); // :2678
        await era.printAndWait(
          `「啊嗯…恩…嗯啊…啊啊…不要啊…不要让我…变的更奇怪了…啊啊啊——」`,
        ); // :2679
        await era.printAndWait(
          `听到她的话的${player_name}抱住${target_name}的腰部更加快地抽插着。`,
        ); // :2680
        await era.printAndWait(`「啊啊！不行…不行！啊啊…嗯…嗯啊…咕啊啊啊啊」`); // :2681
      }
      kojo.对面座位 = 4; // :2683 CFLAG:323 = 4
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      (kojo.对面座位 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :2686-2689 屈服刻印Lv3
      await era.printAndWait(
        `「嗯啊…！嗯…啊咕…啊啊！啊嗯…啊啊…咕…不要这么用力…啊！」`,
      ); // :2686
      await era.printAndWait(`${target_name}被${player_name}抱着腰往上刺着。`); // :2687
      await era.printAndWait(
        `「觉得我很老实…啊嗯…所以这么激烈的话…以后…以后给我走着瞧…啊…啊咕」`,
      ); // :2688
      await era.printAndWait(
        `不论嘴里所出多么强硬的话，${target_name}已经只能随便${player_name}玩弄了………`,
      ); // :2689
      kojo.对面座位 = 3; // :2690 CFLAG:323 = 3
    } else if (kojo.对面座位 <= 1 || game.kojo.口上开关 == 2) {
      // :2693-2695 それ以外
      await era.printAndWait(`「给我走开…啊啊不要碰我…啊啊…啊！」`); // :2693
      await era.printAndWait(
        `${target_name}虽然抵抗着，但是随着${player_name}从下往上的突刺的她已经只能紧紧抓住${player_name}来忍耐的。`,
      ); // :2694
      await era.printAndWait(`「咕…嗯…不要…在插进来了…啊…啊咕…嗯嗯嗯嗯——」`); // :2695
      kojo.对面座位 = 2; // :2696 CFLAG:323 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 23) {
    // :2705-2849 背面座位 CFLAG:324（初めて分支无种族细分，同 22；二回目含 TEQUIP:57 镜子加成）
    if (kojo.背面座位 == 0) {
      // :2707-2729 初めて
      if (era0(`talent:${target}:0`) == 1) {
        // 处女：源作本身只有一行空白引号占位，未补台词，1:1 保真不补写
        await era.printAndWait(`「」`); // :2709
      } else if (era0(`talent:${target}:76`) == 1) {
        // :2711-2728 非处女
        await era.printAndWait(`「啊啊…被用这种姿势抱着，太H了…${heart(1)}」`); // :2714
        await era.printAndWait(
          `${target_name}大大的分开双腿、接受着${player_name}的阴茎直到蜜裂的深处，就那样前后动着腰。`,
        ); // :2715
        await era.printAndWait(
          `「啊嗯…啊啊嗯${heart(1)} 啊嗯…阴茎好舒服…好舒服啊${heart(1)}」`,
        ); // :2716
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「嗯啊…继续从后面抱着我吧…嗯…啊啊啊嗯${heart(1)}」`,
        ); // :2719
        await era.printAndWait(
          `${target_name}把身体靠向${player_name}，就这样一边动着腰一边呻吟着。`,
        ); // :2720
        await era.printAndWait(
          `「嗯…啊嗯…啊啊…嗯…我…已经…啊…啊啊——${heart(1)}」`,
        ); // :2721
      } else {
        await era.printAndWait(
          `「啊…全都进来了…啊…嗯…啊啊…啊嗯…嗯咕…咕………！」`,
        ); // :2724
        await era.printAndWait(
          `看到${target_name}痛苦的样子，${player_name}从后面温柔的爱抚着她的乳房和阴蒂。`,
        ); // :2725
        await era.printAndWait(
          `「嗯啊…笨、笨蛋…被碰到这种地方的话我…啊…啊…嗯…啊啊——」`,
        ); // :2726
        await era.printAndWait(
          `听到${target_name}发出放松的声音，${player_name}安心的开始向上动起了腰……`,
        ); // :2727
      }
      kojo.背面座位 = 1; // :2730 CFLAG:324 = 1
      return 0;
    }
    // :2733-2846 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.背面座位 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :2735-2776 淫乱（RAND:3 三选一，各臂内嵌 ABL:2 分档；末尾接 TEQUIP:57 镜子加成）
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「啊啊…只是在你面前分开两腿…就有感觉了${heart(1)}」`,
        ); // :2737
        await era.printAndWait(
          `${target_name}大大的分开双腿、接受着${player_name}的阴茎直到蜜裂的深处，就那样前后动着腰。`,
        ); // :2738
        await era.printAndWait(
          `「啊嗯…啊啊嗯${heart(1)} 啊嗯…阴茎好舒服…好舒服啊${heart(1)}」`,
        ); // :2739
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「啊嗯…恩…好舒服…小穴好舒服…小穴舒服的要受不了了${heart(1)}」`,
          ); // :2741
          await era.printAndWait(
            `${target_name}一边流着口水一边上下左右的扭着腰，品味着${player_name}的阴茎………`,
          ); // :2742
        } else {
          await era.printAndWait(
            `${player_name}从后面抓住${target_name}的乳房`,
          ); // :2744
          await era.printAndWait(
            `「啊嗯…继续触碰我的身体吧…啊嗯…啊嗯…我的身体全部都是你的东西…啊啊${heart(1)}」`,
          ); // :2745
        }
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「啊嗯…恩啊…好舒服…啊啊…被做了这么舒服的事…我的脑袋已经变得奇怪了${heart(1)}」`,
        ); // :2748
        await era.printAndWait(
          `${target_name}被从后面插入，身体被抚摸着，发出微微的喘息声。`,
        ); // :2749
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「让我…更舒服吧${heart(1)} …继续插小穴吧…啊啊${heart(1)}」`,
          ); // :2751
          await era.printAndWait(
            `${target_name}一边发出了不像样的声音，一边娇艳的动起了屁股`,
          ); // :2752
          await era.printAndWait(
            `「啊啊嗯…已、已经忍不了了…我的小穴把你吞下去了啊${heart(1)}」`,
          ); // :2753
        } else {
          await era.printAndWait(
            `「嗯啊…嗯…啊嗯…继续玩弄我的身体吧…嗯…啊啊${heart(1)}」`,
          ); // :2755
          await era.printAndWait(`${player_name}把手伸到下面搓弄着阴蒂。`); // :2756
          await era.printAndWait(
            `「啊嗯！这样、这样好舒服…把我弄得乱七八糟的吧！」`,
          ); // :2757
        }
      } else {
        await era.printAndWait(
          `「嗯…啊啊…好深…把你的…全都插进我的小穴里…啊啊——${heart(1)}」`,
        ); // :2760
        await era.printAndWait(
          `${player_name}更用力的挺着腰，蹂躏着${target_name}的腔内`,
        ); // :2761
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「啊啊…我只要有小穴就好…我相当品尝你阴茎味道的小穴${heart(1)}」`,
          ); // :2763
          await era.printAndWait(
            `${target_name}一边喊着下流的词语，一边继续被${player_name}侵犯着………`,
          ); // :2764
        } else {
          await era.printAndWait(
            `「嗯…嗯嗯…我的小穴…要不行了…所以继续继续来吧」`,
          ); // :2766
          await era.printAndWait(
            `${player_name}的激烈抽插让${target_name}发出悲鸣一样的声音……`,
          ); // :2767
        }
      }
      if (era0(`tequip:${target}:57`)) {
        if (era0(`abl:${target}:17`) >= 1) {
          // 源作误写：本句缺失结尾引号「（:2772 原文如此，1:1 保真不补写）
          await era.printAndWait(
            `「啊啊…阴茎全部插进…我的小穴·里来了…全部…啊啊——${heart(1)}`,
          ); // :2772
          await era.printAndWait(
            `${target_name}因为大镜子映出的自己的姿态而兴奋着……`,
          ); // :2773
        }
      }
      kojo.背面座位 = 6; // :2776 CFLAG:324 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.背面座位 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :2778-2818 爱慕（RAND:3 三选一，各臂内嵌 ABL:2 分档；末尾接 TEQUIP:57 镜子加成）
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「啊嗯…恩啊…好棒…继续触摸我的身体吧…嗯啊…啊啊啊嗯${heart(1)}」`,
        ); // :2780
        await era.printAndWait(
          `${target_name}把身体靠向${player_name}。随着${player_name}从下面动着腰，${target_name}发出了呻吟。`,
        ); // :2781
        await era.printAndWait(
          `「啊嗯…啊嗯…啊啊…嗯…我…已经…啊…啊啊——${heart(1)}」`,
        ); // :2782
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `${target_name}被${player_name}爱抚着身体，动着腰。`,
          ); // :2784
          await era.printAndWait(
            `「啊嗯…我这个地方更舒服…啊啊${heart(1)} 啊啊${heart(1)}」`,
          ); // :2785
        } else {
          await era.printAndWait(
            `${target_name}的乳房和阴蒂被${player_name}爱抚着，漏出了喘息声。`,
          ); // :2787
          await era.printAndWait(
            `「啊！嗯…好棒…继续疼爱我吧…啊啊………${heart(1)}」`,
          ); // :2788
        }
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「嗯啊…嗯…更用力的抱紧我吧…因为从后面…看不见你的脸…啊嗯啊啊${heart(1)}」`,
        ); // :2791
        await era.printAndWait(
          `${player_name}从后面抱着${target_name}，用手温柔的描绘着她的身体。`,
        ); // :2792
        await era.printAndWait(`「嗯…你…这么温柔…啊…啊啊…${heart(1)}」`); // :2793
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `然后${player_name}的往上顶着。${target_name}的小穴只是这样就像快要融化一样紧紧的裹住了${player_name}的阴茎。`,
          ); // :2795
          await era.printAndWait(
            `「嗯${heart(1)}…啊…突然这样…啊啊啊…我会受不了的啊啊啊啊啊啊啊${heart(1)}」`,
          ); // :2796
        } else {
          await era.printAndWait(
            `「嗯啊…好舒服啊…嗯…就这样一直和你连在一起…啊啊…${heart(1)}」`,
          ); // :2798
          await era.printAndWait(
            `${target_name}因为身体被爱抚，被侵犯而出了神……`,
          ); // :2799
        }
      } else {
        await era.printAndWait(
          `「嗯…啊嗯！插到深处来了…啊…我的里面全部…被你填满了…${heart(1)}」`,
        ); // :2802
        await era.printAndWait(
          `${player_name}抓住${target_name}的双腕，阴茎插到了蜜裂的深处。`,
        ); // :2803
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「嗯啊…就这样侵犯我…更多更多的侵犯我…嗯…啊…啊嗯啊…啊嗯${heart(1)}」`,
          ); // :2805
          await era.printAndWait(
            `${target_name}配合${player_name}的腰的动作，娇艳的动着腰，发出着喘息声。`,
          ); // :2806
        } else {
          await era.printAndWait(
            `「啊啊…还、还是…很紧啊…我要被你弄坏了…所以请温柔一点…啊…啊啊嗯${heart(1)}」`,
          ); // :2808
          await era.printAndWait(
            `听着那撒娇一样的话语，${player_name}抬起腰开始疼爱${target_name}……`,
          ); // :2809
        }
      }
      if (era0(`tequip:${target}:57`)) {
        if (era0(`abl:${target}:17`) >= 1) {
          await era.printAndWait(
            `「啊啊…全都…看见了…我被侵犯的地方…啊啊啊——${heart(1)}」`,
          ); // :2814
          await era.printAndWait(
            `${target_name}因为大镜子映出的自己的姿态而兴奋着……`,
          ); // :2815
        }
      }
      kojo.背面座位 = 5; // :2818 CFLAG:324 = 5
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      era0(`abl:${target}:2`) >= 3 &&
      (kojo.背面座位 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :2821-2831 屈服刻印Lv3＋V感覚Lv3以上（RAND:2 二选一）
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「啊…啊嗯…不、不要…再继续…啊啊…碰我的胸部了…呀…哪里也不行…啊啊」`,
        ); // :2822
        await era.printAndWait(
          `${target_name}被${player_name}从后面住、一边被爱抚着乳房，一边被贯穿着`,
        ); // :2823
        await era.printAndWait(
          `「啊…嗯啊…啊…不行…不行…我被这样…啊…啊嗯…啊啊——」`,
        ); // :2824
        await era.printAndWait(
          `与她的意志无关，${target_name}被开发了的蜜裂产生出的快乐让她的脑袋想要融化了一样………`,
        ); // :2825
      } else {
        await era.printAndWait(
          `「嗯…呢…咕…明明是被侵犯…我却…啊啊…有感觉了什么的…啊啊…啊…」`,
        ); // :2827
        await era.printAndWait(
          `${target_name}开发了的蜜裂被插着而发出了喘息，感到兴奋的${player_name}咬向她的后颈，让娇喘声更大了。`,
        ); // :2828
        await era.printAndWait(`「呀！啊…啊啊——！嗯…啊啊啊！」`); // :2829
        await era.printAndWait(
          `发觉被咬的时候蜜裂会包过来的${player_name}想要留下齿痕那样一次又一次的咬着……`,
        ); // :2830
      }
      kojo.背面座位 = 4; // :2832 CFLAG:324 = 4
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      (kojo.背面座位 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :2835-2838 屈服刻印Lv3
      await era.printAndWait(
        `「嗯…嗯…啊…嗯啾…啊…嗯…啊啊…插到我的深处了…啊…咕…嗯嗯」`,
      ); // :2835
      await era.printAndWait(
        `${target_name}的蜜裂被${player_name}的阴茎一直插到深处。面对因为自身重量而插进来的阴茎，${target_name}连逃走都做不到。`,
      ); // :2836
      await era.printAndWait(`「啊啊…我…已经…变得奇怪了……啊啊…嗯…啊啊——」`); // :2837
      await era.printAndWait(
        `${target_name}只能被${player_name}从背后随他的想法被玩弄……`,
      ); // :2838
      kojo.背面座位 = 3; // :2839 CFLAG:324 = 3
    } else if (kojo.背面座位 <= 1 || game.kojo.口上开关 == 2) {
      // :2841-2844 それ以外
      await era.printAndWait(`「嗯啊…嗯呼…呜！咕…啊啊！咕…呜…呜！」`); // :2842
      await era.printAndWait(
        `${target_name}被${player_name}从后面一边爱抚着乳房和阴蒂一边动着腰。因为那个刺激，她已经奄奄一息了`,
      ); // :2843
      await era.printAndWait(`「快、快…住手…啊…啊咕…呜…嗯嗯嗯——！」`); // :2844
      kojo.背面座位 = 2; // :2845 CFLAG:324 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 26) {
    // :2854-2949 正常位肛交 CFLAG:327（无处女判定，按 A感覚/ABL:3 分档；二回目细分 7 档）
    if (kojo.正常位肛交 == 0) {
      // :2856-2889 初めて
      if (era0(`talent:${target}:76`) == 1) {
        // 淫乱
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊啊…继续侵犯我的肛门吧…还想要你的阴茎…啊啊——${heart(1)}」`,
          ); // :2860
          await era.printAndWait(
            `${target_name}久经开发的肛门轻易地把${player_name}的阴茎吞了下去，并紧紧的包裹住了`,
          ); // :2861
          await era.printAndWait(
            `「啊嗯啊啊，肛门好舒服啊${heart(1)} 再快点，快点侵犯我吧${heart(1)}」`,
          ); // :2862
        } else {
          await era.printAndWait(
            `「嗯…咕…我的肛门…被你填满了${heart(1)} 啊啊——」`,
          ); // :2864
          await era.printAndWait(
            `${player_name}贯穿了${target_name}的未开发的肛门`,
          ); // :2865
          await era.printAndWait(`「嗯…嗯…你还真是毫不留情啊…啊…啊…啊啊——」`); // :2866
        }
      } else if (era0(`talent:${target}:85`) == 1) {
        // 爱慕
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「嗯…咕…嗯啊${heart(1)} 啊啊…你插进来了…嗯…我的肛门里…啊啊${heart(1)}」`,
          ); // :2871
          await era.printAndWait(
            `${target_name}久经开发的肛门轻易地的吞下了${player_name}的阴茎`,
          ); // :2872
          await era.printAndWait(
            `「嗯啊嗯啊，好好品尝…我下流的肛门吧…嗯啊${heart(1)}」`,
          ); // :2873
        } else {
          await era.printAndWait(
            `「啊咕…果、果然对我来说…稍微有些早…不过我会忍耐的…啊嗯…啊啊」`,
          ); // :2875
          await era.printAndWait(
            `未被开发的肛门被贯穿，${target_name}的脸因为痛苦而扭曲着。`,
          ); // :2876
          await era.printAndWait(
            `${player_name}为了继续看那样的表情而开始激烈的侵犯着肛门………`,
          ); // :2877
        }
      } else {
        // それ以外（爱無し）
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊啊！明明都说了好几次不是该插进这里…嗯…啊啊…咕…啊啊啊啊」`,
          ); // :2882
          await era.printAndWait(
            `${player_name}按住${target_name}侵犯着肛门。`,
          ); // :2883
          await era.printAndWait(
            `无论多么不愿意，${target_name}被开发过的肛门都为了接受阴茎而张开着`,
          ); // :2884
        } else {
          await era.printAndWait(
            `「啊啊啊…嗯不行…不行…啊啊！不是插进这里…啊啊啊啊啊」`,
          ); // :2886
          await era.printAndWait(
            `${target_name}的还未开发的肛门被${player_name}阴茎了进去，充分的侵犯着……`,
          ); // :2887
        }
      }
      kojo.正常位肛交 = 1; // :2890 CFLAG:TARGET:327 = 1
      return 0;
    }
    // :2893-2947 二回目以降（七档：淫乱+A感觉Lv3以上 7 / 淫乱 6 / 爱+A感觉Lv3以上 5 / 爱慕 4 / A感觉Lv3以上 3 / それ以外 2）
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.正常位肛交 <= 6 || game.kojo.口上开关 == 2)
    ) {
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「我的肛门${heart(1)} 和你的阴茎相性很好的样子…啊啊${heart(1)}」`,
        ); // :2897
        await era.printAndWait(
          `${target_name}久经开发的肛门轻易地的吞下了${player_name}的阴茎`,
        ); // :2898
        await era.printAndWait(
          `${target_name}的肛门啾的包住了${player_name}的阴茎。`,
        ); // :2899
        await era.printAndWait(
          `「啊啊啊…我的肛门！继续！继续侵犯啊！啊啊…啊啊啊啊啊～${heart(1)}」`,
        ); // :2900
      } else {
        await era.printAndWait(
          `${player_name}压住${target_name}的分开的双腿，侵犯着她的肛门`,
        ); // :2902
        await era.printAndWait(
          `「啊啊！我的小穴和肛门…全都被看见了！啊…继续继续看吧${heart(1)}」`,
        ); // :2903
        await era.printAndWait(
          `${player_name}极速抽插着，${target_name}不断发出诱人的呻吟`,
        ); // :2904
        await era.printAndWait(
          `「啊啊…嗯…肛门…我的肛门…继续侵犯…把我弄得乱七八糟的${heart(1)}啊啊啊${heart(1)} 」`,
        ); // :2905
      }
      kojo.正常位肛交 = 7; // :2907 CFLAG:327 = 7
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.正常位肛交 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :2910-2912 淫乱
      await era.printAndWait(
        `「嗯啊…你的话想要怎么侵犯我都可以啊…啊啊嗯…啊啊…嗯啊…嗯！」`,
      ); // :2910
      await era.printAndWait(
        `${player_name}贯穿了${target_name}正在开发途中的肛门、${target_name}因为痛苦而不禁皱起了眉`,
      ); // :2911
      await era.printAndWait(`「请、请在温柔一点…啊…啊啊——！」`); // :2912
      kojo.正常位肛交 = 6; // :2913 CFLAG:327 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.正常位肛交 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :2916-2926 爱＋A感覚Lv3以上（RAND:2 二选一）
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「啊…啊啊…你的…全部进来了…嗯…啊嗯${heart(1)}」`,
        ); // :2917
        await era.printAndWait(
          `${target_name}久经开发的肛门轻易地的吞下了${player_name}的阴茎`,
        ); // :2918
        await era.printAndWait(
          `${target_name}的肛门啾的包住了${player_name}的阴茎。`,
        ); // :2919
        await era.printAndWait(`「啊嗯…我的肛门想要你的…好害羞啊…啊啊！」`); // :2920
      } else {
        await era.printAndWait(
          `「嗯啊…嗯…啊啊…肛门有感觉什么的…明明很害羞的…我…啊嗯啊啊啊啊${heart(1)}」`,
        ); // :2922
        await era.printAndWait(
          `${target_name}被开发过的肛门紧紧的包住了${player_name}的阴茎`,
        ); // :2923
        await era.printAndWait(
          `一边感叹着被抱住的感觉，${player_name}一边继续侵犯着肛门`,
        ); // :2924
        await era.printAndWait(
          `「啊嗯…肛门要坏掉了…啊…啊啊啊…不行啊…再继续的话我…啊…啊啊啊——${heart(1)}」`,
        ); // :2925
      }
      kojo.正常位肛交 = 5; // :2927 CFLAG:327 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.正常位肛交 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :2930-2932 爱慕
      await era.printAndWait(`「我会忍耐的…插进肛门也可以哦…嗯…呜…咕」`); // :2930
      await era.printAndWait(
        `${target_name}正在开发途中的肛门被贯穿，脸因为痛苦而扭曲着`,
      ); // :2931
      await era.printAndWait(
        `${player_name}为了继续看那样的表情而开始激烈的侵犯着肛门`,
      ); // :2932
      kojo.正常位肛交 = 4; // :2933 CFLAG:327 = 4
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.正常位肛交 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :2936-2939 A感覚Lv3以上
      await era.printAndWait(
        `「还要…继续侵犯…我的肛门…啊…啊啊！不、不要…明明不想要…咕——」`,
      ); // :2936
      await era.printAndWait(`${player_name}按住${target_name}侵犯着肛门`); // :2937
      await era.printAndWait(
        `无论多么不愿意，${target_name}被开发过的肛门都为了接受阴茎而张开着`,
      ); // :2938
      await era.printAndWait(
        `「嗯啊…啊嗯…嗯…咕…我明明不能就这样…就有…感觉…啊啊啊啊啊」`,
      ); // :2939
      kojo.正常位肛交 = 3; // :2940 CFLAG:327 = 3
    } else if (kojo.正常位肛交 <= 1 || game.kojo.口上开关 == 2) {
      // :2943-2945 それ以外（爱無し、A感覚Lv3未満）
      await era.printAndWait(
        `「恩爱…啊啊…好疼…好疼啊…快、快点…停下…啊…啊啊啊」`,
      ); // :2943
      await era.printAndWait(
        `${target_name}的还未开发的肛门被${player_name}阴茎了进去，充分的侵犯着……`,
      ); // :2944
      await era.printAndWait(
        `压住扭动身体想要挣脱的${target_name}的肩膀，${player_name}享受着在肛门里抽送的快乐……`,
      ); // :2945
      kojo.正常位肛交 = 2; // :2946 CFLAG:327 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 27) {
    // :2955-3058 背后位アナル CFLAG:328（结构同 26：无处女判定，按 A感覚/ABL:3 分档，二回目细分 7 档）
    if (kojo.背后位肛交 == 0) {
      // :2957-2995 初めて
      if (era0(`talent:${target}:76`) == 1) {
        // 淫乱
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「嗯…啊啊啊…我的肛门里，阴茎插进来了…啊啊啊啊${heart(1)}」`,
          ); // :2961
          await era.printAndWait(
            `${target_name}被开发了的肛门把${player_name}的阴茎轻易吞了进去。`,
          ); // :2962
          await era.printAndWait(
            `从后面被侵犯的${target_name}的肛门被扩张的地方轻易的看见。`,
          ); // :2963
          await era.printAndWait(
            `「啊…啊啊…我的肛门被阴茎插进来的话…我马上就受不了了${heart(1)}」`,
          ); // :2964
        } else {
          await era.printAndWait(
            `「啊啊！我的肛门…被侵犯了…啊啊啊啊…这样…好棒…啊啊！」`,
          ); // :2966
          await era.printAndWait(
            `${player_name}抓住${target_name}的屁股，贯穿了她未开发的肛门。`,
          ); // :2967
          await era.printAndWait(`「继续…继续侵犯我直到我的肛门感到舒服！」`); // :2968
        }
      } else if (era0(`talent:${target}:85`) == 1) {
        // 爱慕
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊啊！…继续…侵犯…我的肛门…啊…嗯啊啊${heart(1)}」`,
          ); // :2973
          await era.printAndWait(
            `${target_name}被开发了的肛门把${player_name}的阴茎轻易吞了进去。`,
          ); // :2974
          await era.printAndWait(
            `从后面被侵犯的${target_name}的肛门被扩张的地方轻易的看见。`,
          ); // :2975
          await era.printAndWait(
            `「被这么侵犯的话…我已经…逃不掉了…啊啊啊${heart(1)}」`,
          ); // :2976
        } else {
          await era.printAndWait(`「啊…嗯…啊啊…我的肛门…啊…啊啊啊！」`); // :2978
          await era.printAndWait(
            `${player_name}抓住${target_name}的屁股，贯穿了她未开发的肛门。`,
          ); // :2979
          await era.printAndWait(
            `${target_name}的脸因痛苦而歪曲着，发出了忍耐的声音。`,
          ); // :2980
          await era.printAndWait(`「你想做的话，我…会忍耐的…啊…啊啊！」`); // :2981
        }
      } else {
        // それ以外（爱無し）
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「嗯…啊啊啊…啊啊…嗯…不行…再继续的话我的肛门会变得奇怪的！」`,
          ); // :2986
          await era.printAndWait(
            `${player_name}抓住${target_name}的屁股侵犯者他的肛门。`,
          ); // :2987
          await era.printAndWait(
            `${target_name}被开发了的肛门接受着阴茎、不断产生着快感………`,
          ); // :2988
        } else {
          await era.printAndWait(
            `「肛，肛门不…不行的…不要！真的不行…啊…啊啊…咕…啊啊啊啊啊！」`,
          ); // :2990
          await era.printAndWait(
            `${player_name}抓住${target_name}的屁股，一口气把阴茎插进了未被开发的肛门。`,
          ); // :2991
          await era.printAndWait(
            `「嗯…嗯啊…咕…啊啊…啊啊啊！啊啊啊啊啊啊啊啊啊啊啊！」`,
          ); // :2992
          await era.printAndWait(`${target_name}咬着嘴唇，发出了悲鸣………`); // :2993
        }
      }
      kojo.背后位肛交 = 1; // :2996 CFLAG:TARGET:328 = 1
      return 0;
    }
    // :2999-3056 二回目以降（七档，结构同 26）
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.背后位肛交 <= 6 || game.kojo.口上开关 == 2)
    ) {
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「嗯…啊啊啊…我的肛门里，阴茎插进来了…啊啊啊啊${heart(1)}」`,
        ); // :3003
        await era.printAndWait(
          `${target_name}被开发了的肛门把${player_name}的阴茎轻易吞了进去。`,
        ); // :3004
        await era.printAndWait(
          `从后面被侵犯的${target_name}的肛门被扩张的地方轻易的看见。`,
        ); // :3005
        await era.printAndWait(
          `「啊…啊啊…我的肛门被阴茎插进来的话…我马上就受不了了${heart(1)}」`,
        ); // :3006
        await era.printAndWait(
          `「嗯啊啊…啊啊…我是你的牝奴隶…继续侵犯我…要把肛门翻出来那样侵犯我${heart(1)}」`,
        ); // :3007
      } else {
        await era.printAndWait(
          `「啊啊！我的肛门已经乱七八糟了${heart(1)} 啊啊！」`,
        ); // :3009
        await era.printAndWait(
          `${player_name}抓住${target_name}的腰，阴茎的抽送越来越激烈。`,
        ); // :3010
        await era.printAndWait(
          `${target_name}被开发的肛门和${target_name}的阴茎象吸在一起一样。`,
        ); // :3011
        await era.printAndWait(
          `「好舒服…肛门被侵犯好舒服…啊啊啊…嗯啊${heart(1)}」`,
        ); // :3012
      }
      kojo.背后位肛交 = 7; // :3014 CFLAG:328 = 7
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.背后位肛交 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :3017-3019 淫乱
      await era.printAndWait(
        `「嗯…更激烈的…侵犯，调教…我的肛门吧${heart(1)}」`,
      ); // :3017
      await era.printAndWait(
        `${player_name}抓住${target_name}的屁股，贯穿了她未开发的肛门。`,
      ); // :3018
      await era.printAndWait(
        `「啊啊…来吧…更用力…更激烈的…嗯…啊啊${heart(1)}」`,
      ); // :3019
      kojo.背后位肛交 = 6; // :3020 CFLAG:328 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.背后位肛交 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :3023-3033 爱＋A感覚Lv3以上（RAND:2 二选一）
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「啊啊！…我的肛门…继续…侵犯吧…嗯…嗯啊啊啊${heart(1)}」`,
        ); // :3024
        await era.printAndWait(
          `${target_name}被开发了的肛门把${player_name}的阴茎轻易吞了进去。`,
        ); // :3025
        await era.printAndWait(
          `从后面被侵犯的${target_name}的肛门被扩张的地方轻易的看见。`,
        ); // :3026
        await era.printAndWait(
          `「被这么侵犯的话…我已经…逃不掉了…啊啊啊…啊啊啊——${heart(1)}」`,
        ); // :3027
      } else {
        await era.printAndWait(
          `「啊…啊啊…我的肛门舒服吗？啊啊…那就继续…使用我的肛门吧${heart(1)}」`,
        ); // :3029
        await era.printAndWait(
          `${player_name}听着${target_name}的祈求，掰开的她屁股更激烈的抽送着阴茎。`,
        ); // :3030
        await era.printAndWait(
          `「啊嗯${heart(1)}…啊…啊啊…啊…啊啊…啊啊哦…呀啊啊啊啊${heart(1)}」`,
        ); // :3031
        await era.printAndWait(
          `「什么时候使用我的肛门都可以哦${heart(1)} 啊…啊啊啊啊${heart(1)}」`,
        ); // :3032
      }
      kojo.背后位肛交 = 5; // :3034 CFLAG:328 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :3037-3040 爱慕
      await era.printAndWait(`「啊…你的…进来了…嗯…全部都…进来了」`); // :3037
      await era.printAndWait(
        `${player_name}抓住${target_name}的屁股，贯穿了她未开发的肛门。`,
      ); // :3038
      await era.printAndWait(
        `${target_name}的脸因痛苦而歪曲着，发出了忍耐的声音。`,
      ); // :3039
      await era.printAndWait(`「没关系…啊…嗯嗯…啊…呜…啊！」`); // :3040
      kojo.背后位肛交 = 4; // :3041 CFLAG:328 = 4
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.背后位肛交 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :3044-3047 A感覚Lv3以上
      await era.printAndWait(`「我的肛门…不…不要…不要再继续了…啊啊啊！」`); // :3044
      await era.printAndWait(
        `${player_name}抓住${target_name}的屁股，侵犯着她的肛门。`,
      ); // :3045
      await era.printAndWait(
        `${target_name}被开发了的肛门接受着阴茎、不断产生着快感………`,
      ); // :3046
      await era.printAndWait(
        `「啊啊…啊…啊啊啊！明明都说了不行…嗯…啊啊…啊啊啊！」`,
      ); // :3047
      kojo.背后位肛交 = 3; // :3048 CFLAG:328 = 3
    } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 == 2) {
      // :3051-3054 それ以外（爱無し、A感覚Lv3未満）
      await era.printAndWait(`「啊…啊啊！以、已经不行了…嗯…咕…啊啊啊！」`); // :3051
      await era.printAndWait(
        `${player_name}抓住${target_name}的屁股，一口气把阴茎插进了未被开发的肛门。`,
      ); // :3052
      await era.printAndWait(`「再继续侮辱我的话…啊…啊啊…啊…咦呀——！」`); // :3053
      await era.printAndWait(`${target_name}发出着悲鸣………`); // :3054
      kojo.背后位肛交 = 2; // :3055 CFLAG:328 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 28) {
    // :3064-3173 对面座位アナル CFLAG:329（结构同 26/27：无处女判定，按 A感覚/ABL:3 分档，二回目细分 7 档）
    if (kojo.对面座位肛交 == 0) {
      // :3066-3106 初めて
      if (era0(`talent:${target}:76`) == 1) {
        // 淫乱
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊啊！好深！我的肛门里面全部…都…啊啊啊啊${heart(1)}」`,
          ); // :3070
          await era.printAndWait(
            `${target_name}被开放过的肛门轻易的把${player_name}的阴茎吞了下去。`,
          ); // :3071
          await era.printAndWait(
            `${target_name}扭动腰，把阴茎连根部都插进了肛门里。`,
          ); // :3072
          await era.printAndWait(
            `「啊啊！好舒服…！你的全部都感觉得到${heart(1)}」`,
          ); // :3073
        } else {
          await era.printAndWait(
            `「呜…啊啊…啊…啊…全部都进到我的肛门里来了…～！」`,
          ); // :3075
          await era.printAndWait(
            `${player_name}掰开${target_name}的屁股，插进了她未开发的肛门。`,
          ); // :3076
          await era.printAndWait(
            `${target_name}有些痛苦的抱着${player_name}。`,
          ); // :3077
          await era.printAndWait(
            `「啊啊…被你的阴茎继续插的话…很快就会变舒服的…啊啊…别想太多侵犯我吧…${heart(1)}」`,
          ); // :3078
        }
      } else if (era0(`talent:${target}:85`) == 1) {
        // 爱慕
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「呐…就那么喜欢我的肛门吗？ 啊…嗯…嗯…啊啊！」`,
          ); // :3083
          await era.printAndWait(
            `${player_name}就想要回答这些话一样，抱着${target_name}从下往上插去。`,
          ); // :3084
          await era.printAndWait(
            `${target_name}被开发的肛门反射性的紧缩压迫着${player_name}的阴茎、给${player_name}带去更多快乐。`,
          ); // :3085
          await era.printAndWait(
            `「啊…嗯…啊啊…不光是我的肛门…也更加的爱我吧…啊…啊啊！」`,
          ); // :3086
        } else {
          await era.printAndWait(
            `「嗯…嗯…啊…啊啊…我的肛门把你的全部都…都吞下去了…啊啊啊啊………${heart(1)}」`,
          ); // :3088
          await era.printAndWait(
            `${player_name}的阴茎连根部都埋在了${target_name}未熟的肛门里。`,
          ); // :3089
          await era.printAndWait(
            `${target_name}一边漏出着灼热的呼吸，一边抱住了${player_name}。`,
          ); // :3090
          await era.printAndWait(`「再、再稍微等等…还、很紧…啊…啊啊啊！」`); // :3091
        }
      } else {
        // それ以外（爱無し）
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊啊！嗯…呜…不要…啊啊…不要再继续了…啊…啊啊啊！」`,
          ); // :3096
          await era.printAndWait(
            `${player_name}抱着${target_name}，集中侵犯着肛门。`,
          ); // :3097
          await era.printAndWait(
            `${target_name}被开发过的肛门和${target_name}的意志相反，轻易地接受了${player_name}的阴茎。`,
          ); // :3098
          await era.printAndWait(
            `「不要全部都插进…我的肛门…啊啊…呀啊啊啊啊！」`,
          ); // :3099
        } else {
          await era.printAndWait(`「给我、离开…才不想被你抱着呢…呜…啊啊啊！」`); // :3101
          await era.printAndWait(
            `${player_name}抱着${target_name}集中蹂躏着肛门，一次又一次的向上突刺着。`,
          ); // :3102
          await era.printAndWait(`「不要！咕…啊！啊…啊啊！」`); // :3103
          await era.printAndWait(
            `${target_name}未开发的肛门紧紧地包裹着${player_name}的阴茎………`,
          ); // :3104
        }
      }
      kojo.对面座位肛交 = 1; // :3107 CFLAG:TARGET:329 = 1
      return 0;
    }
    // :3110-3171 二回目以降（七档，结构同 26/27）
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.对面座位肛交 <= 6 || game.kojo.口上开关 == 2)
    ) {
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「啊啊！好深！我的肛门里面全部…都…啊啊啊啊${heart(1)}」`,
        ); // :3114
        await era.printAndWait(
          `${target_name}被开放过的肛门轻易的把${player_name}的阴茎吞了下去。`,
        ); // :3115
        await era.printAndWait(
          `${target_name}扭动腰，把阴茎连根部都插进了肛门里。`,
        ); // :3116
        await era.printAndWait(
          `「啊啊！好舒服…！你的全部都感觉得到${heart(1)}」`,
        ); // :3117
      } else {
        await era.printAndWait(
          `${target_name}利用自己的体重，把${player_name}的阴茎直到根部位置一口气都插进了自己的肛门里。`,
        ); // :3119
        await era.printAndWait(
          `「呜…啊啊…啊…啊啊啊啊${heart(1)} 全都…全都是我的${heart(1)}」`,
        ); // :3120
        await era.printAndWait(
          `${target_name}细细品味着${player_name}的阴茎，前后摇动着腰。`,
        ); // :3121
        await era.printAndWait(
          `「你的阴茎…嗯…啊啊…是我的东西…嗯…嗯嗯…啊啊…嗯…啊啊${heart(1)}」`,
        ); // :3122
        await era.printAndWait(
          `「绝对不会放开的…啊嗯…啊啊…啾…嗯啾…啾…${heart(1)}」`,
        ); // :3123
        await era.printAndWait(
          `${target_name}紧紧抱住${player_name}接着吻，肛门又变得更紧了………`,
        ); // :3124
      }
      kojo.对面座位肛交 = 7; // :3126 CFLAG:329 = 7
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.对面座位肛交 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :3129-3132 淫乱
      await era.printAndWait(`「啊啊！到深处…一口气…嗯…嗯啊…啊啊！」`); // :3129
      await era.printAndWait(
        `${player_name}掰开${target_name}的屁股，插进了她未开发的肛门。`,
      ); // :3130
      await era.printAndWait(`${target_name}有些痛苦的抱着${player_name}。`); // :3131
      await era.printAndWait(
        `「啊啊…用你的阴茎继续开发我的肛门吧…啊呢…啊…啊啊啊${heart(1)}」`,
      ); // :3132
      kojo.对面座位肛交 = 6; // :3133 CFLAG:329 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.对面座位肛交 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :3136-3146 爱＋A感覚Lv3以上（RAND:2 二选一）
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「啊嗯…啊啊…啊…啊啊啊…我的肛门已经…是你…啊${heart(1)}」`,
        ); // :3137
        await era.printAndWait(
          `${player_name}就想要回答这些话一样，抱着${target_name}从下往上插去。`,
        ); // :3138
        await era.printAndWait(
          `${target_name}被开发的肛门反射性的紧缩压迫着${player_name}的阴茎、给${player_name}带去更多快乐。`,
        ); // :3139
        await era.printAndWait(
          `「不想从你这里离开…啊…我的肛门是你专用的…啊啊啊啊${heart(1)}」`,
        ); // :3140
      } else {
        await era.printAndWait(
          `「嗯…嗯…和你接吻的话…啊…肛门被侵犯也好舒服${heart(1)}」`,
        ); // :3142
        await era.printAndWait(
          `${target_name}抱着${player_name}，一边晃着腰一边不停的接吻。`,
        ); // :3143
        await era.printAndWait(
          `${target_name}的肛门不停的紧缩这、让${player_name}的阴茎沉浸在快感里。`,
        ); // :3144
        await era.printAndWait(
          `「啊嗯…嗯嗯…好棒…好舒服…让我更舒服吧${heart(1)}」`,
        ); // :3145
      }
      kojo.对面座位肛交 = 5; // :3147 CFLAG:329 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.对面座位肛交 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :3150-3153 爱慕
      await era.printAndWait(`「啊啊…我的肛门还…不够舒服，对不起…啊啊」`); // :3150
      await era.printAndWait(
        `${player_name}的阴茎连根部都埋在了${target_name}未熟的肛门里。`,
      ); // :3151
      await era.printAndWait(
        `${target_name}一边漏出着灼热的呼吸，一边抱住了${player_name}。`,
      ); // :3152
      await era.printAndWait(
        `「啊啊…但是…你自由使用就好了…啊…啊啊啊啊…${heart(1)}」`,
      ); // :3153
      kojo.对面座位肛交 = 4; // :3154 CFLAG:329 = 4
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.对面座位肛交 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :3157-3161 A感覚Lv3以上
      await era.printAndWait(`「啊啊！不、不要…不要抱着我啊…呜…咕…啊…啊啊！」`); // :3157
      await era.printAndWait(
        `${player_name}抱着${target_name}，集中侵犯着她的肛门。`,
      ); // :3158
      await era.printAndWait(
        `${target_name}被开发过的肛门和${target_name}的意志相反，轻易地接受了${player_name}的阴茎。`,
      ); // :3159
      await era.printAndWait(
        `「啊啊啊！全部…全部都进来…不要…不要啊…啊啊啊啊！」`,
      ); // :3160
      await era.printAndWait(
        `${target_name}因为肛门和背部升起快感而感到战栗、反射性的抱住了${player_name}………`,
      ); // :3161
      kojo.对面座位肛交 = 3; // :3162 CFLAG:329 = 3
    } else if (kojo.对面座位肛交 <= 1 || game.kojo.口上开关 == 2) {
      // :3165-3169 それ以外（爱無し、A感覚Lv3未満）
      await era.printAndWait(`「啊、走开…我可没兴趣和你抱在一起…呜…啊啊！」`); // :3165
      await era.printAndWait(
        `${player_name}抱着${target_name}集中蹂躏着肛门，一次又一次的向上突刺着。`,
      ); // :3166
      // 源作误写：本句结尾缺失「」」（右引号，:3167 原文如此，1:1 保真不修正）
      await era.printAndWait(`「停、停下…求你了…啊…啊啊…呀啊啊啊！`); // :3167
      await era.printAndWait(`未开发的肛门紧紧地包裹着${player_name}的阴茎。`); // :3168
      await era.printAndWait(
        `而为了忍耐那份疼痛，${target_name}只能抱着${player_name}………`,
      ); // :3169
      kojo.对面座位肛交 = 2; // :3170 CFLAG:329 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 29) {
    // :3179-3310 背面座位肛交 CFLAG:330（结构同 26-28：无处女判定，按 A感覚/ABL:3 分档，二回目细分 7 档；
    // 首尾各接一段 TEQUIP:57 镜子 + ABL:17 羞耻PLAY 加成，二回目那段源作误写缺失结尾引号）
    if (kojo.背面座位肛交 == 0) {
      // :3181-3217 初めて
      if (era0(`talent:${target}:76`) == 1) {
        // 淫乱
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「嗯…啊啊…啊…把我的身体…弄得更加乱七八糟吧…嗯啊啊啊${heart(1)}」`,
          ); // :3185
          await era.printAndWait(
            `${target_name}一边玩弄着${player_name}的乳房，一边从下面突刺这她的肛门。`,
          ); // :3186
          await era.printAndWait(
            `「啊啊…嗯、啊…啊啊！好棒…好舒服…啊啊…肛门好舒服啊啊${heart(1)}」`,
          ); // :3187
        } else {
          await era.printAndWait(
            `「啊…全部…插进来了…我的肛门…就这么被撑开了…啊！」`,
          ); // :3189
          await era.printAndWait(
            `${player_name}掰开${target_name}的屁股，插进了她未开发的肛门。`,
          ); // :3190
          await era.printAndWait(
            `${player_name}抓住了${target_name}的乳房，${target_name}颤抖着。`,
          ); // :3191
          await era.printAndWait(
            `「啊啊…继续下流的开发…调教…我的身体吧…${heart(1)}」`,
          ); // :3192
        }
      } else if (era0(`talent:${target}:85`) == 1) {
        // 爱慕
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `肛门被开发了的${target_name}坐在了${player_name}上面身上、粗重的喘息着。`,
          ); // :3197
          await era.printAndWait(
            `「啊…啊啊…嗯、啊啊啊啊啊………嗯啊…腰自己动起来了…啊啊…继续抱我…！」`,
          ); // :3198
          await era.printAndWait(
            `${target_name}的肛门很舒服似的把${player_name}的阴茎连根部都吞了下去………`,
          ); // :3199
        } else {
          await era.printAndWait(`「嗯、嗯…好好品尝…我的肛门吧…${heart(1)}」`); // :3201
          await era.printAndWait(
            `${target_name}把身体托付给${player_name}、从下面被不停的突刺着。`,
          ); // :3202
          await era.printAndWait(`「我的身体…全部都是你的…啊啊${heart(1)}」`); // :3203
        }
      } else {
        // それ以外（爱無し）
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊啊…嗯…嗯嗯…我的肛门这么有感觉什么的…嗯、嗯啊…啊啊！」`,
          ); // :3208
          await era.printAndWait(
            `${target_name}被${player_name}一边侵犯着肛门一边抚摸着乳房，发出了喘息声。`,
          ); // :3209
          await era.printAndWait(
            `「嗯…啊…啊…啊啊…嗯…啊…不行…我的身体…为什么…呀啊啊啊啊！」`,
          ); // :3210
        } else {
          await era.printAndWait(
            `「停、停下…我的肛门什么感觉都没有，所以…啊啊啊！」`,
          ); // :3212
          await era.printAndWait(
            `${player_name}从后面抱着${target_name}，从下往上顶着肛门。`,
          ); // :3213
          await era.printAndWait(`「啊啊…嗯…啊啊啊！不要…嗯…咕…啊啊啊啊！」`); // :3214
          await era.printAndWait(
            `${player_name}听着${target_name}那模糊的悲鸣、又开始爱抚着乳房和秘裂………`,
          ); // :3215
        }
      }
      kojo.背面座位肛交 = 1; // :3218 CFLAG:TARGET:330 = 1
      // :3219-3231 羞耻PLAY（TEQUIP:57 镜子 + ABL:17 分档）
      if (
        era0(`tequip:${target}:57`) &&
        era0(`abl:${target}:17`) >= 1 &&
        era0(`talent:${target}:85`)
      ) {
        await era.printAndWait(
          `「啊啊…我的肛门能把你的全部放进来…我是多么幸福的人啊………${heart(1)}」`,
        ); // :3221
        await era.printAndWait(
          `${target_name}看着镜子中映出的自己的痴态，更加兴奋了………`,
        ); // :3222
      } else if (
        era0(`tequip:${target}:57`) &&
        era0(`abl:${target}:17`) >= 1 &&
        era0(`talent:${target}:76`)
      ) {
        await era.printAndWait(
          `「啊啊${heart(1)} 我的肛门被扩张着…嗯 好舒服…继续侵犯我吧${heart(1)}」`,
        ); // :3224
        await era.printAndWait(
          `${target_name}看着镜子中映出的自己的痴态，更加兴奋了………`,
        ); // :3225
      } else if (era0(`tequip:${target}:57`) && era0(`abl:${target}:17`) >= 1) {
        await era.printAndWait(
          `「啊啊…我的肛门…全部都进来了…啊…啊啊…这么深啊………」`,
        ); // :3227
        await era.printAndWait(
          `${target_name}看着镜子中映出的自己的痴态，更加兴奋了………`,
        ); // :3228
      } else if (era0(`tequip:${target}:57`)) {
        await era.printAndWait(
          `${target_name}看着大镜子里自己被张开双腿侵犯肛门的痴态，不甘心的移开了目光………`,
        ); // :3230
      }
      return 0;
    }
    // :3234-3309 二回目以降（七档，结构同 26-28；末尾同款羞耻PLAY 加成）
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.背面座位肛交 <= 6 || game.kojo.口上开关 == 2)
    ) {
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「啊啊…啊啊啊${heart(1)} 我…要变成笨蛋了…再继续侵犯我的肛门的话我要变成笨蛋了！」`,
        ); // :3238
        await era.printAndWait(
          `${target_name}接受着下面的突刺，一边疯狂的喘息着一边前后扭着腰。`,
        ); // :3239
        await era.printAndWait(
          `因为动作太混乱${player_name}像为了不让肛门摆脱阴茎般抱着${target_name}就已经竭尽全力了。`,
        ); // :3240
        await era.printAndWait(
          `「嗯…啊…啊啊…继续侵犯我…侵犯我吧…啊啊…啊…啊啊啊${heart(1)}」`,
        ); // :3241
      } else {
        await era.printAndWait(
          `「啊啊…啊…肛门被撑开了${heart(1)}…我的肛门想要你的阴茎想要得不行${heart(1)}」`,
        ); // :3243
        await era.printAndWait(
          `${target_name}玩弄着${player_name}的乳房，从下面开始侵犯肛门。`,
        ); // :3244
        await era.printAndWait(
          `${player_name}用手擦干了${target_name}流出的口水，又插回她的口中让她舔干净。`,
        ); // :3245
        await era.printAndWait(
          `「嗯…嗯…嗯啊…啊啊…啊啊…肛门被侵犯的同时嘴里含根阴茎好像也不错…啊…啊啊啊${heart(1)}」`,
        ); // :3246
        await era.printAndWait(
          `「但是现在…肛门…肛门被侵犯的乱七八糟…让我感觉感觉更舒服！」`,
        ); // :3247
      }
      kojo.背面座位肛交 = 7; // :3249 CFLAG:330 = 7
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.背面座位肛交 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :3252-3255 淫乱
      await era.printAndWait(`「嗯嗯…啊啊啊…全部都插进…我下流的肛门里吧！」`); // :3252
      await era.printAndWait(
        `${player_name}掰开${target_name}的屁股，插进了她未开发的肛门。`,
      ); // :3253
      await era.printAndWait(
        `${player_name}抓住了${target_name}的乳房，${target_name}颤抖着。`,
      ); // :3254
      await era.printAndWait(
        `「嗯…虽然胸部也很好…不过还是先把肛门弄得乱七八糟吧…啊啊${heart(1)}」`,
      ); // :3255
      kojo.背面座位肛交 = 6; // :3256 CFLAG:330 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.背面座位肛交 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :3259-3272 爱＋A感覚Lv3以上（RAND:2 二选一，第二臂内再嵌一次 RAND:2）
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `肛门被开发了的${target_name}坐在了${player_name}上面身上，肛门被贯穿、粗重的喘息着。`,
        ); // :3260
        await era.printAndWait(
          `「啊…啊啊…嗯、啊啊啊啊啊………嗯啊…腰自己动起来了…啊啊…继续抱我…！」`,
        ); // :3261
        await era.printAndWait(
          `${target_name}撒着娇，转动着${player_name}手爱抚着乳房和蜜裂。`,
        ); // :3262
        await era.printAndWait(
          `「啊啊${heart(1)} 你的手…好温柔…啊啊…嗯嗯…啊…啊…啊啊啊${heart(1)}」`,
        ); // :3263
      } else {
        await era.printAndWait(
          `「嗯啊…啊…啊啊…屁股…自己动起来了…我的肛门已经…是你的东西了${heart(1)} 啊啊${heart(1)}」`,
        ); // :3265
        await era.printAndWait(
          `${target_name}被开发了的肛门、黏糊糊的肠壁向${player_name}阴茎缠绕了上去。`,
        ); // :3266
        await era.printAndWait(
          `「啊啊啊…啊…啊…啊嗯啊…从肛门哪里来来回回的敲打着子宫…啊啊啊${heart(1)}」`,
        ); // :3267
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `嘴里被手指插入的${target_name}心领神会的舔了起来。`,
          ); // :3269
          await era.printAndWait(
            `「啾嗯啾…嗯啾…啊嗯…嗯…啊啊…好舒服…好舒服啊…啊啊${heart(1)}」`,
          ); // :3270
        }
      }
      kojo.背面座位肛交 = 5; // :3273 CFLAG:330 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.背面座位肛交 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :3276-3278 爱慕
      await era.printAndWait(`「啊啊…还要继续被你侵犯…嗯啊啊…啊啊啊嗯！」`); // :3276
      await era.printAndWait(
        `${target_name}把身体交给${player_name}、未开发的肛门被从下不停的突刺着。`,
      ); // :3277
      await era.printAndWait(
        `「我没关系的…在肛门中满满的出来吧…嗯…啊啊${heart(1)}」`,
      ); // :3278
      kojo.背面座位肛交 = 4; // :3279 CFLAG:330 = 4
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.背面座位肛交 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :3282-3285 A感覚Lv3以上
      await era.printAndWait(
        `「嗯啊…嗯啊…啊啊…没错…被你侵犯…肛门好舒服啊…嗯…嗯啊啊啊啊！」`,
      ); // :3282
      await era.printAndWait(
        `${target_name}被${player_name}侵犯着肛门，发出了喘息的呻吟。`,
      ); // :3283
      await era.printAndWait(
        `${target_name}的乳房被${player_name}的手指看起来很疼的深深戳着、对${target_name}这也只会变成快感而已。`,
      ); // :3284
      await era.printAndWait(
        `「啊啊啊…我…嗯啊…嗯…嗯啊…啊啊…嗯、啊啊…啊啊啊啊——！」`,
      ); // :3285
      kojo.背面座位肛交 = 3; // :3286 CFLAG:330 = 3
    } else if (kojo.背面座位肛交 <= 1 || game.kojo.口上开关 == 2) {
      // :3289-3293 それ以外（爱無し、A感覚Lv3未満）
      await era.printAndWait(
        `「嗯啊…嗯啊…咕…呜…嗯…啊啊啊！停、停下…啊…啊啊！」`,
      ); // :3289
      await era.printAndWait(
        `${player_name}从后面抱着${target_name}从下往上插着肛门。`,
      ); // :3290
      await era.printAndWait(`${target_name}发出了好像很痛苦的声音。`); // :3291
      // 源作误写：本句结尾缺失「」」（右引号，:3292 原文如此，1:1 保真不修正）
      await era.printAndWait(`「啊咕…呜…呜…不、不要…这…样…啊嗯！`); // :3292
      await era.printAndWait(
        `${player_name}一边愉快的听着${target_name}的呻吟、一边开始爱抚乳房和蜜裂………`,
      ); // :3293
      kojo.背面座位肛交 = 2; // :3294 CFLAG:330 = 2
    }
    // :3296-3308 羞耻PLAY（TEQUIP:57 镜子 + ABL:17 分档，与初めて分支同款；此处源作误写第一档缺失结尾引号）
    if (
      era0(`tequip:${target}:57`) &&
      era0(`abl:${target}:17`) >= 1 &&
      era0(`talent:${target}:85`)
    ) {
      // 源作误写：本句缺失结尾引号「」（:3298 原文如此，1:1 保真不修正）
      await era.printAndWait(
        `「啊啊…我的肛门能把你的全部放进来…我是多么幸福的人啊………${heart(1)}`,
      ); // :3298
      await era.printAndWait(
        `${target_name}看着镜子中映出的自己的痴态，更加兴奋了………`,
      ); // :3299
    } else if (
      era0(`tequip:${target}:57`) &&
      era0(`abl:${target}:17`) >= 1 &&
      era0(`talent:${target}:76`)
    ) {
      await era.printAndWait(
        `「啊啊${heart(1)} 我的肛门被扩张着…嗯 好舒服…继续侵犯我吧${heart(1)}」`,
      ); // :3301
      await era.printAndWait(
        `${target_name}看着镜子中映出的自己的痴态，更加兴奋了………`,
      ); // :3302
    } else if (era0(`tequip:${target}:57`) && era0(`abl:${target}:17`) >= 1) {
      await era.printAndWait(
        `「啊啊…我的肛门…全部都进来了…啊…啊啊…这么深啊………」`,
      ); // :3304
      await era.printAndWait(
        `${target_name}看着镜子中映出的自己的痴态，更加兴奋了………`,
      ); // :3305
    } else if (era0(`tequip:${target}:57`)) {
      await era.printAndWait(
        `${target_name}看着大镜子里自己被张开双腿侵犯肛门的痴态，不甘心的移开了目光………`,
      ); // :3307
    }
    return 0;
  } else if (era_flag.selectcom == 30) {
    // :3316-3386 手淫 CFLAG:331（无 A感覚 分档，按 TALENT/侍奉精神 ABL:16 分档；
    // 源作误写：二回目以降顶档与次档均写 CFLAG:331 <= 5，:3341 原文如此，1:1 保真不修正——
    // 顶档 7 与次档 6 因此共用同一守卫，cflag=6 且 FLAG:7 != 2 时会跳过两者直接落到更低档）
    if (kojo.手淫 == 0) {
      // :3318-3335 初めて（单层：无 ABL:3 细分）
      if (era0(`talent:${target}:76`) == 1) {
        // 淫乱
        await era.printAndWait(`「啊啊…你的阴茎好热…啊啊…啊啊…${heart(1)}」`); // :3321
        await era.printAndWait(
          `${target_name}一边喘着粗气，一边激烈的对待着${player_name}的阴茎………`,
        ); // :3322
      } else if (era0(`talent:${target}:85`) == 1) {
        // 爱慕
        await era.printAndWait(
          `「你的阴茎…在我的手里变得这么硬…啊啊…好厉害…好高兴…♪」`,
        ); // :3325
        await era.printAndWait(
          `${target_name}一边喘着粗气，一边温柔的侍奉着${player_name}的阴茎………`,
        ); // :3326
      } else if (era0(`abl:${target}:16`) >= 3) {
        // 侍奉精神Lv3以上
        await era.printAndWait(`「我不做这种事不行么…真没办法…呵呵呵」`); // :3329
        await era.printAndWait(
          `${target_name}一边舔着嘴唇。一边侍奉着${player_name}的阴茎………`,
        ); // :3330
      } else {
        // それ以外（侍奉精神Lv3未満）
        await era.printAndWait(
          `「用着双手服侍你的东西…嗯…疼么？…那就这么握碎…切…连这种程度的力量都用不出来么」`,
        ); // :3333
        await era.printAndWait(
          `${target_name}一边露出不甘心的表情，一边侍奉着${player_name}阴茎………`,
        ); // :3334
      }
      kojo.手淫 = 1; // :3336 CFLAG:TARGET:331 = 1
      return 0;
    }
    // :3339-3384 二回目以降（七档）
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.手淫 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :3341-3350 淫乱＋侍奉精神Lv3以上（RAND:2 二选一）
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「看，你的阴茎勃起的更厉害了、因为我把你弄得更舒服了吧${heart(1)}」`,
        ); // :3343
        await era.printAndWait(
          `${target_name}的左手紧紧握着${player_name}阴茎的根部，右手撸动着。`,
        ); // :3344
        await era.printAndWait(
          `「啊啊${heart(1)}啊啊${heart(1)} …这么红，好棒…${heart(1)}」`,
        ); // :3345
      } else {
        await era.printAndWait(
          `「只是握着你热乎乎的阴茎、我的头就已经开始发晕了…${heart(1)}」`,
        ); // :3347
        await era.printAndWait(
          `${target_name}不自觉的张着嘴、带着晕乎乎的眼神侍奉着${player_name}的阴茎。`,
        ); // :3348
        await era.printAndWait(
          `「啊啊…如果继续这么热的话…我的手都快烫伤了…${heart(1)}」`,
        ); // :3349
      }
      kojo.手淫 = 7; // :3351 CFLAG:331 = 7
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.手淫 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :3354-3355 淫乱
      await era.printAndWait(
        `「啊啊…一想到这根阴茎在我里面乱搞…啊…啊啊${heart(1)}」`,
      ); // :3354
      await era.printAndWait(
        `${target_name}带着一副出神的表情服侍着${player_name}的阴茎………`,
      ); // :3355
      kojo.手淫 = 6; // :3356 CFLAG:331 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:16`) >= 5 &&
      (kojo.手淫 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :3359-3367 爱＋侍奉精神Lv5（RAND:2 二选一）
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「嗯啊…这根阴茎…是只属于我的阴茎…啊…绝对不会放手的${heart(1)}」`,
        ); // :3360
        await era.printAndWait(
          `${target_name}带着一副出神的表情侍奉着${player_name}的阴茎。`,
        ); // :3361
        await era.printAndWait(
          `「就这样变得非常非常舒服…射出非常非常多的精液来吧…♪」`,
        ); // :3362
      } else {
        await era.printAndWait(
          `「啊啊…现在好像马上就要咻咻的射精出来哦…你的阴茎${heart(1)}」`,
        ); // :3364
        await era.printAndWait(
          `${target_name}用湿润的眼睛凝视着${player_name}的阴茎。`,
        ); // :3365
        await era.printAndWait(
          `「就这样…用我的手变得非常非常舒服…射出非常非常多的精液来吧…♪」`,
        ); // :3366
      }
      kojo.手淫 = 5; // :3368 CFLAG:331 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.手淫 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :3371-3372 爱＋侍奉精神Lv3以上
      await era.printAndWait(
        `「你的阴茎…在我的手里变得这么硬…啊啊…好厉害…好高兴…♪」`,
      ); // :3371
      await era.printAndWait(
        `${target_name}一边喘着粗气，一边温柔的侍奉着${player_name}的阴茎………`,
      ); // :3372
      kojo.手淫 = 4; // :3373 CFLAG:331 = 4
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.手淫 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :3376-3377 侍奉精神Lv3以上（与上一档共用 TALENT:85+ABL:16>=3，仅门槛 CFLAG 不同，源作如此）
      await era.printAndWait(
        `「这样就好了吗？………呵呵呵、真的露出了好像很舒服似的脸啊、你」`,
      ); // :3376
      await era.printAndWait(
        `${target_name}一边舔着嘴唇，一边侍奉着${player_name}的阴茎………`,
      ); // :3377
      kojo.手淫 = 3; // :3378 CFLAG:331 = 3
    } else if (kojo.手淫 <= 1 || game.kojo.口上开关 == 2) {
      // :3381-3382 それ以外（侍奉精神Lv3未満）
      await era.printAndWait(`「啊啊…用手服侍你的东西什么的，真是屈辱………」`); // :3381
      await era.printAndWait(
        `${target_name}一边撅起嘴唇，一边服侍着${player_name}的阴茎………`,
      ); // :3382
      kojo.手淫 = 2; // :3383 CFLAG:331 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 31) {
    // :3392-3466 口交 CFLAG:332（无 A感覚 分档，四档；二回目以降淫乱/爱慕臂各接 RAND:3→RAND:2 双层三选一）
    if (kojo.口交_奴 == 0) {
      // :3394-3416 初めて
      if (era0(`talent:${target}:76`) == 1) {
        // 淫乱
        await era.printAndWait(
          `「啊啊、你的阴茎…我开动了${heart(1)} 啊呜…嗯呜嗯…咕噜…啾…嗯！」`,
        ); // :3397
        await era.printAndWait(
          `${target_name}突然抓起${player_name}的阴茎，以猛烈的势头吞了下去。`,
        ); // :3398
        await era.printAndWait(
          `「嗯…嗯呼…我、我…一直想舔你的阴茎想的不得了、一直都等着呢！嗯咕噜…嗯…啾${heart(1)}」`,
        ); // :3399
      } else if (era0(`talent:${target}:85`) == 1) {
        // 爱慕
        await era.printAndWait(
          `「即使是你的阴茎，这么突然让我舔你觉得可能吗？」`,
        ); // :3402
        await era.printAndWait(
          `${target_name}这么说着，一边撸着${player_name}的阴茎，一边吻向了阴茎的顶部。`,
        ); // :3403
        await era.printAndWait(
          `「嗯…呵呵呵、首先要先接吻…${heart(1)} 然后…嗯咕嗯…再舔舔龟头吧${heart(1)}」`,
        ); // :3404
      } else if (era0(`abl:${target}:16`) >= 3) {
        // 侍奉精神Lv3以上
        await era.printAndWait(
          `「啊啊…你那肮脏的阴茎…变干净了…嗯…啊…嗯…咕噜…」`,
        ); // :3407
        await era.printAndWait(
          `${target_name}眯着眼看起来很高兴的把${player_name}的阴茎吸入口中舔了起来。`,
        ); // :3408
        await era.printAndWait(`「咕噜…啊…明明味道这么重…啊…嗯…嗯…♪」`); // :3409
      } else {
        // それ以外（侍奉精神Lv3未満）
        await era.printAndWait(
          `「啊啊…终于我也到了用嘴来含住这根肮脏的阴茎的时候了…嗯…嗯…咕噜」`,
        ); // :3412
        await era.printAndWait(
          `${target_name}战战兢兢的舔起了${player_name}的阴茎。`,
        ); // :3413
        await era.printAndWait(
          `「毕竟输了，这种程度是理所当然的呢…啊…嗯…咕………」`,
        ); // :3414
        await era.printAndWait(
          `${target_name}带着因悔恨而歪曲的表情，继续着口腔奉仕………`,
        ); // :3415
      }
      kojo.口交_奴 = 1; // :3417 CFLAG:TARGET:332 = 1
      return 0;
    }
    // :3420-3465 二回目以降（四档）
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.口交_奴 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :3423-3436 淫乱（RAND:3→RAND:2 双层三选一）
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「啊啊，你的阴茎…每天都想舔…嗯…咕噜…嗯啾${heart(1)}」`,
        ); // :3424
        await era.printAndWait(
          `${target_name}吞下${player_name}阴茎直到喉咙的深处。`,
        ); // :3425
        await era.printAndWait(
          `「嗯啾…啾…啾…嗯嗯…啊啊…阴茎…阴茎…${heart(1)}」`,
        ); // :3426
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `${target_name}眼前伸出了阴茎、${target_name}张开嘴咬住了阴茎。`,
        ); // :3428
        await era.printAndWait(
          `「啊呜…嗯…嗯…这是在奖励我把？ 啊啊…阴茎真好吃…咕噜…嗯啾…嗯${heart(1)}」`,
        ); // :3429
        await era.printAndWait(
          `「受不了了、我感觉吸的时候最舒服…嗯嗯…咕噜…就…嗯啊${heart(1)}」`,
        ); // :3430
        await era.printAndWait(
          `${target_name}脱去酷酷的女忍者这层假面之后、已经沦为了奉仕${player_name}的阴茎的一匹牝犬………`,
        ); // :3431
      } else {
        await era.printAndWait(
          `「啊呜…嗯…嗯…你的阴茎实在太好吃了…咕噜…啊啊…就这样放在我的嘴里吧${heart(1)}」`,
        ); // :3433
        await era.printAndWait(
          `${target_name}用恍惚的眼神一边注视着${player_name}的阴茎，一边。`,
        ); // :3434
        await era.printAndWait(
          `「啾…咕噜…啊啊…你的阴茎已经让我上瘾了、嗯咕…嗯啾…啾…嗯咕${heart(1)}」`,
        ); // :3435
      }
      kojo.口交_奴 = 5; // :3437 CFLAG:332 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :3440-3452 爱慕（RAND:3→RAND:2 双层三选一）
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「啊呜…嗯…这是我的阴茎、给其他的别的谁可不行…啊啊…嗯…${heart(1)}」`,
        ); // :3441
        await era.printAndWait(
          `${target_name}亲了尿道口好几次后、大口吞下了${player_name}的阴茎。`,
        ); // :3442
        await era.printAndWait(
          `「嗯啾…嗯…啊…我的嘴舒服吗？…啊啊…变得更舒服吧…${heart(1)}」`,
        ); // :3443
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「嗯…嗯…嗯咕…咕噜…嗯…嗯嗯…在我嘴里满满的射出来吧…啊啊…嗯嗯${heart(1)}」`,
        ); // :3445
        await era.printAndWait(
          `${target_name}看起来很舒服似得眯起了眼、继续舔着${player_name}的阴茎。`,
        ); // :3446
        await era.printAndWait(
          `「好吃…你的阴茎实在太好吃了…咕噜…嗯…啾啾…${heart(1)}」`,
        ); // :3447
      } else {
        await era.printAndWait(
          `「啊啊…只是含着男人的阴茎而已…就这么幸福什么的…我好想已经变得不对劲了…${heart(1)}」`,
        ); // :3449
        await era.printAndWait(
          `${target_name}干起来很高兴的舔着${player_name}的阴茎。`,
        ); // :3450
        await era.printAndWait(
          `「咕…啾…啾嗯…啊啊…明明味道这么重但我就是停不下来${heart(1)}」`,
        ); // :3451
      }
      kojo.口交_奴 = 4; // :3453 CFLAG:332 = 4
    } else if (
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.口交_奴 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :3456-3458 侍奉精神Lv3以上
      await era.printAndWait(`「嗯啊…嗯…啊嗯…咕噜…啾…啊…嗯啊…♪」`); // :3456
      await era.printAndWait(`${target_name}热心的舔着${player_name}的阴茎。`); // :3457
      await era.printAndWait(`「让我做到这种程度什么的…你这家伙…嗯…啊…咕噜…」`); // :3458
      kojo.口交_奴 = 3; // :3459 CFLAG:332 = 3
    } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 == 2) {
      // :3462-3463 それ以外（侍奉精神Lv3未満）
      await era.printAndWait(
        `「嗯…嗯嗯…咕噜…嗯啊…嗯…让我继续舔？ 啊…嗯啾啾！」`,
      ); // :3462
      await era.printAndWait(
        `${target_name}带着不甘心的表情继续舔着${player_name}的阴茎………`,
      ); // :3463
      kojo.口交_奴 = 2; // :3464 CFLAG:332 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 32) {
    // :3473-3559 乳交 CFLAG:333（八档：TALENT:78 弄乳狂与 TALENT:76/85 组合出更高档；初めて 单层五分）
    if (kojo.乳交 == 0) {
      // :3475-3497 初めて
      if (era0(`talent:${target}:78`) == 1) {
        // 弄乳狂
        await era.printAndWait(`「啊…用我的好色的胸部让你的阴茎更舒服吧…♪」`); // :3478
        await era.printAndWait(
          `${target_name}的眼角垂了下来、为用胸部侍奉而兴奋这。`,
        ); // :3479
        await era.printAndWait(`「胸部变得太舒服…啊啊…要融化了………」`); // :3480
      } else if (era0(`talent:${target}:76`) == 1) {
        // 淫乱
        await era.printAndWait(`「嗯…用你的阴茎侵犯我的胸部吧…啊啊…啊啊♪」`); // :3483
        await era.printAndWait(
          `${target_name}高兴的舔着嘴唇，用胸部开始了奉仕………`,
        ); // :3484
      } else if (era0(`talent:${target}:85`) == 1) {
        // 爱慕
        await era.printAndWait(`「呵呵呵、我的胸部…让你很舒服啊…♪」`); // :3487
        await era.printAndWait(
          `${target_name}像是摩擦这艳丽的乳头一样，开始奉仕${player_name}的阴茎………`,
        ); // :3488
      } else if (era0(`abl:${target}:16`) >= 3) {
        // 侍奉精神Lv3以上
        await era.printAndWait(`「总觉得…啊啊…胸部好热…啊、嗯！」`); // :3491
        await era.printAndWait(
          `${target_name}带着出神的表情，继续奉仕着${player_name}的阴茎………`,
        ); // :3492
      } else {
        // それ以外（侍奉精神Lv3未満）
        await era.printAndWait(`「嗯…嗯啊…这、这样的话舒服吗、你…嗯…啊嗯」`); // :3495
        await era.printAndWait(
          `${target_name}虽然对胸部奉仕感到困惑，但还是在继续刺激着${player_name}的阴茎………`,
        ); // :3496
      }
      kojo.乳交 = 1; // :3498 CFLAG:TARGET:333 = 1
      return 0;
    }
    // :3501-3558 二回目以降（八档）
    if (
      era0(`talent:${target}:78`) == 1 &&
      era0(`talent:${target}:76`) == 1 &&
      (kojo.乳交 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :3503-3512 弄乳狂+淫乱（RAND:2 二选一）
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「继续侵犯我的胸部吧…啊啊…用你的阴茎的话我多少次都能高潮…啊啊啊${heart(1)}」`,
        ); // :3505
        await era.printAndWait(
          `${target_name}露出放荡的表情用乳房蹭着${player_name}的阴茎。随着身体的上下摇动，又大又硬的乳头勃起着。`,
        ); // :3506
        await era.printAndWait(
          `「嗯…啊嗯…啊啊…嗯${heart(1)} 就这样射精…然后就这样让我更舒服吧${heart(1)}」`,
        ); // :3507
      } else {
        await era.printAndWait(
          `「啊啊…好舒服…我的胸部被侵犯得好舒服${heart(1)} 啊啊…嗯啊…嗯…啊啊${heart(1)}」`,
        ); // :3509
        await era.printAndWait(
          `${target_name}用乳房奉仕着，想要绝顶那样兴奋着。那表情好像要被快乐和下流融化一样。`,
        ); // :3510
        await era.printAndWait(
          `「我的胸部…已经…不行了…这是这么做就这么舒服什么的…啊…啊啊…阴茎好热啊…${heart(1)}」`,
        ); // :3511
      }
      kojo.乳交 = 8; // :3513 CFLAG:333 = 8
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.乳交 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // :3516-3518 淫乱
      await era.printAndWait(`「嗯…用你的阴茎侵犯我的胸部吧…啊啊…啊啊♪」`); // :3516
      await era.printAndWait(
        `${target_name}看起来很高兴的舔了舔嘴唇，开始了胸部的奉仕。`,
      ); // :3517
      await era.printAndWait(
        `「我的胸部是为了让你舒服而存在的…啊啊啊…${heart(1)}」`,
      ); // :3518
      kojo.乳交 = 7; // :3519 CFLAG:333 = 7
    } else if (
      era0(`talent:${target}:78`) == 1 &&
      era0(`talent:${target}:85`) == 1 &&
      (kojo.乳交 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :3522-3530 弄乳狂+爱（RAND:2 二选一）
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「啊啊…我明明应该让你的阴茎感到舒服才对…啊…嗯…嗯啊${heart(1)}」`,
        ); // :3523
        await era.printAndWait(
          `${target_name}用胸部奉仕着${player_name}阴茎、乳头完全勃起，品味着快感。`,
        ); // :3524
        await era.printAndWait(
          `「我的胸部…已经彻底变得奇怪了…啊啊…明明只是为你服务而已…好舒服啊${heart(1)}」`,
        ); // :3525
      } else {
        await era.printAndWait(
          `「就这样用的胸部变得舒服…啊啊…满满的射出来啊…嗯…啊啊…嗯啊」`,
        ); // :3527
        await era.printAndWait(
          `${target_name}带着出神的表情边用乳房奉仕边说道。`,
        ); // :3528
        await era.printAndWait(
          `「你觉得舒服的话、我也会感觉很幸福的…啊啊${heart(1)}」`,
        ); // :3529
      }
      kojo.乳交 = 6; // :3531 CFLAG:333 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.乳交 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :3534-3536 爱慕
      await era.printAndWait(`「呵呵呵、我的胸部…会让你很舒服的…♪」`); // :3534
      await era.printAndWait(
        `${target_name}像摩擦艳丽的乳头那样，开始奉仕${player_name}的阴茎。`,
      ); // :3535
      await era.printAndWait(`「用我的…用我的胸部满满的射出来吧…${heart(1)}」`); // :3536
      kojo.乳交 = 5; // :3537 CFLAG:333 = 5
    } else if (
      era0(`talent:${target}:78`) == 1 &&
      (kojo.乳交 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :3540-3545 弄乳狂（RAND:2 二选一）
      if (rand_n(2) == 0) {
        await era.printAndWait(`「啊啊…我的胸部…被你的阴茎侵犯了呦…啊啊♪」`); // :3541
        await era.printAndWait(
          `${target_name}看起来很高兴的笑着用乳房夹住${player_name}的阴茎、继续着奉仕………`,
        ); // :3542
      } else {
        await era.printAndWait(
          `「明明是这么屈辱的姿势…我的胸部太舒服了…啊啊…要融化了啊………」`,
        ); // :3544
        await era.printAndWait(
          `${target_name}的两个乳头完全勃起着、${player_name}的阴茎品味着快乐好像变得大了………`,
        ); // :3545
      }
      kojo.乳交 = 4; // :3547 CFLAG:333 = 4
    } else if (
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.乳交 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :3550-3551 侍奉精神Lv3以上
      await era.printAndWait(`「好像…啊啊…胸部变热了…啊、嗯！」`); // :3550
      await era.printAndWait(
        `${target_name}带着出神的表情继续奉仕着${player_name}的阴茎………`,
      ); // :3551
      kojo.乳交 = 3; // :3552 CFLAG:333 = 3
    } else if (kojo.乳交 <= 1 || game.kojo.口上开关 == 2) {
      // :3555-3556 それ以外（侍奉精神Lv3未満）
      await era.printAndWait(
        `「嗯…嗯啊…总觉得胸部…啊嗯…我的胸部变得好奇怪…啊啊………」`,
      ); // :3555
      await era.printAndWait(
        `${target_name}用笨拙的动作继续刺激着${player_name}的阴茎………`,
      ); // :3556
      kojo.乳交 = 2; // :3557 CFLAG:333 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 33) {
    // :3566-3626 股间性交 CFLAG:334（无 RAND；二回目以降五档，顶两档额外要求 TALENT:0 处女）
    if (kojo.股间性交 == 0) {
      // :3568-3579 初めて
      if (era0(`talent:${target}:76`) == 1) {
        // 淫乱
        await era.printAndWait(
          `「用这种要活活急死人的姿势…啊啊…你好可恨啊…嗯…啊恩」`,
        ); // :3571
      } else if (era0(`talent:${target}:85`) == 1) {
        // 爱有り
        await era.printAndWait(
          `「啊啊、舒服吗？我也很舒服…啊…嗯…啊啊…啊啊…${heart(1)}」`,
        ); // :3574
      } else {
        // それ以外（爱無し）
        await era.printAndWait(`「啊啊…让我做这种事…呜…咕…啊…啊…啊嗯」`); // :3577
        await era.printAndWait(
          `「嗯啊…你的那个太精神、好像快从胯下飞出来了似的………」`,
        ); // :3578
      }
      kojo.股间性交 = 1; // :3580 CFLAG:TARGET:334 = 1
      return 0;
    }
    // :3583-3625 二回目以降（五档）
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`talent:${target}:0`) == 1 &&
      (kojo.股间性交 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :3586-3592 淫乱+处女
      await era.printAndWait(`「啊啊…呐…什么时候才会取走我的处女呢？」`); // :3586
      await era.printAndWait(
        `${target_name}的秘裂流着、每次摩擦都会发出下流的声音。`,
      ); // :3587
      await era.printAndWait(
        `「你看…你看…明明我想要你的阴茎想要得不得了…你却不来拿…啊啊${heart(1)}」`,
      ); // :3588
      await era.printAndWait(
        `${target_name}激烈的动着腰的两腿之间，${player_name}拔走了阴茎。`,
      ); // :3589
      await era.printAndWait(
        `「如果太难忍的话…啊…啊啊…呵呵呵、就这样直接插进来也可以哦…${heart(1)}」`,
      ); // :3590
      await era.printAndWait(
        `「………开、开玩笑而已、我会好好的奉仕啦。只要让咱们两个都更舒服这件事不会忘的…啊啊♪」`,
      ); // :3591
      await era.printAndWait(
        `${target_name}扑哧一笑，用股间把${player_name}的阴茎重新夹好、再次开始了股间性交奉仕………`,
      ); // :3592
      kojo.股间性交 = 6; // :3593 CFLAG:334 = 6
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.股间性交 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :3596-3600 淫乱
      await era.printAndWait(
        `「呵呵呵、用这种要活活急死人的姿势…啊啊…你好可恨啊…嗯…啊恩♪」`,
      ); // :3596
      await era.printAndWait(
        `${target_name}的蜜裂里不停的溢出着的爱液沾满了${player_name}的阴茎。`,
      ); // :3597
      await era.printAndWait(
        `「我为了你的阴茎明明什么都能得到、啊啊…好好…好好的插入我的小穴啊！」`,
      ); // :3598
      await era.printAndWait(
        `${target_name}哀求着、但是${player_name}就像是要继续看她这种姿态一般，继续用阴茎摩擦这蜜裂。`,
      ); // :3599
      await era.printAndWait(
        `「嗯…嗯…啊啊…好过分…我的小穴…明明想要你想要的不得了…啊啊${heart(1)}」`,
      ); // :3600
      kojo.股间性交 = 5; // :3601 CFLAG:334 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`talent:${target}:0`) == 1 &&
      (kojo.股间性交 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :3604-3608 爱有り+处女
      await era.printAndWait(
        `「啊啊…好舒服…你的阴茎热得…我好想快融化一样…${heart(1)}」`,
      ); // :3604
      await era.printAndWait(
        `${target_name}还不知道男性的蜜裂里漏出的爱液让那里变得更滑了。`,
      ); // :3605
      await era.printAndWait(
        `「啊呢啊…${heart(1)} 我…嗯啊…变得这么舒服真的没关系吗…啊啊${heart(1)}」`,
      ); // :3606
      await era.printAndWait(
        `「呐…你的东西插进我那里的话会变得更舒服吗？啊恩…啊啊…对、对不起、会好好的把股间性交做的更舒服的！」`,
      ); // :3607
      await era.printAndWait(
        `${target_name}用被打了屁股而含着眼泪的眼睛看着${player_name}继续着股间性交奉仕………`,
      ); // :3608
      kojo.股间性交 = 4; // :3609 CFLAG:334 = 4
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.股间性交 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :3612-3617 爱有り
      await era.printAndWait(
        `「啊啊、舒服吗？我很舒服哦…啊…嗯…啊啊…啊啊…${heart(1)}」`,
      ); // :3612
      await era.printAndWait(
        `${target_name}经过锻炼的细长大腿为了更舒服而努力加紧。`,
      ); // :3613
      await era.printAndWait(
        `「你的阴茎也这么热…啊啊…我的腿好像快融化了…嗯…啊嗯…啊啊嗯${heart(1)}」`,
      ); // :3614
      await era.printAndWait(
        `「我…想要你的…快忍不住了…求你了…快点插进来吧！」`,
      ); // :3615
      await era.printAndWait(
        `面对${target_name}的祈求，${player_name}打了${target_name}的屁股，然后继续股间性交奉仕。`,
      ); // :3616
      await era.printAndWait(`「啊啊…对不起…我会让你更舒服的………」`); // :3617
      kojo.股间性交 = 3; // :3618 CFLAG:334 = 3
    } else if (kojo.股间性交 <= 1 || game.kojo.口上开关 == 2) {
      // :3621-3623 それ以外（爱無し）
      await era.printAndWait(`「额…啊啊…你的…感觉好热…啊啊…」`); // :3621
      await era.printAndWait(
        `${target_name}一边快要哭了一般皱着眉，一边夹紧大腿继续着股间性交。`,
      ); // :3622
      await era.printAndWait(`「这么做的话，我会有感觉的…啊…啊嗯…啊啊！」`); // :3623
      kojo.股间性交 = 2; // :3624 CFLAG:334 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 34) {
    // :3633-3841 骑乘位 CFLAG:335（初めて 三层嵌套 处女×种族×性格 → 9 落点，同 20/21；
    // 二回目以降七档：淫乱+V感覚Lv3以上(8)/淫乱(7)/爱+V感覚Lv3以上(6)/爱慕(5)/屈服刻印Lv3+V感覚Lv3以上(4)/屈服刻印Lv3(3)/それ以外(2)）
    if (kojo.骑乘位 == 0) {
      // :3635-3733 初めて
      if (era0(`talent:${target}:0`) == 1) {
        // :3637-3710 处女
        if (era0(`talent:${target}:314`) == 9) {
          // :3639-3677 魔族
          if (era0(`talent:${target}:76`) == 1) {
            await era.printAndWait(
              `「嗯啊…你的阴茎插进…我的小穴里了…啊…啊啊啊…啊！」`,
            ); // :3642
            await era.printAndWait(
              `${target_name}慢慢的沉下腰、能听到处女膜破裂的声音。`,
            ); // :3643
            await era.printAndWait(
              `「呜…嗯啊啊…你那粗壮的…啊啊…已经完全征服了我的小穴${heart(1)}」`,
            ); // :3644
            await era.printAndWait(
              `${target_name}因为破瓜的痛楚和为${player_name}奉上处女的喜悦而后仰着张开了双翼。`,
            ); // :3645
            await era.printAndWait(
              `${player_name}握着${target_name}的腰，用阴茎放出了魔力。`,
            ); // :3646
            await era.printAndWait(
              `「啊啊啊…嗯嗯啊嗯啊…啊啊${heart(1)} 啊啊…你的魔力…感觉到…了…啊啊${heart(1)}」`,
            ); // :3647
            await era.printAndWait(
              `已经是魔族的${target_name}的身体从内测被${player_name}的魔力侵染着。`,
            ); // :3648
            await era.printAndWait(
              `「啊啊…我的肚子里好热…啊嗯…恩啊…动吧…让我的小穴变得舒服起来…啊…啊啊啊${heart(1)}」`,
            ); // :3649
            await era.printAndWait(`${target_name}生硬，但积极的动了起来。`); // :3650
            await era.printAndWait(`「啊…嗯…啊嗯…啊啊…啊啊啊${heart(1)}」`); // :3651
          } else if (era0(`talent:${target}:85`) == 1) {
            await era.printAndWait(
              `「啊啊…第一次奉献给你…魔王大人…啊啊${heart(1)}」`,
            ); // :3654
            await era.printAndWait(
              `${target_name}跨在${player_name}上面慢慢沉下了腰。`,
            ); // :3655
            await era.printAndWait(`阴茎把蜜裂挤开、对准膣内插了进去。`); // :3656
            await era.printAndWait(
              `「嗯…啊啊啊…嗯…能感觉到…我的处女膜吗？啊…啊啊啊！」`,
            ); // :3657
            await era.printAndWait(
              `阴茎往深处前进，能感觉到处女膜破了。然后${target_name}终于把完全坐了下来、把${player_name}的阴茎连根部也埋了进去。`,
            ); // :3658
            await era.printAndWait(
              `${target_name}因为破瓜的痛楚和为${player_name}奉上处女的喜悦而后仰着张开了双翼。`,
            ); // :3659
            await era.printAndWait(
              `「啊啊啊啊…嗯啊${heart(1)} 啊啊…现在不要动…我会让你舒服起来的…嗯…嗯啊！`,
            ); // :3660（源作误写：本句缺失结尾引号「」，1:1 保真不修正）
            await era.printAndWait(
              `${player_name}握着${target_name}的腰，用阴茎放出了魔力。`,
            ); // :3661
            await era.printAndWait(
              `「啊啊…啊啊嗯啊！啊嗯…我的肚子里…你的魔力满满的注入进来了…啊…啊啊啊啊${heart(1)}」`,
            ); // :3662
            await era.printAndWait(
              `已经是魔族的${target_name}的身体从内测被${player_name}的魔力侵染着。`,
            ); // :3663
            await era.printAndWait(
              `「你的魔力在子宫里留下了标记…啊啊…我已经无法从你身边离开了…${heart(1)}」`,
            ); // :3664
          } else {
            await era.printAndWait(
              `「嗯…嗯…稍、稍微等一下…我还没有心理准备…啊！」`,
            ); // :3667
            await era.printAndWait(
              `${target_name}虽然跨在${player_name}的上面就这样用蜜裂摩擦着阴、但还是无法下定决心。`,
            ); // :3668
            await era.printAndWait(
              `恼羞成怒的${player_name}抓着${target_name}的腰强行的压了下去。`,
            ); // :3669
            await era.printAndWait(`「啊！啊啊！不、不行！不行啊！」`); // :3670
            await era.printAndWait(
              `平时不会因为这种程度而失去平衡的${target_name}因为长时间的膝曲，沉下了腰。`,
            ); // :3671
            await era.printAndWait(`「啊啊啊…啊啊…咕…咦…啊啊啊啊啊！！！」`); // :3672
            await era.printAndWait(
              `${player_name}没放过这个机会，挺起了腰插了进去、滋的一声直接查到了蜜壶的最深处。当然处女膜也毫不留情的被贯穿、破坏掉了。`,
            ); // :3673
            await era.printAndWait(
              `想要逃跑的${target_name}的腰被抓住，${player_name}就这样从阴茎放出了魔力。`,
            ); // :3674
            await era.printAndWait(
              `「啊啊…肚子…好热…不要…不要这样！我已经…不想…变得更加乱七八糟的了！…啊…啊啊啊！」`,
            ); // :3675
            await era.printAndWait(
              `然后${player_name}为了让${target_name}明白到底谁是主人、阴茎慢慢开始了第一次抽插………`,
            ); // :3676
          }
        } else {
          // :3679-3709 非魔族（种族分支同 3639，仅文本略去"我的魔族小穴"等种族用词）
          if (era0(`talent:${target}:76`) == 1) {
            await era.printAndWait(
              `「嗯啊…你的阴茎插进…我的小穴里了…啊…啊啊啊…啊！」`,
            ); // :3681
            await era.printAndWait(
              `${target_name}慢慢的沉下腰、能听到处女膜破裂的声音。`,
            ); // :3682
            await era.printAndWait(
              `「呜…嗯啊啊…你那粗壮的…啊啊…已经完全征服了我的小穴${heart(1)}」`,
            ); // :3683
            await era.printAndWait(
              `${target_name}因为破瓜的痛楚和为${player_name}奉上处女的喜悦而后仰着。`,
            ); // :3684
            await era.printAndWait(
              `「啊啊啊…啊啊…嗯啊…全部都由我来…你不动也没关系…啊嗯${heart(1)}」`,
            ); // :3685
            await era.printAndWait(`${target_name}生硬，但积极的动了起来。`); // :3686
            await era.printAndWait(`「啊…嗯…啊嗯…啊啊…啊啊啊${heart(1)}」`); // :3687
          } else if (era0(`talent:${target}:85`) == 1) {
            await era.printAndWait(
              `「啊啊…第一次奉献给你…魔王大人…啊啊${heart(1)}」`,
            ); // :3690
            await era.printAndWait(
              `${target_name}跨在${player_name}上面慢慢沉下了腰。`,
            ); // :3691
            await era.printAndWait(`阴茎把蜜裂挤开、对准膣内插了进去。`); // :3692
            await era.printAndWait(
              `「嗯…啊啊啊…嗯…能感觉到…我的处女膜吗？啊…啊啊啊！」`,
            ); // :3693
            await era.printAndWait(
              `阴茎往深处前进，能感觉到处女膜破了。然后${target_name}终于把完全坐了下来、把${player_name}的阴茎连根部也埋了进去。`,
            ); // :3694
            await era.printAndWait(
              `${target_name}因为破瓜的痛楚和为${player_name}奉上处女的喜悦而后仰着。`,
            ); // :3695
            await era.printAndWait(
              `「啊啊啊啊…嗯啊${heart(1)} 啊啊…现在不要动…我会让你舒服起来的…嗯…嗯嗯！`,
            ); // :3696（源作误写：本句缺失结尾引号「」，1:1 保真不修正）
            await era.printAndWait(
              `看见呼吸困难的${target_name}、${player_name}开始从下面往上突刺。`,
            ); // :3697
            await era.printAndWait(
              `「嗯…嗯啊…啊嗯！这样…不行…啊啊…嗯…快、快停下…啊啊…啊嗯！」`,
            ); // :3698
          } else {
            await era.printAndWait(
              `「嗯…嗯…稍、稍微等一下…我还没有心理准备…啊！」`,
            ); // :3701
            await era.printAndWait(
              `${target_name}虽然跨在${player_name}的上面就这样用蜜裂摩擦着阴、但还是无法下定决心。`,
            ); // :3702
            await era.printAndWait(
              `恼羞成怒的${player_name}抓着${target_name}的腰强行的压了下去。`,
            ); // :3703
            await era.printAndWait(`「啊！啊啊！不、不行！不行啊！」`); // :3704
            await era.printAndWait(
              `平时不会因为这种程度而失去平衡的${target_name}因为长时间的膝曲，沉下了腰`,
            ); // :3705（源作误写：本句缺失结尾句号，1:1 保真不修正）
            await era.printAndWait(`「啊啊啊…啊啊…咕…咦…啊啊啊啊啊！！」`); // :3706
            await era.printAndWait(
              `${player_name}没放过这个机会，挺起了腰插了进去、滋的一声直接查到了蜜壶的最深处。当然处女膜也毫不留情的被贯穿、破坏掉了。`,
            ); // :3707
            await era.printAndWait(
              `「怎么…怎么这样…咕…嗯嗯！还、还不要动…啊…啊啊！」`,
            ); // :3708
          }
        }
      } else {
        // :3712-3732 非处女
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「呵呵呵、我会让你舒服起来的…你什么都不用做也可以哦…${heart(1)}」`,
          ); // :3715
          await era.printAndWait(
            `${target_name}舔着嘴唇，腰下流的扭动着沉了下去。`,
          ); // :3716
          await era.printAndWait(
            `用又湿润又灼热的蜜壶包裹着${player_name}的阴茎，不由得打了个寒颤。`,
          ); // :3717
          await era.printAndWait(
            `「嗯啊啊${heart(1)} …你的阴茎又热又硬…啊嗯…腰自己动起来了…！」`,
          ); // :3718
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「虽然很害羞…但是如果是你希望的话…这样从上面…啊！」`,
          ); // :3721
          await era.printAndWait(
            `${target_name}一边红着脸，一边跨在${player_name}上面，沉下了腰。`,
          ); // :3722
          await era.printAndWait(
            `「啊嗯…我动就好了…嗯啊…啊…嗯…嗯…嗯啊啊…不行、这样欺负我的话…啊嗯${heart(1)}」`,
          ); // :3723
          await era.printAndWait(
            `配合着${target_name}的腰的上下移动，${player_name}从下面往上顶着。`,
          ); // :3724
          await era.printAndWait(
            `「啊…啊啊！…呀啊…啊…嗯啊啊…你的插到最深处…了！啊啊${heart(1)}」`,
          ); // :3725
        } else {
          await era.printAndWait(
            `「嗯啊…明明知道让我跨在你上面是多么愚蠢…嗯…啊啊啊！嗯、嗯啊！啊！」`,
          ); // :3728
          await era.printAndWait(
            `虽然看见${target_name}在嘟囔着什么，但${player_name}毫不在意的挺着腰，享受着${target_name}的蜜壶。`,
          ); // :3729
          await era.printAndWait(
            `「啊…嗯…啊啊！嗯…啊嗯…真，真是的…为什么…我这样好像被喜欢着一样…啊啊！」`,
          ); // :3730
          await era.printAndWait(
            `看着在${player_name}的腰上跳舞一样的${target_name}、${player_name}把腰挺得更高了………`,
          ); // :3731
        }
      }
      kojo.骑乘位 = 1; // :3734 CFLAG:TARGET:335 = 1
      return 0;
    }
    // :3737-3840 二回目以降（七档）
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:2`) >= 3 &&
      (kojo.骑乘位 <= 7 || game.kojo.口上开关 == 2)
    ) {
      // :3739-3766 淫乱+V感覚Lv3以上（RAND:4→RAND:3→RAND:2 三层四选一）
      if (rand_n(4) == 0) {
        await era.printAndWait(
          `「嗯啊啊…${heart(1)} 你的阴茎…真好吃…啊啊${heart(1)}」`,
        ); // :3741
        await era.printAndWait(
          `${target_name}把${player_name}的阴茎吞进了蜜壶的最深处、慢慢的用腰做起了圆周运动。`,
        ); // :3742
        await era.printAndWait(
          `「啊啊…这样的话阴茎的尖端和我的子宫口…啊${heart(1)} 就会咕啾咕啾的H的接吻…嗯啊啊${heart(1)}」`,
        ); // :3743
        await era.printAndWait(
          `随着腰部的圆周运动的持续，猥琐的词${target_name}嘴里漏了出来。`,
        ); // :3744
        await era.printAndWait(
          `「我的小穴和这根肉棒咕噜咕噜的搅在一起最舒服了${heart(1)} 啊啊${heart(1)} 还不能高潮哦？」`,
        ); // :3745
        await era.printAndWait(
          `「你到我去为止都要忍耐${heart(1)} 啊啊…嗯啊啊啊嗯啊啊啊啊${heart(1)}」`,
        ); // :3746
      } else if (rand_n(3) == 0) {
        await era.printAndWait(
          `「啊嗯…嗯啊嗯…还想要阴茎${heart(1)} 啊啊阴茎好棒${heart(1)}」`,
        ); // :3748
        await era.printAndWait(
          `${player_name}和${target_name}两只手牵在一起、蜜壶和阴茎摩擦着，集中着触觉。`,
        ); // :3749
        await era.printAndWait(
          `${target_name}一边喘息着流着口水，一边上下动着腰。`,
        ); // :3750
        await era.printAndWait(
          `「嗯啊啊啊…你的阴茎连深处都蹭到了，好舒服${heart(1)} 继续侵犯，用你的精液把我的子宫全部染成白色吧${heart(1)}」`,
        ); // :3751
        await era.printAndWait(
          `为了回应激烈的动着的${player_name}。结合部咕啾咕啾的响着水声的${target_name}的声调也越来越高。`,
        ); // :3752
        await era.printAndWait(
          `「啊嗯…啊啊…嗯…啊啊！阴茎好棒…好舒服…我的小穴要发疯了啊啊啊啊啊${heart(1)}」`,
        ); // :3753
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「啊嗯…嗯嗯…这样好舒服！继续插我的小穴…啊啊啊啊${heart(1)}」`,
        ); // :3755
        await era.printAndWait(
          `${player_name}握住${target_name}的腰、不停的不停的向上插着。`,
        ); // :3756
        await era.printAndWait(`${target_name}后仰着发出了叫声。`); // :3757
        await era.printAndWait(
          `「啊嗯…嗯啊啊啊啊…要怪掉了…我的下流小穴…子宫被弄得乱七八糟的！然后变得更舒服了啊啊啊啊啊啊${heart(1)}」`,
        ); // :3758
        await era.printAndWait(
          `听着已经可以说是尖叫的声音，${player_name}继续侵犯着${target_name}………`,
        ); // :3759
      } else {
        await era.printAndWait(
          `「啊啊…就这样把阴茎插在里面生活明明是最棒的…嗯…啊嗯${heart(1)}」`,
        ); // :3761
        await era.printAndWait(
          `${target_name}的腰沉在底部，就这样慢慢左右晃动，充分品味着阴茎的触感。`,
        ); // :3762
        await era.printAndWait(
          `「所以就这样一直抱着我…啊…如何？不行吗？嗯${heart(1)} 不行的话，真可惜…啊啊！」`,
        ); // :3763
        await era.printAndWait(
          `「那么作为代替，这有现在也好，你要一直插在小学里…啊啊…啊嗯…啊嗯嗯啊${heart(1)}」`,
        ); // :3764（源作误写："插在小学里"应为"插在小穴里"，1:1 保真不修正）
        await era.printAndWait(
          `${target_name}想品味着着阴茎一样，继续动着腰………`,
        ); // :3765
      }
      kojo.骑乘位 = 8; // :3767 CFLAG:335 = 8
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.骑乘位 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // :3770-3773 淫乱
      await era.printAndWait(
        `「呵呵呵、我会让你舒服起来的…你什么都不用做也可以哦…${heart(1)}」`,
      ); // :3770
      await era.printAndWait(
        `${target_name}舔着嘴唇，腰下流的扭动着沉了下去。`,
      ); // :3771
      await era.printAndWait(
        `用又湿润又灼热的蜜壶包裹着${player_name}的阴茎，不由得打了个寒颤。`,
      ); // :3772
      await era.printAndWait(
        `「嗯啊啊${heart(1)} …你的阴茎又热又硬…啊嗯…腰自己动起来了…！」`,
      ); // :3773
      kojo.骑乘位 = 7; // :3774 CFLAG:335 = 7
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:2`) >= 3 &&
      (kojo.骑乘位 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :3777-3796 爱+V感覚Lv3以上（RAND:4→RAND:3→RAND:2 三层四选一）
      if (rand_n(4) == 0) {
        await era.printAndWait(
          `「啊嗯…啊啊啊…嗯啊…啊嗯…嗯…不要…绝对不要拔出来…啊${heart(1)}」`,
        ); // :3778
        await era.printAndWait(
          `${target_name}的蜜壶接受着${player_name}的阴茎直到最深处、前后摇动着腰。`,
        ); // :3779
        await era.printAndWait(
          `「啊啊！你的${heart(1)} 在亲吻子宫口…啊…啊啊！我已经…啊嗯…啊啊啊${heart(1)}」`,
        ); // :3780
        await era.printAndWait(`${target_name}喘着粗气，腰的动作激烈了起来………`); // :3781
      } else if (rand_n(3) == 0) {
        await era.printAndWait(
          `「啊嗯…恩…啊啊…嗯…嗯…我的…里面…更乱七八糟的了…啊啊！」`,
        ); // :3783
        await era.printAndWait(
          `${player_name}和${target_name}两手牵在一起，发出着快乐的声音。`,
        ); // :3784
        await era.printAndWait(
          `「嗯…啊啊…好棒…好舒服${heart(1)} 我已经离不开你了…啊啊${heart(1)}」`,
        ); // :3785
        await era.printAndWait(
          `${target_name}的腰不停的动着、每动一次，都会漏出咕啾咕啾的水声………`,
        ); // :3786
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「我还想继续…感受你…啊啊…啊嗯嗯嗯啊${heart(1)}」`,
        ); // :3788
        await era.printAndWait(
          `每次${player_name}向上顶着腰，${target_name}都会漏出撒娇般的声音。`,
        ); // :3789
        await era.printAndWait(
          `「啊嗯…啊啊…再…啊啊${heart(1)} 啊嗯深一点${heart(1)} 深一点${heart(1)}」`,
        ); // :3790
        await era.printAndWait(
          `看着${target_name}快乐的好像快融化一样的表情，${player_name}更用力的动了起来………`,
        ); // :3791
      } else {
        await era.printAndWait(
          `「啊嗯嗯${heart(1)} 不行啊…这么用力…啊啊${heart(1)} 啊啊嗯！」`,
        ); // :3793
        await era.printAndWait(
          `${target_name}否定的话飘出的同时，${player_name}就那样抓住了腰顶了进去。`,
        ); // :3794
        await era.printAndWait(
          `子宫口被龟头挖着${target_name}立刻兴奋了起来。`,
        ); // :3795
        await era.printAndWait(
          `「啊啊啊啊${heart(1)} 你的…你这样实在太H了，不行啊…啊啊啊啊${heart(1)}」`,
        ); // :3796
      }
      kojo.骑乘位 = 6; // :3798 CFLAG:335 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.骑乘位 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :3801-3805 爱慕
      await era.printAndWait(`「虽然不太想这样…俯视你…啊…啊嗯${heart(1)}」`); // :3801
      await era.printAndWait(
        `${target_name}一边红着脸一边跨在${player_name}上面沉下了腰。`,
      ); // :3802
      await era.printAndWait(
        `「嗯啊…我来动就好…嗯…啊…嗯…嗯…啊嗯…再激烈一点比较好吗？」`,
      ); // :3803
      await era.printAndWait(
        `${target_name}笨拙的上下动着腰、生疏而努力的奉仕着${player_name}。`,
      ); // :3804
      await era.printAndWait(`「嗯…嗯…嗯啊…啊啊啊啊…嗯啊…啊啊…嗯${heart(1)}」`); // :3805
      kojo.骑乘位 = 5; // :3806 CFLAG:335 = 5
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      era0(`abl:${target}:2`) >= 3 &&
      (kojo.骑乘位 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :3809-3824 屈服刻印Lv3＋V感覚Lv3以上（RAND:3→RAND:2 二层三选一）
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「嗯啊…嗯啊！嗯嗯…要射出来了！…不然的话，我…啊啊！啊嗯！」`,
        ); // :3810
        await era.printAndWait(
          `${target_name}的腰一扭一扭的上下动着、那已经完全“女人”的动作了。`,
        ); // :3811
        await era.printAndWait(
          `珍珠一样的汗水在额头反着光、渐渐漏出了喘息的声音。`,
        ); // :3812
        await era.printAndWait(
          `「啊…嗯啊…啊嗯…啊啊…我的啊嗯…啊啊…啊啊啊…啊——！」`,
        ); // :3813
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「啊嗯…恩…啊啊…啊啊…嗯…啊嗯！啊啊…被侵犯的这么深…啊啊！」`,
        ); // :3815
        await era.printAndWait(
          `${target_name}像是要品味${player_name}的阴茎一样上下动着腰。`,
        ); // :3816
        await era.printAndWait(`偶尔狠狠撞击到深处时，就会漏出有趣的喘息声。`); // :3817
        await era.printAndWait(
          `「啊嗯啊啊…嗯…啊啊啊！…是、似的…我已经被你开发的…有感觉了…啊…啊嗯啊！」`,
        ); // :3818
      } else {
        await era.printAndWait(`「啊啊…不要再这么顶了…嗯嗯…啊！嗯…啊啊！」`); // :3820
        await era.printAndWait(
          `${target_name}被${player_name}插着、继续刺激着最敏感的地方。`,
        ); // :3821
        await era.printAndWait(
          `一想到即使跨在${player_name}身上也还是被夺走了主导权的屈辱，${target_name}就留下了泪水。`,
        ); // :3822
        await era.printAndWait(
          `「嗯嗯…嗯…我已经…受不了了…啊啊啊啊啊…嗯…嗯！」`,
        ); // :3823
      }
      kojo.骑乘位 = 4; // :3825 CFLAG:335 = 4
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      (kojo.骑乘位 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :3828-3831 屈服刻印Lv3
      await era.printAndWait(`「嗯…嗯啊…啊嗯…恩…这、这样就可以了吧？」`); // :3828
      await era.printAndWait(
        `${target_name}笨拙的动着腰，看样子离有快感还很远。`,
      ); // :3829
      await era.printAndWait(`「嗯啊…来吧，早点射出来吧…嗯…咕啊…啊…啊啊！」`); // :3830
      await era.printAndWait(
        `${player_name}配合着${target_name}的腰动着、${target_name}发出了模糊不清的悲鸣………`,
      ); // :3831
      kojo.骑乘位 = 3; // :3832 CFLAG:335 = 3
    } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
      // :3835-3838 それ以外
      await era.printAndWait(
        `「我坐在上面…真够大意的…啊嗯…即使不掐住你的脖子，杀死你的方法…啊…啊啊！」`,
      ); // :3835
      await era.printAndWait(
        `虽然${target_name}在嘟囔着什么，但${player_name}毫不在意的挺着腰，享受着${target_name}的蜜壶。`,
      ); // :3836
      await era.printAndWait(
        `「啊…嗯…啊啊！啊…嗯啊…我…啊…这样…不行…的…啊啊！」`,
      ); // :3837
      await era.printAndWait(
        `看着在${player_name}的腰上跳舞一样的${target_name}、${player_name}把腰挺得更高了………`,
      ); // :3838
      kojo.骑乘位 = 2; // :3839 CFLAG:335 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 35) {
    // :3848-3895 全身擦洗 CFLAG:336（无 A感覚 分档，四档；侍奉精神Lv3以上（三档）内嵌一条 SIF 独立于 CFLAG 推进）
    if (kojo.全身擦洗 == 0) {
      // :3850-3859 初めて
      if (era0(`abl:${target}:16`) >= 3) {
        // 侍奉精神Lv3以上
        await era.printAndWait(`「来，伸出手…这样帮你洗就行了吧？」`); // :3853
        await era.printAndWait(
          `「啊…啊嗯！不、不要欺负我啊！…啊…嗯嗯！就不能好好地洗澡么？」`,
        ); // :3854
      } else {
        // それ以外
        await era.printAndWait(
          `「啊啊…我也是个女孩子啊…把身体洗干净是很舒服…但是不得不洗你的身体什么的…啊啊」`,
        ); // :3857
        await era.printAndWait(`「而我的身体………」`); // :3858
      }
      kojo.全身擦洗 = 1; // :3860 CFLAG:TARGET:336 = 1
      return 0;
    }
    // :3863-3894 二回目以降（四档）
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:16`) >= 5 &&
      (kojo.全身擦洗 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :3866-3871 淫乱＋侍奉精神Lv5
      await era.printAndWait(
        `「啊嗯啊…啊啊…把手指…插进我里面也可以呦…啊啊${heart(1)}」`,
      ); // :3866
      await era.printAndWait(
        `${target_name}一边抱住${player_name}互相摩擦着上半身、一边把${player_name}的手拉到了自己的股间。`,
      ); // :3867
      await era.printAndWait(
        `「我的小穴…啊啊！要用你的手指来洗…啊啊…嗯！再粗暴些也没关系${heart(1)}」`,
      ); // :3868
      await era.printAndWait(
        `${target_name}的喘息吹到了${player_name}的耳边，腰颤抖，痉挛着。`,
      ); // :3869
      await era.printAndWait(
        `${player_name}的手指一根根的插了进去，搅拌着${target_name}的蜜裂。`,
      ); // :3870
      await era.printAndWait(
        `「啊啊…我的身体…变干净了…嗯…啊嗯…啊啊…嗯…啊啊——${heart(1)}」`,
      ); // :3871
      kojo.全身擦洗 = 5; // :3872 CFLAG:336 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:16`) >= 5 &&
      (kojo.全身擦洗 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :3875-3879 爱＋侍奉精神Lv5
      await era.printAndWait(
        `「啊啊…啊嗯…洗澡好舒服啊、啊啊…呵呵呵、有感觉养的地方吗？」`,
      ); // :3875
      await era.printAndWait(
        `${target_name}抱着${player_name}，用肌肤摩擦着他的后背、勃起的乳头的触感理所当然的能清楚的感觉到。`,
      ); // :3876
      await era.printAndWait(`「这里痒的已经快受不了了吧？」`); // :3877
      await era.printAndWait(
        `${target_name}一边坏笑着把手伸向${player_name}的股间握住了阴茎，一边继续洗背。`,
      ); // :3878
      await era.printAndWait(
        `「啊啊…啊嗯…你的阴茎一抖一抖的…啊啊…洗起来好舒服！好舒服啊${heart(1)}」`,
      ); // :3879
      kojo.全身擦洗 = 4; // :3880 CFLAG:336 = 4
    } else if (
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.全身擦洗 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :3883-3888 侍奉精神Lv3以上（SIF 独立分支，仅台词条件出现，CFLAG 推进不受影响）
      await era.printAndWait(
        `「啊啊…嗯…嗯啊…我帮你洗的很舒服吧？嗯啊…啊啊…啊嗯…啊啊…」`,
      ); // :3883
      await era.printAndWait(
        `${target_name}把${player_name}加到了泡沫中的胸部中间、摩擦着。`,
      ); // :3884
      await era.printAndWait(
        `「继续摸…我的胸部也可以…啊啊…所以老实的把澡洗完…嗯！嗯嗯！」`,
      ); // :3885
      if (rand_n(3) == 0) {
        await era.printAndWait(`「总觉得想起了帮弟弟洗澡的时候………」`); // :3887
      }
      kojo.全身擦洗 = 3; // :3888 CFLAG:336 = 3
    } else if (kojo.全身擦洗 <= 1 || game.kojo.口上开关 == 2) {
      // :3891-3892 それ以外
      await era.printAndWait(
        `「老实点、这样我不是没法好好帮你洗了吗…啊嗯…嗯…啊啊！…喂、不要碰那里…啊啊！」`,
      ); // :3891
      await era.printAndWait(
        `${target_name}开始用身体帮${player_name}洗澡。${target_name}勃起的乳头碰到了${player_name}的后背………`,
      ); // :3892
      kojo.全身擦洗 = 2; // :3893 CFLAG:336 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 36) {
    // :3902-4017 骑乘位肛交 CFLAG:337（无处女判定，按 A感觉/ABL:3 分档；二回目细分 7 档，结构同 SELECTCOM 26-29）
    if (kojo.骑乘位肛交 == 0) {
      // :3904-3942 初めて
      if (era0(`talent:${target}:76`) == 1) {
        // 淫乱
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「嗯…嗯啊…啊啊…你的全部进来了…啊啊${heart(1)}」`,
          ); // :3908
          await era.printAndWait(
            `${target_name}被开发了的肛门把${player_name}阴茎很美味似的吞了下去。`,
          ); // :3909
          await era.printAndWait(`${target_name}左右晃动着腰，发出了喘息声。`); // :3910
          await era.printAndWait(
            `「嗯啊啊…那，差不多该认真的动起来了…啊嗯…恩…啊啊${heart(1)}」`,
          ); // :3911
        } else {
          await era.printAndWait(`「你的全部进来了…啊啊…好、好紧…嗯…咕！」`); // :3913
          await era.printAndWait(
            `${target_name}那还未开发的肛门接受${player_name}阴茎的话，似乎还有些困难。`,
          ); // :3914
          await era.printAndWait(`「但是…我会努力变得有感觉的…嗯…啊嗯！」`); // :3915
        }
      } else if (era0(`talent:${target}:85`) == 1) {
        // 爱慕
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊啊啊！…全都插进来…把你的全都插进我的肛门…啊啊啊${heart(1)}」`,
          ); // :3920
          await era.printAndWait(
            `${target_name}被开发的肛门轻易的吞下了，并紧紧包裹着${player_name}的阴茎。`,
          ); // :3921
          await era.printAndWait(
            `${target_name}一边兴奋的喘着粗气，一边上下动着腰。`,
          ); // :3922
          await era.printAndWait(
            `「我的肛门好舒服！…啊嗯…嗯啊啊啊啊${heart(1)}」`,
          ); // :3923
        } else {
          await era.printAndWait(`「咕…好…紧…嗯啊啊啊…啊嗯…啊啊！」`); // :3925
          await era.printAndWait(
            `${target_name}那还未开发的肛门接受${player_name}阴茎的话，似乎还有些困难。`,
          ); // :3926
          await era.printAndWait(
            `「嗯啊…我来动…嗯…让你舒服起来…啊…${heart(1)}」`,
          ); // :3927
        }
      } else {
        // それ以外（爱無し）
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(`「嗯…嗯嗯！我的肛门啊…啊啊！嗯啊啊啊！」`); // :3932
          await era.printAndWait(
            `经由${player_name}的手开发过的${target_name}的肛门轻易的接受了阴茎。`,
          ); // :3933
          // :3934 缺失结尾引号（源作误写，1:1 保真）
          await era.printAndWait(`「啊啊…嗯啊…嗯…啊啊…啊…啊嗯嗯！`); // :3934
          // :3935 行尾多余的句点＋顿号（"……・"，源作误写，1:1 保真）
          await era.printAndWait(
            `${player_name}向上挺着腰侵犯着${target_name}肛门……・`,
          ); // :3935
        } else {
          await era.printAndWait(`「咕…全都进来了…啊啊…好…好难受…咕！」`); // :3937
          await era.printAndWait(
            `${target_name}未开发的肛门，紧紧地包住了${player_name}的阴茎。`,
          ); // :3938
          await era.printAndWait(
            `${target_name}被${player_name}压住了腰，根本没法逃跑。`,
          ); // :3939
          await era.printAndWait(`「啊啊…已、已经不行了…啊啊！」`); // :3940
        }
      }
      kojo.骑乘位肛交 = 1; // :3943 CFLAG:TARGET:337 = 1
      return 0;
    }
    // :3946-4014 二回目以降（七档：淫乱+A感觉Lv3以上 7 / 淫乱 6 / 爱+A感觉Lv3以上 5 / 爱慕 4 / A感觉Lv3以上 3 / それ以外 2）
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.骑乘位肛交 <= 6 || game.kojo.口上开关 == 2)
    ) {
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「嗯…嗯啊…啊啊…你的全部进来了…啊啊${heart(1)}」`,
        ); // :3950
        await era.printAndWait(
          `${target_name}被开发了的肛门把${player_name}阴茎很美味似的吞了下去。`,
        ); // :3951
        await era.printAndWait(`${target_name}左右晃动着腰，发出了喘息声。`); // :3952
        await era.printAndWait(
          `「嗯啊啊…那，差不多该认真的动起来了…啊嗯…恩…啊啊${heart(1)}」`,
        ); // :3953
        await era.printAndWait(
          `「在我的肛门里…满满的射出来${heart(1)} 让我的肛门怀孕吧${heart(1)}」`,
        ); // :3954
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「嗯…嗯…嗯啊…啊啊…啊啊…我的肛门…实在太舒服了…啊啊啊啊啊${heart(1)}」`,
        ); // :3956
        await era.printAndWait(
          `${target_name}的腰不停的动着、每次抬起腰把阴茎往外拔的时候，都会漏出快要融化一样的表情`,
        ); // :3957
        await era.printAndWait(
          `就那样一口气插下去的话腰就会颤抖起来。那已经是沉浸在快感里的母猪的表情了。`,
        ); // :3958
        await era.printAndWait(
          `「啊…啊啊…嗯啊${heart(1)} 要融化了…肛门要融化了…啊啊——${heart(1)}」`,
        ); // :3959
      } else {
        await era.printAndWait(
          `${target_name}的肛门把${player_name}的阴茎直到根部都吞了下去、前后左右的摇晃着腰。`,
        ); // :3961
        await era.printAndWait(
          `配合着淫乱的腰的动作${target_name}漏出了喘息声。`,
        ); // :3962
        await era.printAndWait(
          `「啊嗯…嗯…嗯嗯…嗯啊嗯嗯${heart(1)} 就这样前后懂的话…嗯！子宫的后面被摩擦的感觉…啊嗯${heart(1)}」`,
        ); // :3963 "前后懂的话"应为"前后动的话"（源作误写，1:1 保真）
        await era.printAndWait(
          `「嗯！这、这样…插过来的话…啊啊啊啊！啊…啊嗯${heart(1)}」`,
        ); // :3964
        await era.printAndWait(
          `${target_name}的嘴里流出了唾液，${player_name}就这样继续突刺着肛门………`,
        ); // :3965
      }
      kojo.骑乘位肛交 = 7; // :3967 CFLAG:337 = 7
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.骑乘位肛交 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :3970-3973 淫乱
      await era.printAndWait(`「你的全部进来了…啊啊…好、好紧…嗯…咕！」`); // :3970
      await era.printAndWait(
        `${target_name}那还未开发的肛门接受${player_name}阴茎的话，似乎还有些困难。`,
      ); // :3971
      await era.printAndWait(`「嗯啊…只有你舒服也好…啊啊…啊嗯${heart(1)}」`); // :3972
      await era.printAndWait(
        `${target_name}继续在${player_name}的上面动着腰………`,
      ); // :3973
      kojo.骑乘位肛交 = 6; // :3974 CFLAG:337 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.骑乘位肛交 <= 4 || game.kojo.口上开关 == 2)
    ) {
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「啊啊啊！…全都插进来…把你的全都插进我的肛门…啊啊啊${heart(1)}」`,
        ); // :3978
        await era.printAndWait(
          `${target_name}被开发的肛门轻易的吞下了，并紧紧包裹着${player_name}的阴茎。`,
        ); // :3979
        await era.printAndWait(
          `${target_name}一边兴奋的喘着粗气，一边上下动着腰。`,
        ); // :3980
        await era.printAndWait(
          `「我的肛门好舒服！…啊嗯…嗯啊啊啊啊${heart(1)}」`,
        ); // :3981
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「啊啊…我的肛门…好有感觉…嗯…啊嗯…啊啊${heart(1)}」`,
        ); // :3983
        await era.printAndWait(
          `${target_name}的腰不停的动着、每次抬起腰把阴茎往外拔的时候，都会漏出快要融化一样的表情`,
        ); // :3984
        // :3985 行尾多余句点（"。。"，源作误写，1:1 保真）
        await era.printAndWait(`就那样一口气插下去的话腰就会颤抖起来。。`); // :3985
        await era.printAndWait(
          `「啊啊…你的好舒服！腰停不下来了…啊啊…啊嗯嗯啊嗯啊${heart(1)}」`,
        ); // :3986
      } else {
        await era.printAndWait(
          `「嗯…啊嗯…啊啊…因为被你开发的原因，肛门舒服的快要坏掉了…啊啊啊啊${heart(1)}」`,
        ); // :3988
        await era.printAndWait(`${target_name}用力夹紧着肛门，前后摆动着。`); // :3989
        await era.printAndWait(
          `「啊啊…嗯、啊啊！嗯…从后面…啊啊…刺激子宫的感觉好舒服…${heart(1)}」`,
        ); // :3990
        await era.printAndWait(
          `${target_name}带着快要融化一样的表情扭动着腰………`,
        ); // :3991
      }
      kojo.骑乘位肛交 = 5; // :3993 CFLAG:337 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :3996-3999 爱慕
      await era.printAndWait(`「咕…嗯…啊…啊啊…嗯啊…啊！」`); // :3996
      await era.printAndWait(
        `${target_name}那还未开发的肛门接受${player_name}阴茎的话，似乎还有些困难。`,
      ); // :3997
      await era.printAndWait(`「嗯啊…我来动…嗯…让你舒服起来…啊…${heart(1)}」`); // :3998
      await era.printAndWait(`${target_name}笨拙的动着腰，继续这肛门的奉仕………`); // :3999
      kojo.骑乘位肛交 = 4; // :4000 CFLAG:337 = 4
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :4003-4006 A感觉Lv3以上
      await era.printAndWait(`「啊啊…腰擅自…动起来了…嗯…嗯啊…嗯…啊啊啊啊！」`); // :4003
      await era.printAndWait(
        `经由${player_name}的手开发过的${target_name}的肛门轻易的接受了阴茎。`,
      ); // :4004
      await era.printAndWait(
        `「啊啊…嗯啊…嗯…啊啊…啊…啊嗯嗯！再、再继续的话…啊啊啊啊啊！」`,
      ); // :4005
      await era.printAndWait(
        `${player_name}向上顶着腰，侵犯着${target_name}的肛门………`,
      ); // :4006
      kojo.骑乘位肛交 = 3; // :4007 CFLAG:337 = 3
    } else if (kojo.骑乘位肛交 <= 1 || game.kojo.口上开关 == 2) {
      // :4010-4013 それ以外（爱無し、A感觉Lv3未满）
      await era.printAndWait(`「啊…好、好紧…咕…嗯咕！」`); // :4010
      await era.printAndWait(
        `${target_name}未开发的肛门，紧紧地包住了${player_name}的阴茎。`,
      ); // :4011
      await era.printAndWait(
        `${target_name}被${player_name}压住了腰，根本没法逃跑。`,
      ); // :4012
      await era.printAndWait(`「快、快停下…啊啊…咕、啊嗯…啊啊——！」`); // :4013
      kojo.骑乘位肛交 = 2; // :4014 CFLAG:337 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 37) {
    // :4023-4066 肛门侍奉 CFLAG:338（无 A感觉/淫乱-爱慕 初めて分档，结构同 SELECTCOM 35 的二回目四档）
    if (kojo.肛门侍奉 == 0) {
      // :4025-4034 初めて
      if (era0(`abl:${target}:16`) >= 3) {
        // 侍奉精神Lv3以上
        await era.printAndWait(
          `「你都是让别人帮你把那里舔干净吧…啊啊、我明白…真没办法」`,
        ); // :4028
        await era.printAndWait(`「嗯…嗯嗯…嗯…啾…就…嗯啾…嗯…嗯啊」`); // :4029
      } else {
        // それ以外（侍奉精神Lv3未满）
        await era.printAndWait(
          `「这么干怎么说都有点………唉、我明白的、不想干也得干对吧？」`,
        ); // :4032
        await era.printAndWait(`「嗯咕…呜…呜…啾…嗯…嗯啊」`); // :4033
      }
      kojo.肛门侍奉 = 1; // :4035 CFLAG:TARGET:338 = 1
      return 0;
    }
    // :4038-4065 二回目以降（四档：淫乱＋侍奉精神Lv5(5)/爱＋侍奉精神Lv5(4)/侍奉精神Lv3以上(3)/それ以外(2)）
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:16`) >= 5 &&
      (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :4041-4045 淫乱＋侍奉精神Lv5
      await era.printAndWait(
        `「如果弄得很舒服的话…有奖励吧？…嗯、啊啊啊………♪」`,
      ); // :4041
      await era.printAndWait(
        `${target_name}高兴的张开嘴一边下流的留着口水一边开始舔舐${player_name}的肛门。`,
      ); // :4042
      await era.printAndWait(
        `「嗯咕…啾咕…啾…嗯…嗯啾…啾…你的肛门真美味…${heart(1)}」`,
      ); // :4043
      await era.printAndWait(
        `${target_name}眼睛中的情欲松弛了下来、完全不在意的舔舐着${player_name}的不净的场所。`,
      ); // :4044
      await era.printAndWait(
        `「你看、我要把舌头放进你的肛门里了…再放松点…嗯…嗯…啾…${heart(1)}」`,
      ); // :4045
      kojo.肛门侍奉 = 5; // :4046 CFLAG:338 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:16`) >= 5 &&
      (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :4049-4052 爱＋侍奉精神Lv5
      await era.printAndWait(
        `「啊啊…只是舔着你的肛门而已、就这么幸福什么的、我已经离不开你了…啾」`,
      ); // :4049
      await era.printAndWait(
        `${target_name}高兴地张开嘴伸出舌头、发出着水声舔舐着${player_name}的肛门。`,
      ); // :4050
      await era.printAndWait(`「嗯啾…啾…啾…嗯…嗯啾…啾…嗯…啊啊」`); // :4051
      await era.printAndWait(`「啊啊…我给你当狗也可以…啾${heart(1)}」`); // :4052
      kojo.肛门侍奉 = 4; // :4053 CFLAG:338 = 4
    } else if (
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :4056-4058 侍奉精神Lv3以上
      await era.printAndWait(
        `「嗯…舔你的肛门什么的，明明应该很屈辱…嗯…嗯啊…啊啊…啾…♪」`,
      ); // :4056
      await era.printAndWait(
        `${target_name}一边喘着粗气一边舔着${player_name}的肛门。`,
      ); // :4057
      await era.printAndWait(`「嗯啾…啾…嗯…啾…♪」`); // :4058
      kojo.肛门侍奉 = 3; // :4059 CFLAG:338 = 3
    } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 == 2) {
      // :4062-4063 それ以外（侍奉精神Lv3未满）
      await era.printAndWait(`「嗯嗯…我的舌头…会烂掉的…嗯…嗯嗯…咕…嗯嗯！」`); // :4062
      await era.printAndWait(
        `${target_name}一边眼里含着泪，一边服侍着${player_name}的肛门………`,
      ); // :4063
      kojo.肛门侍奉 = 2; // :4064 CFLAG:338 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 40) {
    // :4073-4109 打屁股 CFLAG:341（初めて 单档；二回目以降四档，受虐狂っ気/ABL:21）
    if (kojo.打屁股 == 0) {
      // :4076-4077 初めて
      await era.printAndWait(
        `「呃…学别人拷问我么？你这么干的话，很容易就能忍住吧……嗯！啊嗯！」`,
      ); // :4076
      await era.printAndWait(
        `「嗯？…打屁股吗！？…啊啊！我明明已经不是小孩子了！」`,
      ); // :4077
      kojo.打屁股 = 1; // :4078 CFLAG:TARGET:341 = 1
      return 0;
    }
    // :4081-4107 二回目以降（四档：淫乱＋受虐狂っ気Lv3(5)/爱＋受虐狂っ気Lv3(4)/苦痛刻印Lv3+屈服刻印Lv3(3)/それ以外(2)）
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.打屁股 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :4084-4087 淫乱＋受虐狂っ気Lv3
      await era.printAndWait(
        `「再继续打我的屁股！啊啊啊！呀…呀啊${heart(1)}」`,
      ); // :4084
      await era.printAndWait(
        `${target_name}随着被打屁股而发出了娇喘、身体一抖一抖的痉挛了起来。`,
      ); // :4085
      await era.printAndWait(
        `「被你打屁股…啊啊…好舒服…啊啊…啊啊啊——${heart(1)}」`,
      ); // :4086
      // :4087 "辩证这样"应为"变成这样"（源作误写，1:1 保真）
      await era.printAndWait(
        `「啊嗯…我的身体辩证这样，你要负责任啊…啊嗯…啊啊嗯${heart(1)}」`,
      ); // :4087
      kojo.打屁股 = 5; // :4088 CFLAG:TARGET:341 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.打屁股 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :4091-4094 爱＋受虐狂っ気Lv3
      await era.printAndWait(
        `「啊啊…这么中意我的屁股的话…啊嗯…用咬的…就这样吃下去也可以呦…啊嗯${heart(1)}」`,
      ); // :4091
      await era.printAndWait(
        `${target_name}因为被打屁股而漏出了娇喘。连疼痛都变成快感而露出了痴迷的表情。`,
      ); // :4092
      await era.printAndWait(`「啊嗯…啊啊…你真是坏心眼、只打我的屁股………啊嗯」`); // :4093
      await era.printAndWait(`「我想做的事却全都不做…啊…啊啊——！」`); // :4094
      kojo.打屁股 = 4; // :4095 CFLAG:TARGET:341 = 4
    } else if (
      era0(`mark:${target}:0`) == 3 &&
      era0(`mark:${target}:2`) == 3 &&
      (kojo.打屁股 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :4098-4100 苦痛刻印Lv3+屈服刻印Lv3
      await era.printAndWait(
        `「嗯…不要…啊啊…这个打的方式…啊啊啊…和父亲大人打我的方式好像…嗯…咕！」`,
      ); // :4098
      await era.printAndWait(
        `${target_name}想起了曾经屈辱的感觉，一边含着眼泪一边继续被打着。`,
      ); // :4099
      await era.printAndWait(
        `「啊…啊啊…对不起对不起…明明输了还…啊啊…这么屈辱的活着！」`,
      ); // :4100
      kojo.打屁股 = 3; // :4101 CFLAG:TARGET:341 = 3
      // :4103 それ以外分支源作误写用 && 而非 ||（CFLAG:341<=1 && FLAG:7==2）：正常游玩
      // （FLAG:7!=2）时恒为假，此分支在非口上开关模式下永远不会命中，1:1 保真不修正
    } else if (kojo.打屁股 <= 1 && game.kojo.口上开关 == 2) {
      // :4104-4105 それ以外
      await era.printAndWait(`「不更用力的话…啊…不会痛哦…啊嗯」`); // :4104
      await era.printAndWait(`${target_name}被打着屁股依然笑着………`); // :4105
      kojo.打屁股 = 2; // :4106 CFLAG:TARGET:341 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 41) {
    // :4115-4166 鞭 CFLAG:342（初めて 单档；二回目以降八档，受虐狂っ気/ABL:21 三级门槛叠 淫乱/爱/单独）
    if (kojo.鞭 == 0) {
      // :4118-4119 初めて
      await era.printAndWait(
        `「啊啊、终于用对待俘虏的方式对待我了。来，照你想的去做吧！」`,
      ); // :4118
      await era.printAndWait(
        `${target_name}看起来很高兴的接受着${player_name}的鞭打………`,
      ); // :4119
      kojo.鞭 = 1; // :4120 CFLAG:TARGET:342 = 1
      return 0;
    }
    // :4123-4164 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:21`) >= 5 &&
      (kojo.鞭 <= 8 || game.kojo.口上开关 == 2)
    ) {
      // :4126-4127 淫乱＋受虐狂っ気Lv5以上
      await era.printAndWait(
        `「啊啊…想要你的鞭子…你的惩罚…做了很多不好的事情哦…啊嗯…啊啊…请继续用鞭子打我！」`,
      ); // :4126
      await era.printAndWait(
        `${target_name}每次被${player_name}打都发出了好像是故意一样的喘息………`,
      ); // :4127
      kojo.鞭 = 9; // :4128 CFLAG:TARGET:342 = 9
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.鞭 <= 7 || game.kojo.口上开关 == 2)
    ) {
      // :4131-4132 淫乱＋受虐狂っ気Lv3以上
      await era.printAndWait(
        `「啊嗯…啊啊嗯！我的身体好像变奇怪了…啊嗯…你的鞭子很舒服什么的…」`,
      ); // :4131
      await era.printAndWait(
        `${target_name}每次被${player_name}鞭打都会发出娇喘………`,
      ); // :4132
      kojo.鞭 = 8; // :4133 CFLAG:TARGET:342 = 8
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.鞭 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // :4136-4137 淫乱
      await era.printAndWait(`「啊嗯…啊啊啊…呵呵呵、这样…啊啊！」`); // :4136
      await era.printAndWait(
        `${target_name}就这样被${player_name}用鞭子抽打着，缩成了一团………`,
      ); // :4137
      kojo.鞭 = 7; // :4138 CFLAG:TARGET:342 = 7
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:21`) >= 5 &&
      (kojo.鞭 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :4141-4142 爱＋受虐狂っ気Lv5以上
      await era.printAndWait(
        `「啊嗯…啊啊…继续打我！让我感受你的爱${heart(1)}」`,
      ); // :4141
      await era.printAndWait(
        `${target_name}每次被${player_name}打都发出了好像是故意一样的喘息………`,
      ); // :4142
      kojo.鞭 = 6; // :4143 CFLAG:TARGET:342 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.鞭 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :4146-4147 爱＋受虐狂っ気Lv3以上
      await era.printAndWait(
        `「嗯…呵呵呵、感受到了你的爱了…啊啊！就、就是那里…啊嗯！」`,
      ); // :4146
      await era.printAndWait(
        `${target_name}每次被${player_name}鞭打都会发出娇喘………`,
      ); // :4147
      kojo.鞭 = 5; // :4148 CFLAG:TARGET:342 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.鞭 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :4151-4152 爱慕
      await era.printAndWait(
        `「啊啊…用鞭子让我屈服，这是不相信我啊…啊啊…那就继续打吧…啊！」`,
      ); // :4151
      await era.printAndWait(
        `${target_name}就这样被${player_name}用鞭子抽打着，缩成了一团………`,
      ); // :4152
      kojo.鞭 = 4; // :4153 CFLAG:TARGET:342 = 4
    } else if (
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.鞭 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :4156-4157 受虐狂っ気Lv3以上
      await era.printAndWait(
        `「啊啊…由你继续在我的背上刻上伤痕吧…啊…啊啊——！」`,
      ); // :4156
      await era.printAndWait(
        `${target_name}每次被${player_name}鞭打都会发出娇喘………`,
      ); // :4157
      kojo.鞭 = 3; // :4158 CFLAG:TARGET:342 = 3
      // :4160 それ以外分支源作误写引用了 CFLAG:335（骑乘位）而非 CFLAG:342（鞭）本身，
      // 1:1 保真不修正——正常游玩下这条判定跟着骑乘位的推进走，与鞭的推进无关
    } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
      // :4161-4162 それ以外
      await era.printAndWait(
        `「咕…啊啊！呵呵呵…真不愧是这个鞭子，不是一般的疼啊…上次打出来的红肿还这么显眼，看样子消肿还要很长时间」`,
      ); // :4161
      await era.printAndWait(
        `${target_name}一边开着玩笑一边承受着${player_name}的鞭子………`,
      ); // :4162
      kojo.鞭 = 2; // :4163 CFLAG:TARGET:342 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 42) {
    // :4172-4226 针 CFLAG:343（初めて 单档；二回目以降八档，结构同 SELECTCOM 41 鞭）
    if (kojo.针 == 0) {
      // :4175 初めて
      await era.printAndWait(
        `「呵呵呵、用针扎人的话，不扎像指甲缝之类更疼的地方可是没用的呦…？」`,
      ); // :4175
      kojo.针 = 1; // :4176 CFLAG:TARGET:343 = 1
      return 0;
    }
    // :4179-4224 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:21`) >= 5 &&
      (kojo.针 <= 8 || game.kojo.口上开关 == 2)
    ) {
      // :4182-4185 淫乱＋受虐狂っ気Lv5以上
      await era.printAndWait(
        `「啊啊…嗯…把针扎刺进我勃起的乳头里吧…啊啊${heart(1)}」`,
      ); // :4182
      await era.printAndWait(`「这样我就能高潮了…啊啊…喂、求你了${heart(1)}」`); // :4183
      await era.printAndWait(
        `${player_name}听从了${target_name}的愿望、把针刺进了乳头。`,
      ); // :4184
      await era.printAndWait(`「咕啊…啊啊…呀——！好厉害…啊啊…去了啊啊啊——！」`); // :4185
      kojo.针 = 9; // :4186 CFLAG:TARGET:343 = 9
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.针 <= 7 || game.kojo.口上开关 == 2)
    ) {
      // :4189-4190 淫乱＋受虐狂っ気Lv3以上
      await era.printAndWait(`「啊啊…继续刺下来…啊…啊啊…啊嗯${heart(1)}」`); // :4189
      await era.printAndWait(
        `${player_name}如${target_name}所愿的那样，把针一根根的深深插入${target_name}的肌肤………`,
      ); // :4190
      kojo.针 = 8; // :4191 CFLAG:TARGET:343 = 8
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.针 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // :4194-4195 淫乱
      await era.printAndWait(`「啊啊！…嗯啊…咕…痛！」`); // :4194
      await era.printAndWait(`${target_name}的身体被针扎着，流着血………`); // :4195
      kojo.针 = 7; // :4196 CFLAG:TARGET:343 = 7
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:21`) >= 5 &&
      (kojo.针 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :4199-4202 爱＋受虐狂っ気Lv5以上
      await era.printAndWait(`「不要这么普通的用针扎啊…」`); // :4199
      await era.printAndWait(
        `「如果想让我成为你的东西的话…把我的…把我的双眼缝起来，手脚缝在一起…」`,
      ); // :4200
      await era.printAndWait(
        `「我一直就这样等着你…什么时候都可以…啊啊！嗯！」`,
      ); // :4201
      await era.printAndWait(
        `${player_name}为了${target_name}安静下来，姑且先扎了嘴唇………`,
      ); // :4202
      kojo.针 = 6; // :4203 CFLAG:TARGET:343 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.针 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :4206-4207 爱＋受虐狂っ気Lv3以上
      await era.printAndWait(`「啊啊…扎得再深一点…不这样的话感觉不到疼啊！」`); // :4206
      await era.printAndWait(
        `如${target_name}所愿的那样，针一根根的深深插入${target_name}的肌肤………`,
      ); // :4207
      kojo.针 = 5; // :4208 CFLAG:TARGET:343 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.针 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :4211-4212 爱慕
      await era.printAndWait(`「啊啊…被你扎好舒服…呜…咕…啊！」`); // :4211
      await era.printAndWait(`${target_name}露出着被针扎着，流着血的身体………`); // :4212
      kojo.针 = 4; // :4213 CFLAG:TARGET:343 = 4
    } else if (
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.针 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :4216-4217 受虐狂っ気Lv3以上
      await era.printAndWait(`「啊啊…你的针…啊嗯…深一点…嗯…啊啊…咕！」`); // :4216
      await era.printAndWait(`${target_name}的皮肤上到处都流着血、喘着粗气………`); // :4217
      kojo.针 = 3; // :4218 CFLAG:TARGET:343 = 3
    } else if (kojo.针 <= 1 || game.kojo.口上开关 == 2) {
      // :4221-4222 それ以外
      await era.printAndWait(
        `「嗯…嗯…咕…嗯！……呵呵呵、还早得很呢…就这样…还没发让我屈服」`,
      ); // :4221
      await era.printAndWait(
        `${target_name}带着有余裕的表情露出了沾满鲜血的身体………`,
      ); // :4222
      kojo.针 = 2; // :4223 CFLAG:TARGET:343 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`)) {
    // :4233-4276 眼罩 CFLAG:344（開始時，TEQUIP:43 已装）
    if (kojo.眼罩 == 0) {
      // :4236-4237 初めて
      await era.printAndWait(
        `「呵呵呵、拷问也好调教也好、遮断感觉都是常用手段呢」`,
      ); // :4236
      await era.printAndWait(`${target_name}呼的一笑，戴上了眼罩………`); // :4237
      kojo.眼罩 = 1; // :4238 CFLAG:TARGET:344 = 1
      return 0;
    }
    // :4241-4274 二回目以降（八档：淫乱/爱两支各叠受虐狂っ気Lv5以上/Lv3以上/单独三级，加受虐狂っ気Lv3以上与それ以外）
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:21`) >= 5 &&
      (kojo.眼罩 <= 8 || game.kojo.口上开关 == 2)
    ) {
      // :4244 淫乱＋受虐狂っ気Lv5以上
      await era.printAndWait(
        `「不光蒙眼…也用绳子把我帮上的话我会很高兴的…啊啊${heart(1)}」`,
      ); // :4244
      kojo.眼罩 = 9; // :4245 CFLAG:TARGET:344 = 9
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.眼罩 <= 7 || game.kojo.口上开关 == 2)
    ) {
      // :4248 淫乱＋受虐狂っ気Lv3以上
      await era.printAndWait(`「蒙上眼的话…啊啊…敏感度好像确实提高了…」`); // :4248
      kojo.眼罩 = 8; // :4249 CFLAG:TARGET:344 = 8
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.眼罩 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // :4252 淫乱
      await era.printAndWait(`「啊啊、好像兴奋起来了…」`); // :4252
      kojo.眼罩 = 7; // :4253 CFLAG:TARGET:344 = 7
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:21`) >= 5 &&
      (kojo.眼罩 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :4256 爱＋受虐狂っ気Lv5以上
      await era.printAndWait(
        `「不光蒙眼…也用绳子把我帮上的话我会很高兴的…啊啊${heart(1)}」`,
      ); // :4256
      kojo.眼罩 = 6; // :4257 CFLAG:TARGET:344 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.眼罩 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :4260 爱＋受虐狂っ気Lv3以上
      await era.printAndWait(`「蒙上眼的话…啊啊…敏感度好像确实提高了…」`); // :4260
      kojo.眼罩 = 5; // :4261 CFLAG:TARGET:344 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.眼罩 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :4264 爱慕
      await era.printAndWait(`「想对我恶作剧吗？」`); // :4264
      kojo.眼罩 = 4; // :4265 CFLAG:TARGET:344 = 4
    } else if (
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.眼罩 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :4268 受虐狂っ気Lv3以上
      await era.printAndWait(`「啊啊、蒙着眼真好…来吧、玩弄我的身体吧………♪」`); // :4268
      kojo.眼罩 = 3; // :4269 CFLAG:TARGET:344 = 3
    } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 == 2) {
      // :4272 それ以外
      await era.printAndWait(`「呵呵呵、还要蒙着眼玩吗？」`); // :4272
      kojo.眼罩 = 2; // :4273 CFLAG:TARGET:344 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`) == 0) {
    // :4278-4292 眼罩 CFLAG:380（終了時，TEQUIP:43 已摘下；三档台词相同，仅推进门槛/CFLAG 不同）
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.眼罩着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :4281 淫乱
      await era.printAndWait(`「呵呵呵、玩得很高兴」`); // :4281
      kojo.眼罩着脱 = 3; // :4282 CFLAG:380 = 3
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.眼罩着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :4285 爱慕
      await era.printAndWait(`「呵呵呵、玩得很高兴」`); // :4285
      kojo.眼罩着脱 = 2; // :4286 CFLAG:380 = 2
    } else if (kojo.眼罩着脱 < 1 || game.kojo.口上开关 == 2) {
      // :4287-4290 それ以外
      await era.printAndWait(`「呵呵呵、玩得很高兴」`); // :4289
      kojo.眼罩着脱 = 1; // :4290 CFLAG:380 = 1
    }
    return 0;
  } else if (era_flag.selectcom == 44 && era0(`tequip:${target}:44`)) {
    // :4299-4348 绳子 CFLAG:345（開始時，TEQUIP:44 已装；结构同 SELECTCOM 43 眼罩八档）
    if (kojo.绳子 == 0) {
      // :4302-4303 初めて
      await era.printAndWait(`「呵呵呵、你束缚还真熟练呢」`); // :4302
      await era.printAndWait(
        `「啊啊…不过如果不绑的更紧的话，我很容易就能从绳子里出来哦？」`,
      ); // :4303
      kojo.绳子 = 1; // :4304 CFLAG:TARGET:345 = 1
      return 0;
    }
    // :4307-4346 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:21`) >= 5 &&
      (kojo.绳子 <= 8 || game.kojo.口上开关 == 2)
    ) {
      // :4310-4311 淫乱＋受虐狂っ気Lv5以上
      await era.printAndWait(
        `「啊啊…更多的触碰…我被束缚的身体…啊嗯…感受我吧…${heart(1)}」`,
      ); // :4310
      await era.printAndWait(
        `${target_name}的身体被绳子束缚住、乳房像要飞出来一样被绳子挤在一起………`,
      ); // :4311
      kojo.绳子 = 9; // :4312 CFLAG:TARGET:345 = 9
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.绳子 <= 7 || game.kojo.口上开关 == 2)
    ) {
      // :4315-4316 淫乱＋受虐狂っ気Lv3以上
      await era.printAndWait(
        `「啊啊…被这么紧的绑住的话…啊啊…就算是我也…${heart(1)}」`,
      ); // :4315
      await era.printAndWait(
        `${target_name}被绳子束缚着，漏出了快融化一样的表情………`,
      ); // :4316
      kojo.绳子 = 8; // :4317 CFLAG:TARGET:345 = 8
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.绳子 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // :4320-4321 淫乱
      await era.printAndWait(`「呵呵呵、让我更尽兴吧♪」`); // :4320
      await era.printAndWait(`${target_name}被绳子绑了起来………`); // :4321
      kojo.绳子 = 7; // :4322 CFLAG:TARGET:345 = 7
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:21`) >= 5 &&
      (kojo.绳子 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :4325-4326 爱＋受虐狂っ気Lv5以上
      await era.printAndWait(
        `「喂…我漂亮吗…？ 被你用绳子绑起来…啊啊…没法反抗………${heart(1)}」`,
      ); // :4325
      await era.printAndWait(
        `${target_name}的身体被绳子束缚住、乳房像要飞出来一样被绳子挤在一起………`,
      ); // :4326
      kojo.绳子 = 6; // :4327 CFLAG:TARGET:345 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.绳子 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :4330-4331 爱＋受虐狂っ気Lv3以上
      await era.printAndWait(`「啊啊…被绑起来的话…我也、啊…${heart(1)}」`); // :4330
      await era.printAndWait(
        `${target_name}被绳子束缚着，漏出了快融化一样的表情………`,
      ); // :4331
      kojo.绳子 = 5; // :4332 CFLAG:TARGET:345 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.绳子 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :4335-4336 爱慕
      await era.printAndWait(
        `「啊啊…如果是以前我很快就能从绳子里出来…被你绑的话就什么都办不到了………」`,
      ); // :4335
      await era.printAndWait(`${target_name}因为被绳子绑着而陶醉着………`); // :4336
      kojo.绳子 = 4; // :4337 CFLAG:TARGET:345 = 4
    } else if (
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.绳子 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :4340-4341 受虐狂っ気Lv3以上
      await era.printAndWait(`「啊啊啊、绳子勒得好紧…啊啊…」`); // :4340
      await era.printAndWait(`${target_name}因为被绳子绑着而陶醉着………`); // :4341
      kojo.绳子 = 3; // :4342 CFLAG:TARGET:345 = 3
    } else if (kojo.绳子 <= 1 || game.kojo.口上开关 == 2) {
      // :4345 それ以外
      await era.printAndWait(
        `「嗯…呵呵呵、果然被这么紧的绑住的话…啊啊…还真是逃不了呢」`,
      ); // :4345
      kojo.绳子 = 2; // :4345 CFLAG:TARGET:345 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 44 && era0(`tequip:${target}:44`) == 0) {
    // :4351-4364 绳子 CFLAG:385（終了時，TEQUIP:44 已解开；淫乱/爱慕同档 <2，それ以外 <1）
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :4354 淫乱
      await era.printAndWait(`「啊嗯…还不要解开绳子啊！」`); // :4354
      kojo.绳子着脱 = 2; // :4355 CFLAG:385 = 2
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :4358 爱慕
      await era.printAndWait(`「明明还想继续被绑起来…」`); // :4358
      kojo.绳子着脱 = 2; // :4359 CFLAG:385 = 2
    } else if (kojo.绳子着脱 < 1 || game.kojo.口上开关 == 2) {
      // :4361-4362 それ以外
      await era.printAndWait(`「这就解开了么？」`); // :4362
      kojo.绳子着脱 = 1; // :4363 CFLAG:385 = 1
    }
    return 0;
  } else if (era_flag.selectcom == 45 && era0(`tequip:${target}:45`)) {
    // :4372-4456 口塞 CFLAG:346（開始時，TEQUIP:45 已装；结构同 SC43/44 八档，
    // 上六档各嵌一层 IF TEQUIP:43（眼罩）分岔追加句尾——PRINTFORM 不换行不等待，
    // 接续的 PRINTW 才等待，两者拼成一整句）
    if (kojo.口塞 == 0) {
      // :4375 初めて
      await era.printAndWait(
        `「啊啊…就这样让我戴上口枷…要做很过分的事吗………♪」`,
      ); // :4375
      kojo.口塞 = 1; // :4376 CFLAG:TARGET:346 = 1
      return 0;
    }
    // :4379-4454 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:21`) >= 5 &&
      (kojo.口塞 <= 8 || game.kojo.口上开关 == 2)
    ) {
      // :4382-4388 淫乱＋受虐狂っ気Lv5以上
      await era.printAndWait(
        `「我舒服起来之后一直都很吵呢…没办法呢……${heart(1)}」`,
      ); // :4382
      await era.print(`${target_name}自己戴上了口枷`); // :4383
      if (era0(`tequip:${target}:43`)) {
        await era.printAndWait(`嘴的缝隙里，漏出了灼热的吐息………`); // :4385
      } else {
        await era.printAndWait(`眼神快融化了………`); // :4387
      }
      kojo.口塞 = 9; // :4389 CFLAG:TARGET:346 = 9
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.口塞 <= 7 || game.kojo.口上开关 == 2)
    ) {
      // :4392-4398 淫乱＋受虐狂っ気Lv3以上
      await era.printAndWait(`「啊啊、带上这个…总觉得怪怪的…嗯咕………」`); // :4392
      await era.print(`${target_name}被按上了口塞`); // :4393
      if (era0(`tequip:${target}:43`)) {
        await era.printAndWait(`嘴的缝隙里，漏出了灼热的吐息………`); // :4395
      } else {
        await era.printAndWait(`眼神快融化了………`); // :4397
      }
      kojo.口塞 = 8; // :4399 CFLAG:TARGET:346 = 8
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.口塞 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // :4402-4408 淫乱
      await era.printAndWait(`「我的嘴想要的明明不是这个…嗯…嗯咕…」`); // :4402
      await era.print(`${target_name}被戴上了口塞`); // :4403
      if (era0(`tequip:${target}:43`)) {
        await era.printAndWait(`嘴的缝隙里，漏出了灼热的吐息………`); // :4405
      } else {
        await era.printAndWait(`皱着眉看着${player_name}………`); // :4407
      }
      kojo.口塞 = 7; // :4409 CFLAG:TARGET:346 = 7
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:21`) >= 5 &&
      (kojo.口塞 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :4412-4418 爱＋受虐狂っ気Lv5以上
      await era.printAndWait(`「啊嗯…恩…嗯咕………！」`); // :4412
      await era.print(`${target_name}被按上了口塞`); // :4413
      if (era0(`tequip:${target}:43`)) {
        await era.printAndWait(`嘴的缝隙里，漏出了灼热的吐息………`); // :4415
      } else {
        // :4417 与上两档"眼神快融化了………"不同，此处缺"了"字（源作误写，1:1 保真）
        await era.printAndWait(`眼神快融化………`); // :4417
      }
      kojo.口塞 = 6; // :4419 CFLAG:TARGET:346 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.口塞 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :4422-4428 爱＋受虐狂っ気Lv3以上
      await era.printAndWait(`「啊嗯…恩…嗯咕………！」`); // :4422
      await era.print(`${target_name}被按上了口塞`); // :4423
      if (era0(`tequip:${target}:43`)) {
        await era.printAndWait(`嘴的缝隙里，漏出了灼热的吐息………`); // :4425
      } else {
        await era.printAndWait(`眼神快融化………`); // :4427
      }
      kojo.口塞 = 5; // :4429 CFLAG:TARGET:346 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.口塞 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :4432-4438 爱慕
      await era.printAndWait(`「啊嗯…恩…嗯咕………！」`); // :4432
      await era.print(`${target_name}被按上了口塞`); // :4433
      if (era0(`tequip:${target}:43`)) {
        await era.printAndWait(`嘴的缝隙里，漏出了灼热的吐息………`); // :4435
      } else {
        await era.printAndWait(`皱着眉看着${player_name}………`); // :4437
      }
      kojo.口塞 = 4; // :4439 CFLAG:TARGET:346 = 4
    } else if (
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.口塞 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :4442-4448 受虐狂っ気Lv3以上
      await era.printAndWait(
        `「嗯啊…被装上口枷的话，总觉得脑袋都要变成傻瓜了………」`,
      ); // :4442
      await era.print(`${target_name}被按上了口塞`); // :4443
      if (era0(`tequip:${target}:43`)) {
        await era.printAndWait(`嘴的缝隙里，漏出了灼热的吐息………`); // :4445
      } else {
        await era.printAndWait(`眼神快融化………`); // :4447
      }
      kojo.口塞 = 3; // :4449 CFLAG:TARGET:346 = 3
    } else if (kojo.口塞 <= 1 || game.kojo.口上开关 == 2) {
      // :4452-4453 それ以外
      await era.printAndWait(`「啊咕…嗯…」`); // :4452
      await era.printAndWait(
        `${target_name}被口塞堵住的嘴的缝隙里，漏出了声音………`,
      ); // :4453
      kojo.口塞 = 2; // :4454 CFLAG:TARGET:346 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 45 && era0(`tequip:${target}:45`) == 0) {
    // :4459-4476 口塞 CFLAG:386（終了時，TEQUIP:45 已取下；三档台词相同，仅推进门槛/CFLAG 不同）
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.口塞着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :4462-4463 淫乱
      await era.printAndWait(`「啊啊…嗯…嗯啊………」`); // :4462
      await era.printAndWait(`取下了口塞的${target_name}的嘴里，流下了唾液………`); // :4463
      kojo.口塞着脱 = 3; // :4464 CFLAG:386 = 3
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.口塞着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :4467-4468 爱慕
      await era.printAndWait(`「啊啊…嗯…嗯啊………」`); // :4467
      await era.printAndWait(`取下了口塞的${target_name}的嘴里，流下了唾液………`); // :4468
      kojo.口塞着脱 = 2; // :4469 CFLAG:386 = 2
    } else if (kojo.口塞着脱 < 1 || game.kojo.口上开关 == 2) {
      // :4472-4473 それ以外
      await era.printAndWait(`「呼啊…嗯啊…」`); // :4472
      await era.printAndWait(`取下了口塞的${target_name}的嘴里，流下了唾液………`); // :4473
      kojo.口塞着脱 = 1; // :4474 CFLAG:386 = 1
    }
    return 0;
  } else if (era_flag.selectcom == 46 && era0(`tequip:${target}:46`)) {
    // :4483-4529 灌肠肛塞 CFLAG:347（開始時，TEQUIP:46 已装；源作无終了時分支，仅此一档）
    if (kojo.灌肠肛塞 == 0) {
      // :4486-4488 初めて
      await era.printAndWait(
        `「啊啊…嗯啊啊啊…！肚子…啊啊啊…好痛苦…嗯…嗯…快…快停下！」`,
      ); // :4486
      await era.printAndWait(
        `就算是${target_name}，被这样大量的灌肠也开始哭着请求${player_name}的原谅。`,
      ); // :4487
      await era.printAndWait(`「求、求你了…至少…厕所…呀…啊咕！」`); // :4488
      kojo.灌肠肛塞 = 1; // :4489 CFLAG:TARGET:347 = 1
      return 0;
    }
    // :4492-4527 二回目以降（六档：淫乱＋A感觉Lv3以上＋受虐狂っ気Lv3以上(7)/淫乱(6)/爱＋A感觉Lv3以上＋受虐狂っ気Lv3以上(5)/爱慕(4)/A感觉Lv3以上＋受虐狂っ気Lv3以上(3)/それ以外(2)）
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.灌肠肛塞 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // :4495-4497 淫乱＋A感觉Lv3以上＋受虐狂っ気Lv3以上
      await era.printAndWait(
        `「啊啊！继续…继续把灌肠液灌进来！到我的肚子撑起来为止${heart(1)}」`,
      ); // :4495
      await era.printAndWait(
        `${player_name}如${target_name}所愿一次次的灌着肠、插着肛塞的肛门附近，肚子越来越鼓。`,
      ); // :4496
      await era.printAndWait(
        `「啊啊…啊啊啊…这个拔掉的话…会很厉害的喷出来吧…啊啊…啊啊嗯啊${heart(1)}」`,
      ); // :4497
      kojo.灌肠肛塞 = 7; // :4498 CFLAG:347 = 7
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.灌肠肛塞 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :4501-4503 淫乱
      await era.printAndWait(`「啊呜…肚子…啊啊…这么…难受…啊啊…嗯啊啊…」`); // :4501
      await era.printAndWait(
        `${target_name}带着痛苦的表情忍耐着灌肠液的热度。`,
      ); // :4502
      await era.printAndWait(`「啊啊…我最害羞的地方…被盯着…啊啊啊………」`); // :4503
      kojo.灌肠肛塞 = 6; // :4504 CFLAG:347 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.灌肠肛塞 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :4507-4509 爱＋A感觉Lv3以上＋受虐狂っ気Lv3以上
      // :4507 "全时灌肠液"应为"全是灌肠液"（源作误写，1:1 保真）
      await era.printAndWait(
        `「啊…啊嗯嗯！肚子里…全时灌肠液…嗯啊…这样我还有感觉什么的…${heart(1)}」`,
      ); // :4507
      await era.printAndWait(
        `${target_name}一边喘着粗气一边感受着灌肠液的刺激。`,
      ); // :4508
      await era.printAndWait(
        `「啊啊…你的话即使要看我最害羞的地方…啊啊也可以啊！」`,
      ); // :4509
      kojo.灌肠肛塞 = 5; // :4510 CFLAG:347 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.灌肠肛塞 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :4513-4515 爱慕
      await era.printAndWait(`「啊啊…求你了…只、只有你…啊啊不想让你看见！」`); // :4513
      await era.printAndWait(
        `${target_name}一边流着泪，一边恳求着${player_name}。`,
      ); // :4514
      await era.printAndWait(`「啊咕…灌、灌肠液好热！…啊啊…啊啊咕！」`); // :4515
      kojo.灌肠肛塞 = 4; // :4516 CFLAG:347 = 4
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.灌肠肛塞 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :4519-4521 A感觉Lv3以上＋受虐狂っ気Lv3以上
      await era.printAndWait(
        `「嗯啊…啊嗯！…我的肚子…啊啊…咕噜咕噜的响着…啊啊…啊嗯嗯嗯——！」`,
      ); // :4519
      await era.printAndWait(
        `${target_name}在灌肠液的刺激下，一边流着汗，一边漏出了喘息。`,
      ); // :4520
      await era.printAndWait(`而插上肛塞的时候，发出的声音格外的响………`); // :4521
      kojo.灌肠肛塞 = 3; // :4522 CFLAG:347 = 3
    } else if (kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 == 2) {
      // :4525-4526 それ以外
      await era.printAndWait(`「不要…啊啊不要！啊啊…！不要这样！」`); // :4525
      await era.printAndWait(
        `${target_name}和想起了以前的屈辱而哭泣着，${player_name}毫不留情的灌了肠，并把肛塞塞进了肛门………`,
      ); // :4526
      kojo.灌肠肛塞 = 2; // :4527 CFLAG:347 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 55) {
    // :4536-4620 放置PLAY CFLAG:356
    if (kojo.放置PLAY == 0) {
      // :4539-4553 初めて
      if (era0(`talent:${target}:85`) == 1) {
        // :4541-4542 爱慕
        await era.printAndWait(`「啊啊…已经…厌倦我了么？」`); // :4541
        await era.printAndWait(`${target_name}寂寞的嘟囔着………`); // :4542
      } else if (era0(`talent:${target}:76`) == 1) {
        // :4544-4546 淫乱
        await era.printAndWait(`「呐…我可是很讨厌放置play的…」`); // :4545
        await era.printAndWait(`${target_name}噘着嘴发出了抗议的声音………`); // :4546
      } else {
        // :4549-4550 それ以外
        await era.printAndWait(
          `「稍微休息一下吗？倒不如就这样永远休息下去也可以呦」`,
        ); // :4549
        await era.printAndWait(`${target_name}轻蔑的用鼻子笑着………`); // :4550
      }
      kojo.放置PLAY = 1; // :4552 CFLAG:356 = 1
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      palam(5) >= era0('palamlv:3') &&
      (kojo.放置PLAY <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :4557-4559 二回目以降·淫乱＋欲情Lv3以上
      await era.printAndWait(
        `「啊啊…不被你碰，我都着急得快疯了、你这家伙………${heart(1)}」`,
      ); // :4557
      await era.printAndWait(
        `${target_name}的表情放松了下来、眼睛因为发情而湿润取来。有什么契机的话，好像就会那样把${player_name}推到一样………`,
      ); // :4558
      kojo.放置PLAY = 6; // :4559 CFLAG:356 = 6
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.放置PLAY <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :4562-4563 淫乱
      await era.printAndWait(`「呐…我可是很讨厌放置play的…」`); // :4562
      await era.printAndWait(`${target_name}噘着嘴发出了抗议的声音………`); // :4563
      kojo.放置PLAY = 5; // :4564 CFLAG:356 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      palam(5) >= era0('palamlv:3') &&
      (kojo.放置PLAY <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :4567-4568 爱＋欲情Lv3以上
      await era.printAndWait(`「啊啊…继续…疼爱我把…呐………」`); // :4567
      await era.printAndWait(`${target_name}轻轻地把手向${player_name}伸去………`); // :4568
      kojo.放置PLAY = 4; // :4569 CFLAG:356 = 4
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.放置PLAY <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :4572-4573 爱慕
      await era.printAndWait(`「呐、讨厌我了么…？」`); // :4572
      await era.printAndWait(`${target_name}用悲伤的眼睛看着${player_name}………`); // :4573
      kojo.放置PLAY = 3; // :4574 CFLAG:356 = 3
    } else if (kojo.放置PLAY <= 1 || game.kojo.口上开关 == 2) {
      // :4577-4578 それ以外
      await era.printAndWait(`「呼、稍微休息一下吗…」`); // :4577
      await era.printAndWait(`${target_name}无聊的横躺在一边………`); // :4578
      kojo.放置PLAY = 2; // :4579 CFLAG:356 = 2
    }
    await era.print(''); // :4582 PRINTL（空行）
    // :4583-4618 无论初めて/二回目，附加当前装备状态的补充描写（SIF 逐项独立判定，与档位无关）
    if (era0(`tequip:${target}:11`)) {
      await era.printAndWait(
        `${target_name}的蜜裂里，蠕虫蠕动着、毫不留情的搅动着腔内。`,
      ); // :4585
    }
    if (era0(`tequip:${target}:13`)) {
      await era.printAndWait(
        `${target_name}的肛门里，蠕虫蠕动着、毫不留情的蹂躏着肛门。`,
      ); // :4588
    }
    if (era0(`tequip:${target}:19`)) {
      await era.printAndWait(
        `${target_name}的肛门里插着肛珠、肛门不停的抖动着。`,
      ); // :4591
    }
    if (era0(`tequip:${target}:14`)) {
      await era.printAndWait(
        `${target_name}的阴蒂上装着的电动阴蒂夹，持续给予着刺激。`,
      ); // :4594
    }
    if (era0(`tequip:${target}:15`)) {
      await era.printAndWait(
        `${target_name}的乳头上装着的乳头夹，持续给予着刺激。`,
      ); // :4597
    }
    if (era0(`tequip:${target}:16`)) {
      await era.print(`${target_name}的胸部上装着榨乳器，吸出着母乳。`); // :4600 PRINTFORML（不等待）
    }
    if (era0(`tequip:${target}:17`)) {
      await era.printAndWait(
        `${target_name}的阴茎上套着飞机杯，现在也好像快射精一样被摩擦着。`,
      ); // :4603
    }
    if (era0(`tequip:${target}:43`)) {
      await era.printAndWait(`${target_name}带着眼罩。`); // :4606
    }
    if (era0(`tequip:${target}:44`)) {
      await era.printAndWait(`${target_name}的身体被绳子绑住，束缚着。`); // :4609
    }
    if (era0(`tequip:${target}:46`)) {
      await era.printAndWait(
        `${target_name}的肚子因为被灌肠而发出咕噜咕噜的声音，把肛塞拔出来的话马上就会排出来吧。`,
      ); // :4612
    }
    if (era0(`tequip:${target}:49`)) {
      await era.printAndWait(
        `${target_name}的肛门插入着电极，轻轻的电压每次流过，括约肌都会抖动。`,
      ); // :4615
    }
    if (era0(`tequip:${target}:53`)) {
      await era.printAndWait(
        `然后、${target_name}这样的姿态被从头到尾录了下来………`,
      ); // :4618
    }
    return 0;
  } else if (era_flag.selectcom == 56) {
    // :4626-4720 交谈 CFLAG:357
    const master_name = chara_name(0); // :4631/:4676 %NAME:MASTER%
    if (kojo.交谈 == 0) {
      // :4628-4671 初めて
      if (era0(`tequip:${target}:53`) == 1) {
        // :4629-4647 ビデオ自己紹介
        await era.print(`${player_name}催促着${target_name}进行自我介绍、`); // :4631
        if (era0(`talent:${target}:89`) || era0(`abl:${target}:17`) >= 5) {
          await era.print(`${target_name}把自己的本名和至今为止的性经验`); // :4633
          if (era0(`abl:${target}:31`) >= 3) {
            await era.print(`甚至自慰时妄想的内容都`); // :4635
          }
          await era.print(`微笑的娓娓道来……`); // :4636
          await era.print(
            `只是期待着把水晶球的内容送到狂王那里去，股间就开始湿了……`,
          ); // :4637
          game.kojo.录像内容 |= 2; // :4638 TFLAG:32 |= 2
        } else if (
          palam(5) >= era0('palamlv:4') &&
          (era0(`talent:${target}:76`) || era0(`abl:${target}:11`) >= 5)
        ) {
          await era.print(`${target_name}向着水晶球开始说起了猥琐的语言`); // :4640
          game.kojo.录像内容 |= 2; // :4641 TFLAG:32 |= 2
        } else if (
          era0(`talent:${target}:85`) ||
          era0(`abl:${target}:10`) >= 3 ||
          era0(`abl:${target}:11`) >= 4 ||
          era0(`abl:${target}:17`) >= 2
        ) {
          await era.print(`${target_name}开始向水晶球进行自我介绍`); // :4643
          game.kojo.录像内容 |= 2; // :4644 TFLAG:32 |= 2
        } else {
          await era.print(`${target_name}把脸转向一边什么都没说`); // :4646
        }
      } else {
        // :4649-4668 无摄像
        await era.print(`${player_name}`); // :4649
        if (
          palam(5) >= era0('palamlv:4') &&
          (era0(`talent:${target}:85`) || era0(`abl:${target}:10`) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(
            `刚和她交谈了几句、${target_name}就一边晃着腰一边说出了求爱的话语`,
          ); // :4651
        } else if (
          palam(5) >= era0('palamlv:4') &&
          (era0(`talent:${target}:76`) || era0(`abl:${target}:11`) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(
            `刚和她交谈了几句、${target_name}就一边晃着腰，一边不停的说着猥琐的语言`,
          ); // :4653
        } else if (
          (palam(4) >= era0('palamlv:4') ||
            era0(`abl:${target}:10`) >= 5 ||
            era0(`talent:${target}:85`)) &&
          palam(5) >= era0('palamlv:4')
        ) {
          await era.print(`刚和她交谈了几句、${target_name}就一边发出着`); // :4655
          if (
            era0(`tequip:${target}:11`) ||
            era0(`tequip:${target}:13`) ||
            era0(`tequip:${target}:14`) ||
            era0(`tequip:${target}:15`) ||
            era0(`tequip:${target}:16`) ||
            era0(`tequip:${target}:17`)
          ) {
            await era.print(`快乐的`); // :4657
          } else if (
            era0(`tequip:${target}:44`) ||
            era0(`tequip:${target}:49`)
          ) {
            await era.print(`痛苦的`); // :4659
          }
          await era.print(`声音，一边拼命忍耐着的回着话`); // :4661
        } else if (
          palam(4) >= era0('palamlv:4') ||
          era0(`talent:${target}:85`) ||
          era0(`abl:${target}:10`) >= 5
        ) {
          await era.print(
            `刚和她交谈了几句、${target_name}就毫无隔阂的回起话来`,
          ); // :4663
        } else if (
          palam(4) >= era0('palamlv:2') ||
          era0(`abl:${target}:10`) >= 3
        ) {
          await era.print(`刚和她交谈了几句、${target_name}一点点的回起话来`); // :4665
        } else {
          await era.print(
            `刚和她说了几句话、${target_name}就好像认真的听了起来…`,
          ); // :4667
        }
      }
      kojo.交谈 = 1; // :4670 CFLAG:357 = 1
      return 0;
    }
    // :4673-4718 二回目以降（源作不更新 CFLAG:357，此后每次都走这里）
    if (era0(`tequip:${target}:53`) == 1) {
      // :4674-4698 ビデオ自己紹介
      await era.print(`${master_name}催促着${target_name}进行自我介绍、`); // :4676
      if (
        palam(5) >= era0('palamlv:4') &&
        (era0(`talent:${target}:85`) || era0(`abl:${target}:10`) >= 5) &&
        game.event.插着不拔
      ) {
        await era.print(`${target_name}一边晃着腰一边说出了求爱的话语`); // :4678
        game.kojo.录像内容 |= 2; // :4679 TFLAG:32 |= 2
      } else if (
        palam(5) >= era0('palamlv:4') &&
        (era0(`talent:${target}:76`) || era0(`abl:${target}:11`) >= 5) &&
        game.event.插着不拔
      ) {
        // :4681 "晃着要"应为"晃着腰"（源作误写，1:1 保真）
        await era.print(`${target_name}一边晃着要，一边不停的说着猥琐的语言`); // :4681
        game.kojo.录像内容 |= 2; // :4682 TFLAG:32 |= 2
      } else if (
        rand_n(3) == 0 &&
        (era0(`talent:${target}:89`) || era0(`abl:${target}:17`) >= 5)
      ) {
        await era.print(`${target_name}把自己的本命和至今为止的性经验`); // :4684
        if (era0(`abl:${target}:31`) >= 3) {
          await era.print(`、甚至自慰时妄想的内容都`); // :4686
        }
        await era.print(`一边微笑一边喋喋不休的讲着……`); // :4687
        await era.print(
          `只是期待着把水晶球的内容送到狂王那里去，股间就开始湿了……`,
        ); // :4688
        game.kojo.录像内容 |= 2; // :4689 TFLAG:32 |= 2
      } else if (
        palam(5) >= era0('palamlv:4') &&
        (era0(`talent:${target}:76`) || era0(`abl:${target}:11`) >= 5)
      ) {
        await era.print(`${target_name}向着水晶球开始说起了猥琐的语言`); // :4691
        game.kojo.录像内容 |= 2; // :4692 TFLAG:32 |= 2
      } else if (
        era0(`talent:${target}:85`) ||
        era0(`abl:${target}:10`) >= 3 ||
        era0(`abl:${target}:11`) >= 4 ||
        era0(`abl:${target}:17`) >= 2
      ) {
        await era.print(`${target_name}开始向水晶球进行自我介绍`); // :4694
        game.kojo.录像内容 |= 2; // :4695 TFLAG:32 |= 2
      } else {
        await era.print(`${target_name}把脸转向一边什么都没说`); // :4697
      }
    } else {
      // :4700-4717 无摄像
      await era.print(`${player_name}`); // :4700
      if (
        palam(5) >= era0('palamlv:4') &&
        (era0(`talent:${target}:85`) || era0(`abl:${target}:10`) >= 5) &&
        game.event.插着不拔
      ) {
        await era.print(
          `刚和她交谈了几句、${target_name}就一边晃着腰一边说出了求爱的话语`,
        ); // :4702
      } else if (
        palam(5) >= era0('palamlv:4') &&
        (era0(`talent:${target}:76`) || era0(`abl:${target}:11`) >= 5) &&
        game.event.插着不拔
      ) {
        await era.print(
          `刚和她交谈了几句、${target_name}就一边晃着腰，一边不停的说着猥琐的语言`,
        ); // :4704
      } else if (
        (palam(4) >= era0('palamlv:4') ||
          era0(`abl:${target}:10`) >= 5 ||
          era0(`talent:${target}:85`)) &&
        palam(5) >= era0('palamlv:4')
      ) {
        await era.print(`刚和她交谈了几句、${target_name}就一边发出着`); // :4706
        if (
          era0(`tequip:${target}:11`) ||
          era0(`tequip:${target}:13`) ||
          era0(`tequip:${target}:14`) ||
          era0(`tequip:${target}:15`) ||
          era0(`tequip:${target}:16`) ||
          era0(`tequip:${target}:17`)
        ) {
          await era.print(`快乐的`); // :4708
        } else if (era0(`tequip:${target}:44`) || era0(`tequip:${target}:49`)) {
          await era.print(`痛苦的`); // :4710
        }
        await era.print(`声音、一边拼命忍耐着的回着话`); // :4712
      } else if (
        palam(4) >= era0('palamlv:4') ||
        era0(`talent:${target}:85`) ||
        era0(`abl:${target}:10`) >= 5
      ) {
        await era.print(`刚和她交谈了几句、${target_name}就毫无隔阂的回起话来`); // :4714
      } else if (
        palam(4) >= era0('palamlv:2') ||
        era0(`abl:${target}:10`) >= 3
      ) {
        await era.print(`刚和她交谈了几句、${target_name}一点点的回起话来`); // :4716
      } else {
        await era.print(
          `刚和她说了几句话、${target_name}就好像认真的听了起来…`,
        ); // :4718
      }
    }
    return 0;
  } else if (era_flag.selectcom == 69) {
    // :5036-5091 六九式 CFLAG:364
    if (kojo.六九式 == 0) {
      // :5038-5057 初めて
      if (era0(`talent:${target}:76`) == 1) {
        // :5040-5043 淫乱
        await era.printAndWait(
          `「啊啊…继续欺负我的小穴吧${heart(1)} 啊啊…啊嗯…嗯啾…啾啾…啾…啾${heart(1)}」`,
        ); // :5041
        await era.printAndWait(
          `${target_name}发出着蜜裂被爱抚的娇声，热心的开始了对${player_name}阴茎的口腔奉仕。`,
        ); // :5042
        await era.printAndWait(
          `「嗯…嗯…我会让你的阴茎更舒服的…也让我…变得更舒服吧${heart(1)}」`,
        ); // :5043
      } else if (era0(`talent:${target}:85`) == 1) {
        // :5045-5048 爱慕
        await era.printAndWait(
          `「啊啊…嗯…不要…这么努力的舔我…我快不能认真舔你的阴茎了…${heart(1)}」`,
        ); // :5046
        await era.printAndWait(
          `${target_name}每次被舔到蜜裂，都会吮吸${player_name}的阴茎。`,
        ); // :5047
        await era.printAndWait(
          `「啊…嗯…啾…啊…一边被你爱抚一边舔着你，好幸福…${heart(1)}」`,
        ); // :5048
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :5050-5053 侍奉精神Lv3以上
        await era.printAndWait(
          `「啊嗯…恩…嗯啾…啾…嗯啊…啊啊…不要太过分的欺负我…啊啊♪」`,
        ); // :5051
        await era.printAndWait(
          `蜜裂被爱抚的${target_name}、不由得把嘴从${player_name}的阴茎上离开发出了声音。`,
        ); // :5052
        await era.printAndWait(`「你不能不舔吗…嗯…啊啊…嗯…嗯…啾…♪」`); // :5053
      } else {
        // :5055-5057 それ以外（侍奉精神Lv3未満）
        await era.printAndWait(
          `「啊…嗯…嗯…恶、恶作剧太过分的话…我、我就要下去了！」`,
        ); // :5056
        await era.printAndWait(
          `${target_name}一边像是要忍耐蜜裂的刺激一样左右摇动着屁股，一边舔着${player_name}的阴茎………`,
        ); // :5057
      }
      kojo.六九式 = 1; // :5059 CFLAG:TARGET:364 = 1
      return 0;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.六九式 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :5064-5068 二回目以降·淫乱
      await era.printAndWait(
        `「啊啊…继续欺负我的小穴吧${heart(1)} 啊啊…啊嗯…嗯啾…啾啾…啾…啾${heart(1)}」`,
      ); // :5065
      await era.printAndWait(
        `${target_name}发出着蜜裂被爱抚的娇声，热心的开始了对${player_name}阴茎的口腔奉仕。`,
      ); // :5066
      await era.printAndWait(
        `「嗯…嗯…我会让你的阴茎更舒服的…也让我…变得更舒服吧${heart(1)}」`,
      ); // :5067
      await era.printAndWait(
        `「啊啊…啊…嗯…嗯啾…啾…嗯…阴茎…嗯…真棒…${heart(1)}」`,
      ); // :5068
      kojo.六九式 = 5; // :5069 CFLAG:364 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.六九式 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :5071-5075 爱慕
      await era.printAndWait(
        `「啊啊…嗯…不要…这么努力的舔我…我快不能认真舔你的阴茎了…${heart(1)}」`,
      ); // :5072
      await era.printAndWait(
        `${target_name}每次被舔到蜜裂，都会吮吸${player_name}的阴茎。`,
      ); // :5073
      await era.printAndWait(
        `「啊…嗯…啾…啊…一边被你爱抚一边舔着你，好幸福…${heart(1)}」`,
      ); // :5074
      // :5075 结尾多一个引号（源作误写，1:1 保真）
      await era.printAndWait(`「嗯…嗯啾…啾…啾…啾…啊…嗯…再继续…${heart(1)}」」`); // :5075
      kojo.六九式 = 4; // :5076 CFLAG:364 = 4
    } else if (
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.六九式 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :5079-5081 侍奉精神Lv3以上
      await era.printAndWait(
        `「啊嗯…恩…嗯啾…啾…嗯啊…啊啊…不要太过分的欺负我…啊啊♪」`,
      ); // :5079
      await era.printAndWait(
        `蜜裂被爱抚的${target_name}、不由得把嘴从${player_name}的阴茎上离开发出了声音。`,
      ); // :5080
      await era.printAndWait(`「你不能不舔吗…嗯…啊啊…嗯…嗯…啾…♪」`); // :5081
      kojo.六九式 = 3; // :5082 CFLAG:364 = 3
    } else if (kojo.六九式 <= 1 || game.kojo.口上开关 == 2) {
      // :5085-5087 それ以外（侍奉精神Lv3未満；源作缺失结尾引号，1:1 保真）
      await era.printAndWait(
        `「啊…嗯…嗯…啊嗯…嗯啊…嗯…嗯嗯…啾…啾…不、不行啊、这么欺负我的话…啊啊！`,
      ); // :5085
      await era.printAndWait(
        `${target_name}一边像是要忍耐蜜裂的刺激一样左右摇动着屁股，一边舔着${player_name}的阴茎。`,
      ); // :5086
      await era.printAndWait(`「啊嗯…小心我会咬你啊…嗯…啊嗯」`); // :5087
      kojo.六九式 = 2; // :5088 CFLAG:364 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 80) {
    // :5097-5145 强制口交 CFLAG:381（初めて 3 档，二回目 4 档，档位结构不对称，源作如此）
    if (kojo.强制口交 == 0) {
      // :5099-5111 初めて
      if (era0(`talent:${target}:76`) == 1) {
        // :5101-5103 淫乱
        await era.printAndWait(
          `「啊啊…把我的嘴…当做小穴吧…嗯…嗯咕…嗯…嗯咕${heart(1)}」`,
        ); // :5102
        await era.printAndWait(
          `${target_name}直到喉咙深处都被${player_name}的阴茎侵犯着………`,
        ); // :5103
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :5105-5107 侍奉精神Lv3以上
        await era.printAndWait(
          `「嗯咕…嗯…啊嗯…嗯咕…！再、再继续…侵犯我的嘴的话…嗯…嗯咕！」`,
        ); // :5106
        await era.printAndWait(
          `${target_name}的喉咙深处被侵犯着而翻着白眼。只是不用牙碰到${player_name}阴茎就已经竭尽全力了的样子………`,
        ); // :5107
      } else {
        // :5109-5111 それ以外
        await era.printAndWait(
          `「嗯咕…嗯咕…！？…啊、不、不要…嗯咕…嗯…嗯咕！」`,
        ); // :5110
        await era.printAndWait(
          `${target_name}的喉咙深处被侵犯着而翻着白眼。偶尔牙齿碰到阴茎的疼痛也无视，继续插了进去………`,
        ); // :5111
      }
      kojo.强制口交 = 1; // :5113 CFLAG:TARGET:381 = 1
      return 0;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.强制口交 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :5118-5122 二回目以降·淫乱
      await era.printAndWait(
        `「啊啊…把我的嘴…当做小穴吧…嗯…嗯咕…嗯…嗯咕${heart(1)}」`,
      ); // :5119
      await era.printAndWait(
        `${target_name}直到喉咙深处都被${player_name}的阴茎侵犯着。`,
      ); // :5120
      await era.printAndWait(
        `黏糊糊的舌头缠绕着${player_name}的阴茎，为淫靡的味道而高兴着。`,
      ); // :5121
      await era.printAndWait(`「嗯咕…嗯…嗯呼…嗯…啊…嗯…嗯咕${heart(1)}」`); // :5122
      kojo.强制口交 = 5; // :5123 CFLAG:381 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:16`) >= 5 &&
      (kojo.强制口交 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :5126-5129 爱＋侍奉精神Lv5
      await era.printAndWait(`「嗯咕…嗯…嗯…嗯咕…嗯…啊嗯…嗯…嗯咕♪」`); // :5126
      await era.printAndWait(
        `${target_name}知道喉咙深处都被侵犯着，为了给予${player_name}的阴茎快感而奉仕着。`,
      ); // :5127
      await era.printAndWait(
        `黏糊糊的舌头缠绕着${player_name}的阴茎，并为了紧闭嘴唇，让牙不碰到阴茎而努力着。`,
      ); // :5128
      await era.printAndWait(`「嗯啾…啾…嗯咕…嗯…嗯咕…嗯…嗯${heart(1)}」`); // :5129
      kojo.强制口交 = 4; // :5130 CFLAG:381 = 4
    } else if (
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.强制口交 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :5133-5135 侍奉精神Lv3以上
      await era.printAndWait(`「嗯咕…嗯…啊嗯…嗯咕…！再、再…这样…嗯…呜…嗯！」`); // :5133
      await era.printAndWait(
        `${target_name}的喉咙深处被侵犯着而翻着白眼。只是不用牙碰到${player_name}阴茎就已经竭尽全力了的样子。`,
      ); // :5134
      await era.printAndWait(`「咕…咕…继续的话…啊啊…嗯…嗯…啊嗯…恩！」`); // :5135
      kojo.强制口交 = 3; // :5136 CFLAG:381 = 3
    } else if (kojo.强制口交 <= 1 || game.kojo.口上开关 == 2) {
      // :5139-5141 それ以外
      await era.printAndWait(`「嗯咕…嗯咕…！？…啊、不、不要…嗯咕…嗯…嗯咕！」`); // :5139
      await era.printAndWait(
        `${target_name}的喉咙深处被侵犯着而翻着白眼。偶尔牙齿碰到阴茎的疼痛也无视，继续插了进去。`,
      ); // :5140
      await era.printAndWait(`「嗯咕…咳咳…以、已经不行了…嗯…嗯咕…嗯…嗯嗯！」`); // :5141
      kojo.强制口交 = 2; // :5142 CFLAG:381 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 123) {
    // :4727-4804 乳夹口交 CFLAG:360
    const big_breast = () =>
      era0(`talent:${target}:110`) == 1 ||
      era0(`talent:${target}:114`) == 1 ||
      era0(`talent:${target}:119`) == 1; // TALENT:110/114/119（巨乳系）
    if (kojo.乳夹口交 == 0) {
      // :4729-4743 初めて
      if (era0(`talent:${target}:78`) == 1) {
        // :4731-4737 弄乳狂
        await era.printAndWait(
          `「啊嗯…我明明这么舒服…啊啊…胸部太舒服了…嗯…啊嗯…嗯啾…啾♪」`,
        ); // :4732
        await era.printAndWait(
          `${target_name}带着出神的表情一边舔着${player_name}的阴茎，一边加在乳房中间。`,
        ); // :4733
        await era.printAndWait(
          `仔细看的话，${target_name}抓着乳房的手指，正在不停的在乳头上旋转。`,
        ); // :4734
        await era.printAndWait(
          `「嗯…嗯咕…嗯…我…我…我的脑袋变奇怪了…嗯…咕啾…啾……♪」`,
        ); // :4735
        if (big_breast()) {
          await era.printAndWait(
            `「被你变大的胸部…变的更舒服了…嗯…咕啾嗯啾啾♪」`,
          ); // :4737
        }
      } else {
        // :4740-4742 それ以外
        await era.printAndWait(
          `「一边乳交一边口角什么的…还真是变态的嗜好呢、你啊………」`,
        ); // :4740
        await era.printAndWait(
          `${target_name}叹了一口气、${target_name}坦率的开始了乳夹口交。`,
        ); // :4741
        await era.printAndWait(`「啊嗯…嗯…嗯…咕…嗯…啾啾」`); // :4742
      }
      kojo.乳夹口交 = 1; // :4744 CFLAG:TARGET:360 = 1
      return 0;
    } else if (
      era0(`talent:${target}:78`) == 1 &&
      era0(`talent:${target}:76`) == 1 &&
      (kojo.乳夹口交 <= 7 || game.kojo.口上开关 == 2)
    ) {
      // :4749-4756 二回目以降·弄乳狂+淫乱
      if (big_breast()) {
        await era.printAndWait(
          `「这个大胸部…是为了夹住你，让我变得更舒服才变成这样的…${heart(1)}」`,
        ); // :4751
      }
      await era.printAndWait(
        `「啊啊…我的阴茎…让我变得舒服的阴茎…啾…啾…嗯…啾…啾…${heart(1)}」`,
      ); // :4752
      await era.printAndWait(
        `${target_name}的乳房夹住${player_name}的阴茎、一边忍不住的吮吸着阴茎。`,
      ); // :4753
      await era.printAndWait(
        `「嗯啾…啾…啾…啊啊…我的嘴和胸部同时被侵犯…我快高潮了…嗯…啾…嗯${heart(1)}」`,
      ); // :4754
      await era.printAndWait(
        `${target_name}一边漏出灼热的吐息、一边不停的亲吻着从胸部中露出来的${player_name}的阴茎。`,
      ); // :4755
      await era.printAndWait(
        `「啾啾…啾${heart(1)} 我最喜欢的阴茎…啊啊…更加更加更加的让我舒服起来吧${heart(1)} 啾${heart(1)}」`,
      ); // :4756
      kojo.乳夹口交 = 8; // :4757 CFLAG:360 = 8
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.乳夹口交 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // :4760-4765 淫乱
      if (big_breast()) {
        await era.printAndWait(
          `「这个大胸部…是为了夹住你，让我变得更舒服才变成这样的…${heart(1)}」`,
        ); // :4761
      }
      await era.printAndWait(
        `「啊啊…还要舔阴茎呢…嗯…啾…你的阴茎…嗯…啊嗯…嗯嗯${heart(1)}」`,
      ); // :4762
      await era.printAndWait(
        `${target_name}一边用乳房夹着，一边喘着粗气舔着${player_name}的阴茎。`,
      ); // :4763
      await era.printAndWait(
        `「来${heart(1)} …我的嘴和胸部…一起侵犯…让我变得奇怪…嗯…啊嗯…啾啾${heart(1)}」`,
      ); // :4764
      await era.printAndWait(
        `听到这些话的${player_name}更激烈激烈的动起了腰，开始侵犯${target_name}的嘴和胸………`,
      ); // :4765
      kojo.乳夹口交 = 7; // :4766 CFLAG:360 = 7
    } else if (
      era0(`talent:${target}:78`) == 1 &&
      era0(`talent:${target}:85`) == 1 &&
      (kojo.乳夹口交 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :4769-4773 弄乳狂+爱
      if (big_breast()) {
        await era.printAndWait(
          `「这个大胸部…是为了夹住你的时候更舒服才变成这样的…${heart(1)}」`,
        ); // :4770
      }
      await era.printAndWait(
        `${target_name}的乳房夹着${player_name}的阴茎、仔细看的话，${target_name}抓着乳房的手指，正在不停的在乳头上旋转。`,
      ); // :4771
      await era.printAndWait(
        `就这样带着因为舒服而扭曲的脸开始舔起了${player_name}的阴茎。`,
      ); // :4772
      await era.printAndWait(
        `「嗯啾…啾…啾…啊啊…太舒服了…我…要变奇怪了…啾啾…啾${heart(1)}」`,
      ); // :4773
      kojo.乳夹口交 = 6; // :4774 CFLAG:360 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.乳夹口交 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :4777-4781 爱慕
      if (big_breast()) {
        await era.printAndWait(
          `「这个大胸部…是为了夹住你的时候更舒服才变成这样的…${heart(1)}」`,
        ); // :4778
      }
      await era.printAndWait(`「啊啊…还不够过瘾吗？没办法…啊…啾…啾…嗯啾…♪」`); // :4779
      await era.printAndWait(
        `${target_name}一边用乳房夹着${player_name}的阴茎，一边咕噜咕噜的转动着舔着龟头。`,
      ); // :4780
      await era.printAndWait(
        `「嗯嗯…啊啊…你的精液…满满的射出来…啊啊…想要…啊啊…啾…啾咕啾${heart(1)}」`,
      ); // :4781
      kojo.乳夹口交 = 5; // :4782 CFLAG:360 = 5
    } else if (
      era0(`talent:${target}:78`) == 1 &&
      (kojo.乳夹口交 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :4785-4790 弄乳狂
      await era.printAndWait(
        `「啊嗯…我明明这么舒服…啊啊…胸部太舒服了…嗯…啊嗯…嗯啾…啾♪」`,
      ); // :4785
      await era.printAndWait(
        `${target_name}带着出神的表情一边舔着${player_name}的阴茎，一边加在乳房中间。`,
      ); // :4786
      await era.printAndWait(
        `仔细看的话，${target_name}抓着乳房的手指，正在不停的在乳头上旋转。`,
      ); // :4787
      await era.printAndWait(
        `「嗯…嗯咕…嗯…我…我…我的脑袋变奇怪了…嗯…咕啾…啾……♪」`,
      ); // :4788
      if (big_breast()) {
        await era.printAndWait(
          `「被你变大的胸部…变的更舒服了…嗯…咕啾嗯啾啾♪」`,
        ); // :4790
      }
      kojo.乳夹口交 = 4; // :4791 CFLAG:360 = 4
    } else if (
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.乳夹口交 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :4794-4795 侍奉精神Lv3以上
      await era.printAndWait(`「嗯啊…啾…嗯…啾…啾…啾嗯…嗯啊…还要继续刺激吗？」`); // :4794
      await era.printAndWait(
        `${target_name}抿嘴一笑，一边叼着龟头一边抓着胸部继续开始奉仕………`,
      ); // :4795
      kojo.乳夹口交 = 3; // :4796 CFLAG:360 = 3
    } else if (kojo.乳夹口交 <= 1 || game.kojo.口上开关 == 2) {
      // :4799-4800 それ以外（侍奉精神Lv3未満）
      await era.printAndWait(`「嗯…啾…啊…嗯…嗯啾…啾…怎么样？满足了么…？」`); // :4799
      await era.printAndWait(
        `${target_name}一边用乳房夹着${player_name}的阴茎一边咕噜咕噜的舔着尖端………`,
      ); // :4800
      kojo.乳夹口交 = 2; // :4801 CFLAG:360 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 125) {
    // :4809-4863 口交时自慰 CFLAG:361
    if (kojo.口交时自慰 == 0) {
      // :4811-4832 初めて
      if (era0(`talent:${target}:76`) == 1) {
        // :4813-4816 淫乱
        await era.printAndWait(
          `${target_name}看着眼前伸出来的阴茎、露出了稍微有些为难的表情。`,
        ); // :4814
        await era.printAndWait(
          `「啊啊…虽然口交也不错、但还是想集中在自慰上…你还真是坏心眼呢${heart(1)} 啊啊…啊嗯…嗯嗯${heart(1)}」`,
        ); // :4815
        await era.printAndWait(
          `${target_name}高兴地一边含着${player_name}阴茎，一边开始了自慰………`,
        ); // :4816
      } else if (era0(`talent:${target}:85`) == 1) {
        // :4818-4821 爱慕
        await era.printAndWait(
          `${target_name}看着眼前伸出来的${player_name}的阴茎、高兴地含在了嘴里。`,
        ); // :4819
        await era.printAndWait(
          `「啊嗯…嗯…嗯咕…嗯…好吃…还要继续奉仕呢…${heart(1)}」`,
        ); // :4820
        await era.printAndWait(
          `${target_name}一边继续自慰着、一边${player_name}奉仕着的阴茎………`,
        ); // :4821
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :4823-4826 侍奉精神Lv3以上
        await era.printAndWait(
          `${target_name}看着眼前伸出来的${player_name}的阴茎、张开嘴开始填起来尖端。`,
        ); // :4824
        await era.printAndWait(`「嗯嗯…啾…啾…嗯…好吃…嗯啾…啾………」`); // :4825
        await era.printAndWait(
          `${target_name}一边继续自慰着、一边${player_name}奉仕着的阴茎………`,
        ); // :4826
      } else {
        // :4829-4831 それ以外（侍奉精神Lv3未満）
        await era.printAndWait(
          `${target_name}看着眼前伸出来的${player_name}的阴茎、好像察觉到了什么，稍微张着嘴犹豫着。`,
        ); // :4829
        await era.printAndWait(`「啊啊…我舔就行了吧…嗯…嗯啾…啾啾…嗯………」`); // :4830
        await era.printAndWait(
          `${target_name}一边继续自慰着、一边不熟练的舔起了${player_name}的阴茎………`,
        ); // :4831
      }
      kojo.口交时自慰 = 1; // :4833 CFLAG:TARGET:361 = 1
      return 0;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.口交时自慰 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :4838-4842 二回目以降·淫乱
      await era.printAndWait(
        `「啊啊…能用你的阴茎当做自慰的配菜这种事，最棒了…${heart(1)}」`,
      ); // :4839
      await era.printAndWait(
        `${target_name}用鼻子闻着${player_name}的阴茎的气味、慢慢的舔了起来。`,
      ); // :4840
      await era.printAndWait(`「嗯啾…啾…啾…嗯咕…啾咕…啾啾…嗯啾${heart(1)}」`); // :4841
      await era.printAndWait(
        `${player_name}在激烈的口腔奉仕下腰快消失了一样。然后${target_name}的右手为了抚慰自己的蜜裂，激烈地动着………`,
      ); // :4842
      kojo.口交时自慰 = 5; // :4843 CFLAG:361 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.口交时自慰 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :4846-4848 爱慕
      await era.printAndWait(`「嗯啾…啾…嗯…嗯…嗯、嗯——${heart(1)}」`); // :4846
      await era.printAndWait(
        `${target_name}一边带着出神的表情用吮吸着${player_name}的阴茎、一边继续自慰着。`,
      ); // :4847
      await era.printAndWait(
        `「嗯啊${heart(1)} 嗯啊…嗯…不光我变得舒服、还能奉仕你的阴茎呢…嗯…啾…就…嗯${heart(1)}」`,
      ); // :4848
      kojo.口交时自慰 = 4; // :4849 CFLAG:361 = 4
    } else if (
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.口交时自慰 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :4852-4854 侍奉精神Lv3以上
      await era.printAndWait(`「嗯啊…一边舔着你的…一边自慰什么的…啊啊！」`); // :4852
      await era.printAndWait(
        `${target_name}一边发出咕啾咕啾的声音自慰着、一边口腔奉仕着${player_name}的阴茎。`,
      ); // :4853
      await era.printAndWait(`「啾…嗯…嗯…嗯啾…啾…嗯…啾…啾…♪」`); // :4854
      kojo.口交时自慰 = 3; // :4855 CFLAG:361 = 3
    } else if (kojo.口交时自慰 <= 1 || game.kojo.口上开关 == 2) {
      // :4858-4859 それ以外（侍奉精神Lv3未満）
      await era.printAndWait(`「嗯咕…嗯…嗯………」`); // :4858
      await era.printAndWait(
        `${target_name}发出着鼻音、一边自慰一边吮吸着${player_name}的阴茎………`,
      ); // :4859
      kojo.口交时自慰 = 2; // :4860 CFLAG:361 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 126) {
    // :4869-4916 手搓口交 CFLAG:362
    if (kojo.手搓口交 == 0) {
      // :4871-4888 初めて
      if (era0(`talent:${target}:76`) == 1) {
        // :4873-4875 淫乱
        await era.printAndWait(
          `「啊啊嗯…${heart(1)} 嗯…啾…啾…嗯啊…你的阴茎…真好吃…嗯${heart(1)}」`,
        ); // :4874
        await era.printAndWait(
          `${target_name}一边激烈地撸着、一边像舔冰激凌那样温柔地舔着${player_name}的阴茎………`,
        ); // :4875
      } else if (era0(`talent:${target}:85`) == 1) {
        // :4877-4879 爱慕
        await era.printAndWait(
          `「嗯啊…啊啊…嗯…嗯…一边撸一边舔你那坚硬的…嗯啾…啾…啾…${heart(1)}」`,
        ); // :4878
        await era.printAndWait(
          `${target_name}一边温柔的撸着、一边激烈的吮吸着${player_name}的阴茎………`,
        ); // :4879
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :4881-4883 侍奉精神Lv3以上
        await era.printAndWait(
          `「啾…嗯…啾…啾…舒服吗？那我就继续…嗯啾…嗯啾…啾」`,
        ); // :4882
        await era.printAndWait(
          `${target_name}一边脸颊泛红的用手撸着、一边继续口腔奉仕………`,
        ); // :4883
      } else {
        // :4886-4887 それ以外（侍奉精神Lv3未満）
        await era.printAndWait(
          `「啊啊…嗯啾…啾…啾…嗯啊…一边撸…一边舔什么的…嗯………」`,
        ); // :4886
        await era.printAndWait(
          `${target_name}不甘心的一边用手撸着，一边继续着口腔奉仕………`,
        ); // :4887
      }
      kojo.手搓口交 = 1; // :4889 CFLAG:TARGET:362 = 1
      return 0;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.手搓口交 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :4894-4897 二回目以降·淫乱
      await era.printAndWait(
        `「怎么样？一边激烈的帮你撸…啾…再稍微…嗯啾…这么帮你按摩一下的话…啾啾${heart(1)}」`,
      ); // :4895
      await era.printAndWait(
        `「啊嗯…恩…嗯啾…啾…啾…啾…啊嗯…阴茎看起来好像很舒服呢${heart(1)}」`,
      ); // :4896
      await era.printAndWait(
        `${target_name}一边激烈地撸着、一边像舔冰激凌那样温柔地舔着${player_name}的阴茎………`,
      ); // :4897
      kojo.手搓口交 = 5; // :4898 CFLAG:362 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.手搓口交 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :4901-4902 爱慕
      await era.printAndWait(
        `「嗯啊…啊啊…嗯…嗯…一边撸一边舔你那坚硬的…嗯啾…啾…啾…${heart(1)}」`,
      ); // :4901
      await era.printAndWait(
        `${target_name}一边温柔的撸着、一边激烈的吮吸着${player_name}的阴茎………`,
      ); // :4902
      kojo.手搓口交 = 4; // :4903 CFLAG:362 = 4
    } else if (
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.手搓口交 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :4906-4907 侍奉精神Lv3以上
      await era.printAndWait(`「啾…嗯…你被这么做就会很舒服呢…嗯…啾…啾…嗯！」`); // :4906
      await era.printAndWait(
        `${target_name}一边脸颊泛红的用手撸着、一边继续口腔奉仕………`,
      ); // :4907
      kojo.手搓口交 = 3; // :4908 CFLAG:362 = 3
    } else if (kojo.手搓口交 <= 1 || game.kojo.口上开关 == 2) {
      // :4911-4912 それ以外（侍奉精神Lv3未満）
      await era.printAndWait(
        `「嗯…嗯…啾…嗯啊…啾…嗯…为什么我要做这种事………嗯…」`,
      ); // :4911
      await era.printAndWait(
        `${target_name}不甘心的一边用手撸着，一边继续着口腔奉仕………`,
      ); // :4912
      kojo.手搓口交 = 2; // :4913 CFLAG:362 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 127) {
    // :4923-4972 真空口交 CFLAG:363
    if (kojo.真空口交 == 0) {
      // :4925-4942 初めて
      if (era0(`talent:${target}:76`) == 1) {
        // :4927-4929 淫乱
        await era.printAndWait(
          `「你的阴茎…太好吃了…我…已经！…嗯啾啾啾…啾…嗯啾${heart(1)}」`,
        ); // :4928
        await era.printAndWait(
          `${target_name}因为口腔奉仕而兴奋地发出响声，开始吮吸着${player_name}的阴茎………`,
        ); // :4929
      } else if (era0(`talent:${target}:85`) == 1) {
        // :4931-4933 爱慕
        await era.printAndWait(
          `「你的阴茎…明明那么臭…对我来说确实最棒的香味呢…啊啊…嗯啾啾啾${heart(1)}」`,
        ); // :4932
        await era.printAndWait(
          `${target_name}因为口腔奉仕而兴奋地发出响声，开始吮吸着${player_name}的阴茎………`,
        ); // :4933
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :4935-4937 侍奉精神Lv3以上（源作结尾多一个引号，1:1 保真）
        await era.printAndWait(`「嗯…嗯啾…啾…啾…♪啾…啾…♪」」`); // :4936
        await era.printAndWait(
          `${target_name}兴奋的发出着响声，吮吸着${player_name}的阴茎………`,
        ); // :4937
      } else {
        // :4940-4941 それ以外（侍奉精神Lv3未満）
        await era.printAndWait(`「嗯…嗯啾…嗯…嗯…嗯咕…咕…嗯…啾」`); // :4940
        await era.printAndWait(
          `${target_name}一边眼里含着眼泪，一边发出着声音的吮吸着${player_name}的阴茎………`,
        ); // :4941
      }
      kojo.真空口交 = 1; // :4943 CFLAG:TARGET:363 = 1
      return 0;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.真空口交 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :4948-4951 二回目以降·淫乱
      await era.printAndWait(
        `「你的阴茎…太好吃了…我…已经！…嗯啾啾啾…啾…嗯啾${heart(1)}」`,
      ); // :4949
      await era.printAndWait(
        `${target_name}因为口腔奉仕而兴奋地发出响声，开始吮吸着${player_name}的阴茎。`,
      ); // :4950
      await era.printAndWait(
        `「嗯…啾…前列腺液出来了这么多…${heart(1)} 啊啊…真好吃${heart(1)} 嗯啾啾啾啾${heart(1)}」`,
      ); // :4951
      kojo.真空口交 = 5; // :4952 CFLAG:363 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.真空口交 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :4954-4957 爱慕
      await era.printAndWait(
        `「你的阴茎…明明那么臭…对我来说确实最棒的香味呢…啊啊…嗯啾啾啾${heart(1)}」`,
      ); // :4955
      await era.printAndWait(
        `${target_name}因为口腔奉仕而兴奋地发出响声，开始吮吸着${player_name}的阴茎。`,
      ); // :4956
      await era.printAndWait(
        `「在我嘴里…满满的射出来吧…啊啊…${heart(1)} 啾…啾啾…嗯嗯${heart(1)}」`,
      ); // :4957
      kojo.真空口交 = 4; // :4958 CFLAG:363 = 4
    } else if (
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.真空口交 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :4960-4963 侍奉精神Lv3以上（源作结尾多一个引号，1:1 保真）
      await era.printAndWait(`「嗯…嗯啾…啾…啾…♪啾…啾…♪」」`); // :4961
      await era.printAndWait(
        `${target_name}兴奋的发出着响声，吮吸着${player_name}的阴茎。`,
      ); // :4962
      await era.printAndWait(
        `「啊啊…这么吮吸你的的话，我的脑袋…要变奇怪了…啾…啾…啾♪」`,
      ); // :4963
      kojo.真空口交 = 3; // :4964 CFLAG:363 = 3
    } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 == 2) {
      // :4966-4968 それ以外（侍奉精神Lv3未満）
      await era.printAndWait(`「嗯…嗯啾…嗯…嗯…嗯咕…咕…嗯…啾」`); // :4967
      await era.printAndWait(
        `${target_name}一边眼里含着眼泪，一边发出着声音的吮吸着${player_name}的阴茎………`,
      ); // :4968
      kojo.真空口交 = 2; // :4969 CFLAG:363 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 124) {
    // :4979-5029 深喉 CFLAG:365（二回目以降四档全部误读 CFLAG:363「真空口交」而非自身 CFLAG:365，源作 bug，1:1 保真）
    if (kojo.深喉 == 0) {
      // :4981-4998 初めて
      if (era0(`talent:${target}:76`) == 1) {
        // :4983-4985 淫乱
        await era.printAndWait(
          `「啊啊…我已经迷上了你的阴茎了…嗯啾…啾…嗯…嗯${heart(1)}」`,
        ); // :4984
        await era.printAndWait(
          `${target_name}用鼻子喘着气，把${player_name}的阴茎一直吞到了喉咙深处………`,
        ); // :4985
      } else if (era0(`talent:${target}:85`) == 1) {
        // :4987-4989 爱慕
        await era.printAndWait(
          `「啊啊…你的阴茎全都是我的东西…嗯咕…啾…嗯…嗯咕${heart(1)}」`,
        ); // :4988
        await era.printAndWait(
          `${target_name}用鼻子喘着气，把${player_name}的阴茎一直吞到了喉咙深处………`,
        ); // :4989
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :4991-4993 侍奉精神Lv3以上
        await era.printAndWait(`「嗯…嗯…嗯咕…嗯…嗯咕…嗯～♪」`); // :4992
        await era.printAndWait(
          `${target_name}用鼻子喘着气。开始用喉咙深处奉仕${player_name}的阴茎………`,
        ); // :4993
      } else {
        // :4996-4997 それ以外（侍奉精神Lv3未満）
        await era.printAndWait(`「嗯…咕…嗯咕…嗯！」`); // :4996
        await era.printAndWait(
          `${target_name}即使像快要吐了一样，也还是用喉咙深处奉仕着${player_name}的阴茎………`,
        ); // :4997
      }
      kojo.深喉 = 1; // :4999 CFLAG:TARGET:365 = 1
      return 0;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.真空口交 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :5004-5007 二回目以降·淫乱（条件读 CFLAG:363，源作 bug）
      await era.printAndWait(
        `「啊啊…我已经迷上了你的阴茎了…嗯啾…啾…嗯…嗯${heart(1)}」`,
      ); // :5005
      await era.printAndWait(
        `${target_name}用鼻子喘着气，把${player_name}的阴茎一直吞到了喉咙深处。`,
      ); // :5006
      await era.printAndWait(
        `「啾…嗯…嗯咕…嗯…咕…啊啊…嗯…被侵犯嘴里的感觉，受不了…嗯…嗯啾${heart(1)}」`,
      ); // :5007
      kojo.深喉 = 5; // :5008 CFLAG:365 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.真空口交 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :5010-5013 爱慕（条件读 CFLAG:363，源作 bug）
      await era.printAndWait(
        `「啊啊…你的阴茎全都是我的东西…嗯咕…啾…嗯…嗯咕${heart(1)}」`,
      ); // :5011
      await era.printAndWait(
        `${target_name}用鼻子喘着气，把${player_name}的阴茎一直吞到了喉咙深处。`,
      ); // :5012
      await era.printAndWait(
        `「嗯啾…啾…啾…啾…嗯啊…啊啊…能就这样全都吞下去该多好…嗯…嗯啊${heart(1)}」`,
      ); // :5013
      kojo.深喉 = 4; // :5014 CFLAG:365 = 4
    } else if (
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.真空口交 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :5016-5019 侍奉精神Lv3以上（条件读 CFLAG:363，源作 bug）
      await era.printAndWait(`「嗯…嗯…嗯咕…嗯…嗯咕…嗯～♪」`); // :5017
      await era.printAndWait(
        `${target_name}用鼻子喘着气。开始用喉咙深处奉仕${player_name}的阴茎。`,
      ); // :5018
      await era.printAndWait(
        `「嗯啾…啾…嗯～♪…嗯…你的那个太精神了让我有点困扰…嗯…嗯啾…啾♪」`,
      ); // :5019
      kojo.深喉 = 3; // :5020 CFLAG:365 = 3
    } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 == 2) {
      // :5022-5024 それ以外（条件读 CFLAG:363，源作 bug）
      await era.printAndWait(`「嗯…咕…嗯咕…嗯！」`); // :5023
      await era.printAndWait(
        `${target_name}即使像快要吐了一样，也还是用喉咙深处奉仕着${player_name}的阴茎。`,
      ); // :5024
      await era.printAndWait(
        `「呜…嗯啾…啾…啾…嗯啊…不能再深了吧？啊啊…嗯…嗯咕…！」`,
      ); // :5025
      kojo.深喉 = 2; // :5026 CFLAG:365 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 87) {
    // :5153-5438 穿环 CFLAG:348
    const P = piercing_state.p; // COM87 跨模块存活态（写在 @COM87 本体，此处只读）
    if (kojo.穿环 == 0) {
      // :5156-5293 初めて
      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :5157-5158 助手（此档不打印，源作 PRINTFORM 无参数）
        await era.print(''); // :5157-5159
      } else if (era0(`talent:${target}:76`) == 1) {
        // :5161-5203 淫乱
        if (chara(target).train.穿环状态 & P) {
          await era.printAndWait(
            `${target_name}想着第一次在身上打孔的疼痛痛而皱着眉。`,
          ); // :5164
          if (P == 1) {
            await era.printAndWait(
              `「啊嗯…乳头上装上环的话…会太有感觉的…啊啊♪」`,
            ); // :5167
            await era.printAndWait(
              `${target_name}完全勃起的乳头上的环闪着光………`,
            ); // :5168
          } else if (P == 2) {
            await era.printAndWait(`「啊嗯…怎么样？适合我么？」`); // :5171
            await era.printAndWait(`${target_name}的肚脐上，宝石的环闪着光………`); // :5172
          } else if (P == 4) {
            await era.printAndWait(
              `「这么的话…我是色情狂这件事一眼就会被看出来了…${heart(1)}」`,
            ); // :5175
            await era.printAndWait(`${target_name}一次次的拉着阴唇上的环………`); // :5176
          } else if (P == 8) {
            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              await era.printAndWait(
                `「呵呵呵…得到了很棒的东西呢………${heart(1)}」`,
              ); // :5181
              await era.printAndWait(
                `${target_name}的勃起的阴茎上的环闪着光………`,
              ); // :5182
            } else {
              await era.printAndWait(`「我的阴蒂…已经完全变成H专用的了呢…」」`); // :5184
              await era.printAndWait(
                `${target_name}的勃起的阴蒂上的环闪着光………`,
              ); // :5185
            }
          } else if (P == 16) {
            await era.printAndWait(`「呵呵呵、想用这样的舌头口交吗？」`); // :5189
            await era.printAndWait(
              `${target_name}挑衅似的伸出舌头，展示着环………`,
            ); // :5190
          } else if (P == 32) {
            await era.printAndWait(`「啊啊…想用这样的嘴唇接吻呢………」`); // :5193
            await era.printAndWait(`${target_name}为了展示环而撅起了嘴………`); // :5194
          } else if (P == 64) {
            await era.printAndWait(`「这个还是有点害羞呢…嗯？很酷？是这样吗」`); // :5197
            await era.printAndWait(`${target_name}鼻子上的环闪着光………`); // :5198
          }
        } else {
          await era.printAndWait(
            `${target_name}寂寞的抚摸着取下环而留着的伤痕………`,
          ); // :5202
        }
      } else if (era0(`talent:${target}:85`) == 1) {
        // :5205-5247 爱慕
        if (chara(target).train.穿环状态 & P) {
          await era.printAndWait(
            `${target_name}想着第一次在身上打孔的疼痛痛而皱着眉。`,
          ); // :5208
          if (P == 1) {
            await era.printAndWait(
              `「啊啊…连这种事都做了的话…乳头就不能给你以外的人看了呢………♪」`,
            ); // :5211
            await era.printAndWait(`${target_name}乳头上的环闪着光………`); // :5212
          } else if (P == 2) {
            await era.printAndWait(`「怎么样？帅吗？」`); // :5215
            await era.printAndWait(`${target_name}的肚脐上，宝石的环闪着光………`); // :5216
          } else if (P == 4) {
            await era.printAndWait(
              `「啊啊…因为是你希望，所以我才会戴这种东西………」`,
            ); // :5219
            await era.printAndWait(`${target_name}抚摸着阴唇上的环………`); // :5220
          } else if (P == 8) {
            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              await era.printAndWait(`「哇、好害羞啊………」`); // :5225
              await era.printAndWait(`${target_name}阴茎上的环发着光………`); // :5226
            } else {
              await era.printAndWait(`「啊啊…明明是很敏感的地方…这样…啊啊…」`); // :5228
              await era.printAndWait(`${target_name}阴蒂上的环发着光………`); // :5229
            }
          } else if (P == 16) {
            await era.print(`「啊啊…如果和你舌吻的话…会变得很舒服吧…？」`); // :5233
            await era.print(`${target_name}为了展示环而伸出了舌头………`); // :5234
          } else if (P == 32) {
            await era.print(
              `「啊啊、总觉环好奇怪…必须要和你接吻来确认状况呢」`,
            ); // :5237
            await era.print(
              `${target_name}一边害羞的笑着，一边闭上眼撅起了嘴………`,
            ); // :5238
          } else if (P == 64) {
            await era.printAndWait(
              `「这样总觉得有点害羞呢…嗯？可爱？是这样吗」`,
            ); // :5241
            await era.printAndWait(`${target_name}鼻子上的环发着光………`); // :5242
          }
        } else {
          await era.printAndWait(
            `${target_name}寂寞的抚摸着取下环而留着的伤痕………`,
          ); // :5246
        }
      } else {
        // :5249-5291 それ以外
        if (chara(target).train.穿环状态 & P) {
          await era.printAndWait(
            `${target_name}想着第一次在身上打孔的疼痛痛而悲鸣着。`,
          ); // :5252
          if (P == 1) {
            await era.printAndWait(
              `「啊啊…“我就这样变成性奴隶了”…别想的这么简单啊………」`,
            ); // :5255
            await era.printAndWait(`${target_name}乳头上的环闪着光………`); // :5256
          } else if (P == 2) {
            await era.printAndWait(`「嗯、没有更好的环了吗？」`); // :5259
            await era.printAndWait(
              `${target_name}的肚脐上，朴素的环闪着银色的光………`,
            ); // :5260
          } else if (P == 4) {
            await era.printAndWait(`「咕…咕啊…没想到这种地方…啊啊…别啦啊！」`); // :5263
            await era.printAndWait(
              `${target_name}因为阴唇上按的环被拉而发出了悲鸣………`,
            ); // :5264
          } else if (P == 8) {
            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              await era.printAndWait(`「啊咕…咕…这样的东西…不会吧………」`); // :5269
              await era.printAndWait(
                `${target_name}一想到长出的阴茎上被强行装上环的屈辱，就不禁流下了泪………`,
              ); // :5270
            } else {
              await era.printAndWait(
                `「啊啊…嗯…啊啊…对我的敏感的地方…啊啊…做这种…事！」`,
              ); // :5272
              await era.printAndWait(`${target_name}敏感的阴蒂上被装上了环………`); // :5273
            }
          } else if (P == 16) {
            await era.printAndWait(
              `「屈、屈辱啊…这种事…咕…斜、斜呀啊（别啦啊）」`,
            ); // :5277
            await era.printAndWait(
              `${player_name}为了确认环有没有固定好而拉着${target_name}的舌头………`,
            ); // :5278
          } else if (P == 32) {
            await era.printAndWait(
              `「对少女的嘴唇做这种事什么的…你别想有普通的死法…嗯！」`,
            ); // :5281
            await era.printAndWait(
              `${player_name}用鼻子嘲笑着“谁是少女啊？”、拉起了${target_name}的嘴唇来确认环是不是固定好了………`,
            ); // :5282
          } else if (P == 64) {
            await era.printAndWait(`「这种像家畜一样…咕…感觉好屈辱…！」`); // :5285
            await era.printAndWait(`${target_name}的鼻子像牛一样被戴上了环………`); // :5286
          }
        } else {
          await era.printAndWait(
            `${target_name}不甘心的抚摸着取下环而留着的伤痕………`,
          ); // :5290
        }
      }
      kojo.穿环 = 1; // :5293 CFLAG:TARGET:348 = 1
      return 0;
    } else if (era_flag.assi > 0 && era_flag.assiplay) {
      // :5297-5299 二回目以降·助手（此档不打印，源作 PRINTFORM 无参数；不更新 CFLAG:348）
      await era.print(''); // :5297-5299
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.穿环 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :5301-5343 淫乱
      if (chara(target).train.穿环状态 & P) {
        await era.printAndWait(
          `${target_name}想着第一次在身上打孔的疼痛痛而皱着眉。`,
        ); // :5304
        if (P == 1) {
          await era.printAndWait(
            `「啊嗯…乳头上装上环的话…会太有感觉的…啊啊♪」`,
          ); // :5307
          await era.printAndWait(`${target_name}完全勃起的乳头上的环闪着光………`); // :5308
        } else if (P == 2) {
          await era.printAndWait(`「啊嗯…怎么样？适合我么？」`); // :5311
          await era.printAndWait(`${target_name}的肚脐上，宝石的环闪着光………`); // :5312
        } else if (P == 4) {
          await era.printAndWait(
            `「这么的话…我是色情狂这件事一眼就会被看出来了…${heart(1)}」`,
          ); // :5315
          await era.printAndWait(`${target_name}一次次的拉着阴唇上的环………`); // :5316
        } else if (P == 8) {
          if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
            await era.printAndWait(
              `「呵呵呵…得到了很棒的东西呢………${heart(1)}」`,
            ); // :5321
            await era.printAndWait(`${target_name}的勃起的阴茎上的环闪着光………`); // :5322
          } else {
            await era.printAndWait(`「我的阴蒂…已经完全变成H专用的了呢…」」`); // :5324
            await era.printAndWait(`${target_name}的勃起的阴蒂上的环闪着光………`); // :5325
          }
        } else if (P == 16) {
          await era.printAndWait(`「呵呵呵、想用这样的舌头口交吗？」`); // :5329
          await era.printAndWait(`${target_name}挑衅似的伸出舌头，展示着环………`); // :5330
        } else if (P == 32) {
          await era.printAndWait(`「啊啊…想用这样的嘴唇接吻呢………」`); // :5333
          await era.printAndWait(`${target_name}为了展示环而撅起了嘴………`); // :5334
        } else if (P == 64) {
          await era.printAndWait(`「这个还是有点害羞呢…嗯？很酷？是这样吗」`); // :5337
          await era.printAndWait(`${target_name}鼻子上的环闪着光………`); // :5338
        }
      } else {
        await era.printAndWait(
          `${target_name}寂寞的抚摸着取下环而留着的伤痕………`,
        ); // :5342
      }
      kojo.穿环 = 4; // :5344 CFLAG:348 = 4
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.穿环 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :5346-5388 爱慕
      if (chara(target).train.穿环状态 & P) {
        await era.printAndWait(
          `${target_name}想着第一次在身上打孔的疼痛痛而皱着眉。`,
        ); // :5349
        if (P == 1) {
          await era.printAndWait(
            `「啊啊…连这种事都做了的话…乳头就不能给你以外的人看了呢………♪」`,
          ); // :5352
          await era.printAndWait(`${target_name}乳头上的环闪着光………`); // :5353
        } else if (P == 2) {
          await era.printAndWait(`「怎么样？帅吗？」`); // :5356
          await era.printAndWait(`${target_name}的肚脐上，宝石的环闪着光………`); // :5357
        } else if (P == 4) {
          await era.printAndWait(
            `「啊啊…因为是你希望，所以我才会戴这种东西………」`,
          ); // :5360
          await era.printAndWait(`${target_name}抚摸着阴唇上的环………`); // :5361
        } else if (P == 8) {
          if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
            await era.printAndWait(`「哇、好害羞啊………」`); // :5366
            await era.printAndWait(`${target_name}阴茎上的环发着光………`); // :5367
          } else {
            await era.printAndWait(`「啊啊…明明是很敏感的地方…这样…啊啊…」`); // :5369
            await era.printAndWait(`${target_name}阴蒂上的环发着光………`); // :5370
          }
        } else if (P == 16) {
          await era.print(`「啊啊…如果和你舌吻的话…会变得很舒服吧…？」`); // :5374
          await era.print(`${target_name}为了展示环而伸出了舌头………`); // :5375
        } else if (P == 32) {
          await era.print(`「啊啊、总觉环好奇怪…必须要和你接吻来确认状况呢」`); // :5378
          await era.print(
            `${target_name}一边害羞的笑着，一边闭上眼撅起了嘴………`,
          ); // :5379
        } else if (P == 64) {
          await era.printAndWait(`「这样总觉得有点害羞呢…嗯？可爱？是这样吗」`); // :5382
          await era.printAndWait(`${target_name}鼻子上的环发着光………`); // :5383
        }
      } else {
        await era.printAndWait(
          `${target_name}寂寞的抚摸着取下环而留着的伤痕………`,
        ); // :5387
      }
      kojo.穿环 = 3; // :5389 CFLAG:348 = 3
    } else if (kojo.穿环 <= 1 || game.kojo.口上开关 == 2) {
      // :5391-5433 それ以外
      if (chara(target).train.穿环状态 & P) {
        await era.printAndWait(
          `${target_name}想着第一次在身上打孔的疼痛痛而悲鸣着。`,
        ); // :5394
        if (P == 1) {
          await era.printAndWait(
            `「啊啊…“我就这样变成性奴隶了”…别想的这么简单啊………」`,
          ); // :5397
          await era.printAndWait(`${target_name}乳头上的环闪着光………`); // :5398
        } else if (P == 2) {
          await era.printAndWait(`「嗯、没有更好的环了吗？」`); // :5401
          await era.printAndWait(
            `${target_name}的肚脐上，朴素的环闪着银色的光………`,
          ); // :5402
        } else if (P == 4) {
          await era.printAndWait(`「咕…咕啊…没想到这种地方…啊啊…别啦啊！」`); // :5405
          await era.printAndWait(
            `${target_name}因为阴唇上按的环被拉而发出了悲鸣………`,
          ); // :5406
        } else if (P == 8) {
          if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
            await era.printAndWait(`「啊咕…咕…这样的东西…不会吧………」`); // :5411
            await era.printAndWait(
              `${target_name}一想到长出的阴茎上被强行装上环的屈辱，就不禁流下了泪………`,
            ); // :5412
          } else {
            await era.printAndWait(
              `「啊啊…嗯…啊啊…对我的敏感的地方…啊啊…做这种…事！」`,
            ); // :5414
            await era.printAndWait(`${target_name}敏感的阴蒂上被装上了环………`); // :5415
          }
        } else if (P == 16) {
          await era.printAndWait(
            `「屈、屈辱啊…这种事…咕…斜、斜呀啊（别啦啊）」`,
          ); // :5419
          await era.printAndWait(
            `${player_name}为了确认环有没有固定好而拉着${target_name}的舌头………`,
          ); // :5420
        } else if (P == 32) {
          await era.printAndWait(
            `「对少女的嘴唇做这种事什么的…你别想有普通的死法…嗯！」`,
          ); // :5423
          await era.printAndWait(
            `${player_name}用鼻子嘲笑着“谁是少女啊？”、拉起了${target_name}的嘴唇来确认环是不是固定好了………`,
          ); // :5424
        } else if (P == 64) {
          await era.printAndWait(`「这种像家畜一样…咕…感觉好屈辱…！」`); // :5427
          await era.printAndWait(`${target_name}的鼻子像牛一样被戴上了环………`); // :5428
        }
      } else {
        await era.printAndWait(
          `${target_name}不甘心的抚摸着取下环而留着的伤痕………`,
        ); // :5432
      }
      kojo.穿环 = 2; // :5434 CFLAG:348 = 2
    }
    return 0;
  }
  return 0;
}

// 注册进分发族（TRYCALLFORM KOJO_MESSAGE_COM_8 的等价物；重复注册抛错）
kojo_message_com_family.register(8, kojo_message_com_8);

/**
 * @DOG_KOJO_8（:5446-6245）：兽奸 PLAY 的专用口上（头部守卫 TEQUIP:89 岔入）。
 * 与主 COM_8 同构：SELECTCOM 0/1/5/6/9/21/27/30/31/34/37/43/56 各支 +
 * 牝犬（TALENT:136）分档。**源文全部 PRINTFORMW/PRINTFORML 均为空参数**
 * （汉化版兽奸对白被整段删除，仅保留状态机骨架，逐行核对确认，1:1 保真
 * 不补写台词）；CFLAG 计数器与主 COM_8 对应指令共用同一存储（301=爱抚、
 * 302=舔阴、306=胸爱抚、307=接吻、310=舔肛、322=背后位、328=背后位肛交、
 * 331=手淫、332=口交_奴、335=骑乘位、338=肛门侍奉、344=眼罩、357=交谈，
 * 兽奸眼罩终了时另写 444）。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0
 */
async function dog_kojo_8(rand) {
  const target = era_flag.target;
  const kojo = chara(target).kojo;
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));

  if (era_flag.selectcom == 0) {
    // :5448-5491 兽奸爱撫 CFLAG:301
    if (kojo.爱抚 == 0) {
      // :5451-5459 初めて（源作空参数，1:1 保真不补写）
      if (era0(`mark:${target}:2`) >= 2) {
        await era.printAndWait(''); // :5455 屈服刻印Lv2以上
      } else {
        await era.printAndWait(''); // :5458 それ以外
      }
      kojo.爱抚 = 1; // :5460
      return 0;
    } else if (
      era0(`talent:${target}:136`) == 1 &&
      (kojo.爱抚 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // :5464-5467 牝犬
      await era.printAndWait(''); // :5466
      kojo.爱抚 = 7; // :5467
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :5468-5471 淫乱
      await era.printAndWait(''); // :5470
      kojo.爱抚 = 6; // :5471
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.爱抚 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :5472-5475 爱慕
      await era.printAndWait(''); // :5474
      kojo.爱抚 = 5; // :5475
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      (kojo.爱抚 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :5476-5479 屈服刻印Lv3
      await era.printAndWait(''); // :5478
      kojo.爱抚 = 4; // :5479
    } else if (
      era0(`mark:${target}:2`) == 2 &&
      (kojo.爱抚 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :5480-5483 屈服刻印Lv2
      await era.printAndWait(''); // :5482
      kojo.爱抚 = 3; // :5483
    } else if (
      era0(`mark:${target}:2`) <= 1 &&
      (kojo.爱抚 <= 1 || game.kojo.口上开关 == 2)
    ) {
      // :5484-5487 それ以外
      await era.printAndWait(''); // :5486
      kojo.爱抚 = 2; // :5487
    }
    return 0;
  }

  if (era_flag.selectcom == 1) {
    // :5494-5533 兽奸舔阴 CFLAG:302
    if (kojo.舔阴 == 0) {
      // :5497-5505 初めて
      if (era0(`talent:${target}:0`) == 1) {
        await era.printAndWait(''); // :5501 处女
      } else {
        await era.printAndWait(''); // :5504 それ以外
      }
      kojo.舔阴 = 1; // :5506
      return 0;
    } else if (
      era0(`talent:${target}:136`) == 1 &&
      (kojo.舔阴 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :5510-5513 牝犬
      await era.printAndWait(''); // :5512
      kojo.舔阴 = 6; // :5513
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.舔阴 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :5514-5517 淫乱
      await era.printAndWait(''); // :5516
      kojo.舔阴 = 5; // :5517
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.舔阴 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :5518-5521 爱慕
      await era.printAndWait(''); // :5520
      kojo.舔阴 = 4; // :5521
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      (kojo.舔阴 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :5522-5525 屈服刻印Lv3
      await era.printAndWait(''); // :5524
      kojo.舔阴 = 3; // :5525
    } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 == 2) {
      // :5526-5529 それ以外（屈服刻印Lv3未満）
      await era.printAndWait(''); // :5528
      kojo.舔阴 = 2; // :5529
    }
    return 0;
  }

  if (era_flag.selectcom == 5) {
    // :5539-5576 兽奸胸爱撫 CFLAG:306
    if (kojo.胸爱抚 == 0) {
      // :5541-5548 初めて
      if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(''); // :5544 爱慕
      } else {
        await era.printAndWait(''); // :5547 それ以外（爱無し）
      }
      kojo.胸爱抚 = 1; // :5549
      return 0;
    } else if (
      era0(`talent:${target}:136`) == 1 &&
      (kojo.胸爱抚 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :5554-5556 牝犬
      await era.printAndWait(''); // :5555
      kojo.胸爱抚 = 6; // :5556
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.胸爱抚 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :5557-5560 淫乱
      await era.printAndWait(''); // :5559
      kojo.胸爱抚 = 5; // :5560
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :5561-5564 爱慕
      await era.printAndWait(''); // :5563
      kojo.胸爱抚 = 4; // :5564
    } else if (
      era0(`abl:${target}:1`) >= 3 &&
      (kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :5565-5568 B感觉Lv3以上
      await era.printAndWait(''); // :5567
      kojo.胸爱抚 = 3; // :5568
    } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
      // :5569-5572 それ以外（爱無し、B感觉Lv3未満）
      await era.printAndWait(''); // :5571
      kojo.胸爱抚 = 2; // :5572
    }
    return 0;
  }

  if (era_flag.selectcom == 6) {
    // :5581-5641 兽奸キス CFLAG:307
    if (kojo.接吻 == 0 && era0('tflag:13')) {
      // :5583-5596 初吻
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait(''); // :5586 牝犬
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(''); // :5589 淫乱
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(''); // :5592 爱慕
      } else {
        await era.printAndWait(''); // :5595 それ以外
      }
      kojo.接吻 = 1; // :5597
      return 0;
    } else if (kojo.接吻 == 0) {
      // :5600-5613 （調教で和）初めて
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait(''); // :5603 牝犬
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(''); // :5606 淫乱
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(''); // :5609 爱慕
      } else {
        await era.printAndWait(''); // :5612 それ以外
      }
      kojo.接吻 = 1; // :5614
      return 0;
    } else if (
      era0(`talent:${target}:136`) == 1 &&
      (kojo.接吻 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :5618-5621 二回目以降·牝犬
      await era.printAndWait(''); // :5620
      kojo.接吻 = 6; // :5621
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.接吻 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :5622-5625 淫乱
      await era.printAndWait(''); // :5624
      kojo.接吻 = 5; // :5625
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.接吻 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :5626-5629 爱慕
      await era.printAndWait(''); // :5628
      kojo.接吻 = 4; // :5629
    } else if (
      era0(`abl:${target}:10`) >= 2 &&
      (kojo.接吻 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :5630-5633 顺从Lv2以上
      await era.printAndWait(''); // :5632
      kojo.接吻 = 3; // :5633
    } else if (kojo.接吻 <= 1 || game.kojo.口上开关 == 2) {
      // :5634-5637 それ以外
      await era.printAndWait(''); // :5636
      kojo.接吻 = 2; // :5637
    }
    return 0;
  }

  if (era_flag.selectcom == 9) {
    // :5646-5689 兽奸舔肛 CFLAG:310
    if (kojo.舔肛 == 0) {
      // :5648-5661 初めて
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait(''); // :5651 牝犬
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(''); // :5654 淫乱
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(''); // :5657 爱慕
      } else {
        await era.printAndWait(''); // :5660 それ以外（爱無し）
      }
      kojo.舔肛 = 1; // :5662
      return 0;
    } else if (
      era0(`talent:${target}:136`) == 1 &&
      (kojo.舔肛 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :5667-5669 牝犬
      await era.printAndWait(''); // :5668
      kojo.舔肛 = 6; // :5669
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.舔肛 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :5671-5673 淫乱
      await era.printAndWait(''); // :5672
      kojo.舔肛 = 5; // :5673
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.舔肛 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :5675-5677 爱慕
      await era.printAndWait(''); // :5676
      kojo.舔肛 = 4; // :5677
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      (kojo.舔肛 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :5679-5681 屈服刻印Lv3
      await era.printAndWait(''); // :5680
      kojo.舔肛 = 3; // :5681
    } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 == 2) {
      // :5683-5685 それ以外（屈服刻印Lv3未満）
      await era.printAndWait(''); // :5684
      kojo.舔肛 = 2; // :5685
    }
    return 0;
  }

  if (era_flag.selectcom == 21) {
    // :5694-5779 兽奸背后位 CFLAG:322
    if (kojo.背后位 == 0) {
      // :5696-5728 初めて
      if (era0(`talent:${target}:0`) == 1) {
        // :5698-5712 处女
        if (era0(`talent:${target}:136`) == 1) {
          await era.printAndWait(''); // :5701 牝犬
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(''); // :5704 淫乱
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(''); // :5707 爱慕
        } else {
          await era.printAndWait(''); // :5711 それ以外
        }
      } else {
        // :5713-5727 非处女
        if (era0(`talent:${target}:136`) == 1) {
          await era.printAndWait(''); // :5717 牝犬
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(''); // :5720 淫乱
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(''); // :5723 爱慕
        } else {
          await era.printAndWait(''); // :5726 それ以外
        }
      }
      kojo.背后位 = 1; // :5729
      return 0;
    } else if (
      era0(`talent:${target}:136`) == 1 &&
      (kojo.背后位 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // :5734-5742 牝犬（RAND:3 三选一，源作三档均空参数，1:1 保真）
      if (rand_n(3) == 0) {
        await era.printAndWait(''); // :5736
      } else if (rand_n(2) == 0) {
        await era.printAndWait(''); // :5738
      } else {
        await era.printAndWait(''); // :5740
      }
      kojo.背后位 = 7; // :5742
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.背后位 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :5744-5752 淫乱
      if (rand_n(3) == 0) {
        await era.printAndWait(''); // :5746
      } else if (rand_n(2) == 0) {
        await era.printAndWait(''); // :5748
      } else {
        await era.printAndWait(''); // :5750
      }
      kojo.背后位 = 6; // :5752
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.背后位 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :5754-5762 爱慕
      if (rand_n(3) == 0) {
        await era.printAndWait(''); // :5756
      } else if (rand_n(2) == 0) {
        await era.printAndWait(''); // :5758
      } else {
        await era.printAndWait(''); // :5760
      }
      kojo.背后位 = 5; // :5762
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      era0(`abl:${target}:2`) >= 3 &&
      (kojo.背后位 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :5764-5766 屈服刻印Lv3＋V感觉Lv3以上
      await era.printAndWait(''); // :5765
      kojo.背后位 = 4; // :5766
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      (kojo.背后位 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :5768-5770 屈服刻印Lv3
      await era.printAndWait(''); // :5769
      kojo.背后位 = 3; // :5770
    } else if (kojo.背后位 <= 1 || game.kojo.口上开关 == 2) {
      // :5772-5775 それ以外
      await era.printAndWait(''); // :5773
      kojo.背后位 = 2; // :5775
    }
    return 0;
  }

  if (era_flag.selectcom == 27) {
    // :5784-5843 兽奸背后位アナル CFLAG:328
    if (kojo.背后位肛交 == 0) {
      // :5786-5799 初めて
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait(''); // :5789 牝犬
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(''); // :5792 淫乱
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(''); // :5795 爱慕
      } else {
        await era.printAndWait(''); // :5798 それ以外（爱無し）
      }
      kojo.背后位肛交 = 1; // :5800
      return 0;
    } else if (
      era0(`talent:${target}:136`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.背后位肛交 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // :5805-5811 牝犬＋A感觉Lv3以上（RAND:2 二选一，源作两档均空参数，1:1 保真）
      if (rand_n(2) == 0) {
        await era.printAndWait(''); // :5807
      } else {
        await era.printAndWait(''); // :5809
      }
      kojo.背后位肛交 = 7; // :5811
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.背后位肛交 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :5813-5819 淫乱＋A感觉Lv3以上
      if (rand_n(2) == 0) {
        await era.printAndWait(''); // :5815
      } else {
        await era.printAndWait(''); // :5817
      }
      kojo.背后位肛交 = 6; // :5819
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.背后位肛交 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :5821-5827 爱＋A感觉Lv3以上
      if (rand_n(2) == 0) {
        await era.printAndWait(''); // :5823
      } else {
        await era.printAndWait(''); // :5825
      }
      kojo.背后位肛交 = 5; // :5827
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :5829-5831 爱慕
      await era.printAndWait(''); // :5830
      kojo.背后位肛交 = 4; // :5831
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.背后位肛交 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :5833-5835 A感觉Lv3以上
      await era.printAndWait(''); // :5834
      kojo.背后位肛交 = 3; // :5835
    } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 == 2) {
      // :5837-5839 それ以外（爱無し、A感觉Lv3未満）
      await era.printAndWait(''); // :5838
      kojo.背后位肛交 = 2; // :5839
    }
    return 0;
  }

  if (era_flag.selectcom == 30) {
    // :5848-5907 兽奸手淫 CFLAG:331
    if (kojo.手淫 == 0) {
      // :5850-5863 初めて
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(''); // :5853 淫乱
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(''); // :5856 爱慕
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(''); // :5859 侍奉精神Lv3以上
      } else {
        await era.printAndWait(''); // :5862 それ以外（侍奉精神Lv3未満）
      }
      kojo.手淫 = 1; // :5864
      return 0;
    } else if (
      era0(`talent:${target}:136`) == 1 &&
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.手淫 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // :5869-5875 牝犬＋侍奉精神Lv3以上（RAND:2 二选一，1:1 保真）
      if (rand_n(2) == 0) {
        await era.printAndWait(''); // :5871
      } else {
        await era.printAndWait(''); // :5873
      }
      kojo.手淫 = 7; // :5875
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.手淫 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :5877-5883 淫乱＋侍奉精神Lv3以上
      if (rand_n(2) == 0) {
        await era.printAndWait(''); // :5879
      } else {
        await era.printAndWait(''); // :5881
      }
      kojo.手淫 = 6; // :5883
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:16`) >= 5 &&
      (kojo.手淫 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :5885-5891 爱＋侍奉精神Lv5
      if (rand_n(2) == 0) {
        await era.printAndWait(''); // :5887
      } else {
        await era.printAndWait(''); // :5889
      }
      kojo.手淫 = 5; // :5891
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.手淫 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :5893-5895 爱＋侍奉精神Lv3以上
      await era.printAndWait(''); // :5894
      kojo.手淫 = 4; // :5895
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.手淫 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :5897-5899 侍奉精神Lv3以上（源作死区：此档要求 TALENT:85，与上一档条件几乎重复，1:1 保真）
      await era.printAndWait(''); // :5898
      kojo.手淫 = 3; // :5899
    } else if (kojo.手淫 <= 1 || game.kojo.口上开关 == 2) {
      // :5901-5903 それ以外（侍奉精神Lv3未満）
      await era.printAndWait(''); // :5902
      kojo.手淫 = 2; // :5903
    }
    return 0;
  }

  if (era_flag.selectcom == 31) {
    // :5912-5961 兽奸口交 CFLAG:332
    if (kojo.口交_奴 == 0) {
      // :5914-5927 初めて
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(''); // :5917 淫乱
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(''); // :5920 爱慕
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(''); // :5923 侍奉精神Lv3以上
      } else {
        await era.printAndWait(''); // :5926 それ以外（侍奉精神Lv3未満）
      }
      kojo.口交_奴 = 1; // :5928
      return 0;
    } else if (
      era0(`talent:${target}:136`) == 1 &&
      era0(`abl:${target}:16`) >= 5 &&
      (kojo.口交_奴 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // :5933-5935 牝犬＋侍奉精神Lv5
      await era.printAndWait(''); // :5934
      kojo.口交_奴 = 7; // :5935
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:16`) >= 5 &&
      (kojo.口交_奴 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :5937-5939 淫乱＋侍奉精神Lv5
      await era.printAndWait(''); // :5938
      kojo.口交_奴 = 6; // :5939
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.口交_奴 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :5941-5943 淫乱
      await era.printAndWait(''); // :5942
      kojo.口交_奴 = 5; // :5943
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:16`) >= 5 &&
      (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :5945-5948 爱＋侍奉精神Lv5
      await era.print(''); // :5946 PRINTFORML
      await era.printAndWait(''); // :5947
      kojo.口交_奴 = 4; // :5948
    } else if (
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.口交_奴 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :5950-5953 侍奉精神Lv3以上
      await era.print(''); // :5951 PRINTFORML
      await era.printAndWait(''); // :5952
      kojo.口交_奴 = 3; // :5953
    } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 == 2) {
      // :5955-5957 それ以外（侍奉精神Lv3未満）
      await era.printAndWait(''); // :5956
      kojo.口交_奴 = 2; // :5957
    }
    return 0;
  }

  if (era_flag.selectcom == 34) {
    // :5966-6062 兽奸骑乘位 CFLAG:335
    if (kojo.骑乘位 == 0) {
      // :5968-5999 初めて
      if (era0(`talent:${target}:0`) == 1) {
        // :5970-5983 处女
        if (era0(`talent:${target}:136`) == 1) {
          await era.printAndWait(''); // :5973 牝犬
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(''); // :5976 淫乱
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(''); // :5979 爱慕
        } else {
          await era.printAndWait(''); // :5982 それ以外（爱無し）
        }
      } else {
        // :5986-5998 非处女
        if (era0(`talent:${target}:136`) == 1) {
          await era.printAndWait(''); // :5988 牝犬
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(''); // :5991 淫乱
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(''); // :5994 爱慕
        } else {
          await era.printAndWait(''); // :5997 それ以外
        }
      }
      kojo.骑乘位 = 1; // :6000
      return 0;
    } else if (
      era0(`talent:${target}:136`) == 1 &&
      (kojo.骑乘位 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // :6005-6013 牝犬（RAND:3 三选一，1:1 保真）
      if (rand_n(3) == 0) {
        await era.printAndWait(''); // :6007
      } else if (rand_n(2) == 0) {
        await era.printAndWait(''); // :6009
      } else {
        await era.printAndWait(''); // :6011
      }
      kojo.骑乘位 = 7; // :6013
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.骑乘位 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :6015-6025 淫乱（RAND:4 四选一，1:1 保真）
      if (rand_n(4) == 0) {
        await era.printAndWait(''); // :6017
      } else if (rand_n(3) == 0) {
        await era.printAndWait(''); // :6019
      } else if (rand_n(2) == 0) {
        await era.printAndWait(''); // :6021
      } else {
        await era.printAndWait(''); // :6023
      }
      kojo.骑乘位 = 6; // :6025
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.骑乘位 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :6028-6037 爱慕（RAND:4 四选一，首档 PRINTFORML，其余 PRINTFORMW，1:1 保真）
      if (rand_n(4) == 0) {
        await era.print(''); // :6029
      } else if (rand_n(3) == 0) {
        await era.printAndWait(''); // :6031
      } else if (rand_n(2) == 0) {
        await era.printAndWait(''); // :6033
      } else {
        await era.printAndWait(''); // :6035
      }
      kojo.骑乘位 = 5; // :6037
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      era0(`abl:${target}:2`) >= 3 &&
      (kojo.骑乘位 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :6040-6049 屈服刻印Lv3＋V感觉Lv3以上（RAND:4 四选一，1:1 保真）
      if (rand_n(4) == 0) {
        await era.printAndWait(''); // :6041
      } else if (rand_n(3) == 0) {
        await era.printAndWait(''); // :6043
      } else if (rand_n(2) == 0) {
        await era.printAndWait(''); // :6045
      } else {
        await era.printAndWait(''); // :6047
      }
      kojo.骑乘位 = 4; // :6049
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      (kojo.骑乘位 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :6051-6054 屈服刻印Lv3
      await era.print(''); // :6052 PRINTFORML
      await era.printAndWait(''); // :6053
      kojo.骑乘位 = 3; // :6054
    } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
      // :6056-6058 それ以外（爱無し、顺从Lv5未満——源作注释误写"顺从"，实际条件是纯 CFLAG 兜底，1:1 保真）
      await era.printAndWait(''); // :6057
      kojo.骑乘位 = 2; // :6058
    }
    return 0;
  }

  if (era_flag.selectcom == 37) {
    // :6067-6104 兽奸肛门侍奉 CFLAG:338
    if (kojo.肛门侍奉 == 0) {
      // :6069-6076 初めて
      if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(''); // :6072 侍奉精神Lv3以上
      } else {
        await era.printAndWait(''); // :6075 それ以外（侍奉精神Lv3未満）
      }
      kojo.肛门侍奉 = 1; // :6077
      return 0;
    } else if (
      era0(`talent:${target}:136`) == 1 &&
      era0(`abl:${target}:16`) >= 5 &&
      (kojo.肛门侍奉 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :6082-6084 牝犬＋侍奉精神Lv5
      await era.printAndWait(''); // :6083
      kojo.肛门侍奉 = 6; // :6084
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:16`) >= 5 &&
      (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :6086-6088 淫乱＋侍奉精神Lv5
      await era.printAndWait(''); // :6087
      kojo.肛门侍奉 = 5; // :6088
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:16`) >= 5 &&
      (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :6090-6092 爱＋侍奉精神Lv5（源作仅一句 PRINTFORML，无 PRINTFORMW 收尾，1:1 保真）
      await era.print(''); // :6091
      kojo.肛门侍奉 = 4; // :6092
    } else if (
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :6094-6096 侍奉精神Lv3以上
      await era.printAndWait(''); // :6095
      kojo.肛门侍奉 = 3; // :6096
    } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 == 2) {
      // :6098-6100 それ以外（侍奉精神Lv3未満）
      await era.printAndWait(''); // :6099
      kojo.肛门侍奉 = 2; // :6100
    }
    return 0;
  }

  if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`)) {
    // :6110-6168 兽奸眼罩 開始時 CFLAG:344
    if (kojo.眼罩 == 0) {
      // :6112-6125 初めて
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait(''); // :6115 牝犬
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(''); // :6118 淫乱
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(''); // :6121 爱慕
      } else {
        await era.printAndWait(''); // :6124 それ以外
      }
      kojo.眼罩 = 1; // :6126
      return 0;
    } else if (
      era0(`talent:${target}:136`) == 1 &&
      (kojo.眼罩 <= 9 || game.kojo.口上开关 == 2)
    ) {
      // :6131-6133 牝犬
      await era.printAndWait(''); // :6132
      kojo.眼罩 = 10; // :6133
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:21`) >= 5 &&
      (kojo.眼罩 <= 8 || game.kojo.口上开关 == 2)
    ) {
      // :6135-6137 淫乱＋受虐狂っ気Lv5以上
      await era.printAndWait(''); // :6136
      kojo.眼罩 = 9; // :6137
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.眼罩 <= 7 || game.kojo.口上开关 == 2)
    ) {
      // :6139-6141 淫乱＋受虐狂っ気Lv3以上
      await era.printAndWait(''); // :6140
      kojo.眼罩 = 8; // :6141
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.眼罩 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // :6143-6145 淫乱
      await era.printAndWait(''); // :6144
      kojo.眼罩 = 7; // :6145
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:21`) >= 5 &&
      (kojo.眼罩 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // :6147-6149 爱＋受虐狂っ気Lv5以上
      await era.printAndWait(''); // :6148
      kojo.眼罩 = 6; // :6149
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.眼罩 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :6151-6153 爱＋受虐狂っ気Lv3以上
      await era.printAndWait(''); // :6152
      kojo.眼罩 = 5; // :6153
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.眼罩 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // :6155-6157 爱慕
      await era.printAndWait(''); // :6156
      kojo.眼罩 = 4; // :6157
    } else if (
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.眼罩 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :6159-6161 受虐狂っ気Lv3以上
      await era.printAndWait(''); // :6160
      kojo.眼罩 = 3; // :6161
    } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 == 2) {
      // :6163-6165 それ以外
      await era.printAndWait(''); // :6164
      kojo.眼罩 = 2; // :6165
    }
    return 0;
  } else if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`) == 0) {
    // :6170-6189 兽奸眼罩 終了時 CFLAG:444
    // 源作守卫误读 CFLAG:338（肛门侍奉）而非 CFLAG:444 自身（前三档），仅
    // 末档正确读 CFLAG:444；写入目标始终是 CFLAG:444，1:1 保真不改正
    if (
      era0(`talent:${target}:136`) == 1 &&
      (kojo.肛门侍奉 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :6172-6174 牝犬
      await era.printAndWait(''); // :6173
      kojo.兽奸眼罩 = 4; // :6174
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.肛门侍奉 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :6176-6178 淫乱
      await era.printAndWait(''); // :6177
      kojo.兽奸眼罩 = 3; // :6178
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.肛门侍奉 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :6180-6182 爱慕
      await era.printAndWait(''); // :6181
      kojo.兽奸眼罩 = 2; // :6182
    } else if (kojo.兽奸眼罩 < 1 || game.kojo.口上开关 == 2) {
      // :6184-6186 それ以外
      await era.printAndWait(''); // :6185
      kojo.兽奸眼罩 = 1; // :6186
    }
    return 0;
  }

  if (era_flag.selectcom == 56) {
    // :6195-6240 兽奸会話 CFLAG:357（源注释：狗不能对话，仅有自我介绍）
    if (kojo.交谈 == 0) {
      // :6197-6213 初めて
      if (era0(`tequip:${target}:53`)) {
        // :6198-6212 ビデオ自己紹介
        if (era0(`talent:${target}:136`) == 1) {
          await era.printAndWait(''); // :6202 牝犬
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(''); // :6205 淫乱
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(''); // :6208 爱慕
        } else {
          await era.printAndWait(''); // :6211 それ以外
        }
      }
      kojo.交谈 = 1; // :6214
      return 0;
    } else if (era0(`tequip:${target}:53`)) {
      // :6218-6237 二回目以降·ビデオ自己紹介（源作无摄像分支时直接跳过，不打印任何文本）
      if (
        era0(`talent:${target}:136`) == 1 &&
        (kojo.交谈 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(''); // :6222 牝犬
        kojo.交谈 = 5; // :6223
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.交谈 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(''); // :6226 淫乱
        kojo.交谈 = 4; // :6227
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.交谈 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(''); // :6230 爱慕
        kojo.交谈 = 3; // :6231
      } else if (kojo.交谈 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(''); // :6234 それ以外
        kojo.交谈 = 2; // :6235
      }
    }
    return 0;
  }

  return 0;
}

/**
 * @KOJO_MESSAGE_PALAMCNG_8（:6250-6563）：参数变动口上（FLAG:7 > 0 才达）。
 * 守卫（:6252-6271）：助手调教、口塞、失神、崩坏、兽奸、触手、死斗场。P/A
 * 局部在每支内计算。首次润滑/欲情/耻情/恐怖 Lv2（CFLAG:221-224）、首次
 * 阴蒂/私处/肛门/乳房绝顶（CFLAG:225-228，NOWEX:0-3）、处女丧失（CFLAG:229）。
 */
async function kojo_message_palamcng_8(rand) {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const kojo = chara(target).kojo;
  const train = chara(target).train;
  let p = 0;
  let a_up = 0;
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));

  if (era_flag.assi > 0 && era_flag.assiplay) {
    return 0;
  }

  if (era0(`tequip:${target}:45`)) {
    return 0;
  }

  if (game.train.失神) {
    return 0;
  }

  if (era0(`talent:${target}:9`) == 1) {
    return 0;
  }

  if (era0(`tequip:${target}:89`)) {
    return 0;
  }

  if (era0(`tequip:${target}:90`)) {
    return 0;
  }

  if (era0(`tequip:${target}:55`)) {
    return 0;
  }

  // :6276-6304 初めて润滑がLV2超えた CFLAG:221
  p = era0(`palam:${target}:3`) + train.润滑增量; // :6278
  if (p > PALAMLV[2] && kojo.首次润滑Lv2 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      // :6281 爱慕
      if (era_flag.selectcom == 50) {
        // :6283 润滑液を使った場合
        await era.printAndWait(`「啊啊…润滑液黏糊糊的…啊嗯」`); // :6284
        await era.printAndWait(`―――润滑初次超过LV2。`); // :6285
      } else {
        // :6286-6287 それ以外
        await era.printAndWait(`「啊啊…我居然那么湿了…」`); // :6288
        await era.printAndWait(`―――润滑初次超过LV2。`); // :6289
      }
    } else {
      // :6291-6292 それ以外
      if (era_flag.selectcom == 50) {
        // :6294 润滑液を使った場合
        await era.printAndWait(`「哈啊哈啊…嗯…这个润滑液稍微有点冷……」`); // :6295
        await era.printAndWait(`―――润滑初次超过LV2。`); // :6296
      } else {
        // :6297-6298 それ以外
        await era.printAndWait(`「啊…我居然变得…被你的手…弄湿了什么的…」`); // :6299
        await era.printAndWait(`―――润滑初次超过LV2。`); // :6300
      }
    }
    kojo.首次润滑Lv2 = 1; // :6303 CFLAG:TARGET:221 = 1
  }

  // :6306-6335 初めて欲情がLV2超えた CFLAG:222
  p = era0(`palam:${target}:5`) + train.欲情增量; // :6309
  if (p > PALAMLV[2] && kojo.首次欲情Lv2 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      // :6312 爱慕
      if (era_flag.selectcom == 51) {
        // :6314 媚药を使った場合
        await era.printAndWait(
          `「啊、啊啊…喝了这种药…发情什么的…明明是很羞人的事…啊啊…」`,
        ); // :6315
        await era.printAndWait(`―――欲情初次超过LV2。`); // :6316
      } else {
        // :6317-6318 それ以外
        await era.printAndWait(`「呐…快点…抱我…把我弄得乱七八糟吧…」`); // :6319
        await era.printAndWait(`―――欲情初次超过LV2。`); // :6320
      }
    } else {
      // :6322-6323 それ以外
      if (era_flag.selectcom == 51) {
        // :6325 媚药を使った場合
        await era.printAndWait(
          `「唔、呜呜…这种药居然会对我起效果…啊啊…别、别过来！」`,
        ); // :6326
        await era.printAndWait(`―――欲情初次超过LV2。`); // :6327
      } else {
        // :6328-6329 それ以外
        await era.printAndWait(
          `「呵呵呵、身体稍微变得热起来的样子了…啊啊…啊啊啊………」`,
        ); // :6330
        await era.printAndWait(`―――欲情初次超过LV2。`); // :6331
      }
    }
    kojo.首次欲情Lv2 = 1; // :6334 CFLAG:222 = 1
  }

  // :6337-6352 初めて耻情がLV2超えた CFLAG:223
  p = era0(`palam:${target}:8`) + era0(`delta:${target}:8`); // :6340 palam:8 无 train 门面
  if (p > PALAMLV[2] && kojo.首次耻情Lv2 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      // :6343 爱慕
      await era.printAndWait(`「啊啊…太羞耻了…不要看啊…」`); // :6344
      await era.printAndWait(`―――耻情初次超过LV2。`); // :6345
    } else {
      // :6346-6347 それ以外
      await era.printAndWait(`「就算对我做了那样的事…也是没有意义的…唔」`); // :6348
      await era.printAndWait(`―――耻情初次超过LV2。`); // :6349
    }
    kojo.首次耻情Lv2 = 1; // :6351 CFLAG:223 = 1
  }

  // :6354-6369 初めて恐怖がLV2超えた CFLAG:224
  p = era0(`palam:${target}:10`) + era0(`delta:${target}:10`); // :6357 palam:10 无 train 门面
  if (p > PALAMLV[2] && kojo.首次恐怖Lv2 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      // :6360 爱慕
      await era.printAndWait(`「为什么要对我做这样的事啊…」`); // :6361
      await era.printAndWait(`―――恐怖初次超过LV2。`); // :6362
    } else {
      // :6363-6364 それ以外
      await era.printAndWait(`「我才没有…害怕呢…咕」`); // :6365
      await era.printAndWait(`―――恐怖初次超过LV2。`); // :6366
    }
    kojo.首次恐怖Lv2 = 1; // :6368 CFLAG:224 = 1
  }

  // :6371-6392 初めて阴蒂绝顶 CFLAG:225
  if (era0(`nowex:${target}:0`) > 0 && kojo.首次C绝顶 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      // :6376 爱慕
      await era.printAndWait(
        `「啊…啊啊…在你的…在你的面前去了…啊啊…啊…嗯${heart(1)}」`,
      ); // :6377
      await era.printAndWait(
        `${target_name}因为阴蒂断断续续的被刺激而一边下流的扭着腰一边发出了娇喘。`,
      ); // :6378
      await era.printAndWait(
        `「啊…要去了…要去了…比平时还厉害…的…啊啊啊…嗯…啊啊嗯${heart(1)}」`,
      ); // :6379
      await era.printAndWait(
        `然后${target_name}张开漂亮的喉咙，发出了异常高亢的绝顶的娇喘。`,
      ); // :6380
      await era.printAndWait(`「啊啊嗯！要去了…要用阴蒂去了！去了！！！」`); // :6381
      await era.printAndWait(
        `「嗯啊…啊啊…在你面前…变得这么舒服了…${heart(1)}」`,
      ); // :6382
    } else {
      // :6383-6384 それ以外
      await era.printAndWait(
        `「啊…啊啊！？不、不行…再继续弄的话…啊…嗯…呜啊！？」`,
      ); // :6385
      await era.printAndWait(
        `${target_name}在阴蒂的强烈刺激下发出了悲鸣。但是很容易就能明白，那悲鸣里混杂着甜美和快乐。`,
      ); // :6386
      await era.printAndWait(
        `然后${target_name}张开漂亮的喉咙，发出了绝顶的娇喘。`,
      ); // :6387
      await era.printAndWait(
        `「啊…嗯…不、不要啊…这样…被强迫着去了什么的…啊啊不行…啊…咕…嗯…呀啊啊啊！」`,
      ); // :6388
      await era.printAndWait(`「嗯啊………这种…屈辱…嗯嗯嗯」`); // :6389
    }
    kojo.首次C绝顶 = 1; // :6391 CFLAG:225 = 1
  }

  // :6394-6439 初めて私处绝顶 CFLAG:226
  if (era0(`nowex:${target}:1`) > 0 && kojo.首次V绝顶 == 0) {
    if (era0(`talent:${target}:76`) == 1) {
      // :6399 淫乱
      await era.printAndWait(
        `「啊啊…继续侵犯…我的小穴…${heart(1)} 啊啊…要去…要去了${heart(1)}」`,
      ); // :6400
      await era.printAndWait(
        `${target_name}下流的张开双腿，蜜裂抽搐着。那个姿态已经完全不是帅气的女忍者的身姿了。`,
      ); // :6401
      await era.printAndWait(
        `「我…去了…用小穴…用小穴去了${heart(1)} 啊啊…啊嗯…啊啊啊${heart(1)}」`,
      ); // :6402
      await era.printAndWait(
        `${target_name}全身痉挛着，迎来了第一次私处绝顶………`,
      ); // :6403
    } else if (era0(`talent:${target}:85`) == 1) {
      // :6405 爱慕
      await era.printAndWait(
        `「啊…啊嗯…再继续的话…我…我…嗯…要去…要去了…去了…啊啊${heart(1)}」`,
      ); // :6406
      await era.printAndWait(
        `${target_name}的蜜裂被好几次火焰炙烤那样侵犯、尖锐的贝明哲。`,
      ); // :6407
      await era.printAndWait(
        `然后${target_name}终于在${player_name}面前迎来了第一次私处决定。`,
      ); // :6408
      await era.printAndWait(
        `「嗯…啊啊…去了…要去了…在你面前…啊啊啊…要去了——${heart(1)}」`,
      ); // :6409
    } else {
      // :6410-6411 それ以外
      await era.printAndWait(
        `「饶、饶了我吧…啊啊…啊…再继续的话我的…啊…嗯…不行…明明不行…啊啊…啊啊…啊啊——！」`,
      ); // :6412
      await era.printAndWait(
        `${target_name}的蜜裂被侵犯了不停的侵犯、终于第一次用私处高潮了。`,
      ); // :6413
      await era.printAndWait(`「啊啊…我…要变…要变得奇怪了…啊、啊啊——！」`); // :6414
    }
    kojo.首次V绝顶 = 1; // :6416 CFLAG:TARGET:226 = 1
  } else if (era0(`nowex:${target}:1`) > 0 && kojo.首次V绝顶 == 1) {
    // :6417-6439 私处绝顶二度目以降
    if (era0(`talent:${target}:76`) == 1 && game.event.插着不拔 == 1) {
      // :6420 淫乱+挿しっぱ无
      await era.printAndWait(
        `「啊啊…我的小穴…被你的阴茎插的…啊啊…变成马上就回去的淫乱小穴了${heart(1)}」`,
      ); // :6421
      await era.printAndWait(
        `${target_name}的深处每次被侵犯，腔口都会痉挛着包裹住${player_name}的阴茎。`,
      ); // :6422
      await era.printAndWait(
        `「来…继续插进来…啊啊…嗯…啊嗯…啊啊——${heart(1)}」`,
      ); // :6423
      await era.printAndWait(
        `「啊…啊啊…这样…这样好舒服…用你的阴茎…啊…去了去了…啊啊啊啊——${heart(1)}」`,
      ); // :6424
      await era.printAndWait(
        `然后${target_name}发出着格外高亢的娇喘、高潮了………`,
      ); // :6425
    } else if (era0(`talent:${target}:85`) == 1 && game.event.插着不拔 == 1) {
      // :6427 爱慕+挿しっぱ无
      await era.printAndWait(
        `「啊啊…我…已经去了…被你…疼爱着…啊啊…去了啊啊啊啊${heart(1)}」`,
      ); // :6428
      await era.printAndWait(
        `${target_name}像是要不让${player_name}的阴茎逃走那样，紧锁着腔口。`,
      ); // :6429
      await era.printAndWait(
        `「啊嗯！啊啊…我…去了…用你的阴茎去了啊——${heart(1)}」`,
      ); // :6430
      await era.printAndWait(
        `然后${target_name}发出着格外高亢的娇喘、高潮了………`,
      ); // :6431
    } else if (game.event.插着不拔 == 1) {
      // :6433 刺しっぱ无
      await era.printAndWait(
        `「啊啊…不要啊…我已经…不想去了…明明不想去了…嗯…啊啊…嗯…去了…去了啊——！」`,
      ); // :6434
      await era.printAndWait(
        `${target_name}的腔口不停的紧缩着、让${target_name}的阴茎舒服着。`,
      ); // :6435
      await era.printAndWait(`「啊啊啊——…我…我…去了…去…了…啊…啊啊——！」`); // :6436
      await era.printAndWait(
        `${target_name}一边接受着插入深处的${player_name}的阴茎，一边高潮了………`,
      ); // :6437
    }
  }

  // :6441-6482 初めて肛门绝顶 CFLAG:227
  if (era0(`nowex:${target}:2`) > 0 && kojo.首次A绝顶 == 0) {
    if (era0(`talent:${target}:76`) == 1) {
      // :6446 淫乱
      await era.printAndWait(
        `「继续欺负…我的肛门…啊啊…有什么、有什么要来了…啊啊${heart(1)}」`,
      ); // :6447
      await era.printAndWait(
        `${target_name}因为从肛门传到背上的甜美的触感发出了娇喘、肛门不停的收缩着。`,
      ); // :6448
      await era.printAndWait(
        `「嗯啊…啊啊…我的肛门…啊啊腰变成屁股小穴了…肛门小穴去了啊啊啊啊啊啊——${heart(1)}」`,
      ); // :6449
      await era.printAndWait(
        `${target_name}第一次肛门绝顶、毫不留情的露出了阿黑颜………`,
      ); // :6450
    } else if (era0(`talent:${target}:85`) == 1) {
      // :6452 爱慕
      await era.printAndWait(
        `「啊…啊啊…被你…侵犯肛门…嗯…已经…变得很有感觉了…啊啊${heart(1)}」`,
      ); // :6453
      await era.printAndWait(
        `${target_name}被肛门侵犯得娇喘着。从肛门传到背上的快感使身体颤抖着，一看就知道很快就要绝顶了。`,
      ); // :6454
      await era.printAndWait(
        `「啊啊…啊…去了…去了…嗯…啊啊…啊、啊…啊啊、啊啊——${heart(3)}」`,
      ); // :6455
      await era.printAndWait(`看起来${target_name}第一次用肛门绝顶了………`); // :6456
    } else {
      // :6457-6458 それ以外
      await era.printAndWait(
        `「啊、啊啊…不要…不要啊…这样…用屁股什么的…啊啊…啊…用屁股高潮了…啊啊！」`,
      ); // :6459
      await era.printAndWait(
        `${target_name}扭着腰想从快乐中逃离开、理所当然的没有逃掉就这样迎来了第一次肛门绝顶。`,
      ); // :6460
      await era.printAndWait(
        `「啊啊！屁股…嗯…啊啊…要变得奇怪了…要去了啊…啊啊——！」`,
      ); // :6461
    }
    kojo.首次A绝顶 = 1; // :6463 CFLAG:227 = 1
  } else if (era0(`nowex:${target}:2`) > 0 && kojo.首次A绝顶 == 1) {
    // :6464-6482 肛门绝顶二度目以降
    if (era0(`talent:${target}:76`) == 1) {
      // :6467 淫乱
      await era.printAndWait(
        `「啊啊…屁股小穴去了…我的肛门…变得好舒服…啊…啊啊——${heart(1)}」`,
      ); // :6468
      await era.printAndWait(
        `${target_name}的屁股不停的收缩着，一边发出着绝顶的声音。对${player_name}露出快乐的好像融化一样的表情。`,
      ); // :6469
      await era.printAndWait(
        `「啊嗯…啊…啊啊…嗯啊…继续让我…高潮到发疯吧………${heart(1)}」`,
      ); // :6470
    } else if (era0(`talent:${target}:85`) == 1) {
      // :6472 爱慕
      await era.printAndWait(
        `「啊啊…去了…去了…啊啊…肛门要融化了…啊啊…啊、啊嗯啊——${heart(1)}」`,
      ); // :6473
      await era.printAndWait(
        `${target_name}一边发出尖锐的声音一边肛门绝顶着。因为沉溺在快乐中而露出融化一样的表情。`,
      ); // :6474
      await era.printAndWait(
        `「啊…嗯…继续…让我的肛门…更舒服吧………${heart(1)}」`,
      ); // :6475
    } else {
      // :6476-6477 それ以外
      await era.printAndWait(
        `「不行…再继续的话…我…我的…肛门要…变得奇怪了…啊啊——！」`,
      ); // :6478
      await era.printAndWait(
        `${target_name}的肛门好几次颤抖着绝顶了、精疲力尽的身体横躺到了一旁。`,
      ); // :6479
      await era.printAndWait(`「啊啊…已经…回不去了…我…已经不行了………」`); // :6480
    }
  }

  // :6484-6520 初めて乳房绝顶 CFLAG:228
  if (era0(`nowex:${target}:3`) > 0 && kojo.首次B绝顶 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      // :6489 爱慕
      await era.printAndWait(
        `「啊…啊啊…继续…欺负我的乳房吧…啊…啊嗯…啊啊${heart(1)}」`,
      ); // :6490
      await era.printAndWait(
        `${target_name}的胸部被刺激着，发出了甜美的声音、乳头勃起得不能再勃起了、断断续续的快感让${target_name}的脑袋都要融化了。`,
      ); // :6491
      await era.printAndWait(
        `「继续挖弄乳头！让我…让我去吧！啊…啊啊…啊啊啊——${heart(1)}」`,
      ); // :6492
      await era.printAndWait(
        `被${player_name}用手指撵着乳头的${target_name}发出悲鸣。看样子绝顶了。`,
      ); // :6493
      await era.printAndWait(
        `「嗯啊…嗯啊…继续欺负…我的乳房…让我去吧…啊啊…啊啊啊…${heart(1)}」`,
      ); // :6494
      await era.printAndWait(
        `${target_name}明明刚绝顶不久，却在恳求这进一步调教乳房………`,
      ); // :6495
    } else {
      // :6496-6497 それ以外
      await era.printAndWait(
        `「嗯…嗯…啊啊…嗯…这样…不行…不要再继续欺负…我的胸部了…啊啊…啊啊………」`,
      ); // :6498
      await era.printAndWait(
        `${target_name}的胸部被刺激而漏出声音、乳头勃起得不能再勃起了、断断续续的快感让${target_name}的脑袋都要融化了。`,
      ); // :6499
      await era.printAndWait(
        `「嗯、啊啊、嗯…我的胸部…这么有感觉什么的…嗯…啊…啊不要再欺负乳头了…啊啊！」`,
      ); // :6500
      await era.printAndWait(
        `「啊、不行…不行…要去了…要去了…嗯…啊啊…啊…嗯…嗯…恩啊啊啊啊——！！！」`,
      ); // :6501
      await era.printAndWait(
        `${target_name}在${player_name}面前第一次乳房绝顶了………`,
      ); // :6502
    }
    kojo.首次B绝顶 = 1; // :6504 CFLAG:TARGET:228 = 1
  } else if (era0(`nowex:${target}:3`) > 0 && kojo.首次B绝顶 == 1) {
    // :6505-6520 乳房绝顶二度目以降
    if (era0(`talent:${target}:78`) == 1) {
      // :6508 弄乳狂
      await era.printAndWait(
        `「啊…啊啊啊…胸部…要去…要去了…啊啊啊…我的胸部…好奇怪啊${heart(1)}」`,
      ); // :6509
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「啊嗯…恩…啊啊…胸部要融化了…要融化了…啊啊啊${heart(1)}」`,
        ); // :6511
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「啊啊…我…已经…不行…不行了…啊嗯…恩…嗯啊啊啊——${heart(1)}」`,
        ); // :6513
      } else {
        await era.printAndWait(
          `「已经…已经去了…去了…胸部去了啊啊啊——${heart(1)}」`,
        ); // :6515
      }
      await era.printAndWait(
        `${target_name}的乳房被刺激着好像快疯了、乳头通红的充着血勃起着，嘴里不停的流着口水。`,
      ); // :6517
      await era.printAndWait(
        `「啊嗯…啊…啊…啊啊…啊啊…继续…欺负胸部…啊嗯…啊啊啊${heart(1)}」`,
      ); // :6518
    }
  }

  // :6522-6561 处女喪失(处女のみ) CFLAG:229
  a_up = train.反感增量 + train.不快增量; // :6525 A = UP:11 + UP:12
  if (game.train.处女丧失 == 1 && kojo.处女丧失 == 0) {
    if (game.train.主人导致处女丧失 == 1) {
      // :6528 主人による处女喪失
      if (
        era0(`talent:${target}:76`) == 1 &&
        (a_up < 500 || game.system.反抗刻印回避 == 1)
      ) {
        // :6530 淫乱かつ反抗刻印取得せず
        await era.printAndWait(
          `「啊啊嗯…终于成为你的东西了…啊嗯…啊啊…啊…我…想要你的阴茎想要得不得了${heart(1)}」`,
        ); // :6531
        await era.printAndWait(
          `${target_name}无视破瓜残留的疼痛，就这样被${player_name}贯穿着发出了甜甜的声音。`,
        ); // :6532
        await era.printAndWait(
          `「这样的话就会…开始咕啾咕啾的侵犯我的小穴…并开始调教吧？」`,
        ); // :6533
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (a_up < 500 || game.system.反抗刻印回避 == 1)
      ) {
        // :6534 爱かつ反抗刻印取得せず
        await era.printAndWait(
          `「啊嗯…啊啊…把我的第一次先给你好高兴…啊啊${heart(1)}」`,
        ); // :6536
        await era.printAndWait(
          `${target_name}忍耐着破瓜之痛向${player_name}说着。`,
        ); // :6537
        await era.printAndWait(`「啊啊…继续…抱我…我…想要你…！」`); // :6538
      } else {
        // :6539 それ以外
        await era.printAndWait(
          `「咕…呜…嗯…不会哭的…我不会哭的…啊啊…啊啊！不要再动了…啊、呀！」`,
        ); // :6541
        await era.printAndWait(
          `${target_name}咬着嘴唇忍耐着破瓜之痛、随着开始抽插的${player_name}发出了悲鸣并留下了眼泪………`,
        ); // :6542
      }
    } else {
      // :6544 主人以外による处女喪失
      if (era0(`talent:${target}:76`) == 1) {
        // :6547 淫乱
        await era.printAndWait(
          `「啊啊…我的第一次被夺走了…啊啊、下次想要你的阴茎…想要你的阴茎哦………」`,
        ); // :6548
        await era.printAndWait(
          `${target_name}的蜜裂流着纯洁之证的血的同时，扭着腰诱惑着${player_name}………`,
        ); // :6549
      } else if (era0(`talent:${target}:85`) == 1) {
        // :6550 爱慕
        await era.printAndWait(`「嗯…啊啊…啊嗯…我的第一次…明明想要给你的…」`); // :6552
        await era.printAndWait(`${target_name}带着背上的表情低下了头………`); // :6553
      } else {
        // :6554 それ以外
        await era.printAndWait(
          `「嗯啊…这样的话还不如干脆用自己的手…来做就好了………」`,
        ); // :6556
        await era.printAndWait(
          `${target_name}因为破瓜之痛而带着痛苦的表情嘟囔着………`,
        ); // :6557
      }
    }
    kojo.处女丧失 = 1; // :6560 CFLAG:TARGET:229 = 1
  }

  return 0;
}

// 注册进分发族（TRYCALLFORM KOJO_MESSAGE_PALAMCNG_8 的等价物）
kojo_message_palamcng_family.register(8, kojo_message_palamcng_8);

/**
 * @KOJO_MESSAGE_MARKCNG_8（:6568-6648）：刻印取得口上。
 * 守卫（:6573-6589）：口塞、失神、兽奸、触手、崩坏、死斗场（源注释掉了助手
 * 调教守卫，:6570-6571，1:1 保真不启用）。苦痛/快乐/屈服/反抗刻印 Lv3
 * 取得（CFLAG:297-300，TFLAG:22/23/24/21 == 3）。
 */
async function kojo_message_markcng_8() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const kojo = chara(target).kojo;

  if (era0(`tequip:${target}:45`)) {
    return 0;
  }

  if (game.train.失神) {
    return 0;
  }

  if (era0(`tequip:${target}:89`)) {
    return 0;
  }

  if (era0(`tequip:${target}:90`)) {
    return 0;
  }

  if (era0(`talent:${target}:9`) == 1) {
    return 0;
  }

  if (era0(`tequip:${target}:55`)) {
    return 0;
  }

  // :6591-6603 苦痛刻印Lv3取得 CFLAG:297
  if (game.system.苦痛刻印变动 == 3 && kojo.苦痛刻印Lv3 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      // :6595 爱慕
      await era.printAndWait(`「啊啊…你竟然做到了这种程度…唔…啊…啊啊！」`); // :6596
      await era.printAndWait(`${target_name}因为超过限度的苦痛而悲鸣着………`); // :6597
    } else {
      // :6598-6599 それ以外
      await era.printAndWait(`「啊啊…这种痛苦…唔……不、不要…不要啊！」`); // :6599
      await era.printAndWait(`${target_name}因为超过限度的苦痛而悲鸣着………`); // :6600
    }
    kojo.苦痛刻印Lv3 = 1; // :6602 CFLAG:297 = 1
  }

  // :6606-6619 快乐刻印Lv3取得 CFLAG:298
  if (game.system.快乐刻印变动 == 3 && kojo.快乐刻印Lv3 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      // :6610 爱慕
      await era.printAndWait(
        `「被做了这么舒服的事的话…我…会变得离不开你的…啊啊…继续…做下去${heart(1)}」`,
      ); // :6611
      await era.printAndWait(
        `身体里被刻下了强烈的快感的${target_name}、带着快融化一样的表情对${player_name}撒着娇。`,
      ); // :6612
      await era.printAndWait(
        `「嗯啊…对我做更舒服的事吧${heart(1)} …来吧${heart(1)} …啊啊——${heart(1)}」`,
      ); // :6613
    } else {
      // :6614-6615 それ以外
      await era.printAndWait(
        `「啊啊…这么舒服…还是第一次…啊啊！不行…再继续被玩弄的话我…已经…啊啊…变得奇怪…回不了头啊！」`,
      ); // :6615
      await era.printAndWait(
        `${target_name}的身体里被刻下了强烈的快感、漏出了快要融化一样的表情………`,
      ); // :6616
    }
    kojo.快乐刻印Lv3 = 1; // :6618 CFLAG:298 = 1
  }

  // :6624-6629 屈服刻印Lv3取得 CFLAG:299
  if (game.system.屈服刻印变动 == 3 && kojo.屈服刻印Lv3 == 0) {
    await era.printAndWait(`「啊啊…我…已经…不会再反抗了…」`); // :6625
    await era.printAndWait(`「或许这才是我…新的………」`); // :6626
    await era.printAndWait(`${target_name}完全的屈服了的样子………`); // :6627
    kojo.屈服刻印Lv3 = 1; // :6628 CFLAG:299 = 1
  }

  // :6634-6643 反抗刻印Lv3取得 CFLAG:300
  if (game.system.反抗刻印变动 == 3 && kojo.反抗刻印Lv3 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      // :6636 爱慕
      await era.printAndWait(`「为…为什么要这么对我…真的会讨厌你的…呜呜」`); // :6637
    } else {
      // :6638-6639 それ以外
      await era.printAndWait(`「咕…嗯…我真的生气了…！」`); // :6639
      await era.printAndWait(
        `${target_name}的眼中充满愤怒、瞪着${player_name}………`,
      ); // :6640
    }
    kojo.反抗刻印Lv3 = 1; // :6642 CFLAG:300 = 1
  }

  return 0;
}

// 注册进分发族（TRYCALLFORM KOJO_MESSAGE_MARKCNG_8 的等价物）
kojo_message_markcng_family.register(8, kojo_message_markcng_8);

/**
 * @SELF_KOJO_K8（:6649-7072）：事件口上（TFLAG:13 分派）。
 * 1 调教后自慰 / 2 百合PLAY / 3 朝口交 / 4 调教后性交 / 5 夜袭 / 6 卖却 /
 * 11 妊娠发觉 / 12 生产 / 13 育儿室 / 14 亲离 / 999 死亡 / 998 寿命；
 * 末行 TFLAG:13 = 0。死亡/寿命两支源作 PRINTFORMW 均为空（1:1 保真，源作
 * 未填写台词，非转译遗漏）。妊娠发觉/生产两支的「已发觉/已生产」分支与
 * 「首次发觉/生产」分支内容 1:1 重复（源作如此，同 SELECTCOM 87 先例）。
 * 卖却分支尾调 SELL_MATURO_K0（存根，见 docs/stub-registry.md）。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（本函数未直接消费，随族签名保留）
 * @param {number} [q] 自慰妄想对象（Q：0 主人 / 1 助手 / 2 野狗，源 :6659/6663，
 *   #214 决议：Emuera 单字母全局改显式传参）
 * @param {number} [s] 调教后加做次数（S，源 :6801/6802/6812，TFLAG:13 == 4
 *   分支专用，同 #214 决议——调用侧见 ere/event/event-aftertrain.js）
 * @returns {Promise<number>} 0
 */
async function self_kojo_k8(rand, q, s) {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const assi_name = chara_callname(era_flag.assi); // %SAVESTR:ASSI%
  const master_name = chara_name(0); // %CALLNAME:MASTER%（MASTER 恒角色 0）
  const kojo = chara(target).kojo;
  // CSTR:2：妊娠父系名字（出自 EVENT_PREGNANCY.ERB:349 CSTR:TARGET:2 = %SAVESTR:ASSI%，未移植）
  const cstr2 = era.get(`cstr:${target}:2`) || '';

  // :6653-6707 调教后自慰 CFLAG:261
  if (game.train.初吻与自我口上 === 1) {
    if (era0(`talent:${target}:9`) === 1) {
      // :6655 崩坏してしまった場合
      await era.printAndWait(`「啊嗯…嗯啊大人嗯大人………」`); // :6656
      await era.printAndWait(`${target_name}像坏掉的玩具一样，疯狂的自慰着………`); // :6657
    } else if (q === 1) {
      // :6658-6659 爱がなくかつ助手とのレズセックス後なら百合气质×20%で助手
      await era.printAndWait(`「那个人…还会…来抱我吗…嗯…嗯嗯！」`); // :6660
      await era.printAndWait(
        `${target_name}像是在寻求${assi_name}的残渣一样，用手指抚摸着秘所………`,
      ); // :6661
    } else if (q === 2) {
      // :6662-6663 上に該当せずかつ爱がなくアイテムに野良犬があれば、兽奸中毒×20%で野良犬
      await era.printAndWait(`「啊嗯…忘不了流浪狗大人的阴茎…啊…啊啊啊！」`); // :6664
      await era.printAndWait(
        `${target_name}想象被流浪狗侵犯着，疯狂的自慰着………`,
      ); // :6665
    } else {
      // :6666-6667 その他
      if (
        era0(`talent:${target}:76`) &&
        (kojo.调教后自慰 < 4 || game.kojo.口上开关 === 2)
      ) {
        // :6668 淫乱
        await era.printAndWait(
          `「嗯啊啊…小穴好舒服…${heart(1)} 嗯啊嗯…啊啊${heart(1)}」`,
        ); // :6670
        await era.printAndWait(
          `${target_name}一边激烈的摩擦着秘裂、一边苦闷的躺在床上。`,
        ); // :6671
        await era.printAndWait(
          `「我的身体已经…好像被重做成只为了做H的事一样呢…啊啊啊${heart(1)}」`,
        ); // :6672
        if (era0(`talent:${target}:0`) === 1) {
          // :6673
          await era.printAndWait(
            `然后${target_name}用手指不停的搅拌着还不知道男性的蜜裂的入口。`,
          ); // :6674
          await era.printAndWait(
            `「嗯啊…嗯、啊啊…好像快点要阴茎…想要被侵犯到子宫为止${heart(1)}」`,
          ); // :6675
        } else {
          // :6676-6677
          await era.printAndWait(
            `${target_name}把两根，三根的手指插进了蜜壶，就那样开始搅拌了起来。`,
          ); // :6677
          await era.printAndWait(
            `「嗯…嗯嗯…阴茎…好像被粗大的阴茎侵犯里面…啊啊啊${heart(1)}」`,
          ); // :6678
        }
        kojo.调教后自慰 = 4; // :6680 CFLAG:261 = 4
      } else if (
        era0(`talent:${target}:85`) &&
        (kojo.调教后自慰 < 3 || game.kojo.口上开关 === 2)
      ) {
        // :6681 爱慕
        await era.printAndWait(
          `「啊啊…啊嗯…那个人的温度还残留着…啊…啊啊${heart(1)}」`,
        ); // :6683
        await era.printAndWait(
          `${target_name}舔着指尖，一边用手指描绘着自己的蜜裂的样子，一边苦闷的躺在床上。`,
        ); // :6684
        await era.printAndWait(
          `「还想继续被抱…啊啊…因为我的全部都是那个人的东西…啊…啊啊！」`,
        ); // :6685
        if (era0(`talent:${target}:0`) === 1) {
          // :6686
          await era.printAndWait(`「嗯嗯…快点让我变成女人吧…啊啊…嗯啊啊嗯！」`); // :6687
          await era.printAndWait(
            `${target_name}用手指不停的搅拌着还不知道男性的蜜裂的入口………`,
          ); // :6688
        } else {
          // :6689-6690
          await era.printAndWait(
            `「只用我的手指…啊嗯…完全不够啊…啊…啊嗯${heart(1)}」`,
          ); // :6690
          await era.printAndWait(
            `${target_name}把两根，三根甚至更多的手指插进了蜜壶搅拌了起来………`,
          ); // :6691
        }
        kojo.调教后自慰 = 3; // :6693 CFLAG:261 = 3
      } else if (
        era0(`abl:${target}:31`) >= 3 &&
        (kojo.调教后自慰 < 2 || game.kojo.口上开关 === 2)
      ) {
        // :6694 自慰中毒Lv3以上
        await era.printAndWait(
          `「啊啊…嗯…嗯啊…啊啊…手指停不下来…！嗯…啊啊！」`,
        ); // :6696
        await era.printAndWait(
          `「自慰的频率比以前还高了…肯定是被抓到这种地方的原因…啊啊…嗯…咕！」`,
        ); // :6697
        await era.printAndWait(
          `${target_name}躺在硬床上、一边为压低声音而咬着床单，一边不停的自慰着………`,
        ); // :6698
        kojo.调教后自慰 = 2; // :6699 CFLAG:261 = 2
      } else if (kojo.调教后自慰 < 1 || game.kojo.口上开关 === 2) {
        // :6700 それ以外
        await era.printAndWait(
          `「啊啊…谁快点来救救我…不然的话我会…嗯…啊嗯！」`,
        ); // :6702
        await era.printAndWait(`「我会…我会…啊啊…啊嗯！」`); // :6703
        kojo.调教后自慰 = 1; // :6704 CFLAG:261 = 1
      }
    }
  }

  // :6709-6751 レズプレイ CFLAG:262
  if (game.train.初吻与自我口上 === 2) {
    if (era0(`talent:${target}:9`) === 1) {
      // :6713-6714 崩坏してしまった場合
      await era.printAndWait(
        `「啊啊…哇，大人的胸部…哇，大人…人enenenenen——……」`,
      ); // :6715
      await era.printAndWait(
        `${assi_name}和坏掉的${target_name}享受着这颓废的百合play………`,
      ); // :6716
      kojo.百合PLAY = 6; // :6717 CFLAG:262 = 6
    } else if (
      era0(`talent:${target}:76`) &&
      (kojo.百合PLAY < 5 || game.kojo.口上开关 === 2)
    ) {
      // :6718 淫乱
      await era.printAndWait(
        `「呵呵呵、女性之间也不错呢…嗯嗯…嗯啊…嗯啾…啾…嗯啾♪」`,
      ); // :6720
      await era.printAndWait(
        `${target_name}和${assi_name}在床上，四肢和舌头缠绕在一起、互相刺激着敏感的地方。`,
      ); // :6721
      await era.printAndWait(
        `「啊嗯…啊…啊啊！把我弄得更加乱七八糟的吧…啊嗯啊啊${heart(1)}」`,
      ); // :6722
      await era.printAndWait(`${target_name}诱惑着${assi_name}张开了双腿………`); // :6723
      kojo.百合PLAY = 5; // :6724 CFLAG:262 = 5
    } else if (
      era0(`talent:${target}:85`) &&
      (kojo.百合PLAY < 4 || game.kojo.口上开关 === 2)
    ) {
      // :6725 爱慕
      await era.printAndWait(
        `「不行啊…我的身体是献给那个人的…啊…啊…嗯嗯！嗯啊、我明白…只要不插进来做真么都好…啊」`,
      ); // :6727
      await era.printAndWait(
        `看到${target_name}坦率的接受了，${assi_name}一边下流的笑着，一边描绘着，搅拌着，挖动着${target_name}的敏感的部位。`,
      ); // :6728
      await era.printAndWait(`「啊啊啊！突、突然这样！啊啊！嗯…啊嗯！」`); // :6729
      await era.printAndWait(
        `${assi_name}看着在自己身下挣扎的${target_name}，在嗜虐心和“从自己的主人手里抢走了女人”的背德的快感的刺激下，继续进行着百合ply………`,
      ); // :6730
      kojo.百合PLAY = 4; // :6731 CFLAG:262 = 4
    } else if (
      era0(`abl:${target}:33`) >= 3 &&
      (kojo.百合PLAY < 3 || game.kojo.口上开关 === 2)
    ) {
      // :6732 百合中毒Lv3以上
      await era.printAndWait(`「嗯啊…嗯…嗯…嗯…继续接吻…啊啊…嗯啾嗯啾…嗯啾…♪」`); // :6734
      await era.printAndWait(
        `${target_name}和${assi_name}一边激烈的激吻，一边大腿摩擦在一起、互相提高着快感。`,
      ); // :6735
      await era.printAndWait(`「啊啊…好舒服…我已经…不能自拔了…啊啊♪」`); // :6736
      await era.printAndWait(
        `「把我变得更乱七八糟的…啊嗯…啊啊啊…要融化了…要融化了♪」`,
      ); // :6737
      kojo.百合PLAY = 3; // :6738 CFLAG:262 = 3
    } else if (
      era0(`abl:${target}:22`) >= 3 &&
      (kojo.百合PLAY < 2 || game.kojo.口上开关 === 2)
    ) {
      // :6739 百合气质Lv3以上
      await era.printAndWait(`「啊啊…嗯…哪里…继续摸哪里…啊！…嗯啊…」`); // :6741
      await era.printAndWait(
        `${target_name}被${assi_name}玩弄着身体，敏感的反映着。`,
      ); // :6742
      await era.printAndWait(`「啊啊…这样好像也不错…啊嗯…嗯啊嗯啊啊！」`); // :6743
      kojo.百合PLAY = 2; // :6744 CFLAG:262 = 2
    } else if (kojo.百合PLAY < 1 || game.kojo.口上开关 === 2) {
      // :6745 それ以外
      await era.printAndWait(
        `「停…停下…嗯…做这种事我也不会有感觉…啊…啊啊嗯！」`,
      ); // :6747
      await era.printAndWait(
        `看到一边逞强一边发出喘息声的${target_name}，${assi_name}哧哧地笑继续玩弄着她………`,
      ); // :6748
      kojo.百合PLAY = 1; // :6749 CFLAG:262 = 1
    }
  }

  // :6756-6789 朝フェラ CFLAG:263
  if (game.train.初吻与自我口上 === 3) {
    if (era0(`talent:${target}:9`) === 1) {
      // :6757-6758 崩坏してしまった場合
      await era.printAndWait(`「啊…嗯…啾啾…嗯啾…啊啊…好大…好大啊………」`); // :6759
      await era.printAndWait(`${target_name}带着呆滞的表情，继续舔着阴茎………`); // :6760
    } else if (
      era0(`talent:${target}:76`) === 1 &&
      (kojo.朝口交 < 3 || game.kojo.口上开关 === 2)
    ) {
      // :6761 淫乱
      await era.printAndWait(
        `「从早上开始就能独占你的阴茎什么的，最棒了…呵呵呵、有从大家哪里偷偷溜出来的价值呢…嗯嗯…啾…嗯啾…${heart(1)}」`,
      ); // :6763
      await era.printAndWait(
        `${target_name}的脸上粘着${player_name}的精液，就那样继续舔着阴茎。`,
      ); // :6764
      await era.printAndWait(`「嗯…嗯啾啾嗯啾啾啾…啾…啾…嗯…嗯…${heart(1)}」`); // :6765
      await era.printAndWait(
        `「嗯…嗯啊…让你变得更舒服吧…啾…啾啾嗯啾${heart(1)}」`,
      ); // :6766
      await era.printAndWait(
        `${target_name}和带着无比幸福的表情继续吮吸着${player_name}的阴茎………`,
      ); // :6767
      kojo.朝口交 = 3; // :6768 CFLAG:263 = 3
    } else if (
      era0(`talent:${target}:85`) &&
      (kojo.朝口交 < 3 || game.kojo.口上开关 === 2)
    ) {
      // :6769 爱慕
      await era.printAndWait(
        `「啊啊…早上好…嗯啾…啾…嗯嗯${heart(1)} 我收下主君的晨勃是理所当然的吧？」`,
      ); // :6771
      await era.printAndWait(
        `${target_name}把脸颊上的精液用手指擦进嘴里，轻轻的一笑。`,
      ); // :6772
      await era.printAndWait(
        `「呵呵呵、你的还很精神呢、就这样让我全都让我独占…下来吧、我会负起责任收下的…啊嗯嗯——${heart(1)}」`,
      ); // :6773
      await era.printAndWait(
        `「嗯啊…啊啊…你的真的好棒…嗯啾啾啾…嗯…嗯啾…啾…啾${heart(1)}」`,
      ); // :6774
      kojo.朝口交 = 3; // :6775 CFLAG:263 = 3
    } else if (
      era0(`abl:${target}:16`) >= 5 &&
      (kojo.朝口交 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :6776 侍奉精神Lv5以上
      await era.printAndWait(
        `「听说今早你还积攒着呢、我来帮你全都发泄出来吧…嗯啾…啾」`,
      ); // :6778
      await era.printAndWait(
        `${target_name}舔舐吮吸着${player_name}刚刚射精的阴茎，让它勃起了。`,
      ); // :6779
      await era.printAndWait(
        `「还有存货吧？来吧…继续在我嘴里射出来吧…嗯…啊嗯…♪」`,
      ); // :6780
      kojo.朝口交 = 2; // :6781 CFLAG:263 = 2
    } else if (kojo.朝口交 < 1 || game.kojo.口上开关 === 2) {
      // :6782 それ以外
      await era.printAndWait(
        `「嗯啊…总觉得今天早上想要你的呢…所以就稍微偷吃了一下…」`,
      ); // :6784
      await era.printAndWait(
        `「会好好的全都清理干净的你别在意…嗯…啾…嗯啾…嗯…嗯………」`,
      ); // :6785
      await era.printAndWait(
        `这么说着的${target_name}的脸上从脸颊到耳朵全都通红通红的………`,
      ); // :6786
      kojo.朝口交 = 1; // :6787 CFLAG:263 = 1
    }
  }

  // :6794-6815 調教後セックス CFLAG:264
  if (game.train.初吻与自我口上 === 4) {
    if (
      era0(`abl:${target}:2`) >= 4 &&
      (kojo.调教后性交 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :6795 V感覚Lv4以上
      await era.printAndWait(
        `${master_name}押着${target_name}分开的双腿，从上面用阴茎贯穿着蜜壶。`,
      ); // :6797
      await era.printAndWait(
        `「啊嗯…嗯…啊啊啊…继续侵犯我…小穴，小穴好舒服${heart(1)}」`,
      ); // :6798
      await era.printAndWait(
        `${target_name}因为和平时的调教不同、只为了寻求快乐的性交而兴奋着。`,
      ); // :6799
      await era.printAndWait(
        `舌头互相纠缠着，口水让嘴里黏糊糊的、互相舔下调教中流出的汗水。`,
      ); // :6800
      if ((s || 0) >= 3) {
        // :6801
        await era.printAndWait(
          `${target_name}的蜜壶已经被中出了${s}回，泛起泡沫了。`,
        ); // :6802
      }
      await era.printAndWait(
        `「继续…抱我…啊啊！不要离开${heart(1)} 不要离开${heart(1)}」`,
      ); // :6803
      await era.printAndWait(`${target_name}发出高亢的声音不停的绝顶着………`); // :6804
      kojo.调教后性交 = 2; // :6805 CFLAG:264 = 2
    } else if (kojo.调教后性交 < 1 || game.kojo.口上开关 === 2) {
      // :6806 それ以外
      await era.printAndWait(`「我还想被你…抱着…啊啊啊！啊嗯…嗯啊…啊好深！」`); // :6808
      await era.printAndWait(
        `${master_name}从上面压住${target_name}不停的挖着阴道深处。${target_name}也因此漏出了喘息的呻吟。`,
      ); // :6809
      await era.printAndWait(`「嗯啊…嗯哪里，就是哪里…嗯…啊嗯…啊啊———！」`); // :6810
      await era.printAndWait(`「啊啊…继续…继续侵犯我…嗯啊…啊啊啊啊………」`); // :6811
      await era.printAndWait(
        `${s || 0}回分的精液从${target_name}的股间流了下来………`,
      ); // :6812
      kojo.调教后性交 = 1; // :6813 CFLAG:264 = 1
    }
  }

  // :6820-6836 夜這い CFLAG:265
  if (game.train.初吻与自我口上 === 5) {
    if (kojo.夜袭 < 1 || game.kojo.口上开关 === 2) {
      if (
        era0(`talent:${target}:9`) === 1 &&
        (kojo.夜袭 < 2 || game.kojo.口上开关 === 2)
      ) {
        // :6822-6823 崩坏してしまった場合
        await era.printAndWait(`「啊…啊…啊啊…想变成小穴…小穴………」`); // :6824
        await era.printAndWait(
          `坏掉的${target_name}为了被自己的主人抱着而来到了${master_name}的房间………`,
        ); // :6825
        kojo.夜袭 = 2; // :6826 CFLAG:265 = 2
      } else {
        // :6827-6828
        await era.printAndWait(
          `「呵呵呵、想被你抱，所以脚擅自走过来了。呐…可以吧？」`,
        ); // :6828
        await era.printAndWait(
          `${target_name}斜眼看着${master_name}的方向，用手关上了身后的门。`,
        ); // :6829
        await era.printAndWait(
          `「你也是，不二十四小时一直都抱着女人不行吧？那今夜就由我来………」`,
        ); // :6830
        await era.printAndWait(
          `${target_name}一边舔着嘴唇一边钻上了${master_name}的床。`,
        ); // :6831
        await era.printAndWait(
          `「啊啊…你的气味好厉害…我已经忍耐不了了…啊啊…${heart(1)}」`,
        ); // :6832
        kojo.夜袭 = 1; // :6833 CFLAG:265 = 1
      }
    }
  }

  // :6841-6872 売却
  if (game.train.初吻与自我口上 === 6) {
    if (era0(`talent:${target}:9`) === 1) {
      await era.printAndWait(
        `「坐这个哇车（马车）的话、就能见到哇大人吗？嘿嘿、那就坐上去吧」`,
      ); // :6843
      await era.printAndWait(`就这样，坏道的${target_name}被卖掉了………`); // :6844
    } else if (era0(`talent:${target}:85`) && era0(`mark:${target}:3`) < 3) {
      // :6845 爱慕+反抗刻印Lv3未満
      await era.printAndWait(`「这样啊、我被你甩了呢…真遗憾…」`); // :6847
      await era.printAndWait(
        `${target_name}带着作为防止从绳子里出来而特别定做的项圈和手枷足枷。接下来就只剩下装进马车卖掉了。`,
      ); // :6848
      await era.printAndWait(
        `「“如果是你希望这样的话那也没办法”…什么的真讨厌啊！　我不想离开你，不想离开你啊！」`,
      ); // :6849
      await era.printAndWait(
        `${target_name}转动身体，给手枷和足枷施加一定以上的力量的话，项圈就会发出电击。`,
      ); // :6850
      await era.printAndWait(
        `「啊！………啊啊…连这种东西都给我戴上了…真的…不需要…我了啊………呜…呜呜呜…」`,
      ); // :6851
      await era.printAndWait(
        `${master_name}冷冷的看着${target_name}流下眼泪、把${target_name}交给了奴隶商人………`,
      ); // :6852
    } else if (era0(`mark:${target}:3`) === 3) {
      // :6853 反抗刻印Lv3
      await era.printAndWait(`「下次见面就是你的死期、记住吧」`); // :6855
      await era.printAndWait(
        `${target_name}一边瞪着${master_name}一边说出了威严的话`,
      ); // :6856
      await era.printAndWait(
        `知道等待她的是什么样的结局的${master_name}只能苦笑………`,
      ); // :6857
    } else if (era0(`talent:${target}:76`)) {
      // :6858 淫乱
      await era.printAndWait(`「、不要啊…我不要从你的阴茎哪里离开啊………」`); // :6860
      await era.printAndWait(
        `作为完全被调教了的淫乱奴隶的${target_name}不情愿的摇着头，抱住了${master_name}。`,
      ); // :6861
      await era.printAndWait(
        `「被卖到的地方就算会被轮奸多少次，我也感觉不会遇到比你更好的阴茎了…啊啊…不要离开！」`,
      ); // :6862
      await era.printAndWait(
        `被奴隶商人用绳子挂起来的${target_name}就这样被装上了马车………`,
      ); // :6863
    } else {
      // :6864-6865 それ以外
      await era.printAndWait(`「我的结局就是这样什么的…骗…骗人吧………」`); // :6866
      await era.printAndWait(
        `${target_name}的手脚被戴上镣铐、就那样保持着因冲击而发呆的表情。`,
      ); // :6867
      await era.printAndWait(`然后被奴隶商人一推后背，就那样被装到了马车上………`); // :6868
    }
    if (era0(`talent:${target}:122`) !== 1) {
      // :6870
      stub_line('SELL_MATURO_K0', '出售成熟奴隶口上', '随出售票'); // CALL SELL_MATURO_K0 // :6871
    }
  }

  // :6879-6943 妊娠発覚 CFLAG:271
  // CFLAG:102→誰によって妊娠させられたか（マスター=1,助手=2,奴隷=3,客=4,犬=5,モンスター・触手=6,狂王=7）
  if (game.train.初吻与自我口上 === 11) {
    if (kojo.妊娠发觉 === 0) {
      // :6880-6881 崩坏してしまった場合
      if (era0(`talent:${target}:9`) === 1) {
        await era.printAndWait(
          `「我的肚子里…有…什么东西？不要…不想怀上怪物的孩子…不要啊啊啊啊啊啊啊啊啊啊」`,
        ); // :6883
        await era.printAndWait(
          `${target_name}好像因为无法承受妊娠的事实而完全坏掉了的样子………`,
        ); // :6884
      } else if (
        era0(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 === 1
      ) {
        // :6885 父親が主人で母親が爱持ち
        await era.printAndWait(
          `「呐、今天有令人高兴的报告…看起来我好像有你的孩子了、我绝对要生下来呢………${heart(1)}」`,
        ); // :6887
        await era.printAndWait(
          `${target_name}得意洋洋的吧妊娠的消息报告给了${master_name}………`,
        ); // :6888
      } else if (chara(target).event.妊娠相手 === 2) {
        // :6889 父親が助手（CSTR:2：出自 EVENT_PREGNANCY.ERB:349 写入的父系名字，未移植）
        await era.printAndWait(
          `「那个、稍微有点事情要报告。看样子我怀上了和${cstr2}之间的孩子了」`,
        ); // :6891
        await era.printAndWait(
          `${target_name}一边抚摸着肚子一边把妊娠的消息报告给了${master_name}。`,
        ); // :6892
        await era.printAndWait(`「也会有这种事、吓了我一跳呢」`); // :6893
      } else if (chara(target).event.妊娠相手 === 3) {
        // :6894 父親が奴隷
        await era.printAndWait(
          `「那个、稍微有点事情要报告。样子我怀上了和${cstr2}之间的孩子了」`,
        ); // :6896
        await era.printAndWait(
          `${target_name}一边抚摸着肚子一边把妊娠的消息报告给了${master_name}。`,
        ); // :6897
        await era.printAndWait(`「也会有这种事、吓了我一跳呢」`); // :6898
      } else if (
        chara(target).event.妊娠相手 === 5 &&
        era0(`talent:${target}:136`) &&
        chara(target).invasion.状态 !== 9
      ) {
        // :6899 父親が野良犬で牝犬持ち、NTR時以外（CFLAG:1 == 9 → 被狂王掳走）
        await era.printAndWait(
          `「呵呵呵、看样子我被授予了野狗大人的孩子…啊啊…我的身体也好心里也好，都已经变成牝犬了呢………」`,
        ); // :6901
        await era.printAndWait(`${target_name}带着出神的表情抚摸着腹部………`); // :6902
      } else if (chara(target).event.妊娠相手 === 7) {
        // :6903 父親が狂王
        await era.printAndWait(`「怎么这样…我怀上狂王大人的孩子…啊啊…」`); // :6905
      } else {
        // :6906 その他
        await era.printAndWait(`「没想到我就这样妊娠了呢………」`); // :6908
      }
      kojo.妊娠发觉 = 1; // :6910 CFLAG:271 = 1
    } else {
      // :6911-6914（与上支内容 1:1 重复，源作如此——第二次通知未改文案）
      if (era0(`talent:${target}:9`) === 1) {
        await era.printAndWait(
          `「我的肚子里…有…什么东西？不要…不想怀上怪物的孩子…不要啊啊啊啊啊啊啊啊啊啊」`,
        ); // :6914
        await era.printAndWait(
          `${target_name}好像因为无法承受妊娠的事实而完全坏掉了的样子………`,
        ); // :6915
      } else if (
        era0(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 === 1
      ) {
        // :6916 父親が主人で母親が爱持ち
        await era.printAndWait(
          `「呐、今天有令人高兴的报告…看起来我好像有你的孩子了、我绝对要生下来呢………${heart(1)}」`,
        ); // :6918
        await era.printAndWait(
          `${target_name}得意洋洋的吧妊娠的消息报告给了${master_name}………`,
        ); // :6919
      } else if (chara(target).event.妊娠相手 === 2) {
        // :6920 父親が助手
        await era.printAndWait(
          `「那个、稍微有点事情要报告。看样子我怀上了和${cstr2}之间的孩子了」`,
        ); // :6922
        await era.printAndWait(
          `${target_name}一边抚摸着肚子一边把妊娠的消息报告给了${master_name}。`,
        ); // :6923
        await era.printAndWait(`「也会有这种事、吓了我一跳呢」`); // :6924
      } else if (chara(target).event.妊娠相手 === 3) {
        // :6925 父親が奴隷
        await era.printAndWait(
          `「那个、稍微有点事情要报告。样子我怀上了和${cstr2}之间的孩子了」`,
        ); // :6927
        await era.printAndWait(
          `${target_name}一边抚摸着肚子一边把妊娠的消息报告给了${master_name}。`,
        ); // :6928
        await era.printAndWait(`「也会有这种事、吓了我一跳呢」`); // :6929
      } else if (
        chara(target).event.妊娠相手 === 5 &&
        era0(`talent:${target}:136`) &&
        chara(target).invasion.状态 !== 9
      ) {
        // :6930 父親が野良犬で牝犬持ち、NTR時以外
        await era.printAndWait(
          `「呵呵呵、看样子我被授予了野狗大人的孩子…啊啊…我的身体也好心里也好，都已经变成牝犬了呢………」`,
        ); // :6932
        await era.printAndWait(`${target_name}带着出神的表情抚摸着腹部………`); // :6933
      } else if (chara(target).event.妊娠相手 === 7) {
        // :6934 父親が狂王
        await era.printAndWait(`「怎么这样…我怀上狂王大人的孩子…啊啊…」`); // :6936
      } else {
        // :6937 その他
        await era.printAndWait(`「没想到我就这样妊娠了呢………」`); // :6939
      }
      kojo.妊娠发觉 = 1; // :6941 CFLAG:271 = 1
    }
  }

  // :6951-6983 出産 CFLAG:272（CFLAG:102 语义同上）
  if (game.train.初吻与自我口上 === 12) {
    if (kojo.生产 === 0) {
      // :6952-6953 崩坏している場合
      if (era0(`talent:${target}:9`) === 1) {
        await era.printAndWait(
          `「啊啊…啊…我的肚子里…有什么出来了…啊啊啊啊啊啊啊啊」`,
        ); // :6955
        await era.printAndWait(`已经崩坏的${target_name}嘿嘿嘿的继续笑着………`); // :6956
      } else if (
        era0(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 === 1
      ) {
        // :6957 父親が主人で母親が爱持ち
        await era.printAndWait(
          `「啊嗯…是你的孩子哦…你看，看起来和你一模一样…啊啊、我还想和你生孩子呢…${heart(1)}」`,
        ); // :6959
        await era.printAndWait(
          `${target_name}抱起了孩子，看起来很高兴的笑着………`,
        ); // :6960
      } else {
        // :6961 その他
        await era.printAndWait(
          `「总觉得很不可思议…就算是这种孩子也舍不得扔掉呢」`,
        ); // :6963
        await era.printAndWait(`${target_name}抱起了孩子，开始哄着他………`); // :6964
      }
      kojo.生产 = 1; // :6966 CFLAG:272 = 1
    } else {
      // :6968-6969（与上支内容基本重复，源作如此）
      if (era0(`talent:${target}:9`) === 1) {
        await era.printAndWait(
          `「啊啊…啊…我的肚子里…有什么出来了…啊啊啊啊啊啊啊啊」`,
        ); // :6970
        await era.printAndWait(`已经崩坏的${target_name}嘿嘿嘿的继续笑着………`); // :6971
      } else if (
        era0(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 === 1
      ) {
        // :6972 父親が主人で母親が爱持ち
        await era.printAndWait(
          `「啊嗯…是你的孩子哦…你看，看起来和你一模一样…啊啊、我还想和你生孩子呢…${heart(1)}」`,
        ); // :6974
        await era.printAndWait(
          `${target_name}抱起了孩子，看起来很高兴的笑着………`,
        ); // :6975
      } else {
        // :6976 その他（源作误写缺失开头「，1:1 保真不修）
        await era.printAndWait(
          `总觉得很不可思议…就算是这样也舍不得扔掉这个孩子呢」`,
        ); // :6978
        await era.printAndWait(`${target_name}抱起了孩子，开始哄着他………`); // :6979
      }
      kojo.生产 = 1; // :6981 CFLAG:272 = 1
    }
  }

  // :6988-7002 育児室 CFLAG:273
  if (game.train.初吻与自我口上 === 13) {
    if (era0(`talent:${target}:85`) || era0(`talent:${target}:76`)) {
      // :6989-6990 陥落済
      if (era0(`talent:${target}:153`)) {
        // :6991 妊娠中
        await era.printAndWait(
          `「呵呵呵、马上就要生下来了、到底是个怎么样的孩子呢，真期待啊♪」`,
        ); // :6993
        await era.printAndWait(
          `${target_name}抚摸着因为临月而膨胀起来的肚子………`,
        ); // :6994
      } else if (era0(`talent:${target}:154`)) {
        // :6995 育儿中
        await era.printAndWait(
          `「呀、来见我的孩子吗？　喂、难得魔王大人来，不要乱动哦」`,
        ); // :6997
        await era.printAndWait(`${target_name}哄着孩子………`); // :6998
      }
    }
    kojo.育儿室 = 1; // :7001 CFLAG:273 = 1
  }

  // :7007-7013 親離れ時 CFLAG:274
  if (game.train.初吻与自我口上 === 14) {
    if (era0(`talent:${target}:85`) || era0(`talent:${target}:76`)) {
      // :7008-7009 陥落済
      await era.printAndWait(
        `「因为是我的孩子、不管去哪里、一定、一定没事的」`,
      ); // :7010
    }
    kojo.亲离 = 1; // :7012 CFLAG:274 = 1
  }

  // :7019-7027 死亡（源作两支 PRINTFORMW 均为空——审查/未填写，1:1 保真）
  if (game.train.初吻与自我口上 === 999) {
    if (era0(`talent:${target}:85`)) {
      // :7020-7021 爱慕
      await era.printAndWait(``); // :7022
    } else {
      // :7023 それ以外
      await era.printAndWait(``); // :7025
    }
  }

  // :7032-7040 寿命による消滅（源作两支 PRINTFORMW 均为空，同上）
  if (game.train.初吻与自我口上 === 998) {
    if (era0(`talent:${target}:85`)) {
      // :7033-7034 爱慕
      await era.printAndWait(``); // :7035
    } else {
      // :7036 それ以外
      await era.printAndWait(``); // :7038
    }
  }

  // :7043-7045 フラグ初期化
  game.train.初吻与自我口上 = 0; // :7045 TFLAG:13 = 0

  return 0;
}

// 注册进分发族（TRYCALLFORM SELF_KOJO_K8 的等价物）
self_kojo_family.register(8, self_kojo_k8);

/**
 * @DUNGEON_RYOUZYOKU_K8（:7073-7090）：迷宫凌辱前的一言。
 * 处女（TALENT:0）与非处女只差中间一行心声，其余两行相同。
 */
async function dungeon_ryouzyoku_k8() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%

  if (era0(`talent:${target}:0`) == 1) {
    // :7079 处女
    await era.printAndWait(`「咕…是我输了…你想怎么样就怎么样吧………」`); // :7080
    await era.printAndWait(
      `（找个破绽…想办法逃出去…！处女被夺走这种事怎么说都行…！）`,
    ); // :7081
    await era.printAndWait(`虽然输了，但是${target_name}的眼神还没有放弃………`); // :7082
  } else {
    // :7084 非处女
    await era.printAndWait(`「咕…是我输了…你想怎么样就怎么样吧………」`); // :7085
    await era.printAndWait(`（找个破绽…想办法逃出去…！）`); // :7086
    await era.printAndWait(`虽然输了，但是${target_name}的眼神还没有放弃………`); // :7087
  }

  return 0;
}

/**
 * @DUNGEON_RYOUZYOKU_AFTER_K8（:7093-7143）：迷宫凌辱后的一言。
 * 处女支只按 EXP:1 / EXP:22 / EXP:20 三档追加；非处女支多一档 EXP:0（膣），
 * 且 EXP:20 档源作多打了一行孤立的「（:7137），1:1 保真原样保留。
 */
async function dungeon_ryouzyoku_after_k8() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%

  if (era0(`talent:${target}:0`) == 1) {
    // :7099 处女
    await era.printAndWait(`（啊啊…明明还是处女呢…）`); // :7100
    await era.printAndWait(`「已经…完了…吧…」`); // :7101

    // :7102 アナルを弄られすぎた感想
    if (era0(`exp:${target}:1`) > 20) {
      await era.printAndWait(
        `${target_name}的肛门里，不只是粘液还是精液的东西溢了出来。`,
      ); // :7104
      await era.printAndWait(`「啊啊…屁股…已经什么都感觉不到了…嗯…嗯咕………」`); // :7105
    }

    // :7107 フェラしすぎた感想
    if (era0(`exp:${target}:22`) > 20) {
      await era.printAndWait(
        `毫无休息的口交的${target_name}的脸上沾满了粘液和精液。`,
      ); // :7109
      await era.printAndWait(
        `「咳咳咳…呜啊…我、我已经不想再喝精液了…饶了我吧………」`,
      ); // :7110
    }

    // :7112 精液の味
    if (era0(`exp:${target}:20`) > 20) {
      await era.printAndWait(
        `「啊、嗯、嗯、你们的精液又浓又臭…啊啊…比人类的男性的更好吃…嗯嗯嗯………」`,
      ); // :7114
      await era.printAndWait(`${target_name}被强迫说着关于精液味道的感想………`); // :7115
    }
  } else {
    // :7118 非处女
    await era.printAndWait(`「啊啊…被弄得乱七八糟了…啊、啊啊啊啊………」`); // :7119

    // :7120 膣を苛められすぎた感想
    if (era0(`exp:${target}:0`) > 20) {
      await era.printAndWait(`「我的小穴里咕噜咕噜的…啊…啊啊………」`); // :7122
      await era.printAndWait(
        `${target_name}已经合不上的蜜裂里，不知识粘液还是精液的东西大量的溢了出来。`,
      ); // :7123
    }

    // :7125 アナルを弄られすぎた感想
    if (era0(`exp:${target}:1`) > 20) {
      await era.printAndWait(
        `${target_name}的肛门里，不只是粘液还是精液的东西溢了出来。`,
      ); // :7127
      await era.printAndWait(`「啊啊…屁股…已经什么都感觉不到了…嗯…嗯咕………」`); // :7128
    }

    // :7130 フェラしすぎた感想
    if (era0(`exp:${target}:22`) > 20) {
      await era.printAndWait(
        `毫无休息的口交的${target_name}的脸上沾满了粘液和精液。`,
      ); // :7132
      await era.printAndWait(
        `「咳咳咳…呜啊…我、我已经不想再喝精液了…饶了我吧………」`,
      ); // :7133
    }

    // :7135 精液の味
    if (era0(`exp:${target}:20`) > 20) {
      // :7137 源作多打了一行孤立的开引号（非处女支独有），1:1 保真原样保留
      await era.printAndWait(`「`); // :7137
      await era.printAndWait(
        `「啊、嗯、嗯、你们的精液又浓又臭…啊啊…比人类的男性的更好吃…嗯嗯嗯………」`,
      ); // :7138
      await era.printAndWait(`${target_name}被强迫说着关于精液味道的感想………`); // :7139
    }
  }

  return 0;
}

/**
 * @DUNGEON_VICTORY_K8（:7146-7169）：战斗胜利口上。
 * 决め台詞三选一（RAND:3 / RAND:2 / 其余），再按 BASE:A:0 或 BASE:A:1
 * 对 MAXBASE 不足半成判「险胜」。原作 A 即 TARGET（VICTORY_KOUJO 前置）。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源
 */
async function dungeon_victory_k8(rand) {
  const target = era_flag.target;
  const a = era_flag.target; // A（原作 @VICTORY_KOUJO 前置 TARGET = A）
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));

  // :7150 決め台詞
  if (rand_n(3) == 0) {
    await era.printAndWait(`「哼、没有会输的要素、这是理所当然的结果」`); // :7152
  } else if (rand_n(2) == 0) {
    await era.printAndWait(`「弱的我都要打出哈欠来了」`); // :7154
  } else {
    await era.printAndWait(`「又砍了无聊的东西」`); // :7156
  }

  if (
    (era0(`base:${a}:0`) * 100) / era0(`maxbase:${a}:0`) < 50 ||
    (era0(`base:${a}:1`) * 100) / era0(`maxbase:${a}:1`) < 50
  ) {
    // :7160 ピンチかも
    await era.printAndWait(`（稍微有些得意忘形了吧…不快点休息一下的话…）`); // :7161
    await era.printAndWait(`${target_name}气喘吁吁的………`); // :7162
  } else {
    // :7164 余裕余裕
    await era.printAndWait(`「那么、今天不如再前进一点吧」`); // :7165
    await era.printAndWait(`${target_name}蹦蹦跳跳的向迷宫深处迈开了步子………`); // :7166
  }

  return 0;
}

/**
 * @DUNGEON_ATTACK_K8（:7171-7196）：战斗攻击口上。
 * CFLAG:1 == 2（侵攻中）与其余（迎击中）各三选一。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源
 */
async function dungeon_attack_k8(rand) {
  const target = era_flag.target;
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));

  // :7176 侵攻中
  if (chara(target).invasion.状态 == 2) {
    if (rand_n(3) == 0) {
      await era.printAndWait(`「到处都是空隙呢」`); // :7179
    } else if (rand_n(2) == 0) {
      await era.printAndWait(`「嘿、会心一击」`); // :7181
    } else {
      await era.printAndWait(`「就这样从后面…噗的插进去」`); // :7183
    }
  } else {
    // :7185 迎撃中
    if (rand_n(3) == 0) {
      await era.printAndWait(`「呵呵呵、你也成为我们的同伴吧♪」`); // :7188
    } else if (rand_n(2) == 0) {
      await era.printAndWait(`「你是不可能赢我的，早点投降吧」`); // :7190
    } else {
      await era.printAndWait(`「早点认输，一起变得舒服起来吧………♪」`); // :7192
    }
  }

  return 0;
}

// 注册进迷宫四族（TRYCALLFORM DUNGEON_*_K8 的等价物）
ryouzyoku_kojo_family.register(8, dungeon_ryouzyoku_k8);
ryouzyoku_after_kojo_family.register(8, dungeon_ryouzyoku_after_k8);
dungeon_victory_family.register(8, dungeon_victory_k8);
dungeon_attack_family.register(8, dungeon_attack_k8);

/**
 * @BENKI_KOUJO_K8（:7199-7298）：肉便器口上（角色即 A）。
 *
 * FLAG:62（肉便器行动，详细在 BENKI.ERB）分六档：0 最下层居民凌辱 /
 * 1 レズ便器 / 2 獣姦 / 3 A+V プレイ / 4 V プレイ / 5 A プレイ。
 * 每档内按 TALENT:76 淫乱 → TALENT:85 爱慕 → ABL:16 侍奉精神 Lv5 以上 →
 * それ以外 四选一，条件序与原文一致。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（本函数未消费，随族签名保留）
 */
async function benki_koujo_k8(rand) {
  void rand;
  const a = era_flag.target;
  const target_name = chara_callname(a); // %SAVESTR:TARGET%

  if (game.train.肉便器行动 == 0) {
    // :7205 最下层居民凌辱
    if (era0(`talent:${a}:76`) == 1) {
      // :7206 淫乱
      await era.printAndWait(
        `「请快点给我更多阴茎！啊…啊啊…啊嗯啊啊啊啊${heart(1)}」`,
      ); // :7208
    } else if (era0(`talent:${a}:85`)) {
      // :7209 爱慕
      await era.printAndWait(
        `「啊啊…我是魔王大人的…嗯…快、快停下…嗯…啊啊啊——！」`,
      ); // :7211
    } else if (era0(`abl:${a}:16`) >= 5) {
      // :7212 侍奉精神Lv5以上
      await era.printAndWait(`「请、请让我服侍大家的阴茎…嗯…嗯咕！？」`); // :7214
    } else {
      // :7215 それ以外
      await era.printAndWait(`「呀！不要碰我！好脏…啊啊！不、不要…啊啊——！」`); // :7217
    }
  } else if (game.train.肉便器行动 == 1) {
    // :7220 レズ便器
    if (era0(`talent:${a}:76`) == 1) {
      // :7221 淫乱
      await era.printAndWait(
        `「请给我更多的尿吧…啊啊啊啊…我会全喝下粗（去）的…咕噜咕噜${heart(1)}」`,
      ); // :7223
    } else if (era0(`talent:${a}:85`)) {
      // :7224 爱慕
      await era.printAndWait(
        `「啊啊…被弄得这么脏的话、会再也见不到那个人了吧………」`,
      ); // :7226
      await era.printAndWait(
        `面对${target_name}的叹息，周围的女魔族冷冷的笑着………`,
      ); // :7227
    } else if (era0(`abl:${a}:16`) >= 5) {
      // :7228 侍奉精神Lv5以上
      await era.printAndWait(
        `「我会好好奉仕的…啊嗯…再手下留情一点…嗯咕…嗯咕………」`,
      ); // :7230
    } else {
      // :7231 それ以外
      await era.printAndWait(
        `「不要…我可没有被做这种事还高兴的诶兴趣…啊…嗯咕！」`,
      ); // :7233
    }
  } else if (game.train.肉便器行动 == 2) {
    // :7236 獣姦
    if (era0(`talent:${a}:76`) == 1) {
      // :7237 淫乱
      await era.printAndWait(
        `「啊啊——！这个粗大的野兽已经好棒…啊——啊啊啊啊啊————${heart(1)}」`,
      ); // :7239
    } else if (era0(`talent:${a}:85`)) {
      // :7240 爱慕
      await era.printAndWait(
        `「呀啊！这样的话…要坏了要坏到了…我快坏掉了啊！啊啊啊——！」`,
      ); // :7242
    } else if (era0(`abl:${a}:16`) >= 5) {
      // :7243 侍奉精神Lv5以上
      await era.printAndWait(
        `「啊啊…别这么贪心啊…嗯…啊啊！我会老老实实的…啊…啊啊！呜、好粗！」`,
      ); // :7245
    } else {
      // :7246 それ以外
      await era.printAndWait(
        `「不要…不要…竟然被野兽侵犯什么的…嗯咕！嗯！还、还射在里面…啊啊！还这么大！」`,
      ); // :7248
    }
  } else if (game.train.肉便器行动 == 3) {
    // :7251 A+Vプレイ
    if (era0(`talent:${a}:76`) == 1) {
      // :7252 淫乱
      await era.printAndWait(
        `「啊啊啊…我的小穴和肛门都舒服的快要融化了…继续侵犯我吧…${heart(1)}」`,
      ); // :7254
    } else if (era0(`talent:${a}:85`)) {
      // :7255 爱慕
      await era.printAndWait(
        `「啊啊——！坏掉了…要坏掉了…饶、饶了我吧…啊…啊啊——！」`,
      ); // :7257
      await era.printAndWait(
        `周围的男性们看着悲鸣越来越大的${target_name}的身姿，阴茎挺得更高了………`,
      ); // :7258
    } else if (era0(`abl:${a}:16`) >= 5) {
      // :7259 侍奉精神Lv5以上
      // :7261 源作句末多打了一个引号（啊嗯啊」」），1:1 保真原样保留
      await era.printAndWait(
        `「啊嗯…恩…啊啊…我没有2个小穴，所以请按照顺序来侵犯…啊…啊嗯啊」」`,
      ); // :7261
    } else {
      // :7262 それ以外
      await era.printAndWait(
        `「啊…啊…啊啊啊啊…我的下半身…已经什么都感觉不到了…啊…不、不行再继续的话…啊啊啊啊——！」`,
      ); // :7264
    }
  } else if (game.train.肉便器行动 == 4) {
    // :7267 Vプレイ
    if (era0(`talent:${a}:76`) == 1) {
      // :7268 淫乱
      await era.printAndWait(
        `「啊嗯…啊嗯啊${heart(1)} 继续侵犯我的小穴…满满的射出精液吧…${heart(1)}」`,
      ); // :7270
    } else if (era0(`talent:${a}:85`)) {
      // :7271 爱慕
      await era.printAndWait(
        `「不、不行啊…只有中出…啊、呀！在里面…满满的…射出来了…啊啊…我明明…嗯咕！」`,
      ); // :7273
    } else if (era0(`abl:${a}:16`) >= 5) {
      // :7274 侍奉精神Lv5以上
      await era.printAndWait(
        `「啊啊嗯！啊啊…好好的在我里面射出来…变得舒服…啊…嗯、嗯啊！」`,
      ); // :7276
    } else {
      // :7277 それ以外
      await era.printAndWait(`「不要…不要…啊啊——！不要射在里面…啊啊啊——！」`); // :7279
    }
  } else if (game.train.肉便器行动 == 5) {
    // :7282 Aプレイ
    if (era0(`talent:${a}:76`) == 1) {
      // :7283 淫乱
      await era.printAndWait(
        `「嗯…谢谢你在我的肛门里慢慢的射了出来…啊、啊啊…阴、阴茎又来了${heart(1)}」`,
      ); // :7285
    } else if (era0(`talent:${a}:85`)) {
      // :7286 爱慕
      await era.printAndWait(
        `「嗯、嗯…呀…我的屁股…已经不行了…啊啊…不、不要啊………」`,
      ); // :7288
    } else if (era0(`abl:${a}:16`) >= 5) {
      // :7289 侍奉精神Lv5以上
      await era.printAndWait(`「嗯…呀…我是最喜欢肛门的变态便器…啊啊啊…」`); // :7291
    } else {
      // :7292 それ以外
      await era.printAndWait(
        `「啊啊啊——…要坏掉了…我的屁股要坏掉了…啊啊啊啊………」`,
      ); // :7294
    }
  }

  return 0;
}

// 注册进肉便器口上族（TRYCALLFORM BENKI_KOUJO_K8 的等价物）
benki_koujo_family.register(8, benki_koujo_k8);

/**
 * @COLOSSEUM_KOJO_8（:7304-7446）：死斗场专用口上（头部守卫 TEQUIP:55 岔入）。
 * SELECTCOM 55（放置PLAY）/56（交谈）/31（口交）/5（胸爱撫）/21（背后位）/
 * 27（背后位アナル）/51（媚药史莱姆）各支，含助手调教（ASSI/ASSIPLAY）与
 * 巨魔（TFLAG:400 == 206）分档。
 *
 * @returns {Promise<number>} 0
 */
async function colosseum_kojo_8() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const assi = era_flag.assi;
  const assi_name = chara_callname(assi); // %SAVESTR:ASSI%

  if (era_flag.selectcom == 55) {
    // :7308-7316 放置PLAY
    if (era0(`base:${target}:1`) <= 0) {
      await era.printAndWait(`${target_name}连站起来的力气都没有了……`); // :7311 气力０以下
    } else {
      await era.printAndWait(
        `${target_name}在死斗场的灼热的气氛下看着接下来的对手直发抖……`,
      ); // :7313
    }
    return 0;
  }

  if (era_flag.selectcom == 56) {
    // :7320-7342 交谈
    if (era0(`base:${target}:1`) <= 0) {
      // :7322-7330 气力０以下
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「咕…输给你了………」`); // :7325
        await era.printAndWait(`${target_name}丢下武器跪了下来……`); // :7326
      } else {
        await era.printAndWait(`「快、快住手…别靠近我………」`); // :7328
        await era.printAndWait(`${target_name}丢下武器跪了下来……`); // :7329
      }
    } else {
      // :7332-7339
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(
          `「我知道我不会输给你的…即使被加上多么不利的条件也是」`,
        ); // :7334
        await era.printAndWait(
          `${target_name}架起武器，和${assi_name}相对着………`,
        ); // :7335
      } else {
        await era.printAndWait(`「如果力量能恢复的话…咕」`); // :7337
        await era.printAndWait(
          `${target_name}一边就这样力量被封印着战斗着一边心急的想着……`,
        ); // :7338
      }
    }
    return 0;
  }

  if (era_flag.selectcom == 31) {
    // :7347-7362 口交
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(
        `「啊嗯…恩咕…咕…会好好舔的所以不要用暴力…嗯嗯嗯！」`,
      ); // :7350
      await era.print(`${assi_name}因为`); // :7351
      if (era0(`talent:${assi}:121`) == 1 || era0(`talent:${assi}:122`) == 1) {
        await era.print(`阴茎`); // :7353
      }
      if (
        era0(`talent:${assi}:121`) != 1 &&
        era0(`talent:${assi}:122`) != 1 &&
        era0('item:PBAND') == 1
      ) {
        await era.print(`假阴茎`); // :7355
      }
      await era.printAndWait(`被${target_name}舔着而露出了心旷神怡的表情……`); // :7356
    } else {
      await era.printAndWait(`「嗯咕…好、好脏…啊啊啊…啾…啾…嗯啾………」`); // :7358
      await era.printAndWait(`${target_name}舔着那带有令人作呕的气味的阴茎……`); // :7359
    }
    return 0;
  }

  if (era_flag.selectcom == 5) {
    // :7366-7378 胸爱撫
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(
        `「嗯啊…啊啊拜托你了…因为我是后辈温柔点吧…啊…嗯嗯！」`,
      ); // :7369
      await era.printAndWait(`${target_name}就这样任由${assi_name}摆弄胸部。`); // :7370
      await era.printAndWait(`然后${assi_name}为了让观众观赏而开始揉动胸部………`); // :7371
    } else {
      await era.printAndWait(`「啊、放开…放开那肮脏的手…啊…啊啊！」`); // :7373
      await era.printAndWait(
        `像是因为${target_name}高压的态度还不崩溃而生气了、怪物握住了${target_name}的胸部揉了起来。`,
      ); // :7374
      await era.printAndWait(`「咕——————！好、好疼…快、快住手！」`); // :7375
    }
    return 0;
  }

  if (era_flag.selectcom == 21) {
    // :7382-7404 背后位
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(
        `「嗯…咕…你故意这么激烈…嗯…啊啊…好、好痛…再温柔一点…啊啊——！」`,
      ); // :7385
      await era.print(`${assi_name}一边听着${target_name}的悲鸣用`); // :7386
      if (era0(`talent:${assi}:121`) == 1 || era0(`talent:${assi}:122`) == 1) {
        await era.print(`阴茎`); // :7388
      }
      if (
        era0(`talent:${assi}:121`) != 1 &&
        era0(`talent:${assi}:122`) != 1 &&
        era0('item:PBAND') == 1
      ) {
        await era.print(`假阴茎`); // :7390
      }
      await era.printAndWait(`毫不留情的蹂躏着${target_name}的腔内。`); // :7391
      await era.printAndWait(`随着${target_name}发出悲鸣，观众沸腾了起来………`); // :7392
    } else if (game.train.死斗场敌种 == 206) {
      // :7394-7397 巨魔（TFLAG:400 死斗场敌种 == 206，走 game.train.死斗场敌种 门面）
      await era.printAndWait(
        `「啊啊啊啊！…要、要坏掉了…啊、啊啊…咕…咕啊啊啊啊！」`,
      ); // :7395
      await era.printAndWait(
        `可怜的${target_name}一边发出癞蛤蟆被弄死一样的声音一边就那样任由巨魔摆布着。`,
      ); // :7396
      await era.printAndWait(`观众一个个都站了起来，沸腾着………`); // :7397
    } else {
      await era.printAndWait(
        `「、不要啊…啊啊…呜…啊啊…啊啊——！嗯…啊啊啊啊啊！」`,
      ); // :7399
      await era.printAndWait(
        `${target_name}因为被怪物从后面侵犯而继续发出着悲鸣。`,
      ); // :7400
      await era.printAndWait(`观众一个个都站了起来，沸腾着………`); // :7401
    }
    return 0;
  }

  if (era_flag.selectcom == 27) {
    // :7409-7432 背后位アナル
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(
        `「求、求你…啊咕…饶了我吧…啊啊…嗯…牙啊啊啊啊啊！」`,
      ); // :7412
      await era.print(`${assi_name}一边听着${target_name}的悲鸣。一边用`); // :7413
      if (era0(`talent:${assi}:121`) == 1 || era0(`talent:${assi}:122`) == 1) {
        await era.print(`阴茎`); // :7415
      }
      if (
        era0(`talent:${assi}:121`) != 1 &&
        era0(`talent:${assi}:122`) != 1 &&
        era0('item:PBAND') == 1
      ) {
        await era.print(`假阴茎`); // :7417
      }
      await era.printAndWait(`一般毫不留情的继续蹂躏着${target_name}的肛门。`); // :7418
      await era.printAndWait(`随着${target_name}发出悲鸣，观众沸腾了起来………`); // :7419
    } else if (game.train.死斗场敌种 == 206) {
      // :7421-7425 巨魔
      await era.printAndWait(
        `「嗯…呜咕…呜…停、停下…要…要死了…咕啊…啊嘎啊啊啊啊！」`,
      ); // :7422
      await era.printAndWait(
        `可怜的${target_name}一边发出癞蛤蟆被弄死一样的声音一边用肛门接受着巨魔巨大的阴茎。`,
      ); // :7423
      await era.printAndWait(
        `肛门想要被完全破坏了似的扩张着、终于${target_name}开始口吐白沫了。`,
      ); // :7424
      await era.printAndWait(`观众们看着${target_name}这样的身姿、沸腾着………`); // :7425
    } else {
      await era.printAndWait(
        `「肛门要裂开了…快、快停下啊…啊啊…啊…咕…呜呜呜呜呜呜！」`,
      ); // :7427
      await era.printAndWait(
        `${target_name}因为被怪物从后面侵犯着肛门而不停悲鸣着。`,
      ); // :7428
      await era.printAndWait(`观众一个个都站了起来，沸腾着………`); // :7429
    }
    return 0;
  }

  if (era_flag.selectcom == 51) {
    // :7437-7440 媚药史莱姆
    await era.printAndWait(`「啊啊…史莱姆么…嗯…连这种地方都进来了…啊啊！」`); // :7438
    return 0;
  }

  return 0;
}

/**
 * @NTR_KOUJO_K8（:7447-7605）：NTR 口上（P 由调用方传入）。
 * TODO(#239)：待填充。
 * @param {number} p
 */
// eslint-disable-next-line no-unused-vars
async function ntr_koujo_k8(p) {
  stub_line('NTR_KOUJO_K8', 'NTR 口上', '本票分段填充');
  return 0;
}

/** @EXUCUTION_KOUJO_K8（:7606-7622）。TODO(#239)：待填充。 */
async function exucution_koujo_k8() {
  stub_line('EXUCUTION_KOUJO_K8', '处刑口上', '本票分段填充');
}

/** @MUSEUM_KOUJO_K8（:7623-7657）。TODO(#239)：待填充。 */
async function museum_koujo_k8() {
  stub_line('MUSEUM_KOUJO_K8', '博物馆口上', '本票分段填充');
}

/** @BANISHMENT_KOUJO_K8（:7658-7678）。TODO(#239)：待填充。 */
async function banishment_koujo_k8() {
  stub_line('BANISHMENT_KOUJO_K8', '追放口上', '本票分段填充');
}

/** @PUBLIC_EXUCUTION_KOUJO_K8（:7679-7693）。TODO(#239)：待填充。 */
async function public_exucution_koujo_k8() {
  stub_line('PUBLIC_EXUCUTION_KOUJO_K8', '公开处刑口上', '本票分段填充');
}

/** @GROTESQUE_KOUJO_K8（:7694-7720）。TODO(#239)：待填充。 */
async function grotesque_koujo_k8() {
  stub_line('GROTESQUE_KOUJO_K8', '猎奇处刑口上', '本票分段填充');
}

/** @ENTERENEMY_KOUJO_K8（:7721-7734）。TODO(#239)：待填充。 */
async function enterenemy_koujo_k8() {
  stub_line('ENTERENEMY_KOUJO_K8', '迷宫攻略开始口上', '本票分段填充');
}

/** @GOHOUBI_REQUEST_KOUJO_K8（:7735-7779，TARGET = A）。TODO(#239)：待填充。 */
async function gohoubi_request_koujo_k8() {
  stub_line('GOHOUBI_REQUEST_KOUJO_K8', '迎击奖赏要求口上', '本票分段填充');
}

/** @GOHOUBI_AFTER_KOUJO_K8（:7780-7856，TARGET = A）。TODO(#239)：待填充。 */
async function gohoubi_after_koujo_k8() {
  stub_line('GOHOUBI_AFTER_KOUJO_K8', '迎击奖赏口上', '本票分段填充');
}

/** @OSIOKI_KOUJO_K8（:7857-7917，TARGET = A）。TODO(#239)：待填充。 */
async function osioki_koujo_k8() {
  stub_line('OSIOKI_KOUJO_K8', '迎击惩罚口上', '本票分段填充');
}

/**
 * @GOBI_KOUJO_K8（:7918-7953，ARG:0）：语尾口上。TODO(#239)：待填充。
 * @param {number} arg_0 原作 ARG:0
 * @param {(n: number) => number} [rand] RAND:N 随机源
 */
// eslint-disable-next-line no-unused-vars
async function gobi_koujo_k8(arg_0, rand) {
  stub_line('GOBI_KOUJO_K8', '语尾口上', '本票分段填充');
}

module.exports = {
  STUBBED_CALLS,
  kojo_message_com_8,
  dog_kojo_8,
  kojo_message_palamcng_8,
  kojo_message_markcng_8,
  self_kojo_k8,
  dungeon_ryouzyoku_k8,
  dungeon_ryouzyoku_after_k8,
  dungeon_victory_k8,
  dungeon_attack_k8,
  benki_koujo_k8,
  colosseum_kojo_8,
  ntr_koujo_k8,
  exucution_koujo_k8,
  museum_koujo_k8,
  banishment_koujo_k8,
  public_exucution_koujo_k8,
  grotesque_koujo_k8,
  enterenemy_koujo_k8,
  gohoubi_request_koujo_k8,
  gohoubi_after_koujo_k8,
  osioki_koujo_k8,
  gobi_koujo_k8,
};
