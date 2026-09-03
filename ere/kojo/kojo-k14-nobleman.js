/* eslint-disable no-irregular-whitespace, no-dupe-else-if */
/**
 * @file 貴公子口上 K14：EVENTTRAIN 存在标志 + 主体 + 二回目以降 + 调教结束 +
 *       指令口上 + 兽奸/死斗场/NTR/处刑/博物馆/流放/肉便器/迎击奖惩等非调教
 *       入口（issue #245）。
 *
 * 源: target/ERB/口上/EVENT_K14_貴公子.ERB  @EVENTTRAIN #PRI（:39-44，存在
 *     标志 FLAG:114 = 1）@EVENTEND #LATER（:45-48，清标志）
 *     @EVENTTRAIN（:53-425，调教开始口上：初调教 CFLAG:201 状态机 +
 *     魔族化 CFLAG:370 + NTR 再捕获 CFLAG:650 + 屈服刻印 Lv1-3 + 淫乱/爱慕
 *     （各含魔族化分支）+ 无助手/无简易助手时 CALL K14_KOJO2）
 *     @K14_KOJO2（:427-494，调教开始口上二回目以降：反抗刻印Lv3/屈服刻印
 *     Lv0-3/淫乱/爱慕 各分档）
 *     @EVENTEND（:500-597，普通档，调教结束口上）
 *     @KOJO_MESSAGE_COM_14（:603-3561，指令口上：头部守卫 +
 *     CFLAG:301-400 计数器状态机，**全篇 PRINTFORMW 留空、仅状态机骨架**）
 *     @DOG_KOJO_14（:3563-4366，兽奸专用口上，**同为空模板骨架**）
 *     @KOJO_MESSAGE_PALAMCNG_14（:4368-4564）@KOJO_MESSAGE_MARKCNG_14
 *     （:4566-4627）@SELF_KOJO_K14（:4629-4882，TFLAG:13 事件分派）
 *     @DUNGEON_RYOUZYOKU_K14/_AFTER_K14（:4884-5037，迷宫凌辱）
 *     @BENKI_KOUJO_K14（:5039-5271，肉便器行动口上）
 *     @DUNGEON_VICTORY_K14/_ATTACK_K14（:5273-5414）
 *     @COLOSSEUM_KOJO_14（:5416-5519，死斗场专用口上，**空模板骨架**）
 *     @NTR_KOUJO_K14（:5521-5596，再捕获状态机）@EXUCUTION_KOUJO_K14/
 *     @MUSEUM_KOUJO_K14/@BANISHMENT_KOUJO_K14/@PUBLIC_EXUCUTION_KOUJO_K14/
 *     @GROTESQUE_KOUJO_K14（:5598-5710，处刑/博物馆/流放口上，**空模板**）
 *     @ENTERENEMY_KOUJO_K14（:5712-5728）@GOHOUBI_REQUEST_KOUJO_K14/
 *     _AFTER_K14（:5730-5846，迎击奖赏）@OSIOKI_KOUJO_K14（:5848-5909，
 *     迎击惩罚）@GOBI_KOUJO_K14（:5911-5944，语尾口上）。
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
 * （DUNGEON_ATTACK_K14 臆病・悲観分档台词）两句是汉化未译的整句日文残留
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
 * 模板残片；1:1 保留为 `await era.printAndWait('')`（K9 同款，逐行核对
 * target/ 后保留，不补写台词）。
 *
 * @BENKI_KOUJO_K14（:5039-5271）只有 FLAG:62 == 9（野外露出配信）的
 * 常識改変两档填了台词（:5160-5175），其余档位留空。
 *
 * @SELF_KOJO_K14（:4629-4882）TFLAG:13 分派各支的 PRINTFORMW 亦全空
 * （调教后自慰/百合PLAY/朝口交/调教后性交/夜袭/卖却/妊娠发觉/生产/育儿室/
 * 亲离/死亡/寿命 十二支保留状态机骨架）。
 *
 * == 原作结构缺陷 1:1 保留 ==
 *
 * - :360/:420 的 `ELSEIF ASSI < 0 → CALL K14_KOJO2` 与 `ELSE → CALL
 *   K14_KOJO2`：原文件没有简易助手专属口上（CFLAG:202 段整段注释），无助手
 *   与有助手都落二回目以降，1:1 保留（转译器初稿留成 CALL 注释，本次复核
 *   改回真实调用 await k14_kojo2()）。
 * - :605 的助手跳过守卫整行注释（`;SIF ASSI > 0 && ASSIPLAY`）——
 *   KOJO_MESSAGE_COM_14 无 ASSI 跳过，1:1 保留注释形态（不实现）。
 * - :349-357 崩坏段（TALENT:9 == 1 && CFLAG:201 < 9）整段注释——K14 的
 *   EVENTTRAIN 状态机没有崩坏分档（源作注释掉，其余 K 文件多有此档），
 *   1:1 保留（不落地）。
 * - 魔族化后的淫乱+魔族化（:182-245）整段注释——K14 没有该档，1:1 保留。
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
const { chara_callname, chara_name } = require('#/utils/callname-utils');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。
 */
