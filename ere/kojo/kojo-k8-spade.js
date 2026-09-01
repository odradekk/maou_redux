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
    0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 19, 20, 21, 22, 23,
    26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 40, 41, 42, 43, 44, 45, 46,
    55, 56, 69, 80, 87, 123, 124, 125, 126, 127,
  ];
  if (selectcom_ids.includes(era_flag.selectcom)) {
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
