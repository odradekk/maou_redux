/* eslint-disable no-irregular-whitespace */
/**
 * @file 银黑桃性格口上 K8：指令口上全量 + 非调教口上（issue #239 全量复核）。
 *
 * == 头部检查（K8 七道，实测；各文件保持自己的顺序） ==
 *
 * kojo_message_com_8 的检查（本文件顺序）：
 *   1. ASSI > 0 && ASSIPLAY（助手调教）→ 跳过；
 *   2. TEQUIP:45 && SELECTCOM != 45（口塞）→ 跳过；
 *   3. TFLAG:899（失神）→ 跳过；
 *   4. TEQUIP:89（兽奸）→ **岔去本文件真身 dog_kojo_8**；
 *   5. TEQUIP:55（死斗场）→ **岔去本文件真身 colosseum_kojo_8**；
 *   6. TALENT:9 == 1（崩坏）→ 跳过；
 *   7. TEQUIP:90（触手）→ 跳过。
 *
 * == 状态机 ==
 *
 * 调教开始/结束口上按 CFLAG:201（0-9）+ CFLAG:370（魔族化 1/2）+ CFLAG:650
 * （NTR 再捕获）推进（主 EVENTTRAIN 与 k8_kojo2 两段）。指令口上
 * 按 SELECTCOM 平铺、每指令一对 CFLAG:301-400 计数器（语义见 chara-kojo.js
 * 门面注释），FLAG:7 == 2 时上限旁路、同支每次出声，== 1 时逐阶段各出一次。
 * 简易助手口上（CFLAG:202/203/204）按 NO:ASSI（20/22/23）分派。
 *
 * == 非调教口上（#209 结论 2：这张工单连带） ==
 *
 * dog_kojo_8（兽奸）与 colosseum_kojo_8（死斗场）由头部检查直调（真身在
 * 本文件）；其余入口各自注册进同名分发族——self_kojo_k8、迷宫四函数
 * （ryouzyoku / ryouzyoku_after / dungeon_victory / dungeon_attack）、
 * benki_koujo_k8、ntr_koujo_k8、结局/处刑六函数（exucution / museum /
 * banishment / public_exucution / grotesque / enterenemy）、迎击奖赏三函数
 * （gohoubi_request / gohoubi_after / osioki，后两个的族在
 * ere/kojo/kojo-dungeon-after.js）、gobi_koujo_k8。族签名随 K1/K3 先例。
 *
 * == 门面（issue #71） ==
 *
 * CFLAG:201/370/650/202/203/204/301-400 一族走 chara(cid).kojo；CFLAG:16/40/41
 * 走 chara(cid).train（初吻对象/着衣状态/上衣类型，跨域已有名）；CFLAG:42
 * 走 chara(cid).chara（特别服装类型）。FLAG:7/108 走 game.kojo（口上开关/
 * 口上存在_8）；FLAG:37/500 走 game.system（着衣系统/狂王性别）；FLAG:62
 * 走 game.train（肉便器行动）；TFLAG:899/13/20/3/400 走 game.train；
 * TFLAG:150/21/22/23/24 走 game.system；TFLAG:16 走 game.event（犬射精或
 * 处刑口上）；TFLAG:500/510/520/530/60 走 game.event。TFLAG:18 不在本文件读：
 * GOHOUBI_AFTER_KOUJO_K8 与 OSIOKI_KOUJO_K8 由族把它当 choice 实参传进来
 * （同 K3）。TALENT/MARK/BASE/TEQUIP 按既有约定
 * 保留裸寻址（gen-facade 只禁 cflag/flag/tflag 字面量）。
 *
 * == 实现状态 ==
 *
 * 全部口上均已实现：头部检查、开局/终局口上（CFLAG:201 状态机）、
 * k8_kojo2、kojo_message_com_8 的 51 个 SELECTCOM 分支、dog_kojo_8、
 * colosseum_kojo_8、PALAMCNG/MARKCNG、self_kojo_k8 与全部非调教函数；
 */

const era = require('#/era-electron');
const { sell_maturo_k0 } = require('#/system/stronghold/sell-maturo');
const { on, TIER } = require('#/system/event/registry');
const era_flag = require('#/era-utils/era-flag');
const { PALAMLV } = require('#/era-utils/palam-level');
const { peek_aftertrain_s } = require('#/event/event-aftertrain');
const {
  kojo_message_com_family,
  kojo_message_palamcng_family,
  kojo_message_markcng_family,
  self_kojo_family,
  dungeon_victory_family,
  dungeon_attack_family,
  benki_koujo_family,
  ntr_koujo_family,
  gobi_koujo_family,
  exucution_koujo_family,
  museum_koujo_family,
  banishment_koujo_family,
  public_exucution_koujo_family,
  grotesque_koujo_family,
  enterenemy_koujo_family,
} = require('#/kojo/kojo-system');
const {
  ryouzyoku_kojo_family,
  ryouzyoku_after_kojo_family,
} = require('#/kojo/kojo-dungeon-ravish');
const {
  gohoubi_request_koujo_family,
  gohoubi_after_koujo_family,
  osioski_koujo_family,
} = require('#/kojo/kojo-dungeon-after');
const { heart } = require('#/kojo/kojo-text');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { chara_callname, chara_name } = require('#/utils/callname-utils');
const { piercing_state } = require('#/system/train/piercing-state');

/** 读未声明的序号返回 undefined 而非 0（#13），TALENT/MARK/BASE/TEQUIP 一律 || 0 保底处理 */
const era0 = (k) => era.get(k) || 0;

// EVENTTRAIN #PRI 档：存在标志 + 总开关补 0
on(
  'EVENTTRAIN',
  () => {
    game.kojo.口上存在_8 = 1; // FLAG:108 = 1（K8 口上存在标志）
    if (game.kojo.口上开关 === 0) {
      game.kojo.口上开关 = 2;
    }
  },
  TIER.PRI,
);

// EVENTEND #LATER 档：调教结束清存在标志
on(
  'EVENTEND',
  () => {
    game.kojo.口上存在_8 = 0;
  },
  TIER.LATER,
);

/**
 * EVENTTRAIN NORMAL 档：调教开始时的口上。
 *
 * 检查：FLAG:7 <= 0 跳过、TALENT:168 != 1 跳过；此后按
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
    // 「TIME == 0 ? 今日 # 今夜」条件文本三元
    const today_or_night = era_flag.time === 0 ? '今日' : '今夜';

    if (game.kojo.口上开关 <= 0) {
      return 0;
    }
    if (era0(`talent:${target}:168`) != 1) {
      return 0;
    }

    // 初調教時 CFLAG:201 == 0
    if (kojo.初调教 == 0) {
      era.drawLine();
      if (era0(`talent:${target}:314`) == 9) {
        await era.printAndWait(
          `${target_name}在被${player_name}调教之前，被魔族改造了。成为了魔族中的忍者...魔忍了。`,
        );
        await era.printAndWait(
          `${target_name}青色的肌肤映照着银发非常的美丽。真想就这样压倒做一些乱七八糟想做的事。`,
        );
        await era.printAndWait(`「让我做这开玩笑一样的事情…咕…离我远点！」`);
        await era.printAndWait(
          `${target_name}通红的恶魔眼睛怒目而视着，感觉非常可爱。`,
        );
        await era.printAndWait(
          `因为变成魔族的原因，${target_name}是无法从${player_name}身边逃开的………`,
        );
        kojo.初调教 = 1; // CFLAG:201 = 1
        kojo.魔族化 = 1; // CFLAG:370 = 1（魔族スイッチ１）
      } else {
        await era.printAndWait(
          `${target_name}在调教房间的床上盘腿坐着。很无聊的打着哈欠朝着一个地方看，好像在等些什么。`,
        );
        await era.printAndWait(
          `然后，把那美丽的银发拨到后面盯着${player_name}。`,
        );
        await era.printAndWait(
          `「哎呀…真想不到居然把我捉住了呢。首先把恬不知耻的你的头给割下来…然后顺便救出其他的女孩子………」`,
        );
        await era.printAndWait(
          `「…啊…嗯？…使不出力气了…忍术也用不了…怎么可能！」`,
        );
        await era.printAndWait(
          `这是理所当然的，这个调教房间为了让勇士的力量无法使用，用奇怪的法术张开了特殊的结界。`,
        );
        await era.printAndWait(
          `${player_name}默默的笑着把${target_name}压倒了。`,
        );
        await era.printAndWait(
          `「在这个状态下会被做些什么我已经知道了…不过不管你干什么，我是绝对不会屈服的」`,
        );
        await era.printAndWait(`（唔…早知道这样应该接受女忍的训练的！）`);
        kojo.初调教 = 1; // CFLAG:201 = 1
      }
      return 1;

      // 魔族化（１回のみ）初回調教後魔族化、陥落前
    } else if (
      kojo.初调教 < 5 &&
      kojo.魔族化 == 0 &&
      era0(`talent:${target}:314`) == 9 &&
      era0(`talent:${target}:85`) == 0 &&
      era0(`talent:${target}:76`) == 0
    ) {
      await era.printAndWait(
        `${target_name}经${player_name}之手改造成了魔族。成为魔族的忍者…魔忍了。`,
      );
      await era.printAndWait(
        `${target_name}青色的肌肤映照着银发非常的美丽。真想就这样压倒做一些乱七八糟想做的事。`,
      );
      await era.printAndWait(`「咕…嗯…做了这样的事情…想要我吗…？」`);
      await era.printAndWait(`${target_name}通红的魔族眼睛哭泣着。`);
      await era.printAndWait(
        `变成了这么肮脏的魔族…狂王大人也会抛弃我吧…啊啊………」`,
      );
      await era.printAndWait(`${target_name}发出了叹息、然后留下了一滴眼泪………`);
      kojo.魔族化 = 2; // CFLAG:370 = 2（魔族スイッチ２）
      return 1;

      // NTR再捕獲
    } else if (kojo.初调教 >= 1 && kojo.NTR再捕获 == 1) {
      if (era0(`talent:${target}:85`) || era0(`talent:${target}:76`)) {
        era.drawLine();
        await era.printAndWait(
          `「啊、好久不见………不处刑我证明你觉得我还有利用价值？」`,
        );
        await era.printAndWait(
          `${target_name}被反手捆绑正坐着。${target_name}好像很习惯似的一脸平静让人看不出情绪。`,
        );
        await era.printAndWait(
          `「难道说…看到我和狂王大人被其他的男人抱着，稍微受到了点打击吗？」`,
        );
        await era.printAndWait(
          `${target_name}嘲笑似的歪着嘴唇、没被提问也滔滔不绝开始讲起来了。`,
        );
        await era.printAndWait(
          `「啊啊、比你抱起来舒服得多了啊，果然还是被很多人一起抱更爽」`,
        );
        await era.printAndWait(
          `「被狂王大人抱着无数次的绝顶是到目前为止的经验中最棒的一个」`,
        );
        await era.printAndWait(
          `「在那个城里全身沾满了爱液和精液不停被轮奸的时候简直就像做梦…一样…呢………」`,
        );
        await era.printAndWait(
          `${target_name}的声音渐渐变成了哭腔、额头垂到了地板上。`,
        );
        await era.printAndWait(
          `「对不起…对不起…不要把我扔掉…不要把我扔掉………」`,
        );
        kojo.NTR再捕获 = 0; // （NTRスイッチ解除）
      } else {
        era.drawLine();
        await era.printAndWait(
          `${target_name}被反手捆绑正坐着。用吃了苦瓜一样的表情看着${player_name}。`,
        );
        await era.printAndWait(
          `「咕…第二次你被捉住了呢…这种屈辱已经无法忍受了…杀了我吧！」`,
        );
        await era.printAndWait(
          `「………什么？这次要把我调教成完全属于你的东西？…怎么会有你这样的人！」`,
        );
        await era.printAndWait(
          `给惊讶的${target_name}看了里面有狂王痴态的水晶球，在耳边说着，${target_name}连耳朵都红了。`,
        );
        await era.printAndWait(
          `「这、这又怎么了…我和狂王大人不管做什么…都跟你没有关系吧！」`,
        );
        await era.printAndWait(
          `${player_name}默默的笑着，为了把${target_name}谁回来而将他压倒在了床上………`,
        );
        kojo.NTR再捕获 = 0; // （NTRスイッチ解除）
      }
      return 1;

      // 屈服刻印Lv1
    } else if (kojo.初调教 < 2 && era0(`mark:${target}:2`) == 1) {
      era.drawLine();
      await era.printAndWait(
        `「哼，这样的事情和那个地狱修行相比，什么也不算」`,
      );
      await era.printAndWait(
        `${target_name}虽然在之前的调教中被做了屈辱的事情，不过还是一脸冷静的和${player_name}说着话。`,
      );
      await era.printAndWait(`「那么，接下来要做什么呢？」`);
      kojo.初调教 = 2; // CFLAG:201 = 2
      return 1;

      // 屈服刻印Lv2
    } else if (kojo.初调教 < 3 && era0(`mark:${target}:2`) == 2) {
      era.drawLine();
      await era.printAndWait(
        `「你也给我适可而止吧，你这种这样的调教什么的对我来说就像是微风一样」`,
      );
      await era.printAndWait(
        `${target_name}把手臂挽在一起显示着自己的从容，然而${player_name}没有看漏她的肩膀微妙的颤抖着。`,
      );
      await era.printAndWait(`${target_name}发现你含着笑容，马上移开了视线。`);
      await era.printAndWait(`「哼，快开始你那温吞的调教吧」`);
      kojo.初调教 = 3; // CFLAG:201 = 3
      return 1;

      // 屈服刻印Lv3
    } else if (
      kojo.初调教 < 4 &&
      era0(`mark:${target}:2`) == 3 &&
      era0(`talent:${target}:85`) == 0
    ) {
      era.drawLine();
      await era.printAndWait(
        `${player_name}在来房间的时候${target_name}一边用手擦拭眼角一边站了起来。`,
      );
      await era.printAndWait(
        `「突、突然干什么啊，抱我？ 是啊…到这个地方来的理由只能是那个啊」`,
      );
      await era.printAndWait(`「随你怎么做吧，你的做法我也习惯了………」`);
      await era.printAndWait(
        `然后${target_name}用自然的动作靠近了${player_name}刷的转动手和头，在${player_name}的耳边轻声说`,
      );
      await era.printAndWait(
        `「呵呵呵、这么轻松被抱住也太大意了？…啊！什么啊…啊嗯！」`,
      );
      await era.printAndWait(
        `${player_name}开玩笑似得绊倒了${target_name}推倒在床上，调教开始了………`,
      );
      kojo.初调教 = 4; // CFLAG:201 = 4
      return 1;

      // 淫乱
    } else if (
      kojo.初调教 < 5 &&
      era0(`talent:${target}:85`) == 0 &&
      era0(`talent:${target}:76`) == 1 &&
      era0(`talent:${target}:314`) != 9
    ) {
      era.drawLine();
      await era.printAndWait(
        `「嗯啊…啊、终于来了吗…呐…快点抱我，再不被你抱的话就要变得奇怪了………」`,
      );
      await era.printAndWait(
        `${target_name}黑色湿润的瞳孔染上了淫荡的颜色。这个忍者终于忍受不住自己身体的欲望了。`,
      );
      await era.printAndWait(
        `「胸…再摸摸…啊~啊…虽然不是特别大…嗯、非常的有感觉…啊~啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}被${player_name}抱在怀中、身体里面就那样体会着快乐。`,
      );
      await era.printAndWait(
        `「啊…果然应该完成女忍的训练的…然后就可以跟你做更舒服的事了………」`,
      );
      if (era0(`talent:${target}:0`) == 1) {
        await era.printAndWait(
          `然后${target_name}从${player_name}的怀中离开，坐在了床上。${target_name}双腿打开，手抚摸着股间，散发着一股淫靡的感觉。`,
        );
        await era.printAndWait(`「不过托她的福我还是处女哦${heart(1)}」`);
        await era.printAndWait(`「所以快点…给我你的那个东西${heart(1)}」`);
      } else {
        await era.printAndWait(
          `然后${target_name}从${player_name}的怀中离开，坐在了床上${target_name}双腿打开，手抚摸着股间，散发着一股淫靡的感觉。。`,
        );
        await era.printAndWait(
          `「呵呵呵，真相把你的阴茎…啊啊…更多的插进我的小穴里！」`,
        );
        await era.printAndWait(
          `${target_name}舍弃了忍者冷静的假面，向你撒着娇。`,
        );
        await era.printAndWait(
          `「啊啊，请把你那出色的东西赐给牝奴隶的我吧………${heart(1)}」`,
        );
      }
      kojo.初调教 = 5; // CFLAG:201 = 5
      return 1;

      // 淫乱+魔族化
    } else if (
      era0(`talent:${target}:314`) == 9 &&
      kojo.初调教 < 6 &&
      era0(`talent:${target}:85`) == 0 &&
      era0(`talent:${target}:76`) == 1
    ) {
      era.drawLine();

      if (kojo.魔族化 == 1) {
        // 調教前から魔族
        await era.printAndWait(
          `「啊…已经无法离开你了…更多…让我更多的舒服吧…${heart(1)}」`,
        );
        await era.printAndWait(
          `无数次的调教让${target_name}输给了自己的肉欲。${target_name}的魔族的黄色双眼中沉淀着情欲、脑袋中全是些淫乱的妄想。`,
        );
        await era.printAndWait(`「来爱抚我敏感的胸部…吮吸到留下吻痕吧…」`);
        await era.printAndWait(
          `「我…我想被你侵犯…啊啊…在这个青色的小穴和肛门…期待着你的精液灌注${heart(1)}`,
        );
        await era.printAndWait(`${target_name}在床上慢慢的分开了双腿。`);
        if (era0(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「呐！…现在就把我的纯洁夺走…把阴茎插进来…啊啊…做了那么羞耻的事情要是还不被侵犯的话…干脆咬舌头死了算了………」`,
          );
          await era.printAndWait(
            `${target_name}一副快要哭出来的样子一边用手指撑开了蜜裂。爱液溢出的淫乱的香味在不断的漂浮着。`,
          );
          await era.printAndWait(
            `「所以、呐…拜托了、让可悲的母魔族变成你的东西…”魔王大人”${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「快点…来…在我的肚子里装满你的精液之前一直侵犯我${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一副快要哭出来的样子一边用手指撑开了蜜裂。爱液溢出的淫乱的香味在不断的漂浮着。`,
          );
          await era.printAndWait(
            `「啊啊…请给母魔族奴隶的我…你那出色的东西………${heart(1)}」`,
          );
        }
        kojo.初调教 = 6; // CFLAG:201 = 6
        return 1;
      } else if (kojo.魔族化 == 2) {
        // 初回調教後に魔族
        await era.printAndWait(
          `「啊…我已经…不被你抱着…就会不正常了…呐…抱我…我和小穴都要…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边下流的舔着嘴唇一边撒娇的抱了过来`,
        );
        await era.printAndWait(`「来爱抚我敏感的胸部…吮吸到留下吻痕吧…」`);
        await era.printAndWait(
          `${target_name}的手划过${player_name}的身体。好像舔着身体一样的触感让${player_name}打了一个冷战。`,
        );
        await era.printAndWait(
          `「啊啊…在这个青色的小穴和肛门里…期待着你的精液灌注${heart(1)}`,
        );
        await era.printAndWait(
          `然后${target_name}抓着${player_name}的手伸向了自己的蜜裂。`,
        );
        if (era0(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「呐！…现在就把我的纯洁夺走…把阴茎插进来…啊啊…做了那么羞耻的事情要是还不被侵犯的话…干脆咬舌头死了算了………」`,
          );
          await era.printAndWait(
            `${target_name}一副快要哭出来的样子一边被${player_name}的手指轻抚着，爱液溢出的淫乱的香味在不断的漂浮着。`,
          );
          await era.printAndWait(
            `「所以、呐…拜托了、让可悲的母魔族变成你的东西…”魔王大人”${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `在我的肚子里装满你的精液之前一直侵犯我${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}为了让${player_name}的手指插进而自己撑开了蜜裂，爱液溢出的淫乱的香味在不断的漂浮着`,
          );
          await era.printAndWait(
            `「啊啊…请给母魔族奴隶的我…你那出色的东西………${heart(1)}」`,
          );
        }
        kojo.初调教 = 6; // CFLAG:201 = 6
        return 1;
      } else {
        // 陥落後に魔族
        await era.printAndWait(
          `经${player_name}之手被改造，变成了魔族的${target_name}一脸陶醉，坐在床上。`,
        );
        await era.printAndWait(
          `「我好开心、这个身体的话可以和你一直sex几小时也好…嗯、一整夜也好，几天也好都可以了。…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}站起来用紫色的舌头舔着嘴唇一边靠近。能清楚看出，那紫色的皮肤因为发情而红润。`,
        );
        await era.printAndWait(
          `「呐，做吧…抱我到会坏掉的程度…弄的乱七八糟的…呐？呐？」`,
        );
        await era.printAndWait(
          `${target_name}抱住${player_name}不停的亲吻着脖子祈求着………`,
        );
        kojo.初调教 = 6; // CFLAG:201 = 6
        return 1;
      }

      // 爱慕
    } else if (
      kojo.初调教 < 7 &&
      era0(`talent:${target}:85`) == 1 &&
      era0(`talent:${target}:314`) != 9 &&
      era0(`talent:${target}:76`) == 0
    ) {
      era.drawLine();
      await era.printAndWait(`${target_name}一脸神圣，单膝跪地，等待着你。`);
      await era.printAndWait(
        `${player_name}快被这个气氛彻底吞没，突然${target_name}说起了话。`,
      );
      await era.printAndWait(
        `「呐、差不多该考虑考虑怎么称呼“你”了。这样吧……主君、夫君大人、馆主大人、魔王大人」`,
      );
      await era.printAndWait(`「………哪个好呢？…你希望我用哪个称呼你？」`);
      await era.printAndWait(
        `${player_name}一副惊讶的表情对${target_name}带着一副受不了了似的表情说道。`,
      );
      await era.printAndWait(
        `「诶~、还不明白吗…简单的说就是，我希望你成为的新主人」`,
      );
      await era.printAndWait(`「不相信我的话…在你想通之前继续调教我就好了」`);
      if (era0(`talent:${target}:0`) == 1) {
        await era.printAndWait(`${target_name}放松着嘴角，微微的笑了`);
        await era.printAndWait(`「那么、作为服从你的证明，把处女也可以哦」`);
        await era.printAndWait(
          `「…怎么了这个表情？…啊啊、我可是没有受过女忍的训练的，还是处女哦。所以」`,
        );
        await era.printAndWait(`「请温柔一点…」`);
      } else {
        await era.printAndWait(`「嘛，今天就是这么打算的吧」`);
        await era.printAndWait(`${target_name}放松着嘴角，微微的笑了………`);
      }
      kojo.初调教 = 7; // CFLAG:201 = 7
      return 1;

      // 爱慕+魔族化
    } else if (
      era0(`talent:${target}:314`) == 9 &&
      kojo.初调教 < 8 &&
      era0(`talent:${target}:85`) == 1 &&
      era0(`talent:${target}:76`) == 0
    ) {
      era.drawLine();

      if (kojo.魔族化 == 1) {
        // 調教前から魔族
        // 同一行输出：SIF 的 PRINT 无后缀，与下一行 PRINTFORMW 同属一行（#622）。
        // 条件提到语句外当条件、文本留在输出语句里
        await era.printAndWait(
          (chara(target).train.着衣状态 == 0 ? `全裸的` : '') +
            `${target_name}单膝跪地，好像是在等待着${player_name}。`,
        );
        await era.printAndWait(`然后${target_name}战战兢兢的开口了。`);
        await era.printAndWait(
          `「我…我已经…把你认作主君了…魔王大人。所以把我当成是下属…那个…正式的…承认…一下吧…」`,
        );
        await era.printAndWait(
          `一边瞟视这里一边用战战兢兢的语调说这话的，好像不是平时刚强而充满自信的那个人一样。`,
        );
        await era.printAndWait(
          `「虽说以前被强行变成这幅身体的时候也曾怨恨过、不过现在…对你…啊啊…求你了！如果你不点头的话我马上在这里咬舌自尽！」`,
        );
        await era.printAndWait(
          `「诶…可以么…我可以成为你的东西啊…啊啊…太好了…真的太好了…」`,
        );
        await era.printAndWait(
          `${target_name}看到${player_name}点着头，终于彻底安心了一样松了一口气。`,
        );
        if (era0(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「那么…作为我主君的证明，把我的处女拿走吧…♪」`,
          );
          await era.printAndWait(
            `${target_name}的紫色舌头舔着嘴唇，着灼热的吐息`,
          );
          await era.printAndWait(
            `「呵呵呵，这是我的一族的规矩啊…要为奉上处女的人献出一生………骗你的。」`,
          );
          await era.printAndWait(
            `一边说着${target_name}一边可爱的吐了吐舌头………`,
          );
        } else {
          await era.printAndWait(
            `「啊…今天为了纪念我成为你的东西，会好好奉仕你的…♪」`,
          );
          await era.printAndWait(
            `${target_name}是太兴奋了吗，紫色的舌头下流的舔着嘴唇。`,
          );
          await era.printAndWait(
            `「我是竭尽全力做事的类型…好好期待着吧…${heart(1)}」`,
          );
        }
        kojo.初调教 = 8; // CFLAG:201 = 8
        return 1;
      } else if (kojo.魔族化 == 2) {
        // 調教後に魔族
        // 与上一段同型（#622）
        await era.printAndWait(
          (chara(target).train.着衣状态 == 0 ? `全裸的` : '') +
            `${target_name}单膝跪地，好像是在等待着${player_name}。`,
        );
        await era.printAndWait(`然后${target_name}战战兢兢的开口了。`);
        await era.printAndWait(
          `「我…我已经…把你认作主君了…魔王大人。所以把我当成是下属…那个…正式的…承认…一下吧…」`,
        );
        await era.printAndWait(
          `一边瞟视这里一边用战战兢兢的语调说这话的，好像不是平时刚强而充满自信的那个人一样`,
        );
        await era.printAndWait(
          `「我变成魔族之后已经…你…你的…啊啊…拜托了！如果你不答应的话我马上在这里咬舌自尽！」`,
        );
        await era.printAndWait(
          `「诶…可以么…我成为你的…魔王大人东西真的可以么…啊啊…太好了…真的太好了…」`,
        );
        await era.printAndWait(
          `${target_name}看到${player_name}点着头，终于彻底安心了一样松了一口气。`,
        );
        if (era0(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「那么…作为我主君的证明，把我的处女拿走吧…♪」`,
          );
          await era.printAndWait(
            `${target_name}的紫色舌头舔着嘴唇，着灼热的吐息`,
          );
          await era.printAndWait(
            `「呵呵呵，这是我的一族的规矩啊…要为奉上处女的人献出一生………骗你的。」`,
          );
          await era.printAndWait(
            `一边说着${target_name}一边可爱的吐了吐舌头………`,
          );
        } else {
          await era.printAndWait(
            `「啊…今天为了纪念我成为你的东西，会好好奉仕你的…♪」`,
          );
          await era.printAndWait(
            `${target_name}太兴奋了吗，紫色的舌头下流的舔着嘴唇。`,
          );
          await era.printAndWait(
            `「我是竭尽全力做事的类型…好好期待着吧…${heart(1)}」`,
          );
        }
        kojo.初调教 = 8; // CFLAG:201 = 8
        return 1;
      } else {
        // 陥落後に魔族
        await era.printAndWait(
          `「如果是不久之前的我的话、变成了这个样子的时候肯定会当场自裁吧」`,
        );
        await era.printAndWait(
          `${target_name}进行了多次的改造变成了魔族。魔族那恶魔的肌肤跟她的银发非常合适。`,
        );
        await era.printAndWait(
          `「啊…所以说、我成为你的下属真的好吗…魔王大人${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的魔族那琥珀色的眼睛闪耀着迷人的光辉，淡淡笑了………`,
        );
        kojo.初调教 = 8; // CFLAG:201 = 8
        return 1;
      }

      // 崩坏
    } else if (era0(`talent:${target}:9`) == 1 && kojo.初调教 < 9) {
      era.drawLine();
      await era.printAndWait(`${target_name}的双眼看上去已经没有理智存在了`);
      await era.printAndWait(`进行了过于残酷的调教、精神貌似已经崩坏了。`);
      await era.printAndWait(
        `${target_name}像是坏掉的玩具一样好像在呼唤着谁的名字………`,
      );
      await era.printAndWait(`「哈…呵…啊哈啊…啊哇、哇的大人哈哇大人在哪里」`);
      kojo.初调教 = 9; // CFLAG:201 = 9
      return 1;

      // 崩坏してたら二回目以降へ飛ぶ
    } else if (era0(`talent:${target}:9`) == 1) {
      return k8_kojo2(); // CALL K8_KOJO2

      // 助手の有無をチェック（いない場合は二回目以降へ）
    } else if (era_flag.assi < 0) {
      return k8_kojo2(); // CALL K8_KOJO2

      // 你が男じゃなかったら二回目以降
    } else if (era0('talent:0:122') == 0) {
      // TALENT:MASTER:122（MASTER 恒角色 0）
      return k8_kojo2(); // CALL K8_KOJO2

      // 簡易助手口上：金红桃（NO:ASSI == 20）
    } else if (era_flag.assi == 20) {
      const assi = era_flag.assi;
      const assi_name = chara_callname(assi); // %SAVESTR:ASSI%
      era.drawLine();

      if (kojo.简易助手_0 == 0) {
        if (era0(`talent:${target}:85`) == 1 && kojo.初调教 >= 5) {
          // 既に爱持ちで爱取得時初口上（陥落イベント）が発生済み
          await era.printAndWait(
            `「啊…${assi_name}连队长都变成了魔王大人的仆人什么的………」`,
          );
          await era.printAndWait(
            `看到被${player_name}搂着肩膀的${assi_name}，${target_name}露出了十分惊讶的表情。`,
          );
          await era.printAndWait(
            `「对、对呢、魔王大人把我的${assi_name}变成了自己的东西呢………」`,
          );
          await era.printAndWait(
            `在嘟囔着的${target_name}面前、${player_name}吮吸着${assi_name}的嘴唇。`,
          );
          await era.printAndWait(
            `『嗯~…不要…啾啾…被那个孩子看到了可不好呢…嗯♪』`,
          );
          await era.printAndWait(
            `「唔！太，太狡猾了！我明明也很想和${assi_name}队长接吻！」`,
          );
          await era.printAndWait(
            `冲击性的告白、看来${target_name}喜欢${assi_name}的样子。`,
          );
          await era.printAndWait(
            `『嘛、嘛啊…我明明以为你一直讨厌我呢…原来是这样………』`,
          );
          await era.printAndWait(
            `「开始本来很讨厌的！但是渐渐的爱上队长了…啊啊！我也爱着魔王大人的呀！我该怎么做才好！」`,
          );
          kojo.简易助手_0 = 2; // CFLAG:202 = 2
        } else if (era0(`talent:${target}:76`) == 1 && kojo.初调教 >= 5) {
          // 既に淫乱持ちで淫乱取得時初口上（陥落イベント）が発生済み
          await era.printAndWait(
            `「啊…没想到连${assi_name}队长也被魔王大人的阴茎攻陷了………多么的美妙！」`,
          );
          await era.printAndWait(
            `看到被${player_name}搂着肩膀的${assi_name}，${target_name}开心的笑了。`,
          );
          await era.printAndWait(
            `「和我最喜欢的${assi_name}队长一起侍奉魔王大人什么的！实在是太幸福了！」`,
          );
          await era.printAndWait(`『嘛、居然说最喜欢我了！？』`);
          await era.printAndWait(
            `「嗯、我最喜欢你了${assi_name}队长${heart(1)}、啊啊、比起那个不如商量一下如何侍奉魔王大人吧」`,
          );
          await era.printAndWait(
            `${target_name}的告白吓到了${assi_name}、但${target_name}的兴趣已经转向了如何三个人一起获得快乐了………`,
          );
          kojo.简易助手_0 = 2; // CFLAG:202 = 2
        } else {
          // それ以外
          await era.printAndWait(
            `「啊、这种事…骗人…骗人…${assi_name}队长怎么可能变成了魔王的走狗…！」`,
          );
          await era.printAndWait(
            `${target_name}看到${assi_name}服侍${player_name}的样子，好像受到了打击。`,
          );
          await era.printAndWait(
            `${player_name}给${assi_name}递了个眼色。然后${assi_name}抱着${target_name}亲了起来。`,
          );
          await era.printAndWait(
            `「啊啊！停、停下来啊…我和${assi_name}队长用这种方式…唔…嗯…呜啊…啊啊………！」`,
          );
          await era.printAndWait(`『哼哼、老实的呆着吧…哼…啾啾…${heart(1)}』`);
          await era.printAndWait(
            `那个酷酷的女忍者一边翻着白眼一边被${assi_name}亲着。嘴唇分开后${target_name}空虚的瞳孔中洒下了眼泪………`,
          );
          if (chara(target).train.初吻对象 == -1) {
            // 初吻
            chara(target).train.初吻对象 = 1; // CFLAG:TARGET:16 = 1
            chara(target).train.初吻对象名 = assi_name; // CSTR:TARGET:4 = %SAVESTR:ASSI%
            await era.printAndWait(`看来是${target_name}的初吻………`);
          }
          kojo.简易助手_0 = 1; // CFLAG:202 = 1
        }
        return 1;

        // 二回目以降（爱/淫乱持ち）
      } else if (
        // `CFLAG:202 == 1 && FLAG:7 == 2 && TALENT:85 == 1 || TALENT:76 == 1`
        // 同层混写：旧引擎的 && 与 || 同优先级、左结合，读作
        // `(三项 && ) || 淫乱`——`||` 之后没有 `&&`，两种读法同值（#517）。
        // 本文件另两处同形（202/203/204 三阶）。
        (kojo.简易助手_0 == 1 &&
          game.kojo.口上开关 == 2 &&
          era0(`talent:${target}:85`) == 1) ||
        era0(`talent:${target}:76`) == 1
      ) {
        if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「啊、队、队长…对、对不起…」`);
          await era.printAndWait(`『有什么要对我道歉的？』`);
          await era.printAndWait(
            `「因为我对魔王大人…那个、主君…喜欢上了…所以………」`,
          );
          await era.printAndWait(`『你还喜欢着我吗？』`);
          await era.printAndWait(`「！、是、是的、最喜欢了！最爱了！」`);
          await era.printAndWait(
            `『所以什么问题也不会有吧？ 一起来侍奉魔王大人吧？』`,
          );
          await era.printAndWait(`「是！是的！我会努力的！」`);
          await era.printAndWait(
            `看来${target_name}和${assi_name}建筑了新的关系………`,
          );
          kojo.简易助手_0 = 2; // CFLAG:202 = 2
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「啊哈、队长…和我接吻吧…接吻${heart(1)}」`);
          await era.printAndWait(
            `『被魔王调教了以后、变得特别可爱呢、${target_name}』`,
          );
          await era.printAndWait(
            `看着沉溺于淫荡的${target_name}样子、${assi_name}轻轻的笑了。`,
          );
          await era.printAndWait(
            `「队长讨厌我吗？ 我可是最喜欢队长的…所以快来接吻吧${heart(1)}」`,
          );
          await era.printAndWait(
            `『哼哼、来这里、我和魔王大人会好好地疼爱你的${heart(1)}』`,
          );
          kojo.简易助手_0 = 2; // CFLAG:202 = 2
        }
        return 1;

        // 二回目以降（三人関係成立後）
      } else if (kojo.简易助手_0 == 2 && game.kojo.口上开关 == 2) {
        if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「啊啊…魔王大人太过分了…在我眼前…和${assi_name}队长做那样的事情…呜呜呜」`,
          );
          await era.printAndWait(
            `${target_name}在${player_name}前正座着、在她眼前${player_name}和${assi_name}正粘粘糊糊的深吻给她看。`,
          );
          await era.printAndWait(
            `『嗯…嗯啾啾…你就在那里看着我们现在的样子…嗯哼…啾${heart(1)}』`,
          );
          await era.printAndWait(
            `${target_name}因为两人的样子而焦急着、像被淫乱的火焰烘烤着………`,
          );
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「呐${assi_name}队长、和我一起做一些快乐的事情吧…呐${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}坦率的顺从着自己的欲望、一边抱着${assi_name}的身体一边撒娇。`,
          );
          await era.printAndWait(
            `『真是的、还真没想到你是这么喜欢撒娇的孩子呢』`,
          );
          await era.printAndWait(
            `${assi_name}看到${player_name}露出困惑的表情看着${target_name}轻抚着头………`,
          );
        }
        return 1;

        // それ以外
      } else {
        await era.printAndWait(
          `「呐、呐~…这是调教吧？是的话…就把${assi_name}队长的嘴巴的第一次给我吧………」`,
        );
        await era.printAndWait(
          `${target_name}好像因为冲击把之前接吻忘掉了，死皮赖脸的要求着${assi_name}。`,
        );
        await era.printAndWait(`看来${target_name}喜欢${assi_name}。`);
        await era.printAndWait(`『真是没办法的孩子呢…来、把下巴抬起来』`);
        await era.printAndWait(`「呜~…啾…接吻…喜欢………」`);
        return 1;
      }

      // 簡易助手口上：（NO:ASSI == 22）
    } else if (era_flag.assi == 22) {
      const assi = era_flag.assi;
      const assi_name = chara_callname(assi); // %SAVESTR:ASSI%
      era.drawLine();

      if (kojo.简易助手_1 == 0) {
        if (era0(`talent:${target}:85`) == 1 && kojo.初调教 >= 5) {
          await era.printAndWait(
            `「啊啊、你也变成了魔王大人的下仆了啊………并没有生气。因为我也是这样啊」`,
          );
          await era.printAndWait(
            `${target_name}好像很开心的样子和${assi_name}说着话。`,
          );
          await era.printAndWait(
            `「和你一起的话很放心啊、接下来就好好相处吧…欸？比起那种无聊的事还是快点一起侍奉魔王大人吧？」`,
          );
          await era.printAndWait(
            `『是的、我们应做的事就是作为魔王大人的下仆奉献一切啊』`,
          );
          await era.printAndWait(
            `「是啊、那是比什么事都重要的事情${heart(1)}」`,
          );
          kojo.简易助手_1 = 2; // CFLAG:203 = 2
        } else if (era0(`talent:${target}:76`) == 1 && kojo.初调教 >= 5) {
          await era.printAndWait(
            `「你也经魔王大人之手变成这样了吗？啊啊、看着这个表情我就知道${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}和${assi_name}因为想象之外的再会开心的笑了。`,
          );
          await era.printAndWait(
            `「以后就要两个人一起为魔王大人服务了…啊啊、没想到会和你变成这样的关系♪」`,
          );
          await era.printAndWait(
            `『你也变了啊、但是现在的你看起来更棒哦${heart(1)}』`,
          );
          kojo.简易助手_1 = 2; // CFLAG:203 = 2
        } else {
          await era.printAndWait(
            `「你也输了啊…真是的，真吃惊你是怎么当圣灵骑士的」`,
          );
          await era.printAndWait(
            `${target_name}（完全无视自己也输了）用侮蔑的目光看着被作为助手带了过来的${assi_name}。`,
          );
          await era.printAndWait(
            `但是看到${assi_name}寄宿着的淫色的眼神，“呜”的停止了一下呼吸。`,
          );
          await era.printAndWait(
            `「难、难道你…你变成了魔王的下仆了？快、快住手…不要摸我…啊啊！」`,
          );
          await era.printAndWait(
            `『来…一起来愉悦吧♪，没关系的，你也会在魔王大人的拥抱中感受到无上的喜悦的♪』`,
          );
          kojo.简易助手_1 = 1; // CFLAG:203 = 1
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
          );
          await era.printAndWait(`「这、不要说这样的话啊…」`);
          await era.printAndWait(
            `看着${target_name}的羞耻的姿态的${assi_name}非常的愉悦。`,
          );
          await era.printAndWait(
            `『呵呵呵、你也成为了魔王大人的下仆的话，咱们必须要庆祝一下啊』`,
          );
          await era.printAndWait(`「庆祝？你到底想要做什么？」`);
          await era.printAndWait(
            `『是呢、比如说作为纪念而穿环和烧印什么的、各种各样可以做的事情跟山一样多呢』`,
          );
          await era.printAndWait(
            `${assi_name}紧紧握着${target_name}的手快乐的笑了………`,
          );
          kojo.简易助手_1 = 2; // CFLAG:203 = 2
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「呵呵呵、被魔王大人抱真是太棒了、接下来${today_or_night}跟你一起sex也行啊${heart(1)}」`,
          );
          await era.printAndWait(
            `『人类什么的真是马上就会改变的东西啊。你也变成了这么淫乱的女人、原来就算是开玩笑也不会想到呢』`,
          );
          await era.printAndWait(
            `${assi_name}深吸了一口气、重振了精神向${target_name}提出意见。`,
          );
          await era.printAndWait(
            `『呐、接下来一起进行魔王大人侍奉对决怎么样？ 我融化般的奉仕会让魔王大人称赞我的${heart(1)}』`,
          );
          await era.printAndWait(
            `「啊啊、很棒的意见、不过如果这么比的话我可是会获得魔王大人所有的称赞的♪」`,
          );
          kojo.简易助手_1 = 2; // CFLAG:203 = 2
        }
        return 1;
      } else if (kojo.简易助手_1 == 2 && game.kojo.口上开关 == 2) {
        if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「我爱你们两个…${heart(1)}」`);
          await era.printAndWait(
            `『呵呵呵、我先来帮你放松一下♪ 然后由魔王大人吧你…嗯呵呵和』`,
          );
          await era.printAndWait(`「啊嗯！不温柔一点的话可不行！」`);
          await era.printAndWait(
            `${target_name}因为${player_name}和${assi_name}发出了很开心的声音………`,
          );
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「啊…我和${assi_name}、谁的侍奉更好？答不上来的话那就继续侍奉哟…啊嗯…啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `『我这边更好，是吧？不好好回答的话可是很讨厌的呢。』`,
          );
          await era.printAndWait(
            `${target_name}与${assi_name}双方合力缠绕着，爱抚${player_name}全身………`,
          );
        }
        return 1;
      } else {
        await era.printAndWait(`${assi_name}舔着嘴唇推倒了${target_name}。`);
        await era.printAndWait(`「不、不行…你做这种事…啊啊！不、讨厌！」`);
        await era.printAndWait(`『你长得这么漂亮，让人受不了呢♪』`);
        await era.printAndWait(
          `${target_name}在${assi_name}的身体下方笨拙的挣扎着………`,
        );
        return 1;
      }

      // 簡易助手口上：扶她（NO:ASSI == 23，TALENT:ASSI:121 检查）
    } else if (era_flag.assi == 23) {
      const assi = era_flag.assi;
      const assi_name = chara_callname(assi); // %SAVESTR:ASSI%
      if (era0(`talent:${assi}:121`) == 0) {
        return 0;
      }
      era.drawLine();

      if (kojo.简易助手_2 == 0) {
        if (era0(`talent:${target}:85`) == 1 && kojo.初调教 >= 5) {
          await era.printAndWait(
            `「你也成为魔王大人的下仆了呢…同伴增加了真是令人开心。话说回来你的身体居然是这样的、真是没想到」`,
          );
          await era.printAndWait(
            `${target_name}看着扶她阴茎勃起着的${assi_name}的样子、脸颊染成了红色。`,
          );
          await era.printAndWait(
            `「呐、果然魔王大人看见你的身体很兴奋吧？………啊啊、不，不回答也可以」`,
          );
          await era.printAndWait(`『呵呵呵、你实际体验一下就知道了♪』`);
          await era.printAndWait(
            `${target_name}尴尬的摇着手。${assi_name}哭笑着邀请${target_name}上床………`,
          );
          kojo.简易助手_2 = 2; // CFLAG:204 = 2
        } else if (era0(`talent:${target}:76`) == 1 && kojo.初调教 >= 5) {
          await era.printAndWait(
            `「呀、你也经魔王大人之手变成这样了呢…啊啊、你的身体居然是这样的、真是没想到」`,
          );
          await era.printAndWait(
            `${target_name}看着${assi_name}的扶她阴茎勃起的样子、兴奋了起来。`,
          );
          await era.printAndWait(`脸色红润、气息混乱、然后吞了吞口水说说道。`);
          await era.printAndWait(
            `「今天的对手是你啊…好吧、用你的肉棒来不停的侵犯我吧…！」`,
          );
          await era.printAndWait(
            `『你也堕落成那么下流的样子了、魔王大人的调教真是美妙啊♪』`,
          );
          kojo.简易助手_2 = 2; // CFLAG:204 = 2
        } else {
          await era.printAndWait(
            `「你成为魔王的下仆了啊、${assi_name}。难道说是背叛了？」`,
          );
          await era.printAndWait(
            `${target_name}锐利的眼光贯穿了${assi_name}。${assi_name}轻轻的回避着那个视线、取下了腰间的布，展示着已经完全勃起了的扶她肉棒。`,
          );
          await era.printAndWait(
            `「呀！？这，这什么啊、扶她！？…怎、怎么可能…今天是你把我…？」`,
          );
          await era.printAndWait(
            `『是啊、侵犯你也没关系的，魔王大人下了这样的命令${heart(1)}』`,
          );
          await era.printAndWait(
            `${assi_name}露出了冷笑的点着头，把${target_name}推倒了………`,
          );
          kojo.简易助手_2 = 1; // CFLAG:204 = 1
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
          );
          await era.printAndWait(`『是么、所以是因为魔王大人的命令才抱我？』`);
          await era.printAndWait(
            `「当然不是、啊啊、在魔王大人的面前抱你什么的…会变得奇怪的${heart(1)}」`,
          );
          await era.printAndWait(
            `你明明还什么命令都没下，${target_name}因为想象自己抱着${assi_name}而发情了………`,
          );
          kojo.简易助手_2 = 2; // CFLAG:204 = 2
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「嗯哼…来侵犯我的吗？好啊…侵犯我吧…把我弄的乱七八糟${heart(1)}」`,
          );
          await era.printAndWait(
            `『在这个情况下停止的话好像会很糟、魔王大人、怎么做呢？』`,
          );
          await era.printAndWait(
            `看着伸展着四肢请求着的${target_name}，${assi_name}叹息着。`,
          );
          await era.printAndWait(
            `「还商量什么呢？我的小穴${heart(1)} ，屁股小穴${heart(1)} 都准备好了啊${heart(1)}」`,
          );
          kojo.简易助手_2 = 2; // CFLAG:204 = 2
        }
        return 1;
      } else if (kojo.简易助手_2 == 2 && game.kojo.口上开关 == 2) {
        if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「那么、今天是哪个来疼爱我呢？${assi_name}？还是你？」`,
          );
          await era.printAndWait(
            `「啊啊、干脆的两个人一起来也没关系哦…${heart(1)}」`,
          );
          await era.printAndWait(
            `『都说到这种程度的话、魔王大人和我两根一起插你！』`,
          );
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「哈啊哈啊…一想到你们两个侵犯我的话…我的胸里面就好像充满了什么东西${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}因为欲望和兴奋耳朵都红了、摇动着臀部诱惑着${player_name}和${assi_name}。`,
          );
          await era.printAndWait(
            `『感觉真是下流啊、已经比起忍者不如说只是母猪了！』`,
          );
        }
        return 1;
      } else {
        await era.printAndWait(
          `「啊啊…没想到你还有这种兴趣…看在以前是伙伴的面上手下留情哦…啊！」`,
        );
        await era.printAndWait(`${target_name}被无情的${assi_name}推倒了。`);
        await era.printAndWait(
          `『不行、把你侵犯到屈服，这可是魔王大人的命令♪ 虽说我也很有兴趣啦』`,
        );
        return 1;
      }

      // それ以外（未知助手）→ 二回目以降
    } else {
      return k8_kojo2(); // CALL K8_KOJO2
    }
  },
  TIER.NORMAL,
);

/**
 * k8_kojo2：调教开始口上的二回目以降（崩坏後の逗留分岐、
 * 反抗/屈服刻印各档、淫乱・爱慕の二巡目——含着装分岐与魔族分岐）。
 *
 * @returns {number} 0 或 1（RETURN 值；未来若有调用方读取，保留数值）
 */
async function k8_kojo2() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const rand_n = (n) => Math.floor(Math.random() * n);
  // 「TIME == 0 ? 今日 # 今夜」/「TIME == 0 ? 今日 # 今宵」条件文本三元
  const today_or_night = era_flag.time === 0 ? '今日' : '今夜';
  const today_or_eve = era_flag.time === 0 ? '今日' : '今宵';

  // 崩坏
  if (era0(`talent:${target}:9`) == 1 && game.kojo.口上开关 == 2) {
    era.drawLine();
    await era.printAndWait(`崩坏了的${target_name}喃喃地嘀咕着什么。`);
    await era.printAndWait(`「啊~…哈哇大人…哈哇大人~…快来…快来~」`);
    return 1;

    // 反抗刻印Lv3
  } else if (era0(`mark:${target}:3`) == 3 && game.kojo.口上开关 == 2) {
    era.drawLine();
    await era.printAndWait(`「总有一天…要让你掉进比死还要痛苦的地狱…………」`);
    await era.printAndWait(`${target_name}充满着怒意的眼神盯着你………`);
    return 1;

    // 屈服刻印Lv0
  } else if (era0(`mark:${target}:2`) == 0 && game.kojo.口上开关 == 2) {
    era.drawLine();
    await era.printAndWait(`「接下来要开始调教了么？」`);
    await era.printAndWait(`「嘛、也许能代替按摩吧」`);
    await era.printAndWait(`${target_name}非常轻松的样子………`);
    return 1;

    // 屈服刻印Lv1
  } else if (era0(`mark:${target}:2`) == 1 && game.kojo.口上开关 == 2) {
    era.drawLine();
    await era.printAndWait(`「呼哇…你的调教真是让我想打哈欠啊」`);
    await era.printAndWait(`「那种程度的强度真的可以吗？」`);
    await era.printAndWait(`说着那样的话，${target_name}露出了微笑………`);
    return 1;

    // 屈服刻印Lv2
  } else if (era0(`mark:${target}:2`) == 2 && game.kojo.口上开关 == 2) {
    era.drawLine();
    await era.printAndWait(`「嗯…被你摸着，总感觉有点发抖似的感觉………」`);
    await era.printAndWait(`「啊，别误会了、觉得冷而已」`);
    await era.printAndWait(`${target_name}把你当成笨蛋一样，哼了一声………`);
    return 1;

    // 屈服刻印Lv3＋爱/淫乱無し
  } else if (
    era0(`mark:${target}:2`) == 3 &&
    era0(`talent:${target}:85`) == 0 &&
    era0(`talent:${target}:76`) == 0 &&
    game.kojo.口上开关 == 2
  ) {
    era.drawLine();
    await era.printAndWait(`「快、快点抱我………说过吧？只是习惯了」`);
    await era.printAndWait(`「嗯~…啊~…那么温柔…犯规了啊…啊啊」`);
    await era.printAndWait(
      `然后${target_name}被${player_name}慢慢推倒到了床上………`,
    );
    return 1;

    // 淫乱（服分岐 + 魔族分岐）
  } else if (era0(`talent:${target}:76`) == 1 && game.kojo.口上开关 == 2) {
    era.drawLine();

    // 服分岐優先（着衣設定無しの場合は進む）
    if (game.system.着衣系统 != 0) {
      if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 1
      ) {
        // 普段着・スカートタイプ（模板未填写：此装束无台词，保持空输出）
      } else if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 101
      ) {
        // 普段着・ズボンタイプ（模板未填写：此装束无台词，保持空输出）
      } else if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 209
      ) {
        // メイド服
        await era.printAndWait(
          `${target_name}的女仆服有着膝下20cm的裙子，因为里面加入了钢丝，裙子被漂亮的撑了起来。`,
        );
        await era.printAndWait(`「主人、${today_or_eve}的侍奉要怎么样呢？」`);
        // 同一行输出：无后缀 PRINTFORM + PRINTDATA 随机色 + PRINTW 收行（#622）。
        // 随机色夹在中间，不能进 ${} 槽（槽位序只认 %…% 记号），按串接取值
        // PRINTDATA/DATAFORM 白/赤/黒/青/ENDDATA（等概率随机选一）
        await era.printAndWait(
          `${target_name}把裙子卷了起来露出内衣。今日的内衣的颜色是` +
            ['白', '赤', '黑', '青'][rand_n(4)] +
            `的样子。`,
        );
        await era.printAndWait(
          `被卷起来的裙子里面飘出了淫靡的气味。被你看着内衣就很兴奋的样子。`,
        );
        await era.printAndWait(
          `「被你…被主人看着就好像要变的奇怪了${heart(1)}」`,
        );
        return 1;
      } else if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 203
      ) {
        // 妓女のドレス
        await era.printAndWait(
          `${target_name}的妓女的礼服是藏青色的，衣服前面的部分细得只要稍微一动胸部就会露出来。`,
        );
        await era.printAndWait(
          `很在意短裙的${target_name}两腿之间摩擦着非常扭扭捏捏的样子。`,
        );
        await era.printAndWait(
          `「啊啊、穿成这样样子等你的我的心情你明白吗？ 来、看着…啊嗯♪」`,
        );
        await era.printAndWait(
          `${target_name}抓起衣服前面的部分，胸部暴露在外面。乳头好像勃起了的样子。`,
        );
        await era.printAndWait(
          `「呐、拜托了、抱我${heart(1)} 把我弄得乱七八糟吧${heart(1)}」`,
        );
        return 1;
      } else if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 254
      ) {
        // バニースーツ
        await era.printAndWait(
          `${today_or_night}，${target_name}要穿着蓝色的兔女郎服进行侍奉的样子。`,
        );
        await era.printAndWait(
          `被细腻的网格丝袜和高跟鞋覆盖的而显得更为修长的腿部看起来比平时更美丽。`,
        );
        await era.printAndWait(
          `「听说兔子是多产的象征哦、就是说，你想然我怀孕生下很多孩子呢」`,
        );
        await era.printAndWait(
          `${target_name}手放在床上可爱的臀部朝着你左右的晃着。`,
        );
        await era.printAndWait(
          `「你看你看…可爱的小兔子在魔王大人的面前诱惑你哦？ 快点来抓住我吧${heart(1)}」`,
        );
        return 1;
      }
    }

    // 魔族
    if (era0(`talent:${target}:314`) == 9) {
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「啊…快点抱我…用你的阴茎让我屈服吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被${player_name}看着，以前酷酷的女忍者已经完全变成了阴茎狂的淫乱魔族了。`,
        );
        await era.printAndWait(
          `「让我变成这样的不就是你么…来，好好负起责任吧${heart(1)}」`,
        );
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「考虑过一直等待着你的侵犯的我的心情么？」`);
        await era.printAndWait(`「…嘛，没考虑过吧、我知道你非常的冷淡」`);
        await era.printAndWait(
          `「但是没关系的、既然今天选择了我…啊啊…那么更多的侵犯我吧…${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「你要是命令的话我什么都做哦…就连狂王的头也可以哦？」`,
        );
        await era.printAndWait(
          `「………诶？你说那种事情怎么样都好快点把大腿打开？」`,
        );
        await era.printAndWait(
          `「唔嗯…现在就作为你的女奴隶满足你吧…啊啊…快点…侵犯我吧…${heart(1)}」`,
        );
      }
    } else {
      // それ以外
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「啊…快点抱我…用你的阴茎让我屈服吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被${player_name}看着，以前酷酷的女忍者已经完全变成了阴茎狂的淫乱魔族了。`,
        );
        await era.printAndWait(
          `「让我变成这样的不就是你么…来，好好负起责任吧${heart(1)}」`,
        );
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「考虑过一直等待着你的侵犯的我的心情么？」`);
        await era.printAndWait(`「…嘛，没考虑过吧、我知道你非常的冷淡」`);
        await era.printAndWait(
          `「但是没关系的、既然今天选择了我…啊啊…那么更多的侵犯我吧…${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「你要是命令的话我什么都做哦…就连狂王的头也可以哦？」`,
        );
        await era.printAndWait(
          `「………诶？你说那种事情怎么样都好快点把大腿打开？」`,
        );
        await era.printAndWait(
          `「唔嗯…现在就作为你的女奴满足你吧隶…啊啊…快点…侵犯我吧…${heart(1)}」`,
        );
      }
    }
    return 1;

    // 爱慕（服分岐 + 魔族分岐）
  } else if (era0(`talent:${target}:85`) == 1 && game.kojo.口上开关 == 2) {
    era.drawLine();

    // 服分岐優先
    if (game.system.着衣系统 != 0) {
      if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 1
      ) {
        // 普段着・スカートタイプ（模板未填写：此装束无台词，保持空输出）
      } else if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 101
      ) {
        // 普段着・ズボンタイプ（模板未填写：此装束无台词，保持空输出）
      } else if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 209
      ) {
        // メイド服
        await era.printAndWait(
          `「穿、穿好了。果然女仆服什么的不太习惯啊………因为是你的命令所以没办法哟♪」`,
        );
        await era.printAndWait(
          `${target_name}的女仆服有着膝下20cm的裙子，因为里面加入了钢丝，裙子被漂亮的撑了起来。`,
        );
        await era.printAndWait(
          `「虽然听说女仆服是工作服，弄脏也没关系…不过太可爱了不太想弄脏呢…啊嗯」`,
        );
        await era.printAndWait(
          `你抱着${target_name}说着”好啦好啦、很适合你啊”摸着她的头。`,
        );
        await era.printAndWait(
          `「笨、笨蛋…被做这样的事的话，我快忍不住了…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}紧紧的抱着你，闻着你的味道，脸在你的胸前蹭来蹭去………`,
        );
        return 1;
      } else if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 203
      ) {
        // 妓女のドレス
        await era.printAndWait(
          `${target_name}的妓女的礼服是藏青色的，衣服前面的部分细得只要稍微一动胸部就会露出来。`,
        );
        await era.printAndWait(
          `很在意短裙的${target_name}两腿之间摩擦着非常扭扭捏捏的样子。`,
        );
        await era.printAndWait(
          `「这、这么猥琐的衣服让我穿着什么的…${today_or_night}可以好好期待吗？」`,
        );
        await era.printAndWait(
          `${target_name}脸颊染上了红晕，灼热的吐息漏了出来、看着这个样子就知道她已经发情了。`,
        );
        await era.printAndWait(
          `「呐、看见我这样兴奋的话，就更激烈的抱我${heart(1)}」`,
        );
        return 1;
      } else if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 254
      ) {
        // バニースーツ
        await era.printAndWait(
          `${today_or_night}，${target_name}要穿着蓝色的兔女郎服进行侍奉的样子。`,
        );
        await era.printAndWait(
          `被细腻的网格丝袜和高跟鞋覆盖的而显得更为修长的腿部看起来比平时更美丽。`,
        );
        await era.printAndWait(
          `「我，我是兔子哟pyon☆…呐、呐、这样的打招呼真的不做不行吗？　因为是因为你的命令我才做的」`,
        );
        await era.printAndWait(
          `看着非常羞耻的打招呼，整个脸都红了的${target_name}，你禁不住笑了。`,
        );
        await era.printAndWait(
          `「那么主人、给兔子想要H的命令pyon☆　果然太羞耻了，不行了！」`,
        );
        return 1;
      }
    }

    // 魔族
    if (era0(`talent:${target}:314`) == 9) {
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「你要是命令的话我什么都做哦…就连狂王的头也可以哦？」`,
        );
        await era.printAndWait(
          `「………诶？你说那种事情怎么样都好快点把大腿打开？」`,
        );
        await era.printAndWait(`「啊啊…我就这样被抱着…好开心………♪」`);
        await era.printAndWait(
          `${target_name}莞尔一笑、朝着${player_name}分开了双腿………`,
        );
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「今天也要调教吗？我不是已经完全变成你的所有物了么」`,
        );
        await era.printAndWait(
          `「可以的、忍者把身体交给主君什么的很正常…啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}高兴的笑着，缠上了${player_name}的身体………`,
        );
      } else {
        await era.printAndWait(
          `「啊啊、我爱你呦………呜、不要露出这么害羞的表情啊、连我都觉得害羞了」`,
        );
        await era.printAndWait(`${target_name}红着耳朵稍稍离开了你的身体。`);
        await era.printAndWait(
          `「呵呵呵、那么在你认真之前…还要好好奉仕你呢…${heart(1)}」`,
        );
      }
    } else {
      // それ以外
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「你要是命令的话我什么都做哦…就连狂王的头也可以哦？」`,
        );
        await era.printAndWait(
          `「………诶？你说那种事情怎么样都好快点把大腿打开？」`,
        );
        await era.printAndWait(`「还不信任着我？…是吗…那还真是有点悲伤呢」`);
        await era.printAndWait(
          `${target_name}稍微有点悲伤的笑着、向${player_name}分开了双腿………`,
        );
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「今天也要调教吗？我不是已经完全变成你的所有物了么」`,
        );
        await era.printAndWait(
          `「可以的、忍者把身体交给主君什么的很正常…啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}高兴的笑着，缠上了${player_name}的身体………`,
        );
      } else {
        await era.printAndWait(
          `「啊啊、我爱你呦………呜、不要露出这么害羞的表情啊、连我都觉得害羞了」`,
        );
        await era.printAndWait(`${target_name}红着耳朵稍稍离开了你的身体。`);
        await era.printAndWait(
          `「哼哼哼、那么在你认真之前…还要好好奉仕你呢…${heart(1)}」`,
        );
      }
    }
    return 1;
  }
  return 0;
}

/**
 * EVENTEND NORMAL 档：调教结束时的口上。
 * 检查：FLAG:7、TALENT:168、BASE:0（死亡跳过）。
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

    // 崩坏
    if (era0(`talent:${target}:9`) == 1 && game.kojo.口上开关 == 2) {
      era.drawLine();
      await era.printAndWait(`「想要哈哇大人的……」`);
      await era.printAndWait(`${target_name}朝着奇怪的方向嘟囔着什么………`);
      return 1;

      // 反抗刻印Lv3+爱無
    } else if (
      era0(`mark:${target}:3`) == 3 &&
      era0(`talent:${target}:76`) == 0 &&
      era0(`talent:${target}:85`) == 0
    ) {
      era.drawLine();
      await era.printAndWait(`「………呸」`);
      await era.printAndWait(
        `${target_name}朝着${player_name}的方向吐了口口水………`,
      );
      return 1;

      // 屈服刻印Lv1以下+爱無
    } else if (
      era0(`mark:${target}:2`) <= 1 &&
      era0(`talent:${target}:76`) == 0 &&
      era0(`talent:${target}:85`) == 0
    ) {
      era.drawLine();
      await era.printAndWait(`「唔…啊啊、肩膀的僵硬稍微好点了」`);
      await era.printAndWait(
        `${target_name}说着，对着${player_name}哼了一声………`,
      );
      return 1;

      // 屈服刻印Lv2+爱無
    } else if (
      era0(`mark:${target}:2`) == 2 &&
      era0(`talent:${target}:76`) == 0 &&
      era0(`talent:${target}:85`) == 0
    ) {
      era.drawLine();
      await era.printAndWait(`「哈啊哈啊…啊……真不舒服……咕」`);
      await era.printAndWait(
        `${target_name}的身体被汗濡湿了，露出艳丽的痴态………`,
      );
      return 1;

      // 屈服刻印Lv3+爱無
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      era0(`talent:${target}:76`) == 0 &&
      era0(`talent:${target}:85`) == 0
    ) {
      era.drawLine();
      await era.printAndWait(`「哈啊哈啊…你…意外的那个…温柔呢………啊………」`);
      await era.printAndWait(
        `${target_name}的身体横躺着，发出了炽热的叹息声………`,
      );
      return 1;

      // 淫乱(体力500以上)
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`base:${target}:0`) >= 500
    ) {
      era.drawLine();
      await era.printAndWait(`「啊啊、还不够啊…难道是对我已经厌倦了吗………？」`);
      await era.printAndWait(
        `${target_name}还有余力的样子，在床上画着圈圈闹变扭………`,
      );
      return 1;

      // 淫乱(体力500未満)
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`base:${target}:0`) <= 500
    ) {
      era.drawLine();
      await era.printAndWait(
        `「哈啊哈啊…更多…你的阴茎…啊啊…啊啊…想要${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}筋疲力尽的躺在床上………`);
      return 1;

      // 爱慕(体力500以上)
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`base:${target}:0`) >= 500
    ) {
      era.drawLine();
      await era.printAndWait(
        `「哈啊哈啊…明明…我的身体还可以继续让你随便弄………」`,
      );
      await era.printAndWait(`${target_name}躺在床上………`);
      return 1;

      // 爱慕(体力500未満)
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`base:${target}:0`) <= 500
    ) {
      era.drawLine();
      await era.printAndWait(
        `「啊啊…在我的身体上满足了吗？那样的话真是开心啊…下一次…啊…疼爱我吧………」`,
      );
      await era.printAndWait(`${target_name}筋疲力尽的躺在床上………`);
      return 1;
    }
    return 0;
  },
  TIER.NORMAL,
);

/**
 * kojo_message_com_8：指令执行时的口上。
 *
 * 七道头部检查（本文件顺序，见文件头）之后按 SELECTCOM 平铺，51 个分支
 * 全部实现。
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

  // 助手が調教した時に口上をスキップする
  if (era_flag.assi > 0 && era_flag.assiplay) {
    return 0;
  }
  // 口塞着用時は口上をスキップする
  if (era0(`tequip:${target}:45`) && era_flag.selectcom != 45) {
    return 0;
  }
  // 失神時は口上をスキップする
  if (era0('tflag:899')) {
    return 0;
  }
  // 兽奸PLAY中は専用口上
  if (era0(`tequip:${target}:89`)) {
    await dog_kojo_8(rand); // CALL DOG_KOJO_8
    return 0;
  }
  // 死斗场中は専用口上
  if (era0(`tequip:${target}:55`)) {
    await colosseum_kojo_8(); // CALL COLOSSEUM_KOJO_8
    return 0;
  }
  // 崩坏した場合は口上をスキップする
  if (era0(`talent:${target}:9`) == 1) {
    return 0;
  }
  // 触手調教中は口上をスキップする
  if (era0(`tequip:${target}:90`)) {
    return 0;
  }

  if (era_flag.selectcom == 0) {
    // 爱撫 CFLAG:301
    if (kojo.爱抚 == 0) {
      // 初めて
      if (era0(`mark:${target}:2`) >= 2) {
        await era.printAndWait(`「呵呵呵…就像稍微强一点的按摩一样呢」`);
        await era.printAndWait(`「嗯…啊…啊哈哈…好痒啊」`);
      } else {
        await era.printAndWait(`「真恶心…话说你有好好洗过手吗？」`);
      }
      kojo.爱抚 = 1; // CFLAG:301 = 1
      return 0;
    }
    // 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「再用力点…啊啊${heart(1)}…胸…啊嗯…抓着…啊${heart(1)}」`,
      );
      await era.printAndWait(
        `「啊…欺负人…这么想挑逗我吗？ 啊…啊啊………${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}被${player_name}爱抚着，腰部扭动了起来………`,
      );
      kojo.爱抚 = 6; // CFLAG:301 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.爱抚 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait(`「啊嗯…嗯…继续摸也可以哟…啊啊${heart(1)}」`);
      await era.printAndWait(
        `${target_name}被${player_name}爱抚的发出了可爱的声音。`,
      );
      await era.printAndWait(
        `「我的身体怎么样…啊啊…这双温柔的手…喜欢…${heart(1)}」`,
      );
      kojo.爱抚 = 5; // CFLAG:301 = 5
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      (kojo.爱抚 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 屈服刻印Lv3
      await era.printAndWait(`「哈啊…啊啊…嗯…啊、好舒服…哈啊…啊啊…♪」`);
      await era.printAndWait(
        `${target_name}被${player_name}爱抚的发出了很舒服的声音………`,
      );
      kojo.爱抚 = 4; // CFLAG:301 = 4
    } else if (
      era0(`mark:${target}:2`) == 2 &&
      (kojo.爱抚 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 屈服刻印Lv2
      await era.printAndWait(
        `「哈啊哈啊…你的按摩也开始变得不错起来了…嗯…嗯~」`,
      );
      await era.printAndWait(
        `${target_name}被${player_name}爱抚的发出了忍耐着的声音………`,
      );
      kojo.爱抚 = 3; // CFLAG:301 = 3
    } else if (
      era0(`mark:${target}:2`) <= 1 &&
      (kojo.爱抚 <= 1 || game.kojo.口上开关 == 2)
    ) {
      // それ以外
      await era.printAndWait(`「摸爽了就赶快松手」`);
      await era.printAndWait(
        `${target_name}被${player_name}爱抚着，但是一脸阴沉………`,
      );
      kojo.爱抚 = 2; // CFLAG:301 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 1) {
    // 舔阴 CFLAG:302
    if (kojo.舔阴 == 0) {
      // 初めて
      if (era0(`talent:${target}:0`) == 1) {
        await era.printAndWait(
          `「呵呵呵、知道了吗？我还是处女呢…嗯…嗯…因为是处女所以兴奋了吗、啊啊…那么用力…！」`,
        );
        await era.printAndWait(
          `${player_name}开始舔着${target_name}散发着处女味道的秘裂………`,
        );
      } else {
        await era.printAndWait(`「嗯…啊啊…你也经常舔那些别的女人吧…啊…唔！」`);
      }
      kojo.舔阴 = 1; // CFLAG:302 = 1
      return 0;
    }
    // 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.舔阴 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「呵呵呵、我这么美味吗？那么…嗯…热心的…啊~啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}被${player_name}舔着秘裂、腰淫荡的摇着，手压着${player_name}的头部。`,
      );
      await era.printAndWait(
        `「啊啊…不能逃哦、在我去之前…都要不停地舔…啊啊${heart(1)}」`,
      );
      kojo.舔阴 = 5; // CFLAG:302 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.舔阴 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait(`「啊啊…多舔舔我…啊嗯…嗯…再…深点…啊啊！」`);
      await era.printAndWait(
        `${target_name}被${player_name}舔着秘裂发出了淫荡的声音。`,
      );
      await era.printAndWait(
        `「嗯…嗯嗯！…你的舌头…好舒服啊…啊啊…啊啊${heart(1)}」`,
      );
      kojo.舔阴 = 4; // CFLAG:302 = 4
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      (kojo.舔阴 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 屈服刻印Lv3
      await era.printAndWait(
        `「啊嗯…啊嗯…嗯…唔…啊啊！ 哈啊…啊…变得更舒服了…嗯！」`,
      );
      await era.printAndWait(
        `${target_name}脸颊通红，被${player_name}舔着秘裂，露出了喘息声………`,
      );
      kojo.舔阴 = 3; // CFLAG:302 = 3
    } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外（屈服刻印Lv3未満）
      await era.printAndWait(`「唔…啊啊…唔…呜…！简直跟狗一样的舔法…啊啊！」`);
      await era.printAndWait(
        `${target_name}扭动着腰想要从${player_name}的嘴边逃开、就那样被${player_name}压住了腰………`,
      );
      kojo.舔阴 = 2; // CFLAG:302 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 2) {
    // 阿纳尔爱撫 CFLAG:303
    if (kojo.肛门爱抚 == 0) {
      // 初めて
      if (era0(`abl:${target}:3`) >= 3) {
        await era.printAndWait(`「啊…啊~啊！菊花…嗯…啊哈…好舒服…啊啊…啊啊！」`);
        await era.printAndWait(
          `${target_name}被开发了的肛门因为${player_name}的爱抚，反应很敏感………`,
        );
      } else {
        await era.printAndWait(`「啊…那、那里…很脏…呀…不、不要…啊啊！」`);
        await era.printAndWait(
          `${target_name}因为被${player_name}粗暴的爱抚着肛门而不禁发出了悲鸣………`,
        );
      }
      kojo.肛门爱抚 = 1; // CFLAG:TARGET:303 = 1
      return 0;
    }
    // 二回目以降
    {
      const P = palam(3) + delta(3); // P = PALAM:3 + UP:3
      if (
        era0(`talent:${target}:76`) == 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // 淫乱+润滑Lv2以上
        await era.printAndWait(
          `「啊…啊啊…再摸摸我的肛门吧${heart(1)} 嗯…好舒服${heart(1)}」`,
        );
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「哈啊哈啊…啊啊…更多…更多…侵犯我的菊花吧…啊啊…要发疯了${heart(1)}」`,
          );
        }
        await era.printAndWait(
          `${target_name}被${player_name}爱抚着发出了娇艳的声音………`,
        );
        kojo.肛门爱抚 = 7; // CFLAG:303 = 7
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        P < PALAMLV[2] &&
        (kojo.肛门爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // 淫乱+润滑Lv2未満
        await era.printAndWait(
          `「嗯…啊嗯…不要那么粗暴的对待我的肛门…啊…咕！」`,
        );
        await era.printAndWait(
          `${target_name}的肛门润滑度貌似不足。${target_name}发出了痛苦的声音………`,
        );
        kojo.肛门爱抚 = 6; // CFLAG:303 = 6
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // 爱慕+润滑Lv2以上
        await era.printAndWait(
          `「啊…啊啊…我的肛门…嗯…好舒服…啊…啊啊${heart(1)}」`,
        );
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「哈啊…啊啊…继续${heart(1)} 继续…欺负我的肛门吧${heart(1)}」`,
          );
        }
        await era.printAndWait(
          `${target_name}被${player_name}爱抚着肛门发出了娇艳的声音………`,
        );
        kojo.肛门爱抚 = 5; // CFLAG:303 = 5
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        P < PALAMLV[2] &&
        (kojo.肛门爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // 爱慕+润滑Lv2未満
        await era.printAndWait(
          `「嗯…啊啊…虽、虽然欺负我的肛门也可以…不过再稍微温柔一点啊…啊、嗯！」`,
        );
        await era.printAndWait(
          `${target_name}的肛门润滑度貌似不足。${target_name}发出了痛苦的声音………`,
        );
        kojo.肛门爱抚 = 4; // CFLAG:303 = 4
      } else if (
        P >= PALAMLV[2] &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.肛门爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // 润滑Lv2以上＋A感覚Lv3以上
        await era.printAndWait(
          `「啊啊…嗯…啊…啊…我、我的肛门…啊啊…变的奇怪了…嗯…唔！」`,
        );
        await era.printAndWait(
          `${target_name}的肛门下流的收缩着、${player_name}的爱抚使得她的腰不停的晃动着………`,
        );
        kojo.肛门爱抚 = 3; // CFLAG:303 = 3
      } else if (kojo.肛门爱抚 <= 1 || game.kojo.口上开关 == 2) {
        // それ以外（爱無し、润滑Lv2未満、A感覚Lv3未満）
        await era.printAndWait(`「咕…呜…不、不要…啊啊…不要啊！」`);
        await era.printAndWait(
          `${player_name}爱抚着${target_name}花蕾般的肛门、而${target_name}则用悲鸣来回应………`,
        );
        kojo.肛门爱抚 = 2; // CFLAG:303 = 2
      }
    }
    return 0;
  } else if (era_flag.selectcom == 3) {
    // 自慰 CFLAG:304
    if (kojo.自慰 == 0) {
      // 初めて
      await era.printAndWait(`「哈啊哈啊…啊…啊啊…嗯…哈啊哈啊…啊…嗯！」`);
      await era.printAndWait(
        `${target_name}闭着眼睛自慰着、好像是在想着谁似得………`,
      );
      kojo.自慰 = 1; // CFLAG:TARGET:304 = 1
      return 0;
    }
    // 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`talent:${target}:0`) == 1 &&
      (kojo.自慰 <= 8 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱＋处女
      await era.printAndWait(`「啊…快点让我变成你的东西…啊…啊啊${heart(1)}」`);
      await era.printAndWait(
        `${target_name}还没有尝过男人的秘裂发出了激烈的水流的声音。`,
      );
      await era.printAndWait(
        `「已经那么放松了…已经准备好了哦？　快点品尝味道吧…啊…嗯………${heart(1)}」`,
      );
      kojo.自慰 = 9; // CFLAG:304 = 9
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:31`) >= 3 &&
      (kojo.自慰 <= 7 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱＋自慰中毒Lv3以上（RAND:3 三选一）
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「啊啊…哈啊…啊啊…嗯…自慰好舒服…啊嗯…啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}娇喘着继续自慰、发出着马上就要绝顶了似的水流声`,
        );
        await era.printAndWait(
          `「哈啊哈啊…啊啊…啊啊…去…要去了…啊啊…啊啊~${heart(1)}」`,
        );
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「我、我的…自慰…一直看着…啊啊啊请看着吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}双腿分的很开诱惑着${player_name}十分艳丽的摇着腰部。`,
        );
        await era.printAndWait(
          `「啊啊…嗯…哈啊…啊…啊…${heart(1)} 啊啊…哈啊哈啊…侵犯我吧…${heart(1)}」`,
        );
      } else {
        await era.printAndWait(`「啊…嗯…自慰被看着…啊啊${heart(1)}」`);
        await era.printAndWait(
          `${target_name}黑色的眼睛淫荡的濡湿了、沉迷在自慰中。`,
        );
        await era.printAndWait(
          `「哈啊哈啊…啊…啊…唔…啊啊~${heart(1)} 我…我…要变得…更奇怪了…啊啊${heart(1)}」`,
        );
      }
      kojo.自慰 = 8; // CFLAG:304 = 8
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:31`) < 3 &&
      (kojo.自慰 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱＋自慰中毒Lv3未満（RAND:2 二选一）
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「啊啊…比起这个…更想要你的那个…嗯…嗯嗯${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}这么说着，但是熟练的自慰还在继续………`,
        );
      } else {
        await era.printAndWait(
          `「哈啊哈啊…啊啊…果然自慰好舒服…啊…啊啊${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}发出着激烈的水声继续自慰着………`);
      }
      kojo.自慰 = 7; // CFLAG:304 = 7
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`talent:${target}:0`) == 1 &&
      (kojo.自慰 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋处女
      await era.printAndWait(
        `「啊啊…不要再这样欺负我了…啊…啊啊…啊啊${heart(1)}」`,
      );
      await era.printAndWait(`「明明知道我还是处女，还让我做这种事情…啊啊…」`);
      await era.printAndWait(
        `${target_name}一脸不开心的样子对着${player_name}用手指撑开自己的处女穴自慰着………`,
      );
      kojo.自慰 = 6; // CFLAG:304 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:31`) >= 3 &&
      (kojo.自慰 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋自慰中毒Lv3以上（RAND:3 三选一）
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「哈、啊、啊啊${heart(1)} 嗯…好棒…好棒啊…啊啊…我的自慰…有好好的看着吗？啊、啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}呼出了微热的吐息。有了以前的调教，现在已经完全中毒了的样子。`,
        );
        await era.printAndWait(
          `「嗯…啊啊…我…我…啊啊啊…啊嗯…啊哈…啊啊${heart(1)}」`,
        );
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「嗯…啊啊…啊…唔、啊哈、嗯${heart(1)} 自慰停不下来啊…啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}手指动作渐渐激烈起来、确实的向着自己舒服的地方不断的爱抚着。`,
        );
        await era.printAndWait(
          `「啊啊…我的H的地方…继续看吧…啊…啊啊${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「啊呜…被你一边看着…一边被命令自慰…居然这么舒服${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}一脸淫荡的看着你自慰着。`);
        await era.printAndWait(
          `「啊啊…我…我…要去了…啊啊…被看着…啊…去了…啊啊啊啊${heart(1)}」`,
        );
      }
      kojo.自慰 = 5; // CFLAG:304 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:31`) < 3 &&
      (kojo.自慰 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋自慰中毒Lv3未満（RAND:2 二选一）
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「嗯、虽然不想被你看到…不过是命令的话就没办法了…啊…嗯…啊！」`,
        );
        await era.printAndWait(`${target_name}相当熟练的继续自慰着………`);
      } else {
        await era.printAndWait(`「呜、嗯…很舒服哦…啊…啊啊…哈啊哈啊…啊…唔！」`);
        await era.printAndWait(`${target_name}羞耻地笑着，继续自慰着………`);
      }
      kojo.自慰 = 4; // CFLAG:304 = 4
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      era0(`abl:${target}:31`) >= 1 &&
      (kojo.自慰 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 屈服刻印Lv3+自慰中毒Lv1以上（RAND:2 二选一）
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「啊啊…哈啊哈啊…不要看啊…啊…唔…哈、啊、啊啊嗯♪」`,
        );
        await era.printAndWait(`${target_name}的自慰越来越激励了起来。`);
        await era.printAndWait(`「我、我…啊啊…啊…嗯…唔…啊啊…！」`);
      } else {
        await era.printAndWait(
          `「我的手指…啊啊…已经…哈…啊啊…停不下来了…啊…啊嗯♪」`,
        );
        await era.printAndWait(
          `「哈啊哈啊…啊…啊…啊…唔…啊！！唔！！唔唔！………！！！」`,
        );
        await era.printAndWait(
          `${target_name}的自慰越来越激励了起来、听起来好像在呼唤着谁的名字………`,
        );
      }
      kojo.自慰 = 3; // CFLAG:304 = 3
    } else if (kojo.自慰 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外（爱無し、自慰中毒Lv1未満，RAND:2 二选一）
      if (rand_n(2) == 0) {
        await era.printAndWait(`「哈…啊…嗯…嗯…哈啊哈啊…啊…啊啊！」`);
        await era.printAndWait(`${target_name}非常熟练的自慰着………`);
      } else {
        await era.printAndWait(
          `「啊嗯…啊啊…啊…哈啊哈啊…啊、能不能不那么看着我…嗯」`,
        );
        await era.printAndWait(`${target_name}一边羞耻的笑着一边自慰………`);
      }
      kojo.自慰 = 2; // CFLAG:304 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 5) {
    // 胸爱撫 CFLAG:306
    const milk_body =
      era0(`talent:${target}:130`) == 1 &&
      palam(5) > PALAMLV[3] &&
      era0(`tequip:${target}:16`) == 0 &&
      era0(`tequip:${target}:15`) == 0; // 母乳体质有效条件
    if (kojo.胸爱抚 == 0) {
      // 初めて
      if (milk_body) {
        if (era0(`talent:${target}:78`) == 1) {
          await era.printAndWait(
            `「好棒…！吸得更用力点…！吸出母乳来了…胸部舒服的要发狂了…啊啊~！」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊…从我的胸部里，母乳…啊嗯…那么吸的话…啊啊…我…我…已经…」`,
          );
        }
      } else if (era0(`talent:${target}:78`) == 1) {
        // 弄乳狂
        await era.printAndWait(
          `「啊…啊啊！继续…抚摸…我的胸部…嗯…哈啊…啊…啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的乳头想要爆炸了一样膨胀了起来、只是被碰到，${target_name}就会发出疯了一样的喘息声。`,
        );
        await era.printAndWait(
          `「唔…呜…呜…啊啊啊${heart(1)} 我…已经…啊…呜…啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `乳房被爱抚喘息的那个身姿、已经一点都看不出以前那个酷酷的女忍者的影子了………`,
        );
      } else {
        await era.printAndWait(
          `「啊…嗯…嗯…啊…稍微温柔一点啊…我的胸部很敏感的…啊、没什么…啊、嗯！」`,
        );
      }
      kojo.胸爱抚 = 1; // CFLAG:TARGET:306 = 1
      return 0;
    }
    // 二回目以降
    if (milk_body) {
      if (
        era0(`talent:${target}:78`) == 1 &&
        era0(`talent:${target}:76`) == 1 &&
        (kojo.胸爱抚 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // 淫乱+弄乳狂
        await era.printAndWait(
          `「继续吸…我的母乳吧…啊啊${heart(1)} 要疯了，感觉要疯了${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}抱住了正吮吸着的${player_name}的头。`,
        );
        await era.printAndWait(
          `「唔…唔…啊…我的母乳…被吸着…矣…呀…啊…要去了${heart(1)}」`,
        );
        kojo.胸爱抚 = 4; // CFLAG:306 = 4
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.胸爱抚 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `「啊…没想到你会吸我的母乳呢…我…啊啊…但是、这样也挺好的…嗯嗯${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被${player_name}吸着母乳，发出了粗重的鼻息。`,
        );
        await era.printAndWait(`「啊…嗯…嗯…啊啊…被吸着母乳…好棒${heart(1)}」`);
        kojo.胸爱抚 = 7; // CFLAG:306 = 7
      } else if (
        era0(`talent:${target}:78`) == 1 &&
        era0(`talent:${target}:85`) == 1 &&
        (kojo.胸爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // 爱慕+弄乳狂
        await era.printAndWait(
          `「啊啊…继续吸没关系的…嘴不要离开乳头…啊啊…啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}抱住了正吮吸着的${player_name}的头。`,
        );
        await era.printAndWait(
          `「哈啊…呀…我已经…要去…要去了…啊啊${heart(1)}」`,
        );
        kojo.胸爱抚 = 6; // CFLAG:306 = 6
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // 爱慕
        await era.printAndWait(
          `「呵呵呵…这么吸的话…给婴儿的份就不够了哦…啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}抚摸着吮吸着的${player_name}的头出了神。`,
        );
        await era.printAndWait(
          `「嗯…嗯…啊啊…哈啊…好舒服…好棒…继续吸…吸吧…${heart(1)}」`,
        );
        kojo.胸爱抚 = 5; // CFLAG:306 = 5
      } else if (
        era0(`talent:${target}:78`) == 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // 弄乳狂
        await era.printAndWait(
          `「嗯…！继续吸吧…！吸着母乳…胸部好像要发狂了~~~~…啊啊！」`,
        );
        await era.printAndWait(
          `${player_name}用嘴唇咬着${target_name}好像要破裂似得勃起的乳头。`,
        );
        await era.printAndWait(`「啊啊…我…我…只是胸部被吸着就要去了…啊啊！」`);
        kojo.胸爱抚 = 4; // CFLAG:306 = 4
      } else if (
        era0(`abl:${target}:1`) >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // B感覚Lv3以上
        await era.printAndWait(
          `「啊啊…嗯…不行啊…这么吸我的母乳的话…啊啊！我…太舒服了要去了…啊啊…啊…」`,
        );
        await era.printAndWait(
          `${target_name}已经彻底勃起的乳头被${player_name}吸着，流出了母乳。`,
        );
        await era.printAndWait(`「哈…啊…啊啊…啊…再继续的话…啊啊」`);
        kojo.胸爱抚 = 3; // CFLAG:306 = 3
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        // それ以外（爱無し、B感覚Lv3未満）
        await era.printAndWait(
          `「啊啊…从我的胸部里，母乳…啊啊…那么吸的话…啊啊…我…我…已经…」`,
        );
        await era.printAndWait(
          `${target_name}被${player_name}吸着母乳，反应很敏感的样子………`,
        );
        kojo.胸爱抚 = 2; // CFLAG:306 = 2
      }
    } else {
      if (
        era0(`talent:${target}:78`) == 1 &&
        era0(`talent:${target}:76`) == 1 &&
        (kojo.胸爱抚 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // 淫乱+弄乳狂
        await era.printAndWait(
          `「啊${heart(1)} 像要榨取…我的胸部那样…继续…啊啊…弄的乱七八糟吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被${player_name}像要留下痕迹那样抓着胸部，发出了快乐的声音。`,
        );
        await era.printAndWait(
          `「啊啊…${heart(1)} 啊啊…啊啊${heart(1)} 这个…好棒${heart(1)} 脑袋里面好像要融化一样${heart(1)}」`,
        );
        kojo.胸爱抚 = 4; // CFLAG:306 = 4
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.胸爱抚 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `「我的胸部…啊啊…如果是你的话不管怎么样…嗯…啊啊…嗯${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被${player_name}爱抚着胸部发出了灼热的吐息。`,
        );
        await era.printAndWait(
          `「啊啊…舒服得…好像要飞起来一样…啊啊…更多…${heart(1)}」`,
        );
        kojo.胸爱抚 = 7; // CFLAG:306 = 7
      } else if (
        era0(`talent:${target}:78`) == 1 &&
        era0(`talent:${target}:85`) == 1 &&
        (kojo.胸爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // 爱慕+弄乳狂
        await era.printAndWait(
          `「继续揉我的胸部…啊…呀${heart(1)} 再用力点…啊啊…要坏掉了${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的被${player_name}大力的揉着胸部，好像要昏过去了一样。`,
        );
        await era.printAndWait(
          `「啊啊…啊${heart(1)} 嗯…好…棒…啊啊${heart(1)} 啊啊${heart(1)}」`,
        );
        kojo.胸爱抚 = 6; // CFLAG:306 = 6
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // 爱慕
        await era.printAndWait(
          `「虽然我的胸部因为比较碍事所以一直都用布缠起来…啊啊…如果你要摸的话以后就不缠了…嗯…啊嗯${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被${player_name}爱抚着胸部发出了灼热的吐息。`,
        );
        await era.printAndWait(
          `「哈啊哈啊…嗯…继续…我的胸部…乳房…叫什么都好…啊啊…让我舒服吧……${heart(1)}」`,
        );
        kojo.胸爱抚 = 5; // CFLAG:306 = 5
      } else if (
        era0(`talent:${target}:78`) == 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // 弄乳狂
        await era.printAndWait(
          `「啊…啊啊！我的…胸部…继续抚摸吧…嗯…哈…啊…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}乳头像要爆炸一样膨胀着，只是轻触就让${target_name}发出了狂乱的声音。`,
        );
        await era.printAndWait(
          `「唔………啊啊啊~~${heart(1)} 我…唔…呀……啊啊啊${heart(1)}」`,
        );
        kojo.胸爱抚 = 4; // CFLAG:306 = 4
      } else if (
        era0(`abl:${target}:1`) >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // B感覚Lv3以上
        await era.printAndWait(
          `「啊…嗯…啊啊…胸部…好舒服…我的胸部…变得奇怪了…啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}只是被${player_name}抚摸着胸部，就露出了快要融化似的表情。`,
        );
        await era.printAndWait(`「啊！更多的…抚摸我的胸部…啊…」`);
        kojo.胸爱抚 = 3; // CFLAG:306 = 3
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        // それ以外（爱無し、B感覚Lv3未満）
        await era.printAndWait(
          `「啊…嗯…嗯咕…哈啊哈啊…确实的进攻我的弱点，不愧是魔王呢…啊…！」`,
        );
        await era.printAndWait(
          `${target_name}被${player_name}爱抚着胸部，反应很敏感的样子………`,
        );
        kojo.胸爱抚 = 2; // CFLAG:306 = 2
      }
    }
    return 0;
  } else if (era_flag.selectcom == 6) {
    // 接吻 CFLAG:307
    if (kojo.接吻 == 0 && era0('tflag:13')) {
      // 初吻（主人调教）
      if (
        era0(`talent:${target}:76`) == 1 &&
        era_flag.assi == 0 &&
        era0(`tequip:${target}:89`) == 0 &&
        era0(`tequip:${target}:90`) == 0
      ) {
        // 淫乱かつ主人
        await era.printAndWait(
          `「嗯…啾…啾…嗯…${heart(1)} 嗯…不行、不要离开…嗯…啾…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}用手臂转动着${player_name}的头像是在说“不要离开”那样，舌头缠在一起。`,
        );
        await era.printAndWait(
          `「哈${heart(1)} …啾${heart(1)} …啾${heart(1)} …哈…」`,
        );
        await era.printAndWait(
          `「怎么样？我的初吻的味道…还不过瘾的话…要不要再来？」`,
        );
        await era.printAndWait(
          `${target_name}舔了舔沾满唾液的嘴唇、眼睛一片湿润的看着${player_name}`,
        );
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era_flag.assi == 0 &&
        era0(`tequip:${target}:89`) == 0 &&
        era0(`tequip:${target}:90`) == 0
      ) {
        // 爱かつ主人
        await era.printAndWait(
          `「嗯…哈啊…哈啊…呵呵呵、这是我的初吻哦…是什么味道啊？」`,
        );
        await era.printAndWait(`${target_name}抱着${player_name}说着。`);
        await era.printAndWait(
          `「很意外吧、但是是真的哦…如果无法不相信的话…嗯…嗯…啾…啾…呵呵、那我就单单不和你接吻好了…${heart(1)}」`,
        );
        await era.printAndWait(
          `然后${target_name}又一次和${player_name}接了吻………`,
        );
      } else {
        // それ以外
        await era.printAndWait(`「嗯…咕…别这样…为什么第一次是你…！」`);
        await era.printAndWait(
          `${target_name}和${player_name}嘴唇分开后抹了抹嘴角………`,
        );
      }
      kojo.接吻 = 1; // CFLAG:307 = 1
      return 0;
    } else if (kojo.接吻 == 0) {
      // （調教で）初めて
      if (era0(`talent:${target}:76`) == 1) {
        // 淫乱
        await era.printAndWait(
          `「嗯…啾……嗯…${heart(1)} …不行、不要离开…嗯……${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}用手臂转动着${player_name}的头像是在说“不要离开”那样，舌头缠在一起。`,
        );
        await era.printAndWait(
          `「嗯……${heart(1)} …啾${heart(1)} …恩${heart(1)} …嗯…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}舔了舔沾满唾液的嘴唇、眼睛一片湿润的看着${player_name}………`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        // 爱慕
        await era.printAndWait(
          `「嗯…哈啊…哈啊…呵呵呵、我的嘴唇…是什么味道？」`,
        );
        await era.printAndWait(`${target_name}抱着${player_name}说着。`);
        await era.printAndWait(`「啊、不过瘾吗？ 那再来…再继续吧…呐？」`);
        await era.printAndWait(
          `然后${target_name}又一次和${player_name}接了吻………`,
        );
      } else {
        // それ以外
        await era.printAndWait(`「嗯、呼…快…离开…唔…从我嘴里把你的………」`);
        await era.printAndWait(
          `${target_name}和${player_name}嘴唇分开后抹了抹嘴角………`,
        );
      }
      kojo.接吻 = 1; // CFLAG:307 = 1
      return 0;
    }
    // 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.接吻 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「我的嘴唇…好吃吗？…啊…那就给你更好吃的吧${heart(1)} 嗯…啾…啾…嗯${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}发出着啪嗒啪嗒的声音和${player_name}接着吻。两人口腔里都是黏黏的唾液。`,
      );
      await era.printAndWait(
        `「嗯啾…啾…哈啊…哈啊…哇啊…啊…喜欢${heart(1)} …继续接吻吧…继续吻我…${heart(1)}」`,
      );
      kojo.接吻 = 5; // CFLAG:307 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.接吻 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「啊…嗯…继续吻我…啊…吻我…已经…嗯…啾…啾…哈啊${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}和${player_name}不停的吻在一起。`);
      await era.printAndWait(
        `「嗯…啊…已经迷上了…和你接吻…嗯…啊…哈${heart(1)}」`,
      );
      kojo.接吻 = 4; // CFLAG:307 = 4
    } else if (
      era0(`abl:${target}:10`) >= 2 &&
      (kojo.接吻 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 顺从Lv2以上
      await era.printAndWait(`「哈啊哈啊…嗯…咕…哈啊…啾…嗯啾…」`);
      await era.printAndWait(
        `${target_name}接受着${player_name}的吻，舌头缠绕在了一起………`,
      );
      kojo.接吻 = 3; // CFLAG:307 = 3
    } else if (kojo.接吻 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外
      await era.printAndWait(`「呜…呜呜…嘴唇…果然很不舒服…啊…呜！」`);
      await era.printAndWait(
        `${player_name}把${target_name}抱在怀里，不停的亲吻着………`,
      );
      kojo.接吻 = 2; // CFLAG:307 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 7) {
    // 自己扒开 CFLAG:308
    if (kojo.自己扒开 == 0) {
      // 初めて
      const virgin_hidden =
        era0(`talent:${target}:0`) == 1 && era0(`exp:${target}:0`) == 0; // TALENT:0==1 && EXP:0==0（处女且未破处）
      if (era0(`talent:${target}:76`) == 1) {
        // 淫乱
        await era.printAndWait(
          `「我的小穴…看啊…啊…这个小穴随便你怎么弄哦…啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}大大的张开自己的大腿、用手指分开着自己的小穴。`,
        );
        await era.printAndWait(
          `然后${target_name}对${player_name}的视线起了反应，从蜜裂里流出了蜜汁。`,
        );
        await era.printAndWait(
          `「啊啊…我的小穴…只是被看着就好有感觉${heart(1)}」`,
        );
        if (virgin_hidden) {
          await era.printAndWait(
            `「啊啊…难道说是想看我的处女膜？ 那么…啊啊、再打开一点哦…啊${heart(1)}」`,
          );
        }
      } else if (era0(`talent:${target}:85`) == 1) {
        // 爱慕
        await era.printAndWait(
          `「啊啊…你真是好色的啊…但是如果是你的话不管做什么都没关系的…啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}大大的张开自己的大腿、用手指分开着自己的小穴。`,
        );
        await era.printAndWait(
          `「继续看…继续看我的小穴吧…已经…变的黏糊糊了${heart(1)}」`,
        );
        if (virgin_hidden) {
          await era.printAndWait(
            `「能看我的处女膜吗？呵呵呵、我一直期待着你能把它夺走呢………」`,
          );
        }
      } else {
        // それ以外（爱無し）
        await era.printAndWait(`「唔…屈辱啊…这个样子………」`);
        await era.printAndWait(
          `${target_name}大大的张开自己的大腿、用手指分开着自己的小穴。脸上因为羞耻而十分红润。`,
        );
        await era.printAndWait(`「笨、笨蛋…”漂亮”是什么意思啊…呜！」`);
        if (virgin_hidden) {
          await era.printAndWait(
            `「诶、你说看见了处女膜？ 开、开什么玩笑！只打开那么一点怎么可能看见…！」`,
          );
        }
      }
      kojo.自己扒开 = 1; // CFLAG:TARGET:308 = 1
      return 0;
    }
    // 二回目以降
    const virgin_hidden =
      era0(`talent:${target}:0`) == 1 && era0(`exp:${target}:0`) == 0; // TALENT:0==1 && EXP:0==0
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.自己扒开 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「我的小穴…你专用的小穴…${heart(1)} 多看看啊…啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}大大的张开自己的大腿、用手指分开着自己的小穴。`,
      );
      await era.printAndWait(
        `然后对${player_name}的视线起了反应，从蜜裂里流出了蜜汁。`,
      );
      await era.printAndWait(
        `「这个黏糊糊${heart(1)} 咕啾咕啾${heart(1)} 的小穴想要你的阴茎想要得不得了${heart(1)}」`,
      );
      if (virgin_hidden) {
        await era.printAndWait(
          `「啊啊…难道说是想看我的处女膜？ 那么…啊啊、再打开一点哦…啊${heart(1)}」`,
        );
      }
      kojo.自己扒开 = 5; // CFLAG:308 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.自己扒开 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「唔…啊啊…看着我的小穴…${heart(1)} 只要想到你在看…啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}大大的张开自己的大腿、用手指分开着自己的小穴。`,
      );
      await era.printAndWait(`然后${player_name}为了更好地看着提了提上半身。`);
      await era.printAndWait(`「继续看着我黏糊糊的小穴……啊啊${heart(1)}」`);
      if (virgin_hidden) {
        await era.printAndWait(
          `「能看我的处女膜吗？呵呵呵、我一直期待着你能把它夺走呢………」`,
        );
      }
      kojo.自己扒开 = 4; // CFLAG:308 = 4
    } else if (
      era0(`abl:${target}:17`) >= 3 &&
      (kojo.自己扒开 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 露出癖Lv3以上
      await era.printAndWait(
        `「哈啊哈啊…啊…我的那里…仔细看吧…啊啊…嗯……很漂亮吧…你不是说过吗…啊啊」`,
      );
      await era.printAndWait(
        `${target_name}打开了自己的蜜裂、${player_name}为了更好地看着提了提上半身。`,
      );
      await era.printAndWait(
        `「啊…我的…啊啊…小穴…看着小穴…哈…啊啊…有感觉了♪」`,
      );
      if (virgin_hidden) {
        await era.printAndWait(`「唔嗯…也看看我的处女膜…啊啊…！」`);
      }
      kojo.自己扒开 = 3; // CFLAG:308 = 3
    } else if (kojo.自己扒开 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外（爱無し、露出癖Lv3未満）
      await era.printAndWait(
        `「哈啊…哈啊……不用继续摆这个姿势了吧？ 诶、还有5分钟？唔…呜…饶、饶了我吧…啊啊！」`,
      );
      await era.printAndWait(
        `${target_name}服从着${player_name}那屈辱的命令。`,
      );
      await era.printAndWait(`「啊、啊啊…我已经………」`);
      if (virgin_hidden) {
        await era.printAndWait(
          `「我的处女膜很漂亮什么的…别说这么明显的假话…啊啊！」`,
        );
      }
      kojo.自己扒开 = 2; // CFLAG:308 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 8) {
    // 插入手指 CFLAG:309
    if (kojo.插入手指 == 0) {
      // 初めて
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「嗯啊…我的小穴…被你的手指…啊啊…好深…好棒${heart(1)}」`,
        );
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`talent:${target}:85`) == 1
      ) {
        await era.printAndWait(
          `「啊…啊啊…你的手指…嗯…好深…啊啊…好棒…${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「嗯…唔…你的手指…再稍微温柔一点啊…啊啊…！啊、这么深…啊啊！」`,
        );
      }
      kojo.插入手指 = 1; // CFLAG:TARGET:309 = 1
      return 0;
    }
    // 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.插入手指 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「继续在我的女阴里搅动…啊啊${heart(1)} 被你弄得乱七八糟了${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}被${player_name}爱抚着阴道深处，发出着娇喘`,
      );
      await era.printAndWait(`「嗯…啊…小穴…小穴舒服${heart(1)}」`);
      kojo.插入手指 = 5; // CFLAG:309 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`mark:${target}:2`) == 3 &&
      (kojo.插入手指 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋屈服刻印Lv3
      await era.printAndWait(
        `「啊啊…你…嗯…啊啊啊…我的小学里面…嗯…啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}被${player_name}爱抚着阴道深处，发出着娇喘`,
      );
      await era.printAndWait(
        `「啊…啊啊…你的手指…嗯…好深…啊…啊啊啊…好棒…${heart(1)}」`,
      );
      kojo.插入手指 = 4; // CFLAG:309 = 4
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      (kojo.插入手指 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 屈服刻印Lv3
      await era.printAndWait(`「嗯…啊…咕…啊啊——！我…这么…啊啊…啊啊——！」`);
      await era.printAndWait(
        `${target_name}被${player_name}搅动着阴道，悲鸣着`,
      );
      await era.printAndWait(`「咕…嗯…在稍微温柔…一点…啊」`);
      kojo.插入手指 = 3; // CFLAG:309 = 3
    } else if (kojo.插入手指 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外
      await era.printAndWait(`「我的…啊啊啊…那里…被这样玩弄的话…咕…啊！」`);
      kojo.插入手指 = 2; // CFLAG:309 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 9) {
    // 舔肛 CFLAG:310
    if (kojo.舔肛 == 0) {
      // 初めて
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊嗯…继续舔…我的肛门…啊啊…好舒服${heart(1)}」`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「啊啊…我的…我的屁股…啊…明明很脏的…啊…停下…啊啊～！${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「嗯…嗯…啊啊…快住…快助手啊！…我的…那个地方…啊啊明明很脏的！」`,
        );
      }
      kojo.舔肛 = 1; // CFLAG:TARGET:310 = 1
      return 0;
    }
    // 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.舔肛 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「啊嗯…好舒服…好舒服啊${heart(1)} 继续舔…我的肛门吧${heart(1)}」`,
      );
      await era.printAndWait(
        `${player_name}如${target_name}所愿的那样，肛门的皱褶每一根都舔到了`,
      );
      await era.printAndWait(
        `「啊嗯…嗯…嗯啊…我的肛门…好吃吗？那就继续舔吧${heart(1)}」`,
      );
      kojo.舔肛 = 5; // CFLAG:310 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.舔肛 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「不、不行啊…屁股被你…啊…这么舔的话，我…要变得奇怪了…嗯…啊嗯${heart(1)}」`,
      );
      await era.printAndWait(
        `${player_name}舔着${target_name}的肛门，因为舌头扫过一窈窕皱褶而发出甜美的呻吟。`,
      );
      await era.printAndWait(
        `「啊嗯…啊啊…我的屁股…要变得奇怪了…啊啊…嗯…啊啊嗯，${heart(1)}」`,
      );
      kojo.舔肛 = 4; // CFLAG:310 = 4
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      (kojo.舔肛 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 屈服刻印Lv3
      await era.printAndWait(`「嗯…啊嗯…啊啊…嗯、啊…我、我已经…我…啊啊」`);
      await era.printAndWait(
        `${target_name}一边发出很害羞的声音，一边被${player_name}舔着肛门………`,
      );
      kojo.舔肛 = 3; // CFLAG:310 = 3
    } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外（屈服刻印Lv3未満）
      await era.printAndWait(
        `「哈…嗯…嗯…不、不要再这样了…啊啊…我的屁股…啊啊快停下啊！」`,
      );
      await era.printAndWait(
        `${player_name}用舌头让${target_name}紧固的花蕾一点点开始变习惯了………`,
      );
      kojo.舔肛 = 2; // CFLAG:310 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 10) {
    // 振动宝石 CFLAG:311
    if (kojo.振动宝石 == 0) {
      // 初めて
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「那是我的…敏感部位…继续…啊啊${heart(1)}」`);
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`talent:${target}:85`) == 1
      ) {
        await era.printAndWait(
          `「啊…嗯…啊…${heart(1)} 好舒服啊…啊啊啊${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「嗯…这个稍微有点痒啊…啊嗯…已、已经…嗯…啊啊！」`,
        );
      }
      kojo.振动宝石 = 1; // CFLAG:TARGET:311 = 1
      return 0;
    }
    // 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.振动宝石 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait(`「那是我的…敏感部位…继续…啊啊${heart(1)}」`);
      await era.printAndWait(
        `${target_name}振动宝石贴住阴蒂的刺激让她发出了娇喘`,
      );
      await era.printAndWait(
        `「啊啊啊,我的阴蒂${heart(1)} 啊啊啊啊啊${heart(1)} 做更多舒服的事情吧${heart(1)}」`,
      );
      kojo.振动宝石 = 5; // CFLAG:311 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`mark:${target}:2`) == 3 &&
      (kojo.振动宝石 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋屈服刻印Lv3
      await era.printAndWait(
        `「啊嗯…啊…啊嗯…${heart(1)} 好舒服…啊，啊啊啊…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}敏感部分被振动宝石贴着，露出了甜美的娇喘`,
      );
      await era.printAndWait(
        `「哈…哈…啊…嗯…啊嗯${heart(1)} 啊啊啊…啊——${heart(1)}」`,
      );
      kojo.振动宝石 = 4; // CFLAG:311 = 4
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      (kojo.振动宝石 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 屈服刻印Lv3
      await era.printAndWait(`「啊…嗯…这个…好舒服啊…啊嗯…啊…啊啊！」`);
      await era.printAndWait(
        `${target_name}振动宝石贴住阴蒂的刺激让她发出激烈的娇喘`,
      );
      await era.printAndWait(`「但是我的阴蒂…才…才不会有什么感觉呢……哼」`);
      kojo.振动宝石 = 3; // CFLAG:311 = 3
    } else if (kojo.振动宝石 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外
      await era.printAndWait(`「嗯…这个稍微有点痒啊…啊嗯…已、已经…嗯…啊啊！」`);
      await era.printAndWait(
        `${target_name}敏感部分被振动宝石贴着而发出了叫声`,
      );
      kojo.振动宝石 = 2; // CFLAG:311 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 11 && era0(`tequip:${target}:11`)) {
    // 壶虫 CFLAG:312（開始時）
    if (kojo.壶虫 == 0) {
      // 初めて
      if (era0(`talent:${target}:0`) == 1) {
        // 处女
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「啊嗯…呜…真是毫不留情啊你…啊啊！我的第一次居然就这样给了这种蠕虫…咕！」`,
          );
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「我的…第一次…啊啊啊…竟然这么过分……咕……！」`);
        } else {
          await era.printAndWait(
            `「啊啊啊…我的…我的第一次…是这种下等的蠕虫…呜…啊啊！」`,
          );
        }
      } else {
        // 非处女
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「嗯啊嗯啊…好棒…蠕虫钻入了我的阴道…啊啊啊${heart(1)}」`,
          );
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「啊…啊啊…蠕虫在我里面…嗯…插进来了…啊嗯」`);
        } else {
          await era.printAndWait(
            `「嗯…这种蠕虫…根本就不可能进来吧…嗯啊啊啊！」`,
          );
        }
      }
      kojo.壶虫 = 1; // CFLAG:312 = 1
      return 0;
    }
    // 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.壶虫 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      if (era0(`abl:${target}:2`) >= 3) {
        await era.printAndWait(
          `「啊啊啊…小穴…我的小穴被蠕虫钻入了…啊啊啊…啊哈${heart(1)}」`,
        );
        await era.printAndWait(
          `「再…深点…插进去…啊嗯…不要掉出来…啊啊${heart(1)}」`,
        );
      }
      await era.printAndWait(
        `${target_name}小穴深处蠕虫的攻击，让她数次发出微小的呻吟`,
      );
      kojo.壶虫 = 5; // CFLAG:312 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.壶虫 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      if (era0(`abl:${target}:2`) >= 3) {
        await era.printAndWait(
          `「啊啊啊，我的小穴…被蠕虫钻入了..啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(`「插，插进来这么深的话…啊啊…会拔不出来的」`);
      }
      await era.printAndWait(`${target_name}小穴被蠕虫插入着，发出了呻吟声。`);
      kojo.壶虫 = 4; // CFLAG:312 = 4
    } else if (
      era0(`abl:${target}:2`) >= 3 &&
      (kojo.壶虫 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // V感覚Lv3以上
      await era.printAndWait(`${target_name}蠕虫深深的插入小穴`);
      await era.printAndWait(
        `「哈啊…啊啊啊…我的…我的那里…好舒服…嗯…我居然会对蠕虫的插入有感觉…啊啊啊」`,
      );
      kojo.壶虫 = 3; // CFLAG:312 = 3
    } else if (kojo.壶虫 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外
      await era.printAndWait(`「啊啊啊…不要欺负…我那里啊……啊啊啊…啊！」`);
      await era.printAndWait(`${target_name}被蠕虫刺进了小穴深处………`);
      kojo.壶虫 = 2; // CFLAG:312 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 11 && era0(`tequip:${target}:11`) == 0) {
    // 壶虫 脱着時 CFLAG:372
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.壶虫着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「哈哈…蠕虫也很舒服呢…呵呵呵${heart(1)}」`);
      kojo.壶虫着脱 = 3; // CFLAG:372 = 3
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.壶虫着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「啊啊…啊啊…下次想要你的………」`);
      kojo.壶虫着脱 = 2; // CFLAG:372 = 2
    } else if (kojo.壶虫着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「啊…啊啊啊…我的那里…啊啊……」`);
      kojo.壶虫着脱 = 1; // CFLAG:372 = 1
    }
    return 0;
  } else if (era_flag.selectcom == 12) {
    // 振动杖 CFLAG:313
    if (kojo.振动杖 == 0) {
      // 初めて
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊啊，这个拷问道具让我高潮到快疯了${heart(1)} 啊啊…啊啊啊啊${heart(1)}」`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「啊啊啊，被…被你做这样的事情的话，我马上就…嗯…啊${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「啊…啊啊…这种…振动的话我…啊啊…应该有办法…嗯…咕！」`,
        );
      }
      kojo.振动杖 = 1; // CFLAG:313 = 1
      return 0;
    }
    // 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.振动杖 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「啊啊啊…哈…哈…用那个杖把我的小穴弄坏吧…啊啊啊${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}张开大腿，挺起腰贴到了振动杖上`);
      await era.printAndWait(
        `「啊嗯嗯啊${heart(1)} 这种振动好舒服…我的小穴要坏了${heart(1)}」`,
      );
      kojo.振动杖 = 5; // CFLAG:313 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.振动杖 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「不，不要这样欺负我啊…啊…嗯…啊…啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}脸上浮现着抱怨的神情，但振动杖稍微靠近就让她发出呻吟。`,
      );
      await era.printAndWait(
        `「嗯…把我的…啊啊…我的小穴…弄得更舒服吧${heart(1)} 啊啊！”」`,
      );
      kojo.振动杖 = 4; // CFLAG:313 = 4
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      (kojo.振动杖 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 屈服刻印Lv3
      await era.printAndWait(`「嗯…咕…嗯…振动…我的那里…啊啊！」`);
      await era.printAndWait(`${target_name}紧闭着眼睛皱着眉，抵抗着快感`);
      await era.printAndWait(
        `可是那淫靡的震动却确实的不断给予着${target_name}的身体快乐的波浪………`,
      );
      kojo.振动杖 = 3; // CFLAG:313 = 3
    } else if (kojo.振动杖 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外
      await era.printAndWait(`「啊啊…我的…那里…变得…要变得…奇怪了…停下…啊！」`);
      await era.printAndWait(`${target_name}振动杖的刺激让她发出悲鸣`);
      kojo.振动杖 = 2; // CFLAG:313 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 13 && era0(`tequip:${target}:13`)) {
    // 肛门虫 CFLAG:314（開始時）
    if (kojo.肛门虫 == 0) {
      // 初めて
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊，我的肛门…正在被蠕虫侵犯…啊啊啊…好舒服${heart(1)}」`,
        );
        await era.printAndWait(`蠕虫往${target_name}的肛门里钻去……`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「嗯…啊啊…我的肛门…嗯…嗯…被这种蠕虫钻进来…啊…啊啊——！」`,
        );
        await era.printAndWait(`${target_name}因为肛门被蠕虫钻入而发出悲鸣……`);
      } else if (era0(`abl:${target}:3`) >= 3) {
        // それ以外·A感覚Lv3以上
        await era.printAndWait(
          `「呀，啊啊啊…我的肛门……啊哈啊…被蠕虫插得这么舒服什么的…啊啊啊…咕」`,
        );
        await era.printAndWait(
          `${target_name}的肛门把蠕虫吞了进去，像要配合${target_name}的娇喘一样，蠕虫不停的颤动着。`,
        );
      } else {
        await era.printAndWait(`「停，停下，把这么肮脏的蠕虫…放进来…啊啊啊」`);
        await era.printAndWait(
          `${target_name}因为肛门被塞入蠕虫而发出痛苦的声音${player_name}让肛门虫前后动着`,
        );
      }
      kojo.肛门虫 = 1; // CFLAG:TARGET:314 = 1
      return 0;
    }
    // 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.肛门虫 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱＋A感覚Lv3以上
      await era.printAndWait(
        `「嗯…啊嗯${heart(1)} 肛门好舒服……我的肛门要变成性器了……要变成肛门小穴了${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}一边说着淫荡的话一边在肛门被蠕虫侵犯的快感中颤抖着`,
      );
      kojo.肛门虫 = 6; // CFLAG:314 = 6
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.肛门虫 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「啊啊啊！我的肛门…嗯…正在被蠕虫侵犯着…好舒服啊${heart(1)}」`,
      );
      await era.printAndWait(`蠕虫往${target_name}的肛门里钻去……`);
      kojo.肛门虫 = 6; // CFLAG:314 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.肛门虫 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋A感覚Lv3以上
      await era.printAndWait(
        `「啊嗯…啊啊…蠕虫…进来了…被我的屁眼…全部吞下去了……${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}因为肛门太有感觉了而带着艳丽的表情看着肛门里的蠕虫……`,
      );
      kojo.肛门虫 = 5; // CFLAG:314 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.肛门虫 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「嗯…啊，我的肛门…嗯…嗯…被蠕虫插进来了…啊…啊啊——！」`,
      );
      await era.printAndWait(`${target_name}因为肛门被插进了蠕虫而发出悲鸣……`);
      kojo.肛门虫 = 4; // CFLAG:314 = 4
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.肛门虫 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // A感覚Lv3以上
      await era.printAndWait(
        `「哈，啊啊啊，我的肛门…啊…啊…被蠕虫弄得什么舒服什么的…啊啊啊」`,
      );
      await era.printAndWait(
        `${target_name}的肛门把蠕虫吞了进去，像要配合${target_name}的娇喘一样，蠕虫不停的颤动着。`,
      );
      kojo.肛门虫 = 3; // CFLAG:314 = 3
    } else if (kojo.肛门虫 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外
      await era.printAndWait(
        `「不、不要…好、好难受…我的屁股要变得奇怪了…啊…啊啊——！`,
      );
      await era.printAndWait(
        `${target_name}因为肛门被塞入蠕虫而发出痛苦的声音。像是在享受着这个声音的${player_name}让肛门虫前后动着………`,
      );
      kojo.肛门虫 = 2; // CFLAG:314 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 13 && era0(`tequip:${target}:13`) == 0) {
    // 肛门虫 脱着時 CFLAG:374
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.肛门虫着脱 < 4 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「啊啊…继续…继续…欺负我的肛门吧${heart(1)}」`);
      kojo.肛门虫着脱 = 4; // CFLAG:374 = 4
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.肛门虫着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「啊啊啊…我的肛门…不行了……${heart(1)}」`);
      kojo.肛门虫着脱 = 3; // CFLAG:374 = 3
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.肛门虫着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「啊啊，肛门…啊嗯…火辣辣的」`);
      kojo.肛门虫着脱 = 2; // CFLAG:374 = 2
    } else if (kojo.肛门虫着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「啊啊…我的肛门…嗯…奇怪了………」`);
      kojo.肛门虫着脱 = 1; // CFLAG:374 = 1
    }
    return 0;
  } else if (era_flag.selectcom == 14 && era0(`tequip:${target}:14`)) {
    // 阴蒂夹 CFLAG:315（開始時）
    if (kojo.阴蒂夹 == 0) {
      // 初めて
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊啊…这么刺激阴蒂的话…会在你面前漏出不像样的阿黑颜啊…啊啊呀${heart(1)}」`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「又要这样欺负我吗？啊啊…啊…被这样夹住的话…啊啊${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「因、因为这种拷问道具而有感觉什么的…啊啊…啊…我的阴蒂…这样…啊啊！」`,
        );
        await era.printAndWait(
          `夹着${target_name}的阴蒂阴蒂夹毫不留情的给予着${target_name}快感`,
        );
      }
      kojo.阴蒂夹 = 1; // CFLAG:315 = 1
      return 0;
    }
    // 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.阴蒂夹 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「啊嗯…啊啊嗯${heart(1)} 继续欺负我的阴蒂吧…啊嗯…啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `夹住${target_name}的阴蒂的电动阴蒂夹的刺激让${target_name}的脑袋陶醉了…`,
      );
      kojo.阴蒂夹 = 4; // CFLAG:315 = 4
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.阴蒂夹 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「坏，坏心眼…我明明被你触碰才最有感觉，却还用这种东西，啊啊啊${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}因为电动阴蒂夹而发出甜美的呻吟`);
      kojo.阴蒂夹 = 3; // CFLAG:315 = 3
    } else if (kojo.阴蒂夹 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外
      await era.printAndWait(`「啊啊…不要再欺负我的阴蒂了…啊…啊啊——！」`);
      await era.printAndWait(
        `${target_name}的双膝因为被被装上电动阴蒂夹而相互摩擦着，就这样昏了过去`,
      );
      kojo.阴蒂夹 = 2; // CFLAG:315 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 14 && era0(`tequip:${target}:14`) == 0) {
    // 阴蒂夹 脱着時 CFLAG:375
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.阴蒂夹着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「嗯…哈…哈…啊啊…我的脑袋好像变得奇怪了………」`);
      kojo.阴蒂夹着脱 = 3; // CFLAG:375 = 3
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.阴蒂夹着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「啊啊…我的阴蒂变得很奇怪了吗？」`);
      kojo.阴蒂夹着脱 = 2; // CFLAG:375 = 2
    } else if (kojo.阴蒂夹着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「哈啊…哈啊…我…已经………」`);
      kojo.阴蒂夹着脱 = 1; // CFLAG:375 = 1
    }
    return 0;
  } else if (era_flag.selectcom == 15 && era0(`tequip:${target}:15`)) {
    // 乳头夹 CFLAG:316（開始時）
    if (kojo.乳头夹 == 0) {
      // 初めて
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊…乳头${heart(1)} 我的乳头…要融化了${heart(1)}」`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「啊…这…这个不行的…我…我已经…啊…嗯…呜！」`);
      } else {
        await era.printAndWait(`「啊…乳头不行…这个、快点拿掉…啊…呜啊啊啊！」`);
        await era.printAndWait(
          `${target_name}的乳头被乳头夹轻轻夹住，${target_name}发出了悲鸣………`,
        );
      }
      kojo.乳头夹 = 1; // CFLAG:316 = 1
      return 0;
    }
    // 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`talent:${target}:78`) == 1 &&
      (kojo.乳头夹 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱+弄乳狂
      await era.printAndWait(
        `「啊…呼…我已经…变的奇怪了…乳头变的奇怪了${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}的乳头想要爆炸了似的勃起着、那夹子咬住的乳头通红的充着血。`,
      );
      await era.printAndWait(`「啊…啊啊…再这样做的话乳头要融化了${heart(1)}」`);
      kojo.乳头夹 = 7; // CFLAG:316 = 7
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.乳头夹 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「啊…乳头好舒服${heart(1)} 我的乳头…要融化了${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}因为被乳头夹夹住而发出了娇喘………`);
      kojo.乳头夹 = 6; // CFLAG:316 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`talent:${target}:78`) == 1 &&
      (kojo.乳头夹 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕+弄乳狂
      await era.printAndWait(
        `「我的乳头…啊啊${heart(1)} 不行了…${heart(1)} 啊…啊啊…变的那么大了${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}的乳头想要爆炸了似的勃起着、那夹子咬住的乳头通红的充着血。`,
      );
      await era.printAndWait(`「哈、哈啊…哈啊…继续…欺负乳头吧…${heart(1)}」`);
      kojo.乳头夹 = 5; // CFLAG:316 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.乳头夹 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait(`「啊…这…这个不行的…我…我已经…啊…嗯…呜！」`);
      await era.printAndWait(`${target_name}因为被乳头夹夹住而发出了娇喘………`);
      kojo.乳头夹 = 4; // CFLAG:316 = 4
    } else if (
      era0(`talent:${target}:78`) == 1 &&
      (kojo.榨乳器 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 弄乳狂
      await era.printAndWait(
        `「啊啊…我的乳头要融化了…再、再用力点…让我更舒服吧！」`,
      );
      await era.printAndWait(
        `${target_name}的乳头想要爆炸了似的勃起着、那夹子咬住的乳头通红的充着血。`,
      );
      kojo.乳头夹 = 3; // CFLAG:316 = 3
    } else if (kojo.乳头夹 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外
      await era.printAndWait(`「嗯…啊…啊…咕…嗯…我的乳头…啊啊…太舒服了…」`);
      await era.printAndWait(`${target_name}发出了炽热的叹息声………………`);
      kojo.乳头夹 = 2; // CFLAG:316 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 15 && era0(`tequip:${target}:15`) == 0) {
    // 乳头夹 脱着時 CFLAG:376
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.乳头夹着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「啊啊嗯…明明还想继续被欺负乳头吧！」`);
      await era.printAndWait(`${target_name}难过的看着夹子被拿下来………`);
      kojo.乳头夹着脱 = 3; // CFLAG:376 = 3
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.乳头夹着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「下次希望是你的手来玩弄…但是………」`);
      await era.printAndWait(`${target_name}难过的看着夹子被拿下来………`);
      kojo.乳头夹着脱 = 2; // CFLAG:376 = 2
    } else if (kojo.乳头夹着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「哈啊哈啊…啊…这种东西………」`);
      await era.printAndWait(`${target_name}难过的看着夹子被拿下来………`);
      kojo.乳头夹着脱 = 1; // CFLAG:376 = 1
    }
    return 0;
  } else if (era_flag.selectcom == 16 && era0(`tequip:${target}:16`)) {
    // 榨乳器（母乳体质のみ） CFLAG:317（開始時）
    if (kojo.榨乳器 == 0) {
      // 初めて
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「哈…哈…啊…更多的榨取我的胸部吧…${heart(1)}」`);
        await era.printAndWait(
          `${target_name}因为被榨乳器强行榨乳的快感而发出了娇喘………`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「啊…嗯…啊…啊啊~${heart(1)} 我的胸部…这样的${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}因为被榨乳器强行榨乳的快感而发出了娇喘………`,
        );
      } else {
        await era.printAndWait(`「啊嗯…啊…我的胸部…那样…嗯…啊啊啊！」`);
        await era.printAndWait(
          `${target_name}因为被榨乳器强行榨乳的感觉而发出了悲鸣………`,
        );
      }
      kojo.榨乳器 = 1; // CFLAG:317 = 1
      return 0;
    }
    // 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`talent:${target}:78`) == 1 &&
      (kojo.榨乳器 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱+弄乳狂
      await era.printAndWait(
        `「啊啊…出来了好多啊…我的胸部…啊…啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `「真、真希望…能被这个机械一直榨取…啊…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}因为被榨乳器强行榨乳的快感而发出了娇喘………`,
      );
      kojo.榨乳器 = 7; // CFLAG:317 = 7
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.榨乳器 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait(`「哈…哈…啊…更多的榨取我的胸部吧…${heart(1)}」`);
      await era.printAndWait(
        `${target_name}因为被榨乳器强行榨乳的快感而发出了娇喘………`,
      );
      kojo.榨乳器 = 6; // CFLAG:317 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`talent:${target}:78`) == 1 &&
      (kojo.榨乳器 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕+弄乳狂
      await era.printAndWait(
        `「我的胸部…明明不好好的给小宝宝是不行的${heart(1)} 这样的被榨取的话${heart(1)}」`,
      );
      await era.printAndWait(
        `「啊啊…好舒服…舒服的快要发狂了…更多的榨取吧${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}因为被榨乳器强行榨乳的快感而发出了娇喘………`,
      );
      kojo.榨乳器 = 5; // CFLAG:317 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.榨乳器 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「啊…嗯…啊…啊啊~${heart(1)} 我的胸部…这样的${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}因为被榨乳器强行榨乳的快感而发出了娇喘………`,
      );
      kojo.榨乳器 = 4; // CFLAG:317 = 4
    } else if (
      era0(`talent:${target}:78`) == 1 &&
      (kojo.榨乳器 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 弄乳狂
      await era.printAndWait(`「啊嗯…啊啊…啊…啊…已、已经…我…不行！」`);
      await era.printAndWait(
        `${target_name}因为被榨乳器强行榨乳的快感而发出了娇喘………`,
      );
      kojo.榨乳器 = 3; // CFLAG:317 = 3
    } else if (kojo.榨乳器 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外
      await era.printAndWait(`「啊啊…啊…我的胸部…那么…嗯…呀啊！」`);
      await era.printAndWait(
        `${target_name}因为被榨乳器强行榨乳的感觉而发出了悲鸣………`,
      );
      kojo.榨乳器 = 2; // CFLAG:317 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 16 && era0(`tequip:${target}:16`) == 0) {
    // 榨乳器 脱着時 CFLAG:377
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.榨乳器着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「继续…榨取胸部啊………」`);
      kojo.榨乳器着脱 = 3; // CFLAG:377 = 3
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.榨乳器着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「哈啊哈啊…继续…吸…我的胸部啊…」`);
      kojo.榨乳器着脱 = 2; // CFLAG:377 = 2
    } else if (kojo.榨乳器着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「嗯…啊…继续…做啊…」`);
      kojo.榨乳器着脱 = 1; // CFLAG:377 = 1
    }
    return 0;
  } else if (era_flag.selectcom == 19 && era0(`tequip:${target}:19`)) {
    // 肛珠 CFLAG:320（開始時）
    if (kojo.肛珠 == 0) {
      // 初めて
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「嗯…啊嗯…我的肛门…被插进去了……${heart(1)}」`);
        await era.printAndWait(
          `${target_name}因为肛门被肛珠一粒粒的插入而发出微微的喘息`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「啊…嗯…总觉得…感觉好奇怪啊…啊啊」`);
        await era.printAndWait(
          `${target_name}因为肛门被肛珠一粒粒的插入而发出微微的喘息`,
        );
      } else if (era0(`abl:${target}:3`) >= 3) {
        // それ以外·肛门感觉Lv3以上
        await era.printAndWait(
          `「哈啊…啊…嗯…不行啊…这样…放进去的话…啊…啊啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}因为肛门被肛珠一粒粒的插入而发出微微的喘息`,
        );
      } else {
        await era.printAndWait(
          `「嗯…啊啊…全部都进来了…啊，喂…难道…拔出的时候…会全部…一口气抽出…啊啊！」`,
        );
        await era.printAndWait(`直觉不错的${target_name}开始未来感到恐惧………`);
      }
      kojo.肛珠 = 1; // CFLAG:TARGET:320 = 1
      return 0;
    }
    // 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.肛珠 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱＋A感覚Lv3以上
      await era.printAndWait(
        `「啊啊啊…快点…全都插进来…啊啊…啊…我的肛门…嗯…啊嗯${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}因为肛门被肛珠一粒粒的插入而发出微微的喘息`,
      );
      await era.printAndWait(
        `「啊…啊啊…全部放进来了吧？放进来了吧？…啊啊…尽情地拉出去吧…${heart(1)}」`,
      );
      kojo.肛珠 = 7; // CFLAG:320 = 7
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.肛珠 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait(`「嗯…啊啊…我的肛门…啊…进来了………${heart(1)}」`);
      await era.printAndWait(
        `${target_name}因为肛门被肛珠一粒粒的插入而发出微微的喘息`,
      );
      await era.printAndWait(`「嗯啊…如果被拔出来的话…我会变的奇怪的………」`);
      kojo.肛珠 = 6; // CFLAG:320 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.肛珠 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋A感覚Lv3以上
      await era.printAndWait(
        `「我的肛门…嗯…被这样插进来的话…好舒服…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}因为肛门被肛珠一粒粒的插入而发出微微的喘息`,
      );
      await era.printAndWait(
        `「啊啊…好，好可怕…这样被你拔出的话，变得很奇怪的${heart(1)}」`,
      );
      kojo.肛珠 = 5; // CFLAG:320 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.肛珠 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait(`「啊…嗯…感觉，好奇怪啊…啊啊啊」`);
      await era.printAndWait(
        `${target_name}因为肛门被肛珠一粒粒的插入而发出微微的喘息`,
      );
      await era.printAndWait(`「啊啊…尽情…拔出来呀…啊啊………」`);
      kojo.肛珠 = 4; // CFLAG:320 = 4
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.肛珠 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // A感覚Lv3以上
      await era.printAndWait(
        `「快、快停下…啊啊…再继续的话…我的屁股要变得奇怪了…啊啊啊」`,
      );
      await era.printAndWait(
        `${target_name}的肛门随着${player_name}把珠子塞进去，不停的颤抖着……`,
      );
      kojo.肛珠 = 3; // CFLAG:320 = 3
    } else if (kojo.肛珠 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外
      await era.printAndWait(`「啊…不要…不要这样…不要弄坏我的屁股…啊啊啊！」`);
      await era.printAndWait(
        `${target_name}想起以前肛珠被拔出的感觉让她不自觉夹紧了肛门，但${player_name}仍然认真的把肛珠一个个的塞了进去`,
      );
      kojo.肛珠 = 2; // CFLAG:320 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 19 && era0(`tequip:${target}:19`) == 0) {
    // 肛珠 脱着時 CFLAG:379
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.肛珠着脱 < 4 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「啊啊${heart(1)} …啊…啊啊………嗯…啊啊………」`);
      await era.printAndWait(`${target_name}满脸陶醉的表情流着口水………`);
      kojo.肛珠着脱 = 4; // CFLAG:379 = 4
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.肛珠着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「啊啊…我的肛门…啊啊…啊啊…好…好舒服………${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}满脸陶醉的神情`);
      kojo.肛珠着脱 = 3; // CFLAG:379 = 3
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.肛珠着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「啊…啊…啊啊啊——！！屁股…我的屁股…好舒服！」`);
      await era.printAndWait(`${target_name}高高翘起的翘起屁股并发出呻吟`);
      kojo.肛珠着脱 = 2; // CFLAG:379 = 2
    } else if (kojo.肛珠着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「啊…啊啊…啊…咕…我…我的屁股…要坏掉了………」`);
      await era.printAndWait(
        `${target_name}因为被一口气拔出肛珠的痛苦，眼睛里含着泪`,
      );
      kojo.肛珠着脱 = 1; // CFLAG:379 = 1
    }
    return 0;
  } else if (era_flag.selectcom == 20) {
    // 正常位 CFLAG:321
    if (kojo.正常位 == 0) {
      // 初めて
      if (era0(`talent:${target}:0`) == 1) {
        // 处女
        if (era0(`talent:${target}:314`) == 9) {
          // 魔族
          if (era0(`talent:${target}:76`) == 1) {
            await era.printAndWait(
              `${player_name}分开${target_name}的双腿押着膝盖，插入的时候像为了展现给她看一样，每次都是缓缓的沉入。`,
            );
            await era.printAndWait(
              `「啊啊啊啊…我的魔族小穴…被你的…被魔王大人的阴茎插进来了…啊啊…再深一点${heart(1)} 让我变成你的东西吧${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}流着口水，为了迎合${player_name}而腰上下动着腰。`,
            );
            await era.printAndWait(
              `然后${player_name}如${target_name}所愿，贯穿了处女膜，一口气插入到最深处。`,
            );
            await era.printAndWait(
              `「嗯…啊…啊嗯！插到…插到最深处了…你的阴茎…啊啊啊…啊…啊啊——${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}因为破瓜的疼痛和还不知道男性的小穴被贯穿的刺激而发出了悲鸣`,
            );
            await era.printAndWait(
              `${player_name}紧紧地把阴茎插入深处并把魔力释放了出去`,
            );
            await era.printAndWait(
              `已经是魔族的${target_name}的身体内部染上了${player_name}的魔力的色彩。`,
            );
            await era.printAndWait(
              `「还想更多的感受…你的阴茎…继续…继续动啊…啊啊啊${heart(1)}」`,
            );
          } else if (era0(`talent:${target}:85`) == 1) {
            await era.printAndWait(
              `${target_name}像是等${player_name}等得不耐烦了似的张开自己的大腿迎接着${player_name}。`,
            );
            await era.printAndWait(`「这是我的第一次哟…魔王大人${heart(1)}」`);
            await era.printAndWait(
              `${player_name}和${target_name}抱在一起，把阴茎慢慢地插下去。`,
            );
            await era.printAndWait(
              `「啊…啊啊…你的阴茎进来了…啊…啊啊…啊啊——！${heart(1)}」`,
            );
            await era.printAndWait(
              `${player_name}贯穿了${target_name}的处女膜，把阴茎插进了深处了。`,
            );
            await era.printAndWait(
              `「啊嗯…啊啊…没关系的…感觉你在我体内…啊…啊啊啊…有什么要来了…要来了！？」`,
            );
            await era.printAndWait(
              `${player_name}紧紧地把阴茎插入深处，慢慢的放出了魔力。`,
            );
            await era.printAndWait(
              `已经是魔族的${target_name}的身体内部染上了${player_name}的魔力的色彩。`,
            );
            await era.printAndWait(
              `「啊啊…我…真正的成为你的东西了呢${heart(1)}」`,
            );
          } else {
            await era.printAndWait(
              `${player_name}为了强行分开${target_name}的双腿而押着她的膝盖，插入的时候像是要展示她看一样，慢慢的挤了进去`,
            );
            await era.printAndWait(
              `「啊…啊…咕…呜啊…呼，好粗…插进来了…啊…啊啊…啊啊——！」`,
            );
            await era.printAndWait(
              `听着${target_name}发出的哭喊声${player_name}把她的处女膜慢慢地捅破。插在深处的阴茎慢慢的释放出了魔力。`,
            );
            await era.printAndWait(
              `然后${target_name}的魔族的眼睛里不停流出大颗的泪珠`,
            );
            await era.printAndWait(
              `「让我受到…这样的…屈辱…啊啊…不要…不要动啊…嗯…啊…好、好疼…啊…咕…啊啊——」`,
            );
            await era.printAndWait(
              `${player_name}为了让${target_name}好好明白谁才是主人，慢慢的开始了抽送阴茎`,
            );
          }
        } else if (era0(`talent:${target}:76`) == 1) {
          // 人間
          await era.printAndWait(
            `${player_name}分开${target_name}的双腿押着膝盖，插入的时候像为了展现给她看一样，每次都是缓缓的沉入。`,
          );
          await era.printAndWait(
            `「啊啊啊啊…我的小穴…被你的…被魔王大人的阴茎插进来了…啊啊…再深一点${heart(1)} 让我变成你的东西吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}流着口水，为了迎合${player_name}而腰上下动着腰。`,
          );
          await era.printAndWait(
            `然后${player_name}如${target_name}所愿，贯穿了处女膜，一口气插入到最深处。`,
          );
          await era.printAndWait(
            `「嗯…啊啊…啊嗯——！插到…插到深处来了…你的应尽…啊啊…啊…啊啊啊——${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}因为破瓜的疼痛和还不知道男性的小穴被贯穿的刺激而发出了悲鸣`,
          );
          await era.printAndWait(
            `「还想更多的感受…你的阴茎…继续…继续动啊…啊啊啊${heart(1)}」`,
          );
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `${target_name}像是等${player_name}等得不耐烦了似的张开自己的大腿迎接着${player_name}。`,
          );
          await era.printAndWait(`「这是我的第一次哟…魔王大人${heart(1)}」`);
          await era.printAndWait(
            `${player_name}和${target_name}抱在一起，把阴茎慢慢地插下去。`,
          );
          await era.printAndWait(
            `「啊…啊啊…你的阴茎进来了…啊…啊啊…啊啊——！${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}贯穿了${target_name}的处女膜，把阴茎插进了深处了。`,
          );
          await era.printAndWait(
            `「啊嗯…啊啊…没关系的…我已经习惯疼痛了…啊…继续动…让我感受你吧${heart(1)}」`,
          );
          await era.printAndWait(`${player_name}听到这句话后开始慢慢的抽送`);
          await era.printAndWait(`「啊啊…我…好高兴…好幸福………${heart(1)}」`);
        } else {
          await era.printAndWait(
            `${player_name}为了强行分开${target_name}的双腿而押着她的膝盖，插入的时候像是要展示她看一样，慢慢的挤了进去`,
          );
          await era.printAndWait(
            `「啊…啊…咕…呜啊…呼，好粗…插进来了…啊…啊啊…啊啊——！」`,
          );
          await era.printAndWait(
            `听着${target_name}发出的哭喊声${player_name}把她的处女膜慢慢地捅破。插在深处的阴茎慢慢的释放出了魔力。`,
          );
          await era.printAndWait(
            `然后${target_name}的眼睛里不停流出大颗的泪珠`,
          );
          await era.printAndWait(
            `「让我受到…这样的…屈辱…啊啊…不要…不要动啊…嗯…啊…好、好疼…啊…咕…啊啊——」`,
          );
          await era.printAndWait(
            `${player_name}像是为了给${target_name}刻上痛苦一样，慢慢的开始了抽送阴茎`,
          );
        }
      } else if (era0(`talent:${target}:76`) == 1) {
        // 非处女
        await era.printAndWait(
          `${player_name}分开${target_name}的双腿押着膝盖，插入的时候像为了展现给她看一样，每次都是缓缓的沉入。`,
        );
        await era.printAndWait(
          `「啊嗯……我的小穴被你的阴茎插进来了${heart(1)} 啊啊啊啊…啊——${heart(1)}」`,
        );
        await era.printAndWait(
          `因为被${player_name}的阴茎插入盗深处而她露出笑容的${target_name}已经完全是色情狂了。`,
        );
        await era.printAndWait(
          `「哈啊…更多…更多地侵犯我吧…啊啊啊${heart(1)}」`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「嗯…紧紧地抱住我…啊啊…更多的侵犯我的小穴吧…啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}用两条腿夹住${player_name}的腰，紧紧地抱住他。`,
        );
        await era.printAndWait(
          `「啊…嗯…能感受到你我好高兴啊…啊…啊啊……${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `${player_name}为了强行分开${target_name}的双腿而押着她的膝盖，插入的时候像是要展示她看一样，慢慢的挤了进去。`,
        );
        await era.printAndWait(`「嗯…咕…嗯…这么深…啊…啊啊！」`);
        await era.printAndWait(`「嗯咕…好深…被你插的好满…啊…啊啊啊！」`);
      }
      kojo.正常位 = 1; // CFLAG:321 = 1
      return 0;
    }
    // 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.正常位 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱（RAND:3 三选一，各分支内嵌 ABL:2 分档）
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `${player_name}分开${target_name}的双腿押着膝盖，插入的时候像为了展现给她看一样，每次都是缓缓的沉入。`,
        );
        await era.printAndWait(
          `「啊嗯……我的小穴被你的阴茎插进来了${heart(1)} 啊啊啊啊…啊——${heart(1)}」`,
        );
        await era.printAndWait(
          `因为被${player_name}的阴茎插入盗深处而她露出笑容的${target_name}已经完全是色情狂了。`,
        );
        await era.printAndWait(
          `「哈啊…更多…更多地侵犯我吧…啊啊啊${heart(1)}」`,
        );
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「啊…啊嗯${heart(1)}更多，更多的塞满我的女阴吧…嗯…啊${heart(1)}」`,
          );
        }
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「啊啊啊…更激烈点…我要坏掉了…要坏掉了${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}用两条腿夹住${player_name}的腰，紧紧地抱住他。`,
        );
        await era.printAndWait(
          `「嗯呼…到我去为止…都不会放开的…嗯…啊啊啊…嗯啊…啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${player_name}开始了抽送，${target_name}的腔壁摩擦着阴茎。`,
        );
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「啊啊${heart(1)} 我的小穴~…已经记住你的形状了${heart(1)} 啊嗯…啊啊啊…啊…不行…我不想和你分开！…嗯…啊啊啊${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊啊…再激烈点${heart(1)} 啊~…把女阴被弄得乱七八糟的…就这样记住你的阴茎的形状吧${heart(1)}」`,
          );
        }
      } else {
        await era.printAndWait(
          `「啊…啊…嗯…你的拥抱太舒服了…我要变得奇怪了…啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}下流的分开双腿，${player_name}就这样被侵犯着她。`,
        );
        await era.printAndWait(
          `口水从口中流了出来，每次插到深处都让她发出呻吟`,
        );
        await era.printAndWait(
          `「嗯…嗯啊…啊…继续…继续侵犯我…我要变得奇怪了${heart(1)}」`,
        );
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `${target_name}的秘裂不停的包裹着，催促${player_name}的阴茎射精。`,
          );
          await era.printAndWait(
            `「啊嗯…恩…在我里面射出来…想要你的精液啊${heart(1)} ……想要啊${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `${target_name}用脚缠着${player_name}，发出了喘息。`,
          );
          await era.printAndWait(
            `「啊嗯，啊…已经记住你阴茎的形状和味道了，继续侵犯我吧…啊——${heart(1)}」`,
          );
        }
      }
      kojo.正常位 = 6; // CFLAG:321 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.正常位 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕（RAND:3 三选一，各分支内嵌 ABL:2 分档）
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「嗯…紧紧地抱住我…啊啊…更多的侵犯我的小穴吧…啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}用两条腿夹住${player_name}的腰，紧紧地抱住他。`,
        );
        await era.printAndWait(
          `「啊…嗯…能感受到你我好高兴啊…啊…啊啊……${heart(1)}」`,
        );
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「继续…来吧…让我里面满满的都是你吧…啊啊${heart(1)}」`,
          );
        }
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `${target_name}抓着自己的膝盖分开双腿，诱惑着${player_name}。`,
        );
        await era.printAndWait(
          `「呐…快来疼爱我吧…我的身体已经全部都是你的东西，所以不必客气哦${heart(1)} …啊…啊啊啊啊！」`,
        );
        await era.printAndWait(
          `${player_name}和${target_name}的双手互相牵着，慢慢的开始抽送`,
        );
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「嗯啊…啊…啊${heart(1)} 再激烈一点啊…啊啊…啊嗯…啊啊${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊…嗯…你…好温柔呢…啊嗯…继续照你的想法的来坐也可以…啊啊啊${heart(1)}」`,
          );
        }
      } else {
        await era.printAndWait(
          `「啊…啊啊嗯…嗯…嗯…好深…你的插到深处了…啊啊…嗯啊啊嗯${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}因为被${player_name}蹂躏着深处的深处而露出了快要融化一样的表情。`,
        );
        await era.printAndWait(
          `「再…激烈一点…把我哪里搅动得黏糊糊的吧…啊啊…${heart(1)}」`,
        );
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「啊嗯${heart(1)} …呀啊啊啊${heart(1)} …嗯…啊啊…我…被你的…啊啊、啊啊啊啊${heart(1)}」`,
          );
        }
      }
      kojo.正常位 = 5; // CFLAG:321 = 5
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      era0(`abl:${target}:2`) >= 3 &&
      (kojo.正常位 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 屈服刻印Lv3＋V感覚Lv3以上（RAND:2 二选一）
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `${player_name}命令${target_name}分开双腿，插入的时候像为了展现给她看一样，每次都是缓缓的沉入。`,
        );
        await era.printAndWait(
          `「啊啊…插进来了…你的…啊啊…啊…嗯…啊嗯…啊啊啊啊」`,
        );
        await era.printAndWait(
          `「不、不是的…我才不…啊…啊啊啊…不可能有感觉…啊…呀啊啊啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}被${player_name}刺入深处而发出的可爱呻吟，被${player_name}高兴的听在耳里。`,
        );
      } else {
        await era.printAndWait(
          `${player_name}分开${target_name}的双腿押着膝盖，插入的时候像为了展现给她看一样，每次都是缓缓的沉入。`,
        );
        await era.printAndWait(
          `「嗯…嗯…只是这种程度…啊嗯♪…就以为我会成为你的东西的话…啊啊♪…就大错特错了…啊嗯」`,
        );
        await era.printAndWait(
          `${target_name}随着抽送而发出快乐的声音，小穴紧紧包裹着${player_name}的阴茎。`,
        );
        await era.printAndWait(
          `「啊啊…啊嗯…嗯啊啊…不行啊…这么激烈的话…啊啊——」`,
        );
      }
      kojo.正常位 = 4; // CFLAG:321 = 4
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      (kojo.正常位 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 屈服刻印Lv3
      await era.printAndWait(
        `${player_name}命令${target_name}分开双腿，插入的时候像为了展现给她看一样，每次都是缓缓的沉入。`,
      );
      await era.printAndWait(
        `「啊啊…要侵犯的话就再稍微…温柔点啊…嗯…嗯…啊啊…嗯啊…啊啊啊——！」`,
      );
      await era.printAndWait(
        `${target_name}因为${player_name}的上面不停的动着而发出了悲鸣`,
      );
      await era.printAndWait(`「啊…啊啊…嗯…以、已经…啊啊…啊…啊啊啊——」`);
      kojo.正常位 = 3; // CFLAG:321 = 3
    } else if (kojo.正常位 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外
      await era.printAndWait(
        `${player_name}为了强行分开${target_name}的双腿而押着她的膝盖，插入的时候像是要展示她看一样，慢慢的挤了进去。`,
      );
      await era.printAndWait(`「啊…啊啊…我…被侵犯了…啊啊…啊…嗯…啊，啊啊啊！」`);
      await era.printAndWait(`${target_name}因为${player_name}抽送而发出呻吟`);
      await era.printAndWait(`「啊…哈…咕…嗯…啊啊…嗯…嗯…啊啊——！！」`);
      kojo.正常位 = 2; // CFLAG:321 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 21) {
    // 背后位 CFLAG:322
    if (kojo.背后位 == 0) {
      // 初めて
      if (era0(`talent:${target}:0`) == 1) {
        // 处女
        if (era0(`talent:${target}:314`) == 9) {
          // 魔族
          if (era0(`talent:${target}:76`) == 1) {
            await era.printAndWait(
              `${player_name}抓住${target_name}的腰慢慢的插进了她的小穴。${target_name}敏感的竖起了尾巴。`,
            );
            await era.printAndWait(
              `「啊嗯…别那么急啦…我可是一直都在等你侵犯我啊…啊嗯${heart(1)}」`,
            );
            await era.printAndWait(
              `${player_name}的阴茎慢慢插入了${target_name}。扑哧一声${target_name}的处女膜破了。`,
            );
            await era.printAndWait(
              `「嗯、啊啊${heart(1)} 进来了，你的太粗了…啊啊${heart(1)} 虽然很痛不过没关系的…啊啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}因为破瓜的疼痛和连最深处都被贯穿的触感而发出了娇喘。`,
            );
            await era.printAndWait(
              `「啊啊嗯嗯啊啊啊…啊啊嗯…快点动起来…侵犯我里面吧…啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${player_name}把阴茎插入最深处，缓缓的放出了魔力。`,
            );
            await era.printAndWait(
              `已经是魔族的${target_name}的身体内部染上了${player_name}的魔力的色彩。`,
            );
            await era.printAndWait(
              `「你的魔力在我体内…变热了…啊啊…嗯…啊——${heart(1)}」`,
            );
            await era.printAndWait(`${target_name}舒服得张开了背后的翅膀。`);
            await era.printAndWait(
              `看着她这个样子，${player_name}慢慢开始抽送阴茎…`,
            );
          } else if (era0(`talent:${target}:85`) == 1) {
            await era.printAndWait(
              `${player_name}抓住${target_name}的腰慢慢的插进了她的小穴。${target_name}敏感的竖起了尾巴。`,
            );
            await era.printAndWait(
              `「啊嗯…啊啊…没关系…把我的…我的第一次…拿走…啊啊…快、快点…${heart(1)}」`,
            );
            await era.printAndWait(
              `${player_name}的阴茎慢慢插入了${target_name}。扑哧一声${target_name}的处女膜破了。`,
            );
            await era.printAndWait(
              `「嗯…啊咕…嗯你的…全部在我里面…啊嗯…啊啊…已经习惯疼痛了，所以…动起来吧…把我变成你的东西吧！」`,
            );
            await era.printAndWait(
              `${player_name}把阴茎插入最深处，缓缓的放出了魔力。`,
            );
            await era.printAndWait(
              `已经是魔族的${target_name}的身体内部染上了${player_name}的魔力的色彩。`,
            );
            await era.printAndWait(
              `「你那温暖的魔力在我体内…啊…不行了，快点动起来侵犯我的里面吧…啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}忍耐不住的发出了恳求的声音。`,
            );
            await era.printAndWait(
              `${player_name}默默地笑着并慢慢的用阴茎开始抽送………`,
            );
          } else {
            await era.printAndWait(
              `${player_name}缓缓的把阴茎沉入${target_name}的阴道。${target_name}焦急的摇起了尾巴，${player_name}握住了它。`,
            );
            await era.printAndWait(
              `「啊咕…不、不要做这种不上不下的事情…快点插进来把！…啊啊…嗯…啊啊啊」`,
            );
            await era.printAndWait(
              `听到这句话${player_name}抓住${target_name}的腰一口气贯穿到最深处。${target_name}的处女膜扑哧一声被捅破了。`,
            );
            await era.printAndWait(
              `「啊…啊啊…嗯…嗯啊…嗯…啊啊…这…么…痛什么的…啊咕…咕嗯」`,
            );
            await era.printAndWait(
              `${target_name}因为破瓜的疼痛而发出了哭喊，哭喊声在${player_name}的耳边回响着。`,
            );
            await era.printAndWait(
              `然后${player_name}的阴茎释放出的魔力从${target_name}的腔内深处开始，慢慢的侵蚀着身体内部。`,
            );
            await era.printAndWait(
              `「嗯啊…啊啊…总觉…好温暖…明明是被侵犯…被凌辱…我要变得奇怪了…啊啊啊…」`,
            );
            await era.printAndWait(
              `${player_name}为了让${target_name}好好明白谁才是主人，慢慢的开始了抽送阴茎`,
            );
          }
        } else if (era0(`talent:${target}:76`) == 1) {
          // 人間
          await era.printAndWait(
            `${player_name}抓住${target_name}的腰，慢慢的把阴茎差劲了蜜裂。`,
          );
          await era.printAndWait(
            `「啊嗯…别那么急啦…我可是一直都在等你侵犯我啊…啊嗯${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}的阴茎慢慢插入了${target_name}。扑哧一声${target_name}的处女膜破了。`,
          );
          await era.printAndWait(
            `「嗯、啊啊${heart(1)} 进来了，你的太粗了…啊啊${heart(1)} 虽然很痛不过没关系的…啊啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}因为破瓜的疼痛和连最深处都被贯穿的触感而发出了娇喘。`,
          );
          await era.printAndWait(
            `「啊啊嗯嗯啊啊啊…啊啊嗯…快点动起来…侵犯我里面吧…啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `看着她这个样子，${player_name}慢慢开始抽送阴茎…`,
          );
          await era.printAndWait(
            `「嗯…啊啊…不用这么慢也…啊嗯…我…想要更激烈点啊${heart(1)}」`,
          );
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `${player_name}抓住${target_name}的腰慢慢的插进了她的小穴。${target_name}敏感的屁股颤抖了起来。`,
          );
          await era.printAndWait(
            `「啊嗯…啊啊…没关系…把我的…我的第一次…拿走…啊啊…快、快点…${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}的阴茎慢慢插入了${target_name}。扑哧一声${target_name}的处女膜破了。`,
          );
          await era.printAndWait(
            `「嗯…啊咕…嗯你的…全部在我里面…啊嗯…啊啊…已经习惯疼痛了，所以…动起来吧…把我变成你的东西吧！」`,
          );
          await era.printAndWait(
            `${target_name}忍耐不住的恳求的声音扭动着腰，虽然${player_name}努力的压着，但是还是没压住。`,
          );
          await era.printAndWait(
            `「求你了…侵犯我吧…啊啊…我等这一天已经很久了…啊啊——${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}默默地笑着并慢慢的用阴茎开始抽送………`,
          );
          await era.printAndWait(
            `「嗯…啊嗯…你的快动起来…啊…啊啊…刺进来…啊嗯…啊啊…嗯…嗯…啊啊——${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `${player_name}缓缓的把阴茎沉入${target_name}的小穴。${target_name}她着急的扭着腰，所以${player_name}紧紧的抓住她的腰。`,
          );
          await era.printAndWait(
            `「啊咕…不、不要做这种不上不下的事情…快点插进来把！…啊啊…嗯…啊啊啊」`,
          );
          await era.printAndWait(
            `听到这句话${player_name}抓住${target_name}的腰一口气贯穿到最深处。${target_name}的处女膜扑哧一声被捅破了。`,
          );
          await era.printAndWait(
            `「啊…啊啊…嗯…嗯啊…嗯…啊啊…这…么…痛什么的…啊咕…咕嗯」`,
          );
          await era.printAndWait(
            `${target_name}因为破瓜的疼痛而发出了哭喊，哭喊声在${player_name}的耳边回响着`,
          );
          await era.printAndWait(
            `「啊啊啊啊…我的…第一次就这样…嗯…还、还不要动…啊啊…不要」`,
          );
          await era.printAndWait(
            `${player_name}为了让${target_name}好好的清楚谁是主人，阴茎再次开始抽送`,
          );
        }
      } else if (era0(`talent:${target}:76`) == 1) {
        // 非处女
        await era.printAndWait(
          `「嗯…从我后面侵犯我吧…嗯啊…啊嗯…阴茎好棒…你的阴茎好棒啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}为了让${player_name}更加容易侵犯一样，高高抬起了腰。`,
        );
        await era.printAndWait(
          `「嗯…啊啊…这、这样…这样好舒服…更多的侵犯我吧${heart(1)}」`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「啊…从后面什么的…看不到你的脸好可怕…啊嗯…啊…啊啊嗯${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被${player_name}从后面抓住双臂，就那样侵犯着。`,
        );
        await era.printAndWait(
          `「嗯…啊…啊啊…不行…的啊…要是更激烈的话…我…就会…啊啊——」`,
        );
      } else {
        await era.printAndWait(
          `「哼…男的都喜欢从后面侵犯女人呢…嗯…咕…啊啊…不、不要…嗯…啊啊」`,
        );
        await era.printAndWait(
          `「这么激烈…嗯…啊啊…不…不行啊…啊啊…咕痛啊…嗯…啊啊——」`,
        );
        await era.printAndWait(
          `${player_name}压住${target_name}的后颈，腰更加激烈的动了起来……`,
        );
      }
      kojo.背后位 = 1; // CFLAG:322 = 1
      return 0;
    }
    // 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.背后位 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱（RAND:3 三选一，各分支内嵌 ABL:2 分档）
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「继续…继续从后面侵犯我吧…嗯啊…啊嗯…阴茎好棒…你的阴茎好棒${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}为了让${player_name}更加容易侵犯一样，高高抬起了腰。`,
        );
        await era.printAndWait(
          `「嗯…啊啊…这、这样…这样好舒服…更多的侵犯我吧${heart(1)}」`,
        );
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `每次被${player_name}的腰撞到，${target_name}的蜜裂都会有爱液飞散出来。`,
          );
          await era.printAndWait(
            `「啊啊啊…啊嗯…啊…啊啊——${heart(1)} 这样好舒服${heart(1)}」`,
          );
          await era.printAndWait(
            `「往更深的地方插进去，我的小穴要坏了…要坏了啊${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「把我的小穴弄得更加乱七八糟的${heart(1)} 变成你中意的小穴吧${heart(1)}」`,
          );
        }
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「啊啊…嗯…继续…继续…侵犯我吧${heart(1)}」`);
        await era.printAndWait(
          `${target_name}被${player_name}从后面抓住双臂，就那样侵犯着。`,
        );
        await era.printAndWait(
          `「用你的阴茎让我更加疯狂吧…啊啊…啊啊——${heart(1)}」`,
        );
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `每次被${player_name}的腰撞到，${target_name}的蜜裂都会有爱液飞散出来。`,
          );
          await era.printAndWait(
            `「啊啊…你的阴茎是最棒的${heart(1)}不要再拔出来，一直侵犯我吧${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊嗯…啊啊…嗯…嗯…那里…继续插进更深的地方…让我发疯吧${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「嗯…啊啊…嗯啊…嗯…嗯…嗯…继续使用我的小穴吧${heart(1)}」`,
          );
        }
      } else {
        await era.printAndWait(
          `「问…我已经不行了…啊、明明已经说了不行了…啊嗯…啊啊啊」`,
        );
        await era.printAndWait(
          `${target_name}好像受不了了，精疲力尽的趴在地板上。但是${player_name}却不允许${target_name}休息，继续动着腰`,
        );
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「啊啊…这么做的话我就要被弄坏了…被你的阴茎弄坏了…啊啊…啊…啊啊啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被${player_name}侵犯着，发出疯了一样的娇喘。`,
          );
          await era.printAndWait(
            `「啊…啊啊…呀啊啊啊…小穴不行了啊啊…阴茎…阴茎继续…啊啊——${heart(1)}」`,
          );
          await era.printAndWait(
            `随着蜜裂发出扑哧扑哧的声音，${target_name}的爱液在地板上的面积越来越大。`,
          );
        } else {
          await era.printAndWait(
            `「啊…啊啊啊…阴茎在里面摩擦着…我的小穴要变得奇怪了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}像青蛙一样张着腿，从后面被侵犯着……`,
          );
        }
      }
      kojo.背后位 = 6; // CFLAG:322 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.背后位 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕（RAND:3 三选一，各分支内嵌 ABL:2 分档）
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「啊…从后面什么的…看不到你的脸好可怕…啊嗯…啊…啊啊嗯。${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被${player_name}从后面抓住双臂，就那样侵犯着。`,
        );
        await era.printAndWait(
          `「嗯…啊…啊啊…不行…的啊…要是更激烈的话…我…就会…啊啊——」`,
        );
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `${target_name}被开发过的蜜裂像是不想${player_name}的阴茎离开一样吸附了过来。`,
          );
          await era.printAndWait(
            `「啊嗯…啊啊…插到深处来吧…嗯…啊啊${heart(1)} 嗯啊…已经不行了…不行了啊${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「请、请再温柔一点…啊啊…被插得这么深…好痛…啊嗯…啊啊」`,
          );
          await era.printAndWait(
            `${target_name}因为蜜裂开发的还不够而发出了疲劳和痛苦的声音`,
          );
        }
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「被你从后面侵犯什么的…啊啊…好棒…你的好棒${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被${player_name}从抓住腰，一次次的从后面插着，随着撞击${target_name}屁股的声音，从蜜裂里不断飞溅出了爱液。`,
        );
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「我…被侵犯的好舒服…啊啊…继续侵犯我吧${heart(1)}」`,
          );
          await era.printAndWait(
            `从后面被侵犯着露出阿黑颜的${target_name}，那个样子已经完全看不出酷酷的女忍者的影子了。`,
          );
          await era.printAndWait(
            `「啊嗯…啊啊…嗯${heart(1)} 我已经…被你抱着就变得奇怪了${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊…嗯…啊咕…虽然有点痛…但是被你侵犯的话…就没事、没问题的…啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}听到这句话更加用力插进了${target_name}的小穴。`,
          );
          await era.printAndWait(`「嗯…啊啊…坏心眼…你真是坏心眼的…啊啊——」`);
        }
      } else {
        await era.printAndWait(
          `${player_name}抓住${target_name}的屁股慢慢抽送着阴茎。`,
        );
        await era.printAndWait(
          `「嗯…啊…啊啊…嗯…啊啊啊啊啊…${heart(1)} 你的插进来了…啊啊」`,
        );
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「啊啊…你好温柔啊…啊嗯…恩…这种程度的话…啊嗯…啊啊…是不会痛的…嗯…啊嗯${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一边从蜜裂滴下爱液，一边发出了喘息声`,
          );
          await era.printAndWait(
            `「嗯啊…被你这样疼爱的话…我要…变得黏糊糊的了…啊啊${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「在激烈一点…侵犯我吧…不要这么慢得让我着急啊」`,
          );
          await era.printAndWait(
            `${target_name}厚着脸皮恳求着${player_name}。这个样子如果让她以前的同伴们看到了，会是什么反应呢？`,
          );
          await era.printAndWait(
            `「我想要你慢慢的爱…所以想要你更激烈…啊…啊啊…来了…来了啊${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊嗯${heart(1)}啊啊啊${heart(1)}…把我当做野兽那样…啊…啊嗯…激烈也可以${heart(1)}」`,
          );
        }
      }
      kojo.背后位 = 5; // CFLAG:322 = 5
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      era0(`abl:${target}:2`) >= 3 &&
      (kojo.背后位 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 屈服刻印Lv3＋V感覚Lv3以上（RAND:2 二选一）
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「嗯…嗯咕…啊啊…啊…嗯…嗯…啊啊啊…不、不行…如果再激烈的话…啊啊…啊啊——」`,
        );
        await era.printAndWait(
          `${target_name}因为被开发的蜜裂被侵犯着而忍不住发出了快乐的声音`,
        );
        await era.printAndWait(
          `「啊嗯…恩…啊啊…不行…不行啊…这样输了的话…啊…啊啊——♪」`,
        );
        await era.printAndWait(
          `随着${player_name}从后面一次次突刺，${target_name}发出了尖锐的叫声……`,
        );
      } else {
        await era.printAndWait(
          `「嗯…啊…啊啊…不能有感觉…但是…啊…从背后被侵犯…我…啊啊…嗯♪」`,
        );
        await era.printAndWait(
          `${target_name}满脸不情愿的摇着头，但被开发了的蜜裂却把${player_name}的阴茎吸在里面，不愿放开。`,
        );
        await era.printAndWait(
          `「啊啊…嗯…不行…快点拔出去…我会变得奇怪的…啊啊呀嗯啊啊啊♪」`,
        );
        await era.printAndWait(
          `「嗯…嗯啊…啊啊…不能输…才不能就这样认输…嗯…啊…啊啊啊…啊♪」`,
        );
      }
      kojo.背后位 = 4; // CFLAG:322 = 4
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      (kojo.背后位 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 屈服刻印Lv3
      await era.printAndWait(`「啊啊…啊…嗯…嗯咕…咕…嗯！」`);
      await era.printAndWait(
        `${target_name}被${player_name}从后面抓着腰侵犯着。大概是作为最低限度的抵抗而尽量不发出着声音`,
      );
      await era.printAndWait(`「我不能…就这样…输掉…嗯…嗯…咕…嗯…嗯——！」`);
      kojo.背后位 = 3; // CFLAG:322 = 3
    } else if (kojo.背后位 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外
      await era.printAndWait(
        `${target_name}被${player_name}按着后颈，就这样不停的侵犯着`,
      );
      await era.printAndWait(`「嗯咕…嗯…啊啊…咕…嗯…住、助手…啊…啊咕…嗯」`);
      await era.printAndWait(
        `${player_name}听着${target_name}痛苦的声音，就那样很舒服的继续动着腰……`,
      );
      kojo.背后位 = 2; // CFLAG:322 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 22) {
    // 对面座位 CFLAG:323（初めて分支无种族细分，仅处女/非处女两档）
    if (kojo.对面座位 == 0) {
      // 初めて
      if (era0(`talent:${target}:0`) == 1) {
        // 处女（模板未填写：无台词，输出空行）
        await era.printAndWait('');
      } else if (era0(`talent:${target}:76`) == 1) {
        // 非处女
        await era.printAndWait(
          `「啊啊嗯…现在我一人独占你的阴茎了…嗯啊…嗯…啊啊…好深${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}双手双脚抱住${player_name}，自己动起了腰。`,
        );
        await era.printAndWait(
          `「嗯…啊啊…阴茎好舒服…好舒服${heart(1)} 啊啊…腰停不下来了…啊啊啊啊——」`,
        );
        await era.printAndWait(
          `${target_name}下流的摆动着腰在${player_name}的上面跳着舞………`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「啊啊…喜欢…继续抱我吧…啊啊…好棒${heart(1)}」`);
        await era.printAndWait(
          `${target_name}双手双脚紧紧地包住了${player_name}。`,
        );
        await era.printAndWait(
          `「嗯啊…吻我…吻着我疼爱我…继续抱我吧…啊啊啊…${heart(1)}」`,
        );
        await era.printAndWait(
          `${player_name}从下面往上插着${target_name}，${target_name}发出了很舒服似的声音………`,
        );
      } else {
        await era.printAndWait(`「快住手…走开…不要碰我啊…嗯…啊啊！」`);
        await era.printAndWait(
          `${target_name}虽然抵抗着，但是随着${player_name}从下往上的突刺的她已经只能紧紧抓住${player_name}来忍耐的。`,
        );
        await era.printAndWait(
          `「啊…啊啊…嗯…嗯…啊嗯…对我做这种事…以后走着瞧…啊…啊啊啊——！」`,
        );
        await era.printAndWait(
          `不论嘴里所出多么强硬的话，${target_name}已经只能随便${player_name}玩弄了………`,
        );
      }
      kojo.对面座位 = 1; // CFLAG:323 = 1
      return 0;
    }
    // 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.对面座位 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱（RAND:3 三选一，各分支内嵌 ABL:2 分档）
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「啊啊嗯…现在我一人独占你的阴茎了…嗯啊…嗯…啊啊…好深${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}双手双脚抱住${player_name}，自己动起了腰`,
        );
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「啊啊…一想到你的阴茎插进来…我就已经忍不住了…嗯啊嗯嗯——${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}下流的摆动着腰在${player_name}的上面跳着舞………`,
          );
        } else {
          await era.printAndWait(
            `「嗯啊…嗯…好深…你的阴茎…把我的小穴弄得乱七八糟的…啊啊${heart(1)}」`,
          );
        }
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「继续插我的小穴吧…这已经是你专用的小穴了…啊啊…啊啊——${heart(1)}」`,
        );
        await era.printAndWait(
          `${player_name}和${target_name}牵着手，为了贪图快乐而互相扭着腰。`,
        );
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「嗯…嗯…腰下面要融化了${heart(1)} 就这样一直粘在一起吧${heart(1)} 啊啊啊嗯…嗯啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}和${player_name}的嘴唇重合舌头缠在一起，互相黏在一起的蜜裂和嘴都发出了下流的声音`,
          );
          await era.printAndWait(
            `「嗯啾…啾…嗯啾…啾${heart(1)} …嗯…啊…啊啊…继续…把我…弄坏吧${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「你看…这样的话…啊嗯…我觉得会更舒服…啊…啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}抓住${player_name}的肩膀向后仰着，阴茎不同角度的刺入让她发出呻吟`,
          );
          await era.printAndWait(`「嗯啊…这样…好舒服…好舒服………${heart(1)}」`);
        }
      } else {
        await era.printAndWait(
          `「啊啊啊${heart(1)} 这、这么激烈的话我…啊…啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${player_name}抱住${target_name}的腰激烈地抽插`,
        );
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「啊啊嗯…啊嗯…好棒${heart(1)} 继续侵犯我的小穴…一起变得黏糊糊的吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}迎合着${player_name}的动作扭着腰，贪求着更多的快乐。`,
          );
          await era.printAndWait(`「啊嗯…啊啊…啊嗯…啊…继续…继续…${heart(1)}」`);
        } else {
          await era.printAndWait(
            `「啊啊…你…满满的在我里面…再、再继续的话…嗯…啊啊——${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}因为秘裂的强烈刺激而发出了悲鸣。`,
          );
        }
      }
      kojo.对面座位 = 6; // CFLAG:323 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.对面座位 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕（RAND:3 三选一，各分支内嵌 ABL:2 分档）
      if (rand_n(3) == 0) {
        await era.printAndWait(`「啊啊…喜欢…继续抱我吧…啊啊…好棒${heart(1)}」`);
        await era.printAndWait(
          `${target_name}双手双脚紧紧地包住了${player_name}。`,
        );
        await era.printAndWait(
          `「嗯啊…吻我…吻着我疼爱我…继续抱我吧…啊啊啊…${heart(1)}」`,
        );
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「嗯啾…啾…啊嗯…恩…啊嗯…嗯啊…我已经…不行了…要融化了…${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}离开${target_name}的嘴，唾液连起的桥在从下往上突刺的震动立刻就断开了。`,
          );
        } else {
          await era.printAndWait(
            `「嗯…嗯啾…就…啊嗯…啊啊…继续…品尝我嘴里的味道吧…嗯…${heart(1)}」`,
          );
        }
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「啊嗯…不行啊…不要动啊…和你更深的连接在一起了？感觉到了吗？…啊啊…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}这样说着，紧紧的抱住了${player_name}。`,
        );
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「啊嗯…明明说了…不要动的…啊嗯${heart(1)} 啊嗯…啊嗯${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}连自己动着腰的事情都没有察觉。`,
          );
          await era.printAndWait(
            `「啊啊！这是恶作剧太过分的惩罚么？啊嗯…啊啊…嗯…啊啊啊——${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊…你的全部都插进来了…我的肚子里慢慢的…啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的蜜裂紧紧的包裹着，品尝着${player_name}的阴茎。`,
          );
        }
      } else {
        await era.printAndWait(`「啊嗯…继续抱我吧…啊啊…好幸福…${heart(1)}」`);
        await era.printAndWait(
          `${target_name}抱住${player_name}的脖子，像要撒娇那样蹭着鼻子。`,
        );
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「啊嗯…恩…你继续侵犯我也可以…把我弄得乱七八糟的…啊嗯${heart(1)} …啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}慢慢地插了进去，享受着${target_name}黏糊糊的小穴。`,
          );
          await era.printAndWait(
            `「啊嗯…好…好棒…啊啊…我…我已经…啊啊啊啊啊${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊…你的气味${heart(1)} 真好闻…啊嗯…恩…啊啊啊…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}闻着${player_name}气味，开始扭动起了腰。`,
          );
          await era.printAndWait(`「嗯…啊嗯…你的好大…啊…啊嗯${heart(1)}」`);
        }
      }
      kojo.对面座位 = 5; // CFLAG:323 = 5
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      era0(`abl:${target}:2`) >= 3 &&
      (kojo.对面座位 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 屈服刻印Lv3＋V感覚Lv3以上（RAND:2 二选一）
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `${target_name}被${player_name}抱住腰就那样往上顶着，而无法忍受的${target_name}只能抱着${player_name}。`,
        );
        await era.printAndWait(
          `「啊…啊…嗯…嗯啊…啊啊…啊啊——！不、不要…在继续虐待我了…啊嗯…恩…啊啊」`,
        );
        await era.printAndWait(
          `${player_name}每次插一下，${target_name}已经充分开发的蜜裂都会产生出让她的脑髓都快要融化了一样的快感。`,
        );
        await era.printAndWait(`「不不行啊…啊…嗯…啊啊…嗯…嗯啊——」`);
      } else {
        await era.printAndWait(
          `「嗯啊…我明明被这么憎恨的人抱着…啊嗯…啊啊…嗯啊…却连咬牙忍住声音都做不到什么的…啊啊啊」`,
        );
        await era.printAndWait(
          `${target_name}已经充分开发的蜜裂被轻轻突刺传来的快感让她漏出了轻轻的喘息声。`,
        );
        await era.printAndWait(
          `「啊嗯…恩…嗯啊…啊啊…不要啊…不要让我…变的更奇怪了…啊啊啊——」`,
        );
        await era.printAndWait(
          `听到她的话的${player_name}抱住${target_name}的腰部更加快地抽插着。`,
        );
        await era.printAndWait(`「啊啊！不行…不行！啊啊…嗯…嗯啊…咕啊啊啊啊」`);
      }
      kojo.对面座位 = 4; // CFLAG:323 = 4
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      (kojo.对面座位 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 屈服刻印Lv3
      await era.printAndWait(
        `「嗯啊…！嗯…啊咕…啊啊！啊嗯…啊啊…咕…不要这么用力…啊！」`,
      );
      await era.printAndWait(`${target_name}被${player_name}抱着腰往上刺着。`);
      await era.printAndWait(
        `「觉得我很老实…啊嗯…所以这么激烈的话…以后…以后给我走着瞧…啊…啊咕」`,
      );
      await era.printAndWait(
        `不论嘴里所出多么强硬的话，${target_name}已经只能随便${player_name}玩弄了………`,
      );
      kojo.对面座位 = 3; // CFLAG:323 = 3
    } else if (kojo.对面座位 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外
      await era.printAndWait(`「给我走开…啊啊不要碰我…啊啊…啊！」`);
      await era.printAndWait(
        `${target_name}虽然抵抗着，但是随着${player_name}从下往上的突刺的她已经只能紧紧抓住${player_name}来忍耐的。`,
      );
      await era.printAndWait(`「咕…嗯…不要…在插进来了…啊…啊咕…嗯嗯嗯嗯——」`);
      kojo.对面座位 = 2; // CFLAG:323 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 23) {
    // 背面座位 CFLAG:324（初めて分支无种族细分，同 22；二回目含 TEQUIP:57 镜子加成）
    if (kojo.背面座位 == 0) {
      // 初めて
      if (era0(`talent:${target}:0`) == 1) {
        // 处女（模板未填写：无台词，输出空行）
        await era.printAndWait(`「」`);
      } else if (era0(`talent:${target}:76`) == 1) {
        // 非处女
        await era.printAndWait(`「啊啊…被用这种姿势抱着，太H了…${heart(1)}」`);
        await era.printAndWait(
          `${target_name}大大的分开双腿、接受着${player_name}的阴茎直到蜜裂的深处，就那样前后动着腰。`,
        );
        await era.printAndWait(
          `「啊嗯…啊啊嗯${heart(1)} 啊嗯…阴茎好舒服…好舒服啊${heart(1)}」`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「嗯啊…继续从后面抱着我吧…嗯…啊啊啊嗯${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}把身体靠向${player_name}，就这样一边动着腰一边呻吟着。`,
        );
        await era.printAndWait(
          `「嗯…啊嗯…啊啊…嗯…我…已经…啊…啊啊——${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「啊…全都进来了…啊…嗯…啊啊…啊嗯…嗯咕…咕………！」`,
        );
        await era.printAndWait(
          `看到${target_name}痛苦的样子，${player_name}从后面温柔的爱抚着她的乳房和阴蒂。`,
        );
        await era.printAndWait(
          `「嗯啊…笨、笨蛋…被碰到这种地方的话我…啊…啊…嗯…啊啊——」`,
        );
        await era.printAndWait(
          `听到${target_name}发出放松的声音，${player_name}安心的开始向上动起了腰……`,
        );
      }
      kojo.背面座位 = 1; // CFLAG:324 = 1
      return 0;
    }
    // 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.背面座位 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱（RAND:3 三选一，各分支内嵌 ABL:2 分档；末尾接 TEQUIP:57 镜子加成）
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「啊啊…只是在你面前分开两腿…就有感觉了${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}大大的分开双腿、接受着${player_name}的阴茎直到蜜裂的深处，就那样前后动着腰。`,
        );
        await era.printAndWait(
          `「啊嗯…啊啊嗯${heart(1)} 啊嗯…阴茎好舒服…好舒服啊${heart(1)}」`,
        );
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「啊嗯…恩…好舒服…小穴好舒服…小穴舒服的要受不了了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一边流着口水一边上下左右的扭着腰，品味着${player_name}的阴茎………`,
          );
        } else {
          await era.printAndWait(
            `${player_name}从后面抓住${target_name}的乳房`,
          );
          await era.printAndWait(
            `「啊嗯…继续触碰我的身体吧…啊嗯…啊嗯…我的身体全部都是你的东西…啊啊${heart(1)}」`,
          );
        }
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「啊嗯…恩啊…好舒服…啊啊…被做了这么舒服的事…我的脑袋已经变得奇怪了${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被从后面插入，身体被抚摸着，发出微微的喘息声。`,
        );
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「让我…更舒服吧${heart(1)} …继续插小穴吧…啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一边发出了不像样的声音，一边娇艳的动起了屁股`,
          );
          await era.printAndWait(
            `「啊啊嗯…已、已经忍不了了…我的小穴把你吞下去了啊${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「嗯啊…嗯…啊嗯…继续玩弄我的身体吧…嗯…啊啊${heart(1)}」`,
          );
          await era.printAndWait(`${player_name}把手伸到下面搓弄着阴蒂。`);
          await era.printAndWait(
            `「啊嗯！这样、这样好舒服…把我弄得乱七八糟的吧！」`,
          );
        }
      } else {
        await era.printAndWait(
          `「嗯…啊啊…好深…把你的…全都插进我的小穴里…啊啊——${heart(1)}」`,
        );
        await era.printAndWait(
          `${player_name}更用力的挺着腰，蹂躏着${target_name}的腔内`,
        );
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「啊啊…我只要有小穴就好…我相当品尝你阴茎味道的小穴${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一边喊着下流的词语，一边继续被${player_name}侵犯着………`,
          );
        } else {
          await era.printAndWait(
            `「嗯…嗯嗯…我的小穴…要不行了…所以继续继续来吧」`,
          );
          await era.printAndWait(
            `${player_name}的激烈抽插让${target_name}发出悲鸣一样的声音……`,
          );
        }
      }
      if (era0(`tequip:${target}:57`)) {
        if (era0(`abl:${target}:17`) >= 1) {
          await era.printAndWait(
            `「啊啊…阴茎全部插进…我的小穴·里来了…全部…啊啊——${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}因为大镜子映出的自己的姿态而兴奋着……`,
          );
        }
      }
      kojo.背面座位 = 6; // CFLAG:324 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.背面座位 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕（RAND:3 三选一，各分支内嵌 ABL:2 分档；末尾接 TEQUIP:57 镜子加成）
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「啊嗯…恩啊…好棒…继续触摸我的身体吧…嗯啊…啊啊啊嗯${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}把身体靠向${player_name}。随着${player_name}从下面动着腰，${target_name}发出了呻吟。`,
        );
        await era.printAndWait(
          `「啊嗯…啊嗯…啊啊…嗯…我…已经…啊…啊啊——${heart(1)}」`,
        );
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `${target_name}被${player_name}爱抚着身体，动着腰。`,
          );
          await era.printAndWait(
            `「啊嗯…我这个地方更舒服…啊啊${heart(1)} 啊啊${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `${target_name}的乳房和阴蒂被${player_name}爱抚着，漏出了喘息声。`,
          );
          await era.printAndWait(
            `「啊！嗯…好棒…继续疼爱我吧…啊啊………${heart(1)}」`,
          );
        }
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「嗯啊…嗯…更用力的抱紧我吧…因为从后面…看不见你的脸…啊嗯啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${player_name}从后面抱着${target_name}，用手温柔的描绘着她的身体。`,
        );
        await era.printAndWait(`「嗯…你…这么温柔…啊…啊啊…${heart(1)}」`);
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `然后${player_name}的往上顶着。${target_name}的小穴只是这样就像快要融化一样紧紧的裹住了${player_name}的阴茎。`,
          );
          await era.printAndWait(
            `「嗯${heart(1)}…啊…突然这样…啊啊啊…我会受不了的啊啊啊啊啊啊啊${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「嗯啊…好舒服啊…嗯…就这样一直和你连在一起…啊啊…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}因为身体被爱抚，被侵犯而出了神……`,
          );
        }
      } else {
        await era.printAndWait(
          `「嗯…啊嗯！插到深处来了…啊…我的里面全部…被你填满了…${heart(1)}」`,
        );
        await era.printAndWait(
          `${player_name}抓住${target_name}的双腕，阴茎插到了蜜裂的深处。`,
        );
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「嗯啊…就这样侵犯我…更多更多的侵犯我…嗯…啊…啊嗯啊…啊嗯${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}配合${player_name}的腰的动作，娇艳的动着腰，发出着喘息声。`,
          );
        } else {
          await era.printAndWait(
            `「啊啊…还、还是…很紧啊…我要被你弄坏了…所以请温柔一点…啊…啊啊嗯${heart(1)}」`,
          );
          await era.printAndWait(
            `听着那撒娇一样的话语，${player_name}抬起腰开始疼爱${target_name}……`,
          );
        }
      }
      if (era0(`tequip:${target}:57`)) {
        if (era0(`abl:${target}:17`) >= 1) {
          await era.printAndWait(
            `「啊啊…全都…看见了…我被侵犯的地方…啊啊啊——${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}因为大镜子映出的自己的姿态而兴奋着……`,
          );
        }
      }
      kojo.背面座位 = 5; // CFLAG:324 = 5
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      era0(`abl:${target}:2`) >= 3 &&
      (kojo.背面座位 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 屈服刻印Lv3＋V感覚Lv3以上（RAND:2 二选一）
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「啊…啊嗯…不、不要…再继续…啊啊…碰我的胸部了…呀…哪里也不行…啊啊」`,
        );
        await era.printAndWait(
          `${target_name}被${player_name}从后面住、一边被爱抚着乳房，一边被贯穿着`,
        );
        await era.printAndWait(
          `「啊…嗯啊…啊…不行…不行…我被这样…啊…啊嗯…啊啊——」`,
        );
        await era.printAndWait(
          `与她的意志无关，${target_name}被开发了的蜜裂产生出的快乐让她的脑袋想要融化了一样………`,
        );
      } else {
        await era.printAndWait(
          `「嗯…呢…咕…明明是被侵犯…我却…啊啊…有感觉了什么的…啊啊…啊…」`,
        );
        await era.printAndWait(
          `${target_name}开发了的蜜裂被插着而发出了喘息，感到兴奋的${player_name}咬向她的后颈，让娇喘声更大了。`,
        );
        await era.printAndWait(`「呀！啊…啊啊——！嗯…啊啊啊！」`);
        await era.printAndWait(
          `发觉被咬的时候蜜裂会包过来的${player_name}想要留下齿痕那样一次又一次的咬着……`,
        );
      }
      kojo.背面座位 = 4; // CFLAG:324 = 4
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      (kojo.背面座位 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 屈服刻印Lv3
      await era.printAndWait(
        `「嗯…嗯…啊…嗯啾…啊…嗯…啊啊…插到我的深处了…啊…咕…嗯嗯」`,
      );
      await era.printAndWait(
        `${target_name}的蜜裂被${player_name}的阴茎一直插到深处。面对因为自身重量而插进来的阴茎，${target_name}连逃走都做不到。`,
      );
      await era.printAndWait(`「啊啊…我…已经…变得奇怪了……啊啊…嗯…啊啊——」`);
      await era.printAndWait(
        `${target_name}只能被${player_name}从背后随他的想法被玩弄……`,
      );
      kojo.背面座位 = 3; // CFLAG:324 = 3
    } else if (kojo.背面座位 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外
      await era.printAndWait(`「嗯啊…嗯呼…呜！咕…啊啊！咕…呜…呜！」`);
      await era.printAndWait(
        `${target_name}被${player_name}从后面一边爱抚着乳房和阴蒂一边动着腰。因为那个刺激，她已经奄奄一息了`,
      );
      await era.printAndWait(`「快、快…住手…啊…啊咕…呜…嗯嗯嗯——！」`);
      kojo.背面座位 = 2; // CFLAG:324 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 26) {
    // 正常位肛交 CFLAG:327（无处女判定，按 A感覚/ABL:3 分档；二回目细分 7 档）
    if (kojo.正常位肛交 == 0) {
      // 初めて
      if (era0(`talent:${target}:76`) == 1) {
        // 淫乱
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊啊…继续侵犯我的肛门吧…还想要你的阴茎…啊啊——${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}久经开发的肛门轻易地把${player_name}的阴茎吞了下去，并紧紧的包裹住了`,
          );
          await era.printAndWait(
            `「啊嗯啊啊，肛门好舒服啊${heart(1)} 再快点，快点侵犯我吧${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「嗯…咕…我的肛门…被你填满了${heart(1)} 啊啊——」`,
          );
          await era.printAndWait(
            `${player_name}贯穿了${target_name}的未开发的肛门`,
          );
          await era.printAndWait(`「嗯…嗯…你还真是毫不留情啊…啊…啊…啊啊——」`);
        }
      } else if (era0(`talent:${target}:85`) == 1) {
        // 爱慕
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「嗯…咕…嗯啊${heart(1)} 啊啊…你插进来了…嗯…我的肛门里…啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}久经开发的肛门轻易地的吞下了${player_name}的阴茎`,
          );
          await era.printAndWait(
            `「嗯啊嗯啊，好好品尝…我下流的肛门吧…嗯啊${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊咕…果、果然对我来说…稍微有些早…不过我会忍耐的…啊嗯…啊啊」`,
          );
          await era.printAndWait(
            `未被开发的肛门被贯穿，${target_name}的脸因为痛苦而扭曲着。`,
          );
          await era.printAndWait(
            `${player_name}为了继续看那样的表情而开始激烈的侵犯着肛门………`,
          );
        }
      } else {
        // それ以外（爱無し）
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊啊！明明都说了好几次不是该插进这里…嗯…啊啊…咕…啊啊啊啊」`,
          );
          await era.printAndWait(
            `${player_name}按住${target_name}侵犯着肛门。`,
          );
          await era.printAndWait(
            `无论多么不愿意，${target_name}被开发过的肛门都为了接受阴茎而张开着`,
          );
        } else {
          await era.printAndWait(
            `「啊啊啊…嗯不行…不行…啊啊！不是插进这里…啊啊啊啊啊」`,
          );
          await era.printAndWait(
            `${target_name}的还未开发的肛门被${player_name}阴茎了进去，充分的侵犯着……`,
          );
        }
      }
      kojo.正常位肛交 = 1; // CFLAG:TARGET:327 = 1
      return 0;
    }
    // 二回目以降（七档：淫乱+A感觉Lv3以上 7 / 淫乱 6 / 爱+A感觉Lv3以上 5 / 爱慕 4 / A感觉Lv3以上 3 / それ以外 2）
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.正常位肛交 <= 6 || game.kojo.口上开关 == 2)
    ) {
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「我的肛门${heart(1)} 和你的阴茎相性很好的样子…啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}久经开发的肛门轻易地的吞下了${player_name}的阴茎`,
        );
        await era.printAndWait(
          `${target_name}的肛门啾的包住了${player_name}的阴茎。`,
        );
        await era.printAndWait(
          `「啊啊啊…我的肛门！继续！继续侵犯啊！啊啊…啊啊啊啊啊～${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `${player_name}压住${target_name}的分开的双腿，侵犯着她的肛门`,
        );
        await era.printAndWait(
          `「啊啊！我的小穴和肛门…全都被看见了！啊…继续继续看吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${player_name}极速抽插着，${target_name}不断发出诱人的呻吟`,
        );
        await era.printAndWait(
          `「啊啊…嗯…肛门…我的肛门…继续侵犯…把我弄得乱七八糟的${heart(1)}啊啊啊${heart(1)} 」`,
        );
      }
      kojo.正常位肛交 = 7; // CFLAG:327 = 7
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.正常位肛交 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「嗯啊…你的话想要怎么侵犯我都可以啊…啊啊嗯…啊啊…嗯啊…嗯！」`,
      );
      await era.printAndWait(
        `${player_name}贯穿了${target_name}正在开发途中的肛门、${target_name}因为痛苦而不禁皱起了眉`,
      );
      await era.printAndWait(`「请、请在温柔一点…啊…啊啊——！」`);
      kojo.正常位肛交 = 6; // CFLAG:327 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.正常位肛交 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋A感覚Lv3以上（RAND:2 二选一）
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「啊…啊啊…你的…全部进来了…嗯…啊嗯${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}久经开发的肛门轻易地的吞下了${player_name}的阴茎`,
        );
        await era.printAndWait(
          `${target_name}的肛门啾的包住了${player_name}的阴茎。`,
        );
        await era.printAndWait(`「啊嗯…我的肛门想要你的…好害羞啊…啊啊！」`);
      } else {
        await era.printAndWait(
          `「嗯啊…嗯…啊啊…肛门有感觉什么的…明明很害羞的…我…啊嗯啊啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被开发过的肛门紧紧的包住了${player_name}的阴茎`,
        );
        await era.printAndWait(
          `一边感叹着被抱住的感觉，${player_name}一边继续侵犯着肛门`,
        );
        await era.printAndWait(
          `「啊嗯…肛门要坏掉了…啊…啊啊啊…不行啊…再继续的话我…啊…啊啊啊——${heart(1)}」`,
        );
      }
      kojo.正常位肛交 = 5; // CFLAG:327 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.正常位肛交 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait(`「我会忍耐的…插进肛门也可以哦…嗯…呜…咕」`);
      await era.printAndWait(
        `${target_name}正在开发途中的肛门被贯穿，脸因为痛苦而扭曲着`,
      );
      await era.printAndWait(
        `${player_name}为了继续看那样的表情而开始激烈的侵犯着肛门`,
      );
      kojo.正常位肛交 = 4; // CFLAG:327 = 4
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.正常位肛交 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // A感覚Lv3以上
      await era.printAndWait(
        `「还要…继续侵犯…我的肛门…啊…啊啊！不、不要…明明不想要…咕——」`,
      );
      await era.printAndWait(`${player_name}按住${target_name}侵犯着肛门`);
      await era.printAndWait(
        `无论多么不愿意，${target_name}被开发过的肛门都为了接受阴茎而张开着`,
      );
      await era.printAndWait(
        `「嗯啊…啊嗯…嗯…咕…我明明不能就这样…就有…感觉…啊啊啊啊啊」`,
      );
      kojo.正常位肛交 = 3; // CFLAG:327 = 3
    } else if (kojo.正常位肛交 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外（爱無し、A感覚Lv3未満）
      await era.printAndWait(
        `「恩爱…啊啊…好疼…好疼啊…快、快点…停下…啊…啊啊啊」`,
      );
      await era.printAndWait(
        `${target_name}的还未开发的肛门被${player_name}阴茎了进去，充分的侵犯着……`,
      );
      await era.printAndWait(
        `压住扭动身体想要挣脱的${target_name}的肩膀，${player_name}享受着在肛门里抽送的快乐……`,
      );
      kojo.正常位肛交 = 2; // CFLAG:327 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 27) {
    // 背后位アナル CFLAG:328（结构同 26：无处女判定，按 A感覚/ABL:3 分档，二回目细分 7 档）
    if (kojo.背后位肛交 == 0) {
      // 初めて
      if (era0(`talent:${target}:76`) == 1) {
        // 淫乱
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「嗯…啊啊啊…我的肛门里，阴茎插进来了…啊啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被开发了的肛门把${player_name}的阴茎轻易吞了进去。`,
          );
          await era.printAndWait(
            `从后面被侵犯的${target_name}的肛门被扩张的地方轻易的看见。`,
          );
          await era.printAndWait(
            `「啊…啊啊…我的肛门被阴茎插进来的话…我马上就受不了了${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊！我的肛门…被侵犯了…啊啊啊啊…这样…好棒…啊啊！」`,
          );
          await era.printAndWait(
            `${player_name}抓住${target_name}的屁股，贯穿了她未开发的肛门。`,
          );
          await era.printAndWait(`「继续…继续侵犯我直到我的肛门感到舒服！」`);
        }
      } else if (era0(`talent:${target}:85`) == 1) {
        // 爱慕
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊啊！…继续…侵犯…我的肛门…啊…嗯啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被开发了的肛门把${player_name}的阴茎轻易吞了进去。`,
          );
          await era.printAndWait(
            `从后面被侵犯的${target_name}的肛门被扩张的地方轻易的看见。`,
          );
          await era.printAndWait(
            `「被这么侵犯的话…我已经…逃不掉了…啊啊啊${heart(1)}」`,
          );
        } else {
          await era.printAndWait(`「啊…嗯…啊啊…我的肛门…啊…啊啊啊！」`);
          await era.printAndWait(
            `${player_name}抓住${target_name}的屁股，贯穿了她未开发的肛门。`,
          );
          await era.printAndWait(
            `${target_name}的脸因痛苦而歪曲着，发出了忍耐的声音。`,
          );
          await era.printAndWait(`「你想做的话，我…会忍耐的…啊…啊啊！」`);
        }
      } else {
        // それ以外（爱無し）
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「嗯…啊啊啊…啊啊…嗯…不行…再继续的话我的肛门会变得奇怪的！」`,
          );
          await era.printAndWait(
            `${player_name}抓住${target_name}的屁股侵犯者他的肛门。`,
          );
          await era.printAndWait(
            `${target_name}被开发了的肛门接受着阴茎、不断产生着快感………`,
          );
        } else {
          await era.printAndWait(
            `「肛，肛门不…不行的…不要！真的不行…啊…啊啊…咕…啊啊啊啊啊！」`,
          );
          await era.printAndWait(
            `${player_name}抓住${target_name}的屁股，一口气把阴茎插进了未被开发的肛门。`,
          );
          await era.printAndWait(
            `「嗯…嗯啊…咕…啊啊…啊啊啊！啊啊啊啊啊啊啊啊啊啊啊！」`,
          );
          await era.printAndWait(`${target_name}咬着嘴唇，发出了悲鸣………`);
        }
      }
      kojo.背后位肛交 = 1; // CFLAG:TARGET:328 = 1
      return 0;
    }
    // 二回目以降（七档，结构同 26）
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.背后位肛交 <= 6 || game.kojo.口上开关 == 2)
    ) {
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「嗯…啊啊啊…我的肛门里，阴茎插进来了…啊啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被开发了的肛门把${player_name}的阴茎轻易吞了进去。`,
        );
        await era.printAndWait(
          `从后面被侵犯的${target_name}的肛门被扩张的地方轻易的看见。`,
        );
        await era.printAndWait(
          `「啊…啊啊…我的肛门被阴茎插进来的话…我马上就受不了了${heart(1)}」`,
        );
        await era.printAndWait(
          `「嗯啊啊…啊啊…我是你的牝奴隶…继续侵犯我…要把肛门翻出来那样侵犯我${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「啊啊！我的肛门已经乱七八糟了${heart(1)} 啊啊！」`,
        );
        await era.printAndWait(
          `${player_name}抓住${target_name}的腰，阴茎的抽送越来越激烈。`,
        );
        await era.printAndWait(
          `${target_name}被开发的肛门和${target_name}的阴茎象吸在一起一样。`,
        );
        await era.printAndWait(
          `「好舒服…肛门被侵犯好舒服…啊啊啊…嗯啊${heart(1)}」`,
        );
      }
      kojo.背后位肛交 = 7; // CFLAG:328 = 7
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.背后位肛交 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「嗯…更激烈的…侵犯，调教…我的肛门吧${heart(1)}」`,
      );
      await era.printAndWait(
        `${player_name}抓住${target_name}的屁股，贯穿了她未开发的肛门。`,
      );
      await era.printAndWait(
        `「啊啊…来吧…更用力…更激烈的…嗯…啊啊${heart(1)}」`,
      );
      kojo.背后位肛交 = 6; // CFLAG:328 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.背后位肛交 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋A感覚Lv3以上（RAND:2 二选一）
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「啊啊！…我的肛门…继续…侵犯吧…嗯…嗯啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被开发了的肛门把${player_name}的阴茎轻易吞了进去。`,
        );
        await era.printAndWait(
          `从后面被侵犯的${target_name}的肛门被扩张的地方轻易的看见。`,
        );
        await era.printAndWait(
          `「被这么侵犯的话…我已经…逃不掉了…啊啊啊…啊啊啊——${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「啊…啊啊…我的肛门舒服吗？啊啊…那就继续…使用我的肛门吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${player_name}听着${target_name}的祈求，掰开的她屁股更激烈的抽送着阴茎。`,
        );
        await era.printAndWait(
          `「啊嗯${heart(1)}…啊…啊啊…啊…啊啊…啊啊哦…呀啊啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `「什么时候使用我的肛门都可以哦${heart(1)} 啊…啊啊啊啊${heart(1)}」`,
        );
      }
      kojo.背后位肛交 = 5; // CFLAG:328 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait(`「啊…你的…进来了…嗯…全部都…进来了」`);
      await era.printAndWait(
        `${player_name}抓住${target_name}的屁股，贯穿了她未开发的肛门。`,
      );
      await era.printAndWait(
        `${target_name}的脸因痛苦而歪曲着，发出了忍耐的声音。`,
      );
      await era.printAndWait(`「没关系…啊…嗯嗯…啊…呜…啊！」`);
      kojo.背后位肛交 = 4; // CFLAG:328 = 4
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.背后位肛交 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // A感覚Lv3以上
      await era.printAndWait(`「我的肛门…不…不要…不要再继续了…啊啊啊！」`);
      await era.printAndWait(
        `${player_name}抓住${target_name}的屁股，侵犯着她的肛门。`,
      );
      await era.printAndWait(
        `${target_name}被开发了的肛门接受着阴茎、不断产生着快感………`,
      );
      await era.printAndWait(
        `「啊啊…啊…啊啊啊！明明都说了不行…嗯…啊啊…啊啊啊！」`,
      );
      kojo.背后位肛交 = 3; // CFLAG:328 = 3
    } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外（爱無し、A感覚Lv3未満）
      await era.printAndWait(`「啊…啊啊！以、已经不行了…嗯…咕…啊啊啊！」`);
      await era.printAndWait(
        `${player_name}抓住${target_name}的屁股，一口气把阴茎插进了未被开发的肛门。`,
      );
      await era.printAndWait(`「再继续侮辱我的话…啊…啊啊…啊…咦呀——！」`);
      await era.printAndWait(`${target_name}发出着悲鸣………`);
      kojo.背后位肛交 = 2; // CFLAG:328 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 28) {
    // 对面座位アナル CFLAG:329（结构同 26/27：无处女判定，按 A感覚/ABL:3 分档，二回目细分 7 档）
    if (kojo.对面座位肛交 == 0) {
      // 初めて
      if (era0(`talent:${target}:76`) == 1) {
        // 淫乱
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊啊！好深！我的肛门里面全部…都…啊啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被开放过的肛门轻易的把${player_name}的阴茎吞了下去。`,
          );
          await era.printAndWait(
            `${target_name}扭动腰，把阴茎连根部都插进了肛门里。`,
          );
          await era.printAndWait(
            `「啊啊！好舒服…！你的全部都感觉得到${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「呜…啊啊…啊…啊…全部都进到我的肛门里来了…～！」`,
          );
          await era.printAndWait(
            `${player_name}掰开${target_name}的屁股，插进了她未开发的肛门。`,
          );
          await era.printAndWait(
            `${target_name}有些痛苦的抱着${player_name}。`,
          );
          await era.printAndWait(
            `「啊啊…被你的阴茎继续插的话…很快就会变舒服的…啊啊…别想太多侵犯我吧…${heart(1)}」`,
          );
        }
      } else if (era0(`talent:${target}:85`) == 1) {
        // 爱慕
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「呐…就那么喜欢我的肛门吗？ 啊…嗯…嗯…啊啊！」`,
          );
          await era.printAndWait(
            `${player_name}就想要回答这些话一样，抱着${target_name}从下往上插去。`,
          );
          await era.printAndWait(
            `${target_name}被开发的肛门反射性的紧缩压迫着${player_name}的阴茎、给${player_name}带去更多快乐。`,
          );
          await era.printAndWait(
            `「啊…嗯…啊啊…不光是我的肛门…也更加的爱我吧…啊…啊啊！」`,
          );
        } else {
          await era.printAndWait(
            `「嗯…嗯…啊…啊啊…我的肛门把你的全部都…都吞下去了…啊啊啊啊………${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}的阴茎连根部都埋在了${target_name}未熟的肛门里。`,
          );
          await era.printAndWait(
            `${target_name}一边漏出着灼热的呼吸，一边抱住了${player_name}。`,
          );
          await era.printAndWait(`「再、再稍微等等…还、很紧…啊…啊啊啊！」`);
        }
      } else {
        // それ以外（爱無し）
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊啊！嗯…呜…不要…啊啊…不要再继续了…啊…啊啊啊！」`,
          );
          await era.printAndWait(
            `${player_name}抱着${target_name}，集中侵犯着肛门。`,
          );
          await era.printAndWait(
            `${target_name}被开发过的肛门和${target_name}的意志相反，轻易地接受了${player_name}的阴茎。`,
          );
          await era.printAndWait(
            `「不要全部都插进…我的肛门…啊啊…呀啊啊啊啊！」`,
          );
        } else {
          await era.printAndWait(`「给我、离开…才不想被你抱着呢…呜…啊啊啊！」`);
          await era.printAndWait(
            `${player_name}抱着${target_name}集中蹂躏着肛门，一次又一次的向上突刺着。`,
          );
          await era.printAndWait(`「不要！咕…啊！啊…啊啊！」`);
          await era.printAndWait(
            `${target_name}未开发的肛门紧紧地包裹着${player_name}的阴茎………`,
          );
        }
      }
      kojo.对面座位肛交 = 1; // CFLAG:TARGET:329 = 1
      return 0;
    }
    // 二回目以降（七档，结构同 26/27）
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.对面座位肛交 <= 6 || game.kojo.口上开关 == 2)
    ) {
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「啊啊！好深！我的肛门里面全部…都…啊啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被开放过的肛门轻易的把${player_name}的阴茎吞了下去。`,
        );
        await era.printAndWait(
          `${target_name}扭动腰，把阴茎连根部都插进了肛门里。`,
        );
        await era.printAndWait(
          `「啊啊！好舒服…！你的全部都感觉得到${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `${target_name}利用自己的体重，把${player_name}的阴茎直到根部位置一口气都插进了自己的肛门里。`,
        );
        await era.printAndWait(
          `「呜…啊啊…啊…啊啊啊啊${heart(1)} 全都…全都是我的${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}细细品味着${player_name}的阴茎，前后摇动着腰。`,
        );
        await era.printAndWait(
          `「你的阴茎…嗯…啊啊…是我的东西…嗯…嗯嗯…啊啊…嗯…啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `「绝对不会放开的…啊嗯…啊啊…啾…嗯啾…啾…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}紧紧抱住${player_name}接着吻，肛门又变得更紧了………`,
        );
      }
      kojo.对面座位肛交 = 7; // CFLAG:329 = 7
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.对面座位肛交 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait(`「啊啊！到深处…一口气…嗯…嗯啊…啊啊！」`);
      await era.printAndWait(
        `${player_name}掰开${target_name}的屁股，插进了她未开发的肛门。`,
      );
      await era.printAndWait(`${target_name}有些痛苦的抱着${player_name}。`);
      await era.printAndWait(
        `「啊啊…用你的阴茎继续开发我的肛门吧…啊呢…啊…啊啊啊${heart(1)}」`,
      );
      kojo.对面座位肛交 = 6; // CFLAG:329 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.对面座位肛交 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋A感覚Lv3以上（RAND:2 二选一）
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「啊嗯…啊啊…啊…啊啊啊…我的肛门已经…是你…啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${player_name}就想要回答这些话一样，抱着${target_name}从下往上插去。`,
        );
        await era.printAndWait(
          `${target_name}被开发的肛门反射性的紧缩压迫着${player_name}的阴茎、给${player_name}带去更多快乐。`,
        );
        await era.printAndWait(
          `「不想从你这里离开…啊…我的肛门是你专用的…啊啊啊啊${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「嗯…嗯…和你接吻的话…啊…肛门被侵犯也好舒服${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}抱着${player_name}，一边晃着腰一边不停的接吻。`,
        );
        await era.printAndWait(
          `${target_name}的肛门不停的紧缩这、让${player_name}的阴茎沉浸在快感里。`,
        );
        await era.printAndWait(
          `「啊嗯…嗯嗯…好棒…好舒服…让我更舒服吧${heart(1)}」`,
        );
      }
      kojo.对面座位肛交 = 5; // CFLAG:329 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.对面座位肛交 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait(`「啊啊…我的肛门还…不够舒服，对不起…啊啊」`);
      await era.printAndWait(
        `${player_name}的阴茎连根部都埋在了${target_name}未熟的肛门里。`,
      );
      await era.printAndWait(
        `${target_name}一边漏出着灼热的呼吸，一边抱住了${player_name}。`,
      );
      await era.printAndWait(
        `「啊啊…但是…你自由使用就好了…啊…啊啊啊啊…${heart(1)}」`,
      );
      kojo.对面座位肛交 = 4; // CFLAG:329 = 4
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.对面座位肛交 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // A感覚Lv3以上
      await era.printAndWait(`「啊啊！不、不要…不要抱着我啊…呜…咕…啊…啊啊！」`);
      await era.printAndWait(
        `${player_name}抱着${target_name}，集中侵犯着她的肛门。`,
      );
      await era.printAndWait(
        `${target_name}被开发过的肛门和${target_name}的意志相反，轻易地接受了${player_name}的阴茎。`,
      );
      await era.printAndWait(
        `「啊啊啊！全部…全部都进来…不要…不要啊…啊啊啊啊！」`,
      );
      await era.printAndWait(
        `${target_name}因为肛门和背部升起快感而感到战栗、反射性的抱住了${player_name}………`,
      );
      kojo.对面座位肛交 = 3; // CFLAG:329 = 3
    } else if (kojo.对面座位肛交 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外（爱無し、A感覚Lv3未満）
      await era.printAndWait(`「啊、走开…我可没兴趣和你抱在一起…呜…啊啊！」`);
      await era.printAndWait(
        `${player_name}抱着${target_name}集中蹂躏着肛门，一次又一次的向上突刺着。`,
      );
      await era.printAndWait(`「停、停下…求你了…啊…啊啊…呀啊啊啊！」`);
      await era.printAndWait(`未开发的肛门紧紧地包裹着${player_name}的阴茎。`);
      await era.printAndWait(
        `而为了忍耐那份疼痛，${target_name}只能抱着${player_name}………`,
      );
      kojo.对面座位肛交 = 2; // CFLAG:329 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 29) {
    // 背面座位肛交 CFLAG:330（结构同 26-28：无处女判定，按 A感覚/ABL:3 分档，二回目细分 7 档；
    // 首尾各接一段 TEQUIP:57 镜子 + ABL:17 羞耻PLAY 加成）
    if (kojo.背面座位肛交 == 0) {
      // 初めて
      if (era0(`talent:${target}:76`) == 1) {
        // 淫乱
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「嗯…啊啊…啊…把我的身体…弄得更加乱七八糟吧…嗯啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一边玩弄着${player_name}的乳房，一边从下面突刺这她的肛门。`,
          );
          await era.printAndWait(
            `「啊啊…嗯、啊…啊啊！好棒…好舒服…啊啊…肛门好舒服啊啊${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊…全部…插进来了…我的肛门…就这么被撑开了…啊！」`,
          );
          await era.printAndWait(
            `${player_name}掰开${target_name}的屁股，插进了她未开发的肛门。`,
          );
          await era.printAndWait(
            `${player_name}抓住了${target_name}的乳房，${target_name}颤抖着。`,
          );
          await era.printAndWait(
            `「啊啊…继续下流的开发…调教…我的身体吧…${heart(1)}」`,
          );
        }
      } else if (era0(`talent:${target}:85`) == 1) {
        // 爱慕
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `肛门被开发了的${target_name}坐在了${player_name}上面身上、粗重的喘息着。`,
          );
          await era.printAndWait(
            `「啊…啊啊…嗯、啊啊啊啊啊………嗯啊…腰自己动起来了…啊啊…继续抱我…！」`,
          );
          await era.printAndWait(
            `${target_name}的肛门很舒服似的把${player_name}的阴茎连根部都吞了下去………`,
          );
        } else {
          await era.printAndWait(`「嗯、嗯…好好品尝…我的肛门吧…${heart(1)}」`);
          await era.printAndWait(
            `${target_name}把身体托付给${player_name}、从下面被不停的突刺着。`,
          );
          await era.printAndWait(`「我的身体…全部都是你的…啊啊${heart(1)}」`);
        }
      } else {
        // それ以外（爱無し）
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊啊…嗯…嗯嗯…我的肛门这么有感觉什么的…嗯、嗯啊…啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}被${player_name}一边侵犯着肛门一边抚摸着乳房，发出了喘息声。`,
          );
          await era.printAndWait(
            `「嗯…啊…啊…啊啊…嗯…啊…不行…我的身体…为什么…呀啊啊啊啊！」`,
          );
        } else {
          await era.printAndWait(
            `「停、停下…我的肛门什么感觉都没有，所以…啊啊啊！」`,
          );
          await era.printAndWait(
            `${player_name}从后面抱着${target_name}，从下往上顶着肛门。`,
          );
          await era.printAndWait(`「啊啊…嗯…啊啊啊！不要…嗯…咕…啊啊啊啊！」`);
          await era.printAndWait(
            `${player_name}听着${target_name}那模糊的悲鸣、又开始爱抚着乳房和秘裂………`,
          );
        }
      }
      kojo.背面座位肛交 = 1; // CFLAG:TARGET:330 = 1
      // 羞耻PLAY（TEQUIP:57 镜子 + ABL:17 分档）
      if (
        era0(`tequip:${target}:57`) &&
        era0(`abl:${target}:17`) >= 1 &&
        era0(`talent:${target}:85`)
      ) {
        await era.printAndWait(
          `「啊啊…我的肛门能把你的全部放进来…我是多么幸福的人啊………${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}看着镜子中映出的自己的痴态，更加兴奋了………`,
        );
      } else if (
        era0(`tequip:${target}:57`) &&
        era0(`abl:${target}:17`) >= 1 &&
        era0(`talent:${target}:76`)
      ) {
        await era.printAndWait(
          `「啊啊${heart(1)} 我的肛门被扩张着…嗯 好舒服…继续侵犯我吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}看着镜子中映出的自己的痴态，更加兴奋了………`,
        );
      } else if (era0(`tequip:${target}:57`) && era0(`abl:${target}:17`) >= 1) {
        await era.printAndWait(
          `「啊啊…我的肛门…全部都进来了…啊…啊啊…这么深啊………」`,
        );
        await era.printAndWait(
          `${target_name}看着镜子中映出的自己的痴态，更加兴奋了………`,
        );
      } else if (era0(`tequip:${target}:57`)) {
        await era.printAndWait(
          `${target_name}看着大镜子里自己被张开双腿侵犯肛门的痴态，不甘心的移开了目光………`,
        );
      }
      return 0;
    }
    // 二回目以降（七档，结构同 26-28；末尾同样接羞耻PLAY 加成）
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.背面座位肛交 <= 6 || game.kojo.口上开关 == 2)
    ) {
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「啊啊…啊啊啊${heart(1)} 我…要变成笨蛋了…再继续侵犯我的肛门的话我要变成笨蛋了！」`,
        );
        await era.printAndWait(
          `${target_name}接受着下面的突刺，一边疯狂的喘息着一边前后扭着腰。`,
        );
        await era.printAndWait(
          `因为动作太混乱${player_name}像为了不让肛门摆脱阴茎般抱着${target_name}就已经竭尽全力了。`,
        );
        await era.printAndWait(
          `「嗯…啊…啊啊…继续侵犯我…侵犯我吧…啊啊…啊…啊啊啊${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「啊啊…啊…肛门被撑开了${heart(1)}…我的肛门想要你的阴茎想要得不行${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}玩弄着${player_name}的乳房，从下面开始侵犯肛门。`,
        );
        await era.printAndWait(
          `${player_name}用手擦干了${target_name}流出的口水，又插回她的口中让她舔干净。`,
        );
        await era.printAndWait(
          `「嗯…嗯…嗯啊…啊啊…啊啊…肛门被侵犯的同时嘴里含根阴茎好像也不错…啊…啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `「但是现在…肛门…肛门被侵犯的乱七八糟…让我感觉感觉更舒服！」`,
        );
      }
      kojo.背面座位肛交 = 7; // CFLAG:330 = 7
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.背面座位肛交 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait(`「嗯嗯…啊啊啊…全部都插进…我下流的肛门里吧！」`);
      await era.printAndWait(
        `${player_name}掰开${target_name}的屁股，插进了她未开发的肛门。`,
      );
      await era.printAndWait(
        `${player_name}抓住了${target_name}的乳房，${target_name}颤抖着。`,
      );
      await era.printAndWait(
        `「嗯…虽然胸部也很好…不过还是先把肛门弄得乱七八糟吧…啊啊${heart(1)}」`,
      );
      kojo.背面座位肛交 = 6; // CFLAG:330 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.背面座位肛交 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋A感覚Lv3以上（RAND:2 二选一，第二分支内再嵌一次 RAND:2）
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `肛门被开发了的${target_name}坐在了${player_name}上面身上，肛门被贯穿、粗重的喘息着。`,
        );
        await era.printAndWait(
          `「啊…啊啊…嗯、啊啊啊啊啊………嗯啊…腰自己动起来了…啊啊…继续抱我…！」`,
        );
        await era.printAndWait(
          `${target_name}撒着娇，转动着${player_name}手爱抚着乳房和蜜裂。`,
        );
        await era.printAndWait(
          `「啊啊${heart(1)} 你的手…好温柔…啊啊…嗯嗯…啊…啊…啊啊啊${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「嗯啊…啊…啊啊…屁股…自己动起来了…我的肛门已经…是你的东西了${heart(1)} 啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被开发了的肛门、黏糊糊的肠壁向${player_name}阴茎缠绕了上去。`,
        );
        await era.printAndWait(
          `「啊啊啊…啊…啊…啊嗯啊…从肛门哪里来来回回的敲打着子宫…啊啊啊${heart(1)}」`,
        );
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `嘴里被手指插入的${target_name}心领神会的舔了起来。`,
          );
          await era.printAndWait(
            `「啾嗯啾…嗯啾…啊嗯…嗯…啊啊…好舒服…好舒服啊…啊啊${heart(1)}」`,
          );
        }
      }
      kojo.背面座位肛交 = 5; // CFLAG:330 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.背面座位肛交 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait(`「啊啊…还要继续被你侵犯…嗯啊啊…啊啊啊嗯！」`);
      await era.printAndWait(
        `${target_name}把身体交给${player_name}、未开发的肛门被从下不停的突刺着。`,
      );
      await era.printAndWait(
        `「我没关系的…在肛门中满满的出来吧…嗯…啊啊${heart(1)}」`,
      );
      kojo.背面座位肛交 = 4; // CFLAG:330 = 4
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.背面座位肛交 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // A感覚Lv3以上
      await era.printAndWait(
        `「嗯啊…嗯啊…啊啊…没错…被你侵犯…肛门好舒服啊…嗯…嗯啊啊啊啊！」`,
      );
      await era.printAndWait(
        `${target_name}被${player_name}侵犯着肛门，发出了喘息的呻吟。`,
      );
      await era.printAndWait(
        `${target_name}的乳房被${player_name}的手指看起来很疼的深深戳着、对${target_name}这也只会变成快感而已。`,
      );
      await era.printAndWait(
        `「啊啊啊…我…嗯啊…嗯…嗯啊…啊啊…嗯、啊啊…啊啊啊啊——！」`,
      );
      kojo.背面座位肛交 = 3; // CFLAG:330 = 3
    } else if (kojo.背面座位肛交 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外（爱無し、A感覚Lv3未満）
      await era.printAndWait(
        `「嗯啊…嗯啊…咕…呜…嗯…啊啊啊！停、停下…啊…啊啊！」`,
      );
      await era.printAndWait(
        `${player_name}从后面抱着${target_name}从下往上插着肛门。`,
      );
      await era.printAndWait(`${target_name}发出了好像很痛苦的声音。`);
      await era.printAndWait(`「啊咕…呜…呜…不、不要…这…样…啊嗯！」`);
      await era.printAndWait(
        `${player_name}一边愉快的听着${target_name}的呻吟、一边开始爱抚乳房和蜜裂………`,
      );
      kojo.背面座位肛交 = 2; // CFLAG:330 = 2
    }
    // 羞耻PLAY（TEQUIP:57 镜子 + ABL:17 分档，与初めて分支相同）
    if (
      era0(`tequip:${target}:57`) &&
      era0(`abl:${target}:17`) >= 1 &&
      era0(`talent:${target}:85`)
    ) {
      await era.printAndWait(
        `「啊啊…我的肛门能把你的全部放进来…我是多么幸福的人啊………${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}看着镜子中映出的自己的痴态，更加兴奋了………`,
      );
    } else if (
      era0(`tequip:${target}:57`) &&
      era0(`abl:${target}:17`) >= 1 &&
      era0(`talent:${target}:76`)
    ) {
      await era.printAndWait(
        `「啊啊${heart(1)} 我的肛门被扩张着…嗯 好舒服…继续侵犯我吧${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}看着镜子中映出的自己的痴态，更加兴奋了………`,
      );
    } else if (era0(`tequip:${target}:57`) && era0(`abl:${target}:17`) >= 1) {
      await era.printAndWait(
        `「啊啊…我的肛门…全部都进来了…啊…啊啊…这么深啊………」`,
      );
      await era.printAndWait(
        `${target_name}看着镜子中映出的自己的痴态，更加兴奋了………`,
      );
    } else if (era0(`tequip:${target}:57`)) {
      await era.printAndWait(
        `${target_name}看着大镜子里自己被张开双腿侵犯肛门的痴态，不甘心的移开了目光………`,
      );
    }
    return 0;
  } else if (era_flag.selectcom == 30) {
    // 手淫 CFLAG:331（无 A感覚 分档，按 TALENT/侍奉精神 ABL:16 分档）
    if (kojo.手淫 == 0) {
      // 初めて（单层：无 ABL:3 细分）
      if (era0(`talent:${target}:76`) == 1) {
        // 淫乱
        await era.printAndWait(`「啊啊…你的阴茎好热…啊啊…啊啊…${heart(1)}」`);
        await era.printAndWait(
          `${target_name}一边喘着粗气，一边激烈的对待着${player_name}的阴茎………`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        // 爱慕
        await era.printAndWait(
          `「你的阴茎…在我的手里变得这么硬…啊啊…好厉害…好高兴…♪」`,
        );
        await era.printAndWait(
          `${target_name}一边喘着粗气，一边温柔的侍奉着${player_name}的阴茎………`,
        );
      } else if (era0(`abl:${target}:16`) >= 3) {
        // 侍奉精神Lv3以上
        await era.printAndWait(`「我不做这种事不行么…真没办法…呵呵呵」`);
        await era.printAndWait(
          `${target_name}一边舔着嘴唇。一边侍奉着${player_name}的阴茎………`,
        );
      } else {
        // それ以外（侍奉精神Lv3未満）
        await era.printAndWait(
          `「用着双手服侍你的东西…嗯…疼么？…那就这么握碎…切…连这种程度的力量都用不出来么」`,
        );
        await era.printAndWait(
          `${target_name}一边露出不甘心的表情，一边侍奉着${player_name}阴茎………`,
        );
      }
      kojo.手淫 = 1; // CFLAG:TARGET:331 = 1
      return 0;
    }
    // 二回目以降（七档）
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.手淫 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱＋侍奉精神Lv3以上（RAND:2 二选一）
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「看，你的阴茎勃起的更厉害了、因为我把你弄得更舒服了吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的左手紧紧握着${player_name}阴茎的根部，右手撸动着。`,
        );
        await era.printAndWait(
          `「啊啊${heart(1)}啊啊${heart(1)} …这么红，好棒…${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「只是握着你热乎乎的阴茎、我的头就已经开始发晕了…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}不自觉的张着嘴、带着晕乎乎的眼神侍奉着${player_name}的阴茎。`,
        );
        await era.printAndWait(
          `「啊啊…如果继续这么热的话…我的手都快烫伤了…${heart(1)}」`,
        );
      }
      kojo.手淫 = 7; // CFLAG:331 = 7
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.手淫 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「啊啊…一想到这根阴茎在我里面乱搞…啊…啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}带着一副出神的表情服侍着${player_name}的阴茎………`,
      );
      kojo.手淫 = 6; // CFLAG:331 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:16`) >= 5 &&
      (kojo.手淫 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋侍奉精神Lv5（RAND:2 二选一）
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「嗯啊…这根阴茎…是只属于我的阴茎…啊…绝对不会放手的${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}带着一副出神的表情侍奉着${player_name}的阴茎。`,
        );
        await era.printAndWait(
          `「就这样变得非常非常舒服…射出非常非常多的精液来吧…♪」`,
        );
      } else {
        await era.printAndWait(
          `「啊啊…现在好像马上就要咻咻的射精出来哦…你的阴茎${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}用湿润的眼睛凝视着${player_name}的阴茎。`,
        );
        await era.printAndWait(
          `「就这样…用我的手变得非常非常舒服…射出非常非常多的精液来吧…♪」`,
        );
      }
      kojo.手淫 = 5; // CFLAG:331 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.手淫 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋侍奉精神Lv3以上
      await era.printAndWait(
        `「你的阴茎…在我的手里变得这么硬…啊啊…好厉害…好高兴…♪」`,
      );
      await era.printAndWait(
        `${target_name}一边喘着粗气，一边温柔的侍奉着${player_name}的阴茎………`,
      );
      kojo.手淫 = 4; // CFLAG:331 = 4
    } else if (
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.手淫 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 侍奉精神Lv3以上
      await era.printAndWait(
        `「这样就好了吗？………呵呵呵、真的露出了好像很舒服似的脸啊、你」`,
      );
      await era.printAndWait(
        `${target_name}一边舔着嘴唇，一边侍奉着${player_name}的阴茎………`,
      );
      kojo.手淫 = 3; // CFLAG:331 = 3
    } else if (kojo.手淫 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外（侍奉精神Lv3未満）
      await era.printAndWait(`「啊啊…用手服侍你的东西什么的，真是屈辱………」`);
      await era.printAndWait(
        `${target_name}一边撅起嘴唇，一边服侍着${player_name}的阴茎………`,
      );
      kojo.手淫 = 2; // CFLAG:331 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 31) {
    // 口交 CFLAG:332（无 A感覚 分档，四档；二回目以降淫乱/爱慕分支各接 RAND:3→RAND:2 双层三选一）
    if (kojo.口交_奴 == 0) {
      // 初めて
      if (era0(`talent:${target}:76`) == 1) {
        // 淫乱
        await era.printAndWait(
          `「啊啊、你的阴茎…我开动了${heart(1)} 啊呜…嗯呜嗯…咕噜…啾…嗯！」`,
        );
        await era.printAndWait(
          `${target_name}突然抓起${player_name}的阴茎，以猛烈的势头吞了下去。`,
        );
        await era.printAndWait(
          `「嗯…嗯呼…我、我…一直想舔你的阴茎想的不得了、一直都等着呢！嗯咕噜…嗯…啾${heart(1)}」`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        // 爱慕
        await era.printAndWait(
          `「即使是你的阴茎，这么突然让我舔你觉得可能吗？」`,
        );
        await era.printAndWait(
          `${target_name}这么说着，一边撸着${player_name}的阴茎，一边吻向了阴茎的顶部。`,
        );
        await era.printAndWait(
          `「嗯…呵呵呵、首先要先接吻…${heart(1)} 然后…嗯咕嗯…再舔舔龟头吧${heart(1)}」`,
        );
      } else if (era0(`abl:${target}:16`) >= 3) {
        // 侍奉精神Lv3以上
        await era.printAndWait(
          `「啊啊…你那肮脏的阴茎…变干净了…嗯…啊…嗯…咕噜…」`,
        );
        await era.printAndWait(
          `${target_name}眯着眼看起来很高兴的把${player_name}的阴茎吸入口中舔了起来。`,
        );
        await era.printAndWait(`「咕噜…啊…明明味道这么重…啊…嗯…嗯…♪」`);
      } else {
        // それ以外（侍奉精神Lv3未満）
        await era.printAndWait(
          `「啊啊…终于我也到了用嘴来含住这根肮脏的阴茎的时候了…嗯…嗯…咕噜」`,
        );
        await era.printAndWait(
          `${target_name}战战兢兢的舔起了${player_name}的阴茎。`,
        );
        await era.printAndWait(
          `「毕竟输了，这种程度是理所当然的呢…啊…嗯…咕………」`,
        );
        await era.printAndWait(
          `${target_name}带着因悔恨而歪曲的表情，继续着口腔奉仕………`,
        );
      }
      kojo.口交_奴 = 1; // CFLAG:TARGET:332 = 1
      return 0;
    }
    // 二回目以降（四档）
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.口交_奴 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱（RAND:3→RAND:2 双层三选一）
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「啊啊，你的阴茎…每天都想舔…嗯…咕噜…嗯啾${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}吞下${player_name}阴茎直到喉咙的深处。`,
        );
        await era.printAndWait(
          `「嗯啾…啾…啾…嗯嗯…啊啊…阴茎…阴茎…${heart(1)}」`,
        );
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `${target_name}眼前伸出了阴茎、${target_name}张开嘴咬住了阴茎。`,
        );
        await era.printAndWait(
          `「啊呜…嗯…嗯…这是在奖励我把？ 啊啊…阴茎真好吃…咕噜…嗯啾…嗯${heart(1)}」`,
        );
        await era.printAndWait(
          `「受不了了、我感觉吸的时候最舒服…嗯嗯…咕噜…就…嗯啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}脱去酷酷的女忍者这层假面之后、已经沦为了奉仕${player_name}的阴茎的一匹牝犬………`,
        );
      } else {
        await era.printAndWait(
          `「啊呜…嗯…嗯…你的阴茎实在太好吃了…咕噜…啊啊…就这样放在我的嘴里吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}用恍惚的眼神一边注视着${player_name}的阴茎，一边。`,
        );
        await era.printAndWait(
          `「啾…咕噜…啊啊…你的阴茎已经让我上瘾了、嗯咕…嗯啾…啾…嗯咕${heart(1)}」`,
        );
      }
      kojo.口交_奴 = 5; // CFLAG:332 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕（RAND:3→RAND:2 双层三选一）
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「啊呜…嗯…这是我的阴茎、给其他的别的谁可不行…啊啊…嗯…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}亲了尿道口好几次后、大口吞下了${player_name}的阴茎。`,
        );
        await era.printAndWait(
          `「嗯啾…嗯…啊…我的嘴舒服吗？…啊啊…变得更舒服吧…${heart(1)}」`,
        );
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「嗯…嗯…嗯咕…咕噜…嗯…嗯嗯…在我嘴里满满的射出来吧…啊啊…嗯嗯${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}看起来很舒服似得眯起了眼、继续舔着${player_name}的阴茎。`,
        );
        await era.printAndWait(
          `「好吃…你的阴茎实在太好吃了…咕噜…嗯…啾啾…${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「啊啊…只是含着男人的阴茎而已…就这么幸福什么的…我好想已经变得不对劲了…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}干起来很高兴的舔着${player_name}的阴茎。`,
        );
        await era.printAndWait(
          `「咕…啾…啾嗯…啊啊…明明味道这么重但我就是停不下来${heart(1)}」`,
        );
      }
      kojo.口交_奴 = 4; // CFLAG:332 = 4
    } else if (
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.口交_奴 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 侍奉精神Lv3以上
      await era.printAndWait(`「嗯啊…嗯…啊嗯…咕噜…啾…啊…嗯啊…♪」`);
      await era.printAndWait(`${target_name}热心的舔着${player_name}的阴茎。`);
      await era.printAndWait(`「让我做到这种程度什么的…你这家伙…嗯…啊…咕噜…」`);
      kojo.口交_奴 = 3; // CFLAG:332 = 3
    } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外（侍奉精神Lv3未満）
      await era.printAndWait(
        `「嗯…嗯嗯…咕噜…嗯啊…嗯…让我继续舔？ 啊…嗯啾啾！」`,
      );
      await era.printAndWait(
        `${target_name}带着不甘心的表情继续舔着${player_name}的阴茎………`,
      );
      kojo.口交_奴 = 2; // CFLAG:332 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 32) {
    // 乳交 CFLAG:333（八档：TALENT:78 弄乳狂与 TALENT:76/85 组合出更高档；初めて 单层五分）
    if (kojo.乳交 == 0) {
      // 初めて
      if (era0(`talent:${target}:78`) == 1) {
        // 弄乳狂
        await era.printAndWait(`「啊…用我的好色的胸部让你的阴茎更舒服吧…♪」`);
        await era.printAndWait(
          `${target_name}的眼角垂了下来、为用胸部侍奉而兴奋这。`,
        );
        await era.printAndWait(`「胸部变得太舒服…啊啊…要融化了………」`);
      } else if (era0(`talent:${target}:76`) == 1) {
        // 淫乱
        await era.printAndWait(`「嗯…用你的阴茎侵犯我的胸部吧…啊啊…啊啊♪」`);
        await era.printAndWait(
          `${target_name}高兴的舔着嘴唇，用胸部开始了奉仕………`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        // 爱慕
        await era.printAndWait(`「呵呵呵、我的胸部…让你很舒服啊…♪」`);
        await era.printAndWait(
          `${target_name}像是摩擦这艳丽的乳头一样，开始奉仕${player_name}的阴茎………`,
        );
      } else if (era0(`abl:${target}:16`) >= 3) {
        // 侍奉精神Lv3以上
        await era.printAndWait(`「总觉得…啊啊…胸部好热…啊、嗯！」`);
        await era.printAndWait(
          `${target_name}带着出神的表情，继续奉仕着${player_name}的阴茎………`,
        );
      } else {
        // それ以外（侍奉精神Lv3未満）
        await era.printAndWait(`「嗯…嗯啊…这、这样的话舒服吗、你…嗯…啊嗯」`);
        await era.printAndWait(
          `${target_name}虽然对胸部奉仕感到困惑，但还是在继续刺激着${player_name}的阴茎………`,
        );
      }
      kojo.乳交 = 1; // CFLAG:TARGET:333 = 1
      return 0;
    }
    // 二回目以降（八档）
    if (
      era0(`talent:${target}:78`) == 1 &&
      era0(`talent:${target}:76`) == 1 &&
      (kojo.乳交 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 弄乳狂+淫乱（RAND:2 二选一）
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「继续侵犯我的胸部吧…啊啊…用你的阴茎的话我多少次都能高潮…啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}露出放荡的表情用乳房蹭着${player_name}的阴茎。随着身体的上下摇动，又大又硬的乳头勃起着。`,
        );
        await era.printAndWait(
          `「嗯…啊嗯…啊啊…嗯${heart(1)} 就这样射精…然后就这样让我更舒服吧${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「啊啊…好舒服…我的胸部被侵犯得好舒服${heart(1)} 啊啊…嗯啊…嗯…啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}用乳房奉仕着，想要绝顶那样兴奋着。那表情好像要被快乐和下流融化一样。`,
        );
        await era.printAndWait(
          `「我的胸部…已经…不行了…这是这么做就这么舒服什么的…啊…啊啊…阴茎好热啊…${heart(1)}」`,
        );
      }
      kojo.乳交 = 8; // CFLAG:333 = 8
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.乳交 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait(`「嗯…用你的阴茎侵犯我的胸部吧…啊啊…啊啊♪」`);
      await era.printAndWait(
        `${target_name}看起来很高兴的舔了舔嘴唇，开始了胸部的奉仕。`,
      );
      await era.printAndWait(
        `「我的胸部是为了让你舒服而存在的…啊啊啊…${heart(1)}」`,
      );
      kojo.乳交 = 7; // CFLAG:333 = 7
    } else if (
      era0(`talent:${target}:78`) == 1 &&
      era0(`talent:${target}:85`) == 1 &&
      (kojo.乳交 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 弄乳狂+爱（RAND:2 二选一）
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「啊啊…我明明应该让你的阴茎感到舒服才对…啊…嗯…嗯啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}用胸部奉仕着${player_name}阴茎、乳头完全勃起，品味着快感。`,
        );
        await era.printAndWait(
          `「我的胸部…已经彻底变得奇怪了…啊啊…明明只是为你服务而已…好舒服啊${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「就这样用的胸部变得舒服…啊啊…满满的射出来啊…嗯…啊啊…嗯啊」`,
        );
        await era.printAndWait(
          `${target_name}带着出神的表情边用乳房奉仕边说道。`,
        );
        await era.printAndWait(
          `「你觉得舒服的话、我也会感觉很幸福的…啊啊${heart(1)}」`,
        );
      }
      kojo.乳交 = 6; // CFLAG:333 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.乳交 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait(`「呵呵呵、我的胸部…会让你很舒服的…♪」`);
      await era.printAndWait(
        `${target_name}像摩擦艳丽的乳头那样，开始奉仕${player_name}的阴茎。`,
      );
      await era.printAndWait(`「用我的…用我的胸部满满的射出来吧…${heart(1)}」`);
      kojo.乳交 = 5; // CFLAG:333 = 5
    } else if (
      era0(`talent:${target}:78`) == 1 &&
      (kojo.乳交 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 弄乳狂（RAND:2 二选一）
      if (rand_n(2) == 0) {
        await era.printAndWait(`「啊啊…我的胸部…被你的阴茎侵犯了呦…啊啊♪」`);
        await era.printAndWait(
          `${target_name}看起来很高兴的笑着用乳房夹住${player_name}的阴茎、继续着奉仕………`,
        );
      } else {
        await era.printAndWait(
          `「明明是这么屈辱的姿势…我的胸部太舒服了…啊啊…要融化了啊………」`,
        );
        await era.printAndWait(
          `${target_name}的两个乳头完全勃起着、${player_name}的阴茎品味着快乐好像变得大了………`,
        );
      }
      kojo.乳交 = 4; // CFLAG:333 = 4
    } else if (
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.乳交 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 侍奉精神Lv3以上
      await era.printAndWait(`「好像…啊啊…胸部变热了…啊、嗯！」`);
      await era.printAndWait(
        `${target_name}带着出神的表情继续奉仕着${player_name}的阴茎………`,
      );
      kojo.乳交 = 3; // CFLAG:333 = 3
    } else if (kojo.乳交 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外（侍奉精神Lv3未満）
      await era.printAndWait(
        `「嗯…嗯啊…总觉得胸部…啊嗯…我的胸部变得好奇怪…啊啊………」`,
      );
      await era.printAndWait(
        `${target_name}用笨拙的动作继续刺激着${player_name}的阴茎………`,
      );
      kojo.乳交 = 2; // CFLAG:333 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 33) {
    // 股间性交 CFLAG:334（无 RAND；二回目以降五档，顶两档额外要求 TALENT:0 处女）
    if (kojo.股间性交 == 0) {
      // 初めて
      if (era0(`talent:${target}:76`) == 1) {
        // 淫乱
        await era.printAndWait(
          `「用这种要活活急死人的姿势…啊啊…你好可恨啊…嗯…啊恩」`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        // 爱有り
        await era.printAndWait(
          `「啊啊、舒服吗？我也很舒服…啊…嗯…啊啊…啊啊…${heart(1)}」`,
        );
      } else {
        // それ以外（爱無し）
        await era.printAndWait(`「啊啊…让我做这种事…呜…咕…啊…啊…啊嗯」`);
        await era.printAndWait(
          `「嗯啊…你的那个太精神、好像快从胯下飞出来了似的………」`,
        );
      }
      kojo.股间性交 = 1; // CFLAG:TARGET:334 = 1
      return 0;
    }
    // 二回目以降（五档）
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`talent:${target}:0`) == 1 &&
      (kojo.股间性交 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱+处女
      await era.printAndWait(`「啊啊…呐…什么时候才会取走我的处女呢？」`);
      await era.printAndWait(
        `${target_name}的秘裂流着、每次摩擦都会发出下流的声音。`,
      );
      await era.printAndWait(
        `「你看…你看…明明我想要你的阴茎想要得不得了…你却不来拿…啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}激烈的动着腰的两腿之间，${player_name}拔走了阴茎。`,
      );
      await era.printAndWait(
        `「如果太难忍的话…啊…啊啊…呵呵呵、就这样直接插进来也可以哦…${heart(1)}」`,
      );
      await era.printAndWait(
        `「………开、开玩笑而已、我会好好的奉仕啦。只要让咱们两个都更舒服这件事不会忘的…啊啊♪」`,
      );
      await era.printAndWait(
        `${target_name}扑哧一笑，用股间把${player_name}的阴茎重新夹好、再次开始了股间性交奉仕………`,
      );
      kojo.股间性交 = 6; // CFLAG:334 = 6
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.股间性交 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「呵呵呵、用这种要活活急死人的姿势…啊啊…你好可恨啊…嗯…啊恩♪」`,
      );
      await era.printAndWait(
        `${target_name}的蜜裂里不停的溢出着的爱液沾满了${player_name}的阴茎。`,
      );
      await era.printAndWait(
        `「我为了你的阴茎明明什么都能得到、啊啊…好好…好好的插入我的小穴啊！」`,
      );
      await era.printAndWait(
        `${target_name}哀求着、但是${player_name}就像是要继续看她这种姿态一般，继续用阴茎摩擦这蜜裂。`,
      );
      await era.printAndWait(
        `「嗯…嗯…啊啊…好过分…我的小穴…明明想要你想要的不得了…啊啊${heart(1)}」`,
      );
      kojo.股间性交 = 5; // CFLAG:334 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`talent:${target}:0`) == 1 &&
      (kojo.股间性交 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱有り+处女
      await era.printAndWait(
        `「啊啊…好舒服…你的阴茎热得…我好想快融化一样…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}还不知道男性的蜜裂里漏出的爱液让那里变得更滑了。`,
      );
      await era.printAndWait(
        `「啊呢啊…${heart(1)} 我…嗯啊…变得这么舒服真的没关系吗…啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `「呐…你的东西插进我那里的话会变得更舒服吗？啊恩…啊啊…对、对不起、会好好的把股间性交做的更舒服的！」`,
      );
      await era.printAndWait(
        `${target_name}用被打了屁股而含着眼泪的眼睛看着${player_name}继续着股间性交奉仕………`,
      );
      kojo.股间性交 = 4; // CFLAG:334 = 4
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.股间性交 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 爱有り
      await era.printAndWait(
        `「啊啊、舒服吗？我很舒服哦…啊…嗯…啊啊…啊啊…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}经过锻炼的细长大腿为了更舒服而努力加紧。`,
      );
      await era.printAndWait(
        `「你的阴茎也这么热…啊啊…我的腿好像快融化了…嗯…啊嗯…啊啊嗯${heart(1)}」`,
      );
      await era.printAndWait(
        `「我…想要你的…快忍不住了…求你了…快点插进来吧！」`,
      );
      await era.printAndWait(
        `面对${target_name}的祈求，${player_name}打了${target_name}的屁股，然后继续股间性交奉仕。`,
      );
      await era.printAndWait(`「啊啊…对不起…我会让你更舒服的………」`);
      kojo.股间性交 = 3; // CFLAG:334 = 3
    } else if (kojo.股间性交 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外（爱無し）
      await era.printAndWait(`「额…啊啊…你的…感觉好热…啊啊…」`);
      await era.printAndWait(
        `${target_name}一边快要哭了一般皱着眉，一边夹紧大腿继续着股间性交。`,
      );
      await era.printAndWait(`「这么做的话，我会有感觉的…啊…啊嗯…啊啊！」`);
      kojo.股间性交 = 2; // CFLAG:334 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 34) {
    // 骑乘位 CFLAG:335（初めて 三层嵌套 处女×种族×性格 → 9 落点，同 20/21；
    // 二回目以降七档：淫乱+V感覚Lv3以上(8)/淫乱(7)/爱+V感覚Lv3以上(6)/爱慕(5)/屈服刻印Lv3+V感覚Lv3以上(4)/屈服刻印Lv3(3)/それ以外(2)）
    if (kojo.骑乘位 == 0) {
      // 初めて
      if (era0(`talent:${target}:0`) == 1) {
        // 处女
        if (era0(`talent:${target}:314`) == 9) {
          // 魔族
          if (era0(`talent:${target}:76`) == 1) {
            await era.printAndWait(
              `「嗯啊…你的阴茎插进…我的小穴里了…啊…啊啊啊…啊！」`,
            );
            await era.printAndWait(
              `${target_name}慢慢的沉下腰、能听到处女膜破裂的声音。`,
            );
            await era.printAndWait(
              `「呜…嗯啊啊…你那粗壮的…啊啊…已经完全征服了我的小穴${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}因为破瓜的痛楚和为${player_name}奉上处女的喜悦而后仰着张开了双翼。`,
            );
            await era.printAndWait(
              `${player_name}握着${target_name}的腰，用阴茎放出了魔力。`,
            );
            await era.printAndWait(
              `「啊啊啊…嗯嗯啊嗯啊…啊啊${heart(1)} 啊啊…你的魔力…感觉到…了…啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `已经是魔族的${target_name}的身体从内测被${player_name}的魔力侵染着。`,
            );
            await era.printAndWait(
              `「啊啊…我的肚子里好热…啊嗯…恩啊…动吧…让我的小穴变得舒服起来…啊…啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(`${target_name}生硬，但积极的动了起来。`);
            await era.printAndWait(`「啊…嗯…啊嗯…啊啊…啊啊啊${heart(1)}」`);
          } else if (era0(`talent:${target}:85`) == 1) {
            await era.printAndWait(
              `「啊啊…第一次奉献给你…魔王大人…啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}跨在${player_name}上面慢慢沉下了腰。`,
            );
            await era.printAndWait(`阴茎把蜜裂挤开、对准膣内插了进去。`);
            await era.printAndWait(
              `「嗯…啊啊啊…嗯…能感觉到…我的处女膜吗？啊…啊啊啊！」`,
            );
            await era.printAndWait(
              `阴茎往深处前进，能感觉到处女膜破了。然后${target_name}终于把完全坐了下来、把${player_name}的阴茎连根部也埋了进去。`,
            );
            await era.printAndWait(
              `${target_name}因为破瓜的痛楚和为${player_name}奉上处女的喜悦而后仰着张开了双翼。`,
            );
            await era.printAndWait(
              `「啊啊啊啊…嗯啊${heart(1)} 啊啊…现在不要动…我会让你舒服起来的…嗯…嗯啊！」`,
            );
            await era.printAndWait(
              `${player_name}握着${target_name}的腰，用阴茎放出了魔力。`,
            );
            await era.printAndWait(
              `「啊啊…啊啊嗯啊！啊嗯…我的肚子里…你的魔力满满的注入进来了…啊…啊啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `已经是魔族的${target_name}的身体从内测被${player_name}的魔力侵染着。`,
            );
            await era.printAndWait(
              `「你的魔力在子宫里留下了标记…啊啊…我已经无法从你身边离开了…${heart(1)}」`,
            );
          } else {
            await era.printAndWait(
              `「嗯…嗯…稍、稍微等一下…我还没有心理准备…啊！」`,
            );
            await era.printAndWait(
              `${target_name}虽然跨在${player_name}的上面就这样用蜜裂摩擦着阴、但还是无法下定决心。`,
            );
            await era.printAndWait(
              `恼羞成怒的${player_name}抓着${target_name}的腰强行的压了下去。`,
            );
            await era.printAndWait(`「啊！啊啊！不、不行！不行啊！」`);
            await era.printAndWait(
              `平时不会因为这种程度而失去平衡的${target_name}因为长时间的膝曲，沉下了腰。`,
            );
            await era.printAndWait(`「啊啊啊…啊啊…咕…咦…啊啊啊啊啊！！！」`);
            await era.printAndWait(
              `${player_name}没放过这个机会，挺起了腰插了进去、滋的一声直接查到了蜜壶的最深处。当然处女膜也毫不留情的被贯穿、破坏掉了。`,
            );
            await era.printAndWait(
              `想要逃跑的${target_name}的腰被抓住，${player_name}就这样从阴茎放出了魔力。`,
            );
            await era.printAndWait(
              `「啊啊…肚子…好热…不要…不要这样！我已经…不想…变得更加乱七八糟的了！…啊…啊啊啊！」`,
            );
            await era.printAndWait(
              `然后${player_name}为了让${target_name}明白到底谁是主人、阴茎慢慢开始了第一次抽插………`,
            );
          }
        } else {
          // 非魔族（种族分支同 3639，仅文本略去"我的魔族小穴"等种族用词）
          if (era0(`talent:${target}:76`) == 1) {
            await era.printAndWait(
              `「嗯啊…你的阴茎插进…我的小穴里了…啊…啊啊啊…啊！」`,
            );
            await era.printAndWait(
              `${target_name}慢慢的沉下腰、能听到处女膜破裂的声音。`,
            );
            await era.printAndWait(
              `「呜…嗯啊啊…你那粗壮的…啊啊…已经完全征服了我的小穴${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}因为破瓜的痛楚和为${player_name}奉上处女的喜悦而后仰着。`,
            );
            await era.printAndWait(
              `「啊啊啊…啊啊…嗯啊…全部都由我来…你不动也没关系…啊嗯${heart(1)}」`,
            );
            await era.printAndWait(`${target_name}生硬，但积极的动了起来。`);
            await era.printAndWait(`「啊…嗯…啊嗯…啊啊…啊啊啊${heart(1)}」`);
          } else if (era0(`talent:${target}:85`) == 1) {
            await era.printAndWait(
              `「啊啊…第一次奉献给你…魔王大人…啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}跨在${player_name}上面慢慢沉下了腰。`,
            );
            await era.printAndWait(`阴茎把蜜裂挤开、对准膣内插了进去。`);
            await era.printAndWait(
              `「嗯…啊啊啊…嗯…能感觉到…我的处女膜吗？啊…啊啊啊！」`,
            );
            await era.printAndWait(
              `阴茎往深处前进，能感觉到处女膜破了。然后${target_name}终于把完全坐了下来、把${player_name}的阴茎连根部也埋了进去。`,
            );
            await era.printAndWait(
              `${target_name}因为破瓜的痛楚和为${player_name}奉上处女的喜悦而后仰着。`,
            );
            await era.printAndWait(
              `「啊啊啊啊…嗯啊${heart(1)} 啊啊…现在不要动…我会让你舒服起来的…嗯…嗯嗯！」`,
            );
            await era.printAndWait(
              `看见呼吸困难的${target_name}、${player_name}开始从下面往上突刺。`,
            );
            await era.printAndWait(
              `「嗯…嗯啊…啊嗯！这样…不行…啊啊…嗯…快、快停下…啊啊…啊嗯！」`,
            );
          } else {
            await era.printAndWait(
              `「嗯…嗯…稍、稍微等一下…我还没有心理准备…啊！」`,
            );
            await era.printAndWait(
              `${target_name}虽然跨在${player_name}的上面就这样用蜜裂摩擦着阴、但还是无法下定决心。`,
            );
            await era.printAndWait(
              `恼羞成怒的${player_name}抓着${target_name}的腰强行的压了下去。`,
            );
            await era.printAndWait(`「啊！啊啊！不、不行！不行啊！」`);
            await era.printAndWait(
              `平时不会因为这种程度而失去平衡的${target_name}因为长时间的膝曲，沉下了腰。`,
            );
            await era.printAndWait(`「啊啊啊…啊啊…咕…咦…啊啊啊啊啊！！」`);
            await era.printAndWait(
              `${player_name}没放过这个机会，挺起了腰插了进去、滋的一声直接查到了蜜壶的最深处。当然处女膜也毫不留情的被贯穿、破坏掉了。`,
            );
            await era.printAndWait(
              `「怎么…怎么这样…咕…嗯嗯！还、还不要动…啊…啊啊！」`,
            );
          }
        }
      } else {
        // 非处女
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「呵呵呵、我会让你舒服起来的…你什么都不用做也可以哦…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}舔着嘴唇，腰下流的扭动着沉了下去。`,
          );
          await era.printAndWait(
            `用又湿润又灼热的蜜壶包裹着${player_name}的阴茎，不由得打了个寒颤。`,
          );
          await era.printAndWait(
            `「嗯啊啊${heart(1)} …你的阴茎又热又硬…啊嗯…腰自己动起来了…！」`,
          );
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「虽然很害羞…但是如果是你希望的话…这样从上面…啊！」`,
          );
          await era.printAndWait(
            `${target_name}一边红着脸，一边跨在${player_name}上面，沉下了腰。`,
          );
          await era.printAndWait(
            `「啊嗯…我动就好了…嗯啊…啊…嗯…嗯…嗯啊啊…不行、这样欺负我的话…啊嗯${heart(1)}」`,
          );
          await era.printAndWait(
            `配合着${target_name}的腰的上下移动，${player_name}从下面往上顶着。`,
          );
          await era.printAndWait(
            `「啊…啊啊！…呀啊…啊…嗯啊啊…你的插到最深处…了！啊啊${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「嗯啊…明明知道让我跨在你上面是多么愚蠢…嗯…啊啊啊！嗯、嗯啊！啊！」`,
          );
          await era.printAndWait(
            `虽然看见${target_name}在嘟囔着什么，但${player_name}毫不在意的挺着腰，享受着${target_name}的蜜壶。`,
          );
          await era.printAndWait(
            `「啊…嗯…啊啊！嗯…啊嗯…真，真是的…为什么…我这样好像被喜欢着一样…啊啊！」`,
          );
          await era.printAndWait(
            `看着在${player_name}的腰上跳舞一样的${target_name}、${player_name}把腰挺得更高了………`,
          );
        }
      }
      kojo.骑乘位 = 1; // CFLAG:TARGET:335 = 1
      return 0;
    }
    // 二回目以降（七档）
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:2`) >= 3 &&
      (kojo.骑乘位 <= 7 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱+V感覚Lv3以上（RAND:4→RAND:3→RAND:2 三层四选一）
      if (rand_n(4) == 0) {
        await era.printAndWait(
          `「嗯啊啊…${heart(1)} 你的阴茎…真好吃…啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}把${player_name}的阴茎吞进了蜜壶的最深处、慢慢的用腰做起了圆周运动。`,
        );
        await era.printAndWait(
          `「啊啊…这样的话阴茎的尖端和我的子宫口…啊${heart(1)} 就会咕啾咕啾的H的接吻…嗯啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `随着腰部的圆周运动的持续，猥琐的词${target_name}嘴里漏了出来。`,
        );
        await era.printAndWait(
          `「我的小穴和这根肉棒咕噜咕噜的搅在一起最舒服了${heart(1)} 啊啊${heart(1)} 还不能高潮哦？」`,
        );
        await era.printAndWait(
          `「你到我去为止都要忍耐${heart(1)} 啊啊…嗯啊啊啊嗯啊啊啊啊${heart(1)}」`,
        );
      } else if (rand_n(3) == 0) {
        await era.printAndWait(
          `「啊嗯…嗯啊嗯…还想要阴茎${heart(1)} 啊啊阴茎好棒${heart(1)}」`,
        );
        await era.printAndWait(
          `${player_name}和${target_name}两只手牵在一起、蜜壶和阴茎摩擦着，集中着触觉。`,
        );
        await era.printAndWait(
          `${target_name}一边喘息着流着口水，一边上下动着腰。`,
        );
        await era.printAndWait(
          `「嗯啊啊啊…你的阴茎连深处都蹭到了，好舒服${heart(1)} 继续侵犯，用你的精液把我的子宫全部染成白色吧${heart(1)}」`,
        );
        await era.printAndWait(
          `为了回应激烈的动着的${player_name}。结合部咕啾咕啾的响着水声的${target_name}的声调也越来越高。`,
        );
        await era.printAndWait(
          `「啊嗯…啊啊…嗯…啊啊！阴茎好棒…好舒服…我的小穴要发疯了啊啊啊啊啊${heart(1)}」`,
        );
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「啊嗯…嗯嗯…这样好舒服！继续插我的小穴…啊啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${player_name}握住${target_name}的腰、不停的不停的向上插着。`,
        );
        await era.printAndWait(`${target_name}后仰着发出了叫声。`);
        await era.printAndWait(
          `「啊嗯…嗯啊啊啊啊…要怪掉了…我的下流小穴…子宫被弄得乱七八糟的！然后变得更舒服了啊啊啊啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `听着已经可以说是尖叫的声音，${player_name}继续侵犯着${target_name}………`,
        );
      } else {
        await era.printAndWait(
          `「啊啊…就这样把阴茎插在里面生活明明是最棒的…嗯…啊嗯${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的腰沉在底部，就这样慢慢左右晃动，充分品味着阴茎的触感。`,
        );
        await era.printAndWait(
          `「所以就这样一直抱着我…啊…如何？不行吗？嗯${heart(1)} 不行的话，真可惜…啊啊！」`,
        );
        await era.printAndWait(
          `「那么作为代替，只有现在也好，你要一直插在小穴里…啊啊…啊嗯…啊嗯嗯啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}想品味着着阴茎一样，继续动着腰………`,
        );
      }
      kojo.骑乘位 = 8; // CFLAG:335 = 8
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.骑乘位 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「呵呵呵、我会让你舒服起来的…你什么都不用做也可以哦…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}舔着嘴唇，腰下流的扭动着沉了下去。`,
      );
      await era.printAndWait(
        `用又湿润又灼热的蜜壶包裹着${player_name}的阴茎，不由得打了个寒颤。`,
      );
      await era.printAndWait(
        `「嗯啊啊${heart(1)} …你的阴茎又热又硬…啊嗯…腰自己动起来了…！」`,
      );
      kojo.骑乘位 = 7; // CFLAG:335 = 7
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:2`) >= 3 &&
      (kojo.骑乘位 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 爱+V感覚Lv3以上（RAND:4→RAND:3→RAND:2 三层四选一）
      if (rand_n(4) == 0) {
        await era.printAndWait(
          `「啊嗯…啊啊啊…嗯啊…啊嗯…嗯…不要…绝对不要拔出来…啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的蜜壶接受着${player_name}的阴茎直到最深处、前后摇动着腰。`,
        );
        await era.printAndWait(
          `「啊啊！你的${heart(1)} 在亲吻子宫口…啊…啊啊！我已经…啊嗯…啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}喘着粗气，腰的动作激烈了起来………`);
      } else if (rand_n(3) == 0) {
        await era.printAndWait(
          `「啊嗯…恩…啊啊…嗯…嗯…我的…里面…更乱七八糟的了…啊啊！」`,
        );
        await era.printAndWait(
          `${player_name}和${target_name}两手牵在一起，发出着快乐的声音。`,
        );
        await era.printAndWait(
          `「嗯…啊啊…好棒…好舒服${heart(1)} 我已经离不开你了…啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的腰不停的动着、每动一次，都会漏出咕啾咕啾的水声………`,
        );
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「我还想继续…感受你…啊啊…啊嗯嗯嗯啊${heart(1)}」`,
        );
        await era.printAndWait(
          `每次${player_name}向上顶着腰，${target_name}都会漏出撒娇般的声音。`,
        );
        await era.printAndWait(
          `「啊嗯…啊啊…再…啊啊${heart(1)} 啊嗯深一点${heart(1)} 深一点${heart(1)}」`,
        );
        await era.printAndWait(
          `看着${target_name}快乐的好像快融化一样的表情，${player_name}更用力的动了起来………`,
        );
      } else {
        await era.printAndWait(
          `「啊嗯嗯${heart(1)} 不行啊…这么用力…啊啊${heart(1)} 啊啊嗯！」`,
        );
        await era.printAndWait(
          `${target_name}否定的话飘出的同时，${player_name}就那样抓住了腰顶了进去。`,
        );
        await era.printAndWait(
          `子宫口被龟头挖着${target_name}立刻兴奋了起来。`,
        );
        await era.printAndWait(
          `「啊啊啊啊${heart(1)} 你的…你这样实在太H了，不行啊…啊啊啊啊${heart(1)}」`,
        );
      }
      kojo.骑乘位 = 6; // CFLAG:335 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.骑乘位 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait(`「虽然不太想这样…俯视你…啊…啊嗯${heart(1)}」`);
      await era.printAndWait(
        `${target_name}一边红着脸一边跨在${player_name}上面沉下了腰。`,
      );
      await era.printAndWait(
        `「嗯啊…我来动就好…嗯…啊…嗯…嗯…啊嗯…再激烈一点比较好吗？」`,
      );
      await era.printAndWait(
        `${target_name}笨拙的上下动着腰、生疏而努力的奉仕着${player_name}。`,
      );
      await era.printAndWait(`「嗯…嗯…嗯啊…啊啊啊啊…嗯啊…啊啊…嗯${heart(1)}」`);
      kojo.骑乘位 = 5; // CFLAG:335 = 5
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      era0(`abl:${target}:2`) >= 3 &&
      (kojo.骑乘位 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 屈服刻印Lv3＋V感覚Lv3以上（RAND:3→RAND:2 二层三选一）
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「嗯啊…嗯啊！嗯嗯…要射出来了！…不然的话，我…啊啊！啊嗯！」`,
        );
        await era.printAndWait(
          `${target_name}的腰一扭一扭的上下动着、那已经完全“女人”的动作了。`,
        );
        await era.printAndWait(
          `珍珠一样的汗水在额头反着光、渐渐漏出了喘息的声音。`,
        );
        await era.printAndWait(
          `「啊…嗯啊…啊嗯…啊啊…我的啊嗯…啊啊…啊啊啊…啊——！」`,
        );
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「啊嗯…恩…啊啊…啊啊…嗯…啊嗯！啊啊…被侵犯的这么深…啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}像是要品味${player_name}的阴茎一样上下动着腰。`,
        );
        await era.printAndWait(`偶尔狠狠撞击到深处时，就会漏出有趣的喘息声。`);
        await era.printAndWait(
          `「啊嗯啊啊…嗯…啊啊啊！…是、似的…我已经被你开发的…有感觉了…啊…啊嗯啊！」`,
        );
      } else {
        await era.printAndWait(`「啊啊…不要再这么顶了…嗯嗯…啊！嗯…啊啊！」`);
        await era.printAndWait(
          `${target_name}被${player_name}插着、继续刺激着最敏感的地方。`,
        );
        await era.printAndWait(
          `一想到即使跨在${player_name}身上也还是被夺走了主导权的屈辱，${target_name}就留下了泪水。`,
        );
        await era.printAndWait(
          `「嗯嗯…嗯…我已经…受不了了…啊啊啊啊啊…嗯…嗯！」`,
        );
      }
      kojo.骑乘位 = 4; // CFLAG:335 = 4
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      (kojo.骑乘位 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 屈服刻印Lv3
      await era.printAndWait(`「嗯…嗯啊…啊嗯…恩…这、这样就可以了吧？」`);
      await era.printAndWait(
        `${target_name}笨拙的动着腰，看样子离有快感还很远。`,
      );
      await era.printAndWait(`「嗯啊…来吧，早点射出来吧…嗯…咕啊…啊…啊啊！」`);
      await era.printAndWait(
        `${player_name}配合着${target_name}的腰动着、${target_name}发出了模糊不清的悲鸣………`,
      );
      kojo.骑乘位 = 3; // CFLAG:335 = 3
    } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外
      await era.printAndWait(
        `「我坐在上面…真够大意的…啊嗯…即使不掐住你的脖子，杀死你的方法…啊…啊啊！」`,
      );
      await era.printAndWait(
        `虽然${target_name}在嘟囔着什么，但${player_name}毫不在意的挺着腰，享受着${target_name}的蜜壶。`,
      );
      await era.printAndWait(
        `「啊…嗯…啊啊！啊…嗯啊…我…啊…这样…不行…的…啊啊！」`,
      );
      await era.printAndWait(
        `看着在${player_name}的腰上跳舞一样的${target_name}、${player_name}把腰挺得更高了………`,
      );
      kojo.骑乘位 = 2; // CFLAG:335 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 35) {
    // 全身擦洗 CFLAG:336（无 A感覚 分档，四档；侍奉精神Lv3以上（三档）内嵌一条 SIF 独立于 CFLAG 推进）
    if (kojo.全身擦洗 == 0) {
      // 初めて
      if (era0(`abl:${target}:16`) >= 3) {
        // 侍奉精神Lv3以上
        await era.printAndWait(`「来，伸出手…这样帮你洗就行了吧？」`);
        await era.printAndWait(
          `「啊…啊嗯！不、不要欺负我啊！…啊…嗯嗯！就不能好好地洗澡么？」`,
        );
      } else {
        // それ以外
        await era.printAndWait(
          `「啊啊…我也是个女孩子啊…把身体洗干净是很舒服…但是不得不洗你的身体什么的…啊啊」`,
        );
        await era.printAndWait(`「而我的身体………」`);
      }
      kojo.全身擦洗 = 1; // CFLAG:TARGET:336 = 1
      return 0;
    }
    // 二回目以降（四档）
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:16`) >= 5 &&
      (kojo.全身擦洗 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱＋侍奉精神Lv5
      await era.printAndWait(
        `「啊嗯啊…啊啊…把手指…插进我里面也可以呦…啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}一边抱住${player_name}互相摩擦着上半身、一边把${player_name}的手拉到了自己的股间。`,
      );
      await era.printAndWait(
        `「我的小穴…啊啊！要用你的手指来洗…啊啊…嗯！再粗暴些也没关系${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}的喘息吹到了${player_name}的耳边，腰颤抖，痉挛着。`,
      );
      await era.printAndWait(
        `${player_name}的手指一根根的插了进去，搅拌着${target_name}的蜜裂。`,
      );
      await era.printAndWait(
        `「啊啊…我的身体…变干净了…嗯…啊嗯…啊啊…嗯…啊啊——${heart(1)}」`,
      );
      kojo.全身擦洗 = 5; // CFLAG:336 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:16`) >= 5 &&
      (kojo.全身擦洗 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋侍奉精神Lv5
      await era.printAndWait(
        `「啊啊…啊嗯…洗澡好舒服啊、啊啊…呵呵呵、有感觉养的地方吗？」`,
      );
      await era.printAndWait(
        `${target_name}抱着${player_name}，用肌肤摩擦着他的后背、勃起的乳头的触感理所当然的能清楚的感觉到。`,
      );
      await era.printAndWait(`「这里痒的已经快受不了了吧？」`);
      await era.printAndWait(
        `${target_name}一边坏笑着把手伸向${player_name}的股间握住了阴茎，一边继续洗背。`,
      );
      await era.printAndWait(
        `「啊啊…啊嗯…你的阴茎一抖一抖的…啊啊…洗起来好舒服！好舒服啊${heart(1)}」`,
      );
      kojo.全身擦洗 = 4; // CFLAG:336 = 4
    } else if (
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.全身擦洗 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 侍奉精神Lv3以上（SIF 独立分支，仅台词条件出现，CFLAG 推进不受影响）
      await era.printAndWait(
        `「啊啊…嗯…嗯啊…我帮你洗的很舒服吧？嗯啊…啊啊…啊嗯…啊啊…」`,
      );
      await era.printAndWait(
        `${target_name}把${player_name}加到了泡沫中的胸部中间、摩擦着。`,
      );
      await era.printAndWait(
        `「继续摸…我的胸部也可以…啊啊…所以老实的把澡洗完…嗯！嗯嗯！」`,
      );
      if (rand_n(3) == 0) {
        await era.printAndWait(`「总觉得想起了帮弟弟洗澡的时候………」`);
      }
      kojo.全身擦洗 = 3; // CFLAG:336 = 3
    } else if (kojo.全身擦洗 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外
      await era.printAndWait(
        `「老实点、这样我不是没法好好帮你洗了吗…啊嗯…嗯…啊啊！…喂、不要碰那里…啊啊！」`,
      );
      await era.printAndWait(
        `${target_name}开始用身体帮${player_name}洗澡。${target_name}勃起的乳头碰到了${player_name}的后背………`,
      );
      kojo.全身擦洗 = 2; // CFLAG:336 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 36) {
    // 骑乘位肛交 CFLAG:337（无处女判定，按 A感觉/ABL:3 分档；二回目细分 7 档，结构同 SELECTCOM 26-29）
    if (kojo.骑乘位肛交 == 0) {
      // 初めて
      if (era0(`talent:${target}:76`) == 1) {
        // 淫乱
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「嗯…嗯啊…啊啊…你的全部进来了…啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被开发了的肛门把${player_name}阴茎很美味似的吞了下去。`,
          );
          await era.printAndWait(`${target_name}左右晃动着腰，发出了喘息声。`);
          await era.printAndWait(
            `「嗯啊啊…那，差不多该认真的动起来了…啊嗯…恩…啊啊${heart(1)}」`,
          );
        } else {
          await era.printAndWait(`「你的全部进来了…啊啊…好、好紧…嗯…咕！」`);
          await era.printAndWait(
            `${target_name}那还未开发的肛门接受${player_name}阴茎的话，似乎还有些困难。`,
          );
          await era.printAndWait(`「但是…我会努力变得有感觉的…嗯…啊嗯！」`);
        }
      } else if (era0(`talent:${target}:85`) == 1) {
        // 爱慕
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊啊啊！…全都插进来…把你的全都插进我的肛门…啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被开发的肛门轻易的吞下了，并紧紧包裹着${player_name}的阴茎。`,
          );
          await era.printAndWait(
            `${target_name}一边兴奋的喘着粗气，一边上下动着腰。`,
          );
          await era.printAndWait(
            `「我的肛门好舒服！…啊嗯…嗯啊啊啊啊${heart(1)}」`,
          );
        } else {
          await era.printAndWait(`「咕…好…紧…嗯啊啊啊…啊嗯…啊啊！」`);
          await era.printAndWait(
            `${target_name}那还未开发的肛门接受${player_name}阴茎的话，似乎还有些困难。`,
          );
          await era.printAndWait(
            `「嗯啊…我来动…嗯…让你舒服起来…啊…${heart(1)}」`,
          );
        }
      } else {
        // それ以外（爱無し）
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(`「嗯…嗯嗯！我的肛门啊…啊啊！嗯啊啊啊！」`);
          await era.printAndWait(
            `经由${player_name}的手开发过的${target_name}的肛门轻易的接受了阴茎。`,
          );
          await era.printAndWait(`「啊啊…嗯啊…嗯…啊啊…啊…啊嗯嗯！」`);
          await era.printAndWait(
            `${player_name}向上挺着腰侵犯着${target_name}肛门……`,
          );
        } else {
          await era.printAndWait(`「咕…全都进来了…啊啊…好…好难受…咕！」`);
          await era.printAndWait(
            `${target_name}未开发的肛门，紧紧地包住了${player_name}的阴茎。`,
          );
          await era.printAndWait(
            `${target_name}被${player_name}压住了腰，根本没法逃跑。`,
          );
          await era.printAndWait(`「啊啊…已、已经不行了…啊啊！」`);
        }
      }
      kojo.骑乘位肛交 = 1; // CFLAG:TARGET:337 = 1
      return 0;
    }
    // 二回目以降（七档：淫乱+A感觉Lv3以上 7 / 淫乱 6 / 爱+A感觉Lv3以上 5 / 爱慕 4 / A感觉Lv3以上 3 / それ以外 2）
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.骑乘位肛交 <= 6 || game.kojo.口上开关 == 2)
    ) {
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「嗯…嗯啊…啊啊…你的全部进来了…啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被开发了的肛门把${player_name}阴茎很美味似的吞了下去。`,
        );
        await era.printAndWait(`${target_name}左右晃动着腰，发出了喘息声。`);
        await era.printAndWait(
          `「嗯啊啊…那，差不多该认真的动起来了…啊嗯…恩…啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `「在我的肛门里…满满的射出来${heart(1)} 让我的肛门怀孕吧${heart(1)}」`,
        );
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「嗯…嗯…嗯啊…啊啊…啊啊…我的肛门…实在太舒服了…啊啊啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的腰不停的动着、每次抬起腰把阴茎往外拔的时候，都会漏出快要融化一样的表情`,
        );
        await era.printAndWait(
          `就那样一口气插下去的话腰就会颤抖起来。那已经是沉浸在快感里的母猪的表情了。`,
        );
        await era.printAndWait(
          `「啊…啊啊…嗯啊${heart(1)} 要融化了…肛门要融化了…啊啊——${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `${target_name}的肛门把${player_name}的阴茎直到根部都吞了下去、前后左右的摇晃着腰。`,
        );
        await era.printAndWait(
          `配合着淫乱的腰的动作${target_name}漏出了喘息声。`,
        );
        await era.printAndWait(
          `「啊嗯…嗯…嗯嗯…嗯啊嗯嗯${heart(1)} 就这样前后动的话…嗯！子宫的后面被摩擦的感觉…啊嗯${heart(1)}」`,
        );
        await era.printAndWait(
          `「嗯！这、这样…插过来的话…啊啊啊啊！啊…啊嗯${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的嘴里流出了唾液，${player_name}就这样继续突刺着肛门………`,
        );
      }
      kojo.骑乘位肛交 = 7; // CFLAG:337 = 7
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.骑乘位肛交 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait(`「你的全部进来了…啊啊…好、好紧…嗯…咕！」`);
      await era.printAndWait(
        `${target_name}那还未开发的肛门接受${player_name}阴茎的话，似乎还有些困难。`,
      );
      await era.printAndWait(`「嗯啊…只有你舒服也好…啊啊…啊嗯${heart(1)}」`);
      await era.printAndWait(
        `${target_name}继续在${player_name}的上面动着腰………`,
      );
      kojo.骑乘位肛交 = 6; // CFLAG:337 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.骑乘位肛交 <= 4 || game.kojo.口上开关 == 2)
    ) {
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「啊啊啊！…全都插进来…把你的全都插进我的肛门…啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被开发的肛门轻易的吞下了，并紧紧包裹着${player_name}的阴茎。`,
        );
        await era.printAndWait(
          `${target_name}一边兴奋的喘着粗气，一边上下动着腰。`,
        );
        await era.printAndWait(
          `「我的肛门好舒服！…啊嗯…嗯啊啊啊啊${heart(1)}」`,
        );
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「啊啊…我的肛门…好有感觉…嗯…啊嗯…啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的腰不停的动着、每次抬起腰把阴茎往外拔的时候，都会漏出快要融化一样的表情`,
        );
        await era.printAndWait(`就那样一口气插下去的话腰就会颤抖起来。`);
        await era.printAndWait(
          `「啊啊…你的好舒服！腰停不下来了…啊啊…啊嗯嗯啊嗯啊${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「嗯…啊嗯…啊啊…因为被你开发的原因，肛门舒服的快要坏掉了…啊啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}用力夹紧着肛门，前后摆动着。`);
        await era.printAndWait(
          `「啊啊…嗯、啊啊！嗯…从后面…啊啊…刺激子宫的感觉好舒服…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}带着快要融化一样的表情扭动着腰………`,
        );
      }
      kojo.骑乘位肛交 = 5; // CFLAG:337 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait(`「咕…嗯…啊…啊啊…嗯啊…啊！」`);
      await era.printAndWait(
        `${target_name}那还未开发的肛门接受${player_name}阴茎的话，似乎还有些困难。`,
      );
      await era.printAndWait(`「嗯啊…我来动…嗯…让你舒服起来…啊…${heart(1)}」`);
      await era.printAndWait(`${target_name}笨拙的动着腰，继续这肛门的奉仕………`);
      kojo.骑乘位肛交 = 4; // CFLAG:337 = 4
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // A感觉Lv3以上
      await era.printAndWait(`「啊啊…腰擅自…动起来了…嗯…嗯啊…嗯…啊啊啊啊！」`);
      await era.printAndWait(
        `经由${player_name}的手开发过的${target_name}的肛门轻易的接受了阴茎。`,
      );
      await era.printAndWait(
        `「啊啊…嗯啊…嗯…啊啊…啊…啊嗯嗯！再、再继续的话…啊啊啊啊啊！」`,
      );
      await era.printAndWait(
        `${player_name}向上顶着腰，侵犯着${target_name}的肛门………`,
      );
      kojo.骑乘位肛交 = 3; // CFLAG:337 = 3
    } else if (kojo.骑乘位肛交 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外（爱無し、A感觉Lv3未满）
      await era.printAndWait(`「啊…好、好紧…咕…嗯咕！」`);
      await era.printAndWait(
        `${target_name}未开发的肛门，紧紧地包住了${player_name}的阴茎。`,
      );
      await era.printAndWait(
        `${target_name}被${player_name}压住了腰，根本没法逃跑。`,
      );
      await era.printAndWait(`「快、快停下…啊啊…咕、啊嗯…啊啊——！」`);
      kojo.骑乘位肛交 = 2; // CFLAG:337 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 37) {
    // 肛门侍奉 CFLAG:338（无 A感觉/淫乱-爱慕 初めて分档，结构同 SELECTCOM 35 的二回目四档）
    if (kojo.肛门侍奉 == 0) {
      // 初めて
      if (era0(`abl:${target}:16`) >= 3) {
        // 侍奉精神Lv3以上
        await era.printAndWait(
          `「你都是让别人帮你把那里舔干净吧…啊啊、我明白…真没办法」`,
        );
        await era.printAndWait(`「嗯…嗯嗯…嗯…啾…就…嗯啾…嗯…嗯啊」`);
      } else {
        // それ以外（侍奉精神Lv3未满）
        await era.printAndWait(
          `「这么干怎么说都有点………唉、我明白的、不想干也得干对吧？」`,
        );
        await era.printAndWait(`「嗯咕…呜…呜…啾…嗯…嗯啊」`);
      }
      kojo.肛门侍奉 = 1; // CFLAG:TARGET:338 = 1
      return 0;
    }
    // 二回目以降（四档：淫乱＋侍奉精神Lv5(5)/爱＋侍奉精神Lv5(4)/侍奉精神Lv3以上(3)/それ以外(2)）
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:16`) >= 5 &&
      (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱＋侍奉精神Lv5
      await era.printAndWait(
        `「如果弄得很舒服的话…有奖励吧？…嗯、啊啊啊………♪」`,
      );
      await era.printAndWait(
        `${target_name}高兴的张开嘴一边下流的留着口水一边开始舔舐${player_name}的肛门。`,
      );
      await era.printAndWait(
        `「嗯咕…啾咕…啾…嗯…嗯啾…啾…你的肛门真美味…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}眼睛中的情欲松弛了下来、完全不在意的舔舐着${player_name}的不净的场所。`,
      );
      await era.printAndWait(
        `「你看、我要把舌头放进你的肛门里了…再放松点…嗯…嗯…啾…${heart(1)}」`,
      );
      kojo.肛门侍奉 = 5; // CFLAG:338 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:16`) >= 5 &&
      (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋侍奉精神Lv5
      await era.printAndWait(
        `「啊啊…只是舔着你的肛门而已、就这么幸福什么的、我已经离不开你了…啾」`,
      );
      await era.printAndWait(
        `${target_name}高兴地张开嘴伸出舌头、发出着水声舔舐着${player_name}的肛门。`,
      );
      await era.printAndWait(`「嗯啾…啾…啾…嗯…嗯啾…啾…嗯…啊啊」`);
      await era.printAndWait(`「啊啊…我给你当狗也可以…啾${heart(1)}」`);
      kojo.肛门侍奉 = 4; // CFLAG:338 = 4
    } else if (
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 侍奉精神Lv3以上
      await era.printAndWait(
        `「嗯…舔你的肛门什么的，明明应该很屈辱…嗯…嗯啊…啊啊…啾…♪」`,
      );
      await era.printAndWait(
        `${target_name}一边喘着粗气一边舔着${player_name}的肛门。`,
      );
      await era.printAndWait(`「嗯啾…啾…嗯…啾…♪」`);
      kojo.肛门侍奉 = 3; // CFLAG:338 = 3
    } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外（侍奉精神Lv3未满）
      await era.printAndWait(`「嗯嗯…我的舌头…会烂掉的…嗯…嗯嗯…咕…嗯嗯！」`);
      await era.printAndWait(
        `${target_name}一边眼里含着泪，一边服侍着${player_name}的肛门………`,
      );
      kojo.肛门侍奉 = 2; // CFLAG:338 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 40) {
    // 打屁股 CFLAG:341（初めて 单档；二回目以降四档，受虐狂っ気/ABL:21）
    if (kojo.打屁股 == 0) {
      // 初めて
      await era.printAndWait(
        `「呃…学别人拷问我么？你这么干的话，很容易就能忍住吧……嗯！啊嗯！」`,
      );
      await era.printAndWait(
        `「嗯？…打屁股吗！？…啊啊！我明明已经不是小孩子了！」`,
      );
      kojo.打屁股 = 1; // CFLAG:TARGET:341 = 1
      return 0;
    }
    // 二回目以降（四档：淫乱＋受虐狂っ気Lv3(5)/爱＋受虐狂っ気Lv3(4)/苦痛刻印Lv3+屈服刻印Lv3(3)/それ以外(2)）
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.打屁股 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱＋受虐狂っ気Lv3
      await era.printAndWait(
        `「再继续打我的屁股！啊啊啊！呀…呀啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}随着被打屁股而发出了娇喘、身体一抖一抖的痉挛了起来。`,
      );
      await era.printAndWait(
        `「被你打屁股…啊啊…好舒服…啊啊…啊啊啊——${heart(1)}」`,
      );
      await era.printAndWait(
        `「啊嗯…我的身体变成这样，你要负责任啊…啊嗯…啊啊嗯${heart(1)}」`,
      );
      kojo.打屁股 = 5; // CFLAG:TARGET:341 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.打屁股 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋受虐狂っ気Lv3
      await era.printAndWait(
        `「啊啊…这么中意我的屁股的话…啊嗯…用咬的…就这样吃下去也可以呦…啊嗯${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}因为被打屁股而漏出了娇喘。连疼痛都变成快感而露出了痴迷的表情。`,
      );
      await era.printAndWait(`「啊嗯…啊啊…你真是坏心眼、只打我的屁股………啊嗯」`);
      await era.printAndWait(`「我想做的事却全都不做…啊…啊啊——！」`);
      kojo.打屁股 = 4; // CFLAG:TARGET:341 = 4
    } else if (
      era0(`mark:${target}:0`) == 3 &&
      era0(`mark:${target}:2`) == 3 &&
      (kojo.打屁股 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 苦痛刻印Lv3+屈服刻印Lv3
      await era.printAndWait(
        `「嗯…不要…啊啊…这个打的方式…啊啊啊…和父亲大人打我的方式好像…嗯…咕！」`,
      );
      await era.printAndWait(
        `${target_name}想起了曾经屈辱的感觉，一边含着眼泪一边继续被打着。`,
      );
      await era.printAndWait(
        `「啊…啊啊…对不起对不起…明明输了还…啊啊…这么屈辱的活着！」`,
      );
      kojo.打屁股 = 3; // CFLAG:TARGET:341 = 3
    } else if (kojo.打屁股 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外
      await era.printAndWait(`「不更用力的话…啊…不会痛哦…啊嗯」`);
      await era.printAndWait(`${target_name}被打着屁股依然笑着………`);
      kojo.打屁股 = 2; // CFLAG:TARGET:341 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 41) {
    // 鞭 CFLAG:342（初めて 单档；二回目以降八档，受虐狂っ気/ABL:21 三级门槛叠 淫乱/爱/单独）
    if (kojo.鞭 == 0) {
      // 初めて
      await era.printAndWait(
        `「啊啊、终于用对待俘虏的方式对待我了。来，照你想的去做吧！」`,
      );
      await era.printAndWait(
        `${target_name}看起来很高兴的接受着${player_name}的鞭打………`,
      );
      kojo.鞭 = 1; // CFLAG:TARGET:342 = 1
      return 0;
    }
    // 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:21`) >= 5 &&
      (kojo.鞭 <= 8 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱＋受虐狂っ気Lv5以上
      await era.printAndWait(
        `「啊啊…想要你的鞭子…你的惩罚…做了很多不好的事情哦…啊嗯…啊啊…请继续用鞭子打我！」`,
      );
      await era.printAndWait(
        `${target_name}每次被${player_name}打都发出了好像是故意一样的喘息………`,
      );
      kojo.鞭 = 9; // CFLAG:TARGET:342 = 9
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.鞭 <= 7 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱＋受虐狂っ気Lv3以上
      await era.printAndWait(
        `「啊嗯…啊啊嗯！我的身体好像变奇怪了…啊嗯…你的鞭子很舒服什么的…」`,
      );
      await era.printAndWait(
        `${target_name}每次被${player_name}鞭打都会发出娇喘………`,
      );
      kojo.鞭 = 8; // CFLAG:TARGET:342 = 8
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.鞭 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait(`「啊嗯…啊啊啊…呵呵呵、这样…啊啊！」`);
      await era.printAndWait(
        `${target_name}就这样被${player_name}用鞭子抽打着，缩成了一团………`,
      );
      kojo.鞭 = 7; // CFLAG:TARGET:342 = 7
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:21`) >= 5 &&
      (kojo.鞭 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋受虐狂っ気Lv5以上
      await era.printAndWait(
        `「啊嗯…啊啊…继续打我！让我感受你的爱${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}每次被${player_name}打都发出了好像是故意一样的喘息………`,
      );
      kojo.鞭 = 6; // CFLAG:TARGET:342 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.鞭 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋受虐狂っ気Lv3以上
      await era.printAndWait(
        `「嗯…呵呵呵、感受到了你的爱了…啊啊！就、就是那里…啊嗯！」`,
      );
      await era.printAndWait(
        `${target_name}每次被${player_name}鞭打都会发出娇喘………`,
      );
      kojo.鞭 = 5; // CFLAG:TARGET:342 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.鞭 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「啊啊…用鞭子让我屈服，这是不相信我啊…啊啊…那就继续打吧…啊！」`,
      );
      await era.printAndWait(
        `${target_name}就这样被${player_name}用鞭子抽打着，缩成了一团………`,
      );
      kojo.鞭 = 4; // CFLAG:TARGET:342 = 4
    } else if (
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.鞭 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 受虐狂っ気Lv3以上
      await era.printAndWait(
        `「啊啊…由你继续在我的背上刻上伤痕吧…啊…啊啊——！」`,
      );
      await era.printAndWait(
        `${target_name}每次被${player_name}鞭打都会发出娇喘………`,
      );
      kojo.鞭 = 3; // CFLAG:TARGET:342 = 3
    } else if (kojo.鞭 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外
      await era.printAndWait(
        `「咕…啊啊！呵呵呵…真不愧是这个鞭子，不是一般的疼啊…上次打出来的红肿还这么显眼，看样子消肿还要很长时间」`,
      );
      await era.printAndWait(
        `${target_name}一边开着玩笑一边承受着${player_name}的鞭子………`,
      );
      kojo.鞭 = 2; // CFLAG:TARGET:342 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 42) {
    // 针 CFLAG:343（初めて 单档；二回目以降八档，结构同 SELECTCOM 41 鞭）
    if (kojo.针 == 0) {
      // 初めて
      await era.printAndWait(
        `「呵呵呵、用针扎人的话，不扎像指甲缝之类更疼的地方可是没用的呦…？」`,
      );
      kojo.针 = 1; // CFLAG:TARGET:343 = 1
      return 0;
    }
    // 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:21`) >= 5 &&
      (kojo.针 <= 8 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱＋受虐狂っ気Lv5以上
      await era.printAndWait(
        `「啊啊…嗯…把针扎刺进我勃起的乳头里吧…啊啊${heart(1)}」`,
      );
      await era.printAndWait(`「这样我就能高潮了…啊啊…喂、求你了${heart(1)}」`);
      await era.printAndWait(
        `${player_name}听从了${target_name}的愿望、把针刺进了乳头。`,
      );
      await era.printAndWait(`「咕啊…啊啊…呀——！好厉害…啊啊…去了啊啊啊——！」`);
      kojo.针 = 9; // CFLAG:TARGET:343 = 9
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.针 <= 7 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱＋受虐狂っ気Lv3以上
      await era.printAndWait(`「啊啊…继续刺下来…啊…啊啊…啊嗯${heart(1)}」`);
      await era.printAndWait(
        `${player_name}如${target_name}所愿的那样，把针一根根的深深插入${target_name}的肌肤………`,
      );
      kojo.针 = 8; // CFLAG:TARGET:343 = 8
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.针 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait(`「啊啊！…嗯啊…咕…痛！」`);
      await era.printAndWait(`${target_name}的身体被针扎着，流着血………`);
      kojo.针 = 7; // CFLAG:TARGET:343 = 7
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:21`) >= 5 &&
      (kojo.针 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋受虐狂っ気Lv5以上
      await era.printAndWait(`「不要这么普通的用针扎啊…」`);
      await era.printAndWait(
        `「如果想让我成为你的东西的话…把我的…把我的双眼缝起来，手脚缝在一起…」`,
      );
      await era.printAndWait(
        `「我一直就这样等着你…什么时候都可以…啊啊！嗯！」`,
      );
      await era.printAndWait(
        `${player_name}为了${target_name}安静下来，姑且先扎了嘴唇………`,
      );
      kojo.针 = 6; // CFLAG:TARGET:343 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.针 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋受虐狂っ気Lv3以上
      await era.printAndWait(`「啊啊…扎得再深一点…不这样的话感觉不到疼啊！」`);
      await era.printAndWait(
        `如${target_name}所愿的那样，针一根根的深深插入${target_name}的肌肤………`,
      );
      kojo.针 = 5; // CFLAG:TARGET:343 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.针 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait(`「啊啊…被你扎好舒服…呜…咕…啊！」`);
      await era.printAndWait(`${target_name}露出着被针扎着，流着血的身体………`);
      kojo.针 = 4; // CFLAG:TARGET:343 = 4
    } else if (
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.针 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 受虐狂っ気Lv3以上
      await era.printAndWait(`「啊啊…你的针…啊嗯…深一点…嗯…啊啊…咕！」`);
      await era.printAndWait(`${target_name}的皮肤上到处都流着血、喘着粗气………`);
      kojo.针 = 3; // CFLAG:TARGET:343 = 3
    } else if (kojo.针 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外
      await era.printAndWait(
        `「嗯…嗯…咕…嗯！……呵呵呵、还早得很呢…就这样…还没发让我屈服」`,
      );
      await era.printAndWait(
        `${target_name}带着有余裕的表情露出了沾满鲜血的身体………`,
      );
      kojo.针 = 2; // CFLAG:TARGET:343 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`)) {
    // 眼罩 CFLAG:344（開始時，TEQUIP:43 已装）
    if (kojo.眼罩 == 0) {
      // 初めて
      await era.printAndWait(
        `「呵呵呵、拷问也好调教也好、遮断感觉都是常用手段呢」`,
      );
      await era.printAndWait(`${target_name}呼的一笑，戴上了眼罩………`);
      kojo.眼罩 = 1; // CFLAG:TARGET:344 = 1
      return 0;
    }
    // 二回目以降（八档：淫乱/爱两支各叠受虐狂っ気Lv5以上/Lv3以上/单独三级，加受虐狂っ気Lv3以上与それ以外）
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:21`) >= 5 &&
      (kojo.眼罩 <= 8 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱＋受虐狂っ気Lv5以上
      await era.printAndWait(
        `「不光蒙眼…也用绳子把我帮上的话我会很高兴的…啊啊${heart(1)}」`,
      );
      kojo.眼罩 = 9; // CFLAG:TARGET:344 = 9
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.眼罩 <= 7 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱＋受虐狂っ気Lv3以上
      await era.printAndWait(`「蒙上眼的话…啊啊…敏感度好像确实提高了…」`);
      kojo.眼罩 = 8; // CFLAG:TARGET:344 = 8
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.眼罩 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait(`「啊啊、好像兴奋起来了…」`);
      kojo.眼罩 = 7; // CFLAG:TARGET:344 = 7
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:21`) >= 5 &&
      (kojo.眼罩 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋受虐狂っ気Lv5以上
      await era.printAndWait(
        `「不光蒙眼…也用绳子把我帮上的话我会很高兴的…啊啊${heart(1)}」`,
      );
      kojo.眼罩 = 6; // CFLAG:TARGET:344 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.眼罩 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋受虐狂っ気Lv3以上
      await era.printAndWait(`「蒙上眼的话…啊啊…敏感度好像确实提高了…」`);
      kojo.眼罩 = 5; // CFLAG:TARGET:344 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.眼罩 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait(`「想对我恶作剧吗？」`);
      kojo.眼罩 = 4; // CFLAG:TARGET:344 = 4
    } else if (
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.眼罩 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 受虐狂っ気Lv3以上
      await era.printAndWait(`「啊啊、蒙着眼真好…来吧、玩弄我的身体吧………♪」`);
      kojo.眼罩 = 3; // CFLAG:TARGET:344 = 3
    } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外
      await era.printAndWait(`「呵呵呵、还要蒙着眼玩吗？」`);
      kojo.眼罩 = 2; // CFLAG:TARGET:344 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`) == 0) {
    // 眼罩 CFLAG:380（終了時，TEQUIP:43 已摘下；三档台词相同，仅推进门槛/CFLAG 不同）
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.眼罩着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait(`「呵呵呵、玩得很高兴」`);
      kojo.眼罩着脱 = 3; // CFLAG:380 = 3
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.眼罩着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait(`「呵呵呵、玩得很高兴」`);
      kojo.眼罩着脱 = 2; // CFLAG:380 = 2
    } else if (kojo.眼罩着脱 < 1 || game.kojo.口上开关 == 2) {
      // それ以外
      await era.printAndWait(`「呵呵呵、玩得很高兴」`);
      kojo.眼罩着脱 = 1; // CFLAG:380 = 1
    }
    return 0;
  } else if (era_flag.selectcom == 44 && era0(`tequip:${target}:44`)) {
    // 绳子 CFLAG:345（開始時，TEQUIP:44 已装；结构同 SELECTCOM 43 眼罩八档）
    if (kojo.绳子 == 0) {
      // 初めて
      await era.printAndWait(`「呵呵呵、你束缚还真熟练呢」`);
      await era.printAndWait(
        `「啊啊…不过如果不绑的更紧的话，我很容易就能从绳子里出来哦？」`,
      );
      kojo.绳子 = 1; // CFLAG:TARGET:345 = 1
      return 0;
    }
    // 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:21`) >= 5 &&
      (kojo.绳子 <= 8 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱＋受虐狂っ気Lv5以上
      await era.printAndWait(
        `「啊啊…更多的触碰…我被束缚的身体…啊嗯…感受我吧…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}的身体被绳子束缚住、乳房像要飞出来一样被绳子挤在一起………`,
      );
      kojo.绳子 = 9; // CFLAG:TARGET:345 = 9
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.绳子 <= 7 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱＋受虐狂っ気Lv3以上
      await era.printAndWait(
        `「啊啊…被这么紧的绑住的话…啊啊…就算是我也…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}被绳子束缚着，漏出了快融化一样的表情………`,
      );
      kojo.绳子 = 8; // CFLAG:TARGET:345 = 8
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.绳子 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait(`「呵呵呵、让我更尽兴吧♪」`);
      await era.printAndWait(`${target_name}被绳子绑了起来………`);
      kojo.绳子 = 7; // CFLAG:TARGET:345 = 7
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:21`) >= 5 &&
      (kojo.绳子 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋受虐狂っ気Lv5以上
      await era.printAndWait(
        `「喂…我漂亮吗…？ 被你用绳子绑起来…啊啊…没法反抗………${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}的身体被绳子束缚住、乳房像要飞出来一样被绳子挤在一起………`,
      );
      kojo.绳子 = 6; // CFLAG:TARGET:345 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.绳子 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋受虐狂っ気Lv3以上
      await era.printAndWait(`「啊啊…被绑起来的话…我也、啊…${heart(1)}」`);
      await era.printAndWait(
        `${target_name}被绳子束缚着，漏出了快融化一样的表情………`,
      );
      kojo.绳子 = 5; // CFLAG:TARGET:345 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.绳子 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「啊啊…如果是以前我很快就能从绳子里出来…被你绑的话就什么都办不到了………」`,
      );
      await era.printAndWait(`${target_name}因为被绳子绑着而陶醉着………`);
      kojo.绳子 = 4; // CFLAG:TARGET:345 = 4
    } else if (
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.绳子 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 受虐狂っ気Lv3以上
      await era.printAndWait(`「啊啊啊、绳子勒得好紧…啊啊…」`);
      await era.printAndWait(`${target_name}因为被绳子绑着而陶醉着………`);
      kojo.绳子 = 3; // CFLAG:TARGET:345 = 3
    } else if (kojo.绳子 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外
      await era.printAndWait(
        `「嗯…呵呵呵、果然被这么紧的绑住的话…啊啊…还真是逃不了呢」`,
      );
      kojo.绳子 = 2; // CFLAG:TARGET:345 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 44 && era0(`tequip:${target}:44`) == 0) {
    // 绳子 CFLAG:385（終了時，TEQUIP:44 已解开；淫乱/爱慕同档 <2，それ以外 <1）
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait(`「啊嗯…还不要解开绳子啊！」`);
      kojo.绳子着脱 = 2; // CFLAG:385 = 2
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait(`「明明还想继续被绑起来…」`);
      kojo.绳子着脱 = 2; // CFLAG:385 = 2
    } else if (kojo.绳子着脱 < 1 || game.kojo.口上开关 == 2) {
      // それ以外
      await era.printAndWait(`「这就解开了么？」`);
      kojo.绳子着脱 = 1; // CFLAG:385 = 1
    }
    return 0;
  } else if (era_flag.selectcom == 45 && era0(`tequip:${target}:45`)) {
    // 口塞 CFLAG:346（開始時，TEQUIP:45 已装；结构同 SC43/44 八档，
    // 上六档各嵌一层 IF TEQUIP:43（眼罩）分岔追加句尾——PRINTFORM 不换行不等待，
    // 接续的 PRINTW 才等待，两者拼成一整句）
    if (kojo.口塞 == 0) {
      // 初めて
      await era.printAndWait(
        `「啊啊…就这样让我戴上口枷…要做很过分的事吗………♪」`,
      );
      kojo.口塞 = 1; // CFLAG:TARGET:346 = 1
      return 0;
    }
    // 二回目以降
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:21`) >= 5 &&
      (kojo.口塞 <= 8 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱＋受虐狂っ気Lv5以上
      await era.printAndWait(
        `「我舒服起来之后一直都很吵呢…没办法呢……${heart(1)}」`,
      );
      // 同一行输出：无后缀 PRINTFORM 与 IF 首支的 PRINTW 同属一行（#622）。
      // 另一支与首支互斥、自带收行，只能自己成句。前缀「X自己戴上了口枷」
      // 因此在两处各写一次，是有意的：首支那句要自带完整行（拼接基准的槽位序要含
      // %SAVESTR:TARGET%），而另一支的记号集是空集，改成 ${} 槽位会判成多一个记号
      const mouth_gag_word = `${target_name}自己戴上了口枷`;
      if (era0(`tequip:${target}:43`)) {
        await era.printAndWait(
          `${target_name}自己戴上了口枷` + `嘴的缝隙里，漏出了灼热的吐息………`,
        );
      } else {
        await era.printAndWait(mouth_gag_word + `眼神快融化了………`);
      }
      kojo.口塞 = 9; // CFLAG:TARGET:346 = 9
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.口塞 <= 7 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱＋受虐狂っ気Lv3以上
      await era.printAndWait(`「啊啊、带上这个…总觉得怪怪的…嗯咕………」`);
      // 与上一段同型（#622）
      const mouth_gag_word = `${target_name}被按上了口塞`;
      if (era0(`tequip:${target}:43`)) {
        await era.printAndWait(
          `${target_name}被按上了口塞` + `嘴的缝隙里，漏出了灼热的吐息………`,
        );
      } else {
        await era.printAndWait(mouth_gag_word + `眼神快融化了………`);
      }
      kojo.口塞 = 8; // CFLAG:TARGET:346 = 8
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.口塞 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait(`「我的嘴想要的明明不是这个…嗯…嗯咕…」`);
      // 与上一段同型（#622；本档另一支含 %SAVESTR:PLAYER%）
      const mouth_gag_word = `${target_name}被戴上了口塞`;
      if (era0(`tequip:${target}:43`)) {
        await era.printAndWait(
          `${target_name}被戴上了口塞` + `嘴的缝隙里，漏出了灼热的吐息………`,
        );
      } else {
        await era.printAndWait(mouth_gag_word + `皱着眉看着${player_name}………`);
      }
      kojo.口塞 = 7; // CFLAG:TARGET:346 = 7
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:21`) >= 5 &&
      (kojo.口塞 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋受虐狂っ気Lv5以上
      await era.printAndWait(`「啊嗯…恩…嗯咕………！」`);
      // 与上一段同型（#622）
      const mouth_gag_word = `${target_name}被按上了口塞`;
      if (era0(`tequip:${target}:43`)) {
        await era.printAndWait(
          `${target_name}被按上了口塞` + `嘴的缝隙里，漏出了灼热的吐息………`,
        );
      } else {
        await era.printAndWait(mouth_gag_word + `眼神快融化了………`);
      }
      kojo.口塞 = 6; // CFLAG:TARGET:346 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.口塞 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋受虐狂っ気Lv3以上
      await era.printAndWait(`「啊嗯…恩…嗯咕………！」`);
      // 与上一段同型（#622）
      const mouth_gag_word = `${target_name}被按上了口塞`;
      if (era0(`tequip:${target}:43`)) {
        await era.printAndWait(
          `${target_name}被按上了口塞` + `嘴的缝隙里，漏出了灼热的吐息………`,
        );
      } else {
        await era.printAndWait(mouth_gag_word + `眼神快融化了………`);
      }
      kojo.口塞 = 5; // CFLAG:TARGET:346 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.口塞 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait(`「啊嗯…恩…嗯咕………！」`);
      // 与上一段同型（#622；本档另一支含 %SAVESTR:PLAYER%）
      const mouth_gag_word = `${target_name}被按上了口塞`;
      if (era0(`tequip:${target}:43`)) {
        await era.printAndWait(
          `${target_name}被按上了口塞` + `嘴的缝隙里，漏出了灼热的吐息………`,
        );
      } else {
        await era.printAndWait(mouth_gag_word + `皱着眉看着${player_name}………`);
      }
      kojo.口塞 = 4; // CFLAG:TARGET:346 = 4
    } else if (
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.口塞 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 受虐狂っ気Lv3以上
      await era.printAndWait(
        `「嗯啊…被装上口枷的话，总觉得脑袋都要变成傻瓜了………」`,
      );
      // 与上一段同型（#622）
      const mouth_gag_word = `${target_name}被按上了口塞`;
      if (era0(`tequip:${target}:43`)) {
        await era.printAndWait(
          `${target_name}被按上了口塞` + `嘴的缝隙里，漏出了灼热的吐息………`,
        );
      } else {
        await era.printAndWait(mouth_gag_word + `眼神快融化了………`);
      }
      kojo.口塞 = 3; // CFLAG:TARGET:346 = 3
    } else if (kojo.口塞 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外
      await era.printAndWait(`「啊咕…嗯…」`);
      await era.printAndWait(
        `${target_name}被口塞堵住的嘴的缝隙里，漏出了声音………`,
      );
      kojo.口塞 = 2; // CFLAG:TARGET:346 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 45 && era0(`tequip:${target}:45`) == 0) {
    // 口塞 CFLAG:386（終了時，TEQUIP:45 已取下；三档台词相同，仅推进门槛/CFLAG 不同）
    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.口塞着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait(`「啊啊…嗯…嗯啊………」`);
      await era.printAndWait(`取下了口塞的${target_name}的嘴里，流下了唾液………`);
      kojo.口塞着脱 = 3; // CFLAG:386 = 3
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.口塞着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait(`「啊啊…嗯…嗯啊………」`);
      await era.printAndWait(`取下了口塞的${target_name}的嘴里，流下了唾液………`);
      kojo.口塞着脱 = 2; // CFLAG:386 = 2
    } else if (kojo.口塞着脱 < 1 || game.kojo.口上开关 == 2) {
      // それ以外
      await era.printAndWait(`「呼啊…嗯啊…」`);
      await era.printAndWait(`取下了口塞的${target_name}的嘴里，流下了唾液………`);
      kojo.口塞着脱 = 1; // CFLAG:386 = 1
    }
    return 0;
  } else if (era_flag.selectcom == 46 && era0(`tequip:${target}:46`)) {
    // 灌肠肛塞 CFLAG:347（開始時，TEQUIP:46 已装；无終了時分支，仅此一档）
    if (kojo.灌肠肛塞 == 0) {
      // 初めて
      await era.printAndWait(
        `「啊啊…嗯啊啊啊…！肚子…啊啊啊…好痛苦…嗯…嗯…快…快停下！」`,
      );
      await era.printAndWait(
        `就算是${target_name}，被这样大量的灌肠也开始哭着请求${player_name}的原谅。`,
      );
      await era.printAndWait(`「求、求你了…至少…厕所…呀…啊咕！」`);
      kojo.灌肠肛塞 = 1; // CFLAG:TARGET:347 = 1
      return 0;
    }
    // 二回目以降（六档：淫乱＋A感觉Lv3以上＋受虐狂っ気Lv3以上(7)/淫乱(6)/爱＋A感觉Lv3以上＋受虐狂っ気Lv3以上(5)/爱慕(4)/A感觉Lv3以上＋受虐狂っ気Lv3以上(3)/それ以外(2)）
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.灌肠肛塞 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱＋A感觉Lv3以上＋受虐狂っ気Lv3以上
      await era.printAndWait(
        `「啊啊！继续…继续把灌肠液灌进来！到我的肚子撑起来为止${heart(1)}」`,
      );
      await era.printAndWait(
        `${player_name}如${target_name}所愿一次次的灌着肠、插着肛塞的肛门附近，肚子越来越鼓。`,
      );
      await era.printAndWait(
        `「啊啊…啊啊啊…这个拔掉的话…会很厉害的喷出来吧…啊啊…啊啊嗯啊${heart(1)}」`,
      );
      kojo.灌肠肛塞 = 7; // CFLAG:347 = 7
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.灌肠肛塞 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait(`「啊呜…肚子…啊啊…这么…难受…啊啊…嗯啊啊…」`);
      await era.printAndWait(
        `${target_name}带着痛苦的表情忍耐着灌肠液的热度。`,
      );
      await era.printAndWait(`「啊啊…我最害羞的地方…被盯着…啊啊啊………」`);
      kojo.灌肠肛塞 = 6; // CFLAG:347 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.灌肠肛塞 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋A感觉Lv3以上＋受虐狂っ気Lv3以上
      await era.printAndWait(
        `「啊…啊嗯嗯！肚子里…全是灌肠液…嗯啊…这样我还有感觉什么的…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}一边喘着粗气一边感受着灌肠液的刺激。`,
      );
      await era.printAndWait(
        `「啊啊…你的话即使要看我最害羞的地方…啊啊也可以啊！」`,
      );
      kojo.灌肠肛塞 = 5; // CFLAG:347 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.灌肠肛塞 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait(`「啊啊…求你了…只、只有你…啊啊不想让你看见！」`);
      await era.printAndWait(
        `${target_name}一边流着泪，一边恳求着${player_name}。`,
      );
      await era.printAndWait(`「啊咕…灌、灌肠液好热！…啊啊…啊啊咕！」`);
      kojo.灌肠肛塞 = 4; // CFLAG:347 = 4
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.灌肠肛塞 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // A感觉Lv3以上＋受虐狂っ気Lv3以上
      await era.printAndWait(
        `「嗯啊…啊嗯！…我的肚子…啊啊…咕噜咕噜的响着…啊啊…啊嗯嗯嗯——！」`,
      );
      await era.printAndWait(
        `${target_name}在灌肠液的刺激下，一边流着汗，一边漏出了喘息。`,
      );
      await era.printAndWait(`而插上肛塞的时候，发出的声音格外的响………`);
      kojo.灌肠肛塞 = 3; // CFLAG:347 = 3
    } else if (kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外
      await era.printAndWait(`「不要…啊啊不要！啊啊…！不要这样！」`);
      await era.printAndWait(
        `${target_name}和想起了以前的屈辱而哭泣着，${player_name}毫不留情的灌了肠，并把肛塞塞进了肛门………`,
      );
      kojo.灌肠肛塞 = 2; // CFLAG:347 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 55) {
    // 放置PLAY CFLAG:356
    if (kojo.放置PLAY == 0) {
      // 初めて
      if (era0(`talent:${target}:85`) == 1) {
        // 爱慕
        await era.printAndWait(`「啊啊…已经…厌倦我了么？」`);
        await era.printAndWait(`${target_name}寂寞的嘟囔着………`);
      } else if (era0(`talent:${target}:76`) == 1) {
        // 淫乱
        await era.printAndWait(`「呐…我可是很讨厌放置play的…」`);
        await era.printAndWait(`${target_name}噘着嘴发出了抗议的声音………`);
      } else {
        // それ以外
        await era.printAndWait(
          `「稍微休息一下吗？倒不如就这样永远休息下去也可以呦」`,
        );
        await era.printAndWait(`${target_name}轻蔑的用鼻子笑着………`);
      }
      kojo.放置PLAY = 1; // CFLAG:356 = 1
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      palam(5) >= PALAMLV[3] &&
      (kojo.放置PLAY <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 二回目以降·淫乱＋欲情Lv3以上
      await era.printAndWait(
        `「啊啊…不被你碰，我都着急得快疯了、你这家伙………${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}的表情放松了下来、眼睛因为发情而湿润取来。有什么契机的话，好像就会那样把${player_name}推到一样………`,
      );
      kojo.放置PLAY = 6; // CFLAG:356 = 6
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.放置PLAY <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait(`「呐…我可是很讨厌放置play的…」`);
      await era.printAndWait(`${target_name}噘着嘴发出了抗议的声音………`);
      kojo.放置PLAY = 5; // CFLAG:356 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      palam(5) >= PALAMLV[3] &&
      (kojo.放置PLAY <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋欲情Lv3以上
      await era.printAndWait(`「啊啊…继续…疼爱我把…呐………」`);
      await era.printAndWait(`${target_name}轻轻地把手向${player_name}伸去………`);
      kojo.放置PLAY = 4; // CFLAG:356 = 4
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.放置PLAY <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait(`「呐、讨厌我了么…？」`);
      await era.printAndWait(`${target_name}用悲伤的眼睛看着${player_name}………`);
      kojo.放置PLAY = 3; // CFLAG:356 = 3
    } else if (kojo.放置PLAY <= 1 || game.kojo.口上开关 == 2) {
      // それ以外
      await era.printAndWait(`「呼、稍微休息一下吗…」`);
      await era.printAndWait(`${target_name}无聊的横躺在一边………`);
      kojo.放置PLAY = 2; // CFLAG:356 = 2
    }
    await era.print(''); // PRINTL（空行）
    // 无论初めて/二回目，附加当前装备状态的补充描写（SIF 逐项独立判定，与档位无关）
    if (era0(`tequip:${target}:11`)) {
      await era.printAndWait(
        `${target_name}的蜜裂里，蠕虫蠕动着、毫不留情的搅动着腔内。`,
      );
    }
    if (era0(`tequip:${target}:13`)) {
      await era.printAndWait(
        `${target_name}的肛门里，蠕虫蠕动着、毫不留情的蹂躏着肛门。`,
      );
    }
    if (era0(`tequip:${target}:19`)) {
      await era.printAndWait(
        `${target_name}的肛门里插着肛珠、肛门不停的抖动着。`,
      );
    }
    if (era0(`tequip:${target}:14`)) {
      await era.printAndWait(
        `${target_name}的阴蒂上装着的电动阴蒂夹，持续给予着刺激。`,
      );
    }
    if (era0(`tequip:${target}:15`)) {
      await era.printAndWait(
        `${target_name}的乳头上装着的乳头夹，持续给予着刺激。`,
      );
    }
    if (era0(`tequip:${target}:16`)) {
      await era.print(`${target_name}的胸部上装着榨乳器，吸出着母乳。`); // PRINTFORML（不等待）
    }
    if (era0(`tequip:${target}:17`)) {
      await era.printAndWait(
        `${target_name}的阴茎上套着飞机杯，现在也好像快射精一样被摩擦着。`,
      );
    }
    if (era0(`tequip:${target}:43`)) {
      await era.printAndWait(`${target_name}带着眼罩。`);
    }
    if (era0(`tequip:${target}:44`)) {
      await era.printAndWait(`${target_name}的身体被绳子绑住，束缚着。`);
    }
    if (era0(`tequip:${target}:46`)) {
      await era.printAndWait(
        `${target_name}的肚子因为被灌肠而发出咕噜咕噜的声音，把肛塞拔出来的话马上就会排出来吧。`,
      );
    }
    if (era0(`tequip:${target}:49`)) {
      await era.printAndWait(
        `${target_name}的肛门插入着电极，轻轻的电压每次流过，括约肌都会抖动。`,
      );
    }
    if (era0(`tequip:${target}:53`)) {
      await era.printAndWait(
        `然后、${target_name}这样的姿态被从头到尾录了下来………`,
      );
    }
    return 0;
  } else if (era_flag.selectcom == 56) {
    // 交谈 CFLAG:357
    const master_name = chara_name(0); // %NAME:MASTER%
    // 无后缀 PRINTFORM %SAVESTR:PLAYER%——它与后面 IF 链首支的收行同属
    // 一行（#622）。各支自带收行，前缀在分支外取值；首支那两句把整行写在一起
    // （拼接基准的槽位序要含 %SAVESTR:PLAYER%）
    const talk_prefix = `${player_name}`;
    // 快感装备（11/13/14/15/16/17 任一）→「快乐的」、痛苦装备
    // （44/49）→「痛苦的」（两处 IF/ELSEIF 的条件提到语句外，文本留在输出语句里）
    const equip_pleasure =
      era0(`tequip:${target}:11`) ||
      era0(`tequip:${target}:13`) ||
      era0(`tequip:${target}:14`) ||
      era0(`tequip:${target}:15`) ||
      era0(`tequip:${target}:16`) ||
      era0(`tequip:${target}:17`);
    const equip_pain =
      era0(`tequip:${target}:44`) || era0(`tequip:${target}:49`);
    if (kojo.交谈 == 0) {
      // 初めて
      if (era0(`tequip:${target}:53`) == 1) {
        // ビデオ自己紹介
        await era.print(`${player_name}催促着${target_name}进行自我介绍、`);
        if (era0(`talent:${target}:89`) || era0(`abl:${target}:17`) >= 5) {
          // 同一行输出：无后缀 PRINTFORM + SIF 的 PRINTFORM + 收行
          // 的 PRINTFORML（#622）。SIF 条件提到语句外当条件、文本留在输出语句里
          const masturbation = era0(`abl:${target}:31`) >= 3;
          await era.print(
            `${target_name}把自己的本名和至今为止的性经验` +
              (masturbation ? `甚至自慰时妄想的内容都` : '') +
              `微笑的娓娓道来……`,
          );
          await era.print(
            `只是期待着把水晶球的内容送到狂王那里去，股间就开始湿了……`,
          );
          game.kojo.录像内容 |= 2; // TFLAG:32 |= 2
        } else if (
          palam(5) >= PALAMLV[4] &&
          (era0(`talent:${target}:76`) || era0(`abl:${target}:11`) >= 5)
        ) {
          await era.print(`${target_name}向着水晶球开始说起了猥琐的语言`);
          game.kojo.录像内容 |= 2; // TFLAG:32 |= 2
        } else if (
          era0(`talent:${target}:85`) ||
          era0(`abl:${target}:10`) >= 3 ||
          era0(`abl:${target}:11`) >= 4 ||
          era0(`abl:${target}:17`) >= 2
        ) {
          await era.print(`${target_name}开始向水晶球进行自我介绍`);
          game.kojo.录像内容 |= 2; // TFLAG:32 |= 2
        } else {
          await era.print(`${target_name}把脸转向一边什么都没说`);
        }
      } else {
        // 无摄像
        if (
          palam(5) >= PALAMLV[4] &&
          (era0(`talent:${target}:85`) || era0(`abl:${target}:10`) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(
            `${player_name}刚和她交谈了几句、${target_name}就一边晃着腰一边说出了求爱的话语`,
          );
        } else if (
          palam(5) >= PALAMLV[4] &&
          (era0(`talent:${target}:76`) || era0(`abl:${target}:11`) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(
            talk_prefix +
              `刚和她交谈了几句、${target_name}就一边晃着腰，一边不停的说着猥琐的语言`,
          );
        } else if (
          (palam(4) >= PALAMLV[4] ||
            era0(`abl:${target}:10`) >= 5 ||
            era0(`talent:${target}:85`)) &&
          palam(5) >= PALAMLV[4]
        ) {
          // 同一行输出：无后缀 PRINTFORM + IF/ELSEIF 的
          // PRINT（互斥两支）+ 收行的 PRINTFORML（#622）
          await era.print(
            talk_prefix +
              `刚和她交谈了几句、${target_name}就一边发出着` +
              (equip_pleasure ? `快乐的` : equip_pain ? `痛苦的` : '') +
              `声音，一边拼命忍耐着的回着话`,
          );
        } else if (
          palam(4) >= PALAMLV[4] ||
          era0(`talent:${target}:85`) ||
          era0(`abl:${target}:10`) >= 5
        ) {
          await era.print(
            talk_prefix +
              `刚和她交谈了几句、${target_name}就毫无隔阂的回起话来`,
          );
        } else if (palam(4) >= PALAMLV[2] || era0(`abl:${target}:10`) >= 3) {
          await era.print(
            talk_prefix + `刚和她交谈了几句、${target_name}一点点的回起话来`,
          );
        } else {
          await era.print(
            talk_prefix +
              `刚和她说了几句话、${target_name}就好像认真的听了起来…`,
          );
        }
      }
      kojo.交谈 = 1; // CFLAG:357 = 1
      return 0;
    }
    // 二回目以降（不更新 CFLAG:357，此后每次都走这里）
    if (era0(`tequip:${target}:53`) == 1) {
      // ビデオ自己紹介
      await era.print(`${master_name}催促着${target_name}进行自我介绍、`);
      if (
        palam(5) >= PALAMLV[4] &&
        (era0(`talent:${target}:85`) || era0(`abl:${target}:10`) >= 5) &&
        game.event.插着不拔
      ) {
        await era.print(`${target_name}一边晃着腰一边说出了求爱的话语`);
        game.kojo.录像内容 |= 2; // TFLAG:32 |= 2
      } else if (
        palam(5) >= PALAMLV[4] &&
        (era0(`talent:${target}:76`) || era0(`abl:${target}:11`) >= 5) &&
        game.event.插着不拔
      ) {
        await era.print(`${target_name}一边晃着腰，一边不停的说着猥琐的语言`);
        game.kojo.录像内容 |= 2; // TFLAG:32 |= 2
      } else if (
        rand_n(3) == 0 &&
        (era0(`talent:${target}:89`) || era0(`abl:${target}:17`) >= 5)
      ) {
        const masturbation = era0(`abl:${target}:31`) >= 3;
        await era.print(
          `${target_name}把自己的本名和至今为止的性经验` +
            (masturbation ? `、甚至自慰时妄想的内容都` : '') +
            `一边微笑一边喋喋不休的讲着……`,
        );
        await era.print(
          `只是期待着把水晶球的内容送到狂王那里去，股间就开始湿了……`,
        );
        game.kojo.录像内容 |= 2; // TFLAG:32 |= 2
      } else if (
        palam(5) >= PALAMLV[4] &&
        (era0(`talent:${target}:76`) || era0(`abl:${target}:11`) >= 5)
      ) {
        await era.print(`${target_name}向着水晶球开始说起了猥琐的语言`);
        game.kojo.录像内容 |= 2; // TFLAG:32 |= 2
      } else if (
        era0(`talent:${target}:85`) ||
        era0(`abl:${target}:10`) >= 3 ||
        era0(`abl:${target}:11`) >= 4 ||
        era0(`abl:${target}:17`) >= 2
      ) {
        await era.print(`${target_name}开始向水晶球进行自我介绍`);
        game.kojo.录像内容 |= 2; // TFLAG:32 |= 2
      } else {
        await era.print(`${target_name}把脸转向一边什么都没说`);
      }
    } else {
      // 无摄像（与上一段同型，#622）
      if (
        palam(5) >= PALAMLV[4] &&
        (era0(`talent:${target}:85`) || era0(`abl:${target}:10`) >= 5) &&
        game.event.插着不拔
      ) {
        await era.print(
          `${player_name}刚和她交谈了几句、${target_name}就一边晃着腰一边说出了求爱的话语`,
        );
      } else if (
        palam(5) >= PALAMLV[4] &&
        (era0(`talent:${target}:76`) || era0(`abl:${target}:11`) >= 5) &&
        game.event.插着不拔
      ) {
        await era.print(
          talk_prefix +
            `刚和她交谈了几句、${target_name}就一边晃着腰，一边不停的说着猥琐的语言`,
        );
      } else if (
        (palam(4) >= PALAMLV[4] ||
          era0(`abl:${target}:10`) >= 5 ||
          era0(`talent:${target}:85`)) &&
        palam(5) >= PALAMLV[4]
      ) {
        // 与上一段同型（#622）
        await era.print(
          talk_prefix +
            `刚和她交谈了几句、${target_name}就一边发出着` +
            (equip_pleasure ? `快乐的` : equip_pain ? `痛苦的` : '') +
            `声音、一边拼命忍耐着的回着话`,
        );
      } else if (
        palam(4) >= PALAMLV[4] ||
        era0(`talent:${target}:85`) ||
        era0(`abl:${target}:10`) >= 5
      ) {
        await era.print(
          talk_prefix + `刚和她交谈了几句、${target_name}就毫无隔阂的回起话来`,
        );
      } else if (palam(4) >= PALAMLV[2] || era0(`abl:${target}:10`) >= 3) {
        await era.print(
          talk_prefix + `刚和她交谈了几句、${target_name}一点点的回起话来`,
        );
      } else {
        await era.print(
          talk_prefix + `刚和她说了几句话、${target_name}就好像认真的听了起来…`,
        );
      }
    }
    return 0;
  } else if (era_flag.selectcom == 69) {
    // 六九式 CFLAG:364
    if (kojo.六九式 == 0) {
      // 初めて
      if (era0(`talent:${target}:76`) == 1) {
        // 淫乱
        await era.printAndWait(
          `「啊啊…继续欺负我的小穴吧${heart(1)} 啊啊…啊嗯…嗯啾…啾啾…啾…啾${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}发出着蜜裂被爱抚的娇声，热心的开始了对${player_name}阴茎的口腔奉仕。`,
        );
        await era.printAndWait(
          `「嗯…嗯…我会让你的阴茎更舒服的…也让我…变得更舒服吧${heart(1)}」`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        // 爱慕
        await era.printAndWait(
          `「啊啊…嗯…不要…这么努力的舔我…我快不能认真舔你的阴茎了…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}每次被舔到蜜裂，都会吮吸${player_name}的阴茎。`,
        );
        await era.printAndWait(
          `「啊…嗯…啾…啊…一边被你爱抚一边舔着你，好幸福…${heart(1)}」`,
        );
      } else if (era0(`abl:${target}:16`) >= 3) {
        // 侍奉精神Lv3以上
        await era.printAndWait(
          `「啊嗯…恩…嗯啾…啾…嗯啊…啊啊…不要太过分的欺负我…啊啊♪」`,
        );
        await era.printAndWait(
          `蜜裂被爱抚的${target_name}、不由得把嘴从${player_name}的阴茎上离开发出了声音。`,
        );
        await era.printAndWait(`「你不能不舔吗…嗯…啊啊…嗯…嗯…啾…♪」`);
      } else {
        // それ以外（侍奉精神Lv3未満）
        await era.printAndWait(
          `「啊…嗯…嗯…恶、恶作剧太过分的话…我、我就要下去了！」`,
        );
        await era.printAndWait(
          `${target_name}一边像是要忍耐蜜裂的刺激一样左右摇动着屁股，一边舔着${player_name}的阴茎………`,
        );
      }
      kojo.六九式 = 1; // CFLAG:TARGET:364 = 1
      return 0;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.六九式 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 二回目以降·淫乱
      await era.printAndWait(
        `「啊啊…继续欺负我的小穴吧${heart(1)} 啊啊…啊嗯…嗯啾…啾啾…啾…啾${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}发出着蜜裂被爱抚的娇声，热心的开始了对${player_name}阴茎的口腔奉仕。`,
      );
      await era.printAndWait(
        `「嗯…嗯…我会让你的阴茎更舒服的…也让我…变得更舒服吧${heart(1)}」`,
      );
      await era.printAndWait(
        `「啊啊…啊…嗯…嗯啾…啾…嗯…阴茎…嗯…真棒…${heart(1)}」`,
      );
      kojo.六九式 = 5; // CFLAG:364 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.六九式 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「啊啊…嗯…不要…这么努力的舔我…我快不能认真舔你的阴茎了…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}每次被舔到蜜裂，都会吮吸${player_name}的阴茎。`,
      );
      await era.printAndWait(
        `「啊…嗯…啾…啊…一边被你爱抚一边舔着你，好幸福…${heart(1)}」`,
      );
      await era.printAndWait(`「嗯…嗯啾…啾…啾…啾…啊…嗯…再继续…${heart(1)}」`);
      kojo.六九式 = 4; // CFLAG:364 = 4
    } else if (
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.六九式 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 侍奉精神Lv3以上
      await era.printAndWait(
        `「啊嗯…恩…嗯啾…啾…嗯啊…啊啊…不要太过分的欺负我…啊啊♪」`,
      );
      await era.printAndWait(
        `蜜裂被爱抚的${target_name}、不由得把嘴从${player_name}的阴茎上离开发出了声音。`,
      );
      await era.printAndWait(`「你不能不舔吗…嗯…啊啊…嗯…嗯…啾…♪」`);
      kojo.六九式 = 3; // CFLAG:364 = 3
    } else if (kojo.六九式 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外（侍奉精神Lv3未満）
      await era.printAndWait(
        `「啊…嗯…嗯…啊嗯…嗯啊…嗯…嗯嗯…啾…啾…不、不行啊、这么欺负我的话…啊啊！」`,
      );
      await era.printAndWait(
        `${target_name}一边像是要忍耐蜜裂的刺激一样左右摇动着屁股，一边舔着${player_name}的阴茎。`,
      );
      await era.printAndWait(`「啊嗯…小心我会咬你啊…嗯…啊嗯」`);
      kojo.六九式 = 2; // CFLAG:364 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 80) {
    // 强制口交 CFLAG:381（初めて 3 档，二回目 4 档，档位结构不对称）
    if (kojo.强制口交 == 0) {
      // 初めて
      if (era0(`talent:${target}:76`) == 1) {
        // 淫乱
        await era.printAndWait(
          `「啊啊…把我的嘴…当做小穴吧…嗯…嗯咕…嗯…嗯咕${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}直到喉咙深处都被${player_name}的阴茎侵犯着………`,
        );
      } else if (era0(`abl:${target}:16`) >= 3) {
        // 侍奉精神Lv3以上
        await era.printAndWait(
          `「嗯咕…嗯…啊嗯…嗯咕…！再、再继续…侵犯我的嘴的话…嗯…嗯咕！」`,
        );
        await era.printAndWait(
          `${target_name}的喉咙深处被侵犯着而翻着白眼。只是不用牙碰到${player_name}阴茎就已经竭尽全力了的样子………`,
        );
      } else {
        // それ以外
        await era.printAndWait(
          `「嗯咕…嗯咕…！？…啊、不、不要…嗯咕…嗯…嗯咕！」`,
        );
        await era.printAndWait(
          `${target_name}的喉咙深处被侵犯着而翻着白眼。偶尔牙齿碰到阴茎的疼痛也无视，继续插了进去………`,
        );
      }
      kojo.强制口交 = 1; // CFLAG:TARGET:381 = 1
      return 0;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.强制口交 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 二回目以降·淫乱
      await era.printAndWait(
        `「啊啊…把我的嘴…当做小穴吧…嗯…嗯咕…嗯…嗯咕${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}直到喉咙深处都被${player_name}的阴茎侵犯着。`,
      );
      await era.printAndWait(
        `黏糊糊的舌头缠绕着${player_name}的阴茎，为淫靡的味道而高兴着。`,
      );
      await era.printAndWait(`「嗯咕…嗯…嗯呼…嗯…啊…嗯…嗯咕${heart(1)}」`);
      kojo.强制口交 = 5; // CFLAG:381 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:16`) >= 5 &&
      (kojo.强制口交 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋侍奉精神Lv5
      await era.printAndWait(`「嗯咕…嗯…嗯…嗯咕…嗯…啊嗯…嗯…嗯咕♪」`);
      await era.printAndWait(
        `${target_name}知道喉咙深处都被侵犯着，为了给予${player_name}的阴茎快感而奉仕着。`,
      );
      await era.printAndWait(
        `黏糊糊的舌头缠绕着${player_name}的阴茎，并为了紧闭嘴唇，让牙不碰到阴茎而努力着。`,
      );
      await era.printAndWait(`「嗯啾…啾…嗯咕…嗯…嗯咕…嗯…嗯${heart(1)}」`);
      kojo.强制口交 = 4; // CFLAG:381 = 4
    } else if (
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.强制口交 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 侍奉精神Lv3以上
      await era.printAndWait(`「嗯咕…嗯…啊嗯…嗯咕…！再、再…这样…嗯…呜…嗯！」`);
      await era.printAndWait(
        `${target_name}的喉咙深处被侵犯着而翻着白眼。只是不用牙碰到${player_name}阴茎就已经竭尽全力了的样子。`,
      );
      await era.printAndWait(`「咕…咕…继续的话…啊啊…嗯…嗯…啊嗯…恩！」`);
      kojo.强制口交 = 3; // CFLAG:381 = 3
    } else if (kojo.强制口交 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外
      await era.printAndWait(`「嗯咕…嗯咕…！？…啊、不、不要…嗯咕…嗯…嗯咕！」`);
      await era.printAndWait(
        `${target_name}的喉咙深处被侵犯着而翻着白眼。偶尔牙齿碰到阴茎的疼痛也无视，继续插了进去。`,
      );
      await era.printAndWait(`「嗯咕…咳咳…以、已经不行了…嗯…嗯咕…嗯…嗯嗯！」`);
      kojo.强制口交 = 2; // CFLAG:381 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 123) {
    // 乳夹口交 CFLAG:360
    const big_breast = () =>
      era0(`talent:${target}:110`) == 1 ||
      era0(`talent:${target}:114`) == 1 ||
      era0(`talent:${target}:119`) == 1; // TALENT:110/114/119（巨乳系）
    if (kojo.乳夹口交 == 0) {
      // 初めて
      if (era0(`talent:${target}:78`) == 1) {
        // 弄乳狂
        await era.printAndWait(
          `「啊嗯…我明明这么舒服…啊啊…胸部太舒服了…嗯…啊嗯…嗯啾…啾♪」`,
        );
        await era.printAndWait(
          `${target_name}带着出神的表情一边舔着${player_name}的阴茎，一边加在乳房中间。`,
        );
        await era.printAndWait(
          `仔细看的话，${target_name}抓着乳房的手指，正在不停的在乳头上旋转。`,
        );
        await era.printAndWait(
          `「嗯…嗯咕…嗯…我…我…我的脑袋变奇怪了…嗯…咕啾…啾……♪」`,
        );
        if (big_breast()) {
          await era.printAndWait(
            `「被你变大的胸部…变的更舒服了…嗯…咕啾嗯啾啾♪」`,
          );
        }
      } else {
        // それ以外
        await era.printAndWait(
          `「一边乳交一边口角什么的…还真是变态的嗜好呢、你啊………」`,
        );
        await era.printAndWait(
          `${target_name}叹了一口气、${target_name}坦率的开始了乳夹口交。`,
        );
        await era.printAndWait(`「啊嗯…嗯…嗯…咕…嗯…啾啾」`);
      }
      kojo.乳夹口交 = 1; // CFLAG:TARGET:360 = 1
      return 0;
    } else if (
      era0(`talent:${target}:78`) == 1 &&
      era0(`talent:${target}:76`) == 1 &&
      (kojo.乳夹口交 <= 7 || game.kojo.口上开关 == 2)
    ) {
      // 二回目以降·弄乳狂+淫乱
      if (big_breast()) {
        await era.printAndWait(
          `「这个大胸部…是为了夹住你，让我变得更舒服才变成这样的…${heart(1)}」`,
        );
      }
      await era.printAndWait(
        `「啊啊…我的阴茎…让我变得舒服的阴茎…啾…啾…嗯…啾…啾…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}的乳房夹住${player_name}的阴茎、一边忍不住的吮吸着阴茎。`,
      );
      await era.printAndWait(
        `「嗯啾…啾…啾…啊啊…我的嘴和胸部同时被侵犯…我快高潮了…嗯…啾…嗯${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}一边漏出灼热的吐息、一边不停的亲吻着从胸部中露出来的${player_name}的阴茎。`,
      );
      await era.printAndWait(
        `「啾啾…啾${heart(1)} 我最喜欢的阴茎…啊啊…更加更加更加的让我舒服起来吧${heart(1)} 啾${heart(1)}」`,
      );
      kojo.乳夹口交 = 8; // CFLAG:360 = 8
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.乳夹口交 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      if (big_breast()) {
        await era.printAndWait(
          `「这个大胸部…是为了夹住你，让我变得更舒服才变成这样的…${heart(1)}」`,
        );
      }
      await era.printAndWait(
        `「啊啊…还要舔阴茎呢…嗯…啾…你的阴茎…嗯…啊嗯…嗯嗯${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}一边用乳房夹着，一边喘着粗气舔着${player_name}的阴茎。`,
      );
      await era.printAndWait(
        `「来${heart(1)} …我的嘴和胸部…一起侵犯…让我变得奇怪…嗯…啊嗯…啾啾${heart(1)}」`,
      );
      await era.printAndWait(
        `听到这些话的${player_name}更激烈激烈的动起了腰，开始侵犯${target_name}的嘴和胸………`,
      );
      kojo.乳夹口交 = 7; // CFLAG:360 = 7
    } else if (
      era0(`talent:${target}:78`) == 1 &&
      era0(`talent:${target}:85`) == 1 &&
      (kojo.乳夹口交 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 弄乳狂+爱
      if (big_breast()) {
        await era.printAndWait(
          `「这个大胸部…是为了夹住你的时候更舒服才变成这样的…${heart(1)}」`,
        );
      }
      await era.printAndWait(
        `${target_name}的乳房夹着${player_name}的阴茎、仔细看的话，${target_name}抓着乳房的手指，正在不停的在乳头上旋转。`,
      );
      await era.printAndWait(
        `就这样带着因为舒服而扭曲的脸开始舔起了${player_name}的阴茎。`,
      );
      await era.printAndWait(
        `「嗯啾…啾…啾…啊啊…太舒服了…我…要变奇怪了…啾啾…啾${heart(1)}」`,
      );
      kojo.乳夹口交 = 6; // CFLAG:360 = 6
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.乳夹口交 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      if (big_breast()) {
        await era.printAndWait(
          `「这个大胸部…是为了夹住你的时候更舒服才变成这样的…${heart(1)}」`,
        );
      }
      await era.printAndWait(`「啊啊…还不够过瘾吗？没办法…啊…啾…啾…嗯啾…♪」`);
      await era.printAndWait(
        `${target_name}一边用乳房夹着${player_name}的阴茎，一边咕噜咕噜的转动着舔着龟头。`,
      );
      await era.printAndWait(
        `「嗯嗯…啊啊…你的精液…满满的射出来…啊啊…想要…啊啊…啾…啾咕啾${heart(1)}」`,
      );
      kojo.乳夹口交 = 5; // CFLAG:360 = 5
    } else if (
      era0(`talent:${target}:78`) == 1 &&
      (kojo.乳夹口交 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 弄乳狂
      await era.printAndWait(
        `「啊嗯…我明明这么舒服…啊啊…胸部太舒服了…嗯…啊嗯…嗯啾…啾♪」`,
      );
      await era.printAndWait(
        `${target_name}带着出神的表情一边舔着${player_name}的阴茎，一边加在乳房中间。`,
      );
      await era.printAndWait(
        `仔细看的话，${target_name}抓着乳房的手指，正在不停的在乳头上旋转。`,
      );
      await era.printAndWait(
        `「嗯…嗯咕…嗯…我…我…我的脑袋变奇怪了…嗯…咕啾…啾……♪」`,
      );
      if (big_breast()) {
        await era.printAndWait(
          `「被你变大的胸部…变的更舒服了…嗯…咕啾嗯啾啾♪」`,
        );
      }
      kojo.乳夹口交 = 4; // CFLAG:360 = 4
    } else if (
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.乳夹口交 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 侍奉精神Lv3以上
      await era.printAndWait(`「嗯啊…啾…嗯…啾…啾…啾嗯…嗯啊…还要继续刺激吗？」`);
      await era.printAndWait(
        `${target_name}抿嘴一笑，一边叼着龟头一边抓着胸部继续开始奉仕………`,
      );
      kojo.乳夹口交 = 3; // CFLAG:360 = 3
    } else if (kojo.乳夹口交 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外（侍奉精神Lv3未満）
      await era.printAndWait(`「嗯…啾…啊…嗯…嗯啾…啾…怎么样？满足了么…？」`);
      await era.printAndWait(
        `${target_name}一边用乳房夹着${player_name}的阴茎一边咕噜咕噜的舔着尖端………`,
      );
      kojo.乳夹口交 = 2; // CFLAG:360 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 125) {
    // 口交时自慰 CFLAG:361
    if (kojo.口交时自慰 == 0) {
      // 初めて
      if (era0(`talent:${target}:76`) == 1) {
        // 淫乱
        await era.printAndWait(
          `${target_name}看着眼前伸出来的阴茎、露出了稍微有些为难的表情。`,
        );
        await era.printAndWait(
          `「啊啊…虽然口交也不错、但还是想集中在自慰上…你还真是坏心眼呢${heart(1)} 啊啊…啊嗯…嗯嗯${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}高兴地一边含着${player_name}阴茎，一边开始了自慰………`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        // 爱慕
        await era.printAndWait(
          `${target_name}看着眼前伸出来的${player_name}的阴茎、高兴地含在了嘴里。`,
        );
        await era.printAndWait(
          `「啊嗯…嗯…嗯咕…嗯…好吃…还要继续奉仕呢…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边继续自慰着、一边${player_name}奉仕着的阴茎………`,
        );
      } else if (era0(`abl:${target}:16`) >= 3) {
        // 侍奉精神Lv3以上
        await era.printAndWait(
          `${target_name}看着眼前伸出来的${player_name}的阴茎、张开嘴开始填起来尖端。`,
        );
        await era.printAndWait(`「嗯嗯…啾…啾…嗯…好吃…嗯啾…啾………」`);
        await era.printAndWait(
          `${target_name}一边继续自慰着、一边${player_name}奉仕着的阴茎………`,
        );
      } else {
        // それ以外（侍奉精神Lv3未満）
        await era.printAndWait(
          `${target_name}看着眼前伸出来的${player_name}的阴茎、好像察觉到了什么，稍微张着嘴犹豫着。`,
        );
        await era.printAndWait(`「啊啊…我舔就行了吧…嗯…嗯啾…啾啾…嗯………」`);
        await era.printAndWait(
          `${target_name}一边继续自慰着、一边不熟练的舔起了${player_name}的阴茎………`,
        );
      }
      kojo.口交时自慰 = 1; // CFLAG:TARGET:361 = 1
      return 0;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.口交时自慰 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 二回目以降·淫乱
      await era.printAndWait(
        `「啊啊…能用你的阴茎当做自慰的配菜这种事，最棒了…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}用鼻子闻着${player_name}的阴茎的气味、慢慢的舔了起来。`,
      );
      await era.printAndWait(`「嗯啾…啾…啾…嗯咕…啾咕…啾啾…嗯啾${heart(1)}」`);
      await era.printAndWait(
        `${player_name}在激烈的口腔奉仕下腰快消失了一样。然后${target_name}的右手为了抚慰自己的蜜裂，激烈地动着………`,
      );
      kojo.口交时自慰 = 5; // CFLAG:361 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.口交时自慰 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait(`「嗯啾…啾…嗯…嗯…嗯、嗯——${heart(1)}」`);
      await era.printAndWait(
        `${target_name}一边带着出神的表情用吮吸着${player_name}的阴茎、一边继续自慰着。`,
      );
      await era.printAndWait(
        `「嗯啊${heart(1)} 嗯啊…嗯…不光我变得舒服、还能奉仕你的阴茎呢…嗯…啾…就…嗯${heart(1)}」`,
      );
      kojo.口交时自慰 = 4; // CFLAG:361 = 4
    } else if (
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.口交时自慰 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 侍奉精神Lv3以上
      await era.printAndWait(`「嗯啊…一边舔着你的…一边自慰什么的…啊啊！」`);
      await era.printAndWait(
        `${target_name}一边发出咕啾咕啾的声音自慰着、一边口腔奉仕着${player_name}的阴茎。`,
      );
      await era.printAndWait(`「啾…嗯…嗯…嗯啾…啾…嗯…啾…啾…♪」`);
      kojo.口交时自慰 = 3; // CFLAG:361 = 3
    } else if (kojo.口交时自慰 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外（侍奉精神Lv3未満）
      await era.printAndWait(`「嗯咕…嗯…嗯………」`);
      await era.printAndWait(
        `${target_name}发出着鼻音、一边自慰一边吮吸着${player_name}的阴茎………`,
      );
      kojo.口交时自慰 = 2; // CFLAG:361 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 126) {
    // 手搓口交 CFLAG:362
    if (kojo.手搓口交 == 0) {
      // 初めて
      if (era0(`talent:${target}:76`) == 1) {
        // 淫乱
        await era.printAndWait(
          `「啊啊嗯…${heart(1)} 嗯…啾…啾…嗯啊…你的阴茎…真好吃…嗯${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边激烈地撸着、一边像舔冰激凌那样温柔地舔着${player_name}的阴茎………`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        // 爱慕
        await era.printAndWait(
          `「嗯啊…啊啊…嗯…嗯…一边撸一边舔你那坚硬的…嗯啾…啾…啾…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边温柔的撸着、一边激烈的吮吸着${player_name}的阴茎………`,
        );
      } else if (era0(`abl:${target}:16`) >= 3) {
        // 侍奉精神Lv3以上
        await era.printAndWait(
          `「啾…嗯…啾…啾…舒服吗？那我就继续…嗯啾…嗯啾…啾」`,
        );
        await era.printAndWait(
          `${target_name}一边脸颊泛红的用手撸着、一边继续口腔奉仕………`,
        );
      } else {
        // それ以外（侍奉精神Lv3未満）
        await era.printAndWait(
          `「啊啊…嗯啾…啾…啾…嗯啊…一边撸…一边舔什么的…嗯………」`,
        );
        await era.printAndWait(
          `${target_name}不甘心的一边用手撸着，一边继续着口腔奉仕………`,
        );
      }
      kojo.手搓口交 = 1; // CFLAG:TARGET:362 = 1
      return 0;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.手搓口交 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 二回目以降·淫乱
      await era.printAndWait(
        `「怎么样？一边激烈的帮你撸…啾…再稍微…嗯啾…这么帮你按摩一下的话…啾啾${heart(1)}」`,
      );
      await era.printAndWait(
        `「啊嗯…恩…嗯啾…啾…啾…啾…啊嗯…阴茎看起来好像很舒服呢${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}一边激烈地撸着、一边像舔冰激凌那样温柔地舔着${player_name}的阴茎………`,
      );
      kojo.手搓口交 = 5; // CFLAG:362 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.手搓口交 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「嗯啊…啊啊…嗯…嗯…一边撸一边舔你那坚硬的…嗯啾…啾…啾…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}一边温柔的撸着、一边激烈的吮吸着${player_name}的阴茎………`,
      );
      kojo.手搓口交 = 4; // CFLAG:362 = 4
    } else if (
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.手搓口交 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 侍奉精神Lv3以上
      await era.printAndWait(`「啾…嗯…你被这么做就会很舒服呢…嗯…啾…啾…嗯！」`);
      await era.printAndWait(
        `${target_name}一边脸颊泛红的用手撸着、一边继续口腔奉仕………`,
      );
      kojo.手搓口交 = 3; // CFLAG:362 = 3
    } else if (kojo.手搓口交 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外（侍奉精神Lv3未満）
      await era.printAndWait(
        `「嗯…嗯…啾…嗯啊…啾…嗯…为什么我要做这种事………嗯…」`,
      );
      await era.printAndWait(
        `${target_name}不甘心的一边用手撸着，一边继续着口腔奉仕………`,
      );
      kojo.手搓口交 = 2; // CFLAG:362 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 127) {
    // 真空口交 CFLAG:363
    if (kojo.真空口交 == 0) {
      // 初めて
      if (era0(`talent:${target}:76`) == 1) {
        // 淫乱
        await era.printAndWait(
          `「你的阴茎…太好吃了…我…已经！…嗯啾啾啾…啾…嗯啾${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}因为口腔奉仕而兴奋地发出响声，开始吮吸着${player_name}的阴茎………`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        // 爱慕
        await era.printAndWait(
          `「你的阴茎…明明那么臭…对我来说确实最棒的香味呢…啊啊…嗯啾啾啾${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}因为口腔奉仕而兴奋地发出响声，开始吮吸着${player_name}的阴茎………`,
        );
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「嗯…嗯啾…啾…啾…♪啾…啾…♪」`);
        await era.printAndWait(
          `${target_name}兴奋的发出着响声，吮吸着${player_name}的阴茎………`,
        );
      } else {
        // それ以外（侍奉精神Lv3未満）
        await era.printAndWait(`「嗯…嗯啾…嗯…嗯…嗯咕…咕…嗯…啾」`);
        await era.printAndWait(
          `${target_name}一边眼里含着眼泪，一边发出着声音的吮吸着${player_name}的阴茎………`,
        );
      }
      kojo.真空口交 = 1; // CFLAG:TARGET:363 = 1
      return 0;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.真空口交 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 二回目以降·淫乱
      await era.printAndWait(
        `「你的阴茎…太好吃了…我…已经！…嗯啾啾啾…啾…嗯啾${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}因为口腔奉仕而兴奋地发出响声，开始吮吸着${player_name}的阴茎。`,
      );
      await era.printAndWait(
        `「嗯…啾…前列腺液出来了这么多…${heart(1)} 啊啊…真好吃${heart(1)} 嗯啾啾啾啾${heart(1)}」`,
      );
      kojo.真空口交 = 5; // CFLAG:363 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.真空口交 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「你的阴茎…明明那么臭…对我来说确实最棒的香味呢…啊啊…嗯啾啾啾${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}因为口腔奉仕而兴奋地发出响声，开始吮吸着${player_name}的阴茎。`,
      );
      await era.printAndWait(
        `「在我嘴里…满满的射出来吧…啊啊…${heart(1)} 啾…啾啾…嗯嗯${heart(1)}」`,
      );
      kojo.真空口交 = 4; // CFLAG:363 = 4
    } else if (
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.真空口交 <= 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「嗯…嗯啾…啾…啾…♪啾…啾…♪」`);
      await era.printAndWait(
        `${target_name}兴奋的发出着响声，吮吸着${player_name}的阴茎。`,
      );
      await era.printAndWait(
        `「啊啊…这么吮吸你的的话，我的脑袋…要变奇怪了…啾…啾…啾♪」`,
      );
      kojo.真空口交 = 3; // CFLAG:363 = 3
    } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外（侍奉精神Lv3未満）
      await era.printAndWait(`「嗯…嗯啾…嗯…嗯…嗯咕…咕…嗯…啾」`);
      await era.printAndWait(
        `${target_name}一边眼里含着眼泪，一边发出着声音的吮吸着${player_name}的阴茎………`,
      );
      kojo.真空口交 = 2; // CFLAG:363 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 124) {
    // 深喉 CFLAG:365（二回目以降四档）
    if (kojo.深喉 == 0) {
      // 初めて
      if (era0(`talent:${target}:76`) == 1) {
        // 淫乱
        await era.printAndWait(
          `「啊啊…我已经迷上了你的阴茎了…嗯啾…啾…嗯…嗯${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}用鼻子喘着气，把${player_name}的阴茎一直吞到了喉咙深处………`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        // 爱慕
        await era.printAndWait(
          `「啊啊…你的阴茎全都是我的东西…嗯咕…啾…嗯…嗯咕${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}用鼻子喘着气，把${player_name}的阴茎一直吞到了喉咙深处………`,
        );
      } else if (era0(`abl:${target}:16`) >= 3) {
        // 侍奉精神Lv3以上
        await era.printAndWait(`「嗯…嗯…嗯咕…嗯…嗯咕…嗯～♪」`);
        await era.printAndWait(
          `${target_name}用鼻子喘着气。开始用喉咙深处奉仕${player_name}的阴茎………`,
        );
      } else {
        // それ以外（侍奉精神Lv3未満）
        await era.printAndWait(`「嗯…咕…嗯咕…嗯！」`);
        await era.printAndWait(
          `${target_name}即使像快要吐了一样，也还是用喉咙深处奉仕着${player_name}的阴茎………`,
        );
      }
      kojo.深喉 = 1; // CFLAG:TARGET:365 = 1
      return 0;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.深喉 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 二回目以降·淫乱
      await era.printAndWait(
        `「啊啊…我已经迷上了你的阴茎了…嗯啾…啾…嗯…嗯${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}用鼻子喘着气，把${player_name}的阴茎一直吞到了喉咙深处。`,
      );
      await era.printAndWait(
        `「啾…嗯…嗯咕…嗯…咕…啊啊…嗯…被侵犯嘴里的感觉，受不了…嗯…嗯啾${heart(1)}」`,
      );
      kojo.深喉 = 5; // CFLAG:365 = 5
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.深喉 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「啊啊…你的阴茎全都是我的东西…嗯咕…啾…嗯…嗯咕${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}用鼻子喘着气，把${player_name}的阴茎一直吞到了喉咙深处。`,
      );
      await era.printAndWait(
        `「嗯啾…啾…啾…啾…嗯啊…啊啊…能就这样全都吞下去该多好…嗯…嗯啊${heart(1)}」`,
      );
      kojo.深喉 = 4; // CFLAG:365 = 4
    } else if (
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.深喉 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 侍奉精神Lv3以上
      await era.printAndWait(`「嗯…嗯…嗯咕…嗯…嗯咕…嗯～♪」`);
      await era.printAndWait(
        `${target_name}用鼻子喘着气。开始用喉咙深处奉仕${player_name}的阴茎。`,
      );
      await era.printAndWait(
        `「嗯啾…啾…嗯～♪…嗯…你的那个太精神了让我有点困扰…嗯…嗯啾…啾♪」`,
      );
      kojo.深喉 = 3; // CFLAG:365 = 3
    } else if (kojo.深喉 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外（侍奉精神Lv3未満）
      await era.printAndWait(`「嗯…咕…嗯咕…嗯！」`);
      await era.printAndWait(
        `${target_name}即使像快要吐了一样，也还是用喉咙深处奉仕着${player_name}的阴茎。`,
      );
      await era.printAndWait(
        `「呜…嗯啾…啾…啾…嗯啊…不能再深了吧？啊啊…嗯…嗯咕…！」`,
      );
      kojo.深喉 = 2; // CFLAG:365 = 2
    }
    return 0;
  } else if (era_flag.selectcom == 87) {
    // 穿环 CFLAG:348
    const P = piercing_state.p; // COM87 跨模块存活态（piercing-state.js 写入，此处只读）
    if (kojo.穿环 == 0) {
      // 初めて
      if (era_flag.assi > 0 && era_flag.assiplay) {
        // 助手（此档不打印，PRINTFORM 无参数）
        await era.print('');
      } else if (era0(`talent:${target}:76`) == 1) {
        // 淫乱
        if (chara(target).train.穿环状态 & P) {
          await era.printAndWait(
            `${target_name}想着第一次在身上打孔的疼痛痛而皱着眉。`,
          );
          if (P == 1) {
            await era.printAndWait(
              `「啊嗯…乳头上装上环的话…会太有感觉的…啊啊♪」`,
            );
            await era.printAndWait(
              `${target_name}完全勃起的乳头上的环闪着光………`,
            );
          } else if (P == 2) {
            await era.printAndWait(`「啊嗯…怎么样？适合我么？」`);
            await era.printAndWait(`${target_name}的肚脐上，宝石的环闪着光………`);
          } else if (P == 4) {
            await era.printAndWait(
              `「这么的话…我是色情狂这件事一眼就会被看出来了…${heart(1)}」`,
            );
            await era.printAndWait(`${target_name}一次次的拉着阴唇上的环………`);
          } else if (P == 8) {
            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              await era.printAndWait(
                `「呵呵呵…得到了很棒的东西呢………${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}的勃起的阴茎上的环闪着光………`,
              );
            } else {
              await era.printAndWait(`「我的阴蒂…已经完全变成H专用的了呢…」」`);
              await era.printAndWait(
                `${target_name}的勃起的阴蒂上的环闪着光………`,
              );
            }
          } else if (P == 16) {
            await era.printAndWait(`「呵呵呵、想用这样的舌头口交吗？」`);
            await era.printAndWait(
              `${target_name}挑衅似的伸出舌头，展示着环………`,
            );
          } else if (P == 32) {
            await era.printAndWait(`「啊啊…想用这样的嘴唇接吻呢………」`);
            await era.printAndWait(`${target_name}为了展示环而撅起了嘴………`);
          } else if (P == 64) {
            await era.printAndWait(`「这个还是有点害羞呢…嗯？很酷？是这样吗」`);
            await era.printAndWait(`${target_name}鼻子上的环闪着光………`);
          }
        } else {
          await era.printAndWait(
            `${target_name}寂寞的抚摸着取下环而留着的伤痕………`,
          );
        }
      } else if (era0(`talent:${target}:85`) == 1) {
        // 爱慕
        if (chara(target).train.穿环状态 & P) {
          await era.printAndWait(
            `${target_name}想着第一次在身上打孔的疼痛痛而皱着眉。`,
          );
          if (P == 1) {
            await era.printAndWait(
              `「啊啊…连这种事都做了的话…乳头就不能给你以外的人看了呢………♪」`,
            );
            await era.printAndWait(`${target_name}乳头上的环闪着光………`);
          } else if (P == 2) {
            await era.printAndWait(`「怎么样？帅吗？」`);
            await era.printAndWait(`${target_name}的肚脐上，宝石的环闪着光………`);
          } else if (P == 4) {
            await era.printAndWait(
              `「啊啊…因为是你希望，所以我才会戴这种东西………」`,
            );
            await era.printAndWait(`${target_name}抚摸着阴唇上的环………`);
          } else if (P == 8) {
            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              await era.printAndWait(`「哇、好害羞啊………」`);
              await era.printAndWait(`${target_name}阴茎上的环发着光………`);
            } else {
              await era.printAndWait(`「啊啊…明明是很敏感的地方…这样…啊啊…」`);
              await era.printAndWait(`${target_name}阴蒂上的环发着光………`);
            }
          } else if (P == 16) {
            // 两条无后缀 PRINTFORM 同属一行（#600）
            await era.print(
              `「啊啊…如果和你舌吻的话…会变得很舒服吧…？」${target_name}为了展示环而伸出了舌头………`,
            );
          } else if (P == 32) {
            // 同上（#600）
            await era.print(
              `「啊啊、总觉环好奇怪…必须要和你接吻来确认状况呢」${target_name}一边害羞的笑着，一边闭上眼撅起了嘴………`,
            );
          } else if (P == 64) {
            await era.printAndWait(
              `「这样总觉得有点害羞呢…嗯？可爱？是这样吗」`,
            );
            await era.printAndWait(`${target_name}鼻子上的环发着光………`);
          }
        } else {
          await era.printAndWait(
            `${target_name}寂寞的抚摸着取下环而留着的伤痕………`,
          );
        }
      } else {
        // それ以外
        if (chara(target).train.穿环状态 & P) {
          await era.printAndWait(
            `${target_name}想着第一次在身上打孔的疼痛痛而悲鸣着。`,
          );
          if (P == 1) {
            await era.printAndWait(
              `「啊啊…“我就这样变成性奴隶了”…别想的这么简单啊………」`,
            );
            await era.printAndWait(`${target_name}乳头上的环闪着光………`);
          } else if (P == 2) {
            await era.printAndWait(`「嗯、没有更好的环了吗？」`);
            await era.printAndWait(
              `${target_name}的肚脐上，朴素的环闪着银色的光………`,
            );
          } else if (P == 4) {
            await era.printAndWait(`「咕…咕啊…没想到这种地方…啊啊…别啦啊！」`);
            await era.printAndWait(
              `${target_name}因为阴唇上按的环被拉而发出了悲鸣………`,
            );
          } else if (P == 8) {
            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              await era.printAndWait(`「啊咕…咕…这样的东西…不会吧………」`);
              await era.printAndWait(
                `${target_name}一想到长出的阴茎上被强行装上环的屈辱，就不禁流下了泪………`,
              );
            } else {
              await era.printAndWait(
                `「啊啊…嗯…啊啊…对我的敏感的地方…啊啊…做这种…事！」`,
              );
              await era.printAndWait(`${target_name}敏感的阴蒂上被装上了环………`);
            }
          } else if (P == 16) {
            await era.printAndWait(
              `「屈、屈辱啊…这种事…咕…斜、斜呀啊（别啦啊）」`,
            );
            await era.printAndWait(
              `${player_name}为了确认环有没有固定好而拉着${target_name}的舌头………`,
            );
          } else if (P == 32) {
            await era.printAndWait(
              `「对少女的嘴唇做这种事什么的…你别想有普通的死法…嗯！」`,
            );
            await era.printAndWait(
              `${player_name}用鼻子嘲笑着“谁是少女啊？”、拉起了${target_name}的嘴唇来确认环是不是固定好了………`,
            );
          } else if (P == 64) {
            await era.printAndWait(`「这种像家畜一样…咕…感觉好屈辱…！」`);
            await era.printAndWait(`${target_name}的鼻子像牛一样被戴上了环………`);
          }
        } else {
          await era.printAndWait(
            `${target_name}不甘心的抚摸着取下环而留着的伤痕………`,
          );
        }
      }
      kojo.穿环 = 1; // CFLAG:TARGET:348 = 1
      return 0;
    } else if (era_flag.assi > 0 && era_flag.assiplay) {
      // 二回目以降·助手（此档不打印，PRINTFORM 无参数；不更新 CFLAG:348）
      await era.print('');
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.穿环 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      if (chara(target).train.穿环状态 & P) {
        await era.printAndWait(
          `${target_name}想着第一次在身上打孔的疼痛痛而皱着眉。`,
        );
        if (P == 1) {
          await era.printAndWait(
            `「啊嗯…乳头上装上环的话…会太有感觉的…啊啊♪」`,
          );
          await era.printAndWait(`${target_name}完全勃起的乳头上的环闪着光………`);
        } else if (P == 2) {
          await era.printAndWait(`「啊嗯…怎么样？适合我么？」`);
          await era.printAndWait(`${target_name}的肚脐上，宝石的环闪着光………`);
        } else if (P == 4) {
          await era.printAndWait(
            `「这么的话…我是色情狂这件事一眼就会被看出来了…${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}一次次的拉着阴唇上的环………`);
        } else if (P == 8) {
          if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
            await era.printAndWait(
              `「呵呵呵…得到了很棒的东西呢………${heart(1)}」`,
            );
            await era.printAndWait(`${target_name}的勃起的阴茎上的环闪着光………`);
          } else {
            await era.printAndWait(`「我的阴蒂…已经完全变成H专用的了呢…」」`);
            await era.printAndWait(`${target_name}的勃起的阴蒂上的环闪着光………`);
          }
        } else if (P == 16) {
          await era.printAndWait(`「呵呵呵、想用这样的舌头口交吗？」`);
          await era.printAndWait(`${target_name}挑衅似的伸出舌头，展示着环………`);
        } else if (P == 32) {
          await era.printAndWait(`「啊啊…想用这样的嘴唇接吻呢………」`);
          await era.printAndWait(`${target_name}为了展示环而撅起了嘴………`);
        } else if (P == 64) {
          await era.printAndWait(`「这个还是有点害羞呢…嗯？很酷？是这样吗」`);
          await era.printAndWait(`${target_name}鼻子上的环闪着光………`);
        }
      } else {
        await era.printAndWait(
          `${target_name}寂寞的抚摸着取下环而留着的伤痕………`,
        );
      }
      kojo.穿环 = 4; // CFLAG:348 = 4
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.穿环 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      if (chara(target).train.穿环状态 & P) {
        await era.printAndWait(
          `${target_name}想着第一次在身上打孔的疼痛痛而皱着眉。`,
        );
        if (P == 1) {
          await era.printAndWait(
            `「啊啊…连这种事都做了的话…乳头就不能给你以外的人看了呢………♪」`,
          );
          await era.printAndWait(`${target_name}乳头上的环闪着光………`);
        } else if (P == 2) {
          await era.printAndWait(`「怎么样？帅吗？」`);
          await era.printAndWait(`${target_name}的肚脐上，宝石的环闪着光………`);
        } else if (P == 4) {
          await era.printAndWait(
            `「啊啊…因为是你希望，所以我才会戴这种东西………」`,
          );
          await era.printAndWait(`${target_name}抚摸着阴唇上的环………`);
        } else if (P == 8) {
          if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
            await era.printAndWait(`「哇、好害羞啊………」`);
            await era.printAndWait(`${target_name}阴茎上的环发着光………`);
          } else {
            await era.printAndWait(`「啊啊…明明是很敏感的地方…这样…啊啊…」`);
            await era.printAndWait(`${target_name}阴蒂上的环发着光………`);
          }
        } else if (P == 16) {
          // 两条无后缀 PRINTFORM 同属一行（#600）
          await era.print(
            `「啊啊…如果和你舌吻的话…会变得很舒服吧…？」${target_name}为了展示环而伸出了舌头………`,
          );
        } else if (P == 32) {
          // 同上（#600）
          await era.print(
            `「啊啊、总觉环好奇怪…必须要和你接吻来确认状况呢」${target_name}一边害羞的笑着，一边闭上眼撅起了嘴………`,
          );
        } else if (P == 64) {
          await era.printAndWait(`「这样总觉得有点害羞呢…嗯？可爱？是这样吗」`);
          await era.printAndWait(`${target_name}鼻子上的环发着光………`);
        }
      } else {
        await era.printAndWait(
          `${target_name}寂寞的抚摸着取下环而留着的伤痕………`,
        );
      }
      kojo.穿环 = 3; // CFLAG:348 = 3
    } else if (kojo.穿环 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外
      if (chara(target).train.穿环状态 & P) {
        await era.printAndWait(
          `${target_name}想着第一次在身上打孔的疼痛痛而悲鸣着。`,
        );
        if (P == 1) {
          await era.printAndWait(
            `「啊啊…“我就这样变成性奴隶了”…别想的这么简单啊………」`,
          );
          await era.printAndWait(`${target_name}乳头上的环闪着光………`);
        } else if (P == 2) {
          await era.printAndWait(`「嗯、没有更好的环了吗？」`);
          await era.printAndWait(
            `${target_name}的肚脐上，朴素的环闪着银色的光………`,
          );
        } else if (P == 4) {
          await era.printAndWait(`「咕…咕啊…没想到这种地方…啊啊…别啦啊！」`);
          await era.printAndWait(
            `${target_name}因为阴唇上按的环被拉而发出了悲鸣………`,
          );
        } else if (P == 8) {
          if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
            await era.printAndWait(`「啊咕…咕…这样的东西…不会吧………」`);
            await era.printAndWait(
              `${target_name}一想到长出的阴茎上被强行装上环的屈辱，就不禁流下了泪………`,
            );
          } else {
            await era.printAndWait(
              `「啊啊…嗯…啊啊…对我的敏感的地方…啊啊…做这种…事！」`,
            );
            await era.printAndWait(`${target_name}敏感的阴蒂上被装上了环………`);
          }
        } else if (P == 16) {
          await era.printAndWait(
            `「屈、屈辱啊…这种事…咕…斜、斜呀啊（别啦啊）」`,
          );
          await era.printAndWait(
            `${player_name}为了确认环有没有固定好而拉着${target_name}的舌头………`,
          );
        } else if (P == 32) {
          await era.printAndWait(
            `「对少女的嘴唇做这种事什么的…你别想有普通的死法…嗯！」`,
          );
          await era.printAndWait(
            `${player_name}用鼻子嘲笑着“谁是少女啊？”、拉起了${target_name}的嘴唇来确认环是不是固定好了………`,
          );
        } else if (P == 64) {
          await era.printAndWait(`「这种像家畜一样…咕…感觉好屈辱…！」`);
          await era.printAndWait(`${target_name}的鼻子像牛一样被戴上了环………`);
        }
      } else {
        await era.printAndWait(
          `${target_name}不甘心的抚摸着取下环而留着的伤痕………`,
        );
      }
      kojo.穿环 = 2; // CFLAG:348 = 2
    }
    return 0;
  }
  return 0;
}

// 注册进分发族（TRYCALLFORM KOJO_MESSAGE_COM_8 的等价物；重复注册抛错）
kojo_message_com_family.register(8, kojo_message_com_8);

/**
 * dog_kojo_8：兽奸 PLAY 的专用口上（头部检查 TEQUIP:89 岔入）。
 * 与主 COM_8 同构：SELECTCOM 0/1/5/6/9/21/27/30/31/34/37/43/56 各支 +
 * 牝犬（TALENT:136）分档。**全部 PRINTFORMW/PRINTFORML 均为空参数**
 * （兽奸对白整段未填写，仅保留状态机骨架，逐行核对确认，
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
    // 兽奸爱撫 CFLAG:301
    if (kojo.爱抚 == 0) {
      // 初めて（台词未填写，输出空行）
      if (era0(`mark:${target}:2`) >= 2) {
        await era.printAndWait(''); // 屈服刻印Lv2以上
      } else {
        await era.printAndWait(''); // それ以外
      }
      kojo.爱抚 = 1;
      return 0;
    } else if (
      era0(`talent:${target}:136`) == 1 &&
      (kojo.爱抚 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // 牝犬
      await era.printAndWait('');
      kojo.爱抚 = 7;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait('');
      kojo.爱抚 = 6;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.爱抚 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait('');
      kojo.爱抚 = 5;
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      (kojo.爱抚 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 屈服刻印Lv3
      await era.printAndWait('');
      kojo.爱抚 = 4;
    } else if (
      era0(`mark:${target}:2`) == 2 &&
      (kojo.爱抚 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 屈服刻印Lv2
      await era.printAndWait('');
      kojo.爱抚 = 3;
    } else if (
      era0(`mark:${target}:2`) <= 1 &&
      (kojo.爱抚 <= 1 || game.kojo.口上开关 == 2)
    ) {
      // それ以外
      await era.printAndWait('');
      kojo.爱抚 = 2;
    }
    return 0;
  }

  if (era_flag.selectcom == 1) {
    // 兽奸舔阴 CFLAG:302
    if (kojo.舔阴 == 0) {
      // 初めて
      if (era0(`talent:${target}:0`) == 1) {
        await era.printAndWait(''); // 处女
      } else {
        await era.printAndWait(''); // それ以外
      }
      kojo.舔阴 = 1;
      return 0;
    } else if (
      era0(`talent:${target}:136`) == 1 &&
      (kojo.舔阴 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 牝犬
      await era.printAndWait('');
      kojo.舔阴 = 6;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.舔阴 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait('');
      kojo.舔阴 = 5;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.舔阴 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait('');
      kojo.舔阴 = 4;
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      (kojo.舔阴 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 屈服刻印Lv3
      await era.printAndWait('');
      kojo.舔阴 = 3;
    } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外（屈服刻印Lv3未満）
      await era.printAndWait('');
      kojo.舔阴 = 2;
    }
    return 0;
  }

  if (era_flag.selectcom == 5) {
    // 兽奸胸爱撫 CFLAG:306
    if (kojo.胸爱抚 == 0) {
      // 初めて
      if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(''); // 爱慕
      } else {
        await era.printAndWait(''); // それ以外（爱無し）
      }
      kojo.胸爱抚 = 1;
      return 0;
    } else if (
      era0(`talent:${target}:136`) == 1 &&
      (kojo.胸爱抚 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 牝犬
      await era.printAndWait('');
      kojo.胸爱抚 = 6;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.胸爱抚 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait('');
      kojo.胸爱抚 = 5;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait('');
      kojo.胸爱抚 = 4;
    } else if (
      era0(`abl:${target}:1`) >= 3 &&
      (kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // B感觉Lv3以上
      await era.printAndWait('');
      kojo.胸爱抚 = 3;
    } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外（爱無し、B感觉Lv3未満）
      await era.printAndWait('');
      kojo.胸爱抚 = 2;
    }
    return 0;
  }

  if (era_flag.selectcom == 6) {
    // 兽奸キス CFLAG:307
    if (kojo.接吻 == 0 && era0('tflag:13')) {
      // 初吻
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait(''); // 牝犬
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(''); // 淫乱
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(''); // 爱慕
      } else {
        await era.printAndWait(''); // それ以外
      }
      kojo.接吻 = 1;
      return 0;
    } else if (kojo.接吻 == 0) {
      // （調教で和）初めて
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait(''); // 牝犬
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(''); // 淫乱
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(''); // 爱慕
      } else {
        await era.printAndWait(''); // それ以外
      }
      kojo.接吻 = 1;
      return 0;
    } else if (
      era0(`talent:${target}:136`) == 1 &&
      (kojo.接吻 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 二回目以降·牝犬
      await era.printAndWait('');
      kojo.接吻 = 6;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.接吻 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait('');
      kojo.接吻 = 5;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.接吻 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait('');
      kojo.接吻 = 4;
    } else if (
      era0(`abl:${target}:10`) >= 2 &&
      (kojo.接吻 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 顺从Lv2以上
      await era.printAndWait('');
      kojo.接吻 = 3;
    } else if (kojo.接吻 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外
      await era.printAndWait('');
      kojo.接吻 = 2;
    }
    return 0;
  }

  if (era_flag.selectcom == 9) {
    // 兽奸舔肛 CFLAG:310
    if (kojo.舔肛 == 0) {
      // 初めて
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait(''); // 牝犬
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(''); // 淫乱
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(''); // 爱慕
      } else {
        await era.printAndWait(''); // それ以外（爱無し）
      }
      kojo.舔肛 = 1;
      return 0;
    } else if (
      era0(`talent:${target}:136`) == 1 &&
      (kojo.舔肛 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 牝犬
      await era.printAndWait('');
      kojo.舔肛 = 6;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.舔肛 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait('');
      kojo.舔肛 = 5;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.舔肛 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait('');
      kojo.舔肛 = 4;
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      (kojo.舔肛 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 屈服刻印Lv3
      await era.printAndWait('');
      kojo.舔肛 = 3;
    } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外（屈服刻印Lv3未満）
      await era.printAndWait('');
      kojo.舔肛 = 2;
    }
    return 0;
  }

  if (era_flag.selectcom == 21) {
    // 兽奸背后位 CFLAG:322
    if (kojo.背后位 == 0) {
      // 初めて
      if (era0(`talent:${target}:0`) == 1) {
        // 处女
        if (era0(`talent:${target}:136`) == 1) {
          await era.printAndWait(''); // 牝犬
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(''); // 淫乱
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(''); // 爱慕
        } else {
          await era.printAndWait(''); // それ以外
        }
      } else {
        // 非处女
        if (era0(`talent:${target}:136`) == 1) {
          await era.printAndWait(''); // 牝犬
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(''); // 淫乱
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(''); // 爱慕
        } else {
          await era.printAndWait(''); // それ以外
        }
      }
      kojo.背后位 = 1;
      return 0;
    } else if (
      era0(`talent:${target}:136`) == 1 &&
      (kojo.背后位 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // 牝犬（RAND:3 三选一，三档台词均未填写，输出空行）
      if (rand_n(3) == 0) {
        await era.printAndWait('');
      } else if (rand_n(2) == 0) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      kojo.背后位 = 7;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.背后位 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      if (rand_n(3) == 0) {
        await era.printAndWait('');
      } else if (rand_n(2) == 0) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      kojo.背后位 = 6;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.背后位 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      if (rand_n(3) == 0) {
        await era.printAndWait('');
      } else if (rand_n(2) == 0) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      kojo.背后位 = 5;
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      era0(`abl:${target}:2`) >= 3 &&
      (kojo.背后位 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 屈服刻印Lv3＋V感觉Lv3以上
      await era.printAndWait('');
      kojo.背后位 = 4;
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      (kojo.背后位 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 屈服刻印Lv3
      await era.printAndWait('');
      kojo.背后位 = 3;
    } else if (kojo.背后位 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外
      await era.printAndWait('');
      kojo.背后位 = 2;
    }
    return 0;
  }

  if (era_flag.selectcom == 27) {
    // 兽奸背后位アナル CFLAG:328
    if (kojo.背后位肛交 == 0) {
      // 初めて
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait(''); // 牝犬
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(''); // 淫乱
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(''); // 爱慕
      } else {
        await era.printAndWait(''); // それ以外（爱無し）
      }
      kojo.背后位肛交 = 1;
      return 0;
    } else if (
      era0(`talent:${target}:136`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.背后位肛交 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // 牝犬＋A感觉Lv3以上（RAND:2 二选一，两档台词均未填写，输出空行）
      if (rand_n(2) == 0) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      kojo.背后位肛交 = 7;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.背后位肛交 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱＋A感觉Lv3以上
      if (rand_n(2) == 0) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      kojo.背后位肛交 = 6;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.背后位肛交 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋A感觉Lv3以上
      if (rand_n(2) == 0) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      kojo.背后位肛交 = 5;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait('');
      kojo.背后位肛交 = 4;
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.背后位肛交 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // A感觉Lv3以上
      await era.printAndWait('');
      kojo.背后位肛交 = 3;
    } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外（爱無し、A感觉Lv3未満）
      await era.printAndWait('');
      kojo.背后位肛交 = 2;
    }
    return 0;
  }

  if (era_flag.selectcom == 30) {
    // 兽奸手淫 CFLAG:331
    if (kojo.手淫 == 0) {
      // 初めて
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(''); // 淫乱
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(''); // 爱慕
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(''); // 侍奉精神Lv3以上
      } else {
        await era.printAndWait(''); // それ以外（侍奉精神Lv3未満）
      }
      kojo.手淫 = 1;
      return 0;
    } else if (
      era0(`talent:${target}:136`) == 1 &&
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.手淫 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // 牝犬＋侍奉精神Lv3以上（RAND:2 二选一）
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
      // 淫乱＋侍奉精神Lv3以上
      if (rand_n(2) == 0) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      kojo.手淫 = 6;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:16`) >= 5 &&
      (kojo.手淫 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋侍奉精神Lv5
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
      // 爱＋侍奉精神Lv3以上
      await era.printAndWait('');
      kojo.手淫 = 4;
    } else if (
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.手淫 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 侍奉精神Lv3以上
      await era.printAndWait('');
      kojo.手淫 = 3;
    } else if (kojo.手淫 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外（侍奉精神Lv3未満）
      await era.printAndWait('');
      kojo.手淫 = 2;
    }
    return 0;
  }

  if (era_flag.selectcom == 31) {
    // 兽奸口交 CFLAG:332
    if (kojo.口交_奴 == 0) {
      // 初めて
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(''); // 淫乱
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(''); // 爱慕
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(''); // 侍奉精神Lv3以上
      } else {
        await era.printAndWait(''); // それ以外（侍奉精神Lv3未満）
      }
      kojo.口交_奴 = 1;
      return 0;
    } else if (
      era0(`talent:${target}:136`) == 1 &&
      era0(`abl:${target}:16`) >= 5 &&
      (kojo.口交_奴 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // 牝犬＋侍奉精神Lv5
      await era.printAndWait('');
      kojo.口交_奴 = 7;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:16`) >= 5 &&
      (kojo.口交_奴 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱＋侍奉精神Lv5
      await era.printAndWait('');
      kojo.口交_奴 = 6;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.口交_奴 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait('');
      kojo.口交_奴 = 5;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:16`) >= 5 &&
      (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋侍奉精神Lv5
      await era.print(''); // PRINTFORML
      await era.printAndWait('');
      kojo.口交_奴 = 4;
    } else if (
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.口交_奴 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 侍奉精神Lv3以上
      await era.print(''); // PRINTFORML
      await era.printAndWait('');
      kojo.口交_奴 = 3;
    } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外（侍奉精神Lv3未満）
      await era.printAndWait('');
      kojo.口交_奴 = 2;
    }
    return 0;
  }

  if (era_flag.selectcom == 34) {
    // 兽奸骑乘位 CFLAG:335
    if (kojo.骑乘位 == 0) {
      // 初めて
      if (era0(`talent:${target}:0`) == 1) {
        // 处女
        if (era0(`talent:${target}:136`) == 1) {
          await era.printAndWait(''); // 牝犬
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(''); // 淫乱
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(''); // 爱慕
        } else {
          await era.printAndWait(''); // それ以外（爱無し）
        }
      } else {
        // 非处女
        if (era0(`talent:${target}:136`) == 1) {
          await era.printAndWait(''); // 牝犬
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(''); // 淫乱
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(''); // 爱慕
        } else {
          await era.printAndWait(''); // それ以外
        }
      }
      kojo.骑乘位 = 1;
      return 0;
    } else if (
      era0(`talent:${target}:136`) == 1 &&
      (kojo.骑乘位 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // 牝犬（RAND:3 三选一）
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
      // 淫乱（RAND:4 四选一）
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
      // 爱慕（RAND:4 四选一，首档 PRINTFORML，其余 PRINTFORMW）
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
      // 屈服刻印Lv3＋V感觉Lv3以上（RAND:4 四选一）
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
      // 屈服刻印Lv3
      await era.print(''); // PRINTFORML
      await era.printAndWait('');
      kojo.骑乘位 = 3;
    } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外（爱無し、顺从Lv5未満——注释写"顺从"，实际条件只看 CFLAG 取值）
      await era.printAndWait('');
      kojo.骑乘位 = 2;
    }
    return 0;
  }

  if (era_flag.selectcom == 37) {
    // 兽奸肛门侍奉 CFLAG:338
    if (kojo.肛门侍奉 == 0) {
      // 初めて
      if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(''); // 侍奉精神Lv3以上
      } else {
        await era.printAndWait(''); // それ以外（侍奉精神Lv3未満）
      }
      kojo.肛门侍奉 = 1;
      return 0;
    } else if (
      era0(`talent:${target}:136`) == 1 &&
      era0(`abl:${target}:16`) >= 5 &&
      (kojo.肛门侍奉 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 牝犬＋侍奉精神Lv5
      await era.printAndWait('');
      kojo.肛门侍奉 = 6;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:16`) >= 5 &&
      (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱＋侍奉精神Lv5
      await era.printAndWait('');
      kojo.肛门侍奉 = 5;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:16`) >= 5 &&
      (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋侍奉精神Lv5（仅一句 PRINTFORML，无 PRINTFORMW 收尾）
      await era.print('');
      kojo.肛门侍奉 = 4;
    } else if (
      era0(`abl:${target}:16`) >= 3 &&
      (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 侍奉精神Lv3以上
      await era.printAndWait('');
      kojo.肛门侍奉 = 3;
    } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外（侍奉精神Lv3未満）
      await era.printAndWait('');
      kojo.肛门侍奉 = 2;
    }
    return 0;
  }

  if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`)) {
    // 兽奸眼罩 開始時 CFLAG:344
    if (kojo.眼罩 == 0) {
      // 初めて
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait(''); // 牝犬
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(''); // 淫乱
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(''); // 爱慕
      } else {
        await era.printAndWait(''); // それ以外
      }
      kojo.眼罩 = 1;
      return 0;
    } else if (
      era0(`talent:${target}:136`) == 1 &&
      (kojo.眼罩 <= 9 || game.kojo.口上开关 == 2)
    ) {
      // 牝犬
      await era.printAndWait('');
      kojo.眼罩 = 10;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:21`) >= 5 &&
      (kojo.眼罩 <= 8 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱＋受虐狂っ気Lv5以上
      await era.printAndWait('');
      kojo.眼罩 = 9;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.眼罩 <= 7 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱＋受虐狂っ気Lv3以上
      await era.printAndWait('');
      kojo.眼罩 = 8;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.眼罩 <= 6 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait('');
      kojo.眼罩 = 7;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:21`) >= 5 &&
      (kojo.眼罩 <= 5 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋受虐狂っ気Lv5以上
      await era.printAndWait('');
      kojo.眼罩 = 6;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.眼罩 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // 爱＋受虐狂っ気Lv3以上
      await era.printAndWait('');
      kojo.眼罩 = 5;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.眼罩 <= 3 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait('');
      kojo.眼罩 = 4;
    } else if (
      era0(`abl:${target}:21`) >= 3 &&
      (kojo.眼罩 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // 受虐狂っ気Lv3以上
      await era.printAndWait('');
      kojo.眼罩 = 3;
    } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 == 2) {
      // それ以外
      await era.printAndWait('');
      kojo.眼罩 = 2;
    }
    return 0;
  } else if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`) == 0) {
    // 兽奸眼罩 終了時 CFLAG:444
    if (
      era0(`talent:${target}:136`) == 1 &&
      (kojo.兽奸眼罩 < 3 || game.kojo.口上开关 == 2)
    ) {
      // 牝犬
      await era.printAndWait('');
      kojo.兽奸眼罩 = 4;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.兽奸眼罩 < 3 || game.kojo.口上开关 == 2)
    ) {
      // 淫乱
      await era.printAndWait('');
      kojo.兽奸眼罩 = 3;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.兽奸眼罩 < 2 || game.kojo.口上开关 == 2)
    ) {
      // 爱慕
      await era.printAndWait('');
      kojo.兽奸眼罩 = 2;
    } else if (kojo.兽奸眼罩 < 1 || game.kojo.口上开关 == 2) {
      // それ以外
      await era.printAndWait('');
      kojo.兽奸眼罩 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 56) {
    // 兽奸会話 CFLAG:357（源注释：狗不能对话，仅有自我介绍）
    if (kojo.交谈 == 0) {
      // 初めて
      if (era0(`tequip:${target}:53`)) {
        // ビデオ自己紹介
        if (era0(`talent:${target}:136`) == 1) {
          await era.printAndWait(''); // 牝犬
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(''); // 淫乱
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(''); // 爱慕
        } else {
          await era.printAndWait(''); // それ以外
        }
      }
      kojo.交谈 = 1;
      return 0;
    } else if (era0(`tequip:${target}:53`)) {
      // 二回目以降·ビデオ自己紹介（无摄像分支时直接跳过，不打印任何文本）
      if (
        era0(`talent:${target}:136`) == 1 &&
        (kojo.交谈 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(''); // 牝犬
        kojo.交谈 = 5;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.交谈 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(''); // 淫乱
        kojo.交谈 = 4;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.交谈 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(''); // 爱慕
        kojo.交谈 = 3;
      } else if (kojo.交谈 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(''); // それ以外
        kojo.交谈 = 2;
      }
    }
    return 0;
  }

  return 0;
}

/**
 * kojo_message_palamcng_8：参数变动口上（FLAG:7 > 0 才达）。
 * 检查：助手调教、口塞、失神、崩坏、兽奸、触手、死斗场。P/A
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

  // 初めて润滑がLV2超えた CFLAG:221
  p = era0(`palam:${target}:3`) + train.润滑增量;
  if (p > PALAMLV[2] && kojo.首次润滑Lv2 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      // 爱慕
      if (era_flag.selectcom == 50) {
        // 润滑液を使った場合
        await era.printAndWait(`「啊啊…润滑液黏糊糊的…啊嗯」`);
        await era.printAndWait(`―――润滑初次超过LV2。`);
      } else {
        // それ以外
        await era.printAndWait(`「啊啊…我居然那么湿了…」`);
        await era.printAndWait(`―――润滑初次超过LV2。`);
      }
    } else {
      // それ以外
      if (era_flag.selectcom == 50) {
        // 润滑液を使った場合
        await era.printAndWait(`「哈啊哈啊…嗯…这个润滑液稍微有点冷……」`);
        await era.printAndWait(`―――润滑初次超过LV2。`);
      } else {
        // それ以外
        await era.printAndWait(`「啊…我居然变得…被你的手…弄湿了什么的…」`);
        await era.printAndWait(`―――润滑初次超过LV2。`);
      }
    }
    kojo.首次润滑Lv2 = 1; // CFLAG:TARGET:221 = 1
  }

  // 初めて欲情がLV2超えた CFLAG:222
  p = era0(`palam:${target}:5`) + train.欲情增量;
  if (p > PALAMLV[2] && kojo.首次欲情Lv2 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      // 爱慕
      if (era_flag.selectcom == 51) {
        // 媚药を使った場合
        await era.printAndWait(
          `「啊、啊啊…喝了这种药…发情什么的…明明是很羞人的事…啊啊…」`,
        );
        await era.printAndWait(`―――欲情初次超过LV2。`);
      } else {
        // それ以外
        await era.printAndWait(`「呐…快点…抱我…把我弄得乱七八糟吧…」`);
        await era.printAndWait(`―――欲情初次超过LV2。`);
      }
    } else {
      // それ以外
      if (era_flag.selectcom == 51) {
        // 媚药を使った場合
        await era.printAndWait(
          `「唔、呜呜…这种药居然会对我起效果…啊啊…别、别过来！」`,
        );
        await era.printAndWait(`―――欲情初次超过LV2。`);
      } else {
        // それ以外
        await era.printAndWait(
          `「呵呵呵、身体稍微变得热起来的样子了…啊啊…啊啊啊………」`,
        );
        await era.printAndWait(`―――欲情初次超过LV2。`);
      }
    }
    kojo.首次欲情Lv2 = 1; // CFLAG:222 = 1
  }

  // 初めて耻情がLV2超えた CFLAG:223
  p = era0(`palam:${target}:8`) + era0(`delta:${target}:8`); // palam:8 无 train 门面
  if (p > PALAMLV[2] && kojo.首次耻情Lv2 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      // 爱慕
      await era.printAndWait(`「啊啊…太羞耻了…不要看啊…」`);
      await era.printAndWait(`―――耻情初次超过LV2。`);
    } else {
      // それ以外
      await era.printAndWait(`「就算对我做了那样的事…也是没有意义的…唔」`);
      await era.printAndWait(`―――耻情初次超过LV2。`);
    }
    kojo.首次耻情Lv2 = 1; // CFLAG:223 = 1
  }

  // 初めて恐怖がLV2超えた CFLAG:224
  p = era0(`palam:${target}:10`) + era0(`delta:${target}:10`); // palam:10 无 train 门面
  if (p > PALAMLV[2] && kojo.首次恐怖Lv2 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      // 爱慕
      await era.printAndWait(`「为什么要对我做这样的事啊…」`);
      await era.printAndWait(`―――恐怖初次超过LV2。`);
    } else {
      // それ以外
      await era.printAndWait(`「我才没有…害怕呢…咕」`);
      await era.printAndWait(`―――恐怖初次超过LV2。`);
    }
    kojo.首次恐怖Lv2 = 1; // CFLAG:224 = 1
  }

  // 初めて阴蒂绝顶 CFLAG:225
  if (era0(`nowex:${target}:0`) > 0 && kojo.首次C绝顶 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      // 爱慕
      await era.printAndWait(
        `「啊…啊啊…在你的…在你的面前去了…啊啊…啊…嗯${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}因为阴蒂断断续续的被刺激而一边下流的扭着腰一边发出了娇喘。`,
      );
      await era.printAndWait(
        `「啊…要去了…要去了…比平时还厉害…的…啊啊啊…嗯…啊啊嗯${heart(1)}」`,
      );
      await era.printAndWait(
        `然后${target_name}张开漂亮的喉咙，发出了异常高亢的绝顶的娇喘。`,
      );
      await era.printAndWait(`「啊啊嗯！要去了…要用阴蒂去了！去了！！！」`);
      await era.printAndWait(
        `「嗯啊…啊啊…在你面前…变得这么舒服了…${heart(1)}」`,
      );
    } else {
      // それ以外
      await era.printAndWait(
        `「啊…啊啊！？不、不行…再继续弄的话…啊…嗯…呜啊！？」`,
      );
      await era.printAndWait(
        `${target_name}在阴蒂的强烈刺激下发出了悲鸣。但是很容易就能明白，那悲鸣里混杂着甜美和快乐。`,
      );
      await era.printAndWait(
        `然后${target_name}张开漂亮的喉咙，发出了绝顶的娇喘。`,
      );
      await era.printAndWait(
        `「啊…嗯…不、不要啊…这样…被强迫着去了什么的…啊啊不行…啊…咕…嗯…呀啊啊啊！」`,
      );
      await era.printAndWait(`「嗯啊………这种…屈辱…嗯嗯嗯」`);
    }
    kojo.首次C绝顶 = 1; // CFLAG:225 = 1
  }

  // 初めて私处绝顶 CFLAG:226
  if (era0(`nowex:${target}:1`) > 0 && kojo.首次V绝顶 == 0) {
    if (era0(`talent:${target}:76`) == 1) {
      // 淫乱
      await era.printAndWait(
        `「啊啊…继续侵犯…我的小穴…${heart(1)} 啊啊…要去…要去了${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}下流的张开双腿，蜜裂抽搐着。那个姿态已经完全不是帅气的女忍者的身姿了。`,
      );
      await era.printAndWait(
        `「我…去了…用小穴…用小穴去了${heart(1)} 啊啊…啊嗯…啊啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}全身痉挛着，迎来了第一次私处绝顶………`,
      );
    } else if (era0(`talent:${target}:85`) == 1) {
      // 爱慕
      await era.printAndWait(
        `「啊…啊嗯…再继续的话…我…我…嗯…要去…要去了…去了…啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}的蜜裂被好几次火焰炙烤那样侵犯、尖锐的贝明哲。`,
      );
      await era.printAndWait(
        `然后${target_name}终于在${player_name}面前迎来了第一次私处决定。`,
      );
      await era.printAndWait(
        `「嗯…啊啊…去了…要去了…在你面前…啊啊啊…要去了——${heart(1)}」`,
      );
    } else {
      // それ以外
      await era.printAndWait(
        `「饶、饶了我吧…啊啊…啊…再继续的话我的…啊…嗯…不行…明明不行…啊啊…啊啊…啊啊——！」`,
      );
      await era.printAndWait(
        `${target_name}的蜜裂被侵犯了不停的侵犯、终于第一次用私处高潮了。`,
      );
      await era.printAndWait(`「啊啊…我…要变…要变得奇怪了…啊、啊啊——！」`);
    }
    kojo.首次V绝顶 = 1; // CFLAG:TARGET:226 = 1
  } else if (era0(`nowex:${target}:1`) > 0 && kojo.首次V绝顶 == 1) {
    // 私处绝顶二度目以降
    if (era0(`talent:${target}:76`) == 1 && game.event.插着不拔 == 1) {
      // 淫乱+挿しっぱ无
      await era.printAndWait(
        `「啊啊…我的小穴…被你的阴茎插的…啊啊…变成马上就回去的淫乱小穴了${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}的深处每次被侵犯，腔口都会痉挛着包裹住${player_name}的阴茎。`,
      );
      await era.printAndWait(
        `「来…继续插进来…啊啊…嗯…啊嗯…啊啊——${heart(1)}」`,
      );
      await era.printAndWait(
        `「啊…啊啊…这样…这样好舒服…用你的阴茎…啊…去了去了…啊啊啊啊——${heart(1)}」`,
      );
      await era.printAndWait(
        `然后${target_name}发出着格外高亢的娇喘、高潮了………`,
      );
    } else if (era0(`talent:${target}:85`) == 1 && game.event.插着不拔 == 1) {
      // 爱慕+挿しっぱ无
      await era.printAndWait(
        `「啊啊…我…已经去了…被你…疼爱着…啊啊…去了啊啊啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}像是要不让${player_name}的阴茎逃走那样，紧锁着腔口。`,
      );
      await era.printAndWait(
        `「啊嗯！啊啊…我…去了…用你的阴茎去了啊——${heart(1)}」`,
      );
      await era.printAndWait(
        `然后${target_name}发出着格外高亢的娇喘、高潮了………`,
      );
    } else if (game.event.插着不拔 == 1) {
      // 刺しっぱ无
      await era.printAndWait(
        `「啊啊…不要啊…我已经…不想去了…明明不想去了…嗯…啊啊…嗯…去了…去了啊——！」`,
      );
      await era.printAndWait(
        `${target_name}的腔口不停的紧缩着、让${target_name}的阴茎舒服着。`,
      );
      await era.printAndWait(`「啊啊啊——…我…我…去了…去…了…啊…啊啊——！」`);
      await era.printAndWait(
        `${target_name}一边接受着插入深处的${player_name}的阴茎，一边高潮了………`,
      );
    }
  }

  // 初めて肛门绝顶 CFLAG:227
  if (era0(`nowex:${target}:2`) > 0 && kojo.首次A绝顶 == 0) {
    if (era0(`talent:${target}:76`) == 1) {
      // 淫乱
      await era.printAndWait(
        `「继续欺负…我的肛门…啊啊…有什么、有什么要来了…啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}因为从肛门传到背上的甜美的触感发出了娇喘、肛门不停的收缩着。`,
      );
      await era.printAndWait(
        `「嗯啊…啊啊…我的肛门…啊啊腰变成屁股小穴了…肛门小穴去了啊啊啊啊啊啊——${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}第一次肛门绝顶、毫不留情的露出了阿黑颜………`,
      );
    } else if (era0(`talent:${target}:85`) == 1) {
      // 爱慕
      await era.printAndWait(
        `「啊…啊啊…被你…侵犯肛门…嗯…已经…变得很有感觉了…啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}被肛门侵犯得娇喘着。从肛门传到背上的快感使身体颤抖着，一看就知道很快就要绝顶了。`,
      );
      await era.printAndWait(
        `「啊啊…啊…去了…去了…嗯…啊啊…啊、啊…啊啊、啊啊——${heart(3)}」`,
      );
      await era.printAndWait(`看起来${target_name}第一次用肛门绝顶了………`);
    } else {
      // それ以外
      await era.printAndWait(
        `「啊、啊啊…不要…不要啊…这样…用屁股什么的…啊啊…啊…用屁股高潮了…啊啊！」`,
      );
      await era.printAndWait(
        `${target_name}扭着腰想从快乐中逃离开、理所当然的没有逃掉就这样迎来了第一次肛门绝顶。`,
      );
      await era.printAndWait(
        `「啊啊！屁股…嗯…啊啊…要变得奇怪了…要去了啊…啊啊——！」`,
      );
    }
    kojo.首次A绝顶 = 1; // CFLAG:227 = 1
  } else if (era0(`nowex:${target}:2`) > 0 && kojo.首次A绝顶 == 1) {
    // 肛门绝顶二度目以降
    if (era0(`talent:${target}:76`) == 1) {
      // 淫乱
      await era.printAndWait(
        `「啊啊…屁股小穴去了…我的肛门…变得好舒服…啊…啊啊——${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}的屁股不停的收缩着，一边发出着绝顶的声音。对${player_name}露出快乐的好像融化一样的表情。`,
      );
      await era.printAndWait(
        `「啊嗯…啊…啊啊…嗯啊…继续让我…高潮到发疯吧………${heart(1)}」`,
      );
    } else if (era0(`talent:${target}:85`) == 1) {
      // 爱慕
      await era.printAndWait(
        `「啊啊…去了…去了…啊啊…肛门要融化了…啊啊…啊、啊嗯啊——${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}一边发出尖锐的声音一边肛门绝顶着。因为沉溺在快乐中而露出融化一样的表情。`,
      );
      await era.printAndWait(
        `「啊…嗯…继续…让我的肛门…更舒服吧………${heart(1)}」`,
      );
    } else {
      // それ以外
      await era.printAndWait(
        `「不行…再继续的话…我…我的…肛门要…变得奇怪了…啊啊——！」`,
      );
      await era.printAndWait(
        `${target_name}的肛门好几次颤抖着绝顶了、精疲力尽的身体横躺到了一旁。`,
      );
      await era.printAndWait(`「啊啊…已经…回不去了…我…已经不行了………」`);
    }
  }

  // 初めて乳房绝顶 CFLAG:228
  if (era0(`nowex:${target}:3`) > 0 && kojo.首次B绝顶 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      // 爱慕
      await era.printAndWait(
        `「啊…啊啊…继续…欺负我的乳房吧…啊…啊嗯…啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}的胸部被刺激着，发出了甜美的声音、乳头勃起得不能再勃起了、断断续续的快感让${target_name}的脑袋都要融化了。`,
      );
      await era.printAndWait(
        `「继续挖弄乳头！让我…让我去吧！啊…啊啊…啊啊啊——${heart(1)}」`,
      );
      await era.printAndWait(
        `被${player_name}用手指撵着乳头的${target_name}发出悲鸣。看样子绝顶了。`,
      );
      await era.printAndWait(
        `「嗯啊…嗯啊…继续欺负…我的乳房…让我去吧…啊啊…啊啊啊…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}明明刚绝顶不久，却在恳求这进一步调教乳房………`,
      );
    } else {
      // それ以外
      await era.printAndWait(
        `「嗯…嗯…啊啊…嗯…这样…不行…不要再继续欺负…我的胸部了…啊啊…啊啊………」`,
      );
      await era.printAndWait(
        `${target_name}的胸部被刺激而漏出声音、乳头勃起得不能再勃起了、断断续续的快感让${target_name}的脑袋都要融化了。`,
      );
      await era.printAndWait(
        `「嗯、啊啊、嗯…我的胸部…这么有感觉什么的…嗯…啊…啊不要再欺负乳头了…啊啊！」`,
      );
      await era.printAndWait(
        `「啊、不行…不行…要去了…要去了…嗯…啊啊…啊…嗯…嗯…恩啊啊啊啊——！！！」`,
      );
      await era.printAndWait(
        `${target_name}在${player_name}面前第一次乳房绝顶了………`,
      );
    }
    kojo.首次B绝顶 = 1; // CFLAG:TARGET:228 = 1
  } else if (era0(`nowex:${target}:3`) > 0 && kojo.首次B绝顶 == 1) {
    // 乳房绝顶二度目以降
    if (era0(`talent:${target}:78`) == 1) {
      // 弄乳狂
      await era.printAndWait(
        `「啊…啊啊啊…胸部…要去…要去了…啊啊啊…我的胸部…好奇怪啊${heart(1)}」`,
      );
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「啊嗯…恩…啊啊…胸部要融化了…要融化了…啊啊啊${heart(1)}」`,
        );
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「啊啊…我…已经…不行…不行了…啊嗯…恩…嗯啊啊啊——${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「已经…已经去了…去了…胸部去了啊啊啊——${heart(1)}」`,
        );
      }
      await era.printAndWait(
        `${target_name}的乳房被刺激着好像快疯了、乳头通红的充着血勃起着，嘴里不停的流着口水。`,
      );
      await era.printAndWait(
        `「啊嗯…啊…啊…啊啊…啊啊…继续…欺负胸部…啊嗯…啊啊啊${heart(1)}」`,
      );
    }
  }

  // 处女喪失(处女のみ) CFLAG:229
  a_up = train.反感增量 + train.不快增量; // A = UP:11 + UP:12
  if (game.train.处女丧失 == 1 && kojo.处女丧失 == 0) {
    if (game.train.主人导致处女丧失 == 1) {
      // 主人による处女喪失
      if (
        era0(`talent:${target}:76`) == 1 &&
        (a_up < 500 || game.system.反抗刻印回避 == 1)
      ) {
        // 淫乱かつ反抗刻印取得せず
        await era.printAndWait(
          `「啊啊嗯…终于成为你的东西了…啊嗯…啊啊…啊…我…想要你的阴茎想要得不得了${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}无视破瓜残留的疼痛，就这样被${player_name}贯穿着发出了甜甜的声音。`,
        );
        await era.printAndWait(
          `「这样的话就会…开始咕啾咕啾的侵犯我的小穴…并开始调教吧？」`,
        );
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (a_up < 500 || game.system.反抗刻印回避 == 1)
      ) {
        // 爱かつ反抗刻印取得せず
        await era.printAndWait(
          `「啊嗯…啊啊…把我的第一次先给你好高兴…啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}忍耐着破瓜之痛向${player_name}说着。`,
        );
        await era.printAndWait(`「啊啊…继续…抱我…我…想要你…！」`);
      } else {
        // それ以外
        await era.printAndWait(
          `「咕…呜…嗯…不会哭的…我不会哭的…啊啊…啊啊！不要再动了…啊、呀！」`,
        );
        await era.printAndWait(
          `${target_name}咬着嘴唇忍耐着破瓜之痛、随着开始抽插的${player_name}发出了悲鸣并留下了眼泪………`,
        );
      }
    } else {
      // 主人以外による处女喪失
      if (era0(`talent:${target}:76`) == 1) {
        // 淫乱
        await era.printAndWait(
          `「啊啊…我的第一次被夺走了…啊啊、下次想要你的阴茎…想要你的阴茎哦………」`,
        );
        await era.printAndWait(
          `${target_name}的蜜裂流着纯洁之证的血的同时，扭着腰诱惑着${player_name}………`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        // 爱慕
        await era.printAndWait(`「嗯…啊啊…啊嗯…我的第一次…明明想要给你的…」`);
        await era.printAndWait(`${target_name}带着背上的表情低下了头………`);
      } else {
        // それ以外
        await era.printAndWait(
          `「嗯啊…这样的话还不如干脆用自己的手…来做就好了………」`,
        );
        await era.printAndWait(
          `${target_name}因为破瓜之痛而带着痛苦的表情嘟囔着………`,
        );
      }
    }
    kojo.处女丧失 = 1; // CFLAG:TARGET:229 = 1
  }

  return 0;
}

// 注册进分发族（TRYCALLFORM KOJO_MESSAGE_PALAMCNG_8 的等价物）
kojo_message_palamcng_family.register(8, kojo_message_palamcng_8);

/**
 * kojo_message_markcng_8：刻印取得口上。
 * 检查：口塞、失神、兽奸、触手、崩坏、死斗场（助手
 * 调教检查未启用）。苦痛/快乐/屈服/反抗刻印 Lv3
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

  // 苦痛刻印Lv3取得 CFLAG:297
  if (game.system.苦痛刻印变动 == 3 && kojo.苦痛刻印Lv3 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      // 爱慕
      await era.printAndWait(`「啊啊…你竟然做到了这种程度…唔…啊…啊啊！」`);
      await era.printAndWait(`${target_name}因为超过限度的苦痛而悲鸣着………`);
    } else {
      // それ以外
      await era.printAndWait(`「啊啊…这种痛苦…唔……不、不要…不要啊！」`);
      await era.printAndWait(`${target_name}因为超过限度的苦痛而悲鸣着………`);
    }
    kojo.苦痛刻印Lv3 = 1; // CFLAG:297 = 1
  }

  // 快乐刻印Lv3取得 CFLAG:298
  if (game.system.快乐刻印变动 == 3 && kojo.快乐刻印Lv3 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      // 爱慕
      await era.printAndWait(
        `「被做了这么舒服的事的话…我…会变得离不开你的…啊啊…继续…做下去${heart(1)}」`,
      );
      await era.printAndWait(
        `身体里被刻下了强烈的快感的${target_name}、带着快融化一样的表情对${player_name}撒着娇。`,
      );
      await era.printAndWait(
        `「嗯啊…对我做更舒服的事吧${heart(1)} …来吧${heart(1)} …啊啊——${heart(1)}」`,
      );
    } else {
      // それ以外
      await era.printAndWait(
        `「啊啊…这么舒服…还是第一次…啊啊！不行…再继续被玩弄的话我…已经…啊啊…变得奇怪…回不了头啊！」`,
      );
      await era.printAndWait(
        `${target_name}的身体里被刻下了强烈的快感、漏出了快要融化一样的表情………`,
      );
    }
    kojo.快乐刻印Lv3 = 1; // CFLAG:298 = 1
  }

  // 屈服刻印Lv3取得 CFLAG:299
  if (game.system.屈服刻印变动 == 3 && kojo.屈服刻印Lv3 == 0) {
    await era.printAndWait(`「啊啊…我…已经…不会再反抗了…」`);
    await era.printAndWait(`「或许这才是我…新的………」`);
    await era.printAndWait(`${target_name}完全的屈服了的样子………`);
    kojo.屈服刻印Lv3 = 1; // CFLAG:299 = 1
  }

  // 反抗刻印Lv3取得 CFLAG:300
  if (game.system.反抗刻印变动 == 3 && kojo.反抗刻印Lv3 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      // 爱慕
      await era.printAndWait(`「为…为什么要这么对我…真的会讨厌你的…呜呜」`);
    } else {
      // それ以外
      await era.printAndWait(`「咕…嗯…我真的生气了…！」`);
      await era.printAndWait(
        `${target_name}的眼中充满愤怒、瞪着${player_name}………`,
      );
    }
    kojo.反抗刻印Lv3 = 1; // CFLAG:300 = 1
  }

  return 0;
}

// 注册进分发族（TRYCALLFORM KOJO_MESSAGE_MARKCNG_8 的等价物）
kojo_message_markcng_family.register(8, kojo_message_markcng_8);

/**
 * self_kojo_k8：事件口上（TFLAG:13 分派）。
 * 1 调教后自慰 / 2 百合PLAY / 3 朝口交 / 4 调教后性交 / 5 夜袭 / 6 卖却 /
 * 11 妊娠发觉 / 12 生产 / 13 育儿室 / 14 亲离 / 999 死亡 / 998 寿命；
 * 末行 TFLAG:13 = 0。死亡/寿命两支台词均为空（模板未填写，
 * 非转译遗漏）。妊娠发觉/生产两支的「已发觉/已生产」分支与
 * 「首次发觉/生产」分支内容重复（同 SELECTCOM 87 先例）。
 * 卖却分支尾调 SELL_MATURO_K0 已随 #338 接通。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（本函数未直接消费，随族签名保留）
 * @param {number} [q] 自慰妄想对象（Q：0 主人 / 1 助手 / 2 野狗，
 *   #214 决议：单字母全局改显式传参）
 * @returns {Promise<number>} 0
 */
async function self_kojo_k8(rand, q) {
  // 跨模块全局 S（调教后加做次数）：TFLAG:13 == 4
  // 一支要读，走 event-aftertrain 的既有访问器，不进族签名（K7 已有先例）
  const s = peek_aftertrain_s();
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const assi_name = chara_callname(era_flag.assi); // %SAVESTR:ASSI%
  const master_name = chara_name(0); // %CALLNAME:MASTER%（MASTER 恒角色 0）
  const kojo = chara(target).kojo;
  // CSTR:2：妊娠父系名字（妊娠事件侧未实现，读不到）
  const cstr2 = era.get(`cstr:${target}:2`) || '';

  // 调教后自慰 CFLAG:261
  if (game.train.初吻与自我口上 === 1) {
    if (era0(`talent:${target}:9`) === 1) {
      // 崩坏してしまった場合
      await era.printAndWait(`「啊嗯…嗯啊大人嗯大人………」`);
      await era.printAndWait(`${target_name}像坏掉的玩具一样，疯狂的自慰着………`);
    } else if (q === 1) {
      // 爱がなくかつ助手とのレズセックス後なら百合气质×20%で助手
      await era.printAndWait(`「那个人…还会…来抱我吗…嗯…嗯嗯！」`);
      await era.printAndWait(
        `${target_name}像是在寻求${assi_name}的残渣一样，用手指抚摸着秘所………`,
      );
    } else if (q === 2) {
      // 上に該当せずかつ爱がなくアイテムに野良犬があれば、兽奸中毒×20%で野良犬
      await era.printAndWait(`「啊嗯…忘不了流浪狗大人的阴茎…啊…啊啊啊！」`);
      await era.printAndWait(
        `${target_name}想象被流浪狗侵犯着，疯狂的自慰着………`,
      );
    } else {
      // その他
      if (
        era0(`talent:${target}:76`) &&
        (kojo.调教后自慰 < 4 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `「嗯啊啊…小穴好舒服…${heart(1)} 嗯啊嗯…啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边激烈的摩擦着秘裂、一边苦闷的躺在床上。`,
        );
        await era.printAndWait(
          `「我的身体已经…好像被重做成只为了做H的事一样呢…啊啊啊${heart(1)}」`,
        );
        if (era0(`talent:${target}:0`) === 1) {
          await era.printAndWait(
            `然后${target_name}用手指不停的搅拌着还不知道男性的蜜裂的入口。`,
          );
          await era.printAndWait(
            `「嗯啊…嗯、啊啊…好像快点要阴茎…想要被侵犯到子宫为止${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `${target_name}把两根，三根的手指插进了蜜壶，就那样开始搅拌了起来。`,
          );
          await era.printAndWait(
            `「嗯…嗯嗯…阴茎…好像被粗大的阴茎侵犯里面…啊啊啊${heart(1)}」`,
          );
        }
        kojo.调教后自慰 = 4; // CFLAG:261 = 4
      } else if (
        era0(`talent:${target}:85`) &&
        (kojo.调教后自慰 < 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(
          `「啊啊…啊嗯…那个人的温度还残留着…啊…啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}舔着指尖，一边用手指描绘着自己的蜜裂的样子，一边苦闷的躺在床上。`,
        );
        await era.printAndWait(
          `「还想继续被抱…啊啊…因为我的全部都是那个人的东西…啊…啊啊！」`,
        );
        if (era0(`talent:${target}:0`) === 1) {
          await era.printAndWait(`「嗯嗯…快点让我变成女人吧…啊啊…嗯啊啊嗯！」`);
          await era.printAndWait(
            `${target_name}用手指不停的搅拌着还不知道男性的蜜裂的入口………`,
          );
        } else {
          await era.printAndWait(
            `「只用我的手指…啊嗯…完全不够啊…啊…啊嗯${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}把两根，三根甚至更多的手指插进了蜜壶搅拌了起来………`,
          );
        }
        kojo.调教后自慰 = 3; // CFLAG:261 = 3
      } else if (
        era0(`abl:${target}:31`) >= 3 &&
        (kojo.调教后自慰 < 2 || game.kojo.口上开关 === 2)
      ) {
        // 自慰中毒Lv3以上
        await era.printAndWait(
          `「啊啊…嗯…嗯啊…啊啊…手指停不下来…！嗯…啊啊！」`,
        );
        await era.printAndWait(
          `「自慰的频率比以前还高了…肯定是被抓到这种地方的原因…啊啊…嗯…咕！」`,
        );
        await era.printAndWait(
          `${target_name}躺在硬床上、一边为压低声音而咬着床单，一边不停的自慰着………`,
        );
        kojo.调教后自慰 = 2; // CFLAG:261 = 2
      } else if (kojo.调教后自慰 < 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.printAndWait(
          `「啊啊…谁快点来救救我…不然的话我会…嗯…啊嗯！」`,
        );
        await era.printAndWait(`「我会…我会…啊啊…啊嗯！」`);
        kojo.调教后自慰 = 1; // CFLAG:261 = 1
      }
    }
  }

  // レズプレイ CFLAG:262
  if (game.train.初吻与自我口上 === 2) {
    if (era0(`talent:${target}:9`) === 1) {
      // 崩坏してしまった場合
      await era.printAndWait(
        `「啊啊…哇，大人的胸部…哇，大人…人enenenenen——……」`,
      );
      await era.printAndWait(
        `${assi_name}和坏掉的${target_name}享受着这颓废的百合play………`,
      );
      kojo.百合PLAY = 6; // CFLAG:262 = 6
    } else if (
      era0(`talent:${target}:76`) &&
      (kojo.百合PLAY < 5 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「呵呵呵、女性之间也不错呢…嗯嗯…嗯啊…嗯啾…啾…嗯啾♪」`,
      );
      await era.printAndWait(
        `${target_name}和${assi_name}在床上，四肢和舌头缠绕在一起、互相刺激着敏感的地方。`,
      );
      await era.printAndWait(
        `「啊嗯…啊…啊啊！把我弄得更加乱七八糟的吧…啊嗯啊啊${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}诱惑着${assi_name}张开了双腿………`);
      kojo.百合PLAY = 5; // CFLAG:262 = 5
    } else if (
      era0(`talent:${target}:85`) &&
      (kojo.百合PLAY < 4 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「不行啊…我的身体是献给那个人的…啊…啊…嗯嗯！嗯啊、我明白…只要不插进来做真么都好…啊」`,
      );
      await era.printAndWait(
        `看到${target_name}坦率的接受了，${assi_name}一边下流的笑着，一边描绘着，搅拌着，挖动着${target_name}的敏感的部位。`,
      );
      await era.printAndWait(`「啊啊啊！突、突然这样！啊啊！嗯…啊嗯！」`);
      await era.printAndWait(
        `${assi_name}看着在自己身下挣扎的${target_name}，在嗜虐心和“从自己的主人手里抢走了女人”的背德的快感的刺激下，继续进行着百合ply………`,
      );
      kojo.百合PLAY = 4; // CFLAG:262 = 4
    } else if (
      era0(`abl:${target}:33`) >= 3 &&
      (kojo.百合PLAY < 3 || game.kojo.口上开关 === 2)
    ) {
      // 百合中毒Lv3以上
      await era.printAndWait(`「嗯啊…嗯…嗯…嗯…继续接吻…啊啊…嗯啾嗯啾…嗯啾…♪」`);
      await era.printAndWait(
        `${target_name}和${assi_name}一边激烈的激吻，一边大腿摩擦在一起、互相提高着快感。`,
      );
      await era.printAndWait(`「啊啊…好舒服…我已经…不能自拔了…啊啊♪」`);
      await era.printAndWait(
        `「把我变得更乱七八糟的…啊嗯…啊啊啊…要融化了…要融化了♪」`,
      );
      kojo.百合PLAY = 3; // CFLAG:262 = 3
    } else if (
      era0(`abl:${target}:22`) >= 3 &&
      (kojo.百合PLAY < 2 || game.kojo.口上开关 === 2)
    ) {
      // 百合气质Lv3以上
      await era.printAndWait(`「啊啊…嗯…哪里…继续摸哪里…啊！…嗯啊…」`);
      await era.printAndWait(
        `${target_name}被${assi_name}玩弄着身体，敏感的反映着。`,
      );
      await era.printAndWait(`「啊啊…这样好像也不错…啊嗯…嗯啊嗯啊啊！」`);
      kojo.百合PLAY = 2; // CFLAG:262 = 2
    } else if (kojo.百合PLAY < 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(
        `「停…停下…嗯…做这种事我也不会有感觉…啊…啊啊嗯！」`,
      );
      await era.printAndWait(
        `看到一边逞强一边发出喘息声的${target_name}，${assi_name}哧哧地笑继续玩弄着她………`,
      );
      kojo.百合PLAY = 1; // CFLAG:262 = 1
    }
  }

  // 朝フェラ CFLAG:263
  if (game.train.初吻与自我口上 === 3) {
    if (era0(`talent:${target}:9`) === 1) {
      // 崩坏してしまった場合
      await era.printAndWait(`「啊…嗯…啾啾…嗯啾…啊啊…好大…好大啊………」`);
      await era.printAndWait(`${target_name}带着呆滞的表情，继续舔着阴茎………`);
    } else if (
      era0(`talent:${target}:76`) === 1 &&
      (kojo.朝口交 < 3 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「从早上开始就能独占你的阴茎什么的，最棒了…呵呵呵、有从大家哪里偷偷溜出来的价值呢…嗯嗯…啾…嗯啾…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}的脸上粘着${player_name}的精液，就那样继续舔着阴茎。`,
      );
      await era.printAndWait(`「嗯…嗯啾啾嗯啾啾啾…啾…啾…嗯…嗯…${heart(1)}」`);
      await era.printAndWait(
        `「嗯…嗯啊…让你变得更舒服吧…啾…啾啾嗯啾${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}和带着无比幸福的表情继续吮吸着${player_name}的阴茎………`,
      );
      kojo.朝口交 = 3; // CFLAG:263 = 3
    } else if (
      era0(`talent:${target}:85`) &&
      (kojo.朝口交 < 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「啊啊…早上好…嗯啾…啾…嗯嗯${heart(1)} 我收下主君的晨勃是理所当然的吧？」`,
      );
      await era.printAndWait(
        `${target_name}把脸颊上的精液用手指擦进嘴里，轻轻的一笑。`,
      );
      await era.printAndWait(
        `「呵呵呵、你的还很精神呢、就这样让我全都让我独占…下来吧、我会负起责任收下的…啊嗯嗯——${heart(1)}」`,
      );
      await era.printAndWait(
        `「嗯啊…啊啊…你的真的好棒…嗯啾啾啾…嗯…嗯啾…啾…啾${heart(1)}」`,
      );
      kojo.朝口交 = 3; // CFLAG:263 = 3
    } else if (
      era0(`abl:${target}:16`) >= 5 &&
      (kojo.朝口交 < 2 || game.kojo.口上开关 === 2)
    ) {
      // 侍奉精神Lv5以上
      await era.printAndWait(
        `「听说今早你还积攒着呢、我来帮你全都发泄出来吧…嗯啾…啾」`,
      );
      await era.printAndWait(
        `${target_name}舔舐吮吸着${player_name}刚刚射精的阴茎，让它勃起了。`,
      );
      await era.printAndWait(
        `「还有存货吧？来吧…继续在我嘴里射出来吧…嗯…啊嗯…♪」`,
      );
      kojo.朝口交 = 2; // CFLAG:263 = 2
    } else if (kojo.朝口交 < 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(
        `「嗯啊…总觉得今天早上想要你的呢…所以就稍微偷吃了一下…」`,
      );
      await era.printAndWait(
        `「会好好的全都清理干净的你别在意…嗯…啾…嗯啾…嗯…嗯………」`,
      );
      await era.printAndWait(
        `这么说着的${target_name}的脸上从脸颊到耳朵全都通红通红的………`,
      );
      kojo.朝口交 = 1; // CFLAG:263 = 1
    }
  }

  // 調教後セックス CFLAG:264
  if (game.train.初吻与自我口上 === 4) {
    if (
      era0(`abl:${target}:2`) >= 4 &&
      (kojo.调教后性交 < 2 || game.kojo.口上开关 === 2)
    ) {
      // V感覚Lv4以上
      await era.printAndWait(
        `${master_name}押着${target_name}分开的双腿，从上面用阴茎贯穿着蜜壶。`,
      );
      await era.printAndWait(
        `「啊嗯…嗯…啊啊啊…继续侵犯我…小穴，小穴好舒服${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}因为和平时的调教不同、只为了寻求快乐的性交而兴奋着。`,
      );
      await era.printAndWait(
        `舌头互相纠缠着，口水让嘴里黏糊糊的、互相舔下调教中流出的汗水。`,
      );
      if ((s || 0) >= 3) {
        await era.printAndWait(
          `${target_name}的蜜壶已经被中出了${s}回，泛起泡沫了。`,
        );
      }
      await era.printAndWait(
        `「继续…抱我…啊啊！不要离开${heart(1)} 不要离开${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}发出高亢的声音不停的绝顶着………`);
      kojo.调教后性交 = 2; // CFLAG:264 = 2
    } else if (kojo.调教后性交 < 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(`「我还想被你…抱着…啊啊啊！啊嗯…嗯啊…啊好深！」`);
      await era.printAndWait(
        `${master_name}从上面压住${target_name}不停的挖着阴道深处。${target_name}也因此漏出了喘息的呻吟。`,
      );
      await era.printAndWait(`「嗯啊…嗯哪里，就是哪里…嗯…啊嗯…啊啊———！」`);
      await era.printAndWait(`「啊啊…继续…继续侵犯我…嗯啊…啊啊啊啊………」`);
      await era.printAndWait(
        `${s || 0}回分的精液从${target_name}的股间流了下来………`,
      );
      kojo.调教后性交 = 1; // CFLAG:264 = 1
    }
  }

  // 夜這い CFLAG:265
  if (game.train.初吻与自我口上 === 5) {
    if (kojo.夜袭 < 1 || game.kojo.口上开关 === 2) {
      if (
        era0(`talent:${target}:9`) === 1 &&
        (kojo.夜袭 < 2 || game.kojo.口上开关 === 2)
      ) {
        // 崩坏してしまった場合
        await era.printAndWait(`「啊…啊…啊啊…想变成小穴…小穴………」`);
        await era.printAndWait(
          `坏掉的${target_name}为了被自己的主人抱着而来到了${master_name}的房间………`,
        );
        kojo.夜袭 = 2; // CFLAG:265 = 2
      } else {
        await era.printAndWait(
          `「呵呵呵、想被你抱，所以脚擅自走过来了。呐…可以吧？」`,
        );
        await era.printAndWait(
          `${target_name}斜眼看着${master_name}的方向，用手关上了身后的门。`,
        );
        await era.printAndWait(
          `「你也是，不二十四小时一直都抱着女人不行吧？那今夜就由我来………」`,
        );
        await era.printAndWait(
          `${target_name}一边舔着嘴唇一边钻上了${master_name}的床。`,
        );
        await era.printAndWait(
          `「啊啊…你的气味好厉害…我已经忍耐不了了…啊啊…${heart(1)}」`,
        );
        kojo.夜袭 = 1; // CFLAG:265 = 1
      }
    }
  }

  // 売却
  if (game.train.初吻与自我口上 === 6) {
    if (era0(`talent:${target}:9`) === 1) {
      await era.printAndWait(
        `「坐这个哇车（马车）的话、就能见到哇大人吗？嘿嘿、那就坐上去吧」`,
      );
      await era.printAndWait(`就这样，坏道的${target_name}被卖掉了………`);
    } else if (era0(`talent:${target}:85`) && era0(`mark:${target}:3`) < 3) {
      // 爱慕+反抗刻印Lv3未満
      await era.printAndWait(`「这样啊、我被你甩了呢…真遗憾…」`);
      await era.printAndWait(
        `${target_name}带着作为防止从绳子里出来而特别定做的项圈和手枷足枷。接下来就只剩下装进马车卖掉了。`,
      );
      await era.printAndWait(
        `「“如果是你希望这样的话那也没办法”…什么的真讨厌啊！　我不想离开你，不想离开你啊！」`,
      );
      await era.printAndWait(
        `${target_name}转动身体，给手枷和足枷施加一定以上的力量的话，项圈就会发出电击。`,
      );
      await era.printAndWait(
        `「啊！………啊啊…连这种东西都给我戴上了…真的…不需要…我了啊………呜…呜呜呜…」`,
      );
      await era.printAndWait(
        `${master_name}冷冷的看着${target_name}流下眼泪、把${target_name}交给了奴隶商人………`,
      );
    } else if (era0(`mark:${target}:3`) === 3) {
      // 反抗刻印Lv3
      await era.printAndWait(`「下次见面就是你的死期、记住吧」`);
      await era.printAndWait(
        `${target_name}一边瞪着${master_name}一边说出了威严的话`,
      );
      await era.printAndWait(
        `知道等待她的是什么样的结局的${master_name}只能苦笑………`,
      );
    } else if (era0(`talent:${target}:76`)) {
      // 淫乱
      await era.printAndWait(`「、不要啊…我不要从你的阴茎哪里离开啊………」`);
      await era.printAndWait(
        `作为完全被调教了的淫乱奴隶的${target_name}不情愿的摇着头，抱住了${master_name}。`,
      );
      await era.printAndWait(
        `「被卖到的地方就算会被轮奸多少次，我也感觉不会遇到比你更好的阴茎了…啊啊…不要离开！」`,
      );
      await era.printAndWait(
        `被奴隶商人用绳子挂起来的${target_name}就这样被装上了马车………`,
      );
    } else {
      // それ以外
      await era.printAndWait(`「我的结局就是这样什么的…骗…骗人吧………」`);
      await era.printAndWait(
        `${target_name}的手脚被戴上镣铐、就那样保持着因冲击而发呆的表情。`,
      );
      await era.printAndWait(`然后被奴隶商人一推后背，就那样被装到了马车上………`);
    }
    if (era0(`talent:${target}:122`) !== 1) {
      await sell_maturo_k0(target, { rand }); // CALL SELL_MATURO_K0
    }
  }

  // 妊娠発覚 CFLAG:271
  // CFLAG:102→誰によって妊娠させられたか（マスター=1,助手=2,奴隷=3,客=4,犬=5,モンスター・触手=6,狂王=7）
  if (game.train.初吻与自我口上 === 11) {
    if (kojo.妊娠发觉 === 0) {
      // 崩坏してしまった場合
      if (era0(`talent:${target}:9`) === 1) {
        await era.printAndWait(
          `「我的肚子里…有…什么东西？不要…不想怀上怪物的孩子…不要啊啊啊啊啊啊啊啊啊啊」`,
        );
        await era.printAndWait(
          `${target_name}好像因为无法承受妊娠的事实而完全坏掉了的样子………`,
        );
      } else if (
        era0(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 === 1
      ) {
        // 父親が主人で母親が爱持ち
        await era.printAndWait(
          `「呐、今天有令人高兴的报告…看起来我好像有你的孩子了、我绝对要生下来呢………${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}得意洋洋的吧妊娠的消息报告给了${master_name}………`,
        );
      } else if (chara(target).event.妊娠相手 === 2) {
        // 父親が助手（CSTR:2：妊娠事件侧未实现，读不到）
        await era.printAndWait(
          `「那个、稍微有点事情要报告。看样子我怀上了和${cstr2}之间的孩子了」`,
        );
        await era.printAndWait(
          `${target_name}一边抚摸着肚子一边把妊娠的消息报告给了${master_name}。`,
        );
        await era.printAndWait(`「也会有这种事、吓了我一跳呢」`);
      } else if (chara(target).event.妊娠相手 === 3) {
        // 父親が奴隷
        await era.printAndWait(
          `「那个、稍微有点事情要报告。样子我怀上了和${cstr2}之间的孩子了」`,
        );
        await era.printAndWait(
          `${target_name}一边抚摸着肚子一边把妊娠的消息报告给了${master_name}。`,
        );
        await era.printAndWait(`「也会有这种事、吓了我一跳呢」`);
      } else if (
        chara(target).event.妊娠相手 === 5 &&
        era0(`talent:${target}:136`) &&
        chara(target).invasion.状态 !== 9
      ) {
        // 父親が野良犬で牝犬持ち、NTR時以外（CFLAG:1 == 9 → 被狂王掳走）
        await era.printAndWait(
          `「呵呵呵、看样子我被授予了野狗大人的孩子…啊啊…我的身体也好心里也好，都已经变成牝犬了呢………」`,
        );
        await era.printAndWait(`${target_name}带着出神的表情抚摸着腹部………`);
      } else if (chara(target).event.妊娠相手 === 7) {
        // 父親が狂王
        await era.printAndWait(`「怎么这样…我怀上狂王大人的孩子…啊啊…」`);
      } else {
        // その他
        await era.printAndWait(`「没想到我就这样妊娠了呢………」`);
      }
      kojo.妊娠发觉 = 1; // CFLAG:271 = 1
    } else {
      // （与上支内容重复——第二次通知未改文案）
      if (era0(`talent:${target}:9`) === 1) {
        await era.printAndWait(
          `「我的肚子里…有…什么东西？不要…不想怀上怪物的孩子…不要啊啊啊啊啊啊啊啊啊啊」`,
        );
        await era.printAndWait(
          `${target_name}好像因为无法承受妊娠的事实而完全坏掉了的样子………`,
        );
      } else if (
        era0(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 === 1
      ) {
        // 父親が主人で母親が爱持ち
        await era.printAndWait(
          `「呐、今天有令人高兴的报告…看起来我好像有你的孩子了、我绝对要生下来呢………${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}得意洋洋的吧妊娠的消息报告给了${master_name}………`,
        );
      } else if (chara(target).event.妊娠相手 === 2) {
        // 父親が助手
        await era.printAndWait(
          `「那个、稍微有点事情要报告。看样子我怀上了和${cstr2}之间的孩子了」`,
        );
        await era.printAndWait(
          `${target_name}一边抚摸着肚子一边把妊娠的消息报告给了${master_name}。`,
        );
        await era.printAndWait(`「也会有这种事、吓了我一跳呢」`);
      } else if (chara(target).event.妊娠相手 === 3) {
        // 父親が奴隷
        await era.printAndWait(
          `「那个、稍微有点事情要报告。样子我怀上了和${cstr2}之间的孩子了」`,
        );
        await era.printAndWait(
          `${target_name}一边抚摸着肚子一边把妊娠的消息报告给了${master_name}。`,
        );
        await era.printAndWait(`「也会有这种事、吓了我一跳呢」`);
      } else if (
        chara(target).event.妊娠相手 === 5 &&
        era0(`talent:${target}:136`) &&
        chara(target).invasion.状态 !== 9
      ) {
        // 父親が野良犬で牝犬持ち、NTR時以外
        await era.printAndWait(
          `「呵呵呵、看样子我被授予了野狗大人的孩子…啊啊…我的身体也好心里也好，都已经变成牝犬了呢………」`,
        );
        await era.printAndWait(`${target_name}带着出神的表情抚摸着腹部………`);
      } else if (chara(target).event.妊娠相手 === 7) {
        // 父親が狂王
        await era.printAndWait(`「怎么这样…我怀上狂王大人的孩子…啊啊…」`);
      } else {
        // その他
        await era.printAndWait(`「没想到我就这样妊娠了呢………」`);
      }
      kojo.妊娠发觉 = 1; // CFLAG:271 = 1
    }
  }

  // 出産 CFLAG:272（CFLAG:102 语义同上）
  if (game.train.初吻与自我口上 === 12) {
    if (kojo.生产 === 0) {
      // 崩坏している場合
      if (era0(`talent:${target}:9`) === 1) {
        await era.printAndWait(
          `「啊啊…啊…我的肚子里…有什么出来了…啊啊啊啊啊啊啊啊」`,
        );
        await era.printAndWait(`已经崩坏的${target_name}嘿嘿嘿的继续笑着………`);
      } else if (
        era0(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 === 1
      ) {
        // 父親が主人で母親が爱持ち
        await era.printAndWait(
          `「啊嗯…是你的孩子哦…你看，看起来和你一模一样…啊啊、我还想和你生孩子呢…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}抱起了孩子，看起来很高兴的笑着………`,
        );
      } else {
        // その他
        await era.printAndWait(
          `「总觉得很不可思议…就算是这种孩子也舍不得扔掉呢」`,
        );
        await era.printAndWait(`${target_name}抱起了孩子，开始哄着他………`);
      }
      kojo.生产 = 1; // CFLAG:272 = 1
    } else {
      // （与上支内容基本重复）
      if (era0(`talent:${target}:9`) === 1) {
        await era.printAndWait(
          `「啊啊…啊…我的肚子里…有什么出来了…啊啊啊啊啊啊啊啊」`,
        );
        await era.printAndWait(`已经崩坏的${target_name}嘿嘿嘿的继续笑着………`);
      } else if (
        era0(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 === 1
      ) {
        // 父親が主人で母親が爱持ち
        await era.printAndWait(
          `「啊嗯…是你的孩子哦…你看，看起来和你一模一样…啊啊、我还想和你生孩子呢…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}抱起了孩子，看起来很高兴的笑着………`,
        );
      } else {
        // その他
        await era.printAndWait(
          `「总觉得很不可思议…就算是这样也舍不得扔掉这个孩子呢」`,
        );
        await era.printAndWait(`${target_name}抱起了孩子，开始哄着他………`);
      }
      kojo.生产 = 1; // CFLAG:272 = 1
    }
  }

  // 育児室 CFLAG:273
  if (game.train.初吻与自我口上 === 13) {
    if (era0(`talent:${target}:85`) || era0(`talent:${target}:76`)) {
      // 陥落済
      if (era0(`talent:${target}:153`)) {
        // 妊娠中
        await era.printAndWait(
          `「呵呵呵、马上就要生下来了、到底是个怎么样的孩子呢，真期待啊♪」`,
        );
        await era.printAndWait(
          `${target_name}抚摸着因为临月而膨胀起来的肚子………`,
        );
      } else if (era0(`talent:${target}:154`)) {
        // 育儿中
        await era.printAndWait(
          `「呀、来见我的孩子吗？　喂、难得魔王大人来，不要乱动哦」`,
        );
        await era.printAndWait(`${target_name}哄着孩子………`);
      }
    }
    kojo.育儿室 = 1; // CFLAG:273 = 1
  }

  // 親離れ時 CFLAG:274
  if (game.train.初吻与自我口上 === 14) {
    if (era0(`talent:${target}:85`) || era0(`talent:${target}:76`)) {
      // 陥落済
      await era.printAndWait(
        `「因为是我的孩子、不管去哪里、一定、一定没事的」`,
      );
    }
    kojo.亲离 = 1; // CFLAG:274 = 1
  }

  // 死亡（两支台词均为空——模板未填写）
  if (game.train.初吻与自我口上 === 999) {
    if (era0(`talent:${target}:85`)) {
      // 爱慕
      await era.printAndWait(``);
    } else {
      // それ以外
      await era.printAndWait(``);
    }
  }

  // 寿命による消滅（两支台词均为空，同上）
  if (game.train.初吻与自我口上 === 998) {
    if (era0(`talent:${target}:85`)) {
      // 爱慕
      await era.printAndWait(``);
    } else {
      // それ以外
      await era.printAndWait(``);
    }
  }

  // フラグ初期化
  game.train.初吻与自我口上 = 0; // TFLAG:13 = 0

  return 0;
}

// 注册进分发族（TRYCALLFORM SELF_KOJO_K8 的等价物）
self_kojo_family.register(8, self_kojo_k8);

/**
 * dungeon_ryouzyoku_k8：迷宫凌辱前的一言。
 * 处女（TALENT:0）与非处女只差中间一行心声，其余两行相同。
 */
async function dungeon_ryouzyoku_k8() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%

  if (era0(`talent:${target}:0`) == 1) {
    // 处女
    await era.printAndWait(`「咕…是我输了…你想怎么样就怎么样吧………」`);
    await era.printAndWait(
      `（找个破绽…想办法逃出去…！处女被夺走这种事怎么说都行…！）`,
    );
    await era.printAndWait(`虽然输了，但是${target_name}的眼神还没有放弃………`);
  } else {
    // 非处女
    await era.printAndWait(`「咕…是我输了…你想怎么样就怎么样吧………」`);
    await era.printAndWait(`（找个破绽…想办法逃出去…！）`);
    await era.printAndWait(`虽然输了，但是${target_name}的眼神还没有放弃………`);
  }

  return 0;
}

/**
 * dungeon_ryouzyoku_after_k8：迷宫凌辱后的一言。
 * 处女支只按 EXP:1 / EXP:22 / EXP:20 三档追加；非处女支多一档 EXP:0（膣），
 * 且 EXP:20 档多出一行孤立的开引号（缺陷，已删除）。
 */
async function dungeon_ryouzyoku_after_k8() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%

  if (era0(`talent:${target}:0`) == 1) {
    // 处女
    await era.printAndWait(`（啊啊…明明还是处女呢…）`);
    await era.printAndWait(`「已经…完了…吧…」`);

    // アナルを弄られすぎた感想
    if (era0(`exp:${target}:1`) > 20) {
      await era.printAndWait(
        `${target_name}的肛门里，不只是粘液还是精液的东西溢了出来。`,
      );
      await era.printAndWait(`「啊啊…屁股…已经什么都感觉不到了…嗯…嗯咕………」`);
    }

    // フェラしすぎた感想
    if (era0(`exp:${target}:22`) > 20) {
      await era.printAndWait(
        `毫无休息的口交的${target_name}的脸上沾满了粘液和精液。`,
      );
      await era.printAndWait(
        `「咳咳咳…呜啊…我、我已经不想再喝精液了…饶了我吧………」`,
      );
    }

    // 精液の味
    if (era0(`exp:${target}:20`) > 20) {
      await era.printAndWait(
        `「啊、嗯、嗯、你们的精液又浓又臭…啊啊…比人类的男性的更好吃…嗯嗯嗯………」`,
      );
      await era.printAndWait(`${target_name}被强迫说着关于精液味道的感想………`);
    }
  } else {
    // 非处女
    await era.printAndWait(`「啊啊…被弄得乱七八糟了…啊、啊啊啊啊………」`);

    // 膣を苛められすぎた感想
    if (era0(`exp:${target}:0`) > 20) {
      await era.printAndWait(`「我的小穴里咕噜咕噜的…啊…啊啊………」`);
      await era.printAndWait(
        `${target_name}已经合不上的蜜裂里，不知识粘液还是精液的东西大量的溢了出来。`,
      );
    }

    // アナルを弄られすぎた感想
    if (era0(`exp:${target}:1`) > 20) {
      await era.printAndWait(
        `${target_name}的肛门里，不只是粘液还是精液的东西溢了出来。`,
      );
      await era.printAndWait(`「啊啊…屁股…已经什么都感觉不到了…嗯…嗯咕………」`);
    }

    // フェラしすぎた感想
    if (era0(`exp:${target}:22`) > 20) {
      await era.printAndWait(
        `毫无休息的口交的${target_name}的脸上沾满了粘液和精液。`,
      );
      await era.printAndWait(
        `「咳咳咳…呜啊…我、我已经不想再喝精液了…饶了我吧………」`,
      );
    }

    // 精液の味
    if (era0(`exp:${target}:20`) > 20) {
      await era.printAndWait(
        `「啊、嗯、嗯、你们的精液又浓又臭…啊啊…比人类的男性的更好吃…嗯嗯嗯………」`,
      );
      await era.printAndWait(`${target_name}被强迫说着关于精液味道的感想………`);
    }
  }

  return 0;
}

/**
 * dungeon_victory_k8：战斗胜利口上。
 * 决め台詞三选一（RAND:3 / RAND:2 / 其余），再按 BASE:A:0 或 BASE:A:1
 * 对 MAXBASE 不足半成判「险胜」。A 即 TARGET（dungeon_victory_family 前置）。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源
 */
async function dungeon_victory_k8(rand) {
  const target = era_flag.target;
  const a = era_flag.target; // A：dungeon_victory_family 分派前置 TARGET = A
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));

  // 決め台詞
  if (rand_n(3) == 0) {
    await era.printAndWait(`「哼、没有会输的要素、这是理所当然的结果」`);
  } else if (rand_n(2) == 0) {
    await era.printAndWait(`「弱的我都要打出哈欠来了」`);
  } else {
    await era.printAndWait(`「又砍了无聊的东西」`);
  }

  if (
    (era0(`base:${a}:0`) * 100) / era0(`maxbase:${a}:0`) < 50 ||
    (era0(`base:${a}:1`) * 100) / era0(`maxbase:${a}:1`) < 50
  ) {
    // ピンチかも
    await era.printAndWait(`（稍微有些得意忘形了吧…不快点休息一下的话…）`);
    await era.printAndWait(`${target_name}气喘吁吁的………`);
  } else {
    // 余裕余裕
    await era.printAndWait(`「那么、今天不如再前进一点吧」`);
    await era.printAndWait(`${target_name}蹦蹦跳跳的向迷宫深处迈开了步子………`);
  }

  return 0;
}

/**
 * dungeon_attack_k8：战斗攻击口上。
 * CFLAG:1 == 2（侵攻中）与其余（迎击中）各三选一。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源
 */
async function dungeon_attack_k8(rand) {
  const target = era_flag.target;
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));

  // 侵攻中
  if (chara(target).invasion.状态 == 2) {
    if (rand_n(3) == 0) {
      await era.printAndWait(`「到处都是空隙呢」`);
    } else if (rand_n(2) == 0) {
      await era.printAndWait(`「嘿、会心一击」`);
    } else {
      await era.printAndWait(`「就这样从后面…噗的插进去」`);
    }
  } else {
    // 迎撃中
    if (rand_n(3) == 0) {
      await era.printAndWait(`「呵呵呵、你也成为我们的同伴吧♪」`);
    } else if (rand_n(2) == 0) {
      await era.printAndWait(`「你是不可能赢我的，早点投降吧」`);
    } else {
      await era.printAndWait(`「早点认输，一起变得舒服起来吧………♪」`);
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
 * benki_koujo_k8：肉便器口上（角色即 A）。
 *
 * FLAG:62（肉便器行动）分六档：0 最下层居民凌辱 /
 * 1 レズ便器 / 2 獣姦 / 3 A+V プレイ / 4 V プレイ / 5 A プレイ。
 * 每档内按 TALENT:76 淫乱 → TALENT:85 爱慕 → ABL:16 侍奉精神 Lv5 以上 →
 * それ以外 四选一，条件序不变。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（本函数未消费，随族签名保留）
 */
async function benki_koujo_k8(rand) {
  void rand;
  const a = era_flag.target;
  const target_name = chara_callname(a); // %SAVESTR:TARGET%

  if (game.train.肉便器行动 == 0) {
    // 最下层居民凌辱
    if (era0(`talent:${a}:76`) == 1) {
      // 淫乱
      await era.printAndWait(
        `「请快点给我更多阴茎！啊…啊啊…啊嗯啊啊啊啊${heart(1)}」`,
      );
    } else if (era0(`talent:${a}:85`)) {
      // 爱慕
      await era.printAndWait(
        `「啊啊…我是魔王大人的…嗯…快、快停下…嗯…啊啊啊——！」`,
      );
    } else if (era0(`abl:${a}:16`) >= 5) {
      // 侍奉精神Lv5以上
      await era.printAndWait(`「请、请让我服侍大家的阴茎…嗯…嗯咕！？」`);
    } else {
      // それ以外
      await era.printAndWait(`「呀！不要碰我！好脏…啊啊！不、不要…啊啊——！」`);
    }
  } else if (game.train.肉便器行动 == 1) {
    // レズ便器
    if (era0(`talent:${a}:76`) == 1) {
      // 淫乱
      await era.printAndWait(
        `「请给我更多的尿吧…啊啊啊啊…我会全喝下粗（去）的…咕噜咕噜${heart(1)}」`,
      );
    } else if (era0(`talent:${a}:85`)) {
      // 爱慕
      await era.printAndWait(
        `「啊啊…被弄得这么脏的话、会再也见不到那个人了吧………」`,
      );
      await era.printAndWait(
        `面对${target_name}的叹息，周围的女魔族冷冷的笑着………`,
      );
    } else if (era0(`abl:${a}:16`) >= 5) {
      // 侍奉精神Lv5以上
      await era.printAndWait(
        `「我会好好奉仕的…啊嗯…再手下留情一点…嗯咕…嗯咕………」`,
      );
    } else {
      // それ以外
      await era.printAndWait(
        `「不要…我可没有被做这种事还高兴的诶兴趣…啊…嗯咕！」`,
      );
    }
  } else if (game.train.肉便器行动 == 2) {
    // 獣姦
    if (era0(`talent:${a}:76`) == 1) {
      // 淫乱
      await era.printAndWait(
        `「啊啊——！这个粗大的野兽已经好棒…啊——啊啊啊啊啊————${heart(1)}」`,
      );
    } else if (era0(`talent:${a}:85`)) {
      // 爱慕
      await era.printAndWait(
        `「呀啊！这样的话…要坏了要坏到了…我快坏掉了啊！啊啊啊——！」`,
      );
    } else if (era0(`abl:${a}:16`) >= 5) {
      // 侍奉精神Lv5以上
      await era.printAndWait(
        `「啊啊…别这么贪心啊…嗯…啊啊！我会老老实实的…啊…啊啊！呜、好粗！」`,
      );
    } else {
      // それ以外
      await era.printAndWait(
        `「不要…不要…竟然被野兽侵犯什么的…嗯咕！嗯！还、还射在里面…啊啊！还这么大！」`,
      );
    }
  } else if (game.train.肉便器行动 == 3) {
    // A+Vプレイ
    if (era0(`talent:${a}:76`) == 1) {
      // 淫乱
      await era.printAndWait(
        `「啊啊啊…我的小穴和肛门都舒服的快要融化了…继续侵犯我吧…${heart(1)}」`,
      );
    } else if (era0(`talent:${a}:85`)) {
      // 爱慕
      await era.printAndWait(
        `「啊啊——！坏掉了…要坏掉了…饶、饶了我吧…啊…啊啊——！」`,
      );
      await era.printAndWait(
        `周围的男性们看着悲鸣越来越大的${target_name}的身姿，阴茎挺得更高了………`,
      );
    } else if (era0(`abl:${a}:16`) >= 5) {
      // 侍奉精神Lv5以上
      await era.printAndWait(
        `「啊嗯…恩…啊啊…我没有2个小穴，所以请按照顺序来侵犯…啊…啊嗯啊」`,
      );
    } else {
      // それ以外
      await era.printAndWait(
        `「啊…啊…啊啊啊啊…我的下半身…已经什么都感觉不到了…啊…不、不行再继续的话…啊啊啊啊——！」`,
      );
    }
  } else if (game.train.肉便器行动 == 4) {
    // Vプレイ
    if (era0(`talent:${a}:76`) == 1) {
      // 淫乱
      await era.printAndWait(
        `「啊嗯…啊嗯啊${heart(1)} 继续侵犯我的小穴…满满的射出精液吧…${heart(1)}」`,
      );
    } else if (era0(`talent:${a}:85`)) {
      // 爱慕
      await era.printAndWait(
        `「不、不行啊…只有中出…啊、呀！在里面…满满的…射出来了…啊啊…我明明…嗯咕！」`,
      );
    } else if (era0(`abl:${a}:16`) >= 5) {
      // 侍奉精神Lv5以上
      await era.printAndWait(
        `「啊啊嗯！啊啊…好好的在我里面射出来…变得舒服…啊…嗯、嗯啊！」`,
      );
    } else {
      // それ以外
      await era.printAndWait(`「不要…不要…啊啊——！不要射在里面…啊啊啊——！」`);
    }
  } else if (game.train.肉便器行动 == 5) {
    // Aプレイ
    if (era0(`talent:${a}:76`) == 1) {
      // 淫乱
      await era.printAndWait(
        `「嗯…谢谢你在我的肛门里慢慢的射了出来…啊、啊啊…阴、阴茎又来了${heart(1)}」`,
      );
    } else if (era0(`talent:${a}:85`)) {
      // 爱慕
      await era.printAndWait(
        `「嗯、嗯…呀…我的屁股…已经不行了…啊啊…不、不要啊………」`,
      );
    } else if (era0(`abl:${a}:16`) >= 5) {
      // 侍奉精神Lv5以上
      await era.printAndWait(`「嗯…呀…我是最喜欢肛门的变态便器…啊啊啊…」`);
    } else {
      // それ以外
      await era.printAndWait(
        `「啊啊啊——…要坏掉了…我的屁股要坏掉了…啊啊啊啊………」`,
      );
    }
  }

  return 0;
}

// 注册进肉便器口上族（TRYCALLFORM BENKI_KOUJO_K8 的等价物）
benki_koujo_family.register(8, benki_koujo_k8);

/**
 * colosseum_kojo_8：死斗场专用口上（头部检查 TEQUIP:55 岔入）。
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
    // 放置PLAY
    if (era0(`base:${target}:1`) <= 0) {
      await era.printAndWait(`${target_name}连站起来的力气都没有了……`); // 气力０以下
    } else {
      await era.printAndWait(
        `${target_name}在死斗场的灼热的气氛下看着接下来的对手直发抖……`,
      );
    }
    return 0;
  }

  if (era_flag.selectcom == 56) {
    // 交谈
    if (era0(`base:${target}:1`) <= 0) {
      // 气力０以下
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「咕…输给你了………」`);
        await era.printAndWait(`${target_name}丢下武器跪了下来……`);
      } else {
        await era.printAndWait(`「快、快住手…别靠近我………」`);
        await era.printAndWait(`${target_name}丢下武器跪了下来……`);
      }
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(
          `「我知道我不会输给你的…即使被加上多么不利的条件也是」`,
        );
        await era.printAndWait(
          `${target_name}架起武器，和${assi_name}相对着………`,
        );
      } else {
        await era.printAndWait(`「如果力量能恢复的话…咕」`);
        await era.printAndWait(
          `${target_name}一边就这样力量被封印着战斗着一边心急的想着……`,
        );
      }
    }
    return 0;
  }

  if (era_flag.selectcom == 31) {
    // 口交
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(
        `「啊嗯…恩咕…咕…会好好舔的所以不要用暴力…嗯嗯嗯！」`,
      );
      // 同一行输出：无后缀 PRINTFORM + 两条 SIF 的 PRINT
      // + 收行的 PRINTFORMW（#622）。SIF 条件提到语句外当条件、文本留在输出语句里
      const assi_has_penis =
        era0(`talent:${assi}:121`) == 1 || era0(`talent:${assi}:122`) == 1;
      const assi_has_strap =
        era0(`talent:${assi}:121`) != 1 &&
        era0(`talent:${assi}:122`) != 1 &&
        era0('item:4') == 1; // ITEM:PBAND 是内建非角色变量（4 号 = 假阳具），不再改写（#552）
      await era.printAndWait(
        `${assi_name}因为` +
          (assi_has_penis ? `阴茎` : '') +
          (assi_has_strap ? `假阴茎` : '') +
          `被${target_name}舔着而露出了心旷神怡的表情……`,
      );
    } else {
      await era.printAndWait(`「嗯咕…好、好脏…啊啊啊…啾…啾…嗯啾………」`);
      await era.printAndWait(`${target_name}舔着那带有令人作呕的气味的阴茎……`);
    }
    return 0;
  }

  if (era_flag.selectcom == 5) {
    // 胸爱撫
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(
        `「嗯啊…啊啊拜托你了…因为我是后辈温柔点吧…啊…嗯嗯！」`,
      );
      await era.printAndWait(`${target_name}就这样任由${assi_name}摆弄胸部。`);
      await era.printAndWait(`然后${assi_name}为了让观众观赏而开始揉动胸部………`);
    } else {
      await era.printAndWait(`「啊、放开…放开那肮脏的手…啊…啊啊！」`);
      await era.printAndWait(
        `像是因为${target_name}高压的态度还不崩溃而生气了、怪物握住了${target_name}的胸部揉了起来。`,
      );
      await era.printAndWait(`「咕——————！好、好疼…快、快住手！」`);
    }
    return 0;
  }

  if (era_flag.selectcom == 21) {
    // 背后位
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(
        `「嗯…咕…你故意这么激烈…嗯…啊啊…好、好痛…再温柔一点…啊啊——！」`,
      );
      // 与上一段同型（#622）
      const assi_has_penis =
        era0(`talent:${assi}:121`) == 1 || era0(`talent:${assi}:122`) == 1;
      const assi_has_strap =
        era0(`talent:${assi}:121`) != 1 &&
        era0(`talent:${assi}:122`) != 1 &&
        era0('item:4') == 1; // ITEM:PBAND 是内建非角色变量（4 号 = 假阳具），不再改写（#552）
      await era.printAndWait(
        `${assi_name}一边听着${target_name}的悲鸣用` +
          (assi_has_penis ? `阴茎` : '') +
          (assi_has_strap ? `假阴茎` : '') +
          `毫不留情的蹂躏着${target_name}的腔内。`,
      );
      await era.printAndWait(`随着${target_name}发出悲鸣，观众沸腾了起来………`);
    } else if (game.train.死斗场敌种 == 206) {
      // 巨魔（TFLAG:400 死斗场敌种 == 206，走 game.train.死斗场敌种 门面）
      await era.printAndWait(
        `「啊啊啊啊！…要、要坏掉了…啊、啊啊…咕…咕啊啊啊啊！」`,
      );
      await era.printAndWait(
        `可怜的${target_name}一边发出癞蛤蟆被弄死一样的声音一边就那样任由巨魔摆布着。`,
      );
      await era.printAndWait(`观众一个个都站了起来，沸腾着………`);
    } else {
      await era.printAndWait(
        `「、不要啊…啊啊…呜…啊啊…啊啊——！嗯…啊啊啊啊啊！」`,
      );
      await era.printAndWait(
        `${target_name}因为被怪物从后面侵犯而继续发出着悲鸣。`,
      );
      await era.printAndWait(`观众一个个都站了起来，沸腾着………`);
    }
    return 0;
  }

  if (era_flag.selectcom == 27) {
    // 背后位アナル
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(
        `「求、求你…啊咕…饶了我吧…啊啊…嗯…牙啊啊啊啊啊！」`,
      );
      // 与上一段同型（#622）
      const assi_has_penis =
        era0(`talent:${assi}:121`) == 1 || era0(`talent:${assi}:122`) == 1;
      const assi_has_strap =
        era0(`talent:${assi}:121`) != 1 &&
        era0(`talent:${assi}:122`) != 1 &&
        era0('item:4') == 1; // ITEM:PBAND 是内建非角色变量（4 号 = 假阳具），不再改写（#552）
      await era.printAndWait(
        `${assi_name}一边听着${target_name}的悲鸣。一边用` +
          (assi_has_penis ? `阴茎` : '') +
          (assi_has_strap ? `假阴茎` : '') +
          `一般毫不留情的继续蹂躏着${target_name}的肛门。`,
      );
      await era.printAndWait(`随着${target_name}发出悲鸣，观众沸腾了起来………`);
    } else if (game.train.死斗场敌种 == 206) {
      // 巨魔
      await era.printAndWait(
        `「嗯…呜咕…呜…停、停下…要…要死了…咕啊…啊嘎啊啊啊啊！」`,
      );
      await era.printAndWait(
        `可怜的${target_name}一边发出癞蛤蟆被弄死一样的声音一边用肛门接受着巨魔巨大的阴茎。`,
      );
      await era.printAndWait(
        `肛门想要被完全破坏了似的扩张着、终于${target_name}开始口吐白沫了。`,
      );
      await era.printAndWait(`观众们看着${target_name}这样的身姿、沸腾着………`);
    } else {
      await era.printAndWait(
        `「肛门要裂开了…快、快停下啊…啊啊…啊…咕…呜呜呜呜呜呜！」`,
      );
      await era.printAndWait(
        `${target_name}因为被怪物从后面侵犯着肛门而不停悲鸣着。`,
      );
      await era.printAndWait(`观众一个个都站了起来，沸腾着………`);
    }
    return 0;
  }

  if (era_flag.selectcom == 51) {
    // 媚药史莱姆
    await era.printAndWait(`「啊啊…史莱姆么…嗯…连这种地方都进来了…啊啊！」`);
    return 0;
  }

  return 0;
}

/**
 * ntr_koujo_k8：NTR 口上。
 *
 * P（NTR 演出编号）按 #214 决议由调用方显式传入：1 处女丧失 / 2 处女
 * 肛门 PLAY / 3 獣姦秀 / 4 V PLAY / 5 VA 乱交 / 6 公众便女 / 7 狂王性欲
 * 处理 / 20 NTR 公开生产。各支末尾记一位 CFLAG:651-657（P == 20 无记位）。
 *
 * 多处 `PRINT 狂王的巨根` / `PRINT 特大号的按摩棒` 由 FLAG:500（狂王性别）
 * 二选一：0·2 扶她走巨根，其余走按摩棒。这些是 bare PRINT，
 * 不换行不等待，与接续的 PRINTFORMW 拼成一整句；按 #622 的
 * 做法合并成一条输出（二选一提成取值三元并进输出语句，用拼接基准）——
 * 本文件口塞段同样处理。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（本函数未消费，随族签名保留）
 * @param {number} [p_arg] P（NTR 演出编号，#214 决议：单字母全局改显式传参）
 */
async function ntr_koujo_k8(rand, p_arg = 0) {
  void rand;
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const kojo = chara(target).kojo;
  const p = p_arg;
  // FLAG:500 狂王性别：0·2 扶她（巨根）/ 其余（按摩棒）。六处二选一都夹在
  // 「无后缀 PRINTFORM … PRINT 收行」的同一条输出里，写成取值三元并进输出语句，
  // 用拼接基准列出整段（#622；此前逐处展开成 IF/ELSE 会让同一行被拆成三条输出）
  const futa = () => game.system.狂王性别 == 0 || game.system.狂王性别 == 2;
  const inran_or_aibo =
    era0(`talent:${target}:76`) || era0(`talent:${target}:85`);

  // NTRフラグ
  if (kojo.NTR再捕获 == 0) {
    kojo.NTR再捕获 = 1; // CFLAG:650 = 1
  }

  if (p == 1) {
    // 处女喪失
    if (inran_or_aibo) {
      // 陥落済
      await era.printAndWait(
        `「狂王…我不能把我的处女给你…咕…呜…不、不要…我已经找到了新的主君了…」`,
      );
      await era.printAndWait(
        `说着强气的台词的${target_name}被狂王捆住，束缚着自由、两只脚被大大的分开着。`,
      );
      // 同一行输出：IF/ELSE 的 PRINT（互斥两支）+ 收行的 PRINTFORMW（#622）
      await era.printAndWait(
        (futa() ? `然后、狂王的巨根` : `然后、特大号的按摩棒`) +
          `慢慢的插进了${target_name}的秘裂。在镜头下${target_name}还不知道男人的蜜壶被插进了深处。`,
      );
      await era.printAndWait(
        `从蜜裂留到屁股上的破瓜之血。在屈辱和疼痛下，即使是刚强的${target_name}也只能流下眼泪。`,
      );
      await era.printAndWait(`「对不起…对不起………」`);
    } else {
      // 与上一段同型（#622）
      await era.printAndWait(
        `还是处女的${target_name}的秘裂被` +
          (futa() ? `狂王的巨根` : `特大号的按摩棒`) +
          `深深的插了进去。破瓜之血从秘裂里流了出来。`,
      );
      await era.printAndWait(
        `「啊嗯…多疑的狂王大人这样也明白了吧？我没有背叛、还是纯洁的…啊…啊啊！」`,
      );
      await era.printAndWait(
        `狂王默默地笑着一边嘲弄${target_name}，一边动了起来。`,
      );
      await era.printAndWait(
        `「再、再继续的话…啊啊啊！快停下！啊、啊啊啊——！」`,
      );
    }
    kojo.NTR_651 = 1; // CFLAG:651 = 1
  } else if (p == 2) {
    // 处女アナルプレイ
    if (inran_or_aibo) {
      await era.printAndWait(
        `「呵呵呵、我才不会…嗯…啊嗯…因为这点程度就屈服…啊…啊啊！」`,
      );
      await era.printAndWait(
        `狂王从后边把${target_name}绑起来，从后面有条不紊的插进了肛门。`,
      );
      await era.printAndWait(
        `大概是好几次灌肠和扩张的原因，${target_name}通红的充着血的肛门缠了回去。`,
      );
      await era.printAndWait(`「啊…嗯、太大了…这、这个…啊啊…啊…啊啊啊——！」`);
      // 与上一段同型（#622）
      await era.printAndWait(
        (futa() ? `狂王的巨根` : `特大号的按摩棒`) +
          `在${target_name}的肛门里转动着、${target_name}露出了喘息的声音………`,
      );
    } else {
      await era.printAndWait(
        `「啊啊！对我…对我做这么过分的事什么的！狂王大人你疯了！？啊…不要啊！」`,
      );
      // 同上（#622）
      await era.printAndWait(
        (futa() ? `狂王的巨根` : `特大号的按摩棒`) +
          `在${target_name}的肛门里转动着、${target_name}露出了喘息的声音………`,
      );
    }
    kojo.NTR_652 = 1; // CFLAG:652 = 1
  } else if (p == 3) {
    // 獣姦ショー
    if (era0(`talent:${target}:136`)) {
      await era.printAndWait(
        `「啊啊——${heart(1)} 被野狗大人侵犯最棒了…啊嗯…啊…啊啊——${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}一边被周围的观众嘲笑着、一边沉浸在被狗侵犯的快感里………`,
      );
    } else if (inran_or_aibo) {
      await era.printAndWait(
        `「啊啊…嗯…咕…呜…啊啊…这么有感觉什么的…我…啊…不、不要看…不要看…啊啊嗯啊——！」`,
      );
      await era.printAndWait(
        `${target_name}被狗侵犯而有感觉的地方被观众看着、羞耻得满脸通红………`,
      );
    } else {
      await era.printAndWait(`「呜…呜咕…为什么我…会这样…啊…啊啊——！」`);
      await era.printAndWait(
        `${target_name}被狗侵犯而有感觉的地方被观众看着、羞耻得满脸通红………`,
      );
    }
    kojo.NTR_653 = 1; // CFLAG:653 = 1
  } else if (p == 4) {
    // Vプレイ
    if (inran_or_aibo) {
      await era.printAndWait(
        `「嗯…啊嗯…啊啊…狂王大人…继续侵犯我的…小穴…啊…嗯…嗯——！」`,
      );
      // 与上一段同型（#622）
      await era.printAndWait(
        (futa() ? `狂王的巨根` : `特大号的按摩棒`) +
          `不停的侵犯着${target_name}的蜜壶、${target_name}发出了野兽一样的喘息。`,
      );
      await era.printAndWait(
        `「啊啊…我要去了…要去了…啊啊…继续，继续插进来…啊啊…啊啊啊啊啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}一边从秘裂里流出了爱液，一边抱着狂王不停的亲吻着。`,
      );
      await era.printAndWait(
        `水晶球录下了好几个${target_name}被狂王抱着不停绝顶的画面………`,
      );
    } else {
      await era.printAndWait(
        `「啊啊…嗯…嗯啊…啊啊…再继续的话…我已经…嗯…啊啊——！」`,
      );
      // 同上（#622）
      await era.printAndWait(
        (futa() ? `狂王的巨根` : `特大号的按摩棒`) +
          `不停的侵犯着${target_name}的蜜壶、${target_name}发出了逞强的声音。`,
      );
      await era.printAndWait(`「啊…嗯…啊啊…狂王大人…啊啊嗯…恩…啊嗯…啊啊！」`);
      await era.printAndWait(
        `水晶球录下了好几个${target_name}被狂王抱着不停绝顶的画面`,
      );
    }
    kojo.NTR_654 = 1; // CFLAG:654 = 1
  } else if (p == 5) {
    // VA乱交プレイ
    if (inran_or_aibo) {
      await era.printAndWait(
        `「啊啊…我的小穴和肛门…都被侵犯了那么多次！嗯…啊嗯…再激烈点…啊啊啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `一边乱交一边淫乱的呻吟着的${target_name}的姿态已经一点都看不见当时害羞的追随在${player_name}身旁的影子了。`,
      );
      await era.printAndWait(
        `「啊嗯…嗯…啊啊…下一个是你呢…好啊…好好的抱我吧………${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「啊啊…好舒服啊…给我…给我更多阴茎！啊啊…嗯…好深…好棒♪」`,
      );
      // 一整行：无后缀 PRINTFORM + IF/ELSE 的 PRINT
      // （互斥两支，各支自带收尾，块后没有共同的收行语句）（#622 补查）。
      // 这一处只判 FLAG:500 == 0（与上文各处的 0 或 2 不同）
      await era.print(
        `${target_name}的蜜裂和肛门被` +
          (game.system.狂王性别 == 0
            ? `阴茎搅动着、精液不停的溢了出来………`
            : `假阳具搅动着、爱液不停的溢了出来………`),
      );
    }
    kojo.NTR_655 = 1; // CFLAG:655 = 1
  } else if (p == 6) {
    // 公衆便女
    if (inran_or_aibo) {
      await era.printAndWait(
        `「我被魔王抓住，调教，成为了他同伴、一直作为魔王的走狗行动着。而现在以“作为大家的便所来赎罪”这样的理由而活了下来」`,
      );
      await era.printAndWait(
        `${target_name}按照先前教给她的台词对眼前的男人们说着。`,
      );
      await era.printAndWait(
        `「我是便所、靠吃大家的同情…精液才被允许活下去的便所…啊啊快点快点侵犯我！」`,
      );
      await era.printAndWait(
        `${target_name}凭空动着腰诱惑着其他男人。看到这里的男人们一边嘲笑着${target_name}一边聚集了起来………`,
      );
    } else {
      await era.printAndWait(
        `「啊嗯…更多的使用作为便所的我把…现在免费使用小穴也可以…啊嗯啊嗯♪」`,
      );
      await era.printAndWait(
        `${target_name}凭空动着腰诱惑着其他男人。看到这里的男人们一边嘲笑着${target_name}一边聚集了起来………`,
      );
    }
    kojo.NTR_656 = 1; // CFLAG:656 = 1
  } else if (p == 7) {
    // 狂王性欲処理
    if (inran_or_aibo) {
      await era.printAndWait(
        `「对不起魔王”大人”、选你作为主君果然好像是哪里弄错了」`,
      );
      await era.printAndWait(
        `「因为我是…嗯…这么喜欢狂王大人啊…呵呵呵、就这么告别吧、再见魔王大人」`,
      );
      await era.printAndWait(
        `这么说着的${target_name}和狂王的舌头缠在一起接吻着。`,
      );
      await era.printAndWait(
        `「以后也会送我录得H的水晶球给你，你就用那个自慰吧…啊啊啊啊」`,
      );
    } else {
      await era.printAndWait(
        `「呵呵呵…在性的方面比起你来我和狂王大人的相性更好…这是这样奉仕了我才明白的呢」`,
      );
      await era.printAndWait(
        `「那就这样拜拜魔王大人、啊啊…狂王大人…继续疼爱我把…啊啊♪」`,
      );
      await era.printAndWait(
        `然后水晶球开始播放${target_name}奉仕狂王的影像………`,
      );
    }
    kojo.NTR_657 = 1; // CFLAG:657 = 1
  } else if (p == 20) {
    // NTR公開出産（本支不记位）
    if (inran_or_aibo) {
      // CFLAG:102 妊娠相手：1 = 主人
      if (chara(target).event.妊娠相手 == 1) {
        await era.printAndWait(`「啊啊…让我抱抱我的孩子…求你了…啊啊啊…」`);
        await era.printAndWait(
          `${target_name}生出来的${player_name}的孩子被观众们包围着。`,
        );
        await era.printAndWait(`被还回来的时候不可能还是正常的状态吧………`);
      } else {
        await era.printAndWait(
          `「啊嗯…恩…嗯…我的出产秀怎么样魔王大人、看得高兴吗？」`,
        );
        await era.printAndWait(
          `${target_name}一边隔着摄像机看着${player_name}一边说着。`,
        );
        await era.printAndWait(
          `「今后也会生下很多小宝宝的…敬请期待${heart(1)}」`,
        );
      }
    } else {
      await era.printAndWait(
        `「啊啊…做这种事的话…我不是已经回不了魔王大人哪里了吗…」`,
      );
      await era.printAndWait(`${target_name}被魔王耳语了几句后，说道。`);
      await era.printAndWait(
        `「嗯、嗯…我的子宫是狂王大人专用的育儿袋、今后预定不管几个都要生出来♪」`,
      );
    }
  }

  return 0;
}

// 注册进 NTR 口上族（TRYCALLFORM NTR_KOUJO_K8 的等价物）。族的实参是
// [rand, P]（K7/K9/K10 一致，见 test/kojo-k7-heart.test.js 的 call），
// 与本函数签名同形，直接注册即可——不要再包一层只收 P 的适配器，
// 那会把 rand 当成 P，整段永远静默
ntr_koujo_family.register(8, ntr_koujo_k8);

/**
 * exucution_koujo_k8：处刑口上。
 * TFLAG:16 分四档：4 肉便器刑 / 5 战斗员化 / 6 晒し台刑 / 7 消除记忆解放。
 * 第 7 档台词未填写，输出空行。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（本函数未消费，随族签名保留）
 */
async function exucution_koujo_k8(rand) {
  void rand;

  if (game.event.犬射精或处刑口上 == 4) {
    // 肉便器刑
    await era.printAndWait(
      `「怎么这样…我一生都要不停的给怪物生孩子什么的…啊…不要，放开我…啊啊啊啊啊啊啊！」`,
    );
  } else if (game.event.犬射精或处刑口上 == 5) {
    // 戦闘員化
    await era.printAndWait(`「什么都好…命令…为了…主人大人………」`);
  } else if (game.event.犬射精或处刑口上 == 6) {
    // 晒し台刑
    await era.printAndWait(`「啊…啊啊啊…做了这种事…绝对饶不了你………！」`);
  } else if (game.event.犬射精或处刑口上 == 7) {
    // 記憶を消して解放する（台词未填写）
    await era.printAndWait('');
  }

  return 0;
}

/**
 * museum_koujo_k8：博物馆（标本化）口上。
 * TFLAG:500 分十档，只有 0 石化与 1 剥制化有台词，其余八档（21 蜡人形 /
 * 3 人形 / 4 球体关节 / 5 金属 / 6 冰像 / 7 宝石 / 8 家具 / 9 绘画封印）
 * 模板未填台词，各出空行。蜡人形档的条件写作 21：博物馆事件的
 * TFLAG:500 只会落 0–9（蜡像为 2）或隐藏值 100，该分支实际不触发，
 * 保留占位。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（本函数未消费，随族签名保留）
 */
async function museum_koujo_k8(rand) {
  void rand;

  if (game.event.博物馆口上 == 0) {
    // 石化
    await era.printAndWait(
      `「啊啊…我、我的身体…变得越来越冷了…啊…啊啊…不要…不………要…………」`,
    );
  } else if (game.event.博物馆口上 == 1) {
    // 剥製化
    await era.printAndWait(`「死了之后还一直暴露着…呜…呜呜呜………」`);
  } else if (game.event.博物馆口上 == 21) {
    // 蝋人形化（模板未填台词；档值 21 实际不触发，见函数头）
    await era.printAndWait('');
  } else if (game.event.博物馆口上 == 3) {
    // 人形化(マネキン)
    await era.printAndWait('');
  } else if (game.event.博物馆口上 == 4) {
    // 人形化(球体間接)
    await era.printAndWait('');
  } else if (game.event.博物馆口上 == 5) {
    // 金属化
    await era.printAndWait('');
  } else if (game.event.博物馆口上 == 6) {
    // 氷像化
    await era.printAndWait('');
  } else if (game.event.博物馆口上 == 7) {
    // 宝石化
    await era.printAndWait('');
  } else if (game.event.博物馆口上 == 8) {
    // 家具化
    await era.printAndWait('');
  } else if (game.event.博物馆口上 == 9) {
    // 絵画封印
    await era.printAndWait('');
  }

  return 0;
}

/**
 * banishment_koujo_k8：流放口上（处刑内容不在口上侧）。
 * TFLAG:510 分五档，只有 0 追放有台词，其余四档未填写。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（本函数未消费，随族签名保留）
 */
async function banishment_koujo_k8(rand) {
  void rand;

  if (game.event.流放口上 == 0) {
    // 追放
    await era.printAndWait(`「这样就自由了…但是、失去力量的我的存在价值………」`);
  } else if (game.event.流放口上 == 1) {
    // 男体化（台词未填写）
    await era.printAndWait('');
  } else if (game.event.流放口上 == 2) {
    // 記憶消去
    await era.printAndWait('');
  } else if (game.event.流放口上 == 3) {
    // 小動物化
    await era.printAndWait('');
  } else if (game.event.流放口上 == 4) {
    // 元の生活に戻す
    await era.printAndWait('');
  }

  return 0;
}

/**
 * public_exucution_koujo_k8：公开处刑口上
 * （处刑内容不在口上侧）。TFLAG:520 分三档：0 凌辱处刑 /
 * 1 绞首刑 / 2 魂粉碎（台词未填写）。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（本函数未消费，随族签名保留）
 */
async function public_exucution_koujo_k8(rand) {
  void rand;

  if (game.event.公开处刑口上 == 0) {
    // 陵辱処刑
    await era.printAndWait(
      `「那个烙印是…啊…停、停下快停下…呀…啊…啊呀啊啊啊啊啊啊啊啊！」`,
    );
  } else if (game.event.公开处刑口上 == 1) {
    // 絞首刑
    await era.printAndWait(
      `「能不能至少给我套个皮革袋子、我不想漏出可怜的死相…呜…呜呜呜呜………」`,
    );
  } else if (game.event.公开处刑口上 == 2) {
    // 魂粉砕（模板未填台词，输出空行）
    await era.printAndWait('');
  }

  return 0;
}

/**
 * grotesque_koujo_k8：猎奇处刑口上（内容不在口上侧）。
 * TFLAG:530 分七档（0 四肢切断 / 1 内脏凌辱 / 2 断头台 / 3 火刑 / 4 食肉 /
 * 5 死灵化 / 6 丧尸化），七档台词全部未填写，只出空行。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（本函数未消费，随族签名保留）
 */
async function grotesque_koujo_k8(rand) {
  void rand;

  if (game.event.猎奇处刑口上 == 0) {
    // 四肢切断刑
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 == 1) {
    // 内臓陵辱刑
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 == 2) {
    // ギロチン刑
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 == 3) {
    // 火あぶりの刑
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 == 4) {
    // 食肉刑
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 == 5) {
    // 死霊化
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 == 6) {
    // ゾンビ化
    await era.printAndWait('');
  }

  return 0;
}

/**
 * enterenemy_koujo_k8：迷宫攻略开始时的口上（角色即 A）。
 * TALENT:76 淫乱 → TALENT:85 爱慕 → それ以外 三选一。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（本函数未消费，随族签名保留）
 */
async function enterenemy_koujo_k8(rand) {
  void rand;
  const a = era_flag.target;

  if (era0(`talent:${a}:76`) == 1) {
    // 淫乱
    await era.printAndWait(
      `「想看我被怪物轮奸什么的，魔王大人的趣味还真令人困扰啊${heart(1)}」`,
    );
  } else if (era0(`talent:${a}:85`) == 1) {
    // 爱慕
    await era.printAndWait(`「现在…就去见你魔王大人♪」`);
  } else {
    await era.printAndWait(`「还真是好久没有只身一人潜入迷宫了呢」`);
  }

  return 0;
}

// 注册进各自的分发族（TRYCALLFORM *_KOUJO_K8 的等价物）
exucution_koujo_family.register(8, exucution_koujo_k8);
museum_koujo_family.register(8, museum_koujo_k8);
banishment_koujo_family.register(8, banishment_koujo_k8);
public_exucution_koujo_family.register(8, public_exucution_koujo_k8);
grotesque_koujo_family.register(8, grotesque_koujo_k8);
enterenemy_koujo_family.register(8, enterenemy_koujo_k8);

/**
 * gohoubi_request_koujo_k8：迎击时的奖赏要求（角色即 A）。
 * CFLAG:504（要求奖赏）分十档：0 钱 / 1-3 兽奸（犬·猪·马）/ 4 吻 /
 * 5 性交 / 6 精液 / 7 乱交 / 8 小便 / 9 童贞狩。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（本函数未消费，随族签名保留）
 */
async function gohoubi_request_koujo_k8(rand) {
  void rand;
  const a = era_flag.target;
  const a_name = chara_callname(a); // %SAVESTR:A%
  const gohoubi = chara(a).stronghold.要求奖赏;

  if (gohoubi == 0) {
    // お金
    await era.printAndWait(`「雇用我这种等级的忍者就要支付相应的金钱」`);
    await era.printAndWait(`${a_name}的要求是奖金。`);
  } else if (gohoubi == 1 || gohoubi == 2 || gohoubi == 3) {
    // 獣姦要求
    // 同一行输出：无后缀 PRINTFORM + IF/ELSEIF 的
    // PRINT（互斥三支）+ 收行的 PRINTFORMW（#622）。条件提到语句外、文本留在语句里
    await era.printAndWait(
      `「我呢，想要和` +
        (gohoubi == 1 ? `犬` : gohoubi == 2 ? `猪` : gohoubi == 3 ? `马` : '') +
        `交尾的那种${heart(1)}」`,
    );
    await era.printAndWait(`${a_name}要求兽奸作为报酬。`);
  } else if (gohoubi == 4) {
    // キス
    await era.printAndWait(`「回来之后想要魔王大人的吻…想要认真的吻」`);
  } else if (gohoubi == 5) {
    // セックス
    await era.printAndWait(`「抱我行吗、性的意义上」`);
    await era.printAndWait(`${a_name}要求做爱作为报酬。`);
  } else if (gohoubi == 6) {
    // ザーメン
    await era.printAndWait(`「比如喝魔王大人的精液…刚榨出来的最好」`);
    await era.printAndWait(`${a_name}要求用你的精液作为报酬。`);
  } else if (gohoubi == 7) {
    // 乱交
    await era.printAndWait(
      `「比如把魔王大人的部下大量的聚集起来…举行乱交party」`,
    );
    await era.printAndWait(`${a_name}要求乱交party作为报酬。`);
  } else if (gohoubi == 8) {
    // 小水
    await era.printAndWait(`「想喝魔王大人的尿呢」`);
    await era.printAndWait(`${a_name}要求小便作为报酬。`);
  } else if (gohoubi == 9) {
    // 童贞狩り
    await era.printAndWait(`「呐、叫个合适的处男来吧」`);
    await era.printAndWait(`${a_name}要求童贞狩猎作为报酬。`);
  }

  return 0;
}

/**
 * gohoubi_after_koujo_k8：迎击成功后的奖赏口上（角色即 A）。
 *
 * choice（TFLAG:18）三档：0 放置 PLAY / 1 勋章授与 / 2 兑现要求。
 * 第 2 档再按 CFLAG:504 分十支。
 *
 * 五处分岔两支同文（各支加注）：
 * 犬·猪·马兽奸的 TALENT:0 处女判、性交的 ABL:2 > ABL:3 膣/肛门判、
 * 乱交的处女判——分岔条件在，两支文字完全一致。
 * CFLAG:504 链末尾有一个空 ELSE（无输出），省略。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（本函数未消费，随族签名保留）
 * @param {number} [cid] 角色 ID（族签名给的 A；本实现取 era_flag.target，同 K3）
 * @param {number} [choice] 奖赏选择序号（TFLAG:18）
 */
async function gohoubi_after_koujo_k8(rand, cid, choice) {
  void rand;
  void cid;
  const a = era_flag.target;
  const a_name = chara_callname(a); // %SAVESTR:A%
  const gohoubi = chara(a).stronghold.要求奖赏;

  if (choice == 0) {
    // 放置PLAY
    await era.printAndWait(`「………知道了、我就这样退下了」`);
  } else if (choice == 1) {
    // 勲章授与
    await era.printAndWait(`「呵呵呵、很高兴获得勋章」`);
  } else if (choice == 2) {
    if (gohoubi == 0) {
      // お金を渡す
      await era.printAndWait(`「嗯、勇者捕获的报酬确实收到了」`);
    } else if (gohoubi == 1) {
      // 犬と獣姦（两支同文）
      if (era0(`talent:${a}:0`) == 1) {
        // 处女
        await era.printAndWait(
          `「嗯嗯！啊啊！果然连声音都不一样…被狗侵犯…我快不行了${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「嗯嗯！啊啊！果然连声音都不一样…被狗侵犯…我快不行了${heart(1)}」`,
        );
      }
    } else if (gohoubi == 2) {
      // 豚と獣姦（两支同文）
      if (era0(`talent:${a}:0`) == 1) {
        // 处女
        await era.printAndWait(
          `「嗯嗯！啊啊！果然连声音都不一样…被猪侵犯…我快不行了${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「嗯嗯！啊啊！果然连声音都不一样…被猪侵犯…我快不行了${heart(1)}」`,
        );
      }
    } else if (gohoubi == 3) {
      // 馬と獣姦（两支同文）
      if (era0(`talent:${a}:0`) == 1) {
        // 处女
        await era.printAndWait(
          `「嗯嗯！啊啊！果然连声音都不一样…被马侵犯…我快不行了${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「嗯嗯！啊啊！果然连声音都不一样…被马侵犯…我快不行了${heart(1)}」`,
        );
      }
    } else if (gohoubi == 4) {
      // キス
      await era.printAndWait(
        `「嗯…嗯…不行、还想再要点奖励…嗯…嗯呼${heart(1)}」`,
      );
      await era.printAndWait(`就这样${a_name}和你反复的接吻了十分钟以上………`);
    } else if (gohoubi == 5) {
      // セックス（两支同文）
      if (era0(`abl:${a}:2`) > era0(`abl:${a}:3`)) {
        // 膣とペニス
        await era.printAndWait(
          `「继续抱我！啊嗯！哪里！好棒${heart(1)} 啊啊嗯！就是那里就是那里！让我融化吧${heart(1)}」`,
        );
      } else {
        // アナルとペニス
        await era.printAndWait(
          `「继续抱我！啊嗯！哪里！好棒${heart(1)} 啊啊嗯！就是那里就是那里！让我融化吧${heart(1)}」`,
        );
      }
    } else if (gohoubi == 6) {
      // ザーメン
      await era.printAndWait(`「呵呵、魔王大人的精液是最好的报酬${heart(1)}」`);
    } else if (gohoubi == 7) {
      // 乱交（两支同文）
      if (era0(`talent:${a}:0`) == 1) {
        // 处女
        await era.printAndWait(
          `「嗯啊…乱交party最棒了、还想再办啊${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「嗯啊…乱交party最棒了、还想再办啊${heart(1)}」`,
        );
      }
    } else if (gohoubi == 8) {
      // おしっこ
      await era.printAndWait(
        `「咕噜咕噜…嗯…魔王大人、还有什么想说的么、为了和尿的话我什么都愿意干${heart(1)}」`,
      );
    } else if (gohoubi == 9) {
      // 童贞狩り
      if (era0(`abl:${a}:2`) > era0(`abl:${a}:3`)) {
        // 膣
        await era.printAndWait(`「怎么样、我的身体是最棒的吧？」`);
      } else {
        // アナル
        await era.printAndWait(`「屁股小穴里插着新品阴茎最棒了♪」`);
      }
    }
    // 此处有一个空 ELSE（无输出），省略
  }

  return 0;
}

// 注册进奖赏两族（TRYCALLFORM GOHOUBI_*_KOUJO_K8 的等价物，签名同 K3）
gohoubi_request_koujo_family.register(8, () => gohoubi_request_koujo_k8());
gohoubi_after_koujo_family.register(8, (cid, choice) =>
  gohoubi_after_koujo_k8(undefined, cid, choice),
);

/**
 * osioki_koujo_k8：迎击失败后的惩罚口上（角色即 A）。
 *
 * choice（TFLAG:18）十档：0 放置 PLAY / 1 弱电椅刑 / 2 路上自慰刑 /
 * 3 路上脱粪刑 / 4 鞭打刑 / 5 人间小便器刑 / 6 厕所打扫刑 / 7 断食刑 /
 * 8 媚药放置刑 / 9 未定。1-5 档各嵌一层素质/能力分岔（受虐狂っ気 ABL:21、
 * 露出癖 ABL:17、受虐狂 TALENT:88 或淫乱 TALENT:76），6-9 档单行。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（本函数未消费，随族签名保留）
 * @param {number} [cid] 角色 ID（族签名给的 A；本实现取 era_flag.target，同 K3）
 * @param {number} [choice] 惩罚选择序号（TFLAG:18）
 */
async function osioki_koujo_k8(rand, cid, choice) {
  void rand;
  void cid;
  const a = era_flag.target;

  if (choice == 0) {
    // 放置PLAY
    await era.printAndWait(`「唔…嗯………失礼了」`);
  } else if (choice == 1) {
    // 弱電気椅子刑
    if (era0(`abl:${a}:21`) >= 3) {
      // 受虐狂っ気Lv3以上
      await era.printAndWait(
        `「嗯！啊啊，真是的！对我来说这样的拷问是没有效果的${heart(1)} 啊啊嗯～♪」`,
      );
    } else {
      await era.printAndWait(`「唔！咕！电压太高了！…啊…啊咕！」`);
    }
  } else if (choice == 2) {
    // 路上自慰刑
    if (era0(`abl:${a}:17`) >= 4) {
      // 露出癖Lv4以上
      await era.printAndWait(`「看我自慰，好好的看着，好兴奋啊，要去了！」`);
    } else {
      await era.printAndWait(`「虽说是魔王大人的惩罚…啊啊啊…屈辱…啊啊！」`);
    }
  } else if (choice == 3) {
    // 路上脱糞刑
    if (era0(`abl:${a}:17`) >= 6) {
      // 露出癖Lv6以上
      await era.printAndWait(
        `「我拉○的时候不好好看着可不行哦？　呵呵…嗯！就那样看着我吧！」`,
      );
    } else {
      await era.printAndWait(`「嗯咕~~~嗯啊~~~~嗯啊啊啊啊啊~~~~」`);
    }
  } else if (choice == 4) {
    // 鞭打ち刑
    if (era0(`abl:${a}:21`) >= 3) {
      // 受虐狂っ気Lv3以上
      await era.printAndWait(`「啊嗯！更多的惩罚我吧！用你的鞭子！」`);
    } else {
      await era.printAndWait(`「咕！啊！对不起魔王大人！」`);
    }
  } else if (choice == 5) {
    // 人間小便器刑
    if (era0(`talent:${a}:88`) == 1 || era0(`talent:${a}:76`) == 1) {
      // 受虐狂or淫乱
      await era.printAndWait(`「哈啊…更多、更多的看着我尿尿${heart(1)}」`);
    } else {
      await era.printAndWait(`「唔…不要…不要…不要不要不要………」`);
    }
  } else if (choice == 6) {
    // トイレ掃除刑
    await era.printAndWait(`「这不是我应该做的事啊………」`);
  } else if (choice == 7) {
    // ご飯抜き刑
    await era.printAndWait(`「这样的刑罚，3天左右没事的」`);
  } else if (choice == 8) {
    // 媚药放置刑
    await era.printAndWait(
      `「啊~…啊~…求你了求你了求你了、把我侵犯的乱七八糟的吧！在子宫里不断的插进来插进来！啊！求您了！不回去了！不回去了！」`,
    );
  } else if (choice == 9) {
    // 未定
    await era.printAndWait(`「嗷嗷！」`);
  }

  return 0;
}

/**
 * gobi_koujo_k8：语尾口上。
 *
 * ARG:0 五档情绪（1 得意 / 2 生气 / 3 悲伤 / 4 害羞 / 5 窘迫），其余（含 0）
 * 走默认三选一。全部是 bare PRINTFORM——不换行不等待，接在上一句
 * 尾巴上。默认支的前两支同文（都是「啊。」）。
 *
 * @param {number} [arg_0] ARG:0（情绪编号）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 */
function gobi_koujo_k8(arg_0, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));

  if (arg_0 == 1) {
    // 喜んで誇らしげに
    return `什么啊♪`;
  } else if (arg_0 == 2) {
    // 怒って
    return `哼！`;
  } else if (arg_0 == 3) {
    // 悲しんで
    return `唉……。`;
  } else if (arg_0 == 4) {
    // 恥ずかしそうに
    return `嗯……。`;
  } else if (arg_0 == 5) {
    // 情けなさそうに
    return `啊……啊……。`;
  } else {
    // デフォルト（含 ARG:0 == 0）
    if (rand_n(3) == 0) {
      return `啊。`;
    } else if (rand_n(2) == 0) {
      // 与上一支同文
      return `啊。`;
    } else {
      return `什么啊。`;
    }
  }
}

// 注册进惩罚族与语尾族（TRYCALLFORM OSIOKI_KOUJO_K8 / GOBI_KOUJO_K8 的等价物）
osioski_koujo_family.register(8, (cid, choice) =>
  osioki_koujo_k8(undefined, cid, choice),
);
gobi_koujo_family.register(8, gobi_koujo_k8);

module.exports = {
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
