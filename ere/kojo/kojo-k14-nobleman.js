/* eslint-disable no-irregular-whitespace, no-dupe-else-if */
/**
 * @file 貴公子口上 K14：EVENTTRAIN 存在标志 + 主体 + 二回目以降 + 调教结束 +
 *       指令口上 + 兽奸/死斗场/NTR/处刑/博物馆/流放/肉便器/迎击奖惩等非调教
 *       入口（issue #245）。
 *
 * == 角色设定 ==
 *
 * 男角色口上（ショタっ子～若者くらい，育ちがよく礼儀正しい；愛だと忠実な
 * 僕となり執事っぽくなる）。素質 174（貴公子）→ GET_KOJO_NUM = 114 →
 * 分发 key 14。K14 是「可男可女」的口上：全篇按 TALENT:122（男）与
 * CFLAG:70 性転換済（已变性）双分档，另有 TALENT:314 == 9（魔族）组合档。
 *
 * == 已性转（CFLAG:70）的跨域读 ==
 *
 * 性転換済（male→female 改造完成标志）由 SHOP_LABO ver1.0.2.ERB:2310
 * 写入（CFLAG:T:70 = 1），属主 stronghold（ownership/cflag-ownership.yml
 * "70-71"）。本文件全篇在「性転換済み」分支里**只读**它（与 TALENT:122 == 0
 * 一起判「原本是男人、现已变为女性的身体」），走
 * `chara(target).stronghold.已性转` 门面（tools/facade-names.js #245 补名）。
 *
 * == 整句日文残留（:319 / :5300） ==
 *
 * :319（愛+魔族化・性転換済み・調教前から魔族分档的过场白）与 :5300
 * （DUNGEON_VICTORY_K14 臆病・悲観分档台词）两句是汉化未译的整句日文残留
 * （全库 PRINT 行仅此两处超过 7 个假名的整句）。词级整句译作简体对白
 * （tools/lang-table.js #245 收录），保真锁 D 的 ERB 侧归一靠 WORD_MAP
 * 整句映射对上 JS 译文，玩家可见文本由此统一为简体。
 *
 * == 空模板骨架（K9 DOG_KOJO_9 同款判定，#251 先例） ==
 *
 * @KOJO_MESSAGE_COM_14（:603-3561）、@DOG_KOJO_14（:3563-4366）、
 * @COLOSSEUM_KOJO_14（:5416-5519）、@NTR_KOUJO_K14（:5521-5596）与处刑
 * 六函数（EXUCUTION/MUSEUM/BANISHMENT/PUBLIC_EXUCUTION/GROTESQUE，
 * :5598-5710）全部是**未填写的模板骨架**——保留完整的分支状态机（各
 * SELECTCOM 与 CFLAG 计数器写入齐全），但 PRINTFORMW 均为空参数（源行
 * `PRINTFORMW ` 后无任何正文，合计 942 处）。这不是转译器漏译——本文件
 * 角色（貴公子/K14）就是只填了开头/结束/部分特殊指令口上、其余指令留空的
 * 模板残片；未填写的 PRINTFORMW 一律保留为 `await era.printAndWait('')`（K9
 * 同款，逐行核对确认，不补写台词）。
 *
 * @BENKI_KOUJO_K14（:5039-5271）只有 FLAG:62 == 9（野外露出配信）的
 * 常識改変两档填了台词（:5160-5175），其余档位留空。
 *
 * @SELF_KOJO_K14（:4629-4882）TFLAG:13 分派各支的 PRINTFORMW 亦全空
 * （调教后自慰/百合PLAY/朝口交/调教后性交/夜袭/卖却/妊娠发觉/生产/育儿室/
 * 亲离/死亡/寿命 十二支保留状态机骨架）。
 *
 * == 未实现的功能段（相关分支不接入） ==
 *
 * - 简易助手口上（CFLAG:202 段）未实现：EVENTTRAIN 里无助手与有助手
 *   都落 k14_kojo2（二回目以降）。
 * - KOJO_MESSAGE_COM_14 无助手跳过守卫，助手调教时照常出声。
 * - EVENTTRAIN 状态机没有崩坏（TALENT:9）分档，也没有「淫乱且魔族化」
 *   的组合档：这两类角色走链上其余分档。
 *
 * 分片进度（issue #245 分片合入）：
 *   S1（95a2ef6）：EVENTTRAIN/EVENTEND/K14_KOJO2/存在标志一对。
 *   S2（c6255cb）：KOJO_MESSAGE_COM_14 全篇（:603-3561，空模板骨架，525
 *     处空 PRINTFORMW；含穿环 SELECTCOM 87 的 piercing_state 读、:719 的
 *     P 声明补写）。
 *   S3（本片）：DOG_KOJO_14（:3563-4366）/KOJO_MESSAGE_PALAMCNG_14
 *     （:4368-4564，P1-P4/A 局部声明补写）/KOJO_MESSAGE_MARKCNG_14
 *     （:4566-4627）/SELF_KOJO_K14（:4629-4882）/DUNGEON_RYOUZYOKU_K14
 *     与 _AFTER_K14（:4884-5037）/BENKI_KOUJO_K14（:5039-5271，填了
 *     常识改写与野外露出配信档，%SELF_CALL(A)% 转 self_call(a)）/
 *     DUNGEON_VICTORY_K14（:5273-5326，含 :5300 臆病档整句日文归一）/
 *     DUNGEON_ATTACK_K14（:5327-5411）/COLOSSEUM_KOJO_14（:5416-5519）。
 *     COM 守卫的 DOG/COLOSSEUM CALL 由注释改真实调用。
 *   S4（本片）：NTR_KOUJO_K14（:5521-5596，P 参数分档，CFLAG:650-657 旗
 *     标）+ 处刑系五入口（EXUCUTION/MUSEUM/BANISHMENT/PUBLIC_EXUCUTION/
 *     GROTESQUE，:5598-5710，TFLAG:16/500/510/520/530 分档空模板）+
 *     ENTERENEMY_KOUJO_K14（:5712-5728，台词已填）+ GOHOUBI_REQUEST
 *     （:5730-5767，按 CFLAG:A:504 要求奖赏分档，台词已填，%SAVESTR:A% →
 *     chara_callname(a)）+ GOHOUBI_AFTER（:5768-5846）/OSIOKI
 *     （:5848-5909，读 TFLAG:18，choice 参数传入不使用）+ GOBI
 *     （:5911-5944，语尾 PRINTFORM，ARG:0 分档 + 随机三选）。
 *   S5（本片）：全家族注册（key 14）+ main-loop require 接线 +
 *     gen-facade strict-list 补 kojo-k14-nobleman.js。
 *
 * 本票无 SELL_MATURO_K0 调用（SELF_KOJO 卖却分支为空模板，无 CALL 行）。
 */

'use strict';

