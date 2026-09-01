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
const {
  kojo_message_com_family,
  self_kojo_family,
} = require('#/kojo/kojo-system');
const { heart } = require('#/kojo/kojo-text');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { chara_callname } = require('#/utils/callname-utils');
const { stub_line } = require('#/utils/stub-line');

/** 读未声明的序号返回 undefined 而非 0（#13），TALENT/MARK/BASE/TEQUIP 一律 || 0 兜底 */
const era0 = (k) => era.get(k) || 0;

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。骨架阶段：51 个 SELECTCOM 分支合用
 * 'KOJO_MESSAGE_COM_8' 一个占位名，各非调教函数各占一名，随填充逐条划掉。
 */
const STUBBED_CALLS = [
  'KOJO_MESSAGE_COM_8',
  'DOG_KOJO_8',
  'KOJO_MESSAGE_PALAMCNG_8',
  'KOJO_MESSAGE_MARKCNG_8',
  'SELF_KOJO_K8',
  'DUNGEON_RYOUZYOKU_K8',
  'DUNGEON_RYOUZYOKU_AFTER_K8',
  'DUNGEON_VICTORY_K8',
  'DUNGEON_ATTACK_K8',
  'BENKI_KOUJO_K8',
  'COLOSSEUM_KOJO_8',
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

  const selectcom_ids = [
    21, 22, 23, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 40, 41, 42, 43,
    44, 45, 46, 55, 56, 69, 80, 87, 123, 124, 125, 126, 127,
  ];
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
  } else if (selectcom_ids.includes(era_flag.selectcom)) {
    // TODO(#239)：分支内容按源码顺序分段填充，此前占位
    stub_line(
      'KOJO_MESSAGE_COM_8',
      `指令 ${era_flag.selectcom} 的口上`,
      '本票分段填充',
    );
  }
  return 0;
}

// 注册进分发族（TRYCALLFORM KOJO_MESSAGE_COM_8 的等价物；重复注册抛错）
kojo_message_com_family.register(8, kojo_message_com_8);

/**
 * @DOG_KOJO_8（:5446-6245）：兽奸 PLAY 的专用口上（头部守卫 TEQUIP:89 岔入）。
 * TODO(#239)：13 个 SELECTCOM 分支待填充。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0
 */
// eslint-disable-next-line no-unused-vars
async function dog_kojo_8(rand) {
  stub_line('DOG_KOJO_8', '兽奸专用口上', '本票分段填充');
  return 0;
}

/**
 * @KOJO_MESSAGE_PALAMCNG_8（:6250-6563）：参数变动口上。
 * TODO(#239)：待填充。
 */
// eslint-disable-next-line no-unused-vars
async function kojo_message_palamcng_8(rand) {
  stub_line('KOJO_MESSAGE_PALAMCNG_8', '参数变动口上', '本票分段填充');
  return 0;
}

/**
 * @KOJO_MESSAGE_MARKCNG_8（:6568-6648）：刻印取得口上。
 * TODO(#239)：待填充。
 */
// eslint-disable-next-line no-unused-vars
async function kojo_message_markcng_8(rand) {
  stub_line('KOJO_MESSAGE_MARKCNG_8', '刻印取得口上', '本票分段填充');
  return 0;
}

/**
 * @SELF_KOJO_K8（:6649-7072）：事件口上（调教后自慰/レズ/朝フェラ等）。
 * TODO(#239)：待填充。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @param {number} [q] 自慰妄想对象（0 主人 / 1 助手 / 2 野狗）
 */
// eslint-disable-next-line no-unused-vars
async function self_kojo_k8(rand, q) {
  stub_line('SELF_KOJO_K8', '事件口上', '本票分段填充');
  return 0;
}

// 注册进分发族（TRYCALLFORM SELF_KOJO_K8 的等价物）
self_kojo_family.register(8, self_kojo_k8);

/** @DUNGEON_RYOUZYOKU_K8（:7073-7092）。TODO(#239)：待填充。 */
async function dungeon_ryouzyoku_k8() {
  stub_line('DUNGEON_RYOUZYOKU_K8', '迷宫凌辱口上', '本票分段填充');
  return 0;
}

/** @DUNGEON_RYOUZYOKU_AFTER_K8（:7093-7145）。TODO(#239)：待填充。 */
async function dungeon_ryouzyoku_after_k8() {
  stub_line('DUNGEON_RYOUZYOKU_AFTER_K8', '迷宫凌辱结算口上', '本票分段填充');
  return 0;
}

/**
 * @DUNGEON_VICTORY_K8（:7146-7170）。TODO(#239)：待填充。
 * @param {(n: number) => number} [rand] RAND:N 随机源
 */
// eslint-disable-next-line no-unused-vars
async function dungeon_victory_k8(rand) {
  stub_line('DUNGEON_VICTORY_K8', '战斗胜利口上', '本票分段填充');
  return 0;
}

/**
 * @DUNGEON_ATTACK_K8（:7171-7198）。TODO(#239)：待填充。
 * @param {(n: number) => number} [rand] RAND:N 随机源
 */
// eslint-disable-next-line no-unused-vars
async function dungeon_attack_k8(rand) {
  stub_line('DUNGEON_ATTACK_K8', '战斗攻击口上', '本票分段填充');
  return 0;
}

/**
 * @BENKI_KOUJO_K8（:7199-7300）：肉便器口上（TARGET = A）。
 * TODO(#239)：待填充。
 * @param {(n: number) => number} [rand] RAND:N 随机源
 */
// eslint-disable-next-line no-unused-vars
async function benki_koujo_k8(rand) {
  stub_line('BENKI_KOUJO_K8', '肉便器口上', '本票分段填充');
  return 0;
}

/**
 * @COLOSSEUM_KOJO_8（:7304-7446）：死斗场专用口上（头部守卫 TEQUIP:55 岔入）。
 * TODO(#239)：待填充。
 */
async function colosseum_kojo_8() {
  stub_line('COLOSSEUM_KOJO_8', '死斗场专用口上', '本票分段填充');
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