const STUBBED_CALLS = [];

// @EVENTTRAIN #PRI（:39-44）：存在标志 + 总开关补 0（同 EVENT_K.ERB 语义）
on(
  'EVENTTRAIN',
  () => {
    game.kojo.口上存在_14 = 1; // :41 FLAG:114 = 1（K14 口上存在标志）
    if (game.kojo.口上开关 === 0) {
      game.kojo.口上开关 = 2; // :43
    }
  },
  TIER.PRI,
);

// @EVENTEND #LATER（:45-48）：调教结束清存在标志
on(
  'EVENTEND',
  () => {
    game.kojo.口上存在_14 = 0; // :47
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
 *   - 崩坏段（TALENT:9，:349-357）整段注释（原作缺陷 1:1 保留）。
 *   - 无助手（ASSI < 0，:359-360）→ CALL k14_kojo2；其余（:419-420）→
 *     CALL k14_kojo2（简易助手段整段注释，原作缺陷 1:1 保留）。
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
    // :54-55
    return 0; // :54-55
  } // :54-55
  if (era.get(`talent:${target}:174`) != 1) {
    // :56-57
    return 0; // :56-57
  } // :56-57

  if (kojo.初调教 == 0) {
    // :62
    era.drawLine(); // :62-63

    // 男魔族
    if (
      era.get(`talent:${target}:122`) &&
      era.get(`talent:${target}:314`) == 9
    ) {
      // :65
      await era.printAndWait(`经过多次改造后，${target_name}转生成为魔族了。`); // :66
      await era.printAndWait(
        `${master_name}前来看看情况，就看到${target_name}一脸焦虑地烦恼着发生在自己身上的事。`,
      ); // :67
      await era.printAndWait(
        `（这种不可言喻的感觉…，啊！！这…这难道就是…暗之魔力…吗！！？）`,
      ); // :68
      await era.printAndWait(
        `「啊…魔、魔王大人…，嗯唔…！？魔…魔王…！！！不…！${sc()}是不会对你…！？啊…这…这绝对不可能…，我竟然会对你…！」`,
      ); // :69
      await era.printAndWait(
        `成为魔族了的${target_name}，想要发泄对于转生成魔族的怨恨。`,
      ); // :70
      await era.printAndWait(
        `但对于魔族之王的你的忠诚已经深刻于心，从心底感觉到无法违抗………`,
      ); // :71
      // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :72
      kojo.初调教 = 1; // :72
      // 魔族スイッチ１ // :74
      kojo.魔族化 = 1; // :74
    } else if (
      era.get(`talent:${target}:314`) == 9 &&
      chara(target).stronghold.已性转 &&
      era.get(`talent:${target}:122`) == 0
    ) {
      // :77 魔族（已性转）
      await era.printAndWait(
        `${target_name}经过多次改造的过程中变成了女性，之后更是转生成为了魔族。`,
      ); // :78
      await era.printAndWait(
        `${master_name}前来看看情况，就看到${target_name}一脸焦虑地烦恼着发生在自己身上的事。`,
      ); // :79
      await era.printAndWait(
        `（像这样畅快的感觉…而且总感觉…，身体里面…好像有一种奇怪的冲动…${heart(1)}）`,
      ); // :80
      await era.printAndWait(
        `「难道是受到了魔王植入的魔力所影响的么…？还是说…」`,
      ); // :81
      await era.printAndWait(
        `「啊…魔、魔王大人…，嗯唔…！？魔…魔王…！！！不…！${sc()}是不会对你…！？啊…这…这绝对不可能…，我竟然会对你…！」`,
      ); // :82
      await era.printAndWait(
        `成为魔族了的${target_name}，想要发泄对于自己完全发生转变的怨恨。`,
      ); // :83
      await era.printAndWait(
        `但对于魔族之王的你的忠诚所带来的愉快感，更胜过想要抵抗的想法………`,
      ); // :84
      // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :85
      kojo.初调教 = 1; // :85
      // 魔族スイッチ１ // :87
      kojo.魔族化 = 1; // :87
    } else if (era.get(`talent:${target}:122`)) {
      // :90 通常（男）
      await era.printAndWait(
        `「可…可恶啊！！！你这个肮脏的魔王！！我郑重告诉你！${sc()}是绝对不会屈服于你的…！！」`,
      ); // :91
      await era.printAndWait(`怒目圆睁的眼睛中，隐约可以窥见他内心的恐惧……`); // :92
      // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :93
      kojo.初调教 = 1; // :93
    } else if (
      chara(target).stronghold.已性转 &&
      era.get(`talent:${target}:122`) == 0
    ) {
      // :96 性転換済み（已变性为女性）
      await era.printAndWait(
        `在${master_name}的戏弄下、${target_name}被改造成了女性的肉体了。`,
      ); // :97
      await era.printAndWait(
        `「你这个可恶的魔王…！！赶快把${sc()}的身体变回原来的样子啊！」`,
      ); // :98
      await era.printAndWait(
        `${master_name}来到了房间，${target_name}就瞪了过来并大声抗议了起来。`,
      ); // :99
      await era.printAndWait(
        `「${sc()}可是个男人啊！才不是一个女人啊！！喂…！！你这家伙有在听我说话吗！？」`,
      ); // :100
      await era.printAndWait(
        `这么呼喊着的${target_name}，被${master_name}按倒在了床上。`,
      ); // :101
      await era.printAndWait(
        `「啊…喂！！你…你这家伙…！想要对${sc()}做什么…！赶快放开你的手啊…！你这个肮脏的家伙…！」`,
      ); // :102
      await era.printAndWait(
        `他、不，她的身心将因被刻上迄今为止从未体会过的快感而顺从吧……`,
      ); // :103
      // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :104
      kojo.初调教 = 1; // :104
      return 1; // :104-105
    } // :104-106
  } else if (
    kojo.初调教 < 5 &&
    kojo.魔族化 == 0 &&
    era.get(`talent:${target}:314`) == 9 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    // :110-117 魔族化（1 回のみ）初回調教後魔族化、陥落前
    await era.printAndWait(
      `经过多次改造后完全成为魔族的${target_name}对自己的模样感到绝望…`,
    ); // :111
    await era.printAndWait(`注意到来到房间了的你，不知所措地看着你。`); // :112
    await era.printAndWait(
      `「可恶的…魔王…！！赶快把${sc()}的身体…，彻彻底底的变回去…！」`,
    ); // :113
    await era.printAndWait(
      `成为魔族的${sc()}，已经开始从本能上感觉到无法违抗身为魔族之王的你了………`,
    ); // :114
    // 魔族スイッチ２ // :116
    kojo.魔族化 = 2; // :116
    return 1; // :116-117
  } else if (kojo.初调教 >= 1 && kojo.NTR再捕获 == 1) {
    // :121-134 NTR 再捕获
    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {
      // :122-127 愛・淫乱
      era.drawLine(); // :124-125
      await era.printAndWait(
        `「还…还真是抱歉呢…，因为${sc()}我…好像有点太容易就败给诱惑了呢…」`,
      ); // :125
      // NTR スイッチ解除 // :127
      kojo.NTR再捕获 = 0; // :127
    } else {
      // :127-128-132
      era.drawLine(); // :129-130
      await era.printAndWait(`「嗛…怎么又是你啊…！」`); // :130
      // NTR スイッチ解除 // :132
      kojo.NTR再捕获 = 0; // :132
    } // :132-133
    return 1; // :132-134
  } else if (kojo.初调教 < 2 && era.get(`mark:${target}:2`) == 1) {
    // :139-143 屈服刻印Lv1
    era.drawLine(); // :139-140
    await era.printAndWait(
      `「可恶的…魔王…！${sc()}是绝对不会输给你的…也不会顺从你的！！」`,
    ); // :141
    // CFLAG:201  = 2（变量语义：CFLAG 族，201） // :142
    kojo.初调教 = 2; // :142
    return 1; // :142-143
  } else if (kojo.初调教 < 3 && era.get(`mark:${target}:2`) == 2) {
    // :146-155 屈服刻印Lv2
    era.drawLine(); // :146-147
    if (era.get(`talent:${target}:122`)) {
      // :148-150
      await era.printAndWait(`「呃…，今天也要继续做那种事情啊…！？」`); // :149
    } else if (
      chara(target).stronghold.已性转 &&
      era.get(`talent:${target}:122`) == 0
    ) {
      // :151-152 性転換済み
      await era.printAndWait(
        `「啊…，这种快乐而且微妙的感觉…真的是好棒啊…，但…但是…」`,
      ); // :152
    } // :152-153
    // CFLAG:201  = 3（变量语义：CFLAG 族，201） // :154
    kojo.初调教 = 3; // :154
    return 1; // :154-155
  } else if (
    kojo.初调教 < 4 &&
    era.get(`mark:${target}:2`) == 3 &&
    era.get(`talent:${target}:85`) == 0
  ) {
    // :158-167 屈服刻印Lv3
    era.drawLine(); // :158-159
    if (era.get(`talent:${target}:122`)) {
      // :160-161
      await era.printAndWait(`「抱歉了…大家…，因为${sc()}已经…已经快要…」`); // :161
    } else if (
      chara(target).stronghold.已性转 &&
      era.get(`talent:${target}:122`) == 0
    ) {
      // :163-164 性転換済み
      await era.printAndWait(
        `「像这种舒适的快感…，${sc()}感觉到…好像已经、已经完全的要沦陷成为真正的女人了啊…」`,
      ); // :164
    } // :164-165
    // CFLAG:201  = 4（变量语义：CFLAG 族，201） // :166
    kojo.初调教 = 4; // :166
    return 1; // :166-167
  } else if (
    kojo.初调教 < 5 &&
    era.get(`talent:${target}:76`) == 1 &&
    era.get(`talent:${target}:85`) == 0
  ) {
    // :170-179 淫乱
    era.drawLine(); // :170-171
    if (era.get(`talent:${target}:122`)) {
      // :173-175 通常
      await era.printAndWait(
        `「啊~，魔王大人~，${sc()}啊…，一直都在这里等待着您的到来呢~」`,
      ); // :174
    } else if (
      chara(target).stronghold.已性转 &&
      era.get(`talent:${target}:122`) == 0
    ) {
      // :176-177 性転換済み
      await era.printAndWait(
        `「啊~，魔王大人~，${sc()}啊…，一直都在这里等待着您的到来呢~」`,
      ); // :177
    } // :177-178
    // CFLAG:201  = 5（变量语义：CFLAG 族，201） // :179
    kojo.初调教 = 5; // :179
    return 1; // :179-180
  } else if (kojo.初调教 < 6 && era.get(`talent:${target}:85`) == 1) {
    // :247-267 愛
    era.drawLine(); // :247-248
    if (era.get(`talent:${target}:122`)) {
      // :249-254 通常
      await era.printAndWait(
        `「魔…魔王大人…，${sc()}…，已经绝对不会再反抗您了。所…所以…」`,
      ); // :250
      await era.printAndWait(
        `「${sc()}、想要尽可能的帮上魔王大人的忙…想要在呆我所尊敬的魔王大人身边、支持着您…可以吗…！？」`,
      ); // :251
      await era.printAndWait(
        `你听了${target_name}的愿望之后、向他传达了既然如此今后就好好侍奉的意思…`,
      ); // :252
      await era.printAndWait(`「好的…，那么就如魔王大人所愿。。。」`); // :253
      await era.printAndWait(
        `套弄抚摸着${target_name}已经勃起了的阴茎、你脸上浮现了扭曲的笑容…`,
      ); // :254
    } else if (
      chara(target).stronghold.已性转 &&
      era.get(`talent:${target}:122`) == 0
    ) {
      // :256-264 性転換済み
      await era.printAndWait(
        `「魔…魔王大人…，${sc()}…，已经绝对不会再反抗您了。所…所以…」`,
      ); // :257
      await era.printAndWait(
        `「${sc()}、想要尽自己全部的能力帮助魔王大人…，所以…我为了尊敬的魔王大人、不管是什么事情我都愿意去做！」`,
      ); // :258
      await era.printAndWait(
        `「就连这副身体…也请随便使用吧…、啊…！但是…像${sc()}这样原来是男人的女人…真的能接受么…？」`,
      ); // :259
      await era.printAndWait(
        `你听了${target_name}的愿望之后、向他传达了既然如此今后就好好侍奉的意思…`,
      ); // :260
      await era.printAndWait(`「好的…如魔王大人所愿${heart(1)}」`); // :261
      if (era.get(`talent:${target}:0`) == 1) {
        // :262-263
        await era.printAndWait(
          `「${target_name}的『第一次』、因为想被魔王大人夺走…所以有在好好的为您保存着呢哦…${heart(1)}」`,
        ); // :263
      } // :263
      await era.printAndWait(
        `爱抚着满心欢喜的${target_name}的雌性身体、你脸上浮现了扭曲的笑容…`,
      ); // :264
    } // :264-265
    // CFLAG:201  = 6（变量语义：CFLAG 族，201） // :266
    kojo.初调教 = 6; // :266
    return 1; // :266-267
  } else if (
    era.get(`talent:${target}:314`) == 9 &&
    kojo.初调教 < 8 &&
    era.get(`talent:${target}:85`) == 1 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    // :270-347 愛+魔族化
    era.drawLine(); // :270-271
    if (era.get(`talent:${target}:122`)) {
      // :272-308 男
      if (kojo.魔族化 == 1) {
        // :274-284 調教前から魔族
        await era.printAndWait(
          `「啊啊…魔王大人…，之所以把${sc()}转化成了魔族的原因、其实就是为了这个对吧…」`,
        ); // :275
        await era.printAndWait(
          `你进入房间的时候、${target_name}正带着温柔的表情跪在地上迎接你的到来。`,
        ); // :276
        await era.printAndWait(
          `「伟大的魔王大人啊…，${sc()}我…，已经完全的接受了身为魔族的一切了哦…，并且…会永远…与您相伴到最后的…」`,
        ); // :277
        await era.printAndWait(
          `「所以说不管是什么样的命令…${target_name}全部都会、按照魔王大人所愿去做的…」`,
        ); // :278
        if (era.get(`talent:${target}:77`) == 1) {
          // :279-280
          await era.printAndWait(
            `「${target_name}已经开发完全的菊穴、也请魔王大人毫不客气的使用吧…${heart(1)}」`,
          ); // :280
        } // :280
        await era.printAndWait(
          `不久前还叫嚣着要讨灭你的男冒险者、现在完全转生成了誓死效忠你的魔族了。`,
        ); // :281
        await era.printAndWait(
          `你抱紧了${target_name}的身体、脸上浮现扭曲的笑容…`,
        ); // :282
        // CFLAG:201  = 8（变量语义：CFLAG 族，201） // :283
        kojo.初调教 = 8; // :283
        return 1; // :283-284
      } else if (kojo.魔族化 == 2) {
        // :286-296 調教後に魔族
        await era.printAndWait(
          `「嗯…？啊…！魔…魔王大人…！！${scf()}、${sc()}…」`,
        ); // :287
        await era.printAndWait(
          `你进入房间的时候、${target_name}虽然还有点迷茫、但还是跪在地上迎接你的到来。`,
        ); // :288
        await era.printAndWait(
          `「嗯…，伟大的魔王大人啊…${sc()}从现在开始再也不会迷茫了…因为我已经完全的接受了身为魔族的一切了、所以我愿时刻陪伴在您左右」`,
        ); // :289
        await era.printAndWait(
          `「所以…就对${scf()}、对${sc()}…，更加的…更加多的来疼爱我吧…！」`,
        ); // :290
        if (era.get(`talent:${target}:77`) == 1) {
          // :291-292
          await era.printAndWait(
            `「所以也请魔王大人来更多的使用、${target_name}那已经开发完全的菊穴…！」`,
          ); // :292
        } // :292
        await era.printAndWait(
          `你、轻轻地抱住了几乎要哭出来的${target_name}。`,
        ); // :293
        await era.printAndWait(
          `从调教的结果来看、${target_name}似乎对你产生了爱慕之情…`,
        ); // :294
        // CFLAG:201  = 8（变量语义：CFLAG 族，201） // :295
        kojo.初调教 = 8; // :295
        return 1; // :295-296
      } else {
        // :298-299-299-307 陥落後に魔族
        await era.printAndWait(
          `「哦…魔王大人…，能将${sc()}彻底改造成了魔族、这还真的是万分感激呢…」`,
        ); // :299
        await era.printAndWait(
          `你进入房间的时候、${target_name}正带着温柔的表情跪在地上迎接你的到来。`,
        ); // :300
        await era.printAndWait(
          `「那么这样一来…，${sc()}也就和您一样都是魔族了啊…♪」`,
        ); // :301
        await era.printAndWait(
          `${target_name}端详了自己已经成为魔族的身体、再次跪了下来。`,
        ); // :302
        await era.printAndWait(
          `「那么…，从今往后…！${target_name}！！将会作为您身边的奴仆来随时听从着魔王大人号令！！」`,
        ); // :303
        if (era.get(`talent:${target}:77`) == 1) {
          // :304-305
          await era.printAndWait(
            `「${target_name}开发完全的菊穴、也请魔王大人随意使用吧${heart(1)}」`,
          ); // :305
        } // :305
        // CFLAG:201  = 8（变量语义：CFLAG 族，201） // :306
        kojo.初调教 = 8; // :306
        return 1; // :306-307
      } // :306-308
    } else if (
      chara(target).stronghold.已性转 &&
      era.get(`talent:${target}:122`) == 0
    ) {
      // :310-346 性転換済み
      if (kojo.魔族化 == 1) {
        // :312-322 調教前から魔族
        await era.printAndWait(
          `「啊啊…魔王大人…，之所以把${sc()}转化成了魔族的原因、其实就是为了这个对吧…」`,
        ); // :313
        await era.printAndWait(
          `你进入房间的时候、${target_name}正带着温柔的表情跪在地上迎接你的到来。`,
        ); // :314
        await era.printAndWait(
          `「伟大的魔王大人啊…，${sc()}我…，已经完全的接受了身为魔族的一切了哦…，并且…会永远…与您相伴到最后的…」`,
        ); // :315
        await era.printAndWait(`「按照魔王大人所愿去做的…」`); // :316
        if (era.get(`talent:${target}:0`) == 1) {
          // :317-318
          await era.printAndWait(
            `「${target_name}的『第一次』、可是为了献给魔王大人…才一直留到现在的哦…${heart(1)}」`,
          ); // :318
        } // :318
        await era.printAndWait(
          `没有人会想到，眼前这位带着恍惚表情跪下的女性，直到不久前还是那个举刀想要讨伐你的男性勇者吧。`,
        ); // :319
        await era.printAndWait(
          `你抱紧了${target_name}的身体、脸上浮现扭曲的笑容…`,
        ); // :320
        // CFLAG:201  = 8（变量语义：CFLAG 族，201） // :321
        kojo.初调教 = 8; // :321
        return 1; // :321-322
      } else if (kojo.魔族化 == 2) {
        // :324-334 調教後に魔族
        await era.printAndWait(
          `「嗯…？啊…！魔…魔王大人…！！${scf()}、${sc()}…」`,
        ); // :325
        await era.printAndWait(
          `你进入房间的时候、${target_name}虽然还有点迷茫、但还是跪在地上迎接你的到来。`,
        ); // :326
        await era.printAndWait(
          `「嗯…，伟大的魔王大人啊…${sc()}从现在开始再也不会迷茫了…因为我已经完全的接受了身为魔族的一切了、所以我愿时刻陪伴在您左右」`,
        ); // :327
        await era.printAndWait(
          `「所以…就对${scf()}、对${sc()}…，更加的…更加多的来疼爱我吧…！」`,
        ); // :328
        if (era.get(`talent:${target}:0`) == 1) {
          // :329-330
          await era.printAndWait(
            `「${target_name}的『第一次』、如果不是魔王大人的话…那可是绝对不允许的哦…！！」`,
          ); // :330
        } // :330
        await era.printAndWait(
          `你、轻轻地抱住了几乎要哭出来的${target_name}。`,
        ); // :331
        await era.printAndWait(
          `从调教的结果来看、${target_name}似乎对你产生了爱慕之情…`,
        ); // :332
        // CFLAG:201  = 8（变量语义：CFLAG 族，201） // :333
        kojo.初调教 = 8; // :333
        return 1; // :333-334
      } else {
        // :336-337-337-345 陥落後に魔族
        await era.printAndWait(
          `「哦…魔王大人…，能将${sc()}彻底改造成了魔族、这还真的是万分感激呢…」`,
        ); // :337
        await era.printAndWait(
          `你进入房间的时候、${target_name}正带着温柔的表情跪在地上迎接你的到来。`,
        ); // :338
        await era.printAndWait(
          `「那么这样一来…，${sc()}也就和您一样都是魔族了啊…♪」`,
        ); // :339
        await era.printAndWait(
          `${target_name}端详了自己已经成为魔族的身体、再次跪了下来。`,
        ); // :340
        await era.printAndWait(
          `「那么…，从今往后…！${target_name}！！将会作为您身边的奴仆来随时听从着魔王大人号令！！」`,
        ); // :341
        if (era.get(`talent:${target}:0`) == 1) {
          // :342-343
          await era.printAndWait(
            `「${target_name}的『第一次』、留了那么久，就是为了让魔王大人来取走的啊…${heart(1)}」`,
          ); // :343
        } // :343
        // CFLAG:201  = 8（变量语义：CFLAG 族，201） // :344
        kojo.初调教 = 8; // :344
        return 1; // :344-345
      } // :344-346
    } // :344-347
  } else if (era_flag.assi < 0) {
    // :359-360 助手がいない場合は二回目以降へ
    await k14_kojo2(); // :360 CALL K14_KOJO2
  } else {
    // :419-420-420-420 口上のある助手が居ない場合は、通常の二回目以降の口上へ飛ぶ
    await k14_kojo2(); // :420 CALL K14_KOJO2
  } // :420-421
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
    // :429-432 反発刻印Lv3
    era.drawLine(); // :429-430
    await era.printAndWait(`「去死一死吧！！你这个又脏又可恶的魔王！！」`); // :431
    return 1; // :431-432
  } else if (era.get(`mark:${target}:2`) == 0 && game.kojo.口上开关 == 2) {
    // :435-438 屈服刻印Lv0
    era.drawLine(); // :435-436
    await era.printAndWait(`「不…不要在过来了！！快住手啊！！！」`); // :437
    return 1; // :437-438
  } else if (era.get(`mark:${target}:2`) == 1 && game.kojo.口上开关 == 2) {
    // :441-444 屈服刻印Lv1
    era.drawLine(); // :441-442
    await era.printAndWait(
      `「可恶的…魔王…！${sc()}是绝对不会输给你的…也不会顺从你的！！」`,
    ); // :443
    return 1; // :443-444
  } else if (era.get(`mark:${target}:2`) == 2 && game.kojo.口上开关 == 2) {
    // :447-455 屈服刻印Lv2
    era.drawLine(); // :447-448
    if (era.get(`talent:${target}:122`)) {
      // :449-450
      await era.printAndWait(`「呃…，今天也要继续做那种事情啊…！？」`); // :450
    } else if (
      chara(target).stronghold.已性转 &&
      era.get(`talent:${target}:122`) == 0
    ) {
      // :452-453 性転換済み
      await era.printAndWait(
        `「咕呜…！我…我是不可能就这么轻易的输给快感的…！但…但是…」`,
      ); // :453
    } // :453-454
    return 1; // :453-455
  } else if (
    era.get(`mark:${target}:2`) == 3 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0 &&
    game.kojo.口上开关 == 2
  ) {
    // :458-466 屈服刻印Lv3＋愛/淫乱無し
    era.drawLine(); // :458-459
    if (era.get(`talent:${target}:122`)) {
      // :460-461
      await era.printAndWait(`「我明白了…，那么你想干什么就随你喜欢好了…」`); // :461
    } else if (
      chara(target).stronghold.已性转 &&
      era.get(`talent:${target}:122`) == 0
    ) {
      // :463-464 性転換済み
      await era.printAndWait(
        `「既然…我已经没有办法再次变回男人的话…，那么…！魔…魔王大人…！就请您再给${sc()}、传授更多的快乐吧…」`,
      ); // :464
    } // :464-465
    return 1; // :464-466
  } else if (era.get(`talent:${target}:76`) == 1 && game.kojo.口上开关 == 2) {
    // :469-479 淫乱（ランダムで口上が変化する）
    era.drawLine(); // :469-470
    if (rand_n(3) == 0) {
      // :472
      await era.printAndWait(
        `「啊~，魔王大人~，${sc()}啊…，一直都在这里等待着您的到来呢~」`,
      ); // :473
    } else if (rand_n(2) == 0) {
      // :474
      await era.printAndWait(
        `「那么…魔王大人？今天的话…您打算对我做什么事情呢~？」`,
      ); // :475
    } else {
      // :475-476
      await era.printAndWait(`「嗯…，我已经等您好久了呢~♪」`); // :477
    } // :477-478
    return 1; // :477-479
  } else if (era.get(`talent:${target}:85`) == 1 && game.kojo.口上开关 == 2) {
    // :482-492 愛（ランダムで口上が変化する）
    era.drawLine(); // :482-483
    if (rand_n(3) == 0) {
      // :485
      await era.printAndWait(`「啊…！魔…魔王大人…！！您来了啊！！好开心呢…」`); // :486
    } else if (rand_n(2) == 0) {
      // :487
      await era.printAndWait(`「就按照魔王大人想做的…，来进行调教吧…」`); // :488
    } else {
      // :488-489
      await era.printAndWait(
        `「如果是魔王大人的话…，不管是对我做什么都是可以的哦…」`,
      ); // :490
    } // :490-491
    return 1; // :490-492
  } // :490-493
  return 0; // :482-494
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
    // :501-502
    return 0; // :501-502
  } // :501-502
  if (era.get(`talent:${target}:174`) != 1) {
    // :503-504
    return 0; // :503-504
  } // :503-504

  if (era.get(`base:${target}:0`) <= 0) {
    // :506-507-507-508 キャラ死亡時は口上をスキップ
    return 0; // :506-507-507-508
  } // :506-507-507-508

  if (era.get(`mark:${target}:3`) == 3 && era.get(`talent:${target}:85`) == 0) {
    // :514-517 反発刻印Lv3+愛なし
    era.drawLine(); // :514-515
    await era.printAndWait(`「嘁…！给我去死啊…！！！」`); // :516
    return 1; // :516-517
  } else if (
    era.get(`mark:${target}:2`) <= 1 &&
    era.get(`talent:${target}:85`) == 0
  ) {
    // :520-523 屈服刻印Lv1以下+愛なし
    era.drawLine(); // :520-521
    await era.printAndWait(`「哼…，总算是结束了呢…」`); // :522
    return 1; // :522-523
  } else if (
    era.get(`mark:${target}:2`) == 2 &&
    era.get(`talent:${target}:85`) == 0
  ) {
    // :526-534 屈服刻印Lv2+愛なし
    era.drawLine(); // :526-527
    if (era.get(`talent:${target}:122`)) {
      // :528-529
      await era.printAndWait(`「哈啊…嗯…，结…结束了么…？」`); // :529
    } else if (
      chara(target).stronghold.已性转 &&
      era.get(`talent:${target}:122`) == 0
    ) {
      // :531-532 性転換済み
      await era.printAndWait(
        `「哈…呀啊…，这…这种快乐…、总觉得…要上瘾了啊…，咿嗯…！？${sc()}…！到底在说什么呢…！！」`,
      ); // :532
    } // :532-533
    return 1; // :532-534
  } else if (
    era.get(`mark:${target}:2`) == 3 &&
    era.get(`talent:${target}:85`) == 0
  ) {
    // :537-545 屈服刻印Lv3+愛なし
    era.drawLine(); // :537-538
    if (era.get(`talent:${target}:122`)) {
      // :539-540
      await era.printAndWait(`「请…请放过我吧…！！」`); // :540
    } else if (
      chara(target).stronghold.已性转 &&
      era.get(`talent:${target}:122`) == 0
    ) {
      // :542-543 性転換済み
      await era.printAndWait(`「呼啊…啊哈哈…，这种感觉…真的…，好棒呢…哈啊…」`); // :543
    } // :543-544
    return 1; // :543-545
  } else if (
    era.get(`talent:${target}:76`) == 1 &&
    era.get(`base:${target}:0`) >= 500
  ) {
    // :548-556 淫乱(体力500以上)
    era.drawLine(); // :548-549
    if (era.get(`talent:${target}:314`) == 9) {
      // :551-552 魔族
      await era.printAndWait(
        `「哈…！？只是这样就结束了么…！？喂…，魔王大人啊，不带你这个样子的吧…？」`,
      ); // :552
    } else {
      // :552-553-554
      await era.printAndWait(
        `「哈…！？只是这样就结束了么…！？喂…，魔王大人啊，不带你这个样子的吧…？」`,
      ); // :554
    } // :554-555
    return 1; // :554-556
  } else if (
    era.get(`talent:${target}:76`) == 1 &&
    era.get(`base:${target}:0`) <= 500
  ) {
    // :558-566 淫乱(体力500未満)
    era.drawLine(); // :558-559
    if (era.get(`talent:${target}:314`) == 9) {
      // :561-562 魔族
      await era.printAndWait(
        `「啊呜…哈啊…嗯…，${sc()}…，感觉…真的是太满足了呢~」`,
      ); // :562
    } else {
      // :562-563-564
      await era.printAndWait(
        `「啊呜…哈啊…嗯…，${sc()}…，感觉…真的是太满足了呢~」`,
      ); // :564
    } // :564-565
    return 1; // :564-566
  } else if (
    era.get(`talent:${target}:85`) == 1 &&
    era.get(`base:${target}:0`) >= 500
  ) {
    // :569-581 愛(体力500以上)
    era.drawLine(); // :569-570
    if (
      era.get(`talent:${target}:314`) == 9 &&
      era.get(`talent:${target}:122`) == 1
    ) {
      // :572-573 魔族（男）
      await era.printAndWait(`「已经结束了么…？啊…我明白了…」`); // :573
    } else if (era.get(`talent:${target}:122`) == 1) {
      // :574-575
      await era.printAndWait(`「已经结束了么…？啊…我明白了…」`); // :575
    } else if (era.get(`talent:${target}:314`) == 9) {
      // :576-577 魔族（已性转）
      await era.printAndWait(
        `「已经结束了么…？明明还想要更多的再亲爱一会的说…」`,
      ); // :577
    } else {
      // :577-578-579
      await era.printAndWait(
        `「这就要结束了么…？可是…还想要被您更多的疼爱的说呢…」`,
      ); // :579
    } // :579-580
    return 1; // :579-581
  } else if (
    era.get(`talent:${target}:85`) == 1 &&
    era.get(`base:${target}:0`) <= 500
  ) {
    // :583-595 愛(体力500未満)
    era.drawLine(); // :583-584
    if (
      era.get(`talent:${target}:314`) == 9 &&
      era.get(`talent:${target}:122`) == 1
    ) {
      // :586-587 魔族（男）
      await era.printAndWait(
        `「啊…，今天真的是辛苦您了…，还真的是非常感谢呢~」`,
      ); // :587
    } else if (era.get(`talent:${target}:122`) == 1) {
      // :588-589
      await era.printAndWait(
        `「啊…，今天真的是辛苦您了…，还真的是非常感谢呢~」`,
      ); // :589
    } else if (era.get(`talent:${target}:314`) == 9) {
      // :590-591 魔族（已性转）
      await era.printAndWait(
        `「啊…嗯哼~，像这个样子来疼爱我…还真的是感谢了呢~！那么…明天也要继续来才行哦…！${heart(1)}」`,
      ); // :591
    } else {
      // :591-592-593
      await era.printAndWait(
        `「啊…嗯…，今天还真的是十分感谢了啊…，可是我真的已经很累了哦…所以要休息一下了…，不过在我休息好之后，就继续的在一起相亲相爱吧~」`,
      ); // :593
    } // :593-594
    return 1; // :593-595
  } // :593-596
  return 0; // :583-597
});

module.exports = {
  STUBBED_CALLS,
  k14_kojo2,
};