const era = require('#/era-electron');
const { on, TIER } = require('#/system/event/registry');
const era_flag = require('#/era-utils/era-flag');
const { heart, self_call, self_call_first } = require('#/kojo/kojo-text');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { PALAMLV } = require('#/era-utils/palam-level');
const { chara_callname, chara_name } = require('#/utils/callname-utils');
const { piercing_state } = require('#/system/train/piercing-state');
const {
  kojo_message_com_family,
  self_kojo_family,
  kojo_message_palamcng_family,
  kojo_message_markcng_family,
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

// @EVENTTRAIN #PRI（:39-44）：存在标志 + 总开关补 0（同 EVENT_K.ERB 语义）
on(
  'EVENTTRAIN',
  () => {
    game.kojo.口上存在_14 = 1; // FLAG:114 = 1（K14 口上存在标志）
    if (game.kojo.口上开关 === 0) {
      game.kojo.口上开关 = 2;
    }
  },
  TIER.PRI,
);

// @EVENTEND #LATER（:45-48）：调教结束清存在标志
on(
  'EVENTEND',
  () => {
    game.kojo.口上存在_14 = 0;
  },
  TIER.LATER,
);

/**
 * @EVENTTRAIN（:53-425，普通档）：调教开始时的口上。
 *
 * 守卫（:54-57）：FLAG:7 <= 0 跳过、TALENT:174 != 1 跳过；此后按 CFLAG:201
 * 状态机推进：
 *   - 初调教（201 == 0，:62-106）：男魔族（TALENT:122 && 魔族 314==9）/
 *     魔族+已性转（314==9 && CFLAG:70 && !122）/ 通常男（122）/ 已性转
 *     （CFLAG:70 && !122）四档，置 201=1；前两档另置 370=1（魔族スイッチ１），
 *     已性转档 RETURN 1（性転換済み的初调教有完整过场）。
 *   - 魔族化（201<5 && 370==0 && 魔族 && 无爱无淫乱，:110-117）：仅一次，
 *     置 370=2。
 *   - NTR 再捕获（201>=1 && CFLAG:650==1，:121-134）：爱/淫乱与それ以外
 *     两档，清 650=0。
 *   - 屈服刻印 Lv1/2/3（:139-167）：各一次，201 推进 2/3/4。
 *   - 淫乱（201<5 && 76 && !85，:170-179）：201=5。
 *   - 爱（201<6 && 85，:247-267）：男/已性转两档，201=6。
 *   - 爱+魔族化（314==9 && 201<8 && 85 && !76，:270-347）：370==1（調教前
 *     から魔族）/370==2（調教後に魔族）/それ以外（陥落後に魔族）三档 ×
 *     男/已性转两分档，201=8。
 *   - 无崩坏（TALENT:9）分档：崩坏角色走链上其余分档（见文件头）。
 *   - 无助手（ASSI < 0）与其余（有助手，简易助手段未实现）都调
 *     k14_kojo2。
 *
 * 已性转判定统一走 `chara(target).stronghold.已性转`（CFLAG:70，见文件头）。
 */
on('EVENTTRAIN', async () => {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const master_name = chara_name(0); // %NAME:MASTER%（MASTER 恒角色 0）
  const kojo = chara(target).kojo;
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%
  const scf = () => self_call_first(target); // %SELF_CALL_FIRST(TARGET)%

  if ((game.kojo.口上开关 || 0) <= 0) {
    return 0;
  }
  if (era.get(`talent:${target}:174`) != 1) {
    return 0;
  }

  if (kojo.初调教 == 0) {
    era.drawLine();

    // 男魔族
    if (
      era.get(`talent:${target}:122`) &&
      era.get(`talent:${target}:314`) == 9
    ) {
      await era.printAndWait(`经过多次改造后，${target_name}转生成为魔族了。`);
      await era.printAndWait(
        `${master_name}前来看看情况，就看到${target_name}一脸焦虑地烦恼着发生在自己身上的事。`,
      );
      await era.printAndWait(
        `（这种不可言喻的感觉…，啊！！这…这难道就是…暗之魔力…吗！！？）`,
      );
      await era.printAndWait(
        `「啊…魔、魔王大人…，嗯唔…！？魔…魔王…！！！不…！${sc()}是不会对你…！？啊…这…这绝对不可能…，我竟然会对你…！」`,
      );
      await era.printAndWait(
        `成为魔族了的${target_name}，想要发泄对于转生成魔族的怨恨。`,
      );
      await era.printAndWait(
        `但对于魔族之王的你的忠诚已经深刻于心，从心底感觉到无法违抗………`,
      );
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;
      // 魔族スイッチ１
      kojo.魔族化 = 1;
    } else if (
      era.get(`talent:${target}:314`) == 9 &&
      chara(target).stronghold.已性转 &&
      era.get(`talent:${target}:122`) == 0
    ) {
      // 魔族（已性转）
      await era.printAndWait(
        `${target_name}经过多次改造的过程中变成了女性，之后更是转生成为了魔族。`,
      );
      await era.printAndWait(
        `${master_name}前来看看情况，就看到${target_name}一脸焦虑地烦恼着发生在自己身上的事。`,
      );
      await era.printAndWait(
        `（像这样畅快的感觉…而且总感觉…，身体里面…好像有一种奇怪的冲动…${heart(1)}）`,
      );
      await era.printAndWait(
        `「难道是受到了魔王植入的魔力所影响的么…？还是说…」`,
      );
      await era.printAndWait(
        `「啊…魔、魔王大人…，嗯唔…！？魔…魔王…！！！不…！${sc()}是不会对你…！？啊…这…这绝对不可能…，我竟然会对你…！」`,
      );
      await era.printAndWait(
        `成为魔族了的${target_name}，想要发泄对于自己完全发生转变的怨恨。`,
      );
      await era.printAndWait(
        `但对于魔族之王的你的忠诚所带来的愉快感，更胜过想要抵抗的想法………`,
      );
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;
      // 魔族スイッチ１
      kojo.魔族化 = 1;
    } else if (era.get(`talent:${target}:122`)) {
      // 通常（男）
      await era.printAndWait(
        `「可…可恶啊！！！你这个肮脏的魔王！！我郑重告诉你！${sc()}是绝对不会屈服于你的…！！」`,
      );
      await era.printAndWait(`怒目圆睁的眼睛中，隐约可以窥见他内心的恐惧……`);
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;
    } else if (
      chara(target).stronghold.已性转 &&
      era.get(`talent:${target}:122`) == 0
    ) {
      // 性転換済み（已变性为女性）
      await era.printAndWait(
        `在${master_name}的戏弄下、${target_name}被改造成了女性的肉体了。`,
      );
      await era.printAndWait(
        `「你这个可恶的魔王…！！赶快把${sc()}的身体变回原来的样子啊！」`,
      );
      await era.printAndWait(
        `${master_name}来到了房间，${target_name}就瞪了过来并大声抗议了起来。`,
      );
      await era.printAndWait(
        `「${sc()}可是个男人啊！才不是一个女人啊！！喂…！！你这家伙有在听我说话吗！？」`,
      );
      await era.printAndWait(
        `这么呼喊着的${target_name}，被${master_name}按倒在了床上。`,
      );
      await era.printAndWait(
        `「啊…喂！！你…你这家伙…！想要对${sc()}做什么…！赶快放开你的手啊…！你这个肮脏的家伙…！」`,
      );
      await era.printAndWait(
        `他、不，她的身心将因被刻上迄今为止从未体会过的快感而顺从吧……`,
      );
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;
      return 1;
    }
  } else if (
    kojo.初调教 < 5 &&
    kojo.魔族化 == 0 &&
    era.get(`talent:${target}:314`) == 9 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    // 魔族化（1 回のみ）初回調教後魔族化、陥落前
    await era.printAndWait(
      `经过多次改造后完全成为魔族的${target_name}对自己的模样感到绝望…`,
    );
    await era.printAndWait(`注意到来到房间了的你，不知所措地看着你。`);
    await era.printAndWait(
      `「可恶的…魔王…！！赶快把${sc()}的身体…，彻彻底底的变回去…！」`,
    );
    await era.printAndWait(
      `成为魔族的${sc()}，已经开始从本能上感觉到无法违抗身为魔族之王的你了………`,
    );
    // 魔族スイッチ２
    kojo.魔族化 = 2;
    return 1;
  } else if (kojo.初调教 >= 1 && kojo.NTR再捕获 == 1) {
    // NTR 再捕获
    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {
      // 愛・淫乱
      era.drawLine();
      await era.printAndWait(
        `「还…还真是抱歉呢…，因为${sc()}我…好像有点太容易就败给诱惑了呢…」`,
      );
      // NTR スイッチ解除
      kojo.NTR再捕获 = 0;
    } else {
      era.drawLine();
      await era.printAndWait(`「嗛…怎么又是你啊…！」`);
      // NTR スイッチ解除
      kojo.NTR再捕获 = 0;
    }
    return 1;
  } else if (kojo.初调教 < 2 && era.get(`mark:${target}:2`) == 1) {
    // 屈服刻印Lv1
    era.drawLine();
    await era.printAndWait(
      `「可恶的…魔王…！${sc()}是绝对不会输给你的…也不会顺从你的！！」`,
    );
    // CFLAG:201  = 2（变量语义：CFLAG 族，201）
    kojo.初调教 = 2;
    return 1;
  } else if (kojo.初调教 < 3 && era.get(`mark:${target}:2`) == 2) {
    // 屈服刻印Lv2
    era.drawLine();
    if (era.get(`talent:${target}:122`)) {
      await era.printAndWait(`「呃…，今天也要继续做那种事情啊…！？」`);
    } else if (
      chara(target).stronghold.已性转 &&
      era.get(`talent:${target}:122`) == 0
    ) {
      // 性転換済み
      await era.printAndWait(
        `「啊…，这种快乐而且微妙的感觉…真的是好棒啊…，但…但是…」`,
      );
    }
    // CFLAG:201  = 3（变量语义：CFLAG 族，201）
    kojo.初调教 = 3;
    return 1;
  } else if (
    kojo.初调教 < 4 &&
    era.get(`mark:${target}:2`) == 3 &&
    era.get(`talent:${target}:85`) == 0
  ) {
    // 屈服刻印Lv3
    era.drawLine();
    if (era.get(`talent:${target}:122`)) {
      await era.printAndWait(`「抱歉了…大家…，因为${sc()}已经…已经快要…」`);
    } else if (
      chara(target).stronghold.已性转 &&
      era.get(`talent:${target}:122`) == 0
    ) {
      // 性転換済み
      await era.printAndWait(
        `「像这种舒适的快感…，${sc()}感觉到…好像已经、已经完全的要沦陷成为真正的女人了啊…」`,
      );
    }
    // CFLAG:201  = 4（变量语义：CFLAG 族，201）
    kojo.初调教 = 4;
    return 1;
  } else if (
    kojo.初调教 < 5 &&
    era.get(`talent:${target}:76`) == 1 &&
    era.get(`talent:${target}:85`) == 0
  ) {
    // 淫乱
    era.drawLine();
    if (era.get(`talent:${target}:122`)) {
      // 通常
      await era.printAndWait(
        `「啊~，魔王大人~，${sc()}啊…，一直都在这里等待着您的到来呢~」`,
      );
    } else if (
      chara(target).stronghold.已性转 &&
      era.get(`talent:${target}:122`) == 0
    ) {
      // 性転換済み
      await era.printAndWait(
        `「啊~，魔王大人~，${sc()}啊…，一直都在这里等待着您的到来呢~」`,
      );
    }
    // CFLAG:201  = 5（变量语义：CFLAG 族，201）
    kojo.初调教 = 5;
    return 1;
  } else if (kojo.初调教 < 6 && era.get(`talent:${target}:85`) == 1) {
    // 愛
    era.drawLine();
    if (era.get(`talent:${target}:122`)) {
      // 通常
      await era.printAndWait(
        `「魔…魔王大人…，${sc()}…，已经绝对不会再反抗您了。所…所以…」`,
      );
      await era.printAndWait(
        `「${sc()}、想要尽可能的帮上魔王大人的忙…想要在呆我所尊敬的魔王大人身边、支持着您…可以吗…！？」`,
      );
      await era.printAndWait(
        `你听了${target_name}的愿望之后、向他传达了既然如此今后就好好侍奉的意思…`,
      );
      await era.printAndWait(`「好的…，那么就如魔王大人所愿。。。」`);
      await era.printAndWait(
        `套弄抚摸着${target_name}已经勃起了的阴茎、你脸上浮现了扭曲的笑容…`,
      );
    } else if (
      chara(target).stronghold.已性转 &&
      era.get(`talent:${target}:122`) == 0
    ) {
      // 性転換済み
      await era.printAndWait(
        `「魔…魔王大人…，${sc()}…，已经绝对不会再反抗您了。所…所以…」`,
      );
      await era.printAndWait(
        `「${sc()}、想要尽自己全部的能力帮助魔王大人…，所以…我为了尊敬的魔王大人、不管是什么事情我都愿意去做！」`,
      );
      await era.printAndWait(
        `「就连这副身体…也请随便使用吧…、啊…！但是…像${sc()}这样原来是男人的女人…真的能接受么…？」`,
      );
      await era.printAndWait(
        `你听了${target_name}的愿望之后、向他传达了既然如此今后就好好侍奉的意思…`,
      );
      await era.printAndWait(`「好的…如魔王大人所愿${heart(1)}」`);
      if (era.get(`talent:${target}:0`) == 1) {
        await era.printAndWait(
          `「${target_name}的『第一次』、因为想被魔王大人夺走…所以有在好好的为您保存着呢哦…${heart(1)}」`,
        );
      }
      await era.printAndWait(
        `爱抚着满心欢喜的${target_name}的雌性身体、你脸上浮现了扭曲的笑容…`,
      );
    }
    // CFLAG:201  = 6（变量语义：CFLAG 族，201）
    kojo.初调教 = 6;
    return 1;
  } else if (
    era.get(`talent:${target}:314`) == 9 &&
    kojo.初调教 < 8 &&
    era.get(`talent:${target}:85`) == 1 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    // 愛+魔族化
    era.drawLine();
    if (era.get(`talent:${target}:122`)) {
      // 男
      if (kojo.魔族化 == 1) {
        // 調教前から魔族
        await era.printAndWait(
          `「啊啊…魔王大人…，之所以把${sc()}转化成了魔族的原因、其实就是为了这个对吧…」`,
        );
        await era.printAndWait(
          `你进入房间的时候、${target_name}正带着温柔的表情跪在地上迎接你的到来。`,
        );
        await era.printAndWait(
          `「伟大的魔王大人啊…，${sc()}我…，已经完全的接受了身为魔族的一切了哦…，并且…会永远…与您相伴到最后的…」`,
        );
        await era.printAndWait(
          `「所以说不管是什么样的命令…${target_name}全部都会、按照魔王大人所愿去做的…」`,
        );
        if (era.get(`talent:${target}:77`) == 1) {
          await era.printAndWait(
            `「${target_name}已经开发完全的菊穴、也请魔王大人毫不客气的使用吧…${heart(1)}」`,
          );
        }
        await era.printAndWait(
          `不久前还叫嚣着要讨灭你的男冒险者、现在完全转生成了誓死效忠你的魔族了。`,
        );
        await era.printAndWait(
          `你抱紧了${target_name}的身体、脸上浮现扭曲的笑容…`,
        );
        // CFLAG:201  = 8（变量语义：CFLAG 族，201）
        kojo.初调教 = 8;
        return 1;
      } else if (kojo.魔族化 == 2) {
        // 調教後に魔族
        await era.printAndWait(
          `「嗯…？啊…！魔…魔王大人…！！${scf()}、${sc()}…」`,
        );
        await era.printAndWait(
          `你进入房间的时候、${target_name}虽然还有点迷茫、但还是跪在地上迎接你的到来。`,
        );
        await era.printAndWait(
          `「嗯…，伟大的魔王大人啊…${sc()}从现在开始再也不会迷茫了…因为我已经完全的接受了身为魔族的一切了、所以我愿时刻陪伴在您左右」`,
        );
        await era.printAndWait(
          `「所以…就对${scf()}、对${sc()}…，更加的…更加多的来疼爱我吧…！」`,
        );
        if (era.get(`talent:${target}:77`) == 1) {
          await era.printAndWait(
            `「所以也请魔王大人来更多的使用、${target_name}那已经开发完全的菊穴…！」`,
          );
        }
        await era.printAndWait(
          `你、轻轻地抱住了几乎要哭出来的${target_name}。`,
        );
        await era.printAndWait(
          `从调教的结果来看、${target_name}似乎对你产生了爱慕之情…`,
        );
        // CFLAG:201  = 8（变量语义：CFLAG 族，201）
        kojo.初调教 = 8;
        return 1;
      } else {
        // 陥落後に魔族
        await era.printAndWait(
          `「哦…魔王大人…，能将${sc()}彻底改造成了魔族、这还真的是万分感激呢…」`,
        );
        await era.printAndWait(
          `你进入房间的时候、${target_name}正带着温柔的表情跪在地上迎接你的到来。`,
        );
        await era.printAndWait(
          `「那么这样一来…，${sc()}也就和您一样都是魔族了啊…♪」`,
        );
        await era.printAndWait(
          `${target_name}端详了自己已经成为魔族的身体、再次跪了下来。`,
        );
        await era.printAndWait(
          `「那么…，从今往后…！${target_name}！！将会作为您身边的奴仆来随时听从着魔王大人号令！！」`,
        );
        if (era.get(`talent:${target}:77`) == 1) {
          await era.printAndWait(
            `「${target_name}开发完全的菊穴、也请魔王大人随意使用吧${heart(1)}」`,
          );
        }
        // CFLAG:201  = 8（变量语义：CFLAG 族，201）
        kojo.初调教 = 8;
        return 1;
      }
    } else if (
      chara(target).stronghold.已性转 &&
      era.get(`talent:${target}:122`) == 0
    ) {
      // 性転換済み
      if (kojo.魔族化 == 1) {
        // 調教前から魔族
        await era.printAndWait(
          `「啊啊…魔王大人…，之所以把${sc()}转化成了魔族的原因、其实就是为了这个对吧…」`,
        );
        await era.printAndWait(
          `你进入房间的时候、${target_name}正带着温柔的表情跪在地上迎接你的到来。`,
        );
        await era.printAndWait(
          `「伟大的魔王大人啊…，${sc()}我…，已经完全的接受了身为魔族的一切了哦…，并且…会永远…与您相伴到最后的…」`,
        );
        await era.printAndWait(`「按照魔王大人所愿去做的…」`);
        if (era.get(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「${target_name}的『第一次』、可是为了献给魔王大人…才一直留到现在的哦…${heart(1)}」`,
          );
        }
        await era.printAndWait(
          `没有人会想到，眼前这位带着恍惚表情跪下的女性，直到不久前还是那个举刀想要讨伐你的男性勇者吧。`,
        );
        await era.printAndWait(
          `你抱紧了${target_name}的身体、脸上浮现扭曲的笑容…`,
        );
        // CFLAG:201  = 8（变量语义：CFLAG 族，201）
        kojo.初调教 = 8;
        return 1;
      } else if (kojo.魔族化 == 2) {
        // 調教後に魔族
        await era.printAndWait(
          `「嗯…？啊…！魔…魔王大人…！！${scf()}、${sc()}…」`,
        );
        await era.printAndWait(
          `你进入房间的时候、${target_name}虽然还有点迷茫、但还是跪在地上迎接你的到来。`,
        );
        await era.printAndWait(
          `「嗯…，伟大的魔王大人啊…${sc()}从现在开始再也不会迷茫了…因为我已经完全的接受了身为魔族的一切了、所以我愿时刻陪伴在您左右」`,
        );
        await era.printAndWait(
          `「所以…就对${scf()}、对${sc()}…，更加的…更加多的来疼爱我吧…！」`,
        );
        if (era.get(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「${target_name}的『第一次』、如果不是魔王大人的话…那可是绝对不允许的哦…！！」`,
          );
        }
        await era.printAndWait(
          `你、轻轻地抱住了几乎要哭出来的${target_name}。`,
        );
        await era.printAndWait(
          `从调教的结果来看、${target_name}似乎对你产生了爱慕之情…`,
        );
        // CFLAG:201  = 8（变量语义：CFLAG 族，201）
        kojo.初调教 = 8;
        return 1;
      } else {
        // 陥落後に魔族
        await era.printAndWait(
          `「哦…魔王大人…，能将${sc()}彻底改造成了魔族、这还真的是万分感激呢…」`,
        );
        await era.printAndWait(
          `你进入房间的时候、${target_name}正带着温柔的表情跪在地上迎接你的到来。`,
        );
        await era.printAndWait(
          `「那么这样一来…，${sc()}也就和您一样都是魔族了啊…♪」`,
        );
        await era.printAndWait(
          `${target_name}端详了自己已经成为魔族的身体、再次跪了下来。`,
        );
        await era.printAndWait(
          `「那么…，从今往后…！${target_name}！！将会作为您身边的奴仆来随时听从着魔王大人号令！！」`,
        );
        if (era.get(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「${target_name}的『第一次』、留了那么久，就是为了让魔王大人来取走的啊…${heart(1)}」`,
          );
        }
        // CFLAG:201  = 8（变量语义：CFLAG 族，201）
        kojo.初调教 = 8;
        return 1;
      }
    }
  } else if (era_flag.assi < 0) {
    // 助手がいない場合は二回目以降へ
    await k14_kojo2(); // CALL K14_KOJO2
  } else {
    // 口上のある助手が居ない場合は、通常の二回目以降の口上へ飛ぶ
    await k14_kojo2(); // CALL K14_KOJO2
  }
});

/**
 * @k14_kojo2（:427-494）：调教开始口上的二回目以降。
 *
 * 分档（各带 FLAG:7 == 2 门槛）：反抗刻印Lv3（MARK:3==3）→ 屈服刻印
 * Lv0/1/2/3（MARK:2 按档，Lv2/3 各含男/已性转两分档）→ 淫乱（TALENT:76，
 * RAND:3 三选一随机台词）→ 爱（TALENT:85，RAND:3 三选一随机台词）。
 *
 * @param {(n: number) => number} [rand] RAND:N 的随机源（缺省均匀随机）
 * @returns {Promise<number>} 0（TRYCALLFORM 不读返回值）
 */
async function k14_kojo2(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%

  if (era.get(`mark:${target}:3`) == 3 && game.kojo.口上开关 == 2) {
    // 反発刻印Lv3
    era.drawLine();
    await era.printAndWait(`「去死一死吧！！你这个又脏又可恶的魔王！！」`);
    return 1;
  } else if (era.get(`mark:${target}:2`) == 0 && game.kojo.口上开关 == 2) {
    // 屈服刻印Lv0
    era.drawLine();
    await era.printAndWait(`「不…不要在过来了！！快住手啊！！！」`);
    return 1;
  } else if (era.get(`mark:${target}:2`) == 1 && game.kojo.口上开关 == 2) {
    // 屈服刻印Lv1
    era.drawLine();
    await era.printAndWait(
      `「可恶的…魔王…！${sc()}是绝对不会输给你的…也不会顺从你的！！」`,
    );
    return 1;
  } else if (era.get(`mark:${target}:2`) == 2 && game.kojo.口上开关 == 2) {
    // 屈服刻印Lv2
    era.drawLine();
    if (era.get(`talent:${target}:122`)) {
      await era.printAndWait(`「呃…，今天也要继续做那种事情啊…！？」`);
    } else if (
      chara(target).stronghold.已性转 &&
      era.get(`talent:${target}:122`) == 0
    ) {
      // 性転換済み
      await era.printAndWait(
        `「咕呜…！我…我是不可能就这么轻易的输给快感的…！但…但是…」`,
      );
    }
    return 1;
  } else if (
    era.get(`mark:${target}:2`) == 3 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0 &&
    game.kojo.口上开关 == 2
  ) {
    // 屈服刻印Lv3＋愛/淫乱無し
    era.drawLine();
    if (era.get(`talent:${target}:122`)) {
      await era.printAndWait(`「我明白了…，那么你想干什么就随你喜欢好了…」`);
    } else if (
      chara(target).stronghold.已性转 &&
      era.get(`talent:${target}:122`) == 0
    ) {
      // 性転換済み
      await era.printAndWait(
        `「既然…我已经没有办法再次变回男人的话…，那么…！魔…魔王大人…！就请您再给${sc()}、传授更多的快乐吧…」`,
      );
    }
    return 1;
  } else if (era.get(`talent:${target}:76`) == 1 && game.kojo.口上开关 == 2) {
    // 淫乱（ランダムで口上が変化する）
    era.drawLine();
    if (rand_n(3) == 0) {
      await era.printAndWait(
        `「啊~，魔王大人~，${sc()}啊…，一直都在这里等待着您的到来呢~」`,
      );
    } else if (rand_n(2) == 0) {
      await era.printAndWait(
        `「那么…魔王大人？今天的话…您打算对我做什么事情呢~？」`,
      );
    } else {
      await era.printAndWait(`「嗯…，我已经等您好久了呢~♪」`);
    }
    return 1;
  } else if (era.get(`talent:${target}:85`) == 1 && game.kojo.口上开关 == 2) {
    // 愛（ランダムで口上が変化する）
    era.drawLine();
    if (rand_n(3) == 0) {
      await era.printAndWait(`「啊…！魔…魔王大人…！！您来了啊！！好开心呢…」`);
    } else if (rand_n(2) == 0) {
      await era.printAndWait(`「就按照魔王大人想做的…，来进行调教吧…」`);
    } else {
      await era.printAndWait(
        `「如果是魔王大人的话…，不管是对我做什么都是可以的哦…」`,
      );
    }
    return 1;
  }
  return 0;
}

/**
 * @EVENTEND（:500-597，普通档）：调教结束时的口上。
 *
 * 守卫（:501-508）：FLAG:7 <= 0 跳过、TALENT:174 != 1 跳过、角色死亡
 * （BASE:0 <= 0）跳过；此后按反抗刻印Lv3/屈服刻印Lv1以下/屈服刻印Lv2/
 * 屈服刻印Lv3（各无爱）/淫乱/爱 分档，淫乱与爱各按体力（BASE:0）高低
 * （>=500 / <=500）再分两支，魔族（314==9）与男/已性转再细分。
 */
on('EVENTEND', async () => {
  const target = era_flag.target;
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%

  if ((game.kojo.口上开关 || 0) <= 0) {
    return 0;
  }
  if (era.get(`talent:${target}:174`) != 1) {
    return 0;
  }

  if (era.get(`base:${target}:0`) <= 0) {
    // キャラ死亡時は口上をスキップ
    return 0;
  }

  if (era.get(`mark:${target}:3`) == 3 && era.get(`talent:${target}:85`) == 0) {
    // 反発刻印Lv3+愛なし
    era.drawLine();
    await era.printAndWait(`「嘁…！给我去死啊…！！！」`);
    return 1;
  } else if (
    era.get(`mark:${target}:2`) <= 1 &&
    era.get(`talent:${target}:85`) == 0
  ) {
    // 屈服刻印Lv1以下+愛なし
    era.drawLine();
    await era.printAndWait(`「哼…，总算是结束了呢…」`);
    return 1;
  } else if (
    era.get(`mark:${target}:2`) == 2 &&
    era.get(`talent:${target}:85`) == 0
  ) {
    // 屈服刻印Lv2+愛なし
    era.drawLine();
    if (era.get(`talent:${target}:122`)) {
      await era.printAndWait(`「哈啊…嗯…，结…结束了么…？」`);
    } else if (
      chara(target).stronghold.已性转 &&
      era.get(`talent:${target}:122`) == 0
    ) {
      // 性転換済み
      await era.printAndWait(
        `「哈…呀啊…，这…这种快乐…、总觉得…要上瘾了啊…，咿嗯…！？${sc()}…！到底在说什么呢…！！」`,
      );
    }
    return 1;
  } else if (
    era.get(`mark:${target}:2`) == 3 &&
    era.get(`talent:${target}:85`) == 0
  ) {
    // 屈服刻印Lv3+愛なし
    era.drawLine();
    if (era.get(`talent:${target}:122`)) {
      await era.printAndWait(`「请…请放过我吧…！！」`);
    } else if (
      chara(target).stronghold.已性转 &&
      era.get(`talent:${target}:122`) == 0
    ) {
      // 性転換済み
      await era.printAndWait(`「呼啊…啊哈哈…，这种感觉…真的…，好棒呢…哈啊…」`);
    }
    return 1;
  } else if (
    era.get(`talent:${target}:76`) == 1 &&
    era.get(`base:${target}:0`) >= 500
  ) {
    // 淫乱(体力500以上)
    era.drawLine();
    if (era.get(`talent:${target}:314`) == 9) {
      // 魔族
      await era.printAndWait(
        `「哈…！？只是这样就结束了么…！？喂…，魔王大人啊，不带你这个样子的吧…？」`,
      );
    } else {
      await era.printAndWait(
        `「哈…！？只是这样就结束了么…！？喂…，魔王大人啊，不带你这个样子的吧…？」`,
      );
    }
    return 1;
  } else if (
    era.get(`talent:${target}:76`) == 1 &&
    era.get(`base:${target}:0`) <= 500
  ) {
    // 淫乱(体力500未満)
    era.drawLine();
    if (era.get(`talent:${target}:314`) == 9) {
      // 魔族
      await era.printAndWait(
        `「啊呜…哈啊…嗯…，${sc()}…，感觉…真的是太满足了呢~」`,
      );
    } else {
      await era.printAndWait(
        `「啊呜…哈啊…嗯…，${sc()}…，感觉…真的是太满足了呢~」`,
      );
    }
    return 1;
  } else if (
    era.get(`talent:${target}:85`) == 1 &&
    era.get(`base:${target}:0`) >= 500
  ) {
    // 愛(体力500以上)
    era.drawLine();
    if (
      era.get(`talent:${target}:314`) == 9 &&
      era.get(`talent:${target}:122`) == 1
    ) {
      // 魔族（男）
      await era.printAndWait(`「已经结束了么…？啊…我明白了…」`);
    } else if (era.get(`talent:${target}:122`) == 1) {
      await era.printAndWait(`「已经结束了么…？啊…我明白了…」`);
    } else if (era.get(`talent:${target}:314`) == 9) {
      // 魔族（已性转）
      await era.printAndWait(
        `「已经结束了么…？明明还想要更多的再亲爱一会的说…」`,
      );
    } else {
      await era.printAndWait(
        `「这就要结束了么…？可是…还想要被您更多的疼爱的说呢…」`,
      );
    }
    return 1;
  } else if (
    era.get(`talent:${target}:85`) == 1 &&
    era.get(`base:${target}:0`) <= 500
  ) {
    // 愛(体力500未満)
    era.drawLine();
    if (
      era.get(`talent:${target}:314`) == 9 &&
      era.get(`talent:${target}:122`) == 1
    ) {
      // 魔族（男）
      await era.printAndWait(
        `「啊…，今天真的是辛苦您了…，还真的是非常感谢呢~」`,
      );
    } else if (era.get(`talent:${target}:122`) == 1) {
      await era.printAndWait(
        `「啊…，今天真的是辛苦您了…，还真的是非常感谢呢~」`,
      );
    } else if (era.get(`talent:${target}:314`) == 9) {
      // 魔族（已性转）
      await era.printAndWait(
        `「啊…嗯哼~，像这个样子来疼爱我…还真的是感谢了呢~！那么…明天也要继续来才行哦…！${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「啊…嗯…，今天还真的是十分感谢了啊…，可是我真的已经很累了哦…所以要休息一下了…，不过在我休息好之后，就继续的在一起相亲相爱吧~」`,
      );
    }
    return 1;
  }
  return 0;
});

/**
 * @KOJO_MESSAGE_COM_14（:603-3561）：调教中「指令口上」入口。
 *
 * 空模板骨架（见文件头「空模板骨架」）：全篇 PRINTFORMW 均为空参数（525
 * 处，含二回目以降与守卫分支），保留完整的分支状态机与 CFLAG 计数器写入
 * 集合（301-400 计数器、7 穿环位域、223 首次耻情Lv2 读档）。守卫与 K10
 * 同构：口塞（TEQUIP:45 && SELECTCOM!=45）→ 失神（TFLAG:899）→ 兽奸
 * （TEQUIP:89，CALL DOG_KOJO_14——DOG 为本地函数，S3 落地后改真实调用）
 * → 死斗场（TEQUIP:55，CALL COLOSSEUM_KOJO_14——同上，S3 落地）。
 *
 * 本函数经 kojo_message_com_family 分发（key 14），S5 合入接线；分片期间
 * 直接导出供测试驱动。
 *
 * 无助手跳过守卫，助手调教时照常出声（见文件头「未实现的功能段」）。
 * 局部变量 P = 润滑 PALAM:3 + 增量 delta:3；穿环（SELECTCOM 87）处的 P
 * 是 piercing_state.p（跨指令存活的单字母变量，com87 写入）。
 *
 * @param {((n: number) => number) | undefined} [rand]
 */
async function kojo_message_com_14(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const kojo = chara(target).kojo;

  if (era.get(`tequip:${target}:45`) && era_flag.selectcom != 45) {
    return 0;
  }

  if (game.train.失神) {
    return 0;
  }

  if (era.get(`tequip:${target}:89`)) {
    await dog_kojo_14(rand_n); // CALL DOG_KOJO_14
    return 0;
  }

  if (era.get(`tequip:${target}:55`)) {
    await colosseum_kojo_14(rand_n); // CALL COLOSSEUM_KOJO_14
    return 0;
  }

  if (era_flag.selectcom == 0) {
    if (kojo.爱抚 == 0) {
      if (era.get(`mark:${target}:2`) >= 2) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:301  = 1（变量语义：CFLAG 族，301）
      kojo.爱抚 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:301  = 6（变量语义：CFLAG 族，301）
        kojo.爱抚 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:301  = 5（变量语义：CFLAG 族，301）
        kojo.爱抚 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:301  = 4（变量语义：CFLAG 族，301）
        kojo.爱抚 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 2 &&
        (kojo.爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:301  = 3（变量语义：CFLAG 族，301）
        kojo.爱抚 = 3;
      } else if (
        era.get(`mark:${target}:2`) <= 1 &&
        (kojo.爱抚 <= 1 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:301  = 2（变量语义：CFLAG 族，301）
        kojo.爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 1) {
    if (kojo.舔阴 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:302  = 1（变量语义：CFLAG 族，302）
      kojo.舔阴 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.舔阴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:302  = 5（变量语义：CFLAG 族，302）
        kojo.舔阴 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.舔阴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:302  = 4（变量语义：CFLAG 族，302）
        kojo.舔阴 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.舔阴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:302  = 3（变量语义：CFLAG 族，302）
        kojo.舔阴 = 3;
      } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:302  = 2（变量语义：CFLAG 族，302）
        kojo.舔阴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 2) {
    if (kojo.肛门爱抚 == 0) {
      await era.printAndWait('');
      // CFLAG:TARGET:303  = 1（变量语义：CFLAG 族，TARGET:303）
      kojo.肛门爱抚 = 1;
      return 0;
    } else {
      // 赋值 P = PALAM:3 + UP:3
      const P = chara(target).train.润滑 + chara(target).train.润滑增量;

      if (
        era.get(`talent:${target}:76`) == 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:303  = 7（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        P < PALAMLV[2] &&
        (kojo.肛门爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:303  = 6（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:303  = 5（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        P < PALAMLV[2] &&
        (kojo.肛门爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:303  = 4（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 4;
      } else if (
        P >= PALAMLV[2] &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛门爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:303  = 3（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 3;
      } else if (kojo.首次耻情Lv2 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:303  = 2（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 3) {
    if (kojo.自慰 == 0) {
      await era.printAndWait('');
      // CFLAG:TARGET:304  = 1（变量语义：CFLAG 族，TARGET:304）
      kojo.自慰 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:0`) == 1 &&
        (kojo.自慰 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:304  = 9（变量语义：CFLAG 族，304）
        kojo.自慰 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:31`) >= 3 &&
        (kojo.自慰 <= 7 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:304  = 8（变量语义：CFLAG 族，304）
        kojo.自慰 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:31`) < 3 &&
        (kojo.自慰 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:304  = 7（变量语义：CFLAG 族，304）
        kojo.自慰 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`talent:${target}:0`) == 1 &&
        (kojo.自慰 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:304  = 6（变量语义：CFLAG 族，304）
        kojo.自慰 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:31`) >= 3 &&
        (kojo.自慰 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:304  = 5（变量语义：CFLAG 族，304）
        kojo.自慰 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:31`) < 3 &&
        (kojo.自慰 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:304  = 4（变量语义：CFLAG 族，304）
        kojo.自慰 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:31`) >= 1 &&
        (kojo.自慰 <= 2 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:304  = 3（变量语义：CFLAG 族，304）
        kojo.自慰 = 3;
      } else if (kojo.自慰 <= 1 || game.kojo.口上开关 == 2) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:304  = 2（变量语义：CFLAG 族，304）
        kojo.自慰 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 5) {
    if (kojo.胸爱抚 == 0) {
      if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306）
      kojo.胸爱抚 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 5（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 4（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 4;
      } else if (
        era.get(`abl:${target}:1`) >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 3（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 3;
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:306  = 2（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 6) {
    if (kojo.接吻 == 0 && game.train.初吻与自我口上) {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era_flag.assiplay == 0 &&
        era.get(`tequip:${target}:89`) == 0 &&
        era.get(`tequip:${target}:90`) == 0
      ) {
        await era.printAndWait('');
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era_flag.assiplay == 0 &&
        era.get(`tequip:${target}:89`) == 0 &&
        era.get(`tequip:${target}:90`) == 0
      ) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      kojo.接吻 = 1;
      return 0;
    } else if (kojo.接吻 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      kojo.接吻 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.接吻 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 5（变量语义：CFLAG 族，307）
        kojo.接吻 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.接吻 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 4（变量语义：CFLAG 族，307）
        kojo.接吻 = 4;
      } else if (
        era.get(`abl:${target}:10`) >= 2 &&
        (kojo.接吻 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 3（变量语义：CFLAG 族，307）
        kojo.接吻 = 3;
      } else if (kojo.接吻 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:307  = 2（变量语义：CFLAG 族，307）
        kojo.接吻 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 7) {
    if (kojo.自己扒开 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:308  = 1（变量语义：CFLAG 族，TARGET:308）
      kojo.自己扒开 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.自己扒开 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 5（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.自己扒开 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 4（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 4;
      } else if (
        era.get(`abl:${target}:17`) >= 3 &&
        (kojo.自己扒开 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 3（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 3;
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:306  = 2（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 8) {
    if (kojo.插入手指 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`talent:${target}:85`) == 1
      ) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:309  = 1（变量语义：CFLAG 族，TARGET:309）
      kojo.插入手指 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.插入手指 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:309  = 5（变量语义：CFLAG 族，309）
        kojo.插入手指 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.插入手指 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:309  = 4（变量语义：CFLAG 族，309）
        kojo.插入手指 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.插入手指 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:309  = 3（变量语义：CFLAG 族，309）
        kojo.插入手指 = 3;
      } else if (kojo.插入手指 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:309  = 2（变量语义：CFLAG 族，309）
        kojo.插入手指 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 9) {
    if (kojo.舔肛 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310）
      kojo.舔肛 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 5（变量语义：CFLAG 族，310）
        kojo.舔肛 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.舔肛 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 4（变量语义：CFLAG 族，310）
        kojo.舔肛 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.舔肛 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 3（变量语义：CFLAG 族，310）
        kojo.舔肛 = 3;
      } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:310  = 2（变量语义：CFLAG 族，310）
        kojo.舔肛 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 10) {
    if (kojo.振动宝石 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`talent:${target}:85`) == 1
      ) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:311  = 1（变量语义：CFLAG 族，TARGET:311）
      kojo.振动宝石 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.振动宝石 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:311  = 5（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.振动宝石 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:311  = 4（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.振动宝石 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:311  = 3（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 3;
      } else if (kojo.振动宝石 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:311  = 2（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 11 && era.get(`tequip:${target}:11`)) {
    if (kojo.壶虫 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      } else {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      }
      // CFLAG:312  = 1（变量语义：CFLAG 族，312）
      kojo.壶虫 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.壶虫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:312  = 5（变量语义：CFLAG 族，312）
        kojo.壶虫 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.壶虫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:312  = 4（变量语义：CFLAG 族，312）
        kojo.壶虫 = 4;
      } else if (
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.壶虫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:312  = 3（变量语义：CFLAG 族，312）
        kojo.壶虫 = 3;
      } else if (kojo.壶虫 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:312  = 2（变量语义：CFLAG 族，312）
        kojo.壶虫 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 11 && era.get(`tequip:${target}:11`) == 0) {
    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.壶虫着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:372  = 3（变量语义：CFLAG 族，372）
      kojo.壶虫着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.壶虫着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:372  = 2（变量语义：CFLAG 族，372）
      kojo.壶虫着脱 = 2;
    } else if (kojo.壶虫着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait('');
      // CFLAG:372  = 1（变量语义：CFLAG 族，372）
      kojo.壶虫着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 12) {
    if (kojo.振动杖 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:313  = 1（变量语义：CFLAG 族，313）
      kojo.振动杖 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.振动杖 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:313  = 5（变量语义：CFLAG 族，313）
        kojo.振动杖 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.振动杖 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:313  = 4（变量语义：CFLAG 族，313）
        kojo.振动杖 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.振动杖 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:313  = 3（变量语义：CFLAG 族，313）
        kojo.振动杖 = 3;
      } else if (kojo.振动杖 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:313  = 2（变量语义：CFLAG 族，313）
        kojo.振动杖 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 13 && era.get(`tequip:${target}:13`)) {
    if (kojo.肛门虫 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:314  = 1（变量语义：CFLAG 族，TARGET:314）
      kojo.肛门虫 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:314  = 6（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.肛门虫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:314  = 6（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:314  = 5（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.肛门虫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:314  = 4（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:314  = 3（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 3;
      } else if (kojo.肛门虫 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:314  = 2（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 13 && era.get(`tequip:${target}:13`) == 0) {
    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.肛门虫着脱 < 4 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:374  = 4（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 4;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.肛门虫着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:374  = 3（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 3;
    } else if (
      era.get(`abl:${target}:3`) >= 3 &&
      (kojo.肛门虫着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:374  = 2（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 2;
    } else if (kojo.肛门虫着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait('');
      // CFLAG:374  = 1（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 17 && era.get(`tequip:${target}:17`)) {
    if (kojo.飞机杯 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:318  = 1（变量语义：CFLAG 族，318）
      kojo.飞机杯 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.飞机杯 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:318  = 4（变量语义：CFLAG 族，318）
        kojo.飞机杯 = 4;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.飞机杯 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:318  = 3（变量语义：CFLAG 族，318）
        kojo.飞机杯 = 3;
      } else if (kojo.飞机杯 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:318  = 2（变量语义：CFLAG 族，318）
        kojo.飞机杯 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 17 && era.get(`tequip:${target}:17`) == 0) {
    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.飞机杯着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:378  = 3（变量语义：CFLAG 族，378）
      kojo.飞机杯着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.飞机杯着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:378  = 2（变量语义：CFLAG 族，378）
      kojo.飞机杯着脱 = 2;
    } else if (kojo.飞机杯着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait('');
      // CFLAG:378  = 1（变量语义：CFLAG 族，378）
      kojo.飞机杯着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 19 && era.get(`tequip:${target}:19`)) {
    if (kojo.肛珠 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:320  = 1（变量语义：CFLAG 族，TARGET:320）
      kojo.肛珠 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:320  = 7（变量语义：CFLAG 族，320）
        kojo.肛珠 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.肛珠 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:320  = 6（变量语义：CFLAG 族，320）
        kojo.肛珠 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:320  = 5（变量语义：CFLAG 族，320）
        kojo.肛珠 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.肛珠 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:320  = 4（变量语义：CFLAG 族，320）
        kojo.肛珠 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:320  = 3（变量语义：CFLAG 族，320）
        kojo.肛珠 = 3;
      } else if (kojo.肛珠 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:320  = 2（变量语义：CFLAG 族，320）
        kojo.肛珠 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 19 && era.get(`tequip:${target}:19`) == 0) {
    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.肛珠着脱 < 4 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:379  = 4（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 4;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.肛珠着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:379  = 3（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 3;
    } else if (
      era.get(`abl:${target}:3`) >= 3 &&
      (kojo.肛珠着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:379  = 2（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 2;
    } else if (kojo.肛珠着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait('');
      // CFLAG:379  = 1（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 20) {
    if (kojo.正常位 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (
          era.get(`talent:${target}:85`) == 1 &&
          era.get(`abl:${target}:10`) >= 5
        ) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      } else {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      }
      // CFLAG:321  = 1（变量语义：CFLAG 族，321）
      kojo.正常位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.正常位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:321  = 6（变量语义：CFLAG 族，321）
        kojo.正常位 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.正常位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:321  = 5（变量语义：CFLAG 族，321）
        kojo.正常位 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.正常位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:321  = 4（变量语义：CFLAG 族，321）
        kojo.正常位 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.正常位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:321  = 3（变量语义：CFLAG 族，321）
        kojo.正常位 = 3;
      } else if (kojo.正常位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:321  = 2（变量语义：CFLAG 族，321）
        kojo.正常位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 21) {
    if (kojo.背后位 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      } else {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      }
      // CFLAG:322  = 1（变量语义：CFLAG 族，322）
      kojo.背后位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:322  = 6（变量语义：CFLAG 族，322）
        kojo.背后位 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.背后位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:322  = 5（变量语义：CFLAG 族，322）
        kojo.背后位 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:322  = 4（变量语义：CFLAG 族，322）
        kojo.背后位 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:322  = 3（变量语义：CFLAG 族，322）
        kojo.背后位 = 3;
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');

        // CFLAG:322  = 2（变量语义：CFLAG 族，322）
        kojo.背后位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 22) {
    if (kojo.对面座位 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      } else {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      }
      // CFLAG:323  = 1（变量语义：CFLAG 族，323）
      kojo.对面座位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.对面座位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:323  = 6（变量语义：CFLAG 族，323）
        kojo.对面座位 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.对面座位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:323  = 5（变量语义：CFLAG 族，323）
        kojo.对面座位 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.对面座位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:323  = 4（变量语义：CFLAG 族，323）
        kojo.对面座位 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.对面座位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:323  = 3（变量语义：CFLAG 族，323）
        kojo.对面座位 = 3;
      } else if (kojo.对面座位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:323  = 2（变量语义：CFLAG 族，323）
        kojo.对面座位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 23) {
    if (kojo.背面座位 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      } else {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      }
      // CFLAG:324  = 1（变量语义：CFLAG 族，324）
      kojo.背面座位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.背面座位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:324  = 6（变量语义：CFLAG 族，324）
        kojo.背面座位 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.背面座位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:324  = 5（变量语义：CFLAG 族，324）
        kojo.背面座位 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.背面座位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:324  = 4（变量语义：CFLAG 族，324）
        kojo.背面座位 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.背面座位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:324  = 3（变量语义：CFLAG 族，324）
        kojo.背面座位 = 3;
      } else if (kojo.背面座位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:324  = 2（变量语义：CFLAG 族，324）
        kojo.背面座位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 26) {
    if (kojo.正常位肛交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:327  = 1（变量语义：CFLAG 族，TARGET:327）
      kojo.正常位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:327  = 7（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.正常位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:327  = 6（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:327  = 5（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.正常位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:327  = 4（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:327  = 3（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 3;
      } else if (kojo.正常位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:327  = 2（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 27) {
    if (kojo.背后位肛交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328）
      kojo.背后位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:328  = 5（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:328  = 4（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:328  = 3（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 3;
      } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:328  = 2（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 28) {
    if (kojo.对面座位肛交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:329  = 1（变量语义：CFLAG 族，TARGET:329）
      kojo.对面座位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:329  = 7（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.对面座位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:329  = 6（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:329  = 5（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.对面座位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:329  = 4（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:329  = 3（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 3;
      } else if (kojo.对面座位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:329  = 2（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 29) {
    if (kojo.背面座位肛交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:330  = 1（变量语义：CFLAG 族，TARGET:330）
      kojo.背面座位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:330  = 7（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.背面座位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:330  = 6（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:330  = 5（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.背面座位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:330  = 4（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:330  = 3（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 3;
      } else if (kojo.背面座位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:330  = 2（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 30) {
    if (kojo.手淫 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331）
      kojo.手淫 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:331  = 6（变量语义：CFLAG 族，331）
        kojo.手淫 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.手淫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:331  = 5（变量语义：CFLAG 族，331）
        kojo.手淫 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:331  = 4（变量语义：CFLAG 族，331）
        kojo.手淫 = 4;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:331  = 3（变量语义：CFLAG 族，331）
        kojo.手淫 = 3;
      } else if (kojo.手淫 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:331  = 2（变量语义：CFLAG 族，331）
        kojo.手淫 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 31) {
    if (kojo.口交_奴 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332）
      kojo.口交_奴 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:332  = 6（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:332  = 5（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.print('');
        await era.printAndWait('');
        // CFLAG:332  = 4（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.口交_奴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.print('');
        await era.printAndWait('');
        // CFLAG:332  = 3（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 3;
      } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:332  = 2（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 32) {
    if (kojo.乳交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:333  = 1（变量语义：CFLAG 族，TARGET:333）
      kojo.乳交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:333  = 6（变量语义：CFLAG 族，333）
        kojo.乳交 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.口交_奴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:333  = 5（变量语义：CFLAG 族，333）
        kojo.乳交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.乳交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:333  = 4（变量语义：CFLAG 族，333）
        kojo.乳交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.乳交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:333  = 3（变量语义：CFLAG 族，333）
        kojo.乳交 = 3;
      } else if (kojo.乳交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:333  = 2（变量语义：CFLAG 族，333）
        kojo.乳交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 33) {
    if (kojo.股间性交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:334  = 1（变量语义：CFLAG 族，TARGET:334）
      kojo.股间性交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:0`) == 1 &&
        (kojo.股间性交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:334  = 6（变量语义：CFLAG 族，334）
        kojo.股间性交 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.股间性交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:334  = 5（变量语义：CFLAG 族，334）
        kojo.股间性交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`talent:${target}:0`) == 1 &&
        (kojo.股间性交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        await era.printAndWait('');
        // CFLAG:334  = 4（变量语义：CFLAG 族，334）
        kojo.股间性交 = 4;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.股间性交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        await era.printAndWait('');
        // CFLAG:334  = 3（变量语义：CFLAG 族，334）
        kojo.股间性交 = 3;
      } else if (kojo.股间性交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:334  = 2（变量语义：CFLAG 族，334）
        kojo.股间性交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 34) {
    if (kojo.骑乘位 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      } else {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      }
      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335）
      kojo.骑乘位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
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
        // CFLAG:335  = 6（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
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
        // CFLAG:335  = 5（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
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
        // CFLAG:335  = 4（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.骑乘位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.print('');
        await era.printAndWait('');
        // CFLAG:335  = 3（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 3;
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:335  = 2（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 35) {
    if (kojo.全身擦洗 == 0) {
      if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:336  = 1（变量语义：CFLAG 族，TARGET:336）
      kojo.全身擦洗 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.全身擦洗 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:336  = 5（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.全身擦洗 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:336  = 4（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.全身擦洗 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:336  = 3（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 3;
      } else if (kojo.全身擦洗 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:336  = 2（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 36) {
    if (kojo.骑乘位肛交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:337  = 1（变量语义：CFLAG 族，TARGET:337）
      kojo.骑乘位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:337  = 7（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.骑乘位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:337  = 6（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:337  = 5（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:337  = 4（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:337  = 3（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 3;
      } else if (kojo.骑乘位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:337  = 2（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 37) {
    if (kojo.肛门侍奉 == 0) {
      if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338）
      kojo.肛门侍奉 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:338  = 5（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.print('');
        // CFLAG:338  = 4（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:338  = 3（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 3;
      } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:338  = 2（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 40) {
    if (kojo.打屁股 == 0) {
      await era.printAndWait('');
      // CFLAG:TARGET:341  = 1（变量语义：CFLAG 族，TARGET:341）
      kojo.打屁股 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.打屁股 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:341  = 5（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.打屁股 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:341  = 4（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 4;
        return 0;
      } else if (
        era.get(`mark:${target}:0`) == 3 &&
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.打屁股 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:341  = 3（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 3;
        return 0;
      } else if (kojo.打屁股 <= 1 && game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:TARGET:341  = 2（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 41) {
    if (kojo.鞭 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:342  = 1（变量语义：CFLAG 族，TARGET:342）
      kojo.鞭 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.鞭 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:342  = 9（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:342  = 8（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.鞭 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:342  = 7（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.鞭 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:342  = 6（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:342  = 5（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.鞭 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:342  = 4（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:342  = 3（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 3;
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:TARGET:342  = 2（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 42) {
    if (kojo.针 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:343  = 1（变量语义：CFLAG 族，TARGET:343）
      kojo.针 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.针 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:343  = 9（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:343  = 8（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.针 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:343  = 7（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.针 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:343  = 6（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:343  = 5（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.针 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:343  = 4（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:343  = 3（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 3;
      } else if (kojo.针 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:TARGET:343  = 2（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 43 && era.get(`tequip:${target}:43`)) {
    if (kojo.眼罩 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344）
      kojo.眼罩 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.眼罩 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.眼罩 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 3;
      } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 43 && era.get(`tequip:${target}:43`) == 0) {
    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.眼罩着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:380  = 3（变量语义：CFLAG 族，380）
      kojo.眼罩着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.眼罩着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:380  = 2（变量语义：CFLAG 族，380）
      kojo.眼罩着脱 = 2;
    } else if (kojo.眼罩着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait('');
      // CFLAG:380  = 1（变量语义：CFLAG 族，380）
      kojo.眼罩着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 44 && era.get(`tequip:${target}:44`)) {
    if (kojo.绳子 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:345  = 1（变量语义：CFLAG 族，TARGET:345）
      kojo.绳子 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.绳子 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:345  = 9（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:345  = 8（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.绳子 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:345  = 7（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.绳子 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:345  = 6（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:345  = 5（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.绳子 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:345  = 4（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:345  = 3（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 3;
      } else if (kojo.绳子 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:TARGET:345  = 2（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 44 && era.get(`tequip:${target}:44`) == 0) {
    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:385  = 2（变量语义：CFLAG 族，385）
      kojo.绳子着脱 = 2;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:385  = 2（变量语义：CFLAG 族，385）
      kojo.绳子着脱 = 2;
    } else if (kojo.绳子着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait('');
      // CFLAG:385  = 1（变量语义：CFLAG 族，385）
      kojo.绳子着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 45 && era.get(`tequip:${target}:45`)) {
    if (kojo.口塞 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:346  = 1（变量语义：CFLAG 族，TARGET:346）
      kojo.口塞 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.口塞 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:346  = 9（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:346  = 8（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.口塞 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:346  = 7（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.口塞 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:346  = 6（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:346  = 5（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.口塞 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:346  = 4（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:346  = 3（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 3;
      } else if (kojo.口塞 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:TARGET:346  = 2（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 45 && era.get(`tequip:${target}:45`) == 0) {
    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.口塞着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:386  = 3（变量语义：CFLAG 族，386）
      kojo.口塞着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.口塞着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:386  = 2（变量语义：CFLAG 族，386）
      kojo.口塞着脱 = 2;
    } else if (kojo.口塞着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait('');
      // CFLAG:386  = 1（变量语义：CFLAG 族，386）
      kojo.口塞着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 46 && era.get(`tequip:${target}:46`)) {
    if (kojo.灌肠肛塞 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:347  = 1（变量语义：CFLAG 族，TARGET:347）
      kojo.灌肠肛塞 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.灌肠肛塞 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:347  = 7（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.灌肠肛塞 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:347  = 6（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.灌肠肛塞 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:347  = 5（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.灌肠肛塞 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:347  = 4（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.灌肠肛塞 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:347  = 3（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 3;
      } else if (kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:347  = 2（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 55) {
    if (kojo.放置PLAY == 0) {
      if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:356  = 1（变量语义：CFLAG 族，356）
      kojo.放置PLAY = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`palam:${target}:5`) >= PALAMLV[3] &&
        (kojo.放置PLAY <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:356  = 4（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 4;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.放置PLAY <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:356  = 3（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 3;
      } else if (kojo.放置PLAY <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:356  = 2（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 56) {
    if (kojo.交谈 == 0) {
      if (era.get(`tequip:${target}:53`)) {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      } else {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      }
      // CFLAG:357  = 1（变量语义：CFLAG 族，357）
      kojo.交谈 = 1;
      return 0;
    } else {
      if (era.get(`tequip:${target}:53`)) {
        if (
          era.get(`talent:${target}:76`) == 1 &&
          (kojo.交谈 <= 3 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait('');
          // CFLAG:357  = 4（变量语义：CFLAG 族，357）
          kojo.交谈 = 4;
        } else if (
          era.get(`talent:${target}:85`) == 1 &&
          (kojo.交谈 <= 2 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait('');
          // CFLAG:357  = 3（变量语义：CFLAG 族，357）
          kojo.交谈 = 3;
        } else if (kojo.交谈 <= 1 || game.kojo.口上开关 == 2) {
          await era.printAndWait('');
          // CFLAG:357  = 2（变量语义：CFLAG 族，357）
          kojo.交谈 = 2;
        }
      } else {
        if (
          era.get(`talent:${target}:85`) == 1 &&
          (kojo.交谈 <= 3 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait('');
          // CFLAG:357  = 4（变量语义：CFLAG 族，357）
          kojo.交谈 = 4;
        } else if (
          era.get(`talent:${target}:85`) == 1 &&
          (kojo.交谈 <= 2 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait('');
          // CFLAG:357  = 3（变量语义：CFLAG 族，357）
          kojo.交谈 = 3;
        } else if (kojo.交谈 <= 1 || game.kojo.口上开关 == 2) {
          await era.printAndWait('');
          // CFLAG:357  = 2（变量语义：CFLAG 族，357）
          kojo.交谈 = 2;
        }
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 123) {
    if (kojo.乳夹口交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:360  = 1（变量语义：CFLAG 族，TARGET:360）
      kojo.乳夹口交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.乳夹口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:360  = 5（变量语义：CFLAG 族，360）
        kojo.乳夹口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.乳夹口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:360  = 4（变量语义：CFLAG 族，360）
        kojo.乳夹口交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.乳夹口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:360  = 3（变量语义：CFLAG 族，360）
        kojo.乳夹口交 = 3;
      } else if (kojo.乳夹口交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:360  = 2（变量语义：CFLAG 族，360）
        kojo.乳夹口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 114) {
    if (kojo.口交时自慰 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:361  = 1（变量语义：CFLAG 族，TARGET:361）
      kojo.口交时自慰 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.口交时自慰 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:361  = 5（变量语义：CFLAG 族，361）
        kojo.口交时自慰 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.口交时自慰 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:361  = 4（变量语义：CFLAG 族，361）
        kojo.口交时自慰 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.口交时自慰 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:361  = 3（变量语义：CFLAG 族，361）
        kojo.口交时自慰 = 3;
      } else if (kojo.口交时自慰 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:361  = 2（变量语义：CFLAG 族，361）
        kojo.口交时自慰 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 126) {
    if (kojo.手搓口交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:362  = 1（变量语义：CFLAG 族，TARGET:362）
      kojo.手搓口交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.手搓口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:362  = 5（变量语义：CFLAG 族，362）
        kojo.手搓口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.手搓口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:362  = 4（变量语义：CFLAG 族，362）
        kojo.手搓口交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手搓口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:362  = 3（变量语义：CFLAG 族，362）
        kojo.手搓口交 = 3;
      } else if (kojo.手搓口交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:362  = 2（变量语义：CFLAG 族，362）
        kojo.手搓口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 127) {
    if (kojo.真空口交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:363  = 1（变量语义：CFLAG 族，TARGET:363）
      kojo.真空口交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.真空口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:363  = 5（变量语义：CFLAG 族，363）
        kojo.真空口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.真空口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:363  = 4（变量语义：CFLAG 族，363）
        kojo.真空口交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.真空口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // CFLAG:363  = 3（变量语义：CFLAG 族，363）
        kojo.真空口交 = 3;
      } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:363  = 2（变量语义：CFLAG 族，363）
        kojo.真空口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 69) {
    if (kojo.六九式 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:364  = 1（变量语义：CFLAG 族，TARGET:364）
      kojo.六九式 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.六九式 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:364  = 5（变量语义：CFLAG 族，364）
        kojo.六九式 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.六九式 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:364  = 4（变量语义：CFLAG 族，364）
        kojo.六九式 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.六九式 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:364  = 3（变量语义：CFLAG 族，364）
        kojo.六九式 = 3;
      } else if (kojo.六九式 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:364  = 2（变量语义：CFLAG 族，364）
        kojo.六九式 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 124) {
    if (kojo.深喉 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:365  = 1（变量语义：CFLAG 族，TARGET:365）
      kojo.深喉 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.真空口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:365  = 5（变量语义：CFLAG 族，365）
        kojo.深喉 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.真空口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:365  = 4（变量语义：CFLAG 族，365）
        kojo.深喉 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.真空口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:365  = 3（变量语义：CFLAG 族，365）
        kojo.深喉 = 3;
      } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:365  = 2（变量语义：CFLAG 族，365）
        kojo.深喉 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 80) {
    if (kojo.强制口交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:381  = 1（变量语义：CFLAG 族，TARGET:381）
      kojo.强制口交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.强制口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:381  = 5（变量语义：CFLAG 族，381）
        kojo.强制口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.强制口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:381  = 4（变量语义：CFLAG 族，381）
        kojo.强制口交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.强制口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:381  = 3（变量语义：CFLAG 族，381）
        kojo.强制口交 = 3;
      } else if (kojo.强制口交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:381  = 2（变量语义：CFLAG 族，381）
        kojo.强制口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 87) {
    const P = piercing_state.p; // 跨 CALL TRAIN_MESSAGE_B 存活的全局单字母变量 P（com87() 写入，见 piercing-state.js，K7/K10 同款先例）

    if (kojo.穿环 == 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:76`) == 1) {
        if (chara(target).train.穿环状态 & P) {
          await era.printAndWait('');

          if (P == 1) {
            await era.printAndWait('');
          } else if (P == 2) {
            await era.printAndWait('');
          } else if (P == 4) {
            await era.printAndWait('');
          } else if (P == 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
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
      } else if (era.get(`talent:${target}:85`) == 1) {
        if (chara(target).train.穿环状态 & P) {
          await era.printAndWait('');

          if (P == 1) {
            await era.printAndWait('');
          } else if (P == 2) {
            await era.printAndWait('');
          } else if (P == 4) {
            await era.printAndWait('');
          } else if (P == 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
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
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
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
      // CFLAG:TARGET:348  = 1（变量语义：CFLAG 族，TARGET:348）
      kojo.穿环 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait('');
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
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
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
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
        // CFLAG:348  = 4（变量语义：CFLAG 族，348）
        kojo.穿环 = 4;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
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
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
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
        // CFLAG:348  = 3（变量语义：CFLAG 族，348）
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
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
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
        // CFLAG:348  = 2（变量语义：CFLAG 族，348）
        kojo.穿环 = 2;
      }
    }
    return 0;
  }
}

/**
 * @DOG_KOJO_14（:3563-4366）：兽奸专用口上（KOJO_MESSAGE_COM_14 的
 * TEQUIP:89 守卫 CALL 的本地函数，不进 family）。
 *
 * 空模板骨架：SELECTCOM 0-10 等分支保留完整状态机与 CFLAG 计数器写入，
 * PRINTFORMW 全空（155 处）。
 */
async function dog_kojo_14(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const kojo = chara(target).kojo;

  if (era_flag.selectcom == 0) {
    if (kojo.爱抚 == 0) {
      if (era.get(`mark:${target}:2`) >= 2) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:301  = 1（变量语义：CFLAG 族，301）
      kojo.爱抚 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        (kojo.爱抚 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:301  = 7（变量语义：CFLAG 族，301）
        kojo.爱抚 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:301  = 6（变量语义：CFLAG 族，301）
        kojo.爱抚 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:301  = 5（变量语义：CFLAG 族，301）
        kojo.爱抚 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:301  = 4（变量语义：CFLAG 族，301）
        kojo.爱抚 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 2 &&
        (kojo.爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:301  = 3（变量语义：CFLAG 族，301）
        kojo.爱抚 = 3;
      } else if (
        era.get(`mark:${target}:2`) <= 1 &&
        (kojo.爱抚 <= 1 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:301  = 2（变量语义：CFLAG 族，301）
        kojo.爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 1) {
    if (kojo.舔阴 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:302  = 1（变量语义：CFLAG 族，302）
      kojo.舔阴 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        (kojo.舔阴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:302  = 6（变量语义：CFLAG 族，302）
        kojo.舔阴 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.舔阴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:302  = 5（变量语义：CFLAG 族，302）
        kojo.舔阴 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.舔阴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:302  = 4（变量语义：CFLAG 族，302）
        kojo.舔阴 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.舔阴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:302  = 3（变量语义：CFLAG 族，302）
        kojo.舔阴 = 3;
      } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:302  = 2（变量语义：CFLAG 族，302）
        kojo.舔阴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 5) {
    if (kojo.胸爱抚 == 0) {
      if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306）
      kojo.胸爱抚 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        (kojo.胸爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 6（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 5（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 4（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 4;
      } else if (
        era.get(`abl:${target}:1`) >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 3（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 3;
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:306  = 2（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 6) {
    if (kojo.接吻 == 0 && game.train.初吻与自我口上) {
      if (era.get(`talent:${target}:136`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      kojo.接吻 = 1;
      return 0;
    } else if (kojo.接吻 == 0) {
      if (era.get(`talent:${target}:136`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      kojo.接吻 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        (kojo.接吻 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 6（变量语义：CFLAG 族，307）
        kojo.接吻 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.接吻 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 5（变量语义：CFLAG 族，307）
        kojo.接吻 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.接吻 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 4（变量语义：CFLAG 族，307）
        kojo.接吻 = 4;
      } else if (
        era.get(`abl:${target}:10`) >= 2 &&
        (kojo.接吻 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 3（变量语义：CFLAG 族，307）
        kojo.接吻 = 3;
      } else if (kojo.接吻 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:307  = 2（变量语义：CFLAG 族，307）
        kojo.接吻 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 9) {
    if (kojo.舔肛 == 0) {
      if (era.get(`talent:${target}:136`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310）
      kojo.舔肛 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        (kojo.舔肛 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 6（变量语义：CFLAG 族，310）
        kojo.舔肛 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 5（变量语义：CFLAG 族，310）
        kojo.舔肛 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.舔肛 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 4（变量语义：CFLAG 族，310）
        kojo.舔肛 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.舔肛 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 3（变量语义：CFLAG 族，310）
        kojo.舔肛 = 3;
      } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:310  = 2（变量语义：CFLAG 族，310）
        kojo.舔肛 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 21) {
    if (kojo.背后位 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        if (era.get(`talent:${target}:136`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      } else {
        if (era.get(`talent:${target}:136`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      }
      // CFLAG:322  = 1（变量语义：CFLAG 族，322）
      kojo.背后位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        (kojo.背后位 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:322  = 7（变量语义：CFLAG 族，322）
        kojo.背后位 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:322  = 6（变量语义：CFLAG 族，322）
        kojo.背后位 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.背后位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:322  = 5（变量语义：CFLAG 族，322）
        kojo.背后位 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:322  = 4（变量语义：CFLAG 族，322）
        kojo.背后位 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:322  = 3（变量语义：CFLAG 族，322）
        kojo.背后位 = 3;
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');

        // CFLAG:322  = 2（变量语义：CFLAG 族，322）
        kojo.背后位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 27) {
    if (kojo.背后位肛交 == 0) {
      if (era.get(`talent:${target}:136`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328）
      kojo.背后位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:328  = 7（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:328  = 6（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:328  = 5（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:328  = 4（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:328  = 3（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 3;
      } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:328  = 2（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 30) {
    if (kojo.手淫 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331）
      kojo.手淫 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:331  = 7（变量语义：CFLAG 族，331）
        kojo.手淫 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:331  = 6（变量语义：CFLAG 族，331）
        kojo.手淫 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.手淫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:331  = 5（变量语义：CFLAG 族，331）
        kojo.手淫 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:331  = 4（变量语义：CFLAG 族，331）
        kojo.手淫 = 4;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:331  = 3（变量语义：CFLAG 族，331）
        kojo.手淫 = 3;
      } else if (kojo.手淫 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:331  = 2（变量语义：CFLAG 族，331）
        kojo.手淫 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 31) {
    if (kojo.口交_奴 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332）
      kojo.口交_奴 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:332  = 7（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:332  = 6（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.口交_奴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:332  = 5（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.print('');
        await era.printAndWait('');
        // CFLAG:332  = 4（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.口交_奴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.print('');
        await era.printAndWait('');
        // CFLAG:332  = 3（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 3;
      } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:332  = 2（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 34) {
    if (kojo.骑乘位 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        if (era.get(`talent:${target}:136`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      } else {
        if (era.get(`talent:${target}:136`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      }
      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335）
      kojo.骑乘位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        (kojo.骑乘位 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:335  = 7（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
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
        // CFLAG:335  = 6（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
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
        // CFLAG:335  = 5（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
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
        // CFLAG:335  = 4（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.骑乘位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.print('');
        await era.printAndWait('');
        // CFLAG:335  = 3（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 3;
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:335  = 2（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 37) {
    if (kojo.肛门侍奉 == 0) {
      if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338）
      kojo.肛门侍奉 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:338  = 6（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:338  = 5（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.print('');
        // CFLAG:338  = 4（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:338  = 3（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 3;
      } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:338  = 2（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 43 && era.get(`tequip:${target}:43`)) {
    if (kojo.眼罩 == 0) {
      if (era.get(`talent:${target}:136`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344）
      kojo.眼罩 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        (kojo.眼罩 <= 9 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 10（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 10;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.眼罩 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.眼罩 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 3;
      } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 43 && era.get(`tequip:${target}:43`) == 0) {
    if (
      era.get(`talent:${target}:136`) == 1 &&
      (kojo.肛门侍奉 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:444  = 4（变量语义：CFLAG 族，444）
      kojo.兽奸眼罩 = 4;
    } else if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.肛门侍奉 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:444  = 3（变量语义：CFLAG 族，444）
      kojo.兽奸眼罩 = 3;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.肛门侍奉 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:444  = 2（变量语义：CFLAG 族，444）
      kojo.兽奸眼罩 = 2;
    } else if (kojo.兽奸眼罩 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait('');
      // CFLAG:444  = 1（变量语义：CFLAG 族，444）
      kojo.兽奸眼罩 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 56) {
    if (kojo.交谈 == 0) {
      if (era.get(`tequip:${target}:53`)) {
        if (era.get(`talent:${target}:136`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      }
      // CFLAG:357  = 1（变量语义：CFLAG 族，357）
      kojo.交谈 = 1;
      return 0;
    } else {
      if (era.get(`tequip:${target}:53`)) {
        if (
          era.get(`talent:${target}:136`) == 1 &&
          (kojo.交谈 <= 4 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait('');
          // CFLAG:357  = 5（变量语义：CFLAG 族，357）
          kojo.交谈 = 5;
        } else if (
          era.get(`talent:${target}:76`) == 1 &&
          (kojo.交谈 <= 3 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait('');
          // CFLAG:357  = 4（变量语义：CFLAG 族，357）
          kojo.交谈 = 4;
        } else if (
          era.get(`talent:${target}:85`) == 1 &&
          (kojo.交谈 <= 2 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait('');
          // CFLAG:357  = 3（变量语义：CFLAG 族，357）
          kojo.交谈 = 3;
        } else if (kojo.交谈 <= 1 || game.kojo.口上开关 == 2) {
          await era.printAndWait('');
          // CFLAG:357  = 2（变量语义：CFLAG 族，357）
          kojo.交谈 = 2;
        }
      }
      return 0;
    }
  }

  return 0;
}

/**
 * @KOJO_MESSAGE_PALAMCNG_14（:4368-4564）：参数变动口上（CFLAG:221-230
 * 首次超 Lv2/绝顶/处女丧失 事件口上）。本地 P/A 变量由复核补声明（:4385/
 * :4412/:4439/:4454/:4531，见文件头转译器 review 清单）。空模板（1 处填
 * 空除外），保留计数器写入。
 */
async function kojo_message_palamcng_14(rand) {
  void rand;
  const target = era_flag.target;
  const kojo = chara(target).kojo;

  if (era.get(`tequip:${target}:45`)) {
    return 0;
  }

  if (game.train.失神) {
    return 0;
  }

  // 赋值 P = PALAM:3 + UP:3
  const P1 = chara(target).train.润滑 + chara(target).train.润滑增量;
  if (P1 > PALAMLV[2] && kojo.首次润滑Lv2 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
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
    // CFLAG:TARGET:221  = 1（变量语义：CFLAG 族，TARGET:221）
    kojo.首次润滑Lv2 = 1;
  }

  // 赋值 P1 = PALAM:5 + UP:5
  const P2 = chara(target).train.欲情 + chara(target).train.欲情增量;
  if (P2 > PALAMLV[2] && kojo.首次欲情Lv2 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
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
    // CFLAG:222  = 1（变量语义：CFLAG 族，222）
    kojo.首次欲情Lv2 = 1;
  }

  // 赋值 P2 = PALAM:8 + UP:8
  const P3 = chara(target).train.耻情 + chara(target).train.耻情增量;
  if (P3 > PALAMLV[2] && kojo.首次耻情Lv2 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    // CFLAG:223  = 1（变量语义：CFLAG 族，223）
    kojo.首次耻情Lv2 = 1;
  }

  // 赋值 P3 = PALAM:10 + UP:10
  const P4 = chara(target).train.恐怖 + chara(target).train.恐怖增量;
  if (P4 > PALAMLV[2] && kojo.首次恐怖Lv2 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    // CFLAG:224  = 1（变量语义：CFLAG 族，224）
    kojo.首次恐怖Lv2 = 1;
  }

  if (era.get(`nowex:${target}:0`) > 0 && kojo.首次C绝顶_K14 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    // CFLAG:214  = 1（变量语义：CFLAG 族，214）
    kojo.首次C绝顶_K14 = 1;
  }

  if (era.get(`nowex:${target}:1`) > 0 && kojo.首次V绝顶 == 0) {
    if (era.get(`talent:${target}:76`) == 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    // CFLAG:TARGET:226  = 1（变量语义：CFLAG 族，TARGET:226）
    kojo.首次V绝顶 = 1;
  }

  if (era.get(`nowex:${target}:2`) > 0 && kojo.首次A绝顶 == 0) {
    if (era.get(`talent:${target}:76`) == 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait('');
    } else {
      await era.printAndWait(`「咕……啊啊」`);
    }
    // CFLAG:227  = 1（变量语义：CFLAG 族，227）
    kojo.首次A绝顶 = 1;
  }

  if (era.get(`nowex:${target}:3`) > 0 && kojo.首次B绝顶 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    // CFLAG:TARGET:228  = 1（变量语义：CFLAG 族，TARGET:228）
    kojo.首次B绝顶 = 1;
  }

  // 赋值 A = UP:11 + UP:12
  const A =
    (era.get(`delta:${target}:11`) || 0) + (era.get(`delta:${target}:12`) || 0);
  if (game.train.处女丧失 == 1 && kojo.处女丧失 == 0) {
    if (game.train.主人导致处女丧失 == 1) {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (A < 500 || game.system.反抗刻印回避 == 1)
      ) {
        await era.printAndWait('');
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (A < 500 || game.system.反抗刻印回避 == 1)
      ) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
    } else {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
    }
    // CFLAG:TARGET:229  = 1（变量语义：CFLAG 族，TARGET:229）
    kojo.处女丧失 = 1;
  }
}

/**
 * @KOJO_MESSAGE_MARKCNG_14（:4566-4627）：刻印变动口上（TFLAG:21-24 == 3
 * 时各首次 Lv3 事件）。空模板骨架。
 */
async function kojo_message_markcng_14(rand) {
  void rand;
  const target = era_flag.target;
  const kojo = chara(target).kojo;

  if (era.get(`tequip:${target}:45`)) {
    return 0;
  }

  if (game.system.苦痛刻印变动 == 3 && kojo.苦痛刻印Lv3 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    // CFLAG:297  = 1（变量语义：CFLAG 族，297）
    kojo.苦痛刻印Lv3 = 1;
  }

  if (game.system.快乐刻印变动 == 3 && kojo.快乐刻印Lv3 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    // CFLAG:298  = 1（变量语义：CFLAG 族，298）
    kojo.快乐刻印Lv3 = 1;
  }

  if (game.system.屈服刻印变动 == 3 && kojo.屈服刻印Lv3 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    // CFLAG:299  = 1（变量语义：CFLAG 族，299）
    kojo.屈服刻印Lv3 = 1;
  }

  if (game.system.反抗刻印变动 == 3 && kojo.反抗刻印Lv3 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    // CFLAG:300  = 1（变量语义：CFLAG 族，300）
    kojo.反抗刻印Lv3 = 1;
  }
}

/**
 * @SELF_KOJO_K14（:4629-4882）：调教后自慰/百合/朝口交/调教后性交/夜袭/
 * 卖却/妊娠发觉/生产/育儿室/亲离/死亡/寿命 十二支（TFLAG:13 分派）——
 * 空模板骨架。Q 由调用方传入（AFTERTRAIN_MASTURBATION_CHECK 的
 * Q==1 百合/ Q==2 野犬 判定）。
 */
async function self_kojo_k14(rand, q) {
  void rand;
  const target = era_flag.target;
  const kojo = chara(target).kojo;
  let Q = q;

  if (game.train.初吻与自我口上 == 1) {
    if (era.get(`talent:${target}:9`) == 1) {
      await era.printAndWait('');
    } else if (Q == 1) {
      await era.printAndWait('');
    } else if (Q == 2) {
      await era.printAndWait('');
    } else {
      if (
        era.get(`talent:${target}:76`) &&
        (kojo.调教后自慰 < 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:261  = 4（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 4;
      } else if (
        era.get(`talent:${target}:85`) &&
        (kojo.调教后自慰 < 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:261  = 3（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 3;
      } else if (
        era.get(`abl:${target}:31`) >= 3 &&
        (kojo.调教后自慰 < 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:261  = 2（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 2;
      } else if (kojo.调教后自慰 < 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:261  = 1（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 1;
      }
    }
  }

  if (game.train.初吻与自我口上 == 2) {
    if (
      era.get(`talent:${target}:76`) &&
      (kojo.百合PLAY < 5 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:262  = 5（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 5;
    } else if (
      era.get(`talent:${target}:85`) &&
      (kojo.百合PLAY < 4 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:262  = 4（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 4;
    } else if (
      era.get(`abl:${target}:33`) >= 3 &&
      (kojo.百合PLAY < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:262  = 3（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 3;
    } else if (
      era.get(`abl:${target}:22`) >= 3 &&
      (kojo.百合PLAY < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:262  = 2（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 2;
    } else if (kojo.百合PLAY < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait('');
      // CFLAG:262  = 1（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 1;
    }
  }

  if (game.train.初吻与自我口上 == 3) {
    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.朝口交 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:263  = 3（变量语义：CFLAG 族，263）
      kojo.朝口交 = 3;
    } else if (
      era.get(`talent:${target}:85`) &&
      (kojo.朝口交 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:263  = 3（变量语义：CFLAG 族，263）
      kojo.朝口交 = 3;
    } else if (
      era.get(`abl:${target}:16`) >= 5 &&
      (kojo.朝口交 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:263  = 2（变量语义：CFLAG 族，263）
      kojo.朝口交 = 2;
    } else if (kojo.朝口交 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait('');
      // CFLAG:263  = 1（变量语义：CFLAG 族，263）
      kojo.朝口交 = 1;
    }
  }

  if (game.train.初吻与自我口上 == 4) {
    if (
      era.get(`abl:${target}:2`) >= 4 &&
      (kojo.调教后性交 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:264  = 2（变量语义：CFLAG 族，264）
      kojo.调教后性交 = 2;
    } else if (kojo.调教后性交 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait('');
      // CFLAG:264  = 1（变量语义：CFLAG 族，264）
      kojo.调教后性交 = 1;
    }
  }

  if (game.train.初吻与自我口上 == 5) {
    if (kojo.夜袭 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait('');
      // CFLAG:265  = 1（变量语义：CFLAG 族，265）
      kojo.夜袭 = 1;
    }
  }

  if (game.train.初吻与自我口上 == 6) {
    if (era.get(`talent:${target}:85`) && era.get(`mark:${target}:3`) < 3) {
      await era.printAndWait('');
    } else if (era.get(`mark:${target}:3`) == 3) {
      await era.printAndWait('');
    } else if (era.get(`talent:${target}:76`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  }

  if (game.train.初吻与自我口上 == 11) {
    if (kojo.妊娠发觉 >= 1) {
      return 0;
    }

    if (era.get(`talent:${target}:9`) == 1) {
      await era.printAndWait('');
    } else if (
      era.get(`talent:${target}:85`) &&
      chara(target).event.妊娠相手 == 1
    ) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    // CFLAG:271  = 1（变量语义：CFLAG 族，271）
    kojo.妊娠发觉 = 1;
  }

  if (game.train.初吻与自我口上 == 12) {
    if (kojo.生产 >= 1) {
      return 0;
    }

    if (era.get(`talent:${target}:9`) == 1) {
      await era.printAndWait('');
    } else if (
      era.get(`talent:${target}:85`) &&
      chara(target).event.妊娠相手 == 1
    ) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    // CFLAG:272  = 1（变量语义：CFLAG 族，272）
    kojo.生产 = 1;
  }

  if (game.train.初吻与自我口上 == 13) {
    if (era.get(`talent:${target}:153`)) {
      await era.printAndWait('');
    } else if (era.get(`talent:${target}:154`)) {
      await era.printAndWait('');
    }
    // CFLAG:273  = 1（变量语义：CFLAG 族，273）
    kojo.育儿室 = 1;
  }

  if (game.train.初吻与自我口上 == 14) {
    await era.printAndWait('');
    // CFLAG:274  = 1（变量语义：CFLAG 族，274）
    kojo.亲离 = 1;
  }

  if (game.train.初吻与自我口上 == 999) {
    if (era.get(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  }

  if (game.train.初吻与自我口上 == 998) {
    if (era.get(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  }

  // TFLAG:13  = 0（变量语义：TFLAG 族，13）
  game.train.初吻与自我口上 = 0;

  return 0;
}

/**
 * @DUNGEON_RYOUZYOKU_K14（:4884-5037）：迷宫凌辱开场口上。空模板骨架
 * （处刑前的一言按 TALENT:0/21/22/17/31/36 等分档）。
 */
async function dungeon_ryouzyoku_k14() {
  const target = era_flag.target;

  if (era.get(`talent:${target}:0`) == 1) {
    await era.printAndWait('');

    if (
      era.get(`talent:${target}:21`) == 1 ||
      era.get(`talent:${target}:22`) == 1
    ) {
      await era.printAndWait('');

      return 0;
    } else if (
      era.get(`talent:${target}:17`) == 1 ||
      era.get(`talent:${target}:31`) == 1 ||
      era.get(`talent:${target}:36`) == 1
    ) {
      await era.printAndWait('');

      if (
        era.get(`talent:${target}:106`) == 1 ||
        era.get(`exp:${target}:1`) > 0
      ) {
        await era.printAndWait('');
      }

      if (era.get(`exp:${target}:22`) > 0) {
        await era.printAndWait('');
      }
    } else if (
      era.get(`talent:${target}:11`) == 1 ||
      era.get(`talent:${target}:12`) == 1 ||
      era.get(`talent:${target}:15`) == 1 ||
      era.get(`talent:${target}:30`) == 1 ||
      era.get(`talent:${target}:34`) == 1
    ) {
      await era.printAndWait('');
    } else if (
      era.get(`talent:${target}:10`) == 1 ||
      era.get(`talent:${target}:26`) == 1
    ) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else {
    await era.printAndWait('');

    if (
      era.get(`talent:${target}:21`) == 1 ||
      era.get(`talent:${target}:22`) == 1
    ) {
      await era.printAndWait('');

      return 0;
    } else if (
      era.get(`talent:${target}:17`) == 1 ||
      era.get(`talent:${target}:31`) == 1 ||
      era.get(`talent:${target}:36`) == 1
    ) {
      await era.printAndWait('');

      if (
        era.get(`talent:${target}:106`) == 1 ||
        era.get(`exp:${target}:1`) > 0
      ) {
        await era.printAndWait('');
      }

      if (era.get(`exp:${target}:22`) > 0) {
        await era.printAndWait('');
      }
    } else if (
      era.get(`talent:${target}:11`) == 1 ||
      era.get(`talent:${target}:12`) == 1 ||
      era.get(`talent:${target}:15`) == 1 ||
      era.get(`talent:${target}:30`) == 1 ||
      era.get(`talent:${target}:34`) == 1
    ) {
      await era.printAndWait('');
    } else if (
      era.get(`talent:${target}:10`) == 1 ||
      era.get(`talent:${target}:26`) == 1
    ) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  }

  return 0;
}

/**
 * @DUNGEON_RYOUZYOKU_AFTER_K14（:4884-5037 内）：迷宫凌辱事后口上。空模板骨架。
 */
async function dungeon_ryouzyoku_after_k14() {
  const target = era_flag.target;

  if (era.get(`talent:${target}:0`) == 1) {
    await era.printAndWait('');

    if (
      era.get(`talent:${target}:21`) == 1 ||
      era.get(`talent:${target}:22`) == 1
    ) {
      await era.printAndWait('');

      return 0;
    }

    if (era.get(`exp:${target}:1`) > 20) {
      await era.printAndWait('');
      await era.printAndWait('');
    }

    if (era.get(`exp:${target}:22`) > 20) {
      await era.printAndWait('');
    }

    if (era.get(`exp:${target}:20`) > 20) {
      await era.printAndWait('');
    }
  } else {
    await era.printAndWait('');

    if (
      era.get(`talent:${target}:21`) == 1 ||
      era.get(`talent:${target}:22`) == 1
    ) {
      await era.printAndWait('');

      return 0;
    }

    if (era.get(`exp:${target}:0`) > 20) {
      await era.printAndWait('');
      await era.printAndWait('');
    }

    if (era.get(`exp:${target}:1`) > 20) {
      await era.printAndWait('');
      await era.printAndWait('');
    }

    if (era.get(`exp:${target}:22`) > 20) {
      await era.printAndWait('');
    }

    if (era.get(`exp:${target}:20`) > 20) {
      await era.printAndWait('');
    }
  }

  return 0;
}

/**
 * @BENKI_KOUJO_K14（:5039-5271）：肉便器行动口上。FLAG:62 十二档（0-12），
 * 仅 FLAG:63==1（常识改写）与野外露出配信（FLAG:62==9）部分档位填了台词
 * （:5160-5175 一带），其余空模板。A = 肉便器对象（era_flag.target）。
 */
async function benki_koujo_k14(rand) {
  void rand;
  const a = era_flag.target;
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%（A）
  const sc = () => self_call(a); // ${sc()}

  if (game.train.肉便器行动 == 0) {
    if (game.dungeon.肉便器常识改写 == 1) {
      await era.printAndWait('');
    } else if (
      era.get(`talent:${target}:122`) &&
      game.dungeon.肉便器常识改写 == 1
    ) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 == 1) {
    if (game.dungeon.肉便器常识改写 == 1) {
      await era.printAndWait('');
    } else if (
      era.get(`talent:${target}:122`) &&
      game.dungeon.肉便器常识改写 == 1
    ) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 == 2) {
    if (game.dungeon.肉便器常识改写 == 1) {
      await era.printAndWait('');
    } else if (
      era.get(`talent:${target}:122`) &&
      game.dungeon.肉便器常识改写 == 1
    ) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 == 3) {
    if (game.dungeon.肉便器常识改写 == 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 == 4) {
    if (game.dungeon.肉便器常识改写 == 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 == 5) {
    if (game.dungeon.肉便器常识改写 == 1) {
      await era.printAndWait('');
    } else if (
      era.get(`talent:${target}:122`) &&
      game.dungeon.肉便器常识改写 == 1
    ) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 == 6) {
    if (game.dungeon.肉便器常识改写 == 1) {
      await era.print('');
    } else if (
      era.get(`talent:${target}:122`) &&
      game.dungeon.肉便器常识改写 == 1
    ) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 == 7) {
    if (game.dungeon.肉便器常识改写 == 1) {
      await era.printAndWait('');
    } else if (
      era.get(`talent:${target}:122`) &&
      game.dungeon.肉便器常识改写 == 1
    ) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 == 9) {
    if (game.dungeon.肉便器常识改写 == 1) {
      await era.printAndWait(`「啊、那个…元冒险者的${target_name}、来着」`);
      await era.printAndWait(
        `「${sc()}败给了伟大的魔王大人…虽然身心都被彻底的玩弄了、但不会就此屈服的！」`,
      );
      await era.printAndWait(
        `「然后啊、今天啊…是要让大家『看看原生态的${sc()}』啊…」`,
      );
      await era.printAndWait(
        `「虽然看『男人的身体』也没啥意思啦…但是${sc()}会竭尽全力的、请好好看着咯♪」`,
      );
    } else if (
      era.get(`talent:${target}:122`) &&
      game.dungeon.肉便器常识改写 == 1
    ) {
      await era.printAndWait(`「啊、那个…元冒险者的${target_name}、来着」`);
      await era.printAndWait(
        `「${sc()}败给了伟大的魔王大人…虽然身心都被彻底的玩弄了、但不会就此屈服的！」`,
      );
      await era.printAndWait(
        `「然后啊、今天啊…是要让大家『看看原生态的${sc()}』啊…」`,
      );
      await era.printAndWait(
        `「虽然看『男人的身体』也没啥意思啦…但是${sc()}会竭尽全力的、请好好看着咯♪」`,
      );
    } else if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 == 12) {
    if (game.dungeon.肉便器常识改写 == 1) {
      await era.printAndWait('');
    } else if (
      era.get(`talent:${target}:122`) &&
      game.dungeon.肉便器常识改写 == 1
    ) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  }

  return 0;
}

/**
 * @DUNGEON_VICTORY_K14（:5273-5326）：迷宫战斗胜利口上。填了台词；按
 * TALENT 分档（無関心/反抗的/臆病等）决胜台词 + 血量判定。A = 参战角色
 * （era_flag.target）。
 */
async function dungeon_victory_k14(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const a = era_flag.target;
  const target = era_flag.target;

  await era.printAndWait('');

  if (
    era.get(`talent:${target}:21`) == 1 ||
    era.get(`talent:${target}:22`) == 1
  ) {
    await era.printAndWait(`「……哈」`);

    return 0;
  } else if (
    era.get(`talent:${target}:11`) == 1 ||
    era.get(`talent:${target}:12`) == 1 ||
    era.get(`talent:${target}:15`) == 1 ||
    era.get(`talent:${target}:30`) == 1 ||
    era.get(`talent:${target}:34`) == 1
  ) {
    if (rand_n(3) == 0) {
      await era.printAndWait(`「……真是污秽」`);
    } else if (rand_n(2) == 0) {
      await era.printAndWait(`「魔力什么的，没有必要」`);
    } else {
      await era.printAndWait(`「消灭了吗」`);
    }
  } else if (
    era.get(`talent:${target}:10`) == 1 ||
    era.get(`talent:${target}:26`) == 1
  ) {
    await era.printAndWait(`「魔的力量、居然强大到了这种地步……」`);

    return 0;
  } else {
    if (rand_n(3) == 0) {
      await era.printAndWait(`「这是光明的胜利！」`);
    } else if (rand_n(2) == 0) {
      await era.printAndWait(`「光明不灭！」`);
    } else {
      await era.printAndWait(`「怎么可能输给不净之物……」`);
    }
  }

  if (
    (era.get(`base:${a}:0`) * 100) / era.get(`maxbase:${a}:0`) < 50 ||
    (era.get(`base:${a}:1`) * 100) / era.get(`maxbase:${a}:1`) < 50
  ) {
    await era.printAndWait(`（果不其然，真是强大……）`);
  } else {
    await era.printAndWait(`「不净的力量，抹杀之」`);
  }

  return 0;
}

/**
 * @DUNGEON_ATTACK_K14（:5327-5411）：迷宫战斗攻击口上。填了台词；按
 * CFLAG:1 侵攻中分档 + TALENT 性格分档。
 */
async function dungeon_attack_k14(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;

  if (chara(target).invasion.状态 == 2) {
    if (
      era.get(`talent:${target}:21`) == 1 ||
      era.get(`talent:${target}:22`) == 1
    ) {
      await era.printAndWait(`「……准备咯」`);

      return 0;
    } else if (
      era.get(`talent:${target}:11`) == 1 ||
      era.get(`talent:${target}:12`) == 1 ||
      era.get(`talent:${target}:15`) == 1 ||
      era.get(`talent:${target}:30`) == 1 ||
      era.get(`talent:${target}:34`) == 1
    ) {
      if (rand_n(3) == 0) {
        await era.printAndWait(`「怪物！」`);
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「不净之物！」`);
      } else {
        await era.printAndWait(`「……消失吧！」`);
      }
    } else if (
      era.get(`talent:${target}:10`) == 1 ||
      era.get(`talent:${target}:26`) == 1
    ) {
      await era.printAndWait(`「切，不净之物……」`);

      return 0;
    } else {
      if (rand_n(3) == 0) {
        await era.printAndWait(`「毁灭吧！」`);
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「可不能输！」`);
      } else {
        await era.printAndWait(`「光明啊！」`);
      }
    }
  } else {
    if (
      era.get(`talent:${target}:21`) == 1 ||
      era.get(`talent:${target}:22`) == 1
    ) {
      await era.printAndWait(`「……准备咯♪」`);

      return 0;
    } else if (
      era.get(`talent:${target}:11`) == 1 ||
      era.get(`talent:${target}:12`) == 1 ||
      era.get(`talent:${target}:15`) == 1 ||
      era.get(`talent:${target}:30`) == 1 ||
      era.get(`talent:${target}:34`) == 1
    ) {
      if (rand_n(3) == 0) {
        await era.printAndWait(`「这就是魔力吗！」`);
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「真是美妙的力量……」`);
      } else {
        await era.printAndWait(`「好强……竟可以强成这样，魔力真是……」`);
      }
    } else if (
      era.get(`talent:${target}:10`) == 1 ||
      era.get(`talent:${target}:26`) == 1
    ) {
      await era.printAndWait(`「切，魔力开始侵蚀了吗……」`);

      return 0;
    } else {
      if (rand_n(3) == 0) {
        await era.printAndWait(`「消失吧！」`);
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「黑暗啊！」`);
      } else {
        await era.printAndWait(`「堕入黑暗吧……」`);
      }
    }
  }

  return 0;
}

/**
 * @COLOSSEUM_KOJO_14（:5416-5519）：死斗场专用口上（KOJO_MESSAGE_COM_14
 * 的 TEQUIP:55 守卫 CALL 的本地函数，不进 family）。SELECTCOM 55/56 分支，
 * 空模板骨架。
 */
async function colosseum_kojo_14(rand) {
  void rand;
  const target = era_flag.target;

  if (era_flag.selectcom == 55) {
    if (era.get(`base:${target}:1`) <= 0) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    return 0;
  }

  if (era_flag.selectcom == 56) {
    if (era.get(`base:${target}:1`) <= 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
    }
    return 0;
  }

  if (era_flag.selectcom == 31) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    return 0;
  }

  if (era_flag.selectcom == 5) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    return 0;
  }

  if (era_flag.selectcom == 21) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait('');
    } else if (game.train.死斗场敌种 == 206) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    return 0;
  }

  if (era_flag.selectcom == 27) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait('');
    } else if (game.train.死斗场敌种 == 206) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    return 0;
  }

  if (era_flag.selectcom == 51) {
    await era.printAndWait('');
    return 0;
  }

  return 0;
}

/**
 * @NTR_KOUJO_K14（:5521-5596）：NTR 再捕获口上。P 由调用方传入（1-7 =
 * NTR 场景编号，20 = 特殊），按 CFLAG:650-657 记录场景已演。空模板骨架。
 * 首行 `SIF CFLAG:650 == 0 → CFLAG:650 = 1`（NTR 总标志开启）。
 */
async function ntr_koujo_k14(rand, P) {
  void rand;
  const target = era_flag.target;
  const kojo = chara(target).kojo;

  if (kojo.NTR再捕获 == 0) {
    // CFLAG:650  = 1（变量语义：CFLAG 族，650）
    kojo.NTR再捕获 = 1;
  }

  if (P == 1) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    // CFLAG:651  = 1（变量语义：CFLAG 族，651）
    kojo.NTR_651 = 1;
  } else if (P == 2) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    // CFLAG:652  = 1（变量语义：CFLAG 族，652）
    kojo.NTR_652 = 1;
  } else if (P == 3) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    // CFLAG:653  = 1（变量语义：CFLAG 族，653）
    kojo.NTR_653 = 1;
  } else if (P == 4) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    // CFLAG:654  = 1（变量语义：CFLAG 族，654）
    kojo.NTR_654 = 1;
  } else if (P == 5) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    // CFLAG:655  = 1（变量语义：CFLAG 族，655）
    kojo.NTR_655 = 1;
  } else if (P == 6) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    // CFLAG:656  = 1（变量语义：CFLAG 族，656）
    kojo.NTR_656 = 1;
  } else if (P == 7) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    // CFLAG:657  = 1（变量语义：CFLAG 族，657）
    kojo.NTR_657 = 1;
  } else if (P == 20) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  }

  return 0;
}

/**
 * @EXUCUTION_KOUJO_K14（:5598-5615）：公开处刑（斩首系）口上。TFLAG:16
 * 分档，空模板骨架。
 */
async function exucution_koujo_k14(rand) {
  void rand;

  if (game.event.犬射精或处刑口上 == 2) {
    await era.printAndWait('');
  } else if (game.event.犬射精或处刑口上 == 5) {
    await era.printAndWait('');
  } else if (game.event.犬射精或处刑口上 == 6) {
    await era.printAndWait('');
  } else if (game.event.犬射精或处刑口上 == 7) {
    await era.printAndWait('');
  }
}

/**
 * @MUSEUM_KOUJO_K14（:5616-5629）：博物馆（陈列）口上。TFLAG:500 分档，
 * 空模板骨架。
 */
async function museum_koujo_k14(rand) {
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

/**
 * @BANISHMENT_KOUJO_K14（:5631-5644）：流放口上。TFLAG:510 分档，空模板骨架。
 */
async function banishment_koujo_k14(rand) {
  void rand;

  if (game.event.流放口上 == 0) {
    await era.printAndWait('');
  } else if (game.event.流放口上 == 1) {
    await era.printAndWait('');
  } else if (game.event.流放口上 == 2) {
    await era.printAndWait('');
  } else if (game.event.流放口上 == 3) {
    await era.printAndWait('');
  }
}

/**
 * @PUBLIC_EXUCUTION_KOUJO_K14（:5646-5683）：公开处刑口上。TFLAG:520 分档，
 * 空模板骨架。
 */
async function public_exucution_koujo_k14(rand) {
  void rand;

  if (game.event.公开处刑口上 == 0) {
    await era.printAndWait('');
  } else if (game.event.公开处刑口上 == 1) {
    await era.printAndWait('');
  } else if (game.event.公开处刑口上 == 2) {
    await era.printAndWait('');
  }
}

/**
 * @GROTESQUE_KOUJO_K14（:5685-5710）：猎奇处刑口上。TFLAG:530 分档，空模板骨架。
 */
async function grotesque_koujo_k14(rand) {
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

/**
 * @ENTERENEMY_KOUJO_K14（:5712-5728）：勇者来袭时的迎击口上（ENTER_ENEMY
 * 调用）。按 TALENT 性格分档，台词已填。
 */
async function enterenemy_koujo_k14(rand) {
  void rand;
  const a = era_flag.target;

  if (era.get(`talent:${a}:21`) == 1 || era.get(`talent:${a}:22`) == 1) {
    await era.printAndWait(`「魔王……」`);
  } else if (
    era.get(`talent:${a}:11`) == 1 ||
    era.get(`talent:${a}:12`) == 1 ||
    era.get(`talent:${a}:15`) == 1 ||
    era.get(`talent:${a}:30`) == 1 ||
    era.get(`talent:${a}:34`) == 1
  ) {
    await era.printAndWait(`「魔王！　不可原谅！」`);
  } else if (era.get(`talent:${a}:10`) == 1 || era.get(`talent:${a}:26`) == 1) {
    await era.printAndWait(`「不可原谅啊，魔王……」`);
  } else {
    await era.printAndWait(`「打个魔王来看看！」`);
  }
}

/**
 * @GOHOUBI_REQUEST_KOUJO_K14（:5730-5767）：迎击战果奖赏请求口上。按
 * CFLAG:A:504（要求奖赏）分档，台词已填（%SAVESTR:A% → chara_callname(a)）。
 */
async function gohoubi_request_koujo_k14(rand) {
  void rand;
  const a = era_flag.target;

  if (chara(a).stronghold.要求奖赏 == 0) {
    await era.printAndWait(`${chara_callname(a)}提出了想要钱当报酬。`);
  } else if (
    chara(a).stronghold.要求奖赏 == 1 ||
    chara(a).stronghold.要求奖赏 == 2 ||
    chara(a).stronghold.要求奖赏 == 3
  ) {
    // 原作是一整行：无后缀 PRINTFORM/PRINT 连续
    // 不换行，末行 PRINTFORMW 才收行。兽名三档的判据（:5739/:5741/:5743）提到
    // 语句外当取值、文本留在输出语句里（保真锁按序核对 ERB 片段，#625）
    const beast_word =
      chara(a).stronghold.要求奖赏 == 1
        ? '狗'
        : chara(a).stronghold.要求奖赏 == 2
          ? '猪'
          : '马';
    await era.printAndWait(
      `${chara_callname(a)}提出了想要和` + beast_word + `进行交配的奖励。`,
    );
  } else if (chara(a).stronghold.要求奖赏 == 4) {
    await era.printAndWait(
      `${chara_callname(a)}提出了回来之后想与你接吻的奖励。`,
    );
  } else if (chara(a).stronghold.要求奖赏 == 5) {
    await era.printAndWait(`${chara_callname(a)}提出了想与你做爱的奖励。`);
  } else if (chara(a).stronghold.要求奖赏 == 6) {
    await era.printAndWait(`${chara_callname(a)}提出了想要精液的奖励。`);
  } else if (chara(a).stronghold.要求奖赏 == 7) {
    await era.printAndWait(`${chara_callname(a)}提出了想要海天盛筵的奖励。`);
  } else if (chara(a).stronghold.要求奖赏 == 8) {
    await era.printAndWait(`${chara_callname(a)}提出了饮用圣水的奖励。`);
  } else if (chara(a).stronghold.要求奖赏 == 9) {
    await era.printAndWait(`${chara_callname(a)}提出了童贞狩猎的奖励。`);
  }
}

/**
 * @GOHOUBI_AFTER_KOUJO_K14（:5768-5846）：战果奖赏口上（TARGET = A 后按
 * GET_KOJO_NUM 分派）。源直接读 TFLAG:18（choice 由调用方传入但不使用——
 * K14 与 K10 不同，源在函数体内读 TFLAG:18）。空模板骨架。
 */
async function gohoubi_after_koujo_k14(rand, cid, choice) {
  void rand;
  void cid;
  void choice;
  const a = era_flag.target;

  if (game.dungeon.足交射精或处遇口上 == 0) {
    await era.printAndWait('');
    return 0;
  } else if (game.dungeon.足交射精或处遇口上 == 1) {
    await era.printAndWait('');
    return 0;
  } else if (game.dungeon.足交射精或处遇口上 == 2) {
    if (chara(a).stronghold.要求奖赏 == 0) {
      await era.printAndWait('');
    } else if (chara(a).stronghold.要求奖赏 == 1) {
      if (era.get(`talent:${a}:0`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
    } else if (chara(a).stronghold.要求奖赏 == 2) {
      if (era.get(`talent:${a}:0`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
    } else if (chara(a).stronghold.要求奖赏 == 3) {
      if (era.get(`talent:${a}:0`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
    } else if (chara(a).stronghold.要求奖赏 == 4) {
      await era.printAndWait('');
    } else if (chara(a).stronghold.要求奖赏 == 5) {
      if (era.get(`abl:${a}:2`) > era.get(`abl:${a}:3`)) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
    } else if (chara(a).stronghold.要求奖赏 == 6) {
      await era.printAndWait('');
    } else if (chara(a).stronghold.要求奖赏 == 7) {
      if (era.get(`talent:${a}:0`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
    } else if (chara(a).stronghold.要求奖赏 == 8) {
      await era.printAndWait('');
    } else if (chara(a).stronghold.要求奖赏 == 9) {
      if (era.get(`abl:${a}:2`) > era.get(`abl:${a}:3`)) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
    }
  }
}

/**
 * @OSIOKI_KOUJO_K14（:5848-5909）：迎击失败惩罚口上。源直接读 TFLAG:18
 * 分档（choice 传入不使用）。空模板骨架。
 */
async function osioski_koujo_k14(rand, cid, choice) {
  void rand;
  void cid;
  void choice;
  const a = era_flag.target;

  if (game.dungeon.足交射精或处遇口上 == 0) {
    await era.printAndWait('');
  } else if (game.dungeon.足交射精或处遇口上 == 1) {
    if (era.get(`abl:${a}:21`) >= 3) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.dungeon.足交射精或处遇口上 == 2) {
    if (era.get(`abl:${a}:17`) >= 4) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.dungeon.足交射精或处遇口上 == 3) {
    if (era.get(`abl:${a}:17`) >= 6) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.dungeon.足交射精或处遇口上 == 4) {
    if (era.get(`abl:${a}:21`) >= 3) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.dungeon.足交射精或处遇口上 == 5) {
    if (era.get(`talent:${a}:88`) == 1 || era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.dungeon.足交射精或处遇口上 == 6) {
    await era.print('');
  } else if (game.dungeon.足交射精或处遇口上 == 7) {
    await era.print('');
  } else if (game.dungeon.足交射精或处遇口上 == 8) {
    await era.printAndWait('');
  } else if (game.dungeon.足交射精或处遇口上 == 9) {
    await era.printAndWait('');
  }
}

/**
 * @GOBI_KOUJO_K14（:5911-5944）：语尾口上（PRINTFORM 输出行尾语气词）。
 * ARG:0 分档：1 得意/2 愤怒/3 悲伤/4 害羞/5 狼狈，其余（含 0）随机三选。
 */
function gobi_koujo_k14(arg, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));

  if (arg == 1) {
    return `哦~♪`;
  } else if (arg == 2) {
    return `哦！`;
  } else if (arg == 3) {
    return `啦……。`;
  } else if (arg == 4) {
    return `什么的……。`;
  } else if (arg == 5) {
    return `什么啊……。`;
  } else {
    if (rand_n(3) == 0) {
      return `啦。`;
    } else if (rand_n(2) == 0) {
      return `嘛。`;
    } else {
      return `的啦。`;
    }
  }
}

// —— 家族注册（key 14；随 main-loop require 生效）——
kojo_message_com_family.register(14, kojo_message_com_14);
self_kojo_family.register(14, self_kojo_k14);
kojo_message_palamcng_family.register(14, kojo_message_palamcng_14);
kojo_message_markcng_family.register(14, kojo_message_markcng_14);
gohoubi_after_koujo_family.register(14, (cid, choice) =>
  gohoubi_after_koujo_k14(undefined, cid, choice),
);
osioski_koujo_family.register(14, (cid, choice) =>
  osioski_koujo_k14(undefined, cid, choice),
);
gohoubi_request_koujo_family.register(14, () => gohoubi_request_koujo_k14());
ryouzyoku_kojo_family.register(14, dungeon_ryouzyoku_k14);
ryouzyoku_after_kojo_family.register(14, dungeon_ryouzyoku_after_k14);
gobi_koujo_family.register(14, gobi_koujo_k14);
benki_koujo_family.register(14, benki_koujo_k14);
enterenemy_koujo_family.register(14, enterenemy_koujo_k14);
dungeon_victory_family.register(14, dungeon_victory_k14);
dungeon_attack_family.register(14, dungeon_attack_k14);
ntr_koujo_family.register(14, ntr_koujo_k14);
exucution_koujo_family.register(14, exucution_koujo_k14);
museum_koujo_family.register(14, museum_koujo_k14);
banishment_koujo_family.register(14, banishment_koujo_k14);
public_exucution_koujo_family.register(14, public_exucution_koujo_k14);
grotesque_koujo_family.register(14, grotesque_koujo_k14);

module.exports = {
  k14_kojo2,
  kojo_message_com_14,
  dog_kojo_14,
  kojo_message_palamcng_14,
  kojo_message_markcng_14,
  self_kojo_k14,
  dungeon_ryouzyoku_k14,
  dungeon_ryouzyoku_after_k14,
  benki_koujo_k14,
  dungeon_victory_k14,
  dungeon_attack_k14,
  colosseum_kojo_14,
  ntr_koujo_k14,
  exucution_koujo_k14,
  museum_koujo_k14,
  banishment_koujo_k14,
  public_exucution_koujo_k14,
  grotesque_koujo_k14,
  enterenemy_koujo_k14,
  gohoubi_request_koujo_k14,
  gohoubi_after_koujo_k14,
  osioski_koujo_k14,
  gobi_koujo_k14,
};
